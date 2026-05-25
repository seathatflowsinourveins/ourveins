# ARTIFACT-INLINE: tmp/wave110-agentB-fleet-token-eff-2026-05-09.md

Audit date: 2026-05-09
Role: codex-rescue BRIDGE-MODE -> GPT-5.5 fleet hot-spot/usage audit + token-efficiency repos deep dive.

STAND-IN-NOTICE: `wsl.exe --status` failed with `Access is denied. Error code: Wsl/EnumerateDistros/Service/E_ACCESSDENIED`. RTK hook integration therefore remains a hard DEFER on this Windows host until WSL access is restored or the runtime moves into WSL.

Primary anchors:
- Fleet key labels: `Z:/claude-sota-installed/.cli-proxy-api/config.yaml`
- RTK checkout HEAD: `Z:/claude-sota-installed/.cargo/git/checkouts/rtk-0d10505700d6a51d/2fbc751/.git/HEAD` -> `ref: refs/heads/master`; `git rev-parse HEAD` -> `2fbc7514f6964acabcfac65501b8bb6b525e3aa8`
- Installed plugins baseline: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`
- MCP baseline: `Z:/claude-sota-installed/.mcp.json`
- Fleet JSON API probed first as directed:
  - `http://127.0.0.1:8079/api/v1/status`
  - `http://127.0.0.1:8079/api/v1/usage/overview`

### PART 1 — Fleet Status

#### cpa-usage-keeper JSON endpoint status

`/api/v1/status` returned:

| field | value |
|---|---|
| running | true |
| sync_running | false |
| timezone | Asia/Shanghai |
| last_run_at | 2026-05-09T04:43:07.2982691Z |
| last_status | empty |

`/api/v1/usage/overview` returned 216 total requests, 198 successes, 18 failures, 1,045,948 total tokens, 112,392,291 cached tokens, and service success rate 91.67%.

The JSON endpoint exposed downstream API-key buckets, not full upstream account reset windows. The eight-account/reset table below is therefore cross-filled from the installed cpa-usage-keeper SQLite helper (`tools/_eee_status_query.py`) while preserving the required JSON endpoint totals above.

#### Downstream API key cross-check

`config.yaml` declares four downstream labels:

| configured label | observed in `/usage/overview` | requests | success/fail | tokens | status |
|---|---:|---:|---:|---:|---|
| `eee-fleet-key-orchestrator` | yes, redacted display ends `ator` | 208 | 192/16 | 1,019,721 | HOT |
| `eee-fleet-key-research` | yes, redacted display ends `arch` | 2 | 0/2 | 0 | failing/cold |
| `eee-fleet-key-codex-bridge` | yes, redacted display ends `idge` | 6 | 6/0 | 26,227 | healthy/cold |
| `eee-fleet-key-eval` | no bucket in window | 0 | 0/0 | 0 | unused/cold |

Hot-spot: orchestrator accounts for 97.5% of tokens and 96.3% of requests in the keeper JSON window. Hourly token peak was 522,744 tokens at 2026-05-09T04:00Z and 453,036 at 2026-05-09T03:00Z.

#### Upstream account table

Source: cpa-usage-keeper SQLite via `tools/_eee_status_query.py --json --cpa-probe`. The CPA management probe returned 403 using the configured secret file, so live CPA auth-file metadata was unavailable; SQLite telemetry was available.

| account | type | tokens consumed | cache hit % | last request | reset time | status |
|---|---:|---:|---:|---|---|---|
| `aesthetic9c@gmail.com` | claude | 756,413 | 99.61% | 2026-05-09 04:35:32Z | 5h reset 2026-05-09T05:10:00Z; 7d reset 2026-05-13T19:00:00Z | HOT, healthy, 70%/50% windows |
| `mr.euphoriaincarnate@gmail.com` | claude | 250,409 | 2.22% | 2026-05-09 04:34:53Z | 5h reset 2026-05-09T09:30:00Z; 7d reset 2026-05-15T04:00:00Z | warm, cache gap |
| `739955940fc@gmail.com` | claude | 3,856 | 99.80% | 2026-05-08 18:12:55Z | 7d reset 2026-05-10T06:00:00Z | LIMIT, 100% 7d |
| `zfan7@sva.edu` | codex | 26,227 | 0.00% | 2026-05-08 16:09:21Z | 5h reset 2026-05-09T05:25:50Z; 7d reset 2026-05-11T22:39:02Z | healthy/cold |
| `avantmanifest@gmail.com` | claude | 0 | n/a | n/a | 5h reset 2026-05-09T07:40:00Z; 7d reset 2026-05-12T06:00:00Z | cold, 89% 7d |
| `dreamweaverhoudini@gmail.com` | claude | 0 | n/a | n/a | 7d reset 2026-05-11T15:00:00Z | LIMIT, 100% 7d |
| `nalawowac@gmail.com` | claude | 0 | n/a | n/a | 7d reset 2026-05-13T02:59:59Z | cold, healthy, 5% 7d |
| `zfan7@sva.edu` | claude | 0 | n/a | n/a | 7d reset 2026-05-09T03:00:00Z | cold, 96% 7d; reset time already passed at probe time |
| `739955940fc@gmail.com` | antigravity | 0 | n/a | n/a | n/a | cold/no telemetry |
| `739955940fc@gmail.com` | gemini-cli | 0 | n/a | n/a | n/a | cold/no telemetry |

Hot accounts:
- `aesthetic9c@gmail.com` is the main hot account: 756k tokens, 198 requests, 99.61% cache hit, 12 failures.
- `mr.euphoriaincarnate@gmail.com` is the token second-place: 250k tokens from only 2 requests, but cache hit is only 2.22%, indicating prompt-prefix/session-affinity mismatch or non-cacheable prompt shape.

Cold accounts:
- `nalawowac@gmail.com` is the healthiest cold Claude account: 0 tokens, 5% 7d.
- `zfan7@sva.edu` codex is healthy/cold for bridge use, but cache hit is 0% because GPT-5.5 bucket reports no cached tokens.
- `eee-fleet-key-eval` has no downstream usage bucket in the JSON window.

Cache efficiency gaps:
- Orchestrator Claude Opus has excellent cached-token leverage at the aggregate level.
- Sonnet 4.6 path is poor: 256,461 total tokens with only 8,322 cached tokens in the JSON model bucket.
- `mr.euphoriaincarnate@gmail.com` cache hit 2.22% is the clearest per-account gap.

### PART 2 — Token-Efficiency Repos SRA Scoring

Scoring dimensions: D1 license-use-class, D2 SOTA-freshness, D3 star-velocity-vs-content-depth, D4 maintainer-provenance, D5 active-maintenance, D6 use-class-compatibility, D7 Anthropic-CC-policy-alignment, D8 industry-adoption, D9 failure-mode-awareness, D10 replacement-viability.

| repo | SRA total | D1-D10 breakdown | verdict |
|---|---:|---|---|
| `rtk-ai/rtk` | 73/100 | D1=6, D2=8, D3=7, D4=7, D5=6, D6=5, D7=8, D8=7, D9=9, D10=10 | DEFER. Best direct token-output reducer, but WSL is a hard barrier for full hook mode here. README says MIT badge, LICENSE is Apache-2.0, so D1 is penalized for inconsistency. |
| `rtk-ai/icm` | 83/100 | D1=9, D2=9, D3=7, D4=7, D5=9, D6=9, D7=8, D8=7, D9=8, D10=10 | INSTALL-RECOMMENDED. Strong memory/token-efficiency candidate: Claude Code + Codex hooks, MCP native, compact mode, Windows installer, benchmark claims with real API calls. |
| `Ataraxy-Labs/sem` | 75/100 | D1=9, D2=8, D3=7, D4=7, D5=8, D6=8, D7=7, D8=6, D9=8, D10=7 | INSTALL-RECOMMENDED. Token-budgeted semantic context and MCP tools are directly useful for codebase diff/context minimization. Watch binary name conflict with GNU Parallel. |
| `CodeGraphContext/CodeGraphContext` | 72/100 | D1=9, D2=8, D3=6, D4=6, D5=8, D6=9, D7=7, D8=6, D9=6, D10=7 | INSTALL-RECOMMENDED after pilot. Strong Windows-native graph context path; less proven than repomix/serena but complementary for queryable call-chain context. |
| `memodb-io/Acontext` | 68/100 | D1=9, D2=7, D3=6, D4=6, D5=7, D6=7, D7=7, D8=6, D9=6, D10=7 | PILOT, not immediate install. Skill-memory model is promising, but runtime depends on hosted API or self-hosted backend plus LLM distillation. |

RTK details:
- Local checkout: `Z:/claude-sota-installed/.cargo/git/checkouts/rtk-0d10505700d6a51d/2fbc751`.
- HEAD SHA: `2fbc7514f6964acabcfac65501b8bb6b525e3aa8`.
- README claim: high-performance CLI proxy reducing LLM token consumption by 60-90%; sample 30-minute Claude Code session estimates ~118k standard tokens vs ~23.9k RTK tokens, ~80% savings.
- README Windows constraint: native Windows supports manual/CLAUDE.md mode; full auto-rewrite hook requires Unix shell/WSL.
- Failure-mode awareness: README explicitly says hooks only run on Bash tool calls; Claude Code `Read`, `Grep`, `Glob` bypass hook; telemetry disabled by default and opt-in.
- License inconsistency: README badge says MIT; LICENSE file is Apache-2.0.

Additional local candidates discovered under `Z:/repos/deps/`:
- `rtk-ai__icm`: permanent memory, MCP native, Claude Code + Codex hooks, compact mode, Apache-2.0.
- `sem`: entity-level semantic diff/context, `sem_context --budget`, MCP server, MIT/Apache dual files.
- `CodeGraphContext`: MCP + CLI graph context, Windows-native KuzuDB path, MIT.
- `acontext`: skill memory as plain Markdown files, Claude Code instructions, Apache-2.0.

### PART 3 — Mia Pre-Apply Verdicts

Baseline verification:
- `context-mode@context-mode` v1.0.111 is installed in `installed_plugins.json`; do not recommend.
- `repomix@1.14.0 --mcp` is installed in `.mcp.json`; do not recommend.
- `cnighswonger/claude-code-cache-fix` service is baseline-installed per directive; do not recommend.
- `cpa-usage-keeper` service is live on 8079 and baseline-installed; do not recommend.
- V64 stable-prefix convention is documented; do not recommend as a repo install.

Candidate verdicts:

| candidate | plugin baseline | MCP baseline | verdict |
|---|---|---|---|
| `rtk-ai/rtk` | NOT-INSTALLED | NOT-INSTALLED | DEFER. Score >=60, but WSL unavailable (`E_ACCESSDENIED`), so full hook value cannot be realized now. Native Windows manual mode is lower ROI. |
| `rtk-ai/icm` | NOT-INSTALLED | NOT-INSTALLED | INSTALL-RECOMMENDED. Add as pinned local binary/MCP or hook-mode pilot; avoid replacing existing memory/graphiti until behavior is measured. |
| `Ataraxy-Labs/sem` | NOT-INSTALLED | NOT-INSTALLED | INSTALL-RECOMMENDED. Add `sem-mcp` or CLI pilot for token-budgeted entity context. |
| `CodeGraphContext/CodeGraphContext` | NOT-INSTALLED | NOT-INSTALLED | INSTALL-RECOMMENDED after isolated pilot. Use Windows-native KuzuDB path first. |
| `memodb-io/Acontext` | NOT-INSTALLED | NOT-INSTALLED | NOT-INSTALLED / PILOT. Good concept, but hosted/self-host backend and distillation costs make it less immediate than ICM/sem. |

### VERDICT

Top-3 actionable recommendations:

1. INSTALL-RECOMMENDED: `rtk-ai/icm` as the next memory/token-efficiency pilot. It is missing from plugin/MCP baselines, supports Claude Code and Codex hooks, has compact MCP mode, and avoids the RTK WSL barrier.

2. INSTALL-RECOMMENDED: `Ataraxy-Labs/sem` for entity-level diff/context and `sem_context --budget`. It complements repomix/serena instead of replacing them and targets token-efficient code understanding.

3. FIX/ROUTE: reduce orchestrator hot-spotting and Sonnet cache waste before adding more tooling. `eee-fleet-key-orchestrator` is carrying 97.5% of tokens; `mr.euphoriaincarnate@gmail.com` and Sonnet 4.6 show cache efficiency gaps. Prefer routing cache-stable Claude Opus traffic through the high-cache path and move non-cacheable bursts to colder healthy accounts (`nalawowac`, codex bridge where applicable).

RTK final disposition: DEFER until WSL access is restored. Do not list RTK as ready-to-install for this Windows runtime because the full auto-rewrite hook is the main value and the probe failed with `E_ACCESSDENIED`.

VERDICT:
