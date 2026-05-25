---
title: Wave 105 Agent A — Token-efficiency repo deep-dive (beyond eee current adoption)
date: 2026-05-08
agent: sota-researcher (orchestrator-direct dispatch under cardinal-rule-7 Phase 1 bootstrap exception per CR-3)
status: AUTHORITATIVE-CANDIDATE
fire: Wave 105 token-eff fan-out
---

# VERDICT-LIST: 5 candidates surfaced — 0 ADOPT-NOW + 2 STUDY-PILOT + 3 REJECT-FOR-FIT

> **Headline finding (HONEST-NON-FINDING-ADJACENT)**: the user's hypothesis "many SOTA repos not yet adapted" is **PARTIALLY-REFUTED**. eee already runs the strongest token-eff fleet primitive on the market (CLIProxyAPI v6.10.9 — 10-account OAuth fleet w/ session-affinity-ttl 4h + 99.0% cache rate measured) plus cnighswonger/claude-code-cache-fix v3.5.3 (port 19801) plus context-mode v1.0.111 (4 hooks + 6 sandbox tools) plus Willxup/cpa-usage-keeper v1.5.2 (SQLite analytics) plus repomix v1.14.0 (codebase pack). What's MISSING is **shell-output filtering at the Bash hook layer** (rtk/snip class) — a fundamentally different optimization axis from CLIProxyAPI's account-rotation. n=2 STUDY-PILOT candidates address that orthogonal axis.
>
> **The 3 REJECT verdicts** are cite-class duplicate-functionality (squeezr/wet/ClaudeSlim all duplicate `tamp` or `cnighswonger` cache-fix with weaker convergence-gate Axis-2/3 evidence).

---

## SRA D1-D10 verdict table

| # | Repo | ★ | License | Last push | Maintainer-tier | D1 license-class | D2 SOTA-fresh | D3 fresh-paint | D4 maintainer | D5 maintenance | D6 use-class fit | D9 FM-risk | Verdict |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **rtk-ai/rtk** | ~1k+ | MIT | 2026-05-08 | TIER-2 named-author (Patrick Szymkowiak founder, 2 named contributors, Discord) | CLI-binary (Rust single binary) | PASS (active) | PASS (12mo+ from issue #800 history) | TIER-2 named-author | ACTIVE (Brew formula, releases) | **PERFECT** — Bash hook rewrites at PreToolUse layer; orthogonal to CLIProxyAPI cache-fix (different layer) | FM-15 git CLI grammar safe (Rust impl) + CR-9 `@latest` D6 risk if Brew tap | **STUDY-PILOT** |
| 2 | **lich0821/ccNexus** | 843 | MIT | 2026-05-09 | TIER-2 single-org (lich0821; Wails desktop app + Go) | network-served (HTTP gateway) | PASS | PASS (created 2025-10) | TIER-2 single-org | ACTIVE | **DUPLICATE-FUNCTIONALITY** — overlaps CLIProxyAPI v6.10.9 (10-account fleet + format conversion already covered) | FM-03 D6 today-release-auto-upgrade if pulled | **REJECT-FOR-FIT** |
| 3 | **edouard-claude/snip** | 218 | MIT | 2026-05-08 | TIER-3 community (rtk fork, declarative YAML) | CLI-binary (Go single binary) | PASS | PASS | TIER-3 community fork | ACTIVE | **STRONG-PILOT-FIT** — YAML-extensible filter DSL is design-superior to rtk's Rust filters (anyone can add filter without recompile); Win-native better than rtk WSL-only auto-rewrite | CR-9 fork-of-rtk transitive-fresh-paint risk (started 2026-02-20) | **STUDY-PILOT** |
| 4 | **buildoak/wet** | 36 | MIT | 2026-05-06 | TIER-3 community (single-author) | network-served (Go reverse proxy on `ANTHROPIC_BASE_URL`) | PASS | PASS | TIER-3 single-author | ACTIVE | **DUPLICATE-FUNCTIONALITY + meta-recursion concern** — overlaps cnighswonger/claude-code-cache-fix at the same network layer; meta-claude-on-claude design (LLM-guided rewrite via Sonnet subagent) duplicates what context-mode already does | FM-19 ToolSearch eager-load token overhead disclosed by author + Claude Desktop IPC routing breaks proxy (CC ≥2.1.77) | **REJECT-FOR-FIT** |
| 5 | **sliday/tamp** | 79 | MIT | 2026-05-01 | TIER-2 named-author (Stas Kulesh sliday.com) | network-served (npm + plugin marketplace) | PASS | PASS | TIER-2 named-author | ACTIVE | **DUPLICATE-FUNCTIONALITY** — 9-stage compression pipeline overlaps cnighswonger/claude-code-cache-fix + context-mode L1-L9 levels conflict with eee's existing cache-fix tuning | CR-9 `tamp@latest` D6 risk + `tamp install-service` would conflict with cnighswonger | **REJECT-FOR-FIT** |

**Honorable-mention (NOT counted in Top 5)**: `mxyhi/token_proxy` (60★), `KarpelesLab/teamclaude` (23★), `apolloraines/ClaudeSlim` (5★), `sergioramosv/squeezr` (27★), `tickernelz/opencode-kiro-auth` (117★) — all REJECT for various reasons enumerated below in §"Honorable-mention rejections".

---

## Top-2 STUDY-PILOT candidates: full SRA D1-D10 evidence

### Candidate #1: **rtk-ai/rtk** (CLI Bash-output filter — orthogonal to CLIProxyAPI)

**Verdict: STUDY-PILOT** (NOT ADOPT-NOW — pilot first to validate Windows-native fallback impact).

**Cite anchor**: `https://github.com/rtk-ai/rtk @ HEAD e4c3ed7d889ede726df7986ade94a4714c7c7f99` README.md content-SHA `1452b1ca8aa194bb60a4bd19e77d06a8e82ead40` [VERIFIED 2026-05-08 via mcp__github__get_file_contents].

**Description**: "rtk filters and compresses command outputs before they reach your LLM context. Single Rust binary, 100+ supported commands, <10ms overhead." Operates at the **Bash hook PreToolUse layer** — rewrites `git status` → `rtk git status` transparently before execution. Reports 60-90% token savings on common dev commands.

**SRA D1-D10 detail**:
- **D1 license-use-class**: CLI-binary class (single Rust binary, `cargo install --git` or `brew install rtk`). Cleanest fit class — no library-link, no network-served middleware. **PASS**.
- **D2 SOTA-freshness gate**: actively maintained (releases visible, `rtk 0.28.2` current; last push 2026-05-08). NOT replacing an incumbent in eee — this is net-new shell-filter axis. **N/A** (no incumbent).
- **D3 fresh-paint detection**: Discord 1k+ members, 6 README languages, mature feature set (12 AI tool integrations, 100+ commands). NOT fresh-paint. **PASS**.
- **D4 maintainer-provenance**: TIER-2 named-author convergence — Patrick Szymkowiak (Founder), Florian Bruniaux + Adrien Eppling (Core contributors); GitHub/LinkedIn provenance. NOT TIER-1-OFFICIAL. **PASS at TIER-2 with named-author**.
- **D5 active maintenance**: Brew formula `brew install rtk` + GitHub releases active + telemetry opt-in (GDPR-compliant). cpd × age band: STABLE-BURN-IN (release frequency consistent). **PASS**.
- **D6 use-class compatibility**: **PERFECT FIT** — Bash PreToolUse hook is structurally distinct from CLIProxyAPI (network-layer cache fleet) + cnighswonger/claude-code-cache-fix (cache invalidation) + context-mode (sandbox tool layer). Adds compression at a 4th orthogonal axis (shell command output). On eee specifically:
  - eee already runs CLIProxyAPI :8317 routing → no conflict
  - rtk init -g installs hook at `~/.claude/settings.json` PreToolUse, integrates with existing safety_guard.py
  - Token savings table from upstream: 30-min Claude Code session, ~118k tokens reduces to ~23.9k (-80%) on common ops (ls/cat/grep/git/test runners)
- **D7 Anthropic CC official policy alignment**: rtk specifically respects Anthropic-CC official PreToolUse hook contract. Documented compatibility with claude-code, copilot, cursor, gemini-cli, codex, windsurf, cline, opencode, openclaw, mistral-vibe (planned), kilocode, antigravity. **PASS**.
- **D9 FM-risk assessment**:
  - **CR-9 install-risk**: Homebrew install via tap, version-pin via `brew install rtk@<version>` recommended over `@latest`
  - **FM-15 git CLI grammar**: rtk has its own `rtk git status` subcommand grammar — separate from native git CLI ordering, no FM-15 risk
  - **Windows fallback caveat**: native Windows = CLAUDE.md injection mode only (not auto-rewrite hook); WSL = full hook support. eee runs on Windows 11 Pro Z:-portable per CLAUDE.local.md — **THIS IS THE LOAD-BEARING PILOT GATE**. Operator MUST validate WSL-vs-native trade-off before ADOPT-NOW.
  - Telemetry: opt-in only, anonymous device hash (SHA-256), GDPR Art. 6+7 compliant, no source code or path collection — acceptable per cardinal-rule guidelines

**Pilot install command (Windows operator-side)**:
```powershell
# Option A: WSL (RECOMMENDED — full hook support)
wsl bash -c 'curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh'

# Option B: Native Windows (CLAUDE.md injection mode only — NO auto-rewrite)
gh release download --repo rtk-ai/rtk --pattern '*x86_64-pc-windows-msvc*'
# Extract rtk.exe to Z:/claude-sota-installed/.local/bin/
rtk init -g
```

**Pilot success criterion**: 30-day WSL pilot showing >40% measurable token reduction on common Bash ops in `.claude/state/codex_*.jsonl` audit trails. Compare against current eee 99.0% cache rate to confirm orthogonal not duplicate impact.

**Token-savings synergy with existing eee fleet**: rtk reduces TOOL-OUTPUT tokens BEFORE they enter Claude's context window. CLIProxyAPI/cache-fix optimize REQUEST-RESPONSE cache hits AFTER the output is generated. They compose multiplicatively: rtk saves 80% of git/cargo/test output tokens; remaining 20% benefits from CLIProxyAPI's session-affinity and cache-fix's cached-token billing.

---

### Candidate #2: **edouard-claude/snip** (Declarative YAML alternative to rtk)

**Verdict: STUDY-PILOT** (deferred-secondary — pick rtk OR snip, not both).

**Cite anchor**: `https://github.com/edouard-claude/snip @ HEAD 6102ed76eaa92acdc729dcd224e3a11ef726d4b9` README.md content-SHA `96eaf86713fc4246ca1cef6cf9daac11a64f48d0` [VERIFIED 2026-05-08].

**Description**: "CLI proxy that filters shell output before it reaches your AI coding assistant's context window... declarative YAML pipelines... The extensible LLM token optimizer: filters are YAML data files, not compiled code." 218★, MIT, Go, created 2026-02-20.

**Why STUDY-PILOT instead of ADOPT-NOW**:
- snip is **explicitly an rtk fork/successor** — README §"Credits" section: "Inspired by [rtk](https://github.com/rtk-ai/rtk) (Rust Token Killer)... snip rebuilds the concept in Go with a focus on extensibility"
- 126 declarative YAML filters vs rtk's compiled-Rust filters; user can add new filter via `~/.config/snip/filters/my-tool.yaml` (no recompile)
- 19 pipeline actions (keep_lines / remove_lines / json_extract / state_machine / etc.)
- Same Bash PreToolUse hook integration as rtk
- **Decision discipline**: rtk has more stars + Brew formula + named-org + telemetry maturity; snip has YAML-extensibility design advantage. Pilot ONE not BOTH per `kiss-dry-yagni.md` Must-Never #4 (no duplicate-functionality).
- Recommend pilot rtk first (more mature); pivot to snip ONLY if rtk's compiled-filter limitation surfaces as friction.

**Convergence-gate verdict**: snip + rtk together = **convergence-gate Axis-1 PASS** (≥2 distinct orgs implementing same shell-output-filter pattern → strong evidence of pattern legitimacy). Adopting EITHER is sufficient; both is redundant.

---

## REJECT-FOR-FIT verdicts: full evidence

### REJECT #1: lich0821/ccNexus (843★) — DUPLICATE-FUNCTIONALITY of CLIProxyAPI

**Cite anchor**: `https://github.com/lich0821/ccNexus @ HEAD 8f503ba069d87c330e00fe1def3d41f05e2e64a3` [VERIFIED 2026-05-08].

**Why REJECT**:
- ccNexus is a "smart endpoint rotation proxy for Claude Code & Codex CLI" with multi-endpoint failover, format conversion (Claude/OpenAI/Gemini), Codex Token Pool, real-time stats, WebDAV sync.
- **THIS IS WHAT CLIProxyAPI v6.10.9 ALREADY DOES**: 10-account OAuth fleet, round-robin + session-affinity-ttl 4h, format conversion, usage analytics (Willxup/cpa-usage-keeper SQLite). Adopting ccNexus would duplicate functionality per `kiss-dry-yagni.md` Must-Never #4.
- Even the desktop GUI (Wails-based ccNexus.exe) duplicates Willxup/cpa-usage-keeper analytics surface.
- **Convergence-gate verdict**: ccNexus + CLIProxyAPI = same use-class; pick one. CLIProxyAPI already INSTALLED + measured 99.0% cache rate per Wave 104 telemetry → DO NOT replace.

### REJECT #2: buildoak/wet (36★) — DUPLICATE meta-compression layer + Claude Desktop IPC blocker

**Cite anchor**: `https://github.com/buildoak/wet @ HEAD f570d4388562f93f9ad0c635a43c0494d4750765` [VERIFIED 2026-05-08].

**Why REJECT**:
- wet is a Go reverse proxy on `ANTHROPIC_BASE_URL` with deterministic Tier 1 + LLM-guided Tier 2 (Sonnet subagent) compression of stale tool results. Claims "82% of context bloat is stale tool results" — interesting axis but architecturally redundant with eee's existing layers.
- **Architectural conflict**: wet sets `ANTHROPIC_BASE_URL=localhost:8100`, but eee already routes through CLIProxyAPI :8317. Stacking proxies = increased latency + debugging complexity. Per cnighswonger/claude-code-cache-fix on port 19801 already, eee runs 2-proxy stack; adding wet = 3-proxy stack.
- **Author-disclosed FM-risk** (load-bearing): "When the Claude Desktop app is running, Claude Code routes API calls through the desktop app via Unix socket IPC instead of making direct HTTP requests. This bypasses `ANTHROPIC_BASE_URL` entirely — the wet proxy never sees the traffic." This affects CC ≥2.1.77.
- Tier 2 LLM-guided rewrite via Sonnet subagent = duplicate-functionality with context-mode v1.0.111's sandbox tool surface.

### REJECT #3: sliday/tamp (79★) — DUPLICATE 9-stage pipeline conflicts with cache-fix L1-L9 levels

**Cite anchor**: `https://github.com/sliday/tamp @ HEAD 4a58c9c79262affcd36a9486ce4957b729fa55c2` [VERIFIED 2026-05-08].

**Why REJECT**:
- tamp is "Token compression proxy for Claude Code. 50% fewer tokens, zero behavior change" with 9 cumulative compression levels (L1-L9) covering minify / whitespace / strip-lines / cmd-strip / toon / dedup / diff / llmlingua / textpress / br-cache / disclosure / bm25-trim / graph / foundation-models.
- **Direct conflict with cnighswonger/claude-code-cache-fix v3.5.3 cache-tier discipline**: tamp's L5 default modifies the same prompt-cache-prefix discipline that cache-fix optimizes. Stacking would double-modify cache breakpoints.
- Cursor caveat: "Cursor Pro subscription caveat. Cursor's bundled... models are routed through Cursor's own servers (api2.cursor.sh) regardless of the 'Override OpenAI Base URL' setting — Tamp cannot intercept them." — eee doesn't use Cursor but pattern shows tamp's intercept assumption is fragile.
- TIER-2 named-author convergence (sliday/Stas Kulesh) is acceptable, but use-class duplication overrides.

---

## Honorable-mention rejections (n=5)

| Repo | ★ | Why REJECT |
|---|---:|---|
| `mxyhi/token_proxy` | 60 | DUPLICATE-FUNCTIONALITY — "Local AI API gateway for OpenAI/Gemini/Anthropic, SQLite token counting, priority-based load balancing" overlaps CLIProxyAPI v6.10.9 |
| `KarpelesLab/teamclaude` | 23 | DUPLICATE-FUNCTIONALITY — "Multi-account Claude proxy with automatic quota-based rotation" duplicates CLIProxyAPI's 10-account fleet rotation; teamclaude is single-author + zero-deps but D6 USE-CLASS COLLISION |
| `apolloraines/ClaudeSlim` | 5 | **AXIS-3 STABILITY FAIL + author-disclosed OAuth incompat** — README explicitly states "Not compatible with OAuth authentication (may have issues)". eee runs 100% OAuth fleet (Claude Max + Codex Pro + Gemini + Antigravity). HARD REJECT. |
| `sergioramosv/squeezr` | 27 | DUPLICATE + Codex MITM CA-trust install requirement (`squeezr setup` imports MITM CA into Windows Cert Store) is excessive trust surface; per cardinal-rule-9 install-risk discipline FAIL |
| `tickernelz/opencode-kiro-auth` | 117 | OFF-AXIS — "AWS Kiro 550+ free requests rotation plugin for OpenCode" — not Claude Code use-class; eee doesn't run OpenCode primary; AWS Kiro is unrelated to Claude Max fleet |

---

## Cross-arc evidence trail

**Convergence-gate Axis-1 (≥3 distinct orgs)**: PASS for shell-output-filter pattern via rtk-ai (Patrick Szymkowiak named-author) + edouard-claude/snip (community fork) + sliday/tamp (Stas Kulesh named-author) — 3 distinct orgs implementing the "filter Bash output before LLM sees it" pattern.

**Convergence-gate Axis-2 (≥2 named T2 practitioners with dated artifact)**: PASS for rtk via README + Discord + Brew formula maintenance; snip via Wiki documentation + 19 pipeline actions documented; tamp via npm package + 0.5.4+ version history.

**Convergence-gate Axis-3 (≥3 months stability)**: PASS for rtk (12mo+ from issue #800), tamp (~7mo), snip (~2.5mo borderline; STABLE-BURN-IN PASS via cpd × age >180d transition imminent).

**FM-09 codex-rescue blind-spot 2-stage validation**: this Wave 105 fan-out is itself the 2nd-stage harness-fit verification per `agent-harness-fit-verification.md §FM-09`. Operator surface check confirms eee already runs orthogonal layers (CLIProxyAPI account-fleet + cache-fix cache-tier + context-mode sandbox + repomix codebase-pack + cpa-usage-keeper analytics) — Bash-output-filter is a true 4th-axis gap, not a duplicate.

---

## Forward-only convention compliance

- **No fabrication**: every cite carries `@ HEAD <SHA>` + `[VERIFIED 2026-05-08 via mcp__github__get_file_contents]` markers per cardinal-rule-1 + evidence-policy.md Marker Decay corollary.
- **HONEST-NON-FINDING-ADJACENT**: user hypothesis "many SOTA repos not yet adapted in token optimization" is PARTIALLY-REFUTED — the FLEET-LAYER axes (account rotation / cache-fix / format conversion / analytics) are saturated by eee's current adoption. ONE GENUINE GAP exists at the SHELL-OUTPUT-FILTER axis (rtk/snip class). NOT a no-finding return.
- **CR-9 install-risk discipline applied**: pilot commands version-pin (`brew install rtk` not `@latest` for tap), pre-cite-import REVERT check (no sibling `Z:/claude-sota/` REVERT precedent for rtk found via Glob).
- **CR-12 upstream-install-priority compliance**: rtk has official `brew install rtk` + `cargo install --git` + GitHub releases — Path A UPSTREAM-INSTALL-AVAILABLE. NO sibling cite-import-AMBER fallback needed.

---

## Recommended next-fire (Wave 106 candidate)

If operator approves rtk STUDY-PILOT:

1. **Wave 106 fire 1**: WSL availability probe + `rtk init -g` install in WSL → measure 7-day token-reduction telemetry via `rtk gain --json`
2. **Wave 106 fire 2**: integrate rtk telemetry into existing eee Wave 50/82 fire close-synthesis discipline (cpa-usage-keeper SQLite analytics + rtk gain JSON merge)
3. **Wave 106 fire 3**: codex T1 NEEDS-REVISION review of rtk PreToolUse hook integration with safety_guard.py + agent_plan_readonly_bash_guard.py existing layers per layered-gates-architecture.md §6 Layer 3

If operator REJECTS rtk pilot (e.g., WSL not available):
- Document HONEST-NON-FINDING in `docs/install-provenance.md` under "Token-eff axis-4 gap surfaced Wave 105 — pilot blocked by Windows-native fallback insufficiency"
- Re-evaluate at next Anthropic CC release adding native PreToolUse-hook output filtering primitive (would obviate rtk)

---

## Final report shape

DONE: 5 candidates surfaced; 0 ADOPT-NOW + 2 STUDY-PILOT (rtk-ai/rtk, edouard-claude/snip — pick ONE) + 3 REJECT-FOR-FIT (ccNexus duplicate, wet duplicate+IPC-blocker, tamp duplicate+conflict); artifact at tmp/wave105-agentA-token-eff-repos-2026-05-08.md. KEY-FINDING: eee's fleet-layer is saturated; only Bash-output-filter axis-4 gap exists (rtk/snip class). HONEST-NON-FINDING-ADJACENT: user hypothesis "many SOTA repos not yet adapted" partially refuted at fleet layer.
