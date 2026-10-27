"""Download only public assets observed in the captured source DOM."""
import concurrent.futures
import hashlib
import json
from pathlib import Path
import re
import urllib.parse
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
MIRROR = ROOT / 'memory/tasks/feature/2026-10-27-nextjs-migration/content-mirror'
DEST = ROOT / 'apps/web/public/media'
DEST.mkdir(parents=True, exist_ok=True)
selected = {
    'logo_sabris_simple.png', 'friendly-porfessional-_-CZ.png',
    'purple-galaxy-background_blue-1.png', 'Group-316.png',
    'homepage-solutions-bg-3-1.png', 'homepage-solutions-bg-1-1.png',
    'homepage-solutions-bg-4-1.png', 'homepage-solutions-icon-1.svg',
    'homepage-solutions-icon-3.svg', 'homepage-solutions-icon-4-3.svg',
    'bg-lines-6.svg', 'smart-1280x758.png', 'friendly-professional.svg',
    'nasi-zakaznici-marvinpac-bg.jpg', 'nasi-zakaznici-marvinpac-logo.png',
    'homepage-reference-krasno.png', 'krasno_12.8._3-1.svg', 'MARVINPAC-SMALL.svg',
    'Marvinpac_ico.png', 'Kosik.cz-uvod_Sabris-web.png', 'Kreslici-platno-37-1.svg',
    '13-voňavá-odvěšovna-scaled.jpg', 'marvinpac_3.png', 'vyroba-1.png',
    'stroj_2.png', 'parky-1.png', 'join-us-team.svg', 'join-us-the-way.svg',
    'join-us-innovation-bg.jpg', 'czechtrade-01-1280x634.png',
    'our-partners-membership-cszm.png', 'o-nas-otevrenost-a-duvera.jpg',
    'about-us-our-values-2.jpg', 'about-us-our-values-3.jpg', 'about-us-our-values-4.jpg',
    'about-us-about-us-bg.jpg', 'vodni_onas.png', 'vodni_onas3.png',
    'sabris_bilepozadi.pdf', 'sabris_bilepozadi.png', 'sabris_tmavepozadi.pdf',
    'sabris_tmavepozadi-1.png', 'sabris_FP_bilepozadi.pdf', 'sabris_FP_svetlepozadi.png',
    'sabris_FP_tmavepozadi.pdf', 'sabris_FP_tmavepozadi.png',
}
urls = set()
for file in (MIRROR / 'raw').glob('*.json'):
    data = json.loads(file.read_text(encoding='utf-8'))
    candidates = [i['src'] for i in data['images']]
    candidates += [i['href'] for i in data['links']]
    candidates += re.findall(r'url\("([^"]+)"\)', '\n'.join(data['backgrounds']))
    urls.update(u for u in candidates if urllib.parse.unquote(u.split('/')[-1]) in selected)

def download(url):
    name = urllib.parse.unquote(url.split('/')[-1])
    target = DEST / name
    try:
        if not target.exists():
            req = urllib.request.Request(url, headers={'User-Agent': 'Sabris website migration'})
            with urllib.request.urlopen(req, timeout=45) as response:
                target.write_bytes(response.read())
        content = target.read_bytes()
        return {'file': name, 'source': url, 'bytes': len(content), 'sha256': hashlib.sha256(content).hexdigest(), 'status': 'downloaded'}
    except Exception as error:
        return {'file': name, 'source': url, 'status': 'blocked', 'error': str(error)}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
    result = list(executor.map(download, sorted(urls)))
(MIRROR / 'assets').mkdir(exist_ok=True)
(MIRROR / 'assets/manifest.json').write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'downloaded': sum(r['status'] == 'downloaded' for r in result), 'failures': [r for r in result if r['status'] != 'downloaded']}, ensure_ascii=False))
