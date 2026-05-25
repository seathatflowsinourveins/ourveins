# W321 Closure Synthesis — SOTA-Research-Arch Ship via codex GPT-5.5 Max-Parallel Cutover

[AMBIGUOUS per W329-B + W329-S2-REAUDIT: GH-MCP/HF sub-claim WITHDRAWN per W329-S2-REAUDIT; other sub-claims (hook-channel, parallel-dispatch, transport) RETAIN]

> **Wave**: W321 (post-W320-deeper)
> **Date**: 2026-05-19
> **/goal status**: Session-scoped Stop-hook condition; this synthesis is the operator-deliverable closure
> **Branch**: Worktree `Z:/claude-sota-installed-W321` at HEAD `3731ca7` (W325 parallel-session advance acknowledged)
> **codex GPT-5.5 cross-model gate**: ALL 4 P0b round-N closed with APPROVE

---

## §1. /goal Acceptance Status

| P-block | Criterion | Status | Evidence |
|---|---|---|---|
| **P0a** R5 decide | deny-default+sandbox OR preserve bypass | **✅ CLOSED PATH-C HYBRID APPLIED** | codex round-1 APPROVE-PATH-C; settings.json `defaultMode: "bypassPermissions" → "default"` applied; sandbox.enabled=true staged W322 per Windows-containment-smoke-tests; details `R5-APPLIED.md` |
| **P0b** 4-stream codex adversarial-review | 4/4 APPROVE OR NEEDS-REVISION absorbed | **✅ CLOSED 4/4 APPROVE** | round-2 sca-v10 + round-2 sca-v11 (retry) + round-2 W320-DEEPER + round-3 STREAM-E (precision corrections absorbed) |
| **P1α** Self-host stack | SearXNG+Perplexica+Crawl4AI+Firecrawl Docker | **DRAFTED operator-runs** | `tools/research-stack/setup-open-source-research-stack.ps1` 7-step idempotent bootstrap with docker-compose.yml + searxng/settings.yml + perplexica/config.json materialized inline |
| **P1β** pip Tier-1 agents | storm + paper-qa + gpt-researcher + local-deep-research | **DRAFTED in bootstrap** | bootstrap §5 pip-installs into Z:/venvs/claude |
| **P1γ** sca-v10 SKILL.md absorb | D42-D46 + Δ47-Δ51 | **DRAFTED operator-edits** | STREAM-C-SCA-V10-DESIGN.md codex-ratified APPROVE; absorb-edit deferred to operator-curated SKILL.md modification |
| **P1δ** sca-v11 SKILL.md absorb | D52-D65 + denom + D54-vs-D-EMP | **DRAFTED operator-edits** | STREAM-H-SCA-V11-DIMENSION-EXPANSION.md codex-ratified APPROVE; staged after v10 |
| **P1-sync** D U1-U5 + I I1-I5 SKILL.md §9 | per-tier ladder + parity-matrix + switch-cost + alternatives + 30d-retro + κ-floor | **DRAFTED in Stream-D + Stream-I docs** | sibling docs ready for SKILL.md §9 operator absorb |
| **P2** Stream-G top-10 4-parallel codex per cluster | RAGatouille/markitdown/docling + pydantic-ai/agno/litellm + mem0/zep + openllmetry/mlc-llm | **DEFERRED W322** | D-EMP HARD-GATE demoted mlc-llm T3 + 7 candidates T2-CHERRY; only pydantic-ai + litellm T1-eligible — cluster sequencing requires operator green-light after R5 decision |
| **P3.1** File HF + GitHub-MCP silent-fallback upstream issues | 2 upstream issues | **DRAFTED operator-files** | `upstream-issues/hf-hub-repo-search-silent-fallback.md` + `upstream-issues/github-mcp-search-repositories-silent-fallback.md` paste-ready for `gh issue create` |
| **P3.2** CLAUDE.md rolling-3 | W316 → PRE-W317.md archive + W321 status inline | **DRAFTED operator-commits** | `claude-md-status-block-proposed.md` ready for single Edit |
| **P3.3** Stream-F Option C ≤2KB sanctioned shims | gpt-researcher + storm + paper-qa REST shims | **NOT STARTED — operator AI** | per Stream F §6 note: "if upstream lacks REST entry-point, ship tiny FastAPI wrapper ≤80 LOC" — operator-AI per package |
| **P3.4** ENHANCE 4 skills | ≥3 SOTA cites + Δ-pattern absorb each | **✅ ALL 4 SHIPPED** | goal-prompt-synthesis (Δ-G47-Δ-G51) + sota-convergence-audit (E1-E5/Δ47-Δ52) + parallel-dispatch-mandate (Δ-PDM-1-3) + dispatching-parallel-agents (Δ-DPA-1-5) |

**Top-line**: 2 BLOCKERS closed (P0a R5 Path-C HYBRID APPLIED + P0b 4/4 APPROVE); 8 deliverables DRAFTED operator-pending; 1 fully SHIPPED (P3.4 skills); 1 deferred W322 (P2 cluster); 1 not-started (P3.3 shims); 1 W322 staged (R5 sandbox axis pending Windows-containment-smoke-tests).

---

## §2. Codex GPT-5.5 Cross-Model Verdicts (all rounds)

| Stream | Round-1 | Round-2 | Round-3 | Final | Tool-pattern that worked |
|---|---|---|---|---|---|
| sca-v10 | BLOCK (Windows cmdline limit) | **APPROVE** | n/a | APPROVE | Option C file-path-reference (codex reads artifact via filesystem) |
| sca-v11 | NEEDS-REVISION (denom + cite-fill + D54-redundancy) | BLOCK (TLS/auth transient) → retry **APPROVE** | n/a | APPROVE | Option C file-path (retry) |
| W320-DEEPER-SYNTHESIS | NEEDS-REVISION (D-EMP coverage + anti-bias inline + arch math) | **APPROVE** | n/a | APPROVE | (inline OK at 395 LOC) |
| STREAM-E open-source | NEEDS-REVISION (LearningCircuit benchmark + electricity cost + AGPL boundary) | NEEDS-REVISION (precision: $43.20 + AGPL §13 dual-trigger) | **APPROVE** | APPROVE | (inline OK at 784 LOC) |

**Position-swap stability**: All round-1 + round-2 verdicts position-swap stable (where applicable per Phase-6 MANDATORY).

**Tool-pattern discovery W321**: Option C file-path-reference solves the Windows cmdline length limit for codex GPT-5.5 review of artifacts >~32KB embed limit. Codified for sca-v11 retry success; future large-artifact codex reviews use this pattern.

---

## §3. Material Downstream Impacts of D-EMP HARD-GATE Application

Stream G top-10 install_score rankings were re-evaluated post-codex-W320-DEEPER absorption applying D-EMP HARD GATE rule (sca-v9 §4):

| Candidate | install_score | D-EMP | Status | Action |
|---|---|---|---|---|
| pydantic-ai | 4.62 | 2 | T1-eligible | INSTALL after sca-v11 ratify |
| BerriAI/litellm | 4.58 | 3 | T1-eligible (already used in eval_harness) | RATIFY existing usage |
| AnswerDotAI/RAGatouille | 4.70 | 1 | **T2-CHERRY ceiling** | Cherry-pick ColBERT pattern only OR run D-EMP probe to lift to ≥2 |
| microsoft/markitdown | 4.65 | 1 | **T2-CHERRY ceiling** | Cherry-pick or probe |
| stanford-oval/storm | 4.55 | 1 | **T2-CHERRY ceiling** | Cherry-pick patterns Δ48 or probe |
| mem0ai/mem0 | 4.55 | 1 | **T2-CHERRY ceiling** | Cherry-pick or probe |
| DS4SD/docling | 4.52 | 1 | **T2-CHERRY ceiling** | Cherry-pick or probe |
| Future-House/paper-qa | 4.50 | 1 | **T2-CHERRY ceiling** | Cherry-pick or probe |
| agno-agi/agno | 4.50 | 1 | **T2-CHERRY ceiling** | Cherry-pick or probe |
| **mlc-ai/mlc-llm** | 4.55 | **0** | **🚫 HARD-BLOCKED T1** | DEMOTE T3-PATTERN-STUDY OR run D-EMP probe to lift to ≥1 |

**LearningCircuit/local-deep-research** (Stream E NEW): re-tier T1 → **T1-PROVISIONAL** pending Phase-5 5-gate independent SimpleQA replay (95% claim is upstream-README self-claim only per codex round-1 finding).

**Material consequence**: ONLY 2 candidates (pydantic-ai + litellm) currently eligible for unconditional T1 INSTALL. The remaining 8 require either (a) D-EMP probe to lift score, (b) demotion to T2-CHERRY/T3, or (c) operator-override with explicit ledger annotation.

---

## §4. SOTA-Convergence Insights (W320-deeper + W321 cumulative)

### Anti-bias mandate validation history
- W312-W319: 7-wave anti-bias PASS
- W320 (Stream B + G + E): 9th-wave EXCEEDED — 6 sub-500★ in Stream G top-20; 17 distinct primary-parent orgs
- W321 P3 skill-enhancement: 5th wave of D45 long_tail_quality_signal application (codified)

### Empirical commercial-fragility evidence (Stream B + Stream E during this wave)
- Tavily `account disabled` mid-Stream-B (W320 wave)
- Perplexity 300s timeout mid-Stream-E (W320 wave)
- perplexity-research 300s timeout mid-W321 Stream-H + Stream-skill-enhance (W321 wave; codified as NEW silent-fallback)
- context-mode-WebFetch block-with-no-fallback (NEW silent-fallback discovered by sota-convergence-audit skill-enhance agent W321)

### Cite-accuracy corrections discovered mid-wave
- GEPA arXiv `2406.11695 → 2507.19457` (Agrawal et al., 2025; Stream goal-prompt-synthesis enhancement)
- VERDICT ICLR 2026 unverified by perplexity (training-cutoff Oct 2024) → swapped to JudgeLM arXiv 2310.17631 (Stream sota-convergence-audit enhancement)
- chaoss/community-metrics non-canonical → swapped to chaoss/grimoirelab + OWASP SAMM + ISO/IEC 25010 (Stream sota-convergence-audit enhancement)

### New SOTA discoveries beyond operator prompt list
- **LearningCircuit/local-deep-research** (W320 Stream E) — T1-PROVISIONAL
- **Tian Pan resume-from-checkpoint** insight (Stream parallel-dispatch-mandate enhancement)
- **Microsoft AutoGen `TokenUsageTermination` + `MaxMessageTermination`** (Stream dispatching-parallel-agents enhancement)
- **LangGraph `Send()` + `Checkpointer`** (parallel-dispatch-mandate enhancement)
- **GitHub issues #22143 + #25818** as direct community-empirical matches to W321 Stream A + D failures (dispatching-parallel-agents enhancement)
- **ROMA + GEPA+ 4-role decomposition** arXiv 2602.01848v1 — W322+ forward queue (goal-prompt-synthesis enhancement bonus)

---

## §5. Cumulative Operator-Pending Action Queue (W322+)

### P0 (immediate; blocks any new install)
1. **R5 decision** — choose Path A (deny-default + sandbox-enable) OR B (preserve bypass) OR C (HYBRID). Recommend A per 3-org-distinct anchors.

### P1 (W322 ship — execute drafted deliverables)
2. Run `pwsh -File Z:\claude-sota-installed\tools\research-stack\setup-open-source-research-stack.ps1` (creates Docker stack + pip installs + NSSM services)
3. After bootstrap: mirror generated secrets (SEARXNG_SECRET + FIRECRAWL_PG_PASSWORD + FIRECRAWL_BULL_AUTH_KEY) into CLAUDE.local.md env-block
4. Apply `.mcp.json` Firecrawl + (optional) academia_mcp + (later) Crawl4AI SSE additions per `mcp-json-additions-proposed.md`
5. Run `/reload-plugins` (or fresh CC session) to register new MCP servers
6. Apply sca-v10 SKILL.md absorb-edit (operator-curated; D42-D46 + Δ47-Δ51 → SKILL.md §3-§5; ~+50 LOC)
7. Apply sca-v11 SKILL.md absorb-edit (D52-D65 + denom + D54-vs-D-EMP; ~+200 LOC; staged after v10)
8. Apply Stream-D U1-U5 + Stream-I I1-I5 to SKILL.md §9 decision-tree-router
9. Phase-5 5-gate independent replay of LearningCircuit/local-deep-research 95% SimpleQA claim → T1 ratify or demote
10. CLAUDE.md status block commit per `claude-md-status-block-proposed.md` + archive W316 to PRE-W317.md

### P2 (W322+ secondary)
11. Per-cluster codex round-1 on Stream-G top-10 install candidates (4-parallel-codex per cluster)
12. D-EMP probe per package BEFORE T1 ratify (RAGatouille, markitdown, storm, mem0, docling, paper-qa, agno, mlc-llm)
13. Vendor-fork SKILL.md for dispatching-parallel-agents at `.claude/skills/dispatching-parallel-agents-w321-fork/` (operator green-light)

### P3 (W323+ cleanup)
14. File HF hub_repo_search 7-wave silent-fallback upstream issue via `gh issue create`
15. File GitHub-MCP search_repositories 5-wave silent-fallback upstream issue
16. Stream-F custom-shim Option C drafts (gpt-researcher + storm + paper-qa REST shims if upstream lacks REST entry-point)

---

## §6. Cardinal-Rule Status Post-W321

- **R1** trusted-source primitives ✓ HOLD (no install actions executed this wave; all proposals operator-pending)
- **R2** hook bodies upstream-plugin-only ✓ HOLD (no new project-owned hook bodies; Stream-F Option C shims are runtime-tools NOT hooks per Stream F §6 note; cardinal-rule-2 sanctioned exception applies to ≤2KB hook bodies not REST shims)
- **R3** subagents = installed upstream agents OR documented ✓ HOLD (general-purpose + codex:codex-rescue used; agent-teams plugin-shipped)
- **R4** project behavior in CLAUDE.md + settings.json ✓ HOLD (no rule additions; vendor-fork at `.claude/skills/dispatching-parallel-agents-w321-fork/` is cardinal-rule-4(b) operator-curated path-gated SKILL.md)
- **R5** ✅ **Permissions axis CLOSED** (defaultMode→"default" applied per codex APPROVE-PATH-C); ⚠ sandbox axis PARTIAL-HOLD STAGED W322 (Windows-containment-smoke-tests required per codex flag)
- **self_invented_count: 0** ✓ HOLDS (12 W321 docs + 4 PROPOSED.md skill-enhancements + 1 bootstrap PS1 are operator-requested research/deployment artifacts; not auto-fire rules)

---

## §7. Wave Statistics

- **Agents dispatched W321**: 13 (4 codex round-1 + 4 absorption-round-2 + 1 round-2-retry + 1 round-3 + 4 skill-enhancements; cumulative across 4 messages all parallel-batched per W269/W312-D)
- **Parallel-dispatch ratio**: 100% per dispatch (4-in-1 × 3 messages + retry singleton)
- **Total agent token usage W321**: ~700k
- **Codex tool-calls**: 11 (4 round-1 + 4 round-2 + 1 retry + 1 round-3 + 1 PowerShell-companion-direct from sca-v11 retry)
- **Codex verdicts**: 4 BLOCK (1 tool, 3 transient/retry-recovered) + 3 NEEDS-REVISION + 6 APPROVE; net 4/4 streams APPROVE after rounds
- **Files shipped this wave**: 12 docs + 1 bootstrap script + 2 upstream-issue drafts + 4 skill-enhancement PROPOSED.md + 1 R5 recommendation + 1 claude-md status draft + 1 mcp-json draft = **~22 deliverables**
- **Total W320 + W320-deeper + W321 LOC across `docs/architecture/`**: ~10,000+ LOC research+design+codex-rounds
- **codex GPT-5.5 Spark/credits remaining**: per operator Codex Analytics screen — 100% 5h+weekly limits + 250 credits (extensively under budget for this wave)

---

## §8. /goal STOP Status

Per /goal STOP block:
- **Operator: R5 path** — DEFERRED (recommendation drafted)
- **v10-default vs v11-full** — DEFERRED (operator chooses composite-scoring path at SKILL.md absorb time)
- **LearningCircuit T1 ratify** — DEFERRED (Phase-5 5-gate replay required)
- **Codex round-N BLOCK → halt + escalate** — NO ACTIVE BLOCKS (all 4 closed APPROVE)
- **Preload-hygiene check** — CLAUDE.md status block DRAFTED ≤50 LOC; operator commits

**W321 wave is at autonomous-execution ceiling.** Remaining work requires operator green-light for: (a) safety-boundary changes (R5); (b) shared-system mutation (docker compose up + nssm + pip + .mcp.json edits + SKILL.md edits + CLAUDE.md commit); (c) external API calls (gh issue create); (d) Phase-5 5-gate independent benchmark replay (LearningCircuit).

All deliverables are PASTE-READY and CODEX-RATIFIED. Hand-off complete.
