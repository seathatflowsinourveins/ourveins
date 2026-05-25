# 03 — Codex T1 Path P Verdict (Cross-Model GPT-5.5 REAL — Fire 27-C)

> **Method**: Path P recipe foreground+tee, ladder n=19 → **n=20 reproducible-clean-verdict**
> **Tokens**: 164,846 codex-side (efficient — Forward Discipline tightened scope from Fire 27-B WORKED)
> **Wall-clock**: ~3m 25s (22:04:14 → 22:07:39 local)
> **Verdict origin**: REAL GPT-5.5 codex CLI v0.130.0
> **Verbatim trace**: `.claude/state/codex_consult_w134_f27c_mem0_OUT.txt` (8,165 LOC)

## Verbatim verdict at EOF

```json
{
  "verdict": "STUDY-PILOT-PATTERN-EXTRACT",
  "confidence": 0.87,
  "summary": "Do not install mem0 into the main eee runtime yet. The repo is active and high-provenance, and the Claude Code plugin is real, but it is self-published by Mem0 rather than present in Anthropic's official marketplace; the plugin also routes memory to Mem0 cloud, while core mem0 overlaps eee's existing graphiti plus mcp-memory stack. Best disposition is to extract lifecycle-hook and additive-memory patterns, with any functional pilot isolated and synthetic-data-only.",
  "mem0_plugin_marketplace_check": {
    "is_anthropic_marketplace_plugin": "NO",
    "plugin_install_path": "self-published Mem0 marketplace: /plugin marketplace add mem0ai/mem0 then /plugin install mem0@mem0-plugins; verified absent from anthropics/claude-plugins-official origin/main 00679aef889efe36bb0389f81d70b6229a2013ee",
    "cr12_install_class": "CITE-PATTERN-ONLY"
  },
  "posthog_telemetry_check": {
    "mandatory_or_optional": "DISABLE-VIA-ENV",
    "privacy_concern_level": "CAVEAT",
    "recommended_mitigation": "For any pip/core pilot, set MEM0_TELEMETRY=false and MEM0_TELEMETRY_SAMPLE_RATE=0 before importing mem0. Evidence: pyproject requires posthog at Z:/repos/deps/mem0/pyproject.toml:20; telemetry defaults true at mem0/memory/telemetry.py:14 and disables PostHog client when false at mem0/memory/telemetry.py:75-76."
  },
  "qdrant_default_backend_check": {
    "qdrant_required_or_swappable": "SWAPPABLE",
    "sqlite_vec_backend_supported": "NO",
    "chromadb_backend_supported": "YES",
    "eee_existing_backend_reuse": "NOT-POSSIBLE"
  },
  "anthropic_claude_llm_check": {
    "anthropic_as_primary_llm": "FULLY-SUPPORTED",
    "tool_use_handling": "KNOWN-BROKEN"
  },
  "probe_dag_verdicts": {
    "P1_count_over": "PASS",
    "P2_sdk_vs_cli": "PASS",
    "P3_arch_api": "PASS",
    "P4_plugin_namespace": "NEUTRAL",
    "P5_mode_harness": "NEUTRAL",
    "P6_blockers": "FAIL",
    "P7a_demand_absence": "FAIL",
    "P7b_demand_creates": "NOT-ELIGIBLE"
  },
  "row2_fabrication_test": "PASS",
  "novel_capability_for_eee": "PARTIAL-OVERLAP",
  "install_footprint_acceptable": "CAVEAT-NOTED",
  "addresses_fire23_p0": "NO",
  "axis_1_convergence_gate": "PASS",
  "cardinal_rule_12_test": {
    "anthropic_direct_parallel": "NO (Anthropic ships NO comparable first-party memory framework found in claude-plugins-official; mem0 is absent from current official tree)",
    "eee_existing_memory_stack_overlap": "PARTIAL",
    "cr12_class": "PARTIAL-OVERLAP",
    "recommended_disposition": "CITE-PATTERN-ONLY"
  },
  "scope_split_verdict": {
    "mem0_plugin_v0_1_2": "ADMISSIBLE (Claude Code plugin, but self-published Mem0 marketplace)",
    "mem0_core_library": "ADMISSIBLE (Python library, pilot only)",
    "openmemory_backend": "INADMISSIBLE",
    "server_rest_api": "INADMISSIBLE",
    "cli_tool": "INADMISSIBLE",
    "vercel_ai_sdk_integration": "INADMISSIBLE",
    "mem0_ts_typescript_port": "INADMISSIBLE"
  },
  "recommended_integration_option": "D: STUDY-PILOT-PATTERN-EXTRACT",
  "cite_pattern_extract_candidates": [
    "Z:/repos/deps/mem0/mem0-plugin/hooks/hooks.json:3-70 - lifecycle hook coverage for session start, prompt submit, compaction, stop, and task completion",
    "Z:/repos/deps/mem0/mem0-plugin/scripts/on_user_prompt.sh:44-69 - memory-search decision rubric with scoped filters and multi-query guidance",
    "Z:/repos/deps/mem0/mem0-plugin/scripts/on_pre_compact.sh:21-27,53-60 - pre-compaction session-state capture with infer=false",
    "Z:/repos/deps/mem0/mem0-plugin/scripts/block_memory_write.sh:28-31 - local memory-file write redirect pattern",
    "Z:/repos/deps/mem0/mem0/configs/prompts.py:472-486,694-701,1016-1042 - additive extraction and linked-memory prompt design",
    "Z:/repos/deps/mem0/mem0/memory/main.py:701-745 - phased retrieval plus LLM extraction pipeline",
    "Z:/repos/deps/mem0/mem0/memory/main.py:1343-1364 - semantic plus keyword search composition"
  ],
  "prescribed_edits": [],
  "next_steps": [
    "Do not install mem0 into the main eee runtime by default.",
    "If piloting the plugin, use an isolated Claude profile/project, synthetic data only, and a dedicated MEM0_API_KEY; treat mcp.mem0.ai as external cloud storage.",
    "If piloting core mem0ai, pin mem0ai==2.0.2, set MEM0_TELEMETRY=false before import, and configure a local swappable vector backend; sqlite_vec reuse is not supported.",
    "Extract the hook and prompt patterns into eee-local graphiti/mcp-memory workflows before considering any remote Mem0 integration.",
    "Before any Anthropic-provider core use, add a targeted tool-call test; source shows direct Anthropic text generation exists, but generic tool-call parsing is not correct."
  ],
  "convergence_with_existing_eee_primitives": {
    "vs_graphiti_temporal_kg": "PARTIAL",
    "vs_mcp_memory_sqlite_vec": "PARTIAL",
    "vs_combined_3_layer_memory_stack": "PARTIAL",
    "vs_eee_claude_code_plugins": "DIFFERENT-LAYER"
  },
  "axis_1_strong_provenance_express_check": "FIRES",
  "fire_23_p0_check": "ORTHOGONAL (the plugin adds session-start bootstrap context; it does not reduce session-start descriptor budget)",
  "comparison_to_zep_memory": "Graphiti/Zep is the stronger fit for local temporal-KG memory in eee. Mem0 is closer to cloud-backed fact extraction, semantic recall, linked memories, and lifecycle protocol; useful as a pattern source, not a replacement for graphiti plus mcp-memory."
}
```

## Verdict shape disposition

Per `codex-t1-fix-forward-pattern.md`:
- **STUDY-PILOT-PATTERN-EXTRACT @ conf=0.87** — 2nd of this class in Wave 134 series (after openai-agents-python 0.89)
- **Empty `prescribed_edits`** — no Pattern A apply for INSTALL decision
- **7 cite-pattern extract candidates** with file:line precision
- **5 operator-actionable next_steps** + Anthropic tool_use targeted test mandate
- **CR-12 class**: PARTIAL-OVERLAP (3rd CR-12 class instance in Wave 134 — distinct from PROVIDER-COMPLEMENT and ECOSYSTEM-IMPORT)

## Cross-model gate satisfaction

| Aspect | Status |
|---|---|
| Verdict origin | ✅ REAL GPT-5.5 via codex CLI v0.130.0 |
| CR-3 cross-model consensus | ✅ FULLY SATISFIED |
| CR-3 Phase 1 bootstrap exception | ✅ orchestrator-side codex exec foreground+tee |
| Path P recipe ladder | n=19 → **n=20 reproducible** (Forward Discipline from Fire 27-B WORKED — tightened scope produced clean verdict in 3.5min) |

## 🚨 Critical codex T1 contributions

### 1. mem0-plugin SELF-PUBLISHED verification (load-bearing for CR-12)

Codex T1 directly probed `anthropics/claude-plugins-official @ 00679aef889efe36bb0389f81d70b6229a2013ee` — mem0 ABSENT from official tree. Install path is community marketplace:
```
/plugin marketplace add mem0ai/mem0
/plugin install mem0@mem0-plugins
```

This is LOAD-BEARING for the CR-12 disposition. Without this verification, orchestrator might have proceeded assuming mem0-plugin = Anthropic-official-canonical-install.

### 2. sqlite-vec NOT SUPPORTED (refutes Fire 27-B convergence assumption)

Fire 27-B established sqlite-vec INFRASTRUCTURE-CONVERGENT positive (eee uses sqlite-vec; langgraph-checkpoint-sqlite uses sqlite-vec). Orchestrator pre-audit assumed this might generalize to mem0.

Codex T1 REFUTED: mem0 vector_stores optional group does NOT include sqlite-vec. Backend reuse NOT POSSIBLE.

**Lesson**: cross-fire CONVERGENT positive findings DO NOT generalize automatically; must verify per-candidate.

### 3. Anthropic tool_use KNOWN-BROKEN (critical caveat)

Codex T1:
> "Anthropic_as_primary_llm: FULLY-SUPPORTED, tool_use_handling: KNOWN-BROKEN"

> "Source shows direct Anthropic text generation exists, but generic tool-call parsing is not correct."

eee runtime uses tool_use extensively (Claude Code subagent tool calls, MCP tool calls, hook tool calls). Without working Anthropic tool_use, mem0 Anthropic backend may fail for eee scenarios.

### 4. PostHog telemetry disable-via-env DISCOVERED

Codex T1:
> "For any pip/core pilot, set MEM0_TELEMETRY=false and MEM0_TELEMETRY_SAMPLE_RATE=0 before importing mem0. Evidence: pyproject requires posthog at pyproject.toml:20; telemetry defaults true at mem0/memory/telemetry.py:14 and disables PostHog client when false at mem0/memory/telemetry.py:75-76."

Mitigation pattern documented at exact file:line — operator can disable telemetry per CR-9 install-risk discipline.

### 5. Cloud-routed memory architecture (mcp.mem0.ai)

Codex T1: "the plugin also routes memory to Mem0 cloud" — external storage dependency. eee local-first runtime preference means cloud routing is a STRUCTURAL deal-breaker for primary memory backend.

### 6. CR-12 PARTIAL-OVERLAP class (3rd Wave 134 instance)

Wave 134 series has now mapped 3 distinct CR-12 classes:
- Fire 27-A → **PROVIDER-COMPLEMENT** (4th class, established)
- Fire 27-B → **ECOSYSTEM-IMPORT** (5th class candidate)
- **Fire 27-C → PARTIAL-OVERLAP** (3rd class, demonstrated)

Plus DUPLICATE-FUNCTIONALITY (rejection class) and GENUINELY-NEW (install class) cover the 5-class lattice.

### 7. Graphiti/Zep comparison (load-bearing for eee memory architecture)

Codex T1:
> "Graphiti/Zep is the stronger fit for local temporal-KG memory in eee. Mem0 is closer to cloud-backed fact extraction, semantic recall, linked memories, and lifecycle protocol; useful as a pattern source, not a replacement for graphiti plus mcp-memory."

This is a load-bearing memory-architecture statement confirming eee's existing graphiti + mcp-memory stack is STRUCTURALLY better-aligned with eee's local-first design than mem0's cloud-routed pattern.

## Path P recipe ladder advance

| Fire | Subject | Verdict | Tokens | Wall-clock |
|---|---|---|---|---|
| 24-A | BMAD | REJECT-FOR-FIT 0.92 | 94,987 | — |
| 24-B | CCPM | CITE-PATTERN-ONLY 0.90 | 115,741 | — |
| 24-C | Task Master | CITE-PATTERN-ONLY 0.92 | 175,555 | — |
| 24-D | Agent OS v3 | STUDY-PILOT-NARROW 0.87 | 143,587 | — |
| 24-E | Claude Memory Bank | REJECT-FOR-FIT 0.94 | 79,094 | — |
| 25 | Discovery wave | Pattern B HNF | 175k+ | — |
| 26-A | cisco-mcp-scanner | STUDY-PILOT-NARROW 0.91 | 128,628 | — |
| 26-B | LLMLingua | CITE-PATTERN-ONLY 0.86 | 82,142 | — |
| 26-C | claw-compactor | CITE-PATTERN-ONLY 0.88 | 358,418 | — |
| 27-A | openai-agents-python | STUDY-PILOT-PATTERN-EXTRACT 0.89 | 238,328 | 3m 42s |
| 27-B | langgraph | Pattern B HNF | ~5min | — |
| **27-C** | **mem0** | **STUDY-PILOT-PATTERN-EXTRACT 0.87** | **164,846** | **3m 25s (efficient — Forward Discipline applied)** |

**Total Wave 134 codex tokens**: ~1.75M (~$20-35 estimated cost). Fire 27-C is **most efficient** post-Forward-Discipline fire — 164K tokens vs 238K for Fire 27-A vs 358K for Fire 26-C. Forward Discipline applied (tightened scope) WORKED.

## Verdict shape distribution (Wave 134 — updated)

| Verdict | Count | Subjects |
|---|---|---|
| REJECT-FOR-FIT | 2 | BMAD + Claude Memory Bank |
| CITE-PATTERN-ONLY | 4 | CCPM + Task Master + LLMLingua + claw-compactor |
| STUDY-PILOT-NARROW | 2 | Agent OS v3 + Cisco mcp-scanner |
| **STUDY-PILOT-PATTERN-EXTRACT** | **2** | **openai-agents-python + mem0** |
| Pattern B HNF | 2 | Discovery wave + langgraph |
| APPROVE | 0 | — |

## Mia ladder advance

n=1856 → **n=1869** (+13: codex T1 verdict captured / 7 HIGH-VALUE cite-patterns / 2nd STUDY-PILOT-PATTERN-EXTRACT in Wave 134 / Forward Discipline VALIDATED (164K efficient vs Fire 27-B's Pattern B HNF on 519MB) / Path P n=20/20 with FD-tightened-scope variant / 7 LOAD-BEARING contributions / CR-12 PARTIAL-OVERLAP 3rd class demonstrated / sqlite-vec convergence assumption REFUTED / Anthropic tool_use KNOWN-BROKEN first-of-kind catch / Graphiti/Zep memory architecture validated / cloud-routed memory privacy concern formalized / community-marketplace-vs-Anthropic-official distinction established / 5-class CR-12 lattice fully mapped in Wave 134 series)
