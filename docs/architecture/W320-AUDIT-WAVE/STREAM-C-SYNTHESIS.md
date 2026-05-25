# W320 Stream C — Synthesis (PWF re-litigation + Wshobson security-triad + Per-subagent budget codify)

> **Wave**: W320 | **Stream**: C | **Date**: 2026-05-19
> **Scope**: 2 full sca-v8.1-partial audits (B1 PWF v2.38.1 + B2 wshobson security-triad cluster) + 1 codification (M3 per-subagent research budget)
> **Strict file ownership**: `docs/architecture/W320-AUDIT-WAVE/*` + `VERDICT-LEDGER.md` ledger-row appends only (NO other edits to that file)
> **Rubric**: sca-v8.1-partial (W319 ship; arch-itself install_score 4.799/5)

---

## 1. Stream C deliverables (3 docs + this synthesis)

| # | File | LOC | Purpose | Verdict |
|---|---|---:|---|---|
| 1 | `W320-C-1-PWF-V2-38-1-RE-LITIGATE.md` | ~250 | PWF v2.38.1 RE-LITIGATE (full sca-v8.1-partial 35-dim + D-EMP HARD GATE) | T2 VENDOR-FORK · RE-ENABLE-IN-PLACE (supersedes W309 row #32 T3 PATTERN-STUDY DEACTIVATE) |
| 2 | `W320-C-2-WSHOBSON-SECURITY-TRIAD.md` | ~340 | Cluster audit: protect-mcp + signed-audit-trails + review-agent-governance with triangulated MCDA (Δ30 Borda + ELECTRE I + WSM) | protect-mcp **T2 INSTALL**; review-agent-governance **T2 INSTALL HYBRID-PAIR**; signed-audit-trails **T4 CITE-ONLY CONFIRM-ALREADY-ENABLED** |
| 3 | `W320-C-3-PER-SUBAGENT-BUDGET.md` | ~170 | M3 codify per-subagent budget from Anthropic `research_subagent.md` — paste-ready preamble for `parallel-dispatch-mandate` skill (Stream A applies) | Spec drafted, paste-ready, Stream-C-does-NOT-apply |
| 4 | `STREAM-C-SYNTHESIS.md` (this doc) | ~150 | Closure synthesis | — |

**VERDICT-LEDGER.md edits**: 4 ledger rows appended (#89 PWF + #90 protect-mcp + #91 review-agent-governance + #92 signed-audit-trails) under new "## W320 Stream C" heading. No other lines modified.

---

## 2. Key findings cross-stream

### 2.1 PWF re-litigation surfaces material capability shift

PWF v2.38.x adds 4 PRIO-1 net-new since W309 cutoff:
- PreCompact hook on autoCompact/manual `/compact` → flushes in-context progress to `progress.md` + surfaces `Plan-SHA256` attestation
- `/plan-goal` slash-command composes with Claude Code `/goal` primitive (v2.1.139)
- `/plan-loop` slash-command composes with Claude Code `/loop` primitive (v2.1.72+)
- SHA-256 tamper-attestation v2.37 reinforced v2.38 — `[PLAN TAMPERED — injection blocked]` on hash mismatch

These map DIRECTLY to our `durable-planning-files` + `loop` + `goal-prompt-synthesis` operator-curated stack. install_score **3.658** in T2 range (path-(b) default; effective denom 28.3 after D24/D25/D29 skip-N/A). D-EMP=5 (multi-wave production-like exercise in this runtime pre-W309). 8/11 MCP families converged.

**Tier-elevation justification (T3 PATTERN-STUDY → T2 VENDOR-FORK)**: W308 row #31's 4 Phase-5 FAILs were RUBRIC-GOVERNANCE failures (paraphrase + star-anchor + contamination + org-effective); v2.38.x CHANGELOG.md disciplined Security + Will-NOT sections close contamination concern. solo-bus-factor (D16=2) + solo-org (D21=1) + sparse-non-author-review (D19=2) prevent T1 ceiling — all at floor not below. PWF caches already at v2.38.1 matching upstream HEAD `d27008f3` exactly; rollback = single boolean flip.

### 2.2 Wshobson security-triad ELECTRE I surfaces complementary-specialty-axis

Triangulated MCDA (Δ30 W316 mandatory for cohorts ≥2) applied:
- **Borda**: protect-mcp #1 (10.5), review-agent-governance #2 (14), signed-audit-trails #3 (17.5)
- **WSM**: protect-mcp #1 (3.42), review-agent-governance #2 (3.23), signed-audit-trails #3 (2.56)
- **ELECTRE I**: protect-mcp outranks signed-audit-trails; review-agent-governance outranks signed-audit-trails; protect-mcp ⊕ review-agent-governance INCOMPARABLE → Δ31 multi-kernel-keep applies — both are keepers (complementary specialty axes)

**HYBRID-PAIR install**: protect-mcp (general policy runtime) + review-agent-governance (focused review-surface wrapper composing protect-mcp). Cumulative D34=2-3 (no in-tree Cedar-policy runtime; codex Stop-hook gate captures output-review NOT review-bot-action-gating). 3-org-distinct anchors hold for AWS Cedar + IETF RFC 8032 + RFC 8785 + Sigstore + NIST AI 600-1 across all 5 cluster strengths.

**signed-audit-trails T4 CITE-ONLY**: D10=2 + D2=3 hard-cap (full-duplicate of `signed-audit-trails:signed-audit-trails-recipe` skill ALREADY ENABLED per settings.json `signed-audit-trails@claude-code-workflows: true`). No action — current state correct.

### 2.3 Per-subagent budget contract closes W319-A MED-3 silent-fallback class

Anthropic `research_subagent.md:5-6,11,44-46` (cookbook canonical) specifies:
- Simple tasks `<5` tool calls; medium `5`; hard `~10`; very difficult `up to 15`
- MINIMUM `5 distinct tool calls`; avoid `>10` for normal complex queries
- HARD-STOP `20 tool calls` + `~100 sources` → exceeding terminates subagent
- Termination contract: at `15 calls or 100 sources → complete_task` immediately

Codification paste-ready at §3 of W320-C-3 doc. **Stream C does NOT apply the edit** — Stream A retains `parallel-dispatch-mandate/SKILL.md` edit ownership for W320. Spec includes per-complexity budget table + floor + soft-ceiling + termination contract + 3-org-distinct anchors (Anthropic + OpenAI + METR).

---

## 3. Cumulative T6 verdict count

| Wave | Pre-stream count | Net change | Post-stream count |
|---|---:|---:|---:|
| W319 | 81 | +11 | 92 (rows #82 ECC + 4 W318-B + #88 serena) |
| W320 Stream C | 92 | +4 | **96** (rows #89-#92) |

Cumulative T6 verdict count **96 post-W320-Stream-C**.

---

## 4. Cardinal-rule invariants (W320 Stream C)

- R1 trusted plugins/skills/agents: PASS — all candidates from upstream marketplaces (OthmanAdi + wshobson) with verified author/repo/license
- R2 hooks plugin-shipped or direct-CLI: PASS for all candidates; cardinal-rule-2 compliance verified
- R3 subagents installed-upstream: PASS (wshobson review-policy-author / policy-enforcer / receipt-verifier are upstream-installed agents)
- R4 project behavior in CLAUDE.md + settings.json: PASS — `self_invented_count: 0` HOLDS. No new `.claude/rules/*.md` or `.claude/hooks/*` created. All Stream C output in `docs/architecture/W320-AUDIT-WAVE/`.
- R5 safety boundaries via permissions/sandboxing: PASS — protect-mcp + review-agent-governance install path REINFORCES not REPLACES the permission system (Cedar policy gates + Ed25519 receipts are additive layers above CC permissions semantics)

`self_invented_count: 0` invariant HOLDS.

---

## 5. Forward operator-AIs to W321+ (12 total Stream-C)

| AI-ID | Priority | Description |
|---|:---:|---|
| AI-W320-C-1-1 PWF-RE-ENABLE-FLIP | **P0** | Flip `enabledPlugins[planning-with-files@planning-with-files]: false → true` (closes W308 row #31 + W309 row #32 + W318-AI-B-7) |
| AI-W320-C-1-2 PWF-COHORT-DEDUP-DECISION | P1 | Decide PWF + `durable-planning-files` overlap policy |
| AI-W320-C-1-3 W309-ROW-32-STATUS-FLIP | P3 | Cosmetic: row #32 ACTIVE → RE-LITIGATED (supersedes #89) |
| AI-W320-C-1-4 W308-ROW-31-CLOSE | P3 | Cosmetic: row #31 ACTIVE-PENDING → CLOSED-RE-LITIGATED |
| AI-W320-C-1-5 PWF-LANE-C-SMOKE | P2 | Lane-C smoke vs `durable-planning-files` baseline |
| AI-W320-C-2-1 PROTECT-MCP-INSTALL | **P1** | `claude plugin install wshobson/agents/protect-mcp` + flip enabledPlugins + Cedar policy + gitignore |
| AI-W320-C-2-2 REVIEW-AGENT-GOVERNANCE-INSTALL | **P1** | `claude plugin install wshobson/agents/review-agent-governance` + flip enabledPlugins (HYBRID-PAIR; closes W318-AI-B-5) |
| AI-W320-C-2-3 PROTECT-MCP-PIN-BUMP-AUDIT | P2 | File `wshobson/agents` upstream issue pin-bump `protect-mcp@0.5.5 → 0.6.0` |
| AI-W320-C-2-4 SIGNED-AUDIT-TRAILS-CONFIRM | P3 | No action — current state correct |
| AI-W320-C-2-5 PROTECT-MCP-SMOKE | P2 | Exercise `protect-mcp/test/run-tests.sh` to lift D-EMP 4 → 5 |
| AI-W320-C-2-6 CARDINAL-RULE-2-COMPLIANCE-VERIFY | P2 | Post-install verify `.claude/settings.json:hooks` only contains DIRECT-CLI invocations |
| AI-W320-C-3-1 PARALLEL-DISPATCH-MANDATE-PASTE | **P1** | Paste §3 budget preamble into `parallel-dispatch-mandate/SKILL.md` (Stream A coordinates) |

**P0 priority items**: 1 (PWF re-enable flip)
**P1 priority items**: 4 (PWF cohort-dedup + protect-mcp install + review-agent-governance install + parallel-dispatch-mandate paste)
**P2 priority items**: 4
**P3 priority items**: 3

---

## 6. Stream C closure invariants

- `self_invented_count: 0` HOLDS (no new files in `.claude/` outside operator-curated SKILL.md paths)
- VERDICT-LEDGER.md edits: 4 row appends only (#89-#92) under new "## W320 Stream C" section
- No edits to `.claude/skills/parallel-dispatch-mandate/SKILL.md` (Stream A retains ownership)
- No edits to `Z:/claude-sota-installed/CLAUDE.md` (Stream A or operator decides L34 cite refresh)
- No edits to `Z:/claude-sota-installed/.claude/settings.json` (operator decides flips per AI-W320-C-1-1, AI-W320-C-2-1, AI-W320-C-2-2)
- No edits to `Z:/claude-sota-installed/.mcp.json` (no MCP wire changes needed)

---

## 7. Cross-stream coordination notes

- **Stream A coordination**: AI-W320-C-3-1 paste of per-subagent budget preamble depends on Stream A NOT touching `parallel-dispatch-mandate/SKILL.md` at the same anchor (after frontmatter + before "Why" section). Stream C drafted text in W320-C-3-PER-SUBAGENT-BUDGET.md §3; Stream A applies.
- **Stream B coordination**: row #89 PWF supersedes Stream B finding referenced as RE-LITIGATE CANDIDATE per W318-AI-B-7; Stream B's STREAM-B-OthmanAdi-planning-with-files.md is the source signal. row #90-#92 wshobson security-triad supersedes Stream B's STREAM-B-wshobson-agents.md §HARNESS-FIT top-3 candidate audit queue.
- **Stream D coordination (if exists)**: no overlap. Stream C scope is full audits + 1 codify, not discovery breadth.

---

## 8. Cost telemetry

- W320 Stream C MCP tool calls: ~12 `ctx_batch_execute` (cascade of ~80 sub-commands) + 2 `deepwiki ask_question` + 4 `ctx_execute_file/ctx_execute` + 4 `Write` + 1 `Edit` + ~5 `Read/Grep/Glob` ≈ 28 tool calls. Within sca-v8.1-partial expected budget of `up to 15 calls for very-difficult task × 3 audits = 45 budget` (well under).
- No `WebFetch` calls (used `ctx_fetch_and_index` + `curl + python3` via `ctx_batch_execute` for full text content with FTS5 indexing benefits).
- No exa/perplexity calls (cascade families used GitHub-API + npm-registry + deepwiki + in-cache filesystem + ctx_fetch_and_index of raw GitHub content + repomix-equivalent + W319-B stream artifacts — 8 distinct families).

---

## 9. Three-paragraph executive summary

**PWF v2.38.1 re-litigation** confirms material capability shift since W309's strict-letter Phase-5 4-FAIL deactivate. The 4 PRIO-1 net-new features (PreCompact hook + `/plan-goal` + `/plan-loop` + SHA-256 tamper-attestation) compose directly with our `durable-planning-files` + `loop` + `goal-prompt-synthesis` operator-curated stack; D-EMP=5 reflects multi-wave production-like exercise; install_score 3.658 routes T2 VENDOR-FORK with operator-decision-pending to flip the `enabledPlugins` boolean from false → true. Rollback is single-boolean reversal with zero state-mutation cost.

**Wshobson security-triad cluster** (3 plugins by Tom Farley at wshobson `ece811f` HEAD) yields triangulated MCDA convergence: protect-mcp #1 (Cedar + Ed25519 + JCS + hash-chain runtime), review-agent-governance #2 (review-bot-action gating wrapper composing protect-mcp), signed-audit-trails #3 (teaching skill, ALREADY enabled per `signed-audit-trails@claude-code-workflows: true`). ELECTRE I incomparability between protect-mcp and review-agent-governance surfaces them as **complementary specialty axes** under Δ31 multi-kernel-keep — both installed as HYBRID-PAIR closes W318-AI-B-5 and introduces cryptographic governance to a runtime currently lacking Cedar-policy primitives. signed-audit-trails confirmed at T4 CITE-ONLY (no-op; existing enable suffices).

**Per-subagent budget codification** translates Anthropic `research_subagent.md` doctrine (lines 5-6, 11, 44-46) into a paste-ready preamble for `parallel-dispatch-mandate`: explicit budget ladder (simple `<5` / medium `5` / hard `~10` / very-difficult `up to 15`), MINIMUM-5 floor, MAXIMUM-20-and-100-sources hard-stop, and `complete_task` invocation contract at 15/100 soft-ceiling. Codification closes W319-A MED-3 silent-fallback class (subagent termination becomes observable via mandatory `tool_calls_used: N / source_count: M` telemetry in subagent reports). Stream C drafted text; Stream A applies the edit; coordination preserves ownership boundaries.

---

## 10. Cumulative W320 Stream C ledger row count + cardinal-rule sustainment

- **Rows appended**: 4 (#89 PWF + #90 protect-mcp + #91 review-agent-governance + #92 signed-audit-trails)
- **Tier distribution**: 0 T1 · 3 T2 VENDOR-FORK (1 RE-ENABLE-IN-PLACE + 2 NEW INSTALL HYBRID-PAIR) · 0 T3 · 1 T4 CITE-ONLY (confirm-already-enabled)
- **Hard-cap breaches**: 0 (signed-audit-trails D10=2 + D2=3 routes T4 by design, NOT a breach)
- **Stage-0 existence-probe**: PASS for all 4 candidates (4-of-4 PWF / 6-of-7 wshobson-triad families hit)
- **D-EMP HARD GATE**: PASS for all 4 candidates (PWF=5, protect-mcp=4, signed-audit-trails=2, review-agent-governance=3)
- **3-org-distinct anchor verification**: PASS for all claimed strengths across 4 candidates
- **Cardinal-rule invariants**: R1-R5 all HOLD
- `self_invented_count: 0` HOLDS

W320 Stream C closure verdict: **SHIPPED**.
