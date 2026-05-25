# W350 ARCH-CRITIC --- Adversarial Review

> Date: 2026-05-20. Reviewer: principal-engineer skeptic. Word budget: <1200.

## Section 1 --- Wave-number naming (BLOCKER)

The W-number tells me when, never what. The folder W350-SOTA-GIT-TREE-AUDIT is a 6-character timestamp wrapped around the only useful slug SOTA-GIT-TREE-AUDIT. Across docs/architecture/W340..W350 I count 21 wave folders in 10 days --- that is not topic granularity, that is journal-of-an-anxious-team. Sibling Z:/claude-sota-pure/CLAUDE.md ships with zero wave folders and zero inline Status, and the runtime still works.

Cite (all 2026-05-20): Conventional Commits 1.0.0 at https://www.conventionalcommits.org/en/v1.0.0/ --- types are feat | fix | chore | docs | refactor | perf | test | build | ci; no wave type. Atlassian Git branching strategies at https://www.atlassian.com/git/tutorials/comparing-workflows --- names describe purpose (feature/, bugfix/, hotfix/). Conventional Branch at https://conventional-branch.github.io --- pattern type/short-description. GitHub Flow at https://docs.github.com/en/get-started/using-github/github-flow --- the deployment branch is main; everything else is a topic branch named for the work. Trunk-Based Development at https://trunkbaseddevelopment.com/styles/ --- short-lived topic branches.

**Recommendation (hybrid):** branch + folder rename to type/scope-short-desc (e.g. feat/sota-git-tree-foundation, fix/parallel-guard-race, chore/dep-rollup-actions). Keep Wave: W350 as a commit-trailer for historical-continuity ledger --- already enforced via .pre-commit-config.yaml codex-trailer-gate. Folder migration: rename W350-SOTA-GIT-TREE-AUDIT/ to sota-git-tree-foundation/, leave a one-line W350.md symlink for cite-stability of in-flight links. Going forward: no new W<N>-* folders; the wave number lives on the commit, not the filesystem.

## Section 2 --- Worktree topology (HIGH)

CLAUDE.md L20 declares ~3 parallel cap; git worktree list shows 4 live (installed + W348 + W348-carry + W350). The cap is empirically violated *while a CLAUDE.md edit at L14 just bumped the count 3 to 4 to ratify the violation*. Anthropic CLI reference at https://code.claude.com/docs/en/cli-reference documents --fork-session + /branch but does not prescribe a numeric cap --- the cap is a self-imposed cognitive-budget heuristic. Drift this big means the heuristic is unenforced.

**Recommendation:** raise the documented cap to 5 (a 64-GB workstation can comfortably run 5 CC sessions; token-budget is the real constraint, not RAM) AND wire a PreToolUse:Bash matcher for git worktree add that hard-blocks (exit 2) when git worktree list line-count is at-or-above the cap. Cap-in-code beats cap-in-prose.

## Section 3 --- Hook chain (HIGH)

13 hook entries across 12 events. Anthropic docs at https://docs.anthropic.com/en/docs/claude-code/hooks describe hooks as opt-in safety/observability, not a control plane. Audit:

- **Keep:** SessionStart cache-heal (patches upstream bug anthropics/claude-code issue 46915); gitleaks PreToolUse:Bash (security); WorktreeRemove prune; Notification beep; PreCompact audit-log.
- **Suspect:** 3 PreToolUse:Agent hooks (parallel-guard + subagent-validator + d73-gate) fire on every Agent dispatch and add 30 ms times 3 + node-spawn times 3. The empirical 0.0036 parallel_ratio over 1676 sessions (W329-D) justifies one binding-mode guard, not three serial gates with overlapping concerns.
- **Theater:** TaskCompleted runs ruff check tools harness --quiet after every task --- ruff already runs in PostToolUse on edit and in pre-commit. Three rungs of the same ladder. PostToolUseFailure PowerShell parses error strings into additionalContext --- does the on-call engineer at 3 am actually read that, or does it just inflate the next prompt?

**Recommendation:** merge the 3 PreToolUse:Agent hooks into one preagent-orchestrator.mjs that runs all three checks in-process (single node spawn). Delete TaskCompleted ruff (redundant). Delete PostToolUseFailure parser unless someone can name a session where it changed behavior.

## Section 4 --- MCP fleet (HIGH)

16 MCPs in .mcp.json (deepwiki, github, chrome-devtools, repomix, serena, ccusage, cognee, langfuse, basic-memory, hf-mcp-server, perplexity, playwright, tavily, exa, firecrawl, brave-search). 8 of them are search/research paths: deepwiki + perplexity + tavily + exa + firecrawl + brave-search + hf-mcp-server + WebSearch. Tool-search is deferred (ENABLE_TOOL_SEARCH=auto:5), but every MCP still pays a connect-handshake cost and a tools/list enumeration on session start.

**Retire 3:** brave-search (worst-quality results of the six; commodity-replaceable by tavily). firecrawl (overlaps tavily crawl mode + perplexity URL-fetch). hf-mcp-server (anonymous rate-limited per its own banner; rarely consulted; HF-paper IDs flow through perplexity fine). That gets the search axis down to 5, which is still excessive but defensible (tavily=structured / exa=semantic / perplexity=reasoning / deepwiki=repo / WebSearch=fallback).

## Section 5 --- Project-owned governance (MEDIUM, justified with caveat)

Twelve .mjs files under tools/. Cardinal-rule-2 says no project-owned hook bodies under .claude/hooks/**; living under tools/ is the documented escape hatch. Empirical justification (parallel_ratio=0.0036 SEV-1, W329-D) makes the parallel-guard real, not theater. **Caveat:** preagent-d73-gate.mjs has no cited empirical motivation in CLAUDE.md --- it appears alongside the other two but lacks the binding-mode evidence trail. Either document the SEV-N that justifies it or retire it.

**Verdict:** KEEP parallel-guard + subagent-validator + the precommit grep/form/collision guards. **Retire or document** preagent-d73-gate.mjs.

## Section 6 --- Skill count drift (NIT)

CLAUDE.md L77 says x 53; actual is 59. The phrase W340 Stream A re-count corrects W333 x 46 repeats four times in this CLAUDE.md. The runtime auto-fires by description match, not by count, so the drift is documentary debt, not behavioral debt. **Fix:** one-line update; do not retire skills to make the number match.

## Section 7 --- Wave-folder + verdict-ledger pattern (MEDIUM)

Every wave produces VERDICT-LEDGER.md + ROUND-N-SYNTHESIS.md + GOAL-W<N+1>-PREDICATE.md. If this were PM theater the sibling claude-sota-pure would be unusable; it is not. The ledger is real audit-trail (codex-rounds, FM-17 tracking). But it is filesystem-shaped storage of graph-shaped data: cite-anchors point across waves, but the directory tree pretends each wave is a leaf. T6 basic-memory is canonical-primary (per W295) --- that is the right substrate.

**Recommendation:** new waves write verdict rows directly to T6 basic-memory + a single topic-folder note (e.g. sota-git-tree-foundation/), not a per-wave folder. Past waves stay frozen --- sunk-cost-recovery worse than inconsistency, as Fork-B Q8 already concluded.

## Section 8 --- W350 branch base (MEDIUM)

Operator created goal/W350-sota-git-tree-foundation from b34ecd2 = origin/main. Current dev tip is 3a32265 on w348-sota-fix (3 commits ahead). The W348/W349 fixes (parallel-guard test-fix, CI cascade close, plugin runtime drift) are not on main. Two paths:

(a) **Rebase W350 onto w348-sota-fix** --- inherits the fixes, but couples the new wave to an in-flight branch that has not yet landed on main.
(b) **Stay on origin/main** --- clean start, but the new branch CI will rediscover the same SHA-pin/allowlist gaps that W349 just fixed.

Better: first merge w348-sota-fix to origin/main via PR (with required-status-checks + signed commits per Fork-B Q5), then rebase W350. This unblocks every other in-flight branch too. Pre-cleared via Conventional-Commits squash-merge.

## Section 9 --- Top-3 architecture-debt items (impact-ordered)

1. **Wave-number-as-everything** (Sections 1 + 7). Time-shaped names hide topic, scope, intent. 21 folders in 10 days is a smell. Rename one new folder, freeze the rest, watch what breaks.
2. **Branch graveyard** (Fork-B Q3 already prescribes it): 24+ long-lived branches, half of them stale goal/W331..W347 + sota-converge-w* + archive/*. Tag-and-delete 18 of them today; the script is already written in FORK-B-SOTA-GIT-PRACTICE-RESEARCH.md lines 28-32.
3. **Hook over-meshing** (Section 3): 3 PreToolUse:Agent hooks + TaskCompleted ruff + PostToolUseFailure parser is 5 things doing 2 jobs. Collapse to 1 + 0 + 0.

**If I could only change one thing, it would be Section 1 --- rename the next folder topic-first.** Time-order lives in git log already. Everything else (branch cleanup, hook collapse, MCP retirement) follows from accepting that the wave-number is a commit-trailer, not a primary key.
