# DRAFT v2 (Pattern A apply post codex W146-F5 NEEDS-REVISION conf=0.9; 8 prescribed_edits integrated) — codification block to APPEND at end of `docs/sota-architecture-audit/fire-29-w145-gpt55-research-arch-convergence/01-corrected-architecture.md` after L228

```markdown
---

## v23-v25 Architecture-Leverage Insights (Wave 146 Fire 5 codification)

> **Source**: Wave 146 Fire 1 Agent B sota-researcher Probe DAG 1-4 on outer-research kits v23-v25 (35 versions detected; v10-v25 sampled). 3 unique architecture-leverage insights NOT yet in this corrected architecture (per Agent B deliverable §"TOP 3 unique insights v23-v25 NOT yet in 01-corrected-architecture.md"). All 3 insights confirmed at SAME v25 source file per codex T1 W146-F5 direct probe.
>
> **Cite anchor (direct v25 source — TIER-1-USER-ARTIFACT local mirror)**: `docs/outer research/kits/v25/WHAT_WAS_NOT_COVERED_AND_CLOSED.md:5-24` — all 3 insights live in this single file [VERIFIED 2026-05-11 via direct file read + codex T1 W146-F5 Mia-probe + Mia n=279→n=281 ladder advance]
>
> **Cite anchor (Agent B synthesis layer)**: `tmp/wave146-f1-agent-b-sota-researcher-2026-05-11.md:27-38` — Agent B summary with operational mappings (e.g., "DISCOVERY-ONLY class" label is Agent B/eee synthesis terminology, NOT v25 verbatim)
>
> **Cite class** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
> - `constituents=[TIER-1-USER-ARTIFACT @ docs/outer research/kits/v25/WHAT_WAS_NOT_COVERED_AND_CLOSED.md:5-24 (direct local v25 mirror — NOT Agent B synthesis substitute), TIER-3-LOCAL-COMPOSITION @ this architecture-codification glue + Insight #2 DISCOVERY-ONLY class label (Agent B/eee synthesis, NOT v25 verbatim) + 8-axis criterion mapping to eee primitives]`
> - `effective_tier=TIER-3-LOCAL-COMPOSITION` (MIN_PRECEDENCE — local glue + DISCOVERY-ONLY framing synthesis)
>
> **Cross-model gate**: FULLY SATISFIED per CR-3 Phase 1 bootstrap exception — Path P REAL GPT-5.5 W146-F5 NEEDS-REVISION conf=0.9 → 8 prescribed_edits Pattern A applied → re-verified APPROVE pending T2/T3 post-commit verification

### Insight #1 (L3 extension) — Read-path token waste is BIGGER than shell-output waste

**Verbatim v25** (`docs/outer research/kits/v25/WHAT_WAS_NOT_COVERED_AND_CLOSED.md:18-20`): *"RTK helps shell output. It does not solve built-in Read/Grep/Glob or repeated file exploration. V25 therefore keeps Serena, Claude Context, Repomix, ast-grep, tree-sitter, Wet, Distill, and context-budget tooling as a separate layer."*

**Codification rationale**: L3 EVALUATION already enumerates `oraios/serena` (L80) + L2 INGESTION enumerates `yamadashy/repomix` (L69) + L3 enumerates `ast-grep/ast-grep` (L78). The DISTINCTION between the two token-waste classes (shell-output vs read-path) is NOT explicitly codified. Without this distinction, future architecture readers may conflate RTK-class mitigation (shell-output filtering) with semantic-index-class mitigation (read-path efficiency) — leading to incomplete token-budget discipline.

**The 2-class distinction**:

| Token-waste class | Mitigation tool layer | Where in this architecture |
|---|---|---|
| **Shell-output waste** (Bash/CLI commands producing 20+ lines flooding Claude context) | RTK token-saving hook + context-mode `ctx_batch_execute` / `ctx_execute` output filtering + `head -N` / `\| head` discipline | runtime tool layer (NOT enumerated in L0-L8 — operational discipline per CLAUDE.md hooks layer) |
| **Read-path waste** (Read tool consuming large source files / docs / SKILL.md beyond what's needed) | Serena LSP (semantic-symbol query) + Repomix tree-sitter compression (~70% token reduction per Repomix README) + ast-grep (AST-structural query) + Claude Context (codebase semantic index) + tree-sitter + Wet (text compression) + Distill (LLM summarization) | L2 INGESTION (Repomix) + L3 EVALUATION (Serena + ast-grep) + L7 CONSTRUCTION (Context7 for docs) |

**Operational rule** (eee runtime): SHELL-OUTPUT-WASTE is solved BY RTK + context-mode batch-execute output filtering. READ-PATH-WASTE is solved BY semantic retrieval (Serena/Repomix/ast-grep) — read once via query-then-extract pattern, NOT read entire file. Both classes are SEPARATE layers requiring SEPARATE mitigation; solving one does NOT solve the other.

### Insight #2 (L1 extension) — Pattern Libraries should NOT be runtime dependencies

**Verbatim v25** (`docs/outer research/kits/v25/WHAT_WAS_NOT_COVERED_AND_CLOSED.md:22-24`): *"Everything Claude Code, Superpowers, GSD, gstack, Matt Pocock Skills, and broad skill catalogs are valuable pattern sources. They should not be bulk-installed into every repo."*

**Codification rationale**: L1 DISCOVERY "Marketplaces" line (L66) currently conflates two distinct classes:
- **Install-class marketplaces** (provide `/plugin install <foo>` resolution path): `claude-plugins-official` + `PulseMCP` + `MCP Registry`
- **Pattern catalogs / broad skill libraries (eee/Agent B synthesis: "DISCOVERY-ONLY class" — NOT v25 verbatim)**: `awesome-claude-code` + `awesome-agentic-patterns` + `awesome-llm-apps` + `vinta/awesome-python` + `DeepWiki Directory` — and per v25 verbatim ALSO selectively-vendored catalogs like `everything-claude-code` + `obra/superpowers` + `gsd-build/get-shit-done` + `mattpocock/skills`. These are CITE-PATTERN sources; v25 says they "should not be bulk-installed into every repo" — they are valuable as DISCOVERY references but bulk-install would inflate runtime footprint without per-skill harness-fit verification.

**Extends existing FM row, NOT new failure mode**: This insight EXTENDS, rather than replaces, the existing Awesome-list bloat failure-mode mitigation at line 166 of this architecture file ("Treat awesome lists as discovery hints only, never as quality signal. Run full L3 eval."). The v25-derived extension adds: (a) explicit install-time prohibition for pattern libraries beyond awesome-lists (skill catalogs, plugin marketplaces with bulk-install semantics), (b) CR-12 disposition lattice mapping.

**Mapping to CR-12 5-class disposition lattice** (per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12):
- Pattern catalogs map to CR-12 **CITE-PATTERN-ONLY class** (similar to Wave 134 Fire 27-B langgraph ECOSYSTEM-IMPORT rationale — value via cite reference, not via install footprint)
- Install-class marketplaces map to CR-12 **GENUINELY-NEW** or **PROVIDER-COMPLEMENT** depending on duplicate-check
- Selectively-vendored catalogs (per Skill Orchestration Discipline in `Z:/claude-sota-installed/CLAUDE.md`) are EXCEPTIONS: install when ≥1 skill survives per-skill harness-fit verification (e.g., `superpowers` skills selectively vendored at `.claude/plugins/cache/claude-plugins-official/superpowers/`)

**Operational rule** (eee runtime): a pattern library qualifies for SELECTIVE-VENDOR (not bulk-install) only if specific skills/agents/commands within it survive per-skill harness-fit verification per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7. Bulk-install of entire catalogs is forbidden.

### Insight #3 (L1 extension) — High-star triage discipline: 8-axis architecture-leverage criterion

**Verbatim v25** (`docs/outer research/kits/v25/WHAT_WAS_NOT_COVERED_AND_CLOSED.md:5-16`): *"Earlier passes included many high-star repos, but the correct criterion is architecture leverage. V25 keeps high-star repos only when they improve: context control / semantic retrieval / worktree isolation / workflow state / review independence / quality/security gates / benchmark feedback / source auditability."*

**Codification rationale**: L1 DISCOVERY Correction #1 (line 50-66) demotes stars + popularity to "soft signal only" but does NOT codify the POSITIVE criterion for RETAINING high-star repos. Without the 8-axis positive criterion, future triage devolves to ad-hoc judgment.

**The 8-axis architecture-leverage criterion** (v25 vocabulary; eee operational mappings below — note: axis vocabulary is eee/v25 architecture-leverage terminology, NOT uniformly Anthropic-official terminology):

| # | Axis (v25 verbatim) | What it means (eee operational definition) | Existing eee primitive mapping |
|---|---|---|---|
| 1 | **Context control** | Token budget + read-path + shell-output discipline | Phoenix observability (Wave 109 Ship 2P) + cpa-usage-keeper :8079 + RTK hook + context-mode plugin |
| 2 | **Semantic retrieval** | Query-then-extract (NOT read-everything) — Insight #1 layer | Serena LSP + Repomix tree-sitter + ast-grep + Claude Context (when integrated) |
| 3 | **Worktree isolation** | Parallel-session concurrency primitive (Boris Cherny named-T2 pattern) | `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` + `claude --worktree` flag + `eee --worktree` launcher |
| 4 | **Workflow state** | Durable execution / retries / checkpoints / cross-session continuity | cwc-long-running-agents 6 primitives (INSTALLED-DORMANT per Wave 146 Fire 3 manifest) + planning-with-files |
| 5 | **Review independence** | Cross-model adversarial gate (cardinal-rule-3 Claude orchestrates / Codex reviews) | codex T1-T7 lifecycle + Path P REAL GPT-5.5 + Wave 146 Fire 1 3-agent fan-out + Wave 24-D advanced agent team standing directive |
| 6 | **Quality/security gates** | Pre-commit + secret-scan + LLM red-team + vulnerability scan | gitleaks v8.30.1 + osv-scanner + safety_guard.py + agent_plan_readonly_bash_guard.py + NVIDIA/garak v0.15.0 (Wave 147 Fire 2) |
| 7 | **Benchmark feedback** | Eval harness driving rubric updates (Day-1 install per Axis-5) | promptfoo (eval scaffold) + DeepEval v4.0.0 + Phoenix experiments + inspect_ai (queued) |
| 8 | **Source auditability** | Provenance + replay + signing (Sigstore/cosign + run_id + git SHA + prompt hash) | cosign verify-attestation (Wave 134 Fire 44-47) + Failure Mode #1 mitigation (provenance/replay schema) + `docs/install-provenance.md` append-only log |

**Anthropic policy alignment** (aligned with Claude Code practices and eee architecture vocabulary — NOT a claim of exact Anthropic-namespace match): the 8 axes operationally align with Claude Code practices documented at `code.claude.com/docs/en/*` (subagents use separate context windows for context preservation, hooks provide deterministic workflow control, settings/subagent docs support scoped tool permissions). The axis VOCABULARY itself is eee/v25 architecture-leverage terminology — Anthropic publishes the underlying primitives (subagents/hooks/permissions/worktrees/observability) but does not publish this specific 8-axis triage taxonomy.

**Triage rule** (eee runtime): a high-star repo qualifies for adoption-class evaluation if and only if it improves ≥1 of these 8 axes. Otherwise it is classified as CITE-PATTERN-ONLY (per Insight #2 pattern-libraries class) OR REJECT-FOR-FIT per CR-12. Star count alone is NEVER sufficient — must be coupled with axis-improvement evidence.

**Relationship to W134-F40 weighted rubric + SRA D1-D10**: the 8-axis criterion is an **ELIGIBILITY GATE applied BEFORE W134-F40 weighted-rubric scoring** (NOT a replacement for the rubric's Security 25% / Maintenance 20% / Capability 25% / Community 15% / License 10% / Performance 5% weights). The 3-gate sequence:

1. **GATE A (this 8-axis ELIGIBILITY)**: high-star repo must improve ≥1 of 8 architecture-leverage axes — POST-discovery, PRE-qualification
2. **GATE B (SRA D1-D10 ≥7/10 PASS per `Z:/claude-sota/.claude/rules/sota-research-architecture.md`)**: PRE-installation qualification (license-use-class / freshness / fresh-paint / maintainer-tier / active-maintenance / use-class-compat / Anthropic-policy / industry-adoption / FM-awareness / replacement-viability)
3. **GATE C (W134-F40 weighted-rubric per `docs/rubric.md`)**: weighted SCORING with Security 25% / Maintenance 20% / Capability 25% / Community 15% / License 10% / Performance 5%

GATE A is ORTHOGONAL to GATE B (different question: "does it leverage architecture?" vs "does it qualify for install?"). GATE C consumes outputs of A+B. All three apply — passing one does NOT substitute for passing the others.

---

**END OF v23-v25 INSIGHTS BLOCK**
```

(End of corrected draft codification — post W146-F5 codex T1 NEEDS-REVISION conf=0.9 8-prescription Pattern A apply — proposed for APPEND at L228 of 01-corrected-architecture.md)
