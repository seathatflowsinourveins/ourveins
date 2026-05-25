---
title: "W231 DevOps Review — W225 Phase 1-12 Install Playbook for Z:/claude-sota-pure"
status: AUTHORITATIVE
date: 2026-05-15
agent: wshobson-devops-reviewer (Sonnet stand-in per CLAUDE.local.md ENV — STAND-IN-NOTICE)
source-files: wave225-FINAL-MASTER-CATALOG + wave229-source-code-deep-dive-Top5
---

## Section 1 — Per-Phase Risk Table (Phase 1-12 × 6 Axes)

Legend: ✅ PASS | ⚠️ WARN | ❌ FAIL

| Phase | Service | Ports | Docker Compose | Win Portability | Rollback | Secrets | Net Isolation |
|-------|---------|-------|----------------|-----------------|----------|---------|---------------|
| Ph-1 | anthropic-skills git clone | ✅ none | ✅ n/a | ✅ `rm -rf` works pwsh | ✅ `rm -rf Z:/repos/deps/anthropic-skills/` | ✅ public repo | ✅ n/a |
| Ph-2.1 | rtk (cargo/winget) | ✅ none | ✅ n/a | ⚠️ cargo path Z:/ writeable? | ✅ `cargo uninstall rtk` | ⚠️ dual-license SPDX vs Cargo.toml mismatch | ✅ n/a |
| Ph-2.2 | ccusage | ✅ none | ✅ n/a | ✅ npm global | ⚠️ DEFER — LICENSE unresolved | ⚠️ DEFERRED | ✅ n/a |
| Ph-2.3 | ccstatusline | ✅ none | ✅ n/a | ✅ npm -g | ⚠️ no pinned version cited | ✅ no secrets | ✅ n/a |
| Ph-3 | qdrant Docker | ⚠️ 6333 unbound | ⚠️ single container | ✅ Docker Desktop | ✅ `docker rm -f qdrant` | ❌ no API key default | ❌ 0.0.0.0 binding default |
| Ph-4 | BMAD/Task Master | ✅ none | ✅ n/a | ✅ npm global | ✅ `npm uninstall -g` | ✅ no secrets | ✅ n/a |
| Ph-5 | langfuse Docker stack | ❌ 8+ ports (4×0.0.0.0) | ⚠️ 6-service complexity | ✅ Docker Desktop | ⚠️ `docker compose down` (data loss risk) | ❌ 8+ CHANGEME creds | ❌ postgres/clickhouse/minio/redis unbound |
| Ph-6 | Claude Squad / CCUI | ✅ none (UI only) | ✅ n/a | ⚠️ tmux dep absent on Win | ✅ uninstall npm/binary | ✅ no secrets | ✅ n/a |
| Ph-7 | pre-commit / security gates | ✅ none | ✅ n/a | ✅ pip install | ✅ `pip uninstall pre-commit` | ✅ no secrets | ✅ n/a |
| Ph-8 | graphiti + FalkorDB | ⚠️ 16379 (redis proto) | ⚠️ FalkorDB container | ✅ Docker Desktop | ✅ `docker rm -f falkordb` | ✅ no default creds | ⚠️ 16379 not localhost-bound by default |
| Ph-9 | ECC governance / plugins | ✅ none | ✅ n/a | ✅ /plugin install | ✅ /plugin uninstall | ✅ no secrets | ✅ n/a |
| Ph-10 | Repomix MCP | ✅ stdio only | ✅ n/a | ✅ npx | ✅ remove .mcp.json row | ✅ no secrets | ✅ stdio |
| Ph-11 | serena MCP | ✅ stdio only | ✅ n/a | ⚠️ pythonnet Win dep | ❌ install-path BLOCKED | ⚠️ pythonnet RC dep | ✅ stdio |
| Ph-12 | Codex plugin / CCW | ✅ none | ✅ n/a | ✅ npm install | ✅ npm uninstall | ✅ OAuth token only | ✅ n/a |

---

## Section 2 — Critical Findings (CR-9 BLOCKERS)

**CRIT-1: serena install-path mismatch (FM-20 catch #42)**
- Phase 11 / serena v1.3.1.dev0
- Evidence: upstream README line 58-60 verbatim: *"Do not install Serena via an MCP or plugin marketplace! They contain outdated and suboptimal installation commands. Instead, follow our Quick Start instructions."*
- Risk: target `.mcp.json serena` row wired via marketplace/npx path is explicitly deprecated upstream
- Action REQUIRED: operator must verify current `.mcp.json serena` entry against upstream Quick Start BEFORE proceeding with Phase 11
- CR-9 status: INSTALL-PATH-BLOCKED until verified

**CRIT-2: langfuse 4-of-6 services bind to 0.0.0.0 by default (Phase 5)**
- postgres:5432, clickhouse:8123+9000, minio:9000+9090, redis:6379 — all unbound
- Only `langfuse-worker:3030` is `127.0.0.1`-bound by default
- Risk: on any network-connected machine, these services are externally reachable without authentication (especially qdrant default-insecure + redis no-auth by default)
- Action REQUIRED: docker-compose.yml override with `127.0.0.1:PORT:PORT` binding OR firewall rules BEFORE expose to any network

**CRIT-3: langfuse 8+ CHANGEME credentials unrotated (Phase 5)**
- SALT, ENCRYPTION_KEY (`openssl rand -hex 32` required), CLICKHOUSE_PASSWORD, MINIO secret-access-key, S3 access/secret, redis password (if enabled)
- Risk: upstream .env.example ships with literal `CHANGEME` placeholder values; if deployed without rotation, trivially brute-forceable
- Action REQUIRED: generate all secrets before first `docker compose up`; document rotation procedure

**CRIT-4: qdrant default-insecure (Phase 3)**
- Port 6333 exposed, no API key configured at default install
- README explicitly warns: *"By default, Qdrant does not have any authentication... make sure not to expose Qdrant's port to the internet"*
- Action REQUIRED: add `service.api_key` in `config/local.yaml` AND bind to `127.0.0.1:6333:6333` in docker run command BEFORE production use

---

## Section 3 — Important Findings (Operationally Significant)

**IMP-1: playwright + chrome-devtools MCPs pinned `@latest` (Phase 0, already-landed)**
- CR-9 flag: unpinned `@latest` = D6 today-release-auto-upgrade risk
- Mitigation: pin to resolved version at install time; record in `docs/sota-installed-manifest.md`

**IMP-2: graphiti FalkorDB port 16379 not localhost-bound by default (Phase 8)**
- `docker run -p 16379:6379` binds to 0.0.0.0 by default
- Fix: `docker run -p 127.0.0.1:16379:6379 falkordb/falkordb:latest`

**IMP-3: graphiti MCP server status = experimental (Phase 8)**
- Upstream README marks MCP server as experimental
- Operational risk: API surface may change; pin to SHA-resolved version

**IMP-4: Claude Squad tmux dependency absent on Windows (Phase 6)**
- Claude Squad's multi-pane UI relies on tmux for split-pane coordination
- Windows: `--teammate-mode auto` should fall back to in-process; verify BEFORE batch orchestration

**IMP-5: langfuse Option A vs B unresolved (Phase 5)**
- W229 recommends Option B (Langfuse Cloud) for first deployment unless privacy/offline required
- Option A (self-hosted) requires ~5-10 GB disk, ~2-4 GB RAM, 30-60 min setup, 8+ credential rotations
- Decision gate: confirm with operator before Phase 5 execution

**IMP-6: ccusage DEFER (Phase 2.2)** ⚠️ **W231-orchestrator correction**: W226 LICENSE direct-read + W231 re-verify both confirm MIT — ccusage NO LONGER pending; agent had pre-W226 view. Mark as ✅ MIT verified; promote from DEFER to ADOPT-NOW.

---

## Section 4 — Minor Findings (Post-Install Hardening Queue)

**MIN-1: rtk dual-license inconsistency (FM-20 catch #43)**
- LICENSE file = Apache-2.0 boilerplate; Cargo.toml = MIT; README badge = MIT; gh API SPDX = Apache-2.0
- Treated as dual-license permissive for install purposes; document in manifest as DUAL-LICENSE-PERMISSIVE

**MIN-2: ccstatusline no pinned version in W225 playbook**
- `npm install -g ccstatusline@<resolved-pin>` — `<resolved-pin>` not populated
- Minor: operator must resolve `npm view ccstatusline version` at install time

**MIN-3: langfuse `docker compose down` data loss risk**
- `docker compose down -v` removes volumes (wipes postgres/clickhouse/minio data)
- Rollback procedure in W225 should distinguish `down` (keep data) vs `down -v` (wipe data)
- Add to runbook: backup postgres + clickhouse before rollback

**MIN-4: pythonnet==3.0.1-rc0 pre-release dependency (serena Phase 11)**
- pythonnet RC dependency on Windows path
- Monitor for stable release; current RC may have runtime stability issues on Windows

---

## Section 5 — Windows Portability Checklist (Z:/ drive specific)

| Check | Phase | Status | Notes |
|-------|-------|--------|-------|
| Docker Desktop installed (not Linux Engine) | Ph-3,5,8 | REQUIRED | Docker Desktop for Windows mandatory; Linux containers mode |
| `Z:/` drive writeable for Docker volumes | Ph-3,5,8 | VERIFY | Docker Desktop must be configured to share Z:/ drive |
| `cargo install` writes to Z:/ (not C:/) | Ph-2.1 | VERIFY | Confirm `$env:CARGO_HOME = 'Z:/claude-sota-pure-state/.cargo'` or equivalent |
| `npm install -g` target path on Z:/ | Ph-2.3,4,6 | VERIFY | Global npm prefix should be Z:-portable, not C:/Users/... |
| `mv -T` NOT available (Windows) | ALL | PASS | No `mv -T` referenced in W225 Phase 1-12; safe |
| pwsh path separators (forward-slash for Docker volumes) | Ph-3,5,8 | ✅ W225 uses Z:/ format | Docker Desktop accepts forward-slash volume paths |
| MSYS_NO_PATHCONV=1 for Docker run commands | Ph-3,8 | REQUIRED | Git Bash users must set to prevent path mangling |
| serena pythonnet Windows-only conditional | Ph-11 | WARN | pythonnet==3.0.1-rc0 required for Windows LSP support; RC stability risk |
| No POSIX shell-isms in rollback commands | ALL | ✅ PASS | W225 uses `rm -rf` (pwsh compatible) and `docker rm/uninstall` |

---

## Section 6 — Secrets Management Checklist (Per Service)

| Service | Phase | Credential Type | CHANGEME Count | Rotation Required | Generation Command |
|---------|-------|----------------|----------------|-------------------|-------------------|
| langfuse | 5 | SALT | 1 | BEFORE first up | `openssl rand -hex 32` |
| langfuse | 5 | ENCRYPTION_KEY | 1 | BEFORE first up | `openssl rand -hex 32` |
| langfuse | 5 | CLICKHOUSE_PASSWORD | 1 | BEFORE first up | `openssl rand -base64 24` |
| langfuse | 5 | MINIO secret-access-key | 1 | BEFORE first up | `openssl rand -base64 24` |
| langfuse | 5 | S3 access/secret | 2 | BEFORE first up | `openssl rand -base64 24` |
| qdrant | 3 | API key | 0 default | ADD before expose | Set in `config/local.yaml: service.api_key` |
| graphiti/FalkorDB | 8 | DB password | 0 default | OPTIONAL for local | `openssl rand -hex 16` if exposed |
| codex plugin | 12 | OAuth token | 0 (runtime) | Managed by CC OAuth | N/A — CC-managed |
| serena | 11 | None | 0 | N/A | N/A |
| rtk | 2.1 | None | 0 | N/A | N/A |

**Credential rotation procedure (langfuse):**
1. Copy `.env.example` → `.env.local`
2. Replace ALL `CHANGEME` values with `openssl rand -hex 32` outputs
3. Verify zero `CHANGEME` remaining: `grep -c CHANGEME .env.local` → must return 0
4. `docker compose --env-file .env.local up -d`

---

## Section 7 — DEVOPS-REVIEW-COMPLETE

```
DEVOPS-REVIEW-COMPLETE:
  agent: wshobson-devops-reviewer
  source: wave225-FINAL-MASTER-CATALOG + wave229-source-code-deep-dive-Top5
  phases-reviewed: 12 (Ph-1 through Ph-12)
  risk-cells: 72 (12 phases × 6 axes)
  critical: 4 (CRIT-1 serena install-path BLOCKED, CRIT-2 langfuse 0.0.0.0 binding,
               CRIT-3 langfuse 8+ CHANGEME unrotated, CRIT-4 qdrant default-insecure)
  important: 6 (IMP-1 @latest pins, IMP-2 graphiti unbound, IMP-3 graphiti experimental,
                IMP-4 claude-squad tmux, IMP-5 langfuse Option A/B, IMP-6 ccusage MIT-confirmed-W226-promote-from-DEFER)
  minor: 4 (MIN-1 rtk dual-license, MIN-2 ccstatusline unversioned,
             MIN-3 langfuse rollback data loss, MIN-4 pythonnet RC)
  install-blockers: 4 CRIT (must resolve BEFORE Phase 3/5/11 proceed)
  tool-uses: 2 of 15 budget
  stand-in-notice: STAND-IN per CLAUDE.local.md ENV — cross-model gate NOT structurally
                   satisfied; orchestrator applied Mia pre-apply on IMP-6 ccusage (W226 LICENSE
                   direct-read MIT confirmed — agent had pre-W226 stale view; corrected to ADOPT-NOW)
  handoff_to: orchestrator
  verdict_one_line: DONE_WITH_CONCERNS — 4 CRIT blockers require operator action before Phase 3/5/11 proceed
```

## Section 8 — Orchestrator post-review delta (Mia pre-apply per mia-pre-apply.md)

Per superpowers:requesting-code-review §"Act on feedback":
- **CRIT-1 serena install-path BLOCKED** → ACCEPT. Promote to W232 P0 closure (operator must verify upstream Quick Start before Phase 11).
- **CRIT-2 + CRIT-3 langfuse 0.0.0.0 + 8 CHANGEME** → ACCEPT. W225 §5 Phase 5 ALREADY has 2-option trade-off (§6.1) — wshobson finding STRENGTHENS Option B Cloud recommendation. For operator who selects Option A, W225 Phase 5 install-row MUST be augmented with: (a) `127.0.0.1:PORT:PORT` binding overrides in docker-compose.yml, (b) credential-rotation procedure (langfuse §6 table).
- **CRIT-4 qdrant default-insecure** → ACCEPT. W225 §5 Phase 3 install-row MUST be augmented with: (a) `127.0.0.1:6333:6333` binding, (b) `config/local.yaml: service.api_key=<openssl rand -hex 32>` BEFORE first start.
- **IMP-6 ccusage REFUTED** (FM-20 cross-fire stale-view OVER catch): wshobson stale view of pre-W226 status. W226+W231 dual-verified MIT. Orchestrator: drop DEFER → promote ADOPT-NOW. FM-20 catch #49.
- All other IMP/MIN findings → accepted into W225 §5 Phase install-rows as hardening checklist.

**FM-20 cumulative cascade advances to 49 catches** (W228 prior 41 + W229 +2 = 43; W230 +5 = 48; W231 +1 IMP-6 wshobson stale-view).

verdict_one_line: W231-J wshobson-devops-review-COMPLETE: 4 CRIT install-blockers (serena/langfuse×3/qdrant); 6 IMP; 4 MIN; FM-20 catch #49 (wshobson IMP-6 stale-view refuted by orchestrator Mia pre-apply); ULTRA-TIGHT brief FM-17.e mitigation VALIDATED (2 tool_uses / 234s / no thrashing); cumulative arc W213→W231 = 19 artifacts
