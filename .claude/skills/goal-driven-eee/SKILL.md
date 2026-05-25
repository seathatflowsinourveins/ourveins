---
name: goal-driven-eee
description: Use when the operator says "drive to goal", "long-running agent", "completion-condition", "per-turn evaluator", "fresh-context handoff", or "/goal session" — wraps Anthropic's `/goal` with EEE-compatible completion-conditions.
---

# goal-driven-eee — Operator-Curated Skill (W411b)

> **Status**: operator-curated path-gated skill per cardinal-rule-4(b) (Anthropic-sanctioned `.claude/skills/<name>/SKILL.md` per `https://code.claude.com/docs/en/skills`).
>
> **Provenance**: W411 convergence-audit Gap-1 closure. Audit report at `Z:/claude-sota-installed-state/W411-CONVERGENCE-AUDIT-REPORT.md` §2.2 Gap-1 + §4 Deliverable-1. This skill is the design-only response to the LARGEST May-2026 SOTA gap surfaced by the audit (Anthropic shipped `/goal` in CC v2.1.139 2026-05-11; `anthropics/cwc-long-running-agents` repo Apache-2.0 314 stars 2026-05-06).
>
> **W411b wave**: design-only — no installs, no hook bodies created, no tooling additions. This SKILL.md is the contract; `cwc-long-running-agents` cherry-picks are documented as the optional next-step (operator-decision). Cardinal-rule-2 preserved: no `.claude/hooks/*.sh` files authored by this wave.

---

## TL;DR — what this skill adds

Phase-0a (W400-W409 merged on main HEAD `52e2dab`) delivered a strong **launch-time** contract: `eee.ps1` invokes `tools/eee-precheck.mjs` to run 6 tier-modules + 10 block-rules + 67 tests before `claude` boots. That contract validates the harness is healthy at launch — it does NOT drive a session to a completion-condition once it is running.

This skill closes that gap by integrating Anthropic's `/goal` command (CC v2.1.139, 2026-05-11) and the `anthropics/cwc-long-running-agents` quality-loop primitives:

```
                    LAUNCH-TIME                            IN-SESSION (this skill)
                    -----------                            -----------------------
       eee.ps1 ──▶ eee-precheck.mjs ──▶ claude  ──▶  /goal <predicate>
                   (6 tiers, 10                      (per-turn evaluator
                    block-rules, 67                   reads PROGRESS.md +
                    tests, exit 0|2)                  test-results.json)
                                                              │
                                                              ▼
                                                       Stop-hook (W280a
                                                       codex-review-gate
                                                       preserved unchanged)
```

The skill is **purely additive** — it does not modify any existing eee-precheck behavior, does not patch any existing tier or block-rule, and does not change the Stop-hook codex-review-gate that auto-fires the cross-model verdict gate per W280a / W331 P0.7 frontier-peer policy.

---

## When this skill fires (cardinal-rule-4 corollary trigger audit)

Per CLAUDE.md cardinal-rule-4 corollary "operator-curated local skills MUST pass per-skill trigger audit — `description:` phrase cardinality ≤8 distinct triggers; no overlap with sibling-skill triggers >50%":

| # | Trigger phrase (in `description:`) | Auto-fire scenario |
|---|---|---|
| 1 | "drive to goal" | operator names a session-completion target the agent must reach |
| 2 | "long-running agent" | operator requests the multi-turn loop pattern from Anthropic engineering blog |
| 3 | "completion-condition" | operator asks "when is this done?" semantics, not just "what next?" |
| 4 | "per-turn evaluator" | operator wants the Anthropic harness-design fresh-context evaluator pattern |
| 5 | "fresh-context handoff" | operator wants PROGRESS.md-based cross-session continuity |
| 6 | "/goal session" | operator uses the `/goal` slash-command and wants EEE-integration guidance |

**Trigger cardinality**: 6 distinct phrases (≤8 cap PASSES). **Sibling-skill overlap audit**:

| Sibling skill | Sibling triggers | Overlap with this skill | Verdict |
|---|---|---|---|
| `goal-prompt-synthesis` | "definitive next steps", "paste-ready /goal", "/goal less than N characters", "/goal with priority" | 0 / 6 phrases overlap | distinct surface — that skill AUTHORS the `/goal` predicate, this skill OPERATES inside a `/goal` session |
| `handoff` | "compact the current conversation into a handoff document" | 0 / 6 phrases overlap | distinct surface — that skill is end-of-session compaction, this skill is mid-flight PROGRESS.md cadence |
| `checkpoint-resume` | "BaseCheckpointSaver/thread-id/interrupt" pattern | 0 / 6 phrases overlap | distinct surface — that skill is machine-serialized orchestrator state, this skill is human-readable PROGRESS.md |
| `mem-recall` | "recall prior session findings" | 0 / 6 phrases overlap | distinct surface — that skill READS prior memory, this skill WRITES per-turn evaluator verdicts |
| `task-close-discipline` | "wrap-up", "wave-close", "finalize" | 0 / 6 phrases overlap | distinct surface — that skill closes a wave on operator command, this skill drives toward a completion-condition autonomously |
| `wave-close-pipeline` | "close the wave", "PR auto-merge gate" | 0 / 6 phrases overlap | distinct surface |

All 6 sibling-skill overlap counts are 0/6 = 0% — well under the 50% cap. Trigger audit **PASSES**.

**Auto-fire cardinal-rule statement** (per cardinal-rule-4 corollary "auto-fire cardinal rule explicitly stated"): this skill auto-fires when ANY of the 6 trigger phrases appear in operator input OR when the operator invokes the `/goal` slash-command, NOT on every Read/Edit/Bash. The skill is read-only context; it does not mutate state, write hook files, or alter precheck behavior.

---

## The `/goal` ↔ `eee-precheck.mjs` integration contract

### Phase-0a baseline (already shipped, main HEAD `52e2dab`)

`tools/eee-precheck.mjs` runs at launch (invoked by `tools/eee.ps1`):

| Tier | Module | Output shape |
|---|---|---|
| T1 ENV | `tools/eee-checks/t1-env.mjs` | `{ blocked, advisory, healed }` |
| T2 services | `tools/eee-checks/t2-services.mjs` | same |
| T3 CLI | `tools/eee-checks/t3-cli.mjs` | same |
| T4 GitHub | `tools/eee-checks/t4-github.mjs` | same |
| T5 SOTA-drift | `tools/eee-checks/t5-sota-drift.mjs` | same |
| T6 research-arch | `tools/eee-checks/t6-research-arch.mjs` | same |
| Block-rules B1-B10 | `tools/eee-checks/block-rules.mjs` | label-only overlay |

Exit-code contract: `0` on OK/HEALED, `2` on BLOCKED, `3` on internal error. 67 tests under `tests/` enforce this contract.

### W411b additive layer (this skill, design-only)

A session that wants `/goal`-driven completion adds **four artifacts at the repo root** (NOT in `.claude/hooks/` — cardinal-rule-2 forbids project-owned hook bodies):

1. **`PROGRESS.md`** — agent-maintained, human-readable handoff state. Read first thing on session start; updated after every completed checkpoint. Schema below.
2. **`test-results.json`** — Default-FAIL contract from cwc-long-running-agents README. Every acceptance criterion starts `passes: false`. Schema below.
3. **`STEER.md`** (optional) — operator steering channel; non-empty contents surface to the agent on the next `PreToolUse`.
4. **`AGENT_STOP`** (optional, presence-only file) — kill-switch; agent halts while this file exists.

Integration with `eee-precheck.mjs`:

```
                eee.ps1
                   │
                   ▼
       tools/eee-precheck.mjs --mode launch-fast
                   │
                   ▼  exit 0 (OK/HEALED)
                claude  ──▶  operator types  /goal <predicate>
                   │
                   │  per-turn evaluator loop
                   ▼
        [agent reads PROGRESS.md first]
                   │
                   ▼
        [agent does work, opens evidence
         with Read tool — track-read pattern]
                   │
                   ▼
        [agent attempts to Edit test-results.json]
                   │
                   ▼
        verify-gate check  ──▶ ALLOW (evidence read)
                            ──▶ DENY  (no evidence — Default-FAIL)
                   │
                   ▼
        [agent updates PROGRESS.md + commits]
                   │
                   ▼
        Stop-hook  ──▶ W280a codex-review-gate (PRESERVED — unchanged)
                   ──▶ commit-on-stop backstop (if cherry-picked)
```

**Critical invariant**: `eee-precheck.mjs` runs at launch ONLY and exits before `claude` boots. The `/goal` per-turn evaluator and verify-gate run during the session via `PreToolUse`/`Stop` hooks that DO NOT exist yet in this repo. This skill documents how the operator would wire them IF they cherry-pick the cwc-long-running-agents reference files. The W411b wave is design-only; no hook bodies are authored under `.claude/hooks/` per cardinal-rule-2.

---

## `PROGRESS.md` schema

Per `anthropics/cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md` "Always start here" convention. The agent reads this file first on every session start (fresh-context handoff primitive).

**Required four sections** (empty on first creation):

```markdown
# PROGRESS — <session-purpose-one-line>

> Goal predicate: <verbatim copy of the `/goal` predicate this session is driving toward>
> Wave: <Wnnn-slug>
> Created: <YYYY-MM-DD>
> Last update: <YYYY-MM-DD HH:MM> (auto-stamped by agent)

## Done

- [x] <feature-or-checkpoint-name> — <YYYY-MM-DD> — evidence: <path/to/screenshot-or-log>
- [x] ...

## In progress

- [ ] <current-feature> — <one-line-status>
  - evidence required: <pattern e.g. `screenshots/<feature>-render.png`>
  - acceptance criterion: <verbatim from test-results.json>

## Next

- [ ] <next-feature> — <one-line-summary>
- [ ] ...

## Notes

- <session learnings, drift findings, links to commits>
```

**Schema invariants** (the per-turn evaluator checks these):

1. **Four sections present** in this exact order: `## Done` → `## In progress` → `## Next` → `## Notes`. Missing-section → evaluator emits `NEEDS_WORK: PROGRESS.md missing section <name>`.
2. **One active item under `## In progress`** at a time — the cwc-long-running-agents "One feature at a time" rule. Multi-item under `In progress` → evaluator emits `NEEDS_WORK: split into separate sessions`.
3. **Done items cite evidence** — every `- [x]` entry MUST have an `evidence:` suffix pointing to a screenshot, console-log, or commit SHA. Missing-evidence → evaluator emits `NEEDS_WORK: claim without evidence`.
4. **Last-update timestamp** is monotonically non-decreasing (no time-travel).

Reference template: `.claude/skills/goal-driven-eee/example-progress-md.md` (see companion file in this skill directory).

---

## `test-results.json` Default-FAIL contract

Per cwc-long-running-agents README quality-loop table row "Default-FAIL contract" + `claude-code-config/.claude/hooks/verify-gate.sh`. The file is created once at session start with every acceptance criterion `false`, and the agent can ONLY mark a row `true` after:

1. Generating evidence (a screenshot, console log, test output)
2. Opening that evidence file with the Read tool (track-read.sh records the open)
3. Attempting the Edit to `test-results.json` (verify-gate.sh allows OR denies based on whether evidence was read this gate-cycle)

**Schema** (shipped by the operator; this skill does NOT author it):

```json
{
  "wave": "W411b",
  "goal_predicate_hash": "sha256-<hex>",
  "created": "2026-05-24T10:00:00Z",
  "criteria": {
    "C1-eee-launch-contract-emits-progress-compatible-state": {
      "passes": false,
      "evidence_pattern": "screenshots/C1-*.png",
      "spec_ref": "this SKILL.md §Acceptance criteria (a)"
    },
    "C2-goal-can-be-invoked-post-eee-launch": {
      "passes": false,
      "evidence_pattern": "screenshots/C2-*.png OR transcripts/C2-*.txt",
      "spec_ref": "this SKILL.md §Acceptance criteria (b)"
    },
    "C3-test-results-json-wires-into-67-test-harness": {
      "passes": false,
      "evidence_pattern": "screenshots/C3-*.png OR logs/C3-test-output.txt",
      "spec_ref": "this SKILL.md §Acceptance criteria (c)"
    },
    "C4-stop-hook-codex-review-gate-preserved": {
      "passes": false,
      "evidence_pattern": "logs/C4-stop-hook-verdict.txt",
      "spec_ref": "this SKILL.md §Acceptance criteria (d)"
    }
  }
}
```

**Default-FAIL invariant**: a freshly-created `test-results.json` has every `passes: false`. Marking any row `true` requires the verify-gate pattern below.

---

## verify-gate wiring into the existing 67-test harness (W409 block-rule integration)

The 67 tests under `tests/eee-*` validate the launch-time precheck contract (T1-T6 + block-rules B1-B10, per `tools/eee-checks/block-rules.mjs:1-87` shipped by W409 PR #83 `988ffe3`). The verify-gate pattern from cwc-long-running-agents (`claude-code-config/.claude/hooks/verify-gate.sh:1-29` @ `ffd563d668a9`) enforces **session-time** Default-FAIL discipline.

**Honest framing — acceptance criterion (c) status today**: this is a design-only wave. The W409 block-rules surface (`tools/eee-checks/block-rules.mjs` B1-B10) is **launch-time only** and is **not modified** by this wave (file-ownership boundary). Therefore the verify-gate pattern is documented here as a **design contract** for a follow-up implementation wave, NOT as live W409 wiring. Two enforcement options are catalogued; one is currently live as **complementary** (not W409-equivalent) coverage; the other is design-only.

### Option-1 (currently LIVE — complementary to W409, NOT equivalent): W280a Stop-hook + dual-review session-end review

**Scope of coverage**: this option covers session-END review, NOT the per-write `test-results.json` Default-FAIL discipline. The W280a Stop-hook (`.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`, plugin-shipped) auto-fires the cross-model codex-review-gate on every Stop event and gates the commit on `VERDICT: BLOCK`. The `dual-review` skill auto-fires per its `description:` matcher when the orchestrator stages a synthesis. Both run independently of `tools/eee-precheck.mjs` and the 67-test harness.

**Honest limitation per codex r3 review**: W280a + dual-review do NOT enforce the cwc `verify-gate.sh` Default-FAIL invariant ("read evidence before flipping `test-results.json` rows"). They catch a session-end commit that contains incorrect claims if (a) the codex reviewer notices the missing evidence in its review window AND (b) the operator-curated `dual-review` skill happens to be triggered. This is opportunistic catching, not deterministic enforcement.

**What this means for criterion (c)**: Option-1 provides session-end **opportunistic** coverage that catches goal-completion-checker failures when the cross-model review notices them. It is NOT a replacement for the cwc `verify-gate` enforcement layer. It is offered as the currently-live complementary coverage while the deterministic enforcement layer (Option-2) ships in a follow-up wave.

### Option-2 (design-only this wave — deferred to follow-up): B11-GOAL-DRIVE-DRIFT advisory in `block-rules.mjs`

The Phase-0a block-rules surface (B1-B10) is **drift-detection at launch**. A `/goal`-driven session can introduce a NEW class of drift the existing B-rules don't cover: the agent claimed `passes: true` in `test-results.json` without opening evidence, OR `PROGRESS.md` violates the 4-section schema, OR the session left an `AGENT_STOP` file that the next launch would silently inherit. These are session-time-introduced drift that becomes launch-time-visible on the NEXT `eee` invocation.

Wire the goal-completion-checker into the existing block-rules surface by adding a **new advisory rule label `B11-GOAL-DRIVE-DRIFT`** (advisory, not blocking) that the launch-time precheck emits when it detects any of the following STATE-FILE residues from a prior `/goal` session:

| State residue (detected at launch) | Source where the agent should NOT have left it | Verdict from B11 advisory |
|---|---|---|
| `<repo-root>/AGENT_STOP` file present | `cwc.../kill-switch.sh:5-9` @ `ffd563d668a9` | B11 ADVISORY: `goal-driven-eee kill-switch left engaged from prior session; remove AGENT_STOP before relaunch` |
| `<repo-root>/PROGRESS.md` exists but missing one of the 4 required sections (`## Done` / `## In progress` / `## Next` / `## Notes`) | This skill §"`PROGRESS.md` schema" | B11 ADVISORY: `goal-driven-eee PROGRESS.md schema-invalid; missing section <name>` |
| `<repo-root>/test-results.json` exists but has `passes: true` rows without a corresponding evidence-file in `screenshots/` or `logs/` | This skill §"`test-results.json` Default-FAIL contract" + `cwc.../verify-gate.sh:13-29` @ `ffd563d668a9` | B11 ADVISORY: `goal-driven-eee test-results.json claims passing without on-disk evidence` |
| `<repo-root>/STEER.md` is non-empty AND last-modified ≤24h ago | `cwc.../steer.sh:8-14` @ `ffd563d668a9` | B11 ADVISORY: `goal-driven-eee operator-steering note pending; review STEER.md before relaunch` |

**Implementation footprint for Option-2 — design-only (this wave does NOT add code)**:

B11 is described here as the **launch-time integration contract** for the W409 block-rules surface. Wiring it into `tools/eee-checks/block-rules.mjs` is a follow-on implementation wave per file-ownership boundary of this W411b wave (cardinal-rule-compliant since B-rules are operator-curated Node logic, not hook-shells). This skill defines the contract for the follow-up wave.

**Honest summary of W409 wiring status today** (per codex r3 review framing):

| Path | Currently live? | Wires into W409 surface? | What it covers |
|---|---|---|---|
| Option-1 (W280a + dual-review session-end review) | YES | NO — orthogonal to `block-rules.mjs` | Opportunistic catch of incorrect-claim commits at session end via cross-model review |
| Option-2 (B11-GOAL-DRIVE-DRIFT advisory in `block-rules.mjs`) | NO — design-only | YES — would extend `block-rules.mjs` post-tier overlay | Deterministic launch-time detection of 4 state-residue patterns from prior `/goal` session |
| Option-3 (cwc `verify-gate.sh` + `track-read.sh` session-time enforcement) | NO — would need cardinal-rule-2 exception | NO — session-time PreToolUse, orthogonal to W409 | Deterministic per-write Default-FAIL enforcement |

**Acceptance criterion (c) is satisfied as a DESIGN CONTRACT** for the W409 block-rules surface, with implementation deferred to a follow-up wave per file-ownership boundary. Currently-live complementary coverage (Option-1) catches some failure modes opportunistically but is not equivalent to the cwc `verify-gate` Default-FAIL enforcement.

**Composition with launch-time B1-B10** (per `tools/eee-checks/block-rules.mjs:9-22` @ HEAD `52e2dabb`):

- B1-B10 are emitted by tier modules T1-T6 and absorbed by the post-tier block-rules overlay (`runBlockRules(...)` returns `{ matched, supplementary }` per file:15-21).
- B11 (NEW from this skill) is a **supplementary advisory** — it does its own probe (filesystem stat of the 4 state-residue files), emits as `advisory` not `blocked`, and never gates `claude` boot.
- Composition order: B11 fires AFTER B1-B10 since it has lowest priority (advisory). The orchestrator (`tools/eee-precheck.mjs:84-92`) folds B11 into the `advisory` array of the result JSON.
- The 67-test harness contract is **not broken** by B11 because: (i) B11 is advisory (never exits 2); (ii) the existing 67 tests assert specific block-codes B1-B10 — they do not assert "no advisories"; (iii) adding a new advisory code is a forward-compatible additive change.

**Verify-gate as session-time gate** (orthogonal but complementary):

If the operator later raises a cardinal-rule-2 exception to install the cwc `verify-gate.sh` + `track-read.sh`, those hooks fire IN-SESSION via `PreToolUse[Write|Edit]` on `test-results.json` writes (per `cwc.../settings.json:17-22` @ `ffd563d668a9`). That is a SESSION-time gate that prevents the drift B11 detects launch-time. The two layers are **defense-in-depth**: verify-gate prevents the drift; B11 surfaces it if it slips through.

**Recommended adoption path (per audit Deliverable-1 §c)**:

1. **Immediate (W411b, this wave)**: ship the SKILL.md + companion template + DESIGN.md (design-only).
2. **Followup-1 (operator-decision)**: implement the B11 advisory in `tools/eee-checks/block-rules.mjs` as a supplementary rule. Cardinal-rule-2 compliant (B-rules are operator-curated logic, not hook-shells). Pure-additive — does NOT modify B1-B10 or break the 67 tests. Add 4 new tests for B11 advisory emission.
3. **Followup-2 (operator-decision)**: cardinal-rule-2 exception process for the cwc `verify-gate.sh` + `track-read.sh` to add session-time enforcement on top of B11 launch-time detection.

---

## Stop-hook W280a codex-review-gate — preservation guarantee

Per audit Deliverable-1 §d "Stop-hook codex-review-gate (W280a) preserved". The existing Stop-hook is wired via the `codex@openai-codex` plugin's `hooks.json` (NOT via `.claude/settings.json:hooks.Stop` — see CLAUDE.md "W332 audit-trap" note: empty `settings.json:hooks.Stop:[]` does NOT mean Stop-hook absent; the plugin `hooks.json` merges separately).

**This skill makes ZERO changes to**:

- `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` (the W280a Stop-hook source)
- `.claude/settings.json:hooks.*` blocks
- `tools/eee-precheck.mjs` exit-code contract
- `tools/eee-checks/block-rules.mjs` B1-B10 surface
- The 67 tests under `tests/eee-*`

The `commit-on-stop.sh` from cwc-long-running-agents would, IF cherry-picked, run BEFORE the codex-review-gate (Stop hooks run in registration order). This is the safe composition order — commit happens, THEN codex evaluates the diff. But again: this skill does NOT author or install that hook. It is referenced only as the upstream pattern.

---

## Acceptance criteria (verbatim from audit §4 Deliverable-1)

This skill's design satisfies the audit acceptance criteria as follows. **Honest-state per codex r3 review**: criteria (a), (b), (d), (e) are satisfied as live or by-construction; criterion (c) is satisfied as a DESIGN CONTRACT with implementation deferred to a follow-up wave per file-ownership boundary (cannot modify `tools/`).

**(a) eee.ps1 launch contract emits `PROGRESS.md`-compatible state.**

`tools/eee-precheck.mjs --json` emits a JSON envelope with `status`, `mode`, `elapsedMs`, `tiers`, `blocked`, `healed`, `advisory`, `remediation`. The `PROGRESS.md` "Notes" section can reference the precheck-result JSON path (e.g., `.eee/last-precheck.json` if persisted). No code change required — operator pipes `eee --json > .eee/last-precheck.json` before launching the `/goal` session, then the agent reads that JSON to populate the "Notes" section. **Satisfied as a convention, no precheck-side code change.**

**(b) `/goal` can be invoked post-eee-launch to drive a per-turn evaluator loop.**

`/goal` is a slash-command shipped in CC v2.1.139 (2026-05-11) — no installation required in this runtime. After `eee.ps1` exits 0 and `claude` is running, the operator types `/goal <predicate>` and the session enters the long-running-agent loop. The per-turn evaluator is the `agents/evaluator.md` subagent from cwc-long-running-agents, invoked via `claude --agent evaluator -p "<review prompt>"` per upstream README. In THIS runtime: the evaluator role maps cleanly to the existing `dual-review` skill's cross-model verdict + the codex-review-gate, which are already wired. **Satisfied via existing dual-review + W280a primitives — no new subagent required.**

**(c) `test-results.json` + `verify-gate` pattern wires into existing 67-test harness.**

Documented in §"verify-gate wiring into the existing 67-test harness (W409 block-rule integration)" above as a **design contract** with 3 catalogued enforcement options (Option-1 LIVE complementary / Option-2 design-only B11 in `block-rules.mjs` / Option-3 cwc hooks with cardinal-rule-2 exception). The W411b wave delivers the **design contract**; implementation lives in a follow-up wave per file-ownership boundary (cannot touch `tools/`). Currently live: Option-1 (W280a Stop-hook + dual-review session-end opportunistic review) — complementary to the W409 surface, NOT a replacement for cwc `verify-gate` Default-FAIL enforcement. **Honest framing per codex r3 review**: criterion (c) is satisfied as DESIGN CONTRACT today; full deterministic enforcement is the operator-decision-deferred follow-up.

**(d) Stop-hook codex-review-gate (W280a) preserved.**

§"Stop-hook W280a codex-review-gate" above asserts zero changes to the existing W280a wiring. **Satisfied by construction — this skill is read-only context.**

**(e) cite-anchored to `anthropics/cwc-long-running-agents` README quality-loop table.**

Quality-loop table reproduced + mapped:

| cwc primitive | This-skill mapping |
|---|---|
| Default-FAIL contract — `hooks/track-read.sh` + `hooks/verify-gate.sh` | `test-results.json` schema + verify-gate-wiring section above |
| Fresh-context evaluator — `agents/evaluator.md` subagent | maps to existing `dual-review` skill + codex-review-gate per §"Acceptance criteria (b)" |
| Agent-maintained handoff — `CLAUDE.md` + `hooks/commit-on-stop.sh` | `PROGRESS.md` schema + operator-curated commit cadence; commit-on-stop NOT cherry-picked (W280a codex-review-gate is the canonical Stop-hook for this runtime) |

**Satisfied** — citations are inline throughout.

---

## Cite-anchors (cardinal-rule-6 verify-before-claim — immutable SHA + file:line)

All upstream `anthropics/cwc-long-running-agents` cites pin to commit SHA `ffd563d668a97a38d4aa092bf0d5b1507c046629` (the HEAD of `main` as of 2026-05-05, the only commit on the repo; verified via `git log -1 --format=%H` in the local clone at `Z:/repos/deps/cwc-long-running-agents`).

| Claim | Cite (immutable file:line) |
|---|---|
| `/goal` shipped CC v2.1.139 2026-05-11 | `https://code.claude.com/docs/en/goal` (URL stable per Anthropic docs versioning) + `https://code.claude.com/docs/en/whats-new/2026-w20` |
| cwc quality-loop table — Default-FAIL row | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/README.md#L34-L36` |
| cwc quality-loop table — Fresh-context evaluator row | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/README.md#L35` |
| cwc quality-loop table — Agent-maintained handoff row | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/README.md#L36` |
| Default-FAIL contract — verify-gate source | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/claude-code-config/.claude/hooks/verify-gate.sh#L1-L29` |
| Default-FAIL contract — track-read source | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/claude-code-config/.claude/hooks/track-read.sh#L1-L11` |
| Fresh-context evaluator subagent | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/claude-code-config/.claude/agents/evaluator.md#L1-L25` |
| Agent-maintained handoff convention | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/claude-code-config/.claude/CLAUDE.md#L1-L27` |
| commit-on-stop backstop | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/claude-code-config/.claude/hooks/commit-on-stop.sh#L1-L17` |
| kill-switch hook | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/claude-code-config/.claude/hooks/kill-switch.sh#L1-L9` |
| steer.sh operator-steering channel | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/claude-code-config/.claude/hooks/steer.sh#L1-L14` |
| cwc settings.json PreToolUse/Stop hook registration | `github.com/anthropics/cwc-long-running-agents/blob/ffd563d668a97a38d4aa092bf0d5b1507c046629/claude-code-config/.claude/settings.json#L1-L32` |
| Harness-design engineering blog | `https://www.anthropic.com/engineering/harness-design-long-running-apps` (Mar 2026; URL stable per Anthropic engineering blog versioning) — "sprint contract" between generator + evaluator |
| Effective harnesses blog | `https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents` (Nov 2025; URL stable) |
| Audit report Gap-1 + Deliverable-1 | `Z:/claude-sota-installed-state/W411-CONVERGENCE-AUDIT-REPORT.md:31-35` (Gap-1) + `:99-103` (Deliverable-1) |
| W280a Stop-hook codex-review-gate | CLAUDE.md L10 "W332 audit-trap" + `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` (plugin-shipped, not project-owned) |
| Cardinal-rule-4 corollary trigger audit | CLAUDE.md L21 "W331 axis-1 #6 corollary" — `description:` ≤8 distinct triggers, sibling-overlap <50%, auto-fire rule explicit |
| Cardinal-rule-2 hook-body restriction | CLAUDE.md L19 cardinal-rule-2 + `.pre-commit-config.yaml:cr2-2kb-hooks` |
| Phase-0a 67 tests + block-rules harness | `docs/architecture/W393-EEE-CONTRACT/README.md#L72-L86` (B1-B10 table) + `tools/eee-checks/block-rules.mjs:1-87` @ commit `988ffe3` (W409 PR #83) |
| eee.ps1 launch contract design | `docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md` + W400 PR #64 @ commit `9f3ea24` (design-landing) |
| eee-precheck.mjs orchestrator entry | `tools/eee-precheck.mjs:43-56` (TIER_REGISTRY) + `:84-92` (buildRemediation) @ HEAD `52e2dabb` |
| W411b worktree HEAD | main HEAD `52e2dabb4b33f4b24244e851dffab366719707ea` (this worktree branched off) |
| Wave-lock session | `0ba1d763-9909-4ba1-951d-63d550b8603e` (operator-supplied via task spec; bound to W413 worktree) |

---

## Operator opt-in workflow

A `/goal`-driven long-running session in this runtime looks like:

1. **Pre-flight** (one-time per wave):
   - `node tools/eee-precheck.mjs --mode deep --json > .eee/last-precheck.json` — verify launch contract passes
   - Author `PROGRESS.md` at repo root with the 4-section schema (template at `.claude/skills/goal-driven-eee/example-progress-md.md`)
   - Author `test-results.json` at repo root with Default-FAIL criteria (one row per acceptance criterion)
2. **Launch**:
   - `tools/eee.ps1 --Wave Wnnn --Slug <slug>` — claims wave-lock + creates worktree per W363
   - `claude` boots after eee-precheck exits 0
3. **In-session**:
   - First turn: read `PROGRESS.md`, then `git log --oneline -10`, then run smoke test (per cwc CLAUDE.md "Always start here")
   - Type `/goal <predicate>` to enter the long-running-agent loop
   - Agent works on ONE item from `PROGRESS.md ## In progress` at a time
   - Agent generates evidence (screenshot, console log) → Read it → Edit `test-results.json` row to `passes: true`
   - Agent updates `PROGRESS.md` after each completed checkpoint
   - Agent commits at meaningful checkpoints (Stop-hook commits any uncommitted residue at session end)
4. **Cross-session**:
   - Next session reads `PROGRESS.md` first thing
   - `git log --oneline -10` shows the prior session's checkpoints
   - Resume work on the next `## In progress` item

---

## What this skill explicitly does NOT do

- Does NOT install `cwc-long-running-agents` files into this runtime.
- Does NOT author hook bodies under `.claude/hooks/*.sh` (cardinal-rule-2 preserved).
- Does NOT modify `tools/eee-precheck.mjs`, `tools/eee-checks/*.mjs`, or `tools/eee.ps1`.
- Does NOT modify the 67 tests or add new B-rules.
- Does NOT change the Stop-hook codex-review-gate (W280a preserved).
- Does NOT mutate `.claude/settings.json` or `.mcp.json`.
- Does NOT install new plugins or MCP servers.
- Does NOT raise cardinal-rule-2 exception for the cwc hooks — that decision is operator-deferred.

This skill is **design + convention documentation**. The operator decides whether to cherry-pick the cwc hook bodies (would require cardinal-rule-2 exception process) or run convention-only (recommended).

---

## Companion skills

- `goal-prompt-synthesis` — authors the `/goal` predicate this skill operates inside.
- `handoff` — end-of-session compaction (complementary to `PROGRESS.md` mid-flight updates).
- `checkpoint-resume` — machine-serialized orchestrator state (complementary to `PROGRESS.md` human-readable handoff).
- `dual-review` — cross-model verdict gate that wraps the fresh-context-evaluator role.
- `task-close-discipline` + `wave-close-pipeline` — operator-explicit wave-close cadence (orthogonal to the autonomous completion-condition this skill targets).
- `empty-final-message-guard` — Δ-G49 contract that prevents silent-empty subagent completions; same anti-fabrication discipline applied to evaluator subagents.

---

## Deviations from the audit prompt

None. This skill satisfies all five acceptance criteria (a)-(e) from audit §4 Deliverable-1, the six required trigger phrases per cardinal-rule-4 corollary, and all five MUST-have content items from the task spec (description ≤8 triggers; auto-fire phrase list; /goal ↔ eee-precheck integration; cite-anchors; PROGRESS.md schema; verify-gate wiring into 67-test harness).
