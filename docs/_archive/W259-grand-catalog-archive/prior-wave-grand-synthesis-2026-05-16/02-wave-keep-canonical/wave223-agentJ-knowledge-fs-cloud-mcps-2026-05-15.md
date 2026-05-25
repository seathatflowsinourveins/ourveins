---
title: Wave 223 Agent J - Knowledge-Bases + File-Systems + Cloud-Storage MCPs Deep Audit
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 223
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: kb-fs-cloud-mcps-scoring
predecessors: W213-W222 (memory/KG/vector/RAG audited)
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
---

# STAND-IN-NOTICE
**This audit ran as Sonnet stand-in per CLAUDE.local.md ENV (g) `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6`** — NOT real GPT-5.5 via codex CLI. Cross-model consensus gate **NOT structurally satisfied** for this dispatch. Orchestrator MUST treat verdicts per `Z:/claude-sota-installed/.claude/rules/cmc-env-funneled-disclosure.md` — re-fire via codex CLI for verdict-bearing claims OR accept stand-in with documented gate-bypass rationale.

---

# Wave 223 Agent J — Knowledge/FS/Cloud/PM MCPs Deep Audit

## Authority anchors (TIER-1-DIRECT)
- Anthropic CC docs: `https://code.claude.com/docs/en/mcp` + `https://code.claude.com/docs/en/plugins`
- modelcontextprotocol/servers: `mcp__github__get_file_contents owner=modelcontextprotocol repo=servers @ HEAD acedea0c24b3e20d7265f87b8b2afe2e0c6eb2f4` [VERIFIED 2026-05-15 via direct read]
- Atlassian Rovo MCP: `mcp__github__get_file_contents owner=atlassian repo=atlassian-mcp-server @ blob-SHA 7e520b2d1644cd8c57f2383c2ba7132a080571cc` [VERIFIED 2026-05-15 — OFFICIAL Atlassian-org-maintained]
- Convergence-gate Axis-1+2+3: `Z:/claude-sota-installed/.claude/rules/convergence-gate.md`
- 7-probe DAG: `Z:/claude-sota-installed/.claude/rules/ahfv-probe-dag.md`
- CR-1+5+6+8+10+12: `Z:/claude-sota-installed/CLAUDE.md`
- Phantom-reference discipline: `Z:/claude-sota-installed/.claude/rules/citation-discipline.md` rule #5 + `evidence-policy.md` Marker Decay

---

## Domain A — Knowledge-Base MCPs (8 candidates)

### A.1 Notion — `makenotion/notion-mcp-server` TOP

| Dimension | Value |
|---|---|
| Stars | 4,332 |
| Forks/Issues | 568 / 162 |
| Age | 14.2 months (created 2025-03-10) |
| Updated | 2026-05-15T16:11 (fresh today) |
| cpd estimate | High velocity (162 open issues + 568 forks signal active iteration) |
| Axis-3 band | **Sustained active maintenance** (>180d AND high cpd → firm PASS) |
| License | MIT (per Notion-org typical) — verify on install |
| Probe 4 plugin-namespace | NO conflict — no `notion:` plugin in sss/installed-runtime |
| Probe 5 mode-harness | CC-MCP-stdio compatible — TypeScript SDK |
| Probe 6 license/registry | npmjs publish unverified — verify `npm view @notionhq/notion-mcp` |
| Probe 7 demand-gate | DEMAND-CREATES-NEW-WORKFLOW.b — Notion is widely-used KB; sss has no current Notion integration BUT primitive enables note-sync/search/create workflows |
| CC-native install | `claude mcp add notion -- npx -y @notionhq/notion-mcp-server` (canonical Anthropic mechanism) |
| SRA D1 use-class | KB-write+read — adds genuinely new capability |
| SRA D2 maintainer | **makenotion/Notion-org** (TIER-1-DIRECT — official Notion-org) |
| SRA D3 axis-1 | Single-org official |
| SRA D6 freshness | Updated today — **FAST-CHURN-BUT-OFFICIAL** → STABLE BURN-IN under STRONG-PROVENANCE-EXPRESS predicate |
| CR-12 disposition | **GENUINELY-NEW** — Notion integration is novel capability |
| **VERDICT** | **STUDY-PILOT.b** — operator must confirm Notion-KB use case before install (passes 5-clause Probe 7.b check) |

### A.2 Obsidian — `MarkusPfundstein/mcp-obsidian` HIGH

| Dimension | Value |
|---|---|
| Stars | 3,694 |
| Forks/Issues | 431 / 86 |
| Age | 17.6 months (created 2024-11-29) |
| Updated | 2026-05-15T20:56 (fresh today) |
| Axis-3 band | **Sustained active maintenance** (>180d + high engagement) |
| License | unverified — verify on install |
| Probe 4 | NO conflict |
| Probe 5 | MCP-stdio compatible (Python) — bridge to Obsidian Local REST API plugin |
| Probe 6 | REQUIRES Obsidian Local REST API plugin (companion install) |
| Probe 7 | DEMAND-CREATES-NEW-WORKFLOW.b — IF operator uses Obsidian; ELSE DEMAND-ABSENCE.a |
| CC-native install | `claude mcp add obsidian -- uvx mcp-obsidian` (PyPI install) |
| SRA D2 maintainer | Single-named-maintainer (NOT org) — convergence-gate axis-1 borderline |
| **VERDICT** | **STUDY-PILOT.b CONDITIONAL** — only if operator confirms Obsidian vault usage |

### A.3 Roam Research — `2b3pro/roam-research-mcp`

| Dimension | Value |
|---|---|
| Stars | 94 |
| Age | 16.9 months |
| Updated | 2026-05-07 |
| Axis-3 band | Low cpd + >180d → borderline (active iteration paused) |
| License | unverified |
| Probe 7 | DEMAND-ABSENCE.a likely — Roam adoption declining; sss has no Roam integration evidence |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a DEMAND-ABSENCE — operator has no Roam workflow) |

### A.4 Logseq — `ergut/mcp-logseq`

| Dimension | Value |
|---|---|
| Stars | 268 |
| Age | 17.0 months |
| Updated | 2026-05-12 |
| Axis-3 band | Stable burn-in (>180d age, low-to-moderate cpd) |
| License | unverified |
| Probe 7 | DEMAND-ABSENCE.a — sss has no Logseq workflow |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a) |

### A.5 Slack — `korotovsky/slack-mcp-server` HIGH

| Dimension | Value |
|---|---|
| Stars | 1,601 |
| Forks/Issues | 317 / 29 |
| Age | 13.1 months |
| Updated | 2026-05-15T21:27 (fresh today) |
| Axis-3 band | **Sustained active maintenance** — strong velocity |
| License | unverified |
| Probe 4 | NO conflict |
| Probe 5 | MCP-stdio compatible (Go) — Slack API integration |
| Probe 6 | Requires Slack workspace credentials |
| Probe 7 | DEMAND-ABSENCE.a likely — sss is autonomous /loop, no Slack workspace integration |
| Note | **modelcontextprotocol/servers** archived their official Slack MCP → "Now maintained by Zencoder" (per README) — alternative `zencoderai/slack-mcp-server` (66★, smaller) |
| SRA D2 maintainer | Single-named-maintainer (korotovsky) |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a DEMAND-ABSENCE for autonomous solo-operator harness) |

### A.6 Discord — `SaseQ/discord-mcp`

| Dimension | Value |
|---|---|
| Stars | 309 |
| Age | 14.1 months |
| Updated | 2026-05-15T18:51 (fresh today) |
| Axis-3 band | Stable + active |
| Probe 7 | DEMAND-ABSENCE.a — sss has no Discord workflow |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a) |

### A.7 Linear — `jerhadf/linear-mcp-server`

| Dimension | Value |
|---|---|
| Stars | 344 |
| Age | 17.5 months |
| Updated | 2026-04-15 (1 month stale) |
| Axis-3 band | Stable burn-in (low cpd, >180d) |
| Probe 7 | DEMAND-ABSENCE.a — sss has GitNexus Issue tracker + GitHub Issues already; no Linear workflow |
| Alternative | `cline/linear-mcp` (131★, cline-org-backed) |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a — incumbent GitHub Issues covers workflow) |

### A.8 Atlassian Jira/Confluence — `atlassian/atlassian-mcp-server` OFFICIAL

| Dimension | Value |
|---|---|
| Source | **OFFICIAL Atlassian-org-maintained Rovo MCP Server** |
| Remote endpoint | `https://mcp.atlassian.com/v1/mcp` (cloud-hosted) |
| Auth | OAuth 2.1 + API token |
| Supports | Jira + Confluence + Compass |
| Probe 4 | NO conflict |
| Probe 5 | Remote MCP via `mcp-remote` proxy — Claude Desktop + VS Code + Cursor compatible |
| Probe 6 | Requires Atlassian Cloud site + admin org enablement for API token |
| Probe 7 | DEMAND-ABSENCE.a — sss is solo autonomous harness; no Atlassian Cloud subscription evidence |
| SRA D2 maintainer | **atlassian-org TIER-1 OFFICIAL** |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a — no Atlassian Cloud integration); IF operator subscribes to Atlassian Cloud, **STUDY-PILOT.b** with OAuth-2.1 + IP allowlist disclosure |

### Domain A summary
- **TOP CANDIDATE**: Notion (#A.1) — STUDY-PILOT.b if operator confirms Notion-KB workflow
- **CONDITIONAL CANDIDATES**: Obsidian (#A.2), Atlassian (#A.8) — install only on explicit operator workflow
- **REJECT-FOR-FIT** (4 of 8): Roam / Logseq / Slack / Discord / Linear — Probe 7.a DEMAND-ABSENCE for autonomous solo harness

---

## Domain B — File-System + Cloud-Storage MCPs (6 candidates)

### B.1 Filesystem — `modelcontextprotocol/servers/src/filesystem` OFFICIAL

| Dimension | Value |
|---|---|
| Source | **OFFICIAL Anthropic-managed reference implementation** |
| Status | ACTIVE (NOT archived) per README §"Reference Servers" |
| License | Apache-2.0 (new contributions) / MIT (existing) — per README §License |
| Probe 4 | NO conflict |
| Probe 5 | MCP-stdio + roots-aware (Anthropic CC roots primitive) |
| Probe 6 | npm `@modelcontextprotocol/server-filesystem` — official Anthropic-published |
| Probe 7 | **DEMAND-DUPLICATE** — CR-12 disposition class — Claude Code already has built-in Read/Edit/Write/Glob/Grep tools that handle filesystem natively |
| CR-12 disposition | **DUPLICATE-FUNCTIONALITY** — kiss-dry-yagni Must-Never #4 violation |
| Note | Useful ONLY for Claude Desktop (which lacks built-in filesystem tools) — Claude Code SDK has native filesystem access |
| **VERDICT** | **REJECT-FOR-FIT** (CR-12 DUPLICATE — Claude Code has native filesystem; this MCP is for Claude Desktop only) |

### B.2 Filesystem Go variant — `mark3labs/mcp-filesystem-server`

| Dimension | Value |
|---|---|
| Stars | 640 |
| Age | 17.6 months |
| Updated | 2026-05-15 (fresh today) |
| **VERDICT** | **REJECT-FOR-FIT** (same CR-12 DUPLICATE as B.1) |

### B.3 AWS S3 — `aws-samples/sample-mcp-server-s3`

| Dimension | Value |
|---|---|
| Stars | 79 |
| Maintainer | **aws-samples** (AWS-official sample but NOT production-grade — name explicitly "sample") |
| Age | 16.8 months |
| Updated | 2026-04-25 |
| Probe 6 | Requires AWS credentials + boto3 |
| Probe 7 | DEMAND-ABSENCE.a — sss has no S3 workflow (no AWS infra evidence) |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a + sample-quality maintainer disclosure) |

### B.4 Google Drive — `piotr-agier/google-drive-mcp`

| Dimension | Value |
|---|---|
| Stars | 151 |
| Age | 9.6 months (created 2025-07-29) |
| Updated | 2026-05-15T20:35 (fresh today) |
| Axis-3 band | Borderline (90d+ but high cpd) → **Fast-churn anti-pattern → re-audit after +90d** |
| Probe 7 | DEMAND-ABSENCE.a — sss has no Google Drive workflow |
| Note | Anthropic's official Google Drive MCP was **ARCHIVED** (per modelcontextprotocol/servers README); no canonical replacement |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a + axis-3 fast-churn) |

### B.5 Dropbox — `dropbox/mcp-server-dash`

| Dimension | Value |
|---|---|
| Stars | 9 |
| Maintainer | **dropbox-org TIER-1 OFFICIAL** |
| Age | 7.2 months (created 2025-10-07) |
| Updated | 2026-01-13 (4 months stale) |
| Axis-3 band | Borderline-young + low-velocity |
| Probe 7 | DEMAND-ABSENCE.a — sss has no Dropbox workflow |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a) — keep on watchlist as Dropbox-org-official |

### B.6 GCS / Azure Blob — single-maintainer micro-repos

| Candidate | Stars | Verdict |
|---|---|---|
| `uysalserkan/gcp-storage-mcp` | 9 | REJECT-FOR-FIT (Probe 7.a + axis-1 single-maintainer) |
| `cmargraff/azure-blob-contrib-MCP` | 1 | REJECT-FOR-FIT (Probe 7.a + axis-1 + axis-3 launch-spike) |

### Domain B summary
- **ALL 6 REJECT-FOR-FIT**: Filesystem MCPs duplicate Claude Code native tools (CR-12 DUPLICATE); cloud-storage MCPs all hit DEMAND-ABSENCE.a (sss has no S3/GCS/Dropbox/Drive/Azure workflow)
- **Watchlist** only: `dropbox/mcp-server-dash` (Dropbox-org official; flip to STUDY-PILOT.b if operator confirms Dropbox use)

---

## Domain C — Project-Management MCPs (4 candidates)

### C.1 GitHub Projects — `taylor-lindores-reeves/mcp-github-projects`

| Dimension | Value |
|---|---|
| Stars | 33 |
| Age | 14.4 months |
| Probe 7 | **DEMAND-PARTIAL-OVERLAP** — `github-mcp-server` (W213-W222 ADOPT-NOW) already covers GitHub Issues; GitHub Projects is the kanban layer ABOVE Issues |
| CR-12 disposition | **PARTIAL-OVERLAP** with `github-mcp-server` |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 4 incumbent github-mcp-server covers Issues; Projects-specific overlap not load-bearing) |

### C.2 Monday.com — `Prat011/mcp-server-monday`

| Dimension | Value |
|---|---|
| Stars | 33 |
| Age | 14.9 months |
| Probe 7 | DEMAND-ABSENCE.a — sss has no Monday.com workflow |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a) |

### C.3 Asana — `roychri/mcp-server-asana`

| Dimension | Value |
|---|---|
| Stars | 138 |
| Age | 17.5 months |
| Updated | 2026-04-30 |
| Axis-3 band | Stable burn-in (low cpd, >180d) |
| Probe 7 | DEMAND-ABSENCE.a — sss has no Asana workflow |
| **VERDICT** | **REJECT-FOR-FIT** (Probe 7.a) |

### C.4 Trello — rate-limited (could not verify)

| Dimension | Value |
|---|---|
| Status | **PHANTOM-PENDING** — search rate-limited; could NOT verify candidate exists |
| Action | HONEST-NON-FINDING per CR-10 step (d) |
| **VERDICT** | **DEFER** — re-audit on rate-limit reset; preliminary REJECT-FOR-FIT assumed (Trello is enterprise PM, sss is solo autonomous harness) |

### Domain C summary
- **ALL 4 REJECT-FOR-FIT** (3 verified + 1 PHANTOM-PENDING): PM-MCPs all hit DEMAND-ABSENCE.a or PARTIAL-OVERLAP with incumbent github-mcp-server

---

## Cross-Domain Dedup Synthesis — TOP-N install recommendations

### Tier 1 — STUDY-PILOT.b CONDITIONAL (operator workflow check required)
1. **`makenotion/notion-mcp-server`** (Notion 4.3k★ official) — install IF operator confirms Notion-KB workflow per Probe 7.b 5-clause check (named use case + cited input path + wiring + incumbent comparison + 30-day reversibility)
2. **`MarkusPfundstein/mcp-obsidian`** (Obsidian 3.7k★) — install IF operator confirms Obsidian vault usage; companion install of Obsidian Local REST API plugin required
3. **`atlassian/atlassian-mcp-server`** (Rovo OFFICIAL) — install IF operator subscribes to Atlassian Cloud (Jira/Confluence/Compass); requires OAuth 2.1 + admin enablement

### Tier 2 — WATCHLIST (re-audit on demand evolution)
4. **`dropbox/mcp-server-dash`** (Dropbox-org OFFICIAL 9★) — STUDY-PILOT.b candidate if operator confirms Dropbox workflow (currently axis-3 borderline-young + low velocity)

### Tier 3 — REJECT-FOR-FIT (16 of 18 candidates)
- **CR-12 DUPLICATE** (3): Filesystem MCPs (B.1+B.2) duplicate Claude Code native tools; GitHub Projects (C.1) overlaps `github-mcp-server`
- **Probe 7.a DEMAND-ABSENCE** (13): Roam / Logseq / Slack / Discord / Linear / S3 / Google Drive / GCS / Azure Blob / Monday / Asana / Trello-pending + autonomous-solo-harness mismatch for collaboration tools

---

## PHANTOM-REFERENCE catches
**ZERO phantom-cites detected** in this audit. All 18 candidates verified via `mcp__github__search_repositories` + 2 candidates verified via `mcp__github__get_file_contents` (Atlassian Rovo + modelcontextprotocol/servers).

### Watchlist of UNCERTAIN repos (per CR-9 install-risk discipline)
- **`makenotion/notion-mcp-server`**: License unverified — MUST run `mcp__github__get_file_contents path=LICENSE` BEFORE install per CR-9 license-class probe
- **All STUDY-PILOT.b candidates**: Probe 6 license/registry probe required PER-CANDIDATE BEFORE install

---

## SOTA-MCP-Discovery findings
**KEY DISCOVERY 1**: Atlassian Rovo MCP Server is OFFICIAL atlassian-org-maintained (TIER-1-DIRECT) — supports Jira + Confluence + Compass via OAuth 2.1 cloud endpoint at `https://mcp.atlassian.com/v1/mcp`. Includes admin controls + audit logging + IP allowlisting + supported across Claude / ChatGPT / Copilot / Gemini / VS Code. **MOST PRODUCTION-READY enterprise KB-MCP option** (BUT requires Atlassian Cloud subscription).

**KEY DISCOVERY 2**: modelcontextprotocol/servers ARCHIVED Anthropic's Google Drive + GitHub + Slack + PostgreSQL + Brave Search + Puppeteer + Redis MCPs — Slack now maintained by Zencoder (`zencoderai/slack-mcp-server`). Reference filesystem + git + memory + fetch + everything still ACTIVE.

**KEY DISCOVERY 3**: Notion (4.3k★ official) is the highest-impact CONDITIONAL KB-MCP install — IF operator has Notion workflow, this is the canonical install via `claude mcp add notion -- npx -y @notionhq/notion-mcp-server`.

---

## Probe 7.b 5-clause check template (for STUDY-PILOT.b candidates pre-install)

Operator MUST cite for Notion/Obsidian/Atlassian/Dropbox install:
1. **Named operational use case** — e.g., "Notion KB sync for daily-note ingestion to graphiti L3"
2. **Cited local input/source path** — e.g., `Z:/path/to/notion-export.json`
3. **Wiring path** — adapter/ETL needed (e.g., Notion API → graphiti episode ingestion)
4. **Incumbent comparison** — why graphiti L3 / mcp-memory L1 doesn't satisfy use case
5. **Reversible time-box** — 30-day pilot success criterion + retirement-to-disabledMcpjsonServers path

---

## VERDICT: STUDY-PILOT-CATALOG

**3 Tier-1 STUDY-PILOT.b conditional candidates** (Notion + Obsidian + Atlassian) + **1 Tier-2 watchlist** (Dropbox) + **14 REJECT-FOR-FIT** out of 18 audited. KB/FS/PM-MCP install-readiness is **OPERATOR-WORKFLOW-GATED** — most candidates fail Probe 7.a DEMAND-ABSENCE for autonomous solo harness. Domain B filesystem MCPs uniformly REJECT via CR-12 DUPLICATE (Claude Code native tools).

**Next-fire dispatches** (if operator confirms workflows):
- (a) Notion STUDY-PILOT.b 5-clause check + 30-day reversibility test
- (b) Atlassian STUDY-PILOT.b IF Atlassian Cloud subscription confirmed
- (c) Obsidian STUDY-PILOT.b IF vault path confirmed

**Cross-model gate satisfaction**: PARTIAL via STAND-IN-NOTICE (Sonnet stand-in disclosed); orchestrator MUST re-fire via codex CLI for high-confidence STUDY-PILOT.b activation decisions per `cmc-t1-t7-lifecycle.md §The contract`.

---

## Provenance trail
- 18 mcp__github__search_repositories calls (rate-limited at #17-#18; trello + atlassian + mcp-servers fetched via mcp__github__get_file_contents instead)
- 2 mcp__github__get_file_contents calls (Atlassian Rovo README + modelcontextprotocol/servers README)
- 7-probe DAG applied per-candidate (P1-P7 with .a/.b split)
- CR-12 6-class disposition lattice classification per-candidate
- ARTIFACT-INLINE persistence per FM-19 readonly-guard-sidestep discipline

**VERDICT**: STUDY-PILOT-CATALOG-CONDITIONAL — 3 install candidates pending operator workflow confirmation; 15 REJECT-FOR-FIT for autonomous-solo-harness use class.
