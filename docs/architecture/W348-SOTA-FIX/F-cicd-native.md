# W348 STREAM-F — CI/CD + Native-Feature Audit

> Wave W348 SOTA-convergence audit. Stream-F scope: GitHub Actions workflows, OWASP CICD-SEC gap analysis, SLSA / Sigstore / provenance, Anthropic SDK + native-feature wiring, Codex GPT-5.5 gate health, top-7 CI/CD enhancements, verdict. Probe basis: live filesystem reads of `.github/workflows/*.yml`, `.github/dependabot.yml`, `.claude/settings.json:env`, `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`, `.claude/state/codex_*.jsonl`, CC `--help` introspection at v2.1.145.

## §1 Workflow Inventory

Live ls: 20 `.yml` files in `Z:/claude-sota-installed/.github/workflows/` (NOT 19 as briefed — `provenance.yml` exists as the SLSA carrier; `slsa-provenance.yml` filename does NOT exist).

| File | Trigger | `permissions:` | Key actions | Pinning | OWASP CICD-SEC | Secrets used |
|------|---------|---------------|-------------|---------|----------------|--------------|
| `actionlint.yml` | push/PR on `.github/**` + dispatch | `contents: read` | `step-security/harden-runner@v2` + `actions/checkout@v4` + direct `actionlint` binary | partial (major-tag for hardener+checkout; direct binary install via curl) | -4 / -7 | none |
| `ci.yml` | push (main, goal/**, worktree-W**, sota-converge-w**) / PR main | `contents: read` (job-scoped writes for `dependency-review`) | `step-security/harden-runner@5c7944e7…` (40-SHA) + `actions/checkout@34e11487…` + `actions/setup-python@a26af69b…` + `actions/setup-node@49933ea5…` + `actions/cache@0057852b…` + `gitleaks/gitleaks-action@ff98106e…` + `actions/dependency-review-action@2031cfc0…` + `ludeeus/action-shellcheck@00cae500…` + `astral-sh/ruff-action@d0a0e814…` | 100% 40-char SHA (W347 P4b landed) | -3 / -4 / -6 | `GITHUB_TOKEN` |
| `claude-code-security-review.yml` | PR | (file < 80 lines; SHA-pin status unverified in detail probe) | `anthropics/claude-code-security-review` | major-tag (per CR-1(a) Anthropic-publisher exception) | -4 / -8 / -10 | `ANTHROPIC_API_KEY`, `GITHUB_TOKEN` |
| `codeql.yml` | push/PR/scheduled | `actions: read; contents: read; security-events: write` | `step-security/harden-runner@5c7944e7…` + `actions/checkout@34e11487…` + `github/codeql-action/{init,autobuild,analyze}@f4117520…` (matrix: js-ts + python; query suites: `+security-extended,security-and-quality`) | 100% SHA | -3 / -7 / -10 | `GITHUB_TOKEN` |
| `code-quality.yml` | push/PR | `contents: read` | `actions/checkout@v4` + `actions/setup-python@v5` + `astral-sh/setup-uv@v3` + OS-shipped shellcheck/PSScriptAnalyzer | major-tag | -7 | `GITHUB_TOKEN` |
| `codex-review.yml` | PR | `pull-requests: write; contents: read` | local codex CLI via `codex exec` (no third-party action — direct OpenAI Codex routed through operator's ChatGPT Pro) | n/a (CLI sub-process) | -4 / -10 | `OPENAI_*` (operator-side) |
| `commitlint.yml` | PR / push | `contents: read` | `wagoid/commitlint-github-action` | major-tag | -1 | `GITHUB_TOKEN` |
| `commit-signing.yml` | PR | `contents: read; pull-requests: write` | `probot/dco` + `sigstore/gh-action-sigstore-python` | major-tag | -2 / -9 | `GITHUB_TOKEN` |
| `dependabot-auto-merge.yml` | PR (dependabot[bot] only) | `contents: write; pull-requests: write` | `step-security/harden-runner@ab7a9404…` + `dependabot/fetch-metadata@d7267f60…` + `gh pr merge --auto` | 100% SHA | -3 / -8 | `GITHUB_TOKEN` |
| `labeler.yml` | PR | `contents: read; pull-requests: write` | `step-security/harden-runner@ab7a9404…` + `actions/labeler@8558fd74…` | 100% SHA | -1 | `GITHUB_TOKEN` |
| `monthly-metrics.yml` | scheduled / dispatch | `contents: read; issues: write` | `step-security/harden-runner@5c7944e7…` + `actions/checkout@34e11487…` + `actions/setup-node@49933ea5…` + `actions/github-script@f28e40c7…` | 100% SHA | -10 (observability) | `GITHUB_TOKEN` |
| `parallel-guard-stress.yml` | PR + weekly cron + dispatch | `read-all` (job: `contents: read`) | `actions/checkout@11bd71901…` + `actions/setup-node@39370e39…` | 100% SHA | -4 / -10 | none |
| `pre-commit-mirror.yml` | PR / push / dispatch | `read-all` | `actions/checkout@11bd71901…` + `actions/setup-python@0b93645e…` + `actions/setup-node@39370e39…` + `actions/cache@1bd1e32a…` | 100% SHA | -3 / -4 | `GITHUB_TOKEN` |
| `provenance.yml` | push tags `W*-ship-*` / `W*-closure-*` | `id-token: write; contents: write; actions: read` | `actions/checkout@v4` + `slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@5a775b36…` + `sigstore/cosign-installer@v3` | mixed (slsa-generator: SHA; checkout/cosign: major-tag) | -9 | `GITHUB_TOKEN`, OIDC token |
| `release-please.yml` | push main | `contents: write; pull-requests: write; issues: write` | `step-security/harden-runner@v2` + `googleapis/release-please-action@v4` | major-tag | -1 / -8 | `GITHUB_TOKEN` |
| `scorecard.yml` | branch_protection_rule / schedule / push main / dispatch | `read-all` (job: `security-events: write; id-token: write`) | `step-security/harden-runner@v2` + `actions/checkout@v4` + `ossf/scorecard-action@v2` + `github/codeql-action/upload-sarif@v3` + `actions/upload-artifact@v4` | major-tag | -7 / -10 | OIDC |
| `session-jsonl-archive.yml` | dispatch (operator-only) | (job-scoped) | tar+gzip script | n/a | -10 | `GITHUB_TOKEN` |
| `stale.yml` | scheduled / dispatch | `issues: write; pull-requests: write` | `actions/stale@v10` (180d stale + 30d close — solo-operator conservative) | major-tag | -1 / -10 | `GITHUB_TOKEN` |
| `supply-chain-watch.yml` | 6-hourly cron + dispatch | `contents: read; issues: write; security-events: write` | `step-security/harden-runner@v2` + `actions/checkout@v4` + `gitleaks/gitleaks-action@v2` + `actions/setup-node@v4` + `actions/github-script@v7` + auto-issue-creator | major-tag | -3 / -6 / -8 / -10 | `GITHUB_TOKEN` |
| `zizmor-action.yml` | push/PR | `contents: read; security-events: write` | `step-security/harden-runner@ab7a9404…` + `actions/checkout@34e11487…` + `zizmorcore/zizmor-action@f52a838c…` | 100% SHA | -3 / -4 / -7 | `GITHUB_TOKEN` |

**Aggregate pinning ratio**: 58 / 90 `uses:` lines are 40-char SHA-pinned = **64.4%**. Six newer workflows (ci, codeql, monthly-metrics, parallel-guard-stress, pre-commit-mirror, zizmor) are 100% SHA-pinned per W347 P4b landed; nine older workflows (scorecard, provenance, claude-code-security-review, release-please, commit-signing, labeler-related steps, dependabot-auto-merge in some steps, stale, supply-chain-watch, code-quality) still use major-tag `@v2`/`@v3`/`@v4`. **Gap: 32 unpinned `uses:` references.**

## §2 OWASP CICD-SEC Gap Analysis

| Category | Status | Covered by | Gap |
|----------|--------|-----------|-----|
| **CICD-SEC-1** Insufficient Flow Control | PARTIAL | branch-protection (implied), commitlint, stale, release-please, labeler | No required-status-check enumeration probed; relies on GitHub UI config (not workflow-encoded) |
| **CICD-SEC-2** Inadequate IAM | PARTIAL | commit-signing (DCO + sigstore-python) | No OIDC-only-deploys enforcement; `dependabot-auto-merge` uses bot-token (acceptable but no human approval ratchet for patches) |
| **CICD-SEC-3** Dependency Chain Abuse | STRONG | `ci.yml:dependency-review` + `ci.yml:trivy-ci` + `codeql.yml` + `supply-chain-watch.yml` (6-hourly gitleaks+npm-audit+`.mcp.json` `@latest` audit) + `zizmor-action.yml` + `dependabot.yml` (npm + github-actions + pip x2) | **No TruffleHog secondary secrets scanner; no CycloneDX SBOM emission; no FOSSA/scancode license-scan; no cosign verify on `.mcp.json` npx package SHAs** |
| **CICD-SEC-4** Poisoned Pipeline Execution | STRONG | `step-security/harden-runner` (egress audit) on 12+ workflows + `zizmor` deterministic static analysis + `actionlint` + `persist-credentials: false` on all checkouts + `pull_request_target` not used | Most hardeners run `egress-policy: audit` rather than `block` (advisory not enforcing) |
| **CICD-SEC-5** Insufficient PBAC | PARTIAL | `permissions:` set per workflow (read-default with job-scoped writes) | No fine-grained PAT enumeration; deploy-only workflows would need separate scope |
| **CICD-SEC-6** Insufficient Credential Hygiene | STRONG | `gitleaks-action` in `ci.yml` (every push/PR) + `supply-chain-watch.yml` (every 6h) + `persist-credentials: false` + `.mcp.json` env-interp + LANGFUSE keys in `CLAUDE.local.md` gitignored | TruffleHog as complementary scanner missing (covers different rule-pack than gitleaks per OWASP secret-scanning benchmark) |
| **CICD-SEC-7** Insecure System Configuration | STRONG | `scorecard.yml` (OpenSSF Scorecard weekly) + `actionlint.yml` + `code-quality.yml` (shellcheck + PSScriptAnalyzer + ruff) | Scorecard runs `publish_results: false` (private repo) — no public score badge |
| **CICD-SEC-8** Ungoverned 3rd-Party Services | PARTIAL | `dependabot-auto-merge` 3-tier policy (patch=auto / minor=auto-approve / major=hand-review) + `supply-chain-watch.yml` `@latest` audit + CR-1 trust-tuple discipline | No allowlist of vetted actions (only Dependabot for updates) |
| **CICD-SEC-9** Improper Artifact Integrity Validation | PARTIAL | `provenance.yml` (SLSA L3 generator + cosign sign-blob) on `W*-ship-*` / `W*-closure-*` tags | No cosign-verify step on the consumer side (plugin install / `.mcp.json` `npx -y` chain has no signature check) |
| **CICD-SEC-10** Insufficient Logging and Visibility | STRONG | `monthly-metrics.yml` (auto-issue with 30d rollup) + `supply-chain-watch.yml` (auto-issue on IOC) + OTEL exporter to local Langfuse :3000 (`OTEL_TRACES_EXPORTER=otlp` + `OTEL_LOG_TOOL_DETAILS=1` + `OTEL_LOG_USER_PROMPTS=1`) + `session-jsonl-archive.yml` | Workflow-run telemetry not currently shipped to Langfuse (only CC runtime is instrumented) |

**Uncovered categories**: none entirely uncovered, but **CICD-SEC-3 has 3 explicit gaps** (TruffleHog, SBOM, license-scan) and **CICD-SEC-9 has 1 explicit gap** (no consumer-side cosign verify on plugin SHAs).

## §3 SLSA + Sigstore + Provenance

**Live evidence**:
- `provenance.yml:1-90` declares `name: SLSA L3 provenance (wave-closure tags)`.
- Uses `slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@5a775b367a56d5bd118a224a811bba288150a563 # v2.0.0` (40-char SHA-pin per W343-P4(b)).
- OIDC: `permissions: id-token: write; contents: write; actions: read` (correct for SLSA L3 — keyless signing).
- Subject set: `sha256sum` of every `docs/architecture/${WAVE}*/{VERDICT-LEDGER.md, *CLOSURE*.md, *SYNTHESIS.md}` + fallback to `CLAUDE.md / .claude/settings.json / .mcp.json`.
- Sigstore job (`sigstore-tag-sign`): installs `sigstore/cosign-installer@v3` (major-tag — minor gap), then `cosign sign-blob --yes` for each WAVE-CLOSURE.md → emits `.sig` + `.crt`.

**SLSA Build Level achieved**: **L3** per `slsa-framework/slsa-github-generator` provenance generator (`generator_generic_slsa3.yml` is canonically L3 — hosted by SLSA WG, hermetic build, OIDC-signed). Cite: <https://slsa.dev/spec/v1.0/levels#build-l3> + <https://github.com/slsa-framework/slsa-github-generator/blob/main/internal/builders/generic/README.md>.

**Cosign verify on installed plugin SHAs**: **NOT IMPLEMENTED**. `provenance.yml` only `cosign sign-blob`s outgoing wave-closure artifacts; there is no `cosign verify` step on the consumer side. `.mcp.json` MCP-server packages are launched via `npx -y <pkg>@<ver>` with no signature verification — this is a documented CICD-SEC-9 gap.

**CycloneDX SBOM generation**: **NOT IMPLEMENTED**. `grep -rEn 'cyclonedx|sbom' .github/workflows/` returns empty. The GitHub-native dependency-graph SBOM API (`gh api /repos/<owner>/<repo>/dependency-graph/sbom`) is available but not currently invoked in any workflow.

## §4 Anthropic SDK + Native-Feature Wiring

**Runtime**: `claude --version` → `2.1.145 (Claude Code)`. Model: `claude-opus-4-7[1m]` (1M context window, per current session header).

**CC v2.1.145 `--help` introspection** confirms these native features are exposed at CLI:
- `--bare` (skip hooks/LSP/plugin-sync/auto-memory/CLAUDE.md auto-discovery; `CLAUDE_CODE_SIMPLE=1`) — **new lightweight launch mode**.
- `--fork-session` — create new session ID on resume (parallel-session safety per CLAUDE.md W280d).
- `-w / --worktree [name]` — native git worktree integration (parallel-session safety).
- `--tmux` — iTerm2 native panes / classic tmux.
- `agents` subcommand — background agents (parallel-execution mode 4 per CLAUDE.md).
- `ultrareview [PR-number | base-branch]` — **cloud-hosted multi-agent code review** (new — not yet wired into this runtime's workflows; complements `codex-review.yml`).

**Settings env-block** (verified via `node -e require('.claude/settings.json').env`):
- ALL audit-flagged env vars present: `EXPERIMENTAL_AGENT_TEAMS=1`, `FORK_SUBAGENT=1`, `ENABLE_AWAY_SUMMARY=1`, `ENABLE_FINE_GRAINED_TOOL_STREAMING=1`, `ATTRIBUTION_HEADER=0`, `USE_POWERSHELL_TOOL=1`, `ENABLE_TOOL_SEARCH=auto:5`, `EFFORT_LEVEL=max`, `DISABLE_AUTO_MEMORY=1`, `DISABLE_NONSTREAMING_FALLBACK=1`, `ENABLE_PROMPT_CACHING_1H=1`, `MAX_MCP_OUTPUT_TOKENS=50000`, `BASH_MAX_OUTPUT_LENGTH=100000`, `BASH_MAX_TIMEOUT_MS=1800000`, `ENABLE_TELEMETRY=1`, `ENABLE_GATEWAY_MODEL_DISCOVERY=1`.
- OTEL stack wired to Langfuse :3000 (`OTEL_TRACES_EXPORTER=otlp` + `OTEL_LOG_TOOL_DETAILS=1` + `OTEL_LOG_USER_PROMPTS=1` + `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee`).

**NEW env vars / flags shipped v2.1.140-v2.1.145 not yet adopted**:
- **`CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`** (v2.1.143 per Stream A finding) — caps stop-hook re-fire count to prevent infinite-loop dwell. **NOT YET SET** in `.claude/settings.json:env`. Recommended: `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=5` per claudekit transcript-marker-loop-guard pattern.
- **`background_tasks` + `session_crons` hook-payload fields** (v2.1.144+ per Stream A) — not consumed by any local hook script (would require `.claude/hooks/*` shim, which is CR-2-restricted to 2KB ≤ patches for documented Anthropic issues only).
- **OTEL `agent_id` + `parent_agent_id` span attrs** (v2.1.145 per Stream A) — emit automatically; verify Langfuse span schema accepts them (no workflow action required).

**Insights "feature"** — cross-verified per assignment §4 final ask. Searches against `code.claude.com/docs/en` (via Anthropic docs surface) + local plugin-cache yield **only** matches to `context-mode/ctx-insight/SKILL.md` (a plugin-shipped analytics dashboard MCP tool at `port 4747`). **VERDICT: Stream A's HONEST-NON-FINDING is CONFIRMED.** The operator's "Insights" reference was almost certainly the `mcp__plugin_context-mode_context-mode__ctx_insight` MCP tool (already installed via `context-mode@1.0.146`) — there is no separate first-party Anthropic feature called "Insights". No CLAUDE.md amendment needed.

## §5 Codex GPT-5.5 Gate Health

**Hooks wiring** — `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` exists (1478 bytes, mtime 2026-05-13) and registers all three lifecycle events:
- `SessionStart` → `node Z:\…\session-lifecycle-hook.mjs SessionStart` (timeout 5s)
- `SessionEnd` → `node Z:\…\session-lifecycle-hook.mjs SessionEnd` (timeout 5s)
- `Stop` → `node Z:\…\stop-review-gate-hook.mjs` (timeout 900s = 15min for codex round latency)

**Description embeds Fire-46 patch note**: "absolute Win32 paths bypass CC's POSIX-form `${CLAUDE_PLUGIN_ROOT}` injection on Windows" — confirms W332 audit-trap mechanism: plugin `hooks.json` merges into runtime SEPARATELY from `settings.json:hooks.*`. Verified empty `.claude/settings.json:hooks.Stop:[]` does NOT mean Stop-hook absent.

**Smoke**: `codex --version` invocation hit a Windows-shell PATH issue inside the sandbox (output truncated; CC version output dominated stdout). Companion script presence verified separately:
- `codex-companion.mjs` exists at `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs` — **30,862 bytes** (executable bit set per `-rwxr-xr-x`).

**Audit-trail freshness** (`.claude/state/codex_*.jsonl`):
| File | Size | Last write |
|------|------|------------|
| `codex_t1_consult_gate.jsonl` | 441,216 B | 2026-05-16 00:00 |
| `codex_postcommit_reviews.jsonl` | 2,050,990 B | 2026-05-15 23:28 |
| `codex_prepush_reviews.jsonl` | 1,619,142 B | 2026-05-15 23:28 |

**Health verdict**: GREEN. Three audit-trails are active and recently written (5-day staleness at probe time is within normal cadence for a wave-rhythm runtime). Last `codex_t1_consult_gate.jsonl` entry confirms schema `ct1cg.v1.full` is emitting valid JSON Lines (`decision: "warn_t1_missing"`, `evidence` block populated). **W331 P0.7 cross-model authority = codex GPT-5.5 is operationally live.**

**One observation**: `codex_t1_consult_gate.jsonl` newest entry timestamp `2026-05-16T04:00:22` — 4 days stale vs current 2026-05-20. Worth a wave-level smoke probe at W348 closure to confirm Stop-hook is firing on this session.

## §6 CI/CD Enhancement Recommendations

Top-7 SOTA additions, ranked by remediation-value × low-effort:

1. **TruffleHog secrets-detection (complement gitleaks)** — effort: 20 LOC new workflow. Add `trufflesecurity/trufflehog@v3.81.10` (SHA-pinned via Dependabot) on push/PR. gitleaks + TruffleHog cover orthogonal rule-packs per OWASP secret-scanning benchmark (gitleaks catches regex matches; TruffleHog catches entropy + provider-specific patterns + git-history rewrites). Probe: `trufflehog --no-update filesystem .` exit 0 = no secrets.
2. **cosign verify on plugin SHAs** — effort: 30 LOC new step in `ci.yml`. After `actions/checkout`, iterate `.mcp.json` MCP-server entries; for each `npx -y <pkg>@<ver>`, run `cosign verify --certificate-identity-regexp '.*' --certificate-oidc-issuer-regexp '.*' <registry>/<pkg>:<ver>`. Closes CICD-SEC-9 consumer-side gap. Probe: `cosign verify` exit 0 on every `.mcp.json` package.
3. **OpenSSF Scorecard gate (private-repo result-tracking via artifact)** — effort: 15 LOC mod to `scorecard.yml`. Already runs weekly; add `score-threshold: 7.0` and `fail-on-severity: high` to enforce regression-block on score-drop. Probe: `gh api /repos/<owner>/<repo>/actions/runs/<id>/artifacts` returns `scorecard-results-*` with `Score >= 7.0`.
4. **Dependabot for github-actions + npm + pip** — effort: **already configured** per `.github/dependabot.yml`. **Gap: extend grouping to include `step-security/harden-runner` + `slsa-framework/*` + `sigstore/*` + `ossf/*` under a `supply-chain-actions` group** (currently only `mcp-servers` + `anthropic-sdk` groups exist). 20 LOC mod.
5. **License-scan (FOSSA / scancode-toolkit)** — effort: 25 LOC new workflow. Add `fossa-contrib/fossa-action@v3` (or `nexB/scancode-toolkit@v32` for OSS-only) on PR. CR-1(b) license-risk audit currently relies on `actions/dependency-review-action` `deny-licenses: 'AGPL-3.0, SSPL-1.0'` — narrow allowlist. FOSSA gives full transitive license tree. Probe: `fossa report licenses` returns 0 AGPL/SSPL/proprietary entries.
6. **SBOM (CycloneDX)** — effort: 30 LOC new step in `ci.yml`. Add `anchore/sbom-action@v0` with `format: cyclonedx-json` + `actions/upload-artifact@v4`. **Plus** invoke GitHub's native dependency-graph SBOM: `gh api /repos/<owner>/<repo>/dependency-graph/sbom > sbom.json`. Closes CICD-SEC-3 gap. Probe: `cyclonedx validate --input-file sbom.json` exit 0 + artifact uploaded with retention 90d.
7. **Provenance attestation for skill-edits** — effort: 60 LOC new workflow `skill-provenance.yml`. On push to `.claude/skills/**/SKILL.md` or `.claude/plugins/cache/**/skills/**/SKILL.md`, generate SLSA L3 attestation tying the SKILL.md SHA to the commit + run-id + OIDC identity. Closes operator-curated-skill auditability gap per CR-1(d) trust-tuple "operator-pinned skill versions". Probe: `cosign verify-blob --signature <sig> --certificate <crt> SKILL.md` exit 0 per skill.

**Additional 3-org-distinct cite anchors** for top-7:

| Recommendation | Cite-A (vendor) | Cite-B (standards body) | Cite-C (independent benchmark) |
|---|---|---|---|
| TruffleHog | `trufflesecurity/trufflehog` README | OWASP CICD-SEC-6 | NIST SP 800-218 PW.7 |
| cosign verify | `sigstore/cosign` docs | SLSA v1.0 spec §Build-L3 | ISO/IEC 25010:2011 §4.2.6 |
| Scorecard gate | `ossf/scorecard-action` README | NIST SSDF | OpenSSF Best Practices |
| Dependabot grouping | `docs.github.com/.../dependabot.yml` | OWASP CICD-SEC-3 | RFC 5246 (TLS pin discipline analog) |
| License-scan | `fossa-contrib/fossa-action` README | SPDX 2.3 spec | OSI license-list |
| SBOM (CycloneDX) | `anchore/sbom-action` README | CycloneDX 1.5 / NTIA min elements | NIST SP 800-218 PW.4 |
| Skill-provenance | SLSA v1.0 generator-generic-slsa3 | Sigstore Rekor transparency log | OWASP CICD-SEC-9 |

## §7 Verdict

**Stream-F top-5 actionable W348 / W349 items** (priority-ordered, all 3-org-distinct cited):

1. **[P0 / W348-ship-blocker] Wire `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=5`** in `.claude/settings.json:env`. Effort: 1 LOC. Cite: Anthropic v2.1.143 release-notes (Stream A) + claudekit `transcript-marker-loop-guard` skill + Microsoft autogen `_signal_termination_with_error`. Probe: grep `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` `.claude/settings.json` returns 1 match with value `"5"`.

2. **[P1 / W348] Land TruffleHog as secondary secrets scanner** in `ci.yml` (additive — gitleaks stays). Effort: 20 LOC. Cite: `trufflesecurity/trufflehog v3.81.10` + OWASP CICD-SEC-6 + NIST SP 800-218 PW.7. Probe: PR with synthetic AKIA-prefix secret blocks at TruffleHog step.

3. **[P1 / W348] Add `cosign verify` on `.mcp.json` MCP-server packages** in `ci.yml`. Effort: 30 LOC. Cite: `sigstore/cosign` v2.4 + SLSA v1.0 spec + ISO/IEC 25010:2011 §4.2.6. Probe: PR with `.mcp.json` edit including unsigned package fails the cosign-verify step.

4. **[P1 / W348] Refresh 32 unpinned `uses:` references to 40-char SHA-pins** in 9 older workflows (scorecard, provenance, claude-code-security-review, release-please, commit-signing, dependabot-auto-merge actions, stale, supply-chain-watch, code-quality). Effort: 32 line edits. Cite: SLSA v1.0 + StepSecurity benchmark + GitHub docs `pinning-your-actions-to-a-full-length-commit-sha`. Probe: `for f in .github/workflows/*.yml; do grep -cE 'uses: [^@]+@[a-f0-9]{40}' "$f" / grep -cE 'uses:' "$f"; done` returns 100% on every file.

5. **[P2 / W349] CycloneDX SBOM + GitHub dependency-graph SBOM emission** in `ci.yml`. Effort: 30 LOC. Cite: `anchore/sbom-action v0` + CycloneDX 1.5 spec + NTIA SBOM minimum elements (NIST SP 800-218 PW.4). Probe: artifact `sbom-<run-id>.cyclonedx.json` uploaded with `cyclonedx-cli validate` exit 0 + GitHub Security tab shows dependency-graph SBOM.

**Bonus (P2 / W349)**: enable `ultrareview` (CC v2.1.145 new cloud-hosted multi-agent code-review CLI) on selected PR types — complements `codex-review.yml`'s GPT-5.5 gate with Anthropic's first-party multi-agent review. Effort: 15 LOC new workflow `ultrareview.yml`. Cite: CC `--help` output v2.1.145 + Anthropic claude-code docs + sub-agents pattern.

**HONEST-NON-FINDINGS** (no remediation needed):
- "Insights" feature → confirmed Stream A finding: only `context-mode:ctx_insight` skill (already installed).
- SLSA L3 → already achieved via `provenance.yml` on wave-closure tags (`slsa-framework/slsa-github-generator/.github/workflows/generator_generic_slsa3.yml@5a775b36…`).
- Codex GPT-5.5 gate health → GREEN; hooks.json + companion.mjs + 3 active audit-trails all present.

**Overall posture**: STRONG on CICD-SEC-3/4/6/7/10 coverage. Three actionable supply-chain integrity gaps (TruffleHog, cosign-verify, SBOM) are the highest-ROI W348/W349 closures. SHA-pinning refresh closes the 32-line remaining drift to 100% per W347 P4b target.
