# LAYER H — GIT / VERSION-CONTROL SUBSTRATE (W259 v5)

> **Wave**: W259 WAVE-5 GIT/VCS LAYER ARCHITECT
> **Date**: 2026-05-16
> **Mandate**: Operator declared *"git is also the essential part of the SOTA grand architecture, you need to include all the layers."* W259's 22-layer architecture (`07-final-synthesis/W259-ULTIMATE-SYNTHESIS-FINAL.md`, L0–L9) has **no explicit Version-Control layer** — git is only implicit (gitnexus is L0.9 META-RUNTIME-GRAPH). This document designs the missing layer and proposes it as **L0.4 — VERSION CONTROL SUBSTRATE**.
> **Scope of runtime audited**: `Z:\claude-sota-installed\` — single-dev, multi-MAX, Windows 11 Z:-portable agentic CC runtime. 56 git worktrees (49 locked agent-isolation + 6 named + main), 67 branches (59 `worktree-agent-*` + 8 named), `commit-commands` plugin installed, `gitnexus` MCP installed.
> **Cite discipline**: Per CLAUDE.md cardinal-rule-1 (install primitives only from trusted plugins/skills/agents) + the W259 catalog citation convention. TIER-1 = Anthropic CC docs / upstream-canonical; TIER-2 = named-author / vendor docs; TIER-3 = local operator-derived. Authoritative external sources used: Anthropic `claude-code` issue #55435 (worktree leak — TIER-1-adjacent, Anthropic-hosted), jj-vcs/jj README + docs (TIER-2 upstream), gitbutlerapp/gitbutler `crates/but/skill/SKILL.md` (TIER-2 upstream), evilmartians/lefthook docs (TIER-2 upstream).

---

## §0 — Why git is a load-bearing architecture layer for agentic runtimes

The W259 synthesis treats git as plumbing — something that exists below the catalog rather than a layer *in* it. That is a category error for an **agentic** runtime, and the operator's directive is correct. Five reasons git is load-bearing, not incidental:

1. **Git IS the agent-isolation primitive.** The CC `EnterWorktree` primitive and `Agent(isolation: "worktree")` directive are pure git-worktree wrappers. Every parallel-agent dispatch in this runtime — the backbone of LAYER-B orchestration — *is* a `git worktree add` + a `worktree-agent-*` branch. There is no parallel-agent layer without a version-control layer underneath it. The 49 locked worktrees in this repo are not debris; they are the **physical manifestation of L0.4 in use**. (Source: Zylos Research 2026-02-22 "Git Worktree Isolation Patterns for Parallel AI Agent Development" — *"Git worktrees have emerged as the dominant isolation primitive for running multiple AI coding agents in parallel… now natively supported by Claude Code, OpenAI Codex, and Cursor"*; Anthropic `claude-code` issue #55435 confirms `Agent(isolation:"worktree")` provisions `.claude/worktrees/agent-*` + `worktree-agent-*` branch.)

2. **Git IS the durable-state layer.** The W259 catalog is now 6,640 git-tracked files (verified: `git ls-files docs/architecture/W259-grand-catalog | wc -l` → 6640). The memory layer (LAYER-A: graphiti, mcp-memory) is *runtime* state; the catalog, the CLAUDE.md discipline, the install manifests, the wave-research deliverables are *durable* state — and their durability is git's commit DAG. A 129 MB `.git` directory is this runtime's institutional memory. LAYER-A is volatile working memory; **L0.4 is the write-ahead log of the entire project**.

3. **Git IS the audit/provenance substrate.** LAYER-E surfaced sigstore/cosign for signed provenance. Provenance attaches to *commits*. The cross-model-consensus gate, the wave-numbered decision trail, the codex-rescue records — every one of them is auditable only because it is a git commit with a timestamp and an author. Without a deliberate L0.4, "who/what/when changed this" has no home.

4. **Git is the agentic failure surface.** Issue #55435 documents a **correctness hazard**, not just a disk-hygiene nuisance: a leftover worktree leaves the parent repo's `HEAD` on `worktree-agent-*` instead of `main`, and a subsequent `git merge --no-ff` reports *"Already up to date"* against the wrong branch — a **silent no-op merge that loses agent work**. This runtime has 49 such leftover worktrees right now. An un-designed git layer is an *active data-loss risk* for an agentic runtime, distinct from any other layer's failure modes. The runtime's own CLAUDE.local.md (ENV-h W50F2 note) already records FM-17.b/d "autocompact-thrash" inside codex-rescue worktree wrappers — git-layer failure modes are already biting.

5. **Git is the cross-tool integration point.** `gh`/`glab` (forge), `pre-commit`/`gitleaks` (L0.5 quality/security gates), `gitnexus` (L0.9 code-graph — *built on* the git commit history), `commit-commands` plugin (LAYER-B), conventional-commits + changelog tooling (release), `.gitattributes`/`core.longpaths` (Windows correctness) — all of these *bind to git*. They are currently scattered across L0.5, L0.9, and LAYER-B with no coherent owner. L0.4 is the integration seam that makes them a stack instead of a pile.

**Conclusion**: git is not below the architecture; it is **L0.4 — the substrate the orchestration, memory, security, and provenance layers all stand on**. It belongs in the catalog as an explicit, deliberately-designed layer. The rest of this document scores the SOTA tooling for it (§1–§10), designs the layer (§11), audits the operator's current git state (§12), renders the 2026 jj-vs-git verdict (§13), and gives the final install/adopt recommendation (§14).

### Scoring rubric (23-dimension-aware, condensed to a git-relevant 10)

All comparison tables below score 0–5 per dimension. The W259 23-dim master rubric is condensed to the dimensions that actually discriminate git tooling:

| Dim | Name | Meaning |
|-----|------|---------|
| D1 | SOTA-convergence | Do ≥3 organizationally-distinct sources treat this as current best-in-class? |
| D2 | Windows / Z:-portable fit | Native Windows binary, `core.longpaths`-aware, no POSIX-only assumptions |
| D3 | Agentic / headless fit | Scriptable, non-interactive, structured (JSON) output, no TUI-only paths |
| D4 | Single-dev fit | Useful without a team / forge-org / CI fleet |
| D5 | Maturity / stability | Production-ready vs experimental; release cadence |
| D6 | Install/maintenance cost | Single binary vs runtime-dependency chain; reversibility |
| D7 | Interop / lock-in risk | Co-exists with plain git; zero-risk exit |
| D8 | Worktree / parallel-isolation support | First-class parallel-workspace story |
| D9 | Provenance / audit value | Operation log, signing, immutable trail |
| D10 | CC-ecosystem integration | Plugin exists / documented CC-skill / native CC support |

---

## §1 — Worktree managers

The operator's runtime *is* a worktree-heavy runtime (56 worktrees). This is the highest-priority category.

| Tool | D1 | D2 | D3 | D4 | D5 | D8 | D10 | Total/35 | Notes |
|------|----|----|----|----|----|----|----|----------|-------|
| **CC native `EnterWorktree` / `Agent(isolation:"worktree")`** | 5 | 4 | 5 | 5 | 4 | 5 | 5 | **33** | Already installed. The primitive that *created* this runtime's 49 worktrees. Strength: zero-install, native, agent-aware. Gap: no GC on thread-exit (issue #55435) — the leak this whole audit exists to fix. |
| **git-worktree (native git)** | 5 | 5 | 5 | 5 | 5 | 5 | 4 | **34** | The substrate everything else wraps. `git worktree add/list/remove/prune`. Windows-native, longpaths-aware, zero dependency. The GC tooling (§11/§12) is just disciplined use of `git worktree prune` + `remove`. |
| `git-worktree-manager` (Rich TUI, JoshYG-TheKey) | 2 | 3 | 1 | 3 | 2 | 4 | 1 | 16 | Interactive Rich TUI — *anti-pattern for headless agentic use* (D3=1). Single-author, low activity. Reject. |
| `wtm` (AI-Squad-Org) | 3 | 3 | 3 | 3 | 2 | 4 | 2 | 20 | Explicitly "for AI-assisted parallel development" — closest intent match among third-party managers, but young, single-org, npm-runtime dependency. Study, do not install. |
| `moberghr/cli-work-tree-manager` | 3 | 4 | 3 | 3 | 2 | 4 | 3 | 22 | Cross-platform, multi-repo groups, "launch Claude Code automatically" — most actively maintained third-party (pushed 2026-05-08). Still single-org, redundant with native + a thin script. |
| `lucasmodrich/git-worktree-manager` (`gwtm`, bare-clone model) | 3 | 4 | 3 | 4 | 2 | 4 | 1 | 21 | Bare-clone + worktree pattern is architecturally clean, but the operator already has a non-bare repo with 56 worktrees — migration cost not worth it. |
| sapling worktrees | 2 | 2 | 2 | 2 | 3 | 3 | 1 | 15 | Sapling's model de-emphasizes worktrees; Windows story weak; Meta-internal-first. Reject for this runtime. |

**Pick**: **git-worktree (native) + CC native `EnterWorktree`** — D8=5 each, already installed, zero lock-in. The *only* gap is lifecycle GC, and that is a **discipline + thin-script** problem (§11.1, §12), **not** a tool-acquisition problem. Installing a third-party worktree manager would add a runtime dependency to paper over a 20-line cleanup script. **No new install.**

> **The single most important §1 finding**: per the Zylos Research piece, *"Most teams cap at 8-10 concurrent worktrees before management overhead exceeds the parallelism benefit."* This runtime has **56**. The problem is not "we need a better worktree tool"; it is "we have no worktree *lifecycle policy*." §11.1 + §12 fix that.

---

## §2 — Next-generation VCS

The "should we move off git" question. Detail verdict in §13.

| Tool | D1 | D2 | D3 | D5 | D6 | D7 | D8 | D9 | Total/40 | Notes |
|------|----|----|----|----|----|----|----|----|----------|-------|
| **jj (jujutsu — Google)** | 5 | 3 | 5 | 3 | 4 | 5 | 4 | 5 | **34** | The 2026 frontrunner. Co-located `.git` mode = zero-risk interop (D7=5). Op-log = best-in-class provenance (D9=5). Conflict-as-data + auto-rebase = genuinely agent-friendly (D3=5). **Self-described "experimental", pre-1.0 (D5=3); no `git-worktree` support (uses `jj workspace` instead); Windows works but has documented rough edges — symlinks need Dev Mode, no `.gitattributes` honoring** (deepwiki: jj-vcs/jj). |
| **git (incumbent)** | 5 | 5 | 4 | 5 | 5 | 5 | 5 | 3 | **37** | Universal, fully Windows-native, every tool in this document binds to it, `git worktree` is the isolation primitive in use. Weak only on D9 (reflog expires; no first-class op-log) and D3 (staging area + detached-HEAD are agent footguns). |
| sapling (Meta) | 3 | 2 | 3 | 4 | 3 | 3 | 3 | 4 | 25 | Strong UX, but Meta-internal-first, weaker Windows story than jj, smaller momentum than jj in 2026. Loses the next-gen race to jj. |
| pijul | 2 | 2 | 2 | 2 | 3 | 1 | 2 | 4 | 18 | Patch-theory-pure, but not git-interoperable (D7=1 — hard lock-in), tiny ecosystem. Reject. |
| gitButler | 4 | 4 | 5 | 3 | 3 | 5 | 4 | 4 | **32** | Virtual branches; **has a real headless `but` CLI with `--json`, a shipped `crates/but/skill/SKILL.md` for AI agents, and a Claude system prompt** (deepwiki: gitbutlerapp/gitbutler). Sits *on top of* git (D7=5). See §3/§5. |
| git-branchless (`git-branchless`/`git undo`) | 4 | 4 | 4 | 4 | 5 | 5 | 3 | 4 | **33** | Adds jj-like `git undo`, smartlog, and stacked-commit ergonomics *without leaving git*. Single binary, pure git-compatible, Windows-supported. The **lowest-risk way to get 70% of jj's agent-friendly ergonomics** on top of the incumbent. |

**Pick**: **Stay on git as the substrate (D-total 37); adopt `git-branchless` as the ergonomics overlay (D-total 33); pilot jj in a sandbox repo, do NOT migrate the main runtime yet.** Full reasoning in §13.

---

## §3 — TUI git

TUI tools are for *human* interactive use. For an agentic runtime they are D3-weak by definition (a TUI is not scriptable). Scored honestly, then dispositioned as "human-comfort, optional."

| Tool | D2 | D3 | D5 | D6 | D10 | Total/25 | Notes |
|------|----|----|----|----|----|----------|-------|
| **lazygit** | 5 | 1 | 5 | 5 | 3 | **19** | The de-facto SOTA git TUI. Single Go binary, fully Windows-native, huge community. Excellent for the *operator* to eyeball 56 worktrees / 67 branches. D3=1 (TUI — not for agents). |
| gitui | 5 | 1 | 4 | 5 | 1 | 16 | Rust, faster on huge repos, smaller feature set than lazygit. Fine alternative; lazygit wins on ecosystem. |
| tig | 3 | 2 | 4 | 4 | 1 | 14 | ncurses, log-browser-first, weaker on Windows (needs MSYS). Legacy. |
| gitu (magit-like) | 4 | 1 | 3 | 4 | 1 | 13 | Young, magit-inspired. Promising but immature. |

**Pick**: **lazygit — install as an OPTIONAL operator-comfort tool only.** It is genuinely the best git TUI and will make the operator's worktree/branch triage (§12) far less painful, but it is **not part of L0.4's agentic path** — agents never touch it. Classify it L0.4-adjacent "operator console," install via `scoop`/`winget`, never wire it into a hook or skill.

---

## §4 — Commit-discipline tooling (conventional commits, changelog, lint)

The operator's commit history is **already disciplined** — verified last-15-subjects sample shows `docs(W259-v4): …`, `refactor(W255): …`, `feat(install): …`, `fix(w195-hotfix): …`: this is **conventional-commits-with-a-wave-scope** already, by hand. The question is whether to *mechanize* it.

| Tool | D1 | D3 | D4 | D5 | D6 | D10 | Total/30 | Notes |
|------|----|----|----|----|----|----|----------|-------|
| **conventional-commits spec (the convention, no tool)** | 5 | 5 | 5 | 5 | 5 | 4 | **29** | The operator already follows it. Costs nothing, no install, no runtime. The convention *is* the win. |
| **git-cliff (orhun)** | 5 | 5 | 5 | 5 | 5 | 3 | **28** | SOTA changelog generator. **Single Rust binary**, Windows-native, config-driven, parses conventional commits, actively maintained (pushed 2026-05-13). Generates `CHANGELOG.md` from the wave-numbered history with zero ceremony. The one commit-discipline tool worth installing. |
| commitlint | 4 | 4 | 3 | 4 | 2 | 3 | 20 | Node-runtime dependency; enforces conventional format via a `commit-msg` hook. The operator doesn't *need* enforcement (already compliant) — but a `commit-msg` hook is cheap insurance for agent-authored commits. |
| cocogitto (`cog`) | 4 | 4 | 4 | 4 | 4 | 2 | 22 | Rust, single binary; conventional-commit check + changelog + bump in one tool. Overlaps git-cliff; pick one. git-cliff has the larger ecosystem. |
| commitizen / czg | 3 | 2 | 3 | 4 | 2 | 2 | 16 | **Interactive commit-prompt wizards — anti-pattern for agentic use** (D3=2). The `commit-commands` plugin already covers human-assisted commit authoring. Reject. |

**Pick**: keep the **conventional-commits convention** (free, already in use) + install **git-cliff** for changelog generation (single binary, fits Z:-portable). Add a lightweight **`commit-msg` regex check** (see §11.2) — not full commitlint, just a guard so agent-authored commits keep the `type(wNNN-scope): subject` shape.

---

## §5 — Stacked diffs / PR workflow

This category is **mostly N/A for a single-developer runtime with no PR review process** — but the *stacking* ergonomics still matter for agents producing dependent commits.

| Tool | D1 | D3 | D4 | D5 | D7 | D10 | Total/30 | Notes |
|------|----|----|----|----|----|----|----------|-------|
| graphite (`gt` CLI) | 4 | 3 | 2 | 4 | 3 | 2 | 18 | SOTA *team* stacked-PR tool, but built around a hosted service + GitHub PR review — **D4=2, near-useless for a solo runtime with no review fleet**. |
| git-town | 4 | 4 | 3 | 5 | 4 | 2 | 22 | Branch-workflow automation (`git town sync/ship/hack`), single binary, Windows-OK. The `ship` command's "merge feature → main, delete branch" is exactly the missing `clean_gone` discipline (§12). Mature, scriptable. |
| **git-branchless** | 4 | 4 | 4 | 5 | 5 | 2 | **24** | Already picked in §2. Its `git move`/smartlog/`git undo` give stacked-commit ergonomics *inside git*, no service, no PR dependency. Best D4 (solo-friendly) in this category. |
| spr / ghstack / git-spice | 3 | 3 | 2 | 3 | 3 | 2 | 16 | All GitHub-PR-centric; D4-weak for a solo no-PR runtime. git-spice is the freshest but still review-flow-shaped. |

**Pick**: **none as a dedicated install.** `git-branchless` (already picked) covers the stacking *ergonomics*; the operator runs no PR-review process so dedicated stacked-PR tooling has nowhere to plug in. If a forge-PR workflow ever appears, revisit **git-town** (best single-binary, no-service option).

---

## §6 — Git hooks frameworks

L0.4 needs a hook *manager* — the runtime has exactly **one** active git hook today (`prepare-commit-msg`, verified) and gitleaks/ruff/pyright are wired through `.claude/settings.json` CC-hooks, not git-hooks. A git-hooks manager makes the `commit-msg`/`pre-commit` git-native gates coherent.

| Tool | D1 | D2 | D3 | D5 | D6 | Total/25 | Notes |
|------|----|----|----|----|----|----------|-------|
| **pre-commit** | 5 | 4 | 4 | 5 | 3 | **21** | Already in the W259 catalog (T0.5). Python-runtime (the runtime has `Z:\venvs\claude`), huge hook ecosystem, gitleaks/ruff hooks ready-made. Mature. D6=3: needs Python + a managed env. |
| **lefthook (evilmartians)** | 5 | 5 | 5 | 5 | 5 | **25** | **Single dependency-free Go binary**, fully Windows-native (amd64/arm64/386, documented Windows-specific fixes), YAML config, **parallel hook execution**, polyglot (deepwiki: evilmartians/lefthook). Strictly better D2/D6 than pre-commit for a Windows Z:-portable single-binary-preferring runtime. |
| husky | 3 | 3 | 3 | 4 | 2 | 15 | Node-runtime, JS-ecosystem-first. The runtime is Python+Rust-leaning; husky adds an unwanted Node dependency. Reject. |
| git-hooks.nix | 3 | 1 | 3 | 4 | 1 | 12 | Nix-based — D2=1 on Windows (no practical Nix story). Reject. |

**Pick**: **lefthook (D-total 25 — perfect score).** It is the single-binary, Windows-native, zero-dependency hooks manager that matches this runtime's Z:-portable, single-binary-preferring posture. `pre-commit` is already catalogued and is a fine fallback, but lefthook is the *better* L0.4 choice precisely because it adds no runtime dependency. **Recommendation: L0.4 standardizes on lefthook**; if the runtime keeps pre-commit from T0.5, run *only one* to avoid double-fire.

---

## §7 — Git-as-database / agent state

The W259 catalog being git-committed (6,640 files) makes this category architecturally relevant: git *is* already the durable-state store.

| Tool | D1 | D3 | D4 | D5 | D9 | Total/25 | Notes |
|------|----|----|----|----|----|----------|-------|
| **git itself (commit DAG as state log)** | 5 | 5 | 5 | 5 | 4 | **24** | The catalog, manifests, CLAUDE.md discipline are *already* git-as-database. No tool needed — just the recognition (§0 #2) that this is a deliberate layer responsibility. |
| **gitoxide (`gix`)** | 4 | 5 | 4 | 4 | 3 | **20** | Pure-Rust git implementation; **the library jj's git backend is built on**. Not an end-user tool — relevant as *the* foundation if the runtime ever builds custom git tooling. Note for L0.4: any future bespoke git automation should target gitoxide, not shell-out-to-git. |
| git-bug | 3 | 3 | 3 | 3 | 4 | 16 | Bug-tracker-in-git-objects. Interesting for offline issue tracking, but the runtime uses wave-numbered docs + memory MCP for that. Redundant. |
| dolt (git-for-data / SQL) | 3 | 3 | 2 | 4 | 4 | 16 | A full SQL database with git semantics. Powerful but heavyweight; the runtime's structured state lives in Qdrant/FalkorDB/graphiti (LAYER-A). No fit. |
| git-appraise | 2 | 3 | 2 | 2 | 3 | 12 | Distributed code review in git-notes. Stale project, no solo-runtime value. Reject. |

**Pick**: **git itself — formally designate the commit DAG as L0.4's durable-state responsibility** (the catalog already lives there). **No install.** Note gitoxide as the sanctioned foundation for any *future* bespoke git tooling, consistent with cardinal-rule-1 (don't self-invent; build on a trusted library).

---

## §8 — AI-git integration

Auto-generating commit messages. The operator **already has the `commit-commands` plugin** (commit / commit-push-pr / clean_gone) which uses CC itself to author commits — so a *separate* AI-commit tool would be redundant model spend.

| Tool | D1 | D3 | D6 | D10 | Redundancy | Total/20 | Notes |
|------|----|----|----|----|-----------|----------|-------|
| **CC `commit-commands` plugin** | 5 | 5 | 5 | 5 | — | **20** | **Already installed.** The orchestrator model writes the commit message with full repo context — strictly better than a separate small-model commit tool. `clean_gone` is also the branch-hygiene command this runtime needs (§12). |
| aicommits | 3 | 4 | 3 | 1 | HIGH (vs commit-commands) | 11 | Node CLI, separate OpenAI key, small-context. Redundant with commit-commands. Reject. |
| opencommit | 3 | 4 | 3 | 1 | HIGH | 11 | Same class as aicommits. Reject. |
| gptcommit | 2 | 4 | 3 | 1 | HIGH | 10 | `prepare-commit-msg` hook that calls GPT. **The runtime already has a `prepare-commit-msg` hook** — do not stack a second. Reject. |
| GitHub Copilot CLI git features | 3 | 3 | 3 | 2 | HIGH | 11 | Another subscription, another model. Redundant. Reject. |

**Pick**: **CC `commit-commands` plugin — already installed, D-total 20 (perfect).** Every standalone AI-commit tool is **CR-12 DUPLICATE-FUNCTIONALITY** against it (the runtime's own CLAUDE.md cites this exact rejection pattern — see the `claude-mem@thedotmack` rejection in main's commit log). **No install. Reject the entire standalone-AI-commit category.**

---

## §9 — Repo intelligence

| Tool | D1 | D2 | D3 | D5 | D9 | Total/25 | Notes |
|------|----|----|----|----|----|----------|-------|
| **gitnexus (operator-installed MCP)** | 4 | 4 | 5 | 4 | 4 | **21** | Already installed (L0.9). cypher/impact/route_map code-graph over the git history. The "repo intelligence" slot is filled. |
| **gitleaks** | 5 | 5 | 5 | 5 | 4 | **24** | Already in the W259 catalog (L0.5). Secret-scanning single Go binary, Windows-native. **L0.4's job is to wire it as a `pre-commit` git-hook** (via lefthook §6) so secrets are caught *before* an agent commits them — currently it is a CC-hook, which fires later. |
| **git-sizer** | 4 | 5 | 5 | 4 | 3 | **21** | Single Go binary; reports repo-health pathologies (huge blobs, too many refs). **Directly useful right now**: 67 refs + 129 MB `.git` — git-sizer would quantify whether the agent-branch sprawl is bloating the repo. One-shot diagnostic; install or run-once. |
| git-filter-repo | 4 | 4 | 4 | 4 | 2 | 18 | The modern history-rewrite tool (replaces BFG/`filter-branch`). Keep available for *emergency* history surgery (e.g. a committed secret), not routine use. Python script. |
| git-quick-stats | 3 | 3 | 3 | 3 | 2 | 14 | Bash contribution-stats; solo runtime → low value. Skip. |

**Pick**: **gitnexus** (installed) + **gitleaks** (installed — *re-wire as a git-hook*) + **git-sizer** (install — one-shot repo-health diagnostic, single binary). Keep **git-filter-repo** documented as the sanctioned emergency-only history-surgery tool.

---

## §10 — Forge CLIs

| Tool | D2 | D3 | D4 | D5 | D10 | Total/25 | Notes |
|------|----|----|----|----|----|----------|-------|
| **gh (GitHub CLI)** | 5 | 5 | 4 | 5 | 5 | **24** | SOTA forge CLI. Single binary, Windows-native, fully scriptable (`--json`), and the GitHub MCP this runtime already uses is conceptually `gh`-shaped. Install if/when the runtime pushes to a GitHub remote. |
| glab (GitLab) | 4 | 4 | 3 | 4 | 2 | 17 | Only if the runtime adopts a GitLab remote. Not now. |
| tea (Gitea) | 4 | 4 | 2 | 3 | 1 | 14 | Self-hosted-forge niche. No fit. |
| gitlab-ci-local | 3 | 3 | 2 | 3 | 1 | 12 | Local CI runner — the runtime has no `.gitlab-ci.yml`. No fit. |

**Pick**: **gh — install only when a forge remote is added.** The audited runtime currently has **no remote** (verified: `git config --local --list` shows no `remote.*`). Until there is a remote, all forge CLIs are premature. **Defer.** The `commit-push-pr` command in the `commit-commands` plugin already assumes a future `gh`-style path.

---

## §11 — L0.4 VERSION-CONTROL-SUBSTRATE layer design

### 11.0 Layer placement & one-line definition

> **L0.4 — VERSION CONTROL SUBSTRATE**: the git-based durable-state, agent-isolation, and provenance layer that the orchestration (LAYER-B), memory-durability (LAYER-A), security-gate (L0.5), and provenance (LAYER-E) layers all stand on.

Placement rationale: it sits **above** L0 (raw OS/filesystem) and L0.3-ish bootstrap, **below** L0.5 (quality/security gates — which fire *as git hooks*), and **below** L0.9 (gitnexus — which reads the git DAG). Numbering `0.4` puts it between bootstrap and the quality-gate layer, which is exactly its dependency position.

### 11.1 Sub-concern: Worktree strategy

The agent-isolation pattern, stated as policy:

- **Creation**: agents get worktrees via the CC native `Agent(isolation:"worktree")` / `EnterWorktree` primitive — **no third-party manager** (§1). Worktrees live under `.claude/worktrees/` (already gitignored — correct, see §12).
- **Naming**: agent worktrees use the CC-generated `agent-<hash>` dir + `worktree-agent-<hash>` branch (current behavior). Keep it.
- **Lifecycle policy — the missing piece**. Per Zylos Research's *"cap at 8-10 concurrent worktrees"* and Anthropic issue #55435's proposed runner behavior, L0.4 mandates:
  1. **On agent-thread terminal state** (success/fail/timeout): the worktree SHOULD be `git worktree remove --force`'d and its branch `git branch -D`'d **if the branch has no unmerged commits**. CC does not yet do this (issue #55435 is open) — so until upstream fixes it, the runtime needs a **sweep**.
  2. **Periodic sweep** (the GC script — §12 gives the exact commands): `git worktree prune` for orphans whose directory is gone, plus a pid-liveness check on each `.git/worktrees/agent-*/locked` file — if the recorded pid is dead, the worktree is GC-eligible.
  3. **Threshold alert**: if `git worktree list | grep -c agent-` exceeds ~10, that is a signal the sweep is overdue.
  4. **Crash-safety**: any *future* bespoke worktree-dispatch script must wrap the run in `trap 'git worktree remove --force "$WS"' EXIT` (Background Claude 2026-04-10 recipe) so the crash path cleans up, not just the happy path.
- **`extensions.worktreeconfig=true`** is already set (verified) — correct; keep it (lets per-worktree config exist).

### 11.2 Sub-concern: Commit discipline

- **Convention**: conventional commits with a **wave scope** — `type(wNNN-slug): subject` — is **already the de-facto standard** in this repo (verified history). L0.4 *formalizes* it as policy, costs nothing.
- **Enforcement**: a single **`commit-msg` git-hook** (managed by lefthook) running a regex guard, e.g. require the subject to match `^(feat|fix|docs|refactor|chore|test|perf|build|ci|session)(\([a-z0-9-]+\))?: .+`. This is a *guard for agent-authored commits*, not full commitlint — the operator's own commits already comply. The existing `session checkpoint: …` auto-commits should be allowed (add `session` to the type list, as shown).
- **Changelog**: **git-cliff** (§4) generates `CHANGELOG.md` from the wave history on demand. Not a hook — an explicit `git cliff -o CHANGELOG.md` at release/milestone points.
- **`prepare-commit-msg`**: the runtime already has one active hook here — audit what it does before adding more; do **not** stack a second AI-commit hook (§8).

### 11.3 Sub-concern: Branch strategy

- **Wave branches** (`wNNN-slug`): the operator's pattern (`w194-glob-narrow`, `w184-rescue`, …). Keep — it ties branches to the wave-numbered decision trail (provenance value).
- **Agent branches** (`worktree-agent-*`): ephemeral, machine-generated. **Policy: these are GC-eligible the moment their owning thread dies** (§12). They should never accumulate.
- **Merge-to-main policy**: today **main is stale** — HEAD `w194-glob-narrow` is **77 commits ahead of main** and carries the entire W259 catalog (verified). L0.4 policy: **a long-lived working branch that has become the de-facto trunk should be merged/fast-forwarded to `main` at wave-completion milestones.** Letting `main` rot 77 commits behind defeats main's role as the stable reference and is itself a #55435-class hazard (a merge against `main` does not see 77 commits of work).
- **`clean_gone` discipline**: the `commit-commands` plugin ships a `clean_gone` command (deletes local branches whose upstream is gone). This is the **right tool** for branch hygiene once a remote exists. Until then, branch cleanup is the manual `git branch -D worktree-agent-*` sweep in §12.

### 11.4 Sub-concern: Git-as-state

- **Recognition**: the W259 catalog (6,640 files), install manifests, and CLAUDE.md discipline **are** the durable state, and git is their store (§0 #2, §7). L0.4 *owns* this — it is not LAYER-A's job (that is volatile runtime memory).
- **Implication**: `.git` health is a first-class concern → run **git-sizer** periodically (§9). 129 MB today is fine; 67 refs is the watch-item.
- **`.gitignore` posture** (verified contents): `tmp/`, `.claude/state/`, `.claude/worktrees/`, `.codex/`, credentials — all correctly excluded. The catalog itself IS tracked. This is correct (§12 confirms).

### 11.5 Sub-concern: Cross-tool config

- **`core.longpaths=true`**: verified set **in local config only**. Windows MAX_PATH (260 chars) + nested `.claude/worktrees/agent-<hash>/docs/architecture/W259-grand-catalog/...` paths *will* exceed it. **L0.4 policy: this MUST be a committed, permanent setting.** It is currently a per-machine local config that a fresh clone would lose. Action in §12.
- **`.gitattributes`**: **does not exist** (verified). On a Windows runtime this is a real gap — line-ending behavior is undefined across the 6,640-file catalog. L0.4 mandates creating one: at minimum `* text=auto eol=lf` for text + explicit `-text` for binaries. (Note for §13: jj does *not* honor `.gitattributes` — another reason to keep git as substrate for now.)
- **`AGENTS.md`**: **exists** (15 KB, verified). This is the cross-agent instruction file. L0.4 policy: `AGENTS.md` should carry the **git-hygiene rules** for agents — explicitly the "verify `pwd` and `git branch --show-current` before any merge" discipline that issue #55435's reporter runs as a `## Worktree discipline` section. This is the documented mitigation for the silent-no-op-merge hazard.
- **`core.hookspath`**: currently the default `.git/hooks` (verified). If lefthook is adopted it manages this; ensure exactly one hooks owner.

### 11.6 Sub-concern: Signed commits / provenance

- LAYER-E surfaced **sigstore/cosign**. For git, the concrete primitive is **commit signing**. Options: classic GPG, SSH-key signing (`gpg.format=ssh` — simplest on Windows, no GPG keyring), or **gitsign** (sigstore's keyless git-commit signing — keyless OIDC, the cosign-family tool).
- **L0.4 recommendation**: enable **SSH-key commit signing** (`git config gpg.format ssh` + `user.signingkey` + `commit.gpgsign true`) as the **low-friction baseline** — it gives every commit (including agent-authored ones) a verifiable author signature with zero keyring ceremony on Windows. Treat **gitsign/sigstore** as the *aspirational* upgrade once the runtime has a CI/identity story (ties to LAYER-E). Provenance value: an audit trail where every wave-numbered decision commit is cryptographically attributable.
- Current state: `user.email=42@local`, `user.name=42`, **no signing** (verified). This is fine for a solo local runtime *today*, but signing is the natural L0.4 provenance upgrade and should be on the roadmap.

### 11.7 — Recommended L0.4 stack (the install/keep/defer table)

| Concern | Tool | Disposition | Why |
|---------|------|-------------|-----|
| Worktree isolation | git-worktree (native) + CC `EnterWorktree` | **KEEP** (installed) | §1 — native, zero lock-in; gap is *policy* not tooling |
| Worktree GC | `git worktree prune` + pid-liveness sweep script | **CREATE** (thin script) | §11.1 / §12 — fixes the 49-worktree leak (#55435) |
| VCS substrate | git | **KEEP** | §2/§13 — universal, Windows-native, every tool binds to it |
| VCS ergonomics overlay | git-branchless | **INSTALL** (single binary) | §2 — `git undo`/smartlog; jj-like ergonomics, zero migration risk |
| Hooks manager | lefthook | **INSTALL** (single Go binary) | §6 — perfect D-score; Windows-native, dependency-free |
| Commit-msg guard | lefthook `commit-msg` regex | **CREATE** (config) | §11.2 — keeps agent commits conventional |
| Changelog | git-cliff | **INSTALL** (single Rust binary) | §4 — wave-history → CHANGELOG.md |
| AI commit authoring | CC `commit-commands` plugin | **KEEP** (installed) | §8 — reject all standalone AI-commit tools (CR-12 dup) |
| Branch hygiene | `commit-commands:clean_gone` + manual sweep | **KEEP** + policy | §11.3 / §12 |
| Secret-scan git-gate | gitleaks (re-wired as git-hook) | **RE-WIRE** (installed) | §9 — catch secrets *before* commit, not after |
| Repo health | git-sizer | **INSTALL** (single Go binary) | §9 — quantify the 67-ref / 129 MB watch-item |
| History surgery | git-filter-repo | **DOCUMENT** (emergency-only) | §9 |
| Code-graph | gitnexus MCP | **KEEP** (installed) | §9 — L0.9, reads the git DAG |
| Operator TUI | lazygit | **INSTALL** (optional, operator-only) | §3 — human triage of worktrees/branches; never agent-facing |
| Forge CLI | gh | **DEFER** (no remote yet) | §10 — install when a remote is added |
| Commit signing | SSH-key signing → gitsign later | **ROADMAP** | §11.6 — provenance upgrade |
| Windows correctness | `core.longpaths` committed + `.gitattributes` | **FIX** (config/file) | §11.5 / §12 |
| Next-gen VCS | jj (jujutsu) | **PILOT** (sandbox repo only) | §13 — do not migrate the main runtime in 2026 |

**Net new installs**: 4 single-binary tools (git-branchless, lefthook, git-cliff, git-sizer) + 1 optional operator tool (lazygit). All are single self-contained binaries, Windows-native, `scoop`/`winget`-installable, and reversible — fully consistent with the Z:-portable, single-binary-preferring, cardinal-rule-1 posture. **Zero new runtime dependencies, zero new services, zero new MCP servers.**

---

## §12 — Operator git-hygiene audit

**Audited state** (all verified via `git` this session):

| Metric | Value |
|--------|-------|
| Worktrees total | 56 (49 `agent-*` locked + 6 named + main) |
| Branches total | 67 (59 `worktree-agent-*` + 8 named) |
| Agent branches merged to main | **0 of sampled** (none) |
| Current HEAD | `w194-glob-narrow` @ `f05d6ee` |
| HEAD vs main | **77 commits ahead, 0 behind** |
| `.git` size | 129 MB |
| Active git hooks | 1 (`prepare-commit-msg`) |
| `core.longpaths` | `true` — **local config only** |
| `.gitattributes` | **absent** |
| `AGENTS.md` | present (15 KB) |
| Agent worktree age range | 2026-05-13 08:41 → 2026-05-15 21:40 |
| Prunable worktrees (git's own check) | 0 (dirs still exist — git can't auto-detect) |

### 12.1 — The 49 locked `worktree-agent-*` worktrees: GC policy

**Finding**: every sampled `.git/worktrees/agent-*/locked` file records a pid (`pid 100088`, `pid 65892`, `pid 84516`, …). Git reports **0 prunable** because the directories still exist on disk — git's `prune` only catches *deleted-directory* orphans, not *dead-process* orphans. The worktrees span **2026-05-13 to 2026-05-15**; the oldest is 3 days old. CC agent threads do not live for days — **these owning processes are almost certainly all dead.** This is precisely Anthropic `claude-code` issue #55435 (*"48 directories, 46 stale branches, 11 GB on disk — none of those agent threads are still alive"*).

**GC policy — when it is safe to `git worktree remove`:**

A `worktree-agent-*` worktree is **safe to remove** when **both**:
1. **The owning pid is dead** — check the pid in `.git/worktrees/agent-*/locked` against the live process list. Dead pid ⇒ the agent thread is gone.
2. **Its branch carries no unmerged-and-wanted commits** — if `git log <branch> --not main` is empty, or the agent errored without committing, the branch is disposable. If it has commits AND they represent wanted work, *rescue the branch first* (cherry-pick/merge), then remove.

**Recommended sweep (operator runs this — single-dev, so judgement-in-the-loop):**

```bash
# 1. Inventory: which agent worktrees have a DEAD owning pid?
for d in .claude/worktrees/agent-*; do
  w=$(basename "$d")
  pid=$(grep -o 'pid [0-9]*' ".git/worktrees/$w/locked" 2>/dev/null | awk '{print $2}')
  if [ -n "$pid" ] && ! kill -0 "$pid" 2>/dev/null; then echo "DEAD-PID $w (pid $pid)"; fi
done

# 2. For each DEAD-PID worktree: check its branch for unmerged commits BEFORE removing
git log worktree-agent-<hash> --not main --oneline   # empty => disposable

# 3. Remove (unlock first — CC auto-locked them):
git worktree unlock .claude/worktrees/agent-<hash>
git worktree remove --force .claude/worktrees/agent-<hash>
git branch -D worktree-agent-<hash>     # only if step 2 was empty / work rescued

# 4. After the batch — clean metadata + verify:
git worktree prune
git worktree list        # should drop to: main + the 6 named + any genuinely-live agent
```

> **Faster bulk path** (per Zylos Research — `git worktree remove` is O(files), slow on 49 full checkouts): `rm -rf .claude/worktrees/agent-<hash>` then `git worktree prune` is faster than `git worktree remove` for confirmed-dead worktrees. Use the careful `git worktree remove` path when unsure; use `rm -rf` + `prune` for the confirmed-dead bulk.

**Estimated reclaim**: issue #55435's near-identical case reclaimed **~10.9 GB** from 46 worktrees. This runtime's 49 worktrees likely hold a similar **~10 GB**. (`.git` itself is only 129 MB — the bulk is the 49 working-tree checkouts on disk, not the object store.)

**Caveat**: a small number of the 49 *may* belong to genuinely-live sub-agents of the current session. The pid-liveness check in step 1 is the authority — only DEAD-PID worktrees are GC'd. Do not blanket-remove.

### 12.2 — The 6 named worktrees: which are stale?

| Worktree | Branch | Last commit | Verdict |
|----------|--------|-------------|---------|
| `w184-rescue` | `w184-rescue` | 2026-05-13 22:21 | **STALE** — 3 days old, W185-era rescue work. GC after confirming commits are merged or no longer needed. |
| `w188-audit` | `w188-audit` | 2026-05-13 22:58 (`session checkpoint`) | **STALE** — last commit is just a checkpoint; W188 is long past. GC. |
| `w189-memory` | `w189-memory` | 2026-05-13 23:28 (`session checkpoint`) | **STALE** — same; checkpoint-only tip, W189 past. GC. |
| `w197` | `w197` | 2026-05-14 16:33 | **STALE** — W197 P0 work, 2 days old. Check if the `settings.json` change merged; then GC. |
| `serene-johnson-d364cb` | `claude/serene-johnson-d364cb` | 2026-05-13 22:21 | **STALE** — same tip commit as `w184-rescue`; a duplicate/CC-auto-generated named worktree. GC. |
| `w259-final-synthesis` | `worktree-w259-final-synthesis` | **2026-05-16 16:00** | **ACTIVE — DO NOT GC.** Today's date; this holds the live W259 v4 synthesis work. **NOT merged to main (verified)** — this is the wave-in-progress. |

**Action**: 5 of 6 named worktrees (`w184-rescue`, `w188-audit`, `w189-memory`, `w197`, `serene-johnson-d364cb`) are **stale** (all ≥2 days old, wave numbers long superseded). For each: `git log <branch> --not main` to check for unmerged work, rescue anything wanted, then `git worktree remove` + `git branch -d`. **Keep `w259-final-synthesis`** — it is the active wave.

### 12.3 — Branch hygiene

**Finding**: 59 `worktree-agent-*` branches clutter `git branch` — and **none are merged to main** (verified sample). This is the branch-side of the same #55435 leak.

- **Agent branches**: every `worktree-agent-*` branch whose worktree is GC'd in §12.1 should be `git branch -D`'d in the same sweep (the commands above do this). After the sweep, `git branch` should show ~8 branches, not 67.
- **`clean_gone`**: the `commit-commands` plugin's `clean_gone` deletes branches whose *upstream is gone* — but this runtime has **no remote**, so no branch has an upstream, so `clean_gone` is a no-op here *today*. It becomes the right tool the moment a remote is added. For now branch cleanup = the manual `git branch -D` sweep.
- **Watch-item**: 67 refs is not catastrophic but is the kind of ref-sprawl `git-sizer` (§9) flags. Post-sweep, re-run `git-sizer` to confirm the repo is healthy.

### 12.4 — `core.longpaths`

**Finding**: `core.longpaths=true` is set, **but in local config only** (verified `git config --local --list`). Local config is **per-machine and not committed** — a fresh clone of this repo on another machine, or a re-clone, loses it. On Windows + this repo's deeply-nested `.claude/worktrees/agent-<hash>/docs/architecture/W259-grand-catalog/...` paths, that *will* cause "Filename too long" failures.

**Recommendation**: `core.longpaths` cannot live in committed `.git/config`, but it **can and should be made durable**:
- Set it **globally** for the operator's Windows environment: `git config --global core.longpaths true` — so every clone/worktree on this machine inherits it.
- **Document it as a mandatory bootstrap step** in `AGENTS.md` / the runtime's setup docs, so any re-clone re-applies it.
- This is correct as a permanent setting — keep it; just elevate it from per-repo-local to per-machine-global + documented.

### 12.5 — `.gitignore` posture

**Finding** (verified contents): `tmp/`, `.claude/state/`, `.claude/debug/`, `.claude/projects/`, `.claude/sessions/`, `.claude/worktrees/`, `.claude/agent-memory/`, `.codex/`, `CLAUDE.local.md`, credentials, plugin caches — all gitignored. The W259 catalog itself **is tracked** (6,640 files committed).

**Verdict: the `.gitignore` posture is CORRECT post-W259.**
- `tmp/` + `.claude/state/` gitignored — **correct**: these are transient/runtime state, not durable. (§11.4: durable state = the catalog, which *is* tracked.)
- `.claude/worktrees/` gitignored — **correct and load-bearing**: per the Google Cloud Medium piece, *"there's a non-negotiable rule: you must add [the worktree dir] to your `.gitignore`… if you skip this step, you risk accidentally committing the entire worktree."* This runtime got it right.
- Credentials/`.codex/`/`CLAUDE.local.md` excluded — **correct** (cardinal-rule-1 secret hygiene; CLAUDE.local.md is explicitly gitignored per CCBP).
- **One gap, not in `.gitignore` but adjacent**: there is **no `.gitattributes`** (§11.5). Add one (`* text=auto eol=lf`) — this is the missing companion to a correct `.gitignore`.

### 12.6 — Operator git-hygiene action list (priority order)

1. **[HIGH] Sweep the 49 agent worktrees** — run the §12.1 pid-liveness sweep; reclaim ~10 GB; drop 56→~7 worktrees. (#55435 leak.)
2. **[HIGH] Sweep the 5 stale named worktrees** — `w184-rescue`, `w188-audit`, `w189-memory`, `w197`, `serene-johnson-d364cb` (rescue unmerged work first). Keep `w259-final-synthesis`.
3. **[HIGH] Delete the 59 `worktree-agent-*` branches** — in the same sweep; drop 67→~8 branches.
4. **[HIGH] Decide on main**: HEAD `w194-glob-narrow` is 77 commits ahead of main and holds the W259 catalog. Either fast-forward `main` to it at the next wave milestone, or formally re-designate the trunk. Do not leave `main` 77 commits stale (#55435-class hazard).
5. **[MED] `git config --global core.longpaths true`** + document as a bootstrap step — make the Windows long-path fix durable across clones.
6. **[MED] Create `.gitattributes`** — `* text=auto eol=lf` + explicit `-text` for binaries.
7. **[MED] Add a `## Git / worktree discipline` section to `AGENTS.md`** — mandate "verify `pwd` + `git branch --show-current` before any merge" (the documented #55435 mitigation).
8. **[LOW] Install the §11.7 stack** — git-branchless, lefthook, git-cliff, git-sizer (4 single binaries); lazygit optional. Re-wire gitleaks as a `pre-commit` git-hook.
9. **[LOW] Run `git-sizer`** post-sweep to confirm `.git` health.
10. **[ROADMAP] Enable SSH-key commit signing** — `gpg.format ssh` + `commit.gpgsign true` for provenance.

---

## §13 — jj (jujutsu) verdict — is it time to adopt jj over git for agentic runtimes?

**The 2026 question, answered.**

### The case FOR jj (it is strong, and real)

The evidence that jj is *architecturally better for agents* is genuine, not hype:
- **Lock-free concurrency**: no `.git/index.lock`. For a multi-agent runtime, git's index lock is a real contention point. Third-party benchmark (ruvnet/agentic-flow, 10 agents / 200 commits): concurrent commits 15→350 ops/s (**23×**), lock-waiting 50 min/day → 0.
- **Operation log (`oplog`)**: every action — commit, edit, rebase, undo — is permanently recorded. `jj undo` is reflog-without-the-footguns. This is **best-in-class provenance** and directly serves the audit-trail concern (§0 #3, §11.6).
- **Conflicts-as-data**: conflicts are recorded *in commits*, operations *succeed*, you resolve later. Auto-rebase propagates resolutions to descendants (`rerere` + `rebase --update-refs`, by design). An agent can resolve conflicts programmatically — multiple 2026 sources (slavakurilyak.com, the otterstack blog, the opencode issue thread with 8 months of real CC+jj usage) report this is the single biggest agent-ergonomics win.
- **No staging area, no detached HEAD**: the working copy auto-commits. The two most common git "agent footguns" (forgotten `git add`, detached HEAD) **structurally cannot happen** in jj.
- **Co-located mode** (`jj git init --colocate`): jj runs *on top of* a normal `.git`. You can `jj` and `git` in the same repo, push/pull to any git remote, and **switch back to plain git at any time**. Adoption risk is genuinely low.
- **`jj workspace`**: native multiple-working-copies — jj's answer to git worktrees, and arguably cleaner for agent isolation.

### The case AGAINST jj — for *this specific runtime, in 2026*

This is where the verdict turns. Four hard blockers, all verified (deepwiki: jj-vcs/jj):

1. **jj is self-described "experimental", pre-1.0.** The jj README, verbatim: *"Jujutsu is an experimental version control system… there may still be work-in-progress features, suboptimal UX, and workflow gaps."* The runtime's own cardinal rules (cardinal-rule-1: install primitives only from *trusted* sources) and CLAUDE.local.md's repeated launch-discipline / reversibility emphasis make adopting a pre-1.0 VCS *as the substrate* a poor fit. The substrate is the one layer you cannot afford to be experimental.

2. **jj does NOT support `git worktree`.** It has `jj workspace` instead. But this runtime's **entire agent-isolation mechanism is the CC native `Agent(isolation:"worktree")` primitive**, which emits *git worktrees*. CC does not speak `jj workspace`. Adopting jj would mean **either** giving up CC-native worktree isolation **or** running an awkward git-worktree-inside-jj-colocated-repo hybrid that the deepwiki source explicitly warns is bug-prone (*"there may still be bugs when interleaving mutating `jj` and `git` commands"*). This is a **direct architectural conflict** with LAYER-B.

3. **Windows rough edges.** jj *works* on Windows but (deepwiki, verified): symlinks need Developer Mode; **jj does not honor `.gitattributes`** (so the §11.5 `.gitattributes` fix would be silently ineffective under jj); colocated workspaces are "less resilient to concurrency issues" on network filesystems. For a Windows Z:-portable runtime, these are real friction.

4. **The whole §1–§10 tool ecosystem binds to git.** lefthook, git-cliff, gitleaks, git-sizer, gitnexus, the `commit-commands` plugin, `gh` — and the `pre-commit` already in the catalog — all assume git. jj's higher-level metadata (bookmarks/branches) lives *outside* `.git`, so git-native tooling sees an incomplete picture. Adopting jj fractures the L0.4 stack.

### Verdict

> **It is NOT time to migrate this runtime's substrate to jj — but it IS time to pilot jj and adopt git-branchless as the bridge.**

Concretely:
- **Substrate stays git.** D-total 37 vs jj's 34 (§2). For *this* runtime — Windows, CC-native-worktree-dependent, git-tool-ecosystem-heavy, single-dev-who-values-reversibility — git wins decisively *today*. The agentic-flow benchmark that crowns jj is for a 10-agent *server* system with no Windows/CC-worktree constraint; it does not transfer.
- **Adopt `git-branchless` now** (§2, §5). It delivers the *highest-value* jj ergonomics — `git undo` (op-log-like safety net), smartlog, easy commit restructuring — **inside git, as a single binary, with zero migration risk and zero ecosystem fracture.** This captures ~70% of jj's agent-ergonomics upside at ~0% of its risk. **This is the pragmatic answer to "should we get jj's benefits."**
- **Pilot jj in a throwaway sandbox repo.** `jj git init --colocate` on a *non-critical* scratch repo, drive it with an agent for a few sessions, measure. jj's trajectory is genuinely toward becoming the agentic-VCS default — but "pilot and watch" is the correct 2026 posture, not "migrate the production substrate."
- **Re-evaluate at jj 1.0** *and* when CC's `Agent(isolation:…)` primitive gains native `jj workspace` support. **Both** conditions matter — jj going 1.0 alone is not enough while the CC worktree primitive still speaks only git. When both land, jj becomes a serious substrate candidate and this verdict should be revisited.

This mirrors the runtime's own discipline: the CLAUDE.local.md ENV-h note on the 1M-context decision shows the operator already practices "adopt the SOTA primitive, but don't disable a working substrate to chase a workaround." jj is a future SOTA substrate; git-branchless is the SOTA-adjacent upgrade you can take *today* without disabling what works.

---

## §14 — Convergence + final L0.4 install/adopt recommendation

### Convergence check (Axis-1: do ≥3 organizationally-distinct sources agree?)

- **Git worktrees are THE agent-isolation primitive** — converged across Anthropic (issue #55435 + native `--worktree`), Google Cloud (Karl Weinmeister, Medium 2026-04), Zylos Research, Background Claude, stos.dev. **5 distinct orgs. PASS.**
- **The stale-worktree leak is a real, named problem** — Anthropic issue #55435 (with 2 linked duplicate issues #57765/#57767), plus independent confirmation from Zylos ("remove worktrees immediately after merge… alert if count exceeds 10") and Background Claude ("the `trap` is the important line"). **3+ orgs. PASS.** The fix (pid-liveness sweep + `prune`) is convergent.
- **jj is the leading next-gen VCS and is agent-relevant** — converged (ruvnet benchmark, slavakurilyak.com, otterstack blog, jj-vcs upstream, the opencode issue thread). **PASS.** But the *"migrate now"* conclusion is **NOT** convergent — it holds only for non-Windows, non-CC-worktree server contexts. For Windows + CC-native-worktree runtimes the sources tilt to "co-located/pilot." Verdict §13 reflects the *correct* convergence.
- **Single-binary, Windows-native hook managers (lefthook) and Rust git tools (git-cliff, git-branchless, git-sizer) are SOTA** — converged across each tool's upstream + the broader Rust-CLI-tooling consensus. **PASS.**

### Final recommendation — adopt **L0.4 — VERSION CONTROL SUBSTRATE** into the W259 catalog

**Layer is APPROVED for the catalog.** The operator's directive is correct: git is a load-bearing layer, not plumbing. L0.4 slots between bootstrap and L0.5 (quality/security gates fire as git-hooks) and below L0.9 (gitnexus reads the git DAG).

**Install / keep / defer — final:**

| Disposition | Items |
|-------------|-------|
| **KEEP** (already installed, formally adopt into L0.4) | git (substrate) · CC `EnterWorktree`/`Agent(isolation:"worktree")` · `commit-commands` plugin · gitnexus MCP · gitleaks (*re-wire as git-hook*) · conventional-commits convention |
| **INSTALL** (4 single binaries — Windows-native, `scoop`/`winget`, reversible, zero new runtime deps/services) | **git-branchless** (jj-ergonomics overlay) · **lefthook** (hooks manager) · **git-cliff** (changelog) · **git-sizer** (repo health) |
| **INSTALL — optional, operator-only** | lazygit (TUI for human triage; never agent-facing) |
| **CREATE** (config/files, no install) | worktree-GC sweep script (§12.1) · lefthook `commit-msg` regex guard · `.gitattributes` (`* text=auto eol=lf`) · `## Git/worktree discipline` section in `AGENTS.md` |
| **FIX** (config) | `git config --global core.longpaths true` + document as bootstrap step |
| **DEFER** | `gh` (install when a forge remote is added) |
| **PILOT** (sandbox only, do not migrate) | jj (jujutsu) — `jj git init --colocate` on a scratch repo; re-evaluate at jj 1.0 **and** CC-native-`jj-workspace` support |
| **REJECT** | all standalone AI-commit tools (aicommits/opencommit/gptcommit/Copilot-git — CR-12 duplicate of `commit-commands`) · interactive commit wizards (commitizen/czg — anti-agentic) · third-party worktree managers (native + a 20-line script suffices) · husky/git-hooks.nix (worse Windows/dependency profile than lefthook) · pijul (no git interop) · graphite/spr/ghstack (PR-review-shaped, no fit for a no-PR solo runtime) |

**Immediate operator action (highest value, do first)**: run the §12.1 + §12.2 worktree sweep — reclaim ~10 GB, drop 56 worktrees → ~7 and 67 branches → ~8, and eliminate the silent-no-op-merge data-loss hazard (#55435). That single sweep is the most important git-hygiene action in the entire runtime and requires **no installs at all** — just native `git worktree`/`git branch` commands.

**One-line summary**: keep git as the substrate, add 4 single-binary SOTA tools, fix `core.longpaths` + `.gitattributes`, sweep 49 stale worktrees now, adopt git-branchless as the jj-bridge, pilot-but-don't-migrate jj, and formally enter **L0.4 — VERSION CONTROL SUBSTRATE** into the W259 catalog.

---

*End LAYER-H — git/VCS substrate (W259 v5). Companion layers: LAYER-A through LAYER-G in `02-layer-deepdive/`. Synthesis: `07-final-synthesis/W259-ULTIMATE-SYNTHESIS-FINAL.md`.*
