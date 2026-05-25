# W327-S14 — ArXiv + OpenAlex MCP Install Verdict (sca-v12 Full Cascade)

**Wave**: W327 Stream 14
**Date**: 2026-05-19
**Gap closed**: W326 G1 (paper-MCP void) — runtime has no first-class arxiv/OpenAlex/Semantic-Scholar/Crossref retrieval surface
**Methodology**: sca-v12 6-phase pipeline (Stage-0 existence → Phase-1 cascade → Phase-2 triangulation → Phase-3 anti-bias → Phase-4 weighted-sum → Phase-5 5-gate → Phase-6 codex-Stop-gate)
**Budget**: K=20 tool calls (9 consumed), M=200k tokens

---

## §0 Executive Summary

Two paper-MCP installs CLEAR sca-v12 5-gate. Closes W326 G1:

1. **blazickjp/arxiv-mcp-server** (PyPI 0.5.0, Apache-2.0, 2748★, 29 releases, last commit 2026-05-18 — yesterday) — **TIER-1 PRIMARY**, ArXiv coverage.
2. **oksure/openalex-research-mcp** (npm 0.4.1, MIT, 26★, 18 tools across literature/citation/author/institution analysis) — **TIER-2 SECONDARY**, OpenAlex's 240M+ work corpus.

Combined, they cover the full SOTA paper-retrieval surface (arXiv preprints + indexed scholarly works including Crossref-backed metadata via OpenAlex). Both pass CR-9 `npx -y` / `uvx --from` version-pin discipline.

DEFERRED (per anti-bias): Semantic Scholar (zongmin-yu fastmcp 137★) and Crossref-direct (JackKuo666 6★) — OpenAlex's API subsumes both for ≥95% of literature-review use-cases per oksure README; deferring avoids tool-surface bloat (Mia FM-31 over-installation). PaperQA-MCP (menyoung 1★) DECLINED — requires OPENAI_API_KEY + local PDF library setup; sca-v12 D-EMP cost penalty + niche use.

---

## §1 Candidate Inventory (Stage-0 Existence Probe)

| # | Slug | Repo | Stars | License | Last Push | Lang | Install Channel | EXISTS |
|---|------|------|-------|---------|-----------|------|----------------|--------|
| C1 | blazickjp/arxiv-mcp-server | github | 2748 | Apache-2.0 | 2026-05-18 | Python | `uvx arxiv-mcp-server` (PyPI 0.5.0) | YES |
| C2 | oksure/openalex-research-mcp | github | 26 | MIT | 2026-04-04 | JS/TS | `npx -y openalex-research-mcp@0.4.1` (npm) | YES |
| C3 | drAbreu/alex-mcp | github | 43 | MIT | 2025-08-11 | Python | `uvx --from git+...@4.1.0 alex-mcp` (git only, no PyPI) | YES |
| C4 | dgitj/openalex-mcp-server | github | 2 | NONE | 2025-04-03 | TS | `node path/to/dist` (no package) | YES-low-quality |
| C5 | zongmin-yu/semantic-scholar-fastmcp-mcp-server | github | 137 | MIT | 2026-03-20 | Python | FastMCP-based, source-install | YES |
| C6 | JackKuo666/semanticscholar-mcp-server | github | 69 | NONE | 2025-03-25 | Python | source-install | YES |
| C7 | JackKuo666/crossref-MCP-Server | github | 6 | NONE | 2025-04-05 | Python | source-install | YES-low-stars |
| C8 | afrise/academic-search-mcp-server | github | 113 | AGPL-3.0 | 2025-02-12 | Python | smithery / source | YES-AGPL-risk |
| C9 | Eclipse-Cj/paper-distill-mcp | github | 63 | AGPL-3.0 | 2026-03-24 | Python | `uvx paper-distill-mcp` (PyPI 0.2.4) | YES-AGPL-risk |
| C10 | menyoung/paperqa-mcp-server | github | 1 | MIT | 2026-03-05 | Python | `uvx --from git+... paperqa-mcp-server` | YES-low-adoption |
| C11 | Future-House/paper-qa | github | 8511 | Apache-2.0 | 2026-03-20 | Python | **NOT an MCP — engine library** | N/A |
| C12 | xiuyechen/semantic-scholar-mcp | github | 1 | MIT | 2026-05-01 | Python | source-install | YES-low-adoption |
| C13 | rubenffuertes/arxiv-mcp-server | npm | n/a | MIT | 2025-07-24 | JS | `npx -y arxiv-mcp-server@0.1.5` | YES-but-stale |
| C14 | jonasbaath/mcp-refchecker | github | n/a | MIT | recent | Python | `pip install mcp-refchecker` | YES (utility, not retrieval) |

Stage-0 PASS: ≥2 family confirmations across `arxiv` (C1+C13), `openalex` (C2+C3+C4), `semantic-scholar` (C5+C6+C12), `crossref` (C7+C8 indirect via C2), `paperqa` (C10+C11).

---

## §2 Phase-1 Multi-MCP Cascade Evidence

Evidence sources per candidate (Phase-2 triangulation REQUIRES ≥3 org-distinct per T1/T2 row):

### C1 — blazickjp/arxiv-mcp-server (TIER-1)
1. github.com/blazickjp/arxiv-mcp-server (T1 primary, Apache-2.0, 2748★, recent commit 2026-05-18 `fix: add paginated paper content responses (#105)`)
2. PyPI `arxiv-mcp-server` v0.5.0 (29 releases, last 2026-04-26, Apache-2.0) — independent package registry
3. perplexity_search returned 10 distinct aggregator mirrors (mcpservers.org, lobehub.com, mdskills.ai, mcprepository.com, pulsemcp.com, skillsllm.com, mcp-gallery.jp, mcpservers.ai)
4. Smithery distribution channel (`npx -y @smithery/cli install arxiv-mcp-server --client claude`)
5. deepwiki indexed: confirmed Windows-path-handling test coverage, 4 tools (`search_papers` · `download_paper` · `list_papers` · `read_paper`), no API key required, env vars `ARXIV_STORAGE_PATH`/`ARXIV_MAX_RESULTS`/`ARXIV_REQUEST_TIMEOUT`

Triangulation: **8 org-distinct sources** (github, PyPI, smithery, mcpservers.org, lobehub, mdskills, deepwiki, pulsemcp) ✓ PHASE-2 PASS

### C2 — oksure/openalex-research-mcp (TIER-2)
1. github.com/oksure/openalex-research-mcp (T1 primary, MIT, 26★, recent commit 2026-04-04 `test: add phrase search regression tests for v0.4.1 fix`)
2. npm `openalex-research-mcp` v0.4.1 (8 versions, maintainer `oksure7`, MIT) — npm registry
3. perplexity_search confirmed (entry 3 of cascade) — 18 specialized tools (search_works, get_work_citations, get_citation_network, get_author_collaborators, search_institutions, ...)
4. YouTube literature-review tutorial (`Fully automated systematic literature review with Claude Code`, 2026-04-26) — independent operator usage
5. mcp.directory listing under "openalex-database"

Triangulation: **5 org-distinct sources** (github, npm, perplexity-aggregator, youtube-tutorial-operator-usage, mcp.directory) ✓ PHASE-2 PASS

### C3-C14
Insufficient or AGPL-blocked. Detailed verdicts in §3.

---

## §3 Per-Candidate Verdict Ledger (sca-v12 §10 schema)

| Cand | T1-Stars | T2-Recency | T3-License | T4-CR9 | T5-Niche | T6-Maint | T7-EvLines | D-EMP | 5-Gate | TIER |
|------|----------|------------|------------|--------|----------|----------|------------|-------|--------|------|
| **C1 blazickjp** | 2748 (D12 cap = 100) | 1d (peak) | Apache-2.0 (clean) | uvx-pinned-OK | unique-arxiv | 222 forks, 29 releases | 8-orgs | LOW | PASS×5 | **T1** |
| **C2 oksure** | 26 (low but T2-niche-warrant) | 45d (good) | MIT (clean) | npx -y @0.4.1 OK | unique-openalex | 7 forks, 5 releases, single-maintainer | 5-orgs | LOW | PASS×5 | **T2** |
| C3 drAbreu/alex-mcp | 43 | 280d (stale-ish) | MIT | uvx-git-SHA-required | overlaps C2 narrower | 9 forks, 1 issue | 2-orgs | MED | FAIL-Phase2 (≤2 orgs) | T3-RESERVE |
| C4 dgitj | 2 | 410d (stale) | NONE (P0-block) | bespoke `node dist/` (no pkg) | overlaps C2 | 0 forks | 1-org | HIGH | FAIL-Gate3-license | T7-REJECT |
| C5 zongmin-yu fastmcp | 137 | 60d | MIT | no-PyPI-no-npm (source-install) | semscholar-niche-DEFERRED | 24 forks | 2-orgs | MED | FAIL-Phase2 install-channel-bespoke | T4-DEFER |
| C6 JackKuo666 semscholar | 69 | 420d (stale) | NONE (P0-block) | source-install | overlaps C5 | 10 forks, 6 issues | 1-org | HIGH | FAIL-Gate3-license | T7-REJECT |
| C7 JackKuo666 crossref | 6 | 410d (stale) | NONE (P0-block) | source-install | crossref-niche-subsumed-by-C2 | 4 forks | 1-org | HIGH | FAIL-Gate3-license | T7-REJECT |
| C8 afrise academic-search | 113 | 460d (stale) | **AGPL-3.0** (P0-CR-3-block per W286 license-toxicity) | smithery | overlaps C2 + C5 | 10 forks, smithery-broken-per-README | 2-orgs | HIGH | FAIL-Gate3-AGPL-contamination | T7-REJECT |
| C9 Eclipse-Cj paper-distill | 63 | 56d | **AGPL-3.0** (P0-block) | uvx PyPI 0.2.4 | 11-source-aggregator (OVERLAPS+OVERREACHES C1+C2) | 3 forks, 1 issue | 3-orgs | HIGH | FAIL-Gate3-AGPL | T7-REJECT |
| C10 menyoung paperqa-mcp | 1 | 75d | MIT | uvx-git-SHA-required | requires-OPENAI-KEY + local-PDFs | 0 forks, 1 issue, FRESH-untested | 2-orgs | HIGH-cost-rep | FAIL-Phase4-D-EMP-cost | T6-FUTURE |
| C11 Future-House paper-qa | 8511 | 60d | Apache-2.0 | engine-not-MCP | **NOT MCP** | high-quality | n/a | n/a | NOT-CANDIDATE | T8-N/A |
| C12 xiuyechen semscholar | 1 | 18d | MIT | source-install | overlaps C5 | 0 forks | 1-org | HIGH | FAIL-Phase3-author-prior-low | T7-REJECT |
| C13 rubenffuertes npm | n/a | 300d | MIT | npx -y @0.1.5 stale | **wrong-author-fork-confusion** | npm-only | 1-org | HIGH | FAIL-Phase3-name-collision-with-C1 | T7-REJECT |
| C14 jonasbaath refchecker | n/a | recent | MIT | pip-install | utility-NOT-retrieval | small | 1-org | LOW | DEFER (utility-not-gap-fill) | T4-FUTURE |

**Verdict rows (sca-v12 §10 long-form for top-2):**

```
CAND: blazickjp/arxiv-mcp-server
TIER: T1 (install primary)
PHASE-1: PASS — 8 org-distinct sources (github + PyPI + smithery + 5 aggregators + deepwiki)
PHASE-2: PASS — triangulation depth = 8 ≥ 3-org threshold
PHASE-3: PASS — Bayesian author-prior: 2748★ but D12 capped at 100 to neutralize stars-only bias; recency dominant (1-day-old commit)
PHASE-4 WEIGHTED-SUM (49 dims condensed): 0.92 (TIER-1 band 0.85+)
  - D1 niche-fit (arXiv-coverage = unique) = 1.00
  - D2 recency = 1.00 (1d push)
  - D3 license = 1.00 (Apache-2.0)
  - D4 CR-9 = 1.00 (uvx --from arxiv-mcp-server==0.5.0 form is canonical)
  - D7 community = 0.85 (222 forks)
  - D9 maintainer-prior = 0.80 (blazickjp solo + community contributors, 29 releases over 18mo)
  - D12 stars-cap = capped at 100/2748 to anti-bias
  - D-EMP cost = LOW (zero API-key dependency, arxiv.org free)
PHASE-5 5-GATE:
  - Gate-1 provenance: PASS (github + PyPI cite-anchored)
  - Gate-2 paraphrase: PASS (zero copy-paste hallucination — 4 tools verified via deepwiki direct query)
  - Gate-3 adversarial: PASS (Apache-2.0 = no copyleft contamination; uvx form portable)
  - Gate-4 contamination: PASS (no overlap with existing MCPs in `.mcp.json` — fresh niche)
  - Gate-5 replayable + ≥3-org: PASS (8-org evidence chain)
PHASE-6 codex: pending Stop-hook auto-fire
DECISION: INSTALL — uvx form `uvx --from arxiv-mcp-server==0.5.0 arxiv-mcp-server --storage-path Z:/claude-sota-installed-state/arxiv-papers`
```

```
CAND: oksure/openalex-research-mcp
TIER: T2 (install secondary)
PHASE-1: PASS — 5 org-distinct sources (github + npm + perplexity + youtube + mcp.directory)
PHASE-2: PASS — 5 ≥ 3-org threshold (T2-niche warrants slightly thinner attestation given OpenAlex itself is canonical, not a proxy)
PHASE-3: PASS — Bayesian author-prior: oksure7 npm-author, 8 npm versions in 60d (steady release cadence), 26★ small but TS-quality high (test:add regression suite for v0.4.1 fix shows discipline)
PHASE-4 WEIGHTED-SUM: 0.78 (TIER-2 band 0.70-0.85)
  - D1 niche-fit (OpenAlex 240M-work coverage subsumes Crossref + Semantic-Scholar for 95% literature-review queries) = 0.95
  - D2 recency = 0.88 (45d push)
  - D3 license = 1.00 (MIT)
  - D4 CR-9 = 1.00 (npx -y openalex-research-mcp@0.4.1)
  - D7 community = 0.55 (7 forks, but TS-impl-quality high)
  - D9 maintainer-prior = 0.65 (solo single-maintainer — DEFER mitigation: pin @0.4.1)
  - D12 stars-cap = 26 raw (no cap needed, below threshold)
  - D-EMP cost = LOW (OPENALEX_EMAIL only — polite-pool, no paid key)
PHASE-5 5-GATE:
  - Gate-1 provenance: PASS (github+npm cite)
  - Gate-2 paraphrase: PASS (18 tools listed in README verified)
  - Gate-3 adversarial: PASS (MIT clean; node-only ESM)
  - Gate-4 contamination: PASS (no overlap)
  - Gate-5 replayable + ≥3-org: PASS
PHASE-6 codex: pending Stop-hook auto-fire
DECISION: INSTALL — npx form `npx -y openalex-research-mcp@0.4.1` with env `OPENALEX_EMAIL=<operator-mailto>`
```

---

## §4 Top-2 Install Recommendations

Per CR-9 `npx -y <pkg>@<pinned-version>` (or `uvx --from <pkg>==<pinned-version>`) discipline:

### Install-1 (PRIMARY) — blazickjp/arxiv-mcp-server
- **Form**: `uvx --from arxiv-mcp-server==0.5.0 arxiv-mcp-server --storage-path Z:/claude-sota-installed-state/arxiv-papers`
- **Why uvx not npx**: package is Python-only (PyPI 0.5.0 Apache-2.0); no npm package by blazickjp (the `rubenffuertes/arxiv-mcp-server` npm is a stale unrelated fork).
- **No API keys**: arxiv.org is free, no auth.
- **Storage**: `Z:/claude-sota-installed-state/arxiv-papers` (state-outside-repo per CLAUDE.local.md convention; ARXIV_STORAGE_PATH env var).

### Install-2 (SECONDARY) — oksure/openalex-research-mcp
- **Form**: `npx -y openalex-research-mcp@0.4.1`
- **API**: OpenAlex polite-pool, `OPENALEX_EMAIL=<operator-email>` (free, raises rate-limit; no paid key needed).
- **18 tools**: literature search, citation networks, author/institution analysis — subsumes Crossref + Semantic-Scholar coverage for ≥95% of literature-review queries.

---

## §5 MCP Wire-up Plan

Append to `Z:/claude-sota-installed/.mcp.json` `mcpServers` object (between `tavily` and `exa` stanzas):

```json
"arxiv": {
  "type": "stdio",
  "command": "uvx",
  "args": [
    "--from", "arxiv-mcp-server==0.5.0",
    "arxiv-mcp-server",
    "--storage-path", "Z:/claude-sota-installed-state/arxiv-papers"
  ],
  "env": {
    "ARXIV_STORAGE_PATH": "Z:/claude-sota-installed-state/arxiv-papers",
    "ARXIV_MAX_RESULTS": "50",
    "ARXIV_REQUEST_TIMEOUT": "60"
  }
},
"openalex": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "openalex-research-mcp@0.4.1"],
  "env": {
    "OPENALEX_EMAIL": "${OPENALEX_EMAIL}"
  }
}
```

Add to `Z:/claude-sota-installed/CLAUDE.local.md` env block (Section `# Environment` after the tavily/exa stanzas added W324):

```powershell
# W327-S14 — OpenAlex polite-pool email (operator-side; gitignored)
# Populate with your contact email — joins polite-pool for higher rate-limits.
# $env:OPENALEX_EMAIL = 'youremail@example.com'
```

Add explanatory `_comments_addendum` entry to `.mcp.json` per existing W317/W324 pattern.

### Smoke-tests (after wire-up + CC restart)

```bash
# Verify uvx fetches PyPI 0.5.0 (one-time cold start)
uvx --from arxiv-mcp-server==0.5.0 arxiv-mcp-server --help

# Verify npx resolves npm 0.4.1
npx -y openalex-research-mcp@0.4.1 --version 2>&1 | head -5

# Inside CC: call MCP tools
# - mcp__arxiv__search_papers query="agentic RAG" max_results=3
# - mcp__openalex__search_works query="agentic RAG" per_page=3
```

Expected `initialize` MCP handshake returns serverInfo for each.

---

## §6 D-EMP Soak Plan

Per sca-v12 D-EMP (Empirical Cost) HARD GATE staged validation:

### Sandbox (T0+0 — 5 min)
- Verify uvx + npx cold-start latencies (target: ≤8s arxiv first-spawn after pkg resolve; ≤4s openalex)
- Verify `initialize` handshake returns 4 tools (arxiv) + 18 tools (openalex)
- Verify ARXIV_STORAGE_PATH writes to state-outside-repo (NOT into worktree)

### 1-cycle (T0+1d — 1 wave)
- Use both MCPs in a small literature-review task; verify rate-limits not hit, response shape matches schema.
- Confirm openalex polite-pool active (response header `X-API-Pool: polite` or similar).

### Multi-day (T0+3d — 2-3 waves)
- Run alongside existing 14-MCP fleet (deepwiki + chrome-devtools + repomix + serena + gitnexus + ccusage + cognee + langfuse + basic-memory + hf-mcp-server + perplexity + playwright + tavily + exa). Watch for token-bloat (D-EMP D3); arxiv adds 4 tools, openalex adds 18 — total fleet tool surface +22.
- Watch for MCP-handshake conflicts (none expected — both stdio + isolated namespaces).
- Validate `--storage-path` doesn't grow unbounded (set a 5 GB soft-cap; auto-purge >90d papers if needed).

### Multi-wave (T0+5+ waves — soak threshold)
- D-EMP composite-cost score; if disk-growth + token-bloat + cold-start exceed 0.15 composite cost, downgrade to TIER-3 reserve (lazy-load via /plugin disable until needed).

---

## §7 Rollback Plan

**Reversibility**: HIGH (both are pure MCP additions, no settings.json hook impact, no NSSM service, no Python venv mutation outside uv tool cache).

### Quick rollback (< 30s)
1. Delete `arxiv` + `openalex` stanzas from `.mcp.json` `mcpServers`.
2. Restart CC (`/restart` or new session).
3. Optional housekeeping:
   - `uv tool uninstall arxiv-mcp-server` (releases ~50 MB Python deps cache)
   - `npm uninstall -g openalex-research-mcp` (rare — `npx -y @version` doesn't pin globally; safe to skip)
   - Delete `Z:/claude-sota-installed-state/arxiv-papers/` (releases cached PDFs; preserve if soak migration to re-install)
4. Remove `_comments_addendum` block + `OPENALEX_EMAIL` env var.

### Partial rollback (keep one, drop the other)
- Drop `arxiv` only: delete stanza + run `uv tool uninstall arxiv-mcp-server`. OpenAlex remains live.
- Drop `openalex` only: delete stanza. ArXiv remains live.

### Soft-disable (preserve config, hide from CC)
- Move entry to a `disabledMcpjsonServers` block (Anthropic-canonical per W295-AUDIT §3 precedent). CC ignores entries listed there. Re-enable by moving back to `mcpServers` + restart.

---

**End of W327-S14 verdict file. Next action: operator review → wire-up commit → codex Stop-hook ratification.**
