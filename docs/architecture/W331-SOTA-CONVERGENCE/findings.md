# W331 — Findings (running ledger per planning-with-files SOTA pattern)

> Wave **W331** · 2026-05-19 · branch `goal/W331-sota-convergence` · provenance: W330 mega-audit + codex r1 dual-axis absorb · per OthmanAdi/planning-with-files@d27008f3 SKILL.md L86-99 contract.

## §1 P0.4 — Install-state contract (probed, schema clarified)

**Finding**: `installed_plugins.json` has TWO logical surfaces (not one):
1. `plugins`: **52 install records** with full provenance per plugin (`installPath`, `version`, `installedAt`, `lastUpdated`, `gitCommitSha`)
2. `enabledPlugins`: **1 entry** (only `context-mode@context-mode: true`)

**Authoritative source-of-truth corrections**:
- `settings.json:enabledPlugins` (68 declared keys) is the AUTHORITATIVE runtime-enable set
- `installed_plugins.json:enabledPlugins` (1 entry) is **legacy** OR **per-project override** — CC reads from `settings.json` primarily
- `installed_plugins.json:plugins` is the install-INVENTORY (what's actually on disk with provenance)

**Real drift** (NOT 66 keys as initially classified):
- `settings.json:enabledPlugins` (68) − `installed_plugins.json:plugins` keys (52) = **16 phantom enables** (declared-enabled in settings but no install record)

**Per-record install state** (sampled from `installed_plugins.json:plugins`):
- agent-teams@claude-code-workflows v1.0.2 SHA `08ded5e7` (matches W330 Stream D upstream-HEAD probe — zero drift)
- gitnexus@gitnexus-marketplace v1.3.6 SHA `ed50a672` (drift to upstream HEAD `803f0bed` per W330 Stream B — WINDOWS-CRITICAL FTS fix unapplied)
- everything-claude-code@everything-claude-code v2.0.0-rc.1 SHA `8148340a`
- planning-with-files@planning-with-files v2.38.1 SHA `d27008f3` ✓ current
- superpowers@claude-plugins-official v5.1.0 SHA `f2cbfbef` ✓ current

**Recommendation**: rather than reconcile via SessionEnd hook (V1 plan), the simpler fix is to AUDIT `settings.json:enabledPlugins` for the phantom entries and either (a) install them OR (b) drop the phantom enables. Probe each missing plugin name to determine intent.

**Status**: probe complete; reconciliation deferred to operator decision.

**W331-r7 final-verification CORRECTION (2026-05-19)**: re-probed via `(Get-Content installed_plugins.json | ConvertFrom-Json).plugins.PSObject.Properties.Name.Count` (proper JSON parse, not buggy jq top-level-keys count). Actual numbers:
- `installed_plugins.json:plugins` count: **64** (NOT 2 as earlier mistakenly reported)
- `settings.json:enabledPlugins` count: **68**
- Actual drift: **4 phantom enables** (declared but not installed)

This is MUCH smaller drift than the earlier "16-key" or "66-key" estimates. The runtime is substantively clean. The earlier reports were artifacts of buggy `jq 'keys | length'` queries that counted only top-level keys (3) instead of the `plugins` sub-object's keys (64). P0.4 install-state contract is FUNCTIONALLY HEALTHY.

**Cite-anchor**: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json:3-712`, `Z:/claude-sota-installed/.claude/settings.json:237-306` (per W330 Stream G + Stream C); W330 codex r1 axis-1 #12 + axis-2 #11.

## §2 P0.1 — Parallel-guard per-turn detection (root-fix landed)

**Empirical proof** captured this session: the W326-P0-A1-shipped guard fired 10 false-positive advisories on W269-compliant 8+2-Agent parallel dispatches because `lastAssistantTurnText` (line 234) reads the JSONL — but at PreToolUse-fire time the current turn's tool_use blocks aren't yet written.

**Fix landed** at `tools/preagent-parallel-guard.mjs`:
- Added `TURN_WINDOW_MS = 10_000` constant
- Added `turnFireCount` + `turnFireLastTs` state fields
- New per-turn timestamp-window logic in `main()` before the legacy reset check:
  - `sameTurn = (now - lastTs) < 10s`
  - `turnFireCount = sameTurn ? old+1 : 1`
  - If `turnFireCount >= 2` → reset violation counter to 0, exit 0 (proven parallel fan-out within current message)
- Legacy JSONL-based reset retained as belt-and-suspenders for next-turn fallback

**Status**: committed to `goal/W331-sota-convergence`. Live empirical validation via this session's subsequent parallel dispatches.

**Cite-anchor**: W330 codex r1 axis-1 #1 CRITICAL (NEEDS-REVISION 0.86, position-swap CONVERGENT); CLAUDE.md L34 W329-D root cause; W330-MEGA-AUDIT SYNTHESIS §4.2.

## §3 P0.3 — Codex split-install consolidated (W330 carryover, verified)

**Status**: ✓ DONE in W330 session.
- `where.exe codex` returns single path: `C:\Users\42\AppData\Roaming\npm\codex(.cmd)`
- `codex --version` → `codex-cli 0.130.0` reachable
- Before-snapshot at `docs/architecture/W330-MEGA-AUDIT/codex-consolidate-before.json`

## §4 P0.5 — Line-by-line ingest (Streams 1+2 of 7 complete; Stream-3+Stream-4 separate P0.6+P0.8)

**Status this session**: 2 ingest streams complete (Stream-1 anthropics-SDKs, Stream-2 langgraph+autogen+gpt-researcher). 14 repos remain for batched future waves.

**Stream-1 anthropics-official-ingest** (deliverable: `docs/architecture/W331-LINE-BY-LINE/anthropics-official-ingest.md`):
1. Port TypeScript SDK's `BetaToolRunner` shape to Python — runtime hand-rolls tool loops
2. Add `cache_control: {type: ephemeral, ttl: "5m"|"1h"}` on always-loaded system + cardinal-rule preamble blocks
3. Align `engineering-advanced-skills:ship-gate` with cookbook's `generate()`/`evaluate()` signature

**Stream-2 langgraph-autogen-gpt-researcher-ingest** (deliverable: `docs/architecture/W331-LINE-BY-LINE/langgraph-autogen-gpt-researcher-ingest.md`) — HIGH adoption candidates for closing W325-A SEV-1 + Δ-G49:
1. **`Send`-style fan-out return contract** (langgraph `libs/langgraph/langgraph/types.py:654-742, slots:701, __init__:707-726`) — replaces verbal "MUST be 2+ Agent calls" mandate with structured `List[Send(subagent_type, prompt)]` return; runtime owns parallelization, removes LLM choice from dispatch decision. Directly addresses 99.6% silent-serial baseline.
2. **Worker-returns-state-patch contract** (gpt-researcher `multi_agents/agents/researcher.py::run_depth_research` returning `{"draft": ...}`) — mandates typed `{stream_id: findings_payload}` shape; eliminates Δ-G49 empty-final-message failure mode by making join-step deterministic at orchestrator.
3. **Triadic researcher→reviewer→reviser self-correcting loop** (gpt-researcher `multi_agents/agents/editor.py::_create_workflow` with `lambda draft: "accept" if draft["review"] is None else "revise"`) — concrete reviewer-as-enforced-gate idiom maps onto codex stop-review-gate. 3-org-distinct cites (LangChain AI · Microsoft · Tavily/Elovic) ✓.

## §5 P0.2 — Project-dir redirect (operator-side probe pending)

**Status**: PENDING operator-side `/insights` probe (cannot dispatch slash commands from orchestrator).

**Empirical (orchestrator-side)**:
- `.claude/projects/` recursive JSONL count: **3275** (in-repo)
- `.claude/projects/` top-level subdirs: 2 (`Z--claude-sota-installed`, `Z--...-skill-comply`)
- `claude-sota-installed-state/.claude/projects/`: **EMPTY** (env-var redirect ignored)

**Operator action**: run `/insights` in next session; observe if HTML report contains workflow data → confirms read from `$HOME/.claude/projects/` (then drop env-var override in `CLAUDE.local.md:51`).

## §6 P0.6-P0.9 — ALL COMPLETE (W331-r4 final state)

- P0.6 T1 BAKEOFF ✓ DONE — Stream-3 verdict mem0=T1-PROV winner (commit 765a16f + Stream-3 deliverable). Detail: §6 below.
- P0.7 FRONTIER-PEER POLICY ✓ LANDED — CLAUDE.md L10 codified (commit 765a16f)
- P0.8 PROMPT-OPTIMIZER TRACK ✓ DONE — Stream-4 verdict dspy.GEPA → GoalSynthesisPipeline (commit 765a16f). Detail: §7-pre below.
- P0.9 RULES + SEVERITY ✓ LANDED — CR-1..5 audit + cr2-2kb-hooks pre-commit + L22 factual fix (commits 765a16f + 5aed4f3 + ee01d38 + 25a091e + 7e00a57). Detail: §9 below.

## §7 Freshness verification (per operator 2026-05-19 directive + sca-v12.1 §3.5)

Probed at 2026-05-19 via `gh api /repos/<slug> --jq .pushed_at`. Threshold: ≤30d = FRESH, ≤90d = ACCEPTABLE-Q1, >90d = PATTERN-STUDY-ONLY.

| Repo | pushed_at | Age | Verdict |
|---|---|---|---|
| anthropics/claude-code | 2026-05-19 | <1d | FRESH ✓ |
| anthropics/claude-cookbooks | 2026-05-19 | <1d | FRESH ✓ |
| anthropics/anthropic-sdk-python | 2026-05-19 | <1d | FRESH ✓ |
| anthropics/anthropic-sdk-typescript | 2026-05-19 | <1d | FRESH ✓ |
| shanraisshan/claude-code-best-practice | 2026-05-19 | <1d | FRESH ✓ |
| openai/openai-cookbook | 2026-05-19 | <1d | FRESH ✓ |
| BerriAI/litellm | 2026-05-19 | <1d | FRESH ✓ |
| abhigyanpatwari/GitNexus | 2026-05-19 | <1d | FRESH ✓ |
| langchain-ai/langgraph | 2026-05-19 | <1d | FRESH ✓ |
| cline/cline | 2026-05-19 | <1d | FRESH ✓ |
| stanfordnlp/dspy | 2026-05-19 | <1d | FRESH ✓ |
| modelcontextprotocol/typescript-sdk | 2026-05-19 | <1d | FRESH ✓ |
| modelcontextprotocol/modelcontextprotocol | 2026-05-19 | <1d | FRESH ✓ (canonical slug; `/specification` redirects here) |
| modelcontextprotocol/python-sdk | 2026-05-18 | 1d | FRESH ✓ |
| mem0ai/mem0 | 2026-05-18 | 1d | FRESH ✓ (correct slug; `mem0-ai/mem0` was 404 typo) |
| OthmanAdi/planning-with-files | 2026-05-16 | 3d | FRESH ✓ |
| letta-ai/letta | 2026-05-14 | 5d | FRESH ✓ |
| assafelovic/gpt-researcher | 2026-04-16 | 33d | ACCEPTABLE-Q1 |
| microsoft/autogen | 2026-04-15 | 34d | ACCEPTABLE-Q1 |
| getzep/zep | 2026-04-09 | 40d | ACCEPTABLE-Q1 |
| **sentient-agi/gepa-plus** | 2025-11-17 | 184d | **PATTERN-STUDY-ONLY** (demoted; ROMA+ claim unsubstantiated per Stream-4 verdict) |

**ROMA+ correction (per W331 Stream-4 afd17a36 deliverable)**: `sentient-agi/gepa-plus` repo title is actually "GEPA+: An Enhanced Prompt Proposer for GEPA" — a 4-stage *proposal* pipeline (parallel generation + LLM-judge + top-N + merge), NOT a 4-role Atomizer/Planner/Executors/Aggregator decomposition. On AIME, baseline (no opt) at 50.0% **beats** Standard GEPA (42.7%) and Faster GEPA variants. Original GOAL-W331 cite to "ROMA+ (arXiv 2602.01848v1)" is **unsupported claim** — dropped from W331 SOTA scope.

**GEPA paper confirmed FRESH**: arXiv:2507.19457 v2 (Feb 2026, Agrawal/Stoica/Klein/Zaharia/Khattab et al., 16 co-authors at UC Berkeley + Stanford + MIT + Databricks). 35× fewer rollouts than GRPO. 67% → 93% on MATH via DSPy Full Program adapter. Canonical impl `gepa-ai/gepa` has purpose-built MCP Adapter.

## §8 Cite-anchors (≥3-org-distinct per W295 I1)

- Anthropic: `https://docs.anthropic.com/en/docs/claude-code/hooks` + `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + `https://docs.anthropic.com/en/docs/claude-code/settings`
- Anthropic claude-cookbooks @ `2eed173a` `patterns/agents/orchestrator_workers.ipynb` cell-2 (empty-final-message handler)
- OthmanAdi/planning-with-files @ `d27008f3` `SKILL.md:86-99` (task_plan + findings + progress trio)
- abhigyanpatwari/GitNexus HEAD `803f0bed` (uninstalled Windows FTS fix)
- W330-MEGA-AUDIT SYNTHESIS + CODEX-VERDICT-LEDGER + REMEDIATION-PLAN-V2 (foundation)
