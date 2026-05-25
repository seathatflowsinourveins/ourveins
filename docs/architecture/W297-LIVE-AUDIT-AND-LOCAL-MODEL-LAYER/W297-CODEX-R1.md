# W297 Codex R1 — Adversarial Review
**Date**: 2026-05-18
**Reviewer**: GPT-5.5 (codex r1, operator UNLEASH)
**Verdict**: REVISE

## Verdict Summary
I found 6 actionable findings: 4 HIGH and 2 MEDIUM. The synthesis has strong live-state corrections, but it is not ready for r3 or ship-chain commits until the stale Stream D basic-memory premise, the over-mooted MTP reconciliation, the r2 ledger/gate deferrals, and the operator queue cap are fixed.

## Findings

### F-1: Stream D still depends on stale basic-memory drift after synthesis claims it is corrected
- **Severity**: HIGH
- **File**: `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-STREAM-D-MULTI-MCP-DISCOVERY-CASCADE.md`
- **Lines**: 41, 203-206, 631-635
- **Finding**: The synthesis correctly says basic-memory config exists at the env-override path, but Stream D still treats AI-3 config drift as active and makes it a recommended pre-W297 ship action. That is an unreconciled contradiction in one of the 4 input streams.
- **Evidence**: Stream D says basic-memory has "AI-3 config-drift" and `search_notes` false-negatives at line 41; its cascade fallback still says "if basic-memory `search_notes` is broken (AI-3 config-drift per W297)" at lines 203-206; and line 635 recommends fixing AI-3 pre-ship. Streams B/C instead verify the canonical config at `Z:/claude-sota-installed-state/basic-memory/config/config.json` (`W297-STREAM-B...`:103-114; `W297-STREAM-C...`:65-88).
- **Proposed fix**: Amend Stream D and the synthesis to mark basic-memory AI-3 as stale/closed for the live MCP path. Keep only an optional cleanup/documentation item for the stale repo-side `.basic-memory/` relic.
- **True-bug probability**: 95%

### F-2: MTP recommendation is over-mooted; Stream B still requires an ik_llama.cpp verification path
- **Severity**: HIGH
- **File**: `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-AUDIT-2026-05-18.md`
- **Lines**: 52, 79-85
- **Finding**: The synthesis turns Stream A's #1 recommendation into "no immediate operator action" for `:8080`, but Stream B only proves the service is `ik_llama.cpp` with MTP flags; it still routes an action to verify binary age/perf and possibly rebuild/restart `ik_llama.cpp`.
- **Evidence**: Stream A recommends bumping `:8080` to `b9110+` and adding MTP flags (`W297-STREAM-A...`:19, 25, 512-522). Stream B corrects the target to `ik_llama.cpp` and says MTP flags are already applied, but still says the optimization "may already be in effect" and to verify/rebuild if the binary is old (`W297-STREAM-B...`:283-285, 350-362).
- **Proposed fix**: Re-scope the action to: "No mainline llama.cpp swap; verify current `ik_llama.cpp` build timestamp/perf and rebuild only if stale." Do not state "NO immediate operator action" until that verification is documented.
- **True-bug probability**: 90%

### F-3: W296 r2 HIGH remediation is queued, not completed
- **Severity**: HIGH
- **File**: `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-AUDIT-2026-05-18.md`
- **Lines**: 121-123, 140-145
- **Finding**: The synthesis labels the queue "post-r1+r2-applied", but r2's HIGH findings are still deferred to approval rows and future inline fixes. This is not remediation yet.
- **Evidence**: r2 HIGH #1 requires adding missing `W296-CODEX-R1-STREAM-A.md` and `STREAM-D.md` or downgrading the count (`W296-CODEX-R2-RATIFICATION.md`:9). r2 HIGH #4 requires ledger append or relabeling (`W296-CODEX-R2-RATIFICATION.md`:15). W297 only queues r3 and ledger append approvals at lines 121-123 and says r3 runs after fixes are applied at lines 142-145.
- **Proposed fix**: Before r3, either materialize the missing A/D r1 artifacts or correct the W296 pace count, and append/relabel the 27 Stream C verdicts. Then update W297 from "post-r1+r2-applied" to the actual state.
- **True-bug probability**: 95%

### F-4: Operator-action queue violates the prior 7-item cognitive cap
- **Severity**: HIGH
- **File**: `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-AUDIT-2026-05-18.md`
- **Lines**: 112-138
- **Finding**: W296 codex-r1 explicitly collapsed the main operator queue to 7 entries. W297 expands the main queue to 10 and adds a 10-item backlog while calling it a "top-10 cognitive cap".
- **Evidence**: W296 records the prior HIGH fix: "§5 collapsed to ≤7 actionable rows" and "queue now has 7 entries" (`W296-AUDIT-2026-05-18.md`:228-235). W297 has 10 main rows at lines 112-123 and 10 backlog rows at lines 125-138.
- **Proposed fix**: Collapse the W297 main queue to 7. Move rows 8-10 into backlog, and keep r3/ledger work as a gate checklist rather than additional operator choices.
- **True-bug probability**: 98%

### F-5: Anti-bias proof misstates the plan threshold and is not source-traceable for all streams
- **Severity**: MEDIUM
- **File**: `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-AUDIT-2026-05-18.md`
- **Lines**: 184
- **Finding**: The synthesis claims "4-of-4 streams returned CHANGE/EVOLVE" and says the threshold was exceeded, but the W297 plan says at least 3 of 4 streams should return non-EVOLVE verdicts. The synthesis' own count is 1 CHANGE + 3 EVOLVE, which is not 3 non-EVOLVE. Also, the stream files do not all carry explicit CHANGE/EVOLVE labels; the synthesis table assigns them.
- **Evidence**: Plan line 66 says "at least 3 of 4 streams should return non-EVOLVE verdicts." Stream A explicitly calls itself EVOLVE (`W297-STREAM-A...`:448). Stream B records per-tier verdicts but not a stream-level CHANGE label (`W297-STREAM-B...`:407-416). Stream C has no source-level CHANGE/EVOLVE label found. Stream D records ship-decision B, not an EVOLVE label (`W297-STREAM-D...`:126).
- **Proposed fix**: Either change the anti-bias threshold wording to "non-KEEP / material-change" and cite each stream's own verdict line, or mark the proof as PARTIAL/UNVERIFIABLE.
- **True-bug probability**: 85%

### F-6: Ollama retirement still repeats the disproven "+48GB RAM" framing
- **Severity**: MEDIUM
- **File**: `Z:/claude-sota-installed/docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-AUDIT-2026-05-18.md`
- **Lines**: 15, 54, 117
- **Finding**: The synthesis says the cognee embedding repoint closes Task #386 "+48GB RAM", but Stream B/C evidence shows the current daemon retirement frees far less immediately; the 48GB claim is a stale task framing, not a live-state recovery number.
- **Evidence**: Stream B's net win is "21 MB daemon RAM" plus "~1.5 GB peak VRAM" (`W297-STREAM-B...`:337-340). Stream C explicitly says W296's "+48GB RAM" disagrees with live probe and resolves Ollama idle as ~200MB (`W297-STREAM-C...`:497); it also says stopping the daemon does not remove the 17.9 GiB on-disk models (`W297-STREAM-C...`:307).
- **Proposed fix**: Reword rows to "closes the Task #386 kill-Ollama path, but live immediate savings are ~21MB RAM / ~1.5GB peak VRAM unless models are loaded or deleted."
- **True-bug probability**: 90%

## Anti-Bias Check Results
- **4-of-4 streams returned CHANGE/EVOLVE**: **UNFOUNDED as written**. Stream A explicitly says EVOLVE (`W297-STREAM-A...`:448), but Stream B only has per-tier verdicts (`W297-STREAM-B...`:407-416), Stream C lacks a stream-level CHANGE/EVOLVE label, and Stream D says verdict B / T1 conditional (`W297-STREAM-D...`:126, 617-623). The synthesis' 1 CHANGE + 3 EVOLVE also fails the plan's "3 of 4 non-EVOLVE" wording (`W297-PLAN.md`:66).
- **Stream D evaluated 13 MCPs**: **CONFIRMED BUT AMBIGUOUS**. Stream D states "13 MCPs evaluated" (`W297-STREAM-D...`:53), but the matrix includes native `WebSearch`/`WebFetch` and non-default/non-discovery rows (`W297-STREAM-D...`:44-51). Count basis should be clarified.
- **Universal-REJECT triggers checked**: **PARTIAL**. Stream A says no candidates triggered REJECT hard-caps (`W297-STREAM-A...`:95), and Stream D self-eval clears hard-caps (`W297-STREAM-D...`:599-615). This does not cover Stream B/C because they are tier-state/action streams, not full candidate scoring streams.

## Ledger Compliance Check
**FAIL**. SKILL.md requires every verdict to write T6 basic-memory plus `VERDICT-LEDGER.md`, with hindsight T1 best-effort (`.claude/skills/sota-convergence-audit/SKILL.md`:194-196, 362). `VERDICT-LEDGER.md` says the append is hard-required and T6 down blocks ledger validity (`VERDICT-LEDGER.md`:3, 106-108). W297 instead marks Stream A ledger entries as pending (`W297-STREAM-A...`:566) and only queues W296 Stream C ledger append approval (`W297-AUDIT...`:123). No W297 Stream A or Stream B verdict rows are ledger-valid yet.

## Cite-Trail Check
No pre-2026-Q1 non-SDK external anchor was found in W297 synthesis §9. The label "all 2026-MAY" is too broad for `github.com/orgs/anthropics/discussions`; treat it as an org-canonical SDK/docs exemption rather than a dated 2026-MAY anchor (`W297-AUDIT...`:173-180; `W297-STREAM-A...`:498-499).

## r3 Readiness Assessment
Not ready. Fix the Stream D stale basic-memory premise, reframe the MTP action as `ik_llama.cpp` verification, complete or honestly defer W296 r2 HIGH remediation, collapse the operator queue to 7, and either ledger or relabel the W297 Stream A/B verdicts before firing r3.
