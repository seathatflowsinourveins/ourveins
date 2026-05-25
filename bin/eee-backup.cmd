@echo off
REM eee-backup.cmd - thin shim to tools/eee-backup.ps1
REM Secondary entry: direct Anthropic Max OAuth login (bypasses CLIProxyAPI fleet at :8317).
REM Use when CLIProxyAPI is unhealthy / unauthenticated / under maintenance -- claude.exe
REM authenticates directly to api.anthropic.com via OAuth credentials at
REM Z:\claude-sota-installed\.claude\.credentials.json (run: eee-backup login if missing).
REM
REM Reference (TIER-1 SOTA):
REM - https://code.claude.com/docs/en/setup [VERIFIED 2026-05-08] (native install + OAuth Max login)
REM - https://code.claude.com/docs/en/env-vars [VERIFIED 2026-05-08] (ANTHROPIC_BASE_URL/AUTH_TOKEN canonical)
REM
REM Adapted from sibling eee.cmd. Same -Command form per Wave 73 silent-launch root-cause fix
REM (-File hangs >25s via cmd.exe wrapper due to argv parser interaction with CmdletBinding).
pwsh -NoProfile -ExecutionPolicy Bypass -Command "& 'Z:\claude-sota-installed\tools\eee-backup.ps1' %*"
exit /b %ERRORLEVEL%
