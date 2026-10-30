---
name: dashboard-design-master
description: Design, build, redesign, or critique dashboards and analytics UIs with expert layout, spatial efficiency, visual hierarchy and polish, then verify them by rendering screenshots and iterating. Use whenever the user wants to create, design, improve, redesign, polish, or review a dashboard, analytics page, KPI/metrics view, admin panel, tracker or data-heavy UI, or says things like "make better use of the space", "improve the hierarchy", "make it more polished", "optimize the layout for desktop", "review this UI/UX", or "responsive analytics interface", even if they never say the word dashboard.
---

# Dashboard Design Master

Act as a senior product designer who also writes the frontend and the charts. The bar: **every dashboard looks deliberately composed, not assembled from components.** The single most important habit is that you inspect your own rendered output and fix it. Code that produces a valid layout is not evidence of a good layout.

## The loop

1. **Plan the composition before any markup.** Fill in the layout plan below (in your head or in your reply for a non-trivial dashboard). Skipping this is the root cause of uniform card grids and wasted space.
2. **Build** with a real grid, real (or realistic) data, and the starter assets.
3. **Render and look.** Run `scripts/inspect.cjs`, then actually view the screenshots with Read. Fix what you see. Repeat until changes stop mattering (usually 2-3 passes).
4. **Report** what you built, the layout reasoning in 3-5 lines, and anything you could not verify.

Load only what the task needs:

| Task | Read |
|---|---|
| New dashboard | `workflows/create-dashboard.md`, `references/spatial-efficiency.md`, `references/dashboard-patterns.md` |
| Improve / redesign / review existing | `workflows/redesign-and-critique.md` |
| Render-fix cycle (always, after building) | `workflows/visual-refinement.md` |
| Choosing or styling a chart | `references/data-visualization.md` |
| Type, spacing, color, density questions | `references/typography-and-spacing.md`, `references/visual-hierarchy.md` |
| Grid and responsive behaviour | `references/layout-principles.md` |
| Contrast, keyboard, color-blindness | `references/accessibility.md` |
| Design tokens / starter code | `references/design-system.md`, `assets/` |
| Which claims are evidence vs taste | `references/sources.md` |
| What went wrong in past builds | `references/testing-log.md`, the defects list in `workflows/visual-refinement.md` |

## Layout plan (do this first)

Write down, briefly:

1. **Purpose and reader.** What decision or glance does this support? Monitor-at-a-glance, explore, or report? That sets density.
2. **Inventory.** Every metric, chart, filter, table. Mark each **P1** (answer in 2 seconds), **P2** (supporting), **P3** (detail on demand).
3. **Relationships.** What is compared with what? Related things share a row or a card and an axis scale.
4. **Space budget.** Target viewport (default desktop 1440x900, check 1920x1080 and 1024). Rough rows: toolbar ~52px, KPI band ~90-110px, main chart row ~320-380px, secondary row ~260-300px. Assign each item a 12-column span from its content needs, not equal shares.
5. **Consolidate.** Merge KPIs that carry little (a value + delta + sparkline in one compact tile), fold P3 into tabs, drawers, or table rows.
6. **Narrow-screen plan.** What stacks first, what hides, what becomes a scrollable table.

## Spatial rules that matter most

- **Size to content, not to symmetry.** A KPI is ~90-110px tall, not 200. A time series gets 2-3x the width of a category breakdown. A table gets full width. Equal-size cards are a smell, not a default.
- **Deliberate scroll beats cramming.** Put P1 and the main comparison in the first screen (about 1.0-1.6 screens total is typical), but never shrink a chart below ~240x140px to avoid scrolling.
- **Gaps and padding are a system.** One gap value (12px) between cards, one card padding (14-16px). No dead rows, no orphan card alone on a row, no card whose bottom third is empty.
- **Rows align.** Cards in a row share top and height; charts stretch to fill their card (`flex:1`), they are not given a fixed height with leftover space.
- **Whitespace is for grouping.** Space between groups > space within groups (proximity). Padding to look "airy" is waste.
- **Controls are compact.** Filters in a toolbar (segmented control, selects, chips), not a sidebar, unless there are many filters or navigation sections.

## Hierarchy rules that matter most

- One focal point per screen: typically the primary KPI or the main chart. Size, position (top-left first in LTR), and contrast carry rank. If everything is bold, nothing is.
- Three type tiers on a card: label (12px, muted), value (24-32px, strong), context (12px, muted: delta, period, target).
- Color is for meaning, not decoration. One accent; semantic green/red only for good/bad and never alone (add sign or arrow). Neutral surfaces, text in three contrast steps.
- Tabular numerals, right-aligned numeric columns, units in labels rather than repeated in every value.

## Chart rules in one breath

Pick the chart for the question (trend: line; compare categories: sorted bars; part of whole: stacked bar or simple bars, rarely pie; distribution: histogram; correlation: scatter; pattern over two dimensions: heatmap; one number: just the number). Bars start at zero. Direct-label instead of a legend when you can. Light gridlines, muted axis text, no 3D, no dual axes. Always give a chart enough room to read. If a number or a table answers it faster, use that. Details in `references/data-visualization.md`.

## Anti-patterns to catch in your own output

- Grid of identical cards with a title and one number each
- KPI cards 200px tall holding one number
- Chart with a legend taking 30% of its card, or ≥7 colors
- Card with large empty bottom area, or content hugging top with fixed height
- Heavy shadows, gradients on everything, 16px+ radii, decorative icons per KPI
- Everything the same size and weight, so no entry point
- Tables with every column left-aligned and no numeric alignment
- Different card paddings, radii, or font sizes between sections
- Truncated labels with no way to see the full text
- Fixed pixel layouts that overflow below 1100px

## Tools

- `node .claude/skills/dashboard-design-master/scripts/inspect.cjs <file|url> --out <dir> [--brief]` renders 1440x900, 1920x1080, 1024x768, 390x844 and reports: horizontal overflow, uneven row heights, dead space in cards, orphan cards, unused canvas on tall screens, flat KPI band, too-small charts, low contrast, tiny fonts, small targets, console errors, page height in screens. `--brief` prints one line per issue. It finds defects; it cannot judge composition, so always view the PNGs (it reported zero issues on first drafts that visibly needed work).
- `assets/base.css` (tokens, 12-col `.grid`, `.kpis` hero band that adapts to any tile count, `.page.fit` + `.grid.fill` to use a tall viewport, card, table, controls, status bars, states), `assets/charts.js` (line, bars with overlay, hbars, spark, heat as responsive SVG that fills its host), `assets/design-tokens.json`. Copy and retune; use the project's own stack and chart library when it has one and borrow only the principles.
- `assets/layout-examples/` holds worked, screenshot-verified dashboards (finance, fitness, analytics). Skim the closest one before composing.

## When you cannot render

If no browser is available, say so explicitly in your reply, still do the code-level checks (grid spans sum to 12 per row, no fixed widths that exceed 1024, min-height on charts, `min-width:0` on grid children, `flex:1` on chart hosts), and list what remains unverified.

## Scope guardrails

Match the project's existing stack, framework, and visual language when editing something that exists. Keep new structure proportional: a personal dashboard is one HTML file or one component, not an architecture. Do not invent data sources; use clearly-labelled sample data when real data is not available.
