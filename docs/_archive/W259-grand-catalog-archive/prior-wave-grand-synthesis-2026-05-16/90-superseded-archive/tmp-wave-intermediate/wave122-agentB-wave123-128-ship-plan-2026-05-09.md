---
title: Wave 123-128 Ship Plan Synthesis (Agent B Plan)
status: AUTHORITATIVE-PLAN
date: 2026-05-09
agent: Plan-B (a-wave122-agentB ad43b381dba277f47)
verdict: 6-wave plan; ~2490 LOC across 12 ships (split to 19+ sub-fires); 1 HIGH-risk gated by Path P codex T1
inherits_from: [tmp/wave121-agentC-architect-shipplan-2026-05-09.md, tmp/wave122-123-orchestrator-synthesis-2026-05-09.md]
---

# Wave 123-128 Ship Plan Synthesis

## Anchor state (verified 2026-05-09 by Agent B)

- HEAD: `4aae3de` (session checkpoint over `00eaca4` Wave 124 atomic Pattern A apply)
- Wave 122 P0 outstanding: ~1030 LOC across SHIP-122-A (6 codex_*.py hooks) + SHIP-122-B (INSTALLED-AMBER) + SHIP-122-C (STAGED triage) + SHIP-122-D (fm17d schema)
- Wave 124 atomic ALREADY committed: pin playwright/serena + agent_spawn_gate.py + CR-7 honest + manifest §4/§17 drift cleanup
- 6 NEW Anthropic plugins (clickhouse/pigment/qdrant-skills/zilliz/dash0/outputai shipped 2026-05-07) NOT installed
- `sota-definition-v2.md` NOT promoted from `tmp/`
- 5 NEW failure-mode candidates (FM-21..FM-25) NOT in `named-failure-modes.md`
- spec-kit GENUINE-NEW install pending (Mia-confirmed only n=1 install gap)
- Agent A outer-research kits deep-dive Top-5: ARTIFACT-NOT-YET-PRESENT (`tmp/wave122-agentA-outer-research-deep-dive-2026-05-09.md` absent at synthesis-time) — placeholder integration in Wave 127 with revisit-gate

## Wave-by-wave plan

### Wave 123 — Close-the-loop on Wave 122 P0 (PREDECESSOR-CRITICAL)

**Theme**: Closure of deferred Wave 122 P0; ZERO new installs; pure debt-paydown
**Predecessor gate**: NONE (this is the immediate next ship)
**Dispatch shape**: 3-agent fan-out (1 implementor + 1 codex T1 verifier via Path P + 1 mia-pre-apply prober)
**Termination**: on_handoff_to: orchestrator | max_turns: 25 | terminationCondition: on_text_match: "DESIGN-COMPLETE:" | OUTPUT_BUDGET: 800 LOC

**SHIP-123-A — Tier-1a codex T1-T7 hooks completion (was Wave 122 SHIP-122-A; ~600 LOC; risk MEDIUM)**
- 6 sibling cite-import targets at `Z:/claude-sota-installed/.claude/hooks/scripts/`:
  - `codex_failure_audit.py` / `codex_mcp_healthcheck.py` / `codex_review_thread_bridge.py` / `codex_review_trace.py` / `codex_stop_review_gate.py` / `codex_stuck_detector.py`
- CR-12 priority: Path A upstream-install probe FIRST per `Z:/claude-sota/.claude/hooks/scripts/` sibling already-shipped; if Path A HONEST-NON-FINDING confirmed, Path B sibling cite-import authorized
- Mia pre-apply cheap-probe: `gh search code "filename:codex_failure_audit.py org:openai org:anthropic" --limit 5` to falsify Path A
- Cardinal-rule conformance: CR-1 (cite sibling SHA) / CR-3 (codex T1 BG fan-out per hook) / CR-6 (sibling HEAD freshness) / CR-9 (revert = single `git revert`) / CR-10 (research-first via probe) / CR-11 (META-process = atomic per-hook commit) / CR-12 (Path A first)
- HIGH-risk fallback if codex T1 NEEDS-REVISION conf<0.85: round-2 Pattern A v2; round-3 = REVERT-AND-REMOVE per Wave 121 §2.7

**SHIP-123-B — INSTALLED-AMBER + STAGED + fm17d schema (combined ~430 LOC; risk LOW)**
- 6 INSTALLED-AMBER row closures (manifest §11/§13/§14)
- 19 STAGED rows triage (Qdrant wire / Graphiti env)
- fm17d_stall_detector.py SubagentStop schema fix (Wave 121 SHIP A11)
- Pre-condition: SHIP-123-A merged (shared `.claude/settings.json` hook-chain region)
- Mia pre-apply cheap-probe: `cat .claude/settings.json | jq '.hooks.SubagentStop'` for current schema before edit
- CR conformance: CR-5 (no install; closure-only) / CR-9 (LOW; revert = field-level)

### Wave 124 — Already shipped (commit 00eaca4); no further work needed

(Documented for trail completeness — Wave 124 atomic Pattern A apply landed; cross-model gate satisfied via codex T1 NEEDS-REVISION conf=0.91 REAL GPT-5.5 BRIDGE-MODE)

### Wave 125 — 6 NEW Anthropic plugins install (FRESH FRONTIER)

**Theme**: Last-60d Anthropic-OFFICIAL plugins shipped 2026-05-07; CR-12 Path A native-channel
**Predecessor gate**: Wave 123 SHIP-123-A merged (codex T5 plan-review hook needs to be active for plugin-install audit trail)
**Dispatch shape**: single-agent (general-purpose; mechanical install via `/plugin marketplace update` + `/plugin install`)
**Termination**: on_handoff_to: orchestrator | max_turns: 12 | terminationCondition: on_text_match: "DESIGN:" | OUTPUT_BUDGET: 350 LOC

**SHIP-125-A — Refresh marketplace + install 6 plugins (~250 LOC; risk MEDIUM)**
- Plugins: clickhouse / pigment / qdrant-skills / zilliz / dash0 / outputai
- CR-12 PRIMARY upstream: `anthropics/claude-plugins-official` HEAD refresh
- Mia pre-apply cheap-probe: `ls .claude/plugins/marketplaces/claude-plugins-official/.claude-plugin/plugin.json | jq '.plugins[] | select(.name == "clickhouse")'` to confirm plugin present in marketplace before install
- Cardinal-rule conformance: CR-1 (TIER-1-DIRECT to anthropics/claude-plugins-official marketplace.json) / CR-3 (codex T1 review queue per plugin via T2 commit-time hook) / CR-5 (Path A native channel) / CR-6 (live marketplace fetch) / CR-9 (LOW per plugin uninstall = single `/plugin uninstall <name>`; AGGREGATE MED for 6×) / CR-10 (research-first via Mia probe) / CR-11 (one logical unit = one plugin per ship-fire — recommend split to 6 sub-fires) / CR-12 (PRIMARY)
- Cross-model gate: codex T2 commit-time hook auto-fires; no Path P needed

**SHIP-125-B — Manifest §3 row append (6 plugins; ~50 LOC; risk LOW)**
- Append 6 install rows + provenance entry
- Pre-condition: SHIP-125-A merged
- Mia pre-apply cheap-probe: `claude plugin list | grep -E "clickhouse|pigment|qdrant-skills|zilliz|dash0|outputai"` to verify install state before doc-update

### Wave 126 — sota-definition-v2 promotion + FM-21..FM-25 codification

**Theme**: META-process advance — promote staged rule + 5 NEW failure-mode META-router rows
**Predecessor gate**: Wave 125 merged (manifest stable for §11.5 cross-reference)
**Dispatch shape**: 3-agent fan-out (1 implementor + 1 codex T1 architect-review via Path P + 1 META-router admin verifier)
**Termination**: on_handoff_to: orchestrator | max_turns: 18 | terminationCondition: on_text_match: "DESIGN-COMPLETE:" | OUTPUT_BUDGET: 600 LOC

**SHIP-126-A — Promote sota-definition-v2.md from tmp/ to .claude/rules/ (~120 LOC; risk MEDIUM)**
- `git mv tmp/wave123-agentF-improved-sota-definition-2026-05-09.md .claude/rules/sota-definition-v2.md`
- Add cite anchor in CLAUDE.md cardinal-rules block referencing the new rule
- Mia pre-apply cheap-probe: `wc -l tmp/wave123-agentF-improved-sota-definition-2026-05-09.md` (verify ≤600 LOC budget) + `grep -n 'sota-definition-v2' .claude/rules/*.md` (verify no cross-ref drift)
- Cardinal-rule conformance: CR-1 (verbatim TIER-1 cites already in artifact) / CR-3 (codex T1 architect review BEFORE git mv per Path P; HIGH-risk justification) / CR-8 ADAPTED-FROM-SOTA + DOGFOOD (this rule was authored under its own discipline) / CR-11 (META-process advance n=1 user-trigger 2026-05-09)
- HIGH-risk fallback: if codex T1 conf<0.85, KEEP IN tmp/ as STAGED reference; revert = `git mv` reverse

**SHIP-126-B — FM-21..FM-25 META-router rows in named-failure-modes.md (~180 LOC; risk LOW)**
- 5 NEW rows: decision-observability / trajectory-token-overflow / push-based-completion-absence / adaptive-degradation-rollback / judge-κ-degradation
- Each codified at n=1 with promotion gate at n=3 per cycle-322
- Pre-condition: SHIP-126-A merged (sota-definition-v2 rule provides Axis-7 ARCHITECTURAL-NOVELTY framing for new FMs)
- Mia pre-apply cheap-probe: `grep -c "^| FM-" .claude/rules/named-failure-modes.md` baseline-count BEFORE edit
- CR conformance: CR-1 (cite Agent G arxiv discoveries) / CR-9 (LOW; named-failure-modes.md is META-router doc) / CR-11 (cumulative-evidence ladder Wave 122 advance)

### Wave 127 — Agent A outer-research integration + spec-kit install

**Theme**: Integrate parallel Agent A Top-5 deep-dive findings + GENUINE-NEW spec-kit install
**Predecessor gate**: SHIP-126-A merged (sota-definition-v2 framework needed to score Agent A Top-5)
**REVISIT-GATE**: Agent A artifact MUST be present at `tmp/wave122-agentA-outer-research-deep-dive-2026-05-09.md`; if absent at Wave 127 fire-time, HALT + dispatch Agent A retry
**Dispatch shape**: 5-agent fan-out (Agent A artifact reader + Agent G frontier rescan + codex T1 Path P + Mia OVER prober + general-purpose installer)
**Termination**: on_handoff_to: orchestrator | max_turns: 30 | terminationCondition: on_text_match: "DESIGN-COMPLETE:" | OUTPUT_BUDGET: 1000 LOC

**SHIP-127-A — Agent A Top-5 score + ADOPT-NOW execution (~300 LOC; risk MEDIUM)**
- Score Agent A Top-5 against sota-definition-v2 7 axes
- Mia pre-apply cheap-probe: per-candidate `gh repo view <slug> --json licenseInfo,stargazerCount,updatedAt` BEFORE install
- For each ADOPT-NOW: separate atomic install per ONE-LOGICAL-UNIT-PER-FIRE (recommend sub-ship 127-A1 through 127-A5)
- CR conformance: CR-1 (TIER-1-DIRECT live API) / CR-3 (codex T1 per ADOPT-NOW candidate) / CR-9 (per-install MED; aggregate HIGH = MUST split) / CR-12 (Path A first per candidate)

**SHIP-127-B — spec-kit install (~80 LOC; risk LOW)**
- Single-source GENUINE-NEW install per Wave 122 Mia probe
- `gh release download --repo github/spec-kit` per `install-from-github-discipline.md`
- Mia pre-apply cheap-probe: `which spec-kit || gh release list --repo github/spec-kit --limit 1`
- CR conformance: CR-1 / CR-5 (Path A) / CR-6 (live release fetch) / CR-9 LOW

**SHIP-127-C — Manifest §10 spec-kit row + §3 Top-5 rows (~80 LOC; risk LOW)**
- Pre-condition: SHIP-127-A + SHIP-127-B merged

### Wave 128 — Long-tail closure (CC binary + arxiv MCP + manifest §15 eval-axis)

**Theme**: Final closure of beyond-kits frontier discoveries + Section 15 eval-axis populate
**Predecessor gate**: SHIP-126-A merged (sota-definition-v2 Axis-6 BENCHMARK-PROVENANCE drives §15 row design)
**Dispatch shape**: 3-agent fan-out (eval-axis populator + CC binary updater + arxiv MCP fix-or-remove)
**Termination**: on_handoff_to: orchestrator | max_turns: 20 | terminationCondition: on_text_match: "DESIGN-COMPLETE:" | OUTPUT_BUDGET: 700 LOC

**SHIP-128-A — Section 15 eval-axis populate (~250 LOC; risk LOW)**
- Add rows: truera/trulens (Agent C ADOPT-NOW) + Phoenix already-wired confirmation + AgentProp-Bench cite + AHE Terminal-Bench 2 cite + 5 arxiv papers cite-only
- Mia pre-apply cheap-probe: `grep -c "Section 15" docs/sota-installed-manifest.md` (currently empty axis)
- CR conformance: CR-1 (5 arxiv cites already TIER-1-DIRECT in Wave 122 Agent G synthesis) / CR-8 cite-class only (no install) / CR-9 LOW

**SHIP-128-B — arxiv MCP transport disconnect fix (~100 LOC; risk MEDIUM)**
- FM-03 D1 recovery: re-wire OR remove from `.mcp.json` §8
- Mia pre-apply cheap-probe: `cat .mcp.json | jq '.mcpServers | to_entries[] | select(.key | contains("arxiv"))'`
- Decision tree: if arxiv MCP package still maintained → re-wire; else → remove + add `exa` substitution per FM-16 META-router fallback
- CR conformance: CR-1 / CR-5 / CR-9 MEDIUM (transport flip; revert = .mcp.json single-key delete)

**SHIP-128-C — CC binary update v2.1.119 → v2.1.136 (~50 LOC; risk MEDIUM)**
- 3 updates in window: v2.1.126 / v2.1.129 / v2.1.136
- Mia pre-apply cheap-probe: `claude --version` (currently 2.1.119) + `npm view @anthropic-ai/claude-code version` for latest
- CR conformance: CR-6 (live npm fetch) / CR-9 MEDIUM (CC host runtime change; revert = `npm install -g @anthropic-ai/claude-code@2.1.119`)
- HIGH-risk-band fallback: post-install monitor 24h via persistent monitor for FM-17.* class regressions before declaring CLOSED

## Cross-cutting concerns (apply to ALL waves)

1. **Mia pre-apply discipline** (Wave 112 Ship 2CC n=29→52 ladder): every ship has explicit cheap-probe shape that operator runs BEFORE Edit
2. **CR-12 Path A first**: every install/import probes Path A native-channel BEFORE Path B sibling cite-import; HONEST-NON-FINDING required for Path B authorization
3. **CR-9 install-risk band**: all HIGH-risk ships have explicit revert path documented at ship-spec time
4. **CR-3 cross-model gate**: HIGH-risk ships use Path P codex T1 BRIDGE-MODE per CR-3 Phase 1 bootstrap exception (foreground+tee from main session per FM-17.e recovery)
5. **ONE-LOGICAL-UNIT-PER-FIRE**: aggregate-MED ships (SHIP-125-A 6-plugin, SHIP-127-A 5-candidate) MUST split to sub-fires
6. **Pattern A v2 multi-round** (Wave 121 §2.7): expect Pattern A round-2 on each codex T1 NEEDS-REVISION; round-3 = REVERT-AND-REMOVE
7. **OUTPUT_BUDGET per-ship**: 300-600 LOC artifact at `tmp/wave12{3..8}-ship<X>-<topic>-2026-05-<DD>.md`
8. **FM-17.e/.f defense**: every Path P codex T1 consult cites per-call budget (90s default / 120s cap) + rolling-window quota check
9. **Pre-condition gate enforcement**: ships with predecessor gates MUST verify predecessor commit SHA in `git log --oneline` before fire

## Total wave-cycle estimate

| Wave | Theme | Ships | LOC | Risk-band aggregate | Cross-model gate |
|---|---|---|---|---|---|
| 123 | Close-the-loop W122 P0 | 2 (123-A + 123-B) | ~1030 | MEDIUM | Path P codex T1 per hook |
| 124 | (already shipped 00eaca4) | 0 | 0 | — | — |
| 125 | 6 NEW Anthropic plugins | 2 (split 125-A1-A6 + 125-B) | ~300 | MEDIUM | T2 commit-time auto |
| 126 | sota-def-v2 + FM-21..25 | 2 (126-A + 126-B) | ~300 | MEDIUM | Path P codex T1 (126-A) |
| 127 | Agent A Top-5 + spec-kit | 3 (127-A1-5 + 127-B + 127-C) | ~460 | MEDIUM | Path P per ADOPT-NOW |
| 128 | Long-tail closure | 3 (128-A + 128-B + 128-C) | ~400 | MEDIUM | T2 commit-time auto |
| **Total** | **6 waves** | **12 ships (split 19+ sub-fires)** | **~2490 LOC** | — | — |

## Risk-band summary

- **HIGH-risk**: SHIP-126-A (rule promotion — META-process change; Path P codex T1 mandatory)
- **MEDIUM-risk**: SHIP-123-A / SHIP-125-A (per-plugin) / SHIP-126-A / SHIP-127-A (per-candidate) / SHIP-128-B / SHIP-128-C
- **LOW-risk**: SHIP-123-B / SHIP-125-B / SHIP-126-B / SHIP-127-B / SHIP-127-C / SHIP-128-A

## 1-line synthesis

Recommend executing Wave 123 first ship: SHIP-123-A Tier-1a codex T1-T7 hooks completion (~600 LOC; 6 sibling cite-imports at `.claude/hooks/scripts/`; CR-3 cross-model gate via Path P codex T1; closes Wave 122 P0 outstanding ~1030 LOC blocker before any Wave 125-128 frontier advances)

## Critical Files for Implementation

- Z:/claude-sota-installed/.claude/hooks/scripts/codex_failure_audit.py (NEW; SHIP-123-A target)
- Z:/claude-sota-installed/.claude/hooks/scripts/codex_mcp_healthcheck.py (NEW; SHIP-123-A target)
- Z:/claude-sota-installed/.claude/settings.json (SHIP-123-A hook-chain wire + SHIP-123-B fm17d schema)
- Z:/claude-sota-installed/docs/sota-installed-manifest.md (every wave touches §3/§11/§13/§14/§15)
- Z:/claude-sota-installed/.claude/rules/sota-definition-v2.md (SHIP-126-A promotion target from tmp/)

DESIGN-COMPLETE: 6-wave plan SYNTHESIZED with TIER-1-DIRECT cites + cardinal-rule conformance + Mia pre-apply cheap-probes + risk-band classification + dispatch-shape per CR-3+CR-9+CR-11+CR-12 + ONE-LOGICAL-UNIT-PER-FIRE sub-split discipline + Path P codex T1 BRIDGE-MODE for HIGH-risk. Wave 127 has REVISIT-GATE for Agent A artifact arrival. Plan complete.
