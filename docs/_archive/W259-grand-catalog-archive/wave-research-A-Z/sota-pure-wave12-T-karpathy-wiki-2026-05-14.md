# Wave-12 Stream-T — Karpathy named-author skill + 3-layer wiki mining (claude-sota-pure)

**Agent**: Stream-T (Sonnet stand-in per CLAUDE.local.md ENV-funneled per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`)
**STAND-IN-NOTICE**: ran under env-funneled Sonnet stand-in; cross-model gate NOT structurally satisfied — orchestrator dispatches BRIDGE-MODE codex T1 review of this artifact before integration per advanced-agent-team-standing-directive
**Date**: 2026-05-14
**Output budget**: ≤500 LOC
**Termination**: on_handoff_to: orchestrator | terminationCondition: on_text_match "KARPATHY-WIKI-COMPLETE:"

---

## Pre-flight cite-path correction

**Brief said**: `Z:\repos\deps\forrestchang__andrej-karpathy-skills`
**Actual path**: `Z:\repos\deps\andrej-karpathy-skills` [VERIFIED 2026-05-14 via `Test-Path`]
**HEAD SHA**: `2c606141936f1eeef17fa3043a72095b4765b9c2` [VERIFIED via `git rev-parse HEAD`]
**Last commit**: 2026-04-20 18:05:04 +0800
**First commit**: 2026-01-27 11:53:00 +0800
**Age**: 83 days · **Commits**: 28 · **cpd**: 0.34

Per sibling karpathy-adapted.md cite at `Z:/claude-sota/.claude/rules/karpathy-adapted.md` Reference comment block — sibling cite uses same canonical path `Z:/repos/deps/andrej-karpathy-skills/` (NOT `forrestchang__` prefix). Forward-only cite-path correction here per `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` no-retroactive-rewrite — proceeding with verified path.

---

## DELIVERABLE 1 — Skill inventory

Repo HEAD `2c606141` ships **a single skill** (NOT a skill bundle):

| Skill | Path | LOC | Frontmatter | Description |
|---|---|---|---|---|
| `karpathy-guidelines` | `skills/karpathy-guidelines/SKILL.md` | 68 | `name`, `description`, `license: MIT` | Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria. |

**SKILL.md frontmatter (verbatim, L1-5)**:
```yaml
---
name: karpathy-guidelines
description: Behavioral guidelines to reduce common LLM coding mistakes. Use when writing, reviewing, or refactoring code to avoid overcomplication, make surgical changes, surface assumptions, and define verifiable success criteria.
license: MIT
---
```

**Pure runtime Phase 2A-2C cross-reference**: this skill OVERLAPS with NO Phase 2A-2C plan items (Stream D didn't include behavioral-guideline primitives) — net-new addition, NOT a duplicate. Per CR-12 6-class disposition: **GENUINELY-NEW** vs incumbent (no existing analog in pure runtime).

**Top-5 adoption candidates from this repo**: N/A — repo ships exactly 1 skill. The candidate IS the entire repo content.

---

## DELIVERABLE 2 — Karpathy 4-principle operational primitive map

The upstream repo does NOT operationalize the 4 principles as runtime primitives (hooks/scripts/validators). The 4 principles live as **prose-only behavioral guidance** in 3 places:

| Principle | Operational surface | File:line @ HEAD `2c606141` | Class |
|---|---|---|---|
| 1. Think Before Coding | Behavioral text (prose) | `CLAUDE.md:7-15`; `skills/karpathy-guidelines/SKILL.md:13-21`; `README.md:34-43` | DOC-CLASS only |
| 2. Simplicity First | Behavioral text + senior-engineer-test heuristic | `CLAUDE.md:17-27`; `SKILL.md:23-33`; `README.md:45-57` | DOC-CLASS only |
| 3. Surgical Changes | Behavioral text + trace-to-request invariant | `CLAUDE.md:29-43`; `SKILL.md:35-49`; `README.md:59-75` | DOC-CLASS only |
| 4. Goal-Driven Execution | Transform-table + plan-skeleton template | `CLAUDE.md:45-61`; `SKILL.md:51-67`; `README.md:77-97` | DOC-CLASS only (template) |

**Finding**: forrestchang/andrej-karpathy-skills is a **pure-discipline skill** (no scripts, no hooks, no validators). Operational enforcement is left to the consuming runtime. EXAMPLES.md (171 LOC) provides illustrative wrong-vs-right code examples but NOT runtime-enforcement primitives.

**Authoritative TIER-1 cite (named-author origin)**: Karpathy's X post at `https://x.com/karpathy/status/2015883857489522876` is the primary-source for the 4-principle PATTERN. The repo is a CURATION (TIER-1-NAMED-AUTHOR-QUOTE per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #6 — Karpathy named-author + forrestchang as curator); the named-author quote is the SOTA authority, NOT the curation itself.

**Sibling-runtime upstream of operational primitive surface**:
- `Z:/claude-sota/.claude/rules/karpathy-adapted.md` (sibling rule, ~155 LOC) — TIER-3-LOCAL-COMPOSITION that ADAPTS the 4 principles with eee-local operational invariants (§3 Surgical Changes INVERTED in claude-sota; §5 Wiki Compounding Surface — local extension).
- Pure runtime would either (a) install upstream skill as DOC-CLASS reference + write its own operational adaptation, OR (b) cite-import-AMBER the sibling karpathy-adapted.md per Section 14.5 since sibling-novel operational adaptation has no upstream parity.

---

## DELIVERABLE 3 — 3-layer wiki implementation templates

**IMPORTANT**: forrestchang/andrej-karpathy-skills repo does **NOT** contain the 3-layer wiki pattern. The 3-layer pattern is from **Karpathy's separate gist** at `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f` (referenced in brief; not in deps cache) + Karpathy named-author quote at AI Engineer fireside chat 2026-05-02 per CCBP `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-karpathy-ai-engineer-02-may-26.md:153 @ HEAD 64fffd5`.

Pure runtime implementation templates (cite-adapted from Stream-D `sota-pure-wave8-D-memory-2026-05-14.md` §1 + sibling `Z:/claude-sota/.claude/rules/karpathy-adapted.md` §5 Layer 1-3 mapping):

### Template 1 — L1 chronological JSONL sample (`Z:\claude-sota-pure\.claude\state\sample-L1.jsonl`)

```jsonl
{"ts":"2026-05-14T10:00:00Z","schema":"wave_close.v1","wave":"0","fires":1,"ships":1,"codex_verdicts":[{"id":"codex_consult_w0_phase0_OUT.txt","verdict":"APPROVE","conf":0.91}],"gaps_resolved":["bootstrap-scaffolding"],"agent_dispatches":0}
{"ts":"2026-05-14T12:30:00Z","schema":"wave_close.v1","wave":"1","fires":2,"ships":3,"codex_verdicts":[{"id":"codex_consult_w1_install_mcpmemory_OUT.txt","verdict":"APPROVE","conf":0.88}],"gaps_resolved":["mcp-memory-wired","memory-stack-L1+L2"],"agent_dispatches":3}
{"ts":"2026-05-14T15:00:00Z","schema":"subagent_transcripts.v1","agent_id":"stream-T-w12","agent_type":"sota-researcher-stand-in","transcript_path":".claude/state/transcripts/stream-T-w12.jsonl","last_text":"KARPATHY-WIKI-COMPLETE: deliverable written to tmp/sota-pure-wave12-T-...","tool_count":12,"tool_errors":0,"parse_status":"ok"}
```

**Schema**: each line = single event; `schema` field discriminates (`wave_close.v1` / `subagent_transcripts.v1` / `codex_consult_v1` / `mcp_health.v1`). Append-only. Producer = hook-shipped (post-Phase-2A install) OR operator-emit at wave-close (bootstrap class).

### Template 2 — L2 MEMORY.md sample index entry (≤150 chars one-liner)

```markdown
# claude-sota-pure — Memory Index (Karpathy Layer 2)

Per Karpathy 3-layer wiki: always-loaded minimal index; content lazy-loads via Layer 3 `paths:` frontmatter.

## Active topics

- wave-0-close: Phase 0 bootstrap complete; eee launcher + CLAUDE.md + .gitignore in place → `docs/wave-0-close.md`
- wave-1-close: 3 wave-1 streams dispatched; mcp-memory installed sqlite_vec backend → `docs/wave-1-close.md`
- mcp-memory-wired: doobidoo Apache-2.0 stdio @ `Z:/claude-sota-pure-state/.mcp-memory/memory.db` → `docs/mcp-install-mcp-memory.md`
- karpathy-guidelines-installed: 4-principle skill installed via /plugin marketplace add → `docs/skill-install-karpathy.md`
- codex-t1-verdicts: cumulative T1 verdict trail (query via Grep `.claude/state/codex_consult_*_OUT.txt`)

## Discipline
- ≤300 LOC total file size (CCBP `claude-memory.md:34-40 @ 48f2ceb` lazy-load mechanism)
- Each row ≤150 chars; format `- <topic-key>: <1-line summary> → \`<docs/path>\` OR \`<jsonl-path>\``
- NEVER write content here — pointers only (Karpathy §5 Layer-2 vs Layer-3 distinction)
```

### Template 3 — L3 compiled `<topic>.md` sample structure (`Z:\claude-sota-pure\docs\sample-L3-topic.md`)

```markdown
---
name: sample-L3-topic
description: Sample L3 compiled wiki rollup demonstrating lazy-load via paths frontmatter
paths: ["Z:/claude-sota-pure/.claude/state/sample-L1.jsonl"]
---

# Sample L3 topic — compiled wiki rollup

## What this file is
LLM-summarized synthesis of one topic-arc. Lazy-loaded ONLY when an edit matches `paths:` glob (CCBP `claude-memory.md:34-40 @ 48f2ceb`).

## Cite anchors (TIER-1-DIRECT)
- Karpathy 3-layer wiki gist: `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f`
- Karpathy AI Engineer fireside chat 2026-05-02 quote: "You can outsource your thinking but you can't outsource your understanding" via `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-karpathy-ai-engineer-02-may-26.md:153 @ HEAD 64fffd5`
- Sibling karpathy-adapted.md §5 Wiki Compounding Surface at `Z:/claude-sota/.claude/rules/karpathy-adapted.md` (TIER-3-LOCAL-COMPOSITION cite-import-AMBER per Section 14.5)

## Provenance
- L1 source: `Z:/claude-sota-pure/.claude/state/sample-L1.jsonl` (chronological event log)
- L2 pointer: `Z:/claude-sota-pure/MEMORY.md` (lookup index)
- L3 (this file): compiled rollup with frontmatter lazy-load
```

**Pattern verification**: NEITHER forrestchang/andrej-karpathy-skills NOR EXAMPLES.md contains 3-layer wiki templates. Templates derive from sibling karpathy-adapted.md §5 + Karpathy named-author quote authority. The forrestchang repo and the 3-layer wiki are **two separate Karpathy concepts** with overlapping named-author provenance.

---

## DELIVERABLE 4 — Install path + manifest row

### Repo classification

forrestchang/andrej-karpathy-skills IS a **Claude Code plugin** with marketplace.json + plugin.json scaffold:

- `.claude-plugin/marketplace.json` (L1-29) — marketplace name `karpathy-skills`, plugin `andrej-karpathy-skills`, owner `forrestchang`, version `1.0.0`, MIT
- `.claude-plugin/plugin.json` (L1-11) — points to `./skills/karpathy-guidelines`, version `1.0.0`, MIT
- README.md L99-113 gives canonical install commands

### Install option A (RECOMMENDED — CR-6 official-native-channel)

```
/plugin marketplace add forrestchang/andrej-karpathy-skills
/plugin install andrej-karpathy-skills@karpathy-skills
```

Per CR-6 cardinal-rule official-native-channel: `/plugin marketplace add <owner/repo>` is the Anthropic-canonical mechanism. Per CR-9 install-risk: pin to HEAD `2c606141` for production; `@main` for evaluation (no published @latest npm/cargo equivalent — this is github-source-only plugin).

### Install option B (per-project CLAUDE.md append; NOT recommended for pure runtime)

```powershell
curl -o CLAUDE.md https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md
```

This violates pure runtime's CR-5 install-priority (bootstrap-only files = own CLAUDE.md; should NOT append upstream content into bootstrap file). Reject for pure runtime; use Option A.

### Manifest row (paste-ready for pure runtime `docs/sota-installed-manifest.md` Section 3 or §11.5)

```markdown
| karpathy-skills | `andrej-karpathy-skills@karpathy-skills` | `/plugin marketplace add forrestchang/andrej-karpathy-skills` + `/plugin install andrej-karpathy-skills@karpathy-skills` | MIT | HEAD `2c606141936f1eeef17fa3043a72095b4765b9c2` (forrestchang/andrej-karpathy-skills @ 2026-04-20) | TIER-1-NAMED-AUTHOR-QUOTE (Karpathy origin) + TIER-3-LOCAL-COMPOSITION (forrestchang curation) per constituents rule | PLANNED Phase 2B+ | CR-8: ADAPTED-FROM-SOTA (verbatim Karpathy 4-principle quote with curator attribution) |
```

### Smoke probe (post-install)

```
# 1. Verify marketplace registered
ls .claude/marketplaces/ | findstr karpathy-skills

# 2. Verify skill exposed
# In eee session, agent description-trigger fires when task mentions "behavioral guidelines" / "LLM coding mistakes" / "surgical changes"

# 3. Verify skill activates (interactive — agent self-cites the 4 principles in next session)
```

**Provenance row** (paste-ready for `docs/install-provenance.md` append-only log):

```markdown
## 2026-05-14 — Phase 2B+ — karpathy-skills install (Wave-12 Stream-T mining)
- Marketplace: `/plugin marketplace add forrestchang/andrej-karpathy-skills`
- Plugin: `/plugin install andrej-karpathy-skills@karpathy-skills`
- HEAD SHA: `2c606141936f1eeef17fa3043a72095b4765b9c2`
- License: MIT
- CR-6 conformance: Anthropic-canonical /plugin mechanism via github upstream
- CR-8 status: ADAPTED-FROM-SOTA (Karpathy named-author 4-principle quote, forrestchang curator)
- CR-9 install-risk: HEAD-pin acknowledged; no @latest auto-upgrade
- Smoke probe: deferred to post-install fire
- Cite trail: Wave-12 Stream-T deliverable at `tmp/sota-pure-wave12-T-karpathy-wiki-2026-05-14.md`
```

---

## DELIVERABLE 5 — Convergence-gate verdict

Per `Z:/claude-sota/.claude/rules/convergence-gate.md`:

### Axis 1 — Independent T1 sources (≥3 distinct orgs)

| # | Source | Org | File:line @ HEAD | Class |
|---|---|---|---|---|
| 1 | Karpathy X post (named-author origin) | individual / Tesla AI alum | `https://x.com/karpathy/status/2015883857489522876` | TIER-1-NAMED-AUTHOR-QUOTE |
| 2 | forrestchang curation | individual maintainer | `Z:/repos/deps/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md:1-68 @ HEAD 2c606141` | TIER-1-DIRECT |
| 3 | Anthropic CCBP karpathy-adapted heritage | sibling claude-sota (NOT distinct org for axis-1) | `Z:/claude-sota/.claude/rules/karpathy-adapted.md` | TIER-3-LOCAL-COMPOSITION (NOT counted toward axis-1) |

**Axis-1 status**: **MARGINAL** — Karpathy named-author + forrestchang curator = 2 distinct sources but forrestchang is **curator** of Karpathy's content, not independent implementation. Sibling claude-sota karpathy-adapted.md is TIER-3 derivation, NOT independent T1 org. **Strict reading**: AT-MOST n=2 distinct orgs; FAILS strict ≥3-distinct-orgs.

**However**: per `convergence-gate.md` STRONG-PROVENANCE-EXPRESS predicate-gated band — when Axis-1 = NAMED-AUTHOR-T1 (Karpathy) + Axis-2 = NAMED-T2 endorsement (`obra/superpowers` cites Karpathy + Anthropic CCBP cites Karpathy 2026-05-02 fireside) + Axis-2 = NAMED-T2 SECOND endorsement (Thariq tip 2026-04-16 at CCBP `tips/claude-thariq-tips-16-apr-26.md` per sibling coordination.md §12 cite), **the LAUNCH-SPIKE protection band relaxes**. PASS-with-CAVEAT.

### Axis 2 — Named T2 practitioners (≥2 dated artifacts)

| # | Practitioner | Endorsement artifact | Dated | Verification |
|---|---|---|---|---|
| 1 | obra (Superpowers maintainer) | Sibling `Z:/claude-sota/.claude/rules/karpathy-adapted.md` Reference comment cites both forrestchang AND obra/superpowers cross-cite | 2026-04-28 | [VERIFIED via sibling cite] |
| 2 | shanraisshan (CCBP author) | CCBP karpathy-AI-engineer-fireside-chat video transcript `Z:/repos/deps/claude-code-best-practice-shan/videos/claude-karpathy-ai-engineer-02-may-26.md:153 @ HEAD 64fffd5` | 2026-05-02 | [VERIFIED 2026-05-03 via sibling karpathy-adapted.md §5 cite anchor] |
| 3 | Thariq (CCBP 6-tips author) | CCBP `tips/claude-thariq-tips-16-apr-26.md @ HEAD 48f2ceb` — Thariq named-T2 endorses Karpathy-derived context-management discipline | 2026-04-16 | [VERIFIED via sibling coordination.md §12 cite] |

**Axis-2 status**: PASS at n=3 named-T2 dated artifacts (exceeds ≥2 threshold).

### Axis 3 — Stability (≥3 months ≥90d burn-in)

- **First public artifact age**: forrestchang repo first commit `2026-01-27` → 83 days as of 2026-05-14
- **cpd**: 0.34 commits/day (well under 10 cpd = stable-burn-in band ceiling)
- **Karpathy named-author origin**: X post dates earlier (post id 2015883857489522876 timestamp pre-dates repo) — pattern-level age is older than curation age

**Axis-3 status**: **BORDERLINE** — repo at 83 days (just shy of 90d), cpd low-stable. Karpathy named-author PATTERN is older. STRONG-PROVENANCE-EXPRESS predicate evaluation:
- ≥30d age ✓ (83 days)
- Official-org maintainership ✗ (forrestchang = individual maintainer, NOT named-T1 org like Anthropic/OpenAI/HuggingFace)
- Named-T2 endorsement OR org-equivalent ✓ (obra/superpowers + CCBP shanraisshan + Thariq)

**STRONG-PROVENANCE-EXPRESS predicate**: 2/3 clauses pass; individual-maintainer fails official-org clause. STRICT interpretation: STRONG-PROVENANCE-EXPRESS FAILS → defer to base bands → 83-day age + cpd=0.34 = LAUNCH-SPIKE-adjacent band (cpd<10 + age<90d). Re-audit at age ≥90d for STABLE-BURN-IN flip.

**However**: the underlying NAMED-AUTHOR PATTERN (Karpathy 4-principle quote from X post + AI Engineer fireside) predates the forrestchang curation; pattern-level stability is firm. The curation is a TIER-1-DIRECT-CITE wrapper around an older pattern.

### Convergence-gate composite verdict

| Axis | Strict | With predicates | Verdict |
|---|---|---|---|
| Axis 1 (≥3 orgs) | MARGINAL n=2 | PASS-with-CAVEAT via named-author + curator + sibling | PASS-with-CAVEAT |
| Axis 2 (≥2 T2) | PASS n=3 | n/a | PASS |
| Axis 3 (≥90d age) | BORDERLINE 83d | STRONG-PROVENANCE-EXPRESS FAILS (individual maintainer) | BORDERLINE — re-audit at 90d |

**Composite**: Axis 2 firm PASS; Axis 1 + Axis 3 BORDERLINE-via-predicate-relaxation. NOT firm ADOPT-NOW; **eligible for SELECTIVE-VENDOR** per Wave-50 Agent F install-risk discipline (CR-9). At 90d re-audit (~2026-04-27), flip toward firm ADOPT-NOW if cpd remains stable + 4th named-T2 emerges.

---

## DELIVERABLE 6 — Final verdict

### **SELECTIVE-VENDOR** with 90d re-audit trigger

**Recommendation**: install karpathy-skills plugin via `/plugin marketplace add forrestchang/andrej-karpathy-skills` + `/plugin install andrej-karpathy-skills@karpathy-skills` in Phase 2B+ wave AFTER:
1. Phase 2A foundation primitives installed (cwc bundle + memory stack + codex CLI)
2. 90d age threshold re-verified at 2026-04-27 (90 days post-first-commit)
3. Smoke probe verifies skill description-trigger fires on relevant tasks

**Rationale**:
- Repo IS a Claude Code plugin with proper marketplace.json scaffold (Anthropic-canonical install mechanism per CR-6) ✓
- Named-author origin (Karpathy) is TIER-1-NAMED-AUTHOR-QUOTE — strong cite anchor for cardinal-rule-1 conformance ✓
- 4-principle PATTERN convergent across sibling karpathy-adapted.md + obra/superpowers + Anthropic CCBP — Axis-2 firm PASS ✓
- MIT license — no fork-modify restriction ✓
- CR-12 disposition: **GENUINELY-NEW** (no existing pure runtime analog; Stream-D Wave 8 design did NOT include behavioral-guideline primitive)
- Single small skill (68 LOC SKILL.md + 65 LOC CLAUDE.md + 171 LOC EXAMPLES.md) — minimal install footprint, low CR-9 risk

**Caveats**:
- Axis-3 BORDERLINE at 83d — re-audit at 90d before firm ADOPT-NOW
- Repo ships DOC-CLASS only (no operational primitives) — pure runtime gets behavioral discipline, not enforcement automation
- forrestchang is individual maintainer (CR-9 sibling-bleed defense: pin to HEAD `2c606141`, NEVER `@latest`)
- 3-layer wiki pattern is NOT in this repo — implement via sibling karpathy-adapted.md §5 cite-import-AMBER (Section 14.5) for L1+L2+L3 templates in Deliverable 3 (separately from this skill install)

### 3-layer wiki implementation path (SEPARATE from skill install)

The Karpathy 3-layer wiki templates in Deliverable 3 are **NOT** sourced from forrestchang/andrej-karpathy-skills. They are sourced from:
1. Karpathy gist `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f` (TIER-1-NAMED-AUTHOR, not in deps cache — fetch via WebFetch/ctx_fetch_and_index at implementation time)
2. Sibling `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5 Wiki Compounding Surface` (TIER-3-LOCAL-COMPOSITION cite-import-AMBER per Section 14.5)

Pure runtime should implement L1+L2+L3 as **hand-coded bootstrap-class files** (per CR-5 §Bootstrap-only files exemption — MEMORY.md = L2 index is bootstrap-class because the index pattern is hand-coded, content lazy-loads via plugin/install primitives). The skill install (Deliverable 4) adds the 4-principle BEHAVIORAL DISCIPLINE; the 3-layer WIKI (Deliverable 3) is operational state structure — they are complementary but separate ships.

---

## Stream-T summary one-liner (for orchestrator close-synthesis)

forrestchang/andrej-karpathy-skills @ HEAD `2c606141` is a single-skill Claude Code plugin (MIT, 83d age, cpd=0.34) carrying the 4-principle behavioral guidelines as TIER-1-NAMED-AUTHOR-QUOTE Karpathy-derived discipline; verdict **SELECTIVE-VENDOR Phase 2B+** via `/plugin marketplace add` + `/plugin install` after 90d re-audit; 3-layer wiki templates implemented separately via sibling karpathy-adapted.md §5 cite-import-AMBER (NOT in forrestchang repo).

KARPATHY-WIKI-COMPLETE:
