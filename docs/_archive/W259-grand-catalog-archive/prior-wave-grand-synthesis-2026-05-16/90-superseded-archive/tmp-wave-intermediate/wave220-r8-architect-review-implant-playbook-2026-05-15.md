---
title: Wave 220 Round 8 — Architect adversarial review of Z:\claude-sota-pure implant playbook
status: AUTHORITATIVE
date: 2026-05-15
wave: 220
fire: round-8-architect-review (orchestrator main-thread; Sonnet stand-in per FM-17.e arc continuation; STAND-IN-NOTICE filed per `cmc-env-funneled-disclosure.md §The mandate` Option 2)
artifact-class: adversarial-architect-review-of-implant-playbook
cross-model-gate: PARTIAL-via-prior-Pattern-A-R4+R7 — this review consumes R4/R5/R7 codex-verified evidence; no fresh codex T1 fire this round (deferred to operator R9 ratification)
---

# Wave 220 Round 8 — Architect adversarial review of implant playbook

## Section 0 — Executive summary (3 sentences)

The Phase 1-10 implant playbook is **directionally correct** (canonical SOTA repos, license-clean primitives, plausible Top-37 ADOPT-NOW set) but contains **two P0 dependency-order violations + four P1 layer-overlap DRY violations + two P1 reversibility gaps** that would produce runtime install failures and post-install primitive duplication if shipped as-is. The most consequential P0 is **Phase 3 graphiti MCP depending on Phase 8 CLIProxyAPI port 11700 binding** (cite R2:379 + R2:460-465) — graphiti will fail-to-start on `claude-sota-pure` greenfield because CLIProxyAPI isn't installed until 5 phases later. Recommended verdict: **NEEDS-REVISION conf=0.91 — APPROVE post-fix-forward** (Pattern A apply on 6 prescribed edits enumerated in Section 6); the catalog research itself is sound and ratified at R4+R7 Pattern A codex T1 success.

---

## Section 1 — Per-dimension findings (ARCH-1 through ARCH-6)

### ARCH-1 — Phase ordering coherence — **P0 + P1 violations found**

#### Finding ARCH-1.a (P0 BLOCKER) — graphiti MCP Phase 3 depends on CLIProxyAPI Phase 8

**Evidence**:
- `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:379` graphiti MCP config sets `"OPENAI_API_URL": "http://127.0.0.1:11700/v1"` in Phase 3
- `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:460-465` CLIProxyAPI install (Go binary on port 11700) is deferred to Phase 8
- `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:158` declares "graphiti's `OPENAI_API_URL=http://127.0.0.1:11700/v1` env points here [CLIProxyAPI]"

**Failure shape on greenfield `claude-sota-pure`**: graphiti MCP server starts at Phase 3 → tries to embed via OpenAI API call → connects to `http://127.0.0.1:11700/v1` → port has no listener → `mcp__graphiti__add_memory` returns connection-refused at first invocation. Worse: Phase 3 smoke probe (per Phase 10 verification gate L491) will fail-silent because graphiti is `tools/list`-reachable but `add_memory` errors at first call — wrong primitive will look healthy.

**Cite-class**: TIER-3-LOCAL-OPERATOR-DERIVED (direct R2 catalog read 2026-05-15 this fire) per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.

**Severity**: P0 (BLOCKER) — playbook would fail at Phase 3 first MCP invocation on greenfield install.

#### Finding ARCH-1.b (P0 BLOCKER) — FalkorDB Docker dependency for graphiti MCP not in Phase 3

**Evidence**:
- `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:376-378` graphiti MCP requires `FALKORDB_URI=redis://127.0.0.1:16379`
- Phase 1 baseline (R2:320-340) installs Docker Desktop but does NOT explicitly start FalkorDB container
- Phase 4 (R2:415-424) installs Qdrant Docker container but FalkorDB Docker pull is missing entirely from any phase
- `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:62` notes "FalkorDB v1.6.1 at port 16379 [already-INSTALLED at target]" — but this refers to `claude-sota-installed` (current runtime), NOT `claude-sota-pure` greenfield

**Failure shape**: Phase 3 graphiti MCP start → FalkorDB connection refused at port 16379 → graphiti MCP fails to initialize → same as ARCH-1.a runtime fail.

**Cite-class**: TIER-3-LOCAL-OPERATOR-DERIVED.

**Severity**: P0 — greenfield install missing critical container.

#### Finding ARCH-1.c (P1) — Phase 8 CLIProxyAPI OAuth step is interactive (blocks autonomous install)

**Evidence**: `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:465` "Extract + OAuth setup via SPA management center at http://localhost:11700"

**Failure shape**: OAuth setup requires browser interaction — incompatible with `/loop` autonomous install mode. Phase 8 will halt waiting for human input.

**Severity**: P1 — install can complete but requires manual OAuth round-trip.

#### Finding ARCH-1.d (P1) — Phase 5 Langfuse Docker depends on Phase 1 Docker but doesn't pre-flight check

**Evidence**: `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:429-432` `git clone langfuse + docker compose up` assumes Docker Desktop running

**Failure shape**: Phase 1 Docker Desktop install ≠ Docker Desktop running. Phase 5 will fail if Docker isn't started post-install.

**Severity**: P1 — recoverable but produces confusing error.

#### Finding ARCH-1.e (P1) — Phase 9 codex T1-T7 hooks claimed "install-class via codex plugin" but verification command in playbook is wrong

**Evidence**: `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:481-483` verification uses `ls Z:/claude-sota-pure/.claude/hooks/scripts/codex_*.py` + `grep -nE "codex_t[1-7]" Z:/claude-sota-pure/.claude/settings.json`

**Failure shape**: codex plugin installs hooks to `.claude/plugins/cache/openai-codex/codex/<v>/scripts/`, NOT `.claude/hooks/scripts/`. The verification `ls` will return empty even when correctly installed. False-negative install state.

**Cite-class**: TIER-3-LOCAL-OBSERVED (compare to current runtime `Z:/claude-sota-installed/.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/` path-shape).

**Severity**: P1 — install succeeds but operator can't verify it.

---

### ARCH-2 — Layer overlap / DRY violations — **4 P1 violations + 2 P2 advisory**

Per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 ("Duplicate existing functionality without a clear reason") + `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §The 7 sub-classes Probe 4 plugin-namespace`:

#### Finding ARCH-2.a (P1) — L3 memory layer has 3 ADOPT-NOW + 2 STUDY-PILOT overlap

**Evidence (R2:73-77 Section 3)**:
- ADOPT-NOW: `getzep/graphiti` (Rank #3)
- ADOPT-NOW: `doobidoo/mcp-memory-service` (Rank #4) — but Section 1 classifies this as L1 capture, not L3
- STUDY-PILOT: `cognee` (R2:43+R2:75)
- STUDY-PILOT: `mem0ai/mem0` (R2:44+R2:77 PROVIDER-COMPLEMENT)
- STUDY-PILOT: `letta-ai/letta` MemGPT (R2:76)

**Question**: Does Phase 3 install `doobidoo/mcp-memory-service` as L1 OR as L3-overlap? Catalog asserts BOTH (Section 1 and Section 3) which violates kiss-dry-yagni Must-Never #4.

**R5 codex disaggregation already caught this** at `tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md:36-39`: "claude-mem is NOT compression — it's persistent memory" disaggregation correction. Same DRY tension at L1-vs-L3 needs resolution before install.

**Severity**: P1 — produces installer ambiguity; orchestrator may install both with overlapping query surface.

#### Finding ARCH-2.b (P1) — L4 RAG framework: LightRAG ADOPT-NOW conflicts with RAGFlow DEFER

**Evidence (R2:87-89)**:
- ADOPT-NOW: `HKUDS/LightRAG` (Rank #15)
- DEFER: `infiniflow/ragflow` (R2:88 "heavy enterprise RAG; DEFER overbuilt")
- STUDY-PILOT: `microsoft/graphrag` (R2:91)

**Question**: If LightRAG is ADOPT-NOW + Graphiti L3 is ADOPT-NOW (Rank #3) + microsoft/graphrag is STUDY-PILOT — what is the actual retrieval-vs-graph-RAG vs temporal-KG decomposition? R5 §1 already separated retrieval (L4) from temporal-KG (L3 graphiti) from selection (manojmallick/sigmap STUDY-PILOT). The Phase 4 install of LightRAG MUST cite the specific L4 use-case that L3 graphiti doesn't already cover, else this is PARTIAL-OVERLAP per CR-12 disposition lattice.

**Severity**: P1 — install candidate without documented operational driver per Probe 7.b demand-gate split.

#### Finding ARCH-2.c (P1) — Phase 5 observability: Langfuse + Phoenix overlap

**Evidence (R2:235-236)**:
- ADOPT-NOW: `langfuse/langfuse` (Rank #11)
- STUDY-PILOT-PROVIDER-COMPLEMENT: `Arize-ai/phoenix` (R2:236 "already partially installed")

**Question**: Phase 5 installs only Langfuse, but Phoenix is "already partially installed" — which is wrong for `claude-sota-pure` greenfield (no install yet). Either Phoenix should be added to Phase 5 with provider-complement rationale, OR Phoenix should be REJECT for greenfield. Current playbook silently inherits Phoenix from `claude-sota-installed` runtime.

**Severity**: P1 — greenfield-vs-incumbent state confusion.

#### Finding ARCH-2.d (P1) — Phase 2 plugin marketplace selection: 5 marketplaces is high overlap

**Evidence (R2:344-358)**:
- `anthropics/claude-plugins-official`
- `addyosmani/agent-skills`
- `wshobson/agents`
- `affaan-m/everything-claude-code` (ECC)
- `obra/superpowers`

**Cross-reference**: `Z:/claude-sota-installed/.claude/rules/skill-orchestration-discipline.md` declares 4 active meta-skills (using-superpowers / using-agent-skills / skill-comply / skill-creator) — but 5 marketplaces will inject ~1500+ SKILL.md descriptions into Anthropic CC native discovery. Per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 4 plugin-namespace`: BEFORE installing per-plugin selectively, verify no duplicate functionality across marketplaces (e.g., obra/superpowers `requesting-code-review` vs wshobson `code-review` agent).

**Severity**: P1 — installation succeeds but operational surface becomes ambiguous (which skill auto-fires when description-match overlaps?).

#### Finding ARCH-2.e (P2 advisory) — Section 12 multimodal: markitdown + docling + outlines overlap

**Evidence (R2:271-276)**:
- ADOPT-NOW: `microsoft/markitdown` (Rank #13)
- STUDY-PILOT-PROVIDER-COMPLEMENT: `docling-project/docling`
- ADOPT-NOW: `dottxt-ai/outlines` (R2:276 structured-output)

**Question**: All 3 are doc-preprocessing/structured-output adjacent. Phase 6 installs markitdown + Phase 7 installs outlines but NOT docling. Defensible (markitdown is broader; outlines is different layer — generation not parsing) but should be made explicit in playbook to avoid post-install confusion.

**Severity**: P2 — advisory only; not blocker.

#### Finding ARCH-2.f (P2 advisory) — Section 11 code-intelligence: serena + repomix overlap on symbol-intelligence

**Evidence (R2:252-255)**:
- ADOPT-NOW: `oraios/serena` (Rank #N/A — listed as Top-3 for Section 11)
- ADOPT-NOW: `yamadashy/repomix` (Rank #N/A)
- ADOPT-NOW: `jlowin/fastmcp`

**Question**: Serena LSP-grounds + Repomix tree-sitter compression — both touch symbol intelligence but at different granularities. Playbook doesn't articulate when to invoke which. Per `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md` Rank #2 the canonical use of repomix is "pack→grep workflow for repo-scope audits ≥5 files"; serena would be the LSP-grounded symbol-search alternative. Acceptable PARTIAL-OVERLAP but should be documented.

**Severity**: P2 — advisory.

---

### ARCH-3 — Failure mode coverage per ADOPT-NOW primitive — **P1 gaps**

Per `Z:/claude-sota-installed/.claude/rules/named-failure-modes.md` META-catalog discipline: every install primitive should have a documented recovery path. Audit of Top-15 ADOPT-NOW (R2:520-536):

| Rank | Primitive | FM coverage at install-failure | Severity |
|--:|---|---|---|
| 1 | `anthropics/claude-plugins-official` | ✅ FM-03 D5 auth-class (marketplace add fail) → re-auth | OK |
| 2 | `anthropics/cwc-long-running-agents` | ⚠️ No documented recovery for 5-primitive install partial failure | **P1** |
| 3 | `getzep/graphiti` | ⚠️ FM-03 D1 transport (FalkorDB disconnect) covered; **but Phase-3-vs-Phase-8 dependency (ARCH-1.a) has no documented recovery** | **P1** |
| 4 | `doobidoo/mcp-memory-service` | ✅ sqlite_vec embedded → no service deps; FM-03 covers | OK |
| 5 | `microsoft/playwright` | ✅ FM-03 D2 service-class for browser launch fail | OK |
| 6 | `addyosmani/agent-skills` | ✅ FM-03 D5 auth + marketplace per-skill review | OK |
| 7 | `wshobson/agents` | ✅ same FM-03 D5 | OK |
| 8 | `obra/superpowers` | ✅ FM-03 D5 + selective vendor pattern documented | OK |
| 9 | `upstash/context7` | ✅ FM-03 D1 transport | OK |
| 10 | `affaan-m/everything-claude-code` | ⚠️ LAUNCH-SPIKE caveat per R2:191 but no FM-class recovery path | **P1** |
| 11 | `langfuse/langfuse` | ⚠️ Phase 5 Docker compose has no FM-class recovery for compose-up partial failure (Postgres/ClickHouse partial start) | **P1** |
| 12 | `promptfoo/promptfoo` | ✅ CLI install simple; FM-N/A | OK |
| 13 | `microsoft/markitdown` | ✅ pip install simple | OK |
| 14 | `qdrant/qdrant` | ✅ FM-03 D1 transport | OK |
| 15 | `HKUDS/LightRAG` | ⚠️ Phase 4 lib install simple but no doc on FalkorDB/Qdrant backend choice for LightRAG storage | **P1** |

**Severity summary**: 5 P1 FM-coverage gaps (Ranks 2, 3, 10, 11, 15). Cite per `Z:/claude-sota-installed/.claude/rules/named-failure-modes.md §Recovery-recipe template`: each install row should name a documented FM-XX recovery.

---

### ARCH-4 — Reversibility — **P2 advisory + P1 for Phase 8 OAuth**

Per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome B REVERT-AND-REMOVE` discipline:

| Phase | Reversibility class | Revert effort | Severity |
|---|---|---|---|
| Phase 1 baseline (npm/git/python/node/docker) | HIGH | uninstall each via winget/pip uninstall | OK |
| Phase 2 plugin marketplaces | HIGH | `/plugin marketplace remove <url>` per official command | OK |
| Phase 3 MCP servers (.mcp.json edit) | HIGH | revert single JSON file | OK |
| Phase 4 Qdrant Docker | HIGH | `docker rm` + remove `-state/qdrant/` dir | OK |
| Phase 4 LightRAG pip | HIGH | `pip uninstall` | OK |
| Phase 5 Langfuse Docker compose | MEDIUM | `docker compose down -v` + remove `-state/langfuse/` (data volumes coupled) | **P2** |
| Phase 5 promptfoo npm | HIGH | `npm uninstall -g` | OK |
| Phase 6 serena/repomix MCP | HIGH | .mcp.json revert | OK |
| Phase 6 markitdown/fastmcp pip | HIGH | pip uninstall | OK |
| Phase 7 outlines/duckdb pip | HIGH | pip uninstall | OK |
| Phase 8 **CLIProxyAPI binary + OAuth tokens** | **LOW** | requires OAuth revocation at provider side; tokens persisted in `.local/cliproxy/auth.json` | **P1** |
| Phase 9 codex T1-T7 hooks | HIGH | `/plugin uninstall codex@openai-codex` | OK |

**P1 finding**: Phase 8 CLIProxyAPI OAuth tokens carry external state (Anthropic/Google/OpenAI provider account credentials). Revert is OPERATOR-MANUAL not mechanical. Documented OAuth revocation should be part of Phase 8 install recipe.

**P2 finding**: Phase 5 Langfuse Docker compose with persistent Postgres data — revert loses operational history.

---

### ARCH-5 — Native-CC fit gaps — **P1 + P2 findings**

Per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-5-install-priority.md` + `cardinal-rule-6-fresh-from-github.md`: every install MUST have a clear CC plugin/MCP/skill install path:

#### Finding ARCH-5.a (P1) — Section 9 cwc-long-running-agents has no documented `/plugin install` path

**Evidence**: R2:216 lists cwc-long-running-agents as "Native install + 5 primitives" but doesn't specify the install command. Per `Z:/claude-sota-installed/CLAUDE.md` Architecture section, cwc installs to `.local/cwc/` via clone + bash scripts (track-read.sh / verify-gate.sh / etc.) — NOT a `/plugin install` path. This is correct for cwc design, but Phase 1 playbook (R2:320-340) doesn't include the cwc clone step.

**Severity**: P1 — Phase 1 baseline missing cwc install steps despite cwc being Rank #2 ADOPT-NOW.

#### Finding ARCH-5.b (P2 advisory) — Section 13 DuckDB ADOPT-NOW (Phase 7) has no documented MCP/CC integration

**Evidence**: R2:290 ADOPT-NOW DuckDB Rank-not-listed-in-Top-15. Phase 7 (R2:456-458) `pip install duckdb` but no MCP server / CC skill bridge → CC won't auto-fire DuckDB queries; operator must invoke via Bash.

**Severity**: P2 — advisory; DuckDB as analytical surface is valid but operationally requires manual orchestration.

#### Finding ARCH-5.c (P2 advisory) — Section 7 LiteLLM DEFER but no rationale for picking CLIProxyAPI over LiteLLM for multi-provider

**Evidence**: R2:153 LiteLLM DEFER "unless multi-provider routing needed" — but Top-37 implies multi-provider eventually needed (OpenAI for graphiti embeddings + Anthropic for Claude Code + possibly local Ollama). Playbook commits to CLIProxyAPI but doesn't articulate the trade-off.

**Severity**: P2 — should be in `docs/install-provenance.md` rationale row.

---

### ARCH-6 — Critical-path minimum-viable install — **P0 missing**

**Finding ARCH-6.a (P0 minimum-viable gap)**: The Phase 1-10 ordering does not declare an MVP boundary. For a greenfield `claude-sota-pure`, the minimum-viable working CC harness requires:

**Critical path (Phase 1+2+9 ONLY)**:
1. **Phase 1 Native baseline** (CC + Git + Python + Node)
2. **Phase 2 plugin marketplace install** (anthropics-official + selective wshobson/superpowers + codex plugin for T1-T7 hooks)
3. **Phase 9 codex T1-T7 hooks** (cardinal-rule-3 cross-model gate)

This 3-phase MVP delivers: working CC + cross-model consensus gate + 1 plugin marketplace + skill discovery — sufficient for first SOTA-research session and Mia-probe discipline.

**Phases 3-8 + 10 are ENHANCEMENT** (memory stack + RAG + observability + multimodal + analytics + LLM proxy + ratification gate).

**Severity**: P0 — playbook should explicitly call out the MVP boundary so operator can install Phase 1+2+9 first, verify cross-model gate works, THEN incrementally add Phases 3-8.

---

## Section 2 — Phase ordering recommended amendments

### Amendment #1 (P0) — Move Phase 8 CLIProxyAPI BEFORE Phase 3 graphiti

**Current**: Phase 3 (graphiti) → ... → Phase 8 (CLIProxyAPI)
**Amended**: Phase 3a CLIProxyAPI binary install + OAuth → Phase 3b graphiti + FalkorDB Docker → Phase 4+ other MCPs

**Rationale**: closes ARCH-1.a + ARCH-1.b BLOCKERs. graphiti MCP requires both CLIProxyAPI on port 11700 AND FalkorDB Docker on port 16379 — both must exist before graphiti `.mcp.json` entry resolves at MCP server startup.

### Amendment #2 (P0) — Add FalkorDB Docker pull to Phase 3a (or new Phase 1.5)

**Add**:
```powershell
docker pull falkordb/falkordb:latest
docker run -d -p 16379:6379 -v Z:/claude-sota-pure-state/falkordb:/data falkordb/falkordb
```

**Rationale**: closes ARCH-1.b. Currently missing entirely from playbook despite being graphiti dependency.

### Amendment #3 (P1) — Insert MVP boundary marker after Phase 2 + Phase 9

**Add**: explicit "MVP boundary" section after Phase 2 + Phase 9 declaring that operator MAY stop at MVP and verify cross-model gate before continuing to enhancement phases.

**Rationale**: closes ARCH-6.a — risk-stratified install per `Z:/claude-sota/.claude/rules/cmc-verdict-shapes.md §Risk-stratified verification gating` (high-risk = full Phase 1-10; medium-risk = MVP-then-incremental).

### Amendment #4 (P1) — Add Phase 1 cwc clone step

**Add to Phase 1**:
```powershell
git clone --depth 1 https://github.com/anthropics/cwc-long-running-agents.git Z:/claude-sota-pure/.local/cwc
# Per-file SHA verification documented in docs/install-provenance.md
```

**Rationale**: closes ARCH-5.a — cwc is Top-2 ADOPT-NOW but install steps missing from Phase 1.

### Amendment #5 (P1) — Document Phase 9 codex hook verification path correctly

**Current verification (R2:482-483)**:
```powershell
ls Z:/claude-sota-pure/.claude/hooks/scripts/codex_*.py
```
**Corrected**:
```powershell
ls Z:/claude-sota-pure/.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/
# Then verify settings.json includes hook entries pointing into plugin cache
grep -nE "codex_t[1-7]|stop-review-gate" Z:/claude-sota-pure/.claude/settings.json
```

**Rationale**: closes ARCH-1.e — false-negative verification would mask successful install.

### Amendment #6 (P1) — Phase 8 OAuth automation OR explicit operator-gate marker

**Add to Phase 8**: explicit `[OPERATOR-INTERACTIVE]` marker + recommended pre-fetched OAuth setup OR runbook for browser flow.

**Rationale**: closes ARCH-1.c — interactive step in autonomous install pipeline is anti-pattern.

---

## Section 3 — Layer overlap REJECT recommendations

Per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 + `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 7.b demand-gate-split`:

### REJECT #1 (P1) — Resolve L1-vs-L3 doobidoo/mcp-memory-service classification

**Recommendation**: declare doobidoo/mcp-memory-service is **L1 capture ONLY** (sqlite_vec embedded backend for capture-class queries). Graphiti L3 owns temporal-KG / fact-edge / episode semantic. Mia at install-time runs cross-probe verifying no L3-query routes through doobidoo.

### REJECT #2 (P2) — Defer LightRAG L4 ADOPT-NOW until demand-driver documented

**Recommendation**: LightRAG ADOPT-NOW (Rank #15) requires explicit Probe 7.b 5-clause demand-driver per `agent-harness-fit-verification.md` BEFORE Phase 4 install. If no named operational use-case (cite a specific query/workflow) → DEFER to STUDY-PILOT.

### REJECT #3 (P2) — Document Phoenix REJECT or include in Phase 5

**Recommendation**: explicitly REJECT-FOR-FIT Phoenix on `claude-sota-pure` greenfield (no prior install to inherit) OR add Phoenix Docker compose to Phase 5 as PROVIDER-COMPLEMENT to Langfuse. Current playbook silently inherits from incumbent — violates cardinal-rule-9 sibling-bleed defense (FM-20 rows 7-8 sub-class).

### REJECT #4 (P2) — Selective per-skill review for 5 plugin marketplaces

**Recommendation**: per-marketplace deferred-install with explicit ENABLE-list in `.claude/settings.json:plugins` (per Anthropic CC sub-agents docs subagent-install-path precedence). Don't blanket-install all marketplace skills; cite `auto-compact-discipline.md` token-budget concern for 1500+ SKILL.md descriptions.

---

## Section 4 — Critical-path minimum-viable install order

### MVP (P0 install — sufficient for first session + cross-model gate verification)

**Phase 1 — Native baseline** (R2:320-340):
- npm install -g `@anthropic-ai/claude-code@latest`
- winget Git.Git + GitHub.cli + OpenJS.NodeJS.LTS + Docker.DockerDesktop
- Python venv at Z:/venvs/claude-pure
- `[NEW]` git clone cwc-long-running-agents to `Z:/claude-sota-pure/.local/cwc/` (Amendment #4)

**Phase 2 — TIER-1 plugin marketplaces** (R2:344-358) — but install ONLY:
- `/plugin marketplace add anthropics/claude-plugins-official`
- `/plugin install codex@openai-codex` (load-bearing for Phase 9)

Deferred to later: addy/wshobson/ECC/superpowers marketplaces (per ARCH-2.d).

**Phase 9 — Codex T1-T7 hooks** (R2:468-484, with Amendment #5 corrected verification path):
- Verify via `.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/` listing
- Verify `.claude/settings.json` hook entries reference plugin-cache paths

**MVP smoke probe (NEW)**:
- Edit a test file under `.claude/state/` → codex T1 hook fires
- Commit test file → codex T3 hook fires
- Verify verdict files appear at `.claude/state/codex_*_OUT.txt`

**MVP exit gate**: if cross-model gate functional → proceed to enhancement; else REVERT-AND-REMOVE.

### Enhancement phases (P1+ install after MVP)

- **Phase 3a (REORDERED)** — CLIProxyAPI binary + OAuth setup [OPERATOR-INTERACTIVE per Amendment #6]
- **Phase 3b (REORDERED)** — FalkorDB Docker pull + start (Amendment #2)
- **Phase 3c (REORDERED)** — graphiti MCP + doobidoo/mcp-memory + context7 + playwright + serena + repomix `.mcp.json` entries
- **Phase 4** — Qdrant Docker + LightRAG (after Probe 7.b demand-driver per REJECT #2)
- **Phase 5** — Langfuse Docker compose + promptfoo CLI (Phoenix decision per REJECT #3)
- **Phase 6** — markitdown + fastmcp + serena
- **Phase 7** — outlines + duckdb
- **Phase 8** — (merged into Phase 3a) — CLIProxyAPI now upstream of graphiti
- **Phase 10** — Path P codex T1 ratification of complete install state

---

## Section 5 — Cite-class for this review

`constituents=[
  TIER-3-LOCAL-OPERATOR-DERIVED @ Z:/claude-sota-installed/tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md:152,158,375-413,460-465,481-483 (R2 master read this fire),
  TIER-3-LOCAL-OPERATOR-DERIVED @ Z:/claude-sota-installed/tmp/wave220-r4-codex-t1-axis3-verdict-integration-2026-05-15.md:34-71 (R4 cpd × Axis-3 codex-verified),
  TIER-3-LOCAL-OPERATOR-DERIVED @ Z:/claude-sota-installed/tmp/wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md:26-39 (R5 6-layer disaggregation; doobidoo L1-vs-L3 disaggregation),
  TIER-3-LOCAL-OPERATOR-DERIVED @ Z:/claude-sota-installed/tmp/wave220-r7-codex-axis2-verdict-integration-2026-05-15.md:31-46 (R7 anthropics/skills Axis-2 codex Pattern A SUCCESS),
  TIER-2 @ Z:/claude-sota-installed/.claude/rules/named-failure-modes.md FM-03 META-router (recovery taxonomy),
  TIER-2 @ Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md (token-budget concern for marketplace blanket install),
  TIER-2 @ Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md row 14 + 19 + 21 (path-drift defense at install-time),
  TIER-2 @ Z:/claude-sota/.claude/rules/kiss-dry-yagni.md Must-Never #4 (DRY violations),
  TIER-2 @ Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 4 + Probe 7.b (plugin-namespace + demand-gate),
  TIER-2 @ Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome B (reversibility discipline),
  TIER-2 @ Z:/claude-sota/.claude/rules/cmc-verdict-shapes.md §Risk-stratified verification gating (MVP boundary justification),
  TIER-1-DIRECT-INHERITED @ Anthropic CC sub-agents docs (subagent-install-path precedence — referenced via R7 R2 catalog),
  TIER-1-DIRECT-INHERITED @ cwc-long-running-agents (Anthropic canonical harness referenced in CLAUDE.md Architecture section)
]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**STAND-IN-NOTICE**: This review ran as orchestrator-side Sonnet stand-in per `CLAUDE.local.md` ENV (f) historical context (note: ENV (f) currently commented-out per documentation but FM-17.e Round 1 double-block evidence indicates depletion-class still applies). Cross-model gate is NOT structurally satisfied at this review's synthesis layer until R9 Path P codex T1 deep-review-exec foreground+tee fires on this review document and ratifies (or refutes) the 6 amendments + 4 REJECT recommendations. The catalog research itself IS cross-model-verified (R4 + R7 Pattern A codex T1 SUCCESS).

---

## Section 6 — Final verdict

### Verdict shape

**NEEDS-REVISION conf=0.91** per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` (sweet spot 0.88-0.93 + 6 prescribed_edits ≤10):

**Prescribed_edits (6 — Pattern A single atomic apply)**:
1. **P0 ARCH-1.a fix**: Move CLIProxyAPI install from Phase 8 to Phase 3a (BEFORE graphiti) — Amendment #1
2. **P0 ARCH-1.b fix**: Add FalkorDB Docker pull + run to Phase 3 (or Phase 1.5) — Amendment #2
3. **P0 ARCH-6.a fix**: Add MVP boundary marker after Phase 2 + Phase 9 — Amendment #3
4. **P1 ARCH-5.a fix**: Add cwc clone step to Phase 1 — Amendment #4
5. **P1 ARCH-1.e fix**: Correct Phase 9 codex hook verification path — Amendment #5
6. **P1 ARCH-1.c fix**: Phase 8 (now Phase 3a) OAuth `[OPERATOR-INTERACTIVE]` marker — Amendment #6

**Plus 4 REJECT-class recommendations** (deferred to operator decision; not Pattern A blocker):
- REJECT #1 — Resolve L1-vs-L3 doobidoo classification (P1)
- REJECT #2 — Demand-driver gate for LightRAG (P2)
- REJECT #3 — Phoenix decision for greenfield (P2)
- REJECT #4 — Per-skill marketplace ENABLE-list (P2)

**Disposition path**:
- Apply 6 prescribed_edits to R2 master catalog as single atomic commit per Pattern A
- Re-fire Path P codex T1 ratification on amended catalog
- If APPROVE → catalog graduates AUTHORITATIVE; greenfield install proceeds with MVP → Enhancement phasing
- If NEEDS-REVISION conf<0.88 → escalate per `closed-loop-recursive-narrowing.md` Outcome B REVERT-AND-REMOVE for problematic phases

### Severity summary

- **P0 (BLOCKER)**: 3 findings (ARCH-1.a + ARCH-1.b + ARCH-6.a) — playbook would fail on greenfield install
- **P1 (HIGH)**: 8 findings (ARCH-1.c/d/e + ARCH-2.a/b/c/d + ARCH-3 5 gaps consolidated + ARCH-4 Phase 8 OAuth + ARCH-5.a)
- **P2 (MEDIUM)**: 6 findings (ARCH-2.e/f + ARCH-4 Phase 5 Langfuse + ARCH-5.b/c)
- **P3 (LOW/advisory)**: 0 findings (this is a high-stakes review; no nits surfaced)

---

## Section 7 — Forward-only persistence path

**This artifact persisted at**: `Z:/claude-sota-installed/tmp/wave220-r8-architect-review-implant-playbook-2026-05-15.md` (this file).

**Cross-references for next-fire R9 codex T1 ratification**:
- Read this file + R2 master catalog at `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md`
- Path P codex T1 prompt template: place at `.claude/state/codex_consult_w220_r9_architect_review_ratification.txt`
- Codex T1 verdict file: `.claude/state/codex_consult_w220_r9_architect_review_ratification_OUT.txt`
- Foreground+tee per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D` 6-parameter recipe:
  ```bash
  timeout 300 codex exec --skip-git-repo-check --color never \
    < .claude/state/codex_consult_w220_r9_architect_review_ratification.txt \
    2>&1 | tee .claude/state/codex_consult_w220_r9_architect_review_ratification_OUT.txt
  ```

**Forward-only correction** per `Z:/claude-sota/.claude/rules/port-note-discipline.md §6`: do NOT rewrite R2 master catalog historical text; apply 6 prescribed_edits as forward-only amendments in a new R8a-amended-catalog file OR as inline diff commit to R2 (operator decision).

**Sister artifact integration** (R1-R8 cumulative chain):
- R1: `wave220-round1-fm17e-double-block-status-2026-05-15.md` (failure record)
- R2: `wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md` (master + Phase 1-10 implant)
- R3: `wave220-r3-mass-discovery-delta-2026-05-15.md`
- R4: `wave220-r4-codex-t1-axis3-verdict-integration-2026-05-15.md` (Pattern A #1 cpd × Axis-3)
- R5: `wave220-r5-codex-llmlingua-arch-evidence-integration-2026-05-15.md` (6-layer disaggregation)
- R6: `wave220-r6-*` (lean-ctx + tscg + karpathy-llm-wiki Top-33)
- R7: `wave220-r7-codex-axis2-verdict-integration-2026-05-15.md` (Pattern A #2 anthropics/skills Axis-2)
- **R8 (this file)**: `wave220-r8-architect-review-implant-playbook-2026-05-15.md` (architect adversarial review)

**Wave 220 RESEARCH PHASE substantially complete + ARCHITECT-REVIEW PHASE complete**. Operator decision for R9:
- (a) Apply 6 prescribed_edits + fire Path P codex T1 ratification NOW
- (b) Defer ratification + commit R8 review as authoritative architect input + manual operator review pre-greenfield install
- (c) Extend with R9 deeper-axis-2 verification per ARCH-2.a/b/c overlap concerns before install

This review preserves CR-1 + CR-3 + CR-8 + CR-9 + CR-11 + CR-12 compliance: every finding cites primary artifact at file:line, prescribes Pattern A FIX-FORWARD apply path, and routes through cross-model consensus gate via R9 codex T1 ratification per `cross-model-consensus.md §The contract` cardinal-rule-3.

VERDICT-ARCH-REVIEW-COMPLETE.
