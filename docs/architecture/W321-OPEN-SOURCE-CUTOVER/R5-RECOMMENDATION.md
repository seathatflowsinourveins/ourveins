# W321 P0a — R5 6-Wave SHIP-BLOCKER Recommendation (operator-decision required)

> **Status**: PROPOSAL pending operator green-light. Per safety guidelines, sandbox/permissions changes affect runtime security boundaries — NOT auto-applied.
> **Convergent evidence**: 6 waves (W316-S1 + W314-E + W316-S4 + W316-S5-L7 + W317-S1 + W319-D + W320-Stream-E commercial-fragility empirical) all surface the same SHIP-BLOCKER.

## Current state (cardinal-rule R5 PARTIAL-HOLD)

`.claude/settings.json`:
- `permissions.defaultMode: "bypassPermissions"` (line ~86 per W316-S7 finding)
- `sandbox.enabled: false`
- `sandbox.allowUnsandboxedCommands: true`

This means: every Bash/Edit/Write/MCP tool fires WITHOUT permission prompt OR sandbox containment. Effective security boundary = zero.

## Recommended path: deny-default + sandbox-enable

Per sca-v9 §6 R5 5-Control Layered-Defense (already codified in skill; W324):

### Control 1: deny-default permissions
```jsonc
"permissions": {
  "defaultMode": "ask",   // was: "bypassPermissions"
  "allow": [
    /* explicit allowlist preserved */
  ],
  "deny": [
    "Read(~/.ssh/**)",
    "Read(~/.aws/**)",
    "Read(**/.env)",
    "Read(**/.env.*)",
    "Read(**/credentials/**)",
    "Read(**/.codex/auth.json)",
    "Read(**/.anthropic/**)",
    "Bash(rm -rf /*)",
    "Bash(curl ** | sh*)",
    "Bash(wget ** | sh*)",
    "WebFetch(file://**)"
  ]
}
```

### Control 2: sandbox-enable (sanctioned exception class per cardinal-rule-2)
```jsonc
"sandbox": {
  "enabled": true,
  "allowUnsandboxedCommands": false,
  "bwrapPath": null,  // Windows: native containment via PowerShell ConstrainedLanguage
  "socatPath": null
}
```

## Cite anchors (3-org-distinct per W295 I1)

- **NIST 800-53 AC-3(3)** Mandatory Access Control — https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=AC-3 (NIST/USDoC)
- **OWASP A01-2021** Broken Access Control — https://owasp.org/Top10/A01_2021-Broken_Access_Control/ (OWASP Foundation 501(c)(3))
- **Microsoft Zero-Trust** deny-default principle — https://learn.microsoft.com/en-us/security/zero-trust/ (Microsoft Corp.)

## Rollback path

Single-commit revert. The pre-W321 settings.json is at HEAD `3731ca7`. If R5 patch lands at W321-commit-N, rollback = `git revert <commit-N>`.

## Operator-decision required

Choose ONE:

- **(A) APPLY** the patch above (route R5 to deny-default + sandbox-enable). 
- **(B) PRESERVE** current `bypassPermissions:true` + `sandbox.enabled:false` (accept 6-wave SHIP-BLOCKER as known-debt).
- **(C) HYBRID** — deny-default for permissions but defer sandbox-enable (W322+ separate decision).

This document is the PROPOSAL only. No settings.json edits applied. Codex round-1 will fire session-end via plugin-native Stop-hook on this proposal alongside the other 4 artifacts (sca-v10/sca-v11/W320-DEEPER/STREAM-E).
