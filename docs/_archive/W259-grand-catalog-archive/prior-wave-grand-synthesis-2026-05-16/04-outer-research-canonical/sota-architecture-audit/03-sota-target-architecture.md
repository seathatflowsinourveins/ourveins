# SOTA Target Architecture — Ultimate eee Runtime

**Vision date:** 2026-05-10 (Wave 134 Fire 2)
**Methodology:** Synthesized from `01-current-state-baseline.md` + `02-gap-matrix.md` + 6 ecosystem catalogs + Anthropic OFFICIAL TIER-1-DIRECT cite anchors
**Cross-model verification:** PENDING — codex T1 e2e dispatch required before any commit per CR-3
**Cross-ref:** `00-master-tracker.md` for framework, `04-decision-tracker.md` for per-decision rationale

> **Design principle (operator directive verbatim)**: *"deep dive into your architecture ... optimized ultimate architecture of your system ... research all sota repos in every dimension ... give me the sota architecture with the gap of current architecture"*

---

## Architecture overview (one-page text)

eee runtime is a **Claude-orchestrates / Codex-reviews** harness with multi-layer memory, multi-dimensional research-first discovery (SRA D1-D10), and deny-emitting safety floor — built from upstream-installed primitives (per CR-5 install-priority + CR-12 upstream-install-priority over sibling-cite-import) with bounded sibling cite-import-AMBER for novel discipline that has no upstream parity.

### Topology (locked-in per CCBP `cross-model-workflow.md:1-48 @ HEAD 64fffd53`)

```
PLAN (Opus 4.7)
  → T1 codex pre-edit consult (deep-review-exec, xhigh, foreground+tee OR BRIDGE-MODE)
  → IMPLEMENT (Opus 4.7 + Agent fan-out + isolation:worktree)
  → T2 codex working-tree review (--uncommitted, STRICT, FAIL_CLOSED)
  → COMMIT
  → T3 codex postcommit auto (PostToolUse async)
  → PUSH (if remote)
  → T4 prepush cumulative (PostToolUse async; observability + queued fix-forward)
  → T5 plan-stage `/plan-codex-review` (manual; user-invoked) [pending]
  → T6 stop-gate (Stop sync, deep-review-exec)
  → T7 ask-without-act (Stop sync, regex+heuristic, slot[0] before T6)
```

### Memory stack (4 layers per CLAUDE.md §Memory Stack)

```
L1 capture        →  doobidoo/mcp-memory-service (sqlite_vec) [INSTALLED ✅]
L2 vector         →  qdrant/qdrant Docker + qdrant/mcp-server-qdrant [G2.1 install gap]
L3 temporal-KG    →  getzep/graphiti + FalkorDB + LiteLLM-routed embeddings [G2.2 unblock gap]
L4 wiki           →  Karpathy 3-layer (JSONL chronological + MEMORY.md index + compiled wiki) [G2.3 formalize gap]
```

### Cross-cutting safety floor

```
Layer 0 worktree isolation        →  `eee --worktree` per CCBP TIER-1
Layer 1 PreToolUse front gates    →  codex T1 + impact-guard + safety_guard + agent_plan_readonly_bash_guard
Layer 2 PreToolUse commit gate    →  codex T2 (sync STRICT FAIL_CLOSED)
Layer 3 PostToolUse audit trail   →  codex T3/T4 + ruff + pyright + shellcheck + healthcheck
Layer 4 Stop session-end gate     →  T7 ask-without-act + T6 deep-review-exec
```

### Skills + plugins (1,556 SKILL.md across 26+ enabled plugins)

```
Anthropic OFFICIAL plugin tier   →  superpowers (14) + skill-creator + claude-md-management + ...
3rd-party named-author tier       →  agent-skills (Osmani 21) + everything-claude-code (60+)
Cross-vendor tier (codex)         →  codex-plugin-cc (T1-T7 backbone)
4 meta-skills auto-firing         →  using-superpowers / using-agent-skills / skill-comply / skill-creator
```

### Research / discovery (per `research-protocol.md` + SRA)

```
Tier-1b sota-researcher subagent
  ├─ Probe DAG (P1 LICENSE → P2 registry → P3 plugin-namespace → P4 GraphQL → P5 README → P6 deep audit)
  ├─ 9-cohort fan-out (CLAUDE.md L99-110: C1 GraphQL stars+topic / C2 arxiv / C3 HuggingFace / C4 PapersWithCode / C5 named-author / C6 awesome-lists / C7 conf proceedings / C8 trending / C9 stars-direct)
  ├─ T0 candidate-list challenge (cost-gated; foreground+tee codex review)
  └─ SRA 10-dimension convergence gate (D1-D10 per `sota-research-architecture.md`)
```

---

## Per-dimension target state (post-replacements)

### D1 Topology (no replacements; configuration shifts only)

- ✅ Anthropic CC + codex-plugin-cc + superpowers (locked)
- ✅ subagent fan-out + worktree isolation (native)
- ✅ cwc-long-running-agents 5 primitives (INSTALLED)
- ➕ G1.1 superpowers `subagent-driven-development` per-task dispatch operationalized
- ❌ DAG dispatcher (DEFER — devfleet MCP backend not wired)
- ❌ Single-level fork mechanical enforcement (DEFER — policy-only)

### D2 Memory (3 SHIPS)

- ✅ L1 mcp-memory-service v10.51.3
- ➕ **G2.1 SHIP A**: install `qdrant/mcp-server-qdrant` to expose existing Qdrant container as MCP
- ➕ **G2.2 SHIP B**: configure LiteLLM proxy with Anthropic-only routing for Graphiti embeddings (Path B alt-provider) OR procure OPENAI_API_KEY (Path A)
- ➕ **G2.3 SHIP C**: formalize Karpathy 3-layer wiki labeling on existing surfaces
- ❌ semantic-router / cognee / dbhub (DEFER pending evidence)

### D3 Cross-model (configuration shifts + gates)

- ✅ T1-T7 lifecycle (INSTALLED-AMBER)
- ➕ **G3.1 SHIP D**: promote codex T1-T7 to STRICT mode (CR-7 Phase 2 trigger)
- ➕ **G3.4 SHIP E** (operator-discipline): document Path D `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` activation predicate for fan-out Waves
- ❌ Verdict-aggregation hook / T1 timeout mechanical fallback / T5 status (DEFER)

### D4 Plugin ecosystem (1 INSTALL + 1 OPERATIONAL FIX)

- ✅ 26 plugins enabled
- ➕ **G4.1 SHIP F**: install `mattpocock/skills` (62k★ MIT named-T2)
- ✅ **G4.2 W134-F2 fix**: hookify `__file__` fallback patched (8 files; cache + marketplace) — VERIFIED no spam
- ❌ ECC RC monitoring / skill-registry portability eval (DEFER)

### D5 Hooks / gates (1 SHIP + verifications)

- ✅ 45 total hooks across 8 events
- ➕ **G5.3 SHIP G**: write `tests/test_safety_guard_security.py` + `tests/test_agent_plan_readonly_bash_guard_security.py` (closes layered-gates §9 HARD GATE)
- ❌ fm17d_stall_detector fix (DEFER pending CC SubagentStop schema doc)

### D6 Eval / benchmark / observability (1 SHIP)

- ✅ promptfoo + deepeval + openlit + Phoenix
- ➕ **G6.1 SHIP H**: install `evals/codex_miss_cases.jsonl` + `run_codex_miss_eval.py` (Phase 1 deterministic DSL adapted from cross-model-consensus.md §"Eval-case mandate")
- ❌ Phoenix wire-up ETL / Langfuse / benchmark CI (DEFER)

### D7 Token efficiency (1 SHIP)

- ✅ context-mode + repomix + ccusage + 12+ env vars
- ➕ **G7.1 SHIP I**: ship `rtk init -g` (completes Wave 118 Ship A2 — VERY HIGH leverage per `iter3a-install-plan.md §B1`)
- ❌ semantic-router / deepagents arg truncation / cache prefix audit (DEFER)

### D8 Research / discovery (operationalization, no installs)

- ✅ sota-researcher + Probe DAG + 9-cohort + SRA + 6-catalog crawl
- ➕ **G8.3 SHIP J**: this audit arc IS the dogfood — promote `docs/sota-architecture-audit/` to standing pattern
- ❌ SRA aggregator / kit-extract pipeline (DEFER)

### Cross-dimensional (1 directive)

- ➕ **GX.5 SHIP K**: codify quarterly SOTA-architecture re-audit cadence in `audit-action-loop.md` (or new local rule)

---

## Executable install plan — 11 ships (each ARTIFACT-INLINE per W134-F2-style)

### Tier 0 — Already-shipped or operational

| Ship | Status | Ref |
|---|---|---|
| W134-F2 hookify `__file__` fallback (8 files) | ✅ DONE this fire | hookify spam eliminated |

### Tier 1 — Memory stack closure (3 ships, parallel-safe)

| Ship | Cite | SRA verdict | Command (planned) | Risk |
|---|---|---|---|---|
| **A**: L2 MCP wiring | qdrant/mcp-server-qdrant @ TIER-1 OFFICIAL | INSTALL (10/10) | edit `.mcp.json` + add server entry pointing at running container | LOW — no new install; wiring only |
| **B**: L3 unblock via LiteLLM Path B | LiteLLM proxy with Anthropic-only routing | INSTALL (9/10) | configure LiteLLM proxy + set Graphiti env | MEDIUM — embeddings model selection per-test |
| **C**: L4 Karpathy 3-layer formalization | `karpathy-adapted.md §5` | INSTALL (10/10 docs-only) | edit existing rule + add §"Layer 1/2/3 mapping" | NONE — taxonomic relabel |

### Tier 2 — Cross-model + safety (2 ships)

| Ship | Cite | SRA verdict | Command | Risk |
|---|---|---|---|---|
| **D**: codex T1-T7 STRICT promotion | `cross-model-consensus.md §"On codex unavailable"` | INSTALL (8/10) — CR-7 Phase 2 trigger gate | flip env vars `CODEX_T*_GATE_STRICT=1` per gate | MEDIUM — gates may surface NEEDS-REVISION on existing edits |
| **E**: Path D opt-in directive | `CLAUDE.local.md ENV (h)` | INSTALL (10/10 directive-only) | document fan-out Wave activation predicate in CLAUDE.local.md | NONE |

### Tier 3 — Plugin + hooks (2 ships)

| Ship | Cite | SRA verdict | Command | Risk |
|---|---|---|---|---|
| **F**: mattpocock/skills install | `mattpocock/skills @ HEAD <pin-on-install>` | INSTALL (10/10 — 62k★ named-T2 MIT) | `/plugin marketplace add mattpocock/skills` then `/plugin install` | LOW — named-T2 MIT |
| **G**: deny-hook security regression tests | `layered-gates-architecture.md §9` HARD GATE | INSTALL (10/10) | write `tests/test_<hook>_security.py` covering default-DENY, default-ALLOW, edge cases | NONE |

### Tier 4 — Eval + token-eff (2 ships)

| Ship | Cite | SRA verdict | Command | Risk |
|---|---|---|---|---|
| **H**: codex-miss eval corpus Phase 1 | `cross-model-consensus.md §"Eval-case mandate"` | INSTALL (9/10) | write `evals/codex_miss_cases.jsonl` + Phase 1 deterministic DSL runner | LOW |
| **I**: RTK init | `iter3a-install-plan.md §B1` | INSTALL (10/10 — VERY HIGH leverage) | `rtk init -g` then verify wiring per Wave 118 Ship A2 | LOW — binary already on disk |

### Tier 5 — Discipline + cadence (2 ships)

| Ship | Cite | SRA verdict | Command | Risk |
|---|---|---|---|---|
| **J**: SOTA-architecture-audit standing pattern | this audit arc | INSTALL (10/10 — meta) | promote `docs/sota-architecture-audit/` to standing-pattern in `audit-action-loop.md` | NONE |
| **K**: Quarterly re-audit cadence | per `karpathy-adapted.md §5` Wiki Compounding Surface | INSTALL (10/10 — directive) | codify quarterly cadence in `CLAUDE.md` OR new rule | NONE |

### Tier 6 — Operator decision points (deferred to operator)

| Ship | Cite | Decision | Trigger |
|---|---|---|---|
| **GX.1**: revert `bypassPermissions` → `auto` | CCBP `claude-settings.md:251 @ 64fffd53` | OPERATOR | when Anthropic classifier endpoint stable for ≥7 days |
| **GX.2**: CR-7 Phase 2 destination flip | per CR-7 testable predicate (c) | AUTOMATIC | when Tier 1a smoke-probe PASS verified |
| **GX.3**: sibling cite-import-AMBER formalization | per Section 14.5 + CR-12 | OPERATOR | per-rule basis when n=3+ usage observed |

---

## Phase progression

### Phase 1 (NOW — bootstrap-mature)
- Ships A-K landed
- Permission mode: `bypassPermissions` (W82d operator override)
- All ships cross-model-verified via codex T1 e2e
- CR-7 Phase 2 trigger predicate testable (Tier 1a smoke-probe PASS)

### Phase 2 (post Tier-2 SHIP D)
- codex T1-T7 STRICT mode active
- Permission mode: revert to `auto` (GX.1 trigger met)
- CR-7 Phase 2 destination achieved

### Phase 3 (mature — long-running validation)
- Permission mode: `bypassPermissions` per CR-7 Phase 3 destination AFTER all 4 predicates met
- Quarterly SOTA-architecture re-audit per Ship K
- 7+ consecutive build-fires no NEEDS-REVISION conf>0.85 (per CR-7 (b))
- All Tier 5 rows INSTALLED + smoke-PASS

---

## Cross-model T1 verification batch plan

Per CR-3 + SRA §Cross-model T1 verification mandate, one consolidated codex T1 dispatch covering all 11 ships (A-K). Strategy:

```bash
# Compose consult prompt covering all 11 ships in one ARTIFACT
# at .claude/state/codex_consult_w134_f2_sota_target_architecture.txt

# Foreground+tee (path-of-least-resistance per CR-3 Phase 1 bootstrap exception)
codex exec --ephemeral -p deep-review-exec \
  < .claude/state/codex_consult_w134_f2_sota_target_architecture.txt \
  > .claude/state/codex_consult_w134_f2_sota_target_architecture_OUT.txt 2>&1 &

# Expected duration: 10-15 min (11 ships × ~1 min review each)
# Verdict expected: NEEDS-REVISION conf 0.85-0.92 with 3-8 prescribed_edits → Pattern A apply
# Cross-model gate satisfaction: FULL (real GPT-5.5 verdict origin)
```

If codex T1 returns BLOCK on any ship → REVERT-AND-REMOVE per `closed-loop-recursive-narrowing.md §Disposition signal severity-gate`. Owner-Override path requires explicit `[OVERRIDE]` marker per `cross-model-consensus.md §Verdict report shape`.

---

## What's STILL not covered (research roadmap → 05-research-roadmap.md)

This audit landed 11 SHIPS + 19 DEFERs + 2 REJECT-FOR-FIT verdicts. UNCOVERED axes (where SRA D1-D10 evidence is incomplete):

- **DAG mission orchestration**: claude-devfleet (ECC) reference-only; no eee-fit replacement identified
- **Multi-vendor agent runtime competition**: deepagents (LangChain) / goose (Linux Foundation AAIF) / superpowers — current keeps superpowers but doesn't formally compare
- **ACP (Agent Client Protocol) integration**: convergence at 4-org Axis-1 firm PASS per `team-orchestration.md §"Cross-fire ACP convergence finding"`; ADOPT-NOW Wave 6 sub-arc decision pending; not in this 11-ship plan
- **Skills registry deep portability**: 1,556 SKILL.md vs 540 alirezarezvani vs 5,200+ OpenClaw — no per-skill quality eval done
- **Llamafile / vLLM / Ollama local-model SOTA**: cite-only in current architecture
- **GitOps-driven plugin install**: declarative plugin set as `manifests/plugins.yaml`; no install-class equivalent

These 6 uncovered axes are **research-roadmap candidates** for subsequent fires beyond Wave 134 Fire 2.

---

## Architecture diagram (ASCII forward-ref)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       eee runtime (claude-sota-installed)                │
│                                                                          │
│  ┌──────────────────────────────┐    ┌─────────────────────────────┐   │
│  │ Operator (Z-drive Windows)   │    │ Sibling claude-sota         │   │
│  │ tools/eee.ps1 launcher       │←───│ (cite-import-AMBER source)  │   │
│  └─────────────┬────────────────┘    └─────────────────────────────┘   │
│                │ env-block + worktree                                   │
│  ┌─────────────▼────────────────────────────────────────────────────┐  │
│  │ Anthropic CC binary v2.1.x (TIER-1 OFFICIAL)                      │  │
│  │ ┌──────────────────────┬──────────────────────┬────────────────┐  │  │
│  │ │ Plan mode (Opus 4.7) │ Implement (Opus 4.7) │ Cross-model T1 │  │  │
│  │ │ + brainstorming      │ + Agent fan-out      │ ← codex GPT-5.5│  │  │
│  │ │ + writing-plans      │ + isolation:worktree │ (foreground+tee│  │  │
│  │ │ + RPI workflow       │ + cwc primitives     │  OR BRIDGE-MODE│  │  │
│  │ └──────────────────────┴──────────────────────┴────────────────┘  │  │
│  └─┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┘  │
│    │L1 mem    │L2 vector │L3 KG     │Hooks     │Skills    │Eval         │
│    ▼          ▼          ▼          ▼          ▼          ▼              │
│  mcp-memory  Qdrant    Graphiti   45 hooks   1,556+      promptfoo      │
│  (sqlite)    +MCP      +FalkorDB  4 layers   meta-4×     deepeval       │
│                        +LiteLLM                          openlit         │
│                                                          Phoenix         │
│                                                                          │
│  L4 Karpathy 3-layer wiki: JSONL + MEMORY.md + compiled docs              │
│                                                                          │
│  Research: Tier-1b sota-researcher → Probe DAG → 9-cohort → SRA D1-D10  │
│  Cite-trail: TIER-1-DIRECT + TIER-3-LOCAL-COMPOSITION (per CR-1+CR-8)   │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Adoption order (recommended)

Per `parallel-agent-wave.md §CADP rule 5` (max 5 cumulative dispatches per session arc) + CR-9 install-risk discipline (2-round fix-forward expected) + CR-12 upstream-install-priority:

**Fire N+1**: Ships A + C + E (parallel-safe; no codex dispatch; doc-only or wiring-only)
**Fire N+2**: Ships B + F + G (LiteLLM config + plugin install + tests)
**Fire N+3**: Ships D + H + I (STRICT promotion + eval corpus + RTK init)
**Fire N+4**: Ship J + K (standing pattern + cadence directive)
**Fire N+5+ (operator-driven)**: GX.1 (auto revert) + GX.2 (Phase 2 flip) + GX.3 (sibling formalization)

Each fire's commit body MUST include `cross-model-gate-satisfaction-status` field per `cross-model-consensus.md §Verdict report shape`.

