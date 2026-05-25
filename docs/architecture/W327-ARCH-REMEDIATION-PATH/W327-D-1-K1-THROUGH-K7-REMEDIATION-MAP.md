# W327-D-1 — K-1 through K-7 Architecture Remediation Map

**Date**: 2026-05-19 **Wave**: W327 Stream D (REMEDIATION-focused) **HEAD at entry**: `569080a`
**Source**: codex GPT-5.5 round-13 deep audit (W326-D-2) surfaced 7 architecture-level concerns; W326 composite quality dropped 4.336 → 4.036 (BELOW 4.5 ship-gate AND BELOW 4.0 YELLOW band per W316-S5 7-layer Blueprint).
**Goal**: Map each of 7 codex K-N concerns to concrete remediation actions with effort estimate, dependency chain, and composite-lift projection.
**Composite target**: 4.036 → 4.2 (post-W328) → 4.4 (post-W329) → ≥4.5 (post-W330).

---

## §1 Composite quality baseline (W316-S5 7-layer)

| Layer | W326 effective | Remediation lift target |
|---|---|---|
| L1 Cardinal-Rules | 4.485 | +0.300 (K-1 reclass) → 4.785 |
| L2 Orchestration | 3.850 | +0.150 (K-5 wave-coord) → 4.000 |
| L3 Memory | 4.300 | +0.150 (K-5 + K-2) → 4.450 |
| L4 Research/Decision | 4.310 | +0.250 (K-3 split skip) → 4.560 |
| L5 Install/Wire | 4.300 | +0.350 (K-2 + K-4) → 4.650 |
| L6 Observability | 3.750 | +0.300 (K-2) → 4.050 |
| L7 Safety/Governance | 3.457 | +0.400 (K-1 + K-6) + +0.200 (K-7 dwell) → 4.057 |
| **Composite** | **4.036** | **+0.514 cumulative → ≥4.55 post-W330** |

---

## §2 K-1 — R5 Option C is not threat-model equivalent to OS sandboxing (CRITICAL)

### Current state (severity)

| Field | Value |
|---|---|
| **Codex K-1 severity** | CRITICAL |
| **Convergence** | STRONG (5-wave Claude + codex round-13) |
| **Cite anchor** | `.claude/settings.json:92,414-419`; `.claude/skills/sota-convergence-audit/SKILL.md:381-403`; `https://code.claude.com/docs/en/sandboxing` |
| **Live config** | `defaultMode: bypassPermissions` + `sandbox.enabled:false` + `failIfUnavailable:false` + `allowUnsandboxedCommands:true` + `excludedCommands: [git, docker, npx, uvx]` |
| **W325-C recommended path** | Option C 5-control layered-defense as "EQUIVALENT-HOLD" (codex K-1 rejects "EQUIVALENT" framing) |
| **Wave-dwell** | 8 waves (W316-S1 + W314-E + W316-S4 + W316-S5-L7 + W317-S1 + W319-D + W324 + W325-C) |

### Remediation path (5 concrete steps)

**OPERATOR-DECISION GATE** (cannot proceed without): choose A or B:

**Path 2A — RECLASSIFY (preserve Z:-portable Windows-native + autonomous-loop velocity)**
1. Rename W325-C "EQUIVALENT-HOLD" → "**R5-WINDOWS-NATIVE-ACCEPTED-RISK**" across `STREAM-C-OPTION-C-LAYERED-DEFENSE.md` + `STREAM-C-RECOMMENDATION.md` + sca-v10 SKILL.md §6
2. Author + operator-sign `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` with 5 falsifiable-inverse claims (FI-1 through FI-5 per W325-C §7)
3. Wire signed-audit-trails plugin attest of acceptance-record commit (K-6 dependency)
4. CLAUDE.md cardinal-rule R5 corollary line: "R5-W325-corollary: documented exception per docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md"
5. Wire Control 2 audit-logging PreToolUse hook (≤2KB CR-2 sanctioned-exception) writing `.claude/state/audit/<YYYY-MM-DD>.jsonl` with SHA-256 hash chain

**Path 2B — TIGHTEN (apply Anthropic-canonical settings; accept workflow disruption)**
1. settings.json: `permissions.defaultMode` → `default` (not `bypassPermissions`)
2. settings.json: add `permissions.disableBypassPermissionsMode: "disable"` (managed setting)
3. settings.json: `sandbox.failIfUnavailable: true`
4. settings.json: `sandbox.allowUnsandboxedCommands: false`
5. settings.json: remove `npx`, `uvx` from `sandbox.excludedCommands` (HIGH-risk package runners)
6. PLAN WSL2/devcontainer/VM migration (3-5 wave effort; Z:-portable constraint must relax)

### Effort estimate

- **2A (RECLASSIFY)**: S (1-wave) for reclassification + acceptance signing (steps 1-4); M (3-wave) for Control 2 hook + Control 5 quarterly drift-audit wire-up (step 5 + K-6 chain)
- **2B (TIGHTEN)**: L (7-wave) — settings.json delta is S but WSL2 migration is 3-5 wave prereq

### Dependency chain

- **K-1 BLOCKS**: K-6 (signed-audit-trails wiring requires R5 stance ratified first for hook trust-chain)
- **K-1 BLOCKS**: composite L7 lift (4.485 → 4.785; +0.300 contingent on Path 2A signing OR Path 2B WSL2 migration)
- **K-1 BLOCKED-BY**: operator decision authority (NOT Claude or codex)

### Expected composite-lift

- **Path 2A** (1-wave reclassify): L1 +0.150 (R5 explicit-not-silent) + L7 +0.200 (acceptance-record + Controls 2+5 wired) = **+0.350 net → 4.036 → 4.386**
- **Path 2B** (7-wave tighten): L1 +0.300 (R5 hard hold) + L7 +0.400 = **+0.700 net → 4.036 → 4.736** (but requires WSL2 migration prereq)

### Cite-anchored references

- W326-D-2 §Concern-1 (codex K-1 verbatim)
- W325-R5-UNBLOCK-EXPLORE Stream-C all 6 docs
- sca-v10 SKILL.md §6 Controls 1-5
- External SOTA: NIST 800-53 AC-3(3) + OWASP A01-2021 + Microsoft Zero-Trust + WSL2 docs

---

## §3 K-2 — L5 install decisions shipping without L6 runtime-fitness telemetry (HIGH)

### Current state (severity)

| Field | Value |
|---|---|
| **Codex K-2 severity** | HIGH |
| **Convergence** | STRONG (W325-A P0 + W326-D round-13) |
| **Cite anchor** | `.claude/settings.json:23-28`; `docs/architecture/W325-CLOSURE-SYNTHESIS/W325-SYNTHESIS.md:20-24,61-75`; `https://code.claude.com/docs/en/monitoring-usage` |
| **Live config** | `OTEL_EXPORTER_OTLP_HEADERS` ABSENT in settings.json env block + CLAUDE.local.md env block; CC OTel exporters emit spans but Langfuse silently rejects (auth-header missing) |
| **Empirical state** | 0 native CC traces in Langfuse over runtime lifetime per W325-A finding |

### Remediation path (3 concrete steps)

1. **CLAUDE.local.md env block** (gitignored secrets): add
   ```powershell
   $env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $([Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('pk-lf-<redacted-W327-D>:sk-lf-<redacted-W327-D>')))"
   ```
2. **settings.json env block**: promote `OTEL_METRICS_EXPORTER=otlp` + `OTEL_LOGS_EXPORTER=otlp` from W325-A P1 backlog to W327 precondition (env block lines ~30-40 area)
3. **sca-v11 §6 5-gate amendment** OR add 6th gate: require `observability_present=true` for T1 INSTALL ratification:
   - At least 1 post-install span MUST arrive in Langfuse within 24h before T1 LIVE status
   - Probe: `mcp__langfuse__get-trace` (or equivalent) returns ≥1 span with `service.name=claude-code` AND `installation.id=<this-runtime>`
   - Skip-N/A for arch-itself per W295 I9 (tautological)

### Effort estimate

**S** (1-wave) — env-var fix is 60-sec paste-ready; sca-v11 §6 amendment is rubric authorship (~30 min).

### Dependency chain

- **K-2 BLOCKS**: composite L6 lift (3.750 → 4.050; +0.300)
- **K-2 BLOCKS**: ability to verify K-1 Path 2A Control 2 audit-hook actually emits (telemetry round-trip)
- **K-2 BLOCKED-BY**: NONE (Langfuse keys already in CLAUDE.local.md `$env:LANGFUSE_PUBLIC_KEY` + `$env:LANGFUSE_SECRET_KEY`)

### Expected composite-lift

L5 +0.200 (install gate adds observability prereq) + L6 +0.300 (OTel headers fix unlocks telemetry) = **+0.500 net → 4.036 → 4.536**

### Cite-anchored references

- W326-D-2 §Concern-2 (codex K-2 verbatim)
- W325-CLOSURE-SYNTHESIS §A P0-1 (60-sec env-var fix paste-ready)
- External SOTA: Anthropic monitoring-usage docs + Google SRE Book Ch.6 "If you can't measure it, you can't manage it" + OpenTelemetry CNCF spec

---

## §4 K-3 — Self-evaluation skip-N/A escape hatch widening (HIGH)

### Current state (severity)

| Field | Value |
|---|---|
| **Codex K-3 severity** | HIGH (PASS-WITH-OBSERVATION per anti-bias gate; INTERNAL-DOMINANT cite per W326 codex-r1 closure) |
| **Convergence** | CODEX-FRESH (Claude missed; W327 P1 commission external rubric anchors) |
| **Cite anchor** | `.claude/skills/sota-convergence-audit/SKILL.md:171-182,291-293,428-432,465`; `docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md:14-17` |
| **Live state** | sca-v10 skips D-EMP + D34 + D42 + D43 + D44 + D45 for arch-itself per I9 EXTENDED; pattern WIDENED from v7.1 (D34 only) → v8 (+D-EMP) → v10 (+D42-D45). 6 skipped dims out of ~42 (~14% blind) |

### Remediation path (4 concrete steps)

1. **Distinguish in sca-v11**:
   - **"tautological skip"** (dim cannot apply to self by definition — e.g., D34 cohort_overlap_signal cannot measure overlap of arch with itself; D44 codex_round_efficiency measures rubric's own ratification process)
   - **"methodology skip"** (dim COULD apply but is skipped to avoid bad-news — e.g., D-EMP could be probed via Langfuse spans + ledger row activity + service-health uptime)

2. **For arch-itself self-eval**:
   - Replace D-EMP skip with **operational probe** over Langfuse spans + ledger row activity + service-health uptime → gives a real number, not skip-default
   - Probe spec: D-EMP_arch = avg of (Langfuse_span_count_24h_normalized + ledger_row_velocity_per_wave + uptime_pct_NSSM_services) → mapped to 1-5 scale

3. **For arch-itself D42-D45**:
   - Replace skip with **external-auditor-only scoring** — when external auditor (operator OR codex acting as cross-model peer) evaluates arch-itself, they fill D42-D45 with external evidence (e.g., codex round-N's reading of arch's awesome-list inclusion)
   - When arch-self-eval runs, D42-D45 stay skip-tautological (preserves I9)
   - **Asymmetry**: arch-self ≠ external-auditor scoring of arch (this is the principled split codex requires)

4. **Apply 3-org-distinct external SOTA cite anchors** to sca-v11 §4 anti-bias gate text:
   - **ISO 19011:2018 §4.6** Independence (auditor independence from activity-being-audited) — `https://www.iso.org/standard/70017.html`
   - **Sarbanes-Oxley §404** CEO certification of own controls (banned without external attestation) — `https://www.law.cornell.edu/uscode/text/15/7262`
   - **COBIT 5 BAI06** Manage Changes "audit-segregation" — `https://www.isaca.org/resources/cobit`

### Effort estimate

**M** (3-wave) — sca-v11 design + ship; the design is straightforward but requires:
- Operational probe instrumentation for D-EMP_arch (depends on K-2 telemetry fix)
- External-auditor-mode scoring pathway (new sca workflow)
- Ledger update to capture asymmetric scoring (`arch_self_score` vs `arch_external_score` columns)

### Dependency chain

- **K-3 BLOCKED-BY**: K-2 (D-EMP_arch operational probe requires Langfuse spans → K-2 OTel fix MUST land first)
- **K-3 BLOCKS**: composite L4 lift (4.310 → 4.560; +0.250)
- **K-3 BLOCKED-BY (partial)**: K-4 (D39+D40+D41 from W323-4 are ALSO awaiting sca-v11 ship → bundle in same wave)

### Expected composite-lift

L4 +0.250 (skip-N/A split closes asymmetric escape) → **4.036 → 4.286** (K-3 alone)

### Cite-anchored references

- W326-D-2 §Concern-3 (codex K-3 verbatim)
- sca-v10 SKILL.md §5b D42-D45 + §8 I9 EXTENDED
- W326-D-4 §5.A tiebreaker analysis (ISO + SOX + COBIT 3-org-distinct anchor)

---

## §5 K-4 — Supply-chain artifact-boundary trust (HIGH)

### Current state (severity)

| Field | Value |
|---|---|
| **Codex K-4 severity** | HIGH (MED-confidence per W326-D-2) |
| **Convergence** | STRONG (W323-Stream-4 designed D39 + W326-D round-13) |
| **Cite anchor** | `.mcp.json:21-24,28-33,63-77,87-98`; `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-4-RESEARCH-ARCH-V9.md:27-32`; `https://code.claude.com/docs/en/settings` |
| **Live state** | `npx -y <pkg>@<pinned>` pins improve reproducibility but execute package-manager resolution + lifecycle code inside `bypassPermissions:true` + sandbox `enabled:false` runtime; W323-4 D39/D40/D41 designed as PROSE-only in sca-v9 §6 but NOT shipped as scored dims; `strictKnownMarketplaces` + `allowManagedMcpServersOnly` absent from settings.json |

### Remediation path (4 concrete steps)

1. **Install `slsa-verifier`** Windows binary via existing `Bash(gh release download *)` permission per W323-4 §5 wire plan:
   ```powershell
   gh release download v2.6.0 -R slsa-framework/slsa-verifier -p "slsa-verifier-windows-amd64.exe"
   Move-Item slsa-verifier-windows-amd64.exe Z:/tools/slsa-verifier.exe
   ```

2. **Stand up `.claude/state/capability-registry.json`** skeleton per W323-4 §4 with 3 sample capabilities:
   ```json
   {
     "mcp:gitnexus": { "version": "<local>", "attestation_url": null, "verified": false },
     "mcp:basic-memory": { "version": "0.21.1", "attestation_url": null, "verified": false },
     "plugin:codex": { "version": "1.0.4", "attestation_url": "<github-rel-url>", "verified": "pending" }
   }
   ```

3. **Ship D39+D40+D41 as SCORED dims in sca-v11** (currently PROSE-only in v9 §6):
   - D39 `supply_chain_attestation` — SLSA L3 attestation present (1-5 scale: 1=none, 5=L3 with key-rotation)
   - D40 `layered_defense_depth` — count of independent controls (1-5: NIST 800-53 control families covered)
   - D41 `degraded_mode_explicit` — Is fallback/degradation behavior documented + tested? (1-5: 1=undocumented, 5=tested + alerting)
   - Composite denom recompute: v10 36.8 install + D39 0.5 + D40 0.4 + D41 0.4 = **37.7 v11 install denom** (W326-B-1 math fix preserved)
   - Pattern denom: v10 16.0 + D39 0.3 + D40 0.2 + D41 0.3 = **16.8 v11 pattern denom**

4. **Promote managed settings.json keys**:
   ```json
   "marketplaces": {
     "strictKnownMarketplaces": true,
     "allowManagedMcpServersOnly": true
   }
   ```
   - **NOTE**: This is settings.json edit — outside W327-D DOC-ONLY scope; recorded as paste-ready spec for W328+ Stream A.

### Effort estimate

**M** (3-wave):
- slsa-verifier install + capability-registry skeleton: S (1-wave)
- D39+D40+D41 scored dims in sca-v11: M (3-wave); bundle with K-3 split skip-N/A in same sca-v11 design pass
- managed settings.json promote: S (1-wave) operator-confirmable

### Dependency chain

- **K-4 BLOCKED-BY**: NONE (slsa-verifier install via `gh release download` permission already in `permissions.allow`)
- **K-4 BLOCKS**: composite L5 lift (4.300 → 4.650; +0.350) + L7 lift (~+0.150)
- **K-4 BUNDLES-WITH**: K-3 (sca-v11 design pass should include BOTH skip-N/A split AND D39+D40+D41 scored dims)

### Expected composite-lift

L5 +0.350 (supply-chain artifact-boundary closed) + L7 +0.150 (managed marketplace + signature gate) = **+0.500 net → 4.036 → 4.536**

### Cite-anchored references

- W326-D-2 §Concern-4 (codex K-4 verbatim)
- W323-Stream-4 STREAM-4-RESEARCH-ARCH-V9.md §4 capability-registry + §5 wire plan
- sca-v9 §6 Control 5 SLSA L3 anchor
- External SOTA: SLSA v1.0 framework + CNCF Software Supply Chain Best Practices + NIST 800-218 SSDF

---

## §6 K-5 — Parallel orchestration outruns memory write coordination (MED)

### Current state (severity)

| Field | Value |
|---|---|
| **Codex K-5 severity** | MED (MED-confidence per W326-D-2) |
| **Convergence** | STRONG (CLAUDE.md L12-14 mandate + W325-B "recovery, not prevention" admission + W326-D round-13) |
| **Cite anchor** | `CLAUDE.md:12-14`; `.claude/skills/goal-prompt-synthesis/SKILL.md`; `docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md:13-17,66-74` |
| **Live state** | L2 mandates aggressive parallel fan-out + parallel sessions; L3/T6 memory + verdict ledgers are file/note-oriented with NO lease, CAS, per-wave lock, or conflict protocol. W325 reconciliation shows post-hoc survival checks (recovery), not prevention. W320 + W326-r1 closure both had multi-session race conditions. |

### Remediation path (4 concrete steps)

1. **Author `.claude/state/wave-ownership.json`** schema:
   ```json
   {
     "wave_id": "W327",
     "streams": {
       "A": { "owner": "<agent-id>", "base_sha": "<sha>", "deliverable_paths": ["..."], "created_at": "<iso>", "expires_at": "<iso+24h>" },
       "B": {...}, "C": {...}, "D": {...}
     }
   }
   ```

2. **SessionStart hook** (plugin-shipped, CR-2): emit current wave's ownership manifest; check for stale entries (>24h `expires_at`) and warn. Use `everything-claude-code` SessionStart hook surface or `signed-audit-trails` pre-flight.

3. **Append-only event log** at `.claude/state/wave-events.jsonl`: each Stream-N write records
   ```json
   {"wave_id":"W327","stream_id":"D","action":"write","paths":["docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-...md"],"sha_before":"<sha>","sha_after":"<sha>","ts":"<iso>"}
   ```

4. **Merge-bot policy** (manual for now; automation deferred): when 2+ branches converge, REJECT any write where `base_sha` is NOT an ancestor of current HEAD (defeats last-writer-wins). Operator workflow: `git merge-base --is-ancestor <base_sha> HEAD || REJECT`.

### Effort estimate

**M** (3-wave):
- wave-ownership.json schema design: S (1-wave) — DOC-only
- SessionStart hook authorship: M (3-wave) — must use plugin-shipped or CR-2 sanctioned-exception ≤2KB
- wave-events.jsonl append-only: S (1-wave) — Bash append in existing pre-commit hook OR PostToolUse hook (plugin-shipped)
- merge-bot policy: S (1-wave) — manual operator policy doc

### Dependency chain

- **K-5 BLOCKED-BY**: NONE (file-based; no MCP or external dependency)
- **K-5 BLOCKS**: composite L2 lift (3.850 → 4.000; +0.150) + L3 lift (4.300 → 4.450; +0.150)
- **K-5 INDEPENDENT-OF**: K-1 through K-4 (can ship in any wave order)

### Expected composite-lift

L2 +0.150 + L3 +0.150 = **+0.300 net → 4.036 → 4.336**

### Cite-anchored references

- W326-D-2 §Concern-5 (codex K-5 verbatim)
- W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md (multi-session race patterns)
- W320-r1 closure + W326-r1 closure (race-condition recurrence pattern)
- External SOTA: ACID semantics (Codd 1970, Gray+Reuter 1992) + Postgres WAL + Kubernetes Operator Pattern + git rebase-not-merge discipline

---

## §7 K-6 — Hook RCE / signed-audit boundary (MED)

### Current state (severity)

| Field | Value |
|---|---|
| **Codex K-6 severity** | MED (HIGH-confidence per W326-D-2) |
| **Convergence** | STRONG (W321-1 3-HIGH-gap hooks + W321-8 codex META blindspot #2 + W326-D round-13) |
| **Cite anchor** | `.claude/settings.json:7,99-131,142-185,241-242`; `https://code.claude.com/docs/en/hooks` |
| **Live state** | `signed-audit-trails@claude-code-workflows` enabled=false at settings.json:242; `protect-mcp@claude-code-workflows` enabled=false at settings.json:241; ECC `stop:cost-tracker` + `stop:evaluate-session` disabled per `ECC_DISABLED_HOOKS` env. Hooks lean on gitleaks/trivy/codex review yet governance/cost/evaluate hooks are disabled and signed-audit-trails/protect-mcp plugins are disabled. |

### Remediation path (4 concrete steps)

1. **Re-enable `signed-audit-trails@claude-code-workflows`** in settings.json:242 (currently `false`):
   ```json
   "wshobson/claude-code-workflows@signed-audit-trails": true
   ```

2. **Re-enable `protect-mcp@claude-code-workflows`** in settings.json:241 (currently `false`):
   ```json
   "wshobson/claude-code-workflows@protect-mcp": true
   ```

3. **Un-disable ECC governance hooks** from `ECC_DISABLED_HOOKS` env:
   - Remove `stop:cost-tracker` from disabled-list
   - Remove `stop:evaluate-session` from disabled-list
   - Apply W321-1 §Output styles finding

4. **Verify hook stdout/stderr egress policy**:
   - Hooks MUST NOT print secrets (test: redact `pplx-*`, `pk-lf-*`, `sk-lf-*`, `ghp_*`, `sk-*`, `Bearer `)
   - Add regex redaction PostToolUseFailure additionalContext + PreCompact log
   - Matches W323-4 R5-LD3 layered-defense recommendation

### Effort estimate

**M** (3-wave):
- re-enable plugins: S (1-wave) — settings.json 2-line edit (operator approval needed since K-6 trust-chain depends on K-1 ratify)
- ECC hook un-disable: S (1-wave) — env var removal in settings.json
- hook egress policy verification: M (3-wave) — requires hook stdout/stderr capture + redaction test suite

### Dependency chain

- **K-6 BLOCKED-BY**: K-1 (R5 stance MUST ratify before hooks-as-governance trust-chain holds; if Path 2A then K-6 wires signed-audit; if Path 2B then K-6 less critical since OS-sandbox provides containment)
- **K-6 BLOCKS**: composite L7 lift (~+0.200)
- **K-6 BUNDLES-WITH**: K-1 (signed-audit-trails wire-up is part of K-1 Path 2A acceptance-record attestation chain)

### Expected composite-lift

L7 +0.200 (signed-audit + protect-mcp wired) → **4.036 → 4.236** (K-6 alone)

### Cite-anchored references

- W326-D-2 §Concern-6 (codex K-6 verbatim)
- W321-1 §Output styles finding (3-HIGH-gap hooks)
- W321-8 codex META blindspot #2 (signed-audit-trails enabled-but-unwired)
- External SOTA: MITRE CWE-918 (SSRF) + OWASP A06:2021 (Vulnerable Components) + Aleph One "Smashing the Stack" + hook trust-inversion principle

---

## §8 K-7 — P0 dwell escalation policy (MED)

### Current state (severity)

| Field | Value |
|---|---|
| **Codex K-7 severity** | MED (HIGH-confidence per W326-D-2) |
| **Convergence** | CODEX-FRESH extending Claude W295 dwell counter concept |
| **Cite anchor** | `docs/architecture/W325-CLOSURE-SYNTHESIS/W325-SYNTHESIS.md:41-49,103-119`; `docs/architecture/W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md:55-74,92-95` |
| **Live state** | R5 SHIP-BLOCKER (8-wave), Perplexity rotation (7-wave), ECC update (4-wave), `claude doctor` EXIT-0-silent (6-wave) — items have persisted across enough waves that "carry-forward" is masking a queueing failure. NO escalation state machine. |

### Remediation path (3 concrete steps)

1. **Author `.claude/skills/ops-rhythm/SKILL.md`** (or absorb into existing `goal-prompt-synthesis`):
   - **3-wave dwell**: P0 entry MUST have owner + date + next-irreversible-action (no "operator-decision-pending" alone)
   - **5-wave dwell**: auto-escalate to operator mailbox (basic-memory note `mcp__basic-memory__write_note` + signed audit-trail entry) OR reclassify as `SIGNED-ACCEPTED-RISK` (carries forward but with cardinal-rule-clean status)
   - **8-wave dwell**: block new T1 installs UNRELATED to the P0 (focus discipline; W325 caught 8-wave R5 SHIP-BLOCKER ALREADY exceeded this; current state is post-violation)

2. **Wrap `claude doctor`** with independent parser until upstream exit-semantics fix lands:
   ```bash
   bash -c "claude doctor 2>&1 | tee tmp/doctor.log; if grep -q 'No issues found' tmp/doctor.log; then echo OK; else cat tmp/doctor.log; fi"
   ```
   This is paste-ready replacement for any `claude doctor` invocation in settings.json or scripts.

3. **Apply 3-org-distinct external SOTA cite anchors**:
   - **ITIL v4 Service Operation §4.4** Incident Management (escalation timeline) — `https://www.axelos.com/certifications/itil-service-management`
   - **Google SRE Book Ch.13** "Distributed Systems Tracing" (MTTR target) — `https://sre.google/sre-book/handling-overload/`
   - **DORA "State of DevOps Report" 2024** (change-failure-rate + lead-time-for-changes) — `https://dora.dev/research/2024/`

### Effort estimate

**S** (1-wave) — single SKILL.md author (~30 min); claude doctor wrapper is 60-sec paste-ready; cite anchor authorship is part of SKILL.md design.

### Dependency chain

- **K-7 BLOCKED-BY**: NONE (skill authorship + paste-ready wrapper)
- **K-7 BLOCKS**: composite L7 lift (~+0.200) + governance discipline (forces K-1 + OPS items into resolution states)
- **K-7 INDEPENDENT-OF**: K-1 through K-6 (meta-process layer; orthogonal to specific concerns)

### Expected composite-lift

L7 +0.200 (dwell policy adds escalation state machine) → **4.036 → 4.236** (K-7 alone)

### Cite-anchored references

- W326-D-2 §Concern-7 (codex K-7 verbatim)
- W326-D-4 §5.B tiebreaker analysis (ITIL + Google SRE + DORA 3-org-distinct anchor)
- W295 codex-r12+ blind-spot dwell counter (extends to threshold-based escalation)

---

## §9 Aggregate remediation map summary

| K-N | Severity | Effort | Wave | Composite-lift δ | Blocked-by | Bundles-with |
|---|---|---|---|---|---|---|
| **K-1** Path 2A | CRITICAL | S+M | W328+W329 | +0.350 (4.036→4.386) | OPERATOR-DECISION | K-6 |
| **K-1** Path 2B | CRITICAL | L | W328+(7-wave WSL2) | +0.700 (4.036→4.736) | OPERATOR-DECISION + WSL2 prereq | — |
| **K-2** OTel | HIGH | S | W328 | +0.500 (4.036→4.536) | NONE | sca-v11 §6 amendment |
| **K-3** skip-N/A split | HIGH | M | W329 | +0.250 (4.036→4.286) | K-2 (D-EMP probe) | K-4 sca-v11 design |
| **K-4** supply-chain | HIGH | M | W329 | +0.500 (4.036→4.536) | NONE | K-3 sca-v11 design |
| **K-5** wave-coord | MED | M | W329 | +0.300 (4.036→4.336) | NONE | — |
| **K-6** hooks | MED | M | W329 | +0.200 (4.036→4.236) | K-1 (R5 ratify) | K-1 Path 2A signed-audit attest |
| **K-7** dwell | MED | S | W328 | +0.200 (4.036→4.236) | NONE | — |

**Cumulative composite-lift (max non-overlapping)**: 4.036 + 0.350 (K-1 2A) + 0.500 (K-2) + 0.250 (K-3) + 0.500 (K-4) + 0.300 (K-5) + 0.200 (K-6) + 0.200 (K-7) = **~+2.30 lift theoretical max**

**REALISTIC** (overlap-adjusted, per-layer cap, with K-1 path-2A chosen): 4.036 → **~4.55** (above 4.5 ship-gate post-W330)

---

## §10 Operator-blocking items (carried to W327-D-5)

| Item | Wave-dwell | Blocking-class | W327-D-5 spec ref |
|---|---|---|---|
| R5 sandbox decision (K-1 Path 2A vs 2B) | 8-wave | OPERATOR-AUTHORITY | §1 |
| Langfuse SEV-1 key rotation (precondition for K-2 OTEL) | 0 (pre-K-2) | OPERATOR-AUTHORITY | §2 |
| Perplexity SEV-1 key rotation | 7-wave | OPERATOR-AUTHORITY | §3 |
| W323-4 dims-absorb (Option A/B/C per W326-B-2) | 2-wave | CLAUDE-AUTHORITY (codex round-N ratify) | §4 |
| Commit-signing decision | 1-wave | OPERATOR-AUTHORITY | §5 |
| WSL2 scorecard install (K-1 Path 2B prereq) | 0 (pre-K-1 2B) | OPERATOR-AUTHORITY | §6 |
| EXA API key register | 1-wave | OPERATOR-AUTHORITY | §7 |

---

## §11 Composite-lift projection (W328 → W329 → W330)

| Wave | Focus | Composite | Post-wave projection |
|---|---|---|---|
| **W326 close** | — | **4.036** | RED ALERT |
| **W328** | K-2 (OTel) + K-7 (dwell SKILL.md) + K-1 Path 2A step 1-4 (reclassify) | **4.036 → ~4.20** | YELLOW |
| **W329** | K-3 + K-4 (sca-v11 bundle) + K-5 (wave-coord) + K-6 (hooks re-enable) | **~4.20 → ~4.40** | YELLOW upper |
| **W330** | K-1 Path 2A step 5 (Control 2 hook wire) + Control 5 quarterly drift-audit + sca-v11 SHIP + post-wave codex round-N consensus ratify | **~4.40 → ≥4.55** | GREEN (above 4.5 ship-gate) |

Total remediation wall-clock: ~3 waves (W328-W330) at parallel-streams ~4h/wave = **~12h cumulative** to reach ship-gate ≥4.5.

---

## §12 Cite-anchor master list

- W326-D-2 §Concern-1 through Concern-7 (codex round-13 verbatim)
- W326-D-3 anti-bias gate per-concern verdicts
- W326-D-4 §5 tiebreaker analysis (CDX-1 ISO+SOX+COBIT, CDX-2 ITIL+SRE+DORA)
- W326-D-5 §1 W327+ forward AIs AI-1 through AI-7
- W326-CODEX-R1-CLOSURE.md (provenance + anti-bias terminology corrections)
- W325-R5-UNBLOCK-EXPLORE STREAM-C-RECOMMENDATION.md + STREAM-C-OPTION-C-LAYERED-DEFENSE.md
- W325-CLOSURE-SYNTHESIS/W325-SYNTHESIS.md (10 P0 carry items)
- W325-MULTI-SESSION-RECONCILE/STREAM-B-SYNTHESIS.md (wave-coord finding)
- W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-4-RESEARCH-ARCH-V9.md (D39+D40+D41 design)
- sca-v10 SKILL.md §5b D42-D45 + §6 Controls 1-5 + §8 I9 EXTENDED
- W316-S5 7-layer Blueprint composite-score methodology
- W295 §6.2 anti-bias gate + I9 self-reference invariant
- External SOTA (per K-N): NIST 800-53, OWASP, ISO 19011/31000, SOX §404, COBIT 5, SLSA v1.0, CNCF, ITIL v4, Google SRE, DORA
