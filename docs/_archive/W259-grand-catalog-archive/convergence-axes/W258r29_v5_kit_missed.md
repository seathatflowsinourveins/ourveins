# W258r29 — V5-Kit Missed Candidates Verification (2026-05-16)

**Mission:** Verify 9 candidates from prior local V5 SOTA kit that W258 r1-r25 missed. Determine if any genuinely revise the final architecture.

**Method:** Direct GitHub HTML fetch via `ctx_fetch_and_index` (concurrency 8, GitHub API was 403-rate-limited). 1 API success (`claude-task-master`); 8 via HTML pages.

**Verdict:** **Architecture EXTENDED but NOT REVISED.** 2 ADOPT-NOW additions surfaced that fill real gaps (ast-grep + rtk); 4 PATTERN-CITE-ONLY; 1 REJECT-FOR-FIT; 1 DEFER; 1 WATCHLIST. None of the 9 displace W258 incumbents. **Confidence 0.86.**

---

## §1 Per-candidate verification

### A. Harness / orchestrator alternatives

| Repo | Stars | License | Last activity | Verdict |
|---|---|---|---|---|
| **bmad-code-org/BMAD-METHOD** | 46,569★ | MIT | 2026-05-04 | **REJECT-FOR-FIT** |
| **eyaltoledano/claude-task-master** | 27,200★ | MIT (NPM package) | 2026-04-28 | **DEFER** |
| **automazeio/ccpm** | 8,100★ | (likely MIT — repo public) | active | **PATTERN-CITE-ONLY** |
| **opensesh/KARIMO** | 179★ | (small) | active | **PATTERN-CITE-ONLY** |
| **FlineDev/TandemKit** | 24★ | (small) | active | **PATTERN-CITE-ONLY** |

**BMAD-METHOD** — "Agile AI Driven Development framework." `npx bmad-method install` writes 12+ agents + 34+ workflows into project tree (HEAVY footprint, CC-agnostic). Operator already has 12 `.claude/agents/*` + 37 plugins — install would **collide with existing agent surface**. The Agile-PM pattern is interesting but the install is too opinionated for operator's already-curated stack. r16 over-build critique applies strongly here.

**claude-task-master** — "AI-powered task-management system you can drop into Cursor, Lovable, Windsurf, Roo, and others." MCP-based, 7-36 tools added per `TASK_MASTER_TOOLS` mode (context-flood risk per r23 code-execution-with-MCP pattern). Multi-IDE focus not CC-native enough. Operator's TodoWrite + CLAUDE.md scratchpads + 37-plugin orchestration cover this slot already.

**ccpm** — "Project management skill system using GitHub Issues + Git worktrees for parallel agent execution." Genuinely novel pattern: **Issues-as-state-of-truth + worktree-per-agent for parallel runs**. Convergent with Stripe Minions (r7) + multi-agent r9 P9. The PATTERN is high-value; the installer is "another skill system" overlapping with existing 37 plugins (r16 + r22 DRY-analog). Pattern-cite for the Issues-state pattern.

**KARIMO** — Claude Code harness engineering plugin. Adds branch-identity-verification + wave-ordered-parallelism + complexity-routing + git-state-reconciliation + semantic-loop-detection. Patterns are EXACT match for operator's existing W-N codification workflow + r9 P14 stall-detection. Low-star (179) — pattern-cite only, not install.

**TandemKit** — Planner/Generator/Evaluator orchestration harness for Claude Code (and Codex). Three role files (Planner.md / Generator.md / Evaluator.md) cleanly implement r9 P10 plan-execute decoupling + 3-T2 named-practitioner pattern from r6. Operator's codex Path P + agent-teams plugin already fills this role; TandemKit is the OSS reference shape. Cite only.

### B. Code intel / token-context tools

| Repo | Stars | License | Last activity | Verdict |
|---|---|---|---|---|
| **rtk-ai/rtk** | (active, v0.37.2) | MIT | 2026-05+ | **ADOPT-NOW** |
| **ast-grep/ast-grep** | 13,800★ | (likely MIT per typical) | 2026-05-06 | **ADOPT-NOW** |
| **zilliztech/claude-context** | 11,100★ | (active) | active | **STUDY-PILOT** |
| **mixedbread-ai/mgrep** | (npm @mixedbread/cli) | Apache-2.0 | active | **WATCHLIST** |

**rtk-ai/rtk** — "CLI proxy that reduces LLM token consumption by 60-90% on common dev commands. Single Rust binary, zero dependencies." Provides `rtk ls` (filtered tree skipping `.git`, `node_modules`), `rtk read` (intelligent minimal/aggressive code filtering), `rtk smart` (local Llama-3.2-1B summaries). Available via Homebrew. **Closes operator-cost-gap** that r13 cost convergence highlighted: every CC Bash `ls`/`cat`/tree call burns context; rtk pre-trims before LLM sees output. Complementary to LiteLLM cascade routing (different layer — substrate level token reduction, not model routing).

**ast-grep** — "CLI tool for code structural search, lint and rewriting. Tree-sitter-based, multi-language (Go/Java/Python/Rust/TypeScript/...)." Has LSP mode + scan/test/rules-CRUD subcommands. **Fills a slot W258 architecture missed:** Serena gives symbol-level LSP, Repomix packs whole codebase, GitNexus is graph-DB code intel — but **ast-grep is the AST-pattern search-and-rewrite tool**. Different role: semantic codemod + structural lint (e.g., "rewrite all `Promise.then()` chains as `await`"). Operator's Ruff covers Python; ast-grep covers cross-language AST-level codemod.

**zilliztech/claude-context** — "Code search MCP for Claude Code. Make entire codebase the context for any coding agent." From Zilliz (Milvus vector DB co) — likely vector-embedding semantic-code-search MCP. **Possibly complementary to Repomix** (tree-sitter packing) — different modality (vector embeddings vs structural compression). Needs side-by-side test vs operator's Repomix MCP before commit. r17 MCP-ecosystem fork did NOT surface this one — gap closed.

**mgrep** — "Calm, CLI-native way to semantically grep everything — code, images, pdfs and more." Apache-2.0, npm @mixedbread/cli. Has `mgrep install-claude-code` direct CC integration command. Multimodal (code + images + PDFs) is differentiated. Operator's stack has no multimodal search; matter only if operator works with non-code artifacts (which they may not). WATCHLIST.

---

## §2 Convergence vs W258 architecture

### Harness layer (Archon as pattern-cite incumbent)

**Does any of (BMAD/claude-task-master/ccpm/KARIMO/TandemKit) BEAT Archon's ralph-dag pattern-cite verdict?**

**No.** All 5 are operator-fit-questionable for the same reason r16 critique flagged Archon: operator already has 37 plugins + 12 agents + curated CC stack. Adding *another* harness/orchestrator on top would be DRY-violation + r16 over-build. The PATTERNS (BMAD's agile workflow / ccpm's Issues-as-state / KARIMO's stall-detection / TandemKit's planner-generator-evaluator) are high-quality cite material. None earn an install slot above Archon's pattern-cite-only status.

**Pattern additions to W258 architecture (NOT installs):**
1. **ccpm pattern** — Issues-as-state-of-truth for parallel agent runs (matches Stripe Minions r7)
2. **TandemKit pattern** — Planner.md/Generator.md/Evaluator.md as file-spec for role decomposition (matches r9 P10)
3. **KARIMO pattern** — wave-ordered-parallelism + complexity-routing + semantic-loop-detection (matches r9 P14 stall-detection)

### Code-intel layer (Serena + Repomix + GitNexus + Ruff incumbents)

**Does ast-grep / claude-context / mgrep add a SLOT operator doesn't have?**

**YES — two genuine gaps closed:**

1. **ast-grep fills AST-pattern search+rewrite slot.** Serena is symbol-LSP, Repomix is whole-codebase pack, GitNexus is graph-DB code intel, Ruff is Python-specific. None do "find all instances of `<AST pattern>` and rewrite as `<new pattern>`" cross-language. ast-grep does this natively.

2. **claude-context potentially fills vector-embedding code-search slot.** Repomix compresses via Tree-sitter (structural); claude-context (Zilliz/Milvus-backed) would be vector-embedding semantic search. Different modality — likely complementary, not duplicate. Needs pilot before commit.

3. **rtk fills per-Bash-call token-tree-shake slot.** Pre-LLM context reduction at the shell-tool layer. Complementary to LiteLLM cascade routing (which is model-level cost).

---

## §3 Genuinely-new install recommendations (≥2-axis convergence)

| Priority | Tool | Install | Why |
|---|---|---|---|
| **T1 — ADOPT-NOW** | `ast-grep` | `npm install -g @ast-grep/cli` OR `brew install ast-grep` | AST-codemod slot (fills gap operator's Serena+Repomix+GitNexus don't cover); 13.8k★; Rust-native, multi-language; LSP mode available |
| **T1 — ADOPT-NOW** | `rtk-ai/rtk` | `brew install rtk` (or release binary) | Per-command token reduction 60-90%; closes r13 cost-economics gap; MIT; single Rust binary, zero deps; reversible (don't shell-alias `ls`→`rtk ls` if it breaks) |
| **T2 — STUDY-PILOT** | `zilliztech/claude-context` | `pnpm install + MCP add` (see repo) | Vector-embedding code-search MCP; potentially complementary to Repomix (different modality); 11.1k★; needs side-by-side comparison with Repomix on operator's actual codebase before commit |
| **T3 — PATTERN-CITE-ONLY** | `automazeio/ccpm` | (do NOT install) | Issues-as-state pattern is high-value cite (matches Stripe Minions r7); installer overlaps with existing 37 plugins |
| **T3 — PATTERN-CITE-ONLY** | `FlineDev/TandemKit` | (do NOT install) | Planner.md/Generator.md/Evaluator.md role-spec pattern is clean cite material for r9 P10 plan-execute decoupling |
| **T3 — PATTERN-CITE-ONLY** | `opensesh/KARIMO` | (do NOT install) | Stall-detection + wave-ordered parallelism + complexity-routing patterns; matches r9 P14; low-star = early; cite-only |
| **T4 — WATCHLIST** | `mixedbread-ai/mgrep` | — | Multimodal semantic grep; only matters if operator works with image/PDF artifacts |
| **T5 — DEFER** | `eyaltoledano/claude-task-master` | — | 27k★ but multi-IDE focus + context-flood risk (7-36 MCP tools) + operator's TodoWrite+CLAUDE.md already covers slot |
| **T6 — REJECT-FOR-FIT** | `bmad-code-org/BMAD-METHOD` | — | 46k★ but `npx bmad-method install` writes 12+ agents + 34+ workflows — heavy footprint conflicts with operator's existing curated `.claude/agents/*` + plugin set; r16 over-build applies |

---

## §4 Confirmed-redundant / confirmed-inferior

- **BMAD-METHOD** install — operator already has 12 `.claude/agents/*` from W255 + 37 plugins; BMAD's 46-file write would collide. Pattern interesting; install over-built.
- **claude-task-master** task-MCP — operator's TodoWrite + CLAUDE.md + 37-plugin orchestration cover task-management. claude-task-master's multi-IDE bias (Cursor/Lovable/Windsurf/Roo) makes it less CC-optimized than alternatives.
- **All 5 harness alternatives** — Archon already classified pattern-cite-only per r6 (only Cole Medin advocates); none of BMAD/task-master/ccpm/KARIMO/TandemKit have stronger T2-practitioner convergence than Archon.

---

## §5 Phantoms / dead / niche

**No phantoms.** All 9 candidates verified to exist + active (last commit ≤ ~6 weeks for all).

**Niche (not phantoms but small/early):**
- KARIMO (179★) — small but interesting patterns
- TandemKit (24★) — very small, file-spec pattern is the value
- mgrep (multimodal) — niche unless operator does image/PDF work

---

## §6 Verdict

**The 9 V5-kit candidates EXTEND but DO NOT FUNDAMENTALLY CHANGE the W258 final architecture.**

**Concrete adds to W258 final synthesis (per r28 in-flight):**

1. **Add `ast-grep` to L0 substrate / code-intel** — fills AST-pattern codemod slot (~2-axis confidence: high stars + role uniqueness)
2. **Add `rtk-ai/rtk` to L0 substrate / shell-proxy** — fills per-command token reduction slot (~2-axis confidence: MIT clean + r13 cost convergence alignment)
3. **Conditional `zilliztech/claude-context` install** — pilot vs Repomix before commit
4. **Pattern-cite additions to L6** — ccpm Issues-as-state + TandemKit role-spec + KARIMO stall-detection (already partially captured via r9 P14)

**Architecture verdict for W258 final synthesis remains as r1-r25 converged. These 9 add 2 concrete shell-level installs + 3 patterns + 1 pilot — no architectural slot reshuffles.**

**Confidence: 0.86.** GitHub API rate-limit forced HTML fallback (no SPDX license verification for several repos — operator should verify LICENSE blob before commercial use); ast-grep license inferred from typical Rust-ecosystem norms (need LICENSE-file probe); rtk version 0.37.2 confirms active but live star count not obtained via HTML.

---

## §7 Cite-anchors

- **r1-r25** prior W258 rounds (24 axes already converged)
- **bmad_html** + **bmad-METHOD** kit reference @ Wave 52 iter3a (operator's local catalog)
- **GitHub HTML pages** for all 9 candidates fetched 2026-05-16
- **r6 named-practitioners** — Archon pattern-cite-only verdict (single-T2-author)
- **r9 orchestration patterns** — P10 plan-execute + P14 stall-detection convergence
- **r13 cost economics** — token-reduction gap rtk addresses
- **r16 architecture critique** — over-build risk for additional harness installs
- **r17 MCP ecosystem** — claude-context gap identified
- **r22 context engineering** — DRY-violation guard for additional plugins
- **r23 Anthropic internal** — code-execution-with-MCP pattern (counters context-flood from claude-task-master)
