# PROGRESS.md — claude-sota-installed runtime handoff

> **Convention**: cwc-long-running-agents Default-FAIL contract per `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/CLAUDE.md @ HEAD ffd563d6` (Anthropic OFFICIAL Apache-2.0).
> Each session reads this FIRST before any other action. Update at end of each completed item.

## Done

### Wave 98 — 3-agent fan-out research (2026-05-08; Wave 97 Ship 1K-skip predecessor)
- Agent A (token-eff): 5 ADOPT-NOW candidates surfaced (rtk hook wire / headroom / claude-context / max_budget_usd / OTEL gated). Verdict: REVISE-LIST conf=0.84
- Agent B (architectural-enhance): 5 ADOPT-NOW candidates surfaced (cwc commit-on-stop / Superpowers cite / fork-vs-fresh routing / claude-code-security-review / silent-failure-hunter). Verdict: REVISE-LIST conf=0.83
- Agent C (account-rotation): 5 ship recommendations + full CPA feature audit + plan-tier reset windows + 4 HONEST-NON-FINDINGs. Verdict: APPROVE-LIST conf=0.86
- Artifacts persisted: `tmp/wave98-{A,B,C}-*-2026-05-08.md` + `tmp/wave98-orchestrator-inventory-2026-05-08.md`
- 4 of 7 Claude accounts disabled by Ship 1X cycle-aware rotation (≥80% secondary window threshold) — explains FM-17.b.i sensitivity
- 11 cumulative Mia OVER catches in Wave 97 arc (latest: repomix already-installed Ship 1K-skip)

### Wave 97 — 10 ships landed (2026-05-08 prior arc)
- 1A claude-md-management plugin / 1B gitleaks v8.30.1 / 1G xhigh effort / 1C+1D gitleaks Phase 2 / 1J round-robin / 1L env vars / 1L-followup unleash bumps / 1N spec-kit / 1F+correction cite-trail / 1K-skip repomix
- See `docs/install-provenance.md` for full provenance entries

## In progress

### Wave 98 Ship 2A — cwc commit-on-stop wire + PROGRESS.md activation
- **Codex T1 e2e VERDICT**: NEEDS-REVISION conf=0.91 → Pattern A apply (6 prescriptions integrated)
- Wired `commit-on-stop.sh` into `.claude/settings.json` Stop chain (slot 1: auto_proceed_gate → commit-on-stop → stop-review-gate-hook). Command form per Anthropic hooks docs: bash-native via `$CLAUDE_PROJECT_DIR` (NOT Windows-absolute Git Bash exe path)
- Created this PROGRESS.md with 4 sections per cwc convention
- **Outcome A ACCEPT-WITH-DOC** for accidental bundled commit `00d1bde` (codex T1 verification run executed `commit-on-stop.sh` mid-review and swept 9 unrelated tracked changes into a "session checkpoint: 2026-05-08 18:27" commit). Per port-note-discipline §6 forward-only — do NOT rewrite historical commit bodies; this Ship 2A-revised commit fixes the command form going forward.
- **Lesson learned (operator-discipline forward-only)**: future codex T1 consults on Stop-hook wires that include executable shell scripts MUST run with `--sandbox=read-only` to prevent accidental Bash execution during T1 verification.
- Cite: cwc CLAUDE.md:7-11,31-33 + commit-on-stop.sh @ HEAD ffd563d6 + codex T1 NEEDS-REVISION verdict at `.claude/state/codex_consult_wave98_ship2a_cwc_commit_on_stop_OUT.txt`

## Next

Per Wave 98 agent verdicts (15 ADOPT-NOW candidates total; ranked by user-mandate priority):

### Tier 1 — TIER-1-DIRECT Anthropic OFFICIAL (CR-12 PRIMARY install-priority)
1. **Ship 2A** (this session) — cwc commit-on-stop wire + PROGRESS.md
2. **Ship 2B** — claude-code-security-review plugin install via `/plugin install` (Anthropic Tier-0 OFFICIAL)
3. **Ship 2C** — Cardinal-rule reference 6 un-cited Superpowers skills (executing-plans / finishing-a-development-branch / receiving-code-review / verification-before-completion / writing-plans / using-superpowers) — TIER-1-DIRECT obra MIT

### Tier 2 — Token-efficiency mechanisms
4. **Ship 2D** — rtk PreToolUse Bash-rewrite hook wire (binary already installed via cargo at `.local/cargo/bin/rtk`; sibling Phase 1 wrapper at `Z:/claude-sota/scripts/rtk_filter.py` cite-import-AMBER candidate per Section 14.5). 60-90% measured Bash output savings.
5. **Ship 2E** — headroom statusline (context-window observability gap closure)
6. **Ship 2F** — `--max-budget-usd 5.00` flag in `tools/eee.ps1` for non-interactive cron paths (anthropic-cookbook example cite)

### Tier 3 — Account-rotation enhancements
7. **Ship 2G** — Priority-bucket equalization (operator-decision; user mandate to choose). Equalize 3 active accounts to P20 for 3-account burst distribution. Closes FM-17.b.i Wave 97 fan-2-C 429 root cause.
8. **Ship 2H** — `tools/eee-status.ps1` fleet dashboard (consumer of Ship 1W cpa-usage-keeper SQLite + CPA `/v0/management/auth-files`)
9. **Ship 2I** — Codex Pro renewal alarm (JWT countdown to 2026-05-27; ~19d remaining; SessionStart hook < 7d alert)

### Tier 4 — Higher-leverage architectural enhancements (STUDY-PILOT first)
10. **Ship 2J** — zilliztech/claude-context Milvus MCP (40-62% RAG-class token reduction; OpenAI/Google DeepMind/Microsoft/AWS adopted)
11. **Ship 2K** — Subagent fork-vs-fresh routing matrix codification (sibling-cite-import-AMBER; Wave 98 paid this gap fresh — codex-rescue 1M-context billing failure n=2 same-arc)

## Notes

### Critical operational state

- **CPA process down** on port 8317 since 2026-05-08 16:24:42 EDT (~3h before this PROGRESS.md created). Ship 1J round-robin strategy + Ship 1L env vars won't apply until next eee launch.
- **3 of 7 Claude accounts active** (aesthetic9c P30 / mr.euphoriaincarnate P20 cap=0 / nalawowac P10) — rotation_planner disabled 4 accounts at 7d_threshold 18:59:42Z 2026-05-08
- **mr.euphoriaincarnate capacity_score=0** — fully consumed; reset window unannotated
- **capacity_score telemetry stale** — 11 days old (last update 2026-04-27/28)

### NEW failure mode discovered Wave 98

- **codex-rescue subagent class triggers 1M-context billing** in this session (n=2 same-arc; 1297ms+268ms / 0-tokens both `1M context billing not enabled` failure). Recovery pivot: sota-researcher Sonnet stand-in with STAND-IN-NOTICE + cross-model gate satisfied via orchestrator-direct codex exec foreground+tee BEFORE commit (per CR-3 Phase 1 bootstrap exception). Codification candidate: FM-17.b.iii NEW class.

### Cardinal rules active

- **CR-3 + Phase 1 bootstrap exception**: codex T1 e2e via orchestrator-direct foreground+tee MANDATORY before commit (Tier 1a hook gate not yet wired)
- **CR-9 install-risk**: version-pin all `@latest`, expect 2-round fix-forward, pre-cite-import REVERT check, sibling-bleed defense
- **CR-12 upstream-install-priority**: prefer official-native install over sibling-cite-import; cite-import-AMBER is LAST RESORT

### Loop-cancel mandate active (user 2026-05-08)

`cancel teh loop replace by sota agent team workflow` — ScheduleWakeup not invoked end-of-turn. SOTA agent team workflow active.

### Plugin enable → cache populate gap codified (Ship 2R 2026-05-08)

**Operational gap caught by eee HARD-GATE**: enabling a plugin via `.claude/settings.json` `enabledPlugins` block does NOT auto-populate `.claude/plugins/cache/<marketplace>/<plugin>/<version>/` directory. CC's interactive `/plugin install` does both; settings.json-only enable leaves cache uninstalled. Result: eee.ps1 HARD-GATE FAIL-CLOSED on launch.

**Mitigation (Ship 2R operational fix; cache gitignored, no commit for cache itself)**:
1. Copy marketplace local source `cp -r .claude/plugins/marketplaces/<marketplace>/plugins/<name>/. .claude/plugins/cache/<marketplace>/<name>/<version>/`
2. Version subdir convention: plugin.json `version` field if present (e.g., `1.0.0` for claude-md-management); else marketplace `.gcs-sha` first 12 chars (e.g., `76b35e91d1c9`)
3. Verify eee HARD-GATE PASS post-cache-populate

**FORWARD DISCIPLINE**: when adding a plugin to settings.json `enabledPlugins`, ALSO populate cache via the `cp -r` recipe above OR run `/plugin install` interactively first. Codification queued for Ship 2Q-followup OR auto-script (`tools/_eee_plugin_cache_populate.py`) candidate.

**Cumulative Wave 97-100 plugins enabled needing this discipline**: 4 (claude-md-management since Wave 97 commit `3c00615` — silently broken until eee HARD-GATE caught it; pr-review-toolkit + skill-creator + claude-code-setup from Wave 100 Ship 2N-batch1 commit `1deb221`).

### GPT-5.5 fully-unleashed mandate active (user 2026-05-08; OPERATOR-OVERRIDE)

`gpt5.5 need to be fully unleashed, not sandboxed` — RETIRES Wave 98 lesson n=2 ("`--sandbox=read-only` for codex T1 consults on Stop-hook wires"). Per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md` **Outcome C MANUAL-OVERRIDE**: operator explicit authority overrides automated lesson codification. Going forward:
- **Future sessions do not pass an explicit `--sandbox=read-only` override for Codex T1**; use the `deep-review-exec` profile default `danger-full-access` (per `$CODEX_HOME/config.toml` redirected to `Z:/claude-sota-installed-state/.codex/config.toml` via CLAUDE.local.md ENV (f) state-outside-repo) unless a LATER operator directive scopes a safety-class sandbox.
- **Outcome C MANUAL-OVERRIDE classification** for the sandbox-policy retirement itself (this discipline-revision ship).
- **Outcome A ACCEPT-WITH-DOC** for cwc commit-on-stop bundled checkpoints (n=3 cumulative — Wave 98 `00d1bde` + Wave 100 `68169d9` + designed firings). Bundled commits stay in history per port-note-discipline §6; subsequent Pattern A apply commits revise comments/cite-trails forward-only.
- **Wave 98 lesson n=2 codification superseded** — discipline-revision sets the forward operator default; per-ship safety-class scope-down requires explicit operator directive.
- **cwc commit-on-stop bundled-drift n=3 catalog promotion candidate**: queued separately as Ship 2Q (cycle-300 ONE-LOGICAL-UNIT-PER-FIRE; do NOT fold mitigation into Ship 2P).
