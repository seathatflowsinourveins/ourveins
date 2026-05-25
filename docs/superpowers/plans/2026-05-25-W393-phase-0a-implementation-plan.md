# W393 Phase 0a Implementation Plan — eee.ps1 clean-SOTA launch contract (FINAL)

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended for the 5-hour autonomous window) or `superpowers:executing-plans`. Steps use checkbox (`- [ ]`) for tracking.

> **FINAL revision (W400):** Folds W393 SOTA-extraction Streams A+B+C findings (multi-convergence routing, memory-arbitration tiers, pluggable-peer Slot A-E) into Wave-2 module specs. Original draft preserved in `Z:/claude-sota-installed-state/W393-PHASE-0A-PLAN-DRAFT.md`; this file supersedes.

**Goal:** Implement the W393 eee.ps1 launch contract — thin PowerShell launcher + Node.js precheck orchestrator + per-tier modular checks + declarative config + test harness — as 8 focused PRs through the W387 clean-merge pipeline.

**Architecture:** Each PR = own focused commit through `gh pr merge --squash --auto`. AdaptOrch DAG = 4 waves (Wave-1 foundational launcher+docs / Wave-2 5 parallel per-tier checks / Wave-3 block-rules+tests / Wave-4 operator runbook). Lands AFTER W392 cleanup so the precheck baseline is clean.

**Tech Stack:** PowerShell (≤50 LOC thin launcher) · Node.js ≥22 (orchestrator + per-tier check modules + tests) · JSON declarative config · subprocess invocation of `docker`/`gh`/`gitleaks`/`pinact`/`pre-commit` · existing `tools/preagent-wave-lock-guard.mjs` reused.

---

## DAG topology (AdaptOrch hybrid; aggregate parallel-ratio 1.0 within-wave)

```
Wave-1 (foundational; parallel × 2):
  ├─ W393.1 PowerShell launcher + Node.js skeleton + T1 ENV + config schema + launch-mode tiering
  └─ W393.8a Design-landing docs (overview + CLAUDE.md pointer)

Wave-2 (per-tier checks; parallel × 5; depends on W393.1 skeleton):
  ├─ W393.2 T2 Services typed-descriptor + auto-heal-safe-local
  ├─ W393.3 T3 CLI tools exact-probes + post-W392-advisory tagging
  ├─ W393.4 T4 GitHub-state CURRENT-vs-FUTURE + Codex-Verdict honest-reporting + Slot A-E advisory
  ├─ W393.5 T5 SOTA-drift derived-from-.mcp.json + memory-tier-arbitration check
  └─ W393.6 T6 Research-arch deep-checks (advisory-until-baseline mode) + multi-convergence routing rule

Wave-3 (cross-cutting; sequential after Wave-2):
  └─ W393.7 Block-rules B1-B10 + remediation + test harness

Wave-4 (runbook; sequential after Wave-3):
  └─ W393.8b Operator runbook + config reference
```

**W269 compliance**: parallel-ratio = (2+5+1+1)/8 = 1.0 within-wave (max possible).
**Worktree budget**: cap=5 per CLAUDE.md; ≤3 concurrent worktrees per wave.
**Codex gate**: every PR codex-gated via Codex-Verdict trailer (currently fail-only-on-BLOCK; honest reporting per W393 §2 T4).

---

## Task 1 (W393.1, Wave-1): Thin launcher + Node skeleton + T1 ENV + config schema + mode tiering

**Files:**
- Create: `tools/eee-precheck.mjs` — Node.js orchestrator (≤200 LOC for this PR; expands in W393.2-W393.7).
- Modify: `tools/eee.ps1` — preserve current ENV setup + add precheck invocation.
- Create: `.eee/precheck-config.json` — declarative spec schema.
- Create: `tools/eee-checks/t1-env.mjs` — T1 check module.
- Create: `tools/eee-precheck.test.mjs` — test harness skeleton.

- [ ] **Step 1: Write failing test for T1 env-check (mode=launch-fast)**

```javascript
// tools/eee-precheck.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';

test('T1: missing CLAUDE_CONFIG_DIR blocks launch', () => {
  const env = { ...process.env }; delete env.CLAUDE_CONFIG_DIR;
  const out = execSync('node tools/eee-precheck.mjs --mode launch-fast --json', { env, encoding: 'utf8' });
  const r = JSON.parse(out);
  assert.equal(r.status, 'BLOCKED');
  assert.ok(r.blocked.some(b => b.code === 'B-T1-ENV-MISSING'));
});

test('T1: launch-fast latency <5s', () => {
  const t0 = Date.now();
  execSync('node tools/eee-precheck.mjs --mode launch-fast --json', { encoding: 'utf8' });
  const dt = Date.now() - t0;
  assert.ok(dt < 5000, `T1 latency ${dt}ms exceeds 5s budget`);
});
```

- [ ] **Step 2: Run test (expect FAIL — module not implemented)** → `node --test tools/eee-precheck.test.mjs`

- [ ] **Step 3: Create .eee/precheck-config.json (declarative spec; expanded with t2/t3/t4/t5/t6 stubs that downstream Wave-2 PRs flesh out)**

```json
{
  "schemaVersion": "1.0",
  "modes": {
    "launch-fast": { "maxLatencyMs": 5000, "network": false, "tiers": ["T1"] },
    "deep":        { "maxLatencyMs": 30000, "network": true, "tiers": ["T1","T2","T3","T4","T5","T6"], "cacheTTLHours": 24 },
    "repair":      { "maxLatencyMs": 60000, "network": true, "tiers": ["T1","T2","T3","T4","T5","T6"], "allowLifecycleMutations": true }
  },
  "t1": {
    "requiredEnv": ["CLAUDE_CONFIG_DIR","CLAUDE_CODE_TMPDIR","CLAUDE_CODE_PLUGIN_CACHE_DIR","HOMEDRIVE","HOMEPATH","BASH_ENV"],
    "advisoryEnv": ["TAVILY_API_KEY","EXA_API_KEY","OPENAI_API_KEY","ANTHROPIC_API_KEY"],
    "waveLockTool": "tools/preagent-wave-lock-guard.mjs"
  }
}
```

- [ ] **Step 4: Implement tools/eee-checks/t1-env.mjs** (T1 ENV + Z:-portable invariant + wave-lock validate)
- [ ] **Step 5: Implement tools/eee-precheck.mjs (orchestrator skeleton; mode dispatch; tier registry pattern)**
- [ ] **Step 6: Update tools/eee.ps1 — invoke precheck before launching `claude`; exit 2 on BLOCKED; advisory print on HEALED**
- [ ] **Step 7: Run tests (expect PASS)** → `node --test tools/eee-precheck.test.mjs`
- [ ] **Step 8: Smoke-test the launcher end-to-end** → `node tools/eee-precheck.mjs --mode launch-fast --json`
- [ ] **Step 9: Commit + push + PR + auto-merge** through clean-merge pipeline.

---

## Task 2 (W393.8a, Wave-1 parallel): Design-landing docs

**Files:**
- Create: `docs/architecture/W393-EEE-CONTRACT/README.md` — design landing page (summarizes 3 modes + 6 tiers + 10 block-rules; links to design spec on main).
- Modify: `CLAUDE.md` — add a single Pointers line: `eee.ps1 launch contract: docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md (W393 codex r5 APPROVE@0.94)`.

- [ ] **Step 1: Write README.md (overview + 3-mode flowchart + sources)**
- [ ] **Step 2: Verify cite-floor passes (≥3 distinct citation orgs)** — `pre-commit run cite-floor-check --files docs/architecture/W393-EEE-CONTRACT/README.md`
- [ ] **Step 3: Edit CLAUDE.md Pointers section** (≤1 LOC add)
- [ ] **Step 4: Commit + push + PR + auto-merge** through clean-merge.

---

## Task 3 (W393.2, Wave-2): T2 Services typed-descriptor + auto-heal-safe-local

**Files:** `tools/eee-checks/t2-services.mjs` + config additions + tests.

**T2 typed-service descriptors** (declarative; supervisor-agnostic per W393 §2):

```json
{
  "t2": {
    "services": [
      { "name": "langfuse", "transport": "http", "supervisor": "docker-compose", "healthProbe": { "type": "http", "url": "http://127.0.0.1:3000/api/public/health" }, "healthProbeMode": "deep-only", "repairPolicy": "repair-only", "repairCommand": "docker compose -f Z:/claude-hub/observability/docker-compose.yml up -d langfuse", "repairAdminRequired": false, "blocking": "required", "owner": "operator", "futureMigration": null },
      { "name": "cognee", "transport": "http", "supervisor": "nssm:CogneeMCP", "healthProbe": { "type": "http", "url": "http://127.0.0.1:8000/mcp/initialize" }, "healthProbeMode": "deep-only", "repairPolicy": "repair-only", "repairCommand": "nssm start CogneeMCP", "repairAdminRequired": true, "blocking": "required", "owner": "operator", "futureMigration": "uvx-stdio" },
      { "name": "ollama", "transport": "http", "supervisor": "manual", "healthProbe": { "type": "http", "url": "http://127.0.0.1:16700/api/tags" }, "healthProbeMode": "deep-only", "repairPolicy": "none", "blocking": "required", "owner": "operator", "futureMigration": null },
      { "name": "llamaswap", "transport": "http", "supervisor": "nssm:LlamaSwap", "healthProbe": { "type": "http", "url": "http://127.0.0.1:8090" }, "healthProbeMode": "deep-only", "repairPolicy": "repair-only", "repairCommand": "nssm start LlamaSwap", "repairAdminRequired": true, "blocking": "required", "owner": "operator", "futureMigration": "uvx-stdio" },
      { "name": "phoenix", "transport": "none", "supervisor": "nssm:Phoenix", "healthProbe": { "type": "advisory" }, "healthProbeMode": "deep-only", "repairPolicy": "none", "blocking": "advisory", "owner": "operator", "advisoryNote": "running-but-unwired per W392 audit; recommend nssm stop Phoenix" }
    ]
  }
}
```

- [ ] **Step 1: Add T2 typed-service descriptors to config (above schema).**
- [ ] **Step 2: Implement tools/eee-checks/t2-services.mjs** (~120 LOC; launch-fast = roster validation only; --deep = HTTP/stdio health-probe; --repair = invoke `repairCommand` if `repairPolicy != none`).
- [ ] **Step 3: Add T2 tests** (mock subprocess; verify roster-only in launch-fast; verify health-probe in --deep; verify repair-only-in-repair-mode).
- [ ] **Step 4: Run tests + commit + clean-merge.**

---

## Task 4 (W393.3, Wave-2): T3 CLI tools exact-probes

**Files:** `tools/eee-checks/t3-cli.mjs` + config additions + tests.

- [ ] **Step 1: Add t3.cliTools[] config entries** (each `{ name, probeCommand, minVersion, blocking, postWaveAdvisory }`):
  - **Required (current-state)**: node ≥22 · python ≥3.13 · gh + auth · codex ≥0.130 · claude ≥2.1.144 · gitleaks ≥8.30 · lefthook · pinact · pre-commit · trufflehog · osv-scanner · typos.
  - **Post-W392-advisory**: poutine · mcp-scan · opengrep · knip · markdownlint-cli2.
  - **Post-W389-Phase-0a-advisory**: inspect-ai · deepeval · promptfoo.
- [ ] **Step 2: Implement t3-cli.mjs** (~150 LOC; parse semver from probe output; compare to minVersion; tag postWaveAdvisory entries as advisory until cited wave PR lands).
- [ ] **Step 3: Tests + commit + merge.**

---

## Task 5 (W393.4, Wave-2): T4 GitHub state honest CURRENT-vs-FUTURE + **Slot A-E advisory** (SOTA Stream C integration)

**Files:** `tools/eee-checks/t4-github.mjs` + tests.

- [ ] **Step 1: T4 CURRENT-state module**:
  - `gh auth status` + scope check.
  - main HEAD reachable + tracking origin/main + no `.git/rebase-merge/`.
  - Ruleset query via `gh api repos/.../rulesets` → verify W387 ruleset active, 5 required checks present.
  - Codex-Verdict honest behavior probe (read `.github/workflows/codex-review.yml` → confirm current skip-on-missing-key + fail-only-on-BLOCK behavior).
  - Recent merge proof (`gh pr list --state merged --limit 5` within 7 days).

- [ ] **Step 2: T4 FUTURE-state advisory module (May-2026 SOTA; report-don't-block)**:
  - Copilot Coding Agent enabled (operator-side admin setting query).
  - skip-approval setting.
  - 2-ruleset bypass split presence.
  - merge_queue config.
  - **NEW (SOTA Stream C — pluggable-peer Slot A-E availability check)**: scan `.mcp.json.mcpServers` + `.claude/plugins/installed_plugins.json` for presence of:
    - **Slot A (MAF 1.0 orchestration)**: `agent-framework` pip pkg OR `microsoft/agent-framework` plugin → advisory absent.
    - **Slot B (LangGraph stateful graph)**: `langgraph` + `langgraph-checkpoint-postgres` OR LangGraph MCP wrapping → advisory absent.
    - **Slot C (PydanticAI cross-model tools)**: `pydantic-ai[mcp]` pip pkg → advisory absent.
    - **Slot D (Mastra TS A2A bridge)**: `mastra` npm pkg OR `mastra` plugin → advisory absent.
    - **Slot E (OpenHands sandbox peer)**: existing `openhands-dispatch` MCP entry (W375; PRESENT-expected) → advisory if missing.
  - All Slot A-D entries = ADVISORY until public-org transition (cite W393 §6).

- [ ] **Step 3: Implement (~250 LOC) + tests + commit + merge.**

---

## Task 6 (W393.5, Wave-2): T5 SOTA-drift derived-from-.mcp.json + stale-ref scan + **memory-tier-arbitration** (SOTA Stream B integration)

**Files:** `tools/eee-checks/t5-sota-drift.mjs` + tests.

- [ ] **Step 1: T5 SOTA-drift module**:
  - Parse `.mcp.json.mcpServers` dynamically; skip `disabled:true`; map each to `.eee/precheck-config.json:t5.mcpServers[<name>].metadata` for `required|advisory|credential-gated`.
  - In launch-fast: roster-validate only (no network).
  - In --deep: per-server smoke (cached TTL=24h in `.claude/state/eee-mcp-smoke.json`).
  - Stale-ref scan (W392-aligned): grep CLAUDE.md skill count vs filesystem · `.mcp.json _comments` for phoenix/graphiti/context7/gitnexus refs · `tools/lib/sca-telemetry-core.mjs:69` for `currentVersion='sca-v22'` · `.claude/schemas/sca-v22-repo-verdict.schema.json` presence · CLAUDE.local.md L79-90 current-tier wording.

- [ ] **Step 2: T5 memory-tier-arbitration check** (NEW; SOTA Stream B integration; cite memory-arbitration policy in `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:39-58`):
  - **T6 canonical**: verify `basic-memory` in `.mcp.json.mcpServers`; verify pinned-version field matches T6 declared version; AGPL-subprocess-wrap compliance note (advisory).
  - **T3 graph-RAG**: verify `cognee` MCP entry; verify NSSM service status (in --deep).
  - **T7 planned**: verify `mem0` MCP entry presence + OAuth config (advisory until W389 P0a #5 lands; cite mem0 v2.0.2 LoCoMo 91.6 / LongMemEval 94.8 / BEAM(1M) 64.1 per W389 P0a #5).
  - **T4 retired**: report graphiti MCP entry as PRESENT-and-retired OR ABSENT (informational only; no block).
  - **MemoryOS** watch-list: if MemoryOS-MCP entry present, advisory "verify license before promoting to T7" (cite EMNLP 2025 LoCoMo +49.11% F1 / +46.18% BLEU-1).
  - **AGPL-blocked**: confirm `khoj` MCP entry is ABSENT (block if present per W393 SOTA Stream B AGPL gate; cite legal review needed).
  - **License-risk inventory**: for each memory-tier entry, surface license field (`MIT|Apache-2.0|AGPL-3.0|UNCONFIRMED`); SARIF-emit if any UNCONFIRMED or AGPL not subprocess-wrapped.

- [ ] **Step 3: Memory-drift-eval cadence check** (Stream B operational protocol):
  - Last `mcp__basic-memory__recent_activity` orphan check < 7d → advisory if stale.
  - Last `bm orphan` CLI + mem0 top-50 audit < 30d → advisory if stale.
  - Last cognee version-bump smoke-test (remember→recall→forget round-trip) < 90d → advisory if stale.
  - Last full T6 export integrity check < 90d → advisory if stale.
  - On model-change boundary: re-benchmark mem0 LoCoMo regression → advisory if delta >2% from 91.6 baseline.

- [ ] **Step 4: Implement (~300 LOC) + tests + commit + merge.**

---

## Task 7 (W393.6, Wave-2): T6 Research-arch deep-checks + **multi-convergence routing rule** + **install-priority roster** (SOTA Stream A integration)

**Files:** `tools/eee-checks/t6-research-arch.mjs` + tests.

- [ ] **Step 1: T6 baseline manifest check (operator-PRIORITY tier)**:
  - File-manifest check: `tools/sota-discovery/discover.mjs` + `evaluate-v22.mjs` + `lib/{convergence,decision,compare,contract}.mjs` + `lib/fetchers/osv.mjs` + `lib/discovery/{shared,partitioner,score,coverage,github-search,readme-parse,facets-github,facets-external}.mjs` + `tests/sota-discovery/` + `.claude/schemas/sca-v22-repo-verdict.schema.json`.
  - **If files absent (current state)**: report ADVISORY ("W384 baseline missing; T6 deferred"); do NOT block.
  - **If files present**: validate `node --check` per file; smoke `node --test tests/sota-discovery/contract.test.mjs` < 30s; verify schema JSON-valid.
  - **Always check**: `tools/sota-discovery/gh-cascade.sh` + `duckdb-hf-hub-stats.sql` presence (verified-present current state).

- [ ] **Step 2: T6 forward-readiness (advisory)**:
  - **AdaptOrch DAG retrofit** (advisory until W389 P0a #6 lands): `tools/parallel-dag/dag-analyze.mjs` + `tools/preagent-parallel-guard.mjs` imports `classifyTopology`.
  - **GPT-Researcher MCP** (advisory until W389 P0a #5 lands; cite Stream A install-priority #1): `.mcp.json` includes `@assafelovic/gpt-researcher-mcp@<pinned>`.
  - **RDOE schema-firewall**: when contract.mjs present, verify `evaluate-v22.mjs` consumes only CandidateDossier (grep callers).
  - **Discovery-cache freshness**: last sca-v22 run in `Z:/claude-sota-installed-state/sca-v22-runs/` < 30d.

- [ ] **Step 3: T6 multi-convergence routing rule check** (NEW; SOTA Stream A integration; cite routing table in `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:17-26`):
  - Config check: ≥2 distinct **engines** from production/academic/compact/privacy/paper-QA/sandbox/self-improvement classes listed in `.mcp.json.mcpServers` + `.claude/plugins/installed_plugins.json`.
  - **Per-class engine roster** (advisory presence checks):
    - Production: gpt-researcher (`@assafelovic/gpt-researcher-mcp`) · DeerFlow 2.0 (`bytedance-deerflow` MCP if present).
    - Academic / paper Q&A: ARIS (`/research-pipeline` skill + arxiv-mcp) · STORM (knowledge-storm Python lib).
    - Compact / fast: gpt-researcher (`quick_search`) · ARIS (`/exa-search` skill).
    - Privacy / local: DeerFlow 2.0 (DDG zero-key + Ollama) · STORM (SearXNG self-hosted).
    - Sandbox / code-exec: DeerFlow 2.0 (AIO sandbox container) · ARIS (`/run-experiment` + Modal serverless).
    - Self-improvement / iteration: autoresearch (`:improve` slash-command) · DeepResearchAgent (SEPL optimizer).
  - **Multi-engine convergence guarantee**: assert `>=2-engine / >=3-source` routing rule enforced (advisory log if config indicates single-engine queries).
  - **Operator-flagged missing** (clone-required advisory): `dzhng/deep-research` · `paper-qa` · `local-deep-researcher`.

- [ ] **Step 4: T6 install-priority roster check** (NEW; Stream A install-priority list):
  - Advisory presence checks for each install-priority item:
    1. **gpt-researcher MCP** (primary production engine): `.mcp.json` has `gpt-researcher` server entry.
    2. **ARIS install**: `Z:/repos/deps/ARIS/tools/install_aris.sh` run-record OR 74 ARIS skills present in `.claude/skills/aris-*/`.
    3. **autoresearch plugin**: `installed_plugins.json` has `autoresearch@autoresearch` OR `uditgoenka/autoresearch` skill.
    4. **DeerFlow 2.0**: `Z:/repos/deps/deer-flow/` make-setup record present.
    5. **STORM**: `pip show knowledge-storm` returns ≥1.1.1.
    6. **DeepResearchAgent**: conda env `agentworld` present (niche; lowest priority).
  - All marked ADVISORY until the per-PR install lands.

- [ ] **Step 5: Implement (~400 LOC) + tests + commit + merge.**

---

## Task 8 (W393.7, Wave-3): Block-rules B1-B10 + test harness

**Files:** `tools/eee-checks/block-rules.mjs` + comprehensive `tools/eee-precheck.test.mjs`.

- [ ] **Step 1: Codify B1-B10 as a registry**:
  - B1 leaked-cred in tracked/staged file → "gitleaks protect --staged --redact"
  - B2 CR-2/CR-5 unsanctioned hook → "add CLAUDE.md cite-anchor or retire"
  - B3 sca-vN drift → "reconcile to canonical sca-v22 per W392 P0.1"
  - B4 Docker daemon down WHEN required → "Start Docker / nssm start docker"
  - B5 wave-lock collision → "use tools/eee.ps1 --Wave Wn --Slug s"
  - B6 GitHub auth expired → "gh auth login --scopes repo,workflow,admin:read"
  - B7 Research-arch broken (when files present + tests fail) → "Restore sca-v22 per W384 PR #44 @ 2a37eb7"
  - B8 RDOE schema-firewall breached → "Re-add firewall per W381 §5"
  - B9 Critical-stale MCP version → "npm install -g <pkg>@<declared>"
  - B10 GitHub Action SHA-pin floating in required-check workflow → "Run pinact run"

- [ ] **Step 2: Test harness — one test per block-rule**:
  - Mock the precondition; verify the rule fires correctly + correct exit code 2 + remediation message present.

- [ ] **Step 3: Auto-heal idempotency tests** (run twice; verify same outcome).
- [ ] **Step 4: Launch-fast latency budget tests** (T1 alone ≤5s; T1+T2+T3+T4+T5+T6 in --deep ≤30s with cache hits).
- [ ] **Step 5: Commit + clean-merge.**

---

## Task 9 (W393.8b, Wave-4): Operator runbook + config reference

**Files:** `docs/architecture/W393-EEE-CONTRACT/OPERATOR-RUNBOOK.md` + `docs/architecture/W393-EEE-CONTRACT/CONFIG-REFERENCE.md`.

- [ ] **Step 1: Operator runbook** — common scenarios:
  - `eee` default / `eee --deep` daily / `eee --repair` after PR-merge.
  - How to add new service to T2.
  - How to update CLI version pins in T3.
  - How to extend T6 with new research tool (cite Stream A install-priority roster; add to multi-convergence routing table).
  - How to migrate NSSM service to uvx-stdio (per Stream A futureMigration field).
  - **NEW**: How to install pluggable-peer slot (Slot A/B/C/D/E) when org-transition complete.
  - **NEW**: How to switch memory-tier (T6 vs T7) when LoCoMo benchmark regresses on model change.

- [ ] **Step 2: Config reference** — every key in `.eee/precheck-config.json` with type + example + when-used.

- [ ] **Step 3: Verify cite-floor (≥3 distinct citation orgs) + commit + clean-merge.**

---

## Self-Review

**1. Spec coverage:** Every W393 design §2 tier (T1-T6) + §3 auto-heal + §4 block-rules B1-B10 + §5 implementation arch + §6 GitHub lifecycle (including Slot A-E SOTA Stream C) + §7 forward-readiness + §8 multi-convergence routing rule + §9 phased plan has a corresponding task in this plan.

**2. SOTA-extraction integration:** Stream A (research-arch routing + install-priority roster) → T6. Stream B (memory-tier arbitration + drift-eval cadence) → T5. Stream C (pluggable-peer Slot A-E availability) → T4 FUTURE-state advisory.

**3. Placeholder scan:** All steps have executable code/commands or precise file paths. No TBD/TODO. Each task has TDD-discipline (write failing test → run → implement → run → commit).

**4. Type consistency:** `runT<N>` function signature consistent across t1-t6 modules; `{tier, blocked, healed, advisory}` return shape uniform; config schema fields match across tasks.

**5. DAG dependency check:** W393.1 (skeleton) MUST land before W393.2-W393.6 (per-tier modules register into orchestrator); W393.7 (block-rules + tests) MUST land after Wave-2 (all tier modules present); W393.8a (design landing) safe in Wave-1 parallel; W393.8b (operator runbook) needs Wave-3 test harness for accurate documentation.

---

## Execution Handoff

**Plan complete + saved to `docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md`** (lands via W401 admin-wave after W400 design PR #64 merges to main). Two execution options:

**1. Subagent-Driven (recommended for the 5-hour autonomous window)** — Dispatch a fresh subagent per task (or per wave for parallel waves), codex-gate per PR, iterate. Best fit for the autonomous-workflow mandate.

**2. Inline Execution** — Execute tasks in this session using `superpowers:executing-plans`, batch checkpoints.

**Recommendation**: Subagent-Driven — for the 5-hour autonomous window the orchestrator dispatches Wave-1 (2 parallel subagents) → polls merge → dispatches Wave-2 (5 parallel) → polls merge → Wave-3 → Wave-4. ~5-10 min per PR × 8 PRs = ~45-80 min wall-clock with parallel waves. After Wave-4: foundation enforcement layer LIVE + ready for the next layer-enhancement waves.

**SOTA-extraction integration anchors** (consult before per-task implementation):
- Stream A (research-arch) → `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:5-35` (multi-convergence routing table + install priorities).
- Stream B (memory+RAG) → `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:37-75` (memory-tier arbitration + license-risk + drift-eval cadence).
- Stream C (agent-runtime) → `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:76-101` (pluggable-peer Slot A-E + AVOID list).
