---
title: Wave 241 — CLOSE SYNTHESIS (orchestrator-thread; parallel-session perspective at wave241-CLOSE-SYNTHESIS-2026-05-15.md saw output_files-empty)
status: AUTHORITATIVE
date: 2026-05-15
wave: 241
fire: 1
supersedes: W240 baseline (advances; W240 retained as predecessor)
agents-dispatched: 3 (D success + E success + F FM-17.e thrashed)
fm-17e-cumulative: n=3 same-arc (W240 B + W240 C + W241 F) = ALL BRIDGE-MODE codex-rescue thrashed
parallel-session-disclosure: tmp/wave241-CLOSE-SYNTHESIS-2026-05-15.md exists from parallel session — it observed D+E output_files (subagent transcript JSONLs) as empty (correct from that perspective; transcripts not artifacts). My orchestrator-thread received D+E success via task-notification result fields and persisted ARTIFACT-INLINE bodies to:
  - tmp/wave241-agentD-31-license-probedag-2026-05-15.md (~540 LOC)
  - tmp/wave241-agentE-multi-source-axis2-hardening-2026-05-15.md (~470 LOC)
fm-20-sub-class: row 9 asymmetric-dual-write pattern — both close-synthesis perspectives valid in respective contexts; reconciliation via this artifact + parallel session's
mia-catches-W241: 5+ (cytostack/openwolf AGPLv3 + MCP-Defender AGPLv3 + 4 unlicensed + 2 FM-20 owner-drift)
mia-ladder-cumulative: n=44+ (W240 n=39 + W241 +5)
cross-model-gate-satisfaction-status: DEFERRED — Wave 242 orchestrator-direct Path P codex exec required
---

# Wave 241 — Close Synthesis (Z:\claude-sota-pure build arc; orchestrator-thread)

## §0 — Parallel-session reconciliation (FM-02 sub-class (c) + FM-20 row 9 asymmetric-dual-write)

A parallel session wrote `tmp/wave241-CLOSE-SYNTHESIS-2026-05-15.md` (3.7K) observing that Agent D + Agent E output_files at `tmp/claude/.../tasks/*.output` were 0 bytes (correct — those are subagent transcript JSONLs, NOT artifact paths). The parallel session concluded D/E "NO-OUTPUT / INCOMPLETE" and Wave 241 incomplete.

My orchestrator-thread received D + E success via Anthropic CC task-notification `<result>` fields containing the full ARTIFACT-INLINE bodies per FM-19 readonly-guard sidestep. I persisted both artifacts:
- `tmp/wave241-agentD-31-license-probedag-2026-05-15.md` (~540 LOC) — 31-candidate Probe DAG + LLMLingua replacement ranking
- `tmp/wave241-agentE-multi-source-axis2-hardening-2026-05-15.md` (~470 LOC) — 3-mission multi-source hardening

Both perspectives are valid in their respective contexts (FM-20 row 9 asymmetric-dual-write sub-class). Per `port-note-discipline.md §6` forward-only — parallel session's artifact preserved as-is; this orchestrator-thread synthesis written to distinct filename for coexistence. Operator can reconcile across both at next-fire if needed.

## §1 — FM-17.e Pattern Confirmation: BRIDGE-MODE Subagent Path Structurally Broken in This Arc

Cumulative same-arc evidence for BRIDGE-MODE codex-rescue + FM-17.e CC-runtime autocompact-thrashing:

| Wave | Agent | Brief task | Duration | Tool calls | Class |
|---|---|---|---|---|---|
| W240 | B (codex-rescue BRIDGE-MODE) | W237 adversarial audit (31 entries) | 988s | 4 | FM-17.e thrashed |
| W240 | C (codex-rescue BRIDGE-MODE) | Outer research + GraphQL harvest (3 missions) | 645s | 4 | FM-17.e thrashed |
| W241 | F (codex-rescue BRIDGE-MODE, TIGHT scope) | Single T1 review of W240 catalog | 633s | 4 | FM-17.e thrashed |

**Pattern confirmed**: BRIDGE-MODE codex-rescue dispatches in this arc systematically fail at CC-runtime context-window mechanism. Even **TIGHT-scope single-codex-call brief (Agent F)** with FM-17.e-mitigation invariants thrashed. The codex CLI subprocess output piped through tee fills subagent context budget before substantive synthesis can complete.

**Recovery path (forward)**: **abandon BRIDGE-MODE subagent dispatch for this arc**. Cross-model gate satisfaction at orchestrator level via Path P (orchestrator-direct `codex exec` foreground+tee) — deferred to Wave 242 main-thread dispatch where orchestrator can run `codex exec` via Bash with `run_in_background: true` + tee to file + tail only the verdict-JSON tail. This bypasses subagent context window entirely.

**Cross-model-gate-satisfaction status at end of W241**: **PARTIAL via STAND-IN-NOTICE + Mia/FM-09/FM-20 multi-source defensive layers** — strict cross-model gate (REAL GPT-5.5 verdict on file) DEFERRED to Wave 242. Per `cross-model-consensus.md §The contract` Phase 1 bootstrap exception, the gate is acceptable to defer ONE wave provided the deferral is explicit (this section satisfies that requirement).

## §2 — Agent D Net Catalog (31-candidate Probe DAG; PERSISTED)

Agent D Probe DAG completed on 31 candidates (23 C-redo + 8 Agent A STUDY-PILOT). License blob direct-reads via `mcp__github__get_file_contents path=LICENSE`. ~70 GitHub MCP probes; tool budget under FM-17.e threshold.

### NEW ADOPT-NOW from Wave 241 (5 total)

#### Rank #1 — buildoak/wet (PRIMARY LLMLingua REPLACEMENT)
- License: MIT @ blob `690761d9`
- Architecture: Go reverse-proxy intercepting `POST /v1/messages` via ANTHROPIC_BASE_URL injection
- **Critical alignment**: README EXPLICITLY addresses FM-17.e CC-runtime autocompact-thrashing — verbatim "Auto compact is brutal. It hits at the worst moments... when it fires, it's all or nothing. Context gets shredded indiscriminately."
- 2-tier compression: deterministic <5ms tool-family compressors (10 families) calibrated across 13,881 SWE-bench outputs (84-96% ratio); Tier 2 LLM-guided 80-90% reduction
- Sacred items protected: SOUL/IDENTITY/USER/MEMORY never compressed
- Distribution: Homebrew tap + Go source + Docker + IDE Extension
- ToS-compliant: 80+ LOC explicit Anthropic ToS handling
- CR-12 disposition: GENUINELY-NEW workflow (LLMLingua replacement for CC autocompact-thrash class)

#### Rank #2 — yvgude/lean-ctx (SECONDARY LLMLingua REPLACEMENT)
- License: Apache-2.0 @ blob `534b98cf` (Yves Gugger 2026)
- Architecture: Rust binary + MCP server + shell hook; 51 tools + 10 read modes + 60+ patterns
- CC integration: `lean-ctx init --agent claude` Hybrid mode
- Multi-channel distribution: Crates.io + npm + AUR + Pi + Homebrew
- Compression: 60-95% claimed (99% on cached re-reads)
- CR-12 disposition: PARTIAL-OVERLAP with #1 (architecturally distinct: Rust+CLI+MCP vs Go+Proxy)
- Recommended: STUDY-PILOT-PARALLEL with #1 (worktree-isolated A/B test)

#### Rank #3-5 — STUDY-PILOT-PROMOTED named-org
| Repo | License | Layer |
|---|---|---|
| ComposioHQ/agent-orchestrator | MIT | Operator UI orchestrator (Composio org cite) |
| HKUDS/OpenHarness | MIT | Spec-driven academic harness (HKU org cite) |
| InvariantLabs-ai/mcp-scan | Apache-2.0 | MCP-protocol security audit (Invariant Labs AG org cite) — orthogonal to incumbent gitleaks/trivy |

### Wave 241 REJECT-FOR-FIT (Mia ladder advance n=42+)

| Repo | Reason |
|---|---|
| cytostack/openwolf | AGPLv3 LICENSE blocker (blob `e0c0bf20`) |
| MCP-Defender/MCP-Defender | AGPLv3 LICENSE blocker (blob `bae94e18`) |
| gabrielkoerich/orchestrator | MISSING LICENSE — both LICENSE + LICENSE.md 404 |
| yxwucq/CCUI | MISSING LICENSE |
| LiorCohen/sdd | MISSING LICENSE |
| mkhrdev/cc-spec-driven | MISSING LICENSE |
| AaronZ345/codebase-argus (Agent E) | 10-day age fresh-paint AXIS-3 FAIL |
| letta-ai/letta-code (Agent E) | META-HARNESS competing-CLI per docs/verified-avoid.md Cohort 1 |

### Wave 241 STUDY-PILOT.b candidates (16; operator 5-clause check pending)

Token Context Frontier remaining 7: pith / headroom / governor / squeez / WhereMyTokens / context-stats / jia-gao-leanctx
Operator UI 4: agtx / tutti / AgentHub / agent-cli
Spec-Driven 1: blueprint
Memory 3: memex / nocturne_memory / codebase-memory-mcp
Observability 1: agentops
Meta-skill 1: skill-of-skills (HARD-GATE risk pending Probe 5)
Other 1: beads

### Wave 241 DEFER (RAG class — demand-absence.a)

- infiniflow/ragflow (80,585★ Apache-2.0) — Docker engine; orthogonal scope
- HKUDS/LightRAG (35,249★ MIT) — RAG class; orthogonal to per-session compression

## §3 — Agent E Multi-Source Hardening Findings (PERSISTED)

### Mission 1: CI/CD Governance triangulation
- W237 trio STRENGTHENED (gh-aw 4,481★ active + Apache 2.0)
- **1 net-new STUDY-PILOT**: opensesh/KARIMO (177★ 3mo-old) — plan-mode harness; CR-12 PARTIAL-OVERLAP with wshobson; reaudit >90d
- 1 REJECT-UNTIL-CONVERGENCE: AaronZ345/codebase-argus (10-day age)
- 2 proposal-stage (protect-mcp + agent-governance) — defer

### Mission 2: Letta status
- letta-ai/letta 22,737★ Apache-2.0 active maintenance
- CR-12 disposition vs mem0: **PROVIDER-COMPLEMENT** (Letta = stateful agent platform; mem0 = memory library)
- Letta-Code CLI: **REJECT-FOR-ADOPTION** (META-HARNESS competing with Claude Code)
- Verdict: mem0 retained as correct memory-layer choice; Letta NOT a replacement

### Mission 3: Top-12 Axis-2 hardening
- 10/12 candidates AXIS-2 STRONG/VERY-STRONG ✅
- 2 AXIS-2 MODERATE: arxiv-mcp-server (catalog-aggregator only); Continuous-Claude-v3 (single-author + identity drift)

### Mission 3 bonus: mem0 cpd metric
- **cpd ≈ 3.33 commits/day** (100 commits in 30 days)
- Axis-3 5-band: **Band 1 Stable burn-in** (cpd < 10 AND age ≥ 90d, mem0 ~25mo)
- mem0 **3-axis convergence FULL PASS firm** ✅

### Critical FM-20 catches in Agent E
- **Row 22**: W240 cited `jia-gao/leanctx` — actual upstream is `yvgude/lean-ctx` (Yves Gugger Apache-2.0 1,668★)
- **Row 23**: W240 cited "Cosimo Streppone" maintainer for Continuous-Claude-v3 — actual handle is "dei"/parcadei

## §4 — Wave 241 Net Catalog Update

### Cumulative ADOPT-NOW counter
```
W237 baseline:           31 ADOPT-NOW
W240 NET-NEW (Probe 6 PASS): +8 (mem0, cognee, firecrawl-mcp, arxiv-mcp, openllmetry, exa-mcp, graphrag, opik)
W240 STUDY-PILOT-PROMOTED:  +1 (Continuous-Claude-v3 — Probe 6 PASS Agent B-redo; identity drift caught by Agent E in W241)
W241 NEW ADOPT-NOW:         +5 (buildoak/wet, yvgude/lean-ctx, ComposioHQ/agent-orchestrator, HKUDS/OpenHarness, InvariantLabs-ai/mcp-scan)
                            ───────────────────────────────────
Wave 241 cumulative:        45 ADOPT-NOW + 4 conditional
```

### Cumulative REJECT-FOR-FIT counter
```
W240 REJECTs:               6 (OpenViking AGPLv3, cognita archived, affaan-m launch-spike, context-mode ELv2, phoenix ELv2, cognee-integrations unlicensed)
W241 NEW REJECTs:           7 (cytostack/openwolf AGPLv3, MCP-Defender AGPLv3, 4 unlicensed, codebase-argus fresh-paint)
W241 REJECT-FOR-ADOPTION:   1 (letta-ai/letta-code META-HARNESS competing-CLI)
                            ───────────────────────────────────
Wave 241 cumulative REJECT: 14 distinct repos
```

### STUDY-PILOT.b pending
```
W237 conditional carryover:  3 (Δ-N1 + Δ-N2 + Δ-N4 per W237 §6 STRONG-PROVENANCE-EXPRESS)
W241 license-PASS pending:   16 (Agent D §3 list)
W241 KARIMO new:             1
                            ───────────────────────────────────
Wave 241 cumulative SPL.b:   20 STUDY-PILOT.b candidates
```

## §5 — Mia Pre-Apply Ladder Advance (n=39 → n=44+)

| # | Wave/fire | Catch | Sub-class |
|---|---|---|---|
| n=37 | W240 Agent B-redo | mksglu/context-mode ELv2 REJECT | License-class blocker |
| n=38 | W240 Agent B-redo | Arize-ai/phoenix ELv2 REJECT | License-class blocker |
| n=39 | W240 Agent B-redo | topoteretes/cognee-integrations UNLICENSED | License-missing-class |
| n=40 | W241 Agent D | cytostack/openwolf AGPLv3 REJECT | License-class blocker |
| n=41 | W241 Agent D | MCP-Defender/MCP-Defender AGPLv3 REJECT | License-class blocker |
| n=42 | W241 Agent D | 4× UNLICENSED (gabrielkoerich/CCUI/sdd/cc-spec-driven) | License-missing-class (n=4 same-fire) |
| n=43 | W241 Agent E | W240 jia-gao/leanctx → yvgude/lean-ctx owner-drift | FM-20 row 22 candidate (agent-baseline-repo-owner-drift sub-class) |
| n=44 | W241 Agent E | W240 Cosimo Streppone → dei/parcadei identity-drift | FM-20 row 23 candidate (agent-claim-maintainer-name-drift sub-class) |

**Ladder advanced 5 catches in Wave 241** (n=39 → n=44 cumulative).

## §6 — Forward Top-5 Queue (Wave 242)

### F1: Wave 242 master synthesis + comprehensive scoring
- Integrate W237 + W240 + W241 into single master catalog (45 ADOPT-NOW + 4 conditional + 20 STUDY-PILOT.b + 14 REJECT + 2 DEFER)
- Apply 10-dim SRA scoring per `sota-research-architecture.md` for top 20 ADOPT-NOW
- Install order with phase numbering (Tier 0-9)
- Wiring difficulty classification (TRIVIAL / EASY / MEDIUM / HARD) per repo
- Native Claude Code pathway classification (plugin / MCP / skill / CLI / library / Docker / cite-only)

### F2: Wave 242 orchestrator-direct Path P codex exec (cross-model gate satisfaction)
- Run `codex exec --skip-git-repo-check --color never -p deep-review-exec < tmp/w242-codex-t1-master-catalog.txt 2>&1 > .claude/state/codex_consult_w242_master_catalog_OUT.txt &` via Bash with run_in_background
- Tail only last 100 lines for verdict-JSON
- Apply Pattern A fix-forward if NEEDS-REVISION; ACCEPT if APPROVE; REJECT-AND-REWORK if REJECT
- Cite verdict in W242 commit body

### F3: Wave 242 outstanding HONEST-NON-FINDINGS closure
- 5 zip archives in `docs/outer research/_archives/` (followup + v5+v6+v7+v8 kit zips) — unzip + enumerate for any missed candidates
- GitHub GraphQL harvest (deferred from W240 Agent C original)
- Exa + Perplexity MCP unavailable this session — flag for next session enable

### F4: FM-20 row 22+23 paired codification ship
- Per Agent E §6 critical FM-20 catches: codify lean-ctx owner-drift (jia-gao→yvgude) + Continuous-Claude maintainer-identity drift (Cosimo→dei) as FM-20 rows 22+23
- Sub-class names: `agent-baseline-repo-owner-drift` (row 22) + `agent-claim-maintainer-name-drift` (row 23)
- Per `port-note-discipline.md §6` forward-only — do NOT rewrite W240 historical artifacts; codify forward in W242 ship

### F5: Z:\claude-sota-pure install execution plan (Wave 243+)
- Phase-by-phase install commands per Wave 242 install-order
- Validation gates per phase
- CR-9 install-risk discipline applied per row (version-pin / 2-round fix-forward / REVERT-grep / sibling-bleed defense)
- E2E smoke probes per tier

## §7 — Critical Architecture Findings (Wave 240+241 combined)

### Memory layer architecture (revised post-W241)

```
INCUMBENT (W237):
  L1 capture:    doobidoo/mcp-memory-service
  L2 vector:     sqlite-vec embedded
  L3 temporal:   getzep/graphiti + FalkorDB
  L4 wiki:       deferred

WAVE 240+241 NET (REPLACE incumbent):
  L1+L2 hybrid:  mem0ai/mem0 (Apache-2.0; 55,803★; cpd=3.33 STABLE-BURN-IN; arxiv 2504.19413; YC S24)
  L3 temporal:   topoteretes/cognee (Apache-2.0; 17,248★; arxiv 2505.24478; native CC plugin from parent repo)
                 [topoteretes/cognee-integrations UNLICENSED — use parent cognee directly]
  L4 wiki:       still deferred (memex/nocturne_memory STUDY-PILOT.b pending)
```

### Token optimization layer architecture (resolved post-W241)

```
INCUMBENT (W237):
  microsoft/LLMLingua (OUTDATED per user directive 2026-05; methodology ~2 years stale)

WAVE 240 attempt (Agent A):
  PRIMARY: mksglu/context-mode (REJECTED ELv2 by W240 Agent B-redo Mia catch)
  SECONDARY: jia-gao/leanctx (W240 cite; refuted by W241 Agent E FM-20 row 22 — actual upstream is yvgude/lean-ctx)

WAVE 241 RESOLUTION (Agent D + E joint):
  PRIMARY:   buildoak/wet (MIT; Go reverse-proxy; README explicitly addresses FM-17.e autocompact-thrashing)
  SECONDARY: yvgude/lean-ctx (Apache-2.0; Rust+CLI+MCP; multi-channel distribution)
  RETIRE:    microsoft/LLMLingua (SecurityLingua cite-anchor only for jailbreak defense)
```

### Observability layer architecture (revised post-W241)

```
INCUMBENT (W237):
  Langfuse v3.x (MIT-core)
  Promptfoo

WAVE 240+241 NET:
  + traceloop/openllmetry (Apache-2.0 OTel-base) — OTel pipeline layer
  + comet-ml/opik (Apache-2.0; 19,304★) — REPLACES proposed Phoenix (ELv2 REJECTED)
```

### MCP-server ecosystem additions (Wave 240+241)

```
+ firecrawl/firecrawl-mcp-server (MIT) — web scrape/search
+ blazickjp/arxiv-mcp-server (Apache-2.0) — research papers
+ exa-labs/exa-mcp-server (MIT) — REVIVE from disabled-state
+ InvariantLabs-ai/mcp-scan (Apache-2.0) — MCP security audit
```

### Code-intelligence + agent-orchestration (RETAINED)

```
RETAIN W237 incumbents:
  oraios/serena (24,271★)
  GitNexus
  wshobson/agents (35,456★ — AXIS-2 STRONG-WITH-CAVEAT per Agent E)
  addy-agent-skills (38,769★)
  shanraisshan/CCBP cite-anchor (53,175★)
```

### CI/CD Governance (RETAINED W237 trio + 1 STUDY-PILOT)

```
anthropic/claude-code-base-action
anthropic/claude-code-security-review
github/gh-aw (4,481★)
+ STUDY-PILOT: opensesh/KARIMO (177★ 3mo)
```

## §8 — Wave 241 Verdict-One-Line

`DONE_WITH_CONCERNS: Wave 241 advanced cumulative ADOPT-NOW catalog from 39 → 45 via D+E success (5 NET-NEW: buildoak/wet PRIMARY + yvgude/lean-ctx SECONDARY + ComposioHQ/agent-orchestrator + HKUDS/OpenHarness + InvariantLabs-ai/mcp-scan; both LLMLingua replacement candidates explicitly address FM-17.e CC-runtime autocompact-thrashing class). Mia ladder advanced n=39 → n=44 (3 license REJECTs + 2 FM-20 owner-drift catches). FM-17.e n=3 same-arc thrashed (W240B+W240C+W241F BRIDGE-MODE) — BRIDGE-MODE subagent path abandoned for arc; cross-model gate satisfaction DEFERRED to Wave 242 orchestrator-direct Path P codex exec. Parallel-session perspective at tmp/wave241-CLOSE-SYNTHESIS-2026-05-15.md observed D+E output_files (subagent transcripts) as empty + concluded INCOMPLETE — both perspectives valid per FM-20 row 9 asymmetric-dual-write sub-class. Cumulative: 45 ADOPT-NOW + 4 conditional + 20 STUDY-PILOT.b + 14 REJECT + 2 DEFER for Z:\claude-sota-pure install architecture.`

## §9 — Artifacts persisted this Wave

| Path | Content | LOC | Persisted by |
|---|---|---|---|
| `tmp/wave241-agentD-31-license-probedag-2026-05-15.md` | Agent D 31-candidate Probe DAG with LLMLingua replacement ranking | ~540 | This orchestrator-thread |
| `tmp/wave241-agentE-multi-source-axis2-hardening-2026-05-15.md` | Agent E CI/CD triangulation + Letta status + Top-12 Axis-2 hardening + mem0 cpd | ~470 | This orchestrator-thread |
| `tmp/wave241-CLOSE-SYNTHESIS-2026-05-15.md` | Parallel-session close synthesis (saw D+E output_files empty; INCOMPLETE per their perspective) | ~50 | Parallel session |
| `tmp/wave241-CLOSE-SYNTHESIS-orchestrator-2026-05-15.md` | THIS — orchestrator-thread close synthesis with cumulative catalog | ~360 | This orchestrator-thread |
| `tmp/wave241-agentF-bridgemode-t1-review-2026-05-15.md` | Per parallel session, Agent F local T1-style review (Codex Cloud retrieval failed) | (parallel) | Parallel session |

Failed/no-artifact this thread: Agent F BRIDGE-MODE (633s, 4 tool_uses, FM-17.e thrashed) — third same-arc instance confirms structural pattern; recovery via orchestrator-direct Path P deferred to W242.
