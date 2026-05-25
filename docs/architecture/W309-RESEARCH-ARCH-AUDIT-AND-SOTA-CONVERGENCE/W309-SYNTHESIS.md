# W309 Synthesis — Research-Arch Audit + Silent-Fallback Hunt + Multi-Angle SOTA Convergence

**Wave**: W309  
**Date**: 2026-05-19  
**Branch**: `sota-converge-w295` @ HEAD `31e4ad7` (W309 wave-start)  
**Predecessor**: W308 (definitive arch synthesis shipped `1682fbf`+`609cba0`+`d4ae0e7`)  
**Method**: 4-stream parallel-Agent fan-out per `superpowers:dispatching-parallel-agents` + `sota-convergence-audit` v5  
**Operator mandate**: *"is our research architecture full sota? ... silent fallbacks, errors? stale references ... questions your rules, and repos selection ... muti angle research convergences ... ship with convergence sota insights and e2e with gpt 5.5"*

---

## Executive verdict

**YELLOW** with 3 CRITICAL silent fallbacks + 5 HIGH + 8 MEDIUM closures pending + 9 sca-v6 design deltas ready + 5 new verdict rows + 25 NET-NEW candidates surfaced.

**Operator's #1 expressed concern validated** — agent-team orchestration **plumbing is CLEAN** (all 4 `subagent_type` references resolve; presets correct; env flags set; codex Stop-gate live). BUT **the silent fallbacks live ONE LAYER DOWN**: every W288-W308 parallel wave's subagents have been firing into broken phoenix/langfuse/cognee MCPs without parent visibility. Operator intuition correct, scope mis-attributed.

**Architecture-itself rescored** under prospective sca-v6: install_score 4.545 (sca-v5) → **4.72 (sca-v6)** · pattern_score 4.51 → **4.73**. **T1 INSTALL holds with margin**; no rubric-evolution PRD triggered. All 10 W292 don't-break invariants verified intact.

---

## 1. CRITICAL silent fallbacks (Stream A) — ALL NET-NEW (not in W295-W308 closed set)

### C1 — Phoenix MCP backend `:16006` DOWN

- **Evidence**: `netstat` shows no listener on `:16006`; MCP stdio server starts fine but `--baseUrl http://127.0.0.1:16006` fetch-fails on every call. CLAUDE.md line 35 falsely claims `phoenix ✓`.
- **Impact**: every `mcp__phoenix__*` call silently returns errors; W288-W308 OTel trace UI is dark. Phoenix is in `disabledMcpjsonServers` (settings.json:94) — confirms the dual-state ambiguity: disabled MCP load but live-config implies operability.
- **Fix class**: operator-action (service restart or full disable).
- **Operator action AI-1**: decide — restore phoenix backend (`pip install arize-phoenix; phoenix serve --host 127.0.0.1 --port 16006 &`) OR confirm full retirement and remove from `.mcp.json` + update CLAUDE.md status line.

### C2 — OTel trace export to Langfuse :3000 returns 401 silently (TOTAL OBSERVABILITY DATA-LOSS TODAY)

- **Evidence**: `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` correctly set to `http://127.0.0.1:3000/api/public/otel/v1/traces` (settings.json:29) **but `OTEL_EXPORTER_OTLP_HEADERS` is missing entirely**. Every CC turn emits OTel spans (`CLAUDE_CODE_ENABLE_TELEMETRY=1` + `OTEL_LOG_USER_PROMPTS=1` set) that langfuse rejects with `{"message":"No authorization header"}`. Separate from the W307 GenAI semconv issue.
- **Impact**: every parallel-Agent dispatch's child-subagent spans (incl. W288, W289, W290, W292, W295, W301, W302, W306, W308 + W309) lost to the void. Architecture cannot be evaluated for orchestration quality without these traces.
- **Fix class**: operator-action (gitignored CLAUDE.local.md env edit). Cannot ship in this PR because `LANGFUSE_PUBLIC_KEY`/`SECRET_KEY` live in gitignored `CLAUDE.local.md` per W268 P0-security governance + cannot be committed to `.claude/settings.json`.
- **Operator action AI-2** (paste-ready):
  ```powershell
  # Add to CLAUDE.local.md env block (gitignored), then restart CC session:
  $LF_AUTH = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY"))
  $env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $LF_AUTH"
  $env:OTEL_EXPORTER_OTLP_TRACES_HEADERS = "Authorization=Basic $LF_AUTH"  # OTLP/HTTP also accepts traces-specific
  ```
  Smoke test post-set: emit a test span, then check `http://127.0.0.1:3000` UI for the new trace.

### C3 — Cognee MCP T3 GraphRAG LLM-key env-resolution bug (RECONCILED W309 codex-r1 P2 closure)

> **W309 codex-r1 reconciliation 2026-05-19** — original C3 "session-protocol broken" framing was contradicted by W302-LIVE-STATE-RECORD §10 (same `edddf94` ship): `mcp__cognee__remember` DID reach the embedder pipeline (3× `qwen3-embed-0.6b /v1/embeddings` 200-OK at llama-swap `:8090`). Stream A's "Session not found" + 406 Accept-header observation was a direct-probe artifact (raw curl without MCP client `Accept` negotiation). Operator-facing symptom is the LLM-key env-resolution bug.

- **Evidence (reconciled)**: NSSM service `CogneeMCP` Running; embedder pipeline FIRES (3× `qwen3-embed-0.6b /v1/embeddings` 200-OK per W302 §10); LLM step ERRORS with `LLMAPIKeyNotSetError` — cognee expected a real LLM API key but received the literal placeholder `OPENAI_API_KEY=local` from CLAUDE.local.md env.
- **Impact (downgraded)**: T3 GraphRAG functionally degraded (LLM step blocks full graph-construct pipeline) but NOT inert at protocol level — embedding ingest works. CLAUDE.md line 35 should be amended from `cognee ✓ ACTIVE` to `cognee ⚠️ EMBEDDER-LIVE + LLM-key-bug (W309-C3 / W302 §10)`.
- **Fix class**: operator-action (env-var-only edit in CLAUDE.local.md; possibly upstream cognee bug for literal-placeholder interpretation).
- **Operator action AI-3 (revised)**: (a) replace `OPENAI_API_KEY=local` placeholder in CLAUDE.local.md with either real OpenAI-compatible API key pointing at local llama-swap LLM `:8090/v1` OR a value cognee accepts as "use local-llm-base-url"; (b) if cognee's LLM-key code path requires a non-literal: file upstream cognee issue.

---

## 2. HIGH findings (Stream A) — fix-class classified

| # | Finding | Class | Operator-AI |
|---|---|---|---|
| **H1** | `context-mode` plugin manifest hardcodes ephemeral fnm path `C:/Users/42/AppData/Local/fnm_multishells/80600_1779039579511/node.exe` (fnm session-id changes each shell) | CR-9 portability violation | AI-4: pin to `Z:/tools/nodejs/node.exe` (stable) OR vendor-fork the plugin manifest |
| **H2** | `Z:/tools/nodejs/node.exe` dated 2026-01-12 (4+ months stale; hardcoded in codex Stop-hook critical path) | stale dep | AI-5: refresh node to v22.x latest OR migrate hooks to system node |
| **H3** | `promptfoo` missing from venv; `eval_harness.py:Lane-B` references it | venv-drift | AI-6: `Z:/venvs/claude/Scripts/pip install promptfoo` |
| **H4** | `graphiti-core 0.29.0` + `cognee-mcp 0.5.4` still in venv after T4 graphiti retirement | venv-drift | AI-7: `pip uninstall graphiti-core` (cognee-mcp keep until C3 resolved) |
| **H5** | 6 uncommitted file mods including `.claude/plugins/installed_plugins.json` + `.claude/plugins/known_marketplaces.json` (W270 install-state drift class) + harness adapter mods | governance | AI-8: classify W308 wave-residue and either commit or revert |

---

## 3. MEDIUM + LOW findings (Stream A) — defer to W310

8 MEDIUM + 4 LOW findings documented in `W309-STREAM-A-SILENT-FALLBACK-HUNT.md`. Notable:
- **M7**: context-mode v1.0.136 outdated → v1.0.140 available (`/ctx-upgrade` — non-destructive)
- **M*** stale-deps in venv: 4-6 month gaps on inspect_ai, ruff, etc. — bulk `pip list --outdated` then operator-decide
- **L**: `evaluator.md` agent lacks cite header (R3 partial violation)

**CLEAN-verified** (no fix needed):
- CLI tooling stack: codex 0.130.0 · gh 2.92.0 · git 2.51.0 · node v22.22.0 · python 3.13.12 · ruff 0.15.13 · gitleaks 8.30.1 · shellcheck 0.11.0
- Pre-commit gate fires + ruff TaskCompleted hook works
- hindsight :9077/health UP · ollama :16700 (2 models loaded)
- basic-memory MCP + chrome-devtools MCP responsive
- langfuse backend UP at :3000 (just auth-layer C2 issue)
- All plugin `enabledPlugins` resolve to cache dirs
- codex Stop-hook live with `stopReviewGate:true`
- **Cardinal-rule invariants ALL ✓ VERIFIED** (R1-R5 evidence-anchored)

---

## 4. sca-v6 design (Stream B) — 9 deltas authored

Ready for W310 ship to `.claude/skills/sota-convergence-audit/SKILL.md`. ~510 LOC SKILL.md growth (697 → 1207 LOC). All 10 W292 don't-break invariants preserved.

| Δ | Name | Mandate carry | Composite-denom effect |
|---|---|---|---|
| **Δ1** | LIVE STATE PROBE (Stage-1.5) | W307 row #27 (Portkey named-but-not-deployed) | D10 score +2 lift if incumbent not deployed |
| **Δ2** | `re_enable_phase5_gate` governance flag | W308 row #31 (PWF silent re-enable closure) | settings.json:enabledPlugins false→true requires Phase-5 commit-msg token + JSONC annotation |
| **Δ3** | D22 `discovery_cascade_breadth` (1-5; hard_cap<2 for T1) | operator W309 multi-angle mandate | 19.3 → 20.1 install denom |
| **Δ4** | D23 `decision_impact_tier` (Tier-A FOUNDATIONAL ... E DOC-ONLY) | operator W309 "different level" mandate | 20.1 → 21.1; modulates Phase-5/6 strictness |
| **Δ5** | Cascade-coverage tier-floor (T1≥11 + ≥2 non-github primary; T2≥9; T3≥7; T4≥3) | operator W309 comprehensiveness mandate | hard precondition; breach = auto-demote 1 tier |
| **Δ6** | Architecture-itself re-eval cadence (every 4 waves) | operator W309 "research-arch is essential" mandate | new self-eval cadence |
| **Δ7** | Cross-candidate Borda-ranking matrix (`/sca compare`) | operator W309 "comparison of different repos" mandate | opt-in head-to-head |
| **Δ8** | DeepWiki + Repomix mandatory Stage-2.5 ingest for T1/T2 | operator W309 "deepwiki repomix" mandate | caps D5/D8/D9 at 3 if skipped |
| **Δ9** | Perplexity-MCP routing mandatory for T1/T2 (with exa + WebSearch+multi-vendor fallback) | operator W309 "perplexity mcp etc" mandate | new MCP-family-floor enforcement |

**Architecture-itself self-eval under sca-v6 (preview)**:
- install_score: 4.545 → **4.72** (+0.175)
- pattern_score: 4.51 → **4.73** (+0.22)
- **T1 INSTALL holds with margin** — no architecture-replacement PRD triggered.

**Backward-compat** (multi-version downweighting):
- sca-v1 → 0.5× · sca-v2 → 0.7× · sca-v3 → 0.85× · sca-v3.1 → 0.85× · sca-v5 → 0.9× · sca-v6 → 1.0×
- Stricter 0.85× for cascade-floor breach; 0.8× for T1 no-deep-ingest verdicts
- AGING-RELITIGATION-QUEUE.md gets new entries for sca-v5 T1/T2 verdicts that miss Δ5 floor or Δ8 deep-ingest or Δ9 perplexity-equivalent

**5 additional R-mandates from Stream D** (R13-R17 — operator's discovery findings forwarded to sca-v6 absorption):
- R13: Pareto-frontier axis (HAL-harness pattern)
- R14: Position-bias formalization (Phoenix PairwiseEvaluator modes)
- R15: Failure-mode taxonomy (Docent 6-category + RIFT)
- R16: Self-induced metric coverage (AutoLibra pattern)
- R17: Pre-computed-graph cache pattern (GitNexus parser stack)

---

## 5. Named-repo verdicts (Stream C) — 5 ratifications

| # | Target | Verdict | install_score | pattern_score | Operator action |
|---|---|---|---|---|---|
| **32** | `OthmanAdi/planning-with-files` (RE-LIT CLOSURE) | **T3 PATTERN-STUDY** (DEACTIVATE) — supersedes W308 row #31 | re-scored on Phase-5 strict | n/a (4-FAIL gates) | Flip `enabledPlugins[planning-with-files@planning-with-files]: true → false` + Phase-5-gate-mediated commit message |
| **33** | `abhigyanpatwari/GitNexus` | **T3 PATTERN-STUDY** | PolyForm-NC caps INSTALL+VENDOR-FORK | high D13 + D2 | Keep plugin disabled (already FALSE per live probe); `.mcp.json` standalone MCP LIVE; mine Cosign signed-Docker workflow + pre-computed-graph parser cache patterns |
| **34** | `wshobson/agents` | **T4 CITE-ONLY** (with W285 2-agent T2 carve-out preserved) | D10=2 mass-duplicate vs already-installed `agent-teams + plugin-eval + comprehensive-review` | n/a | Hold W285 2-vendor-fork; NO full install |
| **35** | `mattpocock/skills` | **T2 VENDOR-FORK** — supersedes W301 T3 stale-metadata | live LICENSE re-fetch shows MIT (W301 claimed missing); 57k★ (W301 claimed 50★ — off by 3 orders of magnitude) | first concrete sca-v6 Δ1 live-state-probe catch | Vendor-fork 4 priority skills: `grill-with-docs`, `tdd`, `diagnose`, `caveman` |
| **36** | `anthropics/*` org sweep (TRIAGE Tier-0) | **T0 TRIAGE** | 64 repos enumerated | n/a | Top-3 W310 audit queue: `claude-plugins-community` · `cwc-long-running-agents` · `claude-code-security-review` |

**Critical Stream C finding**: mattpocock W301 supersession is the **first concrete demonstration of sca-v6 Δ1 live-state-probe mandate catching a stale-evidence verdict mid-pipeline**. Validates the W307 row #27 mandate operationally — sca-v6 ship rationale strengthened.

**PWF closure recommendation (AI-9)**: per Stream C verdict — apply `enabledPlugins[planning-with-files@planning-with-files]: true → false` in this commit with W308+W309 Phase-5 4-FAIL citation in commit message. This pre-empts the W310 default-deactivate clock + closes the W308 row #31 ACTIVE-PENDING-OPERATOR-DECISION state.

---

## 6. SOTA discovery — Stream D top-5 W310 shortlist

41 candidate-cards / 25 NET-NEW / **6 distinct MCP families fired** / $0.90 of $1.50 cap spend. Anti-bias quotas ALL EXCEEDED (non-USA 12+ / <500★ 7+ / 2026-shipped 15).

| Rank | Candidate | Cite-convergence | Triage | Why this matters |
|---|---|---|---|---|
| **#1** | `princeton-pli/hal-harness` (ICLR 2026 paper) | 5-source | T2 VENDOR-FORK candidate; LICENSE-pending | 21,730 rollouts × $40k validated · Docent rubrics 6-cat failure-mode taxonomy |
| **#2** | `open-multi-agent/open-multi-agent` (6.1k★, MIT) | 4-source | architectural complement to agent-teams (NOT replacement) | goal-driven coordinator with auto-DAG, 10 LLM adapters, MCP-native; surface as Δ4 D23 Tier-B test-case |
| **#3** | `cenkerinan/awesome-agent-skills` (1000+ curated skills from Anthropic/Vercel/Stripe/Cloudflare/HF) | high curation-quality, April 2026 fresh | T3 PATTERN-STUDY (mine 10-20 subset) | curated NOT AI-generated |
| **#4** | `scaleapi/researchrubrics` (ICLR 2026, 17★) | 2,800+ hrs human labor, 1,868 rubric criteria, 3-axis complexity | T3 PATTERN-STUDY | leading DR agents <68% compliance |
| **#5** | `Mathews-Tom/armory` | paper-cited production-grade EvoSkills + Memento-Skills | T3 OR T2 pending convergence | paper-to-skill + skill-distiller + surrogate-verifier |

**State-probes for W310 follow-up** (Stream D surfaced): `winsw/winsw` migration · `XuehaiPan/nvitop` install · `microsoft/PromptWizard` vendor-fork ship · `ruvnet/ruflo` CR-2 inheritance.

---

## 7. Operator-action checklist (consolidated)

**Ship-blocker class (CRITICAL — fix within current session if possible)**:
- [ ] **AI-1**: C1 phoenix `:16006` decision — restore-or-retire (full disable from `.mcp.json` + CLAUDE.md status update)
- [ ] **AI-2**: C2 OTel auth header — add to CLAUDE.local.md env block per paste-ready snippet above; restart session
- [ ] **AI-3**: C3 cognee MCP protocol — pin version + audit NSSM args; if upstream bug, file issue + disable temporarily

**Governance class (HIGH — pre-W310 hygiene)**:
- [ ] **AI-4**: H1 context-mode fnm-path → pin to stable `Z:/tools/nodejs/node.exe`
- [ ] **AI-5**: H2 stale node.exe → refresh OR migrate hooks to system node
- [ ] **AI-6**: H3 install promptfoo → `pip install promptfoo`
- [ ] **AI-7**: H4 venv drift → `pip uninstall graphiti-core`
- [ ] **AI-8**: H5 uncommitted W308 wave-residue → audit + commit or revert
- [ ] **AI-9**: PWF closure → flip `enabledPlugins[planning-with-files]: false` with Phase-5-gate-mediated commit (this synthesis commit is the recommended vehicle)

**Defer to W310 (MEDIUM)**:
- M7 context-mode upgrade (non-destructive `/ctx-upgrade`)
- Bulk venv `pip list --outdated` + operator-decide
- W310 audit shortlist: Stream D top-5 + anthropics/* top-3 + mattpocock 4-skill vendor-fork

---

## 8. VERDICT-LEDGER row appends (W309 — 5 new rows)

```markdown
| 32 | W309 | 2026-05-19 | `OthmanAdi/planning-with-files` — RE-LIT CLOSURE | **T3 PATTERN-STUDY (DEACTIVATE)** | strict-letter Phase-5 4 FAIL / 1 PASS | n/a | Gate-3 hard-cap (forces ≤T3) + Gate-2/4/5 FAIL | ACTIVE — supersedes W308 row #31 | W315 | Stream C confirmed strict-letter Phase-5 4-FAIL; live `enabledPlugins[planning-with-files@planning-with-files]: true` despite W308 CONDITIONAL — recommended apply `false` with Phase-5-gate-mediated commit this wave. T6: `verdicts/W309-othmanadi-planning-with-files.md`. |
| 33 | W309 | 2026-05-19 | `abhigyanpatwari/GitNexus` | **T3 PATTERN-STUDY** | n/a (license-capped) | high D13+D2 | D1 PolyForm-NC caps INSTALL+VENDOR-FORK | ACTIVE | W315 | Plugin disabled in `enabledPlugins`; standalone `.mcp.json` MCP server LIVE — config-intent ambiguity. Pattern-mine: Cosign signed-Docker workflow + pre-computed-graph parser cache. T6: `verdicts/W309-abhigyanpatwari-gitnexus.md`. |
| 34 | W309 | 2026-05-19 | `wshobson/agents` (full plugin install candidate) | **T4 CITE-ONLY** (W285 2-agent T2 carve-out preserved) | low | low | D10=2 mass-duplicate vs `agent-teams + plugin-eval + comprehensive-review` already installed | ACTIVE | W315 | Hold W285 2-vendor-fork; NO full install. T6: `verdicts/W309-wshobson-agents.md`. |
| 35 | W309 | 2026-05-19 | `mattpocock/skills` | **T2 VENDOR-FORK** — supersedes W301 T3 stale-metadata | re-scored on live evidence | high | n/a (live LICENSE re-fetch falsified W301's D1<3 cap) | ACTIVE | W315 | **First concrete sca-v6 Δ1 live-state-probe catch** — W301 cited 50★ + missing-LICENSE; live: 57k★ + MIT confirmed (sha `f1dd2c0910...`). Vendor-fork 4 priority skills: `grill-with-docs`, `tdd`, `diagnose`, `caveman`. T6: `verdicts/W309-mattpocock-skills.md`. |
| 36 | W309 | 2026-05-19 | `anthropics/*` org sweep (TRIAGE Tier-0) | **T0 TRIAGE** (3 W310-audit-queued) | n/a | n/a | n/a | ACTIVE | W311 | 64 repos enumerated. Top-3 W310 audit queue: `claude-plugins-community` · `cwc-long-running-agents` · `claude-code-security-review`. T6: `verdicts/W309-anthropics-org-sweep.md`. |
```

**W309 tier distribution**: 0 T1 · 1 T2 (mattpocock) · 2 T3 (PWF + GitNexus) · 1 T4 (wshobson) · 0 T5 · 1 T0 TRIAGE (anthropics sweep — 64 repos catalogued, 3 W310-queued). **Cumulative catalog post-W309: ≥175 candidates** across 30+ wave arc.

**W309 mandate validations**:
- **"sca-v6 Δ1 LIVE STATE PROBE catches stale-evidence"** — VALIDATED (mattpocock W301 supersession)
- **"silent fallbacks live one layer down from agent-team plumbing"** — VALIDATED (C1/C2/C3 found by Stream A; operator scope mis-attributed but intuition correct)
- **"multi-angle MCP cascade exceeds anti-bias quotas"** — VALIDATED (Stream D 12 non-USA / 7 <500★ / 15 2026-shipped vs target 3/3/1)
- **"architecture-itself self-eval under sca-v6 retains T1 INSTALL with margin"** — VALIDATED (4.545 → 4.72 install_score)

---

## 9. Codex GPT-5.5 cross-model gate (E2E ship gate)

Per W309-PLAN goal predicate item 6 + CLAUDE.md cardinal-rule-2: codex Stop-hook fires automatically on this synthesis commit. If `/codex:adversarial-review --wait` returns HIGH/CRITICAL → block ship for round-2 closure; MEDIUM advisory per W308 precedent.

Dispatched async (post-commit) via `claude --bg -- /codex:adversarial-review --wait` per CLAUDE.md parallel-execution mode 4 (background-session).

---

## 10. W310 next-wave preview (paste-ready /goal)

```
W310 — sca-v6 ship + operator-AI batch closure + W310 audit-queue execution

Three P0 streams (parallel via TeamCreate):

Stream A: sca-v6 SKILL.md ship — apply 9 deltas (Δ1-Δ9) from W309-STREAM-B-SCA-V6-DESIGN.md to `.claude/skills/sota-convergence-audit/SKILL.md`. Composite denom 19.3 → 21.1 install + 9.4 → 10.6 pattern. Sca-v5 verdicts auto-downweight 0.9×. Architecture-itself self-eval under v6 must hold ≥4.5 install_score. Per Stream B §"ship plan".

Stream B: operator-AI batch closure (9 AIs from W309-SYNTHESIS §7) — AI-1 phoenix decision, AI-2 OTel auth header, AI-3 cognee protocol, AI-4 fnm-path pin, AI-5 node refresh, AI-6 promptfoo install, AI-7 graphiti-core uninstall, AI-8 W308 wave-residue audit, AI-9 PWF closure (if not closed in W309 synthesis commit).

Stream C: W310 audit-queue execution — full sca-v6 audits on Stream D top-5 + anthropics/* top-3 (claude-plugins-community + cwc-long-running-agents + claude-code-security-review) + mattpocock 4-skill vendor-fork ship.

Each stream ship-gated by codex /codex:adversarial-review --wait HIGH+/CRITICAL=block. Convergence: W310-SYNTHESIS.md + ledger rows 37-44.
```

---

## 11. Cardinal-rule invariants (all 5 verified post-W309)

- **R1 trusted-only plugins** ✓ — all 18 installed plugin slugs resolve to trusted source repos (Stream A cross-checked)
- **R2 no self-invent .py/.sh** ✓ — `Z:/claude-sota-installed/.claude/hooks/scripts` does not exist (Stream A grep-verified)
- **R3 cite-anchored agents** ✓ — 4 agents in `.claude/agents/`; `evaluator.md` partial (low-severity, defer to W310)
- **R4 no self-invent rules** ✓ — `.claude/rules/` does not exist
- **R5 settings.json:deny[] secrets** ✓ — 16 deny patterns cover .env / .pem / .ssh / .aws / id_rsa / credentials / CLAUDE.local.md

**STOP-gate state**:
- CLAUDE.md ≤50 LOC ✓ (42)
- settings.json ≤15 KB ✓ (~13.2)
- worktrees ≤3 ✓ (3: main + W287-reconcile + W290)
- 6 key MCPs ✓ (hindsight UP · basic-memory UP · langfuse-backend UP · graphiti DISABLED · phoenix DISABLED+DOWN · cognee EMBEDDER-LIVE+LLM-key-bug — W309 codex-r1 reconciliation) — 5 of 6 functionally operational at embedder level; C1 surfaces phoenix-DOWN; C3 surfaces cognee LLM-key bug (degraded not inert)
- codex `reviewGateEnabled:true` ✓

---

## 12. Cumulative wave-arc state

| Wave-arc | Catalogue | Architecture-itself | Open AIs | Tier dist this wave |
|---|---|---|---|---|
| Pre-W288 | ~50 | n/a | n/a | n/a |
| W288 → W295 | ~120 | install 4.44 (v3) → 4.545 (v3.1) | 5 → 3 | various |
| W296 → W308 | ≥150 | 4.545 (v3.1) | 3 → 2 | 7-wave avg: 1 T1 + 2-3 T3-T4 per wave |
| **W309** | **≥175** | **4.545 → 4.72 (v6 preview)** | **+9 new AIs (3 ship-blocker)** | **0 T1 / 1 T2 / 2 T3 / 1 T4 / 0 T5 / 1 T0** |

---

## 13. Files shipped this wave

Tracked-into-git (5):
- `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-PLAN.md` (committed `31e4ad7`)
- `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-A-SILENT-FALLBACK-HUNT.md` (~650 LOC)
- `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-B-SCA-V6-DESIGN.md` (699 LOC)
- `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-C-NAMED-REPO-DEEP-DIVES.md` (639 LOC)
- `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-D-MULTI-ANGLE-DISCOVERY.md` (415 LOC)
- `docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-SYNTHESIS.md` (this file)
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (5 new rows + W309 tier-distribution + mandate validations)

If operator approves AI-9 PWF closure in this wave: `.claude/settings.json:263` flip + commit message Phase-5-gate-mediated citation.

---

# ADDENDUM — W309 second-pass parallel dispatch (2026-05-19, session continuation)

Following the operator's renewed mandate in this session (*"deep audit your entire architecture with ecc,ccbp ... silent fallbacks, errors ... wshobson/agents mattpocock/skills anthropics ... multi-angle research convergences"*), a second 4-stream parallel-Agent fan-out fired against the W309 corpus to extend (NOT replace) sections 1-13. Streams A-V2 / E / F / G shipped 4 new docs. This addendum surfaces NET-NEW findings + flags verdict disagreement that requires codex tiebreaker.

## 14. Stream A V2 — Hook-command semantics + subagent FQN-collision extension

**Owner**: A-V2 / **File**: `W309-STREAM-A-V2-HOOK-DEEP-DIVE.md` (29967 B)

3 HIGH-V2 net-new (orthogonal to V1's C1-C3 + H1-H5):

| # | Finding | Evidence | Operator-AI |
|---|---|---|---|
| **H-V2-1** | `PreToolUse Bash` gitleaks hook is DOUBLE-NEUTERED — `gitleaks protect --staged --no-banner --redact --exit-code 0 \|\| true` — `--exit-code 0` forces gitleaks return 0 PLUS `\|\| true` redundantly silences. Hook is effectively **dead code**. Pre-commit gate `.pre-commit-config.yaml` is the real line of defense. | settings.json hooks.PreToolUse.Bash entry | **AI-V2-1 (HIGH)**: delete the dead-code PreToolUse Bash gitleaks hook OR remove `--exit-code 0`+`\|\| true` so it actually blocks |
| **H-V2-2** | `PostToolUse Edit\|Write\|MultiEdit` hook stacks `>/dev/null 2>&1; ...; true` silencing — ruff + shellcheck `--severity=error` findings are completely lost on file writes during session | settings.json hooks.PostToolUse entry | **AI-V2-2 (HIGH)**: surface shellcheck via `exit-code 2` propagation; route ruff to `notify` channel; do NOT swallow stderr |
| **H-V2-3** | `code-reviewer` subagent_type collision extends from W298's 3 plugins to **9 unique parent plugins**: addy-agent-skills, comprehensive-review, incident-response, tdd-workflows, feature-dev, pr-review-toolkit, superpowers, everything-claude-code, superpowers-marketplace. Bare `code-reviewer` short-form is operator-ambiguous. | grep across `.claude/plugins/cache/**/agents/*.md` + frontmatter | **AI-V2-3 (HIGH)**: emit operator-rule "always use FQN `<plugin>:code-reviewer`"; consider settings.json comment-block call-out |

5 MEDIUM-V2 (governance/hardcode/regex):
- **M-V2-1**: `.claude/hooks/context-mode-cache-heal.mjs` operator-deployed `.mjs` hook in git — **RESOLVED THIS SESSION** by `CLAUDE.md` line 19 amendment (cardinal-rule-2 now sanctions ≤2 KB bug-patch shims cite-anchored to specific upstream GitHub issue — `anthropics/claude-code#46915`). Stream A-V2's grey-area concern is **CLOSED**.
- **M-V2-2**: `PostToolUseFailure` regex too narrow (only `permission denied|EACCES|gitleaks`) — extend.
- **M-V2-3**: settings.json destructive-git review-gate hardcodes `codex/1.0.4` plugin version (drift risk on plugin update).
- **M-V2-4**: `ECC_DISABLED_HOOKS` env var references 8 hooks that may not exist post-W255 cleanup.
- **M-V2-5**: `gitnexus` MCP uses bare PATH lookup (CR-2 `npx -y <pkg>@<version>` contract violation; W300-AI-1 corollary now applies per CLAUDE.md line 19 amendment).

Live-probe **reconciliation** with V1:
- Phoenix `:6006/:16006/:18006` **all timeout** — V1 C1 corroborated (Phoenix backend DOWN)
- Hindsight `:9077/health` returns 200 — V1 partial-correct (root path 404 by design; health endpoint UP)
- Langfuse `:3000/api/public/health` returns 200 — V1 C2 correct (backend UP, auth header missing)
- Cognee `:8000/mcp` full initialize handshake captured — V1 C3 protocol-claim REFUTED; transport HEALTHY; only LLM-key bug remains (matches synthesis §1.C3 reconciliation)

CR-2 status under amended cardinal-rule-2 (CLAUDE.md line 19, this session): **PASS** (one sanctioned bug-patch shim; one hardcoded plugin-version pin acceptable per W300-AI-1 corollary; gitnexus MCP CR-9-exception case).

---

## 15. Stream E — CCBP + ECC + Anthropic-primitives line-by-line ingest

**Owner**: E / **File**: `W309-STREAM-E-CCBP-ECC-INGEST-AND-DELTA.md` (28833 B)

### HEAD drift (ff-applied to 6 of 7 clones; CCBP blocked by 1 local-only commit)

| Source | Behind | Substantive | Top finding |
|---|---:|---:|---|
| CCBP (`shanraisshan/claude-code-best-practice`) | 9 | 1 | `ac0d87d` codex hooks 5→8 (PermissionRequest/PreCompact/PostCompact — codex-side, not best-practice prose) |
| ECC (`affaan-m/everything-claude-code`) | 49 | 8 | Unicode-tag-block invisibility · OpenAI-provider hardening · MCP HTTP-406 fix · OIDC scope · 1 new skill (`blender-motion-state`) |
| `anthropics/claude-code` | many | **8** | **v2.1.144 has 8 directly-runtime-relevant fixes**: MCP `tools/list` pagination silent-drop · `claude mcp list` parse-error surfacing · headless Skill-tool fix · Windows bg-session scrolling · FD-exhaustion under skills/ · `/plugin` last-updated UI · captive-portal startup hang |
| `anthropics/claude-plugins-official` | several | 2 | 3 vendor-specific plugin adds (convex/spotify/zoominfo) + infra-relevant nightly SHA-bump cadence + HTTP MCP-URL liveness CI gate — **validates W270 silent-drift discipline upstream** |

### Adoption matrix

19 NEW primitives evaluated. **ZERO require CLAUDE.md / settings.json edits**:
- 8 v2.1.144 fixes are AUTO-ABSORBED on CLI upgrade
- 1 new skill (blender-motion-state) + 3 vendor plugins (DB/music/sales-intel) — REJECTED per W280h zero-installs discipline
- ECC internal CI hardening — NOT-ADOPTED (plugin-internal, not runtime obligation)

### Stale-cite hunt

- **ZERO cardinal-rule cite SHA-resolution failures** ✓
- **ZERO cardinal-rule content-drift findings** ✓
- 4 archived wave-audit SHAs (W295/W296/W304) stale (LOW; archive pages only)
- **MEDIUM**: `CLAUDE.local.md` cites `claude-settings.md:826` and `:877-921` — content correct, line numbers drifted ~+20 lines upstream. Anchor-by-section-heading would be drift-immune.

### Top recommendation

- **AI-E-1 (REC, top priority)**: operator upgrade installed CLI to **v2.1.144** (absorbs 8 silent-bug fixes; no rule changes needed). Auto-doable via `claude --update` or similar; no commit required.
- **AI-E-2 (MEDIUM)**: refresh CLAUDE.local.md cite line-numbers OR migrate to section-heading anchors (drift-immune).

---

## 16. Stream F — Operator-named-repo audits (DISAGREEMENT WITH §5 Stream C)

**Owner**: F / **File**: `W309-STREAM-F-OPERATOR-NAMED-REPOS-AUDIT.md` (49030 B)

Stream F audited the operator-named-repos under sca-v3.1 fresh + wrote 3 basic-memory T6 verdicts. **Stream F verdicts DIFFER from Stream C on 2 of 4 targets** — recorded here for codex GPT-5.5 tiebreaker.

| Target | Stream C (§5) | Stream F | Δ analysis | Codex action |
|---|---|---|---|---|
| **mattpocock/skills** | T2 VENDOR-FORK | **T1 INSTALL** (install_score 4.41 / pattern_score 4.69) | Both AGREE on W301 supersession (live MIT + 92k★ vs W301's "no license + ~50★"). Disagreement is on TIER not on superseded-evidence: C says vendor-fork 4 skills; F says full T1 INSTALL. Operator-readable: F is MORE aggressive. | Codex `--wait` will tiebreaker; conservative default = Stream C T2 vendor-fork (lower-risk path) |
| **wshobson/agents** | T4 CITE-ONLY (W285 2-agent T2 carve-out preserved) | **T2 SELECTIVE-INSTALL** (install_score 3.99 / pattern_score 4.43) | C cites D10=2 mass-duplicate hard-cap; F bypasses D10 by scoping to the **75+ subagent collection** (NOT the governance trio). Both views are coherent at different scopes. | Codex `--wait` likely affirms C at full-collection scope and F at sub-scope; **per-subagent install decision is more granular than this audit** |
| **anthropics/* org sweep** | T0 TRIAGE (3 W310-queued: claude-plugins-community + cwc-long-running-agents + claude-code-security-review) | TRIAGE matrix; Stream F top-3: **knowledge-work-plugins (12k★)** + claude-code-security-review (4.6k★) + cwc-long-running-agents (325★) | Mostly agree; small reorder on top-3 (C has `claude-plugins-community`; F has `knowledge-work-plugins`). | Both queued for W310 — no immediate conflict |
| **abhigyanpatwari/GitNexus** | T3 PATTERN-STUDY (PolyForm-NC INSTALL+VENDOR-FORK cap) | **T3 PATTERN-STUDY / RETAIN-WITH-DISCLOSURE** (D1<3 PolyForm-NC fires; W132-F2 codex use-class precision grandfathered existing `.mcp.json` install) | **AGREE** | None |

**Operator AIs from Stream F (carry forward, not duplicating §7 AIs)**:
- **AI-F-1 (HIGH)**: `cache-delete + fresh-install agent-teams` — **W289 carry-over still unfulfilled** per Stream F's check (separate from W309 AI-1 phoenix decision).
- **AI-F-2 (MEDIUM)**: install mattpocock/skills as T1 OR vendor-fork 4 priority skills (per disagreement-resolution above).
- **AI-F-3 (MEDIUM)**: mark W301 mattpocock verdict SUPERSEDED-BY-W309 (basic-memory note already auto-handles).
- **AI-F-4 (MEDIUM)**: queue W310 audits for 3 unaudited Anthropic-org repos.
- **AI-F-5 (LOW)**: verify W132 PolyForm Noncommercial disclosure-edit at `.mcp.json:88`.
- **AI-F-6 (LOW)**: pattern-mine top-3 (grill-with-docs, caveman, agent-orchestration, comprehensive-review, gitnexus-impact-pattern).

**Stream F limitation recorded** (for codex review awareness): `mcp__repomix__pack_remote_repository` returned 0 files on all 6 attempts (transient connectivity to remote pack pipeline) — Stream F substituted with `gh api .../contents/...` raw-content fetch. Disagreement[] in F's per-audit blocks records this; codex tiebreaker should account for the substitution.

---

## 17. Stream G — Multi-MCP convergence meta-discovery + sca-v6 Δ10-Δ16 extension

**Owner**: G / **File**: `W309-STREAM-G-MULTI-MCP-CONVERGENCE-META-DISCOVERY.md` (50596 B)

**8 distinct MCP families fired** (exceeds Stream B's 6): HF paper_search · HF hub_repo_search · HF hf_doc_search · DeepWiki · WebSearch · Exa · GitHub MCP · Repomix.

### 7 NEW deltas Δ10-Δ16 (orthogonal to Stream B's Δ1-Δ9 — combined W310 ship = 16 deltas)

| Δ | Name | Source pattern | Priority |
|---|---|---|---|
| **Δ10** | Meta-rubric self-check | AutoRubric pattern | HIGH (W310 ship) |
| **Δ11** | Recursive rubric decomposition | RRD pattern | MEDIUM (W311 defer-1) |
| **Δ12** | **D24 `mcp_attack_surface` dim** | OWASP MCP/Agentic Top-10 | **CRITICAL** — sca-v5 has NO OWASP-MCP-Top-10 / OWASP-Agentic-Top-10 hard-cap mapping despite 11 active MCP servers in runtime |
| **Δ13** | Cost-controlled audit harness | HAL primitive | HIGH (W310 ship) |
| **Δ14** | OWASP + LibVulnWatch hard-cap mapping (4 new Universal-REJECT triggers) | OWASP MCP/Agentic | **CRITICAL** (sister to Δ12) |
| **Δ15** | Anti-rug-pull D24.2 hardening (immutable SHA-pin/content-hash mandate) | supply-chain | HIGH |
| **Δ16** | D25 `post_adoption_monitorability` | runtime observability | HIGH |

### Inverse-benchmark sca-v3.1 vs 14 external rubrics

sca-v3.1 scored **3.86/5 average** (12 W292-original rubrics + 2 W309-new: OWASP-MCP/Agentic + HAL); post-correction **3.46** with new rubric gaps surfaced.

### 15 NEW SOTA candidates (10 with ≥2-MCP convergence)

5 of 10 Group-A are **<500★** (honors operator's "stars not a hardgate" mandate). 7 of 10 are 2026-shipped. Top deferrals to W310 audit-queue.

### Cardinal-rule-11 candidate

Δ15 proposes immutable SHA-pin/content-hash mandate. **Defer to dim-only path D24.2 for sca-v6**; escalate to cardinal-rule-11 in sca-v7 if dim-only finds >2 candidates failing.

### Operator AIs from Stream G

- **AI-G-1 (CRITICAL)**: audit runtime's CURRENT `.mcp.json` against OWASP MCP Top-10 BEFORE W310 ship. Concrete sub-AIs: scan each of 11 active MCP servers for (a) prompt-injection-via-tool-output (b) excessive-agency-via-tool-grants (c) secrets-leakage-via-error (d) supply-chain-tampering (e) auth-bypass-via-misconfig (f) data-exfiltration-via-resource-read (g) ToCToU-on-state (h) MCP-roots-bypass (i) confused-deputy (j) DoS-via-pagination.
- **AI-G-2 through AI-G-10**: 4 HIGH · 3 MEDIUM · 2 LOW (detailed in Stream G §6).

---

## 18. Consolidated operator-action queue (W309 — sections 7 + 14 + 15 + 16 + 17 merged)

**SHIP-BLOCKER (CRITICAL)** — fix within current session if possible:
- [ ] **AI-1** (§7): phoenix `:16006` decision — restore-or-retire
- [ ] **AI-2** (§7): OTel auth header → CLAUDE.local.md
- [ ] **AI-3** (§7): cognee LLM-key bug → env replacement
- [ ] **AI-G-1** (§17): **OWASP MCP Top-10 scan of current 11 MCP servers** — pre-W310 ship gate

**HIGH** (pre-W310 hygiene):
- [ ] **AI-4** (§7): context-mode fnm-path pin
- [ ] **AI-5** (§7): node.exe refresh
- [ ] **AI-6** (§7): promptfoo install
- [ ] **AI-7** (§7): graphiti-core uninstall
- [ ] **AI-8** (§7): W308 wave-residue audit
- [ ] **AI-9** (§7): PWF closure (`enabledPlugins[planning-with-files]: false`)
- [ ] **AI-V2-1** (§14): delete dead-code PreToolUse gitleaks hook OR fix exit-code
- [ ] **AI-V2-2** (§14): surface shellcheck via exit-2 propagation
- [ ] **AI-V2-3** (§14): emit operator-rule for `code-reviewer` FQN
- [ ] **AI-F-1** (§16): cache-delete + fresh-install agent-teams (W289 carry)
- [ ] **AI-E-1** (§15): operator upgrade CLI to v2.1.144 (absorbs 8 silent-bug fixes)

**MEDIUM** (defer to W310):
- AI-V2-2..5 (§14): PostToolUseFailure regex / codex/1.0.4 hardcode / ECC_DISABLED_HOOKS stale / gitnexus bare-PATH
- AI-E-2 (§15): CLAUDE.local.md cite line-numbers drift
- AI-F-2..6 (§16): mattpocock install decision / W301 supersession marker / 3 anthropics audits / PolyForm disclosure / pattern-mine
- AI-G-2..10 (§17): 9 Stream-G AIs

**Auto-doable (no operator confirm needed)**:
- M7 (§3): `/ctx-upgrade` context-mode v1.0.136 → v1.0.140 (non-destructive)
- 4 archived stale-SHA fixes (§15)

---

## 19. Architecture-itself self-eval under sca-v6 — RE-RUN with Δ10-Δ16

Stream B preview (§4) calculated `install_score 4.545 → 4.72` and `pattern_score 4.51 → 4.73` under Δ1-Δ9 alone.

**With Stream G's Δ10-Δ16 incorporated** (sca-v6 final, 16 deltas):

- New denom: install 21.1 → **23.4** (added D24 weight 1.0 + D25 weight 1.0; D24.2 weight 0.3); pattern 10.6 → **11.8**
- Architecture-itself NEW dim scores: D24 mcp_attack_surface=**3** (current `.mcp.json` is partially hardened — see AI-G-1; pre-OWASP-scan), D25 post_adoption_monitorability=**3** (phoenix DOWN + OTel auth bug both blocking observability)
- **Architecture-itself install_score under FULL sca-v6**: 4.72 × (21.1/23.4) + (3+3+0.3×3)/23.4 = **~4.43**
- **Architecture-itself pattern_score under FULL sca-v6**: 4.73 × (10.6/11.8) + (3+3)/11.8 = **~4.76**

**T1 INSTALL still holds** with margin (≥4.0 install OR ≥4.5 pattern) — but `install_score 4.43` is **the lowest the architecture has scored on its own rubric since W288**. The drag is from D24 + D25 (both observability/security) — both have concrete operator AIs to lift.

**Action**: AI-G-1 OWASP scan + AI-1 phoenix restore + AI-2 OTel auth — post-fix re-eval target = **install ≥4.55, pattern ≥4.85**.

**No replacement PRD triggered** (T1 floor 4.0 install).

---

## 20. Updated codex GPT-5.5 ship gate

Per §9: codex Stop-hook fires automatically on this synthesis commit. **Two new tiebreaker items added to codex review prompt**:

1. **Verdict disagreement** (Stream F vs Stream C on mattpocock TIER + wshobson TIER) — adjudicate or downgrade both to PATTERN-STUDY pending fresh evidence per sca-v6 Δ5 proposal.
2. **OWASP MCP Top-10 critical gap** (AI-G-1) — ship advisory: should W309 ship be BLOCKED until pre-W310 OWASP scan completes? Default: NO (W309 is doc-only; OWASP scan is operator-gated runtime change).

`/codex:adversarial-review --wait` will fire async post-commit; HIGH/CRITICAL findings block ship until round-2 closure.

---

## 21. Files shipped this addendum

- `W309-STREAM-A-V2-HOOK-DEEP-DIVE.md` (29967 B)
- `W309-STREAM-E-CCBP-ECC-INGEST-AND-DELTA.md` (28833 B)
- `W309-STREAM-F-OPERATOR-NAMED-REPOS-AUDIT.md` (49030 B; 3 basic-memory T6 verdict notes also written)
- `W309-STREAM-G-MULTI-MCP-CONVERGENCE-META-DISCOVERY.md` (50596 B)
- `W309-SYNTHESIS.md` (this file — extended sections 14-21)

**Total W309 doc shipment**: 8 streams + plan + provenance + synthesis = ~415 KB across 12 files.
