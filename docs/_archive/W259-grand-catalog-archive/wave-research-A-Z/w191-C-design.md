---
title: W191 P0 Agent C — FM-17 recovery + SOTA auto-compact patterns + auditor-integration design
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-14
agent: architect-via-orchestrator-direct
wave: 191
fire: P0-C
output_budget: ≤400 LOC
termination: on_text_match: "DESIGN:"
---

# W191 P0 Agent C — Design: FM-17 Recovery Integration + SOTA Auto-Compact + Auditor Integration

## Authority Excerpt

Cite-class lattice per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md §Cite-class verdict for this rule` pattern:

`constituents=[
  TIER-1-DIRECT @ Anthropic CC https://code.claude.com/docs/en/sub-agents §"Choose a model" + https://code.claude.com/docs/en/hooks PreCompact contract,
  TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/rules/fm17-subagent-fleet-depletion.md:60-78 6-sub-class taxonomy + Canonical Path P recipe,
  TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md §Rank #1-#7 + Rank #3.5 PreCompact hook stack,
  TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md §The contract 5-backend hash verify,
  TIER-1-NAMED-AUTHOR-QUOTE @ Karpathy §5 Wiki Compounding Surface per karpathy-adapted.md (TIER-1 inherited via TIER-3-LOCAL-COMPOSITION),
  TIER-2 @ codex-t1-pattern-b-forward-discipline.md Forward Discipline #1+#2 (prompt-scope-control),
  TIER-3-LOCAL-OPERATOR-DERIVED @ W190 F1 FM-17 DOUBLE-LOSS (Agent B FM-17.b + Agent C FM-17.f)
]; effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 MIN_PRECEDENCE`.

## A. FM-17 RECOVERY INTEGRATION (≥2-option trade-off)

W190 F1 evidence (per MEMORY.md L127): **Agent B FM-17.b 429 pool-depletion + Agent C FM-17.f 1M-context billing blocker** — both BRIDGE-MODE codex-rescue LOST mid-dispatch. Path forward MUST be deterministic.

### Option 1 — Path P orchestrator-direct codex exec foreground+tee (DEFAULT)

**Recipe** (canonical per `fm17-subagent-fleet-depletion.md:72-77`):
```bash
timeout 300 codex exec --skip-git-repo-check --color never -p deep-review-exec \
  < .claude/state/codex_consult_<topic>.txt \
  2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt
```

**Mechanism**: orchestrator invokes codex CLI directly; NO subagent Agent() wrapper in path; NO codex-readonly policy chain; NO 1M-context entitlement gate.

**Trade-offs**:
| Axis | Cost / Value |
|------|--------------|
| Token budget | ~7-15K codex tokens (xhigh effort); ZERO BRIDGE-MODE wrapper overhead |
| Latency | 60-300s wall-clock (TARGET budget per ctff-pattern-b-and-t1-ops §Pattern D table); 18-183s observed across n=4 dogfood ladder |
| Recovery semantic | DETERMINISTIC — codex CLI runs in main session process; no wrapper watchdog, no pool funneling, no 1M billing-class blocker |
| Audit-trail | FULL — `.claude/state/codex_consult_<topic>_OUT.txt` persisted; commit-body cite mandatory per cross-model-consensus §The contract |
| Cross-model gate | FULLY SATISFIED — verdict origin = REAL GPT-5.5 via codex CLI subprocess |
| 1M-context parent-session trade-off | NONE — parent retains 1M ceiling unchanged |
| FM-17 sub-class coverage | a/b/c/d/e/f/g ALL bypassed (subagent wrapper layer removed) |

**Honest limit**: per `synthesis-layer-verify.md §Subclaim-type discriminator`, this is OPERATIONAL-CLAIM; foreground+tee binds orchestrator turn for the wall-clock duration (cannot interleave other tool calls during the codex run). For 300s ceiling, this is acceptable.

### Option 2 — BRIDGE-MODE subagent with CLAUDE_CODE_DISABLE_1M_CONTEXT=1 pre-fire env

**Recipe**: uncomment `CLAUDE.local.md` ENV (h) `$env:CLAUDE_CODE_DISABLE_1M_CONTEXT = '1'` → restart eee → dispatch `Agent({subagent_type: "codex-rescue", ...})`.

**Mechanism**: parent session loses `[1m]` flag at session-creation; subagents inherit base 200k context; FM-17.f billing-class blocker structurally avoided per `fm17-subagent-fleet-depletion.md:67`.

**Trade-offs**:
| Axis | Cost / Value |
|------|--------------|
| Token budget | ~7-15K codex tokens + ~3-5K BRIDGE-MODE wrapper overhead |
| Latency | 60-600s wall-clock; subagent fan-out can parallelize (CADP rule 2 max 3 concurrent per parallel-agent-wave §CADP) |
| Recovery semantic | PARTIAL — bypasses FM-17.f BUT still vulnerable to FM-17.b (pool 429) + FM-17.d (wrapper stream-watchdog 600s stall) + FM-17.e (autocompact-thrash) |
| Audit-trail | DEGRADED — wrapper output piped through Agent() return; SubagentStop transcript-mining per `synthesis-layer-verify.md §SubagentStop transcript-mining` partially compensates |
| Cross-model gate | SATISFIED (Sonnet wrapper invokes real GPT-5.5 codex CLI) — but STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` |
| 1M-context parent-session trade-off | **HIGH** — parent loses 1M ceiling; long-arc `/loop` hits `/compact` at ~150-180k vs ~300-400k rot threshold per Karpathy §5 + Thariq tip |
| FM-17 sub-class coverage | f only; a/b/c/d/e/g STILL active |

**Honest limit**: per `fm17-subagent-fleet-depletion.md:67` verbatim "Path D activated ONLY for explicit fan-out Waves declaring 3-5 BRIDGE-MODE subagent dispatch as load-bearing per `advanced-agent-team-standing-directive.md` invariants". Not a default.

### Option 3 — Hybrid (RECOMMENDED)

**Policy**:
- **High-risk codex T1/T2/T3 verification + cross-model gate satisfaction** → Option 1 Path P (deterministic, FULL cross-model gate, ZERO 1M trade-off)
- **Low-risk multi-axis parallel research fan-out (3+ agents declaring BRIDGE-MODE as load-bearing per advanced-agent-team-standing-directive §"GPT-5.5 BRIDGE-MODE for ≥2 agents")** → Option 2 with Path D activated
- **Sonnet stand-in for non-cross-model-required research probes** → standard Agent() with permission_mode preserved; cite STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` Option 2

**Decision tree at dispatch time**:
1. Is BRIDGE-MODE REAL GPT-5.5 cross-model gate the load-bearing reason? → If NO → use Sonnet stand-in Agent(); STAND-IN-NOTICE in commit body.
2. Is it single-claim audit OR codification fire? → Path P (Option 1) per `codex-t1-pattern-b-forward-discipline.md` Forward Discipline #2.
3. Is it 3+ parallel BRIDGE-MODE fan-out for breadth (n=3+ agents, multi-source/multi-dimension)? → Path D + ENV (h) (Option 2); accept 1M parent trade-off.
4. Default → Path P.

**Verdict**: **Option 3 Hybrid (RECOMMENDED)** with Path P as primary; Option 2 reserved for declared 3+ BRIDGE-MODE fan-out.

## B. SOTA AUTO-COMPACT PATTERNS BEYOND THRESHOLD TUNING

`CLAUDE.local.md` ENV (j) WARN/HIGH/CRIT 600k/650k/700k is **necessary but not sufficient** — threshold tuning alone (Rank #3 from auto-compact-discipline) covers ~13% reclaim per W180 F3 measurement (FM-20 row 15 codified) vs SOTA target 50-60%.

### Pattern B.1 — Rank #1 + #2 routing (PRIMARY ~98% reduction)

Per `auto-compact-discipline.md §Rank #1` + `§Rank #2`:
- **Rank #1**: `mcp__plugin_context-mode_context-mode__ctx_batch_execute(commands, queries)` — single call replaces 30+ ctx_execute + 10+ ctx_search; raw stdout stays in sandbox; only FTS5 excerpts enter context.
- **Rank #2**: `mcp__repomix__pack_codebase(directory, compress=true)` + `mcp__repomix__grep_repomix_output(outputId, pattern)` — tree-sitter compression ~70% per `Z:/repos/deps/repomix/README.md:1089 @ HEAD 7dfd2b96`; preferred over re-packing uncompressed per README:979.

### Pattern B.2 — Rank #3.5 PreCompact hook 4-layer stack

Per `auto-compact-discipline.md §Rank #3.5`:

| Layer | Plugin | Surface | Event | LOC |
|---|---|---|---|---|
| Prompt-augmentation | fcakyon/intelligent-compact | 6-section priority injection (A-F) | PreCompact | 71 |
| State-save audit | ECC pre-compact | compaction-log.txt timestamp | PreCompact | 48 |
| Session-event SQLite | context-mode precompact.mjs | <2KB XML resume-snapshot | PreCompact | 76 |
| Tool-call threshold | ECC suggest-compact | `/compact` suggestion at N=50 | PreToolUse Edit\|Write | 80 |

### Pattern B.3 — Karpathy §5 3-layer progressive disclosure (Rank #5)

Per `karpathy-adapted.md §5` mapped to `auto-compact-discipline §Rank #5`:
- **Layer 1 chronological**: `.claude/state/*.jsonl` audit trails
- **Layer 2 index**: `MEMORY.md` (≤200 lines / 150-char one-line pointers; W180 F5 reset enforced)
- **Layer 3 compiled wiki**: `docs/karpathy-llm-wiki-practice.md` + `.claude/rules/*.md` + per-topic `memory/` files

### Pattern B.4 — Pre-emptive `/compact <hint>` (Rank #3 + coordination.md §12)

Per `auto-compact-discipline §Rank #3` + `coordination.md §12` (cite-import-AMBER):
- Invoke `/compact` at ~300k threshold (NOT wait for autocompact at 80%) with focused hint.

### Recommended hybrid pattern (composed)

For long-arc `/loop` fires:
1. **Every >20-line probe** → route through `ctx_batch_execute` (Pattern B.1)
2. **Every repo-scope ≥5 file audit** → repomix pack+grep (Pattern B.1 sub)
3. **Every URL fetch** → `ctx_fetch_and_index` (Pattern B.1 sub)
4. **At ~300k context** → pre-emptive `/compact <hint>` (Pattern B.4)
5. **At session-resume** → Layer 2+3 preload per `sessionstart-preload-discipline §The contract` (Pattern B.3)
6. **PreCompact hook stack** runs automatically on `/compact` fire (Pattern B.2)
7. **At ~300k AND failure** → `/rewind` per `coordination.md §12 row 1` (NOT layer corrections)

## C. AUDITOR-INTEGRATION DESIGN

Agent B parallel dispatch returns one of 3 verdict shapes.

### Verdict 1 — REPLACEABLE-BY-UPSTREAM
Codification path (forward-only retirement per port-note-discipline.md §6):
1. Retain historical commit bodies — do NOT rewrite
2. Update rule frontmatter with new TIER-1-DIRECT cite anchor at file:line + HEAD SHA
3. Flip sister-rule cross-references from sibling cite-import-AMBER → upstream native cite
4. Add CR-12 disposition row to manifest §Section 0 (REPLACEABLE-BY-UPSTREAM ≈ CR-12 disposition class)
5. Codify retirement note in commit body with explicit `[VERIFIED via <upstream-source>]` marker
6. Cross-check downstream rules — propagate cite updates atomically

### Verdict 2 — SIBLING-NOVEL-RETAIN
HONEST-NON-FINDING per synthesis-layer-verify.md §Reporting categories; sibling cite-import-AMBER remains correct. Codification path is additive expansion.

### Verdict 3 — CONFLICT or INSUFFICIENT-EVIDENCE
Apply closed-loop-recursive-narrowing.md Outcome A/B/C disposition.

### Downstream-impact verification (for ALL 3 verdicts)
Per fm20-path-drift-cascade.md §How to apply step 5: Grep affected rule files BEFORE applying edits; cite refuted refs verbatim in commit body with `[VERIFIED via <probe>]` markers.

## D. SYNTHESIS PATH

1. **Mia pre-apply gate** per mia-pre-apply.md
2. **Pattern A FIX-FORWARD apply** per codex-t1-fix-forward-pattern §Pattern A
3. **Atomic commit shape (FM-02.c defense)**: `git add -- <file> && git commit -o -F tmp/w191-c-commit-msg.txt -- <file>` (options-BEFORE-`--` per git-cli-grammar-discipline §The rule FM-15)
4. **Audit trail per audit-action-loop §4-stage**: Wire/Surface/Close/Re-fire
5. **Cross-model consensus gate**: Phase 1 bootstrap exception satisfied via Path P

## Final recommendation summary

| Surface | Recommendation |
|---------|---------------|
| FM-17 recovery | **Option 3 Hybrid** — Path P default; Path D + ENV (h) reserved for declared 3+ BRIDGE-MODE fan-out |
| Auto-compact pattern | Composed hybrid: Rank #1 ctx_batch_execute (PRIMARY) + Rank #2 repomix + Rank #3 pre-emptive `/compact` + Rank #3.5 4-layer hook stack + Rank #5 Karpathy 3-layer + Rank #4 `/rewind` recovery |
| Auditor integration | 3-verdict decision tree: REPLACEABLE-BY-UPSTREAM (retire forward-only) / SIBLING-NOVEL-RETAIN (additive expand) / CONFLICT (closed-loop-recursive-narrowing outcome) |
| Synthesis path | Mia → Pattern A → atomic commit `-o -F` → audit trail → CR-3 gate |

DESIGN: Option-3-Hybrid-with-Composed-Auto-Compact-and-3-Verdict-Auditor-Integration
