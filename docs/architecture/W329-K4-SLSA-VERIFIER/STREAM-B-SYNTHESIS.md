# W329 Stream B — Synthesis (K-4 supply-chain wire via slsa-verifier)

> **Wave**: W329. **Stream**: B. **Date**: 2026-05-19. **HEAD**: `5cf5c90`. **Auditor**: Claude orchestrator (cross-model ratify pending — codex Stop-hook gate post-commit).
> **Scope**: install spec + wire-up paste-ready + sca-v11 audit + composite-lift estimate + ledger row draft for `slsa-framework/slsa-verifier`.
> **Strict file ownership**: `docs/architecture/W329-K4-SLSA-VERIFIER/*` only. NO settings.json / NO skills / NO code edits.
> **Cardinal-rule invariants**: R1-R5 ALL HOLD. `self_invented_count: 0` HOLDS. CLAUDE.md ≤50-LOC body HOLDS.

## §1 Stream B deliverables (6 docs in `docs/architecture/W329-K4-SLSA-VERIFIER/`)

| # | File | Size estimate | Purpose |
|---|---|---|---|
| 1 | `W329-B-1-SCA-V11-AUDIT.md` | ~14 KB | Full 49-dim sca-v11 audit; verdict T1 INSTALL; install_score 4.627; D-EMP HARD GATE PASS |
| 2 | `W329-B-2-INSTALL-SPEC.md` | ~6 KB | Paste-ready `gh release download v2.7.1` + SHA256 verify + self-verify smoke-test |
| 3 | `W329-B-3-WIRE-UP-SPEC.md` | ~6 KB | 3 wire paths (A=pre-commit, B=PreToolUse, C=post-`/plugin install`) — operator-decision matrix |
| 4 | `W329-B-4-COMPOSITE-LIFT-ESTIMATE.md` | ~4 KB | K-4 supply-chain wire composite-lift +0.07 (codex-r14 corrected) |
| 5 | `W329-B-5-LEDGER-ROW-DRAFT.md` | ~6 KB | VERDICT-LEDGER row #97 sca-v11 draft; operator-AI append-pending |
| 6 | `STREAM-B-SYNTHESIS.md` | this file | Stream closure + W330 follow-up |

## §2 Headline findings (6 sentences)

1. **slsa-verifier v2.7.1 is T1 INSTALL eligible** under sca-v11 rubric with install_score **4.627** (above T1 floor 4.5; path-(a) anti-bias replay 4.975 tier-stable) — D-EMP HARD GATE PASS at 4/5 (2.4M+ downloads + Kubernetes/npm/sigstore field-exercise + self-attesting provenance every release).
2. **Stage-0 4-family cascade PASS** (github + deepwiki + OpenSSF Scorecard 7.4/10 + ctx_fetch_and_index slsa.dev) with `cascade_degraded=false` — no further cascade-completion-gate hold required.
3. **K-4 supply-chain wire composite-lift: +0.07** (codex-r14 corrected envelope +0.05-0.08 per W327-D-4 §4; supersedes W327-D-1 v1 over-claim +0.500); trajectory ~4.143 → ~4.193 closing W329 (Path 2A target).
4. **Operator install action paste-ready** (W329-B-2 §3): `gh release download v2.7.1 --repo slsa-framework/slsa-verifier --pattern slsa-verifier-windows-amd64.exe --dir Z:/tools/` + SHA256 verify against pinned `1d8f61ad747ecc3d375d2a563cebf2991748b7da1a9bda9a500804c3c499e3c0` + rename to `slsa-verifier.exe` — ~5 min wall-time; rollback `Remove-Item` <1 sec.
5. **3 wire-up paths paste-ready** (W329-B-3): Path A (.pre-commit advisory verify, LOW risk, recommended W330 first), Path B (PreToolUse on `gh release download`, LOW-MED), Path C (post-`/plugin install` verify, MED) — operator decides which to wire; Stream B does NOT edit settings.json.
6. **VERDICT-LEDGER row #97 sca-v11 draft prepared** (W329-B-5 §2) for operator-AI append to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` after W320 Stream C tail (line 654); 6 operator-AIs forwarded W329→W330 (W329-B-5 §5).

## §3 Operator-action checklist (W329→W330)

- [ ] **AI-W329-B-1 INSTALL** (P1, ~5 min): paste W329-B-2 §3 PowerShell block — `gh release download` + SHA256 verify + Move-Item rename.
- [ ] **AI-W329-B-2 SMOKE-TEST** (P1, ~10 sec): paste W329-B-2 §5 self-verify block — `slsa-verifier verify-artifact <self>` smoke; PASS lifts D-EMP 4→5.
- [ ] **AI-W329-B-3 LEDGER-APPEND** (P1, single Edit op): append W329-B-5 §1 + §2 to VERDICT-LEDGER.md.
- [ ] **AI-W329-B-4 T6-CANONICAL** (P1): `mcp__basic-memory__write_note verdicts/W329-slsa-verifier-T1-install-pending.md` per W290 three-target write contract.
- [ ] **AI-W329-B-5 WIRE-UP-A-DECISION** (P2, W330 entry): paste Path A .pre-commit-config.yaml snippet from W329-B-3 §2 (advisory-first; LOW risk).
- [ ] **AI-W329-B-6 CAPABILITY-REGISTRY** (P3, W330+): author `.claude/state/capability-registry.json` skeleton per W329-B-3 §5 + W327-D-1 §5 step 2.

## §4 W330 follow-up roadmap

| Wave | Action | Owner | Composite-lift |
|---|---|---|---|
| W329 | Stream B deliverables (this) — operator install paste-ready | Claude (done) | doc-prep only |
| W329→W330 boundary | Operator runs AI-W329-B-1 install + AI-W329-B-2 smoke + AI-W329-B-3 ledger-append + AI-W329-B-4 T6 | Operator + AI | +0.05 (install lands; ledger appended) |
| W330 | AI-W329-B-5 Path A .pre-commit wire | Operator | +0.02 marginal (advisory-first) |
| W330 | sca-v11 K-3 split skip-N/A (W329 Stream A) | Stream A | +0.03-0.05 K-3 (separate stream) |
| W330+ | AI-W329-B-6 capability-registry skeleton | Operator-AI | doc-state codification (no composite lift on its own; preserves D31 version_pin_explicit) |
| W331 (micro-wave per codex-r14 recommendation) | Path B + Path C wire + W331 gap-close | Stream B' or merged | +0.02-0.03 (closes K-4 fully) |

## §5 Cross-cutting findings (W329 Stream B)

- **K-4 closes sca-v11 dogfood**: slsa-verifier IS the reference impl for sca-v11 D39 (supply_chain_attestation), D40 (layered_defense_depth), D41 (degraded_mode_explicit) — its own audit scores all three at 5/5, validating the W327 K-4 P1c new-dim codification.
- **R1 trusted-source breadth (rare)**: slsa-framework is the *standards body itself* (Linux Foundation / OpenSSF subproject), not a downstream fork — D17 trust_signal_canonical = 5/5 max. This is the highest R1-tier candidate audited under sca-v11.
- **Composite-lift discipline (W326 K-8 provenance-claim lint)**: Stream B uses codex-r14-corrected +0.07 cite-anchored to W327-D-4 §4 envelope, NOT W327-D-1 v1 over-claim +0.500. K-8 lint PASS.
- **Falsifiable-inverse preserved (D46)**: cosign + in-toto-verify + `gh attestation verify` are 3 independent substitutes; SLSA spec at https://slsa.dev/spec/v1.2/ is vendor-neutral. K-4 capability is substrate-agnostic.
- **Codex r14 ratify pre-emptive**: Stream B doc-only; composite-lift claim falls within codex-r14 envelope. Round-N post-commit Stop-hook gate ratify expected PASS-CLEAN or PASS-WITH-OBSERVATIONS (no Axis-3 over-claim risk).

## §6 Cardinal-rule + invariant attestation

- **R1 trusted-source**: PASS — slsa-framework is Linux Foundation / OpenSSF canonical standards body. Not a downstream fork; not a hobbyist account.
- **R2 hooks discipline**: PASS — Stream B doc-only; no `.claude/hooks/scripts/*` created. Wire-up paths in W329-B-3 are paste-ready direct-CLI invocations for settings.json (operator-decision, not Stream B edit).
- **R3 subagents**: N/A — slsa-verifier is a CLI binary, not a CC subagent.
- **R4 project behavior**: PASS — no `.claude/rules/*.md` created; Stream B output lives in `docs/architecture/W329-K4-SLSA-VERIFIER/`.
- **R5 safety boundaries**: PASS — install action is operator-interactive (R5 via permissions); verifier exits 1 on failure (fails-closed); no false-assurance condition.
- **`self_invented_count: 0`**: HOLDS — zero non-bootstrap files; only audit/spec/synthesis docs under W329-K4-SLSA-VERIFIER/.
- **CLAUDE.md ≤50-LOC body**: HOLDS (no CLAUDE.md edit by Stream B).
- **VERDICT-LEDGER.md not edited** (operator-AI W329-B-3 appends): HOLDS.
- **settings.json not edited**: HOLDS.
- **No skill / no MCP server / no plugin / no agent installed by Stream B**: HOLDS.

## §7 Final ratify (5 sentences)

W329 Stream B **SHIPS** with **6 doc deliverables** documenting the K-4 supply-chain wire foundation via `slsa-framework/slsa-verifier` v2.7.1 (Linux Foundation / OpenSSF canonical), fully audited under sca-v11 (install_score 4.627, path-(a) anti-bias replay 4.975, T1 INSTALL verdict, D-EMP HARD GATE PASS 4/5, R1-R5 ALL CLEAR), with composite-lift δ +0.07 cite-anchored to codex-r14 corrected envelope (W327-D-4 §4). Operator install paste-ready (`gh release download v2.7.1 ... + SHA256 verify + self-verify smoke-test`) and 3 wire-up paths paste-ready (.pre-commit advisory + PreToolUse + post-plugin-install) at operator-decision; Stream B does NOT execute the install or wire-up per strict file ownership + cardinal-rule R5 operator-interactive gate. **VERDICT-LEDGER row #97 sca-v11 draft prepared** (T1 INSTALL, install_score 4.627, pattern_score 4.585, NEW-ACTIVE-PENDING-OPERATOR-INSTALL, reverify-due W333) for operator-AI append to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` after W320 Stream C tail; 6 operator-AIs forwarded W329→W330 (install + smoke + ledger-append + T6-canonical + Path A wire + capability-registry skeleton). **0 settings/skills/code modifications** (DOC-ONLY scope); cardinal-rule invariants R1-R5 HOLD; `self_invented_count: 0` HOLDS; CLAUDE.md ≤50-LOC body HOLDS; Stream B closes W327-D-1 §5 K-4 step 1 (operator-install action) + step 4 (managed-settings.json wire-up paste-ready). Operator may proceed at W329→W330 boundary with the §3 checklist; codex Stop-hook gate ratification expected PASS-CLEAN or PASS-WITH-OBSERVATIONS (no Axis-3 over-claim risk; composite-lift claim within codex-r14 corrected envelope).
