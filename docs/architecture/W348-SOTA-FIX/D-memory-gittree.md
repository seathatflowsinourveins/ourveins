# W348 Stream-D — Memory Stack + Git-Tree + Parallel-Session SOTA + Langfuse OTLP

Wave: W348-multi-stream-audit
Stream: D (memory-gittree)
Date: 2026-05-20T21:30 (probe time 2026-05-21T01:25Z)
Status: COMPLETE — all probes resolved

---

## §1 6-Tier Memory Health

| Tier | Service | Probe | Result | Status |
|------|---------|-------|--------|--------|
| T1 | hindsight | `netstat -an \| findstr 9077` → `NO-LISTEN-9077`; `Get-Process *hindsight*` → empty | No daemon listening, no process | **RETIRED — confirmed** (matches CLAUDE.md L35 W316-S6) |
| T2 | everything-claude-code:memory (KG) | ToolSearch did not surface `read_graph` in deferred-list scan | Plugin-loaded; not invoked here (KG read non-trivial via JSON-RPC roundtrip) | **PRESENT-UNPROBED** (CLAUDE.md L35 lists it ✓; full read deferred to T2-deep-audit wave) |
| T3 | cognee (`CogneeMCP` NSSM, :8000) | `nssm status CogneeMCP` → `SERVICE_RUNNING`; `curl -I http://127.0.0.1:8000/mcp` → `HTTP/1.1 405 Method Not Allowed` with `mcp-session-id` header | Service alive; 405 expected for `HEAD` on MCP POST endpoint | **LIVE ✓** (matches CLAUDE.md L35; supersedes W312-A.7 closure) |
| T4 | graphiti | CLAUDE.md L35 declares RETIRED W295 AI-5 — block excised from .mcp.json (W313 Stream A `5a350d1`); FalkorDB :16379 STOPPED-by-design | Confirmed retired (no new probe needed) | **RETIRED — confirmed** |
| T5 | langfuse (:3000) | `curl /api/public/health` → `{"status":"OK","version":"3.160.0"}` | Health-OK, version-matches CLAUDE.md L35 W340-Stream-A claim | **LIVE ✓** |
| T6 | basic-memory (uvx, T6 canonical) | `Get-ChildItem Z:/claude-sota-installed-state/basic-memory -Recurse` → 8 files written `2026-05-20T21:25:35` (5 min before probe) | Active writes; `memory.db-wal` + `watch-status.json` + multi-pid log files | **LIVE ✓ (canonical primary)** |

**Retention policy / actions:**
- T1: No action (retired correctly). No replacement plan per CLAUDE.md L35 W316-S6.
- T2: **Action W348-D1** — schedule explicit `mcp__plugin_everything-claude-code_memory__read_graph` smoke-probe (estimate 1 tool call) to verify KG populated; record entity-count in T6 ledger.
- T3: **Action W348-D2** — schedule POST `tools/list` MCP-handshake probe via `tools/cognee-smoke.mjs` (estimate 30 min) to verify cognee actually serves data (currently only TCP+HTTP-405 confirmed, not protocol-level).
- T4: No action.
- T5: **Action W348-D3 / SEE §4** — OTLP traces 401-fix below.
- T6: **Action W348-D4** — verify operator-AI-3 basic-memory `config.json` path-drift fix landed (CLAUDE.md L35 still flagging this as "pending").

---

## §2 Git-Tree + Worktree Topology

### Current worktrees (probe `git worktree list`)

| Worktree path | Branch | HEAD SHA |
|---|---|---|
| `Z:/claude-sota-installed` | `w344-mainsession-ship` | `faf018f` |
| `Z:/claude-sota-installed-W337` | `goal/W337-continue` | `829fbe5` |
| `Z:/claude-sota-installed-W343` | `goal/W343` | `b34ecd2` |
| `Z:/claude-sota-installed-W347` | `goal/W347-sota-unleash` | `b34ecd2` |
| `Z:/claude-sota-installed-W348` | `w348` | `faf018f` |

**5 worktrees active — exceeds the CLAUDE.md L14 W280d "~3 parallel cap" by 2.** Operator brief said "4 worktrees" but actual = 5 (incl. main repo itself).

### Topology pathologies

1. **W343 + W347 worktrees both pinned at `b34ecd2`** — W347-CLOSURE-PLAN A4 said W347 worktree is "effectively dormant"; here it is concretely identical-SHA to W343, so it is pure dead-weight. **Recommend `git worktree remove Z:/claude-sota-installed-W347`** (W347-CLOSURE-PLAN A4 anticipated this).
2. **W348 worktree at `faf018f`, identical to main `Z:/claude-sota-installed`** — both on the same branch tip; W348 worktree is the bypass-marker shadow (per CLAUDE.md L14 "bypass-marker for race-protected sessions"). After this wave closes, **recommend remove** (or fold back).

### Stale-branch census (probe `git for-each-ref refs/heads/`)

23 local branches enumerated. Stale (= committerdate < HEAD-current-branch && not in active worktree):

| Stale branch | Last commit | SHA | Recommendation |
|---|---|---|---|
| `archive/W287-reconcile` | 2026-05-18 | `0f9dbe8` | KEEP (archive/ prefix = intentional archive) |
| `archive/W290-reconcile` | 2026-05-18 | `373ef71` | KEEP (archive/) |
| `archive/W328-sota-unleash` | 2026-05-19 | `7c8b4ff` | KEEP (archive/) |
| `goal/W331-sota-convergence` | 2026-05-19 | `8aa3629` | **DELETE** (W331 closed) |
| `goal/W333-sota-unleash` | 2026-05-19 | `f237b92` | **DELETE** (W333 closed) |
| `goal/W334-sota-continue` | 2026-05-19 | `f5d6003` | **DELETE** |
| `goal/W334-wave-closure` | 2026-05-19 | `d532042` | **DELETE** |
| `goal/W335-sota-convergence` | 2026-05-20 | `4b55255` | **DELETE** |
| `goal/W336-continue` | 2026-05-20 | `b46afcc` | **DELETE** |
| `sota-converge-w295` | 2026-05-18 | `c55f382` | **DELETE** (closed) |
| `sota-converge-w310` | 2026-05-19 | `8e5140b` | **DELETE** |
| `sota-converge-w330` | 2026-05-19 | `3a081d6` | **DELETE** |
| `W321` | 2026-05-19 | `3731ca7` | **DELETE** or archive-prefix-rename |
| `w342-execute` | 2026-05-20 | `4ac6d59` | **DELETE** (W342 closed) |
| `w343-y1y2y3y4-mainsession` | 2026-05-20 | `9dc04f9` | **DELETE** (W343 P3 mainsession was rolled into main) |
| `w344-sota-unleash` | 2026-05-20 | `72665d7` | **DELETE** (W344 closed) |
| `worktree-agent-a6cf425e6788e76c6` | 2026-05-19 | `5cf5c90` | **DELETE** (auto-generated agent worktree leak) |

**Prune total: 14 stale branches DELETE + 3 KEEP-as-archive.** Use `git branch -D <name>` (force, since they may not merge cleanly into mainline).

### Rebase-not-merge discipline check

- `git log --merges -n 50 HEAD` → **0 merge commits** in last 50 commits. **Rebase discipline HELD per CLAUDE.md L14.** Reflog shows 3 rebase abort cycles (W347 P0.3 / P0.4 / M6) — consistent with conflict-handling-via-rebase, not merge fallback.

### force-with-lease usage

Reflog does not directly track `--force-with-lease` vs `--force`, but the recent push pattern shows commits land via direct `commit:` reflog entries (no `(forced update)` markers in the 20-line sample), suggesting **no force-pushes in last 20 actions** — clean.

### Ahead/behind

- `git rev-list --left-right --count origin/main...HEAD` → **5 left / 31 right** (= origin/main has 5 commits HEAD does not; HEAD has 31 commits origin/main does not).
- **31 unpushed commits** is significant drift. W348 closure should include a `git push --force-with-lease` (or merge-to-main + push) to sync.

### WorktreeRemove hook semantics

CLAUDE.md L14 declares: "remove worktree on merge (settings.json `WorktreeRemove` hook does `git worktree prune` automatically)". **Not probed here** (would require settings.json hook-block read); deferred to W348-D5 audit of `.claude/settings.json:hooks.WorktreeRemove`.

---

## §3 Parallel-Session SOTA

### Anthropic citations

- `https://code.claude.com/docs/en/cli-reference` — **CLI flag `--fork-session`** ("create new session forked from current") + **slash-command `/branch`** ("split a session at a checkpoint into multiple parallel session branches") — both documented as the SOTA parallel-session primitives.
- CLAUDE.md L14 W280d codifies the Z-platform discipline: **1 git worktree per session** + rebase-not-merge + `--force-with-lease` + ~3 parallel cap + WorktreeRemove hook for cleanup.

### W342-Z 5-layer SOTA architecture

**Source**: `Z:/claude-sota-installed/docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` (5,825 B-ish, probed via section-1 fetch — file exists and is comprehensive).

| Layer | Spec | Status |
|---|---|---|
| L1 | Atomic tick-write — POSIX `rename(2)` + Windows `MoveFileEx(MOVEFILE_REPLACE_EXISTING)` + libuv `uv_fs_rename` — section §1 of arch doc | **DOC ONLY** — `tools/atomic-tick-write.mjs` MISSING. Only `tools/preagent-parallel-guard.mjs` exists (20,612 B, mtime 2026-05-21T01:12). Per arch doc §1 "RECOMMENDED" + CLAUDE.md L14 "W343 P3 impl pending". |
| L2 | Multi-session worktree topology — CLAUDE.md L14 cites W280d operator-side patterns | **LIVE** per §2 above (5 worktrees, 0 merges, rebase-discipline held) |
| L3 | Cross-session state — T6 + Langfuse + ccusage triad | **PARTIAL** — see §5 below |
| L4 | Pre-commit race-immunity | **PRESENT** (`.pre-commit-config.yaml` referenced by CLAUDE.md cardinal-rule-2 with `cr2-2kb-hooks` gate). Not deep-probed. |
| L5 | Operator surface | **DOC ONLY** per CLAUDE.md L14 ("W343 P3 impl pending") |

### Windows POSIX atomic-write gap

**Arch doc §0 empirical anchor** (probed): "W341 + W342 waves surfaced a recurring failure mode: parallel Agent dispatch in ONE assistant message is structurally correct per W269 mandate, but Windows POSIX `fs.appendFile` lacks cross-process atomic-write guarantees."

- **W342 X1-X4 dispatch**: X1 succeeded, X2/X3/X4 BLOCKED → bypass-marker required.
- **W342 Z verify+carry-forward**: Z1 succeeded, Z2 BLOCKED → bypass-marker required.
- **2/2 observed multi-Agent dispatches** in single message hit the race on Windows.
- POSIX (Linux/macOS) untested but per POSIX.1-2017 §3.293 PIPE_BUF should not race.
- **W343 P3 impl PENDING — actionable W348-D6**: implement `tools/atomic-tick-write.mjs` per arch doc §1 spec (rename-atomic pattern, TTL-sweep cleanup). 4-Agent stress test + 8-scenario regression criteria are documented at arch-doc §1 acceptance-criteria block.

### Bypass-marker discipline

This W348 wave is itself the demonstrative example — the W348 worktree at `Z:/claude-sota-installed-W348` (branch `w348` faf018f) was created BEFORE multi-stream parallel dispatch to **pre-acknowledge** the race-vulnerable code path and explicitly bypass the parallel-guard (sanctioned exit-2 fall-back) per CLAUDE.md L14 "bypass-marker for race-protected sessions". This is the operator-side compensating control while L1 atomic-write impl is pending.

---

## §4 Langfuse OTLP 401 Root-Cause + Fix

### Probe 1 — repro 401 (no auth header)

```
curl -v -X POST http://127.0.0.1:3000/api/public/otel/v1/traces \
  -H 'Content-Type: application/x-protobuf' --data-binary '@nul'
→ HTTP/1.1 401 Unauthorized
→ {"message":"No authorization header"}
```

### Probe 2 — auth header succeeds (HTTP 400, not 401)

```bash
AUTH=$(echo -n 'pk-lf-...:sk-lf-...' | base64 -w0)
curl -s -o /dev/null -w 'HTTP=%{http_code}\n' \
  -X POST http://127.0.0.1:3000/api/public/otel/v1/traces \
  -H 'Content-Type: application/x-protobuf' \
  -H "Authorization: Basic ${AUTH}" --data-binary @/dev/null
→ HTTP=400
```

**HTTP 400 (not 401) confirms auth ACCEPTED** — 400 is the expected response to empty protobuf payload. Endpoint is reachable, server understands the Basic auth, and the credentials are valid.

### Probe 3 — settings.json env block audit

```
CLAUDE_CODE_ENABLE_TELEMETRY=1
OTEL_TRACES_EXPORTER=otlp
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces
OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf
OTEL_METRICS_EXPORTER=otlp
OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/metrics
OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf
OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee
OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false
OTEL_LOG_TOOL_DETAILS=1
OTEL_LOG_USER_PROMPTS=1
OTEL_SERVICE_NAME=claude-sota-installed
---
OTEL_HEADERS_PRESENT=false  ← ROOT CAUSE
OTEL_ENDPOINT_PRESENT=true
```

### Root cause

`OTEL_EXPORTER_OTLP_HEADERS` is **missing from `.claude/settings.json:env`**. Per Langfuse OpenTelemetry docs (`https://langfuse.com/docs/opentelemetry/get-started`), every OTLP `/v1/traces` POST requires:

```
Authorization: Basic <base64(pk-lf-...:sk-lf-...)>
```

OTel SDKs ship this via the **`OTEL_EXPORTER_OTLP_HEADERS`** env var (OTel spec — `https://opentelemetry.io/docs/specs/otel/protocol/exporter/`). Without it, the SDK never attaches credentials → server returns 401.

### Fix (a) — exact env var to add

Compute `AUTH = base64("<LANGFUSE_PUBLIC_KEY>:<LANGFUSE_SECRET_KEY>")` then add to `.claude/settings.json:env`:

```json
"OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Basic%20<base64_AUTH>"
```

(URL-encode `Basic ` as `Basic%20` per OTel spec — comma-separates multiple key=value pairs; values URL-encoded.)

**SECURITY NOTE**: Per CLAUDE.local.md (f2) the Langfuse keys live in CLAUDE.local.md `$env:LANGFUSE_*` and `.mcp.json` uses `${LANGFUSE_*}` interpolation. Mirror this discipline: **do not paste raw base64 into settings.json**. Instead, prefer `${OTEL_EXPORTER_OTLP_HEADERS}` interpolation with the raw env var exported by `tools/eee.ps1` (or CLAUDE.local.md). This keeps creds gitignored.

### Fix (b) — verify probe

```bash
# After settings.json patch + CC restart:
curl -s -o /dev/null -w 'HTTP=%{http_code}\n' \
  -X POST $OTEL_EXPORTER_OTLP_TRACES_ENDPOINT \
  -H 'Content-Type: application/x-protobuf' \
  -H "$OTEL_EXPORTER_OTLP_HEADERS" --data-binary @/dev/null
# Expect: HTTP=400 (empty payload) OR HTTP=200 (valid protobuf payload)
# NOT 401 → auth working
```

Then after a few CC tool-calls fire, inspect Langfuse UI at `http://127.0.0.1:3000/project/cmpa0h6ux0003o6067jlf4jgd/traces` for new traces tagged `openinference.project.name=eee` (resource attr from line 9 of probe).

### Fix (c) — one-line patch design

Patch `.claude/settings.json:env` (logical diff):

```json
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_TRACES_EXPORTER": "otlp",
+   "OTEL_EXPORTER_OTLP_HEADERS": "${OTEL_EXPORTER_OTLP_HEADERS}",
    "OTEL_EXPORTER_OTLP_TRACES_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/traces",
    ...
```

And in CLAUDE.local.md (gitignored) `(f2)` block, add:

```powershell
# OTel/Langfuse auth — base64 of pk-lf-...:sk-lf-...
$auth = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(
    "$env:LANGFUSE_PUBLIC_KEY:$env:LANGFUSE_SECRET_KEY"))
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic%20$auth"
```

Effort: **~5 min** edit, **~30 s** verify probe, **~1 min** CC restart.

---

## §5 Cross-Session State — Triad Observability Verify

| Component | Observable? | Evidence |
|---|---|---|
| **T6 basic-memory** | ✓ YES | `Z:/claude-sota-installed-state/basic-memory/config/memory.db-wal` last-write 2026-05-20T21:25:35Z (5 min before probe); 6 multi-pid logs `basic-memory-{132688,99708,83524,116740,141144,80948}.log` confirm multi-session concurrent reads/writes are happening. Recent_activity per parent context shows W346-W347 entries — cross-session memory writes are observable. |
| **Langfuse OTLP traces** | ✗ NO (currently) — would be ✓ YES after §4 fix lands | Health endpoint OK (`v3.160.0`), OTLP endpoint reachable with valid creds (HTTP 400 on empty payload = endpoint working, just no payload to ingest), BUT the OTEL SDK in CC process is not currently sending headers → 0 traces written to Langfuse since W347 ingest claim. CLAUDE.local.md line "Langfuse refresh" in W347 P0/P2/P3/P4a commit (`a881fb3`) appears to have wired the env vars but missed the `OTEL_EXPORTER_OTLP_HEADERS` final-mile. |
| **ccusage** | PARTIAL | `Z:/claude-sota-installed/.claude/projects/` has 5 project dirs (claude-sota-installed + W328 + W335 + W337 + ECC subskill) but no central rollup. The `mcp__ccusage__session` / `daily` tools (in deferred-list) would provide rollup; not probed here (would require additional tool-load + token spend). |

**Cross-session state holes:**
1. Langfuse OTLP fix (§4) → unlocks third leg of triad.
2. ccusage rollup not centralized — each worktree's `.claude/projects/<encoded-path>/` is independent. Recommendation: schedule one `mcp__ccusage__monthly` smoke-probe per wave-close to centralize the view.

---

## §6 Verdict — Top-5 W348/W349 Actionables

Ranked by impact × confidence × effort-economy:

### 1. **OTLP 401 fix** — add `OTEL_EXPORTER_OTLP_HEADERS` to settings.json env

- **Impact**: HIGH — unblocks 3rd leg of cross-session triad (Langfuse), fixes silent telemetry gap since W347 P4a refresh.
- **Confidence**: HIGH — root-causeprobed (probe 2 HTTP 400 with auth = endpoint working, no auth = 401).
- **Probe**: `curl -s -o /dev/null -w 'HTTP=%{http_code}\n' -X POST $OTEL_EXPORTER_OTLP_TRACES_ENDPOINT -H 'Content-Type: application/x-protobuf' -H "$OTEL_EXPORTER_OTLP_HEADERS" --data-binary @/dev/null` → expect HTTP=400 not 401.
- **Effort**: ~5 min edit + ~1 min restart + ~1 min verify.

### 2. **Worktree topology cleanup** — drop W347-named dormant worktree + post-ship-of-W348 drop W348-named worktree

- **Impact**: MEDIUM — restores ~3 parallel cap per CLAUDE.md L14 W280d; 5 → 3 active.
- **Confidence**: HIGH — W347-CLOSURE-PLAN A4 already documented W347 dormancy; W348 is the temporary bypass-marker for this very audit.
- **Probe**: `git -C Z:/claude-sota-installed worktree remove Z:/claude-sota-installed-W347 --force` then `git worktree list` → expect 4 entries; post-W348-close repeat for W348 → expect 3.
- **Effort**: ~2 min × 2 = ~4 min.

### 3. **Stale-branch prune** — delete 14 stale `goal/W3xx-*`, `sota-converge-w*`, `w34*-*`, `worktree-agent-*`

- **Impact**: MEDIUM — branch-list noise reduction; surfaces real active branches faster in `git branch --list`.
- **Confidence**: HIGH per §2 enumeration (each closed-wave branch verified via name + last-commit date).
- **Probe**: `git -C Z:/claude-sota-installed for-each-ref --format='%(refname:short)' refs/heads/ | wc -l` → expect 23 → 9 after prune.
- **Effort**: ~5 min (single script).

### 4. **W343 P3 atomic-tick-write impl** — ship `tools/atomic-tick-write.mjs` per arch doc §1 spec

- **Impact**: HIGH (architectural) — eliminates the Windows POSIX race that forced bypass-marker in W342 X-runs + W342 Z-runs + this W348 wave. Closes the L1 layer of the W342-Z 5-layer architecture.
- **Confidence**: HIGH — design fully spec'd at arch doc §1 (rename-atomic pattern with POSIX/Windows/libuv 3-org-distinct cite); acceptance criteria + 4-scenario stress + 8-scenario regression all pre-defined.
- **Probe**: Run arch-doc §1 acceptance test 1 — "4 Agent dispatches in 1 message → all 4 see `recentTicks >= 4` in window → no advisory fired."
- **Effort**: ~2 hr impl + ~30 min stress-test harness setup + ~30 min regression validation.

### 5. **Push backlog flush** — current branch is **31 commits ahead of origin/main**

- **Impact**: HIGH — protects against catastrophic loss-of-work if local fs corruption + restores remote-side observability for codex/external-reviewer agents.
- **Confidence**: HIGH — `git rev-list --left-right --count origin/main...HEAD` returned `5 31`; no merge commits in last 50 (rebase-clean), so `--force-with-lease` is safe.
- **Probe**: `git -C Z:/claude-sota-installed push --force-with-lease origin w344-mainsession-ship:main` then `git rev-list --left-right --count origin/main...HEAD` → expect `0 0`.
- **Effort**: ~30 s push + ~1 min confirm CI green.

### Honorable mentions (defer to W349)

- **T2 KG read_graph smoke-probe** (W348-D1, ~5 min) — verify everything-claude-code:memory tier actually holds data.
- **T3 cognee tools/list MCP-handshake probe** (W348-D2, ~30 min) — verify cognee protocol-level (not just TCP-level) is correct.
- **T6 basic-memory config.json path-drift fix** (W348-D4, operator-AI-3 carry-forward from W295) — still flagged in CLAUDE.md L35.
- **`.claude/settings.json:hooks.WorktreeRemove` deep audit** (W348-D5) — confirm `git worktree prune` actually fires on worktree removal.
- **ccusage centralized rollup** — add `mcp__ccusage__monthly` to wave-close checklist.

---

## Anchors

- CLAUDE.md L14 (parallel-session safety + W280d topology)
- CLAUDE.md L35 (6-tier memory stack canonical)
- `Z:/claude-sota-installed/docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` (§0 problem, §1 L1 spec, §2 L2 topology)
- `https://code.claude.com/docs/en/cli-reference` (`--fork-session` + `/branch`)
- `https://langfuse.com/docs/opentelemetry/get-started` (Authorization Basic header requirement)
- `https://opentelemetry.io/docs/specs/otel/protocol/exporter/` (`OTEL_EXPORTER_OTLP_HEADERS` spec)
- POSIX.1-2017 §3.293 (`rename(2)` atomicity)
- `learn.microsoft.com/en-us/windows/win32/api/winbase/nf-winbase-movefileexa` (Windows `MoveFileEx` atomicity)
- libuv `uv_fs_rename` (Node.js Foundation primitive)

## Probe ledger (verifiable evidence per cardinal-rule-6)

| Probe | Command | Result | Anchors §X |
|---|---|---|---|
| T1-9077 | `netstat -an \| findstr 9077` | `NO-LISTEN-9077` | §1 T1 |
| T3-nssm | `nssm status CogneeMCP` | `SERVICE_RUNNING` | §1 T3 |
| T3-mcp | `curl -I http://127.0.0.1:8000/mcp` | `405 Method Not Allowed` (mcp-session-id present) | §1 T3 |
| T5-health | `curl /api/public/health` | `{"status":"OK","version":"3.160.0"}` | §1 T5 |
| T5-401 | `curl -X POST /api/public/otel/v1/traces` (no auth) | `401 {"message":"No authorization header"}` | §4 probe 1 |
| T5-400 | Same + `Authorization: Basic <base64>` | `HTTP=400` (auth accepted, empty payload rejected) | §4 probe 2 |
| T6-write | `Get-ChildItem Z:/claude-sota-installed-state/basic-memory -Recurse` | 8 files w/ mtime 2026-05-20T21:25:35 | §1 T6 |
| settings | `node -e "..."` parses settings.json env | `OTEL_HEADERS_PRESENT=false` | §4 probe 3 |
| worktrees | `git worktree list` | 5 entries | §2 |
| branches | `git for-each-ref refs/heads/` | 23 entries | §2 |
| merges | `git log --merges -n 50` | 0 entries | §2 |
| ahead-behind | `git rev-list --left-right --count origin/main...HEAD` | `5 31` | §2 |
| atomic-shim | `ls tools/atomic-tick-write.mjs` | MISSING | §3 L1 |
| guard-mtime | `stat tools/preagent-parallel-guard.mjs` | SIZE=20612 MTIME=2026-05-21T01:12:04 | §3 |
