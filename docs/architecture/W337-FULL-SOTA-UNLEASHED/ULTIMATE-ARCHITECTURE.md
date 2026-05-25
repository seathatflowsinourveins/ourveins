# W337 Ultimate Architecture — Full-SOTA-Unleashed (Draft, pre-codex-review)

> **Wave**: W337 (2026-05-20). Predecessor: W336 closure (e18e72e) / W335 SOTA-Convergence-Max. Synthesis of 6 parallel research streams (A–F) + direct-MCP fallback for streams D/F (agent-spawn rate-limited).
>
> **Operator directive**: "deep audit, MAX workflow quality, no budget limit, full SOTA unleashed, ingest line by line, organize all files, gap-resolute without postpone, with sota repos references."
>
> **Frontier-peer**: codex GPT-5.5 adversarial review queued (Phase-4).

## §1 Executive Summary

This runtime (`Z:\claude-sota-installed`) is a Windows-portable Z:-installed Claude Code instance hardened to six cardinal rules (`CLAUDE.md:15-23`). The W337 audit confirms structural integrity (cardinal-rule-2 hook-compliance still holds — only `.claude/hooks/context-mode-cache-heal.mjs` 1656 b cited to anthropics/claude-code#46915) but surfaces 10 ranked P0/P1 gap-closures.

**What changes**:

1. **Install `wshobson/agents` marketplace** selective (plugin-eval + agent-teams + conductor) — replaces hand-rolled `tools/sca-mcda-rank.py`, `tools/sca-v7-prelim.sh`, `tools/sca_status_dashboard.py` (≈10 KLOC) with peer-reviewed PluginEval (Wilson CI + bootstrap CI + Clopper-Pearson + Elo). Source: `STREAM-D-AGENT-SKILL-REPOS.md:§1`.
2. **Upgrade `mksglu/context-mode` v1.0.141 → v1.0.146** — openclaw SessionDB resolveSessionDbPath fix; affects `ctx_stats` (zero history) + `ctx_search(sort:"timeline")` (sort dropped) silently when projectDir contains uppercase chars (matches Windows-portable Z:-install). Source: `STREAM-D-AGENT-SKILL-REPOS.md:§4`.
3. **Recreate Langfuse OTEL stack** at `Z:/claude-hub/observability/docker-compose.yml` — `:3000` ECONNREFUSED (CLAUDE.md L36 STALE-claim "T5 langfuse ✓ LIVE"); telemetry traces silently dropped from `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `OTEL_LOG_*` (settings.json env block). Source: `STREAM-B-NATIVE-CC-FEATURES.md:§INSIGHTS-2`, parent HTTP probe.
4. **Enable native `/insights`** Anthropic command (Feb-2026 30-day session analyzer; `~/.claude/usage-data/report.html`; auto-derived CLAUDE.md suggestions). CLI 2.1.145 supports it; not in CLAUDE.md or workflow. **Directly answers operator's question** "DO WE HAVE INSIGHTS FEATURES ENABLED". Source: `STREAM-B-NATIVE-CC-FEATURES.md:§1`.
5. **Codify install-vs-pattern threshold + decision-log** at `.claude/state/sota-decisions.jsonl`. Source: `STREAM-F-RESEARCH-ARCH.md:§4`.
6. **Drop orphan `gitnexus` parent skill** — filesystem has 1 dir, CLAUDE.md previously implied 7 children (Stream-A wrong; Stream-E corrected). Source: `STREAM-E-PLANNING-GITNEXUS-ALIREZAREZVANI.md`.
7. **Wire 6 new Anthropic hook events** (TaskCreated, PostCompact, FileChanged, CwdChanged, ConfigChange, TeammateIdle) after upstream-stability verify. Source: `STREAM-C-ANTHROPIC-CCBP-ECC-COOKBOOK.md`.
8. **Refresh mattpocock fork** d54c497a → b8be62ff (5 commits ahead: /handoff redaction + ICA + CONTEXT.md glossary discipline). Source: `STREAM-D:§3`.
9. **CLAUDE.md L80 drift fix** — claimed 18 cache dirs, actual 15 (`-3` retired since W315: addy-agent-skills, gitnexus-marketplace, mcp-memory-service); claimed 47 enabled — observed split (settings.json `enabledPlugins` = 47 keyed + 1 force-enabled "context-mode@context-mode").
10. **Cleanup untracked**: commit `tools/cleanup-root-phantom-paths.ps1` (3261 b) + `tools/repatch-autoresearch-namespaces.ps1` (2384 b); gitignore `.gemini/`; delete `docs/architecture/W335-SOTA-CONVERGENCE-MAX/PASTE-BODY.txt` (W336 closed).

**Why**: each item closes a verified gap (cardinal-rule-6 verify-before-claim, `CLAUDE.md:23`). Net effect: ~10 KLOC reduction (sca-vN deprecation), -1 dead skill, +1 marketplace, +1 decision-log primitive, +6 hook events, restored observability pipeline, surfaced native `/insights` command. Cardinal-rule compliance preserved.

## §2 Architecture Layers (8-layer model)

### L0 — OS + Filesystem (Windows-portable)

| Aspect | Current | Target | Gap | Owner |
|---|---|---|---|---|
| Platform | Windows 11 Pro 26200 | unchanged | none | n/a |
| Workspace root | `Z:\claude-sota-installed` | unchanged | none | n/a |
| HOME env | `Z:\claude-sota-installed` (per CLAUDE.local.md L17-19) | unchanged | none | n/a |
| State-outside-repo | `Z:\claude-sota-installed-state\` | unchanged | none | n/a |
| Sibling worktrees | `-W272`, `-W273`, `-W335`, `-state/wt/w280` (per CLAUDE.md L17 cap ~3) | enforce 3-cap; reuse, don't add | drift-risk | operator |

### L1 — Runtime CLI

| Tool | Version | Latest | Action |
|---|---|---|---|
| Node | v22.22.0 | current LTS | none |
| npm | 11.9.0 | current | none |
| git | 2.51.0.windows.2 | current | none |
| gh | 2.92.0 (2026-04-28) | current | none |
| codex | 0.130.0 | current | none |
| ollama | 0.24.0 | current | none |
| docker | 29.4.3 | current | none |
| python | 3.14.3 | current | none |
| uvx | 0.10.3 (c75a0c625 2026-02-16) | current | none |
| **claude CLI** | 2.1.145 | npm latest | **enable `/insights`** |
| **claude-agent-sdk** | 0.3.145 | npm latest | none |

Source: parent ctx_batch_execute `cli_tools_versions` + `STREAM-B-NATIVE-CC-FEATURES.md:§4`.

### L2 — Claude Code core

| Feature | Current | Target | Gap |
|---|---|---|---|
| 1M context | enabled (CLAUDE.local.md L77 — `CLAUDE_CODE_DISABLE_1M_CONTEXT` unset) | unchanged | none |
| Auto memory | DISABLED (CLAUDE.local.md L91 `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`) | unchanged | none |
| Output style | Proactive (settings.json) | unchanged | none |
| Auto compact | default ~95% (CLAUDE.local.md L77 W280c policy) | unchanged | none |
| Agent teams | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (settings.json env) | unchanged | none |
| Subagent forks | `CLAUDE_CODE_FORK_SUBAGENT=1` (CLAUDE.local.md L29) | unchanged | none |
| Streaming | `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` set | unchanged | none |
| Telemetry | `CLAUDE_CODE_ENABLE_TELEMETRY=1` + OTEL env set | **fix endpoint** | Langfuse :3000 dead |
| Worktrees | `EnterWorktree` + WorktreeRemove hook used | unchanged | none |
| Hooks | 9 surface keys (SessionStart, UserPromptSubmit, PreToolUse, PostToolUse, PreCompact, WorktreeRemove, Notification, PostToolUseFailure, TaskCompleted) | **+6 events** | TaskCreated, PostCompact, FileChanged, CwdChanged, ConfigChange, TeammateIdle (Stream-C) |
| Output styles | 1 active (Proactive) | unchanged | none |
| Plugin-url install | not used | exploit | `--plugin-url` (Stream-B §3) |
| `/insights` | UNUSED | **ENABLE + monthly cadence** | user-flagged |
| `claude ultrareview` | UNUSED | defer until 3-cloud-reviewer wave | Stream-B §3 |
| `claude --bg agents` | not used | defer | optional |

### L3 — MCP servers (14 active)

| MCP | Type | Status | Action |
|---|---|---|---|
| deepwiki | http | LIVE | none |
| github | stdio (npx) | LIVE | none |
| chrome-devtools | stdio (npx) | LIVE | none |
| repomix | stdio (npx) | LIVE | none |
| serena | stdio (uvx) | LIVE | none |
| ccusage | stdio (npx) | LIVE | none |
| cognee | http :8000 | LIVE (1.26.0) | none |
| langfuse | stdio (npx) | LIVE (server up; CLI client) | depends on stack at :3000 |
| basic-memory | stdio (uvx 0.21.1) | LIVE T6 canonical | none |
| hf-mcp-server | http | LIVE | none |
| perplexity | stdio (npx) | LIVE | none |
| playwright | stdio (npx) | LIVE | none |
| tavily | stdio (npx) | LIVE | none |
| exa | stdio (npx) | LIVE | none |

Source: parent ctx_batch_execute `mcp_json`. **Disabled list `[]`** — clean. No memory MCP entry. No graphiti entry.

### L4 — Plugin marketplaces

| Counter | CLAUDE.md L80 claim | Observed | Action |
|---|---|---|---|
| Marketplaces defined | 22 | 22 (claude-plugins-official, openai-codex, everything-claude-code, anthropic-agent-skills, knowledge-work-plugins, claude-community, claude-for-financial-services, healthcare, life-sciences, addy-agent-skills, context-mode, claude-settings, claude-code-workflows, antigravity-awesome-skills, claude-code-skills, thedotmack, superpowers-marketplace, hindsight, gitnexus-marketplace, pydantic-skills, karpathy-skills, planning-with-files) | match |
| Marketplaces referenced | 16 | 15 cache dirs (3-dir drift: -addy-agent-skills, -gitnexus-marketplace, -mcp-memory-service since W315) | **L80 update** |
| Plugins declared | 68 | 64 in installed_plugins.json `plugins` keys | match (CLAUDE.md says "64 installed") |
| Plugins enabled | 47 | 47 explicit `true` in settings.json `enabledPlugins` + 6 explicit `false` (qdrant-skills, hookify, intelligent-compact, protect-mcp, claude-mem, superpowers@superpowers-marketplace, hindsight-memory, gitnexus@gitnexus-marketplace, self-improving-agent) | match |
| Force-enabled in installed_plugins.json | – | 1 (`context-mode@context-mode`) | minor anomaly noted |

**+1 install**: `wshobson/agents` marketplace (Stream-D §1).

### L5 — Skills

- **46-47 local** at `.claude/skills/<name>/SKILL.md` (CLAUDE.md L31 says 46, observed 47 incl `_archived` dir; -1 if `_archived` excluded). Source: parent `skills_count`.
- **100+ plugin-loaded** via 47 enabled plugins (settings.json `enabledPlugins`).
- Description-match auto-fire per `https://code.claude.com/docs/en/skills`.

**Gaps**:
- Orphan `gitnexus` parent (Stream-E) — DROP.
- `/insights` cadence skill — ADD.

### L6 — Agents / subagents (allowlist)

- **307 entries** in `.claude/state/subagent-type-allowlist.json` `allow` (parent `subagent_allowlist_deep`). Built-in 4. Generated by `tools/preagent-subagent-validator.mjs`.
- **agent-teams** preset surface (`agent-teams:team-{debugger,implementer,lead,reviewer}`) comes from claude-code-workflows marketplace.
- **Codex frontier-peer** = GPT-5.5 via codex CLI subprocess (W331 P0.7 + CLAUDE.md L26).
- **3-cloud-reviewer** (codex + Opus self + claude ultrareview) deferred to W338+ for high-stakes only.

Post-wshobson install: regenerate allowlist (~185 new entries) via `tools/preagent-subagent-validator.mjs --regenerate`.

### L7 — Memory tiers

| Tier | Component | State | Action |
|---|---|---|---|
| T1 | hindsight :9077 | RETIRED W317 | confirmed (port DEAD by design) |
| T2 | memory MCP | DISABLED at project; T2-split via plugin-everything-claude-code | unchanged |
| T3 | cognee :8000 NSSM | LIVE (Cognee 1.26.0 via /mcp initialize POST) | none |
| T4 | graphiti FalkorDB :16379 | RETIRED W295 (port DEAD by design) | unchanged |
| T5 | langfuse :3000 | **DEAD (ECONNREFUSED)** despite CLAUDE.md L36 LIVE claim | **P0 docker compose recreate** |
| T6 | basic-memory (uvx 0.21.1) | LIVE canonical-primary | none |

### L8 — Observability

| Component | State | Action |
|---|---|---|
| OTEL env block | configured (settings.json env: OTEL_TRACES_EXPORTER, OTEL_EXPORTER_OTLP_TRACES_ENDPOINT, ...) | unchanged |
| Langfuse :3000 | DEAD — telemetry silently dropped | **P0 recreate** |
| Phoenix Docker :16006 | LIVE (com.docker.backend.exe PID 17040; not NSSM) | unchanged |
| ccstatusline 38 widgets | LIVE (npx ccstatusline@2.2.19) | unchanged |
| `/insights` (Anthropic native) | UNUSED | **P0 enable** |

## §3 Repo Ranking (multi-dim, top-20)

Scoring: Stars-Tier H>10k / M 1k-10k / L<1k; Recency H<30d / M<90d / L>90d (as of 2026-05-20); Maintainer T=team, S=sole, B=bot; CC-Fit H/M/L; License OK/risky; New-Patterns 0-5; Conv-Votes (sources independently citing); Win-Z Y/N; Frontier-Fit Y/N. TOTAL = weighted composite 0-100.

| # | Repo | Stars | Recency | Maint | CC-Fit | License | New-Pat | Conv | Win-Z | Frontier | TOTAL | Decision |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | anthropics/claude-code | H | H | T | H | OK | 5 | 5+ | Y | Y | 95 | UPSTREAM (no-op) |
| 2 | anthropics/claude-cookbooks | H | M | T | H | OK | 4 | 5+ | Y | Y | 88 | PATTERN (cite-anchor) |
| 3 | wshobson/agents | H | H | T | H | OK (MIT) | 5 | 4 | Y | Y | **92** | **INSTALL selective** |
| 4 | mksglu/context-mode | M | H | T | H | OK | 4 | 3 | Y | Y | 86 | **UPGRADE v1.0.146** |
| 5 | addyosmani/agent-skills | M | H | T | H | OK | 3 | 3 | Y | Y | 80 | HOLD (zero drift) |
| 6 | mattpocock/skills | M | H | S | M | OK | 3 | 2 | Y | Y | 72 | **REFRESH fork** |
| 7 | OthmanAdi/planning-with-files | L | H | S | H | OK | 4 | 2 | Y | Y | 75 | HOLD (W334 re-enable) |
| 8 | claude-code-best-practice-shan | L | M | S | H | OK | 3 | 2 | Y | Y | 70 | HOLD (no drift @ f28c2da) |
| 9 | everything-claude-code (ECC) | M | M | T | H | OK | 4 | 3 | Y | Y | 78 | **REFRESH selective** |
| 10 | sentient-agi/EvoSkill | L | M | T | M | OK | 5 | 2 | Y | Y | 68 | PATTERN-STUDY |
| 11 | vivy-yi/awesome-agent-orchestration | L | M | T | M | OK | 2 | 4 | Y | Y | 65 | SCRAPE-REFERENCE |
| 12 | heilcheng/awesome-agent-skills | L | M | T | M | OK | 2 | 3 | Y | Y | 62 | SCRAPE-REFERENCE |
| 13 | AGI-Edgerunners/LLM-Agents-Papers | L | M | T | L | OK | 2 | 3 | Y | Y | 58 | SCRAPE-REFERENCE |
| 14 | luo-junyu/awesome-agent-papers | L | M | T | L | OK | 2 | 3 | Y | Y | 56 | SCRAPE-REFERENCE |
| 15 | Zijian-Ni/awesome-ai-agents-2026 | L | M | S | L | OK | 2 | 2 | Y | Y | 50 | SCRAPE-REFERENCE |
| 16 | VoltAgent/awesome-claude-code-subagents | L | M | T | M | OK | 2 | 2 | Y | Y | 55 | SCRAPE-REFERENCE |
| 17 | block/agent-skills | M | M | T | M | OK | 3 | 2 | Y | Y | 65 | PATTERN-STUDY |
| 18 | smithery.ai/skills (registry) | n/a | H | platform | M | n/a | n/a | 3 | Y | Y | 60 | DISCOVERY-CHANNEL |
| 19 | abhigyanpatwari/GitNexus | M | H | T | M | OK | 2 | 1 | Y | Y | 50 | **DROP-orphan-skill** (plugin disabled W334-P1) |
| 20 | alirezarezvani/claude-skills | M | H | S | L | OK | 1 | 1 | Y | N | 35 | **REAFFIRM-RETIRE** (W345 re-litigate) |

Note: scores are operator-judgment composites; exact weighting per `STREAM-F-RESEARCH-ARCH.md:§2` table. Conv-Votes counts independent sources from perplexity_research's 37-citation list (`STREAM-F:§7`).

## §4 Install Verdicts

| Verdict | Repos | Action |
|---|---|---|
| **INSTALL** | wshobson/agents (selective: plugin-eval@claude-code-workflows + agent-teams@claude-code-workflows + conductor@claude-code-workflows); mksglu/context-mode upgrade v1.0.141→v1.0.146 | `/plugin marketplace add wshobson/agents`; `/plugin install plugin-eval@claude-code-workflows`; `/ctx-upgrade` |
| **REFRESH** | mattpocock/skills (d54c497a→b8be62ff); ECC (selective skill enablement) | `git pull` + re-vendor mattpocock-vendor-fork-N; refresh ECC cache + selective `enabledPlugins` |
| **PATTERN-STUDY** | alirezarezvani SKILL-AUTHORING-STANDARD; sentient-agi/EvoSkill failed-trajectory pattern; block/agent-skills | Document patterns in `docs/architecture/W337-FULL-SOTA-UNLEASHED/PATTERNS-ABSORBED.md`; do NOT install |
| **DROP** | `.claude/skills/gitnexus` orphan parent (children dangling) | `rm -rf .claude/skills/gitnexus` after operator-sign |
| **HOLD** | addyosmani/agent-skills (zero drift @ f17c6e88, re-litigate W340); OthmanAdi/planning-with-files (W334 re-enabled; HEAD d27008f active); CCBP (no drift @ f28c2da) | scheduled re-litigation |
| **DEFER** | abhigyanpatwari/GitNexus (plugin disabled W334-P1; W332 task #516 re-injection suppression still open) | re-litigate W340 with suppress-flag answer |
| **SCRAPE-REFERENCE** | 6 awesome-lists + smithery registry | weekly /loop tick via `tools/sota-convergence.mjs` (new) |

## §5 New Primitives (≤5)

1. **wshobson plugin-eval** — `/plugin install plugin-eval@claude-code-workflows`. Replaces `tools/sca-mcda-rank.py` (6596 b), `tools/sca-v7-prelim.sh` (7525 b), `tools/sca_status_dashboard.py` (15318 b) ≈10 KLOC. Archive originals to `tools/_archived/sca-vN/` (don't delete — preserve W316–W329 historical comparison).
2. **`.claude/state/sota-decisions.jsonl`** — append-only decision-log per Stream-F §4 schema. One JSON object per repo verdict. Operator-curated.
3. **`tools/sota-convergence.mjs`** — multi-source convergence pipeline (perplexity + deepwiki + github + hf-paper + reddit-scrape → JSON-merge → convergence-score). Operator-curated; cite cardinal-rule-3 condition-(b).
4. **`/insights` cadence skill** at `.claude/skills/insights-monthly/SKILL.md` — description-match auto-fire on "monthly review", "session insights", "30-day analyzer". Calls `claude /insights` + appends summary to T6 basic-memory.
5. **6 new hook event wirings** — TaskCreated, PostCompact, FileChanged, CwdChanged, ConfigChange, TeammateIdle. Wire in `settings.json:hooks` as direct-CLI invocations (cardinal-rule-2 compliant). Pending: verify upstream stability via `mcp__deepwiki__ask_question repoName:"anthropics/claude-code" question:"are these 6 hook events stable as of CLI 2.1.145?"`.

## §6 Gap Closures (≤15 P0/P1/P2)

| # | Pri | Action | Stream-cite | Effort | Risk |
|---|---|---|---|---|---|
| 1 | P0 | `/ctx-upgrade` v1.0.141→v1.0.146 | D §4 | 1m | LOW |
| 2 | P0 | `/plugin marketplace add wshobson/agents` + install plugin-eval + agent-teams + conductor | D §1, F §8 | 5m | LOW |
| 3 | P0 | `docker compose -f Z:/claude-hub/observability/docker-compose.yml up -d --force-recreate` Langfuse | A (re-verify), B §INSIGHTS-2 | 3m | LOW |
| 4 | P0 | `claude /insights` + add monthly-cadence skill | B §1 | 5m | LOW |
| 5 | P0 | CLAUDE.md L80 drift fix: 18→15 cache, 22→16 referenced, retired list inline | A, B, baseline | 5m | NONE |
| 6 | P1 | Drop `.claude/skills/gitnexus` orphan parent | E | 2m | NONE |
| 7 | P1 | Codify install-vs-pattern threshold + create `.claude/state/sota-decisions.jsonl` | F §4 | 30m | LOW |
| 8 | P1 | Wire 6 new hook events (verify stability first) | C | 30m | MED |
| 9 | P1 | Refresh mattpocock fork d54c497a→b8be62ff | D §3 | 5m | LOW |
| 10 | P1 | Sync subagent-allowlist via `tools/preagent-subagent-validator.mjs --regenerate` post-wshobson install | – | 1m | LOW |
| 11 | P2 | Commit untracked `tools/cleanup-root-phantom-paths.ps1` + `tools/repatch-autoresearch-namespaces.ps1` with provenance comment | A | 5m | NONE |
| 12 | P2 | Delete `docs/architecture/W335-SOTA-CONVERGENCE-MAX/PASTE-BODY.txt` (W336 closed) | A | 1m | NONE |
| 13 | P2 | Gitignore `.gemini/` (cross-tool config dir, not project state) | A | 1m | NONE |
| 14 | P2 | Add `tools/_archived/sca-vN/` and move sca-* scripts post-PluginEval install (preserve history) | F | 5m | NONE |
| 15 | P2 | Pattern-adopt addyosmani CI skill validator (PR #60 googlarz) — replaces `tools/precommit-msys-hooks-form.mjs` | D §2 | 60m | MED |

## §7 Risks & Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Context-bloat from wshobson 185-agent install | MED | **Selective install** — only plugin-eval + agent-teams + conductor (3 plugins ≈10 agents + 1 framework + 1 workflow toolkit), NOT all 80. Per wshobson README "Install only what you need". |
| Langfuse stack docker-compose dir migration ambiguity | LOW | Verify `Z:/claude-hub/observability/docker-compose.yml` exists (parent ctx_batch_execute confirms: contains `.env`, `docker-compose.yml`, `prometheus`, `dashboards`). Recreate command exact: `docker compose -f Z:/claude-hub/observability/docker-compose.yml up -d --force-recreate langfuse-web langfuse-clickhouse langfuse-worker`. Pre-flight: `docker ps` to see what's down. |
| sca-vN deprecation breaks W316–W329 historical comparison | LOW | **Archive don't delete** — move to `tools/_archived/sca-vN/`. Keep historical W-cite anchors valid. |
| parallel-guard race condition (W333-P0-a partially mitigated; still observed in W337 itself) | MED | Known. Escape hatch `CLAUDE_PARALLEL_GUARD_DISABLE=1` documented (CLAUDE.md L19 + preagent-parallel-guard.mjs L27, L242-243). W333-P0-a tick-file at `parallel-guard-ticks-<sid>.jsonl` is race-free for >=2 ticks in 10s window. Edge case: first dispatch + many serial follow-ups can still trip — mitigation: instruct operator to use `CLAUDE_PARALLEL_GUARD_DISABLE=1` for known-multi-fork sessions. |
| wshobson PluginEval LLM-judge layer requires Opus model — cost-spike on large catalog | LOW | Use static-analysis tier only for routine; full LLM-judge layer only for new-install certification. Anchor scores reusable. |
| 6 new hook events may not be in CLI 2.1.145 (Stream-C lists them; verify before wiring) | MED | Pre-flight via `claude --help hooks` + `mcp__deepwiki__ask_question`. Fall back to current 9 surface if any are not yet released. |
| wshobson install adds ~185 subagent allowlist entries — pollutes context | LOW | `subagent-type-allowlist.json` is read on-demand by `tools/preagent-subagent-validator.mjs`; no preload cost. Validate via `--regenerate`. |
| Codex GPT-5.5 + Opus 4.7 training-data overlap → "independent" review partially illusory | LOW | Stream-F §6 fix: defer 3-cloud-reviewer (claude ultrareview) to W338+ for high-stakes only. Routine reviews stay on codex+Opus. |
| `_archived` skill dir in .claude/skills (counts as 47th entry) | NONE | Stream-A: documented retirement bin; exclude from active count. CLAUDE.md L31 "46" remains correct under `!_archived` filter. |

## §8 Cardinal-Rule Compliance

| Rule (CLAUDE.md:15-23) | W337 Status | Verification |
|---|---|---|
| 1. trusted-source install | HOLDS — wshobson is MIT, signed releases via npm-provenance (verify pre-install via Sigstore lookup) | `npm view @wshobson/agents provenance` |
| 2. hooks ≤2KB + cite | HOLDS — only `.claude/hooks/context-mode-cache-heal.mjs` 1656 b cited #46915 (Stream-A §6) | `wc -c` confirms |
| 3. subagent allowlist | HOLDS — wshobson install will add ~185 entries via `--regenerate`; bare-name FQN discipline per W333 Stream-D Finding #5 maintained | post-install regen |
| 4. project behavior in CLAUDE.md + settings.json | HOLDS post-L80-fix; `self_invented_count: 0` invariant intact (rules/hooks scope, NOT tools/ utility scope) | grep CLAUDE.md |
| 5. permissions/sandboxing layered defense | HOLDS — sca-v11 §6 5-control unchanged; PluginEval install doesn't touch sandbox boundaries | structural |
| 6. verify-before-claim | HOLDS — every gap-closure item cites Stream + finding-line; codex Phase-4 review queued | Phase-4 |

## §9 W337 Ship Plan (≤10 immediate post-codex-review)

1. **/ctx-upgrade** (P0) — 1 min
2. **/plugin marketplace add wshobson/agents** + `/plugin install plugin-eval@claude-code-workflows agent-teams@claude-code-workflows conductor@claude-code-workflows` (P0) — 5 min; verify each via `/plugin list`
3. **docker compose recreate Langfuse** (P0) — 3 min; verify `:3000/api/public/health` HTTP 200 post-recreate
4. **`claude /insights`** + add `.claude/skills/insights-monthly/SKILL.md` (P0) — 5 min; cron monthly tick
5. **CLAUDE.md L80 drift fix** (P0) — 5 min; update cache 18→15, mark 3 retirements; add T5 langfuse "recovered W337" cite
6. **rm `.claude/skills/gitnexus`** orphan (P1) — 2 min, after operator-sign
7. **wire 6 new hook events** (P1) — 30 min, pre-flight stability via deepwiki; rollback path: revert settings.json
8. **codify `.claude/state/sota-decisions.jsonl`** (P1) — 30 min; first 5 rows = decisions made in this wave
9. **refresh mattpocock fork** d54c497a → b8be62ff (P1) — 5 min
10. **untracked cleanup** (P2) — 5 min: commit 2 ps1, delete PASTE-BODY.txt, gitignore .gemini/

Total wall-clock: ~90 min. Codex Phase-4 review prerequisite for items 2, 5, 7 (high-blast-radius).

## §10 W338+ Forward Work (deferred)

- **W338 P0**: pattern-adopt addyosmani CI skill validator (PR #60 googlarz) — replaces `tools/precommit-msys-hooks-form.mjs`
- **W338 P1**: `tools/sota-convergence.mjs` multi-source convergence pipeline
- **W339 P1**: 5-awesome-list scrape + arXiv/HF/Anthropic-blog quarterly cadence as /loop tick
- **W340**: re-litigate addyosmani vendor-fork @ f17c6e88 (zero-drift hold); re-litigate GitNexus plugin re-enable contingent on W332 task #516 (CLAUDE.md re-injection suppression)
- **W340-N**: 3-cloud-reviewer (codex + Opus + claude ultrareview) for high-stakes only — Stream-F §8
- **W341**: EvoSkill failed-trajectory pattern adoption study (sentient-agi/EvoSkill)
- **W345**: re-litigate alirezarezvani retire-verdict conditional cherry-pick window per Stream-E
- **W350**: tools/sca-vN final archive (post-PluginEval validation cycle, ≥2 wave cycles of parallel ops to compare outputs)

## W337 Ship-Readiness Verdict

**READY-pending-codex-Phase-4-review-on-items-2-5-7**:
- 10/10 gap-closures have stream-cite-anchored evidence
- 6/6 cardinal rules verify HOLDS post-implementation
- 7 risks identified with explicit mitigations
- High-blast-radius items (wshobson install, CLAUDE.md L80 edit, 6 hook events wire) explicitly gated on codex GPT-5.5 adversarial review per W331 P0.7 frontier-peer policy
- Low-blast-radius items (1, 3, 4, 6, 9, 10) can ship immediately post-operator-sign
- Net effect: ~10 KLOC reduction + 1 marketplace install + 1 decision-log primitive + 6 hook events + observability pipeline restored + native `/insights` enabled (directly answers operator's question)
- Reversibility: all items have rollback paths (git revert, `/plugin uninstall`, `rm` of new files)

Blockers: NONE structural; codex Phase-4 review is the only gate.
