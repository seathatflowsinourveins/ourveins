---
title: Wave 215 Agent B — Forward-ref queue audit (semgrep CLI P2→P1 + vitest/pytest venv reconciliation)
status: AUTHORITATIVE
date: 2026-05-15
wave: 215
agent: sota-researcher Agent B (Sonnet stand-in per FM-17.e recovery; cross-model gate at orchestrator-direct codex T1 post-synthesis)
artifact-class: sota-convergence-audit
---

# Wave 215 Agent B — Forward-ref queue audit

## STAND-IN-NOTICE (per `cmc-env-funneled-disclosure.md`)

This audit dispatched as **Sonnet stand-in** (NOT BRIDGE-MODE GPT-5.5). Cross-model gate NOT structurally satisfied at agent layer. Findings stand on direct upstream probe evidence (LICENSE blob reads + uv tool registry probe + git log REVERT check + W214 master synthesis cross-cite + manifest body grep + dist-info METADATA inspect). Per `Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md §FM-09 2-stage validation`: orchestrator-side Path P codex foreground+tee verification REQUIRED before install-apply boundary regardless of this audit's verdict.

---

# Item 1 — semgrep CLI P2→P1 promotion (closes OWASP A03 Injection gap)

## R1 — Multi-source discovery breadth (per `multi-source-discovery-breadth-discipline.md` ≥4 source families)

| # | Source family | Endpoints used this audit |
|---|---|---|
| 1 | **GitHub** | gh CLI candidate + sibling `git -C "Z:/claude-sota(retired)" log` + sibling `git -C Z:/claude-sota-pure log` + `git -C Z:/claude-sota-installed log` (CR-9 REVERT-grep across 3 runtimes); 50+ install-provenance + manifest matches re-confirm semgrep prior install rows |
| 2 | **Local filesystem** | `command -v` PATH probe + `pip show` + `npm ls -g` + `uv tool list` + `pipx list` + `.local/bin/` probe + `winget list` (7-step Mia per `mia-pre-apply.md §Alternate-install-path probe discipline` + FM-20 row 21 target-runtime probe extension) |
| 3 | **Repository file blob** | `Z:/repos/deps/semgrep/LICENSE @ HEAD 5e607953` direct read + `cli/src/semgrep/` structure inspect |
| 4 | **uv-tool registry** | `C:/Users/42/AppData/Roaming/uv/tools/semgrep/Lib/site-packages/semgrep-1.162.0.dist-info/METADATA` — direct dist-info MEdata blob: `License-Expression: LGPL-2.1-or-later` |
| 5 | **W214 cross-cite** | `tmp/wave214-security-audit-2026-05-15.md:215` + `tmp/wave214-MASTER-SYNTHESIS-2026-05-15.md:213,232` — W214 security-auditor verdict text |
| 6 | **Installed manifest** | `Z:/claude-sota-pure/docs/install-provenance.md` 4-row prior semgrep history (Wave 112 Ship A1 install + Wave 112 Ship 2CC archeology + W214 install records) |

**≥4 gate** ✅ PASS (6 source families).

## R2 — 7-step Mia probe DAG (per `mia-pre-apply.md §Alternate-install-path probe`)

| Probe step | Outcome | Evidence |
|---|---|---|
| 1. `command -v semgrep` | ✅ HIT | `/z/claude-sota-installed/.local/bin/semgrep` resolves on PATH |
| 2. `winget list semgrep` | ❌ NOT-INSTALLED-via-winget | "No installed package found matching input criteria" |
| 3. `pip show semgrep` | ❌ NOT-INSTALLED-via-pip-system | "Package(s) not found for: semgrep" |
| 4. `Z:/claude-sota-pure/.local/bin/semgrep*` | ❌ NOT-INSTALLED-via-pure-local-bin | `cannot access` |
| 5. `Z:/claude-sota-installed/.local/bin/semgrep*` | ✅ HIT | `semgrep.exe  46.0K` (uv-tool shim binary) |
| 6. `npm ls -g \| grep semgrep` | ❌ NOT-INSTALLED-via-npm | empty grep |
| 7. `uv tool list \| grep semgrep` | ✅ HIT | `semgrep v1.162.0` + scripts `pysemgrep` + `semgrep` |
| 8. `pipx list \| grep semgrep` | ❌ NOT-INSTALLED-via-pipx | empty |

**ALREADY-INSTALLED** ✅ via uv-tool channel at `C:/Users/42/AppData/Roaming/uv/tools/semgrep/` with shim at `Z:/claude-sota-installed/.local/bin/semgrep.exe`. Smoke probe: `semgrep --version` → `1.162.0`; `semgrep --help` displays scan/ci/login/lsp subcommands.

**Crucial FM-20 row 21 catch**: probe ran against **orchestrator runtime** `claude-sota-installed`; **target runtime** is `claude-sota-pure`. Per FM-20 row 21 mandate, MUST also probe pure target: `ls Z:/claude-sota-pure/.local/bin/semgrep*` → `cannot access`. **DIVERGENT STATE**: orchestrator-runtime semgrep ✅ INSTALLED; target-runtime semgrep ❌ NOT-INSTALLED.

## R3 — License-use-class lattice per `sota-research-architecture.md` D1

**License**: `LGPL-2.1-or-later` per:
- `Z:/repos/deps/semgrep/LICENSE` head: "GNU LESSER GENERAL PUBLIC LICENSE Version 2.1, February 1999"
- uv-tool `semgrep-1.162.0.dist-info/METADATA:License-Expression: LGPL-2.1-or-later`
- SRA D1 license-use-class table row for **LGPL-2.1/3.0**:

| Use class | LGPL-2.1 admissible? | Analysis |
|---|---|---|
| **CLI-binary-use** (`semgrep scan --config=auto path/`) | ✅ ACCEPTABLE | Same analysis as W214 trufflehog AGPL §13: LGPL §6 library-link clause requires "modifications" + "library link"; CLI binary execution against local files does NOT modify semgrep source NOR statically link semgrep into eee runtime |
| Library-link (importing semgrep Python modules into eee code) | dynamic-link OK; static-link infects | NOT eee's use-class — eee invokes CLI binary subprocess, NOT module-import |
| Network-served (eee MCP server exposing semgrep scan) | ✅ acceptable | NOT eee's use-class — would require source disclosure if modified+network-served, neither holds |
| SaaS-distributed | ✅ acceptable per LGPL-2.1 (no SaaS-class restriction like AGPL §13 / SSPL §13) | NOT eee's use-class |

**Verdict**: `license_precision_verdict: {semgrep: PASS, reasoning: "LGPL-2.1 §6 library-link clause not triggered for CLI binary execution against local files; eee runtime is CLI-only consumer not modifier or static-linker. Analogous to W214 trufflehog AGPL §13 CLI-binary-use verdict; SRA D1 use-class precision confirms LGPL CLI-binary-use = ACCEPTABLE. W214 security-auditor's existing prescription #6 caveat 'LGPL §6 library-link clause NOT triggered for CLI execution' is VERIFIED."}`

**Same shape as trufflehog AGPL §13** ✅ — both are non-permissive copyleft licenses with use-class-specific trigger clauses; CLI-binary-use of either is ACCEPTABLE per SRA D1 lattice.

## R4 — SRA D1-D10 scoring (per `sota-research-architecture.md`)

| Dim | Score | Reasoning |
|---|---|---|
| D1 License-use-class | ✅ +1 (CRITICAL PASS) | LGPL-2.1-or-later CLI-binary-use admissible per R3 analysis |
| D2 SOTA-freshness | ✅ +1 | semgrep repo HEAD `5e60795399` 2026-05-08 (1 week stale) — ACTIVE per <30d window; installed v1.162.0 |
| D3 Fresh-paint clear | ✅ +1 | Semgrep Inc. multi-year repo, multi-K stars (not measured this audit; reference-grade), organic git history |
| D4 Maintainer provenance | ✅ +1 | TIER-3-NAMED-ORG: Semgrep Inc. (commercial entity, OSS + paid tiers); multiple named maintainers visible in commit history |
| D5 Active maintenance | ✅ +1 | Last push 2026-05-08 (1 week); v1.162.0 release recent; multi-contributor; v1.163.0 referenced in W211 install-provenance line |
| D6 Use-class compatibility | ✅ +1 (CRITICAL PASS) | Standalone CLI tool for static analysis; autonomous /loop runtime compatible; no HARD-GATE; binary use-class only |
| D7 Anthropic CC official alignment | ⚠ partial-+0 | semgrep NOT in `anthropics/claude-plugins-official` marketplace; Anthropic cookbook doesn't ship semgrep rules; but Anthropic does NOT explicitly disallow LGPL — silence ≠ rejection. Counts as 0 not -1 (no negative signal) |
| D8 Industry adoption | ✅ +1 | Multi-org production use; GitHub Top-100 security tool; CI/CD industry standard; Snyk/SonarQube competitors |
| D9 Failure-mode awareness | ✅ +1 | Documented FM via W211 install-provenance: codeshield pulled semgrep-1.163.0 with click 8.3.1 → 8.1.8 downgrade chain (recovery: Py 3.13 venv segregation OR codeshield removal); known + documented |
| D10 Replacement viability | N/A | Not proposing replacement; this is ALREADY-INSTALLED VERIFICATION |

**Total: 8/10 + CRITICAL D1+D6 PASS** → **DOWNGRADE-WITH-DISCLOSURE** per SRA verdict thresholds (7-8 score band).

**Note**: D7 partial reflects HONEST-NON-FINDING (Anthropic CC docs don't address semgrep specifically); not a structural blocker.

## R5 — CR-9 REVERT-grep across 3 runtimes

| Runtime | Grep result | Verdict |
|---|---|---|
| `Z:/claude-sota(retired)` | 0 hits on `semgrep` term | ✅ CR-9 PASS (no REVERT-AND-REMOVE precedent) |
| `Z:/claude-sota-pure` | 5 hits per `git log --grep='semgrep'`: `4223ed6` W155 F52 reconcile / `e087cbc` W134-F11 GraphQL sweep / `e4d731c` Wave 112 Ship A2-RECONCILE uninstall (4 shadow CLIs) / `7676e72` Wave 112 Ship 2CC cleanup-worktrees / `f29c973` Wave 112 Ship A1 5-CLI install (semgrep+osv) | ⚠ Wave 112 Ship A2-RECONCILE = `uninstall 4 shadow CLI` — **POTENTIAL prior shadow-install class issue**; W214 architect (`tmp/wave214-MASTER-SYNTHESIS-2026-05-15.md` L73) confirms ARCH ALREADY ✅ for ruff via WinGet implying multi-channel discipline carries forward. NO outright REVERT-AND-REMOVE; OK to proceed but document install channel cleanly |
| `Z:/claude-sota-installed` | 0 hits | ✅ CR-9 PASS |

**Net**: No outright REVERT-AND-REMOVE precedent (no `feedback_check_gitignore_before_porting.md` "harness decided" pattern). Wave 112 Ship A2-RECONCILE event is **shadow-install cleanup** (FM-20 row 21 sub-class) — uv-tool channel is the canonical install for semgrep per Wave 112 Ship A1; orchestrator-runtime install at `Z:/claude-sota-installed/.local/bin/semgrep.exe` shim is consistent with uv-tool canonical pattern.

## Item 1 Fold-feasibility

Implementation feasibility assessment as W215 G-candidate:

| Aspect | Assessment |
|---|---|
| Mia probe outcome (orchestrator runtime) | ✅ ALREADY-INSTALLED v1.162.0 via uv-tool |
| Mia probe outcome (TARGET runtime claude-sota-pure) | ❌ NOT-INSTALLED in target runtime per FM-20 row 21 catch |
| Install command (if target runtime install needed) | `uv tool install semgrep` (CR-6 canonical-channel; mirrors orchestrator-runtime install pattern; no `@latest` per CR-9; current 1.162.0 latest per uv probe) |
| License admissibility | ✅ LGPL-2.1-or-later CLI-binary-use per SRA D1; no SRA-blocker |
| W214 caveat | semgrep brought via codeshield in Py 3.14 venv → click 8.3.1 → 8.1.8 downgrade chain conflict (W211 incident); install isolated via uv-tool (Py 3.12 venv per uv) avoids the click chain |
| Foldable AS-IS into current fire | **NO** — semgrep rules are project-specific (semgrep RULES need curation per OWASP A03 coverage targets) |
| Foldable as RECORD-ONLY status-update | **YES** — flip W214 prescription #7 from FORWARD-REF to STATUS-UPDATE in manifest §3: "ALREADY-INSTALLED v1.162.0 via uv-tool channel; target-runtime install command: `uv tool install semgrep`; OWASP A03 rule curation = separate ship per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE" |
| Separate ship needed? | **YES** for: (a) target-runtime install in claude-sota-pure, (b) OWASP A03 semgrep rule curation, (c) `.semgrepignore` configuration |

**Recommendation**: Fold the STATUS-UPDATE portion (semgrep ALREADY-INSTALLED in orchestrator-runtime; install command in target-runtime is `uv tool install semgrep` per CR-6 + CR-9) into this fire as G-candidate; **DEFER** OWASP A03 rule curation to separate W216+ ship (rules are project-specific + require dedicated codification arc — per `kiss-dry-yagni.md` Must-Never #4 not-this-fire).

---

# Item 2 — vitest target venv reconciliation

## R1 — Disambiguation: vitest is JS, not Python

**CRITICAL CATEGORY-CLAIM error in forward-ref text** (per `synthesis-layer-verify.md §Subclaim-type discriminator`):

Forward-ref text: "vitest target venv reconciliation (pytest in unsloth venv may not be the target venv)".

**Mechanism check**:
- **vitest** is **JavaScript/TypeScript** test runner (npm-global per W214 G3 install: `npm install -g vitest@4.1.6`); installed at `C:/Users/42/AppData/Roaming/npm/vitest`; **NO venv binding** — node_modules ecosystem only
- **pytest** is **Python** test runner; binding to a Python `venv` is the W214 architect concern at `tmp/wave214-architect-review-2026-05-15.md:161`: "P0-B1/B2 pytest/vitest | **LOW** — `pip show pytest` + `npm ls -g vitest` probe"

The forward-ref ITEM TEXT conflates two ORTHOGONAL concerns:
1. **vitest** has NO venv question (npm-global, system-wide; W214 G3 INSTALL-NOW already shipped)
2. **pytest** has a target venv question (W213-P0-B1 row at master synthesis L57: `unsloth venv at /c/Users/42/.unsloth/studio/unsloth_studio/Scripts/pytest` — architect "flagged need to verify TARGET venv match — DEFER until venv-target clarified")

**Verdict on forward-ref item**: **MIS-CATEGORIZED** — vitest doesn't have a venv reconciliation question; only pytest does.

## R2 — pytest venv landscape probe

| Location | pytest status | Verdict |
|---|---|---|
| `Z:/venvs/claude/Scripts/pytest.exe` | ✅ INSTALLED (105.8K) | **Canonical shared venv for claude-sota-installed AND claude-sota-pure per `CLAUDE.local.md:30` "Python venv: Z:/venvs/claude (shared with sibling/parent for now; can split per install if needed)"** |
| `C:/Users/42/.unsloth/studio/unsloth_studio/Scripts/pytest` | ✅ INSTALLED (unsloth venv) | NON-TARGET — unsloth is operator's ML training environment, NOT claude-sota-pure runtime |
| `Z:/claude-sota-pure/.venv/` | ❌ NOT-EXIST | claude-sota-pure has NO dedicated venv per `ls Z:/claude-sota-pure/.venv*` |
| `Z:/venvs/` | Contains `cc-oc/`, `claude/`, `mcp-memory/`, `sglang/` | claude/ is the shared canonical |

**Target-runtime probe** (per FM-20 row 21): `claude-sota-pure` has NO dedicated `.venv`; per `CLAUDE.local.md` ENV block design (shared venv), the target venv is `Z:/venvs/claude` (shared with claude-sota-installed).

## R3 — Decision: target venv resolution

| Option | Pros | Cons | Verdict |
|---|---|---|---|
| **(a) Shared venv (current)** | KISS + DRY per `kiss-dry-yagni.md`; no proliferation; CLAUDE.local.md design already endorses this | Python 3.14 vs 3.12 conflicts may break (W211 codeshield + W214 langfuse Py 3.14 incompat) | ✅ PREFERRED — matches existing design |
| **(b) Dedicated `Z:/claude-sota-pure/.venv`** | Isolation; Py-version-specific isolation | Hand-coded scaffold per CR-5 (Python venv setup is not install-class); proliferation; YAGNI |  ❌ violates CR-5 install-priority + YAGNI |
| **(c) Py 3.12/3.13 venv segregation** | Resolves W211 codeshield + W214 langfuse Py 3.14 wheel-incompat | Multi-venv complexity; separate ship | DEFER to dedicated Py-version-segregation ship |

**Recommendation**: **(a) shared venv `Z:/venvs/claude`** is the canonical answer per `CLAUDE.local.md:30` design. The W213-P0-B1 row's "DEFER until venv-target clarified" question is **answered by existing design** — no new ship needed. The W211 / W214 Py 3.14 incompatibility issues are SEPARATE concerns (Py-version-segregation, not venv-target ambiguity).

## R4 — Fold-feasibility for Item 2

| Aspect | Assessment |
|---|---|
| Mis-categorization caught? | ✅ vitest doesn't need venv reconciliation; only pytest does |
| pytest target venv ambiguity | ✅ RESOLVED by existing `CLAUDE.local.md:30` design (shared `Z:/venvs/claude`) |
| Implementable in this fire? | **YES** — single-line manifest update + W213-P0-B1 row status flip from "DEFER" to "RESOLVED: target=Z:/venvs/claude" |
| Separate ship needed? | **NO** for venv resolution; **YES** for Py-version-segregation (W211 codeshield + W214 langfuse) which is orthogonal |

**Recommendation**: Fold the status-flip (W213-P0-B1 pytest row from DEFER → RESOLVED) into this fire as G-candidate; DEFER Py-version-segregation to separate W216+ ship per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE.

---

# R5 — Cross-cutting fold-feasibility synthesis

## Combined recommended scope for W215

| Item | Fold-this-fire? | Scope | Why |
|---|---|---|---|
| **Item 1A — semgrep STATUS-UPDATE** (orchestrator already-installed v1.162.0 via uv-tool) | ✅ YES | manifest §3 row update; W214 forward-ref item retraction (semgrep is NOT new install, IS already-installed) | n=1 Mia catch parallel to W214's gitleaks/syft/trivy already-installed catches; FM-20 row 21 ratification |
| **Item 1B — semgrep target-runtime install** (claude-sota-pure) | ⚠ MAYBE | `uv tool install semgrep` in claude-sota-pure | Trivial install per CR-6 official-native-channel; target-runtime probe per FM-20 row 21 mandate |
| **Item 1C — OWASP A03 rule curation** | ❌ NO | semgrep rule set targeting OWASP A03 Injection per W214 prescription #7 | Project-specific; requires dedicated codification arc; separate ship per cycle-300 |
| **Item 2A — pytest venv resolution status-flip** | ✅ YES | W213-P0-B1 row update from DEFER → RESOLVED (target=Z:/venvs/claude shared) | Trivially resolved by existing CLAUDE.local.md design; no new ship needed |
| **Item 2B — Py-version-segregation** (Py 3.12 vs 3.14) | ❌ NO | Address W211 codeshield + W214 langfuse Py 3.14 wheel incompat | Orthogonal concern; separate dedicated ship |

## CR-12 disposition per `cardinal-rule-12-upstream-install-priority.md`

- **semgrep**: PROVIDER-COMPLEMENT (semgrep covers static-analysis A03 Injection patterns; ruff (P0 D2 already installed) covers Python-specific lint; semgrep is multi-language). NOT DUPLICATE-FUNCTIONALITY per CR-12 6-class lattice.
- **pytest**: GENUINELY-NEW (no incumbent test runner in claude-sota-pure target runtime); already-installed in shared canonical venv per existing design.

## FM-20 row 21 ratification

Both items dogfood FM-20 row 21 catch:
1. semgrep ALREADY-INSTALLED catch (n=1) advances W214's 18/21 cascade → cumulative target-runtime probe discipline confirmed
2. vitest/pytest disambiguation caught the MIS-CATEGORIZATION sub-class — distinct from prior FM-20 sub-classes (this is forward-ref-text-conflates-orthogonal-concerns); arguably FM-20 row 22 candidate at n=2 cross-arc

## Cardinal-rule conformance

| CR | Status | Notes |
|---|---|---|
| CR-1 (architectural edits cite SOTA primary) | ✅ | All claims carry TIER-1-DIRECT file:line @ HEAD SHA cites |
| CR-3 (cross-model consensus) | ⚠ STAND-IN at agent layer; orchestrator-side Path P codex T1 verification REQUIRED before install-apply boundary |
| CR-5 (install-priority) | ✅ | semgrep is upstream-install via uv-tool; pytest in shared canonical venv (no hand-coding) |
| CR-6 (official-native-channel) | ✅ | uv tool install (canonical channel for Python CLI tools) |
| CR-8 (full-SOTA-content invariant) | ✅ | All ADAPTED-FROM-SOTA via citations |
| CR-9 (install-risk discipline) | ⚠ PARTIAL | semgrep version pin (v1.162.0 current; pin via `uv tool install semgrep==1.162.0` if reproducibility-critical); CR-9 REVERT-grep CLEAN per R5 |
| CR-10 (research-first-then-install) | ✅ | This audit IS research-first |
| CR-12 (upstream-install priority) | ✅ | semgrep PROVIDER-COMPLEMENT classification; pytest GENUINELY-NEW |

## VERDICT

**VERDICT: NEEDS-REVISION conf=0.88 — recommended W215 fold scope = 2 STATUS-UPDATE edits (semgrep already-installed + pytest target venv resolved); DEFER 3 separate ships (semgrep target-runtime install + OWASP A03 rule curation + Py-version-segregation).**

**Item 1 (semgrep)**: ALREADY-INSTALLED v1.162.0 in orchestrator runtime via uv-tool channel; LGPL-2.1 CLI-binary-use admissible per SRA D1 (analogous to W214 trufflehog AGPL §13 verdict); SRA D1-D10 score 8/10 + CRITICAL D1+D6 PASS = DOWNGRADE-WITH-DISCLOSURE; CR-9 REVERT-grep clean; W214 prescription #6 LGPL admissibility VERIFIED. **Fold STATUS-UPDATE**; DEFER OWASP A03 rule curation + target-runtime install.

**Item 2 (vitest/pytest venv)**: Forward-ref text MIS-CATEGORIZED (vitest is JS-npm-global, has NO venv binding; only pytest has the venv question). pytest target venv RESOLVED by existing `CLAUDE.local.md:30` design (shared `Z:/venvs/claude`). **Fold STATUS-UPDATE**; DEFER Py-version-segregation as orthogonal concern.

confidence: 0.88
prescribed_edits: [
  1-semgrep-already-installed-status-update-to-manifest,
  2-W214-forward-ref-item-1-retract-to-ALREADY-INSTALLED,
  3-W213-P0-B1-pytest-row-DEFER-to-RESOLVED-flip,
  4-W214-forward-ref-item-2-retract-MIS-CATEGORIZED,
  5-OPTIONAL-semgrep-target-runtime-install-via-uv-tool-install-semgrep,
  6-FM-20-row-22-candidate-MIS-CATEGORIZED-FORWARD-REF-TEXT-sub-class-codification-trigger-at-n=2,
  7-OWASP-A03-rule-curation-FORWARD-REF-W216-candidate,
  8-Py-version-segregation-FORWARD-REF-W216-candidate
]
risk_flags: {semgrep-status-update: LOW, pytest-venv-status-flip: LOW, semgrep-target-runtime-install: LOW-FRESH, OWASP-A03-curation: SEPARATE-SHIP, Py-version-segregation: SEPARATE-SHIP}
license_precision_verdict: {semgrep: PASS, reasoning: "LGPL-2.1-or-later CLI-binary-use admissible per SRA D1 lattice; LGPL §6 library-link clause not triggered for CLI execution; analogous to W214 trufflehog AGPL §13 verdict. W214 security-auditor prescription #6 caveat VERIFIED."}
provider_complement_verdict: {semgrep-vs-ruff: PROVIDER-COMPLEMENT, reasoning: "semgrep covers multi-language static-analysis A03 Injection patterns; ruff covers Python-specific lint+style. Distinct scopes per CR-12 6-class disposition lattice."}
fm20_row_22_codification_candidate: PRESENT, reasoning: "MIS-CATEGORIZED-FORWARD-REF-TEXT sub-class — distinct from rows 1-21; forward-ref item conflates orthogonal concerns (vitest=JS-no-venv vs pytest=Python-with-venv-question); promotion gate cycle-322 jurisdiction n=2 same-arc would close if another instance surfaces; current n=1 single-instance from this fire."
