# W325 SOTA-Unleash Closure Synthesis — Insights/Reconcile/R5/Runtime-v8

**Wave**: W325 — Insights audit + multi-session reconcile + R5 unblock exploration + runtime cleanness v8 under sca-v9
**Date**: 2026-05-19
**Baseline (pre-ship)**: `1360aeb` (W320-codex-r2 closure; codex round-3 APPROVED)
**Parallel ratio this dispatch**: 4/4 Agent-in-1-message = **1.000** (cap=4 per W269)
**Mandate**: operator verbatim "DO WE HAVE INSIGHTS FEATURES ENABLED? WE NEED FULL SOTA FEATURES UNLEASHED" + full SOTA-unleash continuation

## Stream Completions

| Stream | Scope | Wall-clock | Verdict |
|---|---|---|---|
| A | CC Insights features audit + CCBP comparison + Langfuse data-flow verify | ~30 min | SHIPPED (5 docs) |
| B | Multi-session reconcile (W321-W324 parallel) + W320 ledger #89-#92 re-verify under sca-v9 | ~30 min | SHIPPED (5 docs) |
| C | R5 SHIP-BLOCKER unblock exploration (3 paste-ready options A/B/C) | ~30 min | SHIPPED (6 docs) |
| D | Runtime cleanness v8 + SOTA repo re-discovery + multi-MCP convergence | ~45 min | SHIPPED (6 docs) |

## TOP-PRIORITY FINDINGS (P0)

### P0-1 (Stream A) — **INSIGHTS HALF-WIRED: Langfuse auth header MISSING**

**Critical**: `OTEL_EXPORTER_OTLP_HEADERS` is absent from env block. CC traces are being EXPORTED via OTLP but **silently REJECTED by Langfuse** due to missing public-key auth. Verified: 0 CC-native `claude_code.interaction`/`llm_request`/`tool.execution`/`hook` spans in Langfuse over runtime lifetime (only 3 historical smoke-test traces).

**Operator-action** (CLAUDE.local.md, NOT settings.json — gitignored secrets):
```powershell
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic " + [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$env:LANGFUSE_PUBLIC_KEY" + ":" + "$env:LANGFUSE_SECRET_KEY"))
```

**ETA-to-fix**: 60 seconds. CR-9 compliant (no settings.json byte-cost).

### P0-2 (Stream A) — **statusLine block ABSENT** from settings.json

CCBP `claude-settings.md:600-720` documents 19 statusline insight fields (model · context-window-pct · spend · session-cost · rate-limit-window · etc.). We deliver 0. ccstatusline path in settings.json:206 was also W286-A-violation (Stream D F2).

**Paste-ready statusLine schema** at `docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md`.

### P0-3 (Stream D) — **settings.json:206 ccstatusline hardcoded user-profile path** (W286-A 6th violation slipped)

`"C:/Users/42/AppData/Roaming/npm/..."` breaks Z:-portability invariant. Other 5 W286-A violations were fixed; this one slipped through. **Paste-ready fix**: replace with `npx -y ccstatusline@<pinned-version>` per CR-9.

### P0-4 (Stream D + B + C) — **R5 7-wave SHIP-BLOCKER carry — Windows-native platform constraint**

Stream C critical discovery: Anthropic CC sandbox supports macOS Seatbelt + Linux bubblewrap + WSL2 ONLY — **Windows native NOT supported**. Options A (full sandbox) + B (hybrid) structurally INERT on Windows.

**Recommendation: Option C** (sca-v9 §6 5-control layered-defense as EQUIVALENT to OS-sandbox; weighted 4.85/5; LOW risk; ~1.5 waves to R5 EQUIVALENT-HOLD via Patch C1 15-entry deny-expansion + signed operator-acceptance-record with 5 falsifiable-inverse claims).

Re-frames 7-wave SHIP-BLOCKER as **platform-vs-cardinal-rule mismatch**, not config error. Operator-decision still required.

### P0-5 (Stream D) — **`claude doctor` 6-wave EXIT-0-silent regression CONFIRMED**

Was EXIT=124-hang (W312-A.2); now EXIT=0-silent (LINES=0) per Stream D 3-probe verification. Runtime diagnostics tool effectively bricked. **P0 file upstream issue at anthropics/claude-code**.

### P0-6 (Stream B) — **sca-v9 SKILL.md §7 install denom OFF-BY-1.0**

Stated 33.7 = 28.7 + 6×1.0 (D-EMP + D35 + D38-D41 × 1.0 each = 6×1.0). Actual sum 28.7 + 6 = 34.7. **Math bug in sca-v9 ship**. All 4 W320 ledger rows #89-#92 verdicts SURVIVE BOTH denom variants per Stream B verification (largest Δ = −0.108 protect-mcp; no re-routing triggered).

## Insights Audit Verdict (operator question)

**Q: DO WE HAVE INSIGHTS FEATURES ENABLED?**

**A: PARTIALLY — telemetry infrastructure is configured but data is silently rejected at Langfuse due to missing auth header.**

| Feature | Status |
|---|---|
| `CLAUDE_CODE_ENABLE_TELEMETRY=1` | ✓ ON |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` | ✓ ON |
| `OTEL_TRACES_EXPORTER=otlp` | ✓ ON |
| `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` | ✓ ON |
| **`OTEL_EXPORTER_OTLP_HEADERS` (auth)** | ✗ **MISSING — Langfuse rejects all CC spans** |
| `OTEL_METRICS_EXPORTER` | ✗ Unset (8 CC metrics dropped) |
| `OTEL_LOGS_EXPORTER` | ✗ Unset (events dropped) |
| `statusLine` settings.json block | ✗ Absent (19 CCBP-documented fields unavailable) |
| `/insights` user-facing command | N/A — does NOT exist in CC 2.1.144 (Anthropic canonical = OTel + Analytics API) |
| `claude --bg` background sessions | N/A — does NOT exist in CC 2.1.144 |
| Langfuse v3.170.0 [CORRECTED W340→v3.160.0 per W347 P2a] reachable | ✓ HEALTHY |
| Phoenix :6006 reachable (metrics/logs target) | ✓ HEALTHY |
| ccusage MCP daily/monthly/session/blocks | ✓ ON |
| context-mode `/ctx-stats` + `/ctx-insight` | ✓ ON |

**Bottom line**: Telemetry "enabled" but invisible. Fix is 60-sec env-var addition to CLAUDE.local.md.

## Multi-Session Reconciliation Verdict (Stream B)

- **All 4 W320 ledger rows #89-#92 SURVIVE sca-v9 re-verification** (no tier changes; largest score Δ = −0.108)
- **Linear history clean**: parallel-session `8e43c24` (W324 META-FOUNDATION) bundled W321+W322+W323+W324 atomically; 3 min before my W320; no merge conflicts
- **3 NEW W326 findings**: sca-v9 §7 denom math bug + W323-4 dims (supply_chain_attestation + layered_defense_depth + degraded_mode_explicit) NOT shipped in sca-v9 (PROSE only) + sca-v9 ship-gate floor lifts operator-aware
- **76 raw backlog → 28 effective** after de-dup

## SOTA Discovery (Stream D)

**Top-3 W326 install candidates**:
1. **`openlit/openlit`** T1 INSTALL-CANDIDATE (Σ=4 convergence; closes nvidia-gpu-exporter observability gap; install_score ≈4.5)
2. **`anthropics/skills`** T1 INSTALL-CANDIDATE (CR-1 trust-source priority; install_score ≈4.7)
3. **`imlrz/DeepResearch-Bench-II`** T3 EVAL-LANE (wire as harness Lane F)

**Anti-bias 8th-wave-validated**: stars inverse-correlate with tier (top candidates 2,454–19,409 stars).

## Cardinal-Rule Invariants Post-Ship

| Rule | State |
|---|---|
| R1-R4 | ✓ HOLD |
| R5 safety via CC permissions | ⚠ PARTIAL-HOLD 8-wave SHIP-BLOCKER (Stream D F3 adds 8th convergent finding; Stream C Option C path-forward documented; W326 operator-decision REQUIRED) |
| `self_invented_count: 0` | ✓ HOLDS |
| CLAUDE.md ≤50 LOC body | ✓ (pending W325 status block insert + W317-Stream-A archive) |
| `T6 verdict count` | 96 post-W320 (W325 audit-only; no new ledger rows; W326 may add candidates from Stream D top-3) |

## W326 Forward Queue (~50 operator-AIs total)

**P0 (operator-blocking + technical)** — 9:
1. **OTEL_EXPORTER_OTLP_HEADERS** add to CLAUDE.local.md (60 sec)
2. **statusLine block** add to settings.json (CCBP schema)
3. **settings.json:206 ccstatusline npx-form** fix (W286-A 6th violation)
4. **R5 Option C operator-decision** + acceptance-record sign + Patch C1 15-entry deny-expansion
5. **claude doctor upstream issue file** (6-wave EXIT-0-silent regression)
6. **basic-memory v0.21.1 → v3.3.1 reconcile** (silent 3-major-version drift)
7. **sca-v9 §7 install denom 33.7 → 34.7 codex-ratify** (Stream B math finding)
8. **SEV-1 Perplexity key rotation** per W319-SEV1-INCIDENT (carry W319+W320+W325)
9. **Interactive `/plugin update` ECC + agent-teams** (operator session)

**P1 (~15)**: openlit/openlit T1 install + anthropics/skills T1 install + DeepResearch-Bench-II Lane F wire + OTEL_METRICS_EXPORTER + OTEL_LOGS_EXPORTER to Phoenix :6006 + OTEL_LOG_TOOL_DETAILS privacy opt-ins + W323-4 dims absorb into sca-v9 §6 PROSE-to-SCORED + langfuse `.mcp.json` CR-9 align + protect-mcp install + review-agent-governance install + per-subagent budget paste

**P2/P3 (~26)**: from streams + bundled forward queue

## CLAUDE.md Edits This Commit

- L41 NEW W325 status mega-paragraph (rolling-3 retention)
- W317-Stream-A status archived to PRE-W319.md NEW
- L49 archive pointer updated

## Codex Round-1 Gate

After this synthesis is committed, fire codex GPT-5.5 round-1 review on the W325 ship commit per `goal-prompt-synthesis` SKILL.md §6.2. Iterate rounds until APPROVE.
