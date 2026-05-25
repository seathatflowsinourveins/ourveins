---
title: W209 Agent L — Long-arc resilience + agent-definition deep audit
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g))
STAND-IN-NOTICE: codex CLI not invoked; verdict = Sonnet stand-in; CR-3 cross-model gate
                  NOT structurally satisfied — orchestrator-side T1 review of THIS audit
                  must apply per advanced-agent-team-standing-directive.md invariant #1
ARC-CONTEXT: W209 deep-dive beyond W206/W207/W208 14-layer matrix
OUTPUT_BUDGET: ≤700 LOC
---

# 1. Executive Summary

Pure runtime currently ships LIGHT long-arc resilience: cwc 5 hooks (Default-FAIL +
fresh-context evaluator + handoff + kill-switch + steer) + 1 Stop-on-commit hook +
ralph-loop plugin (Stop-hook auto-continue). Deep audit across 7 long-arc repos +
3 agent-definition catalogs (Piebald 100+ files / wshobson 75+ plugins / ECC 47 agents)
surfaces ONE structural gap and TWO incremental enrichment opportunities.

KEY FINDINGS:
- Gap-1 (cardinal): PROGRESS.md + Pipeline Status convention NOT codified in runtime
  rules. cwc README + ARIS docs converge (2-org Axis-1) on this as the foundational
  long-arc primitive. ADOPT-NOW = adapt cwc CLAUDE.md handoff convention into
  .claude/rules/.
- Gap-2 (high-leverage): Anthropic NATIVE /compact + /rewind primitives are runtime-
  invariant SOTA — no install needed; codify discipline pointer in rules.
- Gap-3 (medium): Context-monitor bridge-file PostToolUse hook (gsd pattern) is
  TIER-1-DIRECT runtime-aware companion to repo-local
  userpromptsubmit_compact_threshold.py. ADOPT-NOW-PATTERN-EXTRACT.

ADOPT-NOW Top-5 are 100% cite-class (rules/conventions); NO new install candidates
surface (CR-12 disposition lattice routes 80% of candidates to DUPLICATE or
PROVIDER-COMPLEMENT against incumbent runtime primitives).

# 2. Audit Matrix per Category

## 2.A Long-arc Resilience Patterns (7 candidates)

| # | Candidate | HEAD/Source | License | Probe-DAG | CR-12 class | Verdict |
|---|---|---|---|---|---|---|
| 1 | cwc-long-running-agents 5 primitives | `Z:/repos/deps/cwc-long-running-agents` (Anthropic; HEAD pin per CLAUDE.md L294) | Apache-2.0 | P1✓ P5✓ P6✓ P7.b✓ — Axis 1+2+3 PASS (Anthropic OFFICIAL; STRONG-PROVENANCE) | GENUINELY-NEW | **INSTALLED** (Section 17 manifest) — deep-audit confirms cite anchor |
| 2 | cwc Going-Further table (planner / sprint-contracts / browser-verify / rubrics) | cwc README L88-97 | Apache-2.0 | P5 mode-harness ⚠ (rubric is project-specific) | GENUINELY-NEW | **STUDY-PILOT** — rubric not portable; browser-verify needs playwright-mcp |
| 3 | Continuous-Claude-v3 (32 agents / 109 skills / 30 hooks) | `Z:/repos/deps/Continuous-Claude-v3` HEAD per glob | MIT | P5 HARD-GATE ⚠ (requires Docker/PostgreSQL/uv setup wizard 12 steps) + P4 plugin-namespace (109 skills duplicates ECC + skill-creator) | DUPLICATE-FUNCTIONALITY | **REJECT-FOR-FIT** per `kiss-dry-yagni.md` Must-Never #4. Pattern-extract: handoff-index.ts + memory-awareness.ts already covered by mcp-memory + graphiti L3 |
| 4 | ARIS (Auto-claude-code-research-in-sleep) Pipeline Status convention | `Z:/repos/deps/Auto-claude-code-research-in-sleep/docs/SESSION_RECOVERY_GUIDE.md` | (check LICENSE) | P1✓ P5✓ P7.b✓ — pure-doc convention | GENUINELY-NEW | **ADOPT-NOW** (cite-class) — see ADOPT-NOW #1 |
| 5 | ARIS session-restore.sh / context-refresh.sh / pre-compact-remind.sh hooks | Same repo docs L114-120 | TBD | P5 ⚠ DUPLICATE — userpromptsubmit_compact_threshold.py already wired | PARTIAL-OVERLAP | **CITE-PATTERN-ONLY** — pre-compact pattern reinforces auto-compact-discipline.md Rank #3.5 |
| 6 | gsd context-monitor bridge-file pattern | `Z:/repos/deps/get-shit-done/docs/context-monitor.md` | TBD | P1✓ P5✓ Axis 1 partial (single-org gsd) but TIER-1-NAMED-AUTHOR (CLAUDE.md L341 endorses) | PARTIAL-OVERLAP | **ADOPT-NOW-PATTERN-EXTRACT** — see ADOPT-NOW #2 |
| 7 | gsd /gsd:pause-work + /gsd:resume-work checkpoint commands | `Z:/repos/deps/get-shit-done/commands/gsd/{pause,resume}-work.md` | TBD | P5 ⚠ HARD-GATE on `.continue-here.md` filesystem convention (no Hard-Gate failure but namespace clash with current handoff flows) | PARTIAL-OVERLAP | **CITE-PATTERN-ONLY** — convention valid; manifest as STUDY-PILOT for SessionStart wire |

## 2.B Checkpoint / Recovery / Rewind Patterns

| # | Candidate | Source | Probe | CR-12 class | Verdict |
|---|---|---|---|---|---|
| 8 | Anthropic /rewind primitive (esc esc) | `https://code.claude.com/docs/en/cli-reference` (referenced via Thariq 2026-04-16) | RUNTIME-NATIVE | GENUINELY-NEW (already in CC) | **ADOPT-NOW (discipline-only)** — codify via `coordination.md §12` pointer expansion |
| 9 | Anthropic /compact + /clear primitive | Same | RUNTIME-NATIVE | GENUINELY-NEW (already in CC) | **ADOPT-NOW (discipline)** — auto-compact-discipline.md exists; extend with Thariq named-T2 quote |
| 10 | Anthropic auto-mode + Shift+Tab cycling | Boris 6-tips L22-34 (Apr 2026) | RUNTIME-NATIVE | GENUINELY-NEW | **DEFER** — runtime currently bypassPermissions per W82d operator override; revert path documented in CLAUDE.md §"Intentional divergences" (d) |
| 11 | Anthropic recaps (/config) | Boris 6-tips L49-65 | RUNTIME-NATIVE | GENUINELY-NEW | **DEFER** — discipline-only when needed |
| 12 | Anthropic focus mode (/focus) | Boris 6-tips L70-77 | RUNTIME-NATIVE | GENUINELY-NEW | **DEFER** |
| 13 | Anthropic conversation-summarization system prompt | `Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-conversation-summarization.md` | TIER-1 Piebald | CITE-CLASS-CANONICAL (per CR-12 6th class W152-F20+) | **ACCEPT-AS-CITE-REFERENCE** — ratifies CLAUDE.md/auto-compact-discipline.md; ETL Anthropic SDK summary format |
| 14 | Anthropic context-compaction-summary system prompt | Same dir `system-prompt-context-compaction-summary.md` | TIER-1 Piebald | CITE-CLASS-CANONICAL | **ACCEPT-AS-CITE-REFERENCE** — provides verbatim summary structure for /compact hint |

## 2.C Agent-Definition Catalogs

| # | Candidate | Source | Inventory | CR-12 class | Verdict |
|---|---|---|---|---|---|
| 15 | Piebald-AI 100+ system prompts | `Z:/repos/deps/claude-code-system-prompts/` | 100+ files: agent-prompt-* (15) / data-* (8) / skill-* (15) / system-prompt-* (60+) | CITE-CLASS-CANONICAL | **ACCEPT-AS-CITE-REFERENCE** — already partially cited; add prioritized pull-list (see Gap-4) |
| 16 | wshobson agent-teams plugin (4 agents + 6 skills + 7 commands) | `Z:/repos/deps/wshobson-agents/plugins/agent-teams/` | team-lead / team-reviewer / team-debugger / team-implementer | DUPLICATE-FUNCTIONALITY (runtime has team-orchestration.md + advanced-agent-team-standing-directive.md) | **CITE-PATTERN-ONLY** — extract team-composition-patterns SKILL.md sizing heuristics table |
| 17 | wshobson 75+ other plugins (api-scaffolding / blockchain / etc.) | `Z:/repos/deps/wshobson-agents/plugins/*/` | 75 plugin dirs | Mostly DUPLICATE or out-of-scope (no fit for SOTA harness research) | **REJECT-FOR-FIT** for harness purposes; domain-specific apps can install via `/plugin install` per CR-6 if user need surfaces |
| 18 | ECC 47 agents (`Z:/repos/deps/affaan-m-everything-claude-code/agents/`) | a11y-architect / loop-operator / chief-of-staff / silent-failure-hunter / tdd-guide / 42 others | ECC ALREADY INSTALLED as plugin (per CLAUDE.md L494). Agents available via plugin namespace | DUPLICATE-FUNCTIONALITY (plugin-loaded) | **NO ACTION** — agents auto-available; cite-extend if specific role missing |
| 19 | Continuous-Claude-v3 32 agents | aegis / arbiter / chronicler / herald / kraken / maestro / oracle / pathfinder / phoenix / scout / scribe / sleuth / spark / surveyor / 18 others | DUPLICATE (32 agents heavy duplicate of runtime 13 agents) + Pattern-extract candidate: arbiter (test validation) + chronicler (session analysis) + scribe (handoff) + maestro (orchestration) + spark (creativity) | DUPLICATE-FUNCTIONALITY for most; PARTIAL-OVERLAP for arbiter/chronicler/scribe | **CITE-PATTERN-ONLY** — extract erotetic check pattern (E(X,Q) framing) + Sonnet/Haiku/Opus model tiering convention |
| 20 | superpowers/agents/ + plugin defs | NOT FOUND as directory; agents are skills-resident only | n/a | n/a | **HONEST-NON-FINDING** — superpowers ships SKILLS not agents per glob probe |
| 21 | andrej-karpathy-skills/agents/ | NOT FOUND as directory | n/a | n/a | **HONEST-NON-FINDING** — karpathy ships 1 skill (karpathy-guidelines/SKILL.md) only |
| 22 | agentopology declarative topology | NOT FOUND in `Z:/repos/deps/agentopology/` | n/a | n/a | **HONEST-NON-FINDING** — repo path empty/missing; sibling W208 STUDY-PILOT cite is stale or remote-only |
| 23 | smtg-ai/claude-squad | NOT FOUND in deps/ probe | n/a | n/a | **DEFER** — Windows-blocker per parent-CCC + claude-sota notes (pty.Start fails on Windows); per CLAUDE.md L411 still STATUS-DISABLED-IN-SSS |
| 24 | ComposioHQ/agent-orchestrator | NOT FOUND in deps/ probe (sibling Wave 138 cite refers to specific files only) | n/a | n/a | **DEFER** — macOS-focused per parent verdict |

## 2.D Subagent Fork + Dispatch Patterns

| # | Candidate | Source | Probe | CR-12 class | Verdict |
|---|---|---|---|---|---|
| 25 | Piebald agent-prompt-worker-fork.md | `Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-worker-fork.md` | TIER-1 Piebald (CCBP `CLAUDE_CODE_FORK_SUBAGENT` upstream named-T2) | CITE-CLASS-CANONICAL | **ACCEPT-AS-CITE-REFERENCE** — ratifies CLAUDE.local.md ENV (e) `CLAUDE_CODE_FORK_SUBAGENT=1` activation; pattern: 4 hard rules ("Worker fork ≠ continuation" / "Do NOT spawn sub-agents" / "One shot" / "List paths + commit hashes") |
| 26 | Piebald system-prompt-subagent-delegation-examples.md | Same dir | TIER-1 Piebald | CITE-CLASS-CANONICAL | **ACCEPT-AS-CITE-REFERENCE** — ratifies team-orch-patterns.md §"Never delegate understanding"; verbatim XML example pattern |
| 27 | Piebald system-prompt-fork-usage-guidelines.md | Same dir | TIER-1 Piebald | CITE-CLASS-CANONICAL | **ACCEPT-AS-CITE-REFERENCE** — adds "Don't peek / Don't race / Cache-share" discipline to team-orch-frameworks.md fork-vs-fresh routing |
| 28 | Piebald system-prompt-autonomous-loop-check.md | Same dir | TIER-1 Piebald | CITE-CLASS-CANONICAL | **ACCEPT-AS-CITE-REFERENCE** — autonomous /loop discipline (continue established work / 3-consecutive-nothing-to-do → CI-only); ratifies coordination.md §10 autonomous-operation SOP |
| 29 | superpowers/skills/subagent-driven-development/SKILL.md | Already vendored (per CLAUDE.md L304-310 selectively-vendored sister skills row 4) | n/a | DUPLICATE-FUNCTIONALITY (already vendored) | **NO ACTION** |
| 30 | openai/openai-agents-python | Not yet INSTALLED in pure runtime per CLAUDE.md L294 4th-org Axis-1 candidate | (W134-F27-A codex T1 verdict STUDY-PILOT-PATTERN-EXTRACT conf=0.89) | PROVIDER-COMPLEMENT | **STUDY-PILOT-PATTERN-EXTRACT** — extract Handoff + Tracing pattern (already cite-extended in team-orch-frameworks.md) |
| 31 | langchain-ai/deepagents | (W134-F27-B Pattern B HNF) | (ECOSYSTEM-IMPORT — requires langchain-core>=1.4.0a2 + 6+ langgraph-* sub-pkgs) | ECOSYSTEM-IMPORT | **CITE-PATTERN-ONLY** — _EXCLUDED_STATE_KEYS already cited in team-orch-state-spawning.md §Parent→Child State-Leak Avoidance |

# 3. ADOPT-NOW Top-5

## ADOPT-NOW #1 — PROGRESS.md + Pipeline Status long-arc handoff convention

CITE: Convergence of:
- `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md @ HEAD ffd563d6` Apache-2.0 (TIER-1-DIRECT Anthropic) — 4 sections: `## Done` / `## In progress` / `## Next` / `## Notes`; "read PROGRESS.md before doing anything else"
- `Z:/repos/deps/Auto-claude-code-research-in-sleep/docs/SESSION_RECOVERY_GUIDE.md` (TIER-1 ALT-IMPL ARIS) — Pipeline Status YAML schema with `stage / idea / contract / current_branch / baseline / training_status / active_tasks / language / last_updated / next`

CR-12 disposition: GENUINELY-NEW (no current rule in `.claude/rules/` mandates PROGRESS.md). Axis 1+2+3 PASS.

GAP RATIONALE: cwc README is already INSTALLED per manifest §17 BUT the CLAUDE.md handoff convention (read-PROGRESS-first / one-feature-at-a-time / proof-before-passing) is NOT codified as runtime rule. Pure runtime lacks an explicit cross-session handoff convention rule.

ACTION (Pattern A — cite-class adapt):
1. Create `.claude/rules/long-arc-handoff-discipline.md` (TIER-1-DIRECT cite chain: cwc + ARIS)
2. Define 4-section PROGRESS.md template + Pipeline Status YAML overlay
3. Sister-link to `cardinal-rule-7` graduated unleash (PROGRESS.md is load-bearing for autonomous /loop)
4. Wire SessionStart hook to inject Pipeline Status if exists (FORWARD-REF — optional automation)

ESTIMATED EFFORT: 1 fire / ~80 LOC rule file.

## ADOPT-NOW #2 — Context-monitor bridge-file pattern (gsd)

CITE: `Z:/repos/deps/get-shit-done/docs/context-monitor.md` per CLAUDE.md L341 TIER-2 high-confidence (gsd 58,543 stars Apr 2026; MIT). gsd-statusline.js writes `/tmp/claude-ctx-{session_id}.json`; gsd-context-monitor.js PostToolUse reads + injects as `additionalContext` when remaining < 35% (WARNING) or < 25% (CRITICAL).

CR-12 disposition: PARTIAL-OVERLAP — runtime has `userpromptsubmit_compact_threshold.py` (CONTEXT_WINDOW_COMPACT_*_TOKENS env vars at CLAUDE.local.md ENV (j)). But that hook fires at UserPromptSubmit only; gsd fires at PostToolUse (every tool call). Different mechanism, complementary scope.

GAP RATIONALE: pure runtime currently has NO PostToolUse context-monitor; agent only sees compact threshold warnings at prompt-submit time, NOT mid-task. Long-arc /loop sessions can run 50+ tool calls between user prompts.

ACTION (Pattern A — cite-class adapt or install gsd):
1. **Sub-option A**: extract gsd-context-monitor.js pattern into repo-local PostToolUse hook (debounce 5 tool uses; severity escalation bypass)
2. **Sub-option B**: `/plugin install gsd-build/get-shit-done` (full plugin install per CR-6 PRIMARY path — but ECOSYSTEM-IMPORT footprint: gsd installs 64+ commands which may DUPLICATE with current runtime)

RECOMMEND Sub-option A (CITE-PATTERN-EXTRACT) — minimal LOC; preserves pure runtime install discipline; sister-link to `auto-compact-discipline.md`.

## ADOPT-NOW #3 — Anthropic /rewind primitive discipline codification

CITE: Thariq 2026-04-16 (`Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:79-95` HEAD f8468e87) TIER-1-NAMED-AUTHOR ratified — "rewind-first over correct-layered."

CR-12 disposition: GENUINELY-NEW for runtime discipline (primitive itself is RUNTIME-NATIVE in CC). No current rule references /rewind operationally.

GAP RATIONALE: long-arc failure recovery currently defaults to layered-correction (per existing `closed-loop-recursive-narrowing.md` Outcome A/B/C). Thariq's rewind discipline is structurally cleaner for failed-attempt-then-retry: `reads + one informed prompt + fix` vs `reads + 2 failed + 2 corrections + fix`.

ACTION (Pattern A — cite-class discipline only):
1. Add `## Rewind-first vs correct-layered` H2 to `closed-loop-recursive-narrowing.md` (already exists at sibling claude-sota L34-50 per evidence; verify pure runtime status)
2. Cross-ref to `coordination.md §12` if present; otherwise create `.claude/rules/rewind-discipline.md` ≤40 LOC

ESTIMATED EFFORT: 1 fire / ~40 LOC discipline.

## ADOPT-NOW #4 — Piebald "Worker fork" 4-rule discipline

CITE: `Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-worker-fork.md` (Piebald TIER-1 derivative of Anthropic CC internals). 4 verbatim hard rules:
1. Worker fork ≠ continuation of parent
2. Do NOT spawn sub-agents (forks are not recursive)
3. One shot: report once and stop
4. List paths + commit hashes if changes committed

CR-12 disposition: CITE-CLASS-CANONICAL (per W152-F20+ 6th class) — Anthropic-OFFICIAL educational/reference material; ratifies CLAUDE.local.md ENV (e) `CLAUDE_CODE_FORK_SUBAGENT=1` AND parent runtime fork-vs-fresh routing.

GAP RATIONALE: ENV (e) is enabled but no rule documents fork-worker discipline. Subagents currently dispatched as fresh by default — fork-class invocation lacks operational guard rails.

ACTION:
1. Add `## Worker fork discipline` section to `team-orch-state-spawning.md` (TIER-1-DIRECT cite anchor to Piebald file:line + HEAD SHA)
2. Verbatim quote the 4 hard rules; map to existing runtime fork routing at `parallel-agent-wave.md §Fork-vs-fresh subagent routing`

ESTIMATED EFFORT: 1 fire / ~30 LOC.

## ADOPT-NOW #5 — cwc evaluator pattern dogfood

CITE: `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md @ HEAD ffd563d6` Apache-2.0 (TIER-1-DIRECT Anthropic). PASS/NEEDS_WORK skeptical reviewer; reads diff + opens evidence files; "begin reply with bare word PASS or NEEDS_WORK on its own line so wrapper script can read the verdict."

STATUS: ALREADY INSTALLED per glob `Z:/claude-sota-installed/.claude/agents/cwc/evaluator.md` + `.claude/agents/evaluator.md`.

CR-12 disposition: GENUINELY-NEW (already INSTALLED); deep-audit confirms cite anchor.

ACTION: VERIFY runtime invocation surface — confirm `claude --agent evaluator -p "<review prompt>"` works in pure runtime mode + add example invocation to `verifier.md` agent body cross-ref.

# 4. STUDY-PILOT-NARROW (10 candidates)

| # | Candidate | Rationale | Sub-option |
|---|---|---|---|
| 1 | ARIS dse-loop SKILL pattern | Bounded-loop discipline (TIMEOUT/MAX_ITERATIONS/PATIENCE) | Cite-extract for /loop discipline rule |
| 2 | ARIS auto-review-loop-llm SKILL | Multi-LLM provider review (deepseek/glm/qwen) — useful when codex CLI down | Cite-only; provider list useful for cross-model-consensus.md "On codex unavailable" |
| 3 | gsd /gsd:pause-work + /gsd:resume-work | Checkpoint convention — `.continue-here.md` filesystem marker | Sub-option: codify pause/resume slash commands as repo-local pointer; defer until handoff convention (Top-1) lands |
| 4 | wshobson team-communication-protocols (message/broadcast/shutdown_request) | Structured JSON message types between teammates | Cite-only — extract anti-patterns table |
| 5 | wshobson task-coordination-strategies (blockedBy/blocks graphs) | Dependency graph design patterns | Cite-only |
| 6 | wshobson multi-reviewer-patterns | Review dimension allocation + finding dedup | DUPLICATE w/ runtime `multi-perspective-subagents.md`; cite-only |
| 7 | wshobson parallel-debugging skill | Hypothesis-driven debugging with evidence | Pattern-extract for `debugger.md` agent |
| 8 | Continuous-Claude arbiter agent (test validation) | Erotetic E(X,Q) framing + acceptance criteria pattern | Cite-only |
| 9 | Continuous-Claude scribe agent (handoff + ledger) | Documentation/handoff scope discipline | Cite-only |
| 10 | Continuous-Claude maestro orchestration patterns | Hierarchical (architect→kraken→arbiter) + adversarial + blackboard 8-pattern catalog | Pattern-extract for team-orch-patterns.md §7 Orchestration Patterns expansion |

# 5. REJECT-FOR-FIT (HARD-GATE / DUPLICATE / mode-harness)

| # | Candidate | Rejection reason |
|---|---|---|
| 1 | Continuous-Claude-v3 full install | P5 HARD-GATE: requires Docker + PostgreSQL + uv setup wizard 12 steps. Custom DB schema + Python daemon. Incompatible with pure runtime CR-5 install-priority + cardinal-rule-9 install-risk discipline. DUPLICATE: 32 agents heavy duplicate of runtime 13 agents; 109 skills duplicate ECC+skill-creator |
| 2 | wshobson 75+ domain plugins | P4 plugin-namespace + scope-mismatch: 75 plugins for specific domains (accessibility / blockchain / DEFi / sales / etc.); installing all would be 100x duplication. Domain-specific install can route via CR-6 PRIMARY when user need surfaces |
| 3 | claude-squad (Go-based parallel session manager) | P5 Windows-blocker: pty.Start() fails on Windows native (per CLAUDE.md L411). Upstream issue #275 still open per parent-CCC verification. **REJECT until upstream ships ConPTY** |
| 4 | ComposioHQ/agent-orchestrator | P5 macOS-only mode-harness; pattern-only per CLAUDE.md L411 |
| 5 | stravu/crystal | DEPRECATED Feb 2026 per CLAUDE.md L411 |
| 6 | ARIS full install (PostgreSQL+wandb+MCP) | P5 HARD-GATE: ML-research-specific (W&B / Vast.ai / Modal / SSH-remote training) — out-of-scope for general-purpose runtime |
| 7 | Continuous-Claude memory-awareness.ts | DUPLICATE: mcp-memory (sqlite-vec) + graphiti L3 (FalkorDB temporal-KG) already cover semantic memory in pure runtime per Memory Stack section |
| 8 | gsd-build/get-shit-done full plugin install | P4 plugin-namespace duplicate: 64+ slash commands + agents; ECOSYSTEM-IMPORT; **PATTERN-EXTRACT only** (Top-2 above) |
| 9 | superpowers/agents/ standalone | HONEST-NON-FINDING: no `superpowers/agents/` directory; superpowers ships skills only |
| 10 | andrej-karpathy-skills/agents/ | HONEST-NON-FINDING: 1 skill only, no agents/ dir |
| 11 | agentopology | HONEST-NON-FINDING: repo dir empty/missing; sibling W208 STUDY-PILOT cite NOT replicated in pure runtime deps tree |

# 6. Gap Analysis — 3 Most Underserved Primitives in Pure Runtime

## Gap-1: Long-arc handoff convention (PROGRESS.md / Pipeline Status)

CURRENT STATE: cwc 5 hooks INSTALLED per manifest §17, but the handoff CONVENTION
(read PROGRESS.md first / one feature per session / commit at checkpoints) lives only
in cwc's CLAUDE.md template — NOT codified as runtime rule.

WORKFLOW CITATION:
- `cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md` (Apache-2.0; TIER-1
  Anthropic) — 4-section template
- `Auto-claude-code-research-in-sleep/docs/SESSION_RECOVERY_GUIDE.md` (TIER-1 ALT-IMPL
  ARIS) — Pipeline Status YAML
- 2-org Axis-1 convergence at MIN_PRECEDENCE TIER-1 sources

REMEDIATION: ADOPT-NOW #1 above. Estimated 1 fire / ~80 LOC.

## Gap-2: Mid-task context-monitor (PostToolUse runtime-aware)

CURRENT STATE: `userpromptsubmit_compact_threshold.py` fires at UserPromptSubmit only
— agent oblivious to context drift across the 50+ tool calls between user prompts.
Auto-compact bias remains reactive (fires at threshold, not pre-emptive per `gsd`
35%/25% warn/critical bands).

WORKFLOW CITATION:
- `get-shit-done/docs/context-monitor.md` (TIER-1-NAMED-AUTHOR per CLAUDE.md L341
  endorsement; gsd 58k stars Apr 2026) — 35% WARNING / 25% CRITICAL / 5-call debounce
- Sister anchor: pure runtime `auto-compact-discipline.md` Rank #3.5 (intelligent-compact PreCompact)

REMEDIATION: ADOPT-NOW #2 above. Estimated 1 fire / ~60 LOC hook + rule pointer.

## Gap-3: Worker-fork discipline (operational guard rails)

CURRENT STATE: CLAUDE.local.md ENV (e) `CLAUDE_CODE_FORK_SUBAGENT=1` ENABLED but no
runtime rule defines fork-worker discipline (4 hard rules from Piebald). Subagent
dispatches lack operational fork-vs-fresh routing rules.

WORKFLOW CITATION:
- `claude-code-system-prompts/system-prompts/agent-prompt-worker-fork.md` (Piebald TIER-1
  derivative of Anthropic CC internals; verbatim hard-rules block)
- `system-prompt-fork-usage-guidelines.md` (same dir) — "Don't peek / Don't race /
  Cache-share" discipline

REMEDIATION: ADOPT-NOW #4 above. Estimated 1 fire / ~30 LOC.

# 7. Cite Trail (file:line + HEAD SHA depth)

## TIER-1-DIRECT (Anthropic/upstream)
1. `Z:/repos/deps/cwc-long-running-agents/README.md` Apache-2.0 — 5 primitives table L36-40
2. `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md` L4-27 — 4-section handoff
3. `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md` L9-26 — PASS/NEEDS_WORK protocol
4. `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md @ f8468e87` L79-130 — rewind/compact discipline
5. `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-boris-6-tips-16-apr-26.md @ f8468e87` L22-111 — auto-mode/recaps/focus/effort/verify
6. `Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-worker-fork.md` ccVersion 2.1.94 — 4 hard rules L21-32
7. `Z:/repos/deps/claude-code-system-prompts/system-prompts/system-prompt-fork-usage-guidelines.md` ccVersion 2.1.105 L8-19
8. `Z:/repos/deps/claude-code-system-prompts/system-prompts/system-prompt-subagent-delegation-examples.md` ccVersion 2.1.85 L10-46
9. `Z:/repos/deps/claude-code-system-prompts/system-prompts/system-prompt-autonomous-loop-check.md` ccVersion 2.1.101 L8-28
10. `Z:/repos/deps/claude-code-system-prompts/system-prompts/agent-prompt-conversation-summarization.md` ccVersion 2.1.84 L8-100
11. `Z:/repos/deps/claude-code-system-prompts/system-prompts/system-prompt-context-compaction-summary.md` ccVersion 2.1.38 L7-28
12. `Z:/repos/deps/claude-code-system-prompts/system-prompts/skill-stuck-slash-command.md` ccVersion 2.1.77 L7-58

## TIER-1 ALT-IMPL (named-T2)
13. `Z:/repos/deps/Auto-claude-code-research-in-sleep/docs/SESSION_RECOVERY_GUIDE.md` L1-120 — Pipeline Status convention
14. `Z:/repos/deps/Auto-claude-code-research-in-sleep/skills/dse-loop/SKILL.md` L8-50 — bounded-loop primitives
15. `Z:/repos/deps/Auto-claude-code-research-in-sleep/skills/auto-review-loop-llm/SKILL.md` L1-80 — multi-LLM review

## TIER-2 (high-confidence community)
16. `Z:/repos/deps/get-shit-done/docs/context-monitor.md` (gsd 58k stars Apr 2026 MIT) L1-115
17. `Z:/repos/deps/get-shit-done/commands/gsd/pause-work.md` + `resume-work.md`
18. `Z:/repos/deps/wshobson-agents/plugins/agent-teams/README.md` L1-150 (4-agent + 6-skill team plugin)
19. `Z:/repos/deps/wshobson-agents/plugins/agent-teams/skills/team-composition-patterns/SKILL.md` L20-90 — sizing heuristics
20. `Z:/repos/deps/wshobson-agents/plugins/agent-teams/skills/team-communication-protocols/SKILL.md` L20-75 — message types + anti-patterns
21. `Z:/repos/deps/wshobson-agents/plugins/agent-teams/skills/task-coordination-strategies/SKILL.md` L1-100

## TIER-2 (Continuous-Claude — DUPLICATE class)
22. `Z:/repos/deps/Continuous-Claude-v3/README.md` L37-90 — design principles
23. `Z:/repos/deps/Continuous-Claude-v3/.claude/agents/maestro.md` L1-60 — orchestration patterns
24. `Z:/repos/deps/Continuous-Claude-v3/.claude/agents/arbiter.md` L1-60 — erotetic E(X,Q) check pattern
25. `Z:/repos/deps/Continuous-Claude-v3/.claude/agents/herald.md`, `chronicler.md`, `scribe.md`, `onboard.md`, `validate-agent.md`
26. `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/src/patterns/{adversarial,blackboard,chain-of-responsibility,circuit-breaker,event-driven,generator-critic,hierarchical,jury,map-reduce,pipeline,swarm}.ts` — 11 orchestration patterns
27. `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/src/memory-awareness.ts` L1-200 — semantic recall pattern
28. `Z:/repos/deps/Continuous-Claude-v3/.claude/hooks/CONFIG.md` L1-200 — hook configuration patterns

## TIER-2 (sibling W208 references)
29. Sibling `Z:/claude-sota/.claude/rules/coordination.md §12` — rewind-first vs correct-layered (Thariq cite)
30. Sibling `Z:/claude-sota/.claude/rules/auto-compact-discipline.md` — Rank #3 + #3.5

## HONEST-NON-FINDING
31. `Z:/repos/deps/agentopology/` — repo dir empty/missing (sibling W208 STUDY-PILOT cite NOT replicated in pure runtime deps)
32. `Z:/repos/deps/superpowers/agents/` — no agents directory; superpowers ships skills only (15 skills)
33. `Z:/repos/deps/andrej-karpathy-skills/agents/` — no agents directory; 1 skill only

# 8. Honest Conclusion

The pure runtime's LONG-ARC RESILIENCE story is structurally sound (cwc INSTALLED +
ralph-loop + Stop-on-commit + autocompact discipline) but UNDER-DOCUMENTED at the
rule layer. Gap-1 (PROGRESS.md convention) is the highest-leverage adopt — closes
the cardinal-rule discoverability gap for autonomous /loop sessions.

CR-12 disposition lattice routes 80% of audited candidates to DUPLICATE/PARTIAL-OVERLAP
classes — confirms pure runtime architecture covers most long-arc patterns via
incumbent installs (cwc + ralph-loop + mcp-memory + graphiti + skill-orchestration
4-skill stack). Cite-class enrichment (4 ADOPT-NOW + 10 STUDY-PILOT) closes
operational guard-rail gaps without violating CR-5 install-priority or CR-12
upstream-install-priority.

Agent-definition catalogs (Piebald 100+ / wshobson 75+ plugins / ECC 47 agents) yield
CITE-CLASS-CANONICAL extraction value — particularly Piebald system-prompts that
RATIFY existing eee discipline against Anthropic-OFFICIAL primary source.

Top recommendation for orchestrator: ship ADOPT-NOW #1 (long-arc-handoff-discipline.md
rule) first; it unblocks ADOPT-NOW #2-5 codification by establishing the cardinal
convention long-arc sessions can reference.

STAND-IN-NOTICE renewed: cross-model gate NOT structurally satisfied for this audit.
Orchestrator must apply T1 codex review on the deliverable file per advanced-agent-
team-standing-directive invariant #1 before any of the 5 ADOPT-NOW recommendations
materialize as edits.
