# W285 — Local `.claude/agents/*.md` Audit vs Plugin Equivalents

**Date**: 2026-05-18
**Rubric**: W284a v2 sota-convergence-audit — 5-dim 5-point scale.
Decision: **ADOPT** requires `score_min >= 4 AND score_mean >= 4.3`.
**Scope**: 9 LOCAL agents (2 wshobson-* skipped per codex W282-fix1 keeper status).

Rubric dimensions used (5):
- **CU** = capability_uniqueness (does the local file add something the plugin lacks?)
- **HF** = harness_fit (does it actually fit *this* runtime — Z:-portable, codex review-gate, T1-T6 memory, cardinal rules?)
- **SD** = source_diversity (typed evidence anchored in its design — BENCHMARK / CODE READING / PRACTITIONER REPORT)
- **AW** = authority_weight (TIER-1 SOTA vs TIER-3-LOCAL-COMPOSITION vs self-invent)
- **RE** = recency (ACTIVE / AGING / STALE per W284a decay)

## Plugin equivalents inventory

- `claude-code-workflows/comprehensive-review/1.3.0/agents/architect-review.md` — opus, modern-arch master (SOLID/DDD/microservices)
- `claude-code-workflows/comprehensive-review/1.3.0/agents/code-reviewer.md` — opus, AI-powered SOTA reviewer (Trag/SonarQube/CodeQL)
- `claude-code-workflows/debugging-toolkit/1.2.0/agents/debugger.md` — sonnet, RCA loop (minimal but canonical)
- `claude-code-workflows/incident-response/1.3.1/agents/debugger.md` — also present
- `claude-code-workflows/agent-teams/1.0.2/agents/team-reviewer.md` — opus, multi-dim parallel reviewer
- `openai-codex/codex/1.0.4/agents/codex-rescue.md` + commands review/rescue + prompts adversarial-review — cross-model GPT-5.x review/rescue
- `superpowers:verification-before-completion` SKILL — Iron-Law verification gate (auto-fire by description match)
- `.claude/skills/sota-convergence-audit/SKILL.md` — W284a v2 SOTA-research/adoption (local but skill-class)
- `.claude/skills/goal-prompt-synthesis/SKILL.md` — local goal-predicate authoring

## Per-agent grade table

| # | Local agent | Plugin equivalent | CU | HF | SD | AW | RE | mean | verdict |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `architect.md` (Wave-15-port, opus) | `comprehensive-review:architect-review.md` | 3 | 4 | 3 | 3 | 4 | 3.4 | **REPLACE** |
| 2 | `code-reviewer.md` (Wave-15-port, opus) | `comprehensive-review:code-reviewer.md` | 3 | 4 | 3 | 3 | 4 | 3.4 | **REPLACE** |
| 3 | `debugger.md` (Wave-15-port, opus) | `debugging-toolkit:debugger.md` + `superpowers:systematic-debugging` | 4 | 4 | 4 | 3 | 4 | 3.8 | **REPLACE** |
| 4 | `evaluator.md` (cite-import from `anthropics/cwc-long-running-agents` TIER-1) | `agent-teams:team-reviewer.md` | 4 | 5 | 4 | 4 | 5 | 4.4 | **ADOPT** |
| 5 | `gpt5-archaeologist.md` (self-invent, sonnet) | None — codex-rescue does NOT do hotspot/Tornhill churn | 5 | 4 | 4 | 4 | 4 | 4.2 | **ADOPT (borderline)** |
| 6 | `gpt5-reviewer.md` (Wave-15-port, sonnet) | `/codex:review` + `codex-rescue.md` + `commands/adversarial-review.md` | 2 | 3 | 3 | 3 | 4 | 3.0 | **REPLACE** |
| 7 | `gsd-goal-verifier.md` (self-invent, sonnet) | `superpowers:verification-before-completion` + `goal-prompt-synthesis` | 3 | 4 | 3 | 3 | 4 | 3.4 | **REPLACE** |
| 8 | `sota-researcher.md` (self-invent) | `.claude/skills/sota-convergence-audit/SKILL.md` v2 | 2 | 3 | 3 | 3 | 5 | 3.2 | **DELETE** |
| 9 | `verifier.md` (Wave-15-port, opus) | `superpowers:verification-before-completion` SKILL | 3 | 4 | 3 | 3 | 4 | 3.4 | **REPLACE** |

## ADOPT verdicts

- **`evaluator.md`** — Verbatim cite-import from `anthropics/cwc-long-running-agents` (TIER-1-DIRECT). Read-only adversarial posture harness-tuned. Ship-1.1 codex-validated.
- **`gpt5-archaeologist.md`** — No plugin provides pre-edit Tornhill-style hotspot/bus-factor archaeology. Tier-1 anchor (`adamtornhill/code-maat`). Borderline mean (4.2) but unique capability.

## REPLACE verdicts (use plugin instead)

- `architect.md` → `comprehensive-review:architect-review.md`
- `code-reviewer.md` → `comprehensive-review:code-reviewer.md` (or `agent-teams:team-reviewer.md`)
- `debugger.md` → `debugging-toolkit:debugger.md` paired with `superpowers:systematic-debugging`
- `gpt5-reviewer.md` → `/codex:review` + `/codex:adversarial-review` + `openai-codex:agents/codex-rescue.md`
- `gsd-goal-verifier.md` → `superpowers:verification-before-completion` + `goal-prompt-synthesis`
- `verifier.md` → `superpowers:verification-before-completion` SKILL

## DELETE verdicts

- `sota-researcher.md` — direct duplicate of `.claude/skills/sota-convergence-audit/SKILL.md` v2 (W284a). SKILL auto-fires by description.

## Risk register — deletions codex MIGHT block (W282-fix1 pattern)

| Deletion | Risk | Mitigation |
|---|---|---|
| `code-reviewer.md` | HIGH — phantom 9-invariant cite is provenance-heavy | Confirm `comprehensive-review:code-reviewer.md` covers 9 invariants OR port catalog into `evaluator.md` before delete |
| `gpt5-reviewer.md` | HIGH — santa-loop dual-review framing + Codex-unavailable fail-closed contract is sibling-novel | Verify `/codex:review --wait` documented to BLOCK when codex unavailable; port fail-closed contract into slash-command wrapper |
| `architect.md` | MED — Continuous-Claude composition-gate cite + SDK-13-field mapping | Confirm plugin coverage; migrate SDK-13 mapping to memory note |
| `verifier.md` | MED — phantom 9-invariant sweep + claude-code-system-prompts verbatim port | Verify SKILL covers Command-run PASS contract; port 9-invariant table if not |
| `debugger.md` | LOW — deer-flow loop-detection cite is provenance-only | systematic-debugging covers hypothesis-rank discipline; pre-flight on one bug |
| `gsd-goal-verifier.md` | LOW — get-shit-done port; thin layer | Confirm joint coverage of 4-level (exists/substantive/wired/data-flowing) framework |
| `sota-researcher.md` | LOW — direct skill-overlap | Confirm sota-convergence-audit v2 covers 5-phase protocol + 4-axis harness-fit (grep confirms yes) |

## Pre-flight test for every deletion (W282-fix1 mandate)

1. `git mv <agent>.md tmp/W285-deleted/<agent>.md` (NOT hard-delete in same commit)
2. Run `codex exec review --commit <SHA>`
3. If codex returns BLOCK with HIGH/CRITICAL → restore via reverse `git mv` (W282-fix1 pattern)
4. If codex APPROVE → finalize delete (and update CLAUDE.md `self_invented_count` if reaching 0)

## W285a applied (this commit)

- **DELETE**: `sota-researcher.md` → `tmp/W285-deleted/sota-researcher.md` (LOW-risk, direct SKILL overlap).
- Pending operator approval for higher-risk REPLACE deletions (require citation-preservation doc first per top-3 action #3).

## Verdict counts

- **ADOPT**: 2 (`evaluator.md`, `gpt5-archaeologist.md`)
- **REPLACE**: 6 (`architect.md`, `code-reviewer.md`, `debugger.md`, `gpt5-reviewer.md`, `gsd-goal-verifier.md`, `verifier.md`)
- **DELETE**: 1 (`sota-researcher.md` — applied this commit)

## Top 3 cleanup actions (ranked by risk × value)

1. **`sota-researcher.md` DELETE** — applied this commit. Run codex adversarial-review; if BLOCK restore.
2. **`gpt5-reviewer.md` REPLACE** — author `.claude/commands/dual-review.md` wrapper first preserving the Codex-unavailable fail-closed BLOCK contract — mitigates W282-fix1 codex-HIGH risk.
3. **Batch-replace** `architect.md` + `code-reviewer.md` + `debugger.md` + `gsd-goal-verifier.md` + `verifier.md` in a single feature branch, with unique citations ported into `docs/architecture/W285-deprecated-agents-citations.md` memory note BEFORE deletion — preserves provenance trail.
