# Sources and provenance

**Read this before quoting anything from the reference files.**

## What was and was not verified

This skill was authored in a session whose network policy blocked the relevant sites (nngroup.com, w3.org, perceptualedge.com all failed to resolve). **No source below was fetched or re-read during authoring.** The reference files distill these works from the author's prior knowledge of them. Specific numbers (contrast ratios, target sizes) are stable, widely-published values, but if you need to cite a precise passage, verify it first.

## Tags used in the reference files

- **[E] evidence-based**: grounded in perception science, cognitive psychology, or usability research, and robust across contexts.
- **[C] convention / taste**: widely used practice or aesthetic judgment. Useful defaults, safe to break with reason.
- **[H] heuristic**: practical rule of thumb from design practice, not a research finding. Numbers marked [H] (e.g. "KPI tile ~90-110px") are starting points to tune by looking at the render.

## Works the guidance draws on

| Area | Work | Contribution used here |
|---|---|---|
| Dashboards | Stephen Few, *Information Dashboard Design* | Dashboard = most important info, consolidated, monitorable at a glance; critique of gauges, decoration, poor use of space |
| Graphics | Edward Tufte, *The Visual Display of Quantitative Information* | Data-ink, chartjunk, small multiples, sparklines, graphical integrity (lie factor) |
| Perception | Colin Ware, *Information Visualization: Perception for Design* | Preattentive features (position, color, size, orientation), what is processed without effort |
| Analysis | Tamara Munzner, *Visualization Analysis and Design* | Task-first design; marks and channels; expressiveness and effectiveness |
| Perception | Cleveland & McGill (1984), "Graphical Perception" | Ranking of visual encodings by accuracy: position > length > angle > area > color intensity |
| Semiology | Jacques Bertin, *Semiology of Graphics* | Visual variables and their suitability for categorical vs ordered data |
| Gestalt | Wertheimer and successors | Proximity, similarity, common region, continuity, closure, figure-ground |
| Cognition | Sweller, cognitive load theory | Extraneous load from decoration and poor grouping; reduce what the reader must hold in mind |
| Usability | Nielsen's 10 usability heuristics (1994) | Visibility of status, match with real world, consistency, error prevention, recognition over recall, minimalist design, etc. |
| Accessibility | WCAG 2.2 | 1.4.3 contrast (4.5:1 text, 3:1 large), 1.4.11 non-text contrast (3:1), 1.4.1 use of color, 2.5.8 target size min 24x24 CSS px, 1.4.10 reflow |
| Color | Brewer (ColorBrewer), Okabe & Ito palette | Sequential/diverging/qualitative scales; color-blind-safe categorical sets |
| Practice | Wilke, *Fundamentals of Data Visualization*; Wathan & Schoger, *Refactoring UI* | Chart-form guidance; spacing/type/hierarchy practice (mostly [C]/[H]) |

## Evidence vs convention: the honest summary

Mostly **evidence**: position/length encode quantity best; bars need a zero baseline for honest comparison; proximity and common region group things; contrast thresholds support legibility; red-green color-blindness is common (~1 in 12 men) so color cannot be the sole signal; redundant decoration adds load.

Mostly **convention/taste**: 8px radius vs 12px; shadow vs border; card UIs themselves; "F-pattern" scanning (observed in some eye-tracking on text-heavy pages, **not** a law for dashboards; treat top-left-first as a sensible default, not a rule); 12-column grids; specific pixel sizes; dark-mode palettes. Miller's "7±2" is about short-term memory for items, often over-applied to "max 7 KPIs"; do not cite it as a dashboard rule.
