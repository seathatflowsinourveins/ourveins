# W321 P1 — .mcp.json Proposed Additions (CR-9 compliant, operator-staged)

> **Status**: PROPOSAL pending operator edit + restart. CR-9 invariant: every entry uses `npx -y <pkg>@<pinned-version>`.
> **Source**: Stream F §4 MCP-wrapping strategy + W320-DEEPER §4 portfolio recommendation + W321 round-2 codex APPROVE on sca-v10/v11/W320-DEEPER.
> **Restart required**: `/reload-plugins` (or fresh session) to pick up new MCP servers.

## §1. Add Firecrawl MCP (Option A — npx-wrap to self-hosted :3002)

Adds Firecrawl as a SaaS-or-self-host MCP client; with `FIRECRAWL_API_URL=http://localhost:3002`, it routes to the self-hosted Docker container per Stream F §4.

```jsonc
// In .mcp.json mcpServers block — INSERT:
"firecrawl": {
  "command": "npx",
  "args": ["-y", "firecrawl-mcp@1.16.4"],
  "env": {
    "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}",
    "FIRECRAWL_API_URL": "${FIRECRAWL_API_URL}"
  }
}
```

**Env block** (in CLAUDE.local.md, gitignored):
```powershell
$env:FIRECRAWL_API_KEY = '<dummy-for-self-host-or-real-saas-key>'
$env:FIRECRAWL_API_URL = 'http://localhost:3002'   # remove this line to route to SaaS firecrawl.dev
```

## §2. Crawl4AI native MCP SSE (no MCP-server entry needed)

Crawl4AI v0.8+ ships native MCP SSE on `:11235/mcp/sse`. **DO NOT add a .mcp.json wrapper** — connect via the MCP SSE client transport directly. Operator-AI: confirm Claude Code's MCP SSE client supports this transport (per MCP spec 2025-06-18); if not, add an stdio-to-SSE bridge npx package.

Reference: `mcp__plugin_<namespace>__*` tool names will appear once SSE wired.

## §3. (Optional) Add Perplexica via WebFetch wrapper

Perplexica :3001 exposes a Q&A endpoint. NO MCP server exists upstream; use WebFetch directly with `http://localhost:3001/api/search` per Perplexica REST API. NO .mcp.json entry needed.

## §4. (Optional) Add SearXNG via WebFetch wrapper

SearXNG :8888 exposes JSON search API at `http://localhost:8888/search?q=<q>&format=json`. NO MCP server upstream; use WebFetch. NO .mcp.json entry needed.

## §5. (Optional) IlyaGusev/academia_mcp (T1 anti-bias winner, 85★)

```jsonc
"academia": {
  "command": "npx",
  "args": ["-y", "academia-mcp@latest"],
  "env": {}
}
```

Verify package name + version per upstream `IlyaGusev/academia_mcp` README before adding. Stage-0 existence-probe required.

## §6. Restart pattern

After .mcp.json edits:
1. Save .mcp.json
2. Run `/reload-plugins` in current session OR start fresh CC session
3. Verify new MCP tools appear via `mcp__<name>__*` tool listing

## §7. Rollback

Single-edit revert of .mcp.json. Affected env-vars in CLAUDE.local.md (gitignored) can stay.

## §8. Pre-add ratification gate

Per W321 P0b APPROVE state, the underlying sca-v10/v11 rubric + W320-DEEPER synthesis + STREAM-E open-source verdict are now codex-ratified. The Firecrawl + Crawl4AI + Perplexica + SearXNG additions descend from those approved decisions.

**P0a R5 decision** (deny-default + sandbox-enable OR preserve bypass) remains operator-pending and is ORTHOGONAL to these .mcp.json edits. Recommend deciding R5 BEFORE applying these MCP-server additions (Control 1 deny-default applies to NEW MCP egress patterns).
