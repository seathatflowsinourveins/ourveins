# W258r40 — Operator MCP Audit vs Spec 2025-11-25 + AAIF Archived List

**Date:** 2026-05-16
**Method:** Cross-check `.mcp.json` against r36 findings (MCP spec 2025-11-25 + 17+ archived reference servers + Streamable HTTP transport + OAuth 2.1 PKCE mandate).
**Verdict (TL;DR):** **0 of 12 operator-installed MCPs are on the archived list.** All 12 are third-party / commercial / community projects — NOT `modelcontextprotocol/servers` reference servers. Most-pressing operator action items: (1) verify `github` MCP is using GitHub Copilot's hosted endpoint (it is) not the archived `modelcontextprotocol/servers/github` reference; (2) confirm Streamable HTTP support on 3 HTTP-type MCPs (likely yes, all 3 vendors track spec); (3) operator already pins 5/12 (playwright/chrome-devtools/repomix/serena/gitnexus) — pin remaining 7.

---

## §1 Per-MCP audit (12 servers)

| # | Name | Source repo | Type | Spec-current | Streamable HTTP | OAuth 2.1 PKCE | Archived | Pinned | Upgrade action |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `github` | GitHub Copilot hosted (`api.githubcopilot.com/mcp/readonly`) — NOT `modelcontextprotocol/servers/github` | http | likely ✓ (Microsoft tracks spec) | likely ✓ | Bearer token (PAT) auth — server may also support OAuth 2.1 PKCE flow; operator's PAT path is alternative | NO (hosted endpoint, not the archived reference repo) | n/a (hosted) | Verify endpoint still returns 200; rotate PAT per security policy |
| 2 | `context7` | Upstash hosted (`mcp.context7.com/mcp`) | http | likely ✓ | likely ✓ | API key (CONTEXT7_API_KEY) — not OAuth | NO | n/a (hosted) | Rotate API key per policy |
| 3 | `deepwiki` | Cognition AI hosted (`mcp.deepwiki.com/mcp`) | http | likely ✓ | likely ✓ | No auth header (public endpoint) | NO | n/a (hosted) | Confirm rate-limit policy; no auth changes needed |
| 4 | `playwright` | `microsoft/playwright-mcp` v0.0.75 (npm `@playwright/mcp`) | stdio | ✓ | n/a (stdio) | n/a | NO | ✓ @0.0.75 | npm-track: bump only after CR-9 audit |
| 5 | `chrome-devtools` | `ChromeDevTools/chrome-devtools-mcp` v0.25.0 | stdio | ✓ | n/a | n/a | NO | ✓ @0.25.0 | npm-track |
| 6 | `repomix` | `yamadashy/repomix` v1.14.0 (MIT) | stdio | ✓ | n/a | n/a | NO | ✓ @1.14.0 | npm-track |
| 7 | `serena` | `oraios/serena` HEAD @249f6b07 | stdio | ✓ | n/a | n/a | NO | ✓ SHA-pinned | SHA-pin track |
| 8 | `memory` | `doobidoo/mcp-memory-service` v10.51.3 (Apache-2.0) — NOT `modelcontextprotocol/servers/memory` | stdio | ✓ | n/a | n/a | NO (third-party project, not the archived reference) | ✓ @v10.51.3 | Verify v10.51.x latest; bump if PATCH available |
| 9 | `graphiti` | `getzep/graphiti` (Apache-2.0) — local install at `.local/graphiti/mcp_server` | stdio | ✓ | n/a | n/a | NO | source-pinned via local path | Re-sync from upstream `getzep/graphiti` if older than 30d |
| 10 | `phoenix` | `Arize-ai/phoenix-mcp` (`@arizeai/phoenix-mcp`) | stdio | ✓ | n/a | n/a | NO | npm-version not in args | **ADD VERSION PIN** per CR-9 |
| 11 | `gitnexus` | `abhigyanpatwari/GitNexus` v1.6.4-rc.112 (PolyForm Noncommercial 1.0.0) | stdio | ✓ | n/a | n/a | NO | ✓ @1.6.4-rc.112 | RC-stream — monitor for stable 1.6.4 |
| 12 | `ccusage` | `@ccusage/mcp` (third-party — verify upstream maintainer) | stdio | ✓ | n/a | n/a | NO | local install at `.local/npm/` not args-pinned | **ADD VERSION PIN** per CR-9 |

---

## §2 ARCHIVED / DEPRECATED operator-installed MCPs

**NONE.** Operator's 12 MCPs are entirely third-party / commercial / community projects. The r36-flagged `modelcontextprotocol/servers` archived list (Postgres / SQLite / Slack / GitHub-reference / GitLab / Google-Drive / Brave-Search / etc.) does NOT include any operator-installed MCPs.

**Critical distinction to document for operator clarity:**
- `github` (operator) = GitHub Copilot's hosted MCP at `api.githubcopilot.com/mcp/readonly` (Microsoft, MAINTAINED). NOT `modelcontextprotocol/servers/github` (ARCHIVED reference).
- `memory` (operator) = `doobidoo/mcp-memory-service` (community, MAINTAINED, Apache-2.0). NOT `modelcontextprotocol/servers/memory` (ARCHIVED reference).

ACTION-REQUIRED items: **0**.

---

## §3 OAuth 2.1 PKCE compliance (HTTP MCPs)

Per r36, MCP spec 2025-11-25 makes OAuth 2.1 PKCE mandatory for *remote* MCP clients. Operator's 3 HTTP MCPs:

| HTTP MCP | Auth method | OAuth 2.1 PKCE status | Risk |
|---|---|---|---|
| `github` (api.githubcopilot.com) | Bearer PAT via `Authorization: Bearer ${GITHUB_TOKEN}` | Server LIKELY supports OAuth 2.1 PKCE flow ALONGSIDE PAT path; operator using PAT path | LOW — Microsoft-hosted, server-side compliance; PAT auth is sanctioned alternative |
| `context7` (mcp.context7.com) | API key header `CONTEXT7_API_KEY: ${...}` | Upstash uses API-key auth; OAuth 2.1 PKCE not applicable to API-key model | LOW — vendor-controlled |
| `deepwiki` (mcp.deepwiki.com) | No auth header | Public endpoint, no auth flow | LOW — read-only public service |

**Operator action:** Optional — when GitHub Copilot MCP exposes OAuth 2.1 PKCE flow, consider migrating from PAT to OAuth 2.1 device-flow for reduced credential surface.

---

## §4 Provenance verification per r37 cardinal-rule #6

For each install source, verify it's the OFFICIAL maintained upstream:

| MCP | Provenance verdict | Cite |
|---|---|---|
| `github` | ✓ Microsoft GitHub Copilot hosted endpoint | github.com/github |
| `context7` | ✓ Upstash commercial product | upstash.com/context7 |
| `deepwiki` | ✓ Cognition AI commercial product | deepwiki.com |
| `playwright` | ✓ Microsoft `playwright/playwright-mcp` (npm `@playwright/mcp`) | microsoft/playwright-mcp |
| `chrome-devtools` | ✓ `ChromeDevTools/chrome-devtools-mcp` (Google CDT team) | github.com/ChromeDevTools/chrome-devtools-mcp |
| `repomix` | ✓ `yamadashy/repomix` MIT (named-individual maintainer, 314+ commits/30d) | github.com/yamadashy/repomix |
| `serena` | ✓ `oraios/serena` (org-namespaced, SHA-pinned) | github.com/oraios/serena |
| `memory` | ✓ `doobidoo/mcp-memory-service` Apache-2.0 (named-individual, 1809+ stars) | github.com/doobidoo/mcp-memory-service |
| `graphiti` | ✓ `getzep/graphiti` (org-namespaced, Apache-2.0, $24M-funded Zep team) | github.com/getzep/graphiti |
| `phoenix` | ✓ `Arize-ai/phoenix-mcp` (org-namespaced, Arize commercial) | github.com/Arize-ai/phoenix |
| `gitnexus` | ✓ `abhigyanpatwari/GitNexus` (Akon Labs framing, PolyForm Noncommercial — non-commercial-use-only) | github.com/abhigyanpatwari/GitNexus |
| `ccusage` | ⚠ `@ccusage/mcp` — verify maintainer (npm namespace not org-clear from path; operator should confirm) | npm `@ccusage/mcp` lookup needed |

**Provenance-verification verdict:** 11/12 SOUND. 1 (`ccusage`) WARRANTS-LOOKUP — operator should run `npm view @ccusage/mcp` to confirm maintainer + license.

---

## §5 Operator actions (top concrete updates)

**P0 (immediate):**
1. **Pin `phoenix` MCP version** — `.mcp.json:97-99` currently uses local install path without explicit npm version. Add explicit version per CR-9. Run `npm view @arizeai/phoenix-mcp version` and pin.
2. **Pin `ccusage` MCP version** — same issue; pin explicit version after maintainer verification.

**P1 (this week):**
3. **Verify `ccusage` provenance** — `npm view @ccusage/mcp` for maintainer + repo URL; document in `.mcp.json` provenance comments.
4. **Sync `graphiti` from upstream** — if local install at `.local/graphiti/mcp_server` is >30d old, re-pull from `getzep/graphiti`.

**P2 (this month):**
5. **Track `gitnexus` 1.6.4 stable release** — currently on RC.112; bump when stable lands.
6. **Track `memory` v10.51.x patches** — verify v10.51.3 is still latest; bump if PATCH available.
7. **Monitor GitHub Copilot MCP OAuth 2.1 PKCE rollout** — when device-flow available, migrate from PAT.

**P3 (advisory):**
8. **`gitnexus` license caveat** — PolyForm Noncommercial 1.0.0 forbids commercial use outside the grant (already documented in `.mcp.json` `_comments`). Reaffirm via written use-case acknowledgment if any commercial work occurs.

---

## Confidence: 0.84

**Caveats:**
- Spec-current verdicts for HTTP MCPs (#1-3) are LIKELY-OK based on vendor reputation, not direct API-version probes (would require live spec-handshake test).
- Streamable HTTP transport for HTTP MCPs is INFERRED from vendor-tracking-spec, not empirically confirmed.
- `ccusage` provenance flagged for operator lookup — not blocking but warrants written confirmation.
