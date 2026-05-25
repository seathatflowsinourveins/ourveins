# W314-Stream-D — Borda Ranking Matrix

**Wave**: W314 · **Stream**: D · **Date**: 2026-05-19

Per sca-v6 Δ7 (W310-ship per W309-Stream-B-SCA-V6-DESIGN.md): opt-in head-to-head comparison via cross-candidate Borda matrix. W314-D applies Borda where 2+ candidates compete in same area.

## Cohort 1 — Memory MCPs (4 candidates competing in same axis)

Candidates from W314-D net-new discovery + W314 awareness of the installed cohort (`basic-memory` T6, `cognee` T3, `hindsight` T1, `memory` plugin T2):

| Candidate | D5 evidence | D7 maint | D10 dup | D13 pattern | D14 reversibility | D17 robustness | D24 attack-surface | D28 long-running | Total |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Mibayy/token-savior** | 3 | 4 | 4 | 4 | 5 | 3 | TBD-3 | 4 | **30** |
| **samvallad33/vestige** | 3 | 4 | 4 | 5 | 5 | 3 | TBD-3 | 4 | **31** |
| **agentic-box/memora** | 2 | 4 | 3 | 3 | 4 | 3 | TBD-3 | 3 | **25** |
| **doobidoo/mcp-memory-service** (also surfaced) | 3 | 4 | 3 | 3 | 4 | 3 | 3 | 4 | **27** |

**Borda rank**: 1st `vestige` (31) · 2nd `token-savior` (30) · 3rd `mcp-memory-service` (27) · 4th `memora` (25)

**Winner (Borda-pareto)**: `samvallad33/vestige` — narrowest margin over token-savior, primarily on D13 pattern-extractability (FSRS-6 spaced repetition is the truly novel pattern axis). Recommendation: **W315 dual-track** — extract vestige's FSRS-6 decay pattern into a local-skill layer that composes with installed basic-memory + cognee + hindsight stack (do NOT install vestige itself — D17 + D24 caps). Token-savior is a separate axis (structural-code-nav + persistent memory) and warrants its own W315 deep-ingest.

## Cohort 2 — Multi-Agent Orchestrators (3 candidates competing with installed `wshobson/agent-teams` T2)

| Candidate | D5 | D7 | D10 (vs agent-teams installed) | D13 | D14 | D17 | D28 | Total |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **affaann-m/claude-swarm** | 3 | 4 | 2 (direct overlap) | 4 | 4 | 3 | 4 | **24** |
| **yeshuibo/agentflow** | 3 | 4 | 3 (graph-DAG distinct) | 5 | 4 | 3 | 4 | **26** |
| **mohsen1/claude-code-orchestrator** | 3 | 4 | 2 (Director/EM/Workers hierarchical overlap) | 4 | 4 | 3 | 4 | **24** |
| **dlorenc/multiclaude** | 3 | 4 | 2 (tmux-MMORPG overlap) | 4 | 3 | 3 | 4 | **23** |

**Borda rank**: 1st `agentflow` (26) · 2nd `claude-swarm`=`cco` (24 tied) · 4th `multiclaude` (23)

**Winner**: `yeshuibo/agentflow` — its **graph-DAG primitive set (fanout/merge/on_failure)** + **cross-LLM (claude+codex+kimi) orchestration** are genuinely novel axes that agent-teams does NOT cover. T2 VENDOR-FORK recommended for W315; W315 should deep-ingest agentflow's `fanout()` + `merge()` API surfaces and consider local Python adapter that composes with installed agent-teams (NOT a replacement, an ADDITIVE primitive).

## Cohort 3 — Skill Collections (2 strong + 1 incumbent competing in skill-marketplace axis)

| Candidate | D5 | D6 author-prior | D7 | D10 | D13 | D14 | D16 governance | D17 | Total |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **addyosmani/agent-skills** | 4 | 5 | 4 | 4 | 5 | 5 | 3 | 4 | **34** |
| **anthropics/skills** (135k★ official) | 5 | 5 | 5 | 4 (already partly absorbed via document-skills+example-skills plugins) | 5 | 5 | 5 | 5 | **39** |
| **mattpocock/skills** (T2 vendor-fork HOLD) | 4 | 4 | 4 | 4 | 5 | 5 | 2 (solo-but-passes-<2-strict) | 4 | **32** |

**Borda rank**: 1st `anthropics/skills` (39) · 2nd `addyosmani/agent-skills` (34) · 3rd `mattpocock/skills` (32)

**Winner**: `anthropics/skills` — the canonical official 135k★ collection, but **already partially absorbed** via the installed `document-skills` + `example-skills` cohort. W315 action: **expand absorption** of anthropics/skills to include any uninstalled SKILL.md from the upstream repo (per CLAUDE.md L8 "Target install set: ... claude-plugins-official (selected)"). `addyosmani/agent-skills` is the **strongest NEW skill collection** with high author-prior weight; W315 should attempt T2 VENDOR-FORK with cascade-completion (repomix deep-ingest + context7 canonical-docs check).

## Cohort 4 — LLM Evaluation Frameworks (HF papers vs installed inspect_ai + promptfoo)

| Reference | What it brings | Already-installed? |
|---|---|:---:|
| HCAST (METR) | 189-task time-horizon eval suite | NO — adoptable as eval lane |
| SWE-Bench Pro | 1865 enterprise-class long-horizon coding tasks | NO — adoptable as eval lane |
| Inspect (UK AISI) | Eval framework | YES — `inspect_ai` already wired in `harness/eval_harness.py` per CLAUDE.md L40 |
| MultiAgentBench (2503.01935) | Multi-agent collaboration/competition eval | NO — adoptable for agent-teams eval |
| HarnessAudit (2605.14271) | Trajectory-level safety audit | NO — adoptable as Stop-hook companion gate |

**Borda rank** (D5 typed evidence × D29 browse-and-retrieval × D17 robustness):
1. HarnessAudit (paper 2605.14271, May 2026) — most aligned with cardinal-rule-5 safety-boundaries
2. SWE-Bench Pro — most aligned with W259 ship-discipline gate
3. HCAST + TH1.1 — METR time-horizon adoptable into eval_harness.py

**Recommendation**: W315 should add **HarnessAudit-Bench** as a Stop-hook-companion safety-gate (cardinal-rule-5 + W286-arc + W312-D §3 plugin-native Stop-hook reconciliation), and **SWE-Bench Pro** as a ship-gate eval lane.

## Top-3 NET-NEW for W315 follow-up

Based on Borda + sca-v7 scoring + cascade-degraded gating:

1. **`yeshuibo/agentflow`** — T2 VENDOR-FORK; novel DAG primitives complement installed agent-teams (Cohort 2 winner)
2. **`addyosmani/agent-skills`** — T2 → T1 promotion candidate; high author-prior pedigree (Cohort 3 second-place; anthropics/skills is the formal Cohort 3 winner but already-absorbed)
3. **`samvallad33/vestige`** — T3 PATTERN-STUDY; extract FSRS-6 spaced-repetition decay pattern into local-memory-skill (Cohort 1 winner)

Plus the **eval-lane augmentation** from Cohort 4:
4. **HarnessAudit-Bench** (HF paper 2605.14271) — Stop-hook safety-companion gate
5. **SWE-Bench Pro** — ship-gate eval lane (composes with existing inspect_ai + promptfoo)
