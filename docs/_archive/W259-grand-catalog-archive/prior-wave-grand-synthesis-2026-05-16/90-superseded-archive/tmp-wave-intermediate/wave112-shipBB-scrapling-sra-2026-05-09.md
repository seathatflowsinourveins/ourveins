# Wave 112 Ship 2BB — D4Vinci/Scrapling SRA D1-D10 verdict (REJECT)

**Date**: 2026-05-09
**Agent**: wave112-shipBB-scrapling-sra (sota-researcher Sonnet, NARROW-scope per FM-17.e mitigation)
**Duration**: 174s / 11 tool calls / 372546 tokens
**FM-17.e mitigation status**: ✅ HONORED — substituted curl-API for large-output tool calls; no Read of large files; no unbounded searches

## Executive summary

**REJECT** — D4Vinci/Scrapling is a high-quality web-scraping framework (BSD-3-Clause, 47.9k★, active 2026-05-06, named-author Karim Shoair) but **DUPLICATES existing eee web-fetch surfaces** for the autonomous /loop runtime use-class. Anti-bot bypass + stealth scraping is OUT-OF-SCOPE for current eee research/code workflows; per kiss-dry-yagni Must-Never #4 + cardinal-rule-12 upstream-install-priority gate, NO operational driver exists.

## SRA D1-D10 scoring

| Dim | Score | Evidence | Cite |
|---|---|---|---|
| D1 | ✓ | BSD-3-Clause (permissive; Copyright 2024 Karim Shoair) | GitHub API `license.spdx_id="BSD-3-Clause"` + PyPI `info.license` |
| D2 | ✓ | Last commit 2026-05-06; v0.4.7 release 2026-04-17; ACTIVE band | API `pushed_at:"2026-05-09T00:44:05Z"`; commits per_page=10 |
| D3 | ⚠️ | 47,966★ / 4,469 forks at age=574d → ~83★/d HIGH velocity but content-depth STRONG (92% test coverage, 9 i18n READMEs, full feature surface) → NOT fresh-paint | API `stargazers_count` + `created_at:"2024-10-13"` |
| D4 | ✓ | TIER-4-INDIVIDUAL named: Karim Shoair (D4Vinci), 3050 followers, 45 repos, since 2016, "Web Scraping Expert" Egypt | `api.github.com/users/D4Vinci` |
| D5 | ✓ | Active: open_issues=2 (very low backlog), 4469 forks, 193 subscribers, recent v0.4.7, GitHub Actions tests passing | API metadata |
| D6 | ✗ | Use-class MISMATCH: Scrapling is web-scraping/anti-bot framework; eee runtime is autonomous LLM agent /loop (research + code + verify). No /loop workflow consumes Cloudflare-bypass + StealthyFetcher + Spider-crawl primitives | README L60-90 use-cases |
| D7 | ⚠️ | Has built-in MCP server for AI integration ("Claude/Cursor/etc"); Anthropic-aligned per MCP support BUT scraping use-class still mismatches | README L235 "MCP Server to be used with AI" |
| D8 | ⚠️ | Heavy commercial sponsor base (proxy vendors: ColdProxy, BirdProxy, Webshare, etc.) — adoption real but in scraping-industry NOT AI-agent-runtime industry; no named-T2 endorsement from Karpathy/Cherny/obra-class agentic practitioners found in README | README sponsors L100-220 |
| D9 | ⚠️ | FM-class risk: introduces new MCP server (`scrapling`) → expands `.mcp.json` surface; D6 today-release-auto-upgrade band on `pip install scrapling@latest` per `mcp-disconnect-recovery.md` D6; demand-absence (Probe 7.a) per `agent-harness-fit-verification.md` | sibling `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 7.a DEMAND-ABSENCE` |
| D10 | N/A | Not a replacement candidate | n/a |

**Score: 5/9 (D10 N/A)** + critical D6 use-class FAIL → **REJECT** verdict.

## Capability delta vs eee 7 incumbent web-fetch surfaces

| Capability | Scrapling | Incumbent eee surface | Delta |
|---|---|---|---|
| HTTP fetch + HTML→markdown | `Fetcher.get()` | WebFetch (Anthropic CC native) + `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` | DUPLICATE |
| Browser automation (full DOM) | `DynamicFetcher` (Playwright) | mcp__playwright (full browser MCP) | DUPLICATE |
| Anti-bot / Cloudflare bypass | `StealthyFetcher` + Turnstile bypass | (none — out of scope for /loop) | NEW capability but no demand |
| Web search | (none) | mcp__exa + mcp__perplexity + mcp__firecrawl | N/A (Scrapling not a search tool) |
| Spider crawl framework | `Spider` class | mcp__firecrawl__firecrawl_agent (autonomous web agent) | DUPLICATE (firecrawl_agent covers crawl use-class) |
| GitHub raw fetch | (generic via Fetcher) | mcp__github__get_file_contents | DUPLICATE for git-hosted content |
| Adaptive selector tracking | `auto_save=True` + `adaptive=True` | (none) | NEW capability but use-class unclear |

**Verdict on delta**: Scrapling brings 2 NEW capabilities (anti-bot bypass + adaptive-selector tracking) but BOTH lack a sss/eee operational driver. The 5 overlap capabilities all have stronger incumbents. Per `agent-harness-fit-verification.md §Probe 7.a DEMAND-ABSENCE`: REJECT-FOR-FIT.

## VERDICT

**REJECT** (DEMAND-ABSENCE per Probe 7.a + DUPLICATE-FUNCTIONALITY per kiss-dry-yagni Must-Never #4)

Reason: Scrapling is a structurally sound, BSD-3-Clause, actively-maintained, 47.9k★ web-scraping framework with named-author maintainer — it would PASS axes 1+2+3 of convergence-gate. However: (1) eee runtime has NO autonomous /loop workflow that scrapes anti-bot-protected sites; (2) Scrapling's web-fetch primitives DUPLICATE 5 of 7 incumbent eee surfaces (WebFetch / mcp__playwright / mcp__firecrawl_agent / mcp__github / ctx_fetch_and_index); (3) the 2 NEW capabilities (Cloudflare-bypass, adaptive-selector tracking) have no sss-side consumer. Per cardinal-rule-12 upstream-install-priority + Probe 7.a demand-absence gate, reject.

## Re-evaluation triggers

Re-open this verdict IF any of these emerge:
- A future eee /loop workflow requires anti-bot-protected web data extraction (e.g., adversarial threat-intel gathering, competitive-research over Cloudflare-protected sites)
- Adaptive-selector tracking emerges as load-bearing for scraping-class workflows
- Named-T2 AI-agent-runtime practitioner (Karpathy / Cherny / obra-class) endorses Scrapling for agentic use-cases (would shift D8 from scraping-industry-only to agentic-industry-included)
- Scrapling ships official Anthropic CC plugin (would shift D7 from PARTIAL to PASS)

## Risks (tracked for future re-eval)

- D6 today-release-auto-upgrade per `pip install scrapling@latest` (4-day-old commits indicate fast iteration; would need version-pin per CR-9)
- Heavy proxy-vendor sponsor footprint suggests commercial-scraping bias; not AI-agent-runtime focused
- New MCP server slot consumption with no operational driver = anti-pattern per `agent-harness-fit-verification.md`

## FM-17.e mitigation report

**Probe summary** (per FM-17.e mitigation mandate):
- 11 narrow tool calls total (vs prior fire B 4 / C 4 with thrash)
- 174s duration (vs prior B 1179s / C 989s with thrash)
- 372546 tokens (large but bounded; substantive evidence gathered)
- Substituted curl-GitHub-API + curl-PyPI for large README WebFetch
- ctx_fetch_and_index unused (direct curl preview sufficed)
- All probes single-axis-per-call
- ARTIFACT-INLINE delimiter respected

**Result**: zero FM-17.e autocompact-thrashing. Mitigation discipline VALIDATED on first dogfood post-Wave 112 Ship F codification.
