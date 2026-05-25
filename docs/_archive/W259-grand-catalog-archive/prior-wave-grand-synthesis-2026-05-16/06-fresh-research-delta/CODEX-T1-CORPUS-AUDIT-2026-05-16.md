# Codex T1 GPT-5.5 Corpus-Breadth Audit of W258-ULTIMATE — 2026-05-16

> Sourced from codex:codex-rescue fork (agentId a539813488fd59755, 2026-05-16T13:10Z+)
> 9th codex T1 audit overall (after the 8 prior W258 audits). Adversarial corpus-breadth test.

## §A — Audit Findings

W258-ULTIMATE is a **strong curated W258-only synthesis, not a corpus-wide "ultimate" synthesis**. Its stated scope is r1-r49, 17 axes, 8 codex audits, and v1-v13 consolidation. Observed content is concentrated on Anthropic/Claude Code runtime strategy, cost optimization, MCP substrate, LiteLLM/DeepSeek routing, Promptfoo, operator telemetry, and W258 internal evolution.

It does **not** appear to subsume major W220-W253 close-synthesis lines. W258 cites a "W252-W257 mine" through r38 and mentions some overlapping candidates, but sampled W236/W237/W241/W250/W253 contain concrete install catalogs, scoring matrices, license gates, and candidate promotions absent or materially down-ranked in W258.

Signs of cherry-picking: W258 keeps the framing "frontier is substrate extension + cost optimization" while excluding several prior-wave "pure runtime install catalog" conclusions, especially document ingestion, native plugin/skill packs, token-compression/autocompact replacements, and governance/security install candidates.

## §B — Convergence Gap List

**MAJOR gaps:**

- **W241**: `buildoak/wet` (primary LLMLingua replacement) + `yvgude/lean-ctx` (secondary), explicitly tied to Claude Code autocompact-thrashing. W258 discusses rtk/context compression but not these named replacements.
- **W236/W237 Phase 5**: `microsoft/acon`, `jia-gao/leanctx`, `ace-agent/ace` for code/token/context intelligence, with version pins and FM-09 validation. W258 does not carry this Phase 5 roster.
- **W236/W237 governance/security**: `microsoft/presidio`, `protectai/llm-guard`, `wshobson/shell-scripting`, `wshobson/plugin-eval`, `wshobson/block-no-verify`, Tom Farley crypto-governance pilots. W258's L0.5 security does not subsume these install rows.
- **W250 Wave A**: `microsoft/markitdown`, Langfuse native MCP, Langfuse docs MCP, Promptfoo. W258 keeps Promptfoo but W258r21 explicitly says "SKIP Langfuse"; markitdown is absent.
- **W241 alternative stack**: `mem0`, `cognee`, `openllmetry`, `opik`, with Phoenix REJECT in that arc. W258 keeps Phoenix and treats mem0 as T2; **direct architectural divergence**.
- **W253 native CC surfaces**: `openai/codex-plugin-cc`, `jarrodwatts/claude-hud`, `wshobson/agents`, `alirezarezvani/claude-skills`, `anthropics/skills`, `addyosmani/agent-skills`, `anthropics/cwc-long-running-agents`. W258 covers codex CLI/plugins generically but misses `codex-plugin-cc` and `claude-hud`.

**MINOR gaps:**

- **W250 Wave C**: research queue for Marker, MinerU, browser-use, E2B, SWE-agent, LangGraph, smolagents, DSPy, Inngest, Opik. W258 includes some as watchlist/T3 but understates W250 explicit install-action sequencing.
- **W237 scoring correction** under STRONG-PROVENANCE-EXPRESS promotes `anthropics/claude-code-base-action`, `anthropics/claude-code-security-review`, `github/gh-aw` to ADOPT-NOW-eligible. W258 mentions Anthropic Q1/Q2 primitives but not this corrected conditional promotion logic.

## §C — Corpus Breadth %

- **Observed corpus scale**: docs/ + tmp/ has ~5,389 files; research/audit/synthesis-like matches ~3,480.
- **W258 own scope**: 49 W258 forks + 8 audits + 35 files copied into convergence folder.
- **Estimated breadth**: **W258 covers 10-20% of broader research corpus**, and 50-70% of W258-specific corpus.
- **Label**: **v0-CURATED**. Comprehensive inside its W258 thesis, narrow vs accumulated W220-W253 install-catalog corpus.

## §D — V-FINAL Corpus Recommendation

**P1 must-have:**
- Subsumed close syntheses: W236, W237, W241 orchestrator, W250-A7, W253-C-grand.
- Reconcile conflicting architectures: Phoenix vs Opik/openllmetry; incumbent memory/Graphiti vs mem0/cognee; rtk/context-mode vs buildoak/wet/yvgude/lean-ctx.
- Import prior-wave D1-D10 or equivalent scoring rows and retain license hard-gates.

**P2 high-value:**
- Fold in W220-W235 cumulative install catalog and W240-W242 bridge-mode/FM-17.e findings.
- Re-score native CC plugin/skill surfaces: `codex-plugin-cc`, `claude-hud`, `anthropics/skills`, `addyosmani/agent-skills`, `wshobson/agents`.
- Add **document-ingestion lane**: markitdown, docling, Marker, MinerU, PaddleOCR.

**P3 nice-to-have:**
- Periodic benchmark-only snapshots for Aider, Continue, Cline, Roo, SWE-agent, browser-use, E2B, LangGraph, smolagents.
- Build a single **deduped candidate registry** with dispositions: ADOPT-NOW, REFRESH-AUDIT, STUDY-PILOT, DEFER-LICENSE, REJECT.

## §E — Codex Self Blind Spots

- Sampled exactly 5 files + W258, not the full 5,389-file corpus. The W258 shell output was visually truncated in tool transcript; supplemented with targeted `rg` checks for candidate presence.
- Did NOT verify live GitHub licenses, stars, or current package versions.
- "Largest match" could not be proven by file-size commands due to sandbox/policy rejections.
- For ambiguous W241/W253 matches, used broader synthesis-looking file and noted content scope vs exact byte size.
