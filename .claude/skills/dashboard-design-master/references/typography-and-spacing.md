# Typography and spacing

Defaults for a dense-but-calm data UI. Tags: [E] evidence, [C] convention, [H] heuristic. Tune to the project.

## Type

- **Family**: one UI sans (system or Inter). A second face only for a deliberate brand reason. Monospace for IDs/code, not for numbers in general.
- **Numerals**: `font-variant-numeric: tabular-nums` everywhere there are numbers so columns and changing values align [E: alignment aids comparison].
- **Scale (px)**: 11 micro (axis ticks only) · 12 label/secondary · 13 body (dense) · 14 base · 16 card/page title · 20 section · 26 KPI · 32 hero KPI. Avoid > 36px; a giant number wastes space and drowns the context.
- **Weights**: 400 / 500 / 600. Max two per card.
- **Line height**: 1.4-1.5 for text, 1.1-1.2 for big numbers. Tight line height on KPI values prevents oversized tiles.
- **Case/tracking**: sentence case; slight negative tracking (-0.01em) on large numbers only.
- **Min sizes**: body ≥ 12px; chart tick labels ≥ 11px. Under 11px fails legibility.
- **Line length**: if there's prose (insights, notes), 45-80 characters.
- **Truncation**: ellipsis only with a `title`/tooltip showing the full text. Prefer wrapping two lines for names over truncating key info.

## Number formatting [E for readability, C for specifics]

- Thousands separators; compact (1.2k, 3.4M) in tight spaces, full in tables/tooltips.
- Consistent decimals per column. Percent with ≤ 1 decimal; currency with cents only if small amounts matter.
- Units: put in the label ("Revenue ($)") or one suffix, not repeated on every cell. Negative numbers: minus sign (−), optionally with color, never parentheses plus red only.
- Dates: short and consistent ("Oct 30", "Q3 '26"). Axis shows what changes; omit repeated year/month.
- Right-align numeric columns, left-align text, align headers with their columns.

## Spacing

- **Base unit 4px**. Scale: 4, 8, 12, 16, 24, 32.
- **Gap between cards**: 12px (8-16 range by density).
- **Card padding**: 14-16px (12 for compact tiles). Avoid ≥ 24 on data cards.
- **Card header → body**: 8-10px.
- **Inside a card between elements**: 4-8px for tightly related (label/value), 12-16px between groups.
- **Page padding**: 16px (24 on very wide screens), max-width ~1760px.
- **Table row height**: 32-40px (28 for dense). Cell padding 6-10px vertical, 10-12 horizontal.
- **Control height**: 28-32px desktop; ≥ 36-44px for touch.
- **Chart plot margins**: reserve space for axis labels (left ≈ widest tick label + 12px, bottom ≈ 22px) before shrinking plots.

## Radius, borders, shadow [C]

- Card radius 8-10px, control radius 6px, pill for chips only. > 12px looks toy-like on data cards.
- Prefer 1px border (low contrast) over shadows; if shadow, a faint `0 1px 2px` with low alpha. Dark mode: borders only.
- Don't mix shadow-only cards and bordered cards on the same page.

## Color tokens (summary)

See `assets/design-tokens.json`. Text on surface must meet 4.5:1 (text-3 as small text should still be ≥ 4.5:1: choose it deliberately, not as "whatever looks light"). Borders can be low contrast (decorative) but form boundaries for inputs need ≥ 3:1.

## Consistency checklist

Same padding on every card · same header pattern · same gap everywhere · one radius per component type · charts share axis text style/color/size · same delta format · same date format · same empty/loading style.
