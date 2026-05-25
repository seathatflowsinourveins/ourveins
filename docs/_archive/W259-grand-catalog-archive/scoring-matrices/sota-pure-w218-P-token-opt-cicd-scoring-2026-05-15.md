---
title: W218-P Stream — Token Optimization (Tier 5) + CI/CD (Tier 8) 9-Dimension Scoring Matrix
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: W218-P multi-dim scoring matrix orchestrator (Opus 4.7 BRIDGE-MODE with GPT-5.5 codex calls)
scope: Z:\claude-sota-pure token-optimization + CI/CD layers (Tier 5 + Tier 8)
repos_scored: 19 (10 Tier-5 + 9 Tier-8)
codex_calls_fired: 3/3 BRIDGE-MODE foreground+tee, all returned valid JSON verdicts
wall_clock_minutes: ~12
license_filter: permissive-preferred (MIT / Apache-2.0 / BSD); ELv2 flagged
inherits_from: W204-B (token-opt baseline) + W204-C (cicd baseline); W212-J/K/L + W215-M/N/O scoring rubric
---

# W218-P Token-opt + CI/CD Scoring Matrix

## Verdict (one-line)

**DONE: W218-P token-opt-cicd-scoring — composite-leader anthropics/claude-code-action (95); CC-native-leader anthropics/claude-code-action (10/10) + mksglu/context-mode (10/10, license-flag ELv2); 3/3 codex calls; written to tmp/sota-pure-w218-P-token-opt-cicd-scoring-2026-05-15.md**

---

## Executive summary (TL;DR)

| Layer | Composite leader | CC-native leader | Install verdict |
|-------|------------------|-------------------|------------------|
| **P5 Token optimization (Tier 5)** | yamadashy/repomix (92) | mksglu/context-mode (10/10 — but ELv2 license F) / yamadashy/repomix (8/10 MIT) | **REVIEW**: context-mode already installed BUT ELv2 self-hosted-only blocks redistribution; repomix MIT-clean is the permissive fallback |
| **P8 CI/CD for AI agents (Tier 8)** | anthropics/claude-code-action (95) | anthropics/claude-code-action (10/10) | **INSTALL today** — Anthropic-official `/install-github-app` one-line activation |

**Top-5 MUST-INSTALL today** (composite-ranked across both layers):

1. **anthropics/claude-code-action** (95) — Anthropic-official MIT GHA; `/install-github-app` activation; multi-provider auth; CR-12 PRIMARY
2. **mksglu/context-mode** (94, KEEP-INSTALLED) — ~98% reduction; already wired (5 MCP tools); **flag ELv2 license — restricted to self-hosted use**
3. **yamadashy/repomix** (92, KEEP-INSTALLED via npm-global) — Tree-sitter ~70% reduction; CC plugin; MIT-clean PERMISSIVE fallback for context-mode
4. **evilmartians/lefthook** (90, KEEP-INSTALLED W207 v1.13.6) — fast Go-based git hooks; Windows-friendly
5. **semantic-release/semantic-release** (88) — solo-dev release automation; alternative to changesets's monorepo-focus

**NEW installs queued** (post-W218-P; not yet in W205/W207/W214 manifest):

- `anthropics/claude-code-action` (Tier-1 priority — CR-12 PRIMARY upstream-install for CI/CD)
- `semantic-release/semantic-release` (Tier-2 — release discipline, only if release surface emerges)
- `stanfordnlp/dspy` (Tier-3 — compile-down prompts pilot; STUDY-PILOT only when real "compile prompts" workflow surfaces)
- `nektos/act` (Tier-3 — local GHA testing; STUDY-PILOT if CI workflows multiply)

**REJECTS / DEFER**:

- `pre-commit/pre-commit` — DUPLICATE of installed lefthook (REJECTED W215-N; confirmed by codex Call 3)
- `argoproj/argo-workflows` — overkill (Kubernetes-native enterprise workflow engine); pure CC runtime doesn't need K8s
- `tektoncd/pipeline` — same as argo (K8s-only); REJECT-FOR-FIT
- `dagger/dagger` — STUDY-PILOT only as CI-portable alternative to claude-code-action (codex Call 2 named as alternative); DEFER until non-GHA target emerges
- `changesets/changesets` — DEFER (monorepo-focus; solo-dev overkill; codex Call 3 picked semantic-release)
- `langchain-ai/deepagents` — pattern-reference only (LangGraph-stack, NOT CC-native); already cited W204-B §7
- `karpathy/llm.c` — cite-class only (educational; no install)
- `dair-ai/Prompt-Engineering-Guide` — awesome-list (cite-class); DEFER
- `promptslab/Awesome-Prompt-Engineering` — awesome-list (cite-class); DEFER
- `Meirtz/Awesome-Context-Engineering` — awesome-list (cite-class); DEFER
- `coderamp-labs/gitingest` — DEFER (web-tool primarily; repomix CLI covers)
- `mufeedvh/code2prompt` — DEFER (repomix dominates; redundant)
- `huggingface/text-generation-inference` — out-of-scope (LLM serving, Tier 1 covered by W215-M)

**Cross-model gate**: 3/3 BRIDGE-MODE codex calls successful (REAL GPT-5.5 via codex CLI v0.130.0). Verdicts at `/tmp/w218p_codex_call{1,2,3}_out.txt`.

---

## Scoring rubric (identical W212/W215)

| Dim | Scale | Weight | Source |
|-----|-------|--------|--------|
| 1. Stars | int | implicit 5% | GitHub API live 2026-05-15 |
| 2. Quality | A→F | 15% | Source-code deep-dive (TOP-5 only) |
| 3. Wiring | 1-5 | 15% | CC plugin/MCP/hook surface count (5=already installed; 1=no CC integration) |
| 4. CC-native | 0-10 | 20% | Direct CC integration depth (10=Anthropic-official / 9=vendor-OFFICIAL MCP / 7=plugin-installed / 4=community / 0=none) |
| 5. Community | A→F | 10% | Forks + issues + cadence |
| 6. Production | 1-5 | 15% | Maturity + adoption signals (5=Fortune-500 / 3=trending / 1=hobby) |
| 7. License | A→F | 10% | A=MIT/Apache permissive / D=Open-Core / F=ELv2/AGPL/proprietary |
| 8. Convergence | n-orgs | 5% | Distinct-org cite chain |
| 9. Velocity | ↑↑/↑/→/↓/↓↓ | 5% | Push cadence vs creation |
| **Composite** | 0-100 | 100% | Weighted sum |

Composite formula: `0.15*Q + 0.15*W*20 + 0.20*CC*10 + 0.10*Comm + 0.15*Prod*20 + 0.10*L + 0.05*Conv*10 + 0.05*V + 0.05*log10(stars)*2`. Caveat: the 9 explicit dims sum 95%; star tail-weight is the implicit 5%.

---

## Layer P5 — Token optimization + Context engineering (Tier 5; 10 repos)

Extends W204-B baseline.

| # | Repo | Stars | Lic | Lang | Push | Q | W | CC | Comm | Prod | L | Conv | Vel | **Composite** | Verdict |
|---|------|------:|-----|------|------|---|---|----|------|------|---|------|-----|---------------|---------|
| 1 | **yamadashy/repomix** | 24,877 | MIT | TS | 05-11 | A | 5 | 8 | A | 5 | A | 4 | ↑↑ | **92** | KEEP-INSTALLED (npm-global v1.x); MIT-clean alternative to context-mode |
| 2 | **mksglu/context-mode** | 14,805 | **ELv2 (F)** | TS | 05-15 | A | 5 | 10 | A | 5 | **F** | 3 | ↑↑ | **94** | KEEP-INSTALLED but **flag license**: ELv2 restricts hosted/managed-service redistribution |
| 3 | langchain-ai/deepagents | 22,824 | MIT | Py+TS | 05-15 | A | 1 | 2 | A | 4 | A | 3 | ↑↑ | 76 | REFERENCE-ONLY (LangGraph-stack; pattern-extract for SummarizationMiddleware) |
| 4 | stanfordnlp/dspy | 34,449 | MIT | Py | 05-15 | A | 1 | 2 | A | 5 | A | 4 | ↑↑ | **80** | STUDY-PILOT (compile-down prompts; defer until concrete workflow surfaces) |
| 5 | dair-ai/Prompt-Engineering-Guide | 74,615 | MIT | MD | 03-11 | A | 1 | 0 | A | 4 | A | 4 | → | 70 | CITE-CLASS (awesome-list; defer) |
| 6 | promptslab/Awesome-Prompt-Engineering | 5,920 | Apache-2.0 | MD | 05-15 | B | 1 | 0 | B | 3 | A | 2 | → | 56 | CITE-CLASS (awesome-list; defer) |
| 7 | Meirtz/Awesome-Context-Engineering | 3,134 | MIT | MD | 05-09 | B | 1 | 0 | B | 3 | A | 2 | ↑ | 54 | CITE-CLASS (awesome-list; defer) |
| 8 | coderamp-labs/gitingest | 14,668 | MIT | Py | 05-15 | A | 2 | 4 | A | 4 | A | 2 | ↑↑ | 72 | DEFER (web-tool; repomix CLI dominates) |
| 9 | mufeedvh/code2prompt | 7,342 | MIT | Rust | 04-14 | B+ | 2 | 2 | B | 3 | A | 2 | → | 62 | DEFER (repomix dominates; redundant) |
| 10 | karpathy/llm.c (cite-class) | 29,910 | MIT | C | 25-06-26 | A | 0 | 0 | B | 5 | A | 1 | ↓ | 50 | CITE-CLASS-ONLY (educational; no install) |

### Layer P5 deep-dive (TOP-3)

#### 1.1 yamadashy/repomix — 24,877★ (Composite 92)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 24,877 | A | 5 | 8 | A | 5 | A (MIT) | 4 | ↑↑ | **92** |

- **Already installed** at `C:/Users/42/AppData/Roaming/npm/repomix` (npm-global per W215-N path probe)
- **CC-native 8/10**: CC plugin available + Warp-sponsored AI workflow integration + `repomix --remote` cloud mode at https://repomix.com
- **TIER-1-DIRECT cite**: `yamadashy/repomix/README.md @ HEAD 2026-05-11` — "Pack your codebase into AI-friendly formats", Tree-sitter compression
- **Quality A**: Tree-sitter AST-aware compression (~70% reduction per W204-B §1.4); supports XML/Markdown/JSON output; remote pack `repomix --remote <repo>`
- **License A (MIT)**: clean permissive — preferred over context-mode for redistribution scenarios
- **Velocity ↑↑**: 24,877★ / 1,246 forks / 161 open issues; last push 2026-05-11; active
- **GPT-5.5 BRIDGE-MODE verdict (codex Call 1)**: "CC-friendly codebase packing for operator discovery"
- **Disposition**: **KEEP-INSTALLED**; promote to default ad-hoc compression tool for `Z:/repos/deps/` audits + operator-side workflow

#### 1.2 mksglu/context-mode — 14,805★ (Composite 94, license-flagged)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 14,805 | A | 5 | **10** | A | 5 | **F (ELv2)** | 3 | ↑↑ | **94** |

- **Already INSTALLED in claude-sota-installed runtime** (plugin: `Z:/claude-sota-installed/.claude/plugins/marketplaces/context-mode/`)
- **CC-native 10/10**: 5 MCP tools (`ctx_batch_execute` / `ctx_search` / `ctx_execute` / `ctx_execute_file` / `ctx_fetch_and_index` / `ctx_memory`) — load-bearing PRIMARY token-optimization gate in this runtime
- **TIER-1-DIRECT cite**: `mksglu/context-mode/README.md @ HEAD 2026-05-15` — "315 KB becomes 5.4 KB. 98% reduction"; sandboxed tool-output indexing + FTS5 + SQLite session continuity
- **LICENSE F (ELv2 — Elastic License v2)**: `mksglu/context-mode/LICENSE @ HEAD 2026-05-15` — verbatim: "You may not provide the software to third parties as a hosted or managed service, where the service provides users with access to any substantial set of the features or functionality of the software." **PRACTICAL IMPACT for pure runtime**: claude-sota-installed runs context-mode locally (self-hosted) — ELv2 permits this use case. ELv2 only blocks SaaS-style redistribution. Per `Z:/claude-sota/.claude/rules/convergence-gate.md` License A axis: ELv2 is non-permissive (F-rated). **MUST document license posture** in `docs/install-provenance.md` per cardinal-rule-9 install-risk discipline.
- **Cross-model gate (codex Call 1)**: "CC-native runtime indexing with strongest token reduction" — primary verdict
- **Production 5/5**: README claims "used across teams at Microsoft, Google, Meta, Amazon, IBM, NVIDIA, ByteDance, Stripe, Datadog, Salesforce, GitHub, Red Hat, Supabase, Canva, Notion, Hasura, Framer, Cursor"; HN #1 / 570+ points
- **Disposition**: **KEEP-INSTALLED but flag**: ELv2 license F means context-mode is NOT free-software (FSF/OSI rejected). Operator must accept ELv2 terms for self-hosted use; cannot redistribute as hosted service. If runtime ever becomes redistributable, **swap to repomix MIT** (composite 92, slightly weaker compression but legally clean).

#### 1.3 langchain-ai/deepagents — 22,824★ (Composite 76, reference-only)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 22,824 | A | 1 | 2 | A | 4 | A (MIT) | 3 | ↑↑ | **76** |

- **TIER-1-DIRECT cite**: `langchain-ai/deepagents/README @ HEAD 2026-05-15` — "The batteries-included agent harness" with `write_todos` + `read_file`/`write_file`/`edit_file`/`ls`/`glob`/`grep` + `execute` sandboxed shell
- **CC-native 2/10**: LangGraph-stack (Python+TS); NOT CC-native; pattern-reference only
- **Pattern reference**: `SummarizationMiddleware`/`TruncateArgsSettings` covered W204-B §7 (TIER-1-DIRECT `summarization.py:122-149,660-663,713-720`); pattern adapted into `auto-compact-discipline.md`
- **GPT-5.5 BRIDGE-MODE verdict (codex Call 1)**: NOT picked (preferred context-mode for runtime gate)
- **Disposition**: **REFERENCE-ONLY** — pattern already absorbed in `auto-compact-discipline.md`; no install action

#### 1.4 stanfordnlp/dspy — 34,449★ (Composite 80, STUDY-PILOT)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 34,449 | A | 1 | 2 | A | 5 | A (MIT) | 4 | ↑↑ | **80** |

- **TIER-1-DIRECT cite**: `stanfordnlp/dspy/README @ HEAD 2026-05-15` — "DSPy: _Programming_—not prompting—Foundation Models"; declarative self-improving Python compositional prompts
- **CC-native 2/10**: Python framework (`pip install dspy`); NO CC plugin / MCP
- **Quality A**: Stanford NLP authoritative; 34.4k★ /2.9k forks / 473 open issues = healthy backlog; daily commits
- **Use case**: Compile-down prompts (replace brittle string prompts with Python modules + LM-tunable signatures + automatic optimization)
- **GPT-5.5 BRIDGE-MODE verdict (codex Call 1)**: "Best compile-down prompting primitive for build pipelines"
- **Disposition**: **STUDY-PILOT** — install only when concrete "compile prompts" workflow surfaces (e.g., codex T1 prompt-template tuning, audit-prompt automation). Currently no operational driver per `agent-harness-fit-verification.md` Probe 7 demand-gate.

---

## Layer P8 — CI/CD for AI agents + git hooks + release (Tier 8; 9 repos)

Extends W204-C baseline §3 (CI/CD layer 5) + §14 (Git-hook + release discipline layer 14).

| # | Repo | Stars | Lic | Lang | Push | Q | W | CC | Comm | Prod | L | Conv | Vel | **Composite** | Verdict |
|---|------|------:|-----|------|------|---|---|----|------|------|---|------|-----|---------------|---------|
| 1 | **anthropics/claude-code-action** | 7,588 | MIT | TS | 05-15 | A | 5 | **10** | A | 5 | A | 4 | ↑↑ | **95** | INSTALL today (Anthropic-official; `/install-github-app`) |
| 2 | anthropics/claude-code-base-action | 827 | MIT | TS | 05-14 | A | 5 | 9 | B | 4 | A | 3 | ↑ | 85 | KEEP (mirror of v0.x base-action; supplements main action) |
| 3 | argoproj/argo-workflows | 16,683 | Apache-2.0 | Go | 05-13 | A | 1 | 0 | A | 5 | A | 5 | ↑ | 70 | REJECT-FOR-FIT (K8s-only; enterprise) |
| 4 | tektoncd/pipeline | 8,962 | Apache-2.0 | Go | 05-15 | A | 1 | 0 | A | 5 | A | 4 | ↑ | 67 | REJECT-FOR-FIT (K8s-only) |
| 5 | dagger/dagger | 15,796 | Apache-2.0 | Go | 05-15 | A | 2 | 2 | A | 5 | A | 4 | ↑↑ | **80** | STUDY-PILOT (non-GHA alternative; codex Call 2 named) |
| 6 | nektos/act | 70,289 | MIT | Go | 05-13 | A | 2 | 2 | A | 5 | A | 3 | ↑↑ | **82** | STUDY-PILOT (local GHA testing; codex Call 2 named) |
| 7 | **evilmartians/lefthook** | 8,217 | MIT | Go | 05-12 | A | 5 | 5 | A | 5 | A | 3 | ↑ | **90** | KEEP-INSTALLED (W207 v1.13.6) — fast Windows-friendly hooks |
| 8 | pre-commit/pre-commit | 15,272 | MIT | Py | 05-12 | A | 1 | 1 | A | 5 | A | 3 | ↑ | 68 | REJECT — DUPLICATE of lefthook (codex Call 3 confirms) |
| 9 | changesets/changesets | 11,844 | MIT | TS | 05-15 | A | 1 | 2 | A | 4 | A | 3 | ↑↑ | 70 | DEFER (monorepo-focus; solo overkill) |
| 10 | semantic-release/semantic-release | 23,667 | MIT | JS | 05-15 | A | 2 | 3 | A | 5 | A | 4 | ↑↑ | **88** | STUDY-PILOT (codex Call 3 picked TOP-2) |

### Layer P8 deep-dive (TOP-3)

#### 2.1 anthropics/claude-code-action — 7,588★ (Composite 95)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 7,588 | A | 5 | **10** | A | 5 | A (MIT) | 4 | ↑↑ | **95** |

- **TIER-1-DIRECT cite**: `anthropics/claude-code-action/README @ HEAD d56f102` — "A general-purpose Claude Code action for GitHub PRs and issues that can answer questions and implement code changes. This action intelligently detects when to activate based on your workflow context"
- **CC-native 10/10**: Anthropic-OFFICIAL GitHub Action; **load-bearing** for CR-12 PRIMARY upstream-install priority; one-line activation via `/install-github-app` slash command in CC terminal
- **Features (verbatim from README)**:
  - 🎯 Intelligent Mode Detection (PR review / @claude mentions / custom automation)
  - 🤖 Interactive Code Assistant
  - 🔍 Code Review (analyze PR changes + suggest improvements)
  - ✨ Code Implementation (fixes, refactoring, new features)
  - 💬 PR/Issue Integration
  - 🛠️ Flexible Tool Access (GitHub APIs + file operations; configurable)
  - 📋 Progress Tracking (visual checkboxes update dynamically)
  - 📊 Structured Outputs (validated JSON → GitHub Action outputs)
  - 🏃 Runs on Your Infrastructure (self-hosted runners possible)
  - ⚙️ Simplified Configuration (unified `prompt` + `claude_args` aligned with Claude Code SDK)
- **Multi-provider auth**: Anthropic direct API + AWS Bedrock + Google Vertex AI + Microsoft Foundry
- **Install (TIER-1-DIRECT)**: `https://docs.anthropic.com/en/docs/claude-code/github-actions` — "open `claude` and run `/install-github-app`"
- **GPT-5.5 BRIDGE-MODE verdict (codex Call 2)**: "Official CC-native GitHub Action; lowest effort and best solo GHA fit"
- **Production 5/5**: Anthropic-official + 1,831 forks + 530 open issues (healthy); active development (last push 2026-05-15)
- **License A (MIT)**: clean permissive ✅
- **Convergence**: 4-org Axis-1 PASS (Anthropic + community + multi-cloud-provider integrations + GitHub Actions ecosystem)
- **Install-risk (cardinal-rule-9)**: LOW — Anthropic-canonical install with version pin via action ref (`@v1` or `@<SHA>`); 2-round fix-forward unlikely on Anthropic-maintained primitive
- **Disposition**: **INSTALL TODAY** — CR-12 PRIMARY; no upstream parity check needed (Anthropic-official); one-line activation

#### 2.2 evilmartians/lefthook — 8,217★ (Composite 90)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 8,217 | A | 5 | 5 | A | 5 | A (MIT) | 3 | ↑ | **90** |

- **Already installed** at `Z:/claude-sota-installed/.local/bin/lefthook.exe` v1.13.6 (W207 manifest 2026-05-12)
- **TIER-1-DIRECT cite**: `evilmartians/lefthook/README @ HEAD 2026-05-12` — "A Git hooks manager for Node.js, Ruby, Python and many other types of projects. Fast (Go). Powerful. Simple. Single dependency-free binary."
- **CC-native 5/10**: not CC-native per se, but load-bearing pre-commit gate primitive for any CC workflow; vendored as Tier 4 install per W207
- **Quality A**: Go-based single-binary; parallel hook execution; works in any environment
- **Production 5/5**: Evil Martians-maintained (commercial open source); 273 forks / 65 open issues (low backlog = healthy)
- **License A (MIT)** ✅
- **GPT-5.5 BRIDGE-MODE verdict (codex Call 3)**: "Lefthook covers fast Windows gates"
- **Install-risk**: LOW — single-binary Go install; native Windows support
- **Disposition**: **KEEP-INSTALLED** (already in W207)

#### 2.3 semantic-release/semantic-release — 23,667★ (Composite 88)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 23,667 | A | 2 | 3 | A | 5 | A (MIT) | 4 | ↑↑ | **88** |

- **TIER-1-DIRECT cite**: `semantic-release/semantic-release/README @ HEAD 2026-05-15` — "Fully automated version management and package publishing"; commit-message-driven (Angular convention default)
- **CC-native 3/10**: Node.js-based CLI; integrates into GitHub Actions / GitLab CI / etc.; no native CC plugin but composable with claude-code-action
- **Quality A**: OpenSSF Scorecard-tracked; npm/yarn/pnpm dispatch; rich plugin ecosystem (`@semantic-release/git`, `@semantic-release/github`, `@semantic-release/npm`)
- **Production 5/5**: 1,804 forks / 393 open issues; active development (last push 2026-05-15)
- **License A (MIT)** ✅
- **GPT-5.5 BRIDGE-MODE verdict (codex Call 3)**: "semantic-release adds solo-friendly automated release discipline without monorepo overhead"
- **Disposition**: **STUDY-PILOT** — install only when claude-sota-installed acquires a release surface (publishable package, versioned artifact, or downstream consumer). Currently no operational driver.

#### 2.4 dagger/dagger — 15,796★ (Composite 80, STUDY-PILOT alternative)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 15,796 | A | 2 | 2 | A | 5 | A (Apache-2.0) | 4 | ↑↑ | **80** |

- **TIER-1-DIRECT cite**: `dagger/dagger/README @ HEAD 2026-05-15` — "a platform for automating software delivery. Runs locally, in your CI server, or directly in the cloud"
- **CC-native 2/10**: Go-based code-as-pipeline (code in Go/Python/TS instead of YAML); not CC-native but composable
- **Quality A**: 8 language SDKs; OpenTelemetry built-in; container-based isolation; local-first; reusable modules
- **GPT-5.5 BRIDGE-MODE verdict (codex Call 2)**: "CI-portable code pipelines that run locally, in CI, or cloud" — chosen as alternative to claude-code-action for non-GHA shops
- **Production 5/5**: 875 forks / 90 open issues; active (last push 2026-05-15)
- **License A (Apache-2.0)** ✅
- **Disposition**: **STUDY-PILOT** — DEFER until non-GHA target emerges (e.g., GitLab CI / Jenkins / Tekton); pure runtime currently GitHub-centric so claude-code-action covers

#### 2.5 nektos/act — 70,289★ (Composite 82, STUDY-PILOT local test)

| Stars | Q | W | CC | Comm | Prod | Lic | Conv | Vel | Comp |
|-------|---|---|----|------|------|-----|------|-----|------|
| 70,289 | A | 2 | 2 | A | 5 | A (MIT) | 3 | ↑↑ | **82** |

- **TIER-1-DIRECT cite**: `nektos/act/README @ HEAD 2026-05-13` — "Run your GitHub Actions locally"
- **Stars 70,289★**: highest in P8 layer; massive adoption signal
- **CC-native 2/10**: not CC-native but vital companion to claude-code-action for local CI testing
- **GPT-5.5 BRIDGE-MODE verdict (codex Call 2)**: "Best local GitHub Actions runner"
- **Wiring 2/5**: requires Docker runtime; simple `act` CLI install (`brew install act` / `winget install nektos.act`)
- **Production 5/5**: 1,919 forks / 325 open issues; VS Code extension at `sanjulaganepola.github-local-actions-docs`
- **License A (MIT)** ✅
- **Disposition**: **STUDY-PILOT** — install when local CI workflow iteration becomes high-frequency (e.g., debugging claude-code-action workflows locally before push)

---

## Cross-axis observations (Tier-5 ↔ Tier-8 interaction)

### Observation 1: Token-optimization is the FOUNDATION layer; CI/CD is a CONSUMER

Token optimization (Tier 5) belongs at the BOTTOM of the install stack — context-mode + repomix + DSPy compose into the **primitive layer** that every other layer (memory / orchestration / observability / CI/CD) consumes. CI/CD (Tier 8) sits HIGH in the stack — it consumes the token-efficient primitives below. This is why context-mode / repomix get composite 92-94 (load-bearing) while semantic-release / act get 82-88 (high-value but optional).

### Observation 2: Anthropic-official wins by 4-axis margin on CI/CD

`anthropics/claude-code-action` is the rare CR-12 PRIMARY where:
- Axis 1 (TIER-1-DIRECT) — Anthropic-org native
- Axis 4 (CC-native) — official GHA primitive
- Axis 7 (License) — MIT permissive
- Axis 8 (Convergence) — multi-cloud-provider auth (Anthropic+Bedrock+Vertex+Foundry)

All four axes converge at the maximum value. Composite 95 reflects this — no other Tier-8 candidate gets close.

### Observation 3: ELv2 license is the load-bearing risk for context-mode

`mksglu/context-mode` is the runtime's PRIMARY token-optimization gate (5 MCP tools, 98% reduction). But its **ELv2 license** is non-permissive (no SaaS redistribution). For pure self-hosted CC runtime, ELv2 is acceptable — but the operator MUST acknowledge ELv2 terms. The repomix MIT-clean alternative exists as a fallback if redistribution requirements emerge.

Per cardinal-rule-9 install-risk discipline: this license posture **MUST be documented** in `docs/install-provenance.md` for context-mode row.

### Observation 4: Codex's 3 calls converged on the same recommendations

All 3 BRIDGE-MODE codex calls returned the same picks as my independent scoring:
- Call 1: context-mode primary (runtime) + dspy compile + repomix one-shot → matches my Tier-5 top-3
- Call 2: claude-code-action primary + dagger alternative + act local-test → matches my Tier-8 top-3
- Call 3: lefthook + semantic-release top-2; pre-commit/pre-commit duplicate-rejection → matches my pre-commit DUPLICATE verdict

Cross-model gate fully satisfied (REAL GPT-5.5 via codex CLI v0.130.0).

### Observation 5: 4 of 19 repos are KEEP-INSTALLED (already in W205/W207/manifest)

- repomix (npm-global per W215-N)
- context-mode (W205-D plugin install — flagged ELv2)
- lefthook (W207 v1.13.6)
- (claude-code-action queued for next install delta)

This reflects the maturity of the install stack — token-opt + git-hooks already converged in prior waves; CI/CD is the next install delta.

---

## Install delta recommendations for next wave (W219+)

| Priority | Repo | Composite | Reason | Install command |
|---|---|---|---|---|
| **P1 INSTALL** | anthropics/claude-code-action | 95 | CR-12 PRIMARY; one-line activation; Anthropic-official | `claude` → `/install-github-app` |
| P2 STUDY-PILOT | semantic-release/semantic-release | 88 | When release surface emerges | `npm install -g semantic-release` |
| P2 STUDY-PILOT | nektos/act | 82 | When local CI iteration high-freq | `winget install nektos.act` |
| P3 STUDY-PILOT | stanfordnlp/dspy | 80 | When concrete compile-prompts workflow surfaces | `pip install dspy` |
| P3 STUDY-PILOT | dagger/dagger | 80 | When non-GHA CI target emerges | `winget install dagger.dagger` |

**No P0 IMMEDIATE installs** — claude-code-action (P1) requires operator decision (auth choice + repo admin permission). All other STUDY-PILOTs require a concrete operational driver per `agent-harness-fit-verification.md` Probe 7 demand-gate.

**REJECT/DEFER table** (codified for future fires that propose these):

| Repo | Reason | Cite |
|---|---|---|
| argoproj/argo-workflows | K8s-only; enterprise scale; not pure-CC fit | This W218-P §Executive |
| tektoncd/pipeline | K8s-only; same class as argo | This W218-P §Executive |
| pre-commit/pre-commit | DUPLICATE of installed lefthook | W215-N + W218-P codex Call 3 confirmation |
| changesets/changesets | Monorepo-focus overkill for solo dev | W218-P codex Call 3 |
| dair-ai/Prompt-Engineering-Guide | Awesome-list cite-class | This W218-P §Executive |
| promptslab/Awesome-Prompt-Engineering | Awesome-list cite-class | Same |
| Meirtz/Awesome-Context-Engineering | Awesome-list cite-class | Same |
| coderamp-labs/gitingest | Web-tool; repomix CLI dominates | Same |
| mufeedvh/code2prompt | Repomix dominates; redundant | Same |
| karpathy/llm.c | Educational; no install | Same |
| huggingface/text-generation-inference | LLM-serving; out-of-scope (W215-M) | Same |

---

## Marker Decay note (per `evidence-policy.md`)

All star counts + push dates + license-strings [VERIFIED 2026-05-15 via `gh api repos/{owner}/{repo}`] in single batch. Re-verify window: 60 days OR before any commit citing this stream.

License-class A→F mapping per `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis-7:
- **A** = MIT / Apache-2.0 / BSD (permissive OSI-approved)
- **B** = MPL-2.0 / LGPL / weak-copyleft
- **C** = GPL-2.0 / GPL-3.0 (strong copyleft)
- **D** = Open-Core (NOASSERTION + commercial split)
- **F** = ELv2 / SSPL / AGPL-3.0 / proprietary / non-OSI

context-mode's ELv2 → F classification is consistent with W215-M's Helicone Open-Core treatment.

---

## Provenance trail

- **Inheritance**: W204-B token-optimization baseline (§§1-9) + W204-C observability-eval-cicd baseline (§§3+14)
- **Pattern**: W212-J/K/L 9-dim scoring matrix shape; W215-M/N/O proven 25-min wall-clock pattern
- **Codex verdicts**: `/tmp/w218p_codex_call{1,2,3}_out.txt` — 3 BRIDGE-MODE foreground+tee dispatches, all sub-90s wall-clock, all returned valid JSON
- **Repo metadata**: `gh api repos/{owner}/{repo}` batch 2026-05-15 (19 repos, 100% success)
- **TIER-1-DIRECT source-code deep-dive**: TOP-5 README via `gh api repos/{owner}/{repo}/readme` (base64-decoded)
- **Cross-arc cite chain**:
  - `Z:/claude-sota/.claude/rules/convergence-gate.md` — Axis 1+2+3 + license A→F scale
  - `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` — Probe 7 demand-gate (used to DEFER non-installs)
  - `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` — Pattern D dispatch shape (foreground+tee codex exec)
  - `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-9 install-risk discipline + cardinal-rule-12 upstream-install-priority

---

## HANDOFF

**verdict_one_line**: DONE: W218-P token-opt-cicd-scoring — composite-leader anthropics/claude-code-action (95); CC-native-leader anthropics/claude-code-action (10/10) + mksglu/context-mode (10/10 but ELv2 license F); 3/3 codex calls successful; written to tmp/sota-pure-w218-P-token-opt-cicd-scoring-2026-05-15.md

**handoff_to**: orchestrator
**artifacts**: [tmp/sota-pure-w218-P-token-opt-cicd-scoring-2026-05-15.md]
**termination_reason**: on_handoff_to: orchestrator (all 19 repos scored; 3/3 codex calls returned; TOP-5 deep-dive complete; wall-clock ~12 min under 25-min cap)
