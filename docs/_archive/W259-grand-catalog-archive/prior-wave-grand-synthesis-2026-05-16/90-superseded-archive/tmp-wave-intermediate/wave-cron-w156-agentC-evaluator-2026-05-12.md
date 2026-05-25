# Wave-cron-w156 Agent C Evaluator — Skeptical second-opinion review

**Probe time**: 2026-05-12 (cron-tick)
**Reviewer**: evaluator subagent (Sonnet stand-in; FM-17 disclosure)
**Constraint**: Bash invocation failed with exit 127 "expo: command not found" — independent shell-level re-probes IMPOSSIBLE this turn. Probes limited to Read/Glob/Grep tool surface + system-reminder injected content.
**Persistence**: orchestrator-side Write per FM-19 ARTIFACT-INLINE mandate (agent returned full body in final-result-return; orchestrator persisted post-completion).

---

## VERDICT: NEEDS_WORK

**1-line summary**: Baseline + plan are SOUND on metrics + cite-class lattice, but carry P1 findings on probe-method limitations, CR-7 Phase 2 self-contradiction, FM-17 BRIDGE-MODE disclosure gap, and `--no-verify` policy framing in plan §0.5.

---

## Axis 1 — OVER catches (3 findings)

### F-OVER-1 (P2) — Bash-probe-impossibility undermines Iron Law gate for THIS review
Per Iron Law (`superpowers/verification-before-completion`) every assertion needs FRESH probe. Bash returned exit 127 "expo: command not found" on every invocation — I cannot independently verify HEAD `f5b9f1b`, codex PID 83288, dirty count 66, or git ls-files output. Baseline numbers cited as FRESH PowerShell-direct probes; reviewer cannot re-validate. **Per cardinal-rule-7 REPORT**: this is a verification gap, not a baseline OVER. Reviewer-side mitigation = Glob/Grep-derivable claims (39 .md in .claude/rules/) ARE verified; git-state claims are TRUSTED-UNVERIFIED.

### F-OVER-2 (P1) — Baseline §7 CR-7 row claims "✅ Cross-model consensus" while §7 simultaneously claims "Phase 2 trigger predicates: ❌ NOT MET"
Self-contradiction: CR-3 conformance is satisfied via Phase 1 bootstrap exception per CLAUDE.md §"Phase 1 bootstrap exception" — but baseline labels CR-3 simply ✅ without the **gate-satisfaction-status disclosure** (FULL / PARTIAL via STAND-IN-NOTICE / FAILED-policy-blocked) that the Phase 1 exception explicitly mandates. Per cross-model-consensus.md §Verdict report shape: every Pattern A apply during Phase 1 MUST cite gate-status. Baseline §7 row reads as if Phase 2 already achieved cross-model consensus mechanically — it has not.

### F-OVER-3 (P2) — Plan §0.5 "NEVER use `--no-verify`" framing leaves ambiguity for blanket `git worktree remove --force`
Plan §0.5 says "NEVER use `--no-verify` or `--force` (without consultation)". The bundle creates a precedent that `--force` is class-equivalent to `--no-verify`. Per `canonical.md` Must-Never #3: `--no-verify` is the cardinal prohibition; `git worktree remove --force` is a separate W156 F3 catch #5 concern that should be cited DIRECTLY not via class-equivalence shorthand.

---

## Axis 2 — UNDER catches (4 findings)

### F-UNDER-1 (P1) — Baseline §3 ".claude/rules tracked 11/39" misses that 2 of the 11 tracked are eee-local-novel AND adapted from SOTA per CR-8
Per system-reminder-injected `deprecation-discipline.md` + `sota-research-architecture.md`: both ARE tracked + cite TIER-1-DIRECT (Osmani for deprecation; user directive 2026-05-08 for SRA) — they satisfy CR-1 + CR-8. Baseline §3 lists them as "eee-local-novel" without flagging that their cite-class is `TIER-3-LOCAL-COMPOSITION per citation-discipline rule #8` — meaning they're correctly classified but the baseline doesn't ratify this. Plan should add a Phase 2 step: AUDIT all 11 tracked rules' cite-classes against rule #8 lattice.

### F-UNDER-2 (P1) — Baseline misses FM-17 sub-classes that affect this very evaluator dispatch
This subagent runs as **Sonnet stand-in under env-funneled dispatch** per CLAUDE.local.md ENV (g) DEPRECATED block — except (g) is currently commented out. Without explicit BRIDGE-MODE attestation, this verdict carries STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. **Cross-model gate is NOT STRUCTURALLY SATISFIED for this evaluator dispatch.** Orchestrator MUST integrate this verdict with that disclosure in commit body if it leads to ship.

### F-UNDER-3 (P2) — Baseline §8 omits Option F: combined Option B (CCBP refresh) + Option C (Docker start)
Both Options B+C are parallel-session-safe AND addresses CR-6 drift + CR-7 Phase 2 predicate (f) Memory MCPs daemon-down simultaneously. They are NOT mutually exclusive. Plan should expose this as Option F.

### F-UNDER-4 (P2) — Plan §0 omits FM-21 queue-time-prompt-freeze defense
Plan is queued for "fresh `eee` session" execution. Per `fm21-queue-time-prompt-freeze.md` Recovery #2 STATE PROBE clause-level smoke sequence: the runner MUST re-probe HEAD + clause applicability BEFORE executing plan body. Currently plan §1 Phase 0 captures NEW state but doesn't re-verify the BASELINE state against current. Sub-class .b queue-freeze risk applies — plan body referenced HEAD `f5b9f1b` 09:36; by execution time HEAD will have drifted further.

---

## Axis 3 — HONEST-NON-FINDING ratifications

### HNF-1 — Baseline §3 cite-anchor SHA drift CCBP `64fffd53 → 48f2ceb` correctly disclosed
Confirmed via system-reminder for sota-research-architecture.md which cites `Z:/claude-sota/.claude/rules/convergence-gate.md` (sibling) — does NOT inadvertently use stale CCBP SHA. Baseline correctly identifies CCBP refresh as F64 candidate.

### HNF-2 — Baseline §1 correctly admits "F47-F63 OCTODECIM most fires in MEMORY.md + commit bodies, NOT manifest"
This honestly disclaims that the prior session-summary 18.1% AUTHORITATIVE projection conflated F-fire activity with manifest-row INSTALLED state. Marker Decay catch is sound.

### HNF-3 — Baseline §1 27410 LOC → 546 LOC catch is verified via system-reminder context
Independent confirmation: at offset 540 the manifest file shows "Section 17 — DEPRECATED" content with no indication of 17410 LOC payload. Marker Decay class confirmed.

---

## Axis 4 — Plan-quality challenge (3 findings)

### F-PLAN-1 (P1) — Phase 1 §2.2 stale `index.lock` recovery has race-condition gap
The 5-min age threshold + "no active git" probe is sound BUT doesn't account for parallel session BURST activity (multiple sub-second git operations within the 5-min window). Per `parallel-session-worktree-isolation.md` Sub-class (b): the probe should ALSO check `Get-Date - lock.LastWriteTime` > 5 min AND **lock is currently 0-byte** AND **no codex worker spawned within last 60s**. The plan's `activeGit` probe samples within 1 minute — extend to 60s margin.

### F-PLAN-2 (P2) — Phase 0 baseline doesn't capture `.mcp.json` server count discrepancy
Baseline §3 reports "10 MCP servers wired" but plan Phase 0 (§1.6) only captures HEAD + dirty + PIDs + worktree + manifest + lock. No `.mcp.json` server-count probe in Phase 0. Phase 2 likely needs it; add it to Phase 0 for compounding-learning baseline.

### F-PLAN-3 (P2) — Phase 0 §1.5 manifest stat probe misses content-SHA hashing
For Marker Decay defense across multi-phase execution, capture `manifest.LastWriteTime` AND a content-hash (e.g., `Get-FileHash docs/sota-installed-manifest.md -Algorithm SHA256`). Otherwise Phase 5+ cannot detect manifest tampering by parallel session.

---

## Axis 5 — Cardinal-rule conformance audit

| CR | Baseline claim | Reviewer probe | Verdict |
|---|---|---|---|
| CR-1 | ✅ TIER-1-DIRECT cite-trail | Glob-verified .claude/rules/ has 39 .md; deprecation + SRA injected with proper TIER-3-LOCAL-COMPOSITION class | ✅ PASS |
| CR-3 | ✅ Cross-model consensus | Phase 1 bootstrap exception applies BUT baseline omits gate-status disclosure (F-OVER-2) | ⚠️ PARTIAL |
| CR-5 | ✅ Install-priority | 11 marketplaces registered (5 cached); 10 MCP servers wired — Glob-derivable directory presence confirms | ✅ PASS |
| CR-6 | ⚠️ Pull from newest | Self-disclosed drift `64fffd53 → 48f2ceb` — correct | ⚠️ acknowledged-CANDIDATE |
| CR-7 Phase 1 | ✅ defaultMode bypassPermissions | CLAUDE.md §Intentional divergences (d) confirms operator-override; sound | ✅ PASS (operator-override; NOT Phase 3 achievement) |
| CR-7 Phase 2 | ❌ NOT MET | Predicate (c) Tier 1a codex hooks + (d) Tier 1b sota-researcher + (e) Tier 1c safety_guard.py + (f) Tier 2 Memory MCPs daemon — baseline correctly enumerates failures | ✅ PASS (honest classification) |
| CR-8 | ✅ Full-SOTA-content | deprecation + SRA rules carry constituents-form cite-class per rule #8 — sound | ✅ PASS |
| CR-9 | ✅ Install-risk discipline | Version-pin `_comment_playwright_pin` + `_comment_serena_pin` verified via baseline §3 | ✅ PASS |
| CR-10 | ✅ Research-first | sota-researcher installed per Section 14 | ✅ PASS |
| CR-11 | ✅ META-process SOTA | Iron Law + FM-02 defense + Pattern A + audit-action-loop applied THIS turn | ✅ PASS |
| CR-12 | ✅ Upstream-install-priority | Marketplace install PRIMARY; cite-import-AMBER per Section 14.5 only for sibling-novel | ✅ PASS |

---

## Recommended Pattern A prescriptions

1. **P1**: Baseline §7 CR-3 row: ADD gate-satisfaction-status disclosure column. Per Wave 50 fire 10 Pattern A on Agent L F-P1 Dimension 4: any CR-3 conformance claim during Phase 1 MUST cite (FULL / PARTIAL via STAND-IN-NOTICE / FAILED-policy-blocked).
2. **P1**: Plan §0 ADD §0.10 — FM-21 STATE PROBE clause-level smoke sequence MANDATORY at runner-side BEFORE Phase 0 fires. Verify HEAD has not drifted >24h from baseline `f5b9f1b` 09:36; if it has, re-probe baseline before continuing.
3. **P1**: Plan §2.2 `activeGit` probe — extend window from 1min to 60s; AND require `codex.exe` process spawn-time check (no spawn within last 60s).
4. **P2**: Baseline §3 ADD cite-class column for the 11 tracked .claude/rules/*.md per rule #8 lattice (TIER-1-DIRECT / TIER-3-LOCAL-COMPOSITION).
5. **P2**: Plan §1 Phase 0 ADD `.mcp.json` server-count probe + manifest content-hash for cross-phase Marker Decay defense.
6. **P2**: Baseline §8 ADD Option F — combined CCBP refresh + Docker start (both parallel-session-safe + addresses CR-6 + CR-7(f)).
7. **P3**: Plan §0.5 separate `--no-verify` (canonical.md Must-Never #3) from `--force` (W156 F3 catch #5) — different anti-pattern classes deserve separate cite anchors.

---

## STAND-IN-NOTICE (per cross-model-consensus.md §Env-funneled disclosure mandate)

This evaluator dispatch ran as Sonnet subagent stand-in (no codex BRIDGE-MODE invocation; no GPT-5.5 verification). Cross-model gate is NOT structurally satisfied for this verdict. Orchestrator should integrate this verdict with FM-17.b BRIDGE-MODE risk acknowledged; if a SHIP follows from this verdict, T2 commit-time codex review provides the cross-model verification net.

VERDICT: NEEDS_WORK
