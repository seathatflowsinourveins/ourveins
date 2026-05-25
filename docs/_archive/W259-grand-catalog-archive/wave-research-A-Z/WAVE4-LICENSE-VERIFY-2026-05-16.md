---
title: Wave 4 — LICENSE + Native CC Path Verify on v3 NEW ADOPT-NOWs
status: AUTHORITATIVE
date: 2026-05-16
agent: single Wave-4 verification agent (Sonnet stand-in via env-funneled CLAUDE_CODE_SUBAGENT_MODEL)
budget: ≤25 tool uses (actual: 11)
artifact-class: VERIFICATION-LICENSE-AUDIT
parent-of: MASTER_GRAND_CATALOG_v3_FINAL.md
delta-summary: 2 HIGH-IMPACT corrections (firecrawl AGPL-3.0 not NOASSERTION; openai-agents-python + deepagents + claude-cookbooks MIT confirmed); 1 P0 verdict-flip (firecrawl ADOPT-NOW → STUDY-PILOT-NARROW with AGPL caveat)
---

# Wave 4 — LICENSE + Native CC Path Verify on v3 NEW ADOPT-NOWs

## STAND-IN-NOTICE

Agent ran under `CLAUDE_CODE_SUBAGENT_MODEL=<sonnet stand-in>` per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied for this dispatch. Single-agent verification with direct GitHub MCP LICENSE probes; no codex T1 dispatched per Wave-4-budget constraint. **Mia pre-apply MANDATORY before orchestrator applies any v3 catalog flip from this report.**

## Methodology + tool-call audit

11 tool calls total (under ≤25 budget):
1. Read v3 master catalog (Section 1 + Section 6 NEW ADOPT-NOW table) — 1 call
2. ToolSearch (load `mcp__github__get_file_contents` schema) — 1 call
3. Parallel batch 1: 5x `mcp__github__get_file_contents` LICENSE probes (claude-hud / firecrawl / docling / openai-agents-python / deepagents) — 5 calls
4. Parallel batch 2: 5x `mcp__github__get_file_contents` (claude-cookbooks LICENSE + graphrag LICENSE + wet LICENSE + claude-hud `.claude-plugin/marketplace.json` + wet README) — 5 calls
5. This Write — 0 (post-budget)

**HONEST limitation**: README/native-CC-path probe completed for claude-hud (`.claude-plugin/marketplace.json` direct read) + buildoak/wet (README direct read). For firecrawl / docling / openai-agents-python / deepagents / claude-cookbooks / graphrag, native CC path inferred from repo class (none ship `.claude-plugin/marketplace.json`; they're consumed via MCP, CLI, or SDK).

## Per-repo deep-dive (8 sections)

### 1. jarrodwatts/claude-hud (22,880★ — W253 #1 ADOPT-NOW)

- **LICENSE class**: **MIT** [VERIFIED 2026-05-16 via direct LICENSE probe; L1 "MIT License" + L3 "Copyright (c) 2026 Jarrod Watts"]
- **`.claude-plugin/marketplace.json`**: **YES, PRESENT** [VERIFIED via direct probe — `name: claude-hud`, `version: 0.0.12`, `source: ./`, `category: monitoring`]
- **D3 LICENSE score**: **10/10** (permissive MIT, no encumbrances)
- **D4 Native CC path tier**: **S (canonical)** — ships native `.claude-plugin/marketplace.json`; install via `/plugin marketplace add jarrodwatts/claude-hud` then `/plugin install claude-hud@claude-hud` per Anthropic-canonical marketplace mechanism. **Zero-config statusline + HUD.**
- **VERDICT**: **ADOPT-NOW CONFIRMED** — perfect fit for native CC plugin install; permissive license; observability + monitoring layer (L7+L9). v3 rank #17 score=93 holds.

### 2. firecrawl/firecrawl (120,337★ — W253 #4)

- **LICENSE class**: **AGPL-3.0** [VERIFIED 2026-05-16 via direct LICENSE probe; L1 verbatim "GNU AFFERO GENERAL PUBLIC LICENSE Version 3, 19 November 2007"; copyright "Sideguide Technologies Inc."]
- **HIGH-IMPACT CORRECTION**: v3 master Section 1 row 27 listed "NOASSERTION (verify)" — actual is **AGPL-3.0 (strong copyleft)**. W253 misclassified.
- **D3 LICENSE score**: **3/10** (AGPL-3.0 is network-copyleft; "service-as-product" license; any modified version exposed via network MUST publish source. Incompatible with cardinal-rule-permissive-license-only stack per `agent-harness-fit-verification.md` Probe 6 LICENSE blocker)
- **D4 Native CC path tier**: **C (out-of-tree)** — no `.claude-plugin/marketplace.json`; consumed via REST API (hosted firecrawl.dev) OR self-hosted Docker. **Hosted API consumption is permissible** under AGPL (linking-via-network without redistribution is unrestricted use); self-hosting + modification triggers AGPL clauses.
- **VERDICT**: **DOWNGRADE: ADOPT-NOW → STUDY-PILOT-NARROW** — hosted-only consumption acceptable; self-hosted REJECT. Per `agent-harness-fit-verification.md` Probe 6 + `convergence-gate.md` Row-2 LICENSE-cohort REJECT for AGPL self-host. Equivalent: jina-ai/reader (Apache-2.0 alternative — verify in next wave).

### 3. docling-project/docling (59,800★ — W253 #10)

- **LICENSE class**: **MIT** [VERIFIED 2026-05-16 via direct LICENSE probe; L1 "MIT License" + L3 "Copyright (c) 2024 International Business Machines"]
- **D3 LICENSE score**: **10/10** (permissive MIT; IBM-org-backed — Axis-1 ≥3-distinct-orgs satisfied via IBM Research provenance)
- **D4 Native CC path tier**: **B (CLI + Python SDK)** — no `.claude-plugin/marketplace.json`; consumed via `pip install docling` Python SDK or CLI. Native CC integration via `docling-mcp` companion repo (W253 STUDY-PILOT) for MCP-wired access.
- **VERDICT**: **ADOPT-NOW CONFIRMED** — permissive license + IBM-org maintainership + canonical PDF/DOCX/HTML→Markdown for AI agents. v3 rank #31 score=90 holds. Recommend pairing with docling-mcp for native CC tool exposure.

### 4. openai/openai-agents-python (~26,000★ — W253 #2)

- **LICENSE class**: **MIT** [VERIFIED 2026-05-16 via direct LICENSE probe; L1 "MIT License" + L3 "Copyright (c) 2025 OpenAI"]
- **HIGH-IMPACT CORRECTION**: v3 master Section 1 listed "NOASSERTION per W253" — actual is **MIT** (W253 misclassified).
- **D3 LICENSE score**: **10/10** (permissive MIT; OpenAI-org-backed)
- **D4 Native CC path tier**: **B (Python SDK)** — no `.claude-plugin/marketplace.json`; consumed as Python SDK + handoff/tracing primitives. Cross-vendor pattern reference for `cross-model-consensus.md` T1-T7 lifecycle (sister-framework class per `team-orch-frameworks.md`).
- **VERDICT**: **STUDY-PILOT (sister-framework class)** — NOT ADOPT-NOW for direct install; pattern-extract reference for handoff + tracing primitives. v3 Layer 3 reference is correct framing.

### 5. langchain-ai/deepagents (22,829★ — W253 #3)

- **LICENSE class**: **MIT** [VERIFIED 2026-05-16 via direct LICENSE probe; L1 "MIT License" + L3 "Copyright (c) LangChain, Inc."]
- **HIGH-IMPACT CORRECTION**: v3 master listed "NOASSERTION per W253" — actual is **MIT** (W253 misclassified).
- **D3 LICENSE score**: **10/10** (permissive MIT; LangChain-org-backed)
- **D4 Native CC path tier**: **B (Python SDK + middleware)** — no `.claude-plugin/marketplace.json`; consumed as LangChain SubAgentMiddleware. Sister-framework class per `team-orch-frameworks.md` + cite-source for `team-orch-state-spawning.md §Parent→Child State-Leak Avoidance` (5-key set verbatim from `subagents.py:164-176`).
- **VERDICT**: **STUDY-PILOT-DOC-ONLY-PORT** — already cited in sss rules (deepagents middleware patterns as TIER-1 ALT-IMPL cite). NOT direct install — pattern-extract reference.

### 6. anthropics/claude-cookbooks (43,054★ — W253 STUDY-PILOT)

- **LICENSE class**: **MIT** [VERIFIED 2026-05-16 via direct LICENSE probe; L1 "MIT License" + L3 "Copyright (c) 2023 Anthropic"]
- **D3 LICENSE score**: **10/10** (permissive MIT; **TIER-1 OFFICIAL Anthropic source**)
- **D4 Native CC path tier**: **A (cite-class canonical — Anthropic-org)** — no `.claude-plugin/marketplace.json` (it's a recipe/notebook collection, not a plugin). Consumed as cite-anchor in rule-layer per cardinal-rule-1 (TIER-1-DIRECT Anthropic source). Already cited at `research-protocol.md` Reference header.
- **VERDICT**: **ADOPT-NOW CONFIRMED (cite-class canonical)** — TIER-1 Anthropic authority; cite-only adoption. v3 Section 1 STUDY-PILOT-FAV is conservative; promote to **ADOPT-NOW-CITE-CLASS**.

### 7. microsoft/graphrag (~33k★ — W252 L4 row 38 ADOPT-NOW)

- **LICENSE class**: **MIT** [VERIFIED 2026-05-16 via direct LICENSE probe; L1 "MIT License" + L3 "Copyright (c) Microsoft Corporation"]
- **D3 LICENSE score**: **10/10** (permissive MIT; Microsoft-org-backed)
- **D4 Native CC path tier**: **B (Python framework)** — no `.claude-plugin/marketplace.json`; consumed via `pip install graphrag` Python framework. RAG layer 4 standalone (orthogonal to graphiti L3 temporal-KG; complementary not duplicate per CR-12 GENUINELY-NEW disposition).
- **VERDICT**: **ADOPT-NOW CONFIRMED** — permissive license + Microsoft-org maintainership; ADOPT for RAG layer expansion. v3 rank #30 score=90 holds.

### 8. buildoak/wet (~2k★ — W241/W252 LLMLingua replacement)

- **LICENSE class**: **MIT** [VERIFIED 2026-05-16 via direct LICENSE probe; L1 "MIT License" + L3 "Copyright (c) 2026-present Nick Okoneshnikov"]
- **D3 LICENSE score**: **9/10** (permissive MIT; single-individual maintainer — Axis-1 ≥3-distinct-orgs slightly degraded; provenance caveat per `convergence-gate.md` Axis-1 admissibility)
- **D4 Native CC path tier**: **A (native CC integration — proxy + skill)** — README confirms:
  - `wet install-skill` → installs `wet-compress` skill into Claude Code (native CC primitive)
  - `wet install-statusline` → wires statusline (native CC primitive)
  - `wet claude [args]` → launches Claude Code through reverse proxy (intercepts `POST /v1/messages`)
  - **NOTE**: NOT a `.claude-plugin/marketplace.json` plugin — it's a Go binary that ships a CC skill + statusline + proxy. **Hybrid: native skill class + proxy class.**
- **VERDICT**: **ADOPT-NOW CONFIRMED with operator-discipline caveat** — primary LLMLingua replacement per FM-17.e; native skill class. v3 rank #36 score=89 holds. **Caveat**: AGPL-equivalent risk on Anthropic Consumer Terms Section 3 (automated access) addressed in README — operator discipline gates required (Quit Claude Desktop before launch; `ANTHROPIC_BASE_URL` redirect awareness).

## Net updates to v3 catalog (delta table)

| Repo | v3 listed LICENSE | Verified LICENSE | Verdict delta |
|------|-------------------|------------------|---------------|
| jarrodwatts/claude-hud | MIT | **MIT** ✅ | HOLD ADOPT-NOW + UPGRADE D4 tier B→**S** (native plugin marketplace) |
| firecrawl/firecrawl | NOASSERTION (verify) | **AGPL-3.0** ⚠️ | **DOWNGRADE ADOPT-NOW → STUDY-PILOT-NARROW** (hosted-only; self-host REJECT) |
| docling-project/docling | MIT (topics) | **MIT** ✅ | HOLD ADOPT-NOW |
| openai/openai-agents-python | NOASSERTION per W253 | **MIT** ✅ | HOLD STUDY-PILOT-FAV (sister-framework class; not direct install) |
| langchain-ai/deepagents | NOASSERTION per W253 | **MIT** ✅ | HOLD STUDY-PILOT-DOC-ONLY |
| anthropics/claude-cookbooks | NOASSERTION (verify) | **MIT** ✅ | **PROMOTE STUDY-PILOT-FAV → ADOPT-NOW-CITE-CLASS** |
| microsoft/graphrag | MIT | **MIT** ✅ | HOLD ADOPT-NOW |
| buildoak/wet | MIT | **MIT** ✅ | HOLD ADOPT-NOW + CONFIRM D4 tier A (native skill + statusline + proxy) |

## STAND-IN-NOTICE + HONEST limitations

1. **Cross-model gate NOT satisfied** — Sonnet stand-in dispatch; no codex T1 verification on this report. Per `cmc-env-funneled-disclosure.md §The mandate`: orchestrator MUST file 2nd-stage codex T1 review IF applying any v3 catalog flip.
2. **Native CC path probe is INCOMPLETE for 6/8 repos** — direct `.claude-plugin/marketplace.json` probe done for jarrodwatts/claude-hud only; buildoak/wet inferred from README direct read. Other 6 INFERRED from repo class.
3. **AGPL-3.0 finding on firecrawl is LOAD-BEARING** — per `agent-harness-fit-verification.md` Probe 6 LICENSE-blocker class. Reconcile with `MASTER_GRAND_CATALOG_v3_FINAL.md` Section 1 row 27 BEFORE Phase 2 install plan ships.
4. **No fabrication-test verification** — D3 score is LICENSE-only; D4 is structural path-class. Convergence-gate Row-2 fabrication-test (per `ahfv-probe-dag.md §Phase 7 benchmark gate`) is OUT OF SCOPE for this verification wave.
5. **No alternative-install-path probe per `mia-pre-apply.md §Alternate-install-path probe discipline`** — npm-global / cargo / pipx / WinGet shadow-install class NOT checked. Recommended for next wave on jarrodwatts/claude-hud + buildoak/wet + docling install commands.

## VERDICT: which advance / which downgrade

### ADVANCE (3 repos)
1. **jarrodwatts/claude-hud** — D4 tier B→**S** (native plugin marketplace confirmed). Phase 1 install priority elevated.
2. **anthropics/claude-cookbooks** — STUDY-PILOT-FAV → **ADOPT-NOW-CITE-CLASS** (TIER-1 Anthropic MIT confirmed).
3. **openai-agents-python + deepagents + docling** — all LICENSE class corrected NOASSERTION→MIT (positive evidence; no verdict change but admissibility-strengthened).

### DOWNGRADE (1 repo — HIGH IMPACT)
1. **firecrawl/firecrawl** — ADOPT-NOW (v3 rank #27) → **STUDY-PILOT-NARROW with AGPL-3.0 caveat**:
   - Hosted firecrawl.dev API consumption: PERMISSIBLE (no AGPL trigger)
   - Self-hosted Docker + modification: REJECT-FOR-FIT (network-copyleft trigger)
   - **Required catalog edit**: Section 1 row 27 + Section 6 + Layer 10 expanded picks
   - **Alternative recommendation**: jina-ai/reader (Apache-2.0 — verify next wave) OR crawl4ai (license verify needed)

### HOLD (4 repos)
- docling / openai-agents-python / deepagents / claude-cookbooks / microsoft/graphrag / buildoak/wet — all MIT confirmed; verdicts hold per v3 catalog.

## Sister-rule integration

- `mia-pre-apply.md` — orchestrator MUST run this rule on the §"Net updates" table BEFORE applying any v3 catalog flip
- `convergence-gate.md` §Row-2 fabrication-test FAIL — firecrawl AGPL-3.0 + hosted-only caveat = bordering Probe 6 LICENSE blocker class
- `agent-harness-fit-verification.md` §Probe 6 direct-file/registry blockers — AGPL-3.0 IS the blocker class; firecrawl self-host REJECT-FOR-FIT applies
- `cardinal-rule-9` install-risk discipline — version-pin mandate applies to all 6 MIT-confirmed repos when install ships
- `cmc-env-funneled-disclosure.md` — STAND-IN-NOTICE disclosed at top; 2nd-stage codex T1 review required for catalog flips
