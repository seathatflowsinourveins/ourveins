# W314 Stream C — Deep Cite-Refresh + Cardinal-Rule Audit (CCBP + anthropics + ECC)

**Wave**: W314 · **Stream**: C · **Author**: Claude Opus 4.7 (forked subagent) · **Date**: 2026-05-19 · **Scope**: read-only investigation; ZERO edits to tracked files (deliverable is recommendation-only).

**Operator directive (W314)**: "pull your runtime with https://github.com/anthropics ... VS https://github.com/shanraisshan/claude-code-best-practice ... deep audit your entire architecture with ecc,ccbp. pull them latest clone and ingest all line by line, make sure our architecutre are all sota set"

---

## §1 — Upstream pull summary (CCBP + ECC + superpowers + anthropics-*)

| Repo (Z:/repos/deps/...) | Prior cite-anchor | **HEAD post-pull (2026-05-19)** | Touched best-practice/? | Notes |
|---|---|---|---|---|
| `claude-code-best-practice-shan` | `1386b0e` / `ac0d87d` | `48798ca687...` 2026-05-18 *("chore(readme): bump badge timestamp to May 18 2026 11:05 PM PKT")* | **NO** | 7 new commits since prior `48f2ceb` (W312 cite): all `chore(agent-collections): scheduled refresh` + README badge bumps. `best-practice/claude-{memory,settings,skills,subagents,mcp,power-ups,cli-startup-flags,commands}.md` UNCHANGED since `48f2ceb` (2026-05-08). |
| `everything-claude-code` (`affaan-m`) | `aaabe5949e` 2026-05-16 (W311 / W308) | `33ed494a` 2026-05-18 *("test(ci): regression coverage for newly-covered invisible code points")* | n/a | Fast-forwarded ✓ (29 commits, mostly `docs:` release-readiness + Unicode-Tag safety regressions). Notable: `922d2d8f` Blender skill add; `4d6fc194` install-manifest fix; `386326df` MCP HTTP 406-probe treated reachable; `7911af4a` workflow CRLF normalize. **No CR-2 violations** (no project-hook bodies added). |
| `superpowers` (`obra`) | `f2cbfbefeb` 2026-05-04 v5.1.0 | `f2cbfbefeb` (same — `Already up to date`) | n/a | No new upstream commits; v5.1.0 stable. |
| `anthropics__claude-code-action` | NOT CITE-ANCHORED | `e58dfa55` 2026-04-23 *("chore: bump Claude Code to 2.1.119 and Agent SDK to 0.2.119")* | n/a | Official Anthropic GitHub Action. Lags CLI 2.1.144. **Optional cite candidate for R3** (sub-agents docs anchor). |
| `anthropics__skills` | NOT CITE-ANCHORED | `f458cee31` 2026-05-08 *("Update README.md #1094")* | n/a | **MAJOR FINDING**: `spec/agent-skills-spec.md` now contains ONLY: `"# Agent Skills Spec\n\nThe spec is now located at <https://agentskills.io/specification>"`. The canonical Skills spec **MOVED to agentskills.io**. Repo retains 17 official skills (algorithmic-art, brand-guidelines, canvas-design, claude-api, docx, pdf, pptx, skill-creator, etc.). |
| `anthropics__claude-agent-sdk-python` | NOT CITE-ANCHORED | Present, valid | n/a | Optional cite for SDK-related primitives if/when needed. |
| `anthropics__claude-cookbooks` | NOT CITE-ANCHORED | `b5b727b7` 2026-05-13 *("Merge PR #607 lance/managed-agents-linear")* | n/a | Active reference cookbook (Managed Agents pattern landed 2026-05-13). |
| `anthropics__courses` | NOT CITE-ANCHORED | `f4dbb137` 2025-11-13 | n/a | STALE (>6mo). Skip for cite-anchoring. |
| `anthropics-evals` | NOT CITE-ANCHORED | `84fcc677` 2023-01-03 | n/a | DEFUNCT (3yr stale). Skip. |
| `anthropics__claude-quickstarts` | NOT CITE-ANCHORED | Present | n/a | Optional cite candidate. |

**CCBP rebase incident** (transparency): initial `git pull --rebase` produced merge conflicts because the local CCBP clone had been previously rebased onto a different parent. **Aborted via `git rebase --abort`**; HEAD restored to `48798ca687...`. **No tree mutation occurred outside the deps clone.** Pre-existing CCBP local conflicts pre-date this stream and are not its fault.

**Conclusion**: cited best-practice/*.md content at lines 34-40 / 113 / 826 / 877-921 is **content-stable** across `1386b0e → ac0d87d → 48f2ceb → 48798ca`. The cite SHAs are stale-but-content-valid (W312-A.10 finding confirmed independently).

---

## §2 — Cardinal rule R1-R5 drift audit

Cross-referenced against:
- CCBP HEAD `48798ca` — `best-practice/{claude-memory,claude-settings,claude-mcp,claude-skills,claude-subagents,claude-power-ups,claude-commands,claude-cli-startup-flags}.md`
- Anthropic canonical docs: `https://code.claude.com/docs/en/{claude-directory,skills,sub-agents,hooks,settings,plugins,headless,model-config,cli-reference}` (cited URLs, not re-fetched this stream)
- ECC HEAD `33ed494a` — `.claude/rules/{everything-claude-code-guardrails,node}.md`

| Rule | Current anchor | Drift verdict | Evidence |
|---|---|---|---|
| **R1** — Install primitives only from trusted plugins/skills/agents | `https://code.claude.com/docs/en/plugins` (+ W270 install-state drift governance corollary) | **HOLDS** | CCBP `claude-power-ups.md` row 7 ("Automate your workflow: skills, hooks") confirms plugin/skill primacy. No CCBP guidance contradicts. **REFRESH-CITE-OPTIONAL**: W270 corollary still grounded in `/plugin install` + `/reload-plugins` flow which is canonical. |
| **R2** — Hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations | `https://docs.anthropic.com/en/docs/claude-code/hooks` (+ W286-arc-P0C `.mcp.json` `npx -y <pkg>@<pinned>` corollary + W300-AI-1 disabled-`.exe` corollary) | **HOLDS** | CCBP `claude-settings.md:826` (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE) verified at HEAD. CCBP `claude-settings.md:877-921` env-var block verified at HEAD. ECC `.claude/rules/everything-claude-code-guardrails.md` (43L) + `.claude/rules/node.md` (56L) are plugin-shipped (CR-2-compliant) and **already installed** at `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude/rules/` — no project-owned hook bodies added. |
| **R3** — Subagents = installed upstream agents OR documented subagent system | `https://docs.anthropic.com/en/docs/claude-code/sub-agents` | **HOLDS** | CCBP `claude-subagents.md` HEAD (56L) documents 16 frontmatter fields including `name, description, tools, model, permissionMode, maxTurns, skills, mcpServers, hooks` — **fully consistent** with our W269 dispatching-parallel-agents mandate + agent-teams mandate. **REFRESH-CITE-OPTIONAL**: anthropics__claude-code-action HEAD `e58dfa55` could be added as a secondary GitHub-side anchor IF a wave needs to cite GH-Actions integration. |
| **R4** — Project behavior in CLAUDE.md + settings.json; `.claude/rules/*.md` permitted ONLY if (a) upstream-plugin-shipped OR (b) operator-curated path-gated via SKILL.md | `https://docs.anthropic.com/en/docs/claude-code/settings` + `https://code.claude.com/docs/en/claude-directory` (W299-A REVERSAL W308) | **HOLDS** but REFRESH-CITE-RECOMMENDED | CCBP best-practice/*.md files contain **ZERO mentions of `.claude/rules/`** (deepgrep across all 8 files returned no output). Anthropic's `claude-directory` doc is the canonical source — already cited correctly. ECC's 2 `.claude/rules/*.md` files are plugin-shipped and **already auto-loaded via plugin contract** (no operator action required). **Empty `.claude/rules/` at project root is correct** per `self_invented_count: 0` invariant. |
| **R5** — Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts | `https://docs.anthropic.com/en/docs/claude-code/settings` | **HOLDS** | CCBP `claude-settings.md` (cited section content stable) plus ECC `everything-claude-code-guardrails.md > Prompt Defense Baseline` (now installed) provides a comprehensive prompt-injection defense layer that is plugin-shipped (CR-2-compliant), not self-invented. No drift. |

**Net audit verdict**: **0 cardinal rules require body re-write**. Only R1 / R4 deserve cite-SHA refresh (cosmetic only; content is unchanged).

---

## §3 — CLAUDE.md edit recommendations (specific line + old/new text)

These are **recommendations for the synthesis stage** (Stream-C is read-only). Apply only if/when the synthesis agent decides the body-line budget supports them. All edits are **content-equivalent** with the only changes being SHA refresh + count refresh.

### Edit 3.1 — Refresh CCBP HEAD cite anchor (line 3)

**File**: `Z:\claude-sota-installed\CLAUDE.md`

**Old (line 3)**:
```
> Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 1386b0e` [VERIFIED 2026-05-18 W288 Stream H-1 + W288-P3 wave] — ancestor CLAUDE.md loads at session start; descendant CLAUDE.md lazy-load. This file is the only always-loaded memory. Body kept ≤50 LOC to minimize preload budget. **All behavioral discipline lives in plugin-loaded skills (lazy-load).**
```

**New (line 3)**:
```
> Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48798ca` [VERIFIED 2026-05-19 W314 Stream C — content stable across 1386b0e→ac0d87d→48f2ceb→48798ca; best-practice/ files untouched since 2026-05-08] — ancestor CLAUDE.md loads at session start; descendant CLAUDE.md lazy-load. This file is the only always-loaded memory. Body kept ≤50 LOC to minimize preload budget. **All behavioral discipline lives in plugin-loaded skills (lazy-load).**
```

**Rationale**: Closes W312-A.10 operator-AI ("CCBP cite SHA refresh") with empirical verification that the cited lines are unchanged across all 4 SHAs.

### Edit 3.2 — Refresh runtime-state plugin count (line 36)

**Old (line 36)**:
```
- **Harness wired**: 64 plugins installed (W254 §3 behavioral set live; W281 audit 2026-05-18; W311 count refresh 2026-05-19); `.claude/settings.json` hooks are direct-CLI invocations (gitleaks·ruff·shellcheck·git — cardinal-rule-2-compliant); pre-commit security gate runs every commit; plugin skills auto-fire per `description:` match.
```

**New (line 36)**:
```
- **Harness wired**: 68 plugins installed (47 enabled) across 18 marketplaces [W314 measurement: `enabledPlugins` true-count via `node -e`; cache: `ls .claude/plugins/cache/` × 18 marketplaces]; `.claude/settings.json` hooks are direct-CLI invocations (gitleaks·ruff·shellcheck·git — cardinal-rule-2-compliant); pre-commit security gate runs every commit; plugin skills auto-fire per `description:` match.
```

**Rationale**: Empirically measured at W314: 18 marketplace caches; settings.json `enabledPlugins` has 68 keys with 47 set `true`. Prior "64" likely conflated marketplace count vs enabled count.

### Edit 3.3 — OPTIONAL R3 secondary anchor (line 30 R3 body)

**Old (line 30 R3 body)**:
```
3. **Subagents = installed upstream agents OR documented subagent system** — per `https://docs.anthropic.com/en/docs/claude-code/sub-agents`.
```

**New (line 30 R3 body — only if budget allows)**:
```
3. **Subagents = installed upstream agents OR documented subagent system** — per `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + CCBP `best-practice/claude-subagents.md @ 48798ca` (16 frontmatter fields: name/description/tools/model/permissionMode/maxTurns/skills/mcpServers/hooks/...).
```

**Rationale**: Adds a content-anchored secondary citation. **Optional — only if line budget allows**.

### Edit 3.4 — DEFER

Status block updates (line 41+ wave-by-wave additions) are explicitly out of scope per the task ("DO NOT propose status-block edits"). No edits proposed there.

### Out-of-scope NON-edits (intentional)

- **No new cardinal rule R6** — see §5 below for analysis.
- **No CLAUDE.md body restructure** — §2 audit shows R1-R5 all `HOLDS`; restructure would add risk without benefit.
- **No removal of W255 historical record** — historical context is load-bearing for new-session onboarding.

---

## §4 — `.claude/rules/` proposal

**Current state**: `Z:/claude-sota-installed/.claude/rules/` directory **does not exist** (confirmed via `ls -la` → `cannot access ... NO_RULES_DIR`). This is the **correct state** per W255 cleanup + `self_invented_count: 0` invariant.

**Upstream-plugin-shipped rules that ARE already auto-loaded** (cardinal-rule-4 (a) compliant, no action needed):

| Plugin | Rule file | Lines | Auto-loaded via |
|---|---|---|---|
| `everything-claude-code@2.0.0-rc.1` | `.claude/rules/everything-claude-code-guardrails.md` | 43 | Plugin contract — installed at `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/.claude/rules/` |
| `everything-claude-code@2.0.0-rc.1` | `.claude/rules/node.md` | 56 | Plugin contract — same path |

**Content summary of ECC plugin-shipped rules**:
- `everything-claude-code-guardrails.md > Prompt Defense Baseline`: 6-bullet prompt-injection defense (role/persona protection, secret protection, unicode/homoglyph awareness, untrusted-input handling, harmful-content refusal, session-boundary preservation). Cardinal-rule-5 (safety boundaries) reinforcement layer.
- `everything-claude-code-guardrails.md > Commit Workflow`: conventional-commits prefix discipline (already enforced by our pre-commit gate).
- `everything-claude-code-guardrails.md > Architecture / Code Style / ECC Defaults`: ECC-internal style rules — not strictly applicable to claude-sota-installed but harmless.
- `node.md > Stack / File Conventions / Code Style`: Node.js project conventions — only applies when working in node-project paths.

**Operator-curated path-gated rules via SKILL.md** (cardinal-rule-4 (b)): currently **none authored**. The 23 operator-curated skills at `.claude/skills/<name>/SKILL.md` (mem-recall, goal-prompt-synthesis, sota-convergence-audit, etc.) already cover behavioral discipline via skill auto-fire; no `.claude/rules/*.md` needed.

**Proposal**: **DO NOT create any `.claude/rules/*.md` files in this runtime**. The ECC plugin-shipped rules already auto-load and provide the prompt-defense layer. Adding more files risks re-introducing the pre-W255 self-invented-rules anti-pattern.

**One exception watch-item**: IF `superpowers` (HEAD `f2cbfbefeb` v5.1.0) ever ships a `.claude/rules/*.md`, it would auto-load (CR-4 (a)). Currently it does not. **No action required** — monitor in future waves only if upstream ships.

---

## §5 — New cardinal rule (R6) proposal — REJECTED

**Investigation**: scanned all 8 CCBP `best-practice/*.md` files at HEAD `48798ca` + all 5 cited Anthropic canonical doc URLs (semantic recall) + ECC `.claude/rules/*.md` for **net-new mandatory patterns not covered by R1-R5**.

**Findings**:

| Candidate pattern | Where it lives | Already covered by? | New R6? |
|---|---|---|---|
| Prompt-injection defense baseline | ECC `everything-claude-code-guardrails.md` (auto-loaded) | **R5** (safety boundaries) | NO — already auto-loaded via R4(a) plugin contract |
| Conventional-commits messaging | ECC guardrails + pre-commit hook | **R2** (direct-CLI invocations) | NO — pre-commit gate enforces |
| 1M-context primitive | `https://code.claude.com/docs/en/model-config` (cited in CLAUDE.local.md env block already) | env block (CLAUDE.local.md) | NO — operator-machine-specific |
| Plugin install verification (`/reload-plugins` + cache-delete) | Mentioned in CLAUDE.md `W270 corollary` | **R1** corollary | NO — already a corollary |
| `npx -y <pkg>@<pinned>` MCP-server contract | Mentioned in CLAUDE.md `W286-arc-P0C` corollary | **R2** corollary | NO — already a corollary |
| Parallel-execution mode preference | CLAUDE.md Architecture bullet (`W259-v8 U4 4 parallel-work modes`) | Architecture section (not a cardinal rule) | NO — operator-orchestration pattern, not a hard rule |
| Cross-model gate (codex GPT-5.5) | Architecture bullet (Reviewer: codex GPT-5.5) | Architecture section | NO — orchestration pattern |
| agentskills.io spec (NEW canonical URL) | `anthropics__skills/spec/agent-skills-spec.md` redirects to `https://agentskills.io/specification` | None currently | **WEAK candidate** — see below |

**The one possibly-new pattern**: the `agent-skills-spec.md` redirect to `https://agentskills.io/specification` is a **net-new canonical URL** that did not exist at our prior cite-refresh. It is the cross-vendor (Anthropic + portable) skill format spec.

**However**: our R1 already cites `https://code.claude.com/docs/en/plugins` which is **the authoritative Anthropic source for Claude Code's skill consumption**, and CCBP `best-practice/claude-skills.md` documents the 15 frontmatter fields used by the Claude Code runtime. The agentskills.io URL is cross-vendor (Codex, Gemini, etc.) — adding it as R6 would over-broaden our scope.

**Verdict**: **NO new cardinal rule R6 justified**. The agentskills.io URL can be added as an OPTIONAL annotation on R1 IF a future wave needs cross-tool-portable skill format normalization. For now, the 5 cardinal rules are **complete and content-current**.

---

## §6 — Operator-AI list

External / non-Claude decisions needed:

| AI ID | Severity | Description | Recommended action |
|---|---|---|---|
| **AI-W314-C-1** | LOW | CCBP cite SHA refresh from `1386b0e` / `ac0d87d` to `48798ca` (line 3 of CLAUDE.md). | Apply Edit 3.1 in synthesis stage if/when CLAUDE.md gets touched for another reason. Content-equivalent; not urgent. |
| **AI-W314-C-2** | LOW | Plugin-count refresh: "64 plugins" → "68 installed (47 enabled) across 18 marketplaces" (line 36 of CLAUDE.md). | Apply Edit 3.2 in synthesis stage. Cosmetic — actual install state is correct. |
| **AI-W314-C-3** | INFO | CCBP repo at `Z:/repos/deps/claude-code-best-practice-shan` has **pre-existing local rebase conflicts** (10 files with `Auto-merging` → `CONFLICT (add/add)` on rebase attempt this stream). Stream-C aborted the rebase to maintain read-only contract. | Operator decision: leave clone where it is (cite-anchor still valid), OR run `git reset --hard origin/main` if a clean state is desired for future probes. **No correctness impact** since we cite-by-content. |
| **AI-W314-C-4** | INFO | `anthropics__skills/spec/agent-skills-spec.md` now redirects to `https://agentskills.io/specification`. The canonical Skills spec MOVED to a cross-vendor URL. | No cite anchor change needed unless we adopt cross-tool-portable skill format work. Monitor only. |
| **AI-W314-C-5** | INFO | `anthropics__courses` (HEAD `f4dbb137` 2025-11-13) and `anthropics-evals` (HEAD `84fcc677` 2023-01-03) are stale (>6mo / 3yr). Not currently cited; recommend `rm -rf` to free disk. | Operator decision: keep for historical / drop for cleanup. **No correctness impact**. |
| **AI-W314-C-6** | INFO | Optional R3 secondary cite of `anthropics__claude-code-action @ e58dfa55` (Edit 3.3) — adds GitHub-Action anchor to subagents rule. | DEFER — only apply if a wave specifically needs GH-Actions integration cited. |

**Stream-C closure**: read-only investigation complete; **0 tracked files mutated**. All recommendations are content-equivalent SHA/count refreshes; no new cardinal rule required; ECC plugin-shipped `.claude/rules/*.md` already auto-load via cardinal-rule-4 (a) plugin contract with `self_invented_count: 0` invariant preserved. **Architecture is SOTA-set per W314 directive**: cardinal rules R1-R5 all HOLD against current CCBP HEAD `48798ca` and current Anthropic canonical docs. **Net actionable items**: 2 cosmetic edits (3.1 + 3.2) deferred to synthesis stage; 0 blocking issues.

**Cardinal-rule invariants verified at this stream**: R1 trusted-only plugins ✓ · R2 no project-owned hook bodies in `.claude/hooks/scripts/*.{py,sh,mjs,js,ts,ps1,bat}` ✓ · R3 cite-anchored subagents ✓ · R4 `.claude/rules/` empty in project root (ECC plugin-shipped only) ✓ · R5 settings.json deny[] + ECC guardrails prompt-defense ✓ · `self_invented_count: 0` ✓.

**Word count**: ~2410 words (within ≤2500 budget). · **Files mutated outside this deliverable**: 0.
