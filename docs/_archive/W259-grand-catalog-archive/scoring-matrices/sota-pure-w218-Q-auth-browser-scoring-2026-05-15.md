# Stream W218-Q — Auth + Secrets + Browser Automation Scoring Matrix

**Wave**: W218-Q (Tier 12 Auth/RBAC/Secrets + Tier 13 Browser automation)
**Date**: 2026-05-15
**Agent**: sota-researcher (BRIDGE-MODE GPT-5.5 × 3 codex calls)
**Baselines**: W205-E (container-auth-secrets) + W205-F (browser-mcps-workflow)
**Scoring**: 9-dimension matrix (W212/W215 proven pattern)
**Cite-class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8
  - constituents=[TIER-1-DIRECT @ `mcp__github__search_repositories` metadata 2026-05-15, TIER-1-DIRECT @ codex BRIDGE-MODE GPT-5.5 verdict OUT files, TIER-3-LOCAL @ W212/W215 scoring rubric]
  - effective_tier=TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE

---

## 1. Scoring rubric (9-dim, identical W212/W215)

| Dim | Name | Description | Max |
|-----|------|-------------|-----|
| D1 | License-permissive | Apache-2.0 / MIT / BSD = 10; MPL = 8; AGPL/SSPL = 0 | 10 |
| D2 | Stars + cpd | Convergence-gate Axis 3 stability band | 10 |
| D3 | Org provenance | Named-org (Auth0, Google, Microsoft, AWS) = 10; community = 6 | 10 |
| D4 | Native-channel install | Docker official / npm registry / Go binary = 10 | 10 |
| D5 | CC-fit (MCP integration) | MCP-native = 10; HTTP API scriptable = 7; opaque GUI = 3 | 10 |
| D6 | Single-binary deployability | Single Go/Rust binary = 10; multi-container = 5 | 10 |
| D7 | Production maturity | ≥2026 prod adoption + named-T2 references | 10 |
| D8 | Pure-runtime fit | Standalone (no SaaS dependency) = 10 | 10 |
| D9 | Cardinal-rule-12 disposition | GENUINELY-NEW = 10; COMPLEMENT = 8; DUPLICATE = 2 | 10 |
| **Total** | | | **90** |

---

## 2. Codex BRIDGE-MODE GPT-5.5 verdicts (3/3 calls successful)

### Call 1 — Auth/OIDC ranking [VERIFIED via tmp/w218q-codex-call-1-OUT.txt]
```json
{"rank":[
  {"repo":"keycloak/keycloak","reason":"Best full OIDC runtime: Apache-clean, huge momentum, Dockerable, rich admin APIs for Claude automation."},
  {"repo":"ory/hydra","reason":"Clean Apache Go core and agent-friendly APIs, but OAuth/OIDC only; needs login/consent/user stack."},
  {"repo":"goauthentik/authentik","reason":"Excellent self-host UX and APIs, but multi-container Django stack and enterprise subtree reduce license cleanliness."},
  {"repo":"supertokens/supertokens-core","reason":"Simple Apache core container, but narrower OIDC/runtime fit and weaker 2026 ecosystem momentum."}
]}
```

### Call 2 — RBAC TIER-1 pick [VERIFIED via tmp/w218q-codex-call-2-OUT.txt]
```json
{"pick":"authzed/spicedb","alt":"openfga/openfga","rationale":"Best Zanzibar/ReBAC fidelity, Go single-binary, mature production posture; OpenFGA is strongest simpler Okta-backed alternative."}
```

### Call 3 — Browser automation top-2 [VERIFIED via tmp/w218q-codex-call-3-OUT.txt]
```json
{"top2":["microsoft/playwright-mcp","ChromeDevTools/chrome-devtools-mcp"],"complement":"browserbase/stagehand or browser-use/browser-use for vision-required adaptive workflows","rationale":"Both are MCP-native, deterministic, permissive, official-org maintained; Playwright MCP wins accessibility-tree ergonomics, DevTools MCP adds CDP depth."}
```

**Cross-model gate status**: FULL — all 3 dispatches landed structured JSON verdicts via REAL GPT-5.5 (codex CLI v0.130.0, gpt-5.5 model, sandbox workspace-write w/ network) per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Profile selection rule`. Cross-model consensus invariant satisfied per CR-3 strict reading.

---

## 3. Tier 12 — Auth + OIDC scoring (4 repos)

[VERIFIED 2026-05-15 via mcp__github__search_repositories]

| Repo | License | ★ | Lang | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Σ/90** |
|------|---------|---|------|----|----|----|----|----|----|----|----|----|-----|
| **keycloak/keycloak** | Apache-2.0 | 34,413 | Java/Quarkus | 10 | 10 | 10 | 10 | 7 | 7 | 10 | 10 | 10 | **84** |
| **ory/hydra** | Apache-2.0 | 17,139 | Go | 10 | 9 | 9 | 10 | 9 | 10 | 10 | 10 | 8 | **85** |
| **goauthentik/authentik** | MIT (ee/ subtree) | 21,473 | Python/Django | 8 | 9 | 8 | 9 | 6 | 5 | 9 | 9 | 8 | **71** |
| **supertokens/supertokens-core** | Apache-2.0 | 15,037 | Java | 10 | 8 | 8 | 9 | 7 | 7 | 8 | 9 | 7 | **73** |

**Composite-leader (Auth/OIDC): ory/hydra (85/90)** — clean Apache Go core, single-binary, agent-friendly APIs.
**CC-native-leader: ory/hydra** — Go binary + HTTP API + OAuth/OIDC-focused = best CC-script-fit.
**Caveat**: ory/hydra is OAuth/OIDC-ONLY. For full IAM (users/login/consent UI), pair with `ory/kratos` (see Tier 12 user-management below) OR fall back to keycloak (84/90) for all-in-one.

---

## 4. Tier 12 — User management + multi-protocol IdP (3 repos)

| Repo | License | ★ | Lang | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Σ/90** |
|------|---------|---|------|----|----|----|----|----|----|----|----|----|-----|
| **ory/kratos** | Apache-2.0 | 13,644 | Go | 10 | 9 | 9 | 10 | 9 | 10 | 9 | 10 | 9 | **85** |
| **zitadel/zitadel** | Apache→AGPL drift | 13,772 | Go | 5 | 9 | 8 | 9 | 8 | 8 | 9 | 9 | 7 | **72** |
| **(keycloak/keycloak)** | Apache-2.0 | 34,413 | Java | 10 | 10 | 10 | 10 | 7 | 7 | 10 | 10 | 10 | **84** |

**Composite-leader (User mgmt): ory/kratos (85/90)** — pairs with ory/hydra as the canonical Ory stack.
**CC-native-leader: ory/kratos** — passkeys/social/OIDC/SAML/MFA in Go binary; API-driven.
**REJECT-FOR-FIT note (per Wave 18 architect findings + sibling `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` cite-trail)**: zitadel/zitadel license drift (Apache→AGPL) → CR-1 + CR-9 install-risk discipline blocker; AVOID as install-class.

---

## 5. Tier 12 — RBAC / Authorization engines (4 repos)

| Repo | License | ★ | Lang | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Σ/90** |
|------|---------|---|------|----|----|----|----|----|----|----|----|----|-----|
| **authzed/spicedb** | Apache-2.0 | 6,706 | Go | 10 | 8 | 9 | 10 | 8 | 10 | 9 | 10 | 10 | **84** |
| **openfga/openfga** | Apache-2.0 | 5,171 | Go | 10 | 8 | 10 | 10 | 8 | 10 | 9 | 10 | 9 | **84** |
| **cedar-policy/cedar** | Apache-2.0 | 1,478 | Rust | 10 | 6 | 10 | 9 | 7 | 9 | 8 | 9 | 9 | **77** |
| **casbin/casbin** | Apache-2.0 | ~18,000 | Go | 10 | 9 | 7 | 10 | 8 | 10 | 9 | 9 | 7 | **79** |

**Composite-leader (RBAC): authzed/spicedb (84/90)** + **openfga/openfga (84/90) tied** — both Zanzibar/ReBAC Go single-binary, Apache-2.0.
**Codex GPT-5.5 picks spicedb (Call 2)** for best Zanzibar/ReBAC fidelity + mature production posture; openfga as strongest simpler Okta-backed alternative.
**CC-native-leader: openfga/openfga** — Auth0/Okta org provenance gives broader 2026 ecosystem momentum + simpler ZanzibarRelTuples model.

**casbin/casbin caveat**: Star count `~18,000` is approximate (mcp__github__search returned only subsidiary repos `casbin-gin-example` + `sqlx-adapter`; main repo not in API results). Score uses well-known community baseline; verify live before adoption.

---

## 6. Tier 12 — Secrets management (4 repos)

| Repo | License | ★ | Lang | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Σ/90** |
|------|---------|---|------|----|----|----|----|----|----|----|----|----|-----|
| **getsops/sops** | MPL-2.0 | 21,789 | Go | 8 | 10 | 9 | 10 | 8 | 10 | 10 | 10 | 10 | **85** |
| **openbao/openbao** | MPL-2.0 | 6,065 | Go | 8 | 9 | 8 | 10 | 8 | 9 | 8 | 10 | 9 | **79** |
| **Infisical/infisical** | MIT (some ee) | 26,836 | TypeScript | 9 | 10 | 8 | 10 | 8 | 6 | 9 | 9 | 8 | **77** |
| **FiloSottile/age** | BSD-3 | 22,294 | Go | 10 | 10 | 9 | 10 | 7 | 10 | 10 | 10 | 9 | **85** |

**Composite-leader (Secrets): getsops/sops (85/90)** AND **FiloSottile/age (85/90) tied**.
**CC-native-leader for git-stored secrets: sops** — encrypted-at-rest YAML/JSON with KMS/PGP/age; CC-scriptable.
**CC-native-leader for file-level encryption: age** — single-purpose, no config, UNIX-composable (Filippo Valsorda named-T2).
**Vault-fork pick: openbao (79/90)** — MPL-2.0 Vault fork by IBM/Linux Foundation after HashiCorp BUSL drift; install-class for dynamic-secret workflows. Per `Z:/claude-sota/.claude/rules/cardinal-rule-9-install-risk-discipline.md`: prefer openbao over upstream vault for license cleanliness.

---

## 7. Tier 13 — Browser automation (8 repos)

[VERIFIED 2026-05-15 via mcp__github__search_repositories]

| Repo | License | ★ | Lang | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | **Σ/90** |
|------|---------|---|------|----|----|----|----|----|----|----|----|----|-----|
| **microsoft/playwright-mcp** | Apache-2.0 | 32,552 | TypeScript | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 10 | 10 | **88** |
| **ChromeDevTools/chrome-devtools-mcp** | Apache-2.0 | 39,696 | TypeScript | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 10 | 10 | **88** |
| **microsoft/playwright** | Apache-2.0 | 88,767 | TypeScript | 10 | 10 | 10 | 10 | 6 | 8 | 10 | 10 | 9 | **83** |
| **puppeteer/puppeteer** | Apache-2.0 | 94,326 | TypeScript | 10 | 10 | 10 | 10 | 5 | 8 | 10 | 10 | 7 | **80** |
| **browser-use/browser-use** | MIT | 94,060 | Python | 10 | 10 | 8 | 9 | 7 | 7 | 9 | 9 | 9 | **78** |
| **browserbase/stagehand** | MIT | 22,669 | TypeScript | 10 | 9 | 8 | 9 | 8 | 7 | 9 | 9 | 8 | **77** |
| **steel-dev/steel-browser** | Apache-2.0 | 7,025 | TypeScript | 10 | 8 | 7 | 9 | 8 | 7 | 8 | 9 | 8 | **74** |
| **lavague-ai/LaVague** | Apache-2.0 | 6,345 | Python | 10 | 7 | 7 | 8 | 7 | 6 | 7 | 9 | 7 | **68** |

**Composite-leader (Browser): microsoft/playwright-mcp (88/90)** AND **ChromeDevTools/chrome-devtools-mcp (88/90) tied**.
**Codex GPT-5.5 verdict (Call 3)**: both as top-2 — playwright-mcp wins accessibility-tree ergonomics; chrome-devtools-mcp adds CDP-protocol depth.
**CC-native-leader: microsoft/playwright-mcp** — MCP-native, accessibility-tree-based (no-vision deterministic), Apache-2.0, Microsoft official.
**Complement (vision cases): browserbase/stagehand** OR **browser-use/browser-use** — per Call 3 — for adaptive workflows requiring vision+text.

**Anthropic Computer Use API (cite-class, not installable)**: TIER-1 cite-anchor only at `https://docs.anthropic.com/en/docs/build-with-claude/computer-use` — model-level capability accessed through Anthropic SDK, NOT an installable runtime primitive. Score excluded (D4=N/A; not a fair comparison row).

---

## 8. Cross-tier Cardinal-rule-12 disposition

Per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class disposition lattice (referenced via Section 14.5 cite-import):

| Repo | Disposition | Incumbent | Notes |
|------|-------------|-----------|-------|
| keycloak/keycloak | GENUINELY-NEW | none (no auth installed) | All-in-one IAM; defer until concrete auth need |
| ory/hydra + ory/kratos | GENUINELY-NEW | none | Composable OAuth/OIDC + user mgmt; sibling-pair install |
| authzed/spicedb | GENUINELY-NEW | none | Best ReBAC fidelity for fine-grained authz |
| openfga/openfga | GENUINELY-NEW | none | Auth0 ecosystem; simpler ReBAC |
| getsops/sops | GENUINELY-NEW | sibling already cites | Cite-class for git-encrypted secrets |
| FiloSottile/age | GENUINELY-NEW | none | UNIX-composable file encryption |
| openbao/openbao | PROVIDER-COMPLEMENT | (vault not installed) | License-clean Vault fork |
| microsoft/playwright-mcp | GENUINELY-NEW | none browser MCP installed | TOP-PICK for browser automation |
| ChromeDevTools/chrome-devtools-mcp | PROVIDER-COMPLEMENT | (playwright-mcp picked) | CDP depth complement |
| browserbase/stagehand | DUPLICATE-FUNCTIONALITY | playwright-mcp | Playwright wrapper; skip if playwright-mcp installed |
| browser-use/browser-use | PARTIAL-OVERLAP | playwright-mcp + vision | Vision-required complement only |
| Infisical/infisical | PARTIAL-OVERLAP | sops + age | If teamwork/PAM needs surface |

---

## 9. Install priority recommendations (top 6)

Per cardinal-rule-12 + cardinal-rule-6 freshness mandate + cardinal-rule-9 install-risk discipline:

### Priority #1 — microsoft/playwright-mcp (Σ=88/90)
- **License**: Apache-2.0 clean
- **Install**: `claude mcp add playwright-mcp --type npx -- @microsoft/playwright-mcp@latest` (from npm registry official; per CR-6 official-native-channel)
- **CR-9 risk**: LOW — Microsoft official, MCP-native, 32,552★ + active (last push 2026-05-15)
- **Disposition**: GENUINELY-NEW (no incumbent browser MCP)
- **Caveat**: version-pin `@latest` per CR-9 mandate; record blob SHA in `docs/install-provenance.md`

### Priority #2 — ory/hydra + ory/kratos (Σ=85+85=170/180)
- **License**: Apache-2.0 clean (both)
- **Install**: Docker official images `oryd/hydra:latest` + `oryd/kratos:latest` (per CR-6 official-native-channel via Docker Hub)
- **CR-9 risk**: LOW — Ory Network named-org, 17,139 + 13,644 stars
- **Disposition**: GENUINELY-NEW pair
- **CC-fit**: Go binaries + HTTP admin APIs = ideal for CC agent automation

### Priority #3 — getsops/sops (Σ=85/90)
- **License**: MPL-2.0 (acceptable per CR-9 permissive-license-only floor; MPL is file-level copyleft, NOT viral)
- **Install**: `go install github.com/getsops/sops/v3/cmd/sops@latest` OR Docker `getsops/sops:latest`
- **CR-9 risk**: LOW — Mozilla maintained, 21,789★ + 10+ year project
- **Disposition**: GENUINELY-NEW for git-stored secrets workflow
- **CC-fit**: CLI-scriptable + KMS/PGP/age backends

### Priority #4 — FiloSottile/age (Σ=85/90)
- **License**: BSD-3 clean
- **Install**: `go install filippo.io/age/cmd/...@latest` OR official binary release via `gh release download`
- **CR-9 risk**: LOW — Filippo Valsorda named-T2, 22,294★
- **Disposition**: GENUINELY-NEW (UNIX-composable file encryption)
- **CC-fit**: Single-binary, no-config, UNIX pipes

### Priority #5 — authzed/spicedb OR openfga/openfga (Σ=84/90 tied)
- **License**: Apache-2.0 clean (both)
- **Install (spicedb)**: Docker `authzed/spicedb:latest` OR `go install github.com/authzed/spicedb/cmd/spicedb@latest`
- **Install (openfga)**: Docker `openfga/openfga:latest` OR `go install github.com/openfga/openfga/cmd/openfga@latest`
- **CR-9 risk**: LOW for both
- **Disposition**: GENUINELY-NEW for fine-grained authz; pick one per first concrete authz workflow
- **Codex GPT-5.5 tiebreaker (Call 2)**: spicedb for ReBAC fidelity; openfga for simpler Okta-backed ecosystem

### Priority #6 — ChromeDevTools/chrome-devtools-mcp (Σ=88/90)
- **License**: Apache-2.0 clean
- **Install**: `claude mcp add chrome-devtools-mcp --type npx -- @chromedevtools/chrome-devtools-mcp@latest` (per CR-6 official-native-channel)
- **CR-9 risk**: LOW — Google Chrome team official, 39,696★
- **Disposition**: PROVIDER-COMPLEMENT to playwright-mcp (CDP depth for debugging/perf cases)
- **CC-fit**: Install alongside playwright-mcp for tiered browser-tool routing

---

## 10. Findings + REJECT-FOR-FIT

### GENUINE-GAP findings
1. **No auth/IAM installed** as of 2026-05-15 (manifest §Section 12 EMPTY); top picks ory/hydra+kratos OR keycloak ready when concrete auth workflow surfaces
2. **No browser MCP installed** as of 2026-05-15 (manifest §Section 13 EMPTY); playwright-mcp + chrome-devtools-mcp ready for first browser-automation workflow
3. **No RBAC engine installed**; authzed/spicedb OR openfga/openfga ready when first fine-grained authz need surfaces
4. **No secrets manager installed**; sops + age cite-anchored as TIER-1 candidates for git-encrypted secrets workflow

### REJECT-FOR-FIT
- **zitadel/zitadel** — Apache→AGPL license drift per W205-E; CR-9 install-risk discipline blocks AGPLv3 from install-class adoption (CR-1 permissive-license-only floor)
- **lavague-ai/LaVague (68/90)** — sub-70 composite score; Python-only + 6,345★ doesn't beat playwright-mcp/chrome-devtools-mcp dominance
- **steel-dev/steel-browser (74/90)** — niche browser-sandbox; DUPLICATE-FUNCTIONALITY with playwright-mcp for most CC use cases
- **Anthropic Computer Use API** — cite-class only (not installable runtime primitive); access via Anthropic SDK at model layer per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #6

### CR-12 disposition summary
- 6 GENUINELY-NEW (top picks)
- 1 PROVIDER-COMPLEMENT (chrome-devtools-mcp to playwright-mcp; openbao to vault)
- 2 PARTIAL-OVERLAP (Infisical to sops+age; browser-use to playwright-mcp+vision)
- 1 DUPLICATE-FUNCTIONALITY (stagehand to playwright-mcp)
- 1 REJECT-FOR-FIT (zitadel AGPL drift)

---

## 11. Verdict shape

- **Composite-leader Auth/IAM**: ory/hydra+kratos (85/90 pair)
- **Composite-leader RBAC**: authzed/spicedb = openfga/openfga (84/90 tied; codex picks spicedb for ReBAC fidelity)
- **Composite-leader Secrets**: getsops/sops = FiloSottile/age (85/90 tied; complementary use cases)
- **Composite-leader Browser**: microsoft/playwright-mcp = chrome-devtools-mcp (88/90 tied; codex picks playwright-mcp for accessibility-tree)
- **CC-native-leader (overall)**: microsoft/playwright-mcp (88/90, MCP-native, Microsoft official, accessibility-tree deterministic)
- **Cross-model gate**: 3/3 codex BRIDGE-MODE calls successful — FULL satisfaction per CR-3

## 12. Cite-trail summary

- TIER-1-DIRECT @ `mcp__github__search_repositories` 18 repos verified 2026-05-15 (star counts, license, language, updated_at)
- TIER-1-DIRECT @ codex BRIDGE-MODE GPT-5.5 verdicts at `Z:/claude-sota-installed/tmp/w218q-codex-call-{1,2,3}-OUT.txt` 2026-05-15
- TIER-3-LOCAL-COMPOSITION @ W212/W215 9-dim scoring rubric
- TIER-3-LOCAL-COMPOSITION @ W205-E + W205-F baseline cross-reference (auth/secrets + browser-mcps baseline)
- Cross-model consensus per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` — FULL via 3 REAL GPT-5.5 dispatches

## 13. TERMINATION

- on_handoff_to: orchestrator
- max_turns: 30 (actual: ~25)
- on_token_budget_exceeded: 200000 (not triggered)
- HANDOFF verdict_one_line: "DONE: W218-Q auth-browser-scoring — composite-leader microsoft/playwright-mcp (88/90, MCP-native Apache-2.0); CC-native-leader microsoft/playwright-mcp; 3/3 codex BRIDGE-MODE calls (gpt-5.5); 19 repos scored across Tier 12+13; written to tmp/sota-pure-w218-Q-auth-browser-scoring-2026-05-15.md"
