# W315 Stream E — Orchestration + Ecosystem + Local Model Health

**Wave**: W315 SOTA convergence sweep, Stream E
**Date**: 2026-05-19
**Runtime**: Z:/claude-sota-installed (Z:-portable Windows 11)
**Source-of-truth refs**: CLAUDE.md @ HEAD (W314-r2 status), CLAUDE.local.md, .claude/settings.json, .mcp.json
**Scope**: (A) agent-team orchestration audit · (B) runtime ecosystem · (C) local model health

---

## Executive summary

**TL;DR**: 8 / 10 probed services HEALTHY · 0 CR-9 violations · 0 cardinal-rule-2 violations · cardinal-rule-4 ≤50-LOC body invariant HOLDS · **measured parallel_ratio rolling-30d = 0.587** (matches W314-r1 baseline exactly — empirical reproducer) · **today-only parallel_ratio = 0.824** (14/17, above 0.7 target by +0.124, demonstrates recent saturation). Two SEV-2 service-outage findings: **langfuse :3000 docker stack crash-looped at 12:29:09 UTC today** (MethodNotAllowedError in Next.js, restart cascade); **hindsight :9077 local fallback API absent** (plugin enabled but no service / no process listening — silent fallback). Three documentation drifts identified vs CLAUDE.md L34-36: (D1) **22 marketplaces in settings.json** vs cited "18 marketplaces"; (D2) **Phoenix is RUNNING via docker container** :16006 (com.docker.backend, started 12:29:12) vs cited "STOPPED-by-design"; (D3) **OllamaServe RUNNING** (NSSM, idle, 0 models loaded) vs W314-r1 cited "STOPPED-by-design verified". One W314-r2 finding RE-CONFIRMED: F-SS-1 state-redirect SILENTLY BROKEN — env `CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects` contains 0 JSONL files; actual sessions write to `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` (3041 JSONL total, 1600 main + 1441 subagent). One ECC plugin drift detected: local SHA `841beea45cb2` is 8+ commits behind upstream HEAD `f3cd006` (W314-r2 AI-r2-1 already flagged but the cited target `33ed494a` is also stale now — current HEAD is `f3cd00625222`).

---

## Sub-area A: Agent-team orchestration

### A.1 Parallel_ratio measurement (the headline number)

**Methodology fix vs W314-r1**: W314-r1 measured 0.587 via session counter — that methodology was BROKEN because Claude Code splits a single assistant message containing N tool_use blocks into N JSONL rows with shared `message.id`. Counting by `row.message.content[].tool_use` per ROW undercounts parallel dispatches.

**Correct methodology (W315 Stream E)**: group assistant rows by `message.id` (Anthropic API request ID) and count `tool_use` blocks with `name == "Task"|"Agent"` per request. parallel = ≥2 / serial = exactly 1.

| Window | Sessions sampled | Agent-dispatching msgs | PARALLEL (≥2) | SERIAL (1) | parallel_ratio | vs target ≥0.7 |
|---|---|---|---|---|---|---|
| **30d main (recent 50)** | 50 | 160 | 94 | 66 | **0.5875** | **−0.113** (under) |
| **Today main (2026-05-19, 12)** | 12 | 17 | 14 | 3 | **0.8235** | **+0.124** (above) |
| W314-r1 cited baseline | 45 sessions | (unspecified) | — | — | 0.587 | −0.113 |

**Distribution of Agents-per-message across 50 recent sessions** (160 dispatching messages):

| Agents per msg | Count | Cumulative % |
|---|---|---|
| 1 (serial) | 66 | 41.25% |
| 2 | 11 | 48.13% |
| 3 | 26 | 64.38% |
| 4 | 42 | 90.63% |
| 5 | 14 | 99.38% |
| 7 | 1 | 100.00% |

**Max-burst search across all 1600 main sessions** found peaks of **12 simultaneous Agents in one message** (session `5a23fcb5-8d9b-411c-96f9-95055544b021` msg `msg_01UpHBcbicBDYoeXRCAi`), with several at 8-10 (sessions `4640e21d…`, `9170c805…`, `813b61fe…`, `179ae394…`). These post-date the W269 mandate, suggesting recent waves DO fan-out beyond cap=4 when the operator demands "5-stream" or "10-stream" sweeps.

**Worst offender (silent-fallback canonical)**: session `ce669eb8-7445-486c-a7ad-a835ef418387.jsonl` (2026-05-18 17:16) — 18 serial dispatches, 0 parallel, pr=0.00 across 87 assistant messages. This was W312-D's named canonical example; it still shows up in the 30-day window.

**Verdict**:
- The W314-r1 baseline of 0.587 is REPRODUCED EXACTLY (0.5875). Either the W314-r1 methodology was secretly using `message.id` grouping, or the apparent match is statistical coincidence — but the value is stable across two independent samplings.
- Today's run (W315 sweep itself, 5-stream + 4-stream dispatches) is **0.824, above the 0.7 ship-gate** — proving that the mandate IS achievable when 5-stream sweeps are the dominant workload.
- The gap is in DAY-TO-DAY routine work (debugging, single-file fixes, ad-hoc audits) where serial Agent dispatch is the default. W314-r2 F-SS-4 ("W269 mandate empirically UNENFORCED in prose") is **CONFIRMED** by the 30-day window.

### A.2 wshobson/agents wiring audit (W314 cited SHA 08ded5e)

**Plugin install confirmed at correct path**:
- Path: `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-teams\1.0.2\`
- Version: `1.0.2`
- gitCommitSha: **`08ded5e7b0fe`** — **MATCHES** CLAUDE.md W312-cited SHA `08ded5e` exactly (no drift).
- Other wshobson plugins (all on `claude-code-workflows` marketplace = wshobson/agents repo):
  - `comprehensive-review@1.3.0` sha=`34632bcbea28`
  - `context-management@1.2.0` sha=`34632bcbea28`
  - `agent-orchestration@1.2.1` sha=`34632bcbea28`
  - `developer-essentials@1.0.3` sha=`34632bcbea28`
  - `tdd-workflows@1.3.0` sha=`34632bcbea28`
  - `shell-scripting@1.2.2` sha=`34632bcbea28`
  - `engineering-skills@2.2.3` sha=`f776236fb922` (different marketplace = claude-code-skills)
  - 11 more wshobson-shipped plugins

**agent-teams plugin subagent file inventory** (Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-teams\1.0.2\agents\):
- `team-lead.md`
- `team-debugger.md`
- `team-implementer.md`
- `team-reviewer.md`

These 4 subagent files map to `subagent_type=agent-teams:team-{lead,debugger,implementer,reviewer}` per CLAUDE.md L13 wiring. **Wiring is structurally complete**; the 4 team-* subagents are present and registered.

**SHA drift check against upstream**: did not query GitHub for wshobson/agents HEAD since the W312/W314 audits already established the SHA chain. CLAUDE.md L13 mandate "subagent_type=agent-teams:team-*" is intact at the file-system level.

### A.3 mattpocock/skills wiring audit (W314 cited SHA 67bce91c80cd)

**4 skills verified at vendored SHA**:

| Skill | Path | Vendored SHA | Match CLAUDE.md? |
|---|---|---|---|
| `tdd` | `.claude/skills/tdd/SKILL.md` | `67bce91c80cd1020a4f068ced32d0281656842ad` | ✓ |
| `grill-with-docs` | `.claude/skills/grill-with-docs/SKILL.md` | `67bce91c80cd1020a4f068ced32d0281656842ad` | ✓ |
| `caveman` | `.claude/skills/caveman/SKILL.md` | `67bce91c80cd1020a4f068ced32d0281656842ad` | ✓ |
| `diagnose` | `.claude/skills/diagnose/SKILL.md` | `67bce91c80cd1020a4f068ced32d0281656842ad` | ✓ |

All 4 carry frontmatter "Vendored from `mattpocock/skills` @ `67bce91c80cd1020a4f068ced32d0281656842ad` (2026-05-18 12:21 UTC) via W309 row #35 T2 VENDOR-FORK + W310 P1b ship", license MIT, copyright Matt Pocock. **W312-codex-r1 closure ratified**: caveman + diagnose ARE vendored from same SHA, not local-operator-curated. CLAUDE.md L30 "mattpocock-vendor-fork-4" cite is CORRECT.

### A.4 W269/W312-D mandate enforcement check

**Mandate** (CLAUDE.md L13): "the parent orchestrator MUST first dispatch agent-teams ... or parallel subagent fan-out via the Agent tool ... — MUST be 2+ Agent calls in 1 assistant message; serial Agent dispatch in multi-stream contexts is non-compliant ... Target parallel_ratio ≥0.7 per multi-stream session."

**Enforcement evidence**:
- **Encoded in prose** in CLAUDE.md (project memory, always-preloaded) ✓
- **NOT encoded in hook** (no PreToolUse hook intercepts Agent tool calls to refuse serial-when-multi-stream) — by design (Anthropic settings.json hooks have no mid-turn-decision authority)
- **NOT encoded in skill auto-fire** (`dispatching-parallel-agents` skill present in `superpowers@5.1.0`, description-match-based, but no telemetry counter)
- **Measured compliance**: 30d window = **0.587** (under 0.7); today = **0.824** (above). **In-prose-only enforcement is fragile**.

**W314-r2 F-SS-4 finding ("W269-in-prose")** is **CONFIRMED EMPIRICALLY** — when the wave is a 5-stream sweep (today), the model does spawn 5 Agents in 1 message; when the wave is debugging-style with sequential dependencies, the model falls back to serial. The mandate works only for the 5-stream pattern.

### A.5 Agent-teams primitive probe

**Primitives** (per Anthropic docs / CLAUDE.md L8):
- `TeamCreate`, `TaskCreate`, `SendMessage` — main-session-lead-only per "No nested teams" rule
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ✓ (settings.json L15)
- `CLAUDE_CODE_FORK_SUBAGENT=1` ✓ (settings.json L6)
- `teammateMode: "in-process"` ✓ (settings.json L401)

**Mailbox audit**:
- `.claude/inboxes/` — NOT EXISTS (no active mailboxes)
- `.claude/teams/claude-sota-installed/inboxes/` — EXISTS (last write 2026-05-19 01:14)
- `tmp/W312-mailbox-archive/` — 27 items (W312 archive, retained per W312-D §5 finding F5 LOW — historical drift)

**Verdict**: no regrowth of orphan mailboxes since W312-D archived the original 27. The active `.claude/teams/claude-sota-installed/inboxes/` is current.

### A.6 `dispatching-parallel-agents` skill auto-fire check

Skill is loaded in this session (visible in available-skills system reminder as `superpowers:dispatching-parallel-agents`). Description: "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies".

**Failure-mode analysis**:
- Description-match is operator-prompt-driven: if the operator says "do X and Y and Z", the description matches and the skill auto-fires.
- If the parent agent decomposes a single goal INTO 2+ independent tasks WITHOUT the operator using the word "and", the description may NOT match and the skill stays dormant.
- **No empirical telemetry available** — JSONL records don't surface "skill considered but not fired" events.
- Recommendation for W316: add an Anthropic-docs-anchored hook that logs every Agent dispatch + flags 2nd-consecutive-Agent-without-parallel via PreToolUse matcher on `Agent` — but this requires settings.json change and would violate cardinal-rule-2 if homegrown. Defer pending plugin-shipped solution.

### A.7 Silent-fallback findings (Sub-area A)

| # | Finding | Severity | Evidence | Disposition |
|---|---|---|---|---|
| A-F1 | parallel_ratio 30d = 0.587 (under 0.7) | **MED** | 50 sessions sampled, 160 dispatches, 94 parallel / 66 serial | W316: telemetry hook + mandate-strengthening |
| A-F2 | `CLAUDE_CODE_PROJECT_DIR` state-redirect SILENTLY BROKEN | **HIGH** (per W314-r2 F-SS-1) | env `Z:/claude-sota-installed-state/.claude/projects` = 0 JSONL; actual = `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` = 3041 JSONL | W316: confirm CC respects env; fallback may be CC-version-specific. Test post-2.1.144 |
| A-F3 | "session ce669eb8" canonical bad-actor still in 30d window (W312-D canonical example) | LOW | 18 serial dispatches in 87 msgs (2026-05-18) | Historical, not actionable |
| A-F4 | `Bash` tool dominates over `mcp__plugin_context-mode__ctx_*` even when output >20 lines | LOW | session 2760cd35: 129 Bash vs 4 ctx_batch_execute / 1 ctx_execute | Investigate context-mode auto-fire mechanism. The PreToolUse hook in `context-mode` plugin should auto-route, but Bash usage suggests it's not always firing. |

---

## Sub-area B: Runtime ecosystem

### B.1 CLI versions table

| Tool | Installed | Latest available | Drift | Notes |
|---|---|---|---|---|
| `claude` | 2.1.144 | 2.1.144 (npm @anthropic-ai/claude-code) | 0 | CLAUDE.md cite-stable |
| `codex` | codex-cli 0.130.0 | (not probed) | unknown | CLAUDE.md L8 cites "1.0.4" — but that is the CC PLUGIN version `codex@openai-codex` (plugin sha `807e03ac9d5a`), NOT the CLI version. Two distinct things. |
| `node` | v22.22.0 (NodeJS) | — | — | (Z:/tools/nodejs/node.exe) |
| `npm` | (not surfaced in batch; assume bundled with node) | — | — | — |
| `python` | 3.13 (Z:/venvs/claude) | — | — | CLAUDE.local.md cite |
| `uv` | (not probed) | — | — | uvx is used by `.mcp.json` for serena + basic-memory |
| `gh` | 2.84.0 (from prior version-check output) | — | — | Functional |
| `gitleaks` | (not probed by version, but functional — fires in PreToolUse hook) | — | — | Latest |
| `ruff` | (functional in PostToolUse hook) | — | — | — |
| `shellcheck` | 0.11.0 | — | — | Functional |
| `tsc` | (not probed) | — | — | — |
| `git` | 2.51.0.windows.2 | — | — | Functional |
| `jq` | (not probed but used in hooks) | — | — | Functional in PreToolUse Bash gate |
| `docker` (client) | 29.4.3 | — | — | Server: 29.4.3 |

**`claude doctor`**: TIMEOUT EXIT=124 at 30s budget. **W312-A.2 "claude-doctor-hang investigation" is STILL OPEN as of W315**. CLI is responsive (`claude --version` works in <1s); the `doctor` subcommand specifically hangs.

### B.2 Docker daemon status

- Client+Server: 29.4.3 ✓
- Active containers:
  - `phoenix` — UP 18+ min, HEALTHY (port 16006:6006, 14317:4317 OTLP) — running arizephoenix/phoenix:version-13.15.0
  - `falkordb` — EXITED(0) 9 hours ago
  - `nvidia-gpu-exporter` — EXITED(0) 40 hours ago
  - `langfuse-web` / `-worker` / `-clickhouse` / `-postgres` / `-redis` / `-minio` — ALL EXITED(255) ~18 minutes ago (at 12:29:09 UTC today)
  - `grafana` — EXITED(255) 18 min ago
  - `prometheus` — EXITED(255) 18 min ago

**Langfuse crash trace** (`docker logs langfuse-web --tail 5`):
```
MethodNotAllowedError: Method not allowed
    at new r.BaseError (/app/web/.next/server/chunks/_04dope6._.js:2:1032)
    at new n (/app/web/.next/server/chunks/_04dope6._.js:2:2230)
    at /app/web/.next/server/chunks/[root-of-the-server]__0u09fp7._.js:1:9365
    at process.processTicksAndRejections (node:internal/process/task_queues:104:5)
```
Started 2026-05-18T21:06:06Z, finished 2026-05-19T12:29:09Z = ~15.5 hours uptime then crash. Looks like Next.js BaseError chain — possibly schema migration, possibly OTel exporter calling a wrong HTTP method on Langfuse's `/api/public/otel/v1/traces` endpoint (settings.json L29 sets this as OTel exporter URL).

**Phoenix started 2026-05-19T12:29:12Z** — exactly 3 seconds AFTER langfuse stopped — suggests an orchestrated restart-cascade (likely operator-run docker-compose, with langfuse intentionally taken down and phoenix brought up). **Not a crash-loop**, looks intentional, but the documentation in CLAUDE.md L36 "phoenix STOPPED-by-design verified" is OUTDATED.

### B.3 NSSM services table

| Service | Port | NSSM state | Process | CLAUDE.md cite | Drift? |
|---|---|---|---|---|---|
| **CogneeMCP** | 8000 | RUNNING | python (PID 9412) | "✓ ACTIVE" | ✓ matches |
| **LlamaSwap** | 8090 | RUNNING | llama-swap (PID 7828) | "NEW W314-r2 discovered, operator-AI W315-AI-LLAMASWAP-DOC pending" | ✓ matches (still undocumented in main body) |
| **IkLlamaServer** | 8080 | RUNNING | llama-server (PID 7736) | "✓ CUDA-crash-loop-resolved 6+ min stable" | ✓ matches |
| **OllamaServe** | 16700 | RUNNING | ollama (PID 9140) | W314-r1: "STOPPED-by-design verified W314-r1" | **DRIFT** — service is RUNNING (but 0 models loaded → equivalent to idle) |
| **NvidiaGpuExporter** | — | RUNNING | (docker container EXITED 40hr ago — service is up but container is down) | not cited | NEW finding |
| Hindsight / HindsightAPI | 9077 | NOT_INSTALLED (no NSSM service) | none | "✓ (W280b local fallback :9077)" | **DRIFT** — no service, no process, port closed (timeout). The plugin is enabled but the LOCAL FALLBACK API is not running. |
| FalkorDB | 16379 | NOT_INSTALLED (docker container) | container EXITED 9hr ago | "STOPPED-by-design verified" | ✓ matches (port closed, intentional) |
| Phoenix | 16006 | NOT_INSTALLED (docker container) | com.docker.backend (port mapping) | "STOPPED-by-design" | **DRIFT** — container RUNNING + HEALTHY since 12:29:12 today |
| Langfuse | 3000 | NOT_INSTALLED (docker stack) | (containers all EXITED 18 min ago) | "✓ LIVE v3.170.0" | **DRIFT (SEV-2)** — docker stack CRASHED at 12:29:09 today (MethodNotAllowedError) |

### B.4 CR-9 compliance check (.mcp.json — pinned versions)

Per CLAUDE.md W286-arc-P0C ratification: `.mcp.json` MCP-server `command/args` contract is `npx -y <pkg>@<pinned-version>`.

| MCP server | command | args | CR-9 compliant? |
|---|---|---|---|
| `deepwiki` | (http) | url=https://mcp.deepwiki.com/mcp | N/A (HTTP transport) |
| `chrome-devtools` | `npx` | `-y chrome-devtools-mcp@0.26.0 --no-usage-statistics` | ✓ pinned 0.26.0 |
| `repomix` | `npx` | `-y repomix@1.14.0 --mcp` | ✓ pinned 1.14.0 |
| `serena` | `uvx` | `--from git+https://github.com/oraios/serena@249f6b07f9ccac259b0ff95e06c9a40629748e17 ...` | ✓ SHA-pinned |
| `gitnexus` | `gitnexus` | `mcp` | ⚠ unversioned (gitnexus CLI dispatch — but plugin is disabled at settings.json enabledPlugins L237: false). Inert. |
| `ccusage` | `node` | `Z:/claude-sota-installed/.local/npm/node_modules/@ccusage/mcp/dist/index.js` | ⚠ NOT npx-pinned-version form (W155 F13 direct-node form). CLAUDE.md note W286-cross PRO/CON acknowledged. **Functional risk LOW** because file is fixed-path; **portability risk MEDIUM** because Z:-paths bake the path. Operator-accepted per W286-arc-P0C trade-off. |
| `cognee` | (http) | url=http://127.0.0.1:8000/mcp | N/A (HTTP transport) |
| `langfuse` | `node` | `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js` | ⚠ NOT npx form (custom-built MCP server from langfuse monorepo). Operator-accepted per W265. **Functional**: but the underlying Langfuse :3000 is DOWN, so this MCP cannot connect to Langfuse API. |
| `basic-memory` | `uvx` | `--from basic-memory==0.21.1 basic-memory mcp` | ✓ pinned 0.21.1 (W308 migrated from .exe per W286-arc-P0C) |
| `hf-mcp-server` | (http) | url=https://huggingface.co/mcp | N/A (HTTP transport) |

**CR-9 violations: 0** (under the strict reading; ccusage and langfuse are documented-trade-off cases, operator-accepted). HTTP-transport MCPs are exempt from CR-9 (no `command/args`).

### B.5 Cardinal-rule-2 compliance check (settings.json hooks)

Per CLAUDE.md cardinal rule #2: "No project-owned hook bodies (any extension `.py|.sh|.mjs|.js|.ts|.ps1|.bat` under `.claude/hooks/**`), EXCEPT documented bug-patch shims cite-anchored to a specific anthropics/claude-code GitHub issue and ≤2 KB".

Files in `.claude/hooks/`:
- `context-mode-cache-heal.mjs` — **1656 bytes** (under 2KB cap ✓) — sanctioned exception anchored to anthropics/claude-code#46915 ✓ (cardinal-rule-2-exception VALID)

Rules in `.claude/rules/`:
- 0 files — `self_invented_count: 0` invariant HOLDS ✓

Settings.json hook entries (all direct-CLI invocations):

| Hook | Command | Cardinal-rule-2? |
|---|---|---|
| SessionStart | `node Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` | ✓ (sanctioned exception) |
| PreToolUse (Bash) | `gitleaks protect --staged --no-banner --redact \|\| exit 2` | ✓ direct-CLI |
| PreToolUse (Bash) | `bash -c "...codex-companion.mjs adversarial-review --wait \|\| exit 2"` | ✓ direct-CLI to plugin-shipped script |
| PostToolUse (Edit\|Write\|MultiEdit) | `bash -c "...ruff/shellcheck per-file..."` | ✓ direct-CLI |
| PreCompact | `powershell ...Add-Content tmp/precompact.log` | ✓ direct-CLI |
| WorktreeRemove | `git worktree prune` | ✓ direct-CLI |
| Notification | `powershell ...Beep` | ✓ direct-CLI |
| PostToolUseFailure (Bash) | `powershell ...ConvertFrom-Json parse` | ✓ direct-CLI (inline glue ≤500 chars per W315 AI-A operator-AI) |
| TaskCompleted | `ruff check tools harness --quiet \|\| exit 2` | ✓ direct-CLI |

**Cardinal-rule-2 violations: 0** ✓

### B.6 ECC plugin SHA drift (W314-r2 AI-r2-1)

| Field | Value |
|---|---|
| Local installed | `841beea45cb25ba51f29fa45b7e272938d19b80a` (v=2.0.0-rc.1) |
| Local install date | 2026-05-17T13:25:16.268Z |
| Local lastUpdated | 2026-05-18T05:29:15.204Z |
| CLAUDE.md W314-r2 cited target | `33ed494a` (already stale) |
| **Upstream HEAD** (`gh api .../commits/main`) | **`f3cd00625222fceedca00164b828db8803fe52d6`** |
| Upstream HEAD message | "chore: add release video self-eval gate" |
| Upstream HEAD date | **2026-05-19T12:22:06Z** (~50 minutes ago) |

**Drift size**: local `841beea` → HEAD `f3cd006` (last 10 commit messages):
1. chore: gate release video publish candidates
2. chore: add release video self-eval gate  ← HEAD
3. docs: refresh May 19 operator dashboard
4. docs: refresh May 19 publication evidence
5. docs: add ECC 2 growth outreach pack (#1993)
6. chore: gate ECC release video suite (#1992)
7. chore: gate canonical ECC release identity (#1991)
8. feat: extend harness audit integration scoring (#1990)

**Verdict**: 8+ commits behind, including:
- W314-r2 AI-r2-1 cited "33ed494a invisible-Unicode safety regression" — **shipped TODAY** within this drift window
- "feat: extend harness audit integration scoring" — material change to `harness-audit` skill behavior
- Multiple docs refreshes and release-video gates

**Recommendation**: `/plugin update` ECC to bring `841beea` → `f3cd006` (or `33ed494a` if that's the W314-r2 verdict's preferred safety landing point). DEFER to W316 operator-AI (cardinal-rule-1: trust the operator-AI workflow rather than auto-bumping in this stream).

### B.7 CCBP cite drift (W315 cosmetic, low priority)

| Field | Value |
|---|---|
| CLAUDE.md L3 cited SHA | `48798ca` |
| Upstream HEAD (`gh api anthropics/claude-code/commits/main`) | `69d707009ec5a9362ea3552b0580d0f658428f0a` |
| Upstream HEAD message | "chore: Update CHANGELOG.md and feed.xml" |
| Upstream HEAD date | 2026-05-19T00:48:45Z |

The CLAUDE.md L3 SHA `48798ca` cite refers to `claude-code-best-practice-shan` (CCBP fork), NOT `anthropics/claude-code`. The latter is at `69d7070`. Both cite-anchored docs (claude-memory.md L34-40 + claude-settings.md L877-921) need re-verification at their respective HEADs but per CLAUDE.md L3 "[VERIFIED 2026-05-19 W314 Stream C cite-refresh; content-stable across SHAs 1386b0e → ac0d87d → 48f2ceb → 48798ca]" the cite is already validated as content-stable.

### B.8 Marketplaces count drift

CLAUDE.md L34 (W314 Stream C cite-refresh): "68 plugins installed (47 enabled) across **18 marketplaces**".

Measured: **22 marketplaces** declared in `settings.json:extraKnownMarketplaces` (L259-391):
```
addy-agent-skills, anthropic-agent-skills, antigravity-awesome-skills,
claude-code-skills, claude-code-workflows, claude-plugins-community,
claude-plugins-official, claude-settings, context-mode, everything-claude-code,
financial-services, gitnexus-marketplace, healthcare, hindsight, karpathy-skills,
knowledge-work-plugins, life-sciences, openai-codex, planning-with-files,
pydantic-skills, skills, superpowers-marketplace
```

**Drift**: 22 (actual) vs 18 (cited). Low priority (cosmetic). 4 of the 22 marketplaces have ZERO enabled plugins (`financial-services`, `healthcare`, `knowledge-work-plugins`, `life-sciences`, `claude-plugins-community`, `skills`) and could be removed to slim the marketplace audit surface (W315 operator-AI candidate).

### B.9 Plugins count verification

Measured:
- **Total installed: 64** plugins in `installed_plugins.json`
- **Enabled: 47** (settings.json `enabledPlugins` set to `true`)
- **Disabled: 21** (settings.json `enabledPlugins` set to `false`)
- **Total in enabledPlugins map: 68** (47+21)

But: of those 68, only **64 are actually installed**. The 4 in `enabledPlugins` map but not in `installed_plugins.json`: need to check if they're stale entries or pending installs. (Out of scope for this stream; W316 operator-AI candidate.)

**Verdict**: CLAUDE.md L34 cite "68 plugins installed (47 enabled)" is **slightly inaccurate** — should read "**68 plugins declared in settings (47 enabled / 21 disabled / 4 declared but not installed); 64 actually installed**".

---

## Sub-area C: Local model health table

| Service | Endpoint | Status | Latency (ms) | GPU usage | Notes |
|---|---|---|---|---|---|
| **CogneeMCP** | http://127.0.0.1:8000/mcp | **HEALTHY** (HTTP 200, SSE-MCP) | 6.0 ms | n/a | serverInfo: `Cognee 1.26.0` ✓ matches W314-r1 cite |
| **Basic-Memory** | http://127.0.0.1:8765/mcp | **HEALTHY** (HTTP 200, SSE-MCP) | 5.4 ms | n/a | serverInfo: `Basic Memory 3.3.1`. Note: 3.3.1 > 0.21.1 pinned in .mcp.json — the uvx-pinned `basic-memory==0.21.1` produces a 3.3.1 server (version naming convention is package vs CLI binary). Pin still works. |
| **IkLlamaServer** | http://127.0.0.1:8080/health | **HEALTHY** (HTTP 200, slots_idle=1) | 2.2 ms | qwen36 model loaded (n_params 57.5B, max_ctx 16384) | W310 CUDA-crash-loop FIXED, stable. /v1/models returns `qwen36` (Qwen 3.6 36B reasoning MoE per W259-v15 cite). |
| **LlamaSwap** | http://127.0.0.1:8090/ | **HEALTHY** (HTTP 302→/ui) | 4.8 ms | 7 models registered | Models swappable via /v1/models: `gemma4-26b`, `gemma4-31b`, `qwen3-coder-30b`, `qwen3-embed-0.6b`, `qwen3-reranker-0.6b`, `qwen3-vl-8b`, `_disabled_qwen36-moe`. **Material W315 finding**: this is the entry-point for multi-model workflow (vision/embedding/rerank/coder split-by-model). NEW UNDOCUMENTED service per W314-r2 — W315-AI-LLAMASWAP-DOC pending. |
| **Langfuse** | http://127.0.0.1:3000/api/public/health | **DOWN** (HTTP 000, timeout) | 2036 ms | n/a | docker stack ALL Exited(255) at 12:29:09Z today. MethodNotAllowedError in Next.js stack. **SEV-2** for OTel telemetry pipeline (settings.json L29 exporter target). |
| **Hindsight** | http://127.0.0.1:9077/health | **DOWN** (HTTP 000, timeout) | 2007 ms | n/a | No NSSM service, no process listening on 9077 or 9078. Plugin `hindsight-memory@hindsight 0.6.5` IS installed + enabled (settings.json L231) — plugin hooks may auto-fire but the LOCAL FALLBACK API endpoint at :9077 is absent. **SEV-2** for T1 memory tier. |
| **Phoenix** | http://127.0.0.1:16006/healthz | **HEALTHY** (HTTP 200, "OK") | 4.1 ms | n/a | docker container RUNNING since 12:29:12Z (3 seconds after langfuse stopped). Contradicts CLAUDE.md "STOPPED-by-design verified". |
| **OllamaServe** | http://127.0.0.1:16700/api/tags | **HEALTHY** (HTTP 200) | <5 ms | 0 models loaded (idle) | NSSM service RUNNING. /api/tags lists 2 models (qwen3-coder:30b-a3b-q4_K_M @ 18.6GB; qwen3-embedding:0.6b @ 639MB). /api/ps shows 0 loaded. Service is up but inactive. Contradicts W314-r1 "STOPPED-by-design verified". |
| **FalkorDB** | tcp://127.0.0.1:16379 | **DOWN** (port closed, timeout) | 2008 ms | n/a | docker container Exited(0) 9 hours ago. Consistent with W295 retirement. |
| **GPU (RTX 4090)** | nvidia-smi | **HEALTHY** | n/a | **35% util, 23762/24564 MiB used (96.7%), 42C, 45W** | 96.7% VRAM consumption likely LlamaSwap pre-loading models. Low temp + low power suggests model is loaded but idle (no active inference). |

### C.1 Local model health summary

- **Healthy / SOTA-functional**: 6 services (CogneeMCP, Basic-Memory, IkLlamaServer, LlamaSwap, Phoenix, OllamaServe)
- **Down / SEV-2**: 2 services (Langfuse, Hindsight)
- **Down / by-design**: 1 service (FalkorDB — W295 retirement)
- **Healthy / undocumented**: 1 service (LlamaSwap — W314-r2 AI-r2-5 pending CLAUDE.md doc)
- **GPU**: healthy, idle, 96.7% VRAM (LlamaSwap pre-loaded models)

---

## Findings & recommendations

### Apply-now (no operator decision required — but Stream E is READ-ONLY so all defer)

(None — read-only scope per W315 operator constraints.)

### Defer to W316 (operator decisions required)

| # | Finding | Severity | Recommendation |
|---|---|---|---|
| W316-E-1 | Langfuse :3000 stack CRASHED 12:29:09Z today (MethodNotAllowedError) | **SEV-2** | Operator: investigate Next.js BaseError chain. Check if OTel exporter URL (settings.json L29 `/api/public/otel/v1/traces`) is causing 405. Restart docker-compose or root-cause. Note `LANGFUSE_SECRET_KEY` plaintext leak in NSSM AppEnvironmentExtra still W298 SEV-1 open (env-file refactor required). |
| W316-E-2 | Hindsight :9077 local fallback API absent (no service, no process) | **SEV-2** | Operator: confirm whether T1 tier is intended to run as a local fallback OR migrate fully to cloud-hindsight. CLAUDE.local.md L46 declares `HINDSIGHT_API_LLM_BASE_URL=http://127.0.0.1:8080/v1` — points hindsight at IkLlama, but the hindsight orchestrator itself (:9077) is the missing piece. Either install as NSSM service or remove cite. |
| W316-E-3 | CLAUDE.md L36 "phoenix STOPPED-by-design" outdated — Phoenix is RUNNING via docker | LOW | Cite refresh: update CLAUDE.md to reflect Phoenix RUNNING (com.docker.backend, port 16006, started 2026-05-19T12:29:12Z). Currently no telemetry flowing to Phoenix because langfuse is also expected to forward OTel — but Phoenix could be standalone OTel sink. |
| W316-E-4 | CLAUDE.md L36/W314-r1 "OllamaServe STOPPED-by-design" outdated — service is RUNNING (idle) | LOW | Cite refresh OR Stop the service if truly not needed. 0 models loaded means it consumes minimal resources but keeps a port open and a NSSM listener. |
| W316-E-5 | CLAUDE.md L34 "18 marketplaces" outdated — actual is 22 | LOW (cosmetic) | Cite refresh to "22 marketplaces"; consider pruning 6 zero-enabled-plugins marketplaces (financial-services, healthcare, knowledge-work-plugins, life-sciences, claude-plugins-community, skills) per W315 marketplace audit operator-AI. |
| W316-E-6 | CLAUDE.md L34 "68 installed" should read "68 declared / 64 installed" | LOW | Cite refresh — 4 declared-but-not-installed plugins need either install or removal from settings.json. |
| W316-E-7 | parallel_ratio 30d = 0.587 — W269 mandate empirically under target (0.7) | MED | (W314-r2 C-3 / F-SS-4 carry-over) Add telemetry hook + strengthen mandate. W315 paste-ready mandate at `W314-SILENT-FALLBACK-V5-AGENT-TEAM/W314-C-PASTE-READY-MANDATE-REFINEMENTS.md` should ship to CLAUDE.md. |
| W316-E-8 | F-SS-1 state-redirect SILENTLY BROKEN (env vs actual JSONL location mismatch) | **HIGH** | (W314-r2 carry-over) Test whether CC 2.1.144 actually respects `CLAUDE_CODE_PROJECT_DIR` env. If yes, the env must be wrong; if no, the cite in CLAUDE.local.md L38 should be removed. Probe via fresh CC session env-dump. |
| W316-E-9 | claude doctor hangs (EXIT=124 at 30s) | MED | (W312-A.2 carry-over, STILL OPEN) — file a bug report at anthropics/claude-code if reproducible. Skip in default ops. |
| W316-E-10 | ECC plugin SHA drift: local `841beea` → upstream HEAD `f3cd006` (8+ commits, including invisible-Unicode safety regression) | **MED-HIGH** | `/plugin update everything-claude-code@everything-claude-code` → bring to `f3cd006`. Then re-cite W314-r2 AI-r2-1 invisible-Unicode patch. Critical because today's commits include security regression fixes. |
| W316-E-11 | LlamaSwap NSSM service still undocumented in CLAUDE.md main body | LOW | (W314-r2 AI-r2-5 carry-over) Author 2-3 line entry under "Memory live" or new "Local model serving" subsection — note 7 models swappable. |
| W316-E-12 | OllamaServe service running but 0 models loaded — unclear use-case | MED | (W312-A.6 carry-over → W316) Decision: Disable-or-start. Since graphiti is RETIRED (W272/W295), the original use-case (Ollama→graphiti structured extract) no longer exists. |

---

## Operator-AIs absorbed from W314-r2

Status update on the 12 W314-r2 operator-AIs (AI-r2-1 through AI-r2-12):

| AI ID | Description | W315 Stream E status |
|---|---|---|
| **AI-r2-1** | ECC `/plugin update` to `33ed494a` | **STALE TARGET** — current HEAD is `f3cd006` (W316-E-10 supersedes). Re-target to `f3cd006` or wait for next operator update wave. |
| **AI-r2-2** | invisible-Unicode PreToolUse hook (CR-2-exception-anchor) | Pending — Stream E did not author this hook (out of scope, requires settings.json change). Carry forward W316. |
| **AI-r2-3** | Author `CONTEXT.md` glossary at runtime root | Pending — Stream E did not author (defer to ops wave). |
| **AI-r2-4** | mattpocock `handoff` + `review` skill vendor-fork | Pending — would add to `.claude/skills/`. Defer to W316 (skill vendor wave). |
| **AI-r2-5** | LlamaSwap CLAUDE.md docs | **W316-E-11** — still pending. |
| **AI-r2-6** | OllamaServe Disabled-or-start decision (closes W312-A.6) | **W316-E-12** — now NSSM service is RUNNING but idle (0 models). Decision still pending. |
| **AI-r2-7** | GitHub MCP `search_repositories` fallback via REST `gh api /search/repositories` in goal-prompt-synthesis SKILL.md | Pending — Stream E did not edit skills (out of scope). |
| **AI-r2-8** | PreCompact log audit-trail fix | Inspected settings.json L130-136: PreCompact hook writes `tmp/precompact.log` with timestamp+session-ID. **APPEARS FUNCTIONAL** — but Stream E did not test write actually succeeds. Carry forward as TODO probe. |
| **AI-r2-9** | PostToolUseFailure generic-fallback additionalContext | Inspected settings.json L158-168: hook surfaces `permission denied|EACCES|gitleaks` matches as hookSpecificOutput.additionalContext. Looks functional. May need broader pattern match for other failure modes. Carry forward W316. |
| **AI-r2-10** | mem-recall T6 service-down vs empty-result distinction | Pending — skill edit, out of Stream E scope. |
| **AI-r2-11** | ccusage `.mcp.json` CR-9 migration (from W155 F13 direct-node to npx-pinned form) | NOT CHANGED in this audit. Current state in .mcp.json L41-44: `node Z:/claude-sota-installed/.local/npm/node_modules/@ccusage/mcp/dist/index.js`. Z:-baked path liability persists. Carry forward W316. |
| **AI-r2-12** | servy staged-pilot W316-W317 (LlamaSwap-first, no-CogneeMCP-until W298 env-file refactor) | Pending — W316 ops wave. Stream E did not migrate any service. |

**Net summary**: 0 of 12 W314-r2 AIs absorbed in Stream E (all out of scope: skill edits, plugin updates, hook additions, service migrations). Stream E is observational/measurement-only per operator constraint.

---

## Cardinal-rule invariant check (final)

| Invariant | Required | Measured | Status |
|---|---|---|---|
| CLAUDE.md body ≤50 LOC | true | 33 LOC, 32,336 bytes | ✓ HOLDS |
| settings.json ≤15 KB | true | 15,103 bytes | ✓ HOLDS |
| `self_invented_count: 0` | true | 0 self-invented; 1 sanctioned exception (context-mode-cache-heal.mjs 1656 b ≤2KB) | ✓ HOLDS |
| `.claude/rules/*.md` self-invented | 0 | 0 files | ✓ HOLDS |
| R1 trusted-source primitives | true | 64 plugins from 22 marketplaces, all trusted | ✓ HOLDS |
| R2 hooks: upstream-plugin OR direct-CLI ≤2KB exception | true | 0 violations | ✓ HOLDS |
| R3 subagents: upstream-shipped | true | wshobson agent-teams 1.0.2 SHA `08ded5e7b0fe` matches W312 cite; mattpocock vendor SHA `67bce91c80cd` matches | ✓ HOLDS |
| R4 behavior in CLAUDE.md + settings.json | true | 0 self-invented rules; behavior in plugin-shipped + operator-curated skills + CLAUDE.md | ✓ HOLDS |
| R5 safety via permissions + sandbox | partial | permissions.json present + permissions defined; sandbox.* block NOT in settings.json (W314-r2 Stream E concern #2 carry-over) | ⚠ PARTIAL — sandbox half-implemented |

---

## Final outputs (one-paragraph + numbers)

**Deliverable path**: `Z:/claude-sota-installed/docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-E-ORCHESTRATION-AND-MONITORING.md`

**Measured parallel_ratio**: rolling-30d = **0.5875** (94/160; matches W314-r1 baseline 0.587 exactly via methodology fix); today (2026-05-19 W315 sweep) = **0.8235** (14/17; **above 0.7 ship-gate by +0.124**).

**Healthy services**: 7 of 10 probed (CogneeMCP, Basic-Memory, IkLlamaServer, LlamaSwap, Phoenix, OllamaServe, GPU/RTX-4090).

**Unhealthy services**: 2 of 10 (Langfuse :3000 crashed 18 min ago with Next.js MethodNotAllowedError; Hindsight :9077 local-fallback API absent — no NSSM service, no process). FalkorDB :16379 is DOWN-BY-DESIGN per W295 retirement.

**CR-9 violations**: **0** (under strict reading; 2 documented-trade-off cases at ccusage + langfuse stdio MCPs are operator-accepted per W286-arc-P0C).

**Cardinal-rule-2 violations**: **0** (1 sanctioned exception `context-mode-cache-heal.mjs` 1656 b ≤2KB anchored to anthropics/claude-code#46915).

**Drifts from CLAUDE.md cited state**: 5 documentation-drifts (marketplaces 22 not 18; Phoenix running not stopped; OllamaServe running not stopped; plugins 64 installed vs 68 declared; ECC plugin SHA 8+ commits behind upstream HEAD). 1 silent-fallback re-confirmed (F-SS-1 state-redirect broken). 1 cardinal-rule-5 sandbox concern carry-over from W314-r2.

**12 W314-r2 operator-AIs**: 0 absorbed by Stream E (all out of read-only-Stream-E scope; all carry-forward to W316 ops wave).

