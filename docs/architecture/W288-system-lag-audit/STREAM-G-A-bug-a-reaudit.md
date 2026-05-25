# W288 Stream G-A — Adversarial Re-Audit of "Bug A: --idle-timeout 0 hardcoded default"

> Author: Stream G-A (adversarial line-by-line re-audit, retraction discipline).
> Target draft: `docs/architecture/W288-system-lag-audit/UPSTREAM-ISSUE-A-idle-timeout.md`.
> Upstream HEAD audited: `vectorize-io/hindsight` @ `9784f6573a5bcba6ac6fd9dfb70929e5318857ce` (release v0.7.7, 2026-05-16).
> Audit date: 2026-05-18.

## TL;DR

**VERDICT: NUANCED — REFUTED-AS-CODE-BUG, CONFIRMED-AS-DOC-BUG.**

The source default `DEFAULT_DAEMON_IDLE_TIMEOUT = 0` is **intentional, documented design** (verified end-to-end in source comments, the canonical `hindsight-docs/` SDK reference, test fixtures, all integration shims, and DeepWiki's repo-wiki). The bug is **not in the code**; it is in two stale doc surfaces (`hindsight-embed/README.md:160` and `hindsight_embed/cli.py:21` docstring) that say "default 300" when the actual designed-and-shipped default is `0 = never auto-exit`. The current draft's "proposed fix" (change source `0 → 300`) would be a **breaking behavioral change**, not a bug-fix. The correct upstream issue to file is **docs alignment**, not a code default change.

## Sources audited

| Source | Form | Path / ref |
|---|---|---|
| Local clone | git tree | `Z:\repos\deps\hindsight\` @ HEAD `9784f6573a5bcba6ac6fd9dfb70929e5318857ce` |
| Repomix pack | xml | `C:\Users\42\AppData\Local\Temp\repomix\mcp-outputs\uXyqLH\repomix-output.xml` (outputId `ab31db3ff51c5ae1`, 14 files, 47,112 tokens, root: `hindsight-embed/`) |
| Files line-by-line read | py | `hindsight-embed/hindsight_embed/daemon_embed_manager.py` (full, 791 LOC) |
| Files line-by-line read | py | `hindsight-api-slim/hindsight_api/daemon.py` (full, 186 LOC) |
| Files line-by-line read | py | `hindsight-api-slim/hindsight_api/main.py` (idle-timeout grep + 3-line context) |
| Files line-by-line read | py | `hindsight-embed/hindsight_embed/cli.py` (header docstring lines 1-80) |
| Files line-by-line read | md | `hindsight-embed/README.md` (full, 294 LOC) |
| Cross-package grep | repo-wide | All references to `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT` (39 hits across `hindsight-all`, `hindsight-docs`, `hindsight-integrations`, `hindsight-embed`) |
| Test fixtures read | py | `hindsight-embed/tests/test_profile_daemon_config.py:28-92` |
| Git blame | `git log -L` | line 38 of `daemon_embed_manager.py`, line 26 of `daemon.py` (shallow clone, only `9784f657` available — single ref) |
| DeepWiki cross-check | MCP `ask_question` | `vectorize-io/hindsight` — question: "default value of --idle-timeout; intentional design or doc bug?" |

## Line-by-line evidence

### E1. The cited source default — `daemon_embed_manager.py:38`

```python
36 # unpacks and runs initdb on first boot, which takes noticeably longer on cold
37 # runners than POSIX.
38 DAEMON_STARTUP_TIMEOUT = int(os.getenv("HINDSIGHT_EMBED_DAEMON_STARTUP_TIMEOUT", "180"))
39 DEFAULT_DAEMON_IDLE_TIMEOUT = 0  # 0 = disabled (no auto-exit)
40
41
42 def _detach_popen_kwargs(log_handle: IO[bytes]) -> dict:
```

**Note**: the draft cites line `38`, but the actual literal `DEFAULT_DAEMON_IDLE_TIMEOUT = 0` is at line **39** in the current HEAD. Line 38 is `DAEMON_STARTUP_TIMEOUT = ...`. Off-by-one error in the draft (cosmetic but must be fixed if filed).

The trailing comment `# 0 = disabled (no auto-exit)` is an **explicit, in-source intent declaration** — the author wrote the constant `0` knowing what it means. This is not a typo or leftover.

### E2. The argv-injection chain — `daemon_embed_manager.py:371-392`

```python
368  # Set defaults if not provided
369  if "HINDSIGHT_API_LOG_LEVEL" not in env:
370      env["HINDSIGHT_API_LOG_LEVEL"] = "info"
371  if "HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT" not in env:
372      env["HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT"] = str(DEFAULT_DAEMON_IDLE_TIMEOUT)
373
374  # Tell the daemon child it was already launched in a detached session
375  # (via our Popen below) so daemonize() skips the redundant re-exec.
376  env["_HINDSIGHT_DAEMON_CHILD"] = "1"
377
378  # Get idle timeout from env
379  idle_timeout = int(env.get("HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT", str(DEFAULT_DAEMON_IDLE_TIMEOUT)))
...
385  # Build command
386  cmd = self._find_api_command() + [
387      "--daemon",
388      "--idle-timeout",
389      str(idle_timeout),
390      "--port",
391      str(port),
392  ]
```

End-to-end propagation confirmed: env var → int → `--idle-timeout <N>` argv → daemon child. The draft's repro chain is mechanically correct. The empirical "argv contains `--idle-timeout 0`" claim is reproducible from the source.

### E3. The middleware semantics — `hindsight_api/daemon.py:24-72`

```python
24 # Default daemon configuration
25 DEFAULT_DAEMON_PORT = 8888
26 DEFAULT_IDLE_TIMEOUT = 0  # 0 = no auto-exit (hindsight-embed passes its own timeout)
...
38 class IdleTimeoutMiddleware:
39     """ASGI middleware that tracks activity and exits after idle timeout."""
40
41     def __init__(self, app, idle_timeout: int = DEFAULT_IDLE_TIMEOUT):
42         self.app = app
43         self.idle_timeout = idle_timeout
44         self.last_activity = time.time()
45         self._checker_task = None
...
56     async def _check_idle(self):
57         """Background task that exits the process after idle timeout."""
58         # If idle_timeout is 0, don't auto-exit
59         if self.idle_timeout <= 0:
60             return
61
62         while True:
63             await asyncio.sleep(30)  # Check every 30 seconds
64             idle_time = time.time() - self.last_activity
65             if idle_time > self.idle_timeout:
66                 logger.info(f"Idle timeout reached ({self.idle_timeout}s), shutting down daemon")
```

`0` is a **first-class semantic value**: the comment at `:58` + early-return at `:59-60` make "no auto-exit" an explicit, intentional code path, not a degenerate edge case.

The comment at `:26` `# 0 = no auto-exit (hindsight-embed passes its own timeout)` reveals layered intent: api-slim defers to its caller; embed-side declares the caller-default; both deliberately chose `0`.

### E4. CLI arg parser — `hindsight_api/main.py:145-150, 232-236`

```python
145  parser.add_argument(
146      "--idle-timeout",
147      type=int,
148      default=DEFAULT_IDLE_TIMEOUT,
149      help=f"Idle timeout in seconds before auto-exit in daemon mode (default: {DEFAULT_IDLE_TIMEOUT})",
150  )
...
232  # Wrap with idle timeout middleware in daemon mode
233  idle_middleware = None
234  if is_daemon:
235      idle_middleware = IdleTimeoutMiddleware(app, idle_timeout=args.idle_timeout)
236      app = idle_middleware
```

The CLI `--help` even **prints the default**: `(default: 0)` — so anyone running `hindsight-api --help` sees the real default. The README and the embed cli.py docstring contradict the daemon's own self-documentation.

### E5. README — two contradictory surfaces

```
13   3. **Auto-shutdown**: Daemon automatically exits after 5 minutes of inactivity
...
160  | `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT` | Seconds before daemon auto-exits when idle | `300` |
```

`hindsight-embed/README.md` documents BOTH (a) a hard claim of 5-min auto-exit at `:13` and (b) a `300`s default at `:160`. Both are factually false against source.

### E6. cli.py module docstring — `hindsight_embed/cli.py:21`

```python
20      HINDSIGHT_EMBED_API_DATABASE_URL: Optional. Database URL for daemon (default: "pg0://hindsight-embed").
21      HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT: Optional. Seconds before daemon auto-exits when idle (default: 300).
22      HINDSIGHT_EMBED_API_VERSION: Optional. hindsight-api version to use (default: matches embed version).
```

Same `300` lie, in a second doc surface. So the doc bug is replicated in two places — strengthening the "stale docs not updated" reading.

## Contradicting evidence (against "this is a code bug")

### C1. **Canonical SDK reference says `0`**

`hindsight-docs/docs/sdks/embed.md:94` (the Docusaurus-managed docs site, the canonical user-facing reference):

```
| `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT` | Seconds before daemon auto-exits when idle (0 = never) | `0` |
```

…and identical text appears in `version-0.6/`, `version-0.5/`, `version-0.4/` snapshots. The official versioned documentation has documented `0 = never; default 0` **across at least 4 prior releases**. The README + cli.py drift is the outlier, not the source default.

### C2. **All non-claude-code integration shims default to `0`**

```
hindsight-all-npm/README.md:31:    HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT: "0",
hindsight-integrations/openclaw/src/backfill.ts:338:   daemonIdleTimeout ?? 0
hindsight-integrations/openclaw/src/index.ts:1698:    daemonIdleTimeout ?? 0
hindsight-integrations/openclaw/tests/integration.test.ts:199:  "0"
```

Integration code authored by upstream uses `0` as the explicit example value. If `0` were a leak bug, those integration examples would be propagating a known leak.

### C3. **Test fixtures normalize on `IDLE_TIMEOUT=0`**

`hindsight-embed/tests/test_profile_daemon_config.py:47, 86, 91` uses `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=0` as the **normal expected value** for a daemon profile config. Tests would fail if `0` were a bug.

### C4. **`hindsight-api-slim/hindsight_api/daemon.py:26` self-documents the layered intent**

```python
DEFAULT_IDLE_TIMEOUT = 0  # 0 = no auto-exit (hindsight-embed passes its own timeout)
```

The comment **explicitly says** "hindsight-embed passes its own timeout" — i.e. the design is: api-slim defers, embed-side decides. The embed-side decided `0`. This is a deliberate two-layer "no-auto-exit by default" choice.

### C5. **CLI `--help` matches source**

`main.py:149` interpolates `DEFAULT_IDLE_TIMEOUT` into the help string, so `hindsight-api --daemon --help` prints `(default: 0)`. The CLI self-help and the README diverge — the README is the wrong one (lying about its own program).

### C6. **DeepWiki repo-wiki concurs**

DeepWiki MCP ask_question (`vectorize-io/hindsight`, query: "What is the actual default value … is this intentional design or a documentation bug?") returned **verbatim**:

> "There is a **documentation bug** in the README. … The actual default value is **`0` (disabled/no auto-exit)**. … This appears to be **intentional design**. The daemon is designed to run indefinitely by default, allowing users to opt-in to auto-exit behavior … The newer documentation in `hindsight-docs/docs/sdks/embed.md` and `hindsight-docs/versioned_docs/version-0.6/sdks/embed.md` correctly document the default as `0`."

An independent semantic-search-based answer over the upstream repo confirms: **doc bug, not code bug, intentional design**.

### C7. **One integration DOES default to 300 — the claude-code integration shim**

`hindsight-integrations/claude-code/scripts/lib/daemon.py:164`:

```python
idle_timeout = config.get("daemonIdleTimeout", 300)
daemon_env["HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT"] = str(idle_timeout)
```

`hindsight-integrations/codex/scripts/lib/daemon.py:140, 250` — same pattern. So when launched via the **claude-code or codex integration script**, the daemon does get a 300s idle timeout by default. The W288 empirical observation of `--idle-timeout 0` therefore means **the local daemon was NOT started via the claude-code integration script** — it was started by direct `hindsight-embed` invocation or by the `hindsight-all.EmbeddedHindsight` Python class (which has no positional default for `idle_timeout`; caller must pass it). This rules out the most user-friendly path as the trigger for the local observation.

## Maintainer-intent signals

| Signal | Direction |
|---|---|
| In-source comment `# 0 = disabled (no auto-exit)` at `daemon_embed_manager.py:39` | Explicit intent: 0 chosen knowingly |
| In-source comment `# 0 = no auto-exit (hindsight-embed passes its own timeout)` at `daemon.py:26` | Layered-design intent: api-slim defers; caller decides |
| Middleware early-return `if self.idle_timeout <= 0: return` at `daemon.py:59-60` | First-class semantic: not a degenerate value, an opt-out branch |
| CLI `--help` reports `(default: 0)` via f-string interpolation | Self-documenting source-of-truth lives in source, not README |
| Canonical `hindsight-docs/` says `0 = never; default 0` across v0.4–v0.6 + HEAD | Long-stable doc; README is the late drift, not the docs site |
| Test fixtures use `IDLE_TIMEOUT=0` as the typical-case value | Tests bake in the 0-as-normal contract |
| Integration TypeScript code uses `daemonIdleTimeout ?? 0` | Pattern of "default 0, integrator overrides" repeated outside Python |
| DeepWiki wiki + Q&A independently says "intentional design; README is stale" | External semantic-search confirms intent |
| Git blame: HEAD is shallow (single commit `9784f657`); deeper history unavailable from this clone | Inconclusive for first-introduction date, but the comments + consistency across modules indicate a coordinated design choice rather than a leftover |

**Verdict on intent**: overwhelming evidence the `= 0` is **deliberate**. The README at `:13` and `:160`, plus the `cli.py:21` docstring, are **stale docs that never got updated** when the convention solidified into "caller-passes-its-own-timeout, default 0 = run-forever".

## Final verdict + recommended action

**Verdict: NUANCED.**

The current draft is **partially correct (doc mismatch is real and reproducible)** but **mis-frames the root cause** (it claims a code bug where there is a doc bug) and **proposes a fix that would be a breaking change** (changing the source default from `0 → 300` reverses an intentional design and silently kills long-lived daemons that 4+ versioned doc surfaces have told users are correct behavior).

### Recommended action — REVISE the draft (do not retract; do not file as-is)

Append the following retraction-and-revision note to the **TOP** of `UPSTREAM-ISSUE-A-idle-timeout.md` (preserves the audit trail without misleading future readers):

```markdown
> **W288 Stream G-A re-audit verdict (2026-05-18) — NUANCED. DO NOT FILE THIS DRAFT AS-IS.**
> Re-audit reference: `STREAM-G-A-bug-a-reaudit.md`.
>
> The `DEFAULT_DAEMON_IDLE_TIMEOUT = 0` constant is **intentional design**, not a leak bug.
> Verified against: source comments (3 sites), `hindsight-docs/` canonical SDK reference
> (says `default 0; 0 = never`), test fixtures (use `=0` as the typical config),
> integration code (TS uses `daemonIdleTimeout ?? 0`), and DeepWiki repo-wiki Q&A
> (independent confirmation: "intentional design; README is stale").
>
> The REAL upstream issue is a **documentation defect**:
>   - `hindsight-embed/README.md:13` claims "5-min auto-exit" — false at default.
>   - `hindsight-embed/README.md:160` claims `default: 300` — false at default.
>   - `hindsight-embed/hindsight_embed/cli.py:21` claims `default: 300` — false at default.
>
> All three should be aligned to the source default of `0` and the canonical
> `hindsight-docs/docs/sdks/embed.md:94` text: `"Seconds before daemon auto-exits
> when idle (0 = never)" | default 0`.
>
> The "Proposed fix" diff in this draft (change `0 → 300`) is a **breaking
> behavioral change**, not a bug-fix, and must NOT be filed. The correct file-able
> issue is a docs PR aligning README + cli.py to source + canonical docs.
>
> The "Workaround" section (set `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=900` per profile)
> is correct and stays — it's the legitimate user-side opt-in to auto-exit semantics.
>
> NOTE on the W288 empirical observation (469 threads, 21,011 CPU-sec): this is
> consistent with a long-lived `--idle-timeout 0` daemon doing real work. Whether
> that thread count is itself a separate bug (Bug C / Bug D thread-pool retention)
> is a SEPARATE investigation. The "leak" framing here conflated a doc bug with
> a possible resource-retention bug; they are independent.
```

### File-able issue (what to actually submit upstream)

If anything is filed against `vectorize-io/hindsight`, it should be **a 3-line docs PR** rather than a code-default change:

```diff
--- a/hindsight-embed/README.md
+++ b/hindsight-embed/README.md
@@ -10,7 +10,9 @@ This package provides a simple CLI for storing and recalling memories using Hind
 1. **First command**: Automatically starts a local daemon (first run downloads dependencies and loads ML models - can take 1-3 minutes)
 2. **Subsequent commands**: Near-instant responses (~1-2s) since daemon is already running
-3. **Auto-shutdown**: Daemon automatically exits after 5 minutes of inactivity
+3. **Auto-shutdown**: Disabled by default (daemon runs until you stop it). Set
+   `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=<seconds>` to opt in to idle-based
+   auto-exit; e.g. `=300` for 5-min behavior.
@@ -157,7 +159,7 @@ Run `hindsight-embed configure` for a guided setup that saves to `~/.hindsight/e
 | `HINDSIGHT_EMBED_API_TOKEN` | Authentication token for external API (sent as Bearer token) | None |
 | `HINDSIGHT_EMBED_API_DATABASE_URL` | Database URL for daemon | `pg0://hindsight-embed` |
-| `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT` | Seconds before daemon auto-exits when idle | `300` |
+| `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT` | Seconds before daemon auto-exits when idle (0 = never auto-exit) | `0` |
--- a/hindsight-embed/hindsight_embed/cli.py
+++ b/hindsight-embed/hindsight_embed/cli.py
@@ -18,7 +18,7 @@
     HINDSIGHT_EMBED_API_URL: Optional. Use external API server instead of starting local daemon.
     HINDSIGHT_EMBED_API_TOKEN: Optional. Authentication token for external API (sent as Bearer token).
     HINDSIGHT_EMBED_API_DATABASE_URL: Optional. Database URL for daemon (default: "pg0://hindsight-embed").
-    HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT: Optional. Seconds before daemon auto-exits when idle (default: 300).
+    HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT: Optional. Seconds before daemon auto-exits when idle (default: 0 = never auto-exit).
```

This is a **5-minute, no-controversy docs PR** that's likely to be accepted on first read — vs. a contentious source-default change that would face pushback from anyone whose long-running deployment depends on the documented-via-source-comments "0 = no auto-exit" contract.

### Local mitigation (unchanged, valid)

Since this runtime hits the long-lived-daemon code path by design, the **local mitigation in the existing draft is correct**: write `HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=900` (or any positive integer) into the hindsight profile `.env` (managed via `hindsight-embed configure --profile <name> --env HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=900`) so the next daemon spawn opts into auto-exit. Keep this section of the draft.

### Off-by-one nit (if/when filed)

If anything is filed referencing this constant: the draft cites line **38** of `daemon_embed_manager.py`; the actual literal is at line **39** at HEAD `9784f657` (line 38 is `DAEMON_STARTUP_TIMEOUT`). Fix before submission.
