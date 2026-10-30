# Visual refinement loop (render → look → fix)

The point: judge the rendered interface, not the code. A valid layout is not a good layout.

## Run
```bash
node .claude/skills/dashboard-design-master/scripts/inspect.cjs path/to/dashboard.html --out /tmp/shots
```
Prints per-viewport JSON (1440x900, 1920x1080, 1024x768, 390x844) and saves `*-fold.png` (first screen) and `*-full.png` (whole page when it scrolls). Needs Playwright with Chromium. If the project already has it, use that; if a viewport list matters, pass `--viewports 1280x720,...`.

## Look (use Read on the PNGs, at least 1440 fold + full, then 1024, then 390)
Go in this order. Say out loud what you see; don't skim.

1. **Squint**: one dominant focus, then 2-3 secondary? Or an even texture?
2. **Space**: any dead area, big gap, card with empty bottom, tile larger than its content? Do rows share heights and edges? Is the first screen doing useful work?
3. **Size**: any chart you'd struggle to read? Any element oversized for its information? Is the main chart the largest?
4. **Alignment and rhythm**: edges line up? Same gaps and paddings? Headers same height?
5. **Charts**: ticks colliding, labels clipped, legend heavy, lines hidden, colors consistent?
6. **Typography**: hierarchy of three tiers, nothing too small, numbers aligned?
7. **Polish**: borders/shadows consistent, no stray gradients, radii consistent, states look intentional.
8. **Narrow viewports**: overflow? stacking order sensible? KPIs still compact? tables scroll inside?

## Fix
- Triage: first anything *high* in the inspector JSON (overflow, tiny charts, low contrast, console errors), then composition problems you saw, then polish.
- Prefer structural fixes (spans, consolidating, making charts stretch, re-pairing cards) over nudging pixel values.
- Change a few things per pass, re-render, compare. Stop when a pass yields only minor polish, usually after 2-3 passes. Don't polish forever.

## Defects that testing showed only appear on inspection (check these deliberately)
- **No entry point**: KPI tiles all identical. Give one tile more width/weight (`.kpis` first tile, `.hero`).
- **Wrong thing loudest**: the biggest, most saturated mark carries the least information (e.g. a constant series as fat bars). Demote it (line, lighter) and let the *difference* show.
- **Colour without meaning**: categories that appear nowhere else each get a hue. Use one hue; accent only the focus.
- **Over-stretched cards**: rows grown to fill a tall screen leave bars 70px apart or a table with a blank bottom. Cap growth (`max-height`, `maxPitch`) or add useful content; do not just centre.
- **Odd counts**: five tiles in a four-column template, odd tiles in a two-column fold → orphan.
- **Alignment of numbers vs headers** in tables, especially with inline bars.
- **`overflow:hidden` on `<td>`** (breaks row alignment): put ellipsis on a wrapper.
- **Categorical axes thinned** so bins vanish; **odd tick values** on non-zero baselines.
- **Narrow screens**: wrapped titles/chips, hero cramped in half a column, row labels lost when a table scrolls sideways.
- **Missing gaps** between sections at some breakpoint (a section that only gets its spacing inside a media query).

## Known inspector blind spots
It cannot judge balance, taste, hierarchy, or whether a chart type was right. It can false-positive on intentionally tall cards (dead-space), and its contrast check uses the nearest opaque background (gradients/images are approximated). Treat its output as a lead, then confirm in the image.

## If rendering is impossible
State it. Do code-level checks: spans sum to 12; `min-width:0` on grid children; chart hosts have `flex:1` and a `min-height`; no fixed widths above 1024; numeric columns right-aligned; contrast of text tokens computed by hand. List what stays unverified.
