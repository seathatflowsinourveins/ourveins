---
name: Wave 138 Fire 4 Voice 2 sota-researcher pre-install verification
description: STAGED-WITH-3-CRITICAL-CORRECTIONS — protect-mcp v0.6.0 MIT VERIFIED + Tom Farley TIER-4 CONFIRMED via 6 merged Microsoft AGT PRs + IETF active draft + Cedar PR — HOWEVER 5 Wave 138 Fire 1/3 cite errors REFUTED (Cedar PR path WRONG / Microsoft repo name WRONG / wshobson hooks.json STALE-CALLS-NONEXISTENT-SUBCOMMANDS / signed-audit-trails NOT npm / 10K+ downloads OVER-claim REFUTED at 940/mo) — benchmark gate (f) NEEDS-FIXTURES because no `evaluate` subcommand exists
type: detail
date: 2026-05-10
agent: sota-researcher
agentId: ae4eac5d194df9343
wave: 138
fire: 4
voice: 2
---

# Wave 138 Fire 4 Voice 2 sota-researcher — pre-install verification

## VERDICT (one-line)

**STAGED-WITH-3-CRITICAL-CORRECTIONS**: protect-mcp v0.6.0 MIT VERIFIED + Tom Farley TIER-4 CONFIRMED via 6 merged Microsoft AGT PRs + IETF active draft + Cedar PR; **HOWEVER 5 Wave 138 Fire 1/3 cite errors REFUTED** (Cedar PR path WRONG / Microsoft repo name WRONG / wshobson hooks.json STALE-CALLS-NONEXISTENT-SUBCOMMANDS / signed-audit-trails NOT npm / 10K+ downloads OVER-claim REFUTED at 940/mo); benchmark gate (f) **NEEDS-FIXTURES** because no `evaluate` subcommand exists.

## AXIS-A protect-mcp v0.6.0 deep-verify

### A1: License history — FSL→MIT crossover at v0.4.0

| Version | License | Published |
|---|---|---|
| v0.1.0 | FSL-1.1-MIT | 2026-03-14 |
| v0.1.1, v0.2.0, v0.3.x | FSL-1.1-MIT | 2026-03-14 → 2026-03-26 |
| **v0.4.0 (CROSSOVER)** | **MIT** | **2026-03-26T14:57:03Z** |
| v0.4.x → v0.6.0 | MIT | 2026-03-26 → 2026-04-26 |

**RESOLUTION of Wave 138 Fire 3 Voice 2 catch #1**: FSL-1.1-MIT concern was REAL but applies ONLY to v0.1.0–v0.3.3 (deprecated; ~6 weeks old). v0.4.0+ is MIT (per `npm view protect-mcp@<v> license` exhaustive scan). **v0.6.0 IS MIT** — confirmed by:
1. npm registry metadata: `MIT`
2. `Z:/repos/deps/scopeblind-gateway/LICENSE` raw GitHub `https://raw.githubusercontent.com/scopeblind/scopeblind-gateway/main/LICENSE` → "MIT License Copyright (c) 2026 ScopeBlind Pty Ltd (ACN 693 027 440)" verbatim
3. README MIT badge

**v0.5.5 (Wave 138 Fire 1 pinned version) IS MIT** — Voice 2's earlier FSL-1.1-MIT framing was correct for the older versions but did not specify version, creating the false impression that current pin v0.5.5 was non-permissive.

### A2: Source repo + file:line cite anchors

- **Source repo**: `https://github.com/ScopeBlind/scopeblind-gateway` (PUBLIC, fork:true per GitHub API; description "Ed25519 signed receipts + Cedar policies for AI agents and physical devices")
- **Owner**: `ScopeBlind` (GitHub Organization, id 271959651)
- **Maintainer**: `tomjwxf <tommy@scopeblind.com>` (`name: TJF`, `company: ScopeBlind Pty Ltd (ACN: 693 027 440)`, `bio: Ex-HF mngr, zero trust infra`, 59 public repos, account created 2025-08-14)
- **License file**: `https://raw.githubusercontent.com/scopeblind/scopeblind-gateway/main/LICENSE:1-22` MIT verbatim
- **npm registry**: `https://registry.npmjs.org/protect-mcp` v0.6.0 dist `01da48797df02dbb00ccf2d90dd5ee309d55efcb`, integrity `sha512-dgpyoeP3OlDqstKSOqnMr4+...`, unpacked 5.4 MB

### A3: Downloads — Voice 2 catch #2 RESOLVED

- **README claim**: "10K+ monthly downloads" (per Wave 138 Fire 3 Voice 2 cite)
- **Actual (npm-stat point/last-month 2026-04-09 → 2026-05-08)**: **940 downloads** total
- **Daily breakdown**: range 0–147; mode ~20-40/day; visible spikes on v0.5.5 publish day (2026-04-09 = 147) and v0.6.0 publish day (2026-04-26 = 144)
- **GAP**: README ~10x overstated. Use npm-stat `940` figure; **DO NOT cite 10K+ in install ship body** — would propagate Voice 2's earlier OVER claim per FM-20 path-drift cascade defense.

### A4: Dependencies + engines

- **Runtime dep**: `@veritasacta/protocol@^0.1.0` (Apache-2.0; 161.5 KB unpacked; same author tomjwxf; 2 versions; npm-current=0.1.1; deps `@noble/curves` + `@noble/hashes`)
- **Dev deps**: `@types/node@^20.0.0`, `tsup@^8.0.0`, `typescript@^5.0.0`, `vitest@^2.1.9`
- **Node engine**: `>=18.0.0`
- **Bin entrypoint**: `dist/cli.js` (single file, not multi-binary)
- **Tarball contents**: 49 files, README 17.3 KB, dist/ ~7 MB compiled, 9 starter Cedar policies + 7 starter JSON policies

## AXIS-B Tom Farley provenance re-verify

### B1: GitHub identity — TJF (tomjwxf) CONFIRMED

- **Profile**: `https://github.com/tomjwxf` → `name: TJF`, `company: ScopeBlind Pty Ltd (ACN: 693 027 440)`, `blog: www.scopeblind.com`, 59 public repos
- **First name "Tom" maps to "TJF"**: T**om** (J)** F**arley likely; consistent with author tom@scopeblind.com on npm + IETF "Tom Farley" article:author meta tag

### B2: IETF I-D — VERIFIED active

- **URL**: `https://datatracker.ietf.org/doc/draft-farley-acta-signed-receipts/` (HTML title: "draft-farley-acta-signed-receipts-01 - Signed Decision Receipts for Machine-to-Machine Access Control")
- **Author meta tag**: `<meta property="article:author" content="Tom Farley">`
- **Status**: `active` (per page status field)
- **Current revision**: `-01` (started -00, advanced once)
- **Versions list**: -00 + -01

### B3: Microsoft AGT — Wave 138 Fire 3 cite "agentic-cookbook PR#667" REFUTED

- **`microsoft/agentic-cookbook`**: **404 Not Found** (per GitHub API) — Wave 138 Fire 3 cite was WRONG repo name
- **CORRECT repo**: `microsoft/agent-governance-toolkit` (created 2026-03-02; 1463 stars; MIT License; description "AI Agent Governance Toolkit — Policy enforcement, zero-trust identity, execution sandboxing, and reliability engineering for autonomous AI agents. Covers 10/10 OWASP Agentic Top 10")
- **Tom Farley merged PRs in microsoft/agent-governance-toolkit** (verified via GitHub search):
  - PR#1186: "feat: GitHub Pages docs site with MkDocs Material (closes #347)" merged ~2026-04
  - PR#1197: "docs: Tutorial 33 — Offline-Verifiable Decision Receipts" merged 2026-04-19
  - PR#1202: "docs: sb-runtime integration guide (a Veritas Acta receipt format implementation)" merged 2026-04-19
  - PR#1203: "feat: sb-runtime governance skill (signed decision receipts, nono-composable)" merged 2026-04-19
  - **PR#1205**: "examples: sb-runtime-governed — multi-backend receipt portability (PR 3 of 3 from #748)" merged 2026-04-22T00:11:03Z (state=closed, merged_at populated → MERGED)
- **Microsoft AI Agents for Beginners merged PR**: `microsoft/ai-agents-for-beginners/pull/533` "Add Lesson 18: Securing AI Agents with Cryptographic Receipts (closes #503)" merged 2026-04-30T09:46:48Z (Tom Farley as author)
- **Total Microsoft merges**: ≥6 across 2 Microsoft repos, all in 2026-04 window — substantive footprint **CONFIRMED with HIGHER strength than Wave 138 Fire 3 cited**

### B4: Cedar PR — Wave 138 Fire 3 cite "cedar-policy/cedar PR#64" REFUTED

- **`cedar-policy/cedar/pull/64`**: **404 Not Found** (per GitHub API)
- **CORRECT repo + PR**: `cedar-policy/cedar-for-agents/pull/73` "feat: RequestGenerator WASM bindings for Cedar authorization requests" merged 2026-04-20T15:11:17Z (state=closed, merged_at populated → MERGED) by tomjwxf
- **Note**: cedar-for-agents is a SUB-REPO inside cedar-policy org (specifically for agent-context Cedar bindings); `cedar/cedar` is the CORE repo. PR is in correct adjacent repo, just wrong cite path in Wave 138 Fire 3.

### B5: ScopeBlind Pty Ltd ACN — VERIFIED via primary source

- **ACN**: `693 027 440` (Australia) — appears in 3 distinct primary sources:
  1. LICENSE file at scopeblind-gateway: "Copyright (c) 2026 ScopeBlind Pty Ltd (ACN 693 027 440)"
  2. tomjwxf GitHub profile `company` field: "ScopeBlind Pty Ltd (ACN: 693 027 440)"
  3. ScopeBlind GitHub org URL `https://github.com/ScopeBlind`
- **Verifiable**: Australian Securities & Investments Commission (ASIC) ACN lookup at `https://connectonline.asic.gov.au/` would close fully (NOT probed; cite as TIER-3 self-declared until external ASIC probe lands)

### B6: VeritasActa org — DISCOVERED in cite trail

- `VeritasActa/agt-integration-profile/pull/1` merged ("conformance: pre-filled Signet self-certification template (for @willamhou review)")
- `VeritasActa/verify/pull/6` merged ("feat(test-vectors): KU interop fixtures for APS cross-verify")
- `@veritasacta/protocol@0.1.1` published by tomjwxf (Apache-2.0, separate from MIT protect-mcp)
- This is the standards-organization arm; ScopeBlind appears to be the for-profit implementation arm

## AXIS-C Phase 7 benchmark feasibility

### C1: CRITICAL — `evaluate` subcommand DOES NOT EXIST in protect-mcp v0.5.5 OR v0.6.0

- **Documented subcommands** (from `protect-mcp --help` in extracted v0.5.5 + v0.6.0 tarballs, IDENTICAL):
  - `serve [--port <port>] [--enforce] [--policy <path>] [--cedar <dir>]` — HTTP hook server
  - `init-hooks [--dir <path>] [--port <port>]` — generates Claude Code hooks.json
  - `quickstart [--connect]` — full setup wizard
  - `connect` — link to ScopeBlind dashboard
  - `init [--dir <path>]` — basic config init
  - `demo` — demo server
  - `trace <receipt_id> [--endpoint <url>] [--depth <n>]` — receipt tracing
  - `status [--dir <path>]` — server status
  - `digest [--today] [--dir <path>]` — daily digest
  - `receipts [--last <n>] [--dir <path>]` — list receipts
  - `bundle [--output <path>] [--dir <path>]` — bundle receipts for export
  - `simulate --policy <path> [--log <path>] [--tier <tier>] [--json]` — policy testing
  - `report [--period <days>d] [--format md|json] [--output <path>] [--dir <path>]` — generate audit report
- **NEVER documented**: `evaluate`, `sign`, `verify`, `hook-eval`, `bench`
- **String literals in cli.js**: `evaluate`, `sign`, `verify` exist as raw strings but are NOT subcommand routes (likely internal log/event names)
- **Smoke probe**: `node dist/cli.js evaluate --tool Bash --input '...' --policy /tmp/x` returned `[PROTECT_MCP] Error: Missing "--" separator before the command to wrap.` — confirms `evaluate` is interpreted as the wrap-target command

### C2: Wave 138 Fire 1 hooks pin v0.5.5 calls NON-EXISTENT subcommands

**File**: `https://raw.githubusercontent.com/wshobson/agents/main/plugins/protect-mcp/hooks/hooks.json`
**Verbatim content**:

```json
"command": "npx protect-mcp@0.5.5 evaluate --policy ... --tool ... --input ... --fail-on-missing-policy false"
"command": "npx protect-mcp@0.5.5 sign --tool ... --input ... --output ... --receipts ... --key ..."
```

**STATUS**: BOTH commands would FAIL on Claude Code hook firing (missing subcommands). The wshobson plugin's hooks.json is **architecturally broken** vs the canonical CLI surface.

### C3: Canonical install pattern per README + protect-mcp ships its OWN hooks template

- **README canonical Quick Start**: `npx protect-mcp init-hooks` THEN `npx protect-mcp serve` — runs HTTP server at port 9377, hooks POST to `/hook` endpoint
- **Tarball-internal hooks template** at `package/policies/claude-code-hooks.json` calls `npx protect-mcp hook-eval --tool ... --input ...` — but `hook-eval` ALSO does not exist as documented subcommand
- **CONCLUSION**: The CORRECT install pattern (per README + actual CLI surface) is `init-hooks` to GENERATE a hooks.json that points to `serve`-mode HTTP endpoint. The `evaluate`/`sign`/`hook-eval` subcommand syntax in BOTH wshobson plugin AND tarball-internal template appears to be vestigial/broken.

### C4: Phase 7 benchmark recipe (NEEDS-FIXTURES verdict)

**Disposition**: NOT-FEASIBLE for `npx protect-mcp evaluate` direct latency benchmark (subcommand absent).

**FEASIBLE alternative** if Phase 7 install proceeds:

1. `npx protect-mcp@0.6.0 init-hooks --dir /tmp/bench`
2. `npx protect-mcp@0.6.0 serve --port 9377 --policy /tmp/bench/policy.json` (run in background)
3. Benchmark via HTTP: `curl -X POST http://127.0.0.1:9377/hook -d '{"event":"PreToolUse","tool":"Bash","input":{"command":"ls"}}'` × 1000 iterations with `time`
4. Latency target: SLO `<50ms p50, <200ms p99` for HTTP loopback hook server (industry MCP standard)
5. Tamper-detection benchmark: use `simulate --policy ... --log ... --json` for policy simulation throughput
6. Report-shape benchmark: use `report --period 1d --format json` for audit-export throughput

**Required fixtures**:

- Sample Cedar policy file at `policies/cedar/clinejection.cedar` (ships in tarball)
- Synthetic tool-call corpus (1000 PreToolUse + 1000 PostToolUse JSON payloads)
- Receipt-verification client `npx @veritasacta/verify` (separate package; not yet probed for npm existence)

**Verdict for gate (f)**: **NEEDS-FIXTURES + revised benchmark target** (HTTP `/hook` endpoint, NOT CLI subcommand). Wave 138 Fire 4 Voice 1 should NOT specify `npx protect-mcp evaluate` as benchmark target — it would BLOCK on first run.

## AXIS-D signed-audit-trails v0.6.0 quick-probe

### D1: signed-audit-trails IS A WSHOBSON PLUGIN, NOT AN NPM PACKAGE

- **npm probe `signed-audit-trails`**: 404 Not Found (E404; "could not be found or you do not have permission to access it")
- **wshobson plugin**: `https://github.com/wshobson/agents/tree/main/plugins/signed-audit-trails` (CONFIRMED EXISTS via GitHub API; README blob SHA `ba2a46dab249677c6a3626ab86dc2184fa8b89ea`, 2155 bytes)
- **README purpose**: "**A teaching skill** (not a runtime hook): a set of instructions and examples that explain the pattern end-to-end. Use this when you are figuring out whether receipts are the right fit for your project. Once you know they are, install the [`protect-mcp`](../protect-mcp/) plugin for the actual hooks."
- **Single skill file**: `skills/signed-audit-trails-recipe/SKILL.md` (cookbook-style walkthrough)
- **License**: MIT (per README "License" section verbatim)
- **Install via**: `claude plugin install wshobson/agents/signed-audit-trails` (Claude Code plugin install) — NOT `npm install`

### D2: Same author CONFIRMED via PR archaeology

- **wshobson PRs by tomjwxf**:
  - PR#494: "test(protect-mcp): add test/ fixtures and round-trip verification" merged 2026-04-17
  - PR#495: "feat: add review-agent-governance plugin (second inhabitant of governance category)" merged 2026-04-28
  - PR#496: "feat: add signed-audit-trails teaching plugin (third governance-category skill)" merged 2026-04-18
  - PR#497: "chore(protect-mcp): pin protect-mcp@0.5.5 and @veritasacta/verify@0.3.0" merged 2026-04-18
- **Marketplace.json blob SHA**: `7d13929aa36e0e808bd34c7790664e8ce2d9d542` (same SHA Wave 138 Fire 1 cited — VERIFIED unchanged)

### D3: Cross-marketplace cite chain

- README references IETF draft `https://datatracker.ietf.org/doc/draft-farley-acta-signed-receipts/` ✓ confirmed active
- Standards listed: Ed25519 (RFC 8032) + JCS (RFC 8785) + Cedar (AWS) — all primary sources, no fabrication

## Mia self-probes (catches before final return)

### Self-probe #1: protect-mcp@0.6.0 license is MIT, not FSL — Wave 138 Fire 3 Voice 2 framing was version-ambiguous

**Caught**: Voice 2's "FSL-1.1-MIT npm v0.1.0 vs README MIT" implied current pin v0.5.5 might have license issue. Empirical scan: v0.4.0+ ALL MIT. The Wave 138 Fire 3 framing was technically true (v0.1.0 IS FSL-1.1-MIT) but obsolete-version-anchored. Current pin v0.5.5 is MIT. Voice 2's catch was a TRUE-POSITIVE for ARCHIVED versions but irrelevant to install decision.

### Self-probe #2: 940/month vs 10K+ — Voice 2 catch CONFIRMED + measurement methodology recorded

**Caught**: Voice 2's catch is REAL. Empirical npm-stat last-month range = 940 downloads. README "10K+" claim cannot be verified — likely vendor-aspirational marketing text or pre-release projection. **DO NOT propagate "10K+" in any install commit body** — cite npm-stat 940 figure with date range.

### Self-probe #3: Cedar PR cite WRONG — Wave 138 Fire 3 cite path needs correction in Fire 4

**Caught**: Wave 138 Fire 3 said "Cedar PR#64" — actual is `cedar-for-agents/pull/73`. Fix in Fire 4 ship body.

### Self-probe #4: Microsoft AGT repo name WRONG — Wave 138 Fire 3 cite refuted

**Caught**: Wave 138 Fire 3 said "Microsoft AGT PR#667 MERGED" — actual repo is `microsoft/agent-governance-toolkit`, not `microsoft/agentic-cookbook` (404). PR numbers are 1186/1197/1202/1203/1205 (5 merged) NOT 667. Fix in Fire 4 ship body.

### Self-probe #5: `evaluate`/`sign` subcommands don't exist — major hook-breakage finding

**Caught**: Wave 138 Fire 1+3 cite to `wshobson/agents/plugins/protect-mcp/hooks/hooks.json` v0.5.5 hook config calling `npx protect-mcp@0.5.5 evaluate ... sign ...` — these subcommands don't exist. The hook config would FAIL on first PreToolUse. Phase 7 install must use `init-hooks` + `serve` HTTP pattern, NOT direct subcommand invocation. **Critical gate-blocking finding for Fire 4 install**.

### Self-probe #6: signed-audit-trails as npm package was Wave 138 Fire 3 framing OVER

**Caught**: Wave 138 Fire 3 implied `signed-audit-trails@0.6.0` exists (similar versioning to protect-mcp v0.6.0). It does NOT — npm 404. It's a pure wshobson plugin (Claude Code plugin format only), NOT an npm package. Install path is `claude plugin install wshobson/agents/signed-audit-trails`.

## Open questions for orchestrator (HONEST-NON-FINDING)

1. **`@veritasacta/verify` package existence + version**: Wave 138 Fire 1 hooks pin says `@veritasacta/verify@0.3.0`. NOT probed in this fire — should verify via `npm view @veritasacta/verify` before install.
2. **ASIC ACN 693 027 440 verification**: Australian company registry probe at `connectonline.asic.gov.au` not done — would close ScopeBlind Pty Ltd legal-entity question fully (currently TIER-3 self-declared via GitHub profile + LICENSE).
3. **Phase 7 benchmark target SLO**: I proposed `<50ms p50, <200ms p99` for HTTP loopback hook server based on industry MCP standard inference. NOT cited to a specific upstream SOTA SLO benchmark — needs sota-researcher confirmation in Fire 4 design.
4. **`hook-eval` vs `evaluate` vs `sign` subcommands — vestigial or hidden?**: All 3 appear as string literals in compiled cli.js but none are documented subcommands. They MAY be hidden subcommands invoked by `init-hooks`-generated hooks.json template. Need to RUN `init-hooks` in sandbox to see what subcommand pattern it actually generates, then compare to the broken wshobson hooks.json. (Risk: wshobson plugin's hooks.json may have been auto-generated by an OLDER protect-mcp version that DID expose `evaluate`/`sign` subcommands.)
5. **Tom Farley email `tommy@scopeblind.com` provenance**: VERIFIED via npm maintainers metadata, but not cross-verified to a public scopeblind.com page or LinkedIn — non-blocking but adds confidence if needed.
6. **review-agent-governance NOT re-probed this fire** (Fire 3 REJECT-FOR-FIT decision stands — not in Fire 4 install scope).

---

## Critical findings ranked by urgency

| # | Finding | Severity | Action |
|---|---|---|---|
| 1 | `evaluate`/`sign` subcommands DON'T EXIST — wshobson hooks.json broken | **GATE-BLOCKING** | Re-architect install to use `init-hooks` + `serve` HTTP pattern; reject the wshobson plugin's hooks.json as-is |
| 2 | Cedar PR cite path WRONG in Wave 138 Fire 3 (cedar-for-agents/pull/73 not cedar/cedar PR#64) | HIGH | Update Fire 4 ship body cite-trail per FM-20 path-drift cascade defense |
| 3 | Microsoft AGT repo name WRONG in Wave 138 Fire 3 (agent-governance-toolkit not agentic-cookbook) | HIGH | Update Fire 4 ship body cite-trail; substantive footprint actually STRONGER than cited (5+ merged PRs) |
| 4 | signed-audit-trails NOT npm package — wshobson plugin only | MEDIUM | Update install plan to use `claude plugin install` not `npm install` for signed-audit-trails |
| 5 | Downloads 940/mo NOT 10K+ as README claims | LOW (provenance) | Cite npm-stat 940 in install body; do not propagate README's marketing claim |
| 6 | License v0.4.0+ MIT (v0.1.0–v0.3.3 was FSL-1.1-MIT) | LOW (resolved) | v0.5.5 + v0.6.0 are MIT — install proceeds |
