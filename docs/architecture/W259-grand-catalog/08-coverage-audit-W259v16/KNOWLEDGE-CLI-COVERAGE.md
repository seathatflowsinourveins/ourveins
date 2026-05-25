# W259v16 — Coverage + Gap Audit: L2.5 KNOWLEDGE/STRUCTURED-OUTPUT + L3 PEER-CLI

> **Mission.** The operator wants a DEFINITIVE answer for two layers of the W259 grand catalog: does the catalog cover every SOTA repo, or are there gaps? This is a **COVERAGE + GAP-FINDING audit**, NOT a benchmark re-litigation of existing entries.
>
> **Scope.** (a) **L2.5 — Knowledge / Structured-Output**: schema-constrained / structured generation libraries (instructor, pydantic-ai, outlines, guidance, BAML, JSON-mode / function-calling frameworks, type-safe LLM-output libraries). (b) **L3 — Peer Coding CLIs**: terminal coding agents this runtime treats as peer/reviewer CLIs (Codex CLI, aider, opencode, cline, gemini-cli, Cursor CLI, amp, charm/crush, and similar).
>
> **Method.** (1) Read `05-scoring/MASTER-SCORING-MATRIX-W259.md` + `05-scoring/BENCHMARK-SCORECARD-C-L2-L25-L3-W259v6.md` + `05-scoring/PER-LAYER-BENCHMARK-SCORECARD-W259v6.md` + `02-layer-deepdive/LAYER-F-knowledge-wiki-context-engineering-prompts.md` + `02-layer-deepdive/LAYER-B-orchestration-multiagent-skills.md` + `01-graphql-discovery/MISSED-SOTA-REPOS-2026-05-16.md` + `04-critique/W258-V13-CRITIQUE.md` → extract every repo W259 already catalogued for both layers. (2) Research-beyond via GitHub MCP (`search_repositories` sorted by stars; `get_file_contents` for READMEs) — find current SOTA repos in both fields. (3) Per repo: IN-CATALOG or GAP; GAP → GENUINE-GAP vs CORRECTLY-EXCLUDED. (4) Score genuine gaps.
>
> **Cite-class.** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Repo metadata (stars / license / push-date) is TIER-2 (GitHub API live, 2026-05-16/17). This audit imports the catalog's existing benchmark dispositions as-is; it does not re-derive them.
>
> **Date.** 2026-05-16/17. **Sibling audit pattern.** Mirrors `03-deepdive/MEMORY-RAG-COVERAGE-AUDIT-W259v16.md` (the memory/RAG coverage audit) — same COVERAGE-not-benchmark methodology.

---

## §0 — Headline verdict (both layers)

> **L2.5 Knowledge / Structured-Output — SATURATED. 0 genuine gaps.** Every SOTA structured-output library is catalogued. The high-star repos surfaced beyond the catalog (`json_repair`, `lm-format-enforcer`, `xgrammar`, `llguidance`, `langextract`, `composio`) are either CORRECTLY-EXCLUDED (utility / engine-internal / not-a-library-for-this-use-class) or already represented by a catalogued parent. The catalog's L2.5 install set (pydantic-ai + instructor, with BAML/outlines/guidance/dspy as pilot/cite) is complete for a cloud-API Python runtime.
>
> **L3 Peer CLI — SATURATED for adoption purposes. 1 borderline gap (qwen-code, GAP-LOW).** The canonical peer-CLI field — Codex CLI, opencode, goose, OpenHands, gemini-cli, aider, cline, crush, continue, Cursor CLI, amp, Roo/Kilo — is fully catalogued or correctly dispositioned. The single repo not explicitly carrying a catalog row is **`QwenLM/qwen-code`** (~Gemini-CLI fork, Qwen-tuned); it is a genuine-but-low-priority gap — a documented peer CLI exists, but it adds nothing the catalogued `gemini-cli` row (its upstream) and Codex CLI (the installed peer) do not already cover. Verdict: **GAP-LOW — record a one-line catalog row, do not pilot.**

**Net: L2.5 = 0 genuine gaps. L3 = 1 genuine gap (low-priority, doc-only). Neither layer needs an install-set change.**

---

# LAYER L2.5 — Knowledge / Structured-Output

## §L2.5.a — Baseline (what W259 already catalogues)

The W259 catalog covers L2.5 across **three documents**: the master matrix (`MASTER-SCORING-MATRIX-W259.md`), the benchmark scorecard (`BENCHMARK-SCORECARD-C-L2-L25-L3-W259v6.md` §L2.5), and the Layer-F deep-dive (`LAYER-F-knowledge-wiki-context-engineering-prompts.md` §1-§3 — context-engineering + structured-output + prompt-DSLs).

| # | Repo | Catalog location | Disposition | Notes |
|--:|---|---|---|---|
| 1 | `pydantic/pydantic-ai` | MATRIX row 15 (89) · SCORECARD-C §L2.5.2 rank 1 (88) · LAYER-F §1 | **T1 INSTALL** | Best cloud-API structured-output + native Pydantic Evals; official CC skill `ai@pydantic-skills` |
| 2 | `567-labs/instructor` | MATRIX row 19 (87) · SCORECARD-C §L2.5.2 rank 2 (88) · LAYER-F §2 | **T1 INSTALL** | Anthropic-native; validate-and-retry (probabilistic) |
| 3 | `BoundaryML/baml` | MATRIX row 48 (83) · SCORECARD-C §L2.5.2 rank 3 (84) · LAYER-F §2/§3 | **T2 STUDY-PILOT** | Fault-tolerant parser, cross-language DSL; build-step cost |
| 4 | `dottxt-ai/outlines` | MATRIX row 47 (84) · SCORECARD-C §L2.5.2 rank 4 (84) · LAYER-F §2 | **T3 CITE-PATTERN** | Strongest measured guarantee (BFCL uplift) but local-model-only — unusable on Claude/GPT cloud APIs |
| 5 | `guidance-ai/guidance` | LAYER-F §2 (21,461★) · SCORECARD-C §L2.5.2 rank 5 (79) | **T3 CITE-PATTERN** | Constrained-decoding family; local-model-only |
| 6 | `stanfordnlp/dspy` | MATRIX row 29 (86) · LAYER-F §1 · SCORECARD-C §L2.5.2 cross-layer note | **T2 STUDY-PILOT** | Prompt-optimization framework; L2.5-adjacent (out of scope for the structured-output benchmark) |
| 7 | `jackmpcollins/magentic` | LAYER-F §1 (2,406★, MIT) | surveyed | `@prompt`/`@chatprompt` decorators; Pydantic-converged |
| 8 | `PrefectHQ/marvin` | LAYER-F §1 (6,156★, Apache-2.0) | surveyed | Ambient-intelligence library; Pydantic-based |
| 9 | `Mirascope/mirascope` | LAYER-F §1 (1,483★, MIT) | surveyed | "Anti-framework" LLM toolkit |
| 10 | `MadcowD/ell` | LAYER-F §1 (5,869★) | **SKIP — STALE 11mo** | Language-model programming library |
| 11 | `eth-sri/lmql` | LAYER-F §1 (4,174★) | **SKIP — STALE 12mo** | Constraint-guided LLM programming |
| 12 | `eyurtsev/kor` | LAYER-F §1 (1,685★) | **SKIP — STALE 15mo** | LangChain structured extraction |
| 13 | `1rgs/jsonformer` | LAYER-F §2 (4,925★) | **SKIP — STALE 27mo** | JSON-from-LLM |
| 14 | `microsoft/aici` | LAYER-F §2 (2,075★) | **SKIP — superseded by llguidance** | Wasm controllers |
| 15 | `PrefectHQ/ControlFlow` | LAYER-F §1 (1,393★) | **REJECT — ARCHIVED 2025-08** | — |
| 16 | `DS4SD/docling` | MATRIX row 27 (86) | **T2 STUDY-PILOT (demand-gated)** | DocAI — structured doc extraction (L2.5-cross-listed) |
| 17 | `microsoft/markitdown` | MATRIX row 31 (86) | **T1 STUDY-PILOT** | Doc→markdown (L2.5-cross-listed) |
| 18 | `microsoft/prompty` | LAYER-F §3 (1,212★, MIT) | install-candidate | `.prompty` portable asset format |
| 19 | `microsoft/promptflow` | LAYER-F §3 (11,126★, MIT) | surveyed | YAML flows + eval pipeline |
| 20 | `character-ai/prompt-poet` | LAYER-F §3 (1,148★, MIT) | surveyed | Low-code Python prompt templates |
| 21 | `microsoft/genaiscript` | LAYER-F §3 (2,901★, MIT) | surveyed | TS automation scripts for GenAI |

**Baseline count (L2.5): 21 repos catalogued** (6 dispositioned in the matrix/scorecard, 15 surveyed in Layer-F §1-§3). The catalog's L2.5 install verdict (`MASTER-SCORING-MATRIX` §4): **pydantic-ai + instructor** (T1, cloud-API-capable), with **dspy / outlines / BAML** as STUDY-PILOT/CITE-PATTERN.

## §L2.5.b — SOTA repos found beyond the baseline (GitHub MCP research)

GitHub MCP `search_repositories` sweeps run: `topic:structured-output stars:>300`, `topic:function-calling stars:>300`, `topic:json-schema topic:llm stars:>200`, `xgrammar|llguidance|lm-format-enforcer in:name`, `mirascope|magentic|marvin structured llm stars:>1000`. Repos with a plausible structured-output claim and meaningful stars/org:

| Repo | Stars | License | IN-CATALOG? | Verdict |
|---|--:|---|---|---|
| `567-labs/instructor` | 12,965 | MIT | ✅ YES (MATRIX row 19) | CATALOGUED — T1 INSTALL |
| `BoundaryML/baml` | 8,240 | Apache-2.0 | ✅ YES (MATRIX row 48) | CATALOGUED — T2 STUDY-PILOT |
| `dottxt-ai/outlines` | 13,843 | Apache-2.0 | ✅ YES (MATRIX row 47) | CATALOGUED — T3 CITE-PATTERN |
| `guidance-ai/guidance` | 21,461 | MIT | ✅ YES (LAYER-F §2) | CATALOGUED — T3 CITE-PATTERN |
| `mangiucugna/json_repair` | 4,885 | MIT | ❌ NO | **CORRECTLY-EXCLUDED** — a post-hoc JSON-repair *utility*, not a structured-generation library. It is a downstream dependency of many parsers (incl. instructor's repair path); not an install-class primitive. No native-CC pathway. §L2.5.c. |
| `noamgat/lm-format-enforcer` | 2,012 | MIT | ❌ NO | **CORRECTLY-EXCLUDED** — constrained-decoding engine in the *same family as outlines/guidance* (logit-mask, local-model-only). Catalog already represents this class via outlines (T3) + guidance (T3) + the explicit "constrained decoding unusable on cloud APIs" finding (SCORECARD-C §L2.5.4). Adds no new use-class. §L2.5.c. |
| `mlc-ai/xgrammar` | 1,695 | Apache-2.0 | ❌ NO | **CORRECTLY-EXCLUDED** — a structured-generation *backend engine* embedded inside vLLM/SGLang/MLC (not a user-facing library). It is infrastructure beneath the L1 serving layer, not an L2.5 library a solo runtime installs. Same local-model-only constraint as outlines. §L2.5.c. |
| `guidance-ai/llguidance` | 765 | (guidance-ai) | ❌ NO | **CORRECTLY-EXCLUDED** — the Rust constrained-decoding *engine* under `guidance`; the catalog explicitly notes "aici superseded by llguidance" (LAYER-F §8.6). It is guidance's backend, represented by the catalogued `guidance` row. Low stars; engine-internal. §L2.5.c. |
| `google/langextract` | 36,475 | Apache-2.0 | ❌ NO | **GAP-LOW → CORRECTLY-EXCLUDED on fit.** High-star (36k), strong org (Google), Apache-2.0, fresh. BUT it is a *structured-information-extraction-from-text* library (NER-class, source-grounded extraction + visualization), not a schema-constrained-generation library — a different L2.5 sub-use-class adjacent to docling/markitdown (which the catalog already covers for the doc-extraction angle). It is Gemini-tuned, no native-CC pathway (no plugin/MCP/skill). For a Claude-orchestrated runtime whose extraction needs are met by instructor + pydantic-ai (schema-validated extraction) it is duplicative. §L2.5.c — recorded as a watch-line, not an install gap. |
| `ComposioHQ/composio` | 28,283 | (Apache-class) | ❌ NO | **CORRECTLY-EXCLUDED** — a *tool-calling / integration platform* (1000+ toolkits, auth, MCP), not a structured-output library. Belongs to the L0/L2 tool-integration layer, not L2.5. Out of scope for this layer. |
| `imaurer/awesome-llm-json` | 2,175 | (list) | ❌ NO | **CORRECTLY-EXCLUDED** — an awesome-list (resource index), not an installable primitive. Cite-only. |
| `wrtnlabs/agentica` | 1,022 | (wrtnlabs) | ❌ NO | **CORRECTLY-EXCLUDED** — a TypeScript function-calling *agent framework* (compiler-driven) — belongs to L2 orchestration, not L2.5 structured-output. Niche; TS-only. |
| `vamplabAI/sgr-agent-core` | 1,088 | (vamplab) | ❌ NO | **CORRECTLY-EXCLUDED** — Schema-Guided-Reasoning agent scaffold (community "neuraldeep"); an L2 agent pattern, not an L2.5 library. Single-community provenance. |
| `zhudotexe/kani` | 601 | (academic) | ❌ NO | **CORRECTLY-EXCLUDED** — a tool-calling microframework (EMNLP 2023); low stars, L2-adjacent, no structured-output-library distinctive. |
| `MeetKai/functionary` | 1,594 | (MeetKai) | ❌ NO | **CORRECTLY-EXCLUDED** — a *fine-tuned model* (+ serving) for tool-use, not a library. Model-class, not L2.5-library-class. |
| `withcatai/node-llama-cpp` | 2,060 | MIT | ❌ NO | **CORRECTLY-EXCLUDED** — node.js bindings for llama.cpp with grammar/JSON-schema enforcement; a *local-inference runtime* (L1-class) that happens to enforce schemas. Local-model-only; not a cloud-API L2.5 library. |
| `promptslab/Promptify` | 4,600 | (promptslab) | ❌ NO | **CORRECTLY-EXCLUDED — STALE-class.** GPT-3-era structured-prompt library; superseded by instructor/pydantic-ai. Same disposition class as the catalog's ell/lmql/kor STALE rejects. |

## §L2.5.c — Genuine-gap list (L2.5), scored

**Genuine gaps requiring a new install-candidate catalog row: 0.**

The repos not in the catalog fall into three correctly-excluded buckets, none of which is an adoption gap:

1. **Constrained-decoding engines** (`lm-format-enforcer`, `xgrammar`, `llguidance`) — all local-model-only (require logit/weight access), the exact use-class the catalog already covers via `outlines` (T3) + `guidance` (T3) and the explicit SCORECARD-C §L2.5.4 finding that *constrained decoding is unusable on Claude/GPT cloud APIs* — the operator's entire model surface. Adding three more engines of the same unusable-on-cloud class would be cataloguing duplicates. **Correctly excluded.**
2. **Utilities / engines-internal** (`json_repair` = repair utility; `llguidance` = guidance's own backend) — not install-class primitives; dependencies of catalogued libraries. **Correctly excluded.**
3. **Wrong-layer or wrong-class** (`composio` = L0/L2 tool-integration; `agentica`/`sgr-agent-core`/`kani` = L2 agent frameworks; `functionary`/`node-llama-cpp` = model/runtime-class; `Promptify` = STALE GPT-3-era; `awesome-llm-json` = list). **Correctly excluded.**

One repo deserves an explicit watch-line (not a gap):

| Candidate | Stars | Native-CC pathway | Org | License | Recency | Fit-for-runtime | Verdict |
|---|--:|---|---|---|---|---|---|
| `google/langextract` | 36,475 | None (no plugin/MCP/skill) | Google (T1) | Apache-2.0 | Fresh (2026-Q2) | LOW — extraction-from-text use-class already met by instructor + pydantic-ai (schema-validated extraction) + docling/markitdown (doc extraction); Gemini-tuned | **WATCH-LINE, not a gap.** A high-quality repo, but it serves a sub-use-class the catalog already covers and has no CC-native pathway. Record as a Layer-F §2 watch row; do not add as an install candidate. |

## §L2.5.d — DEFINITIVE bottom-line (L2.5)

> **L2.5 Knowledge / Structured-Output is SATURATED. GENUINE GAPS = 0.** Receipt: 21 repos catalogued (§L2.5.a); 17 SOTA repos surfaced beyond the baseline via GitHub MCP (§L2.5.b), of which 4 are already catalogued and 13 are CORRECTLY-EXCLUDED (constrained-decoding engines of the catalogued outlines/guidance class · utilities · wrong-layer · STALE). The one notable un-catalogued high-star repo — `google/langextract` (36k★, Google) — is a text-extraction library serving a sub-use-class the catalog already meets via instructor + pydantic-ai + docling/markitdown, with no CC-native pathway; it is recorded as a WATCH-LINE, not an adoption gap. The catalog's L2.5 install set (**pydantic-ai + instructor** T1, with **BAML / outlines / guidance / dspy** as pilot/cite) is complete and correct for a cloud-API Python-centric solo runtime. No new catalog row is required; no install-set change.
>
> **One catalog-hygiene note (non-blocking):** Layer-F §2 could add a one-line watch row for `langextract` and a one-line "constrained-decoding engine family — see outlines/guidance disposition" pointer covering `lm-format-enforcer` + `xgrammar` + `llguidance`, so a future wave does not re-surface them as open questions. This is bookkeeping, not gap remediation.

---

# LAYER L3 — Peer Coding CLIs

## §L3.a — Baseline (what W259 already catalogues)

The W259 catalog covers L3 across **four documents**: the master matrix (`MASTER-SCORING-MATRIX-W259.md`), the benchmark scorecard (`BENCHMARK-SCORECARD-C-L2-L25-L3-W259v6.md` §L3), the orchestration deep-dive (`LAYER-B-orchestration-multiagent-skills.md` §5 — "Code-Agent Dev Frameworks (Peer CLIs)"), and the W258-V13 critique (`W258-V13-CRITIQUE.md` §L3 / §4.4).

| # | Repo | Catalog location | Disposition | Notes |
|--:|---|---|---|---|
| 1 | `openai/codex` (Codex CLI) | MATRIX row 55 `codex-plugin-cc` (92) · SCORECARD-C §L3.2 rank 1 (93) · LAYER-B §5 row 3 | **T1 INSTALL** | The installed cross-model reviewer (Path P); Terminal-Bench 2.0 #1 (82.0%) |
| 2 | `anomalyco/opencode` | MATRIX row 11 (88) · SCORECARD-C §L3.2 rank 3 (85) · LAYER-B §5 row 9 | **T2 PILOT** (demoted T1→T2 W259-v6) | 160k★; Terminal-Bench #53 — star-count ≠ capability |
| 3 | `AAIF/goose` (aaif-goose/goose) | MATRIX row 50 (86) · SCORECARD-C §L3.2 rank 2 (84) · LAYER-B §5 | **T2 STAGED-ADOPT** | Best OSS general-agent CLI on canonical TB (54.3%) |
| 4 | `OpenHands/OpenHands` | SCORECARD-C §L3.2 rank 4 (78) · LAYER-B §5 row 1 | **T3 WATCH** | Windows-WSL2-gated (D15=5); TB mid-pack |
| 5 | `google-gemini/gemini-cli` | MATRIX row 51 (88→86) · SCORECARD-C §L3.2 rank 5 (86) · MISSED-SOTA-2026-05-16 §3 #4 | **T4 WATCH** | 104k★; multi-provider redundancy not load-bearing |
| 6 | `Aider-AI/aider` | SCORECARD-C §L3.2 rank 6 (80) · LAYER-B §5 row 2 · MISSED-SOTA-2026-05-16 §2 | **T3 CITE-PATTERN** | Edit-loop pattern; superseded as agentic terminal CLI |
| 7 | `letta-ai/letta-code` | SCORECARD-C §L3.2 "Letta Code" note · MATRIX row 68-adjacent | **T4 WATCH** | Memory-first CLI; "#1 OSS" claim is stale-benchmark-era |
| 8 | `cline/cline` | LAYER-B §5 row 4 · W258-V13-CRITIQUE §L3 · MISSED-SOTA-2026-05-16 §2 (61,883★) | **REJECT — VS Code-specific** | "Autonomous coding agent as SDK/IDE-extension/CLI" |
| 9 | `continuedev/continue` | LAYER-B §5 row 5 · W258-V13-CRITIQUE §L3 · MISSED-SOTA-2026-05-16 §2 (33,221★) | **REJECT — IDE-specific** | VS Code/JetBrains plugin |
| 10 | `RooCodeInc/Roo-Code` | LAYER-B §5 row 4 (grouped w/ Cline) | **REJECT — VS Code-specific** | Now ARCHIVED on GitHub (see §L3.c) |
| 11 | `charmbracelet/crush` | W258-V13-CRITIQUE §L2/§4.4 ("charm-and-friends/crush") · MISSED-SOTA-2026-05-16 §2 (24,338★) | **mentioned — deferred** | Charmbracelet peer CLI (Bubble Tea); v13 §4.4 "possibly crush" |
| 12 | `princeton-nlp/SWE-agent` | LAYER-B §5 row 7 | **REJECT — superseded** | Research scaffold; superseded by OpenHands CodeAct |
| 13 | `OpenAutoCoder/Live-SWE-agent` | LAYER-B §5 row 6 · SCORECARD-D §L5 | **T3 PATTERN-CITE** (demoted, contaminated benchmark) | Research scaffold |
| 14 | `google/agents-cli` | MATRIX row 92 (87) | **T2 STUDY-PILOT** | Multi-provider CLI; turns any assistant into a GCP-agent expert |
| 15 | `openai/symphony` | MATRIX row 54 (84) | **T2 STUDY-PILOT** | Autonomous orchestrator (L3/L5) |
| 16 | Cursor / Devin / Augment / claudia | LAYER-B §5 row 9 ("claudia / OpenCode / Devin / Augment") | **PROVIDER-COMPLEMENT — cite-only** | Closed-source; not installable primitives |
| 17 | `zed-industries` agent protocol | W258-V13-CRITIQUE §L3 | **cite-only** | Zed's agent protocol (ACP) |

**Baseline count (L3): 17 repos / CLIs catalogued.** The catalog's L3 install verdict (`MASTER-SCORING-MATRIX` §4 + SCORECARD-C §L3.4): **Codex CLI** is the installed peer CLI; goose is STAGED-ADOPT; opencode is PILOT; gemini-cli/OpenHands/aider are WATCH/CITE; the IDE-bound CLIs (cline, continue, Roo) are REJECT-for-fit.

## §L3.b — SOTA repos found beyond the baseline (GitHub MCP research)

GitHub MCP sweeps run: `topic:coding-agent stars:>1500`, `topic:ai-coding-agent stars:>2000`, `topic:ai-agent-cli`-adjacent, `org:sourcegraph amp|cody`, `org:charmbracelet crush`, `cline ... stars:>10000`, `roo|kilo code stars:>5000`, plus the catalog's own `MISSED-SOTA-REPOS-2026-05-16.md` 3,288-result GraphQL sweep. Repos with a plausible peer-CLI claim and meaningful stars/org:

| Repo | Stars | License | IN-CATALOG? | Verdict |
|---|--:|---|---|---|
| `openai/codex` | (live) | Apache-2.0 | ✅ YES (MATRIX row 55) | CATALOGUED — T1 INSTALL (installed) |
| `anomalyco/opencode` | 160,923 | MIT | ✅ YES (MATRIX row 11) | CATALOGUED — T2 PILOT |
| `aaif-goose/goose` | 45,300 | Apache-2.0 | ✅ YES (MATRIX row 50) | CATALOGUED — T2 STAGED-ADOPT |
| `OpenHands/OpenHands` | 73,748 | (non-MIT) | ✅ YES (LAYER-B §5) | CATALOGUED — T3 WATCH |
| `google-gemini/gemini-cli` | 104,129 | Apache-2.0 | ✅ YES (MATRIX row 51) | CATALOGUED — T4 WATCH |
| `Aider-AI/aider` | 44,891 | Apache-2.0 | ✅ YES (LAYER-B §5) | CATALOGUED — T3 CITE-PATTERN |
| `cline/cline` | 61,896 | Apache-2.0 | ✅ YES (LAYER-B §5) | CATALOGUED — REJECT (VS Code-specific) |
| `continuedev/continue` | 33,221 | Apache-2.0 | ✅ YES (LAYER-B §5) | CATALOGUED — REJECT (IDE-specific) |
| `charmbracelet/crush` | 24,345 | (charmbracelet/FSL) | ✅ YES (W258-V13-CRITIQUE §4.4) | CATALOGUED — mentioned/deferred. Note: catalog wrote org as `charm-and-friends/crush`; live org is `charmbracelet/crush`. §L3.c hygiene. |
| `RooCodeInc/Roo-Code` | 24,088 | Apache-2.0 | ✅ YES (LAYER-B §5, grouped w/ Cline) | CATALOGUED — REJECT. **Now ARCHIVED on GitHub** — the REJECT verdict is reinforced. §L3.c. |
| `github/copilot-cli` | 10,492 | (GitHub) | ❌ NO | **CORRECTLY-EXCLUDED on fit.** GitHub-OFFICIAL terminal coding agent (real, strong-org). BUT it is GitHub/Copilot-ecosystem-bound (Copilot subscription + GitHub auth), closed-source CLI, no CC-native pathway. Same PROVIDER-COMPLEMENT / cite-only class as Cursor/Devin/Augment (LAYER-B §5 row 9). Not an installable OSS peer primitive. §L3.c. |
| `QwenLM/qwen-code` | (TIER-1, Alibaba) | Apache-2.0 | ❌ NO | **GAP-LOW.** A real peer CLI — open-source terminal agent, Apache-2.0, strong org (Alibaba/QwenLM), fresh (2026-Q2), Windows-supported, has SDKs + ACP daemon mode. BUT it is explicitly a **fork of `google-gemini/gemini-cli`** (its own README: "based on Google Gemini CLI ... parser-level adaptations for Qwen-Coder") — and `gemini-cli` IS catalogued (T4 WATCH). It is Qwen-model-tuned; Terminal-Bench 37.5% (its own README) — well below Codex CLI. See §L3.c — genuine but low-priority. |
| `sourcegraph/amp` (Amp CLI) | (Sourcegraph) | (closed) | ❌ partial | **CORRECTLY-EXCLUDED on fit.** Sourcegraph's Amp agentic coding tool. The GitHub org exposes only satellites (`amp.nvim` 189★, `amp-contrib` 16★, `amp-examples-and-guides`) — the Amp CLI itself is a closed-source product, not an OSS repo. Same closed-source PROVIDER-COMPLEMENT class as Cursor/Devin. The catalog's W258-V13-CRITIQUE §4.4 already names the peer-CLI field generically; Amp is cite-only. |
| `sourcegraph/cody` | 3,795 (snapshot) | Apache-2.0 | ❌ NO | **CORRECTLY-EXCLUDED.** `cody-public-snapshot` is ARCHIVED; `sourcegraph-public-snapshot` is ARCHIVED. Cody is an IDE assistant (VS Code/JetBrains), not a peer terminal CLI, and the public repos are archived snapshots. Wrong-class + abandoned-public. |
| `can1357/oh-my-pi` | 4,580 | (can1357) | ❌ NO | **CORRECTLY-EXCLUDED — strong-org rule.** A capable terminal coding agent (hash-anchored edits, LSP, subagents) but a single-individual project (TIER-3-IND per `MISSED-SOTA-REPOS-ROUND2-W259v2.md` D4). Per operator directive low-star/individual repos rarely matter unless strong-org; oh-my-pi is mid-star + individual. Not an adoption gap; the catalogued Codex CLI + goose dominate. |
| `superagent-ai/grok-cli` | 3,059 | (superagent) | ❌ NO | **CORRECTLY-EXCLUDED.** Grok-API coding agent; small org, single-model (xAI Grok), no CC pathway. Same multi-provider-redundancy-not-load-bearing override that holds gemini-cli at T4 — and grok-cli is materially weaker than gemini-cli. Cite-only at best. |
| `1jehuang/jcode` | 6,229 | (1jehuang) | ❌ NO | **CORRECTLY-EXCLUDED — strong-org rule.** "Coding Agent Harness" in Rust; single-individual, no benchmark placement, no CC pathway. Mid-star individual project. |
| `sigoden/aichat` | 9,998 | (sigoden) | ❌ NO | **CORRECTLY-EXCLUDED — wrong-class.** An all-in-one LLM CLI (shell-assistant + chat-REPL + RAG) — a general LLM-chat CLI, not a terminal *coding-agent* peer in the Codex/opencode class. Individual maintainer. |
| `esengine/DeepSeek-Reasonix` | 3,370 | (esengine) | ❌ NO | **CORRECTLY-EXCLUDED.** DeepSeek-tuned terminal coding agent; single-individual, single-model, no CC pathway, no benchmark placement. |
| `truffle-ai/dexto` | 620 | (truffle-ai) | ❌ NO | **CORRECTLY-EXCLUDED — low-star.** Coding-agent + general-agent harness; small org, low star, no distinctive. |
| `CommandCodeAI/command-code` | 3,217 | (CommandCodeAI) | ❌ NO | **CORRECTLY-EXCLUDED — low-signal.** Small org, no benchmark placement, no CC pathway. |

## §L3.c — Genuine-gap list (L3), scored

**Genuine gaps: 1 — `QwenLM/qwen-code` (GAP-LOW, doc-only).**

The catalogued peer-CLI field is otherwise complete: every canonical peer CLI (Codex CLI, opencode, goose, OpenHands, gemini-cli, aider, cline, crush, continue, Roo, Cursor/Devin/Augment, Amp, Copilot CLI) is either catalogued with a disposition or correctly excluded as a closed-source PROVIDER-COMPLEMENT (Cursor, Devin, Augment, Amp, Copilot CLI) or a single-individual mid-star project (oh-my-pi, jcode, grok-cli, aichat, DeepSeek-Reasonix) that the strong-org directive correctly screens out.

| # | Candidate | Stars | Native-CC pathway | Org | License | Recency | Fit-for-runtime | Score / Verdict |
|--:|---|--:|---|---|---|---|---|---|
| 1 | `QwenLM/qwen-code` | TIER-1 (Alibaba/QwenLM) | None (no plugin/MCP/skill; has own ACP + SDKs) | **Strong** — Alibaba QwenLM (T1-OFFICIAL) | Apache-2.0 (clean) | Fresh — 2026-Q2 active | **LOW** — it is a `gemini-cli` fork (Qwen-model-tuned), and `gemini-cli` is already catalogued T4 WATCH. Windows-supported. Terminal-Bench 37.5% (own README) — far below Codex CLI's 82.0%. Adds a Qwen-model peer CLI, but cross-model review is already satisfied by the installed Codex CLI (Path P). | **GAP-LOW.** Genuine (a documented, OSS, strong-org peer CLI exists and is not in the catalog) but **low-priority**: it is downstream of the catalogued gemini-cli and adds no capability the installed Codex CLI does not already provide. **Action: add a one-line catalog row at T4 WATCH** (parity with gemini-cli — "Qwen-tuned gemini-cli fork; multi-provider redundancy not load-bearing"). **Do not pilot, do not install.** |

**Catalogued-repo hygiene notes (superseded / org-drift / archived — flagged, not gaps):**

- `RooCodeInc/Roo-Code` — **now ARCHIVED on GitHub** (the upstream merged into / was superseded by the Kilo-Code lineage). The catalog's existing **REJECT (VS Code-specific)** verdict is *reinforced* by the archival; recommend the catalog annotate Roo-Code as "ARCHIVED 2026 — REJECT confirmed."
- `charmbracelet/crush` — the catalog (W258-V13-CRITIQUE §4.4) wrote the org as **`charm-and-friends/crush`**; the live repo is **`charmbracelet/crush`** (24,345★, Go). One-line org-string fix; the deferred disposition is unchanged.
- `sourcegraph/cody` / `sourcegraph/sourcegraph` — the public repos are **archived snapshots** (`*-public-snapshot`, ARCHIVED). Any future Cody reference should cite it as a closed-product IDE assistant, not an OSS peer CLI.

## §L3.d — DEFINITIVE bottom-line (L3)

> **L3 Peer CLI is SATURATED for adoption purposes — 1 genuine gap, low-priority, documentation-only.** Receipt: 17 peer CLIs catalogued (§L3.a); the GitHub MCP sweep + the catalog's own 3,288-result GraphQL discovery (§L3.b) surfaced no canonical peer CLI missing a disposition. Every well-known peer CLI is accounted for — Codex CLI (T1 INSTALL, installed), opencode (T2), goose (T2), OpenHands (T3), gemini-cli (T4), aider (T3-cite), cline/continue/Roo (REJECT — IDE-bound), crush (deferred), and the closed-source set Cursor/Devin/Augment/Amp/Copilot-CLI (PROVIDER-COMPLEMENT, cite-only). The single genuine gap is **`QwenLM/qwen-code`** — an OSS, Apache-2.0, strong-org (Alibaba) terminal coding agent that is *not* in the catalog; but it is a fork of the already-catalogued `gemini-cli`, scores far below Codex CLI on Terminal-Bench (37.5% vs 82.0%), and adds no cross-model-review capability the installed Codex CLI does not already provide. **Verdict: GAP-LOW — add one T4 WATCH catalog row (gemini-cli parity), do not pilot, do not install.** The catalog's L3 install set (Codex CLI as the peer CLI; everything else pilot/watch/cite) needs **no change.**
>
> **Hygiene (non-blocking):** annotate `Roo-Code` as ARCHIVED (REJECT reinforced), fix the `crush` org string (`charm-and-friends` → `charmbracelet`), and add the `qwen-code` T4 WATCH row.

---

## §SUMMARY — Coverage rollup (both layers)

| Layer | Baseline catalogued | SOTA repos surfaced beyond baseline | Genuine gaps | Bottom-line |
|---|--:|--:|--:|---|
| **L2.5 Knowledge / Structured-Output** | 21 | 17 (4 already catalogued · 13 correctly-excluded) | **0** | **SATURATED** — install set (pydantic-ai + instructor T1; BAML/outlines/guidance/dspy pilot/cite) complete; `langextract` recorded as WATCH-LINE not a gap |
| **L3 Peer CLI** | 17 | 21 (10 already catalogued · 10 correctly-excluded · 1 GAP-LOW) | **1** (`qwen-code`, low-priority) | **SATURATED for adoption** — 1 genuine gap is doc-only (add T4 WATCH row); install set (Codex CLI) unchanged |

**Pervasive pattern (both layers).** The W259 catalog's L2.5/L3 coverage is **complete at the SOTA level**. What the research-beyond surfaced was *not* missing SOTA — it was (a) **engine-internal / utility repos** the catalog correctly does not treat as install-class primitives (xgrammar, llguidance, json_repair), (b) **wrong-layer repos** (composio = tool-integration; agentica/kani = L2 frameworks), (c) **closed-source PROVIDER-COMPLEMENT products** the catalog correctly treats as cite-only (Cursor, Devin, Amp, Copilot CLI), and (d) **single-individual mid-star projects** the operator's strong-org directive correctly screens out (oh-my-pi, jcode, grok-cli). The one true gap — `qwen-code` — is a fork of an already-catalogued repo and is low-priority. **Neither layer requires an install-set change.** The only actions are catalog-hygiene: one `qwen-code` watch row, one `langextract` watch-line, one `crush` org-string fix, one `Roo-Code` ARCHIVED annotation.

---

**Artifact:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\08-coverage-audit-W259v16\KNOWLEDGE-CLI-COVERAGE.md`
**Cross-links:** `05-scoring/MASTER-SCORING-MATRIX-W259.md` (23-dim matrix, 99 rows) · `05-scoring/BENCHMARK-SCORECARD-C-L2-L25-L3-W259v6.md` (L2.5/L3 benchmark scorecard) · `05-scoring/PER-LAYER-BENCHMARK-SCORECARD-W259v6.md` (per-layer canonical-benchmark rollup) · `02-layer-deepdive/LAYER-F-knowledge-wiki-context-engineering-prompts.md` (L2.5 deep-dive) · `02-layer-deepdive/LAYER-B-orchestration-multiagent-skills.md` §5 (peer-CLI deep-dive) · `04-critique/W258-V13-CRITIQUE.md` §L3/§4.4 · `01-graphql-discovery/MISSED-SOTA-REPOS-2026-05-16.md` (3,288-result discovery sweep) · `03-deepdive/MEMORY-RAG-COVERAGE-AUDIT-W259v16.md` (sibling coverage-audit pattern).
**Sources:** Repo metadata (stars / license / push-date / archived-status) pulled live from GitHub via `mcp__github__search_repositories` + `mcp__github__get_file_contents` on 2026-05-16/17. Catalog dispositions imported as-is from the W259 grand catalog (not re-litigated). Cite-class `effective_tier=TIER-3-LOCAL-COMPOSITION`.
