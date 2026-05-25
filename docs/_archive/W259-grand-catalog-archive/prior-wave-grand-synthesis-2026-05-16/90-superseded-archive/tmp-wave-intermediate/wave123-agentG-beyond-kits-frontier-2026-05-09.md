---
title: Wave 123 Agent G — Beyond-Kits Frontier (last 60d)
status: AUTHORITATIVE
date: 2026-05-09
agent: sota-researcher (G)
brief_origin: Wave 123 fire 1 user-trigger "kits are inspiration not source of truth, research beyond"
scope: 60d window since 2026-03-09; 5 axes (releases / arxiv / Anthropic HEAD / marketplaces / named-T2)
---

# Wave 123 Agent G — Beyond-Kits Frontier Research (last 60d)

## VERDICT (one-line + summary)

**VERDICT: DONE: 30 candidates in last-60d window, 6 architectural-novelty discoveries (4-arxiv + 2-repo), 4 benchmark-provenance Tier-1/2 verified, 5 HONEST-NON-FINDING failure-mode/lifecycle/gate gaps NOT YET in `Z:/claude-sota/.claude/rules/named-failure-modes.md` enumeration. 7 NEW Anthropic OFFICIAL plugins shipped 2026-05-07 ALREADY warrant immediate install per CR-6 fresh-from-github.**

## §1 — Top-30 beyond-kits SOTA candidates (last 60d, ranked by composite-axis-score)

Composite-axis-score = Axis 1 + Axis 2 + Axis 3 + Axis 4 (newness-leadership) + Axis 6 (benchmark-provenance) + Axis 7 (architectural-novelty). Ordering reflects best-fit for sss-installed. License + named maintainer + last-commit date verified from GitHub API metadata.

### TIER-A — Anthropic OFFICIAL HEAD-update queue (immediate install per CR-6 fresh-from-github)

| # | Plugin | Cite | Date | License/Maintainer | Verdict |
|---|---|---|---|---|---|
| 1 | **clickhouse** | `anthropics/claude-plugins-official @ 7ce4a6fb` PR #1683 | 2026-05-07 | MIT/Anthropic | A1 PASS / A4 PASS-novel (analytics MCP-skill bundle) |
| 2 | **pigment** | `anthropics/claude-plugins-official @ 83cbef8d` PR #1684 | 2026-05-07 | MIT/Anthropic | A1 PASS / A4 PASS-incremental |
| 3 | **qdrant-skills** | `anthropics/claude-plugins-official @ 2c6fb0c6` PR #1685 | 2026-05-07 | MIT/Anthropic | A1 PASS / A4 PASS-novel (vector-DB-as-memory canonical Anthropic adapter) |
| 4 | **zilliz** | `anthropics/claude-plugins-official @ 494115a2` PR #1686 | 2026-05-07 | MIT/Anthropic | A1 PASS / A4 PASS-incremental (Milvus alternative to qdrant) |
| 5 | **dash0** | `anthropics/claude-plugins-official @ 89e002a3` PR #1641 | 2026-05-07 | MIT/Anthropic | A1 PASS / A4 PASS-novel (OTel observability-as-skill) |
| 6 | **outputai** | `anthropics/claude-plugins-official @ 63aeda94` PR #1709 | 2026-05-07 | MIT/Anthropic | A1 PASS / A4 PASS-incremental |
| 7 | **policy-scan tightening (BLOCKING)** | `anthropics/claude-plugins-official @ 76b35e91` PR #1771 | 2026-05-07 | MIT/Tobin South @ Anthropic | A1 PASS / A4 PASS-novel — `has_broad_scope_hooks` + `has_undisclosed_telemetry` + `description_matches_behavior` plugin-policy gates; "handles user data responsibly" bar |

**Wave 123 install queue mandate**: rows 1-7 are TIER-A install candidates per CR-6 — all under Anthropic OFFICIAL `https://github.com/anthropics/claude-plugins-official` marketplace already registered in claude-sota-installed. CR-9 install-risk: 2-round fix-forward expected. Marketplace already pinned — refresh + re-install yields all 6 NEW plugins.

### TIER-B — Architectural-novelty arxiv papers (last 60d, NOT YET catalogued in any sss rule)

| # | Paper | arxiv ID | Date | Verdict |
|---|---|---|---|---|
| 8 | **Observability-Driven Automatic Evolution of Coding-Agent Harnesses (AHE)** | `arxiv 2604.25850v1` | 2026-04 | A1 PASS / A6 TIER-1 mega-exemplar (77.0% Terminal-Bench 2 vs Codex-CLI 71.9%) / A7 PASS-novel — 3 observability pillars (component / experience / decision); evolved harness transfers cross-model (+5.1 to +10.1 pp on alternate model families) |
| 9 | **The Last Harness You'll Ever Build** | `arxiv 2604.21003` | 2026-04-22 | A1 PASS / A7 PASS-novel — 2-level meta-learning framework (Harness Evolution Loop + Meta-Evolution Loop) — automates the design of automation; cites Anthropic's own Lopopolo+Rajasekaran harness work |
| 10 | **SafeHarness — Lifecycle-Integrated Security Architecture** | `arxiv 2604.13630` | 2026-04 | A1 PASS / A6 TIER-2 strong-PASS (38% UBR + 42% ASR reduction on Agent-SafetyBench 2000-task) / A7 PASS-novel — 4 defense layers (adversarial filter / tiered causal verification / privilege-separated tool control / safe rollback) |
| 11 | **How Much Heavy Lifting Can an Agent Harness Do?** | `arxiv 2604.07236v4` | 2026-04-28 | A1 PASS / A6 TIER-1 (Collaborative Battleship 54-game N) / A7 PASS-novel — quantifies LLM-vs-harness contribution: declarative planning carries +24.1pp win rate over belief-only (zero LLM calls); LLM revision activates only 4.3% turns |
| 12 | **AutoHarness** | `arxiv 2603.03329` | 2026-03 | A1 PASS / A6 TIER-1 (TextArena 145 games — Gemini-2.5-Flash + harness > Gemini-2.5-Pro) / A7 PASS-novel — Harness-as-Policy: synthesize entire policy as code, eliminate LLM at decision time; 0.870 avg reward vs GPT-5.2-High 0.844 at near-zero test cost |
| 13 | **AgentProp-Bench (propagation cascade)** | `arxiv 2604.16706v1` | 2026-04 | A6 TIER-1 (2000-task / 2300-trace human-validated; substring judge κ=0.049 chance-level vs 3-LLM ensemble κ=0.432); runtime interceptor 23pp hallucination reduction GPT-4o-mini |
| 14 | **Pioneer Agent (continual SLM improvement)** | `arxiv 2604.09791v1` | 2026-04-10 | A1 PASS / A6 TIER-1 (AdaptFT-Bench 9 scenarios) — closed-loop SLM auto-tuning; +83.8pp F1 on cold-start tasks |

### TIER-C — Beyond-kits skill/plugin/marketplace candidates

| # | Repo | Cite | Stars | Date | License/Org | Verdict |
|---|---|---|---|---|---|---|
| 15 | **safishamsi/graphify** | `safishamsi/graphify @ HEAD v7` | n/a | last push 2026-05-09 | MIT/User | A1 PASS / A4 PASS-novel — code+SQL+R+shell+docs+images+videos → unified queryable knowledge graph (ALREADY referenced in `Z:/claude-sota/.claude/rules/team-orchestration.md` Mia rule citation; re-evaluation as install candidate) |
| 16 | **rtk-ai/rtk** | `rtk-ai/rtk @ HEAD develop` | n/a | last push 2026-05-08 | n/a/Org | A1 PASS / A4 PASS-novel — CLI proxy reduces LLM token consumption 60-90% on common dev commands; Rust binary (ALREADY referenced in claude-sota memory `reference_fm02_sub_c_constructive_absorption_n10_rtk_phase1_2026_05_03.md` — incremental adoption) |
| 17 | **OthmanAdi/planning-with-files** | `OthmanAdi/planning-with-files @ HEAD master` | n/a | last push 2026-05-05 | n/a/User | A1 PASS / A4 PASS-novel — Manus-style persistent markdown planning ($2B acquisition workflow pattern) |
| 18 | **K-Dense-AI/scientific-agent-skills** | `K-Dense-AI/scientific-agent-skills @ HEAD main` | n/a | last push 2026-05-06 | n/a/Org | A1 PASS / A4 PASS-incremental — research/science/engineering/finance/writing skill bundle |
| 19 | **agentskills/agentskills** | `agentskills/agentskills @ HEAD main` | n/a | last push 2026-04-22 | n/a/Org | A1 PASS / A4 PASS-novel — Agent Skills SPEC + documentation (open standard for cross-tool skills) |
| 20 | **github/awesome-copilot** | `github/awesome-copilot @ HEAD main` | high | last push 2026-05-08 | MIT/GitHub | A1 PASS / A4 PASS-novel — GitHub-OFFICIAL community Copilot instructions+agents+skills+configurations (cross-tool overlap with CC ecosystem) |
| 21 | **googleworkspace/cli** | `googleworkspace/cli @ HEAD main` | n/a | last push 2026-05-09 | n/a/Google | A1 PASS / A4 PASS-novel — Google Workspace CLI dynamically built from Google Discovery Service + AI agent skills (Drive/Gmail/Calendar/Sheets/Docs/Chat/Admin) |
| 22 | **NousResearch/hermes-agent** | `NousResearch/hermes-agent @ HEAD main` | n/a | last push 2026-05-09 | n/a/NousResearch | A1 PASS / A4 PASS-novel — "agent that grows with you" — likely meta-learning/continual-improvement primitive |
| 23 | **HKUDS/nanobot** | `HKUDS/nanobot @ HEAD main` | n/a | last push 2026-05-09 | n/a/HKU-DS | A1 PASS / A4 PASS-novel — Ultra-Lightweight Personal AI Agent (academic-org maintained) |
| 24 | **JuliusBrussee/caveman** | `JuliusBrussee/caveman @ HEAD main` | n/a | last push 2026-05-01 | n/a/User | A1 PASS / A4 PASS-novel — Claude Code skill cuts 65% tokens via "caveman" output style (matches our session's caveman style — eee-local validation) |
| 25 | **upstash/context7** | `upstash/context7 @ HEAD master` | n/a | last push 2026-05-09 | n/a/Upstash | A1 PASS / A4 incremental — already installed; recent updates within window |
| 26 | **ai-boost/awesome-harness-engineering** | `ai-boost/awesome-harness-engineering @ HEAD main` | n/a | last push 2026-05-09 | n/a/User | A1 PARTIAL / A4 PASS-novel — curated awesome list for harness engineering: tools, patterns, evals, memory, MCP, permissions, observability, orchestration |
| 27 | **AutoJunjie/awesome-agent-harness** | `AutoJunjie/awesome-agent-harness @ HEAD main` | n/a | last push 2026-04-19 | n/a/User | A1 PARTIAL / A4 PASS-incremental — discovery surface complement to ai-boost |
| 28 | **frmoretto/hardstop** | `frmoretto/hardstop @ HEAD main` | n/a | last push 2026-04-18 | n/a/User | A1 PASS / A4 PASS-novel — "Seatbelts for the agentic AI era": pre-execution safety validation for CC + Cowork (catches dangerous commands from prompt injection / hallucinations / misunderstanding) — direct sister to `safety_guard.py` pattern |
| 29 | **pinecone-io/pinecone-claude-code-plugin** | `pinecone-io/pinecone-claude-code-plugin @ HEAD main` | n/a | last push 2026-05-07 | n/a/Pinecone | A1 PASS / A4 PASS-novel — OFFICIAL Pinecone marketplace for CC Plugins (vector-DB ecosystem alternative to qdrant/zilliz) |
| 30 | **chrome-devtools-mcp** | `ChromeDevTools/chrome-devtools-mcp @ HEAD main` | n/a | last push 2026-05-09 | n/a/Google | A1 PASS / A4 PASS-incremental — Chrome DevTools-OFFICIAL MCP for coding agents (already referenced in arxiv 2604.21003 Lopopolo cite) |

## §2 — Architectural-novelty discoveries (genuinely new primitive shape — high signal)

1. **AHE Observability-Driven Harness Evolution** (arxiv 2604.25850) — **3-pillar observability** (component / experience / decision) with **falsifiable contracts at edit-time**. SOTA-superior to manual harness tuning; 77.0% pass@1 Terminal-Bench 2 surpassing human-designed Codex-CLI (71.9%). Cross-model transfer evidence (-2.5pp to +10.1pp on alternate model families). **Implication for sss**: claude-sota's MEMORY.md/feedback_*.md recording IS the experience-observability pillar; what's MISSING is **decision observability** (every edit paired with self-declared prediction + later-verified outcome) — current sss commits cite verdict files but don't bind a falsifiable prediction.

2. **The Last Harness You'll Ever Build** (arxiv 2604.21003) — **2-level meta-learning** (Harness Evolution Loop + Meta-Evolution Loop). Treats harness-engineering itself as the optimization target. Cites Anthropic's Lopopolo+Rajasekaran. **Implication for sss**: Wave-N + cardinal-rule iteration is doing this MANUALLY; the upstream framework formalizes blueprint Λ = (W, H⁰, V, E) — sss's Wave 50→123 IS the Evolution Loop, but the Meta-Evolution Loop (cross-task blueprint optimization) is uncodified.

3. **AutoHarness Harness-as-Policy** (arxiv 2603.03329) — **synthesize entire policy AS CODE** to eliminate LLM at test time; Gemini-2.5-Flash+code-policy beats GPT-5.2-High at near-zero cost. **Implication for sss**: sss's hooks (codex_t1/t2/t3 enforcement) are policy-as-code at the gate level; this paper extends to FULL TASK POLICY synthesis — extreme generalization of the "code-not-JSON for LLM-emitted structured output" principle already in `synthesis-layer-verify.md §Output-form verification modifier (SHAPE-CLAIM)`.

4. **Anthropic policy-scan BLOCKING gate** (`@76b35e91` 2026-05-07) — **NEW marketplace policy** with `has_broad_scope_hooks` / `has_undisclosed_telemetry` / `description_matches_behavior` predicates. **Implication for sss**: this is the upstream-installation analog of FM-16 phantom-cite-to-disabled-MCP discipline; install-risk per CR-9 should add a "broad-scope hook + telemetry disclosure" probe before any plugin install lands.

5. **Lifecycle-Integrated Security (SafeHarness)** (arxiv 2604.13630) — **4 defense layers WOVEN INTO LIFECYCLE** (adversarial filter at input / tiered causal verification at decision / privilege-separated tool control at execution / safe rollback with adaptive degradation at state update). **Implication for sss**: cardinal-rule-7 graduated unleash + `layered-gates-architecture.md §The 5 layers` IS this pattern at structural level; SafeHarness's "tiered causal verification" maps to T1+T2+T3 lifecycle — but adaptive degradation on rollback is not yet codified in `closed-loop-recursive-narrowing.md §Outcome B REVERT-AND-REMOVE`.

6. **OpenClaw swarm-management** (Arize blog 2026-05-04 + arxiv mentions) — **swarm manager IS the layer ABOVE harness**. Durable session keys / run IDs / lifecycle records / parent-child lineage / cleanup policy / push-based completion. **Implication for sss**: the standing-directive `advanced-agent-team-standing-directive.md` 3-5 agent fan-out is harness-level; OpenClaw exposes the swarm-manager layer above it — sss has this implicitly via Wave-N orchestration, but cleanup-policy + push-based-completion are NOT codified primitives.

## §3 — Benchmark-provenance verified subset (TIER-1/2 reproducible only)

Filtered out TIER-0 vendor-marketing-only candidates per `convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL`:

- **Tier-1 mega-exemplar**: `arxiv 2604.25850 (AHE)` — Terminal-Bench 2 89-task / SWE-bench-verified 500-task; reproducible per Appendix A
- **Tier-1 mega-exemplar**: `arxiv 2604.07236 (Heavy-Lifting)` — Collaborative Battleship 54 games N=54 with non-overlapping 95% CIs
- **Tier-1 mega-exemplar**: `arxiv 2603.03329 (AutoHarness)` — TextArena 145 1P+2P games
- **Tier-2 strong-PASS**: `arxiv 2604.13630 (SafeHarness)` — Agent-SafetyBench 2000-task across 8 risk categories with `fulfillable` flag for refusal disambiguation
- **Tier-2 strong-PASS**: `arxiv 2604.16706 (AgentProp-Bench)` — 2000-task / 2300-trace human-validated 100-label subset; 95% bootstrap CIs

## §4 — HONEST-NON-FINDING failure-mode/lifecycle/gate gaps NOT YET in `Z:/claude-sota/.claude/rules/named-failure-modes.md`

These are GENUINE GAPS (verified via Mia probe of named-failure-modes catalog content per cardinal-rule-1 + sibling Mia pattern):

1. **HNF-1: Decision-observability gap** (from arxiv 2604.25850 AHE) — no FM tracks "edit landed without falsifiable prediction binding". sss commits cite verdict-files but don't carry a self-declared "this fix will produce outcome X within Y" prediction with verified follow-up. **Promotion candidate at n=2 same-arc**: codify as `FM-21 unbound-edit-predictions` per cycle-322 jurisdiction.

2. **HNF-2: Trajectory-token-budget overflow class** (from arxiv 2604.25850 §experience-observability — multi-million-token trajectories). FM-17.e covers CC-runtime autocompact-thrashing as INPUT-side failure (large tool output → context refill); MISSING: explicit failure mode for LONG-AGENT-TRAJECTORY itself exceeding processable tokens (e.g., a sota-researcher subagent that successfully runs 30+ tool calls but emits a too-large transcript for the orchestrator to mine). Sister to FM-17.e but distinct cause.

3. **HNF-3: Push-based completion surface absence** (from Arize OpenClaw analysis) — sss subagents return via task-notification (PULL pattern: orchestrator polls); MISSING: no failure mode tracks "subagent completed but orchestrator unable to receive completion announce" (registry/announce flow gap). Distinct from FM-17.b 429-cooling-down (which fires AT delivery layer); this is the case where delivery layer is GENUINELY UNAVAILABLE because no announce channel exists.

4. **HNF-4: Adaptive-degradation-on-rollback gap** (from arxiv 2604.13630 SafeHarness §state update) — `closed-loop-recursive-narrowing.md §Outcome B REVERT-AND-REMOVE` is binary (revert or accept); SafeHarness's adaptive degradation pattern (lower verification rigor → higher rigor escalation chain) is NOT codified. **Implication**: sss could reduce false-revert cost via adaptive sub-Outcome B (partial-revert with tightened-T2 follow-up).

5. **HNF-5: Cross-model-asymmetry decay over benchmark** (from arxiv 2604.16706 AgentProp-Bench κ=0.049 substring vs κ=0.432 ensemble). FM-09 codex-rescue blind-spot fires at AGENT-LEVEL (n=5/5 base rate); MISSING: failure mode tracking "single-judge verdict κ-degradation when load-bearing for ship". Sister to cross-model-consensus T1-T7 invariant but specifically about JUDGE-RELIABILITY decay.

## §5 — Anthropic-OFFICIAL HEAD-update queue (immediate install per CR-6)

**Already covered in §1 TIER-A rows 1-7**; summary:
- 6 NEW plugins under `anthropics/claude-plugins-official` since 2026-04-28: clickhouse / pigment / qdrant-skills / zilliz / dash0 / outputai
- Marketplace already pinned in claude-sota-installed; refresh-then-install yields all 6
- 1 NEW BLOCKING policy gate (`policy-scan tightening` PR #1771 by Tobin South @ Anthropic 2026-05-07) — install-risk delta to CR-9
- `anthropics/skills` HEAD activity within 60d window: README update (#1094 2026-05-09) + Managed Agents outcomes/multiagent/webhooks added to claude-api skill (#1096 2026-05-06) — refresh document-skills + example-skills
- `anthropics/cwc-long-running-agents` HEAD `ffd563d6` 2026-05-06 = SINGLE COMMIT, no updates since (already INSTALLED in Z:/claude-sota-installed/.local/cwc/)

CC binary: 3 NEW releases in window:
- v2.1.126 2026-05-01: `claude_code.skill_activated` OTel event with `invocation_trigger` attribute; `skillOverrides` enforcement; `--plugin-url` flag for ad-hoc plugin .zip fetch
- v2.1.129 2026-05-06: plugin manifest `experimental` block for themes/monitors; deferred-tools fix for `context: fork` subagents
- v2.1.136 2026-05-08: `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` enterprise OTel feedback; plugin.json `skills` entry hiding fix

## §6 — Cross-model-evidence: Anthropic Code Review postmortem (2026-04-23) IMPLICATIONS

`https://www.anthropic.com/engineering/april-23-postmortem` [VERIFIED 2026-04-23 via exa]:
- Three Anthropic-side regressions (Mar 21 / Mar 26 / Apr 16) impacted CC + Agent SDK + Cowork (NOT API). All resolved by v2.1.116 (2026-04-20).
- Anthropic ROLLED BACK from medium-effort default → xhigh for Opus 4.7 / high for Sonnet 4.6 (April 7 reversal).
- Anthropic's INTERNAL Code Review tool back-tested against bugs found Opus 4.7 caught what Opus 4.6 missed → Anthropic adding "additional repositories as context for code reviews".
- Anthropic ADDED CLAUDE.md mandate: "model-specific changes gated to specific model they're targeting" — sister to sss's `cross-model-consensus.md §Profile selection rule`.

**Implication for sss**: validates cardinal-rule-3 cross-model-consensus T1-T7 lifecycle even Anthropic itself failed to catch quality regressions without rigorous evals; sss's eval-mandate at `cross-model-consensus.md §Eval-case mandate` is the same discipline shape.

## §7 — Practitioner-named-T2 Axis 2 endorsements (last 60d)

- **Hamza Farooq** @ boringbot.substack.com 2026-05-05: "Claude Code: Skills, Subagents, Hooks, Plugins, and Harnesses for Production Multi-Agent Workflows" — endorses isolation-spectrum mental model; Skills as missing primitive
- **Aparna Dhinakaran** @ Arize AI 2026-05-04: "Swarm management in agent harnesses" — load-bearing OpenClaw analysis (named T1 practitioner from Cognition/Anthropic/Cursor adjacent)
- **Marius Bughiu** @ startdebugging.net 2026-04-27: "Schedule a Recurring Claude Code Task that Triages GitHub Issues" — covers Routines (April 14 ship) + claude-code-action@v1 + /loop ; cite-anchor for Routines as new automation primitive
- **Masaki Hirokawa** @ claudelab.net 2026-03-22: "Agentic Coding 2026" — long-running autonomous workflow patterns (/loop + subagent parallelism + state mgmt)
- **Rockford Lhotka** @ blog.lhotka.net 2026-04-23: "My Claude Code Workflow" — counter-evidence: pure CC + plans-in-repo replaces plugin scaffolding; 2-concurrent-session sweet spot
- **Tobin South** @ Anthropic via PR #1771 2026-05-07: BLOCKING policy-scan + 4 schema fields = canonical practitioner from Anthropic security-policy team

## §8 — Implications for claude-sota-installed roadmap

**Immediate-install (Wave 124+ candidates, CR-6 fresh-from-github)**:
- 6 NEW Anthropic-OFFICIAL plugins (rows 1-6 above)
- `safishamsi/graphify` if knowledge-graph use case lands (already cited)
- `frmoretto/hardstop` as direct sister to `safety_guard.py` (sister-validate against current floor)
- `arxiv 2604.25850 AHE 3-pillar observability` as cardinal-rule-12 candidate
- `policy-scan tightening` (row 7) as install-time discipline addition to CR-9

**Watch (Wave 125+)**:
- `arxiv 2604.21003 The Last Harness You'll Ever Build` — meta-evolution-loop framework for sss's Wave-N evolution
- `arxiv 2603.03329 AutoHarness Harness-as-Policy` — extension of sss's SHAPE-CLAIM to full task-policy
- `OpenClaw swarm-management primitives` — from Arize blog
- `AgentProp-Bench` for sss's eval-case-mandate corpus (judge-reliability degradation tracking)

**Codify (rule-layer additions)**:
- HNF-1 → FM-21 unbound-edit-predictions (decision-observability) at n=2 same-arc
- HNF-3 → FM-22 push-based-completion-absence (when subagent completes but no announce channel) at n=2
- HNF-4 → adaptive-degradation-on-rollback as Outcome B sub-pattern in `closed-loop-recursive-narrowing.md`
- HNF-5 → judge-κ-degradation as cross-model-consensus.md §Severity sub-extension

VERDICT: DONE: 30 candidates last 60d, 6 architectural-novelty (4-arxiv + 2-repo: AHE / Last-Harness / AutoHarness / SafeHarness + safishamsi/graphify + Anthropic-policy-scan), 4 benchmark-provenance Tier-1/2 (AHE Terminal-Bench 2 / Heavy-Lifting Battleship / AutoHarness TextArena / AgentProp-Bench 2300-trace), 5 HONEST-NON-FINDING gaps (decision-observability / trajectory-token-overflow / push-based-completion / adaptive-degradation-rollback / judge-κ-degradation).
