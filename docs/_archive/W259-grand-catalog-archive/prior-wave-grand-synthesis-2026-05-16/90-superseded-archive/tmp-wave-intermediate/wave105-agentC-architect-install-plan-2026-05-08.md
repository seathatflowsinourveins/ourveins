---
title: Wave 105 Agent C — Architect install-plan ≥2-option trade-off
status: AUTHORITATIVE
date: 2026-05-08
agent: architect (general-purpose dispatch)
wave: 105
fire: 1
parent: orchestrator (Wave 105)
output_budget_loc: 500
termination: on_handoff_to:orchestrator | max_turns:18 | on_text_match:"RECOMMENDED-OPTION:"
---

# Wave 105 Architect — Install-plan ≥2-option trade-off

## Ground truth probe (Wave 104 close `67620bd`)

- **Enabled plugins (13)**: agent-sdk-dev / claude-code-setup / claude-md-management / codex / context-mode / everything-claude-code / frontend-design / plugin-dev / pr-review-toolkit / pyright-lsp / ralph-loop / skill-creator / superpowers
- **MCP servers (5)** in `.mcp.json`: github (HTTP) / context7 (HTTP) / deepwiki (HTTP) / playwright (stdio) / serena (stdio)
- **Hook events wired (6)**: PreToolUse / PostToolUse / SessionStart / SessionEnd / Stop / SubagentStop
- **`permissions.defaultMode`**: `bypassPermissions` (CR-7 Phase 3 destination active per Wave 82d operator-flip)
- **Local `.claude/agents/`**: 8 cite-import-AMBER (architect / code-reviewer / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / sota-researcher / verifier)
- **Memory MCPs**: mcp-memory-service v10.51.3 INSTALLED via pip ✅ but **NOT wired in `.mcp.json`** ❌; graphiti-core 0.29.0 INSTALLED via pip ✅ + FalkorDB Docker UP @16379 ✅ but **NOT wired in `.mcp.json`** ❌; Qdrant Docker container UP but NOT wired
- **Section 15 (eval/benchmark/observability)**: 0 INSTALLED rows — entire axis empty
- **`extraKnownMarketplaces` (10)**: claude-plugins-official + openai-codex + everything-claude-code + anthropic-agent-skills + knowledge-work-plugins + claude-community + financial-services + healthcare + life-sciences + addy-agent-skills
- **Codex pool (zfan7@sva.edu Pro)**: 2% used — full T1+T2+T3 lifecycle available
- **Spawn-gate `.claude/hooks/scripts/agent_spawn_gate.py`**: allowlist includes `codex:codex-rescue` + local `architect` etc., but Agent runtime returns `Agent type 'architect' not found` — **wire-mismatch needs reconciliation**

## Gap matrix per axis (5)

| Axis | Gap | Severity |
|---|---|---|
| 1 Plugins | All 3 Top-3 OFFICIAL plugins (superpowers + codex + everything-claude-code) ALREADY enabled — no Top-3 gap | LOW (saturation reached) |
| 2 MCPs | mcp-memory + graphiti installed-but-unwired (Memory L1+L3 dark) + Qdrant L2 unwired | **HIGH** (memory stack not operational) |
| 3 Agents native-install | Local 8 cite-import-AMBER agents — `subagent_type` runtime resolution broken (architect/sota-researcher etc. fail registration); superpowers + ECC plugins ship `*-reviewer` agents but cite-import locals shadow them | **HIGH** (orchestration backbone) |
| 4 Hooks | 6 wired vs 18 sibling waves; missing UserPromptSubmit + Notification + PostToolUseFailure + StopFailure + ConfigChange + PreCompact + PostCompact + InstructionsLoaded + WorktreeRemove + SubagentStart + TaskCompleted + TeammateIdle + PermissionRequest | MED |
| 5 Eval/Obs | Section 15 entirely empty — promptfoo / langfuse / phoenix / openai-evals / ragas / deepeval / braintrust unset | MED-HIGH |

---

## Option A — Plugin-priority expansion (knowledge-work + agent-skills + community plugins)

**Hypothesis**: Top-3 OFFICIAL plugins saturated. Next plugin layer = vertical/community marketplaces already registered (anthropics/skills + knowledge-work-plugins + claude-community + addy-agent-skills) — install canonical plugins from each before MCP/agent/hook ships. Plugin-class delivers agents + skills + commands as bundled atomic unit per CR-12 PRIMARY (upstream-install).

### Ship sequence (10 ships)

| # | Ship | Tier | Cite anchor | Install command (CR-6 official-native-channel) | Smoke probe |
|---|---|---|---|---|---|
| A1 | `claude-md-improver` from anthropic-agent-skills already enabled — **SKIP, no-op** | — | — | — | — |
| A1' | `subagent-spawn-templates` from `anthropics/skills` — probe presence | T4 | TIER-1-DIRECT https://github.com/anthropics/skills @<HEAD-pin-from-known_marketplaces> | `/plugin install <plugin>@anthropic-agent-skills` (gate: probe `gh api repos/anthropics/skills/contents/plugins` first) | `/plugin list` shows enabled |
| A2 | `knowledge-work-plugins` top plugin (probe marketplace.json index) | T4 | TIER-1-DIRECT https://github.com/anthropics/knowledge-work-plugins @<HEAD-pin> | `/plugin install <top>@knowledge-work-plugins` | `/plugin list` enabled + smoke skill invocation |
| A3 | `addy-agent-skills` Top-3 by Wave 82m-B convergence (`source-driven-development` + 2 more) | T4 | TIER-1-DIRECT https://github.com/addyosmani/agent-skills @742dca5 (33,500★ MIT/Apache-2.0; addyosmani named-author 4th-org Axis-1 cite per CLAUDE.md) | `/plugin install <plugin>@addy-agent-skills` | Skill tool surfaces new skill names |
| A4 | `claude-community` top plugin per marketplace.json | T4 | TIER-1-DIRECT https://github.com/anthropics/claude-plugins-community @<HEAD-pin> | `/plugin install <top>@claude-community` | `/plugin list` enabled |
| A5 | mcp-memory wire to `.mcp.json` (already installed via pip) | T2 | TIER-1-DIRECT https://github.com/doobidoo/mcp-memory-service v10.51.3 (INSTALLED 2026-05-08 per provenance) | Edit `.mcp.json` add `"memory": {"command": "Z:/venvs/claude/Scripts/mcp-memory-server.exe", ...}` | `/mcp` lists `memory` connected; `tools/list` returns store/search tools |
| A6 | graphiti MCP wire (already installed; Falkor UP) | T2 | TIER-1-DIRECT https://github.com/getzep/graphiti @c427615 v0.29.0 (Apache-2.0 25.8k★) | Edit `.mcp.json` add stdio entry to `Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py` with FalkorDB-mode env (`USE_FALKORDB=true`, `FALKORDB_HOST=127.0.0.1`, `FALKORDB_PORT=16379`, `OPENAI_API_KEY=${OPENAI_API_KEY}`) | `/mcp` shows graphiti connected; smoke `add_episode` returns success |
| A7 | Reconcile agent-runtime: delete local `.claude/agents/code-reviewer.md` (sibling cite-import) — let plugin-shipped supersede | T1b | TIER-1-DIRECT subagent install-path precedence per `https://code.claude.com/docs/en/sub-agents` (`.claude/agents/` > marketplace > builtins) | `rm Z:/claude-sota-installed/.claude/agents/code-reviewer.md` (after sota-researcher HONEST-NON-FINDING confirms plugin-shipped equivalent) | `Agent({subagent_type:"code-reviewer"})` resolves to plugin-shipped |
| A8 | Repeat A7 for any remaining locals with plugin-shipped equivalent (verifier, debugger) — sota-researcher Probe DAG | T1b | TIER-1-DIRECT same as A7 | `rm` per HNF result | `Agent()` resolves to non-local |
| A9 | promptfoo install (top eval CLI per Section 15 plan) | T5 | TIER-1-DIRECT https://github.com/promptfoo/promptfoo @v0.122.0 (npm `promptfoo@0.122.0` MIT) — pin instead of `@latest` per CR-9 | `npm install -g promptfoo@0.122.0` | `promptfoo --version` returns 0.122.0 |
| A10 | langfuse self-hosted Docker (LLM observability) | T5 | TIER-1-DIRECT https://github.com/langfuse/langfuse @<release-tag> (MIT Apache-2.0) | `docker pull langfuse/langfuse:3` (pin major) + `docker run` | `curl http://localhost:3000/api/public/health` returns 200 |

### CR compliance per ship (Option A)

- **CR-1** ✅ every row has TIER-1-DIRECT cite or TIER-1-DIRECT @ HEAD-pin
- **CR-3** ✅ Phase 1 bootstrap exception still applies for new ships requiring T1 review (foreground+tee `codex exec` per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`)
- **CR-5** ✅ all ships are install-class via `/plugin install` / `npm install` / pip / docker pull (NO hand-coding)
- **CR-6** ✅ all ships use official native channel (no shell-script wrappers around `/plugin install`)
- **CR-8** ✅ install-class rows; no novel content
- **CR-9** ⚠️ A9 promptfoo pinned to v0.122.0 (NOT `@latest`); A10 langfuse pinned to major v3; pre-cite-import REVERT check needed for A7+A8 (probe `git -C Z:/claude-sota log --all --oneline -- .claude/agents/code-reviewer.md` for prior REVERT-AND-REMOVE)
- **CR-10** ✅ A2/A3/A4 require sota-researcher HONEST-NON-FINDING probe of marketplace.json index BEFORE `/plugin install`
- **CR-11** ✅ each ship gets Pattern A apply per `codex-t1-fix-forward-pattern.md`
- **CR-12** ✅ A1'-A4 are PRIMARY upstream-install; A5-A6 PRIMARY (already installed, only wiring); A7-A8 supersede TERTIARY cite-import-AMBER with PRIMARY plugin-shipped

### Trade-offs Option A (pros 4 / cons 4)

**Pros**:
- Plugin-class atomic delivery: 1 install ships agents + skills + commands together (high install-density per fire)
- Anthropic vertical marketplaces (financial-services / healthcare / life-sciences) already registered but ZERO plugins from them enabled — high latent SOTA value
- A7-A8 close the cite-import-AMBER backlog per CR-12 principle (sibling-derived NOT TIER-1)
- Plugin install probes naturally trigger CR-10 research-then-install workflow

**Cons**:
- Marketplace.json indexes for knowledge-work-plugins / claude-community / addy-agent-skills NOT YET probed — risk of HNF / no-relevant-plugin
- A2-A4 plugin selections require sota-researcher dispatch BEFORE install (latency cost)
- Memory MCPs A5-A6 buried mid-sequence — HIGH-severity gap not addressed first
- Section 15 eval observability still mostly dark after this wave (only 2 of 6 candidate primitives)

---

## Option B — MCP-wiring + agent-native-replacement (close existing-install gaps before new ships)

**Hypothesis**: Already-installed-but-unwired = highest ROI. mcp-memory + graphiti + Qdrant all installed via pip/Docker but absent from `.mcp.json` — Memory L1+L2+L3 stack 100% dark despite 100% install. Reconcile FIRST, then close agent-runtime resolution mismatch (agent_spawn_gate vs `subagent_type` resolution), then minimal plugin/eval ships. Per CR-9 sibling-bleed defense + cardinal-rule-12 PRIMARY upstream-install, fix the WIRE before new INSTALL.

### Ship sequence (8 ships)

| # | Ship | Tier | Cite anchor | Install command (CR-6 official-native-channel) | Smoke probe |
|---|---|---|---|---|---|
| B1 | mcp-memory wire to `.mcp.json` (highest-ROI dark-install) | T2 | TIER-1-DIRECT https://github.com/doobidoo/mcp-memory-service v10.51.3 (Apache-2.0 1809★; pip-installed via Wave 80+) | Edit `.mcp.json`: `"memory": {"command": "Z:/venvs/claude/Scripts/mcp-memory-server.exe", "env": {"MCP_MEMORY_STORAGE_BACKEND": "sqlite_vec", "MCP_MEMORY_SQLITE_PATH": "Z:/claude-sota-installed-state/.mcp-memory/memory.db"}}` | `/mcp` lists `memory` connected; `mcp__memory__store_memory` smoke returns success; `mcp__memory__retrieve_memory` returns stored value |
| B2 | graphiti MCP wire (FalkorDB backend already UP @16379) | T2 | TIER-1-DIRECT https://github.com/getzep/graphiti @c427615 v0.29.0 (Apache-2.0 25.8k★) — main.py at `Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py` | Edit `.mcp.json`: `"graphiti": {"command": "Z:/venvs/claude/Scripts/python.exe", "args": ["Z:/claude-sota-installed/.local/graphiti/mcp_server/main.py"], "env": {"USE_FALKORDB": "true", "FALKORDB_HOST": "127.0.0.1", "FALKORDB_PORT": "16379", "OPENAI_API_KEY": "${OPENAI_API_KEY}"}}` | `/mcp` shows graphiti connected; smoke `add_episode` + `search_memory_nodes` returns success |
| B3 | Qdrant L2 wire (vector store stdio bridge) | T2 | TIER-1-DIRECT https://github.com/qdrant/qdrant-mcp-server @<release> (MIT Qdrant org-maintained) — qdrant Docker `qdrant/qdrant:v1.17.0` UP per provenance | Decide: stdio MCP via `qdrant-mcp-server` OR keep Qdrant as embedded backend for mcp-memory only. Probe sota-researcher for canonical Qdrant MCP first | `/mcp` lists qdrant; `tools/list` returns vector ops |
| B4 | Reconcile spawn-gate vs subagent_type runtime resolution | T1c | TIER-1-DIRECT Anthropic CC subagent precedence `https://code.claude.com/docs/en/sub-agents` ("Subagent install-path precedence: `.claude/agents/` > plugin marketplace > CC builtins") | Decision: (i) Mia probe each `.claude/agents/<name>.md` against plugin-shipped equivalent; if plugin-shipped equiv exists → `rm` local + smoke `Agent({subagent_type:"<name>"})` resolves to plugin; if no plugin equiv → keep cite-import-AMBER per Section 14.5 + fix `agent_spawn_gate.py` allowlist mismatch | `Agent({subagent_type:"architect"})` resolves successfully (currently fails) |
| B5 | Add UserPromptSubmit + PreCompact + PostCompact hooks | T1c | TIER-1-DIRECT Anthropic CC hooks `https://code.claude.com/docs/en/hooks` lines 1021-1023, 1238-1245, 436-440 | Edit `.claude/settings.json` `hooks.UserPromptSubmit[]`+`hooks.PreCompact[]`+`hooks.PostCompact[]` per existing wired-events pattern; cite-import-AMBER 3 sibling hook scripts (HNF-gated per Section 14.5) | New events fire on prompt submit + compact action; JSONL traces in `.claude/state/` |
| B6 | promptfoo install (eval CLI; first Section 15 row) | T5 | TIER-1-DIRECT https://github.com/promptfoo/promptfoo @v0.122.0 (MIT) | `npm install -g promptfoo@0.122.0` (pin per CR-9) | `promptfoo --version`; `promptfoo eval` smoke against minimal config |
| B7 | langfuse self-hosted (LLM observability) | T5 | TIER-1-DIRECT https://github.com/langfuse/langfuse v3 (MIT) | `docker pull langfuse/langfuse:3` + minimal compose | `curl http://localhost:3000/api/public/health` returns 200 |
| B8 | Plugin install: 1-2 high-leverage from `addy-agent-skills` (after sota-researcher HNF probe) | T4 | TIER-1-DIRECT https://github.com/addyosmani/agent-skills @742dca5 | `/plugin install <plugin>@addy-agent-skills` | `/plugin list` enabled + skill surfaced |

### CR compliance per ship (Option B)

- **CR-1** ✅ every row TIER-1-DIRECT
- **CR-3** ✅ Phase 1 bootstrap exception via codex foreground+tee
- **CR-5** ✅ all install-class
- **CR-6** ✅ official native channel; B1+B2 are config-edits not novel scripts
- **CR-8** ✅ install-class
- **CR-9** ✅ B6 promptfoo pinned to v0.122.0; B7 langfuse pinned to major v3; B4 pre-cite-import REVERT check on each `<agent>.md` deletion candidate; B1+B2 use already-pinned versions
- **CR-10** ✅ B3+B4+B5+B8 require sota-researcher HONEST-NON-FINDING probe before commit
- **CR-11** ✅ Pattern A apply per ship
- **CR-12** ✅ B1+B2+B3 PRIMARY upstream-install (wire only); B4 supersedes TERTIARY with PRIMARY plugin-shipped; B5 cite-import-AMBER (TERTIARY) but HNF-gated; B6+B7+B8 PRIMARY

### Trade-offs Option B (pros 4 / cons 3)

**Pros**:
- Closes HIGH-severity gaps FIRST (Memory L1+L3 dark + agent-runtime broken)
- ROI per fire: 100% of ships address operational-state mismatches (no speculative new installs)
- Each ship has lower upstream-discovery risk (mcp-memory + graphiti + qdrant all pre-installed; only `.mcp.json` config-edit)
- B4 reconciliation closes a CR-9 sibling-bleed defense gap (`subagent_type` runtime mismatch is exactly the failure class CR-9 warns against)

**Cons**:
- Lower install-density per fire than Option A (8 ships vs 10)
- Vertical Anthropic marketplaces (financial-services / healthcare / life-sciences) latent value remains untapped
- B5 hook expansion partially relies on cite-import-AMBER (TERTIARY) — 3 sibling hooks need HNF probe + path-rewrite

---

## CADP fleet-probe schedule (BOTH options)

Per `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §CADP rule 5`:

1. **Pre-Wave-105 dispatch**: `python Z:/claude/ccc/tools/status.py | head -40` — verify ≥3 accounts <50% session BEFORE 6th+ subagent dispatch this arc
2. **Codex pool**: zfan7@sva.edu Codex Pro at 2% used — full T1+T2+T3 lifecycle available; no probe needed unless surfaces 50%+
3. **Per-ship probe**: BEFORE every new sota-researcher / codex-rescue / gpt5-archaeologist dispatch — confirm ≥3 accounts <50%
4. **Per-call codex budget**: 90s default / 120s normal cap / 180s with reason per Wave 44 invariant #1 in `advanced-agent-team-standing-directive.md` (cite-import-AMBER per Section 14.5)
5. **CADP rule 2 max-3 concurrent**: stagger 4-5 agent waves; 6+ concurrent = STOP

## Risk register (BOTH options)

| Risk | Likelihood | Mitigation |
|---|---|---|
| Section 14.5 cite-import-AMBER drift | MED | Each cite-import row carries sibling commit-SHA + re-evaluation gate; HNF Evidence column populated per Wave 50 fire 11 Agent K Task 3 |
| Sibling-bleed (`Z:/claude-sota/` paths in cite-imports) | HIGH | Per CR-9: rewrite ALL paths to `Z:/claude-sota-installed/` + `Z:/claude-sota-installed-state/` BEFORE install; smoke-probe each rewrite |
| 2-round fix-forward per hook install (B5) | HIGH (per CR-9) | Budget 2nd Pattern A apply; first-round APPROVE is the exception |
| `@latest` D6 today-release-auto-upgrade | MED | All `@latest` replaced with version pin; A9/B6 promptfoo@0.122.0; A10/B7 langfuse:3 |
| FM-17 subagent fleet depletion under fan-out | MED | Per `fm17-subagent-fleet-depletion.md`: dispatch BRIDGE-MODE GPT-5.5 with explicit per-call budget (90-180s); fall back to orchestrator-side foreground+tee on .d watchdog |
| Agent-runtime spawn-gate mismatch (B4) | HIGH | sota-researcher MUST HNF-probe each agent BEFORE deletion; per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md` Mia pre-apply rule |
| FM-20 path-drift cascade (claim-propagation across fires) | MED | Mia probe at synthesis time per `fm20-path-drift-cascade.md`; verbatim probe outcome cite in synthesis |
| Plugin marketplace.json index drift | MED (Option A higher) | Probe `gh api repos/<owner>/<repo>/contents/marketplace.json` BEFORE every plugin install; pin marketplace HEAD |

## HNF estimate per ship target

| Option | Ship | HNF likelihood | Reason |
|---|---|---|---|
| A | A1' (anthropic-agent-skills plugin) | MED | Need probe of plugins/ subdir; may surface no relevant plugin |
| A | A2 (knowledge-work top plugin) | MED-HIGH | knowledge-work is policy/HR domain — may not match runtime |
| A | A3 (addy-agent-skills Top-3) | LOW | Wave 82m-B already convergence-verified TIER-A |
| A | A4 (claude-community top) | HIGH | Community marketplace breadth + low-quality risk |
| A,B | A7-A8 / B4 (agent native-install supersede) | LOW-MED | sota-researcher HNF-probe needed to confirm plugin-shipped equivalent exists |
| A,B | A9/B6 promptfoo / A10/B7 langfuse | LOW | Both upstream pinned releases verified existence |
| B | B3 Qdrant MCP wire | MED | Need probe of canonical Qdrant MCP server (multiple candidates exist) |
| B | B5 hook expansion | MED | 3 sibling hook scripts need rewrite — likely 1-2 will HNF on path-rewrite-incompatibility |

---

## RECOMMENDED-OPTION: B

**Rationale**: Option B addresses HIGH-severity operational gaps (Memory L1+L3 stack 100% dark despite 100% install + agent-runtime spawn-gate mismatch) BEFORE adding new install surface. Per CR-12 PRIMARY upstream-install lattice, "wire-up of already-installed primitives" is the highest-ROI install-class action available — zero new dependencies, zero discovery latency, immediate operational lift. Option A's plugin-marketplace expansion has lower per-fire ROI (4/10 ships are speculative HNF-gated probes of unknown marketplace indexes) and leaves the dark Memory stack unaddressed for another wave. CR-9 install-risk discipline strongly favors Option B (every B-ship has known-good upstream pin and pre-installed dependency; Option A introduces 4 new marketplace-class unknowns simultaneously). Option B's B4 agent-runtime reconciliation is also load-bearing for ALL future fan-out fires (sota-researcher dispatch is currently failing per the `Agent type 'architect' not found` regression) — fixing this BEFORE new ships compounds. Option A is a viable fallback if B4 sota-researcher HNF probe surfaces no plugin-shipped agent equivalents (cite-import-AMBER would then be permanent and Option A's plugin breadth becomes more attractive).
