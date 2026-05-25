# Fire 24-C — Task Master (eyaltoledano/claude-task-master) Path P Codex T1 Audit

> **Position**: Third of 5 Tier 1 NEW PROBE-DAG-CANDIDATE audits queued at Fire 23 close.
> **Subject**: `eyaltoledano/claude-task-master` (user's external SOTA Tier 2 🥈 "AI-driven task generation" pick)
> **Method**: Path P recipe (codex exec foreground+tee — n=10/10 reproducible)
> **Pre-codex hypothesis**: REJECT-FOR-FIT or CITE-PATTERN-ONLY (Commons Clause license + same PM-loop blockers as CCPM)

## Subject identification (TIER-1-DIRECT cite anchors)

| Field | Value | Cite |
|---|---|---|
| Repo | `eyaltoledano/claude-task-master` | `Z:/repos/deps/claude-task-master` |
| HEAD | `c0c98d36` (2026-05-10) | `git -C Z:/repos/deps/claude-task-master log -1 --oneline` |
| License | **"MIT with Commons Clause"** ⚠️ NON-PERMISSIVE | `LICENSE` full text |
| Org/Authors | Eyal Toledano + Ralph Khreish / **Hamster** (commercial: tryhamster.com) | `LICENSE` + `marketplace.json:3-5` |
| npm package | `task-master-ai` | `README.md` npm badge |
| Trendshift | (badge present) | `README.md:5` |
| Marketplace owner | `Hamster` (ralph@tryhamster.com) | `marketplace.json:3-5` |
| Plugin name | `taskmaster` | `marketplace.json:11-13` |
| Architecture | Node.js monorepo (apps/ + packages/ + mcp-server/ + scripts/ + src/ + tests/) | `ls -la` |

## P0 CRITICAL: License is "MIT with Commons Clause" (NON-PERMISSIVE)

Verbatim from `LICENSE` (line-by-line):

> Without limiting other conditions in the License, the grant of rights under the License
> will not include, and the License does not grant to you, the right to Sell the Software.
>
> For purposes of the foregoing, "Sell" means practicing any or all of the rights granted
> to you under the License to provide the Software to third parties, for a fee or other
> consideration (including without limitation fees for hosting or consulting/support
> services related to the Software), as part of a product or service whose value derives,
> entirely or substantially, from the functionality of the Software.

Per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D1 license-use-class precision:

| Use class | Commons Clause activation |
|---|---|
| Local-CLI use (autonomous /loop) | ✅ ACCEPTABLE (not selling, not productizing) |
| Library-link into commercial product | ❌ ACTIVATES (Commons Clause restricts) |
| Network-served as part of paid service | ❌ ACTIVATES (hosting fees prohibited) |
| SaaS-distributed | ❌ ACTIVATES |
| eee runtime baseline (local-CLI use) | ✅ ACCEPTABLE |

**eee use-class**: local autonomous /loop runtime — Commons Clause does NOT activate. Per SRA D1
use-class precision, this is ACCEPTABLE for local use BUT carries a CR-9 medium-risk caveat:
future risk if eee distribution becomes commercial.

## Commercial product / supply-chain risk

- **Commercial brand**: Hamster company (tryhamster.com/product/taskmaster) maintains
- **Author dual-name**: marketplace owned by "Hamster" (commercial), individual authors Eyal Toledano + Ralph Khreish
- **Trendshift badge**: trending repository signal (community traction)
- This is a **PRODUCT** (with marketing), not a pure community OSS — different risk profile

## Architecture overview

Heavy Node.js monorepo (line-by-line verified):

```
claude-task-master/
├── .claude-plugin/marketplace.json (taskmaster plugin)
├── .claude/                  (Task Master's own CC config)
├── .cursor/                  (Cursor IDE config)
├── .kiro/                    (Kiro IDE config)
├── .taskmaster/              (own .taskmaster dir — recursive!)
├── .mcp.json                 (MCP config — 176B)
├── apps/                     (applications)
├── mcp-server/               (MCP server impl — server.js 755B + src/)
├── packages/                 (npm packages — includes claude-code-plugin source)
├── scripts/                  (scripts)
├── src/                      (source)
├── tests/                    (tests)
├── bin/                      (CLI binaries)
├── context/                  (context files)
└── docs/                     (documentation)
```

Multi-surface install: PLUGIN + MCP SERVER + CLI binary. Adds to eee's existing MCP inventory.

## Pre-codex blockers (4 identified)

1. **Commons Clause license (CR-9 caveat)**: NON-PERMISSIVE; OK for local use but
   creates legal-exposure if eee runtime ever becomes commercial. Not a decisive blocker
   per SRA D1 use-class precision but DOC-WORTHY.

2. **Probe 4 plugin-namespace + MCP DUPLICATE risk**: would add
   `mcp__taskmaster__*` to eee's MCP inventory. Task Master Execute phase parallel-agent
   dispatch overlaps `parallel-agent-wave.md` + T1-T7 (same as CCPM P4 FAIL).

3. **Probe 5 mode-harness PM-loop assumption**: same root issue as CCPM —
   PRD parsing + sprint workflow assumes feature-shipping PM mode incompatible with
   autonomous /loop audit-fire pattern.

4. **Probe 7.a demand-absence**: same as CCPM — eee has NO PRD-driven feature backlog.

## Cite-pattern candidates pre-codex

- **AI-driven decomposition**: NEW capability vs CCPM (orchestrator-side-decomposition).
  Could extract: PRD-to-task auto-decomposition prompt pattern. BUT eee already has
  sota-researcher subagent + per-fire MD folder for similar function.
- **Perplexity-integrated research expansion**: covered by eee's existing
  `mcp__plugin_everything-claude-code_exa__web_search_exa` and other research MCPs.

## Fire 24-C deliverables (planned)

1. `00-tracker.md` (this file)
2. `01-task-master-anatomy.md` — line-by-line repo anatomy (monorepo)
3. `02-probe-dag-application.md` — Probe DAG 1-7 applied
4. `03-codex-t1-verdict.md` — Path P codex T1 verdict
5. `99-close-synthesis.md` — adoption verdict + forward roadmap

## Mia ladder advance

n=1555 → n=1558 (+3: Fire 24-C framing / Commons Clause license P0 flag / 4 pre-codex blockers identified)
