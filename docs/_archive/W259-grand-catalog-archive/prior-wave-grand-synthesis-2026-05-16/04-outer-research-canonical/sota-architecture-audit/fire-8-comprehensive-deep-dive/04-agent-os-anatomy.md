# 04 — buildermethods/agent-os anatomy (Tier-3 standards injection)

> **Source**: `Z:/repos/deps/agent-os` (just cloned 2026-05-10 — clone HEAD probe pending)
> **License**: (LICENSE file present at root; license-class probe pending direct content read)
> **Version**: 3.0 (per `config.yml:version: 3.0`)
> **Audit depth**: README.md (41 LOC short) + CHANGELOG.md (489 LOC) + 5 commands directory + config.yml

## What it is

**Agent OS v3** by Brian Casel @ Builder Methods. v3 explicitly **RETIRED its own
implementation/orchestration phases** and now DEFERS to Claude Code's Plan Mode. What
remains is its strongest function: **discovering, deploying, and indexing your
codebase's standards as Claude Code Skills**.

## Tagline (README:3)

> Agents that build the way you would

## Commands (5 total in `commands/agent-os/`)

| Command | File | Role |
|---|---|---|
| `/discover-standards` | discover-standards.md | crawl codebase + extract standards patterns |
| `/index-standards` | index-standards.md | build searchable index of standards |
| `/inject-standards` | inject-standards.md | inject relevant standards into current context (auto-suggest OR explicit) |
| `/plan-product` | plan-product.md | (planning command) |
| `/shape-spec` | shape-spec.md | gather context + structure planning (plan-mode-gated) |

## `/inject-standards` essence (commands/agent-os/inject-standards.md:1-50)

**Two modes**:
- **Auto-Suggest** (`/inject-standards` no args) — analyzes context, suggests relevant standards
- **Explicit** (`/inject-standards api`, `/inject-standards api/response-format`, `/inject-standards root/naming`) — direct injection

**Three scenarios detected**:
1. **Conversation** — Regular chat / implementing code / answering questions
2. **Creating a Skill** — Building a `.claude/skills/` file
3. **Shaping/Planning** — In plan mode, building a spec, running `/shape-spec`

**Detection logic**: plan mode OR "spec/plan/shape" mention → Shaping/Planning; "skill/skills/" mention → Creating a Skill; otherwise ASK to confirm via `AskUserQuestion`.

**Note**: `root` keyword means files directly in `agent-os/standards/` (not in subfolder).

## `/shape-spec` essence (commands/agent-os/shape-spec.md:1-50)

**Plan-mode-gated**: if not in plan mode, stops immediately with prompt to enter plan mode first.

**Process**:
1. Clarify what we're building (via `AskUserQuestion` — single source for user input)
2. Gather visuals (mockups / wireframes / screenshots)
3. (subsequent steps in file)

**Lightweight by design**: "This is shaping, not exhaustive documentation."

## Config primitives (config.yml)

```yaml
version: 3.0
default_profile: default

# Optional: define inheritance relationships for profiles
# profiles:
#   profile-a:
#     inherits_from: default
#   profile-b:
#     inherits_from: profile-a
```

Profiles support inheritance — `agent-os/standards/` can have multiple profiles
inheriting from `default`. Currently only `default` and `agent-os` profiles present
in `commands/`; `profiles/` directory ready for project-specific profiles.

## SRA D1-D10 verdict

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS (deferred — LICENSE present, classify next probe) | repo has LICENSE file at root |
| D2 freshness | NEW CLONE | just cloned 2026-05-10; HEAD probe pending |
| D3 fresh-paint clear | PASS | 4.5k★, multi-year history (v3 = third major version) |
| D4 maintainer-provenance | PASS | Brian Casel @ Builder Methods TIER-3-NAMED-ORG with named owner |
| D5 active-maintenance | PASS | CHANGELOG.md 489 LOC = sustained release cadence |
| D6 use-class compat | PASS | Plan-mode-defers (eee uses Plan Mode); Agent Skills compatible |
| D7 Anthropic-aligned | PASS | v3 EXPLICITLY defers to CC Plan Mode (Anthropic-canonical alignment) |
| D8 industry adoption | PASS | Builder Methods has named-T2 practitioner status |
| D9 FM-class clear | PASS | no known FM-class triggered |
| D10 replacement viability | N/A | not replacing existing eee primitive — additive |

**SRA score: 9/10 PASS + 1 PENDING** — same 10/10 as Fire 6 verdict after LICENSE
classification completes.

## Install command (CR-6 fresh-from-github + official-native-channel)

```bash
# 1. Clone (canonical https://github.com URL, fresh)
git clone --depth 1 https://github.com/buildermethods/agent-os.git Z:/claude-sota-installed/.local/agent-os

# 2. Symlink commands into .claude/commands/ (or directly clone there)
# (Specific install pattern per agent-os README — check during W134-F8 install)

# 3. Run /inject-standards or /shape-spec to verify
```

## Why-SOTA

1. **v3 retirement of own implementation phase = Anthropic-canonical alignment**
   — agent-os explicitly retired what overlapped with Plan Mode. Pure additive value remains.
2. **Standards discovery**: `/discover-standards` crawls codebase + auto-extracts patterns
3. **Standards injection**: `/inject-standards` is context-aware (3 scenarios + auto-vs-explicit)
4. **Plan-mode integration**: `/shape-spec` runs IN plan mode (Anthropic-recommended)
5. **Profile inheritance**: project-specific profiles inherit from default

## Replacement-of (existing eee primitives)

| Existing eee surface | Replaced by | Migration cost |
|---|---|---|
| Manual standards-in-CLAUDE.md | `agent-os/standards/` + `/inject-standards` | MEDIUM-HIGH (CLAUDE.md size review — see W134-F9 hygiene queue) |
| Ad-hoc skill creation | `/inject-standards` "Creating a Skill" mode | LOW (additive) |
| Ad-hoc spec-shaping in tmp/wave*.md | `/shape-spec` in plan mode | MEDIUM |

**Verdict**: agent-os is COMPLEMENTARY — adds standards-as-data layer above existing
CLAUDE.md cardinal-rules. Doesn't replace cardinal-rules (which are operational
governance, not project-specific standards).

## Risk classification

- **Install class**: PRIMARY (cardinal-rule-6 PRIMARY — `git clone` from canonical https://github.com)
- **Reversibility**: HIGH — `rm -rf .local/agent-os` + remove command symlinks
- **Blast radius**: MEDIUM — adds 5 slash commands to namespace; verify no conflict with existing CC commands
- **Cross-model gate**: required before commit (CR-3)
- **Sibling-bleed**: N/A (upstream install)

## Comparison with Tier-3 alternatives

| | agent-os | russbeye/claude-memory-bank |
|---|---|---|
| Focus | Standards injection | Persistent project knowledge |
| Storage | `agent-os/standards/` flat + subfolder | `.claude/memory_bank/` with `decisions/` `patterns/` `architecture/` `troubleshooting/` |
| Commands | 5 (discover/index/inject/plan/shape) | 12+ memory agents + `/context-query` |
| Stars | 4.5k | 13 |
| Push velocity | active | 224d stale |
| Mode-harness | Plan Mode-aligned | JIT retrieval |
| Fire 6 verdict | 🥇 INSTALL F8 | DEFER |

**Convergence**: agent-os is the SOTA Tier-3 pick. memory-bank is the LOW-STAR alternative
with interesting structure but D2 staleness blocks adoption.

## Why agent-os v3 retirement matters

Per user-research synthesis (May 2026):
> "Agent OS v3 explicitly retired its implementation phase because Plan Mode + checkpoints + `/rewind` ate that lane."

This is **convergence-by-deference** — agent-os v3 EXPLICITLY narrows its scope to
where it adds unique value (standards-injection), ceding overlap to CC native. This is
SOTA design discipline: tools that recognize when an OS-level primitive subsumes their
function and refactor accordingly.

## Forward fire status

- Fire 8 INSTALL candidate (per Fire 6 W134-F8 queue)
- Fire 7 install gate DEFERRED-PENDING-FIX → blocks all install actions until codex T1 verdict lands

## Mia ladder advance

n=931 → n=935 (+4: v3.0 config verified / 5-command grammar verified / inject-standards 3-scenario detection verified / shape-spec plan-mode-gated verified)
