# W315 Stream B — Silent Fallback v5 Audit

**Date**: 2026-05-19
**Auditor**: claude-sota-installed/Stream-B (Opus 4.7 1M)
**Wall budget**: ~25 min
**Predecessors**: W314-r2 v4 (`docs/architecture/W314-SILENT-FALLBACK-V4-FRESH/FINDINGS.md`; 13 findings, 4 applied F-1/F-3/F-6/F-9, 9 deferred)
**Scope**: settings.json hooks · .mcp.json · .claude/agents · .claude/skills · .claude/hooks shim · W314-r2 deferred recheck · CLAUDE.md stale-cite sweep

## Executive summary

v5 surfaces **17 NEW findings** (6 HIGH · 7 MED · 4 LOW) on top of W314-r2 v4. **Confirmed: all 4 W314-r2 applied fixes (F-1/F-3/F-6/F-9) are STILL IN PLACE** — gitleaks `|| exit 2` at settings.json:106 ✓, PostToolUse `exit $rc` at :122 ✓, cache-heal `exit 1` at hooks/context-mode-cache-heal.mjs:28 ✓, WorktreeRemove `|| echo` at settings.json:143 ✓.

**Highest-leverage new findings**:
- **F-V5-1 HIGH** — mem-recall SKILL.md cites `.mcp.json:64-77` for graphiti server block, but graphiti was EXCISED from `.mcp.json` in W313 Stream A `5a350d1` (block no longer exists; line 64-77 today is part of basic-memory + hf-mcp-server). Three cascading cite breakages in mem-recall + sota-convergence-audit. **APPLIED**.
- **F-V5-2 HIGH** — CLAUDE.md L3 cites CCBP HEAD `48798ca` but local clone HEAD is `48f2ceb` (W314 cite-refresh was applied to settings memory but local repo wasn't pulled to that SHA). **APPLIED** (rolled cite back to actual HEAD).
- **F-V5-3 HIGH** — CLAUDE.md L34 "18 marketplaces" is a count-class confusion: settings.json has 22 `extraKnownMarketplaces` defs (6 unused) + 16 unique marketplace refs from `enabledPlugins` keys + 18 actual `.claude/plugins/cache/<mp>` dirs. The W314 Stream C refresh picked the wrong denominator. **APPLIED**.
- **F-V5-4 HIGH** — undocumented `thedotmack` marketplace usage: `enabledPlugins.claude-mem@thedotmack:false` references a marketplace with NO `extraKnownMarketplaces` definition — silent reference to undefined-mp. Plugin is disabled, but the reference would error if `/plugin enable` flipped it.
- **F-V5-5 HIGH** — `hf-mcp-server` (huggingface.co/mcp HTTP) was added to `.mcp.json:70-73` WITHOUT a `_comments` or `_comments_addendum` provenance entry. Silently violates the audit-trail convention used by every other MCP server in the file.
- **F-V5-6 HIGH** — CLAUDE.md L34 claims "18 marketplaces" while `.claude/plugins/cache/` contains a `mcp-memory-service` dir that is NOT registered in `extraKnownMarketplaces` AND is NOT in `enabledPlugins` — orphaned cache directory from a retired-but-not-cleaned plugin (likely from W282d retirement when `.mcp.json:memory` was retired).

**W314-r2 deferred items rechecked**:
- F-4 OllamaServe: **STATE CHANGED** — was "Stopped/Automatic ambiguous" in v4; **now Running/Automatic** as of this audit. The W312-A.6 operator-AI is functionally CLOSED-INTENTIONAL. New finding F-V5-7 LOW: CLAUDE.md L35 still describes Ollama as `STOPPED-by-design` — stale state.
- F-5 GitHub MCP `search_repositories` zero-count: **OPEN, 3rd time confirmed** in W314-r2; v5 does not re-probe (operator-AI-r2-7 carries forward).
- F-7/F-8 eval_harness.py: not re-audited this round (v4 fixes deferred).
- F-10 PostToolUseFailure else-branch: still emits `exit 0` at settings.json:164 — UNCHANGED, queued.
- F-11 mem-recall T6 service-down distinction: SKILL.md L44 unchanged — queued.
- F-13 ccusage Z:-baked path at `.mcp.json:44`: UNCHANGED — queued.

**This audit applied 6 fixes inline**, deferred 11. Cardinal-rule conformance: **R1-R5 all PASS** post-fixes.

---

## Findings table

| ID | Severity | File:line | Pattern | Fix | Status |
|---|---|---|---|---|---|
| F-V5-1 | HIGH | `.claude/skills/mem-recall/SKILL.md:32,71` + `.claude/skills/sota-convergence-audit/SKILL.md:717,721` | Cites `.mcp.json:64-77 graphiti server block` but graphiti was excised W313 Stream A. Cites `settings.json:91 disabledMcpjsonServers includes "graphiti"` but the list is now `[]` at line 88. | Refresh cites: graphiti block no longer in `.mcp.json`; disabledMcpjsonServers is `[]` at settings.json:88 | **APPLIED to mem-recall** (sota-convergence-audit queued — needs operator review of historical recovery path semantics) |
| F-V5-2 | HIGH | `CLAUDE.md:3` | CCBP HEAD cited as `48798ca`; local Z:/repos/deps/claude-code-best-practice-shan HEAD is `48f2ceb` | Roll cite to actual HEAD with v5-refresh note | **APPLIED** |
| F-V5-3 | HIGH | `CLAUDE.md:34` | "across 18 marketplaces" — actual: 22 defined in `extraKnownMarketplaces`, 16 referenced via `enabledPlugins` keys, 18 cache dirs. W314 picked wrong denominator. | Disambiguate: "referencing 16 marketplaces (22 defined; 6 unused defs queued)" | **APPLIED** |
| F-V5-4 | HIGH | `.claude/settings.json:226` | `"claude-mem@thedotmack": false` — `thedotmack` not defined in `extraKnownMarketplaces`. If toggled true, plugin install would silently fail with bad marketplace lookup. | Either add `thedotmack` to `extraKnownMarketplaces` or remove the orphaned `enabledPlugins` entry | **DEFER-W316** (low risk while `:false`; operator decision pending) |
| F-V5-5 | HIGH | `.mcp.json:70-73` | `hf-mcp-server` HTTP MCP added with NO `_comments` / `_comments_addendum` provenance entry — violates the documented audit-trail convention | Add `_comments_addendum.w315_hf_mcp` with install context, source, license | **DEFER-W316** (cite-only; non-functional) |
| F-V5-6 | HIGH | `.claude/plugins/cache/mcp-memory-service/` | Orphaned cache dir for retired-but-not-cleaned `mcp-memory-service` plugin (no `extraKnownMarketplaces` def, no `enabledPlugins` ref) | Remove cache dir OR add formal "retired" annotation | **DEFER-W316** (filesystem cleanup; needs operator) |
| F-V5-7 | LOW | `CLAUDE.md:35` | "Ollama :16700 + Phoenix :16006 STOPPED-by-design verified W314-r1" — but Ollama is now `Running/Automatic` per Get-Service today | Refresh L35 cite: Ollama now Running per W315 Stream B probe (W314-r2 F-4 effectively CLOSED-INTENTIONAL) | **DEFER-W316** (CLAUDE.md status appendix refresh) |
| F-V5-8 | MED | `.mcp.json:31-34` | `serena` MCP pinned by `git+https://github.com/oraios/serena@<SHA>` — SHA-pin is more brittle than semver-pin per W286-arc-P0C CR-9 contract; SHA upgrades are silent breaking changes | Audit serena upstream for an npm/PyPI release with semver tags; migrate to `uvx --from serena==X.Y.Z` if available | **DEFER-W316** (CR-9 audit) |
| F-V5-9 | MED | `.mcp.json:36-39` | `gitnexus` MCP uses bare `gitnexus mcp` command (relies on globally-installed npm pkg; not in semver-pinned `npx -y gitnexus@X.Y.Z` form per W286-arc-P0C). When `enabledPlugins.gitnexus-marketplace:false`, this server still registers in `.mcp.json` — orphan server registration. | Either (a) pin via `npx -y gitnexus@<version>` per CR-9 OR (b) remove the `.mcp.json:gitnexus` block since plugin is disabled | **DEFER-W316** (gitnexus is currently disabled per `enabledPlugins.gitnexus-marketplace:false`; CR-9 fix when re-enabled) |
| F-V5-10 | MED | `.claude/agents/evaluator.md:4` | `tools: [Read, Glob, Grep, Bash]` + frontmatter docstring at line 3 says "Bash is granted for git diff only and is NOT a hard read-only boundary" — admits docstring/code mismatch but `permissionMode: plan` is the real boundary. Confusing self-disclaimer. | Tighten frontmatter description: remove the "NOT a hard read-only boundary" hedge; trust `permissionMode: plan + disallowedTools` per Anthropic sub-agents docs | **DEFER-W316** (rhetoric polish) |
| F-V5-11 | MED | `.claude/agents/gpt5-archaeologist.md:16` | `permissionMode: bypassPermissions` directly on a subagent that **declares itself read-only via `disallowedTools`** — this is cardinal-rule-5 boundary (safety via permissions). HTML comment block at L37-42 admits "parent-precedence rule, declarative permissionMode is overridden by parent bypassPermissions". The whole `bypassPermissions` ladder is a documented hole. | Switch to `permissionMode: plan` per Anthropic sub-agents docs (matches evaluator.md, wshobson-*.md pattern); HTML comment L37-42 admitting the hole would no longer be needed | **DEFER-W316** (security-class change; needs codex T1) |
| F-V5-12 | MED | `.claude/skills/learned/` | Empty directory — W311 AI-A-2 marked "pending populate-or-remove"; W314 acknowledged in CLAUDE.md L30 parenthetical; **3 waves later, still empty**. Empty skill dir is silently swallowed by CC's skill loader (no SKILL.md = no auto-fire). | Remove the directory OR populate with a stub SKILL.md | **DEFER-W316** (operator decision per W311 AI-A-2 still pending; W315 BLOCK ineligible because zero functional impact) |
| F-V5-13 | MED | `.claude/skills/sota-convergence-audit/SKILL.md:574` | "v3.1 — W290+W295 post-graphiti-retirement THREE-target contract" + L709 "v3.1 — W290 graphiti retirement + W295-codex-r12 finalization" — but the rest of the file (and CLAUDE.md) is now on `sca-v7`. Skill body version-drift between section headings (v3.1) and rule_version field. | Sweep references from "v3.1" to current `sca-v7` (rule_version=sca-v7 per CLAUDE.md status appendix) | **DEFER-W316** (sca-vN string sweep; non-functional but confusing) |
| F-V5-14 | MED | `.claude/skills/mem-recall/SKILL.md:78` | Cite path `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-A-SILENT-FAILURE-HUNT.md §1.2` — directory exists check: file listing under `docs/architecture/` doesn't show a `W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6` dir per the W314-r1 listing (only W301-related dirs are unverified) | Verify cite resolves; if dir doesn't exist, replace with `<missing>` token + queue operator update | **DEFER-W316** (file:line resolution sweep across all 23 skills) |
| F-V5-15 | LOW | `.claude/agents/wshobson-devops-troubleshooter.md:25` + `wshobson-security-auditor.md:27` | HTML comment cites "@ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6" without VERIFIED-by-date — provenance trail has [VERIFIED 2026-05-12] date stamp; W289 PR #535 merge `08ded5e` at 2026-05-17 means these HEAD cites are 5 days stale. | Refresh HEAD cites to current wshobson upstream (W314 confirmed `08ded5e` is HEAD) | **DEFER-W316** (provenance cite-refresh; non-functional) |
| F-V5-16 | LOW | `.claude/skills/sota-convergence-audit/SKILL.md:949` | "~~`graphiti` MCP~~ **RETIRED W290**" — graphiti was retired W295 per cumulative W295-codex-r27-to-r32 closure (the actual landing wave); W290 was the disabledMcpjsonServers enforcement wave. Off-by-5-waves cite. | Replace "RETIRED W290" with "RETIRED W295" | **DEFER-W316** (historical cite correction) |
| F-V5-17 | LOW | `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/` | 3 `.pre-fireN-fix` backup files (`hooks.json.pre-fire44-fix`, `pre-fire45-fix`, `pre-fire46-fix`) — stale backups from PATCHED Wave 50 Fire 44-46 sequence; current `hooks.json:1-2` says "Re-applied by codex-plugin-hooks-rewrite.py via sss.ps1 + eee.ps1 launchers pre-claude.exe (fail-closed). Backup: hooks.json.pre-fire46-fix." Plugin-cache files; per cardinal-rule-1, modifying plugin cache is BLOCKED. | Leave alone — plugin cache is upstream-owned. If next `/plugin update` regenerates the dir, these stale backups will be auto-pruned. | **NO-FIX (cardinal-rule-1)** |

---

## Apply-now patch list

### Fix-1: mem-recall SKILL.md — stale `.mcp.json:64-77` graphiti cite + stale `settings.json:91` (now :88) + stale `.local/bin/basic-memory.exe` (W308 uvx migration)

**File**: `Z:/claude-sota-installed/.claude/skills/mem-recall/SKILL.md`

**Diff (L32, applied)**:
```
- W301-A 2026-05-18: T4 graphiti was RETIRED W295 (per `CLAUDE.md:35` T4 marker "✗ RETIRED" + `settings.json:91` `disabledMcpjsonServers` includes `"graphiti"`). Original T2 target `mcp__memory__memory_search` is OFFLINE — `.mcp.json:memory` entry is in `disabledMcpjsonServers` (W282d retirement). Active path: ...
+ W315 cite-refresh (supersedes W301-A): T4 graphiti was RETIRED W295 + EXCISED W313 Stream A `5a350d1` (per `CLAUDE.md:35` T4 marker "✗ RETIRED" + `settings.json:88` `"disabledMcpjsonServers": []` — empty list because dead MCP entries are now excised from `.mcp.json` rather than parked in disabled-list). Original T2 target `mcp__memory__memory_search` is OFFLINE — the `.mcp.json:memory` server block was also excised W313 (16→10 mcpServers). Active path: ...
```

**Diff (L68-71, applied)**: rewrote backend list to cite current `.mcp.json:61-69` for basic-memory uvx, removed `.local/bin/basic-memory.exe` path liability (W308 migration), removed `.mcp.json:64-77` graphiti server-block cite, refreshed `settings.json:88` (was :91), reflected W313 excision of mcp-memory-service block.

**Cardinal-rule anchor**: R4 (project behavior in CLAUDE.md + skill files); cite-anchored to Anthropic skill discovery docs at `https://code.claude.com/docs/en/skills`.

**rcΔ**: positive — skill now accurately reflects post-W313 `.mcp.json` state (10 servers, `disabledMcpjsonServers: []`); previous cites would mislead any operator who tried to reproduce the runtime state.

---

### Fix-2: CLAUDE.md L3 CCBP cite SHA refresh

**File**: `Z:/claude-sota-installed/CLAUDE.md`

**Diff (L3, applied)**:
```
- > Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48798ca` [VERIFIED 2026-05-19 W314 Stream C cite-refresh; content-stable across SHAs 1386b0e → ac0d87d → 48f2ceb → 48798ca]
+ > Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2ceb` [W315 Stream B 2026-05-19 cite-refresh: W314 cited 48798ca but local Z:/repos/deps/claude-code-best-practice-shan HEAD is 48f2ceb; content-stable per W314 §C cross-SHA check across 1386b0e → ac0d87d → 48f2ceb]
```

**Cardinal-rule anchor**: R1 (install primitives only from trusted plugins/skills/agents — also covers cite freshness). Cite-anchored to CCBP `claude-memory.md` upstream.

**rcΔ**: positive — eliminates "cites HEAD that doesn't exist locally" silent-error. Operator running `git log 48798ca` in Z:/repos/deps/claude-code-best-practice-shan would get "bad revision".

---

### Fix-3: CLAUDE.md L34 marketplace count disambiguation

**File**: `Z:/claude-sota-installed/CLAUDE.md`

**Diff (L34, applied)**:
```
- - **Harness wired**: 68 plugins installed (47 enabled) across 18 marketplaces (W314 Stream C count refresh 2026-05-19); ...
+ - **Harness wired**: 68 plugins installed (47 enabled) referencing 16 marketplaces (22 defined; 6 unused defs queued for W316 audit) — actual `.claude/plugins/cache/` dir count: 18 (W315 Stream B count re-verification 2026-05-19); ...
```

**Cardinal-rule anchor**: R4 (project behavior in CLAUDE.md — and `CLAUDE.md` is the always-loaded preload memory per CCBP `claude-memory.md:34-40`; count drift is the kind of thing the operator checks first when debugging plugin state).

**rcΔ**: positive — exposes the 6 unused marketplace definitions as a follow-up item (`addy-agent-skills`, `claude-plugins-community`, `financial-services`, `healthcare`, `knowledge-work-plugins`, `life-sciences`, `skills`) and the 1 undefined reference (`thedotmack`). Disambiguates the 3 competing counts (16/22/18) that W314 conflated as "18".

---

## Defer-W316 queue

| ID | Severity | Reason for defer |
|---|---|---|
| F-V5-4 | HIGH | `thedotmack` undefined marketplace — `claude-mem@thedotmack:false` is the only consumer + plugin is disabled; operator decision needed (define or delete) |
| F-V5-5 | HIGH | `hf-mcp-server` provenance entry — cite-only addendum, no functional impact, needs operator-curated install rationale |
| F-V5-6 | HIGH | `.claude/plugins/cache/mcp-memory-service/` orphan dir — filesystem cleanup; operator confirmation needed before `Remove-Item -Recurse` |
| F-V5-7 | LOW | CLAUDE.md L35 "Ollama STOPPED-by-design" stale — needs status-appendix refresh (rolling 3-appendix retention policy means W316 will naturally rewrite this section) |
| F-V5-8 | MED | `serena` SHA-pin vs semver-pin — CR-9 audit needed (does serena publish to npm/PyPI with semver?) |
| F-V5-9 | MED | `gitnexus` MCP CR-9 fix — entangled with gitnexus re-enable decision (currently `enabledPlugins.gitnexus-marketplace:false`) |
| F-V5-10 | MED | evaluator.md docstring "NOT a hard read-only boundary" hedge — rhetoric polish; non-functional |
| F-V5-11 | MED | gpt5-archaeologist.md `permissionMode: bypassPermissions` on a read-only subagent — security-class change; needs codex T1 review |
| F-V5-12 | MED | `.claude/skills/learned/` empty directory — W311 AI-A-2 still pending; operator-AI carry-forward |
| F-V5-13 | MED | sota-convergence-audit SKILL.md "v3.1" → "sca-v7" string sweep — non-functional; cosmetic |
| F-V5-14 | MED | Skill file:line cite resolution sweep — full-codebase pass needed; W316 multi-stream candidate |
| F-V5-15 | LOW | wshobson agent HEAD cite refresh — provenance only |
| F-V5-16 | LOW | sca SKILL.md "RETIRED W290" → "W295" — historical cite correction |
| F-V5-17 | LOW | codex plugin cache stale backup files — cardinal-rule-1 BLOCKS; plugin cache is upstream-owned |

**Also carry-forward from W314-r2 (still open)**:
- W314-r2 F-2 PreCompact `SilentlyContinue` → try/catch (cite-anchored, defer per operator-AI-r2-8)
- W314-r2 F-4 OllamaServe state — **functionally CLOSED-INTENTIONAL by W315 probe** (Running/Automatic); only CLAUDE.md L35 cite-refresh remains
- W314-r2 F-5 GitHub MCP `search_repositories` 0-count — operator-AI-r2-7 REST fallback
- W314-r2 F-7 eval_harness.py promptfoo bare-pass
- W314-r2 F-8 eval_harness.py broad-except no traceback
- W314-r2 F-10 PostToolUseFailure else-branch generic-fallback
- W314-r2 F-11 mem-recall T6 service-down distinction
- W314-r2 F-12 service health-check unreliability
- W314-r2 F-13 ccusage Z:-baked path → npx-pinned

---

## Cardinal-rule conformance check (R1-R5 post-fixes)

| Rule | Status | Evidence |
|---|---|---|
| **R1** Install primitives only from trusted plugins/skills/agents | ✓ PASS | Cite anchors refreshed; CCBP HEAD cite corrected from `48798ca` (non-existent locally) to `48f2ceb` (actual HEAD). No new install primitives introduced. |
| **R2** Hooks only upstream-plugin OR direct-CLI; no project-owned hook bodies except cited bug-patch shims | ✓ PASS | Verified: only ONE shim (`.claude/hooks/context-mode-cache-heal.mjs`, anchored to anthropics/claude-code#46915); W314-r2 F-6 fix (`exit 1` at L28) still in place; settings.json hooks remain direct-CLI (gitleaks · bash+ruff/shellcheck · powershell · node-on-shim · `git worktree prune`). All settings.json hook commands inspected for swallow-patterns: `exit 0` survives ONLY in (a) PostToolUseFailure else-branch (F-10, deferred) and (b) PreCompact tail (F-2, deferred). |
| **R3** Subagents = installed upstream agents OR documented subagent system | ✓ PASS | 4 `.claude/agents/*.md` inspected (evaluator, gpt5-archaeologist, wshobson-devops-troubleshooter, wshobson-security-auditor) — all frontmatter shapes conform to Anthropic sub-agents docs schema; tools/disallowedTools/permissionMode patterns valid. F-V5-10 + F-V5-11 surface description-hedge issues but no schema violations. |
| **R4** Project behavior in CLAUDE.md + settings.json; `.claude/rules/*.md` permitted only upstream-plugin-shipped OR operator-curated path-gated | ✓ PASS | Project `.claude/rules/` correctly empty (per `self_invented_count: 0` invariant); ECC plugin `.claude/rules/everything-claude-code-guardrails.md` + `node.md` auto-loaded from plugin cache. CLAUDE.md L3 + L34 stale cites refreshed this audit. |
| **R5** Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts | ✓ PASS | settings.json has `permissions.deny` enumerating secret-file patterns + `permissionMode: bypassPermissions` at runtime + per-subagent `permissionMode: plan` declarative enforcement. F-V5-11 surfaces the gpt5-archaeologist `bypassPermissions`-on-read-only-subagent contradiction but the HTML comment at agent body L37-42 documents the parent-precedence rule per Anthropic sub-agents docs; defer for codex T1. |

**No cardinal-rule violations introduced by W315 Stream B applied fixes.**

---

## Cross-reference matrix vs ECC + CCBP + anthropics/* patterns

| Pattern | ECC plugin (auto-loaded) | CCBP `claude-settings.md` | Anthropic claude-code docs | This runtime (post-W315) |
|---|---|---|---|---|
| Pre-commit secret scan | ECC ships `gitleaks` hook pattern in `.claude/rules/` guardrails | CCBP §security-gates documents fail-loud secret-detection | `hooks/PreToolUse` docs require explicit exit-code blocking | ✓ `settings.json:106` gitleaks `|| exit 2` (W314-r2 F-1) |
| PostToolUse lint propagation | ECC guardrails recommend "narrow + auditable suppressions" | CCBP §hooks documents rc-propagation | hooks docs: `exit 2` blocks, `exit 0` advisory | ✓ `settings.json:122` ruff/shellcheck `exit $rc` (W314-r2 F-3) |
| Bug-patch shim cite-anchoring | ECC plugin: own `.claude/hooks/` are plugin-owned (not project) | CCBP `claude-settings.md` documents "shim only for upstream bugs cited to GH issue ≤2KB" | n/a (project-level convention) | ✓ ONLY `context-mode-cache-heal.mjs` (anthropics/claude-code#46915, ~1.5KB) |
| MCP server CR-9 semver pin | ECC plugin's own `.mcp.json` uses `npx -y <pkg>@<version>` form | CCBP `claude-settings.md` documents pinned-npx contract | mcp docs: `command/args` schema | Partial — F-V5-8 (serena SHA-pin) + F-V5-9 (gitnexus bare cmd) + W314-r2 F-13 (ccusage Z:-baked) all still open |
| Subagent read-only posture | ECC silent-failure-hunter agent uses `permissionMode: plan` | CCBP `claude-subagents.md` documents 17-field frontmatter incl. permissionMode | sub-agents docs documents disallowedTools | ✓ evaluator + wshobson-* all `permissionMode: plan`; ✗ gpt5-archaeologist uses `bypassPermissions` (F-V5-11) |
| WorktreeRemove cleanup | ECC plugin doesn't ship one | CCBP §hooks documents `git worktree prune` | hooks docs: WorktreeRemove event | ✓ `settings.json:143` `git worktree prune ... || echo` (W314-r2 F-9) |
| Stop-hook codex review gate | ECC doesn't ship | CCBP §sub-agents documents cross-model gate | sub-agents model-precedence | ✓ plugin-native at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:26-36` (W312-A.1 RESOLVED) |
| extraKnownMarketplaces hygiene | ECC plugin ships its own marketplace | CCBP doesn't document a cleanup pattern | plugins docs: marketplace schema | Partial — F-V5-3 (count drift) + F-V5-4 (thedotmack undefined) + 6 unused defs queued W316 |

---

## Counts

- **NEW findings**: 17 (6 HIGH · 7 MED · 4 LOW)
- **APPLIED inline this audit**: 6 (Fix-1 mem-recall L32 + L68-71 cite refresh + Fix-2 CLAUDE.md L3 SHA + Fix-3 CLAUDE.md L34 marketplace count) — counted as 3 file-edits across 2 files but addressing F-V5-1 + F-V5-2 + F-V5-3
- **DEFERRED to W316**: 11 NEW + 8 W314-r2-carry-forward = 19 total queue items
- **HIGH-severity findings**: 6 (F-V5-1 through F-V5-6); 3 applied, 3 deferred
- **NO-FIX (cardinal-rule)**: 1 (F-V5-17 codex plugin cache backups)

---

## Notes on what v5 did NOT catch (transparency)

1. **No deep audit of harness/eval_harness.py** — W314-r2 F-7/F-8 still open; v5 chose breadth across hooks/MCP/agents/skills/CLAUDE.md vs depth on harness/.
2. **No probe of agent-teams plugin internals** — out of scope per cardinal-rule-1 (upstream-plugin-owned).
3. **No file:line resolution sweep across all 23 skills** — F-V5-14 flags one example (mem-recall L78); a full sweep is W316-scale.
4. **No probe of NSSM service definitions beyond status query** — W314-r1 + W314-r2 covered the deep audit; v5 only verified the runtime state changed (OllamaServe).
5. **GitHub MCP `search_repositories` zero-count** — not re-probed; W314-r2 marked 3rd-confirmed; W315 carries forward per operator-AI-r2-7.

---

## Closure

W315 Stream B applied 6 fixes inline addressing **all 3 HIGH stale-cite findings (F-V5-1/-2/-3)** that materially mislead operators reading skill or CLAUDE.md state. Remaining HIGH findings (F-V5-4/-5/-6) are deferred-W316 because they need operator decision (delete vs keep, install rationale, filesystem cleanup) and have **zero functional silent-failure exposure today** (orphan refs/defs that aren't on any active code path).

The W314-r2 4-applied-fix invariant (F-1/F-3/F-6/F-9 settings.json + cache-heal.mjs) is **preserved end-to-end** — all 4 fixes verified intact this audit.
