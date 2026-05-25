# Layer 2: MCP Servers Deep-Dive

> See `../05-grand-catalog/GRAND_CATALOG_2026-05-15.md` Section 5 (5.A Memory + 5.B Browser + 5.C Code-intel + 5.D Search/Obs + 5.E Security) for full per-repo scoring.

## ADOPT-NOW picks (12)

### Foundation MCPs
1. **modelcontextprotocol/servers** (86k★ — 96) — reference MCP server collection
2. **modelcontextprotocol/python-sdk** (23k★ — 89) — Python SDK for custom MCP authoring
3. **github/github-mcp-server** (30k★ — 94) — GitHub-official MCP
4. **modelcontextprotocol/inspector** (~5k — 88) — dev-time MCP debugging UI

### Memory layer (L1+L2+L3)
5. **doobidoo/mcp-memory-service** (86) — L1+L2 with sqlite_vec; current baseline; Apache-2.0; pip-installable
6. **getzep/graphiti** v0.29.0 (26k★ — 88) — L3 temporal-KG with FalkorDB; current baseline; Apache-2.0
7. **thedotmack/claude-mem** (76k★ — 89) — **MEMORY ECOSYSTEM LEADER** by 7-75x margin; cross-runtime AI-compressed memory; **Wave 2 Probe 4-6 verification required before promotion to mandatory baseline**

### Browser / docs
8. **ChromeDevTools/chrome-devtools-mcp** (40k★ — 89) — Chrome-team official DevTools MCP
9. **microsoft/playwright-mcp** (88) — Microsoft-official browser automation; cited by cwc "Going further"
10. **upstash/context7** (55k★ — 85) — up-to-date framework docs for LLMs

### Code intelligence
11. **oraios/serena** (24k★ — 92) — semantic retrieval + editing; symbol-tree code intel; current install
12. **yamadashy/repomix** (94) — repo pack + ~70% tree-sitter compression + Pack→Grep→Skill pipeline

### Security
13. **semgrep/semgrep MCP** (~11k★ — 90) — SAST; 2000+ community rules; LGPL-2.1 acceptable
14. **promptfoo/promptfoo** (86) — LLM-as-judge eval primitive

## STUDY-PILOT picks (10+)

### Memory alternatives
- **Gentleman-Programming/engram** (3.5k★ — 78) — agent-agnostic Go binary; SQLite+FTS5
- **DeusData/codebase-memory-mcp** (2.4k★ — 80) — 155 languages indexed; sub-ms queries
- **supermemoryai/supermemory-mcp** (1.7k★ — 70) — cloud-dependency caveat
- **ghostwright/phantom** (1.4k★ — 70) — AI co-worker built on Claude Agent SDK
- **shaneholloman/mcp-knowledge-graph** (858 — 72) — local-first KG; Cline-fork
- **Mibayy/token-savior** (852 — 78) — 77% active token cut claim; **needs benchmark verification** (Row-2 concern)
- **alioshr/memory-bank-mcp** (904 — 68) — Cline-derived memory-bank port
- **GreatScottyMac/context-portal** (762 — 70) — ConPort memory + KG + RAG

### Browser/scraping
- **D4Vinci/Scrapling** (50k★ — 84) — adaptive web scraping framework
- **assafelovic/gpt-researcher** (27k★ — 82) — autonomous deep research
- **unclecode/crawl4ai**, **firecrawl/firecrawl**, **jina-ai/reader** — alternative ingestion paths
- **microsoft/markitdown**, **docling-project/docling** — doc conversion

### Code intel
- **safishamsi/graphify** (48k★ — 85) — code→KG via tree-sitter+Leiden
- **ast-grep/ast-grep** (40k+★ — 86) — **install standalone CLI**; phantom MCP package per FM-09
- **tree-sitter/tree-sitter** (84) — substrate library
- **aider-ai/aider** (~30k★ — 80) — repo-map + alt-coding-agent
- **mufeedvh/code2prompt** — code-to-prompt CLI
- **mixedbread-ai/mgrep** — semantic grep
- **Piebald-AI/claude-code-lsps** (443 — 78) — LSP-class code intel via plugin marketplace

### Search/observability
- **langfuse/langfuse** (82) — LLM observability + Langfuse MCP
- **Arize-ai/phoenix** (78) — LLM observability alternative
- **mcp-use/mcp-use** (10k★ — 78) — fullstack MCP framework
- **awslabs/mcp** (9k★ — 80) — AWS MCP servers collection

### Security
- **gitleaks/gitleaks** (86) — secrets scanning
- **aquasecurity/trivy** (84) — container scanning
- **google/osv-scanner** (84) — dep vuln scanning
- **github/codeql-action** (85) — deep code-scan
- **InvariantLabs-ai/mcp-scan** (78) — MCP audit-by-MCP
- **woodruffw/zizmor** (78) — GitHub Actions security

## REJECT-FOR-FIT

- **volcengine/OpenViking** — AGPLv3 STRUCTURAL blocker (Probe 6)
- **getzep/zep** — SUPERSEDED-BY-graphiti (CR-12 DUPLICATE)
- **topoteretes/cognee** — CR-12 DUPLICATE of graphiti L3
- **trufflesecurity/trufflehog** — AGPL-3.0 caution for embedded library use
- **`@anthropic/mcp-ast-grep` npm package** — PHANTOM (FM-09 n=5 ladder); use standalone ast-grep CLI instead

## Key insights

1. **thedotmack/claude-mem at 76k★** is the dark horse — 7-75x star margin over alternatives. Multi-runtime support (Claude+OpenClaw+Codex+Gemini+Hermes+Copilot+OpenCode) is the differentiator. Probe 4-6 verification queued for Wave 2.

2. **Memory stack tiering**: doobidoo L1+L2 (current baseline) + graphiti L3 temporal-KG (current baseline) + thedotmack claude-mem (after Wave 2 verify) for cross-runtime persistent context.

3. **MCP-fleet cap consideration**: each MCP server adds ~30-60 tokens of system-context. Current claude-sota-installed has ~26 MCP servers ≈ 1800 tokens overhead. Pick by need; don't install everything.

4. **Phantom-package risk** (FM-09 n=5): always run `curl https://registry.npmjs.org/<pkg>` before `npm install` to verify package exists.

See Grand Catalog Section 5 (subsections 5.A-5.E) for full per-MCP dimensional scoring.
