# accounts/ — SOTA cite anchors (TIER-1-DIRECT trail)

Per cardinal-rule-1 + cardinal-rule-8: every accounts primitive cites upstream SOTA at file:line + HEAD SHA. Multi-source ≥4 satisfied per W187 enumeration.

## TIER-1-DIRECT upstream cites

| Primitive | Source | Line range | HEAD SHA | Status |
|---|---|---|---|---|
| **CLIProxyAPI mgmt API** | `Z:/repos/deps/CLIProxyAPI/internal/api/server.go` | 506-658 | `785b00c3127eea6aa207f1207ead8a2aa93690a3` | INSTALLED at runtime PID 97820 port 18317 |
| **CLIProxyAPI Anthropic auth flow** | `Z:/repos/deps/CLIProxyAPI/internal/auth/claude/anthropic_auth.go` | 26-27, 365-367 | (CPA v7.0.2) | TokenURL + ClientID + rotating-RT mechanism |
| **CLIProxyAPI Mgmt SPA repo** | `Z:/repos/deps/CLIProxyAPI/internal/config/config.go` | 23 | `785b00c3` | DefaultPanelGitHubRepository = router-for-me/Cli-Proxy-API-Management-Center |
| **Anthropic OAuth usage** | `https://api.anthropic.com/api/oauth/usage` | n/a (HTTP) | n/a | 1 call/hour/credential throttle; `{five_hour, seven_day} {utilization, resets_at}` |
| **Anthropic v1/messages rate-limit headers** | `https://docs.anthropic.com/en/api/rate-limits` | n/a | n/a | anthropic-ratelimit-{requests,tokens}-{limit,remaining,reset} + retry-after |
| **Aperant usage-monitor (CITE-CLASS-ONLY)** | `Z:/repos/deps/Aperant/apps/desktop/src/main/claude-profile/usage-monitor.ts` | 65-69, 138, 1424, 2050, 2200-2216, 2218-2268, 2369-2425 | (per CR-9 read-only research probe exemption) | Anthropic OAuth usage path + 429 cooldown + 401/403 detection |
| **codex /wham/usage** | `https://chatgpt.com/backend-api/wham/usage` | n/a (HTTP) | n/a | `ChatGPT-Account-Id` header required; primary_window + secondary_window |
| **codex CLI account subcommands** | `Z:/repos/deps/codex/codex-rs/cli/src/main.rs` | 111, 114, 340-388 | `1a894c18` | login/login status/logout |
| **codex token-data schema** | `Z:/repos/deps/codex/codex-rs/login/src/token_data.rs` | 11-67 | `1a894c18` | ApiKey \| ChatGPT \| ChatGPTAuthTokens \| AgentIdentity |
| **ccusage session-blocks** | `Z:/repos/deps/ccusage/apps/ccusage/src/_session-blocks.ts` | 8 | `1a4bd69b9214ff55f3745d4d864108d662e4dea0` | DEFAULT_SESSION_DURATION_HOURS = 5 |
| **ccusage MCP server** | `Z:/claude-sota-installed/.local/npm/node_modules/@ccusage/mcp/` | n/a (binary) | v18.0.11 | wired in .mcp.json |
| **cpa-usage-keeper daemon** | `Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.3_windows_amd64/README.en.md` | 1-40 | v1.5.3 | INSTALLED; not yet auto-started |

## Cite-class lattice (effective_tier per citation-discipline.md rule #8)

`constituents=[
  TIER-1-DIRECT @ CLIProxyAPI server.go:506-658 @ 785b00c3,
  TIER-1-DIRECT @ Anthropic /api/oauth/usage HTTP endpoint (verified live W188),
  TIER-1-DIRECT @ Anthropic /v1/messages rate-limit headers per docs.anthropic.com/en/api/rate-limits,
  TIER-1-DIRECT @ codex/codex-rs/cli/src/main.rs:111-388 @ 1a894c18,
  TIER-1-DIRECT @ ccusage/_session-blocks.ts:8 @ 1a4bd69b,
  TIER-1-DIRECT-CITE-CLASS-ONLY @ Aperant usage-monitor.ts (per CR-9 read-only research probe exemption — Aperant is NOT install-class per W183 F1 retirement),
  TIER-3-LOCAL-COMPOSITION @ accounts/ folder consolidation assembly
]; effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE.

## Multi-source discovery breadth (≥4 source families per multi-source-discovery-breadth-discipline.md)

Per W187 SOTA enumeration:
1. **GitHub family** — CPA repo + codex-rs repo + ccusage repo + Aperant repo via mcp__github__get_file_contents + Z:/repos/deps/ clones
2. **HTTP API direct probe** — Anthropic `/api/oauth/usage` + ChatGPT `/backend-api/wham/usage` + CPA `/v0/management/*` (75+ routes) via live HTTP probe
3. **Anthropic CC docs** — code.claude.com/docs/en/sub-agents + env-vars + model-config + commands
4. **Z:/repos/deps/ local cite** — CPA + codex + ccusage + Aperant (cite-class only) file:line content

Convergence-gate Axis-1 ≥3-distinct-orgs satisfied: Anthropic + OpenAI/codex + router-for-me/CLIProxyAPI + ryoppippi/ccusage = 4 distinct orgs.

## Provenance

- Wave 187 (2026-05-13) sota-researcher dispatch: `tmp/wave187-sota-accounts-fetch-methods-research-2026-05-13.md`
- Wave 188 (2026-05-13) poll_all.py P0a architect design + W188 STOP-gate SHIP: live-smoke HTTP 200 PASS on `claude-739955940fc@gmail.com` returning `five_hour={utilization:56, resets_at:2026-05-14T04:00Z}` + `seven_day={utilization:45, resets_at:2026-05-17T06:00Z}`
- Wave 190 (2026-05-14) consolidation ship: this folder
