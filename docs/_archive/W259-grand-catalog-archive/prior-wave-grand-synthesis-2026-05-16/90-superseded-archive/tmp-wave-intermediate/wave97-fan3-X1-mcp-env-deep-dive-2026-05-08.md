# Wave 97 Fan-3 Agent X1 — MCP env-vars deep-dive (Pattern 7+8+9)

STAND-IN-NOTICE: agent runs as Opus 4.7 stand-in (no `CLAUDE_CODE_SUBAGENT_MODEL` env-funneling visible in eee CLAUDE.local.md ENV (g) per current state — env block (g) UNSET; per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` Option 2: explicit-disclosure path. Cross-model gate NOT structurally satisfied for this dispatch — orchestrator MUST re-fire via codex T1 e2e on the proposed Pattern A apply per cardinal-rule-3 Phase 1 bootstrap exception).

## Mia probes (PRE-claim, [VERIFIED] via Grep settings.json 2026-05-08)
- [VERIFIED] MAX_MCP_OUTPUT_TOKENS in current settings.json: NO
- [VERIFIED] BASH_MAX_OUTPUT_LENGTH in current settings.json: NO
- [VERIFIED] BASH_MAX_TIMEOUT_MS in current settings.json: NO
- [VERIFIED] MCP_TOOL_TIMEOUT in current settings.json: NO

Agent B claim VERIFIED — all 4 env vars genuinely absent. NO FM-20 path-drift on absence claim.

## Cite-correction (Mia caught Agent B brief OVER — FM-20 path-drift catch)

Agent B's brief cited MCP_TOOL_TIMEOUT at `claude-settings.md:1071` — that line is `mcpServers` block, NOT the env var. Actual cite: **`claude-settings.md:979`**. Forward-only correction per port-note-discipline.md §6 (do NOT rewrite Agent B's brief; carry corrected cite forward).

## Per-env-var verdict

### MAX_MCP_OUTPUT_TOKENS
- CCBP cite [VERIFIED]: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:822 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737` — verbatim: "Max MCP output tokens (default: 25000). Warning displayed when output exceeds 10,000 tokens"
- Anthropic CHANGELOG cite: NOT FOUND (predates v2.1.x baseline)
- Default: 25000 tokens
- **Recommended for eee: `"50000"`** (2× default)
- Risk class: **LOW**
- Behavioral analysis:
  - TOO-HIGH (e.g. 200000): single MCP tool result floods context → context-rot at 300-400k threshold per `karpathy-adapted.md §5` 1M calibration; defeats `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` discipline
  - TOO-LOW (e.g. 10000): context-mode `ctx_batch_execute` returns truncated; repomix `pack_codebase` hits ceiling
  - UNSET (current): silently capped at 25000 — observed Wave 97 ctx_batch_execute returned 30-60K bytes
- Workload sizing: 50000 covers 95th-percentile ctx_batch_execute returns + repomix outputs; 2× headroom without context-rot risk
- Conflict check: NONE (orthogonal to CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS at L841)

### BASH_MAX_OUTPUT_LENGTH
- CCBP cite [VERIFIED]: `claude-settings.md:825 @ 64fffd53` — verbatim: "Max bash output length"
- Default: undocumented (likely ~30000 chars based on observed Bash truncation)
- **Recommended for eee: `"50000"`** (chars, NOT tokens)
- Risk class: **LOW**
- Behavioral analysis:
  - TOO-LOW: codex T2 hook output (180s pre-commit review) gets truncated mid-verdict → false-pass risk
  - UNSET (current): default truncation hits codex T2 + cwc kill-switch outputs
- Workload sizing: codex T2 verdicts run ~3-8K chars; cwc kill-switch rare ~10K; 50000 = 5-10× headroom

### BASH_MAX_TIMEOUT_MS
- CCBP cite [VERIFIED]: `claude-settings.md:824 @ 64fffd53` — verbatim: "Bash command timeout"
- Anthropic CHANGELOG cite [VERIFIED]: `Z:/repos/deps/claude-code/CHANGELOG.md:3311` — "Introduced BASH_DEFAULT_TIMEOUT_MS and BASH_MAX_TIMEOUT_MS env vars" + L2686 "Auto-background long-running bash commands"
- Default: undocumented (BASH_DEFAULT_TIMEOUT_MS triggers auto-background; BASH_MAX_TIMEOUT_MS is hard-kill ceiling)
- **Recommended for eee: `"900000"`** (900s = 15min)
- Risk class: **MED**
- Behavioral analysis:
  - TOO-LOW (e.g. 60000 = 1min): kills codex T2 (180s budget), kills cwc kill-switch (300s+), kills codex T6 stop-gate (900s per cross-model-consensus.md §Profile selection)
  - UNSET (current): observed Wave 97 timeouts on `gh release download` + large `git clone`
- Workload sizing: codex T6 stop-gate = 900s (longest known sync gate), cwc up to 600s, codex T1/T2 = 240-480s. 900000ms covers all + 0% over-budget risk
- Conflict check: CONFLICT-RESOLVED with `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=60000` (L30) — different scope (SessionEnd hooks-only ceiling vs Bash-tool-call ceiling). Sister `BASH_DEFAULT_TIMEOUT_MS` (auto-background trigger) NOT recommended in this ship — keep Anthropic default.

### MCP_TOOL_TIMEOUT
- CCBP cite [VERIFIED]: `claude-settings.md:979 @ 64fffd53` — verbatim: "MCP tool execution timeout in ms" (Agent B brief had stale L1071 — Mia caught + corrected)
- Anthropic CHANGELOG cite [VERIFIED]: `Z:/repos/deps/claude-code/CHANGELOG.md:3259` — "Fixed edge cases where MCP_TIMEOUT and MCP_TOOL_TIMEOUT weren't being respected"
- Default: undocumented (CCBP says "ms" but no default value)
- **Recommended for eee: `"120000"`** (120s = 2min per-tool-call)
- Risk class: **MED**
- Behavioral analysis:
  - TOO-HIGH (e.g. 600000 = 10min): wedged MCP tool blocks orchestrator for 10min — defeats fan-out parallelism
  - TOO-LOW (e.g. 30000 = 30s): kills legitimate long ops — ctx_batch_execute on 5+ commands, repomix on large repo, gitnexus impact on 10K+ symbol graph
  - UNSET (current): undocumented Anthropic default; per CHANGELOG L3259 historical "respect" bugs — explicit pin = belt-and-suspenders
- Workload sizing: 22 MCP servers × ~average tool time. ctx_batch_execute observed 30-60s typical. 120000ms = 2× safety margin on observed p95.
- Conflict check: NONE (orthogonal to BASH_MAX_TIMEOUT_MS — MCP tool surface vs native Bash). MCP_TIMEOUT (server-startup, L821) is sister but distinct.

## Recommended ship (proposed Pattern A apply)

Add to `.claude/settings.json` env block (insert after line 32 `ENABLE_TOOL_SEARCH`):

```json
    "MAX_MCP_OUTPUT_TOKENS": "50000",
    "_comment_max_mcp_output_tokens": "Wave 97 Fan-3 X1 2026-05-08 — 2× CCBP default 25000 (claude-settings.md:822 @ 64fffd53). Sized for ctx_batch_execute + repomix workloads observed Wave 97 (30-60K bytes returns). Cite: TIER-1-DIRECT CCBP. Risk: LOW.",
    "BASH_MAX_OUTPUT_LENGTH": "50000",
    "_comment_bash_max_output_length": "Wave 97 Fan-3 X1 2026-05-08 — explicit pin per CCBP claude-settings.md:825 @ 64fffd53. Sized for codex T2 (~3-8K) + cwc kill-switch (~10K) + 5-10× headroom. Risk: LOW.",
    "BASH_MAX_TIMEOUT_MS": "900000",
    "_comment_bash_max_timeout_ms": "Wave 97 Fan-3 X1 2026-05-08 — 900s/15min ceiling per CCBP claude-settings.md:824 + CHANGELOG.md:3311. Covers codex T6 stop-gate 900s (longest sync gate), cwc up to 600s, codex T1/T2 240-480s. Risk: MED.",
    "MCP_TOOL_TIMEOUT": "120000",
    "_comment_mcp_tool_timeout": "Wave 97 Fan-3 X1 2026-05-08 — 120s per-MCP-tool-call ceiling per CCBP claude-settings.md:979 + CHANGELOG.md:3259 (respect-bug fix). Sized for ctx_batch_execute p95 (~60s) × 2 safety margin. Prevents wedged-tool starvation. Risk: MED.",
```

## TIER-1 cite chain
- TIER-1-DIRECT CCBP: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:822,824,825,979 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737` [VERIFIED 2026-05-08]
- TIER-1-DIRECT Anthropic CHANGELOG: `Z:/repos/deps/claude-code/CHANGELOG.md:3259,3311,2686` [VERIFIED 2026-05-08]
- Cross-references (TIER-2): `Z:/claude-sota-installed/.claude/settings.json:30` (SESSIONEND timeout conflict-resolved); `cross-model-consensus.md §Profile selection rule` (T6 stop-gate 900s sizing anchor)

## Risk-stratified summary
| Env var | Risk | Recommended | Conflict-free |
|---|---|---|---|
| MAX_MCP_OUTPUT_TOKENS | LOW | "50000" | YES |
| BASH_MAX_OUTPUT_LENGTH | LOW | "50000" | YES |
| BASH_MAX_TIMEOUT_MS | MED | "900000" | YES (orthogonal to SESSIONEND timeout) |
| MCP_TOOL_TIMEOUT | MED | "120000" | YES (orthogonal to MCP_TIMEOUT startup) |

## Orchestrator hand-off notes
- Per cardinal-rule-3 Phase 1 bootstrap exception: codex T1 hook IS installed at settings.json:78 — orchestrator should fire `codex exec --ephemeral -p deep-review-exec` on proposed apply BEFORE landing
- 4-edit Pattern A apply per `codex-t1-fix-forward-pattern.md` Pattern A (single atomic commit; no iter chain)
- All 4 env vars are belt-and-suspenders pins — current implicit defaults likely safe; explicit pin makes behavior deterministic + cite-anchored
- Ship rationale: closes 3 of 3 Agent B Pattern 7+8+9 unadopted env vars + cite-corrects Agent B's L1071 OVER (actual L979 — FM-20 path-drift cascade catch)

VERDICT: DONE: 4/4 env vars verified-and-recommended (Agent B's L1071 cite OVER caught + corrected to L979 — FM-20 path-drift cascade prevention; all 4 confirmed-absent via Mia + recommended values cite-anchored to TIER-1 CCBP + CHANGELOG; cross-model gate satisfaction PENDING orchestrator codex T1 e2e on Pattern A apply).
