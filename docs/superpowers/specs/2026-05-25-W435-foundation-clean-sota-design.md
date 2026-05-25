# W435 Foundation-Clean SOTA Design

> Spec for full SOTA alignment of claude-sota-installed against the Foundational Layer Grand Checklist (May 23 2026).
> Brainstorming HARD-GATE: operator approved Option A (foundation-clean THIS repo first).
> Date: 2026-05-25

## Scope

Resolve every remaining gap between this runtime's actual state and the 22-layer Grand Checklist,
using the 8 named SOTA repos as install sources. Memory layer deferred to a focusing PR per operator instruction.

## Already Done (W435 commits 17d8de4 → c1a3e54)

- [x] Z:\z\ phantom fix (3 files, codex r2 APPROVE)
- [x] 14 git global configs set (L8)
- [x] uv 0.10.3 → 0.11.16 (L6)
- [x] zizmor 1.25.2 + detect-secrets 1.5.0 + prek 0.4.1 installed (L10/L12)
- [x] codegraph 0.9.3 → 0.9.4, docling 1.3.4 → 2.0.1 (L14)
- [x] openhands-dispatch dead MCP removed (L14)
- [x] 4 P0 template injection vulns fixed (L9)
- [x] 6 SHA/version comment mismatches corrected (L9)
- [x] 26.5 MB stale state archived (state cleanup)
- [x] 14 stale wave-locks released
- [x] 6 dead agent worktrees pruned, at cap

## Remaining Work — 3 Parallel PRs

### PR-1: Workflow Consolidation (L9 — GitHub SOTA)

**Goal**: Cut 26 workflows → 10 SOTA-aligned workflows.

**KEEP (10):**
1. `ci.yml` — pre-commit mirror (PR + push)
2. `codeql.yml` — SAST (PR + weekly)
3. `scorecard.yml` — OpenSSF supply-chain (weekly)
4. `zizmor-action.yml` — Actions security (PR + push) — bump SHA to v0.5.6
5. `dependabot-auto-merge.yml` — patch auto-merge (PR)
6. `release-please.yml` — automated releases (push)
7. `code-quality.yml` — ruff + biome (PR)
8. `commitlint.yml` — conventional commits (PR)
9. `stale.yml` — issue hygiene (weekly)
10. `labeler.yml` — PR labeling (PR)

**REPLACE:**
- `claude-code-security-review.yml` + `codex-review.yml` → single `claude-code-action.yml`
  using `anthropics/claude-code-action@v1` with `--comment` for inline PR review.
  This is the Anthropic-official pattern. The custom codex cross-model gate moves
  to a pre-commit hook (already exists as codex-trailer-gate).

**ARCHIVE (move to `.github/workflows/_archived/`):**
- `codex-verdict-gate.yml` — trailer enforcement stays in pre-commit only
- `eval-nightly.yml` — keep if eval harness is active, else archive
- `parallel-guard-stress.yml` — custom telemetry
- `parallel-ratio-gate.yml` — custom telemetry
- `session-jsonl-archive.yml` — custom telemetry
- `monthly-metrics.yml` — custom telemetry
- `commit-signing.yml` — superseded by git config gpgsign=true
- `actionlint.yml` — already in pre-commit; CI duplicate
- `pre-commit-mirror.yml` — if ci.yml covers pre-commit, this is redundant
- `links.yml` — nice-to-have, not SOTA-required

**DELETE:**
- `claude-code-security-review.yml` — RETIRED, dispatch-only

**Security hardening on remaining 10:**
- Add `step-security/harden-runner@SHA` to all jobs
- Add `persist-credentials: false` to all checkouts
- Move workflow-level permissions to job-level (minimal)
- Verify all Actions SHA-pinned with correct version comments

### PR-2: SOTA Repo Cite-Refresh + Plugin Currency (L15)

**Goal**: Verify all 8 named SOTA repos are at HEAD, plugins current.

| Repo | Role | Action |
|---|---|---|
| shanraisshan/claude-code-best-practice | CCBP authority | `git -C Z:/repos/deps/claude-code-best-practice fetch` + diff HEAD |
| addyosmani/agent-skills | Skills vendor-fork | `git -C Z:/repos/deps/addyosmani-agent-skills fetch` + diff HEAD |
| vercel-labs/agent-skills | Skills vendor-fork | `git -C Z:/repos/deps/vercel-labs-agent-skills fetch` + diff HEAD |
| wshobson/agents | Plugin (comprehensive-review etc) | `/plugin update agents@wshobson` |
| assafelovic/gpt-researcher | MCP + research | Check gpt-researcher pip version currency |
| ComposioHQ/composio | L4 toolkit | Already installed W433-INST-C, verify version |
| ComposioHQ/agent-orchestrator | L3 orchestration | W433-INST-A REJECTED — document why |
| OpenHands | L5 multi-agent | W433-INST-B cite-ref-only — document |

**Also refresh:**
- obra/superpowers — check if 5.1.0 → newer exists
- everything-claude-code — check version currency
- codex plugin — check hooks.json current

### PR-3: CLAUDE.md Stale-Fact Correction (L17 + doc hygiene)

**Goal**: Fix every stale fact in CLAUDE.md.

| Line | Stale claim | Correct state |
|---|---|---|
| L37 | T5 Langfuse DOWN-CRASH-LOOP | Langfuse UP healthy (verified docker ps) |
| L37 | langfuse-postgres MISSING | langfuse-postgres Up 2 days (healthy) |
| L62 | plugin count drift | Re-probe actual counts |
| — | Cognee :8000 characterization | Cognee LIVE (NSSM running, Uvicorn on :8000) |

## Execution Model

Each PR gets its own worktree via `eee.ps1` (W393 launch contract).
PRs are independent — no cross-dependencies — so they can run in parallel sessions.

**Agent-teams consideration** (per operator feedback): For PR-1 (10+ workflow files),
use `agent-teams:team-feature` with file-ownership boundaries:
- Agent A: archive 10 workflows + create claude-code-action.yml
- Agent B: add harden-runner + persist-credentials to remaining 10
- Agent C: update zizmor-action SHA + verify all pins

For PR-2 and PR-3, solo agents suffice (small scope, sequential deps).

## Success Criteria

1. `zizmor .github/workflows/` reports 0 HIGH findings
2. All 10 remaining workflows have harden-runner + minimal permissions
3. All SOTA repo cite-references at verified HEAD SHAs
4. CLAUDE.md has 0 stale-fact violations (CR-6 compliant)
5. Pre-commit gate: all 19 hooks pass on every commit
6. Worktree count ≤ 6 at close

## Out of Scope (deferred per operator instruction)

- Memory layer (basic-memory, cognee, MemPalace) — separate focusing PR
- ourveins/myveins repo creation — after foundation is clean
- New SOTA repo installs beyond the 8 named — separate expansion waves
