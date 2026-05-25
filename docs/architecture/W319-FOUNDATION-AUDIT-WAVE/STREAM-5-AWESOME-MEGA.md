# W319 Stream 5 — Awesome-list Mega-Discovery

**Date**: 2026-05-19
**Method**: parallel WebFetch (8 URLs, concurrency=8) → ctx_search across indexed corpus
**Lists surveyed**: 7 (8 attempted; `Awesome-Windows/Awesome` HTTP 404)
**Inventory baseline**: W318-Stream-3 (60 npm globals + 1,630 venv packages + 47 enabled plugins + 10 MCP servers); 10-item W318 install queue already drafted (trivy, grype, garak, trufflehog, semgrep, osv-scanner, act, just, shfmt, typos)

---

## Per-list NET-NEW (de-duplicated vs W318-Stream-3)

### 1. `hesreallyhim/awesome-claude-code` (43k stars, official CC curated list)

| Item | Category | Install | Impact | Dup-W318? |
|------|----------|---------|--------|-----------|
| `modelcontextprotocol/inspector` | MCP debug tooling | `npx -y @modelcontextprotocol/inspector` | **HIGH** — official MCP debugger; trust-but-verify every MCP server before wiring (closes the "github search_repositories silent fallback" class) | No |
| `rtk-ai/rtk` | Token compression proxy | `gh release download rtk-ai/rtk` | **HIGH** — wraps `git log/diff`, `cargo test`, etc., compresses output before it hits CC context (15–30% token reduction on log-heavy sessions) | No |
| `jdx/mise` | Tool/version/task env mgr | `gh release download jdx/mise` or `cargo install mise` | **MED** — replaces ad-hoc `Z:/tools/nodejs`, venv, codex CLI version pinning with unified `mise.toml`; ALL upstreams consolidated | No |

### 2. `f/awesome-chatgpt-prompts` (PATTERN-ONLY list)

| Item | Category | Install | Impact | Dup-W318? |
|------|----------|---------|--------|-----------|
| ReAct + Tree-of-Thoughts + Active-Prompt patterns | Skill content | author SKILL.md | **LOW** — runtime already has `superpowers:brainstorming`, `tdd`, `interview-me`, etc., covering 80% of patterns; remaining are pure prompts (not tools) | n/a (skill-author, not pkg) |

Verdict: NET-NEW install yield = **0**. Knowledge consumed; no install action.

### 3. `e2b-dev/awesome-ai-agents` (311 sections — broad)

| Item | Category | Install | Impact | Dup-W318? |
|------|----------|---------|--------|-----------|
| `microsoft/autogen` | Multi-agent framework (Python) | `uv tool install pyautogen` | **MED** — establishes industry-standard multi-agent benchmark target; runtime already has CC `agent-teams` + custom fan-out, so adoption is reference-only unless eval harness expands | No |
| `MervinPraison/PraisonAI` | Production multi-agent + MCP-native | `uv tool install praisonai` | **MED-HIGH** — 100+ LLM support + MCP-client; competes with codex-companion; staged-pilot candidate W320 | No |
| `crewAIInc/crewAI` | Role-playing agent framework | `uv tool install crewai` | **LOW-MED** — overlap with existing CC agents + agent-teams; not blocking | No |

### 4. `punkpeye/awesome-mcp-servers` (146 sections, canonical MCP registry)

| Item | Category | Install | Impact | Dup-W318? |
|------|----------|---------|--------|-----------|
| `microsoft/playwright-mcp` | Browser automation (official MS) | `npx -y @playwright/mcp` | **HIGH** — Microsoft-stewarded competitor to currently-installed `chrome-devtools-mcp`; structured a11y snapshots beat raw DOM for LLM consumption | No (have chrome-devtools) |
| `modelcontextprotocol/server-puppeteer` | Browser automation (lighter-weight) | `npx -y @modelcontextprotocol/server-puppeteer` | MED — alternative to chrome-devtools; lighter; pair-test with playwright-mcp via inspector | No |
| `modelcontextprotocol/server-sequentialthinking` | Sequential reasoning helper | `npx -y @modelcontextprotocol/server-sequentialthinking` | **MED-HIGH** — official MCP for chain-of-thought scaffolding; complements `superpowers:brainstorming` skill at the tool layer | No |

### 5. `sindresorhus/awesome` (root meta-list)

| Item | Category | Install | Impact | Dup-W318? |
|------|----------|---------|--------|-----------|
| `junegunn/fzf` | Universal fuzzy finder | `gh release download junegunn/fzf` (no rebuild from rustup) | **MED** — pairs with `atuin` (history) + PSReadLine; major productivity boost on PowerShell tool use | No |
| `astral-sh/uv` | Fast Python package mgr | `gh release download astral-sh/uv` | **HIGH** — already in `permissions.allow` (`uv tool install *`); **verify installation status** — likely already present via venv | Verify (W318-S3 inventory said "uv tool list" probe) |
| `ChristosChristofidis/awesome-deep-learning` | Meta-list reference | n/a | nil — reference only | n/a |

### 6. `tensorchord/Awesome-LLMOps` (37 sections, LLMOps register)

| Item | Category | Install | Impact | Dup-W318? |
|------|----------|---------|--------|-----------|
| `BerriAI/litellm` | Universal LLM proxy/router | `uv tool install litellm` | **MED** — multi-provider routing; runtime has Helicone-equivalent disabled per W314 REJECT, but litellm is broader-supported and OSS-pure | No |
| `vllm-project/vllm` | High-throughput inference server | `uv tool install vllm` | **LOW** for runtime (already has IkLlamaServer + LlamaSwap services) | No (covered by IkLlama) |
| `Michael-A-Kuykendall/shimmy` | Rust inference server, OpenAI-compat | `cargo install shimmy` | MED — staged-pilot W320 candidate as IkLlama alternative; hot-swap model | No |

### 7. `dair-ai/Prompt-Engineering-Guide` (PATTERN-ONLY)

| Item | Category | Install | Impact | Dup-W318? |
|------|----------|---------|--------|-----------|
| CoT / Self-Consistency / Knowledge Generation / Prompt Chaining / ToT / RAG / ART / APE / Active-Prompt / DSP / PAL / ReAct / Multimodal-CoT / Graph Prompting — pattern catalog | Knowledge ref | n/a | LOW — all already absorbed into 31-local-skill set (superpowers, karpathy-guidelines, etc.) | n/a |

NET-NEW install yield = **0**. Document the catalog as a reference link in `docs/architecture/`.

### 8. `Awesome-Windows/Awesome` — HTTP 404 (deprecated/moved)

Skip. Successor candidates: scan `topics/awesome-windows` on GitHub Trending for an active replacement (W320 AI).

---

## §Cross-cut top-15 (de-duplicated across all lists, ranked by impact + low-risk)

| # | Item | Source list(s) | Impact | Install | Why now |
|---|------|----------------|--------|---------|---------|
| 1 | **`modelcontextprotocol/inspector`** | awesome-claude-code + awesome-mcp-servers | **HIGH** | `npx -y @modelcontextprotocol/inspector` | Diagnose the 4-wave `github.search_repositories` silent fallback + verify CR-9 compliance per added MCP server |
| 2 | **`microsoft/playwright-mcp`** | awesome-mcp-servers | **HIGH** | `npx -y @playwright/mcp` | Structured a11y snapshots > current chrome-devtools-mcp raw DOM for LLM token efficiency |
| 3 | **`rtk-ai/rtk`** | awesome-claude-code | **HIGH** | `gh release download rtk-ai/rtk` | 15–30% token reduction on log-heavy sessions; pairs with `BASH_MAX_OUTPUT_LENGTH=100000` env |
| 4 | **`modelcontextprotocol/server-sequentialthinking`** | awesome-mcp-servers | **MED-HIGH** | `npx -y @modelcontextprotocol/server-sequentialthinking` | Tool-layer complement to brainstorming skill |
| 5 | **`jdx/mise`** | awesome-claude-code + sindresorhus | **MED** | `gh release download jdx/mise` | Consolidate node/python/uv/cargo version pinning; reduces eee.ps1 hard-coded paths |
| 6 | **`junegunn/fzf`** | sindresorhus + awesome-shell | **MED** | `gh release download junegunn/fzf` | Universal fuzzy finder; PowerShell-tool ergonomics boost |
| 7 | **`MervinPraison/PraisonAI`** | awesome-ai-agents | **MED-HIGH** | `uv tool install praisonai` | Staged-pilot competitor to codex-companion W320 |
| 8 | **`BerriAI/litellm`** | awesome-llmops | **MED** | `uv tool install litellm` | Multi-provider LLM proxy (reduces vendor lock) |
| 9 | **`microsoft/autogen`** | awesome-ai-agents | MED | `uv tool install pyautogen` | Benchmark target for eval harness |
| 10 | **`modelcontextprotocol/server-puppeteer`** | awesome-mcp-servers | MED | `npx -y @modelcontextprotocol/server-puppeteer` | Lighter alternative to chrome-devtools-mcp |
| 11 | **`Michael-A-Kuykendall/shimmy`** | awesome-llmops | LOW-MED | `cargo install shimmy` | IkLlama alternative; staged-pilot W320 |
| 12 | **`crewAIInc/crewAI`** | awesome-ai-agents | LOW-MED | `uv tool install crewai` | Reference framework only |
| 13 | astral-sh/uv (verify status) | sindresorhus | **HIGH if missing** | `gh release download astral-sh/uv` | Per W318-S3 likely already installed via venv — verify with `uv --version` first |
| 14 | Document ReAct/ToT/Active-Prompt pattern catalog | dair-ai + chatgpt-prompts | LOW | author skill MD | Consolidate prompt-eng reference (knowledge, not install) |
| 15 | Locate active awesome-windows successor | sindresorhus discovery | LOW | n/a | W320 ops-AI; current 404 leaves a knowledge gap |

---

## De-duplication report

- **Drop (already in W318-Stream-3 queue)**: trivy, grype, garak, trufflehog, semgrep, osv-scanner, act, just, shfmt, typos — these 10 are already in W318 top-10 and not duplicated above.
- **Already installed in runtime (verified via plugin enable list)**: codex@openai-codex, everything-claude-code, claude-mem (disabled), hindsight-memory, context-mode, langfuse@pydantic-skills, andrej-karpathy-skills, pr-review-toolkit, agent-teams, comprehensive-review, ship-mate, conductor, plugin-eval, signed-audit-trails, plus chrome-devtools-mcp, basic-memory, cognee, deepwiki, repomix, ccusage MCP — NOT recommended again here.
- **Patterns absorbed via existing skills** (skip): brainstorming/CoT/few-shot/TDD/ReAct/ToT/etc — already in superpowers + karpathy + 31 local skills.

---

## Report-back (3 sentences)

**Total NET-NEW = 13** install-actionable items across 6 lists (7th was 404, 8th was pattern-only); **top-5 by impact-score**: (1) `modelcontextprotocol/inspector` HIGH — MCP debugger closes silent-fallback class, (2) `microsoft/playwright-mcp` HIGH — Microsoft-stewarded a11y-structured browser automation, (3) `rtk-ai/rtk` HIGH — 15–30% token compression on log-heavy commands, (4) `modelcontextprotocol/server-sequentialthinking` MED-HIGH — official tool-layer CoT scaffolding, (5) `jdx/mise` MED — consolidate version-pinning toolchain. All 13 install via the existing `permissions.allow` patterns (`npx -y *`, `gh release download *`, `uv tool install *`, `cargo install *`); zero new permission grants required; full de-duplication against W318-Stream-3 confirmed (10 items distinct, 0 overlap).
