# Fresh SOTA Research Delta — 2026-05-16 13:00 PT (post-W258-ULTIMATE)

> Sourced from sota-researcher fork (agentId a7f7e03117f5552f0, 2026-05-16T13:04Z+)
> Verifies net-new SOTA candidates emerged since W258-ULTIMATE-SYNTHESIS was finalized this morning.

## §A — Net-NEW candidates (since 2026-05-16 08:56)

| Candidate | Value | Cite | Axis |
|---|---|---|---|
| **Claude Agent SDK rename + decoupled billing** | Anthropic officially renamed Claude Code SDK → **Claude Agent SDK** (broader-than-coding) + announced 2026-06-15 separate Agent-SDK credit pool | help.apiyi.com en/anthropic-claude-subscription-agent-sdk-billing-split-june-2026 + anthropic.com/engineering/building-agents-with-the-claude-agent-sdk | agent-runtime cost model (W258 missed); affects MANDATES re cross-model Path P budget |
| **CC `/goal` command + Agent View (Research Preview)** | Single-list view of all sessions running/blocked/done; new flags `--add-dir --settings --mcp-config --plugin-dir --permission-mode --model --effort` for background sessions; fast mode → Opus 4.7 default | releasebot.io/updates/anthropic May 2026 | subagent orchestration (DIRECTLY overlaps team-orchestration.md) |
| **EliasOulkadi/shokunin** (37★, created 2026-05-12) | 62-skill OpenCode/CC bundle with ChromaDB memory + declarative self-update; multi-platform skill-md | github.com/EliasOulkadi/shokunin | behavioral-layer skills (post-W254 install set) |
| **joosure/Maestro** (11★, 2026-05-13) | Elixir-based issue-tracker→execution-layer dispatcher coordinating CC+codex+OpenCode w/ audit trail | github.com/joosure/Maestro | multi-provider orchestration (NEW pattern vs wshobson/agents single-CLI) |

## §B — W258-missed candidates (existing but not surfaced)

| Candidate | Why W258 missed | Cite |
|---|---|---|
| **yvgude/lean-ctx** (1.6k★, Rust) | Targets same surface as context-mode but with property-graph + CFT/Φ scoring + 10 read modes + persistent CCP — strictly broader feature set | github.com/yvgude/lean-ctx + deepwiki.com/yvgude/lean-ctx |
| **serpro69/claude-toolbox** (141★) | Production-tested multi-lang CC bundle; missed because W258 filtered on skill-heavy (>200) — this is QUALITY-curated minimal | github.com/serpro69/claude-toolbox |
| **existential-birds/beagle** (58★) | CC code-review plugin with Pydantic-AI/LangGraph/Vercel-AI-SDK aware reviewers — complements comprehensive-review | github.com/existential-birds/beagle |
| **alirezarezvani/claude-skills** (15k★) | 263+ multi-tool skills spanning Codex/Gemini/Cursor — exceeds W258 install-set breadth | github.com/alirezarezvani/claude-skills |

## §C — HONEST-NON-FINDINGS

- Context7 `/anthropics/claude-agent-sdk-python`: not queried (3-call cap reached)
- DeepWiki `EliasOulkadi/shokunin` + `joosure/Maestro`: both returned "Repository not found" — need indexing first; downgrade to TIER-2 GitHub-metadata-only
- anthropics/claude-code CHANGELOG 2026-05-13 to 16: 314KB file too large for one-shot read; grep returned 0 matches for May dates → CHANGELOG snapshot pre-dates OR uses different heading format. UNVERIFIED whether `/goal` + Agent View landed in CHANGELOG vs only release-notes
- Independent benchmark on `sehoon787/my-claude` + `odin-claude-plugin`: WebSearch returned ZERO third-party benchmark verification — both fail R2 evidence-tier promotion to ADOPT
- Convergence-gate Axis-1 ≥3 distinct orgs: lean-ctx + context-mode + claude-skills all single-org; none satisfy Axis-1 for INSTALL recommendation absent additional 2+ org corroboration

## §D — Verdict

**NET-NEW**: Claude Agent SDK rename + billing decoupling (TIER-1, INSTALL-BLOCKING — affects cost model for Path P codex-rescue + 2026-06-15 cutover), `/goal` command + Agent View (TIER-1, OVERLAP-CHECK against existing team-orchestration.md), shokunin (TIER-2, WATCHLIST), Maestro (TIER-3-NOVEL-PATTERN, WATCHLIST)

**MISSED-CANDIDATES**: lean-ctx (TIER-2 high-leverage — superset of context-mode; WATCHLIST pending Axis-1 corroboration), serpro69/claude-toolbox (TIER-3 quality-bundle)

W258 is NOT complete on the **Anthropic-official SDK-rename + billing-restructure** axis. Recommend W259 micro-wave on §A row 1 only (others can wait for next cycle).
Per ahfv Probe-1 (origin): all §A candidates ≤7-day age; Probe-7 (license): all MIT/Apache-2.0 except Maestro (no LICENSE file — flag).

## Sources

- https://help.apiyi.com/en/anthropic-claude-subscription-agent-sdk-billing-split-june-2026-en.html
- https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk
- https://releasebot.io/updates/anthropic
- https://simonwillison.net/2026/May/6/code-w-claude-2026/
- https://venturebeat.com/technology/anthropic-reinstates-openclaw-and-third-party-agent-usage-on-claude-subscriptions-with-a-catch
- https://www.codesota.com/browse/agentic/swe-bench
