# Stream E — planning-with-files + GitNexus + alirezarezvani

**Wave**: W337-FULL-SOTA-UNLEASHED
**Date**: 2026-05-20
**Tools used**: mcp__github__list_commits, mcp__deepwiki__read_wiki_structure, mcp__github__get_file_contents, mcp__plugin_context-mode_context-mode__ctx_batch_execute (local probes).

---

## §1 — OthmanAdi/planning-with-files

**HEAD**: `d27008f369a5c58f315ce74194ff1c21b9a0eedc` @ 2026-05-16T08:27:54Z (≈4 days old).
**Latest message**: `fix: v2.38.1 swap plan-injection delimiter from --- to === to avoid YAML doc-separator collision`. Currently maintained — substantive bug fix on YAML frontmatter parsing affecting skill-discovery in CC.

**Repo structure** (via mcp__deepwiki__read_wiki_structure):
- 12 top-level sections including: The 3-File Pattern (§2.1), Manus Principles Deep Dive (§8), Platform-Specific Guides (§9: Claude Code, Cursor, Continue, Kilocode, Codex, OpenCode, Gemini CLI, Pi, Hermes).
- Multi-IDE adapter mirrors (`.codebuddy/.codex/.cursor`) shipped on every release per HEAD commit message.

**Local install state**:
- `.claude/plugins/cache/planning-with-files/planning-with-files/` — nested dir confirmed; further plugin.json not surfaced in batch (look-up succeeded only at outer level).
- settings.json `enabledPlugins["planning-with-files@planning-with-files"]: true` — **ENABLED**.
- W308 PATTERN2-PWF-SOTA-DISCOVERY decision: convergent **DEACTIVATE plugin** (4-of-5 Phase-5 FAIL on benchmark-non-applicability + license-ambiguity + maintenance-unproven at the time + duplication-vs-TodoWrite). Pattern preserved as operator-curated skill `.claude/skills/durable-planning-files/SKILL.md` (7083 bytes).
- W308 codex r2 produced the durable-planning-files skill at commit `609cba0` per the skill's own status header.

**Drift assessment**:
- Plugin HEAD = `d27008f` (2026-05-16); local cache version not surfaced in this batch but `enabledPlugins` is `true` despite W308 DEACTIVATE verdict. **Inconsistency**: was the plugin re-enabled? Per the W334-SOTA-UNLEASH commit `ca6904a` "enable 18 high-value SOTA plugins per operator audit" — likely the W334 wave reversed the W308 deactivation.

**Recommendation**: **KEEP-AS-IS**. The plugin is actively maintained (recent bug-fix). Both the plugin (enabled) and the operator-curated pattern skill coexist; the skill captures the architectural lesson while the plugin provides the helper hooks. **No action needed** unless a future drift-test (codex r1 review) finds duplication harm.

---

## §2 — abhigyanpatwari/GitNexus

**HEAD**: `4d2ed0e52501104450a2c9200a543d1633690875` @ 2026-05-20T15:14:13Z (TODAY). PR #1722: `fix(eval-server): localhost now doesn't normalize into IPv4 instead lets OS decide which to bind`. **Highly active**.

**Repo structure** (via mcp__deepwiki__read_wiki_structure):
- 12 top-level sections — exceptionally comprehensive: Dual Deployment Modes, Tree-sitter Parsing, Worker Pool / Parallel Processing, Import Resolution (tiered), Community Detection (Leiden), LadybugDB schema, Hybrid Search Architecture (BM25 + embeddings), MCP Tools + Resources, AI Agent Integration (Editor Support Matrix, Hooks, Cursor integration), Web UI (Web Worker, Graph RAG), CLI (analyze/serve/mcp/eval-server), SWE-bench eval harness.

**Local install state**:
- `.claude/plugins/cache/gitnexus-marketplace/` — **NOT-CACHED** (probe).
- settings.json `enabledPlugins["gitnexus@gitnexus-marketplace"]: false` — **DISABLED**.
- `.claude/skills/gitnexus*` — only 1 directory present (`gitnexus/SKILL.md` 2436 bytes; "umbrella entry point" parent index). **CRITICAL DRIFT**: CLAUDE.md L52 W332-NOTE claims 7 child skills (`gitnexus-{guide,exploring,impact-analysis,debugging,refactoring,pr-review,cli}`) auto-fire. **They do not exist on disk** — only the parent index does. The 7 children are referenced in the parent SKILL.md table but are dangling.

**Why disabled** (git log):
- `b133bff chore(W286-arc-P1): gitnexus plugin-dup disable + local-skills inventory pointer` — disabled for plugin-duplication.
- `4e696d0 fix(W334-P1): gitnexus CR-9 removal + alirezarezvani NUANCED retire` — W334 reaffirmed retirement under CR-9 (LOWEST-RISK READ-ONLY).
- Pattern-only via `.claude/skills/local-cypher-codebase/` skill (fallback per W295 — pure-tool graph walks via serena symbol-find + Grep chains; no MCP needed).

**CLAUDE.md re-injection issue** (user-asked):
- CLAUDE.md L52 (trailing comment): `W332-NOTE: gitnexus analyze auto-injects a <!-- gitnexus:start --> block here. Deleted to restore ≤50 LOC pointer-only invariant.`
- W332 carry-forward task #516 tracks **suppression** of re-injection. The mechanism: `gitnexus analyze` CLI command writes a `<!-- gitnexus:start --> ... <!-- gitnexus:end -->` block into CLAUDE.md as auto-generated context, violating the ≤50 LOC pointer-only invariant.
- The W332 mitigation = **delete the block** post-injection (manual / hook-based). Permanent fix candidates per deepwiki structure §8.3 "Context Files (AGENTS.md and CLAUDE.md)":
  - **Native upstream-suppress flag** (`--no-claude-md` or similar) — verify via mcp__deepwiki__ask_question (TODO carry-forward, not done in this stream — MCP rate-limit budget).
  - **Use AGENTS.md instead** (gitnexus also writes there per §8.3) — keep CLAUDE.md pointer-only, route gitnexus injection to AGENTS.md.
  - **Block the gitnexus PostToolUse hook** if gitnexus is invoked via a hook — but plugin is disabled, so likely the issue arises only when manually run via CLI.

**7-skill orphan**: Per Stream A finding the 7 children "do exist" but my batch shows they don't. **Possible reconciliation**: Stream A may have referenced the parent SKILL.md's TABLE listing rather than filesystem reality. **Re-verify with a deeper probe before any action** (carry-forward).

**Recommendation**: **REPAIR-OR-DROP** the parent gitnexus skill. Two viable paths:
1. **Repair (RE-VENDOR)**: re-vendor the 7 child SKILL.md files from upstream `gitnexus-claude-plugin/skills/*` @ `98addbd6c4e7aff77b5c33242d08155afe94ed35` (the W324 cite). Re-enable plugin or keep pattern-only. **Effort**: 30 minutes + cite-anchor verification.
2. **Drop (DELETE)**: remove `.claude/skills/gitnexus/SKILL.md` since the child routes it advertises don't exist. The `local-cypher-codebase` skill already covers the underlying capability without MCP. **Effort**: 1 minute (`rm`).

**Recommended path: Drop** — gitnexus was retired per W334-P1 CR-9 removal; the orphan parent index misleads Claude into thinking gitnexus-* skills exist. Cleanest action is to drop the orphan + update CLAUDE.md L52 comment.

---

## §3 — alirezarezvani/claude-skills

**HEAD**: `8aa920812f05d5f8c97340775be39e1813885ee9` @ 2026-05-19T10:05:40Z. PR #701 merge: "Dev". **Actively maintained** (commit yesterday).

**Repo root inventory** (via mcp__github__get_file_contents path:/):
- 27 top-level category dirs: agents, assets, business-growth, business-operations, c-level-advisor, commands, commercial, compliance-os, custom-gpt, docs, documentation, engineering, engineering-team, eval-workspace, finance, marketing, marketing-skill, megaprompts, orchestration, product-team, productivity, project-management, ra-qm-team, research, scripts, standards, templates, tests.
- Standards docs (large, well-organized): AUDIT_REPORT.md (19052b), CHANGELOG.md (108717b — 108KB), CLAUDE.md (40256b), CONTRIBUTING.md, CONVENTIONS.md (9024b), GEMINI.md (2795b), INSTALLATION.md (26639b), SECURITY.md (7040b), SKILL-AUTHORING-STANDARD.md (14941b), SKILL_PIPELINE.md (14404b), STORE.md (4601b).
- Multi-IDE plugin manifests: `.claude-plugin/`, `.codex-plugin/`, `.claude/`, `.codex/`, `.gemini/`, `.hermes/`.
- LICENSE (1072b — almost certainly MIT given the file size).
- tessl.json (52b) — Tessl skill-pipeline metadata.

**W330 retire-verdict recap**: "per-skill trigger audit — `description:` phrase cardinality ≤8 distinct triggers; no overlap with sibling-skill triggers >50%; auto-fire cardinal rule explicitly stated. Same standard applied to alirezarezvani 313-skill bundle retire-verdict per W330 codex axis-2 §3.2."
- W334-P1 fixed-NUANCED retire: not blanket-reject, but selective.

**Sample 20 skills assessment** (NOT performed — would require 20 mcp__github__get_file_contents calls + per-skill triage). Carry-forward action: cherry-pick 5-10 high-value skills from `engineering/` + `orchestration/` + `research/` dirs in a follow-up wave.

**Re-assessment verdict — REAFFIRM-RETIRE with conditional cherry-pick window**:
- Bundle size (313 skills across 27 categories) is too large to enable wholesale per cardinal-rule-4 corollary (trigger overlap explosion + auto-fire chaos).
- HOWEVER the upstream-discipline is now exemplary: SKILL-AUTHORING-STANDARD.md (14KB), AUDIT_REPORT.md (19KB self-audit), SKILL_PIPELINE.md (14KB), 108KB CHANGELOG.md, CONVENTIONS.md (9KB). **The discipline itself is a SOTA pattern worth absorbing**.

**Recommendation**: **PATTERN-ONLY ADAPT** alirezarezvani's repo-level discipline (SKILL-AUTHORING-STANDARD, SKILL_PIPELINE, AUDIT_REPORT cadence). Do NOT install the 313-skill bundle. Cherry-pick 5-10 specific skills from `orchestration/` + `research/` only if a future operator-AI surfaces a use-case gap. **Re-verify cadence**: W345 (every 8 waves) to detect if upstream stabilises into installable plugin form.

---

## §4 — Pattern-only adapts (no install)

| Repo | Pattern | Adoption shape |
|---|---|---|
| planning-with-files | 3-file durable plan (`task_plan.md` + `findings.md` + `progress.md`) — file-based working memory across compaction boundaries | **ALREADY ADOPTED** as `durable-planning-files` skill (W308 codex r2 verdict) |
| GitNexus | Tiered call-resolution + Community Detection (Leiden) + Hybrid BM25+embedding search | Pattern-study via `local-cypher-codebase` skill (graph walks without MCP). Tree-sitter parsing pattern + entry-point scoring NOT yet adopted — candidate for future skill if codebase exploration grows |
| alirezarezvani | SKILL-AUTHORING-STANDARD + AUDIT_REPORT self-audit cadence + SKILL_PIPELINE for skill creation | **Strong candidate**: adopt the discipline to the `.claude/skills/` namespace (W337 P2 carry-forward) — write a `skill-authoring-standard.md` doc + monthly AUDIT_REPORT cadence (currently per-wave VERDICT-LEDGER serves similar role but lacks the trigger-quality audit cadence) |

---

## §5 — Top-3 actions

1. **DROP orphan gitnexus parent skill** + repair CLAUDE.md L52 comment.
   - One-line: `rm -rf Z:/claude-sota-installed/.claude/skills/gitnexus/ && sed -i 's|gitnexus-{guide,...|<gitnexus-retired W334-P1>|' Z:/claude-sota-installed/CLAUDE.md`
   - Alt-path (RE-VENDOR): re-vendor 7 child SKILL.md from upstream `gitnexus-claude-plugin/skills/* @ 98addbd6`. Skip unless gitnexus is being reintroduced.

2. **CONFIRM planning-with-files plugin is intentional re-enable post-W308**.
   - One-line: `git log --grep='planning-with-files' --oneline | head -5` to find the W334 re-enable commit and ratify in next codex review.
   - No-op if already documented.

3. **ABSORB alirezarezvani's authoring-standard + audit cadence** as P2 carry-forward.
   - One-line: `curl -L https://raw.githubusercontent.com/alirezarezvani/claude-skills/main/SKILL-AUTHORING-STANDARD.md > Z:/claude-sota-installed/docs/architecture/W337-FULL-SOTA-UNLEASHED/reference-SKILL-AUTHORING-STANDARD.md` (reference-only ingest, not vendored).

---

## Carry-forwards (next wave / Stream E follow-ups)

- **CF-E1**: Verify gitnexus 7-child-skill filesystem reality vs Stream A claim — single Glob `.claude/skills/gitnexus-*` and reconcile.
- **CF-E2**: Cherry-pick assessment of alirezarezvani `engineering/` + `orchestration/` + `research/` dirs (5-10 skills max) — requires 20-30 mcp__github__get_file_contents calls; defer to W338.
- **CF-E3**: Re-verify planning-with-files plugin manifest version vs upstream HEAD `d27008f`; ratify or pin.

---

**Out-of-scope spot** (one sentence): Stream A noted 7 gitnexus child skills exist; my direct ctx_batch_execute probe found only 1 (`gitnexus/`). **Reconciliation needed in parent synthesis** — Stream A may have referenced the parent SKILL.md's TABLE rather than `fs.readdirSync` reality.
