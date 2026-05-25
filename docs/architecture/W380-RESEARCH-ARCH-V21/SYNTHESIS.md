# W380 — sca-v21 Synthesis: Research-Architecture Self-Evolution

> **Cite-anchors** (sca-v13 ≥3-org floor): OSSF `https://github.com/ossf/scorecard` · deps.dev `https://api.deps.dev/v3` · OSV `https://osv.dev` · GitHub GraphQL `https://docs.github.com/en/graphql` · arXiv:2507.21678 · Anthropic `https://docs.claude.com`

**Date:** 2026-05-23 · **Inputs:** 4 parallel multi-MCP research streams (A research-of-research · B discovery sweep · C schema/scorer · D decision-effectiveness). Stream docs: `tmp/W380-research/STREAM-{A,B,C,D}.md`.

## Convergent core finding (all 4 streams, independently)

**The research architecture is a well-designed rubric + telemetry ledger that has NEVER EXECUTED.** sca-v20's 19-dim/8-cluster model is sound in *design* but: (a) the scorer `sca-v20-evaluate.mjs` was never built [C,D]; (b) the decision-outcomes ledger `.claude/state/sca-decision-outcomes.json` doesn't exist [C,D]; (c) **zero** of the ~12 historical verdicts actually used v20 — they used sca-v3.1/v7 or pure deepwiki prose [D]; (d) in practice tier-routing keyed almost entirely on **D13 install-path** while D06/D08/D10/D11/D15 were declared-but-never-measured [D]. **v21 = make it executable + calibrated + comprehensive + provenance-hardened — NOT a redesign of the (good) soft-gate model.**

## v21 design (multi-stream-converged)

### V21-1 — Executable scorer `tools/sota-discovery/sca-evaluate.mjs` (THE gap) [A,C,D converge]
ESM module + `lib/fetchers/*`. 5-phase convergence-gated MCP orchestration (~11 calls/repo, 0 on cached re-score). Input: repo `owner/name` OR discovery query → fetch dims → per-class scores → emit sca-v21 verdict JSON (schema-validated). Per-dim cite-anchoring enforces the 3-org-distinct floor via distinct-hostname count. **Highest priority — without it the whole architecture is theoretical.**

### V21-2 — Dimension delta 19→24 (converged set; net +5, −1)
| Dim | Source endpoint (verified live 2026-05-23) | Streams | Note |
|---|---|---|---|
| **D20** transitive-dep-health | `api.deps.dev/v3` | A,C,D | free CC-BY-4.0, batch |
| **D21** reverse-dependents / criticality | deps.dev + OSSF Criticality | A | the biggest INSTALL signal `stars` misses |
| **D22** OSV-CVE-density + **CISA-KEV hard-BLOCK** | `api.osv.dev/v1/query` | A,C,D | version-accurate vuln gate |
| **D23** data-egress / token-custody | manual+deepwiki rubric | D | the *actual* composio blocker — prose-only today |
| **D24** dependency-blast-radius / runtime-weight | deps.dev (dedup vs D20) | D | the *actual* neo4j-labs blocker — prose-only today |
| ~~D-bench~~ per-model agent-benchmark | — | C | **DROPPED** (scores models, not repos); salvage as optional gated scaffold-signal [A] |
| **D08 reframe** | OSSF Scorecard `api.securityscorecards.dev` | A | provenance = `verified-AND-pre-flight-clean`, NOT merely present (TanStack 2026-05-11: 84 malicious pkgs *with* valid SLSA-L3) |
| **D-MONITOR** bus-factor + cessation-prediction | github GraphQL + arxiv 2507.21678 (C-index 0.846) | A,D | operationalize MONITOR as temporal score-drift |

### V21-3 — GitHub GraphQL v4 migration [C,D]
Collapses ~6 REST calls → 1. **Directly fixes the dead-weight finding**: full-vector scoring becomes cheap, so D06/D08/D10/D11 stop being "declared-but-unmeasured."

### V21-4 — Calibration + ledger backfill [C,D]
(1) Backfill `.claude/state/sca-decision-outcomes.json` from the ~12 prose verdicts (T6 permalinks). (2) Fit **8 cluster-multipliers** (not 24 dim-weights) — L2-prior-toward-v20, LOO-CV, monotonicity constraints, ordinal mis-routing loss + MC weight-envelope for honest small-n uncertainty. (3) **Move codex-jury catches into the rubric** (the W379 jury REVISE@0.84 caught contract-risk the rubric missed) + **remove non-reproducible fudges** (OpenHands architect-veto, haizelabs ×0.85). Honesty clause: real tuning needs the 50-repo W259 backtest.

### V21-5 — Comprehensive discovery protocol + landscape gaps [B]
The landscape misses **category leaders**. Discovery protocol must: (a) per-layer GraphQL sweep + perplexity + exa + awesome-list mining; (b) cross-check each named-anchor against the category-leader; (c) emit a "MISSING-FROM-LANDSCAPE" gap report. **8 repos to evaluate-in (priority order):**
1. `anthropics/claude-agent-sdk-python` — runtime's OWN substrate SDK (must-track)
2. `mem0ai/mem0` + `letta-ai/letta` — 2026 memory leaders (stack cites cognee/graphiti only)
3. `PrefectHQ/fastmcp` + `modelcontextprotocol/servers` — MCP authoring + reference
4. `lastmile-ai/mcp-agent` — 6 workflow patterns (already a local skill)
5. `infiniflow/ragflow` — leading E2E RAG (dify's strongest peer ~70k)
6. `stanford-oval/storm` — multi-agent knowledge curation (vs gpt-researcher single-agent)
7. `sierra-research/tau2-bench` + `confident-ai/deepeval` — agent-trajectory + assertion eval
8. `VoltAgent/awesome-claude-code-subagents` + `0xfurai/claude-code-subagents` — largest curated subagent sets
Watch: MemTensor/MemOS, stanfordnlp/dspy, oraios/serena, upstash/context7.

### V21-6 — New research endpoints to wire [A,C,D]
All free/no-auth, live-probed HTTP 200: **deps.dev/v3, osv.dev, api.securityscorecards.dev, GitHub GraphQL v4** (core 4 — all 3 methodology streams converge). Optional: Semantic Scholar + arXiv (D06/D19 academic), Sourcegraph (code-search usage), ecosyste.ms (cross-registry), endoflife.date (runtime-EOL).

## Ranked roadmap (impact × feasibility)
1. **R-IMPL** executable scorer + GraphQL fetcher (unblocks everything) — HIGH×HIGH
2. **+D20/D21/D22 + OSSF Scorecard D08-reframe** (deps.dev/OSV/Scorecard — supply-chain + criticality + CVE) — HIGH×HIGH
3. **Ledger backfill + calibration** (8 cluster-multipliers) — HIGH×MED
4. **+D23/D24** (data-egress + blast-radius — the prose-only catches) — HIGH×MED
5. **Discovery-protocol + evaluate-in the 8 missing repos** — MED×HIGH
6. **MONITOR temporal-drift + cessation-prediction** — MED×MED

## Open questions for codex GPT-5.5 gate
1. Is the 8-cluster-multiplier calibration on n=12 statistically defensible, or should weights stay frozen-at-v20-defaults until the 50-repo backtest exists (over-fit risk)?
2. D24 (blast-radius) vs D20 (transitive-dep-health) overlap — is the de-dup cap sufficient, or merge them?
3. Is dropping per-model agent-benchmark correct, or is the gated scaffold-signal worth the complexity?
4. Provenance-reframe (demote bare SLSA-L3 to neutral) — does this weaken CR-1, or correctly harden it?
5. Scope: ship R-IMPL + core-4-endpoints + D20-22 first (MVP), defer calibration/D23-24/discovery-protocol to v21.1?
