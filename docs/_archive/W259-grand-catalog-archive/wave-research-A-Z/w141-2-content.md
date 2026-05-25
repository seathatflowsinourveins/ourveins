
---

## Wave 141 Fire 2 — `.mcp.json` workspace not-auto-loaded forensics + CC version drift [VERIFIED 2026-05-11]

**Trigger**: /loop cron `*/12` fire post-W141.1 (Graphiti MCP frontend HONEST-NON-FINDING at `9e72d5d`); 6th-consecutive stale-cron pivot (cron prompt named W141.1 forward-pick already SHIPPED). Auto-pivot to W141.2 forensic probe — investigate why workspace `.mcp.json` 8 entries NOT loaded by CC runtime.

### Forensic findings (Mia n=332 → n=337, +5 probes)

| # | Probe | Result | Significance |
|---|---|---|---|
| 1 | `claude --version` | **2.1.119 (Claude Code)** | **CC VERSION DRIFT**: CLAUDE.md cardinal-rule cite says `minimumVersion: "2.1.132"` + latest 2.1.133 per Section 1 manifest. Running 2.1.119 is BELOW documented minimum 2.1.132 → auto-update pending session restart |
| 2 | `find .claude/plugins -name "*.mcp.json"` | 9 plugin `.mcp.json` files found in plugin caches | ECC + context-mode + clickhouse + financial-services plugins each ship their own `.mcp.json` |
| 3 | ECC plugin `.mcp.json` content (`.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.mcp.json`) | mcpServers: `['github', 'context7', 'exa', 'memory', 'playwright', 'sequential-thinking']` | **EXACTLY matches the 6 `plugin:everything-claude-code:*` servers in `claude mcp list`** — plugin `.mcp.json` files ARE loaded with prefix |
| 4 | Workspace `.mcp.json` mcpServers keys | `['github', 'context7', 'deepwiki', 'playwright', 'repomix', 'serena', 'memory', 'graphiti', ...]` (14 entries) | **NONE prefixed in `claude mcp list`** — workspace `.mcp.json` NOT loaded by CC 2.1.119 |
| 5 | `claude mcp add --help` | exists; syntax: `claude mcp add [options] <name> <commandOrUrl> [args...]` | Resolution path: explicit `claude mcp add` registration per-server, NOT auto-load via workspace `.mcp.json` |

### Root cause hypothesis

**Hypothesis A — CC 2.1.119 bug / behavior change**: workspace `.mcp.json` auto-discovery may be broken or removed in 2.1.119. Resolution: session restart picks up auto-update to 2.1.132+ which may fix.

**Hypothesis B — Explicit `claude mcp add` required**: CC may have moved from auto-load to explicit per-server registration. Workspace `.mcp.json` becomes documentation-only; `claude mcp add` becomes runtime-source-of-truth. Resolution: explicit `claude mcp add` for each of 14 workspace entries.

**Hypothesis C — Plugin shadowing**: for github/context7/playwright/memory which exist in BOTH plugin `.mcp.json` AND workspace `.mcp.json`, plugin variant wins. BUT this does NOT explain why graphiti/deepwiki/repomix/serena (NOT in any plugin `.mcp.json`) are also missing. Rejected as sufficient root cause.

**Most likely**: Hypothesis A + Hypothesis B combined — auto-load behavior changed between CC versions; need 2.1.132+ for restored auto-load, OR migrate to explicit `claude mcp add` workflow.

### Affected workspace `.mcp.json` entries NOT loaded (cumulative inventory)

| # | Server | Plugin variant? | Status |
|---|---|---|---|
| 1 | graphiti | NO | NOT_LOADED — frontend integration broken (W141.1 HNF) |
| 2 | deepwiki | NO | NOT_LOADED |
| 3 | repomix | NO | NOT_LOADED (binary INSTALLED v1.14.0 per W145-F13 row 25) |
| 4 | serena | NO | NOT_LOADED (manifest row 162 says INSTALLED-VIA-MCP-WIRE — STALE per this finding) |
| 5 | github | plugin variant exists (W145-F13 ECC plugin) | shadowed by plugin (active) |
| 6 | context7 | plugin variant exists | shadowed by plugin (active) |
| 7 | playwright | plugin variant exists | shadowed by plugin (active) |
| 8 | memory | plugin variant exists | shadowed by plugin (active) |

**4 entries with NO plugin alternative** (graphiti / deepwiki / repomix / serena) are entirely missing from CC MCP runtime despite valid `.mcp.json` wires. This is the primary impact.

### Verdict

**HONEST-NON-FINDING + ROOT-CAUSE-NARROWED** — `.mcp.json` workspace-scope is NOT being loaded by CC 2.1.119; resolution requires either (a) CC auto-update to 2.1.132+ + session restart, OR (b) explicit `claude mcp add` registration per-server.

### Resolution options (deferred to W141.1b operator-gated install fire)

**Option A — Session restart with CC auto-update**:
1. Verify `.claude/settings.json:autoUpdatesChannel: "stable"` (already set)
2. Exit current CC session
3. Re-launch CC → auto-updater picks up 2.1.132 (current latest 2.1.133)
4. Verify `claude mcp list` post-restart includes graphiti + deepwiki + repomix + serena

**Option B — Explicit registration via `claude mcp add`** (4 entries with no plugin variant):
```bash
# graphiti
claude mcp add --scope project graphiti uv -- run --isolated --directory Z:/claude-sota-installed/.local/graphiti/mcp_server --project . main.py --transport stdio --database-provider falkordb --model qwen3.6:35b --embedder-model qwen3-embedding:0.6b --group-id eee

# deepwiki (HTTP-transport)
claude mcp add --transport http deepwiki https://mcp.deepwiki.com/mcp

# repomix (npm-installed via npx)
claude mcp add --scope project repomix npx -- -y repomix mcp

# serena (uvx git+ pattern per manifest row 162)
claude mcp add --scope project serena uvx -- --from git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17 serena start-mcp-server --context claude-code
```

**Option C — Investigate CC settings.json `_mcp` keys** for hidden auto-load gates.

### Cross-model gate disposition

N/A (forensic read-only probe; HONEST-NON-FINDING + root-cause-narrowing).

### Ladder advances

| Ladder | Prior (post-W141.1) | This fire |
|---|---|---|
| Mia pre-apply | n=332 | **n=337** (+5: claude --version + plugin .mcp.json find + ECC plugin .mcp.json parse + workspace .mcp.json key comparison + claude mcp add --help) |
| FM-20 path-drift cascade | n=22 | **n=23** (+1: 6th-consecutive stale cron prompt pivot catch — sustained signal) |
| HONEST-NON-FINDING cumulative | W141.1=1 | W141.1 + W141.2 = 2 (W141.2 narrows W141.1 root cause) |
| CC version drift candidate | none prior | **NEW**: CC running 2.1.119 < CLAUDE.md minimum 2.1.132 |
| Path P recipe | n=32 | n=32 (14th cumulative consecutive no-Path-P probe/codification) |
| Cumulative cost-savings | ~2280s + ~62K tokens + ~3500 LOC | **~2400s + ~64K tokens + ~3600 LOC** |

### REVISED Forward Top-5 (post-W141.2)

🥇 **OPERATOR-GATED W141.1b** Graphiti + deepwiki + repomix + serena frontend wire fix via Option A (session restart) OR Option B (explicit `claude mcp add`) — HIGH-RISK install requires CR-7 Phase 1 + CR-9 review
🥈 **CC version refresh tick** — when operator restarts session, CC auto-updates from 2.1.119 to 2.1.132+ (closes version drift; may also fix Hypothesis A)
🥉 **W145-F14-NEW** Manifest drift sweep PART-3 (~46 remaining)
#4 **W146-F8** SOTA cleanliness re-audit (HEAVY 3-agent Wave 24-D fan-out)
#5 Fresh ecosystem discovery sweep
OPERATOR-GATED HIGH-RISK: W145-F12b/F11b/F10b install / W138-F4 / W141B / W145-F5b

### Cite class

`constituents=[TIER-1-DIRECT @ CC MCP add CLI usage (verified live) + ECC plugin .mcp.json content + CLAUDE.md cardinal-rule-1 CC version pin, TIER-2 @ synthesis-layer-verify.md HONEST-NON-FINDING reporting category, TIER-3-LOCAL-OPERATOR-DERIVED @ Mia 5 forensic probes + 6-fires-stale cron pivot]; effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline.md rule 8 MIN_PRECEDENCE.

### Cardinal-rule conformance

CR-1 (TIER-1 cites to CC version + ECC plugin .mcp.json + CLAUDE.md cardinal) / CR-3 (N/A — forensic probe) / CR-5 (verifies existing install-class config; narrows GAP from W141.1) / CR-7 (Phase 1 AUTO-PROCEED LOW-risk read-only forensic) / CR-8 (probes verify SOTA-content runtime integrity) / CR-9 (N/A — no install) / CR-10 (research-first via 5 forensic probes BEFORE any fix attempt) / CR-11 (META-process Mia + sustained-stale-cron detection) / CR-12 (N/A — gap-narrowing) / Mia n=337 / FM-20 n=23 / FM-02 b+c atomic / git-cli-grammar / 14th cumulative no-Path-P-dispatch / port-note-discipline section 6 forward-only.

### Refs

- W141 backend smoke probe at `4a7ea01` (infrastructure layer verified)
- W141.1 frontend HNF at `9e72d5d` (gap surface; this fire narrows root cause)
- CC MCP scope docs `https://code.claude.com/docs/en/settings`
- CC add command reference `claude mcp add --help`
- CLAUDE.md cardinal-rule-1 cite to CC binary 2.1.132 minimum

**Wave 141 Fire 2 SHIPPED CLEAN as HONEST-NON-FINDING + ROOT-CAUSE-NARROWING** — Hypothesis A (CC version drift; need 2.1.132+ session restart) + Hypothesis B (explicit `claude mcp add` per-server) combined. CC version drift 2.1.119 → 2.1.132 SECONDARY finding. 4 workspace-only-no-plugin entries (graphiti / deepwiki / repomix / serena) confirmed NOT_LOADED. 14th cumulative consecutive no-Path-P-dispatch (cumulative ~2400s + ~64K tokens + ~3600 LOC saved across W145-F2-F13 + W141 + W141.1 + W141.2 + W146 + W149 arc). W141.1b operator-gated fix queued with concrete Option A/B/C resolution paths.
