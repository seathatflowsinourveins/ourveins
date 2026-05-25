---
title: Wave 119 Next-Session Plan — SOTA architecture audit + advanced agent team dispatch
status: AUTHORITATIVE
date: 2026-05-09
agent: orchestrator
---

# Wave 119 Next-Session Plan

## §0 Fact-Forcing Gate (paraphrased operator directive 2026-05-09)

**Standing intent**: maximally advanced automation runtime where every code/reference/hook/setting/install is SOTA-cited or natively installed from upstream SOTA repos. Zero self-invention. Always launch advanced agent team. Always e2e with REAL GPT-5.5 BRIDGE-MODE codex (full unleashed; codex MUST have access to source-code-level deep-dive of upstream repos). Auto-proceed within authorized SOTA-research-then-install workflow. Continuous architecture audit + gap-resolution.

**Operating constraints** (CR-1+5+6+8+10+11+12 conformance):
- Every edit cites TIER-1-DIRECT upstream OR `effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline rule #8 lattice
- Every install via official-native-channel (no `Z:/repos/deps/` install-import; cite-only)
- Every fan-out follows advanced-agent-team-standing-directive invariants (≥2 GPT-5.5 BRIDGE-MODE agents, file:line cites in briefs, ARTIFACT-INLINE per FM-19, Mia pre-apply, OUTPUT_BUDGET + TERMINATION)
- Every commit gated by codex T1 cross-model review (Phase 1 bootstrap exception via foreground+tee)

## §1 Current state snapshot (probed 2026-05-09)

| Surface | Count | Notes |
|---|---|---|
| Plugins enabled | 21 | claude-plugins-official (16) + addy-agent-skills + codex + ECC + context-mode |
| Marketplaces registered | 11 | + anthropic-agent-skills + claude-community + healthcare/financial-services/life-sciences verticals |
| MCP servers active | 11 | context7, deepwiki, github, gitnexus, graphiti, memory, phoenix, playwright, repomix, serena |
| Manifest install rows | 207 | 61 INSTALLED / 11 CITE-IMPORT-AMBER / 5 SYSTEM-PATH / 6 INSTALLED-AMBER / 19 STAGED / 34 PENDING / 81 PLANNED |
| Kit versions (outer research) | 47 | v5..v62 in `Z:/claude-sota/docs/outer research/kits/` |
| Repo baseline (Wave 47 grand catalog) | 934 unique | top-15 axis: superpowers 180k★ + claude-code 121k★ + codex 80k★ + mattpocock/skills 63k★ + aider 44k★ + rtk 43k★ |
| Cardinal rules active | 12 | CR-1 cite / CR-2 Karpathy / CR-3 cross-model / CR-4 RPI / CR-5 install-priority / CR-6 fresh-from-github / CR-7 graduated-unleash / CR-8 full-SOTA-content / CR-9 install-risk / CR-10 research-first / CR-11 META-process / CR-12 upstream-install-priority |
| Sibling rules cite-import | 35 | `.claude/rules/` cite-import-AMBER per CR-12 last-resort |
| Open failure-mode candidates | 1 | FM-17.f n=1 (1M-context-entitlement subagent dispatch); promotes at n=3 per cycle-322 |
| Uncommitted artifacts | 2 | Wave 118 settings.json autoupdate fix + state/codex_consult_w118_OUT.txt |

## §2 SOTA definition — formalized architecture for "SOTA"

A primitive (repo / pattern / hook / setting / install) is SOTA in this runtime when ALL hold:

**Source axis (cardinal-rule-1 cite-class lattice — CR-8 full-content invariant):**
- (S1) Upstream maintainer is named-org or named-T2 practitioner (Anthropic, OpenAI, LangChain, AAIF/Linux Foundation, named-author repo per addy-osmani/karpathy/obra/boris/etc.)
- (S2) License is permissive (MIT / Apache-2.0 / BSD); copyleft (AGPL/GPL) REJECT-FOR-FIT per Probe 6 direct-file blocker
- (S3) Cite anchor uses `<repo>/<file>:<line> @ HEAD <SHA>` OR official-docs URL with anchor

**Convergence axis (convergence-gate Axis 1+2+3 PASS):**
- (C1) ≥3 distinct T1 sources (orgs/repos/papers) implement the pattern independently
- (C2) ≥2 named T2 practitioners with dated artifact endorse it (URL + date)
- (C3) ≥3 months stability (cpd × age band — STABLE-BURN-IN OR STRONG-PROVENANCE-EXPRESS predicate)

**Harness-fit axis (agent-harness-fit-verification Probes 1-7 PASS):**
- (H1) Probe 1 count-OVER verified
- (H2) Probe 2 SDK-vs-CLI surface match
- (H3) Probe 3 architectural-API match (Anthropic-API vs OpenAI-API vs vendor-neutral)
- (H4) Probe 4 plugin-namespace clean (NOT already loaded via plugin)
- (H5) Probe 5 mode-harness-shape match (autonomous /loop compatible)
- (H6) Probe 6 direct-file/registry blockers PASS (LICENSE / README-badge / npm/PyPI registry)
- (H7) Probe 7.a or 7.b — DEMAND-ABSENCE or DEMAND-CREATES-NEW-WORKFLOW with 5-clause check

**Install-risk axis (CR-9 install-risk discipline):**
- (R1) Version-pinned (no `@latest` without explicit D6 acknowledgment)
- (R2) 2-round fix-forward budget honored
- (R3) Pre-cite-import REVERT-AND-REMOVE check (sibling claude-sota git log)
- (R4) Sibling-bleed defense (path-rewrite for runtime context)

A primitive that fails ANY axis is NOT-SOTA in this runtime regardless of GitHub stars or popularity.

## §3 Wave 119 ship sequence (prioritized)

**SHIP A1 — close prior loop (P0; cycle-300 ONE-LOGICAL-UNIT-PER-FIRE)**
- Atomic commit `.claude/settings.json` Wave 118 autoupdate fix
- Add `docs/install-provenance.md` Wave 118 entry
- Cite trail: codex T1 verdict file `.claude/state/codex_consult_w118_autoupdate_path_OUT.txt` (NEEDS-REVISION conf=0.91 Pattern A applied)
- Owner: orchestrator direct; no agent team needed (single-file fix, codex T1 already done)
- Estimated: 5 min

**SHIP A2 — FM-17.f operator decision (P0; blocks future cross-model gate)**
- Decision required: enable `/extra-usage` (Anthropic 1M-context billing) OR set `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` in CLAUDE.local.md ENV (g)
- Trade-off: `/extra-usage` keeps cardinal-rule-3 mechanically enforceable via Agent() subagent dispatch ($$$); ENV (g) reverts to Sonnet stand-in (FM-17.b.i risk; STAND-IN-NOTICE per cross-model-consensus.md mandate)
- Recommendation: pivot to **direct `codex exec` foreground+tee from main session** as PRIMARY cross-model path; subagent BRIDGE-MODE becomes secondary (only when fan-out parallelism needed)
- Owner: operator decision (queue codex T1 prompt drafted)

**SHIP A3 — Kits v5-v62 deep dive convergence (P1; closes 47-version gap)**
- Spawn 5-agent advanced-team (per advanced-agent-team-standing-directive invariants):
  - Agent A — sota-researcher: line-by-line audit kits v52-v62 (most recent; 11 versions); Probe DAG 1-7 vs current install state
  - Agent B — codex-rescue BRIDGE-MODE: deep-dive convergence patterns across v5-v50 (early-baseline kit shapes); cite ARTIFACT-INLINE per FM-19
  - Agent C — gpt5-reviewer BRIDGE-MODE: adversarial review of A+B (what's missing? what's stale?)
  - Agent D — gpt5-archaeologist BRIDGE-MODE: hotspot/bus-factor on 81-PLANNED + 34-PENDING manifest rows; surface top-10 highest-leverage uninstalled
  - Agent E — architect: ≥2-option ship plan for next 5 install/cite-import waves
- OUTPUT_BUDGET each: 400-600 LOC artifact at `tmp/wave119-agent<X>-<topic>-2026-05-10.md`
- TERMINATION: `on_handoff_to: orchestrator | max_turns: 20 | terminationCondition: on_text_match: "VERDICT:" | on_token_budget_exceeded: 200000`
- Per-call codex budget: 90s default, 120s cap, 180s with reason (Wave 44 FM-17.d defense)
- CADP discipline: pre-dispatch fleet probe (`python Z:/claude/ccc/tools/status.py`) ≥3 accounts <50% session
- Owner: orchestrator dispatches; Mia pre-apply on every returned prescription

**SHIP A4 — anthropics + ccbp deep-dive audit (P1; SOTA reference baseline)**
- Spawn 3-agent team:
  - Agent F — sota-researcher: walk `https://github.com/anthropics` org for new repos since 2026-05-06 (last full audit); GraphQL stars+topics + repo creation dates
  - Agent G — codex-rescue BRIDGE-MODE: `Z:/repos/deps/claude-code-best-practice-shan @ HEAD 64fffd53` deep-dive any new sections/best-practices added; refresh HEAD
  - Agent H — code-reviewer: cross-check sibling `Z:/claude-sota/.claude/rules/` for cite-class drift requiring path-update in this runtime
- Owner: orchestrator dispatches

**SHIP A5 — MCP audit (P1; deepwiki/repomix/serena official setup)**
- Audit 11 active MCPs against official docs:
  - deepwiki: `https://docs.devin.ai/work-with-devin/deepwiki-mcp`
  - repomix: `https://github.com/yamadashy/repomix` HEAD
  - serena: `https://github.com/oraios/serena` HEAD
  - context7: `https://github.com/upstash/context7` HEAD
  - graphiti: `https://github.com/getzep/graphiti` HEAD
  - memory (mcp-memory-service): `https://github.com/doobidoo/mcp-memory-service` HEAD
  - github (anthropic-mcp): `https://github.com/anthropics/mcp` HEAD
  - phoenix: `https://github.com/Arize-ai/phoenix` HEAD
- Spawn 2-agent team:
  - Agent I — sota-researcher: each MCP's official setup vs current `.mcp.json` config; flag drift
  - Agent J — codex-rescue BRIDGE-MODE: foreground+tee deep-dive of each MCP's source code for unused features we're missing
- Owner: orchestrator dispatches

**SHIP A6 — uninstall-risk + INSTALLED-AMBER closure (P2; technical debt)**
- 6 INSTALLED-AMBER rows have deferred fixes; close per INSTALLED-AMBER fix-forward budget (CR-9 2-round expectation)
- 19 STAGED rows have pending HONEST-NON-FINDING gate evidence per CR-12; close OR retire to verified-avoid
- Owner: per-row Pattern A apply

**SHIP A7 — zombie-terminal + container monitoring loop (P2; CR-11 META-process audit)**
- `tools/process_hygiene_audit.py` (sibling cite-import per CR-12 last-resort) — operator-side codex.exe orphan reaper
- Docker container health probe (Phoenix, Langfuse, Grafana, Prometheus, Qdrant) — install-provenance check
- Owner: hook install + cron schedule

## §4 Repos used inventory (cite-class breakdown)

**TIER-1-DIRECT install-class (native install via official-native-channel)**:
- anthropics/claude-code (CC binary; native at `.local/bin/claude.exe` v2.1.138)
- openai/codex (CLI v0.129.0+; native at PATH)
- anthropics/claude-plugins-official (16 plugins enabled)
- everything-claude-code (ECC plugin v2.0.0-rc.1)
- addyosmani/agent-skills (21 engineering-phase skills; 33.5k★)
- mksglu/context-mode (FTS5 knowledge base + agent harness)
- doobidoo/mcp-memory-service v10.51.3 (sqlite_vec storage)
- getzep/graphiti v0.29.0 (FalkorDB temporal-KG)
- arize-ai/phoenix v13.15.0 (OTel observability)
- bytebase/dbhub (queued; demand-pilot per Probe 7.b)
- anthropics/cwc-long-running-agents @ ffd563d6 (5 install-class primitives at `.local/cwc/`)
- yamadashy/repomix MCP
- oraios/serena MCP
- upstash/context7 MCP
- devin/deepwiki MCP
- microsoft/playwright MCP
- agentclientprotocol/claude-agent-acp (queued for ACP host integration)

**TIER-1-DIRECT cite-class (read-only @ `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>`)**:
- claude-agent-sdk-python @ b512f256 (HookMatcher / SubagentStop / _SubagentContextMixin)
- claude-code-best-practice-shan (CCBP) @ 64fffd53 (memory + settings + subagents + cross-model-workflow + RPI + Boris tips)
- everything-claude-code @ 841beea4 (RULES.md cardinal contract)
- andrej-karpathy-skills @ 2c606141 (4 principles + Wiki §5)
- obra/superpowers @ e7a2d164 (verification-before-completion + 14 skills + workflow grammar)
- forrestchang/andrej-karpathy-skills (MIT)
- jj-vcs/jj @ 755b7b7b (worktree workspace evidence)
- libgit2 @ 16cb9c5e (worktree primitive substrate)
- gitoxide @ 24cdbb04 (gix-pathspec Rust impl)
- repomix @ 7dfd2b96 (Pack→Grep→Skill pipeline)
- mattpocock/skills @ HEAD (named-failure-modes pattern)
- LangChain/deepagents @ 95f845d2 (SubAgentMiddleware + atomic-write + recovery-manager)
- AAIF/goose @ 45d8bf81 (ACP host crate; Apache-2.0)
- agentclientprotocol/python-sdk @ df721735 (ACP protocol)
- coder/acp-go-sdk (ACP Go SDK)
- composioHQ/agent-orchestrator @ ab65d123 (TypeScript session manager)
- awesome-agentic-patterns @ ffb42768 (70+ patterns)
- anthropic-cookbook @ 33424c3e (9 production patterns)
- ComposioHQ/awesome-claude-skills (REMOTE-ONLY; 56.9k★)
- gsd-build/get-shit-done @ eeaf9c55 (TÂCHES workflow system)
- gstack/codex (FM-17.d mitigation patterns)

**TIER-3-LOCAL-COMPOSITION cite-import-AMBER from sibling `Z:/claude-sota`**:
- 35 `.claude/rules/` files (cardinal rules + named-failure-modes + harness-fit + parallel-agent-wave + cross-model-consensus + etc.)

## §5 Missing SOTA features audit (gap inventory)

**Tier-1 install gaps (HIGH priority)**:
1. **ACP host integration** (Path B per Wave 6 Agent F gist research) — sss can be operated FROM Zed/JetBrains via `agentclientprotocol/claude-agent-acp` adapter; n=2 named-org convergence (LangChain + AAIF/Linux Foundation)
2. **gitnexus native bindings** (`@ladybugdb/core`) — broken HNF-3; blocks `gitnexus list/impact/context` for change-set analysis
3. **codex T1-T7 hooks** (Tier 1a per manifest) — hook installation pending; CR-3 currently satisfied via Phase 1 bootstrap exception (foreground+tee)
4. **fm17d_stall_detector.py** (sibling cite-import) — currently DISABLED via `FM17_STALL_DETECTOR_DISABLE=1` env (schema-rot 172/172 false-positive); needs schema fix
5. **FM-17.f mitigation** — 1M-context-entitlement subagent dispatch failure blocks BRIDGE-MODE fan-out via Agent() tool
6. **agent-harness-fit-verification.md skill-promotion** — currently rule-tier; promote to skill per cycle-322 (Probe 1-7 reaches sub-class n=5+ per multiple instances)

**Tier-2 install gaps (MEDIUM priority)**:
7. **Langfuse parallel-sink for OTel** — Phoenix-only currently; deferred per Wave 109
8. **OpenTelemetry Collector fan-out** — 1-trace → multi-sink (Phoenix + Langfuse + Grafana + Prometheus)
9. **DBHub MCP for audit-log SQL analytics** — Probe 7.b STUDY-PILOT; requires JSONL → SQLite ETL path
10. **Serena IDE/LSP-grade code intel** beyond current MCP usage
11. **Kits v5-v62 convergence patterns** not yet folded — 47 kit versions × 3-7 patterns each = ~150-300 unfolded SOTA candidates
12. **anthropics + addyosmani new repos** since 2026-05-06 (no fresh org-scan)
13. **Boris Cherny tips refresh** — 6-tips dated 2026-04-16; 30-tips dated 2026-03-30; both >30d stale per Marker Decay corollary

**Tier-3 install gaps (LOW priority; cite-only adoption)**:
14. **smolagents code-as-action paradigm** (REJECT structurally per architectural mismatch; cite as comparison only)
15. **agno-agi service-deployment primitive** (out-of-scope for autonomous /loop)
16. **Mastra event-sourced workflow** (deferred per parallel-sessions.md Novel patterns annex)

## §6 Agent-team dispatch plan (per advanced-agent-team-standing-directive)

Every non-trivial Wave 119 ship spawns 3-5 agent team. **All briefs MUST**:
1. Cite SOTA repos at file:line + HEAD SHA depth (not skim README)
2. Embed `## ARTIFACT-INLINE: tmp/wave119-agent<X>-<topic>-2026-05-10.md` mandate per FM-19
3. Carry per-call codex time-budget mandate (90s default / 120s cap / 180s with reason — Wave 44 FM-17.d defense)
4. Specify `OUTPUT_BUDGET: <max LOC>` AND `TERMINATION: on_handoff_to: orchestrator | max_turns: N | terminationCondition: <predicates>`
5. Pass Mia pre-apply on every returned prescription before Edit (per `mia-pre-apply.md` n=29+ ladder)
6. Include FM-20 path-drift cascade defense (decompose-by-sub-claim Mia probe at synthesis-vs-brief boundary)

**Cross-model gate strategy** (CR-3 + Phase 1 bootstrap exception):
- PRIMARY: orchestrator-side `codex exec --ephemeral -p deep-review-exec --color never < prompt > out 2>&1` foreground+tee
- SECONDARY: BRIDGE-MODE subagent dispatch via Agent() tool (BLOCKED until FM-17.f resolved)
- BACKUP: REAL GPT-5.5 codex CLI subprocess from main session

**CADP discipline** (per parallel-agent-wave.md §Cache-Aware Dispatch Pacing):
- Pre-dispatch fleet probe: `python Z:/claude/ccc/tools/status.py` → require ≥3 accounts <50% session
- Max 3 concurrent unless cache rate ≥50% verified
- Max 5 cumulative dispatches per session arc without intervening status.py probe

## §7 Monitoring + zombie-terminal discipline (CR-11 META-process)

**Persistent monitors** (per Monitor tool with `persistent: true`):
- Codex.exe orphan watcher: `tasklist | grep codex.exe | grep -v eee` — surface dead-parent codex zombies
- Container health: `docker ps --format '{{.Names}}\t{{.Status}}' | grep -v Up` — surface unhealthy containers
- Phoenix UI alive check: `curl -fsS 127.0.0.1:16006 -o /dev/null && echo OK || echo DOWN`
- Disk space: `df -h Z:` — alert at <10GB free

**Audit-action-loop hooks** (per `audit-action-loop.md` Wire/Surface/Close/Re-fire):
- `claude_md_count_audit.py` — PostToolUse Bash(git commit *) async 15s
- `mcp_self_audit.py` — PostToolUse async + SessionEnd async 30s
- `mcp_overhead_audit.py` — config-cost telemetry
- `repo_cite_existence_audit.py` — phantom-cite detection
- `cohort_coverage_audit.py` — 9-cohort discipline drift on adoption commits

## §8 SOTA convergence research targets (deep-dive scope)

**Primary research surfaces** (ranked by leverage):
1. `Z:/claude-sota/docs/outer research/kits/v62/` (latest) — diff vs v61 to find newest convergence
2. `Z:/claude-sota/docs/outer research/kits/v52/` through v62 (11 most-recent) — sota-researcher Agent A scope
3. `Z:/claude-sota/docs/outer research/kits/v5/` through v50 (early baseline) — codex-rescue Agent B scope
4. `Z:/claude-sota/tmp/wave47-grand-catalog-2026-05-06.md` (934 unique repos baseline)
5. `https://github.com/anthropics` org scan since 2026-05-06
6. `https://github.com/shanraisshan/claude-code-best-practice` HEAD refresh from `64fffd53`
7. `https://github.com/openai/codex` CLI v0.129.0+ release notes
8. `https://github.com/obra/superpowers` HEAD refresh from `e7a2d164`
9. `https://github.com/addyosmani/agent-skills` HEAD refresh from `742dca5`
10. `https://docs.devin.ai/work-with-devin/deepwiki-mcp` (deepwiki MCP official setup)
11. `https://github.com/yamadashy/repomix` HEAD (repomix official setup + missing features)

## §9 Concrete next-session entry sequence

```
1. Operator launches eee (verifies banner shows v2.1.138)
2. Operator decides FM-17.f path (Ship A2): /extra-usage OR ENV (g) Sonnet pin
3. Orchestrator commits Wave 118 autoupdate fix (Ship A1) — atomic single-file
4. Orchestrator drafts Wave 119 master-dispatch prompt (5-agent team for Ship A3 kits deep dive)
5. Orchestrator pre-dispatch CADP probe (status.py ≥3 accounts <50%)
6. Orchestrator spawns 5-agent team in single message (parallel)
7. While team runs: orchestrator launches Ship A4 (3-agent anthropics+ccbp audit)
8. As task notifications arrive: Mia pre-apply on each returned prescription
9. Cross-arc synthesis: orchestrator-side close-synthesis.md aggregates A3+A4 verdicts
10. Pattern A apply per codex T1 NEEDS-REVISION on each ship
11. Provenance log entry per ship per CR-11 audit-action-loop Wire/Surface/Close
12. Cron-schedule monitoring loops (Ship A7) for zombie + container watch
```

## §10 Success criteria (cardinal-rule-2 strong-success-criteria)

- All 21 plugins verified active + smoke-probed PASS
- All 11 MCPs verified responding + tool-count enumerated
- Manifest tally shifts: ≥10 PLANNED → STAGED, ≥5 STAGED → INSTALLED in Wave 119
- ≥2 cite-import-AMBER rows promoted to TIER-1-DIRECT install via upstream-parity probe (CR-12)
- FM-17.f decision ratified + implemented OR codified n=2/3
- Wave 118 + Wave 119 audit-trail entries committed in `docs/install-provenance.md`
- Cross-model gate: every Wave 119 ship has codex T1 verdict file at `.claude/state/codex_consult_w119_<topic>_OUT.txt`
- Zero new self-invented content (CR-8 100% adapted-from-SOTA conformance)

## §11 Update triggers for THIS plan

Re-evaluate when:
- Wave 119 close-synthesis surfaces NEW failure-mode candidate (FM-17.g+)
- Anthropics ships new official plugin/marketplace not in current 11-marketplace registry
- Kit v63+ lands at `Z:/claude-sota/docs/outer research/kits/`
- ACP host integration ships (`/plugin install claude-agent-acp`) — flips Anthropic CC ingress topology
- FM-17.f reaches n=3 same-arc — promote to dedicated rule per cycle-322
- Manifest install tally crosses Phase 2 trigger predicate (CR-7) — flip `defaultMode` from current `bypassPermissions` to canonical `default` post-Tier-2-INSTALLED
