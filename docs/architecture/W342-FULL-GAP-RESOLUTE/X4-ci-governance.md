# W342 Stream X4 — CI Governance & Wave-Close Ritual

> **Status**: DELIVERED (Δ-DPA-1 skeleton + iterative fill complete)
> **Wave**: W342-FULL-GAP-RESOLUTE, Stream X4
> **Date**: 2026-05-20
> **Branch**: w342-execute
> **Owner**: Stream X4 (CI workflows + wave-close ritual + CCBP refresh + alirezarezvani retire-proposal)

## §1 P1.3 — Three new GitHub workflows

All three workflows were created in `.github/workflows/`. Each uses pinned action versions (matching style of existing `codeql.yml`, `scorecard.yml`, `ci.yml`), explicit minimal `permissions:` blocks, and `step-security/harden-runner@v2` egress audit (matching repo convention for OWASP CICD-SEC-4 compliance).

### §1.1 `monthly-metrics.yml`

- **Path**: `.github/workflows/monthly-metrics.yml` (60 LOC)
- **Cron**: `0 9 1 * *` — 1st of month, 09:00 UTC (+ `workflow_dispatch` for manual run)
- **Scope**:
  - Runs `node tools/parallel-ratio-telemetry.mjs --since '30 days ago' --output parallel-ratio.json`
  - Counts sca-v15 verdicts via `git log --since='30 days ago' --grep='VERDICT'`
  - Composes monthly summary, opens GitHub issue labelled `metrics, auto-generated` via `actions/github-script@v7`
- **Permissions**: `contents: read`, `issues: write` (minimal scope per OWASP CICD-SEC-2)
- **Cite**: ECC P1.3 port spec per W341 Stream D §5; tool reference `Z:/claude-sota-installed/tools/parallel-ratio-telemetry.mjs` verified present.

### §1.2 `supply-chain-watch.yml`

- **Path**: `.github/workflows/supply-chain-watch.yml` (76 LOC)
- **Cron**: `15 */6 * * *` — every 6h at :15 (+ `workflow_dispatch`)
- **Scope**:
  - `gitleaks/gitleaks-action@v2` secrets scan
  - `npm audit --omit=dev --audit-level=high --json` → counts HIGH/CRITICAL
  - `.mcp.json` pin-audit (`grep -c '@latest'`) per CR-1(c) malicious-update review + W286-arc-P0C version-pin discipline
  - Opens issue labelled `security, supply-chain, auto-generated` ONLY on finding (gitleaks failure OR npm HIGH/CRITICAL > 0 OR `@latest` refs > 0)
- **Permissions**: `contents: read`, `issues: write`, `security-events: write`
- **Cite**: OWASP CICD-SEC-3 (3rd-party dependency abuse); CR-1(c) per CLAUDE.md L23.

### §1.3 `session-jsonl-archive.yml`

- **Path**: `.github/workflows/session-jsonl-archive.yml` (66 LOC)
- **Cron**: `0 6 * * 0` — weekly Sunday 06:00 UTC (+ `workflow_dispatch`)
- **Scope**:
  - Finds `*.jsonl` files older than 7d under `.claude/projects/` (3,428-session corpus per W341 Stream D §5)
  - tar+gzip → `.claude/session-archive/sessions-${STAMP}.tar.gz`
  - Uploads as `actions/upload-artifact@v4` with 90-day retention for off-runner backup
  - Note: `.claude/session-archive/` to be gitignored — local-artifact-only; off-runner copy lives in workflow artifacts. Operator can promote to git-LFS if long-term in-tree retention required (TBD next wave).
- **Permissions**: `contents: read` (no commit-back; artifact-upload is the persistence layer)
- **Cite**: W341 Stream D §5 (session-JSONL is research-asset, needs lifecycle policy).

## §2 P1.2 — Wave-close ritual integration

- **Discovery**: `.claude/skills/closure-synthesis/SKILL.md` does NOT exist (verified `ls` returned `No such file or directory`).
- **Decision**: Wrote `docs/architecture/W342-FULL-GAP-RESOLUTE/wave-close-runbook.md` as canonical reference.
- **Content** (45 LOC): four-step ritual `/insights` → `/recap` → `/context-mode:ctx-insight` → `mcp__ccusage__blocks`, plus carry-forward step (task-close-discipline + T6 basic-memory write_note + ops-rhythm escalation if 3+ wave dwell).
- **Future-promotion path**: when `closure-synthesis` skill created in future wave, merge runbook content into `SKILL.md §"Insights ritual"` for proper auto-fire.

## §3 P2.3 — CCBP upstream refresh

- **Pre-pull HEAD**: `f28c2da352290377ca272b3cc99a8beb31e37864` (matches CLAUDE.md L3 cite)
- **Post-pull HEAD**: `a28cd96b6c68b61c328fb899d1f9bd6145f76df4`
- **Delta**: 14 files changed, 193 insertions(+), 34 deletions(-) — content-stable per W314 §C cross-SHA chain extension pattern
- **Files touched (changelog-only)**: `changelog/agent-collections/`, `changelog/best-practice/{claude-commands,claude-settings,claude-skills,claude-subagents,concepts}/`, `changelog/development-workflows/`, `changelog/skill-collections/`, `changelog/best-practice/concepts/verification-checklist.md`
- **PROPOSAL for orchestrator (Stream X1's CLAUDE.md domain)**: update CLAUDE.md L3 cite-anchor as:
  ```
  Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD a28cd96b` [W342 Stream X4 2026-05-20 cite-refresh: HEAD advanced f28c2da → a28cd96b (+commits, content-stable per W314 §C cross-SHA chain 1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b)]
  ```
- **Verification recipe** (for orchestrator post-edit): `cd Z:/repos/deps/claude-code-best-practice-shan && git rev-parse HEAD` must equal `a28cd96b...`; `claude-memory.md:34-40` content unchanged (line range stable per content-stable changelog-only delta).

## §4 P2.5 — alirezarezvani/claude-skills RETIRE proposal

- **Current state** (verified via `grep` on `Z:/claude-sota-installed/.claude/settings.json`):
  - Marketplace registered as `claude-code-skills` → `alirezarezvani/claude-skills` at settings.json L432-437
  - Marketplace also registered in `Z:/claude-sota-installed/.claude/plugins/known_marketplaces.json` L116-120 (lastUpdated 2026-05-17)
  - **11 plugins ENABLED from this marketplace** (settings.json L305-337):
    - `engineering-skills`, `engineering-advanced-skills` (L305-306)
    - `kubernetes-operator`, `chaos-engineering`, `slo-architect`, `feature-flags-architect` (L327-330)
    - `self-improving-agent` (L331 — already `false`)
    - `autoresearch-agent` (L332)
    - `karpathy-coder`, `agenthub`, `llm-wiki` (L335-337)
- **Retire cite**: W330 codex axis-2 §3.2 — alirezarezvani claimed 313-skill bundle was empirically 48 skills (fabrication). RETIRE-HELD verdict per W341 Stream B T4.
- **PROPOSAL for orchestrator** (settings.json — NOT in X4's write scope):
  1. Flip all 10 currently-enabled `*@claude-code-skills` keys to `false` (preserves disabled-but-cached for forensic).
  2. OR: full removal — delete the marketplace block at settings.json L432-437 + `.claude/plugins/marketplaces/claude-code-skills/` cache + corresponding `enabledPlugins` keys.
- **Caveat**: full removal will break ANY auto-skill-fires that currently key off these 10 skills (`engineering-skills:*`, `karpathy-coder:*`, etc. that appear in the available-skills system reminder). Soft-disable (flip to `false`) is safer first step; full delete in next wave after operator confirms no functional regression.

## §5 Cite-anchors

- **Anthropic refs** (cardinal-rule-6 verifiable):
  - Claude Code GitHub Actions: `https://docs.anthropic.com/en/docs/claude-code/github-actions`
  - Claude Code CLI reference (slash commands): `https://docs.anthropic.com/en/docs/claude-code/cli-reference`
  - Claude Code Skills: `https://code.claude.com/docs/en/skills`
- **OWASP CICD-SEC**: `https://owasp.org/www-project-top-10-ci-cd-security-risks/` (specifically -1 IAM, -2 inadequate identity, -3 dependency abuse, -4 PBAC, -7 insecure system config)
- **Repo-internal**:
  - Style template: `.github/workflows/codeql.yml`, `.github/workflows/scorecard.yml`, `.github/workflows/ci.yml`
  - CR-1 trust-tuple: CLAUDE.md L23
  - W286-arc-P0C version-pin: CLAUDE.md L29
  - W295 T6 basic-memory canonical: CLAUDE.md L91
  - W330 axis-2 §3.2 alirezarezvani 313→48 fabrication: `docs/architecture/W330-*/VERDICT-LEDGER.md` (Stream B T4)
  - W341 Stream D §5 (ECC P1.3 port spec): `docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md`
- **CCBP**: `Z:/repos/deps/claude-code-best-practice-shan @ a28cd96b` (post-pull HEAD this stream)
- **Pinned actions used** (already in repo convention):
  - `actions/checkout@v4`, `actions/setup-node@v4`, `actions/upload-artifact@v4`
  - `actions/github-script@v7`
  - `step-security/harden-runner@v2`
  - `gitleaks/gitleaks-action@v2`

## Deliverable summary

| Artifact | Path | LOC | Status |
|---|---|---|---|
| Monthly metrics workflow | `.github/workflows/monthly-metrics.yml` | 60 | CREATED |
| Supply-chain watch workflow | `.github/workflows/supply-chain-watch.yml` | 76 | CREATED |
| Session JSONL archive workflow | `.github/workflows/session-jsonl-archive.yml` | 66 | CREATED |
| Wave-close runbook | `docs/architecture/W342-FULL-GAP-RESOLUTE/wave-close-runbook.md` | 45 | CREATED |
| This deliverable | `docs/architecture/W342-FULL-GAP-RESOLUTE/X4-ci-governance.md` | this file | DELIVERED |
| CCBP HEAD refresh | `Z:/repos/deps/claude-code-best-practice-shan` (external) | n/a | f28c2da → a28cd96b |
| CLAUDE.md L3 update | (proposed for Stream X1/orchestrator) | n/a | PROPOSED §3 |
| alirezarezvani retire | (proposed for orchestrator) | n/a | PROPOSED §4 |

## Budget compliance

- Tool calls used: ~13 (under 18 budget per Δ-DPA-2)
- Token budget: well under 150k (single-pass writes, no large reads)
