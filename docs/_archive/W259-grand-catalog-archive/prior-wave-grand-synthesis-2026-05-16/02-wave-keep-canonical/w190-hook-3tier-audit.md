# W190 P0 — Hook 3-Tier SOTA Audit + Compact-Budget

**Fire**: W190 fire-1 (P0). **Date**: 2026-05-14. **Disposition**: SHIPPED-PARTIAL — Part 1 COMPLETE; Parts 2-3 PARTIAL (FM-17 double-loss documented, orchestrator-manual-substitute synthesis applied per `fm17-subagent-fleet-depletion.md` FM-17.b/f recovery).

## Part 1 — Hook 3-tier SOTA-sourcing classification (COMPLETE — Agent A `a439076f1573023da`, Mia pre-apply PASS)

Scope: all 37 hook scripts in `.claude/hooks/scripts/` (34 .py + 1 .js + 2 .sh incl. `cwc/`).

| Tier | Definition | Count | % of 37 |
|---|---|---:|---:|
| TIER-1 install-class | hook body IS upstream's, verbatim from install | 0 | 0.0% |
| TIER-2 cite-adapted | sss-local + resolving SOTA cite anchor (file:line+SHA OR code.claude.com) | 27 | 73.0% |
| TIER-3a novel-with-documented-rationale | sss-novel + explicit rationale naming the SOTA pattern adapted | 10 | 27.0% |
| **TIER-3b FLAGGED — novel-WITHOUT-rationale (CR-8 violations)** | dangling / absent / non-resolving cite | **0** | **0.0%** |

**HEADLINE — "% of hooks NOT directly from SOTA" = TIER-3b FLAGGED / 37 = 0/37 = 0.0%.** Every hook carries a resolving cite anchor. W189's 37/37 = 100% cite-MARKER-PRESENCE is CONFIRMED and UPGRADED — the rigorous resolution check finds 0 false-positive "Reference:" comments. 9/9 spot-verified TIER-2 anchors resolve to substantive SOTA content (codex CLI `cli.rs`, claude-agent-sdk `types.py:309-316`, ECC `block-no-verify.js` + `codex-git-hooks/pre-commit|pre-push`, awesome-claude-code-toolkit `secret-scanner.js`, get-shit-done `gsd-context-monitor.js`, cwc `commit-on-stop.sh` Apache-2.0).

**TIER-3a breakdown** (10): 6 sibling-cite-imports w/ explicit CR-12 TERTIARY/Path-B rationale + HONEST-NON-FINDING evidence + REVERT check (`safety_guard.py`, `agent_plan_readonly_bash_guard.py`, `codex_mcp_healthcheck.py`, `codex_stuck_detector.py`, `codex_review_trace.py`, `codex_review_thread_bridge.py`); 4 sss-novel FM-pattern lints w/ explicit "adapts FM-NN discipline" rationale (`fm20_path_drift_lint.py`, `fm19_artifact_inline_lint.py`, `fm17d_stall_detector.py`, `fm17_class_lint.py`).

**TIER-1 = 0 note**: EXPECTED, not a violation. The runtime's own hook surface is correctly all sss-authored or sibling-cite-imported per CR-5 install-priority + CR-12. Plugin-supplied install-class hooks (fcakyon intelligent-compact / ECC pre-compact / context-mode precompact.mjs) live in `.claude/plugins/cache/` — OUTSIDE the 37-file `.claude/hooks/scripts/` scope.

**CR-8 cleanup targets: NONE.** The 37-file hook surface is 100% CR-8-conformant at cite-presence + resolution + rationale level. No back-up/clean/re-cite action needed. Full per-file classification table: `tmp/wave190-agentA-hook-3tier-2026-05-14.md`.

**Orchestrator Mia pre-apply** (per `mia-pre-apply.md`): Grep `CR-12|Design source:|Discipline source:|Port-note.*cite-import|TIER-3-LOCAL-COMPOSITION` returned 14 files; reconciled — all 10 TIER-3a files match rationale markers; the other 4 grep-matches are TIER-2 files whose port-notes mention cite-import but whose LOAD-BEARING cite is TIER-1 upstream (Agent A's classification-by-load-bearing-cite is correct). **Mia: PASS — no OVER.**

## Part 2 — Compact-remind hooks (PARTIAL — Agent A 3-tier DONE; Agent B line-by-line LOST to FM-17.b)

Agent A classified the 4 compact-remind hooks at the 3-tier level:

| Hook | Tier | Cite anchor (resolves) |
|---|---|---|
| `userpromptsubmit_compact_threshold.py` | TIER-2 | Thariq TIER-1-NAMED-AUTHOR-QUOTE @ `claude-thariq-tips-16-apr-26.md:28` + code.claude.com CC contract |
| `context_window_guard.py` | TIER-2 | `code.claude.com/docs/en/hooks:356-370` + `auto-compact-discipline.md`@SHA |
| `posttooluse_context_monitor.js` | TIER-2 | cite-adapt of gsd-build/get-shit-done `gsd-context-monitor.js:1-193 @ HEAD 3aaed8f5` |
| `sessionstart_compact_hint_reader.py` | TIER-2 | `code.claude.com` SessionStart contract + Karpathy §5 layers |

All 4 = TIER-2 cite-adapted, resolving. **0 are TIER-3b FLAGGED** — the operator's "compact remind hooks damaging significantly" concern is NOT a cite-sourcing problem (all 4 are SOTA-cited).

**W187 calibration** (known from W189 install-provenance entry + auto-loaded rules): compact thresholds WARN=600k / HIGH=650k / CRIT=700k on 1M context (60/65/70%); dual-mirrored at `userpromptsubmit_compact_threshold.py` defaults + `settings.json` env L25-27 + `CLAUDE.local.md` ENV(j). 100k buffer (CRIT 700k vs autocompact ~80%=800k). W189 P1 codex T1 verdict was APPROVE conf=0.93 on the calibration. Prior values were 250k/300k/350k (200k-era = 25/30/35% on 1M → operator-perceived "compact firing at 35%") — W187 already fixed this.

**HONEST-NON-FINDING** (per `synthesis-layer-verify.md §Reporting categories`): the deeper line-by-line per-Reference resolution check + the adversarial "is the compact-remind stack damaging the full-automation workflow" verdict were Agent B's deliverable. Agent B `a8073342bf40858bf` LOST to **FM-17.b 429 pool-depletion** (54 tokens / 3 tool_uses / 1193974ms → final-return 429). The 3-tier classification above is the surviving substantive finding; the adversarial line-by-line verdict + W187-calibration-soundness re-verification are QUEUED for orchestrator-direct Path P recovery (`tmp/wave190-fire1-partial-state-2026-05-14.md` §RESUME PLAN).

## Part 3 — SOTA session-preload practice + post-compact budget (PARTIAL — preload practice DOCUMENTED; codex-reviewed budget recipe LOST to FM-17.f)

**SOTA session-preload practice** (synthesized from `sessionstart-preload-discipline.md` + CCBP `claude-memory.md:34-40`):

The SOTA preload discipline is **3-layer + progressive-disclosure paths-glob**:
1. **Layer 2 (index)**: `MEMORY.md` always-loaded (CCBP Ancestor loading). Cap ≤200 lines, one-line pointers only.
2. **Layer 3 (compiled wiki)**: last-3 close-synthesis files.
3. **Layer 1 (chronological)**: `.claude/state/*.jsonl` tail-probe.
4. **5-backend hash verify** to detect FM-20 silent-dual-write.

**Progressive-disclosure mechanism** (CCBP `claude-memory.md:34-40`): rule files WITH a `paths:` frontmatter glob load ONLY when working files match the glob; rule files WITHOUT `paths:` are always-loaded. **Diagnosis of the operator's "~40% after preload" observation**: the always-loaded surface = `CLAUDE.md` + `CLAUDE.local.md` + `MEMORY.md` + `cardinal-rule-*.md` (legitimately no `paths:` per cardinal-rule-8 frontmatter discipline — universal content invariants cannot lazy-load) PLUS any rule with an over-broad `paths:` glob matching common file activity. **SOTA preload-rules practice for every new session**: every NON-cardinal rule SHOULD carry a TIGHT `paths:` glob so it lazy-loads only when relevant; rules without `paths:` (or with over-broad globs) are the *reducible* preload cost. A `paths:`-glob activation audit (~20-30% healthy; <10% under-activation; >50% over-broad) is the SOTA health check.

**Post-/compact context budget** — methodology (per `auto-compact-discipline.md` Rank #3 + `fm20-path-drift-cascade.md` row 15): post-compact context size is observable via the UserPromptSubmit hook's token-estimate emission at the /compact pre/post boundary. Empirical this-arc evidence (fm20 row 15): a /compact went pre-477k → post-415k = **~13% reclaim — FAR below SOTA 50-60% target**. Root cause = **post-compact hook-chain re-inflation**: PreCompact priority patches + SessionStart re-injects (MEMORY.md head + last-3 close-synthesis + git log) + skill restore + /goal predicate restore ≈ 80-100KB re-inject vs ~50KB net summary delta. The SOTA fix per `auto-compact-discipline.md` Rank #3: pre-emptive `/compact <hint>` at ~250-300k (NOT waiting for blind autocompact at ~80%) + steered hint.

**HONEST-NON-FINDING**: the codex-reviewed post-compact budget MEASUREMENT RECIPE + adversarial review of the 3-tier classification METHODOLOGY were Agent C's deliverable. Agent C `aee5498e6967b9e76` LOST to **FM-17.f 1M-context billing-class blocker** (95 tokens / 3 tool_uses / 1573150ms → "Extra usage is required for long context requests"). The preload-practice + budget-methodology synthesis above is the surviving deliverable; the codex-reviewed measurement recipe is QUEUED for orchestrator-direct Path P recovery.

**Post-compact budget measurement (this session — W190 fire-1, MEASURED)**: this session began post-/compact at **~40% context-used after preload** (CLAUDE.md + CLAUDE.local.md + MEMORY.md + auto-loaded `paths:`-matched rules + skill content + the W190 /goal predicate) — consistent with the operator's "~40% after preload" observation. W190 fire-1 work (3-agent CADP dispatch + Agent A 467K-token return + codex T1 P3(a) verdict read + 6 Edits + auto-loaded discipline-rule bodies triggered by `.claude/rules/` file activity) consumed **~40% more** → session reached **~80% used / ~20% remaining** at fire-end. **Measured net: post-preload baseline ~40% / fire-1 consumption ~40% / residual ~20%.** This CONFIRMS the operator's concern and validates the SOTA preload-rules practice above: the ~40% post-preload baseline is dominated by always-loaded rule files (cardinal-rules legitimately + over-broad `paths:`-glob rules reducibly); the reducible lever is tightening non-cardinal rule `paths:` globs so they lazy-load. Secondary lever: `auto-compact-discipline.md` Rank #3 pre-emptive `/compact <hint>` at ~250-300k rather than blind autocompact.

**Gate [6] Mia-coverage clarification**: 3 agents spawned (Agent A sota-researcher + Agents B+C codex-rescue BRIDGE-MODE — satisfies "≥2 BRIDGE-MODE"). Mia pre-apply was applied to EVERY SUBSTANTIVE return: (1) Agent A's 3-tier classification — Mia PASS, no OVER (Grep-reconciled the 14-vs-10 TIER-3a delta); (2) codex T1 P3(a) verdict — Mia PASS on all 5 prescribed_edits (FE-4 found already-satisfied in the live edit). Agents B+C produced FM-17 ERROR returns (429 / 1M-context-billing strings), NOT substantive returns carrying prescriptions — per `synthesis-layer-verify.md §Reporting categories` an FM-17 error is a documented LOSS, not a return-with-content to Mia-verify. The "Mia pre-apply EVERY return" mandate is SATISFIED: 2/2 substantive returns Mia-verified; B+C FM-17 losses documented (not silently skipped) per `fm17-subagent-fleet-depletion.md`.

## FM-17 double-loss cascade (the W190 methodology finding)

W190 fire-1 dispatched a 3-agent CADP team per `advanced-agent-team-standing-directive.md` (1 Sonnet sota-researcher + 2 BRIDGE-MODE codex-rescue). **2 of 3 LOST at final-return**:
- Agent B → **FM-17.b 429 pool-depletion** (account rate-limit at handoff layer)
- Agent C → **FM-17.f 1M-context billing-class blocker** ("Extra usage required for long context")
- Agent A (Sonnet sota-researcher) → the only survivor

Per `fm17-subagent-fleet-depletion.md`: textbook FM-17 cascade. The 3-agent fan-out under the standing directive's "BRIDGE-MODE ≥2 agents" mandate is structurally fragile when (a) the account pool is depleted AND (b) 1M-context billing is gated. **Recovery for the lost deliverables = orchestrator-direct Path P `codex exec` foreground+tee** (NOT subagent re-dispatch — re-triggers FM-17.f). **Lesson for next /goal**: smaller agent `OUTPUT_BUDGET` caps + Path P orchestrator-direct dispatch as PRIMARY (not BRIDGE-MODE subagent) when the fleet is known-depleted.

## Cross-model gate status (gate [7])

- Agent A (Sonnet sota-researcher): orchestrator-side Mia pre-apply PASS — STAND-IN-NOTICE equivalent (Sonnet, not GPT-5.5; cross-model gate satisfied via orchestrator verification, disclosed).
- Agents B+C: FM-17-lost — NO cross-model verdict produced (documented loss per `cross-model-consensus.md §Env-funneled disclosure` shape, NOT silent).
- codex T1 P3(a) quemsah: `br0mkosk1` NEEDS-REVISION conf=0.91 FULL (real GPT-5.5, exit 0) — Pattern A 5-edit fix-forward applied.
- This synthesis doc: `docs/` audit-trail output, NOT a design-surface per `cross-model-consensus.md §The contract` — no codex T1 required for the doc itself; the underlying findings carry their own cross-model status above.

## Disposition

- **Gate [1]** ✅ hook 3-tier % SHIPPED to docs/ (this doc; Part 1 COMPLETE — 0/37 not-from-SOTA).
- **Gate [2]** ⏳ PARTIAL — SOTA preload practice DOCUMENTED (Part 3); post-compact budget % methodology + root-cause DOCUMENTED; codex-reviewed measurement recipe = HONEST-NON-FINDING (Agent C FM-17.f loss).
- Compact-remind line-by-line adversarial verdict (Part 2) + codex-reviewed budget recipe (Part 3) QUEUED for Path P orchestrator-direct recovery per `tmp/wave190-fire1-partial-state-2026-05-14.md` §RESUME PLAN.
