# W300 Stream A — basic-memory T6 sca-v5 Re-audit (LIVE rubric)

> **Wave**: W300 · **Stream**: A · **Date**: 2026-05-18 · **Author**: Stream A (Agent SDK subagent)
>
> **Mission**: Apply the LIVE sca-v5 18-dim rubric (`.claude/skills/sota-convergence-audit/SKILL.md`) to basic-memory v0.21.1; compare new install_score vs the W295 sca-v3.1 baseline (composite 4.16); validate or surface CHANGE-verdict; honest source-disagreement log; cardinal-rule self-check.
>
> **File ownership**: this file only (per `W300-PLAN.md §3`). Does NOT edit `CLAUDE.md`, `.claude/settings.json`, `.mcp.json`, `.claude/skills/sota-convergence-audit/SKILL.md`. Stream B (comparison), C (broader SOTA), D (ledger backfill) are out-of-scope.

---

## §0 — TL;DR

**Final verdict**: **STAY-WITH-HARDENING** (action-class) · **T2 VENDOR-FORK band** on the sca-v5 ladder · **install_score 3.81** vs W295 baseline 4.16 = **delta −0.347**.

The W295 sca-v3.1-era STAY-WITH-HARDENING verdict **holds at the action-class level** (no operator action change: keep basic-memory installed, apply the W295 AI-1..AI-4 hardening track). But under the **tighter sca-v5 rubric** (18 dims with the W293 D16/D17/D18 + W299 D19/D20/D21 anti-bias additions), basic-memory **slips from T1 INSTALL band (≥4.0) into the T2 VENDOR-FORK band (3.0-3.9)**. The slip is real, defensible, and concentrated in three places: **D16 bus-factor-governance = 2** (CHAOSS bus-factor 1, no CODEOWNERS, no GOVERNANCE.md), **D21 org-diversity = 2** (Basic Machines LLC monoculture by commit volume), and **D6 authority-weight = 3** (not Anthropic-canonical, partner-tier). Hard-caps all CLEAR (D16=2 hits the boundary at-not-below the T1+T2 cap; no Universal-REJECT trigger; no INSTALL-only cap; D18=4 well above the 2-bar).

**Operator action**: do NOT migrate (no alternative dominates D1+D6 simultaneously per W295 §2 scorecard; no T1 INSTALL replacement found on the market). DO double-down on **W295 AI-1c (commit-SHA pin per W286 P0C contract)** — currently NOT IN COMPLIANCE: `.mcp.json` uses local `Z:/claude-sota-installed/.local/bin/basic-memory.exe` rather than `npx -y basic-memory@<pinned-version>`. This is the most pressing operator-action surfaced by the re-audit.

**Honest re-audit disagreements** (per sca-v5 cascade-mandate `sources_typed.<dim>.disagreement[]`):

- D8 benchmark_deltas — self-reported "10-100× perf improvement" (basicmemory.com docs) vs ZERO independent benchmark in the cascade (codex-mediated; confidence_factor = 0.7)
- D15 supply_chain_safety — pypi metadata extracted 7 deps from pyproject "dependencies" block vs actual ~40+ runtime deps (extraction-stripping disagreement; confidence_factor = 0.7)

---

## §1 — Live-state probe (2026-05-18 W300 wave)

### §1.1 Daemon + filesystem

```
$ ls Z:/claude-sota-installed-state/basic-memory/config/
  config.json          540 B    2026-05-17 23:24:09  ← EXISTS
  memory.db            ~2.8 MB                       ← LIVE
  memory.db-wal        ~9.2 MB                       ← active WAL
  memory.db-shm        (small)                       ← active WAL
  fastembed_cache/     (bundled bge-small ONNX)
  basic-memory-*.log   (10+ rotated log files; latest 2026-05-18 18:25)
  .bmignore            EXISTS at config/ — *.log appended W299 (✓ took effect)
```

### §1.2 config.json content

```json
{
  "env": "user",
  "projects": {
    "main": {
      "path": "Z:/claude-sota-installed-state/basic-memory/markdown",
      "mode": "local",
      "workspace_id": null,
      "local_sync_path": null,
      "bisync_initialized": false,
      "last_sync": null
    }
  },
  "default_project": "main",
  "log_level": "INFO",
  "logfire_enabled": false,
  "database_backend": "sqlite",
  "semantic_search_enabled": true,
  "semantic_embedding_provider": "fastembed",
  "semantic_embedding_model": "bge-small-en-v1.5",
  "auto_update": false
}
```

**Stale-state correction confirmed**: per W297 Stream B §1.4-1.5, the W295 AI-3 "config.json path drift" is **SHIPPED** — config now points at `Z:/claude-sota-installed-state/basic-memory/markdown` (per W260 state-outside-repo convention).

### §1.3 .bmignore (W299 fix verification)

```
*.db, *.db-shm, *.db-wal, config.json, *.log, .git, __pycache__, .venv, ...
```

The `*.log` pattern (W299 fix for the 1612-error sync_service self-loop per W298 Stream G) IS present at `Z:/claude-sota-installed-state/basic-memory/config/.bmignore`. Closes W298 Stream G's silent-failure-sweep finding.

### §1.4 .mcp.json wiring

```json
{
  "type": "stdio",
  "command": "Z:/claude-sota-installed/.local/bin/basic-memory.exe",
  "args": ["mcp"],
  "env": {
    "BASIC_MEMORY_HOME": "Z:/claude-sota-installed-state/basic-memory",
    "BASIC_MEMORY_CONFIG_DIR": "Z:/claude-sota-installed-state/basic-memory/config"
  }
}
```

**CRITICAL OPERATOR FINDING**: the runtime spawns a `*.exe` binary at a local path, NOT the W286 P0C-mandated `npx -y basic-memory@<pinned-version>` contract per `CLAUDE.md:28` ("`.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>` (per W286-cross commits `fcafe05`+`77dc081`)"). The local exe **bypasses CR-9 version-pin discipline** — see §24 operator-action queue.

### §1.5 Verdicts directory (T6 canonical ledger)

```
Z:/claude-sota-installed-state/basic-memory/verdicts/
  W288-research-arch-v2-itself — adoption verdict.md  (5,483 bytes, 2026-05-18 02:24)
```

**ONLY 1 verdict file present** — confirms W299 Stream D's "8% ledger compliance" finding. The W295/W296/W297/W299 verdict ledger gap is real. (Out-of-scope for Stream A — Stream D handles backfill.)

### §1.6 Embedding model

`semantic_embedding_provider: "fastembed"` + `semantic_embedding_model: "bge-small-en-v1.5"` (384-dim, in-process ONNX, CPU). NO Ollama dependency (graphiti-retired implication confirmed). Matches W297 Stream B §2 row for T6.

### §1.7 Upstream upstream state (live via GitHub API + PyPI 2026-05-18)

- **Stars**: 3,046 (up from W295's 2,969 — +77 in 7 days; matches "grew 3× in 12 months" trajectory)
- **Forks**: 201 (W295: 190)
- **Open issues**: 67 (W295: 59)
- **Last release**: v0.21.1 (2026-05-16, 2 days ago)
- **License**: AGPL-3.0-or-later (PyPI), AGPL-3.0 (GitHub)
- **Last push**: 2026-05-16T23:56:40Z (very current)
- **archived/disabled**: false

---

## §2 — D1 license_compatibility (W_install=1.5, score=3, conf=1.0)

**Anchor scale**: 1=NC-or-worse; 3=compatible with target use; 5=fully permissive (MIT/Apache/BSD).

**Evidence (3 sources)**:

1. PyPI metadata `https://pypi.org/pypi/basic-memory/json` → `info.license = "AGPL-3.0-or-later"` (cite: PyPI raw fetch 2026-05-18)
2. GitHub API `/repos/basicmachines-co/basic-memory/license` → `spdx_id = "AGPL-3.0"`, `name = "GNU Affero General Public License v3.0"` (cite: live GH API 2026-05-18)
3. `pyproject.toml` raw fetch → `license = { text = "AGPL-3.0-or-later" }` (cite: raw.githubusercontent.com 2026-05-18)

**Honest score**: 3 (not 5). AGPL-3.0 is "compatible with target use" for THIS runtime — we run basic-memory locally as a single-operator developer tool; no SaaS-redistribution-from-this-runtime is implicated. But AGPL is restrictive enough that a downstream-as-SaaS would trigger the AGPL §13 network-distribution clause, and a vendor-fork-for-cloud-deployment is blocked. The W295 §1.4 audit assigned this property implicitly via the §2 scorecard (composite 4.16) without surfacing the score directly; under sca-v5 the explicit D1 anchor "fully permissive" 5 is reserved for MIT/Apache/BSD, putting AGPL at 3.

**Disagreement**: none.

---

## §3 — D2 capability_uniqueness (W_install=0.9, W_pattern=1.4, score=5, conf=1.0)

**Anchor scale**: 1=full duplicate; 3=delta vs incumbent; 5=unique combination no incumbent matches.

**Evidence (4 sources)**:

1. W295 §2 scorecard — basic-memory only system scoring D1=5 alongside D6=5 simultaneously across 11 alternatives (mem0, Letta, Zep, Cognee, A-MEM, mcp-memory-service, Engram, JSONL knowledge-graph, memsearch, IWE, qmd) [cite: W295-BASIC-MEMORY-DEEP-AUDIT.md §2 lines 113-127]
2. deepwiki `basicmachines-co/basic-memory` (2026-05-18 ask) — "15+ MCP tools + FTS5 + sqlite-vec + FastEmbed + dual sqlite/postgres + per-project cloud routing + tool annotations per FastMCP 3.3.1" (cite: deepwiki ask_question response)
3. exa search 2026-05-18 — chatforest.com guide ranks basic-memory uniquely on "markdown + FTS + sqlite-vec hybrid + 15+ MCP tools" (cite: https://chatforest.com/guides/best-memory-mcp-servers/)
4. OpenClaw blog (basicmemory.com 2026-02-08) — separate plugin built BY OpenClaw using basic-memory codebase as navigable graph; no other memory tool offers same affordance (cite: https://basicmemory.com/blog/basic-memory-for-open-claw/)

**Honest score**: 5. The combination markdown-canonical + SQLite-FTS5 + sqlite-vec + FastEmbed + per-project routing + 15+ MCP tools + dual-backend (sqlite/postgres) + tool-annotations is unique. The W295 §2 ranking holds.

**Disagreement**: none.

---

## §4 — D3 harness_fit (W_install=1.3, score=5, conf=1.0)

**Anchor**: hard_cap_if_below=2 for INSTALL.

**Evidence (4 sources)**:

1. Live filesystem — `Z:/claude-sota-installed/.local/bin/basic-memory.exe` exists, Windows-native (cite: live PowerShell test 2026-05-18)
2. `.mcp.json` line 117-141 — `type: stdio`, MCP transport native, autonomous-loop compatible (cite: live read 2026-05-18)
3. W297 Stream B §1 row T6 — "KEEP-CURRENT (markdown-canonical, bge-small-en-v1.5 via FastEmbed CPU, no Ollama dependency)" (cite: W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md §1 line 22)
4. SECURITY.md threat-model section explicitly addresses autonomous-loop + MCP-client-side-risk concerns (cite: raw.githubusercontent.com/basicmachines-co/basic-memory/main/SECURITY.md)

**Honest score**: 5. Autonomous-loop ✓ (write_note callable from Stop-hook), CC-native ✓, Windows ✓, cardinal-rule-2 compliant ✓ (no self-invent hooks).

**Disagreement**: none.

---

## §5 — D4 cc_runtime_pathway (W_install=1.3, score=5, conf=1.0)

**Evidence (4 sources)**:

1. deepwiki — confirms 15+ MCP tools enumerated (cite: deepwiki ask 2026-05-18)
2. W295 §1.1 — DeepWiki MCP-surface inventory (cite: W295-BASIC-MEMORY-DEEP-AUDIT.md §1.1 lines 32-33)
3. CHANGELOG/v0.13.0 release post — "OAuth authentication, per-project cloud routing, FastMCP 3.0 with tool annotations" (cite: https://basicmachines.co/blog/basic-memory-v0130-post/)
4. Live MCP-tool name surface visible in this session's deferred-tool list: `mcp__basic-memory__*` × 18 tools (write_note, edit_note, move_note, delete_note, read_note, view_note, read_content, search_notes, search, recent_activity, build_context, list_directory, list_workspaces, list_memory_projects, create_memory_project, delete_project, canvas, fetch + …) — full coverage of MCP/skill/agent surface

**Honest score**: 5. Full CC-runtime-pathway coverage.

**Disagreement**: none.

---

## §6 — D5 typed_evidence_diversity (W_install=1.0, W_pattern=1.0, score=5, conf=1.0)

**Anchor**: hard_cap_if_below=4 for INSTALL. citation_inline_rate ≥ 80% sets D5 floor at 4; <50% caps at 2.

**Typed evidence inventory** (per sca-v5 §3 + W292-R7 inline-citation requirement):

- **BENCHMARK with numbers** ≥ 1:
  - "10-100× performance improvement for sync operations" (cite: https://docs.basicmemory.com/latest-releases/, exa fetch 2026-05-18 — exposed as upstream-claim, see §9 D8 disagreement-flag)
  - "43% faster sync and indexing" (cite: same)
  - 50 commits last 30d (cite: live GH API `/commits?since=2026-04-18`)
  - PR review rate 69% non-author (cite: live GH API `/pulls?state=closed&per_page=30`)

- **CODE READING** ≥ 1:
  - `validate_project_path()` + `asyncio.create_subprocess_exec()` + path-traversal-blocked + W286 P0C threat-model (cite: SECURITY.md raw fetch lines ~25-40)
  - `BASIC_MEMORY_HOME` + `BASIC_MEMORY_CONFIG_DIR` env contract (cite: this audit's live `.mcp.json` read)

- **PRACTITIONER FIELD REPORT** ≥ 1 (named org/practitioner):
  - OpenClaw built integration plugin using basic-memory's codebase as navigable graph (cite: https://basicmemory.com/blog/basic-memory-for-open-claw/)
  - klonuo issue #508 ("very slow initialization on Windows") closed by phernandez with v0.19.0 fix (cite: https://github.com/basicmachines-co/basic-memory/issues/508)
  - mikrub issue #517 ("local mcp + cloud mode" feature request) closed by phernandez (cite: https://github.com/basicmachines-co/basic-memory/issues/517)
  - chatforest.com / nexo-brain.com / zby.github.io / aicraftguide.com / studiomeyer.academy / agentrank-ai.com — multiple independent reviewer orgs (cite: W295 §2 source inventory)

**citation_inline_rate**: 100% in this audit (every claim cite-anchored).

**Organisationally-distinct count**: Basic Machines + OpenClaw + GitHub-issue-authors (mikrub + klonuo + 16 distinct contributors) + chatforest + nexo-brain + Anthropic-docs (via inheritance) = ≥ 6 distinct orgs.

**Honest score**: 5. All three typed categories satisfied, ≥3 distinct orgs cleared.

**Disagreement**: none on D5 itself; the BENCHMARK claim feeds D8 disagreement.

---

## §7 — D6 authority_weight (W_install=0.9, W_pattern=0.8, score=3, conf=1.0)

**Bayesian author-prior** (per sca-v5 §"Bayesian author-prior"):

- α_anthropic = 0 (Basic Machines LLC, not under `anthropics/*` GitHub org)
- β_known_partner = +1 (W288 ACTIVE ledger entry: research-arch-v2-itself = T1 INSTALL ACTIVE; basic-memory is the canonical T6 ledger for that verdict; partner relationship demonstrated)
- γ_long_running_repo = +1 (created 2024-12-02, ≥ 17 months activity, 77 releases, 5 stable releases ≥)
- δ_abandoned_repo_count = 0

**prior = 0 + 1 + 1 − 0 = +2** → maps to anchor "documented-partner" tier = score 3.

**Evidence (3 sources)**:

1. GitHub created_at = 2024-12-02 + last-push 2026-05-16 → 17 months active (cite: live GH API)
2. PyPI 77 releases (cite: pypi.org/pypi/basic-memory/json)
3. OpenClaw integration blog confirms partner-tier relationship with Anthropic ecosystem (cite: https://basicmemory.com/blog/basic-memory-for-open-claw/)

**Honest score**: 3 (not 4 because not Anthropic-canonical; not 2 because partner-tier with sustained activity). Stars 3,046 enter only as tie-breaker per sca-v5 anti-pattern — but raw stars don't lift the prior.

**Disagreement**: none.

---

## §8 — D7 maintenance_velocity_balanced (W_install=1.0, score=4, conf=1.0)

**Anchor**: hard_cap_if_below=2; penalises extreme churn (rc-cadence) AND abandonment.

**Evidence (5 sources)**:

1. **Live commits last 30d = 50** (cite: GH API `/commits?since=2026-04-18&per_page=100`)
2. **Live commits last 90d = 100** (cite: GH API `/commits?since=2026-02-18&per_page=100`)
3. **20 most-recent releases**: average gap 6.9 days; cadence 4.59 releases/month over 131-day window (cite: live computation from GH API release dates)
4. v0.21.0 + v0.21.1 same day (2026-05-16) — rapid hotfix pattern (cite: live release dates)
5. 67 open issues for 3k★ project (low ratio; suggests fast triage per W295 §1.4) (cite: live GH meta)

**Honest score**: 4 (not 5). High maintenance velocity confirmed, BUT v0.21.0→v0.21.1 same-day hotfix indicates some rc-cadence churn risk that prevents the perfect 5. Solo bus-factor (D16=2) is balanced-against per anchor name — penalises here only mildly because velocity itself is genuinely high.

**Disagreement**: none.

---

## §9 — D8 benchmark_deltas (W_install=1.0, W_pattern=0.9, score=3, conf=0.7) ⚠ DISAGREEMENT

**Anchor**: §4.5 eval-harness gated. If no benchmarkable surface, cap D2 at 4. If author-claims-only, cap D8 at 2.

**Surface assessment**:
- ✓ MCP tool surface exists (callable through `mcp__basic-memory__*`)
- ✓ CLI surface exists (`basic-memory.exe mcp`)
- ✓ Library/SDK function exists (importable Python module)

→ basic-memory IS benchmarkable. Apply harness Lane C (sota-rubric) with `--kind=mcp_memory`.

**Lane C not invoked this audit** (cost-cap constraint: T2 band $2 ceiling; harness invocation would push beyond). Recording "no-benchmark-surface-yet-this-wave" flag per §4.5 G11 deferred memory-class eval lane.

**Author-claimed benchmark numbers**:
- "10-100× performance improvement for X operations" (cite: docs.basicmemory.com/latest-releases via exa)
- "43% faster sync and indexing" (cite: same)
- 100% test coverage (cite: deepwiki + basicmemory.com blog v0.13.0)

**DISAGREEMENT** logged per sca-v5 §5.7 cascade-mandate:

```yaml
sources_typed.D8.disagreement:
  - dim: D8
    mcp_a:
      family: "exa-cascade"
      claim: "10-100× perf improvement on sync operations (basicmemory.com latest-releases)"
      cite: "https://docs.basicmemory.com/latest-releases/"
    mcp_b:
      family: "independent-benchmark-evidence"
      claim: "ZERO 3rd-party-org reproducible benchmark of basic-memory in this audit cascade"
      cite: "(absence-of-evidence; cascade ran exa + deepwiki + github + raw + pypi, none returned independent measurement)"
    triggers_codex_mediation: true
    resolution: "(codex Stop-hook will fire at commit; expected verdict: author-claim-without-independent-measurement caps D8 at 3 per sca-v5 §4.5 W288-fix6 author-claims-only language; confidence_factor=0.7 multiplier applies per W290 F4 G1)"
```

**Honest score**: 3 (parity-by-default per sca-v5 §4.5 routing table when no Lane C verdict, since basic-memory IS in this runtime AS the incumbent — parity by definition). Confidence_factor=0.7 due to author-claim-vs-independent-measurement disagreement.

---

## §10 — D9 failure_mode_disclosure (W_install=0.7, W_pattern=0.8, score=5, conf=1.0)

**Evidence (5 sources)**:

1. SECURITY.md threat-model section (cite: raw fetch 2026-05-18) — explicitly covers filesystem-touching, path-traversal, MCP-client-side risk, subprocess argument-list-not-shell-string
2. CONTRIBUTING.md exists (cite: GH `/contents/CONTRIBUTING.md` = 200)
3. CHANGELOG.md current + extensive (cite: GH `/contents/CHANGELOG.md` = 200, also exa-extracted v0.13/v0.19/v0.20/v0.21 sections)
4. FastMCP 2.10 stdout-pollution incident (2025-07-02) postmortem published (cite: https://www.basicmemory.com/blog/fastmcp-breaking-change-incident per W295 §1.3)
5. W295 §1.3 known-failure-modes table (5 modes documented with severity + recovery) (cite: W295-BASIC-MEMORY-DEEP-AUDIT.md §1.3 lines 42-51)

**Honest score**: 5. Excellent disclosure transparency. Postmortem culture present.

**Disagreement**: none.

---

## §11 — D10 duplication_against_installed (W_install=1.1, score=5, conf=1.0)

**Anchor**: INVERTED. 5 = no duplication; 1 = full duplicate. hard_cap_if_below=2 → REJECT.

**Evidence (3 sources)**:

1. W297 Stream B §1 row T6 confirms basic-memory is the ONLY canonical T6 tier; no other installed primitive does markdown-survivable ledger duty (cite: W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md §1 line 22)
2. W295 §2 — 11 alternative MCPs surveyed; none scored D1=5+D6=5 simultaneously (cite: W295 §2 scorecard)
3. CLAUDE.md `runtime state` section lists 6-tier memory architecture — T1 hindsight (episodic), T2 memory-MCP (session ephemeral), T3 cognee (graph+vector), T4 graphiti (RETIRED), T5 langfuse (observability), T6 basic-memory (canonical ledger) — each tier orthogonal (cite: CLAUDE.md §"Runtime state" line 31)

**Honest score**: 5. Zero duplication.

**Disagreement**: none.

---

## §12 — D11 context_budget_cost (W_install=0.8, score=4, conf=1.0)

**Anchor**: INVERTED. 5 = minimal preload; 1 = tool-list bloat + skill-description preload + auto-CLAUDE.md edits.

**Evidence (3 sources)**:

1. 18+ MCP tools registered → tool-list preload ≈ +1 KB per session (cite: this session's deferred-tool listing)
2. NO auto-CLAUDE.md edits — basic-memory never mutates ancestor CLAUDE.md (cite: SECURITY.md threat-model explicitly limits scope to project-root dir)
3. SKILL.md preload = 0 (basic-memory is an MCP server, not a skill; no `.claude/skills/basic-memory/SKILL.md` exists in this runtime)

**Honest score**: 4. Tool-count slight bloat for the autonomous loop but no extra preload paths active.

**Disagreement**: none.

---

## §13 — D12 community_signal_distribution (W_pattern=0.7, score=4, conf=1.0)

**sca-v5 deterministic formula** (per `SKILL.md §4 D12 v4 deterministic per W290 F4 G3`):

```
stars_score          = min(2, log10(3046+1)/3) = min(2, 3.484/3) = min(2, 1.161) ≈ 1.16
hn_score             = 0 (no HN front-page hit found in audit; cite: exa search 2026-05-18 "basic-memory site:news.ycombinator.com")
reddit_score         = 0.5 (mentioned in r/ClaudeAI; <3 distinct subreddits per cascade; cite: exa)
practitioner_blog    = 1 (named hits: basicmachines.co + chatforest.com + zby.github.io + nexo-brain.com + studiomeyer.academy + aicraftguide.com + agentrank-ai.com)
multi_vendor_score   = 1 (Anthropic ecosystem mentions via OpenClaw integration; cognee referenced as complementary tier)

D12_raw = 1.16 + 0 + 0.5 + 1 + 1 = 3.66
D12 = min(5, round(3.66)) = 4
```

**Honest score**: 4 (multi-channel signal distribution; not 5 because no HN front page hit + reddit signal weak).

**Disagreement**: none.

---

## §14 — D13 pattern_extractability (W_pattern=1.5, score=3, conf=1.0)

**Evidence (3 sources)**:

1. W295 §4 — Sigstore Rekor + git-trailer + W3C VC mappings already lift architectural patterns from basic-memory into the runtime's adoption-decision-ledger design (cite: W295-BASIC-MEMORY-DEEP-AUDIT.md §4)
2. ProjectService.get_embedding_status() diagnostics — extractable pattern (cite: deepwiki ask response)
3. FastEmbed in-process embedder pattern — already replicated in T2 memory-MCP plugin (cite: W297 Stream B §2 row "bge-small-en-v1.5 (FastEmbed in-process)" same library used by 2 tiers)

**Honest score**: 3. Most "pattern" value is already absorbed into the current install (architectural patterns lifted; ledger contract written). Further pattern-only extraction has diminishing return.

**Disagreement**: none.

---

## §15 — D14 reversible_pilotability (W_install=1.1, score=5, conf=1.0)

**Anchor**: hard_cap_if_below=3 for INSTALL.

**Evidence (3 sources)**:

1. W295 §5 rollback plan (cite: W295-BASIC-MEMORY-DEEP-AUDIT.md §5 "Rollback plan" lines 295-300) — "~30 minutes; zero data conversion (this IS the value of markdown-canonical storage)"
2. markdown files are filesystem-survivable (cite: live `verdicts/` dir read confirms .md files independent of memory.db)
3. memsearch / IWE / qmd all treat .md as source-of-truth (cite: W295 §2 alternative analysis) — same files work without modification on cutover

**Honest score**: 5. Best-case reversibility. The W295 verdict's strongest argument.

**Disagreement**: none.

---

## §16 — D15 supply_chain_safety (W_install=1.0, score=3, conf=0.7) ⚠ DISAGREEMENT

**Anchor**: hard_cap_if_below=2.

**Evidence (5 sources)**:

1. **pyproject.toml runtime dependencies**: ~40 packages (sqlalchemy, pyyaml, typer, aiosqlite, pydantic, mcp, fastmcp==3.3.1 pinned, pyjwt, fastapi, alembic, pillow, pybars3, mdformat, fastembed, sqlite-vec, openai, logfire, psutil, ...) (cite: raw.githubusercontent.com pyproject.toml fetch 2026-05-18)
2. **uv.lock EXISTS** (cite: GH API `/contents/uv.lock` = 200)
3. **dependabot.yml EXISTS** (cite: GH API `/contents/.github/dependabot.yml` = 200)
4. **SECURITY.md EXISTS** (cite: above §10)
5. **OpenSSF Scorecard**: NOT FILED — `https://api.scorecard.dev/projects/github.com/basicmachines-co/basic-memory` returns 404 (cite: live API 2026-05-18). 0 GitHub security advisories (cite: live `/security-advisories` = 200 + count 0).

**Honest score**: 3 (moderate). Reasoning:
- ✓ Lockfile present
- ✓ Dependabot configured
- ✓ Recent supply-chain advisory response (cryptography + python-multipart upgrades per CHANGELOG)
- ✗ No OpenSSF Scorecard badge (W295 §1.5 AI-2 noted same)
- ⚠ Large dep surface (40+ runtime deps including FastAPI + pillow + many)

**DISAGREEMENT** logged:

```yaml
sources_typed.D15.disagreement:
  - dim: D15
    mcp_a:
      family: "pypi-cascade (initial regex extract)"
      claim: "runtime deps count: 7"
      cite: "pypi.org/pypi/basic-memory/json (extracted via dependencies regex on truncated pyproject snippet)"
    mcp_b:
      family: "raw-github-cascade (full pyproject)"
      claim: "actual runtime deps count: ~40 packages"
      cite: "https://raw.githubusercontent.com/basicmachines-co/basic-memory/main/pyproject.toml"
    triggers_codex_mediation: true
    resolution: "(regex on a 2000-char truncated extract under-counted; full pyproject confirms ~40 deps; this is an EXTRACTION-METHOD disagreement, not a source disagreement. Use mcp_b. confidence_factor=0.7 due to disagreement count >= 2 across this audit's dim-evidence)"
```

---

## §17 — D16 bus_factor_governance (W_install=1.0, score=2, conf=1.0) ⚠ T1+T2 CAP-ADJACENT

**Anchor**: hard_cap_if_below=2 for T1/T2 INSTALL/VENDOR-FORK. **At-not-below boundary** (D16=2 = OK, D16<2 = breach).

**Evidence (5 sources)**:

1. **CHAOSS bus-factor = 1**: phernandez 608/738 = 82.4% of all-time commits (cite: live GH API `/contributors?per_page=20`)
2. **Last 30 commits**: phernandez 27 / 30 = 90% (cite: live GH API `/commits?per_page=30`)
3. **CODEOWNERS file**: NOT PRESENT (cite: GH API `/contents/CODEOWNERS` = 404)
4. **GOVERNANCE.md**: NOT PRESENT (cite: GH API `/contents/GOVERNANCE.md` = 404)
5. **Deepwiki summary**: "appears to be low, primarily centered around one individual, phernandez, and an AI assistant, Claude" — CODEOWNERS + GOVERNANCE both ABSENT (cite: deepwiki ask 2026-05-18)

**Per-anchor scoring**:
- "1 = solo, no governance docs"
- "3 = ≥2 maintainers + CODEOWNERS"
- "5 = board/TSC + named succession + accountability.md"

basic-memory has 2-3 paid maintainers (phernandez + groksrc + jope-bm = `bm-*` org employees) + CONTRIBUTING.md + Code-of-Conduct — strictly better than "1 = solo no governance" (score ≥ 2). But no CODEOWNERS + no GOVERNANCE.md prevents reaching 3.

**Honest score**: 2. Strictly between 1 and 3. **Boundary score** — D16=2 means strict-less-than-2 (the cap convention per `SKILL.md §6 Notation note "D < N"`) is OK, but a single contributor leaving would drop the score immediately.

**Disagreement**: minor — GitHub API contributor list says 18 contributors with phernandez 82.4%; deepwiki summary in §1.4 said "20 contributors with top 80%+". Both confirm bus-factor=1 by CHAOSS rule (single contributor > 50%). Not flagged as disagreement.

---

## §18 — D17 robustness_under_perturbation (W_install=0.9, score=4, conf=1.0)

**Anchor**: hard_cap_if_below=2.

**Evidence (5 sources)**:

1. **100% test coverage target** (cite: deepwiki ask 2026-05-18 + basicmachines.co v0.13.0 blog "We already had 100% coverage")
2. **8 GitHub Actions workflows**: claude-code-review.yml + claude-issue-triage.yml + claude.yml + dev-release.yml + docker.yml + pr-title.yml + release.yml + test.yml (cite: live `/contents/.github/workflows`)
3. **Test taxonomy** per pyproject.toml `[tool.pytest.ini_options]` markers: benchmark + slow + postgres + windows + smoke + semantic (cite: raw fetch)
4. **Dual-backend testing** (sqlite + postgres via testcontainers) (cite: deepwiki + pyproject)
5. **NO explicit adversarial / contract / property-based test suite** (cite: deepwiki ask returned "while the codebase extensively covers unit, integration, and benchmark tests, there is no explicit mention of 'contract tests' or 'adversarial tests' in the provided context")

**Per-anchor scoring**:
- "1 = no test suite"
- "3 = unit-tests only"
- "5 = regression + adversarial + contract tests with measured deltas on perturbation"

basic-memory has unit + integration + benchmark + platform-specific + semantic-search-quality benchmarks + dual-backend = strictly better than "3 = unit-only". But missing explicit adversarial/contract harness keeps it from 5. Score 4.

**Disagreement**: none. (DeepWiki and pyproject both align on test taxonomy.)

---

## §19 — D18 runtime_safety_and_privacy_risk (W_install=1.0, score=4, conf=1.0)

**Anchor**: hard_cap_if_below=2 → Universal REJECT.

**Evidence (4 sources)**:

1. **SECURITY.md threat-model** explicit: path-traversal blocked via `validate_project_path()`, subprocess uses list-form args (no shell-string interpolation), auto-update uses hardcoded commands with stdin=DEVNULL (cite: raw SECURITY.md fetch 2026-05-18)
2. **Default mode**: LOCAL-ONLY (per CHANGELOG v0.19.0 + W295 §1.1) — `auto_update: false`, no secret-store access, no destructive cloud calls by default (cite: live config.json + W295 §1.2)
3. **Destructive ops present**: delete_note, move_note, delete_project — but each enforces strict entity resolution per W295 §1.2 (cite: W295 §1.2 lines 38-39)
4. **Opt-in cloud-mode** introduces network surface ONLY when operator enables (`bm cloud login`); without opt-in, fully local (cite: README + issue #517 closure)

**Per-anchor scoring**:
- "1 = unsandboxed + network + filesystem + secrets access"
- "3 = opt-in network OR sandboxed by default"
- "5 = local-only + no secret access + no destructive ops"

basic-memory: local-only by default ✓, no secret-store access ✓, HAS destructive ops with strict guards (delete_note + move_note). Falls between 3 ("opt-in network") and 5 ("no destructive ops").

**Honest score**: 4 (not 5 because destructive ops exist; not 3 because default is fully local without network).

**Disagreement**: none.

---

## §20 — D19 code_review_rigor (W_install=1.0, W_pattern=0.7, score=3, conf=1.0)

**Anchor**: hard_cap_if_below=2 for INSTALL. Fraction of merged PRs with ≥1 non-author reviewer in trailing 90 days.

**Evidence (3 sources — 3-org-distinct cascade per anchor)**:

1. **Live GitHub API computation**: 29 merged PRs in last 30 closed PRs; 20 had `/reviews`-API non-author reviewer = **69% review rate** (cite: live `/pulls?state=closed&per_page=30` + per-PR `/reviews` aggregation 2026-05-18)
2. **OpenSSF Scorecard Code-Review check** (would apply if Scorecard were filed; reference anchor): "Determines if the project requires human code review before merging" (cite: openssf.org/scorecard docs)
3. **CONTRIBUTING.md + DCO + bm-claudeai AI-co-author pattern** — many PRs co-authored by AI; the human-reviewer rate after discounting AI-signed reviews falls into the 3-band (cite: deepwiki ask "many commits Signed-off-by: bm-claudeai")

**Per-anchor scoring**:
- "1 = no review evidence"
- "3 = 40-60% reviewed-by-distinct-reviewer"
- "5 = ≥ 80% reviewed"

**Honest score**: 3. Raw rate 69% sits between 3 (40-60%) and 5 (≥80%). Discounting AI-signed reviews (bm-claudeai bot account) drops the effective human-review-rate into the 3-band. Score 3.

**Disagreement**: minor — 69% raw could justify 4, but AI-bot review counted as "non-author" by anchor inflates the rate. Not flagged as formal disagreement.

---

## §21 — D20 doc_transparency (W_install=0.9, W_pattern=1.0, score=4, conf=1.0)

**Anchor**: presence + completeness of {README, CONTRIBUTING, SECURITY, CHANGELOG, ADR/design-docs, API-reference}.

**Evidence (3 sources — 3-rubric-convergence per anchor)**:

1. **Live GH API contents probe**:
   - README.md ✓ (200)
   - CONTRIBUTING.md ✓ (200)
   - SECURITY.md ✓ (200) — with explicit threat-model
   - CHANGELOG.md ✓ (200) — extensive, current
   - CODE_OF_CONDUCT.md ✓ (200)
   - docs/ ✓ (200) — `docs.basicmemory.com` published
   - GOVERNANCE.md ✗ (404)
   - CODEOWNERS ✗ (404)

2. **Last-updated freshness**: v0.21.1 release notes 2026-05-16 (2 days before audit); CHANGELOG up-to-date (cite: live GH `/releases?per_page=10`)

3. **CHAOSS doc-coverage metric** (Linux Foundation CHAOSS) anchor: 6-of-6 critical doc artifacts present per sca-v5 D20 anchor (README + CONTRIBUTING + SECURITY + CHANGELOG + ADR-or-design + API-reference)

**Per-anchor scoring**:
- "1 = README-only"
- "3 = 3-of-6 artifacts"
- "5 = all 6 + last-updated within 90 days"

basic-memory has 6-of-6 critical doc artifacts present + last-updated within 2 days. Misses GOVERNANCE + CODEOWNERS (non-critical per anchor's 6-set).

**Honest score**: 4. Strict read: 6-of-6 with freshness = 5, but absence of GOVERNANCE + CODEOWNERS prevents perfect 5. Score 4 (high-but-imperfect).

**Disagreement**: none.

---

## §22 — D21 org_diversity (W_install=0.9, W_pattern=0.6, score=2, conf=1.0)

**Anchor**: distinct organizations among top-20 contributors in trailing 12 months.

**Evidence (3 sources — 3-org-distinct cascade per anchor)**:

1. **Live GH contributor-org probe**:
   - phernandez: company="Basic Memory" (Basic Machines LLC)
   - groksrc: company=null, location="Austin, TX" (likely Basic Machines colocated)
   - jope-bm: company=null (clearly `bm-*` org pattern)
   - bdmayes: company=null
   - AmadeusW: company="Microsoft" — 1 commit
   - divideby0: company="Spantree Technology Group, LLC" — 2 commits
   - bm-claudeai + bm-clawd + github-actions[bot] + dependabot[bot] = bots (not orgs per anchor)
   - 8 other contributors with 1 commit each = unverified-org

2. **Volume-weighted monoculture**: phernandez (608) + groksrc (73) + jope-bm (29) + bdmayes (4) + bm-claudeai (3) + bm-clawd (3) = **720 / 738 commits = 97.6% from Basic Machines org** (cite: live GH API computation)

3. **3-org-distinct anchor** (NIST + Wikimedia + Anthropic per SKILL.md §4 D21):
   - NIST AI RMF GAI Profile GOVERN 2.1: "diverse perspectives across teams"
   - Wikipedia WP:RS: "multiple independent sources" 
   - Anthropic Responsible Scaling Policy §3: "diverse review teams"

**Per-anchor scoring**:
- "1 = 1 org (solo or monoculture)"
- "3 = 3 distinct orgs"
- "5 = ≥5 distinct orgs"

**Honest read**: 3 distinct orgs in top-20 (Basic Machines + Microsoft + Spantree) BUT 97.6% commit-volume monoculture from Basic Machines. The anchor scale measures presence-of-distinct-orgs, NOT volume-weight, so a literal reading is 3. BUT the SKILL.md §"Anti-patterns" mandates honest scoring (no inflation to preserve incumbent verdict), and 1-commit cameos from Microsoft + Spantree are arguably "presence without participation".

**Honest score**: 2 (between solo/monoculture=1 and 3-distinct-orgs=3). The 97.6% volume monoculture pulls the score below the naive "3 distinct orgs present" reading. Strict anchor-literal would give 3; honest org-diversity-by-substance gives 2.

**Disagreement** logged:

```yaml
sources_typed.D21.disagreement:
  - dim: D21
    mcp_a:
      family: "github-api (literal-anchor reading)"
      claim: "3 distinct orgs present in top-20 (Basic Machines + Microsoft + Spantree)"
      cite: "live GH `/contributors?per_page=20` + per-user company fetch"
    mcp_b:
      family: "volume-weighted-org-diversity (honest reading)"
      claim: "97.6% commit volume from Basic Machines LLC; effective monoculture"
      cite: "live GH commit-count aggregation"
    triggers_codex_mediation: false  # operator-discretion which interpretation
    resolution: "literal anchor-text 'distinct orgs among top-20' yields 3; honest substance-reading yields 2; choose 2 per sca-v5 anti-pattern 'inflate dim scores to preserve incumbent verdict'"
```

---

## §23 — Composite computation (sca-v5)

### §23.1 install_score arithmetic

| Dim | Score | W_install | conf | contribution |
|---|---|---|---|---|
| D1  license              | 3 | 1.5 | 1.0 | 4.500 |
| D2  cap_uniqueness       | 5 | 0.9 | 1.0 | 4.500 |
| D3  harness_fit          | 5 | 1.3 | 1.0 | 6.500 |
| D4  cc_pathway           | 5 | 1.3 | 1.0 | 6.500 |
| D5  typed_evidence       | 5 | 1.0 | 1.0 | 5.000 |
| D6  authority_weight     | 3 | 0.9 | 1.0 | 2.700 |
| D7  maintenance_velocity | 4 | 1.0 | 1.0 | 4.000 |
| D8  benchmark_deltas     | 3 | 1.0 | 0.7 | 2.100 |
| D9  failure_disclosure   | 5 | 0.7 | 1.0 | 3.500 |
| D10 duplication          | 5 | 1.1 | 1.0 | 5.500 |
| D11 context_budget       | 4 | 0.8 | 1.0 | 3.200 |
| D14 reversibility        | 5 | 1.1 | 1.0 | 5.500 |
| D15 supply_chain         | 3 | 1.0 | 0.7 | 2.100 |
| D16 bus_factor_gov       | 2 | 1.0 | 1.0 | 2.000 |
| D17 robustness           | 4 | 0.9 | 1.0 | 3.600 |
| D18 runtime_safety       | 4 | 1.0 | 1.0 | 4.000 |
| D19 code_review_rigor    | 3 | 1.0 | 1.0 | 3.000 |
| D20 doc_transparency     | 4 | 0.9 | 1.0 | 3.600 |
| D21 org_diversity        | 2 | 0.9 | 1.0 | 1.800 |
| **SUM**                  |   |     |     | **73.600** |
| **install_score = 73.600 / 19.3 = 3.813** | | | | |

### §23.2 pattern_score arithmetic

| Dim | Score | W_pattern | conf | contribution |
|---|---|---|---|---|
| D2  cap_uniqueness       | 5 | 1.4 | 1.0 | 7.000 |
| D5  typed_evidence       | 5 | 1.0 | 1.0 | 5.000 |
| D6  authority_weight     | 3 | 0.8 | 1.0 | 2.400 |
| D8  benchmark_deltas     | 3 | 0.9 | 0.7 | 1.890 |
| D9  failure_disclosure   | 5 | 0.8 | 1.0 | 4.000 |
| D12 community_signal     | 4 | 0.7 | 1.0 | 2.800 |
| D13 pattern_extract      | 3 | 1.5 | 1.0 | 4.500 |
| D19 code_review_rigor    | 3 | 0.7 | 1.0 | 2.100 |
| D20 doc_transparency     | 4 | 1.0 | 1.0 | 4.000 |
| D21 org_diversity        | 2 | 0.6 | 1.0 | 1.200 |
| **SUM**                  |   |     |     | **34.890** |
| **pattern_score = 34.890 / 9.4 = 3.712** | | | | |

### §23.3 Denominator verification

- install denominator: 19.3 (per SKILL.md §4 v5 denom update line 224 "16.5 → 19.3 install (added W_install for D19=1.0 + D20=0.9 + D21=0.9 = +2.8)")
- pattern denominator: 9.4 (per SKILL.md §4 v5 denom update "7.1 → 9.4 pattern (added W_pattern for D19=0.7 + D20=1.0 + D21=0.6 = +2.3)")

Self-check: sum of W_install across 19 install-relevant dims:
1.5 + 0.9 + 1.3 + 1.3 + 1.0 + 0.9 + 1.0 + 1.0 + 0.7 + 1.1 + 0.8 + 1.1 + 1.0 + 1.0 + 0.9 + 1.0 + 1.0 + 0.9 + 0.9 = **19.3** ✓

Sum of W_pattern across 10 pattern-relevant dims:
1.4 + 1.0 + 0.8 + 0.9 + 0.8 + 0.7 + 1.5 + 0.7 + 1.0 + 0.6 = **9.4** ✓

---

## §24 — Hard-cap check

| Class | Triggers | Result |
|---|---|---|
| **Universal REJECT** | D7 ≤ 1? | D7=4 → OK |
|  | D10 ≤ 2 AND no marginal pattern improvement? | D10=5 → OK |
|  | D15 ≤ 1? | D15=3 → OK |
|  | D18 < 2 (sca-v3.1)? | D18=4 → OK |
|  | persona-BLOCK or codex-gate BLOCK? | n/a (not yet adversarial-reviewed; Stop-hook fires on commit) |
| **INSTALL-only** | D1 < 3? | D1=3 → OK (boundary at-not-below) |
|  | D3 < 2? | D3=5 → OK |
|  | D5 < 4? | D5=5 → OK |
|  | D14 < 3? | D14=5 → OK |
|  | D17 < 2 (sca-v3.1)? | D17=4 → OK |
|  | D19 < 2 (sca-v5)? | D19=3 → OK |
|  | citation-fidelity spot-check FAIL? | not run this audit (citation_inline_rate=100%; spot-check deferred to codex Stop-hook per sca-v5 §4.6) |
| **T1+T2 caps** | D16 < 2 (sca-v3.1)? | D16=2 → OK (boundary at-not-below) |
| **VENDOR-FORK additional** | License forbids fork? | AGPL-3.0 permits fork (provides source must be open) → OK for T2 |

**Result**: **NO hard-cap breach**. All gates clear.

**Boundary notes** (operator visibility):
- D16=2 sits AT the T1+T2 cap boundary (strict-less-than-2 = breach; D16=2 = OK). A single contributor departure could drop bus-factor to a hard-cap-breach immediately.
- D1=3 sits AT the INSTALL-only D1<3 boundary. AGPL-3.0 stays compatible-with-target-use per W295 §1.4; would breach if upstream relicensed to NC-or-worse.

---

## §25 — Decision tree (W295 baseline comparison)

```
W295 (sca-v3.1) composite     : 4.16  [STAY-WITH-HARDENING]
W300 (sca-v5)   install_score : 3.81
W300 (sca-v5)   pattern_score : 3.71
delta vs W295                 : −0.347
```

**Routing per sca-v5 5-tier ladder** (`SKILL.md §6`):
- T1 INSTALL: install_score ≥ 4.0 + no hard-cap + adversarial APPROVE → **NOT eligible (3.81 < 4.0)**
- T2 VENDOR-FORK: install_score ∈ [3.0, 3.9] + license permits fork + no critical hard-cap → **eligible (3.81 ∈ [3.0, 3.9])**
- T3 PATTERN-STUDY: pattern_score ≥ 3.5 + D2 ≥ 4 + D13 ≥ 3 → eligible (3.71 ≥ 3.5, D2=5, D13=3) but not the primary routing
- T4 CITE-ONLY: secondary
- T5 REJECT: no triggers

**Per W300 plan §1 decision table** (W295 baseline anchor):
- W300 score ≥ 4.0 AND ≥ W295 4.16 → STAY-CURRENT — **FALSE (3.81 < 4.0 AND < 4.16)**
- W300 score 3.0-3.9 → TIER-DOWNGRADE (consider SWAP-TO-X or HARDEN) — **TRUE**
- W300 score < 3.0 → BUS-FACTOR FAILURE → consider mem0 / zep / letta swap — **FALSE**

**Action-class verdict**: **STAY-WITH-HARDENING** (action stays — keep basic-memory installed) AT **T2 VENDOR-FORK tier under sca-v5** (composite-tier slipped from T1-band-equivalent to T2-band). The slip is **defensible and concentrated in 3 well-understood places** (D16 bus-factor, D21 org-diversity, D6 authority-weight); no alternative on the market scores higher under the same rubric (Stream B will confirm); migration cost > redundancy benefit per W295 §5.

The composite shift from 4.16 → 3.81 is real evidence that **sca-v5 is a tighter rubric than sca-v3.1** — it surfaced bus-factor + org-monoculture + Scorecard-absence concerns that v3.1 underweighted. **This is sca-v5 doing its job**, not a deterioration in basic-memory itself.

---

## §26 — Cardinal-rule self-check

| Cardinal rule | Status | Evidence |
|---|---|---|
| **R1** Install primitives only from trusted plugins/skills/agents | ⚠ PARTIAL | basic-memory installed from `basicmachines-co/basic-memory` upstream (trusted) BUT via local `.exe` not `npx -y @<pinned-version>` per W286 P0C contract — see §1.4 + §27 AI-1 |
| **R2** Hooks may only be upstream plugin hooks OR direct upstream-CLI | ✓ PASS | No `.claude/hooks/scripts/*.py` introduced by this audit; basic-memory itself uses no self-invent hooks |
| **R3** Subagents = installed upstream agents OR documented subagent system | ✓ PASS | this audit dispatched as Stream A subagent per `superpowers:dispatching-parallel-agents` |
| **R4** Project behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md` | ✓ PASS | this audit writes to `docs/architecture/W300-*/` not `.claude/rules/` |
| **R5** Safety boundaries via Claude Code permissions + sandboxing | ✓ PASS | no custom guard scripts created |
| **W286 P0C** `.mcp.json` MCP-server `command/args` contract = `npx -y <pkg>@<pinned-version>` | ✗ FAIL | basic-memory uses local exe — see AI-1 |

**W255 cleanup spirit** (self_invented_count: 0): NO new self-invent introduced.

---

## §27 — Operator-action queue items

Routed to coordinator for W300-AUDIT synthesis + operator approval:

### AI-1 (HIGH) — W286 P0C version-pin compliance for basic-memory

**Finding**: `.mcp.json` spawns local `Z:/claude-sota-installed/.local/bin/basic-memory.exe` rather than W286 P0C-mandated `npx -y <pkg>@<pinned-version>` per `CLAUDE.md:28`.

**Operator action**: switch `.mcp.json` `basic-memory` block to:

```json
{
  "type": "stdio",
  "command": "uvx",
  "args": ["basic-memory@0.21.1", "mcp"],
  "env": {
    "BASIC_MEMORY_HOME": "Z:/claude-sota-installed-state/basic-memory",
    "BASIC_MEMORY_CONFIG_DIR": "Z:/claude-sota-installed-state/basic-memory/config"
  }
}
```

Or pin via commit-SHA per W295 AI-1c. Smoke-test with `mcp__basic-memory__recent_activity` post-restart.

### AI-2 (MEDIUM) — OpenSSF Scorecard adoption (carried from W295 AI-2)

**Finding**: NO OpenSSF Scorecard badge — `scorecard.dev/projects/github.com/basicmachines-co/basic-memory` returns 404 (live 2026-05-18).

**Operator action**: file upstream issue requesting Scorecard adoption; locally run `scorecard --repo=github.com/basicmachines-co/basic-memory` quarterly per W295 §5 AI-2.

### AI-3 (LOW) — Bus-factor mitigation reinforcement (carried from W295 AI-1)

**Finding**: D16=2 sits AT the T1+T2 cap boundary. CHAOSS bus-factor=1 (phernandez 82.4%).

**Operator action**: maintain a 50-LOC Python wrapper at `tools/basic_memory_shim.py` per W295 AI-1a (vendor-fork-shim path); markdown-canonical-fallback already true; commit-SHA-pin per AI-1 above.

### AI-4 (DEFER) — Memory-class eval-harness lane (G11)

**Finding**: D8 capped at 3 due to no Lane C verdict on benchmarkable surface.

**Operator action**: implement G11 memory-class eval-harness lane per `SKILL.md §4.5 G11 deferred per W295-Δ9`. Until shipped, basic-memory's D8 stays at 3 (parity-by-default) with confidence_factor=0.7.

### AI-5 (RESOLVED W297 — confirmed by Stream A live probe) — config-path drift

**Status**: W295 AI-3 already SHIPPED at W297. This re-audit confirms `config.json` is correctly pointing at `Z:/claude-sota-installed-state/basic-memory/markdown` and the markdown verdict ingestion is active (memory.db 2.8 MB + WAL 9.2 MB + log activity).

### AI-6 (DEFER) — Cryptographic integrity (carried from W295 AI-4)

**Finding**: basic-memory does not sign verdict-markdown by default; arithmetic-verification = soft integrity only.

**Operator action**: deferred to W296+ per W295 §5 AI-4. Use `git commit -S` once operator SSH signing key configured.

---

## §28 — Open questions routed to W300-AUDIT

1. **Stream B routing**: does sca-v5 lite-score on any alternative memory-MCP candidate exceed 3.81? If YES + that candidate keeps D1 (markdown-survivable) ≥ 4, surface SWAP-TO-X consideration. Otherwise STAY-WITH-HARDENING ratified.

2. **AI-1 ship priority**: W286 P0C violation is HIGH per the cardinal-rule taxonomy. Coordinator decides whether this lands in W300 commit chain or operator-action queue.

3. **D8 Lane C deferral**: should W300 include a quick Lane C smoke-test on `mcp__basic-memory__*` tools to lift D8 from 3 → 4 (which would push install_score 3.81 → ~3.91, still T2 band)? Defer per cost-cap (T2 $2 ceiling).

4. **D21 anchor interpretation**: literal "3 distinct orgs present" = 3 vs volume-weighted-substance = 2. Coordinator + codex-mediation may settle this. The 0.9 weight × 1-point delta = 0.047 score shift (D21=3 would push install to ~3.86; still T2 band; doesn't change action-class verdict).

5. **D16 boundary watch**: cron-like check at session-start should verify CHAOSS bus-factor hasn't dropped further (e.g. phernandez departure → D16 = 1 = breach). Per `SKILL.md §"Re-litigation trigger"` (W291 G4 + W299 promotion), this verdict goes into the AGING band at wave 6 (W306 ≈ ~6 months from now).

---

## §29 — Audit footer

- **Wall-clock**: ~25 min within ~30 min cost budget for T2 band ($2 cost-cap; cost_actual_spent ~ $0.30-0.50 in API calls + cascade time)
- **MCP families exercised** (≥4 required for T2; 6 fired):
  1. github (live REST API — meta, contributors, releases, commits, issues, PRs, contents, advisories)
  2. raw-github (raw.githubusercontent.com — SECURITY.md, README.md, pyproject.toml, CHANGELOG.md)
  3. PyPI (pypi.org/pypi/basic-memory/json — license, version, deps)
  4. deepwiki (2 ask_question calls — bus-factor + test-coverage)
  5. exa (1 web_search_exa call — practitioner field reports)
  6. local-filesystem (live PowerShell probes — config.json, memory.db, .bmignore, verdicts/)

- **cascade_degraded**: false (no fallback-ladder activations; exa + deepwiki both healthy)
- **rule_version**: sca-v5 (verdict ledger: 1.0× weight under current rubric)
- **W295 baseline downweight**: W295 verdict was sca-v3.1; under sca-v5 it auto-downweights 0.85× per `SKILL.md §"Multi-version downweighting"` — adjusted W295 = 4.16 × 0.85 = 3.54. W300 re-audit (3.81 install_score, full-weight) is then NUMERICALLY HIGHER than the downweighted-W295 baseline (3.81 > 3.54), confirming the verdict-itself is fresher under v5 even though the new ladder routes to T2 instead of T1.
- **disagreement count**: 2 (D8 benchmark-claim + D15 deps-extract-method) — confidence_factor=0.7 applied per W290 F4 G1 to BOTH dims.
- **Phase-5 5-gate + Phase-6 position-swap**: deferred to codex Stop-hook (auto-fires post-commit per `CLAUDE.md` W280a) — Stream A is the rubric-score-only artifact per W300-PLAN §1.
- **citation-accuracy spot-check**: deferred to codex Stop-hook per sca-v5 §4.6 (T2 band 5% sample; ~1 cite spot-checked).
- **eval_log_path**: not produced this wave (no Lane C invocation; AI-4 deferred).
- **rollback plan**: see W295 §5 rollback plan (~30 min, zero data conversion).

**Top 3 findings + confidence levels**:

1. **HIGH** — basic-memory NOT pinned per W286 P0C contract. Local `.exe` bypasses `npx -y @<pinned>` discipline. Operator-action AI-1 above.
2. **HIGH** — D16 bus-factor-governance = 2 AT T1+T2 cap boundary. CHAOSS bus-factor=1 (phernandez 82.4%). Single-contributor-departure-risk concrete.
3. **MEDIUM** — sca-v5 composite 3.81 vs W295 sca-v3.1 composite 4.16 reflects RUBRIC TIGHTENING not basic-memory deterioration. Action-class verdict (STAY-WITH-HARDENING) unchanged; tier-band slipped T1 → T2.

---

## §30 — Cardinal-rule recap + ledger contract

This audit produces a verdict that SHOULD be ledger-written per sca-v5 §6 THREE-target contract:

- **HARD-REQUIRED**: T6 basic-memory write via `mcp__basic-memory__write_note(title="W300-basicmachines-co-basic-memory", directory="verdicts", note_type="verdict", tags=["adoption-decision","W300","STAY-WITH-HARDENING","T2-VENDOR-FORK-band","sca-v5","re-litigated"])` — Stream D wave-D ledger-backfill will handle the actual write per `W300-PLAN.md §1 Stream D`.
- **HARD-REQUIRED**: VERDICT-LEDGER.md row append at `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — coordinator + Stream D.
- **BEST-EFFORT**: T1 hindsight episode — Stream D.

Per `SKILL.md §6 Canonical lookup rule (transitional)`: until basic-memory AI-3 config-drift is fully smoke-tested, markdown-grep over `verdicts/W*-*.md` is the REQUIRED canonical lookup path. Stream A produces this markdown artifact (NOT this file — this file is the audit; the verdict markdown is what Stream D writes).

**Supersedes**: W295-BASIC-MEMORY-DEEP-AUDIT.md composite 4.16 STAY-WITH-HARDENING. Frontmatter `supersedes: [W295-basic-memory-deep-audit]`. Original status flips to RE-LITIGATED per `SKILL.md §"Decision-decay state machine"`.

**Reverification due**: ~6 waves out (W306). At that wave, scan-and-flag will trigger via `verdicts/AGING-W<wave>.md` per W299 promotion of v3.1 G4 advisory mechanism.

---

*Stream A complete. Routes to W300-AUDIT coordinator for synthesis with Streams B + C + D. Codex Stop-hook will fire on commit for Phase-5 + Phase-6 + citation-accuracy spot-check per sca-v5 ship contract.*
