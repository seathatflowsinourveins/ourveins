# CLAUDE.md L10 edit proposal — W331-X1 SEV-2 remediation

> **Status**: PROPOSAL (NOT APPLIED) — pending codex round-1 verify + operator authorization
> **Finding ID**: W331-X1 (SEV-2)
> **Source**: Cluster B (`docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-B-openai-codex.md`)
> **Cite-evidence**: `broker-endpoint.mjs:7-15` + `app-server-protocol.d.ts:57-66` + `broker-lifecycle.mjs:1-50` `[CODEX-VERIFY]`
> **CR-violation guard**: edit preserves ≤50 LOC budget (net delta = 0; same line edited)
> **Date**: 2026-05-19

## §1 Finding

Current CLAUDE.md L10 contains:

```
- **Reviewer**: codex GPT-5.5 via codex CLI subprocess (`codex exec` foreground+tee, Path P) — cross-model consensus per `https://docs.anthropic.com/en/docs/claude-code/sub-agents` model-precedence + `https://code.claude.com/docs/en/sub-agents`. When `codex@openai-codex` plugin is installed, native hooks auto-wire SessionStart/SessionEnd/Stop-review-gate; command surface: `/codex:setup`, `/codex:review`, `/codex:adversarial-review`, `/codex:rescue`, `/codex:status`, `/codex:result`, `/codex:cancel` (verified via cache/openai-codex/codex/1.0.4/commands/, W286b). **W331 P0.7 FRONTIER-PEER POLICY**: cross-model gate AUTHORITY = codex GPT-5.5; local Ollama `qwen3-coder:30b-a3b-q4_K_M` = cheap-triage-only (NOT adversarial-review authority); Sonnet 4.6 = tie-breaker when codex round-1+round-2 diverge. Per W330 codex axis-2 #4 + W331 Stream-4 verdict (`afd17a36`).
```

The phrasing `(codex exec foreground+tee, Path P)` describes the **implementation architecture** (subprocess + foreground+tee + Path P from W280-something era), which is **one architecture generation behind** the current codex-plugin-cc v1.0.4 implementation.

Per Cluster B cite chain:

1. `broker-endpoint.mjs:7-15` — JSON-RPC endpoint with Unix socket (POSIX) / Win32 named pipe (Windows) transport
2. `app-server-protocol.d.ts:57-66` — `AppServerRequest/Response` protocol definitions for client-broker comms
3. `broker-lifecycle.mjs:1-50` — `spawnBrokerProcess` detached+unref pattern for persistent broker daemon

**v1.0.4 mechanism**: `codex exec` CLI entry-point spawns a detached broker daemon (`spawnBrokerProcess`) which exposes a JSON-RPC app-server over Unix socket (POSIX) or Win32 named pipe. The Claude Code plugin connects to this broker via JSON-RPC for adversarial-review dispatch + result retrieval. NOT foreground+tee subprocess (W280-era Path P).

The CLI surface (`codex exec`, `codex review`, etc.) is preserved — only the internal mechanism changed.

## §2 Proposed edit

Replace the parenthetical only. Net LOC delta = 0 (same line, edited content). Net byte delta ~+30.

**Current**:
```
codex GPT-5.5 via codex CLI subprocess (`codex exec` foreground+tee, Path P) — cross-model consensus
```

**Proposed**:
```
codex GPT-5.5 via codex CLI (`codex exec` → app-server JSON-RPC over broker daemon, v1.0.4) — cross-model consensus
```

Cite-anchor (added inline if budget allows): `codex-plugin-cc@1.0.4 broker-endpoint.mjs:7-15 + app-server-protocol.d.ts:57-66`

Alternative (most-terse): `(codex exec → app-server JSON-RPC)`

Alternative (most-detailed): `(codex exec → detached broker spawnBrokerProcess @ broker-lifecycle.mjs:1-50 → JSON-RPC AppServerRequest/Response @ app-server-protocol.d.ts:57-66, v1.0.4)`

**Recommendation**: middle option — preserves accuracy + readability + ≤50 LOC.

## §3 Verification before apply

`[CODEX-VERIFY]` round-1 must confirm:

1. `broker-endpoint.mjs:7-15` EXISTS in `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/` (or equivalent install path)
2. `app-server-protocol.d.ts:57-66` EXISTS at same install root
3. `broker-lifecycle.mjs:1-50` EXISTS at same install root
4. Each file CONTAINS the claimed semantics (JSON-RPC endpoint, AppServerRequest/Response protocol, spawnBrokerProcess detached pattern)

If any of (1)-(4) fail → mark W331-X1 as FAB-RISK; do NOT apply edit.

## §4 STOP-gate compliance

| Gate | Before | After | Status |
|---|---|---|---|
| ≤50 LOC | 50 LOC | 50 LOC | ✅ preserved (same line edited) |
| self_invented_count: 0 | 0 | 0 | ✅ preserved |
| ≥3-org-distinct cites | yes | yes | ✅ preserved (Anthropic + OpenAI/codex + plugin maintainer) |
| No CR-1..5 violation | yes | yes | ✅ preserved (no new self-invent; no hook self-author) |

## §5 Apply procedure (after codex round-1 verify)

1. Operator authorizes CLAUDE.md edit
2. Apply via `Edit` tool with exact old_string/new_string match
3. Verify ≤50 LOC + self_invented_count:0 unchanged
4. Commit message: `docs(claude.md): W331-X1 update L10 codex mechanism to v1.0.4 app-server JSON-RPC (per Cluster B finding)`

## §6 Rollback

Single-line revert via `git revert HEAD` (matches W255 cleanup rollback discipline).

## §7 Operator-decision options

| Option | Approach | Trade-off |
|---|---|---|
| α | Apply middle option (recommended) | Accurate + readable + LOC-preserved |
| β | Apply most-terse option | Lowest character count; loses cite-anchor |
| γ | Apply most-detailed option | Maximum accuracy; +120 chars on line |
| δ | Defer to W332 (wait for codex round-1 + operator decision) | Risk-averse |

**Default-recommendation**: α (middle option), gated on codex round-1 verify.
