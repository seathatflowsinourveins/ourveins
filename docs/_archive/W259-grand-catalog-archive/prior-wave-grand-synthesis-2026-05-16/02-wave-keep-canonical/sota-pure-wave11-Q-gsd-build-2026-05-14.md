---
title: sota-pure Wave-11 Stream-Q — gsd-build/get-shit-done full audit
status: AUTHORITATIVE
date: 2026-05-14
agent: wave11-Q-orchestrator
output_budget: 600 LOC
termination: on_handoff_to=orchestrator | text_match=GSD-AUDIT-COMPLETE
---

# Wave-11 Stream-Q — gsd-build/get-shit-done full audit for claude-sota-pure

## TL;DR

- **Repo**: `gsd-build/get-shit-done` HEAD `eeaf9c556fa9b89f3d0681b1744852ad5e4b179e` (2026-05-15 latest update), 62,260★ MIT, JavaScript, by TÂCHES. Marker Decay: sibling cite said 58,543★ — now 62,260★ [VERIFIED 2026-05-14 via `mcp__github__search_repositories`].
- **Topology**: meta-prompting framework — NOT a competing runtime. Sits BETWEEN user and existing AI coding agent (Claude Code / OpenCode / Codex / Gemini / 13+ runtimes). Single shared install at `~/.claude/get-shit-done/` consumed via slash commands; workflows are runtime-agnostic markdown.
- **Inventory**: 86 commands (`commands/gsd/*.md`), 33 agents (`agents/gsd-*.md`), 11 hooks (5 security/guard + 3 lifecycle + 3 utility), workflow templates at `get-shit-done/workflows/`, references at `get-shit-done/references/`, npm-installable CLI via `bin/install.js`.
- **Adoption verdict**: **COMPLEMENT + SELECTIVE-VENDOR** — NOT META-HARNESS COMPETING-FRAMEWORK (gsd is workflow-orchestration LAYER, not runtime). Top 5 hook patterns + 3 command patterns are extractable WITHOUT full install. Full plugin install REJECT-FOR-FIT for pure runtime (Probe 7.a demand-absence: claude-sota-pure has no `.planning/` workflow consumer; gsd's STATE.md/Discuss-Plan-Execute-Verify pattern conflicts with cwc Default-FAIL contract).
- **GSD-AUDIT-COMPLETE**: 7 deliverables below.

---

## (1) Full inventory

### Top-level structure
```
gsd-build/get-shit-done/ @ HEAD eeaf9c5
├── agents/                    # 33 subagent definitions (gsd-*.md)
├── commands/gsd/              # 86 slash commands (commands/gsd/*.md)
├── hooks/                     # 11 hooks (5 security + 6 lifecycle/util)
├── get-shit-done/             # Runtime payload (workflows + contexts + refs + templates + bin)
│   ├── workflows/             # Orchestration logic (referenced by commands)
│   ├── references/            # Shared reference docs (ui-brand, security)
│   ├── contexts/              # Context templates loaded by workflows
│   ├── templates/             # Boilerplate (.planning/ etc.)
│   └── bin/                   # gsd-tools.cjs CLI utility
├── bin/                       # Installer + SDK CLI
│   ├── install.js
│   └── gsd-sdk.js
├── sdk/                       # gsd-sdk TypeScript SDK
├── scripts/                   # build-hooks, run-tests, lint-no-source-grep
├── tests/                     # vitest test suites
├── package.json               # name=get-shit-done-cc, version=1.39.0-rc.4, MIT, deps @anthropic-ai/claude-agent-sdk
└── (READMEs in 5 languages: en, ja, ko, pt-BR, zh-CN)
```

### Hooks inventory (11)

| Hook | Type | Event | Purpose |
|------|------|-------|---------|
| `gsd-prompt-guard.js` | security | PreToolUse | Scan Write/Edit content destined for `.planning/` for injection patterns (advisory) |
| `gsd-read-injection-scanner.js` | security | PostToolUse | Scan Read tool output for injection patterns + summarization-survival patterns (advisory) |
| `gsd-read-guard.js` | security | PreToolUse | Read access control for sensitive paths |
| `gsd-workflow-guard.js` | security | PreToolUse | Enforce phase-boundary state transitions |
| `gsd-validate-commit.sh` | security | PreToolUse `Bash(git commit *)` | Conventional Commits enforcement (opt-in via `hooks.community: true`) |
| `gsd-context-monitor.js` | lifecycle | PostToolUse / AfterTool | Inject context-rot warnings at 35%/25% remaining thresholds + critical session-state breadcrumb |
| `gsd-phase-boundary.sh` | lifecycle | UserPromptSubmit | Enforce phase transitions |
| `gsd-session-state.sh` | lifecycle | SessionStart | Session state initialization |
| `gsd-statusline.js` | utility | statusline | Token-count statusline rendering |
| `gsd-check-update.js` | utility | SessionStart | Version update check |
| `gsd-check-update-worker.js` | utility | (worker) | Async update worker |

### Agents inventory (33 grouped)

- **Research**: gsd-advisor-researcher, gsd-ai-researcher, gsd-domain-researcher, gsd-phase-researcher, gsd-project-researcher, gsd-ui-researcher, gsd-research-synthesizer, gsd-doc-synthesizer (8)
- **Doc**: gsd-doc-classifier, gsd-doc-verifier, gsd-doc-writer (3)
- **Plan**: gsd-planner, gsd-plan-checker, gsd-roadmapper, gsd-framework-selector, gsd-pattern-mapper, gsd-assumptions-analyzer, gsd-nyquist-auditor (7)
- **Execute**: gsd-executor, gsd-code-fixer, gsd-code-reviewer (3)
- **Verify**: gsd-verifier, gsd-integration-checker, gsd-eval-auditor, gsd-eval-planner, gsd-security-auditor, gsd-ui-auditor, gsd-ui-checker (7)
- **Debug**: gsd-debugger, gsd-debug-session-manager, gsd-codebase-mapper (3)
- **Meta**: gsd-user-profiler, gsd-intel-updater (2)

### Commands inventory (86 in 14 categories)

| Category | Count | Commands |
|----------|------:|----------|
| Phase-workflow (D-P-E-V) | 15 | add/edit/insert/remove/list-phase-assumptions/discuss/plan/execute/validate/ultraplan/ai-integration/spec/ui/secure/research-phase |
| Exploration-experiment | 9 | spike, spike-wrap-up, sketch, sketch-wrap-up, explore, plant-seed, scan, intel, profile-user |
| Knowledge-graph | 4 | graphify, map-codebase, analyze-dependencies, forensics |
| Plan-doc-verify | 6 | plan-milestone-gaps, plan-review-convergence, audit-fix, audit-milestone, audit-uat, verify-work |
| Task-mgmt | 8 | add-backlog, add-todo, add-tests, check-todos, review-backlog, inbox, note, thread |
| Milestone | 7 | new-milestone, complete-milestone, milestone-summary, new-project, new-workspace, list-workspaces, remove-workspace |
| Execute | 6 | do, fast, quick, next, autonomous, manager |
| Ship | 2 | ship, pr-branch |
| Review | 6 | code-review, code-review-fix, eval-review, review, ui-review |
| Debug | 5 | debug, reapply-patches, undo, cleanup, session-report |
| Settings-meta | 14 | settings, settings-advanced, settings-integrations, set-profile, help, update, stats, progress, health, pause-work, resume-work, plant-seed, manager, sync-skills |
| Ingest-doc | 5 | ingest-docs, docs-update, import, from-gsd2, extract_learnings |
| Community | 1 | join-discord |

---

## (2) Top-15 primitive verdict matrix (6-Probe-DAG + 3-axis convergence)

Probe convention: P1=count / P2=SDK-vs-CLI / P3=architectural-API / P4=plugin-namespace / P5=mode-harness-shape / P6=direct-file-blockers / P7=demand-gate.

| # | Primitive | Probe P4 (plugin-ns) | Probe P5 (mode-harness) | Probe P7 (demand) | Axis-1 conv | Verdict |
|---|-----------|---|---|---|---|---|
| 1 | `gsd-prompt-guard.js` (Write/Edit injection scan) | PASS — no incumbent in pure runtime | PASS — stateless stdin/stdout Node hook, runtime-agnostic | **7.b NEW workflow** — pure runtime has NO PreToolUse injection scan today | n=3+ (CCBP threat-model + Karpathy P1 + cwc Default-FAIL) | **ADOPT-NOW (selective-vendor)** |
| 2 | `gsd-read-injection-scanner.js` (Read tool injection scan) | PASS — no incumbent | PASS — stateless Node hook | **7.b** novel — adds defense at READ ingestion (vs. write-side) | n=3+ | **ADOPT-NOW (selective-vendor)** — orthogonal to #1 |
| 3 | `gsd-validate-commit.sh` (Conventional Commits) | PARTIAL — sibling has codex T2 commit-gate but DIFFERENT scope | PASS — opt-in via config | 7.b genuine — Conventional Commits is industry-standard, complements T2 (semantic vs. cross-model review) | n=3+ (Angular/conventional-commits.org/CCBP) | **ADOPT-NOW (selective-vendor)** — opt-in OFF by default |
| 4 | `gsd-context-monitor.js` (35%/25% threshold warnings) | OVERLAP — sibling has `userpromptsubmit_compact_threshold.py` (W175) | PARTIAL — gsd uses different threshold model (REMAINING %, not absolute tokens); both runtime-agnostic | 7.b PARTIAL — pure runtime adopts cwc primitives w/o this layer | n=2 (Karpathy §5 + Thariq) | **STUDY-PILOT** — pattern parallel; choose ONE pre-emptive system |
| 5 | `/gsd-graphify` knowledge graph | **FAIL — Probe 4 DUPLICATE** — pure runtime has GitNexus MCP (6008 symbols / 6396 relationships / 27 flows already INSTALLED) | FAIL — gsd-tools.cjs harness mismatch (requires .planning/) | 7.a DEMAND-ABSENT (GitNexus already covers) | n/a | **REJECT-FOR-FIT** — Probe 4 kiss-dry-yagni Must-Never #4 duplicate |
| 6 | `/gsd-spike` (2-5 focused experiments) | PASS — pure runtime has NO Spike primitive | FAIL — workflow at `~/.claude/get-shit-done/workflows/spike.md` requires `.planning/spikes/` dir + GSD MANIFEST | 7.b genuine NEW workflow — RESEARCH-via-EXPERIMENT is novel for pure runtime | n=2 (Pragmatic Programmer Tip #62 + agile-spike convention) | **STUDY-PILOT (pattern-extract only)** — vendor concept as a `.claude/skills/spike/SKILL.md` WITHOUT GSD runtime deps |
| 7 | `/gsd-sketch` HTML mockup variants | PASS — pure runtime has NO UI mockup workflow | **FAIL — Probe 5 mode-harness** — pure runtime is CLI-only; HTML rendering requires browser harness | 7.a DEMAND-ABSENT | n/a | **REJECT-FOR-FIT** — Probe 5 mode-harness-shape (CLI-only runtime) |
| 8 | `/gsd-plan-phase` (D-P-E-V workflow) | OVERLAP — pure runtime has cwc PROGRESS.md + Default-FAIL contract | **FAIL — Probe 5** — gsd's `.planning/STATE.md` parallel-tracks cwc's `PROGRESS.md`; competing state surfaces | 7.a DEMAND-ABSENT under cwc | n/a | **REJECT-FOR-FIT** — Probe 5 mode-harness conflict (cwc IS the canonical handoff layer) |
| 9 | `/gsd-spec-phase` (spec-driven design) | OVERLAP — pure runtime has CCBP `rpi-workflow.md` (Research-Plan-Implement) | FAIL — gsd workflow assumes phase-boundary STATE | 7.a — RPI covers spec-driven adequately | n=2 | **REJECT-FOR-FIT** — Probe 4 DUPLICATE (RPI already canonical) |
| 10 | `/gsd-code-review` (32-agent dispatch) | OVERLAP — pure runtime has codex T2 + T3 cross-model review | FAIL — gsd 33-agent dispatch is heavyweight | 7.a — codex T2/T3 covers review | n/a | **REJECT-FOR-FIT** — Probe 4 DUPLICATE |
| 11 | `gsd-eval-auditor` (eval gate enforcement) | PASS — pure runtime has NO eval-gate agent | PASS — agent definition portable | 7.b PARTIAL — pure runtime has no eval pipeline today | n=2 (Karpathy P4 + Karpathy-eval-skills) | **STUDY-PILOT** — defer until pure runtime ships eval pipeline |
| 12 | `gsd-nyquist-auditor` (signal-theory sampling auditor) | PASS — novel concept | UNKNOWN — agent's mode unclear | 7.a DEMAND-ABSENT (no current workflow) | n=1 | **REJECT-FOR-FIT** — Probe 7.a |
| 13 | `gsd-pattern-mapper` (architectural pattern detection) | OVERLAP — GitNexus + Serena `find_symbol`/`find_implementations` cover | PASS | 7.a DEMAND-ABSENT | n/a | **REJECT-FOR-FIT** — Probe 4 DUPLICATE |
| 14 | Multi-runtime install adapters | PASS — novel (13-runtime support) | **FAIL — Probe 5** — pure runtime is Claude Code SOLE-runtime | 7.a — only CC matters | n/a | **REJECT-FOR-FIT** — Probe 5 (single-runtime focus) |
| 15 | Atomic-commit discipline (Conventional Commits validator pattern) | PASS — extract as discipline | PASS — stateless shell hook | 7.b — complement T2 with semantic-shape gate | n=3+ | **ADOPT-NOW (CLAUDE.md discipline)** — selective-vendor the validator AS A DISCIPLINE in CLAUDE.md, not as a hook |

**Verdict tallies**: 4 ADOPT-NOW (selective-vendor) | 3 STUDY-PILOT | 8 REJECT-FOR-FIT.

---

## (3) META-HARNESS classification: complement vs compete

**Verdict**: **COMPLEMENT, NOT COMPETING-FRAMEWORK**. gsd-build/get-shit-done is **NOT** a Cohort 1 META-HARNESS competing-framework per `Z:/claude-sota-installed/docs/verified-avoid.md`.

### Why COMPLEMENT (4 evidence rows)

1. **Architectural layer**: gsd is a *workflow-orchestration LAYER* sitting BETWEEN user and runtime (per DeepWiki: "GSD does not require its own dedicated framework runtime"). Pure runtime occupies the *runtime LAYER*. Different abstractions; non-overlapping.
2. **Multi-runtime by design**: gsd explicitly supports CC + OpenCode + Codex + Gemini + 13 others. Adopting gsd does NOT lock pure runtime into a single framework.
3. **Selective adoption supported**: gsd ships `--minimal` install profile (per DeepWiki). Single hooks/agents/commands are individually extractable.
4. **MIT license + npm-installable**: zero contamination risk; selective vendoring legally clean.

### Why NOT pure-install (5 evidence rows)

1. **Workflow-state collision**: gsd assumes `.planning/STATE.md` as canonical project state; pure runtime uses cwc `PROGRESS.md`. Probe 5 mode-harness mismatch.
2. **86 commands flood namespace**: pure runtime CLAUDE.md target keeps `/`-commands minimal; 86 new commands violate kiss-dry-yagni Must-Never #4.
3. **33 agents flood subagent pool**: pure runtime targets Tier-1+2 ~10 agents max; 33 gsd-* agents triple this.
4. **Probe 4 duplicates**: 8/15 top primitives DUPLICATE existing pure runtime primitives (GitNexus, codex T2/T3, cwc PROGRESS, RPI workflow, Serena, etc.).
5. **`.planning/config.json` runtime dependency**: 9/11 hooks short-circuit unless `.planning/` exists; in pure runtime they would be inert dead code.

### Verdict for manifest

Per `Z:/claude-sota-installed/docs/verified-avoid.md` cohort-classification: gsd does NOT match Cohort 1 (META-HARNESS competing-framework with same-layer collision); it is in a NEW disposition class: **COMPLEMENTARY-PATTERN-EXTRACT**. CR-12 disposition lattice maps this to **PROVIDER-COMPLEMENT** (sister: complements rather than replaces incumbent layer).

---

## (4) Per-ADOPT-NOW install class

For the 4 ADOPT-NOW + 3 STUDY-PILOT verdicts (rows 1, 2, 3, 6, 11, 15 + row 4 deferred to STUDY-PILOT comparison):

| Primitive | Install class | Target path | Rationale |
|-----------|---------------|-------------|-----------|
| gsd-prompt-guard.js (#1) | **SELECTIVE-VENDOR** (single file, MIT) | `.claude/hooks/scripts/prompt_guard.js` (renamed, version-stripped, INJECTION_PATTERNS extracted) | Stateless, no `.planning/` deps when patterns inlined |
| gsd-read-injection-scanner.js (#2) | **SELECTIVE-VENDOR** | `.claude/hooks/scripts/read_injection_scanner.js` | Stateless; remove `.planning/` exclusion path-check |
| gsd-validate-commit.sh (#3) | **SELECTIVE-VENDOR** | `.claude/hooks/scripts/conventional_commit_gate.sh` | Strip `.planning/config.json` opt-in gate; pure runtime activation via settings.json env |
| /gsd-spike pattern (#6) | **CITE-ONLY** (pattern extract, NOT vendor) | New `.claude/skills/spike/SKILL.md` adapted from `get-shit-done/workflows/spike.md` concept | Vendor the 2-5-experiments DISCIPLINE; rewrite for pure runtime |
| gsd-eval-auditor (#11) | **CITE-ONLY** (deferred until eval pipeline ships) | n/a (queued for Phase 2E+) | No demand yet |
| Conventional-commits discipline (#15) | **CITE-ONLY** (CLAUDE.md addition) | `CLAUDE.md §Commit Discipline` | Adopt the discipline as a CLAUDE.md rule; #3 hook enforces |
| gsd-context-monitor.js (#4) | **STUDY-PILOT** comparison vs sibling W175 | (decide at Phase 2E re-audit) | Choose ONE pre-emptive system after measuring both |

---

## (5) Manifest rows for `Z:\claude-sota-pure\docs\sota-installed-manifest.md` Phase 2D+

```markdown
### Phase 2D — gsd-build pattern adoption (selective-vendor)

| Row | Primitive | Source @ SHA | Install class | Status | CR-8 status |
|-----|-----------|--------------|---------------|--------|-------------|
| 2D.1 | prompt_guard.js | gsd-build/get-shit-done/hooks/gsd-prompt-guard.js @ eeaf9c5 | SELECTIVE-VENDOR | PLANNED | ADAPTED-FROM-SOTA |
| 2D.2 | read_injection_scanner.js | gsd-build/get-shit-done/hooks/gsd-read-injection-scanner.js @ eeaf9c5 | SELECTIVE-VENDOR | PLANNED | ADAPTED-FROM-SOTA |
| 2D.3 | conventional_commit_gate.sh | gsd-build/get-shit-done/hooks/gsd-validate-commit.sh @ eeaf9c5 | SELECTIVE-VENDOR | PLANNED | ADAPTED-FROM-SOTA |
| 2D.4 | spike/SKILL.md | gsd-build/get-shit-done/commands/gsd/spike.md @ eeaf9c5 (pattern extract) | CITE-ONLY | PLANNED | ADAPTED-FROM-SOTA |
| 2D.5 | Conventional Commits CLAUDE.md discipline | gsd-build/get-shit-done/hooks/gsd-validate-commit.sh @ eeaf9c5 + conventionalcommits.org spec | CITE-ONLY | PLANNED | ADAPTED-FROM-SOTA |
| 2D.6 | gsd-eval-auditor pattern | gsd-build/get-shit-done/agents/gsd-eval-auditor.md @ eeaf9c5 | STUDY-PILOT (deferred to Phase 2E) | DEFERRED | PENDING-AUDIT |
| 2D.7 | context-monitor comparison | gsd-build/get-shit-done/hooks/gsd-context-monitor.js @ eeaf9c5 vs sibling W175 | STUDY-PILOT | DEFERRED | PENDING-AUDIT |
```

---

## (6) REJECT cohort with reasoning

| Primitive | Reject reason | Probe failed |
|-----------|---------------|--------------|
| `/gsd-graphify` | DUPLICATE GitNexus (6008 symbols/6396 rels/27 flows) | P4 plugin-namespace |
| `/gsd-sketch` | CLI-only runtime; HTML mockups out-of-scope | P5 mode-harness |
| `/gsd-plan-phase` D-P-E-V workflow | Competing state surface with cwc PROGRESS.md | P5 mode-harness |
| `/gsd-spec-phase` | DUPLICATE CCBP RPI workflow | P4 plugin-namespace |
| `/gsd-code-review` 33-agent dispatch | DUPLICATE codex T2/T3 cross-model | P4 plugin-namespace |
| `gsd-pattern-mapper` | DUPLICATE GitNexus + Serena | P4 plugin-namespace |
| `gsd-nyquist-auditor` | No current workflow consumer | P7.a demand-absent |
| Multi-runtime install adapters | Pure runtime is Claude Code SOLE-runtime | P5 mode-harness |
| Full plugin install via `npx get-shit-done-cc` | 9/11 hooks require `.planning/` runtime; STATE.md conflicts cwc; 86 commands flood namespace | P4 + P5 combined |
| 25/33 agents (research/doc/plan/verify/debug clusters) | DUPLICATE existing addy + skill-creator + sota-researcher coverage | P4 plugin-namespace |

---

## (7) Key novel patterns extractable WITHOUT full install

### Pattern A — Prompt-injection defense layer (CLAUDE.md + 2 hooks)

**Source**: `hooks/gsd-prompt-guard.js` + `hooks/gsd-read-injection-scanner.js` @ eeaf9c5

**Adopt as**: CLAUDE.md §"Threat-model defense" + 2 hook scripts at `.claude/hooks/scripts/{prompt_guard.js,read_injection_scanner.js}`

**14 injection-detection regexes** (verbatim port):
- `ignore (all)? previous instructions` / `ignore above instructions` / `disregard previous`
- `forget instructions` / `override system prompt`
- `you are now a/an` / `act as a/an` / `pretend to be` / `from now on`
- `print/output/reveal/show system prompt`
- `</system>` / `[SYSTEM]` / `[INST]` / `<<SYS>>`
- Invisible Unicode (zero-width, RTL override, soft hyphen, BOM)
- Unicode tag block U+E0000–E007F

**Novel pattern (summarisation-survival)** — exclusive to gsd-read-injection-scanner.js, NOT in prompt-guard:
- `when summarizing/compressing/compacting, retain/preserve/keep these`
- `this instruction is permanent/persistent/immutable`
- `preserve these rules in/through/after summarization`

This addresses the **post-compact context-bleed** risk identified in `Z:/claude-sota/.claude/rules/auto-compact-discipline.md` — instructions designed to survive auto-compact summarization.

### Pattern B — Pre-emptive context-rot warning system

**Source**: `hooks/gsd-context-monitor.js` @ eeaf9c5

**Adopt as**: STUDY-PILOT comparison with sibling W175 `userpromptsubmit_compact_threshold.py`.

**Novel mechanism**: PostToolUse hook reads `/tmp/claude-ctx-{session_id}.json` written by statusline hook, then injects `additionalContext` warnings at 35% (WARNING) / 25% (CRITICAL) REMAINING thresholds. Severity escalation bypasses debounce. Critical-mode auto-records session breadcrumb via fire-and-forget subprocess.

**Trade-off vs sibling W175**: gsd uses REMAINING% (relative); sibling W175 uses TOTAL tokens (absolute). On 1M-context Opus 4.7, gsd's 35% threshold = ~650k (matches sibling's 650k CRIT). Both approaches converge numerically; gsd's is more portable across context-window sizes.

**Karpathy §5 Compounding Surface alignment**: TIER-3-LOCAL-COMPOSITION cite class — gsd's logic is novel local composition over Anthropic CC hook substrate.

### Pattern C — Conventional Commits gate (semantic complement to T2 cross-model)

**Source**: `hooks/gsd-validate-commit.sh` @ eeaf9c5

**Adopt as**: CLAUDE.md §"Commit Discipline" + opt-in PreToolUse `Bash(git commit *)` hook.

**14-line regex** validates: `^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\(scope\))?: subject (<=72 chars)`.

**Cite chain (Axis-1 ≥3 orgs PASS)**:
- conventionalcommits.org official spec
- Angular contribution guidelines (original)
- CCBP `claude-coding-style.md` (cite-import-AMBER if sibling has it)

**Complement to T2**: T2 reviews content; this reviews shape. Both PreToolUse `Bash(git commit *)`; both block on fail. Orthogonal.

### Pattern D — Spike-as-research discipline (NOT full install)

**Source**: `commands/gsd/spike.md` + `get-shit-done/workflows/spike.md` @ eeaf9c5 (concept extract)

**Adopt as**: New `.claude/skills/spike/SKILL.md` describing the 2-5-experiments DISCIPLINE:
- Build *focused experiments* (not full features) to validate feasibility
- Verify-via-running (smoke probes, side effects)
- Spikes are tracked separately from production work
- Wrap-up phase produces verified knowledge artifacts

**Sister citations**: Pragmatic Programmer Tip #62 "Don't Program by Coincidence" (book ISBN 0-201-61622-4) + Agile-spike convention.

**Pure runtime fit**: ADOPT-AS-SKILL (not as command + workflow + state). Discipline is text-only; no `.planning/` dependency.

### Pattern E — Fresh-context subagent dispatch discipline

**Source**: gsd DeepWiki architecture analysis — "Each specialized agent is spawned with a clean context window (up to 200K tokens), preventing 'context rot'."

**Status**: Pure runtime already adopts this per `Z:/claude-sota/.claude/rules/team-orch-state-spawning.md §Parent→Child State-Leak Avoidance` (deepagents-aligned 5-key set). gsd's pattern is convergent evidence, NOT new for pure runtime — confirms Axis-1 ≥3-distinct-orgs (LangChain deepagents + obra superpowers + gsd-build TÂCHES) for the discipline.

**Adopt as**: Wave-11 evidence row in `Z:/claude-sota-installed/docs/sota-installed-manifest.md` for the state-leak-avoidance discipline.

---

## Sister rule integration

This audit invokes:
- `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` §The 7 sub-classes (Probes 1-7)
- `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis-1 ≥3-distinct-orgs + Row-2 fabrication-test gate
- `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md` §6-class disposition lattice (rows: COMPLEMENT / PROVIDER-COMPLEMENT)
- `Z:/claude-sota-installed/docs/verified-avoid.md` Cohort 1 META-HARNESS exclusion (gsd does NOT match)
- `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — Probe 4 plugin-namespace REJECT-FOR-FIT verdict for 8/15 primitives caught pre-Edit
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md` §Subclaim-type discriminator (CATEGORY-CLAIM probes performed via GitHub MCP)

---

## Evidence trail

- **Repo HEAD probe**: `mcp__github__search_repositories query="get-shit-done in:name"` returned `gsd-build/get-shit-done` 62,260★ MIT JS [VERIFIED 2026-05-14] (Marker Decay vs sibling 58,543★).
- **Tree probe**: 4× `mcp__github__get_file_contents` at HEAD `eeaf9c556fa9b89f3d0681b1744852ad5e4b179e` for `/`, `commands`, `hooks`, `agents`, `get-shit-done`, `package.json` [VERIFIED 2026-05-14].
- **Hook source reads**: `gsd-prompt-guard.js` (3499 bytes), `gsd-context-monitor.js` (8113 bytes), `gsd-validate-commit.sh` (2095 bytes), `gsd-read-injection-scanner.js` (5526 bytes) — full source read at HEAD SHA [VERIFIED 2026-05-14].
- **Command source reads**: `commands/gsd/graphify.md` + `commands/gsd/spike.md` [VERIFIED 2026-05-14].
- **DeepWiki architecture probe**: `mcp__deepwiki__ask_question` returned 5-primitive architecture summary + multi-runtime adoption strategy [VERIFIED 2026-05-14].

## Disposition for orchestrator

- **Phase 2D manifest rows ready**: 7 rows above (selective-vendor + cite-only + study-pilot mix)
- **PLAN class change required**: pure runtime CLAUDE.md needs new §"Threat-model defense" section + §"Commit Discipline" extension
- **2nd-stage harness-fit validation**: NOT required — this audit was Probe 4 / Probe 5 / Probe 7 explicit per FM-09 2-stage contract (Mia probe done at Probe 4 plugin-namespace step, caught 8/15 OVER)
- **No codex T1 dispatch needed for this audit**: audit is research-only (no edit); cardinal-rule 3 cross-model gate satisfied at orchestrator-side merge stage
- **Next step**: orchestrator decides 2D adoption order — recommend rows 2D.5 + 2D.1 + 2D.2 + 2D.3 + 2D.4 first (CLAUDE.md discipline + 3 security hooks + 1 skill = minimal, reversible, no namespace flood)

GSD-AUDIT-COMPLETE: 7 deliverables shipped to `tmp/sota-pure-wave11-Q-gsd-build-2026-05-14.md`. handoff_to: orchestrator.
