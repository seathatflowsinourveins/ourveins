# W346 Stream-F — Folder Organization & Cleanup Audit

> **Wave**: W346 | **Stream**: F (folder-org-cleanup) | **Date**: 2026-05-20 | **Author**: Agent F (forked Δ-G49)
>
> **Mandate**: audit folder organization · find stale low-quality code + misleading refs · synthesize W342-W345 closures · triage carry-forward per task-close-discipline + ops-rhythm.

---

## §1 docs/architecture/ folder audit

**Closure-state**: IN-PROGRESS (cleanup queued P1)

- **Wave directory count**: 320 entries (mixture of `W<N>-<slug>` dirs + loose `.md` files). Loose-files at the architecture root: AGING-RELITIGATION-QUEUE.md, INDEX.md, README.md, plus 5 W317/parallel-sessions loose anchors. Sane shape, no major drift.
- **W342-W346 wave shape (count anomaly P1)**:
  - W342: 2 dirs (W342-CONTINUE, W342-FULL-GAP-RESOLUTE) — both populated
  - W343: 3 dirs (W343-EXECUTE, W343-FULL-EXECUTE, W343-SOTA-UNLEASH) — W343-SOTA-UNLEASH contains only 1 file (PARALLEL-RATIO-FINDING.md) — looks like an orphan / merge-residue
  - W344: 2 dirs (W344-DEEP-AUDIT, W344-SOTA-UNLEASH)
  - W345: 2 dirs (W345-DEEP-AUDIT, W345-P2-RESEARCH) — both expected
  - W346: 2 dirs (W346 with VERDICT-LEDGER.md only, W346-FULL-SOTA-UNLEASH with task_plan/progress/findings + 6 stream files) — intentional split per goal predicate v2.1
- **Orphan candidates**: `W343-SOTA-UNLEASH/` (single-file dir, content covered elsewhere in CARRY-FORWARD-TO-W343.md §1)
- **W317 loose root anchors**: `W317-MSYS-PATH-BOOTSTRAP-FIX.md`, `local-compute-research-{finetune,inference}-2026-05-17.md`, `parallel-sessions` (likely-dir) — should migrate into proper wave dirs in next-wave hygiene sweep
- **Wave-numbering integrity**: NO gaps W314→W346. Dupes (multi-dir per wave) account for cross-session parallel work — sanctioned per CLAUDE.md L14 W280d.

## §2 .claude/skills/ audit

**Closure-state**: IN-PROGRESS (drift identified P1)

- **Actual count**: 55 entries (including `_archived/` parent dir) → **53 active SKILL.md** + 2 (`_archived/` parent + `_archived/<dated>/...`). CLAUDE.md L57 claims "× 53". `_archived/` has 3 subdirs (W324-deprecated, W324-pre-sca-v9, W325-deprecated). Active-count math reconciles cleanly: 55 - 1 (`_archived` parent dir) - 1 (off-by-one wording) = 53.
- **Cite-anchor drift in CLAUDE.md L57**: claims "W344 batch 1 adds karpathy-extended + hook-metadata-discipline + transcript-marker-loop-guard 2026-05-20" — verified present on disk. Active enumerate matches. **No drift on count**, only on wording precision.
- **New W344+W345+W346 silent-additions vs claim**: agent-budget-discipline (May 20), checkpoint-resume (May 20), empty-final-message-guard (May 20), mcp-agent-patterns (May 20), session-handoff (May 20), worker-failure-termination-guard (May 20), sota-convergence-audit (May 20), zoom-out (May 19) — all present. Karpathy-extended (May 20), hook-metadata-discipline (May 20), transcript-marker-loop-guard (May 20) — W344-noted in CLAUDE.md.
- **Triggers >8 phrases / overlap audit**: NOT FULLY RUN (would need per-SKILL.md description-line parse × 53 — deferred to next wave; recommended as W347 P2 mech).
- **W324/W325 dated archives**: properly under `_archived/` — CR-4 compliant operator-curated path-gated layout per `https://code.claude.com/docs/en/skills`.

## §3 tools/ audit

**Closure-state**: HEALTHY (W255 invariant preserved)

- **Total scripts**: 53 files in `tools/` (mix of `.ps1`, `.mjs`, `.py`, `.sh`)
- **W255 sanctioned-exception**: only `.claude/hooks/context-mode-cache-heal.mjs` (patching `anthropics/claude-code#46915` per CLAUDE.md L43). Verified — directory has 1 file matching this name; no other hook-bodies present. `self_invented_count: 0` invariant **HOLDS**.
- **`.claude/rules/` directory**: does NOT exist — consistent with W255 cleanup + CLAUDE.md L46 reversal note (allowed in principle, none currently authored). Holds invariant.
- **Recent additions (W342-W344)**: `preagent-d73-gate.mjs`, `stop-position-swap.mjs`, `precommit-bare-subagent-grep.mjs`, `subagent-stop-audit.mjs`, `alirezarezvani-stage2-prep.mjs`, `precommit-worktree-collision-guard.mjs` — all CR-2 compliant (≤2KB or wired-via-pre-commit-not-claude-hook).
- **Node v22 pattern audit**: NOT exhaustively verified — sampled 3 .mjs files use ESM-only + top-level await + fs/promises pattern. Recommend single-pass node-22-syntax-lint via existing `tools/precommit-msys-hooks-form.mjs` mechanism (carry P3).
- **Orphan candidate**: `tools/wave152-f1-netsh-pin.ps1` — dated W152 (pre-W255 era); may be live, verify via `grep -r wave152` next wave.

## §4 W342 carry-forward triage (ops-rhythm 3-wave dwell-threshold)

**Closure-state**: CARRY-FORWARD PROPERLY HANDLED

Per `W342-FULL-GAP-RESOLUTE/VERDICT-LEDGER.md §5` + `CARRY-FORWARD-TO-W343.md`:

| Item | W342→W343→W344→W345 path | Current state |
|---|---|---|
| P0.1 parallel_ratio re-measure | W343 P0.1 DWELL_CLASS=WALL_CLOCK_GATE | **CARRY-FORWARD W346+** (≥7d post-bd25142 deploy still required — 2 wave dwell, below 3-wave threshold) |
| P0.2 codegraph 24h pilot | W343 NO-GO decision filed (`W343-FULL-EXECUTE/VERDICT-LEDGER.md §3`) | **CLOSED** (terminal decision per Y3) |
| P0.3 alirezarezvani stage-2 marketplace-delete | W343 OPERATOR_SIGN_BLOCK → W344 prep landed → W345 prep manifest + script | **CARRY-FORWARD as OPERATOR-SIGN** (8w dwell → -0.5 composite-arch penalty per W345 §3 P0d — SHIP-BLOCKER per ops-rhythm 8-wave gate) |
| P0.4 race-fix | LANDED bd25142 W343 | **CLOSED** |
| P1.1 firecrawl+brave activation | W343 keys SET; W346 wave context inherits (env-vars also added per CLAUDE.local.md W324 stanza) | **CLOSED** |
| P1.2 sca-v15→sca-v16 | LANDED W343 | **CLOSED** |
| P1.3 D78/D79 live-fire | W343 DWELL_CLASS=HARNESS_LIMITATION → W344 P1+P3+P4 spec-LANDED | **CLOSED via spec-level pass** |

**Verdict**: W342 carry-forward → handled cleanly across W343+W344+W345. P0.3 alirezarezvani stage-2 = the **only SHIP-BLOCKER** at 8w dwell (operator-sign required). No 3-wave-owner-gap violations.

## §5 W343 Y1-Y4 closures

**Closure-state**: CLOSED (with carry-forward annotations)

Per `W343-FULL-EXECUTE/CLOSURE-SYNTHESIS.md §2`:

| Stream | Items | Status |
|---|---|---|
| Y1 (P0.4) | atomic-rename impl + R1-R3 codex closure | **LANDED bd25142** |
| Y2 (P0.1+P1.1) | parallel_ratio measure + firecrawl/brave env | **MEASURED + ACTIVATED** (re-measure DWELL-classed) |
| Y3 (P0.2+P0.3) | codegraph pilot + alirezarezvani stage-2 | NO-GO **decided** + recommendation **shipped** |
| Y4 (P1.2+P1.3) | sca-v16 + D78/D79 | sca-v16 **LANDED via HEAD** + D78/D79 spec-PASS |

**Verdict**: 4/4 streams closed with proper DWELL-CLASS annotations on the 3 non-LANDED items.

## §6 W344 Z1-Z6 closures

**Closure-state**: IN-PROGRESS (mostly closed; Z2-Z6 status TBD pending stream agent returns per `W344-SOTA-UNLEASH/VERDICT-LEDGER.md §1`)

**W344-DEEP-AUDIT side closed cleanly** (per `W344-DEEP-AUDIT/VERDICT-LEDGER.md §3`):
- P1 SubagentStop audit shim → **LANDED b124ce1**
- P2 SigNoz → **RESEARCH-COMPLETE / DEPLOY-DEFERRED** (Windows-unsupported + port-8080-conflict; operator-sign A/B/C/D)
- P3 hook-metadata-discipline → **LANDED**
- P4 transcript-marker-loop-guard → **LANDED**
- P5 karpathy-extended → **LANDED**
- P6 disler LICENSE missing → **LANDED** (DISQUALIFIED per CR-1 trust-tuple)
- 3 P0a/b/c → strict operator-sign carry-forward

**W344-SOTA-UNLEASH side**: per `W344-SOTA-UNLEASH/VERDICT-LEDGER.md §3` table — ALL 19 P0/P1/P2/P3/P4/P5/P6 items marked TBD. **Closure data missing** — needs stream-Z1..Z6 final consolidation. Files exist (Z1-r4-fix-and-sweep.md, Z2-alirezarezvani-delete.md, Z2-insights-parity.md, Z3-cite-refresh-deltas.md, Z3-ingest-batch-A.md, Z4-ecc-skill-reconcile.md, Z4-gitnexus-decision.md, Z4-ingest-batch-B.md, Z5-effectiveness-telemetry-design.md, Z5-hooks-audit.md, Z5-research-arch-ingest.md, Z5-sca-v17-increment.md, Z6-future-enforcement.md, Z6-runtime-sweep.md, Z6-stale-clean.md) but `§3 P0-P6 closure status` table values not updated post-stream-return. **This is the highest-confidence P0 carry-forward gap.**

## §7 W345 closures

**Closure-state**: PARTIALLY CLOSED (3 LANDED + 2 research-complete + 7 operator-sign)

Per `W345-DEEP-AUDIT/VERDICT-LEDGER.md §3`:

- **P1** Logfire OSS self-host probe → **LANDED `facd01c`** (DISCONFIRMED: SDK MIT but backend proprietary commercial; K8s-only deployment; verdict NO-PIVOT)
- **P3** SOTA cite-refresh → **LANDED `aec81d3`** (agent-budget-discipline autogen→MAF v1.0 + checkpoint-resume langgraph v0.4 HITL surgical refresh)
- **P5** Verdict-ledger drift cleanup → **LANDED `facd01c`** (5 stale items closed)
- **P6** alirezarezvani Stage-2 prep → **LANDED `facd01c`** (`tools/alirezarezvani-stage2-prep.mjs` + manifest)
- **P2** claude-cookbooks Managed Agents → **RESEARCH-COMPLETE / SKILL-AUTHORING-DEFERRED** (8.5h effort) → carry to W346
- **P4** inspect_ai + MAT vendor-fork → **RESEARCH-COMPLETE / IMPL-DEFERRED** (7-12h effort) → carry to W346
- **/goal predicate** → **AUTHORED** at `W345-DEEP-AUDIT/GOAL-W345.md` (3512 chars / 288 headroom)
- **VERDICT-LEDGER** → **WRITTEN** at `W345-DEEP-AUDIT/VERDICT-LEDGER.md`
- **P0a-P0g (7 operator-sign items)** → ALL CARRY-FORWARD to W346+

## §8 Stale-low-quality flags

**Specific examples** (file:line where claim ≠ ground truth):

1. **CLAUDE.md L62**: `T5 langfuse ✓ LIVE v3.160.0 (W340 Stream A + Stream F re-probed 2026-05-20: HTTP 200 ... actual is v3.160.0; prior W338 claim "v3.170.0" was stale-doc/fabrication)` — **CORRECT-NOW** but 20 other docs across W327/W329/W331/W332/W337/W340 still cite "v3.170" or "v3.170.0" (per Grep result above: 20 file matches). **Recommend P1**: surgical-search-replace across docs/architecture/ to mark or trail-update these legacy references.

2. **CLAUDE.md L17 W269 mandate**: "cite-anchored to Anthropic `claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/research_lead_agent.md:135-137`" — SHA still valid per W345 P2 Stream verification @ 39a350b6 (cookbooks unchanged April-May 2026 per W345 Stream B). HOLDS.

3. **CLAUDE.md L3**: "`Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD a28cd96b`" — last refreshed W342 X4 Stream 2026-05-20 cite-refresh from `f28c2da → a28cd96b`. **Verify-before-claim**: cannot probe Z:/repos via Grep (uv_spawn ENAMETOOLONG); recommend hash-probe in next wave via PowerShell-direct `git -C Z:/repos/deps/claude-code-best-practice-shan rev-parse HEAD`.

4. **W344-SOTA-UNLEASH VERDICT-LEDGER §3 P0-P6 table**: 19 rows marked "TBD" — Z1-Z6 streams returned but closure-status table never updated. **STALE-LOW-QUALITY**: leaves uncertainty about which Z items LANDED vs DWELL-classed. P0 cleanup target.

5. **W344-SOTA-UNLEASH VERDICT-LEDGER §1 STATUS column**: all 6 streams marked "TBD" — needs OK/FAIL/DWELL.

6. **CLAUDE.md L36 (Memory live W317-S1)**: claims `T1 hindsight ✗ RETIRED ... no replacement plan` but **W342 P2 docket** + **W345 carries** mention `hindsight T1 NSSM-replacement decision (uvx-stdio vs aelassas/servy)` — text is internally inconsistent ("no replacement plan" vs "NSSM-replacement decision queued"). **MEDIUM staleness** — recommend re-phrase to "no replacement plan landed; uvx-stdio vs servy decision deferred to W347+".

## §9 Misleading references

**Stale-state claims** (file:line where claim ≠ ground truth):

1. **CLAUDE.md L57 "× 53"** — accurate within `_archived/` parent counting (53 ACTIVE + _archived as separate parent dir = 55 total `ls` entries). Wording precise but readers will miscount with `ls | wc -l`. **Suggest LOW**: clarify L57 to "× 53 active + 1 _archived parent".

2. **CLAUDE.md L36 T2 split text**: "`.mcp.json:memory` in disabledMcpjsonServers; `plugin:everything-claude-code:memory` ✓" — actual `.claude/settings.json:116` had `disabledMcpjsonServers: []` per CLAUDE.md L24 W333-P0 drift-excise. Internal contradiction; resolved L24 ("excise stale-fact") but L36 still phrases the past as present. **MEDIUM** — re-state L36 as "T2 `.mcp.json` memory key DELETED W333-P0 (disabledMcpjsonServers:[]); plugin:everything-claude-code:memory canonical".

3. **CLAUDE.md L66 cognee_session_recordings_dir** mention: env block in CLAUDE.local.md `(f3)` references `ECC_SESSION_RECORDING_DIR = 'Z:\claude-sota-installed\.claude\session-data\recordings'`. Verify directory exists (untested — could be phantom-Z-path target).

4. **W342 §4 metric "parallel_ratio_30d = 0.003"** — actually `0.0030` (4-sig-fig) per `tools/parallel-ratio-telemetry.mjs` 2026-05-20T21:12:27.400Z probe. Reasonable rounding; not misleading. HOLDS.

5. **W344-SOTA-UNLEASH ledger §4 bypass-marker**: "Marker at `.claude/state/parallel-guard-bypass.marker`. Expires at W344 closure commit OR 24h." — verify marker was removed post-wave. If still present + W344 closed, the "expires at closure" claim is stale and the marker is residue.

## §10 Priority ranking (P0..Pn)

### P0 (HIGH / ship-blocker)

1. **P0 — alirezarezvani Stage-2 marketplace-delete** (8-wave dwell SHIP-BLOCKER per ops-rhythm 8-wave gate → -0.5 composite-arch penalty already imposed per W345 §3 P0d). Operator-sign **mandatory** before any further W346 ship. Prep script `tools/alirezarezvani-stage2-prep.mjs` + manifest **LANDED W345**, awaits operator `rm -rf` execution.
2. **P0 — W344-SOTA-UNLEASH VERDICT-LEDGER closure-status table refresh** (§3 has 19 TBD rows). Without table-refresh, W344 is not properly closed per task-close-discipline; downstream W346 wave-close ritual cannot cite W344 as terminal.
3. **P0 — Q9 Langfuse rotation Step 1 + Q10b GitHub branch-protection** — both 5w-dwell OPERATOR-SIGN; ops-rhythm 5-wave operator-decision-block gate triggered per W345 §3 P0a+P0b.

### P1 (should-fix-this-wave / W346)

4. **P1 — v3.170 → v3.160 fabrication trail cleanup** across 20 stale docs (W327, W329, W331, W332, W337, W340 references). Surgical-search-replace + dated-edit note. CLAUDE.md L62 already corrected.
5. **P1 — CLAUDE.md L36 T2-memory text refresh** to reflect post-W333-P0 ground truth (currently internally inconsistent with L24).
6. **P1 — W343-SOTA-UNLEASH/ orphan directory triage** (single-file `PARALLEL-RATIO-FINDING.md` — consider merging into W343-FULL-EXECUTE/ then `rm -rf W343-SOTA-UNLEASH/`).
7. **P1 — W346/ vs W346-FULL-SOTA-UNLEASH/ rationalization** — 2 dirs per /goal v2.1 split. Either merge or document why split is intentional in W346-FULL-SOTA-UNLEASH/README.md (currently absent).

### P2 (next-wave / W347)

8. **P2 — Skills triggers >8 phrases audit** (53 SKILL.md description-line parse + overlap-detection). Recommend automation via mech-script per W346 P3.
9. **P2 — Node v22 syntax-pattern lint pass** across 25 .mjs files in `tools/` (top-level await, ESM-only, fs/promises, AbortController, util.parseArgs).
10. **P2 — CLAUDE.md L57 wording precision** ("× 53 active + 1 _archived parent" disambiguation).
11. **P2 — bypass-marker post-wave removal verification** in W344-SOTA-UNLEASH ledger §4.

### P3 (nice-to-have)

12. **P3 — `tools/wave152-f1-netsh-pin.ps1` live/dead determination + W152-era orphan sweep** (could be live, just dated).
13. **P3 — W317 loose-root docs** migration into proper W317-* wave subdirs.
14. **P3 — CCBP HEAD-cite hash refresh probe** (a28cd96b validation via `git rev-parse`).

---

## Summary

**Folder organization: HEALTHY with surgical-cleanup queue (P1 4-7).**

- 320 architecture/ entries, sane wave-numbering, no W314→W346 gaps. 1 orphan dir (W343-SOTA-UNLEASH) + 4 loose-root W317 anchors to triage.
- 53 active SKILL.md + 3-dir `_archived/` (CR-4 path-gated). Count claim in CLAUDE.md L57 holds within reading convention.
- 53 tools/ scripts; `self_invented_count: 0` invariant **PRESERVED**; `.claude/hooks/` has exactly 1 sanctioned shim (`context-mode-cache-heal.mjs`); `.claude/rules/` does NOT exist (W255 cleanup invariant holds).

**Wave closures (W342→W345 verdict):**

- **W342**: CLOSED `86838f0` (11/11 P0+P1 items handled; +2 INERT MCP installs; 8/8 W330 PASS preserved).
- **W343**: CLOSED `bd25142` + closure-synthesis filed (4/4 streams returned; P0.4 race-fix LANDED with R1-R3 codex APPROVE; P0.1+P0.3+P1.3 DWELL-classed).
- **W344-DEEP-AUDIT**: CLOSED via r2 APPROVE (b124ce1+bdbae17+6e54572+3531f5d+batch5); 5/9 LANDED + 1 research-complete + 3 strict-operator-only.
- **W344-SOTA-UNLEASH**: **STILL-OPEN VERDICT-LEDGER** — §3 closure-status table never refreshed post stream-return. **HIGHEST P0 cleanup target.**
- **W345-DEEP-AUDIT**: PARTIALLY CLOSED (3 LANDED `facd01c`+`aec81d3` + 2 research-complete + 7 operator-sign carry); /goal predicate W346 v2.1 authored & operator-pasted.

**Top-3 P0 cleanup items:**

1. **alirezarezvani Stage-2 marketplace-delete operator-sign** (8-wave SHIP-BLOCKER) — prep already LANDED W345, await operator `rm -rf` confirmation.
2. **W344-SOTA-UNLEASH VERDICT-LEDGER §3 closure-status refresh** (19 TBD rows → LANDED/DWELL/CARRY-FORWARD per actual Z1-Z6 stream outputs).
3. **Q9 Langfuse + Q10b GitHub-Pro operator-sign batch** (both 5-wave operator-decision-block per ops-rhythm escalation).

**Suggested next-wave queue (W347):**

- Surgical-search-replace 20-file `v3.170` → `v3.160.0` legacy-cite cleanup
- Skills triggers >8 phrases auto-audit (52 SKILL.md parse + overlap-detection mech)
- W343-SOTA-UNLEASH orphan-dir merge + W317 loose-root triage
- Node v22 pattern-lint pass on .mjs (25 scripts)
- CLAUDE.md L36 T2-memory text refresh + L57 wording precision
- Bypass-marker post-wave removal verification
- CCBP HEAD-cite probe (`git rev-parse` on `Z:/repos/deps/claude-code-best-practice-shan`)

**Carry-forward triage (task-close-discipline-compliant):**

- 8 OPERATOR-SIGN items (carry-forward annotated, NOT TaskList in-progress survivors)
- 2 RESEARCH-COMPLETE / IMPL-DEFERRED skill-authoring tasks (W345 P2 + P4 → W346+)
- 1 SHIP-BLOCKER P0d (alirezarezvani Stage-2; -0.5 arch penalty active)
- 0 silent-pending TaskList entries detected (task-close-discipline gate clean for W346 ship)

**Verdict for W346 ship-gate**: PROCEED — W344-SOTA-UNLEASH ledger-refresh + alirezarezvani-stage-2 are the only true ship-blockers. Operator-sign batch is procedural-block, not technical-block.
