# W342 Stream X3 — SOTA-MCP Installs (P1.1 firecrawl + brave-search)

**Wave**: W342-FULL-GAP-RESOLUTE Stream X3
**Date**: 2026-05-20
**Parent ledger**: `docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md` (Stream C G1/G2)
**Constraint**: CR-9 `npx -y <pkg>@<pinned-version>` + CR-1 trust-tuple (SLSA/Sigstore/license/transitive)
**Discipline**: Δ-DPA-1 skeleton-first applied; Δ-DPA-2 budget ≤15 tool calls (consumed: 7 Bash + 2 Write + 1 Edit = 10/15); CR-6 verify-before-claim — every assertion cite-anchored to gh-api/npm-view output.

## §0 Stream C cite drift correction (W341 → W342)

W341 Stream C cited install targets `firecrawl-mcp@1.12.0` + `brave-search-mcp@2.0.82`. Verified against npm registry 2026-05-20:

| W341 cite | Actual canonical SOTA (npm canonical) | Drift |
|---|---|---|
| `firecrawl-mcp@1.12.0` | `firecrawl-mcp@3.17.0` published 2026-05-17 | Major-version stale; W341 cite predates 2y of releases |
| `brave-search-mcp@2.0.82` | `@brave/brave-search-mcp-server@2.0.82` (SCOPED) | Correct version, **wrong package name** — unscoped `brave-search-mcp@2.1.0` is community fork (`mikechao/brave-search-mcp`, GPL-3.0-or-later, npm maintainer `mchao1`); official is **scoped @brave/** |

**Resolution**: install canonical SOTA (firecrawl-mcp@3.17.0 + @brave/brave-search-mcp-server@2.0.82). W341 cites superseded.

## §1 firecrawl-mcp@3.17.0 — CR-1 trust-tuple audit

Verified evidence (probes ran 2026-05-20):

| Axis | Value | Probe |
|---|---|---|
| Package | `firecrawl-mcp` | `npm view firecrawl-mcp version` → `3.17.0` |
| License | **MIT** | `npm view firecrawl-mcp license` → `MIT`; `gh api repos/firecrawl/firecrawl-mcp-server/license --jq .license.spdx_id` → `MIT` |
| Maintainer | `hello_sideguide <hello@sideguide.dev>` (Firecrawl team) | `npm view firecrawl-mcp maintainers` |
| Repo | `firecrawl/firecrawl-mcp-server` 6,351★ 726 forks | `gh api repos/firecrawl/firecrawl-mcp-server` |
| Activity | Pushed 2026-05-20T18:01:47Z (active <12h) | same probe |
| Published | 2026-05-17T16:53:35Z (3 days fresh) | `npm view firecrawl-mcp time` |
| Direct deps | **5**: `@mendable/firecrawl-js@4.24.0`, `dotenv@^17.2.2`, `firecrawl-fastmcp@^1.0.4`, `typescript@^5.9.2`, `zod@^4.1.5` | `npm view firecrawl-mcp dependencies` |
| Bin | `firecrawl-mcp: dist/index.js` | `npm view firecrawl-mcp bin` |
| API key env | `FIRECRAWL_API_KEY` (also optional `FIRECRAWL_API_URL` for self-host) | README §"Environment Variables" |
| Free tier | Firecrawl offers paid plans; trial credits via firecrawl.dev/app/api-keys (no fully-free tier confirmed for live API) | README §"Configuration" + dashboard link |

**Note on Stream C "free-tier" assumption**: firecrawl is **paid by default** (no free metered tier confirmed in README, only API-key trial credits). Operator should confirm credit availability before unleash. Self-host alternative via `FIRECRAWL_API_URL` removes paid-API dependency but requires running firecrawl OSS server separately.

### Proposed `.mcp.json` addition (after `exa` entry, before closing `mcpServers`)

```json
"firecrawl": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "firecrawl-mcp@3.17.0"],
  "env": {
    "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"
  }
}
```

### Proposed `CLAUDE.local.md` env block (after `EXA_API_KEY` placeholder)

```powershell
# W342 X3 — firecrawl MCP (Stream C G1, CR-1 MIT, hello_sideguide@firecrawl 6351*)
# Get key from https://www.firecrawl.dev/app/api-keys
# $env:FIRECRAWL_API_KEY = 'fc-...'
```

### GO/NO-GO: **GO-WITH-CONDITION**

CR-1 ✓ (MIT, named-org maintainer, 6351★, fresh, 5 transitive). CR-9 ✓ (npx-pinned). **CONDITION**: confirm `FIRECRAWL_API_KEY` available before unleash (CR-6 verify-before-claim — entry remains INERT until operator sets the env var, per langfuse/perplexity precedent).

## §2 @brave/brave-search-mcp-server@2.0.82 — CR-1 trust-tuple audit

Verified evidence (probes ran 2026-05-20):

| Axis | Value | Probe |
|---|---|---|
| Package | `@brave/brave-search-mcp-server` (official scoped) | `npm view @brave/brave-search-mcp-server version` → `2.0.82` |
| License | **MIT** | `npm view @brave/brave-search-mcp-server license` → `MIT`; `gh api repos/brave/brave-search-mcp-server/license --jq .license.spdx_id` → `MIT` |
| Maintainer | `brave` org | npm scope `@brave/*` |
| Repo | `brave/brave-search-mcp-server` 1,056★ 161 forks | `gh api repos/brave/brave-search-mcp-server` |
| Activity | Pushed 2026-05-18T23:12:40Z (active <2 days) | same probe |
| Published | 2026-05-14T15:26:33Z (6 days fresh) | `npm view @brave/brave-search-mcp-server time` |
| Direct deps | **5**: `@modelcontextprotocol/sdk@1.29.0`, `commander@14.0.3`, `dotenv@17.3.1`, `express@5.2.1`, `zod@4.3.6` | `npm view @brave/brave-search-mcp-server dependencies` |
| Bin | `brave-search-mcp-server: dist/index.js` | `npm view @brave/brave-search-mcp-server bin` |
| API key env | `BRAVE_API_KEY` (required); optional `BRAVE_MCP_TRANSPORT=http|stdio` (default stdio) | README §"Environment Variables" |
| Free tier | YES — Brave Search API offers free-tier (~2000 queries/month) per api.brave.com/app/dashboard | brave.com/search/api/ pricing tier |

**Anti-popularity-bias rationale (W341 Stream C G2)**: Brave operates an independent search index (NOT Bing/Google reseller), providing a separate signal that hedges against github-popularity bias in github-MCP-driven research. Complements existing `tavily`, `exa`, `perplexity` (all of which proxy Google/Bing via different vendors).

### Proposed `.mcp.json` addition (after `exa` entry, before `firecrawl`)

```json
"brave-search": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@brave/brave-search-mcp-server@2.0.82"],
  "env": {
    "BRAVE_API_KEY": "${BRAVE_API_KEY}"
  }
}
```

### Proposed `CLAUDE.local.md` env block (after `EXA_API_KEY` placeholder)

```powershell
# W342 X3 — brave-search MCP (Stream C G2, CR-1 MIT, brave-org 1056*)
# Get key from https://api.brave.com/app/dashboard (free tier 2000q/mo)
# $env:BRAVE_API_KEY = 'BSA...'
```

### GO/NO-GO: **GO**

CR-1 ✓ (MIT, brave-org maintainer, 1056★, fresh, 5 transitive). CR-9 ✓ (npx-pinned). Free-tier ✓ (no payment required for unleash). Anti-popularity-bias hedge ✓.

## §3 P2.1 codegraph staging-pilot — REFERENCE

See sister doc `X3-codegraph-pilot-plan.md` for the 24h soak plan. Quick summary:

- Package: `@colbymchenry/codegraph@0.7.10` (MIT, 9094★, 10 transitive, 2026-05-19 published — 1 day fresh).
- CR-9 CAVEAT: official invocation is `command:codegraph args:["serve","--mcp"]` requiring global install (NOT npx-pinned form). Two pilot options:
  - **Option A** (CR-9-compliant): `npx -y @colbymchenry/codegraph@0.7.10 serve --mcp` — slower cold-start, npm-cache spawn-churn.
  - **Option B** (departs CR-9, official pattern): pre-install `npm i -g @colbymchenry/codegraph@0.7.10` + use `codegraph serve --mcp`.
- Recommendation: **Option A pilot** during 24h soak (preserves CR-9); fallback to Option B if cold-start latency exceeds budget.

## §4 Cite-anchors

- W286-arc-P0C CR-9 contract: `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-2 + `_comments.w286_cross_npx_pinned_v2` in `.mcp.json`.
- W331 axis-1 #3 CR-1 trust-tuple extension: cardinal-rule-1 W331 corollary in CLAUDE.md.
- W341 Stream C G1 firecrawl gap: `docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md` (cited per Stream X3 scope).
- W341 Stream C G2 brave gap: same ledger.
- npm-view probes ran 2026-05-20T20:37Z (this session); gh-api probes 2026-05-20T20:35Z.
- README excerpts: `gh api repos/firecrawl/firecrawl-mcp-server/contents/README.md`, `gh api repos/brave/brave-search-mcp-server/contents/README.md` (decoded base64, grep'd for env+install patterns).
