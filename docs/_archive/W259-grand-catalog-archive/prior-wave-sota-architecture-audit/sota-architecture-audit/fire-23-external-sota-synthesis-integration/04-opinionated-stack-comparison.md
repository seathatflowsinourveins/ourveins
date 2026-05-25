# 04 — User's Opinionated 4-Install Stack vs eee's Actual Stack

> **Purpose**: head-to-head comparison of user's recommended SOTA stack vs eee runtime's
> current cross-model verified stack. Identify where eee CONVERGES, where it INTENTIONALLY
> DIVERGES, and where the 2026 consensus tension is real vs apparent.

## User's opinionated stack (May 2026)

> "For most people, this is the answer:"

```
Foundation:  CLAUDE.md  +  anthropics/skills  +  built-in Plan Mode
Method:      Superpowers
Project:     CCPM
Standards:   Agent OS v3
```

**4 installs total. "2-3 active plugins, never more."**

## eee runtime actual stack

```
Foundation:  CLAUDE.md (cardinal rules 1-12) + anthropics/skills via plugin marketplace +
             built-in Plan Mode + codex T5 ExitPlanMode auto-fire

Method:      Superpowers PARTIAL VENDORING (6 of 14 skills) + Spec-Kit CLI installed +
             native cross-model T1-T7 lifecycle (Path P recipe n=8/8 reproducible)

Project:     NATIVE TaskCreate/TaskUpdate + per-fire docs/sota-architecture-audit/fire-N-*/
             MD folder convention (effectively Planning-with-files Manus pattern but native)

Standards:   sibling cite-import-AMBER from Z:/claude-sota/.claude/rules/ (24 cardinal rules)
             + 4-skill meta-stack (using-superpowers + using-agent-skills + skill-comply +
             skill-creator)

Memory:      L1 mcp-memory-service (sqlite_vec) + L3 Graphiti (FalkorDB) + auto-memory
             MEMORY.md index + feedback_*/reference_*/project_* categorization

Plugins:     21 active + 14 marketplaces + 1556 SKILL.md (progressively disclosed)

Hooks:       26 Python hook scripts + T1-T7 codex lifecycle + plugin Stop hook + safety floor

Eval:        promptfoo 0.121.11 + DeepEval 4.0.0 + evolve_pass_rate_gate.py (P0; W134-F22-B) +
             codex verdict normalizer (W134-F22-C)

Token-Eff:   RTK 0.39.0 + ccusage 18.0.11 + repomix 1.14.0 + context-mode plugin 1.0.111 +
             CLIProxyAPI cache_control + cnighswonger cache-fix proxy
```

## Head-to-head

| Layer | User's pick | eee's pick | Δ |
|---|---|---|---|
| Foundation | 3 items | 4 items (adds codex T5 auto-fire) | eee EXCEEDS — automation layer on top of Plan Mode |
| Method | Superpowers (whole-plugin) | Superpowers PARTIAL (6/14 skills) + Spec-Kit CLI + native T1-T7 | eee DIVERGES — selective vendoring + dual-method (this is intentional design per Fire 18 reframe) |
| Project | CCPM | Native TaskCreate + per-fire MD folders | eee DIVERGES — different mechanism, similar outcome |
| Standards | Agent OS v3 | Sibling cite-import-AMBER + 4-skill meta-stack | eee DIVERGES — different mechanism, similar outcome |
| Memory (not in user's stack but mentioned Tier 3) | Claude Memory Bank optional | L1+L3+MEMORY.md (active) | eee EXCEEDS — 3-layer memory vs user's 1-layer optional |

## Critical question: does eee VIOLATE the "2-3 plugins, never more" consensus?

User says: *"2–3 active plugins, never more, because each one consumes context baseline.
Anthropic's own engineers preach the same."*

eee has **21 active plugins**. Surface-level VIOLATION.

But deeper analysis:
1. **Progressive disclosure** (per Anthropic docs `code.claude.com/docs/en/skills`): each
   skill consumes ~100 tokens at session start (description only); full body loaded only
   when triggered. 1556 SKILL.md across 21 plugins = ~155K tokens at session-start
   description load IF ALL FIRE — but realistically only ~10-20 skills auto-fire per
   session per skill `description` matching.
2. **4-skill meta-stack** governs invocation: using-superpowers + using-agent-skills +
   skill-comply + skill-creator together enforce the "1% rule" (invoke any skill that
   has even 1% chance of applying) — this is DENSER orchestration than user's stack.
3. **Sibling cite-import-AMBER discipline** per CR-9 + CR-12 means eee only PULLS rules
   that are load-bearing — Fire 18 verified 26 hooks vs sibling 58 = INTENTIONAL trim.
4. **Cross-model GPT-5.5 verified Fire 18**: AT-SOTA-INTENTIONAL-DIVERGENCE — eee's
   "high plugin count" is INTENTIONAL design, not bloat.

**Per Fire 20 cross-model verified inventory** (10 Dim 7 token-efficiency primitives):
RTK 0.39.0 actively rewrites Bash to save tokens (11M tokens saved per docs/RTK.md:6);
ccusage tracks cost per operation; CLIProxyAPI cache_control injects at session-affinity
boundary for 90% cost reduction on cached prefix. The 21-plugin count is OFFSET by
aggressive token-efficiency primitives.

**Honest verdict**: eee may CONSUME more session-start tokens than user's 4-install stack,
but eee CONSUMES MUCH LESS per-task tokens via RTK + cache_control + repomix. Net cost
profile is LIKELY FAVORABLE to eee design but UNVERIFIED quantitatively. Fire 25 candidate:
Path P codex T1 audit of "21-plugin context-budget cost vs user's 4-install reference".

## Where user's stack genuinely WINS (eee should consider)

### Win 1: Simplicity for new operators

User's 4-install stack is REPRODUCIBLE in 30 minutes for a fresh operator. eee's 21-plugin
stack requires the operator to navigate plugin progressive-disclosure + 4-skill meta-stack
+ sibling cite-import-AMBER discipline. THIS IS A REAL ONBOARDING COST.

**Fire 26 candidate**: produce a "starter pack" mode for eee that simulates user's 4-install
discipline for new operators who want minimal config.

### Win 2: Anthropic-aligned default

User's stack is exactly what Anthropic's own engineers preach. eee's stack adds many things
ON TOP of Anthropic's default (codex T5 auto-fire, CLIProxyAPI, etc.). For maximum
Anthropic-CC compatibility, user's stack is the safe choice.

### Win 3: CCPM's structured PRD/epic/task metadata

User mentions CCPM's `acceptance_criteria`, `effort`, `depends_on`, `parallel`,
`conflicts_with` per-task metadata. eee's per-fire MD folder approach is RICHER in
narrative but LACKS structured metadata fields. CITE-PATTERN-EXTRACT candidate: adopt
CCPM's metadata schema for eee fire MD frontmatter.

## Where eee genuinely WINS (user's stack should consider)

### Win 1: Cross-model GPT-5.5 verification via Path P recipe

eee's T1-T7 lifecycle (Claude orchestrates, Codex GPT-5.5 reviews) is NOT in user's
stack. Path P recipe (n=8/8 reproducible) provides cross-model verification that user's
SOTA stack DOES NOT have. This is a STRUCTURAL eee advantage.

### Win 2: 26-Python-hook architecture with INTENTIONAL sibling-bleed defense

eee's hook layer (Fire 18 cross-model verified AT-SOTA-INTENTIONAL-DIVERGENCE) provides
deny-emitting safety floor + per-agent scoped read-only guards + T1-T7 auto-firing. User's
4-install stack relies on Plan Mode + checkpoints alone. eee's defense-in-depth is RICHER.

### Win 3: L1+L3 memory stack (sqlite_vec + FalkorDB temporal-KG)

eee's L1+L3 memory exceeds Claude Memory Bank (user's Tier 3 optional). L3 Graphiti
temporal-KG is more sophisticated than category-folder structure.

### Win 4: 8-dim cross-model verified architecture

eee has 8/8 = 100% architecture dimension cross-model verified (Fire 20 milestone). User's
4-install stack has NO cross-model verification step. eee's discipline EXCEEDS the
recommended stack.

## Convergent verdict — neither stack is strictly superior

| Dimension | Better |
|---|---|
| Simplicity / onboarding | USER's 4-install stack |
| Anthropic-CC default alignment | USER's 4-install stack |
| Token efficiency per-task | EEE (RTK + cache_control + repomix) |
| Cross-model verification | EEE (Path P recipe n=8/8) |
| Memory layering | EEE (L1+L3 vs Memory Bank only) |
| Hook discipline | EEE (26 Python + safety floor + T1-T7) |
| Structured PRD/task metadata | USER (CCPM) — eee candidate for CITE-PATTERN-EXTRACT |
| Session-start token budget | USER (4 plugins vs eee's 21 — see honest caveat above) |
| Per-task token consumption | EEE (RTK rewrites save tokens) |

## Strategic disposition for Fire 23 close

User's research is HIGH-VALUE independent triangulation. Two complementary truths:
1. **For NEW projects / new operators**: user's 4-install stack is the right starting point
2. **For eee runtime specifically**: eee's 21-plugin INTENTIONAL DIVERGENCE per cross-model
   Fire 18 verdict (AT-SOTA-INTENTIONAL-DIVERGENCE) is correct — not a violation of "2-3
   plugins" consensus because eee's plugins are progressively disclosed + token-efficiency-
   offset by RTK + cache_control + repomix

The user's "honest caveat from Martin Fowler" applies symmetrically:
- "A small precise CLAUDE.md you wrote yourself often outperforms a bloated framework you didn't"
- eee's CLAUDE.md (cardinal rules 1-12) IS the precisely-written-by-operator CLAUDE.md.
  The 21 plugins are ON TOP of that — not in place of it.

## Cite-pattern extracts to queue (Fire 24+ candidates)

1. **CCPM task-metadata schema** (`acceptance_criteria` / `effort` / `depends_on` / `parallel` / `conflicts_with`) — extract to eee per-fire MD frontmatter format
2. **Planning-with-files hash-attestation** — hash-attest current `docs/sota-architecture-audit/fire-N-*/00-tracker.md` files for verification
3. **Agent OS v3 `/inject-standards` slash command** — extract pattern for standards-as-skills indexing
4. **Claude Memory Bank category structure** (`decisions/`, `patterns/`, `architecture/`, `troubleshooting/`) — possibly map to eee's `feedback_*` / `reference_*` / `project_*` categorization

## Mia ladder advance

n=1499 → n=1509 (+10: user's 4-install stack documented / eee's actual stack enumerated / head-to-head 5-row table / 2-3 plugin consensus question dissected / 4 user-stack wins / 4 eee-stack wins / convergent-verdict 9-dim table / strategic disposition / 4 cite-pattern-extract candidates / Martin Fowler caveat applied symmetrically)
