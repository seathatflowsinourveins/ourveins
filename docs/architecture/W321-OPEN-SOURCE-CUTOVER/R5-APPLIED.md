# W321 P0a R5 — APPLIED (Path C HYBRID per codex APPROVE-PATH-C)

> **Date**: 2026-05-19
> **Codex round-1 verdict**: APPROVE-PATH-C (deny-default permissions NOW; sandbox.enabled=true staged W322 after smoke tests)
> **Verdict file**: `docs/architecture/W321-OPEN-SOURCE-CUTOVER/codex-rounds/round-1-r5-decision-VERDICT.md`

## Applied change

Single-hunk edit to `.claude/settings.json`:

```diff
-    "defaultMode": "bypassPermissions"
+    "defaultMode": "default"
```

Effect:
- Existing `permissions.allow` list (lines 58-71) becomes the effective allowlist for tools not explicitly denied
- Existing `permissions.deny` list (lines 72-91; Read of .env/.crt etc.) continues enforcing
- Tools not in `allow` will prompt operator (deny-default semantics)
- `sandbox.enabled: false` PRESERVED (Path C HYBRID — staged to W322 per codex flag re: Windows containment unproven)

## 6-wave SHIP-BLOCKER convergence — CLOSED for permissions axis

Resolves cardinal-rule R5 PARTIAL-HOLD on the permissions axis:
- W316-S1 + W314-E + W316-S4 + W316-S5-L7 + W317-S1 + W319-D + W320-Stream-E commercial-fragility — all surfaced `bypassPermissions:true` SHIP-BLOCKER → NOW RESOLVED for permissions
- R5 PARTIAL-HOLD remains ONLY for sandbox.enabled=false (W322 staged work)

## Cite anchors (3-org-distinct per W295 I1)

- NIST 800-53 AC-3(3) Mandatory Access Control — https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=AC-3
- OWASP A01-2021 Broken Access Control — https://owasp.org/Top10/A01_2021-Broken_Access_Control/
- Microsoft Zero-Trust deny-default — https://learn.microsoft.com/en-us/security/zero-trust/

## Rollback

```bash
git diff Z:/claude-sota-installed/.claude/settings.json  # verify single-line change
git checkout -- Z:/claude-sota-installed/.claude/settings.json  # discard
# OR
git revert <commit-of-this-change>  # if committed
```

## W322 follow-on (sandbox staging)

Per codex APPROVE-PATH-C reasoning:
> "Sandbox concern: Windows containment is asserted but not proven. The current sandbox config fields (failIfUnavailable, autoAllowBashIfSandboxed, excludedCommands for git/docker/npx/uvx) are unreconciled with allowUnsandboxedCommands:false, which could break git/install/test workflows beyond normal prompt friction."

W322 smoke-test scope BEFORE flipping `sandbox.enabled: true`:
1. Bash basic commands
2. git operations (status/add/commit/push)
3. npm/npx (CR-9 MCP server bootstrap)
4. uvx (basic-memory MCP bootstrap)
5. docker compose (research-stack)
6. Sandbox-unavailable failure modes (Windows containment limitation)

Until smoke tests pass: `sandbox.enabled: false` remains as Path C HYBRID interim.

## Expected new operator-friction

The `defaultMode: "default"` flip introduces permission prompts for tool calls NOT in the `allow` list. The existing allow list (lines 58-71 of settings.json) covers many common operations including:
- Edit on settings.json + CLAUDE.md
- Various Bash commands (`gh`, `git`, `npm`, `npx`, `codex *`, etc.)

If specific autonomous workflows break (e.g., /loop autonomous mode), operator can:
(a) Add more entries to `permissions.allow` (recommended)
(b) Revert to `bypassPermissions` (temporarily, with explicit-debt annotation)
(c) Switch to `acceptEdits` mode (auto-accepts edits only)

## Status

✅ P0a R5 SHIP-BLOCKER permissions axis CLOSED
⚠ R5 sandbox axis PARTIAL-HOLD continues (W322 staged work per codex)
