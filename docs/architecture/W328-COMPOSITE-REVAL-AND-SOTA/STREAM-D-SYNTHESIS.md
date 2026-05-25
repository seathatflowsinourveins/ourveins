# W328 Stream D — Synthesis (Composite Re-Eval + SOTA Discovery)

**Wave**: W328 Stream D
**Date**: 2026-05-19
**HEAD at entry**: `2c48b1e`
**Owner**: Stream D (DOC-ONLY scope; NO settings.json / skills / code modifications per W328 STRICT FILE OWNERSHIP)
**Scope**: composite-arch-quality re-evaluation post-R5-unblock + SOTA discovery for W329-W330
**Wall-clock**: ~45 min (Stream D budget; ~5-min synthesis buffer used)

---

## §1 Six deliverables shipped (single stream)

| Deliverable | Path | Type | State |
|---|---|---|---|
| Context snapshot | `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-1-CONTEXT-SNAPSHOT.md` | DOC | SHIPPED |
| Codex round-20 output | `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-2-CODEX-ROUND-20-OUTPUT.md` | DOC (codex-PENDING) | SHIPPED w/ APPENDIX-A reservation |
| Anti-bias gate | `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-3-ANTI-BIAS-GATE.md` | DOC (W295 §6.2 methodology) | SHIPPED |
| Composite lift recompute | `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-4-COMPOSITE-LIFT-RECOMPUTE.md` | DOC (Claude-side anticipated) | SHIPPED |
| SOTA candidates NEW | `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-5-SOTA-CANDIDATES-NEW.md` | DOC (11 candidates under sca-v11) | SHIPPED |
| Plan update | `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/W328-D-6-PLAN-UPDATE.md` | DOC (W329-W330 refresh) | SHIPPED |
| **Stream D synthesis** (this file) | `docs/architecture/W328-COMPOSITE-REVAL-AND-SOTA/STREAM-D-SYNTHESIS.md` | SYNTHESIS | SHIPPED |

---

## §2 Headline findings

### §2.1 Composite-arch-quality post-W327-r3

**Pre-W327-r3 baseline** (per W326-D codex round-13 deep audit): **4.036** (RED ALERT; below 4.5 ship-gate AND below 4.0 YELLOW band by -0.036 margin).

**Post-W327-r3 anticipated** (Claude-side; codex round-20 ratify PENDING per §3):
- Primary estimate: **4.165** (per W328-D-4 §2 layer-mean recompute)
- Anti-bias-capped estimate: **4.143** (per W328-D-3 §5 anti-bias adjustments)
- Codex round-14 R-5 conservative range: **4.10-4.17**

**Δ from W326-D baseline**: **+0.10 to +0.13** (range; midpoint ~+0.107).

### §2.2 R5 PARTIAL-Path-2A unblock observation (CRITICAL state-change)

`.claude/settings.json:92` flipped from `"bypassPermissions"` to `"default"` AND `settings.json:431` `failIfUnavailable` flipped from `false` to `true` at HEAD `2c48b1e` (W327-r3 commit, emerged via parallel-session 6b4b0b4 sweep; NOT introduced by W327 streams).

**Impact** [CORRECTED per Stream A R5 verify audit + codex round-21]: codex-K-1 CRITICAL recommendation PARTIALLY in effect at config level. R5 status corrected to **PARTIAL-HOLD-UPGRADED** (NOT FULL-HOLD as W327-r3 commit body overclaimed); ops-rhythm dwell-count now **11 waves > 8-wave threshold**, so the -0.5 install_score arch-itself penalty CONTINUES TO APPLY per ops-rhythm §1.1 until acceptance-record signed + companion gaps closed. Stream A's 5-control scorecard 4.0/10 evidences sandbox layer remains inert (Windows-native unsupported) + Controls 2/4 zero-wired.

**Companion gaps remain** (W328 Stream A R5 verify scope — NOT YET COMPLETED at this Stream D writing):
1. Operator-signed acceptance-record at `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-OPERATOR-ACCEPTANCE-RECORD.md`
2. signed-audit-trails plugin attest of acceptance-record commit (settings.json:257 currently `false`)
3. CLAUDE.md cardinal-rule R5 corollary line
4. Control 2 audit-logging PreToolUse hook (per sca-v11 §6 Control 2)

**Anti-bias discipline**: per W328-D-3 §1, only +0.100 L1 credit applied (not +0.150 baseline) because companion gaps remain; full +0.150 RESERVED for Path 2A complete in W328 Stream A or W329.

### §2.3 SOTA candidates for W329-W330 deep-dive

Per W328-D-5 multi-MCP fan-out (4 source families — WebSearch + deepwiki + hf-mcp-server + cross-confirm; Perplexity-MCP EXCLUDED per W317-r1 SEV-1 unrotated key carry):

**Top 3 for W329 cascade-floor ≥6 deep-dive**:
1. **`openobserve/openobserve`** (K-2 L6 observability) — single-binary Rust; Windows AMD64 native; LLM AI namespace explicit support (`llm.input`, `llm.output`, `model_name`); ZO_TRACING_HEADER_KEY/VALUE env-vars match Anthropic CC OTel-export contract → drop-in for Phoenix-auth-gap fix. ANTICIPATED tier: **T1-PROV/T2-CHERRY**.
2. **`slsa-framework/slsa-verifier`** (K-4 supply-chain) — official SLSA-Framework verifier; ships `slsa-verifier-windows-amd64.exe` + ARM64 in release matrix; verifies Sigstore Rekor + Fulcio chain. Already specified in W327-D-1 §5 step 1 install pattern. ANTICIPATED tier: **T1 INSTALL candidate**.
3. **AEGIS arxiv 2603.12621** (K-5 wave-coord + K-6 hook signing pattern) — Ed25519-signed + SHA-256 hash-chain audit trail for AI agent tool calls; 14 framework integrations; 1.2% FP rate on 500 benign calls; 8.3ms median latency. ANTICIPATED tier: **T3 PATTERN-STUDY** (vendor-fork the Ed25519+SHA-256 pattern).

### §2.4 W329-W330 trajectory

| Wave | Composite (anti-bias capped) | Status |
|---|---|---|
| W326-D close | 4.036 | RED ALERT |
| W327-r3 close (NOW) | **4.143** | YELLOW (above 4.0; below 4.5) |
| W328 close (range) | 4.14-4.21 (midpoint ~4.18) | YELLOW |
| W329 close (range) | 4.28-4.36 (midpoint ~4.32) | YELLOW upper |
| W330 close (Path 2A) | 4.36-4.42 (midpoint ~4.39) | YELLOW upper |
| W331 micro-wave (Option α) | 4.49-4.55 | GREEN (above 4.5 ship-gate) |

**W331 micro-wave still NEEDED** to cleanly clear 4.5 ship-gate (W330 ~4.39 < 4.5). Total wall-clock to ship-gate: ~18-26h cumulative.

---

## §3 Codex round-20 PENDING note

Codex round-20 (job `task-mpd2gasc-uuric5`; session ID `019e41db-4fe1-70d0-80ed-fa996c06c55c`) was still in `Phase: investigating` at Stream D deadline (~14m 30s elapsed at synthesis ship). Past W327 codex tasks completed in 1-2 min; the xhigh-effort + 4-question composite-recompute scope on this round is **6-14× longer** — possibly hitting tool-permission boundaries (Command declined events observed for several PowerShell `Get-Content` line-extract commands) and iterating workarounds; OR token-budget paced; OR the multi-cite search across sca-v11 + ops-rhythm + W325-R5-UNBLOCK + W327-D-1/4 paths is genuinely deep.

**Path forward** (per W328-D-2 §2 Path A):
- Stream D synthesis SHIPS at composite **4.143** (anti-bias capped) pending codex round-20 ratify
- Codex round-20 output to be grafted into W328-D-2 §3 + W328-D-4 §7 Appendix-A at next W328 commit OR W329 entry
- Codex VERDICT code (APPROVE/REVISE/NEEDS-REVISION/BLOCK) and per-layer scores will be retrospectively anti-bias-checked per W328-D-3 §6

**Codex resume command**: `codex resume 019e41db-4fe1-70d0-80ed-fa996c06c55c`
**Codex companion result command**: `node codex-companion.mjs result task-mpd2gasc-uuric5`

---

## §4 W329 dispatch spec (parallel-Agent-fan-out recommended)

Per CLAUDE.md L13-14 W269 agent-team mandate + sca-v11 cascade-floor ≥6 MCP families discipline, W329 should fire 5 parallel streams (per W328-D-6 §3):

### W329 dispatch (Agent tool calls in single message; 5 parallel streams)

```
Agent(subagent_type=agent-teams:team-feature, prompt="W329 Stream A: K-3+K-4 sca-v11 operational external-auditor mode + D38-D41 SCORED dims + D-EMP arch-self probe pre-spec. Read W327-D-1 §4-§5 + W328-D-5 §2 + sca-v11 §5c + §5b. Output to docs/architecture/W329-SCA-V11-OPERATIONAL/STREAM-A-*.md.")
Agent(subagent_type=agent-teams:team-feature, prompt="W329 Stream B: K-5 FULL wave-coord (SessionStart hook design + merge-bot policy doc + redaction test suite spec). Vendor-fork AEGIS arxiv 2603.12621 Ed25519+SHA-256 hash-chain pattern. Output to docs/architecture/W329-K5-WAVE-COORD-FULL/STREAM-B-*.md.")
Agent(subagent_type=agent-teams:team-feature, prompt="W329 Stream C: K-6 hooks re-enable design (signed-audit-trails + protect-mcp + ECC un-disable; cosign companion install plan). Output to docs/architecture/W329-K6-HOOKS-RE-ENABLE/STREAM-C-*.md.")
Agent(subagent_type=agent-teams:team-research, prompt="W329 Stream D: deep-dive multi-MCP cascade for C2 openobserve + C6 slsa-verifier + C10 AEGIS; all 3 candidates to ≥6 MCP families. Output to docs/architecture/W329-SOTA-DEEP-DIVE/STREAM-D-*.md.")
Agent(subagent_type=agent-teams:team-debug, prompt="W329 Stream E: K-2 OTel headers carry-forward if W328 Stream B did NOT ship K-2. 60-sec env-var paste-ready per W327-D-1 §3 + 24h Langfuse span ingest verify. Output to docs/architecture/W329-K2-OTEL-CARRY-FWD/STREAM-E-*.md.")
```

**Parallel ratio target**: 1.000 (all 5 streams independent; no shared state per K-5 minimal coordination primitive from W328 Stream C).

---

## §5 Composite-trajectory chart (final)

```
4.7 ┤
4.6 ┤
4.5 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SHIP-GATE (4.5)
4.4 ┤                                            ╱── W330 ~4.39 (Path 2A)
4.3 ┤                                     ╱──── W329 ~4.32
4.2 ┤                              ╱──── W328 ~4.18
4.143 ←━━━━━━━━━━━━━━━━━━━━━━━━━━━━ W327-r3 (NOW; anti-bias capped)
4.0 ┤━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ Δ6 YELLOW BAND (4.0)
3.9 ┤
3.8 ┤
3.7 ┤
3.6 ┤
3.5 ┤
3.4 ┤
3.3 ┤
3.2 ┤
    W325-A  W326-D  W327-r3  W328     W329     W330     W331
     4.336   4.036   4.143    ~4.18    ~4.32    ~4.39    ~4.52
                     (NOW)
```

**Status at this Stream D ship**: YELLOW (above 4.0 Δ6 lower band; below 4.5 ship-gate); on-track per W327-D-4 v2 baseline projection.

---

## §6 Cardinal-rule invariants

- **R1**: install primitives only from trusted plugins/skills/agents — HOLD (no install actions in this Stream)
- **R2**: hooks may only be upstream-plugin hooks OR direct upstream-CLI invocations — HOLD (no hook modifications in this Stream; R2-spirit-question per W327-r3 deferred to W328 Stream A R5 verify)
- **R3**: subagents = installed upstream agents OR documented subagent system — HOLD
- **R4**: project behavior in CLAUDE.md + settings.json; `.claude/rules/*.md` permitted ONLY if upstream-plugin-shipped OR operator-curated path-gated via SKILL.md — HOLD (no rules-file modifications; W299-A REVERSAL acknowledged per CLAUDE.md L23)
- **R5**: safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts — ⚠ **PARTIAL-HOLD-UPGRADED** [CORRECTED per Stream A R5 verify audit + codex round-21]; W327-r3 commit body FULL-HOLD claim was overclaim — sandbox layer still inert (Windows-native unsupported); W325-C Option C 4.0/10 5-control wired; 11-wave dwell > 8-wave threshold → -0.5 install_score penalty applies; W329 P0 to sign acceptance-record + close companion gaps

**`self_invented_count: 0` HOLDS** (no rules, no hook bodies, no project-owned prompts added in this Stream).

**CLAUDE.md ≤50-LOC body HOLDS** (no CLAUDE.md modifications in this Stream).

---

## §7 Final ratify

W328 Stream D **SHIPS** with **7 doc deliverables** (incl. this synthesis) documenting the composite-arch-quality re-evaluation post-W327-r3 R5 unblock observation + SOTA discovery for W329-W330. **Composite at W327-r3 close**: **4.143** (anti-bias capped; Claude-side anticipated; codex round-20 ratify PENDING per §3). **Δ from W326-D 4.036**: **+0.107**. **W329-W330-W331 trajectory** projects to **~4.49-4.55 at W331 close** (Path 2A + Option α micro-wave; W331 still needed to cleanly cross 4.5 ship-gate).

**0 settings/skills/code modifications** (DOC-ONLY scope per W328 STRICT FILE OWNERSHIP); all W329 actions are operator-actionable + Claude-actionable paste-ready in W328-D-6 §3 with 5-stream parallel-dispatch spec.

**Cardinal rules R1-R4 HOLD; R5 ⚠ PARTIAL-HOLD-UPGRADED** (per Stream A R5 verify audit + codex round-21 + round-22 finding — W327-r3 commit-body FULL-HOLD claim was overclaim; sandbox layer still inert + 11-wave dwell > 8-wave threshold → -0.5 install_score penalty per ops-rhythm §1.1 continues to apply); `self_invented_count: 0` HOLDS; CLAUDE.md ≤50-LOC body HOLDS.

**Open items for W329 entry**:
1. Codex round-20 retrospective graft into W328-D-2 + W328-D-4 Appendix-A
2. W328-D-3 anti-bias retrospective check on codex output (per-layer Δ > 0.05 triggers re-litigation)
3. W328 Stream A R5 verify completion (acceptance-record signed + R5 corollary in CLAUDE.md)
4. W328 Stream B K-2 OTel operator-confirm Langfuse keys → 24h span ingest verify
5. W329 5-stream parallel-Agent dispatch per §4 spec

**Operator W329 prioritization** (highest-leverage):
- **K-2 OTel headers fix** (60-sec paste-ready env-var) — best leverage per wave-hour at +0.07 composite for 1-min operator action
- **C2 openobserve evaluation** as Phoenix drop-in alternative if K-2 OTel fix takes >24h to verify
- **C6 slsa-verifier install** per W327-D-1 §5 step 1 → unlocks K-4 supply-chain dim wire-up + L5/L7 lift

---

## §8 Cite-anchor master list

- `Z:/claude-sota-installed/.claude/settings.json` (HEAD `2c48b1e`)
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (sca-v11)
- `Z:/claude-sota-installed/.claude/skills/ops-rhythm/SKILL.md` (v1)
- `Z:/claude-sota-installed/docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-1-K1-THROUGH-K7-REMEDIATION-MAP.md`
- `Z:/claude-sota-installed/docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-4-SEQUENCED-W328-W330-PLAN.md`
- `Z:/claude-sota-installed/docs/architecture/W328-K5-MINIMAL-COORD/W328-C-SYNTHESIS.md` (Stream C SHIPPED)
- git commit `2c48b1e` body (W327-r3 R5 unblock observation)
- W316-S5 7-layer Blueprint composite-score formula
- W295 §6.2 anti-bias inverse-test methodology
- W326-D-2 codex GPT-5.5 round-13 (4.036 baseline + 7 K-N concerns)
- AEGIS arxiv 2603.12621 (Ed25519 + SHA-256 hash-chain pattern)
- SLSA Framework slsa-verifier release matrix (Windows AMD64 + ARM64)
- OpenObserve docs (Windows single-binary + LLM AI namespace)
- Langfuse OTel docs (60-sec env-var fix)
- External 3-org-distinct anchors per K-N: NIST 800-53, OWASP, ISO 19011, SOX §404, COBIT 5, SLSA v1.0, Sigstore, Linux Foundation OpenSSF, CNCF, ITIL v4, Google SRE, DORA, Atlassian Kanban, OpenTelemetry CNCF spec
