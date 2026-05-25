# W328 Stream A — R5 End-to-End Verification Synthesis

**Wave**: W328 Stream A · **Date**: 2026-05-19 · **HEAD**: `2c48b1e`
**Question**: is the R5 8-wave SHIP-BLOCKER unblock REAL end-to-end, or only a config-flip with companion gaps?
**Scope discipline**: DOC-ONLY verification per Stream A constraint. STRICT FILE OWNERSHIP: `docs/architecture/W328-R5-VERIFY/*` only. NO `.claude/settings.json` modifications. NO destructive ops.

---

## §1. Verdict

**R5 VERDICT: PARTIAL-HOLD-DEEPER-NEEDED.**

The W327-r3 commit message claim "**R5 NOW FULL-HOLD post defaultMode='default'**" (verbatim at `2c48b1e` commit body) is **DIRECTIONALLY CORRECT but MAGNITUDE-OVERSTATED**. The defaultMode flip is a real and material improvement to the permissions-layer of R5, but:

1. The **sandboxing-layer of R5 remains structurally inert** (per Anthropic sandbox doc — Windows-native is NOT in the macOS/Linux/WSL2 supported-OS list);
2. `sandbox.allowUnsandboxedCommands: true` is **latently dangerous** if/when an OS-migration to WSL2 ever activates the sandbox block;
3. The **W325-C Option C 5-control layered-defense** the runtime has been targeting is only **40% wired** (4.0 / 10 score per W328-A-4);
4. **2 of 5 W325-C falsifiable-inverse claims (FI-1 + FI-2)** would be BROKEN if the operator-acceptance-record existed (which it does NOT yet);
5. The W327-D-1 K-1 reclassification expected **+0.30 to +0.45 composite lift**; actual lift estimate is **+0.121** (W328-A-5 mid estimate) — undershoots the W328 target.

The R5 cardinal-rule moves from **PARTIAL-HOLD** to **PARTIAL-HOLD-UPGRADED**, NOT FULL-HOLD.

---

## §2. What was VERIFIED

### §2.1 defaultMode flip is REAL

- `.claude/settings.json:92` reads `"defaultMode": "default"` (W328-A-1 §1)
- Diff `569080a → 2c48b1e` confirms `"bypassPermissions" → "default"`
- Flip introduced in commit `6b4b0b4` (W327-codex-r2-amend, 2026-05-19T15:55:33-04:00); preserved through `2c48b1e` (W327-codex-r3)
- This is **Path-2B step 1 of 5** per W327-D-1 K-1 remediation map

### §2.2 Hooks security-relevant rows STILL WIRED

- ✓ gitleaks PreToolUse on Bash (Control 3) — fires `gitleaks protect --staged --no-banner --redact`
- ✓ trivy fs PreToolUse gated to `git push|git commit|gh pr create` (Control 3 advisory)
- ✓ codex-companion adversarial-review gated to destructive git ops (Control 4 partial)
- ✓ W317-A Δ34 verdict-ledger supersession-chain lint on Edit/Write to `*VERDICT-LEDGER.md|*/verdicts/*` (Control 5 partial)
- ✓ NEW W327: preagent-parallel-guard + preagent-subagent-validator hooks on Agent PreToolUse (K-5 wave-coord partial)
- ✓ ruff + shellcheck PostToolUse on Edit/Write/MultiEdit for .py and .sh files

### §2.3 cardinal-rule R5 R2 R1-spirit observations

- ✓ R1 HOLDS: install primitives from trusted plugins/skills/agents; `enabledPlugins` block compliant
- ◐ R2 HOLD-LITERAL · SPIRIT-QUESTION: `tools/preagent-*.mjs` are project-owned hook bodies OUTSIDE `.claude/hooks/**` path literal scope; W327-r3 commit msg explicitly flags this as W328-A doc question
- ✓ R3 HOLDS: subagents = installed upstream agents + agent-teams plugin
- ✓ R4 HOLDS: behavior in CLAUDE.md + settings.json; `self_invented_count: 0` per W255
- ◐ R5 PARTIAL-HOLD-UPGRADED (W328 finding — main verdict)

---

## §3. What was NOT VERIFIED (Stream A DOC-ONLY scope-limited)

The following must be operator-verified in a live CC session:

1. **deny-rule glob-match semantics** — does `Read(./CLAUDE.local.md)` deny rule fire on absolute-path `Read("Z:/claude-sota-installed/CLAUDE.local.md")`? (Test 1 in W328-A-3)
2. **allowlist match semantics** — does `Edit(Z:/claude-sota-installed/.claude/settings.json)` skip operator-prompt? (Test 2 in W328-A-3)
3. **gitleaks runtime behavior** — does a staged secret actually exit-2 the next Bash call? (Test 3 in W328-A-3)
4. **provenance-lint location + behavior** — is provenance-lint a `.git/hooks/commit-msg` git-side hook, a `.pre-commit-config.yaml` pre-commit-framework hook, or something else? (Test 4 in W328-A-3 SCOPE-LIMITED)
5. **default-prompt flow on common Bash predicates** — does `Bash("git status")` now prompt the operator? (Test 5 in W328-A-3; expected YES given absence of `Bash(git *)` allow)

---

## §4. Gaps vs the W325-C Option C target (5-control layered-defense)

### Per W328-A-4 5-control scorecard

| Control | Score | Gap |
|---|---|---|
| 1 Deny-default permissions | 1.0 / 2 | Patch C1 missing 15 entries (`.codex/`, `.anthropic/`, browser-profiles, registry-hives, sudo, chmod 777, curl http://, wget http://, shorteners) |
| 2 Audit logging | 0 / 2 | NO `.claude/state/audit/<YYYY-MM-DD>.jsonl` dir; no SHA-256 hash chain; no PreToolUse-Bash/Edit/Write/MCP audit-log hook |
| 3 Secret redaction | 1.5 / 2 | gitleaks PreToolUse Bash wired; Edit/Write coverage gap; trivy semantic-location is push-time not edit-time |
| 4 Egress policy | 0.5 / 2 | `permissions.allow.network` absent; WebFetch domain-deny absent (bit.ly etc) |
| 5 Drift detection | 1.0 / 2 | Plugin SHA-pin ✓; CR-9 .mcp.json assumed-✓; capability-registry `.claude/state/capability-registry.json` absent; provenance-lint location unverified |
| **Total** | **4.0 / 10** | 60% of layered-defense unwired |

### Per W328-A-1 settings.json delta vs W325-C Option C spec

| Item | Option C spec | Live state | Status |
|---|---|---|---|
| defaultMode | UNCHANGED at bypassPermissions | flipped to `default` | **ANTI-MATCH** (Option C contradicted) |
| sandbox block | UNCHANGED | UNCHANGED | ✓ MATCH |
| permissions.deny | Patch C1 expansion (32 entries) | 17 entries (W325 baseline) | **GAP** |
| Operator-acceptance-record | required; signed | does NOT exist on disk | **GAP** |
| CLAUDE.md R5-W325-corollary | required pointer line | does NOT exist | **GAP** |
| Control 2 audit-log hook | required wire | not wired | **GAP** |
| Control 5 quarterly drift-audit | required wire | not wired | **GAP** |

### Per W328-A-2 Path-2A vs Path-2B vs Option-A/B/C identification

**Shipped state**: **partial-Path-2B step 1 (defaultMode flip ONLY)** + partial-Option-C-shaped (sandbox unchanged) but missing the Option-C wire-up requirements.

No option/path is fully shipped. The live config is a **non-canonical hybrid** introducing inconsistency:
- defaultMode says "we want canonical Anthropic-default permission flow" (Path 2B / Option A signal)
- sandbox.enabled=false + allowUnsandboxedCommands=true says "we're keeping the Windows-native pragmatic stance" (Path 2A / Option C signal)
- permissions.deny = W325-baseline 17 entries (neither Option C's 32-entry Patch C1 expansion nor Option A's allowlist-heavy posture)

---

## §5. Composite-arch-quality lift

### Per W328-A-5 estimates

- W326 baseline: **4.036** RED ALERT
- W328 estimate (mid): **4.157** YELLOW lower-band
- Range: 4.111 (pessimistic) to 4.286 (optimistic)
- W327-D-1 §11 W328 target: ~4.20 YELLOW — **W328 UNDERSHOOTS the target**

**Lift drivers**:
- K-1 partial (defaultMode flip alone): +0.075 (L1) + +0.075 (L7) = **+0.150** averaged across L1+L7 over 7 layers ≈ +0.043 composite
- K-3 (sca-v11 §5c skip-taxonomy ship): partial +0.100 (L4) ≈ +0.014 composite
- K-4 (sca-v11 §5d D46-D49 ship): partial +0.100 (L5) ≈ +0.014 composite
- K-5 (preagent-* parallel-guards wired): partial +0.075 (L2) ≈ +0.011 composite
- K-7 (ops-rhythm SKILL authored + 8-wave dwell penalty codified): +0.150 (L4) + +0.100 (L7) ≈ +0.036 composite
- **Total**: ~+0.118 composite ≈ +0.121 (matches mid estimate)

**Gap to ship-gate ≥4.5**: 4.5 - 4.157 = **0.343** still needed. Per W327-D-1 §11, this closes in W329+W330 via K-2 (OTel headers, +0.500 layer-specific) + K-6 (signed-audit re-enable + protect-mcp re-enable) + K-1 Path 2A step 5 (Control 2 audit-hook + Control 5 quarterly drift-audit).

### Path γ recommendation (W328-A-2 §7)

If operator chooses to **embrace the hybrid** rather than back-out the defaultMode flip:
1. Author `STREAM-C-OPTION-D-PARTIAL-HYBRID.md` codifying the live state as Option D
2. Apply Patch C1 deny-expansion (15 entries) to preserve sca-v11 §6 Control 1 anchor
3. Sign operator-acceptance-record with adapted falsifiable-inverse claims (FI-1 closed; FI-2 still pending)
4. Wire Control 2 audit-log hook
5. Wire Control 5 capability-registry skeleton + quarterly drift-audit hook
6. Re-run sca-v11 self-eval with Option D codified

**Effort**: 2-wave · **Expected composite-lift**: +0.35 to +0.45 (matches K-1 reclass full target)

---

## §6. R5 ship-blocker dwell-count update

Per ops-rhythm SKILL §1.1 + W295 codex-r12+ dwell counter pattern:

| Wave | R5 SHIP-BLOCKER status |
|---|---|
| W316-S1 | First identified |
| W314-E | Confirmed |
| W316-S4 | Re-confirmed |
| W316-S5-L7 | 7-layer Blueprint confirms L7 below floor |
| W317-S1 | Confirmed; deferred |
| W319-D | Confirmed |
| W324 | sca-v9 §6 5-control layered-defense codified |
| W325-C | 3-option matrix + Option C recommendation; operator-decision-pending |
| W326-D | codex K-1 round-13 CRITICAL flagged Option-C "EQUIVALENT-HOLD" framing |
| W327-D | Reclassification map + Path 2A/2B specs |
| **W328-A** | **PARTIAL-HOLD-UPGRADED** verdict (this synthesis) |

**Dwell-count**: now 11 waves on R5 (W316-S1 → W328-A). **Exceeds 8-wave dwell threshold per ops-rhythm §1.1 + sca-v11 §7 cross-ref.**

Per sca-v11 §7 line 599: "8-wave P0 dwell triggers -0.5 install_score arch-itself penalty per `.claude/skills/ops-rhythm/SKILL.md` §1.1". This penalty applies retroactively to W326 composite **AND** persists through W328 unless the wave reclassifies R5 as `SIGNED-ACCEPTED-RISK` (Path 2A acceptance-record signed) OR closes via Path 2B + WSL2 migration completion.

**Sub-question**: does the defaultMode flip alone constitute closure for ops-rhythm dwell-policy purposes, or does the policy require acceptance-record signing or full sandbox enablement? Per ops-rhythm §1.1: "5-wave dwell: auto-escalate to operator mailbox OR reclassify as `SIGNED-ACCEPTED-RISK` (carries forward but with cardinal-rule-clean status)". The defaultMode flip alone does NOT sign an acceptance-record; therefore the dwell counter **continues to advance** until either: (a) acceptance-record signed, OR (b) full Path 2B + WSL2 migration shipped.

**W328 closure recommendation**: declare R5 status as `PARTIAL-HOLD-UPGRADED + DWELL-EXCEEDED + W329-FOCUS-OR-RECLASSIFY-REQUIRED`. The -0.5 penalty per sca-v11 §7 should be EXPLICITLY recorded in the W328 verdict-ledger row to preserve composite-arithmetic accuracy.

---

## §7. Forward AIs for W328+ (per stream)

### W328 Stream B / C / D follow-ups

1. **AI-W328-B**: Author `STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md` IF operator chooses Path γ (embrace hybrid as Option D) OR back-out defaultMode flip IF operator chooses Path β (clean Option C)
2. **AI-W328-C**: Apply Patch C1 deny-list expansion (15 entries) — closes FI-1 falsifiable-inverse
3. **AI-W328-D**: Author CLAUDE.md R5-W325-corollary pointer line (≤80 chars; fits ≤50 LOC body cap)

### W329 follow-ups (cite W327-D-1 §11 trajectory)

1. **AI-W329-1**: Apply K-2 OTel header env-var fix (60-sec paste-ready per W325-A) — unlocks Langfuse native CC traces; closes K-2 +0.500 lift target
2. **AI-W329-2**: Re-enable `signed-audit-trails@claude-code-workflows` (L257: false → true) — K-6 partial close
3. **AI-W329-3**: Re-enable `protect-mcp@claude-code-workflows` (L256: false → true) — K-6 partial close
4. **AI-W329-4**: Wire Control 2 audit-log PreToolUse hook (CR-2 ≤2KB sanctioned-exception) — closes K-1 Path 2A step 5 + closes FI-2 falsifiable-inverse
5. **AI-W329-5**: Stand up `.claude/state/capability-registry.json` skeleton per W323-4 §4 spec — K-4 partial close

### W330 follow-ups

1. **AI-W330-1**: Wire Control 5 quarterly drift-audit hook + capability-registry verification
2. **AI-W330-2**: sca-v11 final SHIP + codex round-N consensus ratify
3. **AI-W330-3**: Re-project composite-arch-quality; expect ≥4.55 GREEN ship-gate

### W331+ (optional follow-ups)

1. **AI-W331-1**: WSL2 migration scorecard install (K-1 Path 2B prereq) IF operator chooses Path α full Path 2B
2. **AI-W331-2**: Apply remaining Path 2B settings.json deltas (disableBypassPermissionsMode + sandbox.failIfUnavailable + sandbox.allowUnsandboxedCommands=false + remove npx/uvx from excludedCommands) post-WSL2

---

## §8. Cardinal-rule self-check (W328 Stream A close)

| Rule | Status at W328 Stream A close | Evidence |
|---|---|---|
| R1 Install primitives | ✓ HOLD | Plugins + skills + agents; manifest discipline |
| R2 Hooks discipline | ◐ HOLD-LITERAL · SPIRIT-QUESTION queued for W328 doc resolution | `tools/preagent-*.mjs` outside `.claude/hooks/**` path; W327-r3 flagged |
| R3 Subagents | ✓ HOLD | Agent fan-out + agent-teams plugin |
| R4 Project behavior | ✓ HOLD | CLAUDE.md + settings.json discipline; `self_invented_count: 0` |
| R5 Safety boundaries | ◐ **PARTIAL-HOLD-UPGRADED** (W328 finding) | defaultMode flip permissions-layer improvement; sandbox-layer inert; 2 of 5 FI broken; acceptance-record absent; 11-wave dwell |
| `self_invented_count: 0` | ✓ HOLDS | This stream is DOC-ONLY; created 6 docs in `docs/architecture/W328-R5-VERIFY/`; no rules, no hooks, no MCP config, no skill changes |

---

## §9. Deliverable manifest

This stream produces 6 verification documents:

1. `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-1-SETTINGS-JSON-STATE.md` — permissions + sandbox + defaultMode current state (this file's source-of-truth)
2. `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-2-OPTION-MATCH.md` — Option A/B/C + Path 2A/2B identification (verdict: non-canonical hybrid partial-Path-2B step 1)
3. `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-3-SMOKE-TESTS.md` — 5 e2e verification tests (DOC-ONLY procedure + expected outcomes + falsifiers)
4. `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-4-5-CONTROL-COMPLIANCE.md` — sca-v11 §6 5-control compliance scorecard (4.0/10; 2 of 5 FI broken)
5. `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-5-COMPOSITE-LIFT-ESTIMATE.md` — composite projection 4.036→4.157 mid; layer-by-layer breakdown
6. `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/STREAM-A-SYNTHESIS.md` — this file

**Total verification depth**: 5 axes × 5-15 line-cited references per axis ≈ 60-75 cite-anchors across all 6 docs.

---

## §10. Cite-anchors (consolidated)

### Internal
- `.claude/settings.json` HEAD `2c48b1e` lines 57-94 (permissions), 106-150 (hooks), 225-294 (enabledPlugins), 429-435 (sandbox)
- `.claude/skills/sota-convergence-audit/SKILL.md:521-545` (sca-v11 §6 5-Control Layered-Defense)
- `.claude/skills/sota-convergence-audit/SKILL.md:381-427` (sca-v11 §5c skip-N/A taxonomy)
- `.claude/skills/sota-convergence-audit/SKILL.md:599` (sca-v11 §7 ops-rhythm cross-reference for 8-wave dwell -0.5 penalty)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-A-FULL-SANDBOX.md` (Option A)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-B-HYBRID.md` (Option B)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:35-91` (Option C Patch C1 + sandbox UNCHANGED + defaultMode UNCHANGED specs)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:25` (Option C weighted score 4.75)
- `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:84-92` (FI-1 through FI-5 falsifiable-inverse spec)
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:14-22` (W326 7-layer baseline)
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:42-72` (K-1 Path 2A vs 2B specs + composite-lift estimates)
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md:459-466` (§11 W328-W330 projection table)
- CLAUDE.md (project root) cardinal-rule R1-R5 statements + W259-v15 runtime state pointers
- `git show 2c48b1e --format=%B` (W327-r3 commit body — overclaim language verbatim)
- `git show 6b4b0b4 --format=%B` (W327-r2-amend commit body — does NOT mention defaultMode)
- `git diff 569080a 2c48b1e -- .claude/settings.json` (the defaultMode flip diff)

### External (Anthropic-canonical)
- `https://code.claude.com/docs/en/sandboxing` (Windows-native NOT in supported OS list)
- `https://code.claude.com/docs/en/settings` (permissions + sandbox + defaultMode schema)
- `https://docs.anthropic.com/en/docs/claude-code/hooks` (hook semantics)
- `https://docs.anthropic.com/en/docs/claude-code/settings` (permissions + sandbox spec)
- `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (model-precedence for R3)

### External (sca-v11 §6 cite-anchors per Control 1-5)
- NIST 800-53 AC-3(3) Mandatory Access Control · AU-2 Event Logging · SC-7 Boundary Protection · SC-28 Protection of Info at Rest · CM-8 Component Inventory
- OWASP A01-2021 Broken Access Control · A02-2021 Cryptographic Failures · A06-2021 Vulnerable Components · A09-2021 Logging Failures · A10-2021 SSRF
- Microsoft Zero-Trust (deny-default doctrine) · CIS Critical Security Controls v8.1 · CNCF NetworkPolicy spec · SLSA v1.0 Build L3 Pinned Inputs
- gitleaks (zricethezav) community-governance
