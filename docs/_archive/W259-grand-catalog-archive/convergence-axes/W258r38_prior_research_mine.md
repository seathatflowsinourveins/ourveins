# W258r38 — Prior-Research Mine (W252-W257)

**Date:** 2026-05-16
**Sources read:** GRAND-SYNTHESIS-W253-2026-05-15.md, WAVE52-ITER1B-FINAL-REPORT.md, V5 kit (CONVERGENCE_INSIGHTS_AND_ARCHITECTURE.md, AUTOMATION_HARNESS_BLUEPRINT.md, CLAUDE.md)
**Verdict preview:** Modest revisions; W258 v4 ratifies most, but 4 GENUINELY-MISSED items + 3 inspiration-class additions surface.

---

## §1 Prior-wave inventory

| Wave | Coverage |
|---|---|
| **W251-W253 grand synthesis** | 95 repos × 10 dimensions; 21 categories; 14-tier install spine; cross-model GPT-5.5 ×2 Path P jobs; 27 INSTALL-NOW + 58 STUDY-PILOT + 10 DEFER + 0 REJECT |
| **Wave52** | 130 unique repos across kit v25/v26/v27; convergence tiers (3.0/2.5/2.0); 10 high-leverage uncatalogued |
| **V5/V6 kits** | 349-repo corpus; state-machine harness blueprint; worker/reviewer contracts; operating-rules CLAUDE.md |

---

## §2 GENUINELY-MISSED in W258 v4

1. **State-machine workflow blueprint** (V5 AUTOMATION_HARNESS_BLUEPRINT.md): INTAKE → PLAN → CONTEXT CAPSULE → SPAWN → IMPLEMENT → VERIFY → REVIEW → PR → AUTOFIX → MERGE → LEARN. W258 has agent-team patterns + Anthropic-OFFICIAL primitives but no explicit end-to-end state machine the operator can follow as a runbook. **Concrete patch:** add §X workflow blueprint with this 11-stage state diagram.

2. **`unslothai/unsloth` fine-tuning layer** (W253 §2 category winner): W258 has NO fine-tuning layer at all — local fine-tune was outside scope. W253 named it as the 21st category winner. **Patch:** add to §9 watchlist OR explicit "out-of-scope for daily-driver operator" note.

3. **`docling-project/docling` DocAI category** (W253 top-10 composite 4.70): document AI layer for PDF / scanned-doc / structured-content extraction. W258 v4 has no DocAI layer. **Patch:** add as L0 substrate alternative if operator works with PDFs/docs.

4. **OpenViking `examples/claude-code-memory-plugin/` Apache-2.0 subtree pattern** (W253 §5 P0 probe): selective-import nuance for AGPL parents with permissive subtrees. W258 v4 license-policy is binary (reject AGPL). **Patch:** add "selective-import" clause to L0.5 license section — Apache subtree of AGPL parent is import-eligible per LICENSE-blob inspection.

---

## §3 Inspiration-class additions worth bringing forward

5. **8 design rules from V5 CONVERGENCE_INSIGHTS**: "Never start by reading everything" / "Semantic tools before file bodies" / "Worktrees for every parallel task" / "Subagents for noisy research" / "Hooks for enforcement" / "Codex to challenge not rubber-stamp" / "CI as judge" / "Persist learning to Skills/rules/ADRs". W258 has fragments; V5 has them as a coherent block. **Patch:** add to §7 patterns as "8 SOTA operating rules."

6. **V5 CLAUDE.md operating-rules format** — terse router-style ≤15-LOC operating rules. Operator's CLAUDE.md is already pointer-style (≤50 LOC); V5 format is even tighter. Inspiration only — operator's current shape is fine.

7. **Worker contract / Reviewer contract prose** (V5 blueprint): pre-built prompts for subagent dispatch. W258 has agent-team plugin but not these specific contract templates. **Patch:** add as appendix prompt-library.

---

## §4 Confirmed already in v4

- Claude Code as foundation/driver ✓ (W253 §2)
- MCP universal substrate ✓ (W253 §2)
- obra/superpowers orchestration spine ✓ (v4 plugin set)
- Codex Path P pattern ✓ (v4 cross-model gate)
- repomix ADR/snapshot ✓ (v4 L1)
- promptfoo skill-eval ✓ (v4 §4 L4)
- LiteLLM/Helicone LLM router ✓ (v4 L2 — picked LiteLLM over Helicone, both viable per W253)
- ollama local serving ✓ (v4 L1)
- Stars-do-not-override-license discipline ✓ (v4 §9)
- pre-commit hooks ✓ (v4 L1)

---

## §5 Superseded by v4

- **V5 kit's 2026-05-04 cutoff** — predates the 6 Anthropic Q1/Q2 primitives (Managed Agents / Advisor / Tool search / Adaptive thinking / Compaction API / auto mode). v4 supersedes on Anthropic-canonical primitives.
- **W253 OpenHands+CodeAct ranking** — v4 r15 primary-source audit refuted the 68.4% claim; Live-SWE-agent at 79.2% is true (now caveated by Verified contamination per v4).
- **W253 14-tier install difficulty ordering** vs v4 8-layer + L0.5 architecture ordering — different framings, both valid; v4 is more current.

---

## §6 Verdict

**MODEST REVISIONS** — v4 backbone confirmed by W252-W257 convergence; 4 GENUINELY-MISSED items (state-machine blueprint / unsloth fine-tune mention / docling DocAI mention / OpenViking selective-import nuance) + 3 inspiration adds (8 design rules / worker-reviewer contract templates / operating-rules router format) warrant a v4.1 supplement document (additive, ~200 LOC), NOT a v5 rewrite. v4 stays as canonical synthesis; v4.1 supplement layers prior-wave inspiration without disturbing the audit chain.

Confidence: 0.84.
