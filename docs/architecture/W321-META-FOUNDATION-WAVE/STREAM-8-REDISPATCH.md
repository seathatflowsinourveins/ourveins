# W321 Stream-8 RE-DISPATCH — codex GPT-5.5 META adversarial review on architecture

**Date**: 2026-05-19
**Methodology**: inline PowerShell + `codex-companion.mjs task --effort high` (NO fork wrapping — prior fork burned 545K tokens with no artifact). Architecture snapshot embedded directly in prompt per goal-prompt-synthesis §6.2.

## Codex round-1 META verdict: **REVISE** + 3 architecture-level blindspots

### Blindspot #1 — Trust is overloaded with "upstream"

> "R1-R4 reduce self-invention, but they do not prove installed artifacts are fresh, reviewed, pinned, attested, or still maintained. '47 enabled plugins from 16 marketplaces' is not a SOTA surface; it is an unbounded supply-chain and behavior-composition surface. `everything-claude-code@2.0.0-rc.1` being behind HEAD and `signed-audit-trails` being enabled-but-unwired are symptoms."

**Implication**: cardinal-rule-1 needs **freshness + pin + attestation** sub-clauses beyond trusted-source. SOTA-repo trust ≠ SOTA-state trust.

### Blindspot #2 — R5 too weak for actual threat model

> "'CC permissions + sandboxing only' over-trusts a single product permission layer while the env allows broad execution like `Bash(uvx *)`, custom `HOME`/`USERPROFILE`, MCPs, browser automation, memory, and observability egress. Anthropic documents settings/hooks/permissions as configurable controls, not as a complete security boundary. R5 should require layered controls: deny-by-default network/secret reads, wired audit hooks, prompt/input redaction, egress inventory, and periodic permission-drift diffing."

Cited: https://docs.anthropic.com/en/docs/claude-code/settings + /hooks

**Implication**: R5 evolution to **layered defense** spec:
- Deny-by-default network/secret reads
- Wired audit hooks (P2 signed-audit-trails)
- Prompt/input redaction
- Egress inventory
- Periodic permission-drift diffing

### Blindspot #3 — Agent orchestration may fail open

> "Snapshot says `gitnexus(disabled)`, but the local AGENTS contract requires GitNexus impact analysis before symbol edits and detect-changes before commit. That is an architecture contradiction: the rule layer can demand gates that the runtime cannot execute. Same risk applies to agent-teams, MCPs, and slash-command workflows: if a capability is missing/stale/disabled, the orchestrator needs a hard 'degraded mode' state, not informal redispatch."

**Implication**: introduce **degraded-mode-state** primitive — explicit declaration when capabilities are unavailable, with hard fail rather than informal silent-skip.

## Cruft-plugin flagged for removal

**`signed-audit-trails`** — currently enabled-but-unwired. False assurance until PostToolUse Ed25519-signing hooks land in `settings.json`. Either:
- (a) Wire the hooks (W322 P2) — preferred
- (b) Disable the plugin until hooks ready — operator-decision

## Missing SOTA practice: SLSA/Sigstore provenance verification

Codex recommends adopting:
- **GitHub Artifact Attestations** per https://docs.github.com/actions/concepts/security/artifact-attestations
- **slsa-framework/slsa-verifier** per https://github.com/slsa-framework/slsa-verifier
- Maps to **SLSA Build Level 2** baseline

Applied to: installed plugins + MCPs + hooks + vendored skills. Not just cite-anchors (which we have) but cryptographic attestation chain.

## W323 forward-AIs

1. **W323-A** cardinal-rule-1 evolution — add freshness + pin + attestation sub-clauses
2. **W323-B** cardinal-rule-5 evolution — layered-defense spec (5 sub-controls)
3. **W323-C** degraded-mode-state primitive — declare when capabilities unavailable
4. **W323-D** SLSA verifier wire — `slsa-framework/slsa-verifier` for plugins + MCPs + skills
5. **W323-E** signed-audit-trails resolve — wire OR disable (no false-assurance middle state)
6. **W323-F** ECC `/plugin update` from 2.0.0-rc.1 → d6022d6b (21d freshness fix per blindspot #1)

## Report-back (3 sentences)

Codex META review returned REVISE — not on the W322 /goal ranking (that achieved APPROVE at round-3) but on the OVERALL architecture. Top-3 blindspots: trust-overloaded-with-upstream (freshness/pin/attestation gaps), R5-too-weak (single-layer permissions vs layered-defense needed), agent-orchestration-fails-open (gitnexus-disabled-but-required = contradiction). Cruft-to-remove: `signed-audit-trails` enabled-but-unwired = false assurance. Missing SOTA: SLSA/Sigstore provenance verification via GitHub Artifact Attestations + slsa-verifier.

## Methodology validation

Inline PowerShell + direct codex call: 1 tool use, ~3K tokens of architecture snapshot, ~90s wall, complete deliverable with 3 blindspots + cruft + SOTA-missing identification. Compare to prior fork (545K tokens, 0 deliverable bytes). Confirms W322 P6 root-cause + W321 META silent-fallback pattern.
