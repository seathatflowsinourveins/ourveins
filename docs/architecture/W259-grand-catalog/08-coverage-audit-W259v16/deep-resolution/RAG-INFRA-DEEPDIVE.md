# MAX-DEPTH Gap Resolution — RAG / Infra / Security Deep-Dive (W259-v16)

> **Mission.** The W259-v16 coverage audit (`05-scoring/MASTER-SCORING-MATRIX-W259.md §5` + `08-coverage-audit-W259v16/`) surfaced 22 catalog-completeness gaps and gave each a QUICK disposition. This document takes 4 of those gap repos to MAX DEPTH — each deep-dived via **primary source** (actual repo tree, README, LICENSE file, SKILL.md / plugin.json, GitHub API metadata, DeepWiki architecture Q&A) — and confirms or revises its quick disposition with hard evidence.
>
> **Repos.** `HKUDS/LightRAG` (RAG) · `HKUDS/RAG-Anything` (multimodal RAG) · `j178/prek` (Rust pre-commit replacement) · `tensorzero/tensorzero` (Rust LLM gateway). The coverage audit flagged `j178/prek` as the **HIGHEST-FIT gap** for this runtime → deepest dive.
>
> **Method.** Primary-source verification 2026-05-16/17: `mcp__github__get_file_contents` (repo trees + LICENSE + README + SKILL.md + plugin.json), `mcp__github__search_repositories` (live metadata: stars/pushed_at/license/archived), `mcp__deepwiki__ask_question` (architecture), `mcp__github__search_code` (MCP-server / plugin-pathway probes). `mcp__repomix__pack_remote_repository` was attempted but returned 0 files for every repo (MCP defect this session) — substituted with direct GitHub API file pulls, which is equivalent or stronger (exact file bytes, not a packed summary).
>
> **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Constituents: GitHub API live metadata (2026-05-16/17) + verbatim repo files (LICENSE, README.md, SKILL.md, plugin.json, docs/*.md) + DeepWiki architecture Q&A.

---

## §0 — Headline verdict

> **Of the 4 deep-dived repos, exactly ONE deep-dives as genuinely INSTALL-grade for this runtime: `j178/prek`.** The other 3 confirm their quick non-install dispositions with hard evidence. One quick-disposition **revision**: `tensorzero` was scored "WEAK native-CC pathway — no first-party plugin/skill found"; primary source shows a first-party `.claude-plugin/plugin.json` **does exist** — but its only skill is a verbatim "TODO / pre-release placeholder", so the *functional* conclusion (no usable CC pathway today) is unchanged. The audit's bottom line ("0 of 22 require an install") is **revised**: prek is an INSTALL-NOW recommendation.

| Repo | ★ (2026-05-16) | License (from LICENSE file) | Quick disposition | **MAX-DEPTH resolution** | Changed? |
|---|--:|---|---|---|---|
| **`j178/prek`** | 7,642 | **MIT** (verified) | STUDY-PILOT (highest-fit gap) | **INSTALL-NOW** ⚑ | **UPGRADED** |
| `tensorzero/tensorzero` | 11,372 | **Apache-2.0** (verified) | STUDY-PILOT | **STUDY-PILOT** (unchanged disposition; one factual correction logged) | factual fix only |
| `HKUDS/LightRAG` | 35,284 | **MIT** (verified) | T3 CITE-PATTERN / T2 STUDY-PILOT | **CITE-PATTERN** (catalog row; no install) | confirmed |
| `HKUDS/RAG-Anything` | 20,282 | **MIT** (verified) | T3 CITE-PATTERN-ONLY | **CITE-PATTERN-ONLY** (catalog row; no install) | confirmed |

---

## §1 — `j178/prek` ⚑ INSTALL-NOW (highest-fit gap, deepest dive)

### 1.1 — Source-verified identity & metadata

- **Repo**: `https://github.com/j178/prek` — "⚡ A fast Git hook manager written in Rust, designed as a drop-in alternative to pre-commit, reimagined." (GitHub API `description`, 2026-05-16).
- **Metadata (GitHub API, verbatim)**: `stargazers_count: 7642` · `forks_count: 210` · `open_issues_count: 72` · `created_at: 2024-10-07` · `pushed_at: 2026-05-15` · `language: Rust` · `archived: false` · `default_branch: master`.
- **License**: **MIT** — verified by reading the actual `LICENSE` file (`SHA 345dbe46…`): *"MIT License — Copyright (c) 2024 j178"*. The repo also carries a `licenses/` directory (third-party dependency licenses, standard Rust-ecosystem hygiene). MIT is OSI-clean and identical to the runtime's other installed tooling.
- **Maintenance velocity**: `pushed_at` 2026-05-15 (≤2 days before audit); `CHANGELOG.md` is 84 KB; current release line `v0.4.0`. Single primary maintainer (`j178`) — *but the org-strength signal is downstream adoption* (see 1.4).

### 1.2 — Real capabilities (verified from `docs/` tree, not README marketing)

Read from primary source — `docs/compatibility.md`, `docs/diff.md`, `docs/builtin.md`, `skills/prek/SKILL.md`:

- **Drop-in pre-commit replacement.** `docs/compatibility.md` (verbatim): *"Existing `.pre-commit-config.yaml` and `.pre-commit-config.yml` files work in `prek`."* Upstream command spellings (`prek install`, `prek run`, `prek autoupdate`) are kept as compatibility aliases. The ONLY unimplemented upstream command is `pre-commit hazmat` (v4.5.0, explicitly "niche").
- **Single binary, zero runtime.** `docs/diff.md` + README "Features": *"A single binary with no dependencies, does not require Python or any other runtime."* This is the load-bearing differentiator vs the incumbent `pre-commit` (which is a Python package).
- **Rust-native builtin hooks** (`docs/builtin.md`): two paths — (1) an *automatic fast path* that transparently replaces `pre-commit/pre-commit-hooks` Python hooks with Rust implementations, and (2) explicit `repo: builtin` for offline/zero-network hooks. 20+ builtins including `detect-private-key`, `check-merge-conflict`, `check-added-large-files`, and — notably — **`check-illegal-windows-names`** (flags `CON`/`PRN`/`AUX`/reserved chars), a Windows-specific safety hook the incumbent does not bundle.
- **Supply-chain hardening** (`docs/diff.md` §`prek auto-update`, verbatim): `prek auto-update` *"validates pinned SHA revisions against fetched upstream refs, including impostor-commit detection"*; supports `--cooldown-days` to *"skip releases newer than the specified number of days"*; `--check` fails CI on frozen-reference mismatch. This directly mitigates the supply-chain-attack class (the March-2026 Trivy compromise cited across W259) — capabilities the incumbent `pre-commit autoupdate` lacks.
- **Workspace/monorepo mode, parallel hook execution by `priority`, `prek.toml` native config, `prek util yaml-to-toml` migration helper.** Not load-bearing for this single-repo runtime but free upside.

### 1.3 — Native-CC pathway (VERIFIED PRESENT)

The repo tree has a top-level `skills/` directory → `skills/prek/SKILL.md` (8,141 bytes, `SHA f6c79548…`). Read verbatim, its frontmatter is a valid Claude-Code Agent Skill:

```
---
name: prek
description: Use when setting up or running hooks with prek in any repository. prek is a Rust
  drop-in alternative to pre-commit for running Git hooks that check, format, lint, and validate
  code and repository files. Prefer it when speed, workspace mode, built-in hooks, shared
  toolchains, or native TOML configuration matter.
---
```

The skill body is a complete, agent-oriented operating guide (config authoring, command guide, builtin guidance, default workflow). README documents installation via `gh skill install j178/prek prek` (`gh` v2.90.0+). **This is a genuine first-party native-CC pathway** — and it is *additive* to the install decision: prek's primary value here is as a **direct-CLI security-gate primitive** (cardinal-rule-2 compliant: a direct upstream-CLI invocation), with the skill as a bonus the operator may install separately.

### 1.4 — Windows compatibility (VERIFIED — strong)

prek is **first-class on Windows**, verified from README install matrix:
- Standalone Windows installer: `powershell -ExecutionPolicy ByPass -c "irm https://github.com/j178/prek/releases/download/v0.4.0/prek-installer.ps1 | iex"`.
- **`scoop install main/prek`** and **`winget install --id j178.Prek`** — both native Windows package managers.
- Also `uv tool install prek`, `cargo binstall prek`, conda-forge, npm (`@j178/prek`), Nix.
- `docs/builtin.md` ships `check-illegal-windows-names` (Windows-reserved-name detection) — the maintainer actively supports the Windows case.
- A single self-contained Rust binary has **no Python-on-PATH / venv-activation fragility** — a real Windows-portability win for a `Z:`-portable runtime.

### 1.5 — Downstream adoption (the org-strength substitute)

README "Who is using prek?" lists production adopters with star counts — verified high-credibility orgs: **CPython** (72k★), **Apache Airflow** (45k★), **FastAPI** (97k★), **astral-sh/ruff** (47k★), **astral-sh/ty**, **getsentry/sentry** (43k★), **godotengine/godot** (110k★), **home-assistant/core** (86k★), **prowler-cloud/prowler** (13k★), **pdm**, **pyodide**, **python-telegram-bot**. ≥3 strong orgs run it in production — this satisfies the W259 "low-star repos rarely matter unless part of a strong org" filter via *downstream adoption* rather than a single owning org.

### 1.6 — Duplication vs the installed stack & swap-risk analysis

The runtime's current security gate is `.pre-commit-config.yaml` driving 3 hook repos via the incumbent `pre-commit` (Python): `gitleaks` v8.30.1, `ruff-pre-commit` v0.15.12 (`ruff-check` + `ruff-format`), `actionlint` v1.7.12. **prek does not duplicate gitleaks/ruff/actionlint — it replaces the *runner* underneath them.** The exact same `.pre-commit-config.yaml` (including the `exclude:` block and `pass_filenames: false` on gitleaks) is consumed unchanged by prek.

**Swap is LOW-RISK and reversible:**
- **Compatibility**: prek reads the existing config verbatim (`docs/compatibility.md` — confirmed). No `.pre-commit-config.yaml` edit required.
- **The swap itself**: `winget install --id j178.Prek` (or `scoop`), then `prek install -f` to re-write the Git hook shims in `.git/hooks/`. The incumbent `pre-commit` can stay installed; only the shim changes.
- **Revert**: `pre-commit install -f` re-installs the Python shims. <1 min, no data loss — satisfies `cardinal-rule-9` install-risk discipline.
- **Net gain for this runtime**: (a) removes the Python-runtime dependency from the commit-time critical path (relevant on a `Z:`-portable Windows install where Python-on-PATH is an environmental assumption); (b) adds **impostor-commit detection + `--cooldown-days`** to `auto-update` — a real supply-chain-hardening upgrade to the security gate the operator explicitly asked about; (c) faster commits (Rust + parallel-by-priority + shared toolchains).
- **Caveat (honest)**: prek is `v0.x` (pre-1.0) and single-maintainer. The mitigation is the reversibility above + the fact that the *config and hook repos are unchanged* — a prek defect degrades to "re-install pre-commit shims", never to "security gate silently off". Recommend the operator pin the prek version (winget/scoop both pin) and keep `pre-commit` installed as the instant fallback.

### 1.7 — DEFINITIVE resolution: **INSTALL-NOW** ⚑

> **prek is the one repo in this deep-dive that crosses the install threshold for this runtime.** It is MIT (clean), Windows-native (winget/scoop/installer.ps1), a verified drop-in for the existing `.pre-commit-config.yaml`, production-proven by ≥3 top-tier orgs, actively maintained, ships a valid first-party CC skill, and — decisively — its `auto-update` adds supply-chain hardening (impostor-commit detection, pinned-SHA validation, cooldown) that is a genuine security upgrade over the incumbent. The swap is low-risk and reversible in <1 min. This **revises** the W259-v16 ledger line "0 of 22 require an install" and the §5 quick disposition STUDY-PILOT → **INSTALL-NOW**.
>
> **Recommended action**: install prek via `winget install --id j178.Prek`; run `prek install -f` to swap the Git shims; keep `pre-commit` installed as the instant fallback; pin the prek version. Optionally adopt `prek auto-update --cooldown-days <N>` for hardened hook-revision bumps. The `.pre-commit-config.yaml` needs no change.

---

## §2 — `tensorzero/tensorzero` — STUDY-PILOT (disposition unchanged; one factual correction)

### 2.1 — Source-verified identity & metadata

- **Repo**: `https://github.com/tensorzero/tensorzero` — "open-source LLMOps platform that unifies an LLM gateway, observability, evaluation, optimization, and experimentation" (GitHub API).
- **Metadata (GitHub API, verbatim)**: `stargazers_count: 11372` · `forks_count: 828` · `open_issues_count: 386` · `created_at: 2024-07-16` · `pushed_at: 2026-05-16` · `language: Rust` · `archived: false`.
- **License**: **Apache-2.0** — verified by reading the actual `LICENSE` file (`SHA 261eeb9e…`, full Apache-2.0 text). This is **cleaner than LiteLLM's open-core NOASSERTION** — a real licensing point in tensorzero's favour. (Note: the repo also carries a `CLA.md` — a contributor licence agreement, standard for VC-backed OSS; it does not affect *use* of the Apache-2.0 artifact.)

### 2.2 — Real capabilities (verified from README)

A unified Rust LLMOps platform: (1) **Gateway** — one OpenAI-compatible API across Anthropic/Bedrock/Azure/OpenAI/Gemini/vLLM/Ollama/etc., with routing, retries, fallbacks, load-balancing; benchmarked `<1ms p99 latency`. (2) **Observability** — inferences + feedback stored in your own ClickHouse DB; OTLP + Prometheus export. (3) **Evaluation** — heuristic + LLM-judge evals. (4) **Optimization** — SFT/RLHF/GEPA prompt optimization, DICL. (5) **Experimentation** — built-in A/B testing. Deploys as Docker containers + ClickHouse. README claims production use "from frontier AI startups to the Fortune 10, ~1% of global LLM API spend".

### 2.3 — Native-CC pathway — **CORRECTION to the coverage audit**

The W259-v16 coverage audit (`INFRA-SECURITY-GIT-ROUTING-COVERAGE.md` GAP c-1) scored tensorzero's native-CC pathway as: *"WEAK — no first-party CC plugin/skill found."* **Primary source partially contradicts this.** The repo tree has `for-agents/plugins/tensorzero/.claude-plugin/plugin.json` (`SHA b2d44d8c…`), verbatim:

```json
{
  "name": "tensorzero",
  "description": "TensorZero",
  "version": "2026.5.1",
  "skills": "./skills/"
}
```

A first-party `.claude-plugin/plugin.json` **does exist** — the audit's "no first-party CC plugin found" is factually wrong. **However**, the *functional* conclusion is unchanged: the plugin ships exactly one skill, `for-agents/plugins/tensorzero/skills/deploy/SKILL.md` (198 bytes), whose entire body is verbatim:

```
---
name: deploy
description: Deploy TensorZero
---
TODO: Implement deploy skill
Respond to the user with only "This is a pre-release placeholder skill. Please upgrade your `tensorzero` plugin.".
```

So tensorzero has a **scaffolded-but-empty** CC plugin (a placeholder, self-described "pre-release"). The audit's *disposition* ("WEAK pathway → not an install candidate") stands; only the supporting claim needs the correction logged here: the pathway is "scaffold present, non-functional" rather than "absent".

### 2.4 — Windows compatibility

tensorzero deploys as Docker containers (gateway + ClickHouse + UI). Docker-on-Windows works, but this is a **multi-container service stack**, not a portable binary — heavier than the runtime's Windows-portable design favours. No Windows-native single-binary path.

### 2.5 — Duplication vs the installed stack

tensorzero's gateway role **overlaps the catalogued L1 router** — the runtime's catalogued L1 pick is **LiteLLM** ("recommended, not deployed"). tensorzero is the 2nd-most-starred OSS gateway after LiteLLM, and is genuinely *differentiated* (built-in optimization loop: collect inference data → run evals → improve routing — a capability LiteLLM lacks; plus Rust sub-ms p99 vs LiteLLM's ~8ms, though that latency edge is irrelevant at solo+5 scale per the audit's own SCORECARD-B §1.2 reasoning). But it occupies the **same architectural slot** as the not-yet-deployed LiteLLM — adopting tensorzero would be choosing a different L1, not filling a gap. Org-diversity is thin (single org, TensorZero Inc., $7.3M seed).

### 2.6 — DEFINITIVE resolution: **STUDY-PILOT** (unchanged)

> **Disposition unchanged from the W259-v16 quick call: STUDY-PILOT, not install.** tensorzero is a strong, Apache-2.0, actively-maintained Rust LLMOps platform and a legitimate SOTA peer of LiteLLM — it belongs in the catalog's L1 router table (the audit already adds it). But (a) it occupies the same slot as the catalogued-but-undeployed LiteLLM — it is an *alternative*, not a *gap-filler*; (b) its native-CC plugin is a verified placeholder ("TODO / pre-release"), so there is no working CC integration today; (c) it is a multi-container Docker service, heavier than the runtime's Windows-portable shape. **Logged correction for the catalog**: replace "no first-party CC plugin found" with "scaffolded `.claude-plugin/plugin.json` present but ships only a placeholder skill — functionally no usable CC pathway yet; re-check when the plugin exits pre-release." Re-pilot trigger: tensorzero's CC plugin ships real skills AND the operator decides to deploy an L1 router AND tensorzero's optimization-loop is judged to beat LiteLLM for this runtime's needs.

---

## §3 — `HKUDS/LightRAG` — CITE-PATTERN (catalog row; confirmed no install)

### 3.1 — Source-verified identity & metadata

- **Repo**: `https://github.com/HKUDS/LightRAG` — "[EMNLP2025] LightRAG: Simple and Fast Retrieval-Augmented Generation".
- **Metadata (GitHub API, verbatim)**: `stargazers_count: 35284` · `forks_count: 4992` · `open_issues_count: 230` · `created_at: 2024-10-02` · `pushed_at: 2026-05-16` · `language: Python` · `archived: false`. PyPI: `lightrag-hku`.
- **License**: **MIT** — verified from the actual `LICENSE` file (`SHA ff0c29b4…`, MIT, 1,070 bytes). Clean.
- **Org**: HKUDS (Hong Kong University Data Science lab) — strong academic org; EMNLP-2025 paper (`arXiv:2410.05779`). Active sibling family: RAG-Anything, VideoRAG, MiniRAG.

### 3.2 — Real capabilities & architecture (verified via DeepWiki + repo tree)

LightRAG is a dual-level (local + global) GraphRAG engine. DeepWiki architecture Q&A confirms a **4-storage-plane design**: `KV_STORAGE` · `VECTOR_STORAGE` · `GRAPH_STORAGE` · `DOC_STATUS_STORAGE`, each pluggable. Verified backend implementations: vector — NanoVectorDB (default), pgvector, Milvus, Chroma, FAISS, Qdrant, Mongo, OpenSearch; graph — NetworkX (default), Neo4j, Postgres-AGE, Memgraph, OpenSearch. LLM bindings: OpenAI / Azure / Ollama / Bedrock / Gemini / lollms. Ships a `LightRAG Server` (FastAPI + Web UI + knowledge-graph visualiser) and an **Ollama-compatible API** (so chat UIs like Open WebUI can treat it as a model). Repo tree confirms heavyweight deployment surface: `Dockerfile`, `docker-compose-full.yml`, `k8s-deploy/`, a `lightrag_webui/` (bun-built React frontend), interactive `make env-*` setup wizards. README's own paper table shows LightRAG beating NaiveRAG/RQ-RAG/HyDE and roughly tying Microsoft GraphRAG.

### 3.3 — Native-CC pathway — **VERIFIED ABSENT**

Primary-source probe: `mcp__github__search_code repo:HKUDS/LightRAG path:lightrag mcp` → **0 results**. DeepWiki Q&A, verbatim: *"LightRAG does not ship a Model Context Protocol (MCP) server, a Claude Code plugin, or any native agent-skill integration."* The repo tree has a `.clinerules/` dir and a `CLAUDE.md` — but those are *contributor guidance for people hacking on LightRAG itself*, **not** a consumable plugin/skill/MCP for an external CC runtime. The only programmatic integration surface is the REST API + the Ollama-compatible endpoint. **No native-CC pathway.**

### 3.4 — Windows compatibility

Pure Python (3.10), `uv`-managed; DeepWiki confirms Windows-compatible and the README gives explicit Windows venv-activation instructions. The WebUI requires a `bun` build step. Workable on Windows, but the full-stack (server + DB backends + WebUI + Docker) is heavy.

### 3.5 — Duplication vs the installed stack

This is the decisive point. The runtime **already runs a 5-tier memory/RAG stack** — hindsight + graphiti (temporal KG on FalkorDB) + memory-MCP (sqlite_vec) + cognee-as-option. LightRAG is a **GraphRAG engine occupying the same KG-retrieval slot** the catalog already fills with graphiti + cognee + nano-graphrag. Per `RAG-RETRIEVAL-COVERAGE.md §3` it was a *record-keeping* gap (discovery-listed in `MISSED-ROUND2` row 93, never tiered) — not an architecture gap. Installing LightRAG would add a **second, redundant** GraphRAG engine.

### 3.6 — DEFINITIVE resolution: **CITE-PATTERN** (catalog row; no install)

> **Confirmed non-install. Resolution: add a scored CITE-PATTERN catalog row** (closing the §5 record-keeping gap) and move on. LightRAG is a genuinely strong, MIT, EMNLP-2025, 35k★ GraphRAG engine — but it has **no native-CC pathway** (verified absent via code-search + DeepWiki), it is a **heavyweight full-stack** deployment, and it is **architecturally redundant** with the runtime's already-installed graphiti/cognee KG-retrieval tier. The valuable, portable asset is its *dual-level local+global retrieval pattern* — cite that in the catalog; do not install the engine. This **confirms** the W259-v16 quick disposition (T3 CITE-PATTERN / STUDY-PILOT) at the CITE-PATTERN end.

---

## §4 — `HKUDS/RAG-Anything` — CITE-PATTERN-ONLY (catalog row; confirmed no install)

### 4.1 — Source-verified identity & metadata

- **Repo**: `https://github.com/HKUDS/RAG-Anything` — "RAG-Anything: All-in-One RAG Framework" (multimodal). `arXiv:2510.12323`.
- **Metadata (GitHub API, verbatim)**: `stargazers_count: 20282` · `forks_count: 2331` · `open_issues_count: 100` · `created_at: 2025-06-06` · `pushed_at: 2026-05-11` · `language: Python` · `archived: false`. PyPI: `raganything`.
- **License**: **MIT** — verified from the actual `LICENSE` file (`SHA b3ba37ce…`, MIT, 1,088 bytes). Clean.
- **Org**: HKUDS — same lab as LightRAG. README badge "⚡ Based on LightRAG" — RAG-Anything is the **multimodal sibling built on top of LightRAG**.

### 4.2 — Real capabilities & architecture (verified from repo tree + README)

All-in-one **multimodal** RAG: end-to-end ingest + retrieval across text, images, tables, and equations (PDFs, Office docs, images, formulas). The package (`raganything/` in the tree) wraps LightRAG's graph+vector retrieval and adds a multimodal document-parsing pipeline. Repo tree is leaner than LightRAG's (no WebUI, no k8s-deploy) — `raganything/` package + `examples/` + `docs/` + `requirements.txt` + `setup.py` + a small `.pre-commit-config.yaml`. Created 2025-06; younger than LightRAG.

### 4.3 — Native-CC pathway — **VERIFIED ABSENT**

Repo tree inspected in full at HEAD: **no `.claude-plugin/` directory, no `skills/` directory, no `SKILL.md`, no MCP server, no `.mcp.json`.** It is a plain Python library (`pip install raganything`) consumed programmatically. **No native-CC pathway** — same finding as its LightRAG parent.

### 4.4 — Windows compatibility

Pure Python; inherits LightRAG's Windows compatibility. Multimodal parsing pulls heavier optional dependencies (document/image/table parsers) — workable on Windows but a non-trivial dependency footprint.

### 4.5 — Duplication vs the installed stack & fit

Multimodal RAG (text + image + table + equation) is **not a current load-bearing need** for this CC-runtime. The runtime's catalogued document-AI slot (Docling / markitdown / Unstructured) covers text+table ingest; the GraphRAG slot is held by graphiti/cognee. RAG-Anything's distinctive value — *multimodal* ingest — has no current consumer in this runtime. Per `RAG-RETRIEVAL-COVERAGE.md §3` G2 it was a genuine catalog *tree* miss (not catalogued anywhere) — but a low-priority one.

### 4.6 — DEFINITIVE resolution: **CITE-PATTERN-ONLY** (catalog row; no install)

> **Confirmed non-install. Resolution: add a new T3 CITE-PATTERN-ONLY catalog row** (closing the genuine §3 tree-miss) and move on. RAG-Anything is a clean MIT, 20k★, actively-maintained multimodal RAG framework — but it has **no native-CC pathway** (verified absent), it is **built on LightRAG** (which is itself redundant with the installed graphiti/cognee tier), and **multimodal RAG is not a load-bearing need** for this runtime. Cite the all-in-one multimodal-ingest pattern in the catalog; install only if a future arc makes a multimodal corpus load-bearing. This **confirms** the W259-v16 quick disposition exactly.

---

## §5 — Consolidated resolution register

| # | Repo | ★ | License (LICENSE-file verified) | Native-CC pathway (primary-source verified) | Windows-compat | Maintenance | Quick disp. | **MAX-DEPTH resolution** |
|---|---|--:|---|---|---|---|---|---|
| 1 | **`j178/prek`** | 7,642 | MIT | **YES** — `skills/prek/SKILL.md` valid CC skill + `gh skill install`; also direct-CLI (cardinal-rule-2) | **Strong** — winget/scoop/installer.ps1; single Rust binary; `check-illegal-windows-names` builtin | Active (pushed 2026-05-15); v0.4.0; ≥3 top-tier orgs in prod | STUDY-PILOT | **INSTALL-NOW** ⚑ |
| 2 | `tensorzero/tensorzero` | 11,372 | Apache-2.0 | **Scaffold present, non-functional** — real `.claude-plugin/plugin.json` BUT only skill is a verbatim "TODO / pre-release placeholder" | Docker multi-container; no native single-binary | Active (pushed 2026-05-16); 386 open issues | STUDY-PILOT | **STUDY-PILOT** (unchanged; audit's "no plugin found" corrected to "placeholder plugin") |
| 3 | `HKUDS/LightRAG` | 35,284 | MIT | **NO** — verified absent (code-search 0 hits + DeepWiki) | Pure Python; WebUI needs bun; heavy full-stack | Active (pushed 2026-05-16); EMNLP-2025 | T3 CITE / STUDY-PILOT | **CITE-PATTERN** (catalog row; redundant w/ graphiti+cognee) |
| 4 | `HKUDS/RAG-Anything` | 20,282 | MIT | **NO** — verified absent (full tree inspected) | Pure Python; heavy multimodal deps | Active (pushed 2026-05-11) | T3 CITE-PATTERN-ONLY | **CITE-PATTERN-ONLY** (catalog row; multimodal not load-bearing) |

### §5.1 — Recommended catalog actions (non-install bookkeeping)

1. **`RAG-RETRIEVAL-COVERAGE.md` §3** — promote `HKUDS/LightRAG` from discovery-list to a dispositioned **CITE-PATTERN** row; add `HKUDS/RAG-Anything` as a new **CITE-PATTERN-ONLY** row. (Already recommended by that audit; this deep-dive confirms both at the CITE end with primary-source evidence.)
2. **`INFRA-SECURITY-GIT-ROUTING-COVERAGE.md` GAP c-1 (tensorzero)** — correct the native-CC-pathway line: "no first-party CC plugin found" → "scaffolded `.claude-plugin/plugin.json` present (`version 2026.5.1`) but ships only a placeholder `deploy` skill ('TODO / pre-release') — functionally no usable CC pathway yet." Disposition STUDY-PILOT stands.
3. **`INFRA-SECURITY-GIT-ROUTING-COVERAGE.md` GAP b-1 / §FINAL G1 (prek)** and **`W259v16-GAP-RESOLUTION-LEDGER.md`** — **revise prek STUDY-PILOT → INSTALL-NOW**, and revise the ledger's "0 of 22 require an install" to "1 of 22 (prek) recommended for install" (see §1.7). The pilot question has been answered by this deep-dive: prek *is* a credible, low-risk drop-in `pre-commit` replacement on Windows and *does* improve the runtime's security gate.

---

## §6 — DEFINITIVE bottom-line

> **MAX-DEPTH primary-source dive of 4 W259-v16 coverage-audit gap repos. 3 of 4 confirm their non-install quick dispositions with hard evidence — `LightRAG` and `RAG-Anything` are clean MIT GraphRAG-family engines with NO native-CC pathway (verified absent) and architectural redundancy vs the installed graphiti/cognee tier → CITE-PATTERN catalog rows, no install; `tensorzero` is a strong Apache-2.0 Rust LLMOps platform but its CC plugin is a verified placeholder and it duplicates the catalogued LiteLLM slot → STUDY-PILOT unchanged (one factual correction logged).**
>
> **The exception — and the one loud finding — is `j178/prek`.** Deep-dived to primary source, prek is INSTALL-grade for this runtime: MIT, Windows-native (winget/scoop/installer.ps1, single Rust binary, ships a Windows-reserved-name builtin hook), a verified drop-in for the runtime's existing `.pre-commit-config.yaml` (no config edit needed), production-proven by CPython/Airflow/FastAPI/ruff/sentry/godot/home-assistant, actively maintained, ships a valid first-party CC Agent Skill, and — decisively for the operator's stated question — its `auto-update` adds impostor-commit detection + pinned-SHA validation + `--cooldown-days` cooldown, a real supply-chain-hardening upgrade over the incumbent `pre-commit`. The swap (`winget install --id j178.Prek` → `prek install -f`, keep `pre-commit` as fallback) is low-risk and reversible in <1 min. **This revises the W259-v16 ledger: prek moves STUDY-PILOT → INSTALL-NOW, and "0 of 22 require an install" → "1 of 22 (prek) recommended."**

---

**Artifact:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\08-coverage-audit-W259v16\deep-resolution\RAG-INFRA-DEEPDIVE.md`
**Cross-links:** `08-coverage-audit-W259v16/RAG-RETRIEVAL-COVERAGE.md` (LightRAG/RAG-Anything quick dispositions — §3 G1/G2) · `08-coverage-audit-W259v16/INFRA-SECURITY-GIT-ROUTING-COVERAGE.md` (prek GAP b-1/§FINAL G1; tensorzero GAP c-1) · `08-coverage-audit-W259v16/W259v16-GAP-RESOLUTION-LEDGER.md` (the ledger this deep-dive revises) · `05-scoring/MASTER-SCORING-MATRIX-W259.md §5` (rows A5/A6/A19/A20) · `.pre-commit-config.yaml` (the security gate prek would re-run).
