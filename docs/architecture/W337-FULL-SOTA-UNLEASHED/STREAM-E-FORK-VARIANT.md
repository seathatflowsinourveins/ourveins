# Stream E — planning-with-files + GitNexus + alirezarezvani Audit (W337)

> Fork-authored 2026-05-20 per W337 SOTA-unleashed deep audit. Inherits parent CLAUDE.md + W308/W330/W332 prior verdicts.

## §1 OthmanAdi/planning-with-files

- **HEAD**: `d27008f3` @ 2026-05-16T08:27Z — `fix: v2.38.1 swap plan-injection delimiter from --- to === to avoid YAML doc-separator collision` (Discussion #153 / @bmyury surfaced).
- **Upstream platform support** (DeepWiki §9): Claude Code, Cursor, Continue, Codex, CodeBuddy, Factory, Kiro, Mastra, GitHub Copilot, Gemini CLI, Pi, Hermes — 14 SKILL.md variants in this single release.
- **Commands shipped**: `/planning-with-files:plan` (alias `/plan`), `/plan:status`, `/planning`. Helper scripts: `init-session.sh`, `set-active-plan.sh`, `resolve-plan-dir.sh`, `check-complete.sh`, `session-catchup.py`, `attest-plan.sh`.
- **Local runtime state**:
  - Plugin cache present at `Z:/claude-sota-installed/.claude/plugins/cache/planning-with-files/` (per parent ctx_batch_execute §plugin_cache_dirs).
  - Skill `durable-planning-files` SKILL.md cites W308 codex-r2 REJECTED-plugin / KEEP-PATTERN verdict (file:line `durable-planning-files/SKILL.md:8-14`).
  - The local skill replicates the 3-file pattern (task_plan.md / findings.md / progress.md) WITHOUT plugin dependency.
- **Drift assessment**: v2.38.1 is cosmetic (YAML delimiter `---` → `===`). The runtime doesn't execute the upstream hooks, so the YAML-collision bug never affected us. NO material drift.
- **Recommendation**: **KEEP-AS-IS**. The pattern is captured; the plugin remains REJECTED per W308 (license ambiguity + duplication vs TodoWrite + benchmark-non-applicable-after-hook-drop). Re-litigate at W345 (10-wave normal cadence) only if upstream ships a feature that durable-planning-files doesn't cover.

## §2 abhigyanpatwari/GitNexus

- **HEAD**: `df1882d3` @ 2026-05-20T13:37Z (yesterday) — `fix(ingestion): surface skipped large-file paths by default (#1659)`. Active dev, sub-24h commit.
- **Repo scope**: dual-mode (CLI + Web UI) + MCP server; LadybugDB schema; Tree-sitter parsing; Leiden community detection; entry-point scoring; framework detection — substantial engineering surface (DeepWiki §2-10).
- **CRITICAL FINDING — CLAUDE.md L52 cite drift**: CLAUDE.md says "Suppression of re-injection (e.g., gitnexus `--no-claude-md` flag or config) tracked as W332 carry-forward task #516". **There is NO `--no-claude-md` flag.** The actual flag is **`--skip-agents-md`** (DeepWiki §2 + ai-context.ts `AIContextOptions.skipAgentsMd`); it suppresses BOTH CLAUDE.md and AGENTS.md injection. Auxiliary: `--skip-skills` (independent skill-table opt-out), `gitnexus:keep` marker (preserve manual edits).
- **Injection mechanism** (DeepWiki §8.3): `generateAIContextFiles` → `generateGitNexusContent` → `upsertGitNexusSection` writes between `<!-- gitnexus:start -->` / `<!-- gitnexus:end -->` markers. Manual edits OUTSIDE the managed block are preserved. So the runtime's pointer-only ≤50-LOC invariant would survive IF the gitnexus block were excluded from the count.
- **BUT**: the gitnexus CLI is NOT installed in this runtime (no binary in `tools/`; no entry in PATH; no `.gitnexus/` data dir present per fork-time fs probe). The 7 local skills at `.claude/skills/gitnexus-*/` are documentation-only and do not invoke the CLI.
- **W332 carry-forward task #516 verdict**: **STALE / RESOLVED-AS-NON-ISSUE**. There is nothing to suppress because nothing is injecting. The carry-forward should be closed and CLAUDE.md L52 last sentence retired.
- **Recommendation**: **KEEP-AS-IS pattern-only**; close W332 task #516; correct CLAUDE.md L52 cite (`--no-claude-md` → `--skip-agents-md`); document the `<!-- xxx:start --> / <!-- xxx:end -->` marker pattern as a reusable adoption for any future auto-injection system the runtime may build.

## §3 alirezarezvani/claude-skills

- **HEAD**: `8aa92081` @ 2026-05-19T10:05Z (PR #701 dev→main merge, yesterday) — active maintenance.
- **MAJOR COUNT-DRIFT FINDING**: CLAUDE.md current verdict block (and W330 codex axis-2 §3.2 retire-verdict) describes this as a **"313-skill bundle"**. Per DeepWiki §1.1 + maintainer refactoring plan, the actual count is **48 production-ready skills** (5 marketing + 2 C-level + 5 product + 6 PM + 13 engineering + 5 AI/ML + 12 regulatory). The 313 number is likely confusing total artifacts (skills + agents + standards + commands + tools) with skill-count; needs correction.
- **Quality state — maintainers' OWN self-assessment** (DeepWiki ask_question response):
  - SKILL.md files: 200-1000 lines (target 50-200) — **failing Anthropic skill-size guideline**.
  - **0/36 skills have keywords sections** required for trigger discovery.
  - Scope overlap explicit: `product-manager-toolkit` (352 lines) covers RICE + interviews + PRDs + discovery + metrics in one skill — violates "one skill = one capability".
  - Active 4-week refactoring plan: 50-70% size reduction, add metadata, add keywords sections.
  - Best-in-class pilots — `content-creator`, `product-manager-toolkit`, `senior-fullstack` — selected for OPTIMIZATION (not exemplars of current quality).
- **Cardinal-rule-4 corollary re-assessment** (≤8 distinct triggers, ≤50% overlap, explicit auto-fire rule): maintainer-confirmed FAIL on the 36-skill sample. Re-litigation cannot reverse until refactoring lands.
- **Verdict**: **REAFFIRM RETIRE**. Even the maintainers agree current quality bar is unmet. Wait 4 weeks for refactoring window to close; re-litigate **W341** (4-wave horizon ≈ matching refactoring timeline).
- **Cherry-pick candidate**: NONE at current quality. If urgently needed, the three pilot skills (content-creator, product-manager-toolkit, senior-fullstack) are candidates AFTER they complete the planned scope-refactor, not before.

## §4 Pattern-only adopt

| Repo | Pattern | Status |
|---|---|---|
| planning-with-files | 3-file durable plan (task_plan.md + findings.md + progress.md) | ✓ ALREADY ADOPTED (durable-planning-files skill) |
| planning-with-files | `/plan-attest` SHA-256 attestation for plan tamper-detection | Pattern-of-interest for W338+ if attestation needed for cross-session predicates |
| GitNexus | `<!-- gitnexus:start --> / <!-- gitnexus:end -->` marker block for auto-injection that survives manual edits | Reusable pattern; document for future auto-inject systems |
| GitNexus | RFC 2119 (MUST / NEVER / ALWAYS) imperative-language convention in injected context | Already present in CLAUDE.md cardinal rules; reaffirmation |
| alirezarezvani | Marketplace dispatch + 6-domain taxonomy | Worth referencing if runtime builds a domain-organized skill index |

## §5 Per-repo recommendations

1. **planning-with-files**: KEEP-AS-IS (pattern extracted; W345 re-litigate cadence).
2. **GitNexus**: KEEP pattern-only; close W332 task #516; fix CLAUDE.md L52 cite to `--skip-agents-md`.
3. **alirezarezvani**: REAFFIRM RETIRE; W341 re-litigate window matches maintainers' 4-week refactoring plan.

## Top-3 actions for W337 ship

1. **Close W332 carry-forward task #516** — gitnexus CLI not installed; injection is not occurring; nothing to suppress. Mark resolved-as-non-issue with one-line cite in W337 verdict ledger.
2. **Patch CLAUDE.md L52** — correct `--no-claude-md` → `--skip-agents-md` (factual citation drift per DeepWiki §8.3). Single-line edit; preserves pointer-only ≤50-LOC invariant.
3. **Patch CLAUDE.md alirezarezvani retire-verdict block** — change "313-skill bundle" → "48-skill bundle"; add line "maintainer-confirmed quality refactoring in progress, W341 re-litigation per 4-week timeline".

## Source cites

- OthmanAdi/planning-with-files@d27008f3 (commit message in tool result `toolu_01WU89PWnnChrQmpx1bhwYv1.json`)
- abhigyanpatwari/GitNexus@df1882d3 (commit message in tool result `toolu_01EC68dLkEpUxeFxx442agNG.json`)
- alirezarezvani/claude-skills@8aa92081 (commit message in tool result `toolu_01VygGqgFkEJuy3bGb3pNVZ1.json`)
- DeepWiki structures + ask_question responses (3 calls, included in fork transcript)
- Local: `Z:/claude-sota-installed/.claude/skills/durable-planning-files/SKILL.md:8-14` (W308 cite block)
- CLAUDE.md L52 (the to-be-corrected line)
