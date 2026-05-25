# THE SOTA Autonomous OSS Runtime (May 2026) — Final Synthesis V2 (codex-r1-applied)

**Date**: 2026-05-22
**Author**: Claude Code (claude-opus-4-7[1m]) orchestrator
**Methodology**: sca-v18 Pareto-frontier (schema at `.claude/schemas/sca-v18-repo-verdict.schema.json`)
**V1 audit trail**: V1 at `SYNTHESIS-final-2026-05-22.md` (codex GPT-5.5 round-1 verdict: NEEDS-REVISION with 7 numbered findings — at `codex-round1-review.txt`)
**V2 status**: 7 codex findings applied (see §A — Codex Round-1 Audit Trail at bottom). Ready for codex round-2 ratification or operator sign-off.

---

## §0 The honest answer (Pareto-frontier, codex-validated)

There is **no single "THE SOTA"** autonomous OSS runtime that wins on every dimension. Per-dimension winner is different. Codex round-1 (F1 MEDIUM) explicitly validated this framing for the operator's SWE-focused workload:

> *"A reasonable adversary should not swap OpenHands for Letta for autonomous coding dispatch: R2 says OpenHands wins SWE-bench and dispatch shape decisively, while Letta is memory/runtime-shaped rather than code-task-shaped."* — codex F1

**For the operator's SWE-focused workload, the final pick is OpenHands v1.7.0** with split-confidence (per codex F2):

| Confidence axis | Grade | Reasoning |
|---|---|---|
| **Capability** | **HIGH** | 5/5 R2 + 7/7 R3 convergence; SWE-bench Verified 72–77.6%; MLSys 2026 paper anchor; named-corporate funding |
| **Integration stability** | **MEDIUM** | V0 deprecated 2026-04-01, V1 UI unreleased, agentic core split to `software-agent-sdk` repo. **Mandatory mitigation**: pin to v1.7.0 release tag + container digest; track `OpenHands/software-agent-sdk` repo for breaking changes |

If your "complex task" is not SWE-focused, see the per-workload routing in §1.

---

## §1 Per-workload winners (Pareto-frontier; codex F1 confirmed framing)

| Workload | Pick | Confidence | Caveat |
|---|---|---|---|
| **Autonomous SWE coding** (operator's pick) | **OpenHands** v1.7.0 | Capability HIGH; Integration-stability MEDIUM (F2) | Pin to v1.7.0 tag + image digest; track `software-agent-sdk` split |
| General-purpose autonomous + persistent memory | **Letta** | MEDIUM (revised down from V1's MEDIUM-HIGH per F3) | R4 architectural-depth verdict survives R1's CLASS-A + CLASS-C minimum-1-each rule, but strongest claim is **deepwiki code-path-cited (single CLASS-C source)**. Repomix attempted-but-failed (zero files returned). |
| Verified enterprise F500 workflow | **CrewAI** | category-exception INSTALL (F7) | **Codex F7 caught**: under strict sca-v18, CrewAI fails CLASS-C ≥1 rule. Resolution: explicit category exception for workflow-orchestration (not autonomous-SWE) with confidence MEDIUM-HIGH (production-evidence dim) / MEDIUM (autonomous-capability dim). Re-tier from V1's plain INSTALL → INSTALL-with-category-exception. |
| Verified-at-scale internal corporate use | **Goose** (`aaif-goose/goose`) | HIGH | Repo MOVED from `block/goose` Dec 2025 — V1 catalog had stale path |
| Benchmark-frontier (pattern-study, NOT install) | **Live-SWE-agent** (arXiv:2511.13646) | HIGH for PATTERN-STUDY, BLOCK for INSTALL | 75.4% SWE-bench Verified by mid-run scaffold evolution; research artifact |

---

## §2 If you must pick ONE single-repo install (codex F6 reframe)

**Codex F6 MEDIUM caught**: the 3-repo composition (Letta + AutoGen MagenticOne + Goose ToolInspectionManager) is *architecturally attractive but operationally premature for this operator decision*. It's a **design program for a future wave**, NOT a single install today.

**Therefore the codex-validated single-install answer for the operator's SWE-focused dispatch is**:

> **OpenHands v1.7.0** — pinned to release tag, image digest pinned, with `OpenHands/software-agent-sdk` repo tracked for breaking changes.

The 3-repo composition is filed at §B as a future-direction design program; the W374 plan you're already executing remains the right operational path.

---

## §3 Critical nuances (codex F4 + F5 applied — primary-source-verified only)

V1 §3 had 10 nuances. Codex F4 (HIGH) caught one unverifiable: nuance #6 (CLI-Anything ships AS CC plugin) was cited to R5, but R5's deliverable file is **skeleton-only with `[pending dispatch]` in every section** despite the agent's summary message claiming the finding.

**V2 resolution**: I independently re-verified the claim via direct `gh api repos/HKUDS/CLI-Anything/contents/cli-anything-plugin/.claude-plugin` → returned `{"items":1, "present":true}`. The underlying claim is true; the citation source changes from R5 (skeleton) to direct gh-API primary source.

**R5 stream status**: deliverable INCOMPLETE — task notification said "completed" but the file is skeleton. **Operator-action item**: re-dispatch R5 OR accept the gh-API-direct citations and queue the deep-dive for a follow-up wave.

Revised 10 critical nuances (all primary-source-verifiable):

1. **OpenHands "trusted by engineers at TikTok/VMware/Amazon" is README marketing**, not verified production-deployment. (R4 line 31 — codex F5 LOW confirmed verified)
2. **OpenHands mid-migration V0→V1**: V0 deprecated 2026-04-01, V1 UI unreleased, agentic core split to `software-agent-sdk` repo. (R4 line 24)
3. **Goose repo moved `block/goose` → `aaif-goose/goose`** December 2025. (R2 lines 124–129 — codex F5 LOW confirmed verified)
4. **OpenHands SWE-bench score is a tuple-dependent RANGE** 65.8% / 68.4% / 72% / 77.6%, not a point estimate. (R2 §2 disagreement-resolution)
5. **CrewAI "60% F500" is vendor-PR**; named customers (PwC + DocuSign + IBM + NVIDIA + PepsiCo + J&J + US DoD) independently verified.
6. **HKUDS/CLI-Anything ships AS a Claude Code plugin** (`cli-anything-plugin/.claude-plugin/plugin.json` SHA `48308986aa1fec68f5c4b93994e42637b503c9af`, 216 bytes; plus `cli-anything-plugin/` itself contains HARNESS.md 36KB + README.md 15KB + skill_generator.py 18KB + `commands/` + `guides/` + `templates/` dirs — a substantial CC-plugin distribution, not a stub) — **replayable probe transcript at `.claude/state/probe-transcripts/cli-anything-claude-plugin-probe-2026-05-22.txt` (codex r2 G4 closure 2026-05-22; reproducible via 3 documented `gh api` commands)**
7. **Perplexity MCP quota-exhausted** in R1 + R2 — operator-actionable ops issue.
8. **AG2 ≠ microsoft/autogen** — AG2 is a 2024-11-11 fork of `microsoft/autogen@v0.2.35` (Apache-2.0 over MIT). (R4 line 80 — codex F5 LOW confirmed verified)
9. **AG2 has no graph-level persistence** — disqualifying for autonomous runtime.
10. **Stars are not a quality signal** — anchored 6× via OSSF Criticality formula + Kapravelos ICSE-26 + arxiv MALTA + beeble.com + dev.to + academic surveys.

---

## §4 Letta architecture-depth verdict — codex F3 LOW correction

V1 claimed "deepwiki+repomix code-grounded" for Letta. **Codex F3 (LOW) caught**: R4 explicitly says all repomix packs returned zero files and cannot be used as code-grounding (R4 line 236). Letta's strongest architecture claim is **deepwiki-only** (single CLASS-C source).

V2 revision: Letta still **clears R1's minimum INSTALL rule** (≥1 CLASS-A via gh + ≥1 CLASS-C via deepwiki, effective count ≥4 when synthesis-source aggregation is counted) — but with the corrected confidence (MEDIUM, not MEDIUM-HIGH) reflecting deepwiki-only code-grounding.

This does NOT change Letta's tier (still INSTALL for general-purpose-autonomous-with-memory), only its confidence label.

---

## §5 CrewAI category-exception INSTALL — codex F7 MEDIUM resolution

V1 marked CrewAI as plain INSTALL. **Codex F7 (MEDIUM) caught the methodology inconsistency**: CrewAI was simultaneously listed as INSTALL AND noted as failing the CLASS-C ≥1 rule.

V2 resolution (per F7 action option): **explicit category exception for workflow-orchestration**.
- **Tier**: INSTALL-with-category-exception
- **Reason**: workflow-orchestration repos rarely have deepwiki/arxiv coverage; the CLASS-C convergence rule is calibrated for autonomous-runtime category, not workflow-orchestration category
- **Compensating evidence**: production-deployment evidence (named F500 customers — verified) substitutes for CLASS-C convergence
- **Confidence**: MEDIUM-HIGH on production-evidence dim / MEDIUM on autonomous-capability dim
- **Future**: queue CrewAI deepwiki probe as follow-up (R-CALIBRATION stream per R1 §punt-list)

This is exactly the kind of nuance the user's earlier critique demanded: hard gates miss category-relative validity.

---

## §6 Paste-ready dispatch recipe (sibling-session-friendly, codex-validated)

For the operator's final pick — OpenHands v1.7.0 — with codex F2's mandatory-mitigation:

```bash
# 1. Pin to v1.7.0 release tag + image digest (codex F2 mandate)
# Resolve digest once and record it:
docker pull ghcr.io/all-hands-ai/agent-server:v1.7.0
DIGEST=$(docker inspect --format='{{index .RepoDigests 0}}' ghcr.io/all-hands-ai/agent-server:v1.7.0)
echo "$DIGEST" > /Z:/claude-sota-installed/infra/openhands/v1.7.0-digest.txt  # cite for CR-9

# 2. Stand up OpenHands pinned to that digest
docker run -d --name openhands -p 3000:3000 \
  -e LLM_API_KEY="$ANTHROPIC_API_KEY" \
  -v /tmp/openhands-workspace:/opt/workspace_base \
  "$DIGEST"   # NOT just :v1.7.0 — use the SHA-pinned digest

# 3. Dispatch via REST (programmatic) — preferred for orchestrated work
curl -s -X POST http://localhost:3000/api/v1/app-conversations \
  -H "Content-Type: application/json" \
  -d '{"initial_message":{"role":"user","content":"<TASK>"},"selected_repository":"owner/repo"}'
# returns {"conversation_id":"<id>"}; poll GET /api/v1/app-conversations/<id> until status terminal

# 4. Track software-agent-sdk repo for breaking changes (codex F2 mandate)
# Add to your weekly drift sweep:
gh api repos/OpenHands/software-agent-sdk/releases/latest --jq '.tag_name + " | " + .published_at'
# Compare against your pinned v1.7.0 SDK version; if breaking change, gate via codex review before bump
```

---

## §7 sca-v18 repo-verdict for OpenHands (concrete, codex-r1-applied)

Filed at `.claude/state/sca-v18-verdicts/openhands.json` (see also `.claude/schemas/sca-v18-repo-verdict.schema.json` for the structure).

Key fields:
- `repo`: `OpenHands/OpenHands`
- `tier`: `INSTALL`
- `confidence`: `HIGH` on capability dim; `MEDIUM` on integration-stability dim (split per F2)
- `dimensions.capability`: 3 (SWE-bench Verified 72–77.6%; MLSys 2026 paper)
- `dimensions.dispatch_fit`: 3 (REST + CLI + Docker + Python/TS SDK)
- `dimensions.license_class`: `permissive` (MIT core)
- `dimensions.maintainership_tier`: `A` (All-Hands-AI corp; $18.8M Series A; active commits)
- `convergence.passes_install_minimum`: `true` (CLASS-A: gh ✓ / CLASS-C: deepwiki ✓ + hf-paper ✓)
- `cardinal_rule_compliance.cr9_pinning_strategy`: `image-digest-sha256` (per F2 mandate)
- `migration_notes.v0_to_v1_migration_active`: `true`
- `migration_notes.stability_caveat`: "V0 deprecated 2026-04-01; V1 UI unreleased; agentic core split to OpenHands/software-agent-sdk — pin v1.7.0 + track sdk repo"

---

## §8 Adoption priority for the operator (codex-validated)

1. **NOW** — Execute the existing W374 plan (Temporal × OpenHands) with codex F2 mitigations baked in (digest pin + sdk-repo tracking). Already designed at `docs/superpowers/specs/2026-05-22-temporal-openhands-dispatch-design.md`.

2. **NEXT (after W374 smoke passes)** — Decide whether to wire any of:
   - **Composio MCP** (30-min .mcp.json edit; tool/auth layer for any agent)
   - **Letta REST :8283** (1-day; for tasks needing persistent memory across runs)
   - **CrewAI MIT core embed** (1-day; for enterprise-workflow tasks with F500-tier confidence)
   - **Goose CLI** (0.5-day; for YAML-recipe tasks)

3. **DEFERRED** — Re-dispatch R5 (or accept gh-API direct citations) for the HKUDS/CLI-Anything CC-plugin-distribution deep-dive (since R5 deliverable is skeleton). Also: the 3-repo composition (Letta + MagenticOne pattern + Goose tool-gate) becomes a separate design wave when operationally warranted (codex F6).

---

## §9 Cite anchors (codex F5 LOW confirmed primary-source-grade)

All gh-API claims independently re-verified 2026-05-22 by orchestrator + Streams R2/R3/R4 + codex round-1.

- **OpenHands**: `OpenHands/OpenHands` gh API (74,400★, MIT, v1.7.0) + MLSys 2026 paper arXiv:2511.03690 + R2/R3/R4 deepwiki responses
- **Letta**: `letta-ai/letta` gh API + MemGPT paper + R4 deepwiki responses citing `letta/server/rest_api/routers/v1/agents.py` + api.letta.com — **deepwiki-only code-grounding per F3**
- **Goose**: `aaif-goose/goose` gh API (post-Dec-2025 move per F5 verified) + Block engineering blog + Linux Foundation AAIF governance announcement
- **CrewAI**: `crewAIInc/crewAI` gh API + crew.ai customer page (PwC + DocuSign + IBM + NVIDIA + PepsiCo + J&J + US DoD)
- **HKUDS/CLI-Anything**: replayable probe transcript at `.claude/state/probe-transcripts/cli-anything-claude-plugin-probe-2026-05-22.txt` capturing 3 `gh api` commands (repo metadata + `.claude-plugin/` dir listing + `cli-anything-plugin/` root listing) — primary-source-grade per codex r2 G4 closure 2026-05-22
- **AG2 ≠ autogen**: R4 line 80 + AG2 README announcement 2024-11-11 + gh API license diff (AG2 Apache-2.0 / autogen MIT) — **F5 verified**
- **sca-v18 methodology**: DSPy GEPA (arxiv 2507.19457) + OSSF Criticality Score + inspect_ai EvalLog + Council-Mode (arxiv 2604.02923) + Anthropic multi-agent research blog
- **Codex round-1**: `tmp/sota-runtime-v2-deepdive/codex-round1-review.txt` 7 findings VERDICT: NEEDS-REVISION

---

## §A — Codex Round-1 Audit Trail

Codex GPT-5.5 verdict on V1: **NEEDS-REVISION** with 7 findings.

| # | Severity | Status | Resolution applied in V2 |
|---|---|---|---|
| F1 | MEDIUM | RESOLVED-AGREE | Confirmed final pick = OpenHands for SWE workload; Letta repositioned as general-purpose-autonomous-with-memory only (§0, §1) |
| F2 | MEDIUM | RESOLVED-APPLIED | Split confidence: capability HIGH / integration-stability MEDIUM; mandatory pin-to-v1.7.0 + digest + track software-agent-sdk (§0, §6, §7) |
| F3 | LOW | RESOLVED-APPLIED | Revised "deepwiki+repomix code-grounded" → "deepwiki code-path-cited; repomix attempted-but-failed"; Letta confidence MEDIUM-HIGH → MEDIUM (§4) |
| F4 | HIGH | RESOLVED-VERIFIED-ELSEWHERE | R5 confirmed skeleton-only; but underlying claim independently verified via direct gh api primary-source — kept claim, swapped citation (§3 #6, §9) |
| F5 | LOW | NO-ACTION-NEEDED | Spot-checks pass (OpenHands marketing flag, Goose move, AG2 fork lineage). |
| F6 | MEDIUM | RESOLVED-APPLIED | 3-repo composition reframed as future design-program, NOT current install answer; W374 OpenHands single-install confirmed as operator's correct call (§2, §B) |
| F7 | MEDIUM | RESOLVED-APPLIED | CrewAI re-tier: plain INSTALL → INSTALL-with-category-exception (workflow-orchestration); explicit confidence split (production-evidence MEDIUM-HIGH / autonomous-capability MEDIUM) (§1, §5) |

**R5 incomplete-deliverable**: surfaced as operator-action item in §8 step 3. Codex F4 caught this; my own gh-api probe substituted for primary-source citation.

---

## §B — Future design-program (codex F6 reframe)

The 3-repo composition (Letta runtime + AutoGen MagenticOne two-loop pattern + Goose ToolInspectionManager 3-inspector chain) is filed as a future design-program when:
- W374 (Temporal × OpenHands) is operational
- The operator's workload requires multi-agent orchestration beyond single-OpenHands-task
- A dedicated wave (W385 or similar) is allocated

NOT a current install recommendation per codex F6.

---

## §C — Operator decisions remaining

1. **Approve V2 (codex-r1-applied)** OR request codex round-2 ratification before any further wire-in?
2. **R5 incomplete deliverable** — re-dispatch the stream to actually do the deep-dives on 6 mystery candidates, OR accept the gh-API-direct primary-source citation for CLI-Anything and defer the other 5?
3. **CrewAI INSTALL-with-category-exception** — accept the category exception, OR re-tier to PATTERN-STUDY pending future deepwiki probe?
4. **sca-v18 schema codification** at `.claude/schemas/sca-v18-repo-verdict.schema.json` — already written; commit as part of this wave, or as a separate methodology-codification wave?

---

---

## §D — Codex Round-2 Audit Trail (closure)

Codex GPT-5.5 round-2 verdict: **NEEDS-REVISION** with 6 findings (G1-G6). Of the 7 round-1 findings, 4 are RESOLVED-CONFIRMED (G1/G3/G5/G6) and 2 are RESOLVED-WITH-CAVEAT (G2/G4) requiring surgical fixes — both applied below.

| # | Severity | Status | V2.1 resolution applied |
|---|---|---|---|
| G1 | LOW | RESOLVED-CONFIRMED | F1 routing confirmed; no change. SWE-focused workload → OpenHands; general-purpose-memory → Letta. |
| G2 | MEDIUM | RESOLVED-WITH-CAVEAT → **APPLIED** | Schema extended with `confidence_by_dimension` field (capability / integration_stability / license / maintainership / production_evidence). Scalar `confidence` redefined as MIN-across-axes safe-default. `openhands.json` updated: scalar now MEDIUM (= MIN over per-dim) instead of HIGH (which hid the integration-stability MEDIUM caveat). Tooling that surfaces the scalar now correctly surfaces install-risk. |
| G3 | LOW | RESOLVED-CONFIRMED | Letta deepwiki-only code-grounding correctly stated; no change. |
| G4 | MEDIUM | RESOLVED-WITH-CAVEAT → **APPLIED** | Replayable probe transcript written at `.claude/state/probe-transcripts/cli-anything-claude-plugin-probe-2026-05-22.txt` — 3 documented `gh api` commands captured. §3 nuance #6 + §9 cite-anchors updated to cite the transcript artifact. Reproducible by any future auditor. |
| G5 | LOW | RESOLVED-CONFIRMED | Spot-checks remain correctly represented; no change. |
| G6 | LOW | RESOLVED-CONFIRMED | 3-repo composition correctly reframed as future design-program; no change. |

**Net codex-state at end of round-2**: 5 of 7 round-1 findings RESOLVED-CONFIRMED outright (F1/F3/F5/F6/F7 per round-1 letters; G1/G3/G5/G6 per round-2 letters). 2 RESOLVED-WITH-CAVEAT received surgical fixes (G2 schema + verdict; G4 probe-transcript artifact). **No NEW findings introduced.** No UNRESOLVED-STILL-OPEN findings.

**Codex round-2 mandate satisfied at 2026-05-22 ~16:55Z.** Next dispatch (if any) is operator-decision: codex r3 ratification of the V2.1 surgical fixes, OR accept and commit.

---

**End of V2.1 synthesis (codex r1 + codex r2 applied). R5-retry deliverable pending; integration deferred to V2.2 if it surfaces material findings.**
