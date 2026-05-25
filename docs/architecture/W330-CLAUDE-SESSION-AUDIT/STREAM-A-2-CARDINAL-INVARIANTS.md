# W330 Stream A-2 — Cardinal-Rule Invariants Snapshot

> **Wave**: W330 · **Stream**: A-2 (Claude-session audit) · **Date**: 2026-05-19
> **Scope**: R1-R6 status snapshot · self_invented_count · CLAUDE.md LOC · settings.json size · FI-1+FI-2+FI-5 status.

## §1 R1-R5 + R6-proposed status table

| Rule | Status | Evidence cite | Carry |
|---|---|---|---|
| **R1** Install primitives only from trusted plugins/skills/agents | ✓ HOLD | CLAUDE.md L18 + W270 corollary + W286-arc-P0C CR-9 npm pin discipline | codex axis-1 #3 proposes EXTEND tuple to (a) signed releases SLSA-L3 / npm provenance / PGP-Sigstore + (b) license risk audit + (c) malicious-update review + (d) dependency blast-radius — see CLAUDE-MD-EDIT-PROPOSAL Edit 1 |
| **R2** Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations | ✓ HOLD | CLAUDE.md L19 + sanctioned-shim exception `context-mode-cache-heal.mjs` patching #46915 (verified OPEN 2026-05-10 per codex axis-1 §6) | codex axis-1 #4 proposes MECHANIZE ≤2KB via `PreToolUse[Edit\|Write]` hook (CLAUDE-MD-EDIT-PROPOSAL Edit 2) |
| **R3** Subagents = installed upstream agents OR documented subagent system | ✓ HOLD | CLAUDE.md L20 (cite: `https://docs.anthropic.com/en/docs/claude-code/sub-agents`) | codex axis-1 #5 proposes MECHANIZE Δ-DPA-5 dispatch-site allowlist via `tools/preagent-subagent-validator.mjs` (CLAUDE-MD-EDIT-PROPOSAL Edit 3) |
| **R4** Project behavior in CLAUDE.md + settings.json; `.claude/rules/*.md` ONLY if upstream-plugin-shipped OR operator-curated path-gated | ✓ HOLD per W299-A REVERSAL W308 | CLAUDE.md L21 + W308 ratification | codex axis-1 #6 proposes 33-skill trigger audit per-skill (description-cardinality ≤8 + ≤50% sibling overlap) (CLAUDE-MD-EDIT-PROPOSAL Edit 4) |
| **R5** Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts | ⚠ **PARTIAL-HOLD-UPGRADED-MORE** | CLAUDE.md L22 + W325-C Option C + W328-A-4 + W329-A-3 Patch C1 (32→34 deny entries; Edge AppData/Local closed) | **CRITICAL** codex axis-1 #2 flags CR-5 ↔ `tools/preagent-*.mjs` CONTRADICTION; resolution proposal: reclassify preagent-*.mjs as observability instrumentation (advisory exit-0) NOT binding gates (CLAUDE-MD-EDIT-PROPOSAL Edit 5) — **W330-A flip to exit-2 violates this resolution** |
| **R6** Verify-before-claim corollary (NEW; codify in CLAUDE.md as Cardinal Rule 6) | ⚠ **RATIFY PROPOSED — not yet codified in L22 cardinal-rule block** | `docs/architecture/W329-H-R6-REWRITE/W329-H-R6-CORROLLARY.md` (rewrite per codex r1 Axis-5 FAIL) + W329-I update after S2-REAUDIT FULL retraction (W328-S2 USER-ERROR-CONFIRMED + counter-hypothesis BOTH refuted by live API probes) | R6 currently lives ONLY in W328 closure-synthesis "Confirmation-Bias Discipline" section (W329-I revision); NOT promoted to CLAUDE.md L22 cardinal-rules block. W330 should consider FORMAL ratification as Cardinal Rule 6 OR explicit downgrade to "Project corollary, not cardinal rule". |

## §2 Invariant probes (empirical verification THIS session)

| Invariant | Target | Measured | Status |
|---|---|---|---|
| `self_invented_count: 0` | 0 | 0 (`ls .claude/rules/` = empty; `ls .claude/hooks/scripts/` = empty) | ✓ HOLDS |
| CLAUDE.md ≤50 LOC body | ≤50 | **50** (`wc -l CLAUDE.md` = 50) | ✓ HOLDS (at-cap; 0 headroom) |
| `.claude/hooks/` dir contents | only sanctioned shims | 1 file `context-mode-cache-heal.mjs` (CR-2 sanctioned exception, #46915 anchor) | ✓ HOLDS |
| settings.json size | ≤17KB target / ≤16KB stretch | **17,035 bytes** | ⚠ **+35 BYTES OVER 17KB target** (W329 close was 17,025; +10 B from W329-K) |
| pre-W255 self-invent | 0 | 0 | ✓ HOLDS (W255 ratchet preserved) |

## §3 FI-1 / FI-2 / FI-5 status snapshot

Source-of-truth: `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92` (falsifiable-inverse spec).

| FI-N | Claim | W329 status (codex-r1-corrected) | W330 status (post parallel-session) | Path to HOLD |
|---|---|---|---|---|
| **FI-1** | ≥15 deny strings catch a probed attack class | W329 over-stated as HOLDS (15/15 strings); codex-r24 corrected to **ENUMERATED-NOT-PROBED** (15 strings added ≠ classes protected) | **UNCHANGED — STILL ENUMERATED-NOT-PROBED** (parallel-session did NOT run probe-based smoke tests; W330-MEGA-AUDIT Stream A focused on cross-session race not R5 probe) | W331 probe-based smoke tests against each of 34 deny entries with actual Bash/Read/Write attempts |
| **FI-2** | Audit-log hook captures denied-tool invocations | W329 BROKEN | **UNCHANGED — STILL BROKEN** (W330-A1 wire-up addresses observability-via-OTEL, not audit-log-hook specifically; W330-D task-close-discipline is process discipline not audit-log) | W331 ship `PreToolUseFailure` audit-log hook → OTEL log exporter (composes with W330-A1 §2.d Phoenix logs receiver) |
| **FI-3** | Permissions/sandboxing structurally sound | W329 HOLDS | ✓ HOLDS (no change) | — |
| **FI-4** | settings.json deny list semantically meaningful | W329 PROBABLE-HOLDS | ✓ PROBABLE-HOLDS (Edge AppData/Local +1 entry closed Edge gap per W329-A-3 C1; CRD/Bash registry-read gap STILL OPEN per codex r24 finding #1) | W331 add `Read(HKEY_*\\**)` + `Bash(reg query *)` deny entries |
| **FI-5** | Capability-registry per skill/agent documented + enforced | W329 HOLDS-conditional | **STATUS UNCLEAR** — W330-D task-close-discipline skill ADDS to skill inventory but does NOT add per-skill capability registry. **No W330 work-product addresses FI-5 directly.** | W331 capability-registry skill or doc (per skill/agent: tool-list + scope + auth-domain) — pattern in W325 STREAM-C-RECOMMENDATION L91 |

## §4 R6 codification analysis (NEW)

**Current state**: R6 corollary is defined in `docs/architecture/W329-H-R6-REWRITE/W329-H-R6-CORROLLARY.md` (verified via `git log` commit `780e11d ship(W329-B+C+H)`) + W328 closure synthesis "Confirmation-Bias Discipline" section.

**R6 statement (W329-I revision)**:
> When a SOTA endpoint returns unexpected (0-result, false-negative, or surprising) output, the workflow ORDER is: (1) Source-deep-dive first — `Read` the upstream repo source / API docs / OpenAPI schema to derive correct expected behavior; (2) Live-API probe to verify ACTUAL behavior matches inferred behavior; (3) THEN conclude USER-ERROR vs BUG vs UPSTREAM-CHANGE vs WORKFLOW-DRIFT.

**3-org-distinct cites preserved**: OWASP A06 + SCVS v1.0 §4-5 (Org 1) · ISO/IEC 25010:2023 §4.2.6-4.2.7 (Org 2) · NIST SP 800-218 SSDF v1.1 PW.7/RV.1 (Org 3).

**Codification recommendation**:
- **Option A** (RECOMMENDED): Add R6 to CLAUDE.md L22 cardinal-rules block as 6th rule with single-line statement + cite-anchor to W329-I location. **Cost**: +1-2 LOC body; CLAUDE.md jumps from 50 → 52 LOC; **VIOLATES ≤50 LOC INVARIANT**.
- **Option B** (TRADEOFF): Compress R5 single-line to 1 LOC by moving W325-corollary inline-content to W325 STREAM-C-RECOMMENDATION + add R6 to keep body at 50 LOC.
- **Option C** (DEFER): Leave R6 as project-corollary (current state); explicit "not cardinal rule" annotation in W329-I doc.

**Current Claude-session view**: **Option B** preferred — R5 corollary already cites W329-A-3 acceptance record (which is the deeper unblock surface); CLAUDE.md L22 inline W325-C/W328-A-4/Patch-C1 details can collapse to single ref-cite, freeing budget for R6 codification.

## §5 settings.json size budget analysis

Current: **17,035 bytes** (≤17KB target = 17,408 B; under-cap by 373 B; over previous W329-close 17,025 B by +10 B).

W330 additions contributing to size:
- W329-A-3 Edge AppData/Local +1 deny entry (~50 B per W329-r1 §3)
- W330-A parallel-guard upgrade is in `tools/preagent-parallel-guard.mjs` NOT settings.json — no settings.json impact.

**Verdict**: HEALTHY — well under 17KB target. No trim required.

**Risk**: W330-A1 Phase-1 OTEL privacy keys (§2.b 3 keys, ~120 B) + Phase-2 Phoenix metrics+logs keys (§2.d 8 keys, ~350 B) — TOTAL +470 B if operator applies → 17,505 B → **EXCEEDS 17KB target by 97 B** post-application.

**Recommendation**: pre-emptively trim duplicate `OTEL_*` keys (currently 7 declared at lines 21-28 of which `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` may collapse to `OTEL_LOG_USER_PROMPTS=0` semantic equivalent — saves ~50 B), OR explicitly raise target to 18KB (1 KB margin).

## §6 INDEPENDENCE-PROOF (Δ-G51)

- **FOUNDATION-ANCHOR**: Anthropic CC docs `https://code.claude.com/docs/en/claude-directory` (CLAUDE.md memory layer) + `https://docs.anthropic.com/en/docs/claude-code/settings` (settings.json schema).
- **COUNTERFACTUAL**: IF Anthropic deprecates the cardinal-rule pattern entirely, the runtime's invariant-discipline still holds BECAUSE **cardinal-rule-style codification** is a Kent Beck (XP / TDD) prior-art pattern from "Extreme Programming Explained" (2000), with parallels in Google Style Guides "Decisions" sections (2008+) and Linux kernel `MAINTAINERS` file format (~1990s).
- **Three independence pillars**:
  1. **Anthropic ≠ Kent Beck ≠ Google ≠ kernel.org** — four entirely distinct orgs.
  2. **Causal**: rule-based-runtime-discipline predates Anthropic by 25+ years.
  3. **Temporal**: XP rules (2000) predate Anthropic (2021) by 21 years.

## §7 Forward queue

- **P0 W331**: codify R6 per Option A/B decision (Claude-session preference: Option B).
- **P0 W331**: FI-1 ENUMERATED-NOT-PROBED → HOLD via probe-based smoke tests (per W330-MEGA-AUDIT REMEDIATION-PLAN-V2).
- **P0 W331**: FI-2 BROKEN → HOLD via PreToolUseFailure audit-log hook.
- **P1 W331**: FI-5 HOLDS-conditional → HOLD via per-skill/agent capability-registry skill.
- **P1 W331**: 33-skill trigger audit per codex axis-1 #6 (description-cardinality ≤8 + ≤50% sibling overlap per skill).
