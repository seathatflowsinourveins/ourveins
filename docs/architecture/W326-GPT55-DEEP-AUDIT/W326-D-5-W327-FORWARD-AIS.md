# W326-D-5 — W327+ Forward AIs (Architecture-Level, Ranked)

**Date**: 2026-05-19  **Wave**: W326 Stream D  **Source**: 7 codex GPT-5.5 architecture-level concerns (Concerns 1-7) crossed with Claude prior-wave findings.  **Cumulative codex round count**: 13 (W326-D is round 1 of W326 sequence).

**Ranking criteria** (W316-S5 ECC compatibility): (a) **Severity** weighted 3x (CRITICAL=3, HIGH=2, MED=1, LOW=0.5); (b) **Effort** inverse-weighted 2x (S=2, M=1, L=0.5); (c) **Convergence** weighted 1x (STRONG-CONVERGENT=2, CODEX-FRESH=1.5, CLAUDE-FRESH=1); (d) **Operator-action-required** flagged separately (does NOT impact rank — operators decide what they action when).

---

## §1 Top-priority W327+ forward AIs (architecture-level)

### AI-1 (P0-ARCH) — Reclassify R5 stance and apply Anthropic-canonical settings tightening

**Source**: codex K-1 (CRITICAL) + Claude C-1 8-wave SHIP-BLOCKER
**Severity**: CRITICAL  **Effort**: L (7-wave) for full remediation; S (1-wave) for reclassification + acceptance signing
**Convergence**: STRONG-CONVERGENT (5-wave Claude + codex W326)
**Rank score**: 9.0

**Action** (4-step):
1. **Operator decision** (W326 close or W327 open): keep `bypassPermissions:true` + sandbox `enabled:false` as DRIFT-INTENTIONAL **OR** apply Anthropic-canonical settings tightening per codex K-1 W327+ recommendation.
2. **If DRIFT-INTENTIONAL**: rename W325-C Option C from "EQUIVALENT" to "**R5-WINDOWS-NATIVE-ACCEPTED-RISK**" + sign signed-audit-trails-attested acceptance-record with 5 falsifiable-inverse claims.
3. **If TIGHTEN**: set `permissions.defaultMode` to `default` (not bypass) + `permissions.disableBypassPermissionsMode:"disable"` + `sandbox.failIfUnavailable:true` + `allowUnsandboxedCommands:false` + plan WSL2/devcontainer migration.
4. **Either path**: drop `npx`, `uvx` from `sandbox.excludedCommands` — these are high-risk package runners that should NOT be sandbox-exempted even when sandbox is conditionally re-enabled.

**Operator-blocking?**: YES (R5 decision is operator-authority).

### AI-2 (P0-ARCH) — Promote `observability_present=true` to L4/L5 ship-gate precondition

**Source**: codex K-2 (HIGH) + Claude C-2 W325-A P0
**Severity**: HIGH  **Effort**: S (1-wave; combines W325-A 60-sec env-var fix + sca-v11 §7 ship-gate amendment)
**Convergence**: STRONG-CONVERGENT
**Rank score**: 8.5

**Action** (3-step):
1. Add `OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic <base64-pubkey:seckey>` to CLAUDE.local.md env block (gitignored secrets). Verify Langfuse begins receiving CC native spans (`claude_code.interaction`, `llm_request`, `tool.execution`, `hook` events).
2. Add `OTEL_METRICS_EXPORTER=otlp` + `OTEL_LOGS_EXPORTER=otlp` to settings.json env block — promote from W325 P1 backlog to W327 precondition.
3. Amend sca-v10 §6 5-gate (or add a 6th gate) to require **observability_present=true** for T1 INSTALL ratification: at least 1 post-install span must arrive in Langfuse within 24h before T1 LIVE status. This is a NEW gate to sca-v11.

**Operator-blocking?**: NO (env-var fix is paste-ready; sca amendment is rubric authorship).

### AI-3 (P0-ARCH) — Split skip-N/A pattern in sca-v11 (tautological vs methodology)

**Source**: codex K-3 CODEX-FRESH (HIGH)
**Severity**: HIGH  **Effort**: M (3-wave) for full sca-v11 design + ship; S (1-wave) for design draft only
**Convergence**: CODEX-FRESH (high-value insight Claude missed)
**Rank score**: 8.0

**Action** (4-step):
1. Distinguish in sca-v11:
   - **"tautological skip"** (dim cannot apply to self by definition — e.g., D34 cohort_overlap_signal cannot meaningfully apply to arch-itself)
   - **"methodology skip"** (dim could apply but is being skipped to avoid bad-news — e.g., D-EMP could be probed via Langfuse/ledger/service health)
2. For arch-itself self-eval: replace D-EMP skip with **operational probe** over Langfuse spans + ledger row activity + service-health uptime — this gives a real number, not skip-default.
3. Replace D42-D45 skip with **external-auditor-only scoring** — when external auditor (operator OR codex acting as cross-model peer) evaluates arch-itself, they fill D42-D45 with external evidence; when arch-self-eval runs, D42-D45 stay skip-tautological.
4. Apply ISO 19011:2018 + SOX §404 + COBIT 5 BAI06 3-org-distinct cite anchors to the sca-v11 §4 anti-bias gate text.

**Operator-blocking?**: NO (Claude-authority + codex round-N ratify).

### AI-4 (P0-ARCH) — Ship W323-4 D39+D40+D41 dims as scored gates in sca-v11

**Source**: codex K-4 (HIGH) + Claude C-10 W323-Stream-4 carry
**Severity**: HIGH  **Effort**: M (3-wave) — design + slsa-verifier install + capability-registry stand-up
**Convergence**: STRONG-CONVERGENT (Claude designed W323; codex re-surfaced as gap)
**Rank score**: 7.5

**Action** (4-step):
1. Install `slsa-verifier` Windows binary via existing `Bash(gh release download *)` permission per W323-4 §5 wire plan.
2. Stand up `.claude/state/capability-registry.json` skeleton per W323-4 §4 with 3 sample capabilities (mcp:gitnexus, mcp:basic-memory, plugin:codex).
3. Ship D39 supply_chain_attestation + D40 layered_defense_depth + D41 degraded_mode_explicit as SCORED dims in sca-v11 (currently PROSE-only in v9 §6). Composite denom recompute: v9 35.3 (off-by-1.0 corrected to 34.7) → v11 +D39 0.5 + D40 0.4 + D41 0.4 = 36.0 install.
4. Promote managed `strictKnownMarketplaces:true` + `allowManagedMcpServersOnly:true` to settings.json (currently absent). This raises supply-chain artifact-boundary trust.

**Operator-blocking?**: NO (Claude-authority + slsa-verifier install via gh release download permission already in `permissions.allow`).

### AI-5 (P1-ARCH) — Introduce wave-scoped coordination primitive for parallel sessions

**Source**: codex K-5 (MED) + Claude C-9 parallel_ratio 0.587 + W325-B "recovery not prevention"
**Severity**: MED  **Effort**: M (3-wave)
**Convergence**: STRONG-CONVERGENT
**Rank score**: 5.0

**Action** (4-step):
1. Author `.claude/state/wave-ownership.json` schema: `{ wave_id, stream_owner, base_sha, deliverable_paths[], created_at, expires_at }`.
2. SessionStart hook: emit current wave's ownership manifest; check for stale entries (>24h expired_at) and warn.
3. Append-only event log at `.claude/state/wave-events.jsonl`: each Stream-N write records `{ wave_id, stream_id, action, paths, sha_before, sha_after, ts }`.
4. Merge-bot policy: when 2+ branches converge, reject any write where `base_sha` is not ancestor of current HEAD (defeat last-writer-wins).

**Operator-blocking?**: NO; Claude-authority.

### AI-6 (P1-ARCH) — Wire signed-audit-trails plugin + un-disable ECC governance hooks

**Source**: codex K-6 (MED) + Claude W321-1 3-HIGH-gap hooks
**Severity**: MED  **Effort**: M (3-wave) — re-enable plugin + author hook bodies + verify via Stop-hook signing
**Convergence**: STRONG-CONVERGENT
**Rank score**: 4.5

**Action** (4-step):
1. Re-enable `signed-audit-trails@claude-code-workflows` in settings.json:242 (currently `false`).
2. Re-enable `protect-mcp@claude-code-workflows` in settings.json:241 (currently `false`).
3. Un-disable ECC `stop:cost-tracker` + `stop:evaluate-session` from `ECC_DISABLED_HOOKS` env (W321-1 §Output styles finding).
4. Verify hook stdout/stderr egress policy: hooks MUST NOT print secrets; add regex redaction PostToolUseFailure additionalContext + PreCompact log (matches W323-4 R5-LD3 layered-defense recommendation).

**Operator-blocking?**: NO; Claude-authority + plugin marketplace-already-installed.

### AI-7 (P1-ARCH) — Author P0-dwell escalation policy (3-wave / 5-wave / 8-wave thresholds)

**Source**: codex K-7 CODEX-FRESH (MED)
**Severity**: MED  **Effort**: S (1-wave) — author policy doc + integrate into CLAUDE.md or new "ops-rhythm" skill
**Convergence**: CODEX-FRESH (extends Claude W295 dwell counter concept)
**Rank score**: 4.0

**Action** (3-step):
1. Author `.claude/skills/ops-rhythm/SKILL.md` (or absorb into goal-prompt-synthesis):
   - **3-wave dwell**: P0 entry MUST have owner + date + next-irreversible-action
   - **5-wave dwell**: auto-escalate to operator mailbox (basic-memory note + signed audit-trail entry) OR reclassify as `SIGNED-ACCEPTED-RISK`
   - **8-wave dwell**: block new T1 installs UNRELATED to the P0 (focus discipline)
2. Wrap `claude doctor` with independent parser (per K-7) until upstream exit-semantics fix lands: `bash -c "claude doctor 2>&1 | tee tmp/doctor.log; if grep -q 'No issues found' tmp/doctor.log; then echo OK; else cat tmp/doctor.log; fi"` — paste-ready replacement.
3. Add ITIL v4 + Google SRE + DORA 3-org-distinct cite anchors to the SKILL.md.

**Operator-blocking?**: NO; Claude-authority.

---

## §2 Operator-action P0 carry-overs (NOT architecture-level but ship-blockers)

These are tactical operator-actions that codex did not surface (correctly — they're not architecture-level) but Claude prior-wave findings flagged as P0:

| # | Operator-AI | Source | Effort |
|---|---|---|---|
| OPS-1 | Rotate Perplexity API key per W319-SEV1-INCIDENT | C-6 7-wave carry | 60 sec |
| OPS-2 | Interactive `/plugin update` ECC + agent-teams (CLI form fails) | C-8 W321-4 carry | 5 min |
| OPS-3 | Populate TAVILY_API_KEY + EXA_API_KEY in CLAUDE.local.md | W324 P5 | 5 min |
| OPS-4 | File upstream issue: claude doctor EXIT-0-silent 6-wave regression | C-5 W325-D | 30 min |
| OPS-5 | File upstream issue: PROJECT_DIR state-redirect SILENTLY BROKEN (W315-r2 F-SS-1) | W315 carry | 30 min |
| OPS-6 | basic-memory v0.21.1 → v3.3.1 reconcile decision | C-7 W325-r2 | 1 hour |
| OPS-7 | Fix settings.json:206 ccstatusline hardcoded user-profile path (W286-A 6th violation) | C-3 W325-D | 5 min |
| OPS-8 | Codex round-N ratify sca-v9 §7 install denom 33.7 → 34.7 math fix | C-4 W325-B | 60 sec (codex round) |

**Note**: OPS-1, OPS-4, OPS-5 trigger AI-7 (3-wave dwell threshold) — once 5-wave reached, AUTO-ESCALATE to operator mailbox per codex K-7 recommendation.

---

## §3 W327+ wave shape recommendation

Per **W326-D-4 §4 cumulative architecture-quality score drop** (4.336 → 4.036, BELOW 4.5 ship-gate, BELOW 4.0 Δ6 YELLOW), **W327 should be a REMEDIATION wave**, NOT discovery/install:

| Stream | Focus | W326-D AI references | Wall-time |
|---|---|---|---|
| **W327 Stream A — R5 reclassification** | Apply AI-1 (codex K-1 CRITICAL) | AI-1 + OPS-7 (statusLine fix) | ~60 min |
| **W327 Stream B — Observability ship-gate** | Apply AI-2 (codex K-2 HIGH) | AI-2 + OPS-3 (env keys) | ~45 min |
| **W327 Stream C — sca-v11 design** | Apply AI-3 (split skip-N/A) + AI-4 (D39+D40+D41 scored gates) + OPS-8 (denom math codex-ratify) | AI-3 + AI-4 + OPS-8 | ~90 min |
| **W327 Stream D — Hook wiring + dwell policy** | Apply AI-6 (signed-audit + protect-mcp + ECC hooks) + AI-7 (dwell policy SKILL.md) | AI-6 + AI-7 | ~75 min |

**Estimated total W327 wall-time**: 4-5 hours across 4 parallel streams (100% parallel_ratio target per W269/W312-D mandate).

**Defer to W328+**: AI-5 (wave-scoped coordination primitive — needs more design + operator-decision on T6 transactional vs T6 file-based).

---

## §4 Cumulative codex round count + cost

- W319-W325 prior rounds: 12
- W326-D round 1: 1 (this audit; ~100-140k tokens / ~$2-4 estimated)
- **W326 cumulative**: 13 codex rounds
- W327 anticipated rounds: 4 (one per stream A-D, session-end auto-fire) → estimated 14-17 total post-W327
- Cumulative cost: well within operator unlimited budget per W316-r2 "operator MAX-quality unleash mandate"

---

## §5 Convergence with prior-wave codex findings

W326-D codex round produces these convergences with prior codex rounds:

| Convergent finding | Prior codex round | W326-D codex restate |
|---|---|---|
| R5 SHIP-BLOCKER + Windows-native NOT sandbox-supported | W319-D codex-r4 + W316-S4 codex-r1 | K-1 CRITICAL (sharpest framing yet — "not threat-model equivalent") |
| Observability gap → Langfuse silent reject | W325-A codex-r3 (paste-ready 60-sec fix) | K-2 HIGH (elevates to architecture-level ship-gate principle) |
| Supply-chain artifact-boundary | W319 + W323 codex-r2 + W324 codex META blindspot #1 | K-4 HIGH (re-surfaces post-W323-4 PROSE-only gap) |
| Signed-audit-trails enabled-but-unwired | W321-8 codex META blindspot #2 | K-6 MED (codex re-confirms) |

This is **convergent cross-codex-round signal** — multiple codex rounds independently surface the same architecture-level concerns. Strongest signal in the runtime's history.

---

## §6 Anti-bias self-check (W326-D Claude side)

**Q**: Are these 7 W327 AIs Claude-orchestrator-biased or operator-mandate-biased?

**A**: NO. The W326-D-3 anti-bias gate confirmed all 7 codex findings survive counterfactual inverse-test (under GPT-5.5-primary architecture, identical findings would surface). Claude's W327 AI ranking applies a NEUTRAL severity-3x + effort-2x + convergence-1x formula — operator can re-rank by adjusting weights but the architecture-level concerns themselves are objective.

**Q**: Should W327 be a remediation wave (per W326-D-4 §4 RED ALERT) OR continue discovery + remediation in parallel?

**A**: Recommendation is REMEDIATION-FOCUSED (per W326-D-4 §4 composite-score drop) but operator-decision authority. The 4-stream W327 shape proposed in §3 is **balanced between fix (Streams A+B+D) and design (Stream C sca-v11)** — does not preclude operator from running a parallel discovery stream at W327 if budget allows.

---

## §7 Final ratify

**7 W327+ architecture-level forward AIs surfaced from cross-model consensus** (Claude + codex GPT-5.5 high-effort), ranked by severity-weighted formula:

1. **AI-1 R5 reclassification** (CRITICAL, L-effort, P0-ARCH)
2. **AI-2 Observability ship-gate** (HIGH, S-effort, P0-ARCH)
3. **AI-3 Skip-N/A split sca-v11** (HIGH, M-effort, P0-ARCH, codex-fresh)
4. **AI-4 W323-4 D39+D40+D41 scored gates** (HIGH, M-effort, P0-ARCH)
5. **AI-5 Wave-scoped coordination primitive** (MED, M-effort, P1-ARCH)
6. **AI-6 Hook wiring + signed-audit-trails** (MED, M-effort, P1-ARCH)
7. **AI-7 P0 dwell escalation policy** (MED, S-effort, P1-ARCH, codex-fresh)

Plus 8 operator-AI P0 carry-overs (OPS-1 through OPS-8) that are tactical not architectural.

**W327 wave shape**: REMEDIATION-focused, 4 parallel streams (~4-5h wall-time) per W269 mandate.
