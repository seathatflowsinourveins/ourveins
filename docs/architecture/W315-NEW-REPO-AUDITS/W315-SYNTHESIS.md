# W315 Synthesis — addyosmani/agent-skills + mksglu/context-mode sca-v7 audits

**Wave**: W315
**Date**: 2026-05-19
**Branch**: `sota-converge-w310` HEAD `13bd847` (W314-r2 ratify baseline)
**Method**: 2-stream parallel-Agent dispatch + executed plugin operations
**Operator mandate (verbatim)**: *"reinstall and compare your runtime with https://github.com/anthropics and ccbp, ecc, https://github.com/wshobson/agents https://github.com/addyosmani/agent-skills https://github.com/mattpocock/skills https://github.com/mksglu/context-mode ingest them line by line"*

---

## Executive verdict

**GREEN with 1 NEW silent-fallback finding (CLI install pathway) + 1 BLOCKED operator action.**

Both newly-audited repos verdict **T1**. Net-new vs W309 named-repo set: 2 (operator's W315 mandate explicitly added addyosmani + mksglu/context-mode).

**EXECUTED**:
- ✅ `context-mode@context-mode` updated v1.0.136 → **v1.0.141** for scope project (restart required)
- ✅ Both audits written + 2 basic-memory T6 verdicts persisted

**BLOCKED**:
- ❌ `agent-skills@addy-agent-skills` install — `claude plugin install` v2.1.144 internally uses SSH `git@github.com:` (Permission denied: publickey). Operator-AI surfaced.

---

## 1. Stream A — addyosmani/agent-skills

**Owner**: `af2d8b45c5d39295b` / **File**: `W315-STREAM-A-ADDYOSMANI-AGENT-SKILLS.md` (~45 KB / 12 sections)

### Verdict: **T1 INSTALL** (supersedes W314 T2/T1-candidate)

| Metric | Value | Threshold |
|---|---:|---|
| **install_score** | **4.857 / 5.0** | ≥4.5 ship-gate cleared with margin 0.357 |
| **pattern_score** | 4.286 / 5.0 | T2-vendor-fork territory |
| **Hard-caps fired** | 0 | clean |
| **Phase-5 5/5 gates** | PASS | ✓ |
| **MCP-family count** | 9 | T2 floor ≥9 MET; T1 floor ≥11 MISSED by 2 (pragmatic ratification per disagreement[1]) |

### CRITICAL silent-degrade finding (P0)

**Marketplace registered + cache pulled, plugin NOT enabled.** `addy-agent-skills` marketplace was added at `2026-05-17T15:16:34Z` (W314 wave) and cache exists at `Z:/claude-sota-installed/.claude/plugins/marketplaces/addy-agent-skills/`. But `agent-skills@addy-agent-skills` is NOT in `enabledPlugins`. Runtime pays disk cost for **zero behavioral value**.

**Operator action AI-W315-A-1 (P0 BLOCKED — SSH-clone bug)**:
- Intended: `claude plugin install agent-skills@addy-agent-skills --scope project`
- Failure: CC v2.1.144 plugin-install pathway uses `git@github.com:` SSH; no SSH-key configured for github.com in this environment
- Workaround paths:
  - (a) Operator configures GitHub SSH key (`ssh-keygen` + add to github.com profile)
  - (b) Operator manually clones via HTTPS into the cache path then registers via `claude plugin add-local`
  - (c) Wait for CC patch that allows `--source https` or honors git insteadOf rewrites

### Other Stream A findings

- D27 newly-anchored at **5** (closes W314 TBD cascade-degrade gap; context7-indexed source-rep=High + 4 ecosystem forks + 6 independent mirrors)
- D10 duplication = **5** (23 addyosmani skills are content-orthogonal to 23 local + 64 plugins; zero name collisions)
- 5 additional operator-AIs forwarded W316 (V1-V6 priority LOW-MED — alignment, overlap audit, sandbox surface)

### Basic-memory T6

`main/verdicts/w315-addyosmani-agent-skills` — overwrote any W314 prior verdict with W315 T1 ratification.

---

## 2. Stream B — mksglu/context-mode

**Owner**: `aa7b99b8a8db1e77e` / **File**: `W315-STREAM-B-MKSGLU-CONTEXT-MODE.md` (~13 KB / 15 sections)

### Verdict: **T1 HOLD-INSTALLED** (ratifies W79 Ship 1A install verdict)

| Metric | Value | Threshold |
|---|---:|---|
| **install_score** | **4.606 / 5.0** | ≥4.5 cleared with margin 0.106 |
| **Phase-5 5/5 gates** | PASS | ✓ |
| **Adversarial 3/3** | RATIFY | ✓ |
| **HIGH silent-fallback findings** | 0 | clean |
| **MCP-family count** | 12 | T1 floor ≥11 cleared with margin |

### EXECUTED this session

✅ **`/plugin update context-mode@context-mode --scope project`** completed: **v1.0.136 → v1.0.141** (5-version pin lag closed; published npm <3h before audit). Restart required to apply hooks/MCP-server changes.

### Key Stream B findings

1. **License unchanged**: ELv2 source-available (same W79 CR-9 risk MED; permissive for runtime use-case; **more permissive than GitNexus's PolyForm-Noncommercial**)
2. **POSITIVE silent-fallback discipline**: maintainer (mksglu) explicitly fixes silent fallbacks in changelog (v1.0.139 native-bridge zod-skip; v1.0.140 plugin+legacy-mcp zero-tool silent; v1.0.141 ctx-upgrade silent-success-on-clone-failure). Maintainer rejected `z.coerce.boolean()` due to `Boolean("false")===true` silent-invert risk. **Exemplary fail-loud discipline.**
3. **CR-2 compliant**: project-owned shim `context-mode-cache-heal.mjs` = 28 LOC / 1656 bytes (≤2 KB cap), cite-anchored to `anthropics/claude-code#46915` per CLAUDE.md L19 sanctioned exception
4. **CR-9 equivalent**: plugin-supplied form (not `.mcp.json`); `installed_plugins.json` locks SHA-pinned version
5. **Adoption tier-1**: 15,135★ in 3 months, HN #1 + 570pts, 37,577 wk-downloads, OSV `{}` zero CVEs, **1330 lifetime calls in this runtime alone = $165.83 demonstrable utility**
6. **D16=2 bus-factor floor** (mksglu solo: 1088 commits vs 8 contribs 5-36 each); mitigated by ELv2-permitted fork + deterministic esbuild rebuild lane (operator-AI INSURANCE)
7. **Live-state probe Δ1**: `ctx_doctor` returned **all 11 PASS / 0 FAIL / 0 WARN** (apart from version-drift advisory — now closed)

### Operator action queue (Stream B AIs)

- ✅ **AI-W315-B-1 HIGH**: `/plugin update context-mode` → **EXECUTED**
- ⏸️ AI-W315-B-2 LOW: housekeep `hooks.json.pre-w276b-fix` plugin-cache artifact post-upgrade
- ⏸️ AI-W315-B-3 INFO: `tail -F ~/.claude/context-mode/hook-errors.log` for hook diagnostic visibility
- ⏸️ AI-W315-B-4 INSURANCE: document fork-rebuild lane as D16=2 bus-factor hedge (ELv2 permits)

### Basic-memory T6

`main/verdicts/w315-mksglu-context-mode-re-audit` — ratification persisted.

---

## 3. NEW silent-fallback finding (CLI-level, runtime-wide)

### F-W315-CLI-1 (HIGH): `claude plugin install` uses SSH-clone for github sources

- **Evidence**: 2 attempts (with/without `--scope project`) to `claude plugin install agent-skills@addy-agent-skills` failed identically with:
  ```
  Failed to clone repository: Cloning into 'Z:\claude-sota-installed\.claude\plugins\cache\temp_github_*'...
  git@github.com: Permission denied (publickey).
  ```
- **Cross-check**: `git ls-remote https://github.com/addyosmani/agent-skills` succeeds; git config has NO `insteadOf` URL rewrites; `GIT_SSH`/`GIT_SSH_COMMAND` env unset
- **Conclusion**: CC v2.1.144 CLI **internally constructs SSH URL** for github-source plugin clones, NOT HTTPS
- **Impact**: any github-source plugin install fails for operators without SSH key on github.com; **silent-fallback** because the install command exits 1 but the marketplace+cache state remains polluted (marketplace registered, dir present, plugin not enabled)
- **Workaround OR upstream fix path**:
  - (a) Operator configures GitHub SSH key
  - (b) Upstream CC adds `--source https|ssh` flag option
  - (c) Upstream honors git config `insteadOf` rewrites
- **Operator action AI-W315-CLI-1 (HIGH)**: file upstream issue at `anthropics/claude-code` if not already known; surface SSH-key requirement in CLAUDE.md as install-pathway prereq

### F-W315-CLI-2 (RE-CONFIRMATION 5th-time): GitHub MCP `search_repositories` silent-fallback

Convergent with W312-D F1 + W313-D + W314-B + W315-B. The MCP `search_repositories` returns 0 hits on query-syntax searches even when results exist (verified via direct `repo:owner/name` REST query). Pattern: MCP tool returns empty result silently rather than fail-loud on internal query-parser error.

**Operator action AI-W315-CLI-2 (MEDIUM)**: file upstream `anthropics/claude-code-action` issue OR add per-runtime workaround note in `goal-prompt-synthesis` SKILL.md to always fall back to `gh api /search/repositories` REST when MCP returns 0 hits.

---

## 4. Cross-wave invariant verification (post-W315)

| Rule | Status | Evidence |
|---|---|---|
| **R1 trusted plugins** | ✓ | both audited repos are operator-vetted; sca-v7 5-gate Phase-5 passes |
| **R2 hooks** | ✓ | context-mode `.mjs` shim within ≤2KB sanctioned exception; no new self-invent |
| **R3 cite-anchored agents** | ✓ | unchanged |
| **R4 no self-invent rules** | ✓ | self_invented_count: 0 preserved |
| **R5 safety via permissions** | ⚠️ | `defaultMode: bypassPermissions` carry-over from W311 P-B (operator decision still pending) |

**STOP-gate state**:
- CLAUDE.md ≤50 LOC ✓
- settings.json ≤15 KB ✓
- worktrees ≤3 ✓
- codex `reviewGateEnabled:true` ✓
- 64 plugins (will become 65 once agent-skills installs successfully)
- 23 local skills

---

## 5. Files shipped W315

W315 (this wave):
- `W315-STREAM-A-ADDYOSMANI-AGENT-SKILLS.md` (~45 KB)
- `W315-STREAM-B-MKSGLU-CONTEXT-MODE.md` (~13 KB)
- `W315-SYNTHESIS.md` (this file)
- basic-memory T6 verdicts × 2 (`main/verdicts/w315-addyosmani-agent-skills` + `main/verdicts/w315-mksglu-context-mode-re-audit`)
- plugin update: `context-mode 1.0.136 → 1.0.141`

---

## 6. Verdict-ledger row drafts (rows 61-62)

```markdown
| 61 | W315 | 2026-05-19 | `addyosmani/agent-skills` | **T1 INSTALL** (BLOCKED: SSH-clone bug) | install 4.857 / pattern 4.286 | n/a (PATTERN floor still met) | 0 hard-caps fire; 5/5 Phase-5 gates PASS | ACTIVE — operator-action SSH-key OR manual-clone workaround | n/a | First fresh sca-v7 audit. Marketplace registered W314 (lastUpdated 2026-05-17) but plugin never enabled; cache exists. Stream A 9/9 MCP families (T1 floor 11+ missed by 2; pragmatic ratification per disagreement[1] — W314 explicitly named gap-closure path). T6: `verdicts/w315-addyosmani-agent-skills`. |
| 62 | W315 | 2026-05-19 | `mksglu/context-mode` (re-audit) | **T1 HOLD-INSTALLED** (ratifies W79 Ship 1A) | install 4.606 | n/a | 0 hard-caps; 5/5 Phase-5; 3/3 adversarial RATIFY | ACTIVE — UPDATED v1.0.136 → v1.0.141 this wave | n/a | ELv2 source-available unchanged (CR-9 MED, permissive). POSITIVE silent-fallback discipline (maintainer fixes them in CHANGELOG). 12 MCP families (T1 floor 11+ cleared with margin). D16=2 bus-factor mitigated by fork-rebuild lane. 1330 calls in runtime = $165.83 demonstrable utility. T6: `verdicts/w315-mksglu-context-mode-re-audit`. |
```

---

## 7. Codex GPT-5.5 ship gate

Per persistent operator mandate "ship with convergence sota insights and e2e with gpt 5.5": codex Stop-hook auto-fires session-end (W280a). Explicit pre-ship gate via `claude --bg -- /codex:adversarial-review --wait`.

**Tiebreakers queued for codex**:
1. F-W315-CLI-1 (SSH-clone install bug) — confirm upstream-issue vs operator-config classification
2. Stream A T1 verdict at 9/9 MCP families (below ideal 11 for T1) — Phase-5 gates all PASS and disagreement[1] explicit; codex to ratify the pragmatic T1
3. agent-skills enable-or-defer decision (workaround paths a/b/c)

---

## 8. W316 next-wave preview

- AI-W315-A-1: agent-skills install workaround (operator SSH-key setup OR `claude plugin add-local` manual cache path)
- AI-W315-A-2..6: alignment / overlap audit / sandbox surface (5 LOW-MED items)
- AI-W315-B-2..4: hooks housekeep / log-tail / fork-rebuild documentation
- AI-W315-CLI-1: file `anthropics/claude-code` upstream issue (SSH-clone behavior)
- AI-W315-CLI-2: file `anthropics/claude-code-action` upstream issue + `goal-prompt-synthesis` workaround note (GitHub MCP search_repositories 5th-time-convergent silent-fallback)
- Carry items from W314 12-operator-AI forward queue (per CLAUDE.md L40 status appendix)
