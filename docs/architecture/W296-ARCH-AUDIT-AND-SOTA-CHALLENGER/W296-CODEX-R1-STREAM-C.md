[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:54 — Stream C's scoring method explicitly permits "a single cite-anchor per dim", which violates the stated W293/sca-v3.1 >=3 organizationally-distinct evidence standard for scores >3.
Required-fix: Replace §1.1 with a Phase-5 compliant rule: every D-score >3 must carry at least 3 organizationally-distinct cite anchors, and missing cite-count forces a 1-tier demotion.
Evidence: W296 Stream D restates the inherited v3.1 standard: "External convergence >=3 organizationally-distinct orgs" at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-D-RESEARCH-ARCH-V4.md:37 and "cite-count <3 distinct orgs ... forces demote" at :201.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:185 — `astral-sh/uv` gives D8=5 from a single Astral benchmark claim, not >=3 organizationally-distinct anchors.
Required-fix: Downgrade uv D8 to <=3 or add independent benchmark anchors from at least two non-Astral orgs before keeping D8=5 and T1 margin.
Evidence: Stream C line 185 cites only Astral docs; GitHub README line 388 says "10-100x faster" and is still Astral-owned (https://github.com/astral-sh/uv, opened lines 386-388).

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:192 — `astral-sh/uv` gives D15=5 on supply-chain strength without the claimed OpenSSF/attestation evidence in the scoring row.
Required-fix: Either cite OpenSSF Scorecard plus artifact attestations plus release signing, or reduce D15 below the >3 threshold until those anchors are present.
Evidence: Stream C line 192 contains no concrete OpenSSF URL; the live 0.11.14 release does show GitHub artifact attestations at https://github.com/astral-sh/uv/releases/tag/0.11.14 lines 259-267, so the fix is to cite it rather than leave the score unanchored.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:247 — `anthropics/claude-agent-sdk-python` D4=5 is supported by only "Anthropic-canonical", not three organizationally-distinct anchors.
Required-fix: Keep Anthropic-canonical as one anchor but add at least two independent integration/adoption anchors, or lower D4 to 3 before recomputing install_score.
Evidence: Stream C line 247 has one cite; live GitHub confirms only the first-party repository/release signal (6.9k stars, v0.2.82 released 2026-05-15 at https://github.com/anthropics/claude-agent-sdk-python/releases/tag/v0.2.82 lines 150-155 and 199-201).

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:255 — `anthropics/claude-agent-sdk-python` D12=4 relies on stars plus canonicality, but the cited evidence is not three-org distinct and the "6.9k" star signal alone cannot justify a >3 score.
Required-fix: Add independent adoption/community anchors outside Anthropic and GitHub stars, or reduce D12 to 3 and recompute install_score.
Evidence: Live `gh repo view anthropics/claude-agent-sdk-python --json stargazerCount,pushedAt,licenseInfo,latestRelease` returned 6,931 stars, MIT, pushed_at 2026-05-15T22:29:07Z, latest v0.2.82 2026-05-15; that verifies freshness but not the required multi-org community evidence.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:216 — `openai/openai-agents-python` D6 is miscomputed because OpenAI should receive alpha=+2, but the row only gives D6=4 and describes an ad hoc partner/gamma calculation.
Required-fix: Set D6 to clamp(2 + alpha_openai 2 + gamma 1, 1, 5)=5, remove the "recognized partner adjacent" workaround, and recompute install_score/pattern_score.
Evidence: Stream C §1.5 says D6 = clamp(2 + prior, 1, 5) at lines 100-115, and the review mandate requires Anthropic/OpenAI/Microsoft/Google candidates receive alpha=+2; live `gh repo view openai/openai-agents-python` returned MIT, 26,437 stars, pushed_at 2026-05-18T08:06:21Z, latest v0.17.2 2026-05-12.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:454 — `microsoft/agent-framework` D6 repeats the same Bayesian author-prior bug by omitting alpha=+2 for Microsoft.
Required-fix: Set D6 to 5 for Microsoft-org-canonical status plus active release cadence, then recompute the Microsoft install_score and pattern_score.
Evidence: Live `gh repo view microsoft/agent-framework` returned MIT, 10,528 stars, pushed_at 2026-05-18T19:48:09Z, latest python-1.4.0 published 2026-05-15; Stream B also classifies it as Microsoft org-canonical at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:75.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:235 — `openai/openai-agents-python` is routed to T3 even though §1.3 requires D2>=4 for T3 and OpenAI's own D2 score is 3.
Required-fix: Change the verdict to T4 CITE-ONLY unless D2 is raised to 4 with evidence; update §3 tables and anti-bias tables accordingly.
Evidence: T3 routing requires `pattern_score >= 3.5 AND D2 >= 4 AND D13 >= 3` at Stream C lines 79-82; OpenAI D2=3 at line 212; line 235 incorrectly says "D2=3+D13=4 qualifies T3."

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:232 — The OpenAI D10=2 treatment is internally contradictory: line 232 invokes the marginal-pattern exemption, while line 235 says D10=2 still caps below VENDOR-FORK.
Required-fix: Pick one rule: either D10=2 plus marginal-pattern exemption permits non-reject routing, or it remains a cap; then rerun the verdict through §1.3 instead of mixing both.
Evidence: §1.4 says D10<=2 is Universal REJECT unless marginal pattern improvement at Stream C line 93; OpenAI lines 232 and 235 apply both sides of the exception.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:437 — `LearningCircuit/local-deep-research` treats D16=2 as a T1+T2 hard-cap breach even though the stated cap is D16<2.
Required-fix: Remove D16=2 as a hard-cap breach; if T3 is still desired, justify it through soft-gate criteria rather than a false W293 cap.
Evidence: Hard-cap taxonomy says D16<2 caps T1+T2 at Stream C line 96; local-deep-research D16=2 at line 431; line 437 incorrectly says "D16=2 ... caps at T3 max."

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:437 — The same local-deep-research verdict treats D3=2 as an INSTALL-cap breach even though the stated D3 cap is D3<2.
Required-fix: Either revise the cap table to D3<=2 everywhere or remove "D3=2 hard-cap" language and recompute the T2/T3 route consistently.
Evidence: Hard-cap taxonomy says D3<2 at Stream C line 90; local-deep-research D3=2 at line 418; line 437 calls D3=2 an INSTALL-cap breach.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:518 — Stream C admits "`mem0` chosen by stars" over Zep/Graphiti despite a higher LongMemEval benchmark for Zep/Graphiti, violating the no-stars-hardgate rule.
Required-fix: Score `getzep/graphiti` or `getzep/zep+graphiti` side-by-side with mem0 before selecting a memory-axis T2, and remove the "mem0 chosen by stars" selection.
Evidence: Stream C line 518 says mem0 was chosen by stars; Stream B records Zep/Graphiti at 63.8% LongMemEval vs mem0 49% at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:194 and :207; live `gh repo view getzep/graphiti` returned Apache-2.0, 26,194 stars, pushed_at 2026-05-14T20:26:01Z, release v0.29.0 on 2026-04-27.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:570 — The headline priority score for planning is inconsistent: the formula gives 3.76*1.0*0.5*0.6=1.128, but the TL;DR prints 1.15 and the table prints 1.13.
Required-fix: Normalize planning priority_score to 1.13 everywhere, including TL;DR and §9.3, or change the inputs and show the arithmetic.
Evidence: Formula is defined at Stream C lines 549-553; planning row at line 570 gives 1.13; TL;DR line 33 says 1.15; closing summary line 849 says top-3 priority 1.10.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:564 — The priority table's `Rank` column is not sorted by priority_score: memory is labeled rank 1 with 0.77 while subagent is rank 2 with 2.17.
Required-fix: Rename this column to "Stream-A rank" or sort the table by computed priority_score; do not present unsorted values as rank.
Evidence: Rows 566-573 show memory 0.77 before subagent 2.17, agent-orch 1.30, planning 1.13, and uv 0.90; the "Re-sorted" table at lines 576-585 contradicts the first rank column.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:642 — Serena is declared T2 VENDOR-FORK in §2.8 but the replacement table calls it FULL-REPLACE, creating an unsafe replacement-risk mismatch.
Required-fix: Change Serena replacement tier to SIDE-BY-SIDE/VENDOR-FORK pending bake-off, or add the missing FULL-REPLACE promotion criteria, rollback plan, and smoke test.
Evidence: Serena verdict is T2 VENDOR-FORK at Stream C lines 400-407; replacement table line 642 says FULL-REPLACE; Stream A says gitnexus and serena are distinct primitives and W290.5 kept both with caveats at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-A-CURRENT-ARCH-AUDIT.md:616-623.

[HIGH] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:637 — The replacement-risk table gives rollback/recovery snippets but no smoke tests for FULL-REPLACE, SIDE-BY-SIDE, or VENDOR-FORK routes.
Required-fix: Add a "rollback smoke" column with concrete commands for uv, claude-agent-sdk-python, mem0, serena, ty, spec-kit, and planning; block FULL-REPLACE until those probes pass.
Evidence: `rg -n "smoke|rollback|revert|uninstall|disable"` finds rollback text at lines 639-644 but no smoke-test command anywhere in Stream C.

[MED] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:475 — `microsoft/agent-framework` CITE-ONLY may be too low after correcting D6 and D5, but T2 is still not justified without a CC pathway.
Required-fix: Recompute Microsoft with D6=5 and D5 at least 4 from Stream B's 4/6 convergence, then either promote to T3 PATTERN-STUDY for A2A/MCP patterns or explicitly justify why D2/D13 remain below threshold.
Evidence: Stream B says microsoft/agent-framework has 4/6 convergence at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:99 and asks Stream C/D to reassess potential T2 at :110; live `gh repo view microsoft/agent-framework` confirms 10,528 stars, MIT, daily pushed_at 2026-05-18, release python-1.4.0 2026-05-15.

[MED] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:235 — `openai/openai-agents-python` should not be T2 today, but the current downgrade rationale uses the wrong gate; the correct result is T4 unless D2 is raised.
Required-fix: Replace "T3 PATTERN-STUDY" with "T4 CITE-ONLY pending D2>=4 proof" or provide evidence that OpenAI's handoff/tool-call surface is unique enough for D2=4.
Evidence: Live `gh repo view openai/openai-agents-python` confirms it is current and canonical (26,437 stars, MIT, pushed_at 2026-05-18, release v0.17.2 2026-05-12), but Stream C's own T3 rule at lines 79-82 requires D2>=4 and its D2 score is 3 at line 212.

[MED] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:319 — The mem0 D10=3 non-duplicate conclusion is directionally right, but the doc still frames T6 basic-memory overlap without making the surface distinction explicit enough for the replacement decision.
Required-fix: Add one sentence: "mem0 is vector+graph+KV auto-extraction memory; basic-memory is markdown/FTS5 bidirectional note memory, so D10=3 not D10<=2."
Evidence: Stream A describes T6 basic-memory as markdown-bidirectional/filesystem-survivable at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-A-CURRENT-ARCH-AUDIT.md:411 and mem0 as vector+graph+kv at Stream C lines 311-319.

[MED] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:44 — Stream C did not score `google/adk-python` even though Stream B identified it as one of the 2026 org-canonical SDKs and an axis-A incumbent challenger.
Required-fix: Add a scored `google/adk-python` row or an explicit exclusion rationale before finalizing the top-10 distribution.
Evidence: Stream B lists Google ADK Python as org-canonical, 19,702 stars, Apache-2.0, 2026-05-18 active at docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:83 and in the 5 org-canonical SDK landscape at :662-666; live `gh repo view google/adk-python` returned 19,703 stars, Apache-2.0, pushed_at 2026-05-18T19:29:02Z, latest v1.33.0 2026-05-08.

[MED] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:713 — The anti-bias table's install_score values do not match the scored candidate rows, undermining the stars-not-hardgate audit.
Required-fix: Replace the §7.1 install_score column with the §3.1 values or remove scores from the anti-bias table.
Evidence: Spec-kit is 3.76 at Stream C line 493 but 3.67 at line 713; uv is 4.52 at line 488 but 4.11 at line 714; claude-agent-sdk-python is 4.34 at line 489 but 4.18 at line 716.

[LOW] Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md:849 — The closing LOC summary repeats stale top-3 priority values that disagree with the actual §4 table.
Required-fix: Update the closing summary to "2.17 / 1.30 / 1.13" after fixing the planning arithmetic.
Evidence: §4 re-sorted table says 2.17, 1.30, 1.13 at Stream C lines 578-582; line 849 says 2.09, 1.25, 1.10.

VERDICT: BLOCK
