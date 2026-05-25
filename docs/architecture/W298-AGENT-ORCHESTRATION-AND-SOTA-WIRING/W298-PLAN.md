# W298 Wave — Agent-Orchestration Silent-Failure Forensics + SOTA Repo Convergence + NSSM/SDK Practice Gap

> **Wave**: W298 (operator follow-up to W297 — close all gaps; install all SOTA practices; investigate orchestration silent failures; audit runtime vs official SDKs; vet named SOTA repos; audit NSSM-as-SOTA-process-supervisor).
>
> **Branch**: `sota-converge-w295` (continued; HEAD `a78b3af`).
>
> **Operator dimensions (W298 verbatim)**:
> 1. "gap resolute all" — close all outstanding W295/W296/W297 gaps
> 2. "install all sota practice and investigate your runtime against official sdks etc"
> 3. "your agent team orchestration has silent fallback or errors" — investigate
> 4. SOTA repos to vet/install: `https://github.com/wshobson/agents` (already installed via `claude-code-workflows` marketplace), `https://github.com/mattpocock/skills` (NEW candidate), `https://github.com/anthropics` (multiple repos — verify canonical coverage)
> 5. "fully wire sota practice"
> 6. "is nssm sota? what is the sota practice from advanced repos for these?" — process supervision audit

## §0 — Pre-flight state (verified live this wave)

| Component | State (W298 probe) | Delta vs W297 |
|---|---|---|
| HEAD | `a78b3af` (W296 r2 fix-1: pace-count corrected) | unchanged since W297 |
| Branch | `sota-converge-w295` | unchanged |
| **Silent-failure symptom CONFIRMED** | Bash tool routes through Git Bash → MSYS path-conversion intercepts PowerShell tokens (`$_.Name` → `/usr/bin/bash.Name`) → multi-line errors per call; visible in this session's batch_execute output (5+ commands corrupted by `/usr/bin/bash.X` path-rewrite); separately Stop hook history shows `EUNKNOWN: unknown error, uv_spawn` + `cygheap read copy failed` per prior-session summary — **TWO failure modes**, both operator-perceived as "silent fallback" | NEW evidence this wave |
| W297 smoke fixtures | 5 untracked harness/fixtures/smoke_*.py files (astral_uv, claude_agent_sdk, github_spec_kit, mem0ai_mem0, oraios_serena) — operator started executing W297 row #2/#3 (claude-agent-sdk + uv installs) | OPERATOR-PROGRESS detected |
| `.claude/settings.json` | modified-uncommitted (operator possibly enabling W296-foundation plugins or W297 ship-items) | drift evidence |
| `wshobson/agents` marketplace | INSTALLED at `.claude/plugins/cache/claude-code-workflows/` covering agent-orchestration, agent-teams, code-review, comprehensive-review, debugging-toolkit, etc. (~20 dirs) | needs verification per-plugin |
| `mattpocock/skills` | NEW candidate — never audited; need W298 sca-v3.1 run | NEW |
| NSSM as supervisor | incumbent for IkLlamaServer/CogneeMCP/etc. | needs SOTA-alternative audit |

## §1 — Streams (4 parallel, file-ownership disjoint)

| Stream | Type | Scope | File ownership | Done criteria |
|---|---|---|---|---|
| **A** | forensics (read + bash + reproduce) | **Agent-team orchestration silent-failure forensics** — investigate ALL of: (1) bash→PowerShell MSYS path-conversion (`$_` token corruption); (2) Stop hook `EUNKNOWN uv_spawn` errors per prior session; (3) `cygheap read copy failed` cygwin/bash fork failures; (4) sub-agent `Task` tool error patterns from recent `tmp/claude/.../tasks/*.output` logs; (5) `team_orchestration_state` test that failed in this session's batch (PowerShell `$env:HOME` expansion intercepted by bash). For each: ROOT CAUSE + REPRODUCTION + PROPOSED FIX (cardinal-rule-compliant — no self-invent hooks/scripts) | `W298-STREAM-A-ORCHESTRATION-FORENSICS.md` | Per-issue: root-cause + repro + fix; ≥1 fix flagged as ship-this-wave; rest as backlog |
| **B** | research (sca-v3.1 audit on 3 named candidates) | **SOTA repo audit** — (1) `wshobson/agents` already-installed via `claude-code-workflows` marketplace — which plugins ENABLED in `.claude/settings.json:enabledPlugins`? Any silent disables? are we extracting full value? (2) `mattpocock/skills` NEW candidate — run full sca-v3.1 audit (14-dim + dual composites + 5-tier verdict + typed evidence ≥3 orgs); (3) `anthropics/*` canonical coverage — enumerate Anthropic-org repos that should be in our marketplace registry (`anthropic-agent-skills`, `claude-plugins-official`, `claude-cookbooks`, `knowledge-work-plugins`, `financial-services`, `healthcare`, `life-sciences`, `claude-plugins-community`, `skills`); any missing? Use multi-MCP discovery cascade (exa + deepwiki + repomix + github + context7 + websearch) per W297-D ship-decision-B | `W298-STREAM-B-SOTA-REPO-AUDIT.md` | sca-v3.1 verdict for mattpocock/skills (T1/T2/T3/T4/T5 + cite trail); plugin-coverage gap matrix for wshobson + anthropics |
| **C** | research (Windows process supervision SOTA 2026-MAY) | **NSSM SOTA audit + alternatives** — incumbent NSSM 2.24/2.25 for IkLlamaServer/CogneeMCP/FalkorDB/BasicMemoryD. Audit 2026-MAY landscape: WinSW (winsw 3.x), Windows-native sc.exe + scheduled tasks, PM2 for Node services, supervisord-on-Windows, Docker Desktop containerization, podman-windows, k8s/Rancher Desktop, Windows Service Tracing patterns. For each: license + maintenance velocity + Windows-x64 fit + ETL/observability integration + operator-experience. Decide: KEEP-NSSM vs SWAP-TO-X with rollback plan. Multi-MCP discovery cascade (exa + deepwiki + websearch + reddit/HN practitioner reports) | `W298-STREAM-C-NSSM-VS-SOTA-SUPERVISOR.md` | Per-supervisor 5-dim mini-rubric (license/maint/fit/observability/ops); top-3 ranked; KEEP-or-SWAP verdict; rollback plan if SWAP |
| **D** | research (official-SDK practice gap) | **Runtime vs official-SDK practice gap audit** — for each official SDK we depend on: (1) Anthropic Python SDK (`anthropic` pkg + claude-agent-sdk-python — installed per W297 smoke?); (2) Anthropic TS SDK (`@anthropic-ai/sdk` — npm); (3) Claude Agent SDK pattern (`claude-agent-sdk` py + ts; documented at `docs.claude.com`); (4) OpenAI Codex CLI (used by `codex@openai-codex` plugin); (5) Optional: Anthropic Hooks SDK (if exists). For EACH: current version pinned/installed? official-documented usage pattern? OUR actual usage? gap? Reference `docs.claude.com/en/api/*` + `code.claude.com/docs/en/sub-agents` + `code.claude.com/docs/en/skills`. Multi-MCP (context7 + deepwiki + exa + github API) | `W298-STREAM-D-OFFICIAL-SDK-PRACTICE-GAP.md` | Per-SDK gap matrix (installed-ver / official-latest / official-pattern / our-pattern / gap-severity); ship-this-wave fixes vs backlog |

**Coordinator (self)**: synthesis → `W298-AUDIT-2026-05-18.md` → codex GPT-5.5 r1 ratification → unified operator-action queue.

**Stream E (codex r1 — fired AFTER A/B/C/D return)**: GPT-5.5 cross-model unleashed adversarial review on W298-AUDIT synthesis per W296/W297 pattern.

## §2 — File ownership

- `W298-PLAN.md` — coordinator (this file)
- `W298-STREAM-A-ORCHESTRATION-FORENSICS.md` — Stream A only
- `W298-STREAM-B-SOTA-REPO-AUDIT.md` — Stream B only
- `W298-STREAM-C-NSSM-VS-SOTA-SUPERVISOR.md` — Stream C only
- `W298-STREAM-D-OFFICIAL-SDK-PRACTICE-GAP.md` — Stream D only
- `W298-AUDIT-2026-05-18.md` — coordinator post-stream-return
- `W298-CODEX-R1.md` — coordinator post-codex

NO stream edits: `CLAUDE.md`, `.claude/settings.json`, `.claude/skills/sota-convergence-audit/SKILL.md`, `.mcp.json`, `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`, `harness/eval_harness.py` — operator-approval-gated edits.

## §3 — Anti-bias mandates (carried verbatim per stream from W297)

- Stars NOT a hardgate (D12 caps at 3 when only stars are present; low-star pattern-rich routes to T3 PATTERN-STUDY)
- ≥3 organisationally-distinct sources per T1 INSTALL; ≥1 each of {benchmark with numbers, code reading, practitioner field report}
- 2026-MAY freshness MANDATE — no pre-2026-Q1 references unless org-canonical-SDK or commit-velocity >0 in last 60 days
- ≥3-of-N CHANGE/EVOLVE/INVERT threshold (anti-confirmatory bias resistance)
- Source disagreements MUST surface in `sources_typed.<dim>.disagreement[]`
- Multi-MCP discovery cascade per W297-D — exa + deepwiki + repomix + context7 + github + websearch (perplexity gracefully-degrades)

## §4 — Cite-anchors

- `W297-AUDIT-2026-05-18.md` — prior wave synthesis (post-codex-r1 fix-iterate)
- `W297-STREAM-A/B/C/D` — local-inference + memory-mapping + live-repair + multi-MCP cascade
- `W296-AUDIT-2026-05-18.md` — 9-axis baseline + 5 W296 T1 ledger-pending verdicts
- `W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — verdict ledger
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v3.1 rubric (live)
- `.claude/settings.json` — enabledPlugins map + disabledMcpjsonServers
- `CLAUDE.md` — cardinal rules + 6-tier memory

## §5 — Verification-on-completion

Each stream MUST end with:
- File written + LOC
- ≥3 cite-anchors
- Top 3 findings + confidence levels
- Source-disagreement log (or "none observed")
- Items routed to W298-AUDIT synthesis
