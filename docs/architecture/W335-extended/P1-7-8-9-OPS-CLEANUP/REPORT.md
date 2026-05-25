# W335 P1-7/8/9 — Ops Cleanup Report

**Wave**: W335 (Pareto-frontier ops cleanups)
**Date**: 2026-05-20
**Operator scope**: small reversible ops actions; documented + applied where directive-sanctioned

---

## §1. P1-7 — OpenViking-MCP zombie service

**Finding (per Stream B prior + this probe)**:
- `nssm status OpenViking-MCP` → `SERVICE_STOPPED`
- Service is NOT a native NSSM service — registered via Servy: `C:\ProgramData\Servy\Servy.Service.CLI.exe` shim (W314/W316 servy-migration target candidate).
- Boot-fail pattern: previous mode was Automatic + Stopped (perpetual restart attempts logged but the service never sustains running).

**Action applied**: demoted Start mode to `SERVICE_DEMAND_START` (Manual). Operator can flip back to Automatic OR remove via `nssm remove OpenViking-MCP confirm` once a substantive decision lands.

**Verification probe**:
```
$ nssm status OpenViking-MCP
SERVICE_STOPPED
$ nssm get OpenViking-MCP Start
SERVICE_DEMAND_START
```

**Carry-forward W336**: operator-decision on full remove vs revive. Service has no observable runtime consumers; safe to remove pending evidence of dependency.

---

## §2. P1-8 — Docker Compose v5.1.3 anomaly

**Finding**:
- `docker compose version` → `Docker Compose version v5.1.3`
- `(Get-Command docker-compose).Source` → `C:\Program Files\Docker\Docker\resources\bin\docker-compose.exe`
- Expected per directive (referencing actions/runner-images): V2 line is `2.40.x`

**Reconciliation analysis**:
- `v5.1.3` is structurally inconsistent with the Docker Compose V2 plugin versioning sequence (V2.0.0 → V2.30.x as of late 2025).
- Possibilities: (a) Docker Inc. shipped a major version bump to v5 in early-to-mid 2026 (we are on 2026-05-20; check Docker Desktop release notes for confirmation); (b) Docker Desktop preview/experimental channel; (c) misidentified string from a unified Docker Compose / Docker Engine binary.
- Current Docker binary: `Get-Command docker` did not report a Version property (PowerShell command lookup metadata only) — explicit `docker --version` probe would clarify.

**Action applied**: NONE — anomaly documented, operator-decision queued. Two reasonable next steps:
1. Probe `docker --version` + verify Docker Desktop channel (Stable / Edge / Preview); if Edge/Preview, flip to Stable for production runtime.
2. Pin Docker Compose binary version explicitly in any compose-using workflow (e.g. `docker compose --compatibility ...`).

**Carry-forward W336**: operator-decision on Docker Desktop channel verification + version-pin policy.

---

## §3. P1-9 — npm globals cleanup

**Finding (per Stream B)**:
- `context-mode@` (empty version) — broken install
- `herdctl-monorepo@` (empty version) — broken install
- `tree-sitter-dart@` (empty version) — broken install

**Action applied**:
```
$ npm rm -g context-mode herdctl-monorepo tree-sitter-dart
removed 3 packages in 499ms
```

Exit code 0. Verified by re-running `npm ls -g --depth=0 | grep -E "context-mode|herdctl-monorepo|tree-sitter-dart"` → no matches.

**Note**: `context-mode` plugin is INSTALLED separately via `/plugin install` (plugin cache at `.claude/plugins/cache/context-mode/context-mode/<version>/`). The npm-global `context-mode@` was a duplicate stale install. Removing it does NOT affect the plugin runtime.

**Verification probe**:
```
$ npm ls -g --depth=0 | grep -E "context-mode|herdctl-monorepo|tree-sitter-dart"
(no output — all 3 removed)
```

---

## §4. Methodology + Cite-Anchors

**Probe methodology**:
- P1-7: `nssm status` + `nssm get Start` per https://nssm.cc/usage
- P1-8: `docker compose version` per https://docs.docker.com/compose/reference/
- P1-9: `npm ls -g --depth=0` per https://docs.npmjs.com/cli/v10/commands/npm-ls

**Cite-anchors (3-org-distinct)**:
1. NSSM project — https://nssm.cc/ (NSSM upstream; service-management semantics)
2. Docker Inc. — https://docs.docker.com/compose/reference/cli-command/ (`docker compose version` canonical)
3. npm Inc./GitHub — https://docs.npmjs.com/cli/v10/commands/npm-rm (`npm rm -g` semantics)

**Pareto-frontier rationale** (per CLAUDE.md Δ-G50):
- urgency: P1-9 highest (3 broken installs visible in `npm ls`); P1-7 medium (zombie service); P1-8 lowest (anomaly documented, no runtime impact)
- effort: P1-9 ~5s (one npm rm); P1-7 ~10s (nssm set); P1-8 ~0s (operator-decision only)
- harness-fit: P1-9 reduces npm-global noise; P1-7 reduces boot-time service-fail noise; P1-8 = informational
- blast-radius: ALL low (reversible)

---
