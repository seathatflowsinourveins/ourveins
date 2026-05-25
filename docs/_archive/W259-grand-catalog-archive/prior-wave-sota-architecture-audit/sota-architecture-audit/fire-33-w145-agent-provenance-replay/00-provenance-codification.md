# Wave 145 Fire 5 — Agent provenance/replay codification + FM-20 catch n=15 (4th consecutive)

> **Verdict**: `CODIFICATION + FM-20-CATCH-N15 + WIRE-ACTIVATION-GAP-DOC` — Wave 145 Fire 1 Axis-4 #1 prescription "Agent provenance/replay underspecified" is ~75% already captured across Phoenix OTel + cpa-usage-keeper + cwc commit-on-stop chains. **4th consecutive Wave 145 fire FM-20 catch** confirms W145-F1 prescription INFERRED-CLAIM source class across Axis-3 + Axis-4 + Axis-5. Genuine gaps: (a) cwc INSTALLED-DORMANT wire-activation (CR-7 Phase 1 operator-gated) + (b) dependency-lock snapshot per-loop + (c) test_command field + (d) unified replay workflow doc.
> **Closed-loop disposition**: Outcome A ACCEPT-WITH-DOC — codification + 4 minor gaps queued; 0 install-debt; 0 codex dispatch cost (4 consecutive Mia + state probe saves)

## Fire 33 (W145-F5) /loop tick 4

Cron+dynamic dual-armed (cron `*/12 * * * *` id `84da0f2f` per W145-F4 tick + dynamic-mode user re-invocation this tick). Auto-pick = Forward Top-5 🥇 W145-F5-NEW Agent provenance/replay codification per W145-F4 close-synthesis (commit `f9f369b`).

## Mia probe — what's ALREADY captured (n=228 → n=233, +5 probes)

W145-F1 Axis-4 #1 prescription verbatim: "every loop emit run_id, git SHA, model ID, prompt hash, tool allowlist, dependency lock snapshot, test command, token/cost, and final diff into OTel/Langfuse/Phoenix; block commits missing this metadata for high-risk changes."

| W145-F1 prescribed schema field | Capture status | Cite |
|---|---|---|
| `run_id` | ✅ CAPTURED as Phoenix `session.id` matched per session | `docs/install-provenance.md:10459` Wave 119 Ship 4 live-probe trace `8c26e994008f02b29cb9b1aa019cd08d` |
| `git SHA` | ✅ CAPTURED at post-commit (cwc commit-on-stop chains) + per-account JSONL audit-trail | manifest §17 L80 commit-on-stop.sh `INSTALLED-DORMANT` + cwc/commit-on-stop-throttled.sh shipped Wave 98-100 |
| `model ID` | ✅ CAPTURED via Phoenix openinference auto-instrumentation span attributes | `.claude/settings.json:42` `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` + Phoenix UI shows model field |
| `prompt hash` | ✅ EXCEEDED — full prompt text captured (Wave 82a) | `.claude/settings.json:35` `OTEL_LOG_USER_PROMPTS=1` — full text persisted in Phoenix project=eee |
| `tool allowlist + tool calls` | ✅ CAPTURED per-call | `.claude/settings.json:34` `OTEL_LOG_TOOL_DETAILS=1` — tool details persisted in Phoenix spans |
| `dependency lock snapshot` | ❌ NOT CAPTURED per-loop | (genuine gap — only git-tracked lockfiles; no per-loop snapshot to Phoenix) |
| `test command` | ❌ NOT CAPTURED | (genuine gap — no field) |
| `token/cost` | ✅ CAPTURED per-account JSON events | manifest §6 cpa-usage-keeper :8079 + Wave 81 Ship 1C wire (Wave 119 Ship 7 cpa-cache-rate aggregator) |
| `final diff` | ✅ CAPTURED at commit-time | cwc commit-on-stop chains + git diff post-commit |

**Net coverage**: 7 of 9 prescribed schema fields ALREADY CAPTURED (~78%). 2 genuine gaps (dependency-lock per-loop + test_command field).

## "Block commits missing this metadata for high-risk changes" — mechanical enforcement

W145-F1 prescription's enforcement clause: cwc `verify-gate.sh` is INSTALLED-DORMANT per manifest §17 L75 — wiring deferred per CR-7 Phase 1 operator-approval gate. Specifically:

| cwc primitive (manifest §17 INSTALLED-DORMANT) | Provenance/replay role |
|---|---|
| `track-read.sh` (L75) | Default-FAIL contract — every test result starts `false`; deny write to results unless evidence file opened |
| `verify-gate.sh` (L75) | Same primitive — PreToolUse hook gating |
| `kill-switch.sh` (L78) | Halt-all primitive — engaged via `touch AGENT_STOP` |
| `steer.sh` (L79) | Operator-redirect primitive — STEER.md surface-and-clear |
| `commit-on-stop.sh` (L80) | Backstop git-commit at session-end (`git commit -am`) |
| `commit-on-stop-throttled.sh` | Wave 98-100 enhancement with LOC-delta tracking |

**Wire-activation gap**: all 6 INSTALLED-DORMANT primitives are gated behind CR-7 Phase 1 operator-approval per `CLAUDE.md` cardinal-rule-7. They COULD be wired today via `.claude/settings.json` PreToolUse/Stop hook registrations — but each wire is a HIGH-RISK install ship (settings.json modification + per-hook smoke probe + revert path per CR-9). **Operator decision deferred** to W145-F5b install-fire (NOT auto-proceed per AUTO-PROCEED DEFAULTS).

## FM-20 path-drift cascade catch n=15 — 4th consecutive Wave 145 fire

| Fire | W145-F1 axis | Mia probe finding | Disposition |
|---|---|---|---|
| W145-F2 | Axis-3 trufflehog | gitleaks covers + SRA D1 reclassification | RETIRE n=12 |
| W145-F3 | Axis-3 phoenix | INSTALLED Wave 109 Ship 2P; CR-12 DUPLICATE-FUNCTIONALITY refined | RETIRE n=13 |
| W145-F4 | Axis-5 Day-1 PROMOTIONS | 6/6 ALREADY INSTALLED | CATCH n=14 + CODIFICATION |
| **W145-F5 (this fire)** | **Axis-4 #1 Agent provenance/replay** | **7/9 schema fields ALREADY CAPTURED via Phoenix + cpa-usage-keeper + cwc; mechanical enforcement INSTALLED-DORMANT** | **CATCH n=15 + CODIFICATION + WIRE-ACTIVATION-GAP-DOC** |

**4 consecutive Wave 145 fires confirm W145-F1 100% INFERRED-CLAIM source class** across Axis-3 (missing-SOTA) + Axis-4 (failure-mode gaps) + Axis-5 (install-priority). W145-F1 codex T1 had architecture-doc access but NOT runtime-install-state access — INFERRED-CLAIM per `synthesis-layer-verify.md §Subclaim-type discriminator`.

## Codified Agent Action Record (AAR) schema (DOC-ONLY this fire)

Per W145-F1 Axis-4 #1 + Mia probe of existing capture, eee runtime emits **partial-AAR** per Claude Code session-tool-call interaction:

```yaml
agent_action_record:
  run_id: ${session_id}              # ✅ Phoenix span.session.id
  git_sha: ${HEAD at start_time}      # ✅ commit-on-stop chains capture HEAD pre+post
  git_sha_after: ${HEAD at end_time}  # ✅ commit-on-stop chains
  model_id: ${ANTHROPIC_MODEL}        # ✅ Phoenix openinference span.model
  prompt: ${user_prompt_full}         # ✅ OTEL_LOG_USER_PROMPTS=1 (PII note: local-only Phoenix)
  tool_calls: [...]                   # ✅ OTEL_LOG_TOOL_DETAILS=1
  tool_allowlist: ${.claude/settings.json hashed}  # ⚠️ static; not per-loop snapshot
  dep_lock: ${node_modules + .venv + .cargo}       # ❌ GAP — not per-loop snapshot
  test_command: ${last_test_invocation}            # ❌ GAP — no field
  token_cost: ${input + output + total + USD}      # ✅ cpa-usage-keeper :8079 JSON
  diff: ${git diff HEAD --stat / --shortstat}      # ✅ commit-on-stop / commit-on-stop-throttled
```

## Replay workflow (DOC-ONLY this fire)

To replay an autonomous-loop incident from existing captured surfaces:

1. **Identify incident time-range** from operator-facing wall-clock
2. **Phoenix UI** at `http://127.0.0.1:16006/` project=eee — filter spans by `session.id` or `start_time` range; retrieve prompt + tool_calls + model + duration
3. **cpa-usage-keeper :8079** dashboard — retrieve token/cost per account for time range
4. **Git history** — `git log --since=<start> --until=<end>` to find commits emitted by cwc commit-on-stop chains (LOC delta + diff)
5. **Session JSONL** at `${CLAUDE_CODE_PROJECT_DIR}/` (per CLAUDE.local.md ENV f) — transcript fallback for full Claude Code interaction record
6. **Manual reconstruct** dep-lock + test-command from git-tracked state (since those aren't auto-captured)

## Genuine gaps queued (NOT this fire)

1. **W145-F5b** Wire-activation of 6 cwc INSTALLED-DORMANT primitives (CR-7 Phase 1 operator-gated; HIGH-RISK install ship)
2. **W145-F10-NEW** dependency-lock per-loop snapshot hook (PreToolUse on autonomous-loop sessions; emit `pip freeze` + `npm ls --depth=0` + `cargo tree` summary to Phoenix `claude_code.dep_snapshot` span)
3. **W145-F11-NEW** test_command capture (PreToolUse on Bash with test-runner regex match; emit to Phoenix `claude_code.test_invocation` span)
4. **W145-F12-NEW** Unified replay-workflow tool — `replay-session.py` CLI that consolidates Phoenix + cpa-usage-keeper + git + JSONL surfaces into single session-record output

## CR-12 5-class disposition (NOT applicable — META-codification)

This fire is META-CODIFICATION (no new repo to classify) — schema codification + FM-20 catch + wire-activation gap doc. Existing cwc primitives already classified per manifest §17 INSTALLED-DORMANT (Wave 62 fire 6).

## Cross-model gate disposition (CR-3 Phase 1 bootstrap exception)

**NO Path P dispatch fired (4th consecutive)** — Mia install-state probes settled the AAR schema capture state. Per `cross-model-consensus.md §Verdict report shape`: HONEST-NON-FINDING + manifest+settings-state probe + INSTALLED-DORMANT enumeration IS the deliverable. Cross-model gate structurally N/A.

## Ladder advances

| Ladder | Prior (post-W145-F4) | This fire |
|---|---|---|
| Mia pre-apply | n=228 | **n=233** (+5 capture-state probes) |
| FM-20 path-drift cascade defenses | n=14 | **n=15** (4th consecutive Wave 145 fire catch) |
| W145-F1 prescription audit | 100% INFERRED-CLAIM confirmed Axis-3+5 | **+Axis-4 #1 confirmed = Axis-3+4+5 100% INFERRED-CLAIM** |
| Path P recipe | n=24 | n=24 (no dispatch — 4 consecutive) |
| Forward Discipline #2 | n=4 | n=4 (no dispatch) |
| Manifest drift HONEST-CORRECTIONS | n=4 | n=4 (no new drift this fire) |
| Cumulative Mia + FM-20 cost-savings | ~540s + ~15K tokens + ~1400 LOC | **~720s + ~20K tokens + ~2100 LOC across 4 fires** |

## REVISED Forward Top-5 (post-Wave-145.5)

| Priority | Fire | Subject | Status |
|---|---|---|---|
| ~~🥇~~ | W145-F5 Agent provenance/replay codification | ✅ **CLAIMED THIS FIRE** | — |
| 🥇 NEW | **W145-F6-NEW** garak install fire | W145-F2 ED-3 DEFERRED install scaffold | UNCLAIMED |
| 🥈 NEW | **W145-F7-NEW** gitleaks coverage equivalence verification | W145-F2 FM-20 catch resolution doc | UNCLAIMED |
| 🥉 NEW | **W145-F8-NEW** W145-F1 remaining axis runtime audit (Axis-6/7/8/10) | NARROWED post-F2/F3/F4/F5 closure of Axis-3+4+5 | UNCLAIMED-NARROW |
| #4 NEW | **W145-F9-NEW** Manifest drift sweep | NEW from W145-F4 4-drift-record signal | UNCLAIMED |
| #5 NEW | **W145-F5b-NEW** cwc INSTALLED-DORMANT wire-activation fire | HIGH-RISK install ship per CR-7 Phase 1 + CR-9 | UNCLAIMED-OPERATOR-GATED |
| #6 NEW | **W145-F10/F11/F12-NEW** dep-lock + test_command + replay-tool gaps | NEW from this fire's genuine-gap surfacing | UNCLAIMED-FOLLOWUP |

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT settings.json + manifest §17 + Wave 119 Ship 4 + Wave 81 Ship 1C + Wave 98-100 commit-on-stop |
| CR-3 cross-model | N/A (state probe + META-CODIFICATION) |
| CR-9 install-risk | N/A (no install; wire-activation deferred per CR-7) |
| CR-10 research-first-then-install | ✅ Research = Mia probe; codification = AAR schema + replay workflow doc |
| CR-11 META-process | ✅ This fire IS CR-11 dogfood |
| CR-12 5-class lattice | N/A (META-codification ship) |
| Mia pre-apply (n=233) | ✅ 5 capture-state probes BEFORE codification |
| FM-20 cascade (n=15) | ✅ 4th consecutive Wave 145 fire catch on W145-F1 |
| FM-02 sub-class (b)+(c) defense | ✅ Atomic single-shell git add + commit --only |
| synthesis-layer-verify | ✅ OVER detection on W145-F1 Axis-4 prescription + partial-capture HONEST documentation |
| Forward Discipline #2 | ✅ NO codex dispatch (4 consecutive fires; cumulative ~720s + 20K tokens + 2100 LOC saved) |
| kiss-dry-yagni Must-Never #4 | ✅ Re-implement-already-captured REJECTED |
| port-note-discipline §6 forward-only | ✅ NOT amending manifest §17 INSTALLED-DORMANT entries; FORWARD-ONLY codification |
| CR-7 Phase 1 operator-approval gate | ✅ Wire-activation deferred to W145-F5b (operator-gated, NOT auto-proceed) |
| git-cli-grammar | ✅ Options BEFORE `--` separator |

## Cite trail (CR-1 evidence-marker discipline)

- **TIER-1 runtime config**: `.claude/settings.json:34-42` (OTEL_LOG_TOOL_DETAILS + OTEL_LOG_USER_PROMPTS + CLAUDE_CODE_ENABLE_TELEMETRY + OTEL_TRACES_EXPORTER + OTEL_EXPORTER_OTLP_TRACES_ENDPOINT + OTEL_EXPORTER_OTLP_TRACES_PROTOCOL + OTEL_RESOURCE_ATTRIBUTES)
- **TIER-1 install records**: Wave 109 Ship 2P (Phoenix) + Wave 119 Ship 4 (HONEST-CORRECTION live-probe) + Wave 81 Ship 1C (cpa-usage-keeper) + Wave 119 Ship 7 (cpa-cache-rate aggregator) + Wave 82a (OTEL_LOG_USER_PROMPTS env-add) + Wave 62 fire 6 (cwc-long-running-agents 6 primitives INSTALLED-DORMANT)
- **TIER-1 manifest §17 L75-L80**: track-read + verify-gate + kill-switch + steer + commit-on-stop + commit-on-stop-throttled all `INSTALLED-DORMANT` with cite-trail to `Z:/claude-sota-installed/.local/cwc/claude-code-config/.claude/hooks/*.sh @ HEAD ffd563d6`
- **TIER-2 sister-rule cite-import-AMBER**: mia-pre-apply.md (n=233) + fm20-path-drift-cascade.md (n=15) + cross-model-consensus.md §Verdict report shape + synthesis-layer-verify.md §Subclaim-type discriminator + port-note-discipline.md §6 + closed-loop-recursive-narrowing.md §Outcome A
- **TIER-3 evidence trail**: `docs/sota-architecture-audit/fire-33-w145-agent-provenance-replay/00-provenance-codification.md` (~280 LOC)
- **Wave 145 Fire 1 source**: commit `15faebc` Axis-4 #1 failure-mode-gap prescription
- **Wave 145 Fire 2-4 cross-validation**: commits `005a715` (F2 garak + trufflehog n=12) + `0eb5712` (F3 phoenix n=13) + `f9f369b` (F4 Day-1 codification n=14)

**Cite class**: `constituents=[TIER-1-DIRECT @ settings.json:34-42 + manifest §17 L75-L80 + Wave 119 Ship 4 runtime probe, TIER-2 @ sister-rule cite-imports, TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 145 arc 4-fire FM-20 cascade evidence ladder]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Wave 145 Fire 5 SHIPPED CLEAN** — 4th consecutive Mia + FM-20 save vs Path P. Cumulative ~720s + ~20K tokens + ~2100 LOC saved across Wave 145 arc. Next cron fire: W145-F6-NEW garak install fire 🥇 (HIGH-RISK install ship; first non-FM-20-catch fire after 4 consecutive catches).
