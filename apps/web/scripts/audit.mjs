import { chromium, devices } from "playwright";
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const require = createRequire(import.meta.url);
const origin = process.env.AUDIT_ORIGIN || "http://localhost:5591";
const output = resolve("memory/tasks/feature/2026-10-27-nextjs-migration/verification");
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const sitemap = await fetch(`${origin}/sitemap.xml`).then((r) => r.text());
const routes = [...sitemap.matchAll(/<loc>https:\/\/www\.sabris\.com([^<]*)<\/loc>/g)].map(
  (m) => m[1],
);
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
      name === "desktop" ? routes : ["/", "/pribehy-zakazniku/", "/reseni-a-sluzby/", "/kontakt/"];
    for (const path of paths) {
      const errors = [];
      const handleError = (e) => errors.push(e.message);
      page.on("pageerror", handleError);
      const response = await page.goto(`${origin}${path}`, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
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
      if (path === "/" || path === "/pribehy-zakazniku/") {
        const label = path === "/" ? "home" : "references";
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
