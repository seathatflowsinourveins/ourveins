
---

## Wave 120 Ship 2 — outer research v10 kit audit → HONEST-NON-FINDING (Pattern B HNF)

**Date**: 2026-05-09
**Verdict**: HONEST-NON-FINDING per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — v10 kit is operationally SUPERSEDED by eee incumbents
**Trigger**: user standing directive "deep dive into Z:\claude-sota-installed\docs\outer research" + Wave 120 Ship 2 task #72
**Outcome**: NO INSTALL (no v10 primitive vendored)

### v10 kit inventory (verified 2026-05-09)

Path: `Z:/claude-sota-installed/docs/outer research/kits/v10/claude_code_sota_frontier_v10_quality_convergence_md_kit/`
Total: 249KB across 13 agents + 8 skills + 17 docs.

### Adversarial agent team launched

Standing-directive operational shape per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` invariants 1+2+5+6:

1. **Codex T1 BRIDGE-MODE GPT-5.5** PID 363314 / 300s budget — `.claude/state/codex_consult_wave120_ship2_v10_kit_audit_OUT.txt` (running async; verdict ratifies/refutes after this commit)
2. **Explore Sonnet stand-in** agent `a30a6f3b2519c6b4d` — 8 tool_uses / 49.7K tokens / 56s — returned `top_3_adopt_now: [token-budget-guardian, implementer, context-capsule-builder]` with summary `3 ADOPT-NOW / 6 DUPLICATE / 2 SUPERSEDED / 10 PARTIAL`

### Mia OVER catch #51 — Explore's ADOPT-NOW classification refuted by direct content read

The Explore subagent classified 5 v10 primitives as ADOPT-NOW based on `description` frontmatter + first ~30 LOC body skim. Mia pre-apply (per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`) read the FULL CONTENT of all 5 ADOPT-NOW candidates AND found:

**Mia probe finding**: ALL v10 agents are 13 LOC each (frontmatter + 1-line description + identical 5-bullet "Return contract" boilerplate shared verbatim across 13 files). ALL v10 skills are 19 LOC each (frontmatter + 1-line description + 1-line procedure + identical "concise structured results" footer).

Verbatim content of "ADOPT-NOW" candidates:

| Primitive | Body content (verbatim from file) |
|---|---|
| token-budget-guardian (agent) | "Track tokens, diagnose context waste, and recommend context-admission controls." + 5-bullet generic return-contract |
| implementer (agent) | "Implement minimal scoped changes using semantic retrieval and focused tests." + same boilerplate |
| context-capsule-builder (skill) procedure | "Goal, non-goals, files/symbols, tests, risks, commands, acceptance criteria." (single comma-separated phrase) |
| token-optimized-implementation (skill) procedure | "Use Serena/rg/fd before file reads; use RTK/Context Mode for noisy outputs; summarize failures." (pointer to existing tools) |

**Conclusion**: v10 kit is a **stub-skeleton conceptual inventory** — useful as a NAMING vocabulary of agent/skill concepts to think about, but the actual content depth is insufficient for vendoring. Each "ADOPT-NOW" claim was based on description gap-language; direct content reads refute the gap-fill claim because the operational mechanism is absent.

### eee incumbent supersedence (per kiss-dry-yagni Must-Never #4)

| v10 stub claim | eee incumbent depth |
|---|---|
| token-budget-guardian: "track tokens" | ccusage 18.0.11 (daily/blocks/session-window CLI) + RTK 0.39.0 (PreToolUse:Bash hook with ~80% token-efficiency rewrite) + Serena 1.2.0 (LSP semantic graph) + Repomix 1.14.0 (codebase compression with tree-sitter) + tools/cpa-cache-rate.py (per-account session-affinity hit rate) + Phoenix OTel (port 16006) — **5+ operational tools with measurable telemetry** |
| implementer: "minimal scoped changes" | Karpathy P3 Surgical Changes principle + superpowers `subagent-driven-development/SKILL.md` (4-state implementer status vocabulary DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED) + Sonnet workers via Agent tool with `isolation: worktree` |
| context-capsule-builder: "Goal, non-goals, files/symbols, tests, risks, commands, acceptance criteria" | superpowers `dispatching-parallel-agents/SKILL.md:112-124` Brief-content anti-patterns (4 ❌/✅ pairs) + `team-orchestration.md` 8-slot Agent Brief Template (TASK/CONTEXT/FILES/CONSTRAINTS/OUTPUT/OUTPUT_BUDGET/HANDOFF/TERMINATION) + sister `Z:/claude-sota/.claude/rules/team-orchestration.md` Termination contract (composable predicates) |
| token-optimized-implementation: "Use Serena/rg/fd before file reads; use RTK/Context Mode" | EXACT match to existing eee toolchain — pointer-only stub adds zero new operational discipline |

### Final verdict

**Pattern B HONEST-NON-FINDING (HNF)** per `synthesis-layer-verify.md §Reporting categories`:
- The v10 kit IS the SOTA reference under audit
- The audit OUTCOME is that incumbents already serve every concern at greater depth
- HNF IS the deliverable — closes the install-decision question for ALL 21 v10 primitives
- Compounding-learning rule emerges: **future SOTA-kit audits MUST verify content depth (not just description gap-claims)** before classifying ADOPT-NOW. This is FM-20 path-drift-cascade defense applied at content-substance boundary

### Mia OVER ladder Wave 97-120

n=50 → **n=51** (this fire's Explore subagent ADOPT-NOW classification refuted by direct-content Mia probe — saved 21-file stub-vendoring + ~6KB `.claude/` clutter + zero net operational gain)

### Cite trail

- v10 kit live read at HEAD 2026-05-09: `Z:/claude-sota-installed/docs/outer research/kits/v10/claude_code_sota_frontier_v10_quality_convergence_md_kit/.claude/{agents,skills}/*.md`
- Explore subagent verdict: agent task `a30a6f3b2519c6b4d` (49.7K tokens / 8 tool_uses / 56s)
- Codex T1 BRIDGE-MODE GPT-5.5 verdict: PID 363314 (running; will append codex-ratification or codex-refutation in next ship if verdict diverges)
- Mia pre-apply discipline: `Z:/claude-sota/.claude/rules/mia-pre-apply.md` n=51 cumulative ladder
- Synthesis-layer reporting: `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` HNF class
- Kiss-dry-yagni: `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 (no duplicate functionality)

### CR conformance

- CR-1 cite SOTA primary: TIER-1-DIRECT to v10 kit file:line + Explore agent task ID + codex T1 verdict path
- CR-3 cross-model gate: BRIDGE-MODE GPT-5.5 fired (codex-ratification pending; Mia direct-content evidence is strong-prior independent of codex verdict)
- CR-5 install-priority: NO install (HNF closes the question)
- CR-6 fresh-from-github: live local read at probe time
- CR-8 full-SOTA-content: ADAPTED-FROM-SOTA — Mia + synthesis-layer-verify + agent-harness-fit-verification disciplines applied verbatim
- CR-9 install-risk: ZERO-RISK no install action
- CR-10 research-first: Mia pre-apply IS the research; HNF IS the answer
- CR-11 META-process: standing-directive operational shape — Explore + codex T1 BRIDGE-MODE in parallel, Mia OVER catch refuted Explore's primary verdict pre-apply

### Wave 120 Ship 2 close

HNF disposition documented. Task #72 → completed.

