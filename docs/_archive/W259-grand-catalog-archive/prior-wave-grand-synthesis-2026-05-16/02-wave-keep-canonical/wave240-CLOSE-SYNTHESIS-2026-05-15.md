---
title: Wave 240 — CLOSE SYNTHESIS (3 agents: A complete + B-redo complete + C-redo complete; 2 BRIDGE-MODE FM-17.e thrashed)
status: AUTHORITATIVE
date: 2026-05-15
wave: 240
fire: 1
supersedes: W237 baseline (advances; W237 retained as predecessor)
agents-dispatched: 5 (A success / B FM-17.e / B-redo success / C FM-17.e / C-redo success)
fm-17e-instances: 2 (same-arc; n=4+ firm cumulative w/ Wave 112 Ship A1)
mia-catches: 3 (context-mode ELv2 REJECT + phoenix ELv2 REJECT + cognee-integrations UNLICENSED REJECT)
cross-model-gate-satisfaction-status: PENDING (Wave 241 Path P orchestrator-direct codex exec queued)
---

# Wave 240 — Close Synthesis (Z:\claude-sota-pure build arc)

## §0 — Method + Cross-Model-Gate Status

**Cross-model-gate satisfaction**: PENDING — original Agents B + C were BRIDGE-MODE codex-rescue but both hit FM-17.e CC-runtime autocompact-thrashing (988s + 645s wall-clock, 0 artifact each). Re-dispatched Sonnet stand-ins (B-redo + C-redo) per `cmc-env-funneled-disclosure.md §Orchestrator integration discipline`. **Phase 1 bootstrap exception per CR-3**: orchestrator-side `codex exec` foreground+tee dispatch queued for Wave 241 to satisfy cross-model gate at arc level.

**Stand-in penetration disclosure**: 3 of 3 surviving artifacts ran as Sonnet stand-in per CLAUDE.local.md ENV (f) `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`. True GPT-5.5 penetration this wave = 0% (target was 67% via 2 BRIDGE-MODE dispatches, both thrashed).

## §1 — FM-17.e Pattern Recognition (n=2 same-arc; n=4+ firm cumulative)

| Agent | Duration | Tool calls | Class | Recovery applied |
|---|---|---|---|---|
| Agent B (orig) — codex-rescue BRIDGE-MODE GPT-5.5 | 988s | 4 | FM-17.e CC-runtime autocompact-thrashing | Re-dispatched as Sonnet stand-in sota-researcher with HALVED scope |
| Agent C (orig) — codex-rescue BRIDGE-MODE GPT-5.5 | 645s | 4 | FM-17.e CC-runtime autocompact-thrashing | Re-dispatched as Sonnet stand-in sota-researcher with HALVED scope |

**Empirical pattern**: BRIDGE-MODE codex-rescue dispatches with foreground+tee codex CLI subprocess + large W237 audit scope (31 entries) → codex CLI output stream overflows CC-runtime context window before substantive work completes. Both dispatches returned literal "Autocompact is thrashing" notification per `fm17-subagent-fleet-depletion.md §FM-17.e signature`.

**FM-17.e mitigation success (n=2 recoveries)**: both re-dispatched as Sonnet stand-in scope-narrowed sota-researcher; both completed successfully (B-redo 311s/25 tools/12 candidates probed; C-redo 250s/9 tools/183 files enumerated).

**Forward queued**: Wave 241 must satisfy CR-3 cross-model consensus via orchestrator-direct codex `exec --skip-git-repo-check --color never -p deep-review-exec` foreground+tee on this synthesis (Path P per `ctff-patterns-cd.md §Pattern D`).

## §2 — Mia pre-apply REJECT catches (n=3; ladder advance to n=37+)

Per `Z:\claude-sota-installed\.claude\rules\mia-pre-apply.md` apply-boundary discipline, Agent B-redo caught 3 load-bearing REJECTs on Agent A's prescriptions BEFORE propagation to Wave 241 brief:

### Catch #1 — `mksglu/context-mode` ELv2 REJECT
- **Agent A claim**: "PRIMARY REPLACEMENT for LLMLingua; ADOPT-NOW; 14,825★; native CC plugin"
- **Mia probe**: Probe 6 LICENSE direct-blob read via `mcp__github__get_file_contents path=LICENSE` returned blob SHA `15259beb88afda1c8790d41cdf948c9e0e4f211d` containing **Elastic License 2.0 (ELv2)**
- **REJECT-FOR-FIT** per `layered-gates-architecture.md §4.1` permissive-license-only invariant. ELv2 restrictions: (1) no hosted/managed service distribution; (2) license-key non-circumvention; (3) trademark restrictions; (4) license auto-terminates on violation. Source-available ≠ OSS-permissive.
- **Impact**: LLMLingua REPLACEMENT strategy regressed. Of Agent A's 3-tier replacement (context-mode PRIMARY / leanctx SECONDARY / LLMLingua-retire), only leanctx (226★ MIT) survives. **Wave 241 MUST re-search token-optimization layer.**

### Catch #2 — `Arize-ai/phoenix` ELv2 REJECT
- **Agent A claim**: "STUDY-PILOT — Arize is named-T2 org (AI observability specialist); good complement"
- **Mia probe**: Probe 6 LICENSE direct-blob read returned blob SHA `23d3aa7c871a4eb153186073e3d2b72d586f64be` containing **Elastic License 2.0 (ELv2)**
- **REJECT-FOR-FIT** per same invariant. CR-12 6-class disposition = DUPLICATE-FUNCTIONALITY (opik covers same observability axis with permissive Apache-2.0).

### Catch #3 — `topoteretes/cognee-integrations` UNLICENSED
- **Agent A claim**: "DEDICATED Claude Code plugin at topoteretes/cognee-integrations/integrations/claude-code" — implied vendor-able
- **Mia probe**: `mcp__github__get_file_contents path=LICENSE` returned MISSING (no LICENSE file in repo)
- **REJECT FOR VENDORING** — default US copyright "all rights reserved" applies; license NOT inherited from parent `topoteretes/cognee` Apache-2.0. **Adoption alternative**: use parent `topoteretes/cognee` Apache-2.0 directly + write a fresh local integration derivative.

**Mia ladder advance**: per `mia-pre-apply.md` §Empirical evidence ladder (n=36 cumulative pre-W240), these 3 catches advance to **n=39+ cumulative**.

## §3 — Hardened ADOPT-NOW Roster (Wave 240 net catalog)

**W237 baseline**: 31 ADOPT-NOW + 3 conditional
**Wave 240 net add**: 7 Agent A NET-NEW − 1 context-mode (Mia REJECT) − 1 cognee-integrations (Mia REJECT) + 3 STUDY-PILOT promoted (graphrag + opik + Continuous-Claude) = **+8 net new ADOPT-NOW**
**Wave 240 sub-promote**: 0 Agent A STUDY-PILOT promoted yet (8 pending Probe 6 in Wave 241)

### Wave 240 NET-NEW ADOPT-NOW (8) — all Probe 6 PASS
| # | Repo | License | Stars | Layer | Cite |
|---|---|---|---|---|---|
| 1 | **mem0ai/mem0** | Apache-2.0 | 55,803 | Memory L1+L2 | `LICENSE blob d20d5102` + arxiv `2504.19413` (Chhikara et al.) + YC S24 |
| 2 | **topoteretes/cognee** | Apache-2.0 | 17,248 | Memory L3 | `LICENSE blob fd57f687` + arxiv `2505.24478` (Markovic et al.) |
| 3 | **firecrawl/firecrawl-mcp-server** | MIT | 6,314 | MCP-web | `LICENSE blob 73fc2690` |
| 4 | **blazickjp/arxiv-mcp-server** | Apache-2.0 | 2,720 | MCP-research | `LICENSE blob 5c69e405` |
| 5 | **traceloop/openllmetry** | Apache-2.0 | 7,112 | Observability OTel | `LICENSE blob 261eeb9e` + CNCF aligned |
| 6 | **exa-labs/exa-mcp-server** | MIT | 4,434 | MCP-search REVIVE | `LICENSE blob e74ab00d` |
| 7 | **microsoft/graphrag** | MIT | 33,012 | RAG (standalone) | `LICENSE blob 9e841e7a` + Microsoft TIER-1 |
| 8 | **comet-ml/opik** | Apache-2.0 | 19,304 | Observability eval | `LICENSE blob 97fbc6c7` + Comet ML org |

### Wave 240 STUDY-PILOT-PROMOTED (1)
| # | Repo | License | Stars | Notes |
|---|---|---|---|---|
| 9 | parcadei/Continuous-Claude-v3 | MIT | 3,771 | Single-author named (Cosimo Streppone, 2026); Probe 6 PASS; Axis-3 maturity pending |

## §4 — REJECT-FOR-FIT total (Wave 240)

| # | Repo | Reason | Verdict source |
|---|---|---|---|
| R1 | volcengine/OpenViking | AGPLv3 server backend (Probe 6 LICENSE direct-file fail) | Agent A §12 |
| R2 | truefoundry/cognita | ARCHIVED upstream | Agent A §2 |
| R3 | affaan-m/everything-claude-code | LAUNCH-SPIKE Axis-3 band (183k★/4mo cpd≈1500/day) | Agent A §3 (downgrade) |
| R4 | mksglu/context-mode | **ELv2 RESTRICTIVE** | Agent B-redo Mia catch |
| R5 | Arize-ai/phoenix | **ELv2 RESTRICTIVE** | Agent B-redo Mia catch |
| R6 | topoteretes/cognee-integrations | **MISSING LICENSE** | Agent B-redo Mia catch |

**Total: 6 REJECT** (3 license blockers + 1 archived + 1 launch-spike + 1 unlicensed) [VERIFIED 2026-05-15 via Probe 6 LICENSE blob direct-reads at HEAD SHAs]

## §5 — Wave 240 Net Catalog (W237 + W240 deltas)

```
W237 baseline:           31 ADOPT-NOW + 3 conditional        = 34 total
W240 ADOPT-NOW adds:     +8 NET-NEW (mem0+cognee+firecrawl+arxiv+OTel+exa+graphrag+opik)
W240 STUDY-PILOT adds:   +1 (Continuous-Claude-v3)            
W240 REJECT-AT-FIT:      -0 from W237 baseline; +6 new (R1-R6)
                         ────────────────────────────────────
Wave 240 cumulative:     39 ADOPT-NOW + 4 conditional + 1 STUDY-PILOT-PROMOTED
                         (W237 31 + W240 8 = 39 ADOPT-NOW; W237 3 + W240 1 = 4 conditional)
```

## §6 — Outer Research NET-NEW Candidates (Agent C-redo) — Wave 241 Probe DAG queue

23 candidates extracted from V5/V6/V7/V8 kits (`docs/outer research/`). NONE yet license-probed or Probe DAG-scored — all flow into Wave 241.

### Token Context / Context Admission frontier (9 — CRITICAL for LLMLingua replacement)
1. **buildoak/wet** — context admission self-optimization (V7 NEW frontier)
2. **abhisekjha/pith** — context self-optimization peer to wet
3. **chopratejas/headroom** — context governance (V8 SOURCE_APPENDIX canonical anchor)
4. **0xhimanshu/governor** — token usage governor
5. **cytostack/openwolf** — token context advanced
6. **claudioemmanuel/squeez** — output compression
7. **yvgude/lean-ctx** — lean context discipline
8. **jeongwookie/WhereMyTokens** — token visibility
9. **luongnv89/context-stats** — context telemetry

### Operator UI / Worktree Control Plane (7)
10. **fynnfluegge/agtx** — operator-control-plane (V7 promoted)
11. **gabrielkoerich/orchestrator** — generic orchestrator
12. **nutthouse/tutti** — operator UI (V8 SOURCE_APPENDIX canonical anchor)
13. **jamesrochabrun/AgentHub** — operator UI
14. **yxwucq/CCUI** — Claude Code UI
15. **basnijholt/agent-cli** — CLI operator
16. **ComposioHQ/agent-orchestrator** — Composio (V8 SOURCE_APPENDIX canonical anchor)

### Spec-Driven / Workflow Harness (4)
17. **LiorCohen/sdd** — spec-driven development
18. **mkhrdev/cc-spec-driven** — CC spec-driven
19. **JuliusBrussee/blueprint** — PRD/spec-to-impl
20. **HKUDS/OpenHarness** — academic harness

### MCP Security (2) + Meta-Skill (1)
21. **InvariantLabs-ai/mcp-scan** — MCP security gate (CRITICAL for CR-7 unleash)
22. **MCP-Defender/MCP-Defender** — MCP runtime defense
23. **the911fund/skill-of-skills** — meta-skill marketplace

## §7 — LLMLingua Replacement Strategy RE-VERSION

Agent A §11 PRIMARY (context-mode) REJECTED ELv2. New strategy:

| Tier | Candidate | Status | Action |
|---|---|---|---|
| PRIMARY (was context-mode) | **TBD — Wave 241 search** | Need fresh discovery | Search C-redo's 9 context-frontier candidates: wet/pith/headroom/governor/openwolf/squeez/lean-ctx |
| SECONDARY | `jia-gao/leanctx` | MIT confirmed (Agent A §4); 226★ STUDY-PILOT | Probe DAG full in Wave 241 |
| TERTIARY (jailbreak only) | `microsoft/LLMLingua` SecurityLingua subset | Methodology dated but SecurityLingua CoLM 2025 unique | Cite-anchor only |

**Wave 241 priority**: Probe 6 LICENSE on C-redo's 9 context-frontier candidates IMMEDIATELY. The strongest permissive-license + named-T2 + mature candidate becomes the NEW LLMLingua replacement.

## §8 — HONEST-NON-FINDINGS retained from W240

1. **CI/CD Governance layer**: Agent A §15 HNF #1 — only 1 source family queried; W237 trio (anthropic/claude-code-base-action + claude-code-security-review + github/gh-aw) retained but NO net-new entrants confirmed. **Wave 241 should fire Exa + Perplexity + DeepWiki triangulation.**

2. **Letta/MemGPT** status: Agent A §15 HNF #2 — explicit UNKNOWN status; `letta-ai/letta` rename-tracking prevented direct surface. **Wave 241 should directly probe Letta repo.**

3. **mem0 commits-per-day metric**: Agent A §15 HNF #3 — star-velocity 55★/day but actual commit cpd [UNKNOWN]. **Wave 241 should run `git log --oneline | wc -l` probe via `mcp__github__list_commits`.**

4. **License probes for 8 remaining Agent A STUDY-PILOT entries** (8-20 in §14): jia-gao/leanctx (likely MIT) + iamtouchskyer/memex + Dataojitori/nocturne_memory + boshu2/agentops + gastownhall/beads + DeusData/codebase-memory-mcp + infiniflow/ragflow + HKUDS/LightRAG + VectifyAI/PageIndex + yichuan-w/LEANN — **all need Probe 6 in Wave 241**.

5. **Multi-source discovery breadth gate** (Agent A §15 HNF #5): only ~3 source families queried per layer. **Wave 241 should fire Exa + Perplexity + DeepWiki to harden Axis-2 named-T2 evidence to ≥4 source families per layer per `multi-source-discovery-breadth-discipline.md`.**

6. **5 zip archives in `_archives/`** (C-redo §6): followup + v5 + v6 + v7 + v8 kits — deferred. **Wave 241 can unzip + enumerate IF needed** (low priority; v5-v8 kits already enumerated via active dir).

7. **GitHub GraphQL harvest** (deferred from C original): the 11 GraphQL queries originally targeted by Agent C must fire in Wave 241 to find May-2026 fresh high-star repos NOT yet in roster.

## §9 — Z:\claude-sota-pure Install Order (Wave 240 revision per Probe 6 catches)

Per `cardinal-rule-7-graduated-unleash.md` + `cardinal-rule-12-upstream-install-priority.md`:

```
Tier 0 (Bootstrap):    Same as claude-sota-installed CLAUDE.md cardinal rules (per CR-5/8)

Tier 1 (Foundation):
  - Claude Code CLI (anthropic-canonical via official-native-channel CR-6)
  - codex CLI v0.130+ (cross-model T1-T7 gate)
  - mem0ai/mem0 (Apache-2.0 ✅; pip + npm + Docker)
  - topoteretes/cognee (Apache-2.0 ✅; pip + Docker)
  - sops + age (secret mgmt; W237 Phase 0)
  
Tier 2 (Token-opt + Research):
  - jia-gao/leanctx (MIT ✅; pip — secondary LLMLingua replacement until primary determined)
  - [LLMLingua PRIMARY REPLACEMENT TBD — Wave 241 must determine from C-redo's 9 candidates]
  - shanraisshan/CCBP (cite-anchor only, no install per CR-12)
  - addyosmani/agent-skills (already pinned in claude-sota-installed CLAUDE.md L156)
  - wshobson/agents (35,456★; license probe TBD Wave 241)
  - blazickjp/arxiv-mcp-server (Apache-2.0 ✅; for sota-researcher)
  
Tier 3 (Code Intel):
  - oraios/serena (W237 incumbent)
  - GitNexus (W237 incumbent; cited in CLAUDE.md)
  
Tier 4 (Observability):
  - comet-ml/opik (Apache-2.0 ✅; self-hosted Docker) [REPLACES Phoenix ELv2]
  - traceloop/openllmetry (Apache-2.0 ✅; OTel pipeline)
  - langfuse (W237 incumbent MIT-core)
  - promptfoo (W237 incumbent)
  
Tier 5 (MCP Ecosystem):
  - firecrawl/firecrawl-mcp-server (MIT ✅)
  - exa-labs/exa-mcp-server (MIT ✅; REVIVE from disabled-state)
  - blazickjp/arxiv-mcp-server (Apache-2.0 ✅)
  
Tier 6 (CI/CD Governance) — RETAIN W237 trio:
  - anthropic/claude-code-base-action
  - anthropic/claude-code-security-review
  - github/gh-aw
  
Tier 7 (RAG; conditional):
  - microsoft/graphrag (MIT ✅) — ONLY if standalone document-RAG needed beyond mem0+cognee
  
Tier 8 (Security gates — Wave 241 priority):
  - InvariantLabs-ai/mcp-scan (license probe TBD; CR-7 unleash blocker)
  - MCP-Defender/MCP-Defender (license probe TBD)
  
Tier 9 (Operator UI; OPTIONAL high-risk per V8 matrix):
  - one of: agtx / tutti / ComposioHQ-agent-orchestrator (license probes TBD Wave 241)
```

## §10 — Wave 241 Brief Composition (queued)

**Wave 241 = 3 parallel agents (CADP-compliant)**:

### Agent D — sota-researcher (Sonnet stand-in) — License + Probe DAG on C-redo NET-NEW
- Scope: 23 candidates from C-redo §5 — Probe 6 LICENSE + Probe 1 star + Probe 5 mode-harness + Probe 7 demand-gate
- Plus: 8 remaining Agent A STUDY-PILOTs (entries 8-20 not yet license-probed)
- Plus: Probe 4 plugin-namespace check on top-3 high-leverage (wet, agtx, mcp-scan)
- Output: `tmp/wave241-agentD-23plus8-license-probe-2026-05-15.md` (~600 LOC)
- TERMINATION: max_turns 25; budget 600 LOC

### Agent E — sota-researcher (Sonnet stand-in) — Multi-source breadth gate hardening
- Scope: Fire Exa + Perplexity + DeepWiki on 3 HONEST-NON-FINDING layers per W240 §8:
  - CI/CD Governance layer (W240 Agent A §9): triangulate Anthropic + GitHub trio + find any May-2026 fresh entrants
  - Letta/MemGPT 2026 SOTA status verification
  - mem0 cpd commits/day measurement via `mcp__github__list_commits`
- Plus: search for STRONG named-T2 endorsements on 12 strongest Wave 240 candidates (mem0, cognee, opik, graphrag, etc.) to harden Axis-2
- Output: `tmp/wave241-agentE-multi-source-axis2-hardening-2026-05-15.md` (~500 LOC)
- TERMINATION: max_turns 25; budget 500 LOC

### Agent F — codex-rescue BRIDGE-MODE → ABANDONED — replaced by orchestrator-direct Path P
- **DO NOT dispatch BRIDGE-MODE subagent again** — FM-17.e n=2 same-arc confirms pattern; orchestrator-direct foreground+tee codex `exec` is the recovery
- Orchestrator-direct dispatch in Wave 241 main thread:
  ```
  codex exec --skip-git-repo-check --color never -p deep-review-exec \
    < tmp/wave241-codex-t1-consult-master-catalog.txt \
    2>&1 | tee .claude/state/codex_consult_w240_close_synthesis_OUT.txt
  ```
- Cross-model gate satisfied at orchestrator level per `cross-model-consensus.md §The contract` Phase 1 bootstrap exception
- Output: `.claude/state/codex_consult_w240_close_synthesis_OUT.txt` (codex CLI tee output)

### Agent G — comprehensive-review:architect-review — Architecture validation
- Scope: validate the §9 install-order architecture across CR-1/3/5/6/7/8/12 compliance
- Surface any over-engineering, missing layers, redundant adopts
- Output: `tmp/wave241-agentG-architect-review-install-order-2026-05-15.md` (~400 LOC)
- TERMINATION: max_turns 20; budget 400 LOC

**Wave 241 will run as 3-agent parallel (D + E + G) + 1 orchestrator-direct codex exec**.

## §11 — Forward Top-5 Queue (Wave 241+)

1. **Wave 241 D**: Probe 6 LICENSE + Probe DAG on 23 C-redo NET-NEW + 8 remaining Agent A STUDY-PILOT (31 candidates total)
2. **Wave 241 E**: Multi-source breadth gate hardening (Exa + Perplexity + DeepWiki on 3 HNF layers)
3. **Wave 241 orchestrator-direct**: Path P codex T1 cross-model gate satisfaction on this synthesis
4. **Wave 241 G**: comprehensive-review:architect-review on install-order
5. **Wave 242**: Final master catalog + comprehensive scoring rubric + e2e install execution plan for Z:\claude-sota-pure

## §12 — Verdict-One-Line for Wave 240

`DONE_WITH_CONCERNS: Wave 240 produced 8 NET-NEW ADOPT-NOW (mem0 + cognee + firecrawl + arxiv + OTel + exa-mcp + graphrag + opik) + 1 STUDY-PILOT-PROMOTED (Continuous-Claude-v3) + 23 C-redo Outer-Research NET-NEW candidates queued for Wave 241 Probe DAG. Mia pre-apply caught 3 load-bearing REJECTs (context-mode ELv2 + phoenix ELv2 + cognee-integrations UNLICENSED). FM-17.e n=2 same-arc thrashed (both BRIDGE-MODE codex-rescue); recovery via Sonnet stand-in scope-narrowed. Cross-model gate PENDING — Wave 241 orchestrator-direct Path P codex exec foreground+tee queued. LLMLingua REPLACEMENT regressed: context-mode REJECTED; PRIMARY TBD from C-redo's 9 context-frontier candidates. Wave 240 cumulative catalog: 39 ADOPT-NOW + 4 conditional + 1 STUDY-PILOT-PROMOTED + 23 NET-NEW-PENDING-PROBE.`

## §13 — Artifacts persisted this Wave

| Path | Content | LOC |
|---|---|---|
| `tmp/wave240-agentA-fresh-may2026-sota-multi-source-2026-05-15.md` | Agent A fresh SOTA discovery 10 layers + LLMLingua replacement + OpenViking deep-dive | ~870 |
| `tmp/wave240-agentB-redo-license-axis2-hardening-2026-05-15.md` | Agent B-redo license + Axis-2 probe on 12 candidates | ~400 |
| `tmp/wave240-agentC-redo-outer-research-enumerate-2026-05-15.md` | Agent C-redo outer research kits V5/V6/V7/V8 + 23 NET-NEW candidates | ~390 |
| `tmp/wave240-CLOSE-SYNTHESIS-2026-05-15.md` | THIS — Wave 240 close synthesis | ~440 |

Failed/no-artifact: Agents B (orig, 988s FM-17.e) + C (orig, 645s FM-17.e) — recovery via Sonnet stand-in re-dispatch documented at §1 above.
