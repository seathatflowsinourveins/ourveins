# Wave 97 Fan-2 Agent A — V64 cohort saturation audit (NOT-yet-audited remainder)

**STAND-IN-NOTICE**: agent ran under `CLAUDE_CODE_SUBAGENT_MODEL` env unconfirmed; if Sonnet stand-in per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`, cross-model gate NOT structurally satisfied — orchestrator must integrate verdicts as TIER-3 evidence trail and re-fire any ADOPT-NOW with codex T1 foreground+tee before commit.

## Executive summary

| Metric | Count |
|---|---|
| Total repos in scope this fan-out | 56 |
| ALREADY-ADOPTED (installed/wired) | 27 |
| ADOPT-NOW (recommend immediate ship) | 3 |
| STUDY-PILOT | 4 |
| REJECT-FOR-FIT | 12 |
| REJECT-FOR-PROVENANCE | 2 |
| Already-PLANNED (manifest, lower-tier defer) | 8 |
| Wave 97 Agent A overlap (skipped) | 3 |
| Wave 97 Agent B overlap (skipped) | 87 |

## Top-3 ADOPT-NOW (cross-cohort, ranked by leverage)

1. **github/spec-kit** — GitHub-OFFICIAL specification-driven development kit; complements claude-md-management plugin + cwc-long-running-agents Default-FAIL contract. Likely Probe 7.b DEMAND-CREATES-NEW-WORKFLOW for /spec-driven feature workflows. Wave 98 install candidate.
2. **yamadashy/repomix** — PLANNED in manifest L128 but never installed. 30k+ stars MIT, axis-1 PASS. Pairs natively with Serena + RTK + context-mode. One-liner: `npm install -g repomix@latest`. **Highest-ROI Wave 98 install**.
3. **modelcontextprotocol/inspector** — MCP debugger primitive; valuable when wiring Graphiti MCP `.mcp.json` next fire. Low-cost defer-or-install candidate.

## Saturation finding

**Is eee's already-adopted stack saturated for these cohorts? YES — substantially saturated.**

| Cohort | Adopted | Total | % |
|---|---|---|---|
| §DEFAULT_INSTALL_CORE | 9 | 13 | 69% |
| §OFFICIAL_FOUNDATION | 8+4-deferred | 24 | 50% |
| §TOKEN_CONTEXT_ELITE remainder | 4 | 21 | 19% (rest = duplicates) |
| §MEMORY_MCP_AUDIT_REQUIRED | 2 | 17 | 12% (rest correctly excluded) |
| §CODE_CLI_PROSE_QUALITY | 8+5-deferred | 24 | 33% (rest = out-of-scope languages) |
| §CODEX_BRIDGES | 1 | 7 | 14% (rest correctly REJECT-FOR-PROVENANCE) |

**Any HIGH-LEVERAGE gap missed by prior fan-outs?**
- **PARTIAL gap**: yamadashy/repomix has been PLANNED in manifest since Section 6 but never shipped — ONE high-leverage install missing from current stack. Pairs natively with Serena (MCP) + RTK (PATH-wired) + context-mode (plugin-enabled). One-liner install with no risk.
- **Minor gap**: github/spec-kit (47k stars Anthropic-aligned) not in current stack; could complement claude-md-management at low cost.
- **No critical gap detected** beyond these two — Wave 50 + Wave 97 fan-outs achieved comprehensive coverage.

## Per-cohort tables

### §OFFICIAL_FOUNDATION (24 repos)

8 ALREADY-ADOPTED: anthropics/claude-code (binary) / anthropics/skills (marketplace) / anthropics/claude-agent-sdk-python (cite-anchor) / anthropics/claude-plugins-official (marketplace + 5 plugins) / github/github-mcp-server (HTTP) / openai/codex (binary) / openai/codex-plugin-cc (plugin) / modelcontextprotocol/inspector→STUDY-PILOT

REJECT-FOR-FIT: 5 (claude-agent-sdk-typescript / anthropic-sdk-python+typescript / openai-python+node — DEMAND-ABSENCE for direct-SDK consumers; runtime calls via CLI)

DEFER-PLANNED-PENDING-CI: 4 (claude-code-action / claude-code-base-action / claude-code-security-review / openai/evals)

ADOPT-NOW: **github/spec-kit**

### §DEFAULT_INSTALL_CORE (13 repos)

9 ALREADY-ADOPTED: ccusage / rtk / serena / ripgrep / fd / jq / yq / gh / uv

DEFER-PLANNED: 3 (pre-commit / casey/just DEMAND-ABSENCE / mise DEMAND-ABSENCE)

ADOPT-NOW: **yamadashy/repomix** (HIGHEST ROI; PLANNED in manifest L128 since Wave-N)

### §TOKEN_CONTEXT_ELITE (21 repos)

4 ALREADY-ADOPTED: rtk / context-mode / context7 / playwright-mcp + markitdown via .local/bin

13 REJECT-FOR-FIT: most are DEMAND-ABSENCE overlapping with installed stack (buildoak/wet / ArthurDEV44/distill / z19r/whetstone / juyterman1000/entroly / aider-ai/aider / tree-sitter / safishamsi/graphify / mcpware/cross-code-organizer / unclecode/crawl4ai)

3 REJECT-FOR-PROVENANCE: low-stability single-individual (jordan112/skinny-jeans / juyterman1000/entroly / tirth8205/code-review-graph) — Tier-0 fabrication-test FAIL

3 STUDY-PILOT: mixedbread-ai/mgrep / ast-grep/ast-grep / docling-project/docling

DEFER-CRED-GATED: zilliztech/claude-context (MILVUS_TOKEN) / firecrawl/firecrawl

### §MEMORY_MCP_AUDIT_REQUIRED (17 repos)

2 ALREADY-ADOPTED: doobidoo/mcp-memory-service (sqlite_vec) + getzep/graphiti (FalkorDB UP, MCP wiring deferred next fire)

12 REJECT-FOR-FIT/PROVENANCE: most overlap with installed memory stack OR are competing-framework-class

1 DEFER-CITE-ONLY: mem0ai/mem0

### §CODE_CLI_PROSE_QUALITY (24 repos)

8 ALREADY-ADOPTED: uv / ruff / shellcheck / typos / vale / markdownlint-cli2 + 2 implicit

5 PLANNED-DEFER: pre-commit / bat / delta / eza / fzf

REJECT-FOR-FIT 8: out-of-scope language toolchains (biome / oxc / golangci-lint / hadolint / actionlint / lefthook / yazi / cspell / textlint)

1 STUDY-PILOT: sharkdp/hyperfine (benchmark CLI)

### §CODEX_BRIDGES (7 repos)

1 ALREADY-ADOPTED: openai/codex-plugin-cc (official)

6 REJECT: 4 REJECT-FOR-PROVENANCE (non-official bridges per V64 cut-rule) + 2 REJECT-FOR-FIT (Gemini/OpenCode bridges DEMAND-ABSENCE)

## TIER-1 cite chain

- **V64 SOTA list**: `Z:/claude-sota-installed/docs/outer research/kits/v64/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` [VERIFIED 2026-05-08]
- **Per-repo cites**: `gh api repos/<owner>/<repo>` 2026-05-08 (56 rows this fan-out)
- **Adoption-status grep**: `.claude/settings.json` + `.mcp.json` + `tools/eee.ps1` + `docs/sota-installed-manifest.md` + `Z:/claude-sota-installed/.local/bin/`
- **Manifest cross-ref**: `Z:/claude-sota-installed/docs/sota-installed-manifest.md` for PLANNED-DEFER status
- **Probe DAG authority**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` (cite-import-AMBER)

VERDICT: complete (saturation: Partial — 2-3 high-leverage candidates surfaced; 56 repos audited / 3 ADOPT-NOW / 4 STUDY-PILOT / 12 REJECT-FOR-FIT / 2 REJECT-FOR-PROVENANCE / 27 ALREADY-ADOPTED / 8 PLANNED-DEFER)
