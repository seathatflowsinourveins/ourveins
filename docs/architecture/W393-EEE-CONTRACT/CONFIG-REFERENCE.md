# W393 eee.ps1 launch contract — `.eee/precheck-config.json` reference

> **Status**: W393.8b Wave-4 (final Phase-0a PR). Operator runbook: [`./OPERATOR-RUNBOOK.md`](./OPERATOR-RUNBOOK.md). Design landing: [`./README.md`](./README.md). Authoritative design: [`docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md`](../../superpowers/specs/2026-05-25-W393-eee-contract-design.md).
>
> **Cite-floor**: this reference cites (1) Anthropic Claude Code docs, (2) GitHub Code Security docs, (3) internal wave anchors (W363 / W381 / W384 / W387 / W392 / W393 Stream A/B/C), satisfying the ≥3 distinct-citation-org requirement per CLAUDE.md cardinal rule 6 (CR-6 verify-before-claim).

This document is the per-key reference for `.eee/precheck-config.json` — the declarative spec consumed by [`tools/eee-precheck.mjs`](../../../tools/eee-precheck.mjs) and each per-tier check module under [`tools/eee-checks/`](../../../tools/eee-checks/). The configuration is JSON (no comments at parse time; `_about` and `_note` fields are operator-facing documentation, preserved by readers, ignored by the runtime).

---

## Schema validation

The orchestrator does not currently ship a hand-written JSON Schema file; runtime validation is delegated to each tier module's `runT<n>` consumer (defensive shape-checks per CR-6). For external schema validation (CI / pre-commit), use:

```
npx ajv-cli validate -s .eee/precheck-config.schema.json -d .eee/precheck-config.json
```

A schema file at `.eee/precheck-config.schema.json` is queued for a follow-on PR. Until then, validate by smoke-running the orchestrator:

```
node tools/eee-precheck.mjs --mode launch-fast --json
# exit 3 with code B-T0-CONFIG indicates a malformed config
```

Cite: `https://github.com/ajv-validator/ajv-cli`; JSON Schema 2020-12 `https://json-schema.org/draft/2020-12/json-schema-core`.

---

## Top-level shape

```jsonc
{
  "_about":         "string — operator-facing description; ignored by runtime",
  "schemaVersion":  "string — semver-like; gates back-compat checks",
  "modes":          { "<mode-name>": { ... }, ... },
  "t1":             { ... },   // T1 ENV
  "t2":             { ... },   // T2 services
  "t3":             { ... },   // T3 CLI tools
  "t4":             { ... },   // T4 GitHub state
  "t5":             { ... },   // T5 SOTA-drift
  "t6":             { ... }    // T6 research architecture
}
```

Each top-level key is documented below in launch order.

---

## `_about`

- **Type**: `string`.
- **Required**: optional but strongly recommended.
- **When-used**: operator-facing documentation only; the orchestrator reads but does not act on it. The convention is: a one-paragraph summary of the wave that introduced the config, the spec/plan citation, and the schema-version.
- **Example**:

```json
"_about": "W393 eee.ps1 clean-SOTA launch contract — declarative precheck spec. See docs/superpowers/specs/2026-05-25-W393-eee-contract-design.md §2 + docs/superpowers/plans/2026-05-25-W393-phase-0a-implementation-plan.md Task 1. Schema-version 1.0 = W393.1 PR (T1 only); Wave-2 PRs add t2..t6 blocks."
```

Cite: CR-6 verify-before-claim (in-config citation discipline); design spec §5.

---

## `schemaVersion`

- **Type**: `string` (semver-like).
- **Required**: yes (advisory now; will become block-rule in a follow-on PR).
- **When-used**: tier modules read it to gate forward-compat behavior; e.g. `T1` ignores unknown sub-keys if `schemaVersion` is older than the module's expected version, surfacing an advisory instead of a block.
- **Example**: `"schemaVersion": "1.0"`.
- **Bumping**: bump `0.x` → `1.0` on first-ship; bump major when a tier module changes the **shape** of any required sub-key. The `_about` field should record the bump rationale.

Cite: design spec §5 (declarative spec); semver 2.0.0 `https://semver.org`.

---

## `modes`

Map of `<mode-name>` → mode-spec. The orchestrator's `--mode <name>` CLI flag selects one; absent flag defaults to `launch-fast`.

- **Type**: `Record<string, ModeSpec>`.
- **Required**: yes.
- **Required sub-keys (per mode-spec)**:
  - `maxLatencyMs` (`number`) — soft latency budget; orchestrator surfaces an advisory if `result.elapsedMs > maxLatencyMs`.
  - `network` (`boolean`) — whether the mode is allowed to make network calls; tiers MUST honor this for HTTP/stdio probes.
  - `tiers` (`string[]`) — ordered list of tier IDs to run (e.g. `["T1", "T2", ...]`).
- **Optional sub-keys**:
  - `cacheTTLHours` (`number`) — TTL for cached probes (T5 MCP smokes, T6 discovery-cache freshness, etc.).
  - `allowLifecycleMutations` (`boolean`) — when `true`, T2 may run `repairCommand`; lifecycle pruning is permitted (worktree prune, JSONL ≥30 d purge, `--auto` re-arm).
- **When-used**: orchestrator main loop selects `modeSpec = config.modes[args.mode]` and iterates `modeSpec.tiers[]`; unknown mode → exit code 3 with `B-T0-MODE` block.
- **Example**:

```jsonc
"modes": {
  "launch-fast": {
    "maxLatencyMs": 5000,
    "network": false,
    "tiers": ["T1"]
  },
  "deep": {
    "maxLatencyMs": 30000,
    "network": true,
    "tiers": ["T1", "T2", "T3", "T4", "T5", "T6"],
    "cacheTTLHours": 24
  },
  "repair": {
    "maxLatencyMs": 60000,
    "network": true,
    "tiers": ["T1", "T2", "T3", "T4", "T5", "T6"],
    "allowLifecycleMutations": true
  }
}
```

Cite: design spec §2 (three-launch-mode tiering); CR-5 (lifecycle mutations gated to explicit `--repair`).

---

## `t1` — T1 ENV / paths / wave-locks / hidden errors

T1 enforces the Z:-portable env-block from `CLAUDE.local.md`, the wave-lock state, and a baseline of file-presence checks (no network).

- **Type**: `T1Spec`.
- **Required**: yes (T1 always runs).
- **Required sub-keys**:
  - `requiredEnv` (`string[]`) — env vars that MUST be present and non-empty. Missing → `B-T1-ENV-MISSING`.
  - `homeDerivedEnvVars` (`string[]`) — subset of env vars derived from `HOME`; T1 verifies none leak a `C:` prefix.
  - `homeDerivedForbiddenPrefix` (`string`) — prefix string to scan for (default `"C:"`).
  - `zPortableInvariant` (`Record<string, string>`) — env-var → exact-value pairs (e.g. `{"HOMEDRIVE": "Z:"}`).
  - `waveLockTool` (`string`) — relative path to `tools/preagent-wave-lock-guard.mjs`.
  - `bashEnvTarget` (`string`) — relative path to `.claude/state/bash-home-pin.sh`.
- **Optional sub-keys**:
  - `advisoryEnv` (`string[]`) — env vars that emit an advisory (not a block) if absent (e.g. API keys for T5 smokes).
  - `_about` (`string`) — operator doc.
- **When-used**: T1 module ([`tools/eee-checks/t1-env.mjs`](../../../tools/eee-checks/t1-env.mjs)) reads this on every mode (T1 runs in `launch-fast`, `deep`, `repair`).
- **Example**:

```jsonc
"t1": {
  "_about": "T1 ENV / paths / wave-locks / hidden errors.",
  "requiredEnv": [
    "USERPROFILE", "HOME", "HOMEDRIVE", "HOMEPATH",
    "CLAUDE_CONFIG_DIR", "CLAUDE_CODE_TMPDIR",
    "CLAUDE_CODE_PLUGIN_CACHE_DIR", "CLAUDE_CODE_DEBUG_LOGS_DIR",
    "BASH_ENV"
  ],
  "advisoryEnv": [
    "CLAUDE_CODE_GIT_BASH_PATH", "CLAUDE_CODE_FORK_SUBAGENT",
    "MSYS_NO_PATHCONV", "TAVILY_API_KEY", "EXA_API_KEY",
    "OPENAI_API_KEY", "ANTHROPIC_API_KEY"
  ],
  "zPortableInvariant": { "HOMEDRIVE": "Z:" },
  "homeDerivedEnvVars": [
    "USERPROFILE", "HOME", "CLAUDE_CONFIG_DIR",
    "CLAUDE_CODE_TMPDIR", "CLAUDE_CODE_PLUGIN_CACHE_DIR",
    "CLAUDE_CODE_DEBUG_LOGS_DIR"
  ],
  "homeDerivedForbiddenPrefix": "C:",
  "waveLockTool": "tools/preagent-wave-lock-guard.mjs",
  "bashEnvTarget": ".claude/state/bash-home-pin.sh"
}
```

Cite: design spec §2 T1; CLAUDE.local.md §"Z:-portable install ENV block"; W363 wave-lock dispatcher; CCBP `claude-settings.md:877-921 @ ac0d87d` (TIER-1-DIRECT env-block authority).

---

## `t2` — T2 services (typed-descriptor, supervisor-agnostic)

T2 ships the service inventory as typed descriptors so the orchestrator can probe / heal each service without baking supervisor commands into code. Repair commands are operator-explicit (`--repair` mode only).

- **Type**: `T2Spec`.
- **Required**: yes when `modes.<m>.tiers` includes `T2`.
- **Required sub-keys**:
  - `services` (`ServiceDescriptor[]`).
- **Optional sub-keys**:
  - `_about` (`string`).

### `services[]` element — `ServiceDescriptor`

- **Required**:
  - `name` (`string`) — stable id.
  - `transport` (`"stdio" | "http" | "grpc" | "none"`).
  - `supervisor` (`"docker-compose" | "nssm:<Name>" | "uvx-stdio" | "servy" | "manual"`).
  - `healthProbe` (`HealthProbe`) — `{type: "http", url: "..."}` OR `{type: "stdio", cmd: "..."}` OR `{type: "advisory"}`.
  - `healthProbeMode` (`"launch-fast" | "deep-only" | "repair-only"`).
  - `repairPolicy` (`"none" | "safe-local-idempotent" | "repair-only"`).
  - `blocking` (`"required" | "advisory" | "credential-gated"`).
- **Optional**:
  - `repairCommand` (`string`) — only consulted when `repairPolicy != "none"` AND `mode == "repair"`.
  - `repairAdminRequired` (`boolean`) — operator must launch from an elevated PowerShell.
  - `owner` (`"operator" | "runtime" | "external"`).
  - `futureMigration` (`"uvx-stdio" | "servy" | null`).
  - `advisoryNote` (`string`).
- **When-used**: T2 module ([`tools/eee-checks/t2-services.mjs`](../../../tools/eee-checks/t2-services.mjs)) iterates services, runs each `healthProbe` per `healthProbeMode`, surfaces `B-T2-SERVICE-UNHEALTHY` or advisory per `blocking`.
- **Example**:

```jsonc
"t2": {
  "_about": "Typed-service descriptors; supervisor-agnostic; repair-policy separated from launch-mode.",
  "services": [
    {
      "name": "langfuse",
      "transport": "http",
      "supervisor": "docker-compose",
      "healthProbe": { "type": "http", "url": "http://127.0.0.1:3000/api/public/health" },
      "healthProbeMode": "deep-only",
      "repairPolicy": "repair-only",
      "repairCommand": "docker compose -f Z:/claude-hub/observability/docker-compose.yml up -d langfuse",
      "repairAdminRequired": false,
      "blocking": "required",
      "owner": "operator",
      "futureMigration": null
    },
    {
      "name": "cognee",
      "transport": "http",
      "supervisor": "nssm:CogneeMCP",
      "healthProbe": { "type": "http", "url": "http://127.0.0.1:8000/health" },
      "healthProbeMode": "deep-only",
      "repairPolicy": "repair-only",
      "repairCommand": "nssm start CogneeMCP",
      "repairAdminRequired": true,
      "blocking": "required",
      "owner": "operator",
      "futureMigration": "uvx-stdio"
    }
  ]
}
```

Cite: design spec §2 T2 + codex r2 #2 repair-policy separation; W393 service-state snapshot `Z:/claude-sota-installed-state/W393-WAVE2-SERVICE-STATE-SNAPSHOT.md`; W314-A uvx-stdio pilot.

---

## `t3` — T3 CLI tools (exact-probes)

T3 probes each CLI tool with the exact command in `probeCommand`, parses semver from the stdout, and compares to `minVersion` if declared.

- **Type**: `T3Spec`.
- **Required**: yes when `modes.<m>.tiers` includes `T3`.
- **Required sub-keys**:
  - `cliTools` (`CliToolDescriptor[]`).
- **Optional sub-keys**:
  - `_about` (`string`).

### `cliTools[]` element — `CliToolDescriptor`

- **Required**:
  - `name` (`string`).
  - `probeCommand` (`string`) — shell command; exit 0 = installed; semver parsed from stdout.
  - `blocking` (`"required" | "advisory"`).
- **Optional**:
  - `minVersion` (`string` — semver; e.g. `"22.0.0"`).
  - `postWaveAdvisory` (`boolean`) — if `true`, treat as advisory until the cited wave PR lands.
  - `postWaveCite` (`string`) — wave-citation string for operator (e.g. `"Required-after W392 P1.6 lands"`).
- **When-used**: T3 module ([`tools/eee-checks/t3-cli.mjs`](../../../tools/eee-checks/t3-cli.mjs)) runs each `probeCommand` with a 5s timeout in `--deep`/`--repair` modes (not `launch-fast`).
- **Example**:

```jsonc
"t3": {
  "_about": "CLI tools exact-probes; semver parsed from stdout.",
  "cliTools": [
    { "name": "node",      "probeCommand": "node --version",      "minVersion": "22.0.0",   "blocking": "required" },
    { "name": "python",    "probeCommand": "python --version",    "minVersion": "3.13.0",   "blocking": "required" },
    { "name": "gh",        "probeCommand": "gh --version",        "minVersion": "2.0.0",    "blocking": "required" },
    { "name": "gh-auth",   "probeCommand": "gh auth status",                                "blocking": "required" },
    { "name": "codex",     "probeCommand": "codex --version",     "minVersion": "0.130.0",  "blocking": "required" },
    { "name": "claude",    "probeCommand": "claude --version",    "minVersion": "2.1.144",  "blocking": "required" },
    { "name": "gitleaks",  "probeCommand": "gitleaks version",    "minVersion": "8.30.0",   "blocking": "required" },
    { "name": "poutine",   "probeCommand": "poutine --version",   "blocking": "required",
      "postWaveAdvisory": true, "postWaveCite": "Required-after W392 P1.6 lands" }
  ]
}
```

Cite: design spec §2 T3 + post-W392-advisory tagging; semver 2.0.0 `https://semver.org`.

---

## `t4` — T4 GitHub state (current vs future)

T4 reports `CURRENT` vs `FUTURE` state honestly: current-state failures BLOCK; future-state items (Copilot Coding Agent / skip-approval / 2-ruleset bypass split / merge-queue / Slot A-E) are ADVISORY until the operator flips the public-org transition.

- **Type**: `T4Spec`.
- **Required**: yes when `modes.<m>.tiers` includes `T4`.
- **Required sub-keys**:
  - `current` (`T4Current`).
  - `future` (`T4Future`).
  - `slots` (`SlotDescriptor[]`).
- **Optional sub-keys**:
  - `_about` (`string`).

### `current` — required-state checks

- **Required**:
  - `repoSlug` (`string`) — e.g. `"seathatflowsinourveins/claude-sota-installed"`.
  - `requiredCheckContexts` (`string[]`) — exact context names for the W387 ruleset; mismatch → `B-T4-REQUIRED-CHECK-MISSING`.
  - `recentMergeWindowDays` (`number`) — `gh pr list --state merged --limit 5` must show ≥1 within this window.

### `future` — advisory state (boolean expectations)

- **Optional** (all default `false`):
  - `copilotCodingAgentExpected` (`boolean`).
  - `skipApprovalExpected` (`boolean`).
  - `twoRulesetBypassSplitExpected` (`boolean`).
  - `mergeQueueExpected` (`boolean`).

### `slots[]` element — `SlotDescriptor`

- **Required**:
  - `id` (`"A" | "B" | "C" | "D" | "E"`).
  - `name` (`string`).
  - `probe` (`SlotProbe`) — at least one of: `pipPkg`, `npmGlobalPkg`, `checkpointPkg`, `mcpRegex`, `pluginRegex`, `extraImportTest`.
  - `blocking` (`"advisory-always" | "advisory-if-missing"`).
- **Optional**:
  - `cite` (`string`) — design-spec reference.

- **When-used**: T4 module ([`tools/eee-checks/t4-github.mjs`](../../../tools/eee-checks/t4-github.mjs)) runs `gh` probes against `current`, reports `future` advisories, and probes each Slot per its `probe` shape.
- **Example**:

```jsonc
"t4": {
  "_about": "GitHub state CURRENT-vs-FUTURE + Slot A-E pluggable-peer advisory.",
  "current": {
    "repoSlug": "seathatflowsinourveins/claude-sota-installed",
    "requiredCheckContexts": [
      "Pre-commit gates",
      "CodeQL javascript-typescript",
      "CodeQL python",
      "commitlint (commit-message discipline)",
      "Codex-Verdict trailer (binding)"
    ],
    "recentMergeWindowDays": 7
  },
  "future": {
    "copilotCodingAgentExpected": false,
    "skipApprovalExpected": false,
    "twoRulesetBypassSplitExpected": false,
    "mergeQueueExpected": false
  },
  "slots": [
    {
      "id": "A",
      "name": "MAF 1.0 orchestration",
      "probe": { "pipPkg": "agent-framework", "pluginRegex": "agent-framework|microsoft.*agent-framework" },
      "blocking": "advisory-always",
      "cite": "W393 §6 + Stream C Slot A"
    },
    {
      "id": "E",
      "name": "OpenHands sandbox peer",
      "probe": { "mcpRegex": "openhands-dispatch" },
      "blocking": "advisory-if-missing",
      "cite": "W393 §6 + Stream C Slot E (W375; PRESENT-expected)"
    }
  ]
}
```

Cite: design spec §2 T4 + §6; W387 live ruleset `main-branch-protection-sota`; W393 Stream C `W393-SOTA-EXTRACT-NOTES.md:76-101`; GitHub Rulesets `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets`.

---

## `t5` — T5 SOTA-drift (derived from `.mcp.json`)

T5 is the meta-drift gate: it derives the MCP roster dynamically from `.mcp.json.mcpServers`, validates against declared metadata, scans for stale references, audits memory-tier arbitration, and probes per-server smoke (cached TTL 24 h).

- **Type**: `T5Spec`.
- **Required**: yes when `modes.<m>.tiers` includes `T5`.
- **Required sub-keys**:
  - `mcpServers` (`Record<string, McpServerMeta>`).
  - `memoryTiers` (`Record<string, MemoryTierDescriptor>`).
  - `staleRefScan` (`StaleRefScanSpec`).
- **Optional sub-keys**:
  - `memoryDriftCadence` (`MemoryDriftCadence`).
  - `smokeCacheFile` (`string`) — default `.claude/state/eee-mcp-smoke.json`.
  - `smokeCacheTtlHours` (`number`) — default 24.
  - `_about` (`string`).

### `mcpServers[<name>]` — `McpServerMeta`

- **Required**:
  - `category` (`"required" | "advisory" | "credential-gated"`).
  - `license` (`string`).
  - `smokeProbe` (`"http-head" | "stdio-handshake"`).
- **Optional**:
  - `agplSubprocessWrap` (`boolean`).
  - `rateLimited` (`boolean`).
  - `credentialEnv` (`string`).
  - `nssmService` (`string`).

### `memoryTiers[<key>]` — `MemoryTierDescriptor`

- **Required**:
  - `name` (`string`).
  - `role` (`string`).
  - `expectedMcpEntry` (`string`).
  - `license` (`string`).
  - `blocking` (`"required" | "advisory" | "informational" | "block-if-present"`).
- **Optional**:
  - `agplSubprocessWrap` (`boolean`).
  - `declaredVersion` (`string`).
  - `nssmService` (`string`).
  - `oauthRequired` (`boolean`).
  - `_note` (`string`).

### `staleRefScan` — drift-detection patterns

- **Required**:
  - `claudeMdSkillCountFile` (`string`) — relative path (e.g. `CLAUDE.md`).
  - `claudeMdSkillCountRegex` (`string`) — regex to extract the declared skill count.
  - `skillsDir` (`string`) — relative path; T5 counts non-`_`-prefixed children for comparison.
  - `skillCountExcludePrefixes` (`string[]`).
  - `scaTelemetryFile` (`string`).
  - `scaTelemetryRegex` (`string`).
  - `scaCanonicalVersion` (`string`) — currently `"sca-v22"`.
  - `retiredServerNames` (`string[]`).

### `memoryDriftCadence` — drift-eval cadence windows (advisory)

- **Optional**:
  - `stateFile` (`string`).
  - `windows` (`{recentActivityDays, bmOrphanDays, cogneeSmokeDays, t6ExportIntegrityDays: number}`).

- **When-used**: T5 module ([`tools/eee-checks/t5-sota-drift.mjs`](../../../tools/eee-checks/t5-sota-drift.mjs)) iterates `.mcp.json.mcpServers`, looks up metadata, runs `smokeProbe` in `--deep`/`--repair` modes, scans for stale refs, and audits memory tiers per `memoryTiers`.
- **Example**: see [the live config](../../../.eee/precheck-config.json) under `t5.mcpServers`, `t5.memoryTiers`, `t5.staleRefScan`.

Cite: design spec §2 T5; W393 Stream B `W393-SOTA-EXTRACT-NOTES.md:39-58`; W392 P0.1 sca-v22 canonical sweep; OWASP A06:2021 (Vulnerable & Outdated Components).

---

## `t6` — T6 Research architecture (operator-PRIORITY tier)

T6 is the meta-architecture gate per design §8. It verifies the sca-v22 baseline manifest, the multi-convergence routing rule, and the Stream A install-priority roster. T6 stays **advisory until the baseline lands** to avoid blocking operator workflows during the W384/W392 sequencing; once present, baseline corruption escalates to `B7`.

- **Type**: `T6Spec`.
- **Required**: yes when `modes.<m>.tiers` includes `T6`.
- **Required sub-keys**:
  - `baseline` (`T6Baseline`).
  - `futureReadiness` (`T6FutureReadiness`).
  - `multiConvergenceRouting` (`MultiConvergenceRouting`).
  - `installPriority` (`InstallPrioritySpec`).
- **Optional sub-keys**:
  - `_about` (`string`).

### `baseline` — sca-v22 file manifest

- **Required**:
  - `fileManifest` (`string[]`) — relative paths; each MUST `node --check` cleanly.
  - `schemaPath` (`string`) — path to `.claude/schemas/sca-v22-repo-verdict.schema.json`.
  - `smokeTest` (`string`) — path to `tests/sota-discovery/test_contract.mjs`.
  - `smokeTimeoutMs` (`number`) — default 30000.
  - `alwaysCheck` (`string[]`) — files that must exist regardless of baseline state (Stage-0.5 anti-popularity-bias bypass: `gh-cascade.sh` + `duckdb-hf-hub-stats.sql`).

### `futureReadiness`

- **Optional**:
  - `adaptOrchFiles` (`string[]`) — paths to AdaptOrch DAG retrofit files.
  - `gptResearcherMcpName` (`string`) — name of the GPT-Researcher MCP entry in `.mcp.json`.
  - `discoveryCacheDir` (`string`) — absolute path to sca-v22 run cache.
  - `discoveryCacheTtlDays` (`number`) — default 30.

### `multiConvergenceRouting` — Stream A integration

- **Required**:
  - `minTotalEngines` (`number`) — minimum total engines (default 2).
  - `minEnginesPerClass` (`number`) — minimum engines per class (default 2).
  - `engines` (`EngineDescriptor[]`) — each engine declares one or more probes (`mcpServer`, `pipPackage`, `pluginId`, `skillNamePrefix`, `markerPath`, `condaEnvPath`).
  - `classes` (`Record<string, string[]>`) — class → list of engine names (production / academic / compact / privacy / paper-qa / sandbox / self-improvement).
  - `discoveryLibDir` (`string`).
  - `convergencePath` (`string`).
  - `ruleWiringPatterns` (`string[]`) — patterns to grep across discovery lib files to confirm the rule is wired.
- **Optional**:
  - `operatorFlaggedMissingClones` (`{name, localPath}[]`).

### `installPriority`

- **Required**:
  - `items` (`InstallPriorityItem[]`) — each has `name`, `priority` (1-N, lower = higher priority), and at least one probe (`mcpServer`, `pipPackage`, `pluginId`, `skillNamePrefix`, `markerPath`, `condaEnvPath`).

- **When-used**: T6 module ([`tools/eee-checks/t6-research-arch.mjs`](../../../tools/eee-checks/t6-research-arch.mjs)) runs in `--deep`/`--repair` modes, verifies the baseline + cascade + RDOE firewall + multi-convergence routing + install-priority roster.
- **Example**: see [the live config](../../../.eee/precheck-config.json) under `t6` — particularly the `multiConvergenceRouting.engines[]` + `classes` mapping.

Cite: design spec §2 T6 + §8 deep-dive; W384 sca-v22 baseline (`2a37eb7`; 255 tests); W381 §5 RDOE schema-firewall; W393 Stream A `W393-SOTA-EXTRACT-NOTES.md:5-35`; Anthropic engineering blog `https://www.anthropic.com/engineering/multi-agent-research-system`.

---

## Sources (≥3 distinct citation orgs)

### Anthropic Claude Code docs

- `https://docs.anthropic.com/en/docs/claude-code/` — Claude Code overview.
- `https://code.claude.com/docs/en/env-vars` — canonical env-var names (cited by `t1.requiredEnv`).
- `https://code.claude.com/docs/en/setup` — Windows install (cited by `t1.zPortableInvariant`).
- `https://code.claude.com/docs/en/sandboxing` — CR-5 safety boundaries (cited by `t2.repairPolicy` gating).
- `https://code.claude.com/docs/en/plugins` — plugin trust-tuple (cardinal rule 1; cited by `t5.mcpServers` license discipline).

### GitHub Code Security + GitHub docs

- `https://docs.github.com/en/code-security` — Code-security overview.
- `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets` — ruleset semantics (cited by `t4.current.requiredCheckContexts`).
- `https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue` — merge-queue (`t4.future.mergeQueueExpected`).
- `https://docs.github.com/en/copilot/concepts/agents/cloud-agent/about-cloud-agent` — Copilot Coding Agent (`t4.future.copilotCodingAgentExpected`).
- `https://github.blog/changelog/2026-03-13-optionally-skip-approval-for-copilot-coding-agent-actions-workflows/` — skip-approval (`t4.future.skipApprovalExpected`).

### Other upstream standards / OSS tooling

- `https://semver.org` — semver parsing for `t3.cliTools[].minVersion`.
- `https://json-schema.org/draft/2020-12/json-schema-core` — JSON Schema draft cited by the schema-validation example.
- `https://github.com/ajv-validator/ajv-cli` — `ajv-cli` cited by the schema-validation example.
- `https://docs.astral.sh/uv/` — uv / uvx (cited by `t2.services[].futureMigration` and `t2.services[].supervisor: "uvx-stdio"`).
- `https://nssm.cc/usage` — NSSM service manager (cited by `t2.services[].supervisor: "nssm:<Name>"`).
- `https://github.com/assafelovic/gpt-researcher` — GPT-Researcher (cited by `t6.futureReadiness.gptResearcherMcpName`).
- `https://github.com/stanford-oval/storm` — STORM (cited by `t6.multiConvergenceRouting.engines`).
- `https://github.com/bytedance/deer-flow` — DeerFlow 2.0 (cited by `t6.multiConvergenceRouting.engines`).
- `https://github.com/langchain-ai/langgraph` — LangGraph (cited by `t4.slots[]` Slot B).
- `https://ai.pydantic.dev/` — PydanticAI (cited by `t4.slots[]` Slot C).
- `https://mastra.ai/` — Mastra (cited by `t4.slots[]` Slot D).
- `https://learn.microsoft.com/en-us/agent-framework/overview/` — MAF 1.0 (cited by `t4.slots[]` Slot A).
- `https://a2aproject.org` — A2A protocol (cited by `t4` Slot A-E rationale).

### Internal wave references

- `Z:/claude-sota-installed/CLAUDE.md` — cardinal rules CR-1..CR-6.
- `Z:/claude-sota-installed/CLAUDE.local.md` — Z:-portable env-block authority (cited by `t1.requiredEnv`).
- W363 — `tools/eee.ps1 --Wave Wn --Slug s` (cited by `t1.waveLockTool`).
- W381 §5 — RDOE schema-firewall (cited by `t6.baseline`).
- W384 — sca-v22 baseline (`2a37eb7`; 255 tests) cited by `t6.baseline.fileManifest`.
- W387 — live ruleset `main-branch-protection-sota` (cited by `t4.current.requiredCheckContexts`).
- W389 Phase-0a #5 / #6 / #12 — GPT-Researcher MCP install / AdaptOrch DAG retrofit / drift-eval cadence (`t6.futureReadiness`).
- W392 P0.1 sweep — sca-v22 canonical (cited by `t5.staleRefScan.scaCanonicalVersion`).
- W393 Stream A — multi-convergence routing + install-priority `W393-SOTA-EXTRACT-NOTES.md:5-35` (cited by `t6.multiConvergenceRouting`, `t6.installPriority`).
- W393 Stream B — memory-tier arbitration `W393-SOTA-EXTRACT-NOTES.md:39-75` (cited by `t5.memoryTiers`, `t5.memoryDriftCadence`).
- W393 Stream C — pluggable-peer Slot A-E `W393-SOTA-EXTRACT-NOTES.md:76-101` (cited by `t4.slots`).
- W400 PR #64 — W393 design merged.
- W401 PR #69 — W393 Phase-0a implementation plan.
- W402-W408 — Wave-1+2 per-tier implementations on main.
- W409 PR #83 — W393.7 block-rules + tests.
- W410 (this PR) — W393.8b operator runbook + config reference.

---

*This is the per-key reference. For the operator runbook + per-tier troubleshooting see [`./OPERATOR-RUNBOOK.md`](./OPERATOR-RUNBOOK.md). For the design rationale see [`./README.md`](./README.md) and the design spec on main.*
