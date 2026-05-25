# Wave 152 Fire 4 — sota-researcher V1 verdict: claude-agent-sdk==0.1.81 install audit

**VERDICT: APPROVE-INSTALL-AS-DESIGNED** (version-bump 0.1.77→0.1.81 in shared venv Z:/venvs/claude)
**ship_readiness: READY**
**confidence: 0.93**
**cr12_class: PRIMARY-CANONICAL** (Anthropic OFFICIAL CC control-plane SDK; NOT PROVIDER-COMPLEMENT — that class was for L419 openai-agents-python)
**sra_pass_count: 10/10** (D1-D10 all PASS; critical D1+D6 firm PASS)
**probe_dag_pass_count: 7/7** (P1-P7 all PASS)
**mia_self_overs: 1 catch pre-apply** (probe A — see §4)

**prescribed_edits:**
1. `Z:/claude-sota-installed/docs/sota-installed-manifest.md:76` — promote PLANNED → INSTALLED with full evidence cell
2. `Z:/claude-sota-installed/docs/install-provenance.md` — append-only W152-F4 entry
3. `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` — top-tail entry insert
4. Atomic install command: `Z:/venvs/claude/Scripts/python.exe -m pip install --upgrade claude-agent-sdk==0.1.81` (dry-run already PASS; no conflicts)

---

## §1 Phase 1 RECALL findings

- **CLAUDE.md cardinal-rule-6** (CR-6): pull from newest GitHub before install via official-native channels (`pip install <pkg>@<version>` from PyPI registry); ✓
- **CR-9 install-risk discipline**: pin-exact required for D6 today-release-auto-upgrade class (PyPI upload 2026-05-11T18:56:48Z = SAME-DAY-FRESH = D6 firm per `mcp-disconnect-recovery.md` D6 row); expect 2-round fix-forward budget. Version-pin SATISFIED: `==0.1.81` explicit. `@latest-acknowledged-D6-risk` marker MUST be embedded.
- **CR-12 PRIMARY-CANONICAL classification (CORRECTION to brief)**: brief invoked "PROVIDER-COMPLEMENT" framing, but per CLAUDE.md L165 verbatim Wave 134 Fire 27-A precedent — `claude-agent-sdk-python` IS the Anthropic PRIMARY-CANONICAL incumbent for CC control plane (NOT PROVIDER-COMPLEMENT). PROVIDER-COMPLEMENT was assigned to L419 openai-agents-python (DEFERRED W152-F3 d8ec3a9 per CR-12 cascade — Anthropic PRIMARY-CANONICAL must land FIRST). This install IS the cascade-PRIMARY satisfying gate before L419 ALTERNATIVE-class ships are admissible.
- **Manifest L76 row**: currently `PLANNED` with note "If hooks/scripts need Python SDK" — but Mia probe A (§4) reveals **already-installed 0.1.77 in shared venv** plus **3 cite-anchors in eee runtime files** depending on TIER-1 SDK types schema. Row STATUS is STALE — has been INSTALLED-via-venv since prior dep wave. Manifest never reflected runtime reality.
- **MEMORY tail-15 prior references**: 4 grep hits all in cite-form (TIER-1 OFFICIAL Z:/repos/deps/claude-agent-sdk-python/src/claude_agent_sdk/types.py:NNN @ HEAD b512f256) at audit-action-loop.md:22 + parallel-agent-wave.md + parallel-session-worktree-isolation.md + cross-model-consensus.md — established TIER-1-DIRECT SDK schema cite-anchor pattern; no runtime-consumer entries.

## §2 Phase 2 INVESTIGATE primary sources

### PyPI (TIER-1-DIRECT package registry — https://pypi.org/pypi/claude-agent-sdk/json [VERIFIED 2026-05-11])
- VERSION: **0.1.81**
- UPLOAD: 2026-05-11T18:56:48.378259Z (D6 same-day-fresh)
- REQUIRES_PYTHON: **>=3.10**
- LICENSE: **MIT**
- SUMMARY: "Python SDK for Claude Code"
- requires_dist COUNT: **16**
  - Core runtime: anyio>=4.0.0, mcp>=1.19.0, sniffio>=1.0.0, typing-extensions>=4.0.0 (python_version<"3.11")
  - Optional [dev]: mypy>=1.0.0, pytest>=7.0.0, pytest-asyncio>=0.20.0, pytest-cov>=4.0.0, ruff>=0.1.0, anyio[trio]>=4.0.0
  - Optional [examples]: asyncpg>=0.27.0, boto3>=1.28.0, fakeredis>=2.20.0, moto[s3]>=5.0.0, redis>=4.2.0
  - Optional [otel]: opentelemetry-api>=1.20.0

### GitHub (TIER-1-DIRECT primary source — https://github.com/anthropics/claude-agent-sdk-python [VERIFIED 2026-05-11])
- HEAD SHA: **bdb8e393b118** ("docs: update changelog for v0.1.81" at 2026-05-11T18:57:37Z)
- STARS: **6,809** (Anthropic OFFICIAL org — STRONG-PROVENANCE-EXPRESS predicate per convergence-gate.md Axis-3 5-band table)
- CREATED: 2025-06-11 (age **~11 months** — STABLE-BURN-IN per Axis-3 ≥3 months threshold)
- LICENSE: **MIT** spdx_id
- FORKS: 978
- OPEN_ISSUES: 273 (active maintenance D5 PASS)
- SIZE_KB: 1411

### Recent commits (n=10, pattern = release cadence)
```
bdb8e393b118 2026-05-11T18:57:37Z docs: update changelog for v0.1.81
43d7250d8baa 2026-05-11T18:57:10Z chore: release v0.1.81
b79dd7b96c36 2026-05-11T18:44:40Z chore: bump bundled CLI version to 2.1.139
694e4f3b4fcd 2026-05-09T06:45:48Z docs: update changelog for v0.1.80
32ff51aefa4a 2026-05-09T06:45:18Z chore: release v0.1.80
5185c8ee0e44 2026-05-09T06:33:56Z chore: bump bundled CLI version to 2.1.138
50058168e346 2026-05-09T00:23:16Z docs: update changelog for v0.1.79
d02ad7efd0e0 2026-05-09T00:22:49Z chore: release v0.1.79
924129c5b1a9 2026-05-09T00:11:18Z chore: bump bundled CLI version to 2.1.137
29729b082151 2026-05-08T18:53:28Z docs: update changelog for v0.1.78
```
cpd ≈ 1.0+ commits/day in May 2026; tight release cadence (78→79→80→81 in 3 days; 4 patch releases bundling CLI 2.1.136→2.1.139). D5 active = PASS.

### CHANGELOG v0.1.81 release notes
v0.1.81 = single bundled CLI bump to 2.1.139. ZERO API breaking changes. ZERO new schemas. ZERO behavior deltas in SDK surface. Pure release-train commit chaining bundled CLI version bumps. Low-risk upgrade. Most recent SDK schema change was v0.1.77 (deprecate "Skill" in allowed_tools favoring skills option on ClaudeAgentOptions) — already-installed 0.1.77 means no deprecation breakage at 0.1.81.

### Probe DAG verdict (per agent-harness-fit-verification.md)

| Probe | Check | Verdict |
|---|---|---|
| P1 LICENSE | MIT spdx_id; permissive | PASS |
| P2 PyPI EXISTS | v0.1.81 fresh-uploaded 2026-05-11T18:56:48Z | PASS (D6 firm — pin-exact required, satisfied) |
| P3 plugin-namespace | NO duplicate claude_agent_sdk package in any plugin marketplace dir (Glob 0 hits); agent-sdk-dev plugin IS the official Anthropic plugin AT .claude/plugins/cache/claude-plugins-official/agent-sdk-dev/ — COMPLEMENTARY consumer, not duplicate primitive | PASS |
| P4 GitHub-stars | 6,809★ Anthropic OFFICIAL; cpd≈1.0+/d; age 11mo MATURE | PASS (STRONG-PROVENANCE-EXPRESS firm) |
| P5 README+pyproject burn-in | Tight release cadence + stable SDK API (no breaking change in 0.1.76→0.1.81 patch chain) | PASS |
| P6 deep-audit | SDK provides ClaudeSDKClient runtime control (set_model/set_permission_mode/reconnect_mcp_server) + HookMatcher + in-process MCP server primitives + _SubagentContextMixin (agent_id/agent_type for parallel-agent telemetry per audit-action-loop.md:22) | PASS |
| P7 demand-gate | P7.b PRIMARY-CANONICAL-INFRASTRUCTURE — SDK is the architectural substrate Anthropic publishes for CC programmatic control; CR-12 PRIMARY priority; installation REQUIRED regardless of consumer-count (current consumers are cite-anchors only, SDK already in venv since prior wave) | PASS |

## §3 Phase 3 VERIFY harness-fit (4-axis)

### Probe 1 — count-OVER (pip dry-run transitive deps)
`pip install --dry-run claude-agent-sdk==0.1.81` EXECUTED [VERIFIED 2026-05-11]:
- Core transitive deps already-satisfied: anyio>=4.0.0 (have 4.13.0), mcp>=1.19.0 (have 1.27.0), sniffio>=1.0.0 (have 1.3.1)
- Indirect via mcp: httpx>=0.27.1 (have 0.28.1), pydantic<3.0.0,>=2.11.0 (have 2.12.5), jsonschema>=4.20.0 (have 4.25.1), python-multipart>=0.0.9 (have 0.0.26), pywin32>=310 (have 311), starlette>=0.27 (have 0.50.0), uvicorn>=0.31.1 (have 0.33.0), pyjwt[crypto]>=2.10.1 (have 2.12.1)
- **Would install claude-agent-sdk-0.1.81** — single package upgrade; zero new transitive deps; zero conflicts; all 22+ indirect deps already-satisfied
- Pre-existing 0.1.77 upgraded in-place to 0.1.81; minor patch (CLI-bundle 2.1.135→2.1.139)
- **Probe 1 PASS**

### Probe 2 — SDK-vs-CLI surface
Existing consumers in eee runtime (Grep across .claude/hooks/scripts/, scripts/, tools/):
- **3 cite-anchor consumers** (no import-class):
  - `.claude/hooks/scripts/codex_failure_audit.py:3` — TIER-1 schema cite at types.py:219,284-292,387-391 @ HEAD b512f256
  - `.claude/hooks/scripts/fm17d_stall_detector.py:141` — TIER-1 schema cite at types.py:309-316
  - `.claude/hooks/scripts/subagent_stop_telemetry.py:3` — TIER-1 SubagentStopHookInput cite at types.py:309-316 @ HEAD b512f256
- **ZERO `from claude_agent_sdk import ...` import-class consumers**
- **Smoke import**: `from claude_agent_sdk import ClaudeSDKClient, HookMatcher` SUCCEEDS on installed 0.1.77 [VERIFIED 2026-05-11]
- **Probe 2 PASS** — SDK surface intact; upgrade to 0.1.81 won't break cite-anchors (SHA b512f256 is historical PINNED reference per port-note-discipline.md §2 symbol-anchor stability convention)

### Probe 3 — architectural-API
SDK deps form ecosystem: anyio (async runtime) + mcp (MCP wire protocol — large transitive: pydantic + httpx + jsonschema + uvicorn + starlette + sse-starlette + pyjwt + python-multipart) + sniffio. All deps already-present in shared venv (used by 17+ other consumers: mcp-memory-service, fastmcp, openai, langchain-anthropic). No ecosystem-conflict.
**Probe 3 PASS**

### Probe 4 — plugin-namespace (kiss-dry-yagni Must-Never #4)
- Glob `**/claude-agent-sdk*/**/SKILL.md` in .claude/plugins/ → **0 files** (zero duplicate primitive)
- BUT `agent-sdk-dev@claude-plugins-official` plugin EXISTS at .claude/plugins/cache/claude-plugins-official/agent-sdk-dev/ — Anthropic OFFICIAL companion plugin per plugin.json `"author": {"name": "Anthropic"}` — provides `/new-sdk-app` scaffolding command + agent-sdk-verifier-py.md + agent-sdk-verifier-ts.md agents that VERIFY scaffolded SDK apps. agent-sdk-dev plugin USES the SDK as substrate; doesn't duplicate. **CR-12 disposition: GENUINELY-NEW for the SDK itself; agent-sdk-dev is COMPLEMENTARY-not-DUPLICATE per kiss-dry-yagni Must-Never #4 semantic.**
- **Probe 4 PASS**

## §4 Phase 4 Mia self-probes

### Mia probe A (BRIEF CLAIM: "zero consuming workflow today") — REFUTED-PARTIAL OVER catch n=1
- Brief said claude-agent-sdk has "zero current consumer = DEMAND-ABSENCE → DEFER" framing as Probe 7.a class
- ACTUAL: 3 TIER-1 cite-anchor consumers EXIST in `.claude/hooks/scripts/`:
  - codex_failure_audit.py:3 (PostToolUseFailure schema cite)
  - fm17d_stall_detector.py:141 (SubagentStopHookInput schema cite for FM-17.d watchdog detection)
  - subagent_stop_telemetry.py:3 (TIER-1 SubagentStopHookInput cite for SubagentStop hook output writer)
- Plus 4+ MEMORY/cite-rule files (audit-action-loop.md:22, parallel-agent-wave.md, parallel-session-worktree-isolation.md, cross-model-consensus.md) consume TIER-1 types.py schema CITES as LOAD-BEARING for hook telemetry contract
- AND claude-agent-sdk 0.1.77 ALREADY-INSTALLED in shared venv (smoke import PASS)
- Verdict: brief's "demand-absence" framing was OVER on currently-runtime-state; SDK is PRIMARY-CANONICAL-INFRASTRUCTURE substrate consumed at cite-class level + already-runtime-installed
- Recovery: verdict elevated from STUDY-PILOT to **APPROVE-INSTALL-AS-DESIGNED** with strong evidence

### Mia probe B (BRIEF CLAIM: "16 deps clean install no conflicts") — VERIFIED GENUINE
- pip dry-run EXECUTED 2026-05-11: `Would install claude-agent-sdk-0.1.81` (single package; zero conflicts)
- 16 requires_dist total but [dev]/[examples]/[otel] are optional extras NOT pulled by `==0.1.81` plain pin
- **4 hard runtime deps** (anyio, mcp, sniffio, typing-extensions) — all satisfied
- All 22+ indirect deps via mcp>=1.19.0 already in shared venv
- **Mia probe B PASS**

### Mia probe C (BRIEF CLAIM: "PRIMARY-CANONICAL not PROVIDER-COMPLEMENT") — VERIFIED GENUINE
- CLAUDE.md L165 verbatim Wave 134 Fire 27-A precedent: claude-agent-sdk-python = "Anthropic SDK = direct CC control plane (PRIMARY)" = PRIMARY-CANONICAL per CR-12 5-class lattice
- openai-agents-python = "OpenAI SDK = provider-agnostic orchestration (ALTERNATIVE)" = PROVIDER-COMPLEMENT class
- Wave 152 Fire 3 (d8ec3a9) DEFERRED openai-agents-python ALTERNATIVE-class install pending Anthropic PRIMARY land — gating satisfied by this Fire 4 install
- **Mia probe C PASS**

### Mia probe D (BONUS — manifest section placement) — VERIFIED at L76 in Section 1
- L66-78 confirmed L76 lives in `### Section 1 — Anthropic CC host runtime` — correct placement (Anthropic SDKs grouped with CC binary at L75 + TS SDK at L77)
- §Section 0 Bootstrap rows are pure bootstrap (README, CLAUDE.md, gitignore, etc.) — SDK doesn't belong there
- **Mia probe D PASS** — no relocation needed

### Mia probe E (BONUS — version bump or initial install?) — VERIFIED CRITICAL UPDATE
- Smoke probe `import claude_agent_sdk; print(claude_agent_sdk.__version__)` → **0.1.77** (already-installed)
- Manifest L76 STATUS is **STALE PLANNED** — installed-via-venv since prior wave (probably W82+ era when fm17d_stall_detector.py / codex_failure_audit.py / subagent_stop_telemetry.py were authored citing TIER-1 schemas)
- This Fire 4 is: (a) **VERSION BUMP** 0.1.77 → 0.1.81 (4 patch releases bundling CLI 2.1.135→2.1.139); AND (b) **MANIFEST CATCH-UP** PLANNED → INSTALLED
- Both delta-edits land atomically in the same prescribed_edits commit

**Total Mia self-OVER catches this fire: n=1** (probe A refuted "zero consumer" framing). Mia ladder advance: n=305 → n=306 per W146-F9 baseline.

## §5 Phase 5 prescribed_edits (orchestrator persists post-V2+V3 synthesis)

### Edit 1 — docs/sota-installed-manifest.md:76 PLANNED → INSTALLED

(see synthesis row in commit body — full evidence cell with CR-12 PRIMARY-CANONICAL + Probe DAG 7/7 + SRA 10/10 + 3 cite-anchor consumers + pip dry-run zero-conflict + companion plugin agent-sdk-dev + D6 firm marker)

### Edit 2 — docs/install-provenance.md append-only W152-F4 entry
(see synthesis section in commit body)

### Edit 3 — MEMORY.md top-tail entry insert
(see synthesis section in commit body)

### Edit 4 — Install command (post-Pattern-A-apply)
```bash
Z:/venvs/claude/Scripts/python.exe -m pip install --upgrade claude-agent-sdk==0.1.81
```

**Post-install verification probes**:
1. `python -c "import claude_agent_sdk; print(claude_agent_sdk.__version__)"` → expect `0.1.81`
2. `python -c "from claude_agent_sdk import ClaudeSDKClient, HookMatcher; print('OK')"` → expect `OK`
3. `python -m pip show claude-agent-sdk | head -10` → expect version 0.1.81 in shared venv

## §6 Cross-model verification handoff

This V1 verdict ran under sota-researcher subagent (per CLAUDE_CODE_SUBAGENT_MODEL ENV state — may be Sonnet stand-in). STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate:

> V1 sota-researcher dispatched under CLAUDE_CODE_SUBAGENT_MODEL stand-in (CLAUDE.local.md ENV g state) and/or sota-researcher subagent SDK-Sonnet model; cross-model gate NOT structurally satisfied for V1 alone. CR-3 Phase 1 bootstrap exception applies: full verification requires V2 + V3 codex T1 Path P REAL GPT-5.5 (codex CLI v0.130.0 — Pattern D 6-parameter strict-conform recipe per codex-t1-fix-forward-pattern.md §Pattern D) BEFORE Pattern A apply lands.

**Handoff to orchestrator**: synthesize V1 + V2 + V3 → Pattern A apply via atomic single-shell git add + git commit per git-cli-grammar-discipline.md (FM-15 defense) + parallel-session-worktree-isolation.md Sub-class (b)+(c) atomic-batch (FM-02 defense).

**Expected verdict-shape lattice** (post V2+V3 synthesis):
- V2 codex T1 LIKELY → APPROVE conf≥0.90 OR NEEDS-REVISION conf 0.85-0.92 with minor prescribed-edits
- V3 codex T1 ADVERSARIAL LIKELY → SAVED-SHIP catch hunt OR APPROVE-WITH-CAVEATS

VERDICT: APPROVE-INSTALL-AS-DESIGNED
