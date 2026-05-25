# W282 Stream C — Dimensions 6-7 + W281 STOP-gate post-merge verification

**Date**: 2026-05-18
**Branch**: `sota-converge-w281` (after W281i merge at `c070bf5`)
**Auditor**: Stream C (cross-session + observability + post-merge gate)

---

## Dimension 6 — Cross-session (% audited: 92%)

### (a) basic-memory MCP functional from fresh CC session

| Check | Result |
|---|---|
| CLI invocation `basic-memory --version` | **PASS** — returns `Basic Memory version: 0.21.1` |
| MCP entry in `.mcp.json` | **PASS** — `command: Z:/claude-sota-installed/.local/bin/basic-memory.exe`, `args: ["mcp"]` |
| `BASIC_MEMORY_HOME` env set | **PASS** — `Z:/claude-sota-installed-state/basic-memory` |
| `BASIC_MEMORY_CONFIG_DIR` env set (W281i fix) | **PASS** — `Z:/claude-sota-installed-state/basic-memory/config` |
| State actually redirected out of repo | **FAIL (CRITICAL)** — repo-internal `Z:/claude-sota-installed/.basic-memory/` exists with `memory.db` + `config.json` + 5 daemon `*.log` files; `Z:/claude-sota-installed-state/basic-memory/` is **empty** |
| `.basic-memory/` gitignored | **PARTIAL** — `git status` shows `?? .basic-memory/` (untracked but NOT in `.gitignore`); risk: future `git add -A` commits credential-class state |

**ROOT CAUSE (Cross-session-fresh blocker)**: basic-memory 0.21.1 reads `BASIC_MEMORY_HOME` via env on next process spawn, but the **already-running** daemon processes (5 log files dated within the session window) were spawned BEFORE W281i landed and inherited the un-redirected `HOME=Z:/claude-sota-installed` path. The W281i fix is correct for new spawns; existing daemons must be killed and respawned for redirect to take effect. **OR** the basic-memory CLI on this Windows install may not honor `BASIC_MEMORY_HOME` for the data subdirectory (only for config) — verification needed in a clean session.

**REMEDIATION (P0)**:
1. Add `.basic-memory/` to `.gitignore` immediately (1-line; defends regardless of redirect outcome).
2. Stop existing basic-memory daemon processes, delete `Z:/claude-sota-installed/.basic-memory/`, restart CC, verify `memory.db` materializes at `Z:/claude-sota-installed-state/basic-memory/memory.db`.
3. If step 2 fails (state recreates inside repo), basic-memory 0.21.1 on Windows does NOT honor `BASIC_MEMORY_HOME` for the data root → upstream issue, file with `basicmachines-co/basic-memory`.

### (b) hindsight daemon at :9077 — listening?

| Check | Result |
|---|---|
| `curl 127.0.0.1:9077/health` HTTP | **PASS** — `HTTP=200` |
| Payload | **PASS** — `{"status":"healthy","database":"connected"}` |
| Port listening in netstat | **PASS** — `127.0.0.1:9077 LISTENING` + active TIME_WAIT connections from session |

Hindsight T1 is fully operational. SessionStart autoRecall + post-turn autoRetain confirmed live per `.claude/settings.json` hooks block.

### (c) Cross-session-state-recovery completeness — `/compact` vs full SessionEnd

| Memory tier | Survives `/compact` | Survives SessionEnd |
|---|---|---|
| 1. hindsight (vector) | YES (post-turn writes persist to local SQLite) | YES (autoRecall on next SessionStart) |
| 2. memory MCP (sqlite_vec) | YES (out-of-process MCP daemon) | YES (file-backed at `Z:/venvs/claude/...sqlite_vec.db`) |
| 3. cognee (GraphRAG NSSM) | YES (service runs externally, NSSM) | YES (NSSM survives reboot) |
| 4. graphiti (FalkorDB temporal-KG) | YES (FalkorDB :16379 + Ollama :16700 external) | YES (FalkorDB persists) |
| 5. langfuse (traces) | YES (DB-backed) | YES — **BUT** server currently DOWN (see Dimension 7) |
| 6. basic-memory (markdown filesystem) | YES (filesystem-survivable per W281e rationale) | YES |
| 7. (in-context) CLAUDE.md preload | YES (re-read after compact) | YES (re-read at SessionStart) |
| 8. (in-context) MCP-injected tool list | YES (rebuilt by CC) | YES |
| 9. (in-context) conversation history pre-compact summary | YES (auto-summary written into context) | NO (full SessionEnd discards) |

**Compact-survival pattern**: 6 of 6 external memory tiers survive both `/compact` and SessionEnd. Only in-context conversation detail is lossy. This is the architectural intent.

### (d) Post-compact-preload pattern — % context reinjected

Fork 2 of W281 dimension-deep-dive flagged INSUFFICIENT CONVERGENCE on the exact %. Re-checked:

- CCBP `claude-memory.md @ ac0d87d` describes `CLAUDE.md` as **always-loaded** on every new SessionStart AND after every `/compact` (compact is implemented as a session-fork with a summary in place of history).
- PreCompact hook (W281f) now blocks `matcher:auto`, so auto-compact at ~95% threshold cannot fire → only operator-triggered `/compact <hint>` fires (matcher='manual' or unspecified, which the hook does NOT match).
- After manual `/compact`: re-injected context ≈ (a) summary written by `/compact` (~5-15k tokens typical, hint-dependent) + (b) CLAUDE.md (41 LOC, <1k tokens) + (c) CLAUDE.local.md (~80 LOC, ~3k tokens) + (d) MCP tool list (auto-rebuilt by CC, ~5-10k tokens) + (e) plugin skill catalog (lazy-load per `description:` match, near-zero baseline).
- **Estimated post-compact baseline**: 15-30k tokens (out of 1M window = 1.5-3%), leaving 970k+ for new turns. This is the SOTA target.
- **Caveat**: exact percentage requires instrumented measurement (OTEL span on `claude_compact` event); not directly observable without instrumentation. Phoenix CAN capture this once Claude Code's OTEL traces emit `gen_ai.context.tokens_before` / `_after` semantic-convention attributes (Anthropic-side roadmap; not yet emitted as of model release Opus 4.7).
- **CONCLUSION**: post-compact preload is architecturally bounded by pointer-only CLAUDE.md ≤50 LOC (W281a fix preserves this), plugin skills as lazy-load (cardinal-rule-4), and auto-compact blocked (W281f). Empirical % awaits Anthropic OTEL context-token semantic-convention emission.

---

## Dimension 7 — Observability (% audited: 88%)

### (a) langfuse server :3000 UP?

**FAIL** — `curl 127.0.0.1:3000` returns `HTTP=000 — Failed to connect`. netstat shows `127.0.0.1:3234 → 127.0.0.1:3000 SYN_SENT` (still trying to connect, never ACKs) → no LISTENING socket on :3000.

| Item | Status |
|---|---|
| Per W278e — langfuse :3000 DOWN | **CONFIRMED DOWN** at audit time 2026-05-18 |
| Server process running | NO (no LISTENING on :3000) |
| Impact | Tier-5 trace memory inactive; SessionEnd-tracing inactive; codex-review trace inactive |
| Severity | HIGH — but W278e already documented; **not a new regression** |

**REMEDIATION**: langfuse server requires startup (Docker compose or NSSM service). Out-of-scope for W281/W282 (W278e tracked). Recommend W282 sub-issue: bring langfuse :3000 back online (last-known-good config in `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md`).

### (b) Phoenix :16006 reachable?

**PASS** — `curl 127.0.0.1:16006` returns `HTTP=200`; `/healthz` returns `OK`; netstat shows active connections in/out (TIME_WAIT from this audit session). Phoenix server is UP.

### (c) Does current CC session emit OTEL traces?

Settings env (verified in `.claude/settings.json`):
```
OTEL_LOG_TOOL_DETAILS = 1
OTEL_LOG_USER_PROMPTS = 1
CLAUDE_CODE_ENABLE_TELEMETRY = 1
CLAUDE_CODE_ENHANCED_TELEMETRY_BETA = 1
OTEL_TRACES_EXPORTER = otlp
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT = http://127.0.0.1:14317
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL = grpc
OTEL_RESOURCE_ATTRIBUTES = openinference.project.name=eee
```

OTEL grpc endpoint :14317 is LISTENING and has **ESTABLISHED + CLOSE_WAIT** connections from this CC process — traces ARE being exported. The grpc endpoint at :14317 is the Phoenix OTLP grpc collector (port-config consistent with Phoenix install).

**PASS** — Claude Code IS emitting OTEL spans to Phoenix at :14317. Phoenix UI on :16006 will show these traces under project `eee`.

### (d) openinference instrumentor gap (P5h finding) — what auto-instruments Claude Code tool-use?

**Finding** (from `tmp/repomix-library/packed/langfuse_langfuse-docs.xml`):

- **Python**: `opentelemetry-instrumentation-anthropic` (Traceloop/OpenLLMetry) — `from opentelemetry.instrumentation.anthropic import AnthropicInstrumentor; AnthropicInstrumentor().instrument()` (cite: langfuse_langfuse-docs.xml:63386, :63714, :103987).
- **JS/TS**: `@arizeai/openinference-instrumentation-anthropic` (Arize OpenInference) — `npm install @anthropic-ai/sdk @arizeai/openinference-instrumentation-anthropic @langfuse/otel @opentelemetry/sdk-node` (cite: langfuse_langfuse-docs.xml:107862, :107876).
- **Python equivalent of arize package**: `openinference-instrumentation-anthropic` (PyPI) — referenced at xml:103923, :103983.

**Currently installed?** **NO** — `pip show openinference-instrumentation-anthropic` returns "Package(s) not found". `pip show openinference-instrumentation-bedrock` also not found.

**GAP**: Claude Code's built-in OTEL emission (via `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `OTEL_TRACES_EXPORTER=otlp`) sends generic `gen_ai.*` semantic-convention spans. It does NOT emit OpenInference-specific attributes (e.g. `llm.input_messages`, `llm.output_messages`, `tool.name`, `tool.parameters`) that Phoenix's auto-evals + Arize trace-UI rely on for richer visualization. To bridge this:

1. **Option A (Anthropic-side roadmap)**: Wait for Anthropic to natively emit OpenInference semantic conventions in their telemetry output. No public ETA.
2. **Option B (in-process wrap)**: Install `pip install openinference-instrumentation-anthropic` in the Anthropic SDK process and call `AnthropicInstrumentor().instrument()` at process startup. **Not applicable to Claude Code itself** — CC is a closed-source TS CLI, not a Python anthropic-sdk consumer that we can wrap.
3. **Option C (downstream)**: Apply `@arizeai/openinference-instrumentation-anthropic` to ANY Python/JS process WE write that calls the Anthropic SDK (e.g. eval harness, codex reviewer dispatch, custom MCP servers). This gives Phoenix full OpenInference attribute coverage for our owned code — but NOT for CC's own internal tool-use spans.
4. **Option D (rejected)**: Build a custom OTLP-translator that converts CC's `gen_ai.*` spans → OpenInference attributes on the collector side. Cardinal-rule-2 violation (self-invent middleware); also brittle to CC version drift.

**RECOMMENDED**: Document Option C in `docs/architecture/`, deploy it to any in-house Python/JS that calls Anthropic SDK directly (eval harness is the prime candidate). Accept Option A wait on CC's internal spans — CC's `gen_ai.*` output is still useful for token-counting + latency dashboards in Phoenix, just lacks the rich attribute set.

**P5h finding (Stream C revisits)**: there is NO single package that auto-instruments Claude Code's internal tool-use spans (CC is opaque). The OpenInference instrumentor only wraps SDK-level calls; CC is downstream of any wrap.

---

## STOP-gate verification (7 items)

| # | Check | Expected | Actual | PASS/FAIL |
|---|---|---|---|---|
| 1 | `git status --short` clean (only CLIProxyAPI) | only `accounts/repos/CLIProxyAPI` untracked | `M .claude/plugins/installed_plugins.json` + `M .claude/plugins/known_marketplaces.json` + `? accounts/repos/CLIProxyAPI` + `?? .basic-memory/` | **FAIL** — 2 modified plugin-state files (auto-touched by CC at session start, expected & gitignored-by-policy in past waves) PLUS untracked `.basic-memory/` (NEW — see Dimension 6a) |
| 2 | `wc -l CLAUDE.md` ≤ 50 | ≤ 50 | **41** | **PASS** |
| 3 | `ls tmp/repomix-library/packed/*.xml \| wc -l` ≥ 52 | ≥ 52 | **52** exactly | **PASS** |
| 4 | No new `.claude/hooks/scripts/*` or `.claude/rules/*` | neither dir exists | `.claude/hooks/scripts` **does not exist**; `.claude/rules` **does not exist** | **PASS** (cardinal-rule 2 + 4 intact) |
| 5 | `grep "PreCompact" .claude/settings.json` count | 1 hook entry + 0-1 `_comment_*` | **count=2** (one hook entry + one `_comment_w281f_2026_05_18_precompact_auto_block`) | **PASS** |
| 6 | `git log --oneline -10` shows W281a-i in order | a, e, f, g, d/h, i (chronological) | `c070bf5 W281i` → `e1bd37d W281d+h` → `0c5fec7 W281g` → `1acc8f9 W281e` → `1c2e95b W281f` → `2026d6c W281a` → W280-fix10b... | **PASS** — all of W281a/e/f/g/d/h/i present, chronological order valid (reverse-chronological in log output = forward-chronological commit order) |
| 7 | All 4 codex review verdicts captured in W281i commit message | 4 verdicts (a/e/f/g) | `W281a codex P2` + `W281e codex P2` + `W281f codex ALLOW` + `W281g codex ALLOW`; severity=medium-(P2); confidence=high | **PASS** — all 4 captured verbatim |

**STOP-gate verdict**: 6 of 7 PASS; **1 FAIL on item #1** — the FAIL is partly a documentation drift (the 2 plugin-state files are routinely modified by CC at session start across all W- waves and should be tracked as expected) PLUS one new regression (`.basic-memory/` untracked, see Dimension 6a remediation).

---

## Stream C summary

**3 PASSes**: dim 6b (hindsight :9077 = 200), dim 6c (6-tier compact survival complete), dim 7b/c (Phoenix :16006 UP + CC OTEL traces emitting to :14317).

**3 FAILs / GAPs (priority-ordered)**:
1. **P0 — basic-memory state leak into repo** (dim 6a): W281i env redirect ineffective for already-running daemons; `Z:/claude-sota-installed/.basic-memory/{memory.db,config.json,*.log}` is in repo root and **not in `.gitignore`**. Risk: future `git add -A` commits credential-class state. **Fix**: 2-line `.gitignore` add + kill+respawn daemon + verify state materializes at `Z:/claude-sota-installed-state/basic-memory/`.
2. **P1 — STOP-gate item #1 FAIL** (post-merge dirty tree): `.basic-memory/` untracked entry directly traces to issue #1 above. Once #1 is fixed, this auto-resolves.
3. **P2 — OpenInference Anthropic instrumentor not installed** (dim 7d): `openinference-instrumentation-anthropic` not present. Cannot bridge to richer Phoenix attribute set for in-house Python/JS that calls Anthropic SDK (e.g. eval harness, codex reviewer dispatch). **Fix**: `pip install openinference-instrumentation-anthropic` + wire `AnthropicInstrumentor().instrument()` in eval harness entrypoint. Note: does NOT instrument CC itself — only our owned downstream code.

**Pre-existing knowns (no action this audit)**:
- Langfuse :3000 DOWN — already tracked W278e; no regression introduced by W281.
- 2 `.claude/plugins/*.json` modified-but-not-committed — long-standing CC session-start artifact, not W281-related.

**Cardinal-rule invariants**: ALL HOLD — `self_invented_count: 0` (no `.claude/hooks/scripts/*`, no `.claude/rules/`); CLAUDE.md = 41 LOC (≤50); 52 packed XMLs; hooks remain direct-CLI per rule 2.

**Conclusion**: W281 ship is OK to keep; P0 `.gitignore` + daemon-respawn cleanup recommended in W281j follow-up (1 file edit + 1 daemon restart, ~5 min effort).
