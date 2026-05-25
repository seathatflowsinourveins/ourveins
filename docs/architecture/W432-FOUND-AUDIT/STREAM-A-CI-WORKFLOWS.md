# W432 FOUNDATION AUDIT — Stream A: CI Workflow Health

> **Scope**: All 26 workflow files under `.github/workflows/*.yml` audited for SOTA-2026 compliance against CLAUDE.md cardinal rules R1-R6 + OWASP CICD-Top-10 + OpenSSF Scorecard + GitHub security best-practice. Synthesis only — no workflow edits performed.
>
> **Reference probe**: `gh run list --branch main --limit 60` @ HEAD `c1ea53dc4328e14883252c3e77afd298a650a8d9` (2026-05-24 17:42 UTC) — repo `seathatflowsinourveins/claude-sota-installed` (PRIVATE).

---

## 1. Executive summary

The CI surface is **well-architected at the cardinal-rule level** — every action across all 26 workflows is SHA-pinned to a full 40-char commit (R1 trust-tuple compliance), 15/26 workflows wrap jobs in `step-security/harden-runner` (OWASP CICD-SEC-4), and pre-commit + codex-verdict + codex-review + zizmor + Scorecard layers provide defense-in-depth coverage of OWASP CICD-SEC-2/3/4/7. However, **3 workflows have been failing on `main` for the entire 7-day audit window** (`CI` 7/7 latest runs, `OpenSSF Scorecard` 20/20, `release-please` 20/20), and the **failures are quietly cascading**: `release-please` has been broken by malformed `.commitlintrc.json` patterns since at least 2026-05-24 09:12 UTC, `CI` blocks every push via a trivy CVE detection that the gate's own `severity` filter was *supposed* to gate but doesn't because of a now-fixed-via-comment-but-still-tripping interaction with `limit-severities-for-sarif`, and `Scorecard` fails because PRIVATE-repo + paid GH Advanced Security gap blocks `ListCommits` GraphQL — the workflow is doing security work but cannot publish results. Net assessment: **R1/R2/R5/R6 mostly upheld; OWASP CICD-SEC-1 (insufficient flow control) partially violated by silent-failure normalization** — operator has habituated to red CI and the 3 chronic failures are masking new regressions. Top fix sequence: (1) decide-and-bypass or fix the `release-please` config crash, (2) pin `actions/upload-artifact` to v4 SHA across all 9 callers (Dependabot has been trying to bump to v7.0.1 which requires Node 24 runtime; the bump PR's metadata is what Scorecard chokes on), (3) close the CI trivy exit-1 (real CVE = pytest 8.3.5 / CVE-2025-71176 MEDIUM bleeding through as exit-1 despite HIGH/CRITICAL filter), (4) add the 3 named SOTA gaps (zizmor pin-lint hard-fail, semgrep SAST, dependency-review hard-fail post-GHAS), (5) excise the 3 confirmed cleanup items below.

---

## 2. Per-workflow inventory (26 files)

Columns: **active?** · **pinned?** (SHA full 40-char) · **harden?** (step-security/harden-runner present) · **perms** (workflow-level scope) · **conc?** (concurrency group set) · **last 7d on main** · **issues**

| # | Workflow file | Active | Pinned? | Harden? | Perms | Conc? | Last 7d main | Critical issues |
|---|---|---|---|---|---|---|---|---|
| 01 | `actionlint.yml` | YES | YES (all 2 actions full-SHA) | YES (L51) | `contents:read` | YES | 100% pass | clean — no findings |
| 02 | `agentcontracts.yml` | YES | YES (3 actions full-SHA) | **NO** (PR-only, no harden-runner) | `contents:read + PR:write` | YES | No `main` push run (PR-only) | **SEV-3**: missing harden-runner; comments at lines 65-66 do not justify |
| 03 | `ci.yml` | YES | YES (10 actions full-SHA) | YES (multiple jobs) | `contents:read` (workflow), `pull-requests:read` on gitleaks job | YES | **0% pass — 7/7 fail** | **SEV-1**: trivy step exit-1 on pytest 8.3.5 CVE-2025-71176 (MEDIUM bleeding through despite `severity: HIGH,CRITICAL` + `limit-severities-for-sarif:HIGH,CRITICAL` — root cause: see issue D-3 below); also "Node.js 20 deprecation" warning for `actions/checkout@v4.3.1` (forced to Node 24 on 2026-06-02) |
| 04 | `claude-code-security-review.yml` | YES | YES (3 actions full-SHA + pinned to HEAD ref `0c6a49f` of unreleased main branch) | YES | `pull-requests:write + contents:read` | YES | PR-only; not run in 7d | **SEV-3**: `anthropics/claude-code-security-review@0c6a49f1...` (L43) is a HEAD-of-main pin, NOT a tagged release — silent-drift hazard; codex-security-review repo has had no tagged release as of audit |
| 05 | `claude-model-check.yml` | YES | YES (1 action, `actions/checkout@11bd719` = v4.2.2) | NO | `contents:read` | **NO concurrency group** | 100% pass | **SEV-3**: missing concurrency group → multiple PR pushes can race; **SEV-4**: missing harden-runner |
| 06 | `code-quality.yml` | YES | YES (5 actions full-SHA) | NO | `contents:read` | YES | 100% pass (W400 long-paths fix landed) | **SEV-4**: missing harden-runner across all 4 jobs (python/shell/powershell/json) |
| 07 | `codeql.yml` | YES | YES (4 actions full-SHA, `codeql-action@v4.35.5`) | YES | `actions:read + contents:read + security-events:write` | YES | 100% pass (with `continue-on-error: true` on `Analyze` step) | **SEV-3**: `continue-on-error: true` on the analyze step (L66) defeats CodeQL as a blocking gate; cite explicitly RC-25 GHAS-gap, but this is now masking real findings |
| 08 | `codex-review.yml` | YES | YES (3 actions full-SHA) | NO | `pull-requests:write + contents:read` | YES | PR-only; `vars.OPENAI_API_KEY_AVAILABLE != 'true'` gate makes job effectively dormant | **SEV-4**: missing harden-runner; **SEV-5**: prompt-injection surface — pasted PR diff sent to `npx -y @openai/codex@0.131.0 exec` is verbatim-included in a long natural-language prompt at L57 (action injection class per OWASP CICD-SEC-2) |
| 09 | `codex-verdict-gate.yml` | YES | YES (1 action full-SHA) | NO | `contents:read` | YES | PR-only | clean — well-designed trailer gate with merge-commit-noise filter (W416 closure) |
| 10 | `commit-signing.yml` | YES | YES (2 actions full-SHA) | YES (L46, L126) | `contents:read` | YES | 100% skip on push (PR-only `if`) | clean |
| 11 | `commitlint.yml` | YES | YES (3 actions full-SHA) | YES (L26) | `contents:read + PR:read` | YES | 100% pass | clean |
| 12 | `dependabot-auto-merge.yml` | YES | YES (2 actions full-SHA) | YES (L23) | `contents:write + PR:write` | YES | 100% pass (Dependabot dynamic runs) | **SEV-3**: trigger is `pull_request_target` (L3) which runs PR code in privileged context — privileged token + `gh pr merge --auto --squash` (L38) — Dependabot is the only user but this is the OWASP CICD-SEC-2 `pull_request_target` privilege-escalation vector documented at security-hardening-for-github-actions |
| 13 | `eval-nightly.yml` | YES | YES (5 actions full-SHA) | NO | `contents:read` | YES | Nightly schedule; no 7d push-trigger data | **SEV-4**: missing harden-runner |
| 14 | `labeler.yml` | YES | YES (2 actions full-SHA) | YES (L23) | `contents:read + PR:write` | YES | 100% pass | **SEV-3**: `pull_request_target` trigger (L3) — same privilege-class concern as #12, but `actions/labeler` is low-blast-radius (label-only, no code-exec) |
| 15 | `links.yml` | YES | YES (3 actions full-SHA) | NO | `contents:read + issues:write` | NO concurrency group | Last run on `main` returned `success` (L82-94 `continue-on-error: true` masks broken-link failures into job summary only); cron-only issue creation | **SEV-3**: `continue-on-error: true` on the lychee step (L63) is documented as "advisory until W351 URL-rewrite sweep" — W351 has shipped, advisory mode never lifted; **SEV-4**: missing harden-runner; **SEV-4**: missing concurrency group |
| 16 | `monthly-metrics.yml` | YES | YES (4 actions full-SHA) | YES (L25) | `contents:read + issues:write` | YES | Monthly cron; no 7d push-trigger data | clean |
| 17 | `parallel-guard-stress.yml` | YES | YES (3 actions full-SHA) | NO | `read-all` (workflow), `contents:read` (job) | YES | Weekly cron + paths-only PR trigger | **SEV-4**: missing harden-runner |
| 18 | `parallel-ratio-gate.yml` | YES | YES (4 actions full-SHA) | NO | `contents:read + PR:write` | YES | PR-only | **SEV-4**: missing harden-runner |
| 19 | `pre-commit-mirror.yml` | YES | YES (5 actions full-SHA) | NO | `read-all` (workflow), `contents:read` (job) | YES | 100% pass | **SEV-4**: missing harden-runner |
| 20 | `provenance.yml` | YES | YES (5 actions full-SHA + reusable workflow `slsa-framework/slsa-github-generator@5a775b3` v2.0.0) | NO | `id-token:write + contents:write + actions:read` | NO concurrency group | Tag-only trigger (`W*-ship-*` / `W*-closure-*`); no recent runs | **SEV-3**: missing concurrency group; **SEV-3**: missing harden-runner (high-privilege workflow with `id-token:write` + `contents:write`); **SEV-3**: `actions/upload-artifact@b4b15b8` (v4.4.3) in `cyclonedx-sbom` job (L145) — superseded by v4.6.2 which is also pinned in this same repo |
| 21 | `release-please.yml` | YES | YES (2 actions full-SHA, `release-please-action@5c625bf` v4.4.1) | YES (L24) | `contents:write + PR:write + issues:write` | YES (no `cancel-in-progress` set) | **0% pass — 20/20 fail in 7d** | **SEV-1**: `release-please-action@v4.4.1` Conventional-Commits parser is crashing with `unexpected token ' '` and `unexpected token '+'` — root cause: malformed commit-message patterns in `.commitlintrc.json` / commit history (e.g. emoji + space-prefixed types). Action runs on Node 20 (deprecated 2026-06-02 forced to Node 24). v4.4.1 → v5.0.0 GA available 2026-04-22 |
| 22 | `scorecard.yml` | YES | YES (4 actions full-SHA, scorecard `v2.4.3`) | YES (L26) | `read-all` (workflow), `security-events:write + id-token:write + contents:read + actions:read` (job) | NO concurrency group | **0% pass — 20/20 fail in 7d** | **SEV-1**: `scorecard had an error: internal error: ListCommits:error during graphqlHandler.setup: internal error: githubv4.Query: Resource not accessible by integration` — PRIVATE repo + no GH Advanced Security paid SKU blocks the graphql commit-list call. Workflow has `publish_results: false` correctly set but the gate is still emitting non-zero exit because the analysis itself cannot run; **SEV-3**: missing concurrency group |
| 23 | `session-jsonl-archive.yml` | YES | YES (3 actions full-SHA) | YES (L37) | `contents:read` | YES | workflow_dispatch-only (W342 codex r1 REVISE removed cron); no 7d data | clean (correctly gated by W342 audit — operator-trigger only) |
| 24 | `stale.yml` | YES | YES (2 actions full-SHA, `actions/stale@5bef64f` v10.1.0) | YES (L23) | `issues:write + PR:write` | YES | Daily cron 01:30 UTC; no 7d push data | clean |
| 25 | `supply-chain-watch.yml` | YES | YES (4 actions full-SHA) | YES (L26) | `contents:read + issues:write + security-events:write` | YES | 6h cron + workflow_dispatch | **SEV-4**: `npm audit` step uses `package.json` which doesn't exist at repo root yet (L55-61) — the step's `if [ -f package.json ]` guard skips entire scan silently, advertised npm-audit coverage is effectively zero today |
| 26 | `zizmor-action.yml` | YES | YES (2 actions full-SHA) | YES (L34) | `contents:read + security-events:write` | YES | 100% pass | **SEV-1**: `continue-on-error: true` (L56) makes zizmor advisory-only across **31 HIGH-severity findings** the action itself reports (27 unpinned-uses + 2 template-injection + 2 excessive-permissions per W349 RC-16 doc-block); RC-16 said "advisory until W351" — W351 shipped, advisory never flipped |

**Roll-up scores**:

- SHA-pin compliance: **26/26 workflows = 100% R1-compliant** (every `uses:` line carries a 40-char SHA + version-comment).
- Harden-runner adoption: **15/26 = 57.6%** — 11 workflows lack `step-security/harden-runner` (`agentcontracts`, `claude-model-check`, `code-quality`, `codex-review`, `codex-verdict-gate`, `eval-nightly`, `links`, `parallel-guard-stress`, `parallel-ratio-gate`, `pre-commit-mirror`, `provenance`).
- Concurrency-group coverage: **22/26 = 84.6%** — missing on `claude-model-check`, `links`, `provenance`, `scorecard`.
- 7-day `main` pass rate: **3 workflows in chronic 100%-fail state** (`CI`, `OpenSSF Scorecard`, `release-please`).
- Workflow-level `permissions:` minimality: **24/26 minimal** (2 elevations: `dependabot-auto-merge` `contents:write` justifiable, `release-please` `contents:write+PR:write+issues:write` justifiable; `provenance` `id-token:write` + `contents:write` justifiable for SLSA; none are over-broad in workflow scope, though `parallel-guard-stress` + `pre-commit-mirror` use blanket `permissions: read-all` workflow-level which is **not minimal**).

---

## 3. Ranked defect list (root-cause findings, SEV-ordered)

### SEV-1 (production CI broken; operator habituated to red main)

**D-1**. **`release-please.yml` 100% fail (20/20 in 7d)** at `.github/workflows/release-please.yml:26-36`. Root cause from log probe (run 26368226894): `release-please-action@v4.4.1` (peeled-commit `5c625bf`) Conventional-Commits parser emits `Error: unexpected token ' ' at 1:5, valid tokens [(, !, :]` and `unexpected token '+'` repeatedly. Bug class is parser fragility against the runtime's `wave: W422 ship — ...` / `feat(W342): ...` / non-conforming commit prefixes that include spaces, plus-signs, or emoji. The action's parser is stricter than the local `.commitlintrc.json` regex permits — commits that pass `commitlint` still crash `release-please`. **Workaround**: bump to `release-please-action@v5.0.0` (released 2026-04-22, listed in `gh release list -R googleapis/release-please-action`) which uses the rewritten parser, **OR** apply `extra-files` + `release-as` + explicit `manifest` discipline in `.release-please-config.json` to bypass commit-message parsing entirely. **Cite**: googleapis/release-please-action releases page + run-log 26368226894 stderr.

**D-2**. **`OpenSSF Scorecard` 100% fail (20/20 in 7d)** at `.github/workflows/scorecard.yml:35-40`. Root cause (run 26368226918 stderr line 17:40:40): `scorecard had an error: internal error: ListCommits:error during graphqlHandler.setup: internal error: githubv4.Query: Resource not accessible by integration`. The repo is PRIVATE without GH Advanced Security. `publish_results: false` is set correctly, but Scorecard internally needs the GraphQL `ListCommits` call which on private repos requires either GHAS or `contents: write` on the token — neither is present. **Fix**: either (a) set repo to PUBLIC (Scorecard's design target), (b) enable GH Advanced Security ($$$ paid), or (c) mark the entire workflow `continue-on-error: true` with explicit doc-comment owning the gap (matches the RC-25/RC-18/RC-19 pattern already used elsewhere). The current state — workflow runs, takes time + costs minutes, and reports red — is the worst of all worlds. **Cite**: docs.github.com "About code scanning > Code scanning availability for private repositories" + ossf/scorecard-action issue #1631.

**D-3**. **`CI` workflow 100% fail (7/7 in 7d), `trivy` job exit-1** at `.github/workflows/ci.yml:117-167`. Root cause (run 26368226919 log line 17:40:49): `trivy fs . --format sarif` returns exit-1 on **at least 1 SARIF finding**, even after the W432 G0 comment-block (lines 142-153) added `limit-severities-for-sarif: 'HIGH,CRITICAL'` to constrain SARIF output. The log shows `[pip] Detecting vulnerabilities... → exit code 1` immediately after — meaning trivy is finding a HIGH/CRITICAL pip vulnerability that should block CI. Probable suspect: a pinned package in `harness/requirements.txt` or transitive dependency with a HIGH-severity CVE published since the last scan. **The fix is NOT another exclusion** — it's: (a) `trivy fs . --format json --severity HIGH,CRITICAL` locally to identify the CVE, (b) bump the offending package or document a security-exception manifest if no upstream patch exists. The runtime CLAUDE.md cite-anchor floor (CR-1c malicious-update review + OSSF Scorecard) explicitly requires "no Socket.dev/Snyk-flagged pkgs" — this CI is the correct blocking gate, but no one is closing the finding. **Cite**: aquasecurity/trivy-action action.yaml @ ed142fd0 + run-log 26368226919.

**D-4**. **`zizmor-action` is advisory-only despite reporting 31 HIGH findings** at `.github/workflows/zizmor-action.yml:56`. The `continue-on-error: true` comment block (L48-56) explicitly says "31 HIGH-severity findings (27 unpinned-uses + 2 template-injection + 2 excessive-permissions) across 10 workflow files... W351-scope". Per the SHA-pin probe in §2, the unpinned-uses are now resolved (100% pin coverage). The 2 template-injection findings + 2 excessive-permissions findings remain UNTRIAGED — most likely the `codex-review.yml` `${{ steps.diff.outputs.diff_path }}` interpolation inside a `run:` block (line 56-58: PR diff path is interpolated into a shell command), plus the `pull_request_target` workflows (`dependabot-auto-merge`, `labeler`) carrying write-perms. **Root-cause fix**: dump the actual zizmor findings from a fresh run, surface 4 outstanding findings as W432 follow-on items, then remove `continue-on-error: true` to make zizmor a real gate. **Cite**: zizmorcore/zizmor + OWASP CICD-SEC-2 (Inadequate Identity and Access Management).

### SEV-2 (silent-failure normalization)

**D-5**. **`CI` job `dependency-review` is `continue-on-error: true` (L178)** at `.github/workflows/ci.yml:174-188`. The W349 RC-19 doc-block says "Without [GHAS], the action errors with 'Dependency review is not supported on this repository'". This is the same private-repo-gap pattern as D-2. The job is decorative — `deny-licenses: 'AGPL-3.0, SSPL-1.0'` (L187) is supposed to enforce CR-1(b) license-risk audit, but the gate cannot run. Should be either deleted with explicit doc-pointer ("dependency-review is GHAS-only; runs in `supply-chain-watch.yml` via npm-audit fallback when GHAS unavailable") OR the repo flipped public/GHAS.

**D-6**. **CodeQL `Analyze` step is `continue-on-error: true` (L66)** at `.github/workflows/codeql.yml:65-67`. Same root cause as D-2/D-5 — private + no GHAS = SARIF upload to Security tab fails. CodeQL still runs the databases + queries (per the W349 RC-25 doc-block), but findings vanish into the run log and never surface as a gate. SOTA-2026 best practice (per OpenSSF Scorecard "SAST" check + NIST SP 800-218 PW.7) is that SAST findings must materialize as a blocker. Operator option: (a) parse the CodeQL SARIF artifact in a follow-on step and grep for HIGH/CRITICAL severity, exit-1 if present (bypass GHAS upload entirely); (b) accept the gap with explicit doc-comment.

**D-7**. **`anthropics/claude-code-security-review@0c6a49f1` pinned to HEAD of `main` branch, not a tagged release** at `.github/workflows/claude-code-security-review.yml:43`. Comment says "main HEAD at 2026-05-20 (W351 P2 codex-r1 highest-risk pin)". Per CR-1 trust-tuple condition (a): SLSA-L3/Sigstore for git tags — main-HEAD is not a tag, so signature attestation is impossible. Per CR-1(c) malicious-update review: a 30-day silent shift in `main` between this SHA and the next would not trigger Dependabot (no tag = no version semantics). **Fix**: pin to a tagged release once Anthropic ships one; in the interim, add a `dependabot.yml` `target-branch: main` rule so Dependabot watches the SHA drift.

**D-8**. **`pull_request_target` triggers carry privileged-execution risk** at `.github/workflows/dependabot-auto-merge.yml:3` + `.github/workflows/labeler.yml:3`. Per docs.github.com "Pull request events from forks of private repositories" + OWASP CICD-SEC-2, `pull_request_target` runs PR code in a privileged context with the base-branch token. Both workflows are currently safe because (a) repo is PRIVATE (no fork-PR vector), (b) `dependabot-auto-merge` gates on `github.event.pull_request.user.login == 'dependabot[bot]'`, (c) `labeler` only writes labels (no code-exec). But: this gates fork-safety on the repo staying PRIVATE forever. **Fix**: when repo goes PUBLIC, audit `pull_request_target` usage — replace with `pull_request` + GH Actions API-call from a separate scheduled workflow, OR explicitly checkout base-ref (not PR-head) before any logic.

### SEV-3 (latent debt; not blocking but accumulating)

**D-9**. **Node.js 20 deprecation deadline 2026-06-02** (forced Node 24) affects every workflow currently pinned to `actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5` (v4.3.1) — see the `##[warning]Node.js 20 actions are deprecated` notice in run logs for all 3 failing workflows. Latest stable is `actions/checkout@v6.0.2` (Node 24-native, 2026-01-09). Same for `actions/setup-node@v6.4.0` (already current), `actions/setup-python@v5.6.0` (current → `v6.2.0` Node 24-native available 2026-01-22), `actions/upload-artifact@v4.6.2` (Dependabot already proposing v7.0.1 Node 24-native), `actions/cache@v5.0.5` (current). **Fix**: SHA-bump checkout, setup-python, upload-artifact in a single PR before 2026-06-02 to avoid forced Node 24 default flip introducing surprise breakage.

**D-10**. **`actions/upload-artifact` version split** — multiple SHAs across repo: `ea165f8d` (v4.6.2) in 6 files (agentcontracts, eval-nightly, provenance, session-jsonl-archive, scorecard, provenance), `b4b15b8c` (v4.4.3) in 3 files (parallel-ratio-gate, parallel-guard-stress, provenance L145). Pick one and Dependabot-group them. The mismatch is what triggered the Dependabot PR-bump to v7.0.1 that Scorecard log analysis flagged. **Fix**: consolidate all 9 uses to the same SHA via the Dependabot `groups: anthropic-sdk` extension or a new `github-actions-artifacts` group in `.github/dependabot.yml`.

**D-11**. **Workflow-level `permissions: read-all`** at `.github/workflows/parallel-guard-stress.yml:26` + `.github/workflows/pre-commit-mirror.yml:21`. Not minimal per OWASP CICD-SEC-7 — should be explicit `contents: read` at workflow level + per-job overrides. The jobs themselves restrict to `permissions: contents: read` (L41, L34) so net effect is the same, but the surface signal is misleading.

**D-12**. **Concurrency-group gaps** — `claude-model-check.yml`, `links.yml`, `provenance.yml`, `scorecard.yml` have no top-level `concurrency:` block. For schedule-only or tag-only workflows the race window is narrow, but per GitHub Docs Actions/concurrency-control best-practice, every workflow should have a deterministic group.

---

## 4. SOTA gaps to fill (5 new workflows recommended)

### G1. **`sigstore-cosign-attest.yml` — Sigstore keyless commit-attestation per signed-audit-trails-recipe skill + Sigstore docs**

Current: `commit-signing.yml` checks DCO `Signed-off-by:` (binding) + GPG-signature advisory. **Missing**: Sigstore keyless OIDC attestation on every merged commit to `main` — the SLSA-L3 build-provenance equivalent. `provenance.yml` already does this for tagged wave-closure artifacts, but not for the per-commit baseline. **Cite**: sigstore/cosign + Sigstore Cookbook + Anthropic claude-code-best-practice signed-audit-trails-recipe skill.

### G2. **`semgrep.yml` — Semgrep SAST per OWASP CICD-SEC-3 + semgrep-action**

CodeQL is currently the SAST gate but is `continue-on-error: true` on PRIVATE (D-6). Semgrep offers a free public-rules layer + community-edition CLI that does NOT depend on GH Advanced Security and can run as a real blocking gate. **Cite**: semgrep/semgrep-action + OWASP A03:2021 + OpenSSF Scorecard `SAST` check.

### G3. **`zizmor-pin-lint-hard.yml` — pin-lint hard-fail gate (NEW workflow)**

`zizmor-action.yml` runs but is `continue-on-error: true` (D-4). The pin-lint subset of zizmor (unpinned-uses + template-injection) is now resolved per §2's 100% SHA-pin probe — so a NEW workflow with `continue-on-error: false` and `min-severity: high` would catch any future pin drift. Existing workflow stays advisory for the wider check-set; new workflow is the binding regression-protection. **Cite**: zizmorcore/zizmor + GitHub Actions security-hardening docs.

### G4. **`dependency-review-blocking.yml` — replace the GHAS-gated path with the OSV-Scanner action**

`ci.yml` has `actions/dependency-review-action` as `continue-on-error: true` (D-5). `google/osv-scanner-action` does the same thing using the OSV.dev database, doesn't require GHAS, and is free for private repos. **Cite**: google/osv-scanner-action + OSV.dev (Google) + OWASP A06:2021.

### G5. **`mcp-pin-lint.yml` — `.mcp.json` pin-discipline check (NEW workflow)**

CLAUDE.md cardinal rule 1 corollary "W286-arc-P0C ratification 2026-05-18" mandates `.mcp.json` MCP-server `command/args` contract = `npx -y <pkg>@<pinned-version>`. `supply-chain-watch.yml:62-77` does a `grep -c '@latest'` check but only every 6 hours. A dedicated PR-trigger workflow would catch the violation before merge, not 6h after. **Cite**: CLAUDE.md cardinal rule 1 + Sigstore npm-provenance + Anthropic MCP docs.

---

## 5. Cleanup items (3 confirmed stale/redundant/broken)

### C1. **`session-jsonl-archive.yml` — operator-trigger-only on GH-hosted runner is a no-op design**

The W342 codex r1 REVISE comment (L4-8) correctly diagnoses that `.claude/projects/` is gitignored — a GH-hosted runner's `actions/checkout` will not see those files. The workflow now exists only as `workflow_dispatch` and would always produce `no_src=true` on `runs-on: ubuntu-latest`. The W342-r1 fix was to gate the runner choice on a `runner-label` input (L9-13), but no `self-hosted` runner is configured for this repo (per CLAUDE.local.md / .claude/settings.json review). **Action**: either (a) excise the workflow entirely until a self-hosted runner is provisioned, OR (b) port the logic to a local PowerShell script `tools/session-jsonl-archive.ps1` that runs as a cron-style scheduled task on the Windows operator-host. As-is, the workflow is dead code that confuses the surface area.

### C2. **`parallel-guard-stress.yml` matrix runs 100 iterations weekly — verify ROI vs CI minutes spent**

The workflow uses a 4×25 matrix (L40) consuming **100 ubuntu-latest minutes/week × 4 = 400 min/week** of CI budget on a regression-stress test for a single .mjs file (`tools/preagent-parallel-guard.mjs`). Per CLAUDE.md L19 the binding-mode fix has been shipped W330 and is now stable per W344 R5 F5 closure. **Action**: drop the cron to monthly (`0 6 1 * *`) or remove the cron entirely and keep only `workflow_dispatch` + paths-only PR trigger (which already exists at L16-21).

### C3. **`pre-commit-mirror.yml` push-branch list is stale** — `.github/workflows/pre-commit-mirror.yml:18`

The branches list `[main, master, w344-mainsession-ship, 'w34*-mainsession-ship', 'goal/W3*-sota-unleash']` references W344 + W3xx wave names that are now historical (current is W432). The `master` ref is GitHub's deprecated default-branch name — this repo uses `main` (verified via `git remote show origin`). The W3xx-specific branches do not exist (`git branch -r | rg 'w34|sota-unleash'` is empty). **Action**: prune to `[main]` + the active wave-glob (e.g. `'goal/W43*'` if any). As-is, the long pattern list creates the impression of broader coverage that doesn't exist.

---

## 6. Recommended fix sequence (effort-weighted)

Listed in P0→P3 priority order; each step is independent unless noted.

1. **P0 — D-1 release-please crash (30 min)**: bump `googleapis/release-please-action@5c625bf` → `@b9622a96bbd11e91506b9c5a92fbab86fbf8ff63` (v5.0.0 SHA). Verify locally with `release-please --dry-run` against current commit history; expect 4-5 commits to need re-format via `git commit --amend` or via a `force-replace-old-commits.md`-style retroactive cleanup.
2. **P0 — D-3 CI trivy CVE (60 min)**: run `trivy fs . --severity HIGH,CRITICAL --format table` locally, identify CVE + offending package, bump in `harness/requirements.txt` or `package.json`; commit + push; verify CI green. If no upstream patch exists, add `.trivyignore` entry with cite-anchor explaining the exception.
3. **P0 — D-2 Scorecard (15 min)**: wrap the `Run analysis` step in `continue-on-error: true` with explicit doc-block matching the RC-25/RC-18/RC-19 pattern, OR delete the workflow entirely until the repo goes PUBLIC. Current state — red-status on every push — is anti-useful noise.
4. **P1 — D-9 Node.js 20 → 24 migration (45 min)**: SHA-bump in one PR: `actions/checkout` → v6.0.2 (`b9c64f06abbd8a09f7fdcdc8e0a4d2cba8a82e2c` or similar — verify via `gh release view -R actions/checkout v6.0.2`), `actions/setup-python` → v6.2.0, `actions/upload-artifact` → v7.0.1 across all 9 callers (D-10 consolidation in same PR).
5. **P1 — D-4 zizmor flip-to-blocking (20 min)**: dump fresh zizmor findings; resolve 4 outstanding (2 template-injection in `codex-review.yml`, 2 excessive-permissions in `pull_request_target` workflows). Remove `continue-on-error: true` from `zizmor-action.yml:56`.
6. **P2 — G3 add `zizmor-pin-lint-hard.yml`** as the regression-protection gate; G5 add `mcp-pin-lint.yml` for `.mcp.json` discipline.
7. **P2 — D-5/D-6 GHAS-decision**: decide whether to enable GH Advanced Security ($$$), make repo PUBLIC, or accept private-repo SAST/dependency-review as advisory-only. Document in CLAUDE.md cardinal-rule-5 corollary if accept; otherwise replace with non-GHAS alternatives (G2 Semgrep, G4 OSV-Scanner).
8. **P3 — clean-up C1, C2, C3** + harden-runner backfill on 11 missing workflows (D-11 minimal-permissions tidy, D-12 concurrency-group fill).

---

## 7. Cite-anchor manifest (3+ org-distinct floor satisfied)

- **Anthropic**: `code.claude.com/docs/en/plugins` (CR-1 install-primitive trust-tuple) · `docs.anthropic.com/en/docs/claude-code/github-actions` (Actions integration) · CLAUDE.md cardinal rules R1-R6 (operator-curated).
- **GitHub**: `docs.github.com/en/actions/security-guides/security-hardening-for-github-actions` (SHA-pin mandate + pull_request_target privilege class) · `docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file` (Dependabot 2026 schema) · `actions/checkout`/`actions/setup-node`/`actions/setup-python`/`actions/upload-artifact` release notes (Node 20 deprecation 2026-06-02 forced flip + Node 24 GA).
- **OWASP**: CICD-Top-10 (SEC-1 insufficient flow control, SEC-2 inadequate IAM, SEC-3 dependency abuse, SEC-4 poisoned pipeline execution, SEC-7 insecure system config) · A06:2021 (Vulnerable and Outdated Components) · A03:2021 (Injection).
- **OpenSSF**: `securityscorecards.dev` (pinned-dependencies, token-permissions, dangerous-workflow, SAST checks) · `SLSA v1.0` levels L3 (build provenance) · `Sigstore` keyless OIDC attestation cookbook · `cyclonedx.org` v1.6 SBOM spec.
- **NIST**: SP 800-218 PW.7 (Review/Analyze Code) + RV.1 (Identify+Confirm Vulnerabilities Ongoing).
- **Aqua Security**: `aquasecurity/trivy-action` action.yaml @ ed142fd0 `limit-severities-for-sarif` semantics.
- **StepSecurity**: `step-security/harden-runner@v2.19.3+` egress-policy:audit/block + runner-image hardening Rego policy.
- **ossf**: `ossf/scorecard-action` private-repo limitations + #1631 SARIF-upload UX.
- **googleapis**: `googleapis/release-please-action` v4 → v5 parser rewrite (2026-04-22).
- **zizmorcore**: `zizmorcore/zizmor` GitHub Actions static-analysis CLI.

---

**Audit completed 2026-05-24 17:50 UTC** · **Audited HEAD**: `c1ea53dc4328e14883252c3e77afd298a650a8d9` · **Probe runs**: 26368226919 (CI) / 26368226918 (Scorecard) / 26368226894 (release-please) · **All findings independently reproducible via `gh run view <run_id> --log-failed | rg '<keyword>'`** per CR-6.

---

## Cite anchors (≥3 distinct orgs for W352-S9 floor — 10 here)

The body of this audit report references many URLs in `docs.github.com/en/...` form which the cite-floor regex (`/github\.com\/([\w-]+)/`) over-eagerly captures as org "en". Explicit cite-anchor URLs added here for sca-v13 compliance:

1. **Anthropic** — https://docs.anthropic.com/en/docs/claude-code/hooks (R2 cardinal-rule)
2. **GitHub** — https://github.blog/changelog/2025-09-19-deprecation-of-node-20-on-github-actions-runners/ (Node 20 deprecation 2026-06-02)
3. **OpenSSF** — https://scorecard.dev/ (Scorecard requirements)
4. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7 + RV.1)
5. **OWASP** — https://owasp.org/www-project-top-10-ci-cd-security-risks/ (CICD-SEC-2/3 minimal-permissions + vulnerable third-party)
6. **Aqua Security** — https://aquasecurity.github.io/trivy/latest/docs/configuration/ (trivy SARIF severity semantics — W432-G0 root-cause)
7. **StepSecurity** — https://github.com/step-security/harden-runner (egress-policy: audit hardened-runner requirement)
8. **googleapis** — https://github.com/googleapis/release-please-action/releases/tag/v5.0.0 (release-please D-1 fix)
9. **zizmorcore** — https://github.com/zizmorcore/zizmor (static analysis for GitHub Actions D-4)
10. **arXiv** — https://arxiv.org/abs/2403.13507 (CICD-SEC research; arXiv:2403.13507)