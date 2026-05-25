# Infrastructure-Convergent Pattern (Wave 134 Fire 27 series)

> **Purpose**: codify a POSITIVE finding pattern (INFRASTRUCTURE-CONVERGENT — upstream candidate's dependencies INCLUDE existing eee infrastructure components, enabling reuse rather than parallel install) + a critical CAVEAT (cross-fire CONVERGENT positives DO NOT generalize automatically).
> **Cite class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8; `constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 134 Fire 27-B + 27-C codex T1 trace evidence, TIER-2 @ Z:/claude-sota/.claude/rules/convergence-gate.md axis precedent, TIER-2 @ Z:/claude-sota-installed/docs/codex-t1-pattern-b-forward-discipline.md Forward Discipline #2]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.
> **Sister-rule integration**: extends `Z:/claude-sota/.claude/rules/convergence-gate.md` axis-3+axis-4 scoring; informs CR-12 disposition lattice (ECOSYSTEM-IMPORT class) at CLAUDE.md cardinal-rule-12.

## Origin — Fire 27-B positive + Fire 27-C refutation

### Fire 27-B positive — sqlite-vec INFRASTRUCTURE-CONVERGENT discovered

**Date**: 2026-05-10
**Target**: `langchain-ai/langgraph` v1.2.0a7 Path P audit
**Finding**: `libs/checkpoint-sqlite/pyproject.toml:17` REQUIRES `sqlite-vec>=0.1.6`
**Eee state**: already uses sqlite-vec for `mcp-memory` backend (`Z:/claude-sota-installed/.mcp.json` memory MCP wired at `Z:/claude-sota-installed-state/.mcp-memory/memory.db`)
**Implication**: if eee ever pilots LangGraph with SQLite checkpoint backend, existing sqlite-vec investment is REUSABLE — no incremental install footprint.

**Classification**: INFRASTRUCTURE-CONVERGENT positive — adoption REUSES rather than DUPLICATES infrastructure.

### Fire 27-C refutation — cross-fire generalization REJECTED

**Date**: 2026-05-10
**Target**: `mem0ai/mem0` v2.0.2 Path P audit
**Orchestrator pre-audit assumption**: Fire 27-B sqlite-vec convergence pattern might GENERALIZE to mem0's vector_stores ecosystem
**Codex T1 verification**: REFUTED — `mem0/pyproject.toml` `vector_stores` optional group enumerates qdrant + chromadb + cassandra + weaviate + pinecone + faiss + upstash + azure-search + psycopg + pymongo + pymilvus + redis + elasticsearch + langchain-aws (14 backends) — **sqlite-vec NOT included**
**Implication**: mem0 cannot reuse eee's sqlite-vec investment; must install Qdrant (default) or chromadb (closest alternative).

**Lesson**: cross-fire CONVERGENT positive findings DO NOT generalize automatically — each candidate must be verified per-instance via dep-tree probe.

## The pattern (POSITIVE) — INFRASTRUCTURE-CONVERGENT

**Definition**: an upstream candidate has INFRASTRUCTURE-CONVERGENT positive when its REQUIRED or DEFAULT-RECOMMENDED dependencies include one or more components ALREADY installed in eee runtime.

**Detection probe** (during Path P audit Probe 6 phase):
```bash
# Identify candidate's required deps
cat <local-clone>/pyproject.toml | grep -E "^dependencies|^required"
cat <local-clone>/package.json | jq '.dependencies'

# Cross-reference vs eee installed infrastructure
# eee infrastructure inventory (current):
#   - sqlite-vec (mcp-memory backend)
#   - graphiti + FalkorDB (temporal-KG memory)
#   - openlit + Phoenix (observability)
#   - openai + anthropic SDKs (LLM providers via .mcp.json)
#   - context-mode + repomix (token-efficiency)
#   - codex CLI + 6 codex T1-T7 hooks (cross-model verification)
#   - claude-agent-sdk-python (TIER-1 SDK)

# Compare overlap
grep -F -i -f eee-infra-inventory.txt <candidate-deps>.txt
```

**Disposition impact**: INFRASTRUCTURE-CONVERGENT positive can DOWNGRADE concerns about:
- CR-12 ECOSYSTEM-IMPORT class severity (some ecosystem components already in eee = lower install cost)
- CR-9 install-risk 2-round fix-forward budget (shared infrastructure reduces breakage surface)
- Probe 6 install-footprint blocker severity

**Disposition does NOT change**:
- CR-12 class itself (still GENUINELY-NEW / PROVIDER-COMPLEMENT / PARTIAL-OVERLAP / etc — INFRASTRUCTURE-CONVERGENT is a positive modifier, not a class)
- Probe DAG verdicts on other probes (P1-P5, P7a, P7b)
- Row-2 fabrication-test outcome

## The caveat (ANTI-PATTERN) — Cross-fire generalization

**Rule**: When an INFRASTRUCTURE-CONVERGENT positive is discovered in Fire N, DO NOT carry it forward as a default assumption to Fire N+1, N+2, etc.

**Why**: each upstream candidate has its own dep-tree. Convergent positives are PER-INSTANCE, not PER-CATEGORY. Examples:
- Fire 27-B langgraph → sqlite-vec CONVERGENT (LangChain ecosystem reused eee primitive)
- Fire 27-C mem0 → sqlite-vec ABSENT from vector_stores (mem0 chose Qdrant default + chromadb alternative; sqlite-vec not in their multi-backend list)
- These are SAME-DOMAIN candidates (both memory frameworks) with DIFFERENT infrastructure choices

**Operational discipline**:
1. **MIA pre-apply probe**: when orchestrator pre-audit assumes a prior-fire CONVERGENT finding might apply, MARK as Mia probe candidate — verify via codex T1 BEFORE accepting
2. **Codex T1 prompt explicit**: include "verify whether candidate uses [convergent component] — DO NOT assume from prior-fire finding"
3. **Document refutations**: when generalization REFUTED, document as cross-fire learning (Fire 27-C did this — REFUTATION codified)

## Operational discipline (audit-time application)

During Path P audit Probe 6 (direct-file/registry blockers):

1. **Required-deps probe**: extract candidate's REQUIRED deps from pyproject.toml / package.json / Cargo.toml / setup.py
2. **Optional-deps inventory**: enumerate optional dep groups (e.g., `vector_stores`, `extras`, `llms`)
3. **Cross-ref eee infrastructure**: compare against eee's installed-component inventory
4. **Score INFRASTRUCTURE-CONVERGENT positive** if overlap >0:
   - **STRONG**: required dep is eee infrastructure (e.g., sqlite-vec in langgraph-checkpoint-sqlite REQUIRED deps)
   - **MODERATE**: optional dep is eee infrastructure AND is default-recommended
   - **WEAK**: optional dep is eee infrastructure but NOT default-recommended (operator must explicitly opt-in)
5. **Apply to CR-12 disposition**: INFRASTRUCTURE-CONVERGENT positive can shift ECOSYSTEM-IMPORT verdict from CITE-PATTERN-ONLY toward STUDY-PILOT-NARROW-WITH-VENV-ISOLATION
6. **Per-instance only**: do NOT carry finding forward as default for Fire N+1

## Integration with CR-12 disposition lattice (CLAUDE.md cardinal-rule-12)

Per the 5-class CR-12 lattice codified Wave 134 Fire 27-D:

| CR-12 class | INFRASTRUCTURE-CONVERGENT positive impact |
|---|---|
| GENUINELY-NEW | No impact (INSTALL via PRIMARY path regardless) |
| DUPLICATE-FUNCTIONALITY | No impact (REJECT-FOR-FIT regardless) |
| PARTIAL-OVERLAP | Minor — reduces install footprint if pilot |
| PROVIDER-COMPLEMENT | Moderate — reduces ecosystem-cost for ALTERNATIVE install path |
| **ECOSYSTEM-IMPORT** | **STRONG — reduces ecosystem-cost concern; may shift CITE-PATTERN-ONLY → STUDY-PILOT-NARROW-WITH-VENV-ISOLATION** |

The strongest INFRASTRUCTURE-CONVERGENT impact is on the ECOSYSTEM-IMPORT class (Fire 27-B langgraph's expected disposition). If eee already installs the heavy components, the ecosystem-import cost is lower.

## Future evolution

**Promotion criteria** (when INFRASTRUCTURE-CONVERGENT pattern should promote to formal convergence-gate axis):
- ≥3 distinct cross-fire INFRASTRUCTURE-CONVERGENT findings observed (n=3 cycle-322 threshold)
- ≥2 distinct refutations (validating the caveat is empirically necessary)
- ≥1 case where INFRASTRUCTURE-CONVERGENT positive materially shifted CR-12 disposition (validating operational value)

**Current state** (post-Fire-27-F codification):
- INFRASTRUCTURE-CONVERGENT positive: n=1 (Fire 27-B langgraph sqlite-vec)
- Cross-fire REFUTATION: n=1 (Fire 27-C mem0 sqlite-vec absent)
- Material CR-12 disposition shift: n=0 (Fire 27-B was Pattern B HNF + ECOSYSTEM-IMPORT candidate — never operationally piloted)

Promote to formal axis when n=3+ each.

## Anti-pattern catalog (Mia pre-apply)

When future operator considers a prior-fire CONVERGENT finding:

| Bad framing | Good framing |
|---|---|
| "Fire N candidate uses sqlite-vec, so Fire N+1 candidate also uses it" | "Fire N candidate uses sqlite-vec — verify Fire N+1 candidate's dep-tree independently" |
| "Memory frameworks always use sqlite-vec" | "Verify per-instance which vector backends are supported" |
| "ECOSYSTEM-IMPORT cost is low for memory frameworks" | "Probe candidate's dep tree; ECOSYSTEM-IMPORT cost is per-instance" |
| "Skip Probe 6 because prior fire passed" | "Run Probe 6 fresh per fire; CONVERGENT positives don't carry forward" |

## Cite anchor

- Fire 27-B sqlite-vec CONVERGENT discovery: `.claude/state/codex_consult_w134_f27b_langgraph_OUT.txt` (Pattern B HNF trace; sqlite-vec found in deps cascade)
- Fire 27-C generalization REFUTATION: `.claude/state/codex_consult_w134_f27c_mem0_OUT.txt` codex T1 verdict `"qdrant_default_backend_check.sqlite_vec_backend_supported": "NO"`
- Codification ship: W134-F27-RESEARCH-ARCH-F (2026-05-10)
- Sister disciplines: `Z:/claude-sota-installed/docs/codex-t1-pattern-b-forward-discipline.md` Forward Discipline #2 (this fire's recursive dogfood instance n=2) + CLAUDE.md cardinal-rule-12 5-class CR-12 lattice
