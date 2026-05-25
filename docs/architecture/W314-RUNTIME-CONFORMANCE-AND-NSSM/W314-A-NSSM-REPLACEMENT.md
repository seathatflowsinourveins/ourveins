# W314 Stream A — NSSM SOTA Replacement Audit

**Operator directional cue**: *"nssm not sota"*
**Date**: 2026-05-19
**Scope**: Replace the current `CogneeMCP` Windows service (NSSM-wrapped) with the SOTA-best alternative under sca-v6.1.

---

## §1 Current state

| Probe | Value |
|---|---|
| Wrapper binary | `C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe` |
| NSSM upstream release | **2.24 — 2017-04-26** (the binary itself reports `NSSM 2.24-101-g897c7ad 64-bit 2017-04-26`) |
| Service name | `CogneeMCP` |
| Service status | `Running` (Status=Running, StartType=Automatic, StartName=LocalSystem) |
| Port | `127.0.0.1:8000/mcp` (HTTP transport per `.mcp.json` L46-49) |
| Cognee data-dir | `Z:/claude-sota-installed-state/.cognee` (15,071 B) + duplicate at `Z:/claude-sota-installed/.cognee` (15,071 B) — see W314-A-RUNTIME-AUDIT §4 F1 |
| Upstream cognee version | latest release `v1.1.0` per `https://api.github.com/repos/topoteretes/cognee/releases/latest` (id 323753223, fetched 2026-05-19) |

**Problem**: NSSM 2.24 is the **last release**. The latest commit on `nssm.cc/release/nssm-2.24-101-g897c7ad.zip` is 2017-04-26. **9 years stale**. Violates sca-v6.1 D7 (maintenance velocity), D24 (mcp_attack_surface_governance), and operator's "nssm not sota" cue.

---

## §2 Candidate scoring under sca-v6.1

Dimensions per sca-v6.1 (CLAUDE.md cite anchors W310-tail `ac65b5c`):
- **D3 harness_fit** — does it fit the CC + Windows + MCP runtime?
- **D7 maintenance velocity** — release cadence + commits-this-quarter
- **D14 reversibility** — how cleanly can it be removed?
- **D24 mcp_attack_surface_governance** — service-wrapper attack surface (CR-9 + cardinal-rule-2-2 alignment)

Scale per sca-v6.1: 0=worst, 5=best, hard-cap thresholds vary by dimension.

### Candidate (a) — **`winsw/winsw`** (Windows Service Wrapper)

| Dim | Score | Rationale |
|---|---|---|
| D3 | 4 | Drop-in NSSM replacement; XML-config-driven; explicit Windows service primitive; .NET 4.6.1+ on Windows or .NET 7 native binaries per upstream README |
| D7 | **3** | v2.12.0 is stable-latest; v3.0.0-alpha.11 is the bleeding-edge prerelease (2026-05; commits active per `Z:/claude-sota-installed/tmp/angle-verification-2026-05-19.md`); 14k★ org-owned MIT. Active but not high-velocity |
| D14 | 4 | Clean removal: `winsw uninstall && rm winsw.exe`; XML stays in worktree (reversible) |
| D24 | **2** | Still a service-wrapper binary on disk; not significantly smaller attack surface than NSSM; requires .NET runtime (additional surface); CR-9 pin-discipline applies (have to pin alpha.11 vs stable 2.12.0) |
| **Total / 20** | **13** | T2 — vendor-fork-class, not a clear win over NSSM-as-incumbent |

**Verdict**: **NO clear improvement** over NSSM. Trades a stable-but-stale 2017 binary for an active-but-XML-bound replacement. D24 floor remains identical (service-wrapper attack surface).

### Candidate (b) — **Native `sc.exe` + PowerShell Scheduled Task**

| Dim | Score | Rationale |
|---|---|---|
| D3 | 3 | Native Windows primitive; no third-party dep; uses Task Scheduler under the hood |
| D7 | **5** | Microsoft-maintained; ships with Windows; no upstream-cadence concern |
| D14 | 4 | Reversible: `Unregister-ScheduledTask -TaskName CogneeMCP -Confirm:$false` + `sc.exe delete CogneeMCP` |
| D24 | 3 | OS-builtin primitive (lower attack surface than third-party binary); but Task Scheduler has historically been an attack vector — requires careful ACL config |
| **Total / 20** | **15** | T1 — sound but ceremonial |

**Verdict**: Sound but **adds ceremony for no clear gain over (d)**. Still requires a service primitive that auto-restarts on reboot — for a single-operator local-first runtime, this is **over-engineering**.

### Candidate (c) — **Docker Desktop (cognee-recommended)**

| Dim | Score | Rationale |
|---|---|---|
| D3 | 4 | cognee README explicitly recommends Docker. `docker run -e TRANSPORT_MODE=http --env-file ./.env -p 8000:8000 --rm -it cognee/cognee-mcp:main`. Multi-stage build with `ghcr.io/astral-sh/uv` + `python:3.12-slim-bookworm` |
| D7 | **5** | Docker Desktop is Mainstream-Microsoft-supported; cognee-mcp:main image is upstream-shipped |
| D14 | 4 | Reversible: `docker stop cognee-mcp && docker rm cognee-mcp` |
| D24 | **1** | **HARD-CAP TRIGGER** under sca-v6.1 D24. Docker Desktop introduces Docker daemon attack surface (privileged service, larger pin-freshness concern), plus an additional supply-chain link (`cognee/cognee-mcp:main` floats per `main` tag). Floats `main` rather than a pinned version-tag = D6 today-release-auto-upgrade risk per W286-arc-P0C CR-9 contract |
| **Total / 20** | **14**, **but D24=1 hard-caps at T2-or-below per sca-v6.1** | T2 — disqualified by D24 floor for INSTALL tier |

**Verdict**: **DISQUALIFIED** by D24<2 hard-cap. Docker daemon adds runtime-privileged attack surface for a single-MCP use-case. Plus `:main` tag float violates CR-9 pin-discipline.

### Candidate (d) — **Direct uvx stdio MCP** (recommended)

| Dim | Score | Rationale |
|---|---|---|
| D3 | **5** | **Mirrors the existing `basic-memory` MCP wiring exactly** (`.mcp.json` L66-77: `"command": "uvx", "args": ["--from", "basic-memory==0.21.1", "basic-memory", "mcp"]`). Per the deepwiki-grounded answer: "stdio mode works with `uv run` directly". cognee-mcp ships a `python src/server.py` entrypoint, defaulting to stdio. Convertible to `uvx --from cognee==1.1.0 cognee-mcp --transport stdio` (or equivalent module-runner). Anthropic-canonical pattern (W286-arc-P0C ratification: "command/args contract is `npx -y` or `uvx --from` per CR-9 version-pin discipline") |
| D7 | **5** | uv/uvx is **Astral's flagship Python toolchain** (`https://github.com/astral-sh/uv`), extremely active; cognee 1.1.0 is stable on PyPI |
| D14 | **5** | Reversible: delete the cognee block from `.mcp.json`, **stop the NSSM service** (`Stop-Service CogneeMCP; sc.exe delete CogneeMCP`), uninstall NSSM (optional). CC will respawn cognee-mcp via uvx-stdio on next session start |
| D24 | **5** | **Lowest attack surface**: no Windows service, no Docker daemon, no .NET runtime. Stdio process is spawned per-CC-session, lives in CC's child process tree, dies with the parent. Inherits CC's existing process sandbox. **No always-on port :8000 exposed to localhost** — eliminates that listener entirely |
| **Total / 20** | **20** | **T1 — INSTALL** |

**Verdict**: **RECOMMENDED**. Triple wins: (1) eliminates NSSM (operator's "not SOTA" concern resolved), (2) mirrors the proven `basic-memory` wiring pattern already validated in this runtime, (3) closes the always-on `:8000` listener (D24 attack-surface reduction).

---

## §3 RECOMMENDATION

### **Adopt Candidate (d) — Direct uvx stdio MCP**

**Three-bullet rationale**:

1. **Pattern symmetry with proven incumbent**: `basic-memory` is already running under the **identical** `uvx --from <pkg>==<pinned-version> <pkg> mcp` pattern in `.mcp.json` L67-71. Smoke-gated through W295-codex-r16+. Cognee can ride the same pattern with zero novel risk.
2. **Highest sca-v6.1 score**: 20/20 across D3/D7/D14/D24. The other three candidates score 13/15/14 respectively. (c) Docker is **D24-hard-capped** out of INSTALL tier. (a) winsw is a lateral move with no clear gain. (b) sc.exe is over-engineering.
3. **D24 attack-surface reduction**: eliminates always-on listener `127.0.0.1:8000` + eliminates NSSM service-wrapper binary + eliminates the LocalSystem-running cognee process + eliminates the 2017-vintage `nssm.exe` from disk. Net: -1 long-running listener, -1 LocalSystem privileged process, -1 stale-binary surface item.

---

## §4 Operator paste-ready transition plan

### §4.1 Proposed `.mcp.json` cognee block edit

**Before** (current state, `.mcp.json` L46-49):

```json
    "cognee": {
      "type": "http",
      "url": "http://127.0.0.1:8000/mcp"
    },
```

**After** (proposed):

```json
    "cognee": {
      "type": "stdio",
      "command": "uvx",
      "args": ["--from", "cognee==1.1.0", "python", "-m", "cognee.api.mcp.server", "--transport", "stdio"],
      "env": {
        "COGNEE_DATA_DIR": "Z:/claude-sota-installed-state/.cognee",
        "LLM_API_KEY": "${LLM_API_KEY}",
        "LANGFUSE_HOST": "${LANGFUSE_HOST}",
        "LANGFUSE_PUBLIC_KEY": "${LANGFUSE_PUBLIC_KEY}",
        "LANGFUSE_SECRET_KEY": "${LANGFUSE_SECRET_KEY}"
      }
    },
```

**Cite anchor**: cognee-mcp README at `https://github.com/topoteretes/cognee/tree/main/cognee-mcp` confirms `python src/server.py` as stdio entrypoint (deepwiki-grounded). Exact `--from cognee` argument string must be verified against `pip show cognee` entrypoint metadata at apply-time — **operator MUST run a smoke probe before commit** (one of):

- Smoke probe A: `uvx --from cognee==1.1.0 python -m cognee.api.mcp.server --transport stdio --help` should print MCP CLI help, then exit cleanly.
- Smoke probe B: After `.mcp.json` edit, `claude mcp list` should show cognee as `LIVE stdio` (not `HTTP DOWN`).

If the module path `cognee.api.mcp.server` is incorrect (cognee may name it `cognee_mcp.server` or ship a `cognee-mcp` console-script), the entry needs minor adjustment — **easy to discover via the smoke probe**.

### §4.2 Service teardown PowerShell

```powershell
# 1. Stop and remove NSSM service
Stop-Service -Name CogneeMCP -Force -ErrorAction SilentlyContinue
sc.exe delete CogneeMCP
# 2. Verify removal
Get-Service CogneeMCP -ErrorAction SilentlyContinue   # should return $null
# 3. (OPTIONAL) Uninstall NSSM binary from WinGet
winget uninstall NSSM.NSSM   # remove the 2017 binary entirely
# 4. Verify cognee port is no longer listening
Test-NetConnection -ComputerName 127.0.0.1 -Port 8000 -InformationLevel Quiet   # should return False
# 5. Apply .mcp.json edit per §4.1, then restart CC session — cognee-mcp will spawn under stdio
# 6. Smoke: invoke any cognee MCP tool (e.g. mcp__cognee__recall) — should succeed
```

### §4.3 CLAUDE.md L35 paste-ready edit

**Before**:
```
T3 cognee ✓ ACTIVE (NSSM `:8000/mcp`; data-dir cite `C:/Users/42/.cognee` **VERIFIED MISSING on disk per W312-A §4 A.7** — operator-AI-W312-A-7: inspect NSSM `PathName` and refresh cite to actual data-dir)
```

**After**:
```
T3 cognee ✓ ACTIVE (uvx-stdio `cognee==1.1.0` per W286-arc-P0C CR-9 contract; data-dir `Z:/claude-sota-installed-state/.cognee`; **NSSM removed W314 — closes W312-A.7**)
```

### §4.4 Rollback plan

If uvx-stdio cognee fails to bootstrap (e.g. cognee module path differs from anticipated):

```powershell
# Restore HTTP/NSSM mode
# 1. Revert .mcp.json cognee block (git revert OR manual)
# 2. Reinstall NSSM service (winget install NSSM.NSSM if uninstalled)
# 3. Re-create the service:
nssm install CogneeMCP "Z:\venvs\claude\Scripts\python.exe" "-m" "cognee_mcp.server" "--transport" "http" "--port" "8000"
nssm set CogneeMCP AppDirectory "Z:\claude-sota-installed-state"
nssm set CogneeMCP AppEnvironmentExtra "COGNEE_DATA_DIR=Z:/claude-sota-installed-state/.cognee"
Start-Service CogneeMCP
```

Full reversibility = sca-v6.1 D14=5.

---

## §5 Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| cognee module-path / entrypoint differs from §4.1 guess | MEDIUM | LOW (smoke probe catches it pre-commit; <5 min to discover correct path) | Smoke probe BEFORE commit (operator must validate) |
| cognee-mcp stdio mode missing features vs HTTP mode | LOW | MEDIUM | Per deepwiki: cognee-mcp explicitly supports all 3 transports (stdio/SSE/HTTP). Stdio is the **default** in cognee README. No feature gap expected |
| Migration loses indexed data | LOW | HIGH | Data lives in `Z:/claude-sota-installed-state/.cognee` (filesystem, not the NSSM service itself); `COGNEE_DATA_DIR` env preserves path across both modes; **NO data loss** |
| `LLM_API_KEY` / langfuse env vars don't propagate to stdio mcp | LOW | LOW | `.mcp.json` `env:` block handles propagation (mirrors basic-memory's `BASIC_MEMORY_HOME` pattern). Operator's `tools/eee.local.ps1` sidecar exports these at session start per W278e |
| cognee process churn (per-session respawn) creates index lock contention | LOW | MEDIUM | cognee uses filesystem JSON + SQLite; both handle concurrent-process opens. Same pattern works for basic-memory + hindsight w/o issue |

---

## §6 Final verdict

**APPROVE** — adopt Candidate (d) **direct uvx stdio MCP** for cognee-mcp. Apply transition plan §4 in this exact order, run smoke probes between each step, commit only after `claude mcp list` confirms `cognee LIVE stdio`.

**NEEDS_CONFIRMATION before applying**: operator must run smoke probe A or B in §4.1 to verify the exact `--from cognee` invocation works on Windows + Z:-portable env. Estimated time: 5 minutes.

**BLOCK**: none.
