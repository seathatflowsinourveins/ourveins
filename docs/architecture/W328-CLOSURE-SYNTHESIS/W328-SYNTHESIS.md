# W328 Closure Synthesis — CONSOLIDATED (Claude-session + Parallel-session)

**Wave**: W328 — REMEDIATION continuation (multi-session)
**Date**: 2026-05-19
**Cumulative codex rounds**: 19 (W319-W327) → **21** (W328-r1 BLOCK closure pending)

[CORRECTED per codex round-21 BLOCK]: this synthesis previously documented ONLY a parallel-session W328 plan (SKILL-ABSORB-MEGA / INSIGHTS-WIRE-AUTO / K-5+K-8+UPSTREAM-FINAL / SOTA-BYPASS) and falsely claimed "5/5 SHIPPED" with file references not present in commit `74de2df`. The corrected synthesis below captures BOTH multi-session work paths and avoids stale-file claims.

## Multi-Session Race Acknowledgment (3rd consecutive W-wave)

W320-codex-r1 + W326-codex-r1 + W328-r1 are all multi-session-race situations. Both my Claude-session W328 work AND a parallel-session W328 work landed on the same branch. The provenance-lint v2 hook shipped this wave by Stream C is the prevention surface for future races (now blocks W320/W326-pattern races genuinely per 7/7 smoke test).

## Claude-Session W328 (this commit 74de2df ACTUAL changes)

**Parallel ratio this dispatch**: 4/4 Agent-in-1-message = 1.000

| Stream | Scope | Verdict |
|---|---|---|
| **A** R5 verify end-to-end (`docs/architecture/W328-R5-VERIFY/`) | CRITICAL CORRECTION: R5 is NOT FULL-HOLD (as W327-r3 commit overclaimed) — **PARTIAL-HOLD-UPGRADED**. Sandbox layer still inert (Windows-native unsupported); W325-C Option C 4.0/10 5-control; FI-1+FI-2 BROKEN; acceptance-record MISSING; R5 dwell **11 waves > 8-wave threshold** → -0.5 install_score penalty per ops-rhythm. Composite lift estimate 4.036→4.157 mid. | PASS-CORRECTION |
| **B** Insights operator-doable (`docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/`) | MAJOR: Phoenix ALREADY RUNNING (W327 was wrong); port `:16006` canonical; ccstatusline at L219-225 + 37 widgets (W327 :206/38 corrected). Wire-up 14%→86% achievable in 15 min P0 trio. | PASS |
| **C** Provenance-lint v2 (`docs/architecture/W328-PROVENANCE-LINT-V2/`) + `.pre-commit-config.yaml` | W327 codex-r1 carry CLOSED. 5 claim-form ERE + path-norm + prose-mode-exclusion. **7/7 smoke PASS**; W320+W326 races NOW genuinely BLOCKED. | PASS |
| **D** Composite re-eval + SOTA (`docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/`) | composite at W327-r3 close = **4.143 anti-bias-capped** (Δ +0.107 from 4.036); W331 micro-wave still needed for ≥4.5 ship-gate; K-2 OTel headers fix +0.07 highest-leverage; 3 W329 candidates (openobserve T1 + slsa-verifier T1 + AEGIS pattern). Codex round-20 deferred-graft pending. | PASS-WITH-DEFERRED-GRAFT |

**This commit (74de2df) actual contents**: 27 files changed, +4705 -7. Doc-only + `.pre-commit-config.yaml` provenance-lint v2 hook. No SKILL.md/settings.json/skills/MCP changes by Claude-session streams.

## Parallel-Session W328 (NOT in commit 74de2df ancestry — separate work-track)

The pre-existing W328-SYNTHESIS.md content referred to a SEPARATE W328 work-track with different scope:
- **W328-A** SKILL-ABSORB-MEGA (sca-v10/v11/v12 + K-3 + K-7 absorb)
- **W328-B** INSIGHTS-WIRE-AUTO (Phoenix start + OTEL templates)
- **W328-C** K-5 + K-8 + UPSTREAM-FINAL
- **W328-D** SOTA-BYPASS

These appear to be a parallel CC session's W328 work that may or may not have landed in the linear history. Per the multi-session race pattern, this synthesis acknowledges both work-tracks without falsely claiming either is canonical.

## Cardinal-Rule Invariants Post-Ship

| Rule | State |
|---|---|
| R1 trusted plugins | ✓ HOLD |
| R2 hooks discipline | ✓ HOLD literal; `tools/preagent-*.mjs` spirit-question deferred W329 |
| R3 documented subagents | ✓ HOLD |
| R4 no `.claude/rules/*` self-invents | ✓ HOLD |
| **R5 safety via CC permissions** | ⚠ **PARTIAL-HOLD-UPGRADED** (W327-r3 FULL-HOLD claim CORRECTED per Stream A audit + codex round-21 finding); 11-wave dwell > 8-wave threshold → -0.5 install_score penalty per ops-rhythm §1.1 |
| `self_invented_count: 0` | ✓ HOLDS |
| CLAUDE.md ≤50 LOC | ✓ 50 LOC |

## W329 Forward Queue (top P0 — 10)

1. **K-2 OTel headers env-var fix** (Stream D highest-leverage; +0.07 composite; depends on #2)
2. **Langfuse SEV-1 key rotation** (W325-r1 carry; ~10 min operator)
3. **Phoenix metrics+logs receivers Docker-env enable** (Stream B P0; `PHOENIX_ENABLE_METRICS_RECEIVER=true` + `PHOENIX_ENABLE_LOGS_RECEIVER=true`; ~3 min)
4. **settings.json env paste** (Stream B P0; 8 keys; ~2 min)
5. **R5 acceptance-record sign + Patch C1 15-entry deny-expansion** (Stream A AI; closes 11-wave dwell)
6. **Perplexity SEV-1 rotation** (W317-r1 carry)
7. **K-4 slsa-verifier install** (Stream D; +0.07 to ~4.20 target)
8. **CLAUDE.md R5-corollary line add** (close R5 dwell)
9. **Re-enable signed-audit-trails + protect-mcp plugins** (Stream A AI-W329-2/3)
10. **codex round-20 deferred-graft retrieve** (`codex resume 019e41db-4fe1-70d0-80ed-fa996c06c55c`)

## Composite Trajectory

- W326 baseline: 4.036 RED ALERT
- W328 (now): **4.143** anti-bias-capped
- W329 P0 trio target: ~4.20-4.30 YELLOW upper-band
- W330 close target: ~4.39
- W331 micro-wave required for ≥4.5 ship-gate GREEN

## Operator-Blocking Carry (8)

R5 acceptance-record sign · Langfuse SEV-1 rotation · Perplexity SEV-1 rotation · Phoenix Docker-env receivers · settings.json env paste · K-4 slsa-verifier install · K-1 CLAUDE.md corollary · codex round-20 deferred-graft retrieve

## Confirmation-Bias Discipline (R6 — W329-I update after S2-REAUDIT FULL retraction)

W328 ratifies the following as a cardinal-rule corollary to R1-R5 — **revised W329-H per codex round-1 Axis-5 FAIL feedback** (original framing implied "mature repos bugs extremely rare" which is unfalsifiable and risks suppressing valid issues); **further updated W329-I 2026-05-19** after W329-S2-REAUDIT FULLY retracted the W328-S2 USER-ERROR-CONFIRMED verdict (live API probes refuted both W328-S2 premise AND codex round-1 counter-hypothesis; root cause UNDETERMINED).

> **R6 (proposed, W329-H revision)**: When a SOTA endpoint returns unexpected (0-result, false-negative, or surprising) output, the workflow ORDER is: (1) **Source-deep-dive first** — `Read` the upstream repo source / API docs / OpenAPI schema to verify the operator query matches the documented contract; (2) **Frame two hypotheses in parallel** — H1: operator query is an anti-pattern relative to the documented contract; H2: upstream behavior violates its own documented contract; (3) **Only after source-level evidence confirms H2** may the observation be framed as an upstream defect. Valid upstream bugs DO occur in mature widely-used repos (current sanctioned example: `anthropics/claude-code#46915` plugin cache-dir deletion bug, patched via the cardinal-rule-2 hook-shim exception); the discipline governs ORDER (verify-before-claim), NOT the rate of upstream defects.

**Illustrations (NOT proof, NOT precedent)**:
- **W328-S1 (HF `hub_repo_search`)**: USER-ERROR-CONFIRMED — `search=` parameter is substring-on-IDs, not free-text tokenized AND. Multi-word free-text query was operator anti-pattern.
- **W328-S2 + W329-S2-REAUDIT (GitHub-MCP `search_repositories`)**: **root cause UNDETERMINED — both W328-S2 USER-ERROR-CONFIRMED verdict AND codex round-1 counter-hypothesis are REFUTED by live API probes (W329-S2-REAUDIT/EVIDENCE.md §E1: `repo:facebook/react` → total_count=1; `owner:facebook` == `user:facebook` == `org:facebook` → total_count=155). The W328-S2 case study itself illustrates the discipline's depth requirement: the W328-S2 author misread github/docs and incorrectly classified `repo:owner/name` as code-search-only. W329-S2-REAUDIT used live-API probes to refute both W328-S2 and the codex GPT-5.5 round-1 counter-hypothesis. Lesson: source-deep-dive includes LIVE behavior verification, not just doc-reading.** Plausible actual causes (require W330 follow-up): rate-limit budget exhaustion, token-scope mismatch, MCP-server query transformation, stale cache.

**Self-correction notice**: this rewrite (W329-H) and its W329-I update are themselves worked examples of R6. The discipline is bidirectionally reflexive — bias-toward-upstream-bug AND bias-toward-user-error each require source-deep-dive (now explicitly LIVE-API-verified where feasible, not just doc-read) to discharge. W328-S2 → W329-S2-REAUDIT is the canonical example of the bias-toward-user-error failure mode and its resolution by live-evidence verification.

**3-org-distinct cites (preserved per W295 I1)**: OWASP A06 + SCVS v1.0 §4-5 (Org 1: OWASP) · ISO/IEC 25010:2023 §4.2.6-4.2.7 (Org 2: ISO/IEC) · NIST SP 800-218 SSDF v1.1 PW.7/RV.1 (Org 3: NIST) · W329-S2-REAUDIT/VERDICT.md (internal verification probe — supplementary, not counted in 3-org-distinct).

W328 wave is **CLOSED** post codex round-21 closure commit (next).
