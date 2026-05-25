# W343 P1 — SOTA-Install Cascade + Native-Features Unleash + Carry-Forward

> Wave W343 / branch `goal/W343`. Cite W342-AUDIT §4 P1 backlog (E3 ranking + E4 parity + E8 prior-verdict surfacing).

## §P1.A — 5 SOTA installs (sca-v15 5-gate + codex round-1 per candidate)

| # | Slug | Tier | Stars | License | Status | Phase-5 Gate-1..5 | Codex r1 |
|---|---|---|---|---|---|---|---|
| 1 | ruvnet/ruflo | T2 | 53.5k | MIT | TBD | TBD | TBD |
| 2 | Yeachan-Heo/oh-my-claudecode | T1 | 34.4k | MIT | TBD | TBD | TBD |
| 3 | colbymchenry/codegraph | T2 | 9k | MIT | TBD (closes W342 P2.1 pilot) | TBD | TBD |
| 4 | nyldn/claude-octopus | T2 | 3.4k | MIT | TBD (aligns W331 frontier-peer) | TBD | TBD |
| 5 | VoltAgent/awesome-claude-code-subagents | T2 | 20.2k | MIT | TBD | TBD | TBD |

## §P1.B — Vendor-fork sync to upstream HEAD

| Repo | Current SHA | Target | Status |
|---|---|---|---|
| mattpocock-skills (W330 P1-D vendor-fork) | d54c497 | HEAD | TBD |
| addyosmani-agent-skills (W316 vendor-fork) | f17c6e88 | HEAD | TBD |
| obra-superpowers (canonical-cite) | HEAD~10 | HEAD | TBD |

## §P1.C — MCP gaps

| MCP | Gap | Fix | Status |
|---|---|---|---|
| Context7 | absent from `.mcp.json` (P1 per W342-E1) | `npx -y @upstash/context7-mcp@<pin>` add to mcpServers | TBD |
| Tavily | account disabled (E3 cascade probe) | renew operator-side OR install firecrawl-mcp@1.12.0 + brave-search-mcp@2.0.82 | TBD |

## §P1.D — Native-features unleash (E4)

CC v2.1.145 — Insights features ARE wired (OTLP → Langfuse v3.160.0; report.html generated), 0 invocations across 3,482 transcripts.

- `/insights` wired into wave-close ritual — TBD
- `/powerup` invoke once (10 lessons) — TBD
- `/rewind` + `/checkpoint` adopt to replace heavy pre-W255 git-tag pattern — TBD
- `CLAUDE_CODE_GLOB_NO_IGNORE=false` set in `.claude/settings.json` env — TBD

## §P1.E — ECC consolidate-or-retire (75-cmd surface, 0 invocations)

Invoke `/ecc-guide` + `/harness-audit` once. ADOPT 5–10 high-value commands (`/santa-loop`, `/skill-health`, `/cost-report`, `/quality-gate`, `/evolve`) OR formally retire the 75-cmd surface per cardinal-rule-1 trust + install-bloat hygiene.

**Status**: TBD (operator-decision-block; flag in OP-SIGN.md)

## §P1.F — 6 W341 operator-sign carry-forward

Per W342-E8 mem-recall surfacing:
- P0.3 phantom plugin enables (clickhouse + outputai) reconcile — destructive `/plugin uninstall`
- P0.4 PreToolUse hook D73 SHIP-BLOCK gate (behavior change)
- P0.5 Stop-hook position-swap on T1 verdicts
- P0.A2 CLAUDE.md `load_failures=1` ECC reconciliation
- P1.1 firecrawl-mcp@1.12.0 + brave-search-mcp@2.0.82 install
- P1.2 `/insights` + `/recap` + `/ctx-insight` wave-close ritual

Each remains operator-decision-block; surface in OP-SIGN.md and do NOT auto-execute in this wave.

## P1 ship-gate

5 install verdicts codex round-1 APPROVE OR REVISE→round-2 ≤2; vendor-syncs PR-ready; MCP gaps closed OR documented OP-SIGN; native-features at least 2 invocations recorded; ECC decision logged.
