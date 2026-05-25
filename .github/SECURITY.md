# Security Policy

## Supported Versions

`claude-sota-installed` is a personal-runtime knowledge base (PRIVATE GitHub repo). The cardinal-rule discipline at `CLAUDE.md` is the canonical security contract.

| Component | Support |
|---|---|
| `main` branch (current shipped wave) | ✓ Active maintenance |
| Wave branches (`goal/W*`, `worktree-W*`, `sota-converge-w*`) | ✓ In-flight; codex GPT-5.5 cross-model review required before merge |
| Pre-W255 history | ✗ Frozen; reachable via `git log --before=2026-05-15`. (Closest reverify-tag-points: `pre-W337-p3-1-claude-md` + `pre-W337-sca-v14` per `git tag --list "pre-W*"`. Prior `pre-W255-cleanup-*` tag-reference was stale — CLAUDE.md L5 W343 drift-fix already documented this; SECURITY.md aligned in W432-FIX-A.) |

## Reporting a Vulnerability

Report security issues privately via GitHub Security Advisories (`Security` → `Report a vulnerability` on the repo page). Do NOT open a public issue.

For supply-chain concerns about upstream packages we depend on (per CR-9 pin discipline):
1. Check `.mcp.json` for the pinned version
2. Verify against upstream CVE database (NIST NVD, OSV.dev)
3. File via GH Security Advisory with the affected pin

## Security Model (R1-R6 cardinal rules)

Per `CLAUDE.md` L13-L17:

| Rule | Mechanism | Cite |
|---|---|---|
| R1 trust-tuple | SLSA-L3 build provenance + Sigstore signatures + license audit + dependency blast-radius | https://slsa.dev/spec/v1.0 |
| R2 hooks ≤2KB | `.pre-commit-config.yaml:cr2-2kb-hooks` mechanical enforcement | https://docs.anthropic.com/en/docs/claude-code/hooks |
| R3 subagent allowlist | `tools/preagent-subagent-validator.mjs` exit-2 block on unknown | https://docs.anthropic.com/en/docs/claude-code/sub-agents |
| R4 rules-folder governance | `self_invented_count: 0` invariant | https://code.claude.com/docs/en/claude-directory |
| R5 5-control layered defense | deny-default permissions + audit-log + secret-redaction + egress-policy + drift-detection | NIST 800-53 AC-3/AU-2/SC-7/SC-28/CM-8 + CISA Zero-Trust + OWASP A07-2021 |
| R6 verify-before-claim | Independent probe per DONE claim (test exit / codex verdict / operator-sign) | NIST SP 800-218 PW.7 + RV.1 + ISO/IEC 25010 §4.2.6-4.2.7 |

## Secret-redaction discipline

- `CLAUDE.local.md` is gitignored — secrets live there only
- `.codex/`, `.env*`, `.claude/.credentials.json` all gitignored
- `gitleaks` pre-commit hook scans for accidental secrets
- `trivy fs` scans for HIGH/CRITICAL CVEs on `git push` / `git commit` / `gh pr create` paths
- API key rotation: Perplexity + Langfuse are operator-owned rotations (currently 7-8+ wave dwell SEV-1 carry-forwards)

## Supply-chain (CR-9)

All MCP servers in `.mcp.json` pinned via:
- `npx -y <pkg>@<exact-version>` (preferred)
- `uvx --from <pkg>==<version>` (sanctioned for serena + basic-memory)
- `uvx --from git+...@<SHA>` (sanctioned SHA-pinned)
- Local-build at `Z:/...` (sanctioned per W265 for langfuse)
- Local HTTP via NSSM (sanctioned for cognee)

Dependabot auto-PRs refresh CR-9 pins weekly per `.github/dependabot.yml`.

## CR-9 drift exceptions (queued for review)

- `gitnexus` MCP entry uses bare `gitnexus mcp` (no version pin) — flagged for W334 P0-W334-3 reconciliation
- `mksglu/context-mode` and `abhigyanpatwari/GitNexus` are NOASSERTION licenses — CR-1(b) review queued W335 P0-W335-1
