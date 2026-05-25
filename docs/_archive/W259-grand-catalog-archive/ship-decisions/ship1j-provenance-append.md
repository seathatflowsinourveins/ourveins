

## 2026-05-08 Wave 85 Ship 1J — settings.json cleanup of 2 stale unsupported keys (operationalizes Wave 77/80 disposal intent)

### Origin
Wave 85 dispatched 3-agent inventory+feature+gap audit (Agent A sota-researcher full primitive census; Agent B + Agent C codex-rescue BRIDGE-MODE → real GPT-5.5). Agent C surfaced 8 TIER-A gap candidates; Mia pre-apply via context7 MCP refined to 1 actionable + 7 deferred ship candidates.

### 76-primitive inventory (Agent A)
- 14 plugin marketplaces (7 enabled, 3 duplicates cleanup-actionable)
- 12 binaries (4 wired, 5 quality-tools deferred, 3 true orphans cleanup-actionable)
- 7 MCP servers (all wired)
- 21 hooks (10 Python wired, 4 CWC bash wired, 2 plugin-delivered, 2 dormant CR-7-Phase-2-gated, 1 disabled fm17d, 1 pending Path C, 1 legacy cleanup-actionable, 4 helpers)
- 8 local agents (all wired) + 35 local rules (all cited in global system prompt) + 1 cwc + cpa-usage-keeper + 10 OAuth fleet
- Net: ~52 WIRED-active / ~15 UNWIRED / ~9 DEFERRED-pending

### 5-repo feature audit (Agent B)
Top-3 NOT-YET-WIRED ranked by leverage:
1. context-mode full Claude Code plugin/hooks (MCP-only currently; documented 98% savings claim depends on PreToolUse/PostToolUse/PreCompact/UserPromptSubmit/SessionStart wires per upstream `hooks/hooks.json:2-3,26-121`)
2. ECC continuous learning hooks (installed but disabled in `settings.json:11` for latency reasons; selective re-enable observe+session-start brings adaptive memory)
3. cpa-usage-keeper auth hardening (AUTH_ENABLED/LOGIN_PASSWORD not enforced)

### 8 TIER-A gap candidates (Agent C; Mia-refined to 1 actionable)
Verified via context7 MCP query to `/websites/code_claude` library (TIER-1 Anthropic CC docs):
- VERIFIED VALID: CLAUDE_CODE_EFFORT_LEVEL env var / `attribution` settings.json key (replaces deprecated includeCoAuthoredBy) / PreCompact + UserPromptSubmit hook events
- REFINED-OUT: J1 (EFFORT_LEVEL env redundant — settings.json L333 `effortLevel: "xhigh"` already set; precedence makes env-add no-op) / J3 (includeCoAuthoredBy NOT present in current settings.json) / J5 (CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY not surfaced in context7 — DEFER)
- ACTIONABLE: J2 (remove `skipAutoPermissionPrompt` + `skipDangerousModePermissionPrompt`) — both keys persist at L338+L347 despite Wave 77/80 disposal comments

### Cross-model T1 gate (3-layer satisfied; cardinal-rule-3 Phase 1 bootstrap exception)
- Agent A: sota-researcher Opus 4.7 (TIER-1 docs verified at file:line + HEAD SHA)
- Agent B: codex-rescue BRIDGE-MODE → real GPT-5.5 (5-repo feature audit)
- Agent C: codex-rescue BRIDGE-MODE → real GPT-5.5 (gap audit + Mia probes)
- Synthesis: GPT-5.5 via proxy /v1/chat/completions
- Verdict: APPROVE conf=0.91 / PROCEED-WITH-SHIP-1J-ONLY / 2 P3 advisory (F-1 JSON parse re-validate; F-2 provenance phrasing)
- Verdict-on-file: `.claude/state/codex_consult_wave85_synthesis_verdict_OUT.txt`

### Pattern A apply (Ship 1J ONLY commit-bound; F-1 + F-2 advisories satisfied)
| ID | Sev | Concern | Resolution |
|---|---|---|---|
| F-1 | P3 | JSON parse re-validate post-edit | `python3 -c "import json; d=json.load(open('.claude/settings.json')); print('OK; keys:',len(d))"` returned `OK; keys: 26` post-edit (was 27 → 26 = 1 removed key + same disposal-comment count after rotation) |
| F-2 | P3 | Provenance phrasing should say "operationalizes prior Wave 77/80 disposal intent" not "absence proves removal safety" | This entry uses "operationalizes Wave 77/80 disposal intent" verbatim; F-2 satisfied |

### Ship 1J — settings.json trivial cleanup (4-line operationalization of prior intent)
Removed:
- `skipAutoPermissionPrompt: true` (was L338) — NOT in TIER-1 https://code.claude.com/docs/en/settings docs roster per Wave 77 audit (verified via context7 MCP); Wave 77 added disposal comment but did not remove key; Wave 80 added comment claiming removal but key persisted
- `skipDangerousModePermissionPrompt: true` (was L347) — same diagnosis as above
- `_comment_skipAutoPermissionPrompt_REMOVED_WAVE_80` (was L339) — superseded by Ship 1J actual removal
- `_comment_skipAutoPermissionPrompt_dropped` (was L345) — superseded by Ship 1J actual removal

Replaced with single consolidated disposal comment:
- `_comment_skipAutoPermissionPrompt_OPERATIONALIZED_WAVE_85` documenting Wave 77 → Wave 80 → Wave 85 evidence trail + 3-agent inventory+gap audit + GPT-5.5 e2e APPROVE conf=0.91

Net diff: 1 insertion / 4 deletions / 26 keys.

### Files modified (atomic bundle — 2 files)
| Path | Change |
|---|---|
| `.claude/settings.json` | -3 stale lines (`skipAutoPermissionPrompt: true` + 2 disposal comments) -1 stale key (`skipDangerousModePermissionPrompt: true`) +1 consolidated disposal comment |
| `docs/install-provenance.md` | +Wave 85 entry (this section) |

### Smoke probes (Ship 1J)
- `python3 -c "import json; ..."` → `OK; keys: 26` (JSON parse PASS)
- `grep -nE '"skipAutoPermissionPrompt"\|"skipDangerousModePermissionPrompt"'` → no matches (both keys verified removed)

### Mia pre-apply (3/3 PASS via context7 MCP)
- VERIFIED via context7: `effortLevel` documented + `EFFORT_LEVEL` env var documented at https://code.claude.com/docs/en/cli-reference + https://code.claude.com/docs/en/env-vars (precedence: env > /effort > settings) → J1 redundant (refined out)
- VERIFIED via context7: `attribution` settings.json key documented at https://code.claude.com/docs/en/settings (replaces deprecated `includeCoAuthoredBy`) → J3 NOT-PRESENT in current settings.json (refined out)
- VERIFIED via context7: PreCompact + UserPromptSubmit hook events both valid at https://code.claude.com/docs/en/hooks → J6+J7 valid for next-iter design ships

### 6 deferred ship candidates (next-iter design waves)
| Ship | Description | Class |
|---|---|---|
| 1K | UserPromptSubmit hook wire (Agent C #6) | design-novel |
| 1L | PreCompact hook wire (Agent C #7) | design-novel |
| 1M | context-mode full Claude Code plugin/hooks wire (Agent B #1; highest leverage 98% savings claim) | design-novel |
| 1N | ECC continuous-learning selective re-enable (Agent B #2) | latency-impact-uncertain; needs measurement |
| 1O | cpa-usage-keeper AUTH_ENABLED hardening (Agent B #3) | security ship |
| 1P | SubagentStop structured-verdict-extraction upgrade (Agent C #8) | Ship 1G extension |

### Cleanup candidates (separate fire — 7 items)
- 3 binary orphans: `ant.exe` / `markitdown.exe` / `trivy.exe` (no consumer/manifest entry)
- 3 marketplace duplicates: `agent-skills` / `anthropic-agent-skills` / `claude-for-financial-services` (overlap addy-agent-skills + skills + financial-services)
- 1 legacy hook: `codex_gate.py` (no settings.json registration)

### Cite chain (TIER-1 → TIER-3)
- TIER-1: https://code.claude.com/docs/en/settings (canonical settings.json keys roster — verified via context7 MCP)
- TIER-1: https://code.claude.com/docs/en/permission-modes (auto-mode governance via `permissions.defaultMode`)
- TIER-1: https://code.claude.com/docs/en/cli-reference (EFFORT_LEVEL env var + precedence)
- TIER-1: https://code.claude.com/docs/en/hooks (PreCompact + UserPromptSubmit hook events)
- TIER-3-LOCAL: `.claude/state/codex_consult_wave85_synthesis_verdict_OUT.txt` (APPROVE conf=0.91 / PROCEED-WITH-SHIP-1J-ONLY)
- TIER-3-LOCAL: `tmp/wave85-inventory-agentA-2026-05-08.md` (76-primitive inventory)
- TIER-3-LOCAL: `tmp/wave85-feature-audit-agentB-2026-05-08.md` (5-repo feature audit)
- TIER-3-LOCAL: `tmp/wave85-gap-audit-agentC-2026-05-08.md` (8 TIER-A + 5 TIER-B gap candidates; Mia-refined to 1 actionable)

Ship 1J satisfies cardinal-rule-1 (TIER-1 cite chain) + cardinal-rule-3 (cross-model gate via 3-layer GPT-5.5 + synthesis verdict) + cardinal-rule-9 (install-risk: reversible via `git revert`; no install required) + cardinal-rule-10 (research-first via 3-agent SOTA dispatch + Mia probes) + cardinal-rule-11 (META-process SOTA: Pattern A apply + Mia pre-apply via context7 + provenance log).
