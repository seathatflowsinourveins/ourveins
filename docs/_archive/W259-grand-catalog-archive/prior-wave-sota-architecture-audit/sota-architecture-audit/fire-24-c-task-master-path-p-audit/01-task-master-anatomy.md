# 01 — Task Master (eyaltoledano/claude-task-master) Line-by-Line Anatomy

> **Probe method**: direct `Z:/repos/deps/claude-task-master` filesystem read at HEAD `c0c98d36`
> **Cite class**: TIER-1-DIRECT @ file:line @ HEAD SHA
> **Verification**: cross-confirmed by Path P codex T1 @ `.claude/state/codex_consult_w134_f24c_task_master_OUT.txt`

## Repo metadata

| Field | Value | Cite |
|---|---|---|
| HEAD SHA | `c0c98d36` (2026-05-10 local; codex T1 noted commit ts 2026-04-23T14:07:23+02:00) | `git -C Z:/repos/deps/claude-task-master log -1 --oneline` |
| License | **"MIT with Commons Clause"** (NON-PERMISSIVE) | `LICENSE` full text |
| Commercial owner | **Hamster** (ralph@tryhamster.com, tryhamster.com/product/taskmaster) | `marketplace.json:3-5` |
| Authors | Eyal Toledano + Ralph Khreish | `LICENSE` line 5 |
| npm package | `task-master-ai` v0.43.1 (latest matches package.json per codex T1 Row-2) | `README.md` npm badge |
| Plugin name | `taskmaster` | `marketplace.json:11-13` |
| MCP server | `mcp__taskmaster__*` namespace | `mcp-server/src/tools/index.js` + `mcp-server/server.js` |
| Trendshift status | Trending repository (verified PASS Row-2) | `README.md:5` badge |

## License analysis: "MIT with Commons Clause"

Verbatim full text:

```
Task Master License

MIT License

Copyright (c) 2025 — Eyal Toledano, Ralph Khreish

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify,
merge, publish, distribute, sublicense, and/or sell copies of the Software, [...]

"Commons Clause" License Condition v1.0

The Software is provided to you by the Licensor under the License (defined below),
subject to the following condition:

Without limiting other conditions in the License, the grant of rights under the
License will not include, and the License does not grant to you, the right to Sell
the Software.

For purposes of the foregoing, "Sell" means practicing any or all of the rights granted
to you under the License to provide the Software to third parties, for a fee or other
consideration (including without limitation fees for hosting or consulting/support
services related to the Software), as part of a product or service whose value
derives, entirely or substantially, from the functionality of the Software.
```

Per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D1 license-use-class precision:

| Use class | Commons Clause activation |
|---|---|
| Local-CLI use (eee runtime baseline) | ✅ ACCEPTABLE — no Sell, no resale |
| Library-link into commercial product | ❌ ACTIVATES |
| Network-served as paid service | ❌ ACTIVATES |
| SaaS-distributed | ❌ ACTIVATES |

**Codex T1 verdict on this**: `"license_commons_clause_decisive_blocker": "DOC-CAVEAT-ONLY"` —
NOT decisive, but a CR-9 caveat documented in eee install-provenance.

## Architecture (Node.js monorepo — heavy install footprint)

```
claude-task-master/
├── .changeset/              (changesets monorepo tooling)
├── .claude-plugin/marketplace.json
├── .claude/                  (Task Master's own CC config)
├── .cursor/                  (Cursor IDE config)
├── .kiro/                    (Kiro IDE config — Amazon Q Developer)
├── .taskmaster/              (Task Master's own .taskmaster dir)
├── .mcp.json                 (176B MCP config)
├── apps/
│   └── docs/                 (documentation app)
├── mcp-server/
│   ├── server.js (755B)
│   └── src/                  (MCP server implementation)
├── packages/
│   └── claude-code-plugin    (plugin source)
├── scripts/
│   └── modules/task-manager/parse-prd/parse-prd-helpers.js (codex T1 cited)
├── src/
│   └── prompts/              (parse-prd.json, expand-task.json — codex T1 cited)
├── bin/                      (CLI binaries)
├── context/                  (context files)
├── docs/                     (root-level docs)
├── tests/                    (test suite)
└── images/                   (logo + screenshots)
```

Multi-surface install: PLUGIN + MCP SERVER + CLI binary + dedicated `.taskmaster/` storage.

## Commercial product / supply-chain risk

- **Commercial brand**: tryhamster.com/product/taskmaster (a PRODUCT, not pure community OSS)
- **Hamster company**: marketplace owner is "Hamster" (Ralph Khreish CEO)
- **Trendshift badge**: trending repository signal
- **Cloud/telemetry/product prompts**: codex T1 specifically called out "cloud/telemetry/product
  prompts" — Task Master has cloud-product orientation distinct from pure-OSS plugins
- **Multi-IDE config**: `.cursor/` + `.kiro/` + `.claude/` → cross-tool product strategy

Codex T1: `"commercial_product_supply_chain_risk": "MEDIUM"`

## Row-2 fabrication-test (PASS per codex T1)

Codex T1 verified live:
- **Trendshift repository page**: resolves for eyaltoledano/claude-task-master ✅
- **GitHub API**: resolves repo + stars ✅
- **npm latest**: 0.43.1 matches package.json ✅

Row-2 PASSED (no fabrication detected) — different from CCPM's "Eval 100%" Row-2 AUTO-FAIL.

## Workflow shape (Probe 5 mode-harness — PM-loop assumption)

Per `apps/docs/capabilities/task-structure.mdx` + `src/prompts/parse-prd.json` (codex T1 cites):

1. Parse PRD → structured tasks (research-augmented expansion via Perplexity integration)
2. Complexity-report-driven expansion (analyze complexity → recommend subtask counts/prompts)
3. Sequential ID + dependency-aware ordering
4. Tagged `.taskmaster/tasks/tasks.json` storage schema
5. `task-master start <id>` auto-launches Claude Code with full task context

Workflow assumes feature-shipping PM-loop (PRD → tasks → start <id> in sequence) —
**SAME P5 FAIL pattern as CCPM** (PM-loop incompatible with autonomous /loop audit-fire mode).

## DUPLICATE-FUNCTIONALITY surface vs eee

| eee primitive | Task Master overlap |
|---|---|
| TaskCreate / TaskUpdate / TaskList native CC | Task Master `.taskmaster/tasks/tasks.json` |
| per-fire MD folder `docs/sota-architecture-audit/fire-N-*/` | Task Master `.taskmaster/tasks/` + `.taskmaster/reports/` |
| `parallel-agent-wave.md` + T1-T7 lifecycle | Task Master parallel-agent dispatch via `mcp__taskmaster__*` |
| sota-researcher subagent + Exa/Perplexity/DeepWiki MCPs | Task Master Perplexity-integrated research expansion |
| TaskCreate/Update audit trail | Task Master complexity reports + task files |

**P4 FAIL — DUPLICATE per kiss-dry-yagni Must-Never #4** (codex T1 explicit verdict).

## Codex T1's 5 cite-pattern-extract candidates (file:line precision)

1. **PRD-to-task prompt contract** — `src/prompts/parse-prd.json:59-60`: strict JSON tasks schema + dependency-aware ordering + current-best-practices research block
2. **Generated-task runtime guards** — `scripts/modules/task-manager/parse-prd/parse-prd-helpers.js:136-173`: sequential IDs + dependency remapping before write
3. **Selective MCP tool-loading** — `mcp-server/src/tools/index.js:20-62` + `mcp-server/src/tools/tool-registry.js:107-132`: TASK_MASTER_TOOLS env var with `core/standard/all/custom` tiers to reduce tool context footprint
4. **Complexity-report-driven expansion** — `apps/docs/capabilities/task-structure.mdx:197-248` + `src/prompts/expand-task.json:69-83`: analyze complexity → recommend subtask counts/prompts → expand tasks
5. **Tagged storage schema** — `apps/docs/capabilities/task-structure.mdx:7-24`: `.taskmaster/tasks/tasks.json` with optional metadata + generated task files

**Candidate 3 is particularly interesting for eee**: 23-MCP inventory has high token overhead at
session start (per `mcp_overhead_audit.py` Wave 16 evidence). A selective tool-loading pattern
(TASK_MASTER_TOOLS=`core` vs `all`) could be ported as eee MCP-tier-loading discipline.

## Mia ladder advance

n=1558 → n=1563 (+5: anatomy probe / Commons Clause license analysis / commercial supply-chain MEDIUM risk / 5 cite-pattern candidates with file:line precision / P6 FAIL distinction vs BMAD+CCPM)
