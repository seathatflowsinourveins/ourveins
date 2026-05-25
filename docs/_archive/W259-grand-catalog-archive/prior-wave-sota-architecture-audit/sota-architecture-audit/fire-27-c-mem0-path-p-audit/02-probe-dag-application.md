# 02 — Probe DAG 1-7 Application to mem0ai/mem0

> **Cite anchor**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
> **Cross-model gate**: Path P codex T1 verdict STUDY-PILOT-PATTERN-EXTRACT conf=0.87

## Probe DAG verdicts (codex T1 verbatim)

### Probe 1 — count-OVER

**Codex T1**: `P1_count_over: PASS`

Verified via gh api: 55,329★ / 6,269 forks / 325 open issues. All convergent with reality. Y Combinator S24 backing verified via `https://www.ycombinator.com/companies/mem0`.

### Probe 2 — SDK-vs-CLI surface

**Codex T1**: `P2_sdk_vs_cli: PASS`

- PyPI `mem0ai` v2.0.2 production
- npm `mem0ai` package (TypeScript port)
- CLI tool at `cli/` directory
- REST API server at `server/` directory
- Claude Code plugin at `mem0-plugin/` (self-published)
- 15+ top-level integration directories

### Probe 3 — architectural-API

**Codex T1**: `P3_arch_api: PASS`

- Provider-agnostic via LiteLLM + direct provider adapters
- Anthropic Claude DIRECT-SUPPORTED for text generation BUT tool_use parsing KNOWN-BROKEN
- 20+ vector store backends (optional)
- Multi-LLM support (8+ providers)

### Probe 4 — plugin-namespace (NEUTRAL — PARTIAL overlap)

**Codex T1**: `P4_plugin_namespace: NEUTRAL`

| eee primitive | Convergence | Note |
|---|---|---|
| `graphiti` (temporal-KG) | **PARTIAL** | Different mechanism — mem0 fact-extraction vs graphiti temporal-KG |
| `mcp-memory` (sqlite_vec) | **PARTIAL** | Similar layer — both agent memory; mem0 cloud-routed, mcp-memory local |
| Combined 3-layer memory stack | **PARTIAL** | Overlapping function, distinct mechanisms |
| eee Claude Code plugins | **DIFFERENT-LAYER** | mem0-plugin is community-marketplace, distinct from Anthropic-official plugin layer |

NEUTRAL because: PARTIAL overlap at memory layer but DIFFERENT MECHANISM (fact-extraction vs temporal-KG vs simple sqlite-vec).

### Probe 5 — mode-harness-shape (NEUTRAL)

**Codex T1**: `P5_mode_harness: NEUTRAL`

- Python SDK installable into eee venv: mode-compatible
- Plugin path: community marketplace (CR-6 not-canonical)
- Cloud routing: external dependency (mcp.mem0.ai)
- Anthropic backend tool_use broken: limited eee runtime applicability

NEUTRAL — mode-compatible but with caveats.

### Probe 6 — direct-file/registry blockers (FAIL — multi-cause)

**Codex T1**: `P6_blockers: FAIL`

Codex T1 explicitly FAILED P6 due to multiple blockers:
1. **mem0-plugin SELF-PUBLISHED** (not in Anthropic official marketplace) — CR-6 canonical-channel violation if treated as install candidate
2. **PostHog telemetry** required dep — disable-via-env mitigation needed
3. **Cloud-routed memory** to mcp.mem0.ai — external storage dependency
4. **Anthropic tool_use KNOWN-BROKEN** — critical limitation for eee scenarios
5. **ECOSYSTEM-IMPORT concern** (LangChain in `extras`) — Fire 27-B 5th class candidate
6. **No sqlite-vec backend** — Fire 27-B sqlite-vec CONVERGENT positive does NOT apply

### Probe 7.a — demand-absence (FAIL)

**Codex T1**: `P7a_demand_absence: FAIL`

eee has graphiti + mcp-memory + sqlite_vec backend stack already. mem0 PARTIAL-OVERLAP without genuine new capability for current eee scope.

Codex T1: `novel_capability_for_eee: PARTIAL-OVERLAP`

### Probe 7.b — demand-creates-new-workflow

**Codex T1**: `P7b_demand_creates: NOT-ELIGIBLE`

5-clause check fails on (4) Incumbent comparison — graphiti+mcp-memory + Zep architecture already covers memory mechanism better than mem0 cloud-routing pattern.

## Aggregate Probe DAG verdict

| Probe | Verdict |
|---|---|
| P1 count-OVER | PASS |
| P2 SDK-vs-CLI | PASS |
| P3 arch-API | PASS |
| P4 plugin-namespace | NEUTRAL (PARTIAL overlap) |
| P5 mode-harness | NEUTRAL |
| P6 blockers | **FAIL** (6 distinct concerns) |
| P7a demand-absence | **FAIL** (PARTIAL-OVERLAP with eee memory stack) |
| P7b demand-creates | NOT-ELIGIBLE |

**Score: 3 PASS + 2 NEUTRAL + 2 FAIL + 1 NOT-ELIGIBLE = 3 effective PASS** — middling-positive (LOWER than openai-agents-python's 7/7 effective PASS; SIMILAR to langgraph's 4-5 effective PASS).

## Axis-1+2+3 convergence-gate

| Axis | Threshold | Verdict |
|---|---|---|
| Axis 1 ≥3 distinct T1 orgs | TIER-2 mem0ai + Y Combinator S24 + 10+ contributors + Anthropic-CC-plugin-format (cross-vendor ecosystem) | **PASS** via STRONG-PROVENANCE-EXPRESS |
| Axis 2 ≥2 named T2 practitioners | mem0ai team has 10+ contributors with 60+ commits + YC S24 batch validation | **PASS** |
| Axis 3 ≥3 months stability | 23 months age past 90d burn-in | **PASS** |

**Codex T1**: axis_1_convergence_gate = **PASS**; axis_1_strong_provenance_express_check = **FIRES**

3rd Wave 134 candidate to score Axis-1 firm PASS (after openai-agents-python and langgraph). TIER-2 startup + YC S24 + 55K stars satisfies STRONG-PROVENANCE-EXPRESS for memory dimension per codex T1.

## Row-2 fabrication-test

**Codex T1**: `row2_fabrication_test: PASS`

Numeric claims (55K stars, YC S24 backing) verified via official channels. No fabrication.

## CR-12 cardinal_rule_12_test

**Codex T1 verdict**:
```json
{
  "anthropic_direct_parallel": "NO (Anthropic ships NO comparable first-party memory framework found in claude-plugins-official; mem0 is absent from current official tree)",
  "eee_existing_memory_stack_overlap": "PARTIAL",
  "cr12_class": "PARTIAL-OVERLAP",
  "recommended_disposition": "CITE-PATTERN-ONLY"
}
```

**Codex T1 CR-12 class for mem0**: **PARTIAL-OVERLAP** (3rd CR-12 class, distinct from PROVIDER-COMPLEMENT for openai-agents-python and ECOSYSTEM-IMPORT for langgraph).

## CR-12 lattice expanded post-Fire-27-C

Wave 134 series has now mapped 5 candidates against CR-12 dispositions:

| Fire | Subject | CR-12 class |
|---|---|---|
| Fire 27-A | openai-agents-python | PROVIDER-COMPLEMENT (4th class, established) |
| Fire 27-B | langgraph | ECOSYSTEM-IMPORT (5th class candidate) |
| **Fire 27-C** | **mem0ai/mem0** | **PARTIAL-OVERLAP (3rd class, demonstrated)** |

Plus prior dispositions: DUPLICATE-FUNCTIONALITY (rejection class), GENUINELY-NEW (install class).

## Scope split verdict (codex T1 verbatim)

| Sub-system | Verdict |
|---|---|
| mem0_plugin_v0_1_2 | **ADMISSIBLE** (Claude Code plugin, but self-published Mem0 marketplace) |
| mem0_core_library | **ADMISSIBLE** (Python library, pilot only) |
| openmemory_backend | **INADMISSIBLE** (out-of-scope per Forward Discipline) |
| server_rest_api | **INADMISSIBLE** (out-of-scope) |
| cli_tool | **INADMISSIBLE** (not needed for eee audit) |
| vercel_ai_sdk_integration | **INADMISSIBLE** (NOT-IN-SCOPE) |
| mem0_ts_typescript_port | **INADMISSIBLE** (NOT-IN-SCOPE) |

**2/7 sub-systems ADMISSIBLE** (vs openai-agents-python 7/7 unanimous). Pattern: mem0's multi-platform sprawl creates many INADMISSIBLE sub-systems for eee scope.

## Convergence with existing eee primitives

| eee primitive | Convergence (codex T1) |
|---|---|
| vs_graphiti_temporal_kg | **PARTIAL** (fact-extraction vs temporal-KG mechanism distinction) |
| vs_mcp_memory_sqlite_vec | **PARTIAL** (similar layer, distinct local-vs-cloud routing) |
| vs_combined_3_layer_memory_stack | **PARTIAL** (overlapping function, distinct mechanisms) |
| vs_eee_claude_code_plugins | **DIFFERENT-LAYER** (community-marketplace plugin) |

All convergence dimensions PARTIAL — confirms PARTIAL-OVERLAP CR-12 class.

## Cohort tracking advance

| Cohort | Wave 134 NEW-candidate instances |
|---|---|
| STUDY-PILOT-PATTERN-EXTRACT cohort | n=1 → **n=2** (+mem0) |
| TIER-2 startup STRONG-PROVENANCE-EXPRESS cohort | **n=1 NEW** (mem0ai + YC S24 first-of-kind for memory dimension) |
| Axis-1+2+3 all-PASS firm cohort | n=2 → **n=3** (+mem0) |
| P6 blockers FAIL multi-cause cohort | **n=1 NEW** (mem0 6 distinct blockers including ECOSYSTEM-IMPORT + cloud-routing) |
| Anthropic tool_use KNOWN-BROKEN cohort | **n=1 NEW** (mem0 first-of-kind tool_use parsing limitation) |
| Self-published Claude Code plugin cohort | **n=1 NEW** (mem0-plugin not in Anthropic marketplace) |
| Cloud-routed memory privacy concern cohort | **n=1 NEW** (mcp.mem0.ai external storage) |

## Orchestrator-codex probe convergence

| Probe | Orchestrator pre-audit | Codex T1 | Convergence |
|---|---|---|---|
| P1 | PASS-expected | PASS | CONVERGENT |
| P2 | PASS-expected | PASS | CONVERGENT |
| P3 | NEEDS-VERIFY (Anthropic tool_use) | PASS-with-KNOWN-BROKEN-tool_use | codex resolved + critical caveat |
| P4 | UNCERTAIN (vs eee memory stack) | NEUTRAL (PARTIAL overlap) | codex resolved |
| P5 | UNCERTAIN | NEUTRAL | codex resolved |
| P6 | UNCERTAIN (PostHog + Qdrant + ecosystem) | **FAIL** (6 distinct blockers) | codex stricter + comprehensive |
| P7a | UNCERTAIN (vs graphiti+mcp-memory) | **FAIL** (PARTIAL-OVERLAP) | codex resolved |
| P7b | UNCERTAIN | NOT-ELIGIBLE | codex resolved |
| mem0-plugin marketplace | UNCERTAIN (Anthropic OR self-published?) | **SELF-PUBLISHED VERIFIED** | codex LOAD-BEARING resolution |
| sqlite-vec convergence | EXPECTED (per Fire 27-B) | **NOT SUPPORTED** | codex REFUTED orchestrator assumption |
| Anthropic tool_use | UNCERTAIN | **KNOWN-BROKEN** | codex LOAD-BEARING resolution |

**4/11 convergent + 7/11 codex-resolved-uncertainties + 1/11 codex stricter + 1/11 codex REFUTED orchestrator assumption** — codex T1 contributed extensive resolution. Key load-bearing catches: mem0-plugin SELF-PUBLISHED verification + sqlite-vec NOT SUPPORTED (refutes orchestrator's Fire 27-B convergence assumption).

## Verdict shape: STUDY-PILOT-PATTERN-EXTRACT @ conf=0.87

Codex T1 returned Option D (STUDY-PILOT-PATTERN-EXTRACT) because:
1. mem0-plugin self-published (NOT Anthropic-marketplace canonical)
2. Cloud-routed memory (privacy + external dep concern)
3. Anthropic tool_use KNOWN-BROKEN (critical for eee scenarios)
4. eee already has graphiti + mcp-memory (PARTIAL-OVERLAP)
5. 7 HIGH-VALUE cite-pattern candidates (lifecycle hooks + prompt design + memory pipelines)
6. PostHog disable-via-env mitigation acceptable
7. STRONG-PROVENANCE-EXPRESS fires (TIER-2 + YC S24 + 55K stars + 10+ contributors)

## Mia ladder advance

n=1843 → **n=1856** (+13: full Probe DAG with 3 PASS + 2 NEUTRAL + 2 FAIL + 1 NOT-ELIGIBLE / Axis-1+2+3 firm 3-way PASS / Row-2 PASS / CR-12 PARTIAL-OVERLAP class established (3rd) / 2/7 sub-systems ADMISSIBLE bounded / 4 NEW cohort entries / 4/11 convergent + 7/11 codex-resolved + 1/11 codex REFUTED / 7 LOAD-BEARING findings via codex / Pattern of multi-platform-sprawl rejected by Forward Discipline / cloud-routed memory privacy concern documented / Anthropic tool_use KNOWN-BROKEN first-of-kind catch in Wave 134)
