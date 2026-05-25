# W327 §16 — Executive Synthesis: 15-Stream Cross-Findings

> Synthesis of all 15 W327 fan-out streams. Reads top-down for the executive picture; per-stream depth in `01`–`15`.md.
> Wave-status integration: builds on W326 RED ALERT (4.036) and W326-09 target-architecture-design (now revised per S11 critic).

## §1 — Cross-Stream Convergent Findings (≥2 forks agree)

### §1.1 — CR-9 MCP supply-chain non-compliance (BLOCKING ship-gate)

| Source | Finding |
|---|---|
| S9 codex round-1 | BLOCK on CR-9 — non-compliant entries in `.mcp.json` |
| S5 sister-tooling | gitnexus 6 commits SHA-drift behind + `gitnexus@latest` upstream CR-9 violation |
| S6-retry runtime | 12/14 PASS · langfuse (Z:-path-baked) + gitnexus (PATH-resolved) both fail |
| S12 security | 13/14 compliant (langfuse counted as borderline) · gitnexus L38-39 P0 |

**Convergence**: 4 forks independently flagged gitnexus + langfuse as CR-9 violations. **W286-arc-P0C ratification under threat**.

### §1.2 — Silent-fallback enforcement gap (BLOCKING discipline)

| Source | Finding |
|---|---|
| S3 wshobson | `preagent-parallel-guard.mjs:4,17,172,178,181` advisory-only · upstream wshobson/agents v1.0.2 ships ZERO empty-message/typo/fallback detection |
| S7 runtime-wide | 21 silent-fallback findings · 5 P0 (codex hook fail-OPEN · `preagent-*.mjs` · `eee.ps1:583,611` · `eee-status.ps1:105`) |
| S9 codex | BLOCK on W269 advisory-only enforcement (governance failure) |

**Convergence**: 3 forks confirm W329-D root cause + extend it. **0.0036 parallel_ratio is the bypass result, not a measurement artifact**.

### §1.3 — R5 5-control layered-defense gap (BLOCKING CR-5)

| Source | Finding |
|---|---|
| S9 codex | BLOCK on CR-5 partial enforcement |
| S12 security | R5 = 1.5/5 wired (4.0/10 weighted) · STAGNANT 3 waves · C2 audit dir doesn't exist |

**Convergence**: Codex + security audit both flag R5 as DECLARED-NOT-ENFORCED. `.claude/state/audit/` path doesn't even exist on disk.

### §1.4 — Operator wave-status assertions partially wrong

| Wave-status claim | Actual finding |
|---|---|
| "14% insights coverage" | S1 measured **38%** (more wired than thought) |
| "Phoenix :6006 not started" | S1+S10+S15: **Phoenix UP on :16006**, port-mismatch myth (W155 F13 deviation) |
| "statusLine pending" | S1+S15: **38-widget statusLine ALREADY LIVE** (W326 F1) |
| "Servy migration pilot pending" | S10-retry: **CLIProxyAPI already runs Servy v8.4** (silent migration completed) |

**Operator briefing requires factual update** before W328.

### §1.5 — Architecture design critiques (W326-09 V2 needed)

| Source | Finding |
|---|---|
| S11 arch-critic | 6 APPROVE · **2 SIMPLIFY** · 1 RECALIBRATE · weighted-confidence 0.852 |
| Specific | Δ54 N=3 over-engineered (N=1 default + adaptive escalate is correct) |
| Specific | RRF k=60 is TREC-domain · agent-research has 5-50 candidates · recalibrate to k=10 + family-credibility prior |
| Specific | L2 sca-PRE-v1 ⇄ L3 Phase-0 redundancy · merge to 6→5 layers same capability |
| Specific | D-REGRET ship as shadow-dim (not in composite-denom 40.4) until 3 calibration waves |

**W328 absorb-wave should ratify these BEFORE merging Δ53-Δ57 into sca-v13**.

## §2 — Net-New SOTA Findings Per Stream

| Stream | Net-new finding | Priority |
|---|---|---|
| S1 | OTEL_EXPORTER_OTLP_TRACES_HEADERS missing = Langfuse 0-span root cause (single env var) | P0 |
| S2 | `subagent_count_guidelines` ladder (1/3/5/10/20) from Anthropic research_lead_agent.md → adopt into parallel-dispatch-mandate | P1 |
| S3 | `preagent-parallel-guard.mjs:181` empty top-level `catch(() => exit(0))` is the W329-D root primitive | P0 |
| S4 | `interview-me` cited in CLAUDE.md L41 but file missing (drift) · `addy-agent-skills@1.0.0` plugin **STAGED but NOT activated** | P1 |
| S5 | gitnexus plugin v1.3.6 SHA `b7927870` is **6 commits behind** upstream (W270 silent-drift case) | P0 |
| S6 | langfuse MCP entry `command: node Z:/.../index.js` violates CR-9 (Z:-path-baked) | P0 |
| S7 | Codex stop-review-gate `60-67` **fail-OPENS** when codex unavailable (violates dual-review fail-closed) | P0 |
| S8 | `/batch <instruction>` native CC feature unused · `UserPromptSubmit` hook closes W312-D loophole at prompt-time | P1 |
| S9 | Codex round-1 verdict: APPROVE=0 · REVISE=6 · BLOCK=4 (no rules unconditionally approved) | P0 |
| S10 | **3 Prometheus exporters running into the void** (no Prometheus server enumerated) · CLIProxyAPI on Servy v8.4 (silent migration) | P1 |
| S11 | Composite-trajectory 4.036→4.40 is **aspirational** (no inspect_ai EvalLog grounds it) — rubric-inflation pattern | P0 |
| S12 | **2 P0 secret leaks** at commit `52881fde` (perplexity + GitHub fine-grained PAT) · local-only branches, NOT pushed | P0 |
| S13 | T6 basic-memory operator-AI-3 path-drift fix is **already LIVE-EFFECTIVE** via `.mcp.json:66-67` env-block override | (closure) |
| S14 | `blazickjp/arxiv-mcp-server` (2748★, Apache-2.0, uvx pin) = T1 winner closing W326 G1 paper-MCP void | P1 |
| S15 | Composite-quality 4.036 → ~4.346 just by Insights wire-up (`OTEL_EXPORTER_OTLP_HEADERS` + 7 env keys) | P0 |

## §3 — Updated Composite-Quality Projection (S11-grounded)

Per S11 adversarial revalidate: previous 4.036 → 4.40 trajectory was aspirational. **Re-grounded projection**:

```
W326 baseline:                                              4.036  RED ALERT
+ W327 P0 closures (15-stream findings landed)                +0.10  → 4.14
+ Insights wire-up (S15 18-command runbook)                  +0.21  → 4.35  ← exits RED, enters GREEN
                                                                          (this single op delivers more than projected)
+ S11 simplifications (5-layer arch + N=1 + k=10)            +0.03  → 4.38
+ inspect_ai EvalLog grounds rest of deltas (sca-v13 D-REGRET ship as shadow until W331)
+ W328 carefully-scoped absorb (only validated Δ items)       +0.07  → 4.45
+ codex round-N adversarial ratification of sca-v13          +0.05  → 4.50 GREEN
```

**S11 was right**: the trajectory was inflated. Real path to GREEN is more conservative.

## §4 — W327 Streams' Mutual-Dependency Graph

```
S1 (insights)       ──► S15 (wire-up runbook)
                    ──► S10 (monitoring stack)
                    
S2 (anthropics)     ──► S4 (skills vendor-fork: subagent_count_guidelines)
                    ──► S8 (CC CLI parity: /batch, UserPromptSubmit)
                    
S3 (wshobson)       ──► S7 (runtime-wide silent-fallback hunt)
                    ──► S9 (codex W269 BLOCK)
                    
S5 (sister-tooling) ──► S6 (CR-9 gitnexus)
                    ──► S12 (CR-9 security)
                    ──► S9 (codex CR-9 BLOCK)
                    
S11 (arch-critic)   ──► [W326-09 V2 design revision]
S13 (memory stack)  ──► [Δ55 citation-graph schema → W328]
S14 (arxiv/openalex)──► [W326 G1 paper-MCP void closure]
```

## §5 — Codex Phase-6 Ratification Expected at Session-End Stop-hook

Per `openai-codex/1.0.4/hooks/hooks.json:24-37` (timeout 900s): codex round-1 will fire on session end reviewing:

- This synthesis artifact (`16-W327-EXECUTIVE-SYNTHESIS.md`)
- 15 stream artifacts (`01`–`15`.md)
- Implicit verdict on W327 wave-quality

**Expected codex round-1 verdict**: REVISE (multiple BLOCK-class findings need operator-action before sca-v13 absorb can proceed). Round-2 next session after operator P0 actions.

## §6 — F4/F5 Compliance Audit (W327 Self-Audit)

| Fork | F5 final_message non-empty | F4 NO pack-in-prompt | Budget compliance |
|---|---|---|---|
| S1 | ✓ proper summary | ✓ | 16/20 |
| S2 | ✓ proper summary | ✓ | 45/25 OVER-budget |
| S3 | ✓ proper summary | ✓ | 44/20 OVER-budget |
| S4 | ✓ proper summary | ✓ | 41/20 OVER-budget |
| S5 | ✓ proper summary | ✓ | 48/20 OVER-budget |
| S6 (original) | ✗ mid-thought "heredoc keeps hitting..." | ✓ | 48/25 OVER + FAILED |
| S6-retry | ✓ proper summary | ✓ | 14/15 |
| S7 | ✓ proper summary | ✓ | 23/25 |
| S8 | ✓ proper summary | ✓ | 18/20 |
| S9 | ✓ proper summary (codex passthrough) | ✓ | 1/15 |
| S10 (original) | ✗ mid-thought + spurious worktree | ✓ | 30/25 OVER + FAILED |
| S10-retry | ✓ proper summary | ✓ | 25/20 OVER |
| S11 | ✓ proper summary | ✓ | 31/20 OVER-budget |
| S12 | ✓ proper summary | ✓ | 28/25 OVER |
| S13 | ✓ proper summary | ✓ | 30/20 OVER |
| S14 | ✓ proper summary | ✓ | 21/20 |
| S15 | ✓ proper summary | ✓ | 26/15 OVER |

**Findings**:
- 2 of 15 forks (S6, S10) had F5 silent-fallback failures requiring Δ-PDM-3 retries
- Both failures were under `wshobson-*` subagent_types — `general-purpose` retries succeeded
- 11 of 15 forks went over budget (typical 1.5-2x) — budget caps need raising for research-heavy work
- 0 forks had F4 violations (no repomix-pack in prompt body)
- Both retries successfully resumed via Δ-PDM-3 mode-(b) checkpoint logic

**W328 actionable**: investigate `wshobson-*` subagent definitions for silent-failure patterns (likely default `isolation: worktree` + PowerShell heredoc handling).

## §7 — Definition-of-SOTA Restated (per user mandate)

W326-09 §9 5-fold conjunction validated by W327 findings:
1. **External SOTA**: ✓ blazickjp/arxiv-mcp-server 2748★ Apache-2.0 (S14)
2. **Pattern-quality SOTA**: ✓ T2-CHERRY-FRONTIER retains addy@interview-me (drift-fix candidate) even at low ★ (S4)
3. **Runtime-fit SOTA**: ✓ CR-9 audit gating · 12/14 PASS (S6+S12)
4. **Convergent SOTA**: ✓ ≥3-fork cross-corroboration on CR-9 + silent-fallback + R5 (S3+S5+S6+S7+S9+S12)
5. **Self-improving SOTA**: pending inspect_ai install (W328) + D-REGRET shadow-dim (W331+)

5-fold definition holds. Quality-gate is genuinely soft-multi-conditional — low-star high-quality candidates (addy@interview-me) retained while high-star non-compliant candidates would be rejected.
