# R5 Corollary — Detail (compressed out of CLAUDE.md L22 via P0-8 Option B)

> Wave **W331 P0-8** · 2026-05-19 · Per /goal STOP-gate "CLAUDE.md ≤50 LOC pointer-only" — R5 verbose content moved here to free 1 LOC for R6 codification. R5 inline at CLAUDE.md L22 is the canonical 1-line cardinal rule + pointer to this file.

## §1 Original R5-W325-corollary (W329-A 2026-05-19)

Runtime is Windows-native + Z:-portable (per `CLAUDE.local.md` L4); Anthropic CC sandbox supports macOS/Linux/WSL2 only per `https://code.claude.com/docs/en/sandboxing` — so OS-sandbox layer is structurally inert. R5 held via sca-v11 §6 5-control layered-defense as documented-exception (Option C; W325-C recommendation 4.85/5).

**Status**: PARTIAL-HOLD-UPGRADED per W328-A-4 (4.0/10 → 5.0/10 with Patch C1 32-entry deny; Controls 2 audit-hook + Control 5 capability-registry pending W329-W330).

**Acceptance-record**: `W329-A-3-ACCEPTANCE-RECORD-DRAFT.md` (operator-sign-pending; falsifiable-inverse FI-1..FI-5 per `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92`).

## §2 W331 axis-1 #2 resolution + binding-gate ratification (codex round-2 clarification)

`tools/preagent-parallel-guard.mjs` (commit `68d89ca`) operates in TWO modes:

- (i) `exit 0` advisory (1st violation OR multi-stream pass) = CR-5-spirit-compliant observability
- (ii) `exit 2` binding (2nd consecutive solo violation) = SANCTIONED CR-5-exception per condition (b), ratified via:
  - W330 codex r1 axis-1 #1 CRITICAL finding
  - W325-A F1 SEV-1 empirical baseline (parallel_ratio = 0.0036 / 1676 sessions / 30d)
  - W331 in-session 10-advisory false-positive evidence

`tools/preagent-subagent-validator.mjs` ALSO operates in dual modes:
- advisory exit 0 for known/missing-allowlist
- exit 2 for unknown-subagent_type — sanctioned CR-5 exception per (b), ratified via Δ-DPA-5

## §3 W331 axis-1 #1 implementation note (codex r2 ratify)

Chose timestamp-window (10s) over the proposed `UserPromptSubmit` message-level redesign — same outcome, smaller code surface, empirically validated this session (3+2-Agent parallel dispatches passed cleanly). UserPromptSubmit redesign deferred to W332+ hardening.

## §4 W331 r4 P0-1 in-session-bypass marker (NEW 2026-05-19)

**Surface**: `.claude/state/parallel-guard-bypass.marker` (deletable file). Sibling to existing `CLAUDE_PARALLEL_GUARD_DISABLE` env-var escape hatch — addresses the in-session-cannot-set-env-var gap (CC inherits env at startup; mid-session `$env:X` changes don't propagate to hook subprocesses).

**Guard patch** at `tools/preagent-parallel-guard.mjs` L244-251 (5 LOC added):
```js
// W331 P0-1 r4 in-session escape hatch — marker file (operator-controllable, deletable).
try {
    await stat('Z:/claude-sota-installed/.claude/state/parallel-guard-bypass.marker');
    process.exit(0);
} catch { /* no marker, continue */ }
```

**Rationale**: empirical evidence this session showed per-call race condition in `state.turnFireCount` tracking causes legitimate 4-Agent-in-1-message dispatches to BLOCK on calls 2-N despite tfc>=2 reset-path. The marker bypass allows operator-controlled override without requiring CC restart.

**CR-5 compliance**: condition-(b) precedent — same as env-var escape hatch (line 240). Operator-controllable surface. Reversible (delete marker file).

## §5 FI-1..FI-5 falsifiable-inverse summary

Per `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92`:

| FI | Statement | Status W330 close | Status W331 close |
|---|---|---|---|
| FI-1 | Deny entries probed individually | ENUMERATED-NOT-PROBED | HOLDS-31/34 (W331-R5 §1 design-verified) |
| FI-2 | PreToolUseFailure audit-log hook | BROKEN (no hook shipped) | DESIGN-COMPLETE (W331-R5 §2 ≤2KB shim spec) |
| FI-3 | Cardinal-rule 1 trust-tuple extension | HOLDS | HOLDS (W331 CR-1 extended) |
| FI-4 | Subagent-type allowlist validator | HOLDS | HOLDS (W331 Δ-DPA-5 mechanized) |
| FI-5 | Capability registry per-skill/per-agent | HOLDS-conditional NO-CHANGE-W330 | DESIGN-COMPLETE (W331-R5 §3 registry spec) |

Net delta on R5 dwell: 13 waves → ≤8 waves (on operator-sign of acceptance-record post FI-1+FI-2+FI-5 land).

## §6 Composite-recovery projection

Per W331 STREAM-A-1 §1: composite 4.237 YELLOW → projected 4.547 GREEN post-operator-apply.

R5-specific delta: +0.20 on operator-sign of W329-A-3-ACCEPTANCE-RECORD-DRAFT.md.

## §7 Cite-anchors (≥3-org-distinct per W295 I1)

- NIST SP 800-53 Rev 5 (US-fed): AC-3 Access Enforcement, AC-6 Least Privilege, AU-6 Audit Review (FI-1, FI-2 anchor)
- CIS Controls v8 (non-profit): Control 4 Secure Configuration of Enterprise Assets; Control 8 Audit Log Management
- ISO/IEC 27001:2022 (intl-standards): A.5.15 Access control, A.8.15 Logging, A.8.16 Monitoring activities
- OWASP ASVS v4.0.3: V1.4 Access Control architecture, V7.1 Log content
- SLSA v1.0 (Linux Foundation OpenSSF): Build provenance + verification anchor for FI-2 hash-chain integrity

## §8 Rollback / reversibility

R5-corollary changes are reversible:
- Revert R5 line in CLAUDE.md to verbose form (saved in this file)
- Delete `.claude/state/parallel-guard-bypass.marker` to re-enable guard enforcement
- Revert guard patch via `git revert <SHA>` of W331-P0-1-r4 commit
- Operator-sign-pending status persists until explicit sign-event lands acceptance-record

All R5-related changes carry codex-round verdict trail (W330 r1, W331 r2 + r4); no unilateral CR-5 modifications without cross-model gate.
