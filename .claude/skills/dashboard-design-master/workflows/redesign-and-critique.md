# Redesign or critique an existing dashboard

## 0. See it first
Render the existing UI with `scripts/inspect.cjs` (or the project's dev server URL) and view screenshots at 1440 and 1024 before opining. If it can't be rendered, read the code for layout structure and state that visual verification was not possible.

## 1. Critique (always do this, even when asked to just "fix")
Review in this order and note only issues that matter. Prioritize by impact on comprehension, then space, then polish.

- **Hierarchy**: squint test, what's noticed first? Is it the right thing? Is rank carried by size/position/contrast?
- **Space**: dead areas, oversized tiles, uneven heights, padding inflation, charts too small, tables stretched, scroll that isn't earned.
- **Composition**: equal-card mosaic? Spans from content? Alignment of edges? Orphans?
- **Charts**: right type? zero baseline? labels readable? legend cost? color consistency? comparison easy?
- **Consistency**: padding, radius, type scale, gaps, delta/date formats.
- **Usability**: filters discoverable and compact? controls update things? states for empty/loading? tooltips useful?
- **Accessibility/responsive**: contrast, color-only cues, keyboard, 1024 and 390 behavior.

Output: a short ranked list (most impactful first), each with *what you see → why it matters → the fix*. Use the inspector's JSON as evidence, not as the critique itself.

## 2. Redesign
- Preserve what works and the user's data/semantics, and don't redesign what they didn't ask about.
- Make a new row-by-row plan (as in create-dashboard) that fixes the top issues. Prefer a few big structural moves (re-span, consolidate KPIs, replace a pie with bars, filters to toolbar) over many micro-tweaks.
- Keep the project's stack and visual language unless asked otherwise; map tokens to the existing theme.
- Make changes in small verifiable steps when the codebase is large; re-render after each structural change.

## 3. Verify and report
Run `workflows/visual-refinement.md`. Report before/after in terms the user cares about: first-screen content, scroll length, chart sizes, issues resolved, and anything deliberately left alone.
