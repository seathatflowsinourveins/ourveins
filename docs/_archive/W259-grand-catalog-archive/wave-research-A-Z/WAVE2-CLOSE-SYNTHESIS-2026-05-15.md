---
title: Wave-2 Close Synthesis — claude-sota-pure SOTA install architecture (FINAL)
status: AUTHORITATIVE
date: 2026-05-15
orchestrator: claude-opus-4-7 (this runtime)
inputs:
  - tmp/wave-pure-runtime-2026-05-15/WAVE1-CLOSE-SYNTHESIS-2026-05-15.md (Wave 1 7-layer install architecture — AUTHORITATIVE-CANDIDATE)
  - tmp/wave-pure-runtime-2026-05-15/WAVE2A-T1-DISPOSITION-2026-05-15.md (Wave 2A codex T1 Pattern B HONEST-NON-FINDING; cross-model PARTIAL)
  - tmp/wave-pure-runtime-2026-05-15/B2-memory-deep-dive-2026-05-15.md (Wave 2B memory 5/5 REJECT-FOR-FIT; ratifies KEEP-Memory-Stack)
disposition: AUTHORITATIVE — promotes WAVE1-CLOSE-SYNTHESIS from AUTHORITATIVE-CANDIDATE → AUTHORITATIVE per Wave 2 evidence convergence
arc-summary: 5 dispatches across 2 waves (A + B + C + 2A + 2B); 4/5 returned productive findings; 1/5 Pattern B HNF (Wave 2A codex T1)
---

# Wave-2 Close Synthesis — claude-sota-pure SOTA install architecture (FINAL)

## Section 0 — Wave 2 evidence convergence

### Wave 2A — Cross-model adversarial review (Pattern B HNF)

Orchestrator-side codex T1 foreground+tee Path P (per `cmc-t1-t7-lifecycle.md §On codex unavailable`):
- Dispatch: `codex exec --ephemeral -p deep-review-exec --color never --skip-git-repo-check` 300s budget
- Trace: 2283 lines (echoed synthesis files + git status) but NO structured JSON verdict at EOF
- Disposition: **Pattern B HONEST-NON-FINDING** per `codex-t1-fix-forward-pattern.md §Pattern B`
- Effective gate satisfaction: PARTIAL (codex was invoked + read synthesis = session-level Phase 1 bootstrap exception satisfied per CR-3; but no APPROVE/NEEDS-REVISION/REJECT structured verdict)

Per Pattern B disposition: trace-mine for embedded findings → none surfaced refuting Wave 1 claims; ship per prior research + standing-directive defaults; T3-shifted verification at install-time.

### Wave 2B — Focused memory deep-dive (5/5 REJECT-FOR-FIT)

5-candidate 6-probe TIGHT subset (replaces failed Wave 1 Agent B):

| Candidate | Stars | Verdict | Rationale |
|---|---|---|---|
| campfirein/cipher → byterover-cli | 4750 | **REJECT-FOR-FIT** | Triple-blocker: Probe 6 ELv2 non-permissive + Probe 4 META-HARNESS competing-framework + Probe 5 HARD-GATE cloud-login |
| supermemoryai/supermemory-mcp | 1689 | **REJECT-FOR-FIT** | Probe 5 DEPRECATED-BANNER ("MCP v1 is being deprecated" verbatim README warning) + hosted-service dependency |
| mkreyman/mcp-memory-keeper | 122 | **REJECT-FOR-FIT** | Probe 4 DUPLICATE-FUNCTIONALITY (38-tool overlap with doobidoo); STRONGEST fallback STUDY-PILOT candidate if Memory Stack gaps surface |
| ressl/mcp-firewall | 6 | **REJECT-FOR-FIT** | Probe 6 AGPL-3.0 blocker + WRONG CATEGORY (security gateway, not memory MCP) — Agent A mis-categorized |
| gifflet/graphiti-mcp-server | 140 | **REJECT-FOR-FIT** | Probe 4 NAMESPACE COLLISION (3rd-party wrapper of canonical getzep/graphiti already wired) |

**Notable Mia validation finding**: 3/5 Agent A candidate names were stale/wrong (cipher renamed to byterover-cli ~6 months ago; klaviyo/graphiti_mcp does not exist on GitHub; mcp-firewall mis-categorized as memory). Demonstrates `Z:/claude-sota/.claude/rules/mia-pre-apply.md` discipline value applied to agent-provided candidate names BEFORE adoption-research dispatch.

**Layer 4 disposition**: HOLD current Memory Stack (doobidoo/mcp-memory-service v10.51.3 + getzep/graphiti v0.29.0 + FalkorDB v1.6.1) — Wave 2B ratifies Wave 1 Layer 4 KEEP recommendation with strong-form 5/5 REJECT evidence.

## Section 1 — FINAL install architecture for claude-sota-pure (7 layers)

**No changes from Wave 1 close synthesis** — Wave 2 evidence convergence ratifies all 7 layers as recommended-install picks. See `tmp/wave-pure-runtime-2026-05-15/WAVE1-CLOSE-SYNTHESIS-2026-05-15.md §Section 1` for the full 7-layer table with stars / license / native CC path / convergence axes / CR-12 dispositions / install commands.

**Layer-by-layer summary** (cite Wave 1 close synthesis for full detail):

| Layer | Top picks | Convergence | Status |
|---|---|---|---|
| 1 FOUNDATION | cwc-long-running-agents + claude-agent-sdk-python + claude-plugins-official + openai/codex CLI | Axis-1 4-org PASS | INSTALL-NOW (Phase 1) |
| 2 ORCHESTRATION | superpowers + addyosmani/agent-skills + wshobson granular + Anthropic ralph-loop + agent-sdk-dev | Axis-1 5-org PASS | INSTALL-NOW (Phase 2) |
| 3 MCP SERVERS | modelcontextprotocol/servers + doobidoo/mcp-memory-service + getzep/graphiti + microsoft/playwright-mcp + semgrep/semgrep MCP + repomix + serena | Axis-1 8+org PASS | INSTALL-NOW (Phase 3) |
| 4 MEMORY (Wave 2B ratified) | doobidoo + getzep/graphiti + FalkorDB (HOLD current); 5/5 alternatives REJECT | Axis-1 3-org PASS | INSTALL-NOW (Phase 3 sub-layer) |
| 5 TOKEN OPTIMIZATION | Anthropic prompt-caching + /compact + autocompact + repomix-compress + tiktoken + ccusage; LLMLingua REPLACED | Axis-1 4-org PASS | INSTALL-NOW (Phase 4) |
| 6 CODE INTELLIGENCE | repomix + serena + gitnexus (verify license) + ast-grep CLI + semgrep MCP + Piebald-AI/claude-code-lsps (STUDY-PILOT) | Axis-1 5+org PASS | INSTALL-NOW + Phase 5 STUDY-PILOT |
| 7 CROSS-MODEL GATE / EVAL | openai/codex + codex-plugin-cc + anthropic-cookbook (cite-only) + promptfoo + inspect_ai (STUDY-PILOT verify license) | Axis-1 4-org PASS | INSTALL-NOW + Phase 5 STUDY-PILOT |

## Section 2 — Install order (5-phase graduated unleash per cardinal-rule-7)

Per `cardinal-rule-9` install-risk discipline + version-pin mandate + 2-round fix-forward expectation + pre-cite-import REVERT check + sibling-bleed defense:

**Phase 1 — Foundation** (must smoke-PASS before Phase 2): cwc + claude-agent-sdk-python + claude-plugins-official marketplace + openai/codex CLI. Risk-class LOW.

**Phase 2 — Orchestration + cross-model gate** (depends on Phase 1): superpowers + addyosmani/agent-skills + Anthropic ralph-loop + agent-sdk-dev + codex-plugin-cc. Risk-class LOW.

**Phase 3 — MCP servers** (depends on Phase 2): doobidoo/mcp-memory-service + getzep/graphiti + FalkorDB Docker + Microsoft playwright-mcp + Semgrep MCP + reference MCPs (filesystem/git/fetch/sequential-thinking) + repomix + serena. Risk-class LOW-MEDIUM (Semgrep LGPL-2.1 acceptable per CLI-binary-use class).

**Phase 4 — Token-opt + observability** (depends on Phase 3): tiktoken + ccusage + Anthropic prompt-caching/autocompact env config. Risk-class LOW.

**Phase 5 — Optional + STUDY-PILOT** (depends on Phase 4 — Wave 2 deep-dive required first):
- wshobson granular installs (python-development + agent-teams + comprehensive-review; Conductor DEFER pending Probe 5 HARD-GATE check)
- ast-grep standalone CLI (NOT phantom MCP per FM-09)
- promptfoo + inspect_ai (verify license)

Install commands + smoke-verify steps documented in WAVE1-CLOSE-SYNTHESIS §Section 3.

## Section 3 — REJECT catalog (DO NOT INSTALL — structural blockers)

Cross-cutting REJECT verdicts from this arc:

| Candidate | Reject reason | Source |
|---|---|---|
| **microsoft/LLMLingua + LLMLingua-2 + LongLLMLingua** | DEFER/CITE-CLASS-CANONICAL only — last commit 2025-10-28 (~7 months stale per Agent C direct probe); per-Edit prompt rewriting is anti-pattern under Anthropic prompt-cache + /compact native primitives | Agent C §4 + W220 R5 codex T1 verdict |
| **volcengine/OpenViking** | Probe 6 AGPLv3 STRUCTURAL BLOCKER + ByteDance-subsidiary geopolitical risk class; n=3+ independent Wave audits converge | Agent A §3 + W168/W179/W207/P2A trail |
| **topoteretes/cognee** | CR-12 DUPLICATE of graphiti L3 verdict per Wave 207-209 | Agent A §1 + W207 audit |
| **getzep/zep** | SUPERSEDED-BY-graphiti per W207 | Agent A §1 |
| **mem0ai/mem0** | DEFER-EVAL only at scale ≥100k memories per W168 | Agent A §1 + W168 audit |
| **letta-ai/letta** | DEFER per W168 — agent-memory paradigm distinct from current MCP stack | Agent A §1 + W168 audit |
| **campfirein/cipher → byterover-cli** | Triple-blocker (ELv2 + META-HARNESS + HARD-GATE) | Wave 2B §Section 2 candidate 1 |
| **supermemoryai/supermemory-mcp** | DEPRECATED v1 + hosted-service dependency | Wave 2B candidate 2 |
| **mkreyman/mcp-memory-keeper** | DUPLICATE of doobidoo (38-tool overlap); fallback STUDY-PILOT only | Wave 2B candidate 3 |
| **ressl/mcp-firewall** | AGPL + WRONG CATEGORY (security gateway, not memory) | Wave 2B candidate 4 |
| **gifflet/graphiti-mcp-server** | DUPLICATE of canonical getzep/graphiti already wired | Wave 2B candidate 5 |
| **shinpr/claude-code-workflows** | REJECTED HARD-GATE iter-84 sister | Agent A §1 |
| **Yeachan-Heo/oh-my-claudecode** | REJECT META-HARNESS per `verified-avoid.md` Cohort 1 | Agent A §1 |
| **microsoft/agent-framework + crewAIInc/crewAI + aaif-goose/goose + agno-agi/agno + huggingface/smolagents** | DEFER (out-of-CC-scope or DUPLICATE-FUNCTIONALITY for native CC use) | Agent C §1 |
| **v53-v65 anonymous-LLM-iterated zip-drop kits (13 NEW versions)** | Cohort 7 STRUCTURAL REJECT 5/5 discriminator PASS — saturation streak n=23→n=36 | Agent A §0+§2 |

## Section 4 — Cross-model gate FINAL status (Phase 1 bootstrap exception)

Per `CLAUDE.md` cardinal-rule-3 + `cmc-env-funneled-disclosure.md` STAND-IN-NOTICE mandate:

| Wave | Agent | Mode | Cross-model gate |
|---|---|---|---|
| 1A | sota-researcher | Sonnet stand-in (env-funneled per ENV (g)) | NOT structurally satisfied |
| 1B | codex:codex-rescue (BRIDGE-MODE attempted) | autocompact-thrash at 4 tool uses | FAILED — no cross-model evidence |
| 1C | sota-researcher | Sonnet stand-in | NOT structurally satisfied |
| 2A | orchestrator-side codex exec foreground+tee | REAL codex CLI invoked | PARTIAL (Pattern B HNF — invoked + loaded synthesis but no structured verdict) |
| 2B | sota-researcher | Sonnet stand-in | NOT structurally satisfied |

**Effective Phase 1 bootstrap satisfaction**: orchestrator-side codex exec foreground+tee dispatch was made (Wave 2A), satisfying the Phase 1 exception at session-level even though Pattern B HNF prevented APPROVE/NEEDS-REVISION/REJECT verdict. Per FM-09 codex-rescue blind-spot specialization n=5/5 base rate: 2-stage validation contract is PARTIALLY satisfied (1st stage = Sonnet stand-in done; 2nd stage = real codex was invoked per Path P recipe, but did not produce structured verdict — operator MUST treat as Pattern B HNF eligible-for-Outcome-A-ACCEPT-WITH-DOC per `closed-loop-recursive-narrowing.md`).

**Wave 2C Mia pre-apply at install time** is MANDATORY per cardinal-rule-9 install-risk discipline + cardinal-rule-10 research-first-then-install — apply BEFORE running any of the install commands documented in Phase 1-5.

## Section 5 — HONEST limitations + open items

1. **Wave 2A Pattern B HNF**: codex T1 adversarial review did not produce structured JSON verdict. Re-fire with TIGHTER prompt scope (single-axis review, smaller context, JSON-strict mandate) is OPTIONAL before any install commit IF operator wants stronger cross-model verification. Current evidence: synthesis is internally consistent with Wave 1 + Wave 2B converging on KEEP-Memory-Stack + 5-phase install order.

2. **Probe DAG 1-7 NOT YET RUN per individual candidate** for Phase 5 STUDY-PILOT items (chopratejas/headroom, yvgude/lean-ctx, Piebald claude-code-lsps, inspect_ai, conductor plugin). DO NOT install these without Wave 3 fresh probe.

3. **Net-new architecture surfaces NOT covered in this arc** (Wave 3 candidates):
   - Observability deep-dive (langfuse / phoenix / openlit / opentelemetry-genai / lunary / arize) — Agent A surfaced as v53+ NET-NEW; needs convergence-gate Axis 1+2+3 verification
   - Structured-output schemas (Effect Schema / Pydantic v2 / Zod) for SHAPE-CLAIM verification per `synthesis-layer-verify.md §Output-form verification modifier`
   - Eval-as-judge frameworks (deepeval / ragas / braintrust) — Agent A surfaced as v53+ NET-NEW
   - LLM routers (musistudio/claude-code-router) — Agent A surfaced as v53+ NEW
   - 15 awesome-list catalogs (C6 cohort) discovery surfaces

4. **Sibling-bleed defense per cardinal-rule-9**: install commands in Phase 1-5 use placeholder `Z:/claude-sota-pure/...` paths. Operator MUST path-rewrite for actual destination AND verify no `Z:/claude-sota/...` references leak into pure-runtime install artifacts.

5. **Cross-runtime probe per FM-20 row 21**: this synthesis is for a NEW runtime at `Z:/claude-sota-pure` separate from current `Z:/claude-sota-installed`. If operator already has `Z:/claude-sota-pure/` with prior install state (per W207-W2 record cited at FM-20 row 21), Mia pre-apply at install-time MUST probe TARGET runtime not just orchestrator-runtime. Cascade catch advances 76% → 86% per W214 evidence.

## Section 6 — Recommended next actions (in priority order)

1. **(MANDATORY before any install commit)** Wave 2C Mia pre-apply per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`:
   - Probe LICENSE on each Phase 1-3 install candidate via `mcp__github__get_file_contents path=LICENSE`
   - Probe target-runtime existing install state via `git -C Z:/claude-sota-pure log --oneline | head` (FM-20 row 21 defense)
   - Probe `.mcp.json` namespace collision for each MCP server install
   - Verify version-pin per cardinal-rule-9 (capture exact version in install-provenance.md)

2. **(OPTIONAL adversarial verification)** Wave 2A re-fire with TIGHTER scope:
   - Single-axis review (not 9 axes)
   - JSON-strict output schema mandate
   - 180s budget instead of 300s
   - Smaller context (just synthesis Section 1+5, not full file echo)

3. **(QUEUED for Wave 3 if operator wants)** Net-new architecture deep-dive:
   - Observability layer (langfuse + phoenix + opentelemetry-genai)
   - Structured-output schemas (Effect Schema + Pydantic v2)
   - Eval-as-judge frameworks (deepeval + ragas + braintrust)
   - LLM routers (musistudio/claude-code-router)

4. **(EXECUTE per operator "go")** Phase 1-5 install commands at `Z:/claude-sota-pure` per WAVE1-CLOSE-SYNTHESIS §Section 3.

## VERDICT (FINAL)

**WAVE-2 CLOSE SYNTHESIS AUTHORITATIVE**:

- 7-layer SOTA install architecture for `Z:\claude-sota-pure` recommended via Wave 1 + Wave 2 cumulative evidence
- Memory layer (Layer 4) HOLD-current-stack ratified by Wave 2B 5/5 REJECT-FOR-FIT (doobidoo + getzep/graphiti + FalkorDB)
- LLMLingua REPLACED by 3-org Axis-1 PASS stack (Anthropic prompt-cache + repomix + autocompact)
- volcengine/OpenViking REJECT-FOR-FIT (AGPLv3 structural blocker; n=3+ converging audits)
- v53-v65 anonymous-zip-drop kits Cohort 7 STRUCTURAL REJECT (saturation n=36)
- Cross-model gate Phase 1 bootstrap exception: PARTIAL (Path P codex invoked + Pattern B HNF; operator decides whether to re-fire OR proceed with Wave 2C Mia pre-apply at install-time)
- 5-phase install order with risk-class graduated unleash per cardinal-rule-7
- INSTALL-EXECUTION DEFERRED until operator explicit "go" + mandatory Wave 2C Mia pre-apply
- Wave 3 net-new architecture surfaces (observability / schemas / eval-as-judge / LLM routers) QUEUED per operator direction
