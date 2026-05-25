---
title: Wave 105 close-synthesis — 3-agent SOTA gap audit fan-out
date: 2026-05-08
agents: A (token-eff) + B (arch-opt) + C (feature-coverage)
status: AUTHORITATIVE-CANDIDATE
fire: Wave 105 — advanced agent team workflow
---

# Wave 105 — 3-Agent SOTA Gap Audit Synthesis

## Origin

User mandate (verbatim, multi-paragraph): "improve your research architecture... continue sota agent team workflow... give me all the repos you used, how many features you are using, any sota feature you are missing... all the repos that related to token efficiency and architectural optimization... we need full automation with advanced whole lifecycle workflow... gpt5.5 fully unleashed e2e before commit"

Per advanced-agent-team-standing-directive Wave 24-D + CADP rule 2 max-3 concurrent: 3 agents dispatched in parallel covering orthogonal axes.

## Per-agent output

### Agent A (`a5f36c8956ad79081`) — token-efficiency repo discovery

- **Verdict**: 0 ADOPT-NOW + 2 STUDY-PILOT + 3 REJECT-FOR-FIT + 5 honorable-mention REJECT
- **Headline (HONEST-NON-FINDING-ADJACENT)**: User hypothesis "many SOTA repos not yet adapted" PARTIALLY-REFUTED at fleet layer. eee already saturates 5 token-eff axes (account-rotation / cache-fix / sandbox / analytics / codebase-pack)
- **Genuine gap**: Bash-output-filter axis at PreToolUse hook layer (orthogonal)
- **Pilot candidates** (pick ONE):
  - **rtk-ai/rtk** @ `e4c3ed7d` — ~1k★ MIT TIER-2 named-author Patrick Szymkowiak; 100+ commands; 60-90% token savings; **Windows Native = CLAUDE.md injection only (WSL needed for full hook auto-rewrite)**
  - **edouard-claude/snip** @ `6102ed76` — 218★ MIT Go rtk-fork-successor with YAML-extensible filter DSL; Win-native better than rtk
- Convergence-gate: rtk + snip + tamp = Axis-1 ≥3-distinct-orgs PASS for shell-output-filter pattern
- **🚨 LOAD-BEARING PILOT GATE**: WSL trade-off (operator decision required)
- Artifact: `tmp/wave105-agentA-token-eff-repos-2026-05-08.md` (~530 LOC)

### Agent B (`ad6afaa7060698f0a`) — architectural-optimization + lifecycle-automation

- **Verdict**: 1 ADOPT-NOW + 3 STUDY-PILOT + 1 DEFER-RE-AUDIT + 5 HNF
- **Cross-model gate disclosure** (per cross-model-consensus §Env-funneled subagent stand-in mandate): Agent ran as Sonnet stand-in per CLAUDE.local.md ENV (g) → codex T1 e2e MANDATORY before any P0 install per CR-3
- **ADOPT-NOW**: **UK AISI inspect_ai** (2,028★ MIT; UK AI Security Institute; 18mo mature) — eval framework
  - **Mia OVER #20 caught**: Agent B claimed "STAGED Section 15 PLANNED → pip install inspect-ai" but manifest §15 grep returned ZERO matches. **Actual state**: inspect_ai v0.3.205 ALREADY INSTALLED in shared venv `Z:\venvs\claude\`. Action: manifest §15 doc-drift fix + verify shared-venv path works for eee — NO new install needed
- **3-way observability bench-pilot** (pick ONE per kiss-dry-yagni Must-Never #4):
  - langfuse (26,837★ MIT YC W23) — most stars, hosted+OSS
  - phoenix (Arize-AI Elastic-2.0 OpenInference auto-instrumentation) — auto-trace
  - openlit (2,424★ Apache-2.0 OTel-NATIVE) — vendor-neutral
- **DEFER-RE-AUDIT-AT-90D**: Citadel (548★ JS, created 2026-03-20) — convergence Axis-3 FAIL (FAST-CHURN-BAND cpd>10 + age<100d); 4-of-6 primitives DUPLICATE existing eee infrastructure (campaign-persistence / parallel-worktrees / lifecycle-hooks / circuit-breaker)
- **5 HNF rejections**: ralphy (duplicate ralph-loop), wshobson-agents (cite-only), ruvnet-ruflo (META-HARNESS cohort risk), oh-my-claudecode (axis-3 unverified), claude-code-router (use-class mismatch)
- Artifact: `tmp/wave105-agentB-arch-opt-repos-2026-05-08.md`

### Agent C (`adea003df2f012855`) — eee feature-coverage audit

- **Verdict**: 17 INSTALLED + 4 STAGED + 6 reference repos audited; ~285 upstream features / ~98 configured / **~34% coverage**; **12 P0/P1 high-leverage gaps**
- **4 Mia OVER catches against my dispatch brief** (FM-20 path-drift cascade defense at synthesis layer):
  1. Brief: "CLIProxyAPI active port 8317" → REFUTED (no process listening; eee not currently launched)
  2. Brief: "Graphiti MCP wiring queued" → REFUTED (clone exists; .mcp.json entry absent)
  3. Brief: "cwc primitives INSTALLED-DORMANT" → REFUTED (track-read.sh + verify-gate.sh + kill-switch.sh + steer.sh + commit-on-stop-throttled.sh all WIRED)
  4. Brief: "memory MCP PLANNED" → REFUTED (manifest §4 stale; .mcp.json shows INSTALLED with sqlite_vec)
- **🔴 P0 gaps** (5): CLIProxyAPI not running / Graphiti MCP unwired / context-mode 3-of-4 hooks missing / mcp-memory automation gap / **safety_guard.py + agent_plan_readonly_bash_guard.py UNWIRED** (LOAD-BEARING CR-7 SAFETY FLOOR GAP)
- **🟡 P1 gaps** (3): repomix MCP not in .mcp.json / cpa-usage-keeper F-C.1+F-C.2 deferred / token-eff primitives uncoded (ENABLE_TOOL_SEARCH / alwaysLoad / skillOverrides / paths-glob)
- **HNF (already saturated)**: superpowers 14/14 / cwc 5/5 wired / frontend-design+pyright+claude-md-mgmt intentional 0% op / deepwiki 9/13 paywalled / ralph-loop intentional bypass
- Artifact: `tmp/wave105-agentC-feature-coverage-audit-2026-05-08.md` (~595 LOC)

## Cross-agent synthesis (Mia probe verified)

**Strategic insight**: Agent A says "almost everything new is duplicate"; Agent C says "many existing primitives are under-configured"; Agent B says "1 mature eval framework + observability gap to address". Combining the 3 verdicts:

**Sequencing principle**: per cardinal-rule-5 (install-priority) + kiss-dry-yagni Must-Never #4 (no duplicate-functionality) — **fix existing under-configured primitives BEFORE adding new tools**. Agent C's 12 P0/P1 gaps in already-installed primitives take priority over Agent A's STUDY-PILOT or Agent B's ADOPT-NOW.

## Forward queue — prioritized ship sequencing

### TIER-1 (P0 SAFETY — must fire first)

**Ship 2N-batch3-A** — wire safety_guard.py + agent_plan_readonly_bash_guard.py as PreToolUse:Bash hooks
- Closes CR-7 Phase 3 destination safety floor gap (current `bypassPermissions` mode lacks mechanical enforcement)
- Per CR-3 codex T1 e2e MANDATORY before commit
- CR-9 install-risk MEDIUM (touches PreToolUse hook chain; reversible via revert)
- Mia probed L74 `_comment_allow` mentions both scripts but NEITHER has hook entry — only documentation reference

### TIER-2 (P0 FEATURE COMPLETENESS)

**Ship 2N-batch3-B** — wire graphiti MCP in .mcp.json
- 12+ Graphiti tools currently invisible despite backend FalkorDB UP at port 16379
- Per `.local/graphiti/mcp_server/main.py` entrypoint exists; needs FalkorDB env config (NEO4J_URI + OPENAI_API_KEY for embeddings)
- CR-9 install-risk LOW (additive .mcp.json entry; reversible)

**Ship 2N-batch3-C** — wire missing context-mode hooks (PreToolUse + PostToolUse + PreCompact)
- Currently only context-mode-cache-heal.mjs at L273 wired
- Plugin manifest enumerates 4 hooks; eee uses 1
- CR-9 install-risk LOW-MEDIUM (additive PreToolUse increases edit-path latency)

### TIER-3 (DOC-DRIFT corrections — CR-9 LOW)

**Ship 2N-batch3-D** — manifest §4 (memory MCP PLANNED→INSTALLED) + §15 (add inspect_ai INSTALLED-VIA-SHARED-VENV row)
- Doc-only forward correction per port-note-discipline §6
- Closes Agent C P0-4 + Agent B Mia OVER #20

### TIER-4 (NEW PRIMITIVE — needs codex T1 e2e per CR-3)

**Ship 2N-batch3-E** — repomix MCP install in .mcp.json
- ~70% tree-sitter compression unused
- Pack→Grep→Skill pipeline unautomated per Agent C P1-5

### TIER-5 (OPERATOR DECISION REQUIRED — bench-pilot)

**Ship 2P-pilot** — observability 3-way bench-pilot (langfuse vs phoenix vs openlit)
- Operator must decide based on existing telemetry surface preference
- Cardinal-rule-9 install-risk MEDIUM (new MCP/Docker dependency)

**Ship 2A-pilot** — rtk vs snip Bash-output-filter pilot (Wave 105 Agent A)
- Operator must decide WSL vs Windows-native trade-off
- Pilot ONE not BOTH per kiss-dry-yagni Must-Never #4

## CR compliance check (Wave 105 close)

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | All 3 agents cited TIER-1-DIRECT/TIER-2 sources at file:line + HEAD-SHA |
| CR-3 (cross-model consensus) | ⚠️ DEFERRED | Agent B explicitly disclosed Sonnet STAND-IN per ENV (g); codex T1 e2e MANDATORY before TIER-1 ship fires |
| CR-5 (install-priority) | ✅ | Sequencing principle prioritizes existing-primitive configuration before new tool install |
| CR-9 (install-risk) | ✅ | Per-ship CR-9 risk classification + 2-round fix-forward expectation budgeted |
| CR-10 (research-first) | ✅ | 3-agent fan-out drove this synthesis BEFORE any speculative install |
| CR-11 (META-process) | ✅ | Mia pre-apply on Agent A inspect_ai claim + Agent C 4-OVER-catch verification + this synthesis |
| FM-20 (path-drift cascade) | ✅ | Mia probed every actionable claim against runtime state before citing into next-fire ship brief |

## Cumulative Mia OVER ladder (Wave 97-105)

n=20 cumulative Mia OVER catches (#19 Wave 105 from Agent C → safety hooks unwired despite brief claim; #20 Wave 105 from Agent B → inspect_ai STAGED claim refuted by manifest grep)

## Wave 105 — 26th ship in this session arc

| Wave | Agent/Ship | Status |
|---|---|---|
| 104-2N-batch2 | `67620bd` plugin-dev enable | LANDED |
| 104-2N-batch2-prov | `ee65220` provenance | LANDED |
| 105-fan-out-A | Agent A token-eff verdict | CLOSED |
| 105-fan-out-C | Agent C feature-coverage verdict | CLOSED |
| 105-fan-out-B | Agent B arch-opt verdict | CLOSED |
| 105-Y-stage1 | Ship 2Y staging probe | CLOSED (no commit) |
| **105-close** | **THIS synthesis MD** | **CLOSED** |

## Update triggers

Re-evaluate Wave 105 ship queue when:
- Operator decides on rtk vs snip vs DEFER for Bash-output-filter pilot
- Operator decides on observability 3-way pick (langfuse/phoenix/openlit)
- Wave 105 Agent A WSL-vs-Native-Win trade-off resolved
- New cardinal-rule cite-anchor SHA bumps land (Ship 2Y-stage2 cycle)
- Any P0 gap in Agent C's 5-list closes via subsequent ship

## Outstanding queue (post Wave 105 close)

- Ship 2N-batch3-A (P0 SAFETY) — wire safety_guard.py + agent_plan_readonly_bash_guard.py
- Ship 2N-batch3-B (P0 FEATURE) — wire graphiti MCP
- Ship 2N-batch3-C (P0 HOOKS) — wire missing context-mode hooks
- Ship 2N-batch3-D (DOC-DRIFT) — manifest §4 + §15 fixes
- Ship 2N-batch3-E (NEW MCP) — repomix MCP install
- Ship 2P-pilot — observability bench-pilot (operator decision)
- Ship 2A-pilot — rtk vs snip bench-pilot (operator decision)
- Ship 2Y-stage2 — cite-anchor migration with codex T1 e2e
- Ship 2Z — karpathy cite-anchor SRA D4 hard-fail downgrade
- Ship 2L / 2B / 2C from earlier queue
