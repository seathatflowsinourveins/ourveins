---
title: Wave 252 Agent C — Comprehensive 10-Dimension Scoring Matrix (W237+W240+W241+W250 Roster Cross-Validation)
status: AUTHORITATIVE-BASELINE
date: 2026-05-16
wave: 252
fire: 1
agent: C (Sonnet stand-in per CLAUDE.local.md ENV (f) CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6)
stand-in-notice: Cross-model gate NOT structurally satisfied via this agent dispatch; orchestrator MUST cover via Agent B BRIDGE-MODE OR Path P codex exec at Wave 253
inputs:
  - tmp/wave237-CORRECTED-FINAL-SYNTHESIS-Pattern-A-fix-forward-2026-05-15.md (32 ADOPT-NOW baseline)
  - tmp/wave240-CLOSE-SYNTHESIS-2026-05-15.md (8 NET-NEW; 6 REJECT; 23 outer-research NET-NEW pending)
  - tmp/wave241-CLOSE-SYNTHESIS-orchestrator-2026-05-15.md (5 NET-NEW; 14 cumulative REJECT)
  - tmp/wave250-A7-final-synthesis-2026-05-15.md (Wave 250 consolidated 47-row catalog)
target-runtime: Z:/claude-sota-pure (pure-runtime; bootstrap-only state)
orchestrator-runtime: Z:/claude-sota-installed (this runtime; existing infrastructure)
fm20-row-21-flag: TARGET runtime != orchestrator runtime — scoring assesses FIT TO PURE-RUNTIME
output-budget: ~1000 LOC
persisted-by: orchestrator (Wave 254 continuation arc, 2026-05-15) per FM-19 ARTIFACT-INLINE
---

# Wave 252 Agent C — Comprehensive Scoring Matrix

## §0 — Method + STAND-IN-NOTICE

**STAND-IN-NOTICE**: This agent runs as Sonnet stand-in per `CLAUDE.local.md` ENV (f) `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate. Cross-model gate NOT structurally satisfied for this dispatch; orchestrator MUST cover via Wave 253 BRIDGE-MODE codex-rescue OR Path P codex exec foreground+tee.

**FM-20 Row 21 disclosure (target-vs-orchestrator runtime)**: Install target is `Z:/claude-sota-pure` (pure-runtime, bootstrap-only); this orchestrator runs in `Z:/claude-sota-installed` (existing infrastructure). Scoring assesses FIT TO PURE-RUNTIME, not orchestrator runtime. Per FM-20 row 21 sub-class (agent-return-multi-claim-without-TARGET-runtime-probe): when orchestrator-runtime and target-runtime differ, Mia probes MUST run against TARGET runtime, not orchestrator runtime. This matrix flags `target-runtime-probe-status: pending` per row where independent target-runtime verification has not yet fired.

**Method**:
1. Roster enumeration: 6 wave files Read → unique repo extraction
2. Dedupe across W237 + W240 + W241 + W250 (4 wave catalogs)
3. 10-dimension SRA D1-D10 scoring per repo
4. CR-12 6-class disposition per `cardinal-rule-12-upstream-install-priority.md`
5. Freshness re-validation flag (HIGH > 7d / MEDIUM 3-7d / LOW < 3d)
6. Group by layer L1-L11 with top-3 INSTALL-NOW + alternates
7. HONEST-NON-FINDINGS surfaced

**Cite anchor for scoring lattice**: per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8, `Z:/claude-sota/.claude/rules/convergence-gate.md` (Axis 1/2/3), `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` (Probe 1-7), `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` (6-class disposition lattice).

**D1-D10 scoring scale** (0-10 per dim, sum 0-100):
- D1: use-class precision (clear named workflow → 10; ambiguous → 2)
- D2: axis-1 SOTA tier (TIER-1-DIRECT named-org=10, TIER-2=7, TIER-3-LOCAL=4)
- D3: axis-2 named-T2 practitioner count (>=3=10, 2=8, 1=5, 0=0)
- D4: axis-3 stability cpd x age (STABLE-BURN-IN=10, ACTIVE-MAINT=8, FAST-CHURN=3, LAUNCH-SPIKE=1)
- D5: license (MIT/Apache-2.0/BSD=10, MPL=8, ELv2=2, AGPLv3=0, UNLICENSED=0)
- D6: install-channel SOTA-canonical (official npm/PyPI/cargo+plugin install=10, third-party=5, manual git clone=4)
- D7: token-cost overhead reverse-scored (low MCP config overhead=10, heavy=2)
- D8: harness-fit Probe 1-6 pass count (6/6=10, 5/6=8, 4/6=6, 3/6=4, <=2/6=2)
- D9: demand-gate Probe 7 (.b demand-evident=10, .b 5-clause PASS=8, .a REJECT=0)
- D10: cohort coverage >=2-cohort (>=3=10, 2=7, 1=4)

---

## §1 — Roster Enumeration (deduped across W237+W240+W241+W250)

**Methodology**: For each wave file, extracted repo identities from structured tables + verdict lists. Deduped by canonical `org/repo` form. Verdicts merged with W250-A7 as latest authority where it supersedes earlier waves.

**Total unique repos: ~75 across 11 layers** (146 rows incl. phantom-audit-trail + cross-listed)

**Wave attribution**:
- W237 baseline: 31 ADOPT-NOW (post Pattern A F-3 review-agent-governance removal) + 3 conditional + ~30 W232 META-tooling references
- W240 NET-NEW: 8 ADOPT (mem0+cognee+firecrawl-mcp+arxiv-mcp+openllmetry+exa-mcp+graphrag+opik) + 6 REJECT (OpenViking+cognita+affaan-m+context-mode+phoenix+cognee-integrations) + 23 outer-research candidates
- W241 NET-NEW: 5 ADOPT (buildoak/wet+yvgude/lean-ctx+ComposioHQ/agent-orchestrator+HKUDS/OpenHarness+InvariantLabs-ai/mcp-scan) + 8 REJECT (cytostack+MCP-Defender+4 unlicensed+codebase-argus+letta-code)
- W250-A7: 47 consolidated rows (Wave 1 + Wave 2 combined; W250 supersedes W237/W240/W241 on overlap)

---

## §2 — Master Scoring Table

**Legend**:
- **Verdict**: AN=ADOPT-NOW / SP=STUDY-PILOT (.a/.b) / RJ=REJECT-FOR-FIT / DF=DEFERRED / KI=KEEP-INSTALLED / BO=BENCHMARK-ONLY / CC=CITE-CLASS-CANONICAL
- **CR-12**: GN=GENUINELY-NEW / DU=DUPLICATE-FUNCTIONALITY / PO=PARTIAL-OVERLAP / PC=PROVIDER-COMPLEMENT / EI=ECOSYSTEM-IMPORT / CC=CITE-CLASS-CANONICAL
- **Layer**: L1=Foundation / L2=Orchestration / L3=MCP-Servers / L4=Memory+RAG / L5=Token-Opt / L6=Code-Intel / L7=Eval+Obs / L8=Security / L9=Browser+Sandbox / L10=Git+CLI / L11=CI/CD
- **Fresh**: H=HIGH risk (>7d since probe) / M=MEDIUM / L=LOW
- D1-D10 columns + Σ sum (0-100). FIT score = sum weighted to pure-runtime context.

### L1 — Foundation (Anthropic CC + Codex CLI + secrets)

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 1 | anthropics/claude-code-action | Apache-2.0 | ~3000 | AN | GN | W237/W241 | 10|10|10|9|10|10|9|10|10|10 | **98** | M | CI/CD trio; Anthropic OFFICIAL |
| 2 | anthropics/claude-code-security-review | Apache-2.0 | ~600 | AN | GN | W237 | 10|10|9|9|10|10|9|10|10|10 | **97** | M | CI/CD trio |
| 3 | mozilla/sops | MPL-2.0 | 18k | AN | GN | W237 | 10|10|10|10|8|10|9|10|10|10 | **97** | L | Phase 0 secret mgmt |
| 4 | FiloSottile/age | BSD-3-Clause | 19k | AN | GN | W237 | 10|10|10|10|10|10|9|10|10|10 | **99** | L | Phase 0; secret encryption |
| 5 | openai/codex CLI | Apache-2.0 | 26k | AN | GN | W237/W250 | 10|10|10|9|10|10|9|10|10|10 | **98** | M | Cross-model T1-T7 gate prerequisite |

### L2 — Orchestration (subagent dispatch + skills frameworks)

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 6 | obra/superpowers | MIT | 172k | AN/KI | DU | W250/W237 | 10|10|10|10|10|10|8|10|10|10 | **98** | L | Selectively vendored; pre-installed |
| 7 | addyosmani/agent-skills | MIT | 38k | AN/KI | DU | W250/W237 | 10|10|9|9|10|10|8|10|10|10 | **96** | L | 21 engineering skills; pre-installed |
| 8 | anthropics/claude-plugins-official | MIT | ~2000 | AN/KI | CC | W250/W237 | 10|10|10|9|10|10|8|10|10|10 | **97** | M | Official marketplace |
| 9 | wshobson/agents | MIT | 35k | SP | PO | W250/W237 | 9|9|7|8|10|10|7|9|8|9 | **86** | L | Partial-overlap; selective install |
| 10 | ComposioHQ/agent-orchestrator | MIT | ~5k | AN | GN | W241 | 9|9|7|7|10|10|7|9|8|7 | **83** | M | Composio-org named cite; operator UI |
| 11 | HKUDS/OpenHarness | MIT | ~3k | AN | GN | W241 | 8|9|7|7|10|9|7|8|8|7 | **80** | M | Academic harness; HKU org |
| 12 | EveryInc/compound-engineering-plugin | MIT | ~500 | AN | GN | W250 | 8|7|6|6|10|10|8|8|9|7 | **79** | M | Native CC plugin |
| 13 | trailofbits/skills-curated | Apache-2.0 | ~1k | AN | GN | W250 | 9|9|9|7|10|10|8|8|8|8 | **86** | M | Security-vetted skills; named org |
| 14 | huggingface/smolagents | Apache-2.0 | 27k | SP | GN | W250 | 7|10|9|9|10|10|7|7|7|8 | **84** | L | Code-as-action paradigm |
| 15 | openai/openai-agents-python | MIT | 25k | SP | GN | W250 | 7|10|9|9|10|10|7|7|7|8 | **84** | L | Handoff+Tracing primitives |
| 16 | langchain-ai/deepagents | MIT | ~3k | SP | PO | W237 | 7|10|7|8|10|10|7|7|7|7 | **80** | M | TruncateArgsSettings pattern |
| 17 | microsoft/autogen | MIT | 38k | SP | PO | W250 | 6|10|8|6|10|10|6|6|6|7 | **75** | M | Maintenance-mode per A6 |
| 18 | crewAIInc/crewAI | MIT | ~24k | SP | PO | W250 | 6|9|8|8|10|10|6|6|6|7 | **76** | M | Role-agent framework |
| 19 | NeoLabHQ/context-engineering-kit | GPL-3.0 | ~500 | SP | GN | W250 | 7|7|5|6|2|8|7|7|7|6 | **62** | M | GPL-3.0 caveat |
| 20 | ruvnet/ruflo | MIT | ~1k | SP | PC | W250 | 6|7|5|6|10|9|6|6|6|6 | **67** | M | Workflow framework |
| 21 | BMAD-METHOD | MIT | ~3k | SP | PC | W250 | 5|7|5|6|10|9|5|5|6|6 | **64** | M | Interactive Agile workflow |
| 22 | parcadei/Continuous-Claude-v3 | MIT | 3.7k | SP | PO | W240 | 6|7|4|6|10|9|6|7|6|6 | **67** | M | Single-author "dei"; identity drift caught |
| 23 | aaif-goose/goose | Apache-2.0 | ~30k | SP | PO | W237 | 7|10|9|8|10|10|6|7|7|8 | **82** | M | Linux Foundation; ACP host |

### L3 — MCP Servers (memory + research + web + monitoring)

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 24 | doobidoo/mcp-memory-service | Apache-2.0 | 1.8k | AN/KI | DU | W250 | 10|9|7|8|10|10|9|10|10|9 | **92** | L | Pre-installed; L1+L2 memory |
| 25 | getzep/graphiti | Apache-2.0 | 26k | AN/KI | DU | W250 | 10|10|10|9|10|10|7|10|10|10 | **96** | L | Pre-installed; L3 temporal-KG |
| 26 | firecrawl/firecrawl-mcp-server | MIT | 6.3k | AN | GN | W240/W237 | 10|9|8|8|10|10|9|9|9|9 | **91** | M | MCP web-scrape |
| 27 | blazickjp/arxiv-mcp-server | Apache-2.0 | 2.7k | AN | GN | W240 | 10|8|6|7|10|10|9|9|9|8 | **86** | M | Research papers; sota-researcher input |
| 28 | exa-labs/exa-mcp-server | MIT | 4.4k | AN | GN | W240 | 10|9|7|8|10|10|9|9|9|9 | **90** | M | REVIVE from disabled-state |
| 29 | InvariantLabs-ai/mcp-scan | Apache-2.0 | ~1k | AN | GN | W241 | 10|9|6|7|10|10|9|9|9|8 | **87** | M | MCP security audit; CR-7 unleash blocker |
| 30 | comet-ml/opik | Apache-2.0 | 19k | AN | GN | W240 | 9|10|9|8|10|10|7|9|8|9 | **89** | M | Eval observability; REPLACES phoenix ELv2 |
| 31 | traceloop/openllmetry | Apache-2.0 | 7.1k | AN | GN | W240 | 9|10|8|9|10|10|7|9|8|9 | **89** | M | CNCF-aligned OTel |
| 32 | Arize-ai/phoenix | ELv2 | 6.5k | RJ | DU | W240 Mia | 0|10|8|9|2|0|0|0|0|0 | **29** | L | Mia REJECT ELv2 |
| 33 | mksglu/context-mode | ELv2 | 14.8k | RJ/KI | DU | W240 Mia | 0|10|8|10|2|10|9|0|0|0 | **49** | L | Mia REJECT ELv2; W250-A7 lists KEEP if cached |
| 34 | thedotmack/claude-mem | UNKNOWN | ~2k | KI | DU | W250 | 5|6|3|6|3|7|7|4|4|4 | **49** | M | Quarantine-pilot risk |

### L4 — Memory + RAG

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 35 | mem0ai/mem0 | Apache-2.0 | 55k | AN | GN | W240 | 10|10|10|10|10|10|8|10|9|10 | **97** | L | Apache-2.0; YC S24; arxiv 2504.19413; cpd=3.33 STABLE-BURN-IN |
| 36 | topoteretes/cognee | Apache-2.0 | 17k | AN | GN | W240 | 10|10|9|9|10|10|7|9|9|9 | **92** | L | Apache-2.0; arxiv 2505.24478 |
| 37 | topoteretes/cognee-integrations | UNLICENSED | ~1k | RJ | DU | W240 Mia | 0|9|6|6|0|0|0|0|0|0 | **21** | L | Mia REJECT UNLICENSED — use parent directly |
| 38 | microsoft/graphrag | MIT | 33k | AN | GN | W240 | 9|10|10|9|10|10|7|9|7|9 | **90** | M | Microsoft TIER-1; standalone RAG |
| 39 | volcengine/OpenViking | AGPLv3 | ~5k | RJ/CC | CC | W240 | 0|9|6|7|0|0|0|0|0|0 | **22** | M | AGPLv3 server backend; cite-only |
| 40 | letta-ai/letta | Apache-2.0 | 22k | SP | PC | W241 | 8|9|9|8|10|10|7|8|7|8 | **84** | M | Stateful agent platform (NOT replacement) |
| 41 | letta-ai/letta-code | Apache-2.0 | ~2k | RJ | DU | W241 | 2|8|6|6|10|9|7|2|0|6 | **56** | M | META-HARNESS competing-CLI per verified-avoid.md |
| 42 | infiniflow/ragflow | Apache-2.0 | 80k | DF | DU | W241 | 7|10|9|9|10|10|5|6|4|7 | **77** | M | Demand-absence.a — Docker engine; orthogonal scope |
| 43 | HKUDS/LightRAG | MIT | 35k | DF | DU | W241 | 7|9|8|8|10|10|6|6|4|7 | **75** | M | Orthogonal RAG |
| 44 | truefoundry/cognita | Apache-2.0 | ~3k | RJ | DU | W240 | 0|7|5|0|10|0|0|0|0|0 | **22** | M | ARCHIVED upstream |
| 45 | weaviate/Verba | BSD-3 | ~7k | RJ | DU | W250 | 4|8|6|7|10|9|4|4|0|6 | **58** | M | Weaviate-centric docs chat |
| 46 | Arc53/DocsGPT | MIT | ~16k | RJ | DU | W250 | 4|7|7|7|10|9|4|4|0|6 | **58** | M | Product surface; not primitive |
| 47 | anthropics native memory_20250818 | Anthropic | n/a | SP | PO | W250 | 8|10|10|8|10|10|7|9|7|8 | **87** | M | API beta; pilot only |

### L5 — Token Optimization / Context Compression

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 48 | buildoak/wet | MIT | ~2k | AN | GN | W241 | 10|9|6|7|10|9|9|9|10|8 | **87** | M | LLMLingua PRIMARY REPLACEMENT; FM-17.e explicit |
| 49 | yvgude/lean-ctx | Apache-2.0 | 1.7k | AN | PO | W241 | 9|9|6|7|10|10|9|9|9|8 | **86** | M | LLMLingua SECONDARY; multi-channel distribution |
| 50 | microsoft/LLMLingua | MIT | ~5k | CC | CC | W237 | 5|10|10|6|10|10|6|5|3|7 | **72** | M | RETIRE; SecurityLingua cite-only |
| 51 | yamadashy/repomix | MIT | ~5k | AN/KI | DU | W250 | 10|9|7|9|10|10|9|10|10|9 | **93** | L | Pre-installed MCP |
| 52 | chopratejas/headroom | UNKNOWN | ~500 | SP | PC | W241/W250 | 6|6|3|5|3|7|7|6|6|5 | **54** | M | License probe pending |
| 53 | Anthropic context-management stack | Anthropic | n/a | SP | PO | W250 | 8|10|9|8|10|10|9|9|7|8 | **88** | M | API beta pilot |

### L6 — Code Intelligence

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 54 | oraios/serena | MIT | 24k | AN/KI | DU | W237 | 10|9|8|9|10|10|8|10|10|9 | **93** | L | Pre-installed; symbol editing |
| 55 | abhigyanpatwari/GitNexus | Polyform-NC | n/a | KI | DU | W237/W168 | 9|8|6|7|2|8|8|10|10|7 | **75** | M | LICENSE CHANGED to Polyform-NC per FM-20 row 11 |
| 56 | ast-grep | MIT | 7k | AN/KI | DU | W237 | 10|9|9|9|10|10|9|10|10|9 | **95** | M | PATH-installed per W112 |
| 57 | semgrep | LGPL-2.1 | ~10k | AN/KI | DU | W237 | 10|9|9|9|7|10|8|9|9|8 | **88** | M | LGPL-2.1 acceptable |
| 58 | osv-scanner | Apache-2.0 | ~6k | AN/KI | DU | W237 | 10|10|9|9|10|10|9|10|9|9 | **95** | M | OSV vulnerability scanner |
| 59 | typos-rs/typos | MIT | ~3k | AN/KI | DU | W237 | 10|9|8|9|10|10|10|10|9|9 | **94** | M | PATH-installed |
| 60 | microsoft/acon | MIT | ~500 | SP.b | GN | W237 | 8|10|6|6|10|9|7|8|8|7 | **79** | M | git clone-only |
| 61 | jia-gao/leanctx | MIT | ~200 | RJ-OWNER | EI | W237/W241 | 0|7|3|5|10|7|7|0|0|0 | **39** | M | FM-20 row 22 owner-drift; actual is yvgude/lean-ctx |
| 62 | ace-agent/ace | Apache-2.0 | ~1k | SP.b | PO | W237 | 7|8|6|6|10|9|7|7|7|7 | **74** | M | git clone @ HEAD pin |

### L7 — Eval + Observability

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 63 | langfuse/langfuse | MIT-core | 14k | AN | GN | W237/W250 | 10|10|10|9|10|10|7|9|9|9 | **93** | M | MCP-native (W250 ADOPT-NOW); incumbent |
| 64 | promptfoo | MIT | ~5k | AN | GN | W250/W237 | 10|9|8|8|10|10|8|9|9|9 | **90** | M | Eval harness; npm-global |
| 65 | ccusage / @ccusage/mcp | MIT | ~3k | AN/KI | DU | W250 | 10|9|7|8|10|10|9|10|10|9 | **92** | L | Pre-installed |
| 66 | stanfordnlp/dspy | Apache-2.0 | 25k | SP | PC | W250 | 7|10|9|9|10|10|6|6|6|8 | **81** | M | Prompt/program optimization |
| 67 | langfuse-docs MCP | MIT | n/a | AN | CC | W250 | 9|10|7|8|10|10|9|9|7|8 | **87** | M | Canonical docs MCP |
| 68 | tokscale | MIT | ~500 | SP | PO | W250 | 6|6|3|5|10|9|6|5|6|5 | **61** | M | Overlap with ccusage |

### L8 — Security

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 69 | microsoft/presidio | MIT | ~3k | SP.b | GN | W237 | 8|10|7|7|10|10|7|8|7|7 | **81** | M | PII redaction; analyzer/anonymizer/structured |
| 70 | protectai/llm-guard | MIT | ~1k | SP.b | PC | W237 | 8|9|6|6|10|10|7|8|7|7 | **78** | M | 5mo-stale acknowledged |
| 71 | Tom Farley protect-mcp | MIT | ~100 | SP | GN | W237 | 7|7|3|4|10|10|7|7|7|5 | **67** | M | Phase 3.5 audit gate; crypto pending |
| 72 | Tom Farley signed-audit-trails | MIT | n/a | CC | CC | W237 | 6|7|3|4|10|0|10|7|6|5 | **58** | M | Markdown only; no install |
| 73 | cytostack/openwolf | AGPLv3 | ~500 | RJ | DU | W241 Mia | 0|6|3|5|0|0|0|0|0|0 | **14** | L | AGPLv3 REJECT |
| 74 | MCP-Defender/MCP-Defender | AGPLv3 | ~300 | RJ | DU | W241 Mia | 0|6|3|5|0|0|0|0|0|0 | **14** | L | AGPLv3 REJECT |
| 75 | gitleaks | MIT | ~17k | AN/KI | DU | W237 | 10|9|9|9|10|10|9|10|9|9 | **94** | M | Pre-installed |
| 76 | trivy | Apache-2.0 | ~24k | AN/KI | DU | W237 | 10|10|9|9|10|10|8|9|9|9 | **93** | M | Pre-installed |
| 77 | anchore/syft | Apache-2.0 | ~6k | AN/KI | DU | W237 | 10|10|8|9|10|10|9|9|9|9 | **93** | M | Pre-installed |

### L9 — Browser + Sandbox

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 78 | playwright-cli | Apache-2.0 | ~62k | AN/KI | DU | W237 | 10|10|10|9|10|10|9|10|10|9 | **97** | L | Pre-installed |
| 79 | chrome-devtools-mcp | Apache-2.0 | ~3k | AN/KI | DU | W237 | 10|10|7|8|10|10|9|9|9|8 | **90** | L | Pre-installed MCP |
| 80 | elevenlabs/elevenlabs-mcp | MIT | ~1k | AN | GN | W237 | 8|9|6|7|10|10|9|8|7|7 | **81** | M | uvx-pinned; OFFICIAL |
| 81 | browser-use/browser-use | MIT | ~62k | SP | GN | W250 | 8|9|9|9|10|10|6|7|7|8 | **83** | M | High-level browser-agent |
| 82 | e2b-dev/E2B | Apache-2.0 | ~9k | SP | PC | W250 | 8|9|9|8|10|10|6|7|6|8 | **81** | M | Remote sandbox; security review required |
| 83 | SWE-agent/SWE-agent | MIT | ~17k | SP | PC | W250 | 8|10|9|8|10|9|6|7|6|8 | **81** | M | SWE-bench repair |

### L10 — Git + CLI Tooling

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 84 | BurntSushi/ripgrep | MIT | ~52k | AN | GN | W237 | 10|10|10|9|10|10|10|10|10|9 | **98** | L | Pin 14.1.1 |
| 85 | sharkdp/fd | MIT | ~37k | AN | GN | W237 | 10|10|10|9|10|10|10|10|10|9 | **98** | L | Pin 10.2.0 |
| 86 | sharkdp/bat | MIT | ~52k | AN | GN | W237 | 10|9|10|9|10|10|10|10|10|9 | **97** | L | Pin 0.24.0 |
| 87 | eza-community/eza | MIT | ~9k | AN | GN | W237 | 10|9|9|9|10|10|10|10|10|9 | **96** | L | Pin 0.20.20 |
| 88 | sharkdp/hyperfine | MIT/Apache-2.0 | ~24k | AN | GN | W237 | 10|9|10|9|10|10|10|10|10|9 | **97** | L | Pin 1.18.0 |
| 89 | XAMPPRocky/tokei | MIT/Apache-2.0 | ~11k | AN | GN | W237 | 10|9|9|9|10|10|10|10|10|9 | **96** | L | Pin 13.0.0-alpha.4 |
| 90 | bootandy/dust | Apache-2.0 | ~10k | AN | GN | W237 | 10|9|9|9|10|10|10|10|10|9 | **96** | L | Pin 1.2.4 |
| 91 | ClementTsang/bottom | MIT | ~12k | AN | GN | W237 | 10|9|9|9|10|10|10|10|10|9 | **96** | L | Pin 0.11.0 |
| 92 | cli/cli (gh) | MIT | ~38k | AN | GN | W237 | 10|10|10|9|10|10|9|10|10|9 | **97** | L | Pin 2.65.0 |
| 93 | jqlang/jq | MIT | ~32k | AN | GN | W237 | 10|10|10|9|10|10|10|10|10|9 | **98** | L | Pin 1.7.1 |
| 94 | mikefarah/yq | MIT | ~13k | AN | GN | W237 | 10|9|10|9|10|10|10|10|10|9 | **97** | L | Pin 4.45.1 |
| 95 | pre-commit/pre-commit | MIT | ~13k | AN | GN | W237 | 10|9|10|9|10|10|9|10|10|9 | **96** | L | Pin 4.0.1 |
| 96 | mozilla/sccache | Apache-2.0 | ~6k | AN | GN | W237 | 9|10|9|9|10|10|9|9|9|8 | **92** | L | Pin 0.10.0 |
| 97 | mkdocs/mkdocs | BSD-2 | ~21k | AN | GN | W237 | 9|9|10|9|10|10|9|9|9|8 | **92** | L | Pin 1.6.1 |
| 98 | astral-sh/ruff | MIT | ~50k | AN/KI | DU | W237 | 10|10|10|10|10|10|10|10|10|9 | **99** | L | Pre-installed; verified W214 |
| 99 | astral-sh/uv | Apache-2.0 | ~50k | AN/KI | DU | W214 | 10|10|10|10|10|10|10|10|10|9 | **99** | L | Pre-installed system-PATH |
| 100 | dandavison/delta | MIT | ~24k | AN/KI | DU | W214 | 10|10|10|9|10|10|9|10|10|9 | **97** | L | Pre-installed |
| 101 | jesseduffield/lazygit | MIT | ~63k | AN | GN | W214 | 10|10|10|9|10|10|9|10|10|9 | **97** | L | TUI git workflow |

### L11 — CI/CD Governance

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 102 | github/gh-aw | Apache-2.0 | 4.5k | AN | GN | W237/W241 | 10|10|8|8|10|10|9|9|8|8 | **90** | M | GitHub OFFICIAL; agentic workflows |
| 103 | opensesh/KARIMO | UNKNOWN | 177 | SP | PO | W241 | 6|7|3|3|3|7|7|6|6|5 | **53** | M | Re-audit >90d; plan-mode harness |
| 104 | wshobson/shell-scripting | MIT | ~500 | AN | GN | W237 | 9|7|4|6|10|10|8|8|8|7 | **77** | M | F14 source-audit pending |
| 105 | wshobson/plugin-eval | MIT-pending | ~500 | AN | GN | W237 | 8|7|4|6|10|10|8|8|8|7 | **76** | M | License-gap PR queued |
| 106 | wshobson/block-no-verify | MIT | ~300 | AN | GN | W237 | 9|7|3|5|10|10|9|8|8|7 | **76** | M | cskwork hook source-audit |

### Outer-Research Net-New (W240 C-redo 23 candidates; W241 Probe DAG resolved)

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 108 | abhisekjha/pith | UNKNOWN | ~500 | SP.b | GN | W241 | 6|5|3|5|3|6|7|5|5|5 | **50** | M | Context-frontier; license pending |
| 109 | 0xhimanshu/governor | UNKNOWN | ~300 | SP.b | PO | W241 | 6|5|3|4|3|6|7|5|5|5 | **49** | M | Token-governor |
| 110 | claudioemmanuel/squeez | UNKNOWN | ~200 | SP.b | PO | W241 | 6|5|3|4|3|6|7|5|5|5 | **49** | M | Output compression |
| 111 | jeongwookie/WhereMyTokens | UNKNOWN | ~300 | SP.b | PC | W241 | 6|5|3|4|3|6|7|5|5|5 | **49** | M | Token visibility |
| 112 | luongnv89/context-stats | UNKNOWN | ~200 | SP.b | PO | W241 | 6|5|3|4|3|6|7|5|5|5 | **49** | M | Context telemetry |
| 113 | fynnfluegge/agtx | UNKNOWN | ~1k | SP.b | PO | W241 | 6|6|4|6|3|6|7|6|6|6 | **56** | M | Operator-control-plane |
| 114 | nutthouse/tutti | UNKNOWN | ~500 | SP.b | PO | W241 | 6|6|3|5|3|6|7|5|6|5 | **52** | M | Operator UI |
| 115 | jamesrochabrun/AgentHub | UNKNOWN | ~300 | SP.b | PO | W241 | 6|5|3|4|3|6|7|5|5|5 | **49** | M | Operator UI |
| 116 | basnijholt/agent-cli | UNKNOWN | ~200 | SP.b | PO | W241 | 5|5|3|4|3|6|7|5|5|5 | **48** | M | CLI operator |
| 117 | JuliusBrussee/blueprint | UNKNOWN | ~200 | SP.b | PO | W241 | 6|5|3|4|3|6|7|5|5|5 | **49** | M | PRD/spec-to-impl |
| 118 | gabrielkoerich/orchestrator | UNLICENSED | ~100 | RJ | DU | W241 Mia | 0|5|3|4|0|0|0|0|0|0 | **12** | L | UNLICENSED REJECT |
| 119 | yxwucq/CCUI | UNLICENSED | ~100 | RJ | DU | W241 Mia | 0|5|3|4|0|0|0|0|0|0 | **12** | L | UNLICENSED REJECT |
| 120 | LiorCohen/sdd | UNLICENSED | ~100 | RJ | DU | W241 Mia | 0|5|3|4|0|0|0|0|0|0 | **12** | L | UNLICENSED REJECT |
| 121 | mkhrdev/cc-spec-driven | UNLICENSED | ~100 | RJ | DU | W241 Mia | 0|5|3|4|0|0|0|0|0|0 | **12** | L | UNLICENSED REJECT |
| 122 | the911fund/skill-of-skills | UNKNOWN | ~200 | SP.b | GN | W241 | 6|5|3|4|3|7|7|5|6|5 | **51** | M | Meta-skill marketplace |
| 123 | AaronZ345/codebase-argus | UNKNOWN | ~50 | RJ | DU | W241 | 0|5|2|1|3|0|0|0|0|0 | **11** | L | 10-day age fresh-paint REJECT |

### Document Ingestion (W250)

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 124 | microsoft/markitdown | MIT | ~50k | AN | GN | W250 | 10|10|10|9|10|10|9|10|9|9 | **96** | L | pipx install; document→Markdown |
| 125 | VikParuchuri/marker | GPL-3.0 | ~25k | SP | PC | W250 | 9|9|9|9|2|9|7|9|7|8 | **78** | M | GPL-3.0 caveat |
| 126 | opendatalab/MinerU | Apache-2.0 | ~30k | SP | PC | W250 | 9|10|9|8|10|9|6|8|7|8 | **84** | M | Heavy PDF/layout |

### Coding-CLI Benchmarks (DO NOT INSTALL — competing harnesses)

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 127 | Aider-AI/aider | Apache-2.0 | ~28k | BO | DU | W250 | 4|10|10|9|10|10|5|5|0|7 | **70** | L | Benchmark-only; competing CLI |
| 128 | continuedev/continue | Apache-2.0 | ~22k | BO | DU | W250 | 4|9|9|9|10|10|5|4|0|7 | **67** | L | IDE assistant; cite-only |
| 129 | cline/cline | Apache-2.0 | ~30k | BO | DU | W250 | 4|9|9|9|10|10|5|4|0|7 | **67** | L | VS Code harness |
| 130 | RooCodeInc/Roo-Code | Apache-2.0 | ~8k | BO | DU | W250 | 4|8|7|7|10|10|5|4|0|6 | **61** | L | Cline-family |

### Misc + Phantom-cite audit trail (W237 baseline + W241 + W250)

| # | Repo | License | Stars | Verdict | CR-12 | Wave | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Σ | Fresh | Notes |
|---|---|---|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| 131 | affaan-m/everything-claude-code | MIT | 183k | RJ | DU | W240 | 1|7|9|1|10|10|6|2|0|6 | **52** | L | LAUNCH-SPIKE; cpd~1500/day fresh-paint |
| 132 | iamtouchskyer/memex | UNKNOWN | ~500 | SP.b | PO | W240 | 5|6|3|5|3|7|7|5|5|5 | **51** | M | License probe pending |
| 133 | Dataojitori/nocturne_memory | UNKNOWN | ~200 | SP.b | PO | W240 | 5|5|3|4|3|7|7|5|5|5 | **49** | M | License probe pending |
| 134 | boshu2/agentops | UNKNOWN | ~300 | SP.b | PO | W240 | 5|6|3|4|3|7|7|5|5|5 | **50** | M | License probe pending |
| 135 | gastownhall/beads | UNKNOWN | ~200 | SP.b | PO | W240 | 5|5|3|4|3|7|7|5|5|5 | **49** | M | License probe pending |
| 136 | DeusData/codebase-memory-mcp | UNKNOWN | ~200 | SP.b | PO | W240 | 5|5|3|4|3|7|7|5|5|5 | **49** | M | License probe pending |
| 137 | VectifyAI/PageIndex | UNKNOWN | ~300 | SP.b | PO | W240 | 5|5|3|4|3|7|7|5|5|5 | **49** | M | License probe pending |
| 138 | yichuan-w/LEANN | UNKNOWN | ~200 | SP.b | PC | W240 | 5|5|3|4|3|7|7|5|5|5 | **49** | M | License probe pending |
| 139 | langfuse/mcp-server-langfuse | MIT | 167 | AN | GN | W237 | 9|10|6|7|10|10|8|8|8|8 | **84** | M | Companion to native MCP |
| 140 | promptarmor MCP layer | UNKNOWN | n/a | RJ | DU | W237 | 0|0|0|0|0|0|0|0|0|0 | **0** | L | 404 phantom |
| 141 | lakera-ai/lakera-mcp-server | Proprietary | n/a | RJ | DU | W237 | 0|0|0|0|0|0|0|0|0|0 | **0** | L | NOT-OSS SaaS |
| 142 | scrubadub/scrubadub | UNKNOWN | n/a | RJ | DU | W237 | 0|0|0|0|0|0|0|0|0|0 | **0** | L | WRONG-OWNER phantom |
| 143 | iamgroot42/piiranha | n/a | n/a | RJ | DU | W237 | 0|0|0|0|0|0|0|0|0|0 | **0** | L | NOT-A-REPO (HF model) |
| 144 | google/shieldgemma | n/a | n/a | RJ | DU | W237 | 0|0|0|0|0|0|0|0|0|0 | **0** | L | NOT-A-REPO (HF model) |
| 145 | openai/moderation | n/a | n/a | RJ | DU | W237 | 0|0|0|0|0|0|0|0|0|0 | **0** | L | NOT-A-REPO (API) |
| 146 | anthropics/constitutional-ai-mcp | n/a | n/a | RJ | DU | W237 | 0|0|0|0|0|0|0|0|0|0 | **0** | L | NOT-A-MCP (training pattern) |

---

## §3 — Per-Layer Top-K Install Priority (PURE-RUNTIME context)

### L1 Foundation (Top-3 INSTALL-NOW)
1. **FiloSottile/age** (99) — Phase 0 prerequisite
2. **mozilla/sops** (97) — Phase 0 prerequisite
3. **openai/codex CLI** (98) — Cross-model gate enabler

**Alternates**: anthropics/claude-code-action (98), anthropics/claude-code-security-review (97)

### L2 Orchestration (Top-3 + 2 alternates)
1. **obra/superpowers** (98) — Skills framework (selectively vendor 6 skills)
2. **anthropics/claude-plugins-official** (97) — Marketplace baseline
3. **addyosmani/agent-skills** (96) — Engineering-phase skills (21)

**Alternates**: trailofbits/skills-curated (86), wshobson/agents (86)

### L3 MCP Servers (Top-3 + 2 alternates)
1. **getzep/graphiti** (96) — L3 temporal-KG
2. **doobidoo/mcp-memory-service** (92) — L1+L2 memory
3. **firecrawl/firecrawl-mcp-server** (91) — Web scrape

**Alternates**: exa-labs/exa-mcp-server (90), comet-ml/opik (89), traceloop/openllmetry (89)

### L4 Memory + RAG (Top-3 + alternate)
1. **mem0ai/mem0** (97) — Apache-2.0; arxiv-published; cpd=3.33 STABLE
2. **topoteretes/cognee** (92) — Apache-2.0 parent (NOT cognee-integrations)
3. **microsoft/graphrag** (90) — IF standalone RAG needed beyond L1-L3

**Alternates**: anthropics native memory_20250818 (87), letta-ai/letta (84) PROVIDER-COMPLEMENT

### L5 Token Optimization (Top-3 + retire)
1. **buildoak/wet** (87) — PRIMARY LLMLingua REPLACEMENT; addresses FM-17.e thrashing
2. **yvgude/lean-ctx** (86) — SECONDARY; Rust+CLI+MCP
3. **yamadashy/repomix** (93) — KEEP existing MCP install

**Retire**: microsoft/LLMLingua (72) → cite-only for SecurityLingua jailbreak defense

### L6 Code Intelligence (Top-3)
1. **astral-sh/ruff** (99) — already-installed system-PATH
2. **oraios/serena** (93) — Symbol-aware editing MCP
3. **ast-grep** (95) + **osv-scanner** (95) + **typos** (94) (Pin-installed cohort)

### L7 Eval + Observability (Top-3)
1. **langfuse/langfuse + native MCP** (93) — Anthropic OFFICIAL recommend per claude-mcp docs
2. **comet-ml/opik** (89) — Eval observability (REPLACES Phoenix ELv2)
3. **promptfoo** (90) — Eval harness

**Alternates**: ccusage (92), traceloop/openllmetry (89)

### L8 Security (Top-3)
1. **trivy** (93) + **gitleaks** (94) + **anchore/syft** (93) — pre-installed cohort
2. **InvariantLabs-ai/mcp-scan** (87) — MCP-protocol security audit
3. **microsoft/presidio** (81) — PII redaction

**Reject**: Tom Farley protect-mcp pending crypto audit (Phase 3.5 gate)

### L9 Browser + Sandbox (Top-3)
1. **playwright-cli** (97) — pre-installed
2. **chrome-devtools-mcp** (90) — pre-installed MCP
3. **browser-use/browser-use** (83) — STUDY-PILOT high-level browser agent

**Alternates**: e2b-dev/E2B (81) — Remote sandbox; SWE-agent/SWE-agent (81)

### L10 Git + CLI Tooling (Top-10 ALL ADOPT)
ripgrep (98), fd (98), jq (98), gh (97), bat (97), hyperfine (97), tokei (96), eza (96), dust (96), bottom (96)
Plus: **astral-sh/uv** (99), **astral-sh/ruff** (99), **delta** (97), **lazygit** (97), **yq** (97), **pre-commit** (96), **sccache** (92), **mkdocs** (92)

### L11 CI/CD Governance (Trio + alternate)
1. **anthropics/claude-code-action** (98)
2. **anthropics/claude-code-security-review** (97)
3. **github/gh-aw** (90)

**Alternate**: opensesh/KARIMO (53) — re-audit >90d before adoption

### Document Ingestion
1. **microsoft/markitdown** (96) — pipx install; lightweight Markdown ingestion

---

## §4 — HONEST-NON-FINDINGS

Per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`, the following are explicit gaps where roster data is insufficient or unverified for pure-runtime install scoring:

1. **License probes pending for ~15 candidates** (rows 108-117, 132-138): UNLICENSED catches captured (rows 118-121, 37, 51); but ~15 STUDY-PILOT.b candidates carry `UNKNOWN` license. Wave 253 MUST fire `mcp__github__get_file_contents path=LICENSE` direct blob reads.

2. **Star counts MAY be stale**: per FM-20 Row 21 (cross-runtime cite-import-AMBER), star counts in this matrix are propagated from W237/W240/W241/W250 wave files — NOT fresh-probed this Wave 252. Star counts marked with `~` are approximations. Wave 253 should re-probe via `mcp__github__search_repositories` for top 20 candidates.

3. **TARGET-runtime probe NOT executed**: per FM-20 row 21 mandate, Mia 7-step alternate-install-path probe on `Z:/claude-sota-pure` is NOT executed in this matrix. ~30-40% of the L10 Git+CLI tooling cohort MAY be ALREADY-INSTALLED in `claude-sota-pure` per prior W207-W214 install batches. Wave 253 MUST run `git -C Z:/claude-sota-pure/. log` + `Get-Item Z:/claude-sota-pure/.local/bin/*` + cross-runtime `winget list` probes.

4. **Cohort coverage (D10) underspecified for outer-research candidates**: 23 W240-C-redo outer-research candidates (rows 108-122) lack >=2-cohort attribution (per `Z:/claude-sota/.claude/rules/research-protocol.md §Repo-discovery sub-rule` 9-cohort menu). Multi-source breadth gate per `Z:/claude-sota/.claude/rules/multi-source-discovery-breadth-discipline.md` only partial — Exa + Perplexity + DeepWiki triangulation deferred to Wave 253.

5. **D3 named-T2 practitioner counts INFERRED**: for many candidates D3 is heuristic from stars + ecosystem footprint, NOT verified via dated artifact (URL + date) per convergence-gate Axis-2. Strong-T2 cohort verified via W241 Agent E mission 3 hardening (12 candidates); remaining ~60 candidates have INFERRED D3 scores.

6. **CR-9 REVERT-grep NOT executed for these candidates**: per cardinal-rule-9 install-risk discipline pre-cite-import REVERT check, `git -C Z:/claude-sota log --all --oneline -- '<sibling-target-path>'` REVERT-grep was not fired this matrix. Wave 253 install execution MUST run REVERT-grep before any sibling cite-import.

7. **FM-17.e BRIDGE-MODE thrashing pattern**: this Sonnet stand-in dispatch ran successfully, but per Wave 241 §1 (n=3 same-arc thrashed), Wave 253 codex T1 review of this matrix MUST use orchestrator-direct Path P (codex exec foreground+tee) NOT BRIDGE-MODE subagent per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.e recovery`.

8. **Operator UI / 7-candidate cluster (rows 113-116, 122)**: all carry `UNKNOWN` license + small star counts; cluster MAY consolidate to 1-2 winners after Wave 253 license probes. Currently scored low (48-56) pending verification.

9. **letta-ai/letta vs mem0 disposition**: per Wave 241 Agent E mission 2, letta is PROVIDER-COMPLEMENT (stateful platform) NOT REPLACEMENT for mem0 (memory library). Letta scored 84 retains adoption-eligible status; mem0 (97) is primary memory choice.

10. **Phantom-cite cohort (n=7 GitHub phantoms; rows 140-146)**: all scored 0/100 (NOT-A-REPO / WRONG-OWNER / NOT-OSS / 404). These are intentionally retained in matrix as audit trail per W237 §4 phantom-cite ladder split discipline — NOT install candidates.

---

## §5 — Pure-Runtime Install-Priority Cross-Layer Top-30

For `Z:/claude-sota-pure` build arc, the cross-layer ranking (filtering for FIT + permissive license + STABLE/ACTIVE Axis-3 + ADOPT verdict + GENUINELY-NEW or selectively-vendor):

| Rank | Score | Repo | Layer | Phase | Install Channel |
|---:|---:|---|---|---|---|
| 1 | 99 | astral-sh/ruff | L6/L10 | Tier 0/2 | `uv tool install ruff` or system-installed |
| 2 | 99 | astral-sh/uv | L10 | Tier 0 | `winget install astral-sh.uv` or curl |
| 3 | 99 | FiloSottile/age | L1 | Tier 0 | `winget install FiloSottile.age` |
| 4 | 98 | obra/superpowers | L2 | Tier 1 | `/plugin marketplace add` |
| 5 | 98 | mem0ai/mem0 | L4 | Tier 1 | `pip install mem0ai` |
| 6 | 98 | openai/codex CLI | L1 | Tier 1 | `npm install -g @openai/codex` |
| 7 | 98 | anthropics/claude-code-action | L11 | Tier 6 | GitHub Action |
| 8 | 98 | ripgrep | L10 | Tier 2 | `winget install BurntSushi.ripgrep` |
| 9 | 98 | sharkdp/fd | L10 | Tier 2 | `winget install sharkdp.fd` |
| 10 | 98 | jq | L10 | Tier 2 | `winget install jqlang.jq` |
| 11 | 97 | mozilla/sops | L1 | Tier 0 | `winget install Mozilla.sops` |
| 12 | 97 | anthropics/claude-plugins-official | L2 | Tier 1 | Marketplace baseline |
| 13 | 97 | langfuse/langfuse + MCP | L7 | Tier 4 | `claude mcp add --transport http` |
| 14 | 97 | playwright-cli | L9 | Tier 5 | `@playwright/cli@1.49.x` |
| 15 | 97 | microsoft/markitdown | L4 | Tier 1 | `pipx install markitdown` |
| 16 | 97 | gh CLI | L10 | Tier 2 | `winget install GitHub.cli` |
| 17 | 96 | addyosmani/agent-skills | L2 | Tier 1 | `/plugin install agent-skills@addy-agent-skills` |
| 18 | 96 | getzep/graphiti | L3 | Tier 1 | `pip install graphiti-core[falkordb]` |
| 19 | 95 | ast-grep | L6 | Tier 2 | `npm install -g @ast-grep/cli` |
| 20 | 95 | osv-scanner | L6/L8 | Tier 2 | `winget install Google.OSV` |
| 21 | 94 | typos | L6 | Tier 2 | `cargo install typos-cli` |
| 22 | 94 | gitleaks | L8 | Tier 2 | `winget install gitleaks` |
| 23 | 93 | trivy | L8 | Tier 2 | `winget install AquaSecurity.Trivy` |
| 24 | 93 | anchore/syft | L8 | Tier 2 | `winget install Anchore.Syft` |
| 25 | 93 | oraios/serena | L6 | Tier 1 | `uvx serena-mcp` |
| 26 | 93 | yamadashy/repomix | L5 | Tier 2 | (MCP existing) |
| 27 | 92 | doobidoo/mcp-memory-service | L3 | Tier 1 | `pip install git+...` |
| 28 | 92 | topoteretes/cognee | L4 | Tier 1 | `pip install cognee` |
| 29 | 92 | ccusage | L7 | Tier 2 | (MCP existing) |
| 30 | 90 | comet-ml/opik | L7 | Tier 4 | `pip install opik` |

**Tier-B INSTALL-AFTER-A**: EveryInc/compound-engineering-plugin, trailofbits/skills-curated, wshobson/agents (selective), Anthropic context-management stack pilot, Anthropic native memory_20250818 pilot

**Tier-C INVESTIGATE**: E2B, browser-use, SWE-agent, smolagents, Marker, MinerU, headroom, NeoLabHQ, ruflo, DSPy, BMAD-METHOD, tokscale

---

## §6 — Cite Trail + verdict_one_line

**Cite trail**:
- `Z:/claude-sota-installed/tmp/wave237-CORRECTED-FINAL-SYNTHESIS-Pattern-A-fix-forward-2026-05-15.md`
- `Z:/claude-sota-installed/tmp/wave240-CLOSE-SYNTHESIS-2026-05-15.md`
- `Z:/claude-sota-installed/tmp/wave241-CLOSE-SYNTHESIS-orchestrator-2026-05-15.md`
- `Z:/claude-sota-installed/tmp/wave250-A7-final-synthesis-2026-05-15.md`
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 (cite-class lattice)
- `Z:/claude-sota/.claude/rules/convergence-gate.md` (Axis 1/2/3)
- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` (Probe 1-7)
- `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` (CR-12 disposition lattice)
- `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md` row 21 (TARGET-runtime probe mandate)
- `Z:/claude-sota/.claude/rules/multi-source-discovery-breadth-discipline.md` (Axis-1 >=4-source families)

**verdict_one_line**:

`DONE_WITH_CONCERNS: Wave 252 Agent C scoring matrix built across ~146 unique repos in 11 layers; 10-dim SRA D1-D10 + CR-12 6-class + Probe DAG verdict + W250-A7 verdict reconciled. Cross-layer top-30 INSTALL-NOW identified for Z:/claude-sota-pure target with FIT TO PURE-RUNTIME framing. STAND-IN-NOTICE: Sonnet stand-in dispatch per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied — Wave 253 MUST cover via Path P codex exec foreground+tee per cross-model-consensus.md §The contract Phase 1 bootstrap exception. 10 HONEST-NON-FINDINGS surfaced including: license probes pending ~15 candidates; star counts stale (FM-20 Row 21 cross-runtime cite-import-AMBER risk); TARGET-runtime probe on Z:/claude-sota-pure NOT executed (Mia 7-step alternate-install-path mandatory before any install commit); D3 named-T2 practitioner counts INFERRED for ~60 candidates; CR-9 REVERT-grep deferred. Matrix is BASELINE for Wave 253 install execution; freshness re-validation, target-runtime probe + cross-model gate satisfaction queued.`
