# W302-W303 CODEX ADVERSARIAL REVIEW R1

## Verdict
REVISE

## Finding Summary
- CRITICAL: 0
- HIGH: 1
- MEDIUM: 5
- LOW: 9

## Findings

### Q1 [MEDIUM] — serena score replication
File: `docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/W302-STREAM-A-SERENA-AND-CODEBASE-NAV-AUDIT.md:63-89`

Finding: PARTIAL-FAIL. Five sampled dimensions are individually plausible against sca-v5 anchors: D1=5, D2=4, D3=5, D19=5, D20=4, D21=4. However the score-card uses non-canonical install weights for several dims and a non-canonical denominator: sca-v5 defines install denominator 19.3 excluding D12/D13, while Stream A reports `93.10 / 21.00 = 4.433`. The live sca-v5 skill defines D19=1.0, D20=0.9, D21=0.9 and `install_score_v5 ... / 19.3` at `.claude/skills/sota-convergence-audit/SKILL.md:214-224`. Recomputing with the displayed scores and canonical weights gives about `85.0 / 19.3 = 4.40`, not 4.43. This is not a tier-changing error, but the arithmetic is not sca-v5 canonical.

Proposed fix: Recompute Stream A's score table using sca-v5 canonical weights and denominator 19.3; explicitly state any non-canonical ranking heuristic separately.

True-bug-prob: 85%

### Q2 [MEDIUM] — PR merges and author count
File: `docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/W302-STREAM-A-SERENA-AND-CODEBASE-NAV-AUDIT.md:31,83,163,359`

Finding: PARTIAL-FAIL. Local git spot-check supports the scale of the maintenance claim but not the exact PR-review inference. `git -C Z:/repos/deps/serena log --since='90 days ago' --merges` returns 134 merge commits, and `git log --since='6 months ago' --format='%aN <%aE>' | Sort-Object -Unique` returns 111 authors, close to the stated 110. But only 87/134 90-day merge subjects looked PR-like (`Merge pull request` or `(#N)`); 47 were branch/remote-tracking merges. The claim "133/134 merges = PR-review-merge" is therefore not replicated by local git history. Also, "24 distinct committers means non-author review is near-universal" is an inference, not proof of distinct reviewer review.

Proposed fix: Replace the exact `133/134 PR-merges reviewed` claim with a GitHub-API-backed merged-PR review count, or downgrade D19 to "likely strong but not proven" until reviewer metadata is fetched.

True-bug-prob: 75%

### Q3 [LOW] — ast-grep complement, not replacement
File: `docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/W302-STREAM-A-SERENA-AND-CODEBASE-NAV-AUDIT.md:265-273,300-334,356-359`

Finding: VERIFIED. The complement distinction is grounded enough for a stream-level audit: Stream A distinguishes LSP semantic symbol/reference navigation from AST structural search, cites DeepWiki for ast-grep's AST focus, and maps tasks where ast-grep fits structural refactors while serena fits symbol-aware navigation. The evidence is not a full benchmark, but the claim is qualitative and correctly scoped.

Proposed fix: No blocking fix. Optional: add an ast-grep official-doc cite for "structural search and rewriting" to reduce reliance on DeepWiki wording.

True-bug-prob: 15%

### Q4 [LOW] — Apple-Kuzu acquisition
File: `docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/W302-STREAM-B-KUZU-RETIREMENT-AND-GRAPH-DB-SOTA.md:51-63`

Finding: VERIFIED. External spot-check confirms the substance. MacRumors reports Apple acquired Kuzu in October 2025 and that the GitHub repo was archived afterward: https://www.macrumors.com/2026/02/11/apple-acquires-new-database-app/. BetaKit search result states Apple struck the agreement on October 9, 2025. GitHub confirms `kuzudb/kuzu` was archived on October 10, 2025 and the README says the project is being archived with 0.11.3 as the migration release: https://github.com/kuzudb/kuzu lines 150-156 and 302-312.

Proposed fix: No fix required. Keep the exact October 9 date tied to the BetaKit/EU filing cite, not only secondary tech press.

True-bug-prob: 5%

### Q5 [LOW] — cognee local LadybugDB evidence
File: `docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/W302-STREAM-B-KUZU-RETIREMENT-AND-GRAPH-DB-SOTA.md:179-242,363-365`

Finding: VERIFIED with line-number nits. Local venv probe output: `pip show ladybug` returns `Name: ladybug`, `Version: 0.16.0`, `Location: Z:\venvs\claude\Lib\site-packages`, `Required-by: cognee`; `pip show kuzu` returns `WARNING: Package(s) not found: kuzu`; `pip show cognee` returns `Version: 1.1.0` and includes `ladybug` in `Requires`. Local source also has `Z:/repos/deps/cognee/pyproject.toml:50` with `"ladybug==0.16.0"` and `Z:/repos/deps/cognee/cognee/infrastructure/databases/graph/config.py:38` with `Field("ladybug", env="GRAPH_DATABASE_PROVIDER")`. The stream's cited `pyproject.toml:39` and `config.py:42` are stale/off-by-line in the current checkout, but the substantive backend claim is correct.

Proposed fix: Update exact local line refs to `pyproject.toml:50` and `config.py:38` for the current checkout, while preserving the installed-package evidence.

True-bug-prob: 20%

### Q6 [MEDIUM] — LadybugDB sca-v5 4.45 score
File: `docs/architecture/W302-SERENA-KUZU-AND-EXECUTION/W302-STREAM-B-KUZU-RETIREMENT-AND-GRAPH-DB-SOTA.md:294-315`

Finding: PARTIAL-FAIL. The LadybugDB row says "sca-v5 8-dim subset" but uses loose scoring and reports `~4.45`. Averaging the visible eight dims in row 300 (`5,5,4,4,5,2,5,5`) gives `4.375`, not 4.45, before any weighting. Several dim values are also weakly cited: D7=5 daily push and D13=5 drop-in replacement are plausible but not directly line-cited in the row, and D16 bus-factor is mentioned as a hard cap in the surrounding methodology but not scored in the candidate table. Tier direction remains plausible because LadybugDB is already transitively installed via cognee, but the numeric "T1-de-facto 4.45" is not reproducible dim-by-dim.

Proposed fix: Relabel LadybugDB score as a lite heuristic, recompute the visible subset consistently, and add direct cites for D7/D13 or reduce confidence.

True-bug-prob: 70%

### Q7 [LOW] — 23/33 coverage denominator
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W303-STREAM-A-COVERAGE-GAP-AUDIT.md:40-82,303-310`

Finding: VERIFIED with subjectivity caveat. The denominator is explicitly constructed as 28 primary layers plus 5 cross-cutting concerns, and the row counts reconcile: 23 COVERED, 5 PARTIAL, 5 UNCOVERED. I do not see clear padding or double-counting severe enough to invalidate the ratio. Some rows are necessarily subjective aggregation choices, and Stream A discloses sensitivity: the coverage rate drops under granular enumeration and rises under aggregate enumeration.

Proposed fix: No blocking fix. Keep the sensitivity table near the headline when cited in synthesis so readers do not treat 70% as a precise coverage statistic.

True-bug-prob: 15%

### Q8 [MEDIUM] — eval_harness.py never audited as a unit
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W303-STREAM-A-COVERAGE-GAP-AUDIT.md:15,73,90`

Finding: PARTIAL-FAIL. The narrow claim "never sca-v5-audited as a unit" appears true, but the broader "never audited as a unit" wording is too strong. Prior W288-W301 search found direct harness audits/treatments: W290 F1 code-quality audit lists `harness/eval_harness.py` with ruff/security findings; W298 Stream D audits first-party SDK usage in `eval_harness.py`; W297 Lane-C pilot runs five `sota-rubric` smoke fixtures. Those are not sca-v5 deep audits, but they are prior direct audits/exercises of the file. Stream A itself acknowledges the risk of false negatives at lines 199 and 328.

Proposed fix: Change the headline to "never sca-v5 deep-audited for fixture coverage and Lane-A/B/C design as a unit" and cite W290/W298/W297 as prior partial coverage.

True-bug-prob: 80%

### Q9 [LOW] — Top-5 gap Impact/Cost consistency
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W303-STREAM-A-COVERAGE-GAP-AUDIT.md:110-118`

Finding: VERIFIED. The math and ordering are internally consistent: settings/env has `3/1 = 3.0`, harness has `5/2 = 2.5`, and the next three all have `4/2 = 2.0`. The apparent tension between "highest raw impact" and rank #2 is explained by the ranking being impact-per-cost, not raw impact.

Proposed fix: No fix required.

True-bug-prob: 5%

### Q10 [HIGH] — graphrag-lab benchmark cognee #2 at 3.75/5
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W303-STREAM-B-OPENRAG-SOTA-DISCOVERY.md:27,39,114,661,697,725`; synthesis `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W302-W303-AUDIT-2026-05-18.md:75-85`

Finding: UNVERIFIABLE. This is a central validation claim, but I could not verify the named `kiyeonjeon21/graphrag-lab` source. WebFetch/open on `https://github.com/kiyeonjeon21/graphrag-lab` returned no usable page, and web search for `"kiyeonjeon21" "graphrag-lab" "cognee" "3.75"` did not surface the claimed README or benchmark report. Search did surface a separate `GraphRAG-Bench/GraphRAG-Benchmark` repo, but that is not the cited source and does not verify cognee #2 at 3.75/5. Because W303-B uses the benchmark to validate the incumbent and justify "NO INSTALL", the claim needs a direct source receipt or a downgrade to provisional. No affirmative fabrication evidence was found, so this is HIGH, not CRITICAL.

Proposed fix: Add a direct URL to the benchmark table/report, quote/paraphrase its methodology, and record whether it is self-run, third-party, LLM-as-judge only, or reproducible. If the source remains gated/unavailable, change "VALIDATED/conclusive" to "UNVERIFIED external benchmark claim; run in-domain Lane-D before using for install decisions."

True-bug-prob: 70%

### Q11 [LOW] — universal-REJECT spot-check
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W303-STREAM-B-OPENRAG-SOTA-DISCOVERY.md:288-322,326-341,218-249`

Finding: VERIFIED by spot-check. GitHub confirms `vanna-ai/vanna` is a public archive and was archived on March 29, 2026: https://github.com/vanna-ai/vanna lines 150-156. GitHub confirms `truefoundry/cognita` is archived on March 13, 2026 and its README note says the project is no longer actively maintained: https://github.com/truefoundry/cognita lines 150-156 and 285-288. GitHub API confirms `h2oai/h2ogpt` has `"archived": true` and `pushed_at: 2025-10-09T23:30:01Z`. This supports the universal-REJECT archive/stale pattern at least for the required spot-check.

Proposed fix: No blocking fix. For the final ledger append, cite each GitHub archive line/API field individually.

True-bug-prob: 5%

### Q12 [LOW] — Top-5 priority_score heuristic
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W303-STREAM-B-OPENRAG-SOTA-DISCOVERY.md:575-586`; sca-v5 canonical composites `.claude/skills/sota-convergence-audit/SKILL.md:218-232`; precedent `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-AUDIT-2026-05-18.md:109-111`

Finding: VERIFIED as heuristic, not canonical. W303-B labels the formula "Heuristic", and sca-v5 defines only `install_score_v5` and `pattern_score_v5`, not `priority_score`. This matches W299 Codex precedent: W299 explicitly added a note that the same `0.45/0.35/0.20` formula is a stream-internal heuristic, not sca-v5 canonical.

Proposed fix: Add the same W299-style note to W303 synthesis where it says "Top-5 by priority" so downstream readers do not confuse `priority_score` with canonical sca-v5 scoring.

True-bug-prob: 25%

### Q13 [MEDIUM] — 7-cap discipline
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W302-W303-AUDIT-2026-05-18.md:100-112`

Finding: PARTIAL-FAIL. Rows 1-6 are substantive operator actions with clear targets. Row 7 is overloaded: it bundles R4 reversal, three W299 installs/verifications, planning-with-files governance, hindsight amendment, and five REJECT ledger appends into one "carry-forward" row. That preserves the 7-cap numerically but weakens actionability because it is multiple logical units with different owners, risk levels, and completion criteria.

Proposed fix: Split row 7 into a backlog pointer or choose the single highest-priority carry-forward item for the top-7 table; move the rest to §5.B backlog with separate rows.

True-bug-prob: 65%

### Q14 [MEDIUM] — anti-bias proof spot-checks
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W302-W303-AUDIT-2026-05-18.md:33-42,176-186`; W301 reference `docs/architecture/W301-MEMORY-ARCHITECTURE-DESIGN/W301-AUDIT-2026-05-18.md:84-99,224-240`

Finding: PARTIAL-FAIL. The W301 HIGH->LOW downgrade is supported: W301 had T3 cognee HARDEN with "audit Kuzu archived-upstream pin" at lines 88 and 97, and W302-B provides local LadybugDB evidence. The non-status-quo claim needs tighter wording: synthesis line 42 says "≥3-of-4 non-status-quo verdicts", while the review prompt's "4-of-4 non-status-quo" framing is stronger. The stream verdicts are indeed not rubber-stamp installs, but W303-B's "NO-INSTALL because incumbent cognee dominates" is partially status-quo-validating. The anti-bias proof is directionally valid, but "4-of-4 non-status-quo" should not be used unless defined.

Proposed fix: Keep the synthesis wording as "≥3-of-4" or define why KEEP-IMPROVED and NO-INSTALL count as non-status-quo. Do not upgrade it to "4-of-4" in downstream summaries.

True-bug-prob: 60%

### Q15 [LOW] — cognee dominates vs W301-D HARDEN tier consistency
File: `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W302-W303-AUDIT-2026-05-18.md:75-85`; W301 reference `docs/architecture/W301-MEMORY-ARCHITECTURE-DESIGN/W301-AUDIT-2026-05-18.md:84-91`

Finding: VERIFIED with one dependency on Q10. There is no contradiction between "cognee dominates OpenRAG" and "cognee is HARDEN tier": W301-D says cognee remains T3 but needs backend/embedding hardening, while W303-B says no new OpenRAG install beats the incumbent. Those can both be true. The only caveat is Q10: the external benchmark used to support "dominates" remains unverifiable in this review.

Proposed fix: Keep HARDEN-existing language. Avoid saying "conclusive" dominance until Q10 has a direct benchmark receipt.

True-bug-prob: 20%

## Verdict Rationale
The combined wave is directionally sound: Kuzu archival and cognee's LadybugDB migration are verified, the coverage-gap matrix is usable, and most operator actions are substantive. Revision is still required because one central OpenRAG benchmark claim is currently unverifiable and the serena/Ladybug scoring tables contain non-canonical or non-reproducible arithmetic.

Minimum fix set to reach APPROVE: correct W302-A sca-v5 arithmetic/denominator, add or downgrade the graphrag-lab benchmark citation, qualify the serena PR-review evidence, recompute/label LadybugDB lite scoring, narrow the eval_harness "never audited" wording, and split the overloaded top-7 row.

## Biggest Concern
The cognee #2 GraphRAG benchmark is used as the strongest OpenRAG validation claim, but the named source could not be fetched or found.

