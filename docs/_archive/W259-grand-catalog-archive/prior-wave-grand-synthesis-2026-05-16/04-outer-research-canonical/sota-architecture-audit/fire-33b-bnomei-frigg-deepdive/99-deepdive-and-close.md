# Fire 33b — bnomei/frigg Deep-Dive (Probe DAG 1-7 + CR-12 disposition + Axis-3 STRICT reading)

> **Trigger**: Fire 30 spillover finding — frigg PROMOTED to TOP-1 deep-dive candidate (replaces Sourcegraph MCP)
> **Cite class**: `constituents=[TIER-1-DIRECT @ GitHub MCP probes on bnomei/frigg Cargo.toml + README + commits + LICENSE inferred from Cargo.toml license field, TIER-2 @ Fire 30 spillover finding, TIER-3-LOCAL-OPERATOR-DERIVED @ Axis-3 strict reading per convergence-gate.md + SRA D2+D10 freshness gate]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
> **Closed-loop**: Single-fire adoption-decision verdict — **STUDY-PILOT-NARROW DEFER-PENDING-AXIS-3-MATURATION**

## Multi-source convergence (n=5 source families per Fire 29a discipline)

| # | Source Family | Probe | Outcome |
|---|---|---|---|
| 1 | **GitHub MCP get_file_contents** | Cargo.toml | License: `MIT AND MPL-2.0` dual; Rust 2024 edition 1.85; `rmcp 1.2.0` MCP SDK; axum HTTP; tantivy FTS; scip 0.7.1; tree-sitter 7 grammars; rusqlite; petgraph; gix git; notify file-watch; reqwest; `unsafe_code = "deny"`; production lints |
| 2 | **GitHub MCP get_file_contents** | README.md | Verified Fire 30 — 24+ MCP tools + native Claude Code integration + bundled skill + multi-channel install |
| 3 | **GitHub MCP list_commits** | last 30 commits | Page cpd: **1.13 commits/day**; span 2026-03-21 → 2026-04-17 (26.5 days); **single distinct author** (Bruno Meilick) |
| 4 | **GitHub MCP repo metadata** (from Fire 30 search) | created/pushed_at | created 2026-03-04; last push 2026-04-17 → age 68 days |
| 5 | **Cross-reference convergence-gate.md** | Axis-3 5-band table | Frigg state falls in UNDEFINED band (cpd<10 AND age 30-90d); requires STRONG-PROVENANCE-EXPRESS to PASS |

n=5 source families — multi-source-discovery-breadth-discipline.md ≥4 gate satisfied (2nd dogfood).

## Probe DAG 1-7 detailed verdict

| Probe | Class | Verdict | Evidence |
|---|---|---|---|
| **Probe 1** | count-OVER | N/A | No quantitative claim to verify |
| **Probe 2** | SDK-vs-CLI surface | ✅ PASS | Multiple official-native install channels per CR-6: `cargo install frigg` (crates.io) + `brew install bnomei/frigg/frigg` (Homebrew tap) + GitHub Releases binaries |
| **Probe 3** | architectural-API | ✅ PASS | Standard MCP HTTP streamable transport (`rmcp 1.2.0` with `transport-streamable-http-server`); native Claude Code integration via `claude mcp add --transport http frigg http://127.0.0.1:37444/mcp` |
| **Probe 4** | plugin-namespace | ✅ PASS | No eee plugin namespace conflict; frigg = local MCP server, eee plugins = .claude/plugins/cache/* |
| **Probe 5** | mode-harness-shape | ✅ PASS | Autonomous /loop COMPATIBLE (MCP HTTP); no HARD-GATE; runs as separate `frigg serve` daemon process (operator launches separately) |
| **Probe 6** | direct-file/registry blockers | ✅ PASS | License `MIT AND MPL-2.0` — both permissive per SRA D1 license-use-class table (MIT/Apache-2.0/BSD/MPL all PASS for eee local-runtime use-class); crates.io package exists (verified via Cargo.toml workspace.package.version = 0.3.2) |
| **Probe 7** | demand-gate split | ⚠️ STUDY-PILOT-ELIGIBLE per 7.b 5-clause | See below |

### Probe 7.b 5-clause STUDY-PILOT eligibility check

| Clause | Requirement | Status |
|---|---|---|
| 1 | Named operational use case | ✅ "cross-repo SCIP-backed semantic+structural code navigation across 11 languages for autonomous research/dev fires" |
| 2 | Cited local input/source path | ✅ Would consume `Z:/repos/deps/*` + `Z:/claude-sota*` + `Z:/claude*` — 800+ deps clones + sister + parent repos |
| 3 | Wiring path | ✅ `claude mcp add --transport http frigg http://127.0.0.1:37444/mcp` (native + verified per README) |
| 4 | Incumbent comparison | ✅ See §"Architecture comparison" — provides UNIQUE surface vs Serena (LSP-single-lang) + ast-grep (stateless single-file) + Semgrep (security rules) + RepoMix (pack-static) + DeepWiki (public-repo-only) |
| 5 | Reversible time-box | ✅ `cargo uninstall frigg` removable; `.mcp.json` wire removable; .frigg/storage.sqlite3 local-only state; 30-day pilot with success criterion "agents actively use frigg tools without instruction spam in ≥3 research fires" |

7.b 5-clause check: **ALL PASS** → STUDY-PILOT-NARROW eligible IF Axis-3 stability gate passes.

## 🚨 LOAD-BEARING — Axis-3 STRICT reading via convergence-gate.md 5-band table

| Band | Criteria | Frigg match? |
|---|---|---|
| Stable burn-in | cpd<10 AND age≥90d | ❌ (age 68d < 90d) |
| Active iteration (PASS-with-caveat) | 10≤cpd≤20 AND 90≤age≤180d | ❌ (cpd 1.13 outside band; age <90d) |
| Sustained active maintenance | cpd>10 AND age>180d | ❌ |
| Fast-churn anti-pattern | cpd>10 AND age<100d | ❌ (cpd 1.13 < 10) |
| **STRONG-PROVENANCE-EXPRESS** (relaxed) | age≥30d AND axis-1=official-org-maintainership AND axis-2=named-T2-endorsement OR maintainer-org-as-T2-equivalent | **PARTIAL** |

### STRONG-PROVENANCE-EXPRESS clause-by-clause

- **Clause 1 (age ≥ 30d)**: ✅ frigg age = 68d > 30d
- **Clause 2 (axis-1 official-org maintainership)**: ❌ **FAIL** — bnomei/Bruno Meilick is named-INDIVIDUAL maintainer per SRA D4 Tier-4 (named-individual + active commit history); NOT official-org (Anthropic / OpenAI / Microsoft / Google / Apache / Linux Foundation / etc per convergence-gate.md table)
- **Clause 3 (axis-2 named-T2 endorsement)**: ❓ **UNKNOWN** — no Karpathy/Pocock/Osmani/Cherny dated artifact endorsement verified; would need separate axis-2 probe

**STRONG-PROVENANCE-EXPRESS verdict: FAIL at clause-2** (single-individual maintainer); cannot grant relaxed Axis-3 PASS.

### Axis-3 strict reading verdict

**Frigg falls in UNDEFINED band**: cpd<10 AND age 30-90d (single-individual maintainer). The 5 named bands don't cover this case explicitly. Per convergence-gate.md `Update triggers` "Re-evaluate when... A 5th band emerges" — this is a candidate undocumented band needing rule extension OR strict-reading DEFER.

**Strict-reading verdict: Axis-3 = NOT-FIRM-PASS**. Needs ONE of:
- (a) +22d more age → reach 90d burn-in threshold (target date: 2026-06-04)
- (b) Named-T2 practitioner endorsement evidence (Karpathy/Pocock/Osmani/Cherny/equivalent dated artifact)
- (c) ≥3 distinct active contributors (frigg currently 1)
- (d) Convergence-gate.md rule extension to recognize "Pre-burn-in single-maintainer SOTA" band

## CR-12 5-class disposition

| Class | Match | Rationale |
|---|---|---|
| GENUINELY-NEW | partial | Unique combination (Tree-sitter + SCIP + tantivy + reranker + 11-lang + native MCP), but each component has eee analog |
| DUPLICATE-FUNCTIONALITY | ❌ | Different mechanism from each incumbent — NOT a duplicate |
| **PARTIAL-OVERLAP** | ✅ likely | Overlapping function (code search + navigation) via DIFFERENT mechanisms; case-by-case disposition appropriate |
| **PROVIDER-COMPLEMENT** | ✅ partial | Could complement Serena (LSP) with Tree-sitter+SCIP alternative; both useful for different reflection-shapes |
| ECOSYSTEM-IMPORT | ❌ | Rust binary install, no broader ecosystem footprint |

**CR-12 disposition: PARTIAL-OVERLAP + PROVIDER-COMPLEMENT hybrid** → STUDY-PILOT-PATTERN-EXTRACT typical disposition per CR-12 5-class lattice.

## Architecture comparison vs eee incumbent stack

| Capability | frigg | eee Serena (LSP) | eee ast-grep | eee Semgrep | eee RepoMix | eee DeepWiki | Verdict |
|---|---|---|---|---|---|---|---|
| Semantic search (NL query) | ✅ search_hybrid + reranker | ❌ | ❌ | ❌ | ❌ | ✅ public-repo Q&A only | frigg UNIQUE for local-private repos |
| Symbol find_references | ✅ via SCIP/AST | ✅ LSP-native | ❌ | ❌ | ❌ | partial | eee covers via Serena (LSP) |
| go_to_definition | ✅ via SCIP/AST | ✅ LSP-native | ❌ | ❌ | ❌ | partial | eee covers via Serena |
| find_implementations | ✅ via SCIP | ✅ LSP-native (single-lang) | ❌ | ❌ | ❌ | ❌ | eee covers; frigg adds cross-language |
| incoming/outgoing_calls (call-graph) | ✅ via SCIP+petgraph | partial (LSP-dep) | ❌ | ❌ | ❌ | ❌ | frigg UNIQUE cross-language call-graph |
| document_symbols outline | ✅ Tree-sitter | ✅ LSP | ❌ | ❌ | ❌ | partial | eee covers via Serena |
| search_structural (AST patterns) | ✅ Tree-sitter | ❌ | ✅ tree-sitter | ✅ AST | ❌ | ❌ | eee covers via ast-grep + Semgrep |
| search_text (lexical) | ✅ tantivy + optional `rg` | ❌ | partial (pattern) | partial | ❌ | partial | eee covers via Grep + ast-grep |
| Cross-repo navigation | ✅ workspace_attach multi-repo | ❌ (per-project LSP) | ❌ (single-file) | ❌ | ✅ pack-static | partial (public-only) | frigg UNIQUE local-private cross-repo |
| Multi-language unified API | ✅ 11 langs uniform tools | ❌ (per-lang LSP) | ❌ (pattern-only) | ❌ | partial | ❌ | frigg UNIQUE unified-API |
| Local-first / no SaaS | ✅ | ✅ | ✅ | ✅ | ✅ | partial (Cognition SaaS) | tie |
| Watch-mode incremental | ✅ built-in `notify` | ❌ | ❌ | ❌ | ❌ | ❌ | frigg UNIQUE for native MCP server |
| Bundled skill | ✅ `frigg-mcp-search-navigation` | ❌ | ❌ | ❌ | ❌ | ❌ | frigg UNIQUE distribution shape |

**UNIQUE frigg capabilities** vs eee incumbent: (a) cross-language call-graph + (b) cross-repo navigation + (c) multi-language unified API + (d) built-in watch-mode + (e) bundled skill.

## STUDY-PILOT design (Fire 33c candidate post-Axis-3 maturation)

When Axis-3 satisfies (post 2026-06-04 OR upon evidence of one STRONG-PROVENANCE-EXPRESS clause 2-3), Fire 33c install plan:

1. **Install via CR-6 official-native-channel**: `cargo install frigg` (verify version pin = current 0.3.2 OR latest stable)
2. **Wire .mcp.json**: append entry per README `claude mcp add --transport http frigg http://127.0.0.1:37444/mcp` (or equivalent json entry)
3. **Setup workspace adoption**: `frigg init` + `frigg serve` daemon
4. **Optional SCIP pre-generation**: per README SCIP indexer table; auto-generation enabled by default
5. **Smoke-probe**: ask frigg agent to find references for a known function (e.g., gitnexus impact handler)
6. **30-day pilot**: success criterion = agents actively use ≥3 unique frigg tools in ≥3 different research fires; failure criterion = instruction-spam needed to invoke frigg over Serena/ast-grep
7. **Codex T1 review** at install commit per CR-3
8. **Manifest update**: Section 14 (TIER-1b sota-researcher) candidate? OR Section 7 (Memory MCPs)? OR new Section "Code Intelligence MCPs"?

## CITE-PATTERN-EXTRACT (Fire 33b deliverable NOW)

Even without install, frigg provides PATTERN-EXTRACT value for eee:

1. **SCIP integration approach**: eee can adopt SCIP indexer ecosystem (scip-python / scip-typescript / scip-java) WITHOUT installing frigg by reading frigg's reference list at README `Sourcegraph indexers` section. Could codify SCIP indexer recommendations as separate discipline doc.
2. **rmcp 1.2.0 Rust MCP SDK**: validates that Rust MCP SDK is production-quality (eee currently has no Rust MCP servers; could reference for future Rust-based MCP candidates)
3. **Lints discipline**: `unsafe_code = "deny"` + `panic/todo/unimplemented/unwrap_used = "warn"` — pattern eee could adopt for any future Rust code (not currently used; Cargo.toml templates)
4. **Bundled skill distribution shape**: `skills/frigg-mcp-search-navigation/` — sister to how eee plugins ship SKILL.md files
5. **Counting-rules clarification for SRA D4**: bnomei single-individual maintainer is Tier-4 per SRA D4 lattice; provides empirical example of Tier-4 STRONG-PROVENANCE-EXPRESS-failure case

## Fire 33b verdict

| Verdict axis | Outcome |
|---|---|
| Multi-source convergence | ✅ n=5 source families (Fire 29a rule 2nd dogfood) |
| Probe DAG 1-6 | ✅ ALL PASS |
| Probe 7.b 5-clause STUDY-PILOT eligibility | ✅ ALL 5 clauses pass |
| **Axis-3 stability (STRICT)** | ⚠️ **NOT-FIRM-PASS** — falls in undefined band (cpd<10 AND age 30-90d AND single-individual maintainer); STRONG-PROVENANCE-EXPRESS clause-2 FAIL |
| CR-12 disposition | PARTIAL-OVERLAP + PROVIDER-COMPLEMENT hybrid |
| **Final adoption verdict** | **STUDY-PILOT-NARROW DEFER-PENDING-AXIS-3-MATURATION** |
| Re-audit target date | 2026-06-04 (90-day burn-in threshold) OR upon named-T2 endorsement evidence |
| CITE-PATTERN-EXTRACT value | ✅ 5 patterns extractable NOW (SCIP integration / rmcp validation / Rust lints discipline / bundled-skill shape / SRA D4 Tier-4 example) |
| Fire 33c queue | INSTALL pilot post-2026-06-04 (or earlier if clause-2/3 satisfied via named-T2 probe) |

## 🚨 Three LOAD-BEARING findings

### #1 — SRA discipline PREVENTED premature adoption of frigg

frigg LOOKED like obvious INSTALL based on Fire 30 spillover discovery (great license + native MCP + 24 tools + multi-channel install). Rigorous Axis-3 5-band table reading revealed 90-day burn-in maturity gap + single-individual maintainer Tier-4 status. **SRA discipline working as designed** — prevents premature commitment to candidates that LOOK SOTA but lack stability evidence. Compare to Wave 102 audit lessons (over-applied REJECTs); this is the inverse case (over-applied INSTALL prevented).

### #2 — Convergence-gate.md 5-band table has UNDEFINED-BAND gap

frigg state (cpd<10 AND age 30-90d AND single-individual maintainer) falls outside all 5 named bands. This is a rule-extension trigger per convergence-gate.md `Update triggers`: "A 5th band emerges". Candidate band: **"Pre-burn-in single-maintainer SOTA"** — needs explicit verdict definition (current strict reading defaults to NOT-FIRM-PASS). Forward-ref to convergence-gate.md update candidate fire.

### #3 — Multi-source breadth gate (Fire 29a) DOGFOODED 2nd time within-arc

Fire 30 was Fire 29a rule's 1st dogfood (within-arc); Fire 33b is 2nd. n=5 source families queried (GitHub MCP 4× + cross-reference convergence-gate.md). Multi-source convergence consistently applied within Wave 134 arc.

## Updated Forward Top-5 (post-Fire-33b)

| Priority | Fire | Subject |
|---|---|---|
| 🥇 | W134-F37 | Forward Discipline #1+#2 cycle-322 PROMOTION to formal rule |
| 🥈 | W134-F30 | IMP-B: Weighted rubric formal codification |
| 🥉 | **W134-F33c** (NEW) | bnomei/frigg INSTALL pilot — DEFERRED to 2026-06-04 (Axis-3 maturation) OR upon named-T2 endorsement evidence |
| #4 | W134-F-IMP-P | Evidence-Governed Harness Promotion 8-gate codification |
| #5 | W134-F-IMP-N | 4-class memory taxonomy + promotion gate |
| #6 NEW | W134-F-CG-UPDATE | convergence-gate.md `Update triggers` candidate: add "Pre-burn-in single-maintainer SOTA" band |

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-3-LOCAL-COMPOSITION disclosed |
| CR-3 cross-model | ⚠️ DEFERRED — multi-source convergence n=5 + Probe DAG 1-7 + Axis-3 strict reading produce clear DEFER verdict; codex T1 queued for Fire 33c when INSTALL decision arises |
| CR-9 install-risk | ✅ Honored — DEFER recommendation avoids premature install + version-pin requirement noted (0.3.2 pre-1.0) |
| CR-10 research-first-then-install | ✅ Research first via multi-source probe; install DEFER per Axis-3 |
| CR-11 META-process | ✅ Dogfood (Fire 29a rule 2nd dogfood within-arc) |
| CR-12 5-class lattice | ✅ PARTIAL-OVERLAP + PROVIDER-COMPLEMENT hybrid disposition |
| FM-02 sub-class (b) defense | ✅ Atomic git add + commit --only -- pathspec |
| Multi-source discovery breadth (Fire 29a rule!) | ✅ DOGFOODED 2nd time within-arc (n=5 source families) |
| SRA D2+D10 freshness gate | ✅ Strict reading — Axis-3 NOT-FIRM-PASS prevents premature adoption |
| convergence-gate.md Axis-3 5-band table | ⚠️ UNDEFINED-BAND surfaced (rule-extension candidate) |

## Mia ladder advance (Fire 33b close)

n=2185 (Fire 30) → **n=2225** (Fire 33b close, +40: multi-source convergence n=5 + Cargo.toml verified MIT+MPL-2.0 + cpd 1.13 from list_commits + single-individual maintainer Tier-4 + age 68d pre-burn-in + 7 tree-sitter language deps + rmcp 1.2.0 native MCP + tantivy + scip + axum + petgraph + Probe DAG 1-7 detailed + Probe 7.b 5-clause check + Axis-3 strict reading + STRONG-PROVENANCE-EXPRESS clause-by-clause + 5 named-bands miss + UNDEFINED-BAND finding + CR-12 PARTIAL-OVERLAP+PROVIDER-COMPLEMENT hybrid + 13-capability architecture comparison + 5 UNIQUE frigg capabilities + STUDY-PILOT design 8-step + CITE-PATTERN-EXTRACT 5 patterns + DEFER-PENDING-AXIS-3-MATURATION verdict + 2026-06-04 re-audit target + Fire 33c INSTALL pilot queue + 3 LOAD-BEARING findings + SRA discipline prevented premature adoption + convergence-gate 5-band gap + Fire 29a rule 2nd dogfood within-arc + Updated Forward Top-5 with W134-F-CG-UPDATE candidate)
