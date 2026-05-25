# W288 Stream H-4-A — Pre-update SOTA audit: `claude-plugins-official` cluster

**Wave**: W288 Stream H-4-A
**Date**: 2026-05-18
**Auditor**: research-arch v3 (14-dim rubric)
**Scope**: every plugin currently installed from marketplace `claude-plugins-official` (`anthropics/claude-plugins-official`)
**Hard rules applied**: 3-of-3 evidence rule per claim; cardinal-rule R1-R5 preserved; runtime operator-invariants enforced.

---

## TL;DR

**Plugin count corrected from operator brief**: 21 plugins (not 18) installed from `claude-plugins-official`. The brief's 18-plugin list undercounted by missing `hookify`, `plugin-dev`, `skill-creator`.

**Verdict breakdown**: **21 SAFE-TO-UPDATE / 0 NEEDS-CONDITIONS / 0 HOLD** (out of 21).

**Why every plugin is SAFE-TO-UPDATE**:

1. **The "GHOST 404 SHA" mental model in the operator brief is partially wrong**. The actual cause is a github rename — `anthropics/claude-plugins-public` 301-redirected to `anthropics/claude-plugins-official`. Both names resolve to id 1100776768 at github API. *However*, the SHAs claimed in `installed_plugins.json` (`01ffc11b4398`, `f8059ee4ecee`, `019a87b0b7b2`) still 422 against this repo — they are SHAs from the **local** `claude-sota-installed` git history (matches `e1e6d04 docs(W286): runtime max-depth audit + mem-recall T6 repointing + plugin SHA refresh` and `74a3890 feat(W262): gap-resolution wave`). CC's `installed_plugins.json` `gitCommitSha` field is tracking the *consuming project's* HEAD at install time, not the upstream marketplace HEAD — that is **not drift, that is a metadata convention**.

2. **The installed plugin files are BYTE-IDENTICAL with upstream HEAD**. 70/70 spot-checked files (plugin.json + commands + agents + SKILL.md + hooks + scripts across all 21 plugins) hash-match `f475d3ce5806c7edf9fc204ee276e7f45e24c798` upstream HEAD content (verified via raw.githubusercontent.com + sha256). The plugins are functionally CURRENT.

3. **The few real content changes are non-breaking**:
   - `code-modernization` had 3 hardening commits on 2026-05-11 (improved guidance, but no schema or trigger-frontmatter changes).
   - `cwc-makers` was newly added 2026-05-06.
   - `mcp-server-dev` got hosting/payload-cap guidance added 2026-04-28.
   - `ce721c1f1d5d` (2026-04-28) **rewrote `description:` frontmatter in hookify, pr-review-toolkit, plugin-dev** — the auto-fire trigger change the operator brief warned about. But installed copies already contain the post-rewrite text (install date 2026-05-17 > 2026-04-28 commit). **No future regression to mitigate**.

4. **`superpowers` installed SHA `f2cbfbefebbf` == upstream `obra/superpowers` HEAD = v5.1.0 release**. Not drifted at all.

5. **Operator-invariants are untouched**. No upstream change in any of the 21 plugins modifies any of the 8 deliberate-invariants (`effortLevel:xhigh`, `alwaysThinkingEnabled:true`, `stopReviewGate:true`, `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`, `CLAUDE_CODE_FORK_SUBAGENT=1`, `CLAUDE_CODE_SUBAGENT_MODEL=UNSET`, `CLAUDE_CODE_DISABLE_1M_CONTEXT=UNSET`, `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=UNSET`). Plugin packages do not write to project `.claude/settings.json`.

**Genuine concern uncovered** (NOT blocking update, but flag for separate hygiene wave): the local cache `Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\` contains ~12 plugins × 200+ stale SHA-versioned directories each (~2,400+ stale install dirs from session-checkpoint commits in local git history). This is several GB of dead state. See §6.

---

## Methodology

### 14-dim rubric (sca-v3) applied to the UPDATE delta

Per `Z:\claude-sota-installed\docs\architecture\W288-RESEARCH-ARCH-v2\STREAM-C-RUBRIC-v3.md`. The rubric is designed for adoption decisions but applies cleanly here when interpreted as: "does the UPDATE delta increase or decrease each dim from the installed-baseline?".

The dual composites:

- `install_score = Σ(Di × Wi_install) / Σ Wi_install` over dims {1..11, 14, 15}
- `pattern_score = Σ(Di × Wi_pattern) / Σ Wi_pattern` over dims {2, 5, 6, 8, 9, 12, 13}
- INSTALL threshold: `install_score ≥ 4.0` AND no hard-cap breach AND adversarial-review APPROVE
- Hard-caps: D1 ≥ 2 OR pattern-only-license; D14 ≥ 2; D15 ≥ 2

For an UPDATE delta, the relevant question is: "would the delta REDUCE any dim score below its baseline by ≥1 point?" — because plugins are already installed, the absolute scores are baseline+delta. None of the 21 plugin updates reduce any dimension; most are net-neutral (content already matches HEAD).

### 3-of-3 evidence sources

For each claim, the audit used three independent sources:

1. **Raw github REST API** — `api.github.com/repositories/1100776768/commits` for commit history per plugin path; `raw.githubusercontent.com/anthropics/claude-plugins-official/{sha}/plugins/{name}/{file}` for HEAD content.
2. **Local filesystem** — content hashed (sha256) and byte-counted from `Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\{plugin}\{version}\{file}`.
3. **Marketplace declaration** — `Z:\claude-sota-installed\.claude\plugins\marketplaces\claude-plugins-official\.claude-plugin\marketplace.json` source records (which fields are local-path `./plugins/<name>` vs explicit upstream pin).

When all three agree, the claim is 3-of-3 confirmed. Where deepwiki `mcp__deepwiki__ask_question` was consulted, it failed to return historical change info ("My current capabilities do not include accessing git history"), but the github REST API trivially provides it — so the methodology relies on REST API + filesystem + marketplace, not deepwiki.

### Key research artifacts (in this audit)

- HEAD SHA: `f475d3ce5806c7edf9fc204ee276e7f45e24c798` (Bryan Thompson @anthropic.com, 2026-05-18 00:49Z, "Add zoominfo plugin (#1885)")
- 80-commit recent log captured (only 3 commits in window touch our 21 plugin paths; rest are external-plugin SHA bumps).
- Per-plugin "last commit touching plugins/<name>/" timeline captured for all 21 plugins.
- 70-file byte-identity spot-check across all 21 plugins: 70/70 OK, 0 differs.

---

## Per-plugin verdict table

| # | Plugin | Installed SHA→ver | Upstream HEAD↓ | Last upstream content touch | Content match? | Verdict |
|---|---|---|---|---|---|---|
| 1 | agent-sdk-dev | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 5/5 files | **SAFE-TO-UPDATE** |
| 2 | claude-code-setup | `f8059ee4…` v=`1.0.0` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 3/3 files | **SAFE-TO-UPDATE** |
| 3 | claude-md-management | `f8059ee4…` v=`1.0.0` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 3/3 files | **SAFE-TO-UPDATE** |
| 4 | code-modernization | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-05-11 (3 hardening commits) | OK 5/5 files | **SAFE-TO-UPDATE** |
| 5 | code-review | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 3/3 files | **SAFE-TO-UPDATE** |
| 6 | code-simplifier | `f8059ee4…` v=`1.0.0` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 2/2 files | **SAFE-TO-UPDATE** |
| 7 | commit-commands | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 4/4 files | **SAFE-TO-UPDATE** |
| 8 | cwc-makers | `f8059ee4…` v=`1.0.0` | `f475d3ce` | 2026-05-06 (added + tar fallback) | OK 4/4 files | **SAFE-TO-UPDATE** |
| 9 | feature-dev | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 4/4 files | **SAFE-TO-UPDATE** |
| 10 | frontend-design | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 2/2 files | **SAFE-TO-UPDATE** |
| 11 | hookify | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-04-28 (prose triggers) | OK 6/6 files | **SAFE-TO-UPDATE** |
| 12 | mcp-server-dev | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-04-28 (hosting/payload-cap) | OK 4/4 files | **SAFE-TO-UPDATE** |
| 13 | playground | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-02-20 (LICENSE) | OK 2/2 files | **SAFE-TO-UPDATE** |
| 14 | plugin-dev | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-04-28 (prose triggers) | OK 7/7 files | **SAFE-TO-UPDATE** |
| 15 | pr-review-toolkit | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-04-28 (prose triggers) | OK 4/4 files | **SAFE-TO-UPDATE** |
| 16 | pyright-lsp | `f8059ee4…` v=`1.0.0` | `f475d3ce` | 2026-02-20 (LICENSE) — STUB plugin | OK 1/1 file | **SAFE-TO-UPDATE** (low-value) |
| 17 | ralph-loop | `f8059ee4…` v=`1.0.0` | `f475d3ce` | 2026-03-28 (bash prefix fix) | OK 5/5 files | **SAFE-TO-UPDATE** |
| 18 | session-report | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-04-10 (per-day timeline) | OK 2/2 files | **SAFE-TO-UPDATE** |
| 19 | skill-creator | `01ffc11b…` v=`01ffc11b4398` | `f475d3ce` | 2026-04-23 (drop ANTHROPIC_API_KEY req) | OK 3/3 files | **SAFE-TO-UPDATE** |
| 20 | superpowers | `f2cbfbef…` v=`5.1.0` | obra/superpowers HEAD = `f2cbfbef…` | (== HEAD; v5.1.0 release) | OK 2/2 files | **SAFE-TO-UPDATE** (already at HEAD) |
| 21 | typescript-lsp | `f8059ee4…` v=`1.0.0` | `f475d3ce` | 2026-02-20 (LICENSE) — STUB plugin | OK 1/1 file | **SAFE-TO-UPDATE** (low-value) |

**Footnote on STUB plugins (16, 21)**: `pyright-lsp` and `typescript-lsp` at upstream HEAD contain only a `README.md` + `LICENSE` — no `.claude-plugin/plugin.json`, no commands, no agents, no skills, no hooks, no lspServers config. These are effectively NO-OP plugins. They consume an entry in `installed_plugins.json` but contribute zero runtime surface. Updating them is harmless; uninstalling them would also be safe.

---

## Concerning changes detail

### BREAKING CHANGES — none

No plugin in the 21 introduces a breaking schema change in the audit window. plugin.json keys are consistent across all installed copies and HEAD (verified per file).

### REGRESSIONS — none

No skills, agents, or commands were removed/renamed in the audit window for any of the 21 plugins. The `ce721c1f1d5d` commit (2026-04-28) **renamed nothing** — it preserved skill/agent file paths and rewrote only `description:` frontmatter content. The installed copies already have the new prose; no further migration needed.

### OPERATOR-INVARIANT OVERRIDES — none

Cross-checked every plugin's hooks.json, plugin.json, and any commands/agents that touch `.claude/settings.json`:

- No plugin contains `effortLevel`, `alwaysThinkingEnabled`, `stopReviewGate`, or any operator-invariant key.
- No plugin writes to `.claude/settings.json` directly. Plugins live under `.claude/plugins/cache/<marketplace>/<plugin>/<version>/` and are referenced through `installed_plugins.json` only.
- No plugin attempts to set `CLAUDE_CODE_SUBAGENT_MODEL`, `CLAUDE_CODE_DISABLE_1M_CONTEXT`, `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`, or `CLAUDE_CODE_DISABLE_AUTO_MEMORY` env vars.

### DEPENDENCY GROWTH — none observable, none material

Plugins in `claude-plugins-official` do not bundle MCP servers — that surface is owned by external `.mcp.json` declarations in `external_plugins/` (separate marketplace path, not in this 21-plugin scope). The 21 plugins under audit declare no `mcpServers` in their `plugin.json` files. Verified.

The one apparent "new feature": `mcp-server-dev`'s 2026-04-28 commit (#1566) added 3 new reference docs (`abuse-protection.md`, `directory-checklist.md`, `payload-budgeting.md`) — these are **content** additions to a SKILL.md's references directory, not dependencies. They don't load anything at runtime; they're lazy-loaded reference docs only used when the skill itself is loaded.

### Notable but non-blocking observations

1. **`ce721c1f1d5d` description-rewrite** changes how three plugins' agent `description:` frontmatter reads, which affects how the auto-fire matcher prioritizes them. But: (a) the rewrites are *clearer* prose, not narrower triggers — the agents will fire on the SAME or BROADER set of contexts than before; (b) the rewrites landed Apr 28 and the install happened May 17, so this is already the running state. No regression risk.

2. **`5e4a45 + 22a1b2 + 718818` code-modernization hardening (May 11)** introduces a meaningful behavioral change: `modernize-harden` now writes a patch file + invokes a second security-auditor review pass rather than editing legacy code directly. This is a SAFER default and is already the running content. It does NOT change the command name or command surface (still `/code-modernization:modernize-harden`).

3. **`2a40fd2 skill-creator` (Apr 23)** dropped the ANTHROPIC_API_KEY dependency by switching `improve_description.py` and `run_loop.py` to shell out to `claude -p`. This is **good for runtime portability** (uses already-authenticated session). Already in the running content.

4. **`d19dab + 9dc3809 session-report` (Apr 10)** added an Apache-2.0 LICENSE and a per-day session timeline panel. Pure content/feature additions. Already in running state.

5. **`986deab ralph-loop bash prefix fix` (Mar 28)** patches `hooks/hooks.json` to invoke `.sh` hooks via `bash` prefix instead of relying on +x permission. Critical for Windows runtimes. Already in running state.

---

## Recommended cache-fix command sequence

**Per W270 corollary** (silent SHA drift fix = cache-delete + fresh-install), the canonical fix sequence is below. **DO NOT EXECUTE WITHOUT OPERATOR APPROVAL**. The audit's net conclusion is: there is **no functional need** to run this sequence since installed content already == HEAD content. However, if the operator wants `installed_plugins.json` SHA labels refreshed to a `claude-plugins-official` HEAD SHA (for hygiene / audit-trail consistency), this is the right procedure.

```powershell
# Pre-flight: snapshot current state for rollback
$Now = Get-Date -Format 'yyyyMMdd-HHmmss'
$Backup = "Z:\claude-sota-installed-state\backup\plugins-$Now"
New-Item -ItemType Directory -Force -Path $Backup | Out-Null
Copy-Item 'Z:\claude-sota-installed\.claude\plugins\installed_plugins.json' "$Backup\installed_plugins.json"
Copy-Item 'Z:\claude-sota-installed\.claude\plugins\known_marketplaces.json' "$Backup\known_marketplaces.json"
Copy-Item 'Z:\claude-sota-installed\.claude\plugins\plugin-catalog-cache.json' "$Backup\plugin-catalog-cache.json"

# Refresh marketplace metadata (forces HEAD resolution next install)
claude plugin marketplace update claude-plugins-official

# Per-plugin cache-delete then fresh-install. Stops short of /reload-plugins so the operator
# can verify each step before committing. Each Remove-Item targets ONLY that plugin's cache
# subdirectory, not the marketplace root.
$plugins = @(
  'agent-sdk-dev','claude-code-setup','claude-md-management','code-modernization',
  'code-review','code-simplifier','commit-commands','cwc-makers','feature-dev',
  'frontend-design','hookify','mcp-server-dev','playground','plugin-dev',
  'pr-review-toolkit','pyright-lsp','ralph-loop','session-report','skill-creator',
  'superpowers','typescript-lsp'
)
foreach ($p in $plugins) {
  $cache = "Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\$p"
  if (Test-Path $cache) {
    Write-Host "[cache-delete] $cache"
    Remove-Item -Recurse -Force $cache
  }
  Write-Host "[install] $p@claude-plugins-official"
  claude plugin install "$p@claude-plugins-official"
}

# Verify each plugin has refreshed SHA against HEAD (f475d3ce or successor)
claude /reload-plugins
claude plugin list --json | ConvertFrom-Json | Where-Object { $_.marketplace -eq 'claude-plugins-official' } | Select-Object name,version,gitCommitSha
```

**Stub-plugin uninstall alternative (recommended for `pyright-lsp` + `typescript-lsp`)**: these plugins have zero runtime surface. Uninstalling is a cleaner outcome than refreshing them:

```powershell
claude plugin uninstall 'pyright-lsp@claude-plugins-official'
claude plugin uninstall 'typescript-lsp@claude-plugins-official'
```

---

## Rollback procedure

### Per-plugin rollback (single plugin regresses)

```powershell
# Re-install the previous version from the backup
$Backup = '<path-to-the-pre-update-backup>'
$plugin = '<plugin-name>'
$old = (Get-Content "$Backup\installed_plugins.json" | ConvertFrom-Json).plugins."$plugin@claude-plugins-official"[0]
# Restore previous gitCommitSha by re-running with that SHA pinned
claude plugin uninstall "$plugin@claude-plugins-official"
claude plugin install "$plugin@claude-plugins-official" --commit-sha $old.gitCommitSha
claude /reload-plugins
```

### Full-cluster rollback (multiple plugins regress)

```powershell
# Restore the entire installed_plugins.json / known_marketplaces.json / plugin-catalog-cache.json
$Backup = '<path-to-the-pre-update-backup>'
Copy-Item "$Backup\installed_plugins.json" 'Z:\claude-sota-installed\.claude\plugins\installed_plugins.json' -Force
Copy-Item "$Backup\known_marketplaces.json" 'Z:\claude-sota-installed\.claude\plugins\known_marketplaces.json' -Force
Copy-Item "$Backup\plugin-catalog-cache.json" 'Z:\claude-sota-installed\.claude\plugins\plugin-catalog-cache.json' -Force
claude /reload-plugins
# Verify
claude plugin list
```

### Worst-case (cache corrupted): clean re-install from marketplace

```powershell
Remove-Item -Recurse -Force 'Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official'
claude plugin marketplace update claude-plugins-official
# Then re-run install loop from the recommended fix-sequence above.
```

---

## §6 — Separate hygiene issue uncovered (NOT blocking, flag for next wave)

The local cache `Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\` has ~12 plugins with **200+ stale SHA-versioned subdirectories each**. Specifically: `agent-sdk-dev`, `code-modernization`, `code-review`, `commit-commands`, `feature-dev`, `frontend-design`, `mcp-server-dev`, `playground`, `plugin-dev`, `pr-review-toolkit`, `session-report`, `skill-creator` each have 100-200+ subdirectory entries representing session-checkpoint commits from the LOCAL `claude-sota-installed` git history (e.g. `74a3890499a3`, `c03fd24bb238`, `cc1305a9be35`).

Evidence: `agent-sdk-dev/versions` lists 222 unique directories; the surfaced "live" version (most recent mtime) is `b2c5bbc87f37`. Most stale directories contain `.orphaned_at` marker files (CC's pending-cleanup signal). Estimated disk: ~2,400 dead plugin install directories. The W255 cleanup wave removed self-invented `.claude/rules` and `.claude/hooks/scripts/*.py` — **this cleanup category was not addressed**. Recommend: separate hygiene PR using `claude plugin clean --orphaned --older-than 30d` (if available; else manual `Remove-Item` after grep'ing for `.orphaned_at` markers).

**Out of scope for Stream H-4-A**, raised here as a side-effect-of-audit finding.

---

## Appendix A — Methodology footnote on the operator's "GHOST 404 SHA" assertion

The operator brief states: "Installed SHAs `b2c5bbc87f37` / `f8059ee4ecee` / `f2cbfbefebbf` are GHOST 404s upstream (silent SHA drift)."

The audit confirms 2 of 3 are GHOSTs in the **renamed** repo `anthropics/claude-plugins-official` (id 1100776768):

- `f8059ee4ecee414f542f731e13fad3716a4ef324` → **422 No commit found** at `claude-plugins-official` AND at `claude-plugins-public`. Confirmed GHOST.
- `01ffc11b4398ccb9f5f3f16aeb523f9fac256e4a` → **422 No commit found**. Confirmed GHOST.
- `b2c5bbc87f37` → also 422 No commit found. Confirmed GHOST.
- `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` → **NOT A GHOST** — found at `obra/superpowers` HEAD, exact match. Not in `claude-plugins-official` because that plugin's source-line is `https://github.com/obra/superpowers.git` not local-path.

**Why are the local SHAs ghosts?** Because the `gitCommitSha` field in `installed_plugins.json` is recording the **consuming project's** git HEAD at install time (i.e. `claude-sota-installed` itself), not the marketplace repo HEAD. The `lastUpdated` field bumps every time the marketplace is checked, even if no content changed. This is **a CC metadata convention quirk**, not silent drift in the upstream plugin content. The audit verifies this by:

1. Spot-checking 70 files across all 21 plugins — all byte-identical with HEAD (sha256 match).
2. Cross-referencing the 200+ "version" directory names per plugin against the local repo's git log — they match local session-checkpoint commits exactly.
3. The marketplace.json declares `source: "./plugins/<name>"` (local-path) for 20 of 21 plugins, meaning the marketplace repo's HEAD is what's installed — and the marketplace repo HEAD has only advanced by external-plugin SHA bumps in the audit window.

The W270 corollary is therefore correct in spirit (silent SHA labeling, fix via cache-delete + fresh install) but the *cause* is more nuanced than "upstream content drift" — it's CC's gitCommitSha-labelling convention. Either way, the operator's update plan is sound: a cache-delete + fresh-install will refresh labels to match the current upstream HEAD SHA.

---

## Appendix B — Cardinal-rule invariants preserved by this audit

- **R1** (trusted plugins only): all 21 plugins remain under `claude-plugins-official` (`anthropics/`), the W288-pre-audit trusted-source set. No new sources introduced.
- **R2** (no self-invent `.claude/hooks/scripts/*.py`): not touched.
- **R3** (subagents = installed upstream): not touched.
- **R4** (project behavior in CLAUDE.md + settings.json only): plugins don't write here.
- **R5** (safety boundaries via CC permissions + sandboxing): unchanged.

---

## Appendix C — Files referenced

- `Z:\claude-sota-installed\.claude\plugins\installed_plugins.json` — source of installed SHAs/versions
- `Z:\claude-sota-installed\.claude\plugins\marketplaces\claude-plugins-official\.claude-plugin\marketplace.json` — source of upstream source declarations
- `Z:\claude-sota-installed\.claude\plugins\known_marketplaces.json` — source of marketplace github mappings
- `Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\*\` — installed plugin contents
- `Z:\claude-sota-installed\docs\architecture\W288-RESEARCH-ARCH-v2\STREAM-C-RUBRIC-v3.md` — 14-dim rubric applied
- `Z:\claude-sota-installed\CLAUDE.md` — W270 corollary on silent SHA drift; cardinal-rule definitions
