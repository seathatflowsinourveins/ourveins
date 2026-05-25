# Wave 152 Fire 16 — CITE-ONLY Pattern Extraction (reframed from F14 per FM-02 (c) ACCEPT-ABSORPTION; F14 absorbed by parallel `58c9f44` META-AUDIT close-out; F15 absorbed at `ca856cb` FM-21.b arc-saturation HNF)

# Cite-class (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
# constituents=[
#   TIER-1-DIRECT @ openai/openai-agents-python README.md @ tag v0.17.1 (PyPI 2026-05-09; GitHub 26K★ MIT),
#   TIER-1-DIRECT @ github/spec-kit README.md @ tag v0.8.7 commit 81f772c (95,764★ MIT),
#   TIER-2 @ Z:/claude-sota/.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt (W134 F27-A codex T1 precedent),
#   TIER-2 @ tmp/wave152-f7-v1-sota-researcher-openai-agents-2026-05-11.md (W152 F10 V1 sota-researcher ARTIFACT 28KB),
#   TIER-2 @ tmp/wave152-f11-v1-sota-researcher-spec-kit-2026-05-11.md (W152 F11 V1 sota-researcher ARTIFACT 12.6KB),
#   TIER-3-LOCAL @ orchestrator-side CITE-ONLY adoption synthesis Wave 152 Fire 14
# ]; effective_tier=TIER-3-LOCAL-COMPOSITION (MIN_PRECEDENCE per citation-discipline rule #8)

## Mandate

Consolidate the pattern catalogs from Wave 152 Fire 10 (openai-agents-python ENRICHMENT-AUDIT) + Wave 152 Fire 11 (specify-cli/spec-kit manifest §10 catch-up) V1 sota-researcher ARTIFACTs into a single queryable doc surface for **CITE-ONLY adoption** per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 CR-12 disposition lattice. Patterns are referenced at file:line + HEAD SHA for orchestration-discipline adaptation in eee runtime architecture decisions WITHOUT pip-install of source packages.

**CR-12 5-class lattice disposition** per CLAUDE.md L142+:
- openai-agents-python patterns (#1-#9): PROVIDER-COMPLEMENT (class 4) per Wave 134 Fire 27-A precedent — parallel API surface to incumbent anthropics/claude-agent-sdk-python==0.1.81 PRIMARY-CANONICAL (W152 F6 `45e376b`); CITE-ONLY-DEFER per eee P7.a DEMAND-ABSENCE (zero Python consumer in `.claude/hooks/scripts/`, `scripts/`, `tools/`)
- spec-driven-development pattern (#10): PARTIAL-OVERLAP (class 3) per Wave 152 Fire 11 V3 ADVERSARIAL SAVED-SHIP synthesis — SAME-SCOPE-DIFFERENT-MECHANISM (CLI scaffolder vs Claude-skill methodology); CITE-ONLY-DEFER per W97 Ship 1N init-DEFERRED + V3 HOME/USERPROFILE auth.json routing risk on v0.8.8

## Source artifacts (cite-anchors)

| Source | Cite | Class |
|---|---|---|
| W152 F10 V1 sota-researcher | `tmp/wave152-f7-v1-sota-researcher-openai-agents-2026-05-11.md` 28KB ARTIFACT-INLINE | TIER-2 |
| W152 F11 V1 sota-researcher | `tmp/wave152-f11-v1-sota-researcher-spec-kit-2026-05-11.md` 12.6KB ARTIFACT | TIER-2 |
| W134 F27-A codex T1 precedent | `Z:/claude-sota/.claude/state/codex_consult_w134_f27a_openai_agents_python_OUT.txt` | TIER-2 (cite-import-AMBER per CLAUDE.md §14.5) |
| openai/openai-agents-python README | `https://github.com/openai/openai-agents-python/blob/v0.17.1/README.md` | TIER-1-DIRECT |
| github/spec-kit README | `https://github.com/github/spec-kit/blob/v0.8.7/README.md` | TIER-1-DIRECT |

## 10 patterns CITE-ONLY ADOPTED

### Pattern #1 — Agent composition primitive
**Source**: openai/openai-agents-python README §"Primitives" @ tag v0.17.1; cite verbatim from W152 F10 V1 ARTIFACT L109: "Agents — LLMs configured with instructions, tools, guardrails, handoffs"
**CR-12**: PROVIDER-COMPLEMENT class 4
**Adaptation**: orchestration-discipline reference for multi-agent harness design; complements existing `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` Wave 24-D ≥3-subagents mandate

### Pattern #2 — Handoffs (agent-to-agent delegation)
**Source**: openai/openai-agents-python README @ v0.17.1; W152 F10 V1 ARTIFACT L111: "Agents as tools / Handoffs — delegating to other agents"
**CR-12**: PROVIDER-COMPLEMENT class 4
**Adaptation**: complementary to `Z:/claude-sota/.claude/rules/team-orchestration.md` HANDOFF: slot semantic for inter-agent state-transfer

### Pattern #3 — Tracing taxonomy (built-in agent-run tracking)
**Source**: openai/openai-agents-python README @ v0.17.1; W152 F10 V1 ARTIFACT L116: "Tracing — built-in agent-run tracking"
**CR-12**: PROVIDER-COMPLEMENT class 4
**Adaptation**: pattern reference for Karpathy §5 Wiki Compounding Surface Layer 1 (JSONL audit trail) — orchestrator-side trace primitives without SDK dependency

### Pattern #4 — Multi-provider routing
**Source**: openai/openai-agents-python README @ v0.17.1; W152 F10 V1 ARTIFACT L119: "provider-agnostic, supporting the OpenAI Responses and Chat Completions APIs, as well as 100+ other LLMs"
**CR-12**: PROVIDER-COMPLEMENT class 4 (orthogonal to claude-agent-sdk single-provider CC control plane)
**Adaptation**: future LiteLLM-bridge architecture cite-anchor when operator commits to multi-provider eee pilot

### Pattern #5 — Anthropic ordering fix
**Source**: openai/openai-agents-python release notes @ v0.17.x (Anthropic provider integration); referenced in W152 F10 V1 ARTIFACT pattern enumeration L301
**CR-12**: PROVIDER-COMPLEMENT class 4
**Adaptation**: cite-anchor for Anthropic-provider tool-call ordering edge case; eee currently uses claude-agent-sdk direct so not active

### Pattern #6 — Any-LLM adapter (LiteLLM bridge)
**Source**: openai/openai-agents-python @ v0.17.1 `pyproject.toml` optional `[litellm]` extra; W152 F10 V1 ARTIFACT L301
**CR-12**: PROVIDER-COMPLEMENT class 4
**Adaptation**: complementary to existing `berriai/litellm` LiteLLM proxy port 11700 (manifest §LiteLLM row); CITE-ONLY rationale = no Python consumer yet

### Pattern #7 — MCP manager (programmatic MCP server lifecycle)
**Source**: openai/openai-agents-python README @ v0.17.1; W152 F10 V1 ARTIFACT L112: "Tools — functions, MCP, hosted tools"
**CR-12**: PROVIDER-COMPLEMENT class 4
**Adaptation**: pattern reference for programmatic MCP lifecycle (vs `.mcp.json` static config); pairs with sibling `Z:/claude-sota/.claude/rules/mcp-disconnect-recovery.md` D1-D6 recovery taxonomy

### Pattern #8 — Sandbox HITL (Sandbox Agents long-horizon)
**Source**: openai/openai-agents-python README @ v0.17.1 (since v0.14.0); W152 F10 V1 ARTIFACT L110: "Sandbox Agents — agents preconfigured to work with container for long time horizons"
**CR-12**: PROVIDER-COMPLEMENT class 4 + ECOSYSTEM-IMPORT proximity (Docker dependency)
**Adaptation**: pattern reference for long-horizon workspace agents; complements eee `anthropics/cwc-long-running-agents` install (manifest §17) — different mechanism (Docker container HITL vs CC long-running-agent primitives)

### Pattern #9 — Realtime Agents (voice via gpt-realtime-2)
**Source**: openai/openai-agents-python README @ v0.17.1; W152 F10 V1 ARTIFACT L117: "Realtime Agents — voice agents with `gpt-realtime-2`"
**CR-12**: PROVIDER-COMPLEMENT class 4
**Adaptation**: future voice-agent architecture cite-anchor when operator commits to `[realtime]` extra pilot

### Pattern #10 — Spec-driven-development (CLI scaffolder)
**Source**: github/spec-kit README @ v0.8.7 commit 81f772c; W152 F11 V1 ARTIFACT L34: "ships native `--integration claude`"; W145 V3 STUDY-PILOT-PATTERN-EXTRACT precedent at commit `5e9528d`
**CR-12**: PARTIAL-OVERLAP class 3 (SAME-SCOPE-DIFFERENT-MECHANISM — CLI scaffolder vs Claude-skill methodology)
**Adaptation**: pattern reference for project-init spec-driven workflow scaffolding; complements eee `superpowers:writing-plans` SKILL + `spec-driven-development` SKILL + `planning-and-task-breakdown` SKILL — different layer (CLI project-init vs operator-prompted methodology)
**Re-eligibility specific**: v0.8.8 BUMP DEFERRED per W152 F11 V3 SAVED-SHIP HOME/USERPROFILE auth.json routing risk (new Config-driven opt-in auth registry feat #2393)

## SRA D1-D10 aggregate verdict (CITE-ONLY scope)

Per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` 10-dimension convergence gate; cite-import-AMBER per CLAUDE.md §14.5:

| Dimension | Verdict | Note |
|---|---|---|
| D1 license-use-class | ✅ PASS | both openai-agents-python (MIT) + spec-kit (MIT) permissive at CLI/library use-class |
| D2 freshness | ✅ PASS | openai-agents-python v0.17.1 2026-05-09 (<3d); spec-kit v0.8.7 2026-05-07 (4d) — both ACTIVE |
| D3 fresh-paint vs density | ✅ PASS | both >25K★ + non-squashed git history + organic growth |
| D4 maintainer-provenance | ✅ TIER-1-OFFICIAL | OpenAI org + GitHub OFFICIAL org |
| D5 active-maintenance | ✅ PASS | both 4/4 signals (issue-close + PR-merge + contributors + cadence) |
| D6 use-class compatibility | ✅ PASS (CITE-ONLY) | CITE-ONLY-DEFER eligibility per P7.a DEMAND-ABSENCE; install-class verdict separate (DEFER per W152 F10+F11 V3 SAVED-SHIP) |
| D7 Anthropic-aligned | ✅ PASS | openai-agents-python ships Anthropic provider + spec-kit ships `--integration claude` |
| D8 industry-adoption | ✅ PASS | 26K★ + 95K★ + multi-org adoption signals |
| D9 FM-class | ✅ PASS | no known FM on CITE-ONLY scope (install-class FM-classes pre-recorded in F10+F11 V3 SAVED-SHIP) |
| D10 replacement viability | N/A | no replacement proposed — CITE-ONLY adoption is incumbent-complementary |

**SRA aggregate: 9/10 PASS + D1+D6 critical PASS → STUDY-PILOT-PATTERN-EXTRACT verdict confirmed.** Per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` Convergence Verdict Decision Lattice: 9-10 + D1+D6 PASS = INSTALL-eligible — but install-class verdict is intentionally-DEFERRED to CITE-ONLY scope per:
- openai-agents-python: P7.a DEMAND-ABSENCE (W152 F10 V1+V3 5-voice cumulative DEFER) — re-eligibility trigger = operator commits to named consumer + P7.b 5-clause check passes
- spec-kit v0.8.8: V3 HOME/USERPROFILE auth.json routing risk + chase-latest anti-pattern — re-eligibility trigger = HOME routing verified mitigated + named consumer workflow committed

## Re-eligibility map (per-pattern install triggers)

| Pattern | Install trigger predicate |
|---|---|
| #1+#2 Agent composition + Handoffs | operator commits to multi-agent orchestration via openai-agents Python SDK (currently incumbent claude-agent-sdk + Wave 24-D fan-out covers) |
| #3 Tracing | operator commits to OTel-bridge cross-platform observability beyond existing JSONL audit trail |
| #4+#6 Multi-provider + Any-LLM adapter | operator commits to LiteLLM-pilot (currently single OPENAI_BASE_URL via existing LiteLLM proxy) |
| #5 Anthropic ordering fix | operator hits ordering-bug in production (currently no consumer at risk) |
| #7 MCP manager | operator commits to programmatic MCP lifecycle (currently `.mcp.json` static config + sibling mcp-disconnect-recovery.md D1-D6 recovery suffices) |
| #8 Sandbox HITL | operator commits to long-horizon Docker container HITL workspace agents (complements but doesn't replace existing cwc-long-running-agents install) |
| #9 Realtime Agents | operator commits to voice-agent integration via `gpt-realtime-2` |
| #10 Spec-driven-development | operator runs `specify init <project>` in NEW project dir per W97 1N Phase 2 trigger AND v0.8.8 HOME routing risk verified mitigated AND named consumer workflow committed |

## Cross-references

- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` §Probe 7.a DEMAND-ABSENCE binding (cite-import-AMBER) — load-bearing for CITE-ONLY-DEFER discipline
- `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D1-D10 (cite-import-AMBER) — convergence gate framework
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #6 + #8 (cite-import-AMBER) — TIER-1-NAMED-AUTHOR-QUOTE + composed-claims cite-class lattice
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A (cite-import-AMBER) — single-fix-forward apply at NEEDS-REVISION
- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 — CR-12 5-class lattice (PROVIDER-COMPLEMENT class 4 / PARTIAL-OVERLAP class 3 both exercised here)
- Wave 134 Fire 27-A precedent — STUDY-PILOT-PATTERN-EXTRACT verdict origin (5-class lattice 1st instance)
- Wave 145 V3 STUDY-PILOT-PATTERN-EXTRACT spec-kit precedent
- Wave 152 Fire 10 ENRICHMENT-AUDIT openai-agents 5-voice cumulative DEFER + V3 ECOSYSTEM-IMPORT correction
- Wave 152 Fire 11 manifest §10 catch-up + V3 SAVED-SHIP HOME routing risk

## Update triggers

Re-evaluate this CITE-ONLY pattern catalog when:
- Any pattern's install-trigger predicate fires (named consumer commitment + 5-clause P7.b check passes) → promote that pattern to INSTALL via SOTA discipline + 3-voice convergence + manifest install row
- openai-agents-python ships breaking change (v0.18+) → re-pull cite at file:line per CR-6 freshness gate
- spec-kit ships v0.8.9+ → re-evaluate HOME routing risk; if mitigated + named consumer committed, BUMP install
- W134 Fire 27-A STUDY-PILOT-PATTERN-EXTRACT precedent supersedence emerges → re-classify per new precedent
- New SOTA pattern in either upstream emerges that's CITE-ONLY eligible → append to this catalog

## Cross-model gate satisfaction (CR-3 Phase 1 bootstrap exception)

CITE-ONLY scope is **doc-only forward-only APPEND** per `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` — no install ripple, no behavioral change, no SRA D1-D10 INSTALL-class verdict, no CR-12 ADOPT-NOW. Per CR-3 Phase 1 doc-only carve-out: cross-model gate satisfied via accumulated 6× REAL GPT-5.5 codex T1 dispatches across W152 F6+F10+F11 source ships (manifest §Wave 152 entries). This F14 doc consolidates already-cross-model-verified pattern catalogs; no fresh codex T1 dispatch required for doc-only consolidation per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` §Pattern A admissibility filter (CITE-ONLY ≠ design-surface edit per `codex_t1_consult_gate.py:23-28,104-108,235` _UNIVERSAL_EXCLUSIONS scope).

## Forward path

- W152 F15 candidate: cross-session Mia probe sweep on parallel session commits F4+F5+F5b+F7+F9+F11+F12 for FM-20 path-drift cascade
- W152 F16 candidate: spec-kit v0.8.8 re-evaluation when OPERATOR-TRIGGER fires (HOME routing verified + named consumer workflow committed)
- Wave 153 candidate: token-efficiency deep-dive (rtk-ai/rtk + ccusage + context-mode integration depth)
- Wave 154 candidate: Memory stack L1/L2/L3 health audit + Graphiti live-claude smoke probe (W142.B AMBER pending)

## Verdict

`DONE: 10 patterns (9 openai-agents-python + 1 spec-driven-development) CITE-ONLY ADOPTED per CR-12 PROVIDER-COMPLEMENT + PARTIAL-OVERLAP classes; cite-trail consolidated at file:line + tag-version; SRA 9/10 PASS + D1+D6 critical PASS; install-class verdict intentionally-DEFERRED per W152 F10+F11 V3 SAVED-SHIP catches; re-eligibility map documented for each pattern; cross-model gate satisfied via accumulated 6× REAL GPT-5.5 dispatches in W152 source ships; CR-3 Phase 1 doc-only carve-out applies; W134 Fire 27-A STUDY-PILOT-PATTERN-EXTRACT precedent ratified for both pattern cohorts.`
