# EXECUTE_V59_ELITE_PLAN.md

## Phase 0 — Baseline
1. Read `CLAUDE.md`, `AGENTS.md`, and `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md`.
2. Run:
   ```bash
   git status --short
   git branch --show-current
   git remote -v
   ```
3. Capture baseline usage:
   ```bash
   npx ccusage@latest daily || true
   npx ccusage@latest session || true
   ```
4. Create a baseline quality command:
   ```bash
   mkdir -p scripts
   cat > scripts/verify.sh <<'SH'
   #!/usr/bin/env bash
   set -euo pipefail
   git diff --check
   command -v rg >/dev/null && rg --version >/dev/null
   # Add project-specific lint/type/test commands below.
   SH
   chmod +x scripts/verify.sh
   ```

## Phase 1 — Install only the default core
Install or confirm:
```text
Claude Code
Codex CLI
openai/codex-plugin-cc
ccusage
RTK
Serena
Repomix
rg/fd/jq/yq/gh
pre-commit/just/mise/uv
```
Do not install MCPs, memory plugins, dashboards, or bridge plugins yet.

## Phase 2 — Configure memory and instructions
1. Keep `CLAUDE.md` concise.
2. Create `AGENTS.md` for Codex and other agents.
3. Move repeated procedures to `.claude/skills`.
4. Store durable knowledge in:
   ```text
   docs/architecture/
   docs/decisions/
   GitHub issues/PRs
   Task Master / CCPM state if used
   ```

## Phase 3 — Token/context harness
1. Use RTK for noisy shell output.
2. Use Serena before broad file reads.
3. Use Repomix only for deliberate context capsules.
4. Consider Context Mode/Headroom/Claude Context only after measuring token waste.

## Phase 4 — Parallel worktree harness
Use one task = one branch = one worktree.
```bash
git fetch --all --prune
git remote set-head origin -a || true
claude --worktree task-name
```
Or use `/batch` for large independent changes.

## Phase 5 — Codex second-model review
Inside Claude Code:
```text
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, data loss, security regressions, rollback gaps, race conditions --background
/codex:status
/codex:result
```

## Phase 6 — Quality gates
Add project-specific gates:
```text
ruff / mypy / pytest for Python
biome / oxc / tsc / vitest for TS/JS
shellcheck / actionlint / hadolint / typos for ops
semgrep / CodeQL / gitleaks / trivy / osv-scanner for security
vale / markdownlint / textlint for prose
```

## Phase 7 — Benchmark-before-adoption
Before adding any heavy repo/tool:
1. Run baseline task with default stack.
2. Run same task with candidate tool.
3. Compare: tokens, wall time, tests passed, files touched, safety findings, review quality, uninstall cost.
4. Keep only if it improves at least one metric without increasing unacceptable risk.

## Phase 8 — Source audit before executable adoption
Audit every:
```text
plugin
MCP server
hook
memory tool
bridge plugin
dashboard
one-line installer
system prompt customization tool
```
Use `.claude/skills/source-repo-audit/SKILL.md`.
