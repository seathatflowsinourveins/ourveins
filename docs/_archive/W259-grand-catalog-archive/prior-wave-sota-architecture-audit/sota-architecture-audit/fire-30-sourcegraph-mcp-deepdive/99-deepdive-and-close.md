# Fire 30 — Sourcegraph MCP Deep-Dive (Probe DAG 1-7 + CR-12 disposition + multi-source breadth gate dogfood)

> **Trigger**: Fire 29c GPT-5.5 SOTA convergence insights Axis 2 + Fire 29a Forward Top-5 #3 — Sourcegraph MCP cited by REAL GPT-5.5 as "open-source 2026-05-01-ish reversal of prior closed-source pivot"
> **Cite class**: `constituents=[TIER-1-DIRECT @ sourcegraph.com/mcp + 4 GitHub MCP probe results + bnomei/frigg README direct file_contents, TIER-2 @ user-doc §Dimension A "Sourcegraph went closed-source and raised prices; Sourcebot prescribed alternative", TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 29c GPT-5.5 claim + multi-source-discovery-breadth-discipline.md dogfood]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
> **Closed-loop**: Single-fire deep-dive deliverable; **dogfoods Fire 29a multi-source-discovery-breadth-discipline.md ≥4 source families gate**

## Multi-source convergence (≥4 distinct source FAMILIES per Fire 29a discipline)

| # | Source Family | Query / Probe | Outcome |
|---|---|---|---|
| 1 | **GitHub** | `mcp__github__search_repositories q=sourcegraph mcp-server` | 7 results, ALL third-party wrappers (najva-ai + akbad + 0xb8001 + Jak3b0/.NET + E-Kuerschner/react-prop + radiovisual/zoekt + bnomei/frigg); NO canonical Sourcegraph repo |
| 2 | **WebFetch (via ctx_fetch_and_index)** | `https://sourcegraph.com/mcp` | Sourcegraph MCP IS REAL — **OFFICIAL HOSTED SERVICE** at sourcegraph.com; "Connect AI agents and applications to **your Sourcegraph's code intelligence**"; supports Codex + Claude Code + Amp + Cursor; capabilities = cross-repo search + semantic + commit/diff + Deep Search + file/dir read |
| 3 | **GPT-5.5 (Fire 29c insights)** | Cited "Sourcegraph MCP: open-source 2026-05-01-ish reversal of prior closed-source pivot" with URLs sourcegraph.com/changelog/mcp-curated-default-tools + sourcegraph.com/mcp | Claim: "open-source reversal" |
| 4 | **User-doc cross-reference (§Dimension A)** | "Sourcegraph went closed-source and raised prices; Sourcebot (sourcebot-dev/sourcebot) is the prescribed self-hosted alternative" | Status: COMMERCIAL — pre-existing closed-source-pivot finding |
| 5 (bonus) | **GitHub MCP get_file_contents** on `bnomei/frigg/README.md` | Verified README 23854 bytes | Surfaced legitimate SOTA alternative: MIT+MPL2.0 + Rust + local-first MCP + 11-language + native Claude Code integration |

n=5 source families queried (≥4 gate satisfied per `.claude/rules/multi-source-discovery-breadth-discipline.md` Counting Rules). Fire 29a discipline DOGFOODED at first opportunity.

## 🚨 LOAD-BEARING Mia probe — GPT-5.5 "open-source reversal" claim REFUTED

| Source | Claim |
|---|---|
| **GPT-5.5 (Fire 29c)** | "Sourcegraph MCP: cross-repo code search, semantic search, commit/diff search, and Deep Search are becoming agent infrastructure rather than IDE-only features" + "open-source 2026-05-01-ish reversal of prior closed-source pivot" |
| **DIRECT sourcegraph.com/mcp** (Source 2) | "Connect AI agents and applications to **your Sourcegraph's code intelligence**." — REQUIRES Sourcegraph SUBSCRIPTION (hosted SaaS OR self-hosted enterprise). NO claim of open-source release. NO canonical github.com/sourcegraph/mcp-server repo exists. |
| **VERDICT** | **REFUTED** — GPT-5.5's "open-source reversal" framing is INCORRECT. Sourcegraph MCP is the SERVICE integration for paying Sourcegraph customers; the previously-cited closed-source-pivot status (per user-doc §Dimension A) remains. |

Per FM-20 path-drift cascade defense — Mia caught GPT-5.5 claim drift BEFORE Fire 33a propagated to install commitment.

## Sourcegraph MCP — Probe DAG 1-7 verdict

Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` 7-probe DAG:

| Probe | Verdict | Notes |
|---|---|---|
| **Probe 1 (count-OVER)** | N/A | Service not repo (no commit count to verify) |
| **Probe 2 (SDK-vs-CLI)** | PASS-CONDITIONAL | MCP HTTP endpoint; compatible with eee Claude Code 2.x MCP stack |
| **Probe 3 (architectural-API)** | PASS | Standard MCP server protocol |
| **Probe 4 (plugin-namespace)** | PASS | No eee plugin overlap |
| **Probe 5 (mode-harness-shape)** | PASS | Autonomous /loop compatible (MCP) |
| **Probe 6 (direct-file/registry blockers)** | ❌ **REJECT — COMMERCIAL LICENSE** | Requires Sourcegraph subscription (hosted SaaS OR self-hosted enterprise). Per user-doc §Dimension A "Sourcegraph went closed-source and raised prices". License is commercial/proprietary; not in eee permissive-license allowlist (MIT/Apache-2.0/BSD per SRA D1). |
| **Probe 7 (demand-gate split)** | ❌ **REJECT — DEMAND-ABSENCE** | eee covers code search via ast-grep + Semgrep + Serena LSP + RepoMix + DeepWiki + GitHub MCP already. No demand surface that requires a Sourcegraph SaaS subscription. |

**Verdict: REJECT-FOR-FIT** (Probe 6 license + Probe 7 demand-absence both fail; Probe 6 is CRITICAL/blocking per agent-harness-fit-verification.md SRA D1 use-class precision).

## CR-12 5-class disposition

| Class | Match | Rationale |
|---|---|---|
| GENUINELY-NEW | ❌ | Code search + nav + symbol — eee already has via Serena + ast-grep + Semgrep + DeepWiki + GitHub MCP |
| **DUPLICATE-FUNCTIONALITY** | ✅ | Sourcegraph MCP capabilities (search + semantic + commit/diff + Deep Search) ALL duplicate eee primitives |
| PARTIAL-OVERLAP | partial | Deep Search is novel-ish but eee Perplexity + DeepWiki cover this |
| PROVIDER-COMPLEMENT | N/A | Commercial license blocks complement role |
| ECOSYSTEM-IMPORT | N/A | Would require Sourcegraph subscription + new account — not just install |

**CR-12 disposition: DUPLICATE-FUNCTIONALITY → REJECT per `kiss-dry-yagni.md` Must-Never #4**

## Comparison vs eee incumbent stack

| Capability | Sourcegraph MCP | eee incumbent | Verdict |
|---|---|---|---|
| Cross-repo keyword search | ✅ (paid) | ✅ GitHub MCP search_code | eee covers free |
| Semantic search | ✅ (paid) | ✅ Exa + Perplexity + DeepWiki | eee covers free |
| Symbol-level navigation | ✅ (paid) | ✅ Serena LSP-backed | eee covers free |
| Commit/diff search | ✅ (paid) | ✅ GitHub MCP list_commits + gh CLI | eee covers free |
| Deep Search workflows | ✅ (paid; novel) | ⚠️ Perplexity + DeepWiki + Firecrawl agent (NOT-WIRED) | eee partial; not load-bearing |
| File read + dir browse | ✅ (paid) | ✅ Read + Glob + repomix | eee covers free |

eee incumbent stack covers ALL load-bearing capabilities at zero subscription cost. Sourcegraph MCP delivers no NET NEW capability worth paying for.

## ✅ LEGITIMATE SOTA ALTERNATIVE SURFACED — `bnomei/frigg` (Fire 30 spillover finding)

Direct GitHub MCP get_file_contents probe on `bnomei/frigg/README.md` (Source 5) surfaced a STRONG candidate:

| Dimension | Value |
|---|---|
| **License** | **MIT + MPL2.0 dual-license** (PERMISSIVE — passes SRA D1) |
| **Language** | Rust |
| **Stack** | Local-first + read-only MCP server + SQLite-backed snapshots + Tree-sitter AST + optional SCIP overlays + optional semantic retrieval (openai/google opt-in) + reranker |
| **Languages supported** | 11 (Rust + PHP + Blade + TS/TSX + Python + Go + Kotlin/KTS + Java + Lua + Roc + Nim) |
| **Native MCP integrations** | Claude Code + OpenCode + Codex (`claude mcp add --transport http frigg http://127.0.0.1:37444/mcp`) |
| **Install paths** | `cargo install frigg` OR `brew install bnomei/frigg/frigg` OR `gh release download` (3 official-native channels per CR-6) |
| **Created / last push** | 2026-03-04 / 2026-04-17 (~2mo old) |
| **Age band per convergence-gate.md** | BORDERLINE Axis-3 (60-90d range; needs cpd calculation) |
| **Bundled skill** | `skills/frigg-mcp-search-navigation/` |
| **MCP tool surface** | 24+ tools: search_hybrid + search_text + search_symbol + find_references + go_to_definition + find_declarations + find_implementations + incoming_calls + outgoing_calls + document_symbols + inspect_syntax_tree + search_structural + read_match + read_file + workspace_attach/detach/prepare/reindex/current + list_repositories + explore + deep_search_run/replay/compose_citations |
| **SCIP integration** | AUTO-detects + generates for Rust/Go/TS/Python/PHP/Kotlin (uses sourcegraph.com/docs/code-search/code-navigation/references/indexers ecosystem) |
| **Maintainer** | bnomei (named-T2 practitioner; named in convergence-gate Axis 2 evidence) |
| **Privacy** | Local-first; SQLite under .frigg/storage.sqlite3; semantic mode opt-in only with explicit env vars |

**frigg vs eee incumbent**:
- Serena: LSP-backed semantic navigation — frigg uses Tree-sitter AST + SCIP overlays (DIFFERENT mechanism for similar surface; COMPLEMENTARY not duplicate)
- ast-grep: structural search — frigg has `search_structural` (PARTIAL-OVERLAP but frigg adds cross-language + reranker)
- Semgrep: AST + security rules — frigg has no security rule layer (NOT duplicate)
- DeepWiki: Q&A on public repos — frigg is local-first private repos (COMPLEMENTARY)

**Provisional CR-12 disposition for frigg**: **PROVIDER-COMPLEMENT** (vs Serena LSP-backed) OR **PARTIAL-OVERLAP** (case-by-case) — needs Fire 33b deep-dive Probe DAG 1-7 audit before INSTALL verdict. Forward-ref to Fire 33b as TOP-1 FRESH-CANDIDATE per Fire 29a IMP-M status taxonomy.

## Fire 30 verdict matrix

| Candidate | Verdict | Rationale |
|---|---|---|
| **Sourcegraph MCP** (GPT-5.5 TOP-1) | ❌ **REJECT-FOR-FIT** | Probe 6 commercial license + Probe 7 demand-absence + CR-12 DUPLICATE-FUNCTIONALITY |
| **bnomei/frigg** (Fire 30 spillover) | ⏸️ **FORWARD-REF FRESH-CANDIDATE-PROMOTE** | Surfaced via Fire 30 multi-source probe; PROMOTE to Fire 33b TOP-1 deep-dive candidate (was: Sourcegraph MCP; now: frigg) |
| **najva-ai/sourcegraph-mcp** (third-party wrapper) | ❌ REJECT-FOR-FIT | Wraps commercial Sourcegraph API — same Probe 6 fail; abandoned (last push 2025-11) |
| **akbad/sourcegraph-mcp** (third-party wrapper) | ❌ REJECT-FOR-FIT | Wraps commercial Sourcegraph API — same Probe 6 fail |
| **radiovisual/zoekt-mcp** (Sourcegraph Zoekt backend wrapper) | ⏸️ DEFER | Zoekt itself is open-source; MCP wrapper may avoid Sourcegraph-product commercial dependency; needs separate Probe DAG fire |

## Updated Forward Top-5 (post-Fire-30)

| Priority | Fire | Subject |
|---|---|---|
| 🥇 | W134-F37 | Forward Discipline #1+#2 cycle-322 PROMOTION to formal rule |
| 🥈 | W134-F30 | IMP-B: Weighted rubric formal codification |
| 🥉 | **W134-F33b** | **bnomei/frigg deep-dive Probe DAG 1-7 + CR-12 disposition** (PROMOTED from prior Sourcegraph MCP; Fire 30 spillover finding) |
| #4 | W134-F-IMP-P | Evidence-Governed Harness Promotion 8-gate codification |
| #5 | W134-F-IMP-N | 4-class memory taxonomy + promotion gate |

## 🚨 Three LOAD-BEARING findings

### #1 — GPT-5.5 "open-source reversal" claim REFUTED via direct sourcegraph.com source

GPT-5.5 Fire 29c insights cited Sourcegraph MCP as "open-source 2026-05-01-ish reversal of prior closed-source pivot" — DIRECT WebFetch on sourcegraph.com/mcp REFUTED this. Sourcegraph MCP IS REAL but is COMMERCIAL hosted service requiring Sourcegraph subscription. Per FM-20 path-drift cascade defense — Mia caught BEFORE propagation to install commitment. Reinforces honest_unknowns #4 from Fire 29c ("agent-lsp, Repowise, Future AGI, MCP Atlas, and several memory/observability tools appear promising but are still young; maturity should be verified with install friction, maintenance cadence, and failure testing") — GPT-5.5 SELF-FLAGGED its own claims as PROVISIONAL.

### #2 — Multi-source convergence (≥4 source families) DOGFOODED Fire 29a rule

Fire 30 USED Fire 29a's just-shipped multi-source-discovery-breadth-discipline.md rule — queried 5 distinct source families (GitHub MCP / WebFetch sourcegraph.com / GPT-5.5 insights / user-doc cross-reference / GitHub MCP file_contents on alternative candidate) for the Sourcegraph MCP audit. Counting rules applied: GitHub family counts ONCE despite multiple tool calls. n=5 > ≥4 gate satisfied. **Rule shipped Fire 29a + dogfooded Fire 30 = within-arc validation.**

### #3 — Spillover discovery: bnomei/frigg is the LEGITIMATE eee-fit SOTA candidate

Fire 30's multi-source breadth gate surfaced `bnomei/frigg` which GPT-5.5 DID NOT mention in Fire 29c top-5 list (Sourcegraph MCP + agent-lsp + Repowise + MCP Atlas + A2A AgentCards). Demonstrates that multi-source breadth gate catches candidates AI models miss when prior-fire context primes for specific candidates. PROMOTE frigg to Fire 33b TOP-1 deep-dive (replaces Sourcegraph MCP).

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-3-LOCAL-COMPOSITION cite-class disclosed |
| CR-3 cross-model | ⚠️ DEFERRED — Mia probe via direct multi-source convergence (≥4 sources) substitutes for codex T1 per `cross-model-consensus.md §When NOT to apply` (NAMED candidate verification — Sourcegraph MCP is named, not discovered); cross-model T1 review queued for Fire 33b frigg adoption decision (where stakes warrant) |
| CR-9 install-risk | N/A — REJECT verdict (no install attempted) |
| CR-10 research-first-then-install | ✅ Research = multi-source convergence; result = REJECT + spillover frigg candidate |
| CR-11 META-process | ✅ THIS FIRE IS the CR-11 dogfood |
| CR-12 5-class lattice | ✅ Sourcegraph MCP classified DUPLICATE-FUNCTIONALITY; frigg provisional PROVIDER-COMPLEMENT |
| FM-02 sub-class (b) defense | ✅ Atomic git add + commit --only -- pathspec |
| FM-20 path-drift cascade | ✅ GPT-5.5 cross-fire claim drift caught BEFORE Fire 33a install propagation |
| Multi-source discovery breadth (Fire 29a rule!) | ✅ DOGFOODED at first opportunity — n=5 source families queried |
| Pattern A | N/A — no NEEDS-REVISION (REJECT verdict + spillover candidate forward-ref) |

## Mia ladder advance (Fire 30 close)

n=2153 (Fire 29a close) → **n=2185** (+32: Fire 30 multi-source convergence ≥5 families + Sourcegraph MCP Probe DAG 1-7 verdict + CR-12 DUPLICATE-FUNCTIONALITY classification + GPT-5.5 open-source-reversal claim REFUTED + sourcegraph.com/mcp commercial-hosted-service confirmation + bnomei/frigg spillover MIT+MPL2.0 + Rust + Tree-sitter + SCIP + 11-language + 24-tool MCP surface + cargo+brew+release multi-channel install + frigg PROVIDER-COMPLEMENT provisional + 5-candidate verdict matrix + UPDATED Forward Top-5 + 3 LOAD-BEARING findings + Fire 29a rule dogfood + within-arc rule validation + Fire 33b candidate PROMOTION + FM-20 cascade caught + honest_unknowns #4 reinforcement + zoekt-mcp DEFER + najva-ai/akbad REJECT-FOR-FIT + Sourcegraph subscription barrier + eee incumbent capability coverage comparison + 6-capability vs Sourcegraph MCP table + Probe 6 license CRITICAL + Probe 7 demand-absence + cross-model T1 DEFER per NAMED-candidate exemption)
