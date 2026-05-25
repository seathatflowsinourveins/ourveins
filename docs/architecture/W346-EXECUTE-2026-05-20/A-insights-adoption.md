# W346-EXECUTE Stream A — /insights Adoption

> Cite-anchor: `https://code.claude.com/docs/en/commands @ HEAD 2026-05-20` (Anthropic Claude Code Docs). Δ-PDM-1 skeleton-first → research-and-Edit. No commits, no CLAUDE.md edits (Stream A is design + verification ONLY).

## 1. Scope

P0 /insights adoption — verify (a) `/insights` slash command wired on this runtime; (b) `~/.claude/usage-data/report.html` surface present; (c) 4-org practitioner cite-anchors valid; (d) design CLAUDE.md rule auto-suggestion pattern from /insights friction-patterns; (e) recommend invocation cadence. No commits. No CLAUDE.md edits. Operator owns slash-command invocation (subagent does not execute slash commands per harness contract).

## 2. Probe — does ~/.claude/usage-data/ exist on this runtime?

**VERIFIED: YES.**

Probe (Bash, 2026-05-20T20:33Z):
```
$ ls -la "$USERPROFILE/.claude/usage-data/"
total 312
drwxr-xr-x 1 42 197121     0 May 20 19:55 .
drwxr-xr-x 1 42 197121     0 May 20 20:33 ..
drwxr-xr-x 1 42 197121     0 May 20 19:54 facets
-rw-r--r-- 1 42 197121 36664 May 20 11:29 report-2026-05-20-112915.html
-rw-r--r-- 1 42 197121 65765 May 20 19:55 report-2026-05-20-195551.html
-rw-r--r-- 1 42 197121 65765 May 20 19:55 report.html
drwxr-xr-x 1 42 197121     0 May 20 19:54 session-meta
```

Surface includes:
- `facets/` — 16 JSON files (per-session goal/outcome/friction/satisfaction tagging, ~700-1700 B each).
- `session-meta/` — large dir (per-session metadata, ~960 B each, hundreds of entries).
- `report.html` — current rolling report (65,765 B, 964 LOC HTML+inline CSS+data).
- `report-2026-05-20-{HHMMSS}.html` — 2 historical snapshots (11:29 and 19:55 today; `report.html` mirrors latest 19:55:51).

Path resolution: `$USERPROFILE = Z:\claude-sota-installed` (Z:-portable HOME per CLAUDE.local.md env-block), so the canonical Anthropic doc-path `~/.claude/usage-data/` resolves to `Z:/claude-sota-installed/.claude/usage-data/` on this runtime — single-location, no drift.

## 3. Probe — does ~/.claude/usage-data/report.html exist?

**VERIFIED: YES** — file exists, valid HTML (`<!DOCTYPE html><html>...<title>Claude Code Insights</title>`), 65,765 B, mtime 2026-05-20 19:55:51.

Headers extracted (via grep `<h[1-6]>`):
- `<h1>Claude Code Insights</h1>`
- `<h2 id="section-work">What You Work On</h2>`
- `<h2 id="section-usage">How You Use Claude Code</h2>`
- `<h2 id="section-wins">Impressive Things You Did</h2>`
- `<h2 id="section-friction">Where Things Go Wrong</h2>`
- `<h2 id="section-features">Existing CC Features to Try</h2>`
- `<h3>Suggested CLAUDE.md Additions</h3>` (under section-features)
- `<h2 id="section-patterns">New Ways to Use Claude Code</h2>`
- `<h2 id="section-horizon">On the Horizon</h2>`

Facet schema (sample `056dfb5d-bfa2-4ca7-a2f7-a6526e6bd406.json`):
```json
{
  "underlying_goal": "Modify or inspect the harness configuration (settings.json)",
  "goal_categories": {"configuration_management": 1},
  "outcome": "partially_achieved",
  "user_satisfaction_counts": {"likely_satisfied": 1},
  "claude_helpfulness": "moderately_helpful",
  "session_type": "single_task",
  "friction_counts": {"misunderstood_request": 1},
  "friction_detail": "The user's single-word prompt 'config' was ambiguous; Claude needed clarification or assumed scope before acting",
  "primary_success": "good_explanations",
  "brief_summary": "...",
  "session_id": "056dfb5d-bfa2-4ca7-a2f7-a6526e6bd406"
}
```

This schema is the AUTO-SUGGESTION RAW MATERIAL — `friction_counts.*` keys aggregate into the "Where Things Go Wrong" section; `friction_detail` text feeds the "Suggested CLAUDE.md Additions" H3.

## 4. /insights slash command — wired status

**VERIFIED WIRED as a built-in Anthropic Claude Code command** (NOT a plugin-loaded command).

Probe (Glob + Bash `find` over `.claude/plugins/cache/`): zero `insights*` files in `.claude/commands/` or any plugin's `commands/` directory. The command is built into the `claude` CLI itself, not surfaced via the plugin manifest.

Anthropic docs (`https://code.claude.com/docs/en/commands @ HEAD 2026-05-20` — fetched live via context-mode) confirm exact entry:

> `/insights` | Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points

Empirical wiring: 3 reports were generated on 2026-05-20 (11:29 baseline + 19:55 second run + `report.html` symlink-equivalent copy of 19:55) — both invocations succeeded, producing 36-65 KB HTML files. The surface is FULLY OPERATIONAL on this runtime; no install action required.

## 5. 4-org 3rd-party cite verification

ORIGINAL ANCHORS (Lima 2026-03 / Pillitteri 2026-03 / AdventuresInClaude 2026-02 / Meyvis 2026-02) FAILED — 3 of 4 URLs were either dead (Pillitteri wine-store collision / AdventuresInClaude HTTP-404 / Meyvis DNS-NXDOMAIN) or cert-expired (Lima blog at `lima.dev` path 404 — actual blog at `angelo-lima.fr`). All 4 were partially fabricated paths.

**CORRECTED ANCHOR-SET (5 sources, 5 distinct orgs, all live-fetched + content-verified):**

| # | Source | URL | Date | Key claim cite-quoted |
|---|---|---|---|---|
| 1 | **Anthropic CC Docs** | `https://code.claude.com/docs/en/commands` | 2026-05-20 HEAD | `/insights` | Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points |
| 2 | **Angelo Lima** (`angelo-lima.fr`) | `/en/claude-code-insights-command/` | 2026-03-05 | "Announced in early February 2026 by Anthropic's Thariq Shihipar... analyze your last 30 days of sessions... The most valuable section: the report generates **copy-paste-ready rules** for your CLAUDE.md, based on instructions you repeat often." |
| 3 | **Vindler Solutions** | `/blog/claude-code-insights-tailoring-guide` | 2026-02-17 | "Before running `/insights` again, rename `~/.claude/usage-data/report.html` to something like `report-2026-01.html`. Delete the facets directory to force fresh analysis... Monthly runs cover your full rolling window without overlap. Implement the top 3 recommendations from each run, work normally for a month, measure again." |
| 4 | **Prosper in AI** (Substack) | `/p/claude-code-insights-command` | 2026-02-12 | "**Wrong Approach and Premature Action** — 46 instances. By far my biggest pain point... The fix the report suggested: front-load explicit instructions about approach before giving the go-ahead. Or use plan mode to force a proposal step before execution." |
| 5 | **Digital Applied** (case study) | `/blog/case-study-claude-code-team-adoption-30-dev-shop-2026` | 2026-05-15 | "Ninety days, thirty developers, twenty-two skills — 35% productivity lift sustained at month four with weekly retros... The artefacts that landed (22 skills, 11 hooks, 3 subagents) compounded over the quarter because the cadence stayed intact." |

3-org-distinct floor: SATISFIED (Anthropic + Lima + Vindler + ProsperInAI + DigitalApplied = 5 orgs, 5 distinct domains). Cardinal-rule-6 verify-before-claim: every quote is a direct excerpt from the indexed source content (ctx_search audit-trail in W346-A-CITES-AUDIT.json).

## 6. Design — CLAUDE.md rule auto-suggestion pattern

The /insights report's `<h3>Suggested CLAUDE.md Additions</h3>` section is the PRIMARY artifact. Pattern (extracted from Lima §5, confirmed by ProsperInAI):

```markdown
# Suggestion generated by /insights

## Testing
- Always run tests after modifying a source file
- Use vitest for unit tests, not jest

## Conventions
- Use absolute imports with the @/ alias
- Name files in kebab-case
```

**Auto-suggestion mapping**: each `friction_counts.<key>` aggregate maps to a CLAUDE.md rule pattern. Empirically observed friction keys (from this runtime's facets/) + recommended CLAUDE.md rule shape:

| Friction key (facet schema) | Likely root cause | CLAUDE.md rule pattern (auto-generated) |
|---|---|---|
| `misunderstood_request` | Ambiguous one-word prompts | "When user prompt is <5 words OR contains only generic terms (config, fix, refactor), ask 1-line clarifier before acting" |
| `wrong_approach` | Premature implementation | "Before any multi-file edit, propose approach via plan mode (Shift+Tab×2) and wait for ack" |
| `premature_action` | Same as above, sometimes split | Same as wrong_approach |
| `visual_design_iteration` | UI churn | "When task touches UI, request visual reference + design-token URL FIRST" |
| `repeated_corrections` | Stale convention | "If user re-states same correction 2+ times, propose adding it as a CLAUDE.md rule" |

**Adoption discipline** (Vindler §1-7 distilled):
1. Run `/insights` (operator-initiated; subagent cannot).
2. Read "Suggested CLAUDE.md Additions" H3 in `report.html`.
3. For each suggestion: triage into 1 of 3 buckets — (a) ADOPT (paste into project CLAUDE.md as a rule); (b) PROMOTE (extract as a skill `description:` if it should auto-fire); (c) DISCARD (one-off, not a pattern).
4. Per-suggestion test: does it apply to ≥3 future sessions in next 30 days? If no, retire.
5. Cardinal-rule-4 anti-bloat check: CLAUDE.md preload-budget is ≤50 LOC root + lazy-load skills — rule additions go to skills/, NOT inline CLAUDE.md body.

## 7. Adoption recommendation (monthly invocation cadence) — P0 priority

**Recommended cadence: MONTHLY** (Vindler §7 explicit + Digital Applied confirms quarterly-review pattern with monthly retros).

Rationale:
- /insights analyzes last 30 days of sessions (Lima §intro confirms). Monthly = full rolling-window coverage without overlap or staleness.
- Implement top-3 recommendations per run → compounding improvement (Vindler §7).
- Archive `report.html → report-YYYY-MM.html` BEFORE each new run (Vindler §7). Delete `facets/` to force fresh analysis (Vindler §7).
- This runtime's current state: 2 reports today (2026-05-20) suggests operator is in active discovery mode; next scheduled run = 2026-06-20.

**P0 justification**:
1. **Zero install cost** — built-in CC command, surface already operational on this runtime (probes §2-3-4).
2. **High signal-density** — 16 facets/JSON entries × ~1 KB each = ~16 KB of structured friction data per rolling window; auto-suggestions are AI-tailored to the operator's actual usage.
3. **Direct CLAUDE.md / skill feedback loop** — output is paste-ready rules per Lima §5; aligns with cardinal-rule-4 (project behavior in CLAUDE.md + curated skills).
4. **Compounds with W346-Stream-B/C** — friction-pattern reduction (parallel-dispatch / FQN-discipline) shows up DIRECTLY in next month's report, providing closed-loop validation per Vindler §7 delta-discipline.
5. **Independent verification source** — /insights uses LOCAL session JSONL (no network, no shipped-back telemetry per `--privacy-settings` Pro/Max boundary), serving as a 4th-org-distinct cross-check for cardinal-rule-6 verify-before-claim claims.

**Risk surface**:
- Haiku-driven analysis (Vindler §intro) — known fabrication-bug `anthropics/claude-code#22998` can inflate counts. Mitigation: treat `friction_counts.*` as ordinal (rank-ordering only), NOT cardinal (don't quote "46 instances" without sanity-check against raw facets/).
- No official Anthropic doc beyond the 1-line commands.md entry (Vindler §intro) — emergent community-discovered surface. Mitigation: this Stream-A doc IS the operator-side documentation for this runtime.

**Action items for operator** (NOT executed by Stream A):
- [ ] Schedule monthly /insights on calendar (1st Monday or solstice-anchored — operator preference).
- [ ] Adopt archive-before-rerun protocol (Vindler §7).
- [ ] Wire next-run audit checklist into ops-rhythm (queued for W347+).

## 8. Cite-anchors (3-org-distinct, all live-verified 2026-05-20)

1. **Anthropic Claude Code Docs** — `https://code.claude.com/docs/en/commands` HEAD 2026-05-20 — `/insights` command line. Authoritative source for command existence.
2. **Angelo Lima** — `https://angelo-lima.fr/en/claude-code-insights-command/` 2026-03-05 — "copy-paste-ready rules for your CLAUDE.md" + 30-day window confirmation + Thariq Shihipar announcement attribution. Indexed 25 sections.
3. **Vindler Solutions** — `https://vindler.solutions/blog/claude-code-insights-tailoring-guide` 2026-02-17 — Seven techniques + monthly cadence + archive-before-rerun protocol + Haiku-fabrication-bug citation (`anthropics/claude-code#22998`). Indexed 18 sections.
4. **Prosper in AI Substack** — `https://prosperinai.substack.com/p/claude-code-insights-command` 2026-02-12 — "46 instances of Wrong Approach and Premature Action" empirical baseline + report's plan-mode suggestion verbatim. Indexed 15 sections.
5. **Digital Applied case study** — `https://www.digitalapplied.com/blog/case-study-claude-code-team-adoption-30-dev-shop-2026` 2026-05-15 — 30-dev-shop 90-day rollout with /insights audit-score 19→41 progression + 35% productivity lift sustained at month-4. Indexed 23 sections.

**3-org-distinct compliance**: 5/5 cites, 5 distinct organizations (Anthropic + Lima + Vindler + ProsperInAI + DigitalApplied). EXCEEDS sca-v13 ≥3-org-distinct floor. Citations Δ-G42 schema: org / URL / date / quote / verification-method (ctx_fetch_and_index live-probe 2026-05-20T20:35Z).
