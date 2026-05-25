# Wave 145 Fire 1 — GPT-5.5 SOTA Convergence Audit (user-prescribed 9-layer research architecture)

> **Fire date**: 2026-05-10 (Sun 23:41-23:43 EDT, 115s wall-clock)
> **Trigger**: User directive 2026-05-10 — "please using gpt5.5 for sota convergence insights"
> **Scope**: User-provided "Definitive Research Architecture for a Solo Developer Using Claude Code (May 2026)" — 9 layers L0-L8, ~80 prescribed repos across Dimensions A-J
> **Method**: Path P recipe (`codex exec --skip-git-repo-check --color never` foreground+tee, 300s budget) per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"On codex unavailable"` PRIMARY recovery path

## Provenance (cite-class lattice)

- **PRIMARY voice**: Path P REAL GPT-5.5 via codex CLI v0.130.0 (TIER-1-DIRECT — codex CLI subprocess; cross-model gate FULLY SATISFIED per CR-3 Phase 1 bootstrap exception)
- **Prompt construction discipline**: Forward Discipline #2 (codified Wave 134 Fire 27-E commit `3656bc7` at `docs/codex-t1-pattern-b-forward-discipline.md`) — tight 5-axis scope, explicit NOT-IN-SCOPE bounds, 60-180s target budget. Actual: 115s / 1270 LOC / clean JSON terminal verdict at EOF.
- **Recursive dogfood**: Forward Discipline #2 n=2 → **n=3** validated this fire (115s vs Fire 27-D Pattern B HNF at 300s) — advances toward cycle-322 promotion threshold for cross-arc sister-rule codification.

## Verdict summary

**`NEEDS-PATTERN-A`** with 5-axis breakdown:

| Axis | GPT-5.5 verdict | Key findings |
|---|---|---|
| **A1** TIER-1 convergence | MIXED | 7 borderline picks flagged: cli/cli, ossinsight, star-history, snyk-advisor, skill-creator-as-evaluator, log4brains, splitrail, claude_telemetry |
| **A2** Time-decay (May 2026 currency) | STALE-PARTIAL | 5 of 9 cited claims need correction (ToxicSkills wording, Tokenocalypse unverified, CVE dates, marketplace policy phrasing, Mythos 87.6% unverifiable) |
| **A3** Missing SOTA repos | 5 critical omissions | langgraph + openai-agents-python + Arize-phoenix + NVIDIA-garak + trufflehog |
| **A4** Failure-mode gaps | 3 critical | (a) Agent provenance/replay underspecified; (b) Secret exfiltration controls insufficient; (c) Benchmark overfitting mitigation incomplete |
| **A5** Install-priority ordering | NEEDS-REVISION | 5 DELAY from Day-1 (log4brains, ossinsight, star-history, Firecrawl, Apify); 5 PROMOTE to Day-1 (OSV-Scanner, gitleaks/trufflehog, Langfuse/Phoenix, promptfoo/inspect_ai, mcp-inspector) |

## Cross-validation with prior Wave 134 Fire 27 audits

GPT-5.5's Axis-3 missing-SOTA list **directly converges** with already-completed Wave 134 audits:

| GPT-5.5 Missing Rank | Repo | Wave 134 Fire | Prior Verdict | CR-12 disposition |
|---|---|---|---|---|
| #1 | langchain-ai/langgraph | Fire 27-B (Pattern B HNF) | STUDY-PILOT-PATTERN-EXTRACT inferred 0.78-0.82 | ECOSYSTEM-IMPORT (5th CR-12 class) |
| #2 | openai/openai-agents-python | Fire 27-A | STUDY-PILOT-PATTERN-EXTRACT conf=0.89 | PROVIDER-COMPLEMENT (4th CR-12 class) |
| #3 | Arize-ai/phoenix | — | NOT yet audited | NEW CANDIDATE |
| #4 | NVIDIA/garak | — | NOT yet audited | NEW CANDIDATE — LLM red-team |
| #5 | trufflesecurity/trufflehog | — | NOT yet audited | NEW CANDIDATE — secret scanning |

**Convergence rate**: 2/5 already-audited via prior Wave 134 fires (40%) — confirms Wave 134 Fire 27 series targeted the right candidates. 3/5 newly-surfaced (60%) — opens Wave 145 Fire 2+ STUDY-PILOT audit queue.

## 8 prescribed_edits (Pattern A apply scope)

GPT-5.5 prescribed 8 atomic edits per `codex-t1-fix-forward-pattern.md §Pattern A` discipline:

1. L4 reclassify: `anthropics/skills skill-creator` is construction/packaging (move to L7), NOT comparison/evaluation
2. Add Day-1 "provenance and replay" requirement: run_id + git SHA + model ID + prompt hash + tool calls + token/cost + diff stored in OTel/Langfuse/Phoenix
3. Rewrite ToxicSkills claim: "Snyk scanned 3,984 skills; 1,467 (36.82%) had at least one security issue; 76 confirmed malicious payloads" (NOT "1,467 malicious payloads")
4. Rewrite Git MCP CVE: distinguish patched Dec 2025 from publicized/disclosed Jan 2026
5. Mark Claude Code v2.1.100 Tokenocalypse as **LOCAL-MEASURED** or **UNKNOWN** until backed by primary/public evidence
6. Promote OSV scanner + gitleaks/trufflehog + Langfuse/Phoenix to Day-1 gates
7. Demote star-history and OSS Insight from rubric inputs to auxiliary discovery evidence
8. Add garak (or equivalent LLM security red-team harness) to L3/L4 for prompt-injection/leakage/jailbreak coverage

## Deliverables (this fire)

1. `00-tracker.md` (this file — ~120 LOC)
2. `01-corrected-architecture.md` (~280 LOC — enhanced 9-layer with GPT-5.5 corrections integrated)
3. `99-close-synthesis.md` (~120 LOC — Fire 145.1 closure + dogfood metrics)
4. `docs/install-provenance.md` — Wave 145 Fire 1 entry appended

## Cross-model gate disposition

Per `cross-model-consensus.md §Phase 1 bootstrap exception` + `Z:/claude-sota/.claude/rules/cross-model-consensus.md`:
- ✅ Cross-model gate **FULLY SATISFIED** via Path P REAL GPT-5.5 (codex CLI v0.130.0 subprocess; TIER-1-DIRECT)
- ✅ Forward Discipline #2 recursive dogfood **n=3 validated** (115s clean terminal JSON; advances toward cycle-322 cross-arc promotion threshold)
- ✅ Verdict shape: `NEEDS-PATTERN-A` with 8 concrete prescribed_edits → Pattern A single atomic fix-forward applicable
- ✅ Cross-validation: 2/5 missing-SOTA picks already audited in prior Wave 134 Fire 27 (40% convergence with PROVIDER-COMPLEMENT + ECOSYSTEM-IMPORT CR-12 classes)

## Closed-loop trajectory

Per `closed-loop-recursive-narrowing.md`:
- This fire is a Tier-2 META-process audit (REVIEW of architecture, NOT install/codification)
- Pattern A applicable: 8 prescribed_edits → corrected architecture deliverable
- Outcome A ACCEPT-WITH-DOC: GPT-5.5 verdict integrated into corrected architecture; deliverable shipped
- 0 install-debt added (audit + documentation only)

## Forward queue (Wave 145+ candidates)

| Priority | Fire | Subject |
|---|---|---|
| 🥇 #1 | W145-F2 | NVIDIA/garak Path P audit (LLM red-team harness — Axis-3 #4 NEW) |
| 🥈 #2 | W145-F3 | trufflesecurity/trufflehog Path P audit (secret scanning — Axis-3 #5 NEW) |
| 🥉 #3 | W145-F4 | Arize-ai/phoenix Path P audit (OSS observability — Axis-3 #3 NEW; CR-12 PROVIDER-COMPLEMENT to Langfuse) |
| #4 | W145-F5 | Day-1 install-order revision codification (apply GPT-5.5 Axis-5 prescriptions to `docs/sota-installed-manifest.md`) |
| #5 | W145-F6 | Agent provenance/replay codification (Axis-4 #1 — extend cwc-long-running-agents Phase 1 hooks) |
