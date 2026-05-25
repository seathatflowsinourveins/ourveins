# Trading Skills Audit — 3-Lens Review

**Audit date**: 2026-05-15
**Auditor**: code-reviewer agent (claude-sota-installed runtime, dispatch from orchestrator)
**Artifacts audited**: 2 skills + 1 agent persona at `Z:/projects/trading/.claude/`
**Authority**: skill-orchestration-discipline.md + CCBP `claude-skills.md @ HEAD f8468e87` 15-field spec + trading/CLAUDE.md cardinal rules
**Cite-class**: TIER-1-DIRECT (CCBP) + TIER-2 (sibling discipline) per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8
**Dispatch ID**: afa953ef353771b57

---

## Lens 1 — skill-orchestration-discipline.md compliance

**Authority**: `Z:/claude-sota-installed/.claude/rules/skill-orchestration-discipline.md @ HEAD` (4-meta-stack governance)
**Reference target shape**: addy `using-agent-skills` discipline + superpowers Red Flags WHEN-NOT-TO-USE disambiguation.

### firing-dispatch

| Element | Status | Cite |
|---|---|---|
| `description:` frontmatter present | ✅ | `firing-dispatch/SKILL.md:3` |
| Auto-fire trigger phrases enumerated | ✅ STRONG | `firing-dispatch/SKILL.md:3,11-15` |
| WHEN-NOT-TO-USE disambiguation | ✅ | `firing-dispatch/SKILL.md:3,17-20` |
| State-file-driven auto-fire condition | ⚠️ FRAGILE — references phantom `.wave-43-status` | `firing-dispatch/SKILL.md:15,24` |
| Anthropic CC native description-match | ✅ ~480 chars | `firing-dispatch/SKILL.md:3` |

**Verdict**: PARTIAL — Lens 1 STRUCTURAL pattern correct; trigger #15 references `.wave-43-status` (Cowork-claimed but UNVERIFIED at audit time). **P2 OPERATIONAL drift**.

### convergence-gate-cite

| Element | Status | Cite |
|---|---|---|
| `description:` frontmatter present | ✅ | `convergence-gate-cite/SKILL.md:3` |
| Auto-fire trigger phrases | ✅ STRONG | `convergence-gate-cite/SKILL.md:3,11-15` |
| WHEN-NOT-TO-USE disambiguation | ✅ | `convergence-gate-cite/SKILL.md:3,17-19` |
| Anthropic CC description ≤1536 char | ✅ ~430 chars | `convergence-gate-cite/SKILL.md:3` |

**Verdict**: READY — Lens 1 compliant.

---

## Lens 2 — CCBP 15-field frontmatter spec compliance

**Authority**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-skills.md:19-35 @ HEAD f8468e871ed372f2807aa9d3ca7ca91eca7db422` (TIER-1-DIRECT)

15 fields: `name` / `description` / `when_to_use` / `argument-hint` / `arguments` / `disable-model-invocation` / `user-invocable` / `allowed-tools` / `model` / `effort` / `context` / `agent` / `hooks` / `paths` / `shell`

### firing-dispatch frontmatter coverage

| Field | Present | Recommendation |
|---|---|---|
| `name` | ❌ MISSING | **P2** — defaults to dir name |
| `description` | ✅ | OK |
| `when_to_use` | ❌ MISSING | **P3** — explicit field improves discovery |
| `allowed-tools` | ❌ MISSING | **P0** — multi-subagent spawn + state I/O; permission prompts under `default` |
| `model` | ❌ MISSING | **P2** — explicit `model: opus` recommended for orchestration |
| `paths` | ❌ MISSING | **P1** — scope to `research-waves/**` + `research_corpus/**` |
| `context: fork` + `agent` | ❌ MISSING | **P2** — isolated context fork prevents state-leak |

### convergence-gate-cite frontmatter coverage

| Field | Present | Recommendation |
|---|---|---|
| `name` | ❌ MISSING | **P3** — defaults to dir name |
| `description` | ✅ | OK |
| `when_to_use` | ❌ MISSING | **P3** |
| `allowed-tools` | ❌ MISSING | **P1** — explicit `allowed-tools: Read, Glob, Grep, mcp__github__*` |
| `paths` | ❌ MISSING | **P2** — scope to `research-waves/**` + `pyproject.toml` + `docs/convergence-gate.md` |

### trading-anchor-traverser (agent — NOT skill)

Per CCBP `claude-subagents.md @ f8468e87` agent frontmatter spec:

| Field | Present | Verdict |
|---|---|---|
| `name` | ✅ | OK |
| `description` | ✅ STRONG | OK |
| `tools:` | ✅ (Read, Glob, Grep) | OK |
| `model:` | ❌ MISSING | **P2** — explicit `model: sonnet` reasonable for grep-only role |
| `isolation: worktree` | ❌ MISSING | **P1** — sibling claude-sota requires 8/8 agents per `team-orchestration.md §Session Isolation` |

---

## Lens 3 — Trigger trip-test (5 phrases)

| # | Phrase | Should fire? | Will fire? | Driving text |
|---|---|---|---|---|
| 1 | "continue the loop" | YES | ✅ | description L3 explicit |
| 2 | "dispatch firing #27" | YES | ✅ | description L3 "Use when ... 'dispatch firing #N'" |
| 3 | "fire the next loop tick" | YES | ✅ | description L3 exact match |
| 4 | "stop the loop" | NO | ✅ correctly SILENT | description L3 "Do NOT use ... when user explicitly says 'stop the loop'" |
| 5 | "show me firing #26 results" | NO | ⚠️ AMBIGUOUS | description L3 does NOT enumerate; partial-keyword match risk |

**Trip-test verdict**: 4/5 correct; phrase #5 **P1 false-positive risk** — disambiguation only in body, not description.

---

## Cross-cutting findings

### Cardinal-rule numbering misalignment (firing-dispatch + convergence-gate-cite + trading-anchor-traverser)

**OVER-classification per `synthesis-layer-verify.md §Reporting categories`**:

trading/CLAUDE.md:9-20 enumerates rules:
- #1 paper-only
- #2 **Convergence-gate strict** (NOT minimum-code)
- #3 **Karpathy 4 principles** (full set, NOT "Karpathy-touch")
- #4 cite-always
- #5 **Audit every order** (NOT audit-traceability)

But skill files cite:
- `firing-dispatch/SKILL.md:149-152` → uses claude-sota-installed numbering (#2 install-priority etc)
- `convergence-gate-cite/SKILL.md:147-198` → same defect
- `trading-anchor-traverser.md:130-132,165-171` → same defect

**P1 documentation-correctness** — fixable by renumbering to trading project's actual rules.

### Phantom-state-file references

`firing-dispatch/SKILL.md:24-26` assumes pre-existing artifacts:
- `Z:\projects\trading\research-waves\.wave-43-status` — VERIFIED PRESENT this fire (state=saturating_firing_35_CLOSED_firing_36_STAGED)
- `Z:\projects\trading\research-waves\wave-43-methodology125-and-clones.md` — 12358 lines (Mia probe confirmed)
- `research_corpus/wave43_anchor_traversal/` — 93 clones (Mia probe confirmed)

**Mia OVER-catch**: Agent claimed these are phantom; orchestrator-side probe found them present. Downgrade to **P3 advisory** (skill assumes state file exists, which is currently true; defensive Glob pre-flight still recommended).

### Cross-skill-reference health

Both skills reference 4 sibling skills (`methodology-125-check`, `synthesis-append`, `anchor-traversal-grep`, `convergence-gate-cite`) — only 2 of these exist (`firing-dispatch` + `convergence-gate-cite`). **P2 phantom-cross-cuts**.

---

## Top 3 prescribed_edits per artifact

### firing-dispatch/SKILL.md

1. **L3 frontmatter (P0)**: add `allowed-tools: Read, Edit, Write, Grep, Glob, Bash, Task` + `paths: research-waves/**, research_corpus/**, src/trading/**`
2. **L17-20 (P1)**: add explicit `when_to_use:` listing "show me firing #N results" as NON-trigger (closes Lens-3 phrase-#5)
3. **L149-152 (P1)**: renumber to trading/CLAUDE.md actual rules

### convergence-gate-cite/SKILL.md

1. **L3 frontmatter (P1)**: add `allowed-tools: Read, Glob, Grep, mcp__github__search_repositories, mcp__github__list_commits, mcp__github__get_file_contents` + `paths: research-waves/**, pyproject.toml, docs/convergence-gate.md`
2. **L147-198 (P1)**: renumber to trading/CLAUDE.md actual rules
3. **L189-190 (P2)**: verify `docs/mcp-convergence-gate.md` exists or remove reference

### trading-anchor-traverser.md

1. **L4-7 frontmatter (P1)**: append `isolation: worktree` + `model: sonnet`
2. **L165-171 (P2)**: renumber cardinal rules
3. **L26-28 (P1)**: add `paths:` constraint + body-level pre-flight Glob to fail fast if corpus absent

---

## Per-skill verdict

- **firing-dispatch**: NEEDS-EDIT (P0×1, P1×3, P2×2)
- **convergence-gate-cite**: NEEDS-EDIT (P1×2, P2×1)
- **trading-anchor-traverser**: NEEDS-EDIT (P1×2, P2×1)

**Severity summary** (post-Mia adjustment): P0×1, P1×8, P2×5, P3×3 = 17 findings total.

**Mia pre-apply adjustments to agent report**:
- ✅ Cardinal-rule misalignment — CONFIRMED-GENUINE (trading/CLAUDE.md L9-20 verifies)
- ✅ Missing allowed-tools/paths — CONFIRMED-GENUINE
- ⚠️ Phantom state file — OVER-CATCH (`.wave-43-status` exists this fire); downgrade to P3 advisory
- ✅ trip-test phrase #5 risk — CONFIRMED-GENUINE
- ✅ trading-anchor-traverser missing isolation — CONFIRMED-GENUINE

**Recommended next action**: Pattern A fix-forward — apply 9 surviving Top-3 edits in single atomic commit. P0 first (allowed-tools), P1 cluster second.

VERDICT: ALL 3 ARTIFACTS NEEDS-EDIT — none READY-AS-IS; all have actionable, low-risk fix paths.
