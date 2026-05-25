# W329 Stream D §1 — P0-AI-1 Phoenix Metrics+Logs Receivers (paste-ready script)

**Wave**: W329 Stream D · **Date**: 2026-05-19
**HEAD**: `5cf5c90`
**Charter §1**: Phoenix metrics+logs receivers Docker-env enable (~3 min operator action)
**Owner**: `docs/architecture/W329-OPERATOR-TRIO-SCRIPTS/*` + `tools/w328-trio-1-phoenix-receivers.ps1` (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

A paste-ready PowerShell script `tools/w328-trio-1-phoenix-receivers.ps1` has been authored. The operator runs it (one-line invocation). It locates the Phoenix docker-compose file, backs it up, patches in the 2 env vars (`PHOENIX_ENABLE_METRICS_RECEIVER=true` + `PHOENIX_ENABLE_LOGS_RECEIVER=true`), rolling-restarts the container, and probes the receivers — printing a single SUCCESS / NEEDS-OPERATOR / AMBIGUOUS / ROLLBACK verdict.

---

## §2 — Phoenix pre-state (re-verified 2026-05-19 ~17:20Z)

| Probe | Value | Status |
|---|---|---|
| `docker ps` filter `phoenix` | `Up 8 hours (healthy)` | ✓ container running |
| Image | `arizephoenix/phoenix:version-13.15.0` | ✓ CR-9 pinned |
| Compose project (label) | `observability` | ✓ |
| Compose file (label) | `Z:\claude\observability\docker-compose.yml` (stale path) | ⚠ actual file at `Z:\claude-hub\observability\docker-compose.yml` |
| `POST http://127.0.0.1:16006/v1/traces` | **200** | ✓ traces receiver ON |
| `POST http://127.0.0.1:16006/v1/metrics` | **405** | ⚠ metrics receiver OFF |
| `POST http://127.0.0.1:16006/v1/logs` | **405** | ⚠ logs receiver OFF |
| Container env (live) | `PHOENIX_GRPC_PORT=4317`, `PHOENIX_WORKING_DIR=/data` | (no receiver flags set) |

The compose-file path-drift (label says `claude/observability`, actual is `claude-hub/observability`) is auto-handled — the script auto-detects both candidate paths.

---

## §3 — What the script does

`tools/w328-trio-1-phoenix-receivers.ps1` performs these steps in order:

1. **Pre-flight**: probe `docker ps` for `phoenix` container running; probe current `/v1/traces`, `/v1/metrics`, `/v1/logs` status.
2. **Idempotent short-circuit**: if `/v1/metrics` AND `/v1/logs` already return 200 → exit 0 with `[OK already-applied]`.
3. **Locate compose file**: try the 2 candidate paths (`Z:\claude-hub\observability\docker-compose.yml`, `Z:\claude\observability\docker-compose.yml`); if neither exists → exit 1 with operator-hint.
4. **Already-patched-but-stale guard**: if compose file already has `PHOENIX_ENABLE_*_RECEIVER=true` but live endpoints still 405 → just `docker compose up -d phoenix` (no re-edit).
5. **Backup**: `cp compose-file compose-file.w329-d-bak.YYYYMMDD-HHMMSS` (timestamped, never overwrites).
6. **Patch**: scan YAML for `  phoenix:` service header; within its block locate `- PHOENIX_GRPC_PORT=...`; insert 2 new env entries immediately after, matching the existing indent.
7. **Rolling restart**: `docker compose -f <file> up -d phoenix`. If exit != 0 → restore backup → exit 3 (ROLLBACK).
8. **Wait + re-probe** (default 15s): re-test `/v1/metrics` + `/v1/logs`. Both 200 → exit 0 SUCCESS; one 200 → exit 2 AMBIGUOUS; both 405 → exit 2 AMBIGUOUS with diagnostic hints.

---

## §4 — Operator invocation (paste-ready)

```powershell
# (a) Dry-run first to inspect the proposed edit without touching anything
. Z:\claude-sota-installed\tools\w328-trio-1-phoenix-receivers.ps1 -DryRun

# (b) Real run: edit compose, rolling-restart, smoke-test (default 15s wait)
. Z:\claude-sota-installed\tools\w328-trio-1-phoenix-receivers.ps1

# (c) Slow-start variant if healthcheck needs more time
. Z:\claude-sota-installed\tools\w328-trio-1-phoenix-receivers.ps1 -WaitSeconds 30
```

Expected output on SUCCESS (exit 0):

```
=== w328-trio-1-phoenix-receivers.ps1 (W329 Stream D) ===
[OK] Phoenix container running: phoenix|Up 8 hours (healthy)|arizephoenix/phoenix:version-13.15.0
[probe] pre-state: traces=200 metrics=405 logs=405
[OK] Compose file located: Z:\claude-hub\observability\docker-compose.yml
[1/4] Backing up compose file -> ...w329-d-bak.20260519-172500
[2/4] Injecting PHOENIX_ENABLE_METRICS_RECEIVER + PHOENIX_ENABLE_LOGS_RECEIVER...
[OK] Compose file patched.
[3/4] Rolling restart: docker compose -f '...docker-compose.yml' up -d phoenix
  | [+] Running 1/1
  | ✔ Container phoenix Started
[4/4] Waiting 15s for healthcheck + receivers to bind...
[probe] post-state: traces=200 metrics=200 logs=200
[SUCCESS] Phoenix metrics + logs receivers ENABLED.
[NEXT]    Proceed to P0-AI-2: tools/w328-trio-2-settings-validate.ps1
```

---

## §5 — Rollback path

If the script exits 3 (ROLLBACK) it has already restored the backup. If the script exits 2 (AMBIGUOUS) and you want to manually revert:

```powershell
# Find the most recent backup
$bak = Get-ChildItem 'Z:\claude-hub\observability\docker-compose.yml.w329-d-bak.*' `
     | Sort-Object LastWriteTime -Descending | Select-Object -First 1

# Restore
Copy-Item $bak.FullName 'Z:\claude-hub\observability\docker-compose.yml' -Force
docker compose -f 'Z:\claude-hub\observability\docker-compose.yml' up -d phoenix
```

Backups are timestamped so multiple safe-reruns leave a trail.

---

## §6 — Exit-code map

| Code | Status | Meaning | Operator action |
|---|---|---|---|
| 0 | SUCCESS | Both receivers 200; trio-1 done | Proceed to trio-2 |
| 0 | already-applied | Idempotent no-op; both endpoints already 200 | Proceed to trio-2 |
| 1 | NEEDS-OPERATOR | Container down, or compose file unfindable | Start container / `-ComposeFileCandidates` override |
| 2 | AMBIGUOUS | Edit applied but endpoints not both 200 | Inspect `docker logs phoenix`; possibly receiver env-var name drift |
| 3 | ROLLBACK | Compose up failed; backup restored | Inspect docker error output |

---

## §7 — Why this paste-ready form (vs. manual operator edit)

Per W328-B-2 §5, the operator could also recreate the container by hand with `docker stop && docker rm && docker run -d ...`. That works, but:

- **Loses the Compose-managed state**: the container's `com.docker.compose.*` labels are part of the project graph; a bare `docker run` orphans it.
- **Risks volume confusion**: `observability_phoenix_data` is the Compose-named volume. A bare `docker run -v observability_phoenix_data:/data` works but reads/writes intermixed with the Compose project may produce subtle drift.
- **No backup discipline**: the script's `.w329-d-bak.*` trail makes mistakes recoverable.

The paste-ready script is the SOTA fix: it preserves Compose semantics + provides a reversible audit-trail.

---

## §8 — Cardinal-rule conformance

| Rule | Status | Notes |
|---|---|---|
| R1 trusted primitives | ✓ HOLD | Phoenix env-var per official Arize docs |
| R2 direct-CLI hooks only | ✓ HOLD | Script is in `tools/`, NOT under `.claude/hooks/**`; invoked manually |
| R3 upstream subagents | n/a | Not an agent change |
| R4 CLAUDE.md + settings.json | ✓ HOLD | Script does NOT modify settings.json or CLAUDE.local.md |
| R5 sandbox/permissions | ✓ HOLD | Script does NOT touch defaultMode / sandbox / bypassPermissions |
| `self_invented_count` | 0 (operator-curated tools/) | Tools dir is operator-curated per CLAUDE.md L42 |

---

## §9 — References

- W328-B-2 Phoenix probe (source of facts): `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/W328-B-2-PHOENIX-PROBE.md`
- Phoenix env-var docs: `https://docs.arize.com/phoenix/references/configuration`
- Phoenix Docker hub: `https://hub.docker.com/r/arizephoenix/phoenix`
- OTLP HTTP spec: `https://opentelemetry.io/docs/specs/otlp/#http-binary-protobuf-encoding`
- Docker Compose env-array form: `https://docs.docker.com/compose/compose-file/05-services/`
- Live probes this session (2026-05-19): `traces=200 metrics=405 logs=405` (receivers off)
- Compose file (actual): `Z:/claude-hub/observability/docker-compose.yml` (phoenix service lines 301-322)
- Backup naming: `<file>.w329-d-bak.YYYYMMDD-HHMMSS`
