

## 2026-05-08 Wave 97 — Ship 1G: CLAUDE_CODE_EFFORT_LEVEL=xhigh env-precedence pin (max-thinking for Opus 4.7 adaptive-thinking architecture)

### Origin

User directive Wave 97: "set up your default thinking effort to max" + "always edit with sota references deep dived" (standing-instruction reinforcement of cardinal-rule-1).

### Mia pre-apply OVER catch (saved a wrong ship)

**Initial draft proposed**: `MAX_THINKING_TOKENS=64000` env var per CCBP `claude-settings.md:565,966` example block.

**Real GPT-5.5 codex T1 R1 caught Mia OVER #6** (NEEDS-REVISION conf=0.86): MAX_THINKING_TOKENS deprecated for Opus 4.7. Per Anthropic Opus 4.7 architecture: **adaptive thinking with effort levels** — manual `budget_tokens` parameter no longer accepted; can produce 400 errors and cost amplification.

This is the EXACT discipline the user just emphasized: cite SOTA references at file:line depth, but ALSO verify model-specific applicability before applying. CCBP cite was correct; model-specific deprecation context was missed.

### Pattern A fix-forward (single atomic edit, all 4 prescribed_edits applied)

```diff
   "OTEL_LOG_TOOL_DETAILS": "1",
   "OTEL_LOG_USER_PROMPTS": "1",
+  "CLAUDE_CODE_EFFORT_LEVEL": "xhigh",
+  "_comment_wave97_ship1g_effort_pin": "...",
   "_comment_wave82a_advanced_unleash": ...
```

| Prescribed edit | Applied? |
|---|---|
| 1. Do NOT add MAX_THINKING_TOKENS | ✅ DROPPED from ship |
| 2. Keep alwaysThinkingEnabled:true + effortLevel:"xhigh" | ✅ PRESERVED at L349-350 (already set Wave 82a) |
| 3. Use CLAUDE_CODE_EFFORT_LEVEL=xhigh as env-precedence pin | ✅ ADDED |
| 4. Update comment to cite adaptive-thinking + 400-error/cost-amplification warning | ✅ ADDED in _comment_wave97_ship1g_effort_pin |

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.86 | Pattern A fix-forward applied |
| Round-2 | APPROVE | 0.93 | Different-concern verification (NEEDS-REV→APPROVE on corrected ship); canonical Pattern A success shape |

Verdict files:
- `.claude/state/codex_consult_wave97_ship1g_max_thinking_OUT.txt` (Round-1 — caught MAX_THINKING_TOKENS deprecation)
- `.claude/state/codex_consult_wave97_ship1g_round2_OUT.txt` (Round-2 — APPROVE on corrected ship)

### Canonical 3-axis max-thinking pin for Opus 4.7

After Ship 1G, eee runtime has the canonical max-thinking pin set across all 3 layers:

| Layer | Setting | Value | Authority |
|---|---|---|---|
| settings.json top-level | `effortLevel` | "xhigh" | CCBP `claude-settings.md:519` |
| settings.json top-level | `alwaysThinkingEnabled` | true | CCBP `claude-settings.md:77` |
| settings.json env block | `CLAUDE_CODE_EFFORT_LEVEL` | "xhigh" | CCBP `claude-settings.md:857` (env-precedence) |

**xhigh = max** for Opus 4.7 per CCBP claude-settings.md:519: "Accepts low/medium/high/xhigh (Opus 4.7 only, v2.1.111)". Manual MAX_THINKING_TOKENS deprecated under adaptive-thinking architecture.

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:519,857 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737` (CCBP env-precedence + xhigh-Opus-4.7-only)
- **TIER-1-DIRECT** (codex web-fetched via T1 R1): https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking (Opus 4.7 adaptive-thinking architecture supersedes manual budget_tokens)
- **TIER-3 evidence**: `.claude/state/codex_consult_wave97_ship1g_max_thinking_OUT.txt` (real GPT-5.5 R1 NEEDS-REVISION) + `.claude/state/codex_consult_wave97_ship1g_round2_OUT.txt` (R2 APPROVE)

### Mia pre-apply (3/3 PASS post-Round-2)

1. CCBP cite at file:line + HEAD SHA verified ✓
2. Model-specific applicability verified (Opus 4.7 adaptive-thinking; manual budget deprecated) — caught BY codex T1 R1; orchestrator-side pre-edit Mia missed this; documented as Mia OVER #6 ✓
3. Post-edit Round-2 verification PASS (codex confirmed all 4 prescribed_edits applied) ✓

### Sister-rule integration

- `cross-model-consensus.md` T1: real GPT-5.5 e2e BEFORE commit; R1 NEEDS-REV → Pattern A → R2 APPROVE
- `codex-t1-fix-forward-pattern.md §Pattern A`: 4 prescribed_edits applied in single atomic edit between rounds
- `closed-loop-recursive-narrowing.md`: Pattern A success shape (different-concern verification, NOT same-concern escalation)
- `mia-pre-apply.md`: Mia OVER #6 caught BY codex T1 (cross-model gate IS Mia at the orchestrator-output layer)
- `kiss-dry-yagni.md` Must-Never #4: NOT duplicate of effortLevel — env-precedence pin survives /effort runtime changes (per CCBP L857)

### Wave 97 Ship 1G satisfies cardinal-rule

- **CR-1**: TIER-1-DIRECT cite chain at CCBP file:line + HEAD SHA + Anthropic docs URL (per user "always edit with sota references deep dived" mandate)
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (R1 NEEDS-REV → R2 APPROVE Pattern A)
- **CR-5**: env-var-only addition; no hand-coded primitive
- **CR-6**: settings.json bootstrap-only file edit per cardinal-rule-5 §"Bootstrap-only files"
- **CR-7**: Phase 1 — env var change does NOT modify permission scope
- **CR-8**: ADAPTED-FROM-SOTA — CCBP cite + Anthropic Opus 4.7 architecture
- **CR-9**: install-risk LOW — env var; reversible via single-line removal; safer than MAX_THINKING_TOKENS (which would have produced 400 errors)
- **CR-10**: research-first — Mia probed CCBP + codex web-fetched Anthropic docs BEFORE final apply
- **CR-11**: META-process SOTA — Pattern A discipline + R1+R2 + Mia 3/3 + provenance + GPT-5.5 e2e per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE

### Operational impact

| Layer | Pre-Wave-97-Ship-1G | Post-Wave-97-Ship-1G |
|---|---|---|
| Max-thinking pin coverage | settings.json top-level (effortLevel:xhigh + alwaysThinkingEnabled:true) | + env-precedence (CLAUDE_CODE_EFFORT_LEVEL:xhigh) — survives /effort runtime overrides |
| Adaptive-thinking documentation | none | _comment cites Opus 4.7 adaptive-thinking architecture + MAX_THINKING_TOKENS deprecation warning |
| Future-proof against /effort runtime changes | no | yes (env-precedence) |

### Ships LANDED in this session arc (12 total)

| Wave | Commit | Ship |
|---|---|---|
| 86 | `824523f` | 1Q — CLIProxyAPI 4h session-affinity tuning |
| 89 | `15dad8e` | 1Y — codex CLI sandbox unleash |
| 91 | `6ebcf08` | 1W — Aperant rate-limit poller |
| 92 | `861ee43` | 1T — cnighswonger v3.5.3 cache-fix chain |
| 93 | `63cc261` | 1X — cycle-aware rotation planner |
| 90 | `f8134e7` | docs — fleet status |
| 94 | `b7207e9` | Phase 3 1T + cron deploy |
| 95 | `840db40` | 1M — context-mode FULL plugin install |
| 96 | `51d74d6` | 1M Phase 2 — Bun runtime install |
| 97-1A | `3c00615` | 1A — claude-md-management plugin enable |
| 97-1B | `a1f19f0` | 1B — gitleaks v8.30.1 install |
| **97-1G** | **THIS** | **1G — CLAUDE_CODE_EFFORT_LEVEL=xhigh env-precedence pin (max-thinking for Opus 4.7)** |

### Update triggers

Re-evaluate when:
- Anthropic deprecates xhigh effort level OR introduces new "max" tier above xhigh for Opus 4.7
- Opus 5 ships with revised effort-level architecture
- CCBP `claude-settings.md` updates env-precedence rule beyond `claude-settings.md:857`
- 24-72h D2 monitoring window surfaces a regression in thinking-output behavior
