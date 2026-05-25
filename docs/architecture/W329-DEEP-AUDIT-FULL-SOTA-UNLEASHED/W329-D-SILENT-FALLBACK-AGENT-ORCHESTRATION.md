# W329-D — Silent Fallback Hunt + Agent Team Orchestration Audit

Generated: 2026-05-19 | Auditor: W329 Stream D | Budget consumed: ~18 tool calls

---

## §0 Executive — Confirmed SEV-1/SEV-2 Findings Table

| Sev | Finding | Empirical Evidence | Location | Fix-LOE |
|-----|---------|-------------------|----------|---------|
| SEV-1 | Parallel-dispatch ratio 0.36% vs 30% target — 99.6% serial fallback | `parallel-ratio-telemetry.mjs` baseline: `{"parallel_ratio":0.0036,"denom":1676}` | Session JSONL telemetry | HIGH (model-behavior; hook is advisory-only) |
| SEV-1 | preagent-parallel-guard exits 0 ALWAYS — never blocks solo dispatch | Source: line 17 "Exits 0 always. ADVISORY ONLY — never blocks" | `tools/preagent-parallel-guard.mjs:4,17` | MEDIUM (redesign to exit 2 on non-compliant dispatch) |
| SEV-2 | VERDICT-LEDGER.md referenced in CLAUDE.md L46 but file does not exist at repo root | `Test-Path Z:\claude-sota-installed\VERDICT-LEDGER.md` → MISSING | `CLAUDE.md:46` | LOW (create file or remove dead pointer) |
| SEV-2 | CLAUDE.local.md L80-81 references FalkorDB :16379 and graphiti MCP as live services | FalkorDB port probe: CLOSED; NSSM service: NOT_FOUND | `CLAUDE.local.md:80-81` | LOW (update service status text) |
| SEV-2 | Port 16006 (Phoenix) OPEN but NSSM service "Phoenix" does NOT exist — Docker Desktop owns the port | `netstat` PID 17040 = `com.docker.backend.exe`; NSSM Phoenix: "service does not exist" | `CLAUDE.md L35`, `CLAUDE.local.md` | LOW (clarify service ownership) |
| SEV-2 | subagent-type-allowlist.json SOFT-FAILS when missing — validator silently exits 0 | Source line 99-104: "Soft-fail: if allowlist file missing…exits 0" | `tools/preagent-subagent-validator.mjs:99-104` | LOW (allowlist exists; confirm refresh cadence) |
| SEV-3 | hindsight plugin INSTALLED in cache but service RETIRED — dead plugin cache entry | `Z:\...\cache\hindsight\hindsight-memory\0.6.5` exists; CLAUDE.md L35 confirms T1 RETIRED | `.claude/plugins/cache/hindsight/` | LOW (prune cache; no functional impact while disabled) |
| SEV-3 | HINDSIGHT_API_* env vars declared in settings.json env list — orphan env declarations for retired service | `settings.json` env list includes HINDSIGHT_API_LLM_PROVIDER, HINDSIGHT_API_LLM_MODEL, etc. | `.claude/settings.json` (env array) | LOW (remove stale env declarations) |

---

## §1 Parallel-Dispatch Silent-Serial Fallback (parallel_ratio=0.0036 SEV-1)

### Confirmed baseline
`parallel-ratio-telemetry.mjs` (5753 bytes, file confirmed present) returns:
```json
{"window":"30d","denom":1676,"parallel_ratio":0.0036,"distribution":{"1":1670,"2":2,"3":4,"4+":0},"target":">=0.3","status":"BELOW"}
```
1670 of 1676 multi-Agent turns are solo dispatches. Only 6 turns used 2+ agents.

### Root cause hypotheses (ranked by evidence weight)

**H1 (PRIMARY): The parallel-guard hook is advisory-only and NEVER blocks — it cannot enforce parallel dispatch.**
Evidence: `preagent-parallel-guard.mjs:4` — "ADVISORY ONLY — never blocks"; `preagent-parallel-guard.mjs:17` — "Exits 0 always". The hook emits a `hookSpecificOutput.additionalContext` warning string that appears in the CC UI as context, but CC can (and does) proceed with the solo Agent call without correction. An advisory that fires once per Agent block in a turn cannot prevent the turn from already being serial.

**H2 (CONTRIBUTING): The parallel-dispatch-mandate skill auto-fires via description match, but skill invocation does not insert a blocking pre-flight check — it fires AFTER the model decides dispatch strategy.**
Evidence: skill description contains the right trigger keywords ("audit", "review", "research", "fan-out", "Stream A/B/C"). However, skill-load via description match is a model-side behavior that suggests behavior; it does not rewrite the turn before Agent dispatch occurs. The model must elect to follow the skill's MANDATORY block before the Agent tool calls are emitted.

**H3 (CONTRIBUTING): The model (Sonnet 4.6) executes multi-stream tasks sequentially by default unless the system prompt or skill explicitly mandates parallel dispatch with structural enforcement.**
Evidence: The CLAUDE.md L19 mandate + `parallel-dispatch-mandate` skill exist as behavioral hints, but the hook infrastructure has no mechanism to intercept a plan that omits parallel dispatch — it can only advise after the first Agent call fires.

**H4 (MINOR): The MULTI_STREAM_RE regex in preagent-parallel-guard.mjs may not fire on all multi-stream prompts.**
Evidence: The regex requires `\b` word boundaries around stream keywords. Prompts that trigger via structural enumeration without the exact keyword set escape detection. This contributes false-negative advisory misses.

### Fix recommendation

| Priority | Fix | Mechanism |
|----------|-----|-----------|
| P0 | Upgrade preagent-parallel-guard to exit 2 (blocking) after second solo-Agent violation in same session, not first (to avoid false-positive blocking on genuinely solo tasks) | Modify `preagent-parallel-guard.mjs` to track violation count in a session-scoped temp file; block on N≥2 consecutive solo dispatches in multi-stream context |
| P1 | Add explicit `PreToolUse[Agent]` count check: if same assistant turn has already fired 1 Agent block AND multi-stream signal is high AND this is the 2nd Agent call in the same turn, allow; if this is the ONLY Agent call in the turn, upgrade from advisory to warning-with-countdown | Hook logic change in `preagent-parallel-guard.mjs` |
| P2 | Extend MULTI_STREAM_RE to include structural heuristics (numbered list with 2+ items, "1." + "2." pattern in prompt) | Regex expansion |

---

## §2 Agent-Team Orchestration Silent-Failure Modes

| Mode | Status | Evidence | Fix |
|------|--------|---------|-----|
| Empty `final_message` guard | DOCUMENTED but ADVISORY ONLY | `parallel-dispatch-mandate` skill SKILL.md section "Empty / whitespace-only final_message" defines retry protocol; no hook enforces it | Implement PostToolUse[Agent] hook that checks `final_message` and fails with exit 2 on empty |
| subagent_type typo blocking | FUNCTIONAL — allowlist EXISTS (307 entries, generated 2026-05-19) | `subagent-type-allowlist.json` confirmed present; validator exits 2 on unknown type; soft-fail to exit 0 if file missing | Confirm refresh cadence; add CI step to regenerate allowlist on plugin updates |
| repomix-pack inline in fork prompts | UNVERIFIED (no session JSONL sample available) | W325 F4 documented anti-pattern; no live detection hook exists | Add PostToolUse[Agent] hook scanning prompt for `pack_codebase` call in fork payload |
| Stream-error mid-flight checkpointing | ABSENT — no checkpoint mechanism | Settings.json has no Stop/Error hook for partial Agent fan-out recovery | Add PreCompact + Stop hooks to persist partial Agent results to tmp/ |
| CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS | SET to "1" | `settings.json` env: CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 confirmed | No fix needed |
| CLAUDE_CODE_FORK_SUBAGENT | SET to "1" | `settings.json` env: CLAUDE_CODE_FORK_SUBAGENT=1 confirmed | No fix needed |

---

## §3 Stale References (file:line)

| Ref | Location | Status | Evidence | Fix |
|-----|---------|--------|---------|-----|
| `VERDICT-LEDGER.md` | `CLAUDE.md:46` | MISSING — file does not exist at `Z:\claude-sota-installed\VERDICT-LEDGER.md` | PowerShell `Test-Path` → false | Create the file with append-only header row, OR remove the pointer from CLAUDE.md |
| FalkorDB `:16379` service running | `CLAUDE.local.md:80` | STALE — FalkorDB NSSM service "Can't open service"; TCP port probe CLOSED | NSSM `nssm status FalkorDB` → error; port probe → CLOSED | Update L80 to reflect FalkorDB STOPPED/RETIRED |
| `graphiti` MCP in services list | `CLAUDE.local.md:81` | STALE — `.mcp.json` has NO graphiti server stanza (W313 Stream A excised it); CLAUDE.local.md still lists "graphiti" in the MCP description | `.mcp.json` 14 declared servers: deepwiki, chrome-devtools, repomix, serena, gitnexus, ccusage, cognee, langfuse, basic-memory, hf-mcp-server, perplexity, playwright, tavily, exa — no graphiti | Remove "graphiti" from CLAUDE.local.md L81 MCP list |
| Phoenix `:16006` as NSSM service | `CLAUDE.md:35` (T4 graphiti entry), CLAUDE.local.md | MISLEADING — port :16006 is OPEN but owned by Docker Desktop (`com.docker.backend.exe` PID 17040), NOT a Phoenix NSSM service | `nssm status Phoenix` → "service does not exist"; `netstat` PID 17040 = com.docker.backend.exe | Clarify: Phoenix is NOT an NSSM service; port collision with Docker Desktop; remove assertion "Phoenix :16006 NOW RUNNING" |
| HINDSIGHT_API_LLM_* env vars | `.claude/settings.json` env array | ORPHAN — T1 hindsight RETIRED (CLAUDE.md L35 "T1 hindsight RETIRED"), but HINDSIGHT_API_LLM_PROVIDER, HINDSIGHT_API_LLM_MODEL, HINDSIGHT_API_LLM_BASE_URL, HINDSIGHT_API_LLM_API_KEY, HINDSIGHT_API_WORKER_MAX_SLOTS, HINDSIGHT_API_WORKER_CONSOLIDATION_MAX_SLOTS remain in env list | `settings.json` env array includes 6 HINDSIGHT_API_* entries | Remove 6 HINDSIGHT_API_* entries from settings.json env array |
| W272 worktree SHA refs in CLAUDE.md | `CLAUDE.md:14` | MINOR — `-W272`, `-W273`, `-state/wt/w280` worktree paths cited as examples; these worktrees may or may not exist | Informational; no functional impact | Optional: verify or remove specific path references |

---

## §4 Terminal / CLI Tool Health

| Tool | Status | Version | Issue |
|------|--------|---------|-------|
| git | OK | 2.51.0.windows.2 | None |
| node | OK | v22.22.0 | None |
| npm | OK | 11.9.0 | None |
| npx | OK | 11.9.0 | None |
| python | OK | 3.14.3 | None |
| uvx | OK | 0.10.3 | None |
| gitleaks | OK | 8.30.1 | None |
| ruff | OK | 0.15.13 | None |
| shellcheck | OK | (installed, version not captured) | None |
| docker | OK | 29.4.3 | None |
| aws | MISSING | N/A | aws CLI not installed; no declared dependency |
| gh | OK | 2.92.0 | None |

No terminal errors. All declared tools operational.

---

## §5 MCP Servers Live-vs-Declared (14 declared)

| Server | Transport | Declared | Port/Endpoint Live | Issue |
|--------|-----------|---------|-------------------|-------|
| deepwiki | http | YES | https://mcp.deepwiki.com/mcp (external) | None — external URL |
| chrome-devtools | stdio | YES | npx spawn | None |
| repomix | stdio | YES | npx spawn | None |
| serena | stdio | YES | uvx spawn | None |
| gitnexus | stdio | YES | npx/global spawn | None |
| ccusage | stdio | YES | npx spawn | None |
| cognee | http | YES | :8000 OPEN | None — CogneeMCP NSSM SERVICE_RUNNING |
| langfuse | stdio | YES | :3000 OPEN | Langfuse self-hosted confirmed running |
| basic-memory | stdio | YES | uvx spawn | None |
| hf-mcp-server | http | YES | https://huggingface.co/mcp (external) | None |
| perplexity | stdio | YES | npx spawn | PERPLEXITY_API_KEY must be set in env |
| playwright | stdio | YES | npx spawn | None |
| tavily | stdio | YES | npx spawn | TAVILY_API_KEY must be set in env |
| exa | stdio | YES | npx spawn | EXA_API_KEY must be set in env |

All 14 declared servers have valid config. No graphiti entry exists (correctly removed W313).
Services confirmed live via port probe: cognee :8000 OPEN, langfuse :3000 OPEN, llama-swap :8090 OPEN, ollama :16700 OPEN.
FalkorDB :16379 CLOSED (service not installed — correct per graphiti retirement).
Port :16006 OPEN but owned by Docker Desktop — NOT a Phoenix NSSM service (stale reference).

---

## §6 Plugin SHA Drift (key entries from installed_plugins.json)

| Plugin | Version | gitCommitSha | lastUpdated | Drift Risk |
|--------|---------|-------------|-------------|-----------|
| codex@openai-codex | 1.0.4 | 807e03ac9d5aa23bc395fdec8c3767500a86b3cf | 2026-05-18 | LOW — recent |
| everything-claude-code@everything-claude-code | 2.0.0-rc.1 | 8148340ad14eb32c971346f0cb4cb9431ec0f5de | 2026-05-19 | LOW — today |
| pyright-lsp@claude-plugins-official | 1.0.0 | f8059ee4ecee414f542f731e13fad3716a4ef324 | 2026-05-18 | MEDIUM — version "1.0.0" static string; SHA is the discriminant |
| agent-sdk-dev@claude-plugins-official | 2c48b1e6d991 | 2c48b1e6d991010bb5b6dba6d3f6385f67febd26 | 2026-05-19 | LOW — SHA-versioned |
| ralph-loop@claude-plugins-official | 1.0.0 | f8059ee4ecee414f542f731e13fad3716a4ef324 | 2026-05-18 | MEDIUM — same SHA as pyright-lsp (shared HEAD at install time) |
| frontend-design@claude-plugins-official | 2c48b1e6d991 | 2c48b1e6d991010bb5b6dba6d3f6385f67febd26 | 2026-05-19 | LOW — SHA-versioned |
| context-mode@context-mode | 1.0.141 | 6bbcb4430bbfaf106d8dd778ebc34b17c66e8f24 | 2026-05-19 | LOW — semver+SHA |
| claude-md-management@claude-plugins-official | 1.0.0 | f8059ee4ecee414f542f731e13fad3716a4ef324 | 2026-05-18 | MEDIUM — static "1.0.0" |
| hindsight-memory@hindsight | 0.6.5 | 9784f6573a5bcba6ac6fd9dfb70929e5318857ce | 2026-05-18 | RETIRED — plugin installed but service retired; cache should be pruned |
| review-agent-governance@claude-code-workflows | 0.1.0 | 34632bcbea28176ba25bbbc43cd4017d88b1cac6 | 2026-05-18 | LOW |

W270 known pattern: plugins with static semantic version strings (1.0.0) cannot be SHA-drift-detected by `/plugin update` — only cache-delete + fresh-install reveals upstream drift. The `hindsight-memory` plugin cached at 0.6.5 represents dead weight (service RETIRED; no functional impact but consumes disk).

---

## §7 Orchestration vs SOTA Compare

### vs anthropics/claude-cookbooks `patterns/agents/orchestrator_workers.ipynb`
The canonical cookbooks pattern (cell-2) mandates an explicit empty-response guard: after each worker call, check `result.content` is non-empty before proceeding. The `parallel-dispatch-mandate` skill documents the equivalent discipline for `final_message`, but it is implemented as a behavioral hint in a skill markdown file — not as an enforced PostToolUse[Agent] hook. The gap: a model that skips the skill's retry protocol on empty `final_message` has no harness-level backstop.

### vs wshobson/agents (agent-teams plugin)
The agent-teams plugin is installed and `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set. The TeamCreate/Agent teammate pattern is available. The gap: the `preagent-parallel-guard` advisory does not distinguish between "solo because genuinely single-target" and "solo because model failed to parallelize" — it fires on both equally, diluting signal.

### vs mattpocock/skills (skill patterns)
The `parallel-dispatch-mandate` skill follows the correct SKILL.md pattern with a strong `description:` trigger list. The fundamental gap is that skill descriptions are matched at model-inference time — if the model chooses not to invoke the skill (or the description match threshold is not met), no harness hook enforces it. The skill is a strong hint, not a hard constraint.

---

## §8 P0/P1/P2 Fix List (ordered)

| Priority | Fix | File | Effort |
|----------|-----|------|--------|
| P0-A | Upgrade `preagent-parallel-guard.mjs` from ADVISORY-ONLY to BLOCKING on confirmed solo-dispatch in multi-stream context (exit 2 after second violation in session) | `tools/preagent-parallel-guard.mjs` | MEDIUM |
| P0-B | Create `VERDICT-LEDGER.md` at repo root with header row, or remove the dead pointer from `CLAUDE.md:46` | `VERDICT-LEDGER.md` or `CLAUDE.md` | LOW |
| P1-A | Remove 6 HINDSIGHT_API_* orphan env vars from `settings.json` env array | `.claude/settings.json` | LOW |
| P1-B | Update `CLAUDE.local.md:80-81` to reflect FalkorDB STOPPED + graphiti MCP removed | `CLAUDE.local.md` | LOW |
| P1-C | Clarify port :16006 in CLAUDE.md/CLAUDE.local.md — Docker Desktop owns this port, NOT a Phoenix NSSM service | `CLAUDE.md:35`, `CLAUDE.local.md` | LOW |
| P1-D | Prune `hindsight-memory@hindsight` from plugin cache (`/plugin uninstall hindsight-memory@hindsight`) | Plugin cache | LOW |
| P2-A | Add PostToolUse[Agent] hook: check `tool_result.content` for empty/whitespace `final_message`; emit warning + log to `tmp/agent-empty-response.log` | `.claude/settings.json` hooks | MEDIUM |
| P2-B | Implement allowlist refresh in CI or on every `SessionStart` hook if plugins updated | `tools/preagent-subagent-validator.mjs` + SessionStart hook | MEDIUM |
| P2-C | Add MULTI_STREAM_RE pattern to detect structural enumeration (numbered lists, Stream N notation) | `tools/preagent-parallel-guard.mjs` | LOW |

---

## §9 3-Org-Distinct Cite Trail

1. **Anthropic** — `https://docs.anthropic.com/en/docs/claude-code/hooks` (exit 2 semantics for blocking hooks; `hookSpecificOutput.additionalContext` advisory semantics; PreToolUse/PostToolUse event schema); `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (subagent_type schema, fork-subagent inheritance); `https://code.claude.com/docs/en/headless` (Agent tool fan-out, parallel dispatch).

2. **wshobson (agent-teams)** — `https://github.com/wshobson/agents` (TeamCreate + Agent teammate patterns; agent-teams plugin lineage; `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` wiring). The comprehensive-review + context-management + agent-teams plugins from this org are installed in this runtime.

3. **anthropics/claude-cookbooks** — `https://github.com/anthropics/claude-cookbooks` @ `39a350b6790c132337dcc3ec35240728fcc1dc0e` `patterns/agents/orchestrator_workers.ipynb` cell-2 (canonical empty-response guard pattern; `<use_parallel_tool_calls>` MUST-block mandate); `patterns/agents/prompts/research_lead_agent.md:135-137` (parallel Agent call structural enforcement — 2+ calls in 1 assistant message).

---

STATUS: COMPLETE
