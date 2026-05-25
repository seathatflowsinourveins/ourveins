# 99 — Fire 27-A Close Synthesis (openai/openai-agents-python Path P Audit)

> **Verdict**: **STUDY-PILOT-PATTERN-EXTRACT @ codex T1 conf=0.89** (FIRST of this verdict class in Wave 134 series; HIGHEST positive verdict yet)
> **Closed-loop disposition**: pattern-extract first; bounded pilot LATER if quantitative demand emerges
> **🚨 LOAD-BEARING finding**: CR-12 PROVIDER-COMPLEMENT class established — Anthropic SDK PRIMARY + OpenAI SDK ALTERNATIVE (not duplicate)
> **Fire 27-A deliverable**: 5-file folder + pre-screen tracker + atomic commit per FM-02 sub-class (b) defense

## Fire 27-A summary

FIRST Tier-1 NEW-EXTENDED candidate audited under user 2026-05-10 D2+D8 pre-screen mandate. openai/openai-agents-python local HEAD `cf151f91` MIT v0.17.0 (26,150★ + 4,012 forks + created 2025-03-11 + pushed 2026-05-10T23:21Z hours before audit + OpenAI TIER-1-OFFICIAL + 275 test files largest in series).

Path P codex T1 returned **STUDY-PILOT-PATTERN-EXTRACT @ conf=0.89** — strongest positive verdict in Wave 134 NEW-candidate series. NO blockers; 7/7 sub-systems ADMISSIBLE; CR-12 verdict PROVIDER-COMPLEMENT; P7b ELIGIBLE.

## 6 deliverables (~1,000 LOC)

1. `00-tracker.md` (~165 LOC) — framing + Mia D2+D8 pre-screen PASS + 8-axis dims
2. `01-openai-agents-python-anatomy.md` (~180 LOC) — anatomy + 4 Mia OVER preempted + scope tri-furcation
3. `02-probe-dag-application.md` (~200 LOC) — Probe DAG 7/7 PASS-effective + Axis-1+2+3 all PASS + CR-12 PROVIDER-COMPLEMENT
4. `03-codex-t1-verdict.md` (~230 LOC) — verbatim REAL GPT-5.5 + 6 critical contributions + 9 cite-patterns
5. `99-close-synthesis.md` (this file, ~155 LOC) — Fire 27-A close + forward roadmap
6. `docs/install-provenance.md` — Fire 27-A entry appended

PLUS bonus deliverable:
7. `docs/sota-architecture-audit/fire-27-d2-d8-pre-screen-tier1-extended/d2-d8-pre-screen-results.md` (~80 LOC) — pre-screen matrix for 6 candidates (3 PROCEED / 2 DEFER / 1 REJECT phantom)

## Decision matrix (final)

| Decision axis | Outcome |
|---|---|
| Install verdict | **STUDY-PILOT-PATTERN-EXTRACT @ conf=0.89** |
| pip install openai-agents into Z:/venvs/claude (full install) | ❌ NO (preserves Anthropic SDK primary) |
| Replace `.claude/agents/` 12 agents with openai-agents-python Agent class | ❌ NO (different layers; DIFFERENT-LAYER convergence) |
| Replace cwc-long-running-agents with Sandbox-Agents | ❌ NO (PARTIAL convergence; both useful) |
| Pattern-extract Handoff + Tracing + MCP-manager + Sandbox-RunState + Realtime to eee architecture docs | ✅ YES (codex T1 prescribed) |
| Bounded pilot: isolated venv + `openai-agents==0.17.0` pin + Claude tool_use smoke test | YES — gated on quantitative demand emergence |
| Update `team-orchestration.md` cite-trail with 9 NEW file:line refs | ✅ YES — already partial TIER-1 ALT-IMPL; expand precision |

## Why STUDY-PILOT-PATTERN-EXTRACT (new verdict class)

This verdict shape is BETWEEN STUDY-PILOT-NARROW (full SDK install + venv pilot) and CITE-PATTERN-ONLY (cite-only, no extraction):

- Pattern-extraction is JUSTIFIED (9 high-value patterns with file:line precision)
- Full install is NOT JUSTIFIED for eee runtime (Anthropic SDK primary; CR-12 PROVIDER-COMPLEMENT)
- Bounded pilot REMAINS available if quantitative demand emerges
- 7/7 sub-systems ADMISSIBLE leaves all options open

This is OpenAI-canonical reference architecture — extract patterns into eee design without forcing runtime adoption.

## 🚨 Critical architectural insight — CR-12 PROVIDER-COMPLEMENT class established

Cardinal-rule-12 upstream-install-priority previously had 3 dispositions:
1. **GENUINELY-NEW** — install (no Anthropic parallel exists)
2. **DUPLICATE-FUNCTIONALITY** — reject (Anthropic parallel covers it)
3. **PARTIAL-OVERLAP** — case-by-case

Fire 27-A introduces a 4th class:
4. **PROVIDER-COMPLEMENT** — both Anthropic and OpenAI SDKs ship; they cover DIFFERENT SURFACES (Anthropic direct-CC vs OpenAI provider-agnostic); both can coexist; OpenAI = ALTERNATIVE (not PRIMARY)

This formalizes the cross-vendor SDK pattern: when major orgs ship parallel primitives, they may be **complementary not competing**. eee can adopt Anthropic as primary AND extract patterns from OpenAI without violating CR-12.

## 9 cite-pattern-extract candidates with HIGH-precision file:line refs

(Detailed list in `01-openai-agents-python-anatomy.md` and `03-codex-t1-verdict.md`.)

Most operationally valuable for eee:

1. **`agent.py:270,305,322,332,530`** — clean Agent composition with handoffs/guardrails/typed-output
2. **`handoffs/__init__.py:42,86,94,126,142,153,222`** — 7 lines covering Handoff primitive (expands team-orchestration.md TIER-1 ALT-IMPL cite)
3. **`tracing/span_data.py:28,64,98,169,244,426`** — 6 span types (aligns with Ship 14 G-3 Anthropic SDK cite)
4. **`extensions/models/litellm_model.py:435,636,640,642`** — Anthropic tool_use/tool_result ordering fix (CRITICAL for future cross-vendor pilot)
5. **`mcp/server.py:223,528,1091,1212,1347` + `mcp/manager.py:108`** — MCP lifecycle patterns
6. **`run_state.py:184,656,1062`** — durable HITL run-state snapshots (cwc-long-running-agents companion)

The remaining 3 (multi_provider / any_llm_model / realtime) are LOWER priority but documented.

## 6 operator-actionable next steps from codex T1

1. **DO NOT replace** `claude-agent-sdk-python` or `.claude/agents/` with openai-agents-python
2. **Record** Fire 27-A as STUDY-PILOT-PATTERN-EXTRACT with CR-12 class PROVIDER-COMPLEMENT
3. **If pilot fires**: isolated venv + `openai-agents==0.17.0` exact pin + extras only for tested surface
4. **Anthropic smoke test** through LiteLLM/Any-LLM BEFORE Anthropic-backed pilot (verify tool_use/tool_result ordering + structured outputs + tracing + replay safety)
5. **Keep OpenAI tracing disabled** unless OpenAI API key + trace upload explicitly intended
6. **Extract patterns** (handoff + tracing-span + MCP-manager + sandbox-run-state + realtime voice) into eee architecture docs; do NOT wire OpenAI Responses as default model path

## Coverage % update

| Metric | Pre-Fire-27-A | Post-Fire-27-A |
|---|---|---|
| Wave 134 NEW-candidates verified (Fire 24+26+27 series) | 8/14 (57.1%) | **9/14 (64.3%)** |
| Cross-model verified claims | 31 | **32** |
| Path P recipe ladder | n=17/17 | **n=18/18** |
| Verdict shape distribution | 2R / 4C-P / 2S-P / 1H / 0A | **2R / 4C-P / 2S-P / 1 STUDY-PILOT-PATTERN-EXTRACT / 1H / 0A** |
| Mia ladder | n=1742 | **n=1779** (+37) |
| TIER-1-OFFICIAL maintainer cohort | n=0 | **n=1 (NEW)** |
| 7/7 sub-systems ADMISSIBLE cohort | n=0 | **n=1 (NEW)** |
| P7b ELIGIBLE cohort | n=0 | **n=1 (NEW)** |
| CR-12 PROVIDER-COMPLEMENT class | n=0 | **n=1 (NEW)** |
| D2+D8 pre-screen mandate validation | n=0 | **n=1 (NEW — user directive validated)** |
| 100% architecture dim coverage | 8/8 | 8/8 ✅ |

## Cumulative arc Fire 5-27-A (33-fire arc)

27 folders, ~159 files, ~22,400 LOC across 33-fire arc.

Mia ladder n=130 (pre-arc) → **n=1779** (Fire 27-A close) = **+1,649 verifications across 33-fire arc**.

## Forward fire roadmap (post-Fire-27-A)

### REVISED Forward Top-5 (post 7/7 ADMISSIBLE breakthrough)

| Priority | Fire | Subject | Status |
|---|---|---|---|
| 🥇 #1 | W134-F27-B | langchain-ai/langgraph Path P codex T1 audit | D2+D8 PRE-SCREEN PASS; queue ready |
| 🥈 #2 | W134-F27-C | mem0ai/mem0 Path P codex T1 audit | D2+D8 PRE-SCREEN PASS; queue ready |
| 🥉 #3 | W134-F26-A-PILOT | Cisco mcp-scanner Phase 1-4 pilot execution | STRONGEST 0.91; pilot pending |
| #4 | W134-F24-C3 | Task Master Selective MCP Tool-Loading extract | RE-CONFIRMED Fire 23 P0 primitive |
| #5 | W134-F27-A-PATTERN-EXTRACT | openai-agents-python pattern-extract into team-orchestration.md | THIS fire's verdict prescribed |

### Tier 1.5 — Pattern-extract ships (post-codex-T1)

| Fire | Subject |
|---|---|
| W134-F27-A-PATTERN-EXTRACT-A | Update `team-orchestration.md` TIER-1 ALT-IMPL cite-trail with 9 new file:line refs |
| W134-F27-A-PATTERN-EXTRACT-B | Add Anthropic tool_use ordering pattern (litellm_model.py:435,636,640,642) to docs |
| W134-F27-A-PATTERN-EXTRACT-C | Add Handoff 7-line cite expansion to team-orchestration.md |

### Tier 2 — Research-architecture improvement ships

| Fire | Subject |
|---|---|
| W134-F27-RESEARCH-ARCH-A | Codify CR-12 PROVIDER-COMPLEMENT class as 4th disposition in CLAUDE.md cardinal-rule-12 |
| W134-F27-RESEARCH-ARCH-B | Codify D2+D8 pre-screen mandate into research-protocol.md / sota-research-architecture.md |
| W134-F27-RESEARCH-ARCH-C | Codify STUDY-PILOT-PATTERN-EXTRACT verdict class into codex-t1-fix-forward-pattern.md disposition table |

## Closed-loop disposition

Per `closed-loop-recursive-narrowing.md`:
- Fire 27-A is STUDY-PILOT-PATTERN-EXTRACT @ conf=0.89 with 0 prescribed_edits + 9 cite-pattern candidates + 6 operator-actionable next_steps
- No Pattern A apply for INSTALL decision (terminal pattern-extract); pattern-extract ships are SEPARATE Tier-1.5 commits
- Outcome A ACCEPT-WITH-DOC for AUDIT deliverables
- CR-12 PROVIDER-COMPLEMENT class is meta-discipline contribution (formalizes 4th cross-vendor disposition)

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT @ file:line @ HEAD SHA |
| CR-3 cross-model | ✅ REAL GPT-5.5 codex CLI v0.130.0 |
| CR-9 install-risk | ✅ Pattern-extract first; bounded pilot LATER with version pin |
| CR-10 research-first-then-install | ✅ Audit before install decision; pattern-extract is research output |
| CR-11 META-process | ✅ Multi-axis Path P + D2+D8 pre-screen + Probe DAG + 10-D SRA |
| CR-12 upstream-install-priority | ✅ PROVIDER-COMPLEMENT class established (4th disposition) |
| FM-02 sub-class (b) defense | ✅ Atomic git add + commit --only -- pathspec |
| User directive 2026-05-10 (D2+D8 pre-screen) | ✅ MANDATE VALIDATED — first application |
| Row-2 fabrication-test | ✅ PASS (100+ LLMs claim verified via LiteLLM + any-llm docs) |
| Axis-1+2+3 convergence-gate | ✅ ALL PASS (firm 3-org PASS without predicate fallback) |

## Mia ladder advance (Fire 27-A close)

n=1779 → **n=1789** (+10: Fire 27-A close synthesis / decision matrix / 9 cite-patterns + 6 next-steps / CR-12 PROVIDER-COMPLEMENT 4th disposition class established / D2+D8 pre-screen mandate validated as load-bearing / STUDY-PILOT-PATTERN-EXTRACT verdict class added to lattice / coverage 57.1% → 64.3% / 5 NEW cohort class entries / Tier 1.5 + Tier 2 forward ships queued / 33-fire arc cumulative tracking)
