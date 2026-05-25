

## 2026-05-08 Wave 97 — Ship 1F-correction: forward-only addendum acknowledging Pattern A F1 violation in Ship 1F (commit 22e58b3)

### Origin

Post-Ship-1F verification (next-turn investigation) revealed that Ship 1F commit `22e58b3` INCLUDED the 220 LOC Wave 80 patches alongside the intended 35 LOC cite-trail header. Pattern A F1 prescribed: "Isolate Ship 1F so the commit contains only cite-trail/documentation changes." The selective-stage attempt via `printf 'y\nq\n' | git add -p` did NOT actually quit after first hunk — subsequent Wave 80 patch hunks got included.

### Disposition: Outcome A ACCEPT-WITH-DOC (per closed-loop-recursive-narrowing.md)

**Why ACCEPT not REVERT:**

1. **Cross-model gate satisfied via prior Wave 80 verdict**: the Wave 80 patches were ALREADY codex T1 reviewed in original Wave 80 deep audit at `.claude/state/codex_consult_wave80_deep_audit_OUT.txt` (1,651,875 bytes). Q3 verdict (verbatim): "codex-plugin-cc #191/#245: Patch now, do not wait. #191 still matches local stop-review-gate-hook.mjs:22 read-before-disabled-gate; #245 still matches broker-lifecycle.mjs:43-56 no shutdown timeout." Confidence 0.96. Prescribed_edit #3: "extend rewriter/check to patch #191 and #245 in both cache + marketplace plugin sources".
2. **Non-mutating sanity probes PASS post-commit** (per Ship 1F-correction codex T1 R1 verdict trace):
   - `py_compile scripts/codex-plugin-hooks-rewrite.py` → SYNTAX-OK
   - `--check --quiet` → "OK: 4 hooks.json clean"
   - P#191/P#245 sentinel + shape checks PASS across 8 cache/marketplace targets:
     - `Z:/claude-sota/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/broker-lifecycle.mjs`
     - `Z:/claude-sota/.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/lib/broker-lifecycle.mjs`
     - `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/lib/broker-lifecycle.mjs`
     - `Z:/claude-sota-installed/.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/lib/broker-lifecycle.mjs`
     - (+4 more analogous paths for stop-review-gate-hook.mjs)
3. **Forward-only per port-note-discipline.md §6**: anti-pattern "Do not rewrite historical commit bodies/snapshots" — historical commit `22e58b3` body documents Pattern A F1 attempt (selective stage) but was incorrect about isolation success. Correction is forward-only addendum here, not retroactive commit-body rewrite.
4. **Lower revert cost**: REVERT-AND-REMOVE would (a) lose cross-model-gated Wave 80 patches, (b) require re-shipping them as separate ship anyway, (c) break the `codex-plugin-hooks-rewrite.py --check` operational layer that's actively patching plugin .mjs files post-commit per Wave 80 prescribed_edit #3.

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | APPROVE | 0.94 | clean single-round; codex independently ran sanity probes + confirmed Wave 80 patches operational across 8 targets |

Verdict file: `.claude/state/codex_consult_wave97_ship1f_correction_addendum_OUT.txt`

Codex rationale verbatim: "Outcome A ACCEPT-WITH-DOC is correct: the Wave 80 behavior delta has prior Q3=0.96 gate coverage, forward-only documentation is preferable to revert/rewrite, and non-mutating sanity probes pass."

### What the Wave 80 patches actually do (in commit 22e58b3)

The 220 LOC of Wave 80 patches address openai-codex plugin upstream issues #191 + #245:

- **WAVE80_191_SENTINEL** marker + **patch_191_stop_review_gate_hook()** function:
  - Issue #191 — `stop-review-gate-hook.mjs#main` reads stdin synchronously BEFORE checking `config.stopReviewGate`, so disabled hooks still pay the stdin-block cost
  - Patch: relocate the `!config.stopReviewGate` fast-exit BEFORE the blocking `readHookInput()` call

- **WAVE80_245_SENTINEL** marker + patch_245 (or similar) function:
  - Issue #245 — `lib/broker-lifecycle.mjs#sendBrokerShutdown` has no shutdown timeout
  - Patch: add timeout to broker shutdown to prevent indefinite waits

- **find_mjs_files()** helper:
  - Discovers .mjs files at relative paths under both runtime cache (`.claude/plugins/cache/openai-codex/codex/<ver>/scripts/`) AND marketplaces (`.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/`)
  - Targets BOTH `Z:/claude-sota/` and `Z:/claude-sota-installed/` runtimes (8 targets total)
  - Idempotent: each patch checks for sentinel marker before re-applying

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT**: `Z:/claude-sota-installed/.claude/state/codex_consult_wave80_deep_audit_OUT.txt` Q3=0.96 (Wave 80 prior cross-model verdict — 1,651,875 bytes; the Wave 80 patches in commit 22e58b3 implement the Q3 prescribed_edit #3)
- **TIER-2 sister**: `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A ACCEPT-WITH-DOC` (cite-import-AMBER per CLAUDE.md Section 14.5)
- **TIER-2 sister**: `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` anti-pattern (cite-import-AMBER) — forward-only, do NOT rewrite historical commit bodies
- **TIER-2 sister**: `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` F1 (selective-stage failure mode documented as future-anti-pattern)

### Lesson learned (codified for future ships)

**Pattern A selective-stage discipline failure**: `printf 'y\nq\n' | git add -p <file>` does NOT reliably quit after first hunk. The `q` may need to be the answer to a SPECIFIC hunk question, not a separate command. Future doc-only Ship-isolations must:

1. **Verify staged scope BEFORE commit** via `git diff --cached --stat` AND `git diff --cached <file> | wc -l`
2. **If staged scope exceeds expected LOC**: stash unstaged changes BEFORE doc-only commit, OR use `git commit --interactive` for true hunk-by-hunk control
3. **Cycle-300 ONE-LOGICAL-UNIT-PER-FIRE check**: doc-only header + provenance entry should produce ~80-200 LOC of staged change; if 500+ LOC, the selective-stage didn't isolate

This is forward-only operator-discipline; no rule promotion needed at n=1 per `codification-threshold.md` cycle-322 jurisdiction.

### Edits

| Path | Change | Tracked |
|---|---|---|
| `docs/install-provenance.md` | +Ship 1F-correction addendum (~85 LOC) | git-tracked |

ZERO code change; ZERO behavior change. Pure forward-only audit-trail correction.

### LAUNCH-DISCIPLINE D1

✅ **REVERSIBLE**: `git revert <correction-commit>` removes addendum without affecting Ship 1F or Wave 80 patches
✅ **OBSERVABLE**: addendum visible in docs/install-provenance.md
✅ **INCREMENTAL**: doc-only addendum; ZERO behavior change

### CR-9 install-risk LOW

- Doc-only edit
- Reversible
- No code modification
- Wave 80 patches REMAIN operational per codex T1 sanity-probe verification

### Cardinal-rule compliance

- **CR-1**: TIER-1-DIRECT cite to Wave 80 verdict file
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (APPROVE 0.94 single-round; codex independently verified sanity probes)
- **CR-5**: doc-only; install-priority unchanged
- **CR-7**: Phase 1 — addendum doesn't change permission scope
- **CR-8**: ADAPTED-FROM-SOTA — Outcome A ACCEPT-WITH-DOC discipline applied
- **CR-9**: install-risk LOW
- **CR-10**: research-first — investigated commit scope + ran sanity probes BEFORE writing addendum
- **CR-11**: META-process SOTA — honest-disclosure of Pattern A F1 violation per cardinal-rule 7 "REPORT errors before routing around them"

### Wave 97 Ship 1F-correction — 19th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 86-96 | (9 ships per prior provenance) | |
| 97-1A | `3c00615` | 1A — claude-md-management plugin |
| 97-1B | `a1f19f0` | 1B — gitleaks v8.30.1 |
| 97-1G | `58be220` | 1G — CLAUDE_CODE_EFFORT_LEVEL=xhigh |
| 97-1C+1D | `0110a9f` | 1C+1D — gitleaks Phase 2 |
| 97-1J | `88aa7b1` | 1J — CLIProxyAPI round-robin |
| 97-1L | `a7adfb6` | 1L — 4 MCP/Bash env-var pins |
| 97-1L-followup | `85905f9` | 1L-followup — full-unleash 3-bump |
| 97-1N | `4050871` | 1N — github/spec-kit v0.8.7 |
| 97-1F | `22e58b3` | 1F — cite-trail headers (UNINTENTIONALLY included Wave 80 patches; closed via this correction) |
| **97-1F-correction** | **THIS** | **1F-correction — forward-only addendum acknowledging Pattern A F1 violation** |

### Outstanding queue (post Ship 1F-correction)

- **Ship 1J-followup** (operator-decision): equalize active Claude account priorities for TRUE round-robin burst-distribution
- **Wave 80 patches** — ALREADY committed in 22e58b3 (no separate ship needed; Q3 prescribed_edit #3 satisfied)

### Update triggers

Re-evaluate when:
- Future doc-only ship isolation fails again — promote operator-discipline lesson to rule-layer
- `codex-plugin-hooks-rewrite.py --check` ever fails post-deploy — would surface that Wave 80 patches aren't operating correctly
- openai-codex upstream lands fixes for issues #191/#245 — would retire the Wave 80 patches per RETIREMENT-CONDITION cited in script header
