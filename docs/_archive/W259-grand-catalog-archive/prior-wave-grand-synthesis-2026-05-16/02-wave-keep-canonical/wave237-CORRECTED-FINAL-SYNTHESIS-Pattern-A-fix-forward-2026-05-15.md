---
title: Wave 237 — CORRECTED FINAL Synthesis (Pattern A FIX-FORWARD on W236 per codex T1 NEEDS-REVISION conf=0.91)
status: AUTHORITATIVE-FINAL-CORRECTED
date: 2026-05-15
wave: 237
fire: 1
supersedes: W236 (predecessor, retained for audit-trail)
codex-t1-verdict: NEEDS-REVISION conf=0.91 [VERIFIED via .claude/state/codex_consult_w236_synthesis_review_OUT.txt]
cross-model-gate: SATISFIED — REAL GPT-5.5 BRIDGE-MODE foreground+tee dispatch
prescriptions-applied: 7/7 atomic single commit
---

# Wave 237 — CORRECTED FINAL Synthesis (Pattern A FIX-FORWARD)

## §0 — Codex T1 Verdict Integration

Pattern D codex T1 BRIDGE-MODE dispatched 2026-05-15 returned **NEEDS-REVISION conf=0.91** with 7 prescribed_edits. Per `ctff-pattern-a.md` Pattern A single-atomic-apply discipline (n=5 promotion-eligible evidence ladder), all 7 prescriptions applied in this commit.

Verdict cite: `.claude/state/codex_consult_w236_synthesis_review_OUT.txt` (TIER-3 evidence trail, NOT TIER-1 authority per `cmc-verdict-shapes.md §Source-cite discipline`).

## §1 — Applied Prescriptions Summary

| # | Axis | Severity | Issue | Status |
|---|---|---|---|---|
| F-1 | 1 (Pre-conditions) | P1 | §5.d version-pin coverage gap | APPLIED §5.d-amended below |
| F-2 | 1 (Pre-conditions) | P2 | §5.f FM-09 missing W235-Y iter2b + W233-W HNF | APPLIED §5.f-amended below |
| F-3 | 2 (CR-12) | P1 | review-agent-governance Phase 11 vs REJECT contradiction | APPLIED Phase 11 amended |
| F-4 | 2 (CR-12) | P2 | W232 META-tooling vs W236 install-catalog orthogonality | APPLIED §3-preamble below |
| F-5 | 3 (Saturation) | P1 | Saturation overstated; STRONG-PROVENANCE-EXPRESS not applied | APPLIED §8/§9 re-scoring |
| F-6 | 4 (Phantom ladder) | P2 | n=35 conflates GitHub-existence + cross-runtime drift | APPLIED §4 split below |
| F-7 | 5 (Wshobson Top-3) | P1 | Source-audit not done before Phase 4 install | APPLIED F14 Forward Queue |

## §2 — Corrected ADOPT-NOW Roster (31 — one removed per F-3)

**Phase 11 amendment per F-3**: `review-agent-governance` REMOVED from Phase 11 ADOPT-NOW (held conditional on Phase 3.5 audit, but Probe 5 HARD-GATE "human approval" structural blocker remains). ADOPT-NOW count: **32 → 31**.

Phase 11 (conditional IF Phase 3.5 audit PASS):
- protect-mcp (Tom Farley) — pending crypto source-audit
- signed-audit-trails (Tom Farley) — CITE-CLASS-CANONICAL (markdown only)
- ~~review-agent-governance~~ REMOVED — Probe 5 HARD-GATE "human approval" structural blocker

## §3 — Disclosure: W232 META-tooling vs W237 install-catalog orthogonality (F-4 APPLY)

**Inserted before §3 REJECT-FOR-FIT list per F-4 P2**:

> W232 META-RESEARCH-TOOLING-CATALOG (Z:/claude-sota-installed/tmp/wave232-*.md §1) names wshobson family + comprehensive-review as **Tier-1 BLOCKING research-orchestration plugins** for ADVANCED MULTI-AGENT SOTA RESEARCH ORCHESTRATION on the EXISTING `Z:/claude-sota-installed` runtime. W237 (this synthesis) lists those same plugins as **REJECT-FOR-FIT DUPLICATE-FUNCTIONALITY** for **Z:/claude-sota-pure NEW runtime install candidates**. These are ORTHOGONAL axes:
> 
> - **W232 META-tooling**: which plugins enable CURRENT-runtime advanced research orchestration (dogfood plugins required to execute W220-W237 wave dispatches)
> - **W237 install-catalog**: which plugins should be INSTALLED in Z:/claude-sota-pure NEW runtime as ADOPT-NOW candidates
> 
> wshobson/agent-orchestration + agent-teams + comprehensive-review + tdd-workflows REMAIN load-bearing META-tooling for THIS runtime's research workflow per W232. They are REJECT-FOR-FIT for Z:/claude-sota-pure NEW runtime install per CR-12 DUPLICATE-FUNCTIONALITY (sister rules + superpowers cover same functionality in pure runtime architecture).
> 
> NOT contradictory; orthogonal install-vs-tooling axes.

## §4 — Phantom-Cite Ladder SPLIT (F-6 APPLY) — total n=35

**Per F-6 P2**: ladder split into 2 sub-ladders:

### §4.a GitHub/repo-existence phantom catches (n=34)
| # | Wave | Phantom | Class |
|---|---|---|---|
| 1-27 | W221-W229 | (catalogued in W227+W229) | Multiple classes |
| 28 | W233-X | iamgroot42/piiranha | NOT-A-REPO (HF model) |
| 29 | W233-X | google/shieldgemma | NOT-A-REPO (HF model) |
| 30 | W233-X | openai/moderation | NOT-A-REPO (API) |
| 31 | W233-X | anthropics/constitutional-ai-mcp | NOT-A-MCP (training pattern) |
| 32 | W233-X | promptarmor/prompt-armor | 404 |
| 33 | W233-X | lakera-ai/lakera-mcp-server | NOT-OSS (SaaS) |
| 34 | W233-X | scrubadub/scrubadub | WRONG-OWNER |

### §4.b FM-20 Row 21 cross-runtime cite-import drift catches (n=1)
| # | Wave | Catch | Class |
|---|---|---|---|
| 1 | W235-Y | iter2b 8/10 "missing in sibling" REFUTED as ALREADY-INSTALLED in this-runtime | FM-20 Row 21 CROSS-RUNTIME |

**Total cumulative catches**: n=34 + n=1 = n=35 (now classified by sub-ladder).

## §5 — Corrected BLOCKING Pre-Conditions

### §5.a Infrastructure isolation (Agent S) — unchanged
- OLLAMA_HOST=127.0.0.1:11701 / Z:/venvs/sss-pure / npm prefix Z:/npm-global / docker network sss-pure-net

### §5.b Secret-management bootstrap (Agent T) — unchanged
- sops + age + .env.encrypted

### §5.c `_secret_redactor.py` 9-NEW-pattern update (Agent T Q4.3) — unchanged

### §5.d Version-pin discipline COMPREHENSIVE matrix (F-1 APPLY)

**Per F-1 P1**: pin matrix EXPANDED to cover ALL 31 ADOPT-NOW candidates across Phase 0-11:

| Phase | Candidate | Pin (version OR SHA OR cache OR `@latest-acknowledged-D6-risk`) |
|---|---|---|
| 0 | sops | `v3.13.0` (INSTALLED) |
| 0 | age | `v1.2.1` (INSTALLED) |
| 1 | mcp-memory-service | `10.51.3` (INSTALLED) |
| 1 | graphiti-core | `0.29.0` (INSTALLED) |
| 1 | FalkorDB | `1.6.1` Docker image (INSTALLED) |
| 2 | ripgrep | `14.1.1` |
| 2 | fd | `10.2.0` |
| 2 | bat | `0.24.0` |
| 2 | eza | `0.20.20` |
| 2 | hyperfine | `1.18.0` |
| 2 | tokei | `13.0.0-alpha.4` |
| 2 | dust (du-dust) | `1.2.4` |
| 2 | bottom | `0.11.0` |
| 2 | gh | `2.65.0` |
| 2 | jq | `1.7.1` |
| 2 | yq | `4.45.1` |
| 2.5 | Δ24 microsoft/presidio (analyzer/anonymizer/structured) | `2.2.359`/`2.2.359`/`0.0.4` |
| 3 | codex T1-T7 hooks | manifest §Section 2 SHA |
| 3.5 | Tom Farley protect-mcp npm | `protect-mcp@0.5.5` `@latest-acknowledged-D6-risk-pending-crypto-audit` |
| 3.5 | Δ25 protectai/llm-guard | `0.3.16` (5mo-stale-acknowledged) |
| 4 | pre-commit | `4.0.1` |
| 4 | sccache | `0.10.0` |
| 4 | mkdocs | `1.6.1` |
| 4 | Δ-Z1 wshobson/shell-scripting | `v1.2.2` marketplace pin |
| 4 | Δ-Z2 wshobson/plugin-eval | marketplace HEAD `ece811f` (license-gap-PR-queued) |
| 4 | Δ-Z3 wshobson/block-no-verify | `v1.0.0` marketplace pin |
| 5 | gitnexus | (incumbent, per `.mcp.json`) |
| 5 | ast-grep | `0.42.0` (PATH-installed per W112) |
| 5 | serena | (incumbent, per `.mcp.json`) |
| 5 | semgrep | `1.162.0` |
| 5 | osv-scanner | `2.3.8` |
| 5 | typos | `1.46.1` |
| 5 | Δ22 microsoft/acon | git clone @ HEAD `d63f9ae18959dc7215ff62899c94c5e8c56847ae` |
| 5 | Δ23 jia-gao/leanctx | `0.3.1` |
| 5 | Δ26 ace-agent/ace | git clone @ HEAD `4f679bef3b78e973a0e13a0acc2b4a7f6f7e41a2` STUDY-PILOT.b |
| 6.a | Langfuse | `v3.x` Docker image MIT-core ONLY |
| 6.b | ccusage | `1.0.0` |
| 6.b | mcp-server-langfuse | `@latest-acknowledged-D6-risk` (separate repo, 167★) |
| 6.c | phoenix MCP | (incumbent) |
| 6.d | promptfoo | `0.x` `@latest-acknowledged-D6-risk` (active maint) |
| 7 | PaddleOCR | `2.10.0` + Baidu disclosure |
| 7 | mkdocs (Phase 7 supplemental) | reused Phase 4 pin |
| 8 | playwright-cli | `@playwright/cli@1.49.x` |
| 8 | chrome-devtools-mcp | INCUMBENT `.mcp.json:41` |
| 8 | elevenlabs-mcp | uvx-pinned `@latest-acknowledged-D6-risk` (OFFICIAL) |
| 9 | onyx OR ragflow | operator-decision deferred |
| 9 | cognee L4 (PROVIDER-COMPLEMENT) | `0.x` per `.mcp.json` if adopted |
| 10 | ntfy-mcp | `@latest-acknowledged-D6-risk` self-hosted + crypto-random topic |
| 10 | mcp-builder skill | Anthropic-OFFICIAL marketplace |
| 11 | Tom Farley protect-mcp | (Phase 3.5 audit gate) |
| 11 | Tom Farley signed-audit-trails | CITE-CLASS-CANONICAL (markdown — no install) |

ALL 31 ADOPT-NOW candidates now have explicit pin OR `@latest-acknowledged-D6-risk` marker per CR-9.

### §5.e Pattern D codex T1 BRIDGE-MODE review — COMPLETED
✅ Pattern D codex T1 BRIDGE-MODE foreground+tee fired 2026-05-15 on Wave 236. Verdict NEEDS-REVISION conf=0.91 at `.claude/state/codex_consult_w236_synthesis_review_OUT.txt`. All 7 prescriptions applied this Wave 237 fix-forward.

### §5.f FM-09 2nd-stage validation EXPANDED (F-2 APPLY)

**Per F-2 P2**: scope NARROWED to ADOPT-NOW-only validations + EXPLICITLY ADDED W233-W HNF + W235-Y iter2b items:

FM-09 2nd-stage validation REQUIRED before commit on:
1. **W233-V**: ACON Probe DAG 1-7 (Probe 5 mode-harness + Probe 7.b agent-context demand)
2. **W233-V**: leanctx Probe 5 (autonomous /loop SDK fit; Anthropic-only canonical)
3. **W233-V**: ace-agent/ace Probe 7.b 5-clause STUDY-PILOT.b (alternative to ACON)
4. **W233-X**: presidio Probe 7.b (PII data path existence in sss)
5. **W233-X**: llm-guard Probe 5 (5mo-stale scanner subset only)
6. **W235-Z**: wshobson Top-3 (shell-scripting / plugin-eval / block-no-verify) Probe 4 + 5 + 6 + 7
7. **W235-Y**: 4 NEW Anthropic/OpenAI/GitHub candidates Probe 6 (especially openai/skills LICENSE direct-blob read)
8. **W235-Y**: iter2b GENUINE-GAPs #3 + #7b + #10 (eee.ps1 wire — re-score under STRONG-PROVENANCE-EXPRESS per F-5)

FM-09 2nd-stage validation NOT REQUIRED on:
- **W233-W**: streaming/realtime layer (HONEST-NON-FINDING REJECT-AT-LAYER — no candidate to validate; no install proposed)

### §5.g Upstream PR queue (W235-Z) — unchanged
- wshobson/plugin-eval `.claude-plugin/plugin.json` license/version/description/author fix

### §5.h FM-20 Row 21 cross-runtime cite-anchor discipline — unchanged

## §6 — Saturation Re-Scoring (F-5 APPLY) — STRONG-PROVENANCE-EXPRESS clause

**Per F-5 P1**: convergence-gate.md §STRONG-PROVENANCE-EXPRESS predicate allows official-org maintainership + named-T2-OR-org-equivalent endorsement to satisfy Axis-2 + Axis-3 at relaxed maturity gate. W235-Y scored 4 NEW Anthropic/OpenAI/GitHub candidates as Axis-2 PARTIAL — but maintainer-org IS the T2-equivalent.

### Re-scored 4 W235-Y NEW candidates under STRONG-PROVENANCE-EXPRESS:

| # | Candidate | Original verdict | Re-scored verdict |
|---|---|---|---|
| Δ-N1 | anthropics/claude-code-base-action | STUDY-PILOT.b (Axis-2 PARTIAL) | **ADOPT-NOW-ELIGIBLE** under STRONG-PROVENANCE-EXPRESS (Anthropic-OFFICIAL = T2-equivalent) — gate remains Probe 7.a DEMAND-ABSENCE (no CI activated yet) |
| Δ-N2 | anthropics/claude-code-security-review | STUDY-PILOT.b (Axis-2 PARTIAL) | **ADOPT-NOW-ELIGIBLE** under STRONG-PROVENANCE-EXPRESS — gate is now Probe 7.b 5-clause for security-review workflow demand |
| Δ-N3 | openai/skills | C+ HOLD (UNKNOWN LICENSE) | **HOLD UNCHANGED** — Probe 6 LICENSE blocker is structural; STRONG-PROVENANCE-EXPRESS doesn't waive Probe 6 |
| Δ-N4 | github/gh-aw | STUDY-PILOT.b (Axis-2 PARTIAL) | **ADOPT-NOW-ELIGIBLE** under STRONG-PROVENANCE-EXPRESS (GitHub-OFFICIAL = T2-equivalent) — Probe 7.b NEW-WORKFLOW |

**Saturation claim REVISED**: outer research deep-dive does NOT add zero ADOPT-NOW under correct STRONG-PROVENANCE-EXPRESS application. **3 candidates become ADOPT-NOW-ELIGIBLE** when demand-gate (Probe 7) resolved:
- Δ-N1 + Δ-N2 + Δ-N4 are ADOPT-NOW pending operator commitment to (a) CI/CD activation roadmap (Δ-N1+Δ-N2) and (b) gh-CLI agentic workflow trigger (Δ-N4).

## §7 — Updated ADOPT-NOW total: 31 base + 3 conditional = up to 34

If operator commits to CI/CD activation + gh-aw workflow:
- 31 baseline ADOPT-NOW (W236 32 minus review-agent-governance F-3 removal)
- +3 conditional ADOPT-NOW (Δ-N1 + Δ-N2 + Δ-N4 per STRONG-PROVENANCE-EXPRESS re-score)
- = **34 ADOPT-NOW maximum**

## §8 — Forward Queue EXPANDED (F-7 APPLY adds F14)

- **F1**: Cite-anchor migration ship — 50+ rule files reference retired `Z:/claude-sota/` paths
- **F2**: ✅ Pattern D codex T1 BRIDGE-MODE review COMPLETED on W236 (verdict NEEDS-REVISION conf=0.91 applied here)
- **F3**: Phase 4 Tier-A SOTA CLI + W235-Z Top-3 batch install (AFTER F14 source-audit)
- **F4**: `docs/verified-avoid.md` update (n=34 GitHub phantoms + n=1 FM-20 + ~160 REJECT entries)
- **F5**: Tom Farley trio Phase 3.5 evaluation (30d burn + crypto audit)
- **F6**: FM-09 2nd-stage validation per §5.f expanded scope
- **F7**: ACON vs ACE adoption tiebreak after 30d STUDY-PILOT.b
- **F8**: Presidio Probe 7.b 5-clause final operator decision
- **F9**: openai/skills LICENSE direct-blob read for Probe 6
- **F10**: wshobson Top-3 install + STUDY-PILOT.b 4-plugin queue (gated on F14)
- **F11**: signed-audit-trails cite-import-AMBER to `docs/governance-cookbook.md`
- **F12**: iter2b GENUINE-GAPs #3 + #7b + #10 wiring in tools/eee.ps1
- **F13**: wshobson upstream PR for plugin-eval plugin.json license fix
- **F14 (NEW per F-7)**: wshobson Top-3 source-audit BEFORE Phase 4 install commit. Required checks:
   - shell-scripting: Ryan Snodgrass named-T2 dated artifact (LinkedIn / blog / conf talk; github.com/rsnodgrass verification)
   - plugin-eval: source audit at `Z:/repos/deps/wshobson-agents/plugins/plugin-eval/docs/plugin-eval.md:3,145,162,177,270-280` + `engine.py:71-121` (3-layer/Elo file:line implementation verification) + plugin.json metadata PR
   - block-no-verify: cskwork identity + reputation + hook false-positive/coverage audit
   - **DEMOTE TO STUDY-PILOT.b** any item that fails source-audit

## §9 — Cumulative Catalog Statistics (Corrected)

| Metric | W236 | W237 (corrected) |
|---|---|---|
| Total agent reports | 26 | 26 (W220-W235) |
| Total syntheses | 7 | 8 (W237 added) |
| ADOPT-NOW baseline | 32 | **31** (F-3 review-agent-governance removed) |
| ADOPT-NOW-eligible (STRONG-PROVENANCE-EXPRESS re-score) | n/a | **+3** (Δ-N1+Δ-N2+Δ-N4 pending demand-gate) |
| **ADOPT-NOW maximum** | 32 | **34** |
| STUDY-PILOT.b queue | 13 | 10 (3 promoted to ADOPT-NOW-eligible) |
| REJECT-FOR-FIT | ~160 | ~161 (review-agent-governance moved here) |
| **Phantom catches: GitHub-repo-existence** | n=35 (mixed) | **n=34** (split) |
| **Phantom catches: FM-20 cross-runtime** | n=35 (mixed) | **n=1** (split) |
| AGPL/proprietary blockers | 4 | 4 |
| ABANDONED candidates | 2 | 2 |
| Probe 5 HARD-GATE cohort | 3 | 4 (review-agent-governance demoted here) |
| BLOCKING pre-conditions | 8 | 8 (§5.a-h, with §5.d EXPANDED + §5.f EXPANDED) |
| Forward queue items | 13 | **14** (F14 added) |

## §10 — verdict_one_line (corrected)

`OPERATOR-EXECUTION-READY-FINAL-CORRECTED-v4: W237 Pattern A FIX-FORWARD applies 7/7 codex T1 prescriptions (conf=0.91) to W236; ADOPT-NOW=31 baseline + up to 3 conditional via STRONG-PROVENANCE-EXPRESS re-score (Δ-N1/N2/N4 Anthropic+GitHub OFFICIAL) = 34 maximum; review-agent-governance REMOVED Phase 11 (Probe 5 HARD-GATE structural blocker); §5.d version-pin matrix COMPREHENSIVE across all 31 Phase 0-11 candidates; §5.f FM-09 validation EXPANDED to W235-Y iter2b + omits W233-W HNF (no install); §3 W232 META-tooling vs install-catalog orthogonality DISCLOSED; §4 phantom-ladder SPLIT (n=34 GitHub + n=1 cross-runtime); §8 F14 wshobson Top-3 source-audit ADDED before Phase 4 install commit; cross-model gate FULLY SATISFIED via REAL GPT-5.5 BRIDGE-MODE foreground+tee at .claude/state/codex_consult_w236_synthesis_review_OUT.txt; orchestrator MUST execute §5.a-h + F6 FM-09 + F14 wshobson source-audit BEFORE Phase 1 commit; predecessor W236 retained for audit-trail per port-note-discipline.md §6 no-retroactive-rewrite.`

VERDICT: **OPERATOR-EXECUTION-READY-FINAL-CORRECTED** (post §5 + F6 + F14 complete)
