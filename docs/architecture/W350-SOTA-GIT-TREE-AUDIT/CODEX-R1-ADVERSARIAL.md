# CODEX-R1 Adversarial Audit — W350 SOTA Git Tree

## §1 Findings

F1 **P1 — CLAUDE.md worktree cap claim is stale.** `CLAUDE.md:14` says live worktrees are exactly three and “at 3-cap”; probe `git worktree list` returned four: root, `-W348`, `-W348-carry`, and `-W350`. This also contradicts the local W350 research context claiming “3 worktrees” at `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/FORK-B-SOTA-GIT-PRACTICE-RESEARCH.md:3`.

F2 **P1 — Bash hooks are brittle under the current PowerShell-default shell path.** The Bash PreToolUse chain is declared at `.claude/settings.json:140-156`. Replaying the two jq/bash snippets from `.claude/settings.json:150` and `.claude/settings.json:155` with benign JSON from PowerShell failed before hook logic with Git Bash `CreateFileMapping ... Win32 error 5`, exit `256`. `gitleaks protect --staged` at `.claude/settings.json:146` did exit `0`, so the fragility is specifically the Bash/jq layer.

F3 **P1 — cognee has no startup/health gate, but is live right now.** `.mcp.json:49-51` declares cognee as raw HTTP `http://127.0.0.1:8000/mcp`; `.claude/settings.json:118-283` contains no cognee health hook. Probe `nssm.exe status CogneeMCP` returned `SERVICE_RUNNING`; raw `GET /mcp` returned 406, but MCP initialize POST with `Accept: application/json, text/event-stream` returned HTTP 200 and `serverInfo Cognee 1.26.0`. Failure mode if NSSM is down is therefore MCP connection failure at tool use/startup, not stdio respawn-loop; `.mcp.json:12` says that explicitly (“CC will simply fail to connect”).

F4 **P1 — preagent gates have documented soft-fail and bypass paths.** `tools/preagent-parallel-guard.mjs:271-272` exits `0` on `.claude/state/parallel-guard-bypass.marker`; its counter write is best-effort at `tools/preagent-parallel-guard.mjs:239-249`, and top-level catch exits `0` at `tools/preagent-parallel-guard.mjs:473-481`. `tools/preagent-subagent-validator.mjs:50-79` returns null on missing/unparseable allowlist, then exits `0` at `tools/preagent-subagent-validator.mjs:119-125`; unknowns block only when the allowlist loads (`tools/preagent-subagent-validator.mjs:141`). `tools/preagent-d73-gate.mjs:210-214` allows env/marker bypass, and missing/unreadable/no-row ledgers exit `0` at `tools/preagent-d73-gate.mjs:219-227`.

F5 **P2 — branch namespace has 26 wave/archive/goal/agent branches, exceeding the hygiene target.** Probe `git branch --format` counted 26 matching `archive/|goal/|sota-converge-|worktree-agent-|w|W`; `git branch -avv` shows stale-looking local-only `archive/*`, `sota-converge-*`, `w343-*`, `w344-*`, and `worktree-agent-*`. W350 already recommends tag-and-delete for 20 stale branches at `docs/architecture/W350-SOTA-GIT-TREE-AUDIT/FORK-B-SOTA-GIT-PRACTICE-RESEARCH.md:24-35`.

F6 **P1 — GitHub workflow SHA-pinning is partial.** Strong pins exist for SLSA generator at `.github/workflows/provenance.yml:69`, cosign installer at `.github/workflows/provenance.yml:85`, Scorecard at `.github/workflows/scorecard.yml:35`, and Claude review at `.github/workflows/claude-code-security-review.yml:43`. But `actions/checkout@v4`, `actions/upload-artifact@v4`, `step-security/harden-runner@v2`, and `github/codeql-action/upload-sarif@v3` remain tag-pinned at `.github/workflows/provenance.yml:25,83,98`, `.github/workflows/scorecard.yml:26,30,43,48`, and `.github/workflows/claude-code-security-review.yml:33-37`. Probe `git diff` and `git diff --cached` for these three workflows were empty; no uncommitted workflow delta was present.

F7 **P2 — FQN discipline is documented but still accepts the risky legacy alias.** `CLAUDE.md:20` says bare `code-reviewer` collides and MUST use FQN. The allowlist confirms FQNs for seven `code-reviewer` providers at `.claude/state/subagent-type-allowlist.json:16,34,67,132,136,160,183`, but still includes bare `"code-reviewer"` in `legacy_bare_aliases` at `.claude/state/subagent-type-allowlist.json:188-205`. Plugin docs still teach bare invocation, e.g. `.claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/agents/README.md:107`.

## §2 Stale-Fact Ledger

| Claim | Probe result | Verdict |
|---|---|---|
| `CLAUDE.md:14` says 3 worktrees / not over cap | `git worktree list` returned 4 | STALE |
| W350 Fork-B context says “3 worktrees” at `FORK-B...md:3` | same 4-worktree probe | STALE |
| `CLAUDE.md:36` Langfuse v3.160.0 | `GET http://127.0.0.1:3000/api/public/health` returned `{"status":"OK","version":"3.160.0"}` | HOLDS |
| `CLAUDE.md:36` cognee active / serverInfo 1.26.0 | MCP initialize POST returned HTTP 200 serverInfo `Cognee 1.26.0` | HOLDS |
| `.mcp.json:12` says raw down means connect failure, not respawn-loop | current service is up; failure-mode text remains plausible but not down-tested | PARTIAL |

## §3 SOTA Branch-Naming Recommendation

Keep wave IDs as audit anchors, but require typed short-lived branches: `<type>/W<N>-<kebab-summary>`, e.g. `feat/W350-sota-git-tree-foundation`, with commit subjects following Conventional Commits (`<type>[scope]: <description>` per https://www.conventionalcommits.org/en/v1.0.0/ lines 53-70 and 113-118). This aligns with AWS trunk guidance using typed `feature/...` branches and short-lived sandbox deletion (https://docs.aws.amazon.com/prescriptive-guidance/latest/choosing-git-branch-approach/branches-in-a-trunk-strategy.html lines 21-34), Trunk-Based Development’s “couple of days” branch life and delete-after-merge rule (https://trunkbaseddevelopment.com/short-lived-feature-branches/ lines 46-56), and Atlassian/GitFlow’s recognized `feature/`, `release/`, `hotfix/` prefixes (https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow lines 1074-1078). Current mixed names (`goal/`, `w344-*`, `sota-converge-*`, `worktree-agent-*`) should be archived, not normalized in place.

## §4 cognee / hindsight Scoring

| Primitive | Recency | Trust | Anthropic-coverage | Z-portable | Reversibility |
|---|---:|---:|---:|---:|---:|
| cognee raw HTTP MCP | 4 | 3 | 2 | 4 | 5 |
| cognee via marketplace/plugin | 2 | 4 | 4 | 3 | 4 |
| hindsight retired raw daemon | 1 | 2 | 1 | 2 | 3 |
| hindsight marketplace/plugin reinstall | 1 | 3 | 3 | 3 | 4 |

Recommendation: retain cognee raw HTTP for now because live MCP initialize works and `.mcp.json:12` documents Windows stdio respawn-loop avoidance. Do not reinstall Hindsight unless a current maintained Anthropic plugin exists and beats T6 basic-memory on a fresh eval.

## §5 Top-5 Highest-Leverage Fixes

1. Fix CLAUDE.md/W350 worktree facts and prune to ≤3 active worktrees.
2. Replace Bash/jq PreToolUse snippets with PowerShell or Node hooks, or prove Git Bash is stable under the actual Claude hook runner.
3. Add an eee startup cognee MCP initialize health probe with a clear degraded-mode warning.
4. Remove `legacy_bare_aliases` for colliding subagent names after migrating dispatch docs to FQN.
5. SHA-pin remaining GitHub Actions tags or document accepted exceptions.

## §6 TL;DR

Converge first on **runtime gating truthfulness**: the docs say “3-cap and healthy,” but probes show 4 worktrees and Bash hook replay failure under PowerShell. Fix those before adding more primitives.
