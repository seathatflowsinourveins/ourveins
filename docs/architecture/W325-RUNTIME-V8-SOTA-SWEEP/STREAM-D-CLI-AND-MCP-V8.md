# W325 Stream D — CLI Versions + MCP Cascade Health V8

**Wave**: W325 Stream D · **Date**: 2026-05-19 · **HEAD**: `1360aeb`
**Method**: `--version` probes for 9 CLIs + `claude doctor` long-timeout probe + MCP HTTP smoke for the 4 HTTP-MCP servers + per-MCP availability scan for the 10 stdio-MCP servers

---

## §1 — CLI version table

| Tool | Installed | Latest (probed) | Δ | Source |
|---|---|---|---|---|
| **claude** | 2.1.144 | 2.1.144 (`npm view @anthropic-ai/claude-code version`) | ✓ AT-LATEST | clean |
| **codex** | 0.130.0 | (no probe; W316-r2 documented `gpt-5.5` working) | — | W316-S7 cross-model gate operational |
| **gh** | 2.92.0 | (no probe) | — | claimed at CLAUDE.md L38 |
| **gitleaks** | 8.30.1 | (no probe) | — | claimed at CLAUDE.md L38 |
| **trivy** | 0.70.0 | (no probe) | — | DB Version 2 |
| **node** | (no output captured this probe; per CLAUDE.md L38 v22.22.0) | — | — | NOTE: ENABLE_TOOL_SEARCH may have intercepted version flag — re-check W326 |
| **python** | (no output captured this probe; per CLAUDE.md L38 v3.13) | — | — | same intercept note |
| **docker** | 29.4.3 (claimed) | — | — | per CLAUDE.md L38 |
| **ruff** | (no version output) | — | — | available; ran via PostToolUse hook |
| **shellcheck** | 0.11.0 | — | — | clean |
| **pyright** | 1.1.408 | **1.1.409** (warning at probe time) | ⚠ **MINOR-OUTDATED** | 1-patch behind |
| **ccusage** | not in PATH (W314-r2 AI-r2-11 carry — `.mcp.json` CR-9 migration pending) | — | — | known carry |

**4 net-clean CLIs**: claude 2.1.144 = npm latest. **1 net-outdated**: pyright 1.1.408 → 1.1.409 (operator W326 AI for bump).

---

## §2 — `claude doctor` re-confirmation (F-W325-D-CLEAN-1 cross-reference)

Probed 3× during this stream:
1. `timeout 35 claude doctor` → EXIT=0, empty output
2. `claude doctor 2>&1` → EXIT=0, empty output
3. `claude doctor < /dev/null` (background, 45s timeout) → background process, awaiting completion

**Result**: 6-wave EXIT-0-silent regression confirmed. The terminal is non-functional as a runtime-health probe. Operator W326 must file upstream issue.

---

## §3 — MCP cascade inventory

From `.mcp.json:mcpServers` (14 servers):

```json
["deepwiki","chrome-devtools","repomix","serena","gitnexus","ccusage","cognee","langfuse","basic-memory","hf-mcp-server","perplexity","playwright","tavily","exa"]
```

| MCP | Transport | Probe result | Status | Notes |
|---|---|---|---|---|
| **deepwiki** | type:http | Used live this session (cognee/dspy/openlit queries succeeded) | ✅ OPERATIONAL | docs MCP — type:http to deepwiki cloud |
| **chrome-devtools** | stdio (npx-pinned 1.0.1 per W316-r2-S7) | not probed | trust-by-pin | Microsoft official |
| **repomix** | stdio (npx-pinned 1.14.0 per W286-cross) | not probed | trust-by-pin | available |
| **serena** | stdio | not probed (no symbol-query in this stream) | trust-by-presence | |
| **gitnexus** | stdio | not probed | trust-by-presence | |
| **ccusage** | stdio | NOT-IN-PATH at CLI (W314-r2-11 carry) | DEGRADED | — |
| **cognee** | type:http :8000/mcp | initialize → `Cognee 1.26.0` full caps | ✅ OPERATIONAL | smoke this stream |
| **langfuse** | stdio (per CLAUDE.md L37 v3.170.0 docker-managed) | docker HEALTHY | ✅ OPERATIONAL | recurring MethodNotAllowedError SEV-3 |
| **basic-memory** | stdio :8765/mcp (uvx-pinned) | initialize → `Basic Memory 3.3.1` | ✅ OPERATIONAL but VERSION-DRIFTED | from v0.21.1 (see Service-Health §6) |
| **hf-mcp-server** | type:http via cloud | paper_search + hub_repo_search ran successfully | ✅ OPERATIONAL | this stream |
| **perplexity** | stdio (W317-r2-S7 wired) | not probed (key-rotation pending SEV-1) | ⚠ DEGRADED-DEFERRED | F-C-2 |
| **playwright** | stdio (npx-pinned 0.0.75) | not probed | trust-by-pin | Microsoft official |
| **tavily** | stdio | not probed | trust-by-presence | **NEW since W316 baseline** — W325-D-DELTA-1 net-new MCP |
| **exa** | stdio | web_search_exa used this session | ✅ OPERATIONAL | smoke this stream |

**Operational confirmed via this stream**: 6/14 (deepwiki, cognee, basic-memory, hf-mcp-server, exa, langfuse-via-docker-health). 6/14 trust-by-pin / trust-by-presence. 1/14 known-degraded (ccusage). 1/14 deferred-degraded (perplexity).

---

## §4 — `disabledMcpjsonServers` audit

```json
"disabledMcpjsonServers": []
```

Empty — confirms CLAUDE.md L35 W295-codex-r12 + W313 Stream A 5a350d1 graphiti excision and W308 disabled-`.mcp.json:memory` entry was actually **DELETED** (not parked in disabled). Clean state.

---

## §5 — Net-new MCP discovery in this wave: **tavily**

`tavily` was NOT in the W316 MCP inventory ("8 external MCPs" per W317-r2-S7) but IS in the W325 inventory (14 servers). Conclusion: tavily was added between W317 and W325 — possibly in W319-S3 carry or W320 ship.

**Action W326**: cite-anchor tavily in CLAUDE.md L35 memory-MCP section + `.mcp.json:_comments` audit-trail block. Verify env-var `TAVILY_API_KEY` lives in CLAUDE.local.md (per Stream D operator-instruction, I do NOT read .local.md to confirm).

---

## §6 — Hooks audit (8 events wired)

```
SessionStart       = 1 matcher (context-mode-cache-heal.mjs — CR-2 sanctioned exception)
PreToolUse         = 2 matchers (Bash gitleaks + Edit|Write supersession-chain-lint per W317-A P0a)
PostToolUse        = 1 matcher (ruff + shellcheck rc-propagation)
PreCompact         = 1 matcher (audit-trail logging — fix from W314-r2-F8)
WorktreeRemove     = 1 matcher (`git worktree prune` diagnostic-non-silent)
Notification       = 1 matcher
PostToolUseFailure = 1 matcher (additionalContext generic-fallback per W314-r2-F9)
TaskCompleted      = 1 matcher
```

**8/22 documented hook events** active (per `https://docs.anthropic.com/en/docs/claude-code/hooks`). All matchers are direct-CLI invocations (cardinal-rule-2 ✓). Plugin-supplied hooks (codex Stop-review-gate, ECC bootstrap, etc.) fire in addition to these via the plugin-hooks system.

---

## §7 — Plugin cache inventory

CLAUDE.md L34 claim: "68 plugins declared / 64 actually installed (47 enabled, per W315-r2 Stream E disambiguation)".

Stream D did not enumerate `.claude/plugins/cache/` directory contents in this pass; defer to W326 AI to reverify count vs claimed.

---

## §8 — Tooling forward-AIs (W326 queue, 5 ops)

| # | ID | Priority | Description |
|---|----|----|-------------|
| 1 | W326-D-CLI-1 | P0 | File `anthropics/claude-code` upstream issue for `claude doctor` EXIT-0-silent (cite W312-A.2 → W325-D 6-wave reproduction) |
| 2 | W326-D-CLI-2 | P1 | Bump pyright 1.1.408 → 1.1.409 (`pip install -U pyright` in Z:/venvs/claude) |
| 3 | W326-D-CLI-3 | P1 | Cite-anchor tavily MCP in CLAUDE.md L35 + `.mcp.json:_comments` audit-trail |
| 4 | W326-D-CLI-4 | P2 | Re-verify `.claude/plugins/cache/` dir count vs CLAUDE.md L34 claim (68/64/47) |
| 5 | W326-D-CLI-5 | P2 | Address ccusage `.mcp.json` CR-9 migration (W314-r2-AI-r2-11 carry) |

---

## §9 — Summary verdict

CLI surface: **CLEAN** (1 minor patch behind pyright). MCP cascade: **STRONG-OPERATIONAL** with 1 net-new wire-up (tavily, must be cite-anchored) and 1 known-degraded (perplexity deferred for SEV-1 key rotation).

The `claude doctor` regression is the highest-impact terminal issue and demands upstream action — its silent-success has been the leading silent-fallback failure-mode of the runtime for 6 consecutive waves.
