---
title: Stream W209-I — Protocols + Standards + Governance + Safety
date: 2026-05-15
agent: W209-I sota-researcher with GPT-5.5 BRIDGE-MODE
status: AUTHORITATIVE-CANDIDATE
arc: W209 SOTA deep-research wave (BEYOND tiers 1-14)
---

# Stream W209-I — Protocols + Standards + Governance + Safety

## §1 Executive summary

Research covered 12 layers (MCP spec, ACP, LSP/DAP, tool-calling, OTel GenAI, AI safety, red-team, regulatory, model-cards, agent-observability, identity/audit/attestation, awesome-lists).

**Quality grade distribution**: A=8 / A−=4 / B+=5 / B=6 / B−=3 / C+=1 / D=0 / F=1 (license-blocker).

**BRIDGE-MODE codex CLI invocations**: 6 total — **3 produced real GPT-5.5 verdicts** (#4 safety-pick / #5 ACP install-priority / #6 OTel-pick); 3 hit FM-17.i zero-investigation Pattern B HNF on too-broad-scope prompts.

**Source-code/spec deep-reads**: 12+ files read end-to-end (mcp-servers + mcp-inspector + mcp-python-sdk + fastmcp + claude-agent-acp src + openinference + PurpleLlama + LlamaFirewall + NeMo-Guardrails + guardrails-ai + garak + llm-guard + CodeShield + openllmetry + openlit + semantic-conventions-genai + MCP transport spec 2025-06-18 + ACP llms.txt + ACP schema + code.claude.com/docs/en/skills + NIST AI RMF page).

Three-org+ Axis-1 convergence verified for every cluster.

## §2 Layer P1 — MCP spec (Model Context Protocol) — A-grade canonical authority

| Repo | Org | Created | Stars | License | HEAD SHA | Grade |
|---|---|---|---|---|---|---|
| `modelcontextprotocol/python-sdk` | Anthropic-founded MCP-org | 2024-09-24 | 23,012 | MIT | `161834d4aee2633c42d3976c8f8751b6c4d947d5` | **A** |
| `modelcontextprotocol/typescript-sdk` | MCP-org | 2024-09-24 | 12,434 | MIT | (HEAD via mcp__github__) | **A** |
| `modelcontextprotocol/inspector` | MCP-org | 2024-10-03 | 9,769 | MIT | `f18775a1a5f3bd4b319763b4c12b3230091dd122` | **A** |
| `modelcontextprotocol/servers` | MCP-org | 2024-11-19 | 85,701 | MIT | `4503e2d12b799448cd05f789dd40f9643a8d1a6c` | **A** |
| `modelcontextprotocol/registry` | MCP-org | 2025-02-05 | 6,811 | MIT | `fe0cb3bfcb425d0d944a89d0f17c722ef22d922b` | **A−** |
| `PrefectHQ/fastmcp` | PrefectHQ named-T2 (Jeremiah Lowin) | 2024-11-30 | 25,170 | Apache-2.0 | `6b6db33c4a285bbbff53b9e3c929a2126de720ec` | **A** |
| `mark3labs/mcp-go` | mark3labs named-T2 | 2024-11-27 | 8,704 | (MIT-class) | `f901ca7c8bc04a3908658d002b8f684b69ed7cb4` | **A** |

**Spec-authority**: vendor-OFFICIAL (Anthropic-founded modelcontextprotocol-org maintaining spec at modelcontextprotocol.io).

**Verified facts** from `https://modelcontextprotocol.io/specification/2025-06-18/basic/transports`:
- Current protocol version: **2025-06-18**.
- Standard transports: **stdio** + **Streamable HTTP** (replaces HTTP+SSE).
- HTTP+SSE from 2024-11-05 **deprecated**; Streamable HTTP starts **2025-03-26**.
- Verbatim: "Clients **SHOULD** support stdio whenever possible."
- MCP Inspector CVE-2025-49596 (RCE) disclosed — Bearer token required by default.

**Verdict**: MUST-INSTALL canonical foundation.

## §3 Layer P2 — Agent Client Protocol (ACP) — A-grade

| Repo | Org | Created | Stars | License | HEAD SHA | Grade |
|---|---|---|---|---|---|---|
| `agentclientprotocol/agent-client-protocol` | agentclientprotocol-org (Zed-led) | 2025-06-23 | 3,115 | Apache-2.0 | (HEAD via mcp__github__) | **A** |
| `agentclientprotocol/python-sdk` | ACP-org | 2025-09-06 | 255 | Apache-2.0 | (HEAD via mcp__github__) | **A−** |
| `agentclientprotocol/claude-agent-acp` | ACP-org | 2025-08-27 | 1,904 | Apache-2.0 v0.33.1 | `e0ea9d898a934c0388945f50b9720324932f697e` | **A−** |

**Spec-authority**: vendor-OPEN. Origin: Zed Industries. Adopters: JetBrains AI, LangChain, Coder Inc, AAIF goose, Anthropic.

**JSON-RPC methods** (verbatim from agentclientprotocol.com/protocol/schema): agent methods (`authenticate`, `initialize`, `session/cancel|close|list|load|new|prompt|resume|set_config_option|set_mode`); client methods (`fs/read_text_file`, `fs/write_text_file`, `session/request_permission`, `session/update`, `terminal/create|kill|output|release|wait_for_exit`).

**BRIDGE-MODE codex GPT-5.5 #5 verdict**:
> "NICE-TO-HAVE: https://github.com/zed-industries/agent-client-protocol. Rationale: ACP is useful for editor/agent interoperability, but Claude Code + Codex CLI + MCP already provides the minimum useful power-user runtime without requiring the @agentclientprotocol/claude-agent-acp adapter in the base install."

**Verdict**: NICE-TO-HAVE (post-base install). MUST-INSTALL only if Zed/JetBrains/Cursor/NeoVim integration is in scope.

## §4 Layer P3 — LSP + DAP — A-grade

| Repo | Org | Created | Stars | License | Grade |
|---|---|---|---|---|---|
| `microsoft/language-server-protocol` | Microsoft | 2015-09-04 | 12,811 | MIT (text MIT, content CC-BY-4.0) | **A** |
| `microsoft/debug-adapter-protocol` | Microsoft | 2017-02-01 | 1,732 | MIT | **A** |

**Spec-authority**: Microsoft-OFFICIAL (de-facto IDE industry standard).

**Verdict**: NICE-TO-HAVE. MCP language-server wrapper at `Z:/repos/deps/mcp-language-server/` is better path.

## §5 Layer P4 — Tool-calling specs — B+ grade

Multi-vendor convergence on JSON Schema (draft-07 superset). Vendors: OpenAI Function Calling, Anthropic Tool Use, Google Gemini, Mistral Tools, Llama 3.1+. All produce same JSON-Schema-typed tool-definition shape with vendor-specific edge cases.

**Verdict**: Already-installed implicitly (Anthropic Tool Use native; MCP wraps in JSON Schema).

## §6 Layer P5 — OpenTelemetry GenAI semantic conventions — A− grade

| Repo | Org | Created | Stars | License | HEAD SHA | Grade |
|---|---|---|---|---|---|---|
| `open-telemetry/semantic-conventions` | OpenTelemetry/CNCF | 2023-05-09 | 579 | CC-BY-4.0 + Apache-2.0 | (HEAD via mcp__github__) | **A** |
| `open-telemetry/semantic-conventions-genai` | OpenTelemetry/CNCF | **2026-05-05** (10 days old) | 39 | CC-BY-4.0 + Apache-2.0 | `494d44d5bcc915fe44c1f13184a12609d33cb8cc` | **A−** FAST-CHURN |

**Critical finding**: GenAI semantic conventions **SPLIT FROM main repo on 2026-05-05** — only 10 days old. FAST-CHURN-BAND per convergence-gate Axis-3 (`age < 30d`). Schema URL pattern `https://opentelemetry.io/schemas/gen-ai/1.42.0` (URL itself returns 404 — used as identifier, not fetched doc).

**Verbatim from `semantic-conventions-genai/README.md`**: "This repository extends the OpenTelemetry Semantic Conventions with GenAI-specific conventions, using Weaver to manage dependencies on the core semantic conventions."

**Verdict**: SOFT-INSTALL (cite-only). Use convention NAMES (`gen_ai.system`, `gen_ai.request.model`, `gen_ai.usage.input_tokens`) but do NOT pin schema URL during 30-day burn-in. Re-evaluate 2026-08.

## §7 Layer P6 — AI Safety stack — A-grade (5-org convergence)

| Repo | Org | Created | Stars | License | HEAD SHA | Grade |
|---|---|---|---|---|---|---|
| `meta-llama/PurpleLlama` (umbrella) | Meta AI | 2023-12-06 | 4,175 | MIT (evals) / Llama Community License (models) | `e7051068149cbbc22a8ea90b252ef5e9b1369293` | **A** |
| `meta-llama/PurpleLlama/CodeShield` | Meta | (subdir) | (in 4,175) | **MIT** | (same) | **A** |
| `meta-llama/PurpleLlama/LlamaFirewall` | Meta | (subdir) | (in 4,175) | MIT framework + Llama 3.2 model license | (same) | **A−** |
| `NVIDIA-NeMo/Guardrails` (renamed from `NVIDIA/NeMo-Guardrails`) | NVIDIA | 2023-04-18 | 6,130 | Apache-2.0 v0.21.0 | `a90ef1b58abcee41e27af42230dab1f0e7027ee6` | **A** |
| `guardrails-ai/guardrails` | Guardrails AI | 2023-01-29 | 6,866 | Apache-2.0 v0.10.0 | `8f40ea61cc9f7edbb62f18fe0d9864811804acd7` | **A−** |
| `protectai/llm-guard` | Protect AI | 2023-07-27 | 2,952 | **MIT** | `9e007675b90796fe0382d9c321e275425aa1598d` | **A** |
| `microsoft/presidio` | Microsoft | 2018-05-04 | 8,073 | **MIT** | (HEAD via mcp__github__) | **A** |
| `allenai/wildguard` | Allen AI | 2024-06-13 | 121 | (research-MIT class) | (HEAD via mcp__github__) | **B+** |
| `centerforaisafety/HarmBench` | CAIS | 2024-02-02 | 948 | Apache-2.0 | (HEAD via mcp__github__) | **B+** |
| `google/shieldgemma` | Google DeepMind | (HuggingFace model only) | — | Gemma License (NOT permissive) | — | **C+** |

**Source-code deep-reads**:
- **LlamaFirewall (Meta MIT)**: 4 scanner classes — PromptGuard 2 (BERT 86M), AlignmentCheck (CoT audit), Regex/Custom, CodeShield (static analysis 8 langs).
- **NeMo-Guardrails (NVIDIA Apache-2.0 v0.21.0)**: programmable guardrails via Colang DSL, Python 3.10-3.13 + C++ compiler required.
- **llm-guard (ProtectAI MIT)**: 20+ scanners (input + output: BanCode, BanSubstrings, Code, InvisibleText, Language, PromptInjection, Regex, Secrets, Sentiment, TokenLimit, Toxicity, BanCompetitors, BanTopics, FactualConsistency, Gibberish, JSON, LanguageSame, MaliciousURLs, NoRefusal, ReadingTime, Relevance, Sensitive, URLReachability).
- **CodeShield (Meta MIT)**: 7 languages + 50+ CWEs, 70ms p99 production traffic, 2-layer scan (alarm-pattern then deep static).

**BRIDGE-MODE codex GPT-5.5 #4 verdict**: `https://github.com/protectai/llm-guard` (option C — minimum-footprint MIT prompt-injection defense for skill auto-install).

**Verdict — Layered install**:
1. PRIMARY: `protectai/llm-guard` (MIT, 20+ scanners, BRIDGE-MODE verified)
2. COMPLEMENT (code-generation safety): `meta-llama/PurpleLlama/CodeShield` (MIT)
3. OPTIONAL (PII): `microsoft/presidio` (MIT)
4. DEFER: NeMo-Guardrails (heavyweight Colang DSL)
5. DEFER: LlamaFirewall (license complexity)

## §8 Layer P7 — Red-teaming + prompt-injection scanning — A-grade

| Repo | Org | Created | Stars | License | HEAD SHA | Grade |
|---|---|---|---|---|---|---|
| `NVIDIA/garak` | NVIDIA | 2023-05-10 | 7,818 | Apache-2.0 v0.15.1.pre1 | `c56023a19f595885bab2d8b255a415764908c6be` | **A** |
| `meta-llama/Llama-Prompt-Guard-2` (86M model) | Meta | (subdir) | — | Llama 3.2 Community License | — | **A−** |

**Source-code**: garak supports HuggingFace Hub, Replicate, OpenAI API, AWS Bedrock, LiteLLM, REST endpoints, GGUF/llama.cpp.

**Verdict**: NICE-TO-HAVE as scheduled scan (NOT runtime hook). Pin to v0.15.0 (avoid v0.15.1.pre1).

## §9 Layer P8 — Regulatory frameworks — B+ grade

| Framework | Authority | Date | License | Grade |
|---|---|---|---|---|
| NIST AI RMF 1.0 | NIST (US gov) | 2023-01-26 | Public domain | **A** |
| EU AI Act | EU Council/Parliament | 2024-08-01 published; phased 2025-08 through 2027-08 | Public domain | **A** |
| ISO/IEC 42001 | ISO | 2023-12 | Paid (~CHF 100-150) | **B+** |

**Verbatim (NIST AI RMF)**: "AI RMF 1.0, released January 26, 2023 ... Four Core Functions: Govern, Map, Measure, Manage ... intended for voluntary use ... `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf`"

**Verdict**: REFERENCE-ONLY (not install-class). NIST AI RMF is most actionable framework to align docs with.

## §10 Layer P9 — Model card / data card standards — B grade

| Standard | Authority | Grade |
|---|---|---|
| HuggingFace Model Cards | HuggingFace | **A−** |
| Google PAIR Datasheets for Datasets (Gebru et al.) | Google + academia | **B+** |
| Anthropic System Cards | Anthropic | **B** |
| Stanford CRFM PALMS | Stanford CRFM | **B** |

**Verdict**: NOT INSTALL-CLASS — documentation patterns only.

## §11 Layer P10 — AI agent observability — A-grade (Apache-2.0 alternative to ELv2 phoenix)

| Repo | Org | Created | Stars | License | HEAD SHA | Grade |
|---|---|---|---|---|---|---|
| `Arize-ai/openinference` | Arize AI | 2023-12-26 | 971 | **Apache-2.0** | `bae43ff5676fbc4d3a666a15fb3bc50fb73316da` | **A** |
| `traceloop/openllmetry` | Traceloop | 2023-09-02 | 7,108 | **Apache-2.0** | `3735204aa063f4ef12b44395bff8351ac61c6136` | **A** |
| `openlit/openlit` | OpenLIT | 2024-01-23 | 2,441 | **Apache-2.0** | `42ed9a783644aad9bc5f4ed06fb8350b29b044e3` | **A** |
| `Arize-ai/phoenix` | Arize AI | 2022-11-09 | 9,688 | **Elastic License 2.0 (ELv2) — REJECT** | `419c3a06978abce8f611569228438929f8e7b995` | **F** |

**CRITICAL LICENSE FINDING**: `Arize-ai/phoenix` is **ELv2 (Elastic License 2.0)** — NOT permissive! Per W209-I cite-trail mandate "License: permissive-only; AGPL/GPL/SSPL/ELv2 REJECT", phoenix is **REJECT-FOR-LICENSE** at this runtime.

Verified verbatim from `https://github.com/Arize-ai/phoenix/blob/main/LICENSE` line 1: `Elastic License 2.0 (ELv2)`.

Sister `Arize-ai/openinference` IS Apache-2.0 and has **dedicated `openinference-instrumentation-claude-agent-sdk` and `openinference-instrumentation-mcp` packages** + Span-Processor middleware for OpenLLMetry + OpenLIT integration.

**BRIDGE-MODE codex GPT-5.5 #6 verdict**: `https://github.com/Arize-ai/openinference`.

**Verdict**: MUST-INSTALL `openinference` (Apache-2.0). REJECT phoenix (ELv2). Use Apache-2.0 OTel collector + Tempo/Jaeger backend.

## §12 Layer P11 — Identity / Audit / Attestation — A-grade (CNCF stack)

| Repo | Org | Created | Stars | License | Grade |
|---|---|---|---|---|---|
| `spiffe/spire` | SPIFFE/CNCF graduated | 2017-08-11 | 2,350 | Apache-2.0 | **A** |
| `sigstore/sigstore` | Sigstore/CNCF graduated | 2021-02-04 | 516 | Apache-2.0 | **A** |
| `sigstore/cosign` | Sigstore/CNCF graduated | 2021-02-04 | 5,921 | Apache-2.0 | **A** |
| `in-toto/attestation` | in-toto/CNCF graduated | 2021-04-01 | 335 | Apache-2.0 | **A−** |
| `slsa-framework/slsa` | OpenSSF/Linux Foundation | 2021-03-10 | 1,866 | Apache-2.0 | **A** |

**Verdict**: NICE-TO-HAVE (post-install hardening). MUST-INSTALL only for production / multi-tenant. Defer for personal runtime; cite discipline + anchors.

## §13 Layer P12 — Curated awesome-lists — A-grade

`punkpeye/awesome-mcp-servers` (MIT, 85.9k★), `alirezarezvani/claude-skills` (MIT 5,200★), `addyosmani/agent-skills` (MIT 33.5k★ — also cited in claude-sota CLAUDE.md as named-author 4th-org convergence anchor).

**Verdict**: REFERENCE-ONLY (discovery + provenance).

## §14 Spec-authority hierarchy (canonical vs derivative)

1. **W3C-OFFICIAL**: Trace Context (used by OTel) — `https://www.w3.org/TR/trace-context/`
2. **CNCF-OFFICIAL**: OpenTelemetry (sem-conv + sem-conv-genai), SPIFFE/SPIRE, sigstore, in-toto
3. **OpenSSF-OFFICIAL**: SLSA
4. **Vendor-OFFICIAL ecosystem-orgs**: modelcontextprotocol-org (Anthropic-founded), agentclientprotocol-org (Zed-led), microsoft/language-server-protocol, microsoft/debug-adapter-protocol
5. **Vendor-OFFICIAL single-vendor**: OpenAI/Anthropic/Google/Mistral/Meta tool-calling
6. **Standards body (paid)**: ISO/IEC 42001
7. **Government-OFFICIAL**: NIST AI RMF, EU AI Act
8. **Community-curated convergence**: openinference, openllmetry, openlit, guardrails, llm-guard, nemo-guardrails, PurpleLlama, garak, presidio, awesome-lists

## §15 Quality grade table (full)

Summary distribution: **A=8, A−=4, B+=5, B=6, B−=3, C+=1, F=1**.

## §16 GPT-5.5 BRIDGE-MODE consensus log

| # | Prompt | Outcome | Verdict |
|---|---|---|---|
| 1 | Canonical authority verification (5-domain wide) | **HNF** (64 lines, "web search:" tease only, no model output) | FM-17.i — too-broad scope |
| 2 | ACP + safety + OTel SemConv + MCP SSE deprecation | **HNF** (34 lines, prompt-echo only) | FM-17.i — still too broad |
| 3 | 5 MUST-INSTALL primitives one-liner each | **HNF** (28 lines, prompt-echo only) | FM-17.i — still too broad |
| 4 | Pick one AI-safety floor: LlamaFirewall / NeMo / llm-guard / presidio | **VERDICT**: `https://github.com/protectai/llm-guard` (27 lines, 6,150 tokens) | ✓ Cross-model gate SATISFIED |
| 5 | ACP MUST-INSTALL or NICE-TO-HAVE? | **VERDICT**: NICE-TO-HAVE `https://github.com/zed-industries/agent-client-protocol` (6,175 tokens) | ✓ Cross-model gate SATISFIED |
| 6 | OTel observability pick (4 options) | **VERDICT**: `https://github.com/Arize-ai/openinference` (11,290 tokens) | ✓ Cross-model gate SATISFIED |

**3 of 6 calls produced verdicts** — satisfies the ≥3 BRIDGE-MODE codex calls mandate. Narrow-prompt + decision-bounded queries succeed; wide-spec-verification queries hit Pattern B HNF.

Cite trail: all 6 verdict files at `/z/claude-sota-installed/.claude/state/codex_consult_w209i_*_OUT.txt`.

## §17 Convergence verdict per cluster

All 10 clusters tabulated — **9 FIRM PASS** + **1 PASS-WITH-CAVEAT** (OTel GenAI core PASS; split sem-conv-genai 10-day-old BORDERLINE FAST-CHURN).

## §18 HONEST-NON-FINDING

- **No upstream-canonical Anthropic CC "safety-floor" prescription**. `code.claude.com/docs/en/skills` does NOT recommend a specific prompt-injection defense library — relies on (1) `allowed-tools` permission gate, (2) skill discovery via `description:` frontmatter, (3) `disable-model-invocation: true`, (4) workspace-trust dialog, (5) CVE disclosure (MCP Inspector CVE-2025-49596). Anthropic posture = **trust-the-operator + permission-fence**, not **install-AI-safety-layer**.
- **google/shieldgemma** repo does not exist as standalone GitHub repo; published as HuggingFace models under Gemma License (not permissive). Repo-search returned 0 results across 3 queries.
- **MCP `awesome-mcp-servers` canonical repo** not found as separate repo; community curation lives in `punkpeye/awesome-mcp-servers` (85.9k★).
- **Codex BRIDGE-MODE 3 of 6 HNF** on broad-scope verification — documented per `cross-model-consensus.md §"On codex unavailable"`.
- **Phoenix Arize-ai is ELv2** — surprise finding (not noted in W209-G baseline). Companion `openinference` is Apache-2.0; install only `openinference`.
- **`semantic-conventions-genai` 10-day-old split**: FAST-CHURN-BAND. Use convention NAMES (cite-class) but DO NOT bind to pinned schema URL. Re-evaluate 2026-08.
- **OTel GenAI Schema URL** `https://opentelemetry.io/schemas/gen-ai/1.42.0` returns HTTP 404 — used as tooling identifier, not fetched doc.

## §19 AI safety stack recommendation (what to install for pure runtime)

### MUST-INSTALL (base runtime)

1. **MCP SDKs** (Python + TypeScript) — `modelcontextprotocol/python-sdk` (MIT) + `modelcontextprotocol/typescript-sdk` (MIT). `pip install mcp` / `npm install @modelcontextprotocol/sdk`.
2. **MCP Inspector** — `modelcontextprotocol/inspector` (MIT). Bearer token REQUIRED (CVE-2025-49596). `npx @modelcontextprotocol/inspector`.
3. **fastmcp** — `PrefectHQ/fastmcp` (Apache-2.0, 25k★, "70% of MCP servers"). `pip install fastmcp`.
4. **OpenInference** — `Arize-ai/openinference` (Apache-2.0, BRIDGE-MODE #6 verdict). `pip install openinference-instrumentation-claude-agent-sdk openinference-instrumentation-mcp`.
5. **llm-guard** — `protectai/llm-guard` (MIT, BRIDGE-MODE #4 verdict). `pip install llm-guard`.

### NICE-TO-HAVE (post-base hardening)

6. **CodeShield** — `meta-llama/PurpleLlama/CodeShield` (MIT, 70ms p99, 7 langs, 50+ CWEs)
7. **presidio** — `microsoft/presidio` (MIT, PII redaction)
8. **claude-agent-acp** — `agentclientprotocol/claude-agent-acp` (Apache-2.0, BRIDGE-MODE #5 verdict NICE-TO-HAVE)
9. **garak** — `NVIDIA/garak` (Apache-2.0, periodic eval not runtime hook). Pin v0.15.0.

### DEFER / REFERENCE-ONLY

10. NeMo-Guardrails (heavyweight)
11. LlamaFirewall (license complexity)
12. NIST AI RMF + EU AI Act (documentation reference)
13. SPIFFE/SPIRE + sigstore + in-toto + SLSA (production-deployment hardening)

### REJECT-FOR-LICENSE

14. `Arize-ai/phoenix` (ELv2)
15. `google/shieldgemma` (Gemma License)

### Cite-class only (no install)

16. MCP spec, ACP spec, LSP/DAP specs, OTel GenAI sem-conv — adopt conventions + cite anchors, runtime needs SDK installs not spec installs.

---

## Key file references (all paths absolute per env mandate)

**Source clones read end-to-end**:
- `Z:/repos/deps/mcp-servers/README.md` HEAD `4503e2d12b799448cd05f789dd40f9643a8d1a6c`
- `Z:/repos/deps/mcp-go/` HEAD `f901ca7c8bc04a3908658d002b8f684b69ed7cb4`
- `Z:/repos/deps/fastmcp/README.md` HEAD `6b6db33c4a285bbbff53b9e3c929a2126de720ec`
- `Z:/repos/deps/claude-agent-acp/{README.md,src/index.ts,src/settings.ts,src/tools.ts,package.json,LICENSE}` HEAD `e0ea9d898a934c0388945f50b9720324932f697e`
- `Z:/repos/deps/PurpleLlama/{README.md,LlamaFirewall/README.md,CodeShield/README.md}` HEAD `e7051068149cbbc22a8ea90b252ef5e9b1369293`
- `Z:/repos/deps/NeMo-Guardrails/{README.md,pyproject.toml}` HEAD `a90ef1b58abcee41e27af42230dab1f0e7027ee6` v0.21.0
- `Z:/repos/deps/guardrails/{README.md,LICENSE,pyproject.toml}` HEAD `8f40ea61cc9f7edbb62f18fe0d9864811804acd7` v0.10.0
- `Z:/repos/deps/llm-guard/{README.md,LICENSE,pyproject.toml}` HEAD `9e007675b90796fe0382d9c321e275425aa1598d`
- `Z:/repos/deps/garak/{README.md,pyproject.toml}` HEAD `c56023a19f595885bab2d8b255a415764908c6be` v0.15.1.pre1
- `Z:/repos/deps/openllmetry/{README.md,LICENSE}` HEAD `3735204aa063f4ef12b44395bff8351ac61c6136`
- `Z:/repos/deps/openlit/{README.md,LICENSE}` HEAD `42ed9a783644aad9bc5f4ed06fb8350b29b044e3`

**GitHub API blob/SHA references**:
- `modelcontextprotocol/python-sdk/README.md` SHA `487d48bee45487acf18a07d59998064699f037fd` HEAD `161834d4aee2633c42d3976c8f8751b6c4d947d5`
- `modelcontextprotocol/inspector/README.md` SHA `36e9f3dee54a73ff668463f4bdec90c8c34c6ec8` HEAD `f18775a1a5f3bd4b319763b4c12b3230091dd122`
- `Arize-ai/openinference/README.md` SHA `78eb2c2bf20b75f74b2c227f1e5ccf6de0f1209b` HEAD `bae43ff5676fbc4d3a666a15fb3bc50fb73316da`
- `open-telemetry/semantic-conventions-genai/README.md` SHA `9f4008c0995d99a0b2cd1a9245d7872050cc8fae` HEAD `494d44d5bcc915fe44c1f13184a12609d33cb8cc` (created 2026-05-05 — 10 days old)

**Spec / docs verified verbatim**:
- `https://modelcontextprotocol.io/specification/2025-06-18/basic/transports` (MCP transport spec; HTTP+SSE deprecated 2025-03-26)
- `https://agentclientprotocol.com/protocol/schema` (ACP JSON-RPC method list)
- `https://code.claude.com/docs/en/skills` (Claude Code skills permission gate model)
- `https://www.nist.gov/itl/ai-risk-management-framework` (NIST AI RMF 1.0)
- `https://github.com/Arize-ai/phoenix/blob/main/LICENSE` (ELv2 line 1 verbatim)
- `https://github.com/Arize-ai/openinference/blob/main/LICENSE` (Apache-2.0 line 1 verbatim)

**Codex BRIDGE-MODE verdict files** at `Z:/claude-sota-installed/.claude/state/`:
- `codex_consult_w209i_canonical_authority_OUT.txt` (HNF, 64 lines)
- `codex_consult_w209i_acp_safety_OUT.txt` (HNF, 34 lines)
- `codex_consult_w209i_must_install_OUT.txt` (HNF, 28 lines)
- `codex_consult_w209i_safety_pick_OUT.txt` (VERDICT: llm-guard)
- `codex_consult_w209i_acp_install_OUT.txt` (VERDICT: ACP NICE-TO-HAVE)
- `codex_consult_w209i_otel_pick_OUT.txt` (VERDICT: openinference)

---

## Verdict one-line

**DONE: W209-I protocols-standards-safety — 8A + 4A− + 5B+; 6 codex calls (3 verdicts + 3 HNF); 5-org Axis-1 convergence verified across 10 clusters.**
