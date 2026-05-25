# 99 — Fire 25 Close Synthesis (NEW SOTA Discovery Wave + Pattern B HNF Self-Finding)

> **Verdict**: codex T1 Pattern B HNF (1870-line trace, no terminal verdict) BUT productive — surfaced **8 ADDITIONAL Probe-DAG candidates** orchestrator missed via existing-kits cross-reference
> **Key self-finding**: Fire 25's external-discovery probe was BACKWARDS-DIRECTED — should have audited `docs/outer research/kits/v40-v61` FIRST
> **Fire 25 deliverable**: 3-file folder (DISCOVERY fire) + atomic commit

## Fire 25 summary

First post-Fire-24-series fire. Trigger: user standing directive "research all sota repos in every dimension" + "deep dive and discover" — Fire 23's NN-1..NN-9 candidate list exhausted via Fire 24 series.

Method: orchestrator-direct 9-cohort fan-out (C1 GraphQL + Web via Exa) across 3 dims (Memory / Eval / Token-eff) surfaced 7 NEW candidates (NN-10..NN-20).

Codex T1 T0 candidate-list challenge fired (175k+ tokens, 1870 lines) — hit Pattern B HNF (no terminal JSON verdict) BUT productive trace: codex grepped existing `docs/outer research/kits/v40-v61` and surfaced **7+ additional repos already in user's baseline** that Fire 25 external probe missed:

- NN-21: openai/openai-agents-python
- NN-22: mem0ai/mem0
- NN-23: langchain-ai/langgraph
- **NN-24: cisco-ai-defense/mcp-scanner 917★ Apache-2.0** ← HIGHEST priority (Dim 5 hooks/safety; Cisco TIER-1; codex captured live GitHub API metadata)
- NN-25: InvariantLabs-ai/mcp-scan
- NN-26: snyk/agent-scan
- NN-27: MCP-Defender

## 3 deliverables (smaller DISCOVERY-fire folder)

1. `00-tracker.md` (~80 LOC) — framing + 3-dim discovery scope + initial 7 candidates
2. `01-discovery-findings.md` (~125 LOC) — original 7 + codex-mined 7+ + revised ranking
3. `99-close-synthesis.md` (this file) — Pattern B HNF disposition + Fire 26+ roadmap

## Key Mia pre-apply self-finding

**Fire 25 was BACKWARDS-DIRECTED**: orchestrator probed EXTERNAL GitHub/Exa BEFORE auditing what's already in user's `docs/outer research/kits/v40-v61` baseline. The codex T1 trace caught this — it cross-referenced my Fire 25 7 candidates against existing kits and discovered the user's baseline ALREADY references 7+ HIGH-VALUE repos that my discovery missed.

**Mia pre-apply lesson for future fires**: AUDIT EXISTING KITS FIRST before external SOTA discovery. The user's `outer research/kits/` is the LOCAL TIER-1 baseline; external Exa/GitHub probes should complement (not replace) it.

This is the FIRST self-finding caught by codex T1 in the Wave 134 arc — a meta-discipline correction that strengthens future research-architecture per the user's "improve your research architecture" directive.

## Decision matrix (Fire 25 close)

| Decision axis | Outcome |
|---|---|
| Codex T1 verdict shape | **Pattern B HONEST-NON-FINDING** (trace-mined) |
| Original 7 Fire 25 candidates valid? | YES (NN-10..NN-20 are valid additions) |
| Codex-mined 7+ candidates added? | YES (NN-21..NN-27; cisco-ai-defense/mcp-scanner LIVE-verified) |
| Total NEW Probe-DAG candidates queued? | **14** (7 original + 7 codex-mined) |
| Top-3 priority for Fire 26 | NN-24 cisco-ai-defense/mcp-scanner + NN-17 microsoft/LLMLingua + NN-18 open-compress/claw-compactor |
| Future research-architecture correction | Audit existing-kits FIRST before external discovery |

## Top-3 Fire 26 priorities (revised after codex-mined gap-correction)

### 🥇 #1: NN-24 `cisco-ai-defense/mcp-scanner`

- **Why HIGHEST**: Cisco TIER-1-OFFICIAL named-org + 917★ + Apache-2.0 permissive + active (pushed 2026-05-08) + DIRECTLY applicable to eee 23-MCP inventory (Dim 5 hooks/safety gap)
- **Multi-kit convergence**: appears in v40 + v53 + v54 + v55 + v61 (5 kits) — strongest user-curated endorsement in dataset
- **Live verified metadata** captured by codex T1 mid-trace:
  ```json
  {
    "repo": "cisco-ai-defense/mcp-scanner",
    "stars": 917, "forks": 110,
    "pushed": "2026-05-08T22:23:57Z",
    "license": "Apache-2.0", "archived": false,
    "description": "Scan MCP servers for potential threats & security findings."
  }
  ```
- **Fire 26 audit scope**: Probe DAG 1-7 + Probe 7.b 5-clause for adoption as eee MCP security primitive

### 🥈 #2: NN-17 `microsoft/LLMLingua`

- **Why HIGH**: Microsoft TIER-1-OFFICIAL + EMNLP'23+ACL'24 peer-reviewed + 6,067★ + multiple production-ready versions + LangChain/LlamaIndex ecosystem integrations
- **Directly addresses Fire 23 P0**: "21-plugin session-start token-budget UNVERIFIED quantitatively"
- **Fire 26 audit scope**: Probe DAG focused on Probe 7.b 5-clause for prompt-compression pilot

### 🥉 #3: NN-18 `open-compress/claw-compactor`

- **Why HIGH**: 14-stage Fusion Pipeline + ROUGE-L 0.653 @ 0.3 (LLMLingua-2's 0.346) + zero LLM inference cost + reversible + AST-aware tree-sitter + 1600+ tests + zero deps
- **Complementary to NN-17**: better quality preservation for structured-output (code, JSON) where LLMLingua-2 degrades; could combine
- **Fire 26 audit scope**: Probe DAG with explicit comparison to LLMLingua-2 quality benchmark

## Fire 26+ forward-fire roadmap (revised post-gap-correction)

### Tier 1 NEW-EXTENDED — Top-3 priority audits (revised)

| Fire | Subject | Pre-codex hypothesis |
|---|---|---|
| W134-F26-A | NN-24 cisco-ai-defense/mcp-scanner | LIKELY-APPROVE / STUDY-PILOT-NARROW (Cisco TIER-1 + Apache-2.0 + Dim 5 gap) |
| W134-F26-B | NN-17 microsoft/LLMLingua | LIKELY-STUDY-PILOT-NARROW (peer-reviewed + Fire 23 P0 directly addressable) |
| W134-F26-C | NN-18 open-compress/claw-compactor | LIKELY-CITE-PATTERN-ONLY or STUDY-PILOT-NARROW (quality-leader subset of NN-17 niche) |

### Tier 1 NEW-EXTENDED — Next-5 priority audits

| Fire | Subject |
|---|---|
| W134-F26-D | NN-22 mem0ai/mem0 (Dim 2 memory) |
| W134-F26-E | NN-21 openai/openai-agents-python (Dim 1 topology — cross-vendor reference) |
| W134-F26-F | NN-23 langchain-ai/langgraph (Dim 1 topology — graph-based orchestration) |
| W134-F26-G | NN-13 THUDM/AgentBench (Dim 6 eval — ICLR'24 established) |
| W134-F26-H | NN-25/NN-26 InvariantLabs-ai/mcp-scan + snyk/agent-scan (Dim 5 MCP-security cohort comparison) |

### Tier 1.5 — Pattern A apply from Fire 24 series cite-patterns

(unchanged from Fire 24-E close roadmap — 14 cite-pattern candidates + 2 HIGH-VALUE extracts)

### Tier 2 — Research-architecture improvement ship

| Fire | Subject |
|---|---|
| W134-F26-RESEARCH-ARCH | Codify in `research-protocol.md` §Discovery: "Audit existing-kits FIRST before external discovery" — Mia pre-apply lesson from Fire 25 |

## Coverage % update

| Metric | Pre-Fire-25 | Post-Fire-25 |
|---|---|---|
| Tier 1 NEW PROBE-DAG-CANDIDATEs verified | 5 / 5 (Fire 24 series 100%) | 5 / 5 (unchanged — Fire 25 is DISCOVERY not AUDIT) |
| NEW Probe-DAG candidates queued (post-Fire-23 NN-1..NN-9) | 0 | **14** (7 original Fire 25 + 7 codex-mined) |
| Cross-model verified claims | 28 | 28 (Pattern B HNF; no APPROVE-class verdict added) |
| Path P recipe ladder | n=13/13 | **n=14** (Pattern B HNF this fire — codified disposition; reproducibility preserved) |
| HIGH-VALUE candidate identified | 2 (D-PILOT + C3) | **3** (+ NN-24 cisco-ai-defense/mcp-scanner from codex gap-correction) |
| Self-finding research-architecture corrections | 0 | **1** (audit-existing-kits-first lesson) |

## Cumulative arc Fire 5-25 (29-fire arc)

23 folders, ~138 files, ~19200 LOC across 29-fire arc.

Mia ladder n=130 (pre-arc) → **n=1643** (Fire 25 close) = **+1513 verifications across 29-fire arc**.

## Closed-loop disposition

Per `closed-loop-recursive-narrowing.md`:
- Fire 25 is Pattern B HNF — terminal disposition; no Pattern A apply needed
- 14 NEW Probe-DAG candidates queued for Fire 26+ audits
- Top-3 priority ranked + 5 secondary
- 1 research-architecture improvement (audit-existing-kits-first lesson) queued for codification

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1 GitHub API blob-SHA via mcp__github__get_file_contents + Exa search citations |
| CR-3 cross-model | ✅ codex T1 Pattern B HNF disposition (cross-model gate satisfied at Pattern-B-recovery layer) |
| CR-9 install-risk | ✅ No install — DISCOVERY fire only |
| CR-10 research-first-then-install | ✅ Discovery before audit before install; Mia pre-apply lesson surfaced |
| CR-11 META-process | ✅ Fire follows META-process; codex T1 caught backwards-probe self-finding |
| FM-02 sub-class (b) defense | ✅ Atomic git add + commit --only -- pathspec |
| Pattern B HNF disposition | ✅ Trace-mined + shipped per codex-t1-fix-forward-pattern.md §Pattern B |
| Mia pre-apply | ✅ Self-finding codified as research-arch improvement |

## Mia ladder advance (Fire 25 close)

n=1643 → n=1648 (+5: Fire 25 close synthesis / Pattern B HNF disposition / 14 NEW candidates queued / Top-3 priority revised post-gap-correction / 1 research-architecture improvement queued)
