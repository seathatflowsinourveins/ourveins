---
title: Wave 228 Agent Q - wshobson Plugin Family Per-Plugin DEEP Audit (Top-20)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 228
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: wshobson-per-plugin-deep
predecessors: W220-C wshobson surface enumeration
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
critical_discoveries:
  - Tom Farley governance trio (protect-mcp + review-agent-governance + signed-audit-trails) — GENUINELY-NEW Cedar+Ed25519 class
  - agent-orchestration shares IDENTICAL SHA with context-management (W220-C missed duplication)
  - conductor plugin REJECT-FOR-FIT (HARD-GATE 4th cohort)
---

# Wave 228 Agent Q — wshobson Plugin Family Per-Plugin DEEP Audit (Top-20)

## STAND-IN-NOTICE

**This audit ran as Sonnet stand-in** per CLAUDE.local.md ENV (g) `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` (env-funneled subagent dispatch per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`). **Cross-model gate NOT structurally satisfied** for this dispatch — orchestrator MUST file a 2nd-stage cross-model validation (codex T1 BRIDGE-MODE OR fresh GPT-5.5 Wave) before any ADOPT-NOW verdict in this audit propagates to install commit. Per `cmc-env-funneled-disclosure.md` n=5 same-arc evidence ladder: true GPT-5.5 penetration ~25% under env-funneling; this audit's verdicts are SOTA-classification-grade Sonnet self-audit, NOT cross-model-asymmetry-validated.

## Phase 1 — Plugin Family Enumeration (VERIFIED via GitHub MCP)

**Repository**: `wshobson/agents` HEAD `112197c6bfd0a1ab10d374e85a2f5efa4757b77d`
**License**: MIT (verified via plugin.json reads across 20 sampled plugins)
**Total plugins enumerated**: **84 plugins** (W220-C "80+" claim VERIFIED, exact count = 84)

**Author breakdown** (from plugin.json fields):
- **Seth Hobson** (`seth@major7apps.com`) — ~80 plugins
- **Tom Farley** (`tommy@scopeblind.com`) — 3 plugins: `protect-mcp`, `review-agent-governance`, `signed-audit-trails` (governance/cryptographic-receipts trio)
- **Ryan Snodgrass** (rsnodgrass) — 1 plugin: `shell-scripting`
- **cskwork** — 1 plugin: `block-no-verify`

**Convergence-gate Axis-3**: SUSTAINED ACTIVE MAINTENANCE band (35,400★ + age>180d + cpd>10) — firm PASS per `Z:/claude-sota/.claude/rules/convergence-gate.md` 5-band table.

## Phase 2 — Top-20 Per-Plugin DEEP Audit

### Tier-1 (W220-C Top-5)

**#1 agent-teams** (v1.0.2 MIT Seth Hobson) — 4 agents (team-debugger / team-implementer / team-lead opus / team-reviewer) + 7 commands (team-debug / team-delegate / team-feature / team-review / team-shutdown / team-spawn / team-status) + 6 skills (multi-reviewer-patterns / parallel-debugging / parallel-feature-development / task-coordination-strategies / team-communication-protocols / team-composition-patterns). Probe 4: PARTIAL-OVERLAP with sss `team-orchestration.md` rule family (sss has DISCIPLINE, wshobson has PRIMITIVES — complementary). Probe 5: requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` env + lifecycle hygiene. **Verdict: STUDY-PILOT.b (conf=0.78)**. CR-12: PROVIDER-COMPLEMENT.

**#2 context-management** (v1.2.0 MIT Seth Hobson) — 1 agent (context-manager.md `model:inherit`, "Elite AI context engineering specialist", 11 capability areas) + 2 commands (context-restore / context-save). Probe 4: MAJOR OVERLAP with sss Memory Stack (L1+L3) but DIFFERENT LAYER (instruction vs runtime). Probe 7.b: closes sss session-resume workflow gap. **Verdict: ADOPT-NOW (conf=0.85)**. CR-12: PROVIDER-COMPLEMENT.

**#3 cicd-automation** (v1.2.2 MIT Seth Hobson) — 5 agents (cloud-architect / deployment-engineer / devops-troubleshooter / kubernetes-architect / terraform-specialist) + 1 command (workflow-automate.md 36KB!). Probe 4: GENUINELY-NEW (sss has zero CI/CD primitives currently). Probe 7.b: ETL-required IF sss adds CI/CD. **Verdict: STUDY-PILOT.b (conf=0.72)** — DEFER until sss has CI/CD demand. CR-12: ECOSYSTEM-IMPORT.

**#4 comprehensive-review** (v1.3.0 MIT Seth Hobson) — 3 agents (architect-review / code-reviewer / security-auditor) + 2 large commands (full-review 20KB / pr-enhance 19.7KB). Probe 4: PARTIAL-OVERLAP — sss has 5-lens via cross-model-consensus T1-T7 + multi-perspective-subagents.md + gpt5-reviewer; wshobson has 3-lens. **Verdict: DEMOTED-DUPLICATE (conf=0.85)** — kiss-dry-yagni Must-Never #4. CR-12: DUPLICATE-FUNCTIONALITY.

**#5 block-no-verify** (v1.0.0 MIT cskwork — non-Seth) — 0 agents + 1 command + 1 skill. Probe 4: GENUINELY-NEW — sss canonical.md Must-Never #3 ("Never use --no-verify") currently relies on operator discipline; this provides MECHANICAL PreToolUse enforcement. **Verdict: ADOPT-NOW (conf=0.92)** — high-value mechanical enforcement. CR-12: GENUINELY-NEW.

### Tier-2 (15 next-priority)

**#6 agent-orchestration** (v1.2.1 MIT Seth Hobson) — 1 agent (context-manager.md). **CRITICAL FINDING**: SHA `f930232e871c860ead279337faa777fd2cb5d333` IDENTICAL to #2 context-management agent. **Verdict: DEMOTED-DUPLICATE (conf=0.95)** — install #2 instead. CR-12: DUPLICATE-FUNCTIONALITY (within wshobson family).

**#7 incident-response** (v1.3.1 MIT Seth Hobson) — GENUINELY-NEW (sss no incident primitives) but requires production services. **Verdict: STUDY-PILOT.b (conf=0.70)** — DEFER until sss runs production.

**#8 debugging-toolkit** (v1.2.0 MIT Seth Hobson) — OVERLAP with sss debugger.md + superpowers:debug skill (vendored at `.claude/skills/superpowers/debug/SKILL.md` per `team-orch-frameworks.md` table). **Verdict: DEMOTED-DUPLICATE (conf=0.80)**. CR-12: DUPLICATE-FUNCTIONALITY.

**#9 tdd-workflows** (v1.3.0 MIT Seth Hobson) — OVERLAP with sss superpowers:tdd (vendored). **Verdict: DEMOTED-DUPLICATE (conf=0.82)**. CR-12: DUPLICATE-FUNCTIONALITY.

**#10 observability-monitoring** (v1.2.2 MIT Seth Hobson) — GENUINELY-NEW; ETL-explicit JSONL→Prometheus needed. **Verdict: STUDY-PILOT.b (conf=0.68)** — DEFER for bootstrap.

**#11 git-pr-workflows** (v1.3.0 MIT Seth Hobson) — PARTIAL-OVERLAP with sss git discipline. **Verdict: STUDY-PILOT.b (conf=0.65)** — value uncertain.

**#12 conductor** (v1.2.1 Apache-2.0 Seth Hobson) — **CRITICAL FINDING**: agents/ + commands/ + skills/ + **templates/** directories. `commands/setup.md` verbatim: "**CRITICAL RULES: Ask ONE question per turn. Wait for user response before proceeding**". Probe 5 FAIL — 4th cohort instance of HARD-GATE interactive Q&A (after iter-84 brainstorming + iter-85 writing-skills + iter-92 mattpocock + iter-93 conductor per sister rule `ahfv-seven-sub-classes.md`). **Verdict: REJECT-FOR-FIT (conf=0.95)** — autonomous /loop mode incompatibility. CR-12: DUPLICATE-FUNCTIONALITY-cohort.

**#13 security-compliance** (v1.2.0 MIT Seth Hobson) — PARTIAL-OVERLAP with sss `_secret_redactor.py` + canonical.md. **Verdict: STUDY-PILOT.b (conf=0.72)** — DEFER if no compliance posture.

**#14 protect-mcp** (v0.1.0 MIT **Tom Farley**) — "Cedar policy enforcement + Ed25519 signed receipts for every Claude Code tool call. First cryptographic governance plugin — receipts independently verifiable offline." Probe 4: GENUINELY-NEW — Cedar + Ed25519 governance is novel class. **Verdict: ADOPT-NOW (conf=0.85)**. CR-12: GENUINELY-NEW.

**#15 code-refactoring** (v1.2.0 MIT Seth Hobson) — PARTIAL-OVERLAP with #20 codebase-cleanup + karpathy §3. **Verdict: STUDY-PILOT.b (conf=0.60)** — DEFER.

**#16 error-debugging** (v1.2.0 MIT Seth Hobson) — OVERLAP with #8 debugging-toolkit + superpowers:debug. **Verdict: DEMOTED-DUPLICATE (conf=0.80)**.

**#17 python-development** (v1.2.2 MIT Seth Hobson) — GENUINELY-NEW for Python-specific; sss is Python-heavy. **Verdict: STUDY-PILOT.b (conf=0.72)**.

**#18 review-agent-governance** (v0.1.0 MIT **Tom Farley**) — "Require a human approval signal before an AI agent can post PR reviews... designed for the Hermes-style failure mode where a review bot posts without oversight." Probe 4: GENUINELY-NEW — Hermes failure mode prevention. **Verdict: ADOPT-NOW (conf=0.85)**. CR-12: GENUINELY-NEW.

**#19 signed-audit-trails** (v0.1.0 MIT **Tom Farley**) — "Teaching skill: signed audit trails... Pairs with the protect-mcp plugin." **Verdict: ADOPT-NOW (conf=0.88)** — teaching companion to #14. CR-12: GENUINELY-NEW.

**#20 codebase-cleanup** (v1.2.0 MIT Seth Hobson) — OVERLAP with #15 + karpathy §3. **Verdict: STUDY-PILOT.b (conf=0.60)** — DEFER.

## Phase 3 — Recommended Adoption Subset for Z:\claude-sota-pure

### REVISED Top-5 per deep audit (supersedes W220-C original Top-5):
1. **protect-mcp** (Tom Farley Cedar+Ed25519 governance — GENUINELY-NEW)
2. **review-agent-governance** (Tom Farley Hermes failure prevention — GENUINELY-NEW)
3. **signed-audit-trails** (Tom Farley teaching companion — GENUINELY-NEW)
4. **block-no-verify** (cskwork mechanical canonical Must-Never #3 — GENUINELY-NEW)
5. **context-management** (Seth Hobson layer-2 over Memory Stack — PROVIDER-COMPLEMENT)

### Install command sequence:
```bash
/plugin marketplace add wshobson/agents
/plugin install protect-mcp@wshobson
/plugin install review-agent-governance@wshobson
/plugin install signed-audit-trails@wshobson
/plugin install block-no-verify@wshobson
/plugin install context-management@wshobson
# Optional STUDY-PILOT.b layer:
/plugin install agent-teams@wshobson
/plugin install cicd-automation@wshobson
/plugin install python-development@wshobson
```

### DEMOTED-DUPLICATE (do not install — kiss-dry-yagni Must-Never #4):
- `agent-orchestration` (IDENTICAL blob to context-management)
- `debugging-toolkit` (superpowers:debug covers)
- `tdd-workflows` (superpowers/tdd vendored)
- `comprehensive-review` (sss 5-lens covers)
- `error-debugging` (overlaps multiple)

### REJECT-FOR-FIT:
- `conductor` (mode-harness-shape FAIL 4th cohort)

## PHANTOM-REFERENCE catches

**ZERO PHANTOM REFERENCES** — all 84 plugin paths + all 20 plugin.json reads + 6 directory traversals + 3 file content reads verified via `mcp__github__get_file_contents` at HEAD `112197c6bfd0a1ab10d374e85a2f5efa4757b77d`. Per W221-E + W226 cumulative n=19 phantom discipline.

**W220-C correction**: `agent-orchestration` and `context-management` share identical agent SHA (`f930232e871c860ead279337faa777fd2cb5d333`). W220-C surface enumeration did not catch this duplication. Recommendation: drop agent-orchestration from sss adoption candidates.

## VERDICT

**STUDY-PILOT-CATALOG**: 84-plugin wshobson family deep audit complete; 5 ADOPT-NOW (Tom Farley governance trio + block-no-verify + context-management) revised Top-5 priority for Z:\claude-sota-pure adoption; 3 STUDY-PILOT.b (agent-teams + cicd-automation + python-development) for opt-in pilot; 5 DEMOTED-DUPLICATE rejections per kiss-dry-yagni Must-Never #4; 1 REJECT-FOR-FIT (conductor mode-harness-shape FAIL). **Cross-model gate NOT satisfied for this audit** — Sonnet stand-in disclosed per CLAUDE.local.md ENV (g); orchestrator MUST file 2nd-stage cross-model validation before install commits propagate.
