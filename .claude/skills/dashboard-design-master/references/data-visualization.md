# Data visualization

Choose by the question, draw it honestly, give it room. Tags: [E] evidence, [C] convention, [H] heuristic.

## What the research supports

- **Encoding accuracy** (Cleveland & McGill; echoed by Munzner/Ware) [E]: position on a common scale > length > angle/slope > area > color saturation/lightness. Use the strongest channel for the most important comparison. This is why bars beat pies for comparison, and why aligned baselines matter.
- **Bar length requires a zero baseline** [E]: truncating bars distorts the ratio. Lines/dots may use a non-zero axis (the information is position/slope), but say so when it matters.
- **Preattentive features** (position, size, orientation, color hue) [E: Ware]: pop out if unique; one accent in a field of neutrals draws the eye, many accents cancel each other.
- **Data-ink / chartjunk / lie factor** (Tufte) [E for integrity, C for the "ink minimalism" extreme]: remove what carries no information; keep what aids reading (light gridlines, direct labels).
- **Small multiples** [E: Tufte]: repeated small charts on shared scales beat one chart with 8 overlapping series.
- **Few: dashboards** [E/C]: show the most important things at a glance; avoid gauges, speedometers, decorative 3D; use bullet graphs for target comparison; sparklines for context.

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
- One hue = one meaning across the whole dashboard (e.g., Income always blue, Expenses always orange).
- ≤ 5-6 categorical colors; beyond that group into "Other" or use small multiples.
- Sequential: one hue, varying lightness. Diverging only when there's a meaningful midpoint.
- Direct emphasis: accent for the focus series, gray for context.
- Don't encode good/bad with red/green alone; add sign, label, or icon.

**Legends and labels**
- Prefer direct labels (series name at line end, value at bar end). If a legend is needed: inline in card header, one row, small swatches.
- Label the notable points (latest value, max, a target line), not every point.

**Honesty**
- Zero baseline for bars; consistent scales across comparable charts (shared y-axis in a row of small multiples).
- Don't smooth lines to invent data; don't connect gaps as if values existed.
- Sort bars; keep time in natural order.
- No 3D, no dual y-axes (they invite false correlation; use two stacked charts with a shared x).

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
