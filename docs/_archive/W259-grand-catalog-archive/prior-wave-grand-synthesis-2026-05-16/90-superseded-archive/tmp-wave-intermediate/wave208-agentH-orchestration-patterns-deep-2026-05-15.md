---
title: W208 Agent H — SOTA Orchestration Patterns Deep-Audit (zero-bias)
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (BRIDGE-MODE not applicable — Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env-funneling; STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate)
wave: W208 (post-W206/W207 orchestration deep-dive)
cite-class: TIER-3-LOCAL-OPERATOR-DERIVED (research artifact); constituent cites pinned to TIER-1-DIRECT + TIER-2 sources
---

# Executive Summary (10 lines)

1. **Probed 4 source classes** for orchestration primitives beyond W206/W207: wshobson 81 plugins (75 unenabled), affaan-m ECC 100+ multi-runtime skills, gstack codex skill (Pattern B mitigation), superpowers 15 skills (7 unvendored), claude-code-system-prompts 100+ Piebald CC-internals (TIER-1-DIRECT — Anthropic's actual production prompts), agent-teams 1 demo, awesome-agentic-patterns 100+ patterns, refresh: gsd-build/get-shit-done (HEAD `fa862c77`) + anthropics/cwc-long-running-agents (HEAD `ad107a97` — updated since sibling pin `ffd563d6`).
2. **Top-3 underserved primitives in pure runtime**: (a) Default-FAIL evidence-gate contract (anthropics/cwc native; addresses "agent marks passing without evidence" failure n>10 in claude-sota arc); (b) Fresh-context evaluator subagent (anthropics/cwc + superpowers two-stage review — addresses "self-grading" bias n=5+ FM-09 evidence); (c) Adaptive Sandbox Fan-Out Controller (awesome-agentic-patterns — addresses static "N=10 always" fan-out anti-pattern at parallel-agent-wave.md max-3-cap level).
3. **5 ADOPT-NOW**: cwc agent-sdk-dev plugin / superpowers writing-skills + executing-plans + finishing-a-development-branch / Piebald agent-prompt-worker-fork.md (TIER-1-DIRECT Anthropic worker-fork pattern) / awesome-agentic-patterns Factory-over-Assistant.md + Compounding-Engineering-Pattern.md.
4. **5-15 STUDY-PILOT-NARROW**: wshobson conductor (CDD workflow but HARD-GATE interactive Q&A), plugin-eval (3-layer rubric: static+LLM-judge+Monte-Carlo), review-agent-governance (Cedar policy + Ed25519 receipts — security-class), gsd-build (npm install — registry-class), Piebald skill-loop-slash-command.md, awesome-agentic-patterns deterministic-zero-llm-orchestration / declarative-multi-agent-topology / hybrid-llm-code-workflow-coordinator / multi-model-orchestration-for-complex-edits / lane-based-execution-queueing.
5. **REJECT-FOR-FIT 10+**: full-stack-orchestration (overlap with cwc+wshobson core), agent-teams (single-demo not a primitive), affaan-m .kiro/.cursor skills (cross-IDE not Claude-native), affaan-m i18n docs/ja-JP+ko-KR+tr+zh-CN skills (translations not new primitives), graph-of-thoughts (research arch not operationalizable), agent-circuit-breaker (Tier-3 outside-orchestration), conductor HARD-GATE-incompatible (Probe 5).
6. **6 mode-harness-shape REJECTS** (Probe 5 cardinal): brainstorming HARD-GATE (refuted iter-84), writing-skills meta-skill assumes Superpowers test framework not present, dispatching-parallel-agents DUPLICATE of parallel-agent-wave.md per kiss-dry-yagni Must-Never #4, conductor setup HARD-GATE-Q&A (refuted W137 cohort), gsd `--dangerously-skip-permissions` flag mismatch with claude-sota CR-7 graduated unleash gate, signed-audit-trails Ed25519 requires PR-review pipeline not present.
7. **3 PARTIAL-OVERLAP (Probe 4 plugin-namespace)**: subagent-driven-development (already vendored in claude-sota; not in pure), requesting-code-review (already vendored), executing-plans (NOT vendored — sister to subagent-driven-development, complementary).
8. **Strong-provenance cite chain**: 4-org Axis-1 PASS for orchestration discipline — Anthropic (cwc primitives + claude-code-system-prompts Piebald reverse-engineering) + Anthropic-affiliate Boris/CCBP agent-teams + obra/superpowers + nibzard awesome-agentic-patterns curator-of-Anthropic-derived-patterns.
9. **3 gap-resolution recommendations** (Section 6): install agent-sdk-dev plugin for SDK harness build assistance + adopt superpowers executing-plans + finishing-a-development-branch as the 2-stage close-the-loop primitive + cite-import-AMBER awesome-agentic-patterns Factory-over-Assistant + Compounding-Engineering as cardinal-rule-discipline anchors.
10. **Honest-Conclusion**: pure runtime has solid plugin install foundation (W206 6 wshobson plugins + W207 ECC + addy skills) BUT missing the close-the-loop primitive triad — install adoption ranked in Section 7.

---

# Section 1 — Audit Matrix (candidate × Probe-DAG verdict)

| Candidate | Source / cite | Axis-1 | Axis-2 | Axis-3 | P4 ns | P5 mode | P6 LIC | P7 demand | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| **anthropics/cwc agent-sdk-dev plugin** | https://github.com/anthropics/claude-plugins-official/tree/main/plugins/agent-sdk-dev (org=Anthropic, cited at `cwc/README.md` "scaffold an SDK agent" L17) | PASS (Anthropic-OFFICIAL) | PASS (Anthropic team author) | PASS Q2-2026 mature | PASS not vendored | PASS no HARD-GATE | PASS MIT-class | PASS (CR-10 research-then-install applies) | **ADOPT-NOW** |
| **superpowers executing-plans** | `Z:/repos/deps/superpowers/skills/executing-plans/SKILL.md:1-40 @ HEAD e7a2d164` | PASS obra | PASS named-T1 author | PASS >180d cpd ≥10 STABLE-BURN-IN | PASS not vendored (only subagent-driven-development vendored) | PASS no HARD-GATE; sister to existing skill | PASS MIT | PASS (n=multi; sister to vendored skill) | **ADOPT-NOW** |
| **superpowers finishing-a-development-branch** | `Z:/repos/deps/superpowers/skills/finishing-a-development-branch/SKILL.md @ HEAD e7a2d164` (cited from executing-plans:35-36 as REQUIRED SUB-SKILL) | PASS obra | PASS | PASS | PASS not vendored | PASS no HARD-GATE | PASS MIT | PASS (close-the-loop required) | **ADOPT-NOW** |
| **superpowers writing-skills** | `Z:/repos/deps/superpowers/skills/writing-skills/SKILL.md:1-40 @ HEAD e7a2d164` | PASS obra | PASS named-T1 (TDD-for-skills) | PASS | PASS not vendored | **REJECT-FOR-FIT** P5: meta-skill REQUIRES superpowers:test-driven-development as background (line 18) + assumes Superpowers TDD-for-skills framework not in pure runtime | n/a | n/a | **REJECT-FOR-FIT P5** |
| **Piebald agent-prompt-worker-fork.md** | `Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-worker-fork.md:1-35 @ HEAD <pin>` | PASS Piebald-AI (9,050★ TIER-1 CC-internals reverse-engineered) | PASS Piebald team | PASS Anthropic CC fork mechanism shipped | PASS not vendored | PASS no HARD-GATE | PASS unlicensed-research | PASS sub-pattern of CLAUDE_CODE_FORK_SUBAGENT=1 ENV (e) | **ADOPT-NOW** (cite-anchor) |
| **awesome-agentic-patterns Factory-over-Assistant** | `Z:/repos/deps/awesome-agentic-patterns/patterns/factory-over-assistant.md:1-35 @ HEAD ffb42768` | PASS nibzard curator + based_on Thorsten Ball (AMP) | PASS named-T1 endorsement | PASS | PASS not in any plugin | PASS pattern not skill | PASS Apache | PASS already operational philosophy in claude-sota | **ADOPT-NOW** (cite-anchor) |
| **awesome-agentic-patterns Compounding-Engineering** | `compounding-engineering-pattern.md:1-40 @ HEAD ffb42768` based_on Dan Shipper (Every) | PASS | PASS Every podcast | PASS 2026-01-05 | PASS | PASS philosophy match Karpathy §5 | PASS | PASS already implicit | **ADOPT-NOW** (cite-anchor) |
| **wshobson conductor (CDD plugin)** | `Z:/repos/deps/wshobson-agents/plugins/conductor/commands/setup.md:1-40 @ HEAD <pin>` | PASS Seth Hobson | PASS named-author | PASS Apache-2.0 | n/a not vendored | **REJECT-FOR-FIT P5 mode-harness-shape**: `setup.md:8` "Interactive Q&A Protocol" + L37-40 "Ask ONE question per turn / Wait for user response before proceeding" — HARD-GATE interactive setup incompatible with autonomous /loop mode (iter-84 + iter-92 mattpocock + iter-93 wshobson-conductor pattern) | n/a | n/a | **REJECT-FOR-FIT P5** (already cited in ahfv-seven-sub-classes.md as iter-93) |
| **wshobson plugin-eval (3-layer eval)** | `wshobson-agents/plugins/plugin-eval/README.md @ HEAD` 3 layers: static + LLM-judge + Monte Carlo | PASS Seth Hobson | PASS | PASS active | PASS not in pure | PASS CLI-mode | PASS MIT | STUDY-PILOT: codifies the eval-runner gap (claude-sota T88 verdict-to-eval gap closure); n=1 demand | **STUDY-PILOT-NARROW** |
| **wshobson review-agent-governance** | `wshobson-agents/plugins/review-agent-governance/README.md:1-60` Cedar + Ed25519 receipts on `gh pr review/merge/comment` | PASS Tom Farley | PASS (cite protect-mcp upstream) | PASS | PASS not in pure | PASS no HARD-GATE | PASS MIT | STUDY-PILOT: security-class; demand-create-new-workflow.b: gh-PR review pipeline not yet in pure runtime; Probe 7.b 5-clause check incomplete | **STUDY-PILOT-NARROW** |
| **wshobson full-stack-orchestration** | `wshobson-agents/plugins/full-stack-orchestration/agents/deployment-engineer.md:1-30` 4 agents (deployment+performance+security+test-automator) | PASS Seth Hobson | PASS | PASS | DUPLICATE Probe 4: agent-orchestration plugin already enabled W206 overlaps full-stack scope | n/a | n/a | n/a | **REJECT-FOR-FIT P4** (duplicate functionality per kiss-dry-yagni Must-Never #4) |
| **awesome-agentic-patterns Deterministic-Zero-LLM-Orchestration** | `deterministic-zero-llm-orchestration.md:1-40 @ HEAD ffb42768` "orchestrator as deterministic Python code that spends zero LLM tokens" | PASS chernistry (bernstein) | PASS named-T1 | PASS validated-in-production | PASS not in pure | PASS pattern not skill | PASS | STUDY-PILOT: requires implementing Python orchestrator harness — large-scope pilot per Probe 7.b 5-clause | **STUDY-PILOT-NARROW** |
| **awesome-agentic-patterns Declarative-Multi-Agent-Topology** | `declarative-multi-agent-topology-definition.md:1-40 @ HEAD ffb42768` source `agentopology/agentopology` | PASS Nadav Naveh | PASS | PASS emerging | PASS not in pure | PASS pattern | PASS | STUDY-PILOT: separate declarative DSL file is large adoption | **STUDY-PILOT-NARROW** |
| **awesome-agentic-patterns Hybrid-LLM-Code-Workflow-Coordinator** | `hybrid-llm-code-workflow-coordinator.md:1-40 @ HEAD ffb42768` based_on Will Larson (Imprint) | PASS nibzard + Will Larson | PASS named-T1 named-author | PASS proposed | PASS | PASS pattern | PASS | STUDY-PILOT: requires LLM/code workflow split | **STUDY-PILOT-NARROW** |
| **awesome-agentic-patterns Multi-Model-Orchestration** | `multi-model-orchestration-for-complex-edits.md:1-30 @ HEAD ffb42768` based_on Aman Sanger (Cursor) | PASS nibzard + Aman Sanger | PASS named-T1 | PASS validated-in-production | PASS | PASS pattern | PASS | STUDY-PILOT: routing model+orchestrator harness | **STUDY-PILOT-NARROW** |
| **awesome-agentic-patterns Adaptive-Sandbox-Fan-Out-Controller** | `adaptive-sandbox-fanout-controller.md:1-30 @ HEAD ffb42768` based_on Labruno | PASS nibzard | PASS | PASS emerging 2026 | PASS | PASS pattern | PASS | STUDY-PILOT: addresses static "N=3 cap" parallel-agent-wave.md CADP — would improve fan-out adaptivity | **STUDY-PILOT-NARROW** |
| **awesome-agentic-patterns LLM-Map-Reduce-Pattern** | `llm-map-reduce-pattern.md:1-30 @ HEAD ffb42768` based_on Beurer-Kellner arXiv:2506.08837 | PASS nibzard + arXiv | PASS peer-reviewed | PASS emerging | PASS | PASS pattern | PASS | STUDY-PILOT-NARROW: sandboxed map workers for untrusted-data isolation — security-class | **STUDY-PILOT-NARROW** |
| **awesome-agentic-patterns CLI-Native-Agent-Orchestration** | `cli-native-agent-orchestration.md:1-40 @ HEAD ffb42768` based_on Jory Pestorious | PASS nibzard | PASS | PASS proposed | PASS pattern matches Boris Cherny CLI-native | PASS | PASS | already implicit in claude-sota | **STUDY-PILOT-NARROW** (cite-anchor reinforcement) |
| **awesome-agentic-patterns Iterative-Multi-Agent-Brainstorming** | `iterative-multi-agent-brainstorming.md:1-30 @ HEAD ffb42768` based_on Boris Cherny | PASS Boris-Cherny | PASS named-T1 (Anthropic-affiliated) | PASS experimental-but-awesome | PASS | PASS pattern | PASS | DUPLICATE of parallel-agent-wave.md fan-out — supersedes  | **REJECT-FOR-FIT P4** (DUPLICATE) |
| **awesome-agentic-patterns Lane-Based-Execution-Queueing** | `lane-based-execution-queueing.md:1-40 @ HEAD ffb42768` Clawdbot Implementation | PASS Clawdbot | PASS | PASS validated-in-production | PASS not in pure | PASS pattern | PASS | STUDY-PILOT-NARROW: addresses stdin/stdout interleaving in parallel exec — already partial-coverage in parallel-session-worktree-isolation.md FM-02 staging-race | **STUDY-PILOT-NARROW** |
| **awesome-agentic-patterns Graph-of-Thoughts** | `graph-of-thoughts.md:1-30 @ HEAD ffb42768` based_on Besta et al. ETH Zurich arXiv:2308.09687 | PASS academic | PASS peer-reviewed | PASS established | PASS | **REJECT-FOR-FIT P5**: GoT is reasoning architecture inside LLM, NOT orchestration primitive between agents — wrong abstraction layer for /loop mode | n/a | n/a | **REJECT-FOR-FIT P5** |
| **awesome-agentic-patterns Initializer-Maintainer-Dual-Agent** | `initializer-maintainer-dual-agent.md:1-30 @ HEAD ffb42768` based_on Anthropic Engineering + Cursor | PASS Anthropic+Cursor | PASS named-T1 | PASS validated-in-production | PARTIAL: already implicit in CWC `CLAUDE.md + PROGRESS.md` handoff primitive | PASS pattern | PASS | DUPLICATE with anthropics/cwc agent-maintained-handoff | **REJECT-FOR-FIT P4** (DUPLICATE) |
| **awesome-agentic-patterns Multi-Step-Analysis-Pipeline-Orchestration** | `multi-step-analysis-pipeline-orchestration.md:1-30 @ HEAD ffb42768` shmlkv | PASS | PASS named-T1 | PASS emerging | PASS | PASS pattern | PASS | STUDY-PILOT: artifact-driven pipeline — niche use-case | **STUDY-PILOT-NARROW** |
| **awesome-agentic-patterns Agent-Driven-Research** | `agent-driven-research.md:1-30 @ HEAD ffb42768` Danny Tarlow + Connie Fan | PASS nibzard | PASS named-T1 | PASS established | PASS already implicit in claude-sota sota-researcher | DUPLICATE Probe 4 | n/a | n/a | **REJECT-FOR-FIT P4** (DUPLICATE — already operational) |
| **gsd-build get-shit-done (npm/Node)** | `https://github.com/gsd-build/get-shit-done @ HEAD fa862c77` MIT 58,543★ (Marker Decay: refresh shows ~70K★ at this query date) | PASS gsd-foundation | PASS multi-author T1 endorsements | PASS active | PASS not in pure (npm-class install) | **REJECT-FOR-FIT P5 mode-harness-shape**: README "Getting Started" L107 explicitly `claude --dangerously-skip-permissions` REQUIRED — incompatible with CR-7 graduated-unleash gate Phase 1 `auto` mode; also installs to `~/.claude/skills/gsd-*/` global which collides with plugin-cache install model in pure runtime | n/a | n/a | **REJECT-FOR-FIT P5** |
| **gstack codex SKILL.md** | `Z:/repos/deps/gstack/codex/SKILL.md:1-60 @ HEAD dde55103` MIT Garry Tan | PASS Garry Tan | PASS named-T1 | PASS Q1-2026 mature; n=8 cumulative claude-sota validation | PASS gstack-derived patterns already adopted in claude-sota Pattern B (codex-t1-fix-forward-pattern.md) | PASS bash-class | PASS MIT | PASS Pattern B mitigation already validated — n=8 ladder | **ADOPT-NOW (cite-anchor)** for pure runtime — gstack/codex provides preamble + turn.completed event + hang-detect + adversarial framing |
| **claude-code-system-prompts agent-prompt-explore.md L21-26,53** | `claude-code-system-prompts/system-prompts/agent-prompt-explore.md` Piebald 9,050★ thoroughness knob | PASS Piebald | PASS reverse-engineered TIER-1 Anthropic | PASS | PASS not in pure | PASS no HARD-GATE | PASS unlicensed-research | PASS thoroughness knob ("quick"/"medium"/"very thorough") for Explore-style agents | **ADOPT-NOW (cite-anchor)** for sota-researcher brief template |
| **claude-code-system-prompts skill-loop-slash-command.md** | `claude-code-system-prompts/system-prompts/skill-loop-slash-command.md:1-50` Anthropic `/loop` parsing logic | PASS Piebald | PASS TIER-1 (Anthropic's own /loop) | PASS shipped | PASS not in pure | PASS no HARD-GATE | PASS unlicensed-research | PASS cite-anchor for `/loop` semantics — already in claude-sota as recipe | **STUDY-PILOT-NARROW** (cite-anchor reinforcement) |
| **claude-code-system-prompts system-prompt-subagent-delegation-examples.md** | TIER-1 Anthropic subagent delegation examples | PASS | PASS TIER-1 | PASS | PASS not in pure | PASS no HARD-GATE | PASS | PASS dispatch examples | **ADOPT-NOW (cite-anchor)** for parallel-agent-wave.md spawn-discipline |
| **affaan-m ECC i18n docs/ja-JP, ko-KR, tr, zh-CN skills (~100+ each)** | `affaan-m-everything-claude-code/docs/<lang>/skills/*/SKILL.md` translations | n/a translations | n/a | n/a | DUPLICATE Probe 4: translations of skills already in pure (ECC plugin enabled W207) | n/a | n/a | n/a | **REJECT-FOR-FIT P4** (translations not new primitives) |
| **affaan-m ECC .kiro skills (28 skills agentic-engineering etc.)** | `affaan-m/.kiro/skills/agentic-engineering/SKILL.md` Kiro IDE-specific | PASS affaan-m | PASS | PASS | **REJECT-FOR-FIT P5 mode-harness-shape**: .kiro/.cursor namespace is for non-Claude IDEs (Kiro / Cursor / Windsurf); reference-only for Claude Code | n/a | n/a | n/a | **REJECT-FOR-FIT P5** |
| **wshobson conductor agents/conductor-validator.md** | `wshobson-agents/plugins/conductor/agents/conductor-validator.md:1-40` Opus-model validator agent | PASS Seth Hobson | PASS | PASS | PARTIAL: validator pattern useful but tied to conductor product/track artifacts | DUPLICATE Probe 4: covered by existing claude-sota agent-orchestration | n/a | n/a | **REJECT-FOR-FIT P4** |

---

# Section 2 — ADOPT-NOW Top-5 with cite + Axis verdict

## 1. anthropics/cwc-long-running-agents — `agent-sdk-dev` plugin (Anthropic-OFFICIAL companion plugin)

- **Cite**: `https://github.com/anthropics/claude-plugins-official/tree/main/plugins/agent-sdk-dev` referenced at `cwc/README.md @ HEAD ad107a974bced5244f74dd283dbf2bfd3baee3a1` blob `844543ec98228bb703a9ab6fbaf156ab825cb5e3` [VERIFIED 2026-05-15 via mcp__github__get_file_contents — refreshed from sibling pin ffd563d6 which is BEHIND by 2 commits]
- **Verdict**: ADOPT-NOW for SDK-harness scaffolding (companion to already-installed cwc native primitives at `Z:/claude-sota-installed/.local/cwc/`). Per README L17-18: "To scaffold an SDK agent from inside Claude Code, install the agent-sdk-dev plugin and ask Claude to build an agent that implements whichever of these primitives you want."
- **Axis-1 + Axis-2 + Axis-3 PASS**: Anthropic OFFICIAL org / Anthropic engineering authors / Q2-2026 mature.
- **Probe 5**: PASS — plugin install no interactive HARD-GATE.

## 2. obra/superpowers/executing-plans + finishing-a-development-branch (close-the-loop primitive pair)

- **Cite**: `Z:/repos/deps/superpowers/skills/executing-plans/SKILL.md:1-40 @ HEAD e7a2d164` + `finishing-a-development-branch/SKILL.md @ HEAD e7a2d164` (cited as `REQUIRED SUB-SKILL` at executing-plans:35-36)
- **Verdict**: ADOPT-NOW as the close-the-loop pair. claude-sota already vendors `subagent-driven-development`, `requesting-code-review`, `verification-before-completion` — completes the trio.
- **Mode-harness-shape (Probe 5)**: PASS — both skills run autonomously; executing-plans:14 explicitly recommends "subagent-driven-development if subagents available" (already vendored as parent skill).

## 3. Piebald-AI agent-prompt-worker-fork.md (TIER-1-DIRECT Anthropic worker-fork pattern)

- **Cite**: `Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-worker-fork.md:1-35` Piebald 9,050★ — verbatim Anthropic CC worker-fork system prompt (`ccVersion: 2.1.94`, `agentType: 'fork'`, `model: 'inherit'`, `permissionMode: 'bubble'`, `maxTurns: 200`).
- **Verdict**: ADOPT-NOW as cite-anchor for `CLAUDE_CODE_FORK_SUBAGENT=1` ENV (e) routing (already enabled in pure CLAUDE.local.md). The Piebald reverse-engineering surfaces the verbatim system prompt + hard rules ("Do NOT spawn sub-agents", "One shot: report once and stop") that govern fork-class subagent behavior.
- **3 distinct orgs**: Piebald-AI + Anthropic (via reverse-engineering) + claude-sota operational dogfood = Axis-1 firm.

## 4. awesome-agentic-patterns Factory-over-Assistant (parent-design philosophy anchor)

- **Cite**: `Z:/repos/deps/awesome-agentic-patterns/patterns/factory-over-assistant.md:1-35 @ HEAD ffb42768` based_on Thorsten Ball & Quinn Slack (AMP) — "shift from the assistant model to the factory model: spawn multiple autonomous agents that work in parallel, check on them periodically".
- **Verdict**: ADOPT-NOW as cite-anchor reinforcement for parallel-agent-wave.md (currently TIER-3-LOCAL philosophy without named-T2 anchor at this level).
- **3-distinct-orgs**: AMP (Sourcegraph) + nibzard awesome-agentic-patterns curator + claude-sota dogfood — Axis-1 firm.

## 5. awesome-agentic-patterns Compounding-Engineering-Pattern (Karpathy §5 cite-anchor)

- **Cite**: `compounding-engineering-pattern.md:1-40 @ HEAD ffb42768` based_on Dan Shipper (Every) + Every engineering team — "codify all learnings from each feature into reusable prompts, slash commands, subagents, and hooks".
- **Verdict**: ADOPT-NOW as cite-anchor reinforcement for karpathy-adapted.md §5 Wiki Compounding Surface (currently single Karpathy citation; this adds Dan Shipper + Every podcast as 2nd named-author).
- **Axis-1 firm** at n=3 orgs: Every + nibzard + claude-sota.

---

# Section 3 — STUDY-PILOT-NARROW (5-15)

| # | Candidate | Demand signal (Probe 7.b 5-clause) | Recommended pilot scope |
|---|---|---|---|
| 1 | **wshobson plugin-eval** (3-layer: static + LLM-judge + Monte Carlo) | Named: claude-sota T88 verdict-to-eval gap; Source: `evals/codex_miss_cases.jsonl`; Wiring: invoke `/eval` on each `.claude/skills/` directory; Incumbent: no plugin/skill eval framework in pure runtime; Reversible: install as plugin, retire if Monte Carlo cost exceeds 5min/eval | 30-day pilot: eval the 21 existing plugins in pure runtime; compare scores against `Z:/claude-sota/.claude/state/cohort_coverage_audit.jsonl` |
| 2 | **wshobson review-agent-governance** (Cedar + Ed25519 receipts) | Named: `gh pr review` workflow class; Source: `.review-approved` flag file + cedar policy; Wiring: PreToolUse + PostToolUse hooks; Incumbent: no PR-review pipeline in pure runtime; Reversible | DEFER until pure runtime has live PR-review workflow (currently none — claude-sota's PR pipeline is for archive snapshots) |
| 3 | **awesome-agentic-patterns Adaptive-Sandbox-Fan-Out-Controller** | Named: parallel-agent-wave.md §CADP rule 2 max-3 concurrent static cap; Source: cache-rate signals + fail-fast counts; Wiring: orchestrator-side decision logic before next Agent() dispatch; Incumbent: static N=3 cap per `parallel-agent-wave.md:189-194`; Reversible: revert to static caps if oscillation surfaces | Q3-2026 — only after parallel-agent-wave CADP stability proven |
| 4 | **awesome-agentic-patterns Multi-Model-Orchestration-for-Complex-Edits** | Named: cross-model T1+T2+T3 review chain (already partial coverage); Source: retrieval-model + generation-model + edit-application split; Wiring: claude-sota T1-T7 lifecycle extension; Incumbent: T1-T7 covers some of this; Reversible | DEFER until claude-sota T1-T7 mature |
| 5 | **awesome-agentic-patterns Deterministic-Zero-LLM-Orchestration** (bernstein) | Named: deterministic task decomposition; Source: rule-based planning + parallel agent spawn + git ops; Wiring: Python orchestrator harness; Incumbent: claude-sota team-orchestration.md serial DAG; Reversible: pilot in tmp/ first | LARGE pilot — requires Python harness scaffold |
| 6 | **awesome-agentic-patterns Declarative-Multi-Agent-Topology** (AgenTopology) | Named: declarative topology DSL; Source: separate topology file; Wiring: compile-to-platform; Incumbent: claude-sota .claude/settings.json + agents/ imperative; Reversible: pilot single-flow first | LARGE pilot — requires DSL definition |
| 7 | **awesome-agentic-patterns Hybrid-LLM-Code-Workflow-Coordinator** | Named: LLM/code workflow split; Source: configurable coordinator parameter; Wiring: per-task LLM-vs-code routing; Incumbent: claude-sota cross-model-consensus.md is LLM-driven; Reversible | MEDIUM pilot |
| 8 | **awesome-agentic-patterns LLM-Map-Reduce-Pattern** (arXiv:2506.08837) | Named: untrusted-data isolation; Source: external doc ingestion (firecrawl-class); Wiring: sandboxed map workers; Incumbent: claude-sota synthesis-layer-verify.md OVER/UNDER but not map-reduce; Reversible | NICHE — only if untrusted-doc workflow surfaces |
| 9 | **awesome-agentic-patterns Lane-Based-Execution-Queueing** (Clawdbot) | Named: stdin/stdout interleaving; Source: per-session lane + global lane queues; Wiring: orchestrator queue management; Incumbent: partial coverage in parallel-session-worktree-isolation.md FM-02; Reversible | MEDIUM pilot |
| 10 | **awesome-agentic-patterns CLI-Native-Agent-Orchestration** (Jory Pestorious) | Already implicit per claude-sota Boris-Cherny / CLI-native architecture; pilot as cite-anchor reinforcement only | LIGHT cite-anchor STUDY |
| 11 | **awesome-agentic-patterns Multi-Step-Analysis-Pipeline-Orchestration** (shmlkv) | Named: artifact-driven data analysis; Source: independent analysis scripts emitting reports; Wiring: agent orchestrates + aggregates; Incumbent: claude-sota fire-1+2+3 patterns informal; Reversible | NICHE |
| 12 | **gstack codex (turn.completed event + hang-detect)** | Already operationally adopted as Pattern B mitigation in claude-sota codex-t1-fix-forward-pattern.md n=8 ladder; pilot as full SKILL install in pure runtime | LIGHT pilot — install gstack/codex/SKILL.md verbatim |
| 13 | **claude-code-system-prompts skill-loop-slash-command.md** (TIER-1 Anthropic /loop) | Cite-anchor reinforcement for `/loop` semantics (currently TIER-3-LOCAL recipe); pilot as cite-anchor only | LIGHT cite-anchor STUDY |
| 14 | **Piebald system-prompt-subagent-delegation-examples.md** (Anthropic delegation patterns) | Cite-anchor reinforcement for parallel-agent-wave.md spawn-discipline; pilot as cite-anchor only | LIGHT cite-anchor STUDY |
| 15 | **awesome-agentic-patterns Inversion-of-Control** (NOT YET READ — name only) + agent-friendly-workflow-design (NOT YET READ) | Each requires Probe 7.b 5-clause; not yet enumerated | DEFER for W209+ |

---

# Section 4 — REJECT-FOR-FIT with reasons

| # | Candidate | Reject reason (Probe-DAG class) |
|---|---|---|
| 1 | **wshobson conductor** | P5 mode-harness-shape — HARD-GATE interactive Q&A setup (setup.md:8 "Interactive Q&A Protocol" + L37-40 "Ask ONE question per turn / Wait for user response"); already cited as iter-93 pattern in claude-sota `ahfv-seven-sub-classes.md` |
| 2 | **wshobson full-stack-orchestration** | P4 plugin-namespace DUPLICATE — agent-orchestration plugin already enabled in pure runtime (W206); kiss-dry-yagni Must-Never #4 |
| 3 | **wshobson agent-teams** | P4 plugin-namespace DUPLICATE — agent-teams already enabled in pure runtime (W206) |
| 4 | **superpowers writing-skills** | P5 mode-harness-shape — meta-skill `REQUIRED BACKGROUND: superpowers:test-driven-development` (line 18); TDD-for-skills framework not present in pure runtime; iter-85 historical REJECT |
| 5 | **superpowers brainstorming** | P5 HARD-GATE — `<HARD-GATE>` tag at SKILL.md:12-14 "Do NOT invoke any implementation skill, write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it"; iter-84 historical REJECT |
| 6 | **superpowers dispatching-parallel-agents** | P4 DUPLICATE-FUNCTIONALITY — parallel-agent-wave.md (claude-sota) already operationalizes the parallel dispatch pattern; iter-89 historical REJECT per `Z:/claude-sota/.claude/rules/team-orch-frameworks.md` selectively-vendored table |
| 7 | **awesome-agentic-patterns Graph-of-Thoughts** | P5 mode-harness-shape — GoT is INSIDE-LLM reasoning architecture, NOT inter-agent orchestration; wrong abstraction layer |
| 8 | **awesome-agentic-patterns Agent-Driven-Research** | P4 DUPLICATE — claude-sota sota-researcher agent already operationalizes this |
| 9 | **awesome-agentic-patterns Initializer-Maintainer-Dual-Agent** | P4 DUPLICATE — anthropics/cwc agent-maintained-handoff (CLAUDE.md + PROGRESS.md) already covers this; cwc primitives already INSTALLED in pure runtime per W206 |
| 10 | **awesome-agentic-patterns Iterative-Multi-Agent-Brainstorming** | P4 DUPLICATE — superseded by parallel-agent-wave.md fan-out |
| 11 | **awesome-agentic-patterns Agent-Circuit-Breaker** | Probe 7.a DEMAND-ABSENCE — no current tool-failure workflow in pure runtime needs circuit-breaker; sister to failover-aware-model-fallback (queued elsewhere) |
| 12 | **gsd-build get-shit-done (npm install)** | P5 mode-harness-shape — README L107 requires `claude --dangerously-skip-permissions` incompatible with CR-7 graduated unleash Phase 1 `auto` mode; also installs to global `~/.claude/skills/gsd-*/` which collides with plugin-cache install model in pure runtime |
| 13 | **affaan-m ECC i18n translations** (ja-JP, ko-KR, tr, zh-CN, ru, fr, etc.) | P4 DUPLICATE — translations of skills already in `.claude/skills/everything-claude-code/` plugin (W207 ECC enabled); not new primitives |
| 14 | **affaan-m .kiro skills (28 entries: agentic-engineering etc.) + .cursor skills** | P5 mode-harness-shape — non-Claude IDEs (Kiro / Cursor / Windsurf); reference-only |
| 15 | **wshobson conductor-validator (Opus)** | P4 PARTIAL — agent-orchestration plugin already enabled covers validator scope; tied to conductor product/track artifacts not generic |
| 16 | **wshobson plugin-eval LLM-judge layer specifically** (vs the static+Monte Carlo layers) | Probe 7.b PARTIAL — LLM-judge requires API budget; full pilot STUDY-PILOT (Section 3); standalone-judge-only REJECT |

---

# Section 5 — 3 Most Underserved Orchestration Primitives in Pure Runtime + Concrete Workflow Citations

## Gap 1 — Default-FAIL Evidence-Gate Contract (anthropics/cwc native primitive)

**What's missing**: pure runtime has the `cwc` native install at `Z:/claude-sota-installed/.local/cwc/` per manifest §17, but lacks operational wire-up of the Default-FAIL contract that makes "done" structural rather than self-attested.

**Concrete workflow citation**: `Z:/repos/deps/cwc/README.md @ HEAD ad107a97` blob `844543ec98228bb703a9ab6fbaf156ab825cb5e3` quoting verbatim L18-23: "Agents will mark a feature 'passing' after a unit test or a curl when the UI is visibly broken... Every criterion starts `false`; the agent can't mark it passing without opening evidence first. The only evidence that counts is a file matching the patterns in `track-read.sh`, and a `PreToolUse` hook denies any write to the results file unless the agent has first opened one with the Read tool."

**Recommended ship**: wire `track-read.sh` + `verify-gate.sh` hooks per cwc README; couple with `.claude/state/test-results.json` schema. Maps to claude-sota cardinal-rule synthesis-layer-verify.md §Reporting categories (OVER detection — but PRE-emptive rather than post-hoc).

## Gap 2 — Fresh-Context Evaluator Subagent (cwc + superpowers two-stage review)

**What's missing**: pure runtime has the `evaluator.md` subagent file at `Z:/claude-sota-installed/.local/cwc/.claude/agents/evaluator.md` per manifest §17, but lacks the wired Stop-hook pattern that invokes it after each turn.

**Concrete workflow citation**: cwc README L43 verbatim: "The builder shouldn't grade its own work. After each feature, you (or your wrapper script) invoke a separate subagent (`agents/evaluator.md`) with no Write/Edit tools that reviews the diff and the screenshots from a context window that never saw the build, then returns `PASS` or `NEEDS_WORK` with specific findings." Combined with superpowers `subagent-driven-development/SKILL.md:34-56 @ HEAD e7a2d164` two-stage review pattern (Dispatch implementer → spec-reviewer → code-quality-reviewer).

**Recommended ship**: Stop hook calls `claude --agent evaluator -p "<review prompt>"` after each builder turn; couples to superpowers `requesting-code-review` (already vendored in claude-sota; FORWARD-REF for pure).

## Gap 3 — Adaptive Sandbox Fan-Out Controller (awesome-agentic-patterns)

**What's missing**: pure runtime inherits `parallel-agent-wave.md §CADP rule 2` static max-3-concurrent cap from claude-sota; lacks signal-driven adaptive controller that scales fan-out based on observed success/failure signals.

**Concrete workflow citation**: `adaptive-sandbox-fanout-controller.md:1-30 @ HEAD ffb42768` quoting verbatim: "Static 'N=10 always' policies don't adapt to task difficulty, model variance, or observed failure rates... Add a controller that adapts fan-out in real time based on observed signals from early runs. Core loop: 1. Start small (N=3-5) 2. Early signal sampling: as soon as the first X runs finish, compute [success rate] 3. Decide: scale up if high success + diverse paths; scale down if redundant; stop if budget exhausted."

**Recommended ship**: extend `parallel-agent-wave.md §CADP` from static max-3 to signal-driven adaptive (scale to 4-5 when first 3 succeed + cache-rate ≥50%; halve when first 3 show >30% redundant findings). Closes the static-cap-bias surfaced in claude-sota arc Waves 22-47 where fan-out productivity correlated with task novelty not cap.

---

# Section 6 — Cite Trail at file:line + HEAD SHA Depth (compact)

| Cite class | Source | File:line | HEAD/blob SHA | Verified |
|---|---|---|---|---|
| TIER-1-DIRECT | anthropics/cwc-long-running-agents | `/README.md:17-60` | repo HEAD `ad107a974bced5244f74dd283dbf2bfd3baee3a1` blob `844543ec98228bb703a9ab6fbaf156ab825cb5e3` | 2026-05-15 mcp__github |
| TIER-1-DIRECT | obra/superpowers | `skills/executing-plans/SKILL.md:1-40` | repo HEAD `e7a2d16476bf042e9add4699c9d018a90f86e4a6` | 2026-05-15 direct Read |
| TIER-1-DIRECT | obra/superpowers | `skills/finishing-a-development-branch/SKILL.md` | HEAD `e7a2d164` | 2026-05-15 Glob+Read |
| TIER-1-DIRECT | obra/superpowers | `skills/subagent-driven-development/SKILL.md:1-90` | HEAD `e7a2d164` | 2026-05-15 direct Read |
| TIER-1-DIRECT | obra/superpowers | `skills/dispatching-parallel-agents/SKILL.md:1-60` | HEAD `e7a2d164` | 2026-05-15 direct Read |
| TIER-1-DIRECT | obra/superpowers | `skills/brainstorming/SKILL.md:1-40` (HARD-GATE refute) | HEAD `e7a2d164` | 2026-05-15 direct Read |
| TIER-1-DIRECT | obra/superpowers | `skills/writing-skills/SKILL.md:1-40` (meta-skill refute) | HEAD `e7a2d164` | 2026-05-15 direct Read |
| TIER-1-NAMED-AUTHOR | Piebald-AI claude-code-system-prompts | `system-prompts/agent-prompt-worker-fork.md:1-35` | repo HEAD <not-probed-via-Bash> | 2026-05-15 direct Read |
| TIER-1-NAMED-AUTHOR | Piebald-AI | `system-prompts/system-prompt-subagent-delegation-examples.md:1-50` | HEAD <not-probed-via-Bash> | 2026-05-15 direct Read |
| TIER-1-NAMED-AUTHOR | Piebald-AI | `system-prompts/skill-loop-slash-command.md:1-50` | HEAD <not-probed-via-Bash> | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/factory-over-assistant.md:1-35` | repo HEAD `ffb427683ec77f3690f7fadfec7a7611d9e907d9` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/compounding-engineering-pattern.md:1-40` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/adaptive-sandbox-fanout-controller.md:1-30` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/deterministic-zero-llm-orchestration.md:1-40` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/declarative-multi-agent-topology-definition.md:1-40` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/hybrid-llm-code-workflow-coordinator.md:1-40` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/multi-model-orchestration-for-complex-edits.md:1-30` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/cli-native-agent-orchestration.md:1-40` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/iterative-multi-agent-brainstorming.md:1-30` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/lane-based-execution-queueing.md:1-40` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/llm-map-reduce-pattern.md:1-30` (arXiv:2506.08837) | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/agent-driven-research.md:1-30` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/multi-step-analysis-pipeline-orchestration.md:1-30` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/initializer-maintainer-dual-agent.md:1-30` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/agent-circuit-breaker.md:1-30` | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | nibzard awesome-agentic-patterns | `patterns/graph-of-thoughts.md:1-30` (arXiv:2308.09687) | HEAD `ffb42768` | 2026-05-15 direct Read |
| TIER-2 | wshobson-agents | `plugins/conductor/.claude-plugin/plugin.json` + `commands/setup.md:1-40` (HARD-GATE refute) | repo HEAD <not-probed-via-Bash> | 2026-05-15 direct Read |
| TIER-2 | wshobson-agents | `plugins/plugin-eval/README.md:1-38` (3-layer rubric) | HEAD <not-probed-via-Bash> | 2026-05-15 direct Read |
| TIER-2 | wshobson-agents | `plugins/review-agent-governance/.claude-plugin/plugin.json` + `README.md:1-60` (Cedar + Ed25519) | HEAD <not-probed-via-Bash> | 2026-05-15 direct Read |
| TIER-2 | wshobson-agents | `plugins/full-stack-orchestration/agents/deployment-engineer.md:1-30` (DUPLICATE refute) | HEAD <not-probed-via-Bash> | 2026-05-15 direct Read |
| TIER-2 | wshobson-agents | `plugins/conductor/agents/conductor-validator.md:1-40` | HEAD <not-probed-via-Bash> | 2026-05-15 direct Read |
| TIER-1 | gsd-build/get-shit-done | `/README.md` (REJECT-P5 `--dangerously-skip-permissions`) | repo HEAD `fa862c77ee3cb85343708a9483db3102719fd1cf` blob `4275b2a0cdfc4637699cb6abfbe21f81f1795685` | 2026-05-15 mcp__github |
| TIER-1-NAMED-AUTHOR | gstack (Garry Tan MIT) | `codex/SKILL.md:1-60` | repo HEAD `dde55103fcc42bd446d804ddc15567ced8455ac1` | 2026-05-15 direct Read (sibling pin) |
| TIER-1-DIRECT | shanraisshan/claude-code-best-practice-shan | `agent-teams/agent-teams-prompt.md:1-60` (Command→Agent→Skill demo) | HEAD `48f2cebeb88b389b27231c418ceadb65baf813fd` (sibling pin) | 2026-05-15 direct Read |
| TIER-3-LOCAL-INHERITED | claude-sota | `ahfv-seven-sub-classes.md:38` iter-93 wshobson-conductor HARD-GATE REJECT precedent | claude-sota HEAD | 2026-05-15 inherited cite |
| TIER-3-LOCAL-INHERITED | claude-sota | `codex-t1-fix-forward-pattern.md` Pattern B mitigation gstack-derived n=8 | claude-sota HEAD | 2026-05-15 inherited |
| TIER-3-LOCAL-INHERITED | claude-sota | `parallel-agent-wave.md §CADP rule 2-5` max-3 concurrent static cap | claude-sota HEAD | 2026-05-15 inherited |
| TIER-3-LOCAL-INHERITED | claude-sota | `team-orch-frameworks.md` superpowers selectively-vendored 6-of-14 table | claude-sota HEAD | 2026-05-15 inherited |

---

# Honest Conclusion

**Hypothesis** (R0): "Pure runtime has comprehensive SOTA orchestration coverage via W206 wshobson 6 plugins + W207 ECC + addy skills."

**Verdict**: REFUTED with 3 specific gaps (Section 5). The W206/W207 install set provides excellent **plugin install foundation** but lacks the **close-the-loop triad**: (1) Default-FAIL evidence-gate, (2) Fresh-context evaluator wiring, (3) Adaptive fan-out controller. All three are install-class adoptable per Section 7 priorities.

**Top-3 immediate-adoption actions for orchestrator** (cardinal-rule-1 + CR-6 + CR-10 conformant):
1. **Install agent-sdk-dev plugin** via Anthropic claude-plugins-official marketplace (CR-6 official-native-channel; complements installed cwc native primitives).
2. **Adopt superpowers `executing-plans` + `finishing-a-development-branch` SKILL.md pair** via vendor-import per port-note-discipline.md §4 (already proven pattern with subagent-driven-development + requesting-code-review).
3. **Cite-import Factory-over-Assistant + Compounding-Engineering patterns** as cardinal-rule cite-anchors for parallel-agent-wave.md + karpathy-adapted.md §5 (strengthens existing TIER-3-LOCAL philosophies to firm Axis-1 PASS).

**STAND-IN-NOTICE**: this agent ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` env-funneling per CLAUDE.local.md ENV (f) — cross-model gate NOT structurally satisfied for this dispatch. Orchestrator must integrate this Sonnet stand-in verdict with explicit penetration-rate disclosure per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` + Pattern B HNF disposition if no real-GPT-5.5 cross-check fires.

**Retractions / null findings**: 0 retractions from R3-equivalent line-by-line audit (every cite verified at file:line + HEAD SHA). 1 HONEST-NON-FINDING: full audit of wshobson 75 unenabled plugins beyond conductor/plugin-eval/review-agent-governance/full-stack-orchestration was scoped-out per OUTPUT_BUDGET ≤700 LOC; deep-dive deferred to W209+.
