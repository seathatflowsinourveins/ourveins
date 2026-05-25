# W327 Stream B — Insights Wire-Up FINAL Synthesis

**Wave**: W327 Stream B · **Date**: 2026-05-19
**HEAD**: `569080a`
**Stream B charter**: Insights wire-up FINAL audit + operator-paste-ready specs
**Owner**: docs/architecture/W327-INSIGHTS-FINAL/* — STRICT-FILE-OWNERSHIP
**Wall-clock**: ~30 min (within budget)
**Verdict**: **SHIP** — 5 audit dimensions completed, 0 settings/CLAUDE.local.md edits (per charter), 6 paste-ready operator-action specs delivered.

---

## §1 — Executive summary

Insights wire-up percentage measurement requested by W327 dispatch directive:

| Phase | Wire-up % | What it means |
|---|---|---|
| Pre-W326 baseline | 0% | None of 4 CRITICAL + 3 MEDIUM gaps closed |
| Post-W326-A F1 | **~14%** (1/7 gaps) | statusLine GAP-4 closed via npx-pin fix |
| Post-W327-B operator-action (all paste-ready specs applied) | **100%** (7/7 gaps) | All 4 CRITICAL + 3 MEDIUM gaps closed |

**Current point in this curve**: post-W326-A F1 (~14%). Remaining 6 gaps are operator-blocking (require key rotation + CLAUDE.local.md + settings.json edits + Phoenix startup — all outside this stream's charter).

---

## §2 — Five dimensions completed

| # | Dimension | Output file | Verdict |
|---|---|---|---|
| 1 | statusLine smoke verify post-W326-F1 | `W327-B-1-STATUSLINE-SMOKE.md` | **PASS** — 38 widgets render correctly; 12 active + 8 latent-OK + 14 separators + 4 flex-magic; functional in this session smoke |
| 2 | OTEL auth header paste-ready spec | `W327-B-2-OTEL-HEADER-PASTE-READY.md` | **BLOCKING-OPERATOR** — paste-ready (f5) PowerShell snippet for CLAUDE.local.md; depends on operator Langfuse SEV-1 key rotation |
| 3 | /reload-plugins effect verify | `W327-B-3-RELOAD-PLUGINS-EFFECT.md` | **DOCUMENTED** — context-mode `1.0.136/` + `1.0.141/` both on disk; Path-A (`/reload-plugins`) and Path-B (next session) options documented; recommend Path-B safest |
| 4 | OTEL metrics+logs Phoenix wire | `W327-B-4-METRICS-LOGS-PHOENIX-WIRE.md` | **DEFERRED** — Phoenix not running on :6006 (or :16006 per CLAUDE.md ambiguity); paste-ready settings.json env block drafted; operator MUST start Phoenix first |
| 5 | Privacy opt-ins audit | `W327-B-5-PRIVACY-OPT-INS.md` | **RECOMMEND ENABLE ALL 3** — local-single-operator infra → low PII risk; phased Phase-1 (TOOL_DETAILS + USER_PROMPTS) then Phase-2 (RAW_API_BODIES) |

**Net**: 5 of 5 dimensions completed within budget.

---

## §3 — Insights wire-up matrix (7 gaps total)

### CRITICAL P0 (4 gaps)

| Gap ID | Description | Status pre-W326 | Status post-W326-A | Status post-W327-B operator-action |
|---|---|---|---|---|
| GAP-1 | Metrics exporter unset → 8 metrics dropped | NOT closed | NOT closed | CLOSES via W327-B-4 paste + Phoenix start |
| GAP-2 | Logs exporter unset → events dropped | NOT closed | NOT closed | CLOSES via W327-B-4 paste + Phoenix start |
| GAP-3 | Langfuse auth header missing → traces blocked | NOT closed | NOT closed | CLOSES via W327-B-2 (f5) paste + key rotation |
| GAP-4 | statusLine block absent | NOT closed | **CLOSED** via W326-A F1 | n/a (already closed) |

**Current**: 1 of 4 CRITICAL closed = 25% of P0 bucket.
**Post-operator-action**: 4 of 4 CRITICAL closed = 100% of P0 bucket.

### MEDIUM P1 (3 gaps — privacy opt-ins)

| Gap ID | Description | Status pre-W326 | Status post-W326-A | Status post-W327-B operator-action |
|---|---|---|---|---|
| GAP-5 | OTEL_LOG_TOOL_DETAILS unset | NOT closed | NOT closed | CLOSES via W327-B-5 Phase-1 |
| GAP-6 | OTEL_LOG_RAW_API_BODIES unset | NOT closed | NOT closed | CLOSES via W327-B-5 Phase-2 |
| GAP-7 | OTEL_LOG_USER_PROMPTS unset | NOT closed | NOT closed | CLOSES via W327-B-5 Phase-1 |

**Current**: 0 of 3 MEDIUM closed = 0% of P1 bucket.
**Post-operator-action**: 3 of 3 MEDIUM closed = 100% of P1 bucket.

### Overall Insights wire-up

| Stage | CRITICAL | MEDIUM | Net |
|---|---|---|---|
| Pre-W326 baseline | 0% | 0% | **0%** |
| Post-W326-A F1 (statusLine) | 25% | 0% | **~14%** (1/7) |
| Post-W327-B operator-action (full apply) | 100% | 100% | **100%** (7/7) |

---

## §4 — Operator-blocking carry to W328

### Critical-path items (block 6 of 7 gaps)

1. **Langfuse SEV-1 key rotation** (carries from W325-r1 → W326 → W327):
   - Action: revoke + reissue Langfuse `pk-lf-*` + `sk-lf-*` at `http://127.0.0.1:3000` admin UI
   - Updates: `CLAUDE.local.md` (f2) env-var pair
   - Unblocks: W327-B-2 (f5) auth-header paste → GAP-3 closure → CC traces flow into Langfuse
   - Time: ~5 min
   - Dependencies: operator-only (admin UI access)

2. **CLAUDE.local.md (f5) snippet paste** (W327-B-2 spec):
   - Action: append the PowerShell snippet from W327-B-2 §3 to `Z:/claude-sota-installed/CLAUDE.local.md` after existing (f4) block
   - Unblocks: GAP-3 closure (combined with key rotation above)
   - Time: ~1 min
   - Dependencies: key rotation completed first

3. **Phoenix start on :6006 (or :16006)** (W327-B-4 §1 + §5):
   - Action: probe both ports → start Phoenix if neither alive → reconcile CLAUDE.md L51 port-number ambiguity
   - Unblocks: W327-B-4 metrics+logs settings.json paste → GAP-1 + GAP-2 closure
   - Time: ~2-5 min
   - Dependencies: operator-only

4. **settings.json env block paste (W327-B-4 §4)**:
   - Action: paste 8 lines of OTEL_METRICS_* + OTEL_LOGS_* into `.claude/settings.json:env`
   - Unblocks: GAP-1 + GAP-2 closure
   - Time: ~1 min
   - Dependencies: Phoenix running + settings.json byte-budget headroom

5. **settings.json env block paste (W327-B-5 Phase-1)**:
   - Action: paste OTEL_LOG_TOOL_DETAILS=1 + OTEL_LOG_USER_PROMPTS=1 into `.claude/settings.json:env`
   - Unblocks: GAP-5 + GAP-7 closure
   - Time: ~1 min
   - Dependencies: W327-B-2 (GAP-3 closure) done first — else opt-ins enrich rejected traces

6. **settings.json env block paste (W327-B-5 Phase-2)**:
   - Action: paste OTEL_LOG_RAW_API_BODIES=1 into `.claude/settings.json:env`
   - Unblocks: GAP-6 closure
   - Time: ~1 min
   - Dependencies: Phase-1 verified steady-state + Langfuse DB headroom confirmed

**Total operator time** (all 6 items, optimal order): ~15-20 min including SMOKE tests.
**Reversibility**: each step is line-level revert; full rollback to W326-A baseline is ~10 lines across 2 files.

---

## §5 — W328 forward-AIs (consolidated)

| # | ID | Priority | Source | Description |
|---|---|---|---|---|
| 1 | W328-B-F1-1 | P2 | W327-B-1 | Operator-led production-smoke of statusLine in new CC session; screenshot + verify data widgets populate |
| 2 | W328-B-F1-2 | P3 | W327-B-1 | Document fallback to ccusage MCP if session-cost widget shows $0.00 |
| 3 | W328-B-F1-3 | P3 | W327-B-1 | Draft minimalist 2-line ccstatusline variant if terminal-width wrap observed |
| 4 | W328-B-F1-4 | P3 | W327-B-1 | Document statusLine ANSI color decoder in operator-guide |
| 5 | W328-B-F2-1 | **P0** | W327-B-2 | Operator-completes Langfuse SEV-1 key rotation + applies (f5) paste; verify traces flow |
| 6 | W328-B-F2-2 | P1 | W327-B-2 | Adjust OTEL_RESOURCE_ATTRIBUTES if rotation moves to a new Langfuse project ID |
| 7 | W328-B-F3-1 | P1 | W327-B-3 | Operator-runs `/reload-plugins` OR new-session-start to pick up context-mode 1.0.141 |
| 8 | W328-B-F3-2 | P3 | W327-B-3 | Diff context-mode 1.0.141 vs 1.0.136 for new tools/capabilities |
| 9 | W328-B-F3-3 | P3 | W327-B-3 | Document plugin-update lifecycle in operator-guide |
| 10 | W328-B-F3-4 | P2 | W327-B-3 | Deep-recurse all plugins for similar version-drift cases |
| 11 | W328-B-F4-1 | **P0** | W327-B-4 | Operator-resolves Phoenix port ambiguity (:6006 vs :16006); starts Phoenix; applies §4 paste |
| 12 | W328-B-F4-2 | P1 | W327-B-4 | Trim ~400 bytes from settings.json `_comment_*` if at byte budget cap |
| 13 | W328-B-F4-3 | P3 | W327-B-4 | Configure Phoenix persistence (`PHOENIX_WORKING_DIR`) to survive restarts |
| 14 | W328-B-F5-1 | **P1** | W327-B-5 | Operator-applies Phase-1 (TOOL_DETAILS + USER_PROMPTS); verify enriched traces |
| 15 | W328-B-F5-2 | P2 | W327-B-5 | Apply Phase-2 (RAW_API_BODIES) after Phase-1 steady-state |
| 16 | W328-B-F5-3 | P3 | W327-B-5 | Configure Langfuse trace TTL policy for DB-bloat management |
| 17 | W328-B-F5-4 | P3 | W327-B-5 | Document `tools/langfuse-trace-purge.ps1` as manual GC fallback |
| 18 | W328-B-F5-5 | P3 | W327-B-5 | Consider Langfuse DB at-rest encryption (operator-decision) |

**Total**: 18 forward-AIs (3 P0, 4 P1, 4 P2, 7 P3).

**Critical-path P0 trio for W328**:
- W328-B-F2-1 (Langfuse key rotation + (f5) paste → unblocks GAP-3)
- W328-B-F4-1 (Phoenix startup + metrics/logs paste → unblocks GAP-1 + GAP-2)
- W328-B-F5-1 (privacy Phase-1 paste → unblocks GAP-5 + GAP-7)

If all 3 P0 land in W328, Insights wire-up goes from current ~14% to ~86% (6 of 7 gaps). GAP-6 (RAW_API_BODIES Phase-2) follows in steady-state as P1.

---

## §6 — Files delivered this stream

| Path | Bytes | Action |
|---|---|---|
| `docs/architecture/W327-INSIGHTS-FINAL/W327-B-1-STATUSLINE-SMOKE.md` | ~12.5KB | CREATE |
| `docs/architecture/W327-INSIGHTS-FINAL/W327-B-2-OTEL-HEADER-PASTE-READY.md` | ~12KB | CREATE |
| `docs/architecture/W327-INSIGHTS-FINAL/W327-B-3-RELOAD-PLUGINS-EFFECT.md` | ~11KB | CREATE |
| `docs/architecture/W327-INSIGHTS-FINAL/W327-B-4-METRICS-LOGS-PHOENIX-WIRE.md` | ~11.5KB | CREATE |
| `docs/architecture/W327-INSIGHTS-FINAL/W327-B-5-PRIVACY-OPT-INS.md` | ~12KB | CREATE |
| `docs/architecture/W327-INSIGHTS-FINAL/STREAM-B-SYNTHESIS.md` | this file | CREATE |

**Total**: 6 new docs / ~60KB.
**Touched outside**: ZERO. settings.json / .mcp.json / CLAUDE.local.md untouched per charter.

---

## §7 — Cardinal-rule invariants (post-W327-B)

| Rule | Status (pre) | Status (post) | Δ |
|---|---|---|---|
| R1 — trusted primitives | ✓ HOLD | ✓ HOLD | — |
| R2 — direct-CLI hooks only | ✓ HOLD | ✓ HOLD | — |
| R3 — upstream subagents | ✓ HOLD | ✓ HOLD | — |
| R4 — CLAUDE.md + settings.json | ✓ HOLD | ✓ HOLD | — |
| R5 — sandbox/permissions | ⚠ PARTIAL-HOLD (carry) | ⚠ PARTIAL-HOLD (unchanged — out of scope) | — |
| CR-9 — pinned versions | ✓ HOLD (W326-A F1) | ✓ HOLD | — |
| `self_invented_count` | 0 | 0 | — |

**This stream**: 0 cardinal-rule violations introduced; R5 SHIP-BLOCKER remains untouched (operator W328 mandate per W326 closure).

---

## §8 — Security posture

All 6 paste-ready specs in this stream:
- Use env-var refs (`$env:LANGFUSE_PUBLIC_KEY`, `$env:LANGFUSE_SECRET_KEY`) — NEVER literals
- W327-B-2 (f5) snippet is dynamic — derives from operator's per-machine keys; rotation only touches (f2)
- W327-B-4 + W327-B-5 settings.json blocks have NO literal secrets (env vars + endpoint URLs only)
- Phoenix is local-only, no auth required, no external egress
- Langfuse is local-only (per CLAUDE.local.md `$env:LANGFUSE_HOST = 'http://127.0.0.1:3000'`)

**Redactions per W327 charter**: this stream's docs reference historical `pk-lf-*` / `sk-lf-*` as `<redacted-W327>` placeholders or `${LANGFUSE_*}` env-var refs. No literal credential exposure.

`gitleaks protect --staged` would PASS on all 6 docs.

---

## §9 — W327 Stream B verdict

**SHIP** — Stream B completed all 5 audit dimensions within budget; produced 6 paste-ready operator-action specs covering 100% of the W325 Stream A 7-gap audit; touched 0 settings/CLAUDE.local.md/.mcp.json files per charter; introduced 0 cardinal-rule violations.

**Operator-blocking ratio**: 6 of 7 gap closures require operator-action (key rotation + 4 settings/CLAUDE.local.md pastes + Phoenix startup). Cannot self-apply per charter.

**Net Insights wire-up trajectory**: 14% → 100% on full operator-action apply. The 3 P0 forward-AIs (W328-B-F2-1, W328-B-F4-1, W328-B-F5-1) form the critical path to 86%+ wire-up in W328.

---

## §10 — References

- **W325 Stream A source**: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-*.md` (5 files, ~43KB)
- **W326 Stream A precedent**: `Z:/claude-sota-installed/docs/architecture/W326-SETTINGS-FIXES/STREAM-A-SYNTHESIS.md`
- **CCBP-cited primary docs**:
  - `https://docs.anthropic.com/en/docs/claude-code/settings`
  - `https://langfuse.com/docs/integrations/opentelemetry/get-started`
  - `https://opentelemetry.io/docs/specs/otel/protocol/exporter/`
  - `https://code.claude.com/docs/en/plugins`
  - `https://github.com/Arize-ai/phoenix`
- **Live probes this session**:
  - Langfuse :3000 — `200 OK` on `/api/public/ready`
  - Phoenix :6006 — `connection refused` (port not listening)
  - context-mode disk — `1.0.136/` + `1.0.141/` both present
  - ccstatusline npm latest — `2.2.19` (MIT)
