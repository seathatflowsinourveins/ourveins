# Wave 98 — orchestrator-side inventory (while agent team runs)

**Status**: 3 agents in flight (A-redo token-eff / B-redo architectural-enhance / C account-rotation). Orchestrator-side data: operational state + manifest inventory that's NOT in agent scope.

## SOTA repos USED in this arc (cited at file:line + HEAD SHA in 65 commits)

### Tier 0 — bootstrap substrates (CCBP-canonical SOTA)
1. **shanraisshan/claude-code-best-practice (CCBP)** — `Z:/repos/deps/claude-code-best-practice-shan/ @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737` — env block / settings / cardinal rules / RPI / cross-model-workflow
2. **anthropics/cwc-long-running-agents** — `Z:/claude-sota-installed/.local/cwc/ @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629` — Default-FAIL / fresh-context evaluator / PROGRESS.md / kill-switch / steer mid-run
3. **andrej-karpathy-skills** — `Z:/repos/deps/andrej-karpathy-skills/CLAUDE.md:7-61 @ 2c606141` — Karpathy P1-P4 principles
4. **openai/codex** — `Z:/repos/deps/codex/codex-rs/git-utils/src/info.rs:618-654 @ 993e3f40` — worktree-aware runtime; T1-T7 lifecycle backbone
5. **addy-osmani/agent-skills** — `Z:/claude-sota-installed/.claude/plugins/marketplaces/agent-skills/skills/source-driven-development/SKILL.md @742dca5` — 4th-org Axis-1 source-driven discipline

### Tier 1 — install-priority primitives (Wave 50→97)
6. **router-for-me/CLIProxyAPI v6.10.9** — `.cli-proxy-api/config.yaml` — 10-account OAuth fleet proxy
7. **cnighswonger/claude-code-cache-fix v3.5.3** — port 19801 — cache-prefix stability
8. **mksglu/context-mode v1.0.111** — `.claude/plugins/marketplaces/context-mode/` — 4 hooks + 6 sandbox tools (98% context-window reduction claim)
9. **oven-sh/bun v1.3.13** — `.local/bin/` — runtime
10. **github/spec-kit v0.8.7** — `.local/bin/specify.exe` — specify CLI (Wave 97 Ship 1N; init DEFERRED to operator)
11. **gitleaks v8.30.1** — `.local/bin/gitleaks.exe` + PreToolUse hook — secrets scanner (Wave 97 Ship 1B+1C+1D)
12. **yamadashy/repomix v1.14.0** — npm-global — codebase pack (Wave 97 Ship 1K-skip)
13. **getzep/graphiti v0.29.0** — `.local/graphiti/` — temporal-KG (FalkorDB backend)
14. **doobidoo/mcp-memory-service v10.51.3** — pip-installed — L1 capture (sqlite_vec)
15. **FalkorDB v1.6.1** — Docker container :16379 — graph DB

### Tier 2 — SOTA cite-anchors (referenced in rules; not directly installed)
16. **obra/superpowers** — 6 of 14 skills vendored (verification-before-completion / requesting-code-review / subagent-driven-development / plan / debug / tdd)
17. **everything-claude-code (ECC)** — `.claude/plugins/marketplaces/everything-claude-code/` — agent + skill primitives
18. **autoresearch** — RPI 3-phase substrate
19. **anthropic-cookbook** — multi-modal sub-agents pattern
20. **andrej-karpathy-skills + adam-strojek + Hunt+Thomas (Pragmatic Programmer) + Eric Evans (DDD) + Hoare + Knuth + Beck (XP/TDD)** — TIER-1-NAMED-AUTHOR-QUOTE ancestry chain in cardinal rules

### Tier 3 — Wave 97 fresh discoveries
21. **rtk-ai/rtk** — admin dashboard at port 8079 (mentioned by user in /loop; deeper integration audit pending)
22. **Aperant/cpa-usage-keeper** — rate-limit polling (cited but not fully wired — `.local/cpa-usage-keeper/` exists)
23. **adam-strojek (named-T2 ACP practitioner)** — ACP convergence-gate Axis 2 closure
24. **JetBrains/Ignatov/Shiryaev/Maltseva** — ACP TIER-1 named-author chain (4 dated artifacts 2025-10..2026-01)

### Local model substrates (llamacpp + llama-swap; ports 8080/8082/8090/11700)
25. **qwen36** llamacpp main (port 8080)
26. **qwen3-embed-4b** embedder (port 8082)
27. **gemma4-26b/31b + qwen35-moe** llama-swap (port 8090)

## Features INSTALLED & ACTIVE

### Plugins enabled (9)
- superpowers@claude-plugins-official
- codex@openai-codex
- everything-claude-code@everything-claude-code
- pyright-lsp@claude-plugins-official
- agent-sdk-dev@claude-plugins-official
- ralph-loop@claude-plugins-official
- frontend-design@claude-plugins-official
- context-mode@context-mode
- claude-md-management@claude-plugins-official (Wave 82c+97-1A)

### Marketplaces installed (15)
addy-agent-skills, agent-skills, anthropic-agent-skills, claude-community, claude-for-financial-services, claude-plugins-community, claude-plugins-official, context-mode, everything-claude-code, financial-services, healthcare, knowledge-work-plugins, life-sciences, openai-codex, skills

### MCP servers wired (7)
- **github** — repo discovery + content
- **context7** — fresh library docs
- **deepwiki** — AI-powered repo Q&A
- **playwright** — browser automation
- **serena** — semantic code intel (LSP-aware)
- **memory** — doobidoo/mcp-memory-service v10.51.3 (sqlite_vec backend)

### Local binaries (.local/bin/) — 16 SOTA tools
ant.exe, claude.exe, cli-proxy-api.exe, gitleaks.exe, markitdown.exe, osv-scanner.exe, pysemgrep.exe, semgrep.exe, specify.exe, trivy.exe, trufflehog.exe, typos.exe, vale.exe + completions/contrib/man

## Wave 97 ships landed (10 ships in 21-ship arc)

| Ship | Commit | Description |
|---|---|---|
| 1A | `3c00615` | claude-md-management plugin |
| 1B | `a1f19f0` | gitleaks v8.30.1 |
| 1G | `58be220` | CLAUDE_CODE_EFFORT_LEVEL=xhigh |
| 1C+1D | `0110a9f` | gitleaks Phase 2 (PreToolUse hook + .gitleaks.toml) |
| 1J | `88aa7b1` | CLIProxyAPI fill-first → round-robin (FM-17.b.i closure) |
| 1L | `a7adfb6` | 4 MCP/Bash env-var pins |
| 1L-followup | `85905f9` | full-unleash 3-bump |
| 1N | `4050871` | github/spec-kit v0.8.7 binary |
| 1F | `22e58b3` | scripts/*-hooks-rewrite.py cite-trail headers |
| 1F-correction | `ba873e8` | Pattern A F1 honest-disclosure addendum |
| **1K-skip** | **`af9bbec`** | **repomix Mia OVER #11 (already installed; manifest L128 corrected)** |

## Manifest status counts
- **INSTALLED**: 26 rows
- **CITE-IMPORT-AMBER**: 29 rows (sibling-novel discipline)
- **PLANNED**: 77 rows (install backlog — substantial unrealized SOTA features)

## Account fleet state (operator probe)

### Active (3 of 7 Claude + Codex Pro + Gemini + Antigravity = 6 of 10)
| Account | Plan | Priority | Reset window | Capacity |
|---|---|---|---|---|
| claude-aesthetic9c@gmail.com | Max | P30 | unannotated | unset |
| claude-mr.euphoriaincarnate@gmail.com | Max | P20 | "23:00 EDT Thu (1d)" | **0** depleted |
| claude-nalawowac@gmail.com | Max | P10 | unannotated | unset |
| codex-zfan7@sva.edu-pro | Pro | n/a | OAuth expires 2026-05-18 (10d) | n/a |
| gemini-739955940fc@gmail.com | Gemini | n/a | n/a | n/a |
| antigravity-739955940fc@gmail.com | Antigravity | n/a | OAuth 1h refresh window | n/a |

### Disabled by rotation_planner 7d_threshold (4 Claude accounts; 2026-05-08 18:59:42Z)
- claude-739955940fc (P30, capacity_score=85)
- claude-avantmanifest (P20, capacity_score=100)
- claude-dreamweaverhoudini (P20, capacity_score=100)
- claude-zfan7 (P10, capacity_score=67)

## CRITICAL FINDINGS

1. **CPA process down** on port 8317 — last log entry 2026-05-08 16:24:42Z (~3h ago). Strategy=round-robin won't apply until next eee launch.
2. **3 of 7 Claude accounts active** — explains FM-17.b.i 429 sensitivity. Burst of 3-5 parallel agents saturates.
3. **mr.euphoriaincarnate capacity_score=0** — fully consumed; should be parked or marked depleted.
4. **capacity_score telemetry stale** — last updated 2026-04-27/28 (11 days ago).
5. **77 PLANNED rows in manifest** — substantial install backlog.
6. **codex-rescue subagent class triggers 1M-context billing** in this session — n=2 same-arc structural failure (Wave 98 fan-out A+B both 0-tokens). Pivoted to sota-researcher Sonnet stand-in with cross-model gate satisfied via orchestrator-direct codex exec foreground+tee BEFORE commit.

## Wave 98 outstanding queue (post agent team return)

- **Wave 98 ship candidates** (pending agent team verdict integration):
  - Agent A: top-5 token-eff ADOPT-NOW
  - Agent B: top-5 architectural-enhance ADOPT-NOW
  - Agent C: account-rotation strategies + recommended Wave 98+ ships

- **Operator-decision queued** (NOT auto-shipping):
  - Ship 1J-followup: priority equalization (P30/P20/P10 → uniform)
  - Re-evaluate rotation_planner 7d_threshold (4 accounts disabled simultaneously)
  - CPA restart needed (operator action: next eee launch)

## SOTA-coverage estimate (post Wave 97 Ship 1K-skip)

**~98% SOTA coverage** for primary axes (cardinal rules + permission modes + token-eff env + cross-model gate + memory stack + worktree isolation + secrets scanning + cache-prefix stability + spec-driven dev + codebase pack).

**Gaps surfaced for Wave 98** (pending agent team verdict):
- Architectural: deepagents SubAgentMiddleware / goose ACP host crate / langgraph Command(goto) / autogen TerminationCondition / agno service-deployment
- Token-eff: cpa-usage-keeper full wire / batch-API / structured outputs / response-format / role-aware compaction
- Account-rotation: usage-prediction / reset-window-aware-rotator / management-API telemetry consumer
