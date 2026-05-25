# IK-LLAMA-FMOE-BUILD-2026-05-17

## Verdict: NO REBUILD REQUIRED — premise invalidated, fused MoE already active

The W262 cross-review concluded a rebuild would add a `-fmoe` (fused MoE) CLI flag.
Direct source inspection of current HEAD shows that flag does not exist in the source;
fused MoE is the default-on runtime behavior; the running production binary already
runs with fused MoE enabled. No rebuild can add a flag that the source does not define.

## Evidence

### HEAD SHA inspected (no rebuild performed)

`1f8c603d Quantize: add extra output tensor for MTP (#1810)` — working tree clean.

### Source-level proof there is no positive `-fmoe` flag

- `Z:\repos\deps\ik_llama.cpp\common\common.cpp:1789` — `if (arg == "-no-fmoe" || arg == "--no-fused-moe") { params.fused_moe_up_gate = false; }`. Only the disable form is parsed.
- `Z:\repos\deps\ik_llama.cpp\common\common.cpp:2873` — help text emits `"-no-fmoe, --no-fused-moe   disable fused MoE (default: %s)"`. This is the line W262 cited as evidence that `-fmoe` exists; it is in fact the help line for `-no-fmoe`.
- `Z:\repos\deps\ik_llama.cpp\common\common.h:395` — `bool fused_moe_up_gate = true; // fused up*unary(gate) op for MoE models`. Default ON.
- `Z:\repos\deps\ik_llama.cpp\docs\parameters.md:85` does document `-fmoe` as a positive flag — this is docs-vs-source drift; the source code dropped the positive flag (likely when the default flipped to true) but `parameters.md` was not updated. PR 229 (referenced in docs) added the feature; later commits made it default-on and removed the positive opt-in. (No `arg == "-fmoe"` or `arg == "--fused-moe"` matches anywhere in `common/` per grep.)

### Reproduction of "rejects -fmoe" against current production binary

```
PS> & 'Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe' -fmoe
error: unknown argument: -fmoe
EXITCODE=1
```

But:

```
PS> & 'Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe' --help
... -no-fmoe, --no-fused-moe   disable fused MoE (default: enabled) ...
```

`default: enabled` is the operational confirmation that the running 35B server has
fused MoE active right now, because the NSSM service launches without passing
`-no-fmoe`. The W262 cite of `common/common.cpp:2873` matched the help-text line for
the negative flag; W262 read it as if it were the positive flag's help text.

### Build prerequisites (surveyed, not used)

CMake 4.3.1, CUDA 13.2 toolkit (sm_89 arch matches current `build-new`),
MSVC 14.44.35207 + vcvars64.bat at the canonical VS2022 BuildTools path,
Visual Studio multi-config generator (matches existing `build-new`). All present;
a rebuild is mechanically feasible if a future need arises.

## NSSM service registry — NO change required

`HKLM:\SYSTEM\CurrentControlSet\Services\IkLlamaServer\Parameters\Application` already
points at the correct binary, and that binary already runs fused MoE. There is no
flag to add to the args list. The W262-suggested `-fmoe` argument would be rejected
by the binary and would cause service failure if added.

### Reference: how to swap binary IF a future rebuild adds new behavior

```powershell
# Forward swap (NOT recommended now — no rebuild produced):
Stop-Service IkLlamaServer
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\IkLlamaServer\Parameters' `
                 -Name 'Application' `
                 -Value 'Z:\repos\deps\ik_llama.cpp\build-fmoe\bin\Release\llama-server.exe'
Start-Service IkLlamaServer

# Rollback:
Stop-Service IkLlamaServer
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\IkLlamaServer\Parameters' `
                 -Name 'Application' `
                 -Value 'Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe'
Start-Service IkLlamaServer
```

These are reference only — do not execute today; there is no `build-fmoe` directory because no rebuild was performed.

## Recommended follow-ups

1. Mark the W262 finding as resolved-via-disproof. Cite this report.
2. (Optional, low priority) File an upstream issue/PR to fix the doc-vs-source drift in `docs/parameters.md:85` so future readers do not repeat the W262 misread.
3. If a future tuning question asks "can we verify fused MoE is on at runtime?", inspect the server's startup log or `--help` output — the `default: enabled` token in the `-no-fmoe` help line is the source of truth.

## Note on docs/source drift (verified)

`grep -n 'arg == "-fmoe"' common/*` returns zero matches; `grep -n 'arg == "--fused-moe"' common/*` returns zero matches. The positive flag was removed from the parser without updating `docs/parameters.md`.

BUILD: SUCCESS — premise invalidated, no rebuild required; fused MoE already active in production binary.
