---
title: Wave 120 Next-Session Plan — SOTA architecture v2 + advanced agent team dispatch with GPT-5.5 source-code-deep-dive permissions
status: AUTHORITATIVE
date: 2026-05-09
agent: orchestrator
supersedes: docs/wave119-next-session-plan.md
verdict: ARCHITECTURE FULLY-RESOLVED post-Wave-119; 12 ships queued for Wave 120; FM-17.f reframed; SOTA v2 codified per 3 new rules
---

# Wave 120 Next-Session Plan

## §0 Fact-Forcing Gate v2 (paraphrased operator standing directive 2026-05-09)

**Standing intent**: maximally advanced automation runtime where every code/reference/hook/setting/install is SOTA-cited or natively installed from upstream SOTA repos. Zero self-invention. Always launch advanced agent team. Always e2e with REAL GPT-5.5 BRIDGE-MODE codex with FULL SOURCE-CODE DEEP-DIVE PERMISSIONS (clone if needed). Auto-proceed within authorized SOTA-research-then-install workflow. Continuous architecture audit + gap-resolution. Monitor zombie terminals + system status.

**Operating constraints** (CR-1 through CR-12 + 3 new rules — deprecation-discipline + SRA + launch-discipline):
- Every edit cites TIER-1-DIRECT upstream OR `effective_tier=TIER-3-LOCAL-COMPOSITION` per `citation-discipline.md` rule #8 lattice
- Every install via official-native-channel (no `Z:/repos/deps/` install-import; cite-only)
- Every fan-out follows `advanced-agent-team-standing-directive.md` (≥2 GPT-5.5 BRIDGE-MODE agents, file:line cites in briefs, ARTIFACT-INLINE per FM-19, Mia pre-apply, OUTPUT_BUDGET + TERMINATION)
- Every commit gated by codex T1 cross-model review (Phase 1 bootstrap exception via foreground+tee)
- Every deploy follows launch-discipline 6-axis D1 + 3 INVARIANTS + D2 monitoring window (24-72h)
- Every deprecation follows 5-question gate; ADVISORY default; v1.5.x+v3.5.x archive precedent
- Every adoption decision satisfies SRA D1-D10 (10-dimension lattice; ≥7/10 + critical D1+D6 PASS = INSTALL)

**GPT-5.5 source-code permissions** (NEW per this Fact-Forcing Gate refresh): codex T1 BRIDGE-MODE foreground+tee MUST have access to:
1. Read upstream repo source at `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>` (already operational)
2. Clone-on-demand via `git clone --depth 1 https://github.com/<owner>/<repo>.git` to staging dir for source-deep-dive
3. WebFetch + ctx_fetch_and_index for official-docs verification
4. mcp__github + mcp__deepwiki + mcp__repomix + mcp__context7 + mcp__exa + mcp__perplexity + mcp__serena MCP tools for cross-source convergence verification
5. Bash for runtime probes (ls / grep / curl / wmic / netstat / Get-NetTCPConnection)

## §1 Current state snapshot (post-Wave 119 close 2026-05-09)

| Surface | Count | Notes |
|---|---|---|
| **Cardinal rules** | **12** | CR-1 cite / CR-2 Karpathy / CR-3 cross-model / CR-4 RPI / CR-5 install-priority / CR-6 fresh-from-github / CR-7 graduated-unleash / CR-8 full-SOTA-content / CR-9 install-risk / CR-10 research-first / CR-11 META-process / CR-12 upstream-install-priority |
| **Active rules** | **36** (was 31 in wave119) | +5 added since wave119: deprecation-discipline + sota-research-architecture + launch-discipline + sota-pin-discipline + sota-research-architecture |
| **Active agents** | 9 | architect / code-reviewer / cwc / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / sota-researcher / verifier |
| **Plugins enabled** | 21 | claude-plugins-official (16) + addy-agent-skills + codex + ECC + context-mode |
| **Marketplaces registered** | 11 | + anthropic-agent-skills + claude-community + healthcare/financial-services/life-sciences verticals |
| **MCP servers active** | 11 | context7, deepwiki, github, gitnexus, graphiti, memory, phoenix, playwright, repomix, serena |
| **SKILL.md files (cached)** | 644 | across all enabled marketplaces |
| **Manifest install rows** | **278** (was 207) | +71 net additions since wave119 |
| **Kit versions installed** | 47 | v10-v62 in `Z:/claude-sota-installed/docs/outer research/kits/`; **v63+v64+v65 zip MISSING** |
| **Cliproxy stack** | 3-tier OPERATIONAL | CLIProxyAPI v6.10.9 + cnighswonger v3.5.3 (drift to v3.5.4) + cpa-usage-keeper v1.5.3 |
| **Native CC binary** | v2.1.138 (May 9 09:16) | Wave 118 autoupdate fix landed |
| **Open failure-mode candidates** | 0 firm + FM-17.f reclassified | FM-17.f → architectural-property per Wave 119 codex T1 conf=0.91 |
| **Pending Wave 119 ships** | 4 | CL-CN-1 (cnighswonger v3.5.4) + CL-4-FIX (eee.ps1 auths probe-path) + CL-AUDIT-REFRESH-2 + A1+A2 (commits) |

## §2 SOTA architecture v2 — formalized per 3 new rules

A primitive (repo / pattern / hook / setting / install) is SOTA in this runtime when ALL hold:

### §2.1 Source axis (CR-1 cite-class lattice + CR-8 full-content invariant)

- (S1) Upstream maintainer is named-org or named-T2 practitioner per SRA D4 tier ladder (TIER-1-OFFICIAL Anthropic/OpenAI/etc / TIER-2-NAMED-PRACTITIONER Karpathy/Pocock/Osmani/Cherny / TIER-3-NAMED-ORG / TIER-4-NAMED-INDIVIDUAL / TIER-5-UNKNOWN DOWNGRADE)
- (S2) License is permissive PER USE-CLASS per SRA D1 lattice (MIT/Apache/BSD universally OK; AGPL/GPL CLI-binary-use OK; AGPL library-link REJECT; SSPL local-DB OK; SSPL DB-as-product REJECT)
- (S3) Cite anchor uses `<repo>/<file>:<line> @ HEAD <SHA>` OR official-docs URL with anchor

### §2.2 Convergence axis (per `convergence-gate.md` Axis 1+2+3 + SRA D8)

- (C1) ≥3 distinct T1 sources (orgs/repos/papers) implement the pattern independently
- (C2) ≥2 named T2 practitioners with dated artifact endorse it (URL + date) OR STRONG-PROVENANCE-EXPRESS predicate
- (C3) ≥3 months stability (cpd × age STABLE-BURN-IN per `convergence-gate.md` Axis-3 5-band table)
- (C4) Industry adoption: ≥3 distinct orgs use in production (SRA D8)

### §2.3 Harness-fit axis (per `agent-harness-fit-verification.md` Probes 1-7 + SRA D6)

- (H1) Probe 1 count-OVER verified
- (H2) Probe 2 SDK-vs-CLI surface match
- (H3) Probe 3 architectural-API match
- (H4) Probe 4 plugin-namespace clean
- (H5) Probe 5 mode-harness-shape match (autonomous /loop compatible)
- (H6) Probe 6 direct-file/registry blockers PASS
- (H7) Probe 7.a or 7.b — DEMAND-ABSENCE OR DEMAND-CREATES-NEW-WORKFLOW (5-clause check)

### §2.4 Install-risk axis (per `cardinal-rule-9` + SRA D2 freshness gate)

- (R1) Version-pinned (no `@latest` without explicit D6 acknowledgment)
- (R2) 2-round fix-forward budget honored per Pattern A
- (R3) Pre-cite-import REVERT-AND-REMOVE check (sibling git log)
- (R4) Sibling-bleed defense (path-rewrite for runtime context)
- (R5) Replacement-freshness (replacement_last_push_age ≤ incumbent_last_push_age) per SRA D2+D10

### §2.5 Deploy axis (per `launch-discipline.md` D1+D2 deploy-phase namespace — NEW Wave 120)

- (D1) 6-axis pre-deploy checklist PASS (Code quality / Security / Performance / Accessibility / Infrastructure / Communication)
- (D2) 3 INVARIANTS satisfied: REVERSIBLE (2-button rollback documented + tested) + OBSERVABLE (TCP+HTTP+PID+log probes wired) + INCREMENTAL (staged rollout per traffic% OR sidecar-advisory-tier)
- (D3) D2 monitoring window 24-72h post-launch with revert path documented per closed-loop Outcome A/B/C

### §2.6 Deprecation axis (per `deprecation-discipline.md` 5-question gate — NEW Wave 120)

- (X1) Q1 unique-value PASS / FAIL
- (X2) Q2 consumer-count quantified
- (X3) Q3 replacement-readiness gate (covers critical use cases + has docs/migration guides + proven in production)
- (X4) Q4 migration cost vs ongoing cost compared
- (X5) Q5 advisory (default) vs compulsory (with-tooling) decided

A primitive that fails ANY axis is NOT-SOTA in this runtime regardless of GitHub stars or popularity. **SOTA verdict requires multi-dimensional convergence per SRA D1-D10 (≥7/10 + critical D1+D6 PASS = INSTALL).**

## §3 Wave 120 ship sequence (12 ships priority-ranked)

### Tier P0 — Close prior loops (5 ships; atomic per ONE-LOGICAL-UNIT-PER-FIRE)

**SHIP A1** — Commit Wave 118 autoupdate fix
- Files: `.claude/settings.json` (autoUpdatesChannel removed + minimumVersion 2.1.132) + verdict file `codex_consult_w118_autoupdate_path_OUT.txt`
- Cite trail: codex T1 W118 NEEDS-REVISION conf=0.91 Pattern A applied
- Owner: orchestrator direct atomic commit

**SHIP A2** — Commit Wave 119 deep-dive arc atomically
- Files: `CLAUDE.local.md` ENV (g)+(h) + `docs/fm17f-deep-dive-2026-05-09.md` + `docs/cliproxy-eee-sota-audit-2026-05-09.md` + `docs/wave119-next-session-plan.md` + `docs/wave120-next-session-plan.md` (this) + `docs/install-provenance.md` Wave 119 entries
- Cite trail: codex T1 W119 NEEDS-REVISION conf=0.91 (FM-17.f) + conf=0.92 (cliproxy audit) Pattern A applied
- Owner: orchestrator direct atomic commit

**SHIP CL-CN-1** — cnighswonger v3.5.3 → v3.5.4 upgrade per CR-6 official-native-channel
- Mechanism: `npm install -g claude-code-cache-fix@3.5.4` per official upstream README install method
- Cite trail: GitHub Releases API tag v3.5.4 published 2026-05-09T14:03:31Z; release notes confirm no behavior changes (backward-compat)
- SRA D1-D10 expected score 10/10 (same as v3.5.3)
- Launch-discipline D1: 6-axis pre-deploy (npm-global install is reversible via `npm install -g claude-code-cache-fix@3.5.3`)
- Owner: orchestrator direct OR sota-researcher subagent (Path P codex T1 verify)

**SHIP CL-4-FIX** — eee.ps1 advisory probe-path correction
- Edit: `tools/eee.ps1` lines ~404-407 — derive probe path from `auth-dir` config.yaml setting
- Replace `Test-Path "$authDir/auths"` + count with `Get-ChildItem -Path $authDir -Filter 'claude-*.json' -File | Measure-Object | Select-Object -ExpandProperty Count`
- Cite trail: codex T1 W119 cliproxy F-4 prescribed_edit
- Owner: orchestrator direct (single-line Edit) OR architect subagent

**SHIP CL-AUDIT-REFRESH-2** — update `docs/cliproxy-eee-sota-audit-2026-05-09.md` §1.3 with state-outside-repo WORK_DIR + Ship CL-NEW-FIX-1 closure status
- Forward-only doc update per port-note-discipline §6
- Owner: orchestrator direct

### Tier P1 — Architecture refinement (4 ships)

**SHIP A3** — Kits v5-v65 deep dive convergence (5-agent advanced team)
- **Scope expansion** (vs wave119 plan): now includes v63 + v64 + v65 kits (NOT in installed runtime; sibling claude-sota has v63+v64; **v65 zip is in installed but UNEXTRACTED** at `Z:/claude-sota-installed/docs/outer research/claude_code_sota_v65_ultimate_comprehensive_execution_md_kit.zip`)
- Step 1: extract v65 zip + cite-import v63+v64 to installed kits dir
- Step 2: spawn 5-agent advanced team per `advanced-agent-team-standing-directive.md`:
  - Agent A — sota-researcher: line-by-line audit kits v60-v65 (most recent; 6 versions); Probe DAG 1-7 vs current install state
  - Agent B — codex-rescue BRIDGE-MODE: deep-dive v5-v50 archaeology (early baseline); ARTIFACT-INLINE per FM-19
  - Agent C — gpt5-reviewer BRIDGE-MODE: adversarial review of A+B (what's missing? what's stale?)
  - Agent D — gpt5-archaeologist BRIDGE-MODE: hotspot/bus-factor on 81-PLANNED + 34-PENDING + 19 STAGED manifest rows; surface top-10 highest-leverage uninstalled
  - Agent E — architect: ≥2-option ship plan for next 5 install/cite-import waves
- OUTPUT_BUDGET each: 400-600 LOC artifact at `tmp/wave120-agent<X>-<topic>-2026-05-10.md`
- TERMINATION: `on_handoff_to: orchestrator | max_turns: 20 | terminationCondition: on_text_match: "VERDICT:" | on_token_budget_exceeded: 200000`
- Per-call codex budget: 90s default / 120s cap / 180s with reason (Wave 44 FM-17.d defense)
- CADP discipline: pre-dispatch fleet probe (`python Z:/claude/ccc/tools/status.py`) ≥3 accounts <50% session
- **Path D activation required**: enable `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` in CLAUDE.local.md ENV (h) + restart eee per fm17f-deep-dive Path D activation procedure (drops parent context to ~200k for fan-out window)
- Owner: orchestrator dispatches; Mia pre-apply on every returned prescription

**SHIP A4** — anthropics + ccbp + obra/superpowers deep-dive audit (3-agent team)
- Agent F — sota-researcher: walk `https://github.com/anthropics` org for new repos since 2026-05-06 (last full audit); GraphQL stars+topics + repo creation dates
- Agent G — codex-rescue BRIDGE-MODE: `Z:/repos/deps/claude-code-best-practice-shan @ HEAD 64fffd53` deep-dive any new sections; refresh HEAD via git fetch
- Agent H — code-reviewer: cross-check sibling `Z:/claude-sota/.claude/rules/` for cite-class drift requiring path-update in this runtime
- Owner: orchestrator dispatches

**SHIP A5** — MCP audit (deepwiki/repomix/serena/context7/graphiti/memory/phoenix official setup verification — 2-agent team)
- Audit 11 active MCPs against official docs (deepwiki devin docs / repomix yamadashy / serena oraios / context7 upstash / graphiti getzep / memory doobidoo / phoenix arizephoenix / github anthropics)
- Agent I — sota-researcher: each MCP's official setup vs current `.mcp.json` config; flag drift; verify per CR-6 official-native-channel
- Agent J — codex-rescue BRIDGE-MODE: foreground+tee deep-dive of each MCP's source code for unused features we're missing (per user "deepwiki, repomix all need to be clean sota set up with follow the official docs")
- Owner: orchestrator dispatches

**SHIP A6** — INSTALLED-AMBER + STAGED row closure (per CR-9 install-risk discipline)
- 6 INSTALLED-AMBER rows have deferred fixes; close per CR-9 2-round expectation
- 19 STAGED rows have pending HONEST-NON-FINDING gate evidence per CR-12; close OR retire to verified-avoid
- Owner: per-row Pattern A apply (orchestrator direct OR sota-researcher subagent)

### Tier P2 — Operational improvements (3 ships)

**SHIP A7** — zombie-terminal + container monitoring loop (NEW per Wave 120 user directive)
- `tools/process_hygiene_audit.py` (sibling cite-import per CR-12 last-resort) — operator-side codex.exe orphan reaper
- Docker container health probe (Phoenix, Langfuse, Grafana, Prometheus, Qdrant) — install-provenance check
- Wire as Monitor tool with `persistent: true` per `Monitor` tool docs:
  - Codex.exe orphan watcher: `tasklist | grep codex.exe | grep -v eee` — surface dead-parent codex zombies
  - Container health: `docker ps --format '{{.Names}}\t{{.Status}}' | grep -v Up` — surface unhealthy containers
  - Phoenix UI alive check: `curl -fsS 127.0.0.1:16006 -o /dev/null && echo OK || echo DOWN`
  - Disk space: `df -h Z:` — alert at <10GB free
- Owner: hook install + cron schedule

**SHIP A8** — gitnexus native bindings recovery (HNF-3 closure)
- Operator-side investigation: `npm install -g @ladybugdb/core@latest && gitnexus init claude-sota` per gitnexus README install method
- Verify lbugjs.node integrity post-install
- Probe `gitnexus list` for `claude-sota` indexed-repo state
- Owner: operator decision (manual investigation session); orchestrator can spawn sota-researcher to research gitnexus recovery patterns

**SHIP A9** — codex T1-T7 hooks Tier 1a install (per CR-3 mechanical enforcement; closes Phase 1 bootstrap exception)
- Install codex T1-T7 hooks per `cross-model-consensus.md §T1-T7 lifecycle table`
- Wire in `.claude/settings.json` per layered-gates-architecture.md §5 Layer 2
- Cardinal-rule-7 Phase 2 trigger: when this ship lands + Tier 1b sota-researcher + Tier 1c safety_guard.py all INSTALLED with smoke-probe PASS, flip `defaultMode: "auto"` → `"default"` (Phase 2 destination per CR-7 testable predicate)
- Owner: 3-agent team (sota-researcher + architect + codex-rescue BRIDGE-MODE)

## §4 Repos used inventory (TIER-1-DIRECT comprehensive — Wave 120 baseline)

### §4.1 Native install (`Z:/claude-sota-installed/.local/bin/` or marketplace)

| Repo | License | Version | Native path | Used for |
|---|---|---|---|---|
| `anthropics/claude-code` | Anthropic terms | v2.1.138 | `.local/bin/claude.exe` | CC binary runtime |
| `openai/codex` | Apache-2.0 | v0.129.0+ | system PATH | CLI cross-model T1-T7 verifier |
| `anthropics/claude-plugins-official` | Apache-2.0 | various | `.claude/plugins/cache/claude-plugins-official/` | 16 plugins (superpowers/skill-creator/code-review/feature-dev/code-simplifier/commit-commands/session-report/playground/mcp-server-dev/agent-sdk-dev/ralph-loop/frontend-design/pyright-lsp/pr-review-toolkit/claude-code-setup/claude-md-management) |
| `everything-claude-code/everything-claude-code` | MIT | 2.0.0-rc.1 | `.claude/plugins/cache/everything-claude-code/` | ECC plugin (200+ skills) |
| `addyosmani/agent-skills` | MIT | @742dca5 | `.claude/plugins/marketplaces/agent-skills/` | 21 engineering-phase skills |
| `mksglu/context-mode` | MIT | latest | `.claude/plugins/cache/context-mode/` | FTS5 knowledge base |
| `doobidoo/mcp-memory-service` | Apache-2.0 | v10.51.3 | `Z:/venvs/claude/Scripts/mcp-memory-server.exe` | L1 memory capture |
| `getzep/graphiti` | Apache-2.0 | v0.29.0 | pip install + Docker FalkorDB | L3 temporal-KG |
| `arize-ai/phoenix` | Apache-2.0 | v13.15.0 | Docker container | OTel observability |
| `router-for-me/CLIProxyAPI` | MIT | v6.10.9 | `.local/bin/cli-proxy-api.exe` | 8-account fleet routing |
| `cnighswonger/claude-code-cache-fix` | MIT | v3.5.3 (drift→3.5.4) | npm-global Node.js | 7 cache-fix extensions |
| `Willxup/cpa-usage-keeper` | MIT | v1.5.3 | `.local/cpa-usage-keeper/` | Per-account usage telemetry |
| `anthropics/cwc-long-running-agents` | Apache-2.0 | @ffd563d6 | `.local/cwc/` | 5 long-running primitives |
| `bytebase/dbhub` | MIT | (queued) | (queued) | DEMAND-PILOT for SQL audit-log analytics |
| `agentclientprotocol/claude-agent-acp` | Apache-2.0 | (queued) | (queued) | ACP host integration |

### §4.2 TIER-1-DIRECT cite-only (read at `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>`)

| Repo | Used for cite-anchor in |
|---|---|
| `claude-agent-sdk-python` @ b512f256 | HookMatcher / SubagentStop / _SubagentContextMixin (audit-action-loop + parallel-agent-wave + cross-model-consensus) |
| `claude-code-best-practice-shan` (CCBP) @ 64fffd53 | memory + settings + subagents + cross-model-workflow + RPI + Boris tips + claude-cli-startup-flags |
| `everything-claude-code` @ 841beea4 | RULES.md cardinal contract |
| `andrej-karpathy-skills` @ 2c606141 | 4 principles + Wiki §5 (karpathy-adapted.md) |
| `obra/superpowers` @ e7a2d164 | verification-before-completion + 14 skills + workflow grammar |
| `forrestchang/andrej-karpathy-skills` (MIT) | named-author Karpathy provenance |
| `jj-vcs/jj` @ 755b7b7b | worktree workspace evidence (parallel-session-worktree-isolation) |
| `libgit2` @ 16cb9c5e | worktree primitive substrate |
| `gitoxide` @ 24cdbb04 | gix-pathspec Rust impl |
| `repomix` @ 7dfd2b96 | Pack→Grep→Skill pipeline (research-protocol) |
| `mattpocock/skills` @ HEAD | named-failure-modes pattern |
| `LangChain/deepagents` @ 95f845d2 | SubAgentMiddleware + atomic-write + recovery-manager (team-orchestration) |
| `AAIF/goose` @ 45d8bf81 | ACP host crate; Apache-2.0 |
| `agentclientprotocol/python-sdk` @ df721735 | ACP protocol |
| `coder/acp-go-sdk` | ACP Go SDK |
| `composioHQ/agent-orchestrator` @ ab65d123 | TypeScript session manager |
| `awesome-agentic-patterns` @ ffb42768 | 70+ patterns (parallel-sessions) |
| `anthropic-cookbook` @ 33424c3e | 9 production patterns |
| `gsd-build/get-shit-done` @ eeaf9c55 | TÂCHES workflow system |
| `gstack/codex` | FM-17.d mitigation patterns |

### §4.3 TIER-3-LOCAL-COMPOSITION cite-import-AMBER (sibling claude-sota — 36 rules ported)

Per CR-12 last-resort: 36 rules in `Z:/claude-sota-installed/.claude/rules/` (see §1 inventory) — all cite-import-AMBER from `Z:/claude-sota/.claude/rules/` per Section 14.5 with HONEST-NON-FINDING gate evidence.

## §5 Missing SOTA features (Wave 120 gap audit)

### Tier-1 install gaps (HIGH priority)

1. **cnighswonger v3.5.4** (P0; CL-CN-1) — 24h drift; release published today
2. **eee.ps1 auths/ probe-path correction** (P0; CL-4-FIX) — false positive in advisory check
3. **ACP host integration** — `agentclientprotocol/claude-agent-acp` adapter; sss can be operated FROM Zed/JetBrains via ACP per cross-arc convergence n=4-org Axis-1 (LangChain + AAIF/Linux Foundation + ACP-org + Coder)
4. **gitnexus native bindings recovery** — broken HNF-3; blocks `gitnexus list/impact/context` for change-set analysis
5. **codex T1-T7 hooks Tier 1a install** — currently CR-3 satisfied via Phase 1 bootstrap exception (foreground+tee); Tier 1a install closes the exception + enables CR-7 Phase 2 trigger
6. **fm17d_stall_detector schema fix** — currently DISABLED via `FM17_STALL_DETECTOR_DISABLE=1` env (172/172 schema-rot false-positive)
7. **Path D activation for fan-out Waves** — already in CLAUDE.local.md ENV (h) as guarded comment per Wave 119; needs operator-decision per fan-out Wave (Wave 120 SHIP A3 candidate)

### Tier-2 install gaps (MEDIUM priority)

8. **v63 + v64 + v65 kits convergence** — sibling has v63+v64; **v65 zip is UNEXTRACTED in installed runtime** at `Z:/claude-sota-installed/docs/outer research/claude_code_sota_v65_ultimate_comprehensive_execution_md_kit.zip`
9. **Langfuse parallel-sink for OTel** — Phoenix-only currently; deferred per Wave 109
10. **OpenTelemetry Collector fan-out** — 1-trace → multi-sink (Phoenix + Langfuse + Grafana + Prometheus)
11. **DBHub MCP for audit-log SQL analytics** — Probe 7.b STUDY-PILOT; requires JSONL → SQLite ETL path per `agent-harness-fit-verification.md` Probe 7
12. **Serena IDE/LSP-grade code intel** beyond current MCP usage
13. **anthropics + addyosmani + obra/superpowers new repos** since 2026-05-06 (no fresh org-scan)
14. **Boris Cherny tips refresh** — 6-tips dated 2026-04-16; 30-tips dated 2026-03-30; both >30d stale per Marker Decay corollary

### Tier-3 install gaps (LOW priority; cite-only adoption)

15. **smolagents code-as-action paradigm** (REJECT structurally per architectural mismatch; cite as comparison only)
16. **agno-agi service-deployment primitive** (out-of-scope for autonomous /loop)
17. **Mastra event-sourced workflow** (deferred per parallel-sessions.md Novel patterns annex)

## §6 Agent-team dispatch plan with GPT-5.5 source-code-deep-dive permissions

### §6.1 Cross-model gate strategy (Path P PRIMARY + Path D for fan-out)

Per FM-17.f deep-dive Path ranking + this Wave 120 user directive "GPT-5.5 access to SOTA tools and permissions":

- **Path P (PRIMARY)**: orchestrator-side `codex exec --ephemeral -p deep-review-exec --color never` foreground+tee with FULL TOOL ACCESS:
  - All MCP tools enabled (mcp__github + mcp__deepwiki + mcp__repomix + mcp__context7 + mcp__exa + mcp__perplexity + mcp__serena + mcp__memory + mcp__graphiti + mcp__phoenix + mcp__playwright)
  - Bash for runtime probes
  - WebFetch + ctx_fetch_and_index for official-docs verification
  - Read access to `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` for source-code-level verification
  - **Clone-on-demand** via `git clone --depth 1 https://github.com/<owner>/<repo>.git Z:/claude-sota-installed/tmp/codex-staging/<repo>/` for repos NOT in `Z:/repos/deps/`
- **Path D (SECONDARY for fan-out)**: `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` in CLAUDE.local.md ENV (h) + restart eee → enables BRIDGE-MODE Agent() subagent dispatch via Anthropic SDK
  - Activated ONLY for explicit fan-out Waves declaring 3-5 BRIDGE-MODE subagent dispatch as load-bearing
  - Trade-off: parent loses 1M context (~200k ceiling)
  - SHIP A3 (Kits deep-dive) is Path D candidate

### §6.2 Advanced agent team standing directive conformance

Every non-trivial Wave 120 ship spawns 3-5 agent team per `advanced-agent-team-standing-directive.md` invariants:
1. ≥2 GPT-5.5 BRIDGE-MODE agents (codex-rescue / gpt5-reviewer / gpt5-archaeologist)
2. Brief cites SOTA repos at file:line + HEAD SHA depth
3. Line-by-line SOTA repo audit mandate for adoption-class waves
4. Anthropic official docs as authority guide (`code.claude.com/docs/en/*`)
5. ARTIFACT-INLINE per FM-19 (Bash-only / no-Write agents embed `## ARTIFACT-INLINE: tmp/wave120-<agent>-<topic>-<date>.md`)
6. Mia pre-apply on every returned prescription per `mia-pre-apply.md` n=29+ ladder
7. Forward-only persistence per `tmp/wave120-<agent>-<topic>-<date>.md` convention
8. OUTPUT_BUDGET + TERMINATION in every brief per `team-orchestration.md`

### §6.3 CADP discipline pre-dispatch (per `parallel-agent-wave.md §CADP rule 5`)

Before any 3-5 agent fan-out:
1. Probe fleet: `python Z:/claude/ccc/tools/status.py | head -40`
2. Require ≥3 accounts <50% session
3. Max 3 concurrent unless cache rate ≥50% verified
4. Max 5 cumulative dispatches per session arc without intervening status.py probe

### §6.4 FM-17 sub-class defenses

- FM-17.a wrapper-truncation: ARTIFACT-INLINE pre-mandate prevents
- FM-17.b pool-depletion 429: CADP fleet probe + `parallel-agent-wave.md §CADP rule 5`
- FM-17.c.i companion bg-job wedge: foreground+tee from main session bypasses
- FM-17.c.ii Windows cert-store ACL: route via main orchestrator process context
- FM-17.d 600s stream-watchdog stall: per-call codex 90-180s budget mandate in brief
- FM-17.e CC-runtime autocompact-thrashing: brief tightening — substitute Read large files → ctx_execute_file; substitute WebFetch → ctx_fetch_and_index; cap exa/perplexity with head_limit
- FM-17.f extended-context entitlement: Path D activation per fan-out Wave

## §7 Monitoring + zombie-terminal discipline (Wave 120 NEW per user directive)

### §7.1 Persistent monitors (Monitor tool with `persistent: true`)

- **Codex orphan watcher**: `while true; do tasklist | grep -i codex.exe | grep -v eee; sleep 30; done` — surface dead-parent codex zombies
- **Container health**: `docker ps --format '{{.Names}}\t{{.Status}}' | grep -v Up` — surface unhealthy containers
- **Phoenix UI alive**: `curl -fsS 127.0.0.1:16006 -o /dev/null && echo OK || echo DOWN`
- **Cliproxy 3-tier health**: cnighswonger:19801 + CLIProxyAPI:8317 + cpa-usage-keeper:8079 status
- **Disk space**: `df -h Z:` — alert at <10GB free
- **Cache rate**: `python Z:/claude/ccc/tools/status.py | head -40` — surface fleet pool starvation BEFORE agent dispatch

### §7.2 Audit-action-loop hooks (per `audit-action-loop.md` Wire/Surface/Close/Re-fire)

- `claude_md_count_audit.py` — PostToolUse Bash(git commit *) async 15s
- `mcp_self_audit.py` — PostToolUse async + SessionEnd async 30s
- `mcp_overhead_audit.py` — config-cost telemetry
- `repo_cite_existence_audit.py` — phantom-cite detection
- `cohort_coverage_audit.py` — 9-cohort discipline drift on adoption commits
- `agent_frontmatter_audit.py` — agent frontmatter drift vs CCBP 16 documented fields
- `tmp_md_inventory.py` — tmp/*.md sprawl + frontmatter drift

## §8 Architecture-improvement recommendations (Wave 120 NEW)

Beyond the 12 ships in §3, these architectural improvements should be considered for Wave 121+:

### §8.1 Promote 3 new rules to skill-tier (n=3+ per cycle-322)

- `deprecation-discipline.md` — codified at n=1 user-trigger; promote at n=3 same-arc applications
- `sota-research-architecture.md` — codified at n=1 user-trigger; SRA D1-D10 lattice ready for skill promotion
- `launch-discipline.md` — codified at n=1 user-trigger; D1+D2 deploy-phase namespace ready for skill promotion

### §8.2 Codify SOTA architecture v2 in CLAUDE.md

Promote the §2 SOTA architecture v2 (S1-S3 + C1-C4 + H1-H7 + R1-R5 + D1-D3 + X1-X5) to CLAUDE.md as cardinal-rule-13 (`SOTA-architecture-v2-multi-axis-convergence`).

### §8.3 ACP host integration (Wave 121 candidate)

Per Axis-1 4-org convergence (Anthropic + LangChain + AAIF/Linux Foundation + Coder), ACP integration is ADOPT-NOW. Install `/plugin install claude-agent-acp` in Wave 121.

### §8.4 SOTA-pin-discipline.md activation (currently FORWARD-REF)

Wire `sota_freshness_sweep.py` script + `sota_pin_audit` SessionStart hook to surface SOTA-pin drift weekly per `sota-pin-discipline.md` 4-stage Wire/Surface/Close/Re-fire.

### §8.5 Cardinal-rule-7 Phase 2 trigger preparation

Per CR-7 Phase 2 testable predicates: when SHIP A9 (codex T1-T7 hooks Tier 1a install) lands + Tier 1b sota-researcher + Tier 1c safety_guard.py all INSTALLED with smoke-probe PASS, flip `defaultMode: "auto"` (CCBP-canonical SOTA mode per Wave 61.5) — this would SUPERSEDE current `bypassPermissions` mode + add classifier-based per-tool-call gating.

## §9 Concrete next-session entry sequence

```
1. Operator launches eee (verifies banner shows v2.1.138 + cliproxy 3-tier active + cpa-usage-keeper v1.5.3 PID alive)
2. Orchestrator commits A1+A2 atomically (Wave 118 + Wave 119 close)
3. Orchestrator executes CL-CN-1 (cnighswonger v3.5.3 → v3.5.4 via npm install -g)
4. Orchestrator executes CL-4-FIX (eee.ps1 auths/ probe-path correction; single-line Edit)
5. Orchestrator executes CL-AUDIT-REFRESH-2 (cliproxy audit doc refresh)
6. Operator decision: activate Path D (CLAUDE_CODE_DISABLE_1M_CONTEXT=1) + restart eee for fan-out Wave A3
7. Orchestrator pre-dispatch CADP probe (status.py ≥3 accounts <50%)
8. Orchestrator extracts v65 zip + cite-imports v63+v64 from sibling
9. Orchestrator spawns 5-agent team in single message (Wave 120 SHIP A3 kits deep dive)
10. While team runs: orchestrator launches Wave 120 SHIP A4 (3-agent anthropics+ccbp+superpowers audit) in parallel
11. As task notifications arrive: Mia pre-apply on each returned prescription
12. Cross-arc synthesis: orchestrator-side close-synthesis.md aggregates A3+A4 verdicts
13. Pattern A apply per codex T1 NEEDS-REVISION on each ship
14. Provenance log entry per ship per CR-11 audit-action-loop Wire/Surface/Close
15. Cron-schedule monitoring loops (Wave 120 SHIP A7) for zombie + container watch
16. Continue per priority queue: A5 MCP audit / A6 INSTALLED-AMBER closure / A8 gitnexus / A9 codex T1-T7 hooks
```

## §10 Success criteria (cardinal-rule-2 strong-success-criteria)

- All 21 plugins verified active + smoke-probed PASS
- All 11 MCPs verified responding + tool-count enumerated
- Manifest tally shifts: ≥10 PLANNED → STAGED, ≥5 STAGED → INSTALLED in Wave 120
- ≥2 cite-import-AMBER rows promoted to TIER-1-DIRECT install via upstream-parity probe (CR-12)
- Wave 120 audit-trail entries committed in `docs/install-provenance.md` per CR-11 Wire/Surface/Close
- Cross-model gate: every Wave 120 ship has codex T1 verdict file at `.claude/state/codex_consult_w120_<topic>_OUT.txt` per CR-3 Phase 1 bootstrap exception
- Zero new self-invented content (CR-8 100% adapted-from-SOTA conformance)
- Zombie-terminal monitoring loop active per SHIP A7
- 3 new rules dogfood validated by ≥1 ship each (deprecation-discipline / SRA / launch-discipline)
- v65 zip extracted + v63+v64 cite-imported = 65 kit versions in installed runtime baseline

## §11 Update triggers for THIS plan

Re-evaluate when:
- Wave 120 close-synthesis surfaces NEW failure-mode candidate (FM-17.g+ OR new FM class)
- Anthropics ships new official plugin/marketplace not in current 11-marketplace registry
- Kit v66+ lands at `Z:/claude-sota/docs/outer research/kits/`
- ACP host integration ships (`/plugin install claude-agent-acp`) — flips Anthropic CC ingress topology
- Manifest install tally crosses Phase 2 trigger predicate (CR-7) — flip `defaultMode: "auto"` per CCBP-canonical
- New cardinal-rule (CR-13+) codified per cycle-322 jurisdiction n=3+ promotion
- New rule promoted from feedback-memory to rule-tier per `codification-threshold.md`
- Operator declares operator-decision ship (e.g., `/extra-usage` purchase) that changes Path P/D/X/S ranking
