# THE GRAND CATALOG — UNIFIED INDEX (V-FINAL fix26)

> **Single navigational map** for the complete grand catalog as of 2026-05-16. The catalog was sharded into 4 layer-partitioned PART files (fix12) plus the original top-tier matrix (fix1-11) plus the GraphQL deep-probe net-new additions (fix13) plus direct gh-API verifications (fix14/14b/14c) plus codex T1 cross-model audit propagation (fix15). This index ties them together.

## ⚡ Catalog totals (post fix20)

| Component | File | LOC | Data rows | Coverage |
|---|---|---|---|---|
| **THE-GRAND-CATALOG-MATRIX** | `THE-GRAND-CATALOG-MATRIX-2026-05-16.md` | 318 | ~308 | Top-tier "best of" — sum/80 desc with verdict |
| **PART 1 (Data Cluster)** | `THE-GRAND-CATALOG-PART1-L0-L1-DATA.md` | 564 | 392 | L0.0 Vector · L0.1 KG · L0.2 Memory MCP (84) · L0.25 Local Inference · L0.3 RAG · L0.7 MCP Servers (88) · L0.8 Cache · L1.0 Gateway · L1.1 Multi-account · L1.5 Compression · L4.5 Doc Ingestion · L5.7 Workflow |
| **PART 2 (Agent Cluster)** | `THE-GRAND-CATALOG-PART2-L2-L3-AGENTS.md` | 714 | 468 | L2.0 Frameworks (53) · L2.1 CC Plugins (96) · L2.2 CC Tools (50) · L2.4 CC Templates · L2.6 Vertical (165) · L2.7 Test/Doc/Refactor (53) · L2.8 Commercial (32) · L3.0 Peer CLIs |
| **PART 3 (Eval+Sec Cluster)** | `THE-GRAND-CATALOG-PART3-L4-L5-EVAL-SEC.md` | 507 | 316 | L2.5/L3.5 Multimodal/UI/Browser/Voice (67) · L4.0 Eval+Obs (62) · L4.5 Reasoning · L5.0 Security (45) · L5.5 Workflow/DevOps (57) · L5.7 Durable · Q2-2026 cross-cut (60) |
| **PART 4 (Code+Misc Cluster)** | `THE-GRAND-CATALOG-PART4-L6-MISC.md` | 631 | 455 | L0.6 Worktree (58) · L0.8 Cache · L1.0 Gateway · L1.1 Multi-Account · L4.0 Code-Intel (158) · L6.0 Orchestration (32) · L6.5 Q2-2026 entrants · MISC (145) |
| **GRAPHQL-FINAL-MISSING** (fix13) | `06-fresh-research-delta/GRAPHQL-FINAL-MISSING-2026-05-16.md` | 211 | 55 net-new | 12-axis GraphQL deep-probe (9/12 axes uncovered ≥1 candidate) |
| **GRAPHQL-CHINESE-MULTILANG** (fix16) | `06-fresh-research-delta/GRAPHQL-CHINESE-MULTILANG-2026-05-16.md` | 280 | 15 net-new | Chinese ecosystem + multilang LSP — 7 NEW-P0 |
| **GRAPHQL-NICHE-500-1K** (fix17) | `06-fresh-research-delta/GRAPHQL-NICHE-500-1K-2026-05-16.md` | 280 | ~64 net-new | 500-1k★ floor niche probe — only 1/10 axis saturated |
| **GRAPHQL-HARDWARE-RUNTIME** (fix18) | `06-fresh-research-delta/GRAPHQL-HARDWARE-RUNTIME-2026-05-16.md` | 230 | 44 net-new | 13-axis hw/runtime probe — 5 NEW sub-layers + llamafile omission |
| **LICENSE-VERIFY-FIX13** (fix14b) | `06-fresh-research-delta/LICENSE-VERIFY-FIX13-2026-05-16.md` | 90 | 35 verified | gh-API license confirmation — Dolphin REJECT discovery |
| **HALLUCINATION-AUDIT-PARTS** (fix14c) | `06-fresh-research-delta/HALLUCINATION-AUDIT-PARTS-2026-05-16.md` | 90 | 100 sampled | 0% pure hallucination, B+ grade |
| **TOTAL UNIQUE (after dedup)** | (across all files) | — | **~2,000 unique repos** | All 25 super-layers + 5 NEW L0.25 sub-layers covered |

## 🎯 Layer-to-PART navigation

| Layer | PART | Specific section |
|---|---|---|
| L0.0 Vector DB | PART 1 | §L0.0 |
| L0.1 KG | PART 1 | §L0.1 |
| L0.2 Memory MCP | PART 1 | §L0.2 (84 rows — heaviest) |
| L0.25 Local Inference | PART 1 | §L0.25 |
| L0.3 RAG | PART 1 | §L0.3 |
| L0.4 Code-Intel-Embeddings | PART 4 | §L4.0 (158 rows — heaviest in PART 4) |
| L0.5 Security (cross-cut) | PART 3 | §L5.0 |
| L0.6 Git Worktree | PART 4 | §L0.6 (58 rows) |
| L0.7 MCP Server primitives | PART 1 | §L0.7 (88 rows) |
| L0.8 Cache | PART 1 + PART 4 | §L0.8 in both |
| L0.MCP All-Servers | PART 1 | §L0.7 (mcp sub-classification) |
| L1.0 LLM Gateway | PART 1 + PART 4 | (saturation-signal fix13 — heuristic per fix15 codex audit) |
| L1.1 Multi-Account/Auth | PART 1 + PART 4 | §L1.1 |
| L1.5 Token Compression | PART 1 | (saturation-signal fix13 — heuristic per fix15 codex audit) |
| L2.0 Agent Frameworks | PART 2 | §L2.0 (53 rows) |
| L2.1 CC Plugins/Skills | PART 2 | §L2.1 (96 rows) |
| L2.2 CC Community Tools | PART 2 | §L2.2 (50 rows) |
| L2.4 CC Templates | PART 2 | §L2.4 |
| L2.5 Multi-Modal & Realtime | PART 3 | §L2.5/L3.5 (67 rows) |
| L2.6 Vertical Agents | PART 2 | §L2.6 (165 rows, 15 sub-clusters) |
| L2.7 Test/Doc/Refactor | PART 2 | §L2.7 (53 rows) |
| L2.8 Commercial Agents | PART 2 | §L2.8 (32 rows) |
| L3.0 Peer CLIs | PART 2 | §L3.0 (anomalyco/opencode 161k★ canonical per fix12) |
| L3.5 Agent-Native UI + HITL | PART 3 | §L3.5 |
| L4.0 Eval+Observability | PART 3 | §L4.0 (62 rows) |
| L4.5 Doc Ingestion | PART 1 + PART 3 | §L4.5 in both |
| L4.5 Reasoning/Reward | PART 3 | §L4.5 |
| L5.0 Security | PART 3 | §L5.0 (45 rows; saturation-signal fix13 — heuristic per fix15 codex audit) |
| L5.5 Workflow/DevOps | PART 3 | §L5.5 (57 rows) |
| L5.7 Durable Execution | PART 3 | §L5.7 |
| L6.0 Coordination | PART 4 | §L6.0 (32 rows) |
| L6.5 Q2-2026 entrants | PART 3 + PART 4 | §Q2-2026 cross-cut in PART 3 |
| L6.7 Commercial-Pattern-Extracts | PART 2 | §L2.8 |

## 🆕 fix13 net-new candidates AFTER fix14b/14c resolution

**Final tally**: 8 P0 STUDY-PILOT + 1 PATTERN-ONLY (stale) + 1 REJECT (non-commercial license)

| # | Repo | Layer | Stars | Status (post-fix14b/14c) | Where to find |
|---|---|---|---|---|---|
| 1 | alibaba/zvec | L0.0 | 9,633 | **STUDY-PILOT** Apache-2.0 verified | GRAPHQL-FINAL-MISSING §Axis 1 |
| 2 | Gentleman-Programming/engram | L0.2 | 3,545 | **STUDY-PILOT** MIT verified | GRAPHQL-FINAL-MISSING §Axis 3 |
| 3 | DeusData/codebase-memory-mcp | L0.2/L0.4 | 2,363 | **STUDY-PILOT** MIT verified · `[MARKETING-LANGUAGE]` | GRAPHQL-FINAL-MISSING §Axis 3 |
| 4 | Mibayy/token-savior | L0.2 | 855 | **STUDY-PILOT** MIT verified · `[MARKETING-LANGUAGE-VERIFY]` | GRAPHQL-FINAL-MISSING §Axis 3 |
| 5 | facebook/pyrefly | L4.0 | 6,036 | **STUDY-PILOT** MIT verified | GRAPHQL-FINAL-MISSING §Axis 8 |
| 6 | SilasMarvin/lsp-ai | L4.0 | 3,172 | **STUDY-PATTERN-ONLY** (fix14 — STALE 16+ months, Unlicense per fix14b) | GRAPHQL-FINAL-MISSING §Axis 8 |
| 7 | ~~bytedance/Dolphin~~ | ~~L4.5~~ | 8,978 | **REJECT** (fix14b — Qwen Research License non-commercial only) | GRAPHQL-FINAL-MISSING §Axis 9 |
| 8 | run-llama/liteparse | L4.5 | 5,136 | **STUDY-PILOT** Apache-2.0 verified | GRAPHQL-FINAL-MISSING §Axis 9 |
| 9 | microsoft/agent-framework | L6.0 | 10,479 | **STUDY-PILOT** MIT verified | GRAPHQL-FINAL-MISSING §Axis 12 |
| 10 | UfoMiao/zcf | L2.0 | 5,994 | **STUDY-PILOT** MIT verified | GRAPHQL-FINAL-MISSING §Axis 7 |

## 🛑 PART-quarantine list (fix14c hallucination audit)

5 rows marked for quarantine from PART files (per `06-fresh-research-delta/HALLUCINATION-AUDIT-PARTS-2026-05-16.md`):

| Repo | PART | Issue | Recommended replacement |
|---|---|---|---|
| `haotian-liu/LLaVA-NeXT` | PART3 | Path mismatch | `haotian-liu/LLaVA` 24.8k★ |
| `modal-labs/modal` | PART4 | Path mismatch | `modal-labs/modal-client` (only 473★ — below 1k tier, drop) |
| `THUDM/CogAgent` | PART2 | Likely confused | `THUDM/CogVLM` |
| `CopilotKit/generative-ui` | PART2 | Below 1k actual | Drop from ≥1k tier |
| `mistralai/client-python` | PART4 | Below 1k actual | Drop from ≥1k tier |

## 🛑 fix13 RETRACT-ARCHIVED additions

| Repo | Reason | Was at |
|---|---|---|
| intel/ipex-llm 8,803★ | Vendor abandonment | L0.25 candidate |
| Mintplex-Labs/vector-admin 2,228★ | Archived | L0.0 candidate |

## 🆕 fix16-18 closing-wave net-new (~123 additional ≥500★ repos)

### fix16 Chinese+Multilang — 7 NEW-P0 (`06-fresh-research-delta/GRAPHQL-CHINESE-MULTILANG-2026-05-16.md`)

| Repo | Stars | Layer | Why P0 |
|---|---|---|---|
| isaacphi/mcp-language-server | 1,527 | L0.4 | **HIGHEST CC-FIT** — LSP→MCP bridge |
| Tencent/WeKnora | 15,069 | L0.3 | Self-maintaining Wiki — fills Karpathy §5 gap |
| alibaba/page-agent | 17,877 | L2.5b | NL→GUI MCP |
| bytedance/trae-agent | 11,553 | L2.4 | SWE-agent (Aider peer) |
| safishamsi/graphify | 48,519 | L0.4 | multi-CLI skill `[MARKETING-LANGUAGE]` |
| Ataraxy-Labs/sem | 2,006 | L0.4+L6 | semantic VCS for agents |
| Ataraxy-Labs/weave | 1,007 | L0.6 | entity-level git merge (~95% conflict reduction) |

### fix17 Niche 500-1k★ — top 5 of ~64 net-new (`06-fresh-research-delta/GRAPHQL-NICHE-500-1K-2026-05-16.md`)

| Repo | Stars | Layer | Why |
|---|---|---|---|
| modu-ai/moai-adk | 1,010 | L6.0 | SPEC-First CC ADK — most-direct full-stack competitor |
| SecretiveShell/MCP-Bridge | 925 | L0.7 | openAI-compat MCP bridge |
| microsoft/prompty | 1,212 | L4 | MS-official prompt asset format |
| iwe-org/iwe | 1,028 | L4.0 | LSP+MCP+PKM hybrid |
| cvs-health/uqlm + JudgmentLabs/judgeval | 1,150 + 1,035 | L4 | UQ + RL-grounded eval |

### fix18 Hardware/Runtime — catalog-OMISSION + 5 new sub-layers (`06-fresh-research-delta/GRAPHQL-HARDWARE-RUNTIME-2026-05-16.md`)

| Sub-layer | Anchor | Stars | Status |
|---|---|---|---|
| **CATALOG-OMISSION FIX** | mozilla-ai/llamafile | 24,449 | Apache-2.0 single-file Cosmopolitan binary — MUST add L0.25 row |
| **§L0.25g Mobile-Edge** | qualcomm/nexa-sdk + cactus | 8k + 5k | NEW sub-layer (9 net-new ≥1.5k★) |
| **§L0.25h Quant-Tooling** | intel/neural-compressor + GPTQModel | 2.6k + 1.1k | NEW sub-layer |
| **§L0.25i Spec-Decode** | SafeAILab/EAGLE + Tencent/AngelSlim | 2.3k + 1.2k | NEW sub-layer |
| **§L0.25j Sub-Watt** | microsoft/BitNet + alibaba/MNN | 39k + 15k | NEW hardware-class |
| **§L0.25k LoRA-Training** | hiyouga/LlamaFactory + ms-swift | 71k + 14k | NEW sub-layer |

## ⚠️ SATURATION — heuristic, not proof (fix17/18 honest correction)

The earlier "3 saturation-confirmed axes" claim (fix13) was **overstated** per codex T1 fix15 audit. A single GraphQL topic-filter probe is NOT proof of absence. Honest state:
- **~90% coverage at ≥2k★ tier** · **~75-80% at 500-2k★ tier**
- fix15-18 closing wave surfaced **~178 net-new ≥500★** the fix1-13 sweep missed
- L1.0 Gateway / L1.5 Compression / L5.0 Security showed zero net-new in their specific probes — but this is **heuristic, not proof** (topic-tag adoption bias is systemic)
- **Operator guidance**: treat catalog as living discovery surface; re-probe quarterly per layer

## 🔍 How to use this catalog

**TL;DR**: Read `00-MASTER/THE-ULTIMATE-MASTER-2026-05-16.md` first (Phase 0/1 install plan).

**Top-tier "best of" filter**: Read `00-MASTER/THE-GRAND-CATALOG-MATRIX-2026-05-16.md` (308 rows, sum/80 sorted).

**Per-layer comprehensive search**: Read the appropriate PART file from §"Layer-to-PART navigation" above.

**fix13-18 GraphQL closing-wave net-new**: 4 files — GRAPHQL-FINAL-MISSING (fix13) + GRAPHQL-CHINESE-MULTILANG (fix16) + GRAPHQL-NICHE-500-1K (fix17) + GRAPHQL-HARDWARE-RUNTIME (fix18) in `06-fresh-research-delta/`.

**Auditors wanting fix-forward audit trail**: Read `THE-ULTIMATE-MASTER §6` (18 fix-forward rounds) + `05-codex-consults/CODEX-T1-FIX13-VERDICT-2026-05-16.md`.

## ⚡ Single operator commit command

```bash
git add docs/grand-synthesis-2026-05-16/ && git commit -m "feat: grand-synthesis-2026-05-16 V-FINAL fix18 — 18 fix-forward rounds, 59 forks, ~2,000 repos D1-D8 scored, 4-PART catalog + 4 GraphQL deep-probes + codex T1 audit"
```
