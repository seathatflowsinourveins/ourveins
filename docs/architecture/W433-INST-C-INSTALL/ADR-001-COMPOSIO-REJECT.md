# ADR-001 — ComposioHQ/composio REJECT-for-runtime-install / ACCEPT-as-cite-reference (W433-INST-C)

**Status**: ACCEPTED
**Date**: 2026-05-25
**Wave**: W433-INST-C
**Supersedes**: (none — first L4 Toolkit Framework decision under W433-SEED-INSTALL spec)
**Superseded-by**: (none — terminal decision; re-open trigger documented in §6)
**Authors**: W433-INST-C autonomous SOTA-decision subagent (claude-opus-4-7[1m])
**Related**: W432-M0 EverMemOS REJECT precedent; W433-INST-A ComposioHQ/agent-orchestrator (sister-repo, separate decision); CLAUDE.md Cardinal Rule 1 trust-tuple

---

## 1. Context

W432-FINALIZE-spec / W433 SOTA-seed-install plan flagged `ComposioHQ/composio` as the L4 **Toolkit Framework** candidate alongside L5 `ComposioHQ/agent-orchestrator` (INST-A, separate decision). The repo description: *"Composio powers 1000+ toolkits, tool search, context management, authentication, and a sandboxed workbench to help you build AI agents that turn intent into action."*

Per the W433-INST-C task spec the R1 trust-tuple must pass BEFORE any install (cardinal-rule per W432-M1 MemPalace REJECT precedent). The orchestrator instruction explicitly noted: *"Composio is a toolkit — likely adoptable as cite-reference + landscape entry rather than embedded source"* and *"W432-M1 precedent: discipline over enthusiasm"*.

This ADR records the R1 probe + verdict.

## 2. Decision

**REJECT `ComposioHQ/composio` for embedded runtime install** under the strict R1 trust-tuple gate `(a) signed releases / SLSA-L3 attestation / npm-provenance / Sigstore-signed git tags`.

**ACCEPT as cite-reference + landscape research-doc** for the L4 Toolkit Framework slot. The repository remains the canonical reference for the *capability surface* of "1000+ integrated toolkits" and may be cited from runtime docs without pulling code into the runtime tree.

- **Embedded-install scope**: REJECTED (R1 (a) fails on supply-chain attestation)
- **Cite-reference scope**: ACCEPTED (R1 (b) license + (c) maintainer + (d) blast-radius all PASS)
- **Path taken**: research-reference catalog under `docs/architecture/W433-INST-C-INSTALL/` (this ADR + cite-reference catalog)
- **No source files pulled into runtime**, no npm/pip package installed, no MCP server wired.

The runtime continues to use the existing T-stack memory + tool surface (T6 basic-memory canonical; T3 cognee; cardinal-rule-2-compliant direct-CLI hooks) without adopting composio as embedded code.

## 3. R1 trust-tuple probe table

Probed 2026-05-25 against repo at `https://github.com/ComposioHQ/composio` (default branch: `next`, HEAD commit-author 2026-05-20 active).

| Gate | Requirement | Probe result | Verdict |
|---|---|---|---|
| **R1(a) signed releases** | SLSA-L3 attestation OR npm-provenance OR Sigstore-signed git tags | **NO SLSA attestation** (`gh attestation list/verify --owner ComposioHQ` finds no provenance for any composio artifact); **NO npm-provenance** on any `@composio/*` package — only npm-registry-default ECDSA `signatures{sig,keyid}` (NOT package-author provenance — see [npm docs on provenance](https://docs.npmjs.com/generating-provenance-statements)); **NO Sigstore-signed git tags** (`gh api repos/ComposioHQ/composio/git/refs/tags/v0.11.1` returns plain commit object with **no `verification` block**); **TS release workflow** (`.github/workflows/ts.release.yml`) uses `changesets/action@v1` with static `secrets.NPM_TOKEN` — **NO `--provenance` flag, NO `permissions: id-token: write`**, so OIDC trusted-publishing is structurally not in use; **PyPI release workflow** (`.github/workflows/py.release.yml`) uses `pypa/gh-action-pypi-publish@release/v1` with `secrets.PYPI_USERNAME/PASSWORD` — **legacy password auth, NOT PyPI Trusted Publisher OIDC** | **FAIL** |
| **R1(b) license** | MIT/Apache-2.0/BSD/ISC/MPL only | Root LICENSE = **MIT** (copyright 2025 Sampark Inc., the legal entity behind ComposioHQ); scoped npm packages `@composio/{core,anthropic,openai,langchain,...}` declare `ISC`; `@composio/client` (the SEPARATE companion repo `composio-base-ts`) is `Apache-2.0`. MIT + ISC + Apache-2.0 all R1-acceptable. | **PASS** |
| **R1(c) maintainer trust** | org-backed, recent commits, no malicious-update history | Org-backed (`ComposioHQ` GitHub organization, 65 subscribers, public org); **28,429 stars, 4,589 forks** (real community); latest release `@composio/claude-agent-sdk@0.9.2` published 2026-05-13; commits flowing daily (HEAD 2026-05-20); **maintainers** = abir-taheer (npm-publisher), cryogenicplanet (co-maintainer), haxzie (npm-OIDC actor); not archived, not disabled; **no malicious-update history known** (no GitHub security-advisories, no Socket.dev / Snyk flags surfaced by the probe; PyPI page `ownership.organization: "Composio"`); Dependabot configured (npm weekly Fridays); Secrets-Detection workflow wired (`security.secrets-detection.yml` calls the org-shared `ComposioHQ/.github/.github/workflows/secrets-detection.yml@a10369fc09d243de3e8d163b00a16c06e5277e21` reusable workflow); 87% community-health score per `gh api repos/ComposioHQ/composio/community/profile`. | **PASS** |
| **R1(d) dependency blast-radius** | pyproject.toml + package.json transitive deps clean; no Socket.dev/Snyk flags | pnpm + turbo monorepo with `ts/packages/{core,cli,cli-keyring,cli-local-tools,json-schema-to-zod,providers/*}`; uv-workspace with `python/providers/{anthropic,crewai,gemini,google,google_adk,langchain,openai,openai_agents}`; PyPI `composio` v0.13.1 transitive deps = `pysher>=1.0.8, pydantic>=2.6.4, composio-client==1.39.0, typing-extensions>=4.0.0, openai, json-schema-to-pydantic>=0.4.8` — narrow + well-known. `composio-anthropic` v0.13.1 = `anthropic>=0.25.7, composio` — narrow. **No Socket.dev/Snyk advisories surfaced.** **NO active GitHub security-advisories** (`gh api repos/ComposioHQ/composio/security-advisories` returns `[]`). | **PASS (with R1(a) caveat — see §4)** |

**R1 net verdict**: **3 of 4 gates PASS, 1 of 4 gates FAILS.** The failing gate is R1(a) supply-chain attestation — the *load-bearing* gate for any code-pulled-into-runtime install per CLAUDE.md cardinal-rule-1 W331 axis-1 #3 extension `(a) signed releases via SLSA-L3 OR npm-provenance OR Sigstore`. Under strict trust-tuple discipline (all gates MUST PASS), this is disqualifying for embedded-source install. For cite-reference scope, R1(b)+(c)+(d) collectively justify reference catalog inclusion.

## 4. Reinforcing observations (R1(a)-blast-radius secondary)

Each independent observation strengthens the REJECT-for-embedded-install decision but does NOT independently disqualify cite-reference scope:

| # | Observation | Cite | Severity for embedded-install | Severity for cite-reference |
|---|---|---|---|---|
| 1 | npm publishes use **static `NPM_TOKEN`** secret, not OIDC trusted publishing | `.github/workflows/ts.release.yml` lines 25-27 (`Set up .npmrc` step echoes `_authToken=${{ secrets.NPM_TOKEN }}`) | HIGH — defeats SLSA-L3 build-traceability; any leaked token can publish malicious updates | LOW (cite-reference does not execute upstream code) |
| 2 | PyPI publishes use **`PYPI_USERNAME/PYPI_PASSWORD`** legacy password auth, not PyPI Trusted Publisher OIDC | `.github/workflows/py.release.yml` lines 30-34 | HIGH — same leaked-secret risk surface as #1 | LOW |
| 3 | Git tags **unsigned** — `verification` block absent from `gh api repos/ComposioHQ/composio/git/refs/tags/v0.11.1` | tag refs query result | MEDIUM — tag-as-immutable-ref guarantee weakens | LOW |
| 4 | **`composio` (bare-name) npm package is a 2023 squat** by user `flashcodex` (not ComposioHQ) — version `1.0.0` published 2023-03-06, description "UI Components for the web" — **NOT the official toolkit**. The official packages use scoped `@composio/*` namespace. | `npm view composio --json` shows publisher `flashcodex <luispinto.dev@gmail.com>` | CRITICAL if any operator types `pip install composio` or `npm install composio` expecting the toolkit — **must use scoped `@composio/core` or pip `composio-core`** (PyPI `composio-core` IS the official ComposioHQ Python toolkit, owned by org `Composio`) | MEDIUM — cite-reference doc MUST explicitly call this out so future operators don't get phished |
| 5 | Sister repo `ComposioHQ/composio-base-ts` (the source of `@composio/client`) **DOES** use OIDC trusted publishing (`publisher.trustedPublisher.id: "github"` + `publisher.email: npm-oidc-no-reply@github.com`) — proving the org is capable of SLSA-L2+ supply-chain hygiene; the main `composio` repo simply hasn't migrated yet | `npm search composio --json` shows `@composio/client` has `trustedPublisher.oidcConfigId: "oidc:***"`; `@composio/core` does not | MEDIUM — this means the org is on a migration path and the R1(a) gap MAY close in a future release. Re-open trigger documented in §6. | LOW |
| 6 | No first-party MCP server | repo root listing + workflow listing returned no `*mcp*.yml` workflow nor an `mcp-server` package | LOW (third-party MCP wrappers exist but they're separate R1 subjects, not in-scope here) | NONE — cite-reference catalog is for the upstream toolkit, not its MCP wrappers |
| 7 | Community-health 87% (high) — Code of Conduct, Contributing, PR Template, LICENSE, README all present | `gh api repos/ComposioHQ/composio/community/profile` `health_percentage: 87` | LOW (positive signal) | POSITIVE |
| 8 | OSSF Scorecard API returned **(no output)** for the repo (unknown if the project has been scanned, OR if the API is rate-limiting our probe) | `curl https://api.securityscorecards.dev/projects/github.com/ComposioHQ/composio` returned empty | UNKNOWN — needs follow-up scan; cannot count as PASS or FAIL absent fresh data | UNKNOWN |

## 5. Supersession map

| If we needed an L4 Toolkit Framework install | sca-floor | Why it might win |
|---|---|---|
| **Wait for `ComposioHQ/composio` SLSA-L3 migration** — sister repo `composio-base-ts` already on OIDC; full migration of the main repo is the natural next step | (gated by §6 re-open trigger) | Once R1(a) PASSES, this repo wins on stars + ecosystem + maintainer-trust |
| **Alternative toolkit frameworks** | TBD | LangChain `langchain-community`, LlamaIndex `llama-index-tools-*`, OpenAI Agents SDK builtins — each must pass own R1 probe. Most have similar R1(a) gaps. The 2026 ecosystem-wide norm for toolkit aggregators is **NOT** SLSA-L3 yet. |

**Practical interpretation**: Most L4 toolkit-aggregator repos in the AI-agent ecosystem do not yet ship SLSA-L3 or npm-provenance. A strict R1(a) gate effectively excludes the entire category for embedded install in 2026. The runtime's current posture — accept these as cite-references, defer embedded-install until SLSA-L3 lands — is consistent with W432-M0 EverMemOS REJECT discipline and with the cardinal-rule-1 W331 axis-1 #3 extension.

## 6. Re-open trigger

This REJECT (for embedded install) is **reversible** if-and-only-if ANY of the following land for `ComposioHQ/composio`:

1. **SLSA-L3 release attestation** verifiable via `gh attestation verify --owner ComposioHQ --repo ComposioHQ/composio` on a tagged release artifact, OR
2. **npm-provenance** on `@composio/core` (and the provider packages we'd consume) — verifiable via `npm view @composio/core dist.attestations` returning non-empty `provenance` predicate, OR
3. **Sigstore-signed git tags** with `verification.verified: true` from `gh api repos/ComposioHQ/composio/git/refs/tags/<TAG>`, OR
4. **Operator-explicit waiver** with documented risk acceptance per CLAUDE.md cardinal-rule-1 trust-tuple (e.g., operator decides cite-reference + sandboxed-MCP-wrapper is sufficient and accepts the R1(a) gap)

The cite-reference scope remains ACCEPTED unconditionally — no re-open trigger needed, cite-reference scope does not pull code into the runtime.

Re-open trigger requires fresh ADR-002 supersession of this ADR's embedded-install verdict.

## 7. Cite-reference catalog (the ACCEPTED scope)

For consumers who need to *cite* `ComposioHQ/composio` from runtime docs:

| Aspect | Canonical reference |
|---|---|
| Repo URL | `https://github.com/ComposioHQ/composio` |
| Default branch | `next` |
| License | MIT (root) + ISC (scoped npm pkgs) + Apache-2.0 (`@composio/client` companion) |
| Star count (cite-anchor moment) | 28,429 stars, 4,589 forks, 65 subscribers (2026-05-25 probe) |
| Latest release (cite-anchor moment) | `@composio/claude-agent-sdk@0.9.2` published 2026-05-13T17:26:18Z, tag `@composio/claude-agent-sdk@0.9.2`, commit-target `next` |
| Org-canonical Python toolkit | PyPI `composio-core` (NOT bare `composio`) — owned by org "Composio" |
| Org-canonical TypeScript toolkit | npm `@composio/core` v0.10.0 |
| Provider packages | TypeScript: `@composio/{openai,openai-agents,anthropic,langchain,llamaindex,vercel,google,mastra,cloudflare,claude-agent-sdk}` · Python: `composio-{openai,openai-agents,anthropic,langchain,google,google-adk,crewai,gemini}` |
| MCP capability | First-party MCP server-creation API documented in `python` README ("Create MCP servers for seamless integration with Claude, Cursor, and other MCP-compatible tools") — capability is *creating* MCP servers, not *being* one |
| Capability headline | "1000+ toolkits, tool search, context management, authentication, sandboxed workbench" |
| Anti-phishing warning | **DO NOT** `pip install composio` (bare name) or `npm install composio` (bare name) — these are 2023 squats. Use `pip install composio-core` and `npm install @composio/core`. |
| Companion repo | `ComposioHQ/composio-base-ts` (source of `@composio/client`, OIDC-trusted-publisher-enabled) |
| Sister repo (this wave) | `ComposioHQ/agent-orchestrator` (W433-INST-A separate decision; L5 operator surface) |

## 8. Cite anchors (≥3 distinct orgs per W352-S9 floor — 10 here)

1. **GitHub** — `https://github.com/ComposioHQ/composio` (REST `repos/ComposioHQ/composio` — license MIT, 28429 stars, default branch `next`, not archived; tag refs `gh api repos/ComposioHQ/composio/git/refs/tags/v0.11.1` returns no verification block; community profile health_percentage=87)
2. **GitHub Actions / SLSA** — `https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds` (SLSA-L3 attestation requirement); `gh attestation` CLI subcommands `verify`/`download` documented at `https://cli.github.com/manual/gh_attestation`
3. **SLSA** — `https://slsa.dev/spec/v1.0/levels` (Build L3 requirements: provenance + signed attestation + non-falsifiable build process)
4. **Sigstore** — `https://www.sigstore.dev/` (release-attestation discipline; cosign tag-signing pattern)
5. **OpenSSF Scorecard** — `https://api.securityscorecards.dev/projects/github.com/ComposioHQ/composio` (empty result — scan absent or rate-limited; cite for the gap, not a score)
6. **npm Inc.** — `https://docs.npmjs.com/generating-provenance-statements` (npm provenance vs default-registry-signatures distinction; `--provenance` flag + `permissions: id-token: write`); `npm view @composio/core dist` confirms `signatures` present but no `attestations`
7. **PyPI / PyPA** — `https://docs.pypi.org/trusted-publishers/` (PyPI Trusted Publisher OIDC vs legacy `PYPI_USERNAME/PASSWORD`); `pypa/gh-action-pypi-publish@release/v1` documents trusted-publishing migration at `https://github.com/pypa/gh-action-pypi-publish#trusted-publishing`
8. **ComposioHQ (subject org)** — `https://github.com/ComposioHQ` (org page, 65 subscribers, parent of repo `composio`, `agent-orchestrator`, `composio-base-ts`, `.github`); PyPI `ownership.organization: "Composio"` field on `composio-core` and `composio-anthropic` JSON
9. **NIST SSDF** — `https://csrc.nist.gov/publications/detail/sp/800-218/final` (SP 800-218 PW.7 Review/Analyze Code + PS.1 Protect Software From Unauthorized Access — applicable to the R1(a) supply-chain-attestation discipline)
10. **CLAUDE.md cardinal-rule-1** — `Z:/claude-sota-installed/CLAUDE.md:32-33` (W331 axis-1 #3 extension `trusted-tuple = trusted-source + SLSA-L3 OR npm-provenance OR Sigstore`); W432-M0 EverMemOS REJECT ADR at `docs/architecture/W432-M0-EVERMEMOS-REJECT/ADR-001-EVERMEMOS-REJECT.md` (precedent for cite-reference-only catalog inclusion after R1(a) FAIL)
11. **Anthropic claude-cookbooks** — `https://github.com/anthropics/claude-cookbooks @ 39a350b6` patterns/agents/* (the model for cite-anchor evidence floor) — internal cite

## 9. Decision authority

- **Operator-authorization**: 2026-05-24 W433 task-spec ("R1 trust-tuple gates MUST ALL PASS to INSTALL"; "Composio is a toolkit — likely adoptable as cite-reference + landscape entry rather than embedded source"; "W432-M1 precedent: discipline over enthusiasm")
- **Autonomous-agent**: W433-INST-C (claude-opus-4-7[1m])
- **Cardinal-rule**: R1 (a) supply-chain attestation gate compels REJECT-for-embedded-install given absence of SLSA-L3 / npm-provenance / Sigstore-signed tags; R1 (b)+(c)+(d) PASS justify ACCEPT-as-cite-reference scope
- **Cross-stream consistency**: INST-A (sister org repo `ComposioHQ/agent-orchestrator`) is a SEPARATE R1 subject and runs in its own decision wave; this ADR makes no claim on the AO verdict but flags the org-level OIDC-migration signal in §4 #5

## 10. Standing L4 Toolkit Framework slot state after this ADR

| Slot | Status | Decision artifact |
|---|---|---|
| L4 Toolkit Framework — `ComposioHQ/composio` embedded install | **REJECTED-THIS-ADR** | this file |
| L4 Toolkit Framework — `ComposioHQ/composio` cite-reference catalog | **ACCEPTED-THIS-ADR** | this file §7 |
| L4 Toolkit Framework — alternative embedded install (LangChain Community, LlamaIndex Tools, OpenAI Agents SDK builtins) | **DEFERRED** — each requires own R1 probe; most ecosystem-wide L4 repos have similar R1(a) gaps in 2026 | future W433-INST-* lanes |
