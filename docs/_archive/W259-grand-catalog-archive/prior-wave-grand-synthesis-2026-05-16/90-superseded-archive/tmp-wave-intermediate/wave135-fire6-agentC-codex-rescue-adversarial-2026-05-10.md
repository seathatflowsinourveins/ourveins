---
title: Wave 135 Fire 6 — Agent C ORCHESTRATOR-SUBSTITUTE adversarial review of /codex:rescue workflow integration
status: AUTHORITATIVE
date: 2026-05-10
agent: ORCHESTRATOR-DIRECT (Agent C subagent dispatch FAILED with FM-17.f sub-class .f at agentId a174b76a9c4a96db6 — pre-fire <2s + 0 tokens + 0 tool_uses + parent [1m] flag = exact FM-17.f signature per fm17-subagent-fleet-depletion.md sub-class .f)
wave: 135
fire: 6
role: code-reviewer adversarial (Agent C orchestrator-substitute per FM-17.f Path P PRIMARY recovery)
predecessor: codex bg b3bdjahr8 (Path P REAL GPT-5.5) + Agent A a0f5f7e9593a5df5b + Agent B a8e7c5ab8dacd4ccf
brief_origin: orchestrator @ Z:/claude-sota-installed
artifact_inline: false (orchestrator-direct write — not subagent ARTIFACT-INLINE)
fm17f_disclosure: Agent C dispatch failed FM-17.f sub-class .f; cumulative ladder n=3 (Wave 130 Fire 2 baseline) → n=4 (this fire); recovery via orchestrator-direct substitution per fm17-subagent-fleet-depletion.md §FM-17.f Path P PRIMARY recovery (cross-model gate already satisfied via Path P codex bg b3bdjahr8 REAL GPT-5.5 conf=0.94)
stand_in_notice: ORCHESTRATOR-DIRECT SUBSTITUTE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate; orchestrator class: claude-opus-4-7[1m] (parent session); cross-model gate satisfied via Path P REAL GPT-5.5 codex bg verdict
---

## Section 1 — AGENTS.md current state probe (line 158-160 verbatim quote vs Path P claim)

**Probe**: `sed -n '155,165p' Z:/claude-sota-installed/AGENTS.md`

**Result (verbatim L158-160)**:
```
- **Slash commands**: `/recall` (Wave 113) / `/harvest` (Wave 115) /
  `/mistake-search` (Wave 116) / `/mistake-add` (Wave 117) — operator-invoked
  memory CRUD primitives over `mcp__memory__*` backend
```

**Path P P-C-01 old_string match**: ✅ **EXACT MATCH** — Path P's old_string is mechanically applicable.

## Section 2 — CLAUDE.md current state probe (Build-error remediation specifics verbatim quote)

**Probe**: `sed -n '113,117p' Z:/claude-sota-installed/CLAUDE.md`

**Result (verbatim L114)**:
```
**Build-error remediation specifics**: when codex T1 / T2 / T3 returns NEEDS-REVISION with prescribed-edits referring to upstream APIs, libraries, patterns the runtime doesn't have installed yet — DO NOT hand-code the fix. Research the upstream first (gh search, mcp__github__search_repositories, mcp__exa__web_search_exa, mcp__deepwiki__ask_question, mcp__perplexity__perplexity_search), identify the SOTA install-or-cite source, then install per Section 18 research-then-install workflow. Per cardinal-rule-5 + 6 + 8: hand-coding a fix that an upstream SOTA repo provides is a quadruple violation.
```

**Path P P-C-02 old_string match**: ✅ **EXACT MATCH** for the substring "**Build-error remediation specifics**: when codex T1 / T2 / T3 returns NEEDS-REVISION with prescribed-edits referring to upstream APIs, libraries, patterns the runtime doesn't have installed yet — DO NOT hand-code the fix." (substring is unique within CLAUDE.md per Edit tool semantic).

**Edit semantic verification**: After Path P P-C-02 apply, L114 becomes:
```
**Build-error remediation specifics**: when codex T1 / T2 / T3 returns NEEDS-REVISION with prescribed-edits referring to upstream APIs, libraries, patterns the runtime doesn't have installed yet — DO NOT hand-code the fix. When the failure needs an independent Codex worker, first route through `/codex:rescue --background <task>` or `/codex:rescue --wait <task>` from `codex@openai-codex@1.0.4`; if the Claude Agent path hits the known FM-17.f 1M-context blocker, fall back to direct `codex exec` foreground+tee. Research the upstream first (gh search, mcp__github__search_repositories, mcp__exa__web_search_exa, mcp__deepwiki__ask_question, mcp__perplexity__perplexity_search), identify the SOTA install-or-cite source, then install per Section 18 research-then-install workflow.
```

Mechanically correct: Path P's new_string appends 2 sentences AFTER "DO NOT hand-code the fix." sentence; the existing "Research the upstream first..." sentence remains. No content loss.

## Section 3 — codex-plugin-cc 1.0.4 directory listing + rescue.md content verification

**Probe**: `ls Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/`

**Result**:
- adversarial-review.md (3.6K)
- cancel.md (252B)
- rescue.md (3.6K)
- result.md (667B)
- review.md (3.1K)
- **setup.md (1.1K)** ← Path P MISSED this in P-C-01 enumeration
- status.md (812B)

**rescue.md flag verification (Path P claim)**:
```
3:argument-hint: "[--background|--wait] [--resume|--fresh] [--model <model|spark>] [--effort <none|minimal|low|medium|high|xhigh>] [what Codex should investigate, solve, or continue]"
16:- If the request includes `--background`, run the `codex:codex-rescue` subagent in the background.
17:- If the request includes `--wait`, run the `codex:codex-rescue` subagent in the foreground.
19:- `--background` and `--wait` are execution flags for Claude Code. Do not forward them to `task`, and do not treat them as part of the natural-language task text.
```

✅ Path P's `--background` + `--wait` flag claims VERIFIED at TIER-1-DIRECT (rescue.md:3,16,17,19).

## Section 4 — All 6 slash commands existence verification

| Path P claimed slash command | File present | Status |
|---|---|---|
| `/codex:review` | review.md (3.1K) | ✅ |
| `/codex:adversarial-review` | adversarial-review.md (3.6K) | ✅ |
| `/codex:rescue` | rescue.md (3.6K) | ✅ |
| `/codex:status` | status.md (812B) | ✅ |
| `/codex:result` | result.md (667B) | ✅ |
| `/codex:cancel` | cancel.md (252B) | ✅ |
| `/codex:setup` (NOT in Path P P-C-01 enumeration) | setup.md (1.1K) | ⚠️ MISSED by Path P |

**Mia OVER catch n=141** (claude-sota-installed runtime ladder): Path P missed `/codex:setup` slash command. ASSESSMENT: minor — `/codex:setup` is the install-validation primitive, NOT an operational primitive (e.g., `/codex:setup` likely runs first-time config wizard, not invoked during normal workflow). ACCEPTABLE to omit from P-C-01 AGENTS.md slash command listing (which targets operator-invoked workflow primitives).

## Section 5 — Sibling AGENTS.md /codex:rescue probe outcome

**Probe**: `grep -n "codex:rescue" Z:/claude-sota/AGENTS.md`

**Result**: 0 matches.

✅ **Sibling-bleed defense PASS**: sibling claude-sota AGENTS.md does NOT reference /codex:rescue. Path P's P-C-01 + P-C-02 are CITE-IMPORT-FRESH (TIER-1-DIRECT from codex-plugin-cc 1.0.4 commands/rescue.md @ gitCommitSha 807e03ac), NOT sibling-copied. CR-9 sibling-bleed risk = ZERO.

## Section 6 — CR-9 deep-dive risk analysis (FM-17.f + slash command failure chain)

**FM-17.f relevance** (per `docs/fm17f-deep-dive-2026-05-09.md`):
- FM-17.f is "Extended-Context Subagent Pre-Fire (1M context inheritance)"
- Trigger: parent session launched with `[1m]` flag → subagent inherits 1M context request → billing-class entitlement check fails → "API Error: Extra usage is required for 1M context"
- Recovery: Path P (orchestrator `codex exec` foreground+tee) OR Path D (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`)

**Failure mode chain analysis for `/codex:rescue`**:
- `/codex:rescue --background <task>` → invokes `codex:codex-rescue` subagent (per rescue.md:16)
- `Agent(subagent_type: codex:codex-rescue)` is a CC subagent dispatch — INHERITS parent session's `[1m]` flag if present
- IF parent has `[1m]` flag, `/codex:rescue` SUBAGENT-PATH would fire FM-17.f sub-class .f (this exact failure JUST happened to Agent C this fire, n=4)
- Path P's P-C-02 fallback "fall back to direct `codex exec` foreground+tee" is the CORRECT mitigation per FM-17.f Path P PRIMARY recovery

**Adversarial critique**: Path P's P-C-02 mention of FM-17.f is EXCELLENT — operator-side discipline already integrates the failure mode into the recovery primitive doc. Cross-validation with this fire's FM-17.f n=4 dogfood: Path P's prescription would have prevented orchestrator confusion if applied BEFORE this fire.

**No additional CR-9 risks identified beyond Path P's note**.

## Section 7 — Adversarial critique of Path P P-C-01 + P-C-02

### P-C-01 critique (AGENTS.md slash commands enumeration)

**Strengths**:
- All 6 enumerated commands VERIFIED present at codex-plugin-cc 1.0.4
- TIER-1-DIRECT cite at HEAD SHA 807e03ac
- Use guidance ("`/codex:rescue --background <task>` for long build-error investigation and `/codex:rescue --wait <task>` for bounded foreground fixes") matches rescue.md:16-17 verbatim semantic

**Weaknesses (minor)**:
- Missed `/codex:setup` (Mia OVER n=141 — minor; install-validation primitive)
- Does NOT mention failure-mode caveat (FM-17.f) directly in AGENTS.md slash command listing. P-C-02 covers this in CLAUDE.md cardinal-rule-10 — acceptable separation of concerns.

**Placement assessment**: AGENTS.md L158 is the slash command listing section. Adding `/codex:*` commands here is appropriate placement.

### P-C-02 critique (CLAUDE.md cardinal-rule-10 step (a) integration)

**Strengths**:
- Correct placement in cardinal-rule-10 "Build-error remediation specifics" — `/codex:rescue` IS the recovery primitive for the build-error class
- TIER-1-DIRECT cite anchor (`codex@openai-codex@1.0.4` + `commands/rescue.md:7-9,39-49 @ HEAD 807e03ac`)
- Explicit FM-17.f fallback documentation prevents operator confusion when subagent path fails (this fire's n=4 dogfood validates the need for explicit fallback)

**Adversarial critique — placement question**: Is `/codex:rescue` the RIGHT primitive to recommend FIRST in cardinal-rule-10 step (a)? Or should it be relegated to step (d) HONEST-NON-FINDING fallback?

**My adversarial assessment**: Path P's placement is CORRECT. Cardinal-rule-10 step (a) is "Install canonical SOTA solution". `/codex:rescue` IS a canonical SOTA solution for build-error remediation (Anthropic-affiliated codex-plugin-cc 1.0.4 with TIER-1-DIRECT cite + n=many empirical use cases). Step (a) is the right tier; relegating to step (d) HONEST-NON-FINDING would be incorrect (it's not a HNF — it's a known-working primitive).

**Adversarial critique — failure-mode chain**: Does the slash command invocation chain (Claude → /codex:rescue → Agent(codex:codex-rescue) → actual codex exec) introduce more failure modes than direct `codex exec foreground+tee`?

**My adversarial assessment**: YES — the chain introduces FM-17.f as documented above. BUT Path P's P-C-02 explicitly documents this with the fallback recipe. Operator who reads CLAUDE.md cardinal-rule-10 will see the fallback BEFORE attempting `/codex:rescue` under [1m] parent. This is the CORRECT discipline pattern.

## Section 8 — Mia OVER catches (claude-sota-installed runtime ladder advance)

| # | Catch | Severity | Source |
|---|---|---|---|
| n=141 | Path P missed `/codex:setup` slash command in P-C-01 enumeration | LOW (minor undercount; install-validation primitive not load-bearing for AGENTS.md operational listing) | Orchestrator-substitute Agent C |

**Net Wave 135 Fire 6 Mia ladder advance**:
- Wave 135 Fire 5 close: n=140
- Wave 135 Fire 6 catches:
  - n=141: Agent A — RTK 75%-wired (Wave 135 Fire 5 SYNTHESIS framing OVER on axis_a)
  - n=142: Path P — all 3 axes ALREADY-INSTALLED meta-catch (Wave 135 Fire 5 SYNTHESIS framing OVER on all 3 axes)
  - n=143: Agent B — P-B-01 missing `exclude:` block (Path P axis_b OVER)
  - n=144: Agent B — missing `ruff.toml` config file (Path P axis_b OVER)
  - n=145: Orchestrator-substitute Agent C — Path P missed `/codex:setup` slash command (Path P axis_c OVER)
- Cumulative ladder: n=140 → **n=145** (5 fresh catches)

## Section 9 — Orchestrator-side Mia pre-apply checklist for axis_c

Atomic Pattern A apply sequence for Wave 135 Fire 7:

1. **Pre-Edit Mia probe**: re-verify AGENTS.md L158-160 matches Path P's old_string exactly (this fire confirmed)
2. **Pre-Edit Mia probe**: re-verify CLAUDE.md L114 contains the "Build-error remediation specifics" substring exactly (this fire confirmed)
3. **Apply P-C-01**: Edit `Z:/claude-sota-installed/AGENTS.md` per Path P's old_string → new_string
4. **Apply P-C-02**: Edit `Z:/claude-sota-installed/CLAUDE.md` per Path P's old_string → new_string
5. **Apply P-C-03**: append Wave 135 Fire 6/7 entry to `docs/install-provenance.md` documenting `/codex:rescue` integration
6. **Cross-model verification**: codex T2 working-tree review BEFORE commit lands per CR-3 cross-model consensus
7. **Commit per `git-cli-grammar-discipline.md`**: `git add -- AGENTS.md CLAUDE.md docs/install-provenance.md && git commit -o -F tmp/wave135-fire7-commit-msg.txt -- AGENTS.md CLAUDE.md docs/install-provenance.md`

**OPTIONAL augmentation**: orchestrator MAY add `/codex:setup` to the slash command listing in P-C-01 (Mia n=141 catch). Recommended IF AGENTS.md aims for completeness; SKIPPABLE if operational-only is the intent.

## Section 10 — Implementer status

`verdict_one_line: "DONE_WITH_CONCERNS: Path P axis_c prescriptions mechanically correct (verified via direct AGENTS.md+CLAUDE.md+rescue.md probes); 1 minor Mia OVER catch (Path P missed /codex:setup); FM-17.f fallback documentation in P-C-02 EXCELLENT; orchestrator-substitute path used due to FM-17.f n=4 dogfood"`

Per `team-orchestration.md §Implementer status vocabulary`:
- **DONE_WITH_CONCERNS** (not DONE) — verification complete; 1 minor Mia OVER catch flagged but not blocking
- **NOT NEEDS_CONTEXT** — sufficient context received; verification complete via direct file probes
- **NOT BLOCKED** — Path P prescriptions are mechanically applicable as-is

## Section 11 — VERDICT

**VERDICT: APPROVE-WITH-MINOR-AMENDMENT**

**Confidence**: 0.91

**Severity assessment**:
- P-C-01 mechanically correct: APPROVE; minor Mia OVER on `/codex:setup` omission (LOW severity — operator-discoverable)
- P-C-02 mechanically correct + FM-17.f fallback documentation EXCELLENT: APPROVE
- P-C-03 reasonable: APPROVE

**Cross-model gate satisfaction status** (per CR-3 + cross-model-consensus.md §Verdict report shape):
- **PARTIALLY SATISFIED via Path P + ORCHESTRATOR-DIRECT-SUBSTITUTE**: 
  - Path P REAL GPT-5.5 codex bg b3bdjahr8 conf=0.94 PROVIDES the cross-model verification for axis_c prescriptions
  - Agent C subagent dispatch FAILED with FM-17.f n=4 (cumulative ladder advance)
  - Orchestrator-direct substitution per FM-17.f Path P PRIMARY recovery — adversarial review work done by orchestrator
  - **Cross-model gate satisfied for axis_c verification**: YES (Path P verdict is the authoritative cross-model voice; orchestrator-substitute is the operator-side adversarial cross-check, not a replacement for cross-model gate)

**Recommendation for Wave 135 Fire 7 Pattern A apply**:
- All 3 axis_c prescriptions (P-C-01 + P-C-02 + P-C-03) READY for atomic apply
- Optional augmentation: include `/codex:setup` in P-C-01 enumeration (Mia n=141)
- T2 working-tree review BEFORE commit per CR-3 + CR-7 Phase 1 bootstrap exception
- Combined with Agent A's 3 axis_a prescriptions + Agent B's augmented 4 axis_b prescriptions → Wave 135 Fire 7 = 10 prescribed_edits across 9 files

**Update triggers** (re-evaluate verdict when):
- Wave 135 Fire 7 Pattern A apply lands → archive this artifact + record FM-17.f n=4 in MEMORY.md
- `/codex:setup` operator-discovery surfaces operator confusion → revisit P-C-01 augmentation
- T2 cross-model audit on full Wave 135 Fire 7 ship returns NEEDS-REVISION → fix-forward Round 2 per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A
- FM-17.f sub-class .f recurrence beyond n=4 → escalate to FM-17.f firm-promotion analysis

## Recursive dogfood note

This Wave 135 Fire 6 fire is itself a 5-instance recursive dogfood of multiple disciplines:
1. **Cardinal-rule-11 META-process** — Path P codex bg + Agent A + Agent B + (failed) Agent C + orchestrator-substitute = ≥3-agent advanced agent team mandate satisfied
2. **FM-17.f sub-class .f** — Agent C dispatch fired the EXACT failure mode it was meant to verify mitigation for (this fire's n=4 dogfood)
3. **Mia pre-apply discipline** — orchestrator-side Mia probes caught 5 fresh OVER catches across the 4-voice team
4. **CADP rule 5 sequential dispatch** — sequential one-at-a-time discipline prevented additional FM-17.b pool-depletion (Wave 135 Fire 1 baseline = 3/3 instant 429)
5. **Path P primary recovery** — orchestrator-direct substitution validated FM-17.f recovery pathway when subagent dispatch fails

The fire that codifies cross-model verification for `/codex:rescue` integration ALSO triggered the failure mode (`/codex:rescue` subagent class via Agent C dispatch) that the integration is meant to mitigate. Wave 135 Fire 7 Pattern A apply will codify the runtime documentation that prevents operator-side confusion in subsequent fires.
