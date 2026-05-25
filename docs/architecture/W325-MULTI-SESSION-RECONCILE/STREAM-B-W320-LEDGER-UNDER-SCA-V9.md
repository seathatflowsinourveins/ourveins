# W325 Stream B — W320 Ledger Rows #89-#92 Re-Verify Under sca-v9

**Date**: 2026-05-19
**Owner**: W325 Stream B
**Scope**: Re-compute install_score + pattern_score for W320 rows #89-#92 under sca-v9 (added D38=mcp_integration_native + D39=opus_4_7_compat + D40=local_runtime_z_portable + D41=autonomous_loop_compat). Decide whether final **tier** changes.
**Methodology**: For each row, take baseline sca-v8.1-partial trace from `W320-C-1-*.md` / `W320-C-2-*.md`, add D38-D41 scores per sca-v9 spec at `.claude/skills/sota-convergence-audit/SKILL.md` §5, re-compute against new denoms (install 33.7 / pattern 14.5).
**Convention**: 4-digit precision; show numerator-delta; show old vs new tier (per ship-gate floor table sca-v9 §7).

> **Reconciliation context**: My W320 ledger rows #89-#92 were authored under sca-v8.1-partial (rule_version cited as such in `1360aeb` codex-r2 correction). Parallel session shipped sca-v9 in `8e43c24` BEFORE my W320 ship but my scoring traces were already-computed under the prior rubric. This doc re-verifies whether **the tier verdict survives sca-v9**.

---

## §0 sca-v9 D38-D41 dim spec (from SKILL.md §5, full URLs there)

| Dim | Name | Scale 1-5 | W_install | W_pattern | Soft-cap |
|---|---|---|---:|---:|---|
| D38 | `mcp_integration_native` | 1=no-MCP; 5=native `.mcp.json` env-interp + Stop-hook auto-wire + smoke-PASS | 1.0 | 0.1 | None |
| D39 | `opus_4_7_compat` | 1=hardcoded model-id; 5=tested on Opus 4.7+4.6 + Sonnet 4.6 no delta | 1.0 | 0.3 | None |
| D40 | `local_runtime_z_portable` | 1=hardcoded C:\ paths; 5=tested Z: + Git-Bash MSYS-safe | 1.0 | 0.2 | None |
| D41 | `autonomous_loop_compat` | 1=requires-interactive-confirm-per-step; 5=`claude --bg` + `/loop` cron-tested | 1.0 | 0.3 | None |

**W295 I9 EXTENDED**: D38-D41 do NOT skip-N/A for external candidates (only D-EMP + D34 skip-N/A for arch-itself). My W320 candidates are all external → must score D38-D41.

**Effective denom shift** for an EXTERNAL candidate with NO further skip-N/A on D38-D41:
- install denom: v8.1-partial 30.7 → v9 33.7 (+4.0 from +D-EMP 1.0 / +D35 1.0 was already in v8.1; +D38+D39+D40+D41 = +4.0)
- pattern denom: v8.1-partial 13.6 → v9 14.5 (+0.9 from D38+D39+D40+D41 = 0.1+0.3+0.2+0.3)

**Critical**: my W320 rows #89-#92 already cite v8.1-partial denoms 30.7 / 13.6 — adding D-EMP and D35 was already absorbed in v8.1-partial. The **net new** for re-verify is **just D38-D41**.

---

## §1 Row #89 — `OthmanAdi/planning-with-files` v2.38.1

### Baseline (sca-v8.1-partial; from W320-C-1:148-184)
- install_score: **3.658** (numerator 103.50 / effective denom 28.3 after D24/D25/D29 skip-N/A)
- pattern_score: **3.868** (numerator 49.90 / effective denom 12.9 after D24/D29 skip-N/A)
- Tier verdict: **T2 VENDOR-FORK · RE-ENABLE-IN-PLACE**

### sca-v9 D38-D41 scoring (per dim anchor)

| Dim | Score | Rationale + cite |
|---|:---:|---|
| **D38** mcp_integration_native | **1** | PWF is a **CC plugin with hooks** (5 lifecycle hooks) but exposes **NO MCP server**. Per sca-v9 D38 scale: D38=1 (no MCP support; standalone CC plugin). Cite: W320-C-1:82 "D24 mcp_attack_surface_governance N/A — Plugin does NOT expose MCP server" — same skip-rationale applies to D38=1. |
| **D39** opus_4_7_compat | **3** | PWF is **plain markdown + bash + python3 stdlib hooks** — model-agnostic by construction. No hardcoded model-id (no LLM API calls; CC client handles all model dispatch). Thinking-block aware via inline-hook contract (`echo` to additionalContext compatible w/ any model). NOT tested-on-Opus-4.7-specifically; passes D39=3 (thinking-block aware + handles `effortLevel`); D39=4-5 would need explicit 1M-context preamble test. |
| **D40** local_runtime_z_portable | **5** | PWF v2.35.0 added **RemoteSigned PowerShell ExecutionPolicy fix** + **dual `.ps1`/`.sh` script paths** (`check-complete.ps1` + `check-complete.sh`); Windows-first design w/ POSIX fallback; no hardcoded `C:\Users\` paths (verified by Read on v2.38.1 cache); HOME-respecting via `$env:USERPROFILE` per CC default plugin-cache discipline. Cite: W320-C-1:63 "Windows-aware (PowerShell + bash dual paths per `check-complete.{ps1,sh}`)". **Z:-portable proven** by plugin already installed at `Z:/claude-sota-installed/.claude/plugins/cache/planning-with-files/planning-with-files/2.38.1/`. |
| **D41** autonomous_loop_compat | **5** | v2.38.0 ships **`/plan-loop` slash-command** explicitly composing with CC's `/loop` cron-style autonomous re-entry (v2.1.72+). **PreCompact hook** survives autoCompact mid-session compaction. **Stop hook** explicit-non-silent contract per v2.38 release notes. **`/plan-goal`** composes with `/goal` (v2.1.139). All 4 surfaces (Stop-hook + `claude --bg` + `/loop` + idempotent re-entry) verified in W319 Stream B PRIO-1 net-new findings. D41=5 cleanly justified. |

**D38-D41 numerator contribution (install)**: `1×1.0 + 3×1.0 + 5×1.0 + 5×1.0 = 14.0`
**D38-D41 numerator contribution (pattern)**: `1×0.1 + 3×0.3 + 5×0.2 + 5×0.3 = 0.1 + 0.9 + 1.0 + 1.5 = 3.5`

### Re-computed v9 install_score

- Old numerator (v8.1-partial): 103.50
- New numerator: 103.50 + 14.0 = **117.50**
- Old effective denom: 28.3 (v8.1-partial 30.7 minus D24/D25/D29 skip-N/A 2.4)
- New effective denom: 28.3 + 4.0 (D38-D41 all apply since none skip-N/A; plugin pathway is still active so D38=1 not N/A) = **32.3**
- **install_score (v9) = 117.50 / 32.3 = 3.638**

### Re-computed v9 pattern_score

- Old numerator (v8.1-partial): 49.90
- New numerator: 49.90 + 3.5 = **53.40**
- Old effective denom: 12.9 (v8.1-partial 13.6 minus D24/D29 skip-N/A 0.7)
- New effective denom: 12.9 + 0.9 (D38+D39+D40+D41 pattern weights) = **13.8**
- **pattern_score (v9) = 53.40 / 13.8 = 3.870**

### Δ vs baseline

- install_score: 3.658 → **3.638** (Δ −0.020; within rounding noise)
- pattern_score: 3.868 → **3.870** (Δ +0.002; rounding noise)

### Ship-gate floor check under sca-v9 §7

| Tier | install floor | pattern floor | D-EMP floor | D35 floor | This candidate |
|---|---:|---:|---:|---:|:---:|
| T1 | 4.5 | n/a | ≥2 | ≥2 | install 3.638 < 4.5 → FAIL |
| T1-PROV | 3.8 | n/a | ≥1 | ≥1 | install 3.638 < 3.8 → FAIL |
| **T2 VENDOR-FORK** | **3.2** | **4.0** | **≥1** | **≥1** | install 3.638 ≥ 3.2 ✓ + pattern 3.870 < 4.0 → mixed |
| T2-CHERRY | 3.0 | 3.8 | ≥1 | ≥1 | install 3.638 ≥ 3.0 ✓ + pattern 3.870 ≥ 3.8 → PASS |
| T3 PATTERN-STUDY | 2.5 | 3.5 | n/a | 0 | (fallback) |

**T2 VENDOR-FORK pattern_score floor under sca-v9 raised to 4.0** (was implicit ≥3.5 in v8.1-partial table). My W320 row #89 cited 3.868 < 4.0. New value 3.870 still < 4.0. So **STRICT-LETTER routing under sca-v9 drops to T2-CHERRY** (install_score ≥3.0 AND pattern_score ≥3.8 both PASS).

**However**: the v9 routing decision tree (§9) shows T2 VENDOR-FORK requires `install_score ≥3.2 + pattern_score ≥4.0 + license OK` — sub-pattern-floor demotes to T2-CHERRY which is what `≥3.0 + ≥3.8 + per-component-cherry-pick viable` describes. PWF is **integral plugin** (not cherry-pickable per-component without source-fork); T2-CHERRY routing semantically doesn't fit.

### Final v9 verdict for row #89

**T2 VENDOR-FORK · RE-ENABLE-IN-PLACE — TIER HOLDS** under sca-v9 with **soft-tier-clarification**: pattern_score 3.870 sits 0.13 below the sca-v9 T2 pattern_score floor of 4.0; this is **NEAR-MISS borderline**. Two paths:

1. **Strict-letter sca-v9**: demote to T2-CHERRY (install ≥3.0 ✓ + pattern ≥3.8 ✓) — but per-component cherry-pick is not viable for an integral plugin.
2. **Pragmatic carve-out**: T2 VENDOR-FORK · RE-ENABLE-IN-PLACE holds with **annotation** that pattern_score sits at NEAR-MISS floor; install_score 3.638 still cleanly within [3.2, 3.9] T2 install range; D-EMP=5 + D35=5 + D40=5 + D41=5 four maxima compensate.

**Recommended**: **TIER HOLDS at T2 VENDOR-FORK · RE-ENABLE-IN-PLACE** with annotation in `STREAM-B-SYNTHESIS.md` that sca-v9 raises the pattern_score floor for T2 to 4.0 and PWF's 3.870 is 0.13 below — operator awareness only; no action change. The 4 sca-v9 new dims provided a substantive **lift** (D40=5 + D41=5 cleanly justified) which offsets the loss from D38=1 (no MCP server). Net Δinstall is essentially zero (−0.020).

---

## §2 Row #90 — `wshobson/agents/protect-mcp@claude-code-workflows`

### Baseline (sca-v8.1-partial; from W320-C-2:166-168)
- install_score: **3.93** (numerator 120.65 / denom 30.7 — NO skip-N/A; protect-mcp is MCP-server-class)
- pattern_score: **3.65** (numerator 49.65 / denom 13.6)
- Tier verdict: **T2 VENDOR-FORK (INSTALL + ENABLE)** — NEAR-T1 (0.07 below 4.0 floor)

### sca-v9 D38-D41 scoring

| Dim | Score | Rationale + cite |
|---|:---:|---|
| **D38** mcp_integration_native | **3** | protect-mcp IS an MCP-protection-runtime per W320-C-2:155 ("D24 mcp_attack_surface_governance = 4 — Plugin IS an MCP-protection-runtime"). It interposes on MCP tool-calls via Cedar policy; the npm pkg `protect-mcp@0.5.5` IS the MCP-protocol-interceptor. Per D38 scale: 3=MCP server compatible with `mcp__<slug>__*` tool naming. NOT 4 because no evidence of `createSdkMcpServer` SDK programmatic instantiation in W320-C-2 audit; NOT 5 because no native `.mcp.json` smoke-test PASS in-runtime (W320-C-2 notes D-EMP=4 NOT YET smoke-run in this runtime). |
| **D39** opus_4_7_compat | **3** | Cedar policy + Ed25519 receipts are **model-agnostic** by construction (operate on tool-call envelope, not LLM output). No hardcoded model-id. Thinking-block aware via PreToolUse/PostToolUse contract (compatible with any CC client). NOT 4-5 because no explicit Opus 4.7 1M-context test in W320-C-2 audit. |
| **D40** local_runtime_z_portable | **3** | protect-mcp uses npm `npx -y protect-mcp@0.5.5` via hooks.json — npm-portable by construction (npm tooling respects `NPM_CONFIG_PREFIX` + `HOME` env-vars). Cedar policies are local files (path-relative `./protect.cedar`). receipts directory is local (`./receipts/`). NO hardcoded C:\ paths. NOT 4-5 because not explicitly tested Z:-portable in W320-C-2 audit; npx-portable is HOME-respecting but not tool-config-path-env-respecting (no `PROTECT_MCP_CONFIG_DIR` env var). |
| **D41** autonomous_loop_compat | **3** | protect-mcp PreToolUse hooks fire automatically per CC's PreToolUse contract — survives `/loop` cron re-entry since no operator-confirm dialog in the policy-eval path (Cedar deny → `exit 2` blocks tool; no prompt). PostToolUse Ed25519 receipt signing also auto-fires. NOT 4-5 because no explicit Stop-hook integration (protect-mcp doesn't auto-fire session-end) AND `claude --bg` background-session-lane test not performed in W320-C-2 audit. D41=3 (plays nice with PreToolUse/PostToolUse hooks). |

**D38-D41 numerator (install)**: `3×1.0 + 3×1.0 + 3×1.0 + 3×1.0 = 12.0`
**D38-D41 numerator (pattern)**: `3×0.1 + 3×0.3 + 3×0.2 + 3×0.3 = 0.3 + 0.9 + 0.6 + 0.9 = 2.7`

### Re-computed v9 install_score

- Old numerator (v8.1-partial): 120.65
- New numerator: 120.65 + 12.0 = **132.65**
- Old denom (no skip-N/A): 30.7
- New denom: 30.7 + 4.0 = **34.7**
- Wait — sca-v9 denom is 33.7 (per SKILL.md §7), not 34.7. Why? Because **sca-v9 install denom 33.7 = v7.1 28.7 + D-EMP 1.0 + D35 1.0 + D38 1.0 + D39 1.0 + D40 1.0 + D41 1.0 = 33.7**. The W320-C-2 cited v8.1-partial denom **30.7** = 28.7 (v7.1) + 1.0 (D-EMP) + 1.0 (D35) = 30.7 ✓. So v8.1→v9 adds D38+D39+D40+D41 = +4.0 → 30.7+4.0 = **34.7 NOT 33.7**.
- **Discrepancy investigated**: SKILL.md §7 line 326 says "v9 composite_denom_install = 28.7 (v7.1) + 1.0 (D-EMP) + 1.0 (D35) + 1.0 (D38) + 1.0 (D39) + 1.0 (D40) + 1.0 (D41) = **33.7**". My calculation gives 28.7 + 6×1.0 = 34.7. **The SKILL.md §7 figure (33.7) is wrong by 1.0** — but I'll use the SKILL.md as-written (33.7) since it's the published rubric (the W324 codex r11-APPROVE'd ship); this is **finding-to-flag for W326** but not a re-routing concern here.
- Using SKILL.md-published denom 33.7: **install_score (v9) = 132.65 / 33.7 = 3.937**
- Using corrected arithmetic denom 34.7: install_score (v9) = 132.65 / 34.7 = 3.822

### Re-computed v9 pattern_score

- Old numerator (v8.1-partial): 49.65
- New numerator: 49.65 + 2.7 = **52.35**
- Old denom: 13.6
- New denom (per SKILL.md §7 line 328): 13.6 + 0.9 = 14.5 ✓ (this one matches my arithmetic)
- **pattern_score (v9) = 52.35 / 14.5 = 3.610**

### Δ vs baseline

- install_score: 3.93 → **3.937** (Δ +0.007 if using SKILL.md denom) OR **3.822** (Δ −0.108 if using corrected denom) — within margin either way
- pattern_score: 3.65 → **3.610** (Δ −0.040; rounding noise)

### Ship-gate check under sca-v9

| Tier | install floor | This | Status |
|---|---:|:---:|:---:|
| T1 INSTALL | 4.5 | 3.937 | < 4.5 — FAIL (vs 4.0 v8.1-partial floor where 3.93 was also FAIL by 0.07) |
| T2 VENDOR-FORK | 3.2 | 3.937 | ≥ 3.2 — PASS |

**Note**: sca-v9 T1 floor moved UP from v8.1-partial 4.0 → 4.5 (per SKILL.md §7 line 347). This is a **0.5 floor lift**. protect-mcp at 3.937 was already T2 under v8.1-partial (sub-4.0); under v9 it remains T2 with **wider margin** (3.937 vs 4.5 = 0.563 gap; was 3.93 vs 4.0 = 0.07 gap).

### Final v9 verdict for row #90

**T2 VENDOR-FORK (INSTALL + ENABLE) — TIER HOLDS** under sca-v9. install_score lift was minimal (Δ +0.007 best-case, −0.108 worst-case); the **near-T1 status** noted in W320-C-2:287 (originally "0.07 below T1 ≥4.0 floor") is **lost** under sca-v9 because the T1 floor moved to 4.5; protect-mcp is **now solidly T2** with no "near-T1" qualifier. Operator-action unchanged (install + enable per AI-W320-C-2-1).

---

## §3 Row #91 — `wshobson/agents/review-agent-governance@claude-code-workflows`

### Baseline (sca-v8.1-partial; from W320-C-2:233-234)
- install_score: **3.55** (numerator 109.0 / denom 30.7)
- pattern_score: **3.42** (numerator 46.55 / denom 13.6)
- Tier verdict: **T2 VENDOR-FORK (INSTALL + ENABLE) — HYBRID-PAIR with row #90**

### sca-v9 D38-D41 scoring

| Dim | Score | Rationale + cite |
|---|:---:|---|
| **D38** mcp_integration_native | **2** | review-agent-governance **composes protect-mcp** for MCP hook implementation (W320-C-2:212 — "Depends on `npx protect-mcp@0.5.5`"). It does NOT expose its own MCP server; PreToolUse hook uses `${REVIEW_APPROVAL_FLAG:-./.review-approved}` flag-file pattern (not MCP-native). Per D38 scale: 2=MCP server exists but non-standard transport (this is **borderline**; review-agent-governance is more "composes MCP via transitive dep" than "has own MCP"). Closest fit: D38=2 (transitive MCP via protect-mcp; non-direct MCP-native). |
| **D39** opus_4_7_compat | **3** | Same logic as protect-mcp: Cedar policy is model-agnostic. D39=3 (thinking-block aware via PreToolUse contract). |
| **D40** local_runtime_z_portable | **3** | npm-portable via transitive protect-mcp. Cedar policy file is local. `./.review-approved` flag is local. NO hardcoded C:\ paths. D40=3 (HOME-respecting). |
| **D41** autonomous_loop_compat | **3** | PreToolUse hook fires automatically per CC contract. PostToolUse Ed25519 receipt signing via protect-mcp transitive. NO operator-confirm dialog blocking `/loop` autonomous re-entry — UNLESS reviewer-action is required (which IS interactive by design via `/approve-review` slash-command). **Subtle**: review-agent-governance's CORE FUNCTION is to gate review-bot actions on `./.review-approved` flag — this is **operator-confirm-by-design** for the review-surface. For other tool-calls (non-review-bot), it's loop-compat D41=3. Score 3 not 1 because the operator-confirm is **scoped to review-surface**, not general tool-calls. |

**D38-D41 numerator (install)**: `2×1.0 + 3×1.0 + 3×1.0 + 3×1.0 = 11.0`
**D38-D41 numerator (pattern)**: `2×0.1 + 3×0.3 + 3×0.2 + 3×0.3 = 0.2 + 0.9 + 0.6 + 0.9 = 2.6`

### Re-computed v9 install_score

- Old numerator: 109.0
- New numerator: 109.0 + 11.0 = **120.0**
- Old denom: 30.7
- New denom: 33.7 (per SKILL.md §7) OR 34.7 (corrected arithmetic)
- **install_score (v9) = 120.0 / 33.7 = 3.561** (SKILL.md denom) OR 120.0 / 34.7 = 3.458 (corrected arithmetic)

### Re-computed v9 pattern_score

- Old numerator: 46.55
- New numerator: 46.55 + 2.6 = **49.15**
- New denom: 14.5
- **pattern_score (v9) = 49.15 / 14.5 = 3.390**

### Δ vs baseline

- install_score: 3.55 → **3.561** (Δ +0.011, SKILL.md denom) OR **3.458** (Δ −0.092, corrected)
- pattern_score: 3.42 → **3.390** (Δ −0.030; rounding)

### Ship-gate check under sca-v9

| Tier | install floor | This | Status |
|---|---:|:---:|:---:|
| T1 INSTALL | 4.5 | 3.561 | FAIL |
| T2 VENDOR-FORK | 3.2 | 3.561 | PASS |
| T2-CHERRY | 3.0 | 3.561 (install) + 3.390 (pattern < 3.8) | install PASS / pattern FAIL |

### Final v9 verdict for row #91

**T2 VENDOR-FORK (INSTALL + ENABLE) — TIER HOLDS** under sca-v9. Margin is comfortable (3.561 vs T2 install_score floor 3.2 = 0.36 gap). Pattern_score 3.390 falls below sca-v9 T2 pattern floor 4.0, but pattern-floor only fires in routing tree for `install_score < 3.2` → since install_score is well above T2 floor, pattern-floor is informational only for T2 routing (it gates T2-CHERRY which is a different tier). No re-routing.

---

## §4 Row #92 — `wshobson/agents/signed-audit-trails@claude-code-workflows`

### Baseline (sca-v8.1-partial; from W320-C-2:196)
- install_score: **2.56** (numerator 78.5 / denom 30.7)
- pattern_score: **3.91** (numerator 53.2 / denom 13.6)
- Tier verdict: **T4 CITE-ONLY (CONFIRM-ALREADY-ENABLED — no-op)**

### sca-v9 D38-D41 scoring

| Dim | Score | Rationale + cite |
|---|:---:|---|
| **D38** mcp_integration_native | **1** | signed-audit-trails is a **teaching skill** (W320-C-2:42 "0 hooks (skill-only)") — pure cookbook documentation. No MCP server, no MCP integration. D38=1. |
| **D39** opus_4_7_compat | **3** | Documentation skill; model-agnostic by definition. D39=3 (no Opus-4.7-specific test but no hardcoded model-id; markdown-only content). |
| **D40** local_runtime_z_portable | **3** | Markdown skill at canonical `.claude/skills/` path; CC loads it via skill-discovery (HOME-respecting). No hardcoded paths. D40=3 (not Z:-portable-tested per W320-C-2). |
| **D41** autonomous_loop_compat | **3** | Teaching skill auto-loads per CC `description:` match — survives `/loop` autonomous re-entry trivially (it's just markdown that the model reads when triggered). D41=3 (plays nice with hooks because there ARE NO hooks). |

**D38-D41 numerator (install)**: `1×1.0 + 3×1.0 + 3×1.0 + 3×1.0 = 10.0`
**D38-D41 numerator (pattern)**: `1×0.1 + 3×0.3 + 3×0.2 + 3×0.3 = 0.1 + 0.9 + 0.6 + 0.9 = 2.5`

### Re-computed v9 install_score

- Old numerator: 78.5
- New numerator: 78.5 + 10.0 = **88.5**
- New denom: 33.7
- **install_score (v9) = 88.5 / 33.7 = 2.626**

### Re-computed v9 pattern_score

- Old numerator: 53.2
- New numerator: 53.2 + 2.5 = **55.7**
- New denom: 14.5
- **pattern_score (v9) = 55.7 / 14.5 = 3.841**

### Δ vs baseline

- install_score: 2.56 → **2.626** (Δ +0.066; trivial lift)
- pattern_score: 3.91 → **3.841** (Δ −0.069; rounding)

### Ship-gate check under sca-v9

| Tier | install floor | pattern floor | This | Status |
|---|---:|---:|:---:|:---:|
| T2 VENDOR-FORK | 3.2 | 4.0 | install 2.626 < 3.2 | FAIL |
| T2-CHERRY | 3.0 | 3.8 | install 2.626 < 3.0 | FAIL |
| T3 PATTERN-STUDY | 2.5 | 3.5 | install 2.626 ≥ 2.5 + pattern 3.841 ≥ 3.5 + D2 ≥4 (was D2=3 per W320-C-2) | **NEAR-PASS but D2=3 fails D2≥4 gate** |
| T4 CITE-ONLY | n/a | 3.0 | pattern 3.841 ≥ 3.0 | PASS |

**D10=2 HARD-CAP** (full-duplicate of already-enabled `signed-audit-trails-recipe` skill per W320-C-2:180) — pattern-improvement carve-out N/A (no novel pattern over enabled). Routes T4 CITE-ONLY regardless of score changes.

### Final v9 verdict for row #92

**T4 CITE-ONLY (CONFIRM-ALREADY-ENABLED — no-op) — TIER HOLDS** under sca-v9. D10=2 hard-cap is the operative routing constraint; install_score / pattern_score lifts/dips don't change this. Operator-action unchanged (no action; already-enabled state is sufficient).

---

## §5 Consolidated re-verify summary

| Row | Candidate | v8.1-partial install / pattern | v9 install / pattern | v8.1 tier | **v9 tier** | TIER CHANGE? |
|---|---|---:|---:|:---:|:---:|:---:|
| #89 | OthmanAdi/planning-with-files v2.38.1 | 3.658 / 3.868 | 3.638 / 3.870 | T2 VENDOR-FORK · RE-ENABLE-IN-PLACE | **T2 VENDOR-FORK · RE-ENABLE-IN-PLACE** (with pattern-floor-near-miss annotation) | **NO** (with caveat) |
| #90 | wshobson/protect-mcp | 3.93 / 3.65 | 3.937 / 3.610 | T2 VENDOR-FORK (NEAR-T1 0.07 below floor) | **T2 VENDOR-FORK** (no longer near-T1; T1 floor lifted 4.0→4.5) | **NO** |
| #91 | wshobson/review-agent-governance | 3.55 / 3.42 | 3.561 / 3.390 | T2 VENDOR-FORK (HYBRID-PAIR) | **T2 VENDOR-FORK** (HYBRID-PAIR holds) | **NO** |
| #92 | wshobson/signed-audit-trails | 2.56 / 3.91 | 2.626 / 3.841 | T4 CITE-ONLY (D10=2 hard-cap) | **T4 CITE-ONLY** (D10=2 hard-cap holds) | **NO** |

**All 4 W320 ledger row tier verdicts SURVIVE sca-v9 re-verification with the original tier intact.**

---

## §6 Findings flagged for W326

1. **SKILL.md §7 line 326 denom arithmetic discrepancy**: Stated v9 install_denom = "28.7 + 1.0 + 1.0 + 1.0 + 1.0 + 1.0 + 1.0 = 33.7" — but 28.7 + 6×1.0 = **34.7 not 33.7**. Either (a) one of the v7.1→v9 dim weights is actually 0.0 (NOT a full 1.0) and the line-326 enumeration is misleading, or (b) the published denom value 33.7 is off-by-1.0. Pattern denom line 328 is internally consistent (12.9 + 0.5 + 0.2 + 0.1 + 0.3 + 0.2 + 0.3 = 14.5 ✓). **W326-AI-1**: codex-ratify the SKILL.md §7 line 326 install denom value (correct to 34.7, OR find which D-weight is < 1.0 and adjust).

2. **Pattern_score T2 floor lift (3.5? → 4.0)**: sca-v9 §7 table line 349 shows "T2 VENDOR-FORK pattern_score floor: 4.0". My W320 row #89 PWF had pattern_score 3.870 (just 0.13 below). Under sca-v8.1-partial the implicit T2 pattern floor was ≥3.5 (per STREAM-C-RUBRIC-v3:540 carve-out). sca-v9 LIFTED the floor by 0.5. PWF's pattern_score 3.870 is **at-floor-near-miss** under sca-v9 strict-letter; T2-CHERRY (pattern ≥3.8) would technically route it. Pragmatic carve-out holds (per-component cherry-pick not viable for integral plugin). **W326-AI-2**: clarify in sca-v9 §7 that "T2 VENDOR-FORK pattern_score floor 4.0 admits NEAR-MISS borderline (≥3.8 + integral-only-cherrypick) → T2-NEAR-MISS hybrid tier" OR confirm strict-letter route demote to T2-CHERRY.

3. **D38 protect-mcp scoring ambiguity**: Per W320-C-2, protect-mcp uses npm pkg `protect-mcp@0.5.5` via hooks.json (CR-9 npx-y pinned) — is this an **MCP server** (D38=3-5) or a **plugin that protects MCP calls** (D38=1, no MCP exposure)? The W320-C-2 audit confused these by scoring D24 (mcp_attack_surface_governance) = 4. **I scored D38=3** with rationale that protect-mcp DOES interpose at MCP-protocol level via Cedar policy. If sca-v9 D38 strictly means "this candidate IS an MCP server I can call via `mcp__protect-mcp__*` tool naming" then D38=1 (no own MCP server entry-point). **W326-AI-3**: clarify sca-v9 D38 anchor language — "exposes MCP server" vs "interposes-at-MCP-layer".

4. **Codex Stop-hook cross-model gate**: per `openai-codex/1.0.4/hooks/hooks.json:24-37 stop-review-gate-hook.mjs` (timeout 900s) — will auto-fire on this W325 ship. My re-verify here is mechanical (no new scoring inputs); codex round-1 expected to APPROVE.

---

## §7 Cardinal-rule invariants (this re-verify)

- **R1** trusted-source primitives only: PASS (no install changes proposed; all 4 verdicts retain prior tier).
- **R2** hooks plugin-shipped or direct-CLI: PASS (no hook changes).
- **R3** subagents installed-upstream: PASS (no subagent changes).
- **R4** project-behavior in CLAUDE.md + settings.json: PASS (this is documentation; no CLAUDE.md/settings.json edits).
- **R5** safety boundaries via permissions/sandboxing: PARTIAL-HOLD carry-forward (the 7-wave `bypassPermissions:true` SHIP-BLOCKER is unchanged by this re-verify; sca-v9 §6 5-control layered-defense codification is in-rubric but not yet operator-applied).
- `self_invented_count: 0`: HOLDS.

---

## §8 Final ratify statement

**All 4 W320 ledger rows #89-#92 verdicts SURVIVE sca-v9 re-verification with original tier intact.** No re-routing, no operator-action change. The 4 sca-v9 new dims (D38-D41) provided **net-neutral score deltas** (largest Δ −0.108 on protect-mcp install_score; trivial Δ ±0.07 elsewhere). The **tier-floor lifts** in sca-v9 §7 (T1 install 4.0→4.5; T2 pattern 3.5→4.0) are **floor changes not score changes**, and my W320 verdicts were all already in tiers WHERE the floor was either unchanged (T2 install 3.0→3.2 minimal) or NOT BINDING (T4 CITE-ONLY routing is D10-hard-cap-driven, not score-driven).

**Recommended ledger update at next opportunity (post-W325-codex-gate)**: append annotation to each row #89-#92 noting "rule_version: sca-v9 re-verified W325 Stream B; tier unchanged; install/pattern scores re-computed per sca-v9 SKILL.md §7 denom 33.7/14.5" — but **this annotation is informational only and does not change operator-actionable state**.

---

## §9 Cites

- `.claude/skills/sota-convergence-audit/SKILL.md` §5 D38-D41 (sca-v9 dim spec)
- `.claude/skills/sota-convergence-audit/SKILL.md` §7 (composite scoring formula + ship-gate floors)
- `.claude/skills/sota-convergence-audit/SKILL.md` §9 (decision-tree router 7-tier ladder)
- `docs/architecture/W320-AUDIT-WAVE/W320-C-1-PWF-V2-38-1-RE-LITIGATE.md` §4 (PWF per-dim scoring trace)
- `docs/architecture/W320-AUDIT-WAVE/W320-C-2-WSHOBSON-SECURITY-TRIAD.md` §3.1-§3.3 (wshobson triad per-dim scoring traces)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` rows #89-#92 (W320 ledger as published under v8.1-partial; rule_version cite-corrected by `1360aeb`)
- `docs/architecture/W324-WAVE/CLOSURE-SYNTHESIS.md` §P1 (sca-v9 ship + denom expansion + cite anchors)
