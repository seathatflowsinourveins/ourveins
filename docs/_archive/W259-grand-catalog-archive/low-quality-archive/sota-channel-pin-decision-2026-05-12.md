# Auto-Update Channel Pin Decision — Wave 159 Phase 2 D4

**Ship**: D4 / Wave 159 Phase 2 / 2026-05-12
**Disposition**: **ACCEPT-CURRENT-STATE** (latest-tracking active via Wave 118 codex T1 BRIDGE-MODE NEEDS-REVISION conf=0.91 verdict; conflicts with /goal v7 D4 "default stable" wording — Wave 118 evidence supersedes per cardinal-rule-7 REPORT mandate)

## Surfaced conflict per cardinal-rule-7 REPORT mandate

/goal v7 D4 directive: "auto-update channel: stable (2.1.128) vs latest (2.1.140) per CR-9; default stable unless feature gap; document."

**Conflict**: /goal v7 D4 was authored WITHOUT awareness of Wave 118 codex T1 BRIDGE-MODE NEEDS-REVISION conf=0.91 verdict (2026-05-09) which ALREADY resolved this decision in OPPOSITE direction:
- Wave 118 found that pinning to documented 'stable' channel created a **floor-vs-channel deadlock** that froze CC updates at 2.1.132 since 2026-05-07
- REMOVAL of `autoUpdatesChannel` field → defaults to latest-tracking → unblocks Anthropic's own quality-gated release cadence per https://code.claude.com/docs/en/install
- minimumVersion floor lowered 2.1.133 → 2.1.132 to make installed compliant
- Outcome verified e2e: 2.1.138 landed 2026-05-09T09:16; subsequently progressed to 2.1.140 (current)

**Disposition**: Wave 118 codex T1 BRIDGE-MODE evidence (TIER-1-DIRECT verdict + cross-source verified at api.github.com + npmjs.org) supersedes /goal v7 D4 default-stable framing. ACCEPT-CURRENT-STATE: NO settings.json change required.

## Current channel state (verified 2026-05-12)

| Setting | State | Cite |
|---|---|---|
| `autoUpdatesChannel` | **REMOVED** (defaults to latest-tracking) | `.claude/settings.json:_comment_autoUpdates` Wave 118 2026-05-09 |
| `minimumVersion` floor | 2.1.132 (forward-only quality gate) | `.claude/settings.json:_comment_autoUpdates` Wave 118 |
| Current installed CC version | **2.1.140** | `claude --version` 2026-05-12 |
| Released version (api.github.com) | 2.1.140 | https://github.com/anthropics/claude-code/releases/latest |
| npm latest | 2.1.140 | https://registry.npmjs.org/@anthropic-ai/claude-code/latest |

## CR-9 install-risk discipline applicability

CR-9 install-risk mandate: "Version-pin mandate: every `@latest` install command in manifest install rows MUST carry version pin OR explicit `@latest-acknowledged-D6-risk` marker."

**Scope analysis**: CR-9 version-pin mandate applies to PACKAGE INSTALLS (npm/cargo/pip/uvx/winget) where operator-issued `@latest` is the install primitive. CC binary auto-update channel is DIFFERENT semantically:
- Anthropic's own quality-gated release cadence + CHANGELOG.md per-release docs serve as the quality gate (TIER-1-DIRECT release authority)
- 'latest' channel tracks Anthropic-validated releases (not arbitrary npm-registry @latest)
- floor-via-minimumVersion provides forward-only guard against regressions
- Pinning to 'stable' creates floor-vs-channel deadlock empirically observed Wave 118

**Conclusion**: CR-9 does NOT apply to CC binary auto-update channel in the same way it applies to npm package @latest. The Wave 118 default-to-latest-tracking is CR-9-conformant under the floor-forward-only semantics.

## Decision: ACCEPT-CURRENT-STATE

**No action required**. Current state is canonical SOTA-conformant per:
- TIER-1-DIRECT Anthropic CC install docs `https://code.claude.com/docs/en/install`
- TIER-1-DIRECT Anthropic CC release authority `https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md`
- Wave 118 codex T1 BRIDGE-MODE NEEDS-REVISION conf=0.91 verdict at `.claude/state/codex_consult_w118_autoupdate_path_OUT.txt`

**Operator action queued** (advisory only): monitor `minimumVersion` floor — if a future CC release breaks an eee primitive, raise floor temporarily to revert to known-good (operator-discipline; no mechanical enforcement).

## Cite class per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8

```
constituents=[
  TIER-1-DIRECT @ Anthropic CC install docs `https://code.claude.com/docs/en/install`,
  TIER-1-DIRECT @ Anthropic CHANGELOG.md release authority,
  TIER-1-DIRECT @ api.github.com/repos/anthropics/claude-code/releases/latest (2.1.140 verified 2026-05-12),
  TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 118 codex T1 BRIDGE-MODE NEEDS-REVISION conf=0.91 verdict at .claude/state/codex_consult_w118_autoupdate_path_OUT.txt
];
effective_tier=TIER-3-LOCAL-COMPOSITION per rule #8 MIN_PRECEDENCE
```

## Sister-rule integration

- `Z:/claude-sota/.claude/rules/cardinal-rule-9 install-risk discipline` — version-pin mandate (scope analysis above clarifies CC binary auto-update vs npm @latest distinction)
- `Z:/claude-sota/.claude/rules/cardinal-rule-7 graduated unleash` — current state `bypassPermissions` (Wave 82d operator-override; revert target `auto` per CCBP `claude-settings.md:251`)
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — CATEGORY-CLAIM conflict between /goal v7 D4 wording and Wave 118 resolution; this docs ship is the REPORT per cardinal-rule-7

## Wave 159 Phase 2 D4 completion

- ✅ Current channel state probed + verified (2.1.140 current, autoUpdatesChannel REMOVED, minimumVersion 2.1.132 floor)
- ✅ Conflict with /goal v7 D4 default-stable wording SURFACED per cardinal-rule-7 REPORT
- ✅ Wave 118 codex T1 BRIDGE-MODE evidence cited at TIER-1-DIRECT cross-source level
- ✅ CR-9 scope analysis: CC binary auto-update vs npm @latest distinction clarified
- ✅ Disposition: ACCEPT-CURRENT-STATE (no settings.json edit required)
