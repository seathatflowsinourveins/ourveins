# Gap Matrix — Current vs SOTA per Architecture Dimension

**Snapshot:** 2026-05-10 (Wave 134 Fire 2)
**Scoring framework:** SRA 10-dimension gate (per `Z:\claude-sota-installed\.claude\rules\sota-research-architecture.md`)
**Cross-model T1 status:** PENDING per dimension; codex T1 e2e dispatched in subsequent fires
**Cross-ref:** `00-master-tracker.md` for methodology, `01-current-state-baseline.md` for inventory

> **Verdict legend** (per SRA §Convergence verdict): **INSTALL** (9-10 + D1+D6 PASS) / **DOWNGRADE-WITH-DISCLOSURE** (7-8) / **DEFER** (5-6 OR D1/D6 ambiguous) / **REJECT** (<5 OR D1+D6 FAIL)
> **Replacement marker** (per SRA D2+D10): replacement_age MUST ≤ incumbent_age AND replacement satisfies D1-D10 independently for use-class

---

## Dimension 1 — Topology / orchestration

### Current state
Claude Code CLI orchestrates; codex (GPT-5.5) reviews per T1-T7 lifecycle. Subagent fan-out via Agent tool with `isolation: worktree`. cwc-long-running-agents 5 primitives. No DAG dispatcher.

### Gap analysis

| Gap | Current | SOTA candidate | SRA verdict | Replacement-of |
|---|---|---|---|---|
| G1.1 No mechanical eval-orchestrator | operator-driven /loop convergence | superpowers `subagent-driven-development` per-task dispatch + 2-stage review (already INSTALLED) | **INSTALL** for procedure operationalization (D1✅ MIT D2✅ active D6✅ D7✅ Anthropic OFFICIAL bundle) | extends current /loop pattern |
| G1.2 No DAG mission dispatcher | manual sequential fires | claude-devfleet (ECC) — REFERENCE-ONLY (MCP backend `:18801` not wired) | **DEFER** — D6 FAIL (HARD-GATE on MCP that's not installed in eee); pivot to native Agent fan-out + TaskList DAG | n/a |
| G1.3 No mechanical single-level fork enforcement | policy-only | mechanical hook checking `agent_id` parent vs grandchild via SDK `_SubagentContextMixin` | **DEFER** — TIER-3 LOCAL-COMPOSITION; codify when n=2+ violation observed | n/a (policy) |
| G1.4 Missing cwc-long-running activation telemetry | scripts at `.local/cwc/` (5 primitives) but no usage metrics | per Wave 123 Ship 3 — phased activation already shipped | **INSTALL** — confirm wired status (Phase 1 of Wave 123) | n/a |

### Dimension 1 SOTA replacements proposed

- **None** — current topology is SOTA-aligned (Anthropic CC + codex-plugin-cc + superpowers + ralph-loop). The "ultimate" architecture extends what exists; doesn't replace it.

---

## Dimension 2 — Memory / knowledge

### Current state
L1 mcp-memory-service v10.51.3 INSTALLED (sqlite_vec backend); L2 Qdrant v1.17.0 STAGED-RUNNING but MCP unwired; L3 Graphiti v0.29.0 PARTIAL (FalkorDB UP, no embeddings); L4 wiki CITE-ONLY.

### Gap analysis

| Gap | Current | SOTA candidate | SRA verdict | Replacement-of |
|---|---|---|---|---|
| G2.1 L2 MCP not wired | Qdrant container UP at default port; no `mcp__qdrant__*` tools | qdrant/mcp-server-qdrant (Qdrant OFFICIAL — TIER-1) | **INSTALL** (D1✅ Apache-2.0 D2✅ TIER-1-OFFICIAL maintainer D6✅ MCP standard D7✅ Anthropic ships qdrant-skills plugin) | wires existing L2 container |
| G2.2 L3 needs `OPENAI_API_KEY` | Graphiti server cloned at `.local/graphiti/mcp_server/main.py` but env not set | (a) procure OPENAI_API_KEY OR (b) configure alt-provider (LiteLLM proxy with Anthropic-only routing) | **INSTALL — Path B** (D1✅ D2✅ active D6✅ D7✅ Anthropic-aligned via LiteLLM proxy) | unblocks existing L3 install |
| G2.3 No L4 wiki implementation | Karpathy gist documented, not operationalized | Karpathy 3-layer wiki structure (chronological JSONL + topic index + compiled wiki) — already partially implemented per `karpathy-adapted.md §5` mapping | **INSTALL — formalize** existing surfaces (`.claude/state/*.jsonl` = Layer 1; `MEMORY.md` = Layer 2; `docs/karpathy-llm-wiki-practice.md` = Layer 3) | n/a (existing artifacts get explicit role labels) |
| G2.4 No semantic dispatch | direct tool calls, no router | semantic-router (rtk-ai or aurelio-ai) — claude-side dispatch | **DEFER** — task #61 PILOT pending; SRA D6 ambiguous (use-class-fit unverified) | n/a (orthogonal) |
| G2.5 No cognee HTTP-supervisor | BLOCKED per `iter3a-install-plan.md §C1` (cognee-mcp twice-broken) | cognee-mcp HTTP-supervisor migration (upstream issue) | **DEFER** — D5 STALE (active maintenance unverified); revisit when upstream lands HTTP-supervisor | sister to L3 (overlapping) |
| G2.6 No SQL audit-warehouse | JSONL trail at `.claude/state/*.jsonl` not SQL-queryable | dbhub MCP (per `agent-harness-fit-verification.md §Probe 7.b`) — DEMAND-CREATES-NEW-WORKFLOW.b STUDY-PILOT eligible WITH explicit JSONL→SQLite ETL path | **DEFER — STUDY-PILOT** if operator commits to ETL build; otherwise REJECT-FOR-FIT | n/a (new workflow class) |

### Dimension 2 SOTA replacements proposed

- **G2.1 L2 wiring**: install `qdrant/mcp-server-qdrant` to expose existing Qdrant container as MCP — closes the "container UP but no tools" gap
- **G2.2 L3 unblock**: Path B alt-provider via LiteLLM proxy (CR-7 Phase 1-friendly) OR procure OPENAI_API_KEY (Path A operator decision)
- **G2.3 L4 formalization**: relabel existing JSONL/MEMORY.md/wiki-practice as Karpathy 3-layer per `karpathy-adapted.md §5` mapping; no new install — taxonomic clarity ship

---

## Dimension 3 — Cross-model verification

### Current state
T1-T7 lifecycle hooks INSTALLED-AMBER (WARN mode); BRIDGE-MODE GPT-5.5 dispatch operational; Path P (codex exec foreground+tee) + Path D (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) recovery paths documented.

### Gap analysis

| Gap | Current | SOTA candidate | SRA verdict | Replacement-of |
|---|---|---|---|---|
| G3.1 T1 in WARN mode | gates fire WARN, edits proceed | Promote to STRICT/FAIL_CLOSED via env per CR-7 Phase 2 trigger | **INSTALL — Phase 2 transition** (D1+D6 PASS for own runtime) | flips existing config |
| G3.2 T5 `/plan-codex-review` status unclear | sibling-rule references but install state opaque | Verify install + activate via slash command | **DEFER** — needs mid-fire probe to determine actual install status | n/a |
| G3.3 No verdict-aggregation hook | operator manually reads `.claude/state/codex_review_HEAD_*.txt` | New PostToolUse hook reading verdict files into structured TaskCreate | **DEFER** — TIER-3 LOCAL-COMPOSITION; complexity not yet justified | n/a |
| G3.4 FM-17.f billing-class blocker | Path D unset (default); Path P operational | Set `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` for fan-out Waves declaring 3-5 BRIDGE-MODE dispatch | **INSTALL — operator-discipline** (per CLAUDE.local.md ENV (h) operational guidance) | n/a |
| G3.5 No automated codex T1 timeout HONEST-NON-FINDING fallback | Pattern B operator-discipline | Mechanical hook detecting timeout + auto-Pattern-B disposition emit | **DEFER** — TIER-3 LOCAL-COMPOSITION; n=current only ~5 same-arc; promote at n=5 firm | n/a |

### Dimension 3 SOTA replacements proposed

- **None** — current cross-model topology is SOTA-locked per `cross-model-consensus.md` (Anthropic CC + OpenAI codex). Improvements are configuration shifts (STRICT mode) + opt-in env vars, not replacements.

---

## Dimension 4 — Plugin / skill ecosystem

### Current state
26 plugins enabled across 11 marketplaces; 1,556 SKILL.md files; 4 meta-skills auto-fire (using-superpowers / using-agent-skills / skill-comply / skill-creator).

### Gap analysis

| Gap | Current | SOTA candidate | SRA verdict | Replacement-of |
|---|---|---|---|---|
| G4.1 mattpocock/skills (62k★ MIT) NOT INSTALLED | listed PLANNED in §3 manifest | `/plugin marketplace add mattpocock/skills` then `/plugin install` | **INSTALL** (D1✅ MIT D2✅ active D3✅ 62k stars not fresh-paint D4✅ TIER-2 named-author Matt Pocock D5✅ active D6✅ D7✅ D8✅ widespread D10 n/a — addition) | n/a (additive) |
| G4.2 Hookify still cached (DISABLED) | settings says false, cache has active PIDs | After CC restart, cache will respect disabled state OR W134-F2 patch ensures import-resilient | **POST-RESTART CONFIRM** — fix shipped in W134-F2 makes plugin import-resilient regardless | n/a (operational fix) |
| G4.3 ECC v2.0.0-rc.1 D6 risk | RC version per CR-9 today-release-auto-upgrade | (a) keep RC + monitor (b) downgrade to last stable | **DEFER — Path A keep RC** until D5 ABANDON signal observed; document caveat | n/a |
| G4.4 No automated skill registry-portability eval | operator manually reviews skill catalogs | Fire 11 candidate per `research-protocol.md §"Curated CC-ecosystem catalogs"` (alirezarezvani/claude-skills 305 stdlib-only Python tools) | **DEFER** — registry-portability-eval queued | n/a |
| G4.5 v63/v64/v65 kit content extraction | task #74 done — 24 MD + 6 agents + 7 skills extracted | Validate via runtime presence + cross-ref decision tracker | **VERIFY** (operational check; no install) | n/a |
| G4.6 anthropic/cookbook missing as install-class | cite-only at `Z:/repos/deps/anthropic-cookbook` | TIER-1 OFFICIAL Anthropic recipes (`cookbook.anthropic.com`) — cite-class only; no install-class equivalent | **CITE-ONLY** — D6 FAIL (use-class is documentation, not runtime install) | n/a |

### Dimension 4 SOTA replacements proposed

- **G4.1 mattpocock/skills installation** — direct `/plugin marketplace add` + `/plugin install`
- **G4.4 skill-registry portability eval** — fire 11 candidate to compare 1,556 active skills vs alirezarezvani/claude-skills 540 SKILL.md
- **No replacements for ECC RC**: keep current RC pending D5 stale signal

---

## Dimension 5 — Hooks / gates

### Current state
23 PreToolUse + 15 PostToolUse + 7 other-event hooks = 45 total. INSTALLED-AMBER for codex T1-T7. Several ECC hooks DISABLED for overhead.

### Gap analysis

| Gap | Current | SOTA candidate | SRA verdict | Replacement-of |
|---|---|---|---|---|
| G5.1 fm17d_stall_detector.py DISABLED | 100% schema-rot in CC v2.1.119/132 | Fix script to parse current SubagentStop input shape OR remove if unfixable | **DEFER** — pending SubagentStop schema doc + fix; 1-day budget | repairs broken script |
| G5.2 codex T1-T7 in WARN mode | INSTALLED-AMBER | Promote to STRICT per CR-7 Phase 2 (Tier 1a INSTALLED + smoke-PASS) | **INSTALL — Phase 2 transition** | flips existing |
| G5.3 No deny-emitting test coverage | per `layered-gates-architecture.md §9` HARD GATE | Add `tests/test_<hook>_security.py` for each DENY-emitting hook (safety_guard.py + agent_plan_readonly_bash_guard.py) | **INSTALL** (D6 critical — without test gate, safety bug class repeats per cite codex T6 HIGH 2026-04-27) | n/a |
| G5.4 ECC governance-capture spawning Node every Edit | ~200ms/edit overhead, no consumer | DISABLED per `ECC_GOVERNANCE_CAPTURE=0` (already mitigated) | **VERIFIED** | n/a |
| G5.5 Hookify CLAUDE_PLUGIN_ROOT not exported | W134-F2 patch landed (8 files) | Confirm patch resilience post CC restart | **VERIFIED — W134-F2** | n/a |

### Dimension 5 SOTA replacements proposed

- **G5.3 deny-hook test coverage** — write security regression tests for `safety_guard.py` + `agent_plan_readonly_bash_guard.py` per `layered-gates-architecture.md §9` HARD GATE

---

## Dimension 6 — Eval / benchmark / observability

### Current state
promptfoo v0.121.11, deepeval v4.0.0, openlit (OTel-native), Phoenix MCP, ccusage. No persistent regression eval CI.

### Gap analysis

| Gap | Current | SOTA candidate | SRA verdict | Replacement-of |
|---|---|---|---|---|
| G6.1 No regression eval CI | each fire's smoke probes ad-hoc | `evals/codex_miss_cases.jsonl` corpus + `run_codex_miss_eval.py` runner per `cross-model-consensus.md §"Eval-case mandate"` | **INSTALL** (Phase 1 deterministic DSL — D1✅ D2✅ D6✅) | n/a (additive) |
| G6.2 Phoenix UNDER-utilized | INSTALLED but not as primary observability | Wire codex_review JSONL → Phoenix tracing | **DEFER** — TIER-3 LOCAL-COMPOSITION ETL ship | extends G6.1 |
| G6.3 Langfuse / OpenLLMetry not installed | Phoenix is incumbent | Langfuse (`https://langfuse.com`) — D1 (MIT), D2 (active), D6 (compatible)... compare to Phoenix | **DEFER** — incumbent Phoenix wins D2 freshness gate; revisit if Phoenix stale signal | sister to G6.2 |
| G6.4 No SWE-bench / GAIA / HumanEval scaffold | per `iter3a-install-plan.md §C4` REJECTED out-of-scope | Maintain REJECT — these are research-eval frameworks, not runtime primitives | **REJECT-FOR-FIT** D6 FAIL (eval frameworks vs runtime use-class) | n/a |
| G6.5 No formal benchmark CI | each fire ad-hoc | `pytest -m benchmark` with thresholds + GitHub Actions OR local cron | **DEFER** — TIER-3 LOCAL-COMPOSITION; defer until G6.1 corpus stabilizes | n/a |

### Dimension 6 SOTA replacements proposed

- **G6.1 codex-miss eval corpus**: install Phase 1 deterministic DSL (`contains_all` / `absent_all` / `regex_all` / `deferred`) — adapts cross-model-consensus.md §"Eval-case mandate" to eee runtime
- **G6.2 Phoenix wire-up** (deferred until G6.1 stabilizes): ETL to wire codex JSONL trails → Phoenix tracing layer

---

## Dimension 7 — Token efficiency

### Current state
RTK INSTALLED (binary; init pending); ccusage; context-mode v1.0.111; repomix MCP; `/compact` + `/rewind`; 12+ env vars for token limits.

### Gap analysis

| Gap | Current | SOTA candidate | SRA verdict | Replacement-of |
|---|---|---|---|---|
| G7.1 RTK init pending | binary on disk per task #61 | `rtk init -g` per `iter3a-install-plan.md §B1` | **INSTALL** (D1✅ MIT D2✅ active D6✅ — VERY HIGH leverage per Wave 118 Ship A2 estimate) | n/a (additive) |
| G7.2 No semantic-router | direct tool calls | rtk-ai/icm OR aurelio-ai/semantic-router per Wave 118 Ship A4 | **DEFER — STUDY-PILOT** (D6 ambiguous; needs eee-fit verification) | n/a |
| G7.3 No deepagents-style pre-emptive arg truncation | reactive `/compact` at 80% | Adapt deepagents `TruncateArgsSettings` pattern per `team-orchestration.md §"Pre-emptive arg truncation discipline"` | **DEFER — DOC-ONLY** (cite-class; eee uses CC CLI not Python SDK) | n/a |
| G7.4 No prompt-cache prefix audit | not measured | Audit env-block + .mcp.json prefix stability per `parallel-sessions.md §P11` | **DEFER** — measurement-class; queue separate ship | n/a |
| G7.5 Multiple env vars overlap | `BASH_MAX_OUTPUT_LENGTH` + `MAX_MCP_OUTPUT_TOKENS` etc. | Audit env-vars for redundancy | **DEFER** — review-class; queue post Wave 134 audit | n/a |

### Dimension 7 SOTA replacements proposed

- **G7.1 RTK init**: ship `rtk init -g` (pending operator decision per task #61)
- **G7.2-G7.5**: STUDY-PILOT or DEFER pending more evidence

---

## Dimension 8 — Research / discovery architecture

### Current state
sota-researcher subagent + Probe DAG (P1-P7) + 9-cohort fan-out + T0 candidate-list challenge + 6 ecosystem catalogs + 4-MCP crawl + SRA 10-dim gate (loaded 2026-05-10).

### Gap analysis

| Gap | Current | SOTA candidate | SRA verdict | Replacement-of |
|---|---|---|---|---|
| G8.1 No mechanical SRA verdict aggregator | operator runs SRA per-candidate manually | Hook reading sota-researcher output + applying D1-D10 → structured verdict file | **DEFER** — TIER-3 LOCAL-COMPOSITION; codify when SRA usage stabilizes | n/a |
| G8.2 codex T1 cite-discovery latency | Pattern B HNF disposition | (a) increase budget per call (b) pre-fire on cheap probes only — AUDIT-ACTION-LOOP closure | **DEFER — operator-discipline** | n/a |
| G8.3 Research provenance tracking is per-wave | `MEMORY.md` 1-line index; full ARTIFACT-INLINE in `tmp/wave<N>-*.md` | Promote to mid-wave `docs/research-trail/<topic>-<date>.md` per Karpathy §5 Layer 3 (compiled wiki) | **DEFER — operationalize this audit arc** | n/a (this fire IS the dogfood) |
| G8.4 No automated kit-extract pipeline | v63/v64/v65 zips manually extracted | Cron OR hook auto-extracting newly-arrived `outer research/*.zip` to runtime structure | **DEFER** — minor; tasks #74 done manually | n/a |
| G8.5 sota-researcher Probe DAG completeness | Probe 1-7 documented, automation partial | Mechanical Probe DAG runner — invoke per candidate batch | **DEFER** — Tier-1b sota-researcher subagent already encapsulates Probe DAG; mechanization is incremental | n/a |
| G8.6 4-MCP crawl coverage | github + exa-DISABLED + perplexity + firecrawl | Re-enable exa OR add zen MCP (gh search) | **DEFER** — exa frontend in `.claude/settings.json:disabledMcpjsonServers` per Wave 50 finding; route via perplexity + firecrawl + github (current redundancy adequate) | n/a |

### Dimension 8 SOTA replacements proposed

- **G8.3 Research provenance trail**: this audit arc IS the dogfood; promote to standing pattern (`docs/sota-architecture-audit/` becomes the template)
- **G8.5 Probe DAG mechanization**: tier-1b sota-researcher subagent already covers; defer mechanical hook

---

## Cross-dimensional gaps (not bound to single dimension)

| Gap | Domain | SOTA candidate | SRA verdict |
|---|---|---|---|
| GX.1 Permission mode `bypassPermissions` (W82d operator override) | settings | revert to `auto` per CCBP `claude-settings.md:251 @ 64fffd53` SOTA-canonical when classifier endpoint stabilizes | **INSTALL — operator-discipline trigger** (codify revert predicate) |
| GX.2 CR-7 Phase 1 → Phase 2 transition pending | settings + cardinal rules | Verify Tier 1a hooks INSTALLED + smoke-PASS → flip CR-7 Phase 2 destination | **DEFER — Phase 2 trigger predicate** (per CR-7 testable predicate (c) — Tier 1a smoke-probe PASS) |
| GX.3 Sibling rules cite-import-AMBER persistence | rules | Many sibling rules cite-imported as AMBER per Section 14.5; no upstream parity exists | **DEFER — operator decision**: keep AMBER status OR formalize sub-rule promotion |
| GX.4 No deprecation-discipline runtime hook | rules | `deprecation-discipline.md` LOADED but no mechanical enforcement (e.g., consumer-graph audit before remove) | **DEFER** — codify when n=2 deprecation event observed |
| GX.5 No SOTA-architecture audit cadence | this arc IS the first formal audit | Schedule re-audit on quarterly cadence OR trigger-driven (e.g., Wave-N+50) | **INSTALL — cadence directive** |

---

## SRA scoring summary

**REPLACEMENTS PROPOSED** (D2 freshness gate verified — replacement_age ≤ incumbent_age):
1. **G2.1 qdrant/mcp-server-qdrant** — TIER-1 OFFICIAL Qdrant; closes L2 MCP wiring gap
2. **G2.3 Karpathy 3-layer wiki formalization** — taxonomic relabel of existing artifacts
3. **G3.4 `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` opt-in for fan-out Waves** — Path D operator-discipline
4. **G4.1 mattpocock/skills** — additive 62k★ skill plugin
5. **G5.3 Deny-hook security regression tests** — closes layered-gates §9 HARD GATE
6. **G6.1 codex-miss eval corpus** — adapts cross-model-consensus eval-case mandate
7. **G7.1 RTK init** — completes Wave 118 Ship A2 token-efficiency adoption
8. **GX.1 Permission mode revert to `auto`** — restores CCBP-canonical SOTA when classifier stable

**DEFER (more evidence needed)**:
- G1.2 DAG dispatcher / G1.3 single-level fork mechanical
- G2.4 semantic-router / G2.5 cognee / G2.6 dbhub
- G3.2 T5 plan-codex-review status / G3.3 verdict-aggregation hook / G3.5 codex T1 timeout fallback
- G4.3 ECC RC monitoring / G4.4 skill-registry portability
- G5.1 fm17d_stall_detector fix
- G6.2 Phoenix wire-up / G6.3 Langfuse / G6.5 benchmark CI
- G7.2 semantic-router / G7.3 deepagents arg truncation / G7.4 cache prefix audit / G7.5 env redundancy
- G8.1 SRA aggregator / G8.4 kit-extract pipeline
- GX.2 CR-7 Phase 2 trigger / GX.3 sibling cite-import / GX.4 deprecation hook

**REJECT-FOR-FIT**:
- G6.4 SWE-bench / GAIA / HumanEval (D6 use-class FAIL)
- G2.5 cognee-mcp pending HTTP-supervisor (D5 ABANDON-RISK)

---

## Cross-model verification status

This gap matrix is currently **Sonnet stand-in** research only. Per CR-3 + SRA §Cross-model T1 verification mandate, the **REPLACEMENT** verdicts (8 INSTALL items above) MUST be cross-model-verified via real GPT-5.5 codex T1 BEFORE any commit. Recommended dispatch:

- **Codex T1 e2e on consolidated INSTALL set** — 1 codex call covering all 8 replacements (foreground+tee, deep-review-exec, ~10-15 min budget)
- **Pattern A apply** on NEEDS-REVISION verdict (typical conf 0.85-0.92)

**Pre-commit gate**: `cross-model-gate-satisfaction-status` field MUST be present in commit body (FULL / PARTIAL via STAND-IN-NOTICE / FAILED-policy-blocked) per `cross-model-consensus.md §Verdict report shape`.

---

## Next: see 03-sota-target-architecture.md for synthesized target

