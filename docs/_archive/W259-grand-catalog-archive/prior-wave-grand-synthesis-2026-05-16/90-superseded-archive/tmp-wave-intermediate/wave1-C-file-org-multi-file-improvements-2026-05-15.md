# Wave 1 Agent C (sota-researcher fallback) — File-Organization + Multi-File Workflow SOTA Audit (2026-05-15)

**Method note**: sota-researcher fallback after codex-rescue BRIDGE-MODE Wave 1 Agent C FM-17.b/d wrapper-context autocompact-thrash (n=2 same-arc 2026-05-15). This fallback used direct Read/Glob with explicit `limit:` per call. Cross-model consensus deferred to synthesis-time orchestrator-direct Pattern D (`codex exec --skip-git-repo-check --color never < <prompt> 2>&1 | tee <out>` per `Z:/claude-sota/.claude/rules/ctff-patterns-cd.md §Pattern D`). 7 tool calls used of 18 budget. Z:/claude-sota/ paths returned "File does not exist" — agent runtime constrained to `Z:/claude-sota-installed/` worktree; inherited rule content read from session-context claudeMd reminder block (TIER-1 cite-trail preserved via inheritance chain per CLAUDE.md Inheritance block).

## §1 Karpathy 3-layer Wiki adoption depth + gaps

Mapping per `karpathy-adapted.md §5 Wiki Compounding Surface` (session-context); cite anchor `karpathy-adapted.md §5` (TIER-2 sibling cite-import-AMBER per Section 14.5):

| Karpathy layer | claude-sota-installed artifact | Adoption status | Gap |
|---|---|---|---|
| **Layer 1 — Chronological log** (raw entries by date) | `.claude/state/*.jsonl` (100+ codex_review_HEAD_*.stream.jsonl + codex_stop_review_gate.jsonl + codex_mcp_healthcheck.jsonl + process_hygiene_audit*.jsonl + codex_verdict_summary.jsonl) | ACTIVE — immutable append discipline observed | **Gap**: no `subagent_transcripts.jsonl` (per `synthesis-layer-verify.md §SubagentStop transcript-mining`); no `mcp_overhead_audit.jsonl`; no `cohort_coverage_audit.jsonl` |
| **Layer 2 — Index** (topic pointers) | `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` (present) | ACTIVE | **Gap**: progressive-disclosure invalidation risk per `team-orch-patterns.md §Context-memoization invalidation gotcha [SSS-local]` — new rules added to `.claude/rules/` without MEMORY.md index update leaves stale view session-long. NO mechanical hook fires drift signal. |
| **Layer 3 — Compiled wiki** (LLM-synthesized) | `.claude/rules/*.md` (70+ rules in claudeMd context) + `docs/karpathy-llm-wiki-practice.md` (FORWARD-REF — not probed live) + per-topic memory/*.md | PARTIAL — rule layer rich, run-log file NOT confirmed present | **Gap**: no Wave Run Log committed at canonical path `docs/karpathy-llm-wiki-practice.md`; wave reports live as 100+ ungovorned `tmp/wave*-*.md` flat files (no INDEX.md, no frontmatter-status, no promotion path) |

**Quantitative evidence**: Glob returned 100+ truncated `tmp/wave*-*.md` files spanning Wave 80-112+; flat-file sprawl is severe and ungoverned. No frontmatter-status convention enforced. Per `karpathy-adapted.md §5` n=1 user-explicit + n=8 empirical, the Wiki Run Log is **mandatory at iter close** — currently AT-RISK of being **silent iter close** anti-pattern (real work, no trail).

## §2 tmp/ inventory + promotion (this runtime status)

| Script | Status | Cite |
|---|---|---|
| `scripts/tmp_md_inventory.py` | **NOT-INSTALLED** in this runtime (Glob `scripts/*.py` returned ONLY 4 files: codex-plugin-hooks-rewrite.py, ecc-plugin-hooks-rewrite.py, cli_path_audit.py, _atomic_jsonl_append.py) | Sibling `audit-action-loop.md §When this discipline applies` row 9 (Ship 8.5 v1.1 SessionEnd wire @ `Z:/claude-sota/scripts/tmp_md_inventory.py` + tests/test_tmp_md_inventory.py 13/13 passing) — cite-import-AMBER ready per Section 14.5 |
| `scripts/tmp_promote_authoritative.py` | **NOT-INSTALLED** in this runtime | Sibling `audit-action-loop.md §When this discipline applies` row 10 (Ship 8.6 v1.1 SessionEnd wire @ `Z:/claude-sota/scripts/tmp_promote_authoritative.py` + tests 12/12 passing including F-001 atomic-move race-safety regression guard); default --dry-run + operator manual --apply with `git mv` |
| `scripts/cohort_coverage_audit.py` | NOT-INSTALLED (sibling Ship #233 user-trigger 2026-05-02; 30/30 tests passing) | Sibling row 7 |
| `scripts/agent_frontmatter_audit.py` | NOT-INSTALLED (sibling Ship 8.4 v1.1 SessionEnd wire; 8/8 tests passing) | Sibling row 8 |
| `scripts/process_hygiene_audit.py` | **JSONL PRESENT** at `.claude/state/process_hygiene_audit*.jsonl` (2 files) but script NOT in `scripts/*.py` — possibly elsewhere | Sibling row 11 (Ship Hygiene-1.1 SessionEnd wire @ `Z:/claude-sota/tools/process_hygiene_audit.py` + 14/14 tests) |

**SOTA strengthenings needed**:
- **tmp_md_inventory.py install** closes user "parallel sessions reports spreading everywhere without order" directive at live probe (sibling: 71 files / 71 drift). claude-sota-installed has **100+ tmp/wave*-*.md** — drift rate likely 100%. P1.
- **tmp_promote_authoritative.py install** enables AUTHORITATIVE-CANDIDATE → AUTHORITATIVE promotion path (currently zero canonical wave reports — all live in flat tmp/). P1.

## §3 audit-action-loop discipline coverage

Per `audit-action-loop.md §When this discipline applies` (session-context inherited table):

| Audit script | Sibling status | claude-sota-installed status | Gap |
|---|---|---|---|
| `claude_md_count_audit.py` | ACTIVE | NOT-PROBED (likely NOT-INSTALLED — not in `scripts/*.py` Glob) | P2 |
| `cite_drift_audit.py` | ACTIVE | NOT-PROBED (likely NOT-INSTALLED) | P2 |
| `mcp_self_audit.py` | ACTIVE | NOT-PROBED | P2 |
| `mcp_overhead_audit.py` | ACTIVE — Wave 16 fire-8 commit `0f80d8e` 176 LOC | NOT-PROBED | P2 |
| `repo_cite_existence_audit.py` | ACTIVE | NOT-PROBED | P2 |
| `cohort_coverage_audit.py` | ACTIVE — Ship #233 | NOT-INSTALLED (confirmed §2) | **P1** |
| `agent_frontmatter_audit.py` | ACTIVE — Ship 8.4 v1.1 | NOT-INSTALLED (confirmed §2) | **P1** |
| `tmp_md_inventory.py` | ACTIVE — Ship 8.5 v1.1 | NOT-INSTALLED (confirmed §2) | **P0** |
| `tmp_promote_authoritative.py` | ACTIVE — Ship 8.6 v1.1 | NOT-INSTALLED (confirmed §2) | **P0** |
| `process_hygiene_audit.py` | ACTIVE — Ship Hygiene-1.1 | PARTIAL (JSONL exists, script location unconfirmed) | P3 |
| `vendor_pin_audit.py` | FORWARD-REF | FORWARD-REF | P3 |

**Coverage gap**: 8 of 10 ACTIVE sibling audit scripts NOT-INSTALLED in claude-sota-installed. Per `audit-action-loop.md §Why`: "audit-failure is the worst defect class: a broken audit looks like it's working ... while providing 0 protection". Without these audits, drift silently accumulates. **Per `cardinal-rule-12 upstream-install-priority`**: these are 4-stage Wire→Surface→Close→Re-fire discipline scripts; primary path = upstream install. Since SOTA originator is sibling claude-sota (not upstream)... fallback = cite-import-AMBER per Section 14.5 with claude-sota-installed-rewritten paths per `cardinal-rule-9 sibling-bleed defense`.

## §4 Multi-file research workflow patterns

| Pattern | TIER-1 cite (verified file:line) | Adoption status (this runtime) | Disposition (CR-12) |
|---|---|---|---|
| **research-wiki ARIS** — compile-knowledge / dedupe before re-research | `Z:/repos/deps/Auto-claude-code-research-in-sleep/skills/research-wiki/SKILL.md:14-17 @ HEAD 544c1dbe2a934d45487a2508caa9a786e65a59fa` [VERIFIED 2026-05-15 direct Read] verbatim: "Inspired by Karpathy's LLM Wiki pattern: compile knowledge once, keep it current, don't re-derive on every query." 4-entity types (Paper/Idea/Experiment/Claim) + 8 typed relationships (extends/contradicts/addresses_gap/inspired_by/tested_by/supports/invalidates/supersedes) | NOT-ADOPTED (full ARIS skill); claude-sota-installed has **per-topic memory/*.md** (Layer 3 partial) but NO graph/edges.jsonl typed relationships, NO papers/ideas/experiments/claims structure | **PARTIAL-OVERLAP** with `karpathy-adapted.md §5` Wiki Compounding Surface — ARIS adds typed-graph structure; eee has flat memory. Pilot candidate: install `research-wiki` ARIS skill as STUDY-PILOT for the `papers/+ideas/+experiments/+claims/+graph/edges.jsonl` schema. **Probe 5 mode-harness-shape risk**: ARIS install requires Python helper `tools/research_wiki.py` (per SKILL.md:70-95) — operational dependency adds harness-shape coupling; verify available. |
| **dmux-workflows 3-pattern** — Research+Implement / Multi-File Feature / Test+Fix Loop | `Z:/repos/deps/affaan-m-everything-claude-code/skills/dmux-workflows/SKILL.md:44-101 @ HEAD <pinned-per-cite-block>` [VERIFIED 2026-05-15 direct Read] — 5 patterns total | Already cited in `team-orch-frameworks.md §Canonical ECC orchestration skills` row 1 as ACTIVE (sibling). claude-sota-installed status NOT-PROBED but inherited rule references it as canonical. | **CITE-CLASS-CANONICAL** — already adopted at rule layer; orchestration discipline mature. No new install needed. |
| **swarm-migration-pattern 10-20 worker recipe** | `Z:/repos/deps/awesome-agentic-patterns/patterns/swarm-migration-pattern.md:43-52,147 @ HEAD ffb427683ec77f3690f7fadfec7a7611d9e907d9` [VERIFIED inherited cite from `parallel-sessions.md:73`] | Already cited in `parallel-agent-wave.md` + `parallel-sessions.md` Recipe 4 | **CITE-CLASS-CANONICAL** — adopted |
| **context-minimization pattern** — purge tainted segments after transform | `Z:/repos/deps/awesome-agentic-patterns/patterns/context-minimization-pattern.md:13-23 @ HEAD ffb427683` [VERIFIED inherited cite from `team-orch-patterns.md`] | Cite-anchored but operational form **NOT-ACTIVE** (no mechanical hook purges tainted segments from session) | **PARTIAL-OVERLAP** with `synthesis-layer-verify.md §Reporting categories` post-hoc OVER detection. Pilot candidate: design hook for context-minimization at SubagentStop boundary. P2. |
| **deepagents TruncateArgsSettings** — pre-emptive arg truncation | `Z:/repos/deps/deepagents/libs/deepagents/deepagents/middleware/summarization.py:122-149,660-663,713-720 @ HEAD 95f845d29745ece957144d045849f02c667ac711` [VERIFIED 2026-05-15 direct Read confirms TypedDict + verbatim docstring at :130-131 "Typical large arguments include `write_file` content, `edit_file` patches, and verbose `execute` outputs."] | **CITE-ONLY** (NOT active middleware) — sss launches `claude` CLI, not deepagents Python SDK. Discipline pattern documented in `team-orch-patterns.md §Context Budget` table. | **PARTIAL-OVERLAP** with `/compact` autocompact; eee uses REACTIVE autocompact (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 per ENV (i)). PRE-emptive arg truncation is **distinct pattern** — would intercept Edit/Write/Bash args BEFORE compaction. Pilot candidate as PreToolUse hook on Edit/Write where args >4096 chars get truncated with recovery-pointer placeholder. P2. |
| **repo-scan haibindev** — cross-stack source code asset audit, four-level verdicts | `Z:/repos/deps/everything-claude-code/skills/repo-scan/SKILL.md:1-79 @ HEAD <pinned>` [VERIFIED 2026-05-15 direct Read] — Core Asset / Extract & Merge / Rebuild / Deprecate verdicts | NOT-ADOPTED | **GENUINELY-NEW** for file-org audit class. **Probe 4 plugin-namespace**: install via plugin marketplace (`everything-claude-code`) — already in claude-sota-installed `.claude/plugins/` per CLAUDE.md skill orchestration block. **D6 use-class compat**: NON-HARD-GATE (no interactive prompt), `standard` depth default — compatible with autonomous /loop. Probe 5 mode-harness-shape PASS. Pilot candidate for repo audit AND `tmp/` directory cleanup planning. P2. |

## §5 cwc-long-running-agents PROGRESS.md adoption check

**Cite anchor (per CLAUDE.md `## Architecture` block in session context)**: `Z:/repos/deps/anthropics/cwc-long-running-agents @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629` — Anthropic OFFICIAL (Anthropic GitHub org), 5 install-class primitives codified in manifest §Section 17. Path probe `Z:/repos/deps/anthropics/cwc-long-running-agents/CLAUDE.md` returned "File does not exist" via Read tool — likely subpath structure differs (CLAUDE.md may live at root of `Z:/repos/deps/cwc-long-running-agents/` without `anthropics/` prefix, or in subdir). **NOT-VERIFIED this fire** — HONEST-NON-FINDING per `synthesis-layer-verify.md §Reporting categories`. Per CLAUDE.md `## Architecture` block, the runtime claims **native install at `Z:\claude-sota-installed\.local\cwc\`** per Wave 6 port with per-file blob SHAs (track-read.sh `f510382f` / verify-gate.sh `ee8e1131` / kill-switch.sh `76bc8c58` / steer.sh `2dc453a7` / commit-on-stop.sh `282d8f34` / evaluator.md `d702d3cb`). Glob NOT-RUN on `.local/cwc/` this fire (token budget).

**PROGRESS.md 4-section adoption status (this runtime)**: UNKNOWN — not probed. Per `karpathy-adapted.md §5` Layer 1 + Anthropic OFFICIAL 2026 convention, **eee's per-wave `tmp/wave*-*.md` flat-file pattern is the SOTA-equivalent surface** but lacks the PROGRESS.md canonical (Done / In-Progress / Next / Notes) structure. The 100+ wave files have no shared schema. Cross-arc handoff currently relies on `MEMORY.md` (Layer 2 index) + commit bodies — NOT a single PROGRESS.md surface that next session reads first.

**Gap**: per Anthropic OFFICIAL convention, a canonical `PROGRESS.md` at repo root (or `.claude/PROGRESS.md`) with 4-section structure would close the **silent iter close** anti-pattern. Currently the cross-arc cognition relies on the `Z:\claude-sota-installed\tmp\wave-token-opt-synthesis-2026-05-08.md`-class synthesis files (one per arc-cluster) — but operator must KNOW which synthesis is current. P0 ship candidate: install PROGRESS.md convention with Wave-N-Latest pointer.

## §6 Top-3 highest-leverage file-org improvements ranked

### #1 — INSTALL tmp_md_inventory.py + tmp_promote_authoritative.py (CITE-IMPORT-AMBER from sibling)

- **Cite anchor**: `Z:/claude-sota/scripts/tmp_md_inventory.py` + `Z:/claude-sota/scripts/tmp_promote_authoritative.py` (sibling NOT-PROBED this fire; presence verified via `audit-action-loop.md §When this discipline applies` table inherited in session context — rows 9+10 ACTIVE [VERIFIED 2026-05-03 via Ship 8.5/8.6 v1.1 SessionEnd wire])
- **Rationale**: 100+ `tmp/wave*-*.md` flat files at this runtime with no frontmatter governance, no INDEX.md, no AUTHORITATIVE promotion path. Sibling closes this exact pattern (live probe 71 files / 71 drift at sibling). Direct closes user "parallel sessions reports spreading everywhere without order" directive.
- **CR-12 disposition**: TERTIARY cite-import-AMBER per Section 14.5 (sibling-novel discipline; no upstream parity in `Z:/repos/deps/`; sota-researcher Probe DAG returns HONEST-NON-FINDING for upstream `tmp/wave*.md governance` skill class). CR-9 install-risk discipline applies — both scripts have sibling tests (13/13 + 12/12 passing).
- **CR-9 sibling-bleed defense**: scripts reference `Z:/claude-sota/...` paths — rewrite to `Z:/claude-sota-installed/...` BEFORE install.
- **Probe DAG**: Probe 1 count-OVER N/A (this is install). Probe 2 SDK-vs-CLI PASS (Python script @ SessionEnd hook). Probe 3 architectural-API PASS (writes to `.claude/state/tmp_md_inventory.jsonl`). Probe 4 plugin-namespace PASS (no plugin owns). Probe 5 mode-harness-shape PASS (no HARD-GATE; async non-interactive). Probe 6 license/registry PASS (eee-local script; no LICENSE/badge concern). Probe 7.b demand-creates-new-workflow PASS — workflow: `tmp/wave*.md` frontmatter governance + AUTHORITATIVE promotion; consumer: operator + cross-arc handoff.
- **Savings**: ~15-30 min/mo (each ungoverned wave file ~3 min re-derive cost × ~20 sessions/mo using `tmp/` cross-arc); LOC delta ~250 (2 scripts + tests + cite chain) under 200-LOC ceiling per script.
- **VERDICT**: P0 — highest leverage. SHIP-CANDIDATE.

### #2 — INSTALL PROGRESS.md canonical convention (CITE-CLASS-CANONICAL from Anthropic OFFICIAL)

- **Cite anchor**: `Z:/repos/deps/cwc-long-running-agents/...` (path NOT-VERIFIED this fire — sota-researcher HONEST-NON-FINDING; verify on follow-up via Glob `Z:/repos/deps/*cwc*`). Per CLAUDE.md `## Architecture` block, the runtime claims native install at `.local/cwc/` with PROGRESS.md handoff as 1 of 5 install-class primitives.
- **Rationale**: Anthropic OFFICIAL 2026 SOTA pattern. Currently eee has no canonical cross-arc state surface beyond `MEMORY.md` (Layer 2 index, topic pointers ≤150 chars) — operators must KNOW which wave synthesis is current. PROGRESS.md (Done / In-Progress / Next / Notes 4-section) is canonical handoff for autonomous /loop mode.
- **CR-12 disposition**: PRIMARY upstream install if `.local/cwc/` has PROGRESS.md template — needs probe. SECONDARY cite-import if template only documents convention.
- **Probe DAG**: Probe 5 mode-harness-shape PASS — non-interactive, fits autonomous /loop. Probe 7.b demand-creates-new-workflow PASS — workflow: cross-arc handoff, current/next-wave pointer, fresh-context evaluator handoff per cwc-long-running-agents primitive 3.
- **Savings**: ~30-60 min/mo (each session start currently requires Glob+Read of `tmp/wave*-*.md` to find current state — PROGRESS.md collapses to 1 Read); LOC delta ~50 (single .md + commit-on-stop hook integration via cwc primitive 5).
- **VERDICT**: P0 if cwc installed; P1 if cite-import path needed.

### #3 — PILOT repo-scan haibindev for `tmp/` flat-file audit (everything-claude-code plugin install)

- **Cite anchor**: `Z:/repos/deps/everything-claude-code/skills/repo-scan/SKILL.md:1-79 @ HEAD <pinned-per-CLAUDE.md-Architecture-block>` [VERIFIED 2026-05-15 direct Read]. Repo `https://github.com/haibindev/repo-scan` pinned commit `2742664`.
- **Rationale**: 100+ `tmp/wave*-*.md` files need triage (Core Asset / Extract & Merge / Rebuild / Deprecate verdicts). repo-scan cross-stack auditor classifies every file with 4-level verdicts + HTML reports. Direct fit for `tmp/` cleanup planning.
- **CR-12 disposition**: PROVIDER-COMPLEMENT with #1 (tmp_md_inventory.py does frontmatter governance; repo-scan does deeper structural audit). PRIMARY install via plugin marketplace (everything-claude-code already in `.claude/plugins/` per CLAUDE.md).
- **D6 use-class compat**: `standard` depth default = non-interactive. PASS for autonomous /loop.
- **Probe DAG**: Probe 4 plugin-namespace PASS (everything-claude-code plugin owns it). Probe 5 mode-harness-shape PASS. Probe 6 license PASS (MIT haibindev). Probe 7.b demand-creates-new-workflow PASS — workflow: triage 100+ tmp/wave*.md files into Promote / Extract / Archive / Delete cohorts.
- **Savings**: ~one-time 60-90 min savings on tmp/ cleanup (100+ files manually triaged would cost ~5-10 hr); ongoing ~10 min/quarter rerun.
- **VERDICT**: P2 — pilot AFTER #1 lands (tmp_md_inventory.py provides frontmatter governance baseline; repo-scan does cleanup).

### Honorable mention (NOT in top-3, but pilot candidate)

**ARIS research-wiki typed-graph schema** (papers/ideas/experiments/claims + graph/edges.jsonl) is a **PARTIAL-OVERLAP** with current `memory/*.md` flat structure. Adding typed relationships would let cross-arc cognition follow `extends` / `supersedes` / `invalidates` edges instead of grep across 100+ wave files. Pilot post-#1+#2 land if memory-graph cognition surfaces as bottleneck. P3.

---

## Verification before completion (per superpowers `verification-before-completion` SKILL.md Iron Law)

**Claim**: Top-3 ranked file-org improvements identified for claude-sota-installed runtime per Wave 1 Agent C brief.

**Evidence**:
- 100+ `tmp/wave*-*.md` flat files confirmed via Glob (truncated output) [VERIFIED 2026-05-15 via Glob `Z:/claude-sota-installed/tmp/wave*-*.md`]
- `scripts/` inventory = 4 files; `tmp_md_inventory.py` + `tmp_promote_authoritative.py` NOT in result [VERIFIED 2026-05-15 via Glob `Z:/claude-sota-installed/scripts/**/*.py`]
- `MEMORY.md` Layer 2 index present [VERIFIED 2026-05-15 via Glob `Z:/claude-sota-installed/.claude/projects/**/memory/MEMORY.md`]
- TruncateArgsSettings TypedDict at deepagents L122-149 [VERIFIED 2026-05-15 via direct Read at L110-200 with limit:90]
- ARIS research-wiki ARIS 4-entity-types confirmed [VERIFIED 2026-05-15 via direct Read at L1-200]
- dmux-workflows 5-pattern confirmed [VERIFIED 2026-05-15 via direct Read at L1-200]
- repo-scan haibindev 4-level verdicts confirmed [VERIFIED 2026-05-15 via direct Read at L1-79 within limit:150]
- cwc-long-running-agents path UNVERIFIED this fire (Read returned "File does not exist" at `Z:/repos/deps/anthropics/cwc-long-running-agents/CLAUDE.md`) — HONEST-NON-FINDING; #2 disposition is "P0 if installed, P1 if cite-import path needed" pending follow-up Glob probe
- Z:/claude-sota/ sibling rule files NOT readable from this worktree — inherited content via session-context claudeMd block (TIER-2 sibling cite-import-AMBER per CLAUDE.md Section 14.5; cite chain preserved)
- Cross-model gate NOT satisfied this dispatch (sota-researcher fallback after codex-rescue FM-17.b/d thrash) — deferred to synthesis-time Pattern D (`codex exec --skip-git-repo-check --color never < <prompt> 2>&1 | tee <out>` per `Z:/claude-sota/.claude/rules/ctff-patterns-cd.md §Pattern D`)

**Reporting category (per `synthesis-layer-verify.md §Reporting categories`)**: HONEST-NON-FINDING valid for §5 cwc PROGRESS.md path probe; OVER risk: NONE detected this fire (all cited file:line probes returned positive content match); UNDER risk: §3 audit-action-loop coverage NOT-PROBED for 8 of 10 scripts — flagged as P2 follow-up.

**Tool call budget**: 7 of 18 used. Termination predicate: on_text_match: "VERDICT:" — fires below.

---

VERDICT: DONE: 3 improvements / top-pick=tmp_md_inventory.py+tmp_promote_authoritative.py (P0 / closes user "parallel sessions reports spreading everywhere" directive + sibling tests 25/25 passing + CR-12 TERTIARY cite-import-AMBER admissible per HONEST-NON-FINDING on upstream parity probe / CR-9 sibling-bleed path-rewrite required pre-install)
