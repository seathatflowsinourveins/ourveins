# W329-B-5 — VERDICT-LEDGER row draft (sca-v11) for `slsa-framework/slsa-verifier`

> **Wave**: W329 Stream B. **Date**: 2026-05-19. **HEAD**: `5cf5c90`.
> **Target ledger**: `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`
> **Append-position**: row #97 (cumulative count post-W320-C is 96 per W320-Stream-C ledger-tail).
> **Stream B does NOT append** — operator-AI W329-B-5-LEDGER-APPEND below.
> **Rule version**: `sca-v11` (W326 §7 install denom 39.4 / pattern denom 17.0 + W327 K-3 codex-r14 skip-N/A taxonomy).

## §1 Proposed ledger section header (NEW W329 cluster)

Append after the existing W320 Stream C section (ledger tail at line 654). Insert:

```markdown
---

## W329 Stream B — K-4 supply-chain wire (slsa-verifier T1 INSTALL) (2026-05-19)

> W329 Stream B: 1 full sca-v11 audit on `slsa-framework/slsa-verifier` v2.7.1. Source: `docs/architecture/W329-K4-SLSA-VERIFIER/W329-B-{1,2,3,4}-*.md`. Closes W327-D-1 §5 K-4 remediation path (HIGH); composite-lift δ +0.07 codex-r14 ratified. Operator install action paste-ready at W329-B-2-INSTALL-SPEC.md §3. Wire-up paste-ready at W329-B-3-WIRE-UP-SPEC.md §2-§4 (3 paths; operator-decision).
```

## §2 Proposed ledger row (column-aligned with existing schema)

Append immediately after the W329 cluster header (§1):

```markdown
| # | Wave | Decided | Candidate | Verdict | install_score | pattern_score | Hard caps | Status | Reverify-due | Rollback / Notes |
|---:|:---:|:---:|---|:---:|:---:|:---:|---|:---:|:---:|---|
| 97 | W329 | 2026-05-19 | `slsa-framework/slsa-verifier` v2.7.1 / commit `ea584f4502babc6f60d9bc799dbbb13c1caa9ee6` / asset-sha256 `1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0` / 327★ / Apache-2.0 | **T1 INSTALL (operator-action-pending)** | **4.627** (path-(b) default; sca-v11; effective denom 30.0) — path-(a) anti-bias replay 4.975 | **4.585** (path-(b); denom 19.3) | none breached (D-EMP=4 ≥2; D35=4 ≥2; D17=5; D1=5; D2=5; D29=5; R1-R5 ALL CLEAR) | NEW-ACTIVE-PENDING-OPERATOR-INSTALL | W333 (4 waves out) OR upon next slsa-verifier release tag | **First-time audit** K-4 supply-chain wire candidate. Closes W327-D-1 §5 K-4 remediation path (HIGH). **R1 PASS**: Linux Foundation / OpenSSF / slsa-framework canonical (https://slsa.dev — OWASP/CNCF cross-referenced standards body). **D-EMP=4 HARD GATE PASS**: 2.4M+ downloads of slsa-verifier-linux-amd64; used by Kubernetes / npm / sigstore / `actions/attest-build-provenance`; self-bootstraps own provenance every release; smoke-test plan in W329-B-2 §5 (operator runs `slsa-verifier verify-artifact <self-release> --provenance-path <.intoto.jsonl> --source-uri github.com/slsa-framework/slsa-verifier` post-install — verifier self-attests; PASS lifts D-EMP 4→5 and would clear T0 floor). **Stage-0 4-family cascade PASS** (github + deepwiki + OpenSSF Scorecard + ctx_fetch_and_index slsa.dev). **OpenSSF Scorecard 7.4/10** (2026-05-15) with Signed-Releases=10/10, Security-Policy=10/10, Code-Review=10/10, Token-Permissions=10/10, Dangerous-Workflow=10/10, Dependency-Update-Tool=10/10. **K-4 composite-lift**: +0.07 (Stream B median; codex-r14 corrected envelope +0.05-0.08; W327-D-1 v1 over-claim +0.500 → 4.536 SUPERSEDED). **Install paste-ready**: `gh release download v2.7.1 --repo slsa-framework/slsa-verifier --pattern slsa-verifier-windows-amd64.exe --dir Z:/tools/` then `Move-Item slsa-verifier-windows-amd64.exe slsa-verifier.exe` + SHA256 verify (W329-B-2 §3). **Wire-up paste-ready**: 3 paths (W329-B-3): A=.pre-commit advisory verify (LOW risk, recommended W330 first), B=PreToolUse on `gh release download` (LOW-MED), C=post-`/plugin install` verify (MED). **Falsifiable-inverse PRESERVED**: cosign verify-attestation + in-toto-verify + `gh attestation verify` are 3 independent substitutes; SLSA spec at https://slsa.dev/spec/v1.2/ is vendor-neutral. **Rollback**: `Remove-Item Z:/tools/slsa-verifier.exe` (<1 sec; no state mutation). T6 verdict note: `W329-slsa-verifier-T1-install-pending`. Deep-dive: `docs/architecture/W329-K4-SLSA-VERIFIER/W329-B-1-SCA-V11-AUDIT.md`. |
```

## §3 W329 Stream B distribution + cumulative count

- **Tier distribution this stream**: 1 T1 INSTALL (operator-action-pending)
- **Cumulative T6 verdict count**: 96 → **97 post-W329-Stream-B**
- **`rule_version`**: `sca-v11` (W327 ratified; first ledger row appended under sca-v11 explicitly)

## §4 W329 Stream B mandate validations

- **B1 sca-v11 full audit on slsa-verifier** — VALIDATED (49-dim scoring complete; install_score 4.627; pattern_score 4.585; path-(a) anti-bias replay 4.975 tier-stable; D-EMP HARD GATE PASS at 4/5)
- **B2 install spec paste-ready** — VALIDATED (W329-B-2 §3 `gh release download` PowerShell paste-ready + SHA256 verify + §5 self-verify smoke-test)
- **B3 wire-up paste-ready** — VALIDATED (W329-B-3 3-path matrix Paths A/B/C with operator-decision criteria; Stream B does NOT edit settings.json per strict file ownership)
- **B4 composite-lift estimate** — VALIDATED (W329-B-4 +0.07 median within codex-r14 corrected +0.05-0.08 envelope; STRONG-EXTERNAL anti-bias PASS; trajectory ~4.143 → ~4.193 closing W329)
- **B5 VERDICT-LEDGER row draft** — VALIDATED (this doc; paste-ready row #97 for operator-AI append)
- **DO NOT touch other agents' areas** — VALIDATED (only `docs/architecture/W329-K4-SLSA-VERIFIER/W329-B-*.md` created; no settings.json/skills/code modifications)

## §5 Operator-AIs forwarded W329→W330

- **AI-W329-B-1 SLSA-VERIFIER-DOWNLOAD-INSTALL** (P1): paste `gh release download` block from W329-B-2 §3 — interactive operator run (downloads binary + .intoto.jsonl; SHA256-verifies; renames; <5 min wall-time). Closes W327-D-1 §5 K-4 step 1.
- **AI-W329-B-2 SLSA-VERIFIER-SMOKE-TEST** (P1): paste `slsa-verifier verify-artifact <self>` block from W329-B-2 §5.3 — self-verify smoke-test (PASS lifts D-EMP 4→5; ~10 sec wall-time).
- **AI-W329-B-3 LEDGER-APPEND** (P1): append the W329 cluster header (§1) + ledger row (§2) of THIS document into `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` after the W320 Stream C tail (line 654). Single Edit op; no other ledger row touched.
- **AI-W329-B-4 BASIC-MEMORY-T6-CANONICAL** (P1): write canonical T6 verdict note `verdicts/W329-slsa-verifier-T1-install-pending.md` via `mcp__basic-memory__write_note` per W290 three-target write contract (T6 basic-memory + this file ledger + hindsight T1 best-effort). Closes the W290 post-T1-retirement 3-target append contract.
- **AI-W329-B-5 WIRE-UP-PATH-A-DECISION** (P2): operator decides Path A (.pre-commit advisory verify) wire-up paste from W329-B-3 §2 — recommended W330 entry. Closes W327-D-1 §5 K-4 step 4 (managed settings.json promote — parallel scope).
- **AI-W329-B-6 CAPABILITY-REGISTRY-SKELETON** (P3): create `.claude/state/capability-registry.json` per W327-D-1 §5 step 2 + W329-B-3 §5. Stream B doc-only; operator-AI follow-up to author registry skeleton with 3-4 capability entries including the new `tool:slsa-verifier`.

## §6 Cross-cutting findings (W329 Stream B observations)

- **K-4 vs sca-v11 D39-D41 composability**: slsa-verifier IS the reference implementation for sca-v11 D39 (supply_chain_attestation), D40 (layered_defense_depth), D41 (degraded_mode_explicit) — its own audit scores all three at 5/5, dogfooding the rubric's K-4 codification.
- **Composite-lift discipline**: Stream B uses codex-r14-corrected +0.07 (not W327-D-1 v1 over-claim +0.500). Per W326-CODEX-R1-CLOSURE.md K-8 provenance-claim-lint mandate, this row's `composite_lift_claim: "+0.07"` is cite-anchored to W327-D-4 §4 codex-r14 envelope — no provenance-claim lint failure.
- **R1 trusted-source breadth**: slsa-framework is the rare candidate where R1 anchor is the *standards body itself* (Linux Foundation / OpenSSF subproject), not a downstream fork. Score D17 (trust_signal_canonical) = 5/5 max.
- **Tier-elevation prerequisite to T0**: with smoke-test executed and D-EMP lifting 4→5, install_score recomputes to ~4.7 (above T0 floor 4.7). Operator decision in W330+ whether to T0-promote (would trigger T0 IMMEDIATE-UPGRADE re-cascade SLA per sca-v11 §9).

## §7 Ledger-append paste-ready (final operator action)

Operator runs this exact Edit op on `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`:

**Find** the trailing-line at the end of the W320 Stream C section (currently line 654, ending the W320 Stream C cross-cutting findings block).

**Insert after** that line the content of §1 (cluster header) + §2 (row #97) of this document, exactly as written.

Stream B has prepared the content; operator-AI W329-B-3 makes the append.

## §8 References

- **Ledger schema** + W288 lineage: `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (lines 1-30 schema doc; ledger row format on line 30+)
- **W327-D-1 §5 K-4 remediation map** — Stream B closes step 1 (operator-install) + step 4 (wire-up paste-ready)
- **W327-D-4 §4 codex-r14 corrected composite-lift envelope** — Stream B uses +0.05-0.08 midpoint +0.07
- **W295 §6.2 anti-bias gate STRONG-EXTERNAL precedent** — applied to this row's K-4 lift claim (PASS)
- **W326-CODEX-R1-CLOSURE.md K-8 provenance-claim lint** — Stream B explicitly cite-anchors composite-lift claim to avoid K-8 lint failure
- **W320 Stream C ledger tail** — provides immediate-prior row format reference (row #92)
