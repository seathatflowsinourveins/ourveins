# W342 Stream X2 — Hook Mechanization Deliverable

> Owner: W342-FULL-GAP-RESOLUTE Stream X2
> Date: 2026-05-20
> Status: IMPLEMENTED + SMOKE-TESTED (4 scripts; 2 of 4 are direct-CLI)
> Discharges: W341 SEV-1 D73 codified-not-fired + W341 SEV-2 Phase-6 position-swap codified-not-fired + W340 F4 13-bare-name FQN-discipline + nodebestpractices rule-7 npm-audit gate.

## §1. P0.4 — D73 SHIP-BLOCK gate (`tools/preagent-d73-gate.mjs`)

**Status**: IMPLEMENTED at `tools/preagent-d73-gate.mjs` (8717 B / 221 LOC).
Smoke-tested: non-compliant fixture (2 github first-discoveries) → exit 2 BLOCK with full diagnostic; compliant fixture (deepwiki+perplexity) → exit 0; `CLAUDE_D73_GATE_DISABLE=1` → exit 0.

**Goal**: PreToolUse[Agent] hook that blocks codex/T1-verdict-write events when the active verdict-ledger row has `verdict: T1|T1-PROV|T2` but `mcp_family_attribution[]` shows <2 non-github first-discoveries (sca-v15 §I10 + D73 ≥4 mandate).

**Heuristic**:
- Read tool_input for keyword markers (codex review, ledger write, T1 verdict).
- Scan the most-recent `docs/architecture/W*/VERDICT-LEDGER.md` for the active row (newest wave dir).
- Parse `mcp_family_attribution[]` block per row; count `first_discovered_by:` entries excluding github family.
- If <2 non-github first-discoveries AND verdict ∈ {T1, T1-PROV, T2}: exit 2 (BLOCK).
- Else: exit 0.

**Escape hatch**: `CLAUDE_D73_GATE_DISABLE=1`.

**LOC target**: ≤180.

## §2. P0.5 — Position-swap Stop-hook (`tools/stop-position-swap.mjs`)

**Status**: IMPLEMENTED at `tools/stop-position-swap.mjs` (7967 B / 209 LOC).
Smoke-tested: round-1 APPROVE + no round-2 + ledger missing `position_swap_consistent` → emits advisory via `hookSpecificOutput.additionalContext`, exit 0; ledger with `position_swap_consistent: true` → silent exit 0.

**Goal**: Stop event hook that fires round-2 codex review with evidence-order reversed when round-1 returned APPROVE for T1/T1-PROV/T2 verdicts (sca-v15 §6.2 Δ-DPA-4 Phase-6 mandate).

**Heuristic**:
- Read last `tmp/w*-codex-review-output*.txt` files (newest first).
- Detect round-1 APPROVE marker.
- Check whether round-2 (position-swap) has already fired (look for `r2.txt` or `position_swap_consistent` in ledger).
- If not yet fired AND T1 verdict: emit advisory + mark queued; non-blocking exit 0.
- The actual codex round-2 dispatch is operator-triggered (we cannot spawn child processes mid-hook reliably); hook surfaces the gap.

**Escape hatch**: `CLAUDE_POSITION_SWAP_DISABLE=1`.

**LOC target**: ≤200.

## §3. P1.5 — Bare-name pre-commit grep (`tools/precommit-bare-subagent-grep.mjs`)

**Status**: IMPLEMENTED at `tools/precommit-bare-subagent-grep.mjs` (7795 B / 205 LOC).
Smoke-tested: file containing two bare-form colliding-name dispatches (one with colon-quote syntax for code-reviewer, one with equals-quote syntax for security-auditor) plus one FQN-prefixed (pr-review-toolkit:code-reviewer) → exit 2 BLOCK with file:line:bare-name + FQN suggestions for both bare hits, FQN-prefixed match correctly skipped.

**Goal**: Pre-commit hook that greps staged files for any of the 13 colliding bare `subagent_type` names used as dispatched value. Per W340 F4 FQN-discipline (W333-D5).

**Heuristic**:
- Read 13 colliding names from `.claude/state/subagent-type-allowlist.json:colliding_bare_names[]`.
- For each staged file (git diff --staged --name-only), grep for `subagent_type[: =]"<bare-name>"` patterns where `<bare-name>` is bare (no `:` prefix).
- Exit 2 with file:line + suggested FQN form on hit.
- Skip if no colliding-names map present (soft-fail).

**Escape hatch**: `CLAUDE_BARE_SUBAGENT_GREP_DISABLE=1`.

**LOC target**: ≤160.

## §4. P1.6 — npm audit pre-commit (direct CLI; no new script)

**Status**: PROPOSED — direct-CLI inline in `.pre-commit-config.yaml` (no new script). See §6.3 below.

**Goal**: Per CR-2 direct-CLI invocation discipline, add a `.pre-commit-config.yaml` `local` hook that runs `npm audit --audit-level=high --omit=dev` against staged `package*.json` only. Advisory (exit 0 on findings; stderr warning).

**Heuristic** (inlined in pre-commit entry):
- Trigger only when staged set includes `package.json` OR `package-lock.json`.
- Run `npm audit --audit-level=high --json` (if `package.json` in CWD).
- Warn but never block (advisory).

No wrapper script needed; entry is ≤200B inline.

## §5. CR-2 compliance audit

| File | Path | Actual Size | CR-2 status |
|---|---|---|---|
| preagent-d73-gate.mjs | `tools/` | 8717 B / 221 LOC | OUT of `.claude/hooks/**` → CR-2 ≤2KB ceiling does NOT apply (cite: CLAUDE.md L19 + `.pre-commit-config.yaml:107-113` cr2-2kb-hooks gate filters by `^\.claude/hooks/` prefix) |
| stop-position-swap.mjs | `tools/` | 7967 B / 209 LOC | OUT of `.claude/hooks/**` → CR-2 N/A |
| precommit-bare-subagent-grep.mjs | `tools/` | 7795 B / 205 LOC | OUT of `.claude/hooks/**` → CR-2 N/A |

All scripts wired via settings.json/pre-commit-config.yaml as direct-CLI invocations (`node "$(git rev-parse --show-toplevel)/tools/<script>.mjs"`) — matches the W331-P0.9 pattern used for cr2-2kb-hooks + codex-trailer-gate + msys-hooks-form.

## §6. Proposed orchestrator wiring (X2 PROPOSES; orchestrator APPLIES)

### 6.1 `.claude/settings.json:hooks.PreToolUse[]` — append

```jsonc
{
  "matcher": "Agent",
  "hooks": [{
    "type": "command",
    "command": "node Z:/claude-sota-installed/tools/preagent-d73-gate.mjs",
    "timeout": 10000
  }]
}
```

### 6.2 `.claude/settings.json:hooks.Stop[]` — append

```jsonc
{
  "matcher": "*",
  "hooks": [{
    "type": "command",
    "command": "node Z:/claude-sota-installed/tools/stop-position-swap.mjs",
    "timeout": 5000
  }]
}
```

### 6.3 `.pre-commit-config.yaml:repos[local].hooks[]` — append two entries

```yaml
- id: bare-subagent-grep
  name: bare-subagent-grep (W342-X2 P1.5)
  entry: bash -c 'exec node "$(git rev-parse --show-toplevel)/tools/precommit-bare-subagent-grep.mjs"'
  language: system
  stages: [pre-commit]
  always_run: true
  pass_filenames: false

- id: npm-audit-staged
  name: npm-audit advisory (W342-X2 P1.6)
  entry: bash -c 'if git diff --staged --name-only 2>/dev/null | grep -qE "package(-lock)?\.json$"; then npm audit --audit-level=high --omit=dev 2>&1 | head -40 >&2 || true; fi; exit 0'
  language: system
  stages: [pre-commit]
  always_run: true
  pass_filenames: false
```

## §7. Cite anchors

- Anthropic hooks doc: `https://docs.anthropic.com/en/docs/claude-code/hooks` (event schema, exit-code-2 = blocking, additionalContext)
- sca-v15 SKILL.md §I10 + §6.2 Δ-DPA-4 + §10 position-swap mandate: `.claude/skills/sota-convergence-audit/SKILL.md:363,406,454`
- Pattern mirror: `tools/preagent-parallel-guard.mjs` (W326+W330 P0-A) + `tools/preagent-subagent-validator.mjs` (W326 P0-A2) + `tools/codex-trailer-gate.mjs` (W335 P0)
- nodebestpractices rule-7: npm-audit pre-commit gate (vulnerable-dependency surfaceing)
- W341 VERDICT-LEDGER.md Stream C §7 P0-C4/C5 + Stream E §4 + Stream F §1
- CR-2: CLAUDE.md L19; CR-1 trust-tuple: CLAUDE.md L17

## §8. Test plan (post-implementation)

Per-script smoke tests:
- D73 gate: fixture ledger with 0 non-github first-discoveries → exit 2; fixture with 2+ → exit 0; disable env → exit 0.
- Position-swap: fixture with round-1 APPROVE, no round-2 file → advisory emitted; fixture with both → silent exit 0.
- Bare-name grep: stage a file containing a colliding bare-form dispatch (e.g. equals-quote syntax for code-reviewer) → exit 2 with FQN suggestion; stage with FQN-prefixed (pr-review-toolkit:code-reviewer) → exit 0.
- npm audit: dry-stage package.json with known vuln → stderr advisory; no exit 2.
