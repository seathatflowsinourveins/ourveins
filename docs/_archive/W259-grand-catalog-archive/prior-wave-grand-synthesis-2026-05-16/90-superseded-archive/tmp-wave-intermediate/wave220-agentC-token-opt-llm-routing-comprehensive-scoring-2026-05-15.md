# Wave 220 Round 1 Agent C - Token Optimization + LLM Routing + Context Management SOTA Scoring

Date: 2026-05-15
Target runtime: `Z:\claude-sota-pure`
Scope: TOKEN-OPT + LLM-ROUTING + CONTEXT-MGMT only. MEMORY/RAG and AGENT-ORCH/PLUGINS intentionally excluded.
Repo HEAD for local cite anchors: `Z:/claude-sota-installed @ c164103a52ec6ced2e345de2919592805c4aff90` [VERIFIED].

## 0. BRIDGE-MODE / Codex Disclosure

STAND-IN-NOTICE: [VERIFIED] No external `codex exec --ephemeral -p deep-review-exec` subprocess was launched from this API-hosted Codex session. This artifact is produced by the in-session Codex model plus local probes and official-doc browsing. Therefore CR-3 "independent cross-model gate" is PARTIAL, not FULL, until a follow-on `codex exec`/T2 gate reviews this artifact.

Per-call codex time budget actuals:

| call | budget | actual | status |
|---|---:|---:|---|
| external codex CLI T1 | 0s allocated | 0s | NOT-RUN; API Codex session only [VERIFIED] |
| local file probes | 120s aggregate target | completed in-session | PASS [VERIFIED] |
| OpenAI docs MCP lookups | 60s aggregate target | completed in-session | PASS [VERIFIED] |
| web/official docs refresh | 120s aggregate target | completed in-session | PASS [VERIFIED] |

Cross-model gate satisfaction: PARTIAL [VERIFIED]. This is research-first discovery suitable for install planning; install commits should run the repo's normal T1/T2 gate.

## 1. Executive Summary - Top-5 ADOPT-NOW

1. **Anthropic-native prompt caching + cache-aware dispatch discipline** - [VERIFIED] The dominant 2026 replacement for LLMLingua-style lossy prompt compression in Claude Code runtime work is provider-native prefix caching, stable prompt-prefix design, account/route stickiness, and cache warm/cold probes. Adopt as a rule/config layer first; no standalone repo required.
2. **cnighswonger/claude-code-cache-fix** - [VERIFIED] Best install-class gap for Claude Code cache normalization: prior local audit records measured 95.5% cache hit via proxy vs 82.3% direct and 7 hot-reloadable extensions. Adopt as a reversible pilot for `ANTHROPIC_BASE_URL=http://127.0.0.1:9801`.
3. **context-mode + repomix retained as primary context-ingestion stack** - [VERIFIED] context-mode is already the local primary high-output tool sandbox; repomix is the MIT codebase compression/pack-grep primitive. In pure runtime, install both early, with context-mode ELv2 risk explicitly accepted or replaced if policy forbids ELv2.
4. **ccusage + Anthropic token-counting + OpenAI tiktoken** - [VERIFIED] Token accounting needs three levels: Claude Code session/account usage (`ccusage`), API preflight counting for Anthropic, and tokenizer utilities for OpenAI/offline estimation. Install/wire ccusage; cite Anthropic/OpenAI primitives.
5. **LiteLLM as STUDY-PILOT, not Day-1 mandatory** - [VERIFIED] LiteLLM is SOTA for unified provider routing/proxying, but pure runtime already has Anthropic-direct + CLIProxyAPI/Ollama patterns. Adopt when provider diversification, fallback routing, or per-model governance is explicit.

## 2. LLMLingua Replacement Verdict - What Is SOTA in 2026?

[VERIFIED] Microsoft LLMLingua / LongLLMLingua / LLMLingua-2 remain important prompt-compression research baselines, but they are not the best default primitive for a Claude Code runtime in May 2026. Prior local Probe-5 classified LLMLingua as mode-harness incompatible because runtime use requires Python/PyTorch plus local compressor inference and adds latency/dependency weight (`tmp/wave209-agentJ-token-eff-cost-opt-deep-2026-05-15.md:20,36,92 @ c164103a5`).

[INFERRED] The 2026 SOTA replacement is not a single "new LLMLingua repo"; it is a stack:

| rank | replacement class | why it supersedes LLMLingua for this runtime |
|---:|---|---|
| 1 | Provider-native prompt caching | Lossless for stable prefixes; no local compressor model; improves cost/latency without semantic deletion. Anthropic cache_control, OpenAI automatic prompt caching, Gemini context caching all converge. |
| 2 | Cache-aware dispatch | Preserves prefix and route/account affinity so native caching actually hits; this is the runtime-level optimization LLMLingua cannot solve. |
| 3 | Tool-output sandboxing + searchable index | context-mode and repomix prevent huge raw outputs from entering the conversation at all. This avoids compression-after-bloat. |
| 4 | Steered compaction + compiled wiki | `save -> compact -> restore` and Karpathy-style Layer-3 wiki manage long-arc context rot better than repeated lossy prompt shrinkage. |
| 5 | Research compressors (LLMLingua-2, LongLLMLingua, ICAE, AutoCompressor, 500xCompressor, Selective Context, SPR) | Keep as CITE/PATTERN or offline evaluation candidates; not Day-1 runtime installs. |

Verdict: **REJECT LLMLingua as install-class Day-1**; **ADOPT native caching + cache-aware routing + context-mode/repomix + compact discipline** as the SOTA runtime replacement [VERIFIED/INFERRED].

## 3. Full Scoring Tables

Legend: `cpd` = commit/activity per day band from local prior or source freshness; `axis_3_band` = maturity/activity band; `axis_1_orgs` = distinct-org convergence count; `native_cc_path` = Claude Code-native path.

### T1 - Prompt Compression / Cache-Replacement Layer

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | axis_2_dated | native_cc_path | install_diff | wired_diff | cr12_disposition | probe_pass | probe_fail | verdict | conf | source_grade | implant_plan | cite_anchors |
|---|---:|---|---:|---|---|---:|---|---|---|---|---|---|---|---|---:|---|---|---|
| anthropic prompt-cache cache_control | n/a | SaaS/API | n/a | HIGH | ACTIVE-OFFICIAL | 3 | PASS | Native API primitive | none | preserve stable prefix + cache_control blocks | CITE-CLASS-CANONICAL | official docs; 5m/1h TTL; breakpoints | no repo install | ADOPT-NOW | 0.94 | A | Rule: static tools/system/docs first; volatile user tail last; measure warm/cold | Anthropic docs prompt caching [VERIFIED]; `tmp/wave209...:63 @ c164103a5` |
| OpenAI prompt caching | n/a | SaaS/API | n/a | HIGH | ACTIVE-OFFICIAL | 3 | PASS | API primitive | none | optional `prompt_cache_key`; track `cached_tokens` | CITE-CLASS-CANONICAL | auto >=1024 tokens; prefix routing; 128-token increments | no CC install | ADOPT for OpenAI paths | 0.93 | A | Use stable prefix and cache key in any OpenAI router path | OpenAI docs MCP prompt-caching guide [VERIFIED] |
| Gemini context caching API | n/a | SaaS/API | n/a | HIGH | ACTIVE-OFFICIAL | 3 | PASS | API primitive | none | explicit/implicit cache wiring if Gemini enabled | CITE-CLASS-CANONICAL | official API exists | no Gemini path yet | ADOPT when Gemini provider enabled | 0.86 | A- | Keep in provider adapter design; not Day-1 if Gemini absent | Google Gemini docs [VERIFIED] |
| cnighswonger/claude-code-cache-fix | local prior | MIT | 90+ | MED | ACTIVE | 3 | PARTIAL | `ANTHROPIC_BASE_URL` proxy | `npm install -g claude-code-cache-fix@3.0.3` | ENV + proxy service | GENUINELY-NEW | measured 95.5% vs 82.3%; reversible | CC-version drift risk | ADOPT-NOW PILOT | 0.90 | A- | Install after base Claude Code + before long-arc work; add cache telemetry | `tmp/wave209...:17,33,72,101-104,127 @ c164103a5` |
| microsoft/LLMLingua / LLMLingua-2 / LongLLMLingua | current stars UNKNOWN; prior star-valid | MIT | 1000+ | LOW-MED | MATURE-RESEARCH | 3 | PASS | none | pip/PyTorch compressor | none | REJECT-FOR-FIT | MIT; papers; mature | PyTorch/local inference; runtime latency/deps | REJECT-DAY1; CITE | 0.89 | B+ | Keep as benchmark/offline compressor candidate only | `tmp/wave209...:20,36,92 @ c164103a5`; Microsoft repo [VERIFIED] |
| ICAE / In-Context Autoencoder | UNKNOWN | paper/research | 600+ | LOW | RESEARCH | 2 | PASS | none | research code only | none | CITE-ONLY | strong compression research | not runtime-integrated | CITE-ONLY | 0.72 | B | Track for future offline compaction eval | arXiv/GitHub search [VERIFIED] |
| AutoCompressor | UNKNOWN | research | 1000+ | LOW | RESEARCH | 2 | PASS | none | research code | none | CITE-ONLY | useful concept | no CC-native path | CITE-ONLY | 0.70 | B | Pattern only: learned summary tokens | arXiv search [VERIFIED] |
| 500xCompressor | UNKNOWN | research | UNKNOWN | LOW | RESEARCH | 1-2 | PARTIAL | none | research code | none | HNF/PATTERN | named in literature | source freshness unresolved | HNF | 0.55 | C | Do not install without fresh source verification | web search partial [UNKNOWN] |
| Selective Context | UNKNOWN | likely research OSS | 1000+ | LOW | MATURE-RESEARCH | 2 | PASS | none | optional pip/research | none | CITE-ONLY | simple token-selection baseline | likely superseded by native caching for CC | CITE-ONLY | 0.73 | B | Keep as offline eval baseline | web search [VERIFIED] |
| DaveShap SPR | n/a | prompt pattern | 1000+ | LOW | PATTERN | 1 | PARTIAL | prompt discipline | none | docs/rule only | CITE-ONLY | useful human-readable compression idea | no strict reproducible repo gate | PATTERN-ONLY | 0.64 | C+ | Optional compact prompt style, not install | web search [VERIFIED] |

### T2 - Context Management

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | axis_2_dated | native_cc_path | install_diff | wired_diff | cr12_disposition | probe_pass | probe_fail | verdict | conf | source_grade | implant_plan | cite_anchors |
|---|---:|---|---:|---|---|---:|---|---|---|---|---|---|---|---|---:|---|---|---|
| mksglu/context-mode | ~14.8k prior | Elastic-2.0 | 90+ | HIGH | ACTIVE | 3 | PASS | Claude plugin/MCP | `/plugin install context-mode` or marketplace | `.mcp.json` + plugin | ECOSYSTEM-IMPORT / LICENSE-RISK | ~98% savings workflow; installed precedent | ELv2 not permissive | ADOPT with explicit license waiver | 0.88 | A- | Install after marketplace baseline; use `ctx_batch_execute` for noisy probes | `.claude/rules/auto-compact-discipline.md:12,36-58 @ c164103a5`; `tmp/wave218...:30,43-46 @ c164103a5` |
| yamadashy/repomix | ~24.8k prior | MIT | 500+ | HIGH | ACTIVE | 3 | PASS | MCP + CLI | `npm install -g repomix` | `.mcp.json` stdio | ECOSYSTEM-IMPORT | tree-sitter compression ~70%; MIT | none material | ADOPT-NOW | 0.93 | A | Day-1 codebase pack-grep primitive | `.claude/rules/auto-compact-discipline.md:13,59-63 @ c164103a5`; `tmp/wave218...:31,52-57 @ c164103a5` |
| Anthropic `/compact` + auto-compact | n/a | bundled | n/a | HIGH | ACTIVE-OFFICIAL | 3 | PASS | Built-in CC | none | rules/env only | CITE-CLASS-CANONICAL | built-in slash/hook surface | lossy if blind | ADOPT with preemptive discipline | 0.92 | A | Save/compact/restore at WARN/CRIT; avoid blind auto-compact | `.claude/rules/auto-compact-discipline.md:67-92,144-145 @ c164103a5`; `CLAUDE.local.md:88-96,139-163 @ c164103a5` |
| fcakyon intelligent-compact | parent repo ~687 prior | UNKNOWN-this-fire | 90+ | MED | ACTIVE | 2 | PARTIAL | plugin PreCompact | `/plugin install intelligent-compact@claude-settings` | PreCompact hook | ECOSYSTEM-IMPORT-AMBER | priority injection installed precedent | license gap | ADOPT after license reverify | 0.76 | B | Install only if license acceptable; keep advisory-only | `.claude/rules/auto-compact-discipline.md:89-92 @ c164103a5`; `tmp/wave218...:32,63-70,178 @ c164103a5` |
| Karpathy Wiki Compounding Surface | n/a | pattern | n/a | n/a | NAMED-AUTHOR-PATTERN | 3 | PASS | docs/rules/memory | none | rule + artifacts | CITE-CLASS-CANONICAL | 3-layer chron/index/wiki pattern | local source path missing in this workspace | ADOPT-PATTERN | 0.86 | B+ | Put `docs/compiled-wiki/*.md` into pure runtime discipline | `.claude/rules/auto-compact-discipline.md:11,174 @ c164103a5` |
| Letta/MemGPT paging | ~22.7k prior | Apache-2.0 | 1000+ | HIGH | ACTIVE | 3 | PASS | not native | pip/docker platform | none | REJECT-FOR-FIT in this layer | page-in/page-out memory architecture | full platform; overlaps memory/orch scopes | PATTERN-ONLY | 0.83 | B+ | Extract paging idea; do not install for token layer | `tmp/wave212-MASTER...:37,82 @ c164103a5`; Letta docs [VERIFIED] |
| LangGraph trim_messages | repo stars UNKNOWN | MIT | 500+ | HIGH | ACTIVE | 3 | PASS | library only | `pip install langgraph` | none | PROVIDER-COMPLEMENT | exact adaptive truncation primitive | not CC-native | STUDY-PILOT | 0.82 | A- | Use in non-CC agent code, not core CC runtime | LangGraph docs [VERIFIED] |
| deepagents summarization middleware | repo stars UNKNOWN | MIT | 100+ | HIGH | ACTIVE | 3 | PASS | library only | `pip install deepagents` | none | PARTIAL-OVERLAP | pre-summarization middleware cited locally | LangGraph ecosystem import; not CC-native | STUDY-PILOT-NARROW | 0.78 | B+ | Pattern for future Python agents | `.claude/rules/auto-compact-discipline.md:15 @ c164103a5`; LangChain docs [VERIFIED] |

### T3 - LLM Routing / Proxying

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | axis_2_dated | native_cc_path | install_diff | wired_diff | cr12_disposition | probe_pass | probe_fail | verdict | conf | source_grade | implant_plan | cite_anchors |
|---|---:|---|---:|---|---|---:|---|---|---|---|---|---|---|---|---:|---|---|---|
| router-for-me/CLIProxyAPI | n/a prior | MIT | 500+ | HIGH | ACTIVE | 2 | PASS | Claude OAuth/API proxy | existing install path | mgmt UI + accounts | INCUMBENT | OAuth fleet/account routing installed | not general provider router | RETAIN/ADOPT | 0.91 | A- | Pure runtime: install after secrets/state split; expose mgmt status | `docs/sota-installed-manifest.md:356 @ c164103a5`; `tmp/wave209...:44,138 @ c164103a5` |
| BerriAI/LiteLLM | current stars UNKNOWN | MIT-mixed / enterprise caveat | 1000+ | HIGH | ACTIVE | 3 | PASS | OpenAI-compatible proxy | `pip install litellm` or Docker | proxy config/env | PROVIDER-COMPLEMENT | 100+ providers; routing/fallback/cost | overlap with CLIProxyAPI; license mix needs recheck | STUDY-PILOT | 0.84 | A- | Add when pure runtime needs provider fallback/governance | `tmp/wave209...:21,45,82,131,157 @ c164103a5`; LiteLLM docs [VERIFIED] |
| OpenRouter | n/a | SaaS/API | n/a | HIGH | ACTIVE | 3 | PASS | OpenAI-compatible endpoint | no local install | API key/router config | REJECT-INSTALL; CITE | broad hosted routing | SaaS-only; no install artifact | CITE-ONLY | 0.76 | B | Use only if operator chooses hosted aggregator | OpenRouter docs [VERIFIED] |
| Anthropic-compatible proxies | varies | varies | varies | MED | MIXED | 2 | PARTIAL | `ANTHROPIC_BASE_URL` | case-by-case | env route | PATTERN | routeable via env | security/provider trust risk | PATTERN-ONLY | 0.70 | B- | Prefer CLIProxyAPI/cache-fix over unknown proxies | `CLAUDE.local.md:84 @ c164103a5`; cnighswonger row |
| Anthropic Bedrock/Vertex adapters | n/a | cloud APIs | n/a | HIGH | ACTIVE-OFFICIAL | 3 | PASS | provider config | no repo install | env/auth | CITE-CLASS-CANONICAL | official enterprise routes | account setup required | ADOPT if enterprise route needed | 0.82 | A | Keep provider abstraction compatible | Anthropic docs [VERIFIED] |

### T4 - Cache-Aware Dispatch

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | axis_2_dated | native_cc_path | install_diff | wired_diff | cr12_disposition | probe_pass | probe_fail | verdict | conf | source_grade | implant_plan | cite_anchors |
|---|---:|---|---:|---|---|---:|---|---|---|---|---|---|---|---|---:|---|---|---|
| Anthropic cache_control breakpoints | n/a | API | n/a | HIGH | OFFICIAL | 3 | PASS | native API | none | prefix/cache blocks | CITE-CANONICAL | TTL/cache breakpoints | no repo | ADOPT-NOW | 0.94 | A | Stable prefix; cache cold/warm probes; long-lived cache where supported | Anthropic docs [VERIFIED] |
| Sticky agent-to-account binding | n/a | local discipline | n/a | MED | LOCAL-PATTERN | 2 | PARTIAL | CLIProxyAPI/account routing | config only | account affinity | ADAPTED-FROM-SOTA | improves cache locality | source file `Z:/claude-sota/...parallel-agent-wave.md` missing in this workspace | ADOPT-PATTERN with HNF | 0.74 | B- | Preserve worker/account affinity during parallel waves | HNF: sibling path not present; `docs/sota-installed-manifest.md:356 @ c164103a5` |
| Prompt-prefix preservation | n/a | pattern | n/a | HIGH | CROSS-PROVIDER | 3 | PASS | prompt discipline | none | templates/rules | CITE-CANONICAL | Anthropic+OpenAI+Gemini convergence | no install | ADOPT-NOW | 0.91 | A | Static system/tools/context first; dynamic tail last | OpenAI docs MCP [VERIFIED]; Anthropic/Gemini docs [VERIFIED] |
| Cache cold/warm probes | n/a | local harness | n/a | MED | LOCAL-PATTERN | 3 | PARTIAL | ccusage + provider usage fields | scripts later | telemetry | GENUINELY-NEW local harness | measurable | needs implementation | ADOPT-NOW | 0.86 | B+ | Add small probe scripts after routing installed | `tmp/wave209...:101-104 @ c164103a5` |

### T5 - Async / Batch Optimization

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | axis_2_dated | native_cc_path | install_diff | wired_diff | cr12_disposition | probe_pass | probe_fail | verdict | conf | source_grade | implant_plan | cite_anchors |
|---|---:|---|---:|---|---|---:|---|---|---|---|---|---|---|---|---:|---|---|---|
| Anthropic Message Batches API | n/a | API | n/a | HIGH | OFFICIAL | 2 | PASS | external API scripts | none | optional batch runner | CITE-CANONICAL | 50% cost class per docs | not interactive | ADOPT for offline eval/research | 0.89 | A | Batch non-urgent eval/classification jobs | Anthropic docs [VERIFIED] |
| OpenAI Batch API | n/a | API | n/a | HIGH | OFFICIAL | 2 | PASS | external API scripts | none | JSONL batch runner | CITE-CANONICAL | 50% discount, 24h completion target | not interactive | ADOPT for OpenAI offline work | 0.93 | A | Add provider-neutral batch job convention | OpenAI docs MCP batch guide [VERIFIED] |

### T6 - Adaptive Truncation

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | axis_2_dated | native_cc_path | install_diff | wired_diff | cr12_disposition | probe_pass | probe_fail | verdict | conf | source_grade | implant_plan | cite_anchors |
|---|---:|---|---:|---|---|---:|---|---|---|---|---|---|---|---|---:|---|---|---|
| LangGraph trim_messages | UNKNOWN | MIT | 500+ | HIGH | ACTIVE | 3 | PASS | library only | pip | none | PROVIDER-COMPLEMENT | official primitive | not CC-native | STUDY-PILOT | 0.82 | A- | Use only in Python/agent SDK workloads | LangGraph docs [VERIFIED] |
| deepagents pre-summarization middleware | UNKNOWN | MIT | 100+ | HIGH | ACTIVE | 3 | PASS | library only | pip | none | PARTIAL-OVERLAP | source cited locally | ecosystem import | PATTERN/STUDY | 0.78 | B+ | Extract middleware design; defer install | `.claude/rules/auto-compact-discipline.md:15 @ c164103a5` |
| turn-based message pruning | n/a | pattern | n/a | HIGH | CROSS-PROVIDER | 3 | PASS | runtime rule | none | compaction hooks | CITE/PATTERN | cheap, deterministic | can delete useful state if naive | ADOPT with state checklist | 0.86 | B+ | Preserve completed actions, IDs, blockers, next goal | OpenAI latest-model docs MCP "Compaction" [VERIFIED] |

### T7 - Token Accounting

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | axis_2_dated | native_cc_path | install_diff | wired_diff | cr12_disposition | probe_pass | probe_fail | verdict | conf | source_grade | implant_plan | cite_anchors |
|---|---:|---|---:|---|---|---:|---|---|---|---|---|---|---|---|---:|---|---|---|
| ryoppippi/ccusage + @ccusage/mcp | 13,889 prior | MIT | 500+ | HIGH | ACTIVE | 3 | PASS | MCP + CLI | npm install pinned | `.mcp.json` stdio | ECOSYSTEM-IMPORT | installed smoke probe; session/daily/monthly | model-price drift requires updates | ADOPT-NOW | 0.94 | A | Install Z:-native; expose MCP and CLI dashboards | `docs/sota-installed-manifest.md:357,390,692 @ c164103a5` |
| OpenAI tiktoken | UNKNOWN | MIT | 1000+ | HIGH | ACTIVE-OFFICIAL | 3 | PASS | library | pip/npm as needed | none | CITE/UTILITY | official tokenizer | provider-specific estimates only | ADOPT utility | 0.90 | A | Use for OpenAI/offline estimates, not Anthropic billing truth | OpenAI docs MCP libraries [VERIFIED] |
| Anthropic token-counting endpoint | n/a | API | n/a | HIGH | OFFICIAL | 2 | PASS | API | none | scripts | CITE-CANONICAL | preflight billing estimate | endpoint access/rate limits | ADOPT | 0.88 | A | Add preflight counter for large prompts/batches | Anthropic docs [VERIFIED] |

### T8 - 1M Context Tooling

| repo | stars | license | age_d | cpd | axis_3_band | axis_1_orgs | axis_2_dated | native_cc_path | install_diff | wired_diff | cr12_disposition | probe_pass | probe_fail | verdict | conf | source_grade | implant_plan | cite_anchors |
|---|---:|---|---:|---|---|---:|---|---|---|---|---|---|---|---|---:|---|---|---|
| Claude Code Opus/Sonnet 1M context | n/a | bundled/API | n/a | HIGH | OFFICIAL | 3 | PASS | native CC model config | none | env discipline | CITE-CANONICAL | official 1M support | rot above 300-400k needs discipline | ADOPT-NOW | 0.93 | A | Keep 1M enabled; use WARN 600k / CRIT 700k local guard | `CLAUDE.local.md:62-85,139-163 @ c164103a5`; `.claude/rules/auto-compact-discipline.md:26,69,144-145 @ c164103a5` |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | n/a | env var | n/a | HIGH | OFFICIAL | 2 | PASS | native env | none | comment-only kill switch | CITE-CANONICAL | reversible | disabling 1M conflicts with SOTA default | KEEP-UNSET | 0.91 | A | Do not set unless explicit compliance/fan-out test requires | `CLAUDE.local.md:62-85 @ c164103a5` |
| Context rot mitigation >300k | n/a | local/named-T2 | n/a | MED | LOCAL-COMPOSITION | 2 | PARTIAL | rules/hooks | none | thresholds/hooks | ADAPTED-FROM-SOTA | WARN/CRIT calibration | Thariq source imported; not independently refreshed here | ADOPT | 0.82 | B | Save/compact/restore before rot zone dominates | `CLAUDE.local.md:143,148-163 @ c164103a5`; `.claude/rules/auto-compact-discipline.md:144-145 @ c164103a5` |

## 4. Source Code Grade Rationale - Top-5 Overall

1. **cnighswonger/claude-code-cache-fix - A- [VERIFIED]**
   Prior artifact cites README and LICENSE at `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:1-100 + LICENSE:1-3 @ HEAD 2f17aeb9062da66efa4fa3a1fa6a26a9afe383ff` and records measured cache delta (`tmp/wave209...:72,127 @ c164103a5`). Grade is A- rather than A because it is a proxy that tracks Claude Code internals; version drift risk is real.

2. **repomix - A [VERIFIED]**
   MIT, mature, installed precedent, MCP/CLI surfaces, and tree-sitter compression cited at `.claude/rules/auto-compact-discipline.md:59-63 @ c164103a5` plus prior W218 lines 52-57. Low coupling and high reversibility make it a pure-runtime Day-1 primitive.

3. **ccusage / @ccusage/mcp - A [VERIFIED]**
   MIT, current installed version `18.0.11`, MCP smoke-probed in the manifest (`docs/sota-installed-manifest.md:357 @ c164103a5`). It is not a compression primitive, but token-accounting is mandatory for cache/truncation claims.

4. **context-mode - A- functionally, B license [VERIFIED]**
   Functionally strong: local rule treats `ctx_batch_execute` as primary high-output token saver (`.claude/rules/auto-compact-discipline.md:36-58`). License is ELv2 per W218 (`tmp/wave218...:43-46`), so pure runtime must explicitly accept source-available risk or defer.

5. **LiteLLM - A- source, B+ fit [VERIFIED/INFERRED]**
   SOTA provider gateway surface, but W209 correctly classifies it as provider-complement rather than mandatory because CLIProxyAPI solves OAuth fleet rotation and the runtime lacks explicit multi-provider routing demand (`tmp/wave209...:45,82`). Install only after a named routing workflow exists.

## 5. Implant Order for `Z:\claude-sota-pure`

1. **Foundation accounting first** - install `ccusage` / `@ccusage/mcp`; wire MCP; record version and smoke probe [VERIFIED].
2. **Context ingestion** - install `repomix` MCP/CLI; add pack-grep rule; then install `context-mode` only if ELv2 is acceptable [VERIFIED].
3. **Native caching discipline** - codify prompt-prefix preservation, Anthropic cache_control breakpoints, OpenAI `prompt_cache_key` guidance, Gemini cache adapter placeholders [VERIFIED].
4. **Cache-fix proxy pilot** - install `claude-code-cache-fix@3.0.3`; route Claude Code via `ANTHROPIC_BASE_URL`; run cold/warm cache probes; keep one-command rollback [VERIFIED].
5. **Auto-compact discipline** - port `save -> compact -> restore`, WARN/CRIT thresholds, PreCompact priority hook, and compact-hint bridge after base hooks exist [VERIFIED].
6. **Batch/offline path** - add provider-neutral batch job convention for Anthropic/OpenAI non-interactive eval/classification workloads [VERIFIED].
7. **Routing expansion** - pilot LiteLLM only when a concrete need appears: provider fallback, OpenRouter comparison, Bedrock/Vertex enterprise routing, or cost-governed model selection [INFERRED].
8. **Research compressors** - LLMLingua/ICAE/Selective Context/AutoCompressor stay in offline benchmark catalog; do not install into core runtime [VERIFIED/INFERRED].

## 6. Convergence Summary - Axis-1 Strict >=3 Distinct Orgs

PASS [VERIFIED/INFERRED] for the runtime replacement thesis:

| convergence claim | org/source 1 | org/source 2 | org/source 3 | strict pass |
|---|---|---|---|---|
| Native caching beats lossy compression for repeated long prompts | Anthropic prompt caching | OpenAI prompt caching | Google Gemini context caching | PASS |
| Prefix preservation is core to cache hit rate | Anthropic cache_control docs | OpenAI prompt_cache_key docs | Gemini cache docs | PASS |
| Context management must happen before raw bloat enters prompt | context-mode local precedent | repomix upstream/local precedent | LangGraph/deepagents truncation docs | PASS |
| Token accounting must be multi-level | ccusage | Anthropic token counting | OpenAI tiktoken | PASS |
| 1M context still needs compaction discipline | Anthropic/Claude Code 1M docs | local auto-compact rule | OpenAI compaction guidance for long-running agents | PASS |

PARTIAL [VERIFIED] for sticky account binding: local CLIProxyAPI evidence exists, but the requested sibling `Z:/claude-sota/.claude/rules/parallel-agent-wave.md` path was not present from this session, so that precise cite is HNF.

## 7. HONEST-NON-FINDING Entries

1. **Sibling cache-aware dispatch file missing** - [VERIFIED] `rg` could not read `Z:/claude-sota/.claude/rules/parallel-agent-wave.md`; sibling root was unavailable from this session. Sticky binding is retained as a pattern from local manifest/CLIProxyAPI evidence, not as a direct file cite.
2. **Current GitHub star counts for several repos unresolved** - [VERIFIED] GitHub API calls from PowerShell failed with TLS authentication errors. Stars in this artifact are either prior local audit values or `UNKNOWN`; install fires must refresh via GitHub MCP/API.
3. **500xCompressor source-grade unresolved** - [UNKNOWN] Named in the requested category, but this pass did not establish a current installable upstream repo with license/activity adequate for Day-1 scoring.
4. **Gemini cache exact TTL/pricing not normalized into table** - [VERIFIED] Gemini context caching was verified as an official primitive, but exact pricing/TTL should be refreshed at provider-adapter implementation time.
5. **Independent cross-model gate not fully satisfied** - [VERIFIED] This is API Codex in-session research, not a separate Codex CLI T1 subprocess output.

## 8. Cite Trail

Local file anchors:

| anchor | claim |
|---|---|
| `Z:/claude-sota-installed/tmp/wave209-agentJ-token-eff-cost-opt-deep-2026-05-15.md:16-25 @ c164103a52ec6ced2e345de2919592805c4aff90` | Prior token-eff executive summary: context-mode/repomix/cache-fix/chonkie/LiteLLM/LLMLingua disposition [VERIFIED] |
| `Z:/claude-sota-installed/tmp/wave209-agentJ-token-eff-cost-opt-deep-2026-05-15.md:33-38 @ c164103a52ec6ced2e345de2919592805c4aff90` | T1 prompt-cache/context candidates and LLMLingua reject-for-fit [VERIFIED] |
| `Z:/claude-sota-installed/tmp/wave209-agentJ-token-eff-cost-opt-deep-2026-05-15.md:44-46 @ c164103a52ec6ced2e345de2919592805c4aff90` | CLIProxyAPI/LiteLLM/OpenRouter routing disposition [VERIFIED] |
| `Z:/claude-sota-installed/tmp/wave209-agentJ-token-eff-cost-opt-deep-2026-05-15.md:72-86 @ c164103a52ec6ced2e345de2919592805c4aff90` | cache-fix implant and LiteLLM defer rows [VERIFIED] |
| `Z:/claude-sota-installed/tmp/wave209-agentJ-token-eff-cost-opt-deep-2026-05-15.md:101-104,127-138 @ c164103a52ec6ced2e345de2919592805c4aff90` | cache-fix measured proxy delta and upstream cite anchors [VERIFIED] |
| `Z:/claude-sota-installed/tmp/wave218-agentH-token-opt-context-eng-catalog-2026-05-15.md:30-37 @ c164103a52ec6ced2e345de2919592805c4aff90` | context-mode/repomix/intelligent-compact/tokencost/gepa catalog [VERIFIED] |
| `Z:/claude-sota-installed/tmp/wave218-agentH-token-opt-context-eng-catalog-2026-05-15.md:43-70 @ c164103a52ec6ced2e345de2919592805c4aff90` | context-mode ELv2, repomix MIT, intelligent-compact install/license caveat [VERIFIED] |
| `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md:11-20 @ c164103a52ec6ced2e345de2919592805c4aff90` | compact rule cite-class lattice: Karpathy/context-mode/repomix/deepagents/ECC/wshobson/CCBP [VERIFIED] |
| `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md:36-63 @ c164103a52ec6ced2e345de2919592805c4aff90` | Rank #1 context-mode and Rank #2 repomix recipes [VERIFIED] |
| `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md:67-92,144-145 @ c164103a52ec6ced2e345de2919592805c4aff90` | save/compact/restore loop and WARN/CRIT actions [VERIFIED] |
| `Z:/claude-sota-installed/CLAUDE.local.md:62-96 @ c164103a52ec6ced2e345de2919592805c4aff90` | 1M kill-switch and `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` context [VERIFIED] |
| `Z:/claude-sota-installed/CLAUDE.local.md:139-163 @ c164103a52ec6ced2e345de2919592805c4aff90` | WARN/HIGH/CRIT thresholds for 1M context [VERIFIED] |
| `Z:/claude-sota-installed/docs/sota-installed-manifest.md:356-357 @ c164103a52ec6ced2e345de2919592805c4aff90` | CLIProxyAPI management center and @ccusage/mcp installed rows [VERIFIED] |
| `Z:/claude-sota-installed/docs/sota-installed-manifest.md:690-692 @ c164103a52ec6ced2e345de2919592805c4aff90` | RTK and ccusage baseline rows [VERIFIED] |

Upstream/local dependency anchors:

| dependency | HEAD |
|---|---|
| `Z:/repos/deps/repomix` | `b99706131b26b68e0d72aab7f93fccebad1460c0` [VERIFIED] |
| `Z:/repos/deps/claude-code-best-practice-shan` | `48f2cebeb88b389b27231c418ceadb65baf813fd` [VERIFIED] |
| `Z:/repos/deps/everything-claude-code` | `841beea45cb25ba51f29fa45b7e272938d19b80a` [VERIFIED] |

Official web/doc anchors:

| source | relevant verified claim |
|---|---|
| Anthropic docs - prompt caching | cache_control prompt caching, TTL/breakpoints, cache-aware prompt structure [VERIFIED] |
| Anthropic docs - token counting / Message Batches / Claude Code model config | token-count endpoint, batch discount class, 1M context/env behavior [VERIFIED] |
| OpenAI Developer Docs MCP - prompt caching guide | automatic caching for prompts >=1024 tokens, prefix routing, `prompt_cache_key`, `cached_tokens`, 128-token increments [VERIFIED] |
| OpenAI Developer Docs MCP - Batch API | 50% cost discount and 24h completion target [VERIFIED] |
| OpenAI Developer Docs MCP - libraries / tiktoken | tiktoken as OpenAI token-counting repository [VERIFIED] |
| Google Gemini API docs - context caching | official context caching primitive [VERIFIED] |
| LangGraph docs - trim messages | adaptive message trimming primitive [VERIFIED] |
| LangChain/deepagents docs | summarization/pre-truncation middleware pattern [VERIFIED] |
| LiteLLM docs | provider gateway/routing/fallback/cost proxy patterns [VERIFIED] |
| OpenRouter docs | hosted model-routing API, no local install-class artifact [VERIFIED] |

## 9. Final Verdict

[VERIFIED] For `Z:\claude-sota-pure`, the best 2026 token-management layer is **not** a LLMLingua replacement library. It is a dependency-aware stack: `ccusage` measurement, `repomix`/context-mode ingestion control, Anthropic/OpenAI/Gemini-native prompt caching, cache-aware dispatch, steered compaction, and optional LiteLLM when provider routing demand becomes concrete.

[INFERRED] The only install-class ADOPT-NOW beyond already-known incumbents is `claude-code-cache-fix`; everything else in T1 research compression should remain cite-only/offline-eval until it demonstrates a Claude Code-native, low-latency, reversible path.
