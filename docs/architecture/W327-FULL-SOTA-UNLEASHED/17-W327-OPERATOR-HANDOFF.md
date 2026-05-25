# W327 §17 — Operator Handoff (BLOCK-Gate Critical Path)

> **SHIP-GATE STATUS: BLOCK** per S12 + S9 convergent finding.
> 4 P0 OP items + 6 P0 AI items must close before W328 absorb-wave can proceed.
> Estimated total operator wall-clock: ~45-60 min (most is sub-15-min steps).

## §1 — P0 OPERATOR ACTIONS (cannot be delegated to operator-AI)

### OP-1 · Rotate perplexity_research API key (S12-F01 · W326 G7 · STALE since W317-r2)
```powershell
# Get new key from https://www.perplexity.ai/settings/api
# Edit CLAUDE.local.md §f3:
#   $env:PERPLEXITY_API_KEY = '<new-key>'
# Restart Claude Code session
```
**Time**: 3 min · **Rollback**: keep old key staged in keyring · **Verify**: `perplexity_search "test"` returns 200

### OP-2 · Revoke leaked GitHub fine-grained PAT (S12-F02 · NEW)
```
1. https://github.com/settings/tokens → find token from commit 52881fde context
2. Click "Revoke" (immediate kill)
3. If you need a replacement, generate a NEW token (scope: minimum-required)
4. Update wherever it was being used (likely github MCP server)
```
**Time**: 4 min · **Rollback**: re-generate (token regeneration is non-destructive)

### OP-3 · Populate TAVILY_API_KEY + EXA_API_KEY (W326 G7 · staged not populated)
```powershell
# Get keys from https://tavily.com (dashboard) and https://exa.ai (dashboard)
# Edit CLAUDE.local.md §f3, uncomment + set:
#   $env:TAVILY_API_KEY = 'tvly-...'
#   $env:EXA_API_KEY    = 'exa-...'
# Restart Claude Code session
```
**Time**: 5 min · **Rollback**: leave commented · **Verify**: `tavily_search "test"` returns 200

### OP-4 · Authenticate Logfire (S10-retry P0a · NEW)
```
1. In Claude Code session, invoke: mcp__plugin_logfire_logfire__authenticate
2. Follow OAuth flow in browser
3. Capture LOGFIRE_TOKEN from response
4. Add to CLAUDE.local.md §f4 (new section):
   $env:LOGFIRE_TOKEN = 'pylf_v1_...'
5. Restart Claude Code session
```
**Time**: 5 min

## §2 — P0 OPERATOR-AI ACTIONS (this session or next; can be delegated)

### AI-1 · git-filter-repo redact secrets from history (S12-F01 + F02)
**Scope**: Local-only branches W321/goal/W287-reconcile/sota-converge-w290 — commit `52881fde` lines containing 2 secrets.
**Commands**:
```bash
# Install git-filter-repo if missing: pip install git-filter-repo
# Identify exact replacement strings from S12-F01,F02 context
git filter-repo --replace-text replacements.txt --refs <branches>
# Force-push with-lease (NOT plain --force) to preserve peer-pushes
git push --force-with-lease origin <branch>
```
**Time**: 20 min · **Rollback**: branches are local-only so worst case = re-create branch from main

### AI-2 · Wire R5-C2 audit-logging hook (S12-F08 · C2=0/5)
**Scope**: Create `.claude/state/audit/` dir + PreToolUse audit-log hook per W295 §6.
**Commands**:
```powershell
mkdir -Force .claude\state\audit
# Add PreToolUse hook in .claude/settings.json emitting JSONL row to:
#   .claude/state/audit/<YYYY-MM-DD>.jsonl
# ≤2 KB shim per CR-2 sanctioned-exception; SHA-256 hash chain
```
**Time**: 15 min · **Rollback**: delete hook entry from settings.json

### AI-3 · Patch `preagent-parallel-guard.mjs:4,17,181` (S3 + S7 P0 · W329-D root cause)
**Scope**: Replace `exit(0)` advisory-only with block-on-2nd-violation-per-session logic per CLAUDE.md L13 W329-D proposal.
**Skeleton ready in S3 §6 + CLAUDE.md L13 inline-proposal**.
**Time**: 10 min · **Rollback**: `git revert` single commit

### AI-4 · Fix `preagent-subagent-validator.mjs:99-104,111-114` (S3 + S7 P0)
**Scope**: Replace soft-fail-to-exit-0 paths with hard-block on missing/corrupt allowlist (W319-A HIGH-3 closure).
**Time**: 8 min · **Rollback**: `git revert` single commit

### AI-5 · Patch `tools/eee*.ps1` empty catch blocks (S7 P0 — 3 sites)
**Scope**: `tools/eee.ps1:583,611` + `tools/eee-status.ps1:105` — replace `catch { }` with explicit error surface.
**Time**: 5 min · **Rollback**: `git revert`

### AI-6 · langfuse MCP CR-9 remediation (S6+S12 · `.mcp.json:50-60`)
**Scope**: Replace `command: node Z:/.../index.js` → `command: npx`, `args: ["-y", "@langfuse/mcp-server@<pinned>"]` OR SHA-pin if upstream npm pkg doesn't yet exist.
**Time**: 8 min · **Rollback**: revert `.mcp.json`

### AI-7 · gitnexus MCP CR-9 remediation (S5+S6+S12 · `.mcp.json:38-39`)
**Scope**: Replace PATH-resolved `command: "gitnexus"` → `command: "npx"`, `args: ["-y", "gitnexus@1.6.5", "mcp"]`. Force-refresh plugin cache to pick up 6 commits since installed SHA.
**Time**: 10 min · **Rollback**: revert `.mcp.json`

## §3 — P0 INSIGHTS WIRE-UP (S15 ready to copy-paste · ~15-20 min)

**Single highest-leverage operator action**: per S15's 18-command runbook (`docs/architecture/W327-FULL-SOTA-UNLEASHED/15-INSIGHTS-100PCT-WIRE-UP.md`), this alone takes composite-quality 4.036 → ~4.35 (RED → GREEN).

Steps (in order, ~15-20 min):
1. Pre-flight probe (4 commands) — 1 min
2. Langfuse 0-span fix via `OTEL_EXPORTER_OTLP_HEADERS` (4 commands) — 4 min
3. Phoenix OTLP wire-up (3 commands) — 3 min
4. 3 privacy opt-ins (2 commands) — 2 min
5. Post-flight verify (5 commands) — 5 min

**Verify each step before proceeding to next** per runbook §6 failure-mode handling.

## §4 — P1 OPERATOR-AI ACTIONS (this wave or W328)

### AI-8 · Install arxiv-mcp-server (T1) + openalex-research-mcp (T2) — closes W326 G1
**Commands** (per S14 verdict):
```json
// Add to .mcp.json:
"arxiv-mcp-server": {
  "command": "uvx",
  "args": ["--from", "arxiv-mcp-server==0.5.0", "arxiv-mcp-server"]
},
"openalex-research-mcp": {
  "command": "npx",
  "args": ["-y", "openalex-research-mcp@0.4.1"]
}
```
**Time**: 5 min · **D-EMP soak**: sandbox → 1-cycle → multi-day → W331 promote to D-EMP=3+

### AI-9 · Activate addy-agent-skills@1.0.0 plugin (S4 — staged not activated)
```
claude /plugin enable addy-agent-skills
claude /reload-plugins
```
**Time**: 2 min · Brings 23 addy skills online including `interview-me` (closes CLAUDE.md L41 drift)

### AI-10 · `/plugin update context-mode@context-mode` (S5 — +1 patch behind)
**Time**: 2 min · Trivial zod3-to-v4 adapter

### AI-11 · Settings.json: remove `skipDangerousModePermissionPrompt:true` (S12-F07 P1)
Semantic-equivalent to removed `bypassPermissions:true`. Re-introduces the bypass via different setting name.
**Time**: 1 min

### AI-12 · Update W327 design to V2 per S11 critiques (single biggest arch change)
- L4 Codex: invert Δ54 to N=1 default + adaptive escalate (was N=3)
- L1 RRF: recalibrate k=60 → k=10 + family-credibility prior
- Layer count: 6 → 5 (merge L2 sca-PRE-v1 into L3 Phase-0a)
- D-REGRET: ship as shadow-dim, not in composite-denom 40.4, until 3-wave calibration
**Time**: 30 min (sca-v13 spec update) · **Rollback**: keep V1 spec in `_archived/`

## §5 — P1 OPERATOR DECISIONS (binary choices)

### OP-5 · Phoenix v13.15.0 → v15.11.0 upgrade window (S10-retry P0b)
**Decision**: 2-major-version breaking-change review. Defer until W328 Q3 if unsure.

### OP-6 · `sandbox.enabled:false` Windows limitation (S12-F09 P1)
**Decision**: WSL2 pivot (Path β, 3-5 wave prereq) vs compensate-via-permissions-deny (Path γ).

### OP-7 · Phase-6 codex round-1 verdict absorption (S9 BLOCK=4)
**Decision**: after operator closes 4 P0 BLOCKs above, request codex round-2 to ratify W327 closures.

## §6 — SUCCESS CRITERIA (re-evaluate after operator-action complete)

| Metric | W327 baseline | Post-handoff target |
|---|---|---|
| Composite quality | 4.036 RED | ≥4.35 GREEN |
| R5 5-control wired | 1.5/5 (4.0/10) | ≥3/5 (≥6/10 STRONG) |
| MCP CR-9 compliance | 12/14 (85%) | 14/14 (100%) |
| P0 secret leaks | 2 (perplexity + GitHub PAT) | 0 |
| Insights coverage | 38% (8/21 features) | 100% (21/21) |
| parallel_ratio | 0.0036 | ≥0.20 (after AI-3 patch) |
| Silent-fallback P0 | 5 | 0 |
| Codex round-N | BLOCK=4 | APPROVE OR REVISE-light |

## §7 — Sequence Recommendation (cardinal ordering)

```
1. OP-2 GitHub PAT revoke (HIGHEST priority — token exposure)
2. OP-1 perplexity rotate (key exposure)
3. OP-3 + OP-4 (other key/auth flows)
4. AI-3 + AI-4 + AI-5 (silent-fallback patches — restore W269 enforcement)
5. AI-1 (git-filter-repo redaction — after OP-1/OP-2 closes the live-exposure)
6. AI-6 + AI-7 (CR-9 MCP remediation — closes codex BLOCK)
7. AI-2 (audit-logging — closes CR-5 BLOCK)
8. P0 INSIGHTS WIRE-UP §3 (S15 runbook — major composite-quality lift)
9. AI-11 (skipDangerousModePermissionPrompt removal)
10. AI-8 + AI-9 + AI-10 (new MCPs + activations)
11. AI-12 (design V2 per S11)
12. OP-5 + OP-6 + OP-7 (decisions before W328)
```

Approximate total wall-clock: **~75-90 min for full sequence** (most steps are <10 min each).
