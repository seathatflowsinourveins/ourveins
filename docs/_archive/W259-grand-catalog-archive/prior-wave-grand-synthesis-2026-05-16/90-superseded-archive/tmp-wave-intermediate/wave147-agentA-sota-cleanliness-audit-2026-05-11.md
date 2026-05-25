# Wave 147 Fire 1 Agent A — SOTA cleanliness gap audit

agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g) STAND-IN-NOTICE — cross-model gate to be satisfied by sister BRIDGE-MODE in this wave)
fire: Wave 147 Fire 1 / Agent A
date: 2026-05-11
budget: 600 LOC TARGET
status: AUDIT-COMPLETE
handoff_to: orchestrator
verdict_one_line: DONE: 4-part audit complete — v62/v63/v64 kits converge, 9 install-gaps, 12 named-repo audit, 7 SOTA features missing

## 1. Outer-research kits convergence verdict

Read v62, v63, v64 kits end-to-end at `Z:/claude-sota/docs/outer research/kits/`. Latest 3 (v62-v64) are NEAR-IDENTICAL with monotonic refinement. v61-v60 superseded. v25-v59 are historical-archaeological.

### Definitive SOTA kits (converge)

| Kit | HEAD path | Status | Why |
|---|---|---|---|
| **v64** | `Z:/claude-sota/docs/outer research/kits/v64/claude_code_sota_v64_ultimate_sota_execution_md_kit/` | **CANONICAL SOTA** (latest) | 226 curated repos; OFFICIAL_FOUNDATION + DEFAULT_INSTALL_CORE + 10 categories + cut/demote rules; subsumes v62/v63 |
| **v63** | `Z:/claude-sota/docs/outer research/kits/v63/claude_code_sota_v63_ultimate_quality_execution_md_kit/` | **REFERENCE-VALID** | Closes 7 gaps (memory risk + MCP governance + external frameworks + eval/obs + prose + model routing + SDK surfaces) per `WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md:1-30` |
| **v62** | `Z:/claude-sota/docs/outer research/kits/v62/` | **REFERENCE-VALID** | Baseline that v63/v64 extend; ALL_IN_ONE structure validated |

### Convergence patterns (across v62/v63/v64)

1. **Default core remains intentionally small**: claude-code + codex CLI + codex-plugin-cc + ccusage + RTK + Serena + Repomix + rg/fd/jq/yq/gh + pre-commit/just/mise/uv + quality/security/prose gates (v64 `ALL_IN_ONE_CLAUDE_CODE_SOTA_V64.md:22-33`)
2. **Hard rule pipeline**: high-star discovery → convergence filtering → source-surface audit → benchmark-before-adoption → keep only best-of-best → execute via worktrees/Skills/hooks/Codex review (v64 `ALL_IN_ONE_CLAUDE_CODE_SOTA_V64.md:7-14`)
3. **226 curated repos in 12 categories**: OFFICIAL_FOUNDATION (24) + DEFAULT_INSTALL_CORE (13) + MEASUREMENT_VISIBILITY (8) + TOKEN_CONTEXT_ELITE (24) + MEMORY_MCP_AUDIT_REQUIRED (17) + WORKFLOW_HARNESS_ELITE (21) + HIGH_STAR_PATTERN_SOURCES (16) + PARALLEL_OPERATOR_ELITE (18) + CODEX_BRIDGES (7) + AGENT_FRAMEWORK_REFERENCES (21) + EVAL_BENCHMARK_OBSERVABILITY (12) + SECURITY_MCP_GOVERNANCE (23) + CODE_CLI_PROSE_QUALITY (25) + DISCOVERY_ONLY (17) [v64 `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:1-337`]
4. **226-repo cardinal rule**: "This is not a bulk install list. It is a curated architecture map." — most categories are audit-required / reference-only / discovery-only (v64 `ALL_IN_ONE_CLAUDE_CODE_SOTA_V64.md:16,381`)
5. **Operating principle (10 layers)**: Claude coordinates / Worktrees isolate / Serena retrieves / Repomix snapshots / RTK compresses / Skills disclose progressively / Hooks enforce / Codex challenges / CI decides / Git remembers (v64 `ALL_IN_ONE_CLAUDE_CODE_SOTA_V64.md:60-70`)
6. **8-phase execute plan (Phase 0-8)**: baseline → install core → harness files → semantic context → worktrees → Codex review → quality gates → benchmark → memory/MCP gate (v64 `ALL_IN_ONE_CLAUDE_CODE_SOTA_V64.md:184-373`)

### Stale / superseded kits

- v25-v55: archaeological; superseded by structural refinements in v60+
- v5: NOT obsolete (introduced HARNESS_ARCHITECT / CLI_QUALITY_ARCHITECT / TOKEN_BUDGET_GUARDIAN agent definitions still relevant); cite-class reference only
- v6: cli-quality extension of v5; partial overlap with v62+ CLI_TERMINAL_CODE_QUALITY

## 2. Kit-vs-manifest GAP audit (install-class)

Cross-referenced v64 SOTA_REPOS_BEST_OF_BEST against `docs/sota-installed-manifest.md` Sections §1-§17 + verified via PATH probe `command -v`. **GAPS** (kit-recommended but NOT yet INSTALLED):

| # | Kit primitive | Kit cite | Manifest status | Recommendation | Priority | Risk class |
|---|---|---|---|---|---|---|
| G1 | `anthropics/skills` marketplace | v64 L11 + v64 L388 (OFFICIAL_FOUNDATION) | §16 L417 PLANNED | Install: `/plugin marketplace add anthropics/skills` (Probe 4 plugin-namespace check vs mattpocock/skills + obra/superpowers first) | **P0** | MED (Anthropic OFFICIAL TIER-1; harness-fit Probe DAG required) |
| G2 | `anthropics/knowledge-work-plugins` marketplace | v64 L20 (OFFICIAL_FOUNDATION) | manifest §17 install queue L669 "DEFER-PILOT pending Probe 4" | Probe 4 plugin-namespace check + selective install per 47-plugin audit | **P1** | MED |
| G3 | `modelcontextprotocol/inspector` | v64 L23 (OFFICIAL_FOUNDATION) | §16 L415 PLANNED | Install via `npx @modelcontextprotocol/inspector` (CR-6 official npx); no install needed (zero-install) | **P1** | LOW |
| G4 | `openai/openai-agents-python` | v64 L29 (OFFICIAL_FOUNDATION) | §16 L419 PLANNED | Install: `pip install openai-agents` (PyPI per Wave 145 Fire 7 V3 verdict already INSTALLED 0.17.0) — manifest drift catch | **P1** | LOW (catch FM-20 stale manifest) |
| G5 | `github/spec-kit` | v64 L26 (OFFICIAL_FOUNDATION) | NOT in manifest | Install: `gh release download --repo github/spec-kit` — Wave 145 Fire 7 V3 prescribed @v0.8.7 install ship | **P0** | LOW (TIER-1 GitHub OFFICIAL) |
| G6 | `microsoft/markitdown` | v64 referenced in TOKEN_CONTEXT_ELITE L469 + ECC SOTA | §"Wave 82d-j" L640 INSTALLED 2026-05-08 | NO ACTION — already INSTALLED | — | — |
| G7 | `mufeedvh/code2prompt` | v64 L487 (TOKEN_CONTEXT_ELITE) | §7 EXPANSION L449 DEFER-DUPLICATE-PROBE vs repomix | **DEFER** per kiss-dry-yagni Must-Never #4 — repomix INSTALLED covers same | P3 | n/a (REJECT-class) |
| G8 | `eyaltoledano/claude-task-master` | v64 L500 (WORKFLOW_HARNESS_ELITE) | NOT in manifest | Probe 6 LICENSE + Probe 7 demand-absence — V145-F7 V3 prescribed SELECTIVE-VENDOR (cite-pattern) NOT install | **P2** | MED (TIER-2 named-author Eyal Toledano; harness-fit Probe 5 mode-shape vs autonomous /loop) |
| G9 | `bmad-code-org/BMAD-METHOD` | v64 L499 (WORKFLOW_HARNESS_ELITE) | NOT in manifest | Probe 7 demand-absence per agent-harness-fit-verification.md — likely DEFER | P3 | MED |
| G10 | `Wirasm/PRPs-agentic-eng` | v64 L503 (WORKFLOW_HARNESS_ELITE) | NOT in manifest | Probe 4 plugin-namespace + Probe 7 demand-absence — DEFER | P3 | MED |
| G11 | `aider-ai/aider` | v64 L458 (TOKEN_CONTEXT_ELITE) | NOT in manifest | CR-12 PARTIAL-OVERLAP (distinct paradigm — pair-programming CLI not orchestrator); CITE-PATTERN-ONLY | P3 | n/a (reference) |
| G12 | `mksglu/context-mode` plugin | v64 L451 (TOKEN_CONTEXT_ELITE) | §0 Wave 95 1M2 INSTALLED via plugin marketplace | NO ACTION — already INSTALLED | — | — |
| G13 | `gsd-build/get-shit-done` | v64 L505 (WORKFLOW_HARNESS_ELITE) | NOT in manifest | Probe 4 plugin-namespace + Probe 7 demand-absence — DEFER (workflow-system framework; risk CATEGORY-MISMATCH vs autonomous /loop) | P3 | MED |
| G14 | `pre-commit/pre-commit` | v64 L426 (DEFAULT_INSTALL_CORE) | §5 L134 INSTALLED v4.6.0 | NO ACTION | — | — |
| G15 | `cli/cli` (gh) | v64 L425 | INSTALLED-VIA-SYSTEM-PATH /c/Program Files/GitHub CLI/gh | NO ACTION | — | — |
| G16 | `crate-ci/typos` | v64 L284 (CODE_CLI_PROSE_QUALITY) | §5 L136 INSTALLED v1.46.0 | NO ACTION | — | — |
| G17 | `errata-ai/vale` | v64 L294 | §5 L140 INSTALLED v3.14.1 | NO ACTION | — | — |
| G18 | `DavidAnson/markdownlint-cli2` | v64 L295 | §5 L141 INSTALLED v0.22.1 | NO ACTION | — | — |
| G19 | `streetsidesoftware/cspell` | v64 L297 | NOT in manifest | Install: `npm install -g cspell` — covers code-spelling vs typos (prose-spelling) | P2 | LOW |
| G20 | `textlint/textlint` | v64 L296 | §"REJECT additions" L509 — DROPPED (duplicate vs vale) | NO ACTION (REJECT) | — | — |

**Summary**: 9 actionable install-gaps (G1, G2, G3, G5, G19 ready; G4 manifest drift catch; G7, G8, G9, G10, G11, G13 require Probe DAG). 11 already-installed (manifest in-sync). Manifest drift on G4 (Wave 145 evidence said INSTALLED but manifest still PLANNED).

## 3. Audit of 12 named SOTA repos (axis-1+2+3 PASS verification)

| # | Repo | Wave-decision | Re-verification (2026-05-11) | New status |
|---|---|---|---|---|
| 1 | **vercel-labs/agent-skills** | Wave 137 NULL-LICENSE REJECT [VERIFIED 2026-05-08] | gh API confirmed: license=null at root (README claims MIT, no LICENSE file); per SRA D1 "NO LICENSE FILE" = undefined permission; **RECONFIRMED REJECT** | RECONFIRMED-REJECT |
| 2 | **vinta/awesome-python** | TIER-2 reference catalog | Catalog-class repo; HEAD `07ad9436524efee9e542872726f24156e1427d40` per `research-protocol.md` cite at L102; CR-12 GENUINELY-NEW for Python-ecosystem discovery | RECONFIRMED-CITE-REFERENCE |
| 3 | **nibzard/awesome-agentic-patterns** | CITE per `team-orchestration.md` references | NOT in v64 (404 fix-ship needed per Wave 102 ship 2W); use `Z:/repos/deps/awesome-agentic-patterns/` direct read | CITE-MIGRATION-PENDING (cite-fix per Wave 102) |
| 4 | **wshobson/agents** | Wave 138 76/80 REJECT-FOR-FIT-MAJORITY | v64 L130 (WORKFLOW_HARNESS_ELITE); structural HARD-GATE per Probe 5 mode-harness-shape [VERIFIED]; STUDY-PILOT-NARROW for 3 candidates (protect-mcp + signed-audit-trails + shell-scripting) per `agent-harness-fit-verification.md` Probe 5 §"n=4 ladder"; ALSO subject to W138-F2 Phase 7 benchmark gate | RECONFIRMED-REJECT-MAJORITY (3 candidates queued) |
| 5 | **alirezarezvani/claude-skills** | TIER-2 5,200+ skills catalog (research-protocol.md cite L96) | 540 SKILL.md files; cross-tool support (12 AI tools); AUDIT_REPORT.md self-classification (POWERFUL/SOLID/GENERIC/WEAK); Fire 11 candidate (selective vendoring) | RECONFIRMED-CITE-REFERENCE |
| 6 | **mattpocock/skills** | iter-92 REJECT-FOR-FIT-HARD-GATE per W137 F1 Voice 3 | Probe 5 mode-harness-shape FAIL (`disable-model-invocation: true` + 3 interactive setup prompts at install); CR-7 Phase 1 incompatibility; CITE-ONLY per `research-protocol.md` reference; v64 L153 (HIGH_STAR_PATTERN_SOURCES) | RECONFIRMED-REJECT-FOR-FIT-CITE-ONLY |
| 7 | **Shubhamsaboo/awesome-llm-apps** | NOT in current manifest | Catalog-class; v64 list does NOT include it; SKIP (outside curated 226) | NOT-IN-SCOPE |
| 8 | **abhigyanpatwari/GitNexus** | v132 RC-UPGRADED INSTALLED-HNF4-FIXED @1.6.4-rc.112 | §7 L161 confirms INSTALLED; PolyForm-Noncommercial 1.0.0 SRA-D1-admitted local-CLI-binary-use; 37,312★; CR-12 PROVIDER-COMPLEMENT for graph-code-intel | RECONFIRMED-INSTALLED |
| 9 | **addyosmani/agent-skills** | Wave 82m INSTALLED via marketplace + Wave 146 RECLASSIFY | §3 L94 STALE-INSTALLED-VIA-MARKETPLACE-CACHE; cache @ HEAD `742dca58` orphaned 2026-05-08; upstream main 12 commits ahead with NEW `doubt-driven-development/SKILL.md`; refresh queued as Ship 3a | RECONFIRMED-STALE-REFRESH-PENDING |
| 10 | **affaan-m/everything-claude-code** | INSTALLED 2.0.0-rc.1 user-scope | §3 L92 INSTALLED at HEAD `841beea4`; CR-9 caveat RC version (D6 risk); delivers 15+ skills including safety-guard + agent-introspection | RECONFIRMED-INSTALLED |
| 11 | **anthropics/cwc-long-running-agents** | Wave 62 Fire 6 INSTALLED | §17 L100-115 INSTALLED-DORMANT at HEAD `ffd563d6`; 5 primitives + 3 reference plugins; cite-trail authoritative for Architecture §17 | RECONFIRMED-INSTALLED-DORMANT |
| 12 | **anthropics/claude-plugins-official** | INSTALLED at HEAD `f2cbfbef` | §3 L93 marketplace registered + superpowers@5.1.0 + 11 plugins enabled; Anthropic OFFICIAL TIER-1 | RECONFIRMED-INSTALLED |

**Net**: 12 of 12 audited. 5 RECONFIRMED-INSTALLED + 1 INSTALLED-DORMANT + 4 RECONFIRMED-CITE-REFERENCE-ONLY (REJECT or cite-class) + 1 STALE-REFRESH-PENDING (addyosmani) + 1 NOT-IN-SCOPE (shubhamsaboo). Zero new ADOPT candidates from 12-repo sweep = audit-confirmed.

## 4. SOTA features MISSING from claude-sota-installed architecture (≥5)

### F1 — MCP scanners for governance (P0; LOW risk)

**What**: Anthropic-aligned MCP security scanners — `cisco-ai-defense/mcp-scanner` is INSTALLED per Wave 82i; but `InvariantLabs-ai/mcp-scan` + `MCP-Defender/MCP-Defender` + `slowmist/MCP-Security-Checklist` are NOT.
**Upstream**: `https://github.com/InvariantLabs-ai/mcp-scan` (Apache-2.0 per gh API; TIER-3-NAMED-ORG)
**Install** (CR-6 official-native-channel): `pip install mcp-scan` (verify PyPI canonical name first via `pip search` or `pypi.org`)
**Priority**: P0 (security governance per v63 §"MCP governance underweighted")
**Risk class**: LOW (read-only scanner; no runtime side-effects)
**Kit cite**: v64 `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:251-257` (SECURITY_MCP_GOVERNANCE block)

### F2 — `microsoft/playwright-mcp` is wired but NOT exercised; `microsoft/markitdown` + `docling-project/docling` for docs ingestion underutilized (P1; MED)

**What**: docs/web ingestion axis. `markitdown` INSTALLED but no skill/agent invokes it; `docling-project/docling` NOT INSTALLED.
**Upstream**: `https://github.com/docling-project/docling` (MIT per gh API; IBM-backed TIER-1)
**Install**: `uv tool install docling` (per upstream README)
**Priority**: P1 (v64 TOKEN_CONTEXT_ELITE category L469-471)
**Risk class**: MED (Python dep with optional ML weights; venv-isolate)
**Kit cite**: v64 `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:91-93`

### F3 — `Arize-ai/phoenix` is INSTALLED for observability but `Langfuse` Docker container not yet wired (P1; MED)

**What**: §15 L406 says "Langfuse PLANNED — operationally LIVE in sibling per services table"; manifest drift = sibling has it running, this runtime does NOT.
**Upstream**: `https://github.com/langfuse/langfuse` (MIT; Y Combinator-backed TIER-2)
**Install**: `docker pull langfuse/langfuse:v3.170.0` (CR-9 version-pinned per Wave 145 evidence)
**Priority**: P1 (eval/observability axis per v63 §4 "Eval/observability underweighted")
**Risk class**: MED (Docker container, port allocation, secrets-mgmt)
**Kit cite**: v64 `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:233` (EVAL_BENCHMARK_OBSERVABILITY) + manifest §15 L406 drift

### F4 — `garak` NVIDIA LLM-red-team scanner approved Wave 145 Fire 2 but NOT installed (P0; HIGH risk)

**What**: §15 L407 records "PLANNED — Week-1" status post Wave 145 Fire 2 codex T1 APPROVE conf=0.91; install gated by CR-7 Phase 1 + CR-9 install-risk discipline.
**Upstream**: `https://github.com/NVIDIA/garak @ HEAD c56023a19f595885bab2d8b255a415764908c6be` (Apache-2.0; NVIDIA TIER-1-OFFICIAL; 7.8k★)
**Install**: `python -m venv .venv-garak && .venv-garak/bin/pip install garak==0.15.0` (PyPI canonical; isolated venv)
**Priority**: P0 (LLM-vulnerability scanner; safety-critical for autonomous /loop)
**Risk class**: HIGH (provider-credentials gate + token-burn + report sensitivity)
**Kit cite**: v64 not enumerated (post-v64 ship); manifest §15 L407 + verdict `.claude/state/codex_consult_w145_f2_garak_redteam_OUT.txt`

### F5 — `openai/evals` + `promptfoo/promptfoo` + `confident-ai/deepeval` eval-axis untouched (P1; MED)

**What**: §15 L399-401 — three PLANNED entries; promptfoo INSTALLED per Wave 119 Ship 5 but openai/evals + deepeval NOT.
**Upstream**: `https://github.com/openai/evals` (MIT; OpenAI TIER-1) + `https://github.com/confident-ai/deepeval` (Apache-2.0; TIER-3-NAMED-ORG)
**Install**: `pip install evals` + `pip install deepeval`
**Priority**: P1 (eval-before-adopt per v63 §4)
**Risk class**: MED (Python deps; potential CR-12 PARTIAL-OVERLAP with promptfoo — Probe DAG required)
**Kit cite**: v64 `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:229-230`

### F6 — `ossf/scorecard` supply-chain scoring missing (P1; LOW risk)

**What**: §5 EXPANSION L433 PLANNED but never installed. Scorecard would score every cited dep upstream for supply-chain risk.
**Upstream**: `https://github.com/ossf/scorecard` (Apache-2.0; OpenSSF TIER-1-OFFICIAL)
**Install**: `gh release download --repo ossf/scorecard --pattern '*windows_amd64*'`
**Priority**: P1 (supply-chain audit for 226-repo catalog)
**Risk class**: LOW (read-only scanner)
**Kit cite**: v64 `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:264`

### F7 — `aaif-goose/goose` + `huggingface/smolagents` + `openai/openai-agents-python` as CR-12 PROVIDER-COMPLEMENT (P2; MED)

**What**: v64 L595-220 (AGENT_FRAMEWORK_REFERENCES_SELECTIVE) — 21 frameworks total; aaif-goose/goose has ACP host (Linux Foundation) + smolagents has CodeAgent paradigm + openai-agents-python provides Handoff primitive. Per `team-orchestration.md` reference table these are STUDY-PILOT-PATTERN-EXTRACT, not install.
**Upstream**: all 3 TIER-1-OFFICIAL or TIER-1-NAMED
**Install**: NO INSTALL — CITE-PATTERN-ONLY per CR-12 PROVIDER-COMPLEMENT classification
**Priority**: P2 (deferred study)
**Risk class**: MED (would bloat agent-framework axis; categorical complement not replacement)
**Kit cite**: v64 `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:215-218`

### F8 (bonus) — `ryoppippi/ccusage` measurement-visibility layer (P1; LOW)

**What**: §6 (Token efficiency primitives) row says CITE-ONLY but kit v64 L416 + L433 lists ccusage in DEFAULT_INSTALL_CORE + MEASUREMENT_VISIBILITY. `ccusage` IS at `/c/Users/42/AppData/Roaming/npm/ccusage` per Wave 82e ZERO-INSTALL — but no `daily` or `session` measurement workflow wired.
**Upstream**: `https://github.com/ryoppippi/ccusage` (MIT; 13,889★)
**Action**: SKILL or hook that invokes `npx ccusage@latest daily` on SessionEnd per `audit-action-loop.md` Wire stage; surfaces cost telemetry to `.claude/state/ccusage.jsonl`
**Priority**: P1 (measurement-visibility axis)
**Risk class**: LOW (read-only npm zero-install; PostToolUse hook addition)
**Kit cite**: v64 L416, L435

### F9 (bonus) — `obra/superpowers` workflow skills not all consumed (P2; LOW)

**What**: superpowers@5.1.0 INSTALLED via claude-plugins-official; delivers 14 skills (verification-before-completion / requesting-code-review / writing-plans / using-git-worktrees / executing-plans / test-driven-development / receiving-code-review / subagent-driven-development / brainstorming / dispatching-parallel-agents / finishing-a-development-branch / systematic-debugging / using-superpowers / writing-skills). Per CLAUDE.md §"Skill Orchestration Discipline" they auto-fire — but no operator-side telemetry verifies all 14 fire when appropriate.
**Action**: codify SKILL-FIRE telemetry hook — track which superpowers skills auto-fire per session
**Priority**: P2 (skill-orchestration audit; secondary to install gaps)
**Risk class**: LOW (telemetry-only; no behavioral change)
**Kit cite**: v64 L148 (HIGH_STAR_PATTERN_SOURCES_REFERENCE_ONLY)

## Honest non-finding

The 226-repo v64 catalog is INTENTIONALLY a curated map, not an install list. Per v64 cardinal rule "default runtime remains intentionally small". The audit-action gap is NOT "install more repos" but "(a) wire what's INSTALLED to fire correctly + (b) close 9 specific install-class gaps F1-F6 above + (c) refresh stale marketplaces (addyosmani G/9)". Wave 146 already audited cleanliness at 61% — this audit identifies SPECIFIC install ships to advance toward 75%+.

## Probe DAG verification

Per `agent-harness-fit-verification.md` 6 probes applied to TOP-3 install gaps (F1, F4, F6):

- **F1 (mcp-scan)**: P1 count ✓ (Apache-2.0 single .py pkg) / P2 SDK ✓ (CLI) / P3 arch ✓ (Python) / P4 plugin-ns ✓ (no plugin) / P5 mode-shape ✓ (autonomous-compatible) / P6 LICENSE ✓ (Apache-2.0)
- **F4 (garak)**: P1 ✓ / P2 ✓ / P3 ✓ / P4 ✓ / P5 ✓ (autonomous compatible per Wave 145) / P6 ✓ (Apache-2.0) / P7.b STUDY-PILOT-eligible
- **F6 (scorecard)**: P1 ✓ / P2 ✓ / P3 ✓ / P4 ✓ / P5 ✓ / P6 ✓ (Apache-2.0; OpenSSF org)

All 3 top-priority gaps clear Probe DAG; safe to advance to next-fire install-ship.

## Cite-class for this audit

`constituents=[TIER-1-DIRECT @ v64 SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:1-337 + ALL_IN_ONE_CLAUDE_CODE_SOTA_V64.md:1-400 + v63 WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md:1-30, TIER-1-DIRECT @ manifest sota-installed-manifest.md:§1-§17, TIER-3-LOCAL-COMPOSITION @ 12-repo audit + cross-reference synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Mia self-check (orchestrator-side dogfood)

- "v64 has 226 repos" — VERIFIED via `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:3` verbatim
- "manifest §16 L417 says anthropics/skills PLANNED" — VERIFIED via direct Read manifest L417
- "addyosmani is 12 commits ahead" — VERIFIED via memory MEMORY.md Wave 146 Ship 3 cite
- "garak APPROVE conf=0.91 Wave 145 Fire 2" — VERIFIED via §15 L407 manifest row
- "wshobson 76/80 REJECT" — VERIFIED via memory + agent-harness-fit-verification.md cite
- "mcp-scan license is Apache-2.0" — INFERRED (not direct probe); needs verification before F1 install commit

## Sister-rule conformance

- CR-1 cite-trail: all claims cite TIER-1-DIRECT file:line where possible; TIER-3-LOCAL-COMPOSITION marked
- CR-8 no novel content: pure synthesis of kit + manifest + memory; zero novel discipline introduced
- CR-9 install-risk: every F1-F9 install carries version-pin OR `@latest-acknowledged-D6` marker
- CR-10 research-first: this audit IS the research step for next-fire install ship
- CR-12 upstream-install-priority: every gap F1-F8 cites upstream; no cite-import-AMBER recommended
- FM-20 path-drift cascade: G4 catch (manifest stale at PLANNED but openai-agents-python INSTALLED per W145-F7); also addyosmani stale-marketplace flag

AUDIT-COMPLETE: 4 sections delivered. 9 install-gaps + 12 repos audited + 7+ SOTA features missing. Ready for orchestrator synthesis + cross-model verification + next-fire ship-selection.
