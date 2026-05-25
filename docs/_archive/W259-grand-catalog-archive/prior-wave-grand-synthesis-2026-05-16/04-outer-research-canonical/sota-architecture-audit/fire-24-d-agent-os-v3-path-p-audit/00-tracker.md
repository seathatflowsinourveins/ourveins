# Fire 24-D — Agent OS v3 (buildermethods/agent-os) Path P Codex T1 Audit

> **Position**: Fourth of 5 Tier 1 NEW PROBE-DAG-CANDIDATE audits queued at Fire 23 close.
> **Subject**: `buildermethods/agent-os` v3.0 (user's external SOTA Tier 3 "standards injection" pick)
> **Method**: Path P recipe (codex exec foreground+tee — n=11/11 reproducible)
> **Pre-codex hypothesis**: STUDY-PILOT-NARROW or CITE-PATTERN-ONLY (v3 retired implementation phase, narrowly-scoped standards-injection layer aligns with eee design)

## Subject identification (TIER-1-DIRECT cite anchors)

| Field | Value | Cite |
|---|---|---|
| Repo | `buildermethods/agent-os` | `Z:/repos/deps/agent-os` |
| HEAD | `cae8e66` (2026-05-10 — note PR #327 in CHANGELOG) | `git log -1 --oneline` |
| License | **MIT** (pure, no Commons Clause) | `LICENSE:1` |
| Org/Author | Brian Casel @ Builder Methods (buildermethods.com — educational/community) | `README.md` |
| Version | 3.0 (major refactor; v3 retired implementation/orchestration phases) | `config.yml:1` + `CHANGELOG.md:13` |
| Cross-tool support | Claude Code, Cursor, Antigravity (per README) | `README.md:5` |

## v3 design philosophy alignment with eee (CHANGELOG quote)

Per `CHANGELOG.md:13-26`:

> "Agent OS v3 is a major release that refocuses the framework on what it does best —
> establishing and injecting standards — while deferring to modern AI tools for the
> parts they now handle better.
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

This design philosophy converges with eee's CR-5 install-priority (defer to upstream
native primitives) and eee's existing TaskCreate/Plan Mode reliance. Strong alignment.

## Architecture (LIGHTWEIGHT vs Fire 24-A/B/C)

```
agent-os/
├── commands/agent-os/
│   ├── discover-standards.md    (8K)
│   ├── index-standards.md       (3K)
│   ├── inject-standards.md      (8K)
│   ├── plan-product.md          (5K)
│   └── shape-spec.md            (7K)
├── profiles/default/global/     (standards profile inheritance)
├── scripts/
│   ├── common-functions.sh      (6K)
│   ├── project-install.sh       (15K)
│   └── sync-to-profile.sh       (15K)
├── config.yml                   (278B — version + default_profile)
├── LICENSE                      (MIT)
└── README.md                    (1.6K)
```

**NOT A CC PLUGIN** — no `.claude-plugin/marketplace.json`. Installs as raw slash commands
+ profile files via `npx`/`scripts/project-install.sh`.

Compared to Fire 24 series:
| Fire | Subject | Files/skills | Install footprint |
|---|---|---|---|
| 24-A | BMAD-METHOD | 42 SKILL.md + 2 plugins | LARGE |
| 24-B | CCPM | 1 SKILL + 6 refs + 12 scripts | MEDIUM-SMALL |
| 24-C | Task Master | Node.js monorepo (apps + mcp-server + packages) | LARGE |
| **24-D** | **Agent OS v3** | **5 slash commands + 3 scripts + profiles/** | **SMALLEST** |

## Core capabilities (4)

1. **Discover Standards** — Extract patterns/conventions from codebase into `agent-os/standards/<folder>/<name>.md` files
2. **Index Standards** — Maintain `agent-os/standards/index.yml` mapping each standard to brief description (enables fast lookup without reading all files)
3. **Inject Standards** — Auto-suggest mode OR explicit-arg mode for loading relevant standards into current task context
4. **Shape Spec** — Better spec writing (defers to CC Plan Mode for spec-mechanics)

## Pre-codex blockers / promising signals

### Promising signals (vs Fire 24-A/B/C)

- ✅ Pure MIT (no Commons Clause like Task Master)
- ✅ Lightweight (5 commands + 3 scripts vs Task Master's full Node monorepo)
- ✅ v3 design philosophy ALIGNS with eee CR-5 (defer to native CC primitives)
- ✅ Standards-injection is genuinely NEW capability for eee (currently manual rule selection)
- ✅ Author Brian Casel is named-T2 practitioner (Builder Methods educational community)

### Potential blockers

- ⚠️ Probe 4 DUPLICATE risk: eee has `Z:/claude-sota/.claude/rules/` for standards (24 cardinal rules cite-import-AMBER); does Agent OS DISCOVER STANDARDS duplicate or extend?
- ⚠️ Probe 7.a demand-absence: eee currently uses manual rule citation (per cardinal-rule-1); is there a NAMED operational use case for "auto-suggest relevant standards"?
- ⚠️ Probe 4: would slash commands `/discover-standards` / `/inject-standards` / etc collide with CC built-in or other plugin slash commands?
- ⚠️ profile installation: would write to `agent-os/standards/` directory (eee uses sibling rules at different paths)

## Pre-codex hypothesis

**STUDY-PILOT-NARROW** is plausible if:
- inject-standards capability provides NEW value over manual cardinal-rule selection
- Probe 4 namespace clean
- Probe 7.b 5-clause check passes for explicit pilot scope

**CITE-PATTERN-ONLY** is more likely if:
- Standards already cover demand via cardinal-rule cite-import-AMBER
- inject-standards extraction without full install is achievable

## Fire 24-D deliverables (planned)

1. `00-tracker.md` (this file)
2. `01-agent-os-anatomy.md` — line-by-line v3 anatomy + capability deep-dive
3. `02-probe-dag-application.md` — Probe DAG 1-7 applied
4. `03-codex-t1-verdict.md` — Path P codex T1 verdict
5. `99-close-synthesis.md` — adoption verdict + forward roadmap

## Mia ladder advance

n=1580 → n=1583 (+3: Fire 24-D framing / v3 design philosophy alignment captured / 5-command lightweight architecture noted)
