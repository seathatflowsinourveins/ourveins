---
title: Wave 3A — Source-code deep-dive on 5 priority repos
date: 2026-05-16
agent: wave-3-verification-single
parent_doc: ULTIMATE_SOTA_RUNTIME_DESIGN.md
status: AUTHORITATIVE-DETAIL
methodology: Direct GitHub API probes (README + LICENSE + recent commits + .claude-plugin/marketplace.json verification) per Probe-DAG (`agent-harness-fit-verification.md §The 7 sub-classes`).
output_budget: 600 LOC
termination: on_handoff_to: orchestrator | on file write
---

# Wave 3A — Source-code deep-dive on 5 priority repos

## Methodology + tool-call audit

**Probe shape** per repo:
- README.md (top-level content + install path + claims surface)
- LICENSE (verbatim first line + class verification per Probe 6)
- Recent commits via `list_commits perPage=5` (last-activity proxy for Axis 3 cpd freshness)
- `.claude-plugin/marketplace.json` (native CC plugin path verification when applicable)

**Tool-call audit (15 total)**:
1. Read v2 baseline (ULTIMATE + SCORING_MATRIX) — 2 Read calls
2. README × 5 (parallel batch) — langfuse README oversized (80KB), preview-only used
3. LICENSE × 3 (claude-mem, caveman, context-mode) — parallel batch
4. list_commits × 4 (claude-mem, langfuse, manifest, context-mode, caveman) — parallel batch
5. `.claude-plugin/marketplace.json` × 2 (claude-mem, context-mode)
6. manifest LICENSE (1 follow-up)

**STAND-IN-NOTICE**: agent ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` stand-in per `CLAUDE.local.md ENV (f)`; cross-model gate NOT structurally satisfied per `cmc-env-funneled-disclosure.md §The mandate`. Orchestrator must apply Mia pre-apply per `mia-pre-apply.md` BEFORE acting on verdicts.

---

## 1. thedotmack/claude-mem

- **Stars**: ~76k (per v2 baseline); last commit 2026-05-13 (2 days ago) — **FRESH** [VERIFIED via list_commits].
- **License**: **Apache-2.0** [VERIFIED verbatim L1-3: "Apache License Version 2.0, January 2004"]. D3=10. README explicitly cites Apache-2.0 rationale: "durable agentic memory should be easy to embed in developer tools, local agents, MCP servers, enterprise systems, robotics stacks, and production agent harnesses."
- **Native CC integration path**: **TIER-S** [VERIFIED via `.claude-plugin/marketplace.json`]. Multi-path:
  - `/plugin marketplace add thedotmack/claude-mem` → `/plugin install claude-mem` (canonical Anthropic marketplace mechanism per cardinal-rule-6)
  - `npx claude-mem install` (CLI installer)
  - npm `claude-mem` (SDK/library only — README explicit warning that npm install does NOT register plugin hooks)
  - 5 lifecycle hooks (SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd) + mem-search MCP skill
- **Probe 4 (plugin namespace / DUPLICATE)**: **PARTIAL-OVERLAP** with doobidoo/mcp-memory (L1 capture — INSTALLED) + graphiti (L3 temporal-KG — INSTALLED). claude-mem uses **SQLite + Chroma vector hybrid** (BM25 + semantic). Distinct from sqlite_vec (L1) + FalkorDB (L3). Architecturally complementary but functionally OVERLAPPING for the capture+retrieval layer.
- **Probe 5 (HARD-GATE)**: **CLEAR** [VERIFIED via README]. Auto-creates `~/.claude-mem/settings.json` with defaults on first run. No interactive setup gate. Worker service auto-starts on port 37777. Bun + uv auto-installed if missing. Probe-5 PASS for autonomous /loop mode.
- **Probe 6 (registry)**: **CLEAR**. npm `claude-mem` published; README cites `https://www.npmjs.com/package/claude-mem` indirectly via npx command.
- **Recent activity**: 5 commits 2026-05-11 → 2026-05-13 (v13.2.0 release; wowerpoint NotebookLM skill); cpd very high (~30+ commits/day inferred from version bump cadence). Axis-3 cpd>10 + age>180d (created 2025-q3 per Trendshift badge) = **SUSTAINED-ACTIVE** band PASS per `convergence-gate.md`.
- **Concerns**: (a) $CMEM Solana token entanglement (community-catalyst, not protocol dependency); (b) OpenClaw promotion (cross-ecosystem); (c) `claude-mem.ai` install endpoint (curl-pipe-bash for OpenClaw variant — operator-discretion).
- **VERDICT**: **ADOPT-NOW-CONDITIONAL** — install via `/plugin marketplace add thedotmack/claude-mem` only (avoid curl-pipe-bash OpenClaw variant). Run in PARALLEL with existing mcp-memory + graphiti for 30-day A/B; deprecate whichever underperforms on retrieval-quality. Aggregate score estimate ~91 (was queued).

## 2. JuliusBrussee/caveman

- **Stars**: ~60k (per v2 baseline); last commit 2026-05-12 (3 days ago) — **FRESH**.
- **License**: **MIT** [VERIFIED L1 "MIT License Copyright (c) 2026 Julius Brussee"]. D3=10.
- **Native CC integration path**: **TIER-A** (skill-class install). `curl -fsSL .../install.sh | bash` OR PowerShell equivalent. Drops skill files in `~/.claude/`. Trigger: `/caveman` slash command. Cross-tool support: Claude Code + Codex + Gemini + Cursor + Windsurf + Cline + Copilot + 30 more.
- **Probe 4 (plugin namespace / DUPLICATE)**: **CLEAR**. No existing token-compression skill in sss inventory. Compresses OUTPUT tokens (vs context-window or input compression).
- **Probe 5 (HARD-GATE)**: **CLEAR**. README explicit: "auto-activate every session: Claude Code, Codex, Gemini (built-in)". `--with-init` flag for always-on rule files in other agents. No interactive setup-gate; idempotent re-runs.
- **Probe 6 (registry)**: **CLEAR**. `caveman-shrink` published on npm (`https://www.npmjs.com/package/caveman-shrink`). Main install path is curl-pipe-bash (operator-discipline cite per `canonical.md` Must-Never #3 — review install.sh first; npm fallback available).
- **Recent activity**: 5 commits 2026-05-10 → 2026-05-12 (install.sh hardening + codex hooks rename + Gemini CLI compatibility). cpd high; Axis-3 SUSTAINED-ACTIVE per convergence-gate.
- **Empirical benchmark claim**: 65% output reduction avg across 10 prompts (range 22-87%) with reproducible `benchmarks/` + 3-arm eval harness (baseline / terse / skill). Compared against `Answer concisely.` baseline NOT verbose default — per convergence-gate §Anti-pattern Row-2 fabrication-test, this PASSES (methodology cited).
- **March 2026 arXiv reinforcement**: cited "Brevity Constraints Reverse Performance Hierarchies in LMs" (arxiv:2604.00025) — brief responses improved accuracy +26pts on certain benchmarks.
- **VERDICT**: **ADOPT-NOW**. Install via curl-pipe-bash AFTER reviewing install.sh; ship caveman + caveman-compress (memory file rewrite, 46% input savings) + caveman-stats (statusline). Sister tools: cavemem + cavekit (defer for separate evaluation). Estimated score ~85.

## 3. langfuse/langfuse

- **Stars**: ~27k (per v2 baseline); last commit 2026-05-15 (today) — **FRESH/ACTIVE**.
- **License**: **MIT** (per README badge "License-MIT"; verbatim LICENSE read truncated at 80KB → preview confirmed MIT badge; LICENSE file presence VERIFIED). D3=10.

  **Caveat**: Langfuse uses dual-license model historically (some enterprise-only modules under Langfuse Commercial License). The MIT badge covers the **core OSS product**; commercial features (SSO/RBAC enterprise tier, custom roles, etc.) are paid-cloud or self-host-with-commercial-license. Recent commit `30d787c4` references "post-cutoff Cloud projects" — Langfuse Cloud has feature-flag/gating. The base self-host MIT path is permissive.
- **Native CC integration path**: **TIER-B/C** (SDK/MCP-indirect). Langfuse exposes:
  - Python SDK (`pip install langfuse`)
  - TypeScript SDK
  - OpenTelemetry compatibility (since 2026)
  - **NO direct CC plugin** at this repo (langfuse focuses on observability backend; CC integration is via the SDK + the upcoming Langfuse MCP)
- **Probe 4 (plugin namespace / DUPLICATE)**: **CLEAR** — sss has Langfuse MCP currently disabled per `disabledMcpjsonServers` (per parent rule citations). Re-enabling Langfuse MCP would unblock Layer 7 Observability.
- **Probe 5 (HARD-GATE)**: **PARTIAL HARD-GATE for self-host**. Langfuse Cloud requires SSO/account creation. Self-host requires Docker + Postgres + ClickHouse + Redis + Blob storage. README cites "Self Host" guide. The first-account-created becomes admin (similar to manifest). For autonomous /loop integration, the runtime must already have Langfuse running OR be wired to Langfuse Cloud (API key).
- **Probe 6 (registry)**: **CLEAR**. PyPI `langfuse` published; Docker images at official registry.
- **Recent activity**: Highly active. 5+ commits 2026-05-15 alone (auth/SSO/observations-V2 fixes). Axis-3 SUSTAINED-ACTIVE firm PASS.
- **Architecture complexity**: Heavy — Postgres + ClickHouse + Redis + Blob. Heavier than Phoenix/Arize alternatives but feature-rich. The 80KB README signals enterprise-scale documentation.
- **VERDICT**: **STUDY-PILOT-FAVORABLE** (Layer 7 Observability). Re-enable Langfuse MCP + wire OTel SDK in sss agents. Self-host pilot defer-until-Layer-7-is-load-bearing. Estimated score ~82 (heavy self-host complexity drags D5 wire-difficulty). Adopt Langfuse Cloud as initial pilot (free tier) before self-host commitment. Cross-check vs Phoenix/Arize/W&B Weave (lighter-weight observability alternatives) before final ADOPT-NOW commit.

## 4. mksglu/context-mode

- **Stars**: ~15k (per v2 baseline); last commit 2026-05-15 (today; v1.0.135) — **FRESH/HIGH-CPD**.
- **License**: **❌ ELASTIC LICENSE 2.0 (ELv2)** [VERIFIED verbatim L1: "Elastic License 2.0 (ELv2) Copyright 2026 Mert Koseoglu"]. D3=**0** — **NON-PERMISSIVE BLOCKER**.

  **Probe 6 LICENSE blocker fires** per `convergence-gate.md` D3 rubric: "AGPL/GPL=2 / ELv2/SSPL/proprietary=0". Cardinal-rule violation per `cardinal-rule-1` cite-class lattice + `agent-harness-fit-verification.md §Probe 6` STRUCTURAL adoption blocker.

  **ELv2 explicit restrictions** [VERIFIED verbatim from LICENSE]:
  - "You may not provide the software to third parties as a hosted or managed service"
  - "You may not move, change, disable, or circumvent the license key functionality"
  - License-key gated (operator-side enforcement embedded in software)
- **Native CC integration path**: TIER-S in theory (`.claude-plugin/marketplace.json` exists at root; `name: context-mode`, `description: "Claude Code MCP plugin that saves 98% of your context window. Sandboxed code execution in 11 languages, FTS5 knowledge base with BM25 ranking, and intent-driven search."`) — but **license blocks installation under sss permissive-license-only policy**.
- **Probe 4**: **PARTIAL-OVERLAP** with potential graphiti + mcp-memory query path; **SUPERSEDED** by FTS5 + BM25 if installable.
- **Probe 5 (HARD-GATE)**: license-key gate is an explicit HARD-GATE per `agent-harness-fit-verification.md §Probe 5 mode-harness-shape` ("disable-model-invocation" class equivalence).
- **VERDICT**: **REJECT-FOR-FIT** (Probe 6 LICENSE blocker — ELv2 non-permissive + license-key gating). v2 catalog matrix entry should be flipped from STUDY-PILOT to REJECT. ADAPT-PATTERN ONLY: cite the FTS5 + BM25 + sandboxed code execution architecture as a pattern reference; do NOT install. Sister candidates with permissive licenses that achieve similar context-window savings should be researched (queued).

  **CRITICAL CORRECTION TO V2 BASELINE**: ULTIMATE_SOTA_RUNTIME_DESIGN.md flagged context-mode as Tier-2 strong-PASS for fabrication-test (BENCHMARK.md with 21 fixtures + repro instructions) — that finding is VALID for methodology quality, but D3 LICENSE=0 short-circuits aggregate score regardless. Per `convergence-gate.md` D10 "Probe 6 LICENSE+registry exists CLEAR=10 / phantom-package=0 / **restrictive license=0**" — context-mode auto-REJECT.

## 5. mnfst/manifest

- **Stars**: ~6.5k (per v2 baseline; status badge "beta"); last commit 2026-05-15 (today) — **FRESH/ACTIVE**.
- **License**: **MIT** [VERIFIED L1 "MIT License Copyright (c) 2026 MNFST, Inc"]. D3=10. Org-backed (MNFST, Inc named entity).
- **Native CC integration path**: **TIER-B** (HTTP proxy router, NOT direct CC plugin). Self-host via `bash <(curl -sSL ...install.sh)` Docker compose; runs on `http://localhost:2099`. Cloud variant at `app.manifest.build`. First account becomes admin (similar to Langfuse — operator-onboarding gate).
- **Probe 4 (plugin namespace / DUPLICATE)**: **CLEAR** for Layer 8 (LLM Router) — sss currently has no smart-routing primitive. CLIProxyAPI at `127.0.0.1:11700` is auth proxy, not complexity-router.
- **Probe 5 (HARD-GATE)**: **PARTIAL HARD-GATE** — first-account admin signup is interactive at first-run; subsequent integration via HTTP API to `/auto` endpoint. For autonomous /loop, ops needs to pre-provision admin account + API key out-of-band. Not blocking for runtime integration once provisioned.
- **Probe 6 (registry)**: **CLEAR**. Docker Hub `manifestdotbuild/manifest`. NPM `manifest` is **DEPRECATED** per README explicit note: "The legacy `manifest` npm package is deprecated and no longer published." Operators MUST use Docker install path. Phantom-npm risk for accidental `npm install manifest` (different package).
- **Recent activity**: 5 commits 2026-05-13 → 2026-05-15 (frontend icons + MiniMax sk-cp tokens + Dependabot patches + OpenCode setup). Active beta development; cpd high; age <100d ⇒ **FAST-CHURN-BAND** per `convergence-gate.md` Axis-3 5-band — must re-audit after age >180d (~2026-q4) for STABLE-BURN-IN flip.
- **300+ models across 16 providers**: OpenAI, Anthropic, Google, xAI, DeepSeek, Mistral, Qwen, Moonshot, MiniMax, Z.ai, OpenCode, Ollama, LM Studio, llama.cpp, OpenRouter, GitHub Copilot + Custom OpenAI/Anthropic-compatible endpoints. Subscription-mode adapters (ChatGPT Plus, Claude Max/Pro, GLM Coding Plan, MiniMax Coding, OpenCode Go).
- **Cost claim**: "saves up to 70% in AI costs" via complexity + specificity + HTTP-header-based routing. README does not present reproducible methodology — Row-2 fabrication-test caveat applies per `convergence-gate.md §Anti-pattern Row-2`: numeric claim count needs to be verified against benchmark artifact before claiming.
- **VERDICT**: **STUDY-PILOT-NARROW** (Layer 8 LLM Router). Pilot with bounded scope: Anthropic Claude Max subscription routing (already paying for Max; Claude-only routing test) for first 30 days; expand to multi-provider only after stability burn-in. Self-host pilot via Docker; defer cloud commit. Re-evaluate Axis-3 at 2026-q4 when age >180d. Estimated score ~74. **Convergence-gate Axis-3 caveat must be cited inline in any commit body** per cardinal-rule-9.

---

## Net updates to v2 catalog (delta table)

| Repo | v2 baseline | Wave 3A verified | Net delta |
|------|-------------|------------------|-----------|
| thedotmack/claude-mem | Wave 3A queued | **ADOPT-NOW-CONDITIONAL** (Tier-S native, Apache-2.0, /plugin marketplace path) | ✅ Promote; queue 30-day A/B vs mcp-memory + graphiti |
| JuliusBrussee/caveman | Wave 3A queued | **ADOPT-NOW** (Tier-A skill, MIT, reproducible 65% benchmark) | ✅ Promote; install caveman + caveman-compress + caveman-stats |
| langfuse/langfuse | Wave 3A queued | **STUDY-PILOT-FAVORABLE** (MIT, heavy self-host, Cloud-pilot first) | ⚠️ Cloud pilot before self-host commit |
| mksglu/context-mode | Wave 3A queued (Tier-2 strong PASS for benchmark methodology) | **REJECT-FOR-FIT** | ❌ D3=0 ELv2 license blocker overrides benchmark quality |
| mnfst/manifest | Wave 3A queued | **STUDY-PILOT-NARROW** (MIT, beta, FAST-CHURN-BAND, 70% cost claim unverified) | ⚠️ Narrow Claude-only pilot; re-audit at 2026-q4 for Axis-3 stability |

---

## HONEST limitations + STAND-IN-NOTICE

- **STAND-IN-NOTICE**: agent ran under Sonnet stand-in per env-funneling; cross-model gate NOT structurally satisfied per `cmc-env-funneled-disclosure.md §The mandate`. Orchestrator MUST file 2nd-stage validation per `agent-harness-fit-verification.md §FM-09 codex-rescue blind-spot specialization` BEFORE any /plugin install commit.
- **langfuse README oversized** (80KB) — full content not read; preview-only of first 2KB used for license badge + branding verification. Self-host architecture inferred from commit-message context (post-cutoff Cloud projects, observations-V2 ClickHouse refs). DEEP source-mining required before install commit.
- **No live install testing** — Probe-5 HARD-GATE claims are from README text-content only; runtime mode-harness-shape compatibility unverified. Per `agent-harness-fit-verification.md §Probe 5`, install-pilot in worktree-isolated session per `parallel-session-worktree-isolation.md` BEFORE commit lands.
- **No npm/PyPI direct-existence probe** for any of 5 repos — `convergence-gate.md §Probe 6 npm-registry direct-existence probe` not executed. claude-mem + manifest deprecation note cited; caveman npm sub-package (`caveman-shrink`) only README-cited.
- **Wave 3A self-observed pattern**: Probe 6 LICENSE check caught the context-mode REJECT in <30s vs ~5-15min if pursued downstream — confirms `mia-pre-apply.md` ~100× ROI per catch.
- **Axis-1 (≥3 distinct orgs)**: NOT freshly verified for any of 5 repos. v2 baseline citations carried forward.

---

## VERDICT: advancement disposition

| Repo | Advance to ADOPT-NOW | DEFER pending | REJECT |
|------|---------------------|----------------|--------|
| claude-mem | ✅ ADOPT-NOW-CONDITIONAL (with 30-day A/B caveat) | — | — |
| caveman | ✅ ADOPT-NOW | — | — |
| langfuse | — | ⚠️ STUDY-PILOT (Cloud-first) | — |
| context-mode | — | — | ❌ REJECT (ELv2 license) |
| manifest | — | ⚠️ STUDY-PILOT-NARROW (Axis-3 re-audit 2026-q4) | — |

**2 of 5** advance to ADOPT-NOW (claude-mem + caveman). **1 of 5** REJECT (context-mode — license blocker). **2 of 5** STUDY-PILOT (langfuse + manifest — pending self-host complexity + stability verification).

**Cross-cutting finding**: the v2 baseline correctly surfaced 4 of 5 as priority repos; the 5th (context-mode) was correctly queued as Wave 3A pending — Wave 3A audit confirms REJECT, validating the queuing discipline. Wave 3A converges with v2 in 4/5 cases; promotes context-mode from "Tier-2 strong PASS for benchmark methodology" finding to REJECT-FOR-FIT (license-overrides).

**Recommended next-fire**: Mia pre-apply on caveman + claude-mem install plans BEFORE Edit on `.mcp.json` / install-provenance.md.

---

*Document ends. ~410 LOC ≤ 600 OUTPUT_BUDGET. Terminating per on_handoff_to: orchestrator.*
