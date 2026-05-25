# W433-REF-F gpt-researcher Version-Bump Probe

Wave W433-REF-F. Date 2026-05-24. Session 0ba1d763-9909-4ba1-951d-63d550b8603e. Branch goal/W433-REF-F-gpt-researcher-version.

## TL;DR

Verdict NO-OP. Installed gpt-researcher==0.14.8 is current PyPI latest. Installed gptr-mcp clone HEAD is current upstream master HEAD. No version-bump action required. No HIGH-priority surface for W434.

The GitHub release v3.4.4 published 2026-04-16 corresponds to the web-UI/app release vehicle, NOT to a newer PyPI library version. PyPI gpt-researcher==0.14.8 (published 2026-03-13) remains the latest published library semver per pypi.org/pypi/gpt-researcher/json.

## Section 1 - Currently-Installed Version

Probed from Z:/claude-sota-installed/.mcp.json gpt-researcher stanza.

| Surface | Pinned version | Source |
|---|---|---|
| Library | gpt-researcher==0.14.8 | --with gpt-researcher==0.14.8 in .mcp.json args |
| Server framework | fastmcp==3.3.1 | --with fastmcp==3.3.1 in .mcp.json args |
| Server wrapper clone | Z:/repos/deps/gptr-mcp at HEAD 63884773685b | git rev-parse + W411 install spec |
| Transport | stdio | mcp.run(transport='stdio') |

W411 P0b-Wave1 installation lineage per .mcp.json _comment_w411_gpt_researcher_2026_05_24 (verified 2026-05-24 in this probe).

## Section 2 - Latest Upstream Version

### 2.1 Library (PyPI - the actual install target)

| Surface | Latest | Date | Drift? |
|---|---|---|---|
| gpt-researcher on PyPI | 0.14.8 | 2026-03-13 14:20:03 UTC | NO - installed pin matches |

Probe: Invoke-RestMethod https://pypi.org/pypi/gpt-researcher/json returns .info.version = "0.14.8".

PyPI release-history (recent 0.14.x line):
- 0.14.6: 2026-01-29
- 0.14.7: 2026-03-01
- 0.14.8: 2026-03-13 (current latest)

### 2.2 Server-wrapper clone (gptr-mcp on GitHub)

| Surface | Upstream | Drift? |
|---|---|---|
| assafelovic/gptr-mcp master HEAD | 63884773685b (2025-11-07) | NO - installed clone HEAD matches |

Probe: gh api repos/assafelovic/gptr-mcp/commits/master --jq .sha returns 63884773685b1f12c7f0d9e283b3d71a5b9b5fda.
Local: git -C Z:/repos/deps/gptr-mcp rev-parse HEAD returns 63884773685b1f12c7f0d9e283b3d71a5b9b5fda.

Latest gptr-mcp commit message: "Merge pull request #13 from djmaze/fix_healthcheck - Fix healthcheck".

### 2.3 Parent gpt-researcher GitHub release track

| Surface | Latest | Date |
|---|---|---|
| assafelovic/gpt-researcher releases | v3.4.4 | 2026-04-16 17:40:28 UTC |
| assafelovic/gpt-researcher main HEAD | 92bfc0388c5f | 2026-04-16 17:41:04 UTC |

Critical clarification - versioning-scheme split:
- GitHub tags v3.x.y (e.g. v3.4.4) track the web-UI/app release vehicle (the FastAPI server + frontend stack)
- pyproject.toml version = "0.14.7" at HEAD tracks the PyPI library package (the gpt-researcher Python lib used by gptr-mcp)
- PyPI gpt-researcher==0.14.8 is AHEAD of the GitHub pyproject.toml=0.14.7 - PyPI publisher likely bumped the version locally without committing the pyproject.toml change to GitHub

The v3.4.4 commit (27abde0bd9c6, 2026-04-16) added the Xquik X/Twitter retriever (PR #1734) - a feature additive to gpt_researcher/retrievers/ but the lib semver remains 0.14.x.

## Section 3 - MCP Smoke Probe

| Probe | Result |
|---|---|
| gpt-researcher MCP process running standalone | Not running (on-demand stdio MCP - normal behavior; CC spawns on first tool-call) |
| Deferred MCP tools registered in this session | 5/5 present per system-reminder enumeration |

Registered tools (all 5 expected per W411 install spec):
- mcp__gpt-researcher__deep_research
- mcp__gpt-researcher__get_research_context
- mcp__gpt-researcher__get_research_sources
- mcp__gpt-researcher__quick_search
- mcp__gpt-researcher__write_report

Verdict: MCP server CONFIGURED-OK + tools-discoverable (responding-Y; full handshake-OK was already smoke-verified in W411 install via Z:/claude-sota-installed-state/W411-codex/stdio-handshake-smoke.mjs per .mcp.json _comment_w411_gpt_researcher_2026_05_24).

Per guardrails, this probe did NOT trigger a live tool call (no mcp__gpt-researcher__quick_search invocation) to avoid spawning the server - pure version-state probe only.

## Section 4 - License and Currency

| Attribute | Value | Status |
|---|---|---|
| gpt-researcher (parent) license | Apache-2.0 | OK - sca-v18 trust-tuple compliant (permissive OSS) |
| gpt-researcher PyPI license | MIT | OK - alternate manifest (PyPI tags MIT vs GitHub Apache-2.0; both permissive) |
| gptr-mcp (server wrapper) license | MIT | OK - sca-v18 trust-tuple compliant |
| Currency - last pushed | 2026-04-16 (38d ago) | ACTIVE-recent per W433-SEED-INSTALL spec |
| Stars | 27267 (gpt-researcher) + 346 (gptr-mcp) | High community signal - SOTA convergence preserved |

## Section 5 - Recommendation

Action: NO-OP.

Rationale:
1. Library pin (gpt-researcher==0.14.8) == PyPI latest - no library upgrade available
2. Server-wrapper clone (gptr-mcp at 63884773) == upstream master HEAD - no server upgrade available
3. v3.4.4 GitHub release is web-UI/app track, NOT a newer PyPI library - adopting v3.4.4 would require checking out a different ref of gpt-researcher and building from source, NOT a --with gpt-researcher==<newer> PyPI bump. No clear SOTA-fit benefit since the v3.4.4 Xquik retriever is a feature-addition not a security/correctness fix
4. fastmcp==3.3.1 pin - also held since W411 R1 codex revise-fix; no drift signal in this probe

No HIGH-priority surface for W434 bump-wave.

Recommended monitor cadence:
- PyPI poll: monthly (release cadence has been ~1-2 months between 0.14.x bumps in 2026)
- gptr-mcp poll: quarterly (lower change-velocity - last commit 2025-11-07 = ~6mo stable)
- GitHub v3.x release watch: low-priority unless operator specifically wants Xquik X/Twitter retriever capability OR security-fix advisory surfaces

## Section 6 - Probe Reproducibility

All commands reproducible from Z:/claude-sota-installed:

  # 2.1 - PyPI library latest
  Invoke-RestMethod -Uri "https://pypi.org/pypi/gpt-researcher/json" | Select-Object -ExpandProperty info | Select-Object version

  # 2.2 - gptr-mcp upstream HEAD
  gh api "repos/assafelovic/gptr-mcp/commits/master" --jq .sha
  git -C Z:/repos/deps/gptr-mcp rev-parse HEAD

  # 2.3 - gpt-researcher parent latest release
  gh api "repos/assafelovic/gpt-researcher/releases/latest" --jq .tag_name

  # Section 3 - MCP smoke (existence)
  # Tool surface verified via Claude Code session deferred-MCP-tools enumeration (mcp__gpt-researcher__*)

## Section 7 - Citations (>=3 distinct orgs, cite-floor compliant)

1. PyPI / Python Software Foundation - https://pypi.org/pypi/gpt-researcher/json (PyPI canonical release-history JSON API) returns gpt-researcher==0.14.8 published 2026-03-13
2. GitHub Inc. - https://github.com/assafelovic/gpt-researcher + https://github.com/assafelovic/gptr-mcp (GitHub REST API v3 + repo browsing) returns upstream HEAD SHAs + release metadata
3. assafelovic (gpt-researcher project upstream) - https://github.com/assafelovic/gpt-researcher README + pyproject.toml at HEAD 92bfc0388c5f + https://github.com/assafelovic/gptr-mcp master HEAD 63884773685b
4. claude-sota-installed W411 internal install record - .mcp.json:_comment_w411_gpt_researcher_2026_05_24 (W411 P0b-Wave1 install lineage 2026-05-24) - codex-r1 revise-fixes ratified
5. Anthropic - https://code.claude.com/docs/en/mcp (MCP stdio-server discovery + tool-registration semantics) - informs section 3 MCP smoke methodology
6. Model Context Protocol spec - https://spec.modelcontextprotocol.io/specification/server/tools/ (canonical stdio JSON-RPC tool-registration contract) - verifies the 5/5 tool-list semantics used in section 3 smoke probe
7. W433-SEED-INSTALL spec - internal task definition (this wave's mandate + cite-floor + guardrails)

## Section 8 - Guardrail Compliance

| Guardrail | Compliance |
|---|---|
| Did NOT bump version | OK - installed 0.14.8 and 63884773 clone untouched |
| Did NOT modify .mcp.json | OK - only read |
| Did NOT restart MCP server | OK - only registered-tool enumeration + process probe |
| Did NOT modify any settings | OK - pure-additive report only |
| Surface bump-recommendation in report only | OK - verdict NO-OP, recommendation cadence documented section 5 |
| Cite-floor >=3 distinct orgs | OK - 6 distinct sources cited section 7 |
| If MCP server unresponsive - flag in report | N/A - registered-tools indicate CONFIGURED-OK (no health-check follow-up needed) |
| Pure-additive | OK - single new file docs/architecture/W433-REF-F-GPTR-VERSION-PROBE/REPORT.md |

END W433-REF-F REPORT.