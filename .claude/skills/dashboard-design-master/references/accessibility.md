# Practical accessibility

Targets WCAG 2.2 AA where it affects dashboards. Items tagged [V] were checked against the W3C Understanding pages on 2026-10-30 (URLs in `sources.md`); [M] is this skill's own interpretation; [R] is recalled and unchecked.

## Contrast
- **Text: 4.5:1** against its background (SC 1.4.3) [V]. **Large-scale text: 3:1**, where large means 18pt, or 14pt bold [V]. In CSS px that is 24px regular or about 18.66px bold (the px conversion is the usual one, not stated on the page). Computed ratios are not rounded: 4.499:1 fails [V].
- **UI components and graphics: 3:1** against adjacent colours (SC 1.4.11) [V]. That covers (a) the visual information needed to identify a control and its states, and (b) parts of graphics required to understand the content. Inactive components are exempt [V].
- **What this means for the starter CSS** [M]: text tokens are measured, not assumed. `text-3` is 4.6+:1 on `surface`, `surface-2`, `bg` and the hero tint; input/button borders use `--border-ctl` (3.2:1 on surface), not the hairline `--border` (1.25:1), which is decoration only. A selected segmented-control state uses weight plus a 3:1 ring, not a faint tint alone.
- **Chart marks:** every series colour needs 3:1 against the card surface. Light orange `#e07a1f` is 3.01:1, which is the floor: don't lighten it. Check tokens numerically (the formula is in the WCAG page); `scripts/inspect.cjs` checks rendered text but not chart marks.
- **Gridlines** [M, interpretation]: WCAG's own graph example lists "the background lines for the values" among the graphical objects that should have 3:1 contrast, because they are needed to read values. So hairline gridlines (about 1.2:1) are only defensible when the values can also be read another way: direct value labels, tooltips on hover *and* focus, or a data table. If a chart depends on its gridlines, give them 3:1 or add labels. Prefer labels: they also serve everyone, not just low-vision users.

## Colour
- Colour must not be the only visual means of conveying information, indicating an action, or distinguishing an element (SC 1.4.1) [V]. Pair semantic colours with a sign, arrow, label, pattern or position ("▲ 12%", "Over budget by $40").
- Prevalence of red-green colour blindness: "One in twelve Caucasian (8%), one in 20 Asian (5%), and one in 25 African (4%) males" (Okabe & Ito) [V]; Few cites 10% of males and 1% of females [V]. Don't rely on red/green; check separability in lightness too. Chrome DevTools → Rendering → "Emulate vision deficiencies" previews it.
- **Palette check** [M]: the six categorical colours were simulated under deutan/protan/tritan (Machado 2009, CIE76 ΔE). Worst pair ΔE ≈ 17.7 light / 16.9 dark, comparable to Okabe-Ito's own set (about 16-21). The categorical palette deliberately excludes red and green, which carry bad/good meaning. ΔE ≈ 17 suffices for filled marks; for thin lines, small points or similar hues rely on direct labels or markers, not colour alone (Wilke ch. 19-20 [V]).
- Separate point, from the same paper [V]: colour with no meaning is a cost. "Time is wasted as our brains ... search for the nonexistent meaning" of different colours on bars that are already labelled (Few, pitfall #12). One hue per meaning.

## Keyboard and focus [R/C]
- Everything interactive is reachable and operable by keyboard; tab order matches visual order.
- Visible focus ring (`:focus-visible`, 2px, 3:1 against adjacent colours per 1.4.11 [V]). Never `outline:none` without a replacement.
- Segmented controls/tabs: `aria-pressed` or `role="tablist"` with arrow-key support.
- No hover-only information: whatever a tooltip reveals must also be reachable by focus or visible labels, or available as a table. The starter `charts.js` tooltips are hover-only, so add labels or a table for anything that matters.

## Target size (SC 2.5.8) [V]
- Minimum **24 by 24 CSS px** for pointer targets, **or** an undersized target passes by the *spacing* exception: a 24px-diameter circle centred on its bounding box must not intersect another target, nor another undersized target's circle. (Two 20px buttons with a 4px gap pass; two touching 20px buttons fail.)
- Other exceptions: an *equivalent* control that meets the size exists; *inline* targets in sentences or constrained by line-height; *user-agent* default controls you haven't resized; *essential* size/spacing, which the page says can include "an interactive data visualization where targets are necessarily dense" (still provide equivalent functionality, e.g. a table).
- The 32px desktop / 40-44px touch figures are this skill's preference [H]. 44 by 44 CSS px is SC 2.5.5 Target Size (Enhanced), Level **AAA** [V]: a good touch target, not the AA requirement.
- `scripts/inspect.cjs` models the size and spacing rules; it does not model the other four exceptions.

## Charts for screen readers [R/C]
- Give each chart an accessible name (`role="img"` + `aria-label` stating the takeaway, e.g. "Monthly spending, up 8% since June, peaking in October").
- Provide the underlying data as a table (visually hidden or toggleable) for complex charts.
- Don't rely on animation; honour `prefers-reduced-motion`.

## Structure and zoom [R, except reflow]
- Semantic landmarks (`header`, `main`, `nav`), one `h1`, card titles as `h2`/`h3`.
- Reflow: content works at 320 CSS px wide (equivalent to a 1280px window at 400% zoom) without two-dimensional scrolling (SC 1.4.10 [V]). Data tables are an excepted two-dimensional layout, so a wide table may scroll inside its own container.
- Text resizes to 200% without loss; avoid fixed heights on text containers.
- Respect `prefers-color-scheme` and `prefers-reduced-motion`.

## Quick audit order
Contrast of text tokens (measure) → control borders and states (3:1) → chart-mark colours (3:1) → colour-only cues → keyboard pass and focus visibility → chart names / data alternative → zoom and narrow reflow.
