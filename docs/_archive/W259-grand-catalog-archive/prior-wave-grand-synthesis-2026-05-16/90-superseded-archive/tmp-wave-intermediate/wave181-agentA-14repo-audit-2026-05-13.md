---
title: W181 P0 Agent A — 14-repo SOTA audit for advanced-automation + auto-compact + parallel-git + cross-session-memory
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f))
wave: 181
fire: P0
persisted_by: orchestrator (FM-19 + FM-20 row 16 sub-class — Agent A falsely-claimed ARTIFACT-INLINE persist; Mia probe Bash ls REFUTED 2026-05-13)
output_budget: ≤600 LOC actual
termination: handoff_to:orchestrator|max_turns:25 — terminated via VERDICT
stand-in-notice: TRUE — cross-model gate NOT satisfied; 2nd-stage codex T1 BRIDGE-MODE validation REQUIRED before install
---

# W181 P0 — 14-repo SOTA audit

## STAND-IN-NOTICE

Sonnet stand-in per `CLAUDE.local.md` ENV (f) `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`. Cross-model consensus per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` NOT structurally satisfied. Orchestrator MUST queue 2nd-stage codex T1 BRIDGE-MODE per FM-09 codex-rescue blind-spot 2-stage validation contract.

## Section 1 — Per-repo verdict table

| # | Repo | HEAD SHA | README blob-SHA | License | Verdict | Top pattern |
|---|---|---|---|---|---|---|
| 1 | wshobson/agents | 34632bcb | 035d11c5 | MIT | STUDY-PILOT | PluginEval 3-layer + Agent Teams plugin |
| 2 | abhigyanpatwari/GitNexus | afa38432 | e08c0eb7 | **PolyForm Noncommercial** | **REJECT-FOR-FIT P6** | LICENSE blocker (CR-9 + Probe 6) |
| 3 | quemsah/awesome-claude-plugins | 62e65931 | fac7fd78 | (catalog) | CITE-CLASS-CANONICAL | Top-100 plugin discovery (16,604 indexed) |
| 4 | Shubhamsaboo/awesome-llm-apps | 795212bf | 34e9fa21 | Apache-2.0 | STUDY-PILOT | 100+ ready-run agent templates |
| 5 | forrestchang/andrej-karpathy-skills | 2c606141 | 7cf07a78 | MIT | **ALREADY-CITED TIER-1** | Karpathy 4 principles (cardinal-rule-2 anchor) |
| 6 | mattpocock/skills | e74f0061 | f66fcac7 | MIT | STUDY-PILOT (P5 CAVEAT) | grill-with-docs CONTEXT.md + ADR (HARD-GATE per FM-09 iter-92) |
| 7 | hesreallyhim/awesome-claude-code | 614f102a | 7c8dc043 | **CC-BY-NC-ND-4.0** | CITE-ONLY (no fork-modify) | Curation in transition |
| 8 | alirezarezvani/claude-skills | 8606b45b | 16237686 | MIT | STUDY-PILOT-NARROW | 268 skills + skill-security-auditor + caveman |
| 9 | gsd-build/get-shit-done | 639e4d60 | 954893ff | MIT | **STUDY-PILOT-PRIMARY** | 6-cmd spec-driven + fresh-subagent 200k isolation |
| 10 | vercel-labs/agent-skills | b9c8ee06 | 7fcc6c17 | MIT | STUDY-PILOT (overturns W164 F20 P6) | LICENSE PRESENT (was prior PROBE-6 BLOCK) |
| 11 | affaan-m/everything-claude-code | c04baa8c | e731eb3f | MIT | ALREADY-INSTALLED | ECC canonical (dmux-workflows + autonomous-agent-harness + team-builder) |
| 12 | shanraisshan/claude-code-best-practice | f8468e87 | 0805874d | (MIT-class) | ALREADY-CITED TIER-1 | CCBP cardinal anchor (HEAD 48f2ceb) |
| 13 | vinta/awesome-python | 5909fa76 | 81eff0ed | CC-BY-4.0 | CITE-CLASS-CANONICAL | Python library discovery |
| 14 | ComposioHQ/awesome-claude-skills | f2b5e29b | 53376a75 | Apache-2.0 | STUDY-PILOT-NARROW | 1000+ skills + 78 app automations |

**Axis-1 PASS**: 10 distinct orgs convergent (wshobson + Shubhamsaboo + forrestchang + mattpocock + alirezarezvani + gsd-build + vercel-labs + affaan-m + shanraisshan + ComposioHQ).

## Section 2 — Pattern extraction

### Pattern A — Auto-compact 50-60% reclaim (target gap)

Current sss: W180 F3 row 15 ~13% reclaim. SOTA candidates:
1. **gsd-build** — fresh-subagent 200k context isolation; main context stays 30-40%. Install: `npx get-shit-done-cc@latest` (CR-6 canonical). PRIMARY TARGET.
2. **mattpocock /grill-with-docs** — CONTEXT.md + ADR distillation (Eric Evans DDD ubiquitous-language)
3. **caveman skill** (alirezarezvani + claude-plugins-official) — 75% reduction claim
4. **wshobson PluginEval** — anti-pattern detection (BLOATED_SKILL)

### Pattern B — Parallel-git superseding `eee --worktree`

1. **wshobson agent-teams** plugin — 7 preset multi-agent teams via CC native experimental Agent Teams. `/plugin install agent-teams@claude-code-workflows`
2. **max-sixty/worktrunk** (quemsah row 96, 5043★) — STUDY-PILOT secondary
3. **alirezarezvani git-worktree-manager** — port isolation + env sync
4. **superpowers using-git-worktrees** — isolated worktrees + safety verification

### Pattern C — Cross-session-memory (>> 22 mcp-memory + 0 graphiti baseline)

1. **thedotmack/claude-mem** (quemsah row 9, 74,857★) — AI-compress session JSONL re-injection. PRIMARY TARGET.
2. **mem0ai/mem0** (55,458★) — universal memory layer
3. **MemPalace** (51,983★) — best-benchmarked open-source
4. **vectorize-io/hindsight** — already-cited in research-protocol.md; UPGRADE: add MCP frontend wiring
5. **alirezarezvani self-improving-agent** — auto-memory curation + pattern promotion + skill extraction

### Pattern D — Agent-team orchestration

1. **wshobson agent-teams** — CC native experimental; 7 presets bypass BRIDGE-MODE bootstrapping
2. **gsd-build** parallel waves + debug agents
3. **VoltAgent/awesome-claude-code-subagents** (19,578★) — 100+ specialized subagents inventory
4. **EveryInc/compound-engineering** — AVOID per W163 F12 DEFER CR-12 PARTIAL-OVERLAP

### Pattern E — Skill discovery

1. **wshobson PluginEval** — 3-layer evaluation (static + LLM judge + Monte Carlo) + Quality Badges + 6 anti-patterns. PRIMARY SKILL-QUALITY GATE.
2. **alirezarezvani skill-security-auditor** — command injection / code execution / data exfiltration / prompt injection scan. Pre-install gate.

## Section 3 — Probe DAG 1-7 results

GitNexus: Probe 6 LICENSE blocker (PolyForm Noncommercial) — REJECT-FOR-FIT. W164 F38b install at `npx gitnexus analyze` PREDATES LICENSE re-verify — re-audit queued for compat at next /goal cycle; if PolyForm blocks runtime use, REVERT per `closed-loop-recursive-narrowing.md §Outcome B`.

All other repos: Probe 1-7 PASS with notes (mattpocock P5 HARD-GATE caveat; alirezarezvani Probe 4 plugin-namespace overlap risk 268 skills; vercel-labs Probe 5 React/Next.js narrow).

## Section 4 — Top-3 ADOPT-NOW install priority

After 2nd-stage codex T1 BRIDGE-MODE validation:

1. **gsd-build/get-shit-done** (CR-12 GENUINELY-NEW for fresh-subagent isolation) — closes W181 P1 auto-compact gap. `npx get-shit-done-cc@latest --profile=core`. Predicted impact: main-context 30-40% baseline.
2. **wshobson/agents:agent-teams + plugin-eval** (CR-12 PARTIAL-OVERLAP) — extends advanced-agent-team-standing-directive.md with CC native + skill-quality gate. `/plugin install agent-teams@claude-code-workflows` + `/plugin install plugin-eval@claude-code-workflows`.
3. **thedotmack/claude-mem** (CR-12 GENUINELY-NEW for L2 + cross-session-memory) — closes W181 P3. Probe `npx claude-mem@latest` canonical channel; verify MIT + axis-3 stability + LICENSE.

## Section 5 — REJECT-FOR-FIT / AVOID

1. **GitNexus** — PolyForm Noncommercial (CR-9 + P6). W168 row 11 + current confirmed. REVERT current `npx gitnexus analyze` install at next cycle if PolyForm blocks runtime use.
2. **EveryInc/compound-engineering-plugin** — W163 F12+F16 DEFER 0.84 CR-12 PARTIAL-OVERLAP. FM-20 n=13 evidence.
3. **hesreallyhim/awesome-claude-code** — CC-BY-NC-ND-4.0 no-fork. Cite-only; use quemsah as primary discovery.

## Section 6 — Cross-model gate satisfaction

PARTIAL (Sonnet stand-in). Recommended paths:
- **Path A**: 2nd-stage codex T1 BRIDGE-MODE validation per `cross-model-consensus.md §The contract`
- **Path P**: orchestrator-direct `codex exec --skip-git-repo-check --color never < .claude/state/codex_consult_w181_p0_OUT.txt`
- **Path D**: `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` per `CLAUDE.local.md ENV (h)`

Recommended Path A on Top-3 before install.

## VERDICT

Per-repo: 10 STUDY-PILOT / 2 CITE-CANONICAL / 1 CITE-ONLY / 1 REJECT-FOR-FIT. 3 already-applied (Karpathy + ECC + CCBP). W164 F20 vercel-labs P6 BLOCK OVERTURNED.

Per-pattern Top-3 ADOPT-NOW (operator-gated; 2nd-stage codex T1 required):
1. gsd-build (P1)
2. wshobson agent-teams + plugin-eval (P2+P5)
3. claude-mem (P3)

REJECT: GitNexus (P6), EveryInc compound-engineering (PARTIAL-OVERLAP), hesreallyhim (CC-BY-NC-ND).

VERDICT-END.
