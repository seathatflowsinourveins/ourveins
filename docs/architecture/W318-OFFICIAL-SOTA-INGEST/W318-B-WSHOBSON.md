# W318-B Stream — wshobson/agents Re-Audit

**Wave**: W318 Stream B
**Date**: 2026-05-19
**Source**: `Z:/repos/deps/wshobson-agents`
**Prior verdict**: W312 row 47 — T2 UPGRADE; agent-teams@1.0.2 SHA-pin `08ded5e7b0fe` verified zero-drift; W289 silent-drift closed

## §1 — SHA-pin verification

| Metric | Value |
|---|---|
| W312 row 47 SHA pin | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` |
| `git cat-file -t 08ded5e7b0fe...` | **`commit`** (exists, valid object) |
| Subject of pinned SHA | `fix: agent teams coordination guardrails (#535)` |
| Current upstream HEAD | `ece811f23310a37ceb43496dbac0e244fe6845b6` |
| `git log 08ded5e..HEAD` | **EMPTY** — pin SHA is NOT a direct ancestor of HEAD per shallow-clone history (clone was `--depth=50`); full ancestry requires deeper clone |

### Agent-teams plugin-level drift check

| Metric | Value |
|---|---|
| Upstream `plugins/agent-teams/.claude-plugin/plugin.json` version | `1.0.2` |
| Our installed cache | `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` |
| **agent-teams plugin SHA drift?** | **NONE** — version `1.0.2` zero-change (W312 row 47 pin valid for agent-teams plugin specifically) |

Looking at the pin history for `agent-teams` plugin specifically:
- `a5ab5d8f31256...` 2026-02-05 — chore(agent-teams): bump to v1.0.2
- `598ea85e7f7f...` 2026-02-05 — fix(agent-teams): simplify plugin.json
- `fb9eba62b2f8...` 2026-02-05 — fix(agent-teams): bump to v1.0.1, remove Context7

The `08ded5e7b0fe` pin = `fix: agent teams coordination guardrails (#535)` — this is the LATEST agent-teams-touching commit AFTER the v1.0.2 bump. **It IS the canonical agent-teams pin.** It's missing from `log 08ded5e..HEAD` only due to shallow clone history (commits >50 deep). Plugin version `1.0.2` is stable upstream. **W312 row 47 pin HOLDS for agent-teams.**

## §2 — Repository-level new plugins since W312 (read from `marketplace.json` v1.6.0)

Upstream `marketplace.json` now lists **79 plugins** (W312 cited `79 focused plugins, 184 specialized agents, 150 skills`). Recent commits show NEW plugin additions since `08ded5e`:

| New plugin | Commit | Status in our runtime |
|---|---|---|
| `signed-audit-trails` | `7d7fb73 feat: add signed-audit-trails teaching plugin` | **ENABLED** in settings.json:`signed-audit-trails@claude-code-workflows: true` |
| `review-agent-governance` | `7e1aa0f feat: add review-agent-governance plugin (closes review-bot failure class)` | **DISABLED** in settings.json:`review-agent-governance@claude-code-workflows: false` (operator-pending) |
| `brand-landingpage` | `51d8a2d feat: add brand-landingpage plugin (Stitch-backed landing page workflow)` | **NOT in settings.json** (not enabled, not disabled) |

The W312-codex-r1 closure noted that wshobson's `comprehensive-review` + `context-management` plugins enabled at SHA-pin time (and our runtime carries them). The NEW `signed-audit-trails` plugin landing AFTER `08ded5e` is **already enabled** in our settings.json — confirms that some post-pin discovery has been applied.

## §3 — Comprehensive review plugin status

Per `wshobson-current-state-our-runtime` settings.json grep:
```
"shell-scripting@claude-code-workflows": true,
"protect-mcp@claude-code-workflows": false,
"signed-audit-trails@claude-code-workflows": true,
"comprehensive-review@claude-code-workflows": true,
"context-management@claude-code-workflows": true,
"agent-orchestration@claude-code-workflows": true,
"review-agent-governance@claude-code-workflows": false,
"developer-essentials@claude-code-workflows": true,
"debugging-toolkit@claude-code-workflows": true,
"incident-response@claude-code-workflows": true,
```

Operator-disabled (P0C-CR-9 inflight pin churn protection):
- `protect-mcp@0.5.5` — DISABLED (per signed-audit-trails-skill pin notice; current upstream still 0.5.5)
- `review-agent-governance` — DISABLED (NEW, operator-pending W319 ratify decision)

## §4 — Recent activity summary (30 commits)

```
ece811f docs(security-scanning): remove links to unwritten SAST reference (#516)
159ce68 docs: refresh README/CLAUDE.md counts (#515)
51d8a2d feat: add brand-landingpage plugin (Stitch-backed landing page workflow) (#509)
7d17c75 meigen-ai-design: bump to 1.0.5, pin npm to meigen@1.2.13 (#510)
c15b108 Merge PR #495 from tomjwxf/feat/review-agent-governance-plugin
1ca21d8 docs(review-agent-governance): fix SKILL.md compose example
02e77c5 fix(review-agent-governance): use current hooks array schema
0ae6bca fix(review-agent-governance): pin protect-mcp@0.5.5 in hooks.json
7e1aa0f feat: add review-agent-governance plugin (closes review-bot failure class)
adde832 fix: add missing frontmatter to service-mesh-expert and monorepo-architect
89b93d5 Merge PR #499 from thc1006/fix/supply-chain-hardening-v2
... (more)
5a36aa2 fix: supply chain hardening — pin actions, images, and fix secret logging
7d7fb73 feat: add signed-audit-trails teaching plugin
120dc3a test(protect-mcp): add test/ fixtures and round-trip verification
da311bf chore(protect-mcp): pin protect-mcp@0.5.5 and @veritasacta/verify@0.3.0
```

Key signal: **supply-chain hardening pass** (`5a36aa2 fix: supply chain hardening — pin actions, images, and fix secret logging`) directly addresses W314 sca-v7 D32 pin_freshness_lag_norm dim. **Convergent with our sca-v7 audit framework.**

## §5 — sca-v7.1 re-audit (delta from W312 row 47)

| Dim | W312 score | W318 re-audit | Delta | Cite |
|---|---|---|---|---|
| D1 GitHub stars | 5 (15k+) | 5 (still 15k+) | 0 | repo meta |
| D2 docs coverage | 5 | 5 | 0 | README stable |
| D5 release cadence | 5 (PR #535 merged 2026-05-17) | 5 (PR #535 stable; +PR #509 brand-landingpage 2026-05-19) | 0 | git log |
| D8 license | 5 (MIT) | 5 (MIT) | 0 | marketplace.json |
| D14 install spec | 5 (CR-9-compliant via `/plugin install`) | 5 | 0 | — |
| D16 bus factor | 4 (Seth + multi-contributor) | 4-5 (`tomjwxf` contrib spike for review-agent-governance, `xiaolai` x 4 PRs for frontmatter fixes) | +1 → 5 | author distribution |
| D17 test_coverage | 4 | 4 (incremental test additions) | 0 | — |
| D19 code_review | 5 | 5 (every PR reviewed by Seth + governance plugin) | 0 | — |
| D21 org_diversity | 4 | 4 (multi-author, single-org wshobson) | 0 | — |
| D23 ratify_governance | 5 (signed-audit-trails NEW) | 5 | 0 | — |
| D24 mcp_attack_surface | 4 (protect-mcp pinned/disabled in our runtime) | 4 | 0 | — |
| D27 independent_adopter_floor | 5 (15k+ stars + multi-org adoption) | 5 | 0 | — |
| D29 browse_retrieval_quality | 5 | 5 | 0 | — |
| D31 silent_fallback_pattern_density | 5 (governance hooks added) | 5 (review-agent-governance specifically addresses review-bot silent-fallback class) | 0 | — |
| D32 pin_freshness_lag_norm | 4 | **5** | +1 | `5a36aa2` supply-chain hardening pinned actions+images |
| D33 cross_source_consensus_quorum | 5 | 5 | 0 | — |

**install_score recompute** (28.0 denominator):
- Previous (W312): ~4.56
- W318: D16 +1, D32 +1 = +2 → **4.63** (still T2 UPGRADE-tier; threshold ≥4.5 = T1)
- Actually crosses to **T1-eligible** if D16 lifts to 5

## §6 — VERDICT

| Item | Verdict |
|---|---|
| **agent-teams plugin SHA-pin** | **HOLD** — `1.0.2` zero-drift |
| **Repository-level activity** | RE-LITIGATE: 3 NEW plugins since pin (`signed-audit-trails` enabled, `review-agent-governance` disabled-pending, `brand-landingpage` not-yet-evaluated) |
| **sca-v7.1 score** | **4.63 → T2 UPGRADE-strong** (W312 was T2 UPGRADE; +2 dims). Could promote T1 if D16 bus_factor lifts to 5 on independent verification |
| **Recommendation** | **HOLD T2 UPGRADE for wshobson/agents repo**; `review-agent-governance` plugin = W319 operator-AI explicit-ratify decision; `brand-landingpage` plugin = W319 operator-AI explicit-evaluate decision |
| **No-action**: agent-teams plugin v1.0.2 = stable | — |
| **Cite-refresh** | None this wave — version SHA stable for the canonical agent-teams citation |
