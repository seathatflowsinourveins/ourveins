---
title: Wave 220 Round 8 — Security audit of comprehensive Z:\claude-sota-pure greenfield install plan
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: round-8-security-audit (orchestrator-spawned wshobson security-auditor agent; FM-19 ARTIFACT-INLINE per readonly Bash policy)
agent: security-auditor (claude-sonnet-4-6 stand-in per CLAUDE.local.md ENV (f) — STAND-IN-NOTICE per cmc-env-funneled-disclosure.md §The mandate)
cross-model-gate: NOT-STRUCTURALLY-SATISFIED (Sonnet stand-in synthesis; orchestrator must file 2nd-stage codex T1 ratification for ADOPT recommendations)
parent: tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md + R3+R4+R5+R6+R7 deltas
---

# Wave 220 Round 8 — Security audit of `Z:\claude-sota-pure` install plan

## Executive summary

Wave 220 Top-37 install plan carries **P0 supply-chain risk in 2 dimensions** (Anthropic DXT one-click MCP installer trust boundary + unpinned `@latest` install commands across all 9 phases) requiring remediation before commit. **Marketplace upstream maintainership** is TIER-1-org defended for 6 of 7 marketplaces (Anthropic + Addy Osmani + obra + Shobson + ECC + Anthropic-DXT) with one orchestration anti-pattern caveat for affaan-m/everything-claude-code 183K★ LAUNCH-SPIKE flag. **NO P0 LICENSE blockers remain in Top-37** post-R4 LICENSE direct-probe. VERDICT: **NEEDS-REVISION conf=0.86** — install plan proceeds IF P0 BLOCKERS remediated (Section 8).

## 4 P0 BLOCKERS — MUST be remediated before install

### P0-SEC-4-A — CLIProxyAPI OAuth atomic-token-write contract (Phase 8 amendment)

```
# Phase 8a — Install CLIProxyAPI v7.0.2 (TIER-1-DIRECT pin)
gh release download v7.0.2 --repo router-for-me/CLIProxyAPI --pattern "*windows*.zip" --dir Z:/claude-sota-pure/.local/cliproxy

# Phase 8b — OAuth setup via OFFICIAL SPA management center (CR-6 official channel)
# 1. Start CLIProxyAPI service: ./cli-proxy-api.exe (port 11700)
# 2. Open browser: http://localhost:11700
# 3. Click "Add Anthropic Account" → SPA OAuth flow → 8 accounts complete
# 4. VERIFY atomic disk write:
#    Get-ChildItem ~/.cli-proxy-api/*.json | Measure-Object  # MUST return >= 8 files
# 5. DO NOT direct-probe /v1/oauth/token from operator scripts (W185 F1 burns RTs without atomic disk write)

# Phase 8c — Document atomic-write evidence in install-provenance.md per CR-9
```

### P0-SEC-4-B — Langfuse secrets discipline (Phase 5 amendment)

```
# Phase 5a — Clone Langfuse to state-outside-repo path (per CLAUDE.local.md ENV (f))
git clone --branch v3.x.x https://github.com/langfuse/langfuse.git Z:/claude-sota-pure-state/langfuse

# Phase 5b — Create .env file (gitignored)
cd Z:/claude-sota-pure-state/langfuse
grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore

# Phase 5c — Generate secrets (NEVER commit literal values)
@"
LANGFUSE_SECRET=$(openssl rand -base64 32)
DATABASE_PASSWORD=$(openssl rand -base64 24)
SALT=$(openssl rand -base64 32)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
"@ | Set-Content .env

# Phase 5d — Verify NO MIT-EE feature auto-enables (open-core caveat per SEC-2)
docker compose up -d langfuse-server  # MIT module only; NOT langfuse-ee
```

### P0-SEC-7-A — Anthropic DXT canonical-source restriction (Phase 2 amendment)

```
# CANONICAL-SOURCE RESTRICTION for .dxt packages:
# - ONLY install .dxt packages from:
#   (a) https://github.com/anthropics/* releases
#   (b) anthropics/claude-plugins-official marketplace .dxt distribution
# - DO NOT install community-supplied .dxt packages without source-verify
```

### P0-SEC-7-B — DXT manifest review requirement

```
# BEFORE any .dxt one-click install:
# 1. Extract manifest.json from .dxt package (zip-archive format)
# 2. Read declared permissions (filesystem / network / shell-exec)
# 3. Verify upstream source path (e.g., anthropics/<repo>)
# 4. Record manifest hash in docs/install-provenance.md
# 5. Operator decision: allowlist-explicit OR deny-default
# 6. After install: monitor MCP subprocess via Process Hacker / Get-Process for >24h
# 7. Re-verify manifest hash on subsequent DXT upgrades; abort on hash drift without explicit re-approval
```

## P1 HIGH items (apply concurrent with install or as fix-forward)

| # | Item | Recovery |
|---|---|---|
| P1-SEC-1 | affaan-m/everything-claude-code 183K★ LAUNCH-SPIKE | Defer to selective per-skill install only; verify cpd via `gh api /repos/.../commits --paginate | wc -l` before blanket marketplace adoption |
| P1-SEC-3 | anthropics/skills + anthropics/dxt NO-LICENSE-FILE | Install OK under STRONG-PROVENANCE-EXPRESS (Anthropic-org); fork-modify deferred until license file lands or explicit Anthropic statement |
| P1-SEC-5 | 13 unpinned `@latest` install commands across Phases 1-8 | Replace with explicit version pins per CR-9; record in `Z:\claude-sota-pure\PINS.json` per sota-pin-discipline.md |
| P1-SEC-6 | Per-plugin hook-audit required before enable for affaan-m + codex + wshobson (TIER-2 maintainers) | Run `Audit-Plugin-Hooks` PowerShell function (cited in agent artifact body) against each plugin's hook scripts BEFORE plugin enable |

## P2 MEDIUM items

| # | Item | Recovery |
|---|---|---|
| P2-SEC-2-langfuse | open-core MIT + EE periphery | Phase 5 Docker-compose must explicitly select MIT-only modules; document `docker compose up langfuse-server` (MIT) vs `langfuse-ee` (EE-restricted) |
| P2-SEC-2-firecrawl | AGPL-3.0 at CLI-binary boundary | Verify install path is MCP server subprocess (`mcp__firecrawl__*` process-isolated), NOT `pip install firecrawl-py` library-link |
| P2-SEC-1-affaan-m | LAUNCH-SPIKE risk (183K★ fast growth) | Selective per-skill install only; await cpd verification + age ≥ 180d burn-in |

## Hook-fire risk matrix (Phase 2 plugin installs)

| Plugin | Hook events | Access scope | Risk |
|---|---|---|---|
| `codex@openai-codex` | T1 PreToolUse + T2/T3 PostToolUse + T6 Stop | ALL edits + commits + session-end | **P1 HIGH** (TIER-1 OpenAI; verify hooks not exfiltrating to non-localhost) |
| `intelligent-compact@claude-settings` | PreCompact | session state at compact boundary | P3 (well-bounded) |
| `wshobson/agents` (50+ varies) | per-plugin | per-plugin scope | **P2** (TIER-2 Hobson; per-plugin review) |
| `addyosmani/agent-skills` (21 skills) | UserPromptSubmit + SessionStart | prompt + session | P3 (TIER-1 Osmani) |
| `obra/superpowers` (selective 6) | PreCompact + SessionStart | session state | P3 (TIER-1 obra) |
| `affaan-m/everything-claude-code` | broad (varies) | broad | **P1** (LAUNCH-SPIKE; review pre-bash-dispatcher.js) |
| `ralph-loop@anthropic-cwc` | Stop + SessionStart | loop state | P3 (TIER-1 Anthropic) |
| `context-management@wshobson` | PreToolUse + SessionStart | session state | P3 (well-bounded) |
| MCP server subprocesses | (subprocess) | tool args via MCP protocol | varies per-MCP |

## Anthropic DXT trust-boundary analysis

- TIER-1 Anthropic official primitive per CR-6
- Trust anchor: Anthropic-org maintainership (NO LICENSE FILE; STRONG-PROVENANCE-EXPRESS satisfied)
- Threat model for malicious `.dxt` package: priv-esc / credential exfil / persistent backdoor / supply-chain pivot
- Mitigation: source-verification (Anthropic-canonical only) + manifest review + hash-pin + permissions allowlist + network-isolation for untrusted

## Secret/credential-handling recommendations

1. ALL API keys (Anthropic / OpenAI / Perplexity) → User-scope environment variables ONLY (`[System.Environment]::SetEnvironmentVariable(..., 'User')`)
2. `.mcp.json` MUST use `${env:VARNAME}` substitution syntax
3. `.env` files MUST be gitignored + scoped to `Z:\claude-sota-pure-state\`
4. CLIProxyAPI OAuth tokens MUST atomic-write per FM-20 row 17 evidence
5. PowerShell `[SecureString]` for in-session secrets
6. Git pre-commit hook with 9-pattern secret-redaction per `lga-worktree-prereq.md §11`

## Version-pin recommendations (replace ALL @latest per CR-9)

```powershell
npm install -g @anthropic-ai/claude-code@2.1.139  # explicit (not @latest)
npx -y @upstash/context7-mcp@<pin>
uvx --from git+https://github.com/doobidoo/mcp-memory-service.git@v10.51.3 mcp-memory-server
docker pull qdrant/qdrant:v1.13.5  # NOT :latest
git clone --branch v3.x.x https://github.com/langfuse/langfuse.git  # explicit tag
gh release download v7.0.2 --repo router-for-me/CLIProxyAPI  # explicit version
```

## Cross-model gate status

**STAND-IN-NOTICE**: this audit ran as orchestrator-side Sonnet stand-in per `CLAUDE.local.md` ENV (f); cross-model gate NOT structurally satisfied at agent layer. Orchestrator MUST file 2nd-stage Path P codex T1 ratification per `cmc-env-funneled-disclosure.md §The mandate` Option 2 BEFORE treating ADOPT recommendations as authoritative.

## Final verdict

**NEEDS-REVISION conf=0.86**

Install plan proceeds IF the 4 P0 BLOCKERS (Section 8) are remediated. P1/P2/P3 items may apply concurrent with install OR as Pattern A fix-forward.

VERDICT-SEC-AUDIT-COMPLETE.
