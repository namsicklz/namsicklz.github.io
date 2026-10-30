# Practical accessibility

Targets WCAG 2.2 AA where it affects dashboards. Values below are the standard published thresholds (not re-fetched this session; see sources.md).

## Contrast
- Text < 18.66px bold / < 24px regular: **4.5:1** against its background. Large text: **3:1**.
- Meaningful graphics (chart lines, bars, icons, control boundaries, focus rings): **3:1** against adjacent colors.
- Muted text (text-3) is the usual offender: check it, including on `surface-2` and in dark mode. `scripts/inspect.cjs` reports text styles under AA.
- Gridlines and decorative borders may be low contrast; they must not be the only cue for something.

## Color
- Never use color as the only signal (WCAG 1.4.1): pair with sign (+/−), arrow, label, pattern, or position. About 1 in 12 men have a red-green deficiency.
- Categorical palette must be separable in lightness as well as hue; direct labels help. Check a grayscale/deuteranopia preview if you can (Chrome DevTools → Rendering → Emulate vision deficiencies).
- Semantic red/green get a second cue ("▲ 12%", "Over budget").

## Keyboard and focus
- Everything interactive reachable and operable by keyboard; logical tab order matches visual order.
- Visible focus ring (`:focus-visible`, 2px, 3:1). Never `outline:none` without a replacement.
- Segmented controls/tabs: `role="tablist"`/`aria-pressed`, arrow-key support for tabs.
- No hover-only information: data revealed by tooltip should also be available via visible labels or an accessible table.

## Targets and touch
- Minimum 24x24 CSS px target (WCAG 2.5.8); prefer 32px desktop, 40-44px touch. Space small targets.

## Charts for screen readers
- Give each chart an accessible name (`role="img"` + `aria-label` summarizing the takeaway, e.g. "Monthly spending, up 8% since June, peaking in October").
- Provide the underlying data as a table (visually hidden or toggleable) for complex charts.
- Don't rely on animation; honor `prefers-reduced-motion`.

## Structure and zoom
- Semantic landmarks (`header`, `main`, `nav`), one `h1`, card titles as `h2`/`h3`.
- Content reflows at 320px width / 400% zoom without two-dimensional scrolling (tables may scroll inside their own container).
- Text resizes to 200% without loss; avoid fixed heights on text containers.
- Respect `prefers-color-scheme` and `prefers-reduced-motion`.

## Quick audit order
Contrast → color-only cues → keyboard pass → focus visibility → chart names/alt data → zoom 200%/narrow reflow.
