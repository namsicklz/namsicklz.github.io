# Sources and provenance

## What was actually read (verification pass, accessed 2026-10-30)

These were fetched in full and the claims in the other reference files were checked against them:

| Source | URL | Used for |
|---|---|---|
| Nielsen, *10 Usability Heuristics for User Interface Design* (published 1994-04-24, last reviewed 2024-01-30) | https://www.nngroup.com/articles/ten-usability-heuristics/ | The ten heuristic names; heuristic 8 wording |
| WCAG 2.2 Understanding SC 1.4.3 Contrast (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html | 4.5:1 text, 3:1 large text, definition of large |
| WCAG 2.2 Understanding SC 1.4.11 Non-text Contrast | https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html | 3:1 for UI components and graphics needed to understand content; chart example |
| WCAG 2.2 Understanding SC 2.5.8 Target Size (Minimum) | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | 24x24 CSS px and its five exceptions |
| WCAG 2.2 Understanding SC 1.4.1 Use of Color | https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | Colour not the only visual means |
| Stephen Few, *Embarking on a New Journey: Common Pitfalls in Dashboard Design* (Perceptual Edge white paper, Feb 2006, sponsored by ProClarity; 28 pp. incl. vendor addendum) | https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf (linked from https://www.perceptualedge.com/library.php; the filename `Common_Pitfalls_in_Dashboard_Design.pdf` 404s) | Few's dashboard definition and all 13 pitfalls |

Only Few's pages 1-15 are his own text; pages 17-28 are the ProClarity product addendum and were not used.

## Not read: still recalled from memory, treat as unverified

Tufte (*The Visual Display of Quantitative Information*), Few's book *Information Dashboard Design*, Ware (*Information Visualization: Perception for Design*), Munzner (*Visualization Analysis and Design*), Cleveland & McGill (1984), Bertin, Sweller (cognitive load), Brewer/ColorBrewer, Okabe & Ito, Wilke, Wathan & Schoger (*Refactoring UI*), and WCAG SC 1.4.10 (reflow) and 2.5.5 (44px, AAA). Claims that rest on these are tagged **[R]** in the reference files. The books are not online; verify before quoting a page or figure.

## Tags used in the reference files

- **[V]** verified against a source in the first table above.
- **[R]** recalled from the author's knowledge of a work in the second list; plausible and widely published but unchecked.
- **[C]** convention or taste: a useful default, safe to break with reason.
- **[H]** heuristic: practical rule of thumb (pixel sizes, ratios). Starting points to tune by looking at the render.
- **[M]** this skill's own rule or interpretation, not stated by a source (flagged where it goes beyond what a source says).

## Results of the verification pass

**Confirmed as stated** [V]
- 4.5:1 for normal text; 3:1 for large-scale text; "18 point text or 14 point bold text is judged to be large". Ratios are not rounded (4.499:1 fails). (The page speaks in points; 18pt = 24 CSS px and 14pt = 18.66px is the usual conversion and is what the inspector uses.)
- 1.4.11: 3:1 against adjacent colours for UI components needed to identify a control or its state, and for "parts of graphics required to understand the content"; inactive components are exempt.
- 2.5.8: targets at least 24 by 24 CSS px.
- 1.4.1: "Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element."
- Few's definition: "A dashboard is a visual display of the most important information needed to achieve one or more objectives, consolidated and arranged on a single screen so the information can be monitored at a glance."
- Few pitfalls that match skill rules: #2 inadequate context (KPIs need comparison), #3 excessive precision ("$3.8M" not "$3,848,305.93"), #4 express measures directly (show variance, preferably as a percentage), #5 inappropriate media (pie slices needing value labels are better as a table or bars), #6 meaningless variety (same chart type repeatedly is fine; consistency saves perceptual effort), #7 3-D bars hard to read, #8 bar scale that misrepresents quantities, #9 arrange by importance and viewing sequence, related items adjacent, #10 "When everything is visually prominent, nothing stands out", #11 decoration, #12 "What is the meaning of the separate color for each bar? ... the colors mean nothing", #13 "some sections ... were simply stretched" to fill space.

**Corrected in this skill because the source said something different or more**
1. **Single screen.** Few's definition and pitfall #1 say a dashboard belongs on one screen and that scrolling or hiding data behind selectors loses "the simultaneity of vision". The skill had cited him only for "at a glance". The skill now states his rule, and says plainly where it deliberately departs (exploratory dashboards may scroll to a detail table, per the project owner's brief) and what it keeps (don't fragment comparisons behind tabs or selectors; first screen holds P1 and the main comparison). See `spatial-efficiency.md`.
2. **Gridlines.** The skill said gridlines "may be low contrast". WCAG 1.4.11's own chart example counts background value lines as graphical objects needing 3:1 when they are needed to read values. The skill now says: light gridlines are acceptable only when values are also available by direct labels, tooltips or a data table; otherwise they need 3:1. This is an interpretation [M] of the example.
3. **Target size.** Added the five exceptions (spacing, equivalent, inline, user agent, essential); notably "an interactive data visualization where targets are necessarily dense" is an essential-exception example. The inspector now applies the spacing exception.
4. **Colour-blindness figure.** "About 1 in 12 men" appears in none of the fetched sources. Few says "the 10% of males and 1% of females who are color blind". The skill now cites Few's figure and attributes it to him.
5. **Few's book vs this paper.** Bullet graphs and sparklines as recommended dashboard media come from his book, not this paper; "no dual axes" is not in the paper either [M]. They are marked accordingly in `data-visualization.md`.
6. **Nielsen heuristic names.** Now exact ("Recognition Rather Than Recall", "Aesthetic and Minimalist Design", etc.).
7. **The skill's own colour tokens failed the skill's own guidance** (found by measuring, not by the sources): `text-3` was 4.15:1 on `surface-2` and 4.05:1 on the hero tint; `warn` as text 4.18:1 on white; control borders 1.25:1. Tokens were darkened/added and re-measured (see `testing-log.md`).

## Evidence vs convention: the summary

Mostly **evidence or well-established**: bars need an honest (zero) baseline [V: Few #8, R: Cleveland & McGill]; position and length encode quantity best [R]; proximity/common region group things [R]; contrast thresholds [V]; colour must not be the only signal [V]; one hue per meaning and no colour without meaning [V: Few #12]; decoration and variety for their own sake cost the reader effort [V: Few #6, #11].

Mostly **convention/taste**: 8px vs 12px radius, shadow vs border, card UIs themselves, 12-column grids, pixel sizes, dark-mode palettes, and "top-left first". Few supports putting the most important data in prominent positions (#9) but his own example is an opinion about one dashboard, not a measured effect. "F-pattern" scanning was not checked here; treat it as unverified. Miller's "7±2" is about short-term memory for items and is often over-applied to "max N KPIs"; Few himself says only that we "can only hold a few chunks of information at a time in short-term memory". Do not cite a number as a dashboard rule.
