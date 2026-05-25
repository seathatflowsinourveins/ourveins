---
title: W168 P5 SOTA Memory Cross-Session Deep-Dive — 5-Repo CR-12 Verdict
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (Sonnet-stand-in per FM-17.g codex-rescue defense)
wave: 168
fire: P5
output_budget: 600 LOC
verdict: VERDICT-ALL-5
---

# W168 P5 SOTA Memory Cross-Session Deep-Dive

## R0 Hypothesis (falsifiable)

"At least one of {mem0, letta, cognee, agentmemory, openviking} is GENUINELY-NEW per CR-12 + crosses scale-threshold (≥100k memories OR ≥1 GB OR p95≥100ms OR multi-process OR named workflow) such that INSTALL adds load-bearing capability over INCUMBENT mcp-memory v10.51.3 + graphiti v0.29.0 stack."

**Rejection criterion**: 5/5 = DEFER OR DUPLICATE OR PROBE-6-BLOCKED → hypothesis REFUTED.

## R1 Incumbent Baseline [VERIFIED 2026-05-13]

- L1 capture: doobidoo/mcp-memory-service v10.51.3 (Apache-2.0, 1,809★) + sqlite_vec at `Z:/claude-sota-installed-state/.mcp-memory/memory.db`; 22 memories / 0.11 MB
- L3 temporal-KG: getzep/graphiti v0.29.0 (Apache-2.0, 25,800★) + FalkorDB v1.6.1 Docker
- W164 F38c: vector-DB-scale-REFUTED — sqlite-vec KEEP until ≥100k OR ≥1GB OR p95≥100ms OR multi-process OR named workflow

## R2 5-Repo Verdict Table (CR-12 disposition lattice)

| # | Repo | HEAD commit | LICENSE blob-SHA | ★ | Age | LICENSE | CR-12 disposition | Scale gate |
|---|------|-------------|-------------------|-----|-----|---------|--------------------|------------|
| 1 | mem0ai/mem0 | `70bc9e51` | `d20d5102` | 55,586 | 35mo | Apache-2.0 | **PARTIAL-OVERLAP + STUDY-PILOT-NARROW** | DEFER until threshold |
| 2 | letta-ai/letta | `bb52a890` | `f75c3422` | 22,694 | 31mo | Apache-2.0 | **PARTIAL-OVERLAP** (different paradigm) | DEFER-INCUMBENT-KEEP |
| 3 | topoteretes/cognee | `5432f0cb` | `fd57f687` | 17,211 | 21mo | Apache-2.0 | **DUPLICATE-FUNCTIONALITY** | DEFER-INCUMBENT-KEEP |
| 4 | rohitg00/agentmemory | `87fae50b` | `cb13c728` | 7,060 | 2.5mo | Apache-2.0 | **AXIS-3 FAIL FAST-CHURN + PARTIAL-OVERLAP** | DEFER-INCUMBENT-KEEP |
| 5 | volcengine/OpenViking | `527d68d3` | `27268c8e` | 23,864 | 4mo | **AGPLv3** | **PROBE-6 BLOCKED — REJECT-FOR-FIT** | N/A (structural blocker) |

**Aggregate**: 5/5 = DEFER OR REJECT → **R0 hypothesis REFUTED** → INCUMBENT KEEP.

## R3 Per-Repo Highlights

### Repo 1 — mem0ai/mem0 (PARTIAL-OVERLAP + STUDY-PILOT-NARROW)
- Apache-2.0 (Taranjeet Singh 2023); Y Combinator S24 batch; paper arXiv:2504.19413 Chhikara et al. 2025
- LongMemEval 94.8 / LoCoMo 91.6 benchmarks (production-scale 1M-10M tokens)
- Multiple surfaces: `pip install mem0ai` + npm `@mem0/cli` + Cloud (app.mem0.ai) + 5 production skills
- Probe 5 requires OpenAI API (configurable to CLIProxyAPI at 127.0.0.1:11700 — compatible)
- CR-12 PARTIAL-OVERLAP rationale: ADD-only single-pass extraction + entity linking + temporal reasoning + BM25+semantic+entity fusion (mcp-memory passive store/recall only)
- **SCALE-THRESHOLD GATE**: 22 memories / 0.11 MB ≪ threshold → value props not realized at current sss scale
- **Verdict**: DEFER-INCUMBENT-KEEP; STUDY-PILOT-NARROW eligible at scale-threshold crossing OR named-workflow emergence (Probe 7.b 5-clause check)

### Repo 2 — letta-ai/letta (PARTIAL-OVERLAP different paradigm)
- Apache-2.0; formerly MemGPT; companion `letta-ai/letta-code` 2,465★ CLI + `letta-ai/claude-subconscious` 2,729★ CC plugin
- Architectural mismatch: letta = full stateful-agent framework; sss orchestration model = Claude orchestrates / codex reviews (Claude Code IS the agent)
- **Probe 7.a DEMAND-ABSENCE**: sss has NO workflow benefiting from stateful agent framework
- letta-ai/claude-subconscious "background agent that whispers to Claude Code" — interesting demo per upstream's own disclaimer "not intended to be used in production"
- **Verdict**: DEFER-INCUMBENT-KEEP

### Repo 3 — topoteretes/cognee (DUPLICATE-FUNCTIONALITY)
- Apache-2.0 (W164 F38c REJECT-AGPL prior memory was WRONG license — **2026-05-13 LICENSE re-verify confirms Apache-2.0 not AGPL**); HEAD active yesterday
- CC plugin `topoteretes/cognee-integrations/integrations/claude-code` auto-captures via hooks; syncs at session-end
- **DUPLICATE-FUNCTIONALITY per kiss-dry-yagni Must-Never #4**: cognee L1=mcp-memory L1; cognee L3=graphiti L3; CC-plugin session-end-bridge overlaps Karpathy §5 5-surface dual-write
- Probe 4 plugin-namespace: `@cognee/cognee-openclaw` directly competes with incumbent mcp-memory + graphiti MCP servers
- W164 F38c REJECT updated: DUPLICATE-FUNCTIONALITY + scale-threshold-REFUTED (NOT AGPL — license cite was prior-error)
- **Verdict**: DEFER-INCUMBENT-KEEP

### Repo 4 — rohitg00/agentmemory (AXIS-3 FAIL + PARTIAL-OVERLAP)
- Apache-2.0; built on `iii engine` (github.com/iii-hq/iii)
- Age 2.5 months < 90d burn-in floor; 7,060★ in 2.5mo = launch-spike signature
- Single individual maintainer (Rohit Ghumare) NOT named-T1 org → STRONG-PROVENANCE-EXPRESS FAILS
- Per W164 F36 + Wave 138 launch-spike defense: unknown-org + age<90d + cpd>50 → REJECT-UNTIL-CONVERGENCE
- Claims "persistent memory for Claude Code/Cursor/Codex/Hermes/OpenClaw" — SAME ground as INCUMBENT mcp-memory
- **Verdict**: DEFER-INCUMBENT-KEEP; re-audit at age ≥90d (~2026-05-25)

### Repo 5 — volcengine/OpenViking (PROBE-6 BLOCKED REJECT-FOR-FIT)
- LICENSE direct-read 2026-05-13: **"GNU AFFERO GENERAL PUBLIC LICENSE Version 3"** [VERIFIED]
- AGPLv3 ≠ permissive-license whitelist (MIT/Apache-2.0/BSD per `ahfv-seven-sub-classes.md §Probe 6`)
- §13 "remote network interaction" disclosure obligations for any LLM tool calls routing through OpenViking
- Description: "open-source context database for AI Agents (such as openclaw)" — Claude-derivative cohort
- Same blocker class as W164 F38c openviking-org AGPLv3 (org rebrand `openviking/* → volcengine/OpenViking` 2026-01)
- Probe 5: Volcengine (ByteDance subsidiary) adds geopolitical risk class
- **Verdict**: PROBE-6-BLOCKED — REJECT-FOR-FIT. No re-audit pathway unless upstream relicenses.

## R4 Convergence-Gate Per-Repo Summary

| Candidate | Axis 1 (≥3 orgs) | Axis 2 (≥2 T2 dated) | Axis 3 (≥90d) | PASS? |
|---|---|---|---|---|
| mem0 | PASS | PARTIAL (paper authors only) | PASS (35mo) | PARTIAL |
| letta | PASS | PARTIAL (team self-cite) | PASS (31mo) | PARTIAL |
| cognee | PASS | PARTIAL (paper authors only) | PASS (21mo) | PARTIAL |
| agentmemory | FAIL (single-individual) | FAIL | **FAIL (2.5mo)** | FAIL |
| openviking | PASS | UNKNOWN | PASS (4.3mo, borderline-STRONG-PROVENANCE) | PROBE-6-BLOCKED-IRRELEVANT |

## R5 Recommended scale-threshold re-audit triggers

Per W164 F38c discipline, fire re-audit when ANY of:
- mcp-memory `Z:/claude-sota-installed-state/.mcp-memory/memory.db` size > 100 MB
- mcp-memory row count > 100,000
- mcp-memory p95 latency > 100ms
- Multi-process write contention (n=2+ same-arc claude sessions concurrent writes)
- Named workflow emerges that incumbents can't serve (temporal-reasoning over agent confirmations à la mem0)

## R5.5 Honest Conclusion

**R0 hypothesis REFUTED at current scale**. 4/5 = DEFER-INCUMBENT-KEEP; 1/5 = REJECT-FOR-FIT (AGPL). No GENUINELY-NEW + scale-threshold-crossing candidate found.

**Evidence-tier**: `[VERIFIED]` for all 5 LICENSE/blob-SHA cites + HEAD commits 2026-05-13/2026-05-12/2026-04-08/2026-02-25 + W164 F38c precedent re-invoked.

**Convergence-gate cumulative**: 0/5 firm-PASS, 3/5 PARTIAL (mem0/letta/cognee), 1/5 FAIL (agentmemory FAST-CHURN), 1/5 PROBE-6-BLOCKED (openviking AGPL).

**Cross-model gate**: Sonnet stand-in per FM-17.g defense; codex T1 cross-verify queued for post-fire if NEEDS-REVISION emerges.

## verdict_one_line

"DONE: VERDICT-ALL-5 = 4 DEFER + 1 REJECT-FOR-FIT (AGPL); R0 hypothesis REFUTED; INCUMBENT mcp-memory + graphiti KEEP at current 22-memory/0.11MB scale"
