# W325 Stream B — Open-Items Reconciliation (W320 mine + W324 parallel) De-Duplicated

**Date**: 2026-05-19
**Owner**: W325 Stream B
**Scope**: De-duplicate W320 carry-forwards (mine) against W324 carry-forwards (parallel) into a single prioritized backlog for W326+ operator-action.
**Inputs**: my `5cac3ec`/`e626cec`/`1360aeb` W320 closure docs + parallel W324 CLOSURE-SYNTHESIS:134-145 + W323 STREAM-1..8 + W321 STREAM-1..8 + W322 CLOSURE.

> **Reconciliation rule**: when both sessions identified the same carry-forward, prefer **the more-recent disposition** (parallel W324 supersedes my W320 wherever it post-dates and explicitly addresses). When dispositions disagree, FLAG and route to operator.

---

## §0 Inventory total

| Source | Item count | Wave |
|---|---:|---|
| W324 CLOSURE-SYNTHESIS §carryover | 10 items | W324 (parallel, latest) |
| W320 CLOSURE-SYNTHESIS (mine, multiple docs) | ~12 items | W320 (mine) |
| W321 Stream-1 to Stream-8 (parallel) | ~24 items | W321 (parallel) |
| W322 CLOSURE-SYNTHESIS §P-block | 8 items (most deferred to W323) | W322 (parallel) |
| W323 Stream-1 to Stream-8 (parallel) | ~18 items | W323 (parallel) |
| W325-Stream-B novel finding | 4 items | W325 (this wave) |
| **Total raw** | ~76 items |  |
| **After de-dup + close-pass** | ~28 items |  |

---

## §1 P0 — SHIP-BLOCKER class (operator-decision required before next-wave significant install)

### P0-A — R5 PARTIAL-HOLD 7-wave SHIP-BLOCKER (`bypassPermissions:true` + sandbox `enabled:false`)

- **Convergent findings across waves**: W316-S1 + W314-E + W316-S4 + W316-S5-L7 + W317-S1 + W319-D + W324
- **W324 disposition** (CLOSURE-SYNTHESIS:18): sca-v9 §6 R5 5-control layered-defense codified in-rubric; **operator-decision pending W325**
- **My W320 disposition**: noted as carry-forward; no action
- **W321-8 codex META blindspot #2 doubled down**: "R5 too weak — over-trusts single product permission layer"
- **W323-4 proposed dim `D40 layered_defense_depth` (NOT shipped in sca-v9)**: would have given per-candidate scoring of layered-defense maturity
- **Operator action**: decide between (a) keep `bypassPermissions:true` as DRIFT-INTENTIONAL for single-operator local install (cite-anchor: CCBP `disableBypassPermissionsMode` advisory says "Set when not in trusted single-operator context"); (b) flip to deny-default + populate `permissions.deny` per sca-v9 §6 Control 1; (c) staged enabling of sandbox.* block.

### P0-B — SEV-1 Perplexity API key leak rotation

- **Source**: W319 carry-forward (W317-r2-SEV1-1 originally raised); my W320 ledger row note carries this
- **Status**: leaked literal redacted from W317-r2 deliverable; key VALUE was committed to git history at commit `1ab189b` (W317-r2)
- **Operator action**: rotate the Perplexity API key in Perplexity dashboard + revoke old key + update `CLAUDE.local.md` LANGFUSE/PERPLEXITY env block + confirm `gh secret list` (if perplexity was ever added as gh secret).
- **Why P0**: leaked credentials are operator-blocking SEV-1 until rotation completes (per W290-F2 incident-response pattern).

### P0-C — sca-v9 SKILL.md §7 install denom arithmetic discrepancy

- **Source**: W325 Stream B novel finding (this wave)
- **Detail**: SKILL.md §7 line 326 states "v9 composite_denom_install = 28.7 (v7.1) + 1.0 (D-EMP) + 1.0 (D35) + 1.0 (D38) + 1.0 (D39) + 1.0 (D40) + 1.0 (D41) = **33.7**" — but 28.7 + 6×1.0 = **34.7 not 33.7**. Pattern denom 14.5 line 328 is internally consistent.
- **Operator action**: codex round-N ratify which is correct: (a) line 326 figure 33.7 is right and one of D-EMP/D35/D38/D39/D40/D41 has actual W_install < 1.0 (line 326 enumeration is misleading); (b) line 326 figure 33.7 is wrong and corrected denom = 34.7 (re-verify ALL ledger rows under sca-v9 if denom changes).
- **Impact if denom corrected to 34.7**: my W320 ledger row #89 PWF install_score 3.638 → ~3.531 (lower by 0.1); row #90 protect-mcp install_score 3.937 → ~3.822; rows #91/#92 similar shifts. **NONE cross a tier-floor boundary** under the corrected denom (verified in `STREAM-B-W320-LEDGER-UNDER-SCA-V9.md` §2-§4 with both-denom-options computed).

---

## §2 P1 — High-priority closure (most-likely next wave)

### P1-A — `/plugin install git-pr-workflows@claude-code-workflows`

- **W324 §carryover**: operator-interactive `/plugin install` paste-ready at `P4-GIT-PR-WORKFLOWS-INSTALL.md`
- **W321-2 Stream-2 T1 INSTALL candidate**: same plugin
- **De-dup**: SAME item; W324 disposition WINS (paste-ready)
- **Operator action**: run `/plugin install git-pr-workflows@claude-code-workflows` then verify cache + smoke `commitlint` CLI.

### P1-B — `slsa-verifier` operator go install + PreToolUse advisory wiring

- **W324 P8 disposition** (CLOSURE-SYNTHESIS:130-132 + P8 doc): paste-ready `go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@v2.7.0`; falsifiable-inverse in-toto + cosign + `gh attestation verify`
- **W321-8 codex META blindspot #1 codification**: SLSA/Sigstore provenance verification is the missing SOTA practice
- **W323-4 proposed dim D39 `supply_chain_attestation` (NOT shipped)**: would have given per-candidate scoring of attestation maturity
- **Operator action**: install slsa-verifier; advisory-first PreToolUse hook on `Bash(npm install -g *)` + `Bash(gh release download *)` exits 0 even on verify-fail this wave (advisory burn-in); blocking exit 2 next wave.

### P1-C — ECC `/plugin update` from `2.0.0-rc.1` to `d6022d6b` (~21 days behind) + re-apply W317 MSYS patch

- **W321-4 STREAM-4-CCBP-ECC §5**: cache 2026-04-28 vs HEAD 2026-05-19 = 21-day drift
- **W319-S6 operator-AI target `33ed494a → f3cd00625222`**: **DOUBLY-STALE** — actual HEAD is `d6022d6b`
- **W322 P1 deferred to W323**: "risk of clobbering W317 patch"
- **W324 NOT YET ADDRESSED in W324 ship**: appears not in W324 §carryover explicitly (close-flagged-but-skipped)
- **Operator action**: (1) backup current `plugin-hook-bootstrap.js` MSYS patch; (2) `/plugin update everything-claude-code@everything-claude-code` (interactive); (3) re-apply W317 patch from `.pre-w317-msys-norm`; (4) run `tools/test-msys-norm.mjs` — must hold 42/42.

### P1-D — Tavily + Exa MCP env keys

- **W324 P5 disposition** (CLOSURE-SYNTHESIS:99-106): `.mcp.json` mcpServers updated; `CLAUDE.local.md` env-block appended (gitignored)
- **W323-8 Stream-8 candidate**: same identified candidates
- **Operator action**: populate `TAVILY_API_KEY` + `EXA_API_KEY` values in `CLAUDE.local.md` (gitignored); confirm `.mcp.json` `${TAVILY_API_KEY}` + `${EXA_API_KEY}` interpolation fires.

---

## §3 P2 — Medium-priority backlog (multi-wave)

### P2-A — Hook gaps (3 HIGH from W321-1)

- **`SessionEnd`**: project-level not wired (only via ECC + codex plugin gates)
- **`UserPromptSubmit`**: could auto-inject mem-recall T6 / strip secrets pre-API
- **`SubagentStart`/`SubagentStop`**: would enable LIVE parallel_ratio measurement (currently rolling-30d 0.5875)
- **W324 NOT addressed**
- **Operator action**: weigh against W317 hook discipline (≤2KB R2-exception shims with cite-anchor); each new hook MUST be either plugin-shipped OR cite-anchored R2-exception. Most likely path: install relevant existing upstream plugin (e.g. ECC `stop:cost-tracker` re-enable; ECC `stop:evaluate-session` re-enable per W321-4 §4).

### P2-B — GitNexus PolyForm-NC license operator-gate decision

- **W324 §carryover P7**: operator-decision required
- **W321-5 + W319 disposition**: HOLD pattern-study; PolyForm-NC blocks commercial use
- **Operator action**: decide whether single-operator local install qualifies as "commercial" under PolyForm-NC § "use" definition (legal review).

### P2-C — anthropic-SDK 3-helper direct-API integration

- **W324 §carryover SDK**: harness/eval_harness.py has no current direct `anthropic.Anthropic().messages.create()` call site; `_w324_*` helpers ready
- **Operator action**: when `advisor_pilot_stub` (or similar advisor lane) promotes to live direct-API, wire `--cache-1h` + `--batch` + `--structured` flags via existing helpers.

### P2-D — TAVILY_API_KEY + EXA_API_KEY values (operator-blocking populate)

Subsumed under P1-D above; listed P2 here only for completeness as W324 §carryover entry.

### P2-E — wshobson agent-teams F4 single-point-of-failure documentation

- **W321-2 Stream-2 §2**: team-lead crash = orphaned teammates; no documented recovery path
- **W324 NOT addressed**
- **Operator action**: add a `CLAUDE.md` § or `agent-teams/team-spawn.md` skill-level note documenting the SPOF + recommended operator-action (`/team-status` polling; manual orphan-reclaim).

### P2-F — W326 sca-vN+ revisit of W323-4 proposed dims (`supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit`)

- **W323-4 proposed dims NOT shipped in sca-v9**: dim numbers D39/D40/D41 went to W321-7's mcp/opus/portable/loop semantics instead
- **R5 5-control codified in §6 prose** but NOT as per-candidate scoreable dims
- **Operator action**: decide at next rubric bump whether to (a) preserve sca-v9 dim numbering and add D42/D43/D44 for the W323-4 proposals; (b) re-name and shift; (c) keep R5 5-control as prose-only and rely on §9 decision-tree to surface layered-defense gaps via cardinal-rule-violation checks.

### P2-G — W325 SEV-1 Perplexity rotation completion (post-rotation closeout)

Once P0-B rotation completes, mark W317-r2-SEV1-1 + W319 carry CLOSED.

### P2-H — W320 P5 shell defensive long-tail

- **W324 §carryover W320**: 16 HIGH × 12 .ps1; bash-pro agent staged
- **Operator action**: bash-pro agent dispatch to apply defensive patterns (`set -euo pipefail`, IFS preservation, quote variables, etc.) to long-tail PowerShell scripts under `tools/`.

### P2-I — W317 STREAM-E 4 upstream PRs (operator GH-account)

- **W324 §carryover W317-E**: open PRs against upstream repos via operator's GitHub account
- **Operator action**: review pending PR drafts at `docs/architecture/W317-STREAM-E-PR-DRAFTS/` (if dir exists) and submit via operator's authenticated `gh pr create`.

---

## §4 P3 — Low-priority / cosmetic

### P3-A — W320 P7 CLAUDE.md cite-corrections (OllamaServe + LlamaSwap docs)

- **W324 §carryover W320**: cosmetic doc-only cite-refresh
- **Operator action**: low priority; refresh CLAUDE.md L35 runtime state with current Ollama + LlamaSwap status.

### P3-B — flock(2) SessionStart bare-resume detect (Windows POSIX)

- **W324 §carryover P4**: deferred (Windows POSIX flock requires WSL2 or msys64 dep)
- **Operator action**: research WSL2 vs msys64 flock(2) integration; LOW priority since W280d worktree discipline already prevents bare-resume.

### P3-C — CCBP cite-anchor 1-commit drift

- **W321-4 §1+§2**: CLAUDE.md L3 cite `48f2ceb` vs HEAD `48798ca` = +1 commit (README badge bump)
- **Operator action**: refresh next operator-edit-pass; no action this wave per W314 §C cross-SHA invariance.

### P3-D — Output style `"Proactive"` non-canonical documentation

- **W321-1 §Output styles**: keep but document deviation
- **Operator action**: add CLAUDE.md note that `outputStyle:"Proactive"` is operator-curated non-canonical custom style.

---

## §5 Already-CLOSED in W324 (no further action)

| Item | W324 disposition |
|---|---|
| sca-v9 SKILL.md compact rewrite (was 1629 LOC; operator-strict advisory) | ✓ SHIPPED — 338 LOC, ~79% compression |
| 4 addyosmani-* prefix-dup + interview-me skill archive | ✓ SHIPPED — git-mv to `_archived/W324-deprecated/` |
| 2 broken SKILL.md (`learned/` empty + `gitnexus/` umbrella missing) | ✓ SHIPPED — both REPAIRED |
| anthropic-sdk-python 3-feature wire (--cache-1h + --batch + --structured) | ✓ SHIPPED — `_w324_*` helpers in eval_harness.py |
| Node-22 node:test migration of test-msys-norm.mjs | ✓ SHIPPED — 42/42 PASS in 7 suites |
| `signed-audit-trails` enabled-but-unwired cruft (W321-8 + W322 P2) | ✓ SHIPPED — DISABLED (cardinal-rule honesty; no false-assurance) |
| commitlint half (cli@21 + config-conventional) | ✓ SHIPPED |
| mise.toml project root | ✓ SHIPPED |
| planning-with-files SHA-256 sidecar (tools/planning-attest.ps1) | ✓ SHIPPED — operator-invocable; not auto-fired |
| Tavily + Exa MCP `.mcp.json` entries (CR-9 pinned) | ✓ SHIPPED (env keys pending — see P1-D) |
| W316-S7 / W319 / W320 ledger rows #89-#92 sca-v9 rule_version cite-correction | ✓ SHIPPED by my `1360aeb` codex-r2 (post-W324 cite-correction) |
| W320 ledger rows tier verdict under sca-v9 re-verification | ✓ This wave (W325 Stream B `STREAM-B-W320-LEDGER-UNDER-SCA-V9.md` — ALL 4 TIERS HOLD) |
| W322 P6 silent-fallback re-dispatch (3 streams W321-3+7+8) | ✓ SHIPPED (W322 closure) |
| W315-AI-LLAMASWAP-DOC + Hindsight option-(b) demote | Already done in W317-r2 (CLAUDE.md L34-35) |

---

## §6 Items DEPRECATED-OR-RETIRED by parallel session

| Item | Disposition |
|---|---|
| sca-v8.1-partial rubric (W319 ship) | SUPERSEDED by sca-v9 (W324 P1); v8.1-partial archived at `.claude/skills/_archived/W324-pre-sca-v9/SKILL-sca-v8.1-partial.md` |
| addyosmani-{api-and-interface-design,code-simplification,doubt-driven-development,frontend-ui-engineering}/ SKILL.md (4 prefix-dups) | RETIRED by W324 P0 git-mv to `_archived/W324-deprecated/` (true-dups of canonical non-prefixed variants) |
| interview-me skill | RETIRED by W324 P0 git-mv (deprecated) |
| `signed-audit-trails@claude-code-workflows: true` flag in enabledPlugins | FLIPPED to false by W324 P8 (no false-assurance) |
| W319-S6 ECC update target `33ed494a` → `f3cd00625222` | DOUBLY-STALE per W321-4 — current target is `d6022d6b` (P1-C above) |

---

## §7 Forward-AI for W326 (this stream's recommendations)

- **W326-AI-1** (P0-C): codex-ratify SKILL.md §7 install denom 33.7 vs 34.7 arithmetic
- **W326-AI-2** (P2-F): decide sca-v9 → sca-v9.1 or sca-v10 dim-add for W323-4 `supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit`
- **W326-AI-3**: update VERDICT-LEDGER.md rows #89-#92 with sca-v9 re-verify annotation (per `STREAM-B-W320-LEDGER-UNDER-SCA-V9.md` §8 recommendation)
- **W326-AI-4**: document W325 Stream B reconciliation in CLAUDE.md status appendix (pointer-only; full content stays in W325-MULTI-SESSION-RECONCILE/)
- **W326-AI-5**: dispatch P0-A R5 operator-decision wave (operator-blocking; ship-blocker since W316)
- **W326-AI-6** (P0-B): execute Perplexity API key rotation

---

## §8 Cardinal-rule invariants (this reconciliation)

- R1-R5: no behavior changes; documentation-only synthesis (R5 still PARTIAL-HOLD-CARRY-FORWARD via P0-A).
- `self_invented_count: 0`: HOLDS.
- CLAUDE.md ≤50 LOC body: HOLDS (no edits this wave).

---

## §9 Cites

- `docs/architecture/W324-WAVE/CLOSURE-SYNTHESIS.md` §"Carryover to W325" (lines 134-145)
- `docs/architecture/W324-WAVE/P8-SLSA-VERIFIER-AND-SIGNED-AUDIT-DECISION.md` §DECISION-A + §DECISION-B (slsa-verifier paste-ready)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-1-ANTHROPICS-AUDIT.md` §1+§2 (18-hook gap + env-var gap)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-2-WSHOBSON-AGENTS.md` §2 (team-lead SPOF F4) + §1 (T1 INSTALL git-pr-workflows)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-4-CCBP-ECC.md` §5 (ECC 21-day drift to `d6022d6b`)
- `docs/architecture/W321-META-FOUNDATION-WAVE/STREAM-8-REDISPATCH.md` (codex META 3 blindspots)
- `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-4-RESEARCH-ARCH-V9.md` (3 W323-4-proposed dims not shipped in sca-v9)
- `docs/architecture/W322-WAVE/CLOSURE-SYNTHESIS.md` §P0-P7 (P-block deferral history)
- `.claude/skills/sota-convergence-audit/SKILL.md` §6 (R5 5-control prose codification) + §7 (denom arithmetic)
- prior wave SEV-1: commit `1ab189b` (W317-r2) leaked perplexity key — `git log -p 1ab189b -- 'docs/architecture/W317-OPS-CLOSURE-WAVE/STREAM-7-*.md'` (verify rotated)
