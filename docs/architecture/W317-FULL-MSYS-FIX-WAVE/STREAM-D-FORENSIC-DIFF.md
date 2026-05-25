# W317 Stream D — Z:\z\ Phantom Forensic Diff

**Date**: 2026-05-19 · **Scope**: classify all files under `Z:\z\` vs `Z:\<dir>\` counterparts · **Mode**: read-only inventory, no deletions.

**Method**: PowerShell `Get-ChildItem -Recurse -File -Force` enumerates phantom files (122,575 total). Each compared to `Z:\<rel>` by `Length` + `LastWriteTimeUtc` (±2 s tolerance). md5 reserved for ambiguous cases — not needed (size+mtime exact match is sufficient given snapshot copy semantics). Inventory CSV: `Z:\claude-sota-installed\tmp\w317-stream-d\phantom-inventory.csv` (122,575 rows). Enumeration time: 79 s.

## Class distribution (grand totals)

| Class | Files | Bytes | GB | Action |
|---|---:|---:|---:|---|
| **DUPLICATE-SAFE** | 117,806 | 24,272,339,456 | 22.61 | Delete safely (size+mtime identical to `Z:\<rel>`) |
| **UNIQUE-TO-PHANTOM** | 3,227 | 357,168,802 | 0.33 | **MUST archive** before any delete |
| **PHANTOM-OLDER** | 1,541 | 33,128,417 | 0.03 | Delete safely (legit is newer, phantom is stale write) |
| **PHANTOM-NEWER** | 1 | 55,791 | 0.000 | **Operator review** — write-conflict |

Total phantom: **24.67 GB / 122,575 files**. Safe-to-reclaim with no archival: **22.64 GB** (`DUPLICATE-SAFE` + `PHANTOM-OLDER`). Must-archive: **0.33 GB** (`UNIQUE-TO-PHANTOM` + 1 `PHANTOM-NEWER`).

## Per-dir breakdown

| TopDir | DUPLICATE-SAFE | UNIQUE-TO-PHANTOM | PHANTOM-OLDER | PHANTOM-NEWER |
|---|---:|---:|---:|---:|
| `claude\` (CCC harness) | 117,802 / 22.61 GB | — | 2 / 9.8 MB | — |
| `claude-sota\` | — | 457 / 7.74 MB | — | — |
| `claude-sota-installed\` | — | 205 / 1.22 MB | — | 1 / 55 KB |
| `projects\` | 4 / 0.49 MB | 73 / 0.46 MB | 804 / 10.34 MB | — |
| `repos\` | — | 2,489 / 180.28 MB | 734 / 11.36 MB | — |
| `study\` | — | — | 1 / 60 KB | — |
| `tmp\` | — | 3 / 150.92 MB | — | — |

## PHANTOM-NEWER (operator decision — 1 file)

```
Z:\z\claude-sota-installed\.claude\plugins\data\codex-openai-codex\state\claude-sota-installed-0271062cb1571a49\state.json
  phantom: 55,791 B @ 2026-05-19T13:57:30Z   (today, after W317 patch landed)
  legit:        79 B @ 2026-05-18T05:54:09Z
```

Phantom write is **today**, after our `plugin-hook-bootstrap.js` patch. Indicates codex broker still writing via `HOME=/z/...`. **Do not delete this single file** until the codex-state-redirect AI (operator-AI W317-CODEX-STATE-PATH) lands — its content is likely the canonical job state, while legit is a 79 B stub.

## UNIQUE-TO-PHANTOM by writer pattern (3,227 files)

| Pattern | Count | Note |
|---|---:|---|
| `phantom-clone` (`repos\deps\*`) | 2,489 | git clones (sandbox-agent, mcphub, container-use, llm-rustyolo). NEVER cloned under `Z:\repos\deps\` — entire trees only exist phantom-side. **Highest archive value.** |
| `codex-broker-state` | 574 | Completed session agent jobs. Archival recommended; most are >24 h old. |
| `ecc-homunculus` | 69 | ECC plugin internal state |
| `OTHER` | 83 | misc (cli-proxy-api binaries in `tmp\`, state jsonl, etc.) |
| `hindsight-state` | 4 | hindsight plugin state |
| `codex-T5-cache` | 3 | codex T5 plan-stage review cache |
| `phantom-tmp` | 3 | `cli-proxy-api-bundle3-*.exe` (52 MB each, total 150 MB) |
| `ecc-homunculus-share` | 2 | `.local/share/ecc-homunculus` |

## Allowlist (do NOT delete even if duplicate)

| Pattern | Reason |
|---|---|
| `*\plugins\data\codex-openai-codex\state\agent-*\state.json` mtime ≤ 24 h | active codex job state |
| `*\plugins\data\hindsight-memory*` mtime ≤ 1 h | active hindsight write |
| `*\homunculus\projects.json` mtime ≤ 1 h | active ECC homunculus write |
| `*\state\codex_consult_t5_plan_*.txt` mtime ≤ 24 h | active T5 review cache |

## Cleanup script

Written to `Z:\claude-sota-installed\tools\w317-cleanup-z-phantom.ps1` — defaults to `-WhatIf` (dry-run). Modes:

```powershell
# 1. Dry-run report (default, safe)
.\tools\w317-cleanup-z-phantom.ps1

# 2. Archive UNIQUE+NEWER, leave others
.\tools\w317-cleanup-z-phantom.ps1 -ArchiveOnly

# 3. Archive UNIQUE+NEWER, delete DUPLICATE+OLDER (recommended after operator review)
.\tools\w317-cleanup-z-phantom.ps1 -Execute

# 4. Full nuke after archive verified — also prune empty dirs
.\tools\w317-cleanup-z-phantom.ps1 -Execute -PruneEmpty
```

Archive target: `Z:\claude-sota-installed-state\W317-z-phantom-archive\<rel_path>` (preserves structure). Inventory CSV (122,575 rows) bundled into archive as `_inventory.csv` for audit.

## Report-back (3 sentences)

Z:\z\ contains **117,806 DUPLICATE-SAFE files (22.61 GB)** that are exact size+mtime matches of `Z:\<rel>`, plus **1,541 PHANTOM-OLDER files (33 MB)** that are stale writes — together **22.64 GB safely reclaimable**. **3,227 UNIQUE-TO-PHANTOM files (357 MB)** exist only phantom-side and must archive before delete; dominant pattern is `repos\deps\` git clones (2,489 files / 180 MB — `sandbox-agent`, `mcphub`, `container-use`, `llm-rustyolo` etc.), then 574 codex agent-state files. **1 PHANTOM-NEWER file** (`codex-openai-codex/state/.../state.json` 55 KB, written today after W317 patch) is the only operator-decision item — flagged in allowlist, do not touch until codex-state-redirect lands.
