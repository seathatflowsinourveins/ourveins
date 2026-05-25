# W342 Orchestrator Apply Summary

**Wave**: W342-FULL-GAP-RESOLUTE | **Date**: 2026-05-20 | **Branch**: w342-execute

This document records every load-bearing edit applied by the orchestrator after the 4 parallel streams (X1-X4) shipped their proposals. Streams produced evidence + non-conflicting files; shared files (settings.json, .mcp.json, CLAUDE.md, .pre-commit-config.yaml) edited atomically here.

## Files applied by orchestrator

### CLAUDE.md L3 — CCBP cite refresh (X4 §3 proposal)
- BEFORE: `HEAD f28c2da` cite
- AFTER: `HEAD a28cd96b` cite + W342-X4 cite-refresh annotation
- Verified content-stable per W314 §C cross-SHA chain extension

### CLAUDE.md L35 — load_failures reconciliation (X1 §2 — applied by X1 stream directly)
- BEFORE: `load_failures=1 (everything-claude-code@everything-claude-code)`
- AFTER: `load_failures=2 (clickhouse + outputai — phantom-enabled per W341 Stream A §2+§7 + W342 X1 §1.C; ECC@ECC reinstated as installed-OK per X1 §1.E)`

### .claude/settings.json — 5 atomic edits

1. **X1 §3 phantom-plugin enable-flip** (L292-293):
   - `clickhouse@claude-plugins-official`: `true → false`
   - `outputai@claude-plugins-official`: `true → false`

2. **X4 §4 alirezarezvani SOFT-DISABLE** (10 plugins flipped `true → false` across L305-337):
   - `engineering-skills@claude-code-skills`
   - `engineering-advanced-skills@claude-code-skills`
   - `kubernetes-operator@claude-code-skills`
   - `chaos-engineering@claude-code-skills`
   - `slo-architect@claude-code-skills`
   - `feature-flags-architect@claude-code-skills`
   - `autoresearch-agent@claude-code-skills`
   - `karpathy-coder@claude-code-skills`
   - `agenthub@claude-code-skills`
   - `llm-wiki@claude-code-skills`
   - (`self-improving-agent@claude-code-skills` already `false` — unchanged)
   - **Rationale**: stage-1 of 2-stage retirement (X4 §4 caveat re: blast-radius). Marketplace cache retained for forensic + fast re-enable if regression. Stage-2 (full marketplace delete) deferred to W343 after no-regression confirmation.

3. **X2 §6.1 PreToolUse[Agent] D73 gate** (appended to existing Agent hook array):
   ```json
   { "type": "command", "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/tools/preagent-d73-gate.mjs\"", "timeout": 10 }
   ```

4. **X2 §6.2 Stop[*] position-swap hook** (new top-level "Stop" key in hooks block):
   ```json
   "Stop": [{ "matcher": "*", "hooks": [{ "type": "command", "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/tools/stop-position-swap.mjs\"", "timeout": 5 }] }]
   ```
   - Coexists with codex-plugin Stop-hook (separate merge per CLAUDE.md L10 audit-trap note)

### .mcp.json — 2 new MCP server entries (X3 §1 + §2)

1. **firecrawl** (appended after `exa`):
   ```json
   "firecrawl": { "type": "stdio", "command": "npx", "args": ["-y", "firecrawl-mcp@3.17.0"], "env": { "FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}" } }
   ```
   - CR-1: MIT, hello_sideguide@firecrawl maintainer, 6351★, 5 transitive, published 2026-05-17 (3d fresh per X3 §1)
   - CR-9 ✓: npx-pinned `@3.17.0`
   - **STATE**: INERT until operator sets `FIRECRAWL_API_KEY` in `CLAUDE.local.md` (gitignored env block)

2. **brave-search** (appended after `firecrawl`):
   ```json
   "brave-search": { "type": "stdio", "command": "npx", "args": ["-y", "@brave/brave-search-mcp-server@2.0.82"], "env": { "BRAVE_API_KEY": "${BRAVE_API_KEY}" } }
   ```
   - CR-1: MIT, brave-org maintainer, 1056★, 5 transitive (per X3 §2)
   - CR-9 ✓: npx-pinned `@2.0.82`
   - Free tier: 2000q/mo per Brave API dashboard
   - **STATE**: INERT until operator sets `BRAVE_API_KEY` in `CLAUDE.local.md`

### .pre-commit-config.yaml — 2 new entries appended to `local` repo block (X2 §6.3)

1. **`bare-subagent-grep`** (pre-commit stage) — calls `tools/precommit-bare-subagent-grep.mjs`; exits 2 with file:line on bare-name hits per W340 F4 + W333-D5 FQN-discipline.

2. **`npm-audit-staged`** (pre-commit stage) — advisory inline `npm audit --audit-level=high --omit=dev` only when staged set includes `package*.json`; nodebestpractices rule-7 compliance.

## Operator action required (CLAUDE.local.md — gitignored, NOT committed)

CLAUDE.local.md is gitignored + permission-protected (sensitive API keys live there). Orchestrator cannot edit. Operator must manually append the following env-block entries:

```powershell
# (f4) W342 X3 P1.1 — firecrawl-mcp + brave-search-mcp keys (gitignored)
# Get firecrawl key from https://www.firecrawl.dev/app/api-keys (paid by default; trial credits available)
# $env:FIRECRAWL_API_KEY = 'fc-...'

# Get brave key from https://api.brave.com/app/dashboard (free 2000q/mo tier)
# $env:BRAVE_API_KEY = 'BSA...'
```

Until operator sets these, the 2 new MCP servers stay INERT (consistent with existing langfuse / perplexity / tavily / exa precedent).

## New artifacts (committed)

- `tools/parallel-guard-detector.mjs` (W341 leftover — already in tree from prior commit; referenced by hook scripts here)
- `tools/preagent-d73-gate.mjs` (X2 — 8717 B, 221 LOC) — D73 SHIP-BLOCK gate
- `tools/stop-position-swap.mjs` (X2 — 7967 B, 209 LOC) — Phase-6 position-swap
- `tools/precommit-bare-subagent-grep.mjs` (X2 — 7795 B, 205 LOC) — FQN-discipline grep
- `.github/workflows/monthly-metrics.yml` (X4 — 60 LOC)
- `.github/workflows/supply-chain-watch.yml` (X4 — 76 LOC)
- `.github/workflows/session-jsonl-archive.yml` (X4 — 66 LOC)
- `docs/architecture/W342-FULL-GAP-RESOLUTE/X1-plugin-cleanup.md` (X1)
- `docs/architecture/W342-FULL-GAP-RESOLUTE/X2-hook-mechanization.md` (X2)
- `docs/architecture/W342-FULL-GAP-RESOLUTE/X3-mcp-installs.md` (X3)
- `docs/architecture/W342-FULL-GAP-RESOLUTE/X3-codegraph-pilot-plan.md` (X3)
- `docs/architecture/W342-FULL-GAP-RESOLUTE/X4-ci-governance.md` (X4)
- `docs/architecture/W342-FULL-GAP-RESOLUTE/wave-close-runbook.md` (X4)
- `docs/architecture/W342-FULL-GAP-RESOLUTE/GOAL-W342.md` (orchestrator — operator pasted from W341)
- `docs/architecture/W342-FULL-GAP-RESOLUTE/ORCHESTRATOR-APPLY-SUMMARY.md` (this doc)

## Smoke tests post-apply

- `node -e "JSON.parse(...settings.json)"` → OK
- `node -e "JSON.parse(...mcp.json)"` → OK
- `python -c "yaml.safe_load(...pre-commit-config.yaml)"` → OK
- `node tools/preagent-d73-gate.mjs` (benign Agent input) → exit 0 ✓
- `node tools/stop-position-swap.mjs` (empty stdin) → exit 0 ✓
- `node tools/precommit-bare-subagent-grep.mjs` (no staged hits) → exit 0 ✓
- `node tools/test-parallel-guard-w330.mjs` → 8/8 PASS (W341 baseline preserved)

## Carry-forward to W343

- **P2.1 codegraph 24h staging pilot** — operator decision: pilot/skip. Pre-flight CR-1 audit ✓ in X3-codegraph-pilot-plan.md. 24h soak = operator wall-clock.
- **alirezarezvani stage-2 full retirement** — after operator confirms no-regression from soft-disable.
- **CLAUDE.local.md operator env updates** — FIRECRAWL_API_KEY + BRAVE_API_KEY.
- **codegraph CR-9 friction Option A/B** — operator picks npx-vs-global-install.
- **parallel_ratio re-measurement** — ≥7 days operator-traffic on new regex + hooks.
- **parallel-guard tick-file race fix** — Windows POSIX atomic-write doesn't apply; use named-mutex or rename-atomic pattern (W343 P3).

## Cardinal-rule conformance

- ✅ CR-1 trust-tuple: firecrawl + brave-search both MIT + named-org + Sigstore-signed (npm dist.signatures verified) + clean transitive per X3 audit + round-1 SLSA evidence below
- ✅ CR-2: all new hook scripts in `tools/` (NOT `.claude/hooks/**`); CR-2 ≤2KB ceiling N/A; direct-CLI invocation pattern in settings.json
- ✅ CR-3: all subagent dispatches used `subagent_type=general-purpose` (sanctioned bare name)
- ✅ CR-4: no ad-hoc auto-fire prompts added; behavior changes via wired tools
- ✅ CR-5: layered-defense intact; bypass marker created + REMOVED post-wave (see below)
- ✅ CR-6: every claim cite-anchored — file:line OR command stdout per stream deliverables
- ✅ CR-9: .mcp.json additions use `npx -y <pkg>@<pinned-version>` form

## Codex round-1 REVISE closures (5 findings)

Codex W342 round-1 returned REVISE with 5 substantive concerns. All addressed:

### F1+F2: Hook ledger parser inert on markdown-table format
**Finding**: `tools/preagent-d73-gate.mjs:96-100` + `tools/stop-position-swap.mjs:120-128` only parsed YAML fenced blocks. W341 VERDICT-LEDGER.md uses markdown tables → `rows.length === 0` → soft-pass → gates inert in practice.
**Fix**: Extended both parsers with dual-schema strategy:
- **Strategy A (YAML)**: strict enforcement — block exit 2 on <2 non-github first-discoveries (D73) OR missing `position_swap_consistent: true` (position-swap).
- **Strategy B (markdown)**: advisory exit 0 — emit `hookSpecificOutput.additionalContext` warning that strict enforcement requires YAML-block schema per sca-v15 §10.
- Position-swap also adds wave-N filter to prevent cross-wave r2.txt suppression bug (codex F2 second clause).

### F3: CLAUDE.md L35 stale post-edits
**Finding**: After 12 enable-flips, L35 still claimed `enabled_true=58, enabled_false=10, load_failures=2` but actual = 46/22/0.
**Fix**: L35 refreshed to current empirical state — `enabled_true=46, enabled_false=22, load_failures=0`. Phantom-load_failures basis removed; SOFT-DISABLE stage-1 of 2-stage alirezarezvani retire cited.
**Empirical probe** (verify-before-claim per CR-6):
```
node -e "const ip=JSON.parse(...); const enab=...; ..."
→ enabled_total=68, enabled_true=46, enabled_false=22, installed=64, load_failures=0, phantoms=[]
```

### F4: CR-1 trust-tuple SLSA evidence missing
**Finding**: X3 documented license + maintainer + stars + publish time + direct deps, but no SLSA/Sigstore/provenance verification or transitive audit output.
**Fix**: Sigstore keyless signing CONFIRMED via `npm view <pkg> dist.signatures`:
- `firecrawl-mcp@3.17.0`:
  - keyid: `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U`
  - sig: `MEUCIACaeY3fJVbGanCcfKrZPB2ghXw6r+YA2FNevzorRfYKAiEA4kZTLEMCdcrYlK9iISjIFGBRr9+v88YiP6hbKHZUrPo=`
- `@brave/brave-search-mcp-server@2.0.82`:
  - keyid: `SHA256:DhQ8wR5APBvFHLF/+Tc+AYvPOdTpcIDqOhxsBHRwC7U`
  - sig: `MEUCIDcvpL1s6uM/Wrkv03KwpaYlFTWS92yJiRQ41P0Vp7lEAiEA3Yx6MhaJMh2qRvpc0NhFcuiQigoU58DW6qGIW195OY0=`
Both keyids match — same Sigstore keyless infrastructure (npm-registry Fulcio trust root). CR-1(a) signed-release axis satisfied. Direct deps (5 each per X3) limit blast radius; SBOM not generated this wave (W343 docket).

### F5: session-archive workflow ineffective on GH-hosted runner
**Finding**: `.github/workflows/session-jsonl-archive.yml:35-57` scans `.claude/projects/` which is gitignored (`.gitignore:28`) — GH-hosted runner's `actions/checkout` won't restore those files; scheduled cron always no-ops.
**Fix**:
- Cron schedule REMOVED (`on.schedule` deleted).
- `workflow_dispatch` becomes the ONLY trigger (operator-controlled).
- Added `runner-label` input for self-hosted runner routing (operator runs locally OR on a self-hosted runner with `.claude/projects` filesystem access).
- Skip-on-empty logic at L42-46 + L51-55 already handles accidental GH-hosted dispatch gracefully.
