# The Corrected Research Architecture for a Solo Developer Using Claude Code (May 2026)

> **Provenance**: This document is the user-prescribed 9-layer "Definitive Research Architecture" with **Pattern A fix-forward applied** integrating GPT-5.5 Path P codex T1 SOTA convergence audit verdict (Wave 145 Fire 1, 2026-05-10).
>
> **Cite-class lattice** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
> - `constituents=[USER-PRESCRIBED @ original_doc, TIER-1-DIRECT @ Path P REAL GPT-5.5 codex T1 verdict at .claude/state/codex_consult_w145_f1_research_arch_sota_convergence_OUT.txt:1270 LOC / 115s wall-clock]`
> - `effective_tier=TIER-3-LOCAL-COMPOSITION` (MIN_PRECEDENCE — local glue + user prescription + GPT-5.5 verdict integration)
>
> **Cross-model gate**: FULLY SATISFIED per CR-3 Phase 1 bootstrap exception (REAL GPT-5.5 via codex CLI v0.130.0 subprocess)

## Key Corrections Applied (GPT-5.5 Pattern A)

### Correction #1 — ToxicSkills wording (critical)

**Original claim** (WRONG): "Snyk's ToxicSkills (Feb 2026) audited 3,984 public Agent Skills and found prompt injection in 36% and 1,467 malicious payloads."

**Corrected**: "Snyk's ToxicSkills (Feb 5 2026) audited 3,984 public Agent Skills; **1,467 (36.82%) had at least one security issue**; **76 confirmed malicious payloads**." (Per Snyk Feb 5 2026 publication — verified via GPT-5.5 cross-model audit)

### Correction #2 — Claude Code Tokenocalypse claim (downgrade)

**Original claim**: "Claude Code v2.1.100 introduced a token-inflation regression ('Tokenocalypse') still unpatched as of v2.1.138... pin v2.1.34."

**Corrected**: Mark as **`[LOCAL-MEASURED]` or `[UNKNOWN-PUBLIC]`** — not verified against primary Anthropic changelog/issue/reproducible benchmark in GPT-5.5 audit. Treat as field-evidence-only until backed by primary source.

### Correction #3 — Git MCP CVE timing

**Original claim**: "Three CVEs in Anthropic's own Git MCP (CVE-2025-68143/144/145) were prompt-injection-driven."

**Corrected**: CVE-2025-68143/144/145 — patched approximately Dec 17-18 2025 (per NVD + GitHub advisories); publicly disclosed/described as prompt-injection/RCE chain in Jan 2026 reporting. Distinguish patched-Dec-2025 from publicized-Jan-2026.

### Correction #4 — Anthropic skills marketplace policy (clarification)

**Original claim**: "The 'Anthropic skills marketplace' policy changed April 4, 2026 to restrict Pro/Max subscribers from third-party agent frameworks."

**Corrected**: More precisely — Claude subscriptions **stopped covering third-party harnesses such as OpenClaw starting Apr 4 2026**. Not specifically a "skills marketplace" policy change per public reporting.

### Correction #5 — L4 skill-creator reclassification

**Original L4 placement**: `anthropics/skills skill-creator` listed as primary L4 Comparison primitive (Eval/Improve/Benchmark sub-agents).

**Corrected**: `skill-creator` is **L7 Construction** (skill packaging/generation), NOT L4 Comparison. For L4 evaluation use: `inspect_ai` + `promptfoo` + `deepeval` + (NEW) Phoenix experiments + OpenAI evals/simple-evals.

---

## Corrected 9-Layer Reference Architecture

### L0 FOUNDATION (unchanged)
- Claude Code 2.x (Opus 4.7 / Sonnet 4.6 / Haiku 4.5) + Skills + Hooks + Subagents + Plugins + Worktrees + Native OpenTelemetry + .claudeignore + Plan Attestation

### L1 DISCOVERY (REVISED — star/popularity demoted)
**Primary discovery (TIER-1)**:
- `github/github-mcp-server` (remote OAuth) — Official, OAuth, toolset-scoped
- `cli/cli` — gh CLI scripting fallback
- `google/deps.dev` API (free, no key) — transitive deps + Scorecard + license, 7 ecosystems

**Search MCPs**:
- Brave Search + Exa (semantic findSimilar) + Firecrawl (with egress policy — see L8) + Context7 (live, version-pinned docs)

**Auxiliary discovery (DEMOTED from rubric-input — per GPT-5.5 Axis-1)**:
- `pingcap/ossinsight` — useful analytics surface but NOT a SOTA discovery authority; not a security/quality signal
- `star-history/star-history` — soft popularity signal only; vulnerable to hype/manipulation; never weighted-rubric input without normalization
- `snyk.io/advisor` — proprietary scoring with coverage limits; pair with OSV + deps.dev + Scorecard + OpenSSF Best Practices + direct repo security policy inspection

**Academic** (unchanged): arXiv + Semantic Scholar + Papers With Code

**Marketplaces**: awesome-claude-code + claude-plugins-official + PulseMCP + MCP Registry + DeepWiki Directory

### L2 INGESTION (unchanged)
- gh CLI clone + Software Heritage archive snapshot + Firecrawl (with egress policy) + `yamadashy/repomix` + `cognition-ai` DeepWiki MCP

### L3 EVALUATION (EXPANDED — secret scanning + LLM red-team added)
- **Surface signals**: stars + age + forks + commits-90d
- **OpenSSF Scorecard CLI** (18 checks, 0-10 each)
- **NEW: `gitleaks/gitleaks` OR `trufflesecurity/trufflehog`** — secret scanning at every clone/audit step (Axis-3 missing-SOTA #5 per GPT-5.5)
- **`google/osv-scanner`** (Google OSV DB)
- **NEW: PROMOTE to Day-1** per GPT-5.5 Axis-5
- `aquasecurity/trivy` + `anchore/syft+grype` (SBOM+CVE) — note Trivy supply-chain caveat below
- `semgrep/semgrep` + `ast-grep/ast-grep` — structural code-quality patterns
- `github/codeql` — deep static analysis (heavyweight, optional)
- `oraios/serena` — LSP-backed semantic understanding
- **License**: SPDX + ScanCode + FOSSA (commercial)
- **NEW: LLM red-team layer** — `NVIDIA/garak` for prompt-injection/jailbreak/data-leakage testing (Axis-3 missing-SOTA #4 per GPT-5.5)
- **Maintainer credibility**: gh api users/<u>, Sigstore

### L4 COMPARISON (REVISED — skill-creator moved out, broader eval stack)
- **`UKGovernmentBEIS/inspect_ai`** + `inspect_evals` — 200+ pre-built evals + Claude Code bridge (PRESCRIBED Day-1)
- **`promptfoo/promptfoo`** — declarative YAML A/B; used by OpenAI & Anthropic (PRESCRIBED Day-1)
- **`confident-ai/deepeval`** — 50+ metrics, pytest-like (PRESCRIBED for Python shops)
- **NEW: `Arize-ai/phoenix`** — OSS LLM tracing/evals/experiments for RAG/agent debugging (Axis-3 missing-SOTA #3 per GPT-5.5; CR-12 PROVIDER-COMPLEMENT to Langfuse)
- **Reference benchmarks** (sanity-check only): SWE-bench Pro / Vibe Code Bench / VIBE Bench / Terminal-Bench (note: Terminal-Bench reported gameable per UC Berkeley RDI)
- **Custom task harness** derived from project's real tickets

**MOVED OUT of L4**: `anthropics/skills skill-creator` → relocated to L7 Construction (skill packaging/generation, not evaluation)

### L5 SELECTION (revised rubric guidance)
- **Weighted rubric**: Security 25% / Maintenance 20% / Capability 25% / Community 15% / License 10% / Performance 5%
- **`comparison-matrix.md`** (markdown, git-versioned)
- **`thomvaill/log4brains` MADR** — OPTIONAL Month-1 ergonomics ONLY; plain MADR markdown is baseline per GPT-5.5 Axis-1 (not clearly SOTA-converged in 2026)
- **Tie-breakers**: maintainer bus-factor, OpenSSF Best Practices badge tier, time-decay, downstream blast radius
- **REVISED community input**: stars and OSSInsight popularity demoted to **soft signal only** — NOT direct rubric input; require corroboration with commits + releases + downstream dependents + maintainer signing (Sigstore)

### L6 KNOWLEDGE (unchanged)
- `OthmanAdi/planning-with-files` — task_plan.md / findings.md / progress.md + PreToolUse + PostToolUse hooks + SHA-256 plan attestation
- `.specify/memory/constitution.md` (Spec-Kit)
- `docs/adr/*.md` (log4brains OR plain MADR markdown)
- `docs/research/comparisons/*.md`
- `mem0` (only for cross-session personalization — optional)

### L7 CONSTRUCTION (skill-creator added here per Correction #5)
- `obra/superpowers` (brainstorming → plan → TDD → review) — 174K+ stars
- `github/spec-kit` (/speckit.constitution → .specify → .plan → .tasks → .implement)
- `upstash/context7` — live, version-pinned docs
- `microsoft/playwright-mcp` + `apify/actors-mcp-server` (with permission audit — see L8)
- **MOVED HERE: `anthropics/skills` skill-creator** — auto-generated tested skills (packaging/generation primitive, NOT evaluation)
- **NEW (HIGH-IMPACT for autonomous loops): stateful orchestration layer** — `langchain-ai/langgraph` for durable execution / retries / checkpoints / human interrupts (Axis-3 missing-SOTA #1 per GPT-5.5)
  - **CR-12 disposition**: ECOSYSTEM-IMPORT — CITE-PATTERN-ONLY in current eee runtime; STUDY-PILOT only if explicit need for graph orchestration emerges
- **NEW (cross-model comparison baseline): `openai/openai-agents-python`** — official non-Anthropic agent SDK with tracing/handoffs/guardrails (Axis-3 missing-SOTA #2 per GPT-5.5)
  - **CR-12 disposition**: PROVIDER-COMPLEMENT — Anthropic SDK PRIMARY, OpenAI SDK ALTERNATIVE for cross-model SOTA convergence

### L8 FEEDBACK (REVISED — provenance/replay + native OTel + Phoenix-or-Langfuse PRIMARY)
- **Native OTel** (Claude Code 2.x) — built-in OTLP traces/metrics/logs (note: OTel GenAI conventions still Experimental as of early 2026)
- **PRIMARY trace/eval store** — pick ONE: `langfuse/langfuse` (self-hosted, OTel-native) **OR** `Arize-ai/phoenix` (local-first OSS) per GPT-5.5 Axis-1 — both convergent options
- **`Piebald-AI/splitrail`** — TREAT AS EXPERIMENTAL per GPT-5.5 Axis-1 (not enough evidence of broad adoption); pilot only after primary trace store proven
- **`TechNickAI/claude_telemetry`** — FALLBACK only if native OTel events are insufficient (overlaps with native OTel)
- **NEW: Mandatory Day-1 provenance/replay schema** per GPT-5.5 Axis-4 #1:
  - Every loop emits: `run_id` + `git SHA` + `model ID` + `prompt hash` + `tool allowlist` + `dependency lock snapshot` + `test command` + `token/cost` + `final diff` into OTel/Langfuse/Phoenix
  - Block commits missing this metadata for high-risk changes
- Post-mortem ADRs (log4brains OR plain MADR) update rubric weights
- Quarterly recursion: re-run L3-L5 on the architecture

---

## REVISED Day-1 Install Set (per GPT-5.5 Axis-5)

### Day-1 PROMOTED (was Week-1+ in original; promoted per GPT-5.5 Axis-5):
1. **`google/osv-scanner`** — open vulnerability database scanning BEFORE any autonomous dependency update
2. **`gitleaks/gitleaks` OR `trufflesecurity/trufflehog`** — secret scanning for autonomous agents with filesystem/git access
3. **`langfuse/langfuse` OR `Arize-ai/phoenix`** — trace capture MUST start before autonomous loops (otherwise early failures + token regressions are unauditable)
4. **`promptfoo/promptfoo` OR `UKGovernmentBEIS/inspect_ai`** — minimal eval harness BEFORE installing many skills/MCPs (so behavior changes are measurable)
5. **MCP inspector / audit step** — server capability review + transport/auth inspection BEFORE broad MCP installation

### Day-1 BASELINE (unchanged from original):
- Claude Code 2.x baseline (`npm i -g @anthropic-ai/claude-code`)
- `obra/superpowers` — `/plugin install superpowers@claude-plugins-official`
- `github/spec-kit` — `uv tool install specify-cli`
- `OthmanAdi/planning-with-files`
- `github/github-mcp-server` (remote OAuth)
- `upstash/context7`
- `oraios/serena`
- `ossf/scorecard`

### DELAYED from Day-1 (per GPT-5.5 Axis-5):
1. **`thomvaill/log4brains`** → Week 1 (plain MADR markdown is baseline)
2. **`pingcap/ossinsight`** → Week 1 (after baseline scanner/eval stack exists)
3. **`star-history/star-history`** → Month 1 (soft due-diligence only)
4. **Firecrawl** → Week 1 (after egress policy + redaction in place)
5. **Apify actors MCP** → Month 1 (after MCP permissioning + observability proven)

---

## Updated Failure Modes Table (with 3 NEW gaps per GPT-5.5 Axis-4)

| Failure mode | Mitigation |
|---|---|
| Star bias | Cap stars at 5% of total weight; require Scorecard + Snyk + your eval to corroborate. |
| Awesome-list bloat | Treat awesome lists as discovery hints only, never as quality signal. Run full L3 eval. |
| Stale benchmarks | Never quote SWE-bench Verified ≥85% as a verdict (SWE-ABS shows ~19.78% false positives). Use Inspect AI on your own task suite. |
| Maintainer abandonment | Scorecard.Maintained < 5 = reject; bus-factor = 1 with no last-90d commits = reject. Sigstore-signed commits required for high-trust dependencies. |
| Security theater | Scorecard alone insufficient. Add OSV-Scanner + Trivy + Syft+Grype + Semgrep; require ZERO Critical OSV. |
| License pollution | SPDX scan in CI; allowlist enforced in `repo-evaluate`; copyleft penalty. |
| Prompt injection in research data | Lethal Trifecta filter (Simon Willison); summarize untrusted README/issue through Serena/repomix compressed dump. |
| Hallucinated repos | `gh repo view owner/repo` verification before any citation; reject if 404. |
| MCP supply-chain risk | Snyk ToxicSkills Feb 2026: 1,467 of 3,984 skills (36.82%) had at least one security issue; 76 confirmed malicious payloads. Install only from `claude-plugins-official` or repos with ≥1000 stars + recent commits + Sigstore-signed releases + no opaque post-install scripts. |
| YOLO mode drift | Never enable `--dangerously-skip-permissions` outside isolated CI. |
| Source leak | Don't run agents from `~/`; always cd into project root with `.claudeignore` set. |
| Tokenocalypse-style billing bugs | `[LOCAL-MEASURED]` only — verify with `claude --version` and Splitrail/native OTel data weekly. |
| **NEW #1: Agent action provenance and replay underspecified** | Make every loop emit run_id + git SHA + model ID + prompt hash + tool allowlist + dependency lock snapshot + test command + token/cost + final diff into OTel/Langfuse/Phoenix; block commits missing this metadata for high-risk changes. |
| **NEW #2: Secret/private-source exfiltration controls insufficient** | Day-1 gitleaks/trufflehog + explicit MCP egress allowlisting + no-auth remote MCP review + prompt/content redaction defaults + policy: private repos NEVER go to DeepWiki/Firecrawl/Exa/Brave unless approved. |
| **NEW #3: Benchmark overfitting / eval contamination mitigation incomplete** | Private regression tasks + mutation tests + adversarial tests + live issue replay + at least one independent judge harness BEFORE promoting any tool or model based on benchmark claims. |

---

## Cross-Validation with Wave 134 Fire 27 Series

The user-prescribed architecture's L7 Construction layer benefits from cross-validation with already-completed Wave 134 Fire 27 audits:

| Repo | Wave 134 Fire | Verdict | CR-12 Class |
|---|---|---|---|
| `openai/openai-agents-python` | Fire 27-A (`4a811d9`) | STUDY-PILOT-PATTERN-EXTRACT conf=0.89 | PROVIDER-COMPLEMENT (4th class) |
| `langchain-ai/langgraph` | Fire 27-B (`3a4ede7`) | Pattern B HNF → inferred STUDY-PILOT-PATTERN-EXTRACT ~0.78-0.82 | ECOSYSTEM-IMPORT (5th class) |
| `mem0ai/mem0` | Fire 27-C (`92f9ea1`) | STUDY-PILOT-PATTERN-EXTRACT conf=0.87 | PARTIAL-OVERLAP (3rd class) |

These prior Wave 134 audits prescribe **CITE-PATTERN-ONLY adoption** for langgraph (200MB+ ecosystem, 5+ sub-packages) and **STUDY-PILOT** for openai-agents-python — matching GPT-5.5's Axis-3 missing-SOTA prescriptions for cross-model SOTA convergence.

---

## CR-12 Disposition Lattice Applied (per CLAUDE.md cardinal-rule-12)

GPT-5.5's 5 missing-SOTA repos map to the formal CR-12 5-class disposition lattice (codified Wave 134 Fire 27-D commit `23ea082` per CLAUDE.md L286-326):

| Repo | Class | Disposition |
|---|---|---|
| `langchain-ai/langgraph` | **ECOSYSTEM-IMPORT** (5th) | CITE-PATTERN-ONLY — 200MB+ ecosystem disproportionate to core primitive value |
| `openai/openai-agents-python` | **PROVIDER-COMPLEMENT** (4th) | INSTALL as ALTERNATIVE — Anthropic SDK retains PRIMARY |
| `Arize-ai/phoenix` | **PROVIDER-COMPLEMENT** (4th) | INSTALL as ALTERNATIVE to Langfuse — local-first OSS observability |
| `NVIDIA/garak` | **GENUINELY-NEW** (1st) | INSTALL via CR-12 PRIMARY path (LLM red-team is new scope, not duplicate) |
| `trufflesecurity/trufflehog` | **PARTIAL-OVERLAP** (3rd) | CASE-BY-CASE vs `gitleaks/gitleaks` — same scope (secret scanning), different mechanisms |

---

## Recursion Discipline Preserved

Per `cross-model-consensus.md` + `closed-loop-recursive-narrowing.md`:
- This corrected architecture is itself subject to quarterly re-audit (re-run L3-L5 on each L0-L8 component)
- GPT-5.5 cross-model voice should be re-fired Q3 2026 to verify time-decay corrections + new SOTA emergence
- Every prescribed pick has a refresh date (90 days from selection ADR) — log4brains optional, plain MADR markdown sufficient

---

## What This Corrected Architecture Enables

1. **Solo developer can run autonomous research loops** with provenance/replay built in from Day-1 (Axis-4 #1 mitigation)
2. **Discovery + evaluation + comparison + construction** all backed by multi-org Axis-1 SOTA convergence (NOT single-source picks per GPT-5.5 Axis-1)
3. **Secret exfiltration + benchmark gaming + provenance gaps** explicitly mitigated (NEW failure modes #1-#3 from GPT-5.5 Axis-4)
4. **Install ordering optimized for safety-first** — OSV + gitleaks + Langfuse/Phoenix + minimal eval harness BEFORE broad MCP/crawler installation (Axis-5)
5. **CR-12 disposition lattice integrated** — every new repo prescription has formal classification (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT)
6. **Time-decay claims corrected** — ToxicSkills wording + Tokenocalypse downgrade + CVE dates + marketplace policy phrasing aligned with primary sources per GPT-5.5 Axis-2
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
