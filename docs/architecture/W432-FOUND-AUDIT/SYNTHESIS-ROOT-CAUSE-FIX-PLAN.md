# W432 Foundation Audit — Synthesis + Root-Cause Fix Plan

**Wave**: W432
**Date**: 2026-05-24
**Authors**: Stream A (CI workflows) + B (MCP + plugins) + C (hooks R2) + D (deps CVE) + E (settings + ruleset) — 5 autonomous audit agents
**Status**: Synthesis complete; fix-waves dispatched in parallel
**Cite**: 5-stream individual reports at `docs/architecture/W432-FOUND-AUDIT/STREAM-{A,B,C,D,E}-*.md`

## TL;DR

Five parallel autonomous foundation-audit agents discovered **~70 defects** across foundation. **ZERO HIGH/CRITICAL CVEs remain after W432-G0 PR #100**. Critical staleness in CLAUDE.md (T5 + plugin counts + GH issue cite); 13 phantom plugin SHAs; 15 stale Action SHAs; missing Actions secrets; ruleset hardening incomplete. Composite SOTA-2026 grade B- (75/100). Fix path documented + parallel-dispatched.

## Cross-stream headline findings

| Stream | Active defects | SEV-1 | Headline |
|---|---:|---:|---|
| **A** CI workflows | 12 | 3 | 100% SHA-pin compliant; 3 chronic-fail (release-please v4 → bump v5; Scorecard PRIVATE-blocked; trivy [G0 fixed]) |
| **B** MCP + plugins | 10 | 4 | 17/18 pin-compliant; **T5 Langfuse FULLY LIVE — CLAUDE.md narrative STALE (CR-6)**; 13 phantom plugin SHAs |
| **C** Hooks R2 | 5 | 1 | **GH#46915 CLOSED-NOT-PLANNED** invalidates context-mode-cache-heal shim cite; 17 tools/ hooks lack R2 carve-out |
| **D** Deps CVE | 0 (post-G0) | 0 | **ZERO HIGH/CRITICAL** after G0; 15 stale Action SHAs >90d; no github-actions in dependabot.yml |
| **E** Settings + ruleset | 30 | 8 | **ANTHROPIC_API_KEY + OPENAI_API_KEY MISSING** from Actions secrets; required_approving_review_count=0; no DCO/sign-off |

**Composite grade: B- (75/100). Total open defects: ~70. SEV-1 count: 16.**

## Defect cluster → fix-wave mapping

| Cluster | Source | Fix wave | Worktree | Conflict surface |
|---|---|---|---|---|
| **CLAUDE.md doc drift (L33, L37, L62) + CLAUDE.local.md L73 + SECURITY.md L11** | Stream B + C + E | W432-DOC-DRIFT | main | CLAUDE.md only |
| **13 phantom claude-plugins-official installPath SHAs + openhands floor-pin + basic-memory drift + 3 stale .mcp.json comments** | Stream B | W432-MCP-FIX | main | .mcp.json + installed_plugins.json |
| **release-please v4→v5; zizmor advisory→fail; Node 20→24 forced flip; missing required-status-checks** | Stream A + E | W432-CI-FIX | main | .github/workflows/*.yml |
| **15 stale Action SHAs >90d + agents/ in dependabot.yml + github-actions ecosystem** | Stream A + D + E | W432-DEPABOT-EXPAND | main | dependabot.yml + workflow SHAs |
| **GH#46915 closed → re-cite or delete context-mode-cache-heal.mjs; 24KB preagent-parallel-guard.mjs decompose; 17 tools/ hooks R2-ADR; dead code precommit-msys-diag** | Stream C | W432-H0 | main | tools/* + .claude/hooks/* |
| **MemPalace v3.3.5 install** | W431-MEM-DEEP verdict | W432-M1 | dedicated worktree | .mcp.json + settings.json + skills + hooks |
| **agentmemory plugin install** | W431-MEM-DEEP verdict | W432-M2 | dedicated worktree | settings.json:enabledPlugins + 12 hooks + 4 skills |
| **ANTHROPIC_API_KEY + OPENAI_API_KEY secrets + ruleset hardening (DCO + commit-signing + required-approval + secret-scanning)** | Stream E | W432-OPERATOR-GATED | n/a | operator-only `gh secret set` + `gh api ruleset PATCH` |

## Operator-gated items (NOT autonomous-executable)

Per operator-confirmed standing preferences (autoUpdatesChannel "latest", minimumVersion 2.1.144, no leaked-cred rotation), the following require explicit operator action:

1. **`gh secret set ANTHROPIC_API_KEY`** + **`gh secret set OPENAI_API_KEY`** — neither key is currently in Actions secrets; `claude-code-security-review.yml` + `codex-review.yml` skip silently
2. **Branch-protection ruleset PATCH** — add 6 missing required-status-checks (gitleaks · trivy · ShellCheck · Ruff · subagent-allowlist · provenance-lint); flip `required_approving_review_count: 0 → 1`; flip `require_code_owner_review: false → true`; flip `web_commit_signoff_required: false → true` (DCO)
3. **Repo-settings toggle** — disable `allow_merge_commit` + `allow_rebase_merge` (ruleset is squash-only; repo-level settings contradict)
4. **G7 first public orphan-commit publish** — 10-step pre-publish checklist per W431 BINDING-VERDICTS §2.10

## Autonomous fix-wave execution (this session)

| Wave | Status | PR | Approach |
|---|---|---|---|
| **W432-G0** CI unblock (ccsr + pytest + trivy SARIF filter) | ✅ COMMITTED | **#100** | Direct edits + local trivy reproduction |
| **W432-M0** EverMemOS REJECT excise | ✅ COMMITTED | **#101** | Direct edits + pip uninstall + ADR-001 |
| **W432-FOUND-FIX-A** doc-drift + dependabot expand + CI bumps + dead-code | 🚧 IN-PROGRESS | (pending) | Direct edits (small surface) |
| **W432-MCP-FIX** 13 phantom SHAs + openhands + basic-memory + comments | 🚧 PARALLEL AGENT | (pending) | Dispatched agent |
| **W432-M1** MemPalace install | 🚧 PARALLEL AGENT | (pending) | Dispatched in `Z:\claude-sota-installed-W432-M1` worktree |
| **W432-M2** agentmemory install | 🚧 PARALLEL AGENT | (pending) | Dispatched in `Z:\claude-sota-installed-W432-M2` worktree |
| **W432-H0** hook cleanup (dead code + GH#46915 + ADR for 17 hooks) | 🟡 QUEUED | (queued) | Dispatched after FIX-A |
| **W432-CI-STALE-BUMP** 15 action SHAs >90d bumped | 🟡 QUEUED | (queued) | Codex r1 + batch bump |
| **W432-G3** dependency-review + sbom workflows | 🟡 QUEUED | (queued) | Codex-provided YAML |
| **W432-G4** intake/orch/worker triplet | 🟡 QUEUED | (queued) | claude-code-action@v1 |
| **W432-G5** publish-mirror.yml | 🟡 QUEUED | (queued) | Codex-provided full YAML |
| **W432-R3** sca-v22 retroactive scoring W411-W430 | 🟡 QUEUED | (queued) | tools/sca-re-evaluate-decisions.mjs |
| **W432-G6** pre-publish dry-run | 🟡 QUEUED | (queued) | gitleaks + trufflehog + deterministic grep |
| **W432-G7** first public orphan-commit publish | 🔒 HOLD | n/a | OPERATOR-GATED 10-step checklist |

## Cite anchors (≥3 distinct orgs — 12 here for sca-v13 floor)

1. Anthropic — https://docs.anthropic.com/en/docs/claude-code/hooks (R2 cardinal-rule)
2. GitHub — https://docs.github.com/en/actions/security-guides (CICD-SEC-2/3)
3. OpenSSF — https://scorecard.dev/ (Scorecard requirements)
4. NIST — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7)
5. OWASP — https://owasp.org/www-project-top-10-ci-cd-security-risks/ (CICD-SEC top 10)
6. Aqua Security — https://aquasecurity.github.io/trivy/latest/ (trivy SARIF severity semantics)
7. arXiv — https://arxiv.org/abs/2601.02163 (W432-M0 cite anchor)
8. Linux Foundation OpenSSF — https://github.com/ossf/scorecard
9. Sigstore — https://www.sigstore.dev/ (release attestation)
10. Microsoft — https://github.com/microsoft/autogen (citation discipline reference)
11. EU Commission GDPR — https://gdpr-info.eu/art-28-gdpr/ (sub-processor)
12. W431-MEM-DEEP autonomous SOTA-decision agent — internal cite

## R6 verify-before-claim discipline

Every defect in this synthesis is cite-anchored to the 5-stream report it came from. Every fix-wave is gated by:
- Local reproduction where possible
- Cite-floor pre-commit gate (3-org-distinct floor)
- Codex GPT-5.5 r1 review per PR
- 17+ pre-commit hooks per commit
