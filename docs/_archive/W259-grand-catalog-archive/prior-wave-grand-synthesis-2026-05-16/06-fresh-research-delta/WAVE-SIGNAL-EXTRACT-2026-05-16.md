# Wave Synthesis Signal Extract — 2026-05-16

> Sourced from general-purpose fork (agentId a0d375dd8906df2e5, 2026-05-16T13:08Z+)
> Read 14 high-signal wave files from W219-W253 and extracted signal NOT in W258-ULTIMATE.

## §A — Net-signal repos NOT in W258-ULTIMATE

1. **anthropics/cwc-long-running-agents** (Apache-2.0, 317★, `.claude` config+hooks+agents) — STUDY-PILOT-HIGH; official Anthropic exception directly relevant to long-running agent runtime; basis for wave1 Phase 1 ship plan. Source: wave253-C-adversarial / wave253-C-grand
2. **openai/codex-plugin-cc** (Apache-2.0, 18,773★) — native CC plugin for codex; W258 covers `openai/codex` CLI but not the CC-plugin form. Source: wave253-C-adversarial
3. **anthropics/skills** (135K★, license-policy-review) — official Anthropic skill corpus; W258 mentions only in passing. Source: wave253-C-grand-synthesis
4. **idosal/git-mcp** (Apache-2.0, 8,081★) — git-to-MCP knowledge surface complement to GitNexus/DeepWiki. Source: wave253-C
5. **Apify MCP** — STUDY-PILOT.b net-new web-MCP gap not in W258 browser-MCP coverage. Source: wave252-B-bridgemode-deep Axis-1
6. **Continuous-Claude-v3** (parcadei, MIT, 3,771★) — long-running autonomous CC harness, STUDY-PILOT-PROMOTED. Source: wave240-CLOSE
7. **buildoak/wet** — primary LLMLingua replacement. Source: wave241
8. **yvgude/lean-ctx** — secondary LLMLingua replacement (also surfaced in fresh-sota-delta). Source: wave241
9. **ComposioHQ/agent-orchestrator** — net-new orchestration pattern. Source: wave241
10. **HKUDS/OpenHarness** — net-new harness pattern. Source: wave241
11. **InvariantLabs-ai/mcp-scan** — net-new MCP security audit tool. Source: wave241
12. **wshobson/shell-scripting v1.2.2** (Grade A) — Source: wave235-agentZ + wave236-FINAL 80-plugin deep scoring
13. **wshobson/plugin-eval** (Grade B+) — Source: wave235-agentZ
14. **wshobson/block-no-verify** (Grade B+) — Source: wave235-agentZ
15. **sigstore + age + sops** — L0.5 security foundation absent from W258. Source: wave236 Phase 0
16. **mcp-memory-service@10.51.3** + **graphiti-core@0.29.0** + **FalkorDB@1.6.1** — pinned memory-stack versions. Source: wave236 Phase 1
17. **mem0 + cognee + firecrawl + arxiv + OTel + exa + graphrag + opik** — alternative observability/memory stack (W258 has mem0/opik partially but cognee/exa/graphrag/arxiv/firecrawl-as-mcp absent or different verdicts). Source: wave251

## §B — Conflicting verdicts between waves and W258-ULTIMATE

| Repo | W258 says | Waves say | Truth (per evidence) |
|---|---|---|---|
| **Phoenix (Arize)** | Apache-2.0 / KEEP | **Elastic License 2.0 (ELv2)** per wave240 Catch #2 + wave250-B Axis-4 + W216 + local LICENSE blob at Z:/repos/deps/phoenix/LICENSE | **WAVES CORRECT** — load-bearing license error in W258. Mitigation: ELv2 permits local non-resale, so KEEP can survive, but downstream cite-class must adjust. |
| **Langfuse** | REJECT "DRY with Phoenix" | First observability pick (Phoenix ELv2-blocked) per W216 + wave252-B Axis-4 | **WAVES CORRECT** if Phoenix is ELv2; W258 inflated Phoenix and unfairly REJECTed Langfuse |
| **firecrawl** | T2 "Tavily OR Firecrawl MCP — pick one" | **AGPL-3.0 hard blocker** ("ADOPT-NOW → DEFER") per wave253-C-adversarial; only MCP wrapper is permissive | **WAVES CORRECT** — W258 should disambiguate core (AGPL) vs MCP wrapper (permissive) |
| **claude-mem** | Not surfaced | DOWNGRADE per wave250-A4 BRIDGE-MODE prescription #5 | **WAVES CORRECT** |
| **context-mode license** | Implied MIT | Elastic-2.0 per wave250-A4 BRIDGE-MODE prescription #3 | **WAVES CORRECT** |

## §C — Wave-specific lessons-learned to incorporate

1. **FM-09 codex-rescue blind-spot specialization** — codex-rescue alone has same blind-spot; 2nd-stage validation requires BRIDGE-MODE+orchestrator-direct concurrence n=2. W258 cites 8 codex audits but does not encode FM-09 invariant. Source: wave250-Z + ahfv-codex-rescue-blind-spot.md
2. **FM-17.b/d/e thrash + Path P (orchestrator-direct codex exec foreground+tee) recovery** — 3 same-arc BRIDGE-MODE codex-rescue thrashes confirm structural pattern; recovery is orchestrator-direct Path P, NOT another subagent retry. Source: wave241-CLOSE-orchestrator
3. **FM-20 row 9 asymmetric-dual-write** — parallel-session perspective vs orchestrator-thread can both be "correct in respective contexts"; reconcile via cross-link artifact. Source: wave241
4. **Mia pre-apply ladder n=44+ + STRONG-PROVENANCE-EXPRESS saturation-break recalibration** — probe-DAG-style LICENSE blob-SHA reads as REJECT-FOR-FIT discipline. Source: wave251 §3, wave240 §2
5. **AXIS-4 OTel observability pivot** — Langfuse>Opik>Phoenix ranking under ELv2 reality. Source: wave252-B + W216
6. **wave237 Pattern A FIX-FORWARD** — 7 atomic prescriptions on codex T1 NEEDS-REVISION conf=0.91 — pattern template for handling NEEDS-REVISION verdicts. W258 does not codify the fix-forward template.
7. **8-axis Probe-DAG** (Probe 1-6 existence/license/install-channel/duplicate/adoption/registry) from wave252-B + wave241 31-license-probedag — the actual probe DAG W258 17-axis lacks at candidate-evaluation level.

## §D — Recommended file dispositions

| File | Disposition | Rationale |
|---|---|---|
| `wave253-C-grand-synthesis-2026-05-15.md` | **KEEP** | 7 missed-candidates table is highest-value net-new vs W258 |
| `wave253-C-adversarial-review-2026-05-15.md` | **KEEP** | ADOPT-NOW challenge corrections (firecrawl, openai/codex split) |
| `wave253-B-fresh-discovery-bridge-2026-05-15.md` | **KEEP** | 31.7KB Bridge-mode discovery base; W258 inputs |
| `wave252-B-bridgemode-deep-2026-05-16.md` | **KEEP** | 4-axis (browser/sandbox/CI/observability) net-new + Phoenix ELv2 catch |
| `wave250-Z-synthesis-2026-05-15.md` | **KEEP** | FM-09 + FM-20 row 21 + FM-17.d recovery codification |
| `wave250-A7-final-synthesis-2026-05-15.md` | **SUPERSEDED-ARCHIVE** | Wave-2 consolidated; main content folded into Z-synthesis |
| `wave241-CLOSE-SYNTHESIS-orchestrator-2026-05-15.md` | **KEEP** | 5 NET-NEW ADOPT-NOW + FM-17.e n=3 evidence |
| `wave241-CLOSE-SYNTHESIS-2026-05-15.md` | **HISTORICAL-REFERENCE** | Parallel-session showing FM-20 row 9 dual-write |
| `wave240-CLOSE-SYNTHESIS-2026-05-15.md` | **KEEP** | Phoenix-ELv2 catch + Mia ladder n=39 + Continuous-Claude-v3 promotion |
| `wave237-CORRECTED-FINAL-SYNTHESIS-Pattern-A-fix-forward-2026-05-15.md` | **KEEP** | Pattern A FIX-FORWARD template + 7 prescriptions; foundational for W258 audit chain |
| `wave236-FINAL-CLOSE-SYNTHESIS-W220-W235-CUMULATIVE-2026-05-15.md` | **SUPERSEDED-ARCHIVE** (by W237) | 32-roster + Phase 0 sigstore foundation; superseded but useful for sigstore anchor |
| `wave235-agentZ-wshobson-80-plugin-deep-scoring-2026-05-15.md` | **KEEP** | 80-plugin deep scoring with license matrix (97% MIT, 1 Apache, 1 UNDEF, 1 FEDERATED) |
| `wave219-MASTER-SYNTHESIS-comprehensive-checklist-2026-05-15.md` | **HISTORICAL-REFERENCE** | 319 LOC checklist; superseded but useful Phase-9 user-named candidate matrix |
| `wave1-synthesis-install-architecture-2026-05-15.md` | **HISTORICAL-REFERENCE** | Wave 1 baseline (cwc-long-running-agents Phase 1 ship) — anchors first appearance |

## §E — Signal-density estimate

- 646 `wave*.md` files (33% of 1934 tmp/ entries)
- 611 non-md wave* files (codex-tee transcripts, prompt drafts, OUT.txt) — mostly ephemeral
- 275 `*agent*.md` files (14%) — most superseded by close-syntheses
- 80 `*provenance*.md` (61 `provenance-append`) — bookkeeping receipts, low standalone signal
- 70 `*ship*.md` — single-ship status, mostly superseded
- 110 high-signal files (`*synthesis*` + `*CLOSE*` + `*FINAL*` + `*adversarial*` + `*bridge*`) ~ 5.7% of total

**Estimate: ~10-15% meaningful research** (100-150 high-signal files of ~850 wave .md set). **85-90% is scratch/provenance/ship-status/superseded-mid-wave/codex-OUT-tee** — safely archivable or deletable. The truly-canonical-after-W258 set is ~15-25 files.
