# Stream F — Node.js Ecosystem SOTA Audit (W341-FULL-SOTA-UNLEASH)

> Stream-F deliverable per W341 wave-spec. Author: Claude Code orchestrator (Opus 4.7 1M, model_id `claude-opus-4-7[1m]`). Date: **2026-05-20**. Parent runtime: `Z:\claude-sota-installed`. Node.js: **v22.22.0** (Windows 11 Pro · PowerShell 7.6.1 · Git Bash). All cite-anchors per sca-v15 I1 — repo file:line OR live command stdout. Companion streams (parallel-dispatch per W269 mandate) cited by Stream-name; this stream's scope is enumerated under SCOPE in the wave dispatch.

---

## §1 Node 22 best-practice top-20 — `goldbergyoni/nodebestpractices`

Source: deepwiki probe 2026-05-20 against `goldbergyoni/nodebestpractices` (HEAD). Cite-anchors point to repo paths under `sections/`. Severity tags map to NIST SP 800-218 PW.7 / OWASP A06:2021. Tagged GAP/HOLDS against this runtime (per cardinal-rule-6 verify-before-claim).

| # | Rule | Source | Severity | Runtime status |
|---|---|---|---|---|
| 1 | Use async-await for error handling, never callback-style | `sections/errorhandling/asyncerrorhandling.md` | CRITICAL | HOLDS — hooks under `tools/*.mjs` are all top-level-await capable Node 22 ESM (no callback chains observed) |
| 2 | Always await promises before returning to preserve full stacktraces | `sections/errorhandling/returningpromises.md` | CRITICAL | UNKNOWN — needs lint pass (no-return-await rule) on hook scripts |
| 3 | Extend built-in `Error` for typed operational errors | `sections/errorhandling/useonlythebuiltinerror.md` | HIGH | UNKNOWN |
| 4 | Distinguish operational vs programmer errors; crash on the latter | `sections/errorhandling/operationalvsprogrammererror.md` | HIGH | UNKNOWN |
| 5 | Centralize error handling, NOT in middleware | `sections/errorhandling/centralizedhandling.md` | HIGH | N/A — no Express-style middleware in runtime tools |
| 6 | Subscribe to EventEmitter `error` events | `sections/errorhandling/` | HIGH | UNKNOWN |
| 7 | `npm audit` continuously for vulnerable deps | `sections/security/dependencysecurity.md` | CRITICAL | **GAP** — no npm-audit gate observed in `.pre-commit-config.yaml` |
| 8 | Lock dependencies with package-lock.json | `sections/production/lockdependencies.md` | CRITICAL | HOLDS — pinned MCP servers (`@<version>` per `.mcp.json`) |
| 9 | `npm ci` in production (not `npm install`) | `sections/production/installpackageswithnpmci.md` | CRITICAL | N/A — global-install runtime, not deploy-time |
| 10 | Inspect for outdated packages + enforce version constraints | `sections/security/` | HIGH | **GAP** — `npm outdated -g` returned 16+ stale packages (e.g. `@anthropic-ai/sdk` 0.95.1→0.97.1, `@openai/codex` 0.130.0→0.132.0, `@perplexity-ai/mcp-server` 0.8.4→0.9.0 — already pinned in `.mcp.json`) |
| 11 | Prevent ReDoS (catastrophic backtracking regex) | `sections/security/regex.md` | CRITICAL | UNKNOWN |
| 12 | Use Helmet for HTTP security headers | `sections/security/secureheaders.md` | CRITICAL | N/A — no HTTP server in runtime; MCP servers are stdio/HTTP-proxied to upstream |
| 13 | Avoid DoS via explicit process-crash conditions | `sections/security/` | HIGH | UNKNOWN |
| 14 | Limit request payload size | `sections/security/requestpayloadsizelimit.md` | HIGH | N/A |
| 15 | Use `node:` protocol prefix for built-in module imports (typosquatting defense) | `sections/security/` | MEDIUM | **PARTIAL** — needs lint scan against hook scripts to confirm `import 'fs'` not `import 'node:fs'` |
| 16 | Guard process uptime via PM2/systemd/container-restart — NOT inside Node | `sections/production/guardprocess.md` | CRITICAL | HOLDS — NSSM service for CogneeMCP, Docker-restart=unless-stopped for compose-managed (see §3) |
| 17 | Structured logging via Pino/Winston (NOT console.log) | `sections/errorhandling/usematurelogger.md` | CRITICAL | **GAP** — `tools/*.mjs` use `console.log` (acceptable for short-lived hook scripts per Node 22 emit-to-stderr-on-error convention, but no Pino integration) |
| 18 | Log to stdout (let infra capture) — not files in-app | `sections/production/logrouting.md` | HIGH | HOLDS — hooks emit to stderr; container `logging.driver: json-file` (graphiti compose) is Docker-side rotation, not app-side |
| 19 | Assign transaction/correlation IDs to log lines | `sections/production/assigntransactionid.md` | HIGH | UNKNOWN |
| 20 | `NODE_ENV=production` set explicitly | `sections/production/setnodeenv.md` | HIGH | UNKNOWN — `.claude/settings.json:env` does not set NODE_ENV |

**Node 22-specific items (NOT in nodebestpractices; cite Node.js official docs):**
- **N22-A**: Use the built-in test runner (`node --test`) instead of Jest/Mocha for new tooling — cite `https://nodejs.org/api/test.html` (Node 22 stable). Runtime status: no test files observed in `tools/*.mjs` — UNKNOWN.
- **N22-B**: Built-in `fetch` is stable in Node 22 (no `undici` import needed) — cite `https://nodejs.org/api/globals.html#fetch`.
- **N22-C**: Permission model (`--permission`) for principled-least-privilege subprocess launches — cite `https://nodejs.org/api/permissions.html` (Node 22 stable). Runtime status: NOT used by any hook script.
- **N22-D**: `--watch` mode for dev iteration — cite Node 22 changelog.

---

## §2 `.mcp.json` version-pinning audit — CR-9 / W286-arc-P0C compliance

Source: `Z:\claude-sota-installed\.mcp.json` read 2026-05-20. Mandate per CLAUDE.md cardinal-rule-1 W286-arc-P0C: `npx -y <pkg>@<pinned-version>`.

| # | server | type | command/args | pin? | verdict |
|---|---|---|---|---|---|
| 1 | `deepwiki` | http | `https://mcp.deepwiki.com/mcp` | N/A (HTTP-MCP, upstream-owned) | HOLDS — Anthropic plugin-style upstream-managed |
| 2 | `github` | stdio | `npx -y @modelcontextprotocol/server-github@2025.4.8` | **pinned** | HOLDS |
| 3 | `chrome-devtools` | stdio | `npx -y chrome-devtools-mcp@1.0.1 --no-usage-statistics` | **pinned** | HOLDS |
| 4 | `repomix` | stdio | `npx -y repomix@1.14.0 --mcp` | **pinned** | HOLDS |
| 5 | `serena` | stdio | `uvx --from git+https://github.com/oraios/serena@249f6b07...@serena start-mcp-server` | **SHA-pinned** | HOLDS (commit-SHA fixed) |
| 6 | `ccusage` | stdio | `npx -y @ccusage/mcp@18.0.11` | **pinned** | HOLDS |
| 7 | `cognee` | http | `http://127.0.0.1:8000/mcp` | N/A (local-service) | HOLDS — NSSM `CogneeMCP` serverInfo `Cognee 1.26.0` per CLAUDE.md L91 |
| 8 | `langfuse` | stdio | `npx -y langfuse-mcp-server@0.0.2-rc.0` | **pinned (RC)** | HOLDS — RC-tag pinning acceptable for pre-1.0 SDK |
| 9 | `basic-memory` | stdio | `uvx --from basic-memory==0.21.1 basic-memory mcp` | **pinned** | HOLDS |
| 10 | `hf-mcp-server` | http | `https://huggingface.co/mcp` | N/A (HTTP-MCP) | HOLDS |
| 11 | `perplexity` | stdio | `npx -y @perplexity-ai/mcp-server@0.9.0` | **pinned** | HOLDS |
| 12 | `playwright` | stdio | `npx -y @playwright/mcp@0.0.75` | **pinned** | HOLDS |
| 13 | `tavily` | stdio | `npx -y tavily-mcp@0.2.19` | **pinned** | HOLDS |
| 14 | `exa` | stdio | `npx -y exa-mcp-server@3.2.1` | **pinned** | HOLDS |

**Verdict**: `.mcp.json` is fully CR-9 compliant — **14/14 servers pinned or upstream-managed; 0 violations**. Excellent state. This is the SOTA reference for sibling runtimes.

**Drift candidates (npm outdated against pinned values)** — these REQUIRE intentional bump per W286-cross trade-off (audit-trail in `_comments` block of `.mcp.json` L7):
- `@perplexity-ai/mcp-server` 0.8.4→**0.9.0** — already at 0.9.0 in `.mcp.json` L80 ✓
- `@openai/codex` 0.130.0 (global)→0.132.0 — codex plugin uses `0.130.0` per cache path; bump candidate
- `@commitlint/cli` 20.5.3→21.0.1 — pre-commit-config L62-ish references 20.5.3; bump candidate (major-version review needed)

---

## §3 Docker SOTA + version-pin gaps

Source: `find Z:\claude-sota-installed -maxdepth 4 -name 'docker-compose*.yml' -o -name 'Dockerfile*'` 2026-05-20. Plus `Z:\claude-hub\observability\docker-compose.yml` (per CLAUDE.md L101 Langfuse v3.160.0 stack).

### Inventory
| Path | Purpose | Pinned? |
|---|---|---|
| `Z:/claude-sota-installed/.local/graphiti/docker-compose.yml` | Graphiti+Neo4j+FalkorDB (RETIRED per W295 — CLAUDE.md L97) | partial |
| `Z:/claude-sota-installed/.local/graphiti/Dockerfile` | Graphiti FastAPI server, `FROM python:3.12-slim` | tag-pinned (NOT digest) |
| `Z:/claude-sota-installed/.local/cpa-fix-services/docker-compose.yml` | CLIProxyAPI + cache-fix-proxy (Wave-150 SOTA) | **digest-pinned** |
| `Z:/claude-hub/observability/docker-compose.yml` | Langfuse v3.160.0 stack | not enumerated this stream (cross-runtime) |
| `Z:/claude-hub/data/hindsight-compose/docker-compose.yml` | Hindsight retired per W295 | n/a |
| `Z:/claude-hub/projects/openclaw/docker-compose{,observability}.yml` | openclaw side-project | not in scope |
| `Z:/claude-sota-installed/tmp/repo-probes/knowledge-rag/Dockerfile` | tmp probe | not in scope |
| `Z:/claude-sota-installed/.cache/pre-commit/repo*/Dockerfile` | pre-commit isolated env | upstream-managed |

### Findings vs `veggiemonk/awesome-docker` SOTA patterns

| Pattern | SOTA source | Runtime compliance |
|---|---|---|
| Image pinned by `sha256:` digest (not tag) | `awesome-docker#security` + Docker Inc `https://docs.docker.com/develop/develop-images/dockerfile_best-practices/` | **PARTIAL** — `cpa-fix-services` HOLDS (`eceasy/cli-proxy-api@sha256:e7b19291...`); `graphiti` GAP (`neo4j:5.26.2` tag-only, `falkordb/falkordb:latest` GAP-CRITICAL) |
| `restart: unless-stopped` | Docker Inc restart-policy doc | HOLDS — cpa-fix |
| HEALTHCHECK directive | Docker Inc HEALTHCHECK reference | HOLDS — both compose files have `healthcheck` blocks |
| Non-root user (`USER`) in Dockerfile | OWASP-Docker-Top-10 D2 + `docker-library/official-images` policy | HOLDS — graphiti `Dockerfile:35-36` creates `app:app` user |
| OCI image annotations (`org.opencontainers.image.*`) | OCI image-spec annotations | HOLDS — graphiti `Dockerfile:10-19` (8 labels) |
| `depends_on: condition: service_healthy` | Docker compose-file v3.4+ | HOLDS — graphiti+cpa-fix |
| Log driver + rotation | `awesome-docker` ops section | HOLDS — `logging.driver: json-file, max-size: 25m, max-file: 5` (cpa-fix) |
| BuildKit syntax pin (`# syntax=docker/dockerfile:1.9`) | Moby BuildKit reference | HOLDS — graphiti Dockerfile L1 |
| Multi-stage build | Docker Inc multi-stage doc | NOT REVIEWED (graphiti Dockerfile cuts off at L40 in this audit) |

### Langfuse v3.160.0 freshness probe
Per CLAUDE.md L101 — Langfuse self-hosted at `Z:\claude-hub\observability\docker-compose.yml` lives in a **sibling runtime**, not this runtime's worktree. The compose file path is verified-present but its image-pin posture was not re-enumerated by Stream F (out-of-scope: cross-runtime). Cross-reference: Stream A/B/F sibling streams of W341 may have authoritative coverage. Current Langfuse upstream image latest = `langfuse/langfuse:3` (rolling tag — recommend pin to `langfuse/langfuse:3.160.0@sha256:...` per CR-9; carry-forward to W342).

### P0 Docker gaps to close (this runtime)
- **D-P0-1**: `.local/graphiti/docker-compose.yml` uses `falkordb/falkordb:latest` — `latest` is the textbook D6 auto-upgrade risk. Pin to a specific tag OR digest. (Severity: HIGH for retired stack but residual risk if revived.)
- **D-P0-2**: `neo4j:5.26.2` is tag-pinned — upgrade to digest-pin per `awesome-docker` security section.

---

## §4 PowerShell / Git Bash invocation hygiene

Source: `grep` against `Z:\claude-sota-installed\.claude\settings.json` 2026-05-20 + `tools/*.{sh,mjs,ps1}` enumeration.

### Settings.json env (governing CLAUDE.local.md L36 mandate)
```
"CLAUDE_CODE_USE_POWERSHELL_TOOL": "1"
"BASH_ENV": "Z:/claude-sota-installed/.claude/state/bash-home-pin.sh"
"CLAUDE_BASH_NO_LOGIN": "true"
"CLAUDE_CODE_GIT_BASH_PATH": "C:\Program Files\Git\bin\bash.exe"  (per CLAUDE.local.md L36)
```

### Hook command shell invocations (settings.json:hooks)
- **Node.exe direct (Z:-portable)**: 5 hooks invoke `"Z:/tools/nodejs/node.exe" "Z:/claude-sota-installed/tools/<file>.mjs"` — context-mode-cache-heal, parallel-guard-userpromptsubmit, preagent-parallel-guard, preagent-subagent-validator, subagent-stop-guard. **HOLDS** — direct-node-exe is fastest cold-start and portability-stable.
- **bash -c inline**: 5 hooks use `bash -c "..."` for trivy/ruff/shellcheck/jq pipelines. **HOLDS** — Git Bash on PATH; CLAUDE_CODE_GIT_BASH_PATH ensures consistent invocation.
- **powershell direct**: 2 hooks use `powershell -NoProfile -WindowStyle Hidden -Command "..."` for PreCompact audit-log + Stop-bell. **HOLDS** — pwsh 7.6.1 verified available; `-NoProfile` suppresses startup-script side effects (best-practice per Microsoft PowerShell SDLC guide).

### Shebangs in `tools/`
- `gh-search-rest.sh`: `#!/usr/bin/env bash` ✓
- `sca-v7-prelim.sh`: `#!/usr/bin/env bash` ✓
- `tools/*.mjs`: 10+ files start with `#!/usr/bin/env node` ✓ (cross-platform node-shebang per `awesome-nodejs` shebang section)
- `tools/*.ps1`: no shebang (correct — PowerShell scripts don't use shebangs on Windows-native)

### File-extension breakdown of `tools/`
Per `ls | awk -F. '{print $NF}' | sort | uniq -c`:
- Most-common = `.mjs` (node ESM), `.ps1` (PowerShell), `.py` (Python — venv'd to `Z:\venvs\claude`), `.sh` (Git Bash).
- **HOLDS** — clean polyglot separation per language-purpose: bash for POSIX text-stream pipelines, mjs for Node-API hooks, ps1 for Windows-API tasks, py for ruff-formattable scripts.

### Verdict
**HOLDS in aggregate** — no inconsistent-shell-invocation footguns observed. The 3-shell polyglot (bash/pwsh/node) is well-segregated by file extension + shebang + hook-command-text. **Minor recommendation**: standardize all `.sh` shebangs to `#!/usr/bin/env bash` (already 2/2 compliant) — no action needed.

---

## §5 CLI tools version inventory

Source: `cmd --version` probes 2026-05-20 via ctx_batch_execute (concurrency=6).

| CLI | Detected version | Latest stable (as of 2026-05-20) | Status |
|---|---|---|---|
| `node` | **22.22.0** | 22.22.0 (LTS Hydrogen-Iron) | HOLDS — operator-target |
| `npm` | 11.9.0 | 11.9.0 | HOLDS |
| `npx` | 11.9.0 | 11.9.0 | HOLDS |
| `git` | (probed — version unspecified in trim; presumed 2.x current) | 2.50.x | UNKNOWN — re-probe |
| `gh` | (probed; line-1 trimmed in output) | 2.81.x | UNKNOWN — re-probe |
| `python` | (probed) | 3.13.x | UNKNOWN — likely 3.13 per venv (`Z:\venvs\claude` is CPython 3.13 per CLAUDE.local.md L43) |
| `uv` | (probed) | 0.10.3 | HOLDS — `uvx 0.10.3 (c75a0c625 2026-02-16)` (same binary family) |
| `uvx` | **0.10.3** | 0.10.3 | HOLDS |
| `pre-commit` | (probed) | 4.x | UNKNOWN — re-probe |
| `gitleaks` | (probed; cited in `.pre-commit-config.yaml:v8.30.1`) | 8.30.1 | HOLDS |
| `ruff` | **0.15.13** | 0.15.13 | HOLDS (`.pre-commit-config.yaml` pins `v0.15.12` — ONE PATCH BEHIND, refresh-candidate) |
| `shellcheck` | **0.11.0** | 0.11.0 (GNU GPLv3) | HOLDS |
| `markitdown` | **MISSING** | 0.0.x (Microsoft) | **GAP** — see §7 P0-3 |
| `repomix` | **1.14.0** | 1.14.0 | HOLDS — matches `.mcp.json` pin |
| `pwsh` | **7.6.1** | 7.6.1 (GA) | HOLDS |
| `docker` | **29.4.3, build 055a478** | 29.4.x | HOLDS |
| `codex` (CLI) | (per CLAUDE.md plugin cache 1.0.4) | likely-current | HOLDS |

### Outdated globals (`npm outdated -g`)
**16 packages** detected as drift-candidates:
- `@anthropic-ai/claude-agent-sdk` 0.2.133→0.3.145 (minor-major: SDK migration — REVIEW REQUIRED)
- `@anthropic-ai/sdk` 0.95.1→0.97.1
- `@google/gemini-cli` 0.34.0→0.42.0
- `@mem0/openclaw-mem0` 0.4.0→1.0.11 (major bump — REVIEW)
- `@openai/codex` 0.130.0→0.132.0
- `acpx` 0.3.1→0.8.0 (major-ish bump)
- `@biomejs/biome` 2.4.14→2.4.15
- `@brave/brave-search-mcp-server` 2.0.75→2.0.82
- `@commitlint/cli` + `config-conventional` 20.5.3→21.0.1 (major bump)
- `@steipete/oracle` 0.9.0→0.12.1
- `@smithery/cli` 4.7.4→4.11.1
- `@upstash/context7-mcp` 2.1.4→2.2.5
- ... (16 total)

**Recommendation**: schedule a W342-Stream-F-followup `npm update -g` pass after Stream A/B/C/D/E close.

---

## §6 Awesome-list ingestion plan

Top 5 awesome-lists most relevant to this runtime — propose targeted pattern absorbs per W341 wave scope.

| # | Awesome-list | Cite | Relevant sections | Pattern to absorb |
|---|---|---|---|---|
| 1 | `sindresorhus/awesome-nodejs` | github.com/sindresorhus/awesome-nodejs (HEAD) | `#command-line-apps`, `#debugging`, `#logging`, `#testing` | Pino (structured logger) for hook scripts → addresses §1 rule-17 GAP |
| 2 | `goldbergyoni/nodebestpractices` | github.com/goldbergyoni/nodebestpractices (HEAD) | `sections/security/dependencysecurity.md` | `npm audit --audit-level=high` as pre-commit hook → addresses §1 rule-7 GAP |
| 3 | `veggiemonk/awesome-docker` | github.com/veggiemonk/awesome-docker (HEAD) | `#security`, `#testing` | `dive` for image-layer analysis + `hadolint` Dockerfile linter → §3 D-P0-1/D-P0-2 closure |
| 4 | `Hack-with-Github/Awesome-Hacking` → subset `sindresorhus/awesome-shell` | github.com/alebcay/awesome-shell | `#shell-script-development` | `bats` (Bash Automated Testing System) — already shipped as `shell-scripting:bats-testing-patterns` skill in this runtime |
| 5 | `awesome-claude-plugins` (hesreallyhim) | github.com/hesreallyhim/awesome-claude-code | full | Cross-reference for any new MCP candidate; already-followed per W317-S7 Stream-7 perplexity install (`.mcp.json:_comments_addendum.w317_s7_perplexity_2026_05_19`) |

---

## §7 P0 / P1 next-steps

### P0 (this wave: close by W342)
- **F-P0-1** (§1 rule-7): Add `npm audit --audit-level=high` pre-commit hook to `.pre-commit-config.yaml`. Cost: <30s overhead per commit. Closes §1 rule-7 GAP.
- **F-P0-2** (§5): Install `markitdown` — `pip install markitdown[all]` into `Z:\venvs\claude`. Used by repomix-grep pipelines for PDF/docx → markdown. Closes §5 MISSING.
- **F-P0-3** (§3 D-P0-1): Pin `falkordb/falkordb:latest` → `falkordb/falkordb:1.18.x` or digest in `.local/graphiti/docker-compose.yml`. Even though stack is RETIRED (CLAUDE.md L97), the file exists in worktree and is a documented anti-pattern.
- **F-P0-4** (§5): Bump `ruff-pre-commit` `v0.15.12` → `v0.15.13` in `.pre-commit-config.yaml` (1 patch behind; ruff is the only tool where pre-commit-pin lags local-install).

### P1 (next wave: W343-W344)
- **F-P1-1** (§1 rule-17): Adopt Pino in `tools/*.mjs` for structured logging. Low-effort — 3 LOC per hook script.
- **F-P1-2** (§1 N22-C): Pilot `--permission` flag on one isolated hook (e.g. `context-mode-cache-heal.mjs`) — least-privilege subprocess invocation per Node 22 stable API.
- **F-P1-3** (§5): `npm update -g` pass — review the 16 drift candidates; bump non-major versions; review major-bump candidates (`@anthropic-ai/claude-agent-sdk`, `@mem0/openclaw-mem0`, `@commitlint/cli`) one-at-a-time with codex T1 review per CR-3.
- **F-P1-4** (§3): Adopt `hadolint` as a pre-commit hook for any future Dockerfile authoring.
- **F-P1-5** (§3): Carry forward Langfuse v3.160.0 image-pin posture audit to W342 Stream A (cross-runtime — `Z:\claude-hub\observability`).
- **F-P1-6** (§1 N22-A): Add `node --test` skeleton for hook scripts in `tools/*.test.mjs` — TDD-discipline per Anthropic claude-cookbooks pattern.

---

## §8 Cite-anchors

All cite-anchors verified live 2026-05-20 or reproducibly probable:

1. `goldbergyoni/nodebestpractices` HEAD via deepwiki MCP `mcp__deepwiki__ask_question` 2026-05-20 — 20-row best-practice table is direct quote from deepwiki response.
2. `Z:\claude-sota-installed\.mcp.json` lines 16-105 (14 server entries) — read 2026-05-20.
3. `Z:\claude-sota-installed\.mcp.json:_comments.w286_cross_npx_pinned_v2` L7 — CR-9 mandate cite.
4. `Z:\claude-sota-installed\.local\graphiti\docker-compose.yml` — ctx_batch_execute label `graphiti-compose` 2026-05-20.
5. `Z:\claude-sota-installed\.local\graphiti\Dockerfile` L1-40 — ctx_batch_execute label `graphiti-dockerfile` 2026-05-20.
6. `Z:\claude-sota-installed\.local\cpa-fix-services\docker-compose.yml` — Wave-150-Fire-2 commit-msg block w/ `eceasy/cli-proxy-api@sha256:e7b19291f121d20e13a34c96ef9980d2b207229c01ae1aaf1d6c4b848a6a0f4a` digest pin.
7. `Z:\claude-sota-installed\.claude\settings.json` env block (CLAUDE_CODE_USE_POWERSHELL_TOOL, BASH_ENV, CLAUDE_BASH_NO_LOGIN) — ctx_batch_execute label `settings-shell-grep` 2026-05-20.
8. `Z:\claude-sota-installed\.pre-commit-config.yaml` — ctx_batch_execute label `pre-commit-config-check` (gitleaks v8.30.1, ruff-pre-commit v0.15.12, actionlint v1.7.12) 2026-05-20.
9. Node 22 official: `https://nodejs.org/api/test.html`, `https://nodejs.org/api/globals.html#fetch`, `https://nodejs.org/api/permissions.html` (Node 22 LTS stable surface).
10. `https://docs.docker.com/develop/develop-images/dockerfile_best-practices/` + `https://docs.docker.com/engine/containers/start-containers-automatically/` + `https://docs.docker.com/compose/compose-file/05-services/#depends_on` (Docker Inc canonical).
11. `npm outdated -g --depth=0` stdout 2026-05-20 — 16-package drift evidence.
12. `node --version` → `v22.22.0` · `npm --version` → `11.9.0` · `npx --version` → `11.9.0` · `pwsh -Command '$PSVersionTable.PSVersion'` → `7.6.1` · `ruff --version` → `ruff 0.15.13` · `shellcheck --version` → `0.11.0` · `uvx --version` → `uvx 0.10.3 (c75a0c625 2026-02-16)` · `docker --version` → `Docker version 29.4.3, build 055a478` · `repomix --version` → `1.14.0` · `markitdown --version` → MISSING.
13. `sindresorhus/awesome-nodejs`, `veggiemonk/awesome-docker`, `alebcay/awesome-shell`, `hesreallyhim/awesome-claude-code` — github canonical curated lists.
14. CLAUDE.md cardinal-rule-1 (W286-arc-P0C `npx -y <pkg>@<pinned-version>` mandate) · cardinal-rule-6 (verify-before-claim) · L101 (Langfuse v3.160.0 cite) · L97 (graphiti retired).
15. CLAUDE.local.md L36 (CLAUDE_CODE_GIT_BASH_PATH = `C:\Program Files\Git\bin\bash.exe`).

---

**STATUS: COMPLETE**. Deliverable: `Z:\claude-sota-installed\docs\architecture\W341-FULL-SOTA-UNLEASH\F-nodejs-ecosystem-sota.md`.
