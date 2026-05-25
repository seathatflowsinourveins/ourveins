# W327 Stream C — Apply Decision + Final State

> **Wave**: W327 Stream C
> **Date**: 2026-05-19
> **Status**: **APPLIED to `.pre-commit-config.yaml`** (Option C)
> **HEAD baseline**: `569080a` (pre-W327-C)

## Decision

**Option C** (`.pre-commit-config.yaml` local `provenance-lint` hook at `commit-msg` stage) was selected per W327-C-3 recommendation, smoke-verified per W327-C-4 (6/6 test cases PASS against real git history + 5/5 outcomes through real pre-commit framework), and APPLIED to the tracked file.

### Why NOT Option A (settings.json PreToolUse:Bash inline)

- Settings.json was at 15,998 bytes (W326 Stream A F1 final). Adding the full APPLIED + VERIFIED-ALREADY-APPLIED + SHA-verify body inline (~900B compressed) would push to ~16,900B, exceeding the W317-A 15,360B cap by ~1,540B.
- An APPLIED-only 500B inline lint would catch the W326 race-pattern but NOT support the VERIFIED-ALREADY-APPLIED recovery form (the actual correct fix for multi-session race acknowledgments).
- Option C delivers full feature without size pressure.

### Why NOT Option B (.claude/hooks/*.mjs shim)

- CR-2 exception path requires cite-anchored anthropics/claude-code GitHub issue. None exists for provenance-lint workflow gate.
- Provenance-lint is project-workflow discipline, NOT a Claude Code upstream bug-patch.
- Adding a project-owned hook body under `.claude/hooks/**` would violate cardinal rule 2.

## Exact Diff Applied

```diff
--- a/.pre-commit-config.yaml
+++ b/.pre-commit-config.yaml
@@ -64,3 +64,21 @@
         language: system
         stages: [commit-msg]
         always_run: true
         pass_filenames: false
+
+      # W327-C — provenance lint (multi-session race detector, commit-msg stage)
+      # Cite anchors (3-org-distinct, EXTERNAL-DOMINANT):
+      #   1. Conventional Commits 1.0.0 (community spec) — body-line claim surface
+      #   2. SLSA v1.0 build-provenance (Linux Foundation OpenSSF WG) — attestation-pre-merge pattern
+      #   3. GitHub commit-signature verification (GitHub Inc.) — structural + identity binding model
+      # Internal precedent (non-gate): W317-A Δ34 supersession-chain lint @ PreToolUse[Edit|Write]
+      #   (docs/architecture/W317-RUBRIC-AND-LINT/W317-A-SHIP-LOG.md:12-46).
+      # Motivation: W320-codex-r1 (settings.json M6) + W326-codex-r1 (SKILL.md §7) parallel-session
+      #   race occurrences where ship-message falsely claimed APPLIED for changes landed in parallel
+      #   commits (8e43c24 + e1a7ec6 respectively). See W327-PROVENANCE-LINT/ for full design.
+      # Smoke-verified: 6/6 test vectors PASS against real git history (W327-C-4 + W327-C-5).
+      - id: provenance-lint
+        name: provenance-lint (W327-C)
+        entry: "bash -c 'msg=$(cat .git/COMMIT_EDITMSG); ... [full body, see file]'"
+        language: system
+        stages: [commit-msg]
+        always_run: true
+        pass_filenames: false
```

(Full `entry:` value is a single-line YAML double-quoted scalar; see actual `.pre-commit-config.yaml` for verbatim text.)

## Smoke Verification Results

### Phase 1 — Direct bash invocation against real git history

All 6 test vectors from W327-C-4 PASS against the lint body executed via direct bash invocation:

| Test | Description | Expected | Actual |
|---|---|---|---|
| 1 | accurate APPLIED | exit 0 | exit 0 |
| 2 | false APPLIED (W326 race replay) | exit 2 + diagnostic | exit 2 + "APPLIED claim for ... but file not staged" |
| 3 | VERIFIED valid SHA (e1a7ec6) | exit 0 | exit 0 |
| 4 | VERIFIED invalid SHA (deadbee) | exit 2 + diagnostic | exit 2 + "VERIFIED SHA deadbee invalid" |
| 5 | no claims | exit 0 | exit 0 |
| 6 | VERIFIED valid SHA + wrong file | exit 2 + diagnostic | exit 2 + "SHA ... did not touch ..." |

### Phase 2 — End-to-end via real pre-commit framework

`pre-commit run --hook-stage commit-msg provenance-lint --commit-msg-filename .git/COMMIT_EDITMSG` invoked for 5 scenarios after staging `.pre-commit-config.yaml`. All 5 outcomes match expected:

| Scenario | Commit message body | pre-commit verdict |
|---|---|---|
| A | (no provenance claims) | Passed |
| B | APPLIED .pre-commit-config.yaml (file is staged) | Passed |
| C | APPLIED .claude/skills/.../SKILL.md (NOT staged) | Failed — exit 2 + diagnostic |
| D | VERIFIED-ALREADY-APPLIED (e1a7ec6): .../SKILL.md | Passed |
| E | VERIFIED-ALREADY-APPLIED (deadbee): some/file.md | Failed — exit 2 + diagnostic |

### Phase 3 — YAML schema validation

`pre-commit validate-config .pre-commit-config.yaml` → exit 0 (clean parse, schema-conformant).
`python -c "import yaml; yaml.safe_load(open('.pre-commit-config.yaml'))"` → parses without exception; 6 total hooks visible after add (was 5).

## Cardinal-Rule Compliance Audit Post-Apply

| Rule | Compliance state |
|---|---|
| **R1** Plugins/skills from trusted sources | HOLDS — no new plugin install; pre-commit framework + commitlint + gitleaks were already wired |
| **R2** Hooks = upstream-plugin OR direct-CLI | HOLDS — entry uses direct-CLI inline-bash (`bash`, `cat`, `git`, `grep`, `sed`, `printf`); no `.claude/hooks/*` body added |
| **R3** Subagents = upstream | HOLDS — no subagent invocation |
| **R4** Project behavior in CLAUDE.md + settings.json (+ pre-commit framework) | HOLDS — `.pre-commit-config.yaml` is canonical pre-commit framework file (NOT `.claude/rules/*`) |
| **R5** Safety via CC permissions + exit-2 gating | HOLDS — lint exits 2 on BLOCK; no destructive ops; no `git revert` or `--no-verify` bypass |

`self_invented_count: 0` invariant: HOLDS — no new `.claude/rules/*.md` and no new `.claude/hooks/*.py|*.sh|*.mjs` files. Only modification is to `.pre-commit-config.yaml` (tracked, conventional, framework-canonical file).

## Files Changed

| File | Change | Bytes pre → post |
|---|---|---|
| `.pre-commit-config.yaml` | +18 lines (W327-C provenance-lint hook) | 2,574 → ~3,400 (+~826) |
| `docs/architecture/W327-PROVENANCE-LINT/W327-C-1-DESIGN-SPEC.md` | NEW | 0 → ~5.2KB |
| `docs/architecture/W327-PROVENANCE-LINT/W327-C-2-EXTERNAL-ANCHORS.md` | NEW | 0 → ~5.0KB |
| `docs/architecture/W327-PROVENANCE-LINT/W327-C-3-IMPLEMENTATION-OPTIONS.md` | NEW | 0 → ~6.8KB |
| `docs/architecture/W327-PROVENANCE-LINT/W327-C-4-TEST-PLAN.md` | NEW | 0 → ~5.8KB |
| `docs/architecture/W327-PROVENANCE-LINT/W327-C-5-APPLIED-OR-DOC-ONLY.md` | NEW (this file) | 0 → ~6.0KB |
| `docs/architecture/W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md` | NEW | 0 → ~3.5KB |

Settings.json: **UNCHANGED** (Option C avoids cap pressure).

## Operator Notes Post-Apply

1. **Lint fires on every `git commit`**, regardless of whether commit is CC-driven (via Bash tool) or operator-direct CLI. This is intentional — defense-in-depth.
2. **Bypass via `git commit --no-verify`** is theoretically possible but is BLOCKED by the already-enabled `block-no-verify@claude-code-workflows` plugin (settings.json:257). Two layers must be disabled to bypass.
3. **Operator escape hatch for false-positive cases**: rewrite the commit message to either (a) remove the spurious APPLIED claim, or (b) replace with VERIFIED-ALREADY-APPLIED (sha): path form if the change landed in a parallel-session commit.
4. **Future hardening (W328+ candidate)**: extend lint to require an APPLIED-or-VERIFIED line for every staged file in commits matching `^ship\(W\d+\):` subject pattern. Currently lint is permissive (no requirement to make APPLIED claims at all). This would move from "false-claim detection" to "completeness audit". DEFERRED — premature without operator-confirmation of value.

## Forward to W327 Closure

This Stream C deliverable is ready for inclusion in W327 ship-gate synthesis. Ledger row will record:

- Lint applied: `.pre-commit-config.yaml` provenance-lint hook at commit-msg stage
- 6/6 direct test vectors PASS
- 5/5 framework end-to-end outcomes match expected
- Race-pattern coverage [NARROWED per W327 codex round-1]: hook covers `APPLIED:` colon-prefix claim formats going forward; W320-codex-r1 (no-colon `APPLIED settings.json:154`) + W326-codex-r1 (path-prefix mismatch `APPLIED: settings.json:206` vs `.claude/settings.json`) historical motivating races would NOT have been blocked as-shipped; W328-E queued for regex-expansion + path-normalization
- 3-org-distinct cite anchors: Conventional Commits + SLSA v1.0 + GitHub commit-signature verification (all EXTERNAL-DOMINANT per W326-D-3 anti-bias gate)
- Cardinal-rule R1-R5 preserved post-apply

No commit performed by Stream C (per coordinator's strict file-ownership scope). W327 synthesis agent (Stream A/Closure) will pick up the file diff for the W327 ship commit.
