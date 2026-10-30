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
| WCAG 2.2 Understanding SC 1.4.10 Reflow | https://www.w3.org/WAI/WCAG22/Understanding/reflow.html | 320 CSS px (= 1280px at 400% zoom) without two-dimensional scrolling; data tables are an exception |
| WCAG 2.2 Understanding SC 2.5.5 Target Size (Enhanced), Level AAA | https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html | 44 by 44 CSS px |
| Stephen Few, *Bullet Graph Design Specification* (rev. 2013-10-10) | https://www.perceptualedge.com/articles/misc/Bullet_Graph_Design_Spec.pdf | Bullet graphs "developed to replace the meters and gauges"; scale usually starts at zero |
| Stephen Few, *Dashboard Design* (DM Review) and *Dashboard Confusion* (Intelligent Enterprise, 2004) | https://www.perceptualedge.com/articles/dmreview/dashboard_design.pdf ; https://www.perceptualedge.com/articles/ie/dashboard_confusion.pdf | Vendors' focus on "cutest ... meters, gauges and traffic lights"; single-screen definition |
| Stephen Few, *Best Practices for Scaling Sparklines in Dashboards* (VBI Newsletter, Q4 2012) | https://www.perceptualedge.com/articles/visual_business_intelligence/best_practices_for_scaling_sparklines.pdf | Tufte invented sparklines; Few: "often ideal for dashboards", history gives measures context |
| Claus O. Wilke, *Fundamentals of Data Visualization*, ch. 4, 10, 17, 19, 20, 26 | https://clauswilke.com/dataviz/ (chapters: visualizing-amounts, proportional-ink, visualizing-proportions, color-basics, color-pitfalls, redundant-coding, no-3d) | Bars start at 0; shaded areas; pies vs bars; qualitative colour limits; colour-vision deficiency; 3-D |
| Okabe & Ito, *Color Universal Design (CUD)* | https://jfly.uni-koeln.de/color/ | Prevalence of red-green colour blindness; the colour-blind-safe palette (hex values also in Wilke Table 19.1) |
| Stephen Few, *Embarking on a New Journey: Common Pitfalls in Dashboard Design* (Perceptual Edge white paper, Feb 2006, sponsored by ProClarity; 28 pp. incl. vendor addendum) | https://www.perceptualedge.com/articles/Whitepapers/Common_Pitfalls.pdf (linked from https://www.perceptualedge.com/library.php; the filename `Common_Pitfalls_in_Dashboard_Design.pdf` 404s) | Few's dashboard definition and all 13 pitfalls |

Only Few's pages 1-15 are his own text; pages 17-28 are the ProClarity product addendum and were not used.

## Not read: still recalled from memory, treat as unverified

Tufte (*The Visual Display of Quantitative Information*; *Beautiful Evidence*), Few's book *Information Dashboard Design* (its claims are only checked where his free articles repeat them), Ware (*Information Visualization: Perception for Design*), Munzner (*Visualization Analysis and Design*), Cleveland & McGill (1984), Bertin, Sweller (cognitive load), Wathan & Schoger (*Refactoring UI*), and ColorBrewer (the app page at colorbrewer2.org carries no readable text; Wilke ch. 19 describes it). Claims that rest on these are tagged **[R]**. They are books or paywalled papers: verify before quoting a page or figure.

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
4. **Colour-blindness figure.** Unsupported by the first batch of sources, then confirmed by Okabe & Ito: "One in twelve Caucasian (8%), one in 20 Asian (5%), and one in 25 African (4%) males are so-called 'red-green' colorblind." Few cites 10% of males and 1% of females. The skill now gives the Okabe & Ito figures with their population qualifier and credits Few's separately.
5. **Few: paper vs other writing.** Bullet graphs and sparklines are not in the 2006 white paper, but are verified in his later free writing: the bullet graph spec says it "was developed to replace the meters and gauges" and "supports more efficient reading than radial meters"; his 2012 sparkline article calls sparklines "often ideal for dashboards" and credits Tufte with inventing them. "No dual axes" is in none of these [M].
6. **Nielsen heuristic names.** Now exact ("Recognition Rather Than Recall", "Aesthetic and Minimalist Design", etc.).
7. **The skill's own colour tokens failed the skill's own guidance** (found by measuring, not by the sources): `text-3` was 4.15:1 on `surface-2` and 4.05:1 on the hero tint; `warn` as text 4.18:1 on white; control borders 1.25:1. Tokens were darkened/added and re-measured (see `testing-log.md`).

## Evidence vs convention: the summary

Mostly **evidence or well-established**: bars need an honest (zero) baseline [V: Few #8, R: Cleveland & McGill]; position and length encode quantity best [R]; proximity/common region group things [R]; contrast thresholds [V]; colour must not be the only signal [V]; one hue per meaning and no colour without meaning [V: Few #12]; decoration and variety for their own sake cost the reader effort [V: Few #6, #11].

Mostly **convention/taste**: 8px vs 12px radius, shadow vs border, card UIs themselves, 12-column grids, pixel sizes, dark-mode palettes, and "top-left first". Few supports putting the most important data in prominent positions (#9) but his own example is an opinion about one dashboard, not a measured effect. "F-pattern" scanning was not checked here; treat it as unverified. Miller's "7±2" is about short-term memory for items and is often over-applied to "max N KPIs"; Few himself says only that we "can only hold a few chunks of information at a time in short-term memory". Do not cite a number as a dashboard rule.

## Second verification round (same date): Wilke, Okabe & Ito, Few's other writing, WCAG 1.4.10 and 2.5.5

**Confirmed.** Bars: "Bars on a linear scale should always start at 0" (Wilke, proportional ink). 3-D is "almost always inappropriately used" and distorts the data (Wilke ch. 26). Colour must not be the only channel: redundant coding (Wilke ch. 20, WCAG 1.4.1). Qualitative colour scales "work best when there are three to five different categories"; at eight to ten or more, matching colours to categories gets hard, and "Use direct labeling instead of colors when you need to distinguish between more than about eight categorical items" (Wilke ch. 19). Reflow at 320 CSS px with data tables excepted (SC 1.4.10). 44 CSS px is SC 2.5.5, Level AAA, not the AA requirement.

**Refined.**
1. *Pies.* The skill leaned against pies. Wilke's position is balanced: "none of these visualizations is consistently superior"; pies "work well when the goal is to emphasize simple fractions, such as one-half, one-third, or one-quarter" and for very small datasets, while stacked and side-by-side bars suit other stories. Few (#5) objects to pies whose slices cannot be read without their labels. The skill now says exactly that.
2. *Shaded areas.* Wilke's proportional-ink principle applies to shaded areas as well as bars: an area under a truncated axis creates the impression that the shaded height represents the value itself. `Chart.line` now refuses to draw an area fill on a non-zero baseline.
3. *Zero baseline for bars.* Few's own bullet graph spec says its scale "usually begins at zero, but ... may also begin at a value greater than zero if it is useful to narrow the range". This skill still defaults to zero for bars [M], with that nuance on record.

**Found by measurement, not by a source (a defect in the skill's own palette).** I simulated colour-vision deficiency (Machado et al. 2009 matrices, full severity; CIE76 ΔE in Lab; both are my computation, [M]) over the six categorical colours. The shipped light palette's worst pair was ΔE 10.8 under protanopia (green `#107554` vs red `#b73636`); the dark palette's was 13.7. Okabe & Ito's own set has worst pairs around 16-21 under the same simulation. Red also means "bad" in this skill, so it should not be a categorical hue. Replaced: light c5 → `#8b3a04`; dark c4 → `#d9a6ec`, c5 → `#b8865a`. New worst pair: ΔE 17.7 (light), 16.9 (dark). ΔE of about 17 is adequate for filled marks, not for hairlines or tiny points; keep direct labels as the primary identifier.
