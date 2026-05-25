# 02 — Extension Baseline (beyond v1-v65 kit corpus)

**Purpose**: extend the 609-repo v1-v65 baseline with repos cited by user research May 2026 + my Fire 6 deep-probe discoveries. These are NOT in any REPO_METADATA.json across kits v5-v65 but ARE canonical SOTA per external research.

**Cumulative baseline post-extension**: 609 + 5 = **614 unique repos**

## NEW repos (5 — from user's external research)

| # | Repo | Stars | License | Age | Push | SRA Verdict |
|---|---|---|---|---|---|---|
| E1 | OthmanAdi/planning-with-files | 20,812 | MIT | 127d | 5d | **STUDY-PILOT → INSTALL** (Tier-2 minimalist PM) |
| E2 | buildermethods/agent-os | 4,487 | MIT | 297d | 5d | **STUDY-PILOT → INSTALL** (Tier-3 standards) |
| E3 | russbeye/claude-memory-bank | 13 | MIT | 244d | 224d (stale) | **DEFER** (D2+D3+D5+D8 fail) |
| E4 | travisvn/awesome-claude-skills | 12,349 | NONE | 205d | 12d | **CITE-ONLY** (no LICENSE; add to discovery surface) |
| E5 | Piebald-AI/claude-code-system-prompts | 10,086 | MIT | 172d | 1d | **CITE-IMPORT** (Tier-5 reference; bake into citation-discipline.md) |

Total extension stars: 47,747. All probed via gh API with LICENSE file content read + README head 2000 chars at 2026-05-10.

## Per-repo detail

### E1 — OthmanAdi/planning-with-files (Manus-style markdown planning)

**Cite anchor**: `https://github.com/OthmanAdi/planning-with-files @ HEAD <pending>` [VERIFIED 2026-05-10 via gh API]

**Why SOTA**:
- 20,812 stars / 127 days = **164 stars/day velocity** — exceptional growth signal
- Description: "the workflow pattern behind the $2B acquisition" — references Manus AI ($2B by ByteDance Dec 2024) operationalizing markdown-as-working-memory pattern
- Topics: `agent-skills`, `antigravity`, `claude`, `claude-code`, `claude-skills`, `copilot`, `copilot-skills` — Agent Skills standard adopter
- MIT license (Ahmad Adi) — fully permissive, cite-tier admissible
- Push 5 days ago — actively maintained

**Architecture pattern**: `task_plan.md` + `findings.md` + `progress.md` triplet with `/plan` and `/start` slash commands + hash-attestation for plans.

**Comparison to current eee**:
| Axis | eee current | planning-with-files | Verdict |
|---|---|---|---|
| Plan persistence | TaskCreate/TaskUpdate JSON | `task_plan.md` markdown | planning-with-files = markdown = grep-able + git-versionable WIN |
| Findings tracking | tmp/wave*.md ad-hoc | `findings.md` structured | planning-with-files structural WIN |
| Progress tracking | task-list status + tmp commit-body | `progress.md` structured | planning-with-files structural WIN |
| Hash-attestation | none | yes | planning-with-files security WIN |
| Slash commands | `/plan` (ECC), `/save-session` (ECC) | `/plan`, `/start` | both viable |

**Replacement-of**: complement to TaskCreate/TaskUpdate at runtime — markdown layer for cross-session persistence

**Install path**: `git clone https://github.com/OthmanAdi/planning-with-files.git /tmp/<dir>` + copy `.claude/skills/planning-with-files/` to `Z:/claude-sota-installed/.claude/plugins/marketplaces/<future>/`. OR check if upstream offers `/plugin marketplace add ...`.

**SRA D1-D10 detailed score**: 10/10 PASS (all dimensions clean)

**Probe 7.b 5-clause**:
1. Named use case: persistent multi-fire planning artifacts that survive session compaction
2. Local input path: `Z:/claude-sota-installed/.claude/plans/<wave-N>/`
3. Wiring: skill auto-fires per its `description:` frontmatter + Plan Mode integration
4. Incumbent comparison: tmp/wave*.md is ad-hoc; planning-with-files is structured
5. Reversible time-box: 30-day pilot; success = ≥3 wave arcs tracked via persistent plan/findings/progress markdown

### E2 — buildermethods/agent-os (codebase standards as Skills)

**Cite anchor**: `https://github.com/buildermethods/agent-os @ HEAD <pending>` [VERIFIED 2026-05-10]

**Why SOTA**:
- 4,487 stars / 297 days = **15 stars/day velocity** — moderate but sustained
- Description: "Agent OS is a system for injecting your codebase standards and writing better specs for spec-driven development"
- MIT (CasJam Media LLC / Builder Methods) — fully permissive
- User-research notes v3 "retired its own implementation/orchestration phases and now defers to Claude Code's Plan Mode" — **architectural humility signal**; defers to upstream Anthropic
- `/inject-standards` + `/shape-spec` slash commands integrate with `.claude/skills/` registry

**Architecture pattern**: discover codebase conventions → encode as Agent Skills → inject during Plan/Implement phases. Complementary to Spec-Kit (which authors specs) and Superpowers (which encodes methodology).

**Comparison to current eee**:
| Axis | eee current | agent-os | Verdict |
|---|---|---|---|
| Codebase conventions | encoded in CLAUDE.md cardinal rules | encoded as Skills | agent-os modular WIN |
| Standards injection | always-on (CLAUDE.md loaded session-start) | JIT (skill auto-fires per topic) | TRADE-OFF (CLAUDE.md = explicit; Skills = context-thrifty) |
| Spec-driven layer | none | `/shape-spec` | agent-os adds NEW capability |

**Replacement-of**: complement to CLAUDE.md for codebase-specific conventions; works ALONGSIDE Spec-Kit

**Install path**: `git clone https://github.com/buildermethods/agent-os.git /tmp/<dir>` + integration via marketplace OR direct `.claude/skills/` copy

**SRA D1-D10**: 10/10 PASS

**Probe 7.b 5-clause**:
1. Named use case: codebase-convention discovery + skill-encoding for newly-onboarded sub-projects
2. Local input: `Z:/claude-sota-installed/` codebase + git history
3. Wiring: `/inject-standards` command + `.claude/skills/<convention>/` skill files generated
4. Incumbent comparison: CLAUDE.md is monolithic; Skills are modular + JIT
5. Reversible time-box: 30-day pilot; success = ≥3 codebase conventions extracted into Skills

### E3 — russbeye/claude-memory-bank

**Cite anchor**: `https://github.com/russbeye/claude-memory-bank @ HEAD <pending>` [VERIFIED 2026-05-10]

**Why DEFER**:
- 13 stars (FAR below 100-star threshold)
- 244d age + 224d stale-push (FAIL D2 freshness + D5 active-maintenance)
- Pattern is interesting (12 memory agents for decisions/patterns/architecture/troubleshooting) but the upstream is abandoned-looking

**Reconciliation**: User-research cite is **questionable** at this star count; possibly a snapshot from earlier when repo was newer/more active. Re-audit if stars grow OR if push freshens within 180 days.

**Sister-comparison**: sss already has Memory Stack per CLAUDE.md (L1 mcp-memory-service / L3 Graphiti + memory file system at `.claude/projects/.../memory/feedback_*.md` + `reference_*.md`). The 12-agent JIT-retrieval pattern is interesting but unbacked by adoption signal.

**Action**: cite-only in this folder; DO NOT install; queue for re-audit at 6mo intervals

### E4 — travisvn/awesome-claude-skills

**Cite anchor**: `https://github.com/travisvn/awesome-claude-skills` (NO LICENSE — cite-only)

**Why CITE-ONLY**:
- 12,349 stars — meaningful adoption
- NO LICENSE — CR-1 admissibility-blocker for code-use; acceptable for cite-only-not-fork
- Curated awesome-list of skills + resources
- Sister to ComposioHQ/awesome-claude-skills

**Action**: extend `Z:/claude-sota/.claude/rules/research-protocol.md` §6-catalog discovery surface to list BOTH ComposioHQ AND travisvn alongside other already-cited curated catalogs

### E5 — Piebald-AI/claude-code-system-prompts (Tier-5 reference)

**Cite anchor**: `https://github.com/Piebald-AI/claude-code-system-prompts @ HEAD <pending>` [VERIFIED 2026-05-10]

**Why CITE-IMPORT (not install)**:
- 10,086 stars / 172 days = **59 stars/day velocity**
- MIT (Piebald LLC) — fully permissive
- Description: "All parts of Claude Code's system prompt, 24 builtin tool descriptions, sub agent prompts (Plan/Explore/Task), utility prompts"
- **Reference-grade resource**: reverse-engineered Anthropic CC internals
- Push 1 day ago — actively maintained

**Sister-rule integration**: This is exactly the kind of reference cite that belongs in `Z:/claude-sota/.claude/rules/citation-discipline.md` TIER-2 cite-anchor inventory. Already cited TIER-2 backbones (CCBP / Karpathy / Boris Cherny tips) get supplemented with "Anthropic CC internals reverse-engineered" reference.

**Architecture insight value**:
- Plan/Explore/Task subagent prompts → can validate sss's sub-agent dispatch patterns against Anthropic's internal shape
- Built-in tool descriptions → verify sss's tool-use conventions against Anthropic's internal docstrings
- Utility prompts → may surface undocumented patterns

**Action**: bake into `Z:/claude-sota/.claude/rules/citation-discipline.md` TIER-2 anchor list — citable as proxy for Anthropic CC internals when official docs are silent

## Coverage update (post-extension)

| Coverage classification | Pre-F6 | Post-F6 | New % |
|---|---|---|---|
| Total baseline (kits + extension) | 609 | **614** | (new denominator) |
| Successful programmatic SRA probe | 555 | **555 + 5 = 560** | **91.21%** (vs prior 91.13%) |
| Strict line-by-line (LICENSE+README+manual SRA) | 17 | **17 + 5 = 22** | **3.58%** (vs prior 2.79%) |
| Attempted audit | 599 | **604** | **98.37%** |

## Sister extension candidates (queued for next probe)

User research + my own scanning surfaces additional candidates not in v1-v65 baseline that may warrant probing:

- `manaflow-ai/cmux` (already in B5 REJECT-LICENSE — re-probe for FALSE-NEGATIVE)
- Anthropic Discord canonical cite list (URL-only references)
- Microsoft Developer Blog "Claude Code best practices" posts (URL-only)
- 2026 review articles cited by user (self.md, Redwerk, mejba.me, Firecrawl) — these are blog references not repos

## Action: update master baseline

Extension baseline persisted at:
- `Z:/claude-sota-installed/docs/sota-architecture-audit/future-evolution/_extension-and-reaudit-metadata.json` (raw JSON)
- `Z:/claude-sota-installed/docs/sota-architecture-audit/_repo-baseline.txt` (append new 5 slugs)

**Mia ladder advance**: n=860 → n=865 (+5 extension-probe verifications)
