# W286-B — SOTA Repo Max-Depth Deep-Dive (2026-05-18)

> **Stream**: W286 deep-clean / SOTA-convergence audit
> **Method**: 3-source convergence — deepwiki `ask_question` (8 priority repos) + GitHub `list_commits` (14 repos, SHA-drift verification) + Exa search (community consensus, alternative discovery)
> **Constraint**: research-only ship — install decisions ride codex-review gate
> **Cite-anchor**: per CCBP `claude-memory.md:34-40 @ ac0d87d` — all install primitives must be trusted-source + active-scope (CLAUDE.md cardinal-rule-1)
> **Pre-state**: 50 plugins installed across 21 marketplaces (cf. `.claude/plugins/installed_plugins.json` + `known_marketplaces.json`)

---

## Section A — Per-Repo Deep-Dive (12 priority repos)

### A.1 — `obra/superpowers` v5.1.0 (installed v5.1.0 @ `f2cbfbe`, HEAD `f2cbfbe`)
**Status**: FRESH (zero drift, matches HEAD). **Verdict: KEEP — at canonical version.**
- **Missing patterns we don't yet exploit**:
  - **SDD coordinator/worker split** — `superpowers:subagent-driven-development` makes SDD mandatory on capable harnesses; we have the plugin but don't appear to enforce SDD coordinator pattern in CLAUDE.md cardinal rules (W282-W285 docs reference parallel-execution but not SDD coordinator gating).
  - **`SUBAGENT-STOP` gate** — added v5.1.0 to make dispatched subagents skip 1% rule (avoids skill-rationalization recursion).
  - **`worktree.baseRef: "head"` setting** — allows worktrees branching from in-progress work; not configured.
- **What we may be doing wrong**: nothing material — we already use `using-superpowers`, `verification-before-completion`, `systematic-debugging`, `brainstorming`, `writing-plans`, `executing-plans`, `requesting-code-review`, `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees`.
- **Freshness**: v5.0.6 → v5.1.0 in last 2 weeks; lots of cross-platform (Copilot/Cursor/Codex/Gemini) hardening + Windows hook-routing fix (PR #1188). No breaking changes for us.

### A.2 — `wshobson/agents` (claude-code-workflows) v1.0.2 agent-teams (installed @ `08ded5e7`, HEAD `08ded5e7`)
**Status**: FRESH (matches HEAD as of 2026-05-17). **Verdict: KEEP — at canonical version.**
- **Missing patterns**:
  - **`/team-spawn` preset usage** — CLAUDE.md mandates dispatching teams but we have no evidence in W282-W285 docs of using `team-spawn research|security|review|debug|feature|migration` presets in practice; this stream itself proves the agent-teams path was rare.
  - **File-ownership protocol** — strict "one owner per file" rule + interface contracts at boundaries is unexploited; we used it implicitly here (per-stream EXCLUSIVE files) but not encoded as harness pattern.
  - **`plan_approval_request` workflow** — when teammate is `plan_mode_required`, they call `ExitPlanMode` → team-lead approves/rejects; we don't model this.
  - New: **`recsys-pipeline-architect` skill** (machine-learning-ops/skills/) from PR #533 (2026-05-17) — irrelevant to coding harness but signals active dev.
- **What we may be doing wrong**: too-coarse delegation. We dispatched 4 streams in W286 without enforcing the lead/teammate mailbox protocol.
- **Freshness**: agent-teams coordination guardrails fix shipped 2026-05-17 (PR #535). Up-to-date.

### A.3 — `affaan-m/everything-claude-code` v2.0.0-rc.1 (installed @ `841beea4`, HEAD `efda2265`)
**Status**: **DRIFT** — 1-2 days behind (HEAD `efda2265` = `docs: refresh rc1 evidence snapshot` 2026-05-18). Cosmetic drift; no functional changes since `812d4d0` deleted `strategic-compact/suggest-compact.sh`.
- **Missing patterns**:
  - **`continuous-learning-v2` skill** — instinct-based learning with confidence scoring; our memory layer (hindsight T1) doesn't yet leverage this self-evolving pattern.
  - **`eval-harness` skill** — formal EDD (Evaluation-Driven Development) framework; complements our `harness/eval_harness.py` but offers richer evaluation structure.
  - **`strategic-compact` skill** — manual compaction at logical intervals; we use `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=80` automation but don't compose with strategic checkpoints.
  - **`iterative-retrieval` skill** — progressive context refinement for subagents; directly relevant to our T1 memory recall pattern.
  - **`hookify-rules` + `hookify-help` + `hookify-list`** — Hookify is a `claude-plugins-official` plugin we installed, but its companion skills inside ECC could orchestrate richer setups.
- **What we may be doing wrong**: ECC ships 180+ skills; auto-fire description matching may flood Skill discovery. CLAUDE.md doesn't gate ECC-skill scopes.
- **Freshness**: rc1 evidence snapshot 2026-05-18; refresh recommended (cache-delete + `/plugin install`).

### A.4 — `anthropics/skills` v6a5bb069 (installed @ `6a5bb069`, HEAD `6a5bb069`)
**Status**: FRESH. **Verdict: KEEP.**
- **Missing patterns**:
  - **`mcp-builder` skill** — full process for building MCP servers (TypeScript-recommended, actionable error messages, comprehensive API coverage); we have not authored our own MCP servers using this skill's structure (recent W283-stream4-deepwiki-ingest hints we may need this).
  - **`webapp-testing` skill** — installed but skill body lacks documented patterns per deepwiki; may be aspirational/stub.
  - **`brand-guidelines` + `theme-factory`** — irrelevant unless we generate user-facing artifacts.
  - **`claude-api` skill** — direct relevance: managed-agents, prompt caching, model migration (Opus 4.5→4.6→4.7 patterns); use when writing Anthropic SDK code.
- **What we may be doing wrong**: nothing critical.
- **Freshness**: Managed Agents docs updates landed 2026-05-17 (#1145 model config shape fix). Refresh advised.

### A.5 — `addyosmani/agent-skills` v22 skills (installed @ `f17c6e8`, HEAD `f17c6e8`)
**Status**: FRESH (matches HEAD 2026-05-16). **Verdict: KEEP.**
- **Missing patterns**:
  - **`source-driven-development` (SDD)** — mandates official-doc grounding for every framework decision; we use `context7` MCP partially but don't enforce SDD cite-discipline universally.
  - **`doubt-driven-development`** — adversarial CLAIM→EXTRACT→DOUBT→RECONCILE→STOP cycle; complements (not replaces) `superpowers:verification-before-completion`.
  - **`sdd-cache` hook** — cross-session citation cache with origin-server revalidation; potentially superior to context7 in-memory cache for harness-wide reuse.
  - **Parallel fan-out + merge pattern** in `/ship` — analogous to our agent-teams but cleaner contract.
- **What we may be doing wrong**: we're not enforcing "evidence before assertions" via SDD across all code touches (only when superpowers:verification-before-completion fires).
- **Freshness**: 2026-05-16 PR #60 added CI skill validator; freshest of all installed skills packs.

### A.6 — `vectorize-io/hindsight` v0.6.5 hindsight-memory (installed @ `9784f657`, HEAD `9784f657`)
**Status**: FRESH (HEAD `9784f657` is `release(openclaw): v0.7.7` — main repo advanced but our pinned `hindsight-memory` plugin is current at `9784f657`). **Verdict: KEEP.**
- **Missing patterns**:
  - **`agent_knowledge_ingest` MCP tool** — explicit document ingestion (PDFs, notes) into memory; currently we only auto-retain from session transcripts.
  - **`create-agent` skill** — subagents with isolated memory banks via SDA project layouts; powerful pattern for multi-track work but unused.
  - **Explicit bank-to-directory mapping** + git-worktree support (added 0.6.3) — for worktree-isolated agent memories.
  - **Cross-encoder reranking + 4-strategy retrieval** (semantic + BM25 + KG + temporal) — per benchmarks, this is the source of Hindsight's 91.4% LongMemEval lead vs Mem0 49% / Zep 63.8%.
- **What we may be doing wrong**: we run hindsight as T1 backend but may not be exploiting MCP knowledge tools for explicit document ingestion (PDFs, design docs).
- **Freshness**: 0.6.4 fixed Claude Code recall parameter naming + page retrieval reliability + agent knowledge page list tool. Backend pivot: **PostgreSQL + pgvector** (not sqlite-vec or chromadb).

### A.7 — `mksglu/context-mode` v1.0.136 (installed @ `00aa039e`, HEAD `f8d46390`)
**Status**: **DRIFT** — HEAD is 2 commits ahead (CI bot + main merge 2026-05-17). Minor; binaries already at v1.0.136. **Verdict: cache-delete + reinstall recommended.**
- **Missing patterns**:
  - **`ctx-stats` / `ctx-doctor` skills** — we have the tools but don't periodically run them; if context-mode is mid-budget-overrun we'd miss it.
  - **`intent` parameter on ctx_execute** — triggers 5KB-threshold FTS5 indexing on stdout > 5KB; underused.
  - **`INTENT_SEARCH_THRESHOLD` env var tuning** — could be tighter to push more output through indexing.
  - **`ROUTING_BLOCK` SessionStart injection** — auto-injects context-mode tool guidance; verify our session captures it.
- **What we may be doing wrong**: context-mode's `ctx_batch_execute` timed out in this very session (300s ceiling). Either we're feeding it too many concurrent commands without `concurrency` parameter, or the tool's internal RPC timeout needs raising.
- **Freshness**: v1.0.136 shipped 2026-05-17; SHA at HEAD has CI commit on top. Refresh.

### A.8 — `openai/codex-plugin-cc` v1.0.4 (installed @ `807e03ac`, HEAD `807e03ac`)
**Status**: FRESH (matches HEAD as of 2026-04-18 — no commits in 30 days). **Verdict: KEEP — stable.**
- **Missing patterns**:
  - **`stop-review-gate-hook.mjs`** — gates Stop event on Codex review verdict; verify `/codex:setup --enable-review-gate` is on in our state.json.
  - **`/codex:adversarial-review`** — questions implementation/design, not just code-cleanliness; we use `/codex:review` (read-only) but may miss adversarial dimension.
  - **CLAUDE.md cites "T1-T5 commands"** — deepwiki confirms these don't exist; rename to actual commands (`/codex:review`, `/codex:adversarial-review`, `/codex:rescue`, `/codex:setup`, `/codex:status`, `/codex:result`, `/codex:cancel`).
- **What we may be doing wrong**: CLAUDE.md's T1-T5 reference is **stale / never-existed**.
- **Freshness**: zero commits in 30 days; possibly low maintenance but stable.

### A.9 — `forrestchang/andrej-karpathy-skills` v1.0.0 (installed @ `2c606141`, HEAD `2c606141` — but the org renamed to `multica-ai/andrej-karpathy-skills`)
**Status**: FRESH for content; **OWNER MOVED** (multica-ai/andrej-karpathy-skills is HEAD). Marketplace entry says `forrestchang/...`; latest commits on `multica-ai/...`. **Verdict: rename marketplace source.**
- **Missing patterns**: 4 principles (Think Before Coding · Simplicity First · Surgical Changes · Goal-Driven Execution) all auto-fire via `description:` match — these are already canonical in CLAUDE.md. Cursor support was added in HEAD.
- **What we may be doing wrong**: marketplace source still points at old org.
- **Freshness**: last meaningful commit 2026-04-20 (Chinese README sync); content stable, no breaking changes.

### A.10 — `anthropics/claude-plugins-official` (installed @ `2c1bb7e50957` for most W260+ plugins; HEAD `f475d3ce`)
**Status**: **DRIFT** — HEAD is multiple commits ahead (added zoominfo plugin 2026-05-18, crowdstrike-falcon-foundry bump). New official plugins continue dropping. **Verdict: refresh.**
- **Missing patterns**: `carta-cap-table`, `crowdstrike-falcon-foundry`, `zoominfo` — irrelevant to coding harness.
- **What we may be doing wrong**: nothing critical; we pinned 2c1bb7e50957 already which is W260-fresh.
- **Freshness**: marketplace itself moves daily; specific plugins we use are stable. Refresh `known_marketplaces.json` to pull new partner plugins selectively.

### A.11 — `alirezarezvani/claude-skills` (engineering-skills v2.2.3 + engineering-advanced-skills v2.4.4) (installed @ `0d477a065`, HEAD `0d477a065`)
**Status**: FRESH. **Verdict: KEEP.**
- **Missing patterns**:
  - **POWERFUL-tier skills we have but don't auto-fire well**: `agent-designer`, `rag-architect`, `database-designer`, `mcp-server-builder`, `dependency-auditor`, `secrets-vault-manager`, `ship-gate`, `tc-tracker`.
  - **Per-skill `scripts/` directory** with Python CLI tools — these are first-class executables we may not be invoking (stdlib-only, JSON-emit).
  - **Matt Pocock skills** (`caveman`, `grill-me`, `handoff`, `grill-with-docs`, `write-a-skill`) — Pocock's terse-mode patterns; especially `caveman` for token reduction.
- **What we may be doing wrong**: our CLAUDE.md doesn't explicitly route to `skill-security-auditor` for any plugin-install ship.
- **Freshness**: v2.7.0 series; PR #677 merged 2026-05-17.

### A.12 — `sickn33/antigravity-awesome-skills` v11.2.0 (installed @ `d68b997a`, HEAD `7c55ad5908`)
**Status**: **DRIFT** — HEAD is at v11.3.0 (recsys-pipeline source credit added 2026-05-16; star-history CI commit 2026-05-17). **Verdict: minor refresh.**
- **Missing patterns**: bundle is curated 5-skill set (concise-planning · lint-and-validate · git-pushing · kaizen · systematic-debugging) — production-ready, "Codex plugin-safe · Claude plugin-safe". All 5 already enabled in our runtime.
- **What we may be doing wrong**: nothing — bundle is small and intentional.
- **Freshness**: v11.2.0→v11.3.0 cosmetic; refresh on next batch.

### A.13 — `thedotmack/claude-mem` v13.2.0 (installed @ `37d24944`, HEAD `37d24944`)
**Status**: FRESH (matches HEAD 2026-05-13). **Verdict: review necessity (overlap with hindsight).**
- **Architecture**: 5-lifecycle hooks (SessionStart→UserPromptSubmit→PostToolUse→Summary→SessionEnd) + dual-DB (SQLite + ChromaDB) + Worker Service on per-user port (37700+uid%100) via Bun.
- **Overlap risk**: hindsight-memory is our designated T1; claude-mem auto-fires the same lifecycle hooks and may double-instrument SessionStart/Stop. **Audit for hook conflicts.**
- **What we may be doing wrong**: running both as "memory backends" without explicit role split could cause race conditions in Stop hook.
- **Freshness**: actively maintained (5 days ago); but architectural overlap with hindsight is a real cost.

### A.14 — `pydantic/skills` (`ai` + `logfire`) v0.1.0 (installed @ `92bd097`, HEAD `92bd097`)
**Status**: FRESH. **Verdict: KEEP.**
- **Missing patterns**: `building-pydantic-ai-agents` skill (well-formed) and `logfire-instrumentation` / `logfire-query` (we run logfire-mcp). New `/query` command + skill landed 2026-05-06.
- **Freshness**: matches HEAD.

### A.15 — `mksglu/context-mode`, `vectorize-io/hindsight`, `openai/codex-plugin-cc` — already covered above (A.6-A.8).

---

## Section B — NEW Candidate Matrix (worth W287/W288 evaluation)

> 5★ tiers: ★★★★★ = harness-fit + active + benchmark-proven; ★★ = niche or untested.

| # | Candidate | Layer | License | Stars / Velocity | Harness-fit verdict |
|---|---|---|---|---|---|
| 1 | **rohitg00/agentmemory** | Memory (RAG) | Apache-2.0 | 2K★, weekly releases (v0.8.9 2026-04) | ★★★★ — triple-stream retrieval (BM25+vector+KG), MCP-native, cross-agent. Direct competitor to hindsight. |
| 2 | **mem0ai/claude-code-plugin** (OpenMemory) | Memory | Apache-2.0 | 48K★ org | ★★★ — 7 MCP tools + 4 lifecycle hooks (SessionStart/PreCompact/Stop/PreToolUse). LongMemEval 49% (below hindsight 91.4%). |
| 3 | **letta-ai/letta-code** | Agent runtime (with memory) | Apache-2.0 | 21K★, active | ★★ — full agent runtime alternative (not bolt-on); replaces CC harness conceptually. Skip unless we want to swap entire stack. |
| 4 | **Supermemory** | Memory | Closed/SaaS | n/a | ★★ — LongMemEval 85-89%; SaaS-only, doesn't fit our self-hosted posture. |
| 5 | **mnemos-os/mnemos** | Memory OS | Apache-2.0 | unknown | ★★★ — multi-framework via MCP + OpenAI-compat gateway + REST. Production since Dec 2025. Drop-in for Claude Code + LangChain + CrewAI shared memory. |
| 6 | **Backboard** | Memory | unclear | unknown | ★★ — LoCoMo benchmark 90.0%; less public footprint. |
| 7 | **digital-process-tools/claude-remember** | Memory | unclear | 12.5K installs | ★★★ — official Anthropic marketplace; SessionStart/UserPromptSubmit/PostToolUse hooks; auto-saves via Haiku compression. Competitor to claude-mem. |
| 8 | **mastra observational-memory** | Memory (research) | unclear | research-grade | ★★ — LongMemEval 94.87% (research-only, observer+reflector pattern). |
| 9 | **arize-ai/phoenix** (already via plugin?) | Observability | Elastic-2.0 | 5K★, OTel-native | ★★★★ — RAG quality metrics (precision/recall/NDCG), OpenTelemetry-first. Complements langfuse (we have phoenix plugin commands but not running it). |
| 10 | **helicone/helicone** | Observability proxy | Apache-2.0 | 4K★ | ★★★ — 5-min setup (env var swap), prompt-cache hit-rate dashboard. Layer 3 (HTTP). Pairs with langfuse (Layer 7). |
| 11 | **lunary-ai/lunary** | Observability | Apache-2.0 | active | ★★ — user-level analytics; less depth than langfuse. |
| 12 | **agentlens** | Observability | MIT | new | ★★★ — only OSS observability with native MCP support; solo-dev-friendly. |
| 13 | **conductor.build** | Parallel orchestration | Closed (Mac-only) | Mac-only | ★ — closed source, broad GitHub perms; not portable. |
| 14 | **claude-squad** | Parallel orchestration | MIT | TUI Go | ★★★ — Go binary; tmux + worktree TUI; 11 agent backends. Cross-platform. |
| 15 | **dmux.ai** | Parallel orchestration | MIT | active | ★★★ — tmux + worktree + AI-generated branch names + multi-select launches. We already have `dmux-workflows` skill from ECC. |
| 16 | **amux.io** | Parallel orchestration | unclear | active | ★★★ — web dashboard + REST API + kanban + crash-recovery for unattended overnight runs. |
| 17 | **superset** | Parallel orchestration | unclear | active | ★★ — full terminal replacement; heavy. |
| 18 | **jeremylongshore/claude-code-plugins-plus-skills** | Skills marketplace | unclear | 1,900+ skills | ★★★ — graded skills (100-point rubric), PDA architecture, `${CLAUDE_SKILL_DIR}`. May overlap heavily with our ECC + addy + wshobson installs. |
| 19 | **rohitg00/awesome-claude-code-toolkit** | Skills marketplace | Apache-2.0 | 1689★ | ★★★★ — 135 agents + 35 curated skills + 400K via SkillKit, 42 commands, 176+ plugins. SkillKit is a marketplace within marketplace. |
| 20 | **borghei/Claude-Skills** | Skills marketplace | unclear | 225 skills, 613 Python tools | ★★ — likely full-overlap with alirezarezvani/claude-skills (same fork lineage). |
| 21 | **weemax/Claude-Skills** | Skills marketplace | unclear | 204 skills | ★★ — overlap with borghei/alirezarezvani. |
| 22 | **antigravity-awesome-skills (full library v11.3)** | Skills marketplace | unclear | 37K★ | ★★★ — 1,400+ SKILL.md playbooks; we use only the 5-skill bundle. Full library install would add breadth at the cost of skill-tool noise. |
| 23 | **Mnemora** | Memory (serverless) | Closed | new | ★ — AWS-native, serverless, 4 memory types. Doesn't fit Z:-portable self-hosted posture. |
| 24 | **ipiton/agent-memory-mcp** | Memory MCP | unclear | active | ★★ — typed memory (episodic/semantic/procedural/working) + RAG + repo tools; 3-provider embedding fallback (Jina→OpenAI→Ollama). Aligns with our Ollama setup. |
| 25 | **agentkits-memory / cognitive memory** | Memory | unclear | new | ★ — too early; check in W289. |

---

## Section C — Top 10 ACTIONABLE Adoption Items (ranked by leverage)

1. **REFRESH all DRIFTED plugins via cache-delete + `/plugin install`** (cardinal-rule-1 corollary W270 governance). Targets: `everything-claude-code` (rc1 snapshot), `context-mode` (1.0.136 CI tip), `antigravity-bundle-essentials` (v11.3.0), `claude-plugins-official` (new partner plugins). Evidence: §A.3/A.7/A.12/A.10.
2. **Fix CLAUDE.md "T1-T5 commands" reference** — these don't exist in `codex-plugin-cc`. Replace with actual commands: `/codex:review`, `/codex:adversarial-review`, `/codex:rescue`, `/codex:setup`, `/codex:status`, `/codex:result`, `/codex:cancel`. Evidence: §A.8 (deepwiki).
3. **Update `andrej-karpathy-skills` marketplace source** from `forrestchang/...` → `multica-ai/...` (HEAD repo moved). Evidence: §A.9.
4. **Audit hook conflicts between `claude-mem` and `hindsight-memory`** — both auto-fire SessionStart/Stop/PostToolUse; race risk. Either disable claude-mem (hindsight is canonical T1 per CLAUDE.md) or document role split. Evidence: §A.13.
5. **Adopt `superpowers:subagent-driven-development` SDD coordinator pattern** as cardinal-rule corollary — make fresh-subagent dispatch mandatory for multi-task plans; matches operator's W269 mandate but isn't explicit in CLAUDE.md. Evidence: §A.1.
6. **Enable `/codex:setup --enable-review-gate`** if not already — gates Stop event on Codex review verdict; complements W269 codex T6 hooks. Evidence: §A.8.
7. **Adopt `addyosmani:source-driven-development` (SDD-cite) discipline as cross-cutting cardinal rule** — mandate official-doc grounding via context7 + sdd-cache for ALL framework decisions (not just `superpowers:verification-before-completion`). Evidence: §A.5.
8. **Add `arize-ai/phoenix` observability lane alongside langfuse** — RAG quality metrics (precision/recall/NDCG) not in langfuse; OTel-native, self-host friendly. Pairs cleanly. We already see `mcp__phoenix__*` tools in deferred list; check if running. Evidence: §B.9.
9. **Investigate `rohitg00/awesome-claude-code-toolkit` + SkillKit** — 1689★, 400K skills accessible. May supersede several of our smaller marketplaces. Evidence: §B.19.
10. **Wire context-mode `intent` parameter + raise `INTENT_SEARCH_THRESHOLD`** — our `ctx_batch_execute` timed out at 300s this session; raise concurrency awareness + use `intent:` on every >5KB ctx_execute. Evidence: §A.7.

---

## Section D — SHA-Drift Report (refresh-priority list)

| Plugin | Installed SHA | HEAD SHA | Drift | Priority |
|---|---|---|---|---|
| `everything-claude-code@everything-claude-code` | `841beea4` | `efda2265` | 1-2 commits (docs-only) | **P3** — refresh next cycle |
| `context-mode@context-mode` | `00aa039e` | `f8d46390` | 2 commits (CI bot + main merge) | **P2** — refresh on weekly cron |
| `antigravity-bundle-essentials@antigravity-awesome-skills` | `d68b997a` | `7c55ad59` | minor (v11.3 + star history) | **P3** |
| `claude-plugins-official` (marketplace) | mixed (2c1bb7e... + f8059ee...) | `f475d3ce` | many commits (new partner plugins) | **P2** — selective pull |
| `obra/superpowers@claude-plugins-official` | `f2cbfbef` | `f2cbfbef` | **NONE** | — |
| `wshobson/agents@claude-code-workflows` | `08ded5e7` | `08ded5e7` | **NONE** | — |
| `vectorize-io/hindsight@hindsight` | `9784f657` | `9784f657` | **NONE** (sub-plugin pinned) | — |
| `openai/codex-plugin-cc@openai-codex` | `807e03ac` | `807e03ac` | **NONE** (30-day stable) | — |
| `anthropics/skills@anthropic-agent-skills` | `6a5bb069` | `6a5bb069` | **NONE** | — |
| `addyosmani/agent-skills` | `f17c6e8` | `f17c6e8` | **NONE** | — |
| `alirezarezvani/claude-skills` | `0d477a06` | `0d477a06` | **NONE** | — |
| `forrestchang/andrej-karpathy-skills` (now `multica-ai/...`) | `2c606141` | `2c606141` | **NONE** content; OWNER moved | **P3** — rename marketplace source |
| `thedotmack/claude-mem` | `37d24944` | `37d24944` | **NONE** | — |
| `pydantic/skills@pydantic-skills` | `92bd097` | `92bd097` | **NONE** | — |

**Net**: 4 plugins DRIFT (3 minor docs/CI + 1 owner-rename). All others FRESH. No silent SHA-drift discovered beyond W270-corollary expectations.

---

## Method Notes (for reproducibility)

- **deepwiki**: `mcp__deepwiki__ask_question` invoked 8 times, each parallel-batched.
- **GitHub freshness**: `mcp__github__list_commits` × 14 (priority repos), `perPage=3`. SHA cross-referenced against `installed_plugins.json`.
- **Exa search**: `mcp__plugin_everything-claude-code_exa__web_search_exa` × 5 queries covering memory · observability · parallel-orchestration · skills-marketplaces · new candidates.
- **ctx_batch_execute timed out** at 300s for the initial install-state survey — fell back to direct Read + Bash. Logged as adoption-item #10.
- **Cite-pin**: all behavior decisions in this doc trace back to deepwiki citations or repo `commit/SHA` URLs above. No invented assertions.

---

## Glossary

- **DRIFT** = installed-SHA ≠ HEAD-SHA at audit time.
- **W270 corollary** = CLAUDE.md cardinal-rule-1 governance: standard `/plugin update` no-ops on silent SHA drift; cache-delete + fresh-install is the SOTA fix.
- **LongMemEval** = community-standard memory benchmark; Hindsight 91.4% (Gemini-3) is current SOTA for production memory layers.
- **SDD** = Subagent-Driven Development (superpowers) OR Source-Driven Development (addyosmani) — context determines which.

---

> END W286-B — research-only deliverable. No installs performed. Install decisions ride codex-review gate per W282 / W269 mandate.
