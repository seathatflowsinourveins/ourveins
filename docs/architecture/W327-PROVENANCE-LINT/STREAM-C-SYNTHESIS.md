# W327 Stream C — Synthesis

> **Wave**: W327 Stream C
> **Date**: 2026-05-19
> **HEAD baseline**: `569080a`
> **Scope**: codify multi-session race detection via pre-commit "git provenance lint" (W327 P0 #11)
> **Verdict**: **SHIPPED** — Option C applied + 6/6 direct + 5/5 framework smoke PASS

## TL;DR

A `provenance-lint` hook was added to `.pre-commit-config.yaml` at the `commit-msg` stage. It parses commit message body for `APPLIED:`, `APPLIED THIS COMMIT:`, and `VERIFIED-ALREADY-APPLIED (sha):` claims and cross-checks them against `git diff --staged --name-only`. Mismatched claims BLOCK the commit (exit 2) with a diagnostic message naming the offending claim. [NARROWED per W327 codex round-1]: hook provides STEP-ONE forward discipline for colon-prefix claim formats; W320 (no-colon `APPLIED settings.json:154`) + W326 (path-prefix mismatch `APPLIED: settings.json:206` vs `.claude/settings.json`) historical motivating races would NOT have been blocked as-shipped. W328-E queued for regex-expansion + path-normalization to cover historical claim variants + real-history replay test cases.

## Stream-C Deliverables (6 files under `docs/architecture/W327-PROVENANCE-LINT/`)

| File | Role |
|---|---|
| `W327-C-1-DESIGN-SPEC.md` | Lint logic, claim taxonomy, parser regex, false-positive analysis |
| `W327-C-2-EXTERNAL-ANCHORS.md` | 3-org-distinct cite anchors (Conventional Commits + SLSA v1.0 + GitHub commit-signature verification) |
| `W327-C-3-IMPLEMENTATION-OPTIONS.md` | A/B/C trade-off matrix; Option C recommended |
| `W327-C-4-TEST-PLAN.md` | 6 test vectors + expected outcomes + operator escape-hatch |
| `W327-C-5-APPLIED-OR-DOC-ONLY.md` | Apply decision, diff, smoke results, cardinal-rule audit |
| `STREAM-C-SYNTHESIS.md` | This file — operator-facing top-level summary |

## What Got Applied (single file change)

**`.pre-commit-config.yaml`** — new `provenance-lint` hook added under existing `repos: - repo: local` section, alongside `commitlint`. Stage = `commit-msg`. Always-run = true. Pass-filenames = false.

Hook entry is a single-line `bash -c '...'` body using direct-CLI tools (`cat`, `git`, `grep`, `sed`, `printf`) — fully CR-2-compliant (no project-owned hook script body, no `.claude/hooks/*` addition).

YAML validates clean (`pre-commit validate-config` exit 0). Pre-commit framework executes the hook (smoke-tested with real `pre-commit run --hook-stage commit-msg`). 5/5 end-to-end scenarios match expected outcomes.

## Race-Pattern Coverage

The two known occurrences from CLAUDE.md + git log:

1. **W320-codex-r1**: settings.json M6 PreCompact + PWF flip falsely claimed APPLIED; actually landed in parallel-session W324 commit `8e43c24`. [NARROWED per W327 codex round-1]: hook AS-SHIPPED would NOT detect — W320 used `APPLIED settings.json:154` (no colon-prefix); regex needs no-colon-variant expansion in W328-E.
2. **W326-codex-r1**: SKILL.md §7 math fix falsely claimed APPLIED; actually landed in parallel-session W325 commit `e1a7ec6`. [NARROWED per W327 codex round-1]: hook AS-SHIPPED would NOT detect — W326 used `APPLIED: settings.json:206` (path-prefix mismatch vs `.claude/settings.json` staged path); regex needs path-normalization in W328-E.

Recovery form for legitimate post-race acknowledgments: `VERIFIED-ALREADY-APPLIED (e1a7ec6): .claude/skills/sota-convergence-audit/SKILL.md`. Lint verifies (a) the SHA resolves to a commit, and (b) the commit's diff actually touched the cited file.

## Cite Anchors (3-org-distinct, all EXTERNAL-DOMINANT)

Per W326-D-3 anti-bias gate. Internal precedents (W317-A Δ34 lint) are referenced as pattern-templates but NOT counted toward the 3-anchor invariant.

1. **Conventional Commits 1.0.0** (community open spec, LF-adjacent) — body-line claim surface. https://www.conventionalcommits.org/en/v1.0.0/
2. **SLSA v1.0 build-provenance** (Linux Foundation OpenSSF SLSA WG) — attestation-pre-merge pattern. https://slsa.dev/spec/v1.0/provenance
3. **GitHub commit-signature verification** (GitHub Inc.) — structural binding model. https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification

Org-distinctness verified per W327-C-2 §"Org-distinctness verification" table — community spec / Linux Foundation WG / GitHub Inc. are 3 disjoint authoring orgs.

## Cardinal-Rule Compliance Snapshot

| Rule | State |
|---|---|
| R1 trusted-source primitives | HOLDS (no new install) |
| R2 hooks = direct-CLI inline | HOLDS (bash -c with cat/git/grep/sed/printf; NO `.claude/hooks/*` body) |
| R3 subagents = upstream | HOLDS (no subagent) |
| R4 behavior in CLAUDE.md + settings.json | HOLDS (`.pre-commit-config.yaml` is conventional framework file, NOT `.claude/rules/*`) |
| R5 safety via CC perms + exit-2 | HOLDS (lint exits 2 on BLOCK; no destructive ops) |
| self_invented_count: 0 | HOLDS (no new `.claude/rules/*` or `.claude/hooks/*`) |

## Settings.json Impact

**ZERO**. Option C deliberately routes through `.pre-commit-config.yaml` to avoid the settings.json 15,360B cap pressure that Option A would have triggered. Settings.json remains at W326 Stream A F1 baseline = 15,998B (no W327-C diff).

## Test Coverage

- **6/6 direct invocation tests** PASS (W327-C-4 §"Test Cases" 1-6; verified via `bash /tmp/lint-test2.sh`).
- **5/5 framework end-to-end tests** PASS (W327-C-5 §"Phase 2"; verified via `pre-commit run --hook-stage commit-msg provenance-lint --commit-msg-filename ...`).
- **YAML schema validation** PASS (`pre-commit validate-config` exit 0).
- **Real git history replay**: e1a7ec6 + 8e43c24 SHA verification confirms VERIFIED-ALREADY-APPLIED claims against real parallel-session landing commits would have correctly passed.

## Forward Work (queued for W328+ if operator confirms)

- Optional completeness audit: require ALL staged files to be covered by an APPLIED or VERIFIED-ALREADY-APPLIED line in commits matching `^ship\(W\d+\):`. DEFERRED — premature without operator-confirmation of value.
- W327 Stream A/Closure synthesis agent picks up the file diff for the W327 ship commit.

## Time-to-Ship

Dispatched ~35 min; delivered all 6 files + smoke-verified Option C apply within budget.

## File-Ownership Boundary (parallel-session safety)

This stream wrote ONLY to:
- `docs/architecture/W327-PROVENANCE-LINT/W327-C-1-DESIGN-SPEC.md` (NEW)
- `docs/architecture/W327-PROVENANCE-LINT/W327-C-2-EXTERNAL-ANCHORS.md` (NEW)
- `docs/architecture/W327-PROVENANCE-LINT/W327-C-3-IMPLEMENTATION-OPTIONS.md` (NEW)
- `docs/architecture/W327-PROVENANCE-LINT/W327-C-4-TEST-PLAN.md` (NEW)
- `docs/architecture/W327-PROVENANCE-LINT/W327-C-5-APPLIED-OR-DOC-ONLY.md` (NEW)
- `docs/architecture/W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md` (NEW; this file)
- `.pre-commit-config.yaml` (+18 lines — the only edit outside W327-PROVENANCE-LINT/)

No other stream's territory was touched. settings.json deliberately NOT modified (Option C avoids cap pressure).

## APPLIED claim (this commit will be made by W327 closure agent)

- APPLIED: `.pre-commit-config.yaml`
- APPLIED: `docs/architecture/W327-PROVENANCE-LINT/W327-C-1-DESIGN-SPEC.md`
- APPLIED: `docs/architecture/W327-PROVENANCE-LINT/W327-C-2-EXTERNAL-ANCHORS.md`
- APPLIED: `docs/architecture/W327-PROVENANCE-LINT/W327-C-3-IMPLEMENTATION-OPTIONS.md`
- APPLIED: `docs/architecture/W327-PROVENANCE-LINT/W327-C-4-TEST-PLAN.md`
- APPLIED: `docs/architecture/W327-PROVENANCE-LINT/W327-C-5-APPLIED-OR-DOC-ONLY.md`
- APPLIED: `docs/architecture/W327-PROVENANCE-LINT/STREAM-C-SYNTHESIS.md`

(Recursive validation: when W327 ship-commit message includes these APPLIED claims AND all 7 files are staged, the freshly-applied provenance-lint will PASS its own first invocation — a fitting test.)
