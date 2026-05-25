# STREAM-B-affaan-m-everything-claude-code — W319 Stream B

## HEAD-SHA-AT-INGEST
- `b62f80750d85db35b765c675c3866f2037adc5a8` @ 2026-05-19 08:59:55 -0400
- Repo: `affaan-m/everything-claude-code` (ECC v2.0.0-rc.1)
- 60 agents / 33 .agents/skills + 1 .claude/skills / 75 commands / 44 scripts/hooks

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L21 | `everything-claude-code@2.0.0-rc.1 plugin ships its own .claude/rules/` | CONFIRMED — `.claude/rules/everything-claude-code-guardrails.md` + `.claude/rules/node.md` both present | none |
| CLAUDE.md L34 | "ECC SHA `841beea→f3cd00625222`" carry-forward | upstream HEAD now `b62f8075` (`f3cd00625222` was 5 commits ago; supersession chain `841beea → f3cd00625222 → c07276a3 → d135e03d → 7a0645ed → f3cd0062 → 855e8c83 → b62f8075`) | **REFRESH** to `b62f8075` next CLAUDE.md edit |
| CLAUDE.md L41 (W316-r2 S1) | "ECC cache rebuilt at upstream HEAD `8148340a`" | HEAD now `b62f8075`; 8148340a is 8+ commits stale | **REFRESH** during next plugin update |
| CLAUDE.md L41 W316-S6 closure | "ECC HEAD `841beea→f3cd00625222`" | `f3cd00625222` was reachable but is now stale | **REFRESH** to `b62f8075` |

Net drift: ECC SHA appears in 3 places in CLAUDE.md (W316/W317 status), all need refresh to `b62f8075` at next housekeeping.

## NET-NEW-PATTERNS

| PRIO | Pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| 1 | `silent-failure-hunter` agent (W314-r2 Stream-A AI-r2 referenced; not yet wired here) | `agents/silent-failure-hunter.md` exists at `affaan-m/everything-claude-code` | W319 Stream B mandate hunts silent fallbacks; the ECC plugin already ships an agent for exactly this purpose. CLAUDE.md W314 Stream A pattern `ECC silent-failure-hunter agent wire` PRIO-4 — verify presence and consider explicit dispatch in research waves. |
| 1 | `.claude/homunculus/instincts/inherited/everything-claude-code-instincts.yaml` — declarative repo-curation instincts (conventional commits, commit length, hook async/timeout patterns) | `.claude/homunculus/instincts/inherited/everything-claude-code-instincts.yaml` | NET-NEW concept: "instinct" = an upstream-curated, low-confidence (0.7-0.9) behavioral rule keyed by trigger phrase. Inheritable across repos via `/instinct-import`. Pattern is more discoverable than ad-hoc CLAUDE.md prose. **Worth W320 audit for adoption.** |
| 1 | `.claude/research/everything-claude-code-research-playbook.md` — repo-shipped research playbook | `.claude/research/everything-claude-code-research-playbook.md` | We have `goal-prompt-synthesis` + `sota-convergence-audit` skills; ECC ships a research-playbook artifact at the repo level. Worth comparing for net-new patterns. |
| 1 | `scripts/hooks/run-with-flags.js` wrapper — all hooks routed through this so `ECC_HOOK_PROFILE` and `ECC_DISABLED_HOOKS` env-flags work | `.claude/rules/node.md` lines 33-37 | Hook gating pattern: single-wrapper dispatches per `command + flag-env` model — cardinal-rule-2 compliant (single declared CLI command, runtime gating via env). Pattern is more flexible than our current direct-CLI declarations. |
| 2 | `.codex-plugin/` + `.cursor/` + `.opencode/` + `.gemini/` + `.kiro/` + `.qwen/` + `.trae/` cross-harness adapters | top-level dotted-dirs | ECC ships parallel adapter dirs per AI harness for cross-harness portability. We're Claude-Code-only; pattern is informational only. |
| 2 | `RULES.md` — hard "Must Always" / "Must Never" lists | `RULES.md` lines 1-25 | Mirror to CLAUDE.md "Cardinal rules" but at repo-instance level. Could anchor cardinal-rule prose to canonical ECC RULES.md text. |
| 2 | `SOUL.md` — agent identity + orchestration philosophy | `SOUL.md` lines 1-25 | "Agent-First / Test-Driven / Security-First / Immutability / Plan Before Execute" stack — matches our doubt-driven-development + tdd + interview-me triad. PRIO-2 informational. |
| 2 | `WORKING-CONTEXT.md` — running workspace context (hand-off equivalent) | `WORKING-CONTEXT.md` | Similar to mattpocock `handoff` skill; provides session-context-persistence pattern. |
| 3 | `EVALUATION.md` — repo-shipped evaluation report | `EVALUATION.md` | Patterns for evaluation-driven dev; our `harness/eval_harness.py` has Lane D + Lane E; informational. |
| 3 | `agents/silent-failure-hunter.md` (note this was already referenced PRIO-1) | (see above) | (see above) |
| 3 | `commands/feature-dev.md` + `commands/evolve.md` + `commands/checkpoint.md` + `commands/aside.md` | `commands/*.md` (75 total) | Slash-command surface 4x larger than what we expose; many are language-specific (cpp-build, go-build, flutter-build). |
| 3 | `agents/gan-planner.md` + `gan-generator.md` + `gan-evaluator.md` — GAN-style adversarial agent triad | `agents/gan-*.md` | Adversarial pattern — analogous to codex-cross-model gate; agent-side GAN feedback loop. |
| 3 | `agents/harness-optimizer.md` | `agents/harness-optimizer.md` | Self-optimization of the agent harness — meta-pattern; informational. |
| 4 | `scripts/hooks/gateguard-fact-force.js` | `scripts/hooks/gateguard-fact-force.js` | Fact-checking hook (referenced in CLAUDE.local.md L114 GATEGUARD_STATE_DIR env). Informational. |
| 4 | `scripts/hooks/cost-tracker.js` + `evaluate-session.js` + `mcp-health-check.js` + `desktop-notify.js` | `scripts/hooks/*.js` | Pattern library for ECC-specific operational hooks; not all useful here. |
| 4 | `.claude/team/everything-claude-code-team-config.json` | `.claude/team/everything-claude-code-team-config.json` | Team config artifact. Informational. |
| 5 | 10-language reviewer agents (cpp, csharp, dart, django, flutter, fastapi, fsharp, gan, go, harmonyos) | `agents/*.md` | Language-specific reviewers; if we add a project in any of these languages, anchor here. |

## STALE-IN-UPSTREAM
- W314-r2 Stream-A AI-r2-1 (ECC `/plugin update` to `33ed494a`) — `33ed494a` is now ~8 commits superseded. AI should be retargeted to `b62f8075`.
- W316 cites `8148340a` rebuilt — superseded by `b62f8075`; cite-anchor in W317 docs needs refresh.

## HARNESS-FIT
- Decision: HOLD-T2 with W320 cite-refresh ops-AI
- Action: 
  1. Refresh ECC SHA cites in CLAUDE.md status appendices to `b62f8075`
  2. Run `/plugin update` for ECC marketplace to pull `b62f8075`
  3. W320 audit: evaluate `silent-failure-hunter` agent dispatch as W319 Stream-B counterpart
  4. W320 audit: evaluate `.claude/homunculus/instincts/` pattern as alternative to scattered behavioral prose in CLAUDE.md (could lift content stability per-trigger)
- License: MIT

## License
MIT
