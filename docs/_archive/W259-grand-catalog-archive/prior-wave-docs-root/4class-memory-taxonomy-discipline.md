# 4-Class Memory Taxonomy + Promotion Gate (Fire 42 IMP-N codification — Fire 41 Gate 5 detailed)

> **Purpose**: codify the 4-class memory taxonomy operationalizing Fire 41 Gate 5 (Memory Promotion) at detailed level. Each memory-write event MUST classify into ONE of 4 classes; per-class promotion gate determines whether AUTO-PROMOTE (3 classes) or TEST-GATED-PROMOTE-via-Gate-4-Trace-Replay (1 class).
> **Parent framework**: `docs/evidence-governed-harness-8-gate-discipline.md` Gate 5 (Memory Promotion)
> **Cite class**: `constituents=[TIER-1-USER-DIRECTIVE @ Fire 29c REAL GPT-5.5 Axis-4 memory recommendation + Fire 41 Gate 5 PARTIAL status, TIER-2 sister-rule cite-import-AMBER @ Z:/claude-sota/.claude/rules/audit-action-loop.md + Z:/claude-sota/.claude/rules/evidence-policy.md Marker Decay + Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface 3-layer + Z:/claude-sota/.claude/rules/codification-threshold.md cycle-322 jurisdiction + Z:/claude-sota-installed/docs/evidence-governed-harness-8-gate-discipline.md (Fire 41 parent framework), TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 28 IMP-N codification + Fire 41 Gate 5 PARTIAL status]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Meta-insight (Fire 29c REAL GPT-5.5 Axis-4 verbatim — informs taxonomy design)

> "Memory must be partitioned by epistemic class — facts versus episodes versus skills versus runbooks — because each class has different decay characteristics, different sources of truth, different verification requirements, and different cost-shapes. Auto-promoting all memory writes without classification produces a cluttered memory layer that loses information value as it grows."

## Atomicity rule (Pattern A fix-forward edit #1 per codex T1 prescription)

If one memory-write event contains **multiple truth types** (e.g., "Wave X Fire Y returned NEEDS-REVISION conf=0.89 on file Z" is BOTH an episodic event AND a semantic fact about Z's content), the writer MUST **split into separate atomic memory records BEFORE classification**. EXACTLY ONE class applies per ATOMIC record, NOT per human-readable paragraph. Pre-split prevents class-boundary ambiguity.

Concrete example split:
- Atomic record 1 (EPISODIC-TRACE): "At 2026-05-11 00:23 in Wave 134 Fire 41, codex T1 dispatched against `docs/evidence-governed-harness-8-gate-discipline.md` returned NEEDS-REVISION conf=0.89."
- Atomic record 2 (SEMANTIC-FACT): "The framework `docs/evidence-governed-harness-8-gate-discipline.md` originally contained 8 gates and was extended to 10 via Pattern A apply."

## The 4-class taxonomy

Each ATOMIC memory write event classifies into EXACTLY ONE class. Class determines (a) which storage layer receives the write, (b) whether promotion is AUTO-class or TEST-GATED-class, and (c) decay/staleness handling.

### Class 1 — SEMANTIC-FACT

| Aspect | Specification |
|---|---|
| **Definition** | Stable factual claim about the world / dependency / API / config; truth-value persists across sessions UNLESS upstream changes |
| **Examples** | "Anthropic CC sub-agents model precedence: env > per-invocation > frontmatter > main-conversation" / "FalkorDB v1.6.1 default port 16379" / "Karpathy 4 principles = Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution" / "TIER-1-DIRECT cite class definition per citation-discipline.md rule #8" |
| **Storage layer** | mcp-memory (sqlite-vec embedded; semantic embedding + retrieval by similarity) |
| **Promotion gate** | AUTO-PROMOTE — semantic facts have low harm-from-storage; storage cost amortized across recall events |
| **Decay** | Marker Decay corollary per `evidence-policy.md` — re-verify on recall if `[VERIFIED YYYY-MM-DD]` > 30 days old AND fact concerns volatile surface (versions, APIs, configs) |
| **Source-of-truth** | Upstream artifact at cite-anchor (file:line @ HEAD SHA); memory mirrors but does NOT supersede |
| **Mia probe at recall** | Cheap — re-grep cite-anchor at HEAD SHA; if drift detected → STALE → re-verify before reuse |

### Class 2 — EPISODIC-TRACE

| Aspect | Specification |
|---|---|
| **Definition** | Time-ordered event sequence; what happened in a specific session arc; truth-value is HISTORICAL (it happened then; it does not become un-happened) |
| **Examples** | "Wave 134 Fire 27-A returned APPROVE conf=0.89 on openai-agents-python at 2026-05-10 14:23" / "Fire 41 codex T1 produced Pattern B HNF on 1st dispatch + Path D fallback succeeded on 2nd" / "FM-17.f n=6 instance occurred at Wave 137 Fire 2 Voice 2 codex-rescue dispatch" |
| **Storage layer** | graphiti (FalkorDB temporal KG; nodes + edges + temporal-validity intervals) |
| **Promotion gate** | AUTO-PROMOTE — episodes have load-bearing decision-history value; storage cost amortized across cross-arc trace-mining |
| **Decay** | Historical truth does NOT decay; relevance decays. Old episodes still queryable but rank-down in retrieval if not cited in recent N sessions |
| **Source-of-truth** | Episode IS the source-of-truth (no upstream to verify against); audit-trail in `.claude/state/*.jsonl` reproduces the episode if needed |
| **Mia probe at recall** | LOW — episodes are immutable; verify against `.claude/state/*.jsonl` audit trail only if cross-session-citation chain suspect (per FM-20 path-drift cascade defense) |

### Class 3 — PROCEDURAL-SKILL-OR-RULE

| Aspect | Specification |
|---|---|
| **Definition** | Codified operational discipline / skill / rule / pattern; truth-value is PERFORMATIVE (it's true because we use it; deprecation requires explicit codification ship) |
| **Examples** | "Pattern A: at NEEDS-REVISION conf 0.85-0.95, apply ALL prescribed_edits in single atomic commit" / "Path D recipe: `codex exec --skip-git-repo-check --color never` foreground+tee for Pattern B HNF recovery" / "Mia pre-apply discipline: probe agent-emitted prescriptions BEFORE Edit" / "FM-02 sub-class (b) defense: atomic `git add -- <f> && git commit --only -- <f>`" |
| **Storage layer** | `.claude/rules/*.md` (formal local rule) OR `docs/<topic>-discipline.md` (operator-side discipline doc; pre-promotion) OR sibling `Z:/claude-sota/.claude/rules/*.md` (cite-import-AMBER for codified rules) |
| **Promotion gate** | **TEST-GATED-PROMOTE via Gate 4 Trace Replay** — procedural promotions are HIGH-stakes (they change future behavior); MUST satisfy Pass^3 OR cycle-322 ≥3-dogfood-evidence threshold OR explicit user-trigger BEFORE promotion to formal rule-tier |
| **Decay** | Marker Decay corollary applies; procedural rules become STALE when underlying mechanism changes (e.g., codex CLI version bump invalidating Path D recipe parameters); re-validate via dogfood on cycle-322 evidence ladder |
| **Source-of-truth** | The codification document itself (this rule, that skill, that pattern); cite-trail back to TIER-1 SOTA per cardinal-rule-1 |
| **Mia probe at recall** | MEDIUM — re-validate codification cite-trail at HEAD SHA; if cite-anchor drifted OR upstream mechanism changed → re-evaluate procedural rule |

### Class 4 — OPERATIONAL-RUNBOOK

| Aspect | Specification |
|---|---|
| **Definition** | Time-bounded operational state / queue / in-flight context; truth-value is SESSION-SCOPED or ARC-SCOPED (it's true for THIS session/arc; may not persist) |
| **Examples** | "Wave 134 Fire 42 in progress at task #168" / "Forward Top-5 post-Fire-41: 🥇 frigg DEFER, 🥈 IMP-N, ..." / "Planning-with-files findings.md: investigated 3 candidates, dropped 2, kept 1" / "Current arc cycle counter: cycle-322 promotion ladder at n=7" |
| **Storage layer** | `MEMORY.md` (this file's parent index) / planning-with-files `findings.md` / `.claude/projects/*/memory/*.md` / planning artifact `tmp/*.md` (per advanced-agent-team-standing-directive ARTIFACT-INLINE mandate) |
| **Promotion gate** | AUTO-PROMOTE — operational runbooks need low-friction write to be useful as session-state continuity; storage cost bounded by session/arc lifetime |
| **Decay** | FAST decay — operational runbook entries SHOULD be reviewed at session-end / arc-close; stale entries pruned per `karpathy-adapted.md §5` Layer-3 compaction discipline |
| **Source-of-truth** | The runbook itself is the source-of-truth for in-flight context; on session-end, RELEVANT entries promote to other classes (SEMANTIC-FACT if pattern stabilized; EPISODIC-TRACE if decision-history; PROCEDURAL-SKILL-OR-RULE if cycle-322 evidence accumulated) |
| **Mia probe at recall** | LOW — runbooks expected to be ephemeral; cross-session citation requires re-verification per FM-20 |

## Boundary precedence (Pattern A fix-forward edit #2 per codex T1 prescription)

When a single human-described observation appears to span multiple classes, apply boundary precedence:
- A **stable fact learned DURING an episode** = Class 1 SEMANTIC-FACT (for the factual claim itself) **AND** Class 2 EPISODIC-TRACE (only for the session event that discovered or verified it). The fact + the discovery-event are TWO atomic records (per §Atomicity rule), each with its own class.
- A **codified discipline derived FROM repeated episodes** = Class 3 PROCEDURAL-SKILL-OR-RULE for the codification itself, plus the constituent EPISODIC-TRACE records remain in graphiti as supporting evidence (NOT reclassified).
- A **runbook entry that STABILIZES into a pattern** = the runbook record stays Class 4 OPERATIONAL-RUNBOOK; the pattern observation triggers a SEPARATE Class 1 SEMANTIC-FACT (or Class 3 PROCEDURAL via the evidence-synthesis ladder below). Never reclassify the runbook record itself.

## Classification decision flow

When a memory-write event fires:

```
Memory-write event arrives
  │
  ├─ Is the content a STABLE FACT (persists across sessions)?
  │  └─ YES → Class 1 SEMANTIC-FACT → mcp-memory (sqlite-vec) AUTO-PROMOTE
  │
  ├─ Is the content a TIME-ORDERED EVENT (something that happened)?
  │  └─ YES → Class 2 EPISODIC-TRACE → graphiti (FalkorDB) AUTO-PROMOTE
  │
  ├─ Is the content a CODIFIED DISCIPLINE / SKILL / RULE / PATTERN?
  │  └─ YES → Class 3 PROCEDURAL-SKILL-OR-RULE → .claude/rules/ OR docs/*-discipline.md
  │           → Gate 4 Trace Replay GATED: cycle-322 ≥3-dogfood evidence
  │             OR Pass^3 (per Fire 29c IMP-R) OR explicit user-trigger
  │             REQUIRED before promotion
  │
  └─ Is the content TIME-BOUNDED OPERATIONAL STATE (in-flight session/arc context)?
     └─ YES → Class 4 OPERATIONAL-RUNBOOK → MEMORY.md / planning-with-files / tmp/*.md
              AUTO-PROMOTE (low-friction)
```

## Anti-patterns

- **Auto-promote PROCEDURAL-SKILL-OR-RULE without Gate 4 evidence** — refuted by Fire 29c GPT-5.5 Axis-4 + cycle-322 jurisdiction (n≥3 self-observed OR user-trigger explicit). Skipping Gate 4 for procedural promotion produces premature codification (rule gets shipped on n=1 self-observed evidence; later refuted).
- **Conflate SEMANTIC-FACT with PROCEDURAL-SKILL-OR-RULE** — refuted by Source-of-truth distinction. SEMANTIC-FACT mirrors upstream (cite-anchor authority); PROCEDURAL is codification authority itself. Misclassification → wrong storage layer + wrong promotion gate.
- **Auto-promote EPISODIC-TRACE to PROCEDURAL** — refuted by Fire 29c "promote knowledge only when evidence SURVIVES REPLAY". One episode is n=1; promoting to procedural rule requires n=3 dogfood per cycle-322. Episode is evidence, not procedure.
- **Skip OPERATIONAL-RUNBOOK class — write everything as SEMANTIC-FACT or EPISODIC** — refuted by `karpathy-adapted.md §5` Layer-3 compaction discipline. Operational runbook IS the canonical first-write surface; promotion to other classes happens AT SESSION-END after relevance survives.
- **Treat SEMANTIC-FACT as immutable** — refuted by Marker Decay corollary. Facts about volatile surfaces (versions, APIs, configs) decay; recall MUST re-verify cite-anchor at HEAD SHA if `[VERIFIED YYYY-MM-DD]` > 30 days.
- **Promote OPERATIONAL-RUNBOOK directly to PROCEDURAL without intermediate evidence-synthesis** — refuted by cycle-322 + evidence-synthesis discipline below. See §Evidence-synthesis ladder (Pattern A fix-forward edit #3 + #5): promotion does NOT mutate the source record; it creates a NEW higher-order record (Class 1 or Class 3) with backlinks to supporting Class 4 / Class 2 records. The ladder is therefore an EVIDENCE-SYNTHESIS ladder, NOT a reclassification ladder.
- **Reclassify a memory record by changing its class label** (Pattern A fix-forward edit #5 per codex T1 prescription) — refuted by storage-class-immutability. A SEMANTIC-FACT record once written stays Class 1 even after additional evidence accumulates; what changes is that a SEPARATE new record at a different class is created. Storage class does NOT mutate historical records.
- **Auto-promote EPISODIC-TRACE to PROCEDURAL** (extended per Pattern A fix-forward edit #4) — refuted by Fire 29c "promote knowledge only when evidence SURVIVES REPLAY" + cycle-322 evidence-synthesis. **EPISODIC-TRACE NEVER auto-promotes directly to PROCEDURAL.** Multiple episodic traces (n≥3 same-arc) MAY SERVE AS Gate 4 / cycle-322 EVIDENCE for a SEPARATE procedural codification ship, but the procedural codification is a NEW Class 3 record, NOT a reclassification of the Class 2 records.
- **Write to single storage layer regardless of class** — refuted by Fire 41 Gate 5 PARTIAL status. Single-layer storage loses class-specific decay + retrieval-cost optimization (e.g., temporal KG retrieval for episodes vs semantic-similarity retrieval for facts).

## Sister-rule integration

- `Z:/claude-sota-installed/docs/evidence-governed-harness-8-gate-discipline.md` Gate 5 — parent framework; this rule is the detailed codification of Gate 5
- `Z:/claude-sota/.claude/rules/evidence-policy.md` Marker Decay — SEMANTIC-FACT recall verification
- `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface (3-layer)` — Layer 1 (chronological log) = EPISODIC-TRACE; Layer 2 (index) = OPERATIONAL-RUNBOOK; Layer 3 (compiled wiki) = SEMANTIC-FACT + PROCEDURAL distillation
- `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction — Gate 4 Trace Replay equivalent for PROCEDURAL-SKILL-OR-RULE promotion (n≥3 self-observed OR user-trigger)
- `Z:/claude-sota/.claude/rules/audit-action-loop.md §Hook telemetry contract` — EPISODIC-TRACE writes via JSONL events MUST persist `agent_id`/`agent_type` per SDK contract (Fire 41 Gate 7 Identity composition)
- `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` — cross-fire propagation of SEMANTIC-FACT cites requires Mia probe per FM-20 cascade defense (Fire 41 Gate 3 Context Freshness composition)
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — OVER/UNDER/HONEST-NON-FINDING applies recursively to memory recall verdicts
- `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md` (Fire 37 promoted) — Forward Discipline #2 applied to this codification (8th recursive dogfood)
- `Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md` (Fire 29a) — SEMANTIC-FACT writes about adoption decisions require ≥4-source convergence
- `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-1 — every PROCEDURAL-SKILL-OR-RULE codification requires TIER-1-DIRECT cite-anchor per cite-class lattice

## Status (current eee implementation)

| Memory class | Storage layer status | Promotion gate status |
|---|---|---|
| **SEMANTIC-FACT** | mcp-memory v10.51.3 sqlite-vec ✅ INSTALLED (per Wave 82o-r 2026-05-08) | AUTO-PROMOTE convention exists but no mechanical hook enforcing classification at write-time |
| **EPISODIC-TRACE** | graphiti v0.29.0 + FalkorDB v1.6.1 ✅ INSTALLED (per Wave 82o-r 2026-05-08); .mcp.json wire pending Wave 141 Fire 1 smoke probe (INSTALLED-AMBER) | AUTO-PROMOTE convention exists but mcp__graphiti__add_memory not yet wired |
| **PROCEDURAL-SKILL-OR-RULE** | `.claude/rules/` (12 sibling cite-import-AMBER rules) + `docs/*-discipline.md` (Wave 134 series codification: 4-class memory taxonomy is the 11th tier-2 doc) | cycle-322 jurisdiction codified at `Z:/claude-sota/.claude/rules/codification-threshold.md` (cite-import-AMBER); Gate 4 Trace Replay (Pass^3) NOT-YET-WIRED per Fire 41 Gate 4 status |
| **OPERATIONAL-RUNBOOK** | `MEMORY.md` ✅ ACTIVE (this file's parent index); `tmp/*.md` per advanced-agent-team-standing-directive ARTIFACT-INLINE mandate ✅; planning-with-files `findings.md` NOT-YET-INSTALLED | AUTO-PROMOTE convention active |

**Cumulative**: 3/4 storage layers ACTIVE; 1/4 in INSTALLED-AMBER (graphiti wire pending); 0/4 mechanical-classification-hook enforcing class boundaries at write-time.

## Promotion threshold (this rule's own cycle-322 promotion path)

This rule is codified as **TIER-3-LOCAL-COMPOSITION discipline doc** (Fire 42 = 1st dogfood). Per cycle-322 jurisdiction:
- n=1 (this fire) → discipline doc shipped at `docs/4class-memory-taxonomy-discipline.md`
- n=2+ (future fires applying 4-class classification at memory-write time) → evidence ladder accumulates
- n=3+ same-arc OR user-trigger explicit → promote to formal `.claude/rules/4class-memory-taxonomy-discipline.md` (rule-tier)

**Promotion-deferred** until n=3 dogfood evidence accumulates. Fire 42 ships the DISCIPLINE; promotion-to-rule-tier happens after taxonomy is validated through repeated application.

## Evidence-synthesis ladder (Pattern A fix-forward edit #3 per codex T1 prescription — replaces prior "promotion ladder" framing)

Memory promotion is **evidence synthesis from repeated observations**, NOT reclassification of single records. The ladder operates at the EVIDENCE level, not the record-class level:

| Stage | Source records | Synthesized output |
|---|---|---|
| Stage 0 (in-arc) | Single Class 2 EPISODIC-TRACE OR Class 4 OPERATIONAL-RUNBOOK entry | n=1 observation; NO synthesis yet |
| Stage 1 (cross-arc n=2) | 2 same-shape Class 2 + Class 4 records | NEW Class 1 SEMANTIC-FACT record about **observed recurrence** ("X has been observed twice in conditions Y") + backlinks to source records |
| Stage 2 (cross-arc n=3+ OR user-trigger) | 3+ same-shape Class 2 + Class 4 records OR explicit user-trigger | NEW Class 3 PROCEDURAL-SKILL-OR-RULE record (the codification ship) + backlinks to source records + Gate 4 Trace Replay PASS (when Gate 4 wired) |

Per Pattern A fix-forward edit #5: each stage CREATES a new record at a higher synthesis-level, NOT a reclassification of the source records. The source records (Class 2 EPISODIC-TRACE + Class 4 OPERATIONAL-RUNBOOK) REMAIN at their original class even after the synthesized output ships at Class 1 or Class 3.

Explicit constraint per Pattern A fix-forward edit #4: **EPISODIC-TRACE NEVER auto-promotes directly to PROCEDURAL**. The Stage 1 SEMANTIC-FACT record is the OPTIONAL intermediate signal that recurrence has been observed; the Stage 2 PROCEDURAL record requires either (a) ≥3 same-shape source records OR (b) explicit user-trigger, AND (c) Gate 4 Trace Replay PASS when available. Skipping Stage 1 (going directly Stage 0 → Stage 2) is allowed only when user-trigger explicit OR cycle-322 codification-threshold satisfied at n=3 from same-arc observation set.

## How to apply (operator-side discipline)

For every memory-write event:

1. **Classify** the content per §The 4-class taxonomy + §Classification decision flow
2. **Pick storage layer** per class
3. **Apply promotion gate**:
   - Classes 1+2+4: AUTO-PROMOTE — write to storage layer directly
   - Class 3: GATE-CHECK first — does evidence satisfy cycle-322 (n≥3 self-observed OR user-trigger OR Pass^3)? If YES, promote to formal rule; if NO, defer to `docs/*-discipline.md` operator-side OR `OPERATIONAL-RUNBOOK` until gate satisfied
4. **Cite classification in commit body** when promotion involves a commit: e.g., `memory-class: SEMANTIC-FACT → mcp-memory` OR `memory-class: PROCEDURAL-SKILL-OR-RULE → cycle-322 GATE-PASS (n=3 dogfood: <cite>); promoted to .claude/rules/X.md`
5. **At session-end OR arc-close**: review OPERATIONAL-RUNBOOK entries; promote relevant ones to other classes per cycle-322 ladder

## Update triggers

Re-evaluate this rule when:
- A 5th memory class emerges (e.g., DECLARATIVE-INTENT or PRESCRIPTIVE-CONSTRAINT) — extend taxonomy
- Gate 4 Trace Replay lands (per Fire 41-G4 codification) — wire mechanical Pass^3 for PROCEDURAL-SKILL-OR-RULE class
- Graphiti .mcp.json wire smoke-probes PASS (per Wave 141 Fire 1) — flip EPISODIC-TRACE storage layer status from INSTALLED-AMBER → ACTIVE
- Mechanical classification hook ships (e.g., PostToolUse `Bash(git commit *)` audit that parses commit-body for `memory-class:` declaration + verifies storage layer match) — flip from operator-discipline to mechanical enforcement
- A 4th memory write surfaces that doesn't classify cleanly into 4 classes — debug + refine class boundaries OR add 5th class
- cycle-322 n=3 dogfood evidence accumulates per class — promote class-specific subsection to dedicated rule

## Cite class for this discipline

`constituents=[TIER-1-USER-DIRECTIVE @ Fire 29c REAL GPT-5.5 Axis-4 memory recommendation + Fire 41 Gate 5 PARTIAL status, TIER-2 sister-rule cite-import-AMBER @ 10 sister rules, TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 28 IMP-N codification + Fire 41 framework parent]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Recursive promotion-fire dogfood note

This Fire 42 codification is the 8th Forward Discipline #2 recursive dogfood instance (post-cycle-322 promotion ladder advance n=7→n=8). The codification IS itself a PROCEDURAL-SKILL-OR-RULE classification event — Fire 42 ships at n=1 dogfood (discipline-doc tier), not formal rule-tier. cycle-322 promotion to `.claude/rules/4class-memory-taxonomy-discipline.md` deferred until n=3 dogfood evidence accumulates per the discipline's own gate.
