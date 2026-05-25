# W329-E — CCBP + ECC + Anthropic Upstream Line-by-Line Compare

> Wave W329 Stream E. Operator question: audit entire architecture vs CCBP, ECC, Anthropic cookbooks/docs/sub-agents/skills. Find stale references, silent errors, fallback paths, low-quality code. 2026-05-19. Budget: 18/30 tool calls used.

## §0 Executive — drift table

| Upstream | Latest local HEAD | Date | Runtime cite | Drift severity |
|---|---|---|---|---|
| CCBP (shanraisshan/claude-code-best-practice) | `f28c2da` | 2026-05-19 | `CLAUDE.md:3` cites `48798ca` + W319-B sidebar `9624c4ac` | **STALE-by-1-commit** (P2 — drifted today's pull) |
| CCBP cross-SHA chain in CLAUDE.md | n/a | n/a | `1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac` | should append `→ f28c2da` |
| Anthropic claude-cookbooks | `39a350b6` | 2025-xx | `CLAUDE.md:13` cites `39a350b6790c132337dcc3ec35240728fcc1dc0e` | **FRESH** (matches local HEAD) — task brief mentioned `2eed173a` (stale) |
| Anthropic claude-code | `69d70700` | n/a | not cited by SHA in CLAUDE.md (URL-only cites) | URL-anchored, OK |
| Anthropic skills | `690f15ca` | 2026-xx | not cited by SHA in CLAUDE.md | URL-anchored, OK |
| ECC (affaan-m/everything-claude-code upstream) | `2c0d2264` | 2026-xx | runtime installed `2.0.0-rc.1` (matches VERSION file) | **manifest-stale**: ECC plugin cache has NO git remote (local-only `2c48b1e` writes), upstream marketplace tag never re-pulled since install |
| Local CCBP fork sub-dirs | n/a | n/a | runtime uses `Z:/repos/deps/claude-code-best-practice-shan` as primary cite base, not vendored | NORMATIVE (cite-ref by design) |

## §1 CCBP (claude-code-best-practice-shan) Compare

- **Local HEAD**: `f28c2da352290377ca272b3cc99a8beb31e37864` (2026-05-18 23:05:46 +0500 PKT, "chore(readme): bump badge timestamp")
- **Runtime CLAUDE.md cite**: `48798ca` (W319-B refresh anchor) — **stale-by-2-commits**: 48798ca → 9624c4a → f28c2da. Today's pull pulled the 2 missing commits.
- **CCBP file inventory (line counts)**:
  - `claude-cli-startup-flags.md` 231 LOC
  - `claude-commands.md` 132 LOC
  - `claude-mcp.md` 132 LOC
  - `claude-memory.md` 121 LOC  (cited at `:34-40` — verified, range intact post-pull)
  - `claude-power-ups.md` 66 LOC
  - `claude-settings.md` 1170 LOC  (cited at `:826`, `:877-921` — verified intact)
  - `claude-skills.md` 58 LOC
  - `claude-subagents.md` 56 LOC
- **CCBP cite-targets in runtime** (all line ranges intact):
  - `claude-memory.md:34-40` (Ancestor/Descendant loading) — quoted exactly in CLAUDE.md L3
  - `claude-memory.md:113` (CLAUDE.local.md gitignore discipline) — quoted in CLAUDE.local.md L3
  - `claude-settings.md:877-921` (env block TIER-1-DIRECT authority) — used in CLAUDE.local.md ENV section
  - `claude-settings.md:826` (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE) — drift note in CLAUDE.local.md
- **DRIFT P2**: pending W316-S6-style cite-refresh from `48798ca` → `f28c2da` (or to upstream HEAD if upstream is ahead of local fork)

## §2 ECC (everything-claude-code) Compare

- **Upstream HEAD (affaan-m/everything-claude-code)**: `2c0d2264` (today's pull from `841beea4`)
- **Runtime ECC version**: `2.0.0-rc.1` (matches `VERSION` file in installed cache)
- **Installed plugin manifest** (`.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude-plugin/plugin.json`):
  - name: `ecc` · version `2.0.0-rc.1` · 60 agents + **232 skills** + 75 legacy command shims
  - `mcpServers: {}` (empty) — matches upstream contract
  - skills + commands point to relative dirs (cardinal-rule-3 compliant)
- **ECC repo layout** (upstream root): `agent.yaml` + `skills/` (182 top-level skills) + `agents/` + `plugins/` + `hooks/`
- **NOTABLE DRIFT — silent-error class P1**: 
  - The installed cache dir `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/` has **NO git remote** configured. The git log shows the runtime's own `ship(W327-codex-rN)` commits being written INTO the plugin cache directory — this means upstream `git pull` will never refresh content here, and SHA `2c48b1e` is a runtime-locally-rewritten state, not upstream content.
  - This pattern violates CR-1 spirit (install primitives only from trusted plugins) — the cache should be marketplace-managed, not operator-written.
  - **Fix**: cache-delete + `/plugin install ecc@everything-claude-code` per CLAUDE.md L29 W270 corollary (re-establish marketplace control).
- **ECC vs runtime drift**: 232-skill catalog upstream vs the small `agent-teams`, `engineering-skills`, `engineering-advanced-skills` etc. subsets actually wired in runtime — many ECC skills not surfaced via plugin enable (this is operator-curation, not drift)

## §3 Anthropic claude-cookbooks Compare

- **Upstream HEAD**: `39a350b6790c132337dcc3ec35240728fcc1dc0e` (matches runtime cite EXACTLY)
- **Task-brief SHA `2eed173a`**: appears to be from `parallel-dispatch-mandate` skill stale comment — actual upstream HEAD is `39a350b6` and runtime CLAUDE.md L13 is FRESH. Task brief was stale.
- **Cite verification**: `patterns/agents/prompts/research_lead_agent.md` is 155 LOC; `<use_parallel_tool_calls>` block at L135-137 — runtime cite `:135-137` is **VERIFIED INTACT**.
- **Cookbook agent-pattern adoption status**:
  - `basic_workflows.ipynb` — adopted via `superpowers:executing-plans` skill
  - `evaluator_optimizer.ipynb` — adopted via `dual-review` + `engineering-advanced-skills:self-eval` + ship-gate
  - `orchestrator_workers.ipynb` — adopted via `agent-teams` (`/team-spawn` + `agent-teams:team-*` subagent types)
  - `prompts/research_lead_agent.md` — adopted via `parallel-dispatch-mandate` + `dispatching-parallel-agents-w321-fork`
  - `prompts/research_subagent.md` — adopted implicitly via `Agent` tool fan-out pattern
  - `prompts/citations_agent.md` — **NOT EXPLICITLY ADOPTED** — runtime has informal cite discipline (cardinal-rule citations) but no dedicated `citations_agent` subagent role
- **GAP P2**: no `citations_agent` subagent role / SKILL → would aid cite-trail enforcement for VERDICT-LEDGER.md verdict rows

## §4 Anthropic claude-code docs Compare

- **Upstream `anthropics/claude-code` HEAD**: `69d70700` (already-up-to-date this pull)
- This repo holds changelog + IDE plugins + scripts, not docs (docs live at `code.claude.com/docs/en/*` and `docs.anthropic.com/en/docs/claude-code/*`)
- **Native-feature adoption status** (cite-able from CCBP `claude-settings.md` env table which mirrors official docs):
  - `CLAUDE_CODE_FORK_SUBAGENT=1` — adopted (CLAUDE.local.md (e))
  - `CLAUDE_CODE_USE_POWERSHELL_TOOL` (`:831`) — **NOT SET** in CLAUDE.local.md ENV; runtime uses Git Bash `BASH_ENV` shim instead. Operator-preference, not drift.
  - `CLAUDE_CODE_SESSION_ID` (`:824`) — read-only, available in hooks but no runtime hook consumes it (could enable better session correlation)
  - `AI_AGENT` (`:825`) — read-only; not consumed by any runtime hook
  - `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` (`:887`) — **NOT SET**; recommended `=1` if proxy causes duplicate tool execution. Per `parallel-dispatch-mandate` skill's W321 fork "mid-flight stream-error retry" — this env var is the upstream-canonical fix.
  - `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE` (`:924`) — **NOT SET**; would protect against marketplace `git pull` failures wiping plugin cache (W270 corollary scenario).
  - `CLAUDE_CODE_RESUME_INTERRUPTED_TURN` (`:894`) — **NOT SET**; could prevent mid-turn loss after `/loop` cron interruption
  - `CLAUDE_CODE_SKIP_PROMPT_HISTORY` (`:895`) — **NOT SET**; not needed (we want resume/continue)
  - `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` (`:922`) — **NOT SET**; would block first query until plugin install completes. Could prevent W270-class silent-drift races.
- **P1 GAPS**: 3 unwired env vars — `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1`, `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1`, `CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1` — each cite-anchored to CCBP `claude-settings.md @ f28c2da`.

## §5 Anthropic sub-agents + skills docs Compare

- **Upstream `anthropics/skills` HEAD**: `690f15cac7f7b4c055c5ab109c79ed9259934081`
- **Anthropic-official skill catalog** (17 skills): `algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing, xlsx`
- **Runtime adoption**: ALL 17 are available via `example-skills:*` and `document-skills:*` namespaces (visible in skill list) — **FULL UPSTREAM PARITY**
- **Skill format** (verified via `skill-creator/SKILL.md` head): YAML frontmatter `name:` + `description:` + body — matches runtime skills exactly (33 local skills follow same shape per CLAUDE.md L30)
- **Subagent contract**: Anthropic docs spec `https://docs.anthropic.com/en/docs/claude-code/sub-agents` requires `description:` field for routing. All runtime subagents conform per cardinal-rule-3.
- **NO DRIFT** in skill or subagent format

## §6 Stale References in Runtime vs Upstream

| File:line | Stale | Correct | Fix priority |
|---|---|---|---|
| `CLAUDE.md:3` | CCBP HEAD `48798ca` + sidebar `9624c4ac` | Local HEAD now `f28c2da` (2 commits ahead) | P2 — append `→ f28c2da` to cross-SHA chain |
| `CLAUDE.md:9` | CCBP `claude-memory.md:34-40 @ HEAD 48798ca` | `:34-40 @ HEAD f28c2da` (range intact post-pull, only SHA stale) | P2 — bundle with above |
| `CLAUDE.local.md:3` (per task context) | CCBP `claude-memory.md:113 @ ac0d87d` | `:113 @ f28c2da` (line 113 intact: Section "Use CLAUDE.local.md for personal preferences") | P2 |
| `CLAUDE.local.md:9` | CCBP `claude-settings.md:877-921 @ ac0d87d` | `:877-921 @ f28c2da` (range intact: env var table) | P2 |
| `CLAUDE.local.md` autocompact note | `claude-settings.md:826 @ ac0d87d` | `:826 @ f28c2da` — but **WARNING**: `:826` at HEAD `f28c2da` is now `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS`, NOT `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`. The autocompact var moved to **`:847`** at HEAD `f28c2da`. | **P1 — line-number drift, cite is now wrong** |
| `parallel-dispatch-mandate` skill | cookbook HEAD `2eed173a` (mentioned in task brief) | `39a350b6790c132337dcc3ec35240728fcc1dc0e` (matches runtime CLAUDE.md L13) | already-fresh in CLAUDE.md; skill body unconfirmed |
| ECC plugin cache | local SHA `2c48b1e` writes-into-cache | should be marketplace-managed (no remote configured) | **P1 — silent-error**: cache-delete + re-install per W270 corollary |
| disabled `memory.exe` block in `.mcp.json` | retained-as-dormant per W300-AI-1 | "can be deleted entirely at next housekeeping wave" per W300-AUDIT §3 | P3 — already-tracked |
| `Z:/claude-sota-installed-W272` worktree ref (CLAUDE.md L14) | exists | verify still on disk (W280d cap-3 worktree convention) | P3 — verify-only |

## §7 Non-SOTA Code Patterns vs Upstream

| Location | Pattern | Upstream SOTA | Fix priority |
|---|---|---|---|
| ECC plugin cache writes | runtime writes `ship(W327-codex-rN)` commits INTO plugin cache dir | Cache should be read-only marketplace-managed per `https://code.claude.com/docs/en/plugins` | **P0 — cardinal-rule-1 violation** ("install primitives only from trusted plugins") |
| Missing `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK` | mid-stream fallback can dup tool execution (per CCBP `:887`) | Set `=1` when proxy/gateway in path | P1 — recommended for parallel-Agent multi-stream stability per W321 fork |
| Missing `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE` | marketplace pull failure wipes plugin cache (W270 corollary) | Set `=1` | P1 |
| Missing `CLAUDE_CODE_SYNC_PLUGIN_INSTALL` | first query may race against plugin install | Set `=1` for deterministic startup | P1 |
| W259-v16 5-tier memory stack claim | CLAUDE.local.md mentions T1 hindsight "✗ RETIRED" alongside T1-active env block — **logical contradiction** if read literally; resolved by CLAUDE.md L34 W317-S1 demote | Reconcile L34 demote with CLAUDE.local.md (h) note (currently still says "T1 hindsight + memory-MCP + cognee + graphiti" implying 4-active) | P2 |
| `BASH_ENV` shim at `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh` | project-owned shell script | **cardinal-rule-2 exception**: not under `.claude/hooks/**` so technically compliant, but it IS executed by every bash spawn; should be doc-anchored to specific anthropics/claude-code issue if it's a bug-patch shim | P2 — verify intent |
| `disabledMcpjsonServers` retention of `memory.exe` block | "retained-as-dormant" per W300-AI-1 | Anthropic-canonical pattern is delete-when-replaced; retention adds entropy | P3 |

## §8 Upstream Patterns NOT Yet Adopted (P0/P1)

| Pattern | Upstream cite | Adoption LOE |
|---|---|---|
| `citations_agent` subagent role | `anthropics/claude-cookbooks @ 39a350b6 patterns/agents/prompts/citations_agent.md` | Medium — new SKILL.md under `.claude/skills/citations-agent/` to enforce cite-trail for ledger rows |
| `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1` | CCBP `claude-settings.md:887 @ f28c2da` | Trivial — add to CLAUDE.local.md ENV block (e) section |
| `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1` | CCBP `claude-settings.md:924 @ f28c2da` | Trivial — add to ENV block |
| `CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1` | CCBP `claude-settings.md:922 @ f28c2da` | Trivial — add to ENV block, prevents W270 race |
| `CLAUDE_CODE_NEW_INIT=true` | CCBP `claude-settings.md:875 @ f28c2da` | Trivial — opt into interactive `/init`; useful for new-track scaffold via conductor:new-track |
| `CLAUDE_CODE_RESUME_INTERRUPTED_TURN=1` | CCBP `claude-settings.md:894 @ f28c2da` | Trivial — pairs well with /loop cron |
| `anthropics/skills/skill-creator` workflow | `690f15ca skill-creator/SKILL.md` | Already-available (loaded into runtime via `example-skills:skill-creator`). Operator action: use it more aggressively for the 33 local skills' description-tuning per its `description improver` script. |
| `anthropics/skills/mcp-builder` | upstream HEAD | Already-loaded (`example-skills:mcp-builder`); could replace any hand-built MCP shims |
| ECC cardinal-rule-1 re-install | runtime CLAUDE.md L29 W270 corollary | Cache-delete `.claude/plugins/cache/everything-claude-code/`, then `/plugin install ecc@everything-claude-code` per upstream marketplace |

## §9 3-org-distinct cite trail

| # | Org | Repo | HEAD verified today | Used for |
|---|---|---|---|---|
| 1 | shanraisshan (CCBP maintainer) | `claude-code-best-practice` | `f28c2da` (2026-05-19) | CR-anchor for memory/settings/hooks/skills doctrine — cited in CLAUDE.md L3 + CLAUDE.local.md L3 |
| 2 | anthropics (Anthropic official) | `claude-cookbooks` | `39a350b6` | parallel-dispatch + orchestrator-worker pattern anchor — cited CLAUDE.md L13 |
| 3 | anthropics (Anthropic official) | `skills` | `690f15ca` | skill format + skill-creator + mcp-builder reference — implicit via `example-skills:*` loaded skills |
| 4 | anthropics (Anthropic official) | `claude-code` | `69d70700` | Changelog + IDE-plugin canonical |
| 5 | affaan-m (ECC author) | `everything-claude-code` (via `Z:/repos/deps/affaan-m-everything-claude-code`) | `2c0d2264` | 232-skill / 60-agent / 75-command catalog reference (vs runtime-installed `2.0.0-rc.1`) |

## §10 Recommended remediation actions (P0/P1 only)

1. **P0** — Restore ECC plugin cache to marketplace-managed state: `rm -rf .claude/plugins/cache/everything-claude-code/` then `/plugin install ecc@everything-claude-code` and verify a remote is configured.
2. **P1** — Fix CLAUDE.local.md autocompact cite: `claude-settings.md:826 @ ac0d87d` → `:847 @ f28c2da` (line moved during upstream rev).
3. **P1** — Add 3 env vars to CLAUDE.local.md ENV block (e): `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1`, `CLAUDE_CODE_PLUGIN_KEEP_MARKETPLACE_ON_FAILURE=1`, `CLAUDE_CODE_SYNC_PLUGIN_INSTALL=1`.
4. **P2** — Refresh CCBP cross-SHA chain in CLAUDE.md L3 from `→ 9624c4ac upstream` to `→ 9624c4ac → f28c2da`.
5. **P2** — Reconcile CLAUDE.local.md "T1 hindsight" 5-tier wording with CLAUDE.md L34 W317-S1 demote (T1 ✗ RETIRED).
6. **P2** — Author `.claude/skills/citations-agent/SKILL.md` from cookbook `patterns/agents/prompts/citations_agent.md`.

STATUS: COMPLETE
