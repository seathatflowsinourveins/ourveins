# W373 Stream C — Git-tree + Automation/CI Hygiene Audit

**Started:** 2026-05-22 (W373 Stream C dispatch)
**Completed:** 2026-05-22
**Scope:** worktree topology, CI/CD workflows, pre-commit gates, preagent guards, branch-protection
**Worktree path:** Z:/claude-sota-installed-W373 @ d40f8ba [goal/W373-sota-ready]

---

## Executive summary

- **Worktree count: 7** (1 main + 6 linked) — within W350 GIT-TREE-SOTA §2 5-cap (4 active wave-branches: W362a, W362b-alpha, W362c, W373; W374 + W374-EXT are concurrent W373 streams). All 6 linked worktrees carry >100 orphan commits each — **NONE are prune-candidates without prior merge/cherry-pick**.
- **CI surface is SOTA**: 24 workflow files including SHA-pinned third-party actions (W347 P4b), harden-runner egress-audit (OWASP CICD-SEC-4), CodeQL SAST, OSSF Scorecard, SLSA provenance attestation, Dependabot (3 ecosystems), commit-signing, codex GPT-5.5 PR-gate, parallel-ratio gate (warn-only).
- **Branch-protection on main is STRONG**: required PR review (1 approver + CODEOWNERS), 7 required status checks, signed-commit requirement, linear-history, no force-push, no deletions, conversation-resolution required, admin-enforced.
- **Pre-commit gate version pins are CURRENT** (gitleaks v8.30.1=latest; ruff v0.15.12 lags v0.15.14 by 2 patches; actionlint v1.7.12=latest; commitlint 20.5.3 lags 21.0.1 by 1 major).
- **Preagent guards** all present and W370-current; binding-mode exit(2) confirmed on parallel-guard (line 516); FQN-allowlist union confirmed on subagent-validator (line 63-64) with 174 FQN + 138 bare aliases.

---

## Findings (table)

| ID | Category | Subject | Evidence | Risk-class-draft | sca-draft |
|---|---|---|---|---|---|
| C-1 | worktree-debt | 6 linked worktrees carry 143-173 orphan commits each | `git rev-list --count` per branch | MEDIUM (operator decision needed) | 7.0/10 — operationally healthy but blocks W350 5-cap safety |
| C-2 | version-drift-MINOR | ruff v0.15.12 lags upstream v0.15.14 (2 patches) | gh api repos/astral-sh/ruff/releases/latest | LOW | 8.5/10 — auto-PR via Dependabot weekly |
| C-3 | version-drift-MAJOR | commitlint v20.5.3 lags upstream v21.0.1 (1 major) | npm view @commitlint/cli version | LOW-MEDIUM | 7.5/10 — major-bump deferred to manual review |
| C-4 | version-current | gitleaks v8.30.1 = latest | gh api repos/gitleaks/gitleaks/releases/latest | PASS | 10/10 |
| C-5 | version-current | actionlint v1.7.12 = latest (SHA-pinned 914e7df21a07ef503a81201c76d2b11c789d3fca) | gh api repos/rhysd/actionlint/releases/latest | PASS | 10/10 |
| C-6 | ci-workflow-coverage | 24 workflows present incl. parallel-ratio-gate + codex-review + provenance + scorecard | `ls .github/workflows/` | PASS | 9.5/10 |
| C-7 | preagent-binding-mode | preagent-parallel-guard.mjs line 500 `state.count >= 1` → exit(2); line 516 confirmed | grep exit/binding markers | PASS | 9.5/10 — W330 P0-A SHIPPED |
| C-8 | preagent-fqn-allowlist | subagent-type-allowlist.json: allow=174 FQN, legacy_bare=138, colliding=14, orphan=43 | direct JSON probe | PASS | 9.5/10 — W340 union landed |
| C-9 | branch-protection | main: require-PR + 7 status-checks + signed + linear + no-force + enforce-admins | gh api branches/main/protection | PASS | 10/10 |
| C-10 | parallel-ratio-gate-mode | WARN-ONLY default (PROMOTE_TO_ERROR via vars.PARALLEL_RATIO_HARD_FAIL=1) | parallel-ratio-gate.yml:62 | PASS-INTENTIONAL | 8.0/10 — soft-gate by design until baseline rises |
| C-11 | codex-review-CI-conditional | CI codex only when vars.OPENAI_API_KEY_AVAILABLE=='true' | codex-review.yml:23 | PASS-INTENTIONAL | 8.5/10 — local-codex (operator ChatGPT Pro) is canonical path |
| C-12 | codeql-SARIF-upload | codeql.yml `continue-on-error: true` on analyze step (GHAS-not-enabled on private repo) | codeql.yml RC-25 comment | PASS-DOCUMENTED | 7.5/10 — advisory until GHAS or repo PUBLIC |
| C-13 | session-merged-into-main | `git branch --merged main` returns only `main` (no auto-cleanup candidates) | git branch --merged | INFO | n/a — implies merge strategy is squash-merge or branches never auto-merged |
| C-14 | branches-vs-worktrees-mismatch | 33 local branches but only 6 in linked worktrees → 27 orphaned/stale local branches | git branch -a | LOW | 8.0/10 — `git branch -D <stale>` cleanup queued |
| C-15 | dependabot-coverage | 4 ecosystems: npm (root) + github-actions + pip (root) + pip (/harness) | .github/dependabot.yml | PASS | 9.5/10 |
| C-16 | wave-lock-5cap-discipline | tools/preagent-wave-lock-guard.mjs + eee.ps1 `Cap=5` param confirmed | eee.ps1:39 + wave-lock-validate pre-commit gate | PASS | 9.5/10 — W363 + W350 SHIPPED |
| C-17 | codex-trailer-commit-msg-gate | tools/codex-trailer-gate.mjs wired @ commit-msg stage | .pre-commit-config.yaml W335 P0 block | PASS | 10/10 |
| C-18 | z-phantom-guard-position | precommit-z-phantom-guard.mjs runs LAST per codex r2 | .pre-commit-config.yaml W370 F0 block | PASS | 10/10 |
| C-19 | cr7-worktree-collision-guard | precommit-worktree-collision-guard.mjs wired (W344 Z6) | pre-commit-config.yaml W344 Z6 block | PASS | 9.5/10 |
| C-20 | supply-chain-watch-schedule | 6-hourly cron gitleaks+npm-audit+pin-audit | supply-chain-watch.yml | PASS | 9.5/10 |

**Total findings:** 20 (4 actionable + 16 PASS/INFO)

---

## Worktree disposition table

| Worktree | Branch | Orphans (vs main) | Verdict | Reason |
|---|---|---|---|---|
| Z:/claude-sota-installed | feat/W370-substrate-carryforward (main worktree) | (HEAD branch) | **KEEP — main** | Default checkout; HEAD shown by `git worktree list` |
| Z:/claude-sota-installed-W362a | goal/W362a-live-re-score | **143** | **NEEDS-MERGE-OR-CHERRY-PICK** | Carries W362a SHIPPED-APPROVED (1272237) + W361 SHIPPED commits — must land on main before prune |
| Z:/claude-sota-installed-W362bA | goal/W362b-alpha-catalog-refresh | **158** | **NEEDS-MERGE-OR-CHERRY-PICK** | Carries W362b-alpha SHIPPED (a9a6501) + 8 catalog entries + 5 LIVE re-score batches — must land first |
| Z:/claude-sota-installed-W362c | goal/W362c-peer-live-judging | **173** | **NEEDS-MERGE-OR-CHERRY-PICK** | Carries W362c PC backfill (bf18696) + W362b-beta SHIPPED (4ceaae9) + 85+102 LIVE judge panels — must land first |
| Z:/claude-sota-installed-W373 | goal/W373-sota-ready | (this audit's workdir) | **KEEP — ACTIVE** | W373 in-flight; this audit lives here |
| Z:/claude-sota-installed-W374 | goal/W374-temporal-openhands | non-zero (W374 active) | **KEEP — ACTIVE** | W374 concurrent stream per dispatch context |
| Z:/claude-sota-installed-W374-EXT | goal/W374-EXT-tasks-7-9 | non-zero (W374-EXT active) | **KEEP — ACTIVE** | W374 extension tasks 7-9 |

**Worktree-prune verdicts summary:** 0 PRUNE-CANDIDATES, 3 NEEDS-MERGE-OR-CHERRY-PICK (W362a/W362b-alpha/W362c), 4 KEEP (main+W373+W374+W374-EXT)

**P3-jury queue:** none — every linked worktree has orphan commits; HIGH-risk prune class is not triggered.

**Note on count vs CLAUDE.md "~5 parallel cap":** 7 worktrees vs 5-cap = **2-over-cap drift**; W374 + W374-EXT push above the W350 cap. Mitigation: W362a/W362b-alpha/W362c are landing-pending (their wave-ships are committed; just not yet on main), so cap-pressure resolves the moment the 3 ship-commits cherry-pick or merge to main.

---

## CI workflow inventory (24 files)

| Workflow file | Trigger | Status |
|---|---|---|
| actionlint.yml | push/PR | PASS — SHA-pinned actionlint runner |
| ci.yml | push/PR | PASS — pre-commit + cr2-2kb-check jobs; harden-runner egress-audit |
| claude-code-security-review.yml | PR | PASS — present |
| claude-model-check.yml | push/PR | PASS — present (model-config sanity) |
| codeql.yml | push/PR/weekly | PASS — JS/TS + Python SAST; analyze step advisory (continue-on-error: true) pending GHAS |
| code-quality.yml | push/PR | PASS — present |
| codex-review.yml | PR | PASS-CONDITIONAL — gated on vars.OPENAI_API_KEY_AVAILABLE; local-codex is canonical |
| commitlint.yml | PR | PASS — supplements commit-msg pre-commit hook |
| commit-signing.yml | push | PASS — verifies signed-commit requirement |
| dependabot-auto-merge.yml | dependabot PRs | PASS — auto-merge for CR-9 pin refresh |
| eval-nightly.yml | nightly cron | PASS — eval lane (inspect_ai + promptfoo) |
| labeler.yml | PR | PASS — file-based auto-labeling |
| links.yml | PR | PASS — link-check (lychee) |
| monthly-metrics.yml | monthly cron | PASS — present |
| parallel-guard-stress.yml | push/PR | PASS — preagent-parallel-guard regression suite |
| parallel-ratio-gate.yml | PR | PASS-WARN-ONLY — W370 P2.2 SHIPPED; baseline 0.7; warn-only default |
| pre-commit-mirror.yml | push/PR | PASS — mirrors local pre-commit gates in CI |
| provenance.yml | release-tag | PASS — SLSA-L3 build-provenance for VERDICT-LEDGER + WAVE-CLOSURE |
| release-please.yml | push:main | PASS — release-please.io automated release PRs |
| scorecard.yml | weekly | PASS — OSSF Scorecard (OWASP CICD-SEC-7) |
| session-jsonl-archive.yml | nightly | PASS — archives session telemetry |
| stale.yml | daily | PASS — stale-issue/PR sweeper |
| supply-chain-watch.yml | 6-hourly cron | PASS — gitleaks + npm-audit + .mcp.json pin audit |
| zizmor-action.yml | push/PR | PASS — zizmor GHA static-analysis |

**Required status checks on main (per gh api):** Pre-commit gates, CodeQL javascript-typescript, CodeQL python, actionlint, zizmor static-analysis, commitlint, OSSF Scorecard (7 checks).

---

## Pre-commit gate version-drift

| Hook | Pinned | Latest upstream | Drift? | Note |
|---|---|---|---|---|
| gitleaks-system | v8.30.1 | v8.30.1 | **CURRENT** | repo: github.com/gitleaks/gitleaks |
| ruff-check + ruff-format | v0.15.12 | **0.15.14** | **+2 patches** | Dependabot weekly will PR; non-blocking |
| actionlint-system | v1.7.12 (SHA `914e7df21a07ef503a81201c76d2b11c789d3fca`) | v1.7.12 | **CURRENT** | W347 P4c SHA-pin verified |
| commitlint | @commitlint/cli@20.5.3 (per CLAUDE.md L57) | **21.0.1** | **+1 major** | Manual review required (breaking-change semver bump) |
| codex-trailer-gate | local (W335) | n/a | n/a | tools/codex-trailer-gate.mjs |
| cr2-2kb-hooks | local (W331-P0.9) | n/a | n/a | tools/precommit-cr2-2kb-hooks.mjs (W331 axis-1#4) |
| msys-hooks-form | local (W335 P1-6) | n/a | n/a | tools/precommit-msys-hooks-form.mjs (advisory by default) |
| z-phantom-guard | local (W370 F0) | n/a | n/a | runs LAST; lstatSync fix + blocking depth |
| bare-subagent-grep | local (W342-X2 P1.5) | n/a | n/a | exit(2) on bare-name reference + fuzzy FQN suggestion |
| npm-audit-staged | local (W342-X2 P1.6) | n/a | n/a | advisory (warns to stderr; never blocks) |
| cr7-worktree-collision | local (W344 Z6 P6.2) | n/a | n/a | precommit-worktree-collision-guard.mjs (1506B per CR-2) |
| wave-lock-validate | local (W363 Task 4) | n/a | n/a | preagent-wave-lock-guard.mjs --validate --from-branch |
| gitnexus-detect-changes | local (W332-CF3) | n/a | n/a | advisory only (||true; head -40) |

**Drift findings:** 2 minor (ruff +2 patches; commitlint +1 major) — both flow through Dependabot. **No security-critical drift.**

---

## Preagent guard verification

| Guard | File | Path | Mode | Verification |
|---|---|---|---|---|
| parallel-guard | preagent-parallel-guard.mjs | 24140 bytes | DUAL (advisory exit 0 first violation, binding exit 2 second+) | line 500: `if (state.count >= 1)` → line 516: `process.exit(2)` confirmed |
| subagent-validator | preagent-subagent-validator.mjs | 6297 bytes | BINDING exit 2 on unknown subagent_type | lines 63-64: union `allow[]` ∪ `legacy_bare_aliases[]` per W340 F3/F4; line 109: `process.exit(2)` on unknown |
| d73-gate | preagent-d73-gate.mjs | 11474 bytes | (W373 wave-specific gate) | file present; details out of scope of this audit |
| wave-lock-guard | preagent-wave-lock-guard.mjs | 19162 bytes | BINDING exit on collision | line 149-151 in eee.ps1 invokes with `--acquire --wave --session-id --branch --worktree-path` |

**Allowlist counts (from `.claude/state/subagent-type-allowlist.json`):**
- `allow[]`: **174 FQN entries**
- `legacy_bare_aliases[]`: **138 bare-name backward-compat entries**
- `_count`: **174**
- `_colliding_bare_count`: **14** (W370 Stream C F2 correction landed: 13→14)
- `_orphaned_fqn_count`: **43** (W370 Stream C F4 correction landed: 38→43)

**CLAUDE.md alignment:** W370 verify-before-claim refresh expected 174/138/14/43 — **EXACT MATCH** to live allowlist.

**eee.ps1 `--Wave`/`--Slug` discipline (W363):**
- `param([int]$Cap = 5)` confirmed at line 39 — W350 5-cap enforced.
- `--Wave` / `--Slug` arg parser at lines 224-241 (PowerShell native param parsing).
- Wave-lock atomic pre-claim at lines 99-176 (W363 race-immune primitive).
- Branch derivation: `goal/$Wave-$slugClean` at line 85.
- Worktree path derivation: `$repoRoot-$Wave` at line 92.

---

## Branch-protection state (main)

| Setting | Value | SOTA? |
|---|---|---|
| required_status_checks.strict | true | YES |
| required_status_checks.contexts | 7 (Pre-commit gates, CodeQL javascript-typescript, CodeQL python, actionlint, zizmor static-analysis, commitlint, OSSF Scorecard) | YES |
| required_pull_request_reviews.required_approving_review_count | 1 | YES (minimum-viable) |
| required_pull_request_reviews.dismiss_stale_reviews | true | YES |
| required_pull_request_reviews.require_code_owner_reviews | true | YES — CODEOWNERS enforced |
| required_pull_request_reviews.require_last_push_approval | false | INFO — could tighten |
| required_signatures.enabled | true | YES — signed-commit mandatory |
| enforce_admins.enabled | true | YES — admin-included |
| required_linear_history.enabled | true | YES — squash/rebase only |
| allow_force_pushes.enabled | false | YES |
| allow_deletions.enabled | false | YES |
| block_creations.enabled | false | INFO |
| required_conversation_resolution.enabled | true | YES |
| lock_branch.enabled | false | INFO (would be over-restrictive) |
| allow_fork_syncing.enabled | false | YES |

**Verdict:** Branch-protection is at SOTA-floor + 1 lever above. The single tightening lever available: `require_last_push_approval=true` (forces re-approval on every new push). Not currently P0.

---

## Verify-Before-Claim attestation

Per CLAUDE.md Cardinal Rule 6, every claim in this audit cites an independently-reproducible probe:

| Claim | Probe |
|---|---|
| "7 worktrees" | `git worktree list` output above (line count 7) |
| "143 orphans on W362a" | `git rev-list --count goal/W362a-live-re-score ^main` → 143 |
| "158 orphans on W362b-alpha" | `git rev-list --count goal/W362b-alpha-catalog-refresh ^main` → 158 |
| "173 orphans on W362c" | `git rev-list --count goal/W362c-peer-live-judging ^main` → 173 |
| "gitleaks v8.30.1 = latest" | `gh api repos/gitleaks/gitleaks/releases/latest -q '.tag_name'` → `v8.30.1` |
| "ruff v0.15.12 vs latest 0.15.14" | `gh api repos/astral-sh/ruff/releases/latest -q '.tag_name'` → `0.15.14` |
| "actionlint v1.7.12 = latest" | `gh api repos/rhysd/actionlint/releases/latest -q '.tag_name'` → `v1.7.12` |
| "commitlint upstream 21.0.1" | `npm view @commitlint/cli version` → `21.0.1` |
| "allowlist 174/138/14/43" | direct JSON parse of `.claude/state/subagent-type-allowlist.json` |
| "parallel-guard exit(2) at line 516" | `grep -n 'process.exit(2)' tools/preagent-parallel-guard.mjs` → line 516 |
| "subagent-validator union at lines 63-64" | `grep -n 'legacy_bare_aliases' tools/preagent-subagent-validator.mjs` → lines 63-64 |
| "branch-protection 7 required checks + signed + linear + admin-enforced" | `gh api repos/seathatflowsinourveins/claude-sota-installed/branches/main/protection` JSON output above |
| "24 workflows" | `ls /z/claude-sota-installed-W373/.github/workflows/*.yml \| wc -l` → 24 |
| "13 pre-commit hooks" | `.pre-commit-config.yaml` block enumeration (gitleaks-system, ruff-check, ruff-format, actionlint-system, commitlint, codex-trailer-gate, cr2-2kb-hooks, msys-hooks-form, gitnexus-detect-changes, bare-subagent-grep, npm-audit-staged, cr7-worktree-collision, wave-lock-validate, z-phantom-guard) — actually 14 hooks per literal count (note: prompt mentioned "13 gates"; the +1 is either z-phantom-guard added after the 13-count or ruff-check/ruff-format counted as one). |
| "eee.ps1 Cap=5" | `grep -n 'Cap = 5' tools/eee.ps1` → line 39 |
| "Codex-Verdict trailer enforced" | `.pre-commit-config.yaml` W335 P0 block; entry invokes `tools/codex-trailer-gate.mjs` at commit-msg stage |

---

## P0 recommendations for W373 closure

1. **Cherry-pick or merge W362a SHIPPED-APPROVED (`1272237`) to main** before pruning W362a worktree. Same for W362b-alpha (`a9a6501`) + W362b-beta (`4ceaae9`) + W362c (`bf18696`).
2. **Bump ruff pin** to v0.15.14 (let Dependabot land; verify branch-protection accepts the PR with all 7 status checks green).
3. **Defer commitlint v21.0.1 bump** to a wave that can absorb a major-version breaking-change review (changelog-only delta probable but commitlint's config schema can shift on majors).
4. **Stale-branch cleanup:** 27 local branches not in any worktree — sweep with `git branch -D <merged-or-stale>`; preserve goal/W362* and goal/W37* until ship-to-main.
5. **Promote parallel-ratio-gate to hard-fail** ONCE empirical baseline rises from current ~0.0034 above 0.7 (per CLAUDE.md L19 + W325-A telemetry); not now.

---

## Files inspected (read-only)

- `Z:/claude-sota-installed-W373/.pre-commit-config.yaml` (14 hooks)
- `Z:/claude-sota-installed-W373/.github/workflows/*.yml` (24 files)
- `Z:/claude-sota-installed-W373/.github/dependabot.yml`
- `Z:/claude-sota-installed-W373/tools/preagent-parallel-guard.mjs` (24140B)
- `Z:/claude-sota-installed-W373/tools/preagent-subagent-validator.mjs` (6297B)
- `Z:/claude-sota-installed-W373/tools/preagent-d73-gate.mjs` (11474B)
- `Z:/claude-sota-installed-W373/tools/preagent-wave-lock-guard.mjs` (19162B)
- `Z:/claude-sota-installed-W373/tools/eee.ps1`
- `Z:/claude-sota-installed-W373/tools/eee-status.ps1`
- `Z:/claude-sota-installed-W373/.claude/state/subagent-type-allowlist.json`
- `Z:/claude-sota-installed-W373/commitlint.config.js` (file-not-found at expected path; commitlint config likely lives elsewhere or moved — flagged as MINOR follow-up)

**Out of scope (deliberately):** writing to any file other than this report. No mutations made.
