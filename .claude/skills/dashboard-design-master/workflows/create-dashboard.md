# Create a dashboard

1. **Clarify only what blocks you.** Purpose/reader, data available (or sample), stack. If unspecified: one self-contained HTML file, desktop-first, light+dark, realistic sample data labelled as sample. Don't interview the user about layout; that's your job.
2. **Layout plan** (see SKILL.md): inventory → P1/P2/P3 → relationships → space budget → consolidation → narrow-screen plan. Pick the nearest pattern in `references/dashboard-patterns.md`, then reshape it. Write the plan as a quick row-by-row sketch with spans and heights:
   ```
   bar 52 | KPI band 100: hero 3 + 3×3 | main 340: line 8 + breakdown 4 | row 2 280: 4+4+4 | table 12
   ```
   Check: spans sum to 12 in each row · wide for time series · nothing equal "because" · no orphan.
3. **Data first.** Make the sample data realistic (plausible magnitudes, seasonality, a few outliers, goals) because layout problems hide behind toy data. Compute derived values (deltas, totals) in code from the data so numbers agree everywhere.
4. **Build structure, then style, then charts.** Start from `assets/base.css`; set tokens; compose with `.grid`; fill cards; add charts via `assets/charts.js` (or the project's library). Charts live in `.chart` hosts inside flex cards so they fill.
5. **Add interaction that earns its place**: period segmented control, one or two filters, tooltips, sortable table. Controls update the views (otherwise don't show them).
6. **States**: empty/loading appearance for charts and table; hover and focus.
7. **Render-and-refine** (`workflows/visual-refinement.md`). Do not skip: first drafts nearly always have uneven heights, dead space, or an overly large element.
8. **Respond** with: the file path, 3-5 lines on the layout reasoning (what's P1 and where; why spans), what you verified (viewports, checks), and what you didn't.
