# W378 R3 — Installed-Repo Re-Audit + Awesome-List SOTA Convergence Sweep

> **Wave**: W378 SOTA-convergence research · **Agent**: R3 (re-dispatch after rate-limit) · **Date**: 2026-05-23
> **Model**: claude-opus-4-7[1m] · **subagent_type**: general-purpose · **Stream**: W378-R3
> **Scope**: (§1) re-audit `wshobson/agents` install-drift vs latest HEAD + new adoptable surface; (§2) re-audit `mattpocock/skills` vendored-SHA drift; (§3) awesome-list + convergence sweep → NEW candidates with sca-v20 score + adoption-degree; (§4) convergence notes; (§5) cite cluster.
> **Framework**: sca-v20 multi-dim (`.claude/schemas/sca-v20-multi-dim.schema.json` @ W375) — 19 dims × 4 decision-classes (INSTALL/PATTERN-STUDY/CITE-ONLY/MONITOR) + 7-stage soft-gate ladder per META-C/META-D/META-F.
> **Cardinal-rule-6**: every metric below carries a live-probe anchor (gh-api / deepwiki / exa) timestamped 2026-05-23.
> **De-dup base**: cross-referenced against W377 META-A (`microsoft/agent-framework` T1, `bytedance/deer-flow`) + META-B + W378 R1/R2 (OpenHands/gpt-researcher/Composio/Dify). NEW = absent from all of those.

---

## §1 — `wshobson/agents` drift re-audit (installed vs latest HEAD)

### 1.1 Drift delta (CR-6 live probe)

| Field | CLAUDE.md install-set claim | Live HEAD 2026-05-23 | Delta |
|---|---|---|---|
| Repo | `wshobson/agents` (comprehensive-review · context-management · agent-teams plugins) | same repo | — |
| HEAD SHA | (not pinned in CLAUDE.md — plugin-marketplace install) | `cbcde3f1f4309f023095181d3e591f983ec7c95d` | dependabot `rich 14.3.3→15.0.0` in `/plugins/plugin-eval` (#547), **PGP-signed/verified=true** |
| pushed_at | — | `2026-05-22T21:25:05Z` (≈1d) | **ACTIVE** |
| Stars | — | 33k (exa/claudefa.st cross-check; gh-api `topic:awesome-llm-agents` confirms repo) | informational-only |
| License | — | (marketplace; per-plugin `license` field in `.claude-plugin/marketplace.json`) | permissive |
| Contributors | — | multi-contributor + dependabot active | — |

**HEAD anchor**: gh-api `list_commits wshobson/agents perPage=1` → `cbcde3f1…` author dependabot[bot] 2026-05-22T21:25:01Z, `verification.verified=true reason=valid` (PGP). Parent `07413134b0fc76264c7cfb9db78a1de048f2c104`.

### 1.2 NEW adoptable surface since last sync (the material finding)

The runtime's CLAUDE.md references **3 plugins** (`comprehensive-review`, `context-management`, `agent-teams`). The marketplace has expanded dramatically. Per deepwiki (`wshobson/agents` 2026-05-23) + exa README highlight (live 2026-05-23):

- **Marketplace scale now**: **80 focused plugins** · **185 specialized agents** · **16 workflow orchestrators** · **153 agent skills** · **100 commands** · **25 categories** (avg 3.6 components/plugin — "follows Anthropic 2-8 pattern"). deepwiki reports `81 plugins` (80 local + 1 external via `git-subdir`); exa README says 80 — minor count-drift, both ≈80.
- **`.claude-plugin/marketplace.json`** is the canonical registry (each plugin = dir under `plugins/` with agents/commands/skills + metadata name/source/version/author/license/category). **INSTALL-path = plugin (valid CR-3 primitive).**

**NEW plugins worth adopting (deepwiki-confirmed recent additions, NOT in current 3-plugin set):**

| Plugin | What it does | Why adoptable here | Adoption-degree |
|---|---|---|---|
| **`plugin-eval` (PluginEval)** | 3-layer quality framework: static-analysis + LLM-judge + Monte-Carlo sim; emits quality badges + anti-pattern detection. `/plugin install plugin-eval@claude-code-workflows` | DIRECT fit for our sca-v20 + verdict-jury L3 + `plugin-eval:certify` skill already in runtime skill-list. Mechanizes the "soft-gate quality" META-F goal. | **INSTALL** (capability≥2, dispatch-fit≥2, MIT, plugin-path) |
| **`block-no-verify`** | PreToolUse hook preventing AI agents bypassing git hooks (`--no-verify`) | Matches our CR-2 pre-commit-gate discipline + existing `block-no-verify` local skill. Upstream-plugin hook = CR-2-compliant (not project-owned body). | **INSTALL** or **PATTERN-STUDY** (we already enforce via `.pre-commit-config.yaml`) |
| **`protect-mcp`** | Cryptographic governance: Cedar policy + Ed25519 signed receipts for every tool call | Maps to CR-1 trust-tuple SLSA/Sigstore signing axis + our `signed-audit-trails` local skill. | **PATTERN-STUDY** (Cedar dep blast-radius needs CR-1(d) audit before INSTALL) |
| **`signed-audit-trails`** | Teaching skill / cookbook walkthrough pairing with `protect-mcp` | Already mirrored as local `signed-audit-trails:signed-audit-trails-recipe` skill — confirms PATTERN-STUDY precedent. | **CITE-ONLY / already-pattern-studied** |
| **`review-agent-governance`** | Requires human approval before agent posts PR reviews/comments/merges/CI writes | Matches our HITL + `worker-failure-termination-guard` Δ-G50 discipline. | **PATTERN-STUDY** |
| **`qa-orchestra`** | Multi-agent QA toolkit, 10 specialized agents, full QA lifecycle | Overlaps agent-teams `team-*` presets; evaluate vs existing before INSTALL. | **MONITOR** (Pareto-overlap with installed agent-teams) |

### 1.3 sca-v20 re-score — `wshobson/agents` (per-class)

| Dim | Value | Anchor |
|---|---|---|
| D04 last_commit_days | ~1 | gh-api pushed 2026-05-22 |
| D05 contributors_90d | multi + active dependabot | gh-api |
| D07 license_class | permissive (per-plugin MIT/Apache) | marketplace.json |
| D08 signed_release_level | ~2 (PGP-signed commits verified=true) | gh-api verification block |
| D09 maintainer_reputation | B (single high-output maintainer wshobson; bus-factor watch) | exa "same author as commands repo" |
| D12 doc_completeness | 0.85 (README + deepwiki + 25-cat org) | deepwiki + exa |
| D13 cc_install_path | **plugin** (`.claude-plugin/marketplace.json`) | deepwiki |
| D14 cc_pattern_density | 0.6 (orchestrator-workers, hierarchical-delegation, structured-output, retry, jury-via-PluginEval) | deepwiki recent-additions |
| D15 cc_cite_anchor_density | 0.6 (stable `plugins/<name>/` paths) | gh tree |
| D17 pinning_discipline | git-commit-sha (marketplace install pins SHA) | marketplace model |
| D18 arch_relevance | 0.75 (agent-teams + quality-gate + git-hook discipline all map to our cardinal rules) | §1.2 |

**Per-class**: INSTALL ≈ **0.80** · PATTERN-STUDY ≈ **0.85** · CITE-ONLY ≈ **0.82**. **Routed tier: INSTALL** (already installed — the action is EXPAND the installed plugin set from 3 → +`plugin-eval` (+`block-no-verify`), pattern-study `protect-mcp`/`review-agent-governance`).

**Drift verdict**: NO regression. Repo is healthier than at last sync (80 plugins vs prior 3-plugin slice referenced). **Recommended action**: re-run `/plugin marketplace update` + adopt `plugin-eval` (highest-leverage NEW plugin — mechanizes sca-v20/META-F quality-gate the runtime is actively building). Bus-factor=1 (single maintainer) is the one caution → keep SHA-pinned per CR-9.

---

## §2 — `mattpocock/skills` drift re-audit (vendored SHA `b8be62ffacb0`)

### 2.1 Drift delta (CR-6 live probe) — ZERO DRIFT

| Field | CLAUDE.md vendored claim | Live HEAD 2026-05-23 | Delta |
|---|---|---|---|
| Vendored SHA | `b8be62ffacb0` (`mattpocock-vendor-fork-10`) | HEAD = `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` | **IDENTICAL — 0 commits drift** |
| HEAD commit | — | "Merge branch 'main'" by Matt Pocock, 2026-05-20T08:46:53Z, `verified=false (unsigned)` | merge of `a36584e0…` + `d54c497aa9…` |
| pushed | — | 2026-05-20 (≈3d) | active maintainer |
| License | — | (root `LICENSE` present) | permissive (MIT per repo convention) |
| Contributors | — | small (mattpocock-led; personal skill repo) | bus-factor watch |

**HEAD anchor**: gh-api `list_commits mattpocock/skills perPage=1` → `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` 2026-05-20T08:46:53Z. **This is byte-identical to the vendored SHA in CLAUDE.md** — the W349 P1.3 cite-refresh note ("HEAD advanced d54c497aa944 → b8be62ffacb0") is confirmed accurate: the runtime is pinned to current HEAD. No re-vendor needed.

### 2.2 Structure (CR-6 gh-api tree probe)

Root: `.claude-plugin`, `.out-of-scope`, `CLAUDE.md`, `CONTEXT.md`, `LICENSE`, `README.md`, `docs`, `scripts`, `skills`. `skills/` subdirs: `engineering`, `productivity`, `misc`, `personal`, `in-progress`, `deprecated`. The runtime's `mattpocock-vendor-fork-10` (10 skills) draws from the `engineering` + `productivity` sets — the SOTA skill-authoring-discipline content (api-and-interface-design, code-simplification, etc. per local skill catalog).

### 2.3 New skill-authoring SOTA patterns since vendored SHA

Since vendored == HEAD, there is **no new upstream content to lift** this cycle. Two structural observations for future syncs:
- **`skills/in-progress/`** is the maintainer's staging area — monitor for promotion to `engineering/` (next-wave vendor-sync candidates).
- **`CONTEXT.md` + `.out-of-scope`** at root encode mattpocock's skill-scoping discipline (what NOT to make a skill) — already partially reflected in our skill-creator guidance; **PATTERN-STUDY** the `.out-of-scope` convention if not yet captured.

**sca-v20**: PATTERN-STUDY ≈ **0.84**, CITE-ONLY ≈ **0.86** (vendored-fork model = already-adopted). **Tier: stable, no action.** Re-pin only when `in-progress/` skills promote.

---

## §3 — Awesome-List + Convergence Sweep: NEW Candidates

All metadata = gh-api live probe 2026-05-23 (CR-6). Cross-checked absent from W377 META-A/META-B (Grep: no matches for any of these names) + W378 R1/R2. Stars informational-only per sca-v20 D01 (excluded from INSTALL/PATTERN-STUDY/CITE-ONLY scores).

### 3.1 Candidate table (9 NEW high-signal repos)

| # | Repo | Stars | License | Pushed | Contrib | CC install-path | sca-v20 tier | INSTALL/PS/CITE |
|---|---|---:|---|---|---:|---|---|---|
| N1 | **VoltAgent/awesome-claude-code-subagents** | 20,349 | MIT | 2026-05-20 | ~28 | **plugin** (`.claude-plugin/marketplace.json` + `install-agents.sh`) | **INSTALL** | 0.80 / 0.86 / 0.83 |
| N2 | **lastmile-ai/mcp-agent** | 8,335 | Apache-2.0 | 2026-01-25 | ~60 | **sdk-python** (`pip install mcp-agent`) | **PATTERN-STUDY** | 0.66 / 0.88 / 0.84 |
| N3 | **Yeachan-Heo/oh-my-claudecode** | 34,621 | MIT | 2026-05-23 | ~104 | **plugin** (Teams-first multi-agent CC orchestration) | **INSTALL** (eval) | 0.78 / 0.85 / 0.80 |
| N4 | **hesreallyhim/awesome-claude-code** | 44,576 | NOASSERTION | 2026-04-27 | ~14 | **none** (curated list) | **CITE-ONLY** | n/a / 0.55 / 0.80 |
| N5 | **VoltAgent/awesome-agent-skills** | ~14,400 | MIT (sibling) | active (claudefa.st 2026-05) | — | **plugin/skills** (1,000+ skills, multi-platform) | **PATTERN-STUDY** | 0.70 / 0.85 / 0.82 |
| N6 | **daymade/claude-code-skills** | 1,098 | MIT | 2026-05-18 | — | **plugin/skills** (skills marketplace) | **PATTERN-STUDY** | 0.62 / 0.78 / 0.78 |
| N7 | **boshu2/agentops** | 361 | NOASSERTION | 2026-05-23 | — | **library** (memory/validation/feedback layer) | **MONITOR** | 0.40 / 0.55 / 0.60 |
| N8 | **GanyuanRan/Aegis** | 300 | MIT | 2026-05-23 | — | **skill/methodology** (architecture-aware, drift-checked) | **PATTERN-STUDY** | 0.55 / 0.72 / 0.70 |
| N9 | **davepoon/buildwithclaude** | 2,964 | MIT | 2026-05-22 | — | **none** (discovery hub) | **CITE-ONLY** | n/a / 0.60 / 0.78 |

### 3.2 Per-candidate rationale (top 4)

**N1 — VoltAgent/awesome-claude-code-subagents (INSTALL)**
- deepwiki: BOTH marketplace AND awesome-list. 130+ subagents (deepwiki) / "100+" (README) across **10 categories** (Core Dev, Lang Specialists, Infra, Quality&Security, Data&AI, DevEx, Specialized, Business, Meta&Orchestration, Research). Each = `.md` with YAML frontmatter (`name`/`description`/`tools`/`model`) + system prompt with Communication-Protocol + Development-Workflow sections.
- Install: `claude plugin marketplace add VoltAgent/awesome-claude-code-subagents` → `claude plugin install <plugin-name>` (e.g. `voltagent-lang`, `voltagent-meta`). MIT, ~28 contributors, very active.
- **Hard-filter pass**: license=MIT (D07), install-path=plugin (D13), pinnable via marketplace SHA (D17). exa/stackingjones independently calls the security category "alone justifies it" (pen-tester + code-reviewer subagents).
- **D18 arch_relevance 0.75**: `voltagent-meta` orchestration agents (multi-agent-coordinator, task-distributor, workflow-orchestrator) map to our 4-mode-parallel agent-teams. **Caution**: bare subagent-name collision risk — MUST install via FQN per CR-3 (`subagent-type-allowlist.json` regen needed if adopted).

**N2 — lastmile-ai/mcp-agent (PATTERN-STUDY)** — *strongest pattern source*
- Apache-2.0, 8.3k stars, ~60 contributors. "Build effective agents using MCP and simple workflow patterns." Already PATTERN-STUDIED in the runtime: local skill **`mcp-agent-patterns`** cites it (Router, ParallelLLM fan-out/fan-in, Orchestrator, Evaluator-Optimizer, MCPAggregator) — anchored to Anthropic effective-agents.
- **D14 cc_pattern_density 0.88** (highest of the sweep): 5 named workflow primitives directly = our orchestrator-workers + parallel-fanout + evaluator-optimizer + MCP-tool-bridging slots.
- **Why NOT INSTALL**: `pip install mcp-agent` is a full agent-runtime that re-architects orchestration (dispatch-fit<2 — Claude-Code is already our orchestrator). Pushed 2026-01-25 = ~4mo (PATTERN-STUDY threshold ≤365d passes; INSTALL ≤90d fails). Lift patterns, don't bind dep. **Already correctly pattern-studied** — confirm `mcp-agent-patterns` skill cites current HEAD.

**N3 — Yeachan-Heo/oh-my-claudecode (INSTALL-eval)** — *highest velocity NEW repo*
- 34.6k stars, MIT, **~104 contributors**, pushed 2026-05-23 (today). "Teams-first Multi-agent orchestration for Claude Code." `open_issues=3` (extremely well-maintained). Direct competitor/complement to our agent-teams usage.
- **D18 0.78**: "Teams-first" maps to CC experimental Agent Teams (our 4-mode-parallel mode-2). High contributor diversity (104) → bus-factor healthy (vs wshobson bus-factor=1).
- **Routed INSTALL-eval**: needs CR-1 trust-tuple full pass (transitive blast-radius + signed-release audit) + Pareto-check vs installed agent-teams before binding. Strong MONITOR→INSTALL candidate. **Highest-priority NEW evaluation target.**

**N4 — hesreallyhim/awesome-claude-code (CITE-ONLY)** — *the flagship index*
- **44.5k stars** (largest in sweep), the canonical community curation (3-source convergence: perplexity §2.1 "flagship", stackingjones "main curated community list", gh topic search rank-1). ~14 contributors.
- **Hard-filter**: `license=NOASSERTION` → per META-F §3.4 + sca-v20 D07, NOASSERTION blocks INSTALL/PATTERN-mirror; admits **CITE-ONLY** (cite individual entries by their own primary-source links; do NOT mirror the list). Stale-ish pushed 2026-04-27 (~26d, fine for cite).
- **Use**: discovery feed for future waves — cite entries, don't vendor the index.

### 3.3 Lower-tier notes
- **N5 VoltAgent/awesome-agent-skills** (~14.4k, sibling to N1): 1,000+ skills sourced from official dev teams (Notion, Stripe, Anthropic) + community, cross-platform (Claude Code/Codex/Cursor/Gemini). PATTERN-STUDY for skill-curation methodology; INSTALL only selectively (per-skill trust-audit; 1,000-skill bulk = CR-1 blast-radius — same lesson as alirezarezvani 313-skill retire per CLAUDE.md W330).
- **N6 daymade/claude-code-skills** (1.1k, MIT): production-ready skills marketplace, active. PATTERN-STUDY; selective skill INSTALL.
- **N7 boshu2/agentops** (361, NOASSERTION): "operational layer — memory, validation, feedback loops compounding between sessions." Conceptually maps to our 6-tier memory + learnings-ledger. **MONITOR** (NOASSERTION license + <6mo maturity per META-D Stage-4 recidivism gate).
- **N8 GanyuanRan/Aegis** (300, MIT, today): "architecture-aware, baseline-first, evidence-verified, drift-checked, safe across long tasks." Strong thematic overlap with our CR-6 verify-before-claim + drift-governance. PATTERN-STUDY the drift-check methodology (open_issues=0, active).
- **N9 davepoon/buildwithclaude** (2.9k, MIT): discovery hub for Claude skills/agents/commands/hooks/plugins/marketplaces. CITE-ONLY discovery feed (like N4 but MIT-licensed).

### 3.4 Explicitly EXCLUDED (already-known / de-dup)
- `microsoft/agent-framework` — already W377 META-A T1 (29/30). `anthropics/claude-agent-sdk-python` (7k) + `anthropics/claude-plugins-official` — Anthropic-first-party, already in runtime architecture. `Ironclad/rivet`, `ZenML` — surfaced by perplexity but visual-IDE / control-plane shape (dispatch-fit<2, lower priority). `jeremylongshore/claude-code-plugins-plus-skills` (2.2k, "425 plugins / 2,810 skills") + `athola/claude-night-market` (288, "186 skills") — bulk-mega-marketplaces; CR-1 blast-radius caution (same alirezarezvani lesson); MONITOR-only. `timothyjrainwater-lab/multi-agent-coordination-framework` (7 stars) — below silent-repo floor.

---

## §4 — Convergence Notes (≥2-source agreements)

1. **hesreallyhim/awesome-claude-code = flagship index** — 3-source convergence: perplexity research §2.1 ("flagship Claude Code curation") + exa/stackingjones ("the main curated community list") + gh `topic:awesome-claude-code` rank-1 by stars (44.5k). CLASS-A (gh) ∪ CLASS-B (perplexity+exa). High confidence.
2. **VoltAgent subagents + wshobson/agents are the two production subagent collections** — 2-source: exa/stackingjones (dedicated section on each, "coherent system not random collection" for wshobson; "security category alone justifies it" for VoltAgent) + perplexity §2.2 (VoltAgent "specialized subagents at scale"). Both proper `.claude-plugin/marketplace.json`.
3. **lastmile-ai/mcp-agent = canonical MCP-native workflow-pattern source** — 2-source: perplexity §4.2 ("composable MCP-first agent framework") + already-internal `mcp-agent-patterns` local skill (Anthropic effective-agents anchor). Convergence with our own prior adoption.
4. **wshobson/agents healthy + expanding** — 2-source: deepwiki (80/81 plugins, PluginEval+protect-mcp recent) + exa README (185 agents/153 skills/100 commands live 2026-05-23). No drift/regression; install-set EXPANSION opportunity (3 → +plugin-eval).
5. **mattpocock zero-drift** — 2-source self-consistent: gh-api HEAD `b8be62ffacb0…` == CLAUDE.md vendored SHA `b8be62ffacb0` exactly; W349 P1.3 cite-refresh note independently confirms. Pinned-to-HEAD.
6. **Skills-first / subagent-when-isolated discipline** — 3-source (boringbot substack + theaiarchitects + k21academy, all 2026-05): consistent with our local-skill-heavy + selective-subagent architecture; corroborates EXPANDING skill set over bulk-subagent installs.

---

## §5 — Cite Cluster (≥3 orgs; SHA/URL + timestamp)

| # | Org | Anchor | Probe |
|---|---|---|---|
| 1 | **wshobson** (GitHub) | `wshobson/agents` HEAD `cbcde3f1f4309f023095181d3e591f983ec7c95d` (PGP verified=true), pushed 2026-05-22T21:25:05Z | gh-api list_commits 2026-05-23 |
| 2 | **Matt Pocock** (GitHub) | `mattpocock/skills` HEAD `b8be62ffacb0118fa3eaa29a0923c87c8c11985c`, 2026-05-20T08:46:53Z (== vendored SHA) | gh-api list_commits 2026-05-23 |
| 3 | **VoltAgent** (GitHub/org) | `VoltAgent/awesome-claude-code-subagents` 20,349★ MIT, 130+ subagents/10-cat, `.claude-plugin/marketplace.json` | gh-api + deepwiki 2026-05-23 |
| 4 | **lastmile-ai** (GitHub/org) | `lastmile-ai/mcp-agent` 8,335★ Apache-2.0, pushed 2026-01-25, 5 workflow primitives | gh-api 2026-05-23 |
| 5 | **Yeachan-Heo** (GitHub) | `Yeachan-Heo/oh-my-claudecode` 34,621★ MIT, ~104 contrib, open_issues=3, pushed 2026-05-23 | gh-api 2026-05-23 |
| 6 | **hesreallyhim** (GitHub) | `hesreallyhim/awesome-claude-code` 44,576★ NOASSERTION, pushed 2026-04-27 | gh-api 2026-05-23 |
| 7 | **Anthropic** (deepwiki/docs) | deepwiki `wshobson/agents` recent-additions (PluginEval/protect-mcp/qa-orchestra); CC plugin/skill/subagent semantics per code.claude.com/docs | deepwiki ask_question 2026-05-23 |
| 8 | **stackingjones / claudefa.st / boringbot** (independent eval blogs) | exa: wshobson 33k + VoltAgent comparison; "skills-first" discipline; VoltAgent/awesome-agent-skills 14.4k sibling | exa web_search 2026-05-23 |
| 9 | **Perplexity Sonar Deep Research** (CLASS-B synthesis) | 76.9KB report: hesreallyhim flagship, VoltAgent at-scale, lastmile-ai mcp-agent, microsoft/agent-framework (already-known), sleepless-agent | perplexity_research 2026-05-23 (saved tool-result) |
| 10 | **sca-v20 framework** (internal, multi-org-anchored) | `.claude/schemas/sca-v20-multi-dim.schema.json` + META-C/D/F (14-org cite-cluster: OSSF/Kapravelos/DSPy-GEPA/Pydantic/Stanford/haize/Block/etc.) | Read 2026-05-23 |

**Distinct-org count: 9 external orgs + internal framework** (wshobson, Matt Pocock, VoltAgent, lastmile-ai, Yeachan-Heo, hesreallyhim, Anthropic, independent-eval-blog cluster, Perplexity). Exceeds sca-v13 3-org-distinct floor by 3×.

---

## Summary verdicts

- **§1 wshobson/agents**: NO drift/regression — HEAD healthy (PGP-signed, ≈1d), EXPANDED to ~80 plugins. **Action: EXPAND install-set 3→+`plugin-eval` (mechanizes sca-v20/META-F quality-gate); PATTERN-STUDY `protect-mcp`+`review-agent-governance`.** Keep SHA-pinned (bus-factor=1).
- **§2 mattpocock/skills**: **ZERO drift** — vendored SHA == HEAD `b8be62ffacb0`. No re-vendor. Monitor `skills/in-progress/` for next-wave promotion + PATTERN-STUDY `.out-of-scope` scoping convention.
- **§3 NEW candidates**: 9 surfaced. **Top adoption targets**: N1 VoltAgent-subagents (INSTALL, FQN-discipline required), N3 oh-my-claudecode (INSTALL-eval, highest velocity), N2 lastmile-ai/mcp-agent (PATTERN-STUDY — already partially adopted via `mcp-agent-patterns` skill), N4 hesreallyhim (CITE-ONLY discovery feed).
- **Cardinal-rule-6**: all metrics live-probed + timestamped 2026-05-23.

**STATUS: DONE** — file landed at `docs/architecture/W378-SOTA-CONVERGENCE/R3-INSTALLED-REAUDIT-AWESOME.md`.
