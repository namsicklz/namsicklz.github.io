# Visual hierarchy

Goal: the reader knows within two seconds what matters most, what supports it, and where detail lives. Tags: [E] evidence, [C] convention, [H] heuristic.

## Channels that carry rank

Ordered roughly by strength; combine two or three, not all [E: Ware, Munzner]:

1. **Size**: bigger = more important. Largest number or chart is the focal point.
2. **Position**: top-left first, then rightwards/downwards (LTR) [C].
3. **Contrast/weight**: dark, heavy, saturated reads first; muted recedes.
4. **Color**: a single accent hue on the focal item; everything else neutral. Preattentive "pop-out" works only when few items share the distinguishing color [E].
5. **Whitespace/isolation**: space around something elevates it.
6. **Containment**: a card or tinted band marks a primary region.

## Three tiers

| Tier | What | Treatment |
|---|---|---|
| P1 | The 1-3 answers (headline KPI, main trend) | Largest, highest contrast, top of the page, accent color permitted |
| P2 | Supporting comparisons and breakdowns | Mid size, neutral palette, normal contrast |
| P3 | Detail, controls, metadata | Small, muted (text-2/text-3), progressive disclosure (tabs, expanders, tooltips) |

## Inside a KPI tile

```
label        12px  text-2        "Net savings"
value        26-32px 600 text    "$2,140"
context      12px  text-3        "▲ 12% vs last month   [sparkline]"
```
- Label above value (the reader needs to know what, then how much).
- One hero KPI may be larger; the rest equal to each other. Don't scale all of them.
- Delta: sign + arrow + color (never color alone); state the comparison period.
- Targets/goals: a thin progress bar or "of $X" in the context line.

## Typography as hierarchy

Use size and weight, not many fonts. 3-4 sizes per page cover most dashboards (12 / 13-14 / 16 / 26-32). Weight steps: 400 body, 500 labels/active, 600 values/titles. Use at most two weights per card. Don't use ALL CAPS labels everywhere; they shout and widen text.

## Color hierarchy

- Neutrals do the structural work: 3 text steps (text, text-2, text-3), 2 surfaces (bg, card), 1 border.
- One accent for interactive/selected/primary series. Additional hues only encode categories or status.
- Semantic colors (pos/neg/warn) reserved for status. Don't use red as a decorative accent; it reads as "bad".
- De-emphasize by lowering contrast and saturation, not by shrinking below legibility (≥ 11-12px).

## Grouping and progressive disclosure

- Related things share a card or a border-less group with tight spacing; unrelated things get a gap or a divider.
- Put the default view first, extras behind tabs/segmented controls ("Week | Month | Year"), "Details" expanders, row click drawers, hover tooltips for exact values.
- Don't hide P1. Don't hide what the reader needs for the main comparison.

## Attention management

- Max one animated/pulsing thing, and only for real-time status.
- Alerts/anomalies get a distinct, restrained treatment (small chip, colored dot + text), not a full red card.
- Sort tables and bar charts by the thing that matters (value desc, or by status) so the top rows tell the story.
- Highlight the exception: gray out the series, accent the one that needs action.

## Quick tests

- **Squint test**: blur your eyes at the screenshot. Can you still see 1 dominant area, then 2-3 secondary? If it's an even texture, hierarchy failed.
- **Five-second test**: what would someone say the dashboard is telling them?
- **Remove-a-channel test**: if removing a color or border doesn't change what you notice first, it's decoration.
