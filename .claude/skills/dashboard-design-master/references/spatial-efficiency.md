# Spatial efficiency

Goal: every region of the screen is purposeful. This is not "fill every pixel" and not "fit it all above the fold". Tags: [E] evidence, [C] convention, [H] heuristic (see sources.md).

## Think in a budget, not in cards

Start from the viewport (default 1440x900; also 1920x1080 and 1024x768) and spend it:

| Region | Typical height [H] | Notes |
|---|---|---|
| Top bar (title, filters, date range, theme) | 48-56px | one row; filters live here |
| KPI band | 84-110px | 3-6 compact tiles, or one wider hero + smaller tiles |
| Primary chart row | 300-380px | the main time series / comparison; wider than anything else |
| Secondary row | 240-300px | breakdowns, distributions, rankings beside each other |
| Detail table | 280-420px, internal scroll | full width; sticky header; or paginate/limit to 8-12 rows |

A 900px viewport minus chrome leaves ~800px: top bar + KPI band + primary row + a peek of the next row. A peek of the next row signals "more below" and is usually better than forcing everything into one screen.

## Size from content

- **KPI tile**: needs label + value + (delta, sparkline or target). That is ~90-110px tall. A tile that holds only a number can be a compact stat in a strip (no card) rather than a full card.
- **Line chart over time**: width matters more than height. Give it ≥ 6 of 12 columns; ≥ 8 if it has many points or 2+ series. Minimum ~320x180 to be readable [H].
- **Category bars**: height depends on item count (24-32px per row [H]); width can be narrow (4-5 columns).
- **Heatmap/calendar**: size by cell count, cells ≥ 12px.
- **Table**: width by columns (don't stretch 4 columns across 1400px: pair it with something, or cap column widths and use the remaining width for an adjacent chart); height by rows shown, then internal scroll.
- **Donut/pie**: rarely worth a card; consider sorted bars. If used, ≤ 5 slices and the card shouldn't be bigger than the legend+donut need.

## Compose for balance, not repetition

- Mix spans that sum to 12 per row: 8+4, 7+5, 5+4+3, 6+6, 3+3+3+3. Vary row rhythm: a row of 4 KPIs, then 8+4, then 4+4+4, then 12.
- Pair a wide dominant item with a narrow supporting one so the eye has an entry point and a resting point (asymmetry with balanced visual weight).
- Align edges: the right edge of the KPI band, charts, and table share the same grid lines.
- If the last row would leave an orphan, change spans or consolidate; don't leave a lone half-width card.

## Wasted space: what to hunt for

1. **Empty bottoms.** A card taller than its content because a neighbor is taller. Fix: make the content flex (chart stretches), re-pair items with similar content height, or move the short item elsewhere.
2. **Oversized KPIs.** Reduce padding, drop to one line of context, or put several in a strip.
3. **Padding inflation.** 24-32px card padding on a data dashboard. Use 14-16px.
4. **Over-stretched tables.** Columns far apart. Constrain widths or add useful columns/inline bars.
5. **Sidebar nobody needs.** A permanent 240px nav on a one-screen dashboard. Use top tabs or none.
6. **Legend on its own row/column** eating space. Direct-label, or place inline in the card header.
7. **Titles that repeat the axis** ("Revenue by month" + y-axis "Revenue" + legend "Revenue").

## Intentional whitespace (keep this)

- Gap between groups larger than gaps within groups (proximity) [E].
- Breathing room around the primary KPI/chart so it reads first.
- Line-height and cell padding enough to scan rows (table rows 32-40px).
- Margin around chart plot areas for axis labels. Cramped labels are worse than empty space.

Test: *if I removed this whitespace, would grouping or legibility suffer?* If no, it's waste. If yes, it's structure.

## Scrolling: when it's right

Prefer ~1.0-1.6 screens at desktop. Scroll is fine when: the content is sectioned (overview → detail), the table is the endpoint, or the alternative is charts < 140px tall. Scroll is wrong when: the first screen holds only chrome and filters, or when equal cards form an endless column. Sticky top bar (not sticky giant headers) keeps filters reachable. Tables scroll internally with a sticky header rather than pushing the page.

## Fixed vs fluid

- Page: fluid, with a max-width (~1760px) so ultra-wide screens don't stretch line charts into ribbons.
- Cards: fluid width via grid; height from rows: `grid-auto-rows: minmax(Npx, auto)` or content-driven with chart `flex:1; min-height`.
- Charts: always measure the host and redraw (ResizeObserver); never hard-code SVG size.
- Fixed-height exceptions: top bar, KPI sparkline, table viewport.
