# Lightweight design system

Defaults live in `assets/design-tokens.json` and `assets/base.css`. They are starting values: retune hue, density, and radius to the project; keep the *relationships*.

## Tokens
- **Space**: 4/8/12/16/24/32. **Gap** 12, **card padding** 14-16, **page padding** 16.
- **Radius**: card 10, control 6, pill 999.
- **Type**: 11/12/13/14/16/20/26/32; weights 400/500/600; tabular numerals.
- **Color**: surfaces `bg` < `surface` < `surface-2`; text `text`/`text-2`/`text-3`; one `accent`; semantic `pos`/`neg`/`warn`; 6 categorical `--c1..--c6` (no red/green; checked under simulated colour-vision deficiency, worst pair ΔE ≈ 17, see `accessibility.md`); `grid` for chart gridlines. Light and dark sets provided; dark uses borders instead of shadows and lifted accent hues.
- **Control boundary**: `--border-ctl` (≥ 3:1 on surface) for inputs, selects, buttons and selected states; the hairline `--border` is decoration only. All text tokens are measured ≥ 4.5:1 on surface, surface-2, bg and the hero tint (see `accessibility.md`).
- **Elevation**: border first, faint shadow second, popover shadow only for overlays.

## Components in base.css
`.topbar`, `.page` (flex column with gap; add `.fit` to grow chart rows into a tall viewport, with a `.grid.fill` child capped by `max-height`), `.grid` + `.s2..s12` (auto-fold at 1099 and 699), `.kpis` (hero tile first, any count, folds to 2-up with hero spanning), `.card` (+ `.hero`, `.card-head`, `.card-body`), `.chart` (+ `.spark`, `.tip`), `.kpi` (+ `.hero`, `.foot`, `.delta`), `.kpi-row`, `.seg`, `.btn/.select/.input`, `.toolbar`, `.chip` (+ `.pos/.neg`), `.legend`, `.bar` (progress; `span.ok/.warn/.over` for status, always paired with text), `table` with `.table-wrap` and `td.num` (first column sticky on narrow), `.empty`, `.skeleton`.

## Using it
1. Copy `base.css` and `charts.js` next to the dashboard (or inline them into a single HTML file).
2. Retune `:root` tokens: change accent hue, adjust bg warmth, keep text-3 ≥ 4.5:1 on surfaces.
3. Compose with `.grid` and span classes; make charts `Chart.xxx(host, …)` inside a `.chart` host whose card is `flex` so it fills.
4. In an existing React/Vue/Tailwind project, translate the tokens into the project's own theme and use its chart library; keep the spacing, hierarchy, and chart rules.

## Adapting to a project's aesthetic
Pull from existing brand color, font, and corner style. Constraints that stay: contrast thresholds, one accent, consistent spacing, chart rules. What may change: hue, radius (6-12), border vs shadow, density, font.

## States
- **Hover**: row/surface tint; border darkens.
- **Active/selected**: accent text + soft accent background or `aria-pressed` surface.
- **Focus**: 2px accent ring with offset.
- **Disabled**: 50% opacity + `not-allowed`; still ≥ 3:1 where it's informational.
- **Loading**: `.skeleton` blocks matching final size.
- **Empty/error**: centered one-liner plus action, keeping the card footprint.
