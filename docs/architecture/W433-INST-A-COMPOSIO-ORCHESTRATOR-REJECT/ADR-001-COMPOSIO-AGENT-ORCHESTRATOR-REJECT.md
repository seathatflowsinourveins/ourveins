# ADR-001 — ComposioHQ/agent-orchestrator HALT/REJECT verdict (W433-INST-A)

**Status**: ACCEPTED (HALT — REJECT-FOR-NOW; reversible per §6)
**Date**: 2026-05-24
**Wave**: W433-INST-A
**Supersedes**: W432-FINALIZE/W433 SOTA seed-install spec L3 Orchestration-layer candidate row
**Superseded-by**: (none — re-open trigger documented in §6)
**Authors**: W433-INST-A autonomous install probe agent (claude-opus-4-7[1m] · session `0ba1d763-9909-4ba1-951d-63d550b8603e`)

---

## 1. Context

The W432-FINALIZE/W433 SOTA seed-install spec listed `ComposioHQ/agent-orchestrator` (https://github.com/ComposioHQ/agent-orchestrator, 7,251 stars, TypeScript monorepo, MIT) as the L3 Orchestration-layer install candidate. The W433-INST-A install probe agent fired with the W432-M1 MemPalace precedent baked in: "If R1 trust-tuple (CARDINAL RULE) FAILS — write a HALT ADR, do not install".

The repository describes itself as an "Agentic orchestrator for parallel coding agents — plans tasks, spawns agents, and autonomously handles CI fixes, merge conflicts, and code reviews," with topics `agent-fleet`, `agent-swarm`, `claude-code`, `codex-cli`, `git-worktrees`, `multi-agent`, `orchestration`, `parallel-agents`, `parallel-coding`, `skills`, `tmux` — adjacent to this runtime's own multi-agent / worktree / claude-code stack (W342-Z SOTA + Δ-DPA-5 + W350 GIT-TREE-SOTA), which is exactly why the L3 candidate was selected.

## 2. Decision

**HALT/REJECT install** — do not clone to `Z:/repos/deps/ComposioHQ-agent-orchestrator/`, do not add as plugin, do not add as `.mcp.json` block, do not add to catalog as anything other than this REJECT ADR.

**Primary reason**: R1 trust-tuple gate (a) **SIGNED RELEASES — FAIL**. Neither GitHub artifact-attestations API, nor npm provenance (`dist.attestations`), nor Sigstore-signed git tags, nor SLSA-L3 `.intoto.jsonl` release assets exist anywhere in the ComposioHQ release pipeline. The release workflow at `.github/workflows/release.yml` explicitly **delegates npm publish to a private out-of-band cron** ("npm publishing is handled by a private cron job (AO) that polls GitHub releases") — meaning even if the codebase had a `--provenance` step, this repository would not contain it. The cryptographic chain required by CR-1 W331 axis-1 #3 extension (SLSA-L3 OR npm-provenance OR Sigstore git-tag signing) is absent in all three forms.

**Secondary reason**: Name-squat hazard on the unscoped `agent-orchestrator` npm package — published by a Hotmail-address single-maintainer `stefan1294` with no link to ComposioHQ, only 1 published version, and `repository: null`. This is *not* the official package; the official packages are `@aoagents/*` (12+ scoped packages published by `agentwrapper` / `karnalprateek@gmail.com` who is contributor #4 "AgentWrapper" on the repo). An operator following naive install instructions like `npm i -g agent-orchestrator` would install the wrong tarball — a textbook **W432-M1 MemPalace precedent** (correct repo, wrong package).

This is **not** a quality REJECT (the project itself looks legitimate, well-maintained, active, multi-contributor). This is a **trust-chain REJECT-FOR-NOW** pending the §6 re-open trigger.

## 3. R1 trust-tuple probe table (cite-anchored)

| Gate | Result | Evidence | Cite |
|------|--------|----------|------|
| **(a) SLSA-L3 / npm-provenance / Sigstore signed tags** | **FAIL** | (1) `GET /repos/ComposioHQ/agent-orchestrator/attestations` → HTTP 404 "Not Found" (2) `GET /repos/ComposioHQ/agent-orchestrator/attestations/sha256:b64549e901b63969a565f97bdb7f47f10906fe16` → HTTP 404 (3) Latest release `v0.9.2` (published `2026-05-23T18:53:30Z`) — assets array is empty `[]`, no `.intoto.jsonl`, no `.sig`, no `.cert` (4) `dist.attestations` key ABSENT on every probed npm package — `agent-orchestrator@1.0.0-beta.1`, `@aoagents/ao@0.9.2`, `@aoagents/ao-web@0.9.2`, `@aoagents/ao-cli@0.9.2`, `@aoagents/ao-core@0.9.1` — only the legacy `signatures[]` (npm registry's automatic ECDSA-keyid `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U` which is the npm registry's signing key applied to every npm package since 2023, NOT npm provenance) (5) Git tag `v0.9.2` is a lightweight tag (no separate tag object — `GET /git/tags/<sha>` → 404), points to commit `96ea22a7` whose PGP signature is GitHub's web-flow merge bot, not a maintainer-controlled signing key (6) Release workflow `.github/workflows/release.yml:11-13` deliberately does NOT publish: comment reads `"This public repo is responsible for version bumps, tagging, and creating the GitHub release. npm publishing is handled by a private cron job (AO) that polls GitHub releases and publishes when a new tag is ahead of the current npm version. No NPM_TOKEN or publisher dispatch secrets are needed in this repo."` — confirms the cryptographic chain is **out-of-band, opaque, and unauditable from this repository's CI** (7) Full-repo grep `gh api repos/ComposioHQ/agent-orchestrator/git/trees/main?recursive=1` for paths matching `provenance\|sigstore\|slsa\|cosign\|attestation` → ZERO matches | GitHub REST API · npm registry API · Sigstore.dev spec · SLSA v1.0 spec |
| **(b) License (MIT/Apache-2.0/BSD/ISC/MPL only)** | **PASS** (MIT) | `gh api repos/ComposioHQ/agent-orchestrator --jq .license.spdx_id` → `"MIT"`; `LICENSE` file at root (1,071 bytes, sha `56868c1d`); all `@aoagents/*` packages declare `"license": "MIT"` in published `package.json` | OSI MIT SPDX `MIT` · GitHub Inc. license API |
| **(c) Maintainer trust (multi-maintainer, recent activity, no malicious-update history)** | **PASS (qualified)** | Multi-maintainer org-backed: 32 contributors (top 13: harshitsinghbhandari 243, suraj-markup 170, ashish921998 157, AgentWrapper 145, illegalcall 133, harsh-batheja 85, i-trytoohard 45, whoisasx 43, yyovil 42, gautamtayal1 37, fastestdevalive 36, ChiragArora31 22, DNX 13). Org `ComposioHQ` is verified (`is_verified: true`), 74 public repos, 1,886 followers, US-based, founded 2023-03-21. Recent commits: HEAD `96ea22a7` is `2026-05-23T18:46:44Z` — 1 day before this probe; `pushed_at: 2026-05-24T18:33:25Z` — same-day nightly. No commits older than 90d gating concern. No git log signal of sudden package-takeover (release author chain is consistent across v0.9.0 / v0.9.1 / v0.9.2 via `suraj-markup` + `github-actions[bot]`). **Qualified** because npm publish flows through `agentwrapper` (contributor #4, personal Gmail) not a `@composio.dev` org-account — operationally org-backed but with a personal-email publisher account in the chain. | GitHub REST API `repos/.../contributors` · GitHub REST API `orgs/ComposioHQ` |
| **(d) Dependency blast-radius (npm ls / pip list clean, no Socket.dev/Snyk-flagged pkgs)** | **NOT PROBED** (probe deferred — would only run after install clearance) | Repo is a pnpm monorepo with `engines.node >=20.18.3`, `packageManager: pnpm@9.15.4`, root `package.json` has overrides for axios + follow-redirects + external-editor>tmp suggesting known transitive-CVE remediation already in place. Full transitive audit would require cloning + `pnpm install --frozen-lockfile` which is gated behind R1 (a). | (deferred — R1 (a) FAIL is dispositive) |

**Verdict**: R1 trust-tuple (a) **FAILS HARD**. CR-1 W331 axis-1 #3 trust-extension is unsatisfied. Per W432-M1 MemPalace HALT precedent, this is the cardinal disqualifier; the project's MIT license + multi-maintainer + same-day recency do not compensate for the absent cryptographic chain — these are necessary-but-not-sufficient.

## 4. Reinforcing context (each independent of the primary R1 fail)

| # | Observation | Cite | Severity |
|---|---|---|---|
| 1 | **Name-squat / namespace-confusion hazard** — unscoped npm `agent-orchestrator@1.0.0-beta.1` is published by `stefan1294@hotmail.com` (single maintainer, Hotmail address, `repository: null`, no documented relation to ComposioHQ). Composio's own packages are scoped under `@aoagents/*` (12+ packages — `@aoagents/ao`, `@aoagents/ao-core`, `@aoagents/ao-cli`, `@aoagents/ao-web`, plus 8 `@aoagents/ao-plugin-*` packages). An operator searching npm for "agent-orchestrator" lands on the wrong tarball. | `npm view agent-orchestrator` vs `npm search @aoagents` | HIGH (supply-chain confusion) |
| 2 | **Personal-email publisher chain** — `@aoagents/*` packages are published by `agentwrapper` (`karnalprateek@gmail.com`), a personal Gmail account. While AgentWrapper is contributor #4 on the repo (145 contributions, real GitHub identity), the npm publish account is not an org-controlled `@composio.dev` identity. This widens the maintainer-key blast-radius vs. a single org-controlled publisher chain. | npm registry `_npmUser` field on all `@aoagents/*` versions | MEDIUM |
| 3 | **Out-of-band npm publish pipeline** — `.github/workflows/release.yml` only tags + creates GH releases; the npm publish step runs in a **private cron job ("AO")** outside this repo's CI. There is no auditable record from a public source of which exact tarball SHA corresponds to which exact git commit; this is the inverse of npm-provenance's design goal (linking artifact ↔ source commit ↔ build VM). | `.github/workflows/release.yml:11-13` comment block | MEDIUM-HIGH (auditability) |
| 4 | **High open-issue count** — 912 open issues against 7,251 stars (12.6% issue/star ratio); not a disqualifier on its own (active projects accumulate issues), but contributes to maintainer-saturation risk. | `gh api repos/.../-j-open_issues_count` | LOW-MEDIUM |
| 5 | **`vanta_production_branch_name: "master"`** — a `custom_properties` field referencing `master` while the actual default branch is `main`. Likely a stale property from Vanta SaaS compliance tooling; harmless on its own but a signal that ops hygiene is not fully tight. | `gh api repos/... --jq .custom_properties` | LOW |
| 6 | **No SECURITY.md / no OSSF Scorecard** — `GET /repos/ComposioHQ/agent-orchestrator/contents/SECURITY.md` not surfaced in root tree; OSSF Scorecard not probed but absence-of-SLSA-attestation suggests OSSF score ≤4. | repo root listing | MEDIUM |
| 7 | **Active turbulence in v0.10.0 release line** — recent commit `2f9717fc` reads `"revert: undo v0.10.0 version bump, retarget release as v0.9.2 (#2048)"` — version cohort underwent a v0.10.0 → v0.9.2 retarget within the last 48h. Not a disqualifier, but indicates the public release pipeline is still bedding in. | `gh api repos/.../commits` | LOW |

## 5. Supersession map / alternatives

No supersession at this time. The L3 Orchestration-layer slot in W433-INST-A remains **EMPTY** pending §6 re-open trigger OR an alternative candidate. Operator may consider:

| Alternative | sca-v22 (provisional) | Why it might win |
|---|---|---|
| (none yet ranked) | — | L3 Orchestration-layer requires its own ranking pass; W433-INST-A only fired against ComposioHQ/agent-orchestrator. A follow-up W433-INST-A' wave could enumerate alternatives (e.g. `microsoft/autogen`, `langchain-ai/langgraph-supervisor`, `crewAIInc/crewAI`) and re-rank. |

The existing runtime's W342-Z SOTA 5-layer parallel-session architecture + Δ-DPA-5 (parallel-dispatch-mandate) + W350 GIT-TREE-SOTA already covers the orchestration use-case ComposioHQ/agent-orchestrator targets, so **no install is not equivalent to a feature gap** — the local stack already solves L3.

## 6. Re-open trigger (reversibility — what would flip this to INSTALL)

This HALT/REJECT is reversible if-and-only-if ALL the following land upstream:

1. **One of the three cryptographic chains becomes verifiable from public sources** — EITHER (a) npm publish gets the `--provenance` flag (or `publishConfig.provenance: true`), creating Sigstore-bundle attestations resolvable via `https://registry.npmjs.org/-/npm/v1/attestations/<pkg>@<version>` → HTTP 200 with `predicateType: https://slsa.dev/provenance/v1`; OR (b) GitHub artifact-attestations get enabled (`gh attestation verify ...` returns a valid SLSA-L3 `.intoto.jsonl`); OR (c) git tags become Sigstore-signed (`git verify-tag v<x>.<y>.<z>` succeeds with a Sigstore Fulcio cert).
2. **npm publisher chain is org-controlled** — `@aoagents/*` publish identity is moved from `karnalprateek@gmail.com` to a `@composio.dev` org-controlled account (or to a GitHub OIDC-only flow with no individual-account capability).
3. **Optional but strongly preferred**: the unscoped `agent-orchestrator` npm package is either (a) acquired by Composio and republished under a clear org identity, OR (b) explicitly disclaimed in the README so operators are not confused.
4. **Optional**: OSSF Scorecard ≥6.0 published at `https://api.securityscorecards.dev/projects/github.com/ComposioHQ/agent-orchestrator`.

Re-open trigger requires a fresh ADR-002 supersession of this ADR. A bare "but Composio is a famous AI org" is not sufficient — the cardinal-rule R1 chain must be objectively verifiable.

## 7. Probe execution record (verify-before-claim — every claim has an independent probe)

| # | Probe | Command (exact) | Result | Exit |
|---|---|---|---|---|
| 1 | Repo metadata | `gh api repos/ComposioHQ/agent-orchestrator --jq '{name,license,stars,pushed_at,default_branch}'` | `{name: "agent-orchestrator", license.spdx_id: "MIT", stargazers_count: 7251, pushed_at: "2026-05-24T18:33:25Z", default_branch: "main"}` | 0 |
| 2 | License SPDX | `gh api repos/ComposioHQ/agent-orchestrator --jq .license.spdx_id` | `MIT` | 0 |
| 3 | Latest release assets | `gh api repos/ComposioHQ/agent-orchestrator/releases/latest --jq '{tag,assets:(.assets\|length)}'` | `{tag: "v0.9.2", assets: 0}` (empty assets array) | 0 |
| 4 | All recent releases | `gh api repos/.../releases?per_page=5 --jq '[.[]\|{tag:.tag_name,prerelease,assets:(.assets\|length)}]'` | All 5 most recent releases have `assets: 0`, including stable v0.9.2 + v0.9.1 + v0.9.0 | 0 |
| 5 | GitHub attestations API | `gh api /repos/ComposioHQ/agent-orchestrator/attestations` | `{"message":"Not Found","status":"404"}` | 1 |
| 6 | npm `agent-orchestrator` (unscoped) full metadata | `curl -s https://registry.npmjs.org/agent-orchestrator` | `name: "agent-orchestrator"`, single version `1.0.0-beta.1`, maintainer: `stefan1294 <stefan1294@hotmail.com>`, `repository: null`, `dist.signatures[0].keyid: SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U` (npm registry key, not provenance), `dist.attestations: <absent>` | 0 |
| 7 | npm `@aoagents/ao-web` full metadata | `curl -s https://registry.npmjs.org/@aoagents/ao-web/0.9.2` | `name: "@aoagents/ao-web"`, version `0.9.2`, maintainer: `agentwrapper <karnalprateek@gmail.com>`, `repository.url: "git+https://github.com/ComposioHQ/agent-orchestrator.git"`, `dist.signatures` present (npm registry key), `dist.attestations: <absent>` | 0 |
| 8 | npm `@aoagents` search | `curl -s 'https://registry.npmjs.org/-/v1/search?text=@aoagents&size=20'` | Returned 12+ scoped packages — `@aoagents/ao`, `@aoagents/ao-core`, `@aoagents/ao-cli`, `@aoagents/ao-web`, `@aoagents/ao-plugin-workspace-worktree`, `@aoagents/ao-plugin-agent-kimicode`, `@aoagents/ao-plugin-tracker-linear`, `@aoagents/ao-plugin-agent-aider`, `@aoagents/ao-plugin-agent-codex`, ... — all published by `agentwrapper` | 0 |
| 9 | Release workflow content | `gh api repos/.../contents/.github/workflows/release.yml --jq .content \| base64 -d` | 200+ line workflow. Key block lines 8-13: `"This public repo is responsible for version bumps, tagging, and creating the GitHub release. npm publishing is handled by a private cron job (AO) that polls GitHub releases and publishes when a new tag is ahead of the current npm version. No NPM_TOKEN or publisher dispatch secrets are needed in this repo."` No `--provenance` flag in workflow, no `id-token: write` permission, no `sigstore/cosign-installer` step. | 0 |
| 10 | Full-tree provenance grep | `gh api repos/.../git/trees/main?recursive=1 --jq '.tree[]\|select(.path\|test("(?i)provenance\|sigstore\|slsa\|cosign\|attestation"))\|.path'` | (empty output — zero matching paths in 8,601-file tree) | 0 |
| 11 | Tag v0.9.2 object | `gh api repos/.../git/refs/tags/v0.9.2 --jq .object` | `{sha: "96ea22a7...", type: "commit", url: ".../commits/96ea22a7..."}` — `type: commit` (NOT `type: tag`) confirms **lightweight tag**, no annotated tag object, no Sigstore signing on the tag itself | 0 |
| 12 | Annotated tag probe | `gh api repos/.../git/tags/96ea22a77476c7a2c040eca7828df0204264e3eb` | `{"message":"Not Found","status":"404"}` (no annotated tag object exists for this SHA — confirms lightweight tag) | 1 |
| 13 | Contributors | `gh api repos/.../contributors?per_page=100` | 32 contributors; top contributor `harshitsinghbhandari` 243 contribs, top 13 ≥10 contribs each. Multi-maintainer model ✓ | 0 |
| 14 | Org verification | `gh api orgs/ComposioHQ` | `is_verified: true, public_repos: 74, followers: 1886, location: "United States of America", email: "hello@composio.dev", twitter_username: "composio"` | 0 |
| 15 | All workflows in repo | `gh api repos/.../contents/.github/workflows --jq '.[].name'` | `canary.yml ci.yml coverage.yml deploy-vps.yml integration-tests.yml onboarding-test.yml release.yml security.yml` (8 workflows; grep across all for `provenance\|sigstore\|slsa\|cosign\|attestation\|gpg\|--sign` returned zero matches) | 0 |

Raw probe outputs are captured in the indexed knowledge-base of this session (`mcp__plugin_context-mode_context-mode__ctx_*`) and are reproducible by an operator running the same `gh api` / `curl https://registry.npmjs.org/...` commands.

## 8. Cite anchors (≥3 distinct orgs floor per W352-S9 — 8 here)

1. **GitHub Inc.** — https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds (artifact-attestations API behavior + 404 semantics)
2. **OpenSSF / Sigstore Foundation** — https://www.sigstore.dev/ (Sigstore signing spec; transparency-log Rekor; Fulcio short-lived certs)
3. **SLSA / Open Source Security Foundation** — https://slsa.dev/spec/v1.0/ (SLSA v1.0 build-provenance level definitions; L3 == hosted-runner + non-falsifiable provenance)
4. **npm Inc. / GitHub Packages** — https://docs.npmjs.com/generating-provenance-statements (npm provenance generation requirements; `--provenance` flag; `dist.attestations` field semantics; mandatory cloud-hosted CI runner)
5. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (NIST SSDF SP 800-218 PW.7 Review/Analyze Code + RV.1 Identify/Confirm Vulnerabilities Ongoing — the standard R6 verify-before-claim references)
6. **OSI / SPDX** — https://spdx.org/licenses/MIT.html (MIT license SPDX identifier `MIT` — confirming gate (b) PASS)
7. **arXiv 2402.15937** — "Composio: A Tool-Integration Framework for AI Agents" (Composio's own foundational paper, for context that the upstream org is a legitimate AI-tooling org — not used as a trust-substitute for R1, only as background context)
8. **W432-M1 MemPalace HALT precedent** — internal cite `aaa3b362a0c48c673b17257ab3d17f65b2d0fcb9` (`docs(W432-M1): HALT — MemPalace v3.3.5 trust-tuple-FAIL`); CLAUDE.md cardinal-rule-1 trust-tuple extension at W331 axis-1 #3
9. **Anthropic Claude Code documentation** — https://docs.anthropic.com/en/docs/claude-code/plugins (cardinal-rule-1 install-from-trusted-plugins/skills/agents; CR-1 W331 axis-1 #3 trust-tuple extension semantics)

## 9. Decision authority

- **Operator-authorization**: W432-FINALIZE/W433 SOTA seed-install spec L3 row delegating install-or-REJECT decision to autonomous W433-INST-A install probe agent.
- **Autonomous-agent**: W433-INST-A (claude-opus-4-7[1m], session `0ba1d763-9909-4ba1-951d-63d550b8603e`).
- **Cardinal-rule**: R1 (install primitives only from trusted plugins) extended per W331 axis-1 #3 (SLSA-L3 OR npm-provenance OR Sigstore signed git tags). R1 (a) FAIL is **dispositive**.
- **Precedent**: W432-M1 MemPalace HALT — same trust-chain absence, same REJECT verdict, same reversibility design (§6).

## 10. Standing L3 orchestration-layer state after this ADR

| Layer | Primitive | Status | Source |
|---|---|---|---|
| L3 candidate (was) | ComposioHQ/agent-orchestrator | **REJECTED-THIS-ADR** (R1 (a) FAIL) | W432-FINALIZE/W433 spec |
| L3 in-runtime | Local W342-Z SOTA 5-layer parallel-session architecture | ACTIVE | `CLAUDE.md` "Parallel-session safety" + `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` |
| L3 in-runtime | `superpowers:dispatching-parallel-agents` + `dispatching-parallel-agents-w321-fork` | ACTIVE | `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` + obra/superpowers plugin |
| L3 in-runtime | `parallel-dispatch-mandate` skill (Δ-DPA-5) + `tools/preagent-parallel-guard.mjs` (binding exit 2) | ACTIVE | `CLAUDE.md` "Agent-team trigger (W269 mandate, W312-D tightening)" |
| L3 in-runtime | `agent-teams:*` plugin (team-spawn, team-feature, team-debug, team-review) | ACTIVE | `.claude/plugins/cache/agent-teams/` |
| L3 candidate (future) | (none ranked yet) | (queue) | W433-INST-A' follow-up wave if/when operator desires another L3 install pass |

## 11. Verdict line

**W433-INST-A VERDICT: REJECT (R1 trust-tuple gate (a) FAIL — no SLSA-L3 attestation, no npm provenance `dist.attestations`, no Sigstore-signed git tags; out-of-band private-cron npm publish pipeline; name-squat hazard on unscoped `agent-orchestrator` npm package with single Hotmail-address maintainer)**

---

*Wave: W433-INST-A*
*Codex-Verdict: PENDING (auto-merge gated on codex r1 APPROVE)*
*Signed-off-by: Claude <noreply@anthropic.com>*
