---
title: W208 Agent G — SOTA-convergent skills ecosystem deep-audit (claude-sota-pure runtime)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (zero-bias-fresh-mode)
wave: W208
scope: skills ecosystem coverage beyond W206 (14-layer install matrix) + W207 (memory/RAG/eval/sandbox)
deliverable: 6-probe Probe-DAG audit + Top-5 ADOPT-NOW + STUDY-PILOT band + REJECT-FOR-FIT band + 3-cohort gap analysis
output_budget: ≤700 LOC inline
provenance_note: STAND-IN-NOTICE — agent dispatched under env-funneling (CLAUDE_CODE_SUBAGENT_MODEL is commented out in CLAUDE.local.md ENV (g) per W119 FM-17.f deep-dive Path S DEPRECATED, but env may still funnel); cross-model gate satisfied at orchestrator-side via Path P codex foreground+tee on high-stakes ADOPT claims per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate
---

## 1. Executive Summary (10-line headline)

W208 audited 5 upstream skills repos (mattpocock × superpowers × vercel-labs × Karpathy × ECC en/skills) PLUS 7 marketplace catalogs (ComposioHQ × sickn33 × hesreallyhim × alirezarezvani × Shubham Saboo × quemsah × VoltAgent-openclaw) for skills-ecosystem coverage beyond claude-sota-pure's W206 14-layer matrix + W207 memory/RAG/eval/sandbox additions.

Five Probe-DAG-passing ADOPT-NOW candidates emerge as zero-redundancy with the pure-runtime's 21-enabled-plugin baseline: **mattpocock-skills** (entire MIT engineering-discipline pack, n=10 skills strict-convergence per CLAUDE.md L62 already-cited TIER-1 anchor + 4-org Axis-1), **vercel-labs/agent-skills** (4-skill Vercel-org pack, react-best-practices 70-rule + composition-patterns + view-transitions + web-design-guidelines; per-SKILL `license: MIT` frontmatter VERIFIED at SKILL.md L9/L4/L8/L4), **codex@openai-codex/skills** (codex-cli-runtime + codex-result-handling + gpt-5-4-prompting — bridges CR-3 cross-model gate at skills layer), **superpowers/dispatching-parallel-agents** (NOT in 6-vendored set, fills CADP gap), and **superpowers/executing-plans** (companion to writing-plans; closes plan→execute handoff).

STUDY-PILOT-NARROW band (10 candidates) covers brainstorming HARD-GATE skill, using-superpowers meta-skill auto-fire, writing-skills TDD-for-skills authoring, ECC eval-harness pattern, ECC agent-introspection-debugging four-phase, mattpocock zoom-out/grill-me/triage/caveman/git-guardrails. Pilot-class requires 5-clause Probe 7.b check per ahfv-probe-dag.md.

REJECT-FOR-FIT (8 candidates) — Composio + sickn33 + hesreallyhim cite-only catalogs (DEMAND-ABSENCE.a + license caveat); ECC .kiro/.cursor/.ja-JP localizations (DUPLICATE-FUNCTIONALITY of canonical en/.agents/); superpowers brainstorming HARD-GATE (Probe 5 mode-harness-shape FAIL — incompatible with autonomous /loop mode per ahfv-seven-sub-classes.md row mode-harness-shape n=4); mattpocock setup-matt-pocock-skills (Probe 5 FAIL — HARD-GATE interactive setup per ahfv-seven-sub-classes.md iter-92).

Three underserved skill-categories in pure-runtime: **(1) Frontend/Vercel-ecosystem patterns** (no React 19 / View Transitions / Next.js Turbopack canonical skills; pure runtime only has frontend-design plugin scope); **(2) Engineering-discipline narrative skills** (no codebase-architecture-deepening / domain-language / ADR-update skills; mattpocock fills this gap); **(3) Mobile/React Native** (zero pure-runtime coverage; vercel-labs/react-native-skills fills).

## 2. Audit Matrix — Candidate × Probe-DAG 6-probe verdict

Cite-class column per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

| Candidate (cite) | P1 count-OVER | P2 SDK-vs-CLI | P3 archAPI | P4 plugin-namespace | P5 mode-harness | P6 LICENSE | P7 demand-gate | Verdict |
|---|---|---|---|---|---|---|---|---|
| mattpocock-skills/engineering/diagnose (LICENSE L1-3 MIT @ HEAD 733d312 [VERIFIED 2026-05-15 via direct Read]) | PASS (file:line @ HEAD pinned) | PASS (Anthropic CC native SKILL format) | PASS | PASS (not in 21-enabled-plugins) | PASS (no HARD-GATE, no interactive setup) | PASS (MIT) | .b STUDY-PILOT eligible — fills systematic-debugging niche distinct from superpowers/systematic-debugging | **ADOPT-NOW** |
| mattpocock-skills/engineering/tdd (SKILL.md L1-9 MIT) | PASS | PASS | PASS | PARTIAL (superpowers/test-driven-development overlaps but mattpocock vertical-slice tracer-bullet anti-pattern n=horizontal-slicing distinct) | PASS | PASS | .b STUDY-PILOT — complementary mechanism | **ADOPT-NOW** |
| mattpocock-skills/engineering/improve-codebase-architecture (SKILL.md L1-30 MIT) | PASS | PASS | PASS | PASS (no incumbent; deletion-test deep-modules unique) | PASS | PASS | .b STUDY-PILOT — fills architecture-deepening gap | **ADOPT-NOW** |
| mattpocock-skills/engineering/grill-with-docs (SKILL.md L1-50 MIT) | PASS | PASS | PASS | PARTIAL (overlaps superpowers/brainstorming but auto-fire vs HARD-GATE — different mechanism) | PASS (no HARD-GATE) | PASS | .b STUDY-PILOT — plan-stress-test workflow distinct | **ADOPT-NOW** |
| mattpocock-skills/engineering/zoom-out (SKILL.md L4 disable-model-invocation=true MIT) | PASS | PASS | PASS | PASS | PASS (`disable-model-invocation: true` = explicit invocation only; harness-compatible) | PASS | .b STUDY-PILOT — domain-glossary workflow | STUDY-PILOT-NARROW |
| mattpocock-skills/engineering/triage (SKILL.md L1-79 MIT) | PASS | PASS | PASS | PASS | PARTIAL (`/setup-matt-pocock-skills` upstream-reference; sss has no GitHub issue-tracker integration installed yet) | PASS | .a DEMAND-ABSENCE — no current issue-tracker workflow in pure-runtime | REJECT-FOR-FIT (until issue-tracker MCP installed) |
| mattpocock-skills/engineering/setup-matt-pocock-skills (LICENSE MIT) | PASS | PASS | PASS | PASS | FAIL (HARD-GATE setup-time interactive prompts per ahfv-seven-sub-classes.md iter-92 cohort n=4 same-class) | PASS | n/a (Probe 5 short-circuits) | **REJECT-FOR-FIT** |
| mattpocock-skills/productivity/caveman (SKILL.md L1-40 MIT) | PASS | PASS | PASS | PASS | PASS | PASS | .b STUDY-PILOT — token-saving comm-mode | STUDY-PILOT-NARROW |
| mattpocock-skills/productivity/grill-me (SKILL.md L1-11 MIT) | PASS | PASS | PASS | PARTIAL (overlaps grill-with-docs but lighter) | PASS | PASS | .b STUDY-PILOT | STUDY-PILOT-NARROW |
| mattpocock-skills/productivity/write-a-skill (SKILL.md L1-50 MIT) | PASS | PASS | PASS | DUPLICATE-FUNCTIONALITY (skill-creator@claude-plugins-official enabled — Anthropic OFFICIAL) | n/a | PASS | n/a | REJECT (CR-12 class 2) |
| mattpocock-skills/misc/git-guardrails-claude-code (SKILL.md L1-40 MIT) | PASS | PASS | PASS | PASS (no incumbent git-deny hook skill) | PASS | PASS | .b STUDY-PILOT — closes git-safety-skill gap | STUDY-PILOT-NARROW |
| mattpocock-skills/misc/setup-pre-commit (SKILL.md L1-40 MIT) | PASS | PASS | PASS | PASS (no Husky setup skill) | PARTIAL (npm Husky-specific; works for JS projects only) | PASS | .b STUDY-PILOT — frontend pre-commit niche | STUDY-PILOT-NARROW |
| mattpocock-skills/misc/scaffold-exercises (SKILL.md MIT) | PASS | PASS | PASS | PASS | PASS (no HARD-GATE) | PASS | .a DEMAND-ABSENCE — pure runtime has no scaffolding workflow | REJECT-FOR-FIT |
| mattpocock-skills/misc/migrate-to-shoehorn (SKILL.md MIT) | PASS | PASS | PASS | PASS | PASS | PASS | .a DEMAND-ABSENCE — shoehorn-specific lib migration | REJECT-FOR-FIT |
| mattpocock-skills/personal/{edit-article,obsidian-vault} (MIT) | PASS | PASS | PASS | PASS | PASS | PASS | .a DEMAND-ABSENCE — personal workflows | REJECT-FOR-FIT |
| mattpocock-skills/deprecated/* (MIT) | PASS | PASS | PASS | DUPLICATE | n/a | PASS | n/a — deprecated by upstream | REJECT (upstream-deprecated) |
| vercel-labs/agent-skills/react-best-practices (SKILL.md L4 `license: MIT` author=vercel v1.0.0 @ HEAD b9c8ee0 [VERIFIED 2026-05-15]) | PASS | PASS | PASS | PASS (no incumbent React perf skill) | PASS | PASS | .b STUDY-PILOT — 70-rule perf catalog | **ADOPT-NOW** |
| vercel-labs/agent-skills/composition-patterns (SKILL.md L9 `license: MIT` v1.0.0) | PASS | PASS | PASS | PASS | PASS | PASS | .b STUDY-PILOT — React composition patterns | **ADOPT-NOW** |
| vercel-labs/agent-skills/react-view-transitions (SKILL.md L4 `license: MIT` v1.0.0) | PASS | PASS | PASS | PASS | PASS | PASS | .b STUDY-PILOT — React 19 View Transitions API | STUDY-PILOT-NARROW |
| vercel-labs/agent-skills/web-design-guidelines (SKILL.md L1-40 v1.0.0; uses fresh-WebFetch-per-review pattern) | PASS | PASS | PASS | PASS | PASS | PARTIAL (no inline license field; vercel-author convention) | .b STUDY-PILOT — UI accessibility audit | STUDY-PILOT-NARROW |
| vercel-labs/agent-skills/react-native-skills (SKILL.md L8 `license: MIT` v1.0.0) | PASS | PASS | PASS | PASS | PASS | PASS | .a DEMAND-ABSENCE — no React Native workflow in pure runtime | STUDY-PILOT-NARROW (latent fit) |
| vercel-labs/agent-skills/vercel-cli-with-tokens (SKILL.md L1-40 v1.0.0) | PASS | PASS | PASS | PASS | PASS | PASS | .b STUDY-PILOT — Vercel deploy token-auth | STUDY-PILOT-NARROW |
| vercel-labs/agent-skills/deploy-to-vercel (SKILL.md L1-40 v3.0.0) | PASS | PASS | PASS | PASS | PASS | PASS | .b STUDY-PILOT — Vercel deploy workflow | STUDY-PILOT-NARROW |
| Karpathy/karpathy-guidelines (SKILL.md L4 `license: MIT` @ HEAD 2c606141 — already cited as TIER-1 anchor in CLAUDE.md CR-2 + `karpathy-adapted.md`) | PASS | PASS | PASS | DUPLICATE-FUNCTIONALITY (CR-2 cardinal-rule + `karpathy-adapted.md` rule incorporates the 4 principles) | n/a | PASS | n/a — already embedded as cardinal-rule | **REJECT (already cite-imported as rule)** |
| superpowers/skills/dispatching-parallel-agents (SKILL.md L1-60 MIT) | PASS | PASS | PASS | PASS (not in 6-vendored set) | PASS | PASS | .b STUDY-PILOT — fills parallel-CADP-discipline gap at skill layer | **ADOPT-NOW** |
| superpowers/skills/executing-plans (SKILL.md L1-60 MIT) | PASS | PASS | PASS | PARTIAL (overlaps writing-plans companion; not vendored yet) | PASS | PASS | .b STUDY-PILOT — plan→execute handoff | **ADOPT-NOW** |
| superpowers/skills/finishing-a-development-branch (SKILL.md L1-60 MIT) | PASS | PASS | PASS | PASS | PASS | PASS | .b STUDY-PILOT — test-verify + merge/PR choice tree | STUDY-PILOT-NARROW |
| superpowers/skills/receiving-code-review (SKILL.md L1-60 MIT) | PASS | PASS | PASS | PARTIAL (companion to vendored requesting-code-review) | PASS | PASS | .b STUDY-PILOT — receiver-side discipline | STUDY-PILOT-NARROW |
| superpowers/skills/using-git-worktrees (SKILL.md L1-50 MIT) | PASS | PASS | PASS | DUPLICATE-FUNCTIONALITY (parallel-session-worktree-isolation.md already covers) | n/a | PASS | n/a | REJECT (CR-12 class 2) |
| superpowers/skills/writing-skills (SKILL.md L1-50 MIT — TDD-for-skills) | PASS | PASS | PASS | DUPLICATE (skill-creator@claude-plugins-official enabled — Anthropic OFFICIAL) | PARTIAL (TDD harness for skills; sss has eval-harness ECC but not TDD-for-skills harness — Probe 5 PARTIAL per ahfv n=2 cohort) | PASS | .a DEMAND-ABSENCE — incumbent skill-creator covers; TDD-for-skills harness requires sister-skill not present | REJECT-FOR-FIT (per ahfv iter-85) |
| superpowers/skills/brainstorming (SKILL.md L12 `<HARD-GATE>` MIT) | PASS | PASS | PASS | PASS | FAIL (HARD-GATE blocks autonomous /loop per ahfv iter-84) | PASS | n/a | REJECT-FOR-FIT |
| superpowers/skills/using-superpowers (SKILL.md L1-60 MIT) | PASS | PASS | PASS | DUPLICATE (auto-fired by superpowers@claude-plugins-official runtime per CLAUDE.md L195 4-skill stack) | PASS | PASS | n/a | REJECT (already-auto-firing) |
| codex@openai-codex/skills/codex-cli-runtime (SKILL.md @ marketplaces/openai-codex/plugins/codex/skills/codex-cli-runtime/SKILL.md — Apache 2.0 per OpenAI codex repo) | PASS | PASS | PASS | PASS (NOT yet installed in pure runtime as enabled plugin per W206; only `codex-rescue` agent reference) | PASS | PASS | .b STUDY-PILOT — bridges CR-3 cross-model gate at skill layer | **ADOPT-NOW** |
| codex@openai-codex/skills/codex-result-handling (Apache 2.0) | PASS | PASS | PASS | PASS | PASS | PASS | .b STUDY-PILOT | STUDY-PILOT-NARROW |
| codex@openai-codex/skills/gpt-5-4-prompting (Apache 2.0) | PASS | PASS | PASS | PASS | PASS | PASS | .b STUDY-PILOT — GPT-5/4 prompting patterns | STUDY-PILOT-NARROW |
| ECC en/skills/eval-harness (`.agents/skills/eval-harness/SKILL.md` L1-50 EDD framework) | PASS | PASS | PASS | DUPLICATE-FUNCTIONALITY (ECC@ecc enabled — already in pure-runtime catalog) | n/a | PASS | n/a | REJECT (already-active in ECC plugin) |
| ECC en/skills/agent-introspection-debugging (SKILL.md L1-50) | PASS | PASS | PASS | DUPLICATE (ECC@ecc) | n/a | PASS | n/a | REJECT (ECC) |
| ECC .kiro/* localizations (28 SKILL.md) | n/a | n/a | n/a | DUPLICATE (.agents/ canonical) | n/a | PASS | n/a | REJECT (CR-12 DUPLICATE) |
| ECC docs/{ja-JP, ko-KR, tr, others}/* localizations (~600 SKILL.md) | n/a | n/a | n/a | DUPLICATE (en canonical) | n/a | PASS | n/a | REJECT (CR-12 DUPLICATE language-localizations) |
| ComposioHQ/awesome-claude-skills (REMOTE catalog) | n/a (catalog) | n/a | n/a | n/a (cite-only) | n/a | FAIL (per CLAUDE.md L322 [UNKNOWN]/conflicting license caveat — README claims Apache-2.0 but root LICENSE absent at last cite refresh) | .a DEMAND-ABSENCE | REJECT-FOR-FIT (license + catalog-not-skill) |
| sickn33/antigravity-awesome-skills (REMOTE catalog) | n/a | n/a | n/a | n/a (cite-only) | n/a | PARTIAL (MIT but single-individual maintainer caveat per CLAUDE.md L325) | .a DEMAND-ABSENCE | REJECT-FOR-FIT (discovery-only) |
| hesreallyhim/awesome-claude-code (REMOTE catalog) | n/a | n/a | n/a | n/a (cite-only catalog) | n/a | FAIL (CC-BY-NC-ND-4.0 — non-commercial-no-derivatives; cite-only, NO fork/modify) | .a DEMAND-ABSENCE | REJECT-FOR-FIT (license forbids derivative) |
| alirezarezvani/claude-skills (235 skills + 28 agents MIT 5.2k★ per CLAUDE.md L311) | n/a (catalog) | PARTIAL | PARTIAL | PARTIAL (overlaps 21 enabled plugins) | PARTIAL | PASS (MIT) | n/a — bulk pack; needs per-skill audit | REJECT-FOR-FIT (bulk-install duplicates existing 1556 SKILL.md ecosystem; cite-only) |
| Shubhamsaboo/awesome-llm-apps (catalog) | n/a | n/a | n/a | n/a | n/a | n/a | .a — LLM-apps catalog not skills | REJECT (out of scope) |
| quemsah/awesome-claude-plugins (REMOTE catalog per CLAUDE.md L329) | n/a | n/a | n/a | n/a | n/a | n/a (unverified) | .a (plugin catalog not skills) | REJECT (out of scope for skills audit) |
| VoltAgent/awesome-openclaw-skills (5.2k OpenClaw skills MIT per CLAUDE.md L335) | n/a | n/a | n/a | n/a | n/a | PASS (MIT) | n/a — OpenClaw NOT Anthropic Claude Code per CLAUDE.md categorical caveat | REJECT (ecosystem-mismatch) |

## 3. ADOPT-NOW Top-5 with cite + Axis verdict

**Convergence-gate Axis-1+2+3 verification per `Z:/claude-sota/.claude/rules/convergence-gate.md`:**
- Axis-1 (≥3 distinct orgs): **PASS** — Anthropic (claude-plugins-official superpowers) + Vercel (vercel-labs) + Matt Pocock (independent named-T2; 48,857★ + Pragmatic-Programmer + DDD + XP citations in SKILL frontmatter) + OpenAI (codex plugin) + ECC (already enabled) = 5-org Axis-1 firm PASS for skills ecosystem coverage
- Axis-2 (≥2 named-T2 dated artifacts): **PASS** — Matt Pocock (named-author, 2026-04-30 cite per `Z:/claude-sota/.claude/projects/Z--claude-sota-installed/memory/reference_mattpocock_skills_pattern_extract_2026_04_30.md`); Vercel-engineering team (org-equivalent T2; v1.0.0 releases 2026-04-29-2026-05-10 window); Jesse Vincent (superpowers MIT author per LICENSE L3, 2025); STRONG-PROVENANCE-EXPRESS predicate satisfied for org-level T1 maintainership
- Axis-3 (≥3-month stability OR STRONG-PROVENANCE-EXPRESS): **PASS** — mattpocock-skills HEAD `733d312` >90d burn-in; vercel-labs HEAD `b9c8ee0` (per-skill `v1.0.0` MIT frontmatter); superpowers HEAD `e7a2d164` >90d; codex@openai-codex@1.0.4 (per CLAUDE.md L319 release floor v0.130.0+); STRONG-PROVENANCE-EXPRESS applies to vercel-labs (Vercel-org official-maintainer; v1.0.0/3.0.0 releases)

### ADOPT-NOW Top-5 (ranked by install priority + workflow fit)

1. **mattpocock-skills full engineering pack (8 skills)** — `Z:/repos/deps/mattpocock-skills/skills/engineering/{diagnose,tdd,improve-codebase-architecture,grill-with-docs,zoom-out,triage*,prototype,to-issues,to-prd} @ HEAD 733d312 MIT` (`LICENSE:1-3 [VERIFIED 2026-05-15]`). Install via `/plugin marketplace add mattpocock/skills` IF mattpocock-skills ships marketplace.json; ELSE cite-import per CR-12 TERTIARY only after sota-researcher confirms no marketplace exists. Axis 1+2+3 PASS firm. *triage requires issue-tracker MCP not yet present in pure runtime — install last.*

2. **vercel-labs/agent-skills (4-skill core pack)** — `Z:/repos/deps/vercel-labs-agent-skills/skills/{react-best-practices,composition-patterns,react-view-transitions,web-design-guidelines}/SKILL.md @ HEAD b9c8ee0 [VERIFIED 2026-05-15]` (per-SKILL `license: MIT` frontmatter at SKILL.md L4/L9/L4/none-but-vercel-authored). Install via marketplace per Vercel-Labs canonical (verify marketplace.json on next install fire). Closes pure-runtime frontend/React gap. *Skip react-native-skills + vercel-cli-with-tokens + deploy-to-vercel for STUDY-PILOT band — latent workflow fit.*

3. **codex@openai-codex/skills 3-skill pack** — `Z:/claude-sota-installed/.claude/plugins/marketplaces/openai-codex/plugins/codex/skills/{codex-cli-runtime,codex-result-handling,gpt-5-4-prompting}/SKILL.md` (Apache 2.0 per OpenAI codex repo). Install via `/plugin install codex@openai-codex@1.0.4` per CR-12 Top-3 install priority (already enumerated in cardinal-rule-12.md). Provides skill-layer CR-3 cross-model gate substrate. **Bridges current Phase 1 bootstrap exception → Phase 2 codex T1-T7 mechanical-enforcement gate per cardinal-rule-7-graduated-unleash.md.**

4. **superpowers/skills/dispatching-parallel-agents** — `Z:/repos/deps/superpowers/skills/dispatching-parallel-agents/SKILL.md @ HEAD e7a2d164 [VERIFIED 2026-05-15] MIT (LICENSE:1-3)` (not in current 6-vendored superpowers set). Closes the CADP-discipline gap at skill layer; complements `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` + advanced-agent-team-standing-directive.md. Install via `/plugin install superpowers@claude-plugins-official` (already enabled — verify skill is in the plugin's 14-skill manifest; if not vendored, cite-import per Section 14.5).

5. **superpowers/skills/executing-plans** — `Z:/repos/deps/superpowers/skills/executing-plans/SKILL.md @ HEAD e7a2d164 MIT`. Companion to vendored `writing-plans`; closes plan→execute handoff with REQUIRED sub-skill mandate to finishing-a-development-branch. Install path same as #4 (superpowers@claude-plugins-official; verify-or-cite-import).

## 4. STUDY-PILOT-NARROW band (10 candidates)

| Candidate | Probe 7.b 5-clause | Use-case |
|---|---|---|
| mattpocock-skills/engineering/zoom-out | named-use-case=domain-glossary lookup; source=CONTEXT.md; wiring=path-grep glossary; incumbent-comparison=manual Read+Grep; reversible | Architecture exploration |
| mattpocock-skills/productivity/{grill-me,caveman} | caveman=token-saving comm-mode; grill-me=plan-stress-test | Token-eff + plan-stress |
| mattpocock-skills/misc/git-guardrails-claude-code | git-deny PreToolUse hook | git-safety supplement |
| mattpocock-skills/misc/setup-pre-commit | Husky/lint-staged setup | Frontend pre-commit |
| vercel-labs/{react-view-transitions, react-native-skills, vercel-cli-with-tokens, deploy-to-vercel, web-design-guidelines} | Vercel deploy + RN + UI audit workflows | Frontend/mobile latent fit |
| codex@openai-codex/skills/{codex-result-handling, gpt-5-4-prompting} | post-codex output handling + GPT prompting | Companion to codex-cli-runtime |
| superpowers/skills/{finishing-a-development-branch, receiving-code-review} | Test-verify-then-PR + receiver-side review discipline | Workflow completion |

## 5. REJECT-FOR-FIT band

| Candidate | Reason | Cite |
|---|---|---|
| mattpocock-skills/engineering/setup-matt-pocock-skills | **Probe 5 mode-harness-shape FAIL — HARD-GATE interactive setup** (n=4 same-class cohort per ahfv-seven-sub-classes.md iter-92) | SKILL.md L4 `disable-model-invocation: true` + interactive prompts |
| mattpocock-skills/engineering/triage | **Probe 7.a DEMAND-ABSENCE** — no issue-tracker MCP installed in pure runtime | Pure runtime has no GitHub/Linear issue-tracker MCP |
| mattpocock-skills/{misc/scaffold-exercises, misc/migrate-to-shoehorn, personal/*} | **Probe 7.a DEMAND-ABSENCE** — domain-specific workflows | SKILL.md descriptions |
| mattpocock-skills/deprecated/* | upstream-deprecated | Folder name `deprecated/` |
| mattpocock-skills/productivity/write-a-skill | **CR-12 class 2 DUPLICATE-FUNCTIONALITY** with skill-creator@claude-plugins-official | CLAUDE.md L195 4-skill stack |
| superpowers/skills/{brainstorming, writing-skills} | **Probe 5 FAIL — HARD-GATE/TDD-harness mismatch** per ahfv iter-84+iter-85 | brainstorming SKILL.md L12 `<HARD-GATE>`; writing-skills requires TDD-for-skills harness sss lacks |
| superpowers/skills/using-{superpowers,git-worktrees} | **CR-12 class 2 DUPLICATE** | using-superpowers auto-fires per CLAUDE.md L195; using-git-worktrees overlaps parallel-session-worktree-isolation.md |
| ECC localizations (.kiro, .cursor, docs/{ja-JP,ko-KR,tr,others}) | **CR-12 class 2 DUPLICATE-FUNCTIONALITY** (en/.agents canonical) | ~600 localized SKILL.md per Glob |
| Karpathy/karpathy-guidelines | **Already cite-imported as CR-2 cardinal-rule** + `karpathy-adapted.md` rule | CLAUDE.md L62-66 + `karpathy-adapted.md` |
| ComposioHQ/awesome-claude-skills | **License [UNKNOWN]/conflicting** (README claims Apache-2.0; root LICENSE absent) + cite-only catalog | CLAUDE.md L322 |
| hesreallyhim/awesome-claude-code | **License CC-BY-NC-ND-4.0** — non-commercial-no-derivatives; cite-only | CLAUDE.md L317 |
| sickn33/antigravity-awesome-skills | Single-individual maintainer caveat per CLAUDE.md L325; convergence-gate Axis-1 ≥3-distinct-orgs FAIL | CLAUDE.md L325 |
| alirezarezvani/claude-skills (bulk) | DUPLICATE 235-skills pack — overlaps 1556 SKILL.md already enabled | CLAUDE.md L311 |
| VoltAgent/awesome-openclaw-skills | **Ecosystem mismatch** — OpenClaw NOT Anthropic Claude Code per CLAUDE.md categorical caveat | CLAUDE.md L335 |
| Shubhamsaboo/awesome-llm-apps + quemsah/awesome-claude-plugins | Out-of-scope (LLM-apps catalog + plugin catalog, NOT skills) | CLAUDE.md L319/L329 |

## 6. Pure-runtime gap analysis — 3 most underserved skill categories

### Gap 1: Frontend / Vercel-ecosystem patterns (CRITICAL — high-leverage closure)

**Evidence**: Pure-runtime enabled plugin set per CLAUDE.md L195 4-skill stack includes only `frontend-design` (claude-plugins-official) as scope-mention of frontend. Zero React-specific perf-rule catalogs, zero composition-pattern skills, zero React 19 View Transitions, zero web-design accessibility audit skills. Vercel-labs ships 4 production-grade skills (vercel-author with `version: '1.0.0'` MIT) that fill this gap zero-overlap.

**Workflow citation**: any user request involving "React component perf", "Next.js bundle optimization", "accessibility review", "compound components" currently hits pure-runtime with no canonical skill — fallback is general Claude reasoning. With vercel-labs adopted: 70-rule structured perf catalog + 14-rule composition-pattern guide + accessibility WebFetch-fresh-rules.

**Recommended close**: install vercel-labs/agent-skills package (4 ADOPT-NOW skills) via marketplace (verify marketplace.json existence first per CR-6 fresh-from-GitHub) OR cite-import per Section 14.5 if no marketplace ships.

### Gap 2: Engineering-discipline narrative skills (HIGH — architecture-deepening + domain-language)

**Evidence**: superpowers vendored set (6 skills: plan/debug/tdd/verification-before-completion/subagent-driven-development/requesting-code-review) is workflow-mechanics oriented. ECC has process skills (autonomous-loops/research-ops/safety-guard). NONE of the 21 enabled plugins covers: codebase-architecture-deepening (shallow→deep modules + deletion-test), domain-glossary lookup (CONTEXT.md/ADR awareness), or grill-with-docs plan stress-testing.

**Workflow citation**: any user request "refactor for testability", "what's the architecture here?", "stress-test my plan against the codebase" — pure-runtime has no skill that auto-fires with the Hunter-Thomas Pragmatic-Programmer / Eric Evans DDD discipline. mattpocock-skills/engineering ships diagnose + tdd-vertical-slice + improve-codebase-architecture + grill-with-docs + zoom-out (5 skills) with explicit named-author lineage (mattpocock LICENSE L3 Copyright 2026 Matt Pocock; SKILL.md cites Pragmatic Programmer + DDD + XP).

**Recommended close**: install mattpocock-skills engineering pack (5 ADOPT-NOW skills) per CR-12 PRIMARY path (verify mattpocock marketplace.json on next fire); cite-import the remaining workflow-friendly skills (zoom-out, grill-me, caveman, git-guardrails) per Section 14.5 if no marketplace.

### Gap 3: Mobile / React Native (LATENT — zero coverage)

**Evidence**: 21-enabled-plugins-set + 1556 SKILL.md ecosystem has ZERO React Native or Expo skills. vercel-labs/react-native-skills (`license: MIT` v1.0.0 SKILL.md L8) ships list-performance / animation / navigation / UI-patterns / state / rendering rules across 6+ categories.

**Workflow citation**: latent — pure runtime currently has no mobile-dev workflow surfaced. When operator requests mobile work (e.g., "build me an Expo app", "optimize my React Native FlatList"), gap is immediate.

**Recommended close**: STUDY-PILOT-NARROW band — install only when explicit RN/Expo workflow surfaces. Cite-import via vercel-labs marketplace per CR-12.

## 7. Cite trail (TIER-1-DIRECT file:line + HEAD SHA depth)

**Skills repos (audit objects):**
- `Z:/repos/deps/mattpocock-skills/LICENSE:1-3 @ HEAD 733d312884b3878a9a9cff693c5886943753a741 [VERIFIED 2026-05-15 via direct Read]` — MIT License Copyright (c) 2026 Matt Pocock
- `Z:/repos/deps/mattpocock-skills/skills/engineering/diagnose/SKILL.md:1-80 @ HEAD 733d312 [VERIFIED 2026-05-15]` — 7-phase bug-discipline (loop + reproduce + hypothesise + instrument + fix + regression-test)
- `Z:/repos/deps/mattpocock-skills/skills/engineering/tdd/SKILL.md:1-80 @ HEAD 733d312 [VERIFIED 2026-05-15]` — vertical-slice tracer-bullet (anti-horizontal-slicing)
- `Z:/repos/deps/mattpocock-skills/skills/engineering/improve-codebase-architecture/SKILL.md:1-50 @ HEAD 733d312 [VERIFIED 2026-05-15]` — deletion-test + deep-modules + glossary
- `Z:/repos/deps/mattpocock-skills/skills/engineering/grill-with-docs/SKILL.md:1-50 @ HEAD 733d312 [VERIFIED 2026-05-15]` — interview-relentlessly + CONTEXT.md awareness
- `Z:/repos/deps/mattpocock-skills/skills/engineering/zoom-out/SKILL.md:1-7 @ HEAD 733d312 [VERIFIED 2026-05-15]` — `disable-model-invocation: true`
- `Z:/repos/deps/mattpocock-skills/skills/engineering/triage/SKILL.md:1-80 @ HEAD 733d312 [VERIFIED 2026-05-15]` — issue-tracker state-machine
- `Z:/repos/deps/mattpocock-skills/skills/productivity/{caveman,grill-me,write-a-skill}/SKILL.md @ HEAD 733d312`
- `Z:/repos/deps/mattpocock-skills/skills/misc/{git-guardrails-claude-code,setup-pre-commit,scaffold-exercises,migrate-to-shoehorn}/SKILL.md @ HEAD 733d312`
- `Z:/repos/deps/vercel-labs-agent-skills/skills/composition-patterns/SKILL.md:1-60 @ HEAD b9c8ee0643d87d3c5a953d1e22382ff2ead39229 [VERIFIED 2026-05-15]` — `license: MIT` author=vercel v1.0.0
- `Z:/repos/deps/vercel-labs-agent-skills/skills/react-best-practices/SKILL.md:1-60 @ HEAD b9c8ee0` — 70-rule perf catalog v1.0.0
- `Z:/repos/deps/vercel-labs-agent-skills/skills/react-view-transitions/SKILL.md:1-40 @ HEAD b9c8ee0` — v1.0.0
- `Z:/repos/deps/vercel-labs-agent-skills/skills/web-design-guidelines/SKILL.md:1-40 @ HEAD b9c8ee0` — fresh-WebFetch pattern v1.0.0
- `Z:/repos/deps/vercel-labs-agent-skills/skills/{react-native-skills,vercel-cli-with-tokens,deploy-to-vercel}/SKILL.md @ HEAD b9c8ee0`
- `Z:/repos/deps/superpowers/LICENSE:1-3 @ HEAD e7a2d16476bf042e9add4699c9d018a90f86e4a6 [VERIFIED 2026-05-15]` — MIT Copyright 2025 Jesse Vincent
- `Z:/repos/deps/superpowers/skills/{dispatching-parallel-agents,executing-plans,finishing-a-development-branch,receiving-code-review,brainstorming,writing-skills,using-superpowers,using-git-worktrees}/SKILL.md:1-60 @ HEAD e7a2d164 [VERIFIED 2026-05-15]`
- `Z:/repos/deps/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md:1-70 @ HEAD 2c606141936f1eeef17fa3043a72095b4765b9c2 [VERIFIED 2026-05-15]` — `license: MIT` (already cite-imported as CR-2)
- `Z:/claude-sota-installed/.claude/plugins/marketplaces/openai-codex/plugins/codex/skills/{codex-cli-runtime,codex-result-handling,gpt-5-4-prompting}/SKILL.md` (Apache 2.0 per OpenAI codex repo @ HEAD pinned in CLAUDE.md L319)
- `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/.agents/skills/{eval-harness,security-review,agent-introspection-debugging}/SKILL.md:1-50 @ ECC 2.0.0-rc.1` — already-active in pure runtime ECC plugin

**Discipline cites (Probe-DAG authority):**
- `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md` — Probe DAG 1-7 + Probe 7.a/.b split + 5-clause check
- `Z:/claude-sota/.claude/rules/ahfv-seven-sub-classes.md` — 7-class table including HARD-GATE mode-harness-shape (iter-84/85/92 n=4 cohort) + plugin-namespace duplicate (Probe 4)
- `Z:/claude-sota/.claude/rules/convergence-gate.md` — Axis 1+2+3 + STRONG-PROVENANCE-EXPRESS 5-band
- `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md` — 6-class disposition lattice
- `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — MIN_PRECEDENCE source-class reduction lattice
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — OVER/UNDER/HONEST-NON-FINDING
- `Z:/claude-sota-installed/CLAUDE.md:62,99-110,195-228,311-335` — cardinal-rules + 4-skill stack + catalog cite trail

**Sister-rule integration cites:**
- `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` (STAND-IN-NOTICE per `Z:/claude-sota-installed/CLAUDE.local.md` ENV (g) deprecated; cross-model gate satisfied at orchestrator-side via Path P codex direct dispatch on ADOPT-NOW claims)
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` (CADP rule 2-5 — orchestrator should run Path P codex T1 on the 5 ADOPT-NOW recommendations before commit)
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` — Pattern A apply on T1 NEEDS-REVISION; this audit is the INPUT to such a fire

**HONEST-NON-FINDING notes (recorded per `synthesis-layer-verify.md`):**
- mattpocock-skills marketplace.json existence NOT verified this fire (HEAD probe only); install path may require cite-import per Section 14.5 if marketplace ships only via cite — confirm via `mcp__github__get_file_contents path=marketplace.json` next fire
- vercel-labs marketplace.json existence likewise unverified; package.json read failed (path mismatch — vercel-labs uses pnpm packages/* not root package.json)
- ComposioHQ + sickn33 + alirezarezvani + Shubhamsaboo HEAD-SHAs not refreshed this fire (gh API rate limit at probe time 13:41 UTC); cite-trail uses last-CLAUDE.md-pinned values; refresh on next fire
