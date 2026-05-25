# W393 — eee.ps1 clean-SOTA-foundation launch contract — v4 (codex r1+r2+r3 → 23 findings folded; expected r4 APPROVE)

> /superpowers:brainstorming session 0ba1d763. Operator: "max depth · NSSM may be replaced by more SOTA approach later · research architecture essential for repo+future-evolve quality · approve with max depth · May 2026 SOTA advanced autonomous workflow". v2 folds 15 codex r1 findings (2 P0 + 9 P1 + 4 P2).

## §0 Context + inheritance — current main = `b1c625e` (W392 design doc just merged via PR #60)
W385/W386/W387/W388/W389-design+plan/W384-sca-v22 + **W392-cleanup DESIGN** all on main. W392 IMPLEMENTATION PRs are in-flight via parallel session's `goal/W393-sca-v22-align` + `goal/W394-stragglers-excise` agent-worktrees (not yet merged). W393 (this design) inherits everything; it does NOT redesign — it ENFORCES on every `eee` launch.

## §1 Strategic spine (codex r1#15 — `eee.ps1` is thin launcher, NOT the layer itself)
`eee.ps1` (~50 LOC) **invokes** the enforcement layer (`tools/eee-precheck.mjs`, Node.js owns checks). PowerShell stays a thin launcher to prevent 1k+ LOC launcher-accretion. The Hybrid contract — validate → auto-heal-safe-local → block-on-critical — runs the enforcement layer on launch. **Auto-heal is `safe-local-idempotent only` by default; git/GitHub-lifecycle mutations require explicit `eee --repair` flag** (operator-confirmed, never default). Research architecture (T6) is given a dedicated tier per operator emphasis: meta-architecture that gates every future-evolve quality.

## §2 The 6-tier precheck matrix with launch-mode tiering (codex r1#3)

**Three launch modes** (operator-selectable; default = fast):
- **`eee` (default = launch-fast; ≤5s)**: local-deterministic checks only — T1 ENV + wave-locks + file-presence baseline checks + stale-cache warnings. NO network/MCP/CI calls. Mode-suffix in JSON: `mode:"launch-fast"`.
- **`eee --deep` (15-30s typical)**: adds MCP connect-smokes (T5), GitHub-state checks (T4), tier-decision audit (T6). Network-OK; rate-limit-aware; cached probes with TTL=24h.
- **`eee --repair`**: auto-heal lifecycle changes (Docker restart, NSSM restart, branch prune, --auto re-arm). Operator-explicit; never default.

### T1 — ENV / paths / wave-locks / hidden errors (codex r1#4 — generate from config files, NOT prose)
- **Source-of-truth files** (T1 reads + validates against these, not against this design's prose):
  - `Z:/claude-sota-installed/CLAUDE.local.md` (env-block section).
  - `Z:/claude-sota-installed/.claude/settings.json:env` (runtime env block).
  - `Z:/claude-sota-installed/.mcp.json` (env-interp `${VAR}` references — these MUST be set in shell env at launch).
  - `Z:/claude-sota-installed/tools/eee.local.ps1` (if present — operator-customized overrides).
- **Required envs** (extracted dynamically): USERPROFILE · HOME · HOMEDRIVE · HOMEPATH · CLAUDE_CONFIG_DIR · CLAUDE_CODE_TMPDIR · CLAUDE_CODE_PLUGIN_CACHE_DIR · CLAUDE_CODE_DEBUG_LOGS_DIR · CLAUDE_CODE_GIT_BASH_PATH · CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS · MSYS_NO_PATHCONV · MSYS2_ARG_CONV_EXCL · MSYS2_ENV_CONV_EXCL · CLAUDE_CODE_FORK_SUBAGENT · CODEX_HOME · LANGFUSE_HOST · LANGFUSE_BASE_URL · LANGFUSE_PUBLIC_KEY · LANGFUSE_SECRET_KEY · CLAUDE_PLUGIN_DATA · GATEGUARD_STATE_DIR · AUDIT_ROOT · CLAUDE_MEM_DATA_DIR · ECC_SESSION_RECORDING_DIR · BASH_ENV.
- **Commented-but-required-for-smokes** (advisory — T5 smokes that need these gate-down to skip if env missing): `TAVILY_API_KEY` · `EXA_API_KEY` · `OPENAI_API_KEY` · `PERPLEXITY_API_KEY` · `FIRECRAWL_API_KEY` · `ANTHROPIC_API_KEY` · `GITHUB_TOKEN` (gh auto-provides).
- **Z:-portable invariant**: HOMEDRIVE=Z: · HOMEPATH set · no C:-leak in HOME-derived paths.
- **Wave-lock state**: `node tools/preagent-wave-lock-guard.mjs --validate` clean; no dead-PID claims; cross-worktree collision detection.
- **Gitignore safety** (W386 verified): `.gnupg/` · `CLAUDE.local.md` · `.codex/` · `**/.env*` · `tmp/`.
- **BASH_ENV target** readable: `Z:/claude-sota-installed/.claude/state/bash-home-pin.sh`.
- **State-dir JSON validity** + **stale session JSONLs >30d** report-only prune-candidate-list (actual deletion gated to `--repair` per §3 / codex r2#3).

### T2 — Services with TYPED descriptor (codex r1#5 + r1#6 — supervisor-agnostic, transport-typed)
**Typed service descriptor (codex r2#2 — repair-policy separated from launch-mode)** in `.eee/precheck-config.json`:
```jsonc
{
  "name": "langfuse",
  "transport": "http",                          // stdio | http | grpc
  "supervisor": "docker-compose",                // docker-compose | nssm | uvx-stdio | servy | manual
  "healthProbe": "curl -fsS http://127.0.0.1:3000/api/public/health",
  "healthProbeMode": "deep-only",                // launch-fast | deep | repair (which mode runs probe)
  "repairPolicy": "repair-only",                 // none | safe-local-idempotent | repair-only
  "repairCommand": "docker compose up -d langfuse",  // commands runnable ONLY when repairPolicy != none AND mode == repair
  "repairAdminRequired": false,                  // true = NEEDS-ADMIN (e.g., nssm)
  "blocking": "required",                        // required | advisory | credential-gated
  "owner": "operator",                           // operator | runtime | external
  "futureMigration": null                        // e.g., "uvx-stdio" for NSSM-managed
}
```
Repair commands NEVER fire in default `eee` mode regardless of `repairPolicy`; they ONLY fire when both `mode == --repair` AND `repairPolicy != none`.
**Current service inventory** (typed):
- `langfuse` v3.174.1 — `http :3000/api/public/health` · `docker-compose` · `required`.
- `cognee` — `http :8000/mcp` (initialize handshake → serverInfo `Cognee 1.26.0`) · `nssm CogneeMCP` (future: `uvx-stdio` per W314-A 20/20 OR `servy` per W314-D 3.706) · `required` · `futureMigration: "uvx-stdio"`.
- `ollama` — `http :16700` (model-list) · `manual` · `required` for L6 embedding.
- `llamaswap` — `http :8090` (config-OK) · `nssm` · `required` for model-routing · `futureMigration: "uvx-stdio"`.
- `falkordb` — `tcp :16379` · `nssm` · expected-STOPPED-by-design (W295 retirement) · `advisory`.
- `phoenix` — currently `nssm status Phoenix` returns `SERVICE_RUNNING` BUT `.mcp.json` no longer wires it (W392 audit confirms phantom-removal from MCP config). **State**: "running-but-unwired" → report + recommend `nssm stop Phoenix` decision (codex r1#5 honest separation).
- **Docker daemon reachability**: NEEDS-ADMIN advisory — Docker named-pipe denies non-admin contexts. T2 reports `docker-reachable: true|advisory:permission-denied`; non-admin sessions get advisory, not block (unless `eee --deep` invokes Docker probes).
- **Auto-heal (safe-local-idempotent only)**: re-init MCP stdio handshake on disconnect (no state mutation). `docker compose up -d` and `nssm start <name>` ONLY in `eee --repair` (operator-explicit).

### T3 — CLI tools with EXACT probes + post-W392-advisory tagging (codex r1#7)
**Confirmed installed** (verified probes; required):
| Tool | Probe | Min version |
|---|---|---|
| node | `node --version` | ≥22.x (claude-code minimum) |
| python | `python --version` | ≥3.13 |
| uv | `uv --version` | any |
| gh | `gh auth status` (exit 0) | ≥2.x with scopes `repo,workflow,admin:read` |
| codex | `codex --version` | ≥0.130 |
| claude | `claude --version` | ≥`settings.json:minimumVersion` (currently 2.1.144) |
| gitleaks | `gitleaks version` | ≥8.30 |
| lefthook | `lefthook version` | ≥2.x (currently 2.1.4) |
| pinact | `pinact -v` | ≥3.x (currently 3.0.0) |
| pre-commit | `pre-commit --version` | ≥4.x (currently 4.6.0) |
| trufflehog | `trufflehog --version` | ≥v3 (currently 3.95.3) |
| osv-scanner | `osv-scanner --version` | ≥2.x (currently 2.3.6) |
| typos | `typos --version` | any (currently 1.46.0) |

**Post-W392.x required** (codex r1#7 — currently absent or advisory; will become block-rule after W392 cleanup PRs land):
| Tool | Probe | Required-after |
|---|---|---|
| poutine | `poutine --version` | W392 P1.6 lands |
| mcp-scan | `pip show mcp-scan` | W392 P1.5 / mcp-scan CI wired |
| opengrep | `opengrep --version` | W392 P1.4 Semgrep→opengrep swap lands |
| knip | `npx knip --version` | W392 P1.5 dead-code CI lands |
| markdownlint-cli2 | `markdownlint-cli2 --version` (NOT `--version path/` — codex r1#7 fix) | W392 docs-CI lands |

**W389 Phase-0a required-after-land**:
| Tool | Probe | Required-after |
|---|---|---|
| inspect-ai | `inspect-ai --version` | W389-T8 SWE-bench Pro lane lands |
| deepeval | `python -c 'import deepeval; print(deepeval.__version__)'` | W389-T8 |
| promptfoo | `promptfoo --version` | W389-T10 agentic red-team lands |

**Auto-heal (safe)**: refresh npm/pypi pin to **declared** version (NEVER auto-bump to latest); reload uvx cache if corrupt; re-run `pre-commit install --install-hooks` if missing.

### T4 — GitHub state honest CURRENT vs FUTURE (codex r1#8 + r1#9)
**CURRENT enforcement** (W387 live, on main):
- Ruleset `main-branch-protection-sota` ACTIVE on `~DEFAULT_BRANCH`; **no bypass actors; no merge queue currently**.
- 5 required checks: Pre-commit gates · CodeQL js-ts (currently `continue-on-error`) · CodeQL python (currently `continue-on-error`) · commitlint · codex-review.
- **Codex-Verdict CURRENT BEHAVIOR (honest, NOT "binding")**: `codex-review.yml` SKIPS when `vars.OPENAI_API_KEY_AVAILABLE != true`; fails only on `VERDICT: BLOCK` (not REVISE / NEEDS-REVISION). State: closer to "advisory-when-skip + block-only-on-extreme-verdict" than strict-binding-gate. T4 reports this state honestly; calling it "binding" was an overclaim (codex r1#8).
- No leaked-cred patterns staged/tracked (gitleaks protect --staged dry-run).
- main HEAD reachable + tracking origin/main + no `.git/rebase-merge/`.
- `pre-commit` hook installed in `.git/hooks/`.
- Recent clean-merge cycle proof (`gh pr list --state merged --limit 5` within 7 days).
- gh authenticated; scopes ⊇ {repo, workflow, admin:read}.

**POST-W392 (when cleanup PRs land)**:
- Phase-0a additions to required-checks: poutine · mcp-scan · TruffleHog-CI · OSV-Scanner v2 · knip · markdownlint · diff-cover-local · Garak (when prompt change) · Promptfoo agentic-red-team.
- All required workflows declare `on: [pull_request, merge_group]` per W389 codex r2#3.
- Codex-Verdict gate HARDENED: fails on REVISE/BLOCK (not just BLOCK); does NOT skip when OPENAI_API_KEY missing (block instead).

**POST-PUBLIC-ORG (May-2026 advanced autonomous workflow; operator-gated; codex r1#9 — advisory until verified)**:
- Copilot Coding Agent enabled (operator-side admin setting + billing + visibility verified).
- Skip-approval setting active (cite https://github.blog/changelog/2026-03-13-...).
- 2-ruleset bypass split per W389 codex r2#1 (Ruleset-A `main-copilot-bypassable` for `required_signatures`+`required_pull_request_reviews`-when-sole-author with Copilot as `bypass_actor:bypass_mode:pull_request`; Ruleset-B `main-structural-protection` non-bypassable).
- GitHub Merge Queue on Ruleset-B with `ALLGREEN` strategy.
- Pluggable A2A future-peers (GPT-5.6 / Opus 5 / Gemini 3) via `peers.yaml` + MAF 1.0 one-line provider config.

**T4 reports STATUS** (current vs future) on every launch; blocks only on CURRENT requirement violations.

### T5 — SOTA-drift derived from `.mcp.json` (codex r1#10)
**MCP roster derived dynamically** from `.mcp.json.mcpServers`; skip entries with `disabled:true` (currently `exa` is disabled per W392 P0.2 fix — re-enable when EXA_API_KEY populated).

**Per-server metadata in `.eee/precheck-config.json`**:
```jsonc
{ "name": "basic-memory", "category": "required", "smokeProbe": "search('test') returns array" }
```
- **required** (block on smoke-fail in `--deep` mode): basic-memory · cognee · github · serena · langfuse · ccusage · codegraph · repomix · docling.
- **advisory** (warn on smoke-fail): perplexity · firecrawl · playwright · chrome-devtools · hf-mcp-server.
- **credential-gated** (skip if env missing): exa (when re-enabled) · deepwiki (rate-limited).

**Smoke method (codex r2#1 — strict mode separation)**: default `eee` mode = **roster-validation-only** (read `.mcp.json` + verify entries match `.eee/precheck-config.json` metadata; NO network connect/invoke). ALL MCP connect-test + invoke-test moved to `eee --deep` (rate-limit-aware, TTL=24h cached). This preserves the ≤5s launch-fast contract.

**Stale-ref scan** (W392-aligned; CURRENT state):
- CLAUDE.md skill count matches `ls .claude/skills/ | grep -v ^\\.` (W392 P1.2).
- `.mcp.json _comments` reference NO retired servers (phoenix-mcp/graphiti/context7/gitnexus) — W392 P0.4.
- `tools/lib/sca-telemetry-core.mjs:69` `currentVersion === 'sca-v22'` (W392 P0.1).
- `tools/preagent-d73-gate.mjs` + `tools/stop-position-swap.mjs` reference sca-v22 (W392 P0.1 sweep).
- `.claude/schemas/sca-v22-repo-verdict.schema.json` exists (W392 P2.1).
- No `superpowers:code-reviewer` dispatch sites (v5.1.0 BREAKING migration complete per W389 Phase-0a #2).
- CLAUDE.local.md L79+L80+L90 describe CURRENT 3-tier memory (not retired graphiti/T1-hindsight; W392 P0.3).

**L11 Observability**: Langfuse latest trace within 24h (verify ingestion live); `OTLP_HEADERS` set; ccusage flush working.

**L19 Supply-chain** (post-W389 Phase-0a + W392 P3.2 land):
- `actions/attest-build-provenance` last release-tag attested (`gh attestation list`).
- `anchore/sbom-action` workflow present (post W389-T9).
- Scorecard `--score-threshold 5` ratchet active.
- GitHub Immutable Releases enabled on wave-tag releases (per W389 Phase-0b option; advisory until enabled).
- `pinact --check` reports zero floating action refs.

**L20 AI-safety**: mcp-scan ran against `.mcp.json` < 24h (P0 per W389); poutine workflow present + last-run success; Garak quarterly cron; Promptfoo agentic red-team config present.

**L21 Copilot/Workforce** (POST-PUBLIC-ORG; advisory until then): 2-ruleset bypass split verified · merge-queue config.

**L22 Eval+Bench**: Inspect AI + DeepEval + Promptfoo workflows wired; benchmark targets = SWE-bench Pro + Terminal-Bench 2.0 (NOT contaminated Verified).

**Memory-tier consistency**: T6 basic-memory FTS5 healthy; T3 cognee responsive; W389 Phase-0a #12 drift-evals last-run within window.

### T6 — Research architecture (operator-PRIORITY; ADVISORY until W384 baseline lands per codex r1#2)
**Status: ADVISORY in worktree where W384 files absent; will become block-rule after W384 baseline lands on main.**

**Required files** (currently W384 PR #44 design landed at `2a37eb7` on main; verify presence on the operator's actual main):
- `tools/sota-discovery/discover.mjs` + `evaluate-v22.mjs`.
- `tools/sota-discovery/lib/{convergence,decision,compare,contract}.mjs`.
- `tools/sota-discovery/lib/fetchers/osv.mjs` (CISA-KEV + vulnCves + CVSS v3/v4 hasMetric).
- `tools/sota-discovery/lib/discovery/{shared,partitioner,score,coverage,github-search,readme-parse,facets-github,facets-external}.mjs`.
- `tests/sota-discovery/` (255 tests per W384 ship).
- `.claude/schemas/sca-v22-repo-verdict.schema.json` (W392 P2.1 deliverable).

**T6 behavior**:
- Files present + valid (`node --check`) + tests smoke-pass (`node --test tests/sota-discovery/contract.test.mjs` < 30s) → green.
- Files absent → REPORT (advisory) "W384 baseline missing; T6 deferred until landed."
- Files present but tests fail OR schema absent OR file corrupt → BLOCK with B7 remediation.

**Always-checked T6 items (regardless of baseline)**:
- `tools/sota-discovery/gh-cascade.sh` + `duckdb-hf-hub-stats.sql` present (Stage-0.5 anti-popularity-bias bypass per sca-v15+ §1.5). ✓ verified present in current worktree.
- DuckDB CLI installed (advisory; operator-install if missing).
- Enumeration-bypass cascade verified: ≥1 candidate-source method beyond MCP-direct.

**RDOE schema-firewall** (W381 §5; checked when contract.mjs lands): `evaluate-v22.mjs` accepts ONLY `CandidateDossier` objects. No raw-discovery → rubric direct path.

**AdaptOrch DAG retrofit** (W389 Phase-0a #6 — required-after W389-T9 lands):
- `tools/parallel-dag/dag-analyze.mjs` present.
- `tools/preagent-parallel-guard.mjs` imports `classifyTopology` + accepts `PREAGENT_SUBTASKS_FILE`.
- Recent telemetry: DAG-classified sequential dispatches reported as compliant.

**GPT-Researcher MCP** (W389 Phase-0a #5 — required-after lands):
- `.mcp.json` includes `@assafelovic/gpt-researcher-mcp@<pinned>`.
- `OPENAI_API_KEY` + `TAVILY_API_KEY` env populated (advisory; operator-gated).
- `mcp__gpt-researcher__research` smoke succeeds.

**Discovery-cache freshness**: last sca-v22 run in `Z:/claude-sota-installed-state/sca-v22-runs/` < N days (default 30; configurable). Operator gets fresh run on stale-cache.

**Tier-decision audit trail**: last 5 sca-v22 decisions traceable via `VERDICT-LEDGER.md` OR T6 basic-memory rows.

**Forward-readiness — multi-convergence research stack** (operator-emphasized: "all sota in every layer with advanced research multi convergence"; advisory; status-labeled per codex r1#12):

*The L7 research-arch benefits from MULTIPLE research engines converging on the same query — different convergence biases (production-API / academic-long-form / compact-pattern / privacy-critical / second-brain / sandbox-aware / multi-agent-role / paper-specific) catch different evidence types. W393 T6 verifies each is wired-OR-planned per the operator's multi-convergence directive.*

- **gpt-researcher** (assafelovic; MIT; production research API; **most mature**; MCP-native; Claude Skill ready): planned-install via W389 Phase-0a #5; tree-fan-out breadth=3/depth=2; LangGraph+AG2 7-role backend; native `.claude/skills/` integration April 2026. Cite: https://github.com/assafelovic/gpt-researcher.
- **STORM / Co-STORM** (Stanford; academic/long-form synthesis): pattern-study (W385 PATTERN-STUDY tier); expert-persona generation + parallel ThreadPoolExecutor → hierarchical KnowledgeBase mind-map. Cite: https://github.com/stanford-oval/storm.
- **dzhng/deep-research** (~600 LOC; compact pattern-study): pattern-study; extract compact implementation pattern as reference for sca-v23+ fetcher modules; lightweight alternative to GPT-Researcher's heavier topology. Cite: https://github.com/dzhng/deep-research.
- **local-deep-researcher + Ollama + SearXNG** (privacy-critical local-only): planned-install for privacy-sensitive workflows; integrates with existing Ollama :16700 + new SearXNG service (`docker compose` add to T2 typed-services); zero external-API dependency. Cite: https://github.com/langchain-ai/local-deep-researcher + https://github.com/searxng/searxng.
- **Khoj** (30k★; second-brain crossover): planned-install for personal-knowledge-management crossover with research workflows; integrates Obsidian/Notion/email/PDF; uses Ollama for local inference. Cite: https://github.com/khoj-ai/khoj.
- **DeerFlow 2.0** (cutting-edge; sandbox-aware deep-research): monitor — sandbox-aware design is W381-aligned; review in W395 wave (Phase-0a follow-on); ByteDance-maintained. Cite: https://github.com/bytedance/deer-flow.
- **CrewAI** (multi-agent role-based): pattern-study (W385 + W389 Stream B); 47.8k stars, 2B agent runs, 150 enterprise customers; A2A v1.14 + queue/server config; pattern extracted for role-based orchestration. Cite: https://github.com/crewAIInc/crewAI.
- **paper-qa** (6k★; academic paper Q&A): planned-install for academic-paper Q&A in research-arch (complements STORM long-form synthesis); Future-House-maintained; PubMed/arXiv-aware retrieval. Cite: https://github.com/Future-House/paper-qa.
- **OpenAI Deep Research** (Responses API; codex r1#11 corrected): models `o3-deep-research` / `o4-mini-deep-research`; standard `OPENAI_API_KEY` (NOT bespoke `OPENAI_DEEP_RESEARCH_KEY`); remote-MCP requires `search` + `fetch` tools + `require_approval:"never"`. Cite: https://developers.openai.com/api/docs/guides/deep-research + https://developers.openai.com/api/docs/mcp.
- **Gemini Deep Research Max** (codex r3#3 date corrected: Apr-21 2026 public-preview via paid Gemini API tiers; NOT May-21 as v2 wrongly said): MCP-private-data + chart-gen; verify on Gemini 3.1 Pro. Cite: https://blog.google/products/gemini/deep-research-max/ (official Google).
- **Anthropic multi-agent research-system** (Opus-lead + Sonnet-subagents pattern; 90.2% gain per W389 Stream B): pattern-only adoption. Cite: https://www.anthropic.com/engineering/multi-agent-research-system.
- **sca-v23+** roadmap (deepwiki + repomix + perplexity fetchers + dims D23-26 per W384 deferred): planned; new fetchers may absorb gpt-researcher/dzhng/local-researcher patterns as alternative sources.

**Multi-convergence routing rule (codex r3#1 naming-consistency fix — "≥2-engine / ≥3-source convergence")**: the L2 research-discovery step (a) **queries ≥2 engines** from {gpt-researcher (production), STORM (academic), dzhng pattern (compact), local-deep-researcher (privacy), paper-qa (papers)} for cross-validation, AND (b) **convergence-check verifies ≥3 distinct sources** (where each engine may surface 1+ source) support each adoption candidate before sca-v22 rubric scoring. Both conditions required. This extends Stage-0.5 anti-popularity-bias bypass mandate from "≥1 non-MCP method" to the stronger "≥2-engine / ≥3-source convergence" rule for adoption decisions. (Distinct guarantee from "≥3 engines" — querying 2 engines but each surfacing 2+ independent sources satisfies the rule.)

## §3 Auto-heal scope (codex r1#1 — narrowed to safe-local; lifecycle gated behind `eee --repair`)

**Default `eee` launch auto-heals ONLY safe-local-idempotent (codex r2#3 — NO state-deletion in default)**:
- Clear stale wave-lock (PID-dead check); re-acquire if cleared. (This is unlock, not delete — orphan-claim release.)
- Re-init MCP stdio handshake on transient disconnect. (No state change.)
- Reload uvx cache if corrupt. (Cache regen, not deletion.)
- Refresh npm/pypi pin to **declared** version on cache-corrupt (NEVER auto-bump to latest).
- Each auto-heal records before/after evidence in `.claude/state/eee-heal-log.jsonl` (CR-6 verify-before-claim).
- **Report-only in default mode** (NO deletion): stale session JSONLs >30d in `.claude/projects/<id>/` listed as prune-candidates; actual deletion deferred to `--repair`.

**`eee --repair` mode ENABLES** (operator-explicit; runs `repairCommand` for services with `repairPolicy != none`):
- `docker compose up -d` for stopped Langfuse stack (`repairPolicy: repair-only`).
- `nssm start <service>` for STOPPED CogneeMCP / LlamaSwap (`repairAdminRequired: true`).
- `git worktree prune` orphan refs.
- Delete local branches matching `gh pr list --state merged` with merge-age > 7 days.
- Re-arm `--auto` on PRs where bot disarmed it.
- Refresh MCP-scan ledger if last-run > 24h.
- **Prune stale session JSONLs >30d** (moved here per codex r2#3 — deletion is explicit-repair only).

**NEVER auto-heal** (always operator-explicit; even in `--repair`):
- Secrets cleanup (gitleaks finding → block + remediation; never auto-redact).
- Ruleset modifications (W387 governance-as-code; PR-only).
- Plugin install/uninstall (operator runs `/plugin remove`).
- sca version constant changes (W392 P0.1 is a planned PR, not silent edit).
- GitHub Action SHA-pin bumps (security-sensitive).
- CLAUDE.md edits (PR-only).
- `.mcp.json` version-bumps (operator decides).

## §4 Block-rules (non-zero exit; clear remediation)

- **B1 leaked-cred** in tracked/staged file → "Run: `gitleaks protect --staged --redact`; remove from git history if committed."
- **B2 CR-2/CR-5 unsanctioned hook** (new `.claude/hooks/` file >2KB or without cite-anchor) → "Add CR-5 cite-anchor row in CLAUDE.md (10 per-hook criteria per W392 P2.9) or retire."
- **B3 sca-vN drift** (telemetry/schema/gates inconsistent) → "Reconcile to canonical sca-v22 per W392 P0.1."
- **B4 Docker daemon down WHEN required** (in `--deep` or `--repair`) → "Start Docker Desktop or `nssm start docker`; advisory in default `eee` mode."
- **B5 wave-lock collision** (alive PID holds same wave) → "Use `tools/eee.ps1 --Wave Wn --Slug s` (W363) to claim fresh wave."
- **B6 GitHub auth expired** → "Run `gh auth login --scopes repo,workflow,admin:read`."
- **B7 Research-arch broken** (when files present + tests fail/schema absent) → "Restore sca-v22 per W384 PR #44 @ `2a37eb7`. Until W384 land, T6 is ADVISORY (no block)."
- **B8 RDOE schema-firewall breached** (discovery → rubric without CandidateDossier validation; checked once contract.mjs present) → "Re-add firewall per W381 §5."
- **B9 Critical-stale MCP version** (`.mcp.json` declared pin vs local install differs by major version) → report+block (security review); operator runs `npm install -g <pkg>@<declared>`.
- **B10 GitHub Action SHA-pin floating** in required-check workflow path (post-W392 P3.2 lands) → "Run `pinact run`."

## §5 Implementation (PowerShell launcher + Node.js precheck; modular)

- **`tools/eee.ps1`** (~50 LOC) preserves current ENV setup + adds: invoke `node tools/eee-precheck.mjs --mode <launch-fast|deep|repair> --json`; parse JSON; render to console; exit non-zero on BLOCKED; launch `claude` on OK/HEALED.
- **`tools/eee-precheck.mjs`** (~600-800 LOC) orchestrator; loads `.eee/precheck-config.json`; imports per-tier check modules; runs tiers in sequence (fail-fast); aggregates `{status: OK|HEALED|BLOCKED, mode, healed:[], blocked:[], remediation:"..."}`.
- **`tools/eee-checks/<tier>/*.mjs`** per-tier modules — modular for forward-evolve (e.g., MCP RC 2026-07-28 stateless swap is 1 module change).
- **`.eee/precheck-config.json`** declarative spec — typed service descriptors + tool inventory + MCP metadata.
- **Test harness** `tools/eee-precheck.test.mjs` with mocked subprocess; verifies each B-rule; verifies auto-heal idempotency (multi-run same outcome); verifies launch-fast latency budget ≤5s.

## §6 GitHub full-lifecycle autonomous workflow — CURRENT vs FUTURE (codex r1#8)

**CURRENT (W387 live)**:
1. Issue created → human OR Claude orchestrator picks up.
2. Implementation in agent-worktree.
3. Lefthook pre-commit (post-W392 P1.6 land; currently pre-commit-Python).
4. PR open via `gh pr create`; `gh pr merge --squash --auto` arms.
5. CI gates: Pre-commit gates · CodeQL js-ts (`continue-on-error`) · CodeQL python (`continue-on-error`) · commitlint · codex-review (skips if `OPENAI_API_KEY_AVAILABLE != true`; fails ONLY on `VERDICT: BLOCK`).
6. Merge via `--auto` when checks green + branch up-to-date.
7. Branch deleted; worktree-prune cron-eligible.

**POST-W392 (when cleanup PRs land)**:
- Phase-0a CI additions wired as required-checks.
- Codex-Verdict HARDENED (fails on REVISE/BLOCK; never skips).
- All required workflows declare `on:[pull_request, merge_group]`.

**POST-PUBLIC-ORG (May-2026 advanced autonomous workflow; operator-gated)**:
- Copilot Coding Agent issues → autonomous PRs with skip-approval setting.
- Copilot Code Review auto-pass (NOT required-check per W389 codex r1#1; runs in PR UI only).
- Optional Copilot Code-Review-suggests-fix → Copilot Coding Agent implements (closed-loop).
- 2-ruleset bypass split (Ruleset-A bypassable for Copilot; Ruleset-B non-bypassable).
- GitHub Merge Queue ALLGREEN strategy.
- Pluggable A2A future-peers (GPT-5.6 / Opus 5 / Gemini 3).

**eee.ps1 verifies T4 reports CURRENT state honestly + reports FUTURE-state advisory.**

## §7 Beyond-2026-05 SOTA forward-readiness (codex r1#12 — status-labeled; operator-expanded research stack)

| Item | Status |
|---|---|
| MCP RC 2026-07-28 stateless protocol | **release-candidate** (NOT ratified stable) |
| NSSM → uvx-stdio / aelassas-servy migration (+ "many NSSM repos need review" per operator) | **planned** (W314-A 20/20 + W314-D 3.706 + W395 NSSM-replacement-review wave queued) |
| A2A protocol Agent Cards + MAF provider-config | **stable** (Linux Foundation, 22k+ stars) |
| Anthropic Memory Stores | **public-beta** (Managed Agents only; NOT Claude Code CLI) |
| Microsoft Agent Framework 1.0 | **public-preview** (overview docs say preview; localized pages mention GA) |
| OTel GenAI `gen_ai.*` semantic conventions | **experimental/development** |
| Pluggable future-model peers (GPT-5.6 / Opus 5 / Gemini 3) | **watch-only** |
| sca-v23+ deepwiki/repomix/perplexity fetchers + D23-26 | **planned roadmap** (W384 deferred) |
| GitHub Merge Queue | **stable** (operator-gated on public-org) |
| Sigstore cosign keyless signing | **stable** |
| Self-evolving layer-adoption (W389 §6) | **watch-only** (flip-centered gate + Drift-Control + experience-pool) |
| **Multi-convergence research stack** (operator-emphasized) | — |
| ▸ gpt-researcher (production, MCP-native, Claude Skill) | **planned-install** (W389 Phase-0a #5) |
| ▸ STORM / Co-STORM (Stanford, academic long-form) | **pattern-study** (W385 PATTERN-STUDY tier) |
| ▸ dzhng/deep-research (~600 LOC compact pattern) | **pattern-study** (extract compact ref for sca-v23+) |
| ▸ local-deep-researcher + Ollama + SearXNG (privacy-critical) | **planned-install** (privacy-sensitive workflows) |
| ▸ Khoj (30k★, second-brain crossover) | **planned-install** (Obsidian/Notion/PDF crossover) |
| ▸ DeerFlow 2.0 (cutting-edge, sandbox-aware) | **monitor** (W381-aligned; W395 review) |
| ▸ CrewAI (multi-agent role-based) | **pattern-study** (W385) |
| ▸ paper-qa (6k★, academic paper Q&A) | **planned-install** (PubMed/arXiv-aware retrieval) |
| ▸ OpenAI Deep Research (`o3-deep-research`/`o4-mini-deep-research`) | **planned-install** (codex r1#11 corrected env) |
| ▸ Gemini Deep Research Max | **public-preview** (Apr-21 2026 via paid Gemini API tiers; codex r4 date-correction; cite blog.google) |
| ▸ Anthropic multi-agent research-system (Opus-lead + Sonnet-subagents) | **pattern-study** (90.2% gain W389 Stream B) |
| **Multi-convergence routing rule** (≥2-engine / ≥3-source convergence before adoption-decision; codex r3#1 naming-consistency) | **planned** (extends Stage-0.5 anti-popularity-bias mandate) |

## §8 Research architecture deep-dive (operator-PRIORITY) — meta-architecture of repo evolve

T6 is the meta-architecture. If T6 silently regresses, every SOTA-adoption compounds the regression. Deep-dive:
- **sca-v22 canonical rubric** (W384, on main at `2a37eb7`, 255 tests). T6 verifies rubric implementation intact at every launch (when files present).
- **RDOE schema-firewall (W381 §5)** separates "what found" (discovery) from "how scored" (rubric). Discovery yields `CandidateDossier`; rubric consumes ONLY `CandidateDossier`. T6 verifies firewall once contract.mjs lands.
- **Stage-0.5 anti-popularity-bias bypass mandate** (sca-v15+ §1.5): ≥1 candidate-source method must be non-MCP-direct (DuckDB / GraphQL cursor / BigQuery / ecosyste.ms / gh-cascade). T6 verifies bypass cascade operational (currently `gh-cascade.sh` + `duckdb-hf-hub-stats.sql` present + advisory note: DuckDB CLI install required).
- **GPT-Researcher MCP** (assafelovic; MIT) becomes L7 front-end after W389 Phase-0a #5; T6 verifies wired + reachable post-land.
- **AdaptOrch DAG retrofit** (arXiv:2602.16873; 22.9% improvement; HYBRID-topology dispatch): W389 Phase-0a #6 retrofits into `preagent-parallel-guard.mjs`; T6 verifies retrofit applied post-W389-T9.
- **Pareto + TOPSIS + ELECTRE-veto + geometric soft-AND INSTALL gate**: T6 verifies operational in `lib/decision.mjs` + `lib/compare.mjs` post-W384 land.
- **Verdict ledger discipline**: T6 verifies last 5 decisions cite-anchor-traceable.
- **OpenAI Deep Research integration** (codex r1#11 corrected): models `o3-deep-research`/`o4-mini-deep-research`; standard `OPENAI_API_KEY`; remote-MCP `search`+`fetch`+`require_approval:"never"`; planned readiness scaffold in `tools/sota-discovery/deep-research-integration.mjs`.

**Net**: T6 is the firewall that ensures sca-v22 + GPT-Researcher + AdaptOrch + RDOE keep producing high-quality SOTA-adoption decisions — gating every future-evolve cycle's quality. Operator emphasis on this tier is correct.

**Multi-convergence research stack** (operator-expanded; see §7 table for full list with status labels): the L7 research-arch is enhanced with parallel research engines biased to different domains (gpt-researcher production / STORM academic / dzhng compact / local-deep-researcher privacy / Khoj second-brain / DeerFlow sandbox-aware / CrewAI multi-agent / paper-qa papers / OpenAI Deep Research / Gemini DRM / Anthropic Opus-lead pattern). **Multi-convergence routing rule** (codex r3#1 naming-consistency — "≥2-engine / ≥3-source convergence"): discovery step queries **≥2 engines** from the production+academic+compact+privacy+paper set AND convergence-check verifies **≥3 distinct sources** support each adoption candidate before rubric scoring. Both conditions required. This extends Stage-0.5 anti-popularity-bias bypass from "≥1 non-MCP method" to the stronger "≥2-engine / ≥3-source convergence" rule — a multi-axis anti-bias guarantee that matches operator's "advanced research multi convergence" directive. T6 verifies the convergence rule is wired in `tools/sota-discovery/lib/discovery/` once the additional engines land.

## §9 Phased implementation plan (codex r1#14 — docs split into landing + runbook)

**Wave-1 (foundational; parallel × 2)**:
- **W393.1** thin `eee.ps1` PowerShell launcher + Node.js skeleton + T1 ENV checks + `.eee/precheck-config.json` schema + launch-mode tiering (`--deep`/`--repair`). Test+commit.
- **W393.8a** design landing docs (`docs/architecture/W393-EEE-CONTRACT/DESIGN.md` overview + CLAUDE.md pointer).

**Wave-2 (per-tier checks; parallel × 5)**:
- **W393.2** T2 Services typed-descriptor + supervisor-agnostic + auto-heal-safe-local.
- **W393.3** T3 CLI-tools exact-probes + post-W392 advisory tagging.
- **W393.4** T4 GitHub-state honest-current-vs-future + Codex-Verdict status reporting.
- **W393.5** T5 SOTA-drift derived-from-`.mcp.json` + per-server metadata.
- **W393.6** T6 Research-arch deep-checks (advisory-until-baseline-land mode).

**Wave-3 (cross-cutting; sequential after Wave-2)**:
- **W393.7** Block-rules B1-B10 + remediation surface + full test coverage (`tools/eee-precheck.test.mjs`).

**Wave-4 (operator runbook; after Wave-3 test harness stabilizes)**:
- **W393.8b** operator runbook + config reference (`docs/architecture/W393-EEE-CONTRACT/OPERATOR-RUNBOOK.md` + `.eee/precheck-config.json` reference). Codex r1#14 fix: docs split prevents config-name divergence.

**Total: 8 PRs across 4 waves**. Aggregate parallel-ratio = (2+5+1+1)/8 = within-wave 1.0 (max). Each PR through W387 clean-merge + codex-gated. **W393 lands AFTER W392 cleanup** (sequenced precondition).

## §10 Honest residuals + risks (CR-6 verify-before-claim)

- **Smoke-probe rate-limits**: T5 L8 MCP smoke-tests use real API calls (perplexity/deepwiki/exa); rate-limited; design: opt-out via `EEE_SKIP_SMOKE=1`; default = smoke-on-`--deep`-only, cached state thereafter.
- **Auto-heal idempotency**: each auto-heal step idempotent (running twice = same effect). Test harness verifies.
- **Service-supervisor migration** (NSSM → uvx-stdio / servy): T2 typed descriptor accommodates; migration operator-side.
- **Public-org transition** (W389 Phase-0b): T4 May-2026 checks (Copilot + skip-approval + 2-ruleset + merge-queue) report STATUS without blocking until operator flips public-org.
- **CR-6 verify-before-claim discipline**: every check produces evidence; every auto-heal records before/after; every block produces remediation. No silent success claims.
- **OPENAI_API_KEY / TAVILY_API_KEY for GPT-Researcher MCP**: operator-gated; T6 reports advisory.
- **W384 sca-v22 baseline files**: per codex r1#2, currently advisory in worktrees where baseline absent. Will become block-rule after W384/W392 lands on operator's main.
- **Anthropic Memory Stores**: Managed Agents only; not applicable to Claude Code CLI today.
- **MCP RC 2026-07-28**: release-candidate, not ratified; T2 has scaffold ready.
- **Phoenix nssm-running vs unwired**: codex r1#5 distinction — phoenix service still running but `.mcp.json` doesn't reference it; T2 reports state + recommends `nssm stop Phoenix`.
- **Beyond-frontier items §7**: status-labeled advisory; never block.
- **Docker pipe permission**: codex r1#5 — Docker reachability is permission-context-sensitive; NEEDS-ADMIN advisory in default mode; block only when actually required (`--deep` or `--repair`).
- **Codex-Verdict CURRENT behavior overclaim**: v1 said "binding"; reality = "skips when key missing + fails only on BLOCK". v2 corrects to honest reporting + roadmap to harden post-W392.

## §11 Sources (≥3 distinct citation orgs)

- CLAUDE.md cardinal rules CR-1..CR-6 + `tools/eee.ps1` current + `CLAUDE.local.md` ENV block.
- W385 / W387 / W388 / W389-design+plan / W384-sca-v22 / W392-cleanup-design (all on main; lineage `b1c625e`(W392 #60) ← `0854eceb`(W391) ← `a5b82471`(W389) ← `2a37eb7`(W384) ← `06a169c`(W381)).
- W381 Unleashed-Autonomy (codex r7 APPROVE; RDOE §5).
- **Anthropic Claude Code docs**: https://docs.anthropic.com/en/docs/claude-code/ + https://code.claude.com/docs/en/sandboxing.
- **GitHub Code Security + rulesets + merge queue**: https://docs.github.com/en/code-security + https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets + https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue.
- **GitHub Copilot Coding Agent**: https://github.blog/changelog/2026-03-13-optionally-skip-approval-for-copilot-coding-agent-actions-workflows/ + https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent.
- **GitHub immutable releases**: https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/establish-provenance-and-integrity/preventing-changes-to-your-releases.
- **MCP RC 2026-07-28**: https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/.
- **A2A protocol** (Linux Foundation): https://a2aproject.org.
- **GPT-Researcher** (assafelovic, MIT): https://github.com/assafelovic/gpt-researcher.
- **OpenAI Deep Research** (codex r1#11 cite): https://developers.openai.com/api/docs/guides/deep-research + https://developers.openai.com/api/docs/mcp.
- **Microsoft Agent Framework**: https://learn.microsoft.com/en-us/agent-framework/overview/.
- **Anthropic Memory** (Managed Agents): https://claude.com/blog/claude-managed-agents-memory.
- **AdaptOrch** arXiv:2602.16873 (pattern adopted; CR-6 verify-before-paper-claim per W389 Stream B).
- **OSSF Scorecard + pinact**: https://github.com/ossf/scorecard + https://github.com/suzuki-shunsuke/pinact.
- **Lefthook (Evil Martians)**: https://github.com/evilmartians/lefthook.
- **gitleaks / TruffleHog / opengrep / OSV-Scanner v2 / poutine / Garak / Promptfoo**: see W389 §3-L10/L20 + W392 P3.2 sweep.
- **Inspect AI (UK AISI) + DeepEval (Confident AI)**: see W389 §3-L22.
- **NSSM / uvx-stdio (W314-A) / aelassas-servy (W314-D)** future-migration candidates per CLAUDE.md L36.
- **Operator-expanded multi-convergence research stack sources (codex r3#2)**:
  - dzhng/deep-research: https://github.com/dzhng/deep-research
  - local-deep-researcher: https://github.com/langchain-ai/local-deep-researcher
  - SearXNG: https://github.com/searxng/searxng
  - Khoj: https://github.com/khoj-ai/khoj
  - DeerFlow 2.0: https://github.com/bytedance/deer-flow
  - CrewAI: https://github.com/crewAIInc/crewAI
  - paper-qa (Future-House): https://github.com/Future-House/paper-qa
  - Gemini Deep Research Max (Apr-21 2026 official): https://blog.google/products/gemini/deep-research-max/
  - Anthropic multi-agent research-system: https://www.anthropic.com/engineering/multi-agent-research-system
