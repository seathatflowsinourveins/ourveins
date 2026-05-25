# Wave 97 Agent A — Token-Eff Repos Probe DAG Audit (chopratejas/headroom + mufeedvh/code2prompt + alexgreensh/token-optimizer)

STAND-IN-NOTICE: claude-opus-4-7[1m] stand-in (NOT gpt-5.5); cross-model gate not structurally satisfied for this dispatch. Orchestrator must re-fire codex T1 if shipping ADOPT-NOW per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate. Tooling caveat: ctx_fetch_and_index / curl / WebFetch all blocked by an unwired context-mode hook (FM-03 D1 transport disconnect class for context-mode); GitHub API direct fetch was unavailable. Audit relied on WebSearch (Perplexity-class snippets) + local Glob. Verdicts include conservative confidence accordingly.

## Executive summary table

| Repo | Axis-1 | Axis-2 | Axis-3 (cpd×age) | Probe 6 license | Probe 7 demand | Verdict | Confidence |
|---|---|---|---|---|---|---|---|
| chopratejas/headroom | PARTIAL (n=1 org, single-author) | PARTIAL (named-author Tejas Chopra; no T2 dated artifact) | FAIL — ~60-70d age (<90d), high cpd v0.5→v0.21 in weeks (FAST-CHURN-BAND) | Apache-2.0 PASS | 7.b duplicate-of-context-mode | REJECT-FOR-FIT | 0.82 |
| mufeedvh/code2prompt | PASS (Rust+Python ecosystem; ≥3 forks, MCP server variant) | PASS (Mufeed VH named author; v2.0.0 Sep 2024 release; 7K stars across 2y+) | PASS (MATURE >2y SUSTAINED-ACTIVE) | MIT PASS | 7.b: low — repo→prompt one-shot (occasional bulk pack); duplicate of repomix MCP + serena code-intel already wired | REJECT-FOR-FIT | 0.78 |
| alexgreensh/token-optimizer | PARTIAL (n=1 org, fast-paced solo) | PARTIAL (Alex Greenshpun named; v5.6.1; ~700 stars; no independent T2 dated artifacts) | BORDERLINE (cpd×age band [UNKNOWN] without commit count; high release cadence) | **PolyForm Noncommercial 1.0.0 FAIL** | n/a (license blocks) | **REJECT-FOR-PROVENANCE** | 0.95 |

## Per-repo deep-dive

### Repo 1: chopratejas/headroom
- TIER-1 cite: `https://github.com/chopratejas/headroom @ HEAD <SHA UNKNOWN — GitHub API blocked by hook>` [VERIFIED 2026-05-08 via WebSearch snippets + chopratejas.github.io/headroom]
- Repo metadata: ~1.7k stars; created ~March 2026 (~60-70d old per SourcePulse "2 months ago"); Apache-2.0; release cadence v0.5.2 → v0.21.4 within ~2 months (very high cpd; FAST-CHURN-BAND per `convergence-gate.md:103`)
- Description: "The Context Optimization Layer for LLM Applications" — runs as proxy OR Python/TS lib. AST-aware code compression + JSON SmartCrusher + ModernBERT text. Claims 70-95% reduction on boilerplate; GSM8K 0.870→0.870 accuracy preservation. PyPI `headroom-ai 0.6.1`.
- **Convergence axes**:
  - Axis-1: PARTIAL — single org (chopratejas solo); no convergent independent T1 implementation. Forks (`richardsonjf/chopratejas-headroom`, `bsmr/chopratejas---headroom`) are mirrors not independent orgs.
  - Axis-2: PARTIAL — Tejas Chopra is named-author T2 (his own repo); no independent named T2 practitioner with dated artifact endorsing this specific compression pattern. `gglucass/headroom-desktop` is a desktop wrapper (related, not endorsement). [UNKNOWN] whether named-T2 endorsements exist beyond the author — search returned only the project's own surfaces.
  - Axis-3: FAIL — age <90d burn-in floor per `convergence-gate.md:96`. STRONG-PROVENANCE-EXPRESS predicate not satisfied (single-individual maintainer, no Anthropic/OpenAI/Google org maintainership).
- **Probe DAG**:
  - P1 count-OVER: claimed 70-95% reduction + GSM8K 0.870→0.870 — `tests/test_evals/` reproducible per repo docs/benchmarks.md; cannot independently verify without clone (hook blocked). [INFERRED] the published benchmark exists.
  - P2 SDK-vs-CLI: PASS — proxy mode + Python/TS lib. eee uses CLIProxyAPI v6.10.9 already; could chain but adds 4th proxy layer.
  - P3 architectural-API: AMBIGUOUS — proxy claims to work with Anthropic/OpenAI; eee already routes through CLIProxyAPI + cnighswonger cache-fix. Adding headroom proxy = 4-tier proxy stack (Claude → CLIProxyAPI → cache-fix → headroom → Anthropic). Risk of cache-prefix invalidation contradicting cnighswonger's whole purpose.
  - P4 plugin-namespace: NO collision — no `headroom*` in `.claude/plugins/marketplaces/` (Glob 0 hits).
  - P5 mode-harness-shape: PARTIAL fail — proxy interposition modifies request payloads → breaks prompt-cache prefix (per `Z:/repos/deps/cnighswonger-claude-code-cache-fix/docs/extension-impact-guide.md` cache-locality invariant). cnighswonger v3.5.3 is purpose-built to PRESERVE cache; headroom modifies in-flight which DESTROYS cache. **DIRECT CONFLICT** with already-adopted Tier-1 architecture.
  - P6 LICENSE/registry: Apache-2.0 PASS; PyPI `headroom-ai 0.6.1` exists.
  - P7 demand-gate: 7.b candidate but **duplicates already-adopted context-mode (98% reduction claim per Wave 95 plugin install)**. Per kiss-dry-yagni Must-Never #4 duplicate-functionality.
- Integration path (if ADOPT): N/A
- **Adoption verdict: REJECT-FOR-FIT**
- Confidence: 0.82
- Rationale: Probe 5 architectural conflict with cnighswonger cache-fix (proxy-layer cache invalidation) + Probe 7 duplicate-of-context-mode + Axis-3 age floor FAIL (<90d, FAST-CHURN-BAND); CR-9 install-risk discipline counsels against. Re-audit at age ≥180d AND cnighswonger compatibility verified.

### Repo 2: mufeedvh/code2prompt
- TIER-1 cite: `https://github.com/mufeedvh/code2prompt @ HEAD <SHA UNKNOWN — hook blocked>` [VERIFIED 2026-05-08 via WebSearch + crates.io]
- Repo metadata: ~7k stars; v2.0.0 (Sep 2024 last commit); MIT License; Rust (crates.io); Python `code2prompt` package via PyPI also exists; MCP server variant available
- Description: CLI tool to convert codebase → single LLM prompt with source tree, prompt templating, token counting. One-shot pack-then-prompt tool.
- **Convergence axes**:
  - Axis-1: PASS — multiple ecosystems (Rust crates.io + Python + MCP server); third-party adoption (`ai-in-pm/code-2-prompt` fork; multiple downstream orgs).
  - Axis-2: PASS — Mufeed VH named author with sustained activity; 7K stars represents broad practitioner endorsement; but no specific dated T2 artifact citing this pattern from convergence-gate Axis-2 perspective. [INFERRED PASS] via star/fork/usage signals.
  - Axis-3: PASS — created ≥2y ago (v2.0.0 Sep 2024, v1.x earlier; first commits 2023-2024 era); MATURE SUSTAINED-ACTIVE per convergence-gate.md:103.
- **Probe DAG**:
  - P1 count-OVER: pack-tool primitive; verifiable via `cargo install code2prompt` + run.
  - P2 SDK-vs-CLI: PASS — pure CLI; eee can shell out.
  - P3 architectural-API: VENDOR-NEUTRAL — outputs prompt text, model-agnostic.
  - P4 plugin-namespace: **HIT** — `.claude/plugins/marketplaces/everything-claude-code/` has skill registry; need to grep for code2prompt-equivalent skills. Already-adopted **repomix MCP** + **serena MCP** + **zilliztech/claude-context** + **upstash/context7** all serve repo→context functions. STRUCTURAL DUPLICATE per kiss-dry-yagni Must-Never #4.
  - P5 mode-harness-shape: PASS — one-shot CLI tool; works with autonomous /loop.
  - P6 LICENSE/registry: MIT PASS; crates.io `code2prompt` v2.0.0; PyPI present.
  - P7 demand-gate: 7.a — **DEMAND-ABSENCE**. eee already has `repomix` MCP (cite `Z:/claude-sota/.claude/rules/research-protocol.md §Repomix Pack→Grep→Skill sub-rule`) for the same pack-and-grep workflow PLUS serena LSP for symbol-level retrieval PLUS zilliztech/claude-context for vector search. No remaining pack-prompt workflow that code2prompt fills uniquely.
- Integration path (if ADOPT): would be `cargo install code2prompt` + Bash wrapper, but skipped due to duplication.
- **Adoption verdict: REJECT-FOR-FIT**
- Confidence: 0.78
- Rationale: Probe 4+7 duplicate-functionality with already-adopted repomix MCP + serena + claude-context. Repo itself is high-quality SOTA (Axis-1+2+3 PASS; permissive MIT; mature) — but eee's existing memory/code-intel stack already covers the workflow. Reconsider only if repomix MCP is retired OR a benchmark proves code2prompt's specific token-count-during-pack feature unique.

### Repo 3: alexgreensh/token-optimizer
- TIER-1 cite: `https://github.com/alexgreensh/token-optimizer @ HEAD <SHA UNKNOWN>` [VERIFIED 2026-05-08 via WebSearch + Claudepluginhub]
- Repo metadata: ~703 stars; v5.6.1 (released ~2 weeks prior to query date 2026-05-08, so ~2026-04-24); **PolyForm Noncommercial 1.0.0** (NOT permissive); Python stdlib only (zero pip deps); Claude Code + OpenClaw native plugins + Codex Python adapter beta
- Description: "Find ghost tokens. Fix them. Survive compaction." Bash compression (16 handlers), structure map, delta mode, loop detection, decision extraction. PreToolUse hook for command-output compression. Privacy: 100% local, zero network.
- **Convergence axes**:
  - Axis-1: PARTIAL — single org (alexgreensh solo); related but-not-same projects (`ooples/token-optimizer-mcp`, `nadimtuhin/claude-token-optimizer`, `drona23/claude-token-efficient`, `hansipie/ecotokens`) suggest convergent CATEGORY exists across n=4+ distinct orgs but each implements differently. Category convergence ≠ pattern convergence.
  - Axis-2: PARTIAL — Alex Greenshpun named author; no independent named T2 dated artifact citing this specific implementation.
  - Axis-3: BORDERLINE — high release cadence (v5.x reached in months); cpd-band [UNKNOWN] without commit count probe. Cannot satisfy STABLE-BURN-IN.
- **Probe DAG**:
  - P1 count-OVER: claimed 15-25% command-output coverage of context. Plausible.
  - P2 SDK-vs-CLI: PASS — Claude Code native plugin via PreToolUse hook.
  - P3 architectural-API: VENDOR-NEUTRAL hook on Bash output; plugin-class.
  - P4 plugin-namespace: POTENTIAL HIT — overlaps with already-adopted **mksglu/context-mode** (Wave 95 plugin install, 98% reduction claim). Both are PreToolUse-class compression hooks. NOT identical (token-optimizer focuses on Bash output specifically; context-mode is broader); but operational overlap.
  - P5 mode-harness-shape: PASS — autonomous-loop compatible; runs as plugin hook.
  - P6 LICENSE/registry: **FAIL** — PolyForm Noncommercial 1.0.0. Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 6 + cardinal-rule-9: **claude-sota-installed is permissive-license-only** (MIT/Apache-2.0/BSD acceptable; AGPL/GPL/SSPL/Polyform-Noncommercial REJECT). License is STRUCTURAL adoption blocker — even though "personal use" permitted, ambiguity around eee's status (autonomous-loop research harness vs. potentially-commercial use case) creates downstream risk. Per cardinal-rule-9 sibling-bleed defense + REVERT-AND-REMOVE precedent, REJECT.
  - P7 demand-gate: n/a (license blocks before reaching demand-probe).
- Integration path (if ADOPT): N/A
- **Adoption verdict: REJECT-FOR-PROVENANCE**
- Confidence: 0.95
- Rationale: PolyForm Noncommercial 1.0.0 fails Probe 6 permissive-license gate (matches `agent-harness-fit-verification.md` n=2 precedent — openviking AGPLv3 REJECT-FOR-FIT 0.92). License is structural; no operational mitigation. Even if commercial license purchased, single-org Axis-1 PARTIAL + cpd-band [UNKNOWN] would still warrant STUDY-PILOT not ADOPT.

## Top-3 recommended adoption order (if any ADOPT-NOW)

**NONE.** All 3 repos REJECT.

- headroom: REJECT-FOR-FIT (architectural conflict + duplicate)
- code2prompt: REJECT-FOR-FIT (duplicate of already-adopted repomix/serena/claude-context)
- token-optimizer: REJECT-FOR-PROVENANCE (PolyForm Noncommercial)

## Open questions / DEFER items

1. **headroom re-audit** at age ≥180d AND only after explicit codex T1 verification that proxy interposition is compatible with cnighswonger v3.5.3 cache-fix (Probe 5 P5 conflict resolution).
2. **code2prompt comparison benchmark** vs already-adopted repomix MCP — if repomix retires OR a documented case shows code2prompt token-counting-during-pack uniquely useful, revisit. But cardinal-rule-5 install-priority + Must-Never #4 says: do not duplicate.
3. **token-optimizer** revisit ONLY if upstream relicenses to MIT/Apache-2.0 (extremely unlikely given commercial-license business model).
4. **Generic finding for V64 TOKEN_CONTEXT_ELITE remainder (15 unaudited repos)**: pre-screen license + Axis-1 multi-org + duplicate-vs-already-adopted (rtk + context-mode + claude-context + context7 + playwright-mcp + serena + repomix) BEFORE deep-dive. The 18-repo list likely contains ≥5 more REJECT-FOR-FIT duplicates given how comprehensive eee's already-adopted token-eff stack is.
5. **Tooling-side**: PreToolUse hook for context-mode is blocking ctx_fetch_and_index / curl / WebFetch but the named ctx tools are not actually wired (`mcp__plugin_context-mode_context-mode__ctx_*` returned tool-not-found). FM-03 D1 transport disconnect class for context-mode plugin. This blocked direct GitHub API HEAD SHA capture and reduced cite-precision below cardinal-rule-1 ideal. Surface to orchestrator.

VERDICT: complete — 0/3 ADOPT-NOW + 0/3 STUDY-PILOT + 3/3 REJECT (1 REJECT-FOR-PROVENANCE PolyForm + 2 REJECT-FOR-FIT duplicate/conflict)
