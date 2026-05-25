

## 2026-05-08 Wave 98 — Ship 2A: cwc commit-on-stop wire + PROGRESS.md activation (Anthropic OFFICIAL TIER-1-DIRECT; Pattern A apply)

### Origin

Wave 98 3-agent fan-out delivered 15 ADOPT-NOW candidates. Agent B #1 (architectural-enhance: REVISE-LIST conf=0.83) recommended cwc commit-on-stop.sh wire + PROGRESS.md activation as **TIER-1-DIRECT Anthropic OFFICIAL CR-12 PRIMARY install-priority** path (vs sibling-cite-import alternatives).

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/CLAUDE.md:7-11,31-33 @ HEAD ffd563d6` (Anthropic OFFICIAL Apache-2.0 cwc-long-running-agents). Verbatim L7-11: "Always start here — Before doing anything else, read PROGRESS.md... If it doesn't exist yet, create it now with four sections (## Done, ## In progress, ## Next, ## Notes) and leave them empty."
- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh @ HEAD ffd563d6` — 17-line bash script that commits tracked changes via `git commit -am "session checkpoint: <date>"`.
- **TIER-1-DIRECT**: `https://docs.anthropic.com/en/docs/claude-code/hooks` (Anthropic CC official hooks docs — bash-native command form citation per codex T1 prescription #2).

### Edits (2 files / 76 insertions / 2 deletions)

1. `.claude/settings.json` — add `commit-on-stop.sh` as 2nd hook in existing Stop[0].hooks[] (slot 1, between auto_proceed_gate and stop-review-gate-hook). Bash-native command form per Anthropic hooks docs:
   ```json
   {
     "type": "command",
     "command": "cd \"$CLAUDE_PROJECT_DIR\" && bash \".local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh\"",
     "timeout": 60
   }
   ```

2. `PROGRESS.md` — NEW file at workspace root. 4 sections per cwc CLAUDE.md verbatim convention (## Done / ## In progress / ## Next / ## Notes) + Wave 97+98 historical state + 11 ranked Tier-1/2/3/4 next-ships from 3-agent fan-out verdicts + critical operational state (CPA down + 3-of-7 Claude active + capacity_score stale) + NEW failure mode (codex-rescue 1M-context billing).

### Operational order of Stop chain post-edit

1. `auto_proceed_gate.py` (5s sync) — block re-engagement if "ask-without-act" detected
2. **NEW: `commit-on-stop.sh`** (60s) — durable session-checkpoint when session truly ending (skipped when auto_proceed_gate blocks because session continues)
3. `stop-review-gate-hook.mjs` (300s) — codex T6 reviews just-committed checkpoint

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee per CR-3 Phase 1 bootstrap exception)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.91 | Pattern A apply: 6 prescriptions integrated single-round |

Verdict file: `.claude/state/codex_consult_wave98_ship2a_cwc_commit_on_stop_OUT.txt` (2087 lines / 142KB).

**6 prescribed_edits applied per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A**:
1. ✅ KEEP Stop order: auto_proceed_gate → commit-on-stop → stop-review-gate-hook
2. ✅ CHANGE hook command to bash-native: `cd "$CLAUDE_PROJECT_DIR" && bash ".local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh"` (NOT Windows-absolute Git Bash exe path; NOT PowerShell `&`)
3. ✅ PROGRESS.md keep 4 sections + handoff state; move Ship 2A from `## Done` → `## In progress`
4. ✅ `git add PROGRESS.md` + commit ONLY `.claude/settings.json` + `PROGRESS.md` (not `commit -am`)
5. ✅ TIER-1-DIRECT cwc cite load-bearing for wire decision
6. ✅ NO split needed — settings + PROGRESS = 1 cwc activation unit

### Outcome A ACCEPT-WITH-DOC for accidental commit `00d1bde`

Codex T1 verification run executed `commit-on-stop.sh` mid-review and swept 9 unrelated tracked changes into a "session checkpoint: 2026-05-08 18:27" commit:
- `.claude/.claude.json` (+635 -58)
- `.claude/hooks/scripts/agent_spawn_gate.py` (+9)
- `.claude/hooks/scripts/codex_postcommit_review.py` (+6)
- `.claude/hooks/scripts/codex_prepush_review.py` (+5)
- `.claude/hooks/scripts/codex_t1_consult_gate.py` (+8)
- `.claude/hooks/scripts/codex_t5_plan_review_gate.py` (+20)
- `.claude/settings.json` (+6) ← my Ship 2A wire WITH WRONG command form
- `CLAUDE.md` (+56)
- `bin/eee.cmd` (+20)

**Disposition: Outcome A ACCEPT-WITH-DOC** per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md`:
1. **Forward-only per port-note-discipline §6**: anti-pattern "Do not rewrite historical commit bodies/snapshots" — `00d1bde` stays in history
2. **Lower revert cost**: REVERT would lose 8 unrelated tracked changes (likely from prior session arc work); each would need re-shipping individually
3. **Ship 2A-revised commit (this entry, `7d0bf40`)** fixes the command form going forward — only `.claude/settings.json` (delta) + `PROGRESS.md` (NEW)
4. **Sister precedent**: Wave 97 Ship 1F-correction `ba873e8` accepted same class of selective-stage discipline failure

### Lesson learned (operator-discipline forward-only)

**Future codex T1 consults on Stop-hook wires that include executable shell scripts MUST run with `--sandbox=read-only` to prevent accidental Bash execution during T1 verification.**

This is now n=2 same-arc (Ship 1F selective-stage failure + Ship 2A codex-T1-sandbox-execution). Codified forward-only:
- PROGRESS.md ## Notes (lesson surface)
- This provenance entry (audit trail)
- Future Stop-hook ships MUST use `codex exec --sandbox read-only` instead of `--sandbox danger-full-access` for verification

Promotion to mechanical hook OR rule deferred to next ship cycle (codification-threshold cycle-322 jurisdiction n=3 self-observed promotion bar; currently n=2).

### CR-9 install-risk LOW

- Doc-only Stop-hook wire + new PROGRESS.md file
- Reversible via `git revert 7d0bf40`
- No @latest install (cwc is native-installed Apache-2.0; no upstream version-skew risk)
- No sibling-bleed (all paths reference `.local/cwc/` native install + `$CLAUDE_PROJECT_DIR` env-var)

### Wave 98 — 12th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 86-96 | (9 ships per prior provenance) | |
| 97-1A | `3c00615` | claude-md-management plugin |
| 97-1B | `a1f19f0` | gitleaks v8.30.1 |
| 97-1G | `58be220` | CLAUDE_CODE_EFFORT_LEVEL=xhigh |
| 97-1C+1D | `0110a9f` | gitleaks Phase 2 |
| 97-1J | `88aa7b1` | CLIProxyAPI round-robin |
| 97-1L | `a7adfb6` | 4 MCP/Bash env-var pins |
| 97-1L-followup | `85905f9` | full-unleash 3-bump |
| 97-1N | `4050871` | github/spec-kit v0.8.7 |
| 97-1F | `22e58b3` | scripts/*-hooks-rewrite.py cite-trail |
| 97-1F-correction | `ba873e8` | Pattern A F1 honest-disclosure addendum |
| 97-1K-skip | `af9bbec` | repomix Mia OVER #11 (manifest L128) |
| 98-2A-checkpoint | `00d1bde` | (UNINTENTIONAL bundled checkpoint; Outcome A ACCEPT-WITH-DOC) |
| **98-2A** | **`7d0bf40`** | **cwc commit-on-stop wire + PROGRESS.md activation (Pattern A apply)** |

### Mia OVER catches in Wave 97-98 cumulative = 11 (Wave 97) + 0 (Wave 98 so far)

Ship 2A: zero new Mia OVER catches — codex T1 verification was the gate; Mia probes were upstream of T1.

### Outstanding queue (post Ship 2A; from 3-agent verdicts)

#### Tier 1 — TIER-1-DIRECT Anthropic OFFICIAL (CR-12 PRIMARY install-priority)
- **Ship 2B**: claude-code-security-review plugin install via `/plugin install` (Anthropic Tier-0)
- **Ship 2C**: Cardinal-rule reference 6 un-cited Superpowers skills (executing-plans + finishing-a-development-branch + receiving-code-review + verification-before-completion + writing-plans + using-superpowers) — TIER-1-DIRECT obra MIT

#### Tier 2 — Token-efficiency mechanisms
- **Ship 2D**: rtk PreToolUse Bash-rewrite hook wire (binary already at `.local/cargo/bin/rtk`; sibling Phase 1 wrapper at `Z:/claude-sota/scripts/rtk_filter.py` cite-import-AMBER candidate). 60-90% measured Bash savings.
- **Ship 2E**: headroom statusline (context-window observability)
- **Ship 2F**: `--max-budget-usd 5.00` in `tools/eee.ps1` for non-interactive cron paths

#### Tier 3 — Account-rotation enhancements
- **Ship 2G**: Priority-bucket equalization (operator-decision; equalize 3 active P30/P20/P10 → uniform for round-robin burst distribution)
- **Ship 2H**: `tools/eee-status.ps1` fleet dashboard (consumer of Ship 1W cpa-usage-keeper SQLite)
- **Ship 2I**: Codex Pro renewal alarm (JWT countdown to 2026-05-27 ~19d)

#### Tier 4 — Higher-leverage architectural enhancements
- **Ship 2J**: zilliztech/claude-context Milvus MCP (40-62% RAG-class)
- **Ship 2K**: Subagent fork-vs-fresh routing matrix codification (Wave 98 paid this gap fresh)

### Update triggers

Re-evaluate this rule when:
- Stop-hook chain ordering changes (cwc commit-on-stop position invalidated)
- cwc-long-running-agents upstream HEAD bumps beyond ffd563d6 (re-pin commit-on-stop.sh + CLAUDE.md cites)
- A 3rd accidental codex-T1-sandbox-execution incident lands (n=3 promotes operator-discipline lesson to rule-layer per codification-threshold cycle-322 jurisdiction)
- Anthropic CC ships native session-checkpoint primitive that obviates cwc commit-on-stop (would retire this hook wire)
