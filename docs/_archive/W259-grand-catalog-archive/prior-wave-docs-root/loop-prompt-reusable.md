# eee Reusable Loop Prompt — copy verbatim into `/loop <cron> <prompt>` or `<<autonomous-loop-dynamic>>`

> **v9→v11 EVOLUTION NOTE (Wave 152 Fire 4 — 2026-05-11)**: this file persists the v9-shape prompt for cron-prompt-update reference. The active runtime doctrine has evolved to **v11** per `docs/v11-doctrine-evolution.md` — adds PROBE 18 OS-level state-mutation precondition probe + strengthens directive #10 (precondition-probe distinction) + strengthens directive #4 USER-CORRECTION-ACK n=4. Operator should CronDelete + CronCreate with v11 prompt text to activate v11 doctrine in cron loops (see `docs/v11-doctrine-evolution.md` for migration text + cite-class lattice). FM-CANDIDATE-21 "doctrine-evolution-without-cron-prompt-update" queued for cycle-322 promotion at n=2+ cross-arc.

> **Use shape**: `/loop "*/12 * * * *" "<paste body below>"` for cron-mode OR `/loop "<paste body below>"` for dynamic-mode (Claude picks delay via `ScheduleWakeup`).
>
> **Cite anchors**: this prompt encodes 12 cardinal rules + advanced-agent-team-standing-directive (Wave 24-D, n=3 user-trigger) + Path P forward discipline (n=21 Wave 148 ladder) + Mia pre-apply (n=279 ladder) + FM-20 path-drift defense (n=15 ladder). **v11 doctrine evolution at `docs/v11-doctrine-evolution.md` adds PROBE 18 + directive #10/#4 strengthening** (W152-F4 3-voice convergence: Voice 1 Path P Pattern B HNF + Voice 2 sota-research 6 TIER-1 cites + Voice 3 architect 11 recursive Mia probes).

---

## ⟪BEGIN-LOOP-PROMPT⟫

Continue eee runtime SOTA convergence. Standing directive:

**Focus axes (priority order)**:
1. **Token efficiency + accounts rotation** — `Z:/claude-sota-installed/.cli-proxy-api/config.yaml` (CLIProxyAPI 7-account fleet, round-robin within priority-tier, 4h session-affinity). Probe `:8317/v0/management/info` for cache-hit-rate + per-account usage + reset windows. Use accounts WELL before reset; pre-empt 429 via CADP rule 5 (≥3 accounts <50% session before fan-out).
2. **Architectural SOTA optimization** — deep-dive `Z:/claude-sota-installed/docs/outer research/` v1-v65 ARE INSPIRATION ONLY; research SOTA BEYOND them via the 4-MCP multi-source crawl (GitHub + Exa + Perplexity + DeepWiki) + repomix pack/grep for deep audits. Convergence-gate Axis 1+2+3 + harness-fit Probe DAG 1-7 mandatory.
3. **Max performance unleashed** — Path P codex T1 BRIDGE-MODE REAL GPT-5.5 (cardinal-rule-3 cross-model gate) BEFORE every commit. NO `--no-verify`, no shortcuts.
4. **Compounding learning** — every ship lands MEMORY.md index entry (one line <200 chars) + provenance log to `docs/install-provenance.md` per audit-action-loop.md Wire/Surface/Close/Re-fire.

**Mandatory discipline per fire**:
- **Advanced agent team** per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` — every non-trivial fire spawns 3-5 agent team (sota-researcher + codex-rescue BRIDGE-MODE + gpt5-reviewer + architect + optional gpt5-archaeologist). Brief cites SOTA repos at file:line + HEAD SHA. CADP rule 2 max-3 concurrent / rule 4 max-5 cumulative.
- **Mia pre-apply** per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — EVERY agent prescription gets cheap-probe verification BEFORE Edit. n=279+ ladder; FM-20 path-drift cascade catches saved 4+ commits in Wave 145 arc.
- **Path P codex T1 BEFORE commit** — `timeout 300 codex exec --skip-git-repo-check --color never -p deep-review-exec < .claude/state/codex_consult_<topic>.txt 2>&1 | tee .claude/state/codex_consult_<topic>_OUT.txt`. Apply Pattern A (atomic 1-shot fix-forward) per `codex-t1-fix-forward-pattern.md`. NEEDS-REVISION conf 0.85+ requires prescription apply.
- **FM-20 path-drift defense** — decompose every agent return into sub-claims; verify each independently; refuted sub-claims DROPPED from next-fire brief.
- **ARTIFACT-INLINE for Bash-only agents** per `Z:/claude-sota/.claude/rules/fm19-readonly-guard-sidestep.md` — orchestrator persists `tmp/wave<N>-agent<X>-<topic>-<date>.md` post-completion.
- **CR-1 cite-class lattice** per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — TIER-1-DIRECT (upstream file:line + SHA OR official docs URL) > TIER-2 user-curated > TIER-3-LOCAL-COMPOSITION (cite-import-AMBER per CLAUDE.md §14.5).
- **CR-6 fresh-from-github** — every install uses canonical official channel (`npm install -g <pkg>@<version>` / `cargo install <pkg>` / `uvx --refresh <pkg>` / `gh release download` / `/plugin install` / `docker pull`). Version-pin all `@latest`; pre-cite-import REVERT check.
- **CR-12 5-class disposition lattice** — every adoption candidate classified as GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT before install decision.
- **CR-7 Phase 1 bootstrap exception** — until Tier 1a (codex T1-T7 hooks per manifest §Section 2) INSTALLED, cardinal-rule-3 satisfied via Path P foreground+tee from main session.

**Per-fire workflow**:
1. **PROBE** — current state via `ctx_batch_execute` (git log, service status, cpa health, cache-hit-rate, install-provenance tail, MEMORY.md head, Forward Top-5 queue).
2. **DECIDE** — pick highest-leverage forward Top-5 ship; mark others deferred.
3. **DISPATCH** — advanced agent team (3-5 agents, parallel single-message, ARTIFACT-INLINE briefs, per-call codex 90-180s budget per FM-17.d defense).
4. **SYNTHESIZE** — Mia pre-apply each prescription; FM-20 decompose; verify against git+filesystem.
5. **REVIEW** — Path P codex T1 REAL GPT-5.5 on the staged diff. Read EOF first (`tail -200`). NEEDS-REVISION → Pattern A apply.
6. **COMMIT** — atomic `git add -- <files> && git commit -o <files> -F tmp/wave<N>-commit-msg.txt` (FM-02 sub-class b+c defense + FM-15 git-cli-grammar).
7. **LOG** — append `docs/install-provenance.md` entry + MEMORY.md index line (one-line summary).
8. **CADENCE** — under 5-minute cache window, schedule next wake via `ScheduleWakeup` 60-270s for active work / 1200-1800s for idle ticks.

**Active research surfaces (deep-dive mandatory)**:
- `Z:/repos/deps/CLIProxyAPI/` (router-for-me v7.0.2 — 7-account OAuth fleet routing + cache-prefix preservation)
- `Z:/repos/deps/claude-code-best-practice-shan/` (CCBP HEAD 64fffd53 — TIER-1-DIRECT cite-anchor authority)
- `Z:/repos/deps/anthropics/` (Anthropic OFFICIAL — cwc-long-running-agents + claude-agent-sdk-python + cookbook)
- `Z:/repos/deps/openai/codex/` (codex CLI v0.130.0 — Path P BRIDGE-MODE runtime)
- `Z:/repos/deps/obra/superpowers/` + `Z:/repos/deps/addy-osmani/agent-skills/` (selectively-vendored skill stack)
- `Z:/claude-sota-installed/docs/outer research/v1-v65*.md` (INSPIRATION; research beyond)
- `https://github.com/shanraisshan/claude-code-best-practice` (canonical upstream — CCBP refresh check per CR-6)
- `https://github.com/rtk-ai/rtk` (token-efficiency adjacent — research per cardinal-rule-12)

**Token-efficiency convergence focus**:
- Cache-prefix preservation across 7-account rotation (cnighswonger v3.5.4 cache-fix-proxy chain → CLIProxyAPI)
- Session-affinity TTL tuning (currently 4h — measure cache-hit-rate vs 1h/8h/12h bands)
- Pre-emptive arg truncation per team-orchestration.md §Context Budget (Edit/Write/execute args clipped at ≤4096 chars retained prefix)
- Forward Discipline #2 codification-fire-scope-bloat (TIGHT prompt + 60-120s codex budget for META-process)
- Background `Bash run_in_background:true` for long-running probes (no context pollution)

**Anti-patterns (refuse if attempted)**:
- Sibling-cite-import without HONEST-NON-FINDING sota-researcher probe (CR-12 TERTIARY gate)
- Hand-coding fix when upstream SOTA repo exists (CR-5+6+8+10 quadruple violation)
- Bundling Edit/Write of design-surface file with `git commit` in same shell-window without `--only -- <pathspec>` (FM-02 sub-class b)
- Citing `Z:/repos/deps/<repo>/` as install source (cite-only per CR-6 + install-from-github-discipline.md)
- Skipping Mia pre-apply on agent prescriptions because conf≥0.90 (Mia n=279 ladder: ZERO correlation between conf and accuracy)
- Bash heredoc for multi-line file writes (Git Bash hook corrupts heredocs — use Write tool directly)
- Trusting first VERDICT hit in codex T1 output (codex echoes template near start; real verdict at EOF per `feedback_codex_t1_verdict_reading_discipline.md`)

**Pause + escalate to user when**:
- Tier 1a / 1b / 1c row install would require user-decision per CR-7 Phase 1 (HIGH-risk hook install / cardinal-rule edit / new T-touchpoint introduction)
- Upstream binary regression blocks operational primitive (e.g., Wave 147 cli-proxy-api exit-0 — file upstream issue + propose downgrade vs alternative-proxy)
- Codex T1 returns REJECT or conf<0.85 (HARD GATE per cross-model-consensus.md)
- 3 consecutive Path P dispatches return Pattern B HNF on same surface (FM-09 codex-rescue blind-spot pattern — pivot to different cohort)
- Operator-explicit gate hit (`bypassPermissions` revert / Phase 3 promotion / cardinal-rule amendment)

**Continue compounding. Do not delay. Use accounts well before reset. SOTA-or-skip.**

## ⟪END-LOOP-PROMPT⟫

---

## Usage notes

- **Cron-mode** (`/loop "*/12 * * * *" "<body>"`) — fires every 12 minutes; good for active arcs where you want regular progress checks.
- **Dynamic-mode** (`/loop "<body>"`) — Claude self-paces via `ScheduleWakeup`; better for arcs with variable wait times (e.g., waiting for codex T1 completion).
- **Autonomous-mode** (`/loop`) — no body; Claude picks next action from Forward Top-5 queue per `audit-action-loop.md` discipline.
- **Length**: ~3500 chars — fits comfortably in cron prompt slot (no truncation observed at <8000 chars).

## When to refresh this prompt

Re-evaluate when:
- A new cardinal rule lands in `CLAUDE.md` (currently CR-1 through CR-12)
- A new named failure mode reaches owner-rule promotion (FM-22+)
- Forward Discipline #3 codification-fire ships
- Mia ladder advances past n=300 (cycle-322 jurisdiction milestone)
- Path P dispatch shape changes (codex CLI version bump beyond v0.130.0)
- A new SOTA research surface emerges that should be deep-dived (add to "Active research surfaces" list)

## Provenance

Authored 2026-05-11 in eee runtime continuation after Wave 147 NSSM SOTA supervision install (codex T1 APPROVE conf=0.81, 22.8min, 487K tokens REAL GPT-5.5 BRIDGE-MODE). Encodes 12 cardinal rules + Wave 24-D advanced-agent-team-standing-directive (n=3 user-trigger) + Wave 144-148 forward Top-5 cadence (Mia n=279 + FM-20 n=15 + Path P n=21 + FD#2 n=4 ladders).
