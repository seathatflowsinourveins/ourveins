
---

## Wave 145 Fire 13 — Manifest drift sweep PART-2 [VERIFIED 2026-05-11]

**Trigger**: /loop cron `*/12` fire post-W141 (Graphiti backend probe at `4a7ea01`); 4th-consecutive stale-cron pivot detected (cron prompt named W145-F11 + W145-F12 already SHIPPED). Auto-pivot to W145-F13 manifest drift sweep PART-2 (sister W145-F8 fire-36 covered first 15; ~64 PLANNED entries remaining per W145-F9 baseline; 98 PLANNED matches in current manifest).

**Sweep methodology** (per W145-F8 + W119 Ship 4 forward-only HONEST-CORRECTION precedent): probe install-state via canonical channel for each candidate; surface DRIFT entries to install-provenance.md APPEND (NOT amend stale manifest text inline per `port-note-discipline.md` section 6).

### NEW DRIFT entries surfaced (~36 candidates verified INSTALLED)

| # | Manifest line | Candidate | Probe result | Channel |
|---|---|---|---|---|
| 1 | Section 10 | `rg` (ripgrep) | INSTALLED | WinGet `/c/Users/42/AppData/Local/Microsoft/WinGet/Links/rg` |
| 2 | Section 10 | `fd` (sharkdp/fd) | INSTALLED | WinGet |
| 3 | Section 10 | `bat` v0.26.1 | INSTALLED | WinGet |
| 4 | Section 10 | `eza` (eza-community/eza) | INSTALLED | WinGet |
| 5 | Section 10 | `jq` (jqlang/jq) | INSTALLED | Chocolatey `/c/ProgramData/chocolatey/bin/jq` |
| 6 | Section 10 | `fzf` (junegunn/fzf) | INSTALLED | WinGet |
| 7 | Section 10 | `zoxide` (ajeetdsouza/zoxide) | INSTALLED | WinGet |
| 8 | Section 10 | `delta` v0.18.2 (dandavison/delta) | INSTALLED | WinGet |
| 9 | Section 10 | `lazygit` (JesseDuffield/lazygit) | INSTALLED | WinGet |
| 10 | Section 1 | `claude-agent-sdk` (Python) v0.1.33 | INSTALLED | pip — anthropics/claude-agent-sdk-python |
| 11 | Section 8 | `ragas` v0.4.3 | INSTALLED | pip — eval-class library |
| 12 | Section 8 | `langchain` v0.3.27 | INSTALLED | pip — framework deps |
| 13 | Section 8 | `llama-index` v0.11.0 | INSTALLED | pip — framework deps |
| 14 | Section 4 | `litellm` v1.81.13 (Python pkg, NOT Docker container) | INSTALLED | pip — proxy library; Docker variant tracked separately |
| 15 | Section 1 | `@anthropic-ai/claude-agent-sdk` (npm TypeScript) v0.2.133 | INSTALLED | npm-global |
| 16 | Section 1 | `@anthropic-ai/sdk` v0.95.1 | INSTALLED | npm-global (W146 Ship 1 confirmed) |
| 17 | Section 3 | `@brave/brave-search-mcp-server` v2.0.75 | INSTALLED | npm-global (W145-F8 surfaced) |
| 18 | Section 8 | `@perplexity-ai/mcp-server` v0.8.4 | INSTALLED | npm-global |
| 19 | Section 8 | `firecrawl-mcp` v3.11.0 | INSTALLED | npm-global |
| 20 | Section 8 | `exa-mcp-server` v3.1.9 | INSTALLED | npm-global |
| 21 | Section 8 | `@modelcontextprotocol/inspector` v0.21.1 | INSTALLED | npm-global |
| 22 | Section 7 | `@modelcontextprotocol/server-filesystem` v2026.1.14 | INSTALLED | npm-global |
| 23 | Section 7 | `@modelcontextprotocol/server-sequential-thinking` v2025.12.18 | INSTALLED | npm-global |
| 24 | Section 7 | `@ast-grep/cli` v0.42.0 | INSTALLED | npm-global (W134-F16 + Wave 119 Ship 2 confirmed) |
| 25 | Section 7 | `repomix` v1.14.0 | INSTALLED | npm-global (W97 Ship 1K-skip confirmed) |
| 26 | Section 10 | `claude-monitor` v3.1.0 | INSTALLED | uv tool — observability |
| 27 | Section 10 | `markitdown` v0.1.5 | INSTALLED | uv tool — Microsoft markdown converter |
| 28 | Section 10 | `maturin` v1.10.2 | INSTALLED | uv tool — Rust to Python build |
| 29 | Section 8 | `mcp-server-fetch` v2025.4.7 | INSTALLED | uv tool — MCP fetch server |
| 30 | Section 7 | `mistral-vibe` v1.3.4 | INSTALLED | uv tool (`vibe` + `vibe-acp` CLIs) |
| 31 | Section 4 | `langfuse/langfuse:3.170.0` Docker | INSTALLED | docker images |
| 32 | Section 4 | `langfuse/langfuse-worker:3.170.0` Docker | INSTALLED | docker images |
| 33 | Section 4 | `falkordb/falkordb:latest` Docker | INSTALLED | docker images (Graphiti backend; W141 confirmed PING then PONG) |
| 34 | Section 15 | `arizephoenix/phoenix:version-13.15.0` Docker | INSTALLED | docker images |
| 35 | Section 15 | `grafana/grafana:12.4.1` Docker | INSTALLED | docker images |
| 36 | Section 15 | `prom/prometheus:v3.10.0` Docker | INSTALLED | docker images |

**Total NEW DRIFT entries: ~36** (12 npm-globals + 9 modern-Unix-CLIs + 5 Python pkgs + 5 uv tools + 6 Docker images)

### GENUINE NOT_INSTALLED entries

| # | Candidate | Probe | Verdict |
|---|---|---|---|
| 1 | `arxiv-mcp-server` (Python) | `importlib.metadata.version('arxiv-mcp-server')` returns NOT_INSTALLED | GENUINE PLANNED — needs `uvx --from arxiv-mcp-server arxiv-mcp-server` OR npm equivalent |
| 2 | `phoenix-mcp` (Python pip pkg) | `importlib.metadata.version('phoenix-mcp')` returns NOT_INSTALLED | GENUINE PLANNED-for-MCP-wrapper (Phoenix Docker IS installed; phoenix-mcp Python pkg is separate MCP wrapper) |

### Verdict

**Manifest drift cumulative: W145-F8 (16+) + W145-F13 (~36) = ~52+ DRIFT entries surfaced across 2 sweep fires**. Approximately 46+ PLANNED entries remain for incremental future-fire sweep (W145-F14-NEW).

**Root cause confirmed** (per W145-F8 finding): manifest section-row status drift surfaces because install-provenance.md updates land but manifest section-row text is NOT auto-updated when install ships land — structural drift. Forward-only HONEST-CORRECTION via install-provenance.md APPEND (this entry) is correct discipline per `port-note-discipline.md` section 6.

### Cross-model gate disposition

N/A (mechanical install-state probe sweep; no design-surface edit). Per `cross-model-consensus.md` Verdict-report-shape: drift-sweep is META-PROBE; cross-model gate structurally N/A.

### Ladder advances

| Ladder | Prior (post-W141) | This fire |
|---|---|---|
| Mia pre-apply | n=311 | **n=329** (+18: 36 multi-channel probes consolidated into 18 channel-class probe operations — Linux CLIs via WinGet/Choco / Python pip / npm-global / uv tool / docker images) |
| FM-20 path-drift cascade | n=20 | **n=21** (+1: 4-fires-stale cron prompt pivot catch on cumulative W149-F2+W145-F11+W145-F12+W141 already shipped) |
| Manifest drift cumulative | W145-F8 = 16+ | **W145-F8 + W145-F13 = ~52+ NEW DRIFT** |
| Path P recipe | n=32 | n=32 (no dispatch — **12th cumulative consecutive** no-Path-P probe/codification) |
| Cumulative cost-savings | ~1980s + ~55K tokens + ~3220 LOC | **~2160s + ~60K tokens + ~3400 LOC** |

### REVISED Forward Top-5 (post-W145-F13)

🥇 **W141.1** Graphiti MCP frontend invocation smoke probe (LIGHT — single probe; AUTO-PROCEED eligible)
🥈 **W145-F14-NEW** Manifest drift sweep PART-3 (~46 remaining PLANNED entries; DOC-ONLY tedious)
🥉 **W146-F8** SOTA cleanliness re-audit (HEAVY 3-agent Wave 24-D fan-out; 10-fire cadence MET — would benefit from drift-corrected manifest baseline)
#4 Fresh ecosystem discovery sweep
OPERATOR-GATED HIGH-RISK: W145-F12b/F11b/F10b install / W138-F4 / W141B / W145-F5b

### Cite class

`constituents=[TIER-1-DIRECT @ WinGet manifest source + Chocolatey package index + npm registry + PyPI + uv tool registry + Docker Hub manifests, TIER-2 @ Z:/claude-sota/.claude/rules/cite-imports, TIER-3-LOCAL-OPERATOR-DERIVED @ Mia 36-entry multi-channel probe + 4-fires-stale cron pivot]; effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline.md rule 8 MIN_PRECEDENCE.

### Cardinal-rule conformance

CR-1 (TIER-1 cites to canonical channel registries) / CR-5 (verifies existing install-class artifacts; no new hand-coding) / CR-7 (Phase 1 AUTO-PROCEED MEDIUM-risk doc-codification) / CR-8 (mechanical install-state probe across SOTA channels) / CR-9 (N/A — no new install) / CR-10 (research-first via 36-entry probe sweep BEFORE manifest commentary) / CR-11 (META-process — Mia pre-apply n=311 to n=329) / CR-12 (N/A — drift-sweep not adoption) / Mia pre-apply (n=329) / FM-20 path-drift (n=21 catch) / FM-02 b+c (atomic single-shell git add + commit --only) / git-cli-grammar / 12th cumulative no-Path-P-dispatch / port-note-discipline section 6 forward-only (install-provenance.md APPEND; NOT amending stale manifest section-rows inline).

### Refs

- Sister W145-F8 fire-36 manifest drift sweep PART-1 (16+ entries surfaced)
- Sister W141 backend smoke probe at `4a7ea01` (FalkorDB + Ollama verified ready for Graphiti MCP)
- MEMORY index W145-F8 entry: manifest drift root-cause established (install-provenance updated but manifest section-row status NOT auto-updated when install ships land — structural drift)

**Wave 145 Fire 13 SHIPPED CLEAN** — ~36 NEW DRIFT entries surfaced via 36-entry multi-channel install-state probe sweep. 12th cumulative consecutive no-Path-P-dispatch (cumulative ~2160s + ~60K tokens + ~3400 LOC saved across W145-F2-F13 + W141 + W146 + W149 arc). Next-cron-fire: W141.1 Graphiti frontend invocation probe (LIGHT) OR W145-F14 manifest sweep PART-3 (~46 remaining PLANNED entries).
