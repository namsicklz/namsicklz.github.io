# Testing log

Three dashboards were built with this skill and refined through render → look → fix: `assets/layout-examples/{finance,fitness,analytics}.html`. Regenerate screenshots any time:

```bash
node .claude/skills/dashboard-design-master/scripts/inspect.cjs .claude/skills/dashboard-design-master/assets/layout-examples/finance.html --out /tmp/shots
```

**Limits of this test.** The author of the skill also ran it, so it is a sanity check, not a blind trial; no baseline run without the skill was made; data is synthetic; only Chromium at four viewports was checked. Research sources were not fetched (see `sources.md`).

## What the render loop found (and the inspector did not)

| Test | Defects found by *looking* | Fixed where |
|---|---|---|
| A Finance (4 passes) | Flat KPI band (no hero); heaviest element was the least informative series (constant income as thick bars); six hues on one-meaning bars; "$0k" label; green ▲ on a 0% change; points shown as % ; ~250px blank band at 1080p; list cards over-stretched when rows grew; zero gap between sections at 1024 | `.kpis` hero ratio; `.fit` + `max-height`; `Chart.bars overlay`; `hbars maxPitch`; `.page` flex gap; inspector `unused-canvas`, `flat-kpi-band` |
| B Fitness (3 passes) | 5 KPIs in a 4-col template: orphan tile pushed the page; goal bars in the Run blue (status colour clash); odd pace ticks (5:43, 5:37); heatmap label clipped; hero cramped in a half-width column on mobile | `.kpis` auto columns + mobile span rules; `.bar .ok/.warn/.over`; `line zero:false` baseline snap; heat label guard; inspector `orphan-card` (verified against the reintroduced bug) |
| C Analytics (3 passes) | `overflow:hidden` on a `<td>` inflated rows to 56px and misaligned borders; table unbounded at 1024 (4.3 screens); numbers not under right-aligned header; categorical histogram labels thinned; title/chip wrapping and lost row label on 390px | ellipsis on wrapper; `.tablecard` fixed height at all widths; bar-before-number; `xticks` thin only if widest label cannot fit; mobile topbar/sticky first column |

## Self-assessment of the finished examples

| Dimension | Finance | Fitness | Analytics |
|---|---|---|---|
| Spatial efficiency | One screen at 1440x900 and 1920x1080, no dead bands | One screen at both; goal card slightly airy at 1920 | 1.4 screens, deliberate (table is the endpoint) |
| Layout balance | 8+4 / 4+4+4, asymmetry works | 7+5 / 4+4+4, hero tile anchors | 8+4 / 4+4+4 / 12; strip saves padding |
| Hierarchy | Hero tinted tile, income line over bars | Hero with progress bar | Primary stat slightly larger; modest, could be stronger |
| Component sizing | KPI ~105px, charts ≥ 300px | same | same; table shows 9 rows |
| Chart readability | Good; income/expense meaning consistent | Good; stacked 4-colour bars acceptable | Good; heatmap has no scale legend (tooltip only) |
| Polish | Consistent | Consistent | Consistent; some default select styling remains |

## Known weaknesses still open

- Analytics KPI hierarchy is subtle; a stronger primary emphasis would help.
- `charts.js` has no legend-free heatmap scale and no keyboard focus on marks (tooltips are hover-only; accessible names are on hosts).
- Inspector checks are heuristic: `dead-space-in-card` can false-positive on intentionally tall cards; contrast ignores gradients/images.
- Dark mode was designed (tokens) but not screenshot-reviewed in these tests.
- Light touch/hover behaviour was only smoke-tested (filters, sort, reset) for analytics.

## Verification pass (2026-10-30)

After the first build, network access to nngroup.com, w3.org and perceptualedge.com was allowed and the claims in the reference files were checked against: Nielsen's ten heuristics page; WCAG 2.2 Understanding pages for SC 1.4.3, 1.4.11, 2.5.8, 1.4.1; and Few's 2006 *Common Pitfalls in Dashboard Design* white paper. Details of what matched and what was corrected are in `sources.md`. The checks that changed the skill itself:

| Finding | Evidence | Change |
|---|---|---|
| Our own text token failed AA on non-white surfaces | measured: `text-3` 4.15:1 on `surface-2`, 4.05:1 on hero tint; `warn` text 4.18:1 | tokens darkened (`text-3` #626c7a, `warn` #9e5e00, `pos`, `neg`), re-measured ≥ 4.5 on surface/surface-2/bg/tint |
| Control borders 1.25:1 vs the 3:1 WCAG 1.4.11 asks for boundaries that identify controls | measured | new `--border-ctl` token for inputs, selects, buttons; selected segment gets weight + 3:1 ring |
| Hero tint was a gradient layer, so the inspector measured text against white | inspector blind spot | hero now a solid `color-mix` colour; contrast tool sees it |
| Gridline claim unsupported | WCAG 1.4.11 chart example counts value lines as graphical objects | `accessibility.md`: light gridlines only if values are readable another way |
| Target-size check ignored the spacing exception | WCAG 2.5.8 | inspector implements size + spacing exception; unit-tested (touching 20px pair flagged, 4px-gapped pair and lone 16px pass) |
| Skill cited Few for "at a glance" but omitted his single-screen rule | Few's definition and pitfall #1 | `SKILL.md` and `spatial-efficiency.md` state the rule, where this skill departs (exploratory dashboards), and the guardrail it keeps (don't fragment comparisons) |
| Misattributions | Few's paper has no bullet graphs, sparklines or dual-axis rule | re-tagged [R]/[M] in `data-visualization.md` |

Few's paper independently supports three lessons the render loop found: colour with no meaning (#12), stretched sections to fill space (#13), and everything equally prominent (#10).

**Still unverified:** Tufte, Ware, Munzner, Cleveland & McGill, Bertin, Sweller, Brewer, Wilke, Wathan & Schoger, Few's book, SC 1.4.10 and 2.5.5. They are books or pages not fetched; their claims are tagged [R].
