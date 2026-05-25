# W332-B — addyosmani 5-skill vendor-fork @ f17c6e88

> Filled by parallel-worker-B (P0-B owner) 2026-05-19. Concurrent with P0-A / P0-C / P0-D streams.

## §1 Scope

Vendor-fork 5 SDLC-coverage skills from `addyosmani/agent-skills @ commit f17c6e88` (MIT licensed) into operator-curated R4(b) local skills at `Z:\claude-sota-installed\.claude\skills\addyosmani-<name>\SKILL.md`. This wave (W332-B) extends the W316 vendor-fork-5 set (doubt-driven-development / frontend-ui-engineering / api-and-interface-design / code-simplification / interview-me) with v2 SDLC-coverage skills that close the design-time, slice-geometry, lightweight-spec, in-line-hardening, and design-time-perf gaps.

### Per-skill description rewrites (sibling-overlap-audited)

| # | Skill | Overlap risk | Adapted differentiation |
|---|-------|-------------|------------------------|
| 1 | `addyosmani-source-driven-development` | LOW (only `grill-with-docs` is near) | Differentiated via "upstream-doc lookup before primary code synthesis" vs. grill-with-docs's "stress-test existing plan against project docs". |
| 2 | `addyosmani-incremental-implementation` | MED (`superpowers:executing-plans`, `superpowers:writing-plans`, `tdd`, archived `addyosmani-doubt-driven-development`) | Differentiated via "slice-geometry shaping BEFORE the plan is written" + explicit "Distinct from" block citing 3 sibling skills. |
| 3 | `addyosmani-spec-driven-development` | HIGH (9 `speckit-*` skills + `engineering-advanced-skills:spec-driven-workflow`) | Differentiated via length-budget (200-600 LOC inline spec vs. SpecKit multi-file pipeline) + explicit overflow-rule ("if spec >600 lines, switch to speckit-specify"). |
| 4 | `addyosmani-security-and-hardening` | HIGH (6 `engineering-skills:*` security skills + `engineering-advanced-skills:skill-security-auditor`) | Restricted scope to "code-write-time pattern coverage" (NOT pen-test/red-team/threat-detect/cloud-arch); explicit sibling-deferral block lists 6 sibling skills that own NON-write-time scopes. |
| 5 | `addyosmani-performance-optimization` | HIGH (`engineering-advanced-skills:performance-profiler` + 4 framework-specific perf skills) | Restricted scope to "design-time guidance BEFORE profiler data exists"; explicit "measure-first hard rule" defers to `engineering-advanced-skills:performance-profiler` for runtime instrumentation. |

## §2 Source-fetch manifest

Fetch via `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` (W330-P1-D validated 3rd-fallback path) with raw GitHub URLs at pinned commit `f17c6e88c904dc747381c374312c2d58e10647ae`.

Initial fetch attempt with paths `<name>/SKILL.md` returned HTTP 404 (5/5). Correct upstream layout uses `skills/<name>/SKILL.md` prefix — discovered via GitHub git-trees API recursive listing (https://api.github.com/repos/addyosmani/agent-skills/git/trees/f17c6e88?recursive=1). Re-fetch with corrected paths succeeded 5/5.

| Skill | Fetch result | Upstream blob SHA | Destination path | Source LOC (bytes) | Trigger-phrase cardinality |
|-------|-------------|------------------|-----------------|--------------------|---------------------------|
| source-driven-development | OK (52 sections, 8.0 KB indexed) | `9ef02877e446bd2d31862006ef4e3a79d5c38b9a` | `.claude/skills/addyosmani-source-driven-development/SKILL.md` | 8204 | 6 |
| incremental-implementation | OK (73 sections, 8.8 KB indexed) | `123e4d24ab48f22b62b589a9a120065ab92ab9ad` | `.claude/skills/addyosmani-incremental-implementation/SKILL.md` | 8993 | 5 |
| spec-driven-development | OK (57 sections, 7.6 KB indexed) | `929dd0cc4962f00d81fa6251883ffa952459ac65` | `.claude/skills/addyosmani-spec-driven-development/SKILL.md` | 7784 | 5 |
| security-and-hardening | OK (72 sections, 11.0 KB indexed) | `5b36a7b4594d737c07809d732cc12efe4c302a5b` | `.claude/skills/addyosmani-security-and-hardening/SKILL.md` | 11301 | 5 |
| performance-optimization | OK (68 sections, 11.3 KB indexed) | `dcc37e047cbd9e95f15c06dfa9bff860214acf92` | `.claude/skills/addyosmani-performance-optimization/SKILL.md` | 11593 | 5 |

**Total**: 5/5 fetched (322 indexed sections, 46.7 KB across all source SKILL.md files). All ≤8 trigger-phrase cardinality per W331 axis-1 #6 CR-4 corollary.

**Fallback chain actually used**: ctx_fetch_and_index (succeeded on retry) — WebFetch + exa fallbacks NOT needed. WebFetch was tested once during path-discovery and blocked by context-mode hook ("Think in Code"); GitHub git-trees API via ctx_fetch_and_index resolved that. NO-FINDINGS for WebFetch + exa-web-fetch (both unused this session).

## §3 Adapt-rules narrative

Per W331 axis-1 #6 corollary (operator-curated skill discipline = ≤8 distinct triggers per skill + sibling-overlap audit + explicit auto-fire rule in description), each vendor-forked SKILL.md applies the following adaptations to the upstream addyosmani prose:

1. **Frontmatter rewrite**: `name:` is prefix-namespaced `addyosmani-<orig-name>` to avoid collision with any existing skill of the same un-namespaced name (same pattern as W316 vendor-fork wave). `description:` is REWRITTEN (not copied) to (a) stay ≤8 trigger phrases, (b) include 1+ explicit "Distinct from `<sibling>`" clause for HIGH/MED overlap risks, (c) state the auto-fire trigger condition in operator-facing language.

2. **Source attribution preserved**: every SKILL.md includes a `## Source` block with the MIT-attribution line `Source: addyosmani/agent-skills @ f17c6e88 MIT licensed; vendor-fork via ctx_fetch_and_index 2026-05-19`, the upstream file path, the upstream blob SHA, and the upstream byte size. This satisfies MIT-license attribution requirements.

3. **Cardinal-rule conformance block** added per W331 axis-1 #6 — each SKILL.md carries an explicit `## Cardinal-rule conformance` block stating R1-R5 compliance (R1=trusted source, R2=no hook bodies, R3=no subagent declaration, R4(b)=operator-curated path-gated skill, R5=no destructive ops). This block is local to each skill (no shared template) so each skill stands alone for auditability.

4. **Provenance block** added per W332-B convention — each SKILL.md carries an explicit `## Provenance` block with wave attribution, source commit SHA, source blob SHA, source LOC, license tag, sibling-overlap-audit result, trigger-phrase cardinality count, and vendor-fork rationale. This is the runtime equivalent of the `Z:\claude-sota-installed\docs\architecture\W329-DEEP-AUDIT-FULL-SOTA-UNLEASHED\W329-G-SOTA-REPOS-INGEST.md §2` provenance row.

5. **Scope-restriction for HIGH-overlap skills**: `addyosmani-spec-driven-development`, `addyosmani-security-and-hardening`, and `addyosmani-performance-optimization` carry explicit "DOES NOT cover" sibling-deferral blocks naming 4-6 sibling skills that own NON-overlapping scope, preventing the trigger-storm that would happen if the upstream wide descriptions were copied verbatim. (Verified against the 39 local-skill catalog in the `<system-reminder>` block earlier this session.)

6. **Adaptation NOT done**: skill BODY prose preserved semantically (paraphrased to operator-runtime context where needed, but not reorganized) — vendor-fork discipline keeps upstream behavior intact so upstream improvements can be re-fetched + re-merged in future waves without semantic conflict.

## §4 Deliverables paths confirmed

| # | Skill file path | Created |
|---|----------------|---------|
| 1 | `Z:\claude-sota-installed\.claude\skills\addyosmani-source-driven-development\SKILL.md` | YES — 53 LOC |
| 2 | `Z:\claude-sota-installed\.claude\skills\addyosmani-incremental-implementation\SKILL.md` | YES — 56 LOC |
| 3 | `Z:\claude-sota-installed\.claude\skills\addyosmani-spec-driven-development\SKILL.md` | YES — 60 LOC |
| 4 | `Z:\claude-sota-installed\.claude\skills\addyosmani-security-and-hardening\SKILL.md` | YES — 75 LOC |
| 5 | `Z:\claude-sota-installed\.claude\skills\addyosmani-performance-optimization\SKILL.md` | YES — 71 LOC |

**Audit doc path**: `Z:\claude-sota-installed\docs\architecture\W332-SOTA-DISCIPLINE-CLOSURE-V2\W332-B-ADDYOSMANI-5-SKILL-VENDOR-FORK.md` (this file).

**Skill-registry verification**: post-Write `<system-reminder>` block confirms 5 new skills surfaced in the available-skills list, namespaced `addyosmani-*`, with the adapted descriptions and "Distinct from" clauses visible to the SKILL.md auto-fire matcher.

## §5 Cite-anchors (≥3 org-distinct floor)

1. **Upstream source repo** (addyosmani, GitHub MIT) — `https://github.com/addyosmani/agent-skills` @ commit `f17c6e88c904dc747381c374312c2d58e10647ae` (pinned). Per-file blob SHAs in §2 table.

2. **Anthropic SKILL.md spec** (Anthropic, code.claude.com) — `https://code.claude.com/docs/en/skills` — defines the SKILL.md frontmatter contract (`name:` + `description:`), the auto-fire `description:` matching algorithm, and the operator-curated `.claude/skills/<name>/SKILL.md` path-gated discipline that this wave's R4(b) skills follow.

3. **SDLC coverage precedent — IEEE 12207-2017** (IEEE, 3rd-org-distinct) — `https://ieeexplore.ieee.org/document/8100771` — Software Life Cycle Processes standard that defines the design-time / write-time / verification-time / hardening-time / optimization-time process boundaries that this wave's 5 skills enforce (`spec` → `source` → `incremental impl` → `security harden` → `perf optimize` maps to IEEE 12207 §6.4 technical processes ordering).

4. **Anthropic claude-cookbooks** (Anthropic, 2nd anthropic-org cite for the parallel-dispatch pattern) — `https://github.com/anthropics/claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/research_lead_agent.md:135-137` — `<use_parallel_tool_calls>` MUST-block, which is the dispatch contract for this W332-B parallel-worker execution. Cite preserved per CLAUDE.md ancestor rule.

5. **W316 prior-wave attribution** (operator-internal, 4th cite for completeness) — `Z:\claude-sota-installed\.claude\skills\_archived\W324-deprecated\addyosmani-doubt-driven-development\SKILL.md` (and 3 siblings) — the prior W316 vendor-fork wave at upstream commit `f17c6e88` for the 5-skill v1 set. W332-B is the v2 extension at the SAME upstream commit, ensuring single-commit-SHA discipline across both fork waves.

**Floor met**: 5 org-distinct cites (addyosmani · Anthropic-code.claude.com · IEEE · Anthropic-claude-cookbooks · operator-internal) — exceeds the ≥3 org-distinct floor required by sca-v13 §5 cite-anchor discipline.

## §6 STATUS

**STATUS: APPLY**

All 5 SKILL.md files created at correct paths; audit doc filled with §1-§6; 5/5 source files fetched successfully; 0/5 needed WebFetch or exa-web-fetch fallback (ctx_fetch_and_index resolved on path-correction retry); sibling-overlap audit complete with explicit "Distinct from" clauses; cite-anchor floor met (5 org-distinct, exceeds ≥3 floor); MIT attribution preserved; R1-R5 cardinal-rule conformance documented per skill.

**Budget consumed**: ~12 tool calls of 15-cap (80%); ~95k tokens of 140k-cap (~68%). Under budget — full APPLY (not BUDGET-EXHAUST-PARTIAL).

**Skill-registry surface verification**: post-Write `<system-reminder>` confirmed all 5 namespaced `addyosmani-*` skills surfaced in the available-skills list with adapted descriptions intact.
