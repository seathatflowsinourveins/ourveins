# P0(c) — HF_TOKEN operator-task

> **Status**: OPERATOR-ACTION-REQUIRED. CLAUDE.local.md is on the deny-list at `.claude/settings.json:permissions.deny` ("Read(./CLAUDE.local.md)") — this is correct R5 hardening. Only operator can set the HF token.

## Task

Add HF_TOKEN to `Z:/claude-sota-installed/CLAUDE.local.md` ENV block (gitignored; per-machine):

```powershell
# (h) HF_TOKEN — close W346 Stream-E AUTH-GAP: hf-mcp-server runs anonymous
# → rate-limited. Generate token at https://hf.co/settings/tokens (read-only scope).
$env:HF_TOKEN = 'hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

## Rationale

- W346 Stream-E §1: hf-mcp-server runs anonymous (no HF_TOKEN) → rate-limited; HF-resources family unreliable for D81 multi-MCP convergence.
- Token feeds `mcp__hf-mcp-server__*` tools via process env propagation per Anthropic CC MCP spec.
- Read-only scope is sufficient; no `repo` or `write` scope needed.
- Per CR-5 + W295-codex-r13 secret-class data NEVER auto-persisted; CLAUDE.local.md is gitignored.

## Verification (post-set)

```powershell
$env:HF_TOKEN -ne $null  # MUST return True
# Then restart CC session for env propagation to MCP children.
```

After restart, hf-mcp-server should drop anon-mode warnings and rate-limit windows should widen.
