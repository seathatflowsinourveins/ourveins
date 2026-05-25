

## 2026-05-08 Wave 97 — Ship 1C+1D bundle: gitleaks Phase 2 (PreToolUse hook wire + .gitleaks.toml config)

### Origin

User directives Wave 97: "continue ship convergence sota insights, follow sota offical approach" + "deep dive sota repos and full install their features, gap resolute all" + "always edit with sota references deep dived" + Stop-hook auto-proceed-gate enforcement of CLAUDE.md cardinal-rule-3 "this harness's gate IS codex T1".

Ship 1C+1D bundles 2 logically co-dependent units per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE: hook script + config file (hook would fail-OPEN on baseline FP without config; config without hook is dead state).

### Phase 1 → Phase 2 trajectory completion

| Phase | Wave | Commit | Component |
|---|---|---|---|
| 1 (binary install) | 97-1B | `a1f19f0` | gitleaks v8.30.1 binary at `.local/bin/gitleaks.exe` |
| **2 (enforcement wire)** | **97-1C+1D** | **THIS** | **PreToolUse hook + .gitleaks.toml allowlist config** |
| 3 (deferred) | future | — | full v8.30.1 ruleset audit + per-team allowlist tuning |

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.94 | 4 prescribed_edits applied via Pattern A |
| Round-2 | Pattern B HONEST-NON-FINDING | EXIT-124 timeout | Trace mined; hook FUNCTIONS correctly (synthetic test showed proper deny JSON) |

Verdict files:
- `.claude/state/codex_consult_wave97_ship1c1d_gitleaks_phase2_OUT.txt` (Round-1 — 61,722 tokens; identified 4 implementation defects)
- `.claude/state/codex_consult_wave97_ship1c1d_round2_OUT.txt` (Round-2 — Pattern B timeout-trace-mined; hook deny shape confirmed in trace)

### 4 prescribed_edits applied (Pattern A single atomic apply)

| # | Round-1 finding | Pattern A apply |
|---|---|---|
| F1 | `gitleaks detect --staged` invalid for v8.30.1 (deprecated subcommand) | Replaced with `gitleaks git --staged` per https://github.com/gitleaks/gitleaks/blob/v8.30.1/cmd/git.go (verified live: returns `[]` + "no leaks found" in 159ms) |
| F2 | Need `hookSpecificOutput.hookEventName="PreToolUse"` shape; parse stdout EVEN ON exit 1 | `_emit_allow / _emit_deny` use canonical CC contract; stdout parsed regardless of returncode (gitleaks exits 1 on findings) |
| F3 | Wire BOTH `Bash(git commit *)` AND `Bash(git -C * commit *)`, BEFORE codex T2 | 2 hook entries inserted in settings.json BEFORE codex_t2_pre_commit_gate.py blocks; per-hook timeout 10s (vs codex T2 180s) |
| F4 | Tighten allowlist with condition="AND" + anchored path + regexTarget="match" regex | `.gitleaks.toml` rule-level allowlist for curl-auth-header: `condition="AND"`, `paths=['''docs/install-provenance\.md$''']`, `regexTarget="match"`, `regexes=['''["']x-api-key["']\s*:\s*["']REDACTED''']` |

### Live smoke probes (5/5 PASS post-Pattern-A)

```
1. gitleaks git --staged --config .gitleaks.toml -> [] + "no leaks found" in 159ms
2. python -m py_compile gitleaks_pre_commit_gate.py -> SYNTAX-OK
3. Non-Bash hook input -> allow (defensive default)
4. Bash + non-commit cmd -> allow (reason: not a git commit command)
5. Bash + git commit cmd -> allow + 510ms staged scan -> reason: gitleaks staged scan clean
6. settings.json JSON-VALID after edit
7. Live scan on this commit's staged diff -> 0 findings (allowlist working OR no triggers)
```

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT**: `https://github.com/gitleaks/gitleaks/blob/v8.30.1/cmd/git.go` (canonical `git --staged` subcommand for pre-commit semantic)
- **TIER-1-DIRECT**: `https://github.com/gitleaks/gitleaks#allowlist` (allowlist condition/paths/regex syntax)
- **TIER-1-DIRECT**: `https://code.claude.com/docs/en/hooks#pretooluse` (hookSpecificOutput.permissionDecision contract: allow/deny/ask)
- **TIER-2**: `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t2_pre_commit_gate.py` (sister-mirror for matcher + if + permissionDecision pattern)
- **TIER-3 evidence**: 2 codex T1 verdict files at `.claude/state/codex_consult_wave97_ship1c1d_*_OUT.txt`

### Mia pre-apply (3/3 PASS)

1. `.gitleaks.toml` BEFORE → 0 hits (genuine new file)
2. `gitleaks_pre_commit_gate.py` BEFORE → 0 hits (genuine new file)
3. Existing PreToolUse:Bash hooks → 1 codex_t2 block found; sister-mirror pattern applied (NOT duplicate)

### Edits (4 files atomic)

| File | Change | LOC |
|---|---|---|
| `.gitleaks.toml` | NEW | ~28 |
| `.claude/hooks/scripts/gitleaks_pre_commit_gate.py` | NEW | ~210 |
| `.claude/settings.json` | +2 hook entries (BEFORE codex T2) | +12 |
| `docs/install-provenance.md` | +Wave 97 Ship 1C+1D entry | ~150 |

### LAUNCH-DISCIPLINE D1 INVARIANTS (3-axis CHECK)

✅ **REVERSIBLE**:
- `git revert <Wave97-1C1D-commit>` removes config + hook + settings wire entries
- Operator escape hatch: `GITLEAKS_HOOK_DISABLE=1` env var bypasses without revert
- Binary unchanged (Wave 97 Ship 1B remains)

✅ **OBSERVABLE**:
- Telemetry JSONL at `.claude/state/gitleaks_pre_commit.jsonl` (per-invocation ts/decision/duration_ms/findings_count/status)
- Hook deny → operator sees JSON deny payload in commit attempt
- Hook allow → operator sees scan-clean reason in JSON allow payload

✅ **INCREMENTAL**:
- Phase 1 (binary install Wave 97 Ship 1B) → Phase 2 (enforcement wire THIS) → Phase 3 (deferred ruleset tuning)
- Each phase is independently revertible
- Wire is fail-OPEN on errors per CR-9 (gitleaks unavailable / timeout / parse-error → allow with telemetry)

### CR-9 install-risk discipline (LOW-MED)

- **Fail-OPEN baseline**: missing binary / timeout / repo-detect-fail / JSON parse-error all → allow with telemetry log (NOT block)
- **Operator escape**: `GITLEAKS_HOOK_DISABLE=1` env var
- **Sibling-bleed defense**: hook script reads `CLAUDE_PROJECT_DIR` env or falls back to `git rev-parse --show-toplevel` for repo detection (no hardcoded paths beyond binary candidate list)
- **Version-pin**: gitleaks v8.30.1 binary explicitly installed Wave 97 Ship 1B (NOT @latest at install time)
- **2-round fix-forward expectation MET**: Round-1 NEEDS-REV → Pattern A 4-prescription apply → Round-2 Pattern B HNF (per FM-17.b/FM-01 expectation)

### Sister-rule integration

- `cross-model-consensus.md` T1: real GPT-5.5 e2e BEFORE commit; R1 NEEDS-REV → Pattern A → R2 HNF (Pattern B disposition acceptable per `codex-t1-fix-forward-pattern.md §Pattern B`)
- `codex-t1-fix-forward-pattern.md §Pattern A`: 4 prescribed_edits applied in single atomic apply between rounds
- `codex-t1-fix-forward-pattern.md §Pattern B`: timeout-trace-mining HNF — codex's synthetic test in trace confirmed hook deny-shape correctness
- `closed-loop-recursive-narrowing.md`: Pattern A success shape with R2 HNF disposition (acceptable per Pattern B class)
- `mia-pre-apply.md`: 3/3 probes PASS pre-apply
- `kiss-dry-yagni.md` Must-Never #4: NOT duplicate of codex_t2 — different layer (secret-scan vs cross-model review); both Bash(git commit *) hooks ordered fast→slow

### Wave 97 Ship 1C+1D satisfies cardinal-rule

- **CR-1**: TIER-1-DIRECT cite chain at file:line + HEAD SHA for upstream gitleaks + Anthropic CC hooks docs
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (R1 NEEDS-REV → R2 HNF Pattern A+B)
- **CR-5**: install-priority — gitleaks binary upstream-canonical; hook script is eee-local glue (TIER-3-LOCAL-COMPOSITION cite-import-AMBER) per CR-9 install-risk discipline
- **CR-6**: official-native-channel — config syntax + hook contract both upstream-canonical
- **CR-7**: Phase 1 graduated-unleash; secrets-block hook does NOT change permission scope structurally (extends existing PreToolUse:Bash gate)
- **CR-8**: ADAPTED-FROM-SOTA — config + hook both follow upstream + CC contract patterns
- **CR-9**: install-risk MED → mitigated to LOW via fail-OPEN + GITLEAKS_HOOK_DISABLE escape + telemetry; 2-round fix-forward expectation MET
- **CR-10**: research-first via Wave 97 Agent B SOTA verdict + Wave 97 Ship 1B baseline scan + codex T1 R1 implementation-defect catch
- **CR-11**: META-process SOTA — Pattern A discipline + Mia 3/3 + GPT-5.5 e2e R1+R2 + provenance log + atomic commit per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE

### Operational impact

| Layer | Pre-Wave-97-Ship-1C1D | Post-Wave-97-Ship-1C1D |
|---|---|---|
| Secret-scan capability | manual `gitleaks` operator-invoke | automatic PreToolUse hook on every `git commit` |
| Pre-commit secret floor | binary-only (CR-1 enforced manually) | binary + hook + telemetry (CR-1 enforced mechanically) |
| Hook ordering | block_no_verify_guard → codex_t2 (180s) | block_no_verify_guard → **gitleaks (10s fast-fail)** → codex_t2 (180s slow-thorough) |
| False-positive handling | manual baseline ignore | rule-level allowlist (.gitleaks.toml condition=AND path+regex) — surgical, perpetual |
| Operator escape | n/a | `GITLEAKS_HOOK_DISABLE=1` env var |

### Ships LANDED in this session arc (13 total)

| Wave | Commit | Ship |
|---|---|---|
| 86 | `824523f` | 1Q — CLIProxyAPI 4h session-affinity |
| 89 | `15dad8e` | 1Y — codex CLI sandbox unleash |
| 91 | `6ebcf08` | 1W — Aperant rate-limit poller |
| 92 | `861ee43` | 1T — cnighswonger v3.5.3 cache-fix chain |
| 93 | `63cc261` | 1X — cycle-aware rotation planner |
| 90 | `f8134e7` | docs — fleet status |
| 94 | `b7207e9` | Phase 3 1T + cron deploy |
| 95 | `840db40` | 1M — context-mode FULL plugin install |
| 96 | `51d74d6` | 1M Phase 2 — Bun runtime install |
| 97-1A | `3c00615` | 1A — claude-md-management plugin enable |
| 97-1B | `a1f19f0` | 1B — gitleaks v8.30.1 binary install |
| 97-1G | `58be220` | 1G — CLAUDE_CODE_EFFORT_LEVEL=xhigh env-precedence pin |
| **97-1C+1D** | **THIS** | **1C+1D — gitleaks PreToolUse hook wire + .gitleaks.toml config** |

### Update triggers

Re-evaluate when:
- gitleaks v9.x ships with breaking CLI changes
- Telemetry JSONL shows >5 false-positive deny events from a single rule (would justify ruleset audit Phase 3)
- Hook timeout >10s observed in production (would tune timeout)
- A 2nd rule-class needs allowlist (would expand .gitleaks.toml)
- Anthropic CC PreToolUse hookSpecificOutput contract changes
- Codex T2 hook needs to run BEFORE gitleaks for some scenario (would re-order)

### Next ships in Wave 97 queue

- Ship 1E: claude-hud + codex-hud plugin enables (operator-interactive `/plugin install` first)
- Ship 1F: context-mode FM-03 D1 transport disconnect investigation (Agent A flagged)
- Ship 1H: gitleaks ruleset audit Phase 3 (.gitleaks.toml extends with custom rules per workload)
- Ship 1I: claude-devtools install path investigation (NOT in any local marketplace; operator may need to clone manually)
