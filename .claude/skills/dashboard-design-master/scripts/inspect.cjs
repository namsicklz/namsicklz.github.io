#!/usr/bin/env node
// Render a dashboard at several viewports, save screenshots, and print a JSON
// report of layout defects a screenshot alone makes easy to miss.
//
// usage: node inspect.cjs <file.html | http://url> [--out dir] [--viewports 1440x900,1920x1080,1024x768,390x844] [--brief]
//
// Conventions it understands (all optional): cards are `.card`, charts live in
// `.chart` hosts or bare <svg>/<canvas>. Anything else still gets the generic checks.

const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--'));
const opt = (name, dflt) => {
  const i = args.indexOf('--' + name);
  return i >= 0 ? args[i + 1] : dflt;
};
if (!target) {
  console.error('usage: node inspect.cjs <file.html|url> [--out dir] [--viewports WxH,WxH]');
  process.exit(1);
}
const outDir = path.resolve(opt('out', 'dashboard-shots'));
const viewports = opt('viewports', '1440x900,1920x1080,1024x768,390x844')
  .split(',')
  .map((v) => v.split('x').map(Number));
const url = /^https?:|^file:/.test(target) ? target : 'file://' + path.resolve(target);
const base = path.basename(target).replace(/\.[^.]+$/, '') || 'dashboard';

// Runs inside the page. Returns { metrics, issues }.
function audit() {
  const issues = [];
  const vw = innerWidth, vh = innerHeight;
  const sel = (e) => {
    if (!e || !e.tagName) return '?';
    let s = e.tagName.toLowerCase();
    if (e.id) s += '#' + e.id;
    else if (e.classList.length) s += '.' + [...e.classList].slice(0, 2).join('.');
    return s;
  };
  const visible = (e) => {
    const r = e.getBoundingClientRect(), cs = getComputedStyle(e);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
  };
  const inScroller = (e) => {
    for (let p = e.parentElement; p; p = p.parentElement) {
      const o = getComputedStyle(p).overflowX;
      if ((o === 'auto' || o === 'scroll') && p.scrollWidth > p.clientWidth) return true;
    }
    return false;
  };
  const add = (kind, severity, detail, where) => issues.push({ kind, severity, detail, where });

  const doc = document.documentElement;
  const metrics = {
    viewport: [vw, vh],
    pageHeight: doc.scrollHeight,
    screensTall: +(doc.scrollHeight / vh).toFixed(2),
  };

  // 1. horizontal overflow
  if (doc.scrollWidth > vw + 1) {
    const off = [...document.body.querySelectorAll('*')]
      .filter((e) => visible(e) && !inScroller(e) && e.getBoundingClientRect().right > vw + 1)
      .slice(0, 4).map(sel);
    add('horizontal-overflow', 'high', `page is ${doc.scrollWidth}px wide in a ${vw}px viewport`, off.join(', '));
  }

  // 2. cards: row alignment, dead space, fill of first screen
  const cards = [...document.querySelectorAll('.card')].filter(visible);
  metrics.cards = cards.length;
  const rows = {};
  cards.forEach((c) => {
    const r = c.getBoundingClientRect();
    (rows[Math.round((r.top + scrollY) / 4)] ||= []).push(c);
  });
  Object.values(rows).forEach((g) => {
    if (g.length < 2) return;
    const hs = g.map((c) => c.getBoundingClientRect().height);
    if (Math.max(...hs) - Math.min(...hs) > 6)
      add('uneven-row-heights', 'medium', `heights ${hs.map(Math.round).join('/')}px in one row`, g.map(sel).join(', '));
  });
  cards.forEach((c) => {
    const r = c.getBoundingClientRect();
    if (r.height < 80) return;
    const kids = [...c.children].filter((k) => visible(k) && getComputedStyle(k).position !== 'absolute');
    if (!kids.length) return;
    const used = Math.max(...kids.map((k) => k.getBoundingClientRect().bottom)) - r.top;
    const gap = r.height - used;
    if (gap > Math.max(56, r.height * 0.22))
      add('dead-space-in-card', 'medium', `${Math.round(gap)}px (${Math.round((gap / r.height) * 100)}%) empty at bottom of a ${Math.round(r.height)}px card`, sel(c) + ' "' + (c.innerText || '').trim().slice(0, 28).replace(/\n/g, ' ') + '"');
  });
  // a lone card wrapped onto its own last row (e.g. 5 KPIs in a 4-column template)
  const byParent = new Map();
  cards.forEach((c) => byParent.set(c.parentElement, [...(byParent.get(c.parentElement) || []), c]));
  byParent.forEach((kids, parent) => {
    const rowsOf = {};
    kids.forEach((c) => (rowsOf[Math.round(c.getBoundingClientRect().top / 4)] ||= []).push(c));
    const keys = Object.keys(rowsOf).map(Number).sort((a, b) => a - b);
    if (keys.length < 2) return;
    const lastRow = rowsOf[keys[keys.length - 1]], before = rowsOf[keys[keys.length - 2]];
    if (lastRow.length === 1 && before.length >= 2 && lastRow[0].getBoundingClientRect().width < parent.getBoundingClientRect().width * 0.6)
      add('orphan-card', 'medium', `a single card sits alone on the last row of ${sel(parent)} (previous row has ${before.length})`, sel(lastRow[0]) + ' "' + (lastRow[0].innerText || '').trim().slice(0, 24).replace(/\n/g, ' ') + '"');
  });
  // area of first screen covered by cards
  let covered = 0;
  cards.forEach((c) => {
    const r = c.getBoundingClientRect();
    const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
    const h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
    covered += w * h;
  });
  metrics.firstScreenCardCoverage = +(covered / (vw * vh)).toFixed(2);

  // content ends well above the bottom of a desktop viewport: the layout is not using the canvas
  if (vw >= 1100 && cards.length) {
    const bottom = Math.max(...cards.map((c) => c.getBoundingClientRect().bottom + scrollY));
    const blank = vh - bottom;
    if (doc.scrollHeight <= vh + 1 && blank > Math.max(120, vh * 0.12))
      add('unused-canvas', 'medium', `content ends at ${Math.round(bottom)}px of a ${vh}px viewport (${Math.round(blank)}px blank). Let chart rows grow (see .fit in base.css) or add useful content`, '');
  }

  // KPI-like cards that are all the same size: no focal point
  const kpis = cards.filter((c) => c.querySelector('.kpi'));
  if (kpis.length >= 3) {
    const sizes = new Set(kpis.map((c) => Math.round(c.getBoundingClientRect().width / 8)));
    if (sizes.size === 1 && !kpis.some((c) => c.querySelector('.kpi.hero')))
      add('flat-kpi-band', 'low', 'all KPI cards share one size and none is marked .hero; consider a primary tile', '');
  }

  // 3. charts too small to read (desktop only)
  if (vw >= 1000) {
    const charts = [...document.querySelectorAll('.chart, .card svg, .card canvas')].filter(visible);
    const seen = new Set();
    charts.forEach((e) => {
      const host = e.closest('.chart') || e;
      if (seen.has(host) || host.classList.contains('spark')) return;
      seen.add(host);
      const r = host.getBoundingClientRect();
      if (r.width < 240 || r.height < 120)
        add('chart-too-small', 'high', `${Math.round(r.width)}×${Math.round(r.height)}px`, sel(host));
      if (r.height > 520)
        add('chart-too-tall', 'low', `${Math.round(r.height)}px tall`, sel(host));
    });
  }

  // 4. clipped text
  [...document.body.querySelectorAll('*')]
    .filter((e) => visible(e) && !e.closest('svg') && e.children.length === 0 && (e.textContent || '').trim())
    .forEach((e) => {
      const cs = getComputedStyle(e);
      if (cs.overflow !== 'visible' && e.scrollWidth > e.clientWidth + 1)
        add('text-clipped', 'low', `"${e.textContent.trim().slice(0, 30)}" truncated`, sel(e));
    });

  // 5. tiny fonts + contrast
  const parse = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => {
    const f = (v) => ((v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const bgOf = (e) => {
    const layers = [];
    for (let p = e; p; p = p.parentElement) {
      const c = parse(getComputedStyle(p).backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a === 1) break; }
    }
    let base = { r: 255, g: 255, b: 255 };
    for (let i = layers.length - 1; i >= 0; i--) {
      const l = layers[i];
      base = { r: l.r * l.a + base.r * (1 - l.a), g: l.g * l.a + base.g * (1 - l.a), b: l.b * l.a + base.b * (1 - l.a) };
    }
    return base;
  };
  const tiny = [], lowc = {};
  [...document.body.querySelectorAll('*')]
    .filter((e) => visible(e) && !e.closest('svg') && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
    .forEach((e) => {
      const cs = getComputedStyle(e);
      const fs = parseFloat(cs.fontSize);
      if (fs < 11) tiny.push(sel(e) + ' ' + fs + 'px');
      let fg = parse(cs.color);
      if (!fg) return;
      const bg = bgOf(e);
      if (fg.a < 1) fg = { r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a) };
      const [a, b] = [lum(fg), lum(bg)];
      const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      const large = fs >= 24 || (fs >= 18.66 && parseInt(cs.fontWeight) >= 700);
      if (ratio < (large ? 3 : 4.5)) lowc[sel(e)] = +ratio.toFixed(2);
    });
  if (tiny.length) add('tiny-font', 'medium', `${tiny.length} elements under 11px`, [...new Set(tiny)].slice(0, 4).join(', '));
  const lc = Object.entries(lowc);
  if (lc.length) add('low-contrast', 'high', `${lc.length} text styles below WCAG AA`, lc.slice(0, 5).map(([k, v]) => `${k} ${v}:1`).join(', '));

  // 6. tiny interactive targets, WCAG 2.2 SC 2.5.8: >= 24x24 CSS px, or undersized with the spacing exception
  //    (a 24px circle centred on the target must not touch another target, nor another undersized target's circle).
  //    Not modelled: inline-in-text, equivalent-control, user-agent and essential exceptions.
  const targets = [...document.querySelectorAll('button, a[href], input, select, [role=button], [role=tab]')]
    .filter((e) => visible(e) && !inScroller(e)).map((e) => ({ e, r: e.getBoundingClientRect() }));
  const small = targets.filter(({ r }) => r.width < 24 || r.height < 24).filter(({ e, r }) => {
    const c = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    return targets.some((o) => {
      if (o.e === e) return false;
      const dx = Math.max(o.r.left - c.x, 0, c.x - o.r.right), dy = Math.max(o.r.top - c.y, 0, c.y - o.r.bottom);
      if (Math.hypot(dx, dy) < 12) return true; // circle touches the other target
      const oc = { x: o.r.left + o.r.width / 2, y: o.r.top + o.r.height / 2 };
      return (o.r.width < 24 || o.r.height < 24) && Math.hypot(oc.x - c.x, oc.y - c.y) < 24; // two undersized circles intersect
    });
  }).map(({ e }) => sel(e));
  if (small.length) add('small-target', 'low', `${small.length} undersized controls fail WCAG 2.5.8 spacing`, [...new Set(small)].slice(0, 4).join(', '));

  // 7. empty-looking cards
  cards.forEach((c) => {
    if (!(c.innerText || '').trim() && !c.querySelector('svg, canvas, img'))
      add('empty-card', 'medium', 'card has no content', sel(c));
  });

  return { metrics, issues };
}

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const report = [];
  for (const [w, h] of viewports) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e.message || e)));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.goto(url, { waitUntil: 'networkidle' }).catch((e) => errors.push('load: ' + e.message));
    await page.waitForTimeout(400); // let ResizeObserver-driven charts settle
    const res = await page.evaluate(audit);
    const fold = path.join(outDir, `${base}-${w}x${h}-fold.png`);
    const full = path.join(outDir, `${base}-${w}x${h}-full.png`);
    await page.screenshot({ path: fold });
    if (res.metrics.screensTall > 1.02) await page.screenshot({ path: full, fullPage: true });
    errors.forEach((e) => res.issues.push({ kind: 'console-error', severity: 'high', detail: e.slice(0, 160), where: '' }));
    report.push({ viewport: `${w}x${h}`, screenshots: { fold, ...(res.metrics.screensTall > 1.02 ? { full } : {}) }, ...res });
    await page.close();
  }
  await browser.close();
  if (args.includes('--brief')) {
    report.forEach((r) => {
      console.log(`${r.viewport}  ${r.metrics.screensTall} screens, first-screen card coverage ${r.metrics.firstScreenCardCoverage}`);
      r.issues.forEach((i) => console.log(`  [${i.severity}] ${i.kind}: ${i.detail}${i.where ? ' | ' + i.where : ''}`));
    });
  } else console.log(JSON.stringify(report, null, 2));
  const high = report.flatMap((r) => r.issues).filter((i) => i.severity === 'high').length;
  console.error(`\n${report.length} viewports checked; ${high} high-severity issues. Now LOOK at the screenshots — this report cannot judge composition.`);
})();
