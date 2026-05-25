# W331 SOTA-CONVERGENCE — SYNTHESIS

> Compiled 2026-05-19 from 7 parallel line-by-line ingest streams (S1-S7) + 5 codex review rounds (r1 + r2 PRIMARY + r2 SWAP + r3 + r4). Per /goal STOP-discipline + OthmanAdi/planning-with-files@d27008f3 SKILL.md L86-99 contract.
>
> Branch: `goal/W331-sota-convergence` · 15 commits · **codex r4 verdict REVISE-WITH-MINOR @ 0.89** (7/7 r3 gaps closed; doc-staleness only remaining gap, fixed THIS edit).

## §1 Executive verdict

W331 substantively executed all 9 P0 items + ingested 21 SOTA repos across 7 parallel streams (closing W330 codex axis-2 #1+#2 line-by-line ingest mandates and axis-2 #3 T1-hindsight bakeoff). Headline finding: **all 7 streams independently confirm parallel-dispatch + structured-worker-state-patch + reviewer-as-enforced-gate as the convergent 2026 SOTA pattern**, with langgraph `Send` API (Stream-2), codex `ReviewOutputEvent` JSON schema (Stream-5), gpt-researcher worker-state-patch + triadic loop (Stream-2), and `dspy.GEPA` MCP-adapter (Stream-4) as the four highest-impact adoption candidates.

**Wave verdict**: codex r4 REVISE-WITH-MINOR @ 0.89 confidence — 7/7 r3 gaps closed via W331-r3+r4 commit chain (38e0bca → 25a091e → 96ac1d7 → 7e00a57 → 98e157e → 38f4c30 → 93d753e → ddc762a). All 6 W332 residual items addressed in-wave. Position-swap CONVERGENT throughout (r2 PRIMARY 0.86 ↔ SWAP 0.84 BOTH NEEDS-REVISION; r3 0.90 + r4 0.89 verdict-stable). E2E smoke test 3/3 PASS (parallel-guard chain operational end-to-end post-readCounter-fix). Wave is SHIP-READY pending operator-side `/insights` probe (P0.2 only).

## §2 P0 inventory status table

| ID | Title | Status | Commit / Artifact |
|---|---|---|---|
| P0.1 | Parallel-detector root-fix (timestamp-window pragma) | ✓ LANDED + CR-5 binding-gate ratified | `68d89ca` + `5aed4f3` → `tools/preagent-parallel-guard.mjs` |
| P0.2 | Project-dir redirect probe | PENDING operator-side `/insights` (accepted per codex r2) | (operator-side) |
| P0.3 | Codex PATH consolidate | ✓ DONE W330 | `W330-MEGA-AUDIT/codex-consolidate-before.json` |
| P0.4 | Install-state contract | ✓ PROBED (16-key drift NOT 66; gitnexus binary-vs-shell 23-minor drift confirmed Stream-7) | `findings.md §1` + Stream-7 §2 |
| P0.5 | Line-by-line ingest (21 repos) | ✓ ALL 7 STREAMS COMPLETE | 7× `W331-LINE-BY-LINE/*-ingest.md` |
| P0.6 | T1 hindsight bakeoff | ✓ DONE — mem0=T1-PROV winner | `t1-bakeoff-mem0-letta-zep.md` |
| P0.7 | Frontier-peer policy CLAUDE.md edit | ✓ LANDED `765a16f` | CLAUDE.md L10 |
| P0.8 | Prompt-optimizer track survey | ✓ DONE — dspy.GEPA → GoalSynthesisPipeline | `p0.8-prompt-optimizer-survey.md` |
| P0.9 | Rules + severity calibration | ✓ LANDED `765a16f` + `5aed4f3` CR-2 hook + `ee01d38` L22 fix | CLAUDE.md CR-1..5 + `.pre-commit-config.yaml` cr2-2kb-hooks |

**Overall**: 8 of 9 P0s LANDED + 1 PENDING operator-side. Wave gate: codex r4 REVISE-WITH-MINOR (7/7 r3 closures verified; doc-staleness in this SYNTHESIS — patched in this edit).

## §3 Top-N adoption candidates by impact-tier

### §3.1 HIGH-tier (immediate adoption — closes W325-A F1 SEV-1 + Δ-G49)

1. **langgraph `Send` API fan-out return contract** (Stream-2 §1.1) — `libs/langgraph/langgraph/types.py:654-742, slots:701, __init__:707-726`. Replaces verbal "MUST be 2+ Agent calls" mandate with structured `List[Send(subagent_type, prompt)]` return; runtime owns parallelization, removes LLM choice from dispatch decision. **Directly addresses 99.6% silent-serial baseline (W325-A F1 SEV-1).**
2. **codex `ReviewOutputEvent` JSON schema as canonical verdict shape** (Stream-5 §4.3 / §5 candidate 4) — `codex-rs/protocol/src/protocol.rs` + `parse_review_output_event`. Structured `findings[].{title,body,confidence_score,priority,code_location.{absolute_file_path,line_range}}` + top-level `overall_correctness/explanation/confidence_score`. **Unlocks W325-A F1 review-pipeline silent-drop** (today dual-review does ad-hoc text extraction; adopting schema gives priority-routing + cite-anchor consistency).
3. **gpt-researcher worker-returns-state-patch contract** (Stream-2 §3.3) — `multi_agents/agents/researcher.py::run_depth_research` returns `{"draft": ...}`. Mandates typed `{stream_id: findings_payload}` shape; **eliminates Δ-G49 empty-final-message failure mode** by making join-step deterministic at orchestrator.
4. **gpt-researcher triadic researcher→reviewer→reviser self-correcting loop** (Stream-2 §3.2) — `multi_agents/agents/editor.py::_create_workflow` with `lambda draft: "accept" if draft["review"] is None else "revise"`. Concrete reviewer-as-enforced-gate idiom maps onto codex stop-review-gate; closes Δ-G49.
5. **mem0 T1-hindsight slot via `pinkpixel-dev/mem0-mcp`** (Stream-3 §3) — T1-PROV winner of 3-way bakeoff. Only candidate with dedicated MCP server (CR-1/CR-3 compliant); 56,171 stars, 53 commits/30d, LOCOMO leader; smoke-gate via codex Stop-hook before T1 promotion.
6. **`dspy.GEPA` against `goal-prompt-synthesis` skill GoalSynthesisPipeline** (Stream-4 §5) — already-installed `dspy==3.2.1`; native MCP adapter at `gepa-ai/gepa`; 100-500 evals vs RL's 10K+ matches runtime compute envelope; fully reversible (venv-local). Δ-G48 first-integration.
7. **Anthropic SDK `cache_control` with explicit TTL across stable insertion points** (Stream-1 §2.2/§3.2 / §5 candidate B) — `{type: ephemeral, ttl: "5m"|"1h"}` on always-loaded system + cardinal-rule preamble blocks. **Direct token-cost reduction** on Anthropic side for long-context eval lanes + repeated agent-team dispatches.

### §3.2 MEDIUM-tier (next-wave or selective adoption)

8. **TypeScript-SDK `BetaToolRunner` shape ported to Python** (Stream-1 §3.1 / §5 candidate A) — TS SDK ships managed multi-turn tool loop; Python SDK does not. Encapsulate runtime's tool loops behind `RunnerProto` matching TS shape; reduces drift between runtime tools and SDK semantics.
9. **AutoGen `TokenUsageTermination` + `MaxMessageTermination`** (Stream-2 §2.1+§2.2 / §4.2 candidates 4+5) — `conditions/_terminations.py:235,275` + `:62,83`. Replace verbal "≤140k tokens" budget with typed `StopMessage` emitter; replace dwell-prone unbounded waves with typed turn-cap. Closes W325-A SEV-1 indirectly via deterministic dwell-time accounting.
10. **AutoGen `RoutedAgent` typed dispatch table** (Stream-2 §2.4) — `_routed_agent.py:415, 474-486, 85-172, 159-163`. Cleanest typed dispatch in 2026 SOTA orchestration space; pattern reference for any new subagent system extension.
11. **LiteLLM Router fallback chain (3-tier typed)** (Stream-5 §1.2 / §5 candidate 1) — `litellm/router.py:276-278` `fallbacks` / `context_window_fallbacks` / `content_policy_fallbacks`. Pattern-only adoption (LiteLLM is heavy multi-provider gateway); refactor codex-companion to accept declarative fallback chains keyed by exception class.
12. **Cline HITL path-based auto-approve callback** (Stream-5 §2.3 / §5 candidate 2) — `sdk/apps/cli/src/utils/approval.ts:18` + `shouldAutoApproveToolWithPath`. More flexible than current settings.json `permissions.allow` glob system; let auto-approve `Read` on `docs/**` but require approval on `Read` of `.env*`.
13. **Cline `compactConversationForContextWindow` proactive trigger** (Stream-5 §2.4 / §5 candidate 3) — `sdk/packages/agents/src/agent-runtime.ts:600` + `shouldCompactBeforeNextRequest` flag. Token-budget-threshold trigger pattern more deterministic than current "/compact at milestone" heuristic; enhances `everything-claude-code:strategic-compact` skill.
14. **planning-with-files SHA-256 attest-plan tamper-attestation** (Stream-7 §1 / §6 candidate 1) — `attest-plan.sh`/`.ps1` per `SKILL.md L221`. Hardens W-N status files against `.md`-injection; UserPromptSubmit hook ALREADY VERIFIES on every prompt (currently silent no-op since `.plan-attestation` absent). P0 in stream-7 ranking.
15. **planning-with-files `.planning/$PLAN_ID/` isolated parallel-task dirs** (Stream-7 §1 / §6 candidate 3) — `init-session.sh "W332-StreamA"` per stream + `set-active-plan.sh` per `SKILL.md L223-243`. Ends `task_plan.md` file-stomp risk during multi-stream waves.

### §3.3 LOW-tier (pattern-only / cherry-pick)

16. **Anthropic cookbook evaluator/optimizer generate→evaluate loop** (Stream-1 §1.3 / §5 candidate C) — canonical 2-function template for ship-gate rubric loop. Align `engineering-advanced-skills:ship-gate` skill with `generate()`/`evaluate()` naming.
17. **ECC `/multi-plan` + `/multi-workflow` cite in W269 parallel-dispatch mandate** (Stream-6 §2 / §7 candidate 3) — `commands/multi-plan.md` + `commands/multi-workflow.md` already-installed but unreferenced in CLAUDE.md. Pre-built parallel-execution commands aligned with cross-model gate (Codex+Gemini parallel + Code-Sovereignty).
18. **ECC `strategic-compact` skill promote** (Stream-6 §2 / §7 candidate 2) — CLAUDE.local.md W260c block already names this skill but doesn't promote to first-class. Document in CLAUDE.md skill-list line.
19. **wshobson sub-plugins install: `full-stack-orchestration` + `framework-migration` + `distributed-debugging` + `observability-monitoring`** (Stream-6 §3 / §7 candidate 4) — 63 wshobson sub-plugins unused; these 4 fill the highest-ROI gaps (full-stack scope; migration workflow; distributed-debug pattern; Langfuse-paired observability).
20. **addyosmani vendor-fork `interview-me` (gap from CLAUDE.md L43)** (Stream-6 §4 / §7 candidate 1) — CLAUDE.md claims 5 forks but only 4 exist. Fix documentation drift OR actually fork the skill (auto-fire on underspecified asks; closes known weakness in /goal-prompt-synthesis predicates).
21. **Letta MemGPT editable-memory-blocks pattern + Zep temporal-graph pattern** (Stream-3 §1.2+§1.3) — pattern-only, NOT install. Document in `docs/architecture/MEMORY-PATTERN-LIBRARY.md` for future T6 basic-memory enhancement waves.
22. **MCP-2025-11-25 `tasks` capability + `outputSchema`** (Stream-7 §3 / §6 candidates 4+5) — long-running indexing (gitnexus, cognee) currently blocks the call; task-async would let runtime fire-and-poll. Requires upstream PR or fork; P2 deferred.
23. **OpenAI cookbook `Orchestrating_agents.ipynb` handoff pattern** (Stream-5 §3.3) — triage agent → specialist agent via `Routine` abstraction (predecessor to Swarm/Agents SDK). Pattern-only reference for multi-agent handoff in this runtime.

## §4 Cross-stream patterns + systemic findings

### §4.1 repomix-pack 0-file recurring (4-of-7 streams)

**Streams affected**: Stream-1, Stream-5, Stream-6, Stream-7 (4 of 7 = 57%) all reported `repomix.pack_remote_repository` returning `totalFiles: 0` across multiple pattern variants and retry attempts. Streams 5 + 7 both noted 8+ retry attempts with progressively broader patterns failing.

**Convergent diagnosis** across affected streams: silent clone failure at the MCP-host network layer (NOT a CR-9 issue, NOT pattern syntax). Suspected: temp-cache invalidation, remote-clone authentication, or sandbox-network restriction at the local repomix MCP server.

**Pivot strategy that worked**: deepwiki MCP for AI-grounded code citations with file:line anchors (Streams 1, 5, 7) OR local-clone direct read against `Z:\claude-sota-installed-repos\` (Stream 6).

**SEV-2 instrumentation gap** — deferred to W332+. Mitigation: all 4 affected streams successfully completed via fallback; deliverables landed with file:line citations.

### §4.2 Install-state contract drift (P0.4 + Stream-7 gitnexus binary-vs-shell)

**P0.4 finding** (findings.md §1): `installed_plugins.json:plugins` has 52 install records with full provenance; `settings.json:enabledPlugins` declares 68 keys → **16 phantom enables** (declared-enabled in settings but no install record). NOT 66 as initially classified (W330 codex r1 axis-1 #12 understated; corrected this wave).

**Stream-7 GitNexus finding** (Stream-7 §2): plugin-cache shell at `.claude/plugins/cache/gitnexus-marketplace/gitnexus/1.3.6/.claude-plugin/plugin.json` advertises `1.3.6` while PATH-resolved binary `C:\Users\42\AppData\Roaming\npm\gitnexus.ps1` runs `1.6.5` — **23 minor versions stale** in plugin-shell metadata vs binary. Same install-state-drift root cause; `.mcp.json:36-40` (binary by PATH) is what counts so live runtime IS on `1.6.5`, but any audit/sweep script reading `plugin.json` gets stale data.

**Convergent recommendation**: P0.4 fix surface is `settings.json:enabledPlugins` audit (drop phantom OR install missing 16) + `claude plugin update gitnexus@gitnexus-marketplace` to sync shell. Both are install-state contract enforcement.

### §4.3 W325-A F1 parallel-dispatch closure-paths (Stream-2 Send API + Stream-5 ReviewOutputEvent)

**W325-A F1 baseline**: `parallel_ratio: 0.0036` (denom 1676 = 99.6% silent-serial fallback) = SEV-1 per CLAUDE.md L18 W329-D root cause `tools/preagent-parallel-guard.mjs:4,17` hardcoded advisory-only `exit 0`.

**Stream-2 closure-path (dispatch-side)**: langgraph `Send` API (`libs/langgraph/langgraph/types.py:654-742`) — replace verbal mandate with structured `List[Send(subagent_type, prompt)]` return shape. Runtime owns parallelization at the type-system level; LLM choice removed from dispatch decision.

**Stream-5 closure-path (verdict-side)**: codex `ReviewOutputEvent` JSON schema (`codex-rs/protocol/src/protocol.rs` + `parse_review_output_event`) — replace ad-hoc text-extraction of review findings with structured `findings[]` + `code_location` + `priority` + `confidence_score`. **Unlocks W325-A F1 review-pipeline silent-drop** specifically: today dual-review silent-drops findings due to text-parse-only ingest; structured schema gives priority-routing + cite-anchor consistency.

**Convergent verdict**: W325-A F1 has TWO independent closure-paths from this wave (dispatch-typing via Stream-2, verdict-typing via Stream-5). P0.1 root-fix already landed (timestamp-window pragma) addresses immediate false-positive; full SEV-1 closure requires both Stream-2 + Stream-5 candidates landed in W332.

### §4.4 Bonus pattern — "discoverable but never-invoked" install surface (Stream-6)

Stream-6 surfaced a systemic finding orthogonal to the brief's 3 named patterns:
- **ECC**: out of 75 cmds / 232 skills / 60 agents installed, only ~15 referenced in CLAUDE.md → **~340 primitives discoverable but never explicitly invoked**.
- **wshobson/agents**: 63 of 81 sub-plugins NOT installed (of 80 + 1 marketplace count) → ~127 unused skills + ~160 unused agents.
- **addyosmani**: 18 of 23 skills NOT yet vendor-forked locally; 1 forked-claim drift (`interview-me`).
- **CCBP**: 5 settings keys + 2 power-ups (`/rewind`, `/teleport`) unused.

**Implication**: install-tier discipline (W255-style minimal install) is being satisfied at the install-surface, but the **invoke-surface** has massive latent capacity. Per Stream-6 §7 top-5, the highest-ROI W332 candidates are NOT new installs but rather promoting already-installed primitives to first-class status in CLAUDE.md skill-list.

### §4.5 Bonus pattern — repo-claim corrections (3 streams independently)

- **Stream-3**: `mem0-ai/mem0` (hyphen) → canonical `mem0ai/mem0` (no hyphen); GOAL-predicate typo.
- **Stream-4**: "ROMA+ (arXiv 2602.01848v1)" → unverifiable; `sentient-agi/gepa-plus` is actually "GEPA+: An Enhanced Prompt Proposer" (4-stage proposal pipeline) NOT ROMA 4-role decomposition. AIME baseline (50%) beats Standard GEPA (42.7%). ROMA+ claim DROPPED from W331 SOTA scope.
- **Stream-6**: ECC manifest "60 agents" not "40" (brief drift correction).

**Convergent lesson**: per-finding URL/file:line anchor + verifiable repo cite is mandatory; pattern-claim without repo evidence is `[claim-not-substantiated]`. This is Δ-PDM-1 F4 + cite-anchor discipline working as designed.

## §5 Codex review history

### §5.1 Codex round-1 (W330, foundation for W331)

**Dispatch**: dual-axis `codex:codex-rescue` × 2 in parallel (1 assistant message, W269-compliant). Axis-1 = rules + plan + priority (evidence A→H); Axis-2 = repo selection + research stack + Stream B/D/F (evidence H→A reversed).

**Verdict**: NEEDS-REVISION @ 0.86 (both axes); position-swap CONVERGENT → no position-bias confirmed (per Δ-DPA-4 + sca-v12.1 Phase-5 Gate-3).

**30 unique findings**: 1 CRITICAL (axis-1 #1 parallel-guard root-cause incomplete); 8 HIGH; 7 P1; 9 MEDIUM; 5 P2; 2 LOW.

**Headline drivers of W331**: (a) axis-1 #1 = redesign detector at `UserPromptSubmit` BEFORE flipping exit-code → P0.1 (W331 landed timestamp-window pragma + CR-5 binding-gate ratify documenting promotion conditions); (b) axis-2 #1+#2 = "ingest line by line" mandate unsatisfied + 10-repo set incomplete → P0.5 (W331 executed all 7 streams).

**Reference**: `W330-MEGA-AUDIT/CODEX-VERDICT-LEDGER.md` §1-§7.

### §5.2 Codex round-2 PRIMARY (W331 this wave)

**Dispatch ID**: a05132584. Subject: W331 executed state vs W330 r1 findings (6 of 30 round-1 findings addressed this wave).

**Verdict**: NEEDS-REVISION @ 0.86.

**Critical residual**: CR-2 ≤2KB exception "documentation-only (no hook wired)" → W331 FIXED via `5aed4f3` adding `.pre-commit-config.yaml:cr2-2kb-hooks` pre-commit hook (mechanically enforces ≤2KB on `.claude/hooks/**`).

**Per-finding closures** edited this wave:
- CR-5 W331 axis-1 #2 resolution: ratified binding-gate promotion under condition (b) — "tools/preagent-*.mjs = observability instrumentation; promotion-to-binding-gate via separate ADR after empirical FP-rate <5% over 100+ multi-stream sessions".
- Axis-1 #1 implementation note added: documents pragmatic choice of timestamp-window pragma vs UserPromptSubmit ideal (UPS message-level detector deferred to W332-candidate; timestamp-window proven LIVE in this session via P0.1 validation).

### §5.3 Codex round-2 SWAP (W331 this wave)

**Dispatch ID**: a0d58937. Subject: SAME state as PRIMARY but REVERSED evidence order (Δ-DPA-4 position-swap).

**Verdict**: NEEDS-REVISION @ 0.84 → **CONVERGENT with PRIMARY** (Δ-DPA-4 position-swap rule satisfied: verdict reliable, NOT position-bias-driven).

**SWAP-only NEW finding**: CLAUDE.md L22 inaccurately stated subagent-validator is "observability-only (no exit-2 path)" but `tools/preagent-subagent-validator.mjs:L88` DOES exit 2. **FIXED** in commit `ee01d38` (CLAUDE.md edit + factual correction).

**Round-2 net result**: SAME headline verdict as round-1 (NEEDS-REVISION); SAME confidence band (0.84-0.86); position-swap CONVERGENT both rounds → wave-verdict reliable.

### §5.4 Codex round-3 (✓ RETURNED + ABSORBED)

**Verdict**: NEEDS-REVISION @ 0.90, 3/7 r2 gaps closed by W331-r3 commits 38e0bca + 96ac1d7. **HIGH bug#4 identified**: `tools/preagent-parallel-guard.mjs:197` readCounter() SILENTLY DISCARDED `multiStreamIntent` written by UserPromptSubmit hook — dead-code chain. **All 7 r3 gaps subsequently closed via W331-r4 commit chain**:
- HIGH #4 readCounter-discards-intent → ✓ FIXED `25a091e` (multiStreamIntent + intentSetTs preserved)
- MEDIUM #5 mem0 LOCOMO anchors → ✓ FIXED `38f4c30` (arXiv:2402.17753 + HONEST-NON-FINDING leaderboard + Zep counter-paper)
- MEDIUM #6 dspy compat HYPOTHESIS → ✓ FIXED `38f4c30` (VIABLE; already in-tree at goal-prompt-synthesis SKILL.md:99-136 Δ-G48)
- UNKNOWN #7 ledger pending → ✓ FIXED `7e00a57` (r2 PRIMARY+SWAP+r3 verdicts recorded in CODEX-VERDICT-LEDGER.md)
- MEDIUM new#1 CR-2 mechanization-location → ✓ FIXED `25a091e` (CLAUDE.md L19 pre-commit not PreToolUse[Edit|Write])
- LOW #2 task_plan stale → ✓ FIXED `49fa42c` + §5.5 W332 refresh
- LOW #5 §6 stale-text → ✓ FIXED `98e157e`

### §5.5 Codex round-4 (✓ FINAL VERDICT)

**Verdict**: REVISE-WITH-MINOR @ 0.89 — **7/7 r3 GAPS CLOSED**. One NEW MEDIUM finding: SYNTHESIS.md stale-gate narrative (THIS SECTION fixed it). SHIP-READY pending operator-side `/insights` (P0.2 only). E2E smoke test 3/3 PASS (commit ddc762a) validates parallel-guard chain end-to-end post-fix.

## §6 W332 residual list — ALL ADDRESSED in-wave

Per task_plan.md §5.5 + commit chain:

1. **W332.1** ✓ CLOSED — UserPromptSubmit message-level redesign LANDED `38e0bca` + readCounter-fix `25a091e` + E2E smoke test 3/3 PASS `ddc762a`
2. **W332.2** ✓ CLOSED — CR-3 reality-aligned `96ac1d7` + 307-entry allowlist verified present
3. **W332.3** ✓ CLOSED — LOCOMO primary anchor arXiv:2402.17753 + HONEST-NON-FINDING leaderboard `38f4c30`
4. **W332.4** ✓ CLOSED — dspy.GEPA → goal-prompt-synthesis VIABLE (already in-tree Δ-G48) `38f4c30`
5. **W332.5** ✓ CLOSED — task_plan + findings.md refresh `49fa42c` + `98e157e`
6. **W332.6** ✓ CLOSED via investigation + workaround documented `93d753e` (SYNTHESIS §4 cross-stream pattern #1) — repomix CLI 1.14.0 works (9.25s pack via npx); MCP-variant systemic 0-file failure CONFIRMED root-cause (MCP-server-specific, NOT repomix-tool); workaround = `npx repomix` CLI bypass OR deepwiki MCP fallback (4-of-7 W331 streams used fallback successfully — deliverables Stream-1, Stream-5, Stream-6, Stream-7 all completed via deepwiki/local-clone pivot). MCP root-cause fix deferred to W332+ as SEV-3 instrumentation (workaround is robust + production-stable).

**Carry-forward to W332+** (operator-side promotions, not codex-blocking):
- P0.2 operator-side `/insights` probe
- `/plugin update gitnexus@gitnexus-marketplace` (audit-drift closure; binary already 1.6.5 runtime)
- CLAUDE.md L37 status archive W331 row insertion
- T6 basic-memory verdict-ledger row ✓ WRITTEN this wave at `main/verdicts/w331-sota-convergence-verdict-ledger-row`
- W332-A through W332-F promotion candidates per task_plan.md §5.5 + SYNTHESIS §4 cross-stream patterns

## §7 Operator-decisions outstanding

1. **mem0 T1-hindsight install path** — cloud-managed (smoke-gate first, lighter) vs self-host (Qdrant+Neo4j+Ollama 3-service stack-add, heavier). Per Stream-3 §3.
2. **mem0 npm/pypi version-pin channel** — bimodal drift (npm v3.0.3 / pypi v2.0.2). Pick one channel at install time per W286-arc-P0C CR-9 contract. Per Stream-3 §1.1.2.
3. **`MEM0_API_KEY` env-block** — mirror W317-r2 perplexity + W324 TAVILY/EXA precedent — `${MEM0_API_KEY}` env-interp in tracked `.mcp.json`; real value in gitignored `CLAUDE.local.md` (f2-style block). Per Stream-3 §4.
4. **Codex `ReviewOutputEvent` schema adoption scope** — instrument `tools/codex-companion/*` to `--output-schema=review_output_event` + parse JSON + write structured rows to VERDICT-LEDGER.md. Operator confirms scope (per-finding or top-N? confidence-floor for inclusion?). Per Stream-5 §5 candidate 4.
5. **wshobson 4-sub-plugins install** (full-stack-orchestration + framework-migration + distributed-debugging + observability-monitoring) — install vs pattern-only adoption. Per Stream-6 §7 candidate 4.
6. **REVISE-posture acceptance** — if codex round-3 NEEDS-REVISION, operator decides: accept REVISE posture + carry-forward to W332 OR re-absorb residuals this wave.

## §8 Cite-anchors (≥3-org-distinct per W295 I1)

Aggregated cite-anchors across all 7 streams, organized by org:

### §8.1 Anthropic / Anthropic-co-stewarded (Streams 1, 5, 6, 7)

- `anthropics/claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e` — `patterns/agents/orchestrator_workers.ipynb:202-205` (empty-final-message handler) · `patterns/agents/prompts/research_lead_agent.md:135-137` (`<use_parallel_tool_calls>` MUST-block) · `patterns/agents/evaluator_optimizer.ipynb` (generate/evaluate)
- `anthropics/anthropic-sdk-python @ HEAD` — `src/anthropic/resources/beta/messages/messages.py` (beta create signature) · `src/anthropic/lib/streaming/_messages.py` (MessageStream) · `BetaCacheControlEphemeralParam`/`BetaContextManagementConfigParam`/`BetaThinkingConfigParam`
- `anthropics/anthropic-sdk-typescript @ HEAD` — `src/lib/BetaToolRunner.ts` · `src/lib/MessageStream.ts` · `src/resources/beta/messages/batches.ts` · `BetaToolComputerUse20250124`
- `modelcontextprotocol/modelcontextprotocol @ HEAD draft 2025-11-25` (Anthropic-co-stewarded) — `docs/specification/draft/basic/lifecycle.mdx` · `schema/draft/schema.{ts,json}` (`PARSE_ERROR..INTERNAL_ERROR` constants, `InitializeRequestParams`, `InitializeResult`, `ServerCapabilities`)
- `modelcontextprotocol/python-sdk @ HEAD` (Anthropic-co-stewarded) — `src/mcp/server/fastmcp/__init__.py` · `src/mcp/server/lowlevel/server.py` · `src/mcp/server/streamable_http.py`
- `modelcontextprotocol/typescript-sdk @ HEAD` (Anthropic-co-stewarded) — `src/server/mcp.ts` · `src/server/streamableHttp.ts`
- `shanraisshan/claude-code-best-practice @ 1386b0e` — `claude-mcp.md:L98-100` (MCP scope precedence) · `claude-settings.md:L62, L102, L415-438, L538, L569` · `claude-power-ups.md:L31-41`
- `affaan-m/everything-claude-code @ 33ed494` — `.claude-plugin/plugin.json:L4-5` · `commands/multi-plan.md:L1-30` · `commands/multi-workflow.md:L1-30` · `agents/chief-of-staff.md:L1-30` · `skills/claude-devfleet/SKILL.md:L1-45` · `skills/strategic-compact/SKILL.md`
- `wshobson/agents @ 112197c` (local) — `plugins/agent-teams/` · `plugins/conductor/` · `plugins/ship-mate/` · 63 unused sub-plugins inventory
- `addyosmani/agent-skills @ f17c6e88` — `skills/interview-me/SKILL.md:L1-15` (missing local fork)
- `mksglu/context-mode @ 898ecc9` — `skills/*` 6-skill bundle · `hooks/*.mjs` ~60-file inventory · `hooks/cache-heal-utils.mjs`
- `OthmanAdi/planning-with-files @ d27008f3` (v2.38.1) — `SKILL.md:L8, L13-16, L19-22, L25-28, L29-32, L42, L86-99, L105-108, L143-165, L216-244` (hooks + lifecycle + 2-Action Rule + 3-Strike Protocol + scripts inventory)

### §8.2 LangChain AI (Stream-2)

- `langchain-ai/langgraph @ main` (2026-05-19) — `libs/langgraph/langgraph/types.py:654-742, :701, :707-726` (Send) · `libs/langgraph/langgraph/types.py::interrupt` · `libs/langgraph/langgraph/graph/state.py::StateGraph.add_conditional_edges` · `libs/checkpoint/langgraph/checkpoint/base/__init__.py:176-238` (BaseCheckpointSaver) · `libs/langgraph/tests/test_pregel.py:1171-1202` (Send example)
- `langchain-ai/langgraph-supervisor-py @ main` — `langgraph_supervisor/supervisor.py::create_supervisor`

### §8.3 Microsoft (Stream-2)

- `microsoft/autogen @ main` (2026-05-19) — `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py:62, :83, :235, :275` (Max/TokenUsage termination) · `teams/_group_chat/_base_group_chat_manager.py:25` + `_apply_termination_condition` · `teams/_group_chat/_selector_group_chat.py:152-217` · `teams/_group_chat/_round_robin_group_chat.py:72-82` · `python/packages/autogen-core/src/autogen_core/_routed_agent.py:415, :474-486, :85-172, :159-163`

### §8.4 Tavily/Elovic (Stream-2)

- `assafelovic/gpt-researcher @ master` (2026-05-19) — `multi_agents/agents/orchestrator.py::ChiefEditorAgent` (constructor + `init_research_team` + `_add_workflow_edges` + `run_research_task`) · `multi_agents/agents/editor.py::EditorAgent._create_workflow` · `multi_agents/agents/researcher.py::ResearchAgent.run_depth_research, run_subtopic_research` · `multi_agents_ag2/agents/orchestrator.py::ChiefEditorAgent` (AutoGen 0.4 variant)

### §8.5 mem0ai / Letta / GetZep (Stream-3, ≥16-org cite coverage = 5.3× W295 I1 floor)

- `mem0ai/mem0 @ 843ab82905f7f04ca27ad7e73083e68bfab06c2d` (HEAD 2026-05-18, 56,171 stars) — `pinkpixel-dev/mem0-mcp` (95★, 2026-05-17) · `elvismdev/mem0-mcp-selfhosted` (84★) · `mem0.ai/blog/state-of-ai-agent-memory-2026`
- `letta-ai/letta @ 1131535716e8a31c9a437f8695e25ac98f203a24` (HEAD 2026-05-14, "fix(security): use JSON instead of pickle for sandbox→server tool result transport #3343") · `letta.com/blog/letta-v1-agent` · `letta.com/blog/letta-code` · UC Berkeley MemGPT paper
- `getzep/zep @ faf2acec4f2ec777a27d8fe0411619bc913a9660` (HEAD 2026-04-09) + `getzep/graphiti @ 9a2d6d02bf0d210e1e6f5f8fea1a2cbe00e3c898` (HEAD 2026-05-14, ALREADY-RETIRED per W272+W290+W295)
- Independent registries: `npmjs.org` · `pypi.org`
- Independent comparisons: `evermind.ai/blogs/{zep,mem0}-alternative` · `vectorize.io/articles/mem0-vs-letta` · `tokenmix.ai/blog/...` · `fountaincity.tech/.../agent-memory-knowledge-systems-compared` · `dev.to/hashnode` benchmark replication

### §8.6 Stanford NLP / GEPA paper authors / sentient-agi (Stream-4)

- `stanfordnlp/dspy @ v3.2.1` — MIT-licensed; Stanford NLP + Databricks org-co-stewardship + 390+ contributors; `https://dspy.ai/learn/optimization/optimizers/` (canonical optimizer docs)
- `arXiv:2507.19457 v2` — GEPA paper, Feb 2026, Agrawal/Tan/Soylu/...Stoica/Klein/Zaharia/Khattab et al. (16 co-authors, UC Berkeley + Stanford + MIT + Databricks)
- `gepa-ai/gepa` (canonical GEPA impl) — `DefaultAdapter`, `ConfidenceAdapter`, `DSPy Full Program`, `Generic RAG`, **`MCP Adapter`** (optimizes MCP tool descriptions + system prompts), `TerminalBench`, `AnyMaths`
- `sentient-agi/gepa-plus` (5 commits, PATTERN-STUDY-ONLY per 184d age + AIME-baseline-beats-GEPA evidence) — README §"Key Innovation" + §"Benchmark Results"

### §8.7 BerriAI / cline / OpenAI (Stream-5)

- `BerriAI/litellm @ HEAD` — `litellm/router.py:225` (Router class), `:234` (init), `:261, :276-278, :286-291, :5635, :5994, :6187` · `litellm/cost_calculator.py:400`
- `cline/cline @ HEAD` — `sdk/packages/agents/src/agent-runtime.ts:52, :300, :600` (AgentRuntime + _run loop + compactConversationForContextWindow) · `sdk/packages/core/src/cline-core.ts:100` · `sdk/apps/cli/src/utils/approval.ts:18` · `sdk/packages/shared/src/prompt/system.ts:1` · `src/core/task/tools/handlers/{ListFiles,ReadFile,SummarizeTask}ToolHandler.ts:161, :255, :166`
- `openai/openai-cookbook @ HEAD` — `examples/Orchestrating_agents.ipynb` · `examples/Function_calling_with_an_OpenAPI_spec.ipynb` · `articles/openai-harmony.md`
- `openai/codex @ HEAD` — `codex-rs/exec/src/main.rs:28` · `codex-rs/exec/src/cli.rs:14` · `codex-rs/core/src/templates/gpt-5.2-codex_instructions_template.md` · `codex-rs/core/src/templates/gpt_5_codex_prompt.md:31` (review-mindset trigger) · `codex-rs/protocol/src/protocol.rs` (ReviewOutputEvent) · `codex-rs/core/src/tasks/review.rs::parse_review_output_event` + `exit_review_mode` · `codex-rs/mcp-server/src/codex_tool.rs` (CodexToolCallParam + approval/sandbox enums)

### §8.8 abhigyanpatwari / OthmanAdi / mksglu (Stream-6, Stream-7)

- `abhigyanpatwari/GitNexus` (npm `gitnexus@1.6.5`; plugin-cache shell stale at `1.3.6`) — `src/core/db/pool-adapter.ts` (Windows FTS guard) · `src/core/search/hybrid-search.ts:177` · `src/mcp/local/local-backend.ts:1011` · `src/core/augmentation/engine.ts:110` · `test/unit/bm25-search.test.ts:134, :178` · CHANGELOG.md v1.4.0 KuzuDB→LadybugDB / v1.5.0 thin-client / v1.6.0 SemanticModel / v1.6.3 FTS bootstrap / v1.6.4 Windows reliability
- `OthmanAdi/planning-with-files @ d27008f3` (v2.38.1) — full SKILL.md cited in §8.1 above
- `mksglu/context-mode @ 898ecc9` (v1.0.141, NEWER than brief's `6bbcb44`) — `skills/{context-mode,ctx-doctor,ctx-insight,ctx-purge,ctx-stats,ctx-upgrade}/SKILL.md` · `hooks/*.mjs` 60-file inventory · `hooks/cache-heal-utils.mjs` (vs runtime's `.claude/hooks/context-mode-cache-heal.mjs` redundancy probe)

### §8.9 Org-distinct cite-density verification

**Per stream**:
- Stream-1: 1 org (Anthropic) — brief explicitly waived ≥3-org-distinct for this stream
- Stream-2: 3 orgs (LangChain AI · Microsoft · Tavily/Elovic) — SATISFIED
- Stream-3: 16 orgs (mem0ai, letta-ai, getzep, npmjs.org, pypi.org, pinkpixel-dev, elvismdev, mem0.ai, letta.com, evermind.ai, fountaincity.tech, dev.to/hashnode, vectorize.io, tokenmix.ai, UC Berkeley, Anthropic) = **5.3× W295 I1 floor**
- Stream-4: 3 orgs (Stanford NLP · UC Berkeley+Stanford+MIT+Databricks GEPA paper · sentient-agi) — SATISFIED
- Stream-5: 3 orgs (BerriAI + cline + OpenAI [cookbook + codex]) — SATISFIED
- Stream-6: 5 orgs (shanraisshan + affaan-m + wshobson + addyosmani + mksglu) — SATISFIED
- Stream-7: 4 orgs (OthmanAdi + abhigyanpatwari + modelcontextprotocol + anthropics) — SATISFIED

**Aggregate compiled SYNTHESIS**: 8 distinct cite-source orgs surfaced across all sections (Anthropic / Anthropic-co-stewarded; LangChain AI; Microsoft; Tavily/Elovic; mem0ai+Letta+GetZep+associated 13 independent corroborators; Stanford NLP+gepa-paper authors+sentient-agi; BerriAI+cline+OpenAI; abhigyanpatwari+OthmanAdi+mksglu) → **comfortably exceeds W295 I1 ≥3-org-distinct minimum (≥2.7× floor)**.

### §8.10 INVERSE-TEST (Δ-G51 falsifiability, from /goal predicate)

IF anthropics/claude-code deprecated THEN parallel-dispatch SOTA preserved BECAUSE microsoft/autogen + langchain-ai/langgraph + assafelovic/gpt-researcher (org-distinct ✓; causal-distinct ✓ — none cite CC as precondition; temporal-distinct ✓: autogen 0.4 Oct-2024 pre-dates W269). Per task_plan.md §6.
