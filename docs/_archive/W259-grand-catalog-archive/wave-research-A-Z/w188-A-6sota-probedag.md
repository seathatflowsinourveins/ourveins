---
title: W188 P0a Agent A — Probe-DAG-7 audit on 7 SOTA candidates
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-13
agent: sota-researcher (single-model orchestrator-direct dispatch; effective model = Opus 4.7 per `CLAUDE.local.md` ENV (f) commented out per W119 FM-17.f DEPRECATED)
wave: W188 fire 0
stand_in_notice: agent ran under Opus 4.7[1m] orchestrator-direct dispatch since ENV (f) commented OUT (DEPRECATED Path S per W119 FM-17.f). Cross-model gate at orchestrator-level remains UNSATISFIED (single-model audit only) — orchestrator MUST run Path P codex T1 ratification per cross-model-consensus.md §The contract Phase 1 bootstrap exception.
---

# Probe-DAG-7 audit: 7 SOTA candidates surfaced by Z:/repos/deps/ grep

**Audit scope**: 7 repos surfaced from `Z:/repos/deps/` matching HUD / monitor / router / guide classes per /goal P0a directive. CR-12 6-class disposition per `.claude/rules/cardinal-rule-12-upstream-install-priority.md`.

**Cross-model gate**: orchestrator-direct dispatch — single-model audit. Per CR-3 Phase 1 bootstrap exception, **orchestrator MUST run Path P codex T1 ratification** before any verdict propagates to install commit.

**Incumbent map** (verify CR-12 against):
- LLM-router → CLIProxyAPI v7.0.2 (`Z:/repos/deps/CLIProxyAPI` round-robin + switch-project + :18317 + Management Center SPA)
- HUD/statusline → ccstatusline@2.2.12 (wired `.claude/hooks/scripts/context_window_statusline.sh:15`; 3-line config at `.claude/ccstatusline/settings.json`)
- MCP-router → native `.mcp.json` registration (11 active servers per W188 probe; 12 post-ccusage add)
- PreCompact → intelligent-compact@claude-settings (W164 F38a — wire fix W188 P0b)
- Multi-agent → cwc-long-running-agents + agent-teams plugin (per `docs/sota-installed-manifest.md` §17)
- ROI/telemetry → ccusage@18.0.11 (statusline subcommand wired + @ccusage/mcp@18.0.11 added W188 P0c)

---

## Convergence-gate stars-and-age tabulation

| Repo | Stars | Created | Last push | License | Age | cpd | Axis-3 band |
|---|---|---|---|---|---|---|---|
| hoangsonww/Claude-Code-Agent-Monitor | 356 | 2026-03-05 | 2026-05-14 | MIT | ~70d | 354/70≈5.06 | **FAST-CHURN-BAND** (<100d) |
| anthropics/claude-code-monitoring-guide | 298 | 2025-07-29 | 2025-07-29 | None | ~289d | 1/289≈0.003 | DORMANT (1 commit, no activity) |
| musistudio/claude-code-router | 33,933 | 2025-02-25 | 2026-03-04 | MIT | ~444d | 355/444≈0.80 | STABLE-BURN-IN |
| yanweiyue/masrouter | 124 | 2025-02-16 | 2025-10-29 | Apache-2.0 | ~454d | 13/454≈0.03 | DORMANT/research-paper |
| mcp-router/mcp-router | 2,009 | 2025-03-22 | 2026-01-24 | Sustainable-Use-License (NOT permissive) | ~419d | 160/419≈0.38 | STABLE-BURN-IN but LICENSE-BLOCKER |
| aurelio-labs/semantic-router | 3,508 | 2023-10-30 | 2026-05-13 | MIT | ~929d | 371/929≈0.40 | **SUSTAINED-ACTIVE-MAINTENANCE** (firm) |
| jarrodwatts/claude-hud | 22,677 | 2026-01-02 | 2026-05-13 | MIT | ~131d | 544/131≈4.15 | **ACTIVE-ITERATION** (borderline; cpd below 10 floor → STABLE-BURN-IN edge) |

---

## Aggregate verdict table

| # | Repo | CR-12 disposition | Final verdict | Primary blocker |
|---|---|---|---|---|
| 1 | hoangsonww/Claude-Code-Agent-Monitor | PARTIAL-OVERLAP | REJECT-FOR-FIT.a | Probe 5 web-UI mode + Probe 7.a demand-absence vs ccstatusline+ccusage+intelligent-compact triad |
| 2 | anthropics/claude-code-monitoring-guide | CITE-CLASS-CANONICAL | CITE-PATTERN-ONLY | (guide-class; no install needed) |
| 3 | musistudio/claude-code-router | DUPLICATE-FUNCTIONALITY | REJECT-FOR-FIT | Probe 7 DUPLICATE vs CLIProxyAPI v7.0.2 incumbent (W185 dogfood evidence) |
| 4 | yanweiyue/masrouter | CITE-CLASS-CANONICAL | CITE-PATTERN-ONLY | (research code ACL 2025; future PATTERN-EXTRACT candidate for multi-agent role-allocation) |
| 5 | mcp-router/mcp-router | DUPLICATE-FUNCTIONALITY + LICENSE-BLOCKER | REJECT-FOR-FIT | Probe 6 Sustainable Use License non-permissive + Probe 7 DUPLICATE vs native .mcp.json |
| 6 | aurelio-labs/semantic-router | PARTIAL-OVERLAP/PATTERN-EXTRACT | CITE-PATTERN-ONLY | Probe 5 no insertion point in CC request path; pre-LLM routing not needed |
| 7 | jarrodwatts/claude-hud | PARTIAL-OVERLAP (superset on tool/agent/todo axes) | STUDY-PILOT-PATTERN-EXTRACT | Probe 5 HARD-GATE `AskUserQuestion` setup at `commands/setup.md:3` incompatible with autonomous /loop |

**Net adoption count**: 0 INSTALL / 5 CITE-PATTERN-ONLY / 0 STUDY-PILOT-NARROW / 1 STUDY-PILOT-PATTERN-EXTRACT / **0 ADOPT-NOW**. Result is HONEST-NON-FINDING per `synthesis-layer-verify.md §Reporting categories` — all 7 candidates fail Probe DAG against existing incumbents or have license/mode blockers; the audit IS the deliverable per saturation discipline.

---

## CR-12 lattice summary

- **GENUINELY-NEW**: 0
- **DUPLICATE-FUNCTIONALITY**: 2 (#3 claude-code-router vs CLIProxyAPI; #5 mcp-router vs native .mcp.json)
- **PARTIAL-OVERLAP**: 3 (#1 monitor vs ccstatusline+ccusage+intelligent-compact; #6 semantic-router vs CC native routing; #7 claude-hud vs ccstatusline)
- **PROVIDER-COMPLEMENT**: 0
- **ECOSYSTEM-IMPORT**: 0
- **CITE-CLASS-CANONICAL**: 2 (#2 monitoring-guide ROI/OTel cite; #4 masrouter ACL 2025 pattern cite)

---

## Per-repo Probe-DAG-7 detail

### 1. hoangsonww/Claude-Code-Agent-Monitor (Real-time monitoring dashboard — Node.js + React + SQLite + WebSocket + MCP)

- **Cite**: `Z:/repos/deps/Claude-Code-Agent-Monitor/README.md` @ HEAD `fbbddaab473fe4aeb44cd3ffd72c734575ca4936` (2026-05-09) + 356★ MIT
- **Probe 5 mode-harness-shape**: **FAIL-FOR-FIT** — Express+React web UI server requiring browser; NOT compatible with autonomous /loop mode
- **Probe 7 demand-gate 7.b 5-clause check FAILS** — incumbent triad (ccstatusline + ccusage + intelligent-compact) covers all listed analytics use cases via CLI primitives + `.claude/state/*.jsonl` audit-trail
- **Axis 1 FAIL**: hoangsonww single-individual maintainer
- **Final verdict**: REJECT-FOR-FIT.a

### 2. anthropics/claude-code-monitoring-guide (ROI measurement guide — single-file + docker-compose for Prometheus+OpenTelemetry)

- **Cite**: `Z:/repos/deps/claude-code-monitoring-guide/README.md` @ HEAD `02777441f2a3fa38a187b57872ca9dc5e0411b48` (2025-07-28) + Kashyap Murali author + 298★
- **Probe 4-6**: all PASS (anthropics org maintainer; no install needed; guide-class)
- **Probe 7**: cite-class for OTel/Prometheus ROI patterns when needed
- **Axis 3 DORMANT**: 1 commit / 289d age
- **Final verdict**: CITE-PATTERN-ONLY (guide reference for future cost/ROI work)

### 3. musistudio/claude-code-router (LLM router with multi-provider + dynamic /model switch — 33,933★)

- **Cite**: `Z:/repos/deps/claude-code-router/README.md` @ HEAD `e270dea523b8ac025ab9b7b0708dc170efa52d8a` (2026-03-04) + MIT
- **Probe 7 DUPLICATE**: DUPLICATE-FUNCTIONALITY of CLIProxyAPI v7.0.2 incumbent. Both route Anthropic-CC-requests to multiple providers. CLIProxyAPI is established incumbent at port :18317 with W185 OAuth dogfood evidence.
- **Final verdict**: REJECT-FOR-FIT (kiss-dry-yagni Must-Never #4)

### 4. yanweiyue/masrouter (ACL 2025 multi-agent LLM routing research paper code — 124★)

- **Cite**: `Z:/repos/deps/masrouter/README.md` @ HEAD `e005f7696fe0c0412563f6cd67f4cd3712fa2822` (2025-10-29) + Apache-2.0 + arxiv:2502.11133 ACL 2025
- **Probe 2 FAIL**: research benchmark codebase requiring GSM8K/HumanEval/MATH/MBPP/MMLU datasets; not CC-installable
- **PATTERN-extract candidate**: cascaded controller network for collaboration-mode determination + role allocation + LLM routing — could inform future multi-agent orchestration designs if cwc + agent-teams reveal gap
- **Final verdict**: CITE-PATTERN-ONLY

### 5. mcp-router/mcp-router (Desktop MCP server management Electron app — 2,009★)

- **Cite**: `Z:/repos/deps/mcp-router/README.md` @ HEAD `a213cd330d1abef0144b19a84b64ddd9b7f974aa` (2026-01-24) + Electron + "Sustainable Use License" (non-permissive)
- **Probe 6 HARD-FAIL**: Sustainable Use License at `LICENSE.md:1-10` — NOT permissive; structural adoption blocker (mirror of openviking AGPLv3 STRUCTURAL adoption blocker n=2 pattern from Memory/RAG audit)
- **Probe 7 DUPLICATE**: vs native `.mcp.json` registration
- **Final verdict**: REJECT-FOR-FIT

### 6. aurelio-labs/semantic-router (Semantic decision-making layer for LLMs/agents — 3,508★ MIT Python)

- **Cite**: `Z:/repos/deps/semantic-router/README.md` @ HEAD `371cbf737d255a1ec81874a1dda4738e7e19879a` (2026-03-12) + MIT
- **Probe 5 FAIL-FOR-FIT**: designed for "decision-making layer for LLMs and agents" (pre-LLM-call routing). In sss runtime, Claude Code itself handles tool routing + Anthropic decides model. No insertion point in the request path
- **Axis 3 SUSTAINED-ACTIVE-MAINTENANCE firm PASS** (929d + 371 commits)
- **Final verdict**: CITE-PATTERN-ONLY (cite if multi-backend routing arc surfaces)

### 7. jarrodwatts/claude-hud (CC plugin: context bar + tools + agents + todo HUD — 22,677★ MIT)

- **Cite**: `Z:/repos/deps/claude-hud/README.md` @ HEAD `70ecdbf30752edbd4ed391926080b9224db4662c` (2026-05-07) + MIT
- **Superset of ccstatusline** on 3 net-new axes: active tools display / running agents / todo progress (claude-hud parses transcript JSONL; ccstatusline uses native stdin JSON only)
- **Probe 5 HARD-GATE CONCERN**: `claude-hud:setup` command uses `AskUserQuestion` interactive primitive (8 occurrences at `commands/setup.md:3,277,308 + configure.md:3,100,102,186`); structurally identical to W137 F1 iter-92 mattpocock setup-matt-pocock-skills HARD-GATE rejection per `ahfv-seven-sub-classes.md` n=4 cohort table
- **Probe 7.b 5-clause check**: BORDERLINE-PASS for 3 net-new elements (live-tools/live-agents/live-todos) BUT Probe 5 HARD-GATE blocks autonomous /loop install
- **Axis 1 FAIL**: jarrodwatts single-individual maintainer — STRONG-PROVENANCE-EXPRESS predicate FAILS
- **Final verdict**: STUDY-PILOT-PATTERN-EXTRACT (cite transcript-JSONL-parsing pattern for future ccstatusline enhancement OR live-tool-status hook design without HARD-GATE setup)

---

## Compliance disclosure

- **Probe DAG 1-7**: all 7 candidates audited per `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` 4-axis structure
- **Cross-model gate (CR-3 Phase 1 bootstrap exception)**: orchestrator must run **Path P codex T1 ratification** before any verdict propagates to install commit. This audit is single-model orchestrator-direct dispatch
- **Multi-source ≥4 gate**: only #2 (guide) + #4 (ACL 2025 paper) carry research-cite trail; rest are GitHub-stars + repo-content single-source. No ADOPT/STUDY-PILOT-NARROW verdicts emitted, so ≥4 gate not triggered (CITE-PATTERN-ONLY and REJECT-FOR-FIT verdicts do not require ≥4 corroboration)
- **Mia pre-apply** per `mia-pre-apply.md`: 4-class incumbent map verified via direct file reads
- **FM-09 codex-rescue blind-spot specialization** does NOT apply — this is single-stage sota-researcher dispatch, not codex-rescue first-stage verdict

## Cite-trail (key verdicts)

**REJECT-FOR-FIT #3 claude-code-router DUPLICATE**:
1. `Z:/repos/deps/claude-code-router/package.json:2` (`@musistudio/claude-code-router` npm)
2. `Z:/claude-sota-installed/docs/sota-installed-manifest.md` (CLIProxyAPI v7.0.2 incumbent rows + W184 R2 dogfood evidence)
3. `Z:/claude-sota-installed/.claude/rules/kiss-dry-yagni.md` Must-Never #4

**REJECT-FOR-FIT #5 mcp-router LICENSE**:
1. `Z:/repos/deps/mcp-router/LICENSE.md:1-10` ("Sustainable Use License")
2. `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` Probe 6 (permissive-license whitelist)
3. `Z:/claude-sota-installed/.mcp.json` (11→12 active MCP servers — duplicate detection)

**STUDY-PILOT-PATTERN-EXTRACT #7 claude-hud**:
1. `Z:/repos/deps/claude-hud/README.md:99` ("uses Claude Code's native statusline API")
2. `Z:/repos/deps/claude-hud/commands/setup.md:3` (verbatim `allowed-tools: Bash, Read, Edit, AskUserQuestion` — Probe 5 HARD-GATE evidence)
3. `Z:/claude-sota-installed/.claude/hooks/scripts/context_window_statusline.sh:15` + `.claude/ccstatusline/settings.json` (ccstatusline incumbent)
4. `Z:/claude-sota-installed/.claude/rules/ahfv-seven-sub-classes.md` mode-harness-shape table iter-92 mattpocock + iter-93 wshobson HARD-GATE n=4 cohort

## Forward queue / next-fire candidates

- **W188 P0b done**: Path P codex T1 ratification on .mcp.json + settings.json edits fired (Pattern B HNF — JSON parse PASS + paths verified + ccusage-mcp confirmed)
- **W189+ Pattern-extract candidates** (no install this fire):
  - claude-hud transcript-JSONL parsing pattern → cite for ccstatusline enhancement when live-tool-status surfaces a demand
  - masrouter cascaded controller network → cite for multi-agent role-allocation when cwc + agent-teams reveal gap
  - claude-code-monitoring-guide OTel/Prometheus → cite for org-level ROI dashboard if operator requests
- **FM-20 row 18 candidate**: this audit's STAND-IN-NOTICE (single-model orchestrator-direct) — if propagated without Path P codex T1 ratification, cascade-class drift per `fm20-path-drift-cascade.md`

**VERDICT-TABLE-FINAL**: 0 ADOPT-NOW / 0 STUDY-PILOT-NARROW / 1 STUDY-PILOT-PATTERN-EXTRACT (claude-hud) / 4 CITE-PATTERN-ONLY / 2 REJECT-FOR-FIT. HONEST-NON-FINDING saturation verdict per `synthesis-layer-verify.md §Reporting categories` — all 7 candidates blocked by Probe 5 mode-harness mismatch / Probe 6 license / Probe 7.a demand-absence vs incumbents.
