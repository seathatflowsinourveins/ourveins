# Item-C — Plugin Re-enable (signed-audit-trails + protect-mcp)

**Status**: AUDIT-COMPLETE — operator-decision-required (NOT auto-recommend re-enable).

**Wave**: W331 Stream-GIT P0-5 item (c)
**Cite-anchor**: CLAUDE.md L15 cardinal-rule-1 + W331 axis-1 #3 (CR-1 trust-tuple extension).

## Audit

### Current state (`.claude/settings.json` L286-287)

```jsonc
"protect-mcp@claude-code-workflows": false,
"signed-audit-trails@claude-code-workflows": false,
```

### Plugin cache verification (`.claude/plugins/cache/claude-code-workflows/`)

Both plugins are physically present:

| Plugin | Version | Path |
|---|---|---|
| `protect-mcp` | `0.1.0` | `.claude/plugins/cache/claude-code-workflows/protect-mcp/0.1.0/` |
| `signed-audit-trails` | `0.1.0` | `.claude/plugins/cache/claude-code-workflows/signed-audit-trails/0.1.0/` |

### Source manifest details

**protect-mcp** (`.claude-plugin/plugin.json`):
- name: `protect-mcp`
- version: `0.1.0`
- author: `Tom Farley <tommy@scopeblind.com>`
- license: `MIT`
- description: "Cedar policy enforcement + Ed25519 signed receipts for every Claude Code tool call. First cryptographic governance plugin — receipts independently verifiable offline."

**signed-audit-trails** (`.claude-plugin/plugin.json`):
- name: `signed-audit-trails`
- version: `0.1.0`
- author: `Tom Farley <tommy@scopeblind.com>`
- license: `MIT`
- description: "Teaching skill: signed audit trails for Claude Code tool calls. Cookbook-style walkthrough of Cedar-gated tool calls with Ed25519 receipts, offline verification, and CI/CD integration. Pairs with the protect-mcp plugin."

### Marketplace + freshness probe

- **Marketplace**: `claude-code-workflows` — per `.claude/settings.json:extraKnownMarketplaces` block (third-party, NOT Anthropic-official-canonical-marketplace).
- **Freshness**: cannot verify upstream-SHA from local cache alone; operator must run `/plugin update protect-mcp@claude-code-workflows` + `signed-audit-trails@claude-code-workflows` then `/reload-plugins` per CLAUDE.md L15 W270 corollary (silent SHA drift defense).

### W331 axis-1 #3 trust-tuple check

CR-1 trust-tuple = `(trusted-source, active-scope, commit-SHA-freshness, /reload-plugins-verified, signed-release, license-audit, malicious-update-review, dependency-blast-radius)`.

| Trust-tuple field | protect-mcp | signed-audit-trails |
|---|---|---|
| (a) maintainer-identity signed release (SLSA-L3 / npm-provenance / Sigstore git-tag) | **UNVERIFIED** — third-party author, no SLSA-attestation probed | **UNVERIFIED** — same author, same gap |
| (b) license-risk audit | OK (MIT) | OK (MIT) |
| (c) malicious-update review (≥1 commit older than 30d OR operator-pin) | **UNVERIFIED** — local cache only, no upstream-SHA delta probe | **UNVERIFIED** — same gap |
| (d) dependency blast-radius (`npm ls` clean + no Socket.dev/Snyk flags) | **UNVERIFIED** — Cedar policy engine + Ed25519 = JS deps; not audited | **UNVERIFIED** — same gap |

### Operator-decision matrix

| Path | Action | Pre-condition |
|---|---|---|
| **Conservative** | Keep `false`; defer until Item-D `slsa-verifier` lands + CR-1 trust-tuple verifiable | Default-recommended given (a)(c)(d) all UNVERIFIED |
| **Permissive** | Re-enable as `true` after operator-side `gh repo view Z:/repos/claude-code-workflows` + 30d-staleness + Socket.dev scan | Requires manual trust-tuple verification |
| **Reject** | Remove from cache via `/plugin uninstall protect-mcp@claude-code-workflows signed-audit-trails@claude-code-workflows` | If trust-tuple cannot be cleared |

## Paste-ready edit (Permissive path only)

```jsonc
// .claude/settings.json L286-287 diff
- "protect-mcp@claude-code-workflows": false,
- "signed-audit-trails@claude-code-workflows": false,
+ "protect-mcp@claude-code-workflows": true,
+ "signed-audit-trails@claude-code-workflows": true,
```

After edit:

```powershell
# Reload plugins to pick up state change
# (use /reload-plugins slash command inside Claude Code)
```

## Rollback (revert re-enable)

```jsonc
// Revert L286-287
- "protect-mcp@claude-code-workflows": true,
- "signed-audit-trails@claude-code-workflows": true,
+ "protect-mcp@claude-code-workflows": false,
+ "signed-audit-trails@claude-code-workflows": false,
```

Then `/reload-plugins` again. Plugin-cache files remain on disk (no data loss).

## Risk + reversibility

- **Risk**: MODERATE-on-permissive-path — protect-mcp adds a Cedar policy gate that wraps EVERY tool call. Misconfigured Cedar policies could block legitimate operations until tuned. signed-audit-trails is "teaching skill" (skill-only, no runtime gate).
- **Reversibility**: FULL — single-line settings.json edit, no state migration.
- **Recommendation**: ship Item-D (slsa-verifier) FIRST so the trust-tuple is verifiable, then revisit (c).

## Cite anchors

- CLAUDE.md L15 cardinal-rule-1 — primitive validity criteria.
- CLAUDE.md L17 W331 axis-1 #3 — CR-1 trust-tuple extension.
- Plugin manifest format: `https://code.claude.com/docs/en/plugins` — `.claude-plugin/plugin.json`.
- Verified-at: 2026-05-19, plugins-cache state at HEAD `2add8fc`.
