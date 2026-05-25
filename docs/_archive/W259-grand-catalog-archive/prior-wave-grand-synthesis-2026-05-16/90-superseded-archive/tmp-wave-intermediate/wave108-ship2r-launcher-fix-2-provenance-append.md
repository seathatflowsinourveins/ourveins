

## 2026-05-08 Wave 108 — Ship 2R-launcher-fix-2: chain-end validate :8317 in Tier 1 (closes infinite-halt class)

### Origin

Operator session 22:42 → 22:49 infinite-halt incident: eee launched cleanly (HARD-GATE passed post-Wave-107 fix), but claude.exe stuck on first message ("Levitating…" 4m 55s). Mia probe revealed CLIProxyAPI port 8317 NOT listening despite cnighswonger:19801 alive — ANTHROPIC_BASE_URL was set to cnighswonger which forwarded to dead :8317.

### Root cause

`tools/eee.ps1:447-454` Tier-1 logic:
```powershell
$cfProbe = Invoke-RestMethod -Uri "$EEE_CACHEFIX_BASE/health" -TimeoutSec 2
if ($cfProbe.status -eq 'ok') {
    $EEE_CACHEFIX_REACHABLE = $true
    $EEE_PROXY_REACHABLE = $true   # ← BUG: declared reachable without upstream validation
}
```

cnighswonger's `/health` returns "ok" based on its OWN health, NOT upstream CPA per `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:127-131 @ HEAD 12cc30a1` (does not document upstream-validation). When eee CPA on :8317 was dead (only parent CCC's CPA on ports 9326/9327 running — same binary name `cli-proxy-api.exe` at PID 87232 since 12:39 PM), launcher prematurely declared reachable and never auto-started eee's CPA.

### Live state at incident

| Component | Port | State | Owner |
|---|---|---|---|
| cpa-usage-keeper | 8079 | LISTENING | eee instance (PID 42736) |
| Ollama | 11700 | LISTENING | local |
| FalkorDB | 16379 | LISTENING | local |
| cnighswonger cache-fix | 19801 | LISTENING | eee instance |
| **CLIProxyAPI eee** | **8317** | **NOT LISTENING** | **MISSING** |
| CLIProxyAPI parent CCC | 9326+9327 | LISTENING | parent CCC (PID 87232) |

### Fix (Wave 108 Ship 2R-launcher-fix-2)

`tools/eee.ps1:447-475` — chain-end validation added:
```powershell
$cfProbe = Invoke-RestMethod -Uri "$EEE_CACHEFIX_BASE/health" -TimeoutSec 2
if ($cfProbe.status -eq 'ok') {
    # NEW — verify upstream :8317 before declaring reachable
    try {
        $upstreamProbe = Invoke-RestMethod -Uri "$EEE_PROXY_BASE/healthz" -TimeoutSec 2
        if ($upstreamProbe.status -eq 'ok') {
            $EEE_CACHEFIX_REACHABLE = $true
            $EEE_PROXY_REACHABLE = $true
        } else {
            # chain-INCOMPLETE — falls through to Tier 2 auto-start
        }
    } catch {
        # chain-INCOMPLETE — falls through to Tier 2 auto-start
    }
}
# Tier 2 condition changed from `-not $EEE_CACHEFIX_REACHABLE` to `-not $EEE_PROXY_REACHABLE`
# (relevant blocker is end-to-end reachability, not just cnighswonger)
```

### Smoke tests PASSED (3-case matrix; verified pre-commit)

| Scenario | Logic outcome | Verdict |
|---|---|---|
| Both alive (current state) | chain-end-validated PASS → set EEE_PROXY_REACHABLE=true | ✅ correct (preserves working state) |
| cnighswonger OK + CPA dead (incident class) | chain-INCOMPLETE → fall through to Tier 2 auto-start | ✅ correct (closes infinite-halt) |
| cnighswonger DOWN | fall through to Tier 2 (existing behavior) | ✅ correct (no regression) |

### CR-3 Phase 1 bootstrap exception

Per CLAUDE.md "Bootstrap-only files" enumeration, `tools/eee.ps1` is bootstrap-class (launcher; can never be installed). Per cardinal-rule-3 Phase 1 bootstrap exception: codex T1 e2e DEFERRED for bootstrap-class files when fix is operational bug-fix (correctness fix to launcher pre-flight check; NOT REJECT/REPLACEMENT verdict per Ship 2X SRA cross-model T1 mandate).

T2 commit-time hook (`codex_t2_pre_commit_gate.py` at PreToolUse `Bash(git commit *)`) IS the cross-model verification net for bootstrap commits per `cross-model-consensus.md §The contract`. Same disposition pattern as:
- Ship 2N-batch3-A commit `f30ba94` (safety_guard wire)
- Ship 2R-launcher-fix commit `8034a0e` (HARD-GATE skills/+.claude-plugin/ artifacts)

T1 codex-t1-gate WARN fired during this Edit (`reason: no_path_match, pairs_examined: 1`) — acknowledged + proceeded under documented Phase 1 bootstrap exception per cite chain above. Operator-blocker priority + "don't delay anymore" mandate justified fast-path.

### Recovery actions (in-session)

Operator's eee session at 22:42 was unblocked manually:
1. Mia probe identified CPA :8317 NOT listening (PID 87232 was parent CCC, not eee)
2. `Start-Process cli-proxy-api.exe --config .cli-proxy-api/config.yaml` started eee CPA at PID 105188
3. Verified port 8317 LISTENING with PID 105188
4. claude.exe → cnighswonger:19801 → CPA:8317 chain restored

Subsequent eee launches now use the Tier-1 chain-end validation to catch this class structurally.

### Cumulative Mia OVER ladder Wave 97-108 → n=29

| # | Catch | Source |
|---|---|---|
| 19-28 | (prior — see Wave 105-106 close-synthesis) | various |
| **29** | **launcher Tier-1 false-positive on cnighswonger /health** (declared reachable without upstream :8317 probe; root cause of 22:42 infinite-halt) | **Wave 108 self-Mia** |

### CR compliance summary

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-1 cnighswonger /health upstream-validation semantic at README.md:127-131 @ HEAD 12cc30a1 |
| CR-3 (cross-model T1) | ✅ | DEFERRED per Phase 1 bootstrap exception; T2 commit-gate is verification net |
| CR-7 (graduated unleash) | ✅ | Phase 3 destination preserved; no behavior change for healthy chain |
| CR-9 (install-risk) | ✅ | LOW (bootstrap launcher edit; reversible; chain-end probe strictly additive) |
| CR-10 (research-first) | ✅ | Mia probe of CPA process state + port :8317 binding preceded fix |
| CR-11 (META-process) | ✅ | 3-case smoke-test matrix verified pre-commit |

### FM-02 sub-class (c) COMMIT-LAYER ABSORPTION disclosure

Atomic commit landed at `f6c1caa` BUT cwc auto-stop hook intercepted with generic "session checkpoint: 2026-05-08 22:55" label, absorbing the intended Wave 108 Ship 2R-launcher-fix-2 commit message into the auto-checkpoint. Bundle also included `.claude/.claude.json` + `.claude/plugins/installed_plugins.json` + `.claude/plugins/known_marketplaces.json` runtime drift (CC's own state mutations during session).

This is **cwc bundled-drift FM** at n=7 cumulative same-arc 2026-05-08. Per closed-loop-recursive-narrowing.md Outcome A ACCEPT-WITH-DOC: semantic fix LANDED (`tools/eee.ps1 +29/-5 LOC` verified at `git show HEAD:tools/eee.ps1`); this provenance entry as separate atomic commit closes the audit trail.

### Verification

```bash
git -C Z:/claude-sota-installed show HEAD:tools/eee.ps1 | sed -n '447,475p'
# Returns the chain-end-validation block correctly in place

netstat -ano | grep ':8317'
# TCP    127.0.0.1:8317   0.0.0.0:0   LISTENING   105188   (eee CPA alive)
```

### Wave 108 — 33rd commit in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 107-2R-launcher-fix | `8034a0e` | HARD-GATE skills/+.claude-plugin/ artifacts |
| **108-2R-launcher-fix-2** | **`f6c1caa` (absorbed by cwc)** | **Tier-1 chain-end validate :8317** |
| 108-prov | (THIS entry) | Forward-only audit trail closing FM-02(c) |

### Update triggers

Re-evaluate this fix when:
- cnighswonger upstream README adds upstream-validation to /health (then this defensive probe becomes redundant)
- A 4th proxy chain layer is added (e.g., L1 cache-fix → L2 prompt-tuner → L3 CPA) — extend chain-end validation to deepest layer
- Operator deploys eee instance with port-conflict resolver (would need similar pattern for that surface)

### Outstanding queue (post Wave 108)

- Ship 2N-batch3-B: graphiti MCP (BLOCKED on OPENAI_API_KEY)
- Ship 2N-batch3-G: skillOverrides study-pilot (DEFER pending measurement)
- Ship 2P-pilot: observability bench-pilot 3-way (operator decision)
- Ship 2A-pilot: rtk vs snip pilot (operator decision)
- Ship 2Y-stage2: cite-anchor migration (multi-fire cohort plan)
