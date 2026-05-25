# W258r36 — MCP Post-AAIF Evolution (2026-05-16)

**Verdict:** CONFIRMS-AND-REFINES W258 v3 L0+L0.5 substrate layer (confidence 0.91).

## §1 MCP spec evolution since AAIF transfer

- Current spec: **2025-11-25** (replaces 2025-06-18); 9 major SEP additions
- **MCP Tasks (SEP-1686)** — NEW durable requests with polling/deferred retrieval (beyond tool use)
- **Sampling now supports tool calling** (SEP-1577)
- **OIDC Discovery 1.0** added to authorization (SEP-797)
- **Tool icons metadata** (SEP-973), enum schemas (SEP-1330), URL elicitation (SEP-1036)
- **JSON Schema 2020-12** established as default dialect (SEP-1613)
- Streamable HTTP confirmed as THE long-term transport (HTTP+SSE deprecated March 2025); SSE polling allowed for resumption (SEP-1699)
- Governance formalized (SEP-932/994/1302) + SDK tiering system (SEP-1730)

## §2 OAuth/auth/security

- **OAuth 2.1 PKCE now MANDATORY** for remote MCP (clients MUST implement; MUST use S256 challenge method)
- RFC 9728 alignment for Protected Resource Metadata discovery
- WWW-Authenticate incremental scope consent (SEP-835)
- OAuth Client ID Metadata Documents recommended (SEP-991)
- **No cryptographic server signing yet** — codex audit's L0.5 provenance gap remains spec-unaddressed (confirms r16)

## §3 New MCP servers since r17

Reference set unchanged (7 maintained: Everything/Fetch/Filesystem/Git/Memory/Sequential Thinking/Time). 17+ servers ARCHIVED (Postgres/SQLite/Slack/GitHub/GitLab/Google Drive + 11). **100+ community servers** indexed via official Registry. r17's "use Neon/Neo4j MCPs for DB" still correct.

## §4 MCP Registry maturity

API freeze v0.1 Oct 24 2025; latest v1.7.9 May 12 2026 (34 releases); auth via GitHub OAuth/OIDC + DNS + HTTP namespace verification. **Still preview, not GA.** Smithery.ai-comparable scope; both viable.

## §5 Operator-relevant

- Verify 12 installed MCPs use spec 2025-11-25 + Streamable HTTP (not deprecated HTTP+SSE)
- 3 HTTP MCPs (github/context7/deepwiki) should support OAuth 2.1 PKCE if calling out remote
- **Filesystem MCP officially "reference-only, not production-ready"** — ratifies codex's T2-conditional downgrade
- Consider MCP Tasks (SEP-1686) for long-running agent flows

## §6 Convergence with W258 v3

CONFIRMS L0+L0.5; REFINES with spec-version pin (2025-11-25), Streamable HTTP canonicalization, OAuth 2.1 PKCE mandatory framing, MCP Tasks as new durable-request primitive. AAIF growth: 170+ members in 4 months, MCP 110M+ monthly downloads, **A2A v1.0** released (cite in v3 §10 watchlist).

Sources: [spec changelog 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25/changelog), [MCP main repo](https://github.com/modelcontextprotocol/modelcontextprotocol), [servers reference](https://github.com/modelcontextprotocol/servers), [registry](https://github.com/modelcontextprotocol/registry), [LF AAIF press](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation), [Zylos MCP 2026 review](https://zylos.ai/research/2026-03-08-mcp-remote-evolution-streamable-http-enterprise-adoption).
