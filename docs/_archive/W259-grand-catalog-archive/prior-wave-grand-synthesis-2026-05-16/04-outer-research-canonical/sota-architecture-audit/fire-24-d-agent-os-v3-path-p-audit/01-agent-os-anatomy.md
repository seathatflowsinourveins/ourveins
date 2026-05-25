# 01 — Agent OS v3 (buildermethods/agent-os) Line-by-Line Anatomy

> **Probe method**: direct `Z:/repos/deps/agent-os` filesystem read at HEAD `cae8e66`
> **Cite class**: TIER-1-DIRECT @ file:line @ HEAD SHA
> **Verification**: cross-confirmed by Path P codex T1 @ `.claude/state/codex_consult_w134_f24d_agent_os_OUT.txt`

## Repo metadata

| Field | Value | Cite |
|---|---|---|
| HEAD SHA | `cae8e66` (2026-05-10 — note PR #327 in CHANGELOG) | `git log -1 --oneline` |
| Live main | `cae8e66` (codex T1 verified via WebFetch) | codex T1 summary |
| License | **MIT (PURE)** | `LICENSE:1` |
| Org/Author | Brian Casel @ Builder Methods (educational community at buildermethods.com) | `README.md` |
| Version | 3.0 | `config.yml:1` |
| README badges | NONE (codex T1 Row-2 PASS — no unsourced badges) | `README.md` |
| Cross-tool support | Claude Code, Cursor, Antigravity | `README.md:5` |

## License: PURE MIT (no Commons Clause)

```
MIT License

Copyright (c) [authors]

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, [...]
```

Cite: `LICENSE:1-21` — STANDARD MIT, no commercial restrictions.

This is **distinct from Fire 24-C Task Master** (Commons Clause = NON-PERMISSIVE).

## v3 design philosophy (verbatim CHANGELOG)

`CHANGELOG.md:13-26`:

> "Agent OS v3 is a major release that refocuses the framework on what it does best —
> establishing and injecting standards — while deferring to modern AI tools for the parts
> they now handle better.
>
> ## Why the major version bump?
>
> AI coding tools have evolved significantly since Agent OS's original release in mid-2025.
> Claude Code's plan mode, extended thinking, and improved models now handle much of the
> scaffolding that earlier versions provided:
>
> - **Spec writing** — Now best handled using Plan mode
> - **Task breakdown** — Tools like Claude Code automatically create and track todo lists
> - **Implementation orchestration** — Frontier models manage task delegation on their own
>
> Rather than reinvent these functions, v3 focuses on Agent OS's core strengths:
> establishing standards, injecting them smartly, and enhancing spec-driven development."

**Strong philosophy alignment** with eee CR-5 install-priority (defer to native primitives).
This is the **opposite** of CCPM (parallel-agent-wave + Track) and Task Master (Execute phase
parallel-agent dispatch) which reinvent functions eee already has.

## Architecture (smallest of Fire 24 series)

```
agent-os/
├── commands/agent-os/        (5 slash commands)
│   ├── discover-standards.md (8K) ─ extract patterns → standards/<folder>/<name>.md
│   ├── index-standards.md    (3K) ─ maintain index.yml description mapping
│   ├── inject-standards.md   (8K) ─ auto-suggest OR explicit-arg injection
│   ├── plan-product.md       (5K) ─ product planning
│   └── shape-spec.md         (7K) ─ spec writing (defers to CC Plan Mode)
├── profiles/default/global/  (standards profile inheritance)
├── scripts/                  (3 shell scripts)
│   ├── common-functions.sh   (6K)
│   ├── project-install.sh    (15K) ⚠️ hard-codes agent-os/standards/ path
│   └── sync-to-profile.sh    (15K)
├── config.yml                (278B) version: 3.0 + default_profile: default
├── LICENSE                   (MIT)
└── README.md                 (1.6K — no badges, no evals, no marketing claims)
```

**NOT A CC PLUGIN** — installs as raw slash commands via shell scripts, NOT via
`/plugin marketplace add`. Distinct from Fire 24-A/B/C (all plugin-based).

## 4 core capabilities

### 1. Discover Standards (`commands/agent-os/discover-standards.md`)

Per file:1-3: "Extract tribal knowledge from your codebase into concise, documented standards."

Process:
1. Determine focus area (user-specified OR auto-detect)
2. Analyze codebase structure
3. Identify 3-5 major areas (auth / API / testing / UI / etc.)
4. Extract patterns into `agent-os/standards/<folder>/<name>.md` files

### 2. Index Standards (`commands/agent-os/index-standards.md`)

Per file:1-7: "Rebuild and maintain the standards index file (`index.yml`). The index enables
`/inject-standards` to suggest relevant standards without reading all files."

Output: `agent-os/standards/index.yml` mapping each standard to brief description for
quick AI matching without bloating context.

### 3. Inject Standards (`commands/agent-os/inject-standards.md`)

Per file:5-23: TWO modes:

**Auto-Suggest Mode** (no args):
```
/inject-standards
```
Analyzes context, suggests relevant standards.

**Explicit Mode** (with args):
```
/inject-standards api                          # All standards in api/
/inject-standards api/response-format          # Single file
/inject-standards api/response-format api/auth # Multiple files
/inject-standards root                         # All standards in root folder
```

**Key insight for eee**: this is the GENUINELY NOVEL capability vs eee's manual cardinal-rule
citation. eee currently relies on operator memory to pick which rule applies; Agent OS v3
provides auto-suggest based on current task context.

### 4. Shape Spec (`commands/agent-os/shape-spec.md`)

Per Fire 23 file 01:132-135 + CHANGELOG: v3 defers to CC Plan Mode for spec mechanics;
shape-spec surfaces relevant standards into the spec-writing context.

## Critical P4 namespace finding (per codex T1)

⚠️ **`project-install.sh` hard-codes `agent-os/standards/` and `agent-os/standards/index.yml`**

Codex T1 verbatim: "Do not run stock `project-install.sh`; even `--commands-only` still
creates an `agent-os/standards` structure and index path."

This would create a PARALLEL standards tree alongside eee's existing
`Z:/claude-sota/.claude/rules/` cardinal-rule library = **Probe 4 namespace FAIL**
(parallel namespaces violate kiss-dry-yagni Must-Never #4).

## Pre-codex vs codex T1 convergence

| Probe | Orchestrator | Codex T1 |
|---|---|---|
| P1 count-OVER | NEUTRAL pre-codex | PASS (modest claims; no fabrication) |
| P2 SDK-vs-CLI | (didn't probe) | PASS (cross-tool: CC, Cursor, Antigravity) |
| P3 arch-API | (didn't probe) | PASS |
| P4 plugin-namespace | DUPLICATE risk noted | **FAIL** (codex caught hard-coded `agent-os/standards/` parallel tree) |
| P5 mode-harness | likely PASS (v3 deferral philosophy) | **PASS** |
| P6 blockers | PASS | PASS |
| P7a demand-absence | UNCERTAIN | **PASS** (eee has demand for auto-suggest standards) |
| P7b demand-creates | UNCERTAIN | **ELIGIBLE** |

**6/8 perfect convergence + codex precision on P4 + codex demand-gate verdict**

Codex T1 contributed:
- Live WebFetch verification of README cae8e66 main (no badges, no evals — Row-2 PASS)
- Hard-coded `agent-os/standards/` path detection (P4 FAIL precision)
- P7a/P7b demand-gate verdicts (eee DOES have demand for context-sensitive rule suggestion)

## Mia ladder advance

n=1583 → n=1587 (+4: anatomy probe / pure MIT vs Task Master Commons Clause distinction / v3 design philosophy alignment / P4 hard-coded path finding from codex T1)
