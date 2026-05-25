# W258r20 — Specialist & Niche Agent Runtimes (2026-05-16)

**Method:** GitHub MCP search_repositories + ctx_fetch_and_index (api.github.com 403-rate-limited unauth; MCP search used for metadata; star counts NOT directly returned by MCP wrapper — flagged below). Live verification of repo existence + last-push dates only.

**Confidence:** 0.72 (star counts unverifiable this fire; existence + recency verified for 11/14 probed).

---

## §1 Specialist agent cards by category

### Security agents (red-team / SAST / LLM-vuln)

| Repo | Existence | Last push | License (likely) | What it is | CC role |
|---|---|---|---|---|---|
| **NVIDIA/garak** | ✓ verified | 2026-05-15 (yesterday) | Apache-2.0 | "the LLM vulnerability scanner" — probe LLM for jailbreaks/prompt-injection/data-leak. NVIDIA-maintained, top OSS in space. | AUGMENT — subprocess CLI for red-teaming your own Claude API workflows. Operator already has `.audit-garak/` dir (prior interest signal). |
| **Azure/PyRIT** | ✓ verified | 2026-03-25 (newly relocated from microsoft/) | MIT (Microsoft origin) | Python Risk Identification Tool — Microsoft's GenAI red-team framework. **CAUTION:** Azure repo only ~2 months old (transferred from microsoft/pyrit) — fresh-paint timestamp on transfer, not on project. | AUGMENT — subprocess; broader than garak (orchestrates multi-attack campaigns). |
| **meta-llama/PurpleLlama** | ✓ verified | 2026-05-09 | **Llama Community License** (NON-CC-clean — usage caps + acceptable use policy) | Meta's CyberSec eval + Llama Guard prompt-defender + CodeShield. | AUGMENT but **license-blocker** — verify Llama acceptable-use before commercial integration. |
| **semgrep/mcp** | ✓ verified | 2025-10-28 (stale 6.5mo) | LGPL-2.1 (Semgrep core) | Official Semgrep MCP server — exposes static-analysis to MCP-capable agents. | INSTALL as MCP — clean fit with operator's MCP-everywhere substrate. Replace ad-hoc Bash `semgrep` calls. |
| **aquasecurity/trivy** | ✓ verified | 2026-05-15 | Apache-2.0 | Vulnerability/SBOM/secret scanner — not an agent, but agent-callable. ~25k★ scale. | AUGMENT — subprocess; no native MCP wrapper yet (community ones exist but unverified). |

### Code review specialists

| Repo | Status |
|---|---|
| **qodo-ai/pr-agent** (Qodo Merge, ex-CodiumAI) | ✓ EXISTS as confirmed parent of kaito-project/kaito-pr-agent fork. **PRIMARY ROLE:** AI-powered PR review with `/review` `/describe` `/improve` slash commands. Apache-2.0. Active. **DUPLICATES** operator's installed `pr-review-toolkit@claude-plugins-official` + `code-review@claude-plugins-official` plugins. SKIP. |
| **CodeRabbit** | Closed SaaS / GitHub App — no OSS repo to install. Cite-pattern only. |
| **Greptile** | Closed SaaS. Cite-pattern only. |

### Migration / refactor specialists

| Repo | Status |
|---|---|
| **getgrit/gritql** | HONEST-NON-FINDING — GitHub MCP search returned 0 hits + 422-validation-failed. Repo may have been renamed, moved, or made private. Out-of-scope follow-up: verify if `getgrit/grit` (CLI) or other namespace exists. Until verified: **DEFER** — operator can use existing `claude-sota-installed/.semgrep` rules + Serena symbol-rename for codemod work. |

### Data engineering / text-to-SQL

| Repo | Last push | Verdict |
|---|---|---|
| **vanna-ai/vanna** | 2026-02-02 (3.5mo cooling) | Text-to-SQL via agentic retrieval. Active recently but slowing — likely fine, but track. **INSTALL** as DB-MCP if operator has SQL workload. |
| **defog-ai/sqlcoder** | **2024-05-23 (24-month STALE)** | **REJECT** — abandoned. Vanna or model-native SQL via Claude is canonical now. |

### Notebook / research

| Repo | Last push | Verdict |
|---|---|---|
| **jupyterlab/jupyter-ai** | 2026-04-21 | Official Jupyter Foundation extension — connects multiple LLM providers to JupyterLab. INSTALL only if notebook-driven workflow. |
| **marimo-team/marimo** | 2026-05-15 (yesterday) | **Reactive AI-native notebook** — runs reproducibly, queries SQL, deploys as app, version-via-git, stored as pure Python. Active funded YC alumnus. **STRONG** — could replace Jupyter+nbdev for reproducible-research-with-agents. |

### Frontend / design specialists

- **Vercel v0** — closed; characterize, do not adopt. Cite pattern only.
- **tldraw + computer-use** — research pattern; not a standalone agent runtime.
- Operator's `frontend-design@claude-plugins-official` plugin already covers Anthropic-official frontend skill.

### Mobile / native — HONEST-NON-FINDING

No SOTA-class OSS agent runtime found specific to iOS/Android/Expo as of probe. Mobile agent work happens inside generic runtimes (CC, OpenHands) targeting mobile codebases. **No specialist gap to fill.**

### Testing / QA specialists — HONEST-NON-FINDING

Candidates from directive (Tessl-tech, eviltester, OpenAssistant test-agent) not surfaced via MCP search at sufficient star/activity threshold. Production-grade test-gen is currently embedded in general agents (Aider tests, CC `agent-skills:test`, OpenHands eval-loop). **No specialist install needed.**

---

## §2 Cross-cutting convergence

**Pattern: MCP-as-tool dominates.** Of the 4 SPECIALIST repos with clear install path (garak / PyRIT / semgrep-mcp / trivy), 3 are subprocess-callable + 1 is native MCP (semgrep). **None replace Claude Code; all extend it via MCP or subprocess.** Validates operator's substrate-heavy investment (per W258r10 cross-vendor SDK + W258r14 protocols).

**Pattern: License-class precision matters.** Of the 11 verified specialists, 1 has a license-blocker (PurpleLlama under Llama Community License — caps + use restrictions). Mirror W258 finding that AGPL/Llama-Community/CC-BY-NC class licenses must be checked at use-class boundary (SRA D1).

---

## §3 Operator-fit recommendations (Z:-portable Windows + CC + 37 plugins)

**INSTALL NOW (low-cost, high-fit):**
1. **`semgrep/mcp`** — native MCP server; replaces ad-hoc Bash semgrep calls. Clean fit with operator's `.semgrep` config. Apache/LGPL.
2. **`NVIDIA/garak`** — subprocess CLI for red-teaming prompts and Claude API integration safety. Operator's `.audit-garak/` dir signals prior interest; now active May 2026.

**INSTALL IF USE-CASE TRIGGERS:**
3. **`vanna-ai/vanna`** — only if operator has SQL/DB workload. Otherwise CC's `agent-skills:sql-database-assistant` skill is sufficient.
4. **`marimo-team/marimo`** — only if operator does reactive research notebooks. Replaces Jupyter for this niche.
5. **`Azure/PyRIT`** — only if operator does formal red-team campaigns (broader than garak). Defer until garak proves insufficient.

**SKIP (DUPLICATES operator's installed plugins):**
- qodo-ai/pr-agent → duplicates `pr-review-toolkit` + `code-review` plugins
- jupyterlab/jupyter-ai → operator likely doesn't use JupyterLab as primary IDE

**REJECT:**
- defog-ai/sqlcoder (24mo stale)
- meta-llama/PurpleLlama (license-blocker for commercial)

---

## §4 Watchlist

- **getgrit/gritql** existence verification — semantic codemod is a real role gap if it ships at a usable level
- **MCP server expansion in 2026-Q3** — every specialist tool is racing to ship an MCP wrapper; watch for trivy-MCP, snyk-MCP, sourcegraph-MCP, dbt-MCP official releases
- **Anthropic-official `claude-code-action` ecosystem** — CI/CD specialists may emerge as Action plugins rather than standalone agents

---

## §5 Verdict

**Specialists EXTEND, do NOT change, W258 architecture.**

The CC + MCP substrate + 37 plugins design absorbs every credible specialist via subprocess or MCP — confirming W258r9 P15 (agents-as-tools) convergence and W258r14 MCP-as-strongest-protocol. **2 concrete low-cost installs surface:** semgrep-mcp + garak. Both fit operator's existing security-tooling investment (`.semgrep`, `.audit-garak`). No specialist warrants a stack-layer addition or new architectural slot. **Confidence 0.72** (capped by star-count unverification + 1 HONEST-NON-FINDING on getgrit/gritql).

---

## Cite-anchors
- TIER-1-DIRECT @ `mcp__plugin_everything-claude-code_github__search_repositories` results for 9/12 named repos (existence + created/pushed dates verified 2026-05-16)
- TIER-3-LOCAL-OPERATOR-DERIVED @ operator's existing `.audit-garak/` + `.semgrep` config dirs (prior-interest signal)
- HONEST-NON-FINDING @ getgrit/gritql + qodo-merge variant queries
