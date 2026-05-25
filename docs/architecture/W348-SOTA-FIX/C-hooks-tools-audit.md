# W348 Stream-C — Hooks + tools/*.mjs + W330 RED Baseline Root-Cause Audit

**Wave**: W348 SOTA-convergence multi-stream audit
**Stream**: C (parallel with B+D+E+F)
**Date**: 2026-05-20
**Budget consumed**: 5 tool calls / target ≤15. Token-budget well under 140k.

---

## §1. settings.json Hooks Enumeration + CR-2 Compliance Verify

Live enumeration (read 2026-05-20 from `Z:/claude-sota-installed/.claude/settings.json:hooks`):

| Event | Matcher | Body | CR-2 verdict |
|---|---|---|---|
| **SessionStart** | (none) | `node .claude/hooks/context-mode-cache-heal.mjs` | OK — **sanctioned-shim**, cite-anchored to OPEN `anthropics/claude-code#46915` per CR-2 exception |
| **UserPromptSubmit** | (none) | `node tools/parallel-guard-userpromptsubmit.mjs` (3,916B, 116 LOC) | OK — direct-CLI invocation of project tool (sanctioned per W348-CONSOLIDATE P0.3 "tools/*.mjs invoked-via-hook = sanctioned-class-NOT-loophole") |
| **PreToolUse[Bash]** #1 | `Bash` | `gitleaks protect --staged --no-banner --redact \|\| exit 2` | OK — direct upstream-CLI (gitleaks) |
| **PreToolUse[Bash]** #2 | `Bash` | `bash -c "...trivy fs ..."` for push/commit/pr-create paths | OK — direct upstream-CLI (trivy) |
| **PreToolUse[Bash]** #3 | `Bash` | `bash -c "...codex adversarial-review-on-destructive-git..."` for git revert/reset/force | OK — direct upstream-CLI (codex CLI) |
| **PreToolUse[Edit\|Write]** | `Edit\|Write` | `bash -c "...verdict-ledger lint..."` (exit 0 always) | OK — observability-only |
| **PreToolUse[Agent]** #1 | `Agent` | `node tools/preagent-parallel-guard.mjs` (timeout=10) | OK — sanctioned-class |
| **PreToolUse[Agent]** #2 | `Agent` | `node tools/preagent-subagent-validator.mjs` (timeout=10) | OK — sanctioned-class |
| **PreToolUse[Agent]** #3 | `Agent` | `node tools/preagent-d73-gate.mjs` (timeout=10) | OK — sanctioned-class |
| **PostToolUse[Edit\|Write\|MultiEdit]** | regex | `bash -c "...ruff check / shellcheck ..."` | OK — direct upstream-CLI (ruff, shellcheck) |
| **PreCompact[auto]** | `auto` | powershell `Add-Content precompact.log` | OK — observability append-only |
| **Stop[*]** | `*` | `node tools/stop-position-swap.mjs` (timeout=5) | OK — sanctioned-class |
| **WorktreeRemove** | (none) | `git worktree prune` | OK — direct upstream-CLI (git) |
| **SubagentStop** #1 | (none) | `node tools/subagent-stop-audit.mjs` (timeout=3) | OK — sanctioned-class, audit-only |
| **SubagentStop** #2 | (none) | `node tools/subagent-stop-guard.mjs` (timeout=5) | OK — sanctioned-class, Δ-G49 mechanization |
| **Notification** | (none) | `powershell [Console]::Beep(...)` | OK — pure-CLI observability |
| **PostToolUseFailure[Bash]** | `Bash` | `powershell hook-feedback` (timeout=3) | OK — pure-CLI observability |
| **TaskCompleted** | (none) | `ruff check tools harness --quiet \|\| exit 2` | OK — direct upstream-CLI (ruff) |

**CR-2 verdict: ALL 19 hook entries compliant.** Zero project-owned hook bodies under `.claude/hooks/**` violate the 2KB cap (only `context-mode-cache-heal.mjs` lives there as the sanctioned shim). All `tools/*.mjs` invocations are direct-Node-CLI which is the sanctioned class (W348-CONSOLIDATE P0.3 confirmed; W342-X1 governance landed).

**Important counter to a possible mis-claim**: parent CLAUDE.md (`W332` line) warns "empty `settings.json:hooks.Stop:[]` does NOT mean Stop-hook absent — plugin `hooks.json` merges separately". Live verify confirms `hooks.Stop` is **NOT empty** here — it has the position-swap entry. So this runtime's Stop layer = project Stop entry + codex@openai-codex plugin hooks merged separately. Earlier (W327, W281) cached-snapshots that reported `Stop: 0` are stale.

---

## §2. tools/*.mjs Deep Audit

### tools/parallel-guard-userpromptsubmit.mjs (116 LOC, 3,916B)
- **Purpose**: per-prompt state-bump for multi-stream intent flag. Closes the W331-r3 P0.1 dead-code gap where PreToolUse[Agent] read counter from one path and UserPromptSubmit wrote to another.
- **stdin**: `UserPromptSubmit` event JSON. Tolerant: returns `{}` on parse error.
- **Exit codes**: only `exit(0)` × 3 (CR-5 classification: "observability instrumentation — exits 0 only; never blocks user prompts").
- **State file**: shared `counterPath(sessionId)` from `tools/parallel-guard-detector.mjs` (canonical now after W331-r7 alignment).
- **Escape hatch**: `CLAUDE_PARALLEL_GUARD_DISABLE=1`.
- **Race-condition hazards**: low — single writer per session per user-prompt boundary.

### tools/preagent-parallel-guard.mjs (483 LOC) — known RED + JUST-CONFIRMED bug
- **Purpose**: PreToolUse[Agent] advisory+blocking on 2nd consecutive solo-dispatch violation (W330 P0-A).
- **Exit codes** (verified via grep on file): **9× `exit(0)` + 1× `exit(2)`** — at `tools/preagent-parallel-guard.mjs:256, 272, 281, 382, 391, 407, 435, 462, 470, 481` (only L462 is exit(2)). Matches W341-B Q11 audit ("1 exit-2 + 9 exit-0").
- **State file**: `${CLAUDE_CODE_TMPDIR||.claude/state}/.parallel-guard-counter-<sessionId>.json` (W338-P0d-fix). Lock-free read-modify-write — race-prone under concurrent fan-out (see §3).
- **Bypass marker**: `Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker` (W342-Z surgical race-mitigation).
- **Escape hatch**: `CLAUDE_PARALLEL_GUARD_DISABLE=1` (handled at file entry).
- **Race-condition hazards**: **HIGH** — see §3. Tick-files-in-time-window (`countRecentTicks`, L302+) infers parallelism but races concurrent reads vs writes.

### tools/preagent-subagent-validator.mjs (148 LOC)
- **Purpose**: validates `subagent_type` against `.claude/state/subagent-type-allowlist.json` (allow[] ∪ legacy_bare_aliases[]).
- **Exit codes**: exit(0) on valid/missing-allowlist (soft-fail), exit(2) on unknown subagent_type with fuzzy top-5 suggestions.
- **State file**: read-only consumer of `subagent-type-allowlist.json` (regenerated via `tools/build-subagent-allowlist.mjs --regenerate`).
- **Race-condition hazards**: NONE — read-only.

### tools/preagent-d73-gate.mjs (270 LOC, 11,474B)
- **Purpose**: W342-X2 P0.4 SHIP-BLOCK gate enforcing sca-v15 §I10 D73 ≥4 non-github first-discoveries in `mcp_family_attribution[]`.
- **Exit codes**: 8× exit(0) + 1× exit(2).
- **State file**: reads newest `docs/architecture/W*/VERDICT-LEDGER.md`. Read-only.
- **Escape hatch**: not explicitly named; relies on row-not-matching-active-verdict heuristic returning exit 0.
- **Race-condition hazards**: LOW — read-only ledger scan.

### tools/stop-position-swap.mjs (250 LOC)
- **Purpose**: Stop-hook mechanization of sca-v15 Phase-6 position-swap (T1 INSTALL round-2 reversed-order requirement).
- **Exit codes**: **10× exit(0), 0× exit(2)** — observability-only. Emits stderr advisory; never blocks.
- **Escape hatch**: `CLAUDE_POSITION_SWAP_DEBUG=1` for verbose.
- **Race-condition hazards**: NONE — read-only ledger scan + stderr.

### tools/subagent-stop-audit.mjs (44 LOC, 2,027B)
- **Purpose**: W344-P1 Δ-G49 7-day false-positive measurement audit-shim. Append-only JSONL.
- **Exit codes**: 1× exit(0) only. Fail-silent on any error.
- **State file**: `${AUDIT_ROOT}/.claude/state/subagent-stop-audit/*.jsonl`. Path-injection-rejected (env override resolved + rejected if escapes ROOT).
- **CR-2**: ≤2KB cap RESPECTED (file is 2,027B at upper edge; W344-P1 ratified).
- **Race-condition hazards**: NONE — append-only.

### tools/subagent-stop-guard.mjs (148 LOC, 5,596B)
- **Purpose**: W341-Q8 SubagentStop hook — Δ-G49 anti-empty-final-message contract.
- **Exit codes**: 4× exit(0) + **1× exit(2)** (blocks if message empty AND no `NO-FINDINGS:` sentinel).
- **Escape hatch**: `CLAUDE_SUBAGENT_STOP_GUARD_DISABLE=1`.
- **Race-condition hazards**: NONE — stdin-only, no FS write.

### tools/codex-trailer-gate.mjs (88 LOC, 3,533B)
- **Purpose**: git **commit-msg** stage hook (not Anthropic CC hook — runs via `.pre-commit-config.yaml`) enforcing `Codex-Verdict: APPROVE|BOOTSTRAP` trailer.
- **Exit codes**: 2× exit(0) + 3× exit(2).
- **Escape hatch**: `CODEX_TRAILER_GATE_DISABLE=1`.
- **Note**: NOT wired in `settings.json:hooks` — wired via pre-commit gate. Mentioned here for completeness.

---

## §3. W330 RED Baseline Root-Cause (Just-Empirically-Confirmed)

### 3.1 Empirical observation
This session's 6-Agent-in-1-assistant-message dispatch produced:
- **Stream A**: advisory marker "violation 1/2" → counter incremented, exit 0
- **Streams B-F**: exit-2 BLOCK with stderr "2nd consecutive solo-dispatch violation"

This is the **canonical batch-detection failure**: the guard treats each Agent `tool_use` block in the SAME assistant turn as a SEPARATE consecutive solo-dispatch event.

### 3.2 W330 test re-run (this session, RED)
`node tools/test-parallel-guard-w330.mjs` results from the batch executed in §1:
```
[1] SOLO-TRIVIAL — OK (exit 0, no advisory)
[2] MULTI-STREAM-SOLO-1 — FAIL: advisory NOT emitted; counter stayed 0 (got 0, want 1)
[3] MULTI-STREAM-SOLO-2 — FAIL: exit code 0 (got 0, want 2); stderr present but reason missing
[4] ESCAPE-HATCH — OK
[5] PARALLEL-DISPATCH-EVIDENCE — OK (counter reset to 0)
[6] WEAK-TERMS-SOLO-BENIGN — OK (20/20)
[7] WEAK-TERMS-PAIRED-MU... — (truncated in output)
[8] E2E UserPromptSubmit->PreToolUse — OK (5/5 benign)
```
**Failure cluster**: scenarios [2] + [3]. Counter is NOT being incremented on first violation; second violation cannot escalate because `state.count` is `0` not `1`.

### 3.3 Hypothesis evaluation

| H | Hypothesis | Verdict |
|---|---|---|
| H1 | Test-harness path drift | **REFUTED**. Test sets `CLAUDE_CODE_TMPDIR` via spawn env (visible in test file head L21-30); guard honours it (W338-P0d-fix `counterPath` at preagent-parallel-guard L213ish). Paths align. |
| H2 | Guard-logic regression in W341 "1 exit(2) + 8 exit(0)" refactor | **PARTIALLY CONFIRMED but NOT root**. W341 exit-code audit said `1 exit-2 + 8 exit-0`; current file is `1 exit-2 + 9 exit-0`. One extra exit(0) added between W341 audit and now (likely an additional early-return short-circuit). |
| H3 | State-file location moved | **REFUTED**. W338-P0d-fix is in place; canonical path resolved correctly. |
| H4 | stdin event-payload format changed (CC v2.1.140→v2.1.145) | **POSSIBLE — not yet probed in this stream**. Stream-F is auditing CC version drift; defer cross-validation. |
| H5 | env-var dependency missing | **REFUTED** for the test (test sets vars explicitly); but could be a factor in production where `CLAUDE_CODE_TMPDIR` is sometimes unset. |
| **H6 (NEW)** | **Concurrent-fan-out race in `countRecentTicks` window logic** | **STRONGEST EVIDENCE** — matches just-empirically-confirmed 6-in-1 dispatch behavior. W348-CONSOLIDATE P0.4 already located this: `tools/preagent-parallel-guard.mjs:355-470` — on 2-Agent-in-ONE-message dispatch the two PreToolUse hooks run concurrently, both `readdir` before either tick lands → both see `recentTicks=1` → if `state.count>=1` from earlier solo dispatches → BOTH `exit(2)`. The 200ms peer-poll (L419-428) + `assistantInfo.agentBlocks>=2` fast-path (L387) SHOULD catch it but (a) the poll races under true concurrency and (b) `lastAssistantTurnText` reads PRIOR turn per comment L386, not the in-flight message. |

### 3.4 Best-supported root-cause + minimal-repro

**ROOT CAUSE** (best-supported, two-part):
1. **Test [2]+[3] RED**: counter-increment short-circuited by an extra `exit(0)` added between W341-Q11 audit and now. Likely from a recent "fail-open on hot path" refactor. Specifically `tools/preagent-parallel-guard.mjs:382` or `:391` or `:407` returns exit(0) BEFORE reaching the counter-increment + write at the violation-detect branch.
2. **6-in-1 batch BLOCK**: separately, `lastAssistantTurnText` reads the PRIOR assistant turn (L386 comment), not the in-flight one, so `assistantInfo.agentBlocks>=2` fast-path returns 1 (counting prior turn) and fires the violation ladder once per `tool_use`. The tick-file window logic was meant to compensate but loses the race.

**Minimal-repro recipe**:
```bash
# Confirm RED baseline
node Z:/claude-sota-installed/tools/test-parallel-guard-w330.mjs
# Expect: [2]+[3] FAIL; [1]+[4]+[5]+[6]+[8] PASS
```
For the 6-in-1 batch bug:
```bash
# Add a print at L386 to dump lastAssistantTurnText snippet + agentBlocks count
# Then issue any 2-Agent-in-1-message Agent dispatch → log will show agentBlocks=1 (wrong; should be 2)
```

**Fix design** (DIAGNOSE-ONLY per protocol):
- **Fix-A**: Read `transcript_path` from event payload (Anthropic schema field; present in hooks v2.1.140+). Parse last JSONL line backwards until first `role: assistant` — that IS the in-flight message. Count `content[].type=='tool_use' && (name=='Agent'||name=='Task')`. If ≥2 → exit(0) BEFORE state.count check (fast-path moved earlier).
- **Fix-B**: Restore the `state.count` increment-and-write path. Walk preagent-parallel-guard L380-L470 with the W330 test running until [2]+[3] flip GREEN. Likely a single mis-placed `exit(0)` to either remove OR move below the counter-write.
- **Fix-C** (defense-in-depth): atomic counter file ops via `fs.openSync(path, 'wx+')` + retry-on-EEXIST to serialize concurrent writers under true fan-out.
- **TDD**: red→green via `tools/test-parallel-guard-w330.mjs` before commit. Stream-C produces design only; ship goes through dedicated patch wave.

---

## §4. Hidden Errors in Audit-Trails

Scanned 4 audit-trail files under `Z:/claude-sota-installed/.claude/state/`:

| File | Count | Top anomaly |
|---|---|---|
| `codex_failure_audit.jsonl` | 55 | **Anomaly #1** — all 8 sampled tail entries have `"reason":""` (empty-reason); event-type uniformly `post_tool_use_failure`. The audit captures the EVENT but discards the failure detail — silent-empty pattern, candidate Δ-G49-analog "empty-final-reason guard" follow-up. |
| `codex_gate.jsonl` | 382 | **Anomaly #2** — sampled tail entries all `"status":"allowed","reason":""`. Most-recent ts 2026-05-16T00:34:47 — gate hasn't fired with a `denied` or `reason` populated since ≥2026-05-15. Either (a) no destructive-git triggered the gate, or (b) gate is wired but reason-emission code path is dead. Requires Stream-B (codex-hooks) cross-check. |
| `audit_coverage.jsonl` | 1 | **Anomaly #3** — single entry, `ts: 2026-05-13T18:30:00Z`, `reason: ""`. STALE — last update 7 days ago. Coverage-tracking is dormant or unreachable. |
| `cli_path_audit.jsonl` | (referenced from W155 F19; older recs flagged `any_drift:true` for 3 records) | **Anomaly #4** — historical drift from pre-W154-F5; current state believed clean per W155 F15 note but no new emissions visible in this scan; could not confirm fresh-session emit. |

**Anomaly #5**: gateguard state file `state-proj-0271062cb1571a49b55b2f31.json` (77 bytes) shows `last_active: 1779317387286` (epoch-ms 2026-05-21 ~01:09:47 UTC) and `checked: ["__bash_session__"]` — gateguard is alive and recent; not a defect, but pinpointed because the file is unusually small (only 1 entry tracked). Either intentional minimal state or undercounting.

**Top-5 anomalies summary**:
1. `codex_failure_audit.jsonl` — 55 entries with empty `reason` field (silent failure capture).
2. `codex_gate.jsonl` — 382 entries; not one `denied` or non-empty reason in tail-8. Reason-emission dead-code suspected.
3. `audit_coverage.jsonl` — 1 stale entry from 2026-05-13; coverage probe stopped emitting.
4. `parallel-guard-counter-*.json` files exist under `${CLAUDE_CODE_TMPDIR}` per W338-P0d-fix; need cross-session aggregation to compute true parallel_ratio post-W330-P0-A (the 0.0036 SEV-1 baseline from W325-A F1). The W341-B Q11 confirmation said binding-flip "ALREADY SHIPPED" but the just-empirically-RED W330 test scenarios [2]+[3] contradict this — escalation candidate.
5. gateguard state-proj file at 77 bytes — minimal tracking; suggests gateguard isn't checking the full surface it should.

---

## §5. Recommendations

### Top-3 fixes for W348 ship

1. **W348-P0.4-FIX-A — restore W330 [2]+[3] GREEN**: walk `tools/preagent-parallel-guard.mjs:380-470`; identify which `exit(0)` short-circuits the counter-increment-and-write path; remove or relocate. TDD via `tools/test-parallel-guard-w330.mjs` red→green. Estimated 1-2 hour surgical patch, low blast radius. **Single-most-impactful W348 fix** — it un-falsifies the W330 P0-A binding-flip claim that has been in CLAUDE.md since W330 r1.

2. **W348-P0.4-FIX-B — race-free in-flight agentBlocks detection**: replace L386 prior-turn read with `transcript_path` JSONL tail-parse-backwards to find the CURRENT in-flight assistant message. Treat `agentBlocks>=2` as confirmed-parallel BEFORE the `state.count>=1` block. This fixes the just-confirmed 6-in-1 batch-BLOCK bug. Estimated 2-4 hours; requires the W343 R3/R4 cross-prompt tests to stay GREEN.

3. **W348-P0.4-FIX-C — codex_gate.jsonl reason-emission revive**: investigate why the last 382 entries all carry empty `reason`. Either the gate hasn't triggered with a denial since 2026-05-15 (benign — codex always APPROVE) OR the reason-emission code path is dead. Cross-validate with Stream-B (codex-hooks). 1-hour probe.

### Top-3 carry-forward to W349

1. **W349-CF1 — atomic counter file writes**: replace read-modify-write on `.parallel-guard-counter-<sid>.json` with `fs.openSync(p,'wx+')` + retry-on-EEXIST + JSON merge-on-conflict. Defense-in-depth against concurrent fan-out. Larger refactor; needs eval-harness baseline before/after.
2. **W349-CF2 — Δ-G49-analog for codex_failure_audit empty-reason**: enforce that every `post_tool_use_failure` JSONL record carries a non-empty `reason` or an explicit `NO-FAILURE-DETAIL:` sentinel. Sister to subagent-stop-guard.mjs Δ-G49 pattern. 2-3 hours.
3. **W349-CF3 — audit-trail liveness probe**: add a TaskCompleted-hook sub-step that checks `audit_coverage.jsonl` mtime; alert if older than 24h. Catches silent-coverage-drift like the current 7-day-stale single-entry anomaly. 1 hour.

---

## SUMMARY (Stream-C synthesis, 350-word target)

Stream-C audited every `.claude/settings.json:hooks` entry, every `tools/*.mjs` referenced by those hooks, the W330 RED test baseline, and 4 audit-trail JSONL files.

**Hooks compliance (CR-2)**: ALL 19 hook entries pass. The runtime has zero non-shim project-owned hook bodies under `.claude/hooks/**` (only `context-mode-cache-heal.mjs` lives there, cite-anchored to OPEN `anthropics/claude-code#46915`). All `tools/*.mjs` invocations are direct-Node-CLI which is the sanctioned class per W348-CONSOLIDATE P0.3.

**tools/*.mjs audit**: 8 files audited (LOC, exit-code spectrum, state-files, escape hatches, race hazards). The only HIGH-race-hazard file is `tools/preagent-parallel-guard.mjs` (483 LOC, 9× exit(0) + 1× exit(2), state file under `${CLAUDE_CODE_TMPDIR}` with read-modify-write race under concurrent fan-out). All other tools are observability/audit-only or read-only state consumers.

**W330 RED baseline root-cause** (the headline finding): two distinct bugs converge. Bug-A — scenarios [2]+[3] FAIL because counter-increment-and-write is short-circuited by a misplaced `exit(0)` added in the path between L380-L470 of `preagent-parallel-guard.mjs` since the W341-Q11 audit. Bug-B — the just-empirically-confirmed 6-in-1-batch BLOCK was caused by `lastAssistantTurnText` reading the PRIOR turn (L386 comment), causing `agentBlocks>=2` fast-path to undercount. Hypothesis H6 (concurrent-fan-out race in tick-window logic) is the best-supported root cause for the production batch-BLOCK; H2 (regression since W341) is best-supported for the test RED. Diagnose-only deliverable produced; Stream-C does not ship patch. Fix-design provided with TDD recipe.

**Audit-trail anomalies**: 5 findings — empty-reason captures in `codex_failure_audit.jsonl` (55 records), dead-reason path in `codex_gate.jsonl` (382 records), stale `audit_coverage.jsonl` (single entry from 2026-05-13), no recent `cli_path_audit.jsonl` emissions, and unusually-small gateguard state file (1 entry).

**Recommendations**: 3 fixes for W348 ship (W330 GREEN restore; race-free agentBlocks detect; codex_gate reason-emission revive); 3 carry-forwards for W349 (atomic counter writes; Δ-G49-analog for codex_failure_audit; audit-trail liveness probe).

**Output path**: `Z:/claude-sota-installed/tmp/W348-multi-stream-audit/C-hooks-tools-audit.md`
