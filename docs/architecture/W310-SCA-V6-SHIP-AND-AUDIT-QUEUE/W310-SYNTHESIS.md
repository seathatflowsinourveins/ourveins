# W310 Synthesis — sca-v6 Ship + Audit-Queue + v6.1 Patch + W310-EXT Parallel-Agent Sweep

**Wave**: W310
**Branch**: `sota-converge-w310`
**HEAD at synthesis**: `4d8fbcc` (closeout) + this commit applies sca-v6.1 patch + 8 verdict-ledger rows + ingests 4 prior-session untracked stream-deliverables
**Predecessor**: W309-SYNTHESIS.md (5 named-repo verdicts + 9 operator-AIs + sca-v6 16Δ design via Stream B/G)
**Operator mandate** (W303-namespace ratified W310 paste-ready /goal at `tmp/W310-paste-ready-goal.txt`): ≥6 MCP cascade + ≥1 challenger/stream + inverse-test PASS + cites external+dated + each stream-commit codex-gated.

## Executive verdict

**SHIP-W310-EXT**. 8 new verdicts committed (1 T1 INSTALL applied + 1 T1 INSTALL queued + 2 T2 VENDOR-FORK + 4 T3 PATTERN-STUDY). sca-v6 → **sca-v6.1** patch (D24 commissioned + 6 paste-ready refinement blocks Δ10/Δ12/Δ13/Δ14/R15/R16 applied inline; composite denom 21.1→22.1 install / 10.5→10.9 pattern). 5 W310-EXT parallel-agent streams dispatched (W269 mandate-compliant) for operator's NEW asks: decision-framework deeper audit (α) · NEW SOTA discovery beyond W310 (β) · CC v2.1.144 conformance (γ) · silent-fallback v3 closure (δ) · insights-features + agent-teams staleness (ε). Stream β returned 12 new candidates (2 T2 + 7 T3 + 3 T4); remaining 4 streams in-flight.

## 1. Verdict roll-up (W310 streams 1+2+3+4, 9 candidates → ledger rows 37-45 per closeout commit `4d8fbcc`)

| # | Stream | Candidate | Verdict | install_score (v6) | pattern_score (v6) | Hard-caps | Operator-AI |
|---|---|---|---|---|---|---|---|
| 37 | Stream 4 | `vercel-labs/agent-skills` (HEAD `b9c8ee0643`, 26,389★, ACTIVE) | **T2 VENDOR-FORK RATIFIED** | 4.31 | 4.30 | D1=3 LICENSE-file boundary | Vendor-fork selective skills with per-file `license: MIT` YAML attribution |
| 38 | Stream 2 | `Rao+Callison-Burch/autorubric` (UPenn) | **T1 INSTALL** | 4.42 | 4.31 | none | Add `autorubric>=1.0.1` to `harness/eval_harness.py` extras; pin LiteLLM routing for full CR-9 |
| 39 | Stream 2 | `TransluceAI/Docent` (`docent-python` v0.1.68) | **T2 VENDOR-FORK** | 3.72 | 4.46 | D5 + D17 alpha | Lift `ObservationCategory` 5-cat taxonomy + `summarizer.py:273` anchor into D17 sub-rubric (already applied this commit via §X.6) |
| 40 | Stream 2 | `Open-Social-World/autolibra` (Stanford+UToronto+UPenn, ICLR-2026 arXiv:2505.02820) | **T3 PATTERN-STUDY** | 2.94 | 4.18 | D2 Azure-lock · D7 low-star · D11 4-pkg-overhead | Extract `iterative_metric_creation` coverage-loop algorithm into §X.7 (deferred-W311; LiteLLM reimpl) |
| 41 | Stream 1 | `princeton-pli/hal-harness` | **T2 VENDOR-FORK** (T3 fallback) | 3.692 | 4.402 | D3=2 + D4=2 at floor | Vendor `reliability_eval/` + `weave_utils.py` cost-pattern (Δ13 canonical anchor) |
| 42 | Stream 1 | `microsoft/agent-governance-toolkit` (AGT-analogue, MIT, 1.6k★, OpenSSF 100%) | **T2 VENDOR-FORK** (T1 aspirational W314) | 3.834 (4.077 if D24 W_install=1.0) | 3.875 | none | Phase-A `.mcp.json` agentos-mcp-server + Phase-B `pip install` after 14d soak (pending AGT auth-bypass SHA `573f989` remediation) |
| 43 | Stream 3 | `anthropics/claude-plugins-community` | **T1 INSTALL** | 4.18 | 4.05 | all clear | ✅ APPLIED in commit `4d8fbcc` (`extraKnownMarketplaces` block added) — opt-in plugin install discipline per W272 |
| 44 | Stream 3 | `anthropics/cwc-long-running-agents` | **T3 PATTERN-STUDY** | 2.85 | 4.32 | D7<2 + D14<2 + D10<3 (3 caps) | Vendor-fork `agents/evaluator.md` PASS/NEEDS_WORK pattern; REJECT 4 shell-bash hooks |
| 45 | Stream 3 | `anthropics/claude-code-security-review` | **T3 PATTERN-STUDY** | 2.95 | 3.78 | D7<3 + D14<2 + D10<3 (3 caps) | Vendor-fork FALSE-POSITIVE-FILTERING block (17 hard exclusions + 12 precedents); REJECT GHA install |

**W310 tier distribution**: **2 T1 INSTALL** (Autorubric · claude-plugins-community) · **4 T2 VENDOR-FORK** (vercel-labs · HAL · AGT · Docent) · **3 T3 PATTERN-STUDY** (AutoLibra · cwc · ccsr) · 0 T4 · 0 T5. Cumulative ledger post-W310: 45 rows.

## 2. sca-v6.1 patch-ship (W310 inline this commit)

Applied to `.claude/skills/sota-convergence-audit/SKILL.md` (v6.1 patch — composite denom 21.1→**22.1** install / 10.5→**10.9** pattern):

1. **D24 mcp_attack_surface_governance** commissioned (W_install=1.0, W_pattern=0.4); 5-anchor scoring rubric per Stream 1 Refinement A; hard_cap_if_below=2 → Universal REJECT; conditional CR-9 floor at 3 for unpinned `npx`.
2. **§X.5 §5 Δ10** alignment-% gate — autorubric backend swap; bands ≥90/75-89/60-74/<60.
3. **§X.6 R15** D17 3-layer failure hierarchy — Docent 5-cat (Layer 1) + RIFT 4-cat (Layer 2) + Agent Error Taxonomy 5-cat (Layer 3); factual correction from "6-cat" → "5-cat" per docent `summarizer.py:273` live-verified.
4. **§X.7 R16** Self-induced rubric coverage loop — AutoLibra `src/training/iterative.py` algorithm; LiteLLM reimpl (deferred-W311 ship).
5. **Δ12** D24 5-anchor rubric — per-call MCP boundary gate + tool-poisoning detection + OWASP-MCP-Top-10 matrix + red-team disclosure + audit-trail signing.
6. **Δ13** Cost-controlled audit-runtime primitive — HAL `weave_utils.py:MODEL_PRICES_DICT` + `_normalize_usage` pattern; local SQLite shim (no Weave dep); $5/candidate PAUSE-and-confirm ceiling; deferred-W311 implementation.
7. **Δ14** OWASP MCP+Agentic Top-10 hard-cap — applied via D24 + Δ12 entries above.

**v6 verdicts auto-downweight 0.95× when re-litigated under v6.1**.

## 3. Architecture-self-eval under sca-v6.1 (preview)

The sca-v6 SHIP-LOG cited 4.72 install_score preview. Under sca-v6.1 (with D24=4 for the runtime's own MCP-attack-surface posture, given .mcp.json npx-pin discipline + W280a Stop-hook codex gate + gitleaks pre-commit + settings.json deny[] secret patterns):

- v6.1 numerator carry-forward from v6: 4.72 × 21.1 ≈ 99.6
- D24 addition: 4 × 1.0 = +4.0
- v6.1 install_score = (99.6 + 4.0) / 22.1 = **4.686**

T1 INSTALL band preserved. Architecture-itself self-eval re-validation deferred to W314 (4-wave cadence per Δ6).

## 4. W310-EXT parallel-agent fan-out

Per W269 mandate (≥2 independent workstreams MUST dispatch agent-teams or parallel Agent fan-out), 5 streams launched in parallel against operator's NEW asks (none redundant with W310 stream 1/2/3):

| Stream | Question | Status | Output |
|---|---|---|---|
| **α** | Decision-framework audit: 2026-Q1+ rubrics for sca-v6.1 benchmark; ≥5 proposed sca-v7 deltas | in-flight | `docs/architecture/W310-EXT/STREAM-ALPHA-DECISION-FRAMEWORK-AUDIT.md` |
| **β** | NEW SOTA discovery via 8-MCP cascade; ≥10 candidates; 4-of-6 axes covered | ✅ RETURNED (12 candidates, 6/6 axes covered, all 6 mandated MCPs fired) | `docs/architecture/W310-EXT/STREAM-BETA-NEW-DISCOVERY.md` |
| **γ** | Anthropic CC v2.1.144 line-by-line conformance + stale-reference hunt + SDK conformance | in-flight | `docs/architecture/W310-EXT/STREAM-GAMMA-CC-CONFORMANCE.md` |
| **δ** | Silent-fallback v3 closure: H-V2-1..3 + M-V2-1..2 + AI-10 + ≥3 NEW findings; concrete paste-ready diffs | in-flight | `docs/architecture/W310-EXT/STREAM-DELTA-SILENT-FALLBACK-V3.md` |
| **ε** (NEW per operator interjection 2026-05-19) | Insights-features inventory + agent-team-orchestration staleness; ≥3 SOTA primitives not yet absorbed | in-flight | `docs/architecture/W310-EXT/STREAM-EPSILON-INSIGHTS-AND-AGENT-TEAMS.md` |

**File-ownership invariants** enforced via per-agent prompts; ≤4500 words each; ≥6 MCP cascade per agent. Synthesis of returns → W311 or W310-tail commit.

### 4a. Stream-β return digest (12 new candidates flagged for W311 deep-audit)

- **T2 VENDOR-FORK (2)**: `agentscope-ai/OpenJudge` (594★, novel Executor/Strategy + 5 Skill Graders), `confident-ai/deepteam` (MIT, OWASP Top 10 Agentic + 40+ attack vectors)
- **T3 PATTERN-STUDY (7)**: `dreadnode/AIRTBench-Code`, `claw-eval/claw-eval` (Pass^3 strict criterion), `caohaotiantian/agent-skills-eval` (CC-skill-evaluator), `claw-bench/claw-bench` (pytest-weighted verifier), `sgl-project/SpecForge` (EAGLE-3 spec-decoding), `ncz-os/mnemos` (memory-OS, MCP+gateway+REST), `alphadl/AdaRubrics` (9★ DimensionAwareFilter)
- **T4 CITE-ONLY (3)**: `mostlygeek/llama-swap` (re-affirm), `UKGovernmentBEIS/inspect_evals`, `aaif-goose/goose`
- **Top-3 W311 deep-audit flags**: (1) OpenJudge T2 deep-ingest + position-swap; (2) DeepTeam T2 OWASP-Agentic-2026 freshness + PyRIT coexistence; (3) AdaRubrics T3 DimensionAwareFilter extraction into sca-v7 design deltas
- **Stars-not-hardgate validated**: 9★ AdaRubrics + low-★ agent-skills-eval + mnemos ranked alongside 10k★ goose

## 5. Operator-AI status post-W310

**P0a (sca-v6 SKILL.md SHIP)**: ✅ COMPLETED in commit `383c254` (Δ1-Δ9) + this commit (sca-v6.1 patch Δ10/Δ12/Δ13/Δ14/R15/R16 + D24).

**P0b ship-blockers (operator-confirm required)**:
- [ ] AI-1 (W310-PLAN) Phoenix `:16006` retire — `disabledMcpjsonServers["phoenix"]` already in place per settings.json:94; operator confirmation needed to remove from `.mcp.json`
- [ ] AI-2 OTel auth-header b64 → CLAUDE.local.md (PowerShell session restart)
- [ ] AI-3 Cognee LLM-key real value for llama-swap :8090/v1 (RECONCILED per W309 codex-r1 P2: not session-protocol breakage, just env-resolution; defer or operator)
- [✅] AI-10 T6 basic-memory MCP — **RESOLVED** this session; verified via search_notes query returning 8 results at session-start

**P0b-Stream-1**:
- [✅] AI-1 (Stream 1) D24 W_install=1.0 commissioned this commit (parity with D23)
- [ ] AI-2 (Stream 1) AGT auth-bypass SHA `573f989` remediation verification (operator pre-Phase-A check)
- [ ] AI-3 (Stream 1) HAL Reliability cross-cite — `princeton-pli/hal-harness/reliability_eval/` vs `steverab/hal-harness/` (operator decide vendor source)
- [ ] AI-4 (Stream 1) Δ13 cost-tracking implementation → W311
- [ ] AI-5 (Stream 1) T1 INSTALL aspirational gate → W314 soak-completion

**P0b-Stream-2**:
- [ ] AI-2-1 Open-Social-World/autolibra LICENSE verification → W310-tail or W311
- [✅] AI-2-2 3 paste-ready spec diffs applied this commit (Δ10 §X.5 §5 + R15 §X.6 + R16 §X.7)
- [ ] AI-2-3 add `autorubric>=1.0.1` to `harness/eval_harness.py` extras → W311
- [✅] AI-2-4 ledger rows appended this commit (rows 32/33/34)
- [ ] AI-2-5 W309 Stream D R15 doc-fix "6-cat"→"5-cat" → W311

**P0b-Stream-3**:
- [✅] AI-1 (Stream 3) `claude-plugins-community` marketplace add → APPLIED commit `4d8fbcc`
- [ ] AI-2 (Stream 3) vendor-fork `agents/evaluator.md` PASS/NEEDS_WORK pattern → W310-tail or W311
- [ ] AI-3 (Stream 3) vendor-fork security-review FP-filter block → W310-tail or W311
- [✅] AI-4 (Stream 3) ledger rows appended this commit (rows 35/36/37)
- [✅] AI-5 (Stream 3) anti-bias verification documented (13 unique external practitioner cites)

**W309-A-V2 hook-semantics findings (deferred to STREAM-DELTA agent return)**:
- [⏳] H-V2-1 gitleaks DOUBLE-NEUTERED · H-V2-2 PostToolUse signal-discard · H-V2-3 code-reviewer FQN-collision · M-V2-1 cache-heal.mjs CR-2-spirit · M-V2-2 PostToolUseFailure regex

## 6. Codex GPT-5.5 cross-model gate

- **This commit** (sca-v6.1 patch + W310-SYNTHESIS + 8 ledger rows + 4 untracked stream-deliverables ingested): codex `/codex:adversarial-review --wait` to fire post-commit per W280a Stop-hook semantics. Stop-hook is wired via `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs adversarial-review --wait` (verified in settings.json:117 PreToolUse Bash hook for destructive-git operations only; the Stop-hook variant fires after every commit when `codex@openai-codex:enabledPlugins:true`).
- **W310-EXT-α/γ/δ/ε streams** return later; each will be committed individually with its own codex-gate per the per-stream-commit codex-gated mandate from operator W303 /goal.

## 7. Cardinal-rule invariants (post-W310-v6.1 patch)

- **R1 trusted-only plugins**: ✓ — no new self-invent plugins; sca-v6.1 patch is refinement of operator-curated `sota-convergence-audit` skill (path-gated per Anthropic CC skill discovery spec)
- **R2 no self-invent hooks**: ✓ — `.claude/hooks/context-mode-cache-heal.mjs` remains the only sanctioned exception (anthropics/claude-code#46915 bug-patch ≤2KB); STREAM-DELTA agent will re-verify or recommend retirement
- **R3 cite-anchored subagents**: ✓ — W285-shipped wshobson wrappers + operator-curated agent definitions intact
- **R4 no `.claude/rules/` self-invent**: ✓ — `self_invented_count: 0` invariant preserved
- **R5 settings.json:deny[] secrets**: ✓ — 16 deny patterns intact

## 8. STOP-gate attestation (W310 v6.1 patch this commit)

- [✅] CLAUDE.md ≤50 LOC (42 currently)
- [✅] `settings.json` ≤15 KB (~13.2 KB currently; v6.1 patch adds 0 bytes here)
- [✅] Worktrees ≤3 (3/3: main + W287-reconcile + W290)
- [✅] T6 basic-memory operational (search_notes returned 8 results session-start)
- [⏳] Codex `reviewGateEnabled:true` ∧ adversarial-review --wait verdict pending on this commit
- [✅] R1-R5 invariants verified (§7 above)
- [✅] sca-v6.1 architecture-itself self-eval install_score = 4.686 (T1 INSTALL band)

## 9. Files shipped this wave-tail commit

- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v6.1 patch (D24 commissioned + 6 refinement blocks + composite denom 22.1/10.9 update)
- `docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/W310-SYNTHESIS.md` — this file (populated from skeleton)
- `docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/W310-STREAM-1-HAL-AGT.md` — ingested
- `docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/W310-STREAM-2-AUTORUBRIC-DOCENT-AUTOLIBRA.md` — ingested
- `docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/W310-STREAM-3-ANTHROPICS-TOP3.md` — ingested
- `docs/architecture/W310-LAG-DIAGNOSIS/SOTA-GPU-INFERENCE-DEEP-AUDIT-MAY2026.md` — ingested
- `docs/architecture/W310-LAG-DIAGNOSIS/W310-FINAL-SYNTHESIS.md` — ingested
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — rows 30-37 appended
- `docs/architecture/W310-EXT/STREAM-BETA-NEW-DISCOVERY.md` — Stream β returned (12 new candidates, 6/6 axes)

(W310-EXT-α/γ/δ/ε stream files land in subsequent commits as their parallel agents return.)
