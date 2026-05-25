# W300 Stream D — Ledger backfill 7 unledgered verdicts (sca-v5 LIVE 3-target contract)

> **Wave**: W300 | **Branch**: `sota-converge-w295` | **Decided at**: 2026-05-18 | **Stream**: D
>
> **Mandate**: Per W299-Stream-D §6.5 + W300-PLAN.md §1 row D, backfill the 7 W296/W295 verdicts that were emitted but never propagated to the sca-v5 3-target ledger contract (T6 basic-memory HARD-REQUIRED + VERDICT-LEDGER.md row HARD-REQUIRED + hindsight T1 BEST-EFFORT). Pre-W300 ledger compliance was 8% (1/12 rows had T6 basic-memory file).

## §0 — TL;DR

- **7 verdicts ledgered** under sca-v5 3-target contract: 5 W296 T1 INSTALL + 2 W295 T3 PATTERN-STUDY.
- **T6 basic-memory writes**: 7/7 PASS (all at `Z:/claude-sota-installed-state/basic-memory/verdicts/W*-*.md` matching aging-scan glob).
- **VERDICT-LEDGER.md rows**: 7/7 appended under new "W296/W295 backfill verdicts (added W300 Stream D — 2026-05-18)" section; 11/11 pre-existing rows preserved.
- **Hindsight T1**: 1 async POST containing all 7 items returned `{"success":true,"items_count":7,"operation_id":"06f8b971-f80a-49a8-86b4-191c1ded03ee"}` against bank `claude-code` at `/v1/default/banks/claude-code/memories`.
- **Compliance metric**: **8% (1/12) → 44.4% (8/18)** for T6 basic-memory write coverage of git-tracked ledger rows.
- **sca-v5 re-validation**: all 7 verdicts **tier-stable** under sca-v5 (sca-v3.1 verdicts auto-downweight 0.85× but tier-bands unchanged; no D16<2 / D17<2 / D18<2 / Universal-REJECT triggers fire).

## §1 — Per-verdict backfill log

| # | Wave | Candidate | Tier | install_score | pattern_score | Hard caps | T6 file | Ledger row | Hindsight T1 |
|---|------|-----------|------|---------------|---------------|-----------|---------|------------|--------------|
| 12 | W296 | `anthropics/claude-agent-sdk-python` | T1 INSTALL | 4.48 | 4.30 | none | `W296-anthropics-claude-agent-sdk-python.md` ✓ | #12 ✓ | item ✓ |
| 13 | W296 | `github/spec-kit` | T1 CO-INSTALL | 4.62 | 4.63 | none | `W296-github-spec-kit.md` ✓ | #13 ✓ | item ✓ |
| 14 | W296 | `astral-sh/uv` | T1 INSTALL | 4.75 | 4.55 | none | `W296-astral-sh-uv.md` ✓ | #14 ✓ | item ✓ |
| 15 | W296 | `oraios/serena` | T1 ELEVATE | 4.20 | 3.97 | none | `W296-oraios-serena.md` ✓ | #15 ✓ | item ✓ |
| 16 | W296 | `mem0ai/mem0` | T1 INSTALL (borderline) | 4.04 | 4.65 | D10=3 borderline | `W296-mem0ai-mem0.md` ✓ | #16 ✓ | item ✓ |
| 17 | W295 | `daytonaio/daytona` | T3 PATTERN-STUDY | 2.945 | 3.887 | D1<3, D3<2, D14<3, D15=2, D17=2 | `W295-daytonaio-daytona.md` ✓ | #17 ✓ | item ✓ |
| 18 | W295 | `All-Hands-AI/OpenHands` | T3 PATTERN-STUDY | 3.70 | 4.32 | D3=2 architect-borderline | `W295-all-hands-ai-openhands.md` ✓ | #18 ✓ | item ✓ |

**Notes**:
- All `file_slug` values per sca-v5 SKILL.md L409-416 derivation (`lower()` + `/`→`-` + `re.sub('[^a-z0-9-]+', '-')` + collapse `-+`). Examples: `anthropics/claude-agent-sdk-python` → `anthropics-claude-agent-sdk-python`; `All-Hands-AI/OpenHands` → `all-hands-ai-openhands`. Each file passes the aging-scan glob `verdicts/W*-*.md`.
- W296 scores transcribed from `W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md` §§3.B.2 (claude-agent-sdk-python L270-306), 3.C.1 (spec-kit L350-388), 3.I.1 (uv L767-773), 3.G.1 (serena L625-663), 3.D.1 (mem0 L426-462).
- W295 scores transcribed from `W295-CANDIDATE-AUDITS/daytonaio-daytona.md` §§3-4 (L53-160) + `W295-CANDIDATE-AUDITS/All-Hands-AI-OpenHands.md` §§3-4 (L96-160, L377-381).

## §2 — sca-v5 re-validation per-candidate

Each verdict was originally decided under sca-v3.1. Under sca-v5 LIVE rubric (W297 ship-decision-B), sca-v3.1 verdicts auto-downweight 0.85× per the multi-version downweighting rule (SKILL.md L566-572). sca-v5 introduces 3 NEW dims (D19 code_review_rigor, D20 doc_transparency, D21 org_diversity) NOT retroactively scored per the per-dim version-bump pattern (SKILL.md L573-574). sca-v5 hard-cap additions: D16<2 T1+T2 cap, D17<2 INSTALL-only cap, D18<2 Universal REJECT.

| # | Candidate | sca-v5 tier check | Verdict |
|---|-----------|-------------------|---------|
| 12 | `anthropics/claude-agent-sdk-python` | D16=4 ✓ D17=5 ✓ D18=5 ✓; install_score 4.48 ≥ 4.0 floor | **tier-stable** T1 INSTALL |
| 13 | `github/spec-kit` | D16=4 ✓ D17=5 ✓ D18=5 ✓; install_score 4.62 ≥ 4.0 floor | **tier-stable** T1 CO-INSTALL |
| 14 | `astral-sh/uv` | D16=5 ✓ D17=5 ✓ D18=5 ✓; install_score 4.75 ≥ 4.0 floor | **tier-stable** T1 INSTALL |
| 15 | `oraios/serena` | D16=3 ✓ (clears D16<2 cap with margin) D17=4 ✓ D18=5 ✓; install_score 4.20 ≥ 4.0 floor | **tier-stable** T1 ELEVATE (conditional on SHA-pin retention for W286 P0C) |
| 16 | `mem0ai/mem0` | D16=4 ✓ D17=4 ✓ D18=4 ✓; install_score 4.04 just above floor 4.0; D10=3 escapes Universal REJECT via pattern-improvement carve-out (pattern_score 4.65 demonstrates improvement) | **tier-stable-with-caveat** T1 INSTALL (borderline) — requires W295 basic-memory re-litigation before exec (W300 Stream A scope) |
| 17 | `daytonaio/daytona` | D17=2 is at-the-floor (sca-v5 D17<2 INSTALL-only cap = strict-less-than, so D17=2 escapes by 1); D18=3 clears Universal REJECT; T1 already blocked by 4 OTHER caps (D1<3, D3<2, D14<3, D15=2); D16=4 ✓ | **tier-stable** T3 PATTERN-STUDY |
| 18 | `All-Hands-AI/OpenHands` | D16=4 ✓ D17=4 ✓ D18=4 ✓; D3=2 is at-the-floor (sca-v5 D3<2 INSTALL-only cap = strict-less-than, so D3=2 escapes by 1; architect-persona BLOCK is the structural routing decision per audit body L138 + L145-149); pattern_score 4.32 ≥ 3.5 + D2=4 + D13=5 → T3 OPEN | **tier-stable** T3 PATTERN-STUDY |

**Tier-change count**: 0/7. No backfilled verdict changes tier under sca-v5 vs sca-v3.1 original decision. This is the expected outcome per W293-SCA-V3.1-VALIDATION-PILOT.md "5-of-5 historical candidates tier-stable" + the v5 per-dim version-bump invariant (D1-D18 unchanged from v3.1; only D19/D20/D21 added).

**Honest source-disagreement** (per sca-v5 R6 absorbed):
- **mem0 D10=3** (partial overlap with T6 basic-memory + T3 cognee): W296 audit recorded github family stating "differentiable on persistence layer" vs deepwiki stating "operator may prefer T2 VENDOR-FORK to preserve 6-tier integrity". Disagreement noted in T6 file frontmatter `sources_typed.disagreement[]`. Resolution: verdict held at T1 with explicit caveat — W295 basic-memory re-litigation (W300 Stream A scope) blocks any execute-install action. confidence_factor D10 = 0.7 (per W296 F4 G1: 1.0 default, 0.7 when disagreement≥2 sources for that dim).

## §3 — Target-1 basic-memory writes (paths verified)

All 7 written via `mcp__basic-memory__write_note(directory="verdicts", note_type="verdict")` per SKILL.md L420-427 contract; project=`main`; tags `["adoption-decision", "W<wave>", "<tier>", "sca-v5"]`.

Filesystem-verified at `Z:/claude-sota-installed-state/basic-memory/verdicts/`:

```
W295-all-hands-ai-openhands.md
W295-daytonaio-daytona.md
W296-anthropics-claude-agent-sdk-python.md
W296-astral-sh-uv.md
W296-github-spec-kit.md
W296-mem0ai-mem0.md
W296-oraios-serena.md
```

All 7 filenames match the aging-scan glob pattern `W*-*.md` (regex `^W\d+-.+\.md$`). Each frontmatter carries the full sca-v5 verdict schema (`candidate`, `verdict`, `tier`, `wave`, `decided_at`, `backfilled_at`, `backfilled_in: W300-Stream-D`, `rule_version: sca-v3.1`, `v5_revalidation`, `v5_downweight_factor: 0.85`, `sources_typed.{benchmark,code_reading,practitioner_report,disagreement?}`, `rubric_scores.D1..D18 + install_score + pattern_score + hard_cap_breaches`, `confidence_factor`, `adversarial_review`, `rollback_plan`, `divergence_files`, `pattern_doc_path`, `eval_log_path`, `per_dim_versions`, `cascade.{cost_actual_spent,tier_routing_decision,cost_cap_for_tier,cascade_degraded,mcp_family_attribution}`, `reverification_due`, `status`, `supersedes`, `backfill_provenance`).

**One transient error caught + recovered**: W295-daytonaio-daytona initial write failed YAML validation due to a `§` character + unmatched quotes in a nested `pattern_doc_path` value. Fixed by replacing the inline-`§"..."` with prose form. Retry succeeded.

## §4 — Target-2 VERDICT-LEDGER.md rows (lines edited)

Edited via single `Edit` tool call against `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`. The append inserted:
- 1 new H2 section: `## W296/W295 backfill verdicts (added W300 Stream D — 2026-05-18)`
- 1 explanatory blockquote citing W299-D §6.5 + W300 plan §1 row D + 8% → 44.4% compliance bump
- 1 table header row (9 columns: # / Wave / Decided / Candidate / Verdict / install_score / pattern_score / Hard caps / Status / Reverify-due / Notes)
- 7 verdict rows (#12 through #18) with full schema population
- 1 summary line (compliance metric + remaining 11 historical rows still need T6 writes — outside W300-D scope per operator-AI-3)

Pre-existing rows #1-#11 ("W288 Verdicts" + "W293+W291.Stage2 NEW verdicts (2026-05-18)" + "Stream B top-10 — v3 pipeline verdicts") + the Operational note section + all distribution/mandate-validation tables preserved unchanged (smoke test §6 confirms 11/11).

## §5 — Target-3 hindsight T1 (best-effort)

**Daemon state**: hindsight-embed listening at `127.0.0.1:9077`; `/health` returns 200 + `/openapi.json` returned OpenAPI 3.1.0 spec.

**Initial endpoint discovery**: my first POST attempts targeted `/episodes`, `/api/episodes`, `/v1/episodes`, `/memory`, `/memories`, `/api/memory` — all returned 404. OpenAPI spec inspection revealed the actual endpoint contract: `POST /v1/default/banks/{bank_id}/memories` accepting `RetainRequest` schema (`items[]` with `content`, `context`, `document_id`; optional `async: bool`). Bank `claude-code` exists (`fact_count: 5616`, `last_document_at: 2026-05-18T17:54:35Z`).

**First retain attempt** (sync, `async=false`): timed out at 45s — likely heavy synchronous fact-extraction + entity-recognition pipeline per OpenAPI description "Extracts semantic facts ... Generates embeddings ... Deduplicates similar facts ... Creates temporal, semantic, and entity links".

**Second retain attempt** (async, `async=true`): returned 200 with `{"success":true,"bank_id":"claude-code","items_count":7,"async":true,"operation_id":"06f8b971-f80a-49a8-86b4-191c1ded03ee"}`. All 7 verdict episodes queued for background processing. Per sca-v5 SKILL.md L513, hindsight T1 is BEST-EFFORT — pipeline does NOT block on either daemon-down or async-incomplete; operator can later inspect `GET /v1/default/banks/claude-code/operations/{operation_id}` to verify completion.

**Honest finding**: the W295-codex-r28+r33 historical-graphiti-disabled clause + W295-codex-r12 finalization in SKILL.md L513 specify the hindsight T1 contract as `POST :9077/episodes`. The actual hindsight server I encountered exposes `POST :9077/v1/default/banks/{bank_id}/memories`. This is **routing-spec drift** (the doc cites a generic endpoint that does not exist in the current hindsight-embed `1.0.x` build at this runtime). Per cardinal-rule R5 + W286 P0C scope, this is documentation drift not security drift; SKILL.md update is operator-routed (not in W300-D scope). For W300-D backfill purposes the bank-scoped endpoint with `async=true` is the correct path; recommend operator update SKILL.md L513 + `STREAM-D-INGEST-PIPELINE.md §6` to reference the canonical endpoint format.

## §6 — Smoke test results

Programmatic smoke test (Node.js fs + regex) ran post-write. Output captured in W300 Stream D session:

```
=== Smoke test 1: T6 basic-memory files exist ===
  PASS: W296-anthropics-claude-agent-sdk-python.md (exists=true, glob=true)
  PASS: W296-github-spec-kit.md (exists=true, glob=true)
  PASS: W296-astral-sh-uv.md (exists=true, glob=true)
  PASS: W296-oraios-serena.md (exists=true, glob=true)
  PASS: W296-mem0ai-mem0.md (exists=true, glob=true)
  PASS: W295-daytonaio-daytona.md (exists=true, glob=true)
  PASS: W295-all-hands-ai-openhands.md (exists=true, glob=true)
T6 result: 7/7

=== Smoke test 2: VERDICT-LEDGER.md rows present ===
  PASS: anthropics/claude-agent-sdk-python
  PASS: github/spec-kit
  PASS: astral-sh/uv
  PASS: oraios/serena
  PASS: mem0ai/mem0
  PASS: daytonaio/daytona
  PASS: All-Hands-AI/OpenHands
  PASS: backfill section header present
Ledger result: 7/7 rows + section-header=true

=== Smoke test 3: no pre-existing rows overwritten ===
Existing-row preservation: 11/11

=== Compliance metric ===
Total ledger rows post-W300: 18
T6 basic-memory write coverage: 8 of 18 = 44.4%
(Pre-W300: 1/12 = 8% per W299-D §A.9)
(Post-W300: 8/18 = 44.4%)
```

**All 3 smoke tests PASS.**

**Compliance delta**: 8% (1/12) → **44.4% (8/18)**. The remaining 10 historical rows that still lack T6 basic-memory writes are pre-W295 (require operator-AI-5-finish historical-graphiti→basic-memory migration tool per SKILL.md L519) + outside W300-D scope per operator-AI-3 in W299-D §6 (a separate backfill of the 11 historical rows is the operator's own next-action). W300-D's mandate was explicitly the 7 W296/W295 verdicts.

## §7 — Cardinal-rule self-check

Per CLAUDE.md cardinal rules + W286 P0C MCP-pinning ratification + W295-codex-r12 finalization:

| Rule | Compliance | Evidence |
|------|------------|----------|
| **R1 — Trusted-source primitives only** | ✓ | All 7 verdicts transcribe W296/W295 audit data (already-trusted runtime artifacts). No new repos installed by W300-D; backfill is ledger-only writes. |
| **R2 — Hooks discipline (no `.claude/hooks/scripts/*`)** | ✓ | No hooks created. All writes via Edit tool (VERDICT-LEDGER.md) + `mcp__basic-memory__write_note` MCP (T6) + node http POST (T1 hindsight, best-effort). |
| **R3 — Subagents from upstream agents OR documented subagent system** | ✓ | No subagents spawned by W300-D. Sequential per-tool execution per `https://docs.anthropic.com/en/docs/claude-code/sub-agents`. |
| **R4 — Project behavior in CLAUDE.md + settings.json only (no `.claude/rules/`)** | ✓ | No `.claude/rules/*.md` created. The VERDICT-LEDGER.md edit is data ledger, not behavior rules. T6 basic-memory writes are runtime state at `state-outside-repo`, not behavior rules. |
| **R5 — Safety via CC permissions + sandboxing (no custom guard scripts)** | ✓ | No guard scripts. All writes via approved tool surface (Edit + mcp__basic-memory + node http to localhost:9077 which is the operator-bootstrapped hindsight daemon per W280b). |
| **W286 P0C — MCP server `command/args` pinning** | ✓ | basic-memory MCP `command/args` in `.mcp.json` unchanged by W300-D. No new MCP server added. |

**State-outside-repo discipline (per W295 AI-3 + W295-codex-r12)**: T6 basic-memory writes land at `Z:/claude-sota-installed-state/basic-memory/verdicts/` — the operator-curated runtime-state path (gitignored, outside the worktree). Consistent with the W295 AI-3 closure pattern + the sca-v5 SKILL.md L431-434 post-write assertion path. Git-tracked record lives ONLY in `VERDICT-LEDGER.md`.

**Source-attribution invariance**: all 7 verdicts transcribe pre-existing audit data (W296-STREAM-C + W295-CANDIDATE-AUDITS) without re-rating any dimension. Tier-stability under sca-v5 was verified via D16/D17/D18 + D10 hard-cap re-check only, not by re-scoring D1-D9. This honors the operator's anti-pattern guard ("just transcribe W296/W295 verdicts; flag tier-changes for operator review" — task §"Backfill methodology"). No tier-changes occurred.

## §8 — Open questions routed to W300-AUDIT synthesis

1. **Hindsight endpoint spec drift** (LOW): SKILL.md L513 + `STREAM-D-INGEST-PIPELINE.md §6` cite `POST :9077/episodes` as the hindsight T1 target. The actual hindsight-embed daemon at this runtime exposes `POST :9077/v1/default/banks/{bank_id}/memories` with `RetainRequest` schema. W300 coordinator may queue a SKILL.md correction for sca-v5.1 / sca-v6 (not blocking; hindsight is best-effort per the same SKILL section). Suggested update: replace `POST :9077/episodes` with `POST :9077/v1/default/banks/claude-code/memories` + reference `RetainRequest{items: [{content, context, document_id}], async: true}` schema.

2. **Operator-AI-3 11-row historical backfill** (separately scoped): the remaining 10 historical rows (#1, #2 architecture-itself + #3-#11) still lack T6 basic-memory writes. Per W299-D §6 operator-AI-3, this is a separate operator-routed task. W300-D's 7-row scope did not include them. If operator wants compliance to reach 100% before next AGING re-litigation cycle (W302), schedule AI-3 as a wave-N (e.g. W301 or W302) follow-up. Pre-W295 historical writes require the AI-5-finish historical-graphiti→basic-memory migration tool per SKILL.md L519 (also operator-routed).

3. **mem0 D10=3 caveat → W300 Stream A re-litigation** (sca-v5 cascade): per the W296 audit body L462 "Re-litigation of W295 basic-memory verdict required" + W300 plan §1 Stream A scope ("apply 18-dim rubric to basic-memory using LIVE evidence; compare new install_score vs W295 baseline 4.16"), the mem0 T1 INSTALL with caveat depends on Stream A's resolution. W300-D's backfill ledgered the W296 verdict as transcribed (with the caveat explicit in `sub_verdict` + `adversarial_review.architect: CAUTION-APPROVE`); the execute-install action remains blocked pending Stream A's basic-memory re-audit outcome. Routing this dependency to W300-AUDIT synthesis.

4. **OpenHands divergence-files** (T3 → partial T2 pathway): the W295 audit identified 3 narrow vendor-fork targets (`openhands.sdk.plugin` skill-loader pattern + file-based-agent format + ACPAgent JSON-RPC subprocess pattern). The W300-D ledger row notes these in `divergence_files`. If operator wants any of the 3 lifted into the runtime, that's a follow-up W300+ vendor-fork action. Routing to W300-AUDIT synthesis.

5. **sca-v5 D19/D20/D21 retroactive scoring** (not done): W300-D did NOT retroactively score the W296/W295 verdicts against the 3 new sca-v5 dims (D19 code_review_rigor, D20 doc_transparency, D21 org_diversity). This is per the per-dim version-bump rule (SKILL.md L573-574) — D19/D20/D21 scores would only need to exist for verdicts decided AT sca-v5 (W299+). Older verdicts inherit their `per_dim_versions` markers `v3.1` for D1-D18 and `null/n/a` for D19-D21. If operator wants a full sca-v5 re-audit, that's a different scope from backfill (specifically a re-litigation under W300+W301 follow-up waves). Routing to W300-AUDIT synthesis.

---

## §A — Cite-anchors

1. `docs/architecture/W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-PLAN.md` — W300 plan §1 Stream D scope (file ownership: `W300-STREAM-D-LEDGER-BACKFILL.md` + edits to `VERDICT-LEDGER.md` + writes to `basic-memory/verdicts/`)
2. `.claude/skills/sota-convergence-audit/SKILL.md` L380-538 — sca-v5 ledger-write contract (3-target hard/best-effort + per-dim version-bump + multi-version downweighting)
3. `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — target append-list (post-W300 has 18 rows; new section "W296/W295 backfill verdicts (added W300 Stream D — 2026-05-18)")
4. `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md` L17-21 (TL;DR T1 set) + L270-306 (claude-agent-sdk-python) + L350-388 (spec-kit) + L767-773 (uv) + L625-663 (serena) + L426-462 + L521-530 (mem0)
5. `docs/architecture/W295-CANDIDATE-AUDITS/daytonaio-daytona.md` L17,35,53-160 (full audit + 5 hard-cap analysis + inverse test)
6. `docs/architecture/W295-CANDIDATE-AUDITS/All-Hands-AI-OpenHands.md` L27,53,96-160,377-381 (full audit + architect-persona D3=2 block + anti-bias validation 73.9k★→T3)
7. `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-D-DECISION-QUALITY-FEEDBACK.md` L325-355 (operator-AI-4 + §6.5 backfill scaffold scaffold)
8. `Z:/claude-sota-installed-state/basic-memory/verdicts/` filesystem listing post-W300 — 8 files (1 historical `W288-research-arch-v2-itself — adoption verdict.md` + 7 W300-D backfills); 8/18 compliance = 44.4% (up from 1/12 = 8%)
9. Hindsight daemon `/openapi.json` retrieved 2026-05-18; bank-scoped retain endpoint `POST /v1/default/banks/claude-code/memories` with `RetainRequest` schema; async retain operation_id `06f8b971-f80a-49a8-86b4-191c1ded03ee` accepted with `items_count: 7`
10. `Z:/claude-sota-installed/CLAUDE.md` — cardinal-rules R1-R5 + W286 P0C
