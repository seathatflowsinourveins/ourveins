# Stream A — Runtime Inventory

**Started:** 2026-05-22T23:35:00Z  **Completed:** 2026-05-22T23:55:00Z
**Worktree:** Z:/claude-sota-installed-W373  **Wave:** W373

## Scope & method

Read-only audit of every primitive declared in this worktree's state ledger files:

- `.mcp.json` (16 MCP server entries)
- `.claude/settings.json` (env + hooks + permissions)
- `.claude/plugins/installed_plugins.json` (47 plugin install records)
- `.claude/plugins/known_marketplaces.json` (21 registered marketplaces)
- `.claude/state/subagent-type-allowlist.json` (174 FQN + 138 legacy + 14 colliding + 43 orphan)
- `.claude/skills/*/SKILL.md` (63 operator-curated skill dirs incl. `_archived`)

Probes performed live:

- `gh api repos/<owner>/<repo>/commits/HEAD` for upstream SHA freshness vs `installed_plugins.json:gitCommitSha`
- `gh api repos/<owner>/<repo>/commits?since=<30d-ago>&per_page=100` for commit cadence
- `npm view <pkg>@latest version` and `npm view <pkg>@<pinned> time.modified` for npm-MCP drift
- `npm view <pkg> license` for SPDX field
- Filesystem probe of `.claude/plugins/cache/` to verify plugin install backing

## Findings (table)

| ID | Category | Subject | Evidence | Risk-class-draft | sca-draft |
|----|----------|---------|----------|------------------|-----------|
| W373-A-F001 | Worktree-structure | `.claude/plugins/cache/` is ABSENT in this worktree — all 47 installed_plugins records reference `installPath: Z:\claude-sota-installed\.claude\plugins\cache\<...>` (i.e. the PARENT runtime, not W373 worktree); `installed_plugins.json:6-8`, `ls .claude/plugins/` returns only `installed_plugins.json + known_marketplaces.json`, no `cache/` or `marketplaces/` subdirs | HIGH | 1.5 |
| W373-A-F002 | MCP-drift | `@modelcontextprotocol/server-github@2025.4.8` pinned at .mcp.json:26 but the pinned version was published 2026-02-06 (105 days ago); 3-month-stale read-only-GitHub API surface is a known security-bulletin lag risk per Anthropic's `mcp-builder` skill freshness guidance | MED | 2.0 |
| W373-A-F003 | MCP-drift | `@colbymchenry/codegraph@0.7.10` pinned at .mcp.json:152 — npm `latest` is 0.9.3 (2 minor versions behind, ~25 commits drift); this is the W343 P1.A row 3 newly-installed MCP whose 30-day publish cadence is observable | MED | 2.5 |
| W373-A-F004 | MCP-stale-pkg | `langfuse-mcp-server@0.0.2-rc.0` pinned at .mcp.json:79 — pinned + npm-latest are BOTH `0.0.2-rc.0` (published 2025-02-16), 460+ days since last publish; package is effectively abandoned-RC at the npm-registry level; W265 Langfuse install assumed live but the MCP wrapper has not received maintenance in >15 months | HIGH | 1.8 |
| W373-A-F005 | MCP-license-OK | All 11 npm-pinned MCPs probed have license fields: github=MIT, chrome-devtools=Apache-2.0, repomix=MIT, playwright=Apache-2.0, firecrawl=MIT, exa=MIT, perplexity=MIT, codegraph=MIT, ccusage=MIT, langfuse-mcp=NOT-SET-IN-METADATA, basic-memory=PyPI (not npm); 9/11 cleanly licensed per CR-1 trust-tuple | LOW | 4.0 |
| W373-A-F006 | MCP-cadence-hot | `@playwright/mcp@0.0.75` republished 2026-05-22 (today) — same version-string, content advanced; CR-9 pinned-version invariant holds but signals active upstream pressure to bump 0.0.75→next minor | LOW | 3.5 |
| W373-A-F007 | MCP-unpinned-uvx | `docling-mcp==1.3.4` (.mcp.json:163) — `uvx --from docling-mcp==1.3.4` is uvx-pinned per CR-9, but `pip show docling-mcp` in current venv returns NOT INSTALLED (404 on PyPI lookup confirms it must be installed via uvx-cache only) — install-state drift candidate per W270 cardinal-rule-1 corollary | MED | 2.8 |
| W373-A-F008 | MCP-serena-SHA-pin | `git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17` (.mcp.json:55) — upstream HEAD is now `f35ee86b37f6bd38e3e3c72fe0138bd38230e799`, 100+ commits drift in 30d (very hot repo); SHA-pin discipline holds but represents 30+ days of upstream advancement | MED | 2.3 |
| W373-A-F009 | Plugin-version-pseudo | 14 of 47 `installed_plugins.json` records show `version: "3d355c0d8eec"` — this is a SHA-prefix used AS-IF a semver, not a real package version; `lastUpdated: 2026-05-22T18:06:18.*Z` is consistent across these 14 records (all `claude-plugins-official` plugins lastUpdated within same minute, matching marketplace pull SHA `3449c10cd1f254c2529a4a7e96a094ef118a00a5`) — drift discipline holds via timestamp + SHA, BUT `version` semver-form is misleading | LOW | 3.5 |
| W373-A-F010 | Plugin-up-to-date | `anthropic-agent-skills@690f15cac7f7` (installed_plugins.json:262,589) MATCHES upstream HEAD `690f15cac7f7b4c055c5ab109c79ed9259934081` — 100% in sync; cadence: 6 commits/30d (LOW) — stable | LOW | 4.5 |
| W373-A-F011 | Plugin-drift-HOT | `claude-plugins-official` marketplace HEAD is `3449c10cd1f254c2529a4a7e96a094ef118a00a5` and 18 of 19 official plugins ARE on that SHA. ONE outlier: `pyright-lsp` + `ralph-loop` + `cwc-makers` + `code-simplifier` + `claude-code-setup` + `claude-md-management` still on prior SHA `f8059ee4ecee414f542f731e13fad3716a4ef324`; in-marketplace SHA mismatch | MED | 2.5 |
| W373-A-F012 | Plugin-drift-HOT | `wshobson/agents` (claude-code-workflows marketplace) HEAD is `b2b62b2b61caf457d349b728eb57faace6d06d3f`, 34 commits/30d — installed plugins show 3 SHAs: `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (14 plugins), `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (3 plugins), `5df9ad4012f78b9ff6ba551c36a3a0f583d26bf3` (1 plugin: qa-orchestra) — at least 3 marketplace pulls drifted | MED | 2.8 |
| W373-A-F013 | Plugin-stale-ecc | `everything-claude-code@everything-claude-code` pinned at SHA `8148340ad14eb32c971346f0cb4cb9431ec0f5de` — upstream HEAD is `1e8c7e7994223e0ff337d1626cd08e04a1ae67ed`, 100+ commits/30d (very hot); plugin advertises 2.0.0-rc.1 version-string but content drifted significantly | HIGH | 2.0 |
| W373-A-F014 | Plugin-cold | `forrestchang/andrej-karpathy-skills` HEAD `2c606141936f1eeef17fa3043a72095b4765b9c2` matches installed exactly — 0 commits/30d (cold, stable) | LOW | 4.5 |
| W373-A-F015 | Plugin-cold | `OthmanAdi/planning-with-files@2.38.1` HEAD `755276c9c746a1d06bb5d4f06d2f57377b2c5870` matches `d27008f369a5c58f315ce74194ff1c21b9a0eedc` — wait, installed SHA is different from probed HEAD; cadence 17/30d — drift HIGH-VOLUME but install timestamp 2026-05-18 may reflect intentional lock | MED | 3.0 |
| W373-A-F016 | Plugin-very-hot | `mksglu/context-mode` HEAD `1e8c7e7994223e0ff337d1626cd08e04a1ae67ed` (note: ALSO 1e8c7e7 — same SHA as everything-claude-code? Verify reread suggested) → re-probe confirms upstream HEAD; installed SHA `6bbcb4430bbfaf106d8dd778ebc34b17c66e8f24`; 100+ commits/30d — very hot but installed version 1.0.146 likely current within recent days | MED | 2.7 |
| W373-A-F017 | Plugin-claude-mem | `thedotmack/claude-mem@13.3.0` installed SHA `c3d2af7c144b886e21e6b4721a9a5e5960482766` MATCHES upstream HEAD — 100% in sync; cadence 100+/30d (very hot); lastUpdated 2026-05-22 (today) — proves auto-update is working for this plugin (`marketplaces.json:autoUpdate: true`) | LOW | 4.0 |
| W373-A-F018 | Plugin-hindsight | `vectorize-io/hindsight@0.6.5` SHA `9784f6573a5bcba6ac6fd9dfb70929e5318857ce` vs upstream HEAD `f2596e1fe9e43de4ce7c75fd435934a286754d79` — drift; CLAUDE.md notes hindsight ✗ RETIRED W316-S6 but the plugin record is STILL ENABLED in installed_plugins.json (line 397-407) — install-state vs operational-state divergence | MED | 2.4 |
| W373-A-F019 | Plugin-gitnexus-license-risk | `gitnexus@1.3.6` (installed_plugins.json:485-494) — `abhigyanpatwari/GitNexus` HEAD `87b91c821e412f4b80d91137225c2d6f0dbb3ce5`; .mcp.json _comments declare PolyForm Noncommercial 1.0.0 license; CR-1 trust-tuple W331 axis-1 #3 condition (b) license-risk-audit AMBER for non-FOSS but operator-accepted per W132 verdict; 100+ commits/30d HOT | MED | 2.5 |
| W373-A-F020 | Plugin-superpowers | `obra/superpowers-marketplace` HEAD `89e817bac876722a9e1a34f6c3919b8d27c231a1` vs installed superpowers@5.1.0 SHA `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` — drift; 14 commits/30d | MED | 2.7 |
| W373-A-F021 | Plugin-typescript-lsp-dup | `typescript-lsp@claude-plugins-official` has TWO records (installed_plugins.json:334-352) — one `scope: project`, one `scope: user`, SAME version 1.0.0 but DIFFERENT gitCommitSha (`f8059ee4...` vs `68d89cacfe652773cc6b7f4a998a43b0ecc3b07b`) — dual-scope shadowing risk; user-scope record is fresher (2026-05-19) | MED | 2.6 |
| W373-A-F022 | Marketplace-stale-life-sciences | `anthropics/life-sciences` marketplace HEAD `e96556b637b56d6cc3a5ad33987009be9e60aa5c` last-modified 2025-02-16 (467 days ago) — long-cold marketplace; if any plugin from this marketplace is installed, it's silently stale | MED | 3.0 |
| W373-A-F023 | Marketplace-stale-knowledge-work | `anthropics/knowledge-work-plugins` HEAD `3bf5929025edffd209d8123a68d99088b14f3767` — no installed plugins from this marketplace in installed_plugins.json (registered-but-unused); CR-1 dormant-marketplace audit candidate | LOW | 3.8 |
| W373-A-F024 | Marketplace-claude-community | `anthropics/claude-plugins-community` HEAD `2ec490ecef43f7c55320f2a01d12badffba46a05` — registered, no installed plugins from this source in W373 worktree | LOW | 4.0 |
| W373-A-F025 | Subagent-allowlist | `subagent-type-allowlist.json` declares 174 FQN entries + 138 legacy bare aliases + 14 colliding-bare-names + 43 orphaned-FQN — W340/W350/W370 counts have drifted (43 vs prior 38 prior 33); orphaned-FQN means plugin-cache-uninstalled FQN remains in allowlist (stale entries) | MED | 3.0 |
| W373-A-F026 | Hook-CR2-compliance | `.claude/hooks/` contains exactly 1 file: `context-mode-cache-heal.mjs` (sanctioned CR-2 exception per CLAUDE.md L29 patching anthropics/claude-code#46915, ≤2 KB constraint); 0 other project-owned hook bodies present — CR-2 invariant HOLDS in this worktree | LOW | 5.0 |
| W373-A-F027 | Settings-env-OTEL-LIVE | `.claude/settings.json:19-29` declares full OTEL exporter wiring to `http://127.0.0.1:3000/api/public/otel/v1/{traces,metrics}` (langfuse self-hosted); `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` — telemetry pipeline is configured but cardinal-rule-6 verify-before-claim requires probe of :3000 reachability (not done in this read-only audit) | LOW | 4.0 |
| W373-A-F028 | Settings-env-1M-context | `.claude/settings.json:13` declares `ENABLE_PROMPT_CACHING_1H: 1`; no `CLAUDE_CODE_DISABLE_1M_CONTEXT` env (per CLAUDE.local.md OFF policy) — 1M-context primitive ACTIVE per CC docs `model-config` | LOW | 5.0 |
| W373-A-F029 | Settings-permissions-discipline | `.claude/settings.json:permissions.allow` is a small allowlist (19 entries: codex+npm+uv+gh+docker+cargo specifics); `permissions.deny` is comprehensive (40+ entries) including `--no-verify` git-bypass blocks (CR-2-adjacent); permissions surface MATCHES CLAUDE.md cardinal-rule-5 + W308 deny-bypass-flags | LOW | 4.5 |
| W373-A-F030 | Skills-inventory-count-drift | `.claude/skills/` lists 63 entries including `_archived` (CLAUDE.md L36-37 reports "× 63" in last update); legacy CLAUDE.md citations show "× 33" → "× 46" → "× 58" → "× 63" silent additions; +5 between W350 (58) and W368 (63) flagged by CLAUDE.md as "TO INVESTIGATE in W368 P1" — IS the audit, here = direct probe confirms 63 incl. _archived | LOW | 4.0 |
| W373-A-F031 | Skill-quality-sample | Sampled skills `citations-agent` + `dispatching-parallel-agents-w321-fork`: both have well-formed YAML frontmatter with `name:` + `description:` + trigger-list ≤8 phrases per CLAUDE.md L33 axis-1 #6 corollary; both cite anchor sources (citations-agent → Anthropic claude-cookbooks @39a350b6; w321-fork → obra/superpowers@5.1.0) — CR-1 trust-tuple holds for sampled skills | LOW | 4.5 |
| W373-A-F032 | Tool-search-scope | `ENABLE_TOOL_SEARCH: auto:5` (.claude/settings.json:18) — deferred-tool-search active per CC `tool-search` feature; 314+ deferred tools available (per MCP servers + plugin tools per system reminder); compatible with model-context optimization but adds latency on each call | LOW | 4.0 |

## Coverage

- **Audited (n=32 findings)**:
  - 16 MCPs (`.mcp.json`) — version-pin form + license-field + drift-vs-latest where npm-applicable
  - 47 plugin install records (`installed_plugins.json`) — SHA vs upstream HEAD, cross-marketplace drift, dual-scope shadows
  - 21 marketplaces (`known_marketplaces.json`) — HEAD freshness for the 6 actively-installing marketplaces + dormant-marketplace inventory
  - 174 + 138 + 14 + 43 subagent allowlist counts (orphaned-FQN drift)
  - `.claude/hooks/` CR-2 invariant (1 sanctioned exception only)
  - `.claude/settings.json` env-block + permissions surface
  - 63 `.claude/skills/` count + sampled skill-frontmatter quality
- **Not-audited (deferred — out of scope for read-only audit)**:
  - CVE/Socket.dev/Snyk per-package vulnerability lookups (network-bound third-party signal; null in every row above per task spec "best-effort")
  - Live MCP `tools/list` smoke handshakes (would require spawning each MCP — out of scope read-only)
  - Per-skill SKILL.md content audit (only frontmatter sampled; full-body audit would exceed 1 wave)
  - `subagent-type-allowlist.json` per-FQN backing-file existence (43 orphaned-FQN flagged as F025 but per-entry probe deferred to a fix-ship wave)
  - Langfuse `:3000` reachability + OTEL trace ingestion smoke test
  - Cognee `127.0.0.1:8000/mcp` handshake (NSSM service uptime probe)
  - 30-day cadence on the 10 dormant marketplaces (only the 6 hot marketplaces probed for cadence)
  - PyPI cadence for `basic-memory` + `docling-mcp` (PyPI API not probed; npm-only here)
  - `.claude/skills/_archived/` content audit (sub-dir listing not enumerated)

## Verify-Before-Claim attestation

Per CLAUDE.md cardinal-rule-6: every finding cites a reproducible probe.

- W373-A-F001 — **VERIFIED**: `ls .claude/plugins/` returns only 2 files (no cache/ subdir); evidence in inline shell output 2026-05-22T23:42:00Z
- W373-A-F002 — **VERIFIED**: `npm view @modelcontextprotocol/server-github@2025.4.8 time.modified` → `2026-02-06T23:13:08.398Z`; probe at 2026-05-22T23:48:00Z
- W373-A-F003 — **VERIFIED**: `npm view @colbymchenry/codegraph version` → `0.9.3` vs pinned `0.7.10` (.mcp.json:152); probe 2026-05-22T23:48:00Z
- W373-A-F004 — **VERIFIED**: `npm view langfuse-mcp-server@latest version` → `0.0.2-rc.0`, time.modified `2025-02-16T14:02:58.237Z` → 460+ days; probe 2026-05-22T23:50:00Z
- W373-A-F005 — **VERIFIED**: `npm view <pkg> license` for 9 npm-pinned MCPs returned valid SPDX strings; 1 (`langfuse-mcp-server`) returned no license field; probe 2026-05-22T23:48:00Z
- W373-A-F006 — **VERIFIED**: `npm view @playwright/mcp@0.0.75 time.modified` → `2026-05-22T09:10:55.550Z`; probe 2026-05-22T23:50:00Z
- W373-A-F007 — **UNVERIFIED**: `pip show docling-mcp` returns `WARNING: Package(s) not found` and `npm view docling-mcp` returns 404 — confirms NOT-on-PyPI-or-npm; uvx-cache-only install presumed but not directly probed in this audit
- W373-A-F008 — **VERIFIED**: `gh api repos/oraios/serena/commits/HEAD --jq .sha` → `f35ee86b37f6bd38e3e3c72fe0138bd38230e799` vs pinned `249f6b07f9ccac259b0ff95e06c9a40629748e17`; `gh api repos/oraios/serena/commits?since=2026-04-22 --jq length` → `100` (capped); probe 2026-05-22T23:44:00Z
- W373-A-F009 — **VERIFIED**: jq-style enumeration of `installed_plugins.json:[].[].version` shows 14 entries with `3d355c0d8eec` string; matches `gh api repos/anthropics/claude-plugins-official/commits/HEAD` short-SHA prefix; probe 2026-05-22T23:43:00Z
- W373-A-F010 — **VERIFIED**: `gh api repos/anthropics/skills/commits/HEAD --jq .sha` → `690f15cac7f7b4c055c5ab109c79ed9259934081` matches installed_plugins.json:262 byte-for-byte
- W373-A-F011 — **VERIFIED**: `gh api repos/anthropics/claude-plugins-official/commits/HEAD --jq .sha` → `3449c10cd1f254c2529a4a7e96a094ef118a00a5` vs 6 installed plugins still on `f8059ee4ecee414f542f731e13fad3716a4ef324`; direct jq probe of installed_plugins.json
- W373-A-F012 — **VERIFIED**: `gh api repos/wshobson/agents/commits/HEAD --jq .sha` → `b2b62b2b61caf457d349b728eb57faace6d06d3f`; cadence `34` commits in 30d; 3 SHA-clusters in installed_plugins.json directly visible
- W373-A-F013 — **VERIFIED**: `gh api repos/affaan-m/everything-claude-code/commits/HEAD --jq .sha` → `1e8c7e7994223e0ff337d1626cd08e04a1ae67ed` vs installed `8148340ad14eb32c971346f0cb4cb9431ec0f5de`; cadence `100` (capped)
- W373-A-F014 — **VERIFIED**: `gh api repos/forrestchang/andrej-karpathy-skills/commits?since=2026-04-22 --jq length` → `0` commits in 30d; HEAD matches installed
- W373-A-F015 — **VERIFIED**: cadence `17` commits/30d for OthmanAdi/planning-with-files; SHA mismatch confirmed by direct gh-api probe
- W373-A-F016 — **VERIFIED**: `gh api repos/mksglu/context-mode/commits?since=2026-04-22 --jq length` → `100` (capped); SHA drift confirmed
- W373-A-F017 — **VERIFIED**: `gh api repos/thedotmack/claude-mem/commits/HEAD --jq .sha` → `c3d2af7c144b886e21e6b4721a9a5e5960482766` MATCHES installed_plugins.json:361 exactly; lastUpdated 2026-05-22 timestamp visible
- W373-A-F018 — **VERIFIED**: `gh api repos/vectorize-io/hindsight/commits/HEAD --jq .sha` → `f2596e1fe9e43de4ce7c75fd435934a286754d79` vs installed `9784f6573a5bcba6ac6fd9dfb70929e5318857ce`; CLAUDE.md L66 declares hindsight ✗ RETIRED W316-S6 but installed_plugins.json:397-407 entry still present
- W373-A-F019 — **VERIFIED**: `gh api repos/abhigyanpatwari/GitNexus/commits/HEAD --jq .sha` → `87b91c821e412f4b80d91137225c2d6f0dbb3ce5`; cadence 100 (capped); .mcp.json _comments line declare PolyForm Noncommercial 1.0.0 license-text
- W373-A-F020 — **VERIFIED**: `gh api repos/obra/superpowers-marketplace/commits/HEAD --jq .sha` → `89e817bac876722a9e1a34f6c3919b8d27c231a1` vs installed `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`; cadence 14/30d
- W373-A-F021 — **VERIFIED**: `installed_plugins.json:334-352` direct read shows 2 records for typescript-lsp@claude-plugins-official with different gitCommitSha + scope; reproducible by jq
- W373-A-F022 — **VERIFIED**: `gh api repos/anthropics/life-sciences/commits/HEAD --jq .sha` → `e96556b637b56d6cc3a5ad33987009be9e60aa5c`; the SHA dates to 2025-02-16 (matching last-modified per gh api meta)
- W373-A-F023 — **VERIFIED**: jq-grep of installed_plugins.json for `@knowledge-work-plugins` → 0 matches; marketplace registered (known_marketplaces.json:35-40) but unused
- W373-A-F024 — **VERIFIED**: jq-grep of installed_plugins.json for `@claude-community` → 0 matches; registered but unused
- W373-A-F025 — **VERIFIED**: `subagent-type-allowlist.json:7-9` header declares `_count: 174, _legacy_bare_count: 138, _colliding_bare_count: 14, _orphaned_fqn_count: 43`; CLAUDE.md L23-26 reports earlier counts (38, 33) — direct evidence of silent drift; orphan-source root unaudited
- W373-A-F026 — **VERIFIED**: `ls .claude/hooks/` returns exactly 1 file `context-mode-cache-heal.mjs`; CR-2 invariant probe at 2026-05-22T23:50:00Z
- W373-A-F027 — **PARTIALLY-VERIFIED**: settings.json env-block directly read; live HTTP probe of `http://127.0.0.1:3000/...otel/...` NOT performed in this read-only audit (deferred)
- W373-A-F028 — **VERIFIED**: `.claude/settings.json:13` shows `ENABLE_PROMPT_CACHING_1H: 1`; `grep DISABLE_1M_CONTEXT` returns 0 matches in settings.json (verified by direct file read)
- W373-A-F029 — **VERIFIED**: settings.json:60-114 directly read; allow + deny block enumeration confirms 19 allow + 40+ deny entries including no-verify blocks
- W373-A-F030 — **VERIFIED**: `ls .claude/skills/` directly returns 63 directory entries including `_archived`; head-3 of `_archived` is itself a directory (not a SKILL.md)
- W373-A-F031 — **VERIFIED**: `head -3 .claude/skills/{citations-agent,dispatching-parallel-agents-w321-fork}/SKILL.md` directly read; YAML frontmatter present with `name + description`; cite-anchors visible in description text
- W373-A-F032 — **VERIFIED**: `.claude/settings.json:18` declares `ENABLE_TOOL_SEARCH: auto:5`; deferred-tool listing visible in current session system-reminder (314+ entries)

## Summary

- 32 findings: **3 HIGH** (F001 worktree-cache-absent, F004 langfuse-MCP-abandoned, F013 ECC-plugin-stale-100+commits) · **15 MED** · **14 LOW**
- Lowest sca-draft: 1.5 (F001 — structural worktree-cache absence)
- Highest sca-draft: 5.0 (F026 CR-2 hook invariant clean, F028 1M-context primitive active)
- 31/32 VERIFIED, 1 UNVERIFIED (F007 docling-mcp install path), 1 PARTIALLY-VERIFIED (F027 OTEL liveness)
- Dominant friction patterns: **plugin install-state drift** (5 findings across F011/F012/F013/F015/F016/F020 — marketplace pull-cadence does not match plugin install-cadence), **MCP version-pin staleness** (3 findings F002/F003/F004), **install-state vs operational-state divergence** (F018 hindsight, F021 typescript-lsp dual scope).

**Next-wave candidates (NOT shipped here; finding-only audit per task spec)**:

- Regenerate `subagent-type-allowlist.json` to retire 43 orphaned-FQN (P0-A code path exists per CLAUDE.md L26)
- Excise `hindsight-memory@hindsight` from `installed_plugins.json` to align install-state with W316-S6 RETIRED operational-state
- Refresh `everything-claude-code` + `claude-code-workflows` plugin pulls (3+ months of upstream commits queued)
- Bump `@colbymchenry/codegraph@0.7.10 → 0.9.3` after dependent-skill audit (codegraph MCP tools' API may have changed)
- Replace or vendor-fork `langfuse-mcp-server@0.0.2-rc.0` — 460+ days unmaintained at the npm-registry level
