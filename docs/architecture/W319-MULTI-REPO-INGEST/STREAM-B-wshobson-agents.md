# STREAM-B-wshobson-agents — W319 Stream B (NEW since W315 only)

## HEAD-SHA-AT-INGEST
- `ece811f23310a37ceb43496dbac0e244fe6845b6` @ 2026-05-02 17:35:12 -0400
- 60 plugins in `plugins/` dir
- Stream A already deep-audited this repo; Stream B scope limited to **NET-NEW since W315**

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L42 (W314-r1) | "wshobson SHA `08ded5e` matches" | HEAD now `ece811f` (4 commits since `08ded5e`: `7d17c75 meigen-ai-design bump`, `c15b108 + 5 review-agent-governance commits`, `159ce68 docs counts refresh`, `ece811f docs SAST link removal`) | **REFRESH** to `ece811f` next CLAUDE.md edit |

## NET-NEW-PATTERNS (since W315 in this repo)

Only commits since 2026-05-15 captured (W315 baseline `08ded5e` was 2026-05-08-ish):

| PRIO | Pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| 1 | `plugins/review-agent-governance/` — new plugin closing "review-bot failure class" (PR #495 by `tomjwxf` Tom Farley) | `plugins/review-agent-governance/.claude-plugin/plugin.json` + `plugins/review-agent-governance/agents/review-policy-author.md` + `plugins/review-agent-governance/policies/review-agent-governance.cedar` | NET-NEW capability: declarative review-bot governance via Cedar policies + 2 commands (`approve-review`, `list-pending`) + hook wired via `protect-mcp@0.5.5`. Directly relevant to our codex cross-model review gate; could augment with policy layer. **PRIO-1 W320 audit.** |
| 1 | `plugins/signed-audit-trails/` — teaching plugin for signed audit trails (PR #496 by `tomjwxf`) | `plugins/signed-audit-trails/` | NET-NEW concept: cryptographically-signed audit trails for agent operations. Our `signed-audit-trails:signed-audit-trails-recipe` skill exists (in installed skills) but this is a **new full plugin** ≠ just skill. SHIP-CONSIDERATION for security hardening. **PRIO-1 W320 audit.** |
| 1 | `plugins/protect-mcp@0.5.5` (pinned via #497) | hooks declared in review-agent-governance reference `protect-mcp@0.5.5` | NET-NEW MCP-server-protection layer; the `protect-mcp` plugin guards MCP tool invocations. We don't currently use; potentially relevant if we encounter MCP-supply-chain attack vector. PRIO-1 W320 audit. |
| 2 | `plugins/brand-landingpage/` — Stitch-backed landing page workflow (PR #509 by tommylauren) | `plugins/brand-landingpage/.claude-plugin/plugin.json` + `plugins/brand-landingpage/skills/brand-landingpage/SKILL.md` + 3 reference files (interview-framework, state-and-pitfalls, stitch-architecture) | NET-NEW workflow: brand → landing-page generation. PRIO-2 (not in our domain). |
| 2 | `meigen-ai-design` plugin bumped to `1.0.5` pin `meigen@1.2.13` (CR-9 version-pin discipline) | `plugins/meigen-ai-design/.claude-plugin/plugin.json` | Existing plugin updated; track if installed. |
| 2 | `hooks/hooks.json` array-schema refactor: hooks moved from object-keyed to array-form (`4510da4`) | (commit ref) | Pattern alignment: ECC's `run-with-flags.js` wrapper and our `.claude/settings.json` array form are now schema-aligned with wshobson. **No action needed** since our settings already use array form. |
| 3 | Supply-chain hardening (`5a36aa2 fix: supply chain hardening — pin actions, images, and fix secret logging` PR #499 by `thc1006`) | (commit ref) | Pattern: pin GitHub Actions to SHAs + fix secret-logging in CI. Mirrors our `gitleaks --exit-code 0 → || exit 2` hardening from W314-r2. Aligned. |
| 3 | `fix: add missing frontmatter to service-mesh-expert and monorepo-architect` (`adde832`) | (commit ref) | Linter-style fix; not net-new feature. |
| 3 | NLPM (Natural Language Programming Manifesto) frontmatter fixes across 5 plugins (PRs #488-#492 by `xiaolai`) | (commit refs) | Frontmatter-consistency fixes. Informational. |
| 4 | `protect-mcp test fixtures + round-trip verification` (`120dc3a` PR #494 by `tomjwxf`) | `plugins/protect-mcp/test/` | Test-fixture pattern for MCP plugin testing. |
| 5 | `docs: README/CLAUDE.md counts refresh (#515)` (`159ce68`) | wshobson/agents/README.md | Counts refresh; informational. |
| 5 | `docs(security-scanning): remove links to unwritten SAST reference and asset files (#516)` (`ece811f`) | wshobson/agents/CHANGELOG | Doc fix. |

## STALE-IN-UPSTREAM
- Stream A's W315 verdict cited `08ded5e` — now superseded by `ece811f`. Stream A audit conclusions remain valid (HOLD-T2); just SHA-refresh.

## HARNESS-FIT
- Decision: HOLD-T2 (sustained); cite-refresh required
- Action: refresh CLAUDE.md L42 wshobson SHA `08ded5e → ece811f`
- License: MIT
- Top 3 candidate plugins worth full sca-v7.2 audit (W320 forward):
  1. `review-agent-governance` (PRIO-1 install candidate; Cedar policy layer + protect-mcp guard)
  2. `signed-audit-trails` (PRIO-1 install candidate for security hardening; complements codex Stop-hook gate)
  3. `protect-mcp@0.5.5` (PRIO-1 candidate for MCP supply-chain guard)

## License
MIT (per plugin manifests)
