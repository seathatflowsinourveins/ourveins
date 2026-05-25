---
title: W221-A GPT-5.5 Bridge-Mode Ratification - W219 Top-25 + W220 4 Adopt-Candidates
status: NEEDS-REVISION
date: 2026-05-15
artifact-class: cross-model-ratification-sra-d1-d10
target-runtime: Z:/claude-sota-pure
source-runtime: Z:/claude-sota-installed
---

# BRIDGE-MODE-NOTICE

Verdict origin: REAL Codex/GPT bridge-mode ratification in this session; not a Sonnet stand-in. Scope is adoption-plan ratification for `Z:/claude-sota-pure`, using W219/W220/W218 sources plus direct pure-runtime probes. No installs were performed.

Primary source anchors:
- W219 Top-25 matrix: `tmp/wave219-MASTER-SYNTHESIS-comprehensive-checklist-2026-05-15.md:19-46`; install order: `:74-127`; CR-9 gap: `:136`; FM-20 summary: `:144-154`; W220 appendix: `:171-211`.
- W220 meta-catalogs: `tmp/wave220-agentI-meta-catalogs-uncovered-layers-catalog-2026-05-15.md:20-29`; adopt candidates: `:114-117`; duplicate notes: `:87-89,:124-137`.
- W218 Agent C controls: target-runtime drift `tmp/wave218-MASTER-SYNTHESIS-2026-05-15.md:333-339`; license matrix `:340-346`; SRA decomposition `:361-367`; Native-CC flattening `:368-374`; ADOPT-NOW overload `:410-416`.
- SRA lattice: `.claude/rules/sota-research-architecture.md` D1-D10, with user-requested axis names applied.

Legend: `D1 license-use`; `D2 stars/community`; `D3 maturity`; `D4 upstream-parity`; `D5 install-burden`; `D6 harness-fit`; `D7 token-impact`; `D8 industry-adoption`; `D9 reversibility`; `D10 pure-fit`. Aggregate is sum/100.

## 29-Row SRA D1-D10 Decomposition

| rank | repo | layer | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | aggregate | RATIFY-VERDICT |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `langfuse/langfuse` | Observability | 8 open-core OK local | 10 | 9 | 8 complement | 5 compose-heavy | 7 service | 8 trace ROI | 10 | 5 docker+Py drift | 8 | 78 | PILOT-SERVICE |
| 2 | `run-llama/llama_index` | RAG framework | 10 MIT | 10 | 9 | 8 complement | 8 pip | 7 lib-only | 7 RAG ROI | 10 | 8 | 8 | 85 | INSTALL-NOW |
| 3 | `NVIDIA/garak` | Eval red-team | 10 Apache | 8 | 8 | 8 complement | 8 pip | 7 CLI | 5 low token | 9 | 8 | 8 | 79 | PILOT-SERVICE |
| 4 | `traceloop/openllmetry` | Obs substrate | 10 Apache | 8 | 8 | 7 overlaps OTel/Phoenix | 5 stack | 6 service | 7 trace ROI | 9 | 5 | 6 | 71 | CITE-NOW |
| 5 | `qdrant/qdrant` | Vector | 10 Apache | 10 | 9 | 8 complement | 6 docker+MCP | 8 MCP OK | 7 retrieval ROI | 10 | 7 | 8 | 83 | REGISTER-MCP |
| 6 | `getzep/graphiti` | Memory KG | 10 Apache | 10 | 8 | 8 complement | 5 DB backend | 8 MCP/server | 8 memory ROI | 9 | 6 | 8 | 80 | REGISTER-MCP |
| 7 | `DS4SD/docling` | DocAI | 10 MIT | 10 | 8 | 8 complement | 8 pip | 8 CLI/lib | 7 ingest ROI | 9 | 8 | 8 | 84 | INSTALL-NOW |
| 8 | `chonkie-inc/chonkie` | DocAI chunking | 10 MIT | 7 | 7 | 8 complement | 9 pip | 8 lib | 8 chunk ROI | 7 | 9 | 8 | 81 | INSTALL-NOW |
| 9 | `explodinggradients/ragas` | Eval RAG | 10 Apache | 9 | 8 | 8 complement | 9 pip | 8 lib | 5 eval cost | 9 | 8 | 8 | 82 | INSTALL-NOW |
| 10 | `obra/superpowers` | Agent-orch | 10 MIT | 10 | 9 | 7 partial overlap | 9 plugin | 6 hard-gate skills caveat | 7 workflow ROI | 8 | 9 | 8 | 83 | ADD-PLUGIN |
| 11 | `doobidoo/mcp-memory-service` | Memory MCP | 10 Apache | 6 | 8 | 8 complement | 8 pip+MCP | 9 native MCP | 8 memory ROI | 7 | 8 | 9 | 81 | REGISTER-MCP |
| 12 | `topoteretes/cognee` | Topo memory | 10 Apache | 9 | 7 | 6 overlaps graphiti | 5 service | 7 plugin/hook | 7 memory ROI | 7 | 5 | 6 | 69 | PILOT-SERVICE |
| 13 | `anthropics/cwc-long-running-agents` | Agent-orch official | 10 Apache | 5 | 8 | 10 official canonical | 9 copy scripts | 10 native /loop | 8 continuity ROI | 8 | 9 | 10 | 87 | ADD-SKILL |
| 14 | `chroma-core/chroma` | Vector | 10 Apache | 10 | 9 | 6 qdrant overlap | 8 pip | 7 service/lib | 7 retrieval ROI | 9 | 8 | 6 | 80 | DEFER |
| 15 | `anthropics/claude-cookbooks` | Foundation cite | 10 MIT | 10 | 9 | 10 official cite | 10 no install | 8 notebooks | 6 prompt ROI | 10 | 10 | 8 | 91 | CITE-NOW |
| 16 | `affaan-m/everything-claude-code` | Agent-orch plugin | 10 MIT | 10 | 8 | 7 partial overlap | 9 plugin | 8 native plugin | 8 compact ROI | 8 | 9 | 8 | 85 | ADD-PLUGIN |
| 17 | `wshobson/agents` | Agent-orch cross-vendor | 10 MIT | 9 | 8 | 8 plugin suite | 9 plugin | 8 native plugin | 8 context/review ROI | 8 | 9 | 8 | 85 | ADD-PLUGIN |
| 18 | `mksglu/context-mode` | Token-opt context | 7 ELv2 local OK | 8 | 6 high churn | 8 unique | 9 plugin | 8 native plugin | 10 token ROI | 6 | 8 | 8 | 78 | ADD-PLUGIN |
| 19 | `yamadashy/repomix` | Token-opt pack | 10 MIT | 9 | 9 | 9 unique | 9 npm/MCP | 9 native MCP | 10 pack ROI | 8 | 9 | 9 | 91 | REGISTER-MCP |
| 20 | `gepa-ai/gepa` | Token-opt prompt-evo | 10 MIT | 7 | 6 young | 8 complement | 8 pip | 6 pilot workflow | 8 prompt ROI | 6 | 7 | 6 | 72 | PILOT-SERVICE |
| 21 | `volcengine/OpenViking` | Memory plugin | 6 plugin Apache/backend AGPL split | 9 | 6 | 6 provider complement | 4 Git Bash+backend | 7 CC plugin | 7 memory ROI | 7 | 4 AGPL/backend | 5 | 61 | PILOT-PLUGIN |
| 22 | `getsops/sops` | Secret-mgmt | 10 MPL CLI OK | 8 | 10 | 9 unique | 8 binary | 9 CLI | 4 no token | 10 | 9 | 8 | 85 | INSTALL-NOW |
| 23 | `vitest-dev/vitest` | Test | 10 MIT | 8 | 9 | 8 test layer | 9 npm | 8 CLI | 4 no token | 9 | 9 | 8 | 82 | INSTALL-NOW |
| 24 | `affaan-m/everything-claude-code` governance-capture | Hook audit | 10 MIT | 10 | 8 | 8 hook unique | 10 env flip | 8 native hook | 6 trace ROI | 8 | 10 | 8 | 86 | ADD-PLUGIN |
| 25 | `microsoft/graphrag` | RAG framework | 10 Apache | 8 | 7 | 5 overlaps llama_index/LightRAG | 5 medium | 6 non-native | 7 RAG ROI | 9 | 5 | 5 | 67 | DEFER |
| 26 | `dottxt-ai/outlines` | Structured output | 10 Apache | 8 | 7 | 8 new layer | 8 pip | 7 Python lib | 7 fewer retries | 8 | 7 Py wheel caveat | 8 | 78 | INSTALL-NOW |
| 27 | `promptfoo/promptfoo` | CLI eval/red-team | 10 MIT | 9 | 8 | 8 complement | 7 npm | 7 CLI | 5 eval cost | 9 | 8 | 8 | 79 | PILOT-SERVICE |
| 28 | `microsoft/markitdown` | DocAI preprocessor | 10 MIT | 10 | 8 | 8 complement | 8 pip | 8 CLI/lib | 8 ingest ROI | 10 | 8 | 9 | 87 | INSTALL-NOW |
| 29 | `duckdb/duckdb` | Analytical SQL | 10 MIT | 9 | 10 | 9 unique | 8 pip/CLI split | 8 embedded CLI/lib | 7 audit ROI | 10 | 9 | 9 | 89 | INSTALL-NOW |

## FM-20 Row 21 OVER Catches

| # | prior claim | source file:line | pure-runtime refuting/qualifying evidence | verdict |
|---:|---|---|---|---|
| 1 | `wshobson/agents` ALREADY at pure settings | W219 `:37`, drop row `:64`, phase row `:80` | CONFIRMED: `Z:/claude-sota-pure/.claude/settings.json:175` has `comprehensive-review@claude-code-workflows`; marketplace source at `:190-193`. | NOT-OVER |
| 2 | superpowers partial/installed | W219 `:30`, drop row `:65`, phase row `:116` | CONFIRMED plugin enabled: `Z:/claude-sota-pure/.claude/settings.json:167`; marketplace `obra/superpowers` at `:211-214`. Selective 3 un-vendored skills still require exact skill-path proof. | PARTIAL-OVER |
| 3 | ECC governance-capture ALREADY | W219 `:44`, phase row `:78` | CONFIRMED env flip: `Z:/claude-sota-pure/.claude/settings.json:8`; ECC plugin enabled at `:178`. | NOT-OVER |
| 4 | context-mode already plugin-cached | W219 `:38`, phase row `:81` | CONFIRMED enabled: `Z:/claude-sota-pure/.claude/settings.json:169`; marketplace source at `:205-208`. License remains ELv2 caveat, not NOASSERTION. | PARTIAL-OVER |
| 5 | repomix already both runtimes | W219 `:39`, phase row `:81` | CONFIRMED pure MCP: `Z:/claude-sota-pure/.mcp.json:23-25`. | NOT-OVER |
| 6 | cwc already both runtimes | W219 `:33`, phase row `:117` | CONFIRMED clone exists under `Z:/claude-sota-pure/.local/cwc`; hooks reference cwc-derived scripts in `settings.json:32-42,128-134`. | NOT-OVER |
| 7 | sops already pure-local | W219 `:42`, phase row `:78` | CONFIRMED binary: `Z:/claude-sota-pure/.local/bin/sops.exe`; provenance also records W214 G2. | NOT-OVER |
| 8 | vitest already npm-global | W219 `:43`, phase row `:78` | QUALIFIED: command resolves to `C:/Users/42/AppData/Roaming/npm/vitest.ps1`, not pure-local; acceptable global tool, but not target-local proof. | PARTIAL-OVER |
| 9 | semgrep already installed but orchestrator-runtime | W219 drop row `:72` | REFUTED for pure-local: `Get-Command semgrep` resolves to `Z:/claude-sota-installed/.local/bin/semgrep.exe`; pure docs mention semgrep, but command-path probe is sibling bleed. | OVER |
| 10 | phoenix already-wired in installed runtime, target install needed | W219 `:107`, FM summary `:149` | CONFIRMED not pure MCP: no `phoenix` server in `Z:/claude-sota-pure/.mcp.json`; pure docs later prefer `openinference` due Phoenix ELv2. | OVER if treated installed |
| 11 | `github/spec-kit` duplicate because `speckit-*` loaded | W220 `:43`, `:87-89`, `:124-137`; W219 appendix `:192` | REFUTED for pure plugin namespace in direct probe: no `speckit-*` enabled plugin or `.mcp.json` entry. Command `specify` resolves to `Z:/claude-sota-installed/.local/bin/specify.exe`, so pure-local install remains unproven. | OVER |
| 12 | firecrawl duplicate because MCP loaded in orchestrator | W220 `:51`, `:124`, `:137`; W219 appendix `:191` | REFUTED for pure: no `firecrawl` MCP in `Z:/claude-sota-pure/.mcp.json`. AGPL still blocks direct adoption; duplicate claim is cross-runtime drift. | OVER |
| 13 | playwright/chrome-devtools already loaded | W220 `:47`, `:70`, `:137` | CONFIRMED pure MCP: `Z:/claude-sota-pure/.mcp.json:51-57`. | NOT-OVER |
| 14 | mcp-memory-service already target install candidate | W219 `:31`, install row `:90` | CONFIRMED pure MCP: `Z:/claude-sota-pure/.mcp.json:3-8`; Python module present in current env, but MCP config is sufficient target proof. | NOT-OVER |
| 15 | graphiti NOT target | W219 `:26`, install row `:91` | QUALIFIED: Python module present in current env, but no pure `.mcp.json` graphiti entry; backend lifecycle still pending. | PARTIAL-OVER |
| 16 | W220 4 adopt candidates are not installed | W220 `:114-117`; W219 appendix `:177-182` | Later pure state indicates `outlines`, `markitdown`, `duckdb` Python modules present and `promptfoo` command global-present; source-time adoption verdict still valid, but install-state claim decayed. | TIME-DECAY |

## CR-9 Install-Risk Flags Per Repo

| rank | repo | version-pin status | 2-round budget | REVERT-grep finding | sibling-bleed/path rewrite list |
|---:|---|---|---|---|---|
| 1 | `langfuse/langfuse` | unresolved compose image/app versions | allocate 2 rounds | W219 says CR-9 pending for langfuse `:136`; Py 3.14 pydantic-v1 drift noted in pure docs | rewrite any installed-runtime `.mcp.json:95-98`; keep pure compose state outside repo |
| 2 | `run-llama/llama_index` | resolved-pin required | 1 round enough | no repo-specific revert hit | verify import from pure venv, not global |
| 3 | `NVIDIA/garak` | pip resolved version required; module present | 1 round | no repo-specific revert hit | command resolves installed path; rewrite PATH to pure-local if target-local required |
| 4 | `traceloop/openllmetry` | pin OTel packages | 2 rounds | no repo-specific revert hit | avoid phoenix-installed-runtime bleed |
| 5 | `qdrant/qdrant` | pin Docker tag + `mcp-server-qdrant` version | 2 rounds | rollback class exists for docker stop/rm in pure runbook | write pure `.mcp.json`; no installed `.mcp.json` copy |
| 6 | `getzep/graphiti` | pin `graphiti-core` + backend image | 2 rounds | W219 CR-9 pending `:136` | pure has no MCP entry; write fresh pure server only |
| 7 | `DS4SD/docling` | pip resolved-pin | 1 round | no repo-specific revert hit | verify pure venv import before no-op |
| 8 | `chonkie-inc/chonkie` | pip resolved-pin | 1 round | no repo-specific revert hit | verify pure venv import before no-op |
| 9 | `explodinggradients/ragas` | pip resolved-pin | 1 round | no repo-specific revert hit | verify pure venv import before no-op |
| 10 | `obra/superpowers` | plugin marketplace HEAD/version pin needed | 1 round | no revert hit; selective skills need exact paths | already pure plugin enabled; do not copy installed plugin cache |
| 11 | `doobidoo/mcp-memory-service` | MCP command unpinned in `.mcp.json`; package pin needed | 1 round | no revert hit | pure `.mcp.json:3-8` is target proof |
| 12 | `topoteretes/cognee` | pip/service pin unresolved | 2 rounds | no repo-specific revert hit | no pure install; avoid graphiti config overwrite |
| 13 | `anthropics/cwc-long-running-agents` | clone HEAD pin should be recorded | 1 round | no revert hit | pure `.local/cwc` exists; do not re-copy from installed |
| 14 | `chroma-core/chroma` | pip/Docker pin unresolved | 1 round | no repo-specific revert hit | defer behind qdrant decision |
| 15 | `anthropics/claude-cookbooks` | cite SHA pin only | n/a | n/a | cite-only, no path rewrite |
| 16 | `affaan-m/everything-claude-code` | plugin version pin needed | 1 round | no revert hit | pure plugin enabled; governance env already pure |
| 17 | `wshobson/agents` | plugin marketplace HEAD/version pin needed | 1 round | no revert hit | pure `settings.json:175` target proof |
| 18 | `mksglu/context-mode` | plugin version/HEAD pin needed; ELv2 acknowledge | 1 round | runbook has ELv2 acknowledgment section | pure `settings.json:169`; no fork-modify |
| 19 | `yamadashy/repomix` | npm resolved-pin preferred | 1 round | no revert hit | pure `.mcp.json:23-25` target proof |
| 20 | `gepa-ai/gepa` | pip resolved-pin | 2 rounds | no repo-specific revert hit | no pure proof; pilot isolated |
| 21 | `volcengine/OpenViking` | plugin/backend SHA pin required | 2 rounds | no repo-specific revert hit | do not import AGPL backend into repo; isolate backend path/state |
| 22 | `getsops/sops` | binary v3.13.0/sigstore per W219; verify live | 1 round | W214 CR-9 pass in pure provenance | pure `.local/bin/sops.exe` target proof |
| 23 | `vitest-dev/vitest` | npm resolved-pin per provenance | 1 round | W214 CR-9 pass in pure provenance | global npm path; decide if pure-local shim needed |
| 24 | `ECC governance-capture` | plugin/env no package pin beyond ECC | 1 round | W214 CR-9 pass in pure provenance | pure `settings.json:8` target proof |
| 25 | `microsoft/graphrag` | pin unresolved | 2 rounds | no repo-specific revert hit | defer; avoid overlap churn with llama_index |
| 26 | `dottxt-ai/outlines` | pure provenance says Round-2 binary-only; pin old 0.0.41 until Py 3.14 wheel catches up | budget already used once | pure manifest records Round-2 fix-forward | verify import path from pure venv |
| 27 | `promptfoo/promptfoo` | npm resolved-pin required | 1 round | no repo-specific revert hit | command is global npm; target-local install unproven |
| 28 | `microsoft/markitdown` | pip resolved-pin required | 1 round | no repo-specific revert hit | verify import path from pure venv |
| 29 | `duckdb/duckdb` | pip/CLI pin split; CLI missing | 1 round | no repo-specific revert hit | Python module present; CLI target install unproven |

## Net Ratify Verdict

**NEEDS-REVISION**

Prescribed edits before W219/W220 can become `APPROVE-AS-W219`:

| # | prescribed_edit | target |
|---:|---|---|
| 1 | Replace all boolean `NATIVE-CC` labels with action labels from this artifact: `REGISTER-MCP`, `ADD-PLUGIN`, `ADD-SKILL`, `CITE-NOW`, `PILOT-SERVICE`, `PILOT-PLUGIN`, `DEFER`. | W219 matrix `:19-46`; W220 `:114-117` |
| 2 | Split target-state into `pure-confirmed`, `installed-runtime-only`, `global-tool-only`, `module-present-env`, and `not-present`. | W219 `Already-In-Target?` column |
| 3 | Correct FM-20 row 21 count: preserve confirmed catches, but add explicit pure-runtime refutations for `spec-kit`, `firecrawl`, `semgrep`, and `phoenix`; mark W220 four-candidate state as time-decayed after later pure installs. | W219 `:144-154`; W220 `:137` |
| 4 | Add this D1-D10 decomposition table or equivalent per-row sub-score appendix; remove un-decomposed `99/100` style claims as adoption authority. | W219 `:19-46` |
| 5 | Close CR-9 pins before install execution for service rows: langfuse, qdrant, graphiti, cognee, OpenViking, graphrag; keep 2-round budgets explicit. | W219 install order `:74-127` |
| 6 | Treat `github/spec-kit` as target-unproven in pure runtime unless `specify` and `/speckit-*` are installed under pure paths. Current command probe resolves to `Z:/claude-sota-installed/.local/bin/specify.exe`. | W220 `:87-89,:124-137`; W219 appendix `:192` |

Approval path: apply the six edits atomically, then re-run a pure-runtime probe over `.claude/settings.json`, `.mcp.json`, `.local/bin`, Python import locations, and npm global/local command paths. If no new FM-20 row 21 drift appears, W219/W220 can be approved for operator execution with service rows still requiring install-time pins.
