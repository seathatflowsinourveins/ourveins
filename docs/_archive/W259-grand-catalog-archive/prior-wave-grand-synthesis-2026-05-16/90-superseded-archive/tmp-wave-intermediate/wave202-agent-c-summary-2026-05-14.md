# Wave 202 Agent C Operator Summary

VERDICT: choose Option A for production now; build Option B as a parallel evaluation runtime.

## Option A vs Option B Rationale

- Option A remains production because it is already operational, has proven local behavior, and W197 substantially reduced cold-load pressure.
- Option A has current breadth that Option B has not yet proven: memory, context continuity, review workflows, code intelligence, MCP coverage, and commit/review gates.
- Option B is the better long-term architecture if it stays genuinely upstream-sourced: smaller bootstrap, cleaner provenance, easier audit, and lower maintenance.
- Option B is not ready for production after only the starter marketplaces; it still lacks proven MCP parity, review-hook parity, orchestration breadth, context/compaction behavior, hardening, telemetry, and memory strategy.
- The decision is staged adoption, not rejection: build Option B immediately, but promote only after smoke gates and parity conditions pass.

## Agent C Recommended Next Steps

### Phase 0: Bootstrap Boundary

Create `Z:/claude-sota-pure/` with only manifest/settings/MCP/launcher/provenance/checklist files. Do not copy Option A rules, hooks, skills, agents, or lifecycle gates.

### Phase 1: Starter Marketplaces

Register the clean seed marketplaces: Anthropic official plugins, `wshobson/agents`, `addyosmani/agent-skills`, `openai/codex-plugin-cc`, plus required `mksglu/context-mode`. Add `obra/superpowers` as recommended.

### Phase 2: Core Runtime Installs

Install baseline command/context/review/method plugins: `codex@openai-codex`, `context-mode`, `superpowers`, `agent-skills`, `agent-teams`, `comprehensive-review`, and `ralph-loop`.

### Phase 3: Settings and Baseline Surfaces

Use official env/settings surfaces (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50`), then register baseline MCPs: GitHub, Context7, DeepWiki, Playwright, Repomix, Serena, and GitNexus.

## Open Gates Before Option B Production

- Required plugins must be installed and visible in the plugin registry.
- `codex@openai-codex`, `context-mode`, `agent-teams`, `comprehensive-review`, and `ralph-loop` must each smoke cleanly.
- GitHub, Context7, DeepWiki, Playwright, Repomix, Serena, and GitNexus MCPs must respond or report usable status on test workloads.
- Secrets and MCP state must remain outside tracked repo files.
- Every third-party primitive needs explicit trust/license notes and install provenance with version, repo, HEAD, or package version.
- Option B must contain no copied local Option A rules, hooks, skills, agents, or locally invented replacement gates.
- Missing review-hook parity must be closed by upstream plugins or explicitly accepted as a command-driven workflow change.
- Memory and observability strategy must be chosen and smoke-tested.
- Option B must complete at least one real engineering task with review and context recovery before promotion.
