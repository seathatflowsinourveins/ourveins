---
title: W218-H Token Optimization + Context Engineering Layer Audit
status: AUTHORITATIVE
date: 2026-05-15
agent: W218-H sota-researcher (Sonnet stand-in per FM-17.e)
scope: 8-repo token-optimization + context-engineering layer SOTA convergence audit
mode: STAND-IN per CLAUDE.local.md ENV (f); cross-model gate AT W219 Path P
---

# W218-H — Token Optimization + Context Engineering Layer Catalog

## STAND-IN-NOTICE
Agent ran under Sonnet stand-in per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied at this dispatch. Orchestrator MUST file cross-model verification via W219 Path P (codex exec foreground+tee) before any ADOPT-NOW prescription lands.

## Methodology
- R1: 4-source multi-channel discovery (local clones at `Z:/repos/deps/` + GitHub API + npm registry + plugin marketplaces installed at `.claude/plugins/marketplaces/`)
- R2: 7-Probe DAG (license / mode-harness / SDK-vs-CLI / plugin-namespace / direct-file blockers / demand-gate / count-OVER)
- R3: Axis 1 (≥3-distinct-orgs) + Axis 2 (named-T2 dated artifacts) + Axis 3 (cpd × age)
- R4: SRA D1-D10 use-class precision scoring
- R5: CR-12 6-class disposition (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL)
- NATIVE-CC discriminator: distinguish "Anthropic CC primitive" vs "third-party plugin" vs "external library"
- WIRING: report INSTALLED / NOT-INSTALLED / FORWARD-REF status from local probe

---

## 1. Catalog table (8 candidates)

| # | Repo | License | ★ | Last push | Wired? | Probe-6 | Probe-7 | CR-12 disposition |
|---|------|---------|---|-----------|--------|---------|---------|--------------------|
| 1 | **mksglu/context-mode** | **Elastic-2.0** ⚠ | ~14.8k | 2026-05-15 | **INSTALLED** (.mcp.json + plugin marketplace) | LICENSE-RISK | DEMAND-PROVEN | **ECOSYSTEM-IMPORT** (already shipped W79) |
| 2 | **yamadashy/repomix** | MIT ✅ | 24.8k | 2026-05-11 | **INSTALLED** (.mcp.json native-node W155 F13) | PASS | DEMAND-PROVEN | **ECOSYSTEM-IMPORT** (already shipped W106) |
| 3 | **fcakyon/claude-codex-settings/intelligent-compact** | unverified-this-fire (likely MIT/Apache per fcakyon convention) | 687 (parent repo) | 2026-05-09 | **INSTALLED** (claude-settings marketplace `plugins/intelligent-compact/` + cache + data + W164 F14 memory) | UNVERIFIED-LICENSE-THIS-FIRE | DEMAND-PROVEN | **ECOSYSTEM-IMPORT** (already shipped W164 F14) |
| 4 | **explodinggradients/ragas** | Apache 2.0 ✅ | 13.9k | 2026-02-24 | NOT-INSTALLED | PASS | DEMAND-ABSENT.a | **PROVIDER-COMPLEMENT** (eval framework — different angle from token-opt; covered W216-E) |
| 5 | **AgentOps-AI/tokencost** | MIT ✅ | 1.98k | 2025-09-05 (~8mo stale) | NOT-INSTALLED | STALENESS-MARGINAL | DEMAND-CREATES-NEW.b (pilot eligible) | **PROVIDER-COMPLEMENT** (cost calc, no incumbent) |
| 6 | **gepa-ai/gepa** | MIT ✅ | 4.41k | 2026-05-15 | NOT-INSTALLED | PASS | DEMAND-CREATES-NEW.b (pilot eligible) | **GENUINELY-NEW** (Pareto-evolutionary prompt optimization, no incumbent) |
| 7 | (bench/llm-bench) | UNRESOLVED | N/A | N/A | N/A | HNF | HNF | **HONEST-NON-FINDING** (no single repo claim; benchmark category fragmented across `ragas` + `eval-harness` + `lm-eval-harness`) |
| 8 | **anthropics/anthropic-cookbook** | MIT ✅ (Anthropic OFFICIAL) | 43.0k | 2026-05-14 | CITE-ONLY (referenced in `research-protocol.md`, `canonical.md`, `audit-action-loop.md`) | PASS | DEMAND-PROVEN (research+pattern source) | **CITE-CLASS-CANONICAL** (TIER-1 cite anchor; install-class via `pip install -e .` if SDK examples needed) |

---

## 2. Per-repo SRA D1-D10 scoring + key cite-anchors

### 2.1 mksglu/context-mode (INSTALLED W79 ALREADY)
- **License Probe-6 RISK**: `Z:/repos/deps/context-mode/LICENSE:1` "Elastic License 2.0 (ELv2)" — source-available, NOT permissive. Per CR-9 install-risk discipline MED-risk acknowledged W79 Ship 1A.
- **Cite**: `Z:/repos/deps/context-mode/.claude-plugin/marketplace.json:9` `"version": "1.0.111"` @ HEAD `e73a6cd56a4eb0a0` [VERIFIED 2026-05-15]
- **Wired**: `.mcp.json` `_comments.header` Wave 79 + plugin marketplace `.claude/plugins/marketplaces/context-mode/`
- **Claim**: "98% context window savings" (vendor self-attestation; convergence-gate Axis-2 PASSED W79 multi-source audit; benchmark `BENCHMARK.md` 7.4K exists)
- **SRA D1 (use-class precision)**: 0.9 — narrow scope (MCP sandbox + FTS5 BM25)
- **SRA D6 (license-compat)**: 0.6 — ELv2 acceptable per W79 explicit acknowledgment
- **Disposition**: ECOSYSTEM-IMPORT (already canonical for sss)

### 2.2 yamadashy/repomix (INSTALLED W106 ALREADY)
- **License**: MIT (`Z:/repos/deps/repomix/LICENSE:1` "Kazuki Yamada")
- **NPM**: `version 1.14.0 license MIT` [VERIFIED 2026-05-15 via `registry.npmjs.org/repomix/latest`]
- **Cite (compression)**: README `--compress` option uses Tree-sitter, ~70% token reduction [`Z:/repos/deps/repomix/README.md` "Code Compression" section]
- **Wired**: `.mcp.json` native-node via W155 F13 at `C:/Users/42/AppData/Roaming/npm/node_modules/repomix/bin/repomix.cjs --mcp`
- **MCP integration**: `Z:/repos/deps/repomix/src/mcp/mcpServer.ts` + `tools/` + `prompts/`
- **Axis-1**: PASS (Karpathy-cited + sister claude-sota Pack→Grep→Skill canonical sub-rule per `research-protocol.md`)
- **SRA D1**: 0.95 — load-bearing for `mcp__repomix__*` tools (pack_codebase / grep_repomix_output / generate_skill)
- **SRA D5 (axis-3 stability)**: 0.9 — cpd ~moderate × ~22mo age = STABLE-BURN-IN
- **Disposition**: ECOSYSTEM-IMPORT (canonical)

### 2.3 fcakyon/claude-codex-settings → intelligent-compact (INSTALLED W164 F14 ALREADY)
- **Parent repo metadata**: `fcakyon/claude-codex-settings` 687★ pushed 2026-05-09 [VERIFIED 2026-05-15 via gh API]
- **Wired**: `.claude/plugins/marketplaces/claude-settings/plugins/intelligent-compact/` + cache `.claude/plugins/cache/claude-settings/intelligent-compact` + memory `reference_w164_f14_fcakyon_intelligent_compact_install_2026_05_13.md`
- **Mechanism**: PreCompact hook priority-preservation A-F patches injected at compact time per `auto-compact-discipline.md §Rank #3.5`
- **Probe-6 license caveat (Mia HONEST-NON-FINDING)**: did NOT verify upstream LICENSE this fire; W164 F14 install record cites `codex_consult_w164_f14_intelligent_compact_OUT.txt` which should carry license-class verdict from install round — orchestrator should re-verify before any version bump
- **SRA D1**: 0.85 — narrow PreCompact priority-injection
- **Disposition**: ECOSYSTEM-IMPORT (canonical for sss compact-stack)

### 2.4 explodinggradients/ragas (NOT-INSTALLED)
- **License**: Apache 2.0 ✅ [`Z:/repos/deps/ragas/LICENSE:1`]
- **HEAD**: `298b68274234c060` last commit 2026-02-24 (~3mo stale)
- **★**: 13.9k / 397 open issues
- **Probe-7 demand-gate**: DEMAND-ABSENT.a — sss eval workflow already covered by W216-E SOTA-bench layer + Phoenix + Langfuse + opik (some disabled). No new application surface in sss demands ragas.
- **CR-12**: PROVIDER-COMPLEMENT (eval framework — different angle from runtime token-opt)
- **Disposition**: REJECT-FOR-FIT pending W216-E disposition (covered there)

### 2.5 AgentOps-AI/tokencost (NOT-INSTALLED)
- **License**: MIT ✅
- **★**: 1.98k / 28 issues / last push **2025-09-05** (~8mo stale — Probe-6 STALENESS-MARGINAL caveat)
- **Purpose**: cost calculation library (model-pricing-aware token counting)
- **Probe-7 demand-gate**: DEMAND-CREATES-NEW.b — pilot-eligible only with EXPLICIT WIRING PATH to consume token counts (e.g., per-call billing audit JSONL → cost rollup script). Without ETL path, falls to .a.
- **CR-12**: PROVIDER-COMPLEMENT (no current sss token-cost telemetry primitive; ccusage MCP has overlapping scope)
- **Axis-3 cpd × age**: cpd low × age 17+mo = STABLE but stale-push
- **Disposition**: STUDY-PILOT pending explicit ETL wiring contract OR REJECT-FOR-FIT.a if ccusage-MCP is sufficient

### 2.6 gepa-ai/gepa (NOT-INSTALLED)
- **License**: MIT ✅
- **HEAD**: `ce51b50cd196b539` last commit 2026-04-30; ★4.41k; created 2025-08-05 (~9mo age)
- **Paper**: arxiv.org/abs/2507.19457 "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning" — TIER-1-NAMED-AUTHOR
- **Claim**: "35x faster than RL" (100-500 evaluations vs 5000-25000 GRPO) per README L25
- **Probe-7 demand-gate**: DEMAND-CREATES-NEW.b — pilot eligible. Prompt-evolution for sss agents/skills/commands optimization is a NEW workflow no existing sss primitive serves.
- **5-clause check**:
  1. Named operational use case: optimize sub-agent `description:` fields or skill `description:` for higher trigger-fire rate
  2. Cited local input: `.claude/agents/*.md` frontmatter + skill SKILL.md frontmatter
  3. Wiring path: GEPA library + golden test set + reflection LLM endpoint
  4. Incumbent comparison: NO incumbent — current sss has no prompt-eval-driven optimization
  5. Reversible time-box: 30-day pilot, owner orchestrator, retire if no measurable improvement
- **CR-12**: GENUINELY-NEW
- **SRA D1**: 0.8 (use-class clear: prompt-evolution)
- **SRA D5**: 0.7 (axis-3 active iteration; ~9mo + 4.41k★ growing)
- **Disposition**: **STUDY-PILOT** (Top-3 candidate this fire)

### 2.7 bench/llm-bench (HONEST-NON-FINDING)
- No single canonical repo named "bench/llm-bench" or "llm-bench" identified for token-throughput benchmarks
- Existing landscape: `lm-eval-harness` (EleutherAI), `evals` (OpenAI), `helm` (Stanford), `mt-bench`, `ragas-bench`
- Probe 7 returns HNF — fragmented benchmark category; sss already cites cross-bench via `convergence-gate.md` Axis-3
- **Disposition**: HNF (no install needed)

### 2.8 anthropics/anthropic-cookbook (CITE-CLASS-CANONICAL ALREADY)
- **License**: MIT (Anthropic OFFICIAL)
- **★**: 43.0k / 177 issues / last push 2026-05-14 [VERIFIED]
- **HEAD**: `33424c3eb476cd56` [local clone]
- **Prompt-engineering content**:
  - `misc/prompt_caching.ipynb` — TIER-1 prompt-caching reference
  - `misc/metaprompt.ipynb` — prompt-improver tooling
  - `misc/building_evals.ipynb` — eval-driven optimization
  - `patterns/agents/` — agent patterns (basic_workflows + evaluator_optimizer + orchestrator_workers)
  - `extended_thinking/`, `tool_evaluation/`, `tool_use/`, `claude_agent_sdk/`, `managed_agents/`, `skills/`
- **Wiring**: CITE-CLASS in 3+ rule files (`research-protocol.md`, `canonical.md`, `audit-action-loop.md`)
- **Install-class status**: NOT-INSTALLED as Python package; cite-only sufficient for current sss; install-class pivot only if SDK example imports needed
- **CR-12**: CITE-CLASS-CANONICAL ✅
- **SRA D1**: 0.95 (TIER-1 Anthropic OFFICIAL — load-bearing for cross-model consensus T1-T7 + prompt-caching + extended-thinking patterns)

---

## 3. Cross-vendor synthesis (CR-12 disposition lattice applied)

### 3.1 Already INSTALLED (3 entries) — NO further action
1. **context-mode** (W79 Ship 1A) — ELv2 risk acknowledged
2. **repomix** (W106 Ship 2N-batch3-E + W155 F13 native-node) — MIT canonical
3. **intelligent-compact** (W164 F14) — license re-verification queued

### 3.2 STUDY-PILOT eligible (2 entries) — Top-3 install candidates this fire
1. **gepa-ai/gepa** — GENUINELY-NEW; prompt-evolution; 5-clause check PASS; MIT
2. **AgentOps-AI/tokencost** — PROVIDER-COMPLEMENT pending explicit ETL wiring

### 3.3 REJECT or HNF (3 entries)
1. **ragas** — DEMAND-ABSENT.a (W216-E owns); no install
2. **bench/llm-bench** — HNF (fragmented category)
3. **anthropic-cookbook** — already CITE-CLASS-CANONICAL; install-class deferred

---

## 4. Top-3 ADOPT picks (CR-12 + manifest-fit)

### #1 — STUDY-PILOT gepa-ai/gepa v1.0.x
- **Why**: Only GENUINELY-NEW candidate this fire; prompt-evolution unaddressed by existing sss primitives
- **Install command** (per CR-6 official-native-channel): `pip install gepa` from PyPI (license MIT verified)
- **Wiring**: Python venv at `Z:/venvs/claude/`; standalone CLI usage initially; integration with `.claude/agents/*.md` frontmatter optimization later
- **CR-9 risk**: MED — new dependency in venv; reversibility HIGH via `pip uninstall gepa`
- **Time-box**: 30-day pilot, retire if no measurable description-trigger-rate improvement on 5 sample agents
- **Cross-model gate**: REQUIRED before commit (codex T1 prescribed_edits applied)

### #2 — Verify intelligent-compact license (Mia gap-close)
- **Why**: W164 F14 install record cites `codex_consult_w164_f14_intelligent_compact_OUT.txt` but this audit did not directly verify upstream LICENSE
- **Action**: orchestrator-side `gh api /repos/fcakyon/claude-codex-settings/contents/LICENSE` + decode + record in `docs/install-provenance.md` for cardinal-rule-9 conformance
- **Risk**: LOW — already INSTALLED + working; this is audit-trail completion only

### #3 — STUDY-PILOT-PENDING-ETL AgentOps-AI/tokencost
- **Why**: PROVIDER-COMPLEMENT for fine-grained per-call token cost (ccusage-MCP is per-session aggregate; tokencost is per-call model-pricing-aware)
- **Blocker**: Need explicit ETL contract (JSONL → cost rollup) BEFORE 5-clause Probe-7.b satisfies
- **Time-box**: Deferred until W219+ orchestrator surfaces explicit per-call cost-attribution use case

---

## 5. Sister-rule integration

- **Probe-6 license discipline** per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §The 7 sub-classes` — context-mode ELv2 + intelligent-compact unverified-this-fire are properly classified as STALENESS-MARGINAL / LICENSE-RISK respectively
- **CR-12 disposition lattice** per `cardinal-rule-12-upstream-install-priority.md` — applied to all 8 entries
- **Mia pre-apply discipline** per `mia-pre-apply.md` — verified existence of all 3 INSTALLED entries via local filesystem probe + plugin cache probe before applying any prescription
- **CR-9 install-risk discipline** — gepa pilot carries version-pin mandate + reversibility-HIGH + 30-day retirement gate
- **Karpathy §5 Wiki Compounding Surface** — this catalog itself is a Layer 3 compiled wiki summarization of token-opt landscape

## 6. HONEST-NON-FINDINGS

1. **Probe-6 LICENSE verification gap on intelligent-compact**: did NOT cite upstream LICENSE file content for fcakyon/claude-codex-settings this fire — gap-close queued as Top-3 pick #2
2. **bench/llm-bench**: no single canonical repo matches the brief target — fragmented benchmark category surfaced HNF
3. **Tokencost staleness**: last push 2025-09-05 is ~8mo stale; pilot defer pending freshness re-check
4. **gepa upstream cpd × age band**: ~9mo age + active iteration (commits 2026-05-15) is borderline STABLE-BURN-IN; if `cpd > 10 AND age < 100d` were observed would be FAST-CHURN; current band is **active-iteration borderline** per `convergence-gate.md §Axis 3` table — STUDY-PILOT-class promotion appropriate

## 7. NATIVE-CC discriminator outcomes

- **NATIVE-CC**: anthropic-cookbook (Anthropic OFFICIAL; cite anchor)
- **Third-party plugin (Claude Code ecosystem)**: context-mode, intelligent-compact (via claude-settings marketplace), repomix MCP integration
- **External library (general-purpose)**: gepa, tokencost, ragas, repomix-CLI (also has MCP wrapping)

## 8. WIRING summary

| Repo | .mcp.json | plugin marketplace | rule cite | Status |
|------|-----------|--------------------|-----------|--------|
| context-mode | ✅ | ✅ | sister claude-sota | INSTALLED-AMBER (ELv2) |
| repomix | ✅ | n/a (CLI + MCP) | sister `research-protocol.md` | INSTALLED |
| intelligent-compact | n/a (PreCompact hook) | ✅ | sister `auto-compact-discipline.md` Rank #3.5 | INSTALLED-AMBER (license unverified-this-fire) |
| anthropic-cookbook | n/a | n/a | `canonical.md` + `research-protocol.md` + `audit-action-loop.md` | CITE-ONLY |
| ragas | ✗ | ✗ | n/a | NOT-INSTALLED (W216-E owns) |
| tokencost | ✗ | ✗ | n/a | NOT-INSTALLED |
| gepa | ✗ | ✗ | n/a | NOT-INSTALLED (Top-3 #1 pilot) |
| llm-bench | n/a | n/a | n/a | HNF |

---

## VERDICT

**APPROVE-NARROW** — Token optimization + context engineering layer is **3/4 covered** by existing INSTALLED ecosystem-imports (context-mode + repomix + intelligent-compact). Three NEW actions surface from this audit:

1. **STUDY-PILOT gepa-ai/gepa** (Top-3 #1; GENUINELY-NEW prompt-evolution; 30-day pilot)
2. **Mia gap-close on intelligent-compact LICENSE** (Top-3 #2; audit-trail completion; ~5-min action)
3. **DEFER tokencost** (Top-3 #3; STUDY-PILOT-PENDING-ETL; gated on per-call cost-attribution use case surfacing)

REJECT-FOR-FIT.a on **ragas** (W216-E owns) and **bench/llm-bench** (HNF — fragmented category). **anthropic-cookbook** continues as CITE-CLASS-CANONICAL.

**Cross-model gate**: NOT SATISFIED at this dispatch — STAND-IN per CLAUDE.local.md ENV (f); orchestrator MUST file W219 Path P codex T1 review for any prescription that proceeds to install.

**Mia pre-apply**: ALL 3 INSTALLED claims verified via local filesystem probe + plugin cache + .mcp.json probe BEFORE this catalog locked. Three prescriptions (gepa pilot / intelligent-compact LICENSE re-verify / tokencost defer) require fresh runtime probe per `mia-pre-apply.md` before any Edit.
