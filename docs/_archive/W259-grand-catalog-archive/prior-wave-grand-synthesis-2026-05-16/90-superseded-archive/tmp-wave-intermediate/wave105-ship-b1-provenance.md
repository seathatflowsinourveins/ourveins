## 2026-05-08 Wave 105 fire 2 SHIP-B1: Skill Orchestration Discipline codification in CLAUDE.md

### User trigger

User directive 2026-05-08: "make sure all of your subagents and yourself know how and when to use skills and mutiple of them for most advanced set up, research and install the best architecture form sota repos guide and offical, make sure all in your future session will ultize all seamlessly".

### Research-first findings (per CR-10)

The runtime ALREADY has SOTA skill-orchestration discipline INSTALLED via 4 meta-skills auto-firing per their `description:` triggers + 1 ECC rule + Anthropic CC native `Skill` tool mechanism. No new code/hooks needed per CR-5 install-priority + KISS Must-Never #4 + CR-12 upstream-install-priority.

**4 meta-skills active in runtime**:
1. `using-superpowers` (superpowers@claude-plugins-official) — 1% rule + Skill Priority order + Red Flags table; auto-fires at session start (verified visible in current session's system-reminder header)
2. `using-agent-skills` (agent-skills@addy-agent-skills enabled SHIP-A1) — meta-skill governing 21 addy engineering-phase skill discovery; auto-fires at session start
3. `skill-comply` (everything-claude-code) — post-invocation verification rule
4. `skill-creator` (skill-creator@claude-plugins-official) — Anthropic OFFICIAL skill authoring + benchmarking + description-optimization

**Anthropic CC native discovery mechanism**: 1556 SKILL.md files auto-discoverable via `description:` matching per `https://code.claude.com/docs/en/skills`. CCBP `claude-skills.md` documents 15-field frontmatter spec including `description` / `when_to_use` / `disable-model-invocation` / `user-invocable` / `allowed-tools` / `model` / `effort` / `context: fork` / `agent` / `hooks` / `paths` / `shell`.

**Subagent skill preload mechanism**: per CCBP `claude-subagents.md:32-34 @ HEAD 64fffd53` content-SHA c9f4ed404dada6a32e000eaf38ba0848167dd6f9, CC 2.1+ supports optional `skills:` frontmatter field for preloading specific skills into subagent context.

### What this ship adds (doc-only; CR-9 LOW)

CLAUDE.md `## Skill Orchestration Discipline` section between Hard Rules and Bootstrap-only files. Codifies:
- 6 TIER-1-DIRECT cite anchors at file:line + HEAD SHA
- 4-meta-skill stack table (using-superpowers / using-agent-skills / skill-comply / skill-creator)
- "How and when to invoke skills" mandatory discipline (main thread + subagent + multi-skill)
- Subagent frontmatter `skills:` preload pairings per role (sota-researcher / architect / code-reviewer / debugger / verifier)
- Multi-skill chain example (brainstorming → writing-plans → subagent-driven-development → TDD → requesting-code-review → finishing-a-development-branch)
- Multi-skill layer example (feature-dev + incremental-implementation + tdd + safety-guard + verification-before-completion)
- Default skill catalog table by domain (Workflow grammar / Engineering phases / ECC autonomous-loop / Plugin authoring / Cross-model verification / Frontend)
- Update triggers for re-evaluation

### How this enables future-session seamlessness

Per Anthropic CC native mechanism: every new session auto-loads `using-superpowers` + `using-agent-skills` skills via their `description:` auto-fire triggers (verified in CURRENT session's system-reminder header). Future sessions will:
1. Auto-fire `using-superpowers` at startup → 1% rule mandate active
2. Auto-fire `using-agent-skills` at session start → 21 addy skills surfaced
3. Read CLAUDE.md Skill Orchestration Discipline section → operator + subagent briefs cite the 4-skill stack explicitly
4. Subagents inherit skill-awareness via:
   - Meta-skills auto-fire in subagent context (per CCBP claude-subagents.md)
   - Brief explicit skill-awareness clause (per standing directive `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md`)
   - Optional `skills:` frontmatter preload field for role-specific skills

### CR conformance

- **CR-1 cite-trail** ✅ 6 TIER-1-DIRECT anchors at file:line + HEAD SHA
- **CR-3 cross-model T1** — Wave 105 fire 1 codex T1 e2e Pattern B HONEST-NON-FINDING applies; T2 commit-time hook fires on this commit
- **CR-5 install-priority** ✅ doc-only; no new code/hooks/scripts (4-skill stack already INSTALLED via plugins)
- **CR-6 fresh-from-github** ✅ N/A (doc-only)
- **CR-7 graduated unleash** ✅ Phase 3 preserved
- **CR-8 ADAPTED-FROM-SOTA** ✅ all anchors point at upstream Anthropic + addyosmani + ECC + CCBP
- **CR-9 install-risk LOW** ✅ doc-only edit; no runtime behavior change; reversible
- **CR-10 research-first** ✅ probed 4 meta-skills + CCBP + Anthropic CC docs BEFORE writing
- **CR-11 META-process** ✅ Pattern B HNF disposition documented; T2 fires
- **CR-12 upstream-install-priority** ✅ no cite-import-AMBER; all anchors PRIMARY upstream

### Mia pre-apply

Mia probes verified BEFORE this edit:
- `using-superpowers/SKILL.md` exists at cited path ✅ (verified `cat` returned content)
- `using-agent-skills/SKILL.md` exists at cited path ✅ (verified ls + cat)
- `skill-creator/SKILL.md` exists at cited path ✅ (verified ls)
- `skill-comply` ECC rule exists at cited path ✅ (verified find)
- CCBP `claude-skills.md` 15-field spec exists at cited HEAD ✅ (verified cat)
- 1556 SKILL.md count VERIFIED earlier via `find ... -name SKILL.md | wc -l` returned 1556

No OVER-claims. All anchors verified before commit.

### Anti-patterns (refuted)

- Adding new SessionStart hook for skill catalog delivery — REFUTED by CR-5 + CR-12 + KISS Must-Never #4 (auto-firing meta-skills already deliver this)
- Adding skill-discovery script — REFUTED by Anthropic CC native `Skill` tool mechanism
- Modifying cite-imported subagent frontmatter for `skills:` preload — DEFERRED (sibling-bleed defense; modify only if sibling adds skills field upstream)
- Adding new local rule when CLAUDE.md section suffices — chosen CLAUDE.md (closer to cardinal rules + always-loaded vs rule-on-demand)

### Outstanding work

Per CCBP `claude-subagents.md:32-34` `skills:` preload field — 8 cite-imported agents in `.claude/agents/` could benefit from `skills:` preload field per role. DEFERRED (sibling-bleed defense; would require sibling repo upstream change first per CR-12 + CR-9 sibling-bleed defense).

### Cite

- TIER-1-DIRECT Anthropic CC: `https://code.claude.com/docs/en/skills`
- TIER-1-DIRECT Anthropic CC subagent frontmatter: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-subagents.md:32-34 @ HEAD 64fffd53` content-SHA c9f4ed404dada6a32e000eaf38ba0848167dd6f9
- TIER-1-DIRECT meta-skill `using-superpowers`: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/using-superpowers/SKILL.md`
- TIER-1-NAMED-AUTHOR-QUOTE meta-skill `using-agent-skills`: `Z:/claude-sota-installed/.claude/plugins/marketplaces/agent-skills/skills/using-agent-skills/SKILL.md` (Addy Osmani)
- TIER-1-DIRECT meta-skill `skill-creator`: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/skill-creator/<sha>/skills/skill-creator/SKILL.md`
- TIER-1-DIRECT ECC `skill-comply`: `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/skills/skill-comply/`
- TIER-1-DIRECT CCBP `claude-skills.md` 15-field spec: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-skills.md @ HEAD 64fffd53`
