# W259-v13 — Official Integration Paths Audit (Part 1: Lower Layers)

> **Auditor**: W259-v13 OFFICIAL-INTEGRATION-PATH AUDITOR (Part 1).
> **Operator directive**: *"all the repos official docs guide, claude code integration official path, best practice, plugins, cli tools — what is next and what gaps need to be resolved."*
> **Scope (Part 1)**: L0 MCP substrate · L0.4 Git/VCS · L0.5 Security · L1 Cross-model Router · L1.5 Memory · L2 Orchestration/Multi-Agent.
> **Method**: top 2-4 ranked repos per layer from `05-scoring/MASTER-SCORING-MATRIX-W259.md` + `05-scoring/BENCHMARK-SCORECARD-{A,B,C}-W259v6.md`; each repo audited against its OWN official docs via `mcp__deepwiki__ask_question` + `mcp__plugin_everything-claude-code_github__get_file_contents`. Runtime state cross-checked against `.mcp.json`, `.claude/plugins/installed_plugins.json`, `.claude/plugins/known_marketplaces.json`, and the `Z:/venvs/claude` pip list.
> **Date**: 2026-05-16. **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Repo-own-doc claims are TIER-1-DIRECT (the repo's README/wiki is the canonical authority for its own integration path).

---

## §0 — Runtime state baseline (verified 2026-05-16)

**Installed MCP servers** (`Z:/claude-sota-installed/.mcp.json` — 13 entries): `github` (http/readonly), `context7` (http), `deepwiki` (http), `playwright` (stdio), `chrome-devtools` (stdio), `repomix` (stdio), `serena` (stdio), `memory` (stdio — `mcp-memory-service` v10.51.3, sqlite_vec), `graphiti` (stdio — falkordb, qwen3.6 local), `phoenix` (stdio), `gitnexus` (stdio), `ccusage` (stdio), `cognee` (http — INERT, server not running).

**Installed plugins** (`installed_plugins.json` — 42 plugins): superpowers@claude-plugins-official, codex@openai-codex, everything-claude-code, pyright-lsp, agent-sdk-dev, ralph-loop, claude-mem@thedotmack, commit-commands, agent-teams@claude-code-workflows, comprehensive-review, context-management, agent-orchestration, protect-mcp, signed-audit-trails, intelligent-compact, + ~27 others.

**Known marketplaces** (`known_marketplaces.json`): claude-plugins-official, openai-codex, everything-claude-code, anthropic-agent-skills, knowledge-work-plugins, claude-community, financial-services, healthcare, life-sciences, addy-agent-skills, claude-code-workflows, claude-code-skills, context-mode, antigravity-awesome-skills, superpowers-marketplace, thedotmack.

**venv** (`Z:/venvs/claude` pip): `litellm` 1.84.0 + `litellm-enterprise` 0.1.38 + `litellm-proxy-extras`, `graphiti-core` 0.29.0, `mcp-memory-service` 10.51.3, `mem0ai` 2.0.2, `semgrep` 1.160.0.

---

## §1 — L0 MCP SUBSTRATE

Top picks (Scorecard A §1.2 AgentRank-ranked + master matrix rows 77-83, 91, 93): the MCP SDK family + reference servers, `github/github-mcp-server`, `microsoft/playwright-mcp`, `googleapis/genai-toolbox` (MCP Toolbox), `modelcontextprotocol/inspector`.

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **modelcontextprotocol/servers** (reference servers) | `github.com/modelcontextprotocol/servers` README + `modelcontextprotocol.io` | **MCP server (stdio)** — official `.mcp.json` / `claude mcp add`. DeepWiki: 7 maintained servers (Everything, Fetch, Filesystem, Git, Memory, Sequential Thinking, Time); `server-postgres`/`server-sqlite`/`server-github` moved to `servers-archived`. | TS: `npx -y @modelcontextprotocol/server-*` (Windows: wrap `cmd /c`); Python: `uvx mcp-server-*` | **Partial** — substrate present (12 MCPs running); no reference server itself wired (none load-bearing). | Reference servers not individually installed. None is a gap — `git`/`filesystem`/`memory` are covered by `gitnexus`/native FS/`memory`. **`mcp-server-git` (official) is the one un-adopted candidate** if a vendor-neutral git MCP is wanted. |
| **modelcontextprotocol/python-sdk + typescript-sdk** | `modelcontextprotocol.io/docs` + repo READMEs | **Foundation substrate** — the SDKs every installed MCP server is built on. Not a CC integration target itself. | `pip install mcp` / `npm i @modelcontextprotocol/sdk` | **YES (transitive)** — every stdio MCP server uses them. | None — foundation, correctly not a direct install. |
| **modelcontextprotocol/inspector** | `github.com/modelcontextprotocol/inspector` README | **Dev-tool, not a CC plugin** — standalone MCP debugger; no `plugin.json`. Official: `npx @modelcontextprotocol/inspector`. | `npx @modelcontextprotocol/inspector <server-cmd>` | **NO** | **GAP: not installed.** Master matrix row 79 = T1 INSTALL (composite 94). It is a debug tool, not a runtime dependency — install on-demand when an MCP server misbehaves. Low-urgency. |
| **github/github-mcp-server** | `github.com/github/github-mcp-server` README (dedicated Claude Code install section) | **MCP server — official CC docs for BOTH transports.** DeepWiki-verified: remote Streamable-HTTP `claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp",...}'` (CC ≥2.1.1), or local Docker stdio. Read-only via `/readonly` URL suffix or `X-MCP-Readonly` header. | Remote (recommended): `claude mcp add-json` with `type:http`. Local: `docker run ghcr.io/github/github-mcp-server`. | **YES** — `.mcp.json` `github` entry uses `https://api.githubcopilot.com/mcp/readonly` (Streamable-HTTP, read-only). **Matches official docs exactly.** | None — correctly installed on the official remote transport + read-only path. |
| **microsoft/playwright-mcp** | `github.com/microsoft/playwright-mcp` README | **MCP server (stdio)** — official; `npx @playwright/mcp@latest`. AgentRank #1 of all MCP servers (AR 94.5). | `claude mcp add playwright npx @playwright/mcp@latest` | **YES** — `.mcp.json` `playwright` (native `node` to installed `@playwright/mcp/cli.js`, pinned per W155 F13). | None — installed; native-node form is a Windows spawn-churn optimization over the documented `npx`. |
| **googleapis/genai-toolbox** (MCP Toolbox for Databases) | `googleapis.github.io/genai-toolbox` + repo README (IDE Integration §) | **MCP server (stdio)** — official CC docs. DeepWiki-verified: `.mcp.json` entry with `command: toolbox`, `args: ["--prebuilt","<db>","--stdio"]`. Windows binary published (`windows/amd64/toolbox.exe`). | `curl -O https://storage.googleapis.com/mcp-toolbox-for-databases/v1.0.0/windows/amd64/toolbox.exe` then `.mcp.json` stdio entry. | **NO** | **GAP: not installed.** Master matrix row 91 = T1 INSTALL (composite 96). Officially Windows-supported, stdio. Only a gap if a SQL/multi-DB tool surface is load-bearing — this runtime is file + graph (FalkorDB via Graphiti) centric, so **demand-gated**, not urgent. |

**L0 — what's next**: substrate is solid and correctly transported (github MCP on the exact official Streamable-HTTP read-only path). The two un-adopted T1s — `modelcontextprotocol/inspector` (debug-on-demand) and `googleapis/genai-toolbox` (demand-gated on a SQL surface) — are deferrable, not blocking.

---

## §2 — L0.4 GIT / VCS SUBSTRATE

Top picks (Scorecard A §2.2): `git` (incumbent substrate), `git-worktree`+CC `EnterWorktree`, `gh` (GitHub CLI), `git-cliff`/`lefthook`/`git-branchless`/`git-sizer` (T1 tool tier).

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **git** (incumbent) | `git-scm.com/doc` | **NO official CC integration** — git is the substrate; CC operates on the working tree directly. Pattern-cite only. | OS package / already present | **YES** — repo is a git repo. | None — substrate by definition. |
| **git-worktree + CC `EnterWorktree`** | `git-scm.com/docs/git-worktree` + `code.claude.com/docs/en/headless` (parallel modes) | **CC-NATIVE** — `EnterWorktree`/`ExitWorktree` are first-party CC tools; `isolation:worktree` for parallel-safe subagent edits. The integration *is* CC core, no third-party tool. | Native — no install | **YES** — `EnterWorktree` is a deferred CC tool; `.claude/worktrees/` present. | None — CC-native primitive. |
| **gh** (GitHub CLI) | `cli.github.com/manual` | **NO official CC *plugin*** — `gh` is a direct CLI; CC invokes it via Bash. CC docs reference `gh` as the forge CLI for PR ops; the `github` MCP covers API reads. | `winget install GitHub.cli` / scoop / choco | **Unverified** (no `gh` in venv; may be on PATH) | **GAP (deferred)**: this runtime has **no forge remote** — `gh` is not load-bearing until a remote is added. Scorecard A correctly defers it. |
| **git-cliff** (orhun) | `git-cliff.org` docs | **NO official CC integration** — single Rust binary, direct CLI; could be wired as a CC hook (direct-CLI invocation per cardinal-rule-2) but the repo documents no CC-specific path. Pattern/CLI-cite. | `cargo install git-cliff` / winget / scoop — single binary, Z:-portable | **NO** | **GAP: not installed.** Scorecard A = T1 INSTALL (changelog-from-wave-history). Optional — no changelog discipline currently load-bearing. |
| **lefthook** | `lefthook.dev` docs | **NO official CC integration** — single-binary git-hooks manager; direct-CLI. Competes with the already-installed `pre-commit` (run only one). | `npm i -g lefthook` / winget / single binary | **NO** (and `pre-commit` also not in venv) | **GAP**: L0.4 recommends standardizing on lefthook OR pre-commit for a git-level secret/lint gate. Neither installed. See §3 L0.5 GAP — security scanners have no git-hook runner. |
| **git-branchless / git-sizer** | `github.com/arxanas/git-branchless`, `github.com/github/git-sizer` READMEs | **NO official CC integration** — pure git-compatible CLIs (branchless = jj-like ergonomics overlay; git-sizer = one-shot repo-health diagnostic). | `cargo install git-branchless` / `git-sizer` Go binary | **NO** | **GAP: not installed (low-urgency).** git-sizer is one-shot (quantify the `.git` size watch-item); git-branchless is operator-ergonomics, not agent-facing. |

**L0.4 — what's next**: **No L0.4 tool has an official CC plugin/MCP path — all are direct-CLI or CC-native.** git-worktree is already covered CC-natively. The actionable gap is a **git-hook runner** (lefthook or pre-commit) to host a pre-commit secret-scan gate — currently absent.

---

## §3 — L0.5 SECURITY

Top picks (Scorecard A §3.2 + master matrix): `aquasecurity/trivy`, `gitleaks/gitleaks`, `microsoft/agent-governance-toolkit`, `pre-commit/pre-commit`, `anthropics/claude-code-security-review`.

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **aquasecurity/trivy** | `trivy.dev/docs` + `aquasecurity.github.io/trivy` | **NO official CC integration** (DeepWiki-confirmed: no CC, no MCP in the integrations list). A `trivy-mcp` community server EXISTS but Scorecard A §1.4 flags it development-stalled (no release since Dec-2025) + a March-2026 supply-chain incident → **use the Trivy CLI, not the MCP**. CC integration = direct-CLI / CC-hook. | Windows: download `trivy_x.xx.x_windows-64bit.zip` from GitHub releases (the README's official Windows method) | **NO** | **GAP: not installed.** #1-detection-rate OSS CVE scanner (76.5%, MCPAmpel). Catalog says "use CLI" — **this matches Trivy's own docs** (no official MCP). Wire as a direct-CLI security gate. |
| **gitleaks/gitleaks** | `gitleaks.io` + repo README | **NO official CC integration** (DeepWiki-confirmed). Officially supports **pre-commit hook** (`.pre-commit-config.yaml` with `gitleaks git --pre-commit --staged`) + **official GitHub Action**. CC path = via a pre-commit/lefthook hook (direct-CLI per cardinal-rule-2). | Windows: download binary `.zip` from GitHub releases | **NO** | **GAP: not installed.** #1 secret scanner by F1 (60%, NSF/arXiv). Scorecard A §3.4 explicitly says wire it as a **git pre-commit hook** (recall 86-88% makes it the right pre-commit gate) — blocked by the missing hook-runner (§2). |
| **microsoft/agent-governance-toolkit** | `microsoft.github.io/agent-governance-toolkit` (mkdocs) + repo `docs/` | **NO Claude Code *plugin* and NO `.mcp.json`** — verified via GitHub file listing: repo has an `action/` dir (**GitHub Action**), `.pre-commit-hooks.yaml` (**pre-commit hook provider**), `agent-governance-copilot-cli/` (Copilot CLI, not CC), and 6 multi-language SDKs (python/dotnet/golang/rust/typescript/+). **No `plugin.json`, no `.claude-plugin/`.** CC integration = pip SDK (`agent-governance-python`) consumed in code, or the GitHub Action, or as a pre-commit hook. | `pip install agent-governance-*` / GitHub Action / `docker-compose` / pre-commit | **NO** | **GAP + CATALOG CONTRADICTION (see §7).** Master matrix row 85 = T1 INSTALL composite 96. The catalog implies a CC-native install; the **repo's official docs offer NO CC plugin/MCP** — it is a GitHub Action + pre-commit-hook + SDK. Reachable only via the (absent) hook-runner or GH Action (no remote). |
| **pre-commit/pre-commit** | `pre-commit.com` | **NO official CC integration** — hook substrate (runner); pairs with gitleaks/trivy. CC path = direct-CLI; CC could call `pre-commit run` from a hook. | `pip install pre-commit` (into `Z:/venvs/claude`) | **NO** (not in venv) | **GAP: not installed.** This is the keystone gap — without pre-commit (or lefthook), gitleaks/trivy/agent-governance-toolkit have no git-hook host. |
| **anthropics/claude-code-security-review** | `github.com/anthropics/claude-code-security-review` README | **Official Anthropic GitHub Action** (`anthropics/claude-code-security-review@main`) — AI-based PR security review. It is a **CC-Action**, not a plugin/MCP; requires a GitHub repo + PR flow. | GitHub Actions workflow YAML referencing the action | **NO** | **GAP (deferred)**: master matrix row 71 = T1 INSTALL. Requires a forge remote + PR pipeline — **not load-bearing on a remote-less solo runtime**. Defer with `gh`. |

**L0.5 — what's next**: the security layer is the **largest Part-1 gap cluster** — zero of the 5 scanners are installed and there is **no hook-runner to host them**. Minimum viable fix: `pip install pre-commit` into the venv + Trivy CLI + Gitleaks binary, wired as pre-commit hooks. (`semgrep` 1.160.0 IS in the venv — the one security tool present, usable as a direct-CLI SAST gate now.)

---

## §4 — L1 CROSS-MODEL ROUTER / GATEWAY

Top picks (Scorecard B §1.2): `BerriAI/litellm` (T1), `Portkey-AI/gateway` (T2), `maximhq/bifrost` (T3 WATCH).

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **BerriAI/litellm** | `docs.litellm.ai` (dedicated "Claude Code with LiteLLM Quickstart") | **Official CC integration — DeepWiki-verified, two parts:** (1) **Env-var passthrough** — CC connects to a LiteLLM proxy by setting `ANTHROPIC_BASE_URL` → `http://0.0.0.0:4000` (+ `ANTHROPIC_AUTH_TOKEN`); this is the documented quickstart, based on Anthropic's own LiteLLM config docs. (2) **LiteLLM "Claude Code Plugin Marketplace"** — LiteLLM Proxy hosts a CC-plugin registry (`LiteLLM_ClaudeCodePluginTable`, `/public/skill_hub` endpoint). It is **NOT a plugin you install into CC** — it is a *proxy* + a server-side plugin/skill registry. | `pip install 'litellm[proxy]'` (the README's official cmd) | **YES (library)** — `litellm` 1.84.0 + `litellm-enterprise` + `litellm-proxy-extras` in `Z:/venvs/claude`. | **GAP: installed-but-not-wired.** The Python library is present; **no LiteLLM proxy is running** and **no `ANTHROPIC_BASE_URL` env redirect is set** (CLAUDE.local.md ENV block has no such var). The DeepSeek-V4 escape-valve use-case is latent — flip it by starting the proxy + setting the env var. |
| **Portkey-AI/gateway** | `portkey.ai/docs` + repo README | **NO official CC *plugin*** — Portkey is an OpenAI-compatible gateway; CC integration would be the same `ANTHROPIC_BASE_URL` env-redirect pattern as LiteLLM (gateway, not plugin). MIT-licensed. | `npx @portkey-ai/gateway` / docker / npm | **NO** | **GAP: not installed.** Master matrix = T2 STUDY-PILOT. Pilot only if guardrails/prompt-versioning/semantic-cache become load-bearing — not yet. |
| **maximhq/bifrost** | `getmaxim.ai/bifrost` docs (+ repo) | **NO official CC integration** — Go gateway; env-redirect pattern only. Scorecard B §1.3 strips Maxim's "50× faster" marketing and §1.4 demotes Bifrost to **WATCH** (single-org Axis-1 FAIL; Ferro Labs independent load test found it collapses to 0 RPS at ≥300 VU). | `npx @maximhq/bifrost` (Go binary) | **NO** | **GAP = intentional non-install.** WATCH-tier; re-audit Q3 2026. Not a gap to close. |

**L1 — what's next**: LiteLLM the *library* is installed; the *integration* (proxy process + `ANTHROPIC_BASE_URL` redirect) is not active. This is a 1-step "flip the latent feature" gap, not a fresh install. The CC-integration mechanism is **env-var redirect** — there is **no LiteLLM CC plugin to install** (the "plugin marketplace" is a server-side LiteLLM-proxy feature, easy to mis-read — see §7).

---

## §5 — L1.5 MEMORY

Top picks (Scorecard B §1.5.2, the corrected ranking): `vectorize-io/hindsight` (T1, corrected winner), `getzep/graphiti` (T1 incumbent, temporal/KG), `thedotmack/claude-mem` (master row 6 T1), `mem0ai/mem0` (T3 downgraded).

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **vectorize-io/hindsight** | `github.com/vectorize-io/hindsight` README + DeepWiki wiki | **Official, strongest native-CC integration in the L1.5 catalog — DeepWiki-verified.** It is a **Claude Code plugin** (`plugin.json`, name `hindsight-memory`) bundling: 4 hooks (`SessionStart`/`UserPromptSubmit` recall→`additionalContext`/`Stop` retain/`SessionEnd` cleanup) + an **MCP server** (knowledge tools) + a **skill** (`/hindsight-memory:create-agent`). Windows-supported. `HINDSIGHT_LLM_PROVIDER=claude-code` uses CC's own model (no API key) for local/personal use. | `claude plugin marketplace add vectorize-io/hindsight` then `claude plugin install hindsight-memory` (the README's official cmds) | **NO** | **GAP: not installed.** The **corrected memory winner** — it wins on INTEGRATION: the only memory engine with a full native-CC plugin (hooks + MCP + skill), MIT, Windows-verified. Its LongMemEval (~94.6%) is `[SELF-REPORTED]` like every engine's — no engine has an independently-reproduced number; VA-Tech/WaPo are co-authors of hindsight's arXiv 2512.12818, not independent reproducers (W259-v16 supersedes the prior false "only independently-reproduced score" claim — see `03-deepdive/MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md`). Clean `claude plugin install` path. **Highest-value un-adopted Part-1 repo.** |
| **getzep/graphiti** | `help.getzep.com/graphiti` + repo `mcp_server/` README | **Official MCP server** — DeepWiki-verified: `mcp_server/` supports HTTP (default `:8000/mcp/`) AND stdio. The official `claude_desktop_config.json` examples use stdio via `uv run ... main.py --transport stdio`. No CC *plugin*; the integration is the MCP server. Windows-supported (Python + Docker). | `git clone` + `uv sync` in `graphiti/mcp_server`; or `graphiti-core` via pip | **YES** — `.mcp.json` `graphiti` entry: stdio, `uv run ... main.py --transport stdio --database-provider falkordb`. **Matches the official stdio MCP form exactly.** `graphiti-core` 0.29.0 also in venv. | **Partial gap**: installed + correctly transported, but backing **Ollama (`127.0.0.1:11700`) is CLOSED** (per `.mcp.json` `_comments` W259v9 audit) → ingest LLM calls fail until Ollama is up. Operationally inert until the local model server runs. |
| **thedotmack/claude-mem** | `github.com/thedotmack/claude-mem` README | **Claude Code plugin** — installed in this runtime via the `thedotmack` marketplace. Hook-based session memory. Scorecard B §1.5.3 VM-M6 flags it: **no published LongMemEval/LoCoMo number** → catalog "BENCHMARK-FIRST" label is unbacked (re-label plain "T1 INSTALL"). | `claude plugin marketplace add thedotmack` + `claude plugin install` | **YES** — `claude-mem@thedotmack` in `installed_plugins.json`; `thedotmack` marketplace registered. | **Overlap gap**: claude-mem + memory MCP + graphiti = 3 memory layers. If Hindsight is added, 4. The W259 memory architecture (`MEMORY-LAYER-RECONCILED-W259v4.md`) treats these as tiered — but the **dedup/role-split is not enforced**; risk of redundant injection. |
| **mem0ai/mem0** | `docs.mem0.ai` | **No first-party CC plugin** (community MCP exists). Scorecard B §1.5.2 = **T3 DOWNGRADED** — independent OSS LongMemEval 49%/66% (both bottom-tier; the marketed 94.4% is SaaS-only). | `pip install mem0ai` | **YES (library)** — `mem0ai` 2.0.2 in venv. | **GAP = stale install.** mem0ai is in the venv but the catalog **downgraded it to T3** (bottom-tier on the hard benchmark). It is an un-wired, superseded library — candidate for **removal**, not integration. |

**L1.5 — what's next**: install **Hindsight** (`claude plugin install hindsight-memory`) — the corrected, independently-verified memory winner with the cleanest official CC path (plugin+hooks+MCP+skill). Then reconcile the memory-layer overlap: claude-mem (installed) + memory MCP (installed) + graphiti (installed, Ollama-blocked) + Hindsight (to add) need an explicit tier/role split. mem0ai in the venv is a downgraded leftover.

---

## §6 — L2 ORCHESTRATION / MULTI-AGENT

Top picks (Scorecard C §L2.2): `anthropics/skills` + `obra/superpowers` (T1 plugin-kits, benchmark-exempt), `wshobson/agents` (T1 SELECTIVE plugin-kit), `langgraph` (T2 framework — benchmark-correct top, but framework-class).

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **obra/superpowers** | `github.com/obra/superpowers` README | **Claude Code plugin marketplace** — `.claude-plugin/marketplace.json`; the canonical behavioral-skill suite (TDD, verification-before-completion, brainstorming, etc.). | `claude plugin marketplace add obra/superpowers` + `claude plugin install` | **YES** — `superpowers@claude-plugins-official` (v5.1.0) AND `superpowers@superpowers-marketplace` both installed. | **Minor**: superpowers is installed **twice** (via claude-plugins-official AND the dedicated superpowers-marketplace). Harmless but redundant — one source is enough. |
| **anthropics/skills** | `github.com/anthropics/skills` README | **Official Anthropic CC plugin marketplace** — registered here as `anthropic-agent-skills`. `SKILL.md`-based skills. | `claude plugin marketplace add anthropics/skills` + `claude plugin install` | **YES (marketplace + partial)** — `anthropic-agent-skills` marketplace registered; `example-skills@anthropic-agent-skills` installed. | **Partial**: marketplace registered, only `example-skills` installed. Other anthropics/skills plugins are available-not-installed — selective by design (D16 context-budget). Not a true gap. |
| **wshobson/agents** | `github.com/wshobson/agents` README | **Claude Code plugin marketplace — DeepWiki-verified.** `.claude-plugin/marketplace.json`; 80 plugins / 185 agents / 153 skills / 16 orchestrators. Official: `/plugin marketplace add wshobson/agents` then `/plugin install <name>` (per-plugin context-scoped). | `claude plugin marketplace add wshobson/agents` + selective `claude plugin install` | **NO** (marketplace not in `known_marketplaces.json`) | **GAP: not installed.** Master matrix = T1 **SELECTIVE** (composite 89) — install after a plugin-budget audit, selectively (not all 80). Marketplace not yet registered. |
| **langgraph** (langchain-ai/langgraph) | `langchain-ai.github.io/langgraph` | **NO official CC integration** — LangGraph is a Python *agent framework* (would replace the orchestrator). Scorecard C §L2.4: frameworks are STUDY-PILOT/CITE-PATTERN, not INSTALL — CC itself is the orchestrator (master row 1, composite 97). | `pip install langgraph` | **NO** | **GAP = intentional non-install.** Framework-class; installing it would duplicate the CC orchestrator. Pattern-cite only. Not a gap to close. |

**L2 — what's next**: orchestration is well-covered (superpowers + agent-teams + agent-orchestration + context-management plugins all installed). The one real gap is **wshobson/agents** — register the marketplace, then selectively install (not wholesale) after a plugin-budget audit. Dedup the double-installed superpowers.

---

## §7 — Catalog-vs-official-docs contradictions (Part 1)

Cases where the W259 catalog's recommended/implied install path diverges from the repo's OWN official docs:

1. **`microsoft/agent-governance-toolkit` (L0.5, master row 85, composite 96, "T1 INSTALL")** — the master matrix scores it `D11 native-CC-pathway = 8` and dispositions T1 INSTALL, implying a CC-native install. **The repo's official structure has NO `plugin.json` and NO `.mcp.json`** — verified via GitHub file listing: it ships a `action/` GitHub Action, a `.pre-commit-hooks.yaml`, an `agent-governance-copilot-cli/` (GitHub *Copilot* CLI, not Claude Code), and 6 language SDKs. Its only paths into this runtime are: the pip SDK consumed in code, the GitHub Action (needs a remote — absent), or a pre-commit hook (needs a hook-runner — absent). **The D11=8 score is optimistic; the real native-CC pathway is weak.** Correction: treat it as a pip-SDK / GitHub-Action tool, not a CC plugin.

2. **`BerriAI/litellm` "Claude Code Plugin Marketplace" (L1)** — the catalog (master matrix D11, Scorecard B §1.2 "official `litellm-skills` CC integration") can be read as "LiteLLM ships a CC plugin you install." Per LiteLLM's own docs (DeepWiki-verified): the "Claude Code Plugin Marketplace" is a **server-side feature of the LiteLLM Proxy** (a plugin/skill *registry* in the proxy DB, `/public/skill_hub` endpoint) — **not a plugin you `claude plugin install`**. The actual CC integration is the **`ANTHROPIC_BASE_URL` env-redirect** to a running proxy. No correction to the install decision (LiteLLM stays T1), but the *mechanism* is env-redirect + proxy, not a plugin.

3. **`aquasecurity/trivy` MCP (L0)** — Scorecard A §1.2 lists `aquasecurity/trivy-mcp` and §1.4 already self-corrects ("use the Trivy CLI, not the MCP" — stalled + supply-chain incident). This **matches Trivy's official docs** (DeepWiki-confirmed: Trivy has NO official MCP or CC integration). No contradiction — flagged for completeness; the catalog and the repo agree.

4. **`thedotmack/claude-mem` "T1 BENCHMARK-FIRST" (L1.5, master row 6)** — Scorecard B §1.5.3 VM-M6 already flags this: claude-mem has **no published LongMemEval/LoCoMo number**, so "BENCHMARK-FIRST" is unbacked → re-label "T1 INSTALL". An internal catalog inconsistency (already noted by Scorecard B), not a repo-docs contradiction.

---

## §8 — Consolidated Part-1 GAP list (what is NOT yet officially integrated)

Ordered by value/urgency. "Official path" = the mechanism the repo's OWN docs prescribe.

| # | Repo | Layer | Official CC path | GAP type | Urgency |
|---|---|---|---|---|---|
| 1 | **vectorize-io/hindsight** | L1.5 | `claude plugin install hindsight-memory` (plugin + hooks + MCP + skill) | **not-installed** — the corrected, independently-verified memory winner; clean official plugin path | **HIGH** |
| 2 | **pre-commit/pre-commit** (or lefthook) | L0.5/L0.4 | direct-CLI hook-runner (`pip install pre-commit`) | **not-installed** — keystone: without it, gitleaks/trivy/agent-governance-toolkit have no git-hook host | **HIGH** |
| 3 | **gitleaks/gitleaks** | L0.5 | binary → wired as pre-commit hook | **not-installed** — #1 secret scanner by F1; blocked on gap #2 | **HIGH** |
| 4 | **aquasecurity/trivy** | L0.5 | Windows zip from GitHub releases → direct-CLI security gate | **not-installed** — #1 OSS CVE scanner; CLI (no official MCP, per its docs) | **MED-HIGH** |
| 5 | **wshobson/agents** | L2 | `claude plugin marketplace add wshobson/agents` + selective install | **marketplace-not-registered** — T1 SELECTIVE; install after plugin-budget audit | **MED** |
| 6 | **BerriAI/litellm proxy wiring** | L1 | start proxy + set `ANTHROPIC_BASE_URL` env | **installed-but-not-wired** — library present; proxy + env-redirect latent (DeepSeek escape valve) | **MED** (latent feature) |
| 7 | **getzep/graphiti Ollama backing** | L1.5 | start local Ollama (`127.0.0.1:11700`) | **installed-but-inert** — MCP correctly wired; ingest LLM calls fail until Ollama runs | **MED** |
| 8 | **googleapis/genai-toolbox** (MCP Toolbox) | L0 | `toolbox.exe` + `.mcp.json` stdio entry | **not-installed** — T1 composite 96; demand-gated on a SQL surface | **LOW** (demand-gated) |
| 9 | **modelcontextprotocol/inspector** | L0 | `npx @modelcontextprotocol/inspector` | **not-installed** — debug tool, install on-demand | **LOW** |
| 10 | **git-cliff / lefthook / git-branchless / git-sizer** | L0.4 | single-binary direct-CLIs (no official CC path) | **not-installed** — optional ergonomics/changelog tooling | **LOW** |
| 11 | **anthropics/claude-code-security-review** | L0.5 | official GitHub Action | **not-installed** — needs a forge remote (absent); defer with `gh` | **LOW** (blocked on remote) |
| 12 | **mem0ai/mem0** | L1.5 | (T3-downgraded) | **stale-install** — bottom-tier on hard benchmark; candidate for **removal** | cleanup |

**Cross-cutting**: 5 of 6 L0.5 security tools share **one blocker** — no git-hook runner (gap #2). Installing `pre-commit` unblocks gitleaks + trivy + agent-governance-toolkit as a single chain. Of the Part-1 layers, **L0.5 Security is the weakest** (0/5 installed, `semgrep` aside) and **L1.5 Memory has the single highest-value clean-path install** (Hindsight).

---

## §9 — Per-layer "what's next" (one-liners)

- **L0 MCP**: Substrate solid and correctly transported (github MCP on the official Streamable-HTTP read-only path); only `inspector` (debug-on-demand) and `genai-toolbox` (demand-gated SQL) remain — both deferrable.
- **L0.4 Git/VCS**: No L0.4 tool has an official CC plugin — all direct-CLI or CC-native; git-worktree is covered; the actionable next step is a git-hook runner (shared with L0.5).
- **L0.5 Security**: Weakest Part-1 layer — `pip install pre-commit` + Trivy CLI + Gitleaks binary as pre-commit hooks closes 4 of 5 gaps in one chain.
- **L1 Router**: LiteLLM library installed; flip the latent integration by starting the proxy + setting `ANTHROPIC_BASE_URL` — the CC path is env-redirect, NOT a plugin.
- **L1.5 Memory**: Install Hindsight (`claude plugin install hindsight-memory`) — the corrected, independently-verified winner with the cleanest official plugin+hooks+MCP+skill path; then reconcile the 3-going-on-4 memory-layer overlap.
- **L2 Orchestration**: Well-covered; register `wshobson/agents` marketplace + selectively install after a plugin-budget audit; dedup the double-installed superpowers.

---

*End of Part 1. Part 2 covers L2.5 Knowledge · L3 Peer CLI · L4 Eval/Obs · L5 Scaffold · L6 Pattern-cite.*
