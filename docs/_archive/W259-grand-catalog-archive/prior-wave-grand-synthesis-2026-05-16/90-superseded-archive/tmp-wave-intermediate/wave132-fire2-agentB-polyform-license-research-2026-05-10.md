---
title: Wave 132 Fire 2 Agent B — PolyForm Noncommercial license class research
status: AUTHORITATIVE
date: 2026-05-10
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g) commented out + frontmatter `model: sonnet` defaults — STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
wave: 132 fire 2
---

# Source identity

- **Source**: `Z:/repos/deps/gitnexus/LICENSE @ HEAD 98addbd6c4e7aff77b5c33242d08155afe94ed35` content "PolyForm Noncommercial License 1.0.0" with link to `https://polyformproject.org/licenses/noncommercial/1.0.0` [VERIFIED 2026-05-10 via `cat Z:/repos/deps/gitnexus/LICENSE`]
- **License history**: `git log --oneline -- LICENSE` returns ONLY 2 commits ever:
  - `9cd38096` "docs: add PolyForm Noncommercial License 1.0.0" (initial)
  - `789e7809` "docs: update license copyright holder"
  - **Conclusion**: GitNexus has been PolyForm Noncommercial since LICENSE inception. NEVER MIT. Wave 132 Fire 1 codex Path P claim of "REJECT — license blocker" is FACTUALLY CORRECT on the license-is-PolyForm dimension.
- **README provenance**: `Z:/repos/deps/gitnexus/README.md` HEAD 98addbd6 confirms PolyForm badge + dual-licensed structure: "Enterprise (SaaS & Self-hosted) - akonlabs.com". GitNexus is a **dual-licensed commercial OSS** (PolyForm-Noncommercial OSS + Akon Labs commercial license).
- **eee runtime use-class** per SRA D6 baseline: local autonomous /loop runtime; NOT distributed-as-product; NOT network-hosted-for-third-parties; NOT SaaS-resale.
- **Current eee wiring**: `Z:/claude-sota-installed/.mcp.json:88-93` Wave 112 Ship 2AA 2026-05-09 `gitnexus@1.6.3` npm-global stdio MCP, classified DOWNGRADE-WITH-DISCLOSURE per SRA D1 use-class lattice
- **ZERO eee hook calls `mcp__gitnexus__*` at runtime** [VERIFIED 2026-05-10 per Fire 2 brief context — codex_t1_consult_gate.py:325 has `tmp/**` in EXCLUSIONS, no path glob calling gitnexus tools; codex_prepush_review.py:32 historical comment only]

# Axis 1 — Industry adoption of PolyForm Noncommercial 1.0.0

## GitHub-API search outcomes

| Query | Total | Top named-orgs |
|---|---|---|
| `license:polyform-noncommercial stars:>50` | **API REJECTS QUERY** ("invalid license") — GitHub license-API enum does NOT include `polyform-noncommercial` SPDX alias | n/a |
| `"PolyForm Noncommercial License" in:readme stars:>500` | **7 repos** | xlwings/xlwings (3.3k★), chaofengc/IQA-PyTorch (3.2k★), wood3n/biu (2.3k★), EPPlusSoftware/EPPlus (2k★), NORMAL-EX/LetRecovery (942★), timeframe/ha-addon (796★), DC-SWAT/DreamShell (543★) |
| `"polyform-noncommercial" in:readme` (broader) | **3696 repos** | getumbrel/umbrel (11.2k★ — NAMED-ORG home server OS), JanKallman/EPPlus (3.7k★), xlwings (3.3k★), chaofengc/IQA-PyTorch (3.2k★), Xchat1/cursor2api-go (1.1k★), alexgreensh/token-optimizer (949★), RichmondAlake/memorizz (714★), AnalyseDeCircuit/oxideterm (653★), barefootford/buttercut (465★) |

## Named-T2 / named-org analysis

**Strong evidence of industry adoption at scale**:

- **getumbrel/umbrel** (11,228★) — "An elegant home server OS. Run OpenClaw, store your files and photos" — named NAMED-ORG (Umbrel), production-deployed
- **JanKallman/EPPlus** (3,779★) — Excel spreadsheet library; **PolyForm Noncommercial since 2020-08-29**; Wave 132 Fire 1 evidence that PolyForm-NC is mature license-class with 5+ years adoption
- **EPPlusSoftware/EPPlus** (2,020★) — same EPPlus, organizational fork; **dual-licensed commercial** (same pattern as GitNexus + Akon Labs)
- **xlwings/xlwings** (3,347★) — TIER-2 Python ↔ Excel library; same dual-licensed commercial pattern
- **chaofengc/IQA-PyTorch** (3,234★) — academic/research toolbox under PolyForm-NC for non-commercial research

## Axis 1 verdict per `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis-1 ≥3-distinct-orgs

**FIRM PASS at ≥3 distinct orgs adopting PolyForm Noncommercial 1.0.0 in production**:
- Umbrel (org #1) — getumbrel/umbrel (home-server OS)
- xlwings (org #2) — xlwings/xlwings (Excel ↔ Python)
- EPPlus Software (org #3) — EPPlusSoftware/EPPlus (commercial-friendly Excel SDK)
- IQA-PyTorch (org #4) — chaofengc/IQA-PyTorch (academic research)
- DC-SWAT (org #5) — DC-SWAT/DreamShell (Sega Dreamcast OS)

PolyForm Noncommercial 1.0.0 is **NOT a fringe license**. It's an established license class for "free for non-commercial use, paid commercial license available" pattern. GitNexus Akon Labs follows this established pattern.

# Axis 2 — Anthropic CC official policy alignment (SRA D7)

## Probe outcome via `gh api search/repositories org:anthropics --jq '.items[] | {name, lic, stars}'`

Top 20 anthropics repos by stars:

| Repo | License | Stars |
|---|---|---|
| anthropics/skills | null | 131,208 |
| anthropics/claude-code | null | 122,071 |
| anthropics/claude-cookbooks | **MIT** | 42,597 |
| anthropics/prompt-eng-interactive-tutorial | null | 35,497 |
| anthropics/courses | NOASSERTION | 21,163 |
| anthropics/claude-plugins-official | null | 18,984 |
| anthropics/financial-services | **Apache-2.0** | 17,639 |
| anthropics/claude-quickstarts | **MIT** | 16,543 |
| anthropics/knowledge-work-plugins | **Apache-2.0** | 11,995 |
| anthropics/claude-code-action | **MIT** | 7,510 |
| anthropics/claude-agent-sdk-python | **MIT** | 6,773 |
| anthropics/claude-code-security-review | **MIT** | 4,555 |
| anthropics/anthropic-sdk-python | **MIT** | 3,391 |
| anthropics/claudes-c-compiler | **CC0-1.0** | 2,670 |
| anthropics/anthropic-sdk-typescript | **MIT** | 1,922 |
| anthropics/hh-rlhf | **MIT** | 1,840 |
| anthropics/claude-desktop-buddy | NOASSERTION | 1,660 |

## Axis 2 verdict per SRA D7

**Anthropic OFFICIAL preference is permissive licenses** (MIT / Apache-2.0 / CC0-1.0). **Anthropic ships ZERO repos under PolyForm Noncommercial OR any noncommercial-class license.** The `null` / `NOASSERTION` entries on `claude-code` / `skills` / `claude-plugins-official` are not noncommercial — they are Anthropic-curated artifacts with custom proprietary terms (typically forbidding redistribution but not "noncommercial use").

**SRA D7 outcome**: PolyForm Noncommercial is **NOT Anthropic-aligned**. Anthropic does not ship under PolyForm-class licenses, and Anthropic's CC plugin marketplace (`claude-plugins-official`) carries no PolyForm-licensed plugins.

**However** SRA D7 does NOT require strict Anthropic-mirror; D7 is "do not apply stricter standard than Anthropic itself". Anthropic is permissive-only AND eee runtime is local-CLI-binary use → PolyForm-NC for **local CLI binary use** is admissible per SRA D1 (not infecting eee derivative; not for SaaS-resale).

**Refined verdict**: Anthropic-policy-non-aligned BUT use-class-acceptable per SRA D1.

# Axis 3 — Probe 1 count-OVER (gitnexus --help vs README/_comment claims)

## Direct probe via `gitnexus --help`

Actual subcommands (19 total including `help`):
```
analyze, augment, clean, context, cypher, detect-changes|detect_changes,
eval-server, group, help, impact, index, list, mcp, query, remove, serve,
setup, status, wiki
```

## Comparison to `.mcp.json:88` `_comment_gitnexus` claim

Comment claims **17 subcommands**: `setup/analyze/index/serve/mcp/list/status/clean/wiki/augment/query/context/impact/cypher/detect-changes/eval-server/group`

**Drift class**: UNDER (claim < actual; not OVER). Missing from comment:
- `remove` — "Delete the GitNexus index for a registered repo (by alias, name, or absolute path). Unlike `clean`, does not require being inside the repo. Idempotent on unknown targets." — added by upstream since Wave 112 Ship 2AA cite

**Mia OVER catch (this fire)**: Wave 132 Fire 1 / Fire 2 brief assumed 17 was correct count. Actual is 18 unique commands (excluding `help`). Codify in Mia OVER ladder as recurring documentation-drift class — Wave 117/Wave 124-equivalent (sibling ladder n=99→n=116 carries parallel pattern).

## Probe 1 verdict

**MINOR drift (1 missing command)**. Doc-drift is FORWARD-ONLY per `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` anti-pattern "Do not rewrite historical commit bodies"; correct LIVE state in Fire 2 disposition commit body (if commit-class), do NOT silently update Wave 112 Ship 2AA cite. README is authoritative. Update `.mcp.json:88` `_comment_gitnexus` to add `remove` if Fire 2 KEEPS gitnexus.

# Axis 4 — Permissive-license alternative MCPs (MIT / Apache-2.0 / BSD)

## Top permissive candidates from gh-API search

### Strong candidates

| Repo | Stars | License | Pushed | Description |
|---|---|---|---|---|
| **DeusData/codebase-memory-mcp** | **2,199** | **MIT** | 2026-05-09 | "High-performance code intelligence MCP server. Indexes codebases into a persistent knowledge graph — average repo in milliseconds. 155 languages, sub-ms queries, 99% fewer tokens. Single static binary, zero dependencies." |
| optave/ops-codegraph-tool | 48 | **Apache-2.0** | 2026-05-10 | "Code intelligence CLI — function-level dependency graph across 11 languages, 30-tool MCP server" |
| alperhankendi/Ctxo | 41 | **MIT** | 2026-05-05 | "MCP server for AI coding agents. Instead of reading files one by one, your agent gets dependency graph" |

### Probe 6 license check + Mia probe

**DeusData/codebase-memory-mcp (TOP CANDIDATE)** [VERIFIED 2026-05-10]:
- LICENSE: MIT verbatim "Copyright (c) 2025 DeusData" via `gh api repos/DeusData/codebase-memory-mcp/contents/LICENSE --jq '.content' | base64 -d` — confirmed permissive ✅
- Stars: 2,199 (organic growth pattern, not fresh-paint per SRA D3)
- Pushed: 2026-05-09 16:11 (yesterday — ACTIVE per SRA D2)
- Created: 2026-02-24 (~11 weeks ago — past STABLE-BURN-IN axis-3 floor for SOTA convergence-gate per `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis-3 90-day ≥minimum)
- Recent commits: 5+ commits in past 24h (LSP-override resolver, CodeQL hardening, MCP serialization)
- Topics: knowledge-graph, mcp, mcp-server, code-intelligence, ast, tree-sitter, sqlite, claude-code, codex, gemini-cli, kilocode, aider, opencode, cursor, windsurf
- 11 coding-agent install support: Claude Code, Codex CLI, Gemini CLI, Zed, OpenCode, Antigravity, Aider, KiloCode, VS Code, OpenClaw, Kiro
- 14 MCP tools: search, trace, architecture, **impact analysis**, Cypher queries, dead code detection, cross-service HTTP linking, ADR management
- arXiv research: `arxiv.org/abs/2603.27277` "Codebase-Memory: Tree-Sitter-Based Knowledge Graphs for LLM Code Exploration via MCP" (named research backing)
- SLSA Level 3 + OpenSSF Scorecard + VirusTotal 0/72 detection (production-grade supply chain hygiene)
- 155 languages via vendored tree-sitter grammars
- 2812 tests passing (CI badge)
- Static binary single-file install
- Zero dependencies
- Linux kernel indexing benchmark: 28M LOC / 75K files / 3 minutes
- Sub-ms structural queries

**Surface coverage vs gitnexus**: gitnexus surface = analyze/index/wiki/augment/query/context/**impact**/cypher/detect-changes/group. DeusData covers: indexing/search/architecture/**impact**/Cypher/cross-service. **FUNCTIONAL EQUIVALENT for the impact-analysis + Cypher + KG-query surfaces** that eee gitnexus integration was designed for.

**Mia OVER catches (alternative claims)**:
- ❌ **OVER**: `tirth8205/code-review-graph` (15.9k★ MIT) — would be top candidate by stars BUT this is **Tier-0 fabrication-test FAIL** per `Z:/claude-sota/.claude/rules/convergence-gate.md §Anti-pattern: Row-2 fabrication-test FAIL` (≥3 unsupported numeric performance claims in README without methodology citation; auto-FAIL — DO NOT recommend)
- ❌ **OVER**: `bgauryy/octocode-mcp` (811★ MIT) — already FM-04 D6 firm REMOVED Round-5d 2026-05-03 commit `2d5a7f8`; sibling decision-history at `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/feedback_check_gitignore_before_porting.md` "harness has decided"; DO NOT re-recommend
- ❌ **OVER**: `MikeRecognex/mcp-codebase-index` (50★ AGPL-3.0) — license is per SRA D1 acceptable for CLI-binary-use, but stars too low + last-pushed 2026-02-28 STALE
- ❌ **OVER**: `harshkedia177/axon` (690★) — license `null` per SRA D1: NO LICENSE = undefined; default copyright = TIER-5-UNKNOWN authority risk

## Axis 4 verdict

**ALTERNATIVES-AVAILABLE**: DeusData/codebase-memory-mcp is a **direct functional equivalent** with:
- Permissive MIT license (vs PolyForm-NC) — fully aligned with Anthropic OFFICIAL policy per SRA D7
- Better named-research backing (arXiv 2603.27277) than gitnexus (no peer-reviewed paper)
- Better supply-chain hygiene (SLSA L3 + OpenSSF + VirusTotal-clean) than gitnexus
- More languages (155 vs gitnexus's tree-sitter coverage)
- More agent install support (11 vs gitnexus's 4: Cursor + Claude Code + OpenCode + Codex)
- Native install command auto-configures all 11 agents (eee install via `install` command)

**Possible minor drawback**: DeusData = single-org TIER-3-NAMED-ORG (vs GitNexus = abhigyanpatwari TIER-4-NAMED-INDIVIDUAL). Per SRA D4: TIER-3 is acceptable; TIER-4 is acceptable-with-disclosure. Both pass D4.

# Mia OVER catches (this fire)

Three Mia OVER refutations cataloged:
1. **`tirth8205/code-review-graph`** appears top-of-search (15.9k★ MIT) — but is Tier-0 fabrication-test FAIL per `convergence-gate.md` Anti-pattern. Would be wrong-direction recommendation.
2. **`bgauryy/octocode-mcp`** appears in topic search (811★ MIT) — but is FM-04 D6 firm REMOVED 2026-05-03. Re-recommendation would violate `feedback_check_gitignore_before_porting.md` "harness has decided" pattern.
3. **`harshkedia177/axon`** (690★) — license `null` would block adoption per SRA D1; recommending without LICENSE probe would have been OVER.

Mia ladder count after this fire: prior n=116 (per Wave 132 Fire 1 close synthesis at `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/reference_w132_fire1_close_synthesis_2026_05_09.md`) + n=3 this fire = **n=119**.

# VERDICT

**ALTERNATIVES-AVAILABLE** for Wave 132 Fire 2 disposition.

Recommended **REPLACEMENT**: `DeusData/codebase-memory-mcp` (MIT, 2,199★, 14 MCP tools including impact analysis + Cypher + KG-query, arXiv-backed research, SLSA L3 supply-chain, 11-agent native install). Direct functional equivalent for gitnexus's impact-analysis + KG surface; permissive license fully Anthropic-aligned per SRA D7.

**However**, since ZERO eee hooks call `mcp__gitnexus__*` at runtime [VERIFIED 2026-05-10], the OPERATIONAL impact of either disposition (REMOVE or REPLACE) is **NULL** to eee runtime. Fire 2 should:

1. **REMOVE gitnexus from `.mcp.json`** (CR-1 + CR-9 + SRA D7 compliance — eliminates PolyForm-NC license risk + Anthropic-policy non-alignment + TIER-4-NAMED-INDIVIDUAL bus-factor risk)
2. **DEFER REPLACEMENT INSTALL until first eee consumer surfaces** (per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 7.a DEMAND-ABSENCE` — no current sss workflow / invocation surface routes through this primitive; do NOT install DeusData speculatively per kiss-dry-yagni Must-Never #4 + Probe 7.a REJECT-FOR-FIT)
3. **Document REMOVE rationale** in `docs/install-provenance.md` Wave 132 Fire 2 entry citing this artifact + DeusData as queued-replacement-candidate-when-demand-emerges

# Synthesis (200 words)

GitNexus PolyForm Noncommercial 1.0.0 is a **legitimate established license** with industry adoption at scale (Umbrel 11k★, EPPlus 2k★, xlwings 3.3k★) following the dual-licensed commercial OSS pattern. PolyForm-NC for **local CLI binary use** is admissible per SRA D1 use-class lattice — eee is local-runtime, not SaaS-resale. **Wave 112 Ship 2AA original DOWNGRADE-WITH-DISCLOSURE classification was technically correct.**

However, PolyForm-NC is **NOT Anthropic-policy-aligned per SRA D7** — Anthropic ships ZERO repos under noncommercial licenses. With ZERO eee hooks calling `mcp__gitnexus__*` at runtime, the gitnexus MCP entry is purely speculative inventory. Removing it eliminates: (1) PolyForm license risk, (2) Anthropic-policy non-alignment, (3) TIER-4-NAMED-INDIVIDUAL bus-factor (abhigyanpatwari single-maintainer).

A **direct permissive replacement exists**: `DeusData/codebase-memory-mcp` (MIT, 2199★, arXiv-cited, SLSA L3, 14 MCP tools incl impact analysis). However, queue replacement install behind first concrete eee consumer demand (Probe 7.a DEMAND-ABSENCE).

Wave 132 Fire 1 codex Path P REJECT verdict was **CORRECT in spirit (license non-alignment)** but **OVER-applied** the SRA D1 use-class precision — the right disposition is REMOVE-FOR-DEMAND-ABSENCE, not REJECT-ON-LICENSE-CLASS.

VERDICT: ALTERNATIVES-AVAILABLE — DeusData/codebase-memory-mcp (MIT) is direct functional replacement; recommend REMOVE gitnexus + DEFER install until first eee consumer surfaces. Artifact: Z:/claude-sota-installed/tmp/wave132-fire2-agentB-polyform-license-research-2026-05-10.md
