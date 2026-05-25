[FILE-A][HIGH] 17 — §0 reports 17 RETIRED tasks, but the execution ledger and final reconcile report 18 deleted tasks.
Required-fix: Change §0 RETIRED count to 18 and update every dependent "17 retired" summary.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:17` says 17; `:448-450` says 18 TaskUpdate(status=deleted); `:529` lists 18 task IDs.

[FILE-A][HIGH] 19 — §0 reports 5 CARRY-FORWARD tasks, but §4/final reconcile contains only 4 (#356, #357, #359, #360).
Required-fix: Change §0 CARRY-FORWARD count to 4 and remove all "5 carry" language.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:19` says 5; `:244-265` lists 4 tasks; `:533` confirms final count 4.

[FILE-A][HIGH] 20 — §0 reports 18 OPERATOR-INPUT-PENDING tasks, but final reconcile reports 12.
Required-fix: Change §0 and the operator-input headline to 12, or restore the missing 6 operator-input entries with task IDs.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:20,24` say 18; `:507-517` recounts 12; `:535` lists exactly 12 task IDs.

[FILE-A][HIGH] 28 — Task #45 RETIRED rationale is factually false: it says no cite anchors at `64fffd53` / `48f2ceb` / `993e3f40` remain, but they still exist across README/AGENTS/tools/config/docs.
Required-fix: Reclassify #45 as RE-LITIGATE or narrow the retirement claim to the removed `.claude/rules` / `.claude/hooks/scripts` consumers only; do not delete on a false global premise.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:28,83`; `rg -n "64fffd53|48f2ceb|993e3f40" .` returned live matches in `README.md`, `AGENTS.md`, `tools/eee.ps1`, `config.toml`, and docs.

[FILE-A][HIGH] 29 — The TL;DR says #199 is "still operator-decision-gated" and "surfaced in §5", but the body retires #199 and explicitly excludes it from §5.
Required-fix: Either move #199 to §5 OPERATOR-INPUT-PENDING or rewrite the TL;DR to state it was retired and justify why no operator decision remains.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:29`; retired at `:88-92`; excluded at `:337-341`; final RETIRED list includes #199 at `:529`.

[FILE-A][HIGH] 115 — Task #280 covers "Desktop + CLI runtimes"; Stream F deletes it because Desktop cleanup is out-of-scope for this runtime, which loses an unresolved cross-runtime operator item.
Required-fix: Reclassify #280 as OPERATOR-INPUT-PENDING / REHOME-TO-DESKTOP-RUNTIME, or create the replacement tracking row before deleting the original.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:115-118` admits Desktop-side cleanup remains out-of-scope and says it should be re-created elsewhere.

[FILE-A][HIGH] 381 — §2.14 is appended after §5, with "Wait" / "Moving to §2" narration, so the RETIRED list is not a clean complete §2 list before the operator-input queue.
Required-fix: Move #377 into the main §2 sequence, delete the mid-report mutation notes at §5.6, and make the RETIRED list contiguous and final before §3-§7.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:351-358` mutates the classification mid-report; `:381-389` adds §2.14 late; §7 then deletes #377 at `:439`.

[FILE-A][HIGH] 452 — §7 claims "TaskUpdate calls — actual execution" and later references "§7.2", but no §7.2 execution transcript exists.
Required-fix: Add the actual TaskUpdate call log with task IDs, statuses, timestamps/tool responses, or downgrade the claim to "planned deletion ledger" if execution evidence is unavailable.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:423-454` has only a table; `:561` and `:587` cite §7.2 executions, but `rg -n "^## §7\\.2"` returns no section.

[FILE-A][HIGH] 469 — The cite trail references `docs\architecture\W255`, but that path does not exist locally and has no local git history for that path; public web search also found no indexed git-history fallback for sampled W255/W155/W211 folders.
Required-fix: Replace nonexistent wave-folder cites with existing file paths or explicit CLAUDE.md line cites; mark missing folders as `[UNKNOWN]` instead of cite anchors.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:469`; `Test-Path docs/architecture/W255`, `W155`, `W211` all returned missing; `git log -- docs/architecture/W255|W155|W211` returned empty; web search for `"claude-sota-installed" "docs/architecture/W255"` / W155 / W211 returned no public result.

[FILE-A][MED] 244 — §4 CARRY-FORWARD entries do not specify a W297 sub-arc; they only say generic "carry-forward".
Required-fix: Add a W297 sub-arc for each carry task, e.g. W297-LLAMA-SWAP-KV (#356/#357), W297-RERANKER-MODEL (#359/#360), with dependency order.
Evidence: `W296-STREAM-F-TASK-HYGIENE.md:244-265` has four W297-action lines, none names a W297 sub-arc.

[FILE-A][MED] 393 — §6 ACTIVE omits #395 even though the reconcile later counts #395 as active/in_progress.
Required-fix: Add a §6 entry for #395 or remove #395 from the final active accounting.
Evidence: §6 lists #441/#448/#457/#458-#463 at `W296-STREAM-F-TASK-HYGIENE.md:393-419`; reconcile includes #395 at `:523,537,539`.

[FILE-B][HIGH] 11 — The synthesis imports stale Stream F counts (17 retired / 5 carry / 18 operator-input), contradicting Stream F's own final reconcile (18 / 4 / 12).
Required-fix: Update §0, §3, §5, and §7 Stream F summaries to 18 RETIRED, 4 CARRY-W297, 12 OPERATOR-INPUT, 5 ACTIVE.
Evidence: `W296-AUDIT-2026-05-18.md:11,62,88,138`; Stream F final reconcile at `W296-STREAM-F-TASK-HYGIENE.md:529-552`.

[FILE-B][MED] 35 — §2 marks Stream C "in-flight" even though the Stream C deliverable exists and the synthesis consumes its final T1/T2/T3 ranking in §0 and §6.
Required-fix: Mark Stream C completed, fill actual LOC, and remove "(pending)" cells from §3.
Evidence: `W296-AUDIT-2026-05-18.md:35,59`; file exists with 849 lines; §0 consumes Stream C verdicts at `:11`; §6 uses Stream C formula/ranking at `:98-121`.

[FILE-B][MED] 37 — §2 marks Streams E and F "in-flight" while §3 and §0 consume their final findings and the files exist.
Required-fix: Mark E/F completed or explicitly label them "draft consumed before final close"; do not mix in-flight status with final synthesis.
Evidence: `W296-AUDIT-2026-05-18.md:37-38,61-62`; files exist with 1044 and 592 lines; §0 includes Stream E CRITICAL and Stream F counts at `:11`.

[FILE-B][HIGH] 79 — §5 has 14 operator-action rows (#0-#13), violating the <=7 cognitive cap.
Required-fix: Collapse §5 to at most 7 ranked actions; move lower-priority/optional rows to a separate backlog table outside the operator-action queue.
Evidence: `W296-AUDIT-2026-05-18.md:79-92` contains rows #0 through #13.

[FILE-B][HIGH] 79 — Operator action #0 is not a single concrete command or yes/no decision; it is a three-option research/decision matrix with unknown blast radius.
Required-fix: Rewrite as one concrete operator decision, e.g. `Approve deleting .claude/hooks/context-mode-cache-heal.mjs and its settings hook? yes/no`, with the command deferred until approved.
Evidence: `W296-AUDIT-2026-05-18.md:79` offers options (a)/(b)/(c) and says scope is UNKNOWN.

[FILE-B][HIGH] 88 — Operator action #9 is not actionable: it points to an "18 operator-input-pending queue" rather than a command or yes/no decision, and the count is stale.
Required-fix: Replace #9 with one concrete highest-priority yes/no decision, or remove it and rely on Stream F's corrected §5 queue.
Evidence: `W296-AUDIT-2026-05-18.md:88`; Stream F final count is 12 at `W296-STREAM-F-TASK-HYGIENE.md:535`.

[FILE-B][HIGH] 90 — Operator actions #11-#13 are optional/research/backlog items, not single concrete commands or yes/no decisions.
Required-fix: Move `github/spec-kit` consolidation analysis, `jj-vcs` pilot, and Stream E secondary cleanup to a backlog section or rewrite each as one executable command/approval.
Evidence: `W296-AUDIT-2026-05-18.md:90-92` uses "Optional", "analysis", and multi-part action text.

[FILE-B][HIGH] 6 — The header says the GPT-5.5/codex gate "gates final commit chain" as honored, but §4 has only a pending r1 row.
Required-fix: Change the mandate status to "pending/not yet satisfied" until at least the required codex gate rows complete.
Evidence: `W296-AUDIT-2026-05-18.md:6`; §4 row is pending at `:69`.

[FILE-B][MED] 69 — Codex pace is under target: §4 contains one pending r1 row, while the ledger itself states the W290-CODEX-UNLEASH target is 5-10 reviews/session.
Required-fix: Add at least 5 completed codex round entries or mark W296 gate incomplete and block shipment until the pace target is met or explicitly waived.
Evidence: `W296-AUDIT-2026-05-18.md:69-71`.

[FILE-B][MED] 55 — §3's "LOC" column is not LOC for Streams A-D; it contains status strings, and C/F LOC are approximate or stale.
Required-fix: Populate actual line counts: A=917, B=814, C=849, D=803, E=1044, F=592, or rename the column to Status and add a separate LOC column.
Evidence: `W296-AUDIT-2026-05-18.md:55-62`; `Get-Content -ReadCount 0` verified the actual line counts.

[FILE-B][MED] 7 — The cite-class header says the ledger synthesizes "4 W296 streams", but the document claims a 6-stream team and §7 lists all six.
Required-fix: Change "synthesises 4 W296 streams" to "synthesises 6 W296 streams" and ensure the scope statement matches §2/§7.
Evidence: `W296-AUDIT-2026-05-18.md:7`; six-stream team at `:29-38`; six deliverables at `:133-138`.

VERDICT: BLOCK
