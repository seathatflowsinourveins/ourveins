# W331 Stream-GIT — SOTA Git Practice Synthesis (P0-5 items b/c/d/e/f)

> **Wave**: W331 Stream-GIT
> **Date**: 2026-05-19
> **Branch**: `goal/W331-sota-convergence` (HEAD `2add8fc`)
> **Worktree**: `Z:/claude-sota-installed` (primary)
> **Deliverable scope**: design + paste-ready snippets ONLY; NO destructive operations from this session.

## §1 Item-B — Worktree Prune

**Verdict**: AUDIT-COMPLETE. 6 worktrees → recommend reduce to ~3-cap by removing 2 SAFE-REMOVE entries; 2 entries STAY-FOR-OPERATOR-DECISION.

| Worktree | Verdict | Rationale |
|---|---|---|
| `Z:/claude-sota-installed` | KEEP (primary) | Current goal/W331-sota-convergence |
| `.claude/worktrees/W328-sota-unleash` | KEEP | Active, recent ship 2026-05-19, 5 unique commits ahead of W331 |
| `Z:/claude-sota-installed-W287` | STAY-FOR-OPERATOR-DECISION | 9 unique commits, possibly operator-locked per W272/W273 precedent |
| `Z:/claude-sota-installed-W290` | STAY-FOR-OPERATOR-DECISION | Uncommitted W295 audit files present |
| `Z:/claude-sota-installed-W321` | **SAFE-REMOVE** | Zero unique commits ahead of W331 (fully merged) |
| `Z:/claude-sota-installed-W330` | **SAFE-REMOVE** | Zero unique commits ahead of W331 (fully merged) |

**Risk**: LOW — preserve-tag pattern (`preserve/W321-pre-prune` + `preserve/W330-pre-prune`) guarantees exact-SHA recovery.
**Reversibility**: FULL — `git worktree add <path> -b <branch> preserve/<tag>` restores.

Full details: `ITEM-B-WORKTREE-PRUNE.md`.

## §2 Item-C — Plugin Re-enable

**Verdict**: AUDIT-COMPLETE — operator-decision-required; default-recommended is KEEP `false`.

- `protect-mcp@claude-code-workflows` v0.1.0 by Tom Farley (MIT) — present in cache, currently disabled.
- `signed-audit-trails@claude-code-workflows` v0.1.0 by Tom Farley (MIT) — present in cache, currently disabled.

Both fail 3 of 4 W331-axis-1 CR-1 trust-tuple fields (signed-release, malicious-update-review, dependency-blast-radius all UNVERIFIED). Recommendation: defer re-enable until Item-D's slsa-verifier lands so trust-tuple is verifiable. Paste-ready settings.json L286-287 edit + rollback documented.

**Risk**: MODERATE on permissive path (Cedar policy gate wraps EVERY tool call — misconfig can block legitimate ops).
**Reversibility**: FULL via single-line settings.json revert.

Full details: `ITEM-C-PLUGIN-REENABLE.md`.

## §3 Item-D — slsa-verifier v2.7.1 Install

**Verdict**: DESIGN-COMPLETE. T1 install + sha256 verify + recursive self-provenance + wrapper helper + 2nd-artifact acceptance test all designed.

Key steps:
1. `gh release download v2.7.1 --repo slsa-framework/slsa-verifier --pattern slsa-verifier-windows-amd64.exe --dir Z:/tools`
2. SHA256 verify against `1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0`
3. Self-verify provenance using slsa-verifier itself (recursive in-toto trust)
4. Wrapper at `tools/slsa-verify-wrap.ps1` for CR-1 trust-tuple checks (skeleton designed)
5. Acceptance: download + verify a 2nd SLSA-attested artifact

**Composite delta**: +0.07 (per CLAUDE.md L43 W329-K-4 ETA).
**Risk**: LOW — single static binary, no system mods.
**Reversibility**: FULL via `Remove-Item`.

Full details: `ITEM-D-SLSA-VERIFIER-INSTALL.md`.

## §4 Item-E — provenance-lint v3 (--safe-edit doc-only)

**Verdict**: SKELETON-COMPLETE at `tools/provenance-lint-v3.mjs` (Phase-0). v2 retained as primary commit-msg gate.

v3 enhancements vs v2:
- Subject-line `APPLIED: <path>` + RFC-2822 git-trailer footer-only (NEVER body prose) — per CLAUDE.md operator mandate.
- `--safe-edit` doc-only fast-path: `docs/**/*.md` + `tmp/**` bypass full pre-commit stash cycle (W329 race-4 prevention).
- Out-of-line ESM file vs v2's inline single-line YAML bash entry.

Migration plan (4 phases): Phase 0 (skeleton this wave) → Phase 1 (full impl + 9-case smoke + advisory-parallel) → Phase 2 (swap to primary) → Phase 3 (delete v2 inline).

**Risk**: LOW for skeleton landing (no behavior change). MEDIUM at Phase-2 swap.
**Reversibility**: FULL via `.pre-commit-config.yaml` single-line revert.

Full details: `ITEM-E-PROVENANCE-LINT-V3.md` + `tools/provenance-lint-v3.mjs` (skeleton).

## §5 Item-F — Branch Protection Audit

**Verdict**: AUDIT-COMPLETE. **N/A on current state** — no git remote configured. Paste-ready remote-wire + protection-apply flow documented for when a remote is provisioned.

- `gh auth status`: logged in as `seathatflowsinourveins` (GITHUB_TOKEN active).
- `git remote -v`: empty.
- Compensating controls in place via `.pre-commit-config.yaml` (gitleaks, ruff, commitlint, provenance-lint, cr2-2kb-hooks).

Recommended policy when remote wired (per sca-v11 D19 + OSSF Scorecard + NIST SSDF):
- 2 required reviews for high-risk paths.
- `enforce_admins: true`, `required_signatures: true`, `allow_force_pushes: false`, `required_linear_history: true`.
- Status-check contexts: `pre-commit`, `provenance-lint`, `cr2-2kb-hooks`.

**Risk**: NONE on current state. LOW for paste-ready commands.
**Reversibility**: FULL via DELETE endpoint.

Full details: `ITEM-F-BRANCH-PROTECTION.md`.

## §6 Aggregate verdicts + risk/reversibility matrix

| Item | Status | Verdict | Risk | Reversibility | Operator-action-required |
|---|---|---|---|---|---|
| B — Worktree prune | AUDIT-COMPLETE | 2 SAFE-REMOVE, 2 STAY-FOR-OPERATOR-DECISION | LOW | FULL | Yes (run paste-ready remove + decide on W287/W290) |
| C — Plugin re-enable | AUDIT-COMPLETE | Default: KEEP `false`; permissive path documented | MODERATE-on-permissive | FULL | Yes (decide on trust-tuple verification path) |
| D — slsa-verifier | DESIGN-COMPLETE | Install + verify + wrapper designed | LOW | FULL | Yes (run install commands; +0.07 composite) |
| E — provenance-lint v3 | SKELETON-COMPLETE | tools/provenance-lint-v3.mjs landed | LOW | FULL | No this wave (Phase 1-3 deferred) |
| F — Branch protection | AUDIT-COMPLETE | N/A (no remote) + paste-ready remote-wire flow | NONE | FULL | Yes (if remote desired) |

### Composite delta tally

- Item-D direct: **+0.07** (sca-v11 §6 Control-1 SLSA-L3 path).
- Item-E indirect: **+0.0 this wave** (skeleton-only); +0.02-0.04 at Phase-2 swap (race-4 prevention measurable).
- Item-B/C/F: structural cleanup + audit-completeness signals, no direct composite delta.

### Cite-anchor sweep (≥3 org-distinct, EXTERNAL-DOMINANT)

| Anchor | Authority | URL/spec | Used in Items |
|---|---|---|---|
| SLSA v1.0 | Linux Foundation OpenSSF | `https://slsa.dev/spec/v1.0/` | D |
| Sigstore | Sigstore project (Linux Foundation) | `https://www.sigstore.dev/` | D |
| in-toto attestations | Linux Foundation CNCF | `https://in-toto.io/` | D |
| OSSF Scorecard | Linux Foundation OpenSSF | `https://securityscorecards.dev/` | C, F |
| NIST SSDF (PO.4, PS.2.1) | NIST (US-gov) | `https://csrc.nist.gov/projects/ssdf` | F |
| Conventional Commits 1.0.0 | Independent spec | `https://www.conventionalcommits.org/en/v1.0.0/` | E |
| RFC-2822 trailer format | IETF | `https://datatracker.ietf.org/doc/html/rfc2822` | E |
| git interpret-trailers | git-scm.com | `https://git-scm.com/docs/git-interpret-trailers` | E |
| GitHub branch-protection API | GitHub Inc. | `https://docs.github.com/en/rest/branches/branch-protection` | F |
| git-worktree semantics | git-scm.com | `https://git-scm.com/docs/git-worktree` | B |
| CycloneDX SBOM | OWASP Foundation | `https://cyclonedx.org/` | (background; not item-specific) |

**Org-distinct count**: 7 (Linux Foundation OpenSSF, Linux Foundation CNCF, NIST, IETF, git-scm.com, GitHub Inc., OWASP Foundation, Sigstore project, conventionalcommits.org) — well above the ≥3 floor.

## Deliverable inventory

| Path | Purpose | Size |
|---|---|---|
| `docs/architecture/W331-SOTA-GIT-PRACTICE/STREAM-GIT-SYNTHESIS.md` | This master synthesis | (current file) |
| `docs/architecture/W331-SOTA-GIT-PRACTICE/ITEM-B-WORKTREE-PRUNE.md` | Worktree audit + paste-ready remove cmds | ~3 KB |
| `docs/architecture/W331-SOTA-GIT-PRACTICE/ITEM-C-PLUGIN-REENABLE.md` | Plugin re-enable audit | ~4 KB |
| `docs/architecture/W331-SOTA-GIT-PRACTICE/ITEM-D-SLSA-VERIFIER-INSTALL.md` | slsa-verifier install design | ~5 KB |
| `docs/architecture/W331-SOTA-GIT-PRACTICE/ITEM-E-PROVENANCE-LINT-V3.md` | v3 design + migration plan | ~4 KB |
| `docs/architecture/W331-SOTA-GIT-PRACTICE/ITEM-F-BRANCH-PROTECTION.md` | Branch protection (N/A + paste-ready) | ~5 KB |
| `tools/provenance-lint-v3.mjs` | Phase-0 ESM skeleton | ~5 KB |

**Total**: 6 markdown docs + 1 skeleton script = 7 deliverables.

## STATUS

**STATUS: COMPLETE** — All 5 items (B/C/D/E/F) delivered as design + paste-ready snippets. Zero destructive operations executed. Budget consumed: ~13 tool calls / well under 70% threshold. Operator-side action required for Items B (2 worktree removes + 2 decisions), C (trust-tuple decision), D (install + acceptance test), F (remote wire). Item E skeleton-only this wave; Phase 1-3 deferred.
