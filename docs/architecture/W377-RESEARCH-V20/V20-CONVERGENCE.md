# W377-RESEARCH-V20 — Convergence Record

**Status**: SYNTHESIS-V20 CONVERGED at codex GPT-5.5 V20-r2 APPROVE 0.89 (HEAD `0e928df`, revision-v15) on 2026-05-23. Pending operator-sign for promotion to canonical research architecture.

## Convergence Path

| Round | Verdict | Conf | Findings |
|---|---|---|---|
| V20-r1 | NEEDS-REVISION | 0.91 | 7 P0 + 2 P1 — backward-compat false, popularity-weight contradiction, unnormalized formula, Stage-5 cluster-vs-dim, verify-before-claim overclaims, soft-gate omits hard-block, no acceptance column, AJV not shown, cite-floor overstatement |
| V20-r2 | **APPROVE** | **0.89** | ALL 9 FIXED (v15) — none remaining |

## 6 META Streams (all DONE)

| Stream | Deliverable | Key Output |
|---|---|---|
| META-A | `META-A-SOTA-AGENT-ORCHESTRATION-2026.md` | 30 NEW candidate repos beyond W376 12-stream; 5 high-confidence recs (microsoft/agent-framework + dbos-transact-py + bytedance/deer-flow T1; stigmergy + Arbor T3) |
| META-B | `META-B-SOTA-RESEARCH-MCPS.md` | 15-MCP audit + 16 NEW research-MCPs + 4-stage Router→Fan-out→Scorer→Consenser (50% API + 70% latency reduction) |
| META-C | `META-C-MULTI-DIM-SCORING.md` + `sca-v20-multi-dim.schema.json` | 19-dim × 8-cluster; 4 per-class scores; stars informational-only; block/goose worked example |
| META-D | `META-D-INSTALL-VS-PATTERN-STUDY.md` | 4-class taxonomy + 7-stage decision-tree; 12/12 retroactive W376 alignment; niche-authority catalog |
| META-E | `META-E-V20-DELTA-SPEC.md` | v18→v20 delta + 10 gaps + 7 NEW pipeline stages + self-improvement loop; surfaced CLAUDE.md L60-66 ghost-references |
| META-F | `META-F-SOFT-GATE-QUALITY.md` | 5-tier soft-gate + 3-class adoption matrix; 10 live `gh API` case studies (9/10 over-rejected by hard-gate) |

## v15 Closure Detail (V20-r1 → V20-r2)

1. **Backward-compat** → "migration-required superset" (NOT auto-valid); migration via `tools/sca-v18-to-v20-migrate.mjs`
2. **Popularity weight** → 0.00 for INSTALL/PATTERN/CITE (informational-only); MONITOR-only drift; column sum=1.00
3. **Convergence formula** → normalized per META-B §3 (denominator + cite-cap 5 + 3-org-gate + memory-discount 0.5)
4. **Stage-5 routing** → "ALL INSTALL-row per-dimension thresholds pass" (not cluster aggregates)
5. **Verify-before-claim** → META-F downgraded to "spec/design landed via live-probe-in-session"; floating `@main` flagged
6. **Hard-block preamble** → Stage-1 short-circuit on CVE/malicious/fake-star/typosquat/archived/signed-fail/license
7. **Acceptance column** → §4 carry-forward table has Acceptance Criterion + Source Anchor for all 9 rows
8. **AJV honesty** → Python jsonschema Draft 2020-12 passed; AJV `ajv-cli` script = W377-Phase-B task
9. **Cite-floor honesty** → META-E 8-org disclosed (below ≥10, above ≥3-org sca-v13 floor at 2.7×)

## W377+ Implementation Queue (9 carry-forwards + 8 META-E Phase-B tasks)

**P0 (blockers for v20 canonical promotion)**:
- C-V20-8: Fix CLAUDE.md L60-66 cardinal-rule-6 drift (W350-sota-catalog + tools/sota-pipeline.mjs ghost refs)
- C-V20-9: Author `tools/sca-tier-router.mjs` + `provenance-lint-v4` + `.pre-commit-config.yaml` block
- C-V20-4: 3 NEW MCPs to `.mcp.json.next` shadow-install (paper-search-mcp + Octocode + context7)
- C-V20-6: `tools/sca-v20-calibrate.mjs` empirical weight tuning on 50-repo backtest
- META-E §6 #1-3: schema validate + migration script + author the missing `tools/sota-pipeline.mjs`

**P1 (W378+)**:
- C-V20-1: 3 T1-INSTALL candidates with 30-day version-pin window per CR-1
- C-V20-2: stigmergy + Arbor PATTERN-STUDY
- C-V20-3: weak-cheap-model paradox → relitigate W331 axis-2-#4
- C-V20-5: NotebookLM-mcp operator go/no-go
- C-V20-7: niche-authority predicate formalization

## Cardinal-Rule Compliance

- **CR-3** (cross-model gate): V20-r2 codex GPT-5.5 APPROVE 0.89 satisfies the consensus requirement.
- **CR-6** (verify-before-claim): every synthesis claim cite-anchored; v15 honest-disclosure fixes (findings 5, 8, 9) explicitly downgraded overclaims to "spec/design landed" + flagged below-floor sections.
- **Anti-fabrication**: 2 real CLAUDE.md drift instances surfaced (W350-sota-catalog ghost; SLSA-L3 absence on all 30 candidates) — both carry-forward'd, not papered over.

## Operator-Sign Gate

Per CLAUDE.md cardinal-rule-1 (install only from trusted) + cardinal-rule-5 (safety boundaries), promotion of v20 to canonical research architecture + any `.mcp.json` install (C-V20-4) + any new SOTA repo INSTALL (C-V20-1) requires explicit operator-sign. This synthesis is the recommendation; the operator decides adoption-degree per repo.
