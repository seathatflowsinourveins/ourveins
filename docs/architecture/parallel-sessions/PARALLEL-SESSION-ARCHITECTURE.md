# Parallel-Session Workflow Architecture — Definitive Synthesis

> **What this is.** The convergence-backed architecture for running multiple Claude Code sessions in parallel — on the *same* project and across *different* projects — with the git, memory, and orchestration layers that make it safe. Synthesis of 4 SOTA-research streams (`research/STREAM-A..D`), each run through the `sota-convergence-audit` 5-phase pipeline (≥4-source discovery → harness-fit → ≥3-org convergence → D1–D10 scoring → disposition).
>
> **Date:** 2026-05-16. **Runtime:** Claude Code on Windows 11, Z:-portable (`Z:\claude-sota-installed\`), PowerShell + Git Bash, single developer, multiple MAX accounts, near-unlimited codex, 42 plugins + 11-server MCP stack.
>
> **Status legend:** **NATIVE-LIVE** = native CC capability, already usable · **INSTALLED-LIVE** = installed + verified · **WIRE** = converged change, not yet applied · **RECONFIGURE** = correct an existing mis-wire · **STUDY-PILOT** = evaluate before adopting · **DEFER** = standby · **REJECT** = ruled out with reason.

---

## §0 — Executive summary

Parallel Claude Code work decomposes into **two independent layers** and the answer for each is convergent:

1. **Work isolation** — *how* parallel work avoids collision. The converged primitive is **git worktrees** (native CC). Every concurrent *writer* gets its own checkout on its own branch. This is not a tool to install — it ships in the CLI.
2. **Work distribution** — *who* does the parallel work. Native CC ships four mechanisms — **subagents, forked subagents, background sessions, agent teams** — and the installed `agent-teams` plugin already wraps the multi-agent case. **No orchestration tool needs installing.**

The headline cross-cutting findings:

- **Everything load-bearing is native or already installed.** The parallel-session surface is configured through `settings.json` + launcher env, not through new installs. Stream B's tool benchmark returned a deliberate **null result** — no INSTALL-grade orchestration tool clears the bar.
- **Memory across sessions = isolation by default, sharing by explicit post-verification promotion.** A single SQLite/FalkorDB file is *not* freely multi-writer; the SOTA shape is a single owning server process. `vectorize-io/hindsight` is the purpose-built shared substrate — and the concurrent W259-v16 session **already installed it**.
- **Git practice is the load-bearing discipline:** one branch per session, one worktree per branch, rebase short branches frequently, `--ff-only` merge, `git worktree remove` (never `rm -rf`).
- **A live incident proves the thesis.** *During this very research run*, a second session committed to `main` 5× in 23 minutes with zero branch isolation — see §9. The architecture below is the fix.

**Definitive ship verdict reached** — see the §7 matrix. 3 INSTALLED-LIVE layers, 4 native-LIVE, 6 WIRE actions, 1 STUDY-PILOT, the rest DEFER/REJECT.

---

## §1 — The parallel-session model

Two orthogonal axes. Compose them; never conflate them.

| Axis | Question | Primitive | Layer |
|---|---|---|---|
| **Isolation** | How do parallel writers avoid touching each other's files? | git worktree (one checkout + branch per writer) | filesystem |
| **Distribution** | Who performs the parallel work, and do the workers talk? | subagent / fork / background session / agent team | orchestration |

A third axis governs *cross-project* (vs same-project) parallelism:

| Axis | Question | Primitive | Layer |
|---|---|---|---|
| **Identity** | Which account / which project is this session? | `CLAUDE_CONFIG_DIR` (account) + working directory (project) | config |

The decision rule, in one line: **behavior + tooling shared, identity + state isolated.**

---

## §2 — Same-project parallel sessions (Stream A)

Running >1 session against one repo. All mechanisms are **native** — zero install.

### 2.1 The four mechanisms

| Mechanism | Use it for | Enable |
|---|---|---|
| **git worktrees** | The file-isolation layer under everything else | `claude --worktree <name>`; `EnterWorktree` tool; `isolation: worktree` subagent frontmatter |
| **Subagents (fresh)** | Delegated work that must NOT see/pollute main context (independent review) | native; `Agent` tool |
| **Forked subagents** | Delegated work that NEEDS current context (cheaper — shared cache) | `CLAUDE_CODE_FORK_SUBAGENT=1` (set) |
| **Background sessions** | Off-critical-path work (codex review, nightly eval) — auto-isolates into a worktree before editing | `claude --bg`; `claude agents/attach/logs/stop/respawn` |
| **Agent teams** | Coordinated multi-agent builds (lead + mailbox + shared task list) | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (set) |

### 2.2 Collision-prevention discipline (the non-negotiables)

- **F1** one worktree per concurrent *writer*; **F2** scope worktrees by **module, not task**.
- **F3** agent teams do **NOT** auto-isolate — partition files explicitly per teammate in the spawn prompt.
- **I1 rebase, don't merge** between worktrees (merge commits pollute `git log`, which the model reads).
- **I2** commit/push **before** deleting any worktree or session.
- **I5** cap at **~3 parallel writers** — the binding constraint is *review throughput*, not the tool.

### 2.3 Decision matrix

| Scenario | Mechanism |
|---|---|
| 2 unrelated edits, you drive both | two `claude --worktree` sessions |
| 2 independent features, hours/days | one `--worktree <module>` per feature |
| Off-critical-path (codex review, eval) | `claude --bg` + `claude agents` to monitor |
| Coordinated feature (FE+BE+tests) | agent team, `in-process` mode, files partitioned |
| Side task needing current context | forked subagent (`/fork`) |
| Side task that must stay clean | fresh subagent |

Full detail: `research/STREAM-A-same-project-mechanics.md`.

---

## §3 — Cross-project + multi-account (Stream C)

Running N *different* projects, and N MAX accounts.

### 3.1 The isolation model

You control exactly two axes — the **config dir** (account identity) and the **working directory** (project identity).

- **`CLAUDE_CONFIG_DIR`** is the single master isolation switch — relocates *all* settings, credentials, session history AND plugins. Two sessions on different `CLAUDE_CONFIG_DIR` values share **nothing**.
- **One config dir per ACCOUNT — never per project.** A config-dir-per-project would fragment the 42-plugin set N ways. Project isolation is free: separate repo directories, each with its own in-repo `.claude/` + `.mcp.json`.
- **Directory-walk bleed:** CC walks *up* the tree loading `CLAUDE.md`. Keep all project repos under a **`CLAUDE.md`-free common parent** or a parent file silently bleeds into every child project.
- Settings precedence: Managed > CLI > Local > Project > User. Arrays merge; scalars override.

### 3.2 Multi-account routing

- **Manual switching** → `CLAUDE_CONFIG_DIR`-per-account launcher aliases (`eee-a1.ps1`, `eee-a2.ps1`). Zero install. **Do this.**
- **Automatic pooling** (round-robin + 429-failover across MAX accounts) → **CLIProxyAPI** (MIT, single Go binary, Windows-native, connects via `ANTHROPIC_BASE_URL`). LiteLLM / claude-code-router solve model-*provider* routing, **not** same-provider MAX pooling. **DEFER** — install only when automatic failover is measured-load-bearing.

Full detail: `research/STREAM-C-cross-project-multiaccount.md`.

---

## §4 — Orchestration-tool benchmark verdict (Stream B)

14 tools scored D1–D10. **The multi-agent-orchestration need is already met by the installed `agent-teams` plugin — adopt nothing.** Every tool whose pitch is "coordinate multiple agents on one task" (claude-swarm ×2, Citadel, genie) is a strict duplicate → REJECT-FOR-FIT.

The one *non-duplicative* capability — managing N separate top-level `claude` OS-processes across worktrees (the *outer* layer) — has one harness-fit candidate: **`kbwo/ccmanager`** (MIT, 1.1k★, native-Windows ConPTY, designed to coexist with agent-teams via `--teammate-mode in-process`). Composite **7.3** → **STUDY-PILOT** (an operator-side launcher, outside `.claude/` — not a harness install).

REJECT: claude-squad (tmux + AGPL), workmux (tmux-only), vibe-kanban (**sunset**), Crystal (deprecated), uzi (stale), Citadel (duplicates agent-teams + 32 self-hooks). Full table + per-dimension scores: `research/STREAM-B-orchestration-tools-benchmark.md`.

---

## §5 — Memory across parallel sessions (Stream D §1)

### 5.1 Concurrency safety per engine

| Engine | Concurrent-write verdict | Mitigation |
|---|---|---|
| `memory` (sqlite_vec) | SAFE for reads + low-rate writes (WAL + 5s busy_timeout); needs HTTP-server mode for sustained multi-writer | raise `busy_timeout` to 15s; HTTP-server mode if Z: is ever a network volume |
| `graphiti` (FalkorDB) | File won't corrupt (FalkorDB single-threaded exec); a *logical* cross-process race on shared `group_id=eee` is live | accept (low write-rate) OR one shared Graphiti HTTP server |
| **`hindsight`** | **SAFE by construction** — PostgreSQL/ACID backend, purpose-built for shared-across-subagents memory | already installed (W259-v16) — wire MCP in `HindsightEmbedded` daemon mode |

### 5.2 The scope model — two-tier

- **Isolated tier (default):** per-session / per-worktree. Unverified, in-flight scratch state. Default write target.
- **Shared tier (explicit promotion):** global/project. Verified, durable findings only — written *after* a claim passes verification. This is what makes parallel sessions **compound** instead of duplicate work.
- **Rule:** isolation is the default; sharing is an explicit, post-verification promotion. Never share raw in-flight state — that is context bleed.
- **`MEMORY.md`/`CLAUDE.md` contention:** worktree-per-session removes working-copy contention; use append-only dated entries for any genuinely shared memory file; route durable facts to the KG engines, not to `.md` files; never let a `/loop` auto-edit `CLAUDE.md`.

Full detail: `research/STREAM-D-memory-git-practice.md` §1.

---

## §6 — Git practice for parallel sessions (Stream D §2–4)

### 6.1 The playbook

- **One branch per session, one worktree per branch.** Never two sessions on one branch.
- **Short-lived branches, frequent rebase onto `main`.** Keeps the eventual conflict surface tiny.
- **`main` is the integration trunk** — in a parallel regime even the lead session works on a branch and merges, so `main` stays a clean fast-forward target.
- **`git worktree remove`, never `rm -rf`.** `remove` keeps admin data consistent; `rm -rf` leaves dangling refs.
- **Lock removable-volume worktrees** (Z: is portable) so an unmount-time prune cannot wipe admin data.
- Cleanup is part of the workflow: branch merges → `git worktree remove` its worktree → delete the branch.

### 6.2 SOTA git add-ons — scored

| Tool | Verdict | Reason |
|---|---|---|
| **git-cliff** | **ADOPT (optional)** — direct-CLI only | changelog from the existing conventional commits; never wrap in a self-invent script |
| lefthook | **REJECT** | a hook *manager* owning `.git/hooks` = a 2nd hook authority; cardinal-rule-2 conflict |
| pre-commit (framework) | **REJECT** | duplicates the installed direct-CLI lint hooks; 2nd hook authority |
| git-branchless | **REJECT (for now)** | installs its own hook machinery; value < cardinal-rule-2 friction at solo scale |
| jj / Jujutsu | **WATCHLIST** | genuinely SOTA for agent parallel-dev (auto-snapshot) but a whole-VCS swap — its own evaluation, not a side-effect |

### 6.3 GitNexus — the cross-session code-intelligence graph

`gitnexus` MCP is **INSTALLED-LIVE**. Its role: **shared, precomputed repo comprehension** — instead of N sessions each re-deriving call graphs / blast radius, they query one code-graph (LadybugDB, max 5 concurrent connections — comfortable for solo parallel work, read-dominant). It is the code-structure analogue of §5's shared memory tier. **Keep it wired; do NOT enable its bundled auto-analyze PostToolUse hook** (cardinal-rule-2) — run `gitnexus analyze` manually after significant merges, or add it as an explicit direct-CLI `settings.json` command.

---

## §7 — The definitive per-layer SHIP-DECISION matrix

| # | Layer | Converged SOTA pick | Disposition | Decisive evidence |
|---|---|---|---|---|
| 1 | Same-project file isolation | **git worktrees** (native) | **NATIVE-LIVE** | Stream A — 4-org convergence (Anthropic docs + 3 practitioners) |
| 2 | Same-project work distribution | subagents · forks · background sessions (native) | **NATIVE-LIVE** | Stream A — primary-source verified |
| 3 | Multi-agent orchestration | **`agent-teams` plugin** (installed) | **INSTALLED-LIVE** — adopt nothing new | Stream B — null result; every alternative duplicates it |
| 4 | Outer-session management (N `claude` procs) | `kbwo/ccmanager` | **STUDY-PILOT** — operator launcher, not an install | Stream B — composite 7.3, sole harness-fit candidate |
| 5 | Cross-project isolation | `CLAUDE_CONFIG_DIR`/account + per-repo `.claude/` | **RECONFIGURE** | Stream C — official-docs primary |
| 6 | Multi-account routing | `CLAUDE_CONFIG_DIR` aliases (now) · CLIProxyAPI (standby) | **WIRE** (aliases) / **DEFER** (CLIProxyAPI) | Stream C — ≥3-org convergence |
| 7 | Memory concurrency hardening | `memory` busy_timeout raise; HTTP-server mode if needed | **WIRE** | Stream D — code-verified via DeepWiki |
| 8 | Shared memory substrate | **`vectorize-io/hindsight`** | **INSTALLED-LIVE** | Stream D + W259-v16 — independent cross-session convergence |
| 9 | Memory scope model | two-tier: isolated default, shared = post-verification | **ADOPT (discipline)** | Stream D — 3-org convergence |
| 10 | Git practice | 1 branch/session · worktree/branch · rebase · `--ff-only` | **ADOPT (discipline)** | Stream A I1–I5 + Stream D §2 |
| 11 | Git add-ons | git-cliff (optional) · reject lefthook/pre-commit/branchless · jj watchlist | **OPTIONAL / REJECT** | Stream D §3 |
| 12 | Cross-session code-graph | **GitNexus** (installed) | **INSTALLED-LIVE** — keep, don't enable its hook | Stream D §4 — code-verified |

**Net:** the parallel-session architecture is **native + already-installed**. The work is *configuration and discipline*, not acquisition. The only genuinely new evaluation is ccmanager (STUDY-PILOT), and the only standby is CLIProxyAPI (DEFER).

---

## §8 — The wiring punch-list

Each item tagged by **contention status** — whether it touches a file/branch the live concurrent W259-v16 session (§9) is also writing.

| # | Action | File | Contention | Reversible |
|---|---|---|---|---|
| W1 | `worktree.baseRef: "head"` — worktree subagents see unpushed work-in-progress | `.claude/settings.json` | **CONTENDED** | yes (<1 min) |
| W2 | `teammateMode: "in-process"` — Windows-critical (split panes unsupported in Windows Terminal) | `.claude/settings.json` | **CONTENDED** | yes |
| W3 | `MCP_MEMORY_SQLITE_PRAGMAS=busy_timeout=15000,cache_size=20000` on the `memory` server env | `.mcp.json` | low | yes |
| W4 | ✅ **DONE 2026-05-20** — `CLAUDE_CODE_PROJECT_DIR` removed from `tools/eee.ps1`, `tools/eee-backup.ps1`, `tools/preagent-parallel-guard.mjs` (kept as test-fixture-only slot per W338 audit). Verified phantom via codex GPT-5.5 + strings-grep on claude.exe binary (zero refs). `CLAUDE.local.md:45` is gitignored per-machine — operator removes manually. | `CLAUDE.local.md` (operator) | low (gitignored, per-machine) | yes (re-add) |
| W5 | Reconcile `w260-trueup` → `main` (now a near-superset; one-conflict resolve in `settings.json`) | git `main` | **CONTENDED — live writer** | yes (tag + reflog) |
| W6 | Clean orphan worktree dirs `serene-johnson-d364cb` + `w259-final-synthesis`; `git worktree prune` | `.claude/worktrees/` | low (verify PID first) | n/a |
| W7 | Add `eee-a2.ps1` launcher for a 2nd MAX account (own `CLAUDE_CONFIG_DIR`) | new launcher file | none | yes (delete) |
| W8 | Wire `hindsight` MCP in `HindsightEmbedded` daemon mode + two-tier `bank_id` | `.mcp.json` | low | yes |
| W9 | (optional) ccmanager STUDY-PILOT — `npx ccmanager`, evaluate; never wire as a hook/plugin | external | none | yes (`npm uninstall`) |

**Contended items (W1, W2, W5) must NOT be applied while the concurrent session is committing** — that re-creates the exact collision this architecture exists to prevent. They need a coordinated quiet window (see §9).

---

## §9 — Live incident: the collision this architecture fixes

**Observed, this session, 2026-05-16 22:20–22:43** (`git log` / `git reflog`, committer `42`):

```
09f4efa  22:43:04  docs(W259-v16): memory/RAG catalog coverage audit — SATURATED, 0 gaps
46b2d90  22:37:17  docs(parallel-sessions): research streams A/C/D    <- swept up THIS work's files
b4eff2c  22:29:36  docs(W259-v16): ultimate memory-layer architecture — 5-tier composed stack
17c9e93  22:29:34  fix(W259-v16): retract false 'independently reproduced' claim
bc35597  22:20:30  feat(W259-v16): install hindsight memory plugin
```

**Diagnosis.** A second Claude Code session (the **W259-v16 memory-architecture arc**) ran concurrently with this parallel-sessions research session, **both on `main`**, with **no branch isolation and no coordination**. `settings.json` confirms there is **no auto-commit hook** — these are deliberate commits from a live session. Consequences actually observed:

1. **Cross-contamination of commits** — the W259-v16 session's `git add` swept this work's `STREAM-A/C/D` research files into *its* commit `46b2d90` under a borrowed message.
2. **Branch re-divergence as a moving target** — `w260-trueup` was reconciled toward `main` (merge `5ebeb69`), then `main` immediately advanced again (`09f4efa`), re-diverging it. Any reconcile attempted *during* concurrent commits is stale on arrival.
3. **`settings.json` as the recurring conflict point** — the one file that conflicts in every `w260-trueup`↔`main` merge test.

**This is the textbook anti-pattern.** Two writers, one branch, ad-hoc integration — precisely what §2.2 (F1/I1/I5) and §6.1 prohibit. **Had both sessions followed the architecture** — W259-v16 on a `w259-v16` branch+worktree, this work on a `parallel-sessions` branch+worktree, `main` as a clean integration trunk — there would have been zero contamination and each branch would `--ff-only` merge cleanly.

### 9.1 The reconcile procedure (run in a coordinated quiet window)

When the concurrent session is paused, this is a ~3-minute operation:

```bash
# 0. Safety net
git tag pre-parallel-reconcile-$(date +%s)

# 1. Pre-flight: main must be clean. Commit/stash its dirty files first
#    (CLIProxyAPI submodule, the staged W259v16 audit, untracked config.toml etc.)

# 2. w260-trueup already merged main once; bring it fully current, then land it
cd Z:/claude-sota-installed-w260-trueup
git rebase main                 # replays the W260 commits onto current main tip
#   -> resolve the single .claude/settings.json conflict as a UNION:
#      keep W260's ccstatusline statusLine + main's W259 PostToolUse hooks
git checkout main
git merge --ff-only w260-trueup # linear, no merge commit
git branch -d w260-trueup
git worktree remove Z:/claude-sota-installed-w260-trueup

# 3. Then apply W1/W2/W3 settings wiring on the now-stable main
# 4. gitnexus analyze   (index is stale post-merge)
```

`--ff-only` is the safety assertion: if it fails, `main` moved again — re-rebase. It can never silently create an unexpected merge.

---

## §10 — How this persists across context loss

So a future session (with no memory of this arc) keeps the practice:

- This document + the 4 `research/` files are the durable record — committed to the repo.
- The discipline items (§2.2, §6.1) belong in `CLAUDE.md` as a short pointer once §8 W-items land.
- The verified findings should be promoted to the **shared memory tier** (graphiti `group_id=eee` / hindsight shared bank) per §5.2 — so a future session *recalls* "parallel sessions use worktrees + branch-per-session" without re-reading this file.

---

## Source index

- `research/STREAM-A-same-project-mechanics.md` — worktrees, agent teams, background sessions, forks
- `research/STREAM-B-orchestration-tools-benchmark.md` — 14-tool D1–D10 benchmark
- `research/STREAM-C-cross-project-multiaccount.md` — config isolation, multi-account routing
- `research/STREAM-D-memory-git-practice.md` — memory concurrency, git practice, GitNexus
- Official Claude Code docs — `worktrees`, `sub-agents`, `agent-teams`, `agent-view`, `settings`, `env-vars`, `mcp`, `memory` at `code.claude.com/docs`
