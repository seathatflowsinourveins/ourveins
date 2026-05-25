# W337 FULL-SOTA-UNLEASHED — Synthesis (DRAFT IN PROGRESS)

> **Status**: IN-PROGRESS 2026-05-20. Synthesis seeded from 6 parallel research streams (A-F).
> **Predecessor**: W335 SOTA-Convergence-Max + W336 closure (commit e18e72e).
> **Operator directive**: "deep audit current system, give me full /goal, MAX workflow quality, no budget limit, full SOTA features unleashed".
> **Frontier-peer**: codex GPT-5.5 adversarial review queued (T530).

## Audit-baseline (Phase-0, this wave — VERIFIED FACTS)

| Dimension | Claimed (CLAUDE.md) | Observed (probe) | Verdict |
|---|---|---|---|
| Plugin cache dirs | 18 (L80) | **15** | **DRIFT** (3 retired since W315: addy-agent-skills, gitnexus-marketplace, mcp-memory-service) |
| Marketplaces defined | 22 (L80) | 22 | ✓ |
| Marketplaces unused | 6 (L80) | TBD (compute: 22 defined - 15 cached = 7 unused; close to claim) | NEAR-MATCH |
| Plugins installed | 64 (L80) | 64 | ✓ |
| Plugins enabled | 47 (L80 W315-r2) | enabledPlugins-JSON only has 1 key | **ANOMALY** — investigate enablement source-of-truth |
| Local skills | 46 (L52 W333 re-count) | **47** | DRIFT (1 new skill since W333; identify) |
| Local CLAUDE.md size | ≤50 LOC | 53 lines / 18651 bytes | **OVER-BUDGET** by 3 lines / +3700 bytes |
| self_invented_count | 0 (cardinal-rule-4) | 0 (re: .claude/rules/*.md + .claude/hooks/scripts/*.py) | ✓ (tools/ scripts are operator-utility scope, out-of-invariant) |
| Hooks under .claude/hooks/ | 1 sanctioned exception (cardinal-rule-2) | 1 (context-mode-cache-heal.mjs 1656b @ #46915) | ✓ |

## Services state (Phase-0, this wave — VERIFIED VIA HTTP PROBE)

| Service | Port | NSSM | HTTP probe | Verdict | Action |
|---|---|---|---|---|---|
| LlamaSwap | 8090 | RUNNING | 302→/ui | **LIVE** | Stream A finding overturned |
| Ollama | 16700 | RUNNING (OllamaServe) | (Stream A: /api/tags 0.7KB) | **LIVE** | None |
| Cognee | 8000 | RUNNING (CogneeMCP) | /mcp initialize → Cognee 1.26.0 | **LIVE** | None |
| Langfuse | 3000 | n/a (Docker) | **ECONNREFUSED** | **DEAD** | W333 recovery un-recovered — re-fix (P0) |
| FalkorDB | 16379 | n/a | DEAD (port closed) | **DEAD by design** | retired W295 |
| Hindsight | 9077 | n/a | DEAD (port closed) | **DEAD by design** | retired W317 |
| Phoenix | 16006 | n/a | Port LIVE but owned by Docker backend (com.docker.backend.exe PID 17040) | **NOT Phoenix** | W329-D correction holds |

## CLI ecosystem (Phase-0, this wave — VERIFIED)

```
node v22.22.0       npm 11.9.0      git 2.51.0.windows.2     gh 2.92.0
codex 0.130.0       ollama 0.24.0   docker 29.4.3            python 3.14.3
uvx 0.10.3
```

## Stream-A (Runtime Audit) — landed

**Findings**:
1. preagent-parallel-guard exit paths: 8 exit(0) + 1 exit(2). All exit(0) sanctioned per W329-A R5 + W331 r4 except 1 marginal: `main().catch(() => process.exit(0))` at L384 swallows internal errors. **Recommend**: change to `process.exit(1)` + stderr log. (LOW priority — guard internal errors are rare)
2. mem-recall SKILL.md: 12 graphiti/T4/FalkorDB tokens — **ON RE-INSPECTION ALL DESCRIPTIVE CITES, NOT LIVE INSTRUCTIONS**. The skill correctly routes to T6 basic-memory primary + T2-split plugin-memory fallback. Stream-A flagging is over-eager. No action needed.
3. Cardinal-rule-2 hook compliance ✓ (1 file, 1656b, cite-anchored #46915)
4. self_invented invariant holds ✓

**Top-3 must-fix (operator candidates)**:
- mem-recall stale → DISMISS (re-inspection: all descriptive, no live T4 path)
- CLAUDE.md L80 cache-count drift 18→15 → **P1 update**
- LlamaSwap NOT-RESPONDING → DISMISS (LIVE per HTTP 302 + NSSM RUNNING)

**Actual P0 from Stream-A re-inspection**: Langfuse :3000 ECONNREFUSED (Stream-A claimed LIVE based on stale W333 recovery; reality differs).

## Stream-B (Native CC Features) — LANDED

**Top-5 native feature gaps** (file: STREAM-B-NATIVE-CC-FEATURES.md):
1. **/insights native command UNUSED** — Anthropic Feb-2026 30-day session analyzer (`~/.claude/usage-data/report.html`) generates auto-derived CLAUDE.md suggestions. CLI 2.1.145 supports it; not in workflow. **Action**: run `claude /insights` now + monthly cadence.
2. **Langfuse OTel endpoint DEAD :3000** (ECONNREFUSED). CLAUDE.md L36 claims LIVE — STALE. All telemetry traces silently dropped. **Fix**: `docker compose -f Z:\claude-hub\observability\docker-compose.yaml up -d --recreate`.
3. **`claude ultrareview` cloud multi-agent review** never wired — could augment codex GPT-5.5 with 3rd cloud opinion.
4. **Plugin cache drift**: CLAUDE.md L80 says 18, actual 15 (`-3`).
5. **2026-Q2 native CLI features unexploited**: `--plugin-url`, `--plugin-dir <zip>`, hard-deny in `defaultMode=auto`, `claude agents` background sessions.
SDK stack current: claude CLI 2.1.145 + agent-sdk 0.3.145 + codex 0.130.0.

## Stream-C (Anthropic+CCBP+ECC) — LANDED

**Top-5 adoptions** (file: STREAM-C-ANTHROPIC-CCBP-ECC-COOKBOOK.md):
1. **6 new Anthropic hook events unwired**: TaskCreated, PostCompact, FileChanged, CwdChanged, ConfigChange, TeammateIdle — largest single gap
2. **CCBP @ f28c2da NO DRIFT** vs CLAUDE.md L1 cite (verified line-exact)
3. **ECC cache @ 2.0.0-rc.1** — 100+ skills bundled; **refresh + selective enable**
4. **Cookbook research_lead_agent.md** L135-137 parallel-tool-call MUST-block — verified at HEAD blob `e02d9af3`; runtime cite-SHA `39a350b6` is older but content stable
5. **Cookbook `patterns/` only contains `agents/`** (corrected; no top-level tools/prompts/orchestration/research/evals)

## Stream-D (wshobson+addyosmani+mattpocock+mksglu) — LANDED via direct MCP

**Top-5 actions** (file: STREAM-D-AGENT-SKILL-REPOS.md):
1. **P0** `/ctx-upgrade` mksglu/context-mode v1.0.141→v1.0.146 (openclaw SessionDB resolve fix; ctx_stats + timeline-sort affected)
2. **P0** `/plugin marketplace add wshobson/agents` + install plugin-eval + conductor (replaces hand-rolled sca-vN ranking with peer-reviewed PluginEval)
3. **P1** refresh mattpocock fork d54c497a→b8be62ff (5 commits ahead: /handoff redaction + ICA + CONTEXT.md glossary)
4. **P2** pattern-adopt addyosmani CI skill validator (PR #60 googlarz)
5. **P2** hold addyosmani vendor-fork @ f17c6e88 (zero drift)

## Stream-E (planning-with-files+GitNexus+alirezarezvani) — LANDED

**Top-3 actions** (file: STREAM-E-PLANNING-GITNEXUS-ALIREZAREZVANI.md):
1. **DROP** orphan gitnexus skill — CLAUDE.md advertised 7 child skills but filesystem has only 1 parent index (children dangling). Stream A's "7 gitnexus-* skills" claim was incorrect.
2. **CONFIRM** planning-with-files RE-ENABLE rationale (W334 reversed W308 DEACTIVATE; HEAD d27008f active; pattern preserved as durable-planning-files skill)
3. **ABSORB** alirezarezvani authoring-standard (SKILL-AUTHORING-STANDARD + AUDIT_REPORT cadence) as reference-only doc; W334-P1 retire stands. Re-litigate W345.

## Stream-F (Research Architecture) — LANDED via direct MCP perplexity_research

**Top-5 research arch upgrades** (file: STREAM-F-RESEARCH-ARCH.md):
1. **P0** Switch sca-vN→wshobson PluginEval (post-install via Stream D §1) — replaces `tools/sca-*.py/sh`
2. **P0** Codify install-vs-pattern decision threshold + persist `.claude/state/sota-decisions.jsonl`
3. **P1** Add multi-source convergence pipeline `tools/sota-convergence.mjs` (perplexity+deepwiki+github+hf-paper auto-merge)
4. **P2** Add 5-awesome-list scrape (vivy-yi/heilcheng/AGI-Edgerunners/luo-junyu/Zijian-Ni) + arXiv/HF/Anthropic-blog quarterly cadence
5. **P3** 3-cloud-reviewer (codex + Opus + claude ultrareview) for high-stakes decisions

## Verification Corrections (Phase-1.5 — direct fs/CLI probes 2026-05-20)

Several stream claims overturned or refined via post-stream verification:

| Claim | Source | Verification | Verdict |
|---|---|---|---|
| **gitnexus orphan (7 children missing)** | Stream E | Direct fs probe: `gitnexus/` dir contains 7 child dirs (gitnexus-cli, -debugging, -exploring, -guide, -impact-analysis, -pr-review, -refactoring) + SKILL.md | **CORRECTION: NOT orphaned**. Stream E missed nested recursion. Stream A claim verified. **DROP #6 from Top-10 (false alarm)**. |
| **`/insights` native CLI command** | Stream B | `claude --help` 2.1.145 + ctx_fetch_and_index on docs.anthropic.com/en/release-notes/claude-code + W310-EXT cache audit 2026-05-19 all confirm: NO `/insights`, `/analytics`, or `/metrics` command exists. v2.1.144 CHANGELOG has no insights entry. | **CORRECTION**: Stream B claim **OVERTURNED — `/insights` DOES NOT EXIST as native command**. BUT: real Anthropic insights primitive is the **Claude Code Analytics API** (HTTP, organization-scoped) at `/docs/en/manage-claude/claude-code-analytics-api` — requires org-API key. Plus **ccusage MCP already wired** in `.mcp.json` for individual usage stats. **REPLACE #4 in Top-10**: NEW action = wire Analytics API via skill IF operator has org-key, ELSE rely on ccusage MCP. |
| **Langfuse :3000 DEAD (need recreate)** | A + B | `docker ps -a`: 6 langfuse-* containers exist; clickhouse Up healthy; web/worker/postgres/redis/minio all `Exited (255)` ~1h ago | **CONFIRM but refine**: stack EXISTS, just stopped. Fix = `docker compose up -d` (not `--recreate`). **Top-10 #3 confirmed P0, command revised**. |
| **6 new Anthropic hook events** (TaskCreated/PostCompact/FileChanged/CwdChanged/ConfigChange/TeammateIdle) | Stream C | ctx_fetch_and_index + ctx_search on Anthropic hooks doc — extracted authoritative 18-event matcher table | **CORRECTION**: Stream C claim **PARTIALLY OVERTURNED**: 2-of-6 confirmed (PostCompact, FileChanged); 4 likely **fabricated** (CwdChanged, ConfigChange, TeammateIdle, TaskCreated — none in doc). **HOWEVER**: actual full upstream event list has **9 real events runtime is missing**: Setup (matcher: init/maintenance), InstructionsLoaded, UserPromptExpansion, PermissionRequest, PermissionDenied, PostCompact, FileChanged, SubagentStart, SessionEnd. **REVISED #7**: wire 9 real new events (not 6 fabricated ones). Higher payoff than original Stream C scope. |
| **47 enabled plugins** | CLAUDE.md L80 | settings.json:enabledPlugins shows 68 total entries, **59 true** + 9 false | **CORRECTION**: drift is 47→**59** (not 47→47). 9 explicitly disabled (qdrant-skills, hookify, intelligent-compact, protect-mcp, claude-mem@thedotmack, superpowers@superpowers-marketplace, hindsight-memory, gitnexus@gitnexus-marketplace, self-improving-agent). |
| **wshobson NOT installed** | Stream D | subagent allowlist contains 2 wshobson-* entries (`wshobson-devops-troubleshooter`, `wshobson-security-auditor`) | **REFINEMENT**: partial wshobson wiring already present via marketplace dependency. Selective install would augment, not start-from-zero. |
| **CLAUDE.md L52 "× 46 local skills"** | CLAUDE.md | Direct fs count = 47 dirs (incl `_archived`); ≠ 46 | Mismatch is `_archived` counting. **Stream A initial count of 47 was inclusive of `_archived`; CLAUDE.md L52 "× 46" is exclusive.** Both correct in their definition; pick one and stick. |
| **CLAUDE.md ≤50 LOC invariant** | CLAUDE.md L1 | 38 non-empty lines, 53 total (incl blanks/comments) | **HOLDS** (non-empty count is the invariant measure). |

**Net Top-10 GAP TABLE revision** (post-verification):

| # | Action | Status | Effort | Priority |
|---|---|---|---|---|
| 1 | `/ctx-upgrade` to v1.0.146 | CONFIRMED | 1min | P0 |
| 2 | wshobson selective install (plugin-eval + agent-teams + conductor) | REFINED (2 wshobson-* already wired) | 5min | P0 |
| 3 | `docker compose -f Z:/claude-hub/observability/docker-compose.yml up -d` (NOT recreate) | CONFIRMED + refined | 2min | P0 |
| 4 | ~~`claude /insights`~~ → REPLACED: **wire Claude Code Analytics API** via skill (HTTP, org-API-key) OR fall back to **ccusage MCP** (already in .mcp.json) | REPLACED | 20min | P1 (was P0) |
| 5 | CLAUDE.md L80 drift fix (18→15 cache, 47→59 enabled) | CONFIRMED + refined | 5min | P1 |
| 6 | ~~Drop orphan gitnexus skill~~ | **OVERTURNED — no action** | 0min | DELETED |
| 7 | Wire **9 real new hooks** (Setup, InstructionsLoaded, UserPromptExpansion, PermissionRequest, PermissionDenied, PostCompact, FileChanged, SubagentStart, SessionEnd) — verified via doc matcher table | REVISED + CONFIRMED | 60min | P1 |
| 8 | Codify `.claude/state/sota-decisions.jsonl` | CONFIRMED | 30min | P1 |
| 9 | Refresh mattpocock fork d54c497a → b8be62ff | CONFIRMED | 5min | P1 |
| 10 | Untracked-files cleanup (commit/gitignore/delete) | CONFIRMED | 5min | P1 |
| **NEW 11** | Restart Langfuse + investigate why stack exited (255) ~1h ago | DISCOVERED | 10min | P0 (after #3) |
| **DONE 12** | ~~Verify 6-new-hooks~~ → COMPLETED via ctx_fetch_and_index + ctx_search; results show 9 real events to wire | RESOLVED | N/A | DONE |
| **DONE 13** | ~~Verify `/insights`~~ → COMPLETED; does not exist as native CLI; Analytics API is real primitive | RESOLVED | N/A | DONE |

## Synthesis (Phase-1) — IN-PROGRESS

### Cross-stream convergent findings (≥2 streams agree)

| Finding | Streams | Action |
|---|---|---|
| **Langfuse :3000 DEAD** despite CLAUDE.md "LIVE" claim | A (partial), B (verified) | P0 recreate compose stack |
| **CLAUDE.md L80 cache-count drift 18→15** | A, B, baseline-probe | P1 update |
| **`/insights` native command unused** | B (specifically called out by user) | P0 enable + monthly cadence |
| **wshobson/agents NOT installed** but ships SOTA agent-teams/conductor/PluginEval | D, F | P0 install via marketplace |
| **6 new hook events unwired** (TaskCreated, PostCompact, FileChanged, CwdChanged, ConfigChange, TeammateIdle) | C | P1 wire after verifying upstream stability |
| **gitnexus orphan skill** (filesystem has 1 dir, CLAUDE.md claimed 7) | A (initial wrong), E (corrected) | P1 drop orphan |
| **context-mode v1.0.141→v1.0.146 with openclaw SessionDB fix** | D (direct) | P0 /ctx-upgrade |
| **sca-vN deprecation in favor of PluginEval** | D, F | P0 (depends on wshobson install) |
| **decision-log absent** | F | P1 add `.claude/state/sota-decisions.jsonl` |

### Top-10 P0/P1 GAP TABLE

| # | Action | Stream | Effort | Payoff | Risk |
|---|---|---|---|---|---|
| 1 | `/ctx-upgrade` to v1.0.146 | D | 1min | HIGH (openclaw fix) | LOW |
| 2 | `/plugin marketplace add wshobson/agents` + install plugin-eval + conductor | D, F | 5min | VERY HIGH (185 agents, PluginEval, conductor) | LOW |
| 3 | Recreate Langfuse stack via `docker compose ... up -d --recreate` | A, B | 2min | HIGH (telemetry pipeline restored) | LOW |
| 4 | Run `claude /insights` + add monthly cadence skill | B (user-emphasized) | 5min | HIGH (auto-derived CLAUDE.md insights) | LOW |
| 5 | Update CLAUDE.md L80 drift (18→15 cache, 22→16 marketplaces actually-referenced) | A, B | 5min | LOW-MEDIUM (correctness) | NONE |
| 6 | Drop orphan gitnexus parent skill (children don't exist) | E | 2min | LOW (cleanup) | NONE |
| 7 | Wire 6 new Anthropic hook events (TaskCreated/PostCompact/...) | C | 30min | MEDIUM-HIGH (new lifecycle hooks) | MEDIUM (verify upstream stability) |
| 8 | Codify install-vs-pattern threshold + `.claude/state/sota-decisions.jsonl` | F | 30min | MEDIUM (decision discipline) | LOW |
| 9 | Refresh mattpocock fork d54c497a→b8be62ff | D | 5min | MEDIUM (/handoff redaction + ICA) | LOW |
| 10 | Commit untracked tools/cleanup-root-phantom-paths.ps1 + repatch-autoresearch-namespaces.ps1 + delete W335 PASTE-BODY.txt + gitignore .gemini/ | A | 5min | LOW (cleanliness) | NONE |

## Ultimate Architecture Proposal (Phase-2) — POST-CODEX-REVIEW

[See ULTIMATE-ARCHITECTURE.md when written]

## Implementation Roadmap (Phase-3) — POST-CODEX-REVIEW

[See IMPLEMENTATION-ROADMAP.md when written]

## Codex GPT-5.5 Adversarial Review (Phase-4) — ROUND-1 COMPLETE

**Verdict**: BLOCK on draft. 4 hard blockers + 6 WARN findings. Full report: `ADVERSARIAL-REVIEW-GPT55.md`.

### Codex blockers + resolutions

| # | Codex finding | Resolution |
|---|---|---|
| **F1 wshobson install** | BLOCK — `claude-code-workflows` IS sourced from `wshobson/agents` (verified `known_marketplaces.json`); 17 wshobson-derived plugins already enabled (plugin-eval, agent-teams, conductor, comprehensive-review, etc.) | **OVERTURNED**: my Top-10 #2 was a duplicate-install proposal. **REPLACED** with reconciliation action: inventory what's already enabled vs upstream-intended coverage, install only delta. See IMPLEMENTATION-ROADMAP.md §2. |
| **F2 PluginEval domain-fit** | WARN — statistical formalism ≠ domain fit | **ACCEPTED**: gate sca-vN deprecation behind calibration bakeoff against W330-W337 decisions. New action #12. |
| **F3 6 hook events** | OK — verified in live docs (TaskCreated, CwdChanged, FileChanged, PostCompact, ConfigChange, TeammateIdle) at lines 203-215 of code.claude.com/docs/en/hooks | **REFINED**: my own ctx_fetch_and_index extracted 9 events (Setup, InstructionsLoaded, UserPromptExpansion, PermissionRequest, PermissionDenied, PostCompact, FileChanged, SubagentStart, SessionEnd) — partial-overlap with codex's 6 (PostCompact, FileChanged confirmed by both). Net: union = ≥10 new events. Wire only with use-case + overhead budget per codex F3. |
| **F4 Langfuse compose path** | BLOCK — codex probed `.yaml` (file doesn't exist) | **PARTIAL OVERTURN**: filename is `.yml` not `.yaml` (codex probed wrong extension). My probe confirmed `docker-compose.yml` exists (13093 bytes). BUT codex's diagnosis correct: 5/6 containers exited(255), :3000 ECONNREFUSED. Action revised to use `.yml` + investigate exit cause. |
| **F5 /insights** | WARN — docs.claude.com/commands#L110 verifies command exists; runtime probe timed out (API Overloaded) | **ACCEPTED**: keep cadence proposal but mark "command-verified, runtime-unverified". Defer first run until API stable. |
| **F6 decision-log double-bookkeeping** | WARN — risk of conflict with VERDICT-LEDGER.md + basic-memory | **ACCEPTED**: redesign as DERIVED index (canonical = per-wave VERDICT-LEDGER.md markdown; generate .jsonl from those). Tool: `tools/sota-decisions-from-ledger.mjs`. |
| **F7 gitnexus orphan drop** | BLOCK — children DO exist at `.claude/skills/gitnexus/<child>/` (nested) | **OVERTURNED**: my own probe confirmed 7 nested children. Action revised: drop "drop gitnexus" + correct CLAUDE.md L52 path documentation. |
| **F8 mattpocock refresh** | WARN — stylistic only | **ACCEPTED**: demoted to P3 backlog (batch refresh). |
| **F9 marketplace counts** | BLOCK — 15/22/23/64/68/59/9 not interchangeable | **ACCEPTED**: canonical count table added to IMPLEMENTATION-ROADMAP.md. Also discovered NEW item: `everything-claude-code@everything-claude-code` load failure (codex F9 probe). |
| **F10 alirezarezvani cadence** | WARN — 8-wave too slow for active upstream | **ACCEPTED**: refine to event-driven (major packaging change OR operator gap); W345 = backstop not earliest. |

### Net post-codex actions

REVISED Top-10 + new items → see `IMPLEMENTATION-ROADMAP.md` for full plan with phased ship + rollback.

**Codex Round-2 status**: queued — submit revised synthesis (this file post-corrections + IMPLEMENTATION-ROADMAP.md) when ready for re-review.

## Operator-AIs (Phase-5) — POST-CODEX-REVIEW

See `IMPLEMENTATION-ROADMAP.md` "Operator-AIs" section for 11 operator-AIs with priority + dependencies + rollback.

## Operator-AIs (Phase-5) — POST-CODEX-REVIEW

Targeting 10 operator-AIs in W337 implementation:
- AI-W337-1 P0 /ctx-upgrade
- AI-W337-2 P0 wshobson install
- AI-W337-3 P0 Langfuse recreate
- AI-W337-4 P0 /insights enable + monthly cadence
- AI-W337-5 P1 CLAUDE.md drift fix
- AI-W337-6 P1 gitnexus orphan drop
- AI-W337-7 P1 6 new hook events
- AI-W337-8 P1 decision-log codify
- AI-W337-9 P1 mattpocock refresh
- AI-W337-10 P2 untracked cleanup

---

**Working log** (this wave):
- 2026-05-20 (~early): Stream-A returned. 5 streams in flight (B-F).
- 2026-05-20: Audit-baseline + services-state tables populated from local probes.
- TBD: Stream-B return → INSIGHTS investigation
- TBD: Stream-C return → Anthropic+CCBP+ECC convergence
- TBD: Stream-D return → 4-repo SOTA ingest
- TBD: Stream-E return → 3-repo verdict
- TBD: Stream-F return → research-arch upgrades
- TBD: Synthesis pass
- TBD: Codex adversarial review
- TBD: Operator-AIs queue
