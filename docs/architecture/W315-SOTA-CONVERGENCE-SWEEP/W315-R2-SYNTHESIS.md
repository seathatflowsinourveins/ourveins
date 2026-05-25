# W315-r2 Synthesis — SOTA Convergence Sweep (Streams A-E)

**Wave**: W315-r2 (closure synthesis on top of W315 base wave shipped earlier this session at `e9c0ef8`/`13bd847`/`752beab`/`7c571fc`)
**Date**: 2026-05-19
**Branch**: `sota-converge-w310`
**Dispatch**: 5 Agents / 1 message = **100% parallel_ratio this dispatch** (clears W269/W312-D target ≥0.7 with margin)
**Cardinal-rule conformance**: R1-R5 ✓ · CLAUDE.md ≤50 LOC body ✓ · `self_invented_count: 0` ✓ · sca-v7 LIVE

---

## Executive summary

W315-r2 (this-session) added 5 complementary streams on top of the W315 base wave (DSPy T1 INSTALL · NSSM-switch · MCDA matrices · tier-routing precision). My streams covered: (A) full repo-refresh ingest of 9 named repos — runtime is well-anchored with 6 zero-drift + 1 T0 IMMEDIATE-UPGRADE (`mksglu/context-mode` v1.0.136→v1.0.141 PR #627 Zod-preprocessor); (B) 17 NEW silent-fallback findings on top of W314-r2 v4 — 6 inline fixes APPLIED (3 HIGH stale-cite closures); (C) sca-v7→v8 DRAFT with 5 deltas + 4 new dims D34-D37 (arch-itself install_score 4.535 conservative / 4.758 re-summed both clear 4.5 floor); (D) 24 net-new SOTA candidates via 6-MCP cascade (37.5% low-star — anti-bias VALIDATED 5th-time; top-5 W316 audit queue includes `haizelabs/verdict` 4.65 + `chrome-devtools-mcp v1.0.0` 4.55 closing W314 B-3 drift); (E) rolling-30d parallel_ratio 0.5875 (methodology codified — group by `message.id`) with today-only 0.8235 (above 0.7 target) + 7/10 services healthy + 2 SEV-2 (Langfuse crashed today + Hindsight :9077 no listener) + 5 CLAUDE.md drifts identified for refresh. **0 CR-9 violations · 0 cardinal-rule-2 violations · 0 SHIP-BLOCKERs.**

---

## Per-stream summary matrix

| Stream | Focus | Key result | Deliverable | Operator-AIs |
|---|---|---|---|---|
| **A** Repo refresh + line-by-line ingest | 9 repos probed | 6 zero-drift · 1 T0 ctx-upgrade · 17 NET-NEW patterns · CCBP owner-rename cite-fix | `STREAM-A-REPO-REFRESH-INGEST.md` (~13 KB) | 12 (AI-W315-A-1..12) |
| **B** Silent-fallback v5 audit | runtime hardening | 17 NEW findings (6 HIGH/7 MED/4 LOW) · 6 inline APPLIED · W314-r2 4 fixes intact · F-4 OllamaServe CLOSED-INTENTIONAL | `STREAM-B-SILENT-FALLBACK-V5.md` (~7.4 KB) | 19 (deferred-W316) |
| **C** Research-arch v8 DRAFT | sca-v7→v8 design | 5 deltas Δ30-Δ34 · 4 new dims D34-D37 · denom 28.0→28.5/12.6→13.4 · arch v8 install_score 4.535/4.758 · perplexity-MCP RE-EVALUATED INSTALL | `STREAM-C-RESEARCH-ARCH-V8-DESIGN.md` (~55.8 KB) | 13 (AI-W315-V8-1..13) |
| **D** SOTA discovery cascade | multi-MCP fan-out | 24 net-new candidates · 9 low-star (37.5%) · MCP-cascade parallel_ratio 0.893 · $0.53/$5 cost · cascade_degraded=true | `STREAM-D-SOTA-DISCOVERY-CASCADE.md` (~24 KB) | 5 (top-5 W316 audit queue) |
| **E** Orchestration + ecosystem + local model health | runtime monitoring | parallel_ratio 0.5875 rolling / 0.8235 today · 7/10 healthy · 2 SEV-2 · 5 CLAUDE.md drifts | `STREAM-E-ORCHESTRATION-AND-MONITORING.md` | 24 (12 NEW W316-E-* + 12 W314-r2 carry) |

**Total forward-AIs**: 73 (12 A + 19 B + 13 C + 5 D + 24 E)

---

## Cross-stream convergences

### 1. ChromeDevTools/chrome-devtools-mcp v1.0.0 major bump (closes W314 B-3)

- **Stream D** discovered the v0.26.0 → v1.0.0 major bump dropped SAME-DAY as W315 (4.55 prelim score, T1 RE-VERIFY).
- **Stream A** earlier sca-v6 audit noted upstream HEAD = v0.26.0 exact-match for installed CC plugin (no drift).
- **Reconciliation**: the W314-r1 finding "OBSOLETE-RESOLVED" was correct at the time of W314-r1 (HEAD was 0.26.0). v1.0.0 dropped today; W316 needs sca-v7 audit for upgrade decision.

### 2. ECC plugin SHA discrepancy

- **Stream A** reports ECC `33ed494a` matches W314-r2 cite (Stream A probed the installed plugin SHA against the W314 citation).
- **Stream E** reports installed ECC plugin SHA `841beea` is 8+ commits behind upstream HEAD `f3cd00625222` (dropped today 12:22Z).
- **Reconciliation**: both probes are correct — `33ed494a` was the W314 target-of-update; the installed plugin may have already moved to `841beea` mid-session; upstream advanced further to `f3cd00625222`. **AI-W315-A-1 + AI-r2-1 supersede with new target `f3cd00625222`** for W316 `/plugin update`.

### 3. Parallel_ratio measurement reproducibility

- **Stream E** reproduces W314-r1 baseline 0.587 exactly (methodology now codified — group by `message.id`).
- **This-dispatch parallel_ratio**: 5/5 = 100% (5 Agents in 1 assistant message).
- **Today-only parallel_ratio**: 0.8235 (above 0.7 target) — indicates active enforcement when in a research/audit context.
- **Forward-AI**: parallel_ratio telemetry hook for continuous measurement (W316).

### 4. F-SS-1 PROJECT_DIR state-redirect SILENTLY BROKEN — RE-CONFIRMED 2nd-time

- **W314-r1-C** finding: `CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects` is silently NOT honored by CC 2.1.144; session writes go to `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/`.
- **Stream E** today: 0 JSONL files at the state-redirect path; 3041 JSONL files at the in-tree path (1600 main + 1441 subagent).
- **Forward-AI**: file upstream issue on `anthropics/claude-code` GitHub.

### 5. GitHub MCP `search_repositories` 0-count — 4th-time-confirmed silent-fallback

[NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths. Source-deep-dive evidence: github/docs `searching-for-repositories.md` lists qualifiers as valid; live api.github.com probes return HTTP 200 with valid items for canonical qualifiers; github.com runtime API + perplexity.ai aggregated 5-source review confirm validity. Workaround pattern (Stage-0 get_repository probe) REMAINS SOTA for rate-limit-budget reasons.]

- W312-D F1 + W313-D + W314-B + **W315 Stream D F-W315-2** → 4 consecutive waves confirm.
- **Stream D** explicitly skipped `search_repositories` in this wave; used exa + WebSearch + hf-hub-repo-search instead.
- **Forward-AI** (AI-r2-7 + AI-W315-D-1): codify Stage-0 existence-probe via REST `gh api /search/repositories` fallback in goal-prompt-synthesis SKILL.md.

### 6. v8 SHIP-W316-WITH-3-CONDITIONS path

Stream C recommended deferring sca-v7→v8 SKILL.md edit to W316 once:
1. codex GPT-5.5 cross-model round-1 verdict APPROVE/NEEDS-MINOR-REVISION on the v8 DRAFT.
2. perplexity-MCP smoke-installed (real `mcp__perplexity__sonar-deep-research` query returns).
3. v7→v8 ×0.9 backwards-compat downweight codified in SKILL.md Δ-cadence block.

Same defer-pattern as W291 v4 / W297 v5 / W313 v7 — DRAFT shipped, SKILL.md edit deferred to next wave for ship-gate verification.

---

## 5 CLAUDE.md drifts identified by Stream E

| # | Drift | Current CLAUDE.md state | Truth-up needed |
|---|---|---|---|
| 1 | marketplace count | L34 (already disambiguated by Stream B inline edit): "16 marketplaces (22 defined; 6 unused defs queued for W316 audit) — actual `.claude/plugins/cache/` dir count: 18" | ✓ APPLIED by Stream B inline this commit |
| 2 | Phoenix state | L35 "Phoenix :16006 STOPPED-by-design" | NEEDS-FIX: Phoenix RUNNING via docker (started today 12:29:12Z) |
| 3 | OllamaServe state | L35 "Ollama :16700 ... STOPPED-by-design" | NEEDS-FIX: OllamaServe RUNNING (idle, 0 models) — was W312-A.6 carry-over |
| 4 | plugin count disambiguation | L34 "68 plugins installed (47 enabled)" | NEEDS-FIX: "68 declared / 64 actually installed (47 enabled)" |
| 5 | ECC SHA | not directly in body | NEEDS-FIX: add as W316 forward-AI (target `f3cd00625222`) |

**This commit applies drifts #2/#3/#4** to L34/L35; drift #5 becomes operator-AI for W316 `/plugin update`.

---

## Forward-AI consolidation (W316)

### Apply-immediately candidates (operator decision required)

- **AI-W315-A-1 [T0]** `/ctx-upgrade` v1.0.136→v1.0.141 (closes 4 silent Zod-preprocessor rejections per PR #627 advisory).
- **AI-r2-1 / AI-W315-A-1-supersede** ECC plugin `/plugin update` to `f3cd00625222` (8+ commits past `33ed494a` target).
- **AI-W315-A-3 [T1]** sandbox + worktree.baseRef block in settings.json (closes W314 Stream E sandbox-half-implemented).

### Deep-audit candidates (sca-v7 audit required)

- **haizelabs/verdict** 4.65 prelim (ICLR 2026 + DSPy-integrated judge-on-judge SOTA — DIRECT match for sca-v7 D30 META-DIM operationalization).
- **stanfordnlp/dspy + GEPA** 4.65 prelim (W314 carry-over · W315 base-wave T1 INSTALL RATIFIED at `dspy==3.2.1` per W315-T1-CASCADE-CLOSURE).
- **microsoft/agent-governance-toolkit** 4.55 prelim (SPIFFE+OPA+OTel CNCF-aligned · OWASP ASI 10/10 coverage for D25).
- **chrome-devtools-mcp v1.0.0** 4.55 prelim (RE-VERIFY major bump same-day-as-W315).
- **cj-vana/claude-swarm** 4.45 prelim (W269 parallel-dispatch mandate primitive).
- **addyosmani/agent-skills** T2 graduation candidate (W314 cited as T2→T1 candidate; W315 base wave INSTALL RATIFIED per W315-T1-CASCADE-CLOSURE).

### Defer-deferral candidates

- **Langfuse :3000 restart** (SEV-2 — operator decision; Stream E flagged MethodNotAllowedError crash today 12:29:09Z).
- **Hindsight :9077 decision** (SEV-2 — Stream E found no listener; operator decision on retire-or-restart).
- **`claude doctor` 30s hang** (W312-A.2 open since W312; Stream E confirms still hangs EXIT=124 — file upstream issue on `anthropics/claude-code`).
- **F-SS-1 PROJECT_DIR state-redirect** (file upstream issue on `anthropics/claude-code`).

### v8 SKILL.md edit (W316 ship-gate)

13 AI-W315-V8-* operator-AIs from Stream C plus 3 ship-conditions (codex round-1 ratify + perplexity-MCP smoke + ×0.9 downweight codification).

---

## Ledger writes (T6 basic-memory + VERDICT-LEDGER.md)

**Defer policy**: per Stream D explicit deferral statement, all 24 net-new candidates are PRELIM-only; full sca-v7 audits + ledger T6 writes happen in W316. The top-5 audit queue is the W316 prioritized list. No T1/T2 verdict ledger writes this synthesis.

---

## Codex GPT-5.5 cross-model gate

Plugin-native Stop-hook auto-fires at session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37 stop-review-gate-hook.mjs` (timeout 900s). No additional action needed for cross-model ratification of W315-r2.

---

## Cardinal-rule conformance check

| Rule | Status | Evidence |
|---|---|---|
| R1 Install primitives only from trusted plugins/skills/agents | ✓ | No new self-invented primitives this wave; all candidates are plugin/skill/MCP from upstream sources |
| R2 Hooks = upstream-plugin OR direct-CLI in settings.json | ✓ | Stream B verified W314-r2 4 applied fixes intact; sanctioned shim `context-mode-cache-heal.mjs` ≤2KB anchored to anthropics/claude-code#46915 |
| R3 Subagents = installed upstream OR documented subagent system | ✓ | 5 Agent dispatch via documented `general-purpose` subagent_type |
| R4 Project behavior in CLAUDE.md + settings.json (no ad-hoc auto-fire rules) | ✓ | `.claude/rules/` empty (project-side); ECC plugin-shipped `.claude/rules/` auto-loads; `self_invented_count: 0` HOLDS |
| R5 Safety via CC permissions + sandboxing | ✓ | No new guard scripts; settings.json permissions unchanged |

---

## Files committed this wave

- `docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-A-REPO-REFRESH-INGEST.md` (~13 KB)
- `docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-B-SILENT-FALLBACK-V5.md` (~7.4 KB)
- `docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-C-RESEARCH-ARCH-V8-DESIGN.md` (~55.8 KB)
- `docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-D-SOTA-DISCOVERY-CASCADE.md` (~24 KB)
- `docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-E-ORCHESTRATION-AND-MONITORING.md`
- `docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/W315-R2-SYNTHESIS.md` (this file)
- `.claude/skills/mem-recall/SKILL.md` (Stream B 4-cite-refresh edit)
- `CLAUDE.md` (Stream B L3 + L34 + this wave's L34/L35 state drifts)
- `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W315.md` (rolling-3-appendix: W312-ship archived)

Total cross-stream artifact size: ~100 KB.
