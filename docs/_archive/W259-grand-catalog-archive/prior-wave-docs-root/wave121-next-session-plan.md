---
title: Wave 121 Next-Session Plan — SOTA architecture v3 + advanced agent team dispatch with Pattern A v2 discipline
status: AUTHORITATIVE
date: 2026-05-09
agent: orchestrator
supersedes: docs/wave120-next-session-plan.md
verdict: 13 ships queued; v65 zip extraction P0; 3 new rules + Pattern A v2 round discipline codified; Wave 119 codex T1 cycle 100% CLOSED
---

# Wave 121 Next-Session Plan

## §0 Fact-Forcing Gate v3 (paraphrased operator standing directive 2026-05-09)

**Standing intent**: maximally advanced automation runtime where every code/reference/hook/setting/install is SOTA-cited or natively installed from upstream SOTA repos. Zero self-invention. Always launch advanced agent team. Always e2e with REAL GPT-5.5 BRIDGE-MODE codex with FULL SOURCE-CODE DEEP-DIVE PERMISSIONS (clone if needed). Auto-proceed within authorized SOTA-research-then-install workflow. Continuous architecture audit + gap-resolution. Monitor zombie terminals + system status.

**Operating constraints** (CR-1 through CR-12 + 3 new rules — deprecation-discipline + SRA + launch-discipline):
- Every edit cites TIER-1-DIRECT upstream OR `effective_tier=TIER-3-LOCAL-COMPOSITION` per `citation-discipline.md` rule #8 lattice
- Every install via official-native-channel (no `Z:/repos/deps/` install-import; cite-only)
- Every fan-out follows `advanced-agent-team-standing-directive.md` (≥2 GPT-5.5 BRIDGE-MODE agents, file:line cites in briefs, ARTIFACT-INLINE per FM-19, Mia pre-apply, OUTPUT_BUDGET + TERMINATION)
- Every commit gated by codex T1 cross-model review (Phase 1 bootstrap exception via foreground+tee)
- Every deploy follows launch-discipline 6-axis D1 + 3 INVARIANTS + D2 monitoring window
- Every deprecation follows 5-question gate; ADVISORY default
- Every adoption decision satisfies SRA D1-D10
- **Pattern A v2 multi-round discipline (NEW Wave 121 codification)**: codex T1 NEEDS-REVISION may require ≥2 round-trips when first-round Pattern A apply itself triggers re-review (e.g., codex catches OVER-cite in the fix); each round atomic per ONE-LOGICAL-UNIT-PER-FIRE within the same logical ship

## §1 Current state snapshot (post-Wave 120 fire-2 close 2026-05-09 12:00)

| Surface | Count | Notes |
|---|---|---|
| **Cardinal rules** | **12** | CR-1 cite / CR-2 Karpathy / CR-3 cross-model / CR-4 RPI / CR-5 install-priority / CR-6 fresh-from-github / CR-7 graduated-unleash / CR-8 full-SOTA-content / CR-9 install-risk / CR-10 research-first / CR-11 META-process / CR-12 upstream-install-priority |
| **Active rules** | **36** | unchanged since Wave 120 fire-1 |
| **Active agents** | 9 | architect / code-reviewer / cwc / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / sota-researcher / verifier |
| **Plugins enabled** | 21 | claude-plugins-official (16) + addy-agent-skills + codex + ECC + context-mode |
| **Marketplaces registered** | 11 | + anthropic-agent-skills + claude-community + healthcare/financial-services/life-sciences verticals |
| **MCP servers active** | 11 | context7, deepwiki, github, gitnexus, graphiti, memory, phoenix, playwright, repomix, serena |
| **Manifest install rows** | **278** | unchanged since Wave 120 |
| **Kit versions installed (extracted)** | **54** (was 47 in wave120) | +7 net additions; **v63+v64+v65 zip STILL UNEXTRACTED** in installed runtime |
| **Cliproxy stack** | 3-tier OPERATIONAL | CLIProxyAPI v6.10.9 + cnighswonger v3.5.4 (UPGRADED Wave 120 fire-1) + cpa-usage-keeper v1.5.3 |
| **Native CC binary** | v2.1.138 | unchanged since Wave 118 |
| **ENABLED Claude OAuth fleet** | **3** (was 7 file-shape) | per Wave 120 fire-2 ENABLED-only count discipline |
| **Wave 119 codex T1 prescriptions** | **4 of 4 CLOSED** ✅ | Wave 120 fire-1 (F-3) + fire-2 (F-4) + Wave 119 Ship CL-NEW-FIX-1 (F-1+F-2) |
| **Pending Wave 120 ships** | 3 | A1+A2 (commits) + CL-AUDIT-REFRESH-2 |

## §2 SOTA architecture v3 — extends v2 with Pattern A multi-round discipline (NEW Wave 121)

A primitive (repo / pattern / hook / setting / install) is SOTA in this runtime when ALL hold (per Wave 121 v3 codification — adds Q axis for codex T1 multi-round discipline):

### §2.1-§2.6 Source / Convergence / Harness-fit / Install-risk / Deploy / Deprecation axes

(Unchanged from Wave 120 v2 — see `docs/wave120-next-session-plan.md §2`)

### §2.7 Codex T1 Pattern A multi-round discipline axis (Q1-Q3 NEW Wave 121)

Per Wave 120 fire-2 lesson: first-round Pattern A apply MAY itself trigger codex T1 re-review (codex catches OVER-cites or semantic gaps in the FIX). Ship CL-4-FIX example: round-1 file-shape count → codex caught NOT-enabled-account semantically → round-2 JSON-parse + ENABLED gate.

- (Q1) **Pattern A round-1**: apply codex T1 prescribed_edits verbatim
- (Q2) **Codex T1 retroactive re-review** (per codex-t1-gate WARN if Edit fires post-Edit): consult prompt cites round-1 Edit + asks for round-2 verdict
- (Q3) **Pattern A round-2** (if round-1 verdict NEEDS-REVISION on the fix itself): apply round-2 prescribed_edits in same logical ship; document both rounds in single provenance entry

**Stop condition**: round-3 NEEDS-REVISION on the SAME fix triggers Outcome B REVERT-AND-REMOVE per `closed-loop-recursive-narrowing.md` (3 rounds = layered-correction anti-pattern).

A primitive that fails ANY axis is NOT-SOTA in this runtime. SOTA verdict requires multi-dimensional convergence per SRA D1-D10 + 6 axes (Source / Convergence / Harness-fit / Install-risk / Deploy / Deprecation) + Pattern A multi-round discipline.

## §3 Wave 121 ship sequence (13 ships priority-ranked)

### Tier P0 — Close prior loops + extract v63-v65 SOTA convergence (5 ships)

**SHIP A1** — Commit Wave 118 autoupdate fix
- Files: `.claude/settings.json` (autoUpdatesChannel removed + minimumVersion 2.1.132) + verdict file `codex_consult_w118_autoupdate_path_OUT.txt`
- Cite: codex T1 W118 NEEDS-REVISION conf=0.91 Pattern A applied
- Owner: orchestrator direct atomic commit

**SHIP A2** — Commit Wave 119 + Wave 120 deep-dive arc atomically
- Files: `CLAUDE.local.md` ENV (g)+(h) + `tools/eee.ps1` lines 401-431+528-590 + `docs/fm17f-deep-dive-2026-05-09.md` + `docs/cliproxy-eee-sota-audit-2026-05-09.md` + `docs/wave119-next-session-plan.md` + `docs/wave120-next-session-plan.md` + `docs/wave121-next-session-plan.md` (this) + `docs/install-provenance.md` Wave 119+120 entries + `.claude/state/codex_consult_w118+w119+w120*.txt+OUT.txt` (5+ verdict files)
- Cite: codex T1 W118+W119+W120 NEEDS-REVISION conf=0.90-0.92 Pattern A applied (Wave 119 cycle 100% CLOSED 4-of-4)
- Owner: orchestrator direct atomic commit (commit-commands plugin OR git CLI)

**SHIP V65-EXTRACT** — Extract v63 + v64 + v65 zips to runtime kits dir (P0; Wave 118 task #62 + Wave 120 carry-over)
- Mechanism: `cd Z:/claude-sota-installed/docs/outer\ research/ && for v in v63 v64 v65; do unzip -d kits/ claude_code_sota_${v}_*.zip; done`
- v65 has 24 MD + 6 agents + 7 skills per task #62 description; v63 + v64 have similar comprehensive content
- Cite: zip files at `Z:/claude-sota-installed/docs/outer research/claude_code_sota_v6{3,4,5}_*.zip` (already in runtime; just unextracted)
- Owner: orchestrator direct atomic Bash unzip + manifest entry append

**SHIP CL-AUDIT-REFRESH-2** — update `docs/cliproxy-eee-sota-audit-2026-05-09.md` §1.3 with state-outside-repo WORK_DIR + Ship CL-NEW-FIX-1 closure status + cnighswonger v3.5.4 upgrade
- Forward-only doc update per port-note-discipline §6
- Owner: orchestrator direct

**SHIP A0-MONITORING** — Activate persistent monitors per Wave 120 plan §7.1 (zombie + container + cliproxy 3-tier health)
- 5 Monitor tool launches with `persistent: true`:
  - Codex orphan watcher: `while true; do tasklist | grep -i codex.exe | grep -v eee; sleep 30; done`
  - Container health: `docker ps --format '{{.Names}}\t{{.Status}}' | grep -v Up`
  - Phoenix UI alive: `curl -fsS 127.0.0.1:16006 -o /dev/null && echo OK || echo DOWN`
  - Cliproxy 3-tier: `for p in 19801 8317 8079; do echo -n "$p: "; curl -fsS -o /dev/null -w "%{http_code}" http://127.0.0.1:$p/; done`
  - Disk space: `df -h Z: | tail -1`
- Owner: orchestrator direct (Monitor tool with `persistent: true`)

### Tier P1 — Architecture refinement (5 ships)

**SHIP A3** — Kits v52-v65 deep dive convergence (5-agent advanced team after V65-EXTRACT)
- Per `advanced-agent-team-standing-directive.md` invariants:
  - Agent A — sota-researcher: line-by-line audit kits v60-v65 (most recent 6 versions); Probe DAG 1-7 vs current install state
  - Agent B — codex-rescue BRIDGE-MODE: archaeology v52-v59 (8 versions); ARTIFACT-INLINE per FM-19
  - Agent C — gpt5-reviewer BRIDGE-MODE: adversarial review of A+B (what's missing? what's stale?)
  - Agent D — gpt5-archaeologist BRIDGE-MODE: hotspot/bus-factor on 81-PLANNED + 34-PENDING + 19 STAGED manifest rows; surface top-10 highest-leverage uninstalled
  - Agent E — architect: ≥2-option ship plan for next 5 install/cite-import waves
- OUTPUT_BUDGET each: 400-600 LOC artifact at `tmp/wave121-agent<X>-<topic>-2026-05-10.md`
- TERMINATION: `on_handoff_to: orchestrator | max_turns: 20 | on_token_budget_exceeded: 200000`
- Per-call codex budget: 90s default / 120s cap / 180s with reason (FM-17.d defense)
- CADP discipline: pre-dispatch fleet probe (`python Z:/claude/ccc/tools/status.py`) ≥3 accounts <50% session
- **Path D activation required**: `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` in CLAUDE.local.md ENV (h) + restart eee per fm17f-deep-dive Path D activation
- Owner: orchestrator dispatches; Mia pre-apply on every returned prescription

**SHIP A4** — anthropics + ccbp + obra/superpowers deep-dive audit (3-agent team)
- Agent F — sota-researcher: walk `https://github.com/anthropics` org for new repos since 2026-05-06
- Agent G — codex-rescue BRIDGE-MODE: `Z:/repos/deps/claude-code-best-practice-shan @ HEAD 64fffd53` deep-dive any new sections; refresh HEAD via git fetch
- Agent H — code-reviewer: cross-check sibling `Z:/claude-sota/.claude/rules/` for cite-class drift
- Owner: orchestrator dispatches

**SHIP A5** — MCP audit (deepwiki/repomix/serena/context7/graphiti/memory/phoenix official setup verification — 2-agent team)
- Audit 11 active MCPs against official docs per Wave 120 plan §A5 (full TIER-1-DIRECT verification)
- Owner: orchestrator dispatches

**SHIP A6** — INSTALLED-AMBER + STAGED row closure (per CR-9 install-risk discipline)
- 6 INSTALLED-AMBER rows have deferred fixes; close per CR-9 2-round expectation
- 19 STAGED rows have pending HONEST-NON-FINDING gate evidence per CR-12; close OR retire to verified-avoid
- Owner: per-row Pattern A apply

**SHIP A8** — gitnexus native bindings recovery (HNF-4 closure per task #56+#60)
- Operator-side investigation: `npm install -g @ladybugdb/core@latest && gitnexus init claude-sota`
- Verify lbugjs.node integrity post-install + probe `gitnexus list` for `claude-sota` indexed-repo state
- Owner: operator decision (manual investigation session); orchestrator can spawn sota-researcher

### Tier P2 — Operational improvements (3 ships)

**SHIP A9** — codex T1-T7 hooks Tier 1a install (per CR-3 mechanical enforcement; closes Phase 1 bootstrap exception)
- Install codex T1-T7 hooks per `cross-model-consensus.md §T1-T7 lifecycle table`
- Wire in `.claude/settings.json` per `layered-gates-architecture.md §5 Layer 2`
- CR-7 Phase 2 trigger: when Tier 1a + Tier 1b + Tier 1c all INSTALLED with smoke-probe PASS, flip `defaultMode: "auto"` per CCBP-canonical
- Owner: 3-agent team (sota-researcher + architect + codex-rescue BRIDGE-MODE)

**SHIP A10** — ACP host integration (per Wave 120 §8.3 Wave 121 candidate)
- Per Axis-1 4-org convergence (Anthropic + LangChain + AAIF/Linux Foundation + Coder)
- `/plugin install agentclientprotocol/claude-agent-acp` (1763★ TypeScript MIT, official ACP-org)
- Enables sss to be operated FROM Zed/JetBrains via ACP
- Owner: 2-agent team (sota-researcher + architect)

**SHIP A11** — fm17d_stall_detector schema fix (re-enable hook)
- Currently DISABLED via `FM17_STALL_DETECTOR_DISABLE=1` (172/172 schema-rot false-positive)
- Fix SubagentStop input-schema parsing (script expects stop_reason / tool_uses fields that CC v2.1.119 / v2.1.138 don't emit at top level)
- Owner: codex-rescue BRIDGE-MODE foreground+tee per Path P

## §4 Repos used inventory (TIER-1-DIRECT comprehensive — Wave 121 baseline)

(Unchanged from Wave 120 §4 except cnighswonger drift v3.5.3 → v3.5.4 ✅ closed)

### §4.1 Native install (`Z:/claude-sota-installed/.local/bin/` or marketplace)

15 native installs (CC binary v2.1.138 / codex CLI v0.129.0+ / 16 plugins via 11 marketplaces / context-mode / mcp-memory v10.51.3 / graphiti v0.29.0 / phoenix v13.15.0 / **CLIProxyAPI v6.10.9** / **cnighswonger v3.5.4 ✅ Wave 120 fire-1** / **cpa-usage-keeper v1.5.3 ✅ Wave 119 Ship CL-NEW-FIX-1** / cwc-long-running-agents @ ffd563d6) + 2 queued (bytebase/dbhub demand-pilot / agentclientprotocol/claude-agent-acp Wave 121 SHIP A10)

### §4.2 TIER-1-DIRECT cite-only (read at `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>`)

20 repos (claude-agent-sdk-python @ b512f256 / CCBP @ 64fffd53 / ECC @ 841beea4 / karpathy @ 2c606141 / superpowers @ e7a2d164 / forrestchang/karpathy / jj-vcs @ 755b7b7b / libgit2 @ 16cb9c5e / gitoxide @ 24cdbb04 / repomix @ 7dfd2b96 / mattpocock / deepagents @ 95f845d2 / goose @ 45d8bf81 / acp/python-sdk @ df721735 / acp-go-sdk / agent-orchestrator @ ab65d123 / awesome-agentic-patterns @ ffb42768 / anthropic-cookbook @ 33424c3e / gsd-build/get-shit-done @ eeaf9c55 / gstack/codex)

### §4.3 TIER-3-LOCAL-COMPOSITION cite-import-AMBER (sibling claude-sota — 36 rules ported)

Per CR-12 last-resort: 36 rules in `Z:/claude-sota-installed/.claude/rules/` cite-import-AMBER from `Z:/claude-sota/.claude/rules/` per Section 14.5

## §5 Missing SOTA features (Wave 121 gap audit — refresh from Wave 120)

### Tier-1 install gaps (HIGH priority — DECREASED 2 since Wave 120)

1. ~~cnighswonger v3.5.3 → v3.5.4~~ ✅ CLOSED Wave 120 fire-1
2. ~~eee.ps1 auths/ probe-path correction~~ ✅ CLOSED Wave 120 fire-2
3. **v63 + v64 + v65 kit zips UNEXTRACTED** (P0; Wave 121 SHIP V65-EXTRACT) — STILL pending
4. **ACP host integration** (Wave 121 SHIP A10)
5. **gitnexus native bindings recovery** (Wave 121 SHIP A8)
6. **codex T1-T7 hooks Tier 1a install** (Wave 121 SHIP A9)
7. **fm17d_stall_detector schema fix** (Wave 121 SHIP A11)
8. **Path D activation for fan-out Waves** (Wave 121 SHIP A3 candidate)

### Tier-2 install gaps (MEDIUM priority)

9. **Langfuse parallel-sink for OTel** — Phoenix-only currently
10. **OpenTelemetry Collector fan-out** — 1-trace → multi-sink
11. **DBHub MCP for audit-log SQL analytics** — Probe 7.b STUDY-PILOT
12. **Serena IDE/LSP-grade code intel** beyond current MCP usage
13. **anthropics + addyosmani + obra/superpowers new repos** since 2026-05-06 (Wave 121 SHIP A4)
14. **Boris Cherny tips refresh** — 6-tips dated 2026-04-16; 30-tips dated 2026-03-30

### Tier-3 install gaps (LOW priority; cite-only adoption)

15-17. smolagents (REJECT) / agno-agi (out-of-scope) / Mastra (deferred)

## §6 Agent-team dispatch plan with GPT-5.5 source-code-deep-dive permissions

(Unchanged from Wave 120 §6 — Path P PRIMARY + Path D SECONDARY for fan-out Waves)

## §7 Wave 121 architectural improvements (NEW)

### §7.1 Pattern A multi-round discipline codification

Promote the §2.7 axis (Q1-Q3) to either:
- (a) New rule `pattern-a-multi-round-discipline.md` — promote at n=3 (currently n=1 from Wave 120 fire-2; need 2 more occurrences)
- (b) Extend existing `codex-t1-fix-forward-pattern.md §Pattern A` with multi-round semantics

Decision: defer to n=3 codification per `codification-threshold.md` cycle-322 jurisdiction.

### §7.2 ENABLED-account semantics audit across other advisory probes

Wave 120 fire-2 surfaced general anti-pattern: file-shape count ≠ semantic-validity count. Audit other advisory probes for similar gaps:
- `mcp_self_audit.py` — does it count enabled-vs-disabled MCPs?
- `cohort_coverage_audit.py` — does it count active-vs-archived cohorts?
- `repo_cite_existence_audit.py` — does it gate on file-existence-only or content-validity?

Owner: sota-researcher subagent dispatch (Wave 121 sub-task)

### §7.3 SOTA architecture v3 (this plan §2.7) codification

Wave 120 fire-2 added Q1-Q3 axis. When v3 stabilizes (n=3 multi-round Pattern A applies), codify in CLAUDE.md as cardinal-rule-13 (`SOTA-architecture-v3-multi-axis-convergence-with-pattern-A-multi-round`).

## §8 Concrete next-session entry sequence

```
1. Operator launches eee (verifies banner shows v2.1.138 + cliproxy 3-tier active)
2. Orchestrator commits A1+A2 atomically (Wave 118 + Wave 119+120 close)
3. Orchestrator executes V65-EXTRACT (P0; unzip v63+v64+v65 to kits/)
4. Orchestrator activates A0-MONITORING (5 persistent Monitor tool launches)
5. Orchestrator executes CL-AUDIT-REFRESH-2 (cliproxy audit doc refresh per Wave 120 closures)
6. Operator decision: activate Path D (CLAUDE_CODE_DISABLE_1M_CONTEXT=1) + restart eee for fan-out Wave A3
7. Orchestrator pre-dispatch CADP probe (status.py ≥3 accounts <50%)
8. Orchestrator spawns 5-agent team in single message (Wave 121 SHIP A3 kits deep dive — now includes v63-v65 since extraction complete)
9. While team runs: orchestrator launches Wave 121 SHIP A4 (3-agent anthropics+ccbp+superpowers audit) in parallel
10. As task notifications arrive: Mia pre-apply on each returned prescription
11. Cross-arc synthesis: orchestrator-side close-synthesis.md aggregates A3+A4 verdicts
12. Pattern A apply per codex T1 NEEDS-REVISION on each ship (multi-round v3 discipline if first-round triggers re-review)
13. Provenance log entry per ship per CR-11 audit-action-loop Wire/Surface/Close
14. Continue per priority queue: A5 MCP audit / A6 INSTALLED-AMBER closure / A8 gitnexus / A9 codex T1-T7 hooks / A10 ACP / A11 fm17d
```

## §9 Success criteria (cardinal-rule-2 strong-success-criteria)

- All 21 plugins verified active + smoke-probed PASS
- All 11 MCPs verified responding + tool-count enumerated
- v63 + v64 + v65 kits extracted (47 → 65+ kit versions in runtime)
- Manifest tally shifts: ≥10 PLANNED → STAGED, ≥5 STAGED → INSTALLED in Wave 121
- ≥2 cite-import-AMBER rows promoted to TIER-1-DIRECT install via upstream-parity probe (CR-12)
- Wave 121 audit-trail entries committed in `docs/install-provenance.md` per CR-11
- Cross-model gate: every Wave 121 ship has codex T1 verdict file at `.claude/state/codex_consult_w121_<topic>_OUT.txt` per CR-3 Phase 1 bootstrap exception
- Zero new self-invented content (CR-8 100% adapted-from-SOTA conformance)
- Zombie-terminal monitoring loop active per SHIP A0-MONITORING
- 3 new rules dogfood validated (deprecation-discipline + SRA + launch-discipline) — multiple ships each
- ENABLED-account semantics audit complete (§7.2) — surfaces all file-shape vs semantic-validity gaps

## §10 Update triggers for THIS plan

Re-evaluate when:
- Wave 121 close-synthesis surfaces NEW failure-mode candidate (FM-17.g+ OR new FM class)
- Anthropics ships new official plugin/marketplace not in current 11-marketplace registry
- Kit v66+ lands at `Z:/claude-sota/docs/outer research/kits/`
- ACP host integration ships (`/plugin install claude-agent-acp`) — flips Anthropic CC ingress topology
- Manifest install tally crosses Phase 2 trigger predicate (CR-7) — flip `defaultMode: "auto"`
- Pattern A multi-round v3 reaches n=3 — promote to rule per cycle-322
- New rule promoted from feedback-memory to rule-tier per `codification-threshold.md`
- Operator declares operator-decision ship (e.g., `/extra-usage` purchase) that changes Path P/D/X/S ranking

## §11 Wave 119 + Wave 120 close summary

**Wave 119 codex T1 prescription cycle 100% CLOSED ✅**:
- F-1 (HIGH) eee.ps1 v1.5.2 → v1.5.3 cpa path bump — Wave 119 Ship CL-NEW-FIX-1
- F-2 (HIGH) WORK_DIR data continuity — Wave 119 Ship CL-NEW-FIX-1
- F-3 (MEDIUM) cnighswonger v3.5.3 → v3.5.4 drift — Wave 120 Ship CL-CN-1
- F-4 (MEDIUM) eee.ps1 auths probe-path + ENABLED-only count — Wave 120 Ship CL-4-FIX (2-round Pattern A)

**Wave 120 fires close**:
- Fire 1: cnighswonger v3.5.4 npm install + restart (PID 103408 :19801 /health=ok 6ms)
- Fire 2: eee.ps1 advisory v2 (Pattern A round-2 codex re-review applied; ENABLED-account semantics)

**Stack health post-Wave-120**: claude.exe v2.1.138 / cnighswonger v3.5.4 :19801 / CLIProxyAPI v6.10.9 :8317 / cpa-usage-keeper v1.5.3 :8079 / Phoenix :14317+:16006 / 36 rules / 9 agents / 21 plugins / 11 marketplaces / 11 MCPs / 644 SKILL.md / 278 manifest rows / 3 ENABLED Claude OAuth accounts / 4 disabled per CR-7 7d rotation
