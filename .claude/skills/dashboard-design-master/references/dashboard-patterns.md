# Dashboard patterns

Starting compositions, not templates. Pick the closest, then reshape to the content. Spans are 12-column at ≥ 1100px. Tags: [H] heuristic throughout (starting points, not findings).

## 1. Monitor / overview (glanceable)
```
[ top bar: title · period seg · filters ........................ ]
[ KPI ][ KPI ][ KPI ][ KPI ][ KPI ]            ← 5 × span 2-3, or hero(4)+4×2
[ primary trend  (8)                ][ breakdown (4) ]
[ ranking/bars (4) ][ distribution (4) ][ status/alerts (4) ]
```
Use when the reader checks status daily. Fits ~1.2 screens. Details on click.

## 2. Analytical explorer (filters drive a table)
```
[ top bar ......................................................]
[ filter toolbar: chips · selects · search · reset ............ ]
[ KPI strip (compact, unboxed, with dividers) ................. ]
[ chart A (6)                     ][ chart B (6)               ]
[ detail table (12), sticky header, internal scroll, inline bars]
```
Filters are a toolbar (compact). The table is the destination; sized 8-12 visible rows.

## 3. Personal tracker (finance / fitness / habits)
```
[ top bar: month/week selector ................................ ]
[ hero KPI (3) ][ KPI ][ KPI ][ KPI ] (each with sparkline)
[ trend chart (7)               ][ goals / progress (5)         ]
[ calendar or heat (5) ][ category/ranked (4) ][ recent list (3)]
```
Emphasize progress vs goals; a short recent-activity list adds human context. Keep it warm but restrained.

## 4. Operational / real-time
Status row first (health chips), then the key time series with a "now" marker, then logs/events table. Color for status only; avoid animation beyond a live dot.

## 5. Report / executive summary
One headline sentence/number, three supporting charts, one table. Reading order top to bottom; more whitespace, bigger type allowed because it's read, not monitored. Print/PDF friendly.

## Component recipes

**KPI tile (compact)** · label / value / delta+sparkline, 90-110px, padding 12-14px. Strip them in one row; hero tile is 1.5-2x wider, not 2x taller.

**KPI strip (unboxed)** · one card with dividers between 4-6 stats; saves padding and reads as a single band.

**Card header** · title (13-14px/600) left, optional subtitle muted, controls right (period seg, menu). Height consistent across cards.

**Toolbar** · title left, then segmented period, then selects/chips; right side: export/theme. Wraps gracefully; ~48px high.

**Table** · sticky header; first column text left; numbers right with tabular nums; row hover; limited columns (≤ 7 visible); inline bars in the metric column for scanning; sort indicator; sticky first column on narrow screens; pagination/"show more" over infinite height.

**Goals/progress** · label, current/target text, thin 6px bar; accent for on-track, warn/neg for off-track (with text, not just color).

**Ranked list/bars** · sorted desc, value labels at bar ends, "Other" bucket, max ~8 rows.

**Activity/recent list** · 3-5 rows, icon-free or one subtle marker, timestamp muted, right-aligned values.

**Insight line** · one sentence under a chart title when the takeaway isn't obvious ("Dining is up 24% vs last month"). Computed from data, not canned.

**Empty/loading** · same footprint as final content; skeleton blocks; empty message + action.

## Navigation

- 1-3 views: segmented control or tabs in the top bar.
- 4-8 sections: left rail (56-64px icon rail or 200px labeled) only if users move between them often.
- Deep detail: drawer or dedicated page, not an ever-longer scroll.

## Choosing density

| Context | Density | Card padding / gap | Row height |
|---|---|---|---|
| Executive / personal, glanced | Comfortable | 16 / 16 | 40 |
| Standard dashboard | Default | 14-16 / 12 | 36 |
| Ops / analyst, many metrics | Compact | 12 / 8 | 28-32 |

Density is a user need; it's never a reason to shrink fonts below 11-12px or charts below readable size.
