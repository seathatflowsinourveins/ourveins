# W259-v16 — All-Layers Coverage-Audit Master Synthesis

> The definitive answer to the operator's standing question: *"are you sure the catalog includes every SOTA repo, in every layer?"*
> Method: 7 parallel coverage audits (1 memory + 6 layer-groups), each cross-checking the W259 catalog against live GitHub-MCP repo discovery (~340 SOTA repos checked). `effective_tier = TIER-3-LOCAL-COMPOSITION`. Date: 2026-05-17.

## §1 — Verdict per field

| Layer | Field | Catalogued | SOTA checked | Genuine gaps | Status |
|---|---|---:|---:|---:|---|
| L0 | RAG / Retrieval substrate | 40 | 48 | 2 | SATURATED (production tier) |
| L0.4 | Version-Control substrate | 25 | 30 | 1 | SATURATED |
| L0.5 | Security / DevSecOps | 15 | 24 | 2 | SATURATED |
| L1 | LLM Routing / Gateway | 8 | 13 | 2 | well-covered |
| L1.5 | Memory / RAG engines | 49 | 50 | 0 | SATURATED |
| L2 | Agent Orchestration | 22 | 30 | 4 | near-saturated |
| L2.5 | Knowledge / Structured-Output | 21 | 38 | 0 | SATURATED |
| L3 | Peer coding CLIs | 17 | 38 | 1 | SATURATED (adoption) |
| L4 | Eval / Observability | 32 | 38 | 6 | near-saturated |
| — | Behavioral / CC ecosystem | 22 | 65 | 5 | near-saturated |
| | **TOTAL** | | **~340** | **22 distinct** | |

(`prek` spans L0.4 + L0.5 → 23 per-field entries, 22 distinct repos.)

## §2 — The 22 genuine gaps — consolidated + scored

All 22 are catalog-**completeness** omissions. None is an install-grade miss; none changes a W259 install pick.

| # | Repo | Layer | Stars | Score | Native-CC | Disposition |
|---|---|---|---:|---|---|---|
| 1 | `agno-agi/agno` | Orchestration | 40k | ~84 | no | T2 STUDY-PILOT |
| 2 | `langchain-ai/deepagents` | Orchestration | 23k | ~83 | no | T3 CITE-PATTERN (catalog had only the weaker third-party derivative) |
| 3 | `mastra-ai/mastra` | Orchestration | 24k | ~82 | no | T2 STUDY-PILOT |
| 4 | `strands-agents/sdk-python` | Orchestration | 5.9k | ~81 | no (AWS-official) | T2 STUDY-PILOT |
| 5 | `HKUDS/LightRAG` | RAG/Retrieval | 35k | T2/T3 | no | scored-row add (was discovery-listed, never tiered) |
| 6 | `HKUDS/RAG-Anything` | RAG/Retrieval | 20k | T2/T3 | no | scored-row add (multimodal RAG, MIT) |
| 7 | `raga-ai-hub/RagaAI-Catalyst` | Eval | 16k | T2 | no | scored-row add (out-stars catalogued DeepEval) |
| 8 | `Not-Diamond/self-care` | Eval | — | T2-pilot/T3 | **yes — CC plugin** | maintenance-frozen → cite, not install |
| 9 | `Kiln-AI/Kiln` | Eval | — | T3 | partial (MCP) | named-candidate (MIT, Windows-native) |
| 10 | `evidentlyai/evidently` | Eval | — | T3 | no | named-candidate |
| 11 | `langwatch/langwatch` | Eval | — | T3 | no | named-candidate |
| 12 | `evilmartians/agent-prism` | Eval | — | WATCH | no | marginal — strong-org flag only |
| 13 | `QwenLM/qwen-code` | Peer CLI | — | T4 WATCH | CLI | weaker fork of catalogued gemini-cli (37.5% vs 82% Terminal-Bench) |
| 14 | `gsd-build/get-shit-done` | Behavioral | 63k | ~78 | skill/system | T2/T3 (operator-named in directive) |
| 15 | `ComposioHQ/awesome-claude-skills` | Behavioral | 60k | ~73 | discovery feed | T3 |
| 16 | `jarrodwatts/claude-hud` | Behavioral | 23k | ~75 | CC plugin | T2/T3 |
| 17 | `OthmanAdi/planning-with-files` | Behavioral | 21k | ~74 | CC skill | T2/T3 |
| 18 | `yusufkaraaslan/Skill_Seekers` | Behavioral | 14k | ~72 | skill meta-tool | T3 |
| 19 | `j178/prek` | Security + VC | 7.6k | STUDY-PILOT | partial (ships agent skill) | **highest-fit gap for this runtime** |
| 20 | `tensorzero/tensorzero` | LLM Routing | 11k | T2 | no | STUDY-PILOT (2nd-most-starred OSS gateway after LiteLLM) |
| 21 | `opengrep/opengrep` | Security | 2.6k | STUDY-PILOT | direct-CLI | license-clean Semgrep fork (post Jan-2025 relicense) |
| 22 | `envoyproxy/ai-gateway` | LLM Routing | 1.6k | WATCH | no | CNCF entrant — coverage-completeness |

## §3 — Bottom line

1. The W259 catalog is **SATURATED at the install / production tier** — every SOTA install-grade primitive, in every layer, is catalogued. 7 audits, ~340 SOTA repos checked via live GitHub discovery.
2. **0 of the 22 gaps change the install set. 0 overturn an install decision.** All 22 are completeness omissions at WATCH / STUDY-PILOT / CITE-PATTERN tier.
3. The 22 are now folded into the catalog: scored in the 6 coverage receipts (`08-coverage-audit-W259v16/`) + this synthesis + appended to `05-scoring/MASTER-SCORING-MATRIX-W259.md` (§ W259-v16 Coverage-Audit Additions).
4. **Highest-fit gap for this runtime**: `j178/prek` — a Rust drop-in `pre-commit` replacement (single binary, no Python, Windows-native, ships an agent skill, supply-chain-hardened). This runtime runs `pre-commit`; prek is a credible future swap. Recommended STUDY-PILOT — not an immediate install (the current `.pre-commit-config.yaml` works correctly).
5. The one gap with a genuine native-CC pathway: `Not-Diamond/self-care` (an official CC plugin that analyses Claude Code agent traces) — but maintenance-frozen, so cite-tier, not an install.

**Definitive: the catalog covers the field.** "Research beyond" is complete — no install-grade SOTA repo is missing in any layer. What remains is bookkeeping, now done.

## §4 — Hygiene (flagged by the audits)

- `crush` — catalog org-string corrected: `charm-and-friends` → `charmbracelet`.
- `Roo-Code` — now ARCHIVED on GitHub → existing REJECT disposition reinforced.
- `MemoClaw/Eve` — no resolvable GitHub identity → REJECT-noise (correctly excluded; not a gap).
- `rohitg00/awesome-claude-code-toolkit` — SKIP-grade: it bundles `.claude/rules/` self-invent, exactly what this runtime's cardinal-rule-4 forbids. Do not adopt patterns from it.
- `garrytan/gstack` (98k★) — SKIP-grade celebrity persona-bundle, no engineering substance.
