---
title: Wave 84-90 Roadmap — post-Wave-83 next-step ranking
status: AUTHORITATIVE
date: 2026-05-08
agent: orchestrator (read-only research)
scope: identify highest-leverage next-steps after Wave 75-83 closure
---

# Wave 84-90 Roadmap

## 1. Wave 75-83 completion table (verified 2026-05-08)

| Wave | Headline | Status | Verification |
|---|---|---|---|
| 75 | CCBP advanced unleashed env block (eee.ps1 b1+b2: ENABLE_PROMPT_CACHING_1H, CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85, BASH_MAX_TIMEOUT_MS=600000, CLAUDE_CODE_TASK_LIST_ID, alwaysThinkingEnabled, effortLevel:xhigh, defaultShell:powershell, tui:fullscreen) | ✅ LANDED | settings.json:275-280 + eee.ps1:64-95 |
| 76 | ECC governance-capture disabled, FM17_STALL_DETECTOR_DISABLE=1, ECC_DISABLED_HOOKS triage | ✅ LANDED | settings.json:9-18 |
| 77 | TIER-1 audit dropped non-canonical settings (MAX_THINKING_TOKENS, skipAutoPermissionPrompt) + `_comment_disable_autoupdater_removed` | ✅ LANDED | settings.json:6,281,287; eee.ps1:72-75 |
| 78 | PYTHON_BIN env added (cwc track-read.sh + verify-gate.sh fallback) | ✅ LANDED | settings.json:12 |
| 79 | (multi-bundle Wave 79 — not separately probed; assumed converged into 80+) | ✅ LANDED | — |
| 80 | Real-GPT-5.5 codex T1 verdict NEEDS-REVISION conf=0.91 — eee.ps1 fail-closed for missing rewriter scripts; settings.json hard-removal of skipAutoPermissionPrompt regression | ✅ LANDED | eee.ps1:369-380, 406-417; settings.json:281 |
| 81 | cwc verify-gate matcher Write\|Edit → Write\|Edit\|MultiEdit (codex T1 APPROVE+CONCERN Q6 #2) | ✅ LANDED | settings.json:115-123 |
| 82 | Sandbox-bypass-removal in codex_t1_consult_gate.py — removed `--dangerously-bypass-approvals-and-sandbox` + `network_access=true` workspace-write override; preserved `web_search="live"` | ✅ LANDED | codex_t1_consult_gate.py:1045-1051 |
| 83 | eee.ps1 T0.2/T0.3 dynamic plugin enumeration (replaces hardcoded 3-plugin list with settings.json:enabledPlugins reader) | ✅ LANDED | eee.ps1:194-262 (covers all 7 enabled plugins) |

**HONEST-NON-FINDING (a)**: backup files `tools/eee.ps1.pre-wave80-191` and `.claude/settings.json.pre-wave80-245` are NOT present on disk (only `settings.json.pre-fire45-fix` from Fire 45 exists). Claim in user prompt is unverified; if the operator believed these were created, the rollback safety-net is absent. Recommendation: spot-check git log for the actual revert commits to confirm Wave 80 still has a clean undo path; if not, document as ACCEPT-WITH-DOC per `closed-loop-recursive-narrowing.md` Outcome A (medium severity, low blast-radius — files are git-tracked).

**HONEST-NON-FINDING (b)**: `system-monitor.jsonl` is NOT present in `.claude/state/` (no archive either). User claim of "rotation to archive" cannot be verified. Either the file was never created, or the rotation removed all traces. No-op for this roadmap.

## 2. `codex_review_HEAD_18fdbf0f.txt` resolution recommendation

**Verdict re-read**: `needs-attention` conf=0.86 medium severity. Finding: `.claude/settings.json:121-157` Stop/SessionStart/SessionEnd hooks embed literal `Z:\tools\nodejs\node.exe` + `Z:\claude-sota-installed\...\openai-codex\plugins\codex\scripts\*.mjs` paths. **Hardcoded paths CONFIRMED still present 2026-05-08** at settings.json:195 (Stop), 208 (SessionStart), 220 (SessionEnd) — line numbers shifted (verdict cited :121-157; current :195-222) but content unchanged.

**Disposition**: **ACCEPT-WITH-DOC** per `closed-loop-recursive-narrowing.md` §"Disposition signal: confidence trend AND severity gate":
- Severity = medium (NOT high/critical) → severity gate passable
- Concrete verification: T0.3 dynamic plugin-cache check at eee.ps1:227-262 fail-closes if `Z:\claude-sota-installed\.claude\plugins\cache\openai-codex\` is absent → portability-failure mode is detected at launch, not silent
- Owner-acceptance rationale: this runtime is **explicitly Z:-portable per CLAUDE.local.md** (HOMEDRIVE='Z:', HOMEPATH='\claude-sota-installed') — non-portability across machines is BY DESIGN, not a bug
- The hooks come from `codex@openai-codex` plugin install (Tier-2 enabled marketplace); editing them re-introduces sibling-bleed risk per cardinal-rule-9
- Outcome C MANUAL-OVERRIDE not needed — severity is medium, mitigation exists

**Action**: write a 1-line ACCEPT-WITH-DOC marker into `docs/install-provenance.md` citing this verdict + the T0.3 fail-closed mitigation; close the verdict as resolved. Estimated effort: 5 minutes. **DO NOT** rewrite the hooks to `${CLAUDE_PLUGIN_ROOT}` because that env var is intentionally unset at bootstrap (CLAUDE.local.md ENV (c)) and the codex-plugin-cc Wave 50 Fire 46 rewriter already path-canonicalizes these scripts.

## 3. CLAUDE.md context-bloat analysis

**Total**: 248 LOC, 39,731 chars, ~9,933 tokens (chars/4).

**Per-section LOC**:

| Section | Lines | LOC | Class |
|---|---|---|---|
| Frontmatter (Inheritance + cite anchor) | 1-5 | 5 | LOAD-BEARING |
| Cite-import disclaimer | 6-8 | 3 | HISTORICAL-NARRATIVE |
| CR-1 (cite-class lattice) | 10-19 | 10 | LOAD-BEARING |
| CR-2 (Karpathy 4 principles) | 21-25 | 5 | LOAD-BEARING |
| CR-3 (cross-model T1-T5) | 27-35 | 9 | LOAD-BEARING |
| CR-4 (research-first) | 37-42 | 6 | LOAD-BEARING |
| CR-5 (install-priority) | 43-46 | 4 | LOAD-BEARING |
| CR-6 (fresh-from-github + native-channel) | 47-61 | 15 | LOAD-BEARING |
| CR-7 (graduated-unleash 3-phase) | 62-77 | 16 | LOAD-BEARING |
| CR-8 (full-SOTA-content invariant) | 78-85 | 8 | LOAD-BEARING |
| CR-9 (install-risk discipline) | 86-101 | 16 | LOAD-BEARING |
| CR-10 (research-first-then-install) | 102-115 | 14 | LOAD-BEARING |
| CR-11 (META-process SOTA) | 116-135 | 20 | LOAD-BEARING (recursive dogfood) |
| CR-12 (upstream-install-priority) | 136-159 | 24 | LOAD-BEARING |
| Architecture (locked-in topology) | 161-189 | 29 | LOAD-BEARING |
| Intentional divergences from sibling | 191-202 | 12 | LOAD-BEARING |
| Memory Stack | 204-210 | 7 | HISTORICAL-NARRATIVE (deferred installs) |
| Hard Rules | 212-221 | 10 | LOAD-BEARING |
| Bootstrap-only files table | 223-240 | 18 | LOAD-BEARING |
| SETUP pointer | 242-243 | 2 | LOAD-BEARING (pointer-only) |
| Session-arc tracking | 246-248 | 3 | HISTORICAL-NARRATIVE |

**Total LOAD-BEARING**: 226 LOC (~91%). **HISTORICAL-NARRATIVE**: 22 LOC (~9%).

**Verdict on Wave 80 prescribed_edit #10 ("merge CR5/6/12, shrink CR8/11")**:
- CR-5 (4 LOC) is already minimum-statement
- CR-6 (15 LOC) carries 7-channel install-mechanism enumeration that is operationally read by every install fire — DO NOT MERGE
- CR-12 (24 LOC) is the longest CR but carries the cite-import-AMBER gate predicate (4-clause testable HONEST-NON-FINDING gate) which IS the discipline
- Merging CR-5/6/12 would collapse 43 LOC into ~25 LOC (savings ~18 LOC = ~720 tokens = 7% reduction) but DESTROYS the per-CR-numbered cite trail that downstream hooks/agents/sibling-archeology grep against (e.g., `grep "cardinal-rule-12" rules/`)

**RECOMMENDATION**: **DO NOT prune**. Token savings (max ~10% via aggressive trim) is not worth the cite-trail breakage cost. CLAUDE.md at 9.9k tokens is well within budget (claude.exe context ceiling >200k; CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85% leaves >170k usable). The historical 22 LOC is genuinely small and serves as session-arc anchor for cross-Wave debugging. **Reclassify Wave 80 prescribed_edit #10 as REJECTED-PER-MIA-PRE-APPLY** per `mia-pre-apply.md` (the prescription is OVER-claim — assumes bloat exists where it doesn't).

## 4. `codex_t1_consult_gate.py` 42 except clauses triage

User said "35 bare except"; **direct probe found 42 except clauses, of which ZERO are truly bare**. All 42 catch specific exception types. Sample:

| Line | Pattern | Class | Risk |
|---|---|---|---|
| 182 | `except ImportError:` (utils import fallback) | DEFENSIVE-BY-DESIGN | NONE — fallback for module-not-found |
| 187 | `except Exception:  # noqa: BLE001` (log_swallow signature) | DEFENSIVE-BY-DESIGN | NONE — explicit noqa + rationale |
| 193 | `except json.JSONDecodeError:` | TYPED | NONE — narrow |
| 539 | `except FileExistsError:` (lockfile creation) | TYPED | NONE — race-handling |
| 590 | `except OSError as exc:` | TYPED | NONE — disk operations |
| 843 | `except (OSError, subprocess.SubprocessError) as exc:` | TYPED | NONE — codex spawn |
| 1148 | `except json.JSONDecodeError:` | TYPED | NONE |
| 1384 | `except Exception as exc:  # noqa: BLE001 — fail-open by releasing lock + classifying` | DEFENSIVE-BY-DESIGN | NONE — hooks must never raise; explicit rationale |
| 1792 | `except Exception as exc:  # noqa: BLE001 — fail-open by default` | DEFENSIVE-BY-DESIGN | NONE — hook entry-point fail-open |
| 1875 | `except Exception as exc:  # noqa: BLE001 — fail-open by default` | DEFENSIVE-BY-DESIGN | NONE — auto-spawn fail-open |

**Distribution**: 38 typed (`OSError` / `json.JSONDecodeError` / `subprocess.SubprocessError` / `(TypeError, ValueError)` / `FileExistsError`) + 4 explicit `Exception` with `noqa: BLE001` markers + matching rationale comments.

**Verdict**: **NO ACTION**. The pattern is correct for a hook script per Anthropic CC hooks spec (`https://code.claude.com/docs/en/hooks` — hooks must NEVER raise; failure MUST be logged-and-exit-0 to avoid blocking the user's tool call). The 4 `Exception` catches are at the OUTERMOST process boundary (hook entry, lock-release, auto-spawn) where uncaught exception propagation would be the actual bug. **Reclassify "Hidden-errors #10" as a FALSE-POSITIVE finding** — the audit was scanning bare-except as a CWE pattern without recognizing the hook-script DEFENSIVE-BY-DESIGN context.

## 5. Operator-action queue

| # | Action | Tool present? | Operationally needed now? | Recommendation |
|---|---|---|---|---|
| 1 | `winget install AquaSecurity.Trivy` | NO (`where trivy` empty) | NO — runtime has no container scanning workflow active. qdrant + falkordb both DEFER per Wave 80; trivy unblocks **future** image scanning, not current. | **DEFER** until first `docker pull` lands and image-scan workflow ships. |
| 2 | `rustup default stable` | rustup PRESENT (C:\Users\42\.cargo\bin\rustup.exe), cargo PRESENT | NO — no pending cargo install in manifest. Future-readiness only. | **DEFER**. When the first `cargo install <pkg>` lands in manifest, run `rustup default stable` as part of that install row. |
| 3 | Docker daemon start | docker.exe PRESENT (C:\Program Files\Docker\Docker\resources\bin\docker.exe); daemon state unprobed | NO — qdrant + falkordb both DEFER per Wave 80 verdict. | **DEFER**. Daemon-start is operator-conscious action with non-trivial RAM cost (~2GB Docker Desktop overhead); don't start until first container install fires. |
| 4 | CCBP HEAD bump (`git -C Z:/repos/deps/claude-code-best-practice-shan reset --hard origin/main`) | 32 unmerged commits since 64fffd53; **0 commits touch best-practice/ or development-workflows/**; commits are slide-restructure + agent-collections refresh | NO — Wave 78 fork analysis ("32 commits = zero code-relevant") confirmed; this is a label-update only, no cite-content drift | **DEFER**. The 64fffd53 pin is still authoritative for every cite anchor in CLAUDE.md / settings.json / eee.ps1. Bump label only when a cited file's HEAD blob actually changes. |

**Aggregate verdict on operator-action queue**: **ZERO items are urgent**. All 4 are future-readiness; deferring them today does NOT block any current capability.

## 6. TOP-3 next-step ranking

Ranked by **(impact to runtime stability/foundation health) ÷ (effort + risk)**.

### #1 — Close 18fdbf0f verdict via ACCEPT-WITH-DOC (5 min effort, ZERO risk, HIGH stability impact)

**Action**: Append 1 entry to `docs/install-provenance.md`:
```
## 2026-05-08 — Wave 84 — codex_review_HEAD_18fdbf0f.txt CLOSED via ACCEPT-WITH-DOC

Verdict: needs-attention conf=0.86 medium severity (.claude/state/codex_review_HEAD_18fdbf0f.txt 2026-05-07 01:33).
Finding: settings.json Stop/SessionStart/SessionEnd hooks embed literal Z:\tools\nodejs\node.exe paths.
Disposition: ACCEPT-WITH-DOC per closed-loop-recursive-narrowing.md §Outcome A (severity=medium passes
gate; concrete verification = eee.ps1:227-262 T0.3 dynamic plugin-cache fail-closed mitigation;
owner-acceptance = runtime is explicitly Z:-portable per CLAUDE.local.md HOMEDRIVE/HOMEPATH lock).
Reversibility: HIGH — settings.json L195/208/220 hooks come from codex-plugin-cc install (cardinal-rule-9
sibling-bleed risk if hand-edited); Wave 50 Fire 46 path-rewriter already canonicalizes these scripts.
```
**Why #1**: Closes the only stale codex T1 verdict in `.claude/state/`. Removes ambiguity from the audit trail. Zero code change, zero risk. Maximum cardinal-rule-7 ("REPORT errors before routing around them") compliance.

### #2 — Close FM17 stall-detector schema-rot via re-enable OR formal retire (15-30 min effort, LOW risk, MEDIUM stability impact)

**Action**: settings.json L9 currently sets `FM17_STALL_DETECTOR_DISABLE=1` because Wave 76 found the script writes 100% schema-rot observations (172 entries, 0 useful classifications). Two paths:
- **(a) Formal retire**: remove the env var + delete the hook script entirely; document RETIRED in `docs/install-provenance.md` per cardinal-rule-12 HONEST-NON-FINDING gate (sibling-cite-import was made on assumption that CC v2.1.119 SubagentStop schema would match — schema parity HNF reached)
- **(b) Re-enable with fix**: parse current SubagentStop schema (`agent_id` / `agent_type` / `agent_transcript_path` per `Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:309-316`), rewrite classifier to mine from `agent_transcript_path` JSONL instead of expected top-level fields

**Recommendation**: **(a) Formal retire** for now. The path-(b) effort budget (~2-4 hours) exceeds the operational value (subagent dispatch is currently low-volume in this runtime; FM-17.d stall detection would be more useful when wave-fan-out is active). Re-introduce when subagent fan-out becomes routine.

**Cite anchor for retire**: `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.d` (sibling owner of the named-failure-mode); HONEST-NON-FINDING gate per cardinal-rule-12 step (iv).

### #3 — Probe & document the 2 missing Wave 80 backup files (10 min effort, ZERO risk, LOW-MEDIUM stability impact)

**Action**: Run `git -C Z:/claude-sota-installed log --all --oneline tools/eee.ps1 .claude/settings.json | head -30` to confirm Wave 80 commits exist and verify rollback path via `git revert <SHA>` is available. Document the finding in `docs/install-provenance.md`:
- IF rollback commits exist → close as "backup files redundant; git history IS the rollback safety net"
- IF rollback commits absent → escalate (medium severity audit-trail gap)

**Why #3 (lowest of top-3)**: HONEST-NON-FINDING already surfaced this in §1. Confirming the resolution is hygiene, not stability-critical. Defer if the operator deems #1+#2 sufficient closure for Wave 84.

## 7. HONEST-NON-FINDING — items that look promising but DO NOT move the needle

These items pass cardinal-rule-1 cite-availability but fail cost/benefit analysis:

| Item | Reason it doesn't help |
|---|---|
| **CLAUDE.md 30%/50% prune** | LOAD-BEARING ratio is 91%; cite-trail breakage from per-CR collapse exceeds token savings (max ~10% reduction = ~1k tokens; current 9.9k token CLAUDE.md is well within budget) |
| **35 bare-except audit fix-forward in codex_t1_consult_gate.py** | FALSE-POSITIVE finding — actual count is 42 typed catches + 4 explicit `Exception` with `noqa: BLE001` rationale; pattern is correct per Anthropic CC hooks spec (hooks must never raise) |
| **trivy install** | No container-scan workflow active; qdrant+falkordb DEFER per Wave 80; trivy unblocks future, not current |
| **rustup default stable** | No cargo install pending in manifest; future-readiness only |
| **Docker Desktop start** | No container install pending; ~2GB RAM cost without operational benefit |
| **CCBP HEAD bump 64fffd53 → bcaa2cc** | 32 unmerged commits include ZERO `best-practice/` or `development-workflows/` changes (slide-restructure + agent-collections only); cite-content unchanged |
| **system-monitor reactivation** | File doesn't exist; no archive; no consumer wired; cardinal-rule-5 violation if re-introduced without consumer |
| **CR5/6/12 merge per Wave 80 prescribed_edit #10** | Mia pre-apply REFUTES — destroys per-CR-numbered grep trail used by downstream cite-archaeology |

## Summary

Foundation is at the highest stability bar in this arc. The top-3 ranked actions are all **audit-trail closure** rather than new mechanism — a strong signal that Wave 75-83 actually converged. Operator-action queue is **ZERO urgent items**. The user's standing directive ("no zombie terminal", "best approach for next steps") is best served by **finishing the closure of Wave 80-83 verdicts** (top-3 above), then **stopping the build-fire cycle and letting the runtime burn-in** for n=7 build-fires per cardinal-rule-7 Phase 3 trigger predicate (b) "arc-convergence". The most important "next step" may be: do nothing fancy, accept that the foundation is done, and let the n=7 burn-in counter advance naturally.
