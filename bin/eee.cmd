@echo off
REM eee.cmd - thin shim to tools/eee.ps1
REM Reference (TIER-1 SOTA):
REM - https://code.claude.com/docs/en/setup [VERIFIED 2026-04-28]
REM - https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows [VERIFIED 2026-04-28]
REM Adapted from (cite-only): Z:/claude-sota/bin/sss.cmd
REM Wave 73 silent-launch root-cause fix 2026-05-07:
REM   1. pwsh -File hangs >25s via cmd.exe wrapper due to interaction between -File
REM      argv parser and eee.ps1 advanced-function CmdletBinding param. Switched to
REM      -Command form which routes through full pwsh parser.
REM   2. Unicode em-dash and right-arrow chars in REM lines caused cmd.exe to mis-parse
REM      under default code page, hanging before reaching the pwsh invocation. Replaced
REM      with ASCII-only equivalents.
REM Reproduction: Z:/claude-sota/tmp/test-eee.bat (hang) vs eee-cmdform-test.cmd (PASS).
pwsh -NoProfile -ExecutionPolicy Bypass -Command "& 'Z:\claude-sota-installed\tools\eee.ps1' %*"
exit /b %ERRORLEVEL%
