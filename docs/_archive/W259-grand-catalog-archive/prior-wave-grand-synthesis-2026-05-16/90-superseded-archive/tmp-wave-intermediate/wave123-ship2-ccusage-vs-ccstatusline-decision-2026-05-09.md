# Wave 123 Ship 2 — ccusage vs ccstatusline Decision

**Date**: 2026-05-09
**Agent**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g) — STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate; cross-model gate NOT structurally satisfied for this dispatch)
**agentId**: a6d186dfecabf2cd9
**Tokens**: 378454 / Tool uses: 24 / Duration: 187s
**Worktree**: Z:\claude-sota-installed\.claude\worktrees\agent-a6d186dfecabf2cd9
**Trigger**: Wave 122 Mia v3 surfaced 3 sub-claim issues blocking Pattern A apply on Agent A's `npx ccusage@latest statusline` prescription

---

## Mia OVER claim resolution

### #1 Package mismatch — RESOLVED (Mia correct, Agent A WRONG)

| Package | Maintainer | Repo | Stars | License (npm canonical) | Created | Last push |
|---|---|---|---|---|---|---|
| `ccusage` | ryoppippi | github.com/ryoppippi/ccusage | 13,983 | MIT | 2025-05-29 | 2026-05-09 |
| `ccstatusline` | sirmalloc (Matthew Breedlove) | github.com/sirmalloc/ccstatusline | 8,933 | MIT | 2025-08-08 | 2026-05-04 |

**They are DIFFERENT packages.** Both maintained by independent named-author maintainers.

### #2 License — RESOLVED (Mia partially correct, Agent A correct on ccusage)

- **ccusage LICENSE direct read** (`https://raw.githubusercontent.com/ryoppippi/ccusage/main/apps/ccusage/LICENSE`): `MIT License Copyright (c) 2025 ryoppippi`
- **ccstatusline LICENSE direct read** (`https://raw.githubusercontent.com/sirmalloc/ccstatusline/main/LICENSE`): `MIT License Copyright (c) 2025 Matthew Breedlove`
- **gh API "Other" was misleading** for ccusage — monorepo has license at `apps/ccusage/LICENSE` (not root). npm registry `MIT` is canonical for installed package.
- **BOTH MIT-license-clean** per CR-9 permissive-license requirement.

### #3 Beta status — RESOLVED (Beta persists; ccstatusline more battle-tested)

- ccusage latest release `v18.0.11` (2026-04-19) — bugfix only (offline pricing data + markdown-it type mismatch). No statusline graduation. 108 versions total.
- ccstatusline latest `v2.2.12` (~1 week ago) — 80 versions, dedicated statusline package since 2025-08-08 (9+ months mature).
- Agent A's prescription assumed Beta was production-ready — REFUTED.

---

## SRA D1-D10 Convergence Gate

### ccusage statusline (Beta subcommand)
- **D1 axis-1 multi-org**: ryoppippi single-author org. **PARTIAL** (no convergence-gate Axis 1 ≥3 orgs).
- **D2 axis-2 named-T2**: ryoppippi named-author. v10/v64/v65 kits cite as DEFAULT_INSTALL for CLI subcommands. **PASS for CLI; FAIL for statusline subcommand** (zero kit cites Beta statusline).
- **D3 axis-3 stability**: ccusage 11.6mo age, sustained-active. **PASS**. Statusline subcommand: **Beta — FAIL** (no graduation in latest release).
- **D4 license**: MIT. **PASS**.
- **D5 Probe 4 plugin-namespace**: not in `claude-plugins-official` marketplace. **PASS** (no duplicate).
- **D6 Probe 5 mode-harness-shape**: statusline runs as Claude Code statusLine command. **PASS**.
- **D7 Probe 6 registry**: npm `ccusage@18.0.11` exists. **PASS**.
- **D8 Probe 7.b demand-gate**: claude-sota-installed needs statusline NOW (current `.claude/settings.json` has none). **PASS** demand exists.

### ccstatusline (sirmalloc/ccstatusline standalone)
- **D1 axis-1 multi-org**: sirmalloc single-author org. **PARTIAL** (no Axis 1 ≥3 orgs; same as ccusage).
- **D2 axis-2 named-T2**: cited in v10 EVALUATE_SELECTIVELY, v64+v65 SOTA_REPOS_BEST_OF_BEST_FINAL_LIST. Sibling `Z:/claude-sota` has it INSTALLED + dogfood-validated. **PASS**.
- **D3 axis-3 stability**: 9.0mo age (8/2025-5/2026), 80 versions, sustained-active. **PASS** (>3mo burn-in).
- **D4 license**: MIT. **PASS**.
- **D5 Probe 4 plugin-namespace**: not duplicated. **PASS**.
- **D6 Probe 5 mode-harness-shape**: statusLine command pattern proven in sibling. **PASS**.
- **D7 Probe 6 registry**: npm `ccstatusline@2.2.12` exists. **PASS**.
- **D8 Probe 7.b demand-gate**: same demand as ccusage statusline. **PASS**.

**Differential**: ccstatusline = standalone-purpose package (statusline-only since 2025-08-08); ccusage statusline = Beta secondary subcommand of CLI tool. ccstatusline has 9-month maturity in its primary purpose vs ccusage Beta-status experimental subcommand.

---

## DECISION: Option B — ccstatusline standalone (sibling-validated pattern with CR-9 path-rewrite)

**Rationale**:
1. **CR-12 priority order**: BOTH options are upstream-install (Path A) — no cite-import-AMBER fallback needed. Within Path A, choose mature-stable over Beta.
2. **CR-9 install-risk**: Beta status = 2-round fix-forward expected. ccstatusline = production-stable (avoids unnecessary risk).
3. **Sibling dogfood evidence**: `Z:/claude-sota/.claude/settings.json` proven pattern with 9+ months of operational validation; sibling kit v10 SOTA_REPOS recommends ccusage for `daily/session/blocks` CLI subcommands AND ccstatusline for statusline (separation-of-concerns).
4. **All v6x kits**: zero references to Beta `ccusage statusline` subcommand; consistent split (ccusage CLI for analysis + ccstatusline for statusline).
5. **Future graduation path**: when ccusage statusline graduates from Beta + reaches 90d burn-in, re-audit per `update_triggers` clause.

---

## 1-line install command (CR-9 sibling-bleed defense applied)

Add to `Z:/claude-sota-installed/.claude/settings.json`:

```json
"statusLine": {
  "type": "command",
  "command": "npx --prefer-offline -y ccstatusline@2.2.12 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json",
  "padding": 0,
  "refreshInterval": 10
}
```

**Sibling-bleed defense per CR-9 rewrite**: `Z:/claude-sota/...` → `Z:/claude-sota-installed/...` (paths rewritten before install). Config dir `Z:/claude-sota-installed/.claude/ccstatusline/` to be created via Wave 124 ship; copy sibling `settings.json` (2.5K) as starting baseline, audit for sibling-bleed paths before activation.

**Version pin**: `@2.2.12` (NOT `@latest`) — CR-9 mandate.

---

## Risk band

- **Risk**: LOW (sibling dogfood-validated 9+ months; standalone purpose; npm verified exists; license MIT)
- **2-round fix-forward budget**: 1 round expected (config-only edit + ccstatusline config dir creation; no codex T1 hooks fire on settings.json statusLine field per layered-gates-architecture)
- **Failure mode if wrong**: revert settings.json `statusLine` block (~30 sec)

---

## Mia pre-apply outcome

- **Sub-claim #1 (package mismatch)**: VERIFIED via npm view + gh repo view. Mia correct — different packages.
- **Sub-claim #2 (license)**: VERIFIED via direct LICENSE file read. ccusage `apps/ccusage/LICENSE` = MIT (gh API "Other" misleading due to monorepo path; npm canonical = MIT).
- **Sub-claim #3 (Beta status)**: VERIFIED via gh release view. v18.0.11 has zero statusline mentions; Beta persists.

**Mia n+1 advance**: 3/3 sub-claims resolved BEFORE Wave 124 apply. Pattern A admissibility filter PASS for Option B; Agent A's Option A REFUTED-OVER (Beta + sibling-bleed defense gap + zero kit citation).

---

## Forward refs

- **Wave 124 ship plan**: edit `.claude/settings.json` with the 5-line statusLine block above; create `.claude/ccstatusline/settings.json` (copy from sibling, sibling-bleed audit); commit with cite trail (cardinal-rule-1 + CR-9 + CR-12).
- **Update trigger**: re-audit when ccusage releases statusline graduation note OR sirmalloc/ccstatusline ships breaking change OR Anthropic OFFICIAL marketplace ships native statusline plugin.

DECISION: Option B
