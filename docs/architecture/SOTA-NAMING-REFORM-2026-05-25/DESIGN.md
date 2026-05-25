# SOTA Naming Reform — Wave Numbers Out of Branches, Into Commit-Trailers Only

**Wave**: W439 (provenance)
**Branch**: `feat/research-arch-v23-multi-angle-convergence` (this branch is the EXEMPLAR — new naming convention applied to itself)
**Date**: 2026-05-25
**Status**: APPROVED (operator brainstorm + W439 META-research wave)

---

## §1 — Problem

Current branch namespace shows the drift:

```
goal/W348-carry-cleanup                          # opaque W<N> first
goal/W350-sota-git-tree-foundation              # hybrid
goal/W353-WAVE-CLOSE                            # all-W
goal/W356-research-arch-v19-evolution            # hybrid
feat/research-arch-v18-pipeline-foundation       # NEW STYLE (no W)
feat/W366-git-substrate-hardening               # uppercase W
feat/w354-sota-install-wave                     # lowercase w
chore/w381-github-governance-sota                # lowercase, chore
```

Issues:
1. **Inconsistent prefix** (`goal/` vs `feat/` vs `fix/` vs `chore/` vs `canary/`)
2. **W### opacity** to external collaborators (no semantic meaning)
3. **Case inconsistency** (`W` vs `w`)
4. **No SOTA reference** (Conventional Branches / Conventional Commits 1.0.0)

External readers (codex GPT-5.5, GitHub collaborators, public ourveins mirror viewers) face cognitive cost decoding W###. Internal-only naming is not SOTA.

---

## §2 — Reform (SOTA-aligned)

### 2.1 — Branch naming: `<type>/<topic>` per Conventional Branches

**Type prefix** (required, lowercase):

| Type | Use case |
|---|---|
| `feat/` | New capability, install, or substantive enhancement |
| `fix/` | Bug fix, error remediation, or rollback |
| `chore/` | Routine maintenance, dep-bump, config tweak |
| `docs/` | Documentation-only changes |
| `refactor/` | Code restructure without behavior change |
| `perf/` | Performance improvement |
| `test/` | Test additions or test-infra changes |
| `ci/` | CI/CD pipeline changes (workflows, hooks) |

**Topic** (required, kebab-case, descriptive):

Examples:
- `feat/research-arch-v23-multi-angle-convergence` (this branch)
- `fix/ecc-upstream-rename-reconcile`
- `chore/skill-budget-tune`
- `docs/sota-naming-reform`
- `refactor/wave-lock-validator-perf`
- `perf/parallel-dispatch-ratio-binding-gate`
- `test/codex-verdict-trailer-gate-coverage`
- `ci/zizmor-harden-runner-uplift`

**Forbidden**:
- `W###` prefix anywhere in branch name (use `Wave:` trailer)
- All-caps `WAVE-CLOSE` (use `chore/wave-close-Wnnn`)
- Multi-purpose branches (one type, one topic per branch)

### 2.2 — Commit naming: `<type>(<scope>): <subject>` per Conventional Commits 1.0.0

**Type** (required, lowercase, same as branch types).

**Scope** (optional, lowercase, descriptive — NOT W###):

| Old (W###) | New (topical) |
|---|---|
| `feat(W436-AGENT-TEAM-SOTA):` | `feat(agent-teams):` |
| `fix(W435):` | `fix(plugin-ecc):` |
| `docs(W434-AWESOME-LISTS):` | `docs(awesome-lists):` |
| `feat(W438):` | `feat(research-arch):` |

**Subject** (required, imperative, ≤72 chars).

**Body** (optional, free text).

**Trailers** (REQUIRED for commits that change runtime behavior):

```
Wave: W<N>            # provenance — internal wave tracking
Codex-Verdict: <V>    # APPROVE / BOOTSTRAP / REVISE
```

Existing pre-commit gates already enforce `Wave:` (commitlint `body-must-contain-wave-trailer`) and `Codex-Verdict:` (W335 gate). Behavior unchanged — just relocated.

### 2.3 — Tag naming: semver / calver / wave-pointer

| Tag type | Format | Use case |
|---|---|---|
| **Release tag** | `v<MAJOR>.<MINOR>.<PATCH>` (semver) | Major releases (`v1.0.0`) |
| **Snapshot tag** | `<YYYY>.<MM>.<DD>` (calver) | Date-stamped snapshots (`2026.05.25`) |
| **Wave pointer** | `wave/W<N>` | Convenience pointer to wave-closing commit |

### 2.4 — Doc-file naming: date-stamped + topical

| Doc type | Convention | Example |
|---|---|---|
| Spec | `YYYY-MM-DD-<topic>-design.md` | `2026-05-25-W438-foundation-converge-close-design.md` |
| ADR | `YYYY-MM-DD-<topic>-decision.md` | `2026-05-25-sota-naming-reform-decision.md` |
| Audit report | `YYYY-MM-DD-<topic>-audit.md` | `2026-05-25-stale-refs-audit.md` |
| Wave dir (existing) | `docs/architecture/W<N>-<TOPIC>/` | `docs/architecture/W438-FOUNDATION-CONVERGE/` (preserved as history-of-record) |
| New topic dir | `docs/architecture/SOTA-<TOPIC>-<YYYY-MM-DD>/` | `docs/architecture/SOTA-NAMING-REFORM-2026-05-25/` (this doc's dir) |

---

## §3 — Migration plan

### 3.1 — Forward-only (no retroactive renames)

- **Existing W### branches**: preserved as history-of-record. Closed branches stay closed. Active W### branches finish their cycle under old convention, then close.
- **Existing W### dirs**: preserved as provenance. New work goes into `SOTA-<TOPIC>-<DATE>/` dirs.
- **Existing W### commits**: preserved (immutable git history). New commits follow new convention.

### 3.2 — From W439 forward (this wave is the first under new convention)

- **W439 branch**: `feat/research-arch-v23-multi-angle-convergence` ✅
- **W439 commits**: `feat(research-arch): v23 schema authoring`, `feat(soul): authoring foundation`, etc.
- **W439 trailers**: `Wave: W439` ✅
- **W439 dirs**: `docs/architecture/SOTA-RESEARCH-ARCH-V23/` + `docs/architecture/SOTA-NAMING-REFORM-2026-05-25/` ✅

### 3.3 — Tooling updates required (next-wave deliverables)

- `tools/preagent-wave-lock-guard.mjs` — wave-name extraction from branch should ALSO try `Wave:` trailer in HEAD commit (current extracts `W###` from branch name only); update to accept either source.
- `.commitlintrc.json` — already enforces `Wave: W<N>` trailer; no change.
- `.github/workflows/codex-verdict.yml` — already trailer-driven; no change.
- `eee.ps1` — `-Wave Wnnn` parameter still acceptable; internal-only convention.
- Doc generation: any future scripts that grep branch-names for `W###` should ALSO grep commit trailers.

### 3.4 — CLAUDE.md sync (next commit)

CLAUDE.md must reference both conventions during transition (existing W### work + new topical work). Update §parallel-execution + §Status to clarify.

---

## §4 — Examples (paired old vs new)

| Old (pre-W439) | New (W439-forward) | Notes |
|---|---|---|
| `goal/W438-foundation-converge-close` | `feat/foundation-converge-close` + `Wave: W438` trailer | Branch becomes topical; W438 in trailer |
| `feat(W436-AGENT-TEAM-SOTA): orchestration patterns` | `feat(agent-teams): orchestration patterns\n\nWave: W436` | Scope topical, wave in trailer |
| `goal/W353-WAVE-CLOSE` | `chore/wave-close` + `Wave: W353` trailer | Type=chore, topic=wave-close |
| `docs/architecture/W434-FOUNDATION-COMPLETE/` | (preserved as-is — history-of-record) | No retroactive rename |

---

## §5 — Cite anchors (≥3-org-distinct per W352-S9)

- **Conventional Branches** (Wagoodman + community): https://conventional-branch.github.io/ — `<type>/<topic>` standard.
- **Conventional Commits 1.0.0** (community): https://www.conventionalcommits.org/ — `<type>(<scope>): <subject>` + trailer standard.
- **GitHub Flow** (GitHub Inc.): https://docs.github.com/en/get-started/quickstart/github-flow — topical-branch convention.
- **Semver 2.0.0** (Tom Preston-Werner): https://semver.org/ — release tag convention.
- **Calver** (community): https://calver.org/ — date-stamped tag convention.

---

## §6 — Acceptance criteria

- [ ] This DESIGN.md committed under `docs/architecture/SOTA-NAMING-REFORM-2026-05-25/`
- [ ] First branch under new convention created: `feat/research-arch-v23-multi-angle-convergence` ✅ (W439 wave)
- [ ] CLAUDE.md updated to reference new convention
- [ ] soul.md §7 codifies the convention
- [ ] Tooling-update list in §3.3 captured as W440+ carry-forward tasks

---

## §7 — Open questions for operator

1. **Backfill scope**: should we retroactively rewrite W### branch names? **Recommend NO** — git history is sacred, breaks external references.
2. **Tag policy**: introduce semver `v1.0.0` at next public-publish (G7 to ourveins)? **Recommend YES** — public face needs versioning.
3. **Wave-number range**: continue W### increment forever, or switch to date-based wave-IDs (`wave-2026-05-25-001`)? **Recommend continue W### for trailer-only use** — operator habit preserved, public face never sees it.
