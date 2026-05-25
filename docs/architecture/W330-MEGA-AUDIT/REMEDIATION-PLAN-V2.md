# W330 MEGA-AUDIT — Remediation Plan V2 (codex round-1 absorb)

> Wave **W330** · 2026-05-19 · Replaces `REMEDIATION-PLAN.md` (V1) per codex GPT-5.5 round-1 NEEDS-REVISION verdict (axis-1 + axis-2, position-swap-convergent @ 0.86). Companion: `CODEX-VERDICT-LEDGER.md`.

## §1 Codex absorb summary

Both round-1 verdicts converged on **NEEDS-REVISION @ 0.86 confidence**. V2 absorbs:
- **Priority reorder**: D4 → P0.1 (after detector redesign at `UserPromptSubmit`, NOT `PreToolUse[Agent]`)
- **D1 safety gates**: active-session check + `/insights` acceptance test required
- **D2 severity downgrade**: GitNexus P0 → P1 (BM25 not on hot path; index unverified)
- **5 new repos** added to W331 SOTA scan: langgraph / litellm / mem0 / zep / cline
- **Stream B re-scan**: line-by-line ingest required for the 15-repo expanded set
- **2 repos to retire** from SOTA tracking: alirezarezvani/claude-skills, mattpocock/skills (downgrade to T3 cite-only)
- **5 new research-stack gaps**: T1 replacement bakeoff (mem0/Letta/Zep), prompt-optimizer track (DSPy/MIPRO/GEPA), frontier-peer policy, benchmark harness, model-routing comparison
- **5 cardinal-rule audits**: CR-1 trust-definition, CR-2 ≤2KB enforcement, CR-3 dispatch-site allowlist, CR-4 33-skill trigger audit, CR-5 contradiction with custom guard scripts
- **Severity calibration**: distinguish SEV-1-impact from SEV-1-failure-mode consistently
- **66-key install-state drift** (Stream C F17 was understated at 45)

## §2 Revised P0 (in dependency order, operator-gated)

### P0.1 — Redesign parallel-dispatch detector at `UserPromptSubmit` (BEFORE D4)

**Why first**: Codex axis-1 #1 CRITICAL — the parallel-guard's PER-CALL matching is the root-cause bug; flipping `exit 0` → `exit 2` BEFORE fixing the detector would block legitimate W269-compliant dispatches. Empirical proof: this audit's 8-Agent compliant dispatch fired 8 advisories.

**Action**:
1. Move parallel-dispatch intent detection from `PreToolUse[Agent]` (per-call) to `UserPromptSubmit` (message-level).
2. Detector reads the operator's prompt + scans for multi-stream wording at the MESSAGE level — emits a per-session flag `multi_stream_pending: true`.
3. `PreToolUse[Agent]` then consults the flag: if `multi_stream_pending` AND this is the 2nd+ Agent dispatch in this assistant turn, BLOCK. If 1st Agent dispatch in turn, ALLOW.
4. Per-session state file: `.claude/state/parallel-guard-session-<sessionId>.json`.

**Risk**: BREAKING — changes hook semantics. Must be staged on `goal/W330-remediation` branch with codex round-2 review BEFORE merge.

**Cardinal-rule resolution** (CR-5 contradiction per axis-1 #2): file `tools/preagent-*.mjs` lives outside `.claude/hooks/` per cardinal-rule-2 letter, but axis-1 finds CR-5 spirit-violated. Resolution: classify `tools/preagent-*.mjs` as **observability instrumentation** (audit-log / telemetry / advisory) — promote to "binding gate" only after codex round-2 + operator-confirm.

**Reversible**: yes (revert single commit).

---

### P0.2 — Fix `CLAUDE_CODE_PROJECT_DIR` redirect (was V1 D1)

**Why second**: Active session impact — risks breaking concurrent terminals if not staged correctly.

**Codex axis-1 #9 requirements baked in**:
1. **Active-session probe FIRST**: `Get-Process claude | Where-Object { $_.StartTime -gt (Get-Date).AddHours(-24) }` — if >0 active processes, ABORT with operator instruction "close other terminals first".
2. **`/insights` acceptance test**: BEFORE rename, verify `/insights` reads from `$HOME/.claude/projects/` empirically. AFTER rename, verify `/insights` either (a) still reads from $HOME (then state-side is irrelevant) OR (b) reads from `CLAUDE_CODE_PROJECT_DIR` (then we want state-side to be authoritative).
3. **Decision tree**:
   - If `/insights` reads `$HOME/.claude/projects/`: KEEP the current location; DROP the `CLAUDE_CODE_PROJECT_DIR` env-var override (revert state-outside-repo design for projects); update CLAUDE.local.md L51 to remove the env line.
   - If `/insights` reads `CLAUDE_CODE_PROJECT_DIR`: MIGRATE 3275 JSONLs to state-side OR symlink — operator picks per cooldown preference.

**Action (revised)**:
```powershell
# Step 1: probe /insights read source — OPERATOR MUST RUN MANUALLY in CC:
# /insights then check operator-visible HTML report path; OR
# Get-FileHash on $HOME/.claude/projects/*.jsonl after /insights runs (mtime touched?)

# Step 2 (if /insights uses $HOME, recommended):
# Edit CLAUDE.local.md — remove line: $env:CLAUDE_CODE_PROJECT_DIR = '...'
# Restart CC → no rename needed
```

**Reversible**: yes (re-add env-var line).

---

### P0.3 — `tools/preagent-parallel-guard.mjs` exit-code flip (was V1 D4)

**Why third**: Depends on P0.1 detector redesign — flipping exit-code on the broken per-call detector would block legitimate W269-compliant dispatches.

**Action (depends-on P0.1)**:
1. After P0.1 lands AND codex round-2 confirms detector is correct:
2. Edit `tools/preagent-parallel-guard.mjs:178` per CLAUDE.md L34 W329-D proposed-fix:
   - 1st violation in session: advisory + `exit 0` (current behavior)
   - 2nd+ violations in same session: ERROR + `exit 2` (BLOCK)
3. Verify telemetry: `tools/parallel-ratio-telemetry.mjs` should now compute meaningful parallel_ratio after detector fix.

**Reversible**: yes (revert single edit).

---

### P0.4 — Consolidate codex split-install (was V1 D5)

**Why fourth**: Before any other npm-global upgrades to avoid silent no-op pattern.

**Action (same as V1 D5)**:
```powershell
# Identify which install is newer
$local = Get-Item Z:\claude-sota-installed\.local\npm\codex.cmd
$global = Get-Item C:\Users\42\AppData\Roaming\npm\codex.cmd
# Keep newer; uninstall older. Recommended: keep %APPDATA%\npm.
Remove-Item Z:\claude-sota-installed\.local\npm\codex*, `
  Z:\claude-sota-installed\.local\npm\node_modules\@openai\codex `
  -Recurse -Force
where.exe codex  # verify single resolution
codex --version  # verify reachable
```

**Reversible**: yes (`npm i -g @openai/codex --prefix Z:\claude-sota-installed\.local\npm`).

---

### P0.5 — Reconcile `installed_plugins.json` install-state contract

**Why fifth**: Per codex axis-1 #12+#16 + orchestrator empirical probe (66 keys drift, NOT 45 as Stream C reported). Stream C's F17 finding was UNDERSTATED.

**Empirical state** (verified §6 of verdict ledger):
- `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json` keys: **2**
- `Z:/claude-sota-installed/.claude/settings.json:enabledPlugins` keys: **68**
- **66 enabled plugins absent from installed_plugins.json**

**Hypotheses**:
- (a) `installed_plugins.json` is lazily-resolved; CC reconstructs install-state from `.claude/plugins/cache/` directory walk at session-start (the 2 keys are user-curated/sentinel entries)
- (b) `installed_plugins.json` is meant to be authoritative but session-end write was skipped/lost
- (c) Schema change between CC versions — file purpose may have shifted

**Action**:
1. Probe via 2 different CC versions OR grep CC binary for `installed_plugins.json` reference patterns.
2. If (a): the file is informational not authoritative — Stream C/F17 finding is a perception artifact; documenting the contract in CLAUDE.md is the fix.
3. If (b): operator runs `/plugin reload` and verifies file is rewritten; add `SessionEnd` hook to ensure rewrite.
4. If (c): file a `anthropics/claude-code` issue + adopt the authoritative source going forward.

**Reversible**: yes (no destructive changes in probe).

---

### P0.6 (DOWNGRADED FROM V1 D2) — Update GitNexus plugin

**Why downgraded to P0.6/P1**: Codex axis-2 #7-8 + axis-1 #14 — BM25 FTS not on hot path; index unverified; SYNTHESIS contradicts itself by also classifying GitNexus as under-utilized.

**Pre-action probe** (operator-confirms BEFORE update):
1. `gitnexus list .` / `gitnexus status .` — is this repo even indexed? (Stream F F-P1 said unverified)
2. If NOT indexed: the Windows FTS fix is irrelevant to current runtime usage; defer update to W332+
3. If indexed AND BM25 used: confirm Windows-FTS fix is the right surface

**Action** (after probe):
```
/plugin update gitnexus@gitnexus-marketplace
/reload-plugins
```

**Reversible**: yes (`/plugin install gitnexus@gitnexus-marketplace --version 1.3.6`).

---

### P0.7 (DEFERRED FROM V1 D3) — Node 22.22.0 → 22.22.3

**Why deferred to P0.7/P1**: Codex axis-1 priority reorder — Node bump only if specific CVE verified; else P1.

**Action**:
1. WebFetch `https://nodejs.org/en/blog/vulnerability` — search for CVEs affecting 22.22.0 fixed in 22.22.1/.2/.3
2. If specific CVE found: P0 upgrade now
3. If no specific CVE: defer to next quarterly maintenance window

**Reversible**: yes (re-install 22.22.0 MSI).

---

## §3 New P0 actions (codex round-1 additions)

### P0.8 — Severity calibration pass

Per codex axis-1 #7 + #10: rewrite all severity language using strict taxonomy:
- **SEV-1 IMPACT**: data-loss / corruption / system-down (none currently)
- **SEV-1 BASELINE**: failure-mode where the BASELINE measurement is in SEV-1 range (W325-A 0.0036 parallel-ratio)
- **SEV-2 silent-fallback**: advisory-when-should-block, error-swallow
- **SEV-3 cosmetic**: under-utilization, stale references

Update `SYNTHESIS.md` + `C-silent-fallback-hunt.md` + `D-agent-team-verification.md` to use this taxonomy consistently.

Replace "ZERO defensive checks" with "ZERO PROGRAMMATIC defensive checks" (axis-1 #10) — prose checks DO exist in `wshobson/agents`.

---

### P0.9 — Cardinal-rule audit pass

Per codex axis-1 #2-5: audit + tighten each cardinal rule:
- **CR-1**: extend "trusted" definition to include maintainer-identity, signed releases, license risk, malicious-update review, dependency blast-radius. Cite-anchor SLSA L3 + SBOM (CycloneDX).
- **CR-2**: mechanize ≤2KB enforcement via `PreToolUse[Edit|Write]` checker that blocks any addition under `.claude/hooks/` >2048 bytes; verify `anthropics/claude-code#46915` is still cited in the exception (CONFIRMED OPEN, last update 2026-05-10).
- **CR-3**: add dispatch-site `subagent_type` allowlist validator (Δ-DPA-5) — already proposed as W331.1.
- **CR-4**: audit 33 local skills' `description:` trigger phrases for cardinality (W255 spirit) — same standard applied to alirezarezvani's 313-skill bundle in Stream B.
- **CR-5**: resolve contradiction with `tools/preagent-*.mjs` custom guard scripts — classify as "observability instrumentation" (CR-5 spirit-compliant) until P0.1 detector redesign upgrades to binding gate via documented anthropics-supplied surface.

---

### P0.10 — Stream B re-scan (line-by-line ingest of 15-repo expanded set)

Per codex axis-2 #1+#2 + operator's "ingest line by line, no budget limit, MAX code quality":

15-repo line-by-line set:
1-10: original Stream B set
11. `langchain-ai/langgraph` (NEW)
12. `BerriAI/litellm` (NEW)
13. `mem0-ai/mem0` (NEW)
14. `getzep/zep` (NEW)
15. `cline/cline` (NEW)

ALSO add official SDK comparison targets (codex axis-1 #13):
- `openai/codex` (Codex CLI)
- `anthropics/anthropic-sdk-python`
- `anthropics/anthropic-sdk-typescript`
- `modelcontextprotocol/specification`
- `modelcontextprotocol/python-sdk`
- `modelcontextprotocol/typescript-sdk`

**Approach** (per Δ-DPA-1 + repomix discipline):
- For each repo, the dedicated subagent INVOKES `mcp__repomix__pack_remote_repository <slug>` in ITS OWN context (NOT inline in parent prompt — Δ-PDM-1 F4).
- Subagent grep-and-extract: API surface, hook patterns, agent definitions, novel SOTA patterns.
- Deliverable: `Z:/claude-sota-installed/docs/architecture/W331-LINE-BY-LINE-INGEST/<slug>-ingest.md` per repo.

**Wave**: W331 (next wave; not this wave).

---

### P0.11 — T1 hindsight replacement bakeoff

Per codex axis-2 #3 + #11: mem0 v1.0 (npm drift detected) + Letta + Zep evaluated as T1 hindsight replacement.

**Approach**:
- Stage-0 existence-probe each (sca-v12.1 §1)
- Stage-1 dimension scoring (D1-D49)
- T-verdict per candidate
- Operator picks winner OR confirms staying with current T2-T6 (sca-v12.1 ratification)

**Wave**: W331 or W332.

---

### P0.12 — Frontier-peer cross-model gate policy

Per codex axis-2 #4: local Ollama `qwen3-coder:30b-a3b-q4_K_M` is NOT adequate for adversarial review.

**Policy**:
- Cross-model gate authority: **codex GPT-5.5** (current; via openai-codex plugin)
- Cheap triage / cost-control: local Ollama (acceptable)
- Sonnet 4.6 as third opinion for tie-breaking (when codex round-1 + round-2 diverge)

Codify in CLAUDE.md L10 + L20 (cardinal-rule-3 extension).

---

### P0.13 — Prompt-optimization track

Per codex axis-2 #5: DSPy 2.6 / MIPRO / GEPA tracking missing.

**Approach**:
- The `dspy-integration` skill ALREADY exists locally (per CLAUDE.md L40 + skill list). Verify it's wired.
- Add prompt-optimizer evaluation track to W331+ research wave.

---

## §4 Revised P1 (Wave W331)

- W331.1 — Add Δ-DPA-5 subagent_type pre-flight validator at dispatch site (V1 carry-over)
- W331.2 — Wire `SubagentStop` hook for parallel-ratio telemetry (V1 carry-over; codex axis-2 #6 confirms necessary-but-insufficient)
- W331.3 — Reconcile install-state contract (V1 carry-over + P0.5 above adds empirical probe)
- W331.4 — Re-enable ECC stop:cost-tracker + stop:evaluate-session + post:session-activity-tracker (V1 carry-over; codex axis-2 #10 ELEVATES this above agent-team repo replacement)
- W331.5 — Add OTEL metrics + logs exporters (V1 carry-over; codex axis-2 #10 corroborates)
- W331.6 — Adopt `/devfleet` + `/orchestrate` for multi-stream waves (V1 carry-over)
- W331.7 — `git worktree prune` SessionStart hook (V1 carry-over)
- W331.8 — Mechanize one-worktree-per-session in `eee.ps1` (V1 carry-over)
- **W331.9 (NEW)** — Line-by-line ingest of 15-repo expanded set + 6 official-SDK comparators (P0.10 above)
- **W331.10 (NEW)** — T1 hindsight replacement bakeoff (P0.11 above)
- **W331.11 (NEW)** — Frontier-peer cross-model gate policy codification (P0.12 above)
- **W331.12 (NEW)** — Prompt-optimization track + dspy-integration skill verification (P0.13 above)

## §5 Revised P2 (Wave W332+)

- W332.1 — Coding-language SOTA Edit-line proposals (V1 carry-over)
- W332.2 — Index GitNexus for `Z:/claude-sota-installed` (V1 carry-over; codex axis-2 #7-8 makes this a P0.6 prerequisite — moved earlier)
- W332.3 — 7 npm-global major-version bumps with per-package CHANGELOG review (V1 carry-over)
- W332.4 — Eval alirezarezvani/claude-skills via sca-v12.1 (V1 carry-over — codex axis-2 says RETIRE; verify before retirement)
- W332.5 — Update context-mode v1.0.141 → v1.0.142 (V1 carry-over)
- W332.6 — Stdio-MCP smoke-gate cron (V1 carry-over)
- ~~W332.7 mattpocock/skills~~ → RETIRED per codex axis-2 #3.2 (low-impact /handoff wording; not SOTA-track-worthy)

## §6 Operator-decision matrix (FINAL — per codex absorb)

| Gate | Action | Reversible | Risk | Recommendation |
|---|---|---|---|---|
| G1 | P0.1 Redesign detector at `UserPromptSubmit` | YES (single commit revert) | Medium (hook semantics) | APPROVE w/ codex round-2 gate |
| G2 | P0.2 Fix `CLAUDE_CODE_PROJECT_DIR` (drop env-var, recommended) | YES (re-add line) | Low | APPROVE after `/insights` probe |
| G3 | P0.3 Exit-code flip (depends on G1) | YES | Medium | APPROVE after G1 + codex round-2 |
| G4 | P0.4 codex PATH consolidation | YES | Low | APPROVE |
| G5 | P0.5 Reconcile install_plugins contract | YES (no destructive) | Low | APPROVE — probe-only first |
| G6 | P0.6 GitNexus update (downgraded P0→P1) | YES | Low | DEFER to W331 unless BM25 confirmed |
| G7 | P0.7 Node 22.22.3 (deferred unless CVE) | YES | Low | DEFER unless CVE verified |
| G8 | P0.8 Severity calibration pass | YES | Low | APPROVE — doc-edit only |
| G9 | P0.9 Cardinal-rule audit pass | YES | Low | APPROVE — CLAUDE.md edits |
| G10 | P0.10 Stream B re-scan (W331) | n/a | Low | APPROVE — next wave |
| G11 | P0.11 T1 replacement bakeoff (W331/332) | n/a | Low | APPROVE — research wave |
| G12 | P0.12 Frontier-peer policy codification | YES | Low | APPROVE — CLAUDE.md edit |
| G13 | P0.13 Prompt-optimization track | n/a | Low | APPROVE — research wave |

## §7 Rollback plans (per P0)

Each P0 item has explicit reverse path:
- P0.1: revert single commit on `tools/preagent-parallel-guard.mjs` + `settings.json:hooks.UserPromptSubmit`
- P0.2: re-add `$env:CLAUDE_CODE_PROJECT_DIR` line to `CLAUDE.local.md:51`
- P0.3: revert exit-code edit
- P0.4: `npm i -g @openai/codex --prefix Z:\claude-sota-installed\.local\npm`
- P0.5: no destructive changes; probe-only
- P0.6: `/plugin install gitnexus@gitnexus-marketplace --version 1.3.6`
- P0.7: re-install Node 22.22.0 MSI
- P0.8-P0.9: revert CLAUDE.md + SYNTHESIS edits
- P0.10-P0.13: defer / wave-roll-forward (no destructive)

All edits land on `goal/W330-remediation` branch → squash-merge to `sota-converge-w310` after codex round-2 approval per `git push --force-with-lease` discipline (CLAUDE.md L14).

## §8 Codex round-2 plan

After V2 lands + operator-confirmed P0s execute → dispatch codex round-2 with:
- This V2 + executed-state snapshot
- Position-swap evidence order (re-reversed from round-1)
- Specifically verify: did P0.1 detector redesign close the per-call false-positive? Did P0.5 install-state contract get codified? Did P0.10 line-by-line ingest reach completion?

Expected verdict: APPROVE OR REVISE-WITH-MINOR (round-2 should not return BLOCK if V2 absorbed correctly).

## §9 Process meta-improvements (orchestrator learnings from W330)

1. **Per-agent budget caps were prose-only, not host-enforced** — 6 of 8 stream agents exceeded 15-call cap with no STATUS marker (task_plan.md §2). W331.13 candidate: enforce via SubagentStop hook + agent state file.
2. **Skeleton-first-write protocol worked** — every stream deliverable exists, even when individual sections were thin. Δ-DPA-1 validated.
3. **Position-swap discipline confirmed verdict reliability** — Δ-DPA-4 validated (axis-1 ↔ axis-2 converge on NEEDS-REVISION @ 0.86).
4. **Codex cross-model gate is the SOTA primitive** — both rounds returned high-confidence non-trivial findings the orchestrator missed.
5. **Hook false-positive on this very session** is the most actionable evidence for P0.1 fix scope.
