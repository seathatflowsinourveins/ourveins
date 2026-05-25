# W326 §06 — Consolidated Gap Analysis (Cross-Stream Synthesis)

> Synthesis of gaps surfaced by W326 fan-out (forks 1-6 + retry).
> Each gap: G-N · priority (P0/P1/P2) · source-fork · impact-class · suggested-resolution-pointer.
> Cross-references: `00-INVENTORY.md` · `01-SOTA-RESEARCH-DISCOVERY-REPOS.md` · `02-SOTA-REPO-QUALITY-GATES.md` · `03-MULTI-ANGLE-CONVERGENCE-PATTERNS.md` · `04-SELF-IMPROVING-RESEARCH.md` · `05-CC-PATHWAY-SCORING-FRAMEWORK.md`.

## §1 — P0 Gaps (block next install wave OR violate cardinal rules)

| # | Gap | Source fork | Impact class | Resolution pointer |
|---|---|---|---|---|
| **G1** | NO arXiv/Semantic Scholar/OpenAlex/Crossref MCP — paper discovery is hf-mcp partial mirror only | Fork-1 | Research-blind to ~95% academic corpus; sca-v12 D43 perplexity-equivalent floor unmet | Stage-pilot `arxiv-mcp-server` (blazickjp) or `openalex-mcp` in W327; CR-9 npx-pin discipline applies |
| **G2** | NO closed-loop research-quality eval; verdicts proved wrong months later go unsignaled (no D-REGRET dim in sca-v12) | Fork-1 + Fork-5 | sca-v12 self-improvement broken; no feedback signal | `inspect_ai` (UK AISI, MIT) install + replayable EvalLog + new D-REGRET dim in sca-v13 |
| **G3** | parallel_ratio 0.0036 vs ≥0.7 W269 target (denom 1676 = 99.6% silent-serial fallback = SEV-1); W329-D root cause identified: `tools/preagent-parallel-guard.mjs:4,17` hardcoded advisory-only `exit 0` — hook detects but cannot block | Fork-1 + W329-D | W269 mandate systemic violation; today's session 6 PreToolUse advisories confirm detection-without-enforcement pathology | **P0-A fix**: patch `preagent-parallel-guard.mjs:4,17` to block on 2nd violation per session (per CLAUDE.md L13 W329-D proposal); ALSO wire `tools/parallel-ratio-telemetry.mjs` to Stop-hook auto-fire per W325-A F1 SEV-1 closure |
| **G4** | NO composite `research-orchestrator` skill — sca-v12 + parallel-dispatch-mandate + mem-recall + durable-planning must each be manually invoked | Fork-1 | Discipline-stack easy to skip on user prompts that don't trip per-skill trigger | New `.claude/skills/research-orchestrator/SKILL.md`, description-match on "research X" / "find SOTA" / "audit" / "evaluate" |
| **G5** | `sca-PRE-v1` (6-dim 5-min pre-screen) designed but NOT yet wired into sca-v12 as Phase-0 escalation router | Fork-6 | ~6.6 hr/wave saved at 60% T4/T5 filter rate left on table | Wire sca-PRE-v1 → sca-v12 Phase-0 pre-route in `.claude/skills/sota-convergence-audit/SKILL.md` |
| **G6** | Phase-1 multi-MCP cascade is UNRANKED-UNION (no RRF post-merge); top candidates buried by MCP-family popularity bias | Fork-4 (P2) | T1 candidates ranked behind high-volume irrelevant hits; anti-bias mandate partially defeated | Δ53 sca-v13 absorb: RRF (Reciprocal Rank Fusion) post-cascade with k=60 default |
| **G7** | perplexity_research key leaked W317-r2 SEV-1 unrotated; tavily + exa keys staged but unpopulated | Fork-1 + Fork-3 + Fork-4 + Fork-5 | Deep-research-trio blocked; cascade_degraded=TRUE on 4 of 6 W326 forks; tier-ceiling capped at T1-PROV | Operator: rotate perplexity key + populate TAVILY/EXA env vars in `CLAUDE.local.md` (already staged §f3) |

## §2 — P1 Gaps

| # | Gap | Source | Resolution pointer |
|---|---|---|---|
| **G8** | No nightly Pareto evolution of `.claude/skills/**/SKILL.md` descriptions → description-rot drift | Fork-5 | `gepa-ai/gepa` (MIT, ICLR 2026 Oral, 3582★) T2 VENDOR-FORK in W329; 4-wave soak → T1 |
| **G9** | NO MCP-server-quality-meta gate — closes claude-code#53386 provenance gap | Fork-3 (C7 class) | `mcprated` MCP T1 INSTALL + new D-MCPM dim in sca-v13 |
| **G10** | Skill auto-fire patterns drift as user language evolves (e.g. "audit" vs "review" vs "evaluate") | Fork-5 | gepa-ai/gepa Pareto evolution covers; per-wave description-audit script |
| **G11** | NO DRA (Distributed Resilient Agent) failure-taxonomy enumeration in sca-v12 §5 skip-class | Fork-5 | DeepVerifier DRA Failure Taxonomy (arXiv 2601.15808 Jan 2026) T3 PATTERN-STUDY → sca-v13 §5 expansion |
| **G12** | Citation-graph topology NOT persisted to T6 basic-memory — provenance trail rebuilt every wave | Fork-4 (P4) | Δ55 sca-v13 absorb: extend Δ51 markitdown probe-record to graph-edge write |
| **G13** | Position-swap is single-iteration (sca-v12 Δ50); SOTA is Layer(N)>>MaxPoolUnit ensemble | Fork-4 (P8) | Δ54 sca-v13 absorb: promote Δ50 to N=3 default with Borda-vote aggregation |
| **G14** | 11-row verdict table only filled at 5/11 MCP-family floor (cascade_degraded=true blocks T1 promotion) | Fork-2 | Re-cascade in W327 after G7 key-rotation; promote 11 candidates to full T1 evaluation |

## §3 — P2 Gaps (watch-list, deferred)

| # | Gap | Source | Resolution |
|---|---|---|---|
| **G15** | `repostatus.org` lifecycle classification not surfaced in sca-v12 D2 governance | Fork-3 | T4 CITE-ONLY in sca-v13 D2 evidence-base extension |
| **G16** | OpenSSF Best-Practices badge not auto-probed in D-EMP HARD GATE | Fork-3 | T3 PATTERN-STUDY → optional D-EMP probe-family addition |
| **G17** | `chaoss/grimoirelab` community-health metrics not folded into Δ52 corroboration | Fork-3 + Fork-4 | Already cited as Δ52 anchor; integration probe deferred to W330 |
| **G18** | `bestofjs.org` curation methodology not surfaced in D12 stars sub-signal | Fork-3 | T4 CITE-ONLY in sca-v13 D12 anti-bias evidence |
| **G19** | 4 disagreements flagged in Fork-2 verdict table NOT yet codex-mediated | Fork-2 | Phase-6 codex round-1 runs at session-end Stop-hook; mediation auto-fires |

## §4 — Quantified Impact Summary

- **7 P0 + 7 P1 + 5 P2 = 19 gaps surfaced**
- Closing all P0s unblocks T1 INSTALL across W327 (re-cascade at full 11-family floor)
- `sca-PRE-v1` (G5) alone delivers ~6.6 hr/wave at 60% filter rate per Fork-6 estimate
- `gepa` (G8/G10) Pareto evolution: empirically +18% on RAG/agent benchmarks per arXiv 2507.19457
- `inspect_ai` (G2) replayable EvalLog converts opaque verdicts → audit-replayable ground-truth
- Operator key-rotation (G7) raises cascade_degraded from ~80% W326 → ≤20% W327

## §5 — Per-Fork Gap-Origination Map (audit trail)

```
Fork-1 (inventory)      → G1, G2, G3, G4, G7
Fork-2 (research-repos) → G14, G19
Fork-3 (quality-gates)  → G9, G15, G16, G17, G18
Fork-4 (convergence)    → G6, G12, G13
Fork-5 (self-improving) → G2 (joint), G8, G10, G11
Fork-6 (CC-pathway)     → G5
```

Phase-2 cross-source triangulation (sca-v12 §2): G2 + G7 both surfaced independently by ≥2 forks (≥3-org-distinct sources met for any P0 claim).

## §6 — Cascade-Degraded Audit (sca-v12 I4 enforcement)

| Fork | cascade_degraded | MCP-families fired | Cap |
|---|---|---|---|
| 1 (inventory) | false | n/a (internal-read) | n/a |
| 2 (research-repos, RETRY) | TRUE | 5/11 | T1-PROV ceiling |
| 3 (quality-gates) | TRUE | 7+ (tavily disabled) | D5 cap at 4 |
| 4 (convergence) | TRUE | perplexity_research 300s timeout + WebFetch ctx-hook block | D5 cap at 4 |
| 5 (self-improving) | TRUE | perplexity_research timeout + tavily disabled | D5 cap at 4 |
| 6 (CC-pathway) | false | 5/5 floor met | n/a |

Net: 4 of 6 forks ran cascade-degraded — **G7 operator-action is the single highest-leverage P0** (one key rotation closes the systemic cascade-cap).
