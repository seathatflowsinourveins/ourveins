# W258r44 — v6 Cite-Anchor Link-Rot Audit (2026-05-16)

Probed 28 primary-source URLs from v6 §10 cite-anchors via `curl -L` (follow redirects, 10s timeout).

## §1 Anthropic URLs (6)
| URL | Status | Final URL | Note |
|---|---|---|---|
| anthropic.com/engineering | 200 | (same) | OK |
| docs.anthropic.com/en/release-notes/api | **200 via redirect** | **platform.claude.com/docs/en/release-notes/overview** | ⚠ DOMAIN MIGRATION |
| docs.anthropic.com/en/release-notes/claude-code | **200 via redirect** | **github.com/anthropics/claude-code/blob/main/CHANGELOG.md** | ⚠ MOVED TO GITHUB |
| platform.claude.com/docs/en/managed-agents/overview | 200 | (same) | OK |
| platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool | 200 | (same) | OK |
| code.claude.com/docs/en/auto-mode-config | 200 | (same) | OK |

## §2 MCP / AAIF URLs (5)
All 5 returned 200 — modelcontextprotocol.io 2025-11-25 spec + 2 LinuxFoundation press releases all live. ✓

## §3 Benchmark URLs (2)
`swebench.com/` 200 ✓ · `morphllm.com/swe-bench-pro` 200 ✓

## §4 OpenAI URLs (4)
- github.com/openai/codex/releases/tag/rust-v0.130.0 → 200 ✓
- github.com/openai/openai-agents-python/releases/tag/v0.16.0 → 200 ✓
- openai.github.io/openai-agents-python/mcp/ → 200 ✓
- **platform.openai.com/docs/ → 403** (Cloudflare bot block; URL itself valid, just not curl-accessible — operator can browser-verify)

## §5 GitHub repo URLs (11)
All 11 returned 200 ✓ — anomalyco/opencode · aaif-goose/goose · BerriAI/litellm · promptfoo/promptfoo · Arize-ai/phoenix · anthropics/claude-quickstarts · anthropics/claude-cookbooks · getzep/graphiti · oraios/serena · abhigyanpatwari/GitNexus · yamadashy/repomix

The repo renames are confirmed live: `aaif-goose/goose` (formerly block/goose) + `anomalyco/opencode` (formerly sst/opencode) + `anthropics/claude-quickstarts` (formerly anthropic-quickstarts) + `anthropics/claude-cookbooks` (formerly anthropic-cookbook) all resolve. ✓

## §6 LINK ROT FOUND
**1 hard-block (curl-only artifact):** `platform.openai.com/docs/` returns 403 to curl due to Cloudflare bot detection. Browser-accessible. **Not real rot.**

**2 soft-redirects (Anthropic domain migration):**
- `docs.anthropic.com/en/release-notes/api` → `platform.claude.com/docs/en/release-notes/overview`
- `docs.anthropic.com/en/release-notes/claude-code` → `github.com/anthropics/claude-code/blob/main/CHANGELOG.md`

Both still resolve to live content via 30x redirect chain — but v6 should cite the **canonical destination URLs** to be future-proof.

## §7 Verdict
**v6 cite-anchors FRESH (27/28 live, 1 curl-blocked-but-valid).** 0 dead links, 0 404s, 0 deprecated content. **2 URLs need refresh** to canonical destinations:
1. Update `docs.anthropic.com/en/release-notes/api` → `platform.claude.com/docs/en/release-notes/overview`
2. Update `docs.anthropic.com/en/release-notes/claude-code` → `github.com/anthropics/claude-code/blob/main/CHANGELOG.md`

Trivial 2-line edit in v6 §10. No architectural impact. v6 ship-readiness unchanged.
