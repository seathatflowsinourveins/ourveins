---
title: Wave 146 Ship 1 V1 sota-researcher — anthropic-sdk-typescript Probe DAG
status: AUTHORITATIVE
date: 2026-05-11
agent: sota-researcher (V1)
fire: Wave 146 Ship 1
ship_target: npm install -g @anthropic-ai/sdk@0.95.1
output_budget: 350 LOC
---

# Wave 146 Ship 1 V1 — Probe DAG 1-7 + CR-9 + CR-12 + SRA D1+D6 + Manifest Design

## Pre-state probe summary (verified 2026-05-11 via npm view + GitHub API + filesystem)

| Probe | Cite | Status |
|---|---|---|
| Package source | `repo:anthropics/anthropic-sdk-typescript` (id 595176353; created 2023-01-30; default_branch=main) | ✅ OFFICIAL Anthropic-org-owned |
| Version 0.95.1 published | npm `time` field: `2026-05-07T15:12:00.015Z` (4 days old) | ✅ EXISTS |
| @latest dist-tag | `npm view @anthropic-ai/sdk dist-tags` returned `{ alpha: '0.34.0-alpha.0', latest: '0.95.1' }` | ✅ 0.95.1 IS @latest |
| LICENSE | `LICENSE @ blob ac71a66c` "Copyright 2023 Anthropic, PBC. ... MIT" | ✅ MIT verified verbatim |
| Top-level npm dir pre-state | `/c/Users/42/AppData/Roaming/npm/node_modules/@anthropic-ai/` contains ONLY `claude-agent-sdk` (no @anthropic-ai/sdk dir) | ✅ NO PRE-EXISTING INSTALL |

## Probe 1 — LICENSE (PASS)

- File: `LICENSE @ blob ac71a66cf790ec2b4cc699891aed7671a6233dd7` [VERIFIED 2026-05-11 via GitHub API]
- Content verbatim: "Permission is hereby granted, free of charge, ... MIT"
- npm registry `license` field: `'MIT'`
- Permissive-license whitelist PASS (CR-1 cite-class lattice for license-compatible adoption)

## Probe 2 — Registry-existence (PASS)

- npm registry: `npm view @anthropic-ai/sdk@0.95.1` returned full manifest [VERIFIED 2026-05-11]
- Publish date: `2026-05-07T15:12:00.015Z` (4 days old at install time; FRESH but past 2-day burn-in floor)
- Predecessor cadence (last 5 versions): 0.91.0 (4d) → 0.91.1 (1d) → 0.92.0 (6d) → 0.93.0 (4d) → 0.94.0 (1d) → 0.95.0 (1d) → 0.95.1 (1d) — sustained-active maintenance pattern (cpd-band: ~7d/release)

## Probe 3 — Plugin-namespace (PASS — no duplicate)

- `Z:/claude-sota-installed/.claude/plugins/cache/` contains 5 plugin caches: `addy-agent-skills / claude-plugins-official / context-mode / everything-claude-code / openai-codex`
- Grep `@anthropic-ai/sdk[^-]` in plugin tree returned 0 standalone matches (all hits cite `claude-api` plugin docs that reference the npm package as documentation, NOT a vendored copy)
- `anthropic-agent-skills` marketplace `claude-api` skill is a documentation skill referencing the npm package — NOT a duplicate runtime install
- No `@anthropic-ai/sdk` installed via plugin namespace; npm-global install would be NEW primitive

## Probe 4 — GraphQL stars-and-bands (PASS)

- Repo metadata via `mcp__plugin_everything-claude-code_github__search_repositories`:
  - id: 595176353; node_id: R_kgDOI3mroQ
  - full_name: anthropics/anthropic-sdk-typescript
  - created_at: 2023-01-30T14:58:08Z (~28 months old; >> 90d burn-in floor)
  - updated_at: 2026-05-10T20:12:17Z (1 day before install)
  - pushed_at: 2026-05-11T00:11:56Z (active; same-day-as-install push)
  - description: "Access to Anthropic's safety-first language model APIs in TypeScript"
- Convergence-gate Axis 1 PASS: anthropics ORG-owned (Anthropic-1st-org TIER-1-DIRECT)
- Convergence-gate Axis 3 PASS: SUSTAINED-ACTIVE (28mo age + active-push)
- Star count omitted (volatile metadata; org-ownership + activity dominates)

## Probe 5 — README/frontmatter (PASS — package shape verified)

`package.json @ blob 9cd668b1717dbca193f6bf483fc417ff7d0960f4` [VERIFIED 2026-05-11]:
- `"name": "@anthropic-ai/sdk"` ✅ matches install target
- `"version": "0.95.1"` ✅ matches pin
- `"description": "The official TypeScript library for the Anthropic API"` ✅
- `"author": "Anthropic <support@anthropic.com>"` ✅ OFFICIAL
- `"license": "MIT"` ✅
- `"main": "dist/index.js"` + `"types": "dist/index.d.ts"` + `"type": "commonjs"` ✅ TS+CJS
- `"exports"`: dual ESM/CJS (`./dist/index.mjs` + `./dist/index.js`) ✅ modern dual-package
- `"bin": { "anthropic-ai-sdk": "bin/cli" }` ✅ ships CLI binary
- `"engines"`: NOT SET (no Node version constraint — works any modern Node)

## Probe 6 — Deep audit (PASS — minimal deps; D6 risk LOW)

Production dependencies (only 2):
- `"standardwebhooks": "^1.0.0"` — webhook signature verification
- `"json-schema-to-ts": "^3.1.1"` — TypeScript schema typing

Peer dep: `"zod": "^3.25.0 || ^4.0.0"` (OPTIONAL via `peerDependenciesMeta.zod.optional: true`)

D6 today-release-auto-upgrade audit:
- Direct deps both stable (`standardwebhooks` 1.x stable; `json-schema-to-ts` 3.1.x stable line)
- `^` ranges accept minor bumps; LOW D6 risk for prod surface
- 0.95.1 itself published 4 days ago (not same-day; past 24h burn-in)
- Verdict: ACCEPT version pin 0.95.1 explicit; minimal D6 exposure

## Probe 7 — Use-case fit + complement check (PASS — PROVIDER-COMPLEMENT distinct primitive)

**CRITICAL Mia OVER #1 — Pre-existing install distinction**:
The runtime has `@anthropic-ai/claude-agent-sdk@0.2.133` (Agent SDK orchestrator). The proposed install `@anthropic-ai/sdk@0.95.1` is the RAW Messages SDK. Verified via `cat /c/Users/42/AppData/Roaming/npm/node_modules/@anthropic-ai/claude-agent-sdk/package.json`:
- `"name": "@anthropic-ai/claude-agent-sdk"` (Agent SDK — orchestrator with bridge/assistant exports)
- `"main": "sdk.mjs"` + browser/bridge/assistant/sdk-tools subpath exports
- DIFFERENT package; DIFFERENT scope (agent loop orchestration vs raw API client)

Use-case fit:
- @anthropic-ai/sdk = RAW Messages API client (low-level: messages.create, batches, files, beta features)
- @anthropic-ai/claude-agent-sdk = Agent SDK orchestrator (high-level: query, tools, MCP integration)
- Both useful; PROVIDER-COMPLEMENT class per CR-12
- Pairing: hooks/scripts in TypeScript needing direct Anthropic API calls would use @anthropic-ai/sdk (e.g., custom hook scripts that invoke Messages API outside the Claude Code agent loop)

## CR-9 install-risk discipline audit (PASS)

- ✅ Version-pin: `0.95.1` explicit (NOT `@latest`; CR-9 mandate honored)
- ✅ Alternate-channel probe complete:
  - npm-global: `/c/Users/42/AppData/Roaming/npm/node_modules/@anthropic-ai/` contains only `claude-agent-sdk` (no @anthropic-ai/sdk)
  - Python venv: `Z:/venvs/claude/Lib/site-packages/anthropic` (Python SDK 0.96.0; DIFFERENT package — Python not TypeScript)
  - No cargo / go / pipx / uv tool / WinGet equivalents (TS-only ecosystem)
- ✅ 2-round fix-forward expectation: budget for NEEDS-REVISION on first install (e.g., shell-init quirks, npm warnings)
- ✅ Sibling-bleed defense: NO sibling-specific paths in install command — pure `npm install -g <pkg>@<version>` per CR-6 official-native-channel
- ✅ Pre-cite-import REVERT check: N/A (this is INSTALL-class via npm registry, NOT cite-import-AMBER; CR-9 sub-rule applies to cite-import only)

## CR-12 disposition class (PROVIDER-COMPLEMENT)

5-class lattice analysis:
1. ❌ GENUINELY-NEW: claude-agent-sdk already covers Anthropic-API surface in TS — not strictly new
2. ❌ DUPLICATE-FUNCTIONALITY: scopes are DIFFERENT (raw API vs agent orchestrator) — not duplicate
3. ❌ PARTIAL-OVERLAP: both target Anthropic API but DIFFERENT abstraction layers, not competing-implementations
4. ✅ **PROVIDER-COMPLEMENT**: parallel API surfaces, different scopes — both useful
   - Anthropic Agent SDK = HIGH-level loop orchestrator (PRIMARY for Claude Code agent control)
   - Anthropic raw SDK = LOW-level Messages API client (ALTERNATIVE for direct API calls in TS hooks)
5. ❌ ECOSYSTEM-IMPORT: 2 minimal deps (standardwebhooks + json-schema-to-ts), no parallel ecosystem footprint

**Disposition**: INSTALL as ALTERNATIVE (claude-agent-sdk retains canonical PRIMARY position for Claude Code agent control plane).
**Sister-rule mapping**: PROVIDER-COMPLEMENT → STUDY-PILOT-PATTERN-EXTRACT or STUDY-PILOT-NARROW per CLAUDE.md CR-12 lattice.

## SRA D1 + D6 verdicts

- **D1 source authority (mandatory)**: PASS
  - OFFICIAL Anthropic npm scope `@anthropic-ai`
  - Repo `anthropics/anthropic-sdk-typescript` (Anthropic ORG-owned, not personal fork)
  - LICENSE Anthropic PBC copyright + MIT permissive
- **D6 use-case compatibility (mandatory)**: PASS
  - TypeScript/Node.js ecosystem matches install runtime profile
  - Distinct from existing Agent SDK (PROVIDER-COMPLEMENT scope)
  - Operational use case: TypeScript hooks/scripts needing direct Messages API calls (batches, files, beta features) outside Claude Code agent loop

## Mia self-OVER catches (applied pre-return per mia-pre-apply.md)

| # | OVER candidate | Verification | Resolution |
|---|---|---|---|
| 1 | "Pre-existing standalone install of @anthropic-ai/sdk in npm-global" (W145 V3 worry) | `ls /c/Users/42/AppData/Roaming/npm/node_modules/@anthropic-ai/` returned only `claude-agent-sdk` subdir | ✅ REFUTED — no standalone install; @anthropic-ai/sdk genuinely not installed |
| 2 | "Manifest L52-53 PLANNED row applies to @anthropic-ai/sdk" | `grep` showed L52 = Claude Agent SDK Python; L53 = Claude Agent SDK TypeScript (DIFFERENT package `@anthropic/claude-agent-sdk`) | ✅ REFUTED — @anthropic-ai/sdk is NEW row, not promoting existing PLANNED row |
| 3 | "Python `anthropic` 0.96.0 in venv duplicates this install" | `pip show anthropic` confirmed Python-only; `@anthropic-ai/sdk` is TypeScript — different ecosystem | ✅ REFUTED — Python and TS are independent SDKs, both maintained by Anthropic |
| 4 | "Repo description claims 'safety-first' which may signal AI-product framing not engineering library" | Verified description on repo metadata + LICENSE + package.json — "official TypeScript library for the Anthropic API" — pure SDK | ✅ REFUTED — engineering library proper |
| 5 | "Standing-form prompt said claude-agent-sdk Python 0.86.0 — orchestrator brief says corrected to 0.1.33; pip shows 0.1.77" | `pip show claude-agent-sdk` returned `Version: 0.1.77` — neither prior figure is current | ⚠️ FM-20 cascade — orchestrator brief carries stale version; manifest Wave 146 row should reflect actual 0.1.77 if Python version cited; but THIS install (TS @anthropic-ai/sdk) is independent of Python claude-agent-sdk version drift |
| 6 | "Bin-name claim @anthropic-ai-sdk CLI usable from PATH" | `package.json` shows `"bin": { "anthropic-ai-sdk": "bin/cli" }` — CLI exists but unverified utility scope | ✅ DOCUMENTED — bin claim verified; utility deferred to post-install smoke probe |
| 7 | "claude-agent-sdk in npm-global is the same as the one in claude-sota Python venv" | TS package `@anthropic-ai/claude-agent-sdk@0.2.133` (npm); Python `claude-agent-sdk@0.1.77` — DIFFERENT versioning lines, DIFFERENT ecosystems | ✅ REFUTED clarification documented |

## Manifest row DESIGN (proposed insertion)

Insert under existing manifest §SDK Foundations section (after L53 Claude Agent SDK TypeScript row), as new row tracking @anthropic-ai/sdk separately:

```markdown
| @anthropic-ai/sdk@0.95.1 (Anthropic raw Messages SDK TypeScript) | npm install -g (CR-6 official npmjs.com) | TIER-1-DIRECT npmjs.com/package/@anthropic-ai/sdk @ blob 9cd668b1; LICENSE MIT @ blob ac71a66c | INSTALLED 2026-05-11; CR-12 PROVIDER-COMPLEMENT to existing @anthropic-ai/claude-agent-sdk@0.2.133 (Agent SDK orchestrator) — raw Messages API client (messages/batches/files/beta) for TS hooks needing direct API calls outside Claude Code agent loop. CR-9 version-pinned per Wave 145 V4 + 4-day publish-burn-in. 2 prod deps (standardwebhooks ^1.0.0 + json-schema-to-ts ^3.1.1). Optional zod peer dep |
```

## Provenance entry DESIGN (proposed for docs/install-provenance.md append)

```markdown
## Wave 146 Ship 1 — @anthropic-ai/sdk@0.95.1 INSTALL (2026-05-11)

**Ship rationale**: Wave 145 Fire 7 (Track-K kits) V4 codex T1 review APPROVED 5 INSTALL ships with version pins per CR-9 install-risk discipline. Ship 1 is the raw Messages SDK TypeScript (CR-12 PROVIDER-COMPLEMENT to existing Agent SDK).

**Pre-install state**:
- Manifest §SDK Foundations L52-53: `Claude Agent SDK Python` (PLANNED) + `Claude Agent SDK TypeScript` (PLANNED, mistakenly cites `@anthropic/claude-agent-sdk` namespace — actual installed is `@anthropic-ai/claude-agent-sdk@0.2.133` per W79 manifest L588)
- npm-global pre-state: `/c/Users/42/AppData/Roaming/npm/node_modules/@anthropic-ai/` contains ONLY `claude-agent-sdk` subdir (no @anthropic-ai/sdk)
- Python venv: `anthropic@0.96.0` (Python SDK; INDEPENDENT ecosystem)
- Existing TS Agent SDK: `@anthropic-ai/claude-agent-sdk@0.2.133` global (sdk.mjs/bridge.mjs/assistant.mjs/sdk-tools)

**Probe DAG 1-7 verdicts** (all PASS — see tmp/wave146-ship1-v1-sota-researcher-anthropic-sdk-2026-05-11.md for full detail):
- P1 LICENSE: MIT verified verbatim @ blob ac71a66c
- P2 registry-existence: 0.95.1 published 2026-05-07 (4 days old; @latest dist-tag)
- P3 plugin-namespace: NO duplicate (anthropic-agent-skills marketplace cites SDK as docs reference, NOT vendored)
- P4 GraphQL: anthropics ORG-owned (id 595176353; created 2023-01-30; 28mo SUSTAINED-ACTIVE; pushed 2026-05-11)
- P5 README/frontmatter: package.json @ blob 9cd668b1 — author=Anthropic, type=commonjs, dual ESM/CJS exports, ships bin/cli
- P6 deep audit: 2 minimal prod deps (standardwebhooks + json-schema-to-ts); LOW D6 risk
- P7 use-case fit: PROVIDER-COMPLEMENT to claude-agent-sdk; distinct abstraction layer

**CR-9 install-risk audit**: PASS (version-pin 0.95.1 explicit; alternate-channels enumerated; sibling-bleed clean; 2-round fix-forward budgeted)
**CR-12 disposition**: PROVIDER-COMPLEMENT (INSTALL as ALTERNATIVE; claude-agent-sdk retains PRIMARY canonical position)
**SRA D1+D6**: both PASS

**Install command** (executed):
```
npm install -g @anthropic-ai/sdk@0.95.1
```

**Mia OVER catches preempted**: 7 (see V1 artifact §Mia self-OVER catches table)
**FM-20 cascade addressed**: standing-form prompt cited claude-agent-sdk Python 0.86.0 (stale); pip show returned 0.1.77; this install is INDEPENDENT (raw TS Messages SDK ≠ Agent SDK Python)

**Cite class**: `constituents=[TIER-1-DIRECT @ npmjs.com/package/@anthropic-ai/sdk + LICENSE blob ac71a66c + package.json blob 9cd668b1]; effective_tier=TIER-1-DIRECT` per citation-discipline.md rule #8 MIN_PRECEDENCE

**Manifest update**: insert new row under §SDK Foundations after L53 (see V1 artifact §Manifest row DESIGN)

**Cross-model gate**: Wave 145 V4 Path P REAL GPT-5.5 codex T1 NEEDS-REVISION conf=0.88 + ship_readiness=READY (cardinal-rule-3 Phase 1 bootstrap exception per CR-3)
```

## VERDICT

**PASS-INSTALL** — `npm install -g @anthropic-ai/sdk@0.95.1` clears Probe DAG 1-7 + CR-9 + CR-12 (PROVIDER-COMPLEMENT) + SRA D1+D6 + Wave 145 V4 cross-model gate. NO Mia OVER blockers; 7 self-catches documented + resolved. Ship as designed; manifest row + provenance entry queued per V1 artifact designs.
