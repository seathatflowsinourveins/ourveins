

## 2026-05-08 Wave 99 — Ship 2H: eee-status fleet dashboard cohesive activation (Pattern A apply; lesson n=2 sandbox=read-only VALIDATED)

### Origin

Wave 98 Agent C account-rotation report (`tmp/wave98-C-account-rotation-sota-2026-05-08.md`) identified Ship 2H as #3 ADOPT-NOW: "tools/eee-status.ps1 fleet dashboard (consumer of Ship 1W cpa-usage-keeper SQLite + CPA `/v0/management/auth-files`). ROI: ~5min saved per fleet diagnostic."

Wave 99 directive from operator explicitly asked: "give me all the accounts status, including real time usage, reset time, cache rate" — this Ship 2H delivers the user-facing answer in operational-dashboard form.

### Mia OVER #12 caught (orchestrator-side, BEFORE write)

Pre-Write Mia probe of `tools/eee-status.ps1` returned existing 8.6KB comprehensive PS1 dashboard from prior session arc — codex T1 NEEDS-REVISION conf=0.86 + 7 prescribed_edits already applied + cited in `docs/install-provenance.md` L1446+L1513 as "Pattern-A-applied real-time dashboard". 

Pivot: from "OVERWRITE existing PS1" → "ADD complementary Python helper + TRACK existing PS1 as cohesive Ship 2H".

Mia OVER #12 ladder (cumulative: 12 OVER catches across Wave 97-99):
1-11 from Wave 97 (per provenance prior entries)
12. **NEW Wave 99**: tools/eee-status.ps1 already operational + Pattern A-applied prior arc; about to be overwritten by my thin wrapper. Caught BEFORE write via Read tool returning file already exists.

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT**: `Willxup/cpa-usage-keeper v1.5.2` SQLite schema (38-column `usage_identities`); already installed via Ship 1W per `docs/install-provenance.md:3726`
- **TIER-1-DIRECT**: `router-for-me/CLIProxyAPI internal/api/server.go:506-659 @ HEAD ed1458aa` — `/v0/management/auth-files` endpoint
- **TIER-2 sister**: Wave 98 Agent C account-rotation report at `tmp/wave98-C-account-rotation-sota-2026-05-08.md` (5 ship recommendations including this dashboard)
- **TIER-3-LOCAL-COMPOSITION**: PS1 prior verdict at `.claude/state/codex_consult_eee_status_ps1_OUT.txt` (Pattern A applied)

### Edits (2 files / +424 / -0)

1. **NEW**: `tools/_eee_status_query.py` (+233 LOC) — Python helper:
   - Read-only SQLite query of cpa-usage-keeper schema
   - Optional `--cpa-probe` for CPA Management API live state (with secret-file/env resolution)
   - `cache_rate_percent` computation (Mia-corrected formula: `cached / (input + cached)` per ccusage semantics)
   - Outputs human-readable fleet table OR `--json` for programmatic consumption
   - Stdlib only (sqlite3 + urllib.request + argparse + datetime + json)

2. **UNTRACKED → TRACKED**: `tools/eee-status.ps1` (+191 LOC) — comprehensive PS1 dashboard from prior arc
   - Pattern A applied prior session (codex T1 NEEDS-REVISION conf=0.86 + 7 prescribed_edits per file header)
   - Sections: healthz / Mgmt API auth-files / routing strategy / api-key-usage / ccusage daily

### Operational split-of-concerns (codex T1 prescription #5)

| Layer | PS1 owns | Python owns |
|---|---|---|
| healthz endpoint | ✅ | — |
| Mgmt API `/v0/management/auth-files` | ✅ (with bearer auth) | optional via `--cpa-probe` |
| Routing strategy | ✅ | — |
| api-key-usage telemetry | ✅ | — |
| ccusage daily aggregation | ✅ | — |
| cpa-usage-keeper SQLite query | — | ✅ |
| 5h/7d window % + reset times | — | ✅ |
| cache_rate_percent computation | — | ✅ |

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee per CR-3 Phase 1 + Wave 98 lesson)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.91 | Pattern A apply: 7 prescriptions + 1 Mia self-correction (cache_rate formula bug) integrated single-round |

Verdict file: `.claude/state/codex_consult_wave99_ship2h_eee_status_query_OUT.txt` (1283 lines).

**7 prescribed_edits applied**:
1. ✅ KEEP both files together as Ship 2H (cohesive unit; no split needed)
2. ✅ REPLACE hardcoded CPA_AUTH with secret-file/env resolution chain (env > file > unavailable)
3. ✅ ADD cache_rate_percent field (Mia-corrected formula post-T1: `cached / (input + cached)` per ccusage semantics; not `cached / total` which produced nonsensical >100% values)
4. ✅ HARDEN parse_dt — assigns UTC when fromisoformat returns naive datetime
5. ✅ KEEP split of concerns (PS1 + Python orthogonal)
6. ✅ KEEP tools/__pycache__/ + eee-backup.ps1 + eee.ps1.pre-fire46-fix UNTRACKED (verified via `git diff --cached --stat`)
7. ✅ DUAL-CITE admissible after Python revisions land (this T1 covers helper + cohesive Ship 2H; prior PS1 T1 0.86 remains load-bearing for PS1 portion)

### Wave 98 lesson n=2 VALIDATED — `--sandbox=read-only`

Ship 2A (Wave 98 commit `7d0bf40` predecessor `00d1bde`) accidentally executed `commit-on-stop.sh` during codex T1 verification, sweeping 9 unrelated tracked files into a "session checkpoint" commit. Outcome A ACCEPT-WITH-DOC applied; lesson codified forward: "future codex T1 consults on Stop-hook wires that include executable shell scripts MUST run with `--sandbox=read-only`".

This fire (Ship 2H) APPLIED that lesson. Codex T1 fired with `--sandbox=read-only`; pwsh.exe inspect attempts blocked-by-policy (visible in verdict trace at `.claude/state/codex_consult_wave99_ship2h_eee_status_query_OUT.txt`):
```
2026-05-08T22:51:35.160699Z ERROR codex_core::tools::router: error=`...pwsh.exe... -Command "Select-String..."` rejected: blocked by policy
```

ZERO accidental commits this fire. **Lesson n=2 → discipline VALIDATED**. Forward-only convention now: all codex T1 consults on hook-wire ships use `--sandbox=read-only`.

### Live fleet state (helper smoke probe THIS fire — user-facing answer)

| Account | Type | Plan | 5h% | 5h-reset | 7d% | 7d-reset | Cache% | Status |
|---|---|---|---:|---|---:|---|---:|---|
| **aesthetic9c@gmail.com** (operator) | claude | - | **39%** | **1h15m** | 29% | 4d20h | **100.00%** | ✅ HEALTHY |
| mr.euphoriaincarnate@gmail.com | claude | - | 0% | - | 12% | **6d5h** | - | ✅ BEST RESERVE |
| nalawowac@gmail.com | claude | - | 0% | - | 5% | 4d4h | - | ✅ 2ND RESERVE |
| avantmanifest@gmail.com | claude | - | 0% | - | 89% | 3d7h | - | 🟡 depleted-pending-reset |
| dreamweaverhoudini@gmail.com | claude | - | 0% | - | 100% | 2d16h | - | 🔴 LIMIT |
| zfan7@sva.edu (Claude) | claude | - | 0% | - | 96% | **4h5m** | - | 🟡 near-exhausted (resets soon!) |
| 739955940fc@gmail.com (Claude) | claude | - | 0% | - | 100% | 1d7h | 99.80% | 🔴 LIMIT + 75% fail rate |
| **zfan7@sva.edu-pro** | codex | **pro** | 6% | 1h31m | 27% | 2d23h | 0.00% | ✅ HEALTHY (Codex no-cache) |

Cache rate hero: **aesthetic9c at 100.00% cache hit rate** — Ship 1Q 4h session-affinity + cnighswonger v3.5.3 cache-prefix stability working as designed.

### CR-9 install-risk LOW

- Read-only operational tooling
- Reversible via `git revert bd37eb2`
- No `@latest` install (cpa-usage-keeper v1.5.2 already installed; CPA already configured)
- No sibling-bleed (zero `Z:/claude-sota/` paths in either file)
- Python helper: stdlib only
- No secret duplication (env/file resolution chain; no hardcoded bearer)
- No runtime cache sweep (untracked `tools/__pycache__/` + `eee-backup.ps1` + `eee.ps1.pre-fire46-fix` remain untracked)

### Wave 99 — 13th ship in this session arc (Ship 2H), 14th counting parallel agent verdict

| Wave | Commit | Ship |
|---|---|---|
| 86-96 | (9 ships per prior provenance) | |
| 97-1A through 97-1K-skip | (10 ships per Wave 97 entry) | |
| 98-2A-checkpoint | `00d1bde` | UNINTENTIONAL bundled checkpoint (Outcome A ACCEPT-WITH-DOC) |
| 98-2A | `7d0bf40` | cwc commit-on-stop wire + PROGRESS.md activation |
| 98-2A-provenance | `ae51851` | Ship 2A provenance entry |
| 99-checkpoint | `72d257a` | cwc commit-on-stop AUTO-FIRE 18:40 (designed behavior; not a ship) |
| **99-2H** | **`bd37eb2`** | **eee-status fleet dashboard cohesive activation (Pattern A apply)** |

### Wave 99 parallel fan-out — un-covered SOTA discovery agent

Wave 99 1-agent fan-out (agentId ab34403269892681e; 373188ms / 43 tools / 423277 tokens) returned APPROVE-LIST conf=0.83 with 5 ADOPT-NOW + 3 STUDY-PILOT + 8 REJECT-FOR-FIT + critical HONEST-NON-FINDING.

**5 ADOPT-NOW (un-covered axes only)**:
1. **anthropics/claude-code-security-review** (4546★ Anthropic OFFICIAL) — fills CC-specific security review gap
2. **anthropics/skills** (130k★ — 17 canonical skills incl mcp-builder)
3. **UKGovernmentBEIS/inspect_ai** (UK gov eval framework — fills v64 EVAL_BENCHMARK gap)
4. **modelcontextprotocol/inspector** (9.7k★ MCP-org — debugs FM-03 D1-D6 transport)
5. **anthropics/courses** (21k★ — TIER-1 design cite-anchor)

**3 STUDY-PILOT**: dspy + mem0 + spec-kit (note: spec-kit binary v0.8.7 ALREADY INSTALLED via Wave 97 Ship 1N)

**HONEST-NON-FINDING surfaced (critical operational debt)**:
- **25/34 Anthropic OFFICIAL Tier-0 plugins NOT enabled** (manifest install backlog)
- **9/9 default-CLI tools missing INSTALLED-VIA-SYSTEM-PATH manifest rows** (CR-7 Phase 2 trigger predicate violation)
- **TOOL-USE EFFICIENCY / FUNCTION-CALLING optimization GENUINE-GAP** — possibly sibling-novel codification opportunity

Artifact persisted: `tmp/wave99-uncovered-sota-2026-05-08.md` (~280 LOC).

### CR COMPLIANCE

- **CR-1**: TIER-1-DIRECT cite chain (cpa-usage-keeper + CPA Mgmt API + Wave 98 Agent C report)
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (NEEDS-REVISION 0.91 + 7-prescription Pattern A apply + 1 Mia self-correction on cache_rate formula)
- **CR-5**: install-priority — both files install-class operational tooling
- **CR-6**: official-native-channel — cpa-usage-keeper Ship 1W; CPA upstream-direct
- **CR-7**: Phase 1 — read-only operational tooling
- **CR-8**: ADAPTED-FROM-SOTA — cpa-usage-keeper schema + CPA Mgmt API + ccusage CLI patterns
- **CR-9**: install-risk LOW (no @latest, no sibling-bleed, no secret duplication, no runtime cache sweep)
- **CR-10**: research-first — Mia probe caught OVER #12 (existing PS1 already operational)
- **CR-11**: META-process SOTA — agent fan-out → orchestrator-direct ship → codex T1 e2e → Pattern A apply → Mia self-correction → atomic commit
- **CR-12**: upstream-install-priority over sibling-cite-import — zero sibling cite-imports

### 11 OUTSTANDING SHIPS (post Ship 2H)

#### Tier 1 — TIER-1-DIRECT Anthropic OFFICIAL (CR-12 PRIMARY)
- **Ship 2B**: claude-code-security-review plugin install
- **Ship 2C**: Cardinal-rule cite 6 un-cited Superpowers skills
- **Ship 2L**: anthropics/skills install (130k★ — 17 canonical incl mcp-builder)
- **Ship 2M**: UKGovernmentBEIS/inspect_ai install (eval framework)

#### Tier 2 — Token-efficiency
- **Ship 2D**: rtk PreToolUse Bash-rewrite hook wire
- **Ship 2E**: headroom statusline
- **Ship 2F**: max_budget_usd in eee.ps1

#### Tier 3 — Account-rotation
- **Ship 2G**: priority-bucket equalization (operator-decision)
- **Ship 2I**: Codex Pro renewal alarm (~19d countdown)

#### Tier 4 — Architectural
- **Ship 2J**: zilliztech/claude-context Milvus MCP
- **Ship 2K**: subagent fork-vs-fresh routing matrix codification

#### Tier 5 — Manifest debt (Wave 99 critical findings)
- **Ship 2N**: 25 OFFICIAL Tier-0 plugins enable
- **Ship 2O**: 9 default-CLI tools INSTALLED-VIA-SYSTEM-PATH manifest rows

### Update triggers

Re-evaluate this rule when:
- Helper smoke probe surfaces a new failure mode (sqlite schema drift; CPA endpoint change)
- cpa-usage-keeper upstream HEAD bumps beyond v1.5.2 (re-pin schema + helper)
- CPA Management API endpoint structure changes (re-pin server.go cite at file:line)
- A 3rd accidental codex-T1-sandbox-execution incident lands (n=3 promotes operator-discipline lesson to rule-layer per codification-threshold cycle-322 jurisdiction)
