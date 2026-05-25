# LAYER-F: Knowledge + Wiki + Context-Engineering + ADR + Prompt-Engineering Frameworks

> W259 LAYER-F DEEP-DIVE 2026-05-16 — GAP layer covering the substrate beneath Anthropic CC for prompt authoring, structured outputs, knowledge surfaces, ADRs, prompt caching, and long-context handling.

## §0 — Landscape

Anthropic Claude Code (CC) already ships first-class **prompt caching** (per https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) and **CLAUDE.md/skills/plugins** for context distribution. LAYER-F augments CC where the harness has no native primitive:

| Sublayer | CC native? | Augment / Conflict / Gap |
|---|---|---|
| Context engineering frameworks | PARTIAL (skills, CLAUDE.md) | AUGMENT for Python apps built *from* CC; CC harness itself uses CLAUDE.md compounding-surface (Karpathy §5) |
| Structured outputs / function calling | PARTIAL (tool-use schemas) | AUGMENT for non-CC apps; CC tool-use is server-side |
| Prompt-engineering DSLs | NONE | GAP — `.prompty`/BAML/dspy/promptflow are off-CC asset formats |
| Wiki / knowledge surfaces | PARTIAL (CLAUDE.md memory tree) | AUGMENT — graph-note OSS PKMs (foam, logseq, dendron) feed CC via CLAUDE.md pointers |
| ADR tools | NONE | GAP — `docs/adr/*.md` patterns + log4brains static-site publishing |
| Prompt caching strategies | NATIVE (Anthropic SDK) | CC already has it; GPTCache etc. are for OTHER providers in a multi-model harness |
| Long-context strategies | NATIVE (1M ceiling per `CLAUDE_CODE_DISABLE_1M_CONTEXT` env) | AUGMENT — LLMLingua/semantic-router pre-compress before CC ingestion |

**Total candidates surveyed: 47.** All metadata pulled live from GitHub API on 2026-05-16. License-clean (MIT/Apache) candidates highlighted in §9.

---

## §1 — Context engineering frameworks

| Repo | Stars | License | Last push | Archived | Role |
|---|---:|---|---|---|---|
| stanfordnlp/dspy | 34,465 | MIT | 2026-05-16 | NO | Modular AI system programming (signatures, modules, optimizers) |
| pydantic/pydantic-ai | 17,092 | MIT | 2026-05-16 | NO | Typed agent SDK ("Pydantic for agents"); CC-aware (`.claude/` dir) |
| coleam00/context-engineering-intro | 13,323 | MIT | 2026-03-16 | NO | CC-centric context-eng tutorial repo; PRP workflow |
| jackmpcollins/magentic | 2,406 | MIT | 2026-03-11 | NO | `@prompt`/`@chatprompt` Python decorators |
| PrefectHQ/marvin | 6,156 | Apache-2.0 | 2026-05-12 | NO | Ambient intelligence library; Pydantic-based |
| MadcowD/ell | 5,869 | MIT | 2025-06-05 | NO | Language-model programming library (versioning) — **STALE 11mo** |
| eth-sri/lmql | 4,174 | Apache-2.0 | 2025-05-22 | NO | Constraint-guided LLM programming — **STALE 12mo** |
| Mirascope/mirascope | 1,483 | MIT | 2026-05-16 | NO | "Anti-framework" LLM Python toolkit |
| eyurtsev/kor | 1,685 | MIT | 2025-02-03 | NO | LangChain structured extraction — **STALE 15mo** |
| PrefectHQ/ControlFlow | 1,393 | Apache-2.0 | 2025-08-22 | **YES** | **ARCHIVED — SKIP** (now prefect-archive/) |
| humanlayer/advanced-context-eng-for-coding-agents | 1,692 | ? | 2025-12-03 | NO | Patterns repo |

**Top-3:** `pydantic-ai` (typed substrate, MIT, CC-aware), `dspy` (program-not-prompt paradigm, MIT), `coleam00/context-engineering-intro` (CC-native workflow tutorial).

---

## §2 — Structured output / function calling

| Repo | Stars | License | Last push | Archived | Role |
|---|---:|---|---|---|---|
| dottxt-ai/outlines | 13,843 | Apache-2.0 | 2026-05-13 | NO | Regex/JSON/grammar structured generation |
| 567-labs/instructor | 12,965 | MIT | 2026-05-11 | NO | Pydantic structured outputs (Anthropic supported) |
| BoundaryML/baml | 8,238 | Apache-2.0 | 2026-05-16 | NO | DSL → polyglot codegen (Py/TS/Ruby/Java/Rust/Go) |
| guidance-ai/guidance | 21,461 | MIT | 2026-05-06 | NO | Pythonic template language for LLMs |
| 1rgs/jsonformer | 4,925 | MIT | 2024-02-24 | NO | JSON-from-LLM — **STALE 27mo, SKIP** |
| microsoft/aici | 2,075 | MIT | 2025-01-22 | NO | Wasm controllers; **succeeded by llguidance** (per README) |

**Top-3:** `instructor` (Pydantic-Anthropic native), `outlines` (provider-independent), `BAML` (cross-language with rich tooling).

---

## §3 — Prompt-engineering DSLs / asset formats

| Repo | Stars | License | Last push | Archived | Role |
|---|---:|---|---|---|---|
| microsoft/promptflow | 11,126 | MIT | 2026-05-14 | NO | YAML flows, eval pipeline, Azure-native |
| microsoft/prompty | 1,212 | MIT | 2026-05-14 | NO | `.prompty` asset format (frontmatter + Jinja) |
| character-ai/prompt-poet | 1,148 | MIT | 2026-02-12 | NO | Low-code Python prompt templates (production C.AI) |
| BoundaryML/baml | 8,238 | Apache-2.0 | 2026-05-16 | NO | (also §2) DSL with VSCode plugin |
| microsoft/genaiscript | 2,901 | MIT | 2026-03-24 | NO | TypeScript automation scripts for GenAI |

**Top-3:** `BAML` (best tooling + cross-language), `prompty` (lightweight `.prompty` asset class is portable), `promptflow` (CI/CD-grade evaluation).

---

## §4 — Wiki / knowledge surface for agents

| Repo | Stars | License | Last push | Archived | Role |
|---|---:|---|---|---|---|
| AppFlowy-IO/AppFlowy | 70,543 | AGPL-3.0 | 2026-05-12 | NO | Notion-equiv OSS, AI workspace |
| logseq/logseq | 42,911 | AGPL-3.0 | 2026-05-16 | NO | Privacy-first PKM, graph notes |
| outline/outline | 38,507 | BSL/NOASSERTION | 2026-05-16 | NO | Team knowledge base (markdown) |
| Requarks/wiki (Wiki.js) | 28,314 | AGPL-3.0 | 2026-05-01 | NO | Node.js wiki app |
| BookStackApp/BookStack | 18,759 | MIT | 2026-05-16 | NO | Self-hosted docs platform |
| foambubble/foam | 17,128 | NOASSERTION | 2026-05-14 | NO | VSCode-native PKM (markdown + backlinks) |
| AsyncFuncAI/deepwiki-open | 16,369 | MIT | 2026-05-16 | NO | AI-generated wikis FROM repos |
| dendronhq/dendron | 7,397 | Apache-2.0 | 2025-11-13 | NO | Hierarchical VSCode PKM — **STALE 6mo, watch** |

**License caveat:** AGPL-3.0 (logseq, AppFlowy, Wiki.js) requires source disclosure on hosted use. For a local-only CC harness PKM, this is acceptable but BookStack (MIT) or foam (VSCode-native, repo-as-PKM) align better with CC's CLAUDE.md compounding-surface philosophy.

**Top-3:** `foambubble/foam` (VSCode-native, markdown-only, no server — direct CLAUDE.md compounding-surface integration), `deepwiki-open` (auto-generate per-repo wikis as MCP-readable knowledge), `BookStack` (MIT for team-shared docs).

---

## §5 — ADR / decision-log tools

| Repo | Stars | License | Last push | Archived | Role |
|---|---:|---|---|---|---|
| npryce/adr-tools | 5,456 | NOASSERTION | 2024-04-25 | NO | OG bash ADR CLI — **STALE 25mo but de-facto standard** |
| thomvaill/log4brains | 1,481 | Apache-2.0 | 2024-12-17 | NO | ADR mgmt + static-site publication — **STALE 17mo** |
| structurizr/lite | 381 | MIT | 2026-02-01 | **YES** | C4 model — **ARCHIVED SKIP** (use upstream `structurizr/cli` instead) |
| adr/adr-manager | 153 | MIT | 2025-08-14 | NO | Web UI for ADR management |

**Top-3:** `log4brains` (modern publication workflow, Apache-2.0, accepts staleness for stable format), `npryce/adr-tools` (de-facto template standard — adopt the MADR template format without the bash CLI), MADR template (https://adr.github.io/madr/) as a pure-markdown convention layered on `docs/adr/NNNN-*.md` (no install needed).

---

## §6 — Prompt caching strategies

**Authoritative finding:** Anthropic CC ships native prompt caching per https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching (`cache_control` headers, 5-min ephemeral + 1h extended, 90% cost reduction, 85% latency reduction). For CC users, this is NATIVE — no third-party install needed.

| Repo | Stars | License | Last push | Archived | Role |
|---|---:|---|---|---|---|
| zilliztech/GPTCache | 8,031 | MIT | 2025-07-11 | NO | Semantic cache for non-Anthropic LLMs — **STALE 10mo** |

**Recommendation:** SKIP third-party prompt-cache substrates for the CC harness. Rely on Anthropic native `cache_control`. GPTCache only relevant if the harness routes via LiteLLM to non-Anthropic providers (Layer outside scope).

---

## §7 — Long-context strategies

| Repo | Stars | License | Last push | Archived | Role |
|---|---:|---|---|---|---|
| microsoft/LLMLingua | 6,193 | MIT | 2026-04-08 | NO | Prompt compression (20x); incl. LongLLMLingua + LLMLingua-2 |
| aurelio-labs/semantic-router | 3,514 | MIT | 2026-05-14 | NO | Sub-100ms route decisions (skip-LLM gates) |
| explodinggradients/ragas | 13,932 | Apache-2.0 | 2026-02-24 | NO | RAG context-quality evaluation |

**Anthropic CC native:** 1M context-window ceiling on Opus 4.7/Sonnet 4.6 (per `CLAUDE_CODE_DISABLE_1M_CONTEXT` env per `CLAUDE.local.md` ENV (h) + https://code.claude.com/docs/en/model-config). LLMLingua applies BEFORE ingestion to extend the effective ceiling further.

**Top-3:** `LLMLingua` (battle-tested 20x compression, integrates as preprocessing step), `semantic-router` (cheap gate for "does this prompt need LLM at all?"), `ragas` (RAG eval — verify retrieval quality fed into CC).

**Bonus — Eval harnesses for prompt quality:**

| Repo | Stars | License | Last push | Role |
|---|---:|---|---|---|
| promptfoo/promptfoo | 21,303 | MIT | 2026-05-16 | Used by OpenAI + Anthropic per README — RECOMMENDED |
| EleutherAI/lm-evaluation-harness | 12,583 | MIT | 2026-05-11 | Few-shot model-level eval |
| openai/evals | 18,472 | NOASSERTION | 2026-04-14 | OpenAI's benchmark registry |
| anthropics/claude-cookbooks | 43,097 | MIT | 2026-05-14 | Authoritative Anthropic recipes (was anthropic-cookbook, RENAMED) |
| anthropics/prompt-eng-interactive-tutorial | 35,696 | ? | 2026-03-01 | Anthropic interactive prompt course |
| anthropics/courses | 21,377 | NOASSERTION | 2025-11-13 | Anthropic education |
| dair-ai/Prompt-Engineering-Guide | 74,635 | MIT | 2026-03-11 | Largest community guide |

---

## §8 — Convergence findings

1. **Pydantic ecosystem dominates structured-output**: instructor + pydantic-ai + magentic + marvin + outlines all converge on Pydantic models as the canonical schema language. Confirmed via 5-org Axis-1 (Stanford/Pydantic/567-labs/Prefect/dottxt-ai).
2. **Prompty `.prompty` format is becoming the de-facto portable asset class**: Microsoft Prompty + promptflow + Azure AI Foundry + VSCode Prompty extension. Cross-org adoption (Microsoft + Vercel AI SDK references).
3. **Wiki-as-CC-substrate convergence on VSCode-native**: foam + dendron both treat the VSCode workspace as the PKM. This directly stacks with CC's CLAUDE.md-tree compounding surface (Karpathy §5).
4. **ADR convergence on MADR template format**: log4brains + adr-manager + npryce/adr-tools all converge on `NNNN-title.md` files. Adopting the MADR convention is ZERO install — just a `docs/adr/` directory and a template file.
5. **Anthropic prompt caching obsoletes third-party cache layers FOR THE CC HARNESS** — only relevant for multi-provider routing (LiteLLM/Portkey territory, not LAYER-F).
6. **ControlFlow archived 2025-08, AICI superseded by llguidance, jsonformer/promptbase/adr-tools all stale 1+ year** — must NOT recommend these as install candidates.
7. **LLMLingua remains the canonical prompt-compression primitive**: 20x compression, EMNLP/ACL peer-reviewed, includes LongLLMLingua + LLMLingua-2 in one repo. No converged competitor.

---

## §9 — Recommendation

### INSTALL CANDIDATES (cardinal-rule-1 + cardinal-rule-6 compliant)

| Sublayer | Pick | Stars | License | Justification |
|---|---|---:|---|---|
| Context-engineering primitive (Python apps built FROM CC) | `pydantic/pydantic-ai` | 17,092 | MIT | Typed agent SDK, Anthropic-first, CC-aware (`.claude/`) |
| Structured-output (when CC tool-use insufficient) | `567-labs/instructor` | 12,965 | MIT | Pydantic + Anthropic provider native |
| Prompt DSL / portable asset format | `microsoft/prompty` | 1,212 | MIT | `.prompty` asset class — cross-tool portable |
| Wiki/PKM surface for CLAUDE.md compounding | `foambubble/foam` | 17,128 | (markdown — no runtime) | VSCode-native, zero-server, repo-as-PKM |
| ADR convention | MADR template (no repo install) | n/a | CC0 | Pure `docs/adr/NNNN-*.md` markdown convention |
| Long-context prompt compression | `microsoft/LLMLingua` | 6,193 | MIT | 20x compression, peer-reviewed, includes Long+v2 |
| Eval harness (when adding CC features) | `promptfoo/promptfoo` | 21,303 | MIT | Used by OpenAI + Anthropic in production |
| Anthropic cookbook reference | `anthropics/claude-cookbooks` | 43,097 | MIT | TIER-1-DIRECT Anthropic authority — clone for reference |

### SKIP / DO NOT INSTALL

- `PrefectHQ/ControlFlow` — ARCHIVED 2025-08-22
- `structurizr/lite` — ARCHIVED
- `1rgs/jsonformer` — STALE 27 months
- `microsoft/aici` — superseded by llguidance per upstream README
- `npryce/adr-tools` — STALE 25 months (use MADR template directly)
- `eth-sri/lmql` — STALE 12 months, no recent commits
- `microsoft/promptbase` — STALE 23 months
- `eyurtsev/kor` — STALE 15 months
- `zilliztech/GPTCache` — redundant with Anthropic native prompt caching for CC harness
- `MadcowD/ell` — STALE 11 months (revisit if push activity resumes)
- AGPL-3.0 PKMs (logseq, AppFlowy, Wiki.js) — usable but license-heavier than foam/BookStack

### STUDY-PILOT (worth exploring, not install-yet)

- `BoundaryML/baml` — strong DSL but adds another build step; pilot in a dedicated subproject before runtime adoption
- `stanfordnlp/dspy` — paradigm-shifting but heavier than CC's prompt model; pilot for RAG-heavy subprojects
- `AsyncFuncAI/deepwiki-open` — auto-generate per-repo wikis from local repos; pilot for big-repo onboarding
- `anthropics/prompt-eng-interactive-tutorial` + `anthropics/courses` — training, not runtime install

### Crosswalk to existing CLAUDE.md primitives

- **Karpathy §5 Wiki Compounding Surface** → foam (VSCode-native PKM) directly implements this
- **Anthropic prompt caching** (CLAUDE.md auto-load + skills lazy-load) → already native; no install needed
- **CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70** (ENV (i) → LLMLingua applies as a pre-compaction stage in the hook chain (auto-compact-discipline.md Rank #3.5 PreCompact priority_preservation)
- **ADR governance** → MADR template + `docs/adr/` is a `.claude/settings.json` convention, NOT a `.claude/rules/*.md` self-invent (cardinal-rule-4 compliant)

---

**Artifact path:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\02-layer-deepdive\LAYER-F-knowledge-wiki-context-engineering-prompts.md`

**Sources:** All star/license/push/archived metadata pulled live from GitHub API on 2026-05-16 via `gh api repos/<org>/<name>`. Repo READMEs indexed via ctx_fetch_and_index. Anthropic CC native primitives cited from https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching and https://code.claude.com/docs/en/model-config. Karpathy §5 cite resolved via `Z:/claude-sota/.claude/rules/karpathy-adapted.md`.
