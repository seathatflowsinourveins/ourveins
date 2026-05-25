# W328-D-1 — Context Snapshot (post-W327 runtime canonical state)

**Date**: 2026-05-19 **Wave**: W328 Stream D **HEAD at entry**: `2c48b1e`
**Scope**: Capture canonical runtime state for codex round-20 composite-arch-quality re-evaluation.
**Sources**: settings.json + sca-v11 SKILL.md + ops-rhythm SKILL.md + W327-D-1/D-4 + W327-r3 commit observation.

---

## §1 R5 unblock observation (CRITICAL state-change)

### §1.1 Pre-W327 state (W326-D-2 baseline used for 4.036 composite)

`.claude/settings.json:92` — `defaultMode: "bypassPermissions"` (per W327-D-1 §2 K-1 CRITICAL).

Composite layers at W326-D close:
- L1 Cardinal-Rules 4.485
- L2 Orchestration 3.850
- L3 Memory 4.300
- L4 Research/Decision 4.310
- L5 Install/Wire 4.300
- L6 Observability 3.750
- L7 Safety/Governance 3.457
- **Composite 4.036** (RED ALERT; below 4.5 ship-gate AND below 4.0 YELLOW band — actually =4.036 just clears Δ6 YELLOW floor by +0.036)

### §1.2 Post-W327 state (current HEAD `2c48b1e`)

`.claude/settings.json:92` — `defaultMode: "default"` **(R5 unblock realized at config level)**.

**Provenance** (from W327-r3 commit `2c48b1e` `git log -1 --format='%B'`):
> MAJOR POSITIVE OBSERVATION (NOT introduced by W327; emerged via parallel-session 6b4b0b4 sweep): .claude/settings.json:defaultMode = 'default' (NOT 'bypassPermissions'). **R5 8-wave SHIP-BLOCKER appears RESOLVED at config level** by parallel-session W327-equivalent work. This is the operator 'next step' codex-K-1 CRITICAL recommendation now in effect. Composite-arch-quality should lift from 4.036 RED ALERT toward >=4.5 ship-gate.

**Cardinal-rule status update**: "Cardinal R1, R3, R4, R5: HOLD (R5 NOW FULL-HOLD post defaultMode='default'). R2: HOLD literal; spirit-question deferred to W328."

### §1.3 What R5 UNBLOCK observed at config level means

| Layer | Pre-W327 effective | What changed at HEAD `2c48b1e` | Composite-lift candidate |
|---|---|---|---|
| L1 Cardinal-Rules | 4.485 | R5 no longer "PARTIAL-HOLD CARRY-FORWARD"; settings.json honors permissions per Anthropic canonical default | **+0.15 to +0.30** (R5 status PARTIAL-HOLD → FULL-HOLD; W327-D-1 §2 Path 2A step lift envelope) |
| L7 Safety/Governance | 3.457 | Permission prompts no longer auto-allowed; deny-default re-engaged | **+0.10 to +0.20** (Control 1 deny-default ratification per sca-v11 §6 R5 5-Control Layered-Defense) |

**HOWEVER**: companion gaps remain per W327-D-1 §2 K-1 Path 2A step list:
- Step 2: Operator-signed acceptance-record at `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` — NOT VERIFIED
- Step 3: signed-audit-trails plugin attest of acceptance-record commit — NOT WIRED (settings.json:257 `signed-audit-trails@claude-code-workflows: false`)
- Step 4: CLAUDE.md cardinal-rule R5 corollary line — NOT ADDED (per current CLAUDE.md inspection)
- Step 5: Control 2 audit-logging PreToolUse hook — NOT WIRED

**Implication for codex round-20**: do NOT over-credit R5 unblock; configurational unblock realized, but L1 + L7 composite-lift CONDITIONAL on companion-step completion. Codex round-20 should explicitly distinguish "config unblock realized (S-class lift)" from "full Path 2A complete (M-class lift)".

---

## §2 sca-v11 LIVE state (per `.claude/skills/sota-convergence-audit/SKILL.md`)

### §2.1 sca-v11 ship state

`sca-v11 lineage tail`:
> v11 W327 — K-3 codification: skip-N/A taxonomy split (T-skip / M-skip / E-skip); per-dim classification table; ledger field additions; 3-org-distinct anchors (ISO 19011 Clause 4 Principle 5 + SOX §404(a)+(b) + CNCF Self-Assessment + Graduation Due-Diligence). K-7 ops-rhythm Path B cross-reference: 8-wave P0 dwell -0.5 install_score arch-itself penalty. Cumulative codex rounds W319-W327 = 16. **W327 denom note**: under sca-v11 fully-merged (W326 D46-D49 + W327 K-3/K-7), authoritative denoms are **39.4 install / 17.0 pattern** per W326 §7.

### §2.2 sca-v11 §7 ship-gate floors

| Tier | install_score floor | pattern_score floor | D-EMP floor | D-CCRT (D35) floor |
|---|---|---|---|---|
| T0 IMMEDIATE-UPGRADE | 4.7 | n/a | ≥3 | ≥2 |
| T1 INSTALL | **4.5** | n/a | ≥2 | ≥2 |
| T1-PROVISIONAL | 3.8 | n/a | ≥1 | ≥1 |
| T2 VENDOR-FORK | 3.2 | 4.0 | ≥1 | ≥1 |
| T2-CHERRY | 3.0 | 3.8 | ≥1 | ≥1 |
| T3 PATTERN-STUDY | 2.5 | 3.5 | n/a | 0 |
| T4 CITE-ONLY | n/a | 3.0 | n/a | 0 |
| T5 REJECT | <2.5 | <3.0 | 0 | n/a |

**Active**: ops-rhythm cross-reference at sca-v11 §7 — 8-wave P0 dwell -0.5 install_score arch-itself penalty.

### §2.3 sca-v11 arch-itself effective denom

`Arch-itself denom_install (v11 W326)` = 32.9 (skips D-EMP + D34 + D42-D45 + D47 + D48 per W295 I9 EXTENDED + W326 §5d).

---

## §3 ops-rhythm LIVE state (K-7 NEW skill, per `.claude/skills/ops-rhythm/SKILL.md`)

ops-rhythm v1 SHIPPED at HEAD `2c48b1e` (per W327 K-7 codification, codex round-14 Path B + round-15 NEEDS-REVISION resolve + round-16 BOTH APPROVE trail).

### §3.1 Dwell snapshot at W327 close (per ops-rhythm §2)

| Dwell item | Waves | Class | Policy state | Action mandate |
|---|---|---|---|---|
| R5 SHIP-BLOCKER (bypassPermissions:true + sandbox:false) | 8 | operator-bound | **8-WAVE → CONFIG-UNBLOCKED at W327-r3** | W328-A R5 verify Stream observed unblock |
| Perplexity API rotation (W319-SEV1) | 7 | operator-bound | **5-WAVE+**: operator-decision-block at W327 START | Operator W328+ action |
| `claude doctor` EXIT-0-silent | 6 | AI-bound + operator-bound | **5-WAVE+** | W327 paste-ready wrap §1.5 |
| ECC interactive update | 3 | operator-bound | **3-WAVE** | Operator W328+ action |
| statusLine hardcoded path | 4 | AI-bound | **3-WAVE** | W327+ AI action |
| TAVILY/EXA key population | 2 | operator-bound | Below threshold | None |
| basic-memory v0.21.1 → v3.3.1 reconcile | 2 | operator-bound | Below threshold | None |

**Composite-quality impact**: R5 was the lone 8-wave P0 triggering sca-v11 §7 ops-rhythm penalty. With R5 transitioning toward FULL-HOLD (config-level unblock), the -0.5 install_score arch-itself penalty NO LONGER FIRES post-W327-r3 — pending acceptance-record signing + audit-trail wiring (W328 Stream A scope).

---

## §4 provenance-lint (narrowed per W327 K-8 codex r1+r2+r3 chain)

Per W327 commit chain:
- **6ee7ea4 (W327-r1)**: scope narrow + Stream A sca-v11 + ops-rhythm late-completion
- **411c077 (W327-r2)**: propagate claim-narrowing + remove parallel-session contradictions
- **6b4b0b4 (W327-r2-amend)**: complete narrowing propagation to STREAM-C docs
- **2c48b1e (W327-r3)**: complete narrowing + scope-violation acknowledgment + R5 unblock observation

**Net effect**: K-8 provenance-claim lint is no longer claiming W320/W326 historical races "would have been BLOCKED" — narrowed to STEP-ONE forward discipline with W328-E mitigation note. This closes codex round-14 Axis 4 R-3 (provenance-claim lint).

**Limitations acknowledged at HEAD**:
- "AS-SHIPPED-would-NOT-detect" caveat per W326-codex-r1 path-prefix-mismatch
- W328-E queued for hardening
- Tools/preagent-*.mjs are project-owned hook bodies OUTSIDE .claude/hooks/** literal scope; R2-spirit precedent question deferred to W328

---

## §5 Sandbox + permissions state (settings.json:430-435 + :92)

```json
"permissions": { "defaultMode": "default", ... },
"sandbox": {
  "enabled": false,
  "failIfUnavailable": true,
  "autoAllowBashIfSandboxed": true,
  "excludedCommands": ["git", "docker", "npx", "uvx"],
  "allowUnsandboxedCommands": true
}
```

**Significance**:
- `defaultMode: "default"` ← W327-r3 R5 unblock observation
- `sandbox.enabled: false` ← unchanged from W326 baseline (W325-C Option C accepted-risk pattern)
- `failIfUnavailable: true` ← gate-tightened (was `false` per W327-D-1 §2 K-1 Path 2B step 3 spec; now matches Path 2B intent)
- `allowUnsandboxedCommands: true` ← unchanged (W325-C Option C Control 1 still active)
- `excludedCommands` ← unchanged

**Net K-1 status**: PARTIAL-Path-2A. `defaultMode` and `failIfUnavailable` tightened (matches Path 2B step 1-3 spec); `allowUnsandboxedCommands` + `excludedCommands` stay Path 2A (Z:-portable Windows-native preserved).

---

## §6 W327 W328-W330 plan baseline (from W327-D-4 §11)

| Wave | W327-D-4 v2 baseline projection | Status |
|---|---|---|
| W326 close | 4.036 (RED ALERT) | LOCKED |
| W328 close (both gates resolved) | ~4.20 (YELLOW) | RE-EVAL post R5 unblock |
| W329 close (sca-v11 bundle + K-5 full + K-6 hooks) | ~4.30-4.34 (YELLOW upper) | RE-EVAL |
| W330 close (K-1 final + sca-v11 SHIP + codex round-N) | ~4.40 (YELLOW upper) | RE-EVAL |
| W331 micro-wave (Option α) | ~4.55 (GREEN; above 4.5 ship-gate) | RE-EVAL |

**Question for codex round-20**: with R5 PARTIAL-Path-2A unblock realized at W327-r3, what is the realistic composite-lift TRAJECTORY? Could W328 close land closer to 4.20-4.30 or even 4.30-4.40 immediately? Should W331 micro-wave become obviated?

---

## §7 Sources

- `Z:/claude-sota-installed/.claude/settings.json` (HEAD `2c48b1e`)
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (sca-v11)
- `Z:/claude-sota-installed/.claude/skills/ops-rhythm/SKILL.md` (v1)
- `Z:/claude-sota-installed/docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md`
- `Z:/claude-sota-installed/docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-4-SEQUENCED-W328-W330-PLAN.md`
- `git log -1 --format='%B' 2c48b1e` (W327-r3 commit body)
- `git log -1 --format='%B' 411c077` (W327-r2 commit body)
- W316-S5 7-layer Blueprint composite-score methodology
- W326-D-2 codex GPT-5.5 round-13 deep audit (7 K-N concerns + 4.036 composite)
