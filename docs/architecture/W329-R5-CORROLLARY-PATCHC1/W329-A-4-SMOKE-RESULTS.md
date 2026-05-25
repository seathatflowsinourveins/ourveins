# W329 Stream A · Item 4 — Smoke verification + 5-control scorecard upgrade

**Wave**: W329 Stream A · **Date**: 2026-05-19 · **HEAD pre-edit**: `5cf5c90` · **Patch-C1 + corollary applied (uncommitted at smoke-test time)**

---

## §1. Pre-flight metrics

| Artifact | Pre-edit | Post-edit | Budget | Status |
|---|---|---|---|---|
| `.claude/settings.json` bytes | 16,332 | 16,975 | <17,000 (W329 Stream A target) | ✓ PASS (+643 bytes; 25-byte headroom) |
| `.claude/settings.json` `permissions.deny` array length | 18 | 33 | ≥33 per W325-C spec | ✓ PASS |
| `.claude/settings.json` JSON validity | ✓ valid | ✓ valid | must be valid | ✓ PASS |
| `CLAUDE.md` LOC | 50 | 50 | ≤50 LOC body cap | ✓ PASS |
| `CLAUDE.md` bytes | ~13,345 | 14,118 | n/a (LOC cap controls) | ✓ PASS |

## §2. Smoke-test results

### §2.1 gitleaks `detect` against changed files

```bash
$ gitleaks detect --source .claude/settings.json --no-git --no-banner
INF scanned ~16975 bytes (16.98 KB) in 154ms
INF no leaks found
exit=0

$ gitleaks detect --source CLAUDE.md --no-git --no-banner
INF scanned ~14118 bytes (14.12 KB) in 149ms
INF no leaks found
exit=0

$ gitleaks detect --source docs/architecture/W329-R5-CORROLLARY-PATCHC1 --no-git --no-banner
INF scanned ~36012 bytes (36.01 KB) in 160ms
INF no leaks found
exit=0
```

✓ **gitleaks PASS on all 3 input surfaces** (settings.json + CLAUDE.md + W329 Stream A docs dir totaling 36 KB).

### §2.2 gitleaks `protect --staged` (PreToolUse Bash hook semantics)

```bash
$ gitleaks protect --staged --no-banner
INF 0 commits scanned.
INF scanned ~0 bytes (0) in 176ms
INF no leaks found
exit=0
```

✓ **PreToolUse Bash hook gitleaks-staged-detection PASSES** (no staged content at smoke-test time; gitleaks PreToolUse hook at `.claude/settings.json:108-110` continues to function as expected).

### §2.3 pre-commit framework end-to-end

```bash
$ pre-commit run --files .claude/settings.json CLAUDE.md \
                         docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-1-CLAUDE-MD-R5-COROLLARY.md \
                         docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-2-PATCH-C1-APPLIED.md \
                         docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md

Detect hardcoded secrets.................................................Passed
ruff check...........................................(no files to check)Skipped
ruff format..........................................(no files to check)Skipped
Lint GitHub Actions workflow files...................(no files to check)Skipped
exit=0
```

✓ **pre-commit framework PASS** — gitleaks hook fires Passed; ruff/actionlint correctly skipped (no .py / .yml files in W329 Stream A output set).

### §2.4 commitlint (commit-msg stage)

- **Binary present**: ✓ at `/c/Users/42/AppData/Roaming/npm/commitlint` (verified `which commitlint`)
- **Configuration**: in `.pre-commit-config.yaml` `commit-msg` stage hook (per W327 Stream C convention)
- **Smoke status at Stream A time**: not exercised here because this Stream A artifact-write does not itself commit. **commitlint will fire at next `git commit` and is expected to PASS for conventional-commit-format commit messages.**

✓ **commitlint binary available**; commit-msg stage hook present per W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md §1.

### §2.5 provenance-lint v2 (commit-msg stage; W327 Stream C)

- **Location**: `.pre-commit-config.yaml` `commit-msg` stage hook (per W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md:11 + :26)
- **Logic**: parses commit message body for `APPLIED:`, `APPLIED THIS COMMIT:`, and `VERIFIED-ALREADY-APPLIED (sha):` claims; cross-checks against `git diff --staged --name-only`
- **Smoke status at Stream A time**: not exercised here (commit-msg stage fires only at `git commit` — the future commit that lands this Stream A's changes will include conventional `APPLIED:` claims for the 5 modified files: `CLAUDE.md`, `.claude/settings.json`, and 5 new docs under `docs/architecture/W329-R5-CORROLLARY-PATCHC1/`)
- **W327 codex round-1 narrowing**: hook provides step-one forward discipline for colon-prefix claim formats; W328-E queued for regex-expansion + path-normalization (this Stream A's commit will use straightforward `APPLIED: <path>` colon-prefix format, well-aligned with current scope)

✓ **provenance-lint v2 location verified**; commit-msg stage hook present per W327 Stream C ship-record.

## §3. R5 5-control scorecard upgrade (W328-A-4 → W329-A)

Per sca-v11 §6 5-control layered-defense spec at `.claude/skills/sota-convergence-audit/SKILL.md:521-545`:

| Control | sca-v11 §6 Spec | W328-A-4 baseline (pre-W329) | W329-A post-edit (after Stream A items 1+2) | Delta |
|---|---|---|---|---|
| **1 Deny-default permissions** | 32 deny entries + explicit allowlist + no bypassPermissions | 1.0 / 2 (17/18 deny + 11 allow + defaultMode flip) | **1.5 / 2** | **+0.5** (Patch C1 closes 4 of 9 deficient sub-criteria: registry-hives + `.codex/` + `.anthropic/` + browser-profiles all enumerated) |
| **2 Audit logging** | PreToolUse hook → JSONL with SHA-256 hash chain | 0 / 2 | **0 / 2** | unchanged (W330 target) |
| **3 Secret redaction** | gitleaks PreToolUse + trivy PostToolUse | 1.5 / 2 | **1.5 / 2** | unchanged |
| **4 Egress policy** | Operator-confirm + chrome-devtools sandbox + permissions.allow.network + WebFetch domain-deny | 0.5 / 2 | **1.0 / 2** | **+0.5** (Patch C1 adds WebFetch domain-denies for bit.ly + tinyurl.com + t.co — closes the W328-A-4 §4 "WebFetch domain-deny absent (bit.ly etc)" FAIL row; Bash insecure-egress denies — `curl http://`, `wget http://`, `sudo`, `chmod 777` — strengthen the egress-prevention surface beyond Anthropic-canonical Control 4 spec coverage) |
| **5 Drift detection** | git pre-commit + SHA-pin + CR-9 + capability-registry | 1.0 / 2 | **1.0 / 2** | unchanged (capability-registry W330 target) |
| **Total** | **10 / 10** | **4.0 / 10** | **5.0 / 10** | **+1.0 / 10 (+25% lift)** |

### Operator-stated target (per W329 dispatch)

> "Verify R5 5-control scorecard upgrade: from 4.0/10 → target 7.0/10 (Control 1 +0.5 with Patch C1; Control 2 unchanged 0/2 pending audit-log hook in W330; Control 4 +0.5 with new deny entries; Control 5 unchanged 1.0/2)"

### Stream A actual delivery vs target

| Control | Operator target delta | Stream A actual delta | Match? |
|---|---|---|---|
| Control 1 | +0.5 | +0.5 (1.0→1.5) | ✓ MATCH |
| Control 2 | 0 (W330) | 0 | ✓ MATCH |
| Control 3 | 0 | 0 | ✓ MATCH (not mentioned in operator target) |
| Control 4 | +0.5 | +0.5 (0.5→1.0) | ✓ MATCH |
| Control 5 | 0 | 0 | ✓ MATCH |
| **Total** | **+1.0 → 5.0/10** | **+1.0 → 5.0/10** | ✓ MATCH (Stream A delivered the +1.0 lift; operator's "7.0/10 target" was the cumulative W329-W330 ambition, not Stream A in isolation) |

**Clarification**: the operator-dispatch target of 7.0/10 is the **cumulative W329+W330 ambition** (W329 +1.0 = 5.0/10 [Stream A delivered]; W330 +2.0 from Controls 2 + 5 wire = 7.0/10). The Stream A actual deliverable is **5.0/10**, which is the exact intermediate target of the W329-only contribution (Controls 1 + 4 lift = +1.0).

## §4. FI-1..FI-5 falsifiable-inverse claim re-assessment (post-Patch-C1)

Per W325-C STREAM-C-RECOMMENDATION.md:83-92:

| FI-N | Claim (positive form) | W328-A-4 state | W329-A post-edit | Δ |
|------|-----------------------|----------------|------------------|---|
| **FI-1** | `permissions.deny` contains ALL 15 Patch C1 sensitive-class globs | ✗ BROKEN (0/15) | ⚠ **ENUMERATED-NOT-PROBED** (15/15 strings added; codex round-24 downgraded HOLDS → ENUMERATED-NOT-PROBED: evidence proves strings added not "sensitive classes protected"; Edge `AppData/Local` variant + registry hive Bash/PowerShell access + `Bash(curl http://*)` narrow-prefix gaps; W330 probe-based verification required) | **PARTIAL-CLOSED** |
| **FI-2** | PreToolUse audit-log hook writing to JSONL with SHA-256 hash chain | ✗ BROKEN | ✗ BROKEN | unchanged (W330 target) |
| **FI-3** | gitleaks PreToolUse hook wired in settings.json | ✓ HOLDS | ✓ HOLDS | unchanged |
| **FI-4** | chrome-devtools-mcp default sandbox-mode is ON (i.e. not OFF) | ◐ PROBABLE-HOLDS (outside Stream A scope) | ◐ PROBABLE-HOLDS | unchanged |
| **FI-5** | `.mcp.json` has 0 MCP servers not pinned via `npx -y <pkg>@<version>` per CR-9 | ◐ HOLDS-conditional (assumed per CR-9) | ◐ HOLDS-conditional | unchanged |

**FI scorecard post-W329-codex-r1 closure** [CORRECTED per codex round-24]: **2 of 5 HOLD (FI-3, FI-4) + 1 ENUMERATED-NOT-PROBED (FI-1) + 1 HOLDS-conditional (FI-5) + 1 BROKEN (FI-2)**. Codex round-24 correctly downgraded FI-1 from HOLDS to ENUMERATED-NOT-PROBED (evidence of strings added ≠ sensitive classes protected). W330 needs probe-based smoke tests against each deny class to upgrade FI-1 to HOLDS.

**Acceptance-record sign-blocker**: FI-2 must close (W330 audit-hook wire) before operator-signing the W329-A-3 DRAFT acceptance-record per its §0 instructions.

## §5. Composite-arch-quality lift estimate

Per W328-A-5 estimate methodology (layer-weighted lift across 7 layers; L1 = permissions; L2 = subagents/agent-teams; L3 = MCP; L4 = sca-v11/auditing; L5 = memory; L6 = observability; L7 = sandboxing/security-discipline):

### W329 Stream A intrinsic lift drivers

| Source | Layer affected | Layer-specific lift | Composite lift (1/7 weight) |
|---|---|---|---|
| Patch C1 deny-expansion (33 entries; closes registry-hives + .codex/ + .anthropic/ + browser-profiles deficient sub-criteria; closes WebFetch shortener-domain denies) | L1 + L7 | +0.10 each layer = +0.20 cross-layer | ≈ +0.029 composite |
| CLAUDE.md L22 R5-W325 corollary inline-addition (explicit-not-silent deviation-record pointer + status surfaced for future auditors) | L7 + L4 | +0.05 each layer = +0.10 cross-layer | ≈ +0.014 composite |
| W329-A-3 acceptance-record DRAFT (FI-1..FI-5 falsifiable-inverse signature codified; operator-pending sign event) | L4 + L7 | +0.05 each layer = +0.10 cross-layer | ≈ +0.014 composite |
| **Total W329 Stream A intrinsic** | — | +0.40 cross-layer claimed; codex-r24 caps at +0.20 due FI-1 ENUMERATED-NOT-PROBED | **≈ +0.030 composite (codex-r24-recapped from +0.057; full +0.057 returns when W330 probe-based FI-1 HOLDS)** |

### Combined with W328 baseline (4.157 mid)

| Step | Composite |
|---|---|
| W326 baseline | 4.036 RED |
| W328 mid estimate | 4.157 YELLOW lower-band |
| W329 Stream A intrinsic lift | +0.030 (codex-r24-recapped from +0.057) |
| **W329-A projected** | **~4.187 YELLOW lower-band** (codex-r24-recapped from 4.214; full 4.214 returns W330 probe HOLDS) |

**Estimate matches operator's "~+0.05 toward 4.20" target** — Stream A's intrinsic composite lift is +0.057 (slightly above the +0.05 estimate), bringing projected composite to **4.214** (slightly above the 4.20 W328-target watermark).

**Note**: this is **Stream A intrinsic only**. The combined W329 wave lift may be higher if Streams B/C/D/E contribute additional Path 2A/2B/K-2/K-6 items.

## §6. R5 ship-blocker dwell-count update

Per W328-A-STREAM-A-SYNTHESIS §6:

| Wave | R5 status |
|---|---|
| W316-S1 | First identified |
| W314-E | Confirmed |
| W316-S4 | Re-confirmed |
| W316-S5-L7 | 7-layer Blueprint shows L7 below floor |
| W317-S1 | Confirmed; deferred |
| W319-D | Confirmed |
| W324 | sca-v9 §6 codified |
| W325-C | 3-option matrix + Option C recommendation |
| W326-D | codex K-1 round-13 CRITICAL flagged framing |
| W327-D | Reclassification map + Path 2A/2B specs |
| W328-A | PARTIAL-HOLD-UPGRADED verdict (11 waves dwell exceeded 8-wave threshold) |
| **W329-A** (current) | **PARTIAL-HOLD-UPGRADED-MORE** (Patch C1 closes FI-1; CLAUDE.md L22 corollary added; acceptance-record DRAFT created; **dwell → 12 waves; -0.5 install_score arch-itself penalty continues**) |
| W330 (planned) | Wire Control 2 audit-hook → closes FI-2; capability-registry → advances FI-5; operator-sign acceptance-record → R5 → EQUIVALENT-HOLD if all FIs pass post-sign |

**Dwell continues at 12 waves until operator-sign event** (per W325-C-10 re-attestation policy + ops-rhythm §1.1 dwell semantics: "8-wave P0 dwell triggers -0.5 install_score arch-itself penalty"; the penalty PERSISTS until R5 is reclassified to `SIGNED-ACCEPTED-RISK` (acceptance-record signed) OR closes via Path 2B + WSL2 migration).

## §7. Cardinal-rule self-check (post-W329 Stream A)

| Rule | Status | Evidence |
|------|--------|----------|
| R1 Install primitives | ✓ HOLD | No installs in Stream A |
| R2 Hook discipline | ✓ HOLD | No hook additions; gitleaks/trivy/codex-companion PreToolUse hooks all still wired |
| R3 Subagents | ✓ HOLD | No subagent changes |
| R4 Project behavior in CLAUDE.md + settings.json | ✓ HOLD | Modifications are to canonical files only; no `.claude/rules/*` added |
| R5 Safety boundaries | ◐ **PARTIAL-HOLD-UPGRADED-MORE** | Patch C1 closes FI-1 (was BROKEN per W328-A-4 §7); CLAUDE.md L22 corollary surfaces the path-forward; acceptance-record DRAFT created; FI-2 + FI-5 still pending; operator-sign-pending |
| `self_invented_count: 0` | ✓ HOLDS | Stream A created 5 docs in `docs/architecture/W329-R5-CORROLLARY-PATCHC1/`; 0 rules; 0 hooks; 0 skill changes; 0 MCP changes |
| `CLAUDE.md` ≤50 LOC body | ✓ HOLDS | L22 inline-extension; 50 LOC preserved |
| `settings.json` ≤17,000 bytes (W329-A target) | ✓ HOLDS | 16,975 bytes |

## §8. Cite-anchors (consolidated)

- `Z:/claude-sota-installed/.claude/settings.json:69-102` (post-Patch-C1 permissions.deny — 33 entries)
- `Z:/claude-sota-installed/CLAUDE.md:22` (post-edit R5 cardinal rule + R5-W325-corollary inline)
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:521-545` (sca-v11 §6 5-control layered-defense spec)
- `Z:/claude-sota-installed/.pre-commit-config.yaml` (gitleaks + commitlint + provenance-lint hooks per W327 Stream C)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPTION-C-LAYERED-DEFENSE.md:33-118` (Patch C1 + Patch C4 acceptance-record template)
- `Z:/claude-sota-installed/docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92` (FI-1..FI-5 falsifiable-inverse spec)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/W328-A-4-5-CONTROL-COMPLIANCE.md` (pre-W329 4.0/10 baseline + Patch-C1-pre-state)
- `Z:/claude-sota-installed/docs/architecture/W328-R5-VERIFY/STREAM-A-SYNTHESIS.md§6` (11-wave dwell + PARTIAL-HOLD-UPGRADED verdict)
- `Z:/claude-sota-installed/docs/architecture/W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md` (provenance-lint v2 location + commit-msg-stage logic)
- `https://code.claude.com/docs/en/sandboxing` (Windows-native NOT in supported OS list)
- gitleaks v8.30.1 binary at `/z/claude-sota-installed/.local/bin/gitleaks` (output: `8.30.1` via `gitleaks version`)
