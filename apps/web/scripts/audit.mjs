import { chromium, devices } from "playwright";
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const origin = process.env.AUDIT_ORIGIN || "http://localhost:5591";
const includeMinimal = process.env.AUDIT_MINIMAL === "1";
const output = resolve(
  process.env.AUDIT_OUTPUT || "memory/tasks/feature/2026-10-27-nextjs-migration/verification",
);
await mkdir(output, { recursive: true });
const browserChannel = process.env.AUDIT_BROWSER || "msedge";
const browser = await chromium.launch({ channel: browserChannel, headless: true });
const sitemap = await fetch(`${origin}/sitemap.xml`).then((r) => r.text());
const classicRoutes = [...sitemap.matchAll(/<loc>https:\/\/www\.sabris\.com([^<]*)<\/loc>/g)].map(
  (m) => m[1],
);
const minimalRoutes = classicRoutes.map((path) => `/minimal${path}`);
const routes = includeMinimal ? [...classicRoutes, ...minimalRoutes] : classicRoutes;
const results = [];
const interactions = [];
const axe = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
try {
  for (const [name, profile] of [
    ["desktop", { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
    ["pixel", devices["Pixel 5"]],
    ["iphone", devices["iPhone 13"]],
  ]) {
    const context = await browser.newContext({
      ...profile,
      locale: "cs-CZ",
      timezoneId: "Europe/Prague",
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const paths =
      name === "desktop"
        ? routes
        : includeMinimal
          ? [...minimalRoutes, "/", "/pribehy-zakazniku/"]
          : ["/", "/pribehy-zakazniku/", "/reseni-a-sluzby/", "/kontakt/"];
    for (const path of paths) {
      const errors = [];
      const handleError = (e) => errors.push(e.message);
      page.on("pageerror", handleError);
      const response = await page.goto(`${origin}${path}`, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        const visible = Array.from(document.images).filter((img) => {
          const box = img.getBoundingClientRect();
          return box.bottom > 0 && box.top < innerHeight;
        });
        await Promise.all(visible.map((img) => img.decode().catch(() => {})));
      });
      await page.addScriptTag({ content: axe });
      const accessibility = await page.evaluate(async () => {
        const result = await window.axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        });
        return result.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        }));
      });
      const structure = await page.evaluate(() => ({
        title: document.title,
        mains: document.querySelectorAll("main").length,
        headers: document.querySelectorAll("header").length,
        footers: document.querySelectorAll("footer").length,
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        robots: document.querySelector('meta[name="robots"]')?.content,
        lang: document.documentElement.lang,
        h1: Array.from(document.querySelectorAll("h1")).map((e) => e.textContent),
        width: innerWidth,
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
        dpr: devicePixelRatio,
        screenWidth: screen.width,
        touch: navigator.maxTouchPoints,
        userAgent: navigator.userAgent,
        meta: document.querySelector('meta[name="viewport"]')?.getAttribute("content"),
        header: document.querySelector("header").getBoundingClientRect().toJSON(),
        brokenImages: Array.from(document.images)
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
        forbidden:
          document.body.innerText.match(/OpenText|Open Text|Microsoft|centra sdílených služeb/g) ||
          [],
        links: [
          ...new Set(
            Array.from(document.querySelectorAll("a"))
              .map((a) => a.getAttribute("href"))
              .filter((h) => h?.startsWith("/")),
          ),
        ],
      }));
      const item = {
        device: name,
        path,
        status: response.status(),
        ...structure,
        errors,
        accessibility,
      };
      if (["/", "/pribehy-zakazniku/", "/minimal/", "/minimal/pribehy-zakazniku/"].includes(path)) {
        const label =
          (path.startsWith("/minimal/") ? "minimal-" : "") +
          (path.endsWith("pribehy-zakazniku/") ? "references" : "home");
        const first = await page.screenshot({
          animations: "disabled",
          caret: "hide",
          scale: "css",
        });
        const second = await page.screenshot({
          animations: "disabled",
          caret: "hide",
          scale: "css",
        });
        const hash = (b) => createHash("sha256").update(b).digest("hex");
        item.screenshotsStable = hash(first) === hash(second);
        item.screenshotWidth = first.readUInt32BE(16);
        if (includeMinimal && !path.startsWith("/minimal/") && browserChannel === "msedge") {
          const baseline = await readFile(
            resolve(
              `memory/tasks/feature/2026-10-27-nextjs-migration/verification/${name}-${label}.png`,
            ),
          );
          item.classicBaselineMatch = hash(second) === hash(baseline);
        }
        await writeFile(`${output}/${name}-${label}.png`, second);
        await page.screenshot({
          path: `${output}/${name}-${label}-full.png`,
          fullPage: true,
          animations: "disabled",
          scale: "css",
        });
      }
      results.push(item);
      page.off("pageerror", handleError);
    }
    if (name === "desktop") {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(origin + "/");
      for (const expected of [
        "Zobrazit Marvinpac",
        "Zobrazit Košík.cz",
        "Zobrazit MP Krásno",
        "Zobrazit Marvinpac",
        "Zobrazit Košík.cz",
        "Zobrazit MP Krásno",
      ]) {
        await page.getByRole("button", { name: "Další příběh", exact: true }).click();
        await page.waitForFunction((name) => {
          const active = document.querySelector(".carousel-dots [aria-current]");
          const slide = document.querySelector(".story-slide:not([inert])");
          const box = slide?.getBoundingClientRect();
          return (
            active?.getAttribute("aria-label") === name &&
            box &&
            Math.abs(box.x + box.width / 2 - document.documentElement.clientWidth / 2) < 1
          );
        }, expected);
      }
      interactions.push({ test: "Dva úplné cykly carouselu", passed: true });
      await page.goto(origin + "/pribehy-zakazniku/");
      const card = page.locator(".reference-card").first();
      await card.hover();
      await page.waitForFunction(
        () => getComputedStyle(document.querySelector(".reference-overlay")).opacity === "0",
      );
      const hover = await card.evaluate((el) => ({
        transform: getComputedStyle(el).transform,
        duration: getComputedStyle(el).transitionDuration,
        overlay: getComputedStyle(el.querySelector(".reference-overlay")).opacity,
      }));
      if (!hover.transform.startsWith("matrix(1.04"))
        throw new Error("Card hover scale differs from source: " + hover.transform);
      interactions.push({ test: "Hover reference podle předlohy", ...hover, passed: true });
      await page.screenshot({ path: output + "/desktop-reference-hover.png", scale: "css" });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const motion = await card.evaluate((el) => getComputedStyle(el).transitionDuration);
      interactions.push({
        test: "Reduced motion",
        duration: motion,
        passed: parseFloat(motion) < 0.001,
      });
    }
    if (includeMinimal) {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(origin + "/minimal/pribehy-zakazniku/");
      await page.getByRole("button", { name: "Potravinářství", exact: true }).click();
      const filtered = (await page.getByRole("status").textContent()).trim();
      if (filtered !== "1 příběh") throw new Error("Minimal reference filter failed: " + filtered);
      interactions.push({ test: "Minimalistická varianta: filtr", device: name, passed: true });
      await page.goto(origin + "/minimal/reseni-a-sluzby/smart-potravinarstvi/");
      await page.locator("summary").filter({ hasText: "Co vám řešení přinese" }).click();
      if (
        !(await page.locator("details").nth(1).getAttribute("open")) &&
        (await page.locator("details").nth(1).getAttribute("open")) !== ""
      )
        throw new Error("Accordion did not open");
      interactions.push({ test: "Minimalistická varianta: akordeon", device: name, passed: true });
      if (name !== "desktop") {
        await page.getByRole("button", { name: "Otevřít menu", exact: true }).click();
        if (
          !(await page
            .getByRole("navigation", { name: "Navigace minimalistické varianty" })
            .isVisible())
        )
          throw new Error("Mobile navigation missing");
        await page.getByRole("button", { name: "Zavřít menu", exact: true }).click();
        interactions.push({
          test: "Minimalistická varianta: mobilní menu",
          device: name,
          passed: true,
        });
      }
    }
    await context.close();
  }
  const internal = [...new Set(results.flatMap((r) => r.links))].filter((h) => !h.startsWith("/#"));
  const linkResults = await Promise.all(
    internal.map(async (href) => {
      const r = await fetch(origin + href, { method: "HEAD" });
      return { href, status: r.status };
    }),
  );
  const redirects = await Promise.all(
    ["/reseni-a-sluzby/inovace-sap/", "/o-sabris/nasi-partneri/", "/reference/kosik-cz-2/"].map(
      async (path) => {
        const r = await fetch(origin + path, { redirect: "manual" });
        return { path, status: r.status, location: r.headers.get("location") };
      },
    ),
  );
  const summary = {
    interactions,
    browser: browser.version(),
    origin,
    date: new Date().toISOString(),
    results,
    links: linkResults,
    redirects,
  };
  await writeFile(`${output}/audit.json`, JSON.stringify(summary, null, 2));
  const failures = results.filter(
    (r) =>
      r.status !== 200 ||
      r.h1.length !== 1 ||
      r.mains !== 1 ||
      r.headers !== 1 ||
      r.footers !== 1 ||
      (r.path.startsWith("/minimal/") && !r.robots?.includes("noindex")) ||
      r.width !== r.clientWidth ||
      r.scrollWidth > r.width ||
      r.errors.length ||
      r.brokenImages.length ||
      r.forbidden.length ||
      r.accessibility.length ||
      r.screenshotsStable === false,
  );
  console.log(
    JSON.stringify(
      {
        pages: results.length,
        links: linkResults.length,
        failures: failures.map((r) => ({
          device: r.device,
          path: r.path,
          accessibility: r.accessibility,
          errors: r.errors,
          brokenImages: r.brokenImages,
          width: r.width,
          scrollWidth: r.scrollWidth,
          stable: r.screenshotsStable,
        })),
        badLinks: linkResults.filter((l) => l.status >= 400),
        visualReview: results
          .filter((r) => r.classicBaselineMatch === false)
          .map((r) => ({ device: r.device, path: r.path })),
        redirects,
      },
      null,
      2,
    ),
  );
  if (failures.length || linkResults.some((l) => l.status >= 400)) process.exitCode = 1;
} finally {
  await browser.close();
}
