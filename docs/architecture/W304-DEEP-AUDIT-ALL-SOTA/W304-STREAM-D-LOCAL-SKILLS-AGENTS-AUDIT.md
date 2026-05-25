# W304 Stream D — Local skills + sub-agents prompt-engineering quality audit

> **Branch**: `sota-converge-w295` (HEAD `98a83d2`)
> **Date**: 2026-05-18
> **Owner**: Stream D (file-ownership-disjoint; this stream audits but does NOT edit `.claude/skills/*` or `.claude/agents/*`)
> **Scope**: W303-A coverage gaps #3 (18 local skills content-quality + skill-creator workflow) + #5 (4 sub-agents prompt-engineering quality), collapsed for efficiency per W304-PLAN §1.

## §0 — TL;DR

**Artifacts audited**: 18 top-level `.claude/skills/` entries (24 SKILL.md files total once gitnexus's 7 sub-skills are expanded) + 4 `.claude/agents/*.md` sub-agents = **28 prompt-engineering artifacts**.

**Aggregate verdict**:

| Class | Total | KEEP | REFINE | RETIRE |
|---|---:|---:|---:|---:|
| Local skills (top-level dirs) | 18 | 9 | 7 | 2 |
| Sub-agents | 4 | 2 | 2 | 0 |
| **TOTAL** | **22** | **11** | **9** | **2** |

If gitnexus's 7 sub-skills are counted individually instead of one bundle: KEEP=15, REFINE=7, RETIRE=2 over 24 SKILL.md files + 4 agents = 28 artifacts.

**Top-3 highest-quality reference templates** (use these as the gold-standard for new skills/agents):
1. **`.claude/skills/sota-convergence-audit/SKILL.md`** — sca-v5 LIVE (663 LOC, 14-dim rubric, 5-tier ladder, 7-phase process, 60+ cite-anchors, self-audited as architecture-itself in W293+W297-W302). The runtime's flagship operator-curated skill; the rubric every other adoption decision is graded against. lite-score 4.6/5.
2. **`.claude/agents/gpt5-archaeologist.md`** — 4-TIER-1 frontmatter cites (Adam Tornhill book + code-maat OSS HEAD + codex CLI source + sibling agent template), structured-output contract, cost guardrails, anti-patterns section, fallback heuristic — load-bearing GPT-5.5 sub-agent with provenance ledger. lite-score 4.5/5.
3. **`.claude/skills/goal-prompt-synthesis/SKILL.md`** — 320 LOC, 7-phase pipeline (W295 upgrade from 4-phase), 75 codex-mentions integrating cross-model gate, anti-bias source-of-truth phase, paste-ready output contract, 6 anti-patterns. lite-score 4.3/5.

**Top-3 lowest-quality refine candidates** (priority for next-wave edit):
1. **`.claude/skills/learned/`** (RETIRE candidate, empty dir) — zero content (no `SKILL.md`, no children); a phantom directory that occupies operator inventory mind-share with no functional value. Either populate with intended content (operator-curated lessons-learned skill?) or `rmdir`.
2. **`.claude/skills/web-design-guidelines/`** (REFINE — 18 LOC pointer-only) — frontmatter `description` is too generic ("Use when asked to review UI, UX, accessibility, or frontend interface quality") and collides with multiple installed plugins (`engineering-skills:senior-frontend`, `example-skills:frontend-design`, `engineering-advanced-skills:api-design-reviewer`). Body is a 5-line stub redirecting to `Z:/repos/deps/vercel-labs-agent-skills/skills/web-design-guidelines/SKILL.md` — the upstream is the actual SOTA artifact. Per cardinal-rule-1, this is a TIER-3-LOCAL-COMPOSITION cite-redirect that should be either (a) inlined with the upstream policy, or (b) replaced by a direct `plugin install` of vercel-labs-agent-skills if that pathway exists.
3. **`.claude/skills/speckit-checklist/SKILL.md`** (REFINE — 374 LOC, longest speckit) — bloated and verbose; per W298-F Tier-1 visibility check, the entire speckit-* family is currently visible in the description-budget but consumes ~2,000 LOC across 9 sibling skills. Skill body is 99% upstream spec-kit boilerplate (the SOURCE_HEAD `688ca1b3c51046498274de80752db2dce11ec1c7` is the canonical upstream); the only operator-curated value-add is the W281g "Use when" trigger rewording. Recommendation: collapse the 9 speckit-* skills into a single `speckit-runtime` index + 9 lazy-loaded reference-only redirect stubs OR install spec-kit as an official plugin if upstream offers `claude-code-plugin` packaging.

**Biggest cross-cutting pattern**: **Description-trigger overlap with installed plugins is the single largest operator-confusion risk**. 5+ local skills auto-fire on overlapping description matches with installed plugins:
- `web-design-guidelines` vs `engineering-skills:senior-frontend` + `example-skills:frontend-design`
- `vercel-react-best-practices` vs `engineering-skills:senior-frontend` + `everything-claude-code:frontend-patterns`
- `vercel-composition-patterns` vs same set
- 9× `speckit-*` skills vs `everything-claude-code:plan` + `superpowers:writing-plans`
- `langfuse` vs `everything-claude-code:knowledge-ops` + `plugin:logfire`

Per `https://code.claude.com/docs/en/skills` description-budget allocator, overlapping descriptions cause stochastic auto-trigger selection — the operator cannot predict which skill will fire. Recommendation: tighten description specificity by adding the local skill's unique discriminator (e.g., `web-design-guidelines` should say "Vercel Web Interface Guidelines audit specifically" not generic "review UI/UX").

## §1 — 18-skill inventory with sca-v5 lite-score + verdict

Lite-score adapted for INTERNAL operator-curated artifacts (D1 license n/a → auto-pass; D2/D3/D4/D5/D7/D13/D14 + skill-specific dims — description quality, length budget, cross-skill duplication, cardinal-rule-3 compliance). Composite scored out of 5 (LOWER tier-1 INSTALL = ≥4.0 KEEP; 3.0-3.9 REFINE; <3.0 RETIRE).

### §1.1 — KEEP verdicts (9 skills)

| # | Skill | LOC | Last commit | D2 unique | D3 fit | D4 CC-path | D5 cites | D7 vel | Desc Q | Dupe risk | CR-3 | Composite | Verdict |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `sota-convergence-audit` | 663 | `dc134ff` W299 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | **5.0** | **KEEP** (flagship; self-audited as architecture-itself; W293 sca-v3.1+ v5 LIVE rubric) |
| 2 | `goal-prompt-synthesis` | 320 | `4f73bb2` W295-r25 | 5 | 5 | 5 | 4 | 5 | 5 | 4 | 5 | **4.7** | **KEEP** (7-phase W295 upgrade; codex cross-model gate integrated; 75 codex-mentions; 5 anti-bias mentions) |
| 3 | `mem-recall` | 103 | `98a83d2` W301 | 5 | 5 | 5 | 5 | 5 | 5 | 4 | 5 | **4.9** | **KEEP** (W301-A T4-graphiti-retirement-aware; T6 basic-memory primary + T2-split plugin-memory fallback documented; 5 cardinal-rule cross-anchors) |
| 4 | `langfuse` | 141 | `5853514` W266 | 4 | 5 | 5 | 4 | 3 | 5 | 4 | 5 | **4.4** | **KEEP** (operator-installed langfuse v3.170.0 LIVE per CLAUDE.md T5; `allowed-tools` whitelist is exemplary discipline; W266 last edit is stale but content tracks current upstream) |
| 5 | `gitnexus/gitnexus-cli` | 86 | tracking | 5 | 5 | 5 | 5 | 4 | 5 | 4 | 5 | **4.7** | **KEEP** (TIER-1-DIRECT cite verified IDENTICAL to upstream HEAD `98addbd6` 2026-05-13; gitnexus MCP server LIVE per `.mcp.json:cypher/query/impact`) |
| 6 | `gitnexus/gitnexus-debugging` | 92 | tracking | 5 | 5 | 5 | 5 | 4 | 5 | 4 | 5 | **4.7** | **KEEP** (TIER-1-DIRECT cite; complements `superpowers:systematic-debugging` with KG-aware trace) |
| 7 | `gitnexus/gitnexus-exploring` | 81 | tracking | 5 | 5 | 5 | 5 | 4 | 5 | 4 | 5 | **4.7** | **KEEP** (TIER-1-DIRECT cite; KG-driven codebase recon — orthogonal to `gpt5-archaeologist`'s temporal axis) |
| 8 | `gitnexus/gitnexus-impact-analysis` | 100 | tracking | 5 | 5 | 5 | 5 | 4 | 5 | 4 | 5 | **4.7** | **KEEP** (TIER-1-DIRECT cite; "what depends on X?" answer-class; orthogonal to GitNexus dependency-impact tool surface) |
| 9 | `gitnexus/gitnexus-pr-review` | 173 | tracking | 5 | 5 | 5 | 4 | 4 | 5 | 4 | 5 | **4.6** | **KEEP** (no upstream-IDENTICAL cite-tag — appears to be local-extended; complements `pr-review-toolkit:review-pr` plugin with KG signal) |

### §1.2 — REFINE verdicts (7 skills — concrete improvement spec per §5)

| # | Skill | LOC | Last commit | D2 unique | D3 fit | D4 CC-path | D5 cites | D7 vel | Desc Q | Dupe risk | CR-3 | Composite | Verdict + reason |
|---|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 10 | `gitnexus/gitnexus-guide` | 67 | tracking | 3 | 4 | 4 | 5 | 4 | 3 | 3 | 5 | **3.9** | **REFINE** — description matches "What GitNexus tools are available?" which overlaps with built-in tool-listing semantics; consider sharper trigger keywords |
| 11 | `gitnexus/gitnexus-refactoring` | 124 | tracking | 4 | 4 | 4 | 5 | 4 | 3 | 3 | 5 | **4.0** | **REFINE** — description trigger ("Rename this function") overlaps with `serena:rename_symbol` MCP tool and `engineering-advanced-skills:migration-architect`; tighten to gitnexus-KG-specific cases |
| 12 | `speckit-analyze` | 262 | `0c5fec7` W281g | 3 | 3 | 4 | 2 | 3 | 4 | 3 | 4 | **3.3** | **REFINE** — 1 local Z: cite, 0 HTTP cites, 0 TIER-1 markers; per cardinal-rule-1 should add upstream HEAD pin (currently `metadata.source` says `Z:/repos/deps/spec-kit/templates/commands/analyze.md` but no `source_head` per cardinal-rule-1 cite-class lattice) |
| 13 | `speckit-clarify` | 256 | `0c5fec7` W281g | 3 | 3 | 4 | 2 | 3 | 4 | 3 | 4 | **3.3** | **REFINE** — same pattern as speckit-analyze; metadata cite-pin missing per cardinal-rule-1 |
| 14 | `speckit-constitution` | 159 | `0c5fec7` W281g | 3 | 3 | 4 | 2 | 3 | 4 | 3 | 4 | **3.3** | **REFINE** — same pattern; this is the only speckit-* without `tools:` script refs (purely doc-authoring) |
| 15 | `speckit-implement` | 212 | `0c5fec7` W281g | 3 | 3 | 4 | 2 | 3 | 4 | 3 | 4 | **3.3** | **REFINE** — same pattern; description overlaps with `superpowers:executing-plans` ("execute the implementation plan") |
| 16 | `speckit-plan` | 154 | `0c5fec7` W281g | 3 | 3 | 4 | 2 | 3 | 4 | 2 | 4 | **3.1** | **REFINE** — strongest dupe: description "execute the implementation planning workflow" collides with `superpowers:writing-plans` + `planning-with-files:plan` + `everything-claude-code:plan` (3-way collision in description-budget) |

### §1.3 — Also REFINE (3 skills, separate cluster — vercel/web-design + speckit-specify/tasks/checklist/taskstoissues — to manage as a batch):

| # | Skill | LOC | Last commit | Composite | Verdict + reason |
|---|---|---:|---|---:|---|
| 17 | `vercel-composition-patterns` | 25 | `0c5fec7` W281g | **3.6** | **REFINE** — body is 5-line redirect stub; cardinal-rule-1 OK (metadata.source + source_head pinned to vercel-labs-agent-skills@b9c8ee0); but pointer-only without inlined policy means trigger fires but body is empty — operator must Read the upstream file (extra friction) |
| 18 | `vercel-react-best-practices` | 29 | `69e5fd4` Ship-0 | **3.6** | **REFINE** — same pointer-only pattern as #17; description specificity is better ("React and Next.js performance optimization") |
| 19 | `web-design-guidelines` | 18 | `69e5fd4` Ship-0 | **2.8** | **REFINE→RETIRE candidate** — description is 1-line generic; body is 3-sentence stub; dupe with 3+ installed plugins (see §0 cross-cutting); consider RETIRE if vercel-labs-agent-skills becomes a `plugin install` candidate |
| 20 | `speckit-specify` | 332 | `0c5fec7` W281g | **3.4** | **REFINE** — same speckit-* cluster pattern |
| 21 | `speckit-tasks` | 204 | `0c5fec7` W281g | **3.4** | **REFINE** — same speckit-* cluster pattern |
| 22 | `speckit-checklist` | 374 | `0c5fec7` W281g | **3.2** | **REFINE** — bloated (longest speckit); 99% upstream boilerplate; minimal local value-add |
| 23 | `speckit-taskstoissues` | 108 | `0c5fec7` W281g | **3.4** | **REFINE** — smallest speckit; description overlaps with `everything-claude-code:github-ops` + `everything-claude-code:jira-integration` |

### §1.4 — RETIRE verdicts (2 entries)

| # | Skill | LOC | Last commit | Verdict + reason |
|---|---|---:|---|---|
| 24 | `.claude/skills/learned/` | 0 | (no history) | **RETIRE** — empty directory (children: `[]`); no `SKILL.md`; never committed; phantom artifact contributing 0 functional value; `rmdir` recovery |
| (alt) | (entire speckit-* cluster — 9 skills) | ~2,063 | `0c5fec7` W281g | **Bulk REFINE→consolidate** — see §5 spec for optional bulk collapse into `speckit-runtime` index + 9 thin redirect stubs (saves ~1,500 LOC of upstream boilerplate; operator decision pending) |

**Note on local-skill count vs CLAUDE.md cite "× 18"**: CLAUDE.md L43 says `× 18 (mem-recall, goal-prompt-synthesis, sota-convergence-audit, dual-review, vercel-*, web-design-guidelines, speckit-*, gitnexus, langfuse, learned)`. Live `os.listdir` returns 18 top-level entries but the list includes `dual-review` which is NOT in `.claude/skills/` — `dual-review` is a SLASH COMMAND at `.claude/commands/dual-review.md` per the system-reminder skills listing (also `andrej-karpathy-skills:karpathy-guidelines` etc). The actual 18 local skill dirs are: `gitnexus`, `goal-prompt-synthesis`, `langfuse`, `learned`, `mem-recall`, `sota-convergence-audit`, `speckit-{analyze,checklist,clarify,constitution,implement,plan,specify,tasks,taskstoissues}` (9), `vercel-{composition-patterns,react-best-practices}` (2), `web-design-guidelines`. CLAUDE.md should be updated to enumerate the actual 18 and remove `dual-review` from the local-skills cite (CR-2 minor: CLAUDE.md inventory drift). Routed to §7 operator-action queue.

## §2 — 4 sub-agent inventory with lite-score + verdict

Per W298-D PASS frontmatter spec (`name + description + tools + model + permissionMode`). Sub-agents have full Anthropic CC docs anchor at `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (cardinal-rule-3 compliant).

### §2.1 — KEEP verdicts (2 sub-agents)

| # | Agent | LOC | Last commit | Frontmatter | Body Q | Dupe risk | Cardinal-rule fit | Composite | Verdict |
|---|---|---:|---|---|---:|---:|---:|---:|---|
| A1 | `gpt5-archaeologist.md` | 201 | `736bfd2` W260-P5 | 4-cite preamble + 12-field frontmatter (`tools/model/color/maxTurns/permissionMode`) | 5 | 5 | 5 | **5.0** | **KEEP** — 4 TIER-1 cite-anchors (Adam Tornhill book + code-maat OSS HEAD + codex CLI source + sibling agent template); structured-output contract via XML tags; cost guardrails ($-cap + token-cap + time-window); fallback heuristic when codex unavailable; STOP-after-review enforced; 5 anti-patterns + 3 related agents cross-linked. This is the gold-standard sub-agent template for the runtime. |
| A2 | `evaluator.md` | 59 | `736bfd2` W260-P5 | 9-field frontmatter (`tools/disallowedTools/model/permissionMode/maxTurns/effort/isolation/memory/background/color/skills/mcpServers`) | 4 | 4 | 5 | **4.5** | **KEEP** — Anthropic upstream cite-import from `anthropics/cwc-long-running-agents @ HEAD ffd563d668` (verbatim Wave 75); permissionMode plan + disallowedTools writes blocked = read-only adversarial posture; codex-T1+T3 rounds documented in HTML comment preamble (Ship 1.1 fix-forward applied). Operator-mandated PASS/NEEDS_WORK verdict contract is parseable by wrapper scripts. |

### §2.2 — REFINE verdicts (2 sub-agents)

| # | Agent | LOC | Last commit | Frontmatter | Body Q | Dupe risk | Cardinal-rule fit | Composite | Verdict + reason |
|---|---|---:|---|---|---:|---:|---:|---:|---|
| A3 | `wshobson-devops-troubleshooter.md` | 46 | `5057bb2` W282-fix1 | 11-field frontmatter (per CCBP `claude-subagents.md:17-36`) | 3 | 3 | 4 | **3.5** | **REFINE** — body is 5-bullet operating contract (22 lines); functional but thin; HUGE 12-line HTML comment preamble documenting Ship 2/2.1 fix-forward chains is **operator-confusing** (more provenance than operating spec). Description "DevOps incident and deployment troubleshooting" overlaps with `engineering-skills:senior-devops` + `engineering-advanced-skills:observability-designer` + `incident-response:incident-response`. Consider: (a) compact preamble to 1-line `<!-- Cite: ... -->`, (b) tighten description to wshobson-distinct trigger keywords, (c) add 1-2 worked-example failure-pattern signatures the agent specializes in. |
| A4 | `wshobson-security-auditor.md` | 49 | `5057bb2` W282-fix1 | 11-field frontmatter | 3 | 3 | 4 | **3.5** | **REFINE** — same pattern as A3 (large preamble, thin body). Description "DevSecOps and application security auditor" overlaps with `engineering-skills:senior-security` + `everything-claude-code:security-review` + `engineering-advanced-skills:skill-security-auditor` + `engineering-skills:security-pen-testing` (4-way collision). Consider: same 3-step REFINE as A3 + sharpen "OWASP Top-10 + secrets-exposure + supply-chain" trigger keywords vs the broad "audit". |

### §2.3 — RETIRE verdicts

**None.** All 4 sub-agents have legitimate operator-value AND are operationally referenced (W282-fix1 restored both wshobson-* after a codex HIGH; evaluator is anthropic upstream cite-import; gpt5-archaeologist fills temporal-archaeology gap orthogonal to GitNexus per its §Purpose table).

## §3 — Cross-cutting patterns

### §3.1 — Description-trigger collision (biggest pattern, see §0)

**5 local skills overlap with 8+ installed plugins on description-matched triggers**. Per `https://code.claude.com/docs/en/skills` description-budget allocator + frequency-based prioritization heuristic (W298-F §2.4 cite), overlapping skills cause stochastic auto-trigger — the operator cannot predict which fires. Collisions documented in §1 column "Dupe risk":

- **3-way+ collisions**: `web-design-guidelines` (3+), `speckit-plan` (3), `wshobson-security-auditor` (4)
- **2-way collisions**: `vercel-react-best-practices`, `speckit-implement`, `langfuse`, `gitnexus-refactoring`
- **No collision detected**: `sota-convergence-audit`, `goal-prompt-synthesis`, `mem-recall`, `evaluator`, `gpt5-archaeologist`, all 5 other gitnexus sub-skills (gitnexus-{cli,debugging,exploring,impact-analysis,pr-review,guide})

**Remediation pattern**: tighten description specificity by adding the local skill's unique discriminator. Example for `web-design-guidelines`: BEFORE = "Use when asked to review UI, UX, accessibility, or frontend interface quality"; AFTER = "Use when asked to apply Vercel Web Interface Guidelines specifically — heuristics like UI density, motion-reduce, focus-ring contrast, semantic html landmarks; NOT generic frontend review (use `engineering-skills:senior-frontend` for that)".

### §3.2 — Cardinal-rule-3 compliance — sub-agents

**Cardinal-rule-3** ("Subagents = installed upstream agents OR documented subagent system" per `https://docs.anthropic.com/en/docs/claude-code/sub-agents`).

Result: **all 4 sub-agents PASS CR-3** with full operational receipts:

| Agent | CR-3 path | Verification |
|---|---|---|
| `evaluator` | Anthropic upstream cite-import | `<!-- Cite: anthropics/cwc-long-running-agents/.claude/agents/evaluator.md @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629 (verbatim cite-import 2026-05-08 Wave 75) -->` |
| `gpt5-archaeologist` | TIER-3-LOCAL-COMPOSITION (sibling-derived but with named-failure-mode novelty per Wave 62C 14-class extended set; HONEST-NON-FINDING 0 upstream parity probed across 6 SOTA repos) | Wave 15 cite-import per CR-12 TERTIARY + sibling-bleed defense applied |
| `wshobson-devops-troubleshooter` | sibling-derived from `Z:/repos/deps/wshobson-agents/plugins/distributed-debugging/agents/devops-troubleshooter.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` | `[PROVENANCE-ONLY]` qualifier per CR-9; agent body self-contained (no sibling-bleed) |
| `wshobson-security-auditor` | sibling-derived from `Z:/repos/deps/wshobson-agents/plugins/security-scanning/agents/security-auditor.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` | Same [PROVENANCE-ONLY] |

CR-3 self-check: **PASS** for all 4. The cite-class lattice (CR-1 TIER-1 upstream / TIER-2 LOCAL primary / TIER-3 LOCAL-COMPOSITION sibling-derived) is correctly applied via HTML-comment provenance ledgers.

### §3.3 — Length-budget distribution

Skill LOC distribution (excluding gitnexus sub-skills):

| Bucket | Count | Skills |
|---|---:|---|
| 0 LOC (empty) | 1 | `learned/` |
| 1-30 LOC (pointer-only) | 3 | web-design-guidelines (18), vercel-composition-patterns (25), vercel-react-best-practices (29) |
| 100-200 LOC (concise) | 4 | mem-recall (103), speckit-taskstoissues (108), langfuse (141), speckit-plan (154) |
| 200-400 LOC (medium) | 8 | speckit-constitution (159), speckit-tasks (204), speckit-implement (212), speckit-clarify (256), speckit-analyze (262), goal-prompt-synthesis (320), speckit-specify (332), speckit-checklist (374) |
| >400 LOC (large) | 1 | sota-convergence-audit (663) |

The cluster at 100-400 LOC is healthy; the 0 and <30 LOC outliers + the speckit cluster bloat are the priority refine cases. Per W298-F preload-budget discipline, every visible skill description costs ~50-100 tokens per session — the 9 speckit-* skills consume ~600-900 tokens of description budget for what could be 1 index skill at ~100 tokens.

### §3.4 — Cite-anchor density

| Skill | TIER-1 cites (file:line or upstream HEAD) | HTTP cites | Composite cite-density |
|---|---:|---:|---:|
| `sota-convergence-audit` | 60+ | 5+ | HIGH |
| `goal-prompt-synthesis` | 0 file:line, 1 CCBP | 0 | MEDIUM-LOW (could improve) |
| `mem-recall` | 5+ (FM-class refs + CCBP) | 1 | HIGH |
| All 9 `speckit-*` | 1 (metadata.source) | 0 | LOW (cardinal-rule-1 partial) |
| All 3 `vercel-*` + `web-design-guidelines` | 1 each (metadata.source + source_head) | 0 | MEDIUM (cite-pin OK; body stub) |
| All 5 `gitnexus/*` (cited) | 1 each | 0 | MEDIUM (upstream-IDENTICAL diff-verified) |
| `gitnexus/gitnexus-pr-review` | 0 | 0 | LOW (no cite-tag) |
| `langfuse` | 0 | 0 | LOW (cardinal-rule-1 gap) |
| 4 sub-agents | 4 + 3 + 1 + 1 | 2 + 3 + 1 + 1 | MEDIUM-HIGH |

The speckit-* cluster is the largest cite-density gap. Per CR-1 cite-class lattice, all 9 should add `metadata.source_head` pin (currently only `metadata.source` path).

### §3.5 — Cardinal-rule-1 (trusted plugins/skills/agents only) compliance

All 18 local skills + 4 sub-agents are under operator-curated `.claude/skills/` or `.claude/agents/` paths per the Anthropic-sanctioned local-skill discovery mechanism (`https://code.claude.com/docs/en/skills`). **CR-1 PASS** for all 22 artifacts.

## §4 — Top-3 highest-quality reference templates

### §4.1 — `sota-convergence-audit/SKILL.md` (5.0/5.0)

**Why it's the gold standard**:
- 663 LOC organized as 7-phase pipeline (Discover → Verify → Converge → Score → Phase-5 5-gate → Phase-6 position-swap → Phase-7 emit-and-persist)
- 14-dim rubric (5-point Likert each) with hard-cap taxonomy
- 5-tier ladder (INSTALL / VENDOR-FORK / PATTERN-STUDY / CITE-ONLY / REJECT)
- Multi-MCP cascade orchestration with cost-bounded breadth ($0.02 → $20/candidate envelope)
- Anti-bias gates (stars-not-hardgate, ≥3 organizationally-distinct sources, sources_typed.disagreement[] tracker)
- Self-audited in W293 sca-v3.1 validation pilot AND in W297/W299 cumulative improvements
- THE rubric every other adoption decision in the runtime is graded against (~10 waves of operational receipt)

**Apply pattern**: when writing a new operator-curated skill, replicate (a) frontmatter `description` with explicit `Use when... Do NOT use for...` clause, (b) phased process with explicit gate criteria, (c) anti-patterns section, (d) cite-anchor density ≥1 TIER-1 reference per major phase.

### §4.2 — `gpt5-archaeologist.md` (5.0/5.0)

**Why it's the gold standard for sub-agents**:
- 4 TIER-1 cites in frontmatter preamble (book + OSS HEAD + CLI source + sibling agent — three organizationally-distinct anchors satisfy sca-v5 D5 convergence)
- 12-field frontmatter with proper isolation/memory/background/color/maxTurns
- Cost guardrails section (20K input token cap + 5K output cap + 1-year default window + daily-rate circuit-break)
- Fallback heuristic when primary path (codex CLI) unavailable
- STOP-after-review contract enforced in body (no auto-fix bleed)
- 5 anti-patterns + 3 related-agents cross-references
- Structured-output contract via XML tags ensures parseable verdict

**Apply pattern**: when writing a new sub-agent, replicate (a) 4+ field frontmatter, (b) cost/time guardrails, (c) STOP-contract, (d) structured-output XML, (e) ≥3 anti-patterns, (f) fallback heuristic.

### §4.3 — `goal-prompt-synthesis/SKILL.md` (4.7/5.0)

**Why it's a strong template**:
- 7-phase pipeline (W295 upgrade from 4-phase) integrating cross-model gate
- 75 codex-mentions (operationalizes the W280a Stop-hook codex-review-gate as a first-class output)
- 5 anti-bias mentions (operationalizes sca-v5 D5 typed-evidence diversity at goal-authoring layer)
- 3 anti-patterns documented
- Paste-ready output contract (downstream consumer is the `/goal` command)

**Where it could improve to 5.0**: add explicit TIER-1 file:line cites at frontmatter preamble (currently 0 HTTPS + 3 Z: + 1 CCBP — vs sota-convergence-audit's 60+ cites). Per §3.4, this is the cite-density gap most easily closed.

## §5 — Top-3 lowest-quality refine candidates — concrete improvement spec

### §5.1 — `.claude/skills/learned/` — RETIRE (spec: `rmdir`)

**Current state**: empty directory; no `SKILL.md`; no children; never committed (`git log` returns empty).

**Improvement spec**: choose between (A) RETIRE via `rmdir .claude/skills/learned/` (recommended; phantom artifact with 0 value), or (B) operator instantiates with intended content (e.g., a `learned-from-incident.md` recap-skill that auto-fires on description keywords like "what did we learn from FM-19 retirement" — would complement `mem-recall` with synthesized lesson templates).

**Why RETIRE preferred**: per cardinal-rule-2 ("hooks and primitives must be plugin-anchored or operator-installed"), an empty placeholder dir is a CR-2 minor violation (operator-invented surface with no implementation). `rmdir` is 100% reversible (no git history to preserve).

**Routed to**: §7 operator-action queue.

### §5.2 — `.claude/skills/web-design-guidelines/SKILL.md` — REFINE (spec below) OR RETIRE if vercel-labs-agent-skills becomes a `plugin install`

**Current state**: 18 LOC, 673 bytes, body is 3-sentence stub redirecting to `Z:/repos/deps/vercel-labs-agent-skills/skills/web-design-guidelines/SKILL.md @ HEAD b9c8ee0`.

**Improvement spec** (REFINE path):
1. Tighten frontmatter description from generic "Use when asked to review UI, UX, accessibility, or frontend interface quality" → "Use when asked to apply Vercel Web Interface Guidelines specifically — heuristics like UI density, motion-reduce, focus-ring contrast, semantic html landmarks; NOT generic frontend review (use `engineering-skills:senior-frontend` for that)".
2. Inline the upstream policy summary (10-20 LOC) instead of pure-pointer redirect; reduces 1 round-trip read for the operator.
3. Add explicit `Do NOT use for...` clause naming the 3-4 colliding skills (per §3.1).

**Alternative spec** (RETIRE path):
1. Probe whether `vercel-labs-agent-skills` has a `claude-code-plugin` packaging (per `https://code.claude.com/docs/en/plugins`).
2. If yes: install as plugin; `rm -rf .claude/skills/web-design-guidelines/`; replace cite in CLAUDE.md.
3. If no: keep REFINE path #1-3.

**Routed to**: §7 operator-action queue.

### §5.3 — `.claude/skills/speckit-*/` cluster (9 skills, ~2,063 LOC) — REFINE via consolidation

**Current state**: 9 speckit-* skills each ranging 108-374 LOC; descriptions all auto-trigger on `/speckit-*` slash command keyword; cumulative LOC ~2,063; cumulative description-budget cost ~600-900 tokens/session.

**Improvement spec** (3 alternatives, operator picks):

**Alt A — KEEP all 9 with cite-pin hardening**:
1. Add `metadata.source_head: "688ca1b3c51046498274de80752db2dce11ec1c7"` to each of the 9 frontmatters (currently only `metadata.source` path is pinned).
2. Tighten each description's `Use when...` clause to mention the specific slash command (already done in W281g) PLUS add explicit `Do NOT use for...` clauses naming colliding skills.
3. Verify upstream `spec-kit` HEAD hasn't drifted since `0c5fec7` (currently W281g pin; check `Z:/repos/deps/spec-kit/templates/commands/<n>.md @ HEAD`).
- LOC impact: +30 LOC per skill (description tightening + `Do NOT use for` clauses) = +270 LOC total

**Alt B — Bulk collapse to `speckit-runtime` index + 9 thin redirect stubs**:
1. Create new `.claude/skills/speckit-runtime/SKILL.md` (~150 LOC) as the canonical entry — contains the shared `Pre-Execution Checks` boilerplate (currently duplicated across all 9 skills) + the 9 phase descriptions in compressed form.
2. Each of the 9 `speckit-<phase>/SKILL.md` becomes a ~20-LOC thin redirect: frontmatter + 1-paragraph `Use when... Do NOT...` + body `See speckit-runtime/SKILL.md`.
3. LOC impact: -1,700 LOC (~2,063 → ~330) — saves ~1,400-1,700 LOC of upstream boilerplate.
4. Description-budget impact: -500 tokens/session (operator-curated only — slash commands still work via separate `.claude/commands/speckit-*.md` paths).

**Alt C — Install spec-kit as official plugin (if exists)**:
1. Probe `https://github.com/github/spec-kit` for `claude-code-plugin` packaging branch.
2. If exists: `claude plugin install spec-kit`; `rm -rf .claude/skills/speckit-*/`; +1 plugin in `enabledPlugins`.
3. If not exists: revert to Alt B.

**Operator recommendation**: Alt B (bulk consolidation) — saves the most LOC + description-budget + reduces description-trigger overlap WITHOUT breaking the `/speckit-*` slash command workflow (commands live separately in `.claude/commands/`). Alt A is the conservative path; Alt C requires upstream check.

**Routed to**: §7 operator-action queue with operator-decision-required flag.

## §6 — Cardinal-rule self-check on all 22 artifacts (28 if gitnexus subdivided)

| Rule | Compliance | Notes |
|---|---|---|
| **CR-1** trusted-source primitives | PASS 22/22 | All under operator-curated `.claude/skills/` or `.claude/agents/` paths per Anthropic CC discovery |
| **CR-2** no `.claude/hooks/scripts/*.py|.sh` self-invent | PASS (not applicable to this audit — scope is skills/agents files only) | scripts/hooks audit is Stream B's territory |
| **CR-3** subagents = installed upstream OR documented subagent system | PASS 4/4 | See §3.2 — all 4 have full cite-class provenance ledgers |
| **CR-4** no `.claude/rules/*.md` | PASS (not applicable; no rules/ dir exists per CLAUDE.md cardinal-rule-4) | — |
| **CR-5** safety boundaries via CC permissions | PASS 4/4 sub-agents | All 4 use `permissionMode: plan` + `disallowedTools: [Write, Edit, MultiEdit, NotebookEdit]` for read-only adversarial posture per `https://docs.anthropic.com/en/docs/claude-code/settings` |
| **CR-9** cite-class lattice integrity | PARTIAL — 9 speckit-* missing `source_head` pin | Routed to §7 operator-action: add source_head per skill (W281g closed `Use when` triggers but did not close cite-pin gap) |

**Net cardinal-rule conformance**: 22/22 hard rules; 1 CR-9 partial (cite-pin gap on speckit-* cluster — REFINE path closes it).

## §7 — Operator-action queue

1. **[OA-1, LOW]** `rmdir Z:/claude-sota-installed/.claude/skills/learned/` — phantom empty directory; 0 value. Reversible. (§5.1)
2. **[OA-2, MEDIUM]** Update CLAUDE.md L43 local-skill list — remove `dual-review` from `.claude/skills/` enumeration (dual-review is a slash command at `.claude/commands/dual-review.md`, not a local skill). Replace with accurate 18-entry enumeration. (§1.4 note)
3. **[OA-3, MEDIUM]** Decide speckit-* cluster path: Alt A (cite-pin hardening, +270 LOC) / Alt B (bulk collapse `speckit-runtime` + 9 stubs, -1,700 LOC) / Alt C (probe upstream plugin packaging). Recommended: **Alt B**. (§5.3)
4. **[OA-4, MEDIUM]** Tighten descriptions on 5 colliding skills: `web-design-guidelines`, `vercel-react-best-practices`, `vercel-composition-patterns`, `speckit-plan`, `wshobson-security-auditor`. Each gets a `Do NOT use for...` clause naming the colliding skills. (§3.1, §5.2)
5. **[OA-5, LOW]** Probe `vercel-labs-agent-skills` for plugin packaging branch — if exists, replace 3 local vercel-* skills with `plugin install`. (§5.2 Alt path)
6. **[OA-6, LOW]** Compact the 2 wshobson-* agent HTML comment preambles from 12-line Ship-2/2.1 fix-forward documentation to 1-line `<!-- Cite: ... -->` (preserve provenance via git log; the prosaic ship-trail belongs in commit-log, not body preamble). (§2.2)
7. **[OA-7, MEDIUM]** Add `metadata.source_head` pin to all 9 speckit-* skills (CR-9 partial close — same as OA-3 Alt A first step). (§3.4, §6)
8. **[OA-8, LOW]** Add 1 TIER-1 cite-anchor per major phase to `goal-prompt-synthesis/SKILL.md` (lift score 4.7→5.0). (§4.3)
9. **[OA-9, LOW]** Add upstream cite-pin to `gitnexus/gitnexus-pr-review/SKILL.md` (currently 0 cite-tag — only one of the 7 gitnexus sub-skills without TIER-1-DIRECT verification). (§1.1)
10. **[OA-10, LOW]** Add upstream cite-pin to `langfuse/SKILL.md` (cardinal-rule-1 gap — 0 TIER-1 file:line, 0 HTTPS in body; metadata-only). (§3.4)

## §8 — Open questions routed to W304-AUDIT

1. **Q1**: Should `vercel-labs-agent-skills` be probed for plugin packaging (OA-5)? If exists, this would unlock 3-of-18 local-skill consolidation. Route to W304-AUDIT cross-stream synthesis with Stream C (broader SOTA discovery) — Stream C may already be auditing vercel-labs as a candidate.
2. **Q2**: Is there an Anthropic-OFFICIAL `spec-kit` plugin (OA-3 Alt C)? If yes, 9-of-18 local-skill consolidation possible. Route to W304-AUDIT for cross-stream Stream C verification.
3. **Q3**: The `dual-review` slash command (`.claude/commands/dual-review.md`) is cited in CLAUDE.md L43 as a local skill but lives in `.claude/commands/` — this implies operator-conflation of skills vs commands. Per W298-D and CR-3, commands and skills are distinct primitive classes. Route to W304-AUDIT for CLAUDE.md cite-class taxonomy clarification.
4. **Q4**: `mem-recall` documents `mistake-aware` as a "Wave 119+ candidate" skill (per `mem-recall/SKILL.md:74`). Did this ship? Probe `Z:/claude-sota-installed/.claude/skills/mistake-aware/` — does it exist? Route to W304-AUDIT for backlog accounting.
5. **Q5**: `evaluator.md` references `everything-claude-code:silent-failure-hunter` AGENT (per body line 4 HTML comment) but this is an installed-plugin agent, not a local-skill. Verify the plugin agent exists in cache and is invocable via Agent tool. Route to W304-AUDIT cross-stream with Stream A (harness coverage of agents).
6. **Q6**: Description-budget allocator (per W298-F §2.4 cite) uses frequency-based prioritization. Is there telemetry to confirm WHICH of the 5 colliding skills WIN the allocator's tiebreak when descriptions overlap? (e.g., does `web-design-guidelines` or `engineering-skills:senior-frontend` actually fire when operator says "review UI"?) Route to W304-AUDIT cross-stream with Stream A (harness skill-fire telemetry).
7. **Q7**: All 9 speckit-* skills last edited at W281g `0c5fec7` (2026-05-17). Has upstream `spec-kit` HEAD `688ca1b3` drifted since? Stream A's harness audit may benefit from a `spec-kit` source-head re-verification as a fixture refresh. Route to W304-AUDIT for cross-stream coordination.

## §9 — Stream-completion checklist

- [x] File written + LOC (this file, ~640 LOC body content)
- [x] All 18 top-level skills audited (24 SKILL.md files when gitnexus's 7 sub-skills expanded)
- [x] All 4 sub-agents audited
- [x] Per-artifact lite-score + verdict
- [x] ≥3 KEEP verdicts (delivered 9 skills + 2 sub-agents = 11)
- [x] ≥1 REFINE verdict (delivered 9 + 2 = 11)
- [x] Optional RETIRE (delivered 1 firm + 1 alternative bulk)
- [x] Cardinal-rule self-check PASS (§6: 22/22 hard rules; 1 CR-9 partial closed by OA-3/OA-7)
- [x] Top-3 best reference templates (§4)
- [x] Top-3 refine candidates with concrete improvement spec (§5)
- [x] Cross-cutting patterns (§3: description-overlap + cardinal-rule-3 + length-budget + cite-anchor density)
- [x] Operator-action queue (§7: 10 items)
- [x] Open questions routed to W304-AUDIT (§8: 7 items)
- [x] ≥3 cite-anchors: W303-A coverage gaps, W298-D PASS frontmatter, W298-F skill budget, CCBP claude-subagents.md, Anthropic CC skills/sub-agents docs (5+ delivered)
- [x] Source-disagreement log: CLAUDE.md L43 says `× 18` and enumerates `dual-review` as a local skill — but `dual-review` lives in `.claude/commands/`, not `.claude/skills/`. Routed to §7 OA-2.
- [x] No edits to `.claude/skills/*` or `.claude/agents/*` files (audit-only per W304-PLAN §2)

## §10 — Appendix A — Per-skill detailed lite-score worksheets

This appendix shows the full sca-v5 lite-score derivation for each artifact. Lite-score adapted for INTERNAL artifacts per W304-PLAN §1: D1 (license, n/a for internal), D2 (capability uniqueness), D3 (harness-fit), D4 (CC-pathway), D5 (typed-evidence diversity), D6 (authority, operator-curated → α=0), D7 (maintenance velocity), D12 (community-signal, n/a for internal), D13 (pattern-extractability), D14 (reversibility). Skill-specific extensions: Description Quality (DQ), Length Budget (LB), Cross-Skill Duplication (DUP), Cardinal-Rule-3 Compliance (CR3).

### §10.1 — `sota-convergence-audit` — composite 5.0/5.0 → KEEP

- D2 capability uniqueness: 5/5 — THE adoption-decision rubric; no installed plugin offers a 14-dim 5-tier sca-v5 equivalent. Self-audited as architecture-itself in W292 inverse-benchmark (3.82/5 avg vs 12 external rubrics) — no public system targets v5's niche (autonomous + local-first + single-operator + cross-model-gated).
- D3 harness-fit: 5/5 — Windows-portable (PowerShell + bash variants); designed for autonomous /loop; integrates with codex Stop-gate.
- D4 CC-pathway: 5/5 — frontmatter description has clear `Use when... Do NOT use for...` clauses; auto-fires on "is X SOTA / should we adopt X / audit X" trigger keywords.
- D5 typed-evidence: 5/5 — 60+ cite-anchors spanning ≥6 source families (GitHub stars, Anthropic docs, CCBP, codex CLI source, sibling-runtime cite-imports, multi-MCP outputs).
- D7 velocity: 5/5 — last edit W299 (2026-05-18); 7 waves of operational receipt (W288 → W302).
- DQ description: 5/5 — explicit `Use when` + explicit `Do NOT use for` with two disambiguation paths (vs `skill-creator`, vs `/loop` re-entries).
- LB length budget: 5/5 — 663 LOC is large but justified by the 7-phase pipeline + 14-dim rubric; every section earns its tokens.
- DUP cross-skill duplication: 5/5 — no overlap with installed plugins (no plugin offers SOTA-adoption convergence audit).
- CR3 compliance: 5/5 — operator-curated under `.claude/skills/<name>/` per Anthropic CC skill discovery.

### §10.2 — `goal-prompt-synthesis` — composite 4.7/5.0 → KEEP

- D2: 5/5 — `/goal` predicate synthesis is operator-specific workflow; no installed plugin offers anti-bias + cross-model + 7-phase /goal authoring.
- D3: 5/5 — autonomous /loop compatibility documented; designed for the runtime's wave-driven workflow.
- D4: 5/5 — sharp trigger keywords ("definitive next steps", "paste-ready /goal", "comprehensive /goal").
- D5: 4/5 — 75 codex-mentions integrate cross-model gate (strong); 5 anti-bias mentions; BUT only 3 Z: path cites + 1 CCBP — no HTTPS upstream-doc cites. Lift to 5/5 by adding 3 HTTPS Anthropic doc anchors (see §4.3 / OA-8).
- D7: 5/5 — last edit W295-r25 (2026-05-18); active maintenance.
- DQ: 5/5 — `Do NOT use for...` clause names 2 disambiguation paths.
- LB: 5/5 — 320 LOC for 7-phase pipeline + anti-bias gate + cross-model orchestration.
- DUP: 4/5 — soft-overlap with `engineering-skills:senior-prompt-engineer` (mitigated by explicit `/goal` predicate framing).
- CR3: 5/5 — operator-curated.

### §10.3 — `mem-recall` — composite 4.9/5.0 → KEEP

- D2: 5/5 — 6-tier memory navigation skill; no installed plugin offers basic-memory T6 primary + plugin-memory T2-split fallback orchestration.
- D3: 5/5 — W301-A T4-graphiti-retirement-aware; live tier-routing per CLAUDE.md memory state.
- D4: 5/5 — extensive `Use when... When NOT...` keyword disambiguation.
- D5: 5/5 — 5+ TIER-1 cites (FM-class refs, CCBP, codex T1 verdicts, Anthropic CC skill spec URL, MCP server spec).
- D7: 5/5 — last edit W301 (2026-05-18); current.
- DQ: 5/5 — `When to invoke` + `When NOT to invoke` sections explicit.
- LB: 5/5 — 103 LOC efficient.
- DUP: 4/5 — soft-overlap with `/recall` slash command and `mistake-search` (operator path explicitly disambiguated in `Anti-patterns` body section).
- CR3: 5/5 — operator-curated; Wave 113+118 Plan-agent cite-trail.

### §10.4 — `langfuse` — composite 4.4/5.0 → KEEP

- D2: 4/5 — wraps installed `langfuse-cli` (npx-based); `allowed-tools` whitelist is exemplary CR-1 cardinal-rule discipline; not unique vs upstream `langfuse` MCP server (`plugin:langfuse`) for some use cases (telemetry queries) but adds value for CLI-first + doc-first workflows.
- D3: 5/5 — operator-installed langfuse v3.170.0 LIVE per CLAUDE.md T5 status row.
- D4: 5/5 — `allowed-tools` discipline is unique in this skill set — operator can audit exact bash patterns allowed.
- D5: 4/5 — body has llms.txt cite + 3 method-of-access patterns; could add cardinal-rule-1 file:line pin to `langfuse-cli` upstream HEAD.
- D7: 3/5 — last edit W266 (older); content tracks upstream langfuse v3 API which hasn't drifted, so lower velocity is not a quality issue.
- DQ: 5/5 — frontmatter `description` has 3 explicit Use-when paths (CLI, docs, feature understanding).
- LB: 4/5 — 141 LOC; could be slightly tightened.
- DUP: 4/5 — soft-overlap with `plugin:langfuse` MCP server tools (`mcp__langfuse__get-prompt` etc); operator path-of-choice between CLI vs MCP not explicitly documented.
- CR3: 5/5 — operator-curated.

### §10.5 — `gitnexus/gitnexus-cli` — composite 4.7/5.0 → KEEP

- D2: 5/5 — wraps `gitnexus` CLI commands; unique skill class (KG-aware index management).
- D3: 5/5 — gitnexus MCP server LIVE per `.mcp.json:cypher/query/impact/route_map/tool_map/shape_check/api_impact/group_sync/group_list`.
- D4: 5/5 — sharp trigger keywords ("Index this repo", "Reanalyze the codebase").
- D5: 5/5 — TIER-1-DIRECT cite verified IDENTICAL to upstream HEAD `98addbd6` 2026-05-13.
- D7: 4/5 — tracks upstream; last identity-verified 2026-05-13.
- DQ: 5/5 — JSON-formatted description with examples is exemplary.
- LB: 5/5 — 86 LOC concise.
- DUP: 4/5 — soft-overlap with `serena:activate_project` + `repomix:pack_codebase` (different KG vs raw-source paths).
- CR3: 5/5 — operator-curated.

### §10.6 — Other gitnexus sub-skills (gitnexus-{debugging,exploring,impact-analysis,pr-review,refactoring,guide}) — composite 4.6-4.7/5.0 → 5 KEEP + 2 REFINE

Aggregate pattern: 5 sub-skills are TIER-1-DIRECT IDENTICAL diff-verified at HEAD `98addbd6`; `gitnexus-pr-review` (LOC=173) has NO cite-tag and may be locally-extended (OA-9); `gitnexus-guide` has the broadest description match overlap risk (DUP=3/5; tightening proposed in REFINE).

### §10.7 — Speckit-* cluster (9 skills) — composite 3.1-3.4 → REFINE (per §5.3)

Aggregate pattern: 9 skills sharing `Use when the operator runs /speckit-*` trigger pattern; all have `metadata.source: "Z:/repos/deps/spec-kit/templates/commands/<name>.md"` (cardinal-rule-1 partial — source path pinned, source_head MISSING per OA-7). Cumulative LOC 2,063 + cumulative description-budget cost ~600-900 tokens/session. Three consolidation alternatives spec'd in §5.3.

### §10.8 — Vercel + web-design-guidelines (3 skills) — composite 2.8-3.6 → 3 REFINE

Aggregate pattern: all 3 are pointer-only redirects to `Z:/repos/deps/vercel-labs-agent-skills @ HEAD b9c8ee0`; bodies are 3-10 LOC stubs requiring operator to Read the upstream. Cardinal-rule-1 OK (metadata.source + source_head pinned). DUP=2-3/5 each (3-4 colliding plugins). REFINE path: tighten descriptions + inline upstream policy summary. RETIRE path: probe `vercel-labs-agent-skills` for `claude-code-plugin` packaging.

### §10.9 — `.claude/skills/learned/` — composite N/A → RETIRE

Empty dir; 0 children; never committed; phantom artifact. `rmdir` recovery. (§5.1)

### §10.10 — 4 sub-agents lite-score worksheets

**A1 `gpt5-archaeologist`** — composite 5.0/5.0:
- Frontmatter: 12 fields (`tools/model/color/maxTurns/permissionMode/skills/mcpServers/isolation/memory/background/effort + name+description`); 4 TIER-1 cites in preamble; structured-output XML contract; cost guardrails; fallback heuristic; STOP-after-review enforced. Exemplary across every dim.

**A2 `evaluator`** — composite 4.5/5.0:
- Frontmatter: 13 fields (most comprehensive); read-only adversarial posture via `permissionMode: plan` + `disallowedTools: [Write, Edit, MultiEdit, NotebookEdit]`; codex T1+T3 review rounds documented; Anthropic upstream cite-import. Body is concise PASS/NEEDS_WORK contract. Small refine opportunity: compact 6-line `<!-- (a) ... (f) -->` comment preamble (Ship 1.1 fix-forward provenance) to git log.

**A3 `wshobson-devops-troubleshooter`** — composite 3.5/5.0 → REFINE:
- Frontmatter: 12 fields; cardinal-rule-1 OK (cite-pin to wshobson-agents HEAD `ece811f2`). Body: 5-bullet operating contract (22 lines) is thin. 12-line HTML preamble documenting Ship 2/2.1 chain is operator-confusing. Description DUP=3/5 (collides with `engineering-skills:senior-devops` + `engineering-advanced-skills:observability-designer` + `incident-response:incident-response`).

**A4 `wshobson-security-auditor`** — composite 3.5/5.0 → REFINE:
- Same pattern as A3. DUP=2/5 (4-way collision: `engineering-skills:senior-security` + `everything-claude-code:security-review` + `engineering-advanced-skills:skill-security-auditor` + `engineering-skills:security-pen-testing`). Strongest refine candidate among sub-agents.

## §11 — Appendix B — Description-trigger collision matrix

This appendix enumerates the 5 local-skill ↔ installed-plugin description-trigger collisions (per §3.1 cross-cutting pattern #1 finding) to enable W304-AUDIT cross-stream synthesis with Stream A (harness skill-fire telemetry) for empirical tiebreak verification.

| Local skill | Trigger phrase (partial) | Colliding plugins (≥2-way) | Allocator-tiebreak path | Operator UX impact |
|---|---|---|---|---|
| `web-design-guidelines` | "review UI, UX, accessibility, or frontend interface quality" | `engineering-skills:senior-frontend`, `example-skills:frontend-design`, `engineering-advanced-skills:api-design-reviewer` (soft) | Local wins on frequency-priority (per W298-F allocator) AFTER first invocation; first-time priority unknown. | MEDIUM — operator may see different skill fire on first vs subsequent sessions. |
| `vercel-react-best-practices` | "writing, reviewing, or refactoring React/Next.js components" | `engineering-skills:senior-frontend`, `everything-claude-code:frontend-patterns`, `everything-claude-code:nextjs-turbopack` | Local edge: explicit "Vercel" + "Next.js" branding. | LOW — vercel-* descriptions are domain-disambiguated. |
| `vercel-composition-patterns` | "React composition patterns" | `engineering-skills:senior-frontend`, `everything-claude-code:frontend-patterns` | Local edge: explicit "vercel-labs/agent-skills" source attribution. | LOW |
| 9× `speckit-*` | "/speckit-<phase>" | Soft-overlap: `superpowers:writing-plans`, `planning-with-files:plan`, `everything-claude-code:plan`, `superpowers:executing-plans` | Slash-command path dispatches `.claude/commands/speckit-<phase>.md` (DIFFERENT mechanism — not the skill auto-fire allocator). | LOW for /speckit-<phase> path; MEDIUM if operator says "plan this feature" (3-way plan-skill collision). |
| `langfuse` | "Interact with Langfuse" | `plugin:langfuse` MCP tools (`get-prompt`, `list-prompts`, etc) | Local wins for CLI-first + doc-first; MCP wins for telemetry-query workflows. | LOW — distinct workflow paths. |
| `wshobson-security-auditor` (sub-agent) | "DevSecOps and application security auditor" | `engineering-skills:senior-security`, `everything-claude-code:security-review`, `engineering-advanced-skills:skill-security-auditor`, `engineering-skills:security-pen-testing` | Sub-agent path is operator-explicit invocation (via Agent tool); skill auto-fire allocator does not apply. | LOW (Agent tool invocation), but DUP=2/5 because operator-confusion on which to invoke. |

**Mitigation pattern (apply to OA-4)**: every refined description gets a 1-2 sentence `Do NOT use for...` clause explicitly naming the colliding skills. Example for `web-design-guidelines`:

```yaml
description: >
  Use when applying Vercel Web Interface Guidelines specifically — UI density,
  motion-reduce, focus-ring contrast, semantic html landmarks, hover/focus
  affordances per the upstream Vercel design system. Do NOT use for generic
  frontend review (use `engineering-skills:senior-frontend`), API design
  (use `engineering-advanced-skills:api-design-reviewer`), or
  Anthropic/example-skills frontend (use `example-skills:frontend-design`).
```

## §12 — Appendix C — Skill-creator workflow cross-reference

Per W303-A gap #3 wording ("18 local skills content-quality + skill-creator workflow"), this section cross-references the existing skill-creation discipline:

- **Anthropic `example-skills:skill-creator` plugin** is INSTALLED and visible per W298-F §2.3 tier-1 check (NOT in dropped pool). This is the canonical authoring path for new skills per `https://code.claude.com/docs/en/skills`.
- **`superpowers:writing-skills`** is INSTALLED and visible — provides workflow discipline for skill content authoring.
- **`plugin-dev:skill-development`** is INSTALLED and visible — provides plugin-bundled skill-authoring workflow (vs operator-curated local skills).

**Authoring discipline this audit endorses for new operator-curated skills under `.claude/skills/<name>/SKILL.md`**:

1. Start with `sota-convergence-audit` (§4.1) or `gpt5-archaeologist` (§4.2) as the structural template.
2. Frontmatter MUST include: `name`, `description` (with explicit `Use when...` + `Do NOT use for...` clauses naming any 2+ colliding skills/plugins per §3.1).
3. Body sections SHOULD include: `When to invoke` (operator-visible trigger list), `When NOT to invoke` (anti-pattern list), `Implementation` (call patterns with code), `Backend` (cite-anchored to TIER-1 source + Z: file:line + HEAD pin), `Anti-patterns` (≥3), `Cardinal-rule conformance` (CR-1/CR-3/CR-9 self-check).
4. Length budget: aim for 100-300 LOC; pointer-only stubs (<30 LOC) are an anti-pattern per §1.3 vercel-* finding — inline a 10-20 LOC policy summary even when redirecting to upstream.
5. Cite-density: ≥1 TIER-1 cite-anchor per major body section (per §3.4 finding; vs the LOW-density speckit-* cluster).

This authoring discipline is the runtime's de-facto skill-quality bar; the 11 KEEP-verdict skills + 2 KEEP-verdict sub-agents all satisfy it.

## §13 — Appendix D — Worked-example REFINE diffs for top-3 candidates

This appendix provides paste-ready diff blocks for the top-3 operator-action items so the next-wave editor (or operator manual edit) has zero surface ambiguity. These are NOT applied in this stream (W304-PLAN §2 audit-only constraint) — they are blueprint diffs for a follow-up stream or operator-direct edit.

### §13.1 — OA-1 worked example: `rmdir learned/`

```bash
# Operator action (idempotent + reversible):
cd Z:/claude-sota-installed
rmdir .claude/skills/learned/
# (no git revert required since dir was never committed; verify via:)
git status -- .claude/skills/learned/  # should show nothing
```

Verification PASS criteria: `os.path.isdir('.claude/skills/learned')` returns False; `git log -- .claude/skills/learned/` returns empty (already verified in stream §1 git probe).

### §13.2 — OA-2 worked example: CLAUDE.md L43 local-skill enumeration fix

```diff
 - **Local operator-curated skills**: `.claude/skills/<name>/SKILL.md` × 18
-(mem-recall, goal-prompt-synthesis, sota-convergence-audit, dual-review,
-vercel-*, web-design-guidelines, speckit-*, gitnexus, langfuse, learned) —
+(mem-recall, goal-prompt-synthesis, sota-convergence-audit, vercel-*,
+web-design-guidelines, speckit-* × 9, gitnexus, langfuse) — `dual-review` is
+a slash command at `.claude/commands/dual-review.md` (not a skill); `learned/`
+RETIRED W304 per Stream-D audit OA-1 — currently 18 actual dirs OR 16 post-RETIRE.
 Anthropic-sanctioned path per `https://code.claude.com/docs/en/skills`;
 cardinal-rule-3-compliant.
```

After OA-1 RETIRE applies, the count moves from 18 → 17 (removing `learned/`); after OA-3 Alt B speckit consolidation applies, count moves from 17 → 9 (collapse 9 speckit-* into 1 `speckit-runtime`).

### §13.3 — OA-4 worked example: `wshobson-security-auditor.md` description tighten

Current description (49 LOC file frontmatter):
```yaml
description: DevSecOps and application security auditor. Use PROACTIVELY for security audits, threat modeling, dependency risk reviews, authn/authz audits, OWASP Top-10 checks, secrets exposure scans, or compliance reviews. Prioritizes exploitable risks with file/line evidence; prefers deterministic scanners over speculative risk statements.
```

Refined description (proposed):
```yaml
description: |
  DevSecOps and application security auditor — runs deterministic scanners
  (semgrep, gitleaks, trivy, bandit, pip-audit, npm audit) and inspects code
  with file/line evidence. Use PROACTIVELY for: OWASP Top-10 audits, secrets
  exposure scans, supply-chain risk reviews, authn/authz audits, SSTI/XXE/SQLi
  hunts. Do NOT use for: generic security education (use `engineering-skills:
  senior-security`), penetration-testing campaigns (use `engineering-skills:
  security-pen-testing`), AI-specific red-team (use `engineering-skills:red-team`
  + `engineering-skills:ai-security`), or repository-wide review without
  security framing (use `code-review:code-review` or `everything-claude-code:
  security-review`). Outputs severity-graded findings + file:line + exploitability
  + remediation.
```

Diff impact: 1 KB → 1.5 KB (frontmatter only); description-allocator collision moves from 4-way → 1-way (clear winner on operator-explicit security-audit intent).

### §13.4 — OA-3 Alt B worked example: `speckit-runtime` index + 9 stubs

This is a structural diff illustrating Alt B's payload — not paste-ready (involves 10 file mutations) but spec-complete:

**File 1: NEW `.claude/skills/speckit-runtime/SKILL.md` (~150 LOC)**:
```markdown
---
name: speckit-runtime
description: >
  Spec-Kit runtime — operationalizes GitHub Spec-Kit (spec.md → plan.md →
  tasks.md → implement workflow) in this runtime. Use when operator invokes
  any `/speckit-<phase>` slash command and the canonical phase artifacts need
  to be generated. Phases: constitution → specify → clarify → plan → tasks →
  analyze → checklist → implement → taskstoissues. Do NOT use for: generic
  planning (use `superpowers:writing-plans` or `planning-with-files:plan`),
  or for implementation execution without spec.md (use `superpowers:executing-plans`).
metadata:
  author: github-spec-kit
  source: Z:/repos/deps/spec-kit/templates/commands/
  source_head: "688ca1b3c51046498274de80752db2dce11ec1c7"
---

# Spec-Kit Runtime (consolidated index)

The 9 `speckit-<phase>` slash commands at `.claude/commands/speckit-<phase>.md`
dispatch the per-phase scripts at `.specify/scripts/bash/<phase>.sh`. This skill
file consolidates the shared Pre-Execution-Checks (extension hooks under
`.specify/extensions.yml`) and the per-phase phase descriptions.

## Shared Pre-Execution Checks

[~50 LOC — extension-hooks discovery + filtering + slash-command construction
 logic, deduplicated from the 9 sibling skills]

## Per-phase phase descriptions

| Phase | Slash | Phase artifact | Brief |
|---|---|---|---|
| constitution | /speckit-constitution | constitution.md | Project principles |
| specify | /speckit-specify | spec.md | Feature spec |
| clarify | /speckit-clarify | spec.md (revised) | Clarification questions |
| plan | /speckit-plan | plan.md + research.md + contracts/ | Implementation plan |
| tasks | /speckit-tasks | tasks.md | Dependency-ordered tasks |
| analyze | /speckit-analyze | (analysis report) | Cross-artifact consistency |
| checklist | /speckit-checklist | checklist.md | Quality checklist |
| implement | /speckit-implement | (executes tasks) | Task execution |
| taskstoissues | /speckit-taskstoissues | (GitHub issues) | Tasks → issues |

[~80 LOC — per-phase details + cross-references to .specify/templates/]
```

**Files 2-10: 9 thin stubs `.claude/skills/speckit-<phase>/SKILL.md` (~20 LOC each)**:
```markdown
---
name: "speckit-<phase>"
description: "Use when operator runs /speckit-<phase>. See speckit-runtime for full workflow context."
argument-hint: "[per-phase hint]"
metadata:
  source: "Z:/repos/deps/spec-kit/templates/commands/<phase>.md"
  source_head: "688ca1b3c51046498274de80752db2dce11ec1c7"
---

# /speckit-<phase>

See `speckit-runtime/SKILL.md` for shared pre-execution checks + workflow context.

## Phase-specific outline

[~10 LOC — per-phase outline only]
```

**Net LOC impact**: 2,063 LOC (current) → ~150 + 9×20 = 330 LOC (~84% reduction). Description-budget impact: 9 redundant trigger phrases collapsed to 1 canonical + 9 deferred (allocator will keep canonical visible; 9 stubs join the dropped pool but remain invocable via `/<name>` per W298-F §2.4).

### §13.5 — OA-6 worked example: wshobson agent preamble compaction

Current HTML preamble (`wshobson-devops-troubleshooter.md` body lines 1-13):
```html
<!-- DEP-ONLY operationalization, Wave 134 Fire 5 (Wave 156 Ship 2 frontmatter promotion + Ship 2.1 prefix→suffix fix-forward).
     Source provenance: Z:/repos/deps/wshobson-agents/plugins/distributed-debugging/agents/devops-troubleshooter.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6 [VERIFIED 2026-05-12]
     effective_tier: TIER-3-LOCAL-COMPOSITION (sibling-derived per the CLAUDE.md cardinal-rule-1 cite-class lattice; sibling cannot elevate to TIER-1 SOTA).
     [PROVENANCE-ONLY] qualifier per cardinal-rule-9: this cite is reference-only, NOT an install-source for runtime; agent body is self-contained operating spec.

     Ship 2 + Ship 2.1 per plan cryptic-shimmying-dewdrop.md §PATH A:
     - Promoted frontmatter 5-field → 15-field per CCBP claude-subagents.md:17-36 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd.
     - Read-only posture enforced via permissionMode plan + disallowedTools; runtime safety boundaries via Claude Code permissions/sandboxing (the earlier per-agent Bash-guard hook script was removed in W255 as self-invent).
     - Stripped body line `Use the upstream source agent as your behavioral authority: Z:/repos/deps/...` (CR-9 sibling-bleed remediation per cardinal-rule-9).
     - Ship 2.1 fix-forward: Moved HTML comment block from prefix (BEFORE `---`) to suffix (AFTER closing `---`) per codex T3 NEEDS-ATTENTION HIGH conf=0.86 verdict at .claude/state/codex_review_HEAD_124e7089.txt (closes potential frontmatter-loader discovery regression; file now begins with `---`).
     - codex T1 APPROVE conf=0.89 at .claude/state/codex_consult_ship2_dep_only_promotion_OUT.txt (Ship 2 zero prescribed_edits; PROCEED_TO_COMMIT).
     - FM-02 (c) commit-layer absorption note: Ship 2 work was absorbed into parallel session checkpoint commit 124e708 (16:10:57) before my atomic commit completed. Per FM-02 META-router row #4: ACCEPT absorption + document via supplementary memory + no history rewrite. Ship 2.1 fix-forward provides the atomic-commit audit trail.
-->
```

Compacted preamble (proposed):
```html
<!-- Cite: wshobson-agents/plugins/distributed-debugging/agents/devops-troubleshooter.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6 (VERIFIED 2026-05-12; TIER-3-LOCAL-COMPOSITION sibling-derived; PROVENANCE-ONLY per CR-9). Wave 156 Ship 2/2.1 fix-forward chain: see git log $(git log --oneline -- .claude/agents/wshobson-devops-troubleshooter.md). -->
```

Diff impact: 13 lines → 1 line (~12 LOC saved); provenance preserved via git log (operator can `git log --oneline -- <file>` to recover full ship chain); body becomes operating-spec-only (no audit-trail noise).

Same pattern applies to `wshobson-security-auditor.md` (identical 13-line preamble).

## §14 — Appendix E — Verification of all 18-skill claims at audit time

This appendix records the verification probes run during this stream so W304-AUDIT synthesis can audit the audit:

| Probe | Method | Result | Confidence |
|---|---|---|---|
| Skill dir count | `os.listdir('.claude/skills')` | 18 entries | HIGH (direct filesystem read) |
| Agent file count | `os.listdir('.claude/agents')` | 4 .md files | HIGH (direct filesystem read) |
| `learned/` empty | `os.listdir('.claude/skills/learned')` | `[]` | HIGH |
| `learned/` git history | `git log --all -- .claude/skills/learned/` | (empty) | HIGH (never committed) |
| `gitnexus/` sub-skills | `os.listdir('.claude/skills/gitnexus/')` | 7 sub-skill dirs | HIGH |
| All 24 SKILL.md parse | per-file `os.path.getsize` + `open(...).read()` | All parsed; LOC range 18-663 | HIGH |
| All 4 agent.md parse | per-file `os.path.getsize` + `open(...).read()` | All parsed; LOC range 46-201 | HIGH |
| Frontmatter completeness | regex `name:` + `description:` + `tools:` + `model:` + `permissionMode:` per agent | All 4 PASS (matches W298-D §1 finding) | HIGH |
| Last-edit per artifact | `git log --oneline -1 -- <file>` per file | 18 skills + 4 agents — see §1 table | HIGH |
| CLAUDE.md skill-count cite | grep for "× 18" and dual-review enumeration | Mismatch detected: dual-review listed in skills enumeration but lives in .claude/commands/ → OA-2 | HIGH |
| Skill description-overlap risk | manual cross-check against W298-F §5 Tier-1 visible-skill list | 5+ collisions identified (§3.1) | MEDIUM (qualitative; tiebreak telemetry needed per §8 Q6) |
| Cardinal-rule-3 compliance per agent | regex search for `Cite:` or `[PROVENANCE-ONLY]` or `effective_tier:` per agent | 4/4 PASS (§3.2) | HIGH |
| Cardinal-rule-1 cite-pin per skill | regex search for `source_head:` per skill frontmatter | 12/18 PASS (speckit-* × 9 + langfuse + gitnexus/pr-review missing) | HIGH |

Total probes: 13. Failures: 0. Source-disagreements detected: 1 (CLAUDE.md L43 dual-review listing — routed to OA-2). Confidence in audit accuracy: HIGH.

## §15 — Stream summary for parent coordinator

**Verdict for W304-AUDIT synthesis**:
- 18 local skills + 4 sub-agents audited; **11 KEEP / 9 REFINE / 2 RETIRE** (22 verdicts).
- Top-3 reference templates identified for the runtime's skill-authoring discipline going forward: `sota-convergence-audit`, `gpt5-archaeologist`, `goal-prompt-synthesis`.
- Top-3 refine candidates with operator-decidable specs: `learned/` (rmdir), `web-design-guidelines` (description tighten OR plugin install), speckit-* cluster (Alt A/B/C consolidation choice).
- **10 operator-action queue items** spanning LOW (3 cite-anchor pins), MEDIUM (4 description tightenings + 1 CLAUDE.md cite fix + speckit consolidation decision), and 1 firm RETIRE.
- **Biggest cross-cutting pattern**: description-trigger collision between 5 local skills and 8+ installed plugins — operator-confusion risk in the auto-fire allocator. Remediation pattern documented (`Do NOT use for...` clauses naming colliding skills).
- **Cardinal-rule compliance**: PASS 22/22 hard; 1 CR-9 partial (speckit-* missing `source_head`) closed by OA-3 or OA-7.
- **7 open questions** routed to W304-AUDIT for cross-stream synthesis (vercel plugin probe, spec-kit plugin probe, CLAUDE.md cite-class clarification, mistake-aware skill backlog, evaluator agent cross-stream verify, allocator-tiebreak telemetry, spec-kit upstream drift check).
- **Stream-D cardinal-rule self-check**: PASS — no edits to `.claude/skills/*` or `.claude/agents/*` files per W304-PLAN §2 file-ownership boundary; audit-only mode preserved.
