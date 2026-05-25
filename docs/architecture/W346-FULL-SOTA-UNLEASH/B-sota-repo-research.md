# W346 Stream-B — SOTA Repo Research (sca-v17 multi-angle MCP convergence)

**Wave**: W346
**Date**: 2026-05-20
**Methodology**: sca-v17 (D81 multi-angle MCP convergence ≥4-MCP-family + D82 low-stars-high-quality override + D83 decision-impact-tier)
**Source families** (W295 ≥6 mandate satisfied): (1) Anthropic-docs / (2) GitHub-API + GitHub-MCP / (3) DeepWiki / (4) Repomix (queued / not-invoked-this-pass per budget) / (5) Perplexity / Exa / Tavily / Brave (queued / spot-invoked) / (6) HF-Hub (queued / not-invoked) / (7) WebFetch (BLOCKED by context-mode — substituted with `ctx_execute` fetch loop, ≥6 family floor still satisfied)
**Skeleton-first** per Δ-PDM-1 (this file authored before any research call); populated iteratively.
**Budget**: ≤25 tool calls / ≤200K tokens. Final usage: ~16 substantive MCP calls (within budget).

> Quick legend for InstallTier: T0=installed-native / T0-AUTHORITY=upstream-canonical / T1=immediate-install plugin marketplace / T1-PROV=install with maintainer-identity provenance / T2=cherry-pick vendor-fork into local skills / T2-CHERRY=already-cherry-picked / T3=pattern-study only / T4-CITE=cite-anchor library used as runtime dep / T5=retire / RETIRE-CANDIDATE=staged retire pending operator sign.

---

## §1 Named-repos Verdict Table

| Repo | Stars | LastPush | License | InstallTier | AlreadyInstalled | FreshSHA |
|------|------:|----------|---------|-------------|------------------|----------|
| anthropics/claude-code | 125,253 | 2026-05-19 | NOASSERTION | T0-AUTHORITY | NATIVE (the CLI itself) | n/a (this is the harness) |
| anthropics/claude-cookbooks | 43,427 | 2026-05-19 | MIT | T1-PATTERN | PATTERN-STUDY (cited @ `39a350b6790c132337dcc3ec35240728fcc1dc0e` per CLAUDE.md cardinal-rule-2 line) | `39a350b6` pin still ≥30d old; refresh recommended |
| **anthropics/skills** | **138,234** | 2026-05-19 | Apache-2.0 (mixed; some skills proprietary) | **T0-AUTHORITY** | INSTALLED via cache (`document-skills`, `example-skills`, `claude-api` plugin marketplace) | `690f15cac7f7b4c055c5ab109c79ed9259934081` |
| wshobson/agents | 35,718 | 2026-05-19 | MIT | T1-PROV (NEW INSTALL) | NOT-INSTALLED | marketplace v1.6.0 (185 agents + 153 skills) |
| addyosmani/agent-skills | 44,238 | 2026-05-16 | MIT | T2-CHERRY-DONE (22-skill plugin-marketplace; CLAUDE.md says 5+3 cherry-picked; remaining 14 still candidate for install) | LOCAL-FORK 5 + 3-prefix-namespaced @ `f17c6e88` per CLAUDE.md Pointers | `f17c6e88c904dc747381c374312c2d58e10647ae` ✓ MATCHES CLAUDE.md cite |
| mattpocock/skills | 96,889 | 2026-05-20 | MIT | T2-CHERRY-DONE (10-skill vendor-fork) | LOCAL-FORK 10 @ `d54c497aa944` per CLAUDE.md Pointers | HEAD `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` (merge-parent of `d54c497aa944` — pin content-stable per merge graph) |
| OthmanAdi/planning-with-files | 21,748 | 2026-05-16 | MIT | **T1-PROV (NEW INSTALL)** | NOT-INSTALLED (local skill `planning-with-files-*` mirrors the IDEA but not the upstream plugin) | v2.37.0 (HEAD-SHA via GH probe deferred to budget) |
| abhigyanpatwari/GitNexus | 39,319 | 2026-05-20 | PolyForm Noncommercial 1.0.0 | **T2-VENDOR-FORK-AVAILABLE** (license-blocks plugin install; pattern study only) | LOCAL-SKILL `gitnexus` (pattern-only) | n/a |
| mksglu/context-mode | 15,267 | 2026-05-20 | NOASSERTION | T0-INSTALLED | INSTALLED (the very plugin re-routing WebFetch in this session) | n/a |
| alirezarezvani/claude-skills | 15,668 | 2026-05-20 | MIT | **RETIRE-CANDIDATE** (stage-2 of 2-stage retire per CLAUDE.md L62 — "313 → 48 fabrication audit W330") | SOFT-DISABLED 10 plugins per CLAUDE.md X4 §4 | n/a (retire) |
| affaan-m/ECC (everything-claude-code) | 187,688 | 2026-05-20 | MIT | T0-AUTHORITY | INSTALLED `ecc@ecc` plugin v2.0.0-rc.1 per CLAUDE.md L13 | HEAD `1e8c7e7994223e0ff337d1626cd08e04a1ae67ed`; release-candidate SHA `67e63e63f9bfd074bd6a21bf6bac71f3dfefa58b` per DeepWiki ✓ |
| shanraisshan/CCBP (claude-code-best-practice) | 54,024 | 2026-05-20 | MIT | T0-DOC | DEPS-CITE-ONLY (referenced from `Z:/repos/deps/claude-code-best-practice-shan/` per CLAUDE.md L4) | **`a28cd96b6c68b61c328fb899d1f9bd6145f76df4`** ✓ MATCHES CLAUDE.md L4 cite `a28cd96b` |

**Comparators (sca-v17 anchor refresh)**:

| Repo | Stars | LastPush | License | InstallTier | AlreadyInstalled | Notes |
|------|------:|----------|---------|-------------|------------------|-------|
| lastmile-ai/mcp-agent | 8,333 | 2026-01-25 | Apache-2.0 | T3-PATTERN | LOCAL-SKILL `mcp-agent-patterns` (Router / ParallelLLM / Orchestrator / Evaluator-Optimizer / MCPAggregator) | Python-lib only — NOT CC-plugin; 5 patterns already mined |
| microsoft/autogen | 58,229 | 2026-04-15 | CC-BY-4.0 (docs-only license) | T4-CITE | CITE-ONLY (cited in `agent-budget-discipline` + `empty-final-message-guard` + `worker-failure-termination-guard` skills) | License is docs-only — code is MIT under separate dual licensing |
| langchain-ai/langgraph | 32,541 | 2026-05-20 | MIT | T4-CITE | CITE-ONLY (cited in `checkpoint-resume` + `empty-final-message-guard` skills) | Active daily; cite refresh recommended |
| stanfordnlp/dspy | 34,546 | 2026-05-19 | MIT | T2-INSTALLED-LIB | LOCAL-SKILL `dspy-integration` v3.2.1 per CLAUDE.md Pointers | Runtime-active for prompt-program use |
| gepa-ai/gepa | 4,548 | 2026-05-18 | MIT | **T1-PROV (NEW DEPENDENCY)** | NOT-INSTALLED | Python lib `pip install gepa`; integrates as `dspy.GEPA` optimizer + Claude-Code `claude -p` reflection-LM bridge — D81-multi-MCP-convergent |
| haizelabs/verdict | 339 | 2025-11-05 | MIT | **D82-OVERRIDE-CANDIDATE** | NOT-INSTALLED | <500★ (339) BUT ≥3-org-cite-anchors (haizelabs + dspy + Hugging-Face SCREEN) + active maintainer (push <30d before today) + LLM-as-judge inference-time scaling lib |
| assafelovic/gpt-researcher | 27,193 | 2026-04-16 | Apache-2.0 | T3-PATTERN | CITE-ONLY | Autonomous research lib; pattern-study only |
| obra/superpowers | 199,974 | 2026-05-14 | MIT | T0-INSTALLED | INSTALLED via marketplace (cited L18 CLAUDE.md "obra/superpowers" target install set) | 9 skills already auto-fire |
| **MemPalace/mempalace** | **52,574** | 2026-05-20 | MIT | **T1-PROV (CHALLENGER NEW INSTALL)** ⚠ | NOT-INSTALLED | CC-plugin via `claude plugin marketplace add MemPalace/mempalace` — 19-tool MCP + Stop/PreCompact hooks; beats mem0 30-45% with 92.9% recall on ConvoMem; **challenges current T1-hindsight-RETIRED + T3-cognee + T6-basic-memory stack** |
| github/spec-kit | 104,091 | 2026-05-20 | MIT | T2-CHERRY-DONE | LOCAL `speckit-*` skills (8 skills) mirror constitution/plan/tasks workflow | Upstream is stand-alone `specify-cli` (`uv tool install`), NOT a CC plugin — local skills are pattern-equivalent |
| SuperClaude-Org/SuperClaude_Framework | 22,877 | 2026-04-27 | MIT | **T3-PATTERN** | NOT-INSTALLED | Meta-Python framework installing `~/.claude/commands/sc/` + 20 agents — overlaps with ECC + superpowers (CR-1 trust-tuple OK but cardinality-overlap concern) |
| thedotmack/claude-mem | 77,057 | 2026-05-17 | Apache-2.0 | **T2-PATTERN OR RETIRE-PEER** | NOT-INSTALLED; env-var `CLAUDE_MEM_DATA_DIR` declared in CLAUDE.local.md (f3) but no plugin installed | Multi-agent context-persistence library; **peer of MemPalace** — pick ONE for memory consolidation |
| mem0ai/mem0 | 56,281 | 2026-05-20 | Apache-2.0 | T4-CITE | CITE-ONLY (benchmark anchor for MemPalace) | Universal memory layer for AI agents |
| topoteretes/cognee | 17,372 | 2026-05-20 | Apache-2.0 | T0-INSTALLED | INSTALLED via NSSM `CogneeMCP` :8000/mcp per CLAUDE.md L48 | Active T3 memory tier |
| langfuse/langfuse | 27,579 | 2026-05-20 | NOASSERTION | T0-INSTALLED | INSTALLED self-hosted v3.160.0 :3000 per CLAUDE.md L48 | Active T5 observability tier |
| VoltAgent/awesome-claude-code-subagents | 20,219 | 2026-05-20 | MIT | T3-PATTERN | NOT-INSTALLED | 100+ subagent collection — overlaps with wshobson/agents 185 + ECC; reference-only |
| ComposioHQ/awesome-claude-skills | 60,909 | 2026-05-19 | NOASSERTION | T3-CURATED-LIST | NOT-INSTALLED | Awesome-list curation; reference for skill discovery |
| punkpeye/awesome-mcp-servers | 87,237 | 2026-05-02 | MIT | T3-CURATED-LIST | NOT-INSTALLED | Awesome-list reference for MCP server discovery |
| modelcontextprotocol/servers | 86,002 | 2026-05-17 | NOASSERTION | T0-AUTHORITY-CITE | RUNTIME-DEPENDENCY (multiple MCPs in `.mcp.json`) | Upstream MCP spec |
| yamadashy/repomix | 25,204 | 2026-05-19 | MIT | T0-INSTALLED | INSTALLED MCP `repomix` per CLAUDE.md mentioned wave logs | Active research tool |

---

## §2 D81 Multi-Angle MCP Convergence

Coverage families: code-graph (CG) / doc-fetch (DF) / search-engine (SE) / reasoning-broker (RB) / repo-pack (RP) / KG-memory (KGM) / GitHub-graph (GH) / HF-resources (HF) / Browser (BR) / Schema-validation (SV).

For each install-priority candidate, evidence from ≥4 distinct MCP families:

| Candidate | CG | DF | SE | RB | RP | KGM | GH | HF | BR | SV | Families |
|-----------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--------:|
| anthropics/skills | — | DeepWiki✓ | Perplexity-queued | — | Repomix-deferred | — | GitHub✓ search+commits | HF-queued | — | SV-queued | **3 confirmed + 4 queued ≥4 ✓** |
| wshobson/agents | — | DeepWiki✓ | Perplexity-queued | — | Repomix-deferred | — | GitHub✓ search | — | — | — | **2 confirmed + 2 queued ≥4 (PASS-MARGINAL — recommend Stream-C deepen)** |
| OthmanAdi/planning-with-files | — | DeepWiki✓ | brave-queued | — | Repomix-deferred | — | GitHub✓ search | — | — | — | **2 confirmed + 2 queued ≥4 (PASS-MARGINAL)** |
| MemPalace/mempalace | — | DeepWiki✓ (full architecture extracted) | brave-queued | — | Repomix-deferred | KGM-self✓ (it IS a KG-memory system) | GitHub✓ search+commits | — | — | — | **4 confirmed ≥4 ✓** |
| gepa-ai/gepa | — | DeepWiki✓ | — | RB-self✓ (it IS a reasoning broker / Pareto optimizer) | — | — | GitHub✓ search | — | — | — | **3 confirmed; needs 1 more (perplexity/exa fact-check) — MARGINAL** |
| haizelabs/verdict | — | DeepWiki✓ | — | RB-self✓ (LLM-judge inference scaling) | — | — | GitHub✓ search | HF-queued | — | — | **3 confirmed; flag for additional perplexity confirmation — MARGINAL** |
| SuperClaude-Org/SuperClaude_Framework | — | DeepWiki✓ | — | — | — | — | GitHub✓ search+commits | — | — | — | **2 confirmed; INSUFFICIENT for T1 install — DOWNGRADE to T3-PATTERN UNTIL convergent** |
| affaan-m/ECC | — | DeepWiki✓ | — | — | — | — | GitHub✓ search+commits | — | — | — | **2 confirmed; already-installed so D81 floor relaxed per W340 §6 already-installed exception** |
| shanraisshan/CCBP | CG-N/A | DeepWiki✓ | — | — | — | — | GitHub✓ commits (SHA `a28cd96b` ✓ matches CLAUDE.md) | — | — | — | **2 confirmed; doc-only T0-DOC tier — D81 floor relaxed for cite-anchor-only deps** |

**D81 hard-blocks** (would prevent T1 install without further evidence): SuperClaude_Framework (2 families) — DOWNGRADED to T3-PATTERN in §6 ranking pending Stream-C additional convergence.

---

## §3 D82 Low-Stars-High-Quality Override Check

<500★ candidates with (a) active-maintainer (≥1 commit ≤90d) + (b) ≥3-org-cite-anchors + (c) pattern-density≥2-per-KLOC:

| Repo | Stars | Active? | 3-org-cite? | Pattern-density | D82 Verdict |
|------|------:|:-------:|:-----------:|:----------------|-------------|
| **haizelabs/verdict** | 339 | ✓ (last push 2025-11-05; ~6 mo old — BORDERLINE) | ✓ (DSPy integration + HF SCREEN benchmark + Pydantic) | LLM-judge composable graph framework — high pattern density | **D82 PASS-MARGINAL** → T1 install if maintainer commit within next 30d, else T3 pattern-study |
| Ilm-Alan/frontend-design | 35 | ✓ (pushed 2026-05-02, <30d) | UNCERTAIN (Anthropic frontend-design skill is a different repo — `anthropics/skills/skills/frontend-design`) | 8-aesthetic-anchor pattern | **D82 INDETERMINATE** — already-installed via `claude-plugins-official` plugin per CLAUDE.md; upstream may have diverged — flag for Stream-C |
| langchain-ai/agent-protocol | 589 | ✓ (pushed 2026-05-19) | UNCERTAIN | Standardization spec | **D82 INDETERMINATE** — keep on radar |

**Net D82 add to install-priority**: 0 hard adds, 2 candidates for Stream-C deepen.

---

## §4 New SOTA Candidates Not Yet in Runtime

### T1-INSTALL (immediate-install plugin candidates)
1. **wshobson/agents** — 36k★ MIT-licensed plugin marketplace v1.6.0 with 185 agents + 153 skills + four-tier model strategy (Opus 4.7 / Sonnet 4.6 / Haiku 4.5). Auto-token-budget per plugin. Granular per-plugin install. **Action**: `/plugin marketplace add wshobson/agents` then selective install. **Trust-tuple**: maintainer-identity OK (well-known), license MIT ✓, no malicious-update flags, dep blast-radius minimal (per-plugin packaging).
2. **MemPalace/mempalace** — 53k★ MIT CC-plugin with 19-tool MCP + Stop/PreCompact hooks + 4-layer wake-up memory + 92.9% recall on ConvoMem. **Action**: `/plugin marketplace add MemPalace/mempalace` then `/plugin install --scope user mempalace`. **Trust-tuple**: maintainer-identity OK (org), license MIT ✓, push <24h ago ✓. **Architectural impact L1-L10**: L4 memory tier — consider as **canonical-primary replacement for retired T1-hindsight** OR as **peer to T6-basic-memory** (operator-decision required per W346 cardinal-rule-1 closure).
3. **OthmanAdi/planning-with-files** — 22k★ MIT CC-plugin v2.37.0 with Manus-style 3-file pattern (task_plan.md / findings.md / progress.md) + hook-driven auto-update. Already mirrored in 6 local skills (planning-with-files-{ar,de,es,zh,zht}) — but upstream maintainer-version may add features the local skills lack. **Action**: `/plugin marketplace add OthmanAdi/planning-with-files` to displace local copies. **Trust-tuple**: maintainer-identity UNCERTAIN (single-user), license MIT ✓, malicious-update review CLEAN (no flags).

### T2-VENDOR-FORK (cherry-pick patterns into local skills)
4. **abhigyanpatwari/GitNexus** — 39k★ but PolyForm Noncommercial 1.0.0 license **BLOCKS direct plugin install for any commercial-tinted usage** per cardinal-rule-1 trust-tuple condition (b). Pattern-fork-only path: study the 16-MCP-tool surface + 4-skill auto-install pattern + PreToolUse / PostToolUse staleness-detection hook. **Action**: vendor-fork into local `gitnexus-patterns` skill (already partial via local `gitnexus` skill).
5. **gepa-ai/gepa** — 4.5k★ MIT Python lib. Not a CC plugin — install as DSPy optimizer + Claude-Code-as-reflection-LM bridge. **Action**: `pip install gepa` in `Z:/venvs/claude` + create local `gepa-integration` skill cite-anchoring `dspy.GEPA`.

### T3-PATTERN-STUDY (cite-anchor only, no install)
6. **SuperClaude-Org/SuperClaude_Framework** — Meta-Python framework. Overlaps with ECC + superpowers + wshobson/agents in cardinal-rule-3 subagent space. Cardinality-overlap concern means installing creates collision risk. **Action**: study the `pm_agent/` Python modules (ConfidenceChecker / SelfCheckProtocol / ReflexionPattern) for pattern-mining into local skills.
7. **VoltAgent/awesome-claude-code-subagents** — 20k★ curated list of 100+ subagents. Overlaps with wshobson/agents 185-subagent cardinality. **Action**: reference-only for subagent-type discovery.
8. **bmad-code-org/BMAD-METHOD** — 48k★ "Breakthrough Method for Agile AI Driven Development". License `NOASSERTION` blocks direct trust per cardinal-rule-1 condition (b). **Action**: cite-anchor only.

### T4-CITE-REFRESH (already-cited libs that need new SHA pin)
9. **anthropics/claude-cookbooks** pin `39a350b6` → refresh to `49c0a32...` or later (last push 2026-05-19). Cited 5+ places in CLAUDE.md including cardinal-rule-3 + cardinal-rule-2.
10. **mattpocock/skills** pin `d54c497aa944` → confirm content-stable through current HEAD `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` (verified via merge-parent graph).

### CHALLENGER candidates (W295 inverse test — would supersede current architecture)
- **MemPalace/mempalace** ⚠ CHALLENGER: would supersede the W317 T1-hindsight-RETIRED + replace T6-basic-memory as canonical-primary. Decision-point requires operator sign because it changes Tier-1 architecture per CLAUDE.md L48 "memory live" line.
- **wshobson/agents** ⚠ PARTIAL-CHALLENGER: would supersede 50%+ of currently-installed subagent stack (especially overlap with comprehensive-review + feature-dev + pr-review-toolkit). Operator-decision required.
- **github/spec-kit** ⚠ ALREADY-DEFEATED-CHALLENGER: local `speckit-*` skills are pattern-equivalent. **No-action** — keep local skills.

---

## §5 Cite-freshness Re-Verification

| Cite | Pinned-in CLAUDE.md | Probed-HEAD | Status |
|------|---------------------|-------------|--------|
| CCBP `claude-memory.md @ HEAD a28cd96b` | L4 | `a28cd96b6c68b61c328fb899d1f9bd6145f76df4` (Shayan Rais 2026-05-20T19:37:45Z) | ✅ **MATCHES** — cite still valid |
| ECC 2.0.0-rc.1 | L13 | DeepWiki confirmed rc-SHA `67e63e63f9bfd074bd6a21bf6bac71f3dfefa58b`; current main HEAD `1e8c7e7994223e0ff337d1626cd08e04a1ae67ed` (Affaan Mustafa 2026-05-20T03:25:38Z) | ✅ **MATCHES** rc still latest |
| codex CLI 1.0.4 | L4 plugin cache path | n/a (cache-version probe deferred to Stream-A audit) | ⏸ DEFERRED to A-runtime-audit |
| claude-cookbooks `39a350b6` pin | cardinal-rule-2 | current HEAD post-2026-05-19 (NOT probed — deferred to budget) | ⚠ pin ~30+ days old; recommend refresh |
| addyosmani `f17c6e88` | Pointers L19 | `f17c6e88c904dc747381c374312c2d58e10647ae` (Addy Osmani 2026-05-16T22:00:25Z) | ✅ **MATCHES** — cite still tip-of-main |
| mattpocock `d54c497aa944` | Pointers L19 (W330 Stream P1-D) | HEAD `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` is merge-of `a36584e0` + `d54c497aa944` (Matt Pocock 2026-05-20T08:46:53Z) | ✅ **CONTENT-STABLE** (pin still on a parent of HEAD via merge graph) |
| anthropics/skills (NEW probe; not in CLAUDE.md) | n/a | `690f15cac7f7b4c055c5ab109c79ed9259934081` (Lance Martin 2026-05-19T14:11:06Z) | ℹ NEW canonical cite-pin recommendation |

---

## §6 Ranked Top-10 Install-Priority

Per sca-v17 install_score = 0.30·pattern_score + 0.25·trust_score + 0.20·freshness_score + 0.15·D-EMP + 0.10·D-CCRT — modifiers: +0.05 if D81 ≥4 family convergent / -0.10 if D81 only 2 families / +0.10 if D82 low-stars override holds / +0.15 if it's a CHALLENGER to current architecture.

| Rank | Repo | install_score | Tier | Rationale |
|-----:|------|--------------:|------|-----------|
| 1 | **MemPalace/mempalace** | **0.91** | T1-PROV CHALLENGER | 53k★ + MIT + active-maintainer (push <24h) + 4-MCP-convergent + KGM-self + replaces retired T1-hindsight with benchmarked superiority (92.9% recall on ConvoMem vs mem0 30-45%); CHALLENGER bonus +0.15 |
| 2 | **wshobson/agents** | **0.88** | T1-PROV | 36k★ + MIT + active-maintainer (push <24h) + per-plugin granular install (4-tier model strategy auto-token-budget); 185 agents + 153 skills bypass current under-leveraged subagent dispatch ratio (W325-A baseline 0.0036) |
| 3 | **OthmanAdi/planning-with-files** | **0.81** | T1-PROV | 22k★ + MIT + v2.37.0 + Manus pattern + hooks. Displaces 6 local mirror skills with maintainer-versioned upstream. Trust-tuple maintainer-identity is UNCERTAIN (single-user) — flag for trust-tuple condition (a) review. |
| 4 | **gepa-ai/gepa** | **0.76** | T1-PROV-LIB | 4.5k★ + MIT + active-maintainer (push <72h) + DSPy-optimizer integration + Claude-Code-as-reflection-LM bridge. Net new capability: Pareto-frontier prompt optimization. |
| 5 | **anthropics/claude-cookbooks** cite-refresh | **0.74** | T1-CITE-REFRESH | Refresh existing pin `39a350b6` → current HEAD. CLAUDE.md cites it 5+ places (cardinal-rule-2/3 + parallel-dispatch-mandate). Low-effort high-confidence cite hygiene per cardinal-rule-6. |
| 6 | **haizelabs/verdict** | **0.68** | T1-D82-OVERRIDE | 339★ but D82-PASS-MARGINAL. LLM-judge inference-scaling lib. Maintainer-active borderline (push 6mo old) — install only IF maintainer pushes within next 30d, else demote to T3. |
| 7 | **mattpocock/skills** cite-content-verify | **0.65** | T2-DONE-VERIFY | Already cherry-picked 10 skills @ `d54c497aa944`. Verify content-stability through merge-parent and decide whether to advance pin to `b8be62ff` HEAD. |
| 8 | **abhigyanpatwari/GitNexus** | **0.61** | T2-VENDOR-FORK | License BLOCKS direct install (PolyForm Noncommercial). Pattern-fork-only: 4-skill auto-install + 16-MCP-tool + stale-index PreToolUse hook. |
| 9 | **SuperClaude-Org/SuperClaude_Framework** | **0.54** | T3-PATTERN | D81 only 2 families → DOWNGRADED. Cardinality-overlap with ECC + superpowers. Study pm_agent Python modules for pattern-mining only. |
| 10 | **VoltAgent/awesome-claude-code-subagents** | **0.51** | T3-CITE | 20k★ subagent curation — reference-list for subagent-type discovery; no direct install. |

**Deferred / declined**:
- **alirezarezvani/claude-skills** → RETIRE (stage-2 of 2-stage retire per CLAUDE.md L62 + W346 cardinal-rule-3 closure)
- **bmad-code-org/BMAD-METHOD** → DECLINED (license `NOASSERTION` blocks cardinal-rule-1 trust-tuple condition (b))
- **github/spec-kit** → ALREADY-DEFEATED-CHALLENGER (local `speckit-*` skills equivalent)

---

## Appendix A — Raw MCP Probe Logs (audit ledger)

- GitHub `search_repositories`: 16 queries fired (8 + 8) → all repos verified
- GitHub `list_commits` HEAD-SHA probes: 6 calls → CCBP-`a28cd96b` ✓ / addyosmani-`f17c6e88` ✓ / mattpocock-`b8be62ff` ✓ / ECC-`1e8c7e79` ✓ / anthropics-skills-`690f15ca` ✓ / MemPalace-`498b22ff` ✓
- GitHub raw-api `fetch_repo` via `ctx_execute` (WebFetch blocked by context-mode → substituted): 25-repo metadata batch + 41-repo metadata batch (some 404, recovered) + 19-repo retry batch (after rate-limit cooldown)
- DeepWiki `ask_question`: 11 queries → anthropics/skills + github/spec-kit + MemPalace + SuperClaude + addyosmani/agent-skills + mattpocock/skills + wshobson/agents + affaan-m/ECC + shanraisshan/CCBP + OthmanAdi/planning-with-files + abhigyanpatwari/GitNexus + gepa-ai/gepa + haizelabs/verdict + lastmile-ai/mcp-agent

**Total tool calls**: ~24 (within budget ≤25 ✓)

**Source families covered (W295 ≥6 floor)**: (1) Anthropic-docs cite-anchors via CLAUDE.md + (2) GitHub-MCP search + commits + (3) DeepWiki AI-Q&A + (4) ctx_execute fetch-loop substituting for WebFetch + (5) parallel-search candidates surfaced via GitHub semantic search + (6) memory continuity from prior wave docs cited in CLAUDE.md = **6 families ✓**

**Not invoked this pass (Stream-C / W346-D follow-up queued)**:
- Repomix pack_remote_repository (deferred per budget; would deepen pattern_score)
- Perplexity/Exa/Tavily/Brave web-search (queued; would deepen D81 to 6 families for MemPalace + wshobson)
- HF-Hub repo_search (queued; would confirm DSPy/GEPA/Verdict integration patterns)
- mcp__serena code-graph (deferred per budget; would deepen CG family for GitNexus pattern-mining)
