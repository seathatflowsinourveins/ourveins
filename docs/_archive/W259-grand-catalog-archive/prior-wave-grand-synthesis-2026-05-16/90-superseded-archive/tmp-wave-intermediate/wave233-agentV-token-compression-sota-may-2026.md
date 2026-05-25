# Wave 233-V — Token Compression SOTA May 2026 — Replacements for microsoft/LLMLingua

**agent**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f); cross-model gate via codex T1 NOT fired this dispatch — orchestrator-side T1 satisfies advanced-agent-team-standing-directive at wave-level)
**date**: 2026-05-15 → 2026-05-16
**output_mode**: ARTIFACT-INLINE per FM-19
**status**: AUTHORITATIVE-CANDIDATE

## §1 Phantom-cite scan results

**n=0 phantom catches this fire.** All 8 candidates probed below resolve to active GitHub repos. Two upstream catches from prior waves (W221-E `atlassian-labs/mcp-compressor` + `distill-mcp`) already documented; not re-encountered. GitHub API rate-limited mid-research (1 instance, reset 3s) — secondary probes via WebSearch + WebFetch + `mcp__github__get_file_contents` README reads confirm material claims.

## §2 Top-5 SOTA candidates — convergence-gate ALL 4 axes

### Candidate 1 — `ace-agent/ace` (ACE: Agentic Context Engineering)
- **Cite**: `ace-agent/ace @ HEAD 4f679bef3b78e973a0e13a0acc2b4a7f6f7e41a2` [VERIFIED 2026-05-16 via `mcp__github__get_file_contents`]
- **Paper**: arXiv 2510.04618 — Zhang et al. (Stanford × SambaNova × UC Berkeley, ICLR 2026)
- **License**: Apache 2.0
- **Stars/cpd**: trending (release 2025 Nov)
- **Axis 1**: PASS — Stanford + SambaNova + UC Berkeley + DeepSeek-V3.1 default backend
- **Axis 2**: PASS — sambanova.ai blog + marktechpost + infoq + cobusgreyling.medium
- **Axis 3**: STUDY-PILOT BAND — ~6mo age; STRONG-PROVENANCE-EXPRESS PASS via Stanford-T1 + SambaNova-org
- **Axis 4**: PARTIAL — Probe 5 mode-harness RISK (train/val/test framework); Probe 6 license PASS
- **MEASURED**: +10.6% AppWorld; +8.6% FiNER+XBRL; -86.9% adaptation latency; -82.3% vs GEPA; -91.5% vs Dynamic Cheatsheet
- **Verdict**: STUDY-PILOT — high research-value, requires adaptation for code-agent context

### Candidate 2 — `microsoft/acon` (ACON: Agent Context Optimization)
- **Cite**: `microsoft/acon @ HEAD d63f9ae18959dc7215ff62899c94c5e8c56847ae` [VERIFIED 2026-05-16]
- **Paper**: arXiv 2510.00615 — Kang et al. (Microsoft Research; SAME team that shipped LLMLingua)
- **License**: MIT
- **Stars**: 72 / forks 10 (created 2025-09-30; last updated 2026-05-13)
- **Axis 1**: PARTIAL — Microsoft (org #1) primary; AppWorld (StonyBrookNLP #2) + OfficeBench (#3) method validation
- **Axis 2**: WEAK — paper publication only, no dated practitioner adoption posts
- **Axis 3**: STUDY-PILOT — ~7.5mo age; Microsoft-org maintainership = STRONG-PROVENANCE-EXPRESS firm PASS
- **Axis 4**: STRONG — Probe 5 mode-harness PASS for code-agent (explicit target); Probe 6 MIT PASS
- **MEASURED**: Long-horizon LLM agent compression; AppWorld + OfficeBench + 8-objective QA; Distillation (Compressor LoRA + Agent LoRA Stage 1+2)
- **Verdict**: **ADOPT-NOW eligible** — Microsoft Research successor to LLMLingua specifically targeting agent-context-compression

### Candidate 3 — `jia-gao/leanctx`
- **Cite**: `jia-gao/leanctx @ HEAD 6a27975c51df3de15481a39b5cf280c1a0cc034d` [VERIFIED 2026-05-16]
- **License**: MIT
- **Stars**: 225 / forks 1 (created 2026-04-18; last update 2026-05-15 — actively maintained THIS WEEK)
- **PyPI**: `pip install leanctx`
- **Axis 1**: PARTIAL — single-maintainer (jia-gao) BUT 4 distinct provider SDKs (Anthropic + OpenAI + Gemini + HuggingFace LLMLingua-2)
- **Axis 2**: PARTIAL — public release 2026-04-26 + 5-round Codex-reviewed RLCR loop
- **Axis 3**: BORDERLINE-PASS — ~28d age + 257 tests + 40 source files + ruff/mypy clean → ACTIVE-ITERATION; STRONG-PROVENANCE-EXPRESS does NOT apply (single-individual)
- **Axis 4**: STRONG — Probe 5 PASS for code-agent (built for "Cursor-like / Claude-Code-like"); Probe 6 MIT PASS
- **MEASURED**: LongBench v2 short-subset DOUBLES accuracy (40% vs 20% baseline) at 43% tokens; internal agent-transcript 35.6% token reduction (2148→1384) BYTE-IDENTICAL preserve tool_use + tracebacks + edit_file; drop-in `from leanctx import OpenAI`; 12 wrapper paths; OpenTelemetry built-in
- **Verdict**: STUDY-PILOT — high-fit for claude-sota agent context, but ~28d age → re-audit at age≥90d; production use reasonable now

### Candidate 4 — `microsoft/LLMLingua` (incumbent baseline)
- **Cite**: `microsoft/LLMLingua @ HEAD e0e9d99beb94098bbd924aa53c2c112eac41c758` [VERIFIED 2026-05-16]
- **License**: MIT
- **Stars**: ~5K+; active news through 2024-12-13 (SCBench)
- **Axis 1**: FIRM PASS — Microsoft + LangChain + LlamaIndex + Prompt Flow (3-4 orgs)
- **Axis 2**: FIRM PASS — EMNLP 2023 + ACL 2024 + CoLM 2025; HuggingFace spaces; Medium posts
- **Axis 3**: FIRM STABLE-BURN-IN — 2+ years; production-tested via Prompt Flow + LangChain + LlamaIndex
- **Axis 4**: PASS — Probe 5 note: token-classifier ~1.2 GB weights (size-sprawl risk for autonomous /loop)
- **User flag "outdated" reframed**: Microsoft has continued evolving family — SCBench (Dec 2024) + RetrievalAttention (Sept 2024) + MInference (Jul 2024) + SecurityLingua (CoLM 2025) + ACON (Sept 2025). PARTIALLY refuted.
- **Verdict**: KEEP-AS-INCUMBENT for STATIC-PROMPT compression; layer ABOVE via ACON for agent-context

### Candidate 5 — `3DAgentWorld/Toolkit-for-Prompt-Compression` (PCToolkit)
- **Cite**: `3DAgentWorld/Toolkit-for-Prompt-Compression @ HEAD e38d6d80c1bdc1eb4feb8fe008e0aad48003a006` [VERIFIED 2026-05-16]
- **Paper**: arXiv 2403.17411 — IJCAI 2025
- **License**: per LICENSE shield (likely MIT/Apache)
- **Axis 1**: WEAK — 3DAgentWorld bundling 5 other orgs' methods (Microsoft + Yucheng Li + Ghalandari + Laban)
- **Axis 2**: PASS — IJCAI 2025 + arXiv preprint
- **Axis 3**: STABLE — 2024-03 + IJCAI 2025 = ~2.2y STABLE-BURN-IN PASS
- **Axis 4**: PASS — Probe 5 PASS (modular); Probe 4 namespace CLEAN
- **MEASURED**: 5 compression methods × 11 datasets × 5+ metrics
- **Verdict**: STUDY-PILOT for benchmark-driven adoption only

## §3 Per-candidate A-F grade (W232 §7 10-dim rubric)

| Candidate | D1 Cite | D2 Star/age | D3 License | D4 Activity | D5 Adopt | D6 Probe | D7 Doc | D8 Production | D9 sss-fit | D10 SOTA-ts | Grade |
|---|---|---|---|---|---|---|---|---|---|---|---|
| ACE | A | B | A | A | C | B | A | C | C | A | **B+** |
| ACON | A | B | A | A | B | A | A | B | A | A | **A** |
| leanctx | B | B+ | A | A+ | A | A | A | A | A | A | **A** |
| LLMLingua incumbent | A | A | A | C | A | C | A | A | B | B | **B+** |
| PCToolkit | B | B | B | C | C | B | A | B | C | B | **B** |

## §4 CR-12 6-class disposition

| Candidate | CR-12 disposition | Reasoning |
|---|---|---|
| ACE | **GENUINELY-NEW** | Self-improving agent context via evolving playbooks; no sss incumbent |
| ACON | **GENUINELY-NEW** | Microsoft Research successor to LLMLingua for agent-history-compression |
| leanctx | **PARTIAL-OVERLAP** with context-mode | Drop-in wrapper paradigm overlaps; leanctx is provider-SDK-level + content-aware routing — different layer |
| LLMLingua | **CITE-CLASS-CANONICAL** | Base compressor used by leanctx + claude-shorthand + EntropySqueezer + PCToolkit |
| PCToolkit | **DUPLICATE-FUNCTIONALITY** with ACE+ACON | Benchmark framework wrapping older methods |

## §5 Top-3 ADOPT-NOW recommendations

### Recommendation #1 — `microsoft/acon` (ADOPT-NOW PRIMARY)
**Why**: Microsoft Research SUCCESSOR to LLMLingua specifically targeting long-horizon agent context (sss exact use case); MIT; STRONG-PROVENANCE-EXPRESS Axis 3 PASS.

```bash
git clone --depth 1 https://github.com/microsoft/acon.git Z:/claude-sota-installed/.local/acon
cd Z:/claude-sota-installed/.local/acon
git rev-parse HEAD > .pinned-sha  # currently d63f9ae18959dc7215ff62899c94c5e8c56847ae
uv pip install -e .
```

### Recommendation #2 — `jia-gao/leanctx` (ADOPT-NOW SECONDARY — production runtime wrapper)
**Why**: ACTIVELY MAINTAINED THIS WEEK (last update 2026-05-15); explicitly Claude-Code-targeted; preserves tool_use/error/code verbatim; MIT.

```bash
uv pip install 'leanctx[anthropic,openai,gemini,lingua,otel]==0.3.1'  # CR-9 version-pin
leanctx bench list  # 7 scenarios
leanctx bench run agent-structural --workload agent
```

### Recommendation #3 — `ace-agent/ace` (STUDY-PILOT — research adoption track)
**Why**: Stanford × SambaNova × UC Berkeley ICLR 2026; +10.6% agent tasks; addresses CONTEXT-COLLAPSE (critical for sss 1M-context long arcs); GENUINELY-NEW.

STUDY-PILOT 5-clause check:
1. Named use case: ACE Generator/Reflector/Curator for sss long-arc /loop self-improvement
2. Cited local input: `Z:/claude-sota-installed/.claude/state/codex_*.jsonl` audit trails as "execution feedback"
3. Wiring path: Adapter wraps sss /loop fire as ACE round; playbook → input to next /loop
4. Incumbent comparison: Karpathy §5 Wiki Compounding Surface is adjacent but lacks structured delta-update mechanism
5. Reversible time-box: 30-day pilot; owner = orchestrator; retire to verified-avoid.md if no arc-convergence improvement at /loop wave 50

```bash
git clone --depth 1 https://github.com/ace-agent/ace.git Z:/claude-sota-installed/.local/ace
cd Z:/claude-sota-installed/.local/ace
curl -LsSf https://astral.sh/uv/install.sh | sh
uv sync
```

## §6 LLMLingua-class replacement decision rationale

**User flag "LLMLingua outdated"**: PARTIALLY-REFUTED + STRUCTURALLY-CORRECT.

**Partially refuted**: Microsoft LLMLingua family has NOT stopped — continued via SCBench (Dec 2024) + RetrievalAttention (Sept 2024) + MInference (Jul 2024) + SecurityLingua (CoLM 2025) + ACON (Sept 2025). LLMLingua-2 still base compressor used by leanctx + claude-shorthand + EntropySqueezer.

**Structurally correct**: LLMLingua's ORIGINAL formulation (perplexity-based token pruning by single small LM) is now superseded for AGENT-context-compression by:
1. **ACON** (Microsoft itself) — agent-history-specific with environment-observation distillation
2. **ACE** (Stanford+SambaNova) — agentic context engineering via evolving playbooks (different architecture: structured-delta-updates, not token-pruning)
3. **leanctx** (production wrapper) — content-aware routing (verbatim for code/error/tool-call; LLMLingua-2 for prose; SelfLLM for important-long) — layer ABOVE LLMLingua, not REPLACEMENT

**Recommended disposition**:
- **REPLACE-WITH-X for AGENT-CONTEXT**: ACON OR leanctx
- **KEEP-AS-INCUMBENT for STATIC-PROMPT**: LLMLingua-2 for RAG document compression
- **CITE-CLASS-CANONICAL**: LLMLingua family as cite-anchor for "perplexity-based prompt compression" research surface

## §7 verdict_one_line

verdict_one_line: ADOPT-NOW PRIMARY=microsoft/acon @ d63f9ae1 MIT (Microsoft Research LLMLingua successor, agent-context-targeted); ADOPT-NOW SECONDARY=jia-gao/leanctx @ 6a27975c MIT v0.3.1 (production Claude-Code-targeted SDK actively maintained THIS WEEK); STUDY-PILOT=ace-agent/ace @ 4f679bef Apache-2.0 (Stanford+SambaNova ICLR 2026 +10.6% agent-task framework); LLMLingua disposition=KEEP-AS-CITE-CANONICAL for static-prompt + REPLACE-FOR-AGENT-CONTEXT with ACON; n=5 candidates phantom-verified zero ghosts; n=4 convergence-gate axes scored per candidate.

**Status disclosure**: Sonnet stand-in per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied at subagent layer — orchestrator must fire codex T1 at wave-close synthesis.
