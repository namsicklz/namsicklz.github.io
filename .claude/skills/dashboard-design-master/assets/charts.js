/* Tiny dependency-free SVG charts that fill their `.chart` host and redraw on resize.
   Chart.line(host,{x:[...],series:[{name,values,color?}],area?,fmt?,zero?})
   Chart.bars(host,{x:[...],series:[...],stacked?,fmt?})      vertical, zero baseline always
   Chart.hbars(host,{items:[{label,value,color?}],fmt?})      ranked horizontal bars with value labels
   Chart.spark(host,{values,area?,color?})                    axis-free trend
   Chart.heat(host,{values:[[row...]],rowLabels?,colLabels?,fmt?,aspect?})  sequential single-hue grid
   Use for real projects too, or swap for the project's chart library; the *design rules* are what matter. */
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
  const el = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a || {}) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const fmtDef = (v) => { const a = Math.abs(v); return a >= 1e6 ? (v / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : a >= 1e3 ? (v / 1e3).toFixed(1).replace(/\.0$/, '') + 'k' : String(Math.round(v * 10) / 10); };
  const nice = (max, n = 4) => { if (max <= 0) return { max: 1, step: 0.25 }; const raw = max / n, p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p; const s = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; return { step: s, max: Math.ceil(max / s - 1e-9) * s }; };
  const color = (i) => css('--c' + ((i % 6) + 1));

  function mount(host, draw) {
    host.classList.add('chart');
    const run = () => {
      const r = host.getBoundingClientRect();
      if (r.width < 10 || r.height < 10) return;
      host.replaceChildren();
      const svg = el('svg', { width: Math.floor(r.width), height: Math.floor(r.height), role: 'img' });
      host.appendChild(svg);
      draw(svg, Math.floor(r.width), Math.floor(r.height));
    };
    new ResizeObserver(run).observe(host);
    run();
  }
  function tooltip(host) {
    const t = document.createElement('div'); t.className = 'tip'; t.style.display = 'none'; host.appendChild(t);
    return { show(x, y, html) { t.innerHTML = html; t.style.display = 'block'; const w = t.offsetWidth; t.style.left = Math.min(Math.max(4, x + 12), host.clientWidth - w - 4) + 'px'; t.style.top = Math.max(4, y - 10) + 'px'; }, hide() { t.style.display = 'none'; } };
  }
  function axes(svg, W, H, m, yMax, step, fmt) {
    const ih = H - m.t - m.b;
    for (let v = 0; v <= yMax + 1e-9; v += step) {
      const y = m.t + ih - (v / yMax) * ih;
      el('line', { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: css('--grid'), 'stroke-width': 1 }, svg);
      const t = el('text', { x: m.l - 6, y: y + 4, 'text-anchor': 'end', fill: css('--text-3'), 'font-size': 11 }, svg); t.textContent = fmt(v);
    }
  }
  function xticks(svg, labels, xAt, W, m, H, bandHalf) {
    const need = Math.max(...labels.map((l) => String(l).length)) * 6.4 + 10, band = (W - m.l - m.r) / labels.length; // thin only when the widest label cannot fit its slot
    const per = Math.max(1, Math.ceil(need / band));
    labels.forEach((l, i) => { if (i % per) return; const t = el('text', { x: xAt(i), y: H - 5, 'text-anchor': 'middle', fill: css('--text-3'), 'font-size': 11 }, svg); t.textContent = l; });
  }
  const lmargin = (max, fmt) => Math.max(26, String(fmt(max)).length * 6.4 + 12);

  function line(host, o) {
    if (o.area && o.zero === false) o = Object.assign({}, o, { area: false }); // shaded area implies a zero baseline (proportional ink)
    mount(host, (svg, W, H) => {
      const fmt = o.fmt || fmtDef, all = o.series.flatMap((s) => s.values);
      let lo = 0, n = nice(Math.max(...all), 4);
      if (o.zero === false) { const mn = Math.min(...all), mx = Math.max(...all); n = nice(mx - mn || 1, 4); lo = Math.floor(mn / n.step) * n.step; n = { step: n.step, max: Math.ceil((mx - lo) / n.step - 1e-9) * n.step }; } // snap baseline to a tick so labels are round
      const yMax = n.max, step = n.step;
      const m = { l: lmargin(yMax + lo, fmt), r: o.series.length > 1 ? 8 : 10, t: 8, b: 22 };
      const iw = W - m.l - m.r, ih = H - m.t - m.b, N = o.x.length;
      const xAt = (i) => m.l + (N === 1 ? iw / 2 : (i / (N - 1)) * iw), yAt = (v) => m.t + ih - ((v - lo) / yMax) * ih;
      for (let v = 0; v <= yMax + 1e-9; v += step) {
        const y = m.t + ih - (v / yMax) * ih;
        el('line', { x1: m.l, x2: W - m.r, y1: y, y2: y, stroke: css('--grid') }, svg);
        const t = el('text', { x: m.l - 6, y: y + 4, 'text-anchor': 'end', fill: css('--text-3'), 'font-size': 11 }, svg); t.textContent = fmt(v + lo);
      }
      xticks(svg, o.x, xAt, W, m, H);
      o.series.forEach((s, k) => {
        const c = s.color || color(k);
        const pts = s.values.map((v, i) => [xAt(i), yAt(v)]);
        const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('');
        if (o.area && k === 0) el('path', { d: d + `L${pts[N - 1][0]} ${m.t + ih}L${pts[0][0]} ${m.t + ih}Z`, fill: c, opacity: 0.12 }, svg);
        el('path', { d, fill: 'none', stroke: c, 'stroke-width': s.dash ? 1.5 : 2, 'stroke-dasharray': s.dash ? '4 3' : null, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }, svg);
        if (!s.dash) { const e = pts[N - 1]; el('circle', { cx: e[0], cy: e[1], r: 3.5, fill: c }, svg); }
      });
      const tip = tooltip(host), guide = el('line', { y1: m.t, y2: m.t + ih, stroke: css('--text-3'), 'stroke-dasharray': '3 3', opacity: 0 }, svg);
      svg.addEventListener('mousemove', (ev) => {
        const r = svg.getBoundingClientRect(), mx = ev.clientX - r.left;
        const i = Math.max(0, Math.min(N - 1, Math.round(((mx - m.l) / iw) * (N - 1))));
        guide.setAttribute('x1', xAt(i)); guide.setAttribute('x2', xAt(i)); guide.setAttribute('opacity', 1);
        tip.show(xAt(i), m.t + 10, `<b>${o.x[i]}</b>` + o.series.map((s, k) => `<div><i style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${s.color || color(k)};margin-right:6px"></i>${s.name || ''} ${fmt(s.values[i])}</div>`).join(''));
      });
      svg.addEventListener('mouseleave', () => { tip.hide(); guide.setAttribute('opacity', 0); });
    });
  }

  function bars(host, o) {
    mount(host, (svg, W, H) => {
      const fmt = o.fmt || fmtDef, N = o.x.length, S = o.series.length;
      const tot = o.x.map((_, i) => Math.max(o.overlay ? o.overlay.values[i] : 0, o.stacked ? o.series.reduce((a, s) => a + s.values[i], 0) : Math.max(...o.series.map((s) => s.values[i]))));
      const n = nice(Math.max(...tot), 4), yMax = n.max;
      const m = { l: lmargin(yMax, fmt), r: 6, t: 8, b: 22 }, iw = W - m.l - m.r, ih = H - m.t - m.b;
      axes(svg, W, H, m, yMax, n.step, fmt);
      const band = iw / N, bw = Math.min(o.stacked ? 40 : 28, (band * 0.7) / (o.stacked ? 1 : S));
      const cx = (i) => m.l + band * (i + 0.5);
      xticks(svg, o.x, cx, W, m, H);
      const tip = tooltip(host);
      o.x.forEach((lab, i) => {
        let acc = 0;
        o.series.forEach((s, k) => {
          const v = s.values[i], h = (v / yMax) * ih, c = s.color || color(k);
          const x = o.stacked ? cx(i) - bw / 2 : cx(i) - (bw * S) / 2 + k * bw;
          const y = o.stacked ? m.t + ih - ((acc + v) / yMax) * ih : m.t + ih - h;
          const r = el('rect', { x, y, width: Math.max(1, bw - (o.stacked ? 0 : 2)), height: Math.max(0, h - (o.stacked && k < S - 1 ? 1 : 0)), fill: c, rx: 2 }, svg);
          r.addEventListener('mousemove', (ev) => { const b = host.getBoundingClientRect(); tip.show(ev.clientX - b.left, ev.clientY - b.top, `<b>${lab}</b><div>${s.name || ''} ${fmt(v)}</div>`); });
          r.addEventListener('mouseleave', () => tip.hide());
          acc += v;
        });
      });
      if (o.overlay) { // reference line over the bars (e.g. income over expenses): the gap is the story
        const c = o.overlay.color || css('--c1'), pts = o.overlay.values.map((v, i) => [cx(i), m.t + ih - (v / yMax) * ih]);
        el('path', { d: pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(''), fill: 'none', stroke: c, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }, svg);
        pts.forEach((p) => el('circle', { cx: p[0], cy: p[1], r: 3, fill: c }, svg));
      }
    });
  }

  function hbars(host, o) {
    mount(host, (svg, W, H) => {
      const fmt = o.fmt || fmtDef, it = o.items, max = Math.max(...it.map((d) => d.value));
      const lw = Math.min(150, Math.max(...it.map((d) => d.label.length)) * 6.6 + 8), vw = Math.max(...it.map((d) => fmt(d.value).length)) * 7 + 8;
      const rowH = Math.min(H / it.length, o.maxPitch || 40), bh = Math.min(18, rowH * 0.55), top = (H - rowH * it.length) / 2; // cap pitch, centre the block: stretched bars read as sparse
      it.forEach((d, i) => {
        const y = top + i * rowH + rowH / 2, w = ((W - lw - vw - 6) * d.value) / max;
        const l = el('text', { x: 0, y: y + 4, fill: css('--text-2'), 'font-size': 12 }, svg); l.textContent = d.label;
        el('rect', { x: lw, y: y - bh / 2, width: Math.max(2, w), height: bh, fill: d.color || css('--c1'), rx: 2 }, svg);
        const v = el('text', { x: lw + w + 6, y: y + 4, fill: css('--text'), 'font-size': 12 }, svg); v.textContent = fmt(d.value);
      });
    });
  }

  function spark(host, o) {
    host.classList.add('spark');
    mount(host, (svg, W, H) => {
      const v = o.values, lo = Math.min(...v), hi = Math.max(...v), c = o.color || css('--c1'), p = 3;
      const xAt = (i) => p + (i / (v.length - 1)) * (W - 2 * p), yAt = (x) => H - p - ((x - lo) / (hi - lo || 1)) * (H - 2 * p);
      const d = v.map((x, i) => (i ? 'L' : 'M') + xAt(i).toFixed(1) + ' ' + yAt(x).toFixed(1)).join('');
      if (o.area) el('path', { d: d + `L${W - p} ${H}L${p} ${H}Z`, fill: c, opacity: 0.12 }, svg);
      el('path', { d, fill: 'none', stroke: c, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }, svg);
      el('circle', { cx: xAt(v.length - 1), cy: yAt(v[v.length - 1]), r: 2.5, fill: c }, svg);
    });
  }

  function heat(host, o) {
    mount(host, (svg, W, H) => {
      const fmt = o.fmt || fmtDef, R = o.values.length, C = o.values[0].length, flat = o.values.flat(), mx = Math.max(...flat) || 1;
      const lw = o.rowLabels ? 30 : 0, tb = o.colLabels ? 16 : 0;
      const cw0 = (W - lw) / C, ch0 = (H - tb) / R, cw = Math.min(cw0, ch0 * (o.aspect || 1.35)), ch = Math.min(ch0, cw0 * (o.aspect || 1.35)), g = 2, tip = tooltip(host), base = css('--c1'); // near-square cells; block stays top-left
      if (o.colLabels) o.colLabels.forEach((l, j) => { if (l === '' || lw + j * cw + 34 > W) return; const t = el('text', { x: lw + j * cw, y: 11, fill: css('--text-3'), 'font-size': 11 }, svg); t.textContent = l; });
      o.values.forEach((row, i) => {
        if (o.rowLabels && o.rowLabels[i]) { const t = el('text', { x: 0, y: tb + i * ch + ch / 2 + 4, fill: css('--text-3'), 'font-size': 11 }, svg); t.textContent = o.rowLabels[i]; }
        row.forEach((v, j) => {
          const r = el('rect', { x: lw + j * cw + g / 2, y: tb + i * ch + g / 2, width: Math.max(2, cw - g), height: Math.max(2, ch - g), rx: 3, fill: v ? base : css('--surface-2'), opacity: v ? 0.2 + 0.8 * (v / mx) : 1 }, svg);
          r.addEventListener('mousemove', (ev) => { const b = host.getBoundingClientRect(); tip.show(ev.clientX - b.left, ev.clientY - b.top, `${(o.rowLabels || [])[i] || ''} ${(o.colLabels || [])[j] || ''} <b>${fmt(v)}</b>`); });
          r.addEventListener('mouseleave', () => tip.hide());
        });
      });
    });
  }

  window.Chart = { line, bars, hbars, spark, heat };
})();
