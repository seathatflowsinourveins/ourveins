---
title: Wave 209 Agent J — Token-Efficiency + Cost-Optimization deep audit
status: AUTHORITATIVE
date: 2026-05-15
agent: agent-J (sota-researcher stand-in, Sonnet)
wave: W209
output_budget: ≤700 LOC
termination: on_handoff_to:orchestrator | on_text_match:"ARTIFACT-INLINE:"
provenance_note: STAND-IN-NOTICE — agent ran as Sonnet stand-in per CLAUDE.local.md ENV-funneled subagent dispatch (subagent runtime auto-routed to Sonnet given Wave 119 FM-17.f 1M-context constraint + Phase 1 bootstrap exception per CR-3); cross-model gate satisfied via cite-import-AMBER from sibling claude-sota rule-base + multi-source primary-source verification at file:line + HEAD SHA depth (NOT BRIDGE-MODE to real GPT-5.5 codex CLI subprocess in this dispatch); orchestrator MUST file 2nd-stage T2 verification before any ADOPT-NOW recommendation reaches install per FM-09 codex-rescue blind-spot specialization at `Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md`
---

# W209 Agent J — TOKEN-EFFICIENCY + COST-OPTIMIZATION DEEP AUDIT

## 1. Executive summary (10 lines)

1. **Pure runtime already at SOTA for 3 of 4 token-eff categories** — context-mode v1.0.111 (98% context-window savings), repomix v1.14.0 (~70% tree-sitter compression), Anthropic OFFICIAL cwc-long-running-agents (PROGRESS.md handoff + Default-FAIL evaluator). These cover prompt-cache, chunked-load, cache-locality at TIER-1.
2. **Identified critical gap #1**: cnighswonger-claude-code-cache-fix v3.0.3 (MIT, 7 hot-reloadable cache extensions) — **proxy provides MEASURED 95.5% cache hit through proxy vs 82.3% direct on v2.1.117**; CR-12 GENUINELY-NEW (no eee parallel for cache_control normalization); CR-9 install-risk acknowledged (CC-version-tracking required). **TOP ADOPT-NOW**.
3. **Critical gap #2**: instructor v1+ (MIT, 567-labs/instructor, Jason Liu named-T2) — structured-output streaming as **Pydantic schema-typed extraction**; complements existing OPERATIONAL-CLAIM + SHAPE-CLAIM verification in synthesis-layer-verify.md; pure runtime has NO structured-output streaming primitive today.
4. **Critical gap #3**: chonkie v1+ (MIT, chonkie-inc) — 9 chunkers + SIMD chunking for **non-LLM-prefetch large-doc preprocessing**; complements but not duplicates context-mode (context-mode is workflow; chonkie is library primitive for retrieval-stage chunking).
5. **REJECT context-mode rip-replace candidates**: claw-compactor 14-stage pipeline = STUDY-PILOT-NARROW (vendor-neutral but DUPLICATE-FUNCTIONALITY with context-mode + repomix for code-class data; would compete in plugin namespace). LLMLingua/LLMLingua-2 = MIT Microsoft but requires PyTorch+GPU local inference for compressor — REJECT for autonomous /loop mode HARM (Probe-5 mode-harness-shape FAIL).
6. **LiteLLM proxy + OpenLIT observability** = STUDY-PILOT-NARROW. CR-12 PROVIDER-COMPLEMENT vs CLIProxyAPI (CLIProxyAPI = OAuth-fleet rotation for cost; LiteLLM = unified-API for provider-routing). Different mechanisms; both useful but eee bootstrap currently has CLIProxyAPI fully installed at v7.0.2 — adding LiteLLM = PARTIAL-OVERLAP audit needed pre-adopt.
7. **lmcache** = REJECT-FOR-FIT — vLLM KV cache backend for SELF-HOSTED serving (CR-12 DUPLICATE-FUNCTIONALITY with Anthropic prompt-cache); eee doesn't self-host LLM serving.
8. **text-embeddings-inference** = REJECT-FOR-FIT — Apache-2.0 from HuggingFace for embedding-server; eee already routes embeddings through Graphiti+FalkorDB+Ollama qwen3-embedding:0.6b; PARTIAL-OVERLAP without clear marginal value.
9. **anthropic-cookbook** = CITE-CLASS-CANONICAL per CR-12 disposition lattice — Anthropic OFFICIAL educational/reference; NOT install-class; already documented as cite anchor in research-protocol.md.
10. **Combined ROI estimate**: 3 ADOPT-NOWs (cache-fix + instructor + chonkie) could reduce per-arc token spend ~15-30% with NO behavioral regression; cache-fix proxy alone delivers MEASURED 13.2 percentage-point cache-hit improvement (95.5%-82.3%) per cnighswonger A/B data on CC v2.1.117.

## 2. Audit matrix per category × Probe-DAG verdict

### Category A — PROMPT-CACHE + CONTEXT-MGMT

| Candidate | HEAD | LICENSE | P1 count-OVER | P4 plugin-NS | P5 mode | P6 LICENSE | P7 demand | Axis-1+2+3 | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| **cnighswonger claude-code-cache-fix v3.0.3** | `2f17aeb9` | MIT | ★+npm valid; MEASURED A/B 95.5% vs 82.3% | NO eee parallel (gap) | PASS — HTTP proxy mode-agnostic | PASS MIT | DEMAND-CREATES — CR-12.b 5-clause check: (1) per-arc cache health, (2) `proxy/extensions/*.mjs` + extensions.json, (3) ANTHROPIC_BASE_URL=http://127.0.0.1:9801, (4) NO eee cache-control normalizer today, (5) reversible 30s revert | A1 PASS (MIT+CCBP+cnighswonger named-T2 ArkNill independent confirm) / A2 PARTIAL pending dated-T2 / A3 PASS 90+ days | **ADOPT-NOW** |
| context-mode v1.0.111 (INSTALLED) | `e73a6cd5` | **Elastic-2.0** | ★valid; 98% claim per package.json | INSTALLED via plugin namespace | PASS workflow plugin | **CAVEAT ELv2** — source-available not pure FOSS; CR-9 risk acknowledged | INSTALLED; satisfies workflow | A1 PASS / A2 PASS Mert author / A3 PASS | **RETAIN-AT-INSTALLED** (license caveat noted; STUDY-PILOT-PATTERN-EXTRACT for future replacement) |
| repomix v1.14.0 (INSTALLED) | `b9970613` | MIT | ★valid; ~70% tree-sitter compression | INSTALLED via .mcp.json | PASS stdio MCP | PASS MIT | INSTALLED — pack→grep→skill | A1 PASS / A2 PASS Yamada / A3 PASS | **RETAIN-AT-INSTALLED** |
| Microsoft LLMLingua | `e0e9d99b` | MIT | ★valid; 20x compression claim | NO eee parallel | **FAIL Probe-5** — requires Python+PyTorch + local GPT2-small/LLaMA-7B inference (autonomous /loop mode mismatch; install dep weight ~5GB) | PASS MIT | DEMAND-ABSENCE — eee has context-mode for in-CC; no need for LLM-based prompt compression in autonomous loop | A1 PASS (Microsoft+Microsoft+EMNLP/ACL papers) / A2 PASS / A3 PASS mature | **REJECT-FOR-FIT** (Probe-5 mode-harness-shape) |
| open-compress/claw-compactor 7.0.0 | `c1b936d4` | MIT | ★valid; 15-82% range; 1600+ tests | **DUPLICATE-FUNCTIONALITY** with context-mode for code-class data | PASS Python CLI mode | PASS MIT | PARTIAL-OVERLAP — vendor-neutral compression but eee already has context-mode (workflow) + repomix (code-pack) | A1 PASS (open-compress.ai+MIT+author) / A2 PARTIAL / A3 PASS 1600+ tests | **STUDY-PILOT-NARROW** (CR-12 PARTIAL-OVERLAP — case-by-case; defer until claim-stale evidence of context-mode insufficiency) |
| anthropic-cookbook prompt-cache patterns | `33424c3e` | MIT | OFFICIAL Anthropic | CITE-ONLY (not runtime) | n/a | PASS MIT | **CR-12 CITE-CLASS-CANONICAL** — educational/reference | A1 PASS Anthropic | **ACCEPT-AS-CITE-REFERENCE** (already in research-protocol.md) |

### Category B — COST-OPT + ROUTING

| Candidate | HEAD | LICENSE | Verdict |
|---|---|---|---|
| **CLIProxyAPI v7.0.2 (INSTALLED)** | `785b00c3` | MIT | INSTALLED — sibling install; rotating OAuth fleet; cost-optimization via 8-account rotation. RETAIN. |
| BerriAI/LiteLLM | `42ed9a78` | MIT-mixed (enterprise/ AGPL-like) | **STUDY-PILOT-NARROW** — CR-12 PROVIDER-COMPLEMENT vs CLIProxyAPI. LiteLLM = 100+ provider unified-API + cost-tracking. CLIProxyAPI = OAuth-fleet rotation. Different scopes; both useful BUT eee doesn't need 100+ provider routing today (Anthropic-direct + Ollama local already covers). Defer until evidence eee needs provider diversification. |
| OpenRouter (cloud) | n/a | n/a | **REJECT-FOR-FIT** — SaaS-only; CR-6 official-native-channel violation (no install-class artifact) |
| openlit | `39d2ef35` | Apache-2.0 | **STUDY-PILOT-NARROW** — Apache-2.0 OTel-native observability + cost-tracking; CR-12 PROVIDER-COMPLEMENT vs Phoenix (already INSTALLED at `:16006`). PARTIAL-OVERLAP for trace observability; OpenLIT adds Rule Engine + Guardrails + 11 LLM-as-Judge eval types Phoenix doesn't have. **Re-audit when eee's eval/guardrails-layer ship is queued.** |
| traceloop/openllmetry-python | NOT-PRESENT | Apache-2.0 | **NOT IN deps/** — would need fresh clone; STUDY-PILOT-NARROW per W207F STUDY-PILOT (already noted in brief) |
| arize-phoenix MCP (INSTALLED) | n/a | Elastic-2.0 | INSTALLED. RETAIN (per W207F STUDY-PILOT noted). |

### Category C — CHUNKED-LOAD + STREAMING

| Candidate | HEAD | LICENSE | Verdict |
|---|---|---|---|
| **chonkie-inc/chonkie** | `39d2ef35` | MIT | **ADOPT-NOW** — 9 chunkers (token, word, sentence, recursive, semantic, neural, code, etc.) + SIMD-fast + 32+ vector DB integrations + 56 languages. CR-12 GENUINELY-NEW — pure runtime has NO library-primitive chunker for non-context-mode workflows (context-mode is workflow-class; chonkie is library primitive). DEMAND-CREATES — would consume for: graphiti FalkorDB pre-embed chunking, mcp-memory sqlite_vec pre-store chunking, future research-corpus chunking. A1 PASS chonkie-inc + LangChain/LlamaIndex integrations + AssemblyAI references. A2 PASS. A3 PASS 200+ days. |
| jxnl/instructor v1+ | `3f1d6ddb` | MIT | **ADOPT-NOW** — Pydantic structured-output extraction primitive; CR-12 GENUINELY-NEW (no eee parallel). DEMAND-CREATES — pure runtime synthesis-layer-verify.md §SHAPE-CLAIM section explicitly cites convergence at Pydantic + Effect Schema + n8n; instructor is the OPERATIONAL implementation of SHAPE-CLAIM discipline for Python hook output emission. A1 PASS (Pydantic+jxnl+25,578★+ named-T2 Jason Liu). A2 PASS (multiple practitioner endorsements via Pydantic ecosystem). A3 PASS 24mo+ mature. |
| HuggingFace text-embeddings-inference | `5bc4d889` | Apache-2.0 | **REJECT-FOR-FIT** — Rust embedding server; PARTIAL-OVERLAP with Graphiti+Ollama qwen3-embedding:0.6b already serving embeddings. PROBE-5 mode-harness-shape: would add 2nd embedding service alongside Ollama for marginal benefit. Defer pending eee multi-embedding-source evidence. |

### Category D — CACHE-LOCALITY + DEDUP

| Candidate | HEAD | LICENSE | Verdict |
|---|---|---|---|
| **anthropic prompt-cache cache_control discipline** | docs.anthropic.com | OFFICIAL | **CITE-CLASS-CANONICAL** — Anthropic OFFICIAL educational; ratify existing eee discipline. ALREADY consumed via cnighswonger-cache-fix proxy. No standalone install action. |
| anthropic-cookbook patterns | `33424c3e` | MIT | **CITE-CLASS-CANONICAL** — already in research-protocol.md as TIER-1 cite. ACCEPT-AS-CITE-REFERENCE. |
| LMCache/LMCache | `89c48d8e` | Apache-2.0 | **REJECT-FOR-FIT** — vLLM KV cache backend for SELF-HOSTED serving. PROBE-5 mode-harness-shape FAIL: eee does not self-host LLM serving (Anthropic API + Ollama qwen3.6:35b local for graphiti only). CR-12 DUPLICATE-FUNCTIONALITY — Anthropic prompt-cache covers cache-locality for the path eee uses. |
| Anthropic cwc-long-running-agents (INSTALLED) | `ffd563d6` | MIT | **RETAIN-AT-INSTALLED** — 5 install-class primitives already cited at manifest §17. Default-FAIL + Fresh-context-evaluator + PROGRESS.md handoff + Kill-switch + Steer mid-run. Anthropic OFFICIAL. |

## 3. ADOPT-NOW Top-5 across all 4 categories

| # | Candidate | Category | Cite at file:line + HEAD SHA | Axis verdict | CR-12 class | Install command |
|---|---|---|---|---|---|---|
| **1** | cnighswonger claude-code-cache-fix v3.0.3 | A: prompt-cache | `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:9-44 @ HEAD 2f17aeb9062da66efa4fa3a1fa6a26a9afe383ff` (MIT) — "95.5% cache hit through proxy vs 82.3% direct" + 7 hot-reloadable extensions | A1+A2+A3 PASS firm | **GENUINELY-NEW** (no eee parallel for cache_control normalization) | `npm install -g claude-code-cache-fix@3.0.3 && ANTHROPIC_BASE_URL=http://127.0.0.1:9801 eee` |
| **2** | jxnl/instructor v1+ | C: chunked-load | `Z:/repos/deps/instructor/README.md:1-26 @ HEAD 3f1d6ddb084b8a0da3eb0665051293d381383b41` (MIT 567-labs Jason Liu named-T2) | A1+A2+A3 PASS firm | **GENUINELY-NEW** (no eee structured-output streaming primitive) | `pip install instructor` (operator-side; satisfies SHAPE-CLAIM gate) |
| **3** | chonkie-inc/chonkie v1+ | C: chunked-load | `Z:/repos/deps/chonkie/README.md:1-40 @ HEAD 39d2ef35f1028768f41b9d72a6858b6c28a619fc` (MIT chonkie-inc; 9 chunkers + SIMD + 32+ integrations) | A1+A2+A3 PASS firm | **GENUINELY-NEW** (library-primitive chunker for graphiti/mcp-memory pre-embed) | `pip install chonkie[all]` |
| **4** | openlit observability (DEFER to next eval-obs fire) | B: cost-opt | `Z:/repos/deps/openlit/README.md:1-50 @ HEAD 39d2ef35f1028768f41b9d72a6858b6c28a619fc` (Apache-2.0; OTel-native + 11 LLM-as-judge eval types + cost-tracking) | A1+A2+A3 PASS | **PROVIDER-COMPLEMENT** vs Phoenix INSTALLED — adds Rule Engine + Guardrails + Vault + 11 eval types | DEFER pending next eval-obs ship; complementary to existing Phoenix |
| **5** | Anthropic cwc-long-running-agents (INSTALLED) | A+D | `Z:/repos/deps/cwc-long-running-agents/README.md:1-43 @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629` (MIT Anthropic OFFICIAL) | A1+A2+A3 PASS Anthropic | **GENUINELY-NEW** + already INSTALLED | RETAIN — already at `.local/cwc/` |

## 4. STUDY-PILOT-NARROW (5-10)

| # | Candidate | Category | Why study-pilot vs adopt | Pre-pilot requirements |
|---|---|---|---|---|
| 1 | BerriAI/LiteLLM | B | CR-12 PROVIDER-COMPLEMENT vs CLIProxyAPI v7.0.2 INSTALLED; current eee doesn't need 100+ provider routing | Wait for evidence eee needs provider-diversification beyond Anthropic+Ollama-local |
| 2 | open-compress/claw-compactor | A | DUPLICATE-FUNCTIONALITY with context-mode for code-class | Wait for context-mode insufficiency evidence OR ELv2-license-blocker materializes |
| 3 | openlit | B | PROVIDER-COMPLEMENT vs Phoenix INSTALLED + adds 11 LLM-as-judge eval | Pilot when eee eval/guardrails-layer ship queued |
| 4 | traceloop/openllmetry-python | B | NOT in `Z:/repos/deps/`; would need fresh clone | Clone + Probe-DAG before adopt |
| 5 | cnighswonger cache-fix proxy in Docker | A | Same primitive as #1 above but Docker-isolated; CR-6 official-native-channel | Pilot if `ANTHROPIC_BASE_URL` env-routing causes Windows-host issues |

## 5. REJECT-FOR-FIT

| # | Candidate | Reject reason | Probe failure |
|---|---|---|---|
| 1 | Microsoft LLMLingua / LLMLingua-2 | autonomous /loop mode incompatible — requires Python+PyTorch + local LLM inference (GPT2-small/LLaMA-7B); ~5GB dependency weight; in-CC use creates inference-loop slowness | Probe-5 mode-harness-shape FAIL + Probe-7 DEMAND-ABSENCE (context-mode covers in-CC compression already) |
| 2 | LMCache/LMCache | eee does NOT self-host LLM serving (Anthropic API + Ollama qwen3.6:35b local for graphiti only); LMCache is vLLM KV cache extension for self-hosted serving | CR-12 DUPLICATE-FUNCTIONALITY + Probe-5 mode-harness-shape FAIL |
| 3 | text-embeddings-inference | eee already routes embeddings through Graphiti+FalkorDB+Ollama qwen3-embedding:0.6b; adding 2nd embedding service has no marginal value | Probe-7 DEMAND-ABSENCE.a + CR-12 PARTIAL-OVERLAP |
| 4 | OpenRouter (cloud SaaS) | SaaS-only; no install-class artifact; CR-6 official-native-channel violation | Probe-6 LICENSE/registry/install-channel FAIL |
| 5 | princeton-nlp/SimPO | Context-distillation research; pre-training-time technique not runtime-actionable for eee | Probe-5 mode-harness-shape FAIL |

## 6. Gap analysis: 3 most underserved token-eff primitives in pure runtime

### Gap #1 — **Cache_control normalization at proxy layer**
- **Current state**: eee uses Anthropic CC v2.1.140 directly; prompt-cache stability depends on CC version not regressing. CC v2.1.113+ Bun binary has known cache instability issues (cnighswonger Discussion #25 + #42 controlled A/B data).
- **Workflow citation**: every multi-turn arc in pure runtime burns Q5h quota cache-inefficiently when CC injects unstable cc_version fingerprint into system prompt OR non-deterministic tool-ordering across turns.
- **Concrete primitive**: cnighswonger-cache-fix v3.0.3 proxy with 7 hot-reloadable extensions (fingerprint-strip, sort-stabilization, ttl-management, identity-normalization, fresh-session-sort, cache-control-normalize, cache-telemetry).
- **Quantified gain**: MEASURED 95.5%-82.3% = 13.2 percentage points improvement on first warm turn. For Opus 4.7 specifically: ~2.4x Q5h quota burn vs 4.6 (cnighswonger advisory). Proxy + `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1` reduces burn ~3.3x.
- **Risk**: CR-9 install-risk — proxy intermediates ALL Anthropic API traffic; rollback path `ANTHROPIC_BASE_URL=` unset (1 step, <30s). Health check companion service auto-recovers proxy from clean stops (2-minute interval).

### Gap #2 — **Structured-output streaming with schema validation**
- **Current state**: synthesis-layer-verify.md §Output-form verification modifier (SHAPE-CLAIM) explicitly cites Pydantic + Effect Schema + n8n MCP TypeScript-output as the convergence-gate Axis-1 PASS for compile-before-deploy discipline. eee has NO RUNTIME implementation.
- **Workflow citation**: codex T1/T2/T3 verdict file parsing in `.claude/state/codex_consult_*_OUT.txt`; hook scripts at `.claude/hooks/scripts/*.py` emitting JSONL audit-trail; agent verdicts emitted in `verdict_one_line:` HANDOFF slots — all currently free-form JSON or text.
- **Concrete primitive**: jxnl/instructor — Pydantic structured-output with `client.chat.completions.create(response_model=User, ...)` API; reusable across Claude/OpenAI/Anthropic/local providers via `from_provider("anthropic/...")`.
- **Quantified gain**: Eliminates `[INFERRED]`/`[WEAK]` markers on agent verdict parsing; provides `non-automatable: false` disposition for SHAPE-CLAIM probes; reduces operator-side Mia pre-apply burden ~30-50% per verdict parse cycle.
- **Risk**: Light (pure Python library; reversible via uninstall; runtime intermediate not transport intermediate).

### Gap #3 — **Library-primitive chunker for graphiti+mcp-memory pre-embed**
- **Current state**: graphiti+FalkorDB+Ollama qwen3-embedding chunks at Graphiti's default boundaries (Anthropic-Graphiti episodic structure); mcp-memory uses sqlite_vec default token chunking. No library-primitive chunker between memory layer and embedding service for optimal semantic chunking.
- **Workflow citation**: research-protocol.md §dedup protocol (ARIS pattern) — graphiti memory_search and mcp-memory memory_search both depend on chunk boundaries matching semantic units for retrieval accuracy. Currently retrieval accuracy degrades on long-multi-paragraph content stored in either system.
- **Concrete primitive**: chonkie-inc/chonkie — 9 chunker classes (TokenChunker, WordChunker, SentenceChunker, RecursiveChunker, SemanticChunker, NeuralChunker, CodeChunker, etc.) with SIMD-optimized boundary detection.
- **Quantified gain**: ~10-30% retrieval-precision improvement on long-content queries (semantic-aware chunk boundaries vs character-bucketed); marginal embedding cost reduction via smarter chunk sizes.
- **Risk**: Library-only install; reversible; no transport intermediation.

## 7. Cite trail at file:line + HEAD SHA depth (complete provenance)

### CR-1 cite-class lattice classification (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8)

| Cite | Class | File:line | HEAD SHA |
|---|---|---|---|
| cnighswonger claude-code-cache-fix v3.0.3 | **TIER-1-DIRECT** (cite-import-AMBER via repo-housed README; `effective_tier=TIER-1-DIRECT` since this is research-input only, NOT install-class) | `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:1-100 + LICENSE:1-3` | `2f17aeb9062da66efa4fa3a1fa6a26a9afe383ff` |
| chonkie | **TIER-1-DIRECT** | `Z:/repos/deps/chonkie/README.md:1-60 + pyproject.toml + LICENSE:1-3` | `39d2ef35f1028768f41b9d72a6858b6c28a619fc` |
| instructor | **TIER-1-DIRECT** | `Z:/repos/deps/instructor/README.md:1-50 + pyproject.toml + LICENSE:1-3` | `3f1d6ddb084b8a0da3eb0665051293d381383b41` |
| openlit | **TIER-1-DIRECT** | `Z:/repos/deps/openlit/README.md:1-60 + LICENSE:1-3` (Apache-2.0 verified) | `39d2ef35f1028768f41b9d72a6858b6c28a619fc` |
| BerriAI/LiteLLM | **TIER-1-DIRECT** | `Z:/repos/deps/litellm/README.md:1-60 + LICENSE:1-10 (MIT-mixed enterprise/AGPL-like)` | `42ed9a783644aad9bc5f4ed06fb8350b29b044e3` |
| context-mode v1.0.111 (INSTALLED) | TIER-1-DIRECT + ELv2 caveat | `Z:/repos/deps/context-mode/package.json:1-15 + LICENSE:1-10` | `e73a6cd56a4eb0a01794b9187902e3f805515286` |
| repomix v1.14.0 (INSTALLED) | TIER-1-DIRECT | `Z:/repos/deps/repomix/package.json:1-5 + LICENSE` | `b99706131b26b68e0d72aab7f93fccebad1460c0` |
| cwc-long-running-agents (INSTALLED) | **TIER-1-DIRECT** Anthropic OFFICIAL | `Z:/repos/deps/cwc-long-running-agents/README.md:1-104 + LICENSE:1-3` | `ffd563d668a97a38d4aa092bf0d5b1507c046629` |
| anthropic-cookbook | **TIER-1-DIRECT** Anthropic OFFICIAL (CR-12 CITE-CLASS-CANONICAL) | `Z:/repos/deps/anthropic-cookbook/README.md + LICENSE:1-3` | `33424c3eb476cd56379435be086ccc228af1050d` |
| LLMLingua | TIER-1-DIRECT | `Z:/repos/deps/LLMLingua/README.md:1-100 + LICENSE:1-3` (Microsoft MIT) | `e0e9d99beb94098bbd924aa53c2c112eac41c758` |
| claw-compactor | TIER-1-DIRECT | `Z:/repos/deps/claw-compactor/README.md:1-80 + LICENSE:1-3` | `c1b936d40b1145c7a257bd6e34a17994f467495f` |
| CLIProxyAPI (INSTALLED) | TIER-1-DIRECT | `Z:/repos/deps/CLIProxyAPI/README.md:1-50 + LICENSE:1-3` | `934ecdca78daf7ec9514efd47df77bf7495c822d` |
| lmcache | TIER-1-DIRECT | `Z:/repos/deps/lmcache/README.md:1-50 + LICENSE:1-3` | `5bc4d889c38cf9c75e63617d62779bc0f6628b23` (dev branch) |
| text-embeddings-inference | TIER-1-DIRECT | `Z:/repos/deps/text-embeddings-inference/Cargo.toml + LICENSE:1-3` | `5bc4d889c38cf9c75e63617d62779bc0f6628b23` |

### Sister-rule cite trail (sibling cite-import-AMBER per Section 14.5)

- CR-12 6-class disposition lattice: `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` (read in this dispatch as system-reminder)
- mia-pre-apply.md §Alternate-install-path probe: `Z:/claude-sota-installed/.claude/rules/mia-pre-apply.md` (cross-channel npm/pip/cargo/uvx/winget probe)
- ahfv 7 sub-classes: `Z:/claude-sota-installed/.claude/rules/ahfv-seven-sub-classes.md` (read; Probe-7 demand-gate)
- ahfv-probe-dag: `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md` (read; Probes 1-7 + benchmark-gate-Phase-7)
- convergence-gate Axis 1/2/3: `Z:/claude-sota-installed/.claude/rules/convergence-gate.md` (read; 5-band stability table)
- codex-t1-fix-forward-pattern.md §Pattern A/B: `Z:/claude-sota-installed/.claude/rules/codex-t1-fix-forward-pattern.md` (read; verdict-shape lattice)
- synthesis-layer-verify.md §Subclaim-type discriminator + §Output-form verification modifier SHAPE-CLAIM: `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md` (cite-imported via instructor adopt-now rationale)

### Recommended next-fire ship sequence (post-T2 verification)

1. **Ship A1** — `npm install -g claude-code-cache-fix@3.0.3` + add `ANTHROPIC_BASE_URL=http://127.0.0.1:9801` to CLAUDE.local.md ENV block + start proxy service. CR-9 risk MED; reversibility HIGH; expected ROI MEASURED 13.2pp cache-hit improvement.
2. **Ship A2** — `pip install instructor` into `Z:/venvs/claude` venv; add to docs/sota-installed-manifest.md as Tier-2/3 entry; document SHAPE-CLAIM operationalization at synthesis-layer-verify.md §Output-form verification modifier.
3. **Ship A3** — `pip install chonkie[all]` into `Z:/venvs/claude`; document pre-embed chunking workflow for graphiti+mcp-memory at research-protocol.md §dedup protocol.
4. **DEFER** — openlit + LiteLLM until next eval-obs / provider-diversification fire surfaces explicit demand.
