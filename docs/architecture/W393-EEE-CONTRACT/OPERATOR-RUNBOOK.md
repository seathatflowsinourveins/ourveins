# W393 eee.ps1 launch contract — Operator runbook

> **Status**: W393.8b Wave-4 (final Phase-0a PR). Lands post-W409 (block-rules + tests) on main. Cite: design spec [`docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md`](../../superpowers/specs/2026-05-25-W393-eee-contract-design.md); implementation plan [`docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md`](../../superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md). Config reference: [`./CONFIG-REFERENCE.md`](./CONFIG-REFERENCE.md). Design landing overview: [`./README.md`](./README.md).
>
> **Cite-floor**: this runbook cites (1) Anthropic Claude Code docs, (2) GitHub Code Security + Copilot docs, (3) internal wave anchors (W363 / W381 / W384 / W387 / W392 / W393 Stream A/B/C), satisfying the ≥3 distinct-citation-org requirement per CLAUDE.md cardinal rule 6 (CR-6 verify-before-claim).

---

## 1. Quick-start

Three modes ship; each is operator-selectable and additive in scope. Default is `launch-fast` (network-free, ≤5 s); `--deep` adds MCP smokes + GitHub state + T6 research-arch deep-checks; `--repair` adds lifecycle mutations (Docker / NSSM / branch / `--auto` re-arm).

```
# default — every interactive launch (≤5 s budget)
eee
# daily / pre-PR / after long pause (≤30 s budget; network + 24 h cache)
eee --deep
# after PR merge / suspend-resume / service crash (≤60 s budget; lifecycle mutations)
eee --repair
```

The `eee.ps1` launcher invokes `node tools/eee-precheck.mjs --mode <launch-fast|deep|repair> --json`. The orchestrator runs the tiers in sequence, aggregates `{status, mode, elapsedMs, tiers, blocked, healed, advisory, remediation}`, and exits **0 on OK or HEALED**, **2 on BLOCKED**, **3 on internal-error / unknown-mode**. PowerShell parses the JSON, renders to the console, and either launches `claude.exe` (status OK / HEALED) or exits with the remediation message (status BLOCKED).

### Mode flow

```
                       ┌─────────────────────────┐
                       │     eee.ps1 invoked      │
                       └────────────┬─────────────┘
                                    │
                          ┌─────────▼─────────┐
                          │  parse flag set   │
                          │  (--deep/--repair)│
                          └─────────┬─────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
     ┌────────────┐         ┌──────────────┐         ┌──────────────┐
     │ launch-fast│         │     deep     │         │    repair    │
     │   ≤ 5 s    │         │   ≤ 30 s     │         │   ≤ 60 s     │
     │  no net    │         │ net + TTL24h │         │ net + lifecycle
     └─────┬──────┘         └──────┬───────┘         └──────┬───────┘
           │                       │                        │
           │                       │                        │
           ▼                       ▼                        ▼
       T1 ENV               T1 ENV                     T1 ENV
       (roster scan)        T2 services HTTP probe     T2 services + repairCmd
                            T3 CLI probes              T3 CLI + refresh pins
                            T4 GitHub state            T4 GitHub state
                            T5 SOTA-drift smokes       T5 SOTA-drift
                            T6 research-arch deep      T6 research-arch
                                                       lifecycle: docker / nssm /
                                                       worktree prune / --auto re-arm /
                                                       JSONL ≥30d purge
           │                       │                        │
           ▼                       ▼                        ▼
       BLOCKED ?              BLOCKED ?                BLOCKED ?
       ├─ yes → exit 2 + remediation                   ├─ yes → exit 2
       └─ no  → exec claude.exe                        └─ no  → exec claude.exe
```

| Mode | Latency budget | Network | Tiers run | Lifecycle mutations |
|---|---|---|---|---|
| `eee` (default) | ≤ 5 s | NO | T1 + roster scan | safe-local-idempotent only (MCP stdio re-handshake, cache regen, dead-PID wave-lock unlock) |
| `eee --deep` | ≤ 30 s | YES (TTL 24 h) | T1 + T2 + T3 + T4 + T5 + T6 | same as default |
| `eee --repair` | ≤ 60 s | YES | all tiers + repair-commands | full lifecycle (`docker compose up -d <svc>`, `nssm start <svc>`, `git worktree prune`, `--auto` re-arm, stale JSONL ≥30 d purge) |

Cite: design spec §1-§3 (validate → auto-heal-safe-local → block-on-critical contract); Anthropic Claude Code env-vars / setup docs [`https://code.claude.com/docs/en/env-vars`](https://code.claude.com/docs/en/env-vars), [`https://code.claude.com/docs/en/setup`](https://code.claude.com/docs/en/setup).

### CLI flags (orchestrator)

```
node tools/eee-precheck.mjs --mode <launch-fast|deep|repair> [--json] [--config <path>]
```

- `--mode` — required-by-default-arg-parser; defaults to `launch-fast` if absent.
- `--json` — emit machine-parseable JSON to stdout (the launcher consumes this form).
- `--config` — override `.eee/precheck-config.json` path (used by tests).
- `--help` / `-h` — print usage banner and exit 0.

---

## 2. Per-tier troubleshooting — error code → remediation

The orchestrator prints `[B-T<n>-CODE] <detail>` followed by `→ <remediation>` for every BLOCKED entry. Use the table below as the verbatim lookup. **Block-rule labels (B1-B10)** wrap the canonical tier codes — both forms are listed.

### T1 ENV / paths / wave-locks / hidden errors

| Code | Trigger | Remediation |
|---|---|---|
| `B-T0-CONFIG` | `.eee/precheck-config.json` missing or unreadable | Restore `.eee/precheck-config.json` (see [`./CONFIG-REFERENCE.md`](./CONFIG-REFERENCE.md)). |
| `B-T0-MODE` | Unknown `--mode` value | Use one of `launch-fast`, `deep`, `repair`. |
| `B-T1-ENV-MISSING` | Required env var missing (e.g. `CLAUDE_CONFIG_DIR`) | Source `CLAUDE.local.md` env block; re-launch `eee` from a fresh PowerShell with the env populated. |
| `B-T1-Z-PORTABLE-LEAK` | `HOMEDRIVE != Z:` OR home-derived path leaks `C:` prefix | Re-source `CLAUDE.local.md` env block (see CLAUDE.local.md §"Z:-portable install ENV block"). |
| `B-T1-WAVE-LOCK-COLLISION` (B5) | Alive PID holds the same wave id | Use `tools/eee.ps1 --Wave Wn --Slug s` (W363) to claim a fresh wave number. |
| `B-T1-LEAKED-CRED` (B1) | gitleaks detected secret in tracked/staged file | `gitleaks protect --staged --redact`; remove from git history if already committed. |
| `B-T1-HOOK-UNSANCTIONED` (B2) | New `.claude/hooks/` file > 2 KB without CR-5 cite-anchor | Add CR-5 cite-anchor row in CLAUDE.md (10 per-hook criteria per W392 P2.9) OR retire the hook. |
| `A-T1-BASH-ENV-MISSING` | `BASH_ENV` target `.claude/state/bash-home-pin.sh` unreadable | Restore the file (it re-pins `HOME` after Git Bash `/etc/profile` munges it; see CLAUDE.local.md W317 Stream-C note). |
| `A-T1-STALE-JSONL` | Session JSONL > 30 d found under `.claude/projects/<id>/` | Report-only in `eee`/`eee --deep`; actual prune ONLY in `eee --repair`. |

Cite: design spec §2 T1; CLAUDE.local.md "Z:-portable install ENV block"; W363 wave-lock dispatcher per `docs/superpowers/plans/2026-05-21-W363-foundation-gap-closure.md`.

### T2 Services (typed-descriptor; supervisor-agnostic)

| Code | Trigger | Remediation |
|---|---|---|
| `B-T2-SERVICE-UNHEALTHY` | Required service `healthProbe` failed in `--deep` or `--repair` | Identify supervisor: `docker-compose` → `docker compose up -d <svc>`; `nssm:<Name>` → `nssm start <Name>` (may need elevated terminal if `repairAdminRequired:true`); `manual` → operator-side start. |
| `B-T2-DOCKER-DOWN` (B4) | Docker daemon unreachable when a `docker-compose`-supervised required service exists | Start Docker Desktop OR `nssm start docker`. **Advisory** in default `eee` mode (Docker named-pipe denies non-admin contexts; `A-BR-B4-DOCKER-PERM-ADVISORY` is the non-blocking shape). |
| `B-T2-DESCRIPTOR-INVALID` | Service entry in `.eee/precheck-config.json:t2.services[]` malformed | Fix the descriptor per [`./CONFIG-REFERENCE.md`](./CONFIG-REFERENCE.md) §t2. |
| `A-T2-PHOENIX-RUNNING-UNWIRED` | Phoenix running but `.mcp.json` no longer references it (W392 audit) | Run `nssm stop Phoenix` (or `docker compose stop phoenix` if migrated) OR re-wire `.mcp.json` if you intend to use it. Advisory-only. |

Cite: design spec §2 T2; W393 service-state snapshot `Z:/claude-sota-installed-state/W393-WAVE2-SERVICE-STATE-SNAPSHOT.md` (Phoenix supervisor correction: `docker-compose` not `nssm:Phoenix`); NSSM `https://nssm.cc/usage`; Docker named-pipe security per `https://docs.docker.com/engine/security/` (admin-gated pipe).

### T3 CLI tools (exact-probes)

| Code | Trigger | Remediation |
|---|---|---|
| `B-T3-CLI-MISSING` | Required CLI tool absent on PATH (e.g. `node`, `gh`, `codex`) | Install per [`./CONFIG-REFERENCE.md`](./CONFIG-REFERENCE.md) §t3 `probeCommand` / `minVersion`. Common installers: `winget install OpenJS.Nodejs.LTS` · `winget install GitHub.cli` · `npm install -g @openai/codex`. |
| `B-T3-CLI-VERSION-BELOW-MIN` | Tool version < `minVersion` | Upgrade per the tool's release channel (npm / pip / winget / official installer). E.g. `npm install -g @openai/codex@latest` (≥ 0.130). |
| `B-T3-GH-AUTH` (B6) | `gh auth status` exit ≠ 0 | `gh auth login --scopes repo,workflow,admin:read`. |
| `B-T3-PROBE-FAIL` | Probe subprocess threw (e.g. timeout, ENOENT) | Re-run `eee --deep`; if persistent, run the failing `probeCommand` manually to capture the error. |
| `A-T3-POST-WAVE-ADVISORY` | Tool with `postWaveAdvisory:true` still missing (e.g. `poutine`, `mcp-scan`, `opengrep`, `knip`, `markdownlint-cli2`, `inspect-ai`, `deepeval`, `promptfoo`) | Advisory-only until the cited wave PR (`postWaveCite`) lands. Install per the tool's docs ahead of the wave-promotion if you need it locally. |

Cite: design spec §2 T3 + post-W392 advisory tagging; `https://github.com/cli/cli` (gh); `https://github.com/openai/codex-cli` (codex); `https://github.com/gitleaks/gitleaks`.

### T4 GitHub state (current vs future)

| Code | Trigger | Remediation |
|---|---|---|
| `B-T4-GH-AUTH` (B6) | `gh auth status` failure or insufficient scopes | `gh auth login --scopes repo,workflow,admin:read`. |
| `B-T4-NO-ORIGIN` | `git remote get-url origin` empty | `git remote add origin <repo-url>` (operator-side; usually a fresh-clone bug). |
| `B-T4-REBASE-IN-PROGRESS` | `.git/rebase-merge/` exists | Resolve via `git rebase --continue` OR `git rebase --abort`. |
| `B-T4-RULESET-MISSING` | `main-branch-protection-sota` ruleset not active | Operator-side: restore W387 ruleset (governance-as-code; never auto-applied). |
| `B-T4-REQUIRED-CHECK-MISSING` | One of the 5 required-check contexts absent (Pre-commit gates / CodeQL js-ts / CodeQL python / commitlint / Codex-Verdict trailer) | Audit `.github/workflows/`; ensure the workflow file is on `main`; verify ruleset references the exact context name. |
| `B-T4-SHA-FLOATING` (B10) | GitHub Action SHA-pin floating in required-check workflow path | `pinact run` to repin floating refs to commit SHAs. |
| `A-T4-CODEX-REVIEW-SKIP` | `codex-review.yml` currently skips when `OPENAI_API_KEY_AVAILABLE != true` | Honest-reporting advisory; no action until W392 P3.x lands the hardening (fail on REVISE/BLOCK; never skip). |
| `A-T4-FUTURE-COPILOT-OFF` | Copilot Coding Agent not enabled | Advisory-only until public-org transition (cite design spec §6 + GitHub Copilot Coding Agent docs `https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent`). |
| `A-T4-SLOT-A-MISSING` ... `A-T4-SLOT-D-MISSING` | Pluggable-peer Slot A (MAF) / B (LangGraph) / C (PydanticAI) / D (Mastra) absent | Advisory-only until org-transition. See §7 below to install a Slot. |
| `A-T4-SLOT-E-MISSING` | Slot E OpenHands `openhands-dispatch` MCP entry absent | Should be PRESENT per W375; if absent, re-add `.mcp.json` entry. |

Cite: design spec §2 T4 + §6 CURRENT vs FUTURE; GitHub Rulesets `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets`; pinact `https://github.com/suzuki-shunsuke/pinact`.

### T5 SOTA-drift (derived from `.mcp.json`)

| Code | Trigger | Remediation |
|---|---|---|
| `B-T5-MCP-ENTRY-UNDECLARED` | `.mcp.json.mcpServers` entry without matching `.eee/precheck-config.json:t5.mcpServers[<name>]` metadata | Add the metadata block per [`./CONFIG-REFERENCE.md`](./CONFIG-REFERENCE.md) §t5 (`category`, `license`, `smokeProbe`, optional `credentialEnv`). |
| `B-T5-MCP-SMOKE-FAIL` | Required MCP server smoke-probe failed in `--deep` | Identify transport (stdio/http); for stdio, verify `npx -y <pkg>@<pin>` works manually; for http, verify the service is running (`T2`). |
| `B-T5-MCP-VERSION-STALE` (B9) | `.mcp.json` declared pin differs from local install by major version | `npm install -g <pkg>@<declared-pin-version>`; or for Python pins, `uv pip install <pkg>==<declared>`. |
| `B-T5-SCA-DRIFT` (B3) | `tools/lib/sca-telemetry-core.mjs:69` `currentVersion` ≠ `sca-v22` OR schema file `.claude/schemas/sca-v22-repo-verdict.schema.json` missing | Reconcile to canonical sca-v22 per W392 P0.1 sweep. |
| `A-T5-SCA-DRIFT` (B3 advisory escalation) | Same as above but emitted as advisory by T5 | B3 rule **escalates** the advisory to a block (`B3-ESCALATED-FROM-ADVISORY`) so precheck exits 2; remediation identical. |
| `B-T5-AGPL-PRESENT` | AGPL-blocked entry (e.g. `khoj`) found in `.mcp.json` | Remove the entry; legal review required for any AGPL network-service integration per W393 Stream B. |
| `A-T5-STALE-REF` | Retired-server name (`phoenix`, `graphiti`, `context7`, `gitnexus`, `memory`) referenced in `.mcp.json _comments` OR CLAUDE.md skill-count drift | Edit the stale reference per W392 stale-ref scan rules. |
| `A-T5-MEM-DRIFT-CADENCE` | Memory-tier drift-eval cadence window exceeded (7d recent-activity / 30d bm orphan / 90d cognee smoke / 90d T6 export integrity) | Run the cadence probe per §8 below. |

Cite: design spec §2 T5; W393 Stream B memory-tier arbitration `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:39-58`; W392 P0.1 sca-v22 canonical sweep; OWASP A06:2021 (Vulnerable & Outdated Components).

### T6 Research architecture (operator-PRIORITY tier)

| Code | Trigger | Remediation |
|---|---|---|
| `B7-T6-BASELINE-CORRUPT` | sca-v22 file in `baseline.fileManifest` fails `node --check` | Restore the file from main: `git checkout main -- tools/sota-discovery/<file>`. |
| `B7-T6-SMOKE-FAIL` | `tests/sota-discovery/test_contract.mjs` exits ≠ 0 within `smokeTimeoutMs` | Run `node --test tests/sota-discovery/test_contract.mjs` manually; fix the failing assertion; cite W384 PR #44 @ `2a37eb7` for the canonical baseline. |
| `B7-T6-SMOKE-TIMEOUT` | Smoke-test exceeded `smokeTimeoutMs` (default 30000 ms) | Re-run; if persistent, profile via `node --test --test-timeout=60000`. |
| `B7-T6-SCHEMA-INVALID` | `.claude/schemas/sca-v22-repo-verdict.schema.json` missing or non-JSON | Restore the schema per W392 P2.1; re-validate via `npx ajv-cli compile -s .claude/schemas/sca-v22-repo-verdict.schema.json`. |
| `B8-T6-RDOE-FIREWALL-BREACH` (B8) | `evaluate-v22.mjs` consumer bypasses `CandidateDossier` validation | Re-add firewall per W381 §5; reroute discovery → rubric only via `lib/contract.mjs:CandidateDossier`. |
| `A-T6-BASELINE-MISSING` | sca-v22 file manifest absent (current state on operator's main pre-W384) | Advisory-only ("W384 baseline missing; T6 deferred until landed"). No action needed; promotes to block-rule after W384 lands. |
| `A-T6-CASCADE-MISSING` | `tools/sota-discovery/gh-cascade.sh` OR `duckdb-hf-hub-stats.sql` absent | Re-add the Stage-0.5 anti-popularity-bias bypass cascade per sca-v15+ §1.5. |
| `A-T6-CONVERGENCE-LIGHT` | Multi-convergence routing rule wired with < 2 engines per class | Add engines to `.eee/precheck-config.json:t6.multiConvergenceRouting.engines[]` (see §5 below). |
| `A-T6-INSTALL-PRIORITY-MISSING` | Stream A install-priority item absent (gpt-researcher / ARIS / autoresearch / DeerFlow / STORM / DeepResearchAgent) | Advisory-only; install when prioritized per `.eee/precheck-config.json:t6.installPriority.items[]`. |
| `A-T6-DISCOVERY-CACHE-STALE` | Last sca-v22 run > `discoveryCacheTtlDays` (default 30 d) | Run a fresh sca-v22 discovery: `node tools/sota-discovery/discover.mjs --partition <topic>` (when baseline present). |

Cite: design spec §2 T6 + §8 deep-dive; W384 sca-v22 baseline `2a37eb7`; W381 §5 RDOE schema-firewall; W393 Stream A multi-convergence routing `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:5-35`.

---

## 3. Adding a new service to T2

T2 is fully **declarative** — add a typed-descriptor entry to `.eee/precheck-config.json:t2.services[]`; no code change required for standard supervisor types (`docker-compose` / `nssm:<Name>` / `uvx-stdio` / `servy` / `manual`).

### Step 1 — Append a service descriptor

Example diff: add a hypothetical `searxng` service for the privacy-critical local-deep-researcher workflow (W393 Stream A engine).

```jsonc
// .eee/precheck-config.json (excerpt) — append to t2.services[]
{
  "name": "searxng",
  "transport": "http",
  "supervisor": "docker-compose",
  "healthProbe": {
    "type": "http",
    "url": "http://127.0.0.1:8888/"
  },
  "healthProbeMode": "deep-only",
  "repairPolicy": "repair-only",
  "repairCommand": "docker compose -f Z:/claude-hub/observability/docker-compose.yml up -d searxng",
  "repairAdminRequired": false,
  "blocking": "advisory",
  "owner": "operator",
  "futureMigration": null
}
```

### Step 2 — Validate the config

```
npx ajv-cli validate -s .eee/precheck-config.schema.json -d .eee/precheck-config.json
```

The schema file is the formal contract; if absent in the current revision (W393.8b ships the runbook ahead of a separate schema-author PR), validate by running the orchestrator in dry-run form: `node tools/eee-precheck.mjs --mode launch-fast --json` and confirm `status` is not `B-T0-CONFIG`.

### Step 3 — Smoke the descriptor

```
node tools/eee-precheck.mjs --mode deep --json | jq '.tiers[] | select(.tier == "T2")'
```

You should see the new service emit either an `advisory` (when `blocking: advisory`) or a `blocked` (when `blocking: required` and the probe fails). The descriptor takes effect immediately; no restart needed.

### Step 4 — Field semantics (quick reference)

| Field | Type | Meaning |
|---|---|---|
| `name` | string | Stable id used in T2 output. |
| `transport` | `stdio` \| `http` \| `grpc` \| `none` | How the service is reached; `none` = informational only. |
| `supervisor` | `docker-compose` \| `nssm:<Name>` \| `uvx-stdio` \| `servy` \| `manual` | Which process supervisor owns lifecycle. |
| `healthProbe` | `{type:"http",url:"..."}` \| `{type:"stdio",cmd:"..."}` \| `{type:"advisory"}` | Probe spec for `--deep`. |
| `healthProbeMode` | `launch-fast` \| `deep-only` \| `repair-only` | Which mode runs the probe. |
| `repairPolicy` | `none` \| `safe-local-idempotent` \| `repair-only` | Whether `repairCommand` can fire and in which mode. |
| `repairCommand` | string | Shell command run ONLY when `mode == --repair` AND `repairPolicy != none`. |
| `repairAdminRequired` | bool | If true, operator must run the launcher from an elevated PowerShell. |
| `blocking` | `required` \| `advisory` \| `credential-gated` | Whether failures block launch. |
| `owner` | `operator` \| `runtime` \| `external` | Who is responsible for lifecycle. |
| `futureMigration` | `uvx-stdio` \| `servy` \| null | Planned supervisor swap (cite Stream A W314-A / W314-D). |

Cite: design spec §2 T2 typed-descriptor + codex r2 #2 repair-policy separation; CR-5 `https://docs.anthropic.com/en/docs/claude-code/settings` (sandboxing-only safety boundaries; lifecycle mutations gated to `--repair`).

---

## 4. Updating CLI version pins in T3

T3 is fully declarative — edit `.eee/precheck-config.json:t3.cliTools[]`.

### Step 1 — Bump `minVersion`

Example: codex CLI just released 0.135 with a security fix; raise the floor.

```jsonc
// .eee/precheck-config.json (excerpt)
{
  "name": "codex",
  "probeCommand": "codex --version",
  "minVersion": "0.135.0",
  "blocking": "required"
}
```

### Step 2 — Add a new required tool

```jsonc
// append to t3.cliTools[]
{
  "name": "ripgrep",
  "probeCommand": "rg --version",
  "minVersion": "14.0.0",
  "blocking": "required"
}
```

### Step 3 — Promote a `postWaveAdvisory` tool to required

When the cited wave lands, flip `postWaveAdvisory:true` to `false` (or remove it) and the tool becomes a hard requirement.

```jsonc
// after W392 P1.4 Semgrep → opengrep swap lands:
{
  "name": "opengrep",
  "probeCommand": "opengrep --version",
  "blocking": "required"
  // postWaveAdvisory removed — now required
}
```

### Step 4 — Validate

```
node tools/eee-precheck.mjs --mode launch-fast --json | jq '.tiers[] | select(.tier == "T3")'
# run --deep to actually probe versions
node tools/eee-precheck.mjs --mode deep --json | jq '.blocked'
```

Cite: design spec §2 T3 + post-W392 advisory tagging; semver parsing per `https://semver.org`.

---

## 5. Extending T6 with a new research tool

T6 is the meta-architecture gate; the **multi-convergence routing rule** (≥2-engine / ≥3-source convergence per W393 §8) must be preserved when adding new engines. The Stream A multi-convergence routing table at `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:5-35` maps each engine to one or more classes (production / academic / compact / privacy / paper-qa / sandbox / self-improvement).

### Step 1 — Decide the engine's class(es)

Pick from: `production` · `academic` · `compact` · `privacy` · `paper-qa` · `sandbox` · `self-improvement`. An engine may belong to more than one class (e.g. `gpt-researcher` ∈ `{production, compact}`).

### Step 2 — Append the engine to `multiConvergenceRouting.engines[]`

```jsonc
// .eee/precheck-config.json:t6.multiConvergenceRouting.engines[]
{
  "name": "paper-qa",
  "pipPackage": "paper-qa",
  "markerPath": "Z:/repos/deps/Future-House__paper-qa"
}
```

The probe surface accepts any of: `mcpServer` (string — entry in `.mcp.json`), `pipPackage` (string — verified via `pip show`), `pluginId` (string — entry in `.claude/plugins/installed_plugins.json`), `skillNamePrefix` (string[] — match against `.claude/skills/<prefix>*`), `markerPath` (string — absolute path that must exist), `condaEnvPath` (string — absolute path).

### Step 3 — Add the engine to one or more class rosters

```jsonc
// .eee/precheck-config.json:t6.multiConvergenceRouting.classes
{
  "paper-qa": ["aris", "storm", "paper-qa"]   // was ["aris", "storm"]
}
```

The convergence rule requires `minEnginesPerClass: 2` (default); meeting or exceeding this in every class you care about closes any `A-T6-CONVERGENCE-LIGHT` advisories.

### Step 4 — (optional) Add to install-priority roster

If the engine is "actively pursued", append to `installPriority.items[]` with a priority rank:

```jsonc
// .eee/precheck-config.json:t6.installPriority.items[]
{
  "name": "paper-qa",
  "priority": 7,
  "pipPackage": "paper-qa",
  "markerPath": "Z:/repos/deps/Future-House__paper-qa"
}
```

### Step 5 — Verify cite the routing rule

The `ruleWiringPatterns` set (in `multiConvergenceRouting`) is scanned across `tools/sota-discovery/lib/discovery/*.mjs` + `tools/sota-discovery/lib/convergence.mjs` to confirm the `≥2-engine / ≥3-source` rule is wired in code. After landing the engine, run `eee --deep` and confirm no `A-T6-CONVERGENCE-LIGHT` advisory.

Cite: design spec §2 T6 + §8 (multi-convergence routing rule); Stream A install-priority roster `W393-SOTA-EXTRACT-NOTES.md:28-35`; Anthropic engineering blog `https://www.anthropic.com/engineering/multi-agent-research-system` (Opus-lead + Sonnet-subagents pattern, 90.2 % gain).

---

## 6. Migrating an NSSM service to uvx-stdio

The `futureMigration` field on a T2 descriptor marks NSSM-managed services queued for swap to `uvx-stdio` (lighter; auto-versioned; cache-resilient) per the W314-A pilot (20/20 score). The currently flagged migrations are `cognee` and `llamaswap`.

### Step 1 — Confirm the upstream uvx-stdio variant exists

```
# for cognee
uvx --from cognee-mcp cognee-mcp --help
# success = upstream pkg has a uvx-stdio entry-point
```

### Step 2 — Stop the NSSM service

```powershell
# elevated PowerShell
nssm stop CogneeMCP
nssm status CogneeMCP  # SERVICE_STOPPED
```

### Step 3 — Update `.mcp.json` to use uvx-stdio

```jsonc
// .mcp.json (excerpt)
{
  "cognee": {
    "command": "uvx",
    "args": ["--from", "cognee-mcp", "cognee-mcp"],
    "env": { "..." : "..." }
  }
}
```

### Step 4 — Update the T2 descriptor

```jsonc
// .eee/precheck-config.json:t2.services[] (excerpt) — change cognee
{
  "name": "cognee",
  "transport": "stdio",                       // was http
  "supervisor": "uvx-stdio",                  // was nssm:CogneeMCP
  "healthProbe": {
    "type": "stdio"
  },
  "healthProbeMode": "deep-only",
  "repairPolicy": "none",                     // uvx is self-managed
  "repairAdminRequired": false,
  "blocking": "required",
  "owner": "operator",
  "futureMigration": null                     // migration complete
}
```

### Step 5 — Smoke

```
eee --deep
# verify cognee T2 entry green; verify .mcp.json stdio handshake succeeds
```

### Step 6 — Remove the NSSM service (after burn-in)

```powershell
# after a few days of stable operation
nssm remove CogneeMCP confirm
```

Cite: W314-A uvx-stdio pilot (20/20 score) + W314-D aelassas-servy alternative (3.706 staged-pilot); CLAUDE.md L36 NSSM-replacement note; W393 §2 T2 `futureMigration` field; `uv` docs `https://docs.astral.sh/uv/`.

---

## 7. Installing a pluggable-peer Slot (A / B / C / D / E)

T4 reports the presence of 5 Slots from W393 Stream C. Slots A-D are advisory-always-until-public-org-transition; Slot E (OpenHands) should already be present per W375.

### Slot A — Microsoft Agent Framework 1.0 (orchestration)

```
# Install
uv pip install agent-framework
# Verify
python -c "import agent_framework; print(agent_framework.__version__)"
# Cite: https://learn.microsoft.com/en-us/agent-framework/overview/
```

T4 probe: `pipPkg: "agent-framework"` OR plugin matching `agent-framework|microsoft.*agent-framework`.

### Slot B — LangGraph (stateful graph)

```
# Install both
uv pip install langgraph langgraph-checkpoint-postgres
# Verify
python -c "import langgraph; from langgraph_checkpoint_postgres import PostgresSaver"
# Cite: https://github.com/langchain-ai/langgraph
```

T4 probe: `pipPkg: "langgraph"` AND `checkpointPkg: "langgraph-checkpoint-postgres"` OR LangGraph MCP server.

### Slot C — PydanticAI (cross-model tools)

```
uv pip install "pydantic-ai[mcp]"
python -c "import pydantic_ai.mcp"
# Cite: https://ai.pydantic.dev/
```

T4 probe: `pipPkg: "pydantic-ai"` + `extraImportTest: "import pydantic_ai.mcp"`.

### Slot D — Mastra (TS A2A bridge)

```
npm install -g mastra
mastra --version
# Cite: https://mastra.ai/
```

T4 probe: `npmGlobalPkg: "mastra"` OR plugin matching `\bmastra\b`.

### Slot E — OpenHands sandbox peer (expected PRESENT per W375)

Already wired via the `openhands-dispatch` MCP entry per W375. If T4 reports `A-T4-SLOT-E-MISSING`, restore the entry to `.mcp.json` per the W375 install record.

```jsonc
// .mcp.json (excerpt)
{
  "openhands-dispatch": {
    "command": "npx",
    "args": ["-y", "@openhands/dispatch-mcp@<pinned>"]
  }
}
```

Cite: design spec §6 May-2026 advanced autonomous workflow; W393 Stream C `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:76-101`; A2A protocol `https://a2aproject.org`.

---

## 8. Switching memory-tier (T6 vs T7) on LoCoMo regression

The W393 Stream B memory-tier arbitration policy uses T6 (`basic-memory`, AGPL-3.0 subprocess-wrapped) as canonical write-primary, with T7 (`mem0`, Apache-2.0, planned) standing by behind the **LoCoMo 91.6** baseline. If a model change regresses LoCoMo by > 2 %, the operator may switch primary writes to T7. **License-risk and OAuth requirements differ**; review before switching.

### Step 1 — Re-benchmark on the new model

Use the W393 Stream B drift-eval cadence (`memoryDriftCadence`):

```
# on model-change boundary
python tools/memory-bench/locomo.py --tier T6 --model <new-model>
python tools/memory-bench/locomo.py --tier T7 --model <new-model>
# compare scores; cite Stream B 91.6 baseline
```

### Step 2 — If T6 regression > 2 % AND T7 unchanged

Switch primary to T7. Steps:

1. Install mem0 v2.0.2: `uv pip install mem0ai==2.0.2`.
2. Configure OAuth credentials (mem0 requires HTTP+OAuth; populate per [`https://mem0.ai/docs`](https://mem0.ai/docs)).
3. Add `.mcp.json` entry for `mem0`.
4. Update `.eee/precheck-config.json:t5.memoryTiers.T7.blocking` from `"advisory"` to `"required"`.
5. Update `.eee/precheck-config.json:t5.memoryTiers.T6.blocking` from `"required"` to `"advisory"` (keep as fallback).
6. Run `eee --deep` and confirm T7 reports `category: required` healthy.

### Step 3 — Drift-eval cadence breaches (advisory; not block)

Even when T6 is canonical, advisories surface at:

- **Recent-activity > 7 d**: `mcp__basic-memory__recent_activity` returns nothing → operator activity gap.
- **bm orphan > 30 d**: stale notes accumulating; run `bm orphan` CLI to inventory.
- **cognee smoke > 90 d**: per-version-bump remember→recall→forget round-trip not exercised.
- **T6 export-integrity > 90 d**: full export integrity check overdue.

Address each by running the cited probe; eee `--deep` will clear the advisory on the next launch.

Cite: design spec §2 T5 memory-tier-arbitration; W393 Stream B `Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:39-75`; mem0 v2.0.2 LoCoMo 91.6 / LongMemEval 94.8 / BEAM(1M) 64.1 per W389 P0a #5; basic-memory AGPL-3.0 subprocess mitigation per W295.

---

## 9. Emergency bypass

The eee precheck is **never the only safety boundary** — Claude Code permissions + sandboxing remain primary per CR-5. When the precheck blocks a legitimate launch (e.g. transient network failure during T5 smokes, false-positive in B10 SHA-pin scan, operator broken-state during research-arch baseline migration), the operator can set the bypass env var to short-circuit the check.

### Conditions

Bypass is sanctioned **only** when CR-5 condition (b) holds: a temporary, operator-acknowledged broken-state where the binding gate would block a legitimate workflow, AND the operator commits to fix the underlying issue before next clean launch.

### Activation

```powershell
# one-shot bypass for the current shell
$env:EEE_PRECHECK_BYPASS = '1'
eee
# remove after launch
Remove-Item Env:\EEE_PRECHECK_BYPASS
```

When `EEE_PRECHECK_BYPASS=1` is set, the `eee.ps1` launcher prints a loud yellow warning, invokes the precheck for **reporting only**, and proceeds to `claude.exe` regardless of exit code. This matches the CR-5 dual-mode design for `tools/preagent-{parallel-guard,subagent-validator}.mjs` (advisory exit 0 + binding exit 2; operator-bypass via env per W331 r4 surgical race-condition mitigation).

### What bypass does NOT skip

- **Gitleaks pre-commit gate** — still runs on every commit (cite CR-5 §1).
- **Codex-Verdict trailer** — still enforced on PR merge.
- **Wave-lock collision** — wave-lock writes are atomic via `tools/preagent-wave-lock-guard.mjs --acquire` (PowerShell delegates to Node guard); bypassing precheck does NOT bypass the lock.
- **Plugin / CLI cardinal-rule guards** — still active.

Cite: CR-5 corollary at `docs/architecture/W329-R5-CORROLLARY-PATCHC1/{ACCEPTANCE-RECORD-DRAFT.md,R5-COROLLARY-DETAIL.md}`; W331 r4 in-session-bypass-marker; sandboxing `https://code.claude.com/docs/en/sandboxing`.

---

## 10. Block-rules B1-B10 — full reference

The complete B-rule registry lives at [`tools/eee-checks/block-rules.mjs`](../../../tools/eee-checks/block-rules.mjs); each rule's `BLOCK_RULES[<id>].remediation` field is the source-of-truth string emitted by the orchestrator. The table below is the verbatim pull (cite-source: `tools/eee-checks/block-rules.mjs` HEAD `988ffe3`).

| Id | Rule name | Trigger (canonical tier-block codes) | Remediation |
|---|---|---|---|
| **B1** | `B1-LEAKED-CRED` | `B-T1-LEAKED-CRED` / `B-T<n>-LEAKED-CRED*` — gitleaks finds a secret in tracked/staged file | `gitleaks protect --staged --redact` |
| **B2** | `B2-CR2-CR5-UNSANCTIONED-HOOK` | `B-T1-HOOK-UNSANCTIONED` / `B-T<n>-HOOK-UNSANCTIONED*` — new `.claude/hooks/` file > 2 KB without CR-5 cite-anchor (CLAUDE.md per-hook criteria) | add CLAUDE.md cite-anchor or retire |
| **B3** | `B3-SCA-VN-DRIFT` | `B-T5-SCA-DRIFT` / `B-T5-SCA-*` AND `A-T5-SCA-DRIFT` advisory escalation to block — telemetry constant, schema file, or gate references inconsistent with canonical `sca-v22` | reconcile to canonical sca-v22 per W392 P0.1 |
| **B4** | `B4-DOCKER-DAEMON-DOWN` | `B-T2-DOCKER-DOWN` OR probe-driven: T2 reports a docker-compose-supervised required service as unhealthy + `docker version` fails non-permission-only (permission-only failures reclassify to `A-BR-B4-DOCKER-PERM-ADVISORY`) | Start Docker / `nssm start docker` |
| **B5** | `B5-WAVE-LOCK-COLLISION` | `B-T1-WAVE-LOCK-COLLISION` / `B-T1-WAVE-LOCK*` — alive PID holds same wave | use `tools/eee.ps1 --Wave Wn --Slug s` |
| **B6** | `B6-GH-AUTH-EXPIRED` | `B-T4-GH-AUTH` / `B-T4-GH-AUTH*` — `gh auth status` exit ≠ 0 | `gh auth login --scopes repo,workflow,admin:read` |
| **B7** | `B7-RESEARCH-ARCH-BROKEN` | `B7-T6-*` family — `B7-T6-BASELINE-CORRUPT`, `B7-T6-SMOKE-FAIL`, `B7-T6-SMOKE-TIMEOUT`, `B7-T6-SMOKE-SPAWN-ERROR`, `B7-T6-SMOKE-SPAWN-THREW`, `B7-T6-SCHEMA-INVALID` (only when baseline files PRESENT — absent files → advisory) | Restore sca-v22 per W384 PR #44 |
| **B8** | `B8-RDOE-SCHEMA-FIREWALL-BREACH` | `B8-T6-RDOE-FIREWALL-BREACH` / `B8-T6-RDOE*` — discovery → rubric path bypasses `CandidateDossier` validation (checked once `contract.mjs` lands) | Re-add firewall per W381 §5 |
| **B9** | `B9-CRITICAL-STALE-MCP` | `B-T5-MCP-VERSION-STALE` OR probe-driven: parse `.mcp.json` pinned `<pkg>@<x.y.z>` vs `npm ls -g --json` local install; major-version mismatch = stale (Python pins inconclusive — uvx caches per-call) | `npm install -g <pkg>@<declared>` |
| **B10** | `B10-GH-ACTION-SHA-FLOATING` | `B-T4-SHA-FLOATING` / `B-T4-PINACT-FLOATING` OR probe-driven: walk `.github/workflows/*.yml`; flag `uses: actions/...@<ref>` where ref is NOT 40-char SHA hex; gating by `t4.current.requiredCheckContexts` (default-permissive: scans any workflow declaring `on: pull_request` to avoid silent skip) | Run `pinact run` |

### Block-rule output shape

The orchestrator surfaces B-rule matches in two slots per the `runBlockRules` contract:

1. **Supplementary blocks** in `blocked[]` — NEW blocks created by probe-driven rules (B4 / B9 / B10) OR by the B3 advisory→block escalation (`code: "B3-ESCALATED-FROM-ADVISORY"`).
2. **Advisory labels** in `advisory[]` — `A-BR-<Id>-LABEL` for tier-emitted blocks matched by a B-rule; `A-BR-<Id>-ADVISORY` for tier-emitted advisories matched by a B-rule's `sourceAdvisoryCodes`.

Cite: `tools/eee-checks/block-rules.mjs` registry; design spec §4; OWASP A06:2021; ISO/IEC 25010:2011 §4.2.6-4.2.7; NIST SP 800-218 PW.7 / RV.1.

---

## 11. Sources (≥3 distinct citation orgs)

### Anthropic Claude Code docs

- `https://docs.anthropic.com/en/docs/claude-code/` — Claude Code overview, memory, hooks, sub-agents.
- `https://code.claude.com/docs/en/setup` — Windows native install supports PowerShell entrypoints.
- `https://code.claude.com/docs/en/env-vars` — canonical env-var names (CLAUDE_CONFIG_DIR / CLAUDE_CODE_TMPDIR / CLAUDE_CODE_PLUGIN_CACHE_DIR / CLAUDE_CODE_DEBUG_LOGS_DIR).
- `https://code.claude.com/docs/en/sandboxing` — CR-5 safety boundaries (referenced by Emergency bypass §9).
- `https://code.claude.com/docs/en/plugins` — plugin install + trust-tuple (cardinal rule 1).
- `https://code.claude.com/docs/en/skills` — local operator-curated skills path (cardinal rule 3).
- `https://www.anthropic.com/engineering/multi-agent-research-system` — Opus-lead + Sonnet-subagents pattern (cited by §5 Extending T6).

### GitHub Code Security + Copilot Coding Agent

- `https://docs.github.com/en/code-security` — Code-security feature overview.
- `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets` — ruleset semantics underlying T4 current-state.
- `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue` — merge-queue (post-public-org advisory).
- `https://github.blog/changelog/2026-03-13-optionally-skip-approval-for-copilot-coding-agent-actions-workflows/` — skip-approval setting (T4 FUTURE-state).
- `https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent` — Copilot Coding Agent (T4 FUTURE).

### Other upstream standards / OSS tooling

- `https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/` — MCP RC 2026-07-28 stateless protocol.
- `https://a2aproject.org` — A2A protocol (Linux Foundation; Slot A-E pluggable peers).
- `https://learn.microsoft.com/en-us/agent-framework/overview/` — Microsoft Agent Framework 1.0 (Slot A).
- `https://github.com/langchain-ai/langgraph` — LangGraph (Slot B).
- `https://ai.pydantic.dev/` — PydanticAI (Slot C).
- `https://mastra.ai/` — Mastra (Slot D).
- `https://github.com/assafelovic/gpt-researcher` — GPT-Researcher (T6 install-priority #1).
- `https://github.com/stanford-oval/storm` — STORM / Co-STORM (T6 academic engine).
- `https://github.com/bytedance/deer-flow` — DeerFlow 2.0 (T6 sandbox-aware).
- `https://github.com/gitleaks/gitleaks` — B1 trigger.
- `https://github.com/suzuki-shunsuke/pinact` — B10 remediation.
- `https://docs.astral.sh/uv/` — `uv` / `uvx` (Slot installs + NSSM-migration §6).
- `https://nssm.cc/usage` — NSSM service manager.
- `https://semver.org` — semver parsing for T3 minVersion comparison.

### Internal wave references

- `Z:/claude-sota-installed/CLAUDE.md` — cardinal rules CR-1..CR-6.
- `Z:/claude-sota-installed/CLAUDE.local.md` — Z:-portable env-block authority for T1.
- W363 — `tools/eee.ps1 --Wave Wn --Slug s` wave-lock acquisition (B5 remediation).
- W381 §5 — RDOE schema-firewall (T6 + B8).
- W384 — sca-v22 baseline (`2a37eb7`; 255 tests; T6 manifest + B7).
- W387 — live ruleset `main-branch-protection-sota` (T4 CURRENT).
- W389 Phase-0a #5 + #6 + #12 — GPT-Researcher MCP install · AdaptOrch DAG retrofit · drift-eval cadence (T6 forward-readiness).
- W392 P0.1 — sca-v22 canonical sweep (T5 stale-ref / B3).
- W393 Stream A — multi-convergence routing + install-priority `W393-SOTA-EXTRACT-NOTES.md:5-35`.
- W393 Stream B — memory-tier arbitration `W393-SOTA-EXTRACT-NOTES.md:39-75`.
- W393 Stream C — pluggable-peer Slot A-E `W393-SOTA-EXTRACT-NOTES.md:76-101`.
- W400 PR #64 @ `9f3ea24` — W393 design merged to main.
- W401 PR #69 — W393 Phase-0a implementation plan.
- W402-W408 — Wave-1+2 per-tier implementations on main.
- W409 PR #83 @ `988ffe3` — W393.7 block-rules + test harness.
- W410 (this PR) — W393.8b operator runbook + config reference.

---

*This is the operator-facing runbook. For declarative config schema details see [`./CONFIG-REFERENCE.md`](./CONFIG-REFERENCE.md). For the design rationale + lineage see [`./README.md`](./README.md) and the design spec on main.*
