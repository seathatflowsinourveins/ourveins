# W323 Stream-4 — Research-Architecture v9 Evolution

**Date**: 2026-05-19  **Methodology**: narrowed (ctx_batch_execute local reads + ctx_fetch_and_index for GitHub attestations + deepwiki on slsa-verifier; NO repomix-pack).  **Inputs**: W321-7 sca-v8 PARTIAL-SHIP verdict + W321-8 codex META 3 blindspots + slsa-verifier API surface + GitHub Artifact Attestations doc.

## §1 sca-v9 SHIP-CONDITIONS (carries v8 + adds 5 dims)

**v9 SHIP/DEFER verdict**: **PARTIAL-SHIP-AT-W323** for **D35 + D38 + D39 + D40 + D41**, contingent on three preconditions: (a) v8 PARTIAL-SHIP (D36+D37+Δ42+Δ45) landed first via W322 paste; (b) `slsa-verifier` Windows binary installed (for D39 scoring); (c) capability-registry skeleton present at `.claude/state/capability-registry.json` (for D41 scoring).

| Dim | Name | Scale 0-5 anchor | W_install | W_pattern | Cap | Status |
|---|---|---|--:|--:|---|---|
| **D35** | `mcp_integration_native` | 0=no-MCP; 1=via-wrapper; 2=stdio-MCP; 3=type:http; 4=Streamable-HTTP+taskSupport; 5=plugin-shipped MCP w/ resources+prompts | 0.5 | 0.3 | soft | **SHIP** (deferred from v8) |
| **D38** | `autonomous_loop_compat` | 0=needs-operator; 1=batch; 2=loop w/ care; 3=loop-native idempotent; 4=loop+resume; 5=loop+resume+checkpoint+x-session | 0.5 | 0.2 | soft | **SHIP** (deferred from v8) |
| **D39** | `supply_chain_attestation` | 0=no provenance; 1=cite-only; 2=tag-pinned; 3=SHA-pinned; 4=SLSA-L2-attested (verify-npm-package or verify-artifact passes); 5=SLSA-L3+ reproducible | 0.5 | 0.1 | <2 → T3 cap | **NEW (W321-8 blindspot #1)** |
| **D40** | `layered_defense_depth` | 0=no-controls; 1=permissions.allow only; 2=+permissions.deny; 3=+wired audit hooks; 4=+input/output redaction; 5=+egress inventory+periodic drift diff | 0.4 | 0.2 | <2 → T3 cap | **NEW (W321-8 blindspot #2)** |
| **D41** | `degraded_mode_explicit` | 0=fails-open silently; 1=stderr warns; 2=hard-fail on missing; 3=capability-registry declared; 4=pre-flight probe + JSON state emit; 5=per-workflow REQUIRED/OPTIONAL contracts | 0.4 | 0.2 | <2 → T3 cap | **NEW (W321-8 blindspot #3)** |

**Composite denom impact** (D35-D38 from v8 + D39-D41 new): +0.5+0.5+0.5+0.4+0.4 install = **+2.3 install**, +0.3+0.2+0.1+0.2+0.2 pattern = **+1.0 pattern**. v8.2 denom (33.0/14.6) → **v9 denom 35.3 / 15.6**.

**Arch-itself self-eval projection under v9** (this runtime IS Opus 4.7 on Z:-portable Win32 autonomous-loop): D35=4, D38=3 (loop+care; W269 fan-out present but no checkpoint), D39=2 (SHA-pinned via .mcp.json npx-y@version; no SLSA attestation yet), D40=2 (allow+deny only; signed-audit-trails enabled-but-unwired), D41=1 (stderr warns via bash-home-pin.sh + W321 META; NO capability-registry yet). Projected v9 install_score ≈ 4.28-4.35 / 35.3 — **above 4.0 T1 floor with thin margin**; D40+D41 climb to ≥3 each is the highest-leverage near-term lift.

## §2 R1 evolution — freshness + pin + attestation sub-clauses

**Current R1**: "Install primitives only from trusted plugins/skills/agents."

**Proposed R1 v2** (additive, three sub-clauses; no removal of trusted-source spirit):

- **R1a Freshness**: every cached plugin/MCP/skill has a `max_staleness_days` budget cite-anchored to category — `security-critical: 14d` (gitleaks, trivy, codex), `core-orchestration: 30d` (CC, ECC, wshobson, anthropics/*), `auxiliary: 90d`. Cache-vs-HEAD staleness audited each wave's STREAM-CCBP-ECC + breaches blocked at ship-gate.
- **R1b Pin**: `npx -y <pkg>@<exact-version>` or `uvx --from <pkg>==<exact-version>` or `cargo install <pkg>@<exact-version>` — **NEVER `@latest`** (W286-arc-P0C already mandates this for `.mcp.json`; R1b extends to `permissions.allow` install-class commands).
- **R1c Attestation**: where SOTA-attestation primitives exist, MUST verify pre-install:
  - npm packages → `slsa-verifier verify-npm-package` (experimental, SLSA_VERIFIER_EXPERIMENTAL=1)
  - GitHub release binaries → `slsa-verifier verify-artifact --provenance-path <file>`
  - uvx + cargo → **GAP (track W324 — verifier doesn't ship support)**; fall back to SHA-pin only

## §3 R5 layered-defense spec (5 sub-controls)

**Current R5**: "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts."

**Proposed R5 v2** (5 sub-controls, all upstream-doc-anchored):

1. **R5-LD1 deny-by-default network/secret reads** — extend `permissions.deny` with secret-file globs (already partly: `.env`, `.pem`, `.key`, `id_rsa`); ADD egress patterns (`Bash(curl http*)`, `Bash(wget *)` unless explicit-allowlist).
2. **R5-LD2 wired audit hooks** — `signed-audit-trails@claude-code-workflows` Ed25519 PostToolUse hooks WIRED (currently enabled-but-unwired = false assurance per W321-8). W322 P2 carries.
3. **R5-LD3 prompt/input redaction** — already partial via `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false`; add regex redaction in PostToolUseFailure additionalContext + PreCompact log (regex bank: API keys, tokens, private IPs).
4. **R5-LD4 egress inventory** — catalog every URL/endpoint hooks+MCPs can reach in `.claude/state/egress-inventory.json` (re-built each wave; diff for new endpoints triggers operator review).
5. **R5-LD5 periodic permission-drift diff** — SessionStart hook compares current `settings.json:permissions` against `.claude/state/permissions-baseline.json`; net-new `allow` entries flagged for operator review.

## §4 Degraded-mode-state primitive

**Problem (W321-8 blindspot #3)**: `gitnexus(disabled)` while AGENTS contract requires GitNexus = silent fail-open. Same class: agent-teams, MCPs, slash-commands referenced by skills/agents but disabled in current config.

**Design** (3 layers):

1. **Capability registry** at `.claude/state/capability-registry.json`:
   ```json
   {
     "schema": 1,
     "capabilities": {
       "mcp:gitnexus": { "required_by": ["impact-analysis-skill", "AGENTS:detect-changes"], "current": "MISSING" },
       "mcp:basic-memory": { "required_by": ["mem-recall"], "current": "AVAILABLE" },
       "plugin:codex@openai-codex": { "required_by": ["cross-model-gate"], "current": "AVAILABLE" }
     }
   }
   ```
2. **SessionStart pre-flight probe** (≤2KB cite-anchored shim per R2 exception): probes each REQUIRED capability via HTTP/stdio, writes current state, emits structured JSON to stderr.
3. **Per-workflow contract**: skills/agents declare in frontmatter `requires_capabilities: [...]`; orchestrator checks registry pre-invoke; hard-fail with explicit message (NOT informal redispatch or silent-skip).

**Three states**: `AVAILABLE` (proceed), `DEGRADED` (per-workflow opt-in), `MISSING` (hard-fail).

## §5 SLSA verifier wire plan

**Install**: `gh release download slsa-framework/slsa-verifier --pattern '*windows-amd64.exe' --dir Z:/claude-sota-installed/.local/bin` (existing `Bash(gh release download *)` permission).

**Wire-up** (PostToolUse hooks, advisory-then-blocking phased rollout):
- Hook on `Bash(npm install -g *)` → `SLSA_VERIFIER_EXPERIMENTAL=1 slsa-verifier verify-npm-package` (exit 0 advisory W323; exit 2 blocking W324 after burn-in)
- Hook on `Bash(gh release download *)` → `slsa-verifier verify-artifact --provenance-path <auto-discover .intoto.jsonl>`
- Hook on `Bash(uvx *)` + `Bash(cargo install *)` → **GAP — verifier doesn't support**; log to `.claude/state/attestation-gap.log` and track upstream `slsa-framework/slsa-verifier` for Python/Cargo support

**Limitations** (operator-disclosure):
- Many npm packages don't publish provenance — falls to SHA-pin discipline (R1b) as the floor
- `verify-npm-package` is experimental (`SLSA_VERIFIER_EXPERIMENTAL=1` required); upstream stability watch in W324
- GitHub Artifact Attestations (`actions/attest-build-provenance`) is the publication-side primitive; verification is via `gh attestation verify` OR `slsa-verifier verify-artifact` — wire BOTH for defense-in-depth

## Report-back (3 sentences)

**sca-v9 SHIP/DEFER verdict**: **PARTIAL-SHIP-AT-W323** with D35+D38+D39+D40+D41 (after v8 D36+D37 lands via W322 paste); projected arch-itself install_score ~4.28-4.35/35.3 — clears T1 4.0 floor with thin margin where the highest-leverage near-term lift is D40+D41 (layered-defense wire + capability-registry stand-up). **Most-critical cardinal-rule-evolution**: R5 → layered-defense spec (5 sub-controls), because the current single-layer permission-only stance is what enabled the 3 W321-8 blindspots in the first place — R1 freshness/pin/attestation is secondary because cardinal-rule-2's W286-arc-P0C pin discipline already partially covers R1b. **SLSA verifier feasibility**: PARTIAL — `verify-npm-package` (experimental) + `verify-artifact` (gh releases) cover npm + GH-release vectors but uvx + cargo are upstream gaps tracked W324; wire advisory-first W323 then blocking W324 once burn-in passes.
