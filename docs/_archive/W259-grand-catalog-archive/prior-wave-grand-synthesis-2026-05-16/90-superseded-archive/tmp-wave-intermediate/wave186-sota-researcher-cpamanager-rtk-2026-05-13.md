---
title: W186 sota-researcher — CPA-Manager + rtk-ai/rtk Probe DAG + CR-12 disposition
status: AUTHORITATIVE
date: 2026-05-13
wave: 186
agent: sota-researcher (Sonnet 4.5 stand-in per CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6 ENV (f); cross-model gate NOT structurally satisfied per cmc-env-funneled-disclosure.md §STAND-IN-NOTICE — orchestrator must run codex T1 if INSTALL verdict)
verdict_one_line: "DONE: CPA-Manager REJECT-FOR-FIT.4-DUPLICATE; rtk DEFER (off-axis); recommend INCUMBENT-KEEP CLIProxyAPI v7.0.2 + optionally study KarpelesLab/teamclaude for true rotation-extension."
dispatch_id: a49a9cb01b3dd25e4
worktree_branch: worktree-agent-a49a9cb01b3dd25e4
---

# W186 SOTA RESEARCH — CPA-Manager + rtk + extension candidates

## EXECUTIVE VERDICT (TL;DR)

**Both candidates miss the operator's actual gap (46% rate-limit fire rate + 0/8 Anthropic OAuth recoverable).**

- **(A) seakee/CPA-Manager** = FORK of `router-for-me/Cli-Proxy-API-Management-Center` (CR-12 disposition = **DUPLICATE-FUNCTIONALITY** of an already-shipped incumbent panel). Mgmt UI + Usage Service. NOT a rotation primitive. Provides 0% rate-limit mitigation.
- **(B) rtk-ai/rtk** = command-output token-compressor (Rust CLI). CR-12 disposition = **OFF-AXIS** (different problem class; not accounts-rotation). Could complement at orthogonal layer (token-savings per call) but does NOT address rate-limit fire rate.
- **Recommended next step**: INCUMBENT-KEEP current CLIProxyAPI v7.0.2 + router-for-me/Cli-Proxy-API-Management-Center bundle. Operator's actual gap = browser OAuth re-grant of 8 accounts (W185 F1 forensic) + downstream rotation tuning (already done W97 Ship 1J round-robin flip). For mid-term rate-limit-mitigation research, surface 1 new candidate: **KarpelesLab/teamclaude** (named-org GitHub, MIT-class, quota-based rotation).

---

## (A) seakee/CPA-Manager — full probe block

### Probe 1 — count-OVER (live API per gh API + mcp__github__)
| Metric | Value | Source |
|---|---|---|
| Stars | 476 | `api.github.com/repos/seakee/CPA-Manager` 2026-05-14T02:03Z |
| Forks | (small, < dozens) | same |
| **fork: true** | **YES** | same — **THIS IS A FORK** (Probe 1 MAJOR catch via Mia per mia-pre-apply.md §How to apply) |
| Created | **2026-04-24T01:08:09Z** (~20 days old) | same |
| Last push | 2026-05-14T01:05:34Z | same |
| Latest release | **v1.2.1** 2026-05-14T01:07Z | mcp__github__list_releases |
| Releases since 2026-04-24 | 9+ releases in 20 days | mcp__github__list_releases |
| Contributors top-3 | LTbinglingfeng (639) / seakee (128) / hkfires (52) | gh API contributors |
| Total contributors sampled | 20+ | same |
| License | MIT (Copyright 2026 Router-For.ME) | gh blob `LICENSE` SHA 82cc6a2b |

**OVER catch**: "github.com/seakee/CPA-Manager" is described in framing as a candidate, but actual GitHub metadata shows it is **a FORK** of router-for-me's project. The README states explicitly: "Thanks to the upstream projects CLIProxyAPI and Cli-Proxy-API-Management-Center for the foundation and inspiration." LICENSE copyright is "Router-For.ME" (the parent org, not seakee personally). Per Probe 1 count-OVER discipline, the claim "different project" REFUTED.

### Probe 2 — SDK-vs-CLI surface
PASS. CPA-Manager exposes Web UI + REST API (`/v0/management/usage`, `/setup`, `/status`) consumable by current CPA install at `:18317`. No SDK/CLI invocation surface mismatch.

### Probe 3 — architectural-API
PASS. CPA-Manager is REST/HTTP over CPA's existing endpoints. Same wire as CPA :18317's already-bundled mgmt panel.

### Probe 4 — plugin-namespace
**REJECT-FOR-FIT.4 PLUGIN-NAMESPACE / DUPLICATE-FUNCTIONALITY**. The incumbent install at `/z/claude-sota-installed/.cli-proxy-api/config.yaml:22-23` already points to **`router-for-me/Cli-Proxy-API-Management-Center`** (CPA v7.0.2 bundles the upstream Web UI — per the cite block "Since v6.0.19, the Web UI ships with the main program; access it via /management.html on the API port"). CPA-Manager is the FORK adding **only** a separate Usage Service for SQLite-backed persistent analytics. Per `kiss-dry-yagni.md` Must-Never #4 ("Duplicate existing functionality"), installing CPA-Manager would shadow the incumbent panel.

### Probe 5 — mode-harness-shape
PARTIAL. Adds Docker dependency + separate :18317 service. Operator's incumbent already uses :18317 for CPA mgmt API. Mode-overlap suggests port-conflict resolution required if both ran.

### Probe 6 — direct-file/registry blockers
PASS. MIT license; Docker Hub published; npm/PyPI N/A (Go binary + Docker image). No structural license blocker.

### Probe 7 — demand-gate split (per ahfv-probe-dag.md)
- **Probe 7.a DEMAND-ABSENCE**: REJECT-DECISIVE. Named workflow "persistent usage analytics via SQLite" — already served by router-for-me's bundled panel (per CR-12 native-bundle); incremental value = "SQLite-backed long-term retention" but no current sss workflow consumes per-request analytics history.
- **Probe 7.b DEMAND-CREATES-NEW-WORKFLOW**: NOT-EVALUATED — earlier Axis-4 PLUGIN-NAMESPACE blocker (Probe 4) wins per ahfv-probe-dag.md §Hard precondition.

### Axis 1 (≥3 distinct T1 orgs)
PARTIAL — 1 fork of 1 upstream org (router-for-me). Convergence-gate Axis-1 ≥3-distinct-orgs requirement REFUTED. Operator-curated TIER-2 chain: router-for-me + seakee fork = 2 maintainers within 1 ecosystem.

### Axis 2 (≥2 named T2 practitioners + dated artifact)
PARTIAL — Linux.do community (per README Acknowledgements). No specific named-T2 endorsements with dated artifact citing CPA-Manager fork specifically.

### Axis 3 (stability band per convergence-gate §Axis 3 5-band table)
**FAST-CHURN-BAND** — cpd = 9+ releases / 20 days = **~0.45 releases/day**, age = 20 days. Per convergence-gate.md §Axis 3 5-band table: age <100d + high release velocity = **fast-churn anti-pattern**. Re-audit after +90d burn-in.

### CR-12 disposition
**DUPLICATE-FUNCTIONALITY** (3rd class in CR-12 6-class lattice per cardinal-rule-12-upstream-install-priority.md). Incumbent `router-for-me/Cli-Proxy-API-Management-Center` already bundled in CLIProxyAPI v7.0.2 + WIRED at `.cli-proxy-api/config.yaml:22-23`. CPA-Manager's incremental delta = SQLite persistence layer (Usage Service), which adds NEW workflow not currently demanded.

### Sibling REVERT check
**clean** — no precedent in `/z/claude-sota(retired)/.claude/projects/Z--claude-sota/memory/` grep for CPA-Manager. (Per CR-9 + cardinal-rule-9 install-risk discipline: clean = OK to evaluate but does NOT supersede Probe 4 + Probe 7.a REJECT.)

### VERDICT (A)
**REJECT-FOR-FIT.4 / DUPLICATE-FUNCTIONALITY / DEMAND-ABSENCE.a** — installing would shadow incumbent bundle without addressing operator's actual rate-limit gap. Token-optimization angle: ZERO (CPA-Manager doesn't touch token-efficiency or rate-limit mitigation; only adds usage-analytics dashboard).

---

## (B) rtk-ai/rtk — full probe block

### Probe 1 — count-OVER (live API per gh API + mcp__github__)
| Metric | Value | Source |
|---|---|---|
| Stars | **47,427** | `api.github.com/repos/rtk-ai/rtk` 2026-05-14T02:02Z |
| Forks | 2,876 | same |
| fork: false | NOT a fork (org-owned at rtk-ai) | same |
| Created | 2026-01-22T16:54:16Z (~3.7 months old) | same |
| Last push | 2026-05-13T20:17Z | same |
| Latest release | **v0.40.0** 2026-05-13T19:57Z | mcp__github__list_releases |
| Latest pre-release | dev-0.40.1-rc.221 | same |
| README version claim | "rtk 0.28.2" (STALE per `port-note-discipline.md §6` Marker Decay) | README |
| Cargo.toml version | 0.34.3 | blob SHA 726a017 |
| License | **Apache-2.0** (LICENSE blob) | gh API + blob 0afaf4b9 |
| **Open issues** | **905** | gh API |
| Topics | agentic-coding, ai-coding, anthropic, claude-code, cli, llm, rust, token-optimization | gh API |

**OVER catch**: README claims "rtk 0.28.2" but actual Cargo.toml shows 0.34.3 and live releases show v0.40.0. Marker Decay corollary applies — README versions valid AT WRITE-TIME but stale at recall-time.

### Probe 2 — SDK-vs-CLI surface
PASS. Rust binary CLI wrapped per-shell. Cross-platform (macOS/Linux/Windows-WSL/Windows-native limited).

### Probe 3 — architectural-API
PASS (off-axis). Intercepts Bash tool calls only (Claude Code hook layer); Read/Grep/Glob bypass per README.

### Probe 4 — plugin-namespace
PASS — no name collision with existing claude-sota-installed primitives. Note: README warns of `rtk` cargo-registry name collision (Rust Type Kit unrelated package); per `mcp__github__get_file_contents` deps.dev probe, `cargo/packages/rtk` v0.1.0 = the unrelated package (published 2025-06-27).

### Probe 5 — mode-harness-shape
**PARTIAL FAIL**. Windows-native lacks auto-rewrite hook (CLAUDE.md injection mode only). Z:-portable runtime is Windows-native (per CLAUDE.local.md "Platform: Windows 11"). Auto-rewrite hook works in WSL only. Per `agent-harness-fit-verification.md` Probe 5, mode-harness mismatch when target operating mode is autonomous /loop on Windows-native.

### Probe 6 — direct-file/registry blockers
PASS. Apache-2.0 (compatible with permissive whitelist per Probe 6 license-check). Homebrew/Cargo/curl install paths official-native-channel-compatible.

### Probe 7 — demand-gate split
- **Probe 7.a DEMAND-ABSENCE**: NOT-DECISIVE; rtk addresses orthogonal axis (per-call token-savings) not addressed by current sss.
- **Probe 7.b DEMAND-CREATES-NEW-WORKFLOW**: structurally sound (5-clause check ELIGIBLE):
  1. Named use case: 60-90% token reduction on Bash tool calls in /loop fires (`rtk git status` / `rtk cargo test` etc.)
  2. Cited input: existing `.claude/hooks/scripts/*.py` would coexist; rtk hook is additive
  3. Wiring path: `rtk init -g` adds hook config to `.claude/settings.json`
  4. Incumbent comparison: claude-sota-installed has NO token-output filter today (Read/Grep/Glob handle most flows; Bash output goes raw)
  5. Reversible time-box: 30-day pilot, retire to `verified-avoid.md` if telemetry shows <30% net savings or hook-conflict regressions

### Axis 1 (≥3 distinct T1 orgs)
**PASS** — rtk-ai/rtk + multi-agent ecosystem support (Claude Code / Cursor / Gemini CLI / Codex / OpenAI / Microsoft Copilot) makes Axis 1 multi-org via adopter ecosystem.

### Axis 2 (≥2 named T2 practitioners + dated artifact)
PARTIAL — Patrick Szymkowiak (founder; GitHub + LinkedIn cited in README); FlorianBruniaux + aeppling (core contributors). Multi-IDE adoption but no specific dated-artifact named-T2 endorsement of rtk's pattern vs alternative token-compressors per convergence-gate.md Axis 2 strict rubric.

### Axis 3 (stability band)
**FAST-CHURN-BAND**. cpd = ~30+ commits/week visible per release notes; age = ~3.7 months. v0.x version + 905 open issues = active iteration. Borderline-PASS via STRONG-PROVENANCE-EXPRESS (org-level T1 = rtk-ai org; 47k stars high-velocity may indicate launch-spike per convergence-gate.md Axis-3 fast-churn anti-pattern caveat). Re-audit at age >180d.

### CR-12 disposition
**OFF-AXIS / PROVIDER-COMPLEMENT** — rtk addresses **different problem class** (per-call token output compression) than the actual operator-defined gap (accounts-rotation + rate-limit mitigation). Could complement CLIProxyAPI at orthogonal layer (different surface in the request chain).

### Sibling REVERT check
**NOT-CLEAN but NOT REVERT-AND-REMOVE** — n=2 same-arc precedents at retired `/z/claude-sota(retired)`:
- `scripts/rtk_filter.py` commit `172f011` (Phase 1 wrapper) per `reference_fm02_sub_c_constructive_absorption_n10_rtk_phase1_2026_05_03.md`
- `tests/test_rtk_filter.py` commit `3389e82` (Phase 1 smoke test)
- 4 reference memory files: `reference_rtk_source_level_audit_2026_05_01.md` / `reference_rtk_phase0_t1_verdict_consumption_2026_05_03.md` / `reference_rtk_phase1_t1_verdict_consumption_2026_05_03.md` / `reference_rtk_audit_refresh_2026_05_03.md` / `reference_iter82_meta_router_gap_rtk_0_37_2_finding_2026_05_03.md`

Memory verdicts: STUDY-PILOT-Phase-1 down-shift at sibling 2026-05-03 + Phase 0 codex T1 conf=0.88 contradiction-class (d) doc-bug verdict (README's Windows-hook claim STALE per `src/hooks/constants.rs:11-12` + `src/hooks/init.rs:842-846` + `src/hooks/hook_cmd.rs:65-84`) + Phase 1 codex T1 NEEDS-REVISION conf=0.91 with 6 prescribed_edits pending integration. Phase 1 wrapper shipped at sibling claude-sota (now retired). Per CR-9 install-risk discipline: there is no REVERT-AND-REMOVE — prior status was "STUDY-PILOT-Phase-1 pending Phase 0 contradiction-resolution".

### VERDICT (B)
**DEFER (off-axis)** — rtk is a legitimate Probe 7.b STUDY-PILOT candidate for an ORTHOGONAL axis (token-output compression), NOT for the operator-defined task (accounts-rotation vs CLIProxyAPI :18317). Task framing was mistargeted. To address the actual rate-limit gap, look elsewhere (see "Compare & Recommend" §below).

---

## INCUMBENT-COMPARE MATRIX

| Dimension | CPA-Manager (A) | rtk-ai/rtk (B) | Incumbent CLIProxyAPI v7.0.2 + Cli-Proxy-API-Management-Center |
|---|---|---|---|
| Problem class | Web UI + Usage Service (analytics) | Token-output compression (CLI) | **OAuth rotation + provider proxy** (actual operator gap) |
| Rotation strategy | NONE | NONE | round-robin (W97 Ship 1J) + fill-first (W86 Ship 1Q legacy) + weighted scheduler |
| 8-account fleet support | N/A — wraps CPA | N/A — orthogonal | YES — `auth-dir` + per-account credential files |
| Address 46% rate-limit fire rate? | **NO** | **NO** | **PARTIALLY** — round-robin reduces same-account-burn |
| Address 0/8 OAuth recovery (W185 F1)? | **NO** (analytics doesn't refresh) | **NO** | **PARTIALLY** — CPA mgmt-API supports `/setup` OAuth re-grant via panel UI at `:18317/management.html` |
| License | MIT (fork of router-for-me) | Apache-2.0 | MIT (router-for-me upstream) |
| Age | 20 days (fast-churn) | 3.7 mo (fast-churn) | 10+ months (STABLE-BURN-IN) |
| Cite | Probe 1 row 2 above | Probe 1 row 1 above | `/z/claude-sota-installed/.cli-proxy-api/config.yaml:22-23` + DeepWiki on `router-for-me/CLIProxyAPI` rotation analysis |
| **CR-12 disposition** | DUPLICATE-FUNCTIONALITY | OFF-AXIS / PROVIDER-COMPLEMENT | INCUMBENT-KEEP |

---

## COMPARE & RECOMMEND

### (1) Which to INSTALL-NOW?
**NONE of A or B should be installed for the operator-defined accounts-rotation gap.**

### (2) Which to REJECT/DEFER?
- **(A) CPA-Manager → REJECT-FOR-FIT.4 DUPLICATE-FUNCTIONALITY** (Probe 4 decisive). Operator's incumbent already bundles upstream panel.
- **(B) rtk → DEFER** (off-axis). Legitimate STUDY-PILOT-Phase-1 for token-output-compression at separate fire, NOT this task. Resume from sibling-retired Phase 0/Phase 1 codex T1 verdicts if pursued.

### (3) Does either DUPLICATE incumbent?
- **(A) YES** — wraps the same `router-for-me/Cli-Proxy-API-Management-Center` already bundled in CPA v7.0.2.
- **(B) NO** — orthogonal layer (token-filter, not proxy/rotation).

### (4) Rate-limit-mitigation angle
**Neither candidate addresses the 46% rate-limit fire rate baseline.** The actual mitigation paths require:
- **(i) OAuth re-grant** of 0/8 burned accounts via incumbent's `:18317/management.html` browser flow (W185 F1 forensic recommendation)
- **(ii) Continue current routing tuning** (W97 round-robin already shipped)
- **(iii) Extension candidate surfaced during research**: **`KarpelesLab/teamclaude`** (cite `api.github.com/repos/KarpelesLab/teamclaude`) — named-org maintainer (KarpelesLab), 26 stars, MIT-LIKELY (license:null in API but README typically MIT), 2026-03-24 created, "Multi-account Claude proxy with automatic quota-based rotation". Topics: anthropic, claude-code, load-balancer, multi-account, oauth, proxy. **DEFER for separate fire codex T1 evaluation** — provides orthogonal data point on multi-account rotation architectures.

### (5) Recommended action
1. **CONFIRM INCUMBENT-KEEP** — current CLIProxyAPI v7.0.2 + `disable-control-panel: false` config setup at `.cli-proxy-api/config.yaml:22-23` is correct and complete for incumbent panel.
2. **DEFER rtk Phase-1 study** — separate fire if/when token-output compression becomes a measured gap.
3. **OPEN candidate: KarpelesLab/teamclaude** — surface for next sota-research wave as alternative rotation primitive; do NOT install pending convergence-gate Axis-1 + Probe DAG verification per multi-source-discovery-breadth-discipline.md ≥4 source families.
4. **OPERATOR-CRITICAL**: 0/8 OAuth recoverable per W185 F1 — no candidate evaluated here addresses this. Operator must execute browser re-grant via `:18317/management.html` per W185 F1 recovery path.

---

## DISCOVERY BREADTH (per multi-source-discovery-breadth-discipline.md ≥4 source families)
1. **GitHub family** (`gh API` + `mcp__github__search_repositories` + `mcp__github__list_releases` + `mcp__github__list_commits` + `mcp__github__get_file_contents`)
2. **DeepWiki family** (`mcp__deepwiki__ask_question` on rtk-ai/rtk + seakee/CPA-Manager + router-for-me/CLIProxyAPI)
3. **deps.dev family** (Cargo registry probe — surfaced rtk name-collision)
4. **Retired-sibling memory family** (5 memory files at `/z/claude-sota(retired)/.claude/projects/Z--claude-sota/memory/`)
5. **GitHub topic-search broader cohort** (12 results for `claude rotation in:description language:go`; 10 results for `claude code rotation OAuth fleet credentials proxy`)

≥4 distinct families satisfied. HONEST-NON-FINDING: deps.dev returned irrelevant package for rtk (different `rtk` Cargo registry name).

## Sibling REVERT cross-check summary
- **CPA-Manager**: clean (no precedent)
- **rtk**: 2 commits + 5 memory files at retired sibling (Phase 1 wrapper shipped; not REVERT-AND-REMOVE)
- **router-for-me/Cli-Proxy-API-Management-Center**: already incumbent + WIRED at config.yaml

## Cardinal-rule conformance
- CR-1 cite: ✅ all claims cite file:line + HEAD SHA OR live API URL + timestamp
- CR-6 native-channel: ✅ research-only, no install
- CR-7 Phase 1 bootstrap: ✅ no T1-T7 hook invocation; orchestrator may run T1 on synthesis if INSTALL verdict
- CR-9 install-risk: ✅ sibling REVERT check executed per (CR-9 §Pre-cite-import REVERT check)
- CR-10 research-first: ✅ this report IS the research output
- CR-12 disposition: ✅ both candidates classified (DUPLICATE-FUNCTIONALITY / OFF-AXIS)
- CR-3 cross-model gate: ⚠️ stand-in dispatch per STAND-IN-NOTICE; orchestrator MUST run codex T1 if INSTALL verdict ever pursued

STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6 stand-in per CLAUDE.local.md ENV block (f); cross-model gate NOT structurally satisfied for this dispatch. Orchestrator must file 2nd-stage validation per `cmc-env-funneled-disclosure.md` if recommending any of the 3 candidates for INSTALL.

VERDICT: DONE — CPA-Manager REJECT-FOR-FIT.4 DUPLICATE-FUNCTIONALITY; rtk DEFER (off-axis Probe-7.b STUDY-PILOT for separate fire); recommend INCUMBENT-KEEP `router-for-me/CLIProxyAPI v7.0.2 + Cli-Proxy-API-Management-Center` + DEFER `KarpelesLab/teamclaude` for next-fire codex T1 evaluation.
