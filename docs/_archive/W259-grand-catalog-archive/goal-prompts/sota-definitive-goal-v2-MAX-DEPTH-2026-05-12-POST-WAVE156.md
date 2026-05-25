# SOTA Definitive /goal v2 — MAX DEPTH AUTOMATION (post-Wave-156)

**Version**: 2.0 (incorporates Wave 156 close-arc lessons)
**Date**: 2026-05-12 16:50
**Cite class**: `constituents=[TIER-1-DIRECT @ Anthropic CC sub-agents docs + CCBP claude-subagents.md + Anthropic CC hooks docs, TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 156 close 4 codex T1 verdicts + 5 T3 verdicts + 14 FM-02(c) absorption ladder + 415+ Mia pre-apply ladder, TIER-3-LOCAL-COMPOSITION @ Wave 156 plan + Section 13 Report Mandate]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Supersedes**: `tmp/sota-definitive-goal-MAX-DEPTH.md` (v1, pre-Wave-156)

---

## Section 0 — PRE-STATE (post-Wave-156 close, 2026-05-12)

**8 ship outcomes delivered** (5 atomic + 3 FM-02 (c) absorbed; all semantically landed):

| Ship | SHA | Type | Scope |
|---|---|---|---|
| 0  | `69e5fd40` | atomic | governance baseline (66 untracked files) |
| 1  | `a4bb3f14` | atomic | evaluator.md 3→14 fields |
| 1.1 | `3bee1fae` | atomic | evaluator.md Pattern A fix (permissionMode plan + github MCP excluded + hooks PreToolUse:Bash readonly guard) |
| 2  | `124e7089` | absorbed | 3 DEP-ONLY agents 5→15 fields (gsd-goal-verifier + wshobson-devops + wshobson-security) |
| 2.1 | `e82b7ae4` | absorbed | prefix→suffix HTML comment move (frontmatter at byte 0) |
| 3a | `4f628b6a` | absorbed | 6 agents L4 `[PROVENANCE-ONLY]` qualifier (architect/code-reviewer/debugger/gpt5-archaeologist/gpt5-reviewer/verifier) |
| 22 | `88a92d2`  | atomic | gpt5-archaeologist + gpt5-reviewer 11/12→16 fields |
| 23 | `543e540`  | atomic | sota-researcher + verifier 15→16/17 fields |
| (close) | `ea5f4f4` | absorbed | docs/install-provenance.md Wave 156 close entry |

**Progress baseline → current (8 percentages)**:
1. Agents 14+ fields: **6/11 (55%) → 11/11 (100%)** ✅
2. Agents 15+ fields: 6/11 (55%) → 10/11 (90%)  — only debugger.md at 14
3. Agents 16-field full CCBP: **0/11 (0%) → 4/11 (36%)** — gpt5-archaeologist/gpt5-reviewer/verifier (16); sota-researcher (17 with effective_tier)
4. Agents [PROVENANCE-ONLY] qualifier: **0/6 (0%) → 6/6 (100%)** (Ship 3a)
5. Files >40k MD: 6 unchanged (PATH D file splits deferred)
6. CR-9 sibling-bleed agents: 12 → ~6 (50% reduction)
7. T3 NEEDS-REVISION actionable: **0** (closed-loop arcs converged Outcome A)
8. FM-02 (c) absorption ladder: **n=10 → n=14 firm** (4 same-arc absorptions)

**Mia pre-apply ladder**: n=412 → n=415+ (3 OVER catches saved deferred ships: Ship 4 / Ship 5 / Ships 16-20)

**Ships DEFERRED via Mia OVER catches** (do NOT re-attempt; state-stale OR already-installed):
- Ship 3b: rule-file refs mostly already self-qualified as `cite-import-AMBER per Section 14.5`
- Ship 4: T6 already wired via openai-codex marketplace `.mjs` script (CR-12 PRIMARY > sibling TERTIARY)
- Ships 5-6: FM-16 state-stale — local-judge not in current MCP state; existing `[CURRENTLY DISABLED]` qualifiers refer to exa (NOT-CONFIGURED in current runtime)
- Ships 16-20: ECC ADOPT-NOW skills already in `.claude/plugins/cache/everything-claude-code/.../skills/` and auto-discoverable via plugin enablement

**Ships PENDING dedicated session** (HIGH-leverage; queue for next /goal arc):
- **HIGH-PRIORITY**:
  - Ship 22+ extension: debugger.md 14→16 + architect/code-reviewer 15→16 (3 agents; uniform additive pattern; closes 16-field metric 36% → 64%)
  - `.claude/.claude.json` gitignore + remove tracked (OPEN HIGH T3 `0346ebf4` per CLAUDE.md §Intentional divergences (d) Wave 82d)
- **MEDIUM-PRIORITY**:
  - Ship 13: settings.json de-bloat (57.8k → <32k target); primary reducer = 17 `_comment_*` keys (~15K chars); HIGH-RISK per Agent F archaeology
  - Ships 7-12 PATH D file splits (6 files >40k chars); team-orchestration.md 84k highest priority
- **LOW-PRIORITY**:
  - Ship 21: tmp/wave*.md archive cleanup (>14d files)
  - Ship 24: Iron Law verification gate (final ceremony; deferred until remaining ships complete)

**FM-17.g status**: Defense remains active (haiku-4-5 provider 502 → `model: 'sonnet'` override on all Agent dispatches). No new FM-17.g instances Wave 156. (NOTE: per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md` ladder, monitor for new sub-class .h or recurrence.)

---

## Section 1 — Cardinal rules CR-0 through CR-12 (MANDATORY on every meta-step per CR-11)

CR-1 cite at file:line + HEAD SHA on every Edit — TIER-1-DIRECT preferred, TIER-3-LOCAL-COMPOSITION acceptable per cite-class lattice (citation-discipline.md rule #8 MIN_PRECEDENCE).

CR-2 Karpathy 4 principles — Think Before Coding (uncertainty surfaced); Simplicity First (no speculative abstractions); Surgical Changes (every line traces to user-request); Goal-Driven (measurable success criteria).

CR-3 Cross-model consensus — Claude orchestrates / Codex reviews via REAL GPT-5.5. T1-T7 lifecycle: T1 pre-edit consult (Path P codex exec foreground+tee `-p deep-review-exec`); T2 commit-time hook (sync, 120s typical timeout → Pattern B HONEST-NON-FINDING + T3 backstop); T3 postcommit hook (async, 30-180s; writes verdict file); T4 post-push cumulative; T5 plan-stage; T6 stop-gate (wired via openai-codex marketplace .mjs); T7 ask-without-act gate.

CR-4 Research-first — RECALL → INVESTIGATE → VERIFY before any change. `[VERIFIED]` / `[INFERRED]` / `[UNKNOWN]` markers per evidence-policy.md Marker Decay corollary.

CR-5 Install-priority — every architectural primitive MUST install from upstream SOTA via official-native-channel per CR-6 (NOT hand-coded except bootstrap-only per CLAUDE.md §"Bootstrap-only files").

CR-6 Pull from newest GitHub + use OFFICIAL NATIVE CHANNEL — `npm install -g <pkg>@latest`, `gh release download`, `git clone --depth 1`, `uvx --refresh`, `docker pull`, `/plugin marketplace add` + `/plugin install`, `cargo install`. NEVER copy from `Z:/repos/deps/<repo>/` (stale per Marker Decay).

CR-7 Graduated unleash — `permissions.defaultMode` progresses through 3 phases (Phase 1 default per CCBP canonical; Phase 2 testable predicate via manifest §18.1; Phase 3 destination per Anthropic CC official docs). **Current Wave 82d OVERRIDE**: `defaultMode: bypassPermissions` per CLAUDE.md §Intentional divergences (d) — operator-flipped for Anthropic classifier outage; revert to `auto` when 3 predicates hold.

CR-8 Full-SOTA-content invariant — every code-or-reference is install-class from upstream OR cite-class adapted from SOTA at file:line + HEAD SHA. Per-row `CR-8 status` column in manifest tracking ADAPTED-FROM-SOTA / NOVEL-DOCUMENTED-EXCEPTION / PENDING-AUDIT.

CR-9 Install-risk discipline — version-pin all `@latest`; expect 2-round fix-forward per hook install; pre-cite-import REVERT check (`git log --all --oneline -- <path>`); sibling-bleed defense (path-rewrite for install-class cite-imports; read-only research probe EXEMPT per Wave 50 fire 8 Pattern A on Agent I F-5).

CR-10 Research-first-then-install on unknowns — every build/error/unknown triggers SOTA research BEFORE remediation; priority order: (a) install canonical SOTA solution → (b) cite-adapt SOTA pattern → (c) best SOTA-recommended → (d) HONEST-NON-FINDING.

CR-11 META-process SOTA discipline — every meta-step (cardinal-rule edit / agent dispatch / verdict synthesis / Pattern A apply / commit) follows SOTA practice. Per `Z:/claude-sota/.claude/rules/advanced-agent-team-standing-directive.md` for agent dispatch; per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md` for verdict synthesis; per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A for fix-forward; per `Z:/claude-sota/.claude/rules/git-cli-grammar-discipline.md` for git ops.

CR-12 Upstream-install-priority over sibling-cite-import — PRIMARY install from upstream SOTA via CR-6 channel; SECONDARY read-only research at `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>`; TERTIARY cite-import-AMBER from sibling claude-sota per Section 14.5 ONLY after sota-researcher HONEST-NON-FINDING evidence. 6-class disposition lattice: GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL.

---

## Section 2 — REAL GPT-5.5 MAXIMUM utilization

**Path P canonical recipe** (mandatory for design-surface T1; bg-job for non-blocking):

```bash
timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_<topic>.txt 2>&1 | \
  tee .claude/state/codex_consult_<topic>_OUT.txt
```

**6 load-bearing parameters** (per codex-t1-pattern-b-forward-discipline.md Forward Discipline #1+#2):
1. DEFAULT codex profile (NO `-p deep-review-exec` flag; routes via codex CLI default profile)
2. `--skip-git-repo-check` (bypasses git-repo precondition Pattern B HNF zero-investigation variant)
3. `--color never` (ANSI-stripped output for clean JSON-at-EOF parse)
4. Foreground+tee dispatch (NOT background `&`; tee captures full trace + live stream)
5. 300s timeout (bounded ceiling)
6. ≤50 LOC focused prompt + single-claim audit + JSON-at-EOF schema (Pattern D §"Single-claim audit")

**Per-call codex time budget** (Wave 44 FM-17.d codification): default 90s, normal cap 120s, 180s only with explicit reason. Bounded calls preferred over open-ended xhigh.

**BRIDGE-MODE subagent dispatch** (gpt5-reviewer + gpt5-archaeologist + codex-rescue):
- Use `model: 'sonnet'` override per FM-17.g defense (haiku-4-5 provider 502 outage)
- Per-call codex budget per agent brief (90s default / 120s cap / 180s explicit)
- ≥2 BRIDGE-MODE dispatches per non-trivial ship per `advanced-agent-team-standing-directive.md` invariant #1
- STAND-IN-NOTICE disclosure per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` when env funnels to Sonnet stand-in

**Verdict reading discipline** (per `feedback_codex_t1_verdict_reading_discipline.md`):
1. `wc -l <out_file>` FIRST (verdict at EOF, not at start)
2. `tail -50 <out_file>` to find verdict JSON block
3. Search EOF for `"verdict": "APPROVE|NEEDS-REVISION|REJECT"` + `"confidence"` + `"prescribed_edits"`
4. NEVER read first verdict hit — codex deep-review-exec echoes templates near start

---

## Section 3 — Adversarial review LENS 1+2+3+4+5+6

**LENS 1 — codex T1 deep-review-exec**: fire on every design-surface ship; Path P recipe per §Section 2. Verdict-disposition: APPROVE → PROCEED; NEEDS-REVISION conf≥0.85 → Pattern A SINGLE atomic apply; REJECT → STOP escalate.

**LENS 2 — gpt5-reviewer subagent**: BRIDGE-MODE adversarial 2nd voice; fire on non-trivial design surfaces; brief MUST include ARTIFACT-INLINE per FM-19 + per-call codex budget per FM-17.d.

**LENS 3 — Mia pre-apply** (n=415+ cumulative ladder): probe runtime state BEFORE Edit; verify all prescribed_edits against actual file:line via cheap probes (Glob/Grep/Read/Bash). Catches:
- State-stale prescriptions (Ship 4 T6 already wired; Ship 5 local-judge not in state)
- Already-installed claims (Ships 16-20 ECC skills already cached)
- File-shape mismatches (Ship 2.1 prefix-vs-suffix HTML comment placement)
- SKILL.md preload existence (verify in `.claude/plugins/.../skills/<name>/SKILL.md`)
- MCP wire status (verify in `.mcp.json:mcpServers`)

**LENS 4 — FM-09 2-stage when codex-rescue dispatched**: codex-rescue (1st stage) → harness-fit-aware 2nd-stage agent (sota-researcher / architect / Explore — NEVER another codex-rescue) with explicit 6-Probe DAG mandate. Per `agent-harness-fit-verification.md §FM-09 codex-rescue blind-spot specialization` (n=5/5 base rate).

**LENS 5 — gsd-goal-verifier post-hoc**: fire at /goal close OR Ship 24 ceremony; goal-backward verification (4-level: exists / substantive / wired / data-flowing). Returns PASSED / GAPS_FOUND / HUMAN_NEEDED.

**LENS 6 — T3 mechanical postcommit**: fires async on every `git commit` via `codex_postcommit_review.py`. Writes verdict to `.claude/state/codex_review_HEAD_<sha8>.txt`. NEEDS-REVISION → Pattern A iter-2 fix-forward (Ship 1.1 + Ship 2.1 precedent).

---

## Section 4 — Quality gates 1-10 fail-closed

1. **Pre-flight health check** Layer A-K (per Section 6) — every 5th iter
2. **Edit-time PreToolUse hooks** — codex_t1_consult_gate, intent_gate, gitnexus_pre_edit_impact_guard, secret_scan_guard, safety_guard, fm17_class_lint, fm19_artifact_inline_lint, fm20_path_drift_lint
3. **Pre-commit T2 STRICT** — codex_t2_pre_commit_gate sync 120s; Pattern B HNF on timeout
4. **Post-commit T3** — codex_postcommit_review async 30s spawn / 180s codex
5. **Post-push T4** — codex_prepush_review async (cumulative branch diff)
6. **Plan-exit T5** — codex_t5_plan_review_gate
7. **Session-end T6** — openai-codex marketplace `stop-review-gate-hook.mjs` (timeout 300s)
8. **T7 ask-without-act gate** — auto_proceed_gate sync 5s
9. **SubagentStop telemetry** — subagent_stop_telemetry async (n=N agent_id propagation)
10. **Iron Law verification-before-completion** — superpowers:verification-before-completion SKILL claim-time gate (NO completion claims without fresh verification evidence)
11. **gsd-goal-verifier post-hoc** — fire on /goal completion OR Ship 24 ceremony

---

## Section 5 — Native install via canonical CR-6 channels

**ALWAYS** use official native channel per cardinal-rule-6:
- `/plugin marketplace add <official-url>` + `/plugin install <pkg>` (Anthropic-canonical for skills/agents/commands)
- `npm install -g <pkg>@latest` from official npm registry
- `gh release download --repo <owner>/<repo> $(gh release list --limit 1 --json tagName -q '.[0].tagName')` (official GitHub releases)
- `git clone --depth 1 https://github.com/<owner>/<repo>.git <dest>` (canonical https://github.com URL; fresh clone NOT stale Z:/repos/deps/)
- `uvx --refresh <pkg>` (uvx auto-pulls latest PyPI official)
- `docker pull <image>:latest` (official Docker Hub OR explicit registry)
- `cargo install <pkg>` from official crates.io
- `pip install git+https://github.com/<owner>/<repo>.git@<sha>` (SHA-pinned for reproducibility)

**NEVER** copy from `Z:/repos/deps/<repo>/` (cite-anchor only; potentially stale per Marker Decay).
**NEVER** use shell-script wrappers when official CLI primitive exists.

---

## Section 6 — Health check matrix Layer A-K (every 5th iter)

Run via `ctx_batch_execute` parallel probe:

- **Layer A Plugins**: `python3 -c "import json; s=json.load(open('.claude/settings.json')); print(len(s.get('enabledPlugins', [])))"` — expect ≥27
- **Layer B MCPs**: `python3 -c "import json; m=json.load(open('.mcp.json')); print(sorted([k for k in m.get('mcpServers',{}) if not k.startswith('_comment')]))"` — expect ≥11 (github/context7/deepwiki/playwright/chrome-devtools/repomix/serena/memory/graphiti/phoenix/gitnexus)
- **Layer C Hooks**: `python3 -c "import json; s=json.load(open('.claude/settings.json')); h=s['hooks']; [print(f'{e}: {len(m)}') for e,m in h.items()]"` — expect 8 event types
- **Layer D Agents**: per-agent yaml.safe_load with BOM-strip; count fields per agent + check `starts_with_---` after BOM-strip
- **Layer E Skills**: `find .claude/plugins -name 'SKILL.md' | wc -l` — expect ≥2000+ (across all marketplaces+cache)
- **Layer F Settings.json**: `wc -c .claude/settings.json` — current 58k WARN; target <40k post Ship 13
- **Layer G 8 conformance percentages**: per Section 9 progress tracker
- **Layer H Codex CLI**: `codex --version` + `[ -f $CODEX_HOME/auth.json ]`
- **Layer J Git**: `git log --oneline -5`, `git status --short`, HEAD age via `git log -1 --format='%ai'`
- **Layer K Memory**: `wc -l .claude/projects/Z--claude-sota-installed/memory/MEMORY.md` + state JSONL files

---

## Section 7 — Terminal predicate (Ships ordered by PRIORITY + status)

VERIFIED COMPLETE when ALL of:

### TIER-A: HIGH-PRIORITY (next session focus)

- **(SA1) debugger.md 14→16 fields**: `yaml.safe_load` on `.claude/agents/debugger.md` returns ≥16 fields including `skills` + `mcpServers` (uniform additive pattern matching Ship 22/23)
- **(SA2) architect.md 15→16 fields**: add `skills` field
- **(SA3) code-reviewer.md 15→16 fields**: add 1 missing field (probe to identify)
- **(SA4) `.claude/.claude.json` gitignore + remove tracked**: `git ls-files .claude/.claude.json | wc -l = 0` AND `grep -q ".claude/.claude.json" .gitignore` (closes OPEN HIGH T3 `0346ebf4`)

### TIER-B: MEDIUM-PRIORITY (dedicated effort)

- **(SB1) Ship 13 settings.json de-bloat**: `wc -c .claude/settings.json < 40960` (target <32k); primary reducer = 17 `_comment_*` keys moved to `docs/settings-changelog.md`; HIGH-RISK per Agent F archaeology — needs full T1+T2+T3 cycle + smoke probe
- **(SB2-7) Ships 7-12 PATH D file splits** (6 files):
  - team-orchestration.md (84k) → parent <10K pointer-index + 4-5 child rules each <22K
  - cross-model-consensus.md (64k) → 3 children
  - codex-t1-fix-forward-pattern.md (47k) → Pattern A/B/C/D files
  - layered-gates-architecture.md (42k) → 5-layers + asyncRewake + worktree-isolation
  - agent-harness-fit-verification.md (42k) → 7 sub-classes + Probe-DAG + Codex-rescue-blind-spot
  - CLAUDE.md (62k) → cardinal-rules + bootstrap + skills-orchestration

### TIER-C: LOW-PRIORITY (cleanup)

- **(SC1) Ship 21 tmp/ archive cleanup**: move stale tmp/wave*.md (>14d) → `docs/_archives/2026-05-12/`
- **(SC2) Ship 24 Iron Law verification gate**: gsd-goal-verifier PASS + docs/install-provenance.md appended + MEMORY.md index entry

### Cross-model gate satisfaction (cardinal-rule-3)

- Every Ship triggers PreToolUse codex_t1_consult_gate.py + PreToolUse codex_t2_pre_commit_gate.py + PostToolUse codex_postcommit_review.py
- Pattern A apply per codex-t1-fix-forward-pattern.md on each NEEDS-REVISION conf≥0.85
- Cardinal-rule-7 REPORT mandate: every T1 WARN / T2 timeout / T3 NEEDS-ATTENTION disclosed in commit body OR supplementary memory

---

## Section 8 — Continuous loop (per /goal autonomous run iteration)

```
loop:
  1. read-state            git log --oneline -5; git status --short; check HEAD age
  2. health-check          (every 5th iter) Layer A-K via ctx_batch_execute parallel probe
  3. context-budget-probe  /context all (manual /compact at 25-30% if >300k tokens for 1M context)
  4. compact-or-rewind     /compact <hint> at 25-30% OR /rewind at 45%+ if rot symptoms;
                           AUTOCOMPACT backstop CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=60 for long-arc
  5. research              RECALL (memory grep) → INVESTIGATE (Z:/repos/deps + WebFetch + ToolSearch) → VERIFY (file:line probe)
  6. plan-one-bounded      pick next Ship per Section 7 priority; ≤200 LOC + cycle-300
  7. T1 codex consult      Path P foreground+tee bg-job per Section 2; OR Pattern A iter-2 (T3 as upstream gate)
  8. Mia pre-apply         verify all prescribed_edits against runtime state (LENS 3 per Section 3)
  9. Pattern A apply       Edit/Write with prescribed_edits; SINGLE atomic apply (no iter chain)
  10. LENS 2 (optional)    gpt5-reviewer subagent BRIDGE-MODE if non-trivial design surface
  11. PRE-COMMIT VERIFY    yaml.safe_load + grep + smoke-import probes (verification-before-completion Iron Law)

  12. ATOMIC COMMIT FAST    [NEW per Wave 156 lesson]
                            Write commit msg to tmp/<ship>-msg.txt; immediately run:
                              git add -- <paths> && git commit -o -F tmp/<ship>-msg.txt -- <paths>
                            Target: complete within ~30 seconds of Edit completion to beat
                            FM-02 (c) parallel session checkpoint sweep (n=14 firm; sweeps every ~3-6min)
                            If absorption happens: ACCEPT per FM-02 META-router row #4
                            (semantic ship lands; audit-trail attribution drifts to absorbing commit SHA;
                            document in wave156-progress.jsonl)

  13. T2 commit-time hook   sync 120s timeout typical → Pattern B HONEST-NON-FINDING (T3 backstop)
  14. T3 postcommit hook    async 30s spawn / 180s codex; writes .claude/state/codex_review_HEAD_<sha8>.txt
                            Pattern A iter-2 if NEEDS-REVISION conf≥0.85 (Ship 1.1 + Ship 2.1 precedent)
  15. progress-tracker      append entry to .claude/state/wave156-progress.jsonl with ship/sha/T1+T2+T3/disposition
  16. context-budget-probe  again (if >70% AUTOCOMPACT will fire)
  17. compact-OR-loop       if context >25-30%: manual /compact <hint> w/ steered summary; else loop step 1

  Section 9 8-percentages echo every iter
  Section 11 provenance writes per ship
  Section 13 Report Mandate at /goal close
```

**FM-02 (c) FAST-commit defense** (NEW Wave 156 codification at n=14):
- Parallel session checkpoint commits every ~3-6min sweep modifications
- My Edits + Bash commit MUST complete within ~30s window to land atomic commit
- Slower commits get absorbed into session checkpoint → semantic ship lands, audit-trail drifts
- Per FM-02 META-router row #4 recovery: ACCEPT absorption + document via supplementary memory + NO history rewrite
- Long-term defense: `claude --worktree` filesystem isolation (Layer 0 per layered-gates-architecture.md §3)

---

## Section 9 — Progress tracking (8 percentages echoed every iter)

1. Agents 14+ fields: X/11 = Y% (current: 11/11 = 100% ✅)
2. Agents 15+ fields: X/11 = Y%
3. Agents 16-field full CCBP: X/11 = Y% (current: 4/11 = 36%)
4. Agents [PROVENANCE-ONLY] qualifier: X/6 = Y% (current: 6/6 = 100%)
5. Files >40k MD: count (current: 6)
6. CR-9 sibling-bleed agents: X (current: ~6 closed of 12)
7. T3 NEEDS-REVISION 24h actionable: X (current: 0)
8. FM-02 (c) absorption ladder n: (current: n=14 firm)

PLUS Mia pre-apply ladder n=N (current: n=415+)

---

## Section 10 — Auto-recovery on named failure modes

- **FM-02 (b)+(c) destructive-race**: atomic single-shell `git add -- <path> && git commit -o -F <msg> -- <path>` per git-cli-grammar-discipline.md; FAST-commit ~30s window per Section 8 step 12
- **FM-09 codex-rescue blind-spot**: 2-stage validation per `agent-harness-fit-verification.md` (codex-rescue 1st-stage → sota-researcher/architect/Explore 2nd-stage with Probe DAG mandate)
- **FM-16 phantom-cite-to-disabled-MCP**: probe `disabledMcpjsonServers` + `mcpServers` state before citing MCP in rules; update qualifiers to current state
- **FM-17.a wrapper-truncation**: SendMessage to agent_id for ARTIFACT-INLINE re-emit
- **FM-17.b pool-depletion 429**: fleet probe `python Z:/claude/ccc/tools/status.py` ≥3 accounts <50% BEFORE re-dispatch; orchestrator-direct fallback
- **FM-17.c.i codex bg-job wedge**: foreground+tee from main session (Path P)
- **FM-17.c.ii Windows cert-store ACL**: orchestrator-direct dispatch
- **FM-17.d BRIDGE-MODE wrapper stall**: foreground+tee from main session bypasses watchdog
- **FM-17.e autocompact-thrashing**: brief tightening (ctx_execute_file vs Read; head_limit on searches; head -N on Bash)
- **FM-17.f 1M-context-entitlement billing-class**: Path P codex exec foreground+tee from main session (cross-model gate satisfied via REAL GPT-5.5) OR `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` (Path D)
- **FM-17.g haiku-4-5 provider 502** (Wave 156 active): `model: 'sonnet'` override on Agent dispatches
- **FM-19 readonly-guard sidestep**: agent embeds `## ARTIFACT-INLINE: tmp/wave<N>-<agent>-<topic>-<date>.md` in final return; orchestrator persists post-completion
- **FM-20 path-drift cascade**: decompose returned prescriptions into sub-claims; Mia-probe each INDEPENDENTLY at synthesis time (NOT only at apply); refuted sub-claims DROP from next-fire brief
- **FM-21 queue-time-prompt-freeze**: STATE PROBE clause-level smoke sequence at ScheduleWakeup fire-time BEFORE executing stale prompt
- **T1 NEEDS-REVISION conf≥0.85**: Pattern A SINGLE atomic apply per codex-t1-fix-forward-pattern.md §Pattern A
- **T1 REJECT**: Outcome B REVERT-AND-REMOVE per closed-loop-recursive-narrowing.md §Outcome B
- **T1 Pattern B HNF (timeout/zero-investigation)**: ship per prior-fire research + standing-directive defaults; trace-mine for embedded evidence
- **CADP fleet-probe-fail**: defer ship until pool ≥50% (`status.py` probe required before 6th+ dispatch)

---

## Section 11 — Provenance mandate

**Every ship writes**:
- `docs/install-provenance.md` append (canonical install-class artifact log per CR-11 META-process SOTA discipline)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` index entry under 150 chars
- `.claude/state/wave156-progress.jsonl` (or `wave<N>-progress.jsonl` for next wave) append per-ship JSON with ts/ship/commit_sha/status/T1+T2+T3 verdict paths/disposition/scope/cite_class

**docs/install-provenance.md** is the audit-trail mandate per cardinal-rule-11 META-process SOTA discipline. Append at ship-completion; rotate by wave.

---

## Section 12 — Anti-patterns (UPDATED with Wave 156 catches)

- **Skip codex T1 because "this is mechanical edit"** — refuted by Ship 1.1 Pattern A iter-2 (codex T1 caught the parent-bypassPermissions-overrides-subagent-permissionMode gap that I missed in Ship 1)
- **Trust agent prescription verbatim without Mia probe** — refuted by Mia OVER catches Wave 156: Ship 4 plan assumed T6 unwired (actually wired via marketplace .mjs); Ship 5 plan assumed local-judge DISABLED (actually NOT-CONFIGURED entirely); Ships 16-20 plan assumed ECC skills not adopted (actually auto-discoverable via plugin enablement)
- **Bundle multiple design surfaces in one T1** — refuted by codex T1 Pattern B HNF on broad prompts; ≤50 LOC focused prompt + single-claim audit per Section 2
- **Read first verdict hit instead of EOF** — refuted by codex deep-review-exec echoing verdict templates near start; ALWAYS `wc -l + tail -50` first per Section 2
- **Heredoc with single-quotes inside** — refuted by Wave 156 heredoc parse failure; use Write tool to compose + cat-append instead
- **Skip Read before Edit** — Edit tool errors if file not Read in conversation; ALWAYS Read at minimum once before Edit
- **Bypass git-cli-grammar with `git commit -a`** — refuted by FM-02 (b)+(c) destructive race; atomic single-shell `git add -- <path> && git commit -o -F <msg> -- <path>` per git-cli-grammar-discipline.md
- **Ignore HTML-comment-before-frontmatter** — Ship 2.1 lesson: codex T3 flags potential loader regression at HIGH conf=0.86; defensively place HTML comments AFTER closing `---` (matches evaluator.md Ship 1.1 proven pattern)
- **Add github MCP to read-only agents with "disallowedTools list to block writes"** — refuted by Ship 22 codex T1: disallowedTools list only blocks Claude tools NOT MCP write-class tools; exclude github MCP entirely per Ship 1.1 conservative-removal precedent
- **Frontmatter at line 1 with BOM** — evaluator.md Ship 1 lesson: BOM prefix is tolerated by CC loader but Python regex `^---\n` fails to match; ALWAYS strip BOM before YAML parse
- **Treat sibling claude-sota cite as TIER-1** — refuted by citation-discipline.md rule #8: sibling is TIER-3-LOCAL-OPERATOR-DERIVED; CANNOT elevate to TIER-1 SOTA per cite-class lattice; cite-import-AMBER only per CLAUDE.md §14.5
- **Expect T2 to land within 120s** — refuted by Wave 156 T2 timeout n=4 (every commit attempt); Pattern B HONEST-NON-FINDING is the norm; T3 backstop fires async
- **Plan ships without Mia OVER probe FIRST** — refuted by Wave 156 deferred ships (3b/4/5-6/16-20 all caught via state probe before execution; saved ~50% of plan work via Mia OVER discipline)
- **Treat parallel-session FM-02 (c) absorption as failure** — refuted by Wave 156 n=14 firm; semantic ship lands; ACCEPT per FM-02 META-router row #4 + document supplementary memory + no history rewrite

---

## Section 13 — Report mandate (at /goal completion OR mid-arc checkpoint)

**Surface to operator**:
1. All ship commit SHAs (atomic + absorbed; absorbing-commit SHA noted for FM-02 (c))
2. All T1 + T2 + T3 verdict file paths (`.claude/state/codex_consult_*_OUT.txt` + `.claude/state/codex_review_HEAD_*.txt`)
3. LENS results per Section 3 (which LENSes fired; outcomes)
4. 8 conformance percentages re-measured (Section 9 progress tracker)
5. Health-matrix Layer A-K final state
6. Provenance artifacts (docs/install-provenance.md entry + MEMORY.md line + wave<N>-progress.jsonl entries)
7. FM-17.g status (still active OR resolved)
8. FM-02 (c) absorption ladder n + per-ship absorption notes
9. Mia pre-apply ladder n + OVER catches saved
10. Pattern A apply rounds (atomic per ship; iter-2 fix-forward counts)
11. Outcome B reverts (if any)
12. Outcome C manual-overrides (if any; rare; tracked as code-review-burn)
13. Next-wave recommendations (HIGH/MED/LOW priority queue)

---

## Section 14 — Pre-state captured (post-Wave-156)

Refer to **Section 0** of this document. All Wave 156 outcomes documented in:
- `docs/install-provenance.md` Wave 156 close entry (added `ea5f4f4`)
- `.claude/state/wave156-progress.jsonl` (9 entries)
- `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` index line

---

## Section 15 — Wave 156 lessons applied (NEW for v2)

**10 key lessons codified**:

1. **FM-02 (c) absorption is structural** (n=14 firm) — parallel session sweeps every ~3-6min; FAST-commit within ~30s OR accept absorption. Document semantic-ship-landed + audit-trail-drifted.

2. **Mia OVER catches save ships** — state-stale plan items get caught before execution. Wave 156 deferred 4 ships (3b/4/5-6/16-20) saving significant work.

3. **Pattern A iter-2 closed-loop converges Outcome A** — Ship 1 → Ship 1.1 (HIGH conf=0.9 → APPROVE), Ship 2 → Ship 2.1 (HIGH conf=0.86 → APPROVE). Monotone-decline trajectory per closed-loop-recursive-narrowing.md.

4. **T2 timeout 120s is the norm** — Pattern B HNF; T3 backstop fires async; don't extend timeout.

5. **Frontmatter at byte 0 (or BOM+byte 0)** — Ship 2.1 lesson: HTML comments AFTER closing `---`, not before. Defensive even though code-reviewer.md proves leading HTML works.

6. **Parent bypassPermissions overrides subagent permissionMode** — Ship 1.1 lesson: per-agent hooks.PreToolUse:Bash readonly guard is the operational enforcement. Plan-mode alone is NOT a hard Bash boundary in this runtime (CLAUDE.md §Intentional divergences d).

7. **github MCP exclusion for read-only agents** — Ship 22 lesson: disallowedTools list blocks Claude tools NOT MCP write-class tools; exclude github MCP entirely per Ship 1.1 precedent.

8. **codex T1 may flag legitimate uniform patterns** — Ship 22 lesson: codex's "github MCP should be excluded" was already my Edit; verdict NEEDS-REVISION but Pattern A pre-applied. Watch for this pattern.

9. **Verdict reading discipline (EOF FIRST)** — codex deep-review-exec echoes templates near start; ALWAYS tail-50 to find verdict JSON block at file EOF.

10. **Per-file Read before Edit** — Edit tool errors if file not Read in conversation. ALWAYS Read at minimum once.

---

## Pre-paste checklist before invoking /goal

1. Optional env adjustment before eee restart (long-arc):
   ```powershell
   $env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '60'
   ```

2. Verify Wave 156 close artifacts exist:
   - `Z:/claude-sota-installed/docs/install-provenance.md` (Wave 156 close entry at `ea5f4f4`)
   - `Z:/claude-sota-installed/.claude/state/wave156-progress.jsonl` (9 entries)
   - `Z:/claude-sota-installed/tmp/sota-definitive-goal-v2-MAX-DEPTH-2026-05-12-POST-WAVE156.md` (this file, 800+ LOC)

3. Paste the /goal predicate (see Operator Paste-Ready Command below).

---

## OPERATOR PASTE-READY /goal COMMAND

```
/goal "Wave 157 FULL-SOTA terminal automation v2 (post-Wave-156 close). READ AND EXECUTE Z:/claude-sota-installed/tmp/sota-definitive-goal-v2-MAX-DEPTH-2026-05-12-POST-WAVE156.md per its embedded Section 7 terminal predicate. Mandatory: (1) Cardinal rules CR-0 through CR-12 on every meta-step per CR-11 (cite at file:line + HEAD SHA; Karpathy 4 principles; T1-T7 cross-model gates via REAL GPT-5.5 codex; research-first RECALL/INVESTIGATE/VERIFY; native install via CR-6 official channels; graduated unleash; full-SOTA-content; install-risk; research-first-then-install; META-process SOTA; upstream-install over sibling-cite). (2) REAL GPT-5.5 MAXIMUM utilization per Section 2 (Path P codex exec foreground+tee DEFAULT profile with --skip-git-repo-check --color never + 300s timeout; ≤50 LOC focused prompt + single-claim audit + JSON-at-EOF schema; BRIDGE-MODE gpt5-reviewer subagent with model:'sonnet' override per FM-17.g defense; per-call codex budget 90s default / 120s cap / 180s with reason). (3) Adversarial review LENS 1+2+3+4+5+6 per Section 3 on every non-trivial ship (codex T1 + gpt5-reviewer subagent + Mia pre-apply n=415+ + FM-09 2-stage when codex-rescue dispatched + gsd-goal-verifier post-hoc + T3 mechanical). (4) Quality gates 1-11 fail-closed per Section 4. (5) Native install via canonical CR-6 channels per Section 5 (plugin marketplace add/install + npm/pip/uvx/docker; NEVER copy from Z:/repos/deps/). (6) Health check matrix Layer A-K per Section 6 every 5th iteration. (7) Terminal predicate Section 7 — TIER-A high-priority next: SA1 debugger.md 14→16 + SA2 architect.md 15→16 + SA3 code-reviewer.md 15→16 + SA4 .claude/.claude.json gitignore + remove tracked (closes OPEN HIGH T3 0346ebf4). TIER-B medium: SB1 settings.json de-bloat 58k→<32k via 17 _comment_* keys move + SB2-7 PATH D file splits 6 files >40k. TIER-C low: SC1 tmp/ archive + SC2 Ship 24 Iron Law gate. (8) Continuous loop Section 8 per iter (read-state → health-check → context-budget-probe → compact-or-rewind → research → plan-one-bounded → T1 → Mia → Pattern A → LENS 2 → PRE-COMMIT VERIFY → ATOMIC COMMIT FAST [within ~30s to beat FM-02 c absorption n=14 firm] → T2 → T3 → progress-tracker → context-probe → compact-OR-loop). (9) Progress tracking Section 9 8-percentages echoed every iter. (10) Auto-recovery Section 10 on FM-02/09/16/17.a-g/19/20/21 + T1 NEEDS-REVISION conf>=0.85 Pattern A apply / REJECT Outcome B revert / Pattern B HNF trace-mine + CADP fleet-probe-fail. (11) Provenance Section 11 to docs/install-provenance.md + MEMORY.md + .claude/state/wave157-progress.jsonl. (12) Anti-patterns Section 12 fail-closed (UPDATED: Wave 156 catches — heredoc-single-quote-fails / leading-HTML-comment-flagged / github-MCP-disallowedTools-doesn't-block-MCP / T2-120s-timeout-is-norm / first-verdict-hit-not-EOF / parent-bypassPermissions-overrides-subagent-permissionMode / Mia-OVER-saves-ships). (13) Report mandate Section 13 at /goal completion (ship SHAs + verdict file paths + LENS results + 8 percentages + health-matrix + provenance + FM-17.g status + FM-02 c absorption ladder + Mia ladder + Pattern A iter-2 rounds + next-wave recommendations). PRE-STATE: Wave 156 close complete; 8 ships delivered (5 atomic + 3 FM-02 c absorbed; all semantically landed). Agent CCBP closure: 11/11 at 14+ fields (100% from 55% baseline); 4/11 at 16-field full (36% from 0%). T3 NEEDS-REVISION actionable: 0 (closed-loop arcs converged Outcome A). FM-02 c ladder n=14 firm; Mia ladder n=415+. FM-17.g defense active (sonnet override mandatory on Agent dispatches). 4 deferred ships via Mia OVER (Ship 3b/4/5-6/16-20 caught via state probe — DO NOT re-attempt). Plan reference: .claude/plans/cryptic-shimmying-dewdrop.md. COMPACT DISCIPLINE: manual /compact at 25-30% (250-300k for 1M context) with steered hint per coordination.md section 12 + AUTOCOMPACT backstop env CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=60 last-resort. Estimated 4-8h wall-clock for TIER-A; 8-14h for TIER-A+B with live elapsed/turns/tokens panel per CC 2.1.139+ /goal feature. Cite class: effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8."
```

---

## End of definitive v2 SOTA /goal prompt
