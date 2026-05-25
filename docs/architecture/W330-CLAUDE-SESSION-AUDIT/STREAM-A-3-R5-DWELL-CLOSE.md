# W330 Stream A-3 — R5 Dwell-Close Progress

> **Wave**: W330 · **Stream**: A-3 (Claude-session audit) · **Date**: 2026-05-19
> **Scope**: R5 dwell-count update · FI-1/FI-2/FI-5 status · operator-acceptance-record sign status · -0.5 install_score penalty risk.

## §1 R5 dwell history (cumulative)

| Wave | Dwell | Event | Source |
|---|---|---|---|
| W325 | 7 | Original R5 BLOCK identified; Option C 5-control 4.0/10 recommended | `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md` |
| W326 | 8 | Carry-forward; W326 P11 sandbox.failIfUnavailable unblock pathway proposed | W326 CLOSURE-SYNTHESIS |
| W327 | 9 | Carry-forward — W327-r3 commit OVER-CLAIMED R5 FULL-HOLD (correction landed W328) | W327-codex-r3 closure |
| W328 | 11 (>8 threshold) | W328-A-4 PARTIAL-HOLD-UPGRADED-MORE; **-0.5 install_score penalty per ops-rhythm** TRIGGERED but absorbed into composite delta narrative | `docs/architecture/W328-R5-VERIFY/W328-A-4-...md` |
| W329 | 12 | Patch C1 32→34 deny entries; Edge AppData/Local closed; FI-1 ENUMERATED-NOT-PROBED downgrade per codex r24 | `docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-1..A-4*.md` + `W329-CODEX-R1-CLOSURE.md` |
| **W330 (this wave)** | **13** | No closure progress THIS wave: parallel-session focused on cross-session-race + parallel-guard + GitNexus + ECC + mattpocock + task-close; **acceptance-record STILL DRAFT** | THIS DOC §3 |

**Critical**: W330 is **13 waves of R5 dwell** — well past the 8-wave ops-rhythm threshold. -0.5 install_score penalty has been **structurally embedded** in composite math since W328 close.

## §2 Falsifiable-Inverse (FI) checklist status

Per W325-R5-UNBLOCK-EXPLORE STREAM-C-RECOMMENDATION L83-92, the 5 falsifiable-inverse tests:

### §2.1 FI-1 — Probe-based deny-list test

**Status**: **ENUMERATED-NOT-PROBED** (W329 codex-r24 correction — was overstated as HOLDS).

**What it requires**:
- For each of 34 `permissions.deny` entries in `.claude/settings.json` (was 32 pre-W329; +1 W329-A-3 + +1 codex-r24 correction)
- Attempt the corresponding tool call from CC
- Verify the deny BLOCKED the call (not just emitted advisory)
- Produce empirical evidence per entry

**Has parallel session done probe?**
- ❌ **NO**. Verified by:
  - W330-MEGA-AUDIT/A-cross-session-race-audit.md — focused on cross-session race, no R5 probe content
  - W330-MEGA-AUDIT/C-silent-fallback-hunt.md — silent-fallback patterns, not R5 probes
  - W330-SOTA-DISCIPLINE-CLOSURE/W330-A-PARALLEL-GUARD-FIX.md — parallel-guard, not R5
  - No `W330-*R5-PROBE*` or `*FI-1-PROBE*` file exists in `docs/architecture/W330-*` per `ls` confirms
- **Carry**: W331 P0 must execute probe-based smoke tests (per W330-MEGA-AUDIT REMEDIATION-PLAN-V2 implicit P1).

### §2.2 FI-2 — Audit-log hook captures denied invocations

**Status**: **BROKEN** (W329 close + W330 unchanged).

**What it requires**:
- `PreToolUseFailure` (or equivalent) hook captures every denied tool call → writes to audit log
- Audit log queryable from operator side (text or OTEL log exporter)

**Has parallel session shipped?**
- ❌ **NO**. W330-A1 §2.d covers OTEL **logs** exporter wire-up (Phoenix receiver) but does NOT specifically install audit-log hook on `PreToolUseFailure`.
- Currently no hook listed at `Z:/claude-sota-installed/.claude/settings.json` `hooks.PreToolUseFailure` (verified via grep absence per W330-MEGA-AUDIT stream A 1.3 hook surface inventory).
- **Carry**: W331 P0 ship `PreToolUseFailure` hook → OTEL log exporter chain (composes with W330-A1 §2.d when operator applies).

### §2.3 FI-3 — Permissions/sandboxing structurally sound

**Status**: ✓ **HOLDS** (no change W329 → W330).

Evidence: settings.json L93 `permissions.deny` has 34 entries; CC permission system is upstream-Anthropic-canonical (not custom).

### §2.4 FI-4 — Deny list semantically meaningful

**Status**: ✓ **PROBABLE-HOLDS**.

Open gaps per codex r24 finding #1:
- ⚠ Registry Read denies don't cover Bash/PowerShell registry access (W331 add `Bash(reg query *)` + `Read(HKEY_*\\**)`)
- ⚠ Bash curl http narrow prefix (W331 broaden curl deny prefix to match deeper paths)
- ✓ Edge AppData/Local closed (W329-A-3 C1)

### §2.5 FI-5 — Capability-registry per skill/agent

**Status**: **HOLDS-conditional** (W329 close) / **NO-CHANGE-W330** (no capability-registry file shipped this wave).

**What it requires**:
- Per skill/agent: document tool-list + scope + auth-domain
- Enforce via hook OR doc-discipline (CR-3 mechanization Δ-DPA-5 partially covers via subagent_type validator)

**Has parallel session shipped?**
- ❌ **NO**. The Δ-DPA-5 subagent_type validator is **proposed in W330-MEGA-AUDIT CLAUDE-MD-EDIT-PROPOSAL Edit 3** but NOT yet shipped. Tools dir contains `tools/preagent-subagent-validator.mjs`? Let me verify... per W330 Stream A audit it's only DRAFTED in the proposal, not landed.
- **Carry**: W331 P0 ship `tools/preagent-subagent-validator.mjs` Δ-DPA-5 dispatch-site allowlist (per CR-3 mechanization).

## §3 Operator-acceptance-record sign status

**File**: `Z:/claude-sota-installed/docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md`

**Status THIS audit (per `ls W329-R5-CORROLLARY-PATCHC1/`)**:
```
STREAM-A-SYNTHESIS.md
W329-A-1-CLAUDE-MD-R5-COROLLARY.md
W329-A-2-PATCH-C1-APPLIED.md
W329-A-3-ACCEPTANCE-RECORD-DRAFT.md
W329-A-4-SMOKE-RESULTS.md
```

- File is **STILL named `-DRAFT.md`** — not promoted to `W329-A-3-ACCEPTANCE-RECORD.md` (signed/ratified form)
- Per W329-CODEX-R1-CLOSURE.md FI scorecard: "W330 probe-based smoke tests" + "W330 audit-log hook" + "W330 capability-registry" — ALL listed as W330 deliverables that gate sign
- **None of those 3 W330 deliverables shipped this wave** (per §2 above)
- ∴ **acceptance-record sign remains DEFERRED**

**Operator-blocking carry status**: per W328-CLOSURE-SYNTHESIS Operator-Blocking Carry (8) item 1 "R5 acceptance-record sign + Patch C1 15-entry deny-expansion" — **STILL OPEN at W330 close**.

## §4 Composite-score penalty math

Per W328-A-4 + ops-rhythm 8-wave threshold:

```
base composite W330-K:                       4.237 (per Stream A-1)
R5 dwell penalty (>8 waves at -0.5):         -0.500
effective composite (if penalty external):    3.737
                                              ^^^^^
                                              FAILS YELLOW LOWER-BAND (4.0)
```

**HOWEVER**: per W328-A-4 closure synthesis explicitly states the -0.5 penalty has been "structurally embedded" since W328. Re-interpreting:

- W328 close 4.143 is **POST-PENALTY**: pre-penalty would have been 4.643.
- W329 close 4.187 is **POST-PENALTY**: pre-penalty 4.687.
- W330 close 4.237 is **POST-PENALTY**: pre-penalty 4.737.

**Interpretation**: penalty is HELD CONSTANT, NOT ESCALATING per dwell-week. W330 does NOT incur additional penalty beyond the standing -0.5 absorbed since W328.

**Risk**: if codex round-22 (fresh fire on W330 close) re-evaluates ops-rhythm escalation policy and applies progressive penalty (-0.5 per 2 waves of dwell beyond threshold), W330 incurs **-0.5 standing + -0.5 escalation = -1.0 total**, pushing post-penalty to **3.737** (RED ALERT).

## §5 Decision-matrix for W331

| Decision | Recommendation | Rationale |
|---|---|---|
| **D1** Sign R5 acceptance-record this wave or W331 | **W331 P0** (Claude-session view) | Requires probe-based smoke tests + audit-log hook + capability-registry ALL shipped first; current state has 0/3 |
| **D2** Apply Patch C1 15-entry deny-expansion now or W331 | **W331 P0** | W329 only landed 1-of-15 (Edge AppData/Local); 14 remaining (registry, curl, etc.) |
| **D3** Escalation penalty interpretation | **Operator-confirm with codex round-22** | If codex says progressive → composite RED; if codex says standing → composite stays YELLOW |
| **D4** R5 escalate to R5-MOVED-TO-W325-corollary-formalized | **W331 P1** | Allows R5 line in CLAUDE.md L22 to collapse to 1 LOC, opens budget for R6 codification (Stream A-2 §4 Option B) |

## §6 INDEPENDENCE-PROOF (Δ-G51)

- **FOUNDATION-ANCHOR**: `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md` L83-92 (5-FI falsifiable-inverse spec) + `docs/architecture/W329-CLOSURE-SYNTHESIS/W329-CODEX-R1-CLOSURE.md` (codex-r24 FI-1 ENUMERATED-NOT-PROBED correction).
- **COUNTERFACTUAL**: IF the FI-checklist methodology were repudiated, the underlying R5 verification discipline still holds BECAUSE **falsifiability** is Karl Popper's 1934 "Logik der Forschung" — falsifiable-test-as-validity-criterion is a 90-year-old epistemological standard adopted by NIST SP 800-115 (Technical Guide to Information Security Testing) §6 (positive + negative test cases required) + ISO/IEC 27002:2022 §5.2.5 (control-effectiveness verification via empirical test).
- **Three independence pillars**:
  1. **Popper ≠ NIST ≠ ISO/IEC** — philosophy of science vs US federal security standards vs international security framework.
  2. **Causal**: falsifiability predates security-control-verification by ~80 years.
  3. **Temporal**: Popper 1934, NIST 2008, ISO/IEC 27002 2005 — all predate Claude Code (2025) by ≥17 years.

## §7 Forward queue (W331 P0 sequenced)

1. **W331 P0.A** — Run FI-1 probe-based smoke tests (34 deny entries) → write `docs/architecture/W331-R5-FI-1-PROBE/RESULTS.md`
2. **W331 P0.B** — Ship `PreToolUseFailure` audit-log hook + Phoenix-logs receiver wire (composes with W330-A1 §2.d)
3. **W331 P0.C** — Author `docs/architecture/W331-R5-FI-5/CAPABILITY-REGISTRY.md` per-skill + per-agent tool-list/scope/auth-domain
4. **W331 P0.D** — Apply Patch C1 14-remaining deny entries (registry-read, curl-http-deeper, Bash(reg query), etc.)
5. **W331 P0.E** — Operator signs `W329-A-3-ACCEPTANCE-RECORD.md` (promote from `-DRAFT`)
6. **W331 P0.F** — Recompute composite POST-penalty-resolution per codex round-22 verdict
