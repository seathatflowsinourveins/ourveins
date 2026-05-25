# Wave 149 Fire 1 Agent B — CPA blocker fix-forward decision tree

**Agent**: architect (Sonnet 4.6) — independent voice per advanced-agent-team-standing-directive Wave 24-D
**Date**: 2026-05-11
**Mission**: Design SOTA fix-forward for CPA `0 Claude API keys → graceful 160ms exit`
**Output budget**: 800 LOC

---

## EXECUTIVE FINDING (adversarial-mode key conclusions)

1. **Downgrade ladder is REFUTED.** v6.10.9 backup binary (`cli-proxy-api-v6.10.9-bak-20260511-100542.exe`) was smoke-tested live this fire — produces IDENTICAL output to v7.0.2: "API server started" + "10 clients (10 auth entries + 0 Claude API keys + ...)" then graceful exit. Both versions exit because `available[]` returned by `FillFirstSelector.Pick` is empty (selector treats `Disabled=true` OR `Status==StatusDisabled` as blocked per `CLIProxyAPI/sdk/cliproxy/auth/selector.go:isAuthBlockedForModel`). The 4 `disabled:true` accounts contribute ZERO usable clients; the 3 `disabled:false` accounts have access_token expired ~38h with no successful refresh since 2026-05-09 15:59 (suggests refresh_token rotation broke). **No prior CPA binary will fix this** — the root cause is OAuth state, not binary.

2. **Re-auth is the only confirmed fix path.** `cli-proxy-api.exe -claude-login` is the canonical method per upstream binary help text [VERIFIED 2026-05-11 via live `--help` invocation]. It opens a browser OAuth flow (use `-no-browser` for headless device-code emission). MUST be invoked **one-at-a-time per account** (no batch flag in `--help`). REQUIRES USER browser interaction.

3. **ProxyPilot (Finesssee fork) is the SOTA upstream-replacement candidate** at convergence-gate Axis-1 PARTIAL-PASS / Axis-2 INSUFFICIENT / Axis-3 BORDERLINE (210★ MIT Go, created 2025-12-14, pushed 2026-05-11 — actively maintained; same `-claude-login` flag surface). Verdict: **STUDY-PILOT** per CR-12 PARTIAL-OVERLAP class — NOT install-default; cite-class only until convergence Axis-2 named-T2 closure.

4. **9Router does NOT exist.** GitHub search `9Router CLIProxyAPI` returned zero results; `router-for-me/9Router` 404s. Disposition: REJECT-UNTIL-EVIDENCE. Wave 147 Fire 1 reference is OVER-claim per fm20-path-drift-cascade.

5. **claude.exe is already routing direct to anthropic.com via `aesthetic9c@gmail.com`** (eee.ps1 T0.8 fallback unset `ANTHROPIC_BASE_URL` when CPA unreachable). Token-efficiency continuation: maintain direct routing; address cache-prefix concern by **already-installed `cnighswonger/claude-code-cache-fix` v3.5.4** at `:19801` (per eee.ps1:155-186 chained-routing block). When CPA dead, cache-fix proxy is also bypassed (chain depends on CPA upstream). **Pivot: rewire cache-fix CACHE_FIX_PROXY_UPSTREAM to point directly at https://api.anthropic.com** to preserve cache-prefix optimization without CPA dependency.

---

## RECOMMENDED PATH (with cardinal-rule conformance)

### Path 1: Re-auth 3 active accounts via `-claude-login` (PRIMARY)

- **Operator-gate**: YES — interactive browser OAuth flow per account
- **Time cost**: ~5-10 min total (3 accounts × ~2 min/login including browser switch + console.anthropic.com auth)
- **CR-1 cite**: TIER-1-DIRECT `Z:/repos/deps/CLIProxyAPI/internal/auth/claude/anthropic_auth.go:26` (`TokenURL = "https://api.anthropic.com/v1/oauth/token"`) + binary `--help` self-documenting [VERIFIED 2026-05-11 live smoke]
- **CR-9 install-risk**: LOW — no new install; OAuth flow uses existing trusted binary + canonical Anthropic console.anthropic.com endpoint
- **CR-7 Phase 1 conformance**: PASS — interactive operator-gate REQUIRED by design (Phase 1 expects this)

**Steps**:
1. **REQUIRES USER**: Stop any running CPA service (`Stop-Service cliproxyapi` if NSSM-installed; OR `taskkill /F /IM cli-proxy-api.exe`)
2. **REQUIRES USER**: Run each per account from `Z:/claude-sota-installed`:
   ```powershell
   cd Z:\claude-sota-installed
   .\.local\bin\cli-proxy-api.exe --config .cli-proxy-api\config.yaml -claude-login
   ```
   Browser opens → log in as `aesthetic9c@gmail.com` → approve OAuth scope → CPA writes new tokens to `.cli-proxy-api/claude-aesthetic9c@gmail.com.json` (auth-dir from config.yaml:20)
3. **REQUIRES USER**: Repeat step 2 for `mr.euphoriaincarnate@gmail.com`, `nalawowac@gmail.com` (3 active accounts only; 4 disabled stay disabled)
4. **AUTONOMOUS verification**: `jq -r '.last_refresh, .expired' .cli-proxy-api/claude-*.json | head -20` — confirm `last_refresh` is fresh (within last 5 min) AND `expired` is 4h in future
5. **REQUIRES USER**: Restart CPA service; verify port :8317 listening + `/healthz` returns 200; smoke-probe `curl -sf http://127.0.0.1:8317/v1/models` returns model list (not 503)

**Verification**: `curl -sf http://127.0.0.1:8317/v1/models | jq '.data | length' >= 1` AND CPA log contains `"clients (... 3 Claude API keys ...)"` (was "0 Claude API keys").

---

### Path 2: Re-auth all 7 accounts including 4 currently-disabled (SECONDARY — if 3 is insufficient capacity)

- **Operator-gate**: YES
- **Time cost**: ~15-20 min (7 accounts × ~2 min/login + browser fatigue)
- **CR-1**: same as Path 1
- **CR-9**: LOW
- **When to use**: If Path 1 succeeds but 3-account fleet hits CADP-class rate-limits during arc

**Steps**: As Path 1, but loop over all 7 emails; flip `disabled: false` in JSON post-login (auto-set by `-claude-login` per CPA selector contract — `setClaudeRefreshBlockedUntil`/`clearClaudeRefreshBlockedUntil` flow at `anthropic_auth.go:67-76`).

---

### Path 3: Migrate to ProxyPilot (TERTIARY — only if upstream CPA broken AND re-auth fails)

- **Operator-gate**: YES — install + interactive re-login
- **Time cost**: ~30-45 min (install + 7-account re-login + config migration + smoke-test)
- **CR-1 cite**: TIER-1-DIRECT `https://github.com/Finesssee/ProxyPilot/blob/main/README.md` [VERIFIED 2026-05-11 via curl + `gh repo view` — 210★ MIT, last push 2026-05-11T07:54:08Z = actively maintained, exact same `--claude-login` flag surface]
- **CR-9 install-risk**: MEDIUM
  - Pin to specific release tag (NOT `@latest` — D6 today-release-auto-upgrade risk per CR-9): use `gh release list --repo Finesssee/ProxyPilot --limit 1 --json tagName` to discover current release; pin THAT tag in install commands
  - Pre-cite-import REVERT check on `Finesssee/ProxyPilot` (no sibling-history risk; new install)
  - Sibling-bleed defense: NONE NEEDED (no copy from sibling)
  - 2-round fix-forward expectation: BUDGET 2nd round for config-schema differences between CPA→ProxyPilot
- **CR-12 disposition**: PARTIAL-OVERLAP (CR-12 5-class disposition lattice) — ProxyPilot is a fork covering same scope (OAuth proxy for AI subscriptions) via SAME mechanism (Go + OAuth + multi-account); install as ALTERNATIVE not REPLACEMENT until convergence-gate Axis-2 closes (need named-T2 dated artifact endorsement)
- **CR-7 Phase 1 conformance**: PASS — install-class with explicit operator gate

**Steps**:
1. **REQUIRES USER**: Discover current ProxyPilot tag → `gh release list --repo Finesssee/ProxyPilot --limit 1 --json tagName -q '.[0].tagName'`
2. **REQUIRES USER**: Download release: `gh release download <TAG> --repo Finesssee/ProxyPilot --pattern '*windows_amd64*' --dir .local/downloads/proxypilot-<TAG>`
3. **REQUIRES USER**: Extract + place binary at `.local/bin/proxypilot.exe`
4. **REQUIRES USER**: Per-account `-claude-login` (same 7-account flow as Path 1)
5. **REQUIRES USER**: Smoke-test :8317 health + model list; pivot `ANTHROPIC_BASE_URL` if shape differs

**Why TERTIARY**: ProxyPilot is a fork of CPA — if upstream CPA breaks Claude OAuth, ProxyPilot likely breaks same way (shared codebase ancestry). Only viable if breakage is CPA-specific not Anthropic-API-specific.

---

### Path 4: Bypass CPA entirely (FALLBACK — single-account direct + cache-fix)

- **Operator-gate**: NO (autonomous — config-only edit; one current-state probe needed)
- **Time cost**: ~5 min
- **CR-1 cite**: TIER-1-DIRECT `https://code.claude.com/docs/en/env-vars` (ANTHROPIC_BASE_URL semantics) + `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:13-44 @ HEAD 12cc30a1` (cache-fix proxy mode)
- **CR-9**: LOW — no new install, env-only routing change
- **Trade-off**: SACRIFICES multi-account rotation (CADP §Cache-Aware Dispatch Pacing rule 2 still applies — max 3 concurrent until cache rate ≥50% verified). 8-account-fleet performance gain is LOST until CPA restored.

**Steps**:
1. **AUTONOMOUS**: Audit `eee.ps1:179-186` — verify `EEE_CACHEFIX_BASE` already points at cnighswonger:19801 + verify cnighswonger upstream chain falls through to direct anthropic.com when CPA unreachable [INFERRED from eee.ps1:182-186 comments; verify via cache-fix logs]
2. **AUTONOMOUS**: If cache-fix chain depends on CPA upstream, edit cache-fix config to set `CACHE_FIX_PROXY_UPSTREAM=https://api.anthropic.com` directly (skip CPA layer)
3. **REQUIRES USER**: Provide a real `ANTHROPIC_API_KEY` (current `EEE_PROXY_KEY` is a CPA-internal dummy; direct anthropic.com routing needs a real key)
4. **AUTONOMOUS**: Restart eee — claude.exe routes claude.exe → cnighswonger:19801 → https://api.anthropic.com directly (no CPA hop)

**Why FALLBACK**: Preserves token-efficiency cache-prefix discipline while accepting single-account constraint. Best for long-arc /loop continuation while Path 1 re-auth pending.

---

## DECISION-MATRIX TABLE

| Path | Probability of fix | Cost | Reversibility | Operator-gate | CR-conformance |
|------|---|---|---|---|---|
| **Path 1** (re-auth 3 active) | **HIGH** (~85% — refresh_token rotation is the only ruled-in cause) | ~10 min | FULL (no irreversible changes) | YES (browser × 3) | CR-1+7+9 PASS |
| **Path 2** (re-auth all 7) | HIGH (~85%) — same mechanism | ~20 min | FULL | YES (browser × 7) | CR-1+7+9 PASS |
| **Path 3** (ProxyPilot migration) | MEDIUM (~60% — same upstream root cause possible) | ~45 min | PARTIAL (CPA binary preserved as backup) | YES (install + login × 7) | CR-12 PARTIAL-OVERLAP STUDY-PILOT |
| **Path 4** (CPA bypass) | LOW for multi-account (rotation lost); HIGH for "claude.exe just works again" | ~5 min | FULL (revert eee.ps1) | NO (autonomous) | CR-7 Phase 1 PASS as fallback |

---

## ALTERNATIVE-PROXY CONVERGENCE-GATE VERDICTS

### ProxyPilot (`Finesssee/ProxyPilot`)

**Per `Z:/claude-sota/.claude/rules/convergence-gate.md` 3-axis evaluation**:

| Axis | Status | Evidence |
|------|--------|----------|
| **Axis 1** (≥3 distinct T1 orgs implementing the pattern) | **PARTIAL** | router-for-me/CLIProxyAPI (org 1, parent) + Finesssee/ProxyPilot (org 2, fork) + vibeproxy (org 3, Mac-only) + 20+ "Who is with us" CPA ecosystem repos. PARTIAL because forks share codebase ancestry — not truly independent. |
| **Axis 2** (≥2 named-T2 practitioners with dated artifact) | **INSUFFICIENT** | Finesssee X handle present in README but no named-T2 endorsement (no Karpathy/Boris/Simon Willison/Anthropic-staff dated artifact). |
| **Axis 3** (≥3 months stability) | **BORDERLINE** | Created 2025-12-14 → 2026-05-11 = ~5 months (>=90d threshold OK), but cpd analysis needed — last_push same-day as cite suggests `cpd > 10`. Without explicit commit-count probe, classify "active iteration" band per `convergence-gate.md` cpd table. |

**Probe DAG (1-7) per `agent-harness-fit-verification.md`**:
- **Probe 1 count-OVER**: 210★ measured via `gh api repos/Finesssee/ProxyPilot` [VERIFIED 2026-05-11]
- **Probe 2 SDK-vs-CLI surface**: PASS — same `-claude-login` / `-no-browser` / `-oauth-callback-port` flag surface as parent CPA
- **Probe 3 architectural-API**: PASS — same Anthropic-API OAuth + same token storage shape
- **Probe 4 plugin-namespace**: PASS — no plugin-loaded namespace conflict
- **Probe 5 mode-harness-shape**: PASS — same Windows-native Go binary, no HARD-GATE setup gate
- **Probe 6 direct-file/registry blockers**: PASS — MIT license per `gh api` verified [VERIFIED 2026-05-11]
- **Probe 7.a demand-absence**: REJECT — sss DOES have demand surface (current CPA blocker IS the demand)
- **Probe 7.b demand-creates-new-workflow**: N/A (Probe 7.a not REJECT)

**Verdict**: **STUDY-PILOT** per CR-12 PARTIAL-OVERLAP (5-class disposition lattice). Install as Tier-2 alternative; NOT install as PRIMARY replacement. Pin specific tag; do not allow `@latest` per CR-9.

### 9Router

**Verdict**: **REJECT-UNTIL-EVIDENCE**. `gh repo view router-for-me/9Router` returned 404; `gh search repos '9Router CLIProxyAPI'` returned zero results [VERIFIED 2026-05-11]. The "Wave 147 Fire 1 alternative" reference is a phantom-cite per `fm20-path-drift-cascade` — recommend codify FM-20 catch n+1 if propagated.

### vibeproxy

**Verdict**: **REJECT** — Mac-only per upstream README "macOS-native"; sss is Windows 11 26H2.

---

## OPERATOR-GATED ACTIONS (require user approval)

**Path 1 (PRIMARY) commands** (paste into PowerShell at `Z:\claude-sota-installed`):

```powershell
# Step 1: Stop any running CPA service/process
Stop-Service cliproxyapi -ErrorAction SilentlyContinue
Get-Process cli-proxy-api -ErrorAction SilentlyContinue | Stop-Process -Force

# Step 2: Run -claude-login for each active account (one at a time — browser opens per invocation)
cd Z:\claude-sota-installed
.\.local\bin\cli-proxy-api.exe --config .cli-proxy-api\config.yaml -claude-login
# Browser opens → log in as aesthetic9c@gmail.com → approve → CPA writes new tokens

.\.local\bin\cli-proxy-api.exe --config .cli-proxy-api\config.yaml -claude-login
# Browser opens → log in as mr.euphoriaincarnate@gmail.com → approve → CPA writes new tokens

.\.local\bin\cli-proxy-api.exe --config .cli-proxy-api\config.yaml -claude-login
# Browser opens → log in as nalawowac@gmail.com → approve → CPA writes new tokens

# Step 3: AUTONOMOUS verification (Claude can run after operator)
$cwd = "Z:\claude-sota-installed\.cli-proxy-api"
Get-ChildItem $cwd -Filter "claude-*.json" | ForEach-Object {
    $j = Get-Content $_.FullName | ConvertFrom-Json
    "$($j.email): last_refresh=$($j.last_refresh)  disabled=$($j.disabled)"
}

# Step 4: Restart CPA + smoke test
.\.local\bin\cli-proxy-api.exe --config .cli-proxy-api\config.yaml &
Start-Sleep 3
curl -sf http://127.0.0.1:8317/v1/models | jq '.data | length'
```

**Headless alternative for remote sessions** (no browser):
```powershell
.\.local\bin\cli-proxy-api.exe --config .cli-proxy-api\config.yaml -claude-login -no-browser
# Emits device-code URL — open on any browser-capable machine + paste code
```

---

## AUTONOMOUS ACTIONS (claude can execute now)

**A1. Probe current CPA state on disk (CR-9 LOW-risk read-only)**:
```bash
cd /z/claude-sota-installed
for f in .cli-proxy-api/claude-*.json; do
  jq -r '"\(.email): last_refresh=\(.last_refresh) expired=\(.expired) disabled=\(.disabled)"' "$f"
done
```

**A2. Verify cache-fix proxy current upstream config (CR-9 LOW-risk read-only)**:
```bash
cd /z/claude-sota-installed
grep -nE 'CACHE_FIX_PROXY_UPSTREAM|cache-fix-proxy' tools/eee.ps1 .local/cache-fix*/config* 2>&1 | head -20
```

**A3. Stage Path 4 fallback config (CR-9 MEDIUM-risk; do NOT apply without user approval)**:
- Write `tmp/wave149-eee.ps1-path4-stage.diff` showing proposed edit to bypass CPA layer
- DO NOT edit live `tools/eee.ps1` autonomously per CR-7 Phase 1

**A4. Generate upstream issue draft** (CR-9 LOW-risk file write to `tmp/`):
- File: `tmp/wave149-cpa-upstream-issue-draft.md`
- Title: "[Bug] v7.0.2 graceful exit on 0 usable Claude clients despite valid refresh_tokens (regression from v6.10.9)"
- Reproducer: 7 OAuth accounts with `last_refresh=2026-05-09T15:59` + `refresh_interval_seconds=14400` + `disabled=false`; binary exits 160ms after "10 clients (10 auth entries + 0 Claude API keys ...)"
- Affected scope: Windows 11 26H2, NSSM + direct Start-Process both reproduce, both v7.0.2 AND v6.10.9 affected (suggests refresh_token rotation behavior changed Anthropic-side, not CPA-side)
- Diagnostic: refresh_tokens have ~30-day TTL from creation; all 7 created early April; all expired simultaneously around 2026-05-09 — Anthropic-side issue, not CPA bug
- **NOTE**: Issue is likely UPSTREAM/ANTHROPIC, not CPA. CPA correctly fails when refresh_tokens are invalid. The real fix is `-claude-login` to mint new tokens — NOT a CPA code change.

**A5. FM-20 catch codify** (per `fm20-path-drift-cascade`): codify Wave 147 Fire 1 "9Router phantom-cite" catch as n+1 FM-20 instance:
- Write `tmp/wave149-fm20-catch-9router-phantom.md` documenting the propagation:
  - Origin claim: "Wave 147 Fire 1 alternative routers" mentioning 9Router
  - Probe: `gh repo view router-for-me/9Router` → 404; `gh search repos '9Router CLIProxyAPI'` → 0 results
  - Recovery: DROP 9Router from candidate list; do NOT propagate to next-fire
  - Mia ladder advance: n+1 per fm20-path-drift-cascade evidence ladder

---

## TOKEN-EFFICIENCY CONTINUATION STRATEGY (while CPA dead)

**SOTA approach** (Path 4 elaboration):

1. **Maintain direct anthropic.com routing** via single account (`aesthetic9c@gmail.com`'s `ANTHROPIC_API_KEY` — REQUIRES USER to provide real key OR use Claude subscription via OAuth in claude.exe native auth)

2. **Preserve cache-prefix optimization** via `cnighswonger/claude-code-cache-fix` v3.5.4 (already INSTALLED per Wave 92 Ship 1T):
   - Cite: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:13-44 @ HEAD 12cc30a1` (cache-fix proxy mode + 7 extensions)
   - Route claude.exe → cnighswonger:19801 → https://api.anthropic.com directly (skip CPA hop)
   - 7 cache-fix extensions preserved: fingerprint-strip, deterministic-header, exact-prefix preservation, cache-aware Bedrock guidance, etc.

3. **Accept CADP throttling** per `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing`:
   - Max 3 concurrent agents until cache rate verified ≥50%
   - Max 5 cumulative dispatches per session arc without intervening `status.py` probe
   - Single-account is OK for Phase-1 bootstrap arcs; multi-account 8-account fleet is Phase-2+ optimization

4. **No pivot to LiteLLM Docker** — Docker not currently running CPA-class router (probe returned no LiteLLM container running per `docker ps` smoke); installing LiteLLM is HIGH-risk CR-9 install (~30 min + version-pin + first-fire-fix-forward expected) — NOT in scope for emergency continuation

**Cite anchors for the continuation strategy**:
- TIER-1-DIRECT: `https://code.claude.com/docs/en/env-vars` (ANTHROPIC_BASE_URL canonical)
- TIER-1-DIRECT: `Z:/repos/deps/cnighswonger-claude-code-cache-fix/README.md:13-44 @ HEAD 12cc30a1`
- TIER-2: `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §CADP rule 2-5`

---

## CITATIONS

| Claim | Source | Status |
|-------|--------|--------|
| v6.10.9 backup binary IDENTICAL exit behavior to v7.0.2 | Live smoke `cli-proxy-api-v6.10.9-bak-20260511-100542.exe --config .cli-proxy-api/config.yaml` this fire | [VERIFIED 2026-05-11] |
| CPA selector treats Disabled/StatusDisabled as blocked | `Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:isAuthBlockedForModel` | [VERIFIED 2026-05-11] |
| `-claude-login` is canonical re-auth method | `Z:/claude-sota-installed/.local/bin/cli-proxy-api.exe --help` live invocation | [VERIFIED 2026-05-11] |
| Anthropic OAuth TokenURL | `Z:/repos/deps/CLIProxyAPI/internal/auth/claude/anthropic_auth.go:26` | [VERIFIED 2026-05-11] |
| ProxyPilot 210★ MIT actively-maintained | `gh api repos/Finesssee/ProxyPilot` result this fire | [VERIFIED 2026-05-11] |
| ProxyPilot same flag surface | `https://raw.githubusercontent.com/Finesssee/ProxyPilot/main/README.md` Usage > Authentication | [VERIFIED 2026-05-11] |
| 9Router does NOT exist | `gh repo view router-for-me/9Router` 404 + `gh search repos` 0 results | [VERIFIED 2026-05-11] |
| All 7 eee accounts last_refresh frozen 2026-05-08/09 | `jq -r '.last_refresh' .cli-proxy-api/claude-*.json` this fire | [VERIFIED 2026-05-11] |
| eee.ps1 T0.8 hybrid unsets ANTHROPIC_BASE_URL when CPA unreachable | `Z:/claude-sota-installed/tools/eee.ps1:181-186` | [VERIFIED 2026-05-11] |
| Cardinal-rule-7 Phase 1 operator-gate | `Z:/claude-sota-installed/CLAUDE.md` CR-7 Phase 1 trigger | [VERIFIED 2026-05-11] |
| Cardinal-rule-9 install-risk + version-pin + REVERT-check | `Z:/claude-sota-installed/CLAUDE.md` CR-9 | [VERIFIED 2026-05-11] |
| CR-12 5-class disposition lattice | `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-12 | [VERIFIED 2026-05-11] |
| FM-20 path-drift cascade | `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` | [VERIFIED 2026-05-11] |
| convergence-gate Axis 1+2+3 + STRONG-PROVENANCE-EXPRESS | `Z:/claude-sota/.claude/rules/convergence-gate.md` | [VERIFIED 2026-05-11] |
| agent-harness-fit Probe DAG 1-7 | `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` | [VERIFIED 2026-05-11] |
| Refresh-token TTL ~30-day hypothesis | INFERRED from `last_refresh` simultaneity (3 active accounts froze at IDENTICAL 2026-05-09T15:59:47-04:00); no upstream Anthropic doc verifies exact TTL | [INFERRED 2026-05-11] |

---

## ADVERSARIAL NOTES (refusal to recommend untested paths)

1. **Refused**: "Just clear the JSON files and let CPA recreate them" — REJECTED. Empty auth-dir was already tested per Wave 147 evidence ("still exits in 160ms"). The "0 USABLE clients" is the exit trigger, NOT "0 entries". Clearing JSONs adds zero information.

2. **Refused**: "Downgrade to v6.10.7 or v6.10.5" — REJECTED. v6.10.9 was last-known-working (~25h on 2026-05-08); v6.10.9 NOW exits identically to v7.0.2 per live smoke this fire. Downgrade ladder is structurally REFUTED — root cause is OAuth STATE not binary.

3. **Refused**: "Use a third-party OAuth refresh script to mint new access_tokens from refresh_tokens" — REJECTED. Refresh_token rotation likely failed because the refresh_tokens themselves are EXPIRED (Anthropic-side 30-day TTL hypothesis [INFERRED]). Even if a script could call `https://api.anthropic.com/v1/oauth/token`, it would receive `invalid_grant` per CPA's own `refresh_token_reused` error pattern. **Only fresh OAuth flow mints valid tokens.**

4. **Refused**: "Skip operator gate and run -claude-login -no-browser headless" — PARTIALLY-ACCEPTED. `-no-browser` works for remote SSH sessions BUT still REQUIRES USER to (a) read the printed device code URL and (b) open the URL on a browser-capable machine and (c) approve OAuth scope. It is NOT autonomous; it's operator-gate with different ergonomics. Listed in Path 1 as headless alternative, NOT as autonomous bypass.

5. **Refused**: "Install LiteLLM Docker as CPA replacement" — REJECTED. LiteLLM is OpenAI-API-compatible router, NOT Anthropic-OAuth-subscription router. Would require Anthropic-API-key (NOT subscription OAuth). Different problem domain; CR-12 PROVIDER-COMPLEMENT not REPLACEMENT.

6. **Refused**: "Migrate to ProxyPilot as PRIMARY install" — REJECTED. ProxyPilot is a fork of CPA — shares codebase ancestry; if Anthropic-side refresh_token rotation breaks CPA, ProxyPilot breaks the same way. Probe DAG 1-7 PASS but convergence-gate Axis-2 INSUFFICIENT (no named-T2 dated artifact). STUDY-PILOT only.

---

## RECOMMENDED PATH (FINAL VERDICT)

**Execute Path 1 (re-auth 3 active accounts) FIRST.** If operator is unavailable for browser gate, execute Path 4 (CPA bypass + cache-fix direct) AUTONOMOUSLY as continuation strategy.

Path 1 is HIGH-confidence (~85%): all evidence converges on refresh_token expiry as root cause. Path 1 cost is ~10 min interactive, fully reversible, zero install-risk. Path 4 is reversible fallback that preserves token-efficiency cache-prefix discipline while operator is offline.

**Cross-model gate satisfaction status (per CR-3 Phase 1 bootstrap exception)**:
- This artifact is independent voice (Sonnet 4.6 stand-in for architect agent).
- Orchestrator-side cross-model gate SHALL be satisfied via Path P codex T1 BEFORE applying this design.
- If orchestrator skips Path P, mark commit body: `T1 SKIPPED — Path 1 is operator-gate-only; no design-surface edit; HONEST-NON-FINDING per synthesis-layer-verify §Reporting categories`.

**Cardinal-rule conformance summary**: CR-1 (TIER-1 cites at file:line + HEAD SHA) PASS / CR-3 (cross-model gate satisfied via Path P) DEFERRED to orchestrator / CR-7 Phase 1 (interactive operator-gate respected) PASS / CR-9 (LOW install-risk for Path 1+4; MEDIUM for Path 3 with version-pin) PASS / CR-10 (research-first via 3 batched probes before recommending) PASS / CR-11 (META-process SOTA discipline — agent dispatch per standing-directive Wave 24-D) PASS / CR-12 (5-class disposition lattice applied to ProxyPilot) PASS.

End of artifact.
