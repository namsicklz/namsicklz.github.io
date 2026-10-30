# Data visualization

Choose by the question, draw it honestly, give it room. Tags: [V] verified against a source read on 2026-10-30, [R] recalled and unchecked, [C] convention, [H] heuristic, [M] this skill's own rule (see `sources.md`).

## What the research supports

- **Encoding accuracy** (Cleveland & McGill; echoed by Munzner/Ware) [R]: position on a common scale > length > angle/slope > area > color saturation/lightness. Use the strongest channel for the most important comparison. This is why bars beat pies for comparison, and why aligned baselines matter.
- **Bar length requires a zero baseline** [V: Few #8 shows a bar scale that makes revenue look 4x costs when it is under 2x; R: Cleveland & McGill]: truncating bars distorts the ratio. Lines/dots may use a non-zero axis (the information is position/slope), but say so when it matters.
- **Preattentive features** (position, size, orientation, color hue) [R: Ware]: pop out if unique; one accent in a field of neutrals draws the eye, many accents cancel each other.
- **Data-ink / chartjunk / lie factor** (Tufte) [R for integrity, C for the "ink minimalism" extreme]: remove what carries no information; keep what aids reading (light gridlines, direct labels).
- **Small multiples** [R: Tufte]: repeated small charts on shared scales beat one chart with 8 overlapping series.
- **Few, *Common Pitfalls in Dashboard Design* (2006)** [V, read]: dashboards are for monitoring "at a glance" on a single screen (see `spatial-efficiency.md` for how this skill treats that); give measures context (#2); don't show more detail or precision than needed, "$3.8M" not "$3,848,305.93" (#3); express measures directly, e.g. variance as a percentage, instead of leaving the reader to subtract (#4); if you must read the numbers to compare pie slices, use a table or bars (#5); don't vary chart types for variety, consistency lets the reader reuse one perceptual strategy (#6); no 3-D, and place bars that must be compared next to each other (#7); a bar scale must not misrepresent quantities (#8); no colour that means nothing (#12).
- **Few's book** [R, not read]: bullet graphs for actual-vs-target, sparklines for trend context, and his objections to gauges are developed in *Information Dashboard Design*, not in the 2006 paper. The paper itself only shows a gauge that uses "a great deal of space ... to tell us far too little" (#2).

## Chart selection

| Question | Use | Notes |
|---|---|---|
| One number now | Big number + context (delta, target, sparkline) | A chart is wasted on a single value |
| Trend over time | Line (area only for single series/cumulative) | ≥ 6 points; x = time, evenly spaced |
| Compare categories | Horizontal bars sorted by value (long labels) or vertical bars (few, short labels) | zero baseline; label values directly |
| Part-to-whole | Stacked bar (few parts), 100% bar, or simple sorted bars; donut only for ≤ 5 parts and one clear point | pies are weak for comparing similar slices |
| Composition over time | Stacked area/bars (≤ 5 series) or small multiples | order series by size; stable colors |
| Distribution | Histogram, box/strip; or a table of quantiles | bins matter; label bin width |
| Correlation | Scatter (+ trend line only if meaningful) | ≥ 15 points; label outliers |
| Two dimensions of pattern | Heatmap / calendar heatmap | single-hue sequential; visible legend or tooltips |
| Progress vs target | Bullet chart or thin progress bar | not a gauge/speedometer |
| Rank/precision, many items | Table with inline bars / sparklines | text is faster than 40 bar labels |
| Many series over time | Small multiples, or highlight one + gray others | > 5 lines = spaghetti |

When to use a table instead of a chart: need exact values, mixed units per row, many dimensions, fewer than ~4 data points, or users will look things up.

## Construction rules

**Space**
- A chart needs ≥ ~240px wide and ~140px tall to read [H]; line charts with many points want ≥ 320x180.
- Fill the card: the plot is the content. Legend and title should not outweigh the plot.

**Axes and labels**
- Light horizontal gridlines (1px, ~10% contrast); no vertical gridlines on time series unless needed; no box.
- Tick labels 11-12px, muted; 3-5 y ticks; "nice" tick values (0, 25, 50...). Thin x labels to avoid overlap; never rotate to 45° if you can thin or abbreviate.
- Compact formatting on axes (12k), full values in tooltip/table.
- No axis title when the card title already says it. If both needed, put unit in the title ("Spending ($)").

**Color**
- One hue = one meaning across the whole dashboard (e.g., Income always blue, Expenses always orange). Don't give each bar in a labelled bar chart its own colour: "the colors mean nothing" and the reader wastes time looking for a meaning [V: Few #12]. Use one hue and accent only the focus.
- ≤ 5-6 categorical colors; beyond that group into "Other" or use small multiples.
- Sequential: one hue, varying lightness. Diverging only when there's a meaningful midpoint.
- Direct emphasis: accent for the focus series, gray for context.
- Don't encode good/bad with red/green alone; add sign, label, or icon.

**Legends and labels**
- Prefer direct labels (series name at line end, value at bar end). If a legend is needed: inline in card header, one row, small swatches.
- Label the notable points (latest value, max, a target line), not every point.

**Honesty**
- Zero baseline for bars; consistent scales across comparable charts (shared y-axis in a row of small multiples).
- Same chart type for the same kind of question across the dashboard; don't alternate types for variety [V: Few #6].
- Don't smooth lines to invent data; don't connect gaps as if values existed.
- Sort bars; keep time in natural order.
- No 3D [V: Few #7]. No dual y-axes [M: this skill's rule, not in Few's paper]: they invite false correlation, so use two stacked charts with a shared x.

**Interactivity** (add only if it provides value)
- Tooltip: exact values for the hovered x/category; keep short; follow cursor; no flicker.
- Crosshair on line charts; highlight on hover for bars.
- Click-to-filter only when the effect is obvious and reversible.
- Brushing/zoom for long time series.
- Always provide the data in a non-hover way (table below, or visible labels) for keyboard/touch.

## KPI tiles with context

A number alone lacks meaning. Add: comparison (vs previous period, with sign and arrow), target (progress), trend (sparkline of the same metric), or range. Choose one or two, not all.

## Empty, loading, error

- Loading: skeleton with the same dimensions as the final chart (prevents layout shift).
- Empty: one-line explanation + next step; keep the card's size.
- Error: concise message and retry; don't collapse the card.

## Chart review checklist

Right chart for the question? · Zero baseline on bars? · Readable at its size? · Axis ticks/labels not colliding? · Colors consistent with the rest of the page? · Legend needed or can labels replace it? · Is the main comparison the easiest one to see? · Tooltip adds exact values? · Would a number/table be clearer?
