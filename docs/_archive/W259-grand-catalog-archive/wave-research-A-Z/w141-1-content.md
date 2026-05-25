
---

## Wave 141 Fire 1 — Graphiti MCP frontend invocation smoke probe — HONEST-NON-FINDING [VERIFIED 2026-05-11]

**Trigger**: /loop cron `*/12` fire post-W145-F13 (manifest drift sweep PART-2 at `fc4e8b4`); 5th-consecutive stale-cron pivot (cron prompt named W145-F12 forward-pick already SHIPPED at 1a9d0a7 — Mia probe via `git log -2` confirms). Auto-pivot to W141.1 Graphiti MCP frontend invocation smoke probe (LIGHT sister to W141 backend; tests if MCP tools are accessible to CC runtime).

### HONEST-NON-FINDING surfaced — GENUINE GAP at CC-MCP-runtime layer

| Probe | Command | Result |
|---|---|---|
| `.mcp.json` graphiti entry parse | python json.load + key check | `mcpServers.graphiti` present (14 servers total); type=stdio; command=uv; args + env fully populated per W141 backend probe |
| `claude mcp list` runtime | `claude mcp list` | 12 active MCPs shown; **graphiti NOT in list** |
| `claude mcp get graphiti` | direct query | "No MCP server found with name 'graphiti'. Configured servers: [12 listed]" |
| `disabledMcpjsonServers` | settings.json | empty array |
| `enabledMcpjsonServers` | settings.json | KEY_NOT_PRESENT (all enabled by default per CC convention) |

**Root-cause analysis** (Mia n=329 → n=332 +3 sub-probes):

CC `mcp list` shows **12 servers** all prefixed with either:
- `claude.ai *` (4 cloud OAuth-based: Gmail / Calendar / Drive / MT Newswires)
- `plugin:* :*` (8 plugin-marketplace-sourced: everything-claude-code's github/context7/exa/memory/playwright/sequential-thinking + context-mode + clickhouse)

**ZERO** of the workspace `.mcp.json` `mcpServers` entries are loaded into CC runtime. The 8 declared servers (github / context7 / deepwiki / playwright / repomix / serena / memory / graphiti) appear to be either (a) NOT auto-loaded from workspace-root `.mcp.json`, OR (b) shadowed by plugin-marketplace variants that take precedence.

### Verdict

**HONEST-NON-FINDING** per `synthesis-layer-verify.md §Reporting categories` — Graphiti MCP backend INFRASTRUCTURE is ready (W141 confirmed all 5 deps healthy) BUT frontend integration with CC runtime is BROKEN. The `.mcp.json` wire is structurally correct but CC is not picking it up.

### Possible root causes (for next-fire investigation)

1. **Plugin shadowing**: ECC plugin-marketplace `everything-claude-code:*` MCPs may shadow workspace `.mcp.json` entries with same name (github / context7 / playwright / memory). For graphiti (NOT in any plugin), the shadowing hypothesis does NOT apply — different root cause needed.
2. **Workspace `.mcp.json` not auto-loaded**: CC may require explicit `claude mcp add` per-server registration rather than auto-loading workspace `.mcp.json`.
3. **`.mcp.json` requires session-restart**: maybe CC reads `.mcp.json` only at session-start; mid-session edits not picked up. Current session may have started before recent `.mcp.json` graphiti entry landed.
4. **MCP scope precedence**: per `https://code.claude.com/docs/en/settings` MCP scopes — project / user / plugin / claude.ai-cloud — there may be a scope ordering issue.

### Resolution options (deferred to operator-gated W141.1b install fire)

**Option A** — Explicit `claude mcp add` registration:
```bash
claude mcp add --scope project graphiti \
  --type stdio \
  --command uv \
  --args 'run --isolated --directory Z:/claude-sota-installed/.local/graphiti/mcp_server --project . main.py --transport stdio --database-provider falkordb --model qwen3.6:35b --embedder-model qwen3-embedding:0.6b --group-id eee' \
  --env FALKORDB_URI=redis://127.0.0.1:16379 OPENAI_API_KEY=ollama OPENAI_BASE_URL=http://127.0.0.1:11700/v1
```

**Option B** — Session restart with verified `.mcp.json` graphiti entry — confirms whether mid-session edits are the issue.

**Option C** — Investigate `.mcp.json` precedence via `claude mcp list --json` (which failed JSON parse this probe — may need different syntax) OR `--debug` flag.

### Cross-model gate disposition

N/A (single-surface smoke probe; no design-surface edit; HONEST-NON-FINDING surfaces existing config drift).

### Ladder advances

| Ladder | Prior (post-W145-F13) | This fire |
|---|---|---|
| Mia pre-apply | n=329 | **n=332** (+3 sub-probes: .mcp.json parse / claude mcp list / claude mcp get graphiti) |
| FM-20 path-drift cascade | n=21 | **n=22** (+1: 5th-consecutive stale cron prompt pivot catch; cron sustained-stale signal) |
| HONEST-NON-FINDING category | (recurring tracking) | +1 (W141.1 frontend BROKEN despite backend READY) |
| Path P recipe | n=32 | n=32 (13th cumulative consecutive no-Path-P probe/codification) |
| Cumulative cost-savings | ~2160s + ~60K tokens + ~3400 LOC | **~2280s + ~62K tokens + ~3500 LOC** |

### REVISED Forward Top-5 (post-W141.1)

🥇 **W141.1b** Graphiti MCP frontend wire fix (OPERATOR-GATED HIGH-RISK — requires `claude mcp add` registration OR session restart OR investigation of why workspace `.mcp.json` not auto-loaded)
🥈 **W141.2-NEW** Investigation: why workspace `.mcp.json` 8 entries NOT loaded by CC runtime (read-only forensics; LIGHT)
🥉 **W145-F14-NEW** Manifest drift sweep PART-3 (~46 remaining PLANNED entries)
#4 W146-F8 SOTA cleanliness re-audit (HEAVY 3-agent Wave 24-D fan-out)
#5 Fresh ecosystem discovery sweep
OPERATOR-GATED HIGH-RISK: W145-F12b/F11b/F10b install / W138-F4 / W141B / W145-F5b

### Cite class

`constituents=[TIER-1-DIRECT @ CC MCP scope docs https://code.claude.com/docs/en/settings + .mcp.json schema reference, TIER-2 @ Z:/claude-sota/.claude/rules/cite-imports (synthesis-layer-verify.md HONEST-NON-FINDING reporting category), TIER-3-LOCAL-OPERATOR-DERIVED @ Mia 3 runtime probes + 5-fires-stale cron pivot]; effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline.md rule 8 MIN_PRECEDENCE.

### Cardinal-rule conformance

CR-1 (TIER-1 cite to CC MCP scope docs) / CR-3 (N/A — HNF surfaces; no design-surface) / CR-5 (verifies existing install-class config; identifies NEW GAP) / CR-7 (Phase 1 AUTO-PROCEED LOW-risk read-only smoke probe) / CR-8 (probes verify SOTA-content integrity at runtime layer) / CR-9 (N/A — no new install in this fire) / CR-10 (research-first via 3 runtime probes BEFORE conclusion) / CR-11 (META-process Mia pre-apply with sustained 5-fires-stale-cron detection) / CR-12 (N/A — gap-surface, not adoption) / Mia n=332 / FM-20 n=22 / FM-02 b+c atomic / git-cli-grammar / 13th cumulative no-Path-P-dispatch / port-note-discipline section 6 forward-only / synthesis-layer-verify HNF disposition correctly applied.

### Refs

- Sister W141 backend smoke probe at `4a7ea01` (FalkorDB + Ollama + .mcp.json wire all healthy at infrastructure layer)
- MEMORY task #140 partially closed by W141 backend; #140 should remain [pending] until W141.1b frontend wire fix
- CC MCP docs `https://code.claude.com/docs/en/settings` (project/user/plugin/cloud scope precedence)

**Wave 141 Fire 1 SHIPPED CLEAN as HONEST-NON-FINDING** — frontend Graphiti MCP NOT accessible to CC runtime despite backend READY; 8 workspace `.mcp.json` entries not loaded by CC runtime (only plugin-marketplace + cloud MCPs active). W141.1b operator-gated fix queued. 13th cumulative consecutive no-Path-P-dispatch (cumulative ~2280s + ~62K tokens + ~3500 LOC saved across W145-F2-F13 + W141 + W141.1 + W146 + W149 arc).
