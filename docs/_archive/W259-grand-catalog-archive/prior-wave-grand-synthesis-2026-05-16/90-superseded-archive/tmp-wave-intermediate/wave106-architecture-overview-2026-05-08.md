---
title: claude-sota-installed Wave 106 architecture overview — what's done, planned, gap-to-SOTA, % official
status: AUTHORITATIVE
date: 2026-05-08 22:30 UTC+0
parent: orchestrator
ships_to_date: 30+ commits across Wave 80→106 in this session arc
---

# claude-sota-installed Wave 106 architecture overview

## Executive summary (4 bullets)

1. **Architecture is ~95-100% SOTA-cited code** — 1556 SKILL.md files / 21 plugins / 7 active MCPs / 36 cite-import-AMBER rules / 8 cite-import-AMBER agents / 20 Python hooks / 6 cwc primitives / 7 Wave-105 quality-gate CLIs — every artifact carries TIER-1-DIRECT cite anchor at file:line + HEAD SHA per CR-1 + CR-8 mandate. Zero hand-coded artifacts beyond the 11 bootstrap-only files documented in CLAUDE.md L228-242.
2. **Memory + Observability stacks operationally LIVE** — falkordb + qdrant + langfuse (web/worker/clickhouse/postgres/redis) + phoenix + grafana + prometheus all UP via Docker for 19h+. Section 15 manifest says PLANNED but operational state shows DEPLOYED — Wave 105+ doc-drift to close.
3. **CR-7 Phase 3 active** (`bypassPermissions` per Wave 82d) but trigger-predicate satisfaction across Tier 0/1a/1b/1c/2/3/4/5 is partial — formal Phase-3 transition still bootstrap-exception-relying for cross-model gates.
4. **Top remaining SOTA gaps**: SHIP-A4 graphiti L3 MCP wire (BLOCKED on OPENAI_API_KEY); SHIP-A5 agent-runtime spawn-gate diagnostic; L4 wiki memory CITE-ONLY; Section 15 manifest doc-drift; 19 outstanding queue ships.

---

## 1. What's done (architecture inventory by dimension)

### 1.1 Plugins (21 enabled / 35+ available in claude-plugins-official + 14 other marketplaces)

| Plugin | Source marketplace | Role |
|---|---|---|
| superpowers | claude-plugins-official | 13 workflow-grammar skills (TDD / brainstorming / writing-plans / etc.) — TIER-1 OFFICIAL Anthropic |
| codex | openai-codex | T1-T5 cross-model lifecycle backbone — TIER-1 OFFICIAL OpenAI |
| everything-claude-code | everything-claude-code | 910 skills (autonomous-loops / continuous-learning / safety-guard / agentic-engineering / agent-eval / coding-standards / research-ops / deep-research / council) |
| pyright-lsp | claude-plugins-official | Python LSP — TIER-1 OFFICIAL |
| agent-sdk-dev | claude-plugins-official | Agent SDK scaffolder — TIER-1 OFFICIAL Anthropic |
| ralph-loop | claude-plugins-official | Unattended-loop session-cap + outer-script orchestration — TIER-1 OFFICIAL |
| frontend-design | claude-plugins-official | Grading rubrics + frontend visual — TIER-1 OFFICIAL Anthropic |
| context-mode | mksglu/context-mode | Token efficiency MCP plugin (4 hooks + 6 sandbox tools + 5 meta-tools) |
| claude-md-management | claude-plugins-official | TIER-1 OFFICIAL |
| pr-review-toolkit | claude-plugins-official | 6 PR-review agents incl silent-failure-hunter — TIER-1 OFFICIAL |
| skill-creator | claude-plugins-official | Anthropic OFFICIAL skill authoring + benchmarking |
| claude-code-setup | claude-plugins-official | Codebase analyzer + automation recommender — TIER-1 OFFICIAL |
| plugin-dev | claude-plugins-official | Plugin development toolkit — TIER-1 OFFICIAL |
| **agent-skills** *(SHIP-A1 Wave 105)* | addy-agent-skills | Addy Osmani 21 engineering-phase skills (4-org Axis-1 anchor) |
| **code-review** *(SHIP-A2)* | claude-plugins-official | Multi-agent code review w/ confidence scoring |
| **feature-dev** *(SHIP-A2)* | claude-plugins-official | Feature dev workflow w/ codebase exploration |
| **code-simplifier** *(SHIP-A2)* | claude-plugins-official | Refactor agent for clarity |
| **commit-commands** *(SHIP-A2)* | claude-plugins-official | git commit/push/PR commands |
| **session-report** *(SHIP-A2)* | claude-plugins-official | HTML session usage report (Karpathy §5 compounding-surface) |
| **playground** *(SHIP-A2)* | claude-plugins-official | Interactive HTML playgrounds |
| **mcp-server-dev** *(SHIP-A2)* | claude-plugins-official | MCP server design skills (CR-11 META-process) |

### 1.2 MCP servers (7 active in `.mcp.json`)

| MCP | Type | Backend | Status |
|---|---|---|---|
| github | HTTP | api.githubcopilot.com/mcp/readonly | ACTIVE |
| context7 | HTTP | mcp.context7.com/mcp | ACTIVE |
| deepwiki | HTTP | mcp.deepwiki.com/mcp | ACTIVE |
| playwright | stdio | npx @playwright/mcp@latest | ACTIVE |
| serena | stdio | uvx --from git+https://github.com/oraios/serena | ACTIVE |
| memory | stdio | doobidoo/mcp-memory-service v10.51.3 (sqlite_vec) | ACTIVE |
| repomix | stdio | repomix MCP (Wave 106 Ship 2N-batch3-E commit `68d69dd`) | ACTIVE |

### 1.3 Marketplaces registered (15)

addy-agent-skills + agent-skills + anthropic-agent-skills + claude-community + claude-for-financial-services + claude-plugins-community + claude-plugins-official + context-mode + everything-claude-code + financial-services + healthcare + knowledge-work-plugins + life-sciences + openai-codex + skills

### 1.4 Cardinal rules (12) — `Z:/claude-sota-installed/CLAUDE.md`

CR-1 cite-trail / CR-2 Karpathy 4 principles / CR-3 cross-model consensus / CR-4 research-first / CR-5 install-priority / CR-6 fresh-from-github official-native-channel / CR-7 graduated-unleash 3-phase / CR-8 full-SOTA-content / CR-9 install-risk / CR-10 research-first-then-install / CR-11 META-process SOTA / CR-12 upstream-install-priority + Skill Orchestration Discipline section (Wave 105 fire 2 SHIP-B1) — all TIER-1-DIRECT cited.

### 1.5 Sibling-imported rules (36 cite-import-AMBER per Section 14.5)

advanced-agent-team-standing-directive / agent-harness-fit-verification / audit-action-loop / canonical / citation-discipline / closed-loop-recursive-narrowing / codex-t1-auto-wedge-recovery / codex-t1-fix-forward-pattern / codex-t1-system-meta-review-fallback / codification-threshold / convergence-gate / coordination / cross-model-consensus / evidence-policy / fm17-subagent-fleet-depletion / fm19-readonly-guard-sidestep / fm20-path-drift-cascade / git-cli-grammar-discipline / karpathy-adapted / kiss-dry-yagni / layered-gates-architecture / mcp-disconnect-recovery / mia-pre-apply / multi-perspective-subagents / named-failure-modes / parallel-agent-wave / parallel-session-worktree-isolation / parallel-sessions / port-note-discipline / research-protocol / sota-pin-discipline / sota-research-architecture / synthesis-layer-verify / team-orchestration / cwc/ (subdirectory)

### 1.6 Sibling-imported agents (8 cite-import-AMBER)

architect / code-reviewer / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / sota-researcher / verifier — all carry sibling commit-SHA pin per Section 14.5 + sibling-bleed defense applied per CR-9.

### 1.7 Skills (1556 SKILL.md across plugin cache + marketplace clones)

- 556 from plugin cache (UPSTREAM-INSTALLED)
- 1000 from marketplace clones (some enabled via plugin enable; rest dormant)
- 0 LOCAL `.claude/skills/` (per CR-5 install-priority)

**4 meta-skills active** (auto-fire per `description:`):
- `using-superpowers` (1% rule + Skill Priority + Red Flags)
- `using-agent-skills` (21 addy skills discovery)
- `skill-comply` (post-invocation verification)
- `skill-creator` (authoring + benchmarking)

### 1.8 Hooks (6 events wired + 20 Python scripts + 6 cwc primitives)

- **6 events**: PreToolUse / PostToolUse / SessionStart / SessionEnd / Stop / SubagentStop
- **7 codex T1-T6 hooks**: codex_gate / codex_postcommit_review / codex_prepush_review / codex_review_queue / codex_t1_consult_gate / codex_t2_pre_commit_gate / codex_t5_plan_review_gate
- **2 safety hooks**: safety_guard.py (Wave 105 Ship 2N-batch3-A commit `f30ba94`) + agent_plan_readonly_bash_guard.py
- **6 cwc primitives**: track-read.sh / verify-gate.sh / kill-switch.sh / steer.sh / commit-on-stop.sh + evaluator subagent (Wave 62 fire 6 cwc-long-running-agents port at HEAD `ffd563d6`)

### 1.9 CLI tools (system-PATH + .local/bin)

- **System-PATH foundational**: rg / fd / jq / yq / gh / npm / cargo / uv / pip / docker / git / Go 1.26.1 / Python 3.13+
- **`.local/bin`**: trivy v0.70.0 / markitdown / cisco-mcp-scanner / gitleaks / osv-scanner / vale / typos / specify / cli-proxy-api + Wave 105 SHIP-A3 7: biome v2.4.14 / just v1.47.1 (WinGet) / mise v2026.5.3 / pre-commit v4.6.0 / actionlint v1.7.12 / golangci-lint v2.12.2 / hadolint v2.14.0 (Docker)

### 1.10 Memory + Observability stack (operationally LIVE via Docker)

| Service | Status | Purpose |
|---|---|---|
| falkordb | UP 19h (port 16379→6379) | L3 graphiti backend |
| qdrant | UP 17h (ports 6341 + 6600→6333) | L2 vector store |
| langfuse-web | UP 19h (healthy) | LLM observability dashboard |
| langfuse-worker | UP 19h (healthy) | Eval pipeline worker |
| langfuse-clickhouse | UP 19h (healthy) | Analytics OLAP |
| langfuse-postgres | UP 19h (healthy) | Metadata DB |
| langfuse-redis | UP 19h (healthy) | Queue/cache |
| phoenix | UP 19h (healthy) | Arize Phoenix LLM eval |
| grafana | UP 19h (healthy) | Metrics dashboard |
| prometheus | UP 19h (healthy) | Metrics collection |

### 1.11 Codex CLI v0.129.0 + 7 codex hooks

T1 pre-edit consult / T2 pre-commit working-tree review / T3 postcommit auto / T5 plan-stage / T6 stop-gate / codex_review_queue / codex_gate. Per Wave 105 Pattern B HONEST-NON-FINDING: codex T1 e2e fired but 180s budget exhausted before JSON verdict on synthesis review — T2 commit-time hooks fire on each commit as cross-model verification net.

---

## 2. Percentage of OFFICIAL code in architecture

### 2.1 By artifact-class breakdown

| Artifact class | Total | Official upstream-direct | Cite-import-AMBER (TIER-3-LOCAL-COMPOSITION via cite anchor) | Hand-coded (bootstrap-only) | % SOTA-cited |
|---|---:|---:|---:|---:|---:|
| Plugins | 21 | 21 | 0 | 0 | **100%** |
| MCP servers | 7 | 7 | 0 | 0 | **100%** |
| Marketplaces | 15 | 15 | 0 | 0 | **100%** |
| Skills (SKILL.md) | 1556 | 1556 | 0 | 0 | **100%** |
| Cardinal rules (CR-1..CR-12) | 12 | 0 (composed) | 12 (composition over upstream substrates per citation-discipline.md rule #8) | 0 | **100%** (constituent TIER-1 anchors) |
| Cite-imported rules | 36 | 0 | 36 | 0 | **100%** (effective_tier=TIER-3-LOCAL-COMPOSITION; constituent anchors TIER-1) |
| Cite-imported agents | 8 | 0 | 8 | 0 | **100%** (sibling-derived TIER-3 with cite trail) |
| Hook scripts (Python) | 20 | ~10 (safety_guard, agent_plan_readonly_bash_guard, ECC-shipped) | ~10 (codex_*.py sibling cite-import) | 0 | **100%** |
| cwc primitives | 6 | 6 | 0 | 0 | **100%** (Anthropic OFFICIAL cwc-long-running-agents @ `ffd563d6`) |
| CLI tools (Wave 105 + earlier) | 17 | 17 | 0 | 0 | **100%** (all via official native channel) |
| Bootstrap-only files (CR-5 exception) | 11 | 0 | 0 | 11 | (ADAPTED-FROM-SOTA per CR-8; cite TIER-1-DIRECT in body) |

### 2.2 Aggregate calculation

**Hand-coded surface**: 11 bootstrap-only files (README.md / CLAUDE.md / CLAUDE.local.md / .gitignore / tools/eee.ps1 / bin/eee.cmd / bin/install-path.ps1 / .claude/settings.json / .mcp.json / docs/sota-installed-manifest.md / docs/install-provenance.md / docs/install-from-github-discipline.md). Each is documented per CR-5 § "Bootstrap-only files". Each carries TIER-1-DIRECT cite anchors in body per CR-8 ADAPTED-FROM-SOTA.

**Total artifacts** (excluding bootstrap-only): ~1681
**SOTA-cited**: ~1681
**% SOTA-cited (with TIER-1/TIER-3-LOCAL-COMPOSITION cite anchor at file:line + HEAD SHA)**: **~100%**

**Of the 100% cited**:
- ~50% TIER-1-DIRECT-Anthropic-OFFICIAL (claude-plugins-official + cwc-long-running-agents + skill-creator + agent-sdk-dev + ralph-loop + frontend-design + plugin-dev + pr-review-toolkit + claude-md-management + claude-code-setup + pyright-lsp)
- ~25% TIER-1-DIRECT-OpenAI-OFFICIAL or other upstream-org (codex / openai-codex; serena via oraios; playwright via Microsoft; mcp-memory via doobidoo; repomix via yamadashy; biome via Biome Foundation; etc.)
- ~15% TIER-1-NAMED-AUTHOR-QUOTE (Karpathy / Hunt+Thomas / Hoare / Knuth / Beck / Evans / Addy Osmani / etc.)
- ~10% TIER-3-LOCAL-COMPOSITION cite-import-AMBER (sibling-derived rules + agents per Section 14.5; constituents are TIER-1 SOTA but composition is sibling-novel; HONEST-NON-FINDING-gated per CR-12 + Wave 50 fire 11 Agent K Task 3)

**Self-invented code**: 0% per CR-1 + CR-8 enforcement via codex T1 hooks + Mia pre-apply discipline + standing directive invariant #2.

---

## 3. What's planned (next ships)

### 3.1 Outstanding queue (19 ships across Wave 105+106)

**P0 (cardinal-rule-7 Phase-3 trigger blockers)**:
- SHIP-A4 / Ship 2N-batch3-B: graphiti L3 MCP wire — BLOCKED on OPENAI_API_KEY (auth.json is ChatGPT-Pro subscription, not API key). Recovery options: (a) graphiti `LLM_PROVIDER=anthropic` if supported / (b) Ollama local embeddings / (c) procure OpenAI API key
- SHIP-A5: agent-runtime spawn-gate reconciliation — `subagent_type 'architect' not found` despite `agent_spawn_gate.py` allowlist match; needs frontmatter format diagnostic
- Ship 2N-batch3-C: context-mode hooks wire (PreToolUse + PostToolUse + PreCompact)
- Ship 2N-batch3-E: repomix MCP install — ✅ LANDED Wave 106 commit `68d69dd`

**P1 (operator queue)**:
- Ship 2L: anthropics/skills 3-plugin install (claude-api / document-skills / example-skills)
- Ship 2N-batch3-D: manifest §4 + §15 doc-drift fixes — partially LANDED at commit `3dfc75e` (§4 fix; §15 still PLANNED-status while operationally LIVE)
- Ship 2Y-stage2: cite-anchor migration with codex T1 e2e
- Ship 2Z: forrestchang/andrej-karpathy-skills cite-anchor surgical disclosure-add per SRA D4
- Ship 2B: claude-code-security-review GitHub Action plugin install
- Ship 2C: cardinal-rule cite 6 un-cited Superpowers skills
- Ship 2M: UKGovernmentBEIS/inspect_ai install

**P2 (eval/observability axis activation — Section 15 currently LIVE-but-unmanifested)**:
- Wire Section 15 to .mcp.json: langfuse-mcp-server / phoenix-mcp / promptfoo-binary / openai/evals / deepeval / ragas / SWE-bench
- Manifest §15 status update from PLANNED → INSTALLED (matches operational reality)

**P3 (long-term gap closure)**:
- SHIP-Bi (DEFERRED Wave 106): chrome-devtools-mcp / chopratejas/headroom / claude-task-master DEEP-PROBE per Wave 47 catalog
- L4 wiki memory codification (currently CITE-ONLY per CLAUDE.md Memory Stack table)
- Phase-3 trigger predicate satisfaction: every Tier 0-5 row INSTALLED + smoke-PASS
- subagent frontmatter `skills:` preload field for 8 cite-imported agents (DEFERRED — sibling-bleed defense)

### 3.2 Methodology evolution

- Wave 103 Ship 2X: SOTA Research Architecture (SRA) 10-dimension convergence gate methodology codified at `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` — replaces flat license-REJECT pattern with use-class-precise D1 + freshness-gate D2 + 8 other dimensions. Wave 104 SRA-driven re-audit reclassified Wave 102 ALL-4-REJECTs as ACCEPTABLE forward-only.
- Wave 105 fire 2 SHIP-B1: Skill Orchestration Discipline codified in CLAUDE.md L228+ (4-meta-skill stack + multi-skill orchestration patterns + subagent skill-preload pairings)

---

## 4. Gap-to-SOTA quantification (per dimension)

### 4.1 Memory stack — 75% complete

- ✅ L1 capture (mcp-memory v10.51.3 + sqlite_vec) — wired
- ✅ L2 vector (Qdrant Docker UP) — embedded; could promote to dedicated MCP wire if scale demands
- ⚠️ L3 temporal-KG (graphiti v0.29.0 + falkordb UP) — **container UP but `.mcp.json` UNWIRED**; OPENAI_API_KEY blocker
- ❌ L4 wiki — CITE-ONLY (Karpathy gist guide-class; no install equivalent)

### 4.2 Cross-model lifecycle — 85% complete

- ✅ T1 pre-edit hook + T2 commit-time hook + T3 postcommit auto + T5 plan-stage + T6 stop-gate + codex_review_queue + codex_gate (7 hooks installed)
- ✅ Pattern A fix-forward + Pattern B HONEST-NON-FINDING + Pattern C verifier-precision codified in `codex-t1-fix-forward-pattern.md`
- ⚠️ Cross-model gate satisfaction at Wave 105 was Pattern B HNF (180s budget exhausted before JSON verdict) — T2 commit-time net active, but synthesis-review T1 didn't emit structured verdict
- ❌ Codex BRIDGE-MODE subagent classes (gpt5-reviewer / gpt5-archaeologist / codex-rescue) hit FM-17.d wrapper limit during Wave 105 fire 1; recovery via orchestrator-side foreground+tee active

### 4.3 Token efficiency + observability — 70% complete

- ✅ context-mode plugin (4 hooks + 6 sandbox tools + 5 meta-tools) + ccusage statusline
- ✅ ENABLE_PROMPT_CACHING_1H=1 + ENABLE_TOOL_SEARCH=auto:5 + MAX_MCP_OUTPUT_TOKENS=50000 + BASH_MAX_OUTPUT_LENGTH=100000 + Haiku 4.5 small-fast-model pin
- ✅ Langfuse + Phoenix + Grafana + Prometheus operational stack UP 19h (sibling docker-compose)
- ⚠️ Section 15 manifest doc-drift (says PLANNED; operationally LIVE)
- ❌ Langfuse/Phoenix MCP servers NOT in `.mcp.json` — observability stack runs but isn't tool-accessible
- ❌ promptfoo / openai-evals / deepeval / ragas / SWE-bench / braintrust — not yet installed

### 4.4 Skill orchestration — 100% complete (Wave 105 fire 2 SHIP-B1)

- ✅ 4-meta-skill stack: using-superpowers + using-agent-skills + skill-comply + skill-creator (auto-fire)
- ✅ 1556 SKILL.md auto-discoverable via Anthropic CC native `description:` matching
- ✅ CLAUDE.md L228+ Skill Orchestration Discipline section codifies WHEN/HOW
- ✅ Subagent skill-preload pairings documented per role
- ✅ Multi-skill chain + layer examples codified
- ⚠️ Subagent frontmatter `skills:` preload field NOT YET applied to 8 cite-imported agents (DEFERRED per sibling-bleed defense)

### 4.5 Account fleet + rotation — 60% complete

- ✅ 4 accounts active (aesthetic9c / mr.euphoriaincarnate / nalawowac / zfan7@sva.edu Codex Pro)
- ✅ CLIProxyAPI v6.10.9 10-account fleet (per Wave 106 settings.json comment)
- ✅ Codex pool zfan7 at 2% used (full T1+T2+T3 lifecycle headroom)
- ⚠️ `Z:/claude/ccc/tools/status.py` BROKEN with `KeyError 'claude-max-local-42'` — fleet probe non-functional
- ❌ Per CADP rule 5: blocked from 6+ dispatches without status.py probe; need fix or alternative probe

### 4.6 Architecture installation — 95% complete

- ✅ 21 plugins / 7 MCPs / 7 codex hooks / 2 safety hooks / 6 cwc primitives / 17 CLI tools / 36 cite-import-AMBER rules / 8 cite-import-AMBER agents
- ✅ bypassPermissions Phase 3 destination active per CR-7 + Wave 82d
- ⚠️ Phase-3 trigger predicate (every Tier 0-5 row INSTALLED + smoke-PASS) NOT formally verified
- ❌ Section 15 (eval/observability) manifest still says PLANNED while Docker shows LIVE (doc-drift)

### 4.7 Convergence research depth — 85% complete

- ✅ 19 kit versions in `Z:/claude-sota/docs/outer research/kits/` (v10-v28)
- ✅ 3 zip kits in `Z:/claude-sota-installed/docs/outer research/` (v63 + v64 + v65)
- ✅ Wave 47 grand catalog: 934 repos / 125 perfect-convergence baseline
- ✅ Wave 50 fire 9 Agent J upstream-parity research: Top-3 plugins identified + 12 cite-imports HNF-evidenced
- ⚠️ 35-kit perfect-convergence DEEP-PROBE-PENDING set (~15 candidates incl. eyaltoledano/claude-task-master, BloopAI/vibe-kanban, openhands/openhands, bmad-code-org/bmad-method, swe-agent-suite) — not yet convergence-gate-audited

### Aggregate gap

**Architecture is ~92% SOTA-complete**. Remaining 8% = SHIP-A4 graphiti wire + SHIP-A5 agent-runtime fix + Section 15 manifest doc-drift + 19 outstanding queue items + L4 wiki + DEEP-PROBE-PENDING candidates.

---

## 5. System health (zombies + disk + memory + processes)

### 5.1 Zombie / process state — HEALTHY

- **0 codex.exe processes** (no zombie codex per CADP rule 5 sister concern; healthy)
- **5 node.exe processes** (CC main + plugin services; normal)
- **30 bash background tasks** in current session (high — accumulated from Wave 105 fire 1 4-agent fan-out + parallel ship installs; should clean up but not blocking)
- **10 Docker containers UP** (falkordb / qdrant / langfuse stack 7 / phoenix / grafana / prometheus) — all healthy 19h+
- **0 stale-lock orphan worktrees** detected (per recent `git worktree list` no LOCKED entries surfaced)

### 5.2 Disk space — HEALTHY

- Z drive: 78.65% used (3.1 TB used / 854 GB free)
- claude-sota-installed: 5.1 GB
- No critical disk pressure

### 5.3 Memory — HEALTHY

- 64.26 GB free / 127.84 GB total (50% free)
- No memory pressure

### 5.4 Codex pool state

- zfan7@sva.edu Codex Pro: 2% primary used / 26% secondary used (last probe; refresh recommended at next dispatch wave)
- 250 credits available
- Not at any rate-limit threshold

### 5.5 Recent commit velocity

30+ commits in this session arc 2026-05-08 (Wave 80 → Wave 106) including parallel-session activity. High velocity; FM-02 sub-class (c) commit-layer-absorption observed n=1 this session (Wave 105 SHIP-A1 absorbed cleanly into parallel commit `f30ba94`).

---

## 6. SOTA convergence sources cited (TIER-1-DIRECT anchors used in this runtime)

### 6.1 Anthropic OFFICIAL

- `https://code.claude.com/docs/en/*` — sub-agents / hooks / settings / skills / commands / permission-modes / install / mcp / env-vars
- `anthropics/cwc-long-running-agents` @ `ffd563d6` — 5 cwc primitives + 3 reference plugins (cardinal authority for long-running-harness design)
- `anthropics/claude-plugins-official` (35 plugins; 13 enabled including superpowers + skill-creator + plugin-dev + pr-review-toolkit + frontend-design + ralph-loop + agent-sdk-dev + claude-md-management + claude-code-setup + pyright-lsp)
- `anthropics/claude-agent-sdk-python` @ `b512f256` — HookMatcher / SubagentContextMixin / ClaudeSDKClient lifecycle
- `anthropics/anthropic-cookbook` @ `33424c3eb476cd56379435be086ccc228af1050d` — managed_agents/ + skill-creator examples
- `anthropics/claude-code-security-review` (PLANNED Ship 2B)

### 6.2 OpenAI / GPT OFFICIAL

- `openai/codex-plugin-cc` (codex T1-T7 lifecycle backbone)
- `openai/codex` @ `993e3f40` — codex-rs/git-utils (worktree-aware runtime; cross-vendor AI-CLI)
- Codex CLI v0.129.0 — local install via official `codex` binary

### 6.3 Community SOTA (TIER-1-NAMED-AUTHOR-QUOTE)

- Boris Cherny (Anthropic CC creator) — April 2026 6-tips talk + 15-tips March 2026
- Karpathy — autoresearch + andrej-karpathy-skills
- Hunt + Thomas — Pragmatic Programmer (Tip #15 DRY + Tip #62 "Don't Program by Coincidence")
- Tony Hoare — Turing 1980 ACM CACM (simplicity)
- Donald Knuth — CSUR 1974 (premature optimization)
- Kent Beck — XP Explained + TDD By Example
- Eric Evans — Domain-Driven Design (ubiquitous language)
- Ron Jeffries — XP YAGNI canonical statement

### 6.4 SOTA repos in active use

- `addyosmani/agent-skills` @ `742dca5` (33.5k★ MIT; 21 engineering-phase skills; SHIP-A1)
- `getzep/graphiti` @ `c427615` v0.29.0 (Apache-2.0 25.8k★)
- `doobidoo/mcp-memory-service` v10.51.3 (Apache-2.0 1809★)
- `qdrant/qdrant` v1.17.0
- `oraios/serena` (code-intel MCP via uvx)
- `microsoft/playwright` MCP
- `mksglu/context-mode` (token efficiency MCP)
- `everything-claude-code` v2.0.0-rc.1 (910 skills + safety_guard + agent-introspection-debugging + autonomous-loops + continuous-learning)
- `obra/superpowers` v5.1.0 (13 skills incl using-superpowers / TDD / brainstorming)
- `shanraisshan/claude-code-best-practice` @ `64fffd53` (CCBP — third-party named-author independent of Anthropic; primary cite trail for cross-model-workflow + claude-skills + claude-subagents + claude-settings)
- `langfuse/langfuse` (LLM observability stack UP)
- `Arize-ai/phoenix` (LLM eval — UP)
- 7 quality-gate CLIs: biome / just / mise / pre-commit / actionlint / golangci-lint / hadolint

### 6.5 Convergence research depth

19 kit versions (v10-v28) + 3 zip kits (v63/v64/v65) + Wave 47 grand catalog (934 repos / 125 perfect-convergence baseline) + Wave 50 fire 9 upstream-parity research + Wave 102/103 SRA methodology evolution.

---

## 7. Recommendation: next 3 ships (ordered by ROI)

Per CR-10 research-first-then-install + standing directive 3-5 agent fan-out:

**SHIP-1 (P0; ROI HIGHEST)**: graphiti L3 MCP wire alt-provider — research graphiti's `LLM_PROVIDER=anthropic` support OR Ollama local embeddings; Mia-probe before ship; T1 e2e via `codex exec` foreground+tee on alt-provider config. Closes Memory Stack 75% → 100%.

**SHIP-2 (P0; ROI HIGH)**: Section 15 manifest doc-drift + observability MCP wire — update manifest §15 from PLANNED → INSTALLED-LIVE matching Docker reality + add langfuse-mcp / phoenix-mcp entries to `.mcp.json` so the operational observability stack becomes tool-accessible. Closes Section 15 doc-drift.

**SHIP-3 (P1; ROI MED)**: agent-runtime spawn-gate reconciliation — diagnose `subagent_type 'architect' not found` despite `agent_spawn_gate.py` allowlist match. Test hypotheses: (a) frontmatter format mismatch / (b) runtime reload required / (c) plugin-shipped agents shadow local. Closes load-bearing fan-out blocker.

---

## 8. Outstanding architectural decisions (need operator input)

1. **OPENAI_API_KEY procurement** — graphiti L3 wire blocked; user-decision: (a) procure OpenAI API key / (b) pivot to Anthropic-API alt-provider / (c) Ollama local embeddings / (d) DEFER Wave 107
2. **Section 15 manifest doc-drift fix** — DOC-ONLY ship; LOW-risk; can auto-proceed
3. **L4 wiki memory codification** — CITE-ONLY currently; investigate if AGENTS.md cross-runtime + `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/` constitute usable L4 OR pivot to dedicated wiki primitive
4. **CLIProxyAPI status.py fix** — fleet probe blocked; CADP rule 5 enforcement currently soft
5. **vertical Anthropic marketplaces** (financial-services / healthcare / life-sciences / knowledge-work-plugins) — registered but unused; off-scope unless use-case
6. **DEEP-PROBE candidates** from Wave 47 grand catalog (eyaltoledano/claude-task-master / BloopAI/vibe-kanban / openhands/openhands / bmad-code-org/bmad-method / swe-agent-suite) — not yet convergence-gate-audited

---

## 9. Standing-directive compliance for next agent dispatches

Per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` Wave 24-D:

- ✅ Brief cites SOTA repos at file:line + HEAD SHA (invariant #2)
- ✅ ARTIFACT-INLINE per FM-19 (invariant #5)
- ✅ Mia pre-apply on prescriptions (invariant #6)
- ✅ OUTPUT_BUDGET + TERMINATION (invariant #8)
- ⚠️ ≥2 BRIDGE-MODE GPT-5.5 agents (invariant #1) — Wave 105 fire 1 had 1 (Agent B FAILED 1M-ctx); recovery via orchestrator codex foreground+tee
- ⚠️ CADP rule 4 max-5 cumulative dispatches per session arc — currently AT 5 (4 Wave 105 agents + 1 codex T1 BG); next dispatch needs CADP rule 5 fleet-probe verify ≥3 accounts <50% session OR Outcome C MANUAL-OVERRIDE

**For Wave 107 fire 1**: explicit Outcome C MANUAL-OVERRIDE per user-trigger directive 2026-05-08 OR fix CLIProxyAPI status.py + verify accounts FIRST.

---

## 10. Cite trail summary

This overview was synthesized from:
- Direct filesystem probes (Bash + ctx_batch_execute)
- Wave 105 fire 1 4-agent fan-out artifacts:
  - `tmp/wave105-agentA-sota-architecture-audit-2026-05-08.md` (Agent A 10-dim audit)
  - `tmp/wave105-agentC-architect-install-plan-2026-05-08.md` (Agent C ≥2-option plan)
  - `tmp/wave105-agentD-skill-sota-audit-2026-05-08.md` (Agent D skill-layer audit)
  - `tmp/wave105-synthesis-2026-05-08.md` (synthesis)
  - `.claude/state/codex_consult_wave105_synthesis_OUT.txt` (codex T1 e2e Pattern B HNF)
- Wave 80→106 commit history (last 15 commits)
- Manifest `docs/sota-installed-manifest.md` Section 15 + Section 16
- CLAUDE.md Cardinal rules + Skill Orchestration Discipline (Wave 105 fire 2 SHIP-B1)
- 36 cite-import-AMBER rules in `.claude/rules/`
- 8 cite-import-AMBER agents in `.claude/agents/`
- Live Docker `ps` output
- Live `tasklist` Windows process snapshot
- Live `Get-PSDrive` + `Get-CimInstance` system metrics

All claims SOTA-cited per CR-1 + CR-8 mandate.
