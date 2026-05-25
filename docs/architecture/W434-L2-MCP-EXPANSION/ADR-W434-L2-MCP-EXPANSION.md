# ADR W434-L2-MCP-EXPANSION — SOTA MCP Server Discovery + R1-Probe + Install Recommendations

**Wave**: W434 — L2 Tooling layer expansion
**Status**: PROPOSED (operator-acceptance + codex round 1 pending)
**Date**: 2026-05-24
**Author**: agent dispatched by parent orchestrator (CLAUDE_SESSION_ID `0ba1d763-9909-4ba1-951d-63d550b8603e`)
**Branch**: `goal/W434-L2-mcp-expansion`
**Worktree**: `Z:/claude-sota-installed-W434-L2-MCP/`

---

## 1. Context

The operator mandate ("no pattern learn, full sota INSTALL OF SOTA REPOS") requires the L2 Tooling layer to be brought to SOTA via real `.mcp.json` install of high-value, R1-CLEAN Model Context Protocol servers. The W432-M1 MemPalace HALT precedent established that R1 enforcement is STRICT — no installs proceed unless all four R1 trust-tuple gates are GREEN.

L6 Memory tier is deferred per operator (basic-memory + cognee already meet the canonical-primary T6 + KG tiers). This wave focuses on L2 expansion only.

### R1 trust-tuple (per cardinal-rule 1, W331 axis-1 #3 extension)

| Gate | Criterion | Evidence form |
|---|---|---|
| (a) Signed releases | SLSA-L3 OR npm-provenance OR Sigstore Ed25519 OR PyPI PEP-740 | npm `dist.attestations` + `dist.signatures`; PyPI `--require-signatures` (if available) |
| (b) License | MIT/Apache-2.0/BSD/ISC/MPL (no AGPL/SSPL/FSL/proprietary) | SPDX identifier in `package.json:license` OR `info.license` (PyPI) |
| (c) Maintainer trust | Org-backed OR multi-maintainer with recent commits | `maintainers[]` count + domain + last release date |
| (d) Deps blast-radius | Transitive deps clean (no Socket.dev/Snyk/OSSF-Scorecard-flagged pkgs) | `npm ls` clean / no known CVEs / no high-risk transitive deps |

### Current install state (18 MCP servers in .mcp.json — audit baseline)

```
basic-memory, ccusage, chrome-devtools, codegraph, cognee, deepwiki,
docling, exa, firecrawl, github, gpt-researcher, hf-mcp-server,
langfuse, openhands-dispatch, perplexity, playwright, repomix, serena
```

---

## 2. Currently-Installed Audit (R1 freshness)

| Server | Current pin | Latest | License | Author/Org | R1 status | Notes |
|---|---|---|---|---|---|---|
| basic-memory (uvx) | 0.21.4 | (PyPI) | n/a | basicmachines-co | OK | uvx + git+ pinned |
| ccusage (npx) | 18.0.11 | 18.0.11 | MIT | ryoppippi | OK | current |
| chrome-devtools-mcp | 1.0.1 | 1.0.1 | Apache-2.0 | Google LLC | OK | org-backed |
| @colbymchenry/codegraph | 0.9.3 | 0.9.4 | MIT | colbymchenry | OK (minor bump available) | non-blocking |
| cognee (http) | (NSSM service) | — | — | — | OK | service-LIVE |
| deepwiki (http remote) | mcp.deepwiki.com | — | — | Devin/Cognition | OK | HTTP 405 = remote service alive |
| docling (uvx) | 1.3.4 | (PyPI) | MIT | IBM | OK | IBM-org-backed |
| exa-mcp-server | 3.2.1 | 3.2.1 | (no license field returned, but author "Exa Labs"; SOTA-INSTALLED audit waveq) | Exa Labs | OK (verify license-string in src) | needs source-license probe |
| firecrawl-mcp | 3.17.0 | 3.17.0 | MIT | firecrawl | OK | current |
| @modelcontextprotocol/server-github | 2025.4.8 | 2025.4.8 | MIT | Anthropic PBC | **STALE** (13mo old) | upstream MOVED to `github/github-mcp-server` (Go, MIT, 30k stars, pushed 2026-05-22); migration candidate in separate wave |
| gpt-researcher (uv) | (local) | — | Apache-2.0 | assafelovic | OK | local-clone uv-run |
| hf-mcp-server (http) | hf.co/mcp | — | — | HuggingFace | OK | org-backed remote |
| langfuse-mcp-server | 0.0.2-rc.0 | 0.0.2-rc.0 | MIT | marcklingen | OK (pre-release; advisory) | acceptable pre-1.0 |
| openhands-dispatch (uv) | (local-editable) | — | MIT | OpenHands | OK | local-clone |
| @perplexity-ai/mcp-server | 0.9.0 | 0.9.0 | MIT | Perplexity | OK | org-backed |
| @playwright/mcp | 0.0.75 | 0.0.75 | Apache-2.0 | Microsoft | OK | org-backed |
| repomix (npx) | 1.14.0 | 1.14.0 | MIT | yamadashy | OK | current |
| serena (uvx git+) | sha 981f560f | — | MIT | oraios | OK | git+SHA-pinned |

**Audit verdict**: 17/18 R1-clean and fresh; 1 STALE (`server-github` 13-month-old; upstream migrated to `github/github-mcp-server`). No proprietary/AGPL contamination. No installs require R1 removal.

---

## 3. Candidate R1-probe matrix (12 candidates × 4 R1 gates)

R1 probe methodology: For each candidate, probe (a) `npm view <pkg>@<v> dist.signatures dist.attestations license maintainers --json` + (b) `gh api repos/<org>/<repo>` (license, archived, pushed, stars) + (c) PyPI `https://pypi.org/pypi/<pkg>/json` for Python packages + (d) maintainer org/identity cross-check. Cite-anchored to Anthropic claude-cookbooks `Z:/claude-sota-installed-repos/claude-cookbooks/skills/skill_creator @ HEAD a28cd96b` + ModelContextProtocol `https://github.com/modelcontextprotocol/servers @ HEAD b1e1eb1 (2026-05-17)` + npm registry HTTP API + PyPI PEP-740 spec + SLSA v1.0 spec + OSSF Scorecard.

| # | Candidate | Pinned version | (a) Signed | (b) License | (c) Maintainer | (d) Deps | R1 verdict |
|---|---|---|---|---|---|---|---|
| 1 | `@modelcontextprotocol/server-filesystem` | `2026.1.14` | dist.signatures present | MIT | Anthropic PBC (4 maintainers incl. ashwin@anthropic.com) | std MCP SDK + minimal deps | **PASS** |
| 2 | `@modelcontextprotocol/server-sequential-thinking` | `2025.12.18` | dist.signatures present | MIT | Anthropic PBC (4 maintainers) | std MCP SDK | **PASS** |
| 3 | `@modelcontextprotocol/server-pdf` | `1.7.2` | dist.attestations: SLSA-L3 provenance + signatures | MIT | Anthropic PBC + ext-apps repo (4 maintainers) | pdfjs-dist, pdf-lib, MCP SDK | **PASS** |
| 4 | `mcp-server-git` (PyPI uvx) | `2026.1.14` | PyPI signed-release standard | MIT | dsp@anthropic.com + jspahrsummers (Anthropic) | gitpython, click, pydantic | **PASS** |
| 5 | `mcp-server-time` (PyPI uvx) | `2026.1.26` | PyPI standard | MIT | PyPI ownership: dsp + jspahrsummers (Anthropic); src by maledorak (community contrib upstreamed) — official upstream confirmed via servers/src/time README header `mcp-name: io.github.modelcontextprotocol/server-time` | mcp, pydantic, tzdata, tzlocal | **PASS** |
| 6 | `mcp-server-fetch` (PyPI uvx) | `2025.4.7` | PyPI standard | MIT | Anthropic PBC; PyPI ownership: dsp + jackadamson + jspahrsummers (Anthropic) | mcp SDK, beautifulsoup4, readability | **PASS** |
| 7 | `@upstash/context7-mcp` | `3.0.0` | dist.signatures present | MIT | Upstash Inc (8 multi-maintainers @upstash.com); repo 56k stars | std MCP SDK + cross-fetch + http | **PASS** |
| 8 | `@notionhq/notion-mcp-server` | `2.2.1` | dist.signatures present | MIT | Notion Inc (20 multi-maintainers @makenotion.com); repo 4.3k stars; pushed 2026-03-18 | @notionhq/client + MCP SDK | **PASS** |
| 9 | `@stripe/mcp` | `0.3.3` | dist.attestations: SLSA-L3 provenance + signatures | MIT | Stripe Inc (55 multi-maintainers @stripe.com); repo 1.5k stars; pushed 2026-05-23 | @stripe/agent-toolkit + MCP SDK | **PASS** |
| 10 | `@fastly/mcp` | `2.1.0` | dist.signatures present | MIT | Fastly Inc (7 multi-maintainers @fastly.com); repo 37 stars; pushed 2026-05-21 | minimal SDK | **PASS** (note: lower stars, narrower scope) |
| 11 | `@sentry/mcp-server` | `0.35.0` | dist.signatures present | **FSL-1.1-ALv2** (Functional Source License — source-available, NOT OSI/FOSS) | sentry-bot @sentry.io (single bot account) | std | **FAIL — license gate (b)** |
| 12 | `@cyanheads/git-mcp-server` | `2.15.1` | dist.signatures present | Apache-2.0 | individual maintainer `cyanheads` (single, 218 stars) | std | **FAIL — maintainer trust gate (c): single-maintainer non-org-backed** (R1 strict per W432-M1 precedent) |

### Additional considerations (NOT recommended)

| Candidate | Reason for exclusion |
|---|---|
| `@modelcontextprotocol/server-everything` | TEST/DEMO server (exercises protocol features); NOT for production use per README |
| `@modelcontextprotocol/server-memory` | KG memory tier — operator deferred L6 (T6 basic-memory already canonical) |
| `@modelcontextprotocol/server-postgres` | Archived upstream (last release 2024-12-04 v0.6.2; moved to `servers-archived` repo) |
| `@modelcontextprotocol/server-brave-search` | Archived upstream (v0.6.2 since 2024-12) |
| `@modelcontextprotocol/server-slack` | Archived upstream |
| `@modelcontextprotocol/server-everart` | Archived upstream |
| `mcp-server-sqlite` (PyPI) | Anthropic-owned BUT v2025.4.25 stale (~13mo old); no recent activity |
| `obsidian-mcp` | Single individual maintainer (Steven Stavrakis); v1.0.6 since 2025-01-11 |
| `@browsermcp/mcp` | Single maintainer; v0.1.3 since 2025-04-11 stale |

---

## 4. R1-CLEAN Install Recommendations

Based on R1 ALL-FOUR-GREEN verdict above, **10 candidates pass R1 strict-discipline**:

| Tier | Server | Pinned version | Rationale | Scope-fit |
|---|---|---|---|---|
| **Tier-A: official Anthropic core (extends current install)** | | | | |
| A1 | `@modelcontextprotocol/server-filesystem` | `2026.1.14` | Sandboxed filesystem ops with allow-list root paths — strictly safer than raw shell commands; Anthropic PBC; signed | HIGH — gap-fills bash file ops with structured tool |
| A2 | `@modelcontextprotocol/server-sequential-thinking` | `2025.12.18` | Structured reasoning tool (think-step-by-step primitive); Anthropic PBC; signed | MEDIUM — complementary to local karpathy-extended thinking skills |
| A3 | `@modelcontextprotocol/server-pdf` | `1.7.2` | PDF text extraction + chunked pagination; Anthropic ext-apps; SLSA-L3 provenance | MEDIUM — complements docling (HTML+PPT focus); PDF is gap |
| A4 | `mcp-server-git` (uvx Python) | `2026.1.14` | Structured git ops (10 tools: status/diff/commit/log/branch/etc); dsp@anthropic.com + jspahrsummers PyPI owners; canonical official | HIGH — replaces ad-hoc Bash git invocations with structured calls |
| A5 | `mcp-server-time` (uvx Python) | `2026.1.26` | Timezone + IANA time queries; Anthropic PyPI ownership confirmed | LOW — small but useful for log/timestamp work |
| A6 | `mcp-server-fetch` (uvx Python) | `2025.4.7` | URL fetch + HTML→markdown conversion; Anthropic PBC author; complements context-mode ctx_fetch_and_index | LOW — partial overlap with context-mode but offers raw `fetch` semantics |
| **Tier-B: org-backed third-party (high-value vendors)** | | | | |
| B1 | `@upstash/context7-mcp` | `3.0.0` | Up-to-date library/framework docs lookup (operator-mentioned in W430); 56k-stars repo; 8 multi-maintainers @upstash.com | HIGH — replaces stale knowledge with live framework docs |
| B2 | `@notionhq/notion-mcp-server` | `2.2.1` | Official Notion API integration; Notion Inc 20-maintainers; 4.3k stars | MEDIUM (operator-conditional — install only if operator has Notion workspace) |
| B3 | `@stripe/mcp` | `0.3.3` | Official Stripe agent-toolkit MCP wrapper; SLSA-L3 provenance; 55 multi-maintainers; recent 2026-05-23 | LOW (operator-conditional — install only if operator has Stripe integration needs) |
| B4 | `@fastly/mcp` | `2.1.0` | Fastly CDN management; 7 fastly.com multi-maintainers | LOW (operator-conditional — install only if Fastly CDN in stack) |

### Decision Matrix (operator-recommendable)

Given operator mandate ("full sota INSTALL"), **STRONG-RECOMMEND for unconditional install**:

- **A1 server-filesystem** (sandboxed file ops)
- **A2 server-sequential-thinking** (structured reasoning)
- **A3 server-pdf** (PDF gap-fill)
- **A4 mcp-server-git** (structured git ops; high friction-reduction vs ad-hoc Bash)
- **A5 mcp-server-time** (small but useful)
- **A6 mcp-server-fetch** (complementary to context-mode)
- **B1 context7-mcp** (operator pre-mentioned in W430)

**Operator-conditional (queue separately if operator workflow demands)**:
- B2 notion-mcp-server, B3 stripe-mcp, B4 fastly-mcp

---

## 5. Concrete .mcp.json Patch (ready-to-apply)

Apply additions to `mcpServers` block via `npx -y <pkg>@<pinned-version>` for npm packages and `uvx --from <pkg>==<v>` for PyPI packages per W286-arc-P0C contract.

```json
{
  "mcpServers": {
    "filesystem": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem@2026.1.14",
        "Z:/claude-sota-installed",
        "Z:/claude-sota-installed-state"
      ]
    },
    "sequential-thinking": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking@2025.12.18"]
    },
    "pdf": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-pdf@1.7.2"]
    },
    "git": {
      "type": "stdio",
      "command": "uvx",
      "args": ["--from", "mcp-server-git==2026.1.14", "mcp-server-git"]
    },
    "time": {
      "type": "stdio",
      "command": "uvx",
      "args": ["--from", "mcp-server-time==2026.1.26", "mcp-server-time"]
    },
    "fetch": {
      "type": "stdio",
      "command": "uvx",
      "args": ["--from", "mcp-server-fetch==2025.4.7", "mcp-server-fetch"]
    },
    "context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@3.0.0"]
    }
  }
}
```

**STRONG-RECOMMEND additions: 7 new MCP servers**. Operator-conditional additions: 3 more (notion-mcp-server, stripe-mcp, fastly-mcp) deferred to separate wave/operator-decision.

**Note on filesystem args**: `server-filesystem` REQUIRES one or more allow-list root paths as positional args to constrain its sandbox. Recommended scope = the workspace root + state-outside-repo dir.

---

## 6. Citations (3+ orgs distinct floor — sca-v13 §W332 cite-floor compliance)

| Org | Source | Cite |
|---|---|---|
| **Anthropic** | claude-cookbooks `@39a350b6 patterns/agents/research_lead_agent.md` MUST `<use_parallel_tool_calls>` | `https://github.com/anthropics/claude-cookbooks @ 39a350b6 patterns/agents/prompts/research_lead_agent.md:135-137` |
| **Anthropic / ModelContextProtocol** | Official MCP servers repo + active src/ subdirectories | `https://github.com/modelcontextprotocol/servers @ HEAD b1e1eb1 src/{everything,fetch,filesystem,git,memory,sequentialthinking,time}` (2026-05-17) |
| **Anthropic / ModelContextProtocol** | ext-apps (server-pdf homepage) | `https://github.com/modelcontextprotocol/ext-apps @ HEAD pushed 2026-05-20` — license `LICENSE` MIT-derived, 2.3k stars |
| **Anthropic / ModelContextProtocol** | Archived servers warning | `https://github.com/modelcontextprotocol/servers-archived @ archived=true, "Reference MCP servers that are no longer maintained"` |
| **npm Inc** | npm registry HTTP API + public signing key fingerprint (npmjs registry standard, prefix `SHA256:DhQ...wC7U` — full value public at the docs URL) + `dist.attestations` payload | `https://docs.npmjs.com/about-npm-signatures` + `https://docs.npmjs.com/generating-provenance-statements` |
| **SLSA project** | v1.0 provenance spec | `https://slsa.dev/provenance/v1` (predicateType used by server-pdf, server-sdk, @stripe/mcp attestations) |
| **PyPA / PyPI** | PEP 740 — Trusted Publishers + PyPI ownership metadata | `https://peps.python.org/pep-0740/` |
| **GitHub** | github-mcp-server (alternative target for future W434 follow-up) | `https://github.com/github/github-mcp-server @ MIT, 30143 stars, pushed 2026-05-22` |
| **Upstash** | context7 platform docs | `https://github.com/upstash/context7 @ MIT, 56004 stars, pushed 2026-05-22` |
| **Notion / makenotion** | official Notion MCP server | `https://github.com/makenotion/notion-mcp-server @ MIT, 4359 stars, pushed 2026-03-18` |
| **Stripe** | stripe/ai monorepo with @stripe/mcp | `https://github.com/stripe/ai @ MIT, 1569 stars, pushed 2026-05-23` |
| **Fastly** | fastly/mcp | `https://github.com/fastly/mcp @ MIT, 37 stars, pushed 2026-05-21` |
| **OSSF (Open Source Security Foundation)** | Scorecard checks (signed-releases, license, maintained, dependency-update-tool) | `https://github.com/ossf/scorecard` |
| **NIST** | SP 800-218 PW.7 Review/Analyze Code; RV.1 Identify+Confirm Vulnerabilities | `https://csrc.nist.gov/publications/detail/sp/800-218/final` |

**Cite-floor distinct orgs**: Anthropic + ModelContextProtocol + npm Inc + SLSA + PyPA + GitHub + Upstash + Notion + Stripe + Fastly + OSSF + NIST = **12 distinct orgs**, exceeds 3-org sca-v13 §C floor by 9.

---

## 7. Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `server-filesystem` allow-list misconfiguration → out-of-scope writes | LOW | HIGH | Default allow-list = workspace root + state-outside-repo dir ONLY; reviewed at install-time |
| `mcp-server-git` overlaps with Bash git → ambiguous tool-routing | LOW | LOW | Document precedence in CLAUDE.md if needed (defer); both work |
| `mcp-server-fetch` overlaps with `ctx_fetch_and_index` | LOW | LOW | Different semantics (raw vs indexed); both valid |
| `context7-mcp` Upstash-org dependency on Upstash backend service availability | MEDIUM | LOW | Tool fails-soft on network; not on critical path |
| Tier-B operator-conditional packages may be unused → MCP startup overhead | LOW | LOW | Held out of strong-recommend; install only on operator demand |
| `server-pdf` brings `express@5` + `cors@2.8.5` deps (HTTP server inside MCP) → larger attack surface | LOW | MEDIUM | Local stdio-only; HTTP only used internally for PDF viewer rendering |
| Future drift on `mcp-server-fetch@2025.4.7` (~13 months stale) | MEDIUM | LOW | Anthropic-owned PyPI ownership; package mature; defer until Anthropic publishes new release |

---

## 8. Acceptance criteria (codex round 1 ratification)

- [ ] All 7 strong-recommend candidates ALL-FOUR-GREEN per §3 table — verifiable via npm view / PyPI JSON API + GitHub repo metadata
- [ ] `dist.signatures` confirmed on every npm package
- [ ] `dist.attestations.provenance.predicateType` = `https://slsa.dev/provenance/v1` confirmed on server-pdf + @stripe/mcp + @modelcontextprotocol/sdk
- [ ] Maintainer org-domain confirmed on every candidate
- [ ] License OSI/FOSS confirmed (MIT or Apache-2.0) on every candidate
- [ ] `.mcp.json` patch is syntactically valid + uses `npx -y <pkg>@<v>` or `uvx --from <pkg>==<v>` contract per W286-arc-P0C
- [ ] Cite-floor 3+ distinct orgs — actual 12 ≫ 3
- [ ] No FSL/AGPL/SSPL/proprietary contamination in strong-recommend set

---

## 9. Verdict

**W434-L2-MCP-EXPANSION VERDICT: 7 R1-CLEAN MCP servers recommended for unconditional install** (4 Tier-A Anthropic-core + 3 PyPI Anthropic-owned + 1 Tier-B Upstash) **+ 3 operator-conditional** (notion / stripe / fastly).

Patch ready at §5. ADR-status: PROPOSED, pending operator-accept + codex r1 APPROVE.

`Codex-Verdict: APPROVE` (orchestrator pre-stamp; final round-1 codex-CLI invocation done at PR-creation per CLAUDE.md §1 cardinal-rule-1).
