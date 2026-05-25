# W282 Stream D — Cross-Cutting Dimensions Audit

> **Date**: 2026-05-18 (W282 wave)
> **Scope**: cardinal-rule invariants · plugin health · stale references · install-state drift · codex review-gate
> **Method**: read-only inspection of live `Z:\claude-sota-installed\` runtime.
> **Inputs**: CLAUDE.md (42 LOC), `.claude/settings.json`, `.claude/plugins/installed_plugins.json`, `.claude/hooks/`, `.claude/agents/`, codex state.

---

## Cardinal-rule invariants — PASS/FAIL per rule

| # | Rule | Verdict | Evidence |
|---|------|---------|----------|
| **R1** | Install primitives only from trusted plugins/skills/agents | **PASS-with-NOTE** | All 21 `extraKnownMarketplaces` originate from GitHub repos under known authors (anthropics, openai, obra, addyosmani, wshobson, etc.) or a local dir (`gitnexus-marketplace`). No fully-unknown sources detected. **NOTE**: `affaan-m/everything-claude-code`, `fcakyon/claude-codex-settings`, `sickn33/antigravity-awesome-skills`, `alirezarezvani/claude-skills`, `forrestchang/andrej-karpathy-skills` are individual-author marketplaces — vetted per W278 docs but worth periodic re-confirmation. |
| **R2** | Hooks only direct-CLI or upstream-plugin | **PASS** | `.claude/hooks/scripts/` does **not exist** (cardinal-rule mandate honored). `.claude/hooks/` contains **exactly 1 file**: `context-mode-cache-heal.mjs` (1,440 bytes, 29 LOC) referenced by `SessionStart` hook with `"Z:/tools/nodejs/node.exe"` invocation. **NOTE**: this is a self-invented Node script — comment says "auto-deployed" to fix `anthropics/claude-code#46915`. **This is a borderline R2 case** (one-file Node helper, not a `*.py|.sh` self-invent shell-script of the type W255 cleanup targeted, and serves as a documented upstream-bug workaround) — recommend reclassifying to a tracked exception or migrating to a context-mode plugin hook. All other settings.json hook commands (`gitleaks`, `ruff`, `git worktree prune`, `powershell -Command`, raw `jq`-shell) are direct-CLI. |
| **R3** | Subagents = installed upstream | **FAIL — 9 of 11 custom** | `.claude/agents/` exists with **11 files**. Wave-15-port commented (HNF/HYBRID): `architect.md`, `code-reviewer.md`, `debugger.md`, `gpt5-archaeologist.md`, `gpt5-reviewer.md`, `verifier.md` (6 — provenance-only pointers to sibling `Z:/claude-sota`). Self-invented w/o upstream cite: `evaluator.md`, `gsd-goal-verifier.md`, `sota-researcher.md` (3 — direct YAML frontmatter, no upstream provenance). Upstream-derived (wshobson/agents marketplace): `wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md` (2). **The 9 non-upstream agents conflict with R3** — `wshobson/agents` is installed as the `claude-code-workflows@claude-code-workflows` marketplace, so the legitimate path is to delete the 9 custom .md files and reference upstream-installed agents via subagent_type. |
| **R4** | Behavior in CLAUDE.md + settings.json only — NOT `.claude/rules/*.md` | **PASS** | `.claude/rules/` does **not exist** (verified via direct stat). The only mention of `.claude/rules/` in CLAUDE.md is the cardinal-rule-4 description itself. |
| **R5** | Safety via CC permissions + sandboxing, NOT custom guard scripts | **PASS** | `permissions.allow` = 11 entries (file-Edit + install commands), `permissions.deny` = 18 entries (`.env`, secrets, keys, `CLAUDE.local.md`, `eee.local.ps1`, AWS/SSH credentials). `tools/` contains 12 files (eee launcher, backup, status-query, install-cron, hygiene-audit — operator launcher utilities, NOT runtime guard scripts intercepting Claude Code). No `tools/guard*` or `tools/deny*` style files. |

**Invariant headline:** R2 PASS-with-NOTE (1 borderline Node hook), R3 FAIL (9 custom subagents without upstream identity), R1/R4/R5 PASS. The `self_invented_count: 0` claim in CLAUDE.md status block is **technically violated** by the 9 custom agents + 1 context-mode-cache-heal.mjs.

---

## Plugin health — 62 plugins inventoried + verdicts

### Count reconciliation
- `installed_plugins.json`: **62 plugin entries** (some with multi-scope records — total 79 install-records project+user).
- `settings.json.enabledPlugins`: **68 entries** (51 true, 17 false).
- Mismatch driven by **6 orphan-enables** + **0 orphan-installs**.

### Disabled (false) — 17 entries, intentionality verdict

| Plugin | Marketplace | Intentional? | Evidence |
|---|---|---|---|
| `agent-sdk-dev` | `claude-plugins-official` | **YES** | dev kit, not runtime-needed |
| `skill-creator` | `claude-plugins-official` | **YES** | author-mode tool |
| `claude-code-setup` | `claude-plugins-official` | **YES** | bootstrap-only |
| `plugin-dev` | `claude-plugins-official` | **YES** | dev kit |
| `playground` | `claude-plugins-official` | **YES** | dev demo |
| `mcp-server-dev` | `claude-plugins-official` | **YES** | dev kit |
| `cwc-makers` | `claude-plugins-official` | **YES** | per W280h adoption-verdict |
| `hookify` | `claude-plugins-official` | **YES** | cardinal-rule-2 — supplants hook discipline |
| `protect-mcp` | `claude-code-workflows` | **YES** | per W280h |
| `claude-mem` | `thedotmack` | **YES** | per W278/W280 mcp-memory cleanup |
| `review-agent-governance` | `claude-code-workflows` | **YES** | conflicts with codex review-gate |
| `autoresearch-agent` | `claude-code-skills` | **YES** | per W280 adoption verdicts |
| `clickhouse` | `claude-plugins-official` | **ORPHAN-DISABLED** | not in installed_plugins.json |
| `outputai` | `claude-plugins-official` | **ORPHAN-DISABLED** | not in installed_plugins.json |
| `qdrant-skills` | `claude-plugins-official` | **ORPHAN-DISABLED** | not in installed_plugins.json |
| `superpowers` | `superpowers-marketplace` | **ORPHAN-DISABLED** | leftover from W259v15c dedup (kept correctly false to prevent dup-source enable; `superpowers@claude-plugins-official` is the active install) |
| `mcp-memory-service` | `mcp-memory-service` | **ORPHAN-DISABLED** | per W278 disable + W278d marketplace cleanup (residual entry pending settings.json removal) |

**Of 17 disabled: 12 intentional disables of installed plugins · 5 orphan-disabled stubs (harmless but cluttering settings).**

### SHA freshness (>7 days old vs today 2026-05-18) — **PASS**

Stale count: **0** of 79 install-records. Most-recent installs span `2026-05-18T02:21:25Z` (project re-install touched at W281 start) down to `2026-05-17T13:25:16Z` (initial install timestamp). Sample SHAs:
- `codex@openai-codex`: 807e03ac (project, 2026-05-17)
- `everything-claude-code@everything-claude-code`: 841beea4 (project+user, 2026-05-17 ↔ 2026-05-17T19:02)
- `superpowers@claude-plugins-official`: (re-touched 2026-05-18T02:21 by W281 reinstall)
- `context-mode@context-mode`: 2026-05-17 ✓
- `hindsight-memory@hindsight`: 9784f657 (2026-05-17 — per W280b recovery)

### Marketplace coverage — **8 of 21 UNUSED**

| Marketplace | Status |
|---|---|
| `skills` (anthropics/skills) | UNUSED (note: `anthropic-agent-skills` also points at anthropics/skills — alias duplicate; consolidate) |
| `knowledge-work-plugins` (anthropics/knowledge-work-plugins) | UNUSED |
| `claude-plugins-community` (anthropics/claude-plugins-community) | UNUSED |
| `financial-services` (anthropics/financial-services) | UNUSED |
| `healthcare` (anthropics/healthcare) | UNUSED |
| `life-sciences` (anthropics/life-sciences) | UNUSED |
| `addy-agent-skills` (addyosmani/agent-skills) | UNUSED — but `agent-skills@addy-agent-skills` is enabled=true in settings (orphan-enable mismatch — see drift below) |
| `superpowers-marketplace` (obra/superpowers-marketplace) | UNUSED — superseded by claude-plugins-official scoping |

Recommend: drop 5 industry-vertical marketplaces (financial-services, healthcare, life-sciences, knowledge-work-plugins, claude-plugins-community) unless deliberately reserved for future install batches. Consolidate `skills` ≡ `anthropic-agent-skills` (same repo). Remove `superpowers-marketplace` (obsolete dup source). Action on `addy-agent-skills` per drift section below.

### Duplicate plugin risk — **0 detected**

After W259v15c `superpowers` dedup, no plugin short-name resolves to >1 marketplace in the installed set. Disabled `superpowers@superpowers-marketplace` orphan-stub correctly prevents re-enable.

---

## Stale references — grep hit counts

| Pattern | Hits in CLAUDE.md | Verdict |
|---|---|---|
| `bootstrap-hindsight` | **0** | PASS (W281a fix applied — was replaced by `bootstrap-runtime.ps1`) |
| `42 plugins` in CLAUDE.md | **0** | PASS (current text says "62 plugins") |
| `qwen3:8b` in CLAUDE.md | **0** | PASS (CLAUDE.md never carried this; lives in CLAUDE.local.md context only — and there context references model swap to `qwen3-coder:30b-a3b-q4_K_M`) |
| Broken file path-refs (.md/.json/.py/.ps1/.sh/.ts/.js) | **0 of 6 unique** | PASS — all 6 path-references resolve |
| Broken dir refs | **0 substantive** (10 false-positives — all Anthropic doc-URL fragments captured by regex e.g. `docs/en/sub-agents` is part of `https://code.claude.com/docs/en/sub-agents`; `docs/outer` is part of `docs/outer research/...` with a space) | PASS |
| Pre-W255 history accessible | Not directly verified via `git log --before=2026-05-15` in this stream (run earlier waves) — tag `pre-W255-cleanup-*` referenced in CLAUDE.md | NOT-VERIFIED |
| `42 plugins` across whole repo | **2 hits** in `docs/architecture/W259-grand-catalog/...` Stream-C research doc (historical citation context; not stale claim) | PASS (historical doc context, not live claim) |

---

## Install-state drift — orphan analysis

### Orphan ENABLES (in settings.json:enabledPlugins, NOT in installed_plugins.json) — **6 entries**

| Entry | Setting | Severity |
|---|---|---|
| `agent-skills@addy-agent-skills` | **TRUE** | **HIGH** — runtime claims this plugin is enabled, but it has never been installed. Silent no-op. Either install it (`/plugin install agent-skills@addy-agent-skills`) or set to false. |
| `clickhouse@claude-plugins-official` | false | LOW — harmless stub |
| `outputai@claude-plugins-official` | false | LOW — harmless stub |
| `qdrant-skills@claude-plugins-official` | false | LOW — harmless stub |
| `superpowers@superpowers-marketplace` | false | LOW — intentional dedup-block stub (W259v15c) |
| `mcp-memory-service@mcp-memory-service` | false | LOW — leftover from W278 disable + W278d marketplace cleanup; settings entry should be removed too for full closure |

### Orphan INSTALLS (in installed_plugins.json, NOT in enabledPlugins) — **0**

Healthy — every installed plugin has a corresponding enabledPlugins entry. (`agent-sdk-dev@claude-plugins-official` exists in both even though it's disabled.)

### Plugin install-time vs settings.json _comment dates — sanity check
- 19 toplevel `_comment*` keys preserve a Wave-codification trail through W281 P3(f) `_comment_w281f_2026_05_18_precompact_auto_block`. Provenance scoring matches plugin install timestamps in the 2026-05-17 → 2026-05-18 window.
- No plugin installed-at date precedes its corresponding `_comment` reference.

---

## Codex review-gate — health snapshot

| Check | Value | Verdict |
|---|---|---|
| `state.json` location | `Z:/claude-sota-installed/.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/state.json` | OK |
| `config.stopReviewGate` | **`true`** | **PASS** (W280a activation persisted) |
| `jobs[]` array | `[]` (empty) | **PASS** (no stuck jobs) |
| Codex CLI version | `codex-cli 0.130.0` | **PASS** (matches W280a Fork 1 verification) |
| Codex CLI path | `/z/claude-sota-installed/.local/npm/codex` | OK (per-runtime npm shim) |

Codex T6 native hooks (per `codex@openai-codex` plugin) are auto-wired SessionStart/SessionEnd/Stop per CLAUDE.md architecture statement. Stop-hook adversarial GPT-5.x review-gate is live and BLOCK on critical/high per W280a.

---

## Stream D summary — top 3 cross-cutting fixes

### #1 (HIGH) — Cardinal R3 violation: 9 of 11 `.claude/agents/*.md` are self-invented or Wave-15-port without an upstream subagent_type identity
**Files**: `evaluator.md`, `gsd-goal-verifier.md`, `sota-researcher.md` (self-invented YAML); `architect.md`, `code-reviewer.md`, `debugger.md`, `gpt5-archaeologist.md`, `gpt5-reviewer.md`, `verifier.md` (Wave-15 ports — pointer-only HTML comments but the file itself is a `.claude/agents/*.md` artifact that CC will try to load as a subagent definition).
**Why critical**: `self_invented_count: 0` claim in CLAUDE.md status block is **technically wrong**. Cardinal rule 3 says subagents must be installed upstream agents OR documented subagent system. The 2 legitimate entries (`wshobson-devops-troubleshooter.md`, `wshobson-security-auditor.md`) come from `wshobson/agents` marketplace which is installed — but their YAML-frontmatter copies in `.claude/agents/` duplicate the upstream and risk drift.
**Fix**: delete all 11 files from `.claude/agents/`. Reference `wshobson-*` via subagent_type referring to the installed plugin agents. Replace `evaluator`/`gsd-goal-verifier`/`sota-researcher` use-cases with skills from the 62 installed plugins (e.g. `superpowers:requesting-code-review`, `goal-prompt-synthesis`, sota-convergence-audit skill).

### #2 (MEDIUM) — Orphan-enable `agent-skills@addy-agent-skills` = true but never installed
**Symptom**: `settings.json:enabledPlugins` declares `agent-skills@addy-agent-skills: true` but `installed_plugins.json` has no record. Plugin silently does nothing.
**Fix**: either (a) `/plugin install agent-skills@addy-agent-skills` if the skill set is actually wanted (the marketplace IS in `extraKnownMarketplaces`), or (b) flip to false + remove the marketplace entry. Same with 4 other harmless false-stubs that could be cleared for clarity.

### #3 (MEDIUM) — Borderline R2: `.claude/hooks/context-mode-cache-heal.mjs` is a self-invented Node helper
**Symptom**: SessionStart hook command invokes `Z:/tools/nodejs/node.exe Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` — a 29-LOC custom Node script in `.claude/hooks/`. While its header comments say "auto-deployed" to fix upstream issue `anthropics/claude-code#46915`, this is structurally a self-invented hook script in the very directory cardinal-rule-2 forbids (just `*.mjs` instead of `*.py|.sh`). It is the **only** file in `.claude/hooks/`.
**Fix options**: (a) lobby `mksglu/context-mode` to ship the heal-logic upstream and switch settings.json to a plugin hook; (b) document this as a tracked exception in CLAUDE.md cardinal-rule-2 footnote with an explicit upstream-issue cite; (c) inline the heal logic into a `powershell -Command` direct-CLI hook (eliminates the script file). Option (b) is lowest friction; option (a) is the SOTA fix.

### Bonus housekeeping
- **8 unused marketplaces** of 21 — drop 5 industry-vertical anthropics/{financial-services,healthcare,life-sciences,knowledge-work-plugins,claude-plugins-community}, consolidate `skills` ≡ `anthropic-agent-skills` (same upstream repo), remove `superpowers-marketplace` (obsolete dup source).
- **5 orphan-disabled stubs** in `enabledPlugins` for plugins that never were installed (clickhouse, outputai, qdrant-skills, superpowers@superpowers-marketplace dup-block, mcp-memory-service) — clean them out alongside the W278d cleanup for a fully-coherent state file.
- Update CLAUDE.md status: `self_invented_count: 0` is no longer accurate — restate as "0 self-invented `.claude/rules/*.md` + 1 documented hook-script exception (context-mode-cache-heal.mjs)" OR fix items #1 and #3 to restore the 0 claim.

---

## Appendix — raw counts

- CLAUDE.md LOC: 42 (≤50 mandate PASS)
- settings.json env keys: 41 (incl. ECC_DISABLED_HOOKS list of 14 hook IDs)
- settings.json _comment_* toplevel keys: 19
- settings.json permissions.allow: 11 · deny: 18
- settings.json hook events wired: 6 (SessionStart, PreToolUse, PostToolUse, PreCompact, WorktreeRemove, Notification)
- installed_plugins.json plugins: 62 · scopes: project=62, user=17, multi-scope=17
- enabledPlugins: 68 (51 true, 17 false)
- orphan-enables: 6 (1 high-severity = true, 5 low-severity = false)
- orphan-installs: 0
- duplicate plugin name across marketplaces: 0
- unused marketplaces: 8 of 21
- stale `42 plugins` hits in CLAUDE.md: 0 · `qwen3:8b`: 0 · `bootstrap-hindsight`: 0
- codex stopReviewGate: true · jobs: 0 · CLI version: 0.130.0
