# ⚠️ DO NOT FILE AS-IS — REVISE (W288 Stream G-A re-audit, 2026-05-18)

The original draft below frames a documentation defect as a code/leak bug.
**Re-audit evidence rejects the code-fix**:

- `daemon_embed_manager.py:39` (off-by-one from draft's `:38`) source comment: `# 0 = disabled (no auto-exit)` — **INTENTIONAL design**
- `daemon.py:26` comment: "hindsight-embed passes its own timeout" — layered intent
- `daemon.py:58-60` middleware makes `idle_timeout <= 0` a first-class early-return path
- 4+ versioned docs (`hindsight-docs/docs/sdks/embed.md` v0.4 / v0.5 / v0.6) all say `(0 = never) | 0`
- Test fixtures use `IDLE_TIMEOUT=0` as normal config
- Integration TS uses `daemonIdleTimeout ?? 0`
- `hindsight-api --help` interpolates `(default: 0)`
- DeepWiki MCP independent Q&A confirms intentional design — README is stale

The proposed source diff (`0 → 300`) below **must NOT be filed** — it would silently break long-lived deployments that 4+ versioned doc surfaces have told users are correct. Pivot to a small docs-only PR aligning `hindsight-embed/README.md:13` + `:160` and `hindsight_embed/cli.py:21` to source-truth.

Re-audit deliverable: `STREAM-G-A-bug-a-reaudit.md` (this folder).

---

# [bug] hindsight-embed: `--idle-timeout` default is `0` (never idle out), but README documents `300`s

## Summary

The hindsight-embed daemon ships with `DEFAULT_DAEMON_IDLE_TIMEOUT = 0` in source (which means "never auto-exit" per the daemon middleware semantics), while the public README documents the default as `300` seconds. This silent mismatch causes long-lived embed daemons to accumulate worker threads indefinitely on workstations that follow the README's stated behavior.

## Affected versions

- HEAD `9784f657` (release v0.7.7, 2026-05-16)
- Earlier v0.6.x releases (idle_timeout=0 default has been in place since v0.6.0).

## Source locations (current HEAD `9784f657`)

| File | Line | Code |
|---|---|---|
| `hindsight-embed/hindsight_embed/daemon_embed_manager.py` | 38 | `DEFAULT_DAEMON_IDLE_TIMEOUT = 0  # 0 = disabled (no auto-exit)` |
| `hindsight-embed/README.md` | 160 | `\| HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT \| Seconds before daemon auto-exits when idle \| 300 \|` |
| `hindsight-api-slim/hindsight_api/daemon.py` | 58-59 | `# If idle_timeout is 0, don't auto-exit\nif self.idle_timeout <= 0: return` |
| `hindsight-api-slim/hindsight_api/daemon.py` | 26 | `DEFAULT_IDLE_TIMEOUT = 0  # 0 = no auto-exit (hindsight-embed passes its own timeout)` |

`daemon_embed_manager.py:379` reads the env var and `:388-389` injects `--idle-timeout <N>` into the daemon child's argv; with the default value, the child receives `--idle-timeout 0` and the IdleTimeoutMiddleware at `daemon.py:57-66` short-circuits and never schedules a shutdown.

## Repro

1. Start the embed daemon with the default env (no `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT` set):
   ```
   hindsight-embed memory recall default "smoke"
   ```
2. Inspect the spawned daemon's argv:
   ```
   # Linux/macOS
   ps -ef | grep hindsight_api.daemon
   # Windows PowerShell
   Get-CimInstance Win32_Process -Filter "Name='python.exe'" | ? { $_.CommandLine -like '*hindsight_api.daemon*' } | Select CommandLine
   ```
   The argv includes `--idle-timeout 0`.
3. Send a single recall request, then leave the daemon idle for `>5` minutes.
4. Daemon is still running and accumulating worker threads on each recall burst (per `EmbedManager` + asyncpg pool churn) instead of exiting at the 5-minute mark.

## Expected vs Actual

**Expected (per README:160):** daemon exits after 300 seconds idle, so worker threads + connection pools are released.

**Actual (per source `:38`):** daemon runs until external SIGTERM/SIGINT; long-running deployments see thread-count drift, GC retention of model handles, and `EmbedManager` pool leak.

## W288 empirical evidence (2026-05-18)

On a Windows 11 workstation running the `claude-code` integration profile, the embed daemon (PID 91236, started 2026-05-18 ~05:30 UTC) was observed at:

- **Threads: 469** (steady-state baseline pre-burst ~24)
- **CPU-seconds consumed: 21,011 sec** over 2.2 hours wall time
- **--idle-timeout 0** confirmed in the argv via `Get-CimInstance Win32_Process`

Restarting the daemon dropped the thread count to ~24 immediately. Setting `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=900` in the profile `.env` and restarting reproduces the README-documented behavior (daemon exits after 15 min idle, threads released).

## Proposed fix

Change the source default so it matches the documented README value. The argument-passing chain already supports a non-zero value end-to-end; only the constant needs to change.

```diff
--- a/hindsight-embed/hindsight_embed/daemon_embed_manager.py
+++ b/hindsight-embed/hindsight_embed/daemon_embed_manager.py
@@ -36,7 +36,7 @@
 # unpacks and runs initdb on first boot, which takes noticeably longer on cold
 # runners than POSIX.
 DAEMON_STARTUP_TIMEOUT = int(os.getenv("HINDSIGHT_EMBED_DAEMON_STARTUP_TIMEOUT", "180"))
-DEFAULT_DAEMON_IDLE_TIMEOUT = 0  # 0 = disabled (no auto-exit)
+DEFAULT_DAEMON_IDLE_TIMEOUT = 300  # match README; set to 0 explicitly to disable auto-exit
```

Optional secondary fix at `hindsight-api-slim/hindsight_api/daemon.py:26` — keep `DEFAULT_IDLE_TIMEOUT = 0` there because the comment explicitly says "hindsight-embed passes its own timeout"; the embed-side default is the right place to enforce the README contract.

## Workaround (until fixed)

Add to your shell profile or the per-profile `.env` written by `hindsight-embed configure`:

```bash
export HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=900   # 15 minutes
```

The env var is read at `daemon_embed_manager.py:379` and propagated to the daemon argv at `:388-389`, so this works correctly today.

## Notes for maintainers

- The README claim has been stable since at least v0.5.0; changing the default to `300` aligns code with the documented contract rather than the other way around.
- Profile aliases at `profile_manager.py:430` correctly map `idle_timeout` <-> `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT`, so no profile-schema migration is needed.
- A regression test would set the env var unset and assert the child's argv contains `--idle-timeout 300`.
