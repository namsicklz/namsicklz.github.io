# Layout principles

Tags: [E] evidence, [C] convention, [H] heuristic.

## Grid

- **12 columns** divide into 2, 3, 4, 6, which covers nearly every dashboard composition [C]. Gap 12px (16px for roomy, 8px for very dense). One gap value everywhere.
- Use CSS Grid for the page skeleton, Flexbox inside cards (header row, KPI row, stretching chart). Grid for 2D alignment, flex for 1D distribution.
- Always `minmax(0, 1fr)` and `min-width: 0` on grid children, or long labels/tables blow out columns and cause horizontal overflow.
- Rows: let content set height, but give rows a floor (`minmax(220px, auto)`) when they hold charts. For a row of charts that should match, make cards `align-items: stretch` (grid default) and charts `flex: 1`.
- Nested grids are fine (a card that holds a 2x2 of mini-stats); keep the same gap system, using a smaller gap (8px) inside cards.
- Subgrid is optional and useful for aligning internals across cards; don't rely on it if the project targets older browsers.

## Alignment, proximity, grouping (Gestalt) [E]

- **Proximity**: items closer together read as a group. Make inter-group space ≥ 1.5-2x intra-group space.
- **Common region**: a card boundary says "these belong together". Don't box things that don't need grouping; a KPI strip can be unboxed with dividers.
- **Similarity**: same style = same role. All KPI labels look alike; all chart titles look alike.
- **Continuity / alignment**: shared left edges and baselines create implied lines that organize the page. Align card titles, chart left edges, table first columns.
- **Figure-ground**: surface vs background contrast must be visible but subtle (e.g. #fff on #f5f6f8, or border instead of shadow).

## Symmetry, asymmetry, weight

- Symmetric layouts feel stable but can be dull and give no entry point. Prefer **asymmetric balance**: a wide dominant element offset by a narrow stack of supporting items.
- Visual weight comes from size, contrast, saturation, and density. A big, dark chart on the left is balanced by 2-3 smaller light items on the right.
- Place the highest-priority item where the eye begins (top-left in LTR, then across) [C]. Don't depend on a strict "F-pattern".

## Reading order

Top bar (context) → KPI band (status) → primary chart (why/trend) → secondary breakdowns (where) → table (which ones). It should read like a short story: *status → trend → cause → detail*. Source order in the DOM should match visual order for keyboard and screen-reader users.

## Rhythm

- Use a 4px base unit; spacing steps 4/8/12/16/24/32. Card padding and gaps from the scale only.
- Vertical rhythm: card headers all the same height and type; rows of cards separated by the same gap as columns.

## Responsive strategy (desktop-first, content-aware)

| Width | Behavior |
|---|---|
| ≥ 1600 | Page capped (max-width ~1760); optionally add a 4th column to breakdown rows |
| 1100-1599 | Full 12-col composition (design target) |
| 700-1099 | 6-col: KPIs 3-up or 2-up, charts 6-col wide, side-by-side pairs stack unless small |
| < 700 | Single column. KPI tiles in a 2-up grid (not 1-up), charts full width with `min-height` ~200px, tables scroll inside their card |

Rules: no horizontal page scroll ever; tables scroll within their container; filters wrap or collapse into a single "Filters" popover on narrow screens; hide P3 content (secondary columns, sparklines) before shrinking P1 content; touch targets ≥ 24px (prefer 36-44px on touch).

## Components: when to use what

| Need | Use | Not |
|---|---|---|
| Group of related facts, one chart | Card | Card around every single number |
| 3-6 key numbers | KPI strip (tiles) | Giant cards |
| Switch dimension/period of the same view | Segmented control, tabs | Duplicating charts |
| Several equally important views, user picks one | Tabs | Stacking all, forcing scroll |
| Optional detail, long lists | Expandable row, drawer, "view all" | Always-visible dump |
| Compare many items precisely | Table (with inline bars/sparklines) | Chart with 30 labels |
| Few global filters | Toolbar | Sidebar |
| Many filters or navigation sections | Collapsible side panel | Toolbar overflow |

## Layout failure modes

Equal-size card mosaic; orphan card; heights that differ by a few pixels (looks like a bug: make equal or deliberately different); inconsistent gaps; centered content in cards of different widths; modules that don't share edges; overflow at 1024.
