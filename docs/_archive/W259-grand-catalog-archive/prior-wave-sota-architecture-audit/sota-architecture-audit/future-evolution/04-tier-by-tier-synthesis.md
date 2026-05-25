# 04 — Tier-by-Tier Synthesis (full option-space per tier)

**Purpose**: synthesize EVERY candidate per tier in user's pyramid + my Fire 5/F6 audit findings + sister-framework cross-refs. Final-form decision space ready for `05-definitive-architecture.md`.

## Tier 0 — Anthropic Foundation (4 components)

### T0.1 — CLAUDE.md instructions
- **Status**: ✅ INSTALLED at `Z:/claude-sota-installed/CLAUDE.md` + `CLAUDE.local.md`
- **Cite**: CCBP `claude-memory.md:34-40 @ 64fffd53` (TIER-1-DIRECT)
- **Action**: review CLAUDE.md size vs user-research "small CLAUDE.md + many skills + one method framework"; consider trimming heavy cardinal-rule prose to point at sister rule files

### T0.2 — anthropics/skills (reference repo, Agent Skills standard)
- **Status**: ⚠️ TRULY-UNLICENSED (no LICENSE file at root) despite 131k★ Anthropic OFFICIAL
- **Action**: cite-only via `anthropics/claude-plugins-official` marketplace (which has LICENSE clarity per-plugin)
- **Upstream issue**: file question to Anthropic re LICENSE; meanwhile current eee operates via marketplace-vetted plugins

### T0.3 — anthropics/claude-plugins-official (marketplace)
- **Status**: ✅ INSTALLED at `.claude/plugins/marketplaces/claude-plugins-official/`
- **Cite**: `sota-installed-manifest.md` §3

### T0.4 — Plan Mode + checkpoints (Shift+Tab / Ctrl+G / double-Esc)
- **Status**: ✅ ACTIVE (built into CC)
- **Documented**: CLAUDE.md cardinal-rule-3 (cross-model T1-T5 lifecycle) + `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/rpi/rpi-workflow.md`

**Tier 0 verdict**: **3/4 INSTALLED + 1 cite-only-via-marketplace** — minimal gap; just review CLAUDE.md size

## Tier 1 — Method framework (PICK ONE — user research)

| Candidate | Stars | License | SRA score | Verdict | Notes |
|---|---|---|---|---|---|
| **obra/superpowers** | 185k | MIT | 10/10 | **✅ INSTALLED** | User #1 — operationalized in eee |
| **github/spec-kit** | 95k | MIT | 10/10 | **🥇 INSTALL W134-F7** | User #2 — spec-driven lifecycle complement |
| **bmad-code-org/bmad-method** | 47k | MIT | 10/10 | DEFER (Probe 7.b virtual-team overhead) | User #3 — overhead-vs-demand mismatch |
| **rest of Tier 1 from Fire 5** | various | various | various | DEFER / REJECT | covered in 04-decision-tracker.md |

**Tier 1 verdict**: **INSTALLED Superpowers** (user #1) + **INSTALL spec-kit** (user #2). Sister-frameworks (BMAD / aaif-goose/goose / aider) kept as cite-only references.

## Tier 2 — Project management layer

| Candidate | Stars | License | SRA score | Verdict | Notes |
|---|---|---|---|---|---|
| **automazeio/ccpm** | 8k | MIT | 8/10 PASS, 2/10 PARTIAL | **🥇 INSTALL W134-F7** | User #1 PM — despite 53d push concern, user signals strong SOTA |
| **eyaltoledano/claude-task-master** | 27k | MIT (false-neg corrected) | 10/10 | DEFER pending CCPM pilot | User #2 — re-evaluate post-CCPM |
| **OthmanAdi/planning-with-files** | 21k | MIT | 10/10 | **🥇 INSTALL W134-F7** | User #3 (minimalist) — Manus-style markdown-as-working-memory, ALREADY 20k★ |

**Tier 2 verdict**: **INSTALL CCPM + planning-with-files** (parallel pilots — complementary patterns). Defer Task Master.

## Tier 3 — Standards & memory (orthogonal — install both if relevant)

| Candidate | Stars | License | SRA score | Verdict | Notes |
|---|---|---|---|---|---|
| **buildermethods/agent-os** | 4.5k | MIT | 10/10 | **🥇 INSTALL W134-F8** | Standards via `/inject-standards` + `/shape-spec` |
| **russbeye/claude-memory-bank** | 13 | MIT | 4/10 PASS, 5/10 FAIL | DEFER | Pattern interesting but low-star + 224d stale |
| **eee L1 memory stack** | n/a | n/a | INSTALLED | ✅ Active | mcp-memory-service + Graphiti L3 + memory files |

**Tier 3 verdict**: **INSTALL agent-os** (W134-F8). Memory stack already covered; memory-bank cite-only.

## Tier 4 — Curated skill libraries (cite-only never install whole)

| Candidate | Stars | License | Action |
|---|---|---|---|
| ComposioHQ/awesome-claude-skills | 59k | NO LICENSE | ✅ ALREADY CITED in research-protocol.md §6-catalog |
| travisvn/awesome-claude-skills | 12k | NO LICENSE | **🆕 CITE-IMPORT** to research-protocol.md §6-catalog |
| alirezarezvani/claude-skills | 5.2k | MIT | ✅ ALREADY CITED |
| voltagent/awesome-agent-skills | 21k | MIT | ✅ ALREADY CITED |
| hesreallyhim/awesome-claude-code | 43k | CC-BY-SA | ✅ ALREADY CITED |
| anthropics/claude-plugins-official | n/a | n/a | ✅ INSTALLED |
| claudemarketplaces.com (URL) | n/a | n/a | ✅ CITE-URL only |
| skillsmp.com (URL) | n/a | n/a | ✅ CITE-URL only |

**Tier 4 verdict**: cite-only references (already implemented). Add travisvn alongside existing.

## Tier 5 — Reference (read once, bake into setup)

| Candidate | Stars | License | Action |
|---|---|---|---|
| **Piebald-AI/claude-code-system-prompts** | 10k | MIT | **🆕 CITE-IMPORT to citation-discipline.md TIER-2** — reverse-engineered Anthropic CC internals |
| Anthropic `code.claude.com/docs/en/skills` | URL | n/a | ✅ ALREADY CITED |
| Anthropic `code.claude.com/docs/en/best-practices` | URL | n/a | ✅ ALREADY CITED |

**Tier 5 verdict**: CITE-IMPORT Piebald system-prompts as TIER-2 cite-anchor for Anthropic CC internals reference.

## Cross-tier synthesis: NEW INSTALLS from this arc

| Fire | Repo | Tier | Method |
|---|---|---|---|
| W134-F7 | github/spec-kit | Tier-1 | `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` |
| W134-F7 | automazeio/ccpm | Tier-2 | git clone + .claude/skills/ integration |
| W134-F7 | OthmanAdi/planning-with-files | Tier-2 | git clone + .claude/skills/ integration |
| W134-F8 | buildermethods/agent-os | Tier-3 | git clone + `/inject-standards` setup |
| W134-F8 | microsoft/markitdown | Tier-2 (utility) | `pipx install markitdown` |
| W134-F8 | Piebald-AI/claude-code-system-prompts | Tier-5 | cite-import to citation-discipline.md TIER-2 |

**Total new installs proposed**: 5 install-class + 1 cite-import = **6 net new architecture surfaces**.

## Anti-stack divergence (user-research warnings)

User research explicitly warns:
- "**2-3 active plugins, never more**" — eee currently has 26 plugins (per `.mcp.json` server count + marketplaces)
- "Heavyweight orchestration packs (50+ skills) — context bloat is a real cost"
- "Custom planning systems that ignore Plan Mode — Plan Mode + checkpoints + `/rewind` ate that lane"

**eee state analysis**:
- 26 plugins is HEAVY by user-research standard but distributed across distinct domains (memory, eval, observability, CLI, plugin-dev, etc.) — not redundant
- 1,556 SKILL.md across 21 plugins via ECC — user-research warning DIRECTLY applies; consider sub-pruning ECC if context-budget audit shows degradation
- eee Plan Mode integration is via cross-model-consensus T1-T5 cycle, NOT a custom planning system — converges with user-research

**Honest gap**: eee's plugin count exceeds user-research-recommended 2-3 active; **needs `context-budget` audit + ECC selective install** per `everything-claude-code:agent-sort` skill. This is a follow-fire candidate.

## Coverage post-tier-synthesis

| Tier | Total candidates audited | Installed | New install candidates | Cite-only / DEFER |
|---|---|---|---|---|
| Tier 0 | 4 | 3 | 0 | 1 (anthropics/skills via marketplace) |
| Tier 1 | 3+ | 1 (Superpowers) | 1 (spec-kit) | 1 (BMAD DEFER) |
| Tier 2 | 3+ | 0 | 2 (CCPM, planning-with-files) | 1 (Task Master DEFER) |
| Tier 3 | 2+ | 0 (memory stack covered by L1/L3) | 1 (agent-os) | 1 (memory-bank DEFER) |
| Tier 4 | 7+ | 0 | 0 | 7 (cite-only) |
| Tier 5 | 3+ | 0 | 0 | 3 (cite-only — 1 NEW cite-import) |

**Sum**: 22+ tier-1-canonical candidates audited (in addition to 555 v1-v65 + 5 extension already audited).

**Cumulative grand total**: 555 v1-v65 successful + 5 extension + 22 tier-canonical (overlap with v1-v65 but tier-perspective distinct) = effectively the audit baseline. User's stack maps 1:1 to my audit findings with corrections.

## Mia ladder advance

n=880 → n=902 (+22 tier-by-tier-canonical verifications)
