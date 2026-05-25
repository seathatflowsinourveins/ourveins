# W316-D — Langfuse + Hindsight service-health status

**Wave**: W316
**Stream**: D
**Date**: 2026-05-19

## Langfuse :3000 — STATUS: UP (HEALTHY)

```
$ curl -s -o nul -w "%{http_code}\n" http://127.0.0.1:3000/api/public/health
200
```

Docker stack `langfuse-web` (container `ed5844c554f1` image `langfuse/langfuse:3.170.0`) is **Up 8 minutes (healthy)** at session check time, along with the supporting containers `langfuse-worker`, `langfuse-postgres`, `langfuse-redis`, `langfuse-minio`, `langfuse-clickhouse` — all `Up ... (healthy)`.

W315-r2 Stream E reported Langfuse "crashed 12:29:09Z today MethodNotAllowedError Next.js stack" as a SEV-2 finding; that incident appears to have been resolved between W315 ship and W316 Stream D probe (Docker restarted the stack and it stabilized — health-check returning 200 means the runtime is serving requests again).

**No action required.** Status archive entry `T5 langfuse ✓ LIVE v3.170.0` in CLAUDE.md L35 remains accurate.

## Hindsight :9077 — STATUS: DOWN (no listener)

```
$ curl -s -o nul -w "%{http_code}\n" http://127.0.0.1:9077/health
000
$ curl -s -o nul -w "%{http_code}\n" http://127.0.0.1:9077/
000
$ netstat -ano | grep ":9077"
TCP    127.0.0.1:14932        127.0.0.1:9077         SYN_SENT        88068
```

No process is listening on :9077. The `hindsight-embed.exe` process is **running** (PID 100920) but is not bound to 9077 in a serving state — it appears to be the embedding-only worker, not the API daemon that normally hosts the recall HTTP endpoint.

Hindsight plugin (`hindsight-memory@hindsight` v0.6.5) is installed and its hooks fire on SessionStart / UserPromptSubmit / Stop / SessionEnd, but the daemon (`lib/daemon.py:get_api_url(..., allow_daemon_start=True)`) does not appear to be starting the API server in this runtime — likely the deploy step (`C:/Users/42/hindsight/deploy.sh`) was never run on this machine, and the daemon's `_get_embed_command()` resolves to a binary or docker stack that isn't present.

### Restart-vs-retire decision

Per CLAUDE.md L35 Run-time state:

> **Memory live (6-tier, W295-audit 2026-05-18)**: T1 hindsight ✓ (W280b local fallback :9077) · ... · **T6 `basic-memory` ✓ canonical**

T1 hindsight is documented as "local fallback :9077" — the active primary is T6 basic-memory. W295 audit established basic-memory as canonical for verdict-ledger storage, the high-traffic memory tier. T1 hindsight serves UserPromptSubmit `recall.py` hook ad-hoc augmentation only, which times out gracefully on hook-failure.

**Decision: RETIRE-IF-NOT-FIXED-BY-W317** (graceful degradation already in place).

Rationale:
1. Hindsight's role per W280b is "local fallback" for T1 — the primary memory tier is T6 basic-memory.
2. The `recall.py` hook has a 10-second timeout (per `hooks.json:UserPromptSubmit.timeout: 12`); a daemon-down state silently degrades to no-op recall augmentation. There is no functional impact on session correctness.
3. The hindsight Docker stack (`C:/Users/42/hindsight/docker-compose.yml`) appears to be a separate deployment from this runtime — restoring it requires an operator-driven `bash ~/hindsight/deploy.sh --restart` invocation that depends on WSL2 + Docker + the operator's WSL config.
4. Per W314-r2 service-health audit, hindsight :9077 was ✓ healthy on 2026-05-19 — the drop between then and now is recent and intentional-or-incidental cannot be determined non-interactively.

### Operator-AI W316-D-HINDSIGHT-DECIDE

Operator should decide between:

**Option A (RESTART)**: `cd ~/hindsight && bash deploy.sh --restart` (WSL2 / Docker), then re-verify `curl http://127.0.0.1:9077/health` returns 200. Restores T1 local fallback to W280b spec.

**Option B (RETIRE)**: Remove the hindsight plugin (`/plugin remove hindsight-memory@hindsight`) and excise the L35 T1 reference from CLAUDE.md. T6 basic-memory remains canonical; the W315-r2 Stream E "Hindsight :9077 no listener" finding becomes CLOSED-INTENTIONAL.

W316 Stream D defers the choice to the operator with this evidence package. Both paths are CR-compliant (plugin-managed install/remove + CCBP-documented `claude plugin` semantics).

## Manifest update applied

`docs/sota-installed-manifest.md` service-health section updated to reflect:

- Langfuse :3000 = ✓ (last verified W316-D)
- Hindsight :9077 = ✗ DOWN (operator-decision-pending — Option A restart OR Option B retire)
