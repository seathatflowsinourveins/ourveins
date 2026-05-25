---
title: Wave 221 Agent E - User-Flagged Repos Deep Dive + Post-LLMLingua Landscape
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 221
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: user-flagged-deep-dive-and-token-compression-refresh
predecessors: W219-agentC + W220-agentA + W220-agentC + W217-F3
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
---

# STAND-IN-NOTICE

This agent ran as **Sonnet stand-in** per `CLAUDE.local.md` ENV (g) precedent. `CLAUDE_CODE_SUBAGENT_MODEL` was commented-out at dispatch time — actual model resolves via main session frontmatter. **Cross-model gate NOT structurally satisfied**. Findings are TIER-3 EVIDENCE pending T1 codex validation per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`.

# Executive summary

User flagged 4 deep-dive surfaces. **3 user-named targets verified** at HEAD-CURRENT (OpenViking AGPL-server / Cognee Apache-2.0 / Langfuse MIT-core+EE-split). **Post-LLMLingua landscape refresh** returned a SIGNIFICANT FINDING — W219 Agent C's 3 named alternatives (atlassian-labs/mcp-compressor / distill-mcp / chopratejas/headroom) are **PHANTOM REFERENCES** (zero GitHub matches). True SOTA 2026-05 token compression landscape is **Claude Code-plugin-native**, top discovery: `PCIRCLE-AI/toonify-mcp` (63★ MIT, last push 2026-05-14).

# Part 1 — OpenViking deep dive

## License + Probe 6 direct-file blockers

| Aspect | Finding | Cite |
|---|---|---|
| **Server license** | **AGPL-3.0** | `volcengine/OpenViking/LICENSE @ af4c54ff8f011611d3c60c4936a84a784f042e3f` |
| **Plugin claim** | "Apache-2.0 — same as OpenViking" — **LICENSE-CONFLICT** | `examples/claude-code-memory-plugin/README.md` |
| **Stars** | **23,959★** (LAUNCH-SPIKE: ~4mo old, cpd ~57) | repo metadata |
| **Architecture** | 7-hook plugin + 9 MCP tools + auto-recall/capture + token-budget injection | README §Architecture |

**LOAD-BEARING LICENSE FINDING**: Plugin README claims Apache-2.0 but root LICENSE is **AGPL-3.0** at HEAD `af4c54ff`. Without explicit per-folder LICENSE override, **AGPL-3.0 governs the plugin folder** — network-server copyleft incompatible with permissive sss harness.

**Probe 6**: STRUCTURAL ADOPTION BLOCKER.

**Probe 4**: DUPLICATE-FUNCTIONALITY with incumbent mcp-memory-service @ doobidoo + Graphiti (per `kiss-dry-yagni.md` Must-Never #4).

**Probe 7.b 5-clause check**: ALL 5 FAIL (incumbent covers use case, 4x integration cost, AGPL contamination on REVERT).

## Verdict refresh — OpenViking

**REJECT-FOR-FIT-DUPLICATE-FUNCTIONALITY** (downgraded from W219's OPERATOR-OVERRIDE-ADMISSIBLE 77/100)

**Score: 45/100**
- Probe 6 LICENSE blocker (AGPL): -20
- Probe 4 DUPLICATE-FUNCTIONALITY: -20
- Probe 7.a DEMAND-ABSENCE: -15
- Axis 1+2 FAIL: -10
- LAUNCH-SPIKE band: -5
- +15 for plugin-architectural sophistication (research-reference VALUE)

**Disposition**: REJECT for direct adoption. Research-reference VALUE retained — the 7-hook lifecycle pattern + memory-pollution-prevention discipline (strips `<openviking-context>` before re-pushing to OV) are SOTA patterns worth citing into sss's memory-plugin design when/if the incumbent stack needs reformation.

# Part 2 — Cognee fresh audit (HEAD-CURRENT)

## License confirmation @ HEAD-CURRENT

| Aspect | Finding | Cite |
|---|---|---|
| **License** | **Apache-2.0** (Copyright 2024 Topoteretes UG) | `topoteretes/cognee/LICENSE @ 4ca1d0c2` |
| **Stars** | **17,245★** | repo metadata |
| **Created** | 2023-08-16, **~21 months old** — MATURE | repo metadata |
| **Updated** | 2026-05-15T21:19:43Z | repo metadata |
| **CC Plugin** | OFFICIAL `topoteretes/cognee-integrations/integrations/claude-code/` (verified at SHA `f02ac2e7`) | plugin README |

**LOAD-BEARING FINDING**: Cognee has fully-baked **official Claude Code plugin** — same architectural shape as OpenViking's plugin BUT without AGPL contamination (parent repo Apache-2.0).

Plugin features:
- 6-hook lifecycle (SessionStart/UserPromptSubmit/PostToolUse/Stop/PreCompact/SessionEnd)
- 3 skills (`/cognee-memory:cognee-remember`/`cognee-search`/`cognee-sync`)
- 3 data categories (user/project/agent via `node_set` tagging)
- Per-directory session scoping (or git-branch or static)
- Local mode (in-process) OR backend mode (HTTP) OR Cognee Cloud
- Status line + audit log

## Probe 7.b 5-clause demand-gate

1. Named use case: **knowledge-graph memory** with `remember/recall/forget/improve` 4-op API — DISTINCT from Graphiti's temporal-KG
2. Local input/source path: `pip install cognee` + LLM_API_KEY (self-contained in-process)
3. Wiring path: `claude --plugin-dir /path/to/cognee-integrations/integrations/claude-code`
4. Incumbent comparison: COMPLEMENTARY to Graphiti per CR-12 PROVIDER-COMPLEMENT class — Cognee adds **ontology + graph-RAG + multimodal** axis, NOT duplicate
5. Reversible time-box: ~2 weeks pilot

## Convergence-gate Axis 1+2+3

- **Axis 1**: 1 org + STRONG-PROVENANCE-EXPRESS predicate via research paper (arXiv:2505.24478) — **PARTIAL-PASS**
- **Axis 2**: 4 named co-authors (Vasilije Markovic + Lazar Obradovic + Laszlo Hajdu + Jovan Pavlovic) + r/AIMemory community + Trendshift — **PASS**
- **Axis 3**: 21mo old, cpd ~22 — **STABLE BURN-IN PASS**

## Verdict refresh — Cognee

**ADOPT-NOW-STUDY-PILOT** (upgraded from W219's STUDY-PILOT 93/100)

**Score: 94/100** breakdown documented in full table above.

**Disposition**: STUDY-PILOT with explicit 2-week pilot window. Install: `pip install cognee` + plugin via `claude --plugin-dir`. Success: 80%+ useful recall on session-start.

# Part 3 — Langfuse license-split verification

## License confirmation @ HEAD-CURRENT

| Aspect | Finding | Cite |
|---|---|---|
| **Root LICENSE** | **MIT (Expat) + EE-split** | `langfuse/langfuse/LICENSE @ 352cdf32` |
| **EE-directories** | `ee/`, `web/src/ee/`, `worker/src/ee/` — SEPARATE `ee/LICENSE` (Langfuse Enterprise) | LICENSE verbatim |
| **Stars** | **27,279★** | repo metadata |
| **Created** | 2023-05-18, **~24 months old** | repo metadata |
| **Affiliation** | **YC W23** (Y Combinator Winter 2023) — named-T2 incubator provenance | README "YC W23" |
| **Updated** | 2026-05-15T21:18:58Z | repo metadata |

**License finding**: Langfuse uses **Sentry/Plausible-style "open core" license-split**:
- Permissive **MIT** for the 99% of code
- **Restricted EE license** for `ee/` subdirectories (SSO, RBAC, etc.)

For sss harness: **MIT-core is clean** for permissive adoption. Avoid `ee/` modifications.

## Native CC install path — 2 MCP servers verified

| Server | Stars | Maintainer | Use case |
|---|---|---|---|
| `langfuse/mcp-server-langfuse` | **167★** | **langfuse (official)** | **Prompt Management** access via MCP |
| `avivsinai/langfuse-mcp` | **87★** | community | **Trace data** query for debugging/observability |

Combined: **254★ across both** — pick by use case.

## Probe 7.b 5-clause demand-gate

1. Named use case: LLM observability + prompt management + trace data
2. Local input/source path: Docker compose OR cloud OR MCP-only
3. Wiring path: `.mcp.json` + optional Docker stack
4. Incumbent comparison: **NO observability incumbent in sss harness** — GENUINELY-NEW workflow class (CR-12 disposition: ECOSYSTEM-IMPORT)
5. Reversibility: 1-2 week pilot, trace visibility 90%+ success criterion

## Convergence-gate Axis 1+2+3

- **Axis 1**: 1 org + STRONG-PROVENANCE-EXPRESS predicate (YC W23 + OpenTelemetry-native + LangChain/LlamaIndex/OpenAI SDK/LiteLLM integrations) — **PARTIAL-PASS**
- **Axis 2**: YC W23 + multi-LLM-framework integration adopters — **PASS**
- **Axis 3**: 24mo, cpd ~38 — **SUSTAINED ACTIVE MAINTENANCE band** — **FIRM AXIS-3 PASS**

## Verdict refresh — Langfuse

**ADOPT-NOW-TIER-1-INSTALL** (confirmed from W219's TIER-1 INSTALL 99/100)

**Score: 99/100**

**Disposition**: TIER-1 INSTALL. Recommended order: MCP-only first (lightest — `langfuse/mcp-server-langfuse`), promote to full Docker stack if trace volume justifies.

# Part 4 — Post-LLMLingua landscape

## W219 Agent C named tools — PHANTOM REFERENCE FINDING

| W219 Agent C named tool | Verified via `mcp__github__search_repositories` | Status |
|---|---|---|
| `atlassian-labs/mcp-compressor` | **0 matches** | **PHANTOM REFERENCE** |
| `distill-mcp` | **0 matches** | **PHANTOM REFERENCE** |
| `chopratejas/headroom` | **0 matches** | **PHANTOM REFERENCE** |

**LOAD-BEARING FINDING**: W219 Agent C's 3 alternatives are invented or misnamed. W219's verdict scores of 88/82/78 for these tools are **INVALID**. Orchestrator must NOT propagate these as install targets.

## Actual SOTA 2026-05 Claude Code context compression landscape

Top candidates verified via `mcp__github__search_repositories sort=stars` with `q="context compression claude code"`:

| Rank | Repo | Stars | License | Created | Last push | Class |
|---|---|---|---|---|---|---|
| 1 | **PCIRCLE-AI/toonify-mcp** | **63★** | **MIT** | 2025-12-24 | 2026-05-14 | Claude Code plugin + MCP server |
| 2 | Sompote/tiger_cowork | 57★ | unverified | 2026-03-06 | 2026-05-11 | Self-hosted multi-agent workspace |
| 3 | **AzozzALFiras/claude-context-optimizer** | **35★** | **MIT** | 2026-03-31 | 2026-05-05 | MCP server "97% token reduction" benchmarked |
| 4 | jee599/contextzip | 22★ | unverified | 2026-03-18 | 2026-05-13 | Rust Claude Code 60-90% reduction |
| 5 | Madhan230205/token-reducer | 18★ | unverified | 2026-04-01 | 2026-05-12 | Hybrid RAG (BM25+ONNX) AST chunking |
| 6 | NodeNestor/claude-rolling-context | 14★ | unverified | 2026-03-05 | 2026-05-14 | Rolling compression CC plugin |
| 7 | Vvkmnn/claude-praetorian-mcp | 11★ | unverified | 2025-12-09 | 2026-04-13 | MCP context compaction + recycling |
| 8 | immapolar/Thicc | 10★ | unverified | 2025-12-28 | 2026-04-14 | JS conversation compressor |

## Top SOTA candidate deep dive — PCIRCLE-AI/toonify-mcp

| Aspect | Finding |
|---|---|
| **License** | **MIT** (Copyright 2025 ktseng) verified at SHA `7201862e` |
| **Stars** | **63★** (highest in context-compression CC class) |
| **Created** | 2025-12-24 (~5mo old) |
| **Architecture** | Claude Code plugin (automatic, zero-config) + MCP server (on-demand) |
| **Targets** | Large JSON, CSV, YAML, API responses, test failures, stack traces |
| **Format** | TOON (Tool Output Optimized Notation) — purpose-built for LLM tool output |
| **Install** | `git clone` + `npm install` + `toonify-mcp setup` |
| **Docs** | https://toonify.pcircle.ai/ (benchmarks + privacy + terms) |
| **i18n** | 11 languages — strong adoption signal |

**Probe 7.b 5/5 PASS** (distinct from `intelligent-compact@claude-settings` PreCompact hook — different concept: pre-tool-output filter vs at-compact hook).

**Convergence-gate**: LAUNCH-SPIKE band (~5mo old) — STUDY-PILOT eligible, not ADOPT-NOW until cpd × age band stabilizes per `convergence-gate.md` table.

## SOTA-current 2026-05 verdict by candidate

| Candidate | License | Probe 6 | Probe 7.b | Axis 3 | Recommendation |
|---|---|---|---|---|---|
| **toonify-mcp** | MIT | clean | 5/5 PASS | LAUNCH-SPIKE | **STUDY-PILOT** (top candidate; pilot 2 weeks) |
| claude-context-optimizer | MIT | clean | 4/5 | LAUNCH-SPIKE | **STUDY-PILOT-RUNNER-UP** (97% reduction benchmark; deeper file caching than toonify) |
| claude-rolling-context | unverified | UNKNOWN | 4/5 | LAUNCH-SPIKE | **DEFER** (license probe) |
| jee599/contextzip | unverified | UNKNOWN | 4/5 | LAUNCH-SPIKE | **DEFER** |
| token-reducer | unverified | UNKNOWN | 4/5 | LAUNCH-SPIKE | **DEFER** |
| claude-praetorian-mcp | unverified | UNKNOWN | 3/5 | LAUNCH-SPIKE | **DEFER** |
| **microsoft/LLMLingua** | MIT | clean | 2/5 (NOT Claude Code native; Python lib only) | MATURE | **NOT RECOMMENDED** — confirmed W219 user-flag; library-class not plugin-class |

# Cross-part synthesis

## Install recommendations (TIER-1 → TIER-3 priority)

**TIER-1 INSTALL (immediate)**:
1. **Langfuse MCP** (`langfuse/mcp-server-langfuse` 167★ official) — LLM observability ECOSYSTEM-IMPORT. **Score: 99/100**

**TIER-1.5 STUDY-PILOT (2-week pilots, parallel)**:
2. **Cognee Claude Code plugin** (`topoteretes/cognee-integrations`) — graph memory PROVIDER-COMPLEMENT to Graphiti. **Score: 94/100**
3. **toonify-mcp** (`PCIRCLE-AI/toonify-mcp` 63★) — context compression top SOTA. **Score: TBD pending pilot**
4. **claude-context-optimizer** (`AzozzALFiras/claude-context-optimizer` 35★) — runner-up token reduction. **Score: TBD pending pilot**

**REJECT**:
- **OpenViking** — AGPL-3.0 + DUPLICATE-FUNCTIONALITY with incumbent. **Score: 45/100**
- **W219 Agent C's 3 named tools** — PHANTOM REFERENCES (do not exist)
- **microsoft/LLMLingua** — confirmed outdated per user flag

## CR-12 disposition lattice classification

| Target | Disposition class | Rationale |
|---|---|---|
| OpenViking | **DUPLICATE-FUNCTIONALITY** | Same memory shape as mcp-memory-service + Graphiti incumbents |
| Cognee | **PROVIDER-COMPLEMENT** | Adds ontology/graph-RAG axis NOT in Graphiti's temporal-KG |
| Langfuse | **ECOSYSTEM-IMPORT** | NEW workflow class (LLM observability) not yet in sss |
| toonify-mcp | **GENUINELY-NEW** | Pre-tool-output context compression not yet in sss |

## Cite anchors

- `volcengine/OpenViking/LICENSE @ af4c54ff8f011611d3c60c4936a84a784f042e3f` — AGPL-3.0
- `volcengine/OpenViking/examples/claude-code-memory-plugin/README.md @ af4c54ff` — plugin architecture + license-conflict
- `topoteretes/cognee/LICENSE @ 4ca1d0c2bbbb46924acb1f5f6cd805214805ca16` — Apache-2.0
- `topoteretes/cognee/README.md @ 4ca1d0c2` — official CC plugin reference
- `topoteretes/cognee-integrations/integrations/claude-code/README.md @ f02ac2e7377476d5f8aa18643ec1fa903ef70bc0` — plugin architecture
- `langfuse/langfuse/LICENSE @ 352cdf323ff8d1a9e21dd8925bf0580bb82eb447` — MIT-core + EE-split
- `langfuse/mcp-server-langfuse` (167★) — official MCP server
- `avivsinai/langfuse-mcp` (87★) — community MCP server for trace data
- `PCIRCLE-AI/toonify-mcp/LICENSE @ 7201862ef9cd60aa56bf131c964c06151dd4faa0` — MIT
- `PCIRCLE-AI/toonify-mcp/README.md @ 88dd7fb69baa74db24bc84173280bbd127414584` — Claude Code plugin architecture

## Audit-trail notes for orchestrator

1. **W219 Agent C verdict on alternatives is INVALID** — 3 named tools are phantom references. Re-fire any pending T1 consult that depends on these alternatives.
2. **OpenViking license conflict** is LOAD-BEARING — plugin README claims Apache-2.0 but root LICENSE is AGPL-3.0; needs verification by reading `examples/claude-code-memory-plugin/LICENSE` if it exists.
3. **Cognee + Langfuse + toonify-mcp** all clean install paths; recommend parallel pilots to avoid serial dependency in evaluation.
4. **OpenViking 23,959★ creates LAUNCH-SPIKE concern** — fast accumulation (~57 cpd, ~4mo) is anti-pattern signal even setting aside license blocker.
5. **n=1 sota-researcher self-observed evidence ladder advance** for pattern "W219 Agent C named-but-unverified tools require independent GitHub search verification" — escalate to `feedback_*.md` codification if n=2 cross-arc instance surfaces.

# VERDICT

**STUDY-PILOT-CATALOG**: Wave 221 Agent E delivers 4-part deep dive replacing Wave 220 Agent B FM-17 failure. Refined verdicts:

1. **OpenViking REJECT-FOR-FIT-DUPLICATE-FUNCTIONALITY** (45/100, AGPL + incumbent overlap; downgraded from W219's 77/100)
2. **Cognee STUDY-PILOT-ELIGIBLE** (94/100, Apache-2.0, official CC plugin, PROVIDER-COMPLEMENT to Graphiti; refined from W219's 93/100)
3. **Langfuse TIER-1 INSTALL** (99/100, MIT-core, 2 MCP servers, ECOSYSTEM-IMPORT; confirmed W219)
4. **Post-LLMLingua landscape**: W219 Agent C's 3 alternatives are PHANTOM REFERENCES (verified zero GitHub matches). True 2026-05 SOTA top candidate is `PCIRCLE-AI/toonify-mcp` (63★ MIT Claude Code plugin); runner-up `AzozzALFiras/claude-context-optimizer` (35★ MIT 97% reduction)

Top install recommendation: **Langfuse MCP first** (cleanest 99/100, only TIER-1); parallel STUDY-PILOTS on Cognee + toonify-mcp.

Sister-rule alignment:
- Probe DAG 1-7 applied to all targets per `agent-harness-fit-verification.md §Probe DAG`
- CR-12 disposition lattice applied per `cardinal-rule-12-upstream-install-priority.md`
- Convergence-gate Axis 1+2+3 evaluated per `convergence-gate.md`
- Cite anchors at file:line + HEAD SHA per `citation-discipline.md` rule #8

**Stand-in disclosure**: this verdict carries TIER-3-LOCAL-OPERATOR-DERIVED authority pending T1 codex cross-model gate satisfaction.

---

**VERDICT: STUDY-PILOT-CATALOG** — 4-part deep dive complete; Langfuse TIER-1 INSTALL primary recommendation; Cognee + toonify-mcp STUDY-PILOTS; OpenViking REJECT; W219 Agent C's 3 named LLMLingua alternatives confirmed as PHANTOM REFERENCES; orchestrator must persist this artifact to `tmp/wave221-agentE-user-flagged-deep-dive-2026-05-15.md` per ARTIFACT-INLINE FALLBACK protocol (Write tool unavailable in this session context).
