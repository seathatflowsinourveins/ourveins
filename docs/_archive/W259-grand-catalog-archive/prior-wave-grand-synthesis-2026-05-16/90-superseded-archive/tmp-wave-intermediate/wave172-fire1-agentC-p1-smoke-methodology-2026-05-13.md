---
title: Wave 172 Fire 1 Agent C — P1 SessionStart preload-verify smoke-PASS methodology
status: AUTHORITATIVE-DRAFT
date: 2026-05-13
agent: architect (W172-F1-AgentC)
priority: P1
cite_class: |
  constituents=[
    TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (SessionStart payload schema + additionalContext sync-before-first-prompt),
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md §The contract,
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/audit-action-loop.md §Wire/Surface/Close,
    TIER-2 @ Z:/claude-sota-installed/tmp/wave170-fire1-agentA-sessionstart-hook-revised-2026-05-13.md §1+§3,
    TIER-3-LOCAL-COMPOSITION @ sss-novel methodology
  ]; effective_tier=TIER-3-LOCAL-COMPOSITION
---

## §0 Mia self-probe

Probed Agent A W170 F1 design: L24-264 240-LOC Python; L66 MEMORY_LINE_CAP=200; L144 BACKEND_KEYS 5-tuple; L161-164 mcp_memory+graphiti skipped; L268-275 settings.json NO async:true. Probed settings.json L456-486 SessionStart (3 entries; recommend slot 4 after L484 cli_path_audit).

## §1 Option trade-off

| # | Option | Mechanism | Tests |
|---|--------|-----------|-------|
| A | Synthetic stdin | `echo JSON \| python hook.py` | i, ii, iii, v |
| B | Live SessionStart | Operator restart eee → real event | iv, full E2E |
| **C RECOMMENDED** | **Hybrid** | A for i+ii+iii+v / B for iv | All 5 |

Rationale: A is deterministic + fast (no restart cost); B is ecologically valid for STALE-PRELOAD-NOTICE on real session-resume boundary. Hybrid minimizes operator cost while preserving test-iv real-event semantic.

## §2 Per-test recipe

**Test (i) paths-glob/Layer-2 status:ok**:
- Cmd: `echo '{"session_id":"smoke-i","source":"startup","cwd":"Z:/claude-sota-installed"}' | python .claude/hooks/scripts/sessionstart_preload_verify.py`
- Expect: stdout JSON with `hookSpecificOutput.additionalContext` containing `L2 lines=<N>` N≤200
- Verify: `tail -1 .claude/state/sessionstart_preload.jsonl | jq '.layer2.status'` → `"ok"`
- FAIL: `"over_cap"` / `"missing"` / `"read_error"` → archive MEMORY.md / restore from archive / re-Edit hook

**Test (ii) MEMORY.md ≤200 lines**:
- Same synthetic call as (i); `.layer2.line_count ≤ 200 AND .layer2.stale = false`
- FAIL: line_count>200 → STALE-PRELOAD-NOTICE; archive bloated MEMORY.md per W164 reset precedent

**Test (iii) 5-backend probe consistency**:
- Same synthetic call; expected: `len(backend_presence_probe)==5 AND ok==3 AND skipped==2 AND missing==0 AND empty==0`
- Verify: `tail -1 ...jsonl | jq '.backend_summary'`
- FAIL: provenance/tmp_wave/jsonl_state missing OR skipped≠2 (BACKEND_KEYS drift) → verify Layer-1 trail OR re-Edit hook L144

**Test (iv) STALE-PRELOAD synthetic (LIVE Option B)**:
- Pre: `mv docs/install-provenance.md docs/install-provenance.md.bak`
- Trigger: operator `/exit` + restart `eee`
- Expect: additionalContext contains `STALE-PRELOAD-NOTICE` + `backend_provenance:missing` in stale_reasons
- STRICT probe: set `SESSIONSTART_PRELOAD_STRICT=1` before restart → expect exit 2 + stderr
- Cleanup: `mv docs/install-provenance.md.bak docs/install-provenance.md` + re-restart; any_drift→false
- FAIL: any_drift remains false despite missing PROVENANCE = `_evaluate_stale` bug L155-171 (P0) OR notice absent = `_emit_additional_context` bug L184-194 (P0) OR hook didn't fire = settings.json registration bug (P0)

**Test (v) Wall-clock <5s**:
- PowerShell: `Measure-Command { echo '<JSON>' | python hook.py } | Select-Object TotalSeconds`
- Bash: `time (echo '<JSON>' | python hook.py)`
- Expect: TotalSeconds < 5.0
- FAIL: >5s → CC silently kills hook; profile via `python -X importtime`; suspect `_probe_layer3_close_synthesis` Glob (Wave files accumulate); mitigation = bound Glob mtime-sorted top-3

## §3 Post-Pattern-A verify protocol

| Step | Action | Verification |
|------|--------|--------------|
| 1 | Hook file exists | `Test-Path .../sessionstart_preload_verify.py`; ~6-9KB |
| 2 | settings.json wire | `Select-String -Pattern 'sessionstart_preload_verify' settings.json` → 1 match slot 4; NO `"async":true`; `"timeout":5` |
| 3 | Run 5-test (Hybrid) | i+ii+iii+v via single synthetic call; iv via Option B restart |
| 4 | Collect telemetry | `Get-Content sessionstart_preload.jsonl -Tail 3 \| ConvertFrom-Json` → 3 records schema `sessionstart_preload.v1` |
| 5 | Commit body | `feat(p1): smoke-PASS / 5-test contract / Option C // (i)=ok PASS / (ii)=<N>/200 PASS / (iii)=[3-ok 2-skipped 0-missing] PASS / (iv)=STALE+STRICT exit-2 PASS / (v)=<X.X>s PASS // telemetry rows N..N+2` |

## §4 Telemetry shape (sessionstart_preload.v1)

Per Agent A W170 F1 L194-212 `_build_telemetry`:
- `schema`: const `"sessionstart_preload.v1"`
- `ts`: ISO-8601 UTC (test v approx)
- `wire_event`: `"SessionStart"` (step 2 verify)
- `source`: `startup|resume|tick` (iv distinguishes from synthetic)
- `session_id` / `agent_id` / `agent_type` / `model` / `transcript_path` / `cwd`
- `layer2`: {status, line_count, stale, cap} → (i) + (ii)
- `layer3` / `layer1`: continuity + 5-surface coverage
- `backend_presence_probe`: array[5] → (iii) count
- `backend_summary`: {ok, skipped, missing, empty, read_error, mismatch} → (iii) gate
- `stale_reasons`: array[string]; `any_drift`: bool → (iv) gate
- `dry_run` / `strict`: env knobs

## §5 Operator runbook (copy-paste-ready)

```bash
# PHASE 1 — Pre-Pattern-A confirm
ls -la .claude/hooks/scripts/sessionstart_preload_verify.py 2>&1 || echo "Apply Pattern A first"
grep -c 'sessionstart_preload_verify' .claude/settings.json

# PHASE 2 — Synthetic-stdin (tests i+ii+iii+v)
cd Z:/claude-sota-installed
time (echo '{"session_id":"smoke-c1","source":"startup","cwd":"Z:/claude-sota-installed"}' | \
  python .claude/hooks/scripts/sessionstart_preload_verify.py)

# PHASE 3 — Telemetry verify
tail -1 .claude/state/sessionstart_preload.jsonl | python -c "import sys,json; r=json.loads(sys.stdin.read()); print('test_i:',r['layer2']['status']); print('test_ii:',r['layer2']['line_count'],'/',r['layer2']['cap']); print('test_iii:',r['backend_summary'],'count:',len(r['backend_presence_probe'])); print('any_drift:',r['any_drift'])"

# PHASE 4 — STALE synthetic (test iv LIVE)
mv docs/install-provenance.md docs/install-provenance.md.bak
# Operator: /exit + restart eee
# Post-restart in NEW session:
tail -1 .claude/state/sessionstart_preload.jsonl | python -c "import sys,json; r=json.loads(sys.stdin.read()); print('any_drift:',r['any_drift']); print('stale_reasons:',r['stale_reasons'])"

# PHASE 5 — STRICT probe
$env:SESSIONSTART_PRELOAD_STRICT='1'
# Operator: re-restart eee; expect exit 2 + stderr "STRICT mode"
Remove-Item Env:SESSIONSTART_PRELOAD_STRICT

# PHASE 6 — Cleanup + re-verify
mv docs/install-provenance.md.bak docs/install-provenance.md
# Operator: restart eee one more time
tail -1 .claude/state/sessionstart_preload.jsonl | python -c "import sys,json; r=json.loads(sys.stdin.read()); print('any_drift:',r['any_drift'])"
```

## §6 Failure-mode matrix

| Test | FAIL signature | Severity | Recovery |
|------|---------------|----------|----------|
| (i) | layer2.status≠ok | P1 | Edit MEMORY.md OR re-Edit hook |
| (ii) | line_count>200 | P1 | Archive MEMORY.md per W164 |
| (iii) | Backend drift (ok≠3 / skipped≠2 / missing>0) | P1 | Verify Layer-1 / re-Edit BACKEND_KEYS |
| (iv-detect) | any_drift=false missing PROVENANCE | P0 | `_evaluate_stale` bug L155-171 |
| (iv-notice) | NOTICE absent | P0 | `_emit_additional_context` bug L184-194 |
| (iv-wire) | Hook didn't fire | P0 | settings.json drift; restore PROVENANCE.bak FIRST |
| (iv-strict) | exit≠2 | P2 | `_bool_env` OR main() return path |
| (v) | >5s | P1 | Profile + bound Glob |
| (v-timeout) | CC kills silently | P0 | Optimize probes |

P0 → DEFER + fresh Pattern A T1; P1/P2 → fix-forward Pattern A atomic.

## §7 CR-3 Phase 1 bootstrap exception disclosure

- Smoke-PASS validates HOOK FIRES; does NOT validate hook design is SOTA-compliant
- Pattern A apply of W170 F1 hook script requires SEPARATE codex T1 review per cross-model-consensus.md §The contract step 2: orchestrator-side `codex exec --ephemeral -p deep-review-exec` foreground+tee on Agent A 185-LOC source PRE-Edit
- Per W165 F4: codex T1-T7 INSTALLED-AND-WIRED — bootstrap exception likely NOT needed
- Cross-model gate path: (a) Pattern A apply → (b) post-commit T3 auto-fires → (c) smoke-PASS executes POST-T3 verdict → (d) commit body cites BOTH T3 + smoke
- STAND-IN-NOTICE: CLAUDE.local.md (g) DEPRECATED; if re-activated, smoke verdict carries `[STAND-IN]` qualifier

**Recommendation**: orchestrator fires codex T1 deep-review-exec on Agent A hook script BEFORE Pattern A Edit; smoke-PASS executes POST-Pattern-A as runtime verification net per audit-action-loop.md §Stage 4 Re-fire. Both gates required for full cross-model satisfaction.

## ARTIFACT-INLINE: tmp/wave172-fire1-agentC-p1-smoke-methodology-2026-05-13.md
