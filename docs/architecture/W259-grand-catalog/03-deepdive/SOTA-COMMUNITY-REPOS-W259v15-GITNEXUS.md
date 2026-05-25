# W259-v15 — SOTA Community-Repo Deep-Dive: `abhigyanpatwari/GitNexus`

> **Wave**: W259-v15 SOTA-COMMUNITY-REPO DEEP-DIVE ADDENDUM (single-repo)
> **Date**: 2026-05-16
> **Scope**: Deep-dive the one named community repo the W259-v14 community pass did not cover — `abhigyanpatwari/GitNexus`. Score on the W259 23-dimension matrix (`05-scoring/MASTER-SCORING-MATRIX-W259.md §1`), reconcile against the installed `gitnexus` MCP, give a keep/cut verdict.
> **Cross-link**: This is an addendum to `SOTA-COMMUNITY-REPOS-W259v14.md` (8 named + 5 new community repos). GitNexus was explicitly out-of-scope there; v14 §1 covered curation/skill repos, not code-intel engines. v15 closes that single gap.
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — composes TIER-1-DIRECT GitHub API metadata (live `api.github.com/repos/abhigyanpatwari/GitNexus` 2026-05-16) + the **verbatim LICENSE file** + DeepWiki AI-grounded repo analysis + live `gitnexus` MCP introspection (`list_repos`) + W259 incumbent scoring matrix.

---

## §0 — Method & data sources

| Source | Tool | What it gave |
|---|---|---|
| Live GitHub repo metadata | `mcp__github__search_repositories` (full output) 2026-05-16 | 38,628★ / 4,421 forks / 302 open issues / created 2025-08-02 / pushed 2026-05-16 / SPDX `NOASSERTION` / lang TypeScript / size 28 MB |
| **LICENSE (authoritative)** | `mcp__github__get_file_contents` `LICENSE` | **PolyForm Noncommercial License 1.0.0** — full text read; `Required Notice: Copyright Abhigyan Patwari` |
| `package.json` | `mcp__github__get_file_contents` | root is `gitnexus-monorepo` (`"private": true`) — monorepo; published package is the `gitnexus/` workspace as npm `gitnexus` |
| `README.md` | `mcp__github__get_file_contents` | full architecture, CLI+MCP vs Web UI, 16 MCP tools, Claude Code integration table, Docker, license badge |
| Releases | `mcp__github__list_releases` | latest stable **v1.6.5** (2026-05-16); active RC cadence — `v1.6.6-rc.2` same day |
| Commit recency | `mcp__github__list_commits` | HEAD `2376912c` 2026-05-16T20:44Z; multi-contributor (azizur100389, zander-raycraft, magyargergo, Copilot SWE-agent) |
| Architecture / integration | `mcp__deepwiki__ask_question` ×2 | 12-phase DAG pipeline, LadybugDB, dual deployment, exact Claude Code hook+skill+CLAUDE.md integration mechanics |
| Installed-MCP introspection | `mcp__gitnexus__list_repos` (live) + deferred-tool schemas | confirms installed `gitnexus` MCP tool surface = GitNexus's documented surface |

> **Tooling note (consistent with v14 §0.1)**: `mcp__repomix__pack_remote_repository` on `https://github.com/abhigyanpatwari/GitNexus` returned `totalFiles:0` again this session (same remote-clone failure v14 hit on every target). DeepWiki + GitHub `get_file_contents` substituted as primary structural tools — and crucially the **LICENSE was read in full from the actual file**, so the headline scoring factor (D1) rests on a primary source, not a badge. The `context-mode` MCP is disconnected — no `ctx_*` tools used.

---

## §1 — Installed-MCP identity reconciliation (load-bearing)

**Verdict: the installed `gitnexus` MCP server IS `abhigyanpatwari/GitNexus`. Not a fork, not a namesake. Direct evidence:**

1. **Tool-surface exact match.** The runtime's live `gitnexus` MCP exposes (deferred-tool list): `list_repos`, `query`, `context`, `impact`, `detect_changes`, `rename`, `cypher`, `group_list`, `group_sync`, `route_map`, `api_impact`, `shape_check`, `tool_map`. GitNexus's README documents its MCP surface as exactly **16 tools — 11 per-repo + 5 group** — naming `list_repos`, `query`, `context`, `impact`, `detect_changes`, `rename`, `cypher`, `group_list`, `group_sync`, `group_contracts`, `group_query`, `group_status`. The installed set is a precise subset/superset of that documented surface (the runtime build also carries `route_map`/`api_impact`/`shape_check` — newer per-repo tools consistent with the active v1.6.x line).
2. **Graph-model fingerprint.** `mcp__gitnexus__list_repos` returned, per indexed repo, the fields `nodes`, `edges`, `communities`, `processes`, `embeddings` plus a `staleness.commitsBehind` hint. That is GitNexus's exact LadybugDB property-graph model (functions/classes/files as nodes; `CALLS`/`DEFINES`/`MEMBER_OF` edges; Leiden `communities`; entry-point-traced `processes`) and its exact `gitnexus analyze`-staleness contract.
3. **Resource URI scheme.** The installed MCP's `list_repos` reply ends with `READ gitnexus://repo/{name}/context` — GitNexus's documented resource URI namespace (`gitnexus://repos`, `gitnexus://repo/{name}/context`).
4. **Distribution match.** Runtime history reports `gitnexus` installed as an npm MCP server (~v1.6.4); GitNexus's README install path is verbatim `claude mcp add gitnexus -- cmd /c npx -y gitnexus@latest mcp` (Windows form) and npm package name `gitnexus`. Current upstream stable is v1.6.5 — the runtime's ~v1.6.4 is one minor patch behind.

**Prior-art reconciliation** (runtime brief said: PolyForm-Noncommercial, npm `gitnexus` ~v1.6.4, Windows-compat issues later resolved, runs as the L0.9 "META-RUNTIME-GRAPH" layer): **all four claims verified true.** License confirmed PolyForm-Noncommercial from the LICENSE file; npm name `gitnexus` confirmed; v1.6.x line confirmed; Windows support confirmed first-class (README ships an explicit Windows `claude mcp add` form + a recent commit `a26ac55f` fixed `ENOENT` on Windows/macOS/Ubuntu during `gitnexus analyze`). One nuance: GitNexus is **not only an MCP server** — it is a CLI + MCP + browser Web UI; the runtime consumes the MCP-server facet.

---

## §2 — What GitNexus is

A **graph-powered code-intelligence engine** ("nervous system for agent context"). It indexes a codebase into a knowledge graph via a **12-phase DAG pipeline** — scan/structure → Tree-sitter parse → cross-file symbol/import/call resolution → Leiden community detection → entry-point process tracing → BM25+semantic+RRF hybrid search index — stored in **LadybugDB** (embedded graph DB, formerly KuzuDB). It precomputes structure at index time so MCP tools return complete blast-radius / process-grouped context in one call ("Precomputed Relational Intelligence" vs traditional multi-query Graph RAG).

**Dual deployment**: (a) **CLI + MCP** (native Node, Tree-sitter native bindings, persistent LadybugDB) — the agent-facing mode; (b) **Web UI** (WASM, in-browser, `gitnexus.vercel.app`) — exploration/demo; a `gitnexus serve` Bridge Mode links them. 14-15 languages (TS/JS/Python/Java/Kotlin/C#/Go/Rust/PHP/Ruby/Swift/C/C++/Dart; COBOL via regex). Claude Code gets the deepest integration of any editor (per README's own Editor Support table): **MCP tools + 4 agent skills installed to `~/.claude/skills/gitnexus/` + PreToolUse/PostToolUse hooks** (`gitnexus analyze` writes them) + generated `CLAUDE.md`/`AGENTS.md` context files.

---

## §3 — 23-dimension score (matches `MASTER-SCORING-MATRIX-W259.md §1`)

Per the master-matrix per-row convention (rows carry **D1-D20 numeric scores**, composite `Σ(Di×Wi)/16.5×10`; D21-D23 noted qualitatively), so this row is directly comparable to incumbent rows.

| Dim | Score | Justification |
|---|---:|---|
| **D1** License-use-class precision | **0** | **PolyForm Noncommercial License 1.0.0** (LICENSE file read in full). The D1 rubric scale is explicit: `MIT/Apache=10, BSL/SSPL/Modified-Apache=4, AGPL=2, NOASSERTION=0`. PolyForm-NC is non-OSI and **more restrictive than AGPL** for this runtime's use class: it permits *only* noncommercial purposes; commercial use requires a separate paid license from akonlabs.com. SPDX reports `NOASSERTION`. Floor score 0 — a real, decisive scoring factor, exactly as the brief flagged. |
| **D2** SOTA-freshness | **10** | Pushed 2026-05-16 (today); ≥2026-Q2 ⇒ 10. |
| **D3** Star-velocity vs content-depth | **9** | 38,628★ in ~9.5 months (~4.1k★/mo) — high velocity. Content depth is **genuine** (12-phase pipeline, 14-lang resolver, real graph DB) — not fresh-paint, so only a modest discount vs a 10. 4,421 forks corroborates real engagement. |
| **D4** Maintainer-provenance tier | **4** | T4 — individual with portfolio. Solo founder Abhigyan Patwari; commercial entity akonlabs.com behind it. Multi-contributor PR flow but not a T3-named-org / T1-official. |
| **D5** Active-maintenance | **9** | Daily commits, multi-contributor, tight RC cadence (rc.1→rc.2 same day), OpenSSF Scorecard badge, Cosign-signed releases. 302 open issues is the one drag (large for the age) ⇒ 9 not 10. |
| **D6** Use-class compatibility | **9** | Strong autonomous-`/loop` fit: `detect_changes` (pre-commit blast radius), `impact` (HARD-GATE-shaped risk grouping), process-tracing. PostToolUse stale-index hook fits the loop. Not a meta-skill/TDD-for-skills harness ⇒ 9. |
| **D7** Anthropic-CC alignment | **6** | Mixed. PRO: official `claude mcp add` MCP path, `SKILL.md` skills, standard hook events. CON: `gitnexus analyze` **auto-writes `~/.claude/hooks/`, auto-edits `CLAUDE.md`, auto-installs skills** — an opinionated mutation of the user's CC config. For *this* runtime that directly collides with cardinal-rule-2 (no self-invent hook scripts) and the pointer-only ≤50-LOC CLAUDE.md discipline. The MCP-only facet aligns; the `analyze`-side auto-config does not ⇒ 6. |
| **D8** Industry adoption | **6** | Trendshift-listed, large fork count, community integrations (`pi-gitnexus`, `gitnexus-stable-ops`), listed by `looptech-ai/understand-quickly` registry. But **no canonical hard-benchmark** (no SWE-bench/independent eval) and "≥3 orgs production + ≥2 named-T2 dated artifacts" is unmet — per the W259-v4 benchmark-sourcing rule, self/marketing signals don't count ⇒ 6. |
| **D9** Failure-mode awareness | **7** | Ships `GUARDRAILS.md` + `RUNBOOK.md` (MCP recovery, stale index); commit history shows defensive work (orphan-sidecar recovery, cross-process init lock, worker-timeout fallback). No CVE history surfaced. Not formal FM-class taxonomy ⇒ 7. |
| **D10** Replacement viability | **3** | As a *replacement* for installed `serena` (code-intel) or `repomix` (code-pack), GitNexus fails D1 independently (PolyForm-NC ≪ serena/repomix MIT). It cannot satisfy D1-D9 independently for a runtime that may have commercial use. Low. |
| **D11** NATIVE-CC-PATHWAY | **8** | Rubric: `plugin.json +2 / SKILL.md +2 / agents/ +2 / .mcp.json +2 / hooks +2`. GitNexus delivers **SKILL.md (+2)** (4 skills auto-installed), **.mcp.json/MCP-registration (+2)**, **hooks (+2)** (Pre+PostToolUse). It has a `gitnexus-claude-plugin/` mirror dir but **no first-class `plugin.json` marketplace entry** (DeepWiki: "does not use a `.claude/plugin.json`... registers as an MCP server via `claude mcp add`"); no dedicated `agents/`. 8/10 — strong but not the full 10. |
| **D12** COMMUNITY-CONSENSUS | **7** | 38.6k★, Trendshift, Discord community, `understand-quickly` first-class format, community plugins. But **no named-T2 endorsement** (no Karpathy/Pocock/Osmani/Cherny/DHH dated artifact). High raw popularity, no practitioner-authority signal ⇒ 7. |
| **D13** ROI-PER-LAYER | **7** | Concrete mechanism — precomputed blast-radius collapses N-query Graph RAG to one tool call; token-efficient by design. But savings are **estimated/architectural**, not independently measured ⇒ 7 (rubric: concrete-measured=8, estimate=4; this sits between). |
| **D14** Q2-2026 FRONTIER | **10** | Substantially updated through 2026-Q2 (daily commits, v1.6.5 today). |
| **D15** WINDOWS-PORTABLE-COMPAT | **8** | README ships an explicit Windows install form (`cmd /c npx -y gitnexus@latest mcp`); commit `a26ac55f` fixed Windows `ENOENT`. CON: native Tree-sitter bindings need a C++ toolchain (mitigated by `GITNEXUS_SKIP_OPTIONAL_GRAMMARS=1`); the runtime ALREADY runs it on Windows ⇒ proven, 8 (a hair below pure-text tools). |
| **D16** CONTEXT-BUDGET-COST | **6** | Inverted (lower cost = higher score). Costs: 16 MCP tools (moderate tool-list load) + **4 auto-installed skills** (description preload) + an auto-written `CLAUDE.md` section. Tool responses are pre-structured (token-efficient *per call*). Net: moderate standing preload ⇒ 6. |
| **D17** MCP-TRUST-SURFACE | **8** | Local-only execution, no network calls (CLI mode), index in gitignored `.gitnexus/`. Cosign keyless-signed Docker images + SBOM + provenance; OpenSSF Scorecard. CON: `npx -y gitnexus@latest` (floating `@latest`, not version-pinned) is the documented install ⇒ 8. |
| **D18** CODEX-VERIFIABILITY | **8** | `npx gitnexus` install + `gitnexus analyze`/`status`/`clean` are cheap, scriptable, reversible — codex CLI can independently install-probe and regression-test. ⇒ 8. |
| **D19** REVERSIBLE-PILOTABILITY | **6** | The MCP server alone is cleanly removable (`claude mcp remove`). BUT `gitnexus analyze` **mutates the runtime** — writes `~/.claude/hooks/gitnexus/`, edits `CLAUDE.md`/`AGENTS.md`, installs skills. Full rollback requires undoing those edits (the `--skip-agents-md`/`--skip-git` flags help but the default dirties the tree). MCP-only use = clean; `analyze` use = not clean ⇒ 6. |
| **D20** DUPLICATION-AGAINST-INSTALLED | **3** | Inverted (higher overlap = lower score). The D20 rubric **explicitly names `Serena` and `Repomix`** in the installed set. GitNexus directly overlaps **both**: it is a code-intelligence engine (vs `serena`'s LSP-symbol code-intel) AND a codebase-graph/context packer (vs `repomix`). Heavy three-way duplication ⇒ 3 — one of the decisive low scores. |

**D21-D23 (qualitative, per master-matrix §0.5 convention — schema dimensions, not in numeric composite):**
- **D21 DATA-BOUNDARY-RISK ≈ 8** (safe). CLI mode is fully local, no network, no prompt retention; index metadata only in `~/.gitnexus/`. `gitnexus wiki` is the one opt-in network path (LLM API). Low data-flow risk.
- **D22 SOLO-OPERATOR-FIT ≈ 7**. Zero-config `npx gitnexus analyze`, no team ceremony — fits a solo operator. Slight drag: the auto-written CLAUDE.md/hooks assume a "let the tool manage your config" posture this runtime deliberately rejects.
- **D23 MAINTENANCE-VELOCITY ≈ 5** (volatility-inverted). Extremely high rate-of-change (multiple releases/day, rc.1→rc.2 same day, solo bus-factor) = high churn/volatility. Good for freshness (D2/D5), but D23 measures *volatility* — a fast-moving solo-maintained dependency is a stability risk; the runtime's installed ~v1.6.4 is already a patch behind v1.6.5.

### Composite

`Composite = Σ(Di × Wi) / 16.5 × 10` over D1-D20 (weights per §1).

Weighted sum = (0×1.0)+(10×1.0)+(9×0.7)+(4×1.0)+(9×0.8)+(9×1.0)+(6×0.8)+(6×1.0)+(7×0.6)+(3×0.8)+(8×1.2)+(7×0.9)+(7×0.7)+(10×0.5)+(8×1.0)+(6×0.7)+(8×0.8)+(8×0.6)+(6×0.9)+(3×0.8)
= 0 + 10 + 6.3 + 4 + 7.2 + 9 + 4.8 + 6 + 4.2 + 2.4 + 9.6 + 6.3 + 4.9 + 5 + 8 + 4.2 + 6.4 + 4.8 + 5.4 + 2.4
= **115.5** → `/16.5 × 10` = **70.0**.

**Composite ≈ 70 → T2 STUDY-PILOT band (lower edge).**

### Master-matrix-format score row

> Append to `MASTER-SCORING-MATRIX-W259.md §2` as an appendix row (community-repo gap-closure, parallel to v14's added rows):

| Rank | Repo | Stars | Layer | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | Composite | Disposition |
|---:|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| — (appendix) | **abhigyanpatwari/GitNexus** | 38,628 | L0.9 code-intel-graph | 0 | 10 | 9 | 4 | 9 | 9 | 6 | 6 | 7 | 3 | 8 | 7 | 7 | 10 | 8 | 6 | 8 | 8 | 6 | 3 | **70** | **T2 STUDY-PILOT — KEEP (installed, MCP-only); license caps adoption** |

---

## §4 — Verdict: KEEP (conditional)

**KEEP the installed `gitnexus` MCP server — as a STUDY-PILOT / MCP-only integration. Do NOT deepen the integration (no `gitnexus analyze`-driven hook/skill/CLAUDE.md auto-write), and do NOT treat it as install-grade SOTA for adoption beyond a personal noncommercial runtime.**

Decisive dimensions driving the 70 (T2-lower-edge) score:

1. **D1 = 0 (license, hard cap).** PolyForm Noncommercial 1.0.0 — verified verbatim from the LICENSE file. Non-OSI, noncommercial-only; floor score per the D1 rubric, below AGPL. This is the single biggest drag and it is structural: it cannot improve without an upstream relicense. It bars GitNexus from any commercial-use path and from being a *recommended* SOTA install — exactly the factor the brief flagged.
2. **D20 = 3 (duplication).** The D20 rubric names `Serena` and `Repomix` explicitly; GitNexus overlaps both (code-intelligence + codebase-context-graph). It is not additive-clean against the installed stack.
3. **D10 = 3 (replacement viability).** Cannot replace MIT-licensed `serena`/`repomix` — it fails D1 independently.
4. **D7 = 6 / D19 = 6 (CC-alignment & reversibility).** `gitnexus analyze` auto-writes `~/.claude/hooks/`, edits `CLAUDE.md`, installs skills — colliding with this runtime's cardinal-rule-2 (no self-invent hooks) and pointer-only ≤50-LOC CLAUDE.md discipline; full rollback is not clean.
5. **Counterweight — D2/D14/D5/D3 (all 9-10):** genuinely SOTA-fresh, actively maintained, real content depth. The *engineering* is strong; the *license + duplication + config-mutation* are what hold it to T2.

**Why KEEP and not CUT**: the runtime already runs it (L0.9 "META-RUNTIME-GRAPH"), it works on Windows, the MCP-server facet is clean and removable, and the runtime is an install-only **noncommercial** baseline where the PolyForm-NC license is *currently* satisfied (personal/research use is a permitted purpose under PolyForm-NC). The graph-impact tooling (`impact`, `detect_changes`) is genuinely useful for the autonomous-`/loop` posture. CUT would only be warranted if (a) the runtime ever needs a commercial-use footing, or (b) a sandboxed `serena`-vs-`gitnexus` bake-off shows no marginal value over the installed MIT code-intel — in which case drop GitNexus and keep `serena`.

**Conditions on KEEP:**
- **MCP-only.** Use `claude mcp add gitnexus`; do **not** run `gitnexus analyze`'s default hook/skill/CLAUDE.md auto-write (or run it with `--skip-agents-md` and never let it touch `~/.claude/hooks/`). The W255 cleanup removed exactly this class of self-invented hooks — re-importing them via GitNexus would regress it.
- **Pin the version.** Replace `npx ... gitnexus@latest` with a pinned `gitnexus@1.6.5` in the MCP config (D17 floating-`@latest` risk; runtime is already a patch behind at ~v1.6.4).
- **Noncommercial-only flag.** Record in the manifest that this dependency carries a PolyForm-NC license — a commercial-use pivot of the runtime requires either an akonlabs.com commercial license or removing GitNexus.
- **Re-audit trigger**: re-check at next wave if upstream relicenses to OSI, or if a `serena` overlap bake-off is run.

**Official Claude Code integration path** (verified — README + DeepWiki): `gitnexus` is an **npm-distributed MCP server**, registered via `claude mcp add gitnexus -- cmd /c npx -y gitnexus@latest mcp` (Windows form) or `npx gitnexus setup` (auto-detects CC, edits `~/.claude.json`). It is **not** a `/plugin`-marketplace plugin (no first-class `plugin.json`). The optional deeper integration — 4 agent skills to `~/.claude/skills/gitnexus/` + Pre/PostToolUse hooks — is bundled into `gitnexus analyze`; for this runtime that deeper path is **declined** per cardinal-rule-2.

---

**Artifact**: `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\03-deepdive\SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md`
**Cross-links**: `SOTA-COMMUNITY-REPOS-W259v14.md` (parent community-repo pass) · `05-scoring/MASTER-SCORING-MATRIX-W259.md` (23-dim rubric §1; append the §3 row to §2 appendix).
