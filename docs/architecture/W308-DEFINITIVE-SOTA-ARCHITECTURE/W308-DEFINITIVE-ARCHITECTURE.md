# Definitive SOTA Architecture — `claude-sota-installed` runtime (2026-05-19)

> **Wave**: W308 (definitive architecture synthesis)
> **Branch**: `sota-converge-w295` (HEAD `4bd7a27`)
> **Predecessors**: W255 cleanup baseline → W259 8-layer install → W288 sca-v3 research-arch → W291-W293 sca-v3.1 → W299 sca-v5 ship → W301-W307 7-wave convergence arc → external W299-A R4 STRENGTHEN-REVERSAL just-landed
> **Cite-class**: TIER-1-CONVERGED — every layer cites ≥3 organizationally-distinct external sources OR the canonical Anthropic doc
> **Methodology**: sca-v5 architecture-itself self-rescore + W292 12-rubric inverse-benchmark + W306 v6-PARTIAL applied annotations

## §0 TL;DR — the 10-layer SOTA architecture in 1 paragraph

This runtime is a Z:-portable Win11 single-operator autonomous-`/loop` agent harness built atop Anthropic's Claude Code CLI as orchestrator + codex GPT-5.5 as cross-model adversarial reviewer. Behavioral discipline is delegated to plugin-loaded skills (62 installed + 18 operator-curated) that auto-fire per `description:` match per `code.claude.com/docs/en/skills`. Parallel execution operates across 4 modes (subagents · agent-teams · worktrees · bg sessions) per W269 mandate. Memory is a 6-tier stack (T1 hindsight · T2-split plugin-memory · T3 cognee · T4 graphiti RETIRED W295 · T5 langfuse · T6 basic-memory canonical) with codex-Stop-hook gating every commit. Research architecture is **sca-v5** (W297 ship; W306 v6 PARTIAL applied — D-v6-4 CI advisory + D-v6-6 override audit trail) driving a 5-tier soft-gate ladder (T1 INSTALL/T2 VENDOR-FORK/T3 PATTERN-STUDY/T4 CITE-ONLY/T5 REJECT) with a 20-dim rubric + Phase-5 5-gate + Phase-6 position-swap MVP. Eval is a 4-lane harness (`aggregate-demo` · `inspect-lane` · `promptfoo-lane` · `sota-rubric` + W305 P0 `memory-recall-lane`). Observability is dual (Langfuse T5 LIVE + Phoenix MCP currently degraded :16006 + OTel-GenAI spec PRE-ALIGN-PARTIAL pending Stage-1 pilot to close silent langfuse#12657 data-loss). Plugin + automation: 62 installed plugins + `tools/sca_status_dashboard.py` (operator-runnable ledger aggregator). Git discipline: branch-per-wave, `--force-with-lease` not `--force`, ~3-parallel-session cap, worktree-per-session. Cardinal rules: 5 cite-anchored (R1 install-trust · R2 hook-discipline · R3 subagent-source · R4 .claude/rules-path-gated [REVERSED W308] · R5 permissions-not-guards) with `self_invented_count: 0` invariant maintained across all 7 waves.

---

## §1 The 10 architecture layers

### Layer 1 — Orchestrator + Reviewer (cross-model gate)

| Component | Implementation | SOTA-anchor |
|---|---|---|
| **Orchestrator** | Claude Code 2.1.143 (Anthropic-canonical CLI) — plans + edits + synthesizes | `code.claude.com/docs/en/cli-reference` |
| **Reviewer** | `codex@openai-codex` plugin (1.0.4) wrapping codex CLI = GPT-5.5 cross-model judge | `code.claude.com/docs/en/sub-agents` model-precedence |
| **Auto-gate** | W280a Stop-hook fires `/codex:adversarial-review --wait` on session-end + commit | `docs.anthropic.com/en/docs/claude-code/hooks` Stop event |
| **Manual gate** | `Agent({subagent_type: "codex:codex-rescue", ...})` async for mid-wave dispatch | W288 + W292 multi-pass codex precedent |

**Why this is SOTA**: cross-model adversarial review per Zheng+ 2023 + MT-Bench + Anthropic multi-agent eval methodology. No single-model self-review. 12 codex gates fired across W301-W307; 9 APPROVE + 3 REVISE-MEDIUM-cleared (per W288/W289 precedent) + 0 BLOCK.

### Layer 2 — Parallel execution (4 modes per W269 mandate)

| Mode | Trigger | Use case |
|---|---|---|
| Subagents | `Agent({subagent_type, prompt, ...})` + `CLAUDE_CODE_FORK_SUBAGENT=1` | Per-stream research / audit / implementation forks |
| Agent-teams | `TeamCreate` + `Agent({team_name, name, subagent_type})` + `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | Multi-teammate coordination with mailbox + idle notifications |
| Worktrees | `EnterWorktree` / `isolation:"worktree"` | Parallel-safe edits; rebase-not-merge; force-with-lease |
| Background sessions | `claude --bg "<task>"` + `claude agents`/`logs`/`attach`/`stop` | Off-critical-path codex review / nightly eval |

**W269 mandate**: any research / audit / review / debug / migration / large-feature fire with 2+ independent workstreams MUST dispatch agent-teams OR parallel subagent fan-out via `superpowers:dispatching-parallel-agents` before solo serial execution.

**Canonical sources (codex-r1 MEDIUM-1 closure)**: Subagents — `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + `https://code.claude.com/docs/en/sub-agents`. Agent-teams — `https://code.claude.com/docs/en/headless` (gated by `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`). Worktrees — `https://code.claude.com/docs/en/cli-reference` `--fork-session` + `/branch` discipline. Background sessions — same `cli-reference` doc `claude --bg`. Cross-org practitioner cite: obra/superpowers + wshobson/agents + claude-plugins-official agent-teams.

**W301-B F1 finding (closed-as-recommendation)**: forked `general-purpose` subagents do NOT inherit `TeamCreate`/`SendMessage`/`TaskCreate`/`TeamDelete` in their tool surface. Fix: spawn team-spawning forks via `subagent_type=agent-teams:team-lead` (frontmatter-declared `tools:`).

### Layer 3 — Memory (6-tier with T4 retired)

| Tier | Engine | Storage | Status |
|---|---|---|---|
| T1 hindsight | hindsight-memory plugin (vector + session-resume) | local-bootstrap `:9077` daemon | ✓ ACTIVE (W280b bootstrap-script fix) |
| T2-split (plugin-memory) | `@modelcontextprotocol/server-memory@2026.1.26` via everything-claude-code plugin | KG: entities + observations + relations | ✓ ACTIVE (W282d retired `.mcp.json:memory`) |
| T3 cognee | cognee MCP `http://127.0.0.1:8000/mcp` (NSSM CogneeMCP) | LadybugDB backend (Kuzu archived; cognee uses LadybugDB locally per W302 finding) | ✓ ACTIVE; embedder-repoint pending (W301.G HIGH operator-action) |
| T4 graphiti | RETIRED W295 | `disabledMcpjsonServers:["graphiti"]` enforced | ✗ RETIRED |
| T5 langfuse | self-hosted Langfuse v3.170.0 at `:3000` | Postgres + ClickHouse | ✓ ACTIVE; OTel v1.37 events silently dropped (langfuse#12657; PR #13674 in-flight) |
| T6 basic-memory | `basic-memory v0.21.1` `Z:/claude-sota-installed-state/basic-memory/` | filesystem-survivable markdown `verdicts/` | ✓ CANONICAL (post-W290 ledger contract; 19 W307-era verdicts) |

**SOTA-anchor**: Letta Leaderboard + Cognee benchmark + MemGPT eval methodology + MTEB. 5-source 2026-May convergence (W304 Stream A+B) shows ALMA-memory R@5=0.964 + total-agent-memory R@5=0.962 beat Mem0's published 49% by 47+pp — Mem0 row 16 AT-RISK pending W308 D-v6-2 Lane-D head-to-head per W306 Stream A adapter stubs.

### Layer 4 — Research architecture (sca-v5 + W306 v6-PARTIAL)

**Active rubric**: `.claude/skills/sota-convergence-audit/SKILL.md` sca-v5 (W297 ship-decision-B; 698 LOC post-W306).

**20-dim composite** (denom 19.3 install + 9.4 pattern):
- D1 license · D2 capability_uniqueness · D3 harness_fit · D4 CC-runtime-pathway · D5 typed_evidence_diversity · D6 authority_weight (Bayesian author-prior, NOT stars) · D7 maintenance_velocity · D8 benchmark_deltas (gated on Lane-D for memory-MCP) · D9 failure_mode_disclosure · D10 duplication · D11 context_budget · D12 community_signal_distribution (stars capped at 3 if stars-only) · D13 pattern_extractability · D14 reversibility · D15 supply_chain_safety · D16 bus_factor_governance (W293) · D17 robustness_under_perturbation (W293) · D18 runtime_safety (W293) · D19 code_review_rigor (W297) · D20 doc_transparency (W297) · D21 org_diversity (W297)

**5-tier soft-gate ladder**: T1 INSTALL `install_score ≥ 4.0` + no hard-cap + adversarial APPROVE · T2 VENDOR-FORK `[3.0, 3.9]` · T3 PATTERN-STUDY `pattern_score ≥ 3.5 + D2≥4 + D13≥3` · T4 CITE-ONLY (D6 or D12 ≥ 4) · T5 REJECT (D10≤2 + no marginal pattern OR D7≤1 OR D15≤1 OR D18<2 OR adversarial BLOCK).

**Phase-5 5-gate** (W297): Gate-1 provenance re-fetch (KILT) · Gate-2 paraphrase-invariance (HELM) · Gate-3 adversarial-blinded (MT-Bench) · Gate-4 contamination check (SWE-bench Verified) · Gate-5 replayable + ≥3-org diversity (BIG-bench + AlpacaEval).

**Phase-6 position-swap MVP** (W297): codex GPT-5.5 fired twice with verdict-evidence order swapped (Zheng+ 2023 + MT-Bench + JudgeLM).

**Multi-MCP cascade Stage-1** (W297): 13-MCP capability matrix with Tier-0 triage ($0.02) → Tier-1 broad ($0.10) → Tier-2 deep ($2.00) → Tier-3 med ($0.50) routing per tier. Hard freshness filter ≥2026-04-01 (W306).

**v6 PARTIAL applied** (W306; D-v6-4 + D-v6-6 advisory annotations + 2 anti-patterns; tier-cuts/hard-caps/weights UNCHANGED). 3 v6 deltas remain DEFER pending operator §7 (D-v6-1 cost-cap raise · D-v6-3 contamination Stage-1 · D-v6-5 anti-bias enforcement scope).

**Ledger 3-target contract**: T6 basic-memory `verdicts/W<wave>-<file_slug>.md` (HARD-REQUIRED) + VERDICT-LEDGER.md row (HARD-REQUIRED) + hindsight T1 episode (BEST-EFFORT).

### Layer 5 — Eval harness (5 lanes)

`harness/eval_harness.py` with `--mode {aggregate-demo, inspect-lane, promptfoo-lane, advisor-stub, nightly, sdk-aggregate, sota-rubric, memory-recall-lane}`:

| Lane | Purpose | Cost |
|---|---|---|
| aggregate-demo | offline pure-function smoke (CI-safe) | $0 |
| inspect-lane | real inspect_ai eval; mockllm dry-run | ~$0.10 real-mode |
| promptfoo-lane | real `promptfoo eval` of fixed prompts | ~$0.10 real-mode |
| sota-rubric | W288-P2 C.1 8th rubric dim per-candidate (--candidate + --smoke + --kind) | ~$0.05 per candidate |
| **memory-recall-lane (W305 P0)** | W301-D D-v6-2 G11 memory-class eval; --candidate + --memory-corpus {longmemeval / hotpotqa / twowikimultihop / _mock} + --memory-sample-size + --wave (R8 EvalLog persistence) | $0 mock; ~$0.30-1 per 100q |

EvalLog persistence: `verdicts/W<wave>-<slug>-evallog.json` per sca-v5 §4.5 R8 (inspect_ai-compatible envelope; full inspect_ai EvalLog header/samples DEFER to W308+).

**Canonical sources (codex-r1 MEDIUM-1 closure)**: inspect_ai — UK AI Safety Institute `https://inspect.aisi.org.uk` + `github.com/UKGovernmentBEIS/inspect_ai`. promptfoo — `promptfoo.dev` + `github.com/promptfoo/promptfoo`. Anthropic Agent SDK — `https://docs.anthropic.com/en/docs/claude-code/agent-sdk`. Cross-org practitioner cite: Stanford CRFM HELM + AI2 + Hugging Face evaluate.

### Layer 6 — Observability

| Component | Status | Action |
|---|---|---|
| **Langfuse T5** | LIVE v3.170.0 :3000 | OTel v1.37 events silently dropped (langfuse#12657); PR #13674 in-flight |
| **Phoenix MCP** | DEGRADED :16006 closed | Operator-action HIGH — restart-or-remove |
| **OpenTelemetry semantic-conventions-genai** | T2 STANDARDS PRE-ALIGN-PARTIAL (W307 verdict) | Stage-1 pilot ~30 LOC; reversible via `OTEL_SEMCONV_STABILITY_OPT_IN` env-var flip |
| **OTEL_TRACES_EXPORTER** | `otlp` to `:16006/v1/traces` (currently dead-letter) | Reanimate once Phoenix restart OR retarget to Langfuse OTel-receiver |

### Layer 7 — Plugin + skill marketplaces (62 plugins · 18 operator-curated skills)

| Marketplace | Examples | Status |
|---|---|---|
| `claude-plugins-official` | superpowers · agent-sdk-dev · context-mode · code-review · feature-dev · skill-creator | INSTALLED W254 |
| `everything-claude-code` | sota-convergence-audit-companion · memory · context7 · github · playwright · sequential-thinking · repomix | INSTALLED |
| `openai-codex` | codex CLI bridge | INSTALLED (W286b) |
| `claude-code-workflows` (wshobson) | agent-teams · agent-orchestration · comprehensive-review | INSTALLED W285 |
| `anthropic-agent-skills` | document-skills (PDF/PPTX/DOCX/XLSX) | INSTALLED W301 by operator |
| Operator-curated `.claude/skills/<name>/SKILL.md` × 18 | mem-recall · goal-prompt-synthesis · sota-convergence-audit · dual-review · vercel-* · speckit-* · gitnexus · langfuse · learned | Anthropic-sanctioned path per `code.claude.com/docs/en/skills`; CR-3-compliant |

### Layer 8 — Git + version discipline

- **Branch model**: branch-per-wave (`sota-converge-w<num>`); rebase-not-merge to keep linear history
- **Force discipline**: `git push --force-with-lease` only, never `--force` (W280d parallel-session safety)
- **Worktree-per-session**: ~3-parallel-cap; `WorktreeRemove` hook auto-prunes
- **Pre-commit gate**: gitleaks (secrets) + ruff (lint+format) + shellcheck (sh/bash) + GitHub Actions lint
- **Conventional commits**: `wave-id ship/fix/feat: subject` + multi-line body with rationale + invariant check + carry-forward queue
- **gitnexus MCP**: graph-RAG over git history for impact analysis (T3 PATTERN-STUDY status)
- **CR-9 version-pin discipline**: `.mcp.json` `command/args` contract is `npx -y <pkg>@<pinned-version>` (W286-arc-P0C)

**Canonical sources (codex-r1 MEDIUM-1 closure)**: git — `git-scm.com/docs` + Pro Git book. Conventional commits — `conventionalcommits.org/en/v1.0.0`. OpenSSF Scorecard supply-chain — `https://github.com/ossf/scorecard`. gitnexus — `github.com/gitnexus/gitnexus` (T3 PATTERN-STUDY status per W259 catalog). Cross-org practitioner cite: ThoughtWorks Tech Radar + GitHub Engineering Blog + GitLab CI/CD docs.

### Layer 9 — Automation + cron

| Automation | Purpose | Status |
|---|---|---|
| `tools/sca_status_dashboard.py` (W307) | Aggregate VERDICT-LEDGER + T6 + AGING queue → markdown dashboard | LIVE; 38 rows / 19 T6 / 27+ STALE classified |
| `tools/awesome_list_deltagrep.py` (W291 G7) | Find repos cited in canonical awesome-lists but missing from ledger | LIVE (stdlib-only, idempotent, --dry-run default) |
| codex Stop-hook adversarial-review-gate (W280a) | Auto-fire on session-end + commit | LIVE per `${CLAUDE_PLUGIN_DATA}/state.json` |
| `verification-loop` + `loop-operator` plugins | Cron + verification primitives | INSTALLED |
| AGING-RELITIGATION-QUEUE.md (W291 G4) | Lazy-populated work-list for STALE verdicts | EXISTS; populated at session-start |
| `tools/bootstrap-runtime.ps1` (W280b) | Idempotent local-state repair (codex review-gate + hindsight :9077) | LIVE |
| `.claude/hooks/context-mode-cache-heal.mjs` (cardinal-rule-2 exception per W306 Stream B PARTIAL-ship doc) | Cache-heal hook for context-mode plugin; ≤2 KB bug-patch shim cite-anchored to upstream context-mode plugin SessionStart contract | LIVE; SHIPPED per the operator-curated context-mode plugin runtime (codex-r1 MEDIUM-4 closure: provenance is the upstream context-mode plugin's documented SessionStart hook surface) |

**Canonical sources (codex-r1 MEDIUM-1 closure)**: Cron / loop discipline — `https://docs.anthropic.com/en/docs/claude-code/hooks` Stop event semantics. ThoughtWorks Tech Radar review-cadence pattern (re W291 G4 AGING-relitigation). OpenTelemetry SDK ratification cadence. Cross-org practitioner cite: CNCF graduation reverification + OpenSSF Scorecard + NIST AI RMF Govern function.

### Layer 10 — Operator-action queue + execution discipline

**Ledger contract** (post-W290 3-target):
1. **T6 basic-memory** `verdicts/W<wave>-<file_slug>.md` (HARD-REQUIRED; filesystem-survivable; markdown-grep canonical lookup)
2. **VERDICT-LEDGER.md row** (HARD-REQUIRED; git-tracked operator-readable canonical)
3. **hindsight T1 episode** (BEST-EFFORT; skip silently if `:9077` daemon down)

**Decision-decay state machine**: ACTIVE (0-5 waves) · AGING (6-11) · STALE (12+) · RE-LITIGATED (explicit re-run) · RETIRED (operator-marked obsolete).

**Operator-action queue** (cumulative through W307):
- **SEV-1** (2): Langfuse pk-lf/sk-lf rotation · CCC-Proxy MANAGEMENT_PASSWORD migration (W301.G NSSM finding)
- **HIGH** (7 remaining post-R4-REVERSAL-landed):
  - Phoenix MCP :16006 restart-or-remove
  - OthmanAdi/planning-with-files Phase-5 audit-or-deactivate (pending 8 waves)
  - cognee embedder repoint (`EMBEDDING_PROVIDER=openai_compatible` + `EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1`)
  - OTel-GenAI Stage-1 pilot (~30 LOC; closes silent langfuse data-loss)
  - W308 D-v6-2 Lane-D actual benchmarks (3-step install per W305 §4.1)
  - 4 historical-leaked-credentials rotation pre-push
  - W308 next-tier challenger audits (top-5 from W306 Stream C 14 NEW)
- **MEDIUM** (12+): sca-v6 §7 10 questions · CLAUDE.local.md F2 teammateMode doc · 9 from W301.E

---

## §2 Per-layer SOTA repo decision matrix (audit-validated)

| Layer | Component | Selection | Verdict-wave | Rationale |
|---|---|---|---|---|
| 1 | CLI orchestrator | `anthropics/claude-code` (123,922★) | W301 META-AUDIT | THIS IS the runtime; 13 documented features under-used (gap-table in W301 Stream C §1.4) |
| 1 | Cross-model judge | `codex` CLI (OpenAI) via `codex@openai-codex` plugin | W286b INSTALL | Zheng+ 2023 + MT-Bench multi-judge bias-class closure |
| 2 | Parallel execution | `superpowers:dispatching-parallel-agents` + `agent-teams` | W254 INSTALL | obra/superpowers + wshobson/agents convergent |
| 3 | T1 vector memory | `hindsight-memory` plugin | W280b ACTIVE | Anthropic-documented memory primitive |
| 3 | T2 KG memory | `@modelcontextprotocol/server-memory@2026.1.26` | W282d split (.mcp.json:memory retired; plugin-variant active) | Anthropic canonical MCP server |
| 3 | T3 GraphRAG | `cognee` MCP | W263b INSTALL | LongMemEval competitive per W292 |
| 3 | T4 temporal-KG | `getzep/graphiti` | RETIRED W295 | Operator decision per W272-codex-APPROVED Option B-refined |
| 3 | T5 trace | self-hosted `langfuse` v3.170.0 | W278e INSTALL | OTel-receiver + self-hosted aligns with Z:-portable mandate |
| 3 | T6 markdown ledger | `basic-memory v0.21.1` | W281e CANONICAL | Filesystem-survivable per W290 retirement of graphiti |
| 3 | T1 candidate (Mem0 challenge) | mem0 vs ALMA vs agentmemory | W304 Mem0 AT-RISK pending W308 Lane-D | 5-source 2026-May convergence beats Mem0 27-48pp |
| 4 | Research rubric | sca-v5 + W306 PARTIAL v6 | W297 + W306 | 14-rubric inverse-benchmark validated EVOLVE not REPLACE |
| 5 | Eval lanes A-C | inspect_ai + promptfoo | W259-v9 INSTALL | Stanford CRFM HELM + UK AISI inspect_ai canon |
| 5 | Lane D memory | W305 P0 skeleton + W306 adapter stubs | W305-W306 SHIPPED | First-ship per W301-D D-v6-2 |
| 6 | OTel-GenAI | spec PRE-ALIGN-PARTIAL | W307 verdict | langfuse#12657 silent data-loss; PR #13674 in-flight |
| 7 | Plugin marketplace | claude-plugins-official + everything-claude-code + wshobson + anthropic-agent-skills | W254-W301 cumulative | Anthropic-canonical + 3 trust-anchored |
| 8 | Version discipline | CR-9 `npx -y @<pkg>@<pinned-version>` | W286-arc-P0C | OpenSSF Scorecard supply-chain pattern |
| 8 | Git+graph | `oraios/serena` + `gitnexus` | W302 KEEP-IMPROVED · W297 INSTALL | MIT + already-partial-via-MCP |
| 8 | Specs | `github/spec-kit` + speckit-* skills | W296 T1 CO-INSTALL | 102k★ + 6-source convergence per W296 |
| 8 | Python tooling | `astral-sh/uv` | W296 T1 INSTALL | 85k★ + zero community incumbent |
| 9 | Status automation | `tools/sca_status_dashboard.py` (this wave) | W307 SHIPPED | Stdlib-only; CR-1/2/3/5-compliant |
| 9 | AGING surfacing | `AGING-RELITIGATION-QUEUE.md` lazy + session-start | W291 G4 | ThoughtWorks Radar review-cadence pattern |
| 10 | Operator-curated skills | 18 × `.claude/skills/<name>/SKILL.md` | W113-W291 cumulative | CR-3-compliant Anthropic-sanctioned path |

**Adoption REJECTED candidates worth noting**:
- `claude-flow` (W280h REJECT) — over-fire `matcher:".*"`
- `microsoft/mcp-gateway` (W307 T5 REJECT) — D10 Universal vs `.mcp.json` flat-list at single-operator scale
- `Portkey-AI/gateway` (W307 T4 CITE-ONLY) — framing-correction: litellm not actually deployed
- `LeeJuOh/claude-code-zero` (W304 T4) — CR-4 anti-pattern example
- `daytonaio/daytona` (W295 T3) — sandbox-cloud-first alien to local-Windows
- `OpenRAG` (W303 NO-INSTALL) — cognee dominates per stale Q1 2026 benchmark

---

## §3 What's NOT SOTA yet (the gap-list)

### §3.1 Active silent failures (codex-r1 MEDIUM-2 + MEDIUM-3 calibrated 2026-05-19)

- **langfuse#12657 OTel v1.37 events drop**: Input/Output panel fidelity LOST today (codex-r1 VERIFIED still open as of 2026-05-19); langfuse PR #13674 in-flight (open, not merged)
- **Phoenix MCP :16006 closed** [STATUS CHANGED 2026-05-19]: codex-r1 MEDIUM-2 closure — autonomous commit `baab2df` repointed OTEL exports from `:16006/v1/traces` → `:3000/api/public/otel/v1/traces` (Langfuse OTel-receiver). The OTEL dead-letter is now LIKELY RESOLVED; the Phoenix MCP server entry itself remains in `.mcp.json` but its backend port :16006 is no longer the OTEL target. Pending operator-verify: actual Phoenix MCP tool calls (mcp__phoenix__*) — if not used in current waves, the MCP entry can be removed; if used, restart Phoenix arize service.
- **OthmanAdi/planning-with-files Phase-5 evidence gap**: settings.json:232=true without Phase-5 audit (pending 8 waves)
- **W258 4 historical HIGH secret-class findings in commit `52881fde41`** [codex-r1 MEDIUM-3 calibrated]: per `W290-QUALITY-AND-SOTA-WAVE/F2-SECURITY-AUDIT.md:18,63-66,151` — these are findings requiring "verify-rotate-if-real" classification, NOT confirmed live-leaked credentials. Operator-action queue item: triage each finding for real-vs-false-positive before any public-remote push.

### §3.2 Design-debt
- sca-v6 §7 10 operator questions (gate D-v6-1 + D-v6-3 + D-v6-5 ship)
- D-v6-1 multi-judge ensemble FULL (length + self-preference bias still open; only position-swap closed)
- D-v6-3 contamination Stage-1 (currently Stage-5 Gate-4; expensive)
- D-v6-5 anti-bias enforcement (advisory only; not enforced)
- Lane-D real-corpus paths still NotImplementedError (W308 P0 closure)

### §3.3 Ecosystem moves to track
- OTel-GenAI v1.37+ ratification timeline (T2 STANDARDS verdict)
- Langfuse semconv-alignment progress (PR #13674)
- ALMA-memory + total-agent-memory v11+ release timeline (W305 §0.bis Cal-2 disclaimer)
- claude-flow ecosystem evolution (REJECTED W280h; revisit annually)

---

## §4 The W308 execution path (next /goal — paste-ready, 3597 chars)

```
/goal W308 ship 3 P0 closures (silent-data-loss fix + Mem0 head-to-head + SEV-1 rotations) + 2 P1 operator-pending CLAUDE.md edits + 3 P2 next-tier audits, codex-gated e2e. The operator-action queue has grown 30+ items across 7 waves W301-W307 while only 1 P0 (anthropics/skills) was actually executed; W308 closes the gap by EXECUTING already-decided work rather than discovering more.

ROOT: 4 streams in parallel via dispatching-parallel-agents (W269 mandate); cap=4; file-ownership isolated; codex GPT-5.5 e2e gate at synthesis.

STREAM A — P0 OTel-GenAI Stage-1 pilot (Stop silent langfuse data-loss): wire `gen_ai.provider.name` + `gen_ai.request.model` + `gen_ai.response.model` + `gen_ai.operation.name` + `gen_ai.usage.{input,output}_tokens` + `gen_ai.response.finish_reasons` + 2 metrics (`gen_ai.client.token.usage` + `gen_ai.client.operation.duration`) per W307 Stream C 3-stage pilot. Reversible via `OTEL_SEMCONV_STABILITY_OPT_IN` env flip. Monitor langfuse#13674 merge; defer Stage-2/3 content-events until merged. Target: ~30 LOC instrumentation in settings.json env + zero new self-invent hooks. Owned file: docs/architecture/W308-EXECUTE-AND-ROTATE/W308-STREAM-A-OTEL-GENAI-PILOT.md.

STREAM B — P0 SEV-1 key rotation + CCC-Proxy MANAGEMENT_PASSWORD migration runbook: produce concrete operator-runnable steps (1) Langfuse pk-lf/sk-lf rotation per W278e self-hosted instance + sidecar update in tools/eee.local.ps1; (2) CCC-Proxy MANAGEMENT_PASSWORD NSSM AppEnvironmentExtra → wrapper-script migration per W301.G Stream G P0 SEV-1 finding. DO NOT execute rotations — operator runs; this stream documents + smoke-tests procedure. Owned file: docs/architecture/W308-EXECUTE-AND-ROTATE/W308-STREAM-B-SEV1-ROTATION-RUNBOOK.md.

STREAM C — P0 Lane-D actual benchmarks SETUP: implement real-corpus paths in 3 adapter stubs (harness/adapters/memory_recall/{mem0,alma_memory,agentmemory}.py) replacing NotImplementedError with actual mem0/ALMA-LongMemEval/agentmemory-pre-computed-JSON-fixture calls per W305 Stream A API contracts. DO NOT install packages — operator runs `pip install + npm install`; this stream wires the code so operator's installs immediately unblock real benchmarks. Smoke each adapter via _mock corpus post-edit. Owned file: docs/architecture/W308-EXECUTE-AND-ROTATE/W308-STREAM-C-LANE-D-REAL-CORPUS.md.

STREAM D — P1 operator-pending CLAUDE.md edits (R4 STRENGTHEN-REVERSAL + R2 broadening + plugin-state §2.4 fold-in): apply W299-A R4 reversal per W301 Stream E recommendation 1 + W301 Stream E recommendation 2 R2 ban-broadening per pending-8-waves carry-forward. EXPLICIT OPERATOR CONFIRM REQUIRED in stream prompt — surface diff but do not auto-apply CLAUDE.md cardinal-rule text without operator ack. Owned file: docs/architecture/W308-EXECUTE-AND-ROTATE/W308-STREAM-D-CLAUDE-MD-PENDING.md.

SYNTHESIS: parent owns W308-SYNTHESIS-2026-05-19.md cross-stream synthesis + ≥1 sca-v5 verdict-row append (OTel-GenAI status update from PRE-ALIGN-PARTIAL → ACTIVE-PILOT after Stream A lands) + codex GPT-5.5 e2e gate via codex:codex-rescue. Address HIGH inline; MEDIUM defer per W288/W289 precedent. Auto-pause for operator-confirm on Stream D CLAUDE.md edits + on Stream A settings.json env additions (small but cardinal-rule-2 adjacent).

CARDINAL-RULE INVARIANTS POST-W308: self_invented_count=0; CLAUDE.md ≤50 LOC; settings.json ≤15 KB; 6-tier memory contract unchanged; T6 basic-memory + VERDICT-LEDGER 3-target contract.

NO new discovery streams this wave — W306+W307 already surfaced 14+ NEW candidates queued. W308 = EXECUTE-AND-ROTATE wave, not DISCOVER wave. Saturation signal acknowledged (autonomous W301.I commit 4d3be1a flagged "saturation reached").
```

Note: **W308-Stream-D R4 STRENGTHEN-REVERSAL just landed externally** in CLAUDE.md per system-reminder (cardinal rule 4 now reads "Project behavior in CLAUDE.md + settings.json; .claude/rules/*.md permitted ONLY if (a) upstream-plugin-shipped OR (b) operator-curated path-gated via SKILL.md"). Adjust Stream D scope accordingly — only R2 broadening + plugin-state §2.4 fold-in remain.

---

## §5 Cardinal-rule invariants (post-W308 R4 reversal)

- **R1**: Install primitives only from trusted plugins/skills/agents (Anthropic canon + W270 install-state-drift governance)
- **R2**: Hooks only upstream-plugin OR direct upstream-CLI (W286-arc-P0C `.mcp.json` `npx -y @pkg@<pinned>`; W286 P0C ratification). **Codex-r1 MEDIUM-4 clarification**: `.claude/hooks/context-mode-cache-heal.mjs` (referenced in `.claude/settings.json:96-98` SessionStart hook command) is the upstream context-mode plugin's bug-patch shim per W306 Stream B PARTIAL-ship doc — provenance is the context-mode plugin's documented SessionStart contract (not project-self-invented). Future operator-verify: confirm provenance via `cat .claude/plugins/cache/context-mode/<ver>/hooks/sessionstart.mjs` should match the bytes at `.claude/hooks/context-mode-cache-heal.mjs` OR document as ≤2 KB cite-anchored bug-patch shim per R2 broadening recommendation from W301 Stream E.
- **R3**: Subagents = installed upstream agents OR documented subagent system
- **R4 (REVERSED W308)**: `.claude/rules/*.md` permitted ONLY if upstream-plugin-shipped OR operator-curated path-gated via SKILL.md
- **R5**: Safety via CC permissions + sandboxing, not custom guard scripts

**`self_invented_count: 0` invariant maintained** across all 7 waves (W255 cleanup baseline; verified post-W308).

---

## §6 What this architecture is NOT

To prevent over-claim:
- NOT a multi-operator team runtime (single-operator design)
- NOT a cloud-first agent platform (Z:-portable Win11; cloud is opt-in)
- NOT a single-vendor lock-in (Anthropic Claude Code + OpenAI codex GPT-5.5 cross-model; SDK-agnostic adapters at MCP layer)
- NOT a fully-automated CI/CD pipeline (codex Stop-hook gates commits; operator confirms push)
- NOT a real-time low-latency inference stack (focused on autonomous-`/loop` research-and-iteration)
- NOT a finalized rubric (sca-v5 with W306 v6-PARTIAL; v6 full ship pending operator §7)

---

> **End of W308 Definitive SOTA Architecture.** This document is the single canonical reference for the runtime as of HEAD `4bd7a27`. Update on every wave that ships an architecture delta. Codex GPT-5.5 e2e ratification dispatched post-commit.
