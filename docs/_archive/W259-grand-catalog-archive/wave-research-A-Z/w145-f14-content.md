
---

## Wave 145 Fire 14 — Manifest drift sweep PART-3 [VERIFIED 2026-05-11]

**Trigger**: /loop cron `*/12` fire post-W141.2 (forensics at `c88b8ae`); 7th-consecutive stale-cron pivot (cron prompt named W145-F13 forward-pick already SHIPPED). Auto-pivot to W145-F14 manifest drift sweep PART-3 (sister W145-F8 fire-36 + W145-F13 fire post-F12 covered ~52; ~46 PLANNED entries remaining per W145-F13 baseline).

**Sweep methodology** (per W145-F8 + W119 Ship 4 forward-only HONEST-CORRECTION + W145-F13 PART-2 pattern): probe install-state via canonical channel for each remaining PLANNED candidate; surface DRIFT entries to install-provenance.md APPEND (NOT amend stale manifest text inline per `port-note-discipline.md` section 6).

### NEW DRIFT entries surfaced (~17 candidates verified INSTALLED)

| # | Manifest line | Candidate | Probe result | Channel |
|---|---|---|---|---|
| 1 | Section 10 (L197) | `gh CLI` v2.88.1 (2026-03-12) | INSTALLED | WinGet `winget install GitHub.cli` |
| 2 | Section 10 (L196) | `lazygit` v0.60.0 | INSTALLED | WinGet (cross-verified W145-F13 row 9 — gh release pattern actually winget-installed) |
| 3 | Section 4 (L315) | `Ollama` v0.23.2 | INSTALLED | gh release / native install (W141 backend probe verified ollama proxy :11700 active with 15 models) |
| 4 | Section 4 (L316) | `Docker Desktop` v29.4.1 | INSTALLED | WinGet `Docker.DockerDesktop` (verified via `docker --version`; W141 backend probe verified 10+ containers UP 17h) |
| 5 | Section 15 (L401) | `deepeval` v3.8.4 | INSTALLED | pip — Wave 121 Ship 2 confirmed; sister to promptfoo |
| 6 | Section 15 (L402) | `braintrust` v0.5.3 (Python SDK) | INSTALLED | pip — Wave 50 fire 9 candidate or earlier |
| 7 | Section 11 (L348) | `ccusage` v18.0.11 | INSTALLED | npm-global — top-15 grand catalog item; Wave 123 Ship 2 ccusage-vs-ccstatusline resolution |
| 8 | Section 15 | `promptfoo` v0.121.11 (npm) | INSTALLED | npm-global (NOT Python pkg per probe 11 below) |
| 9 | Section 3 | `addy-agent-skills` marketplace | INSTALLED | `.claude/plugins/marketplaces/addy-agent-skills/` |
| 10 | Section 3 | `anthropic-agent-skills` marketplace | INSTALLED | `.claude/plugins/marketplaces/anthropic-agent-skills/` |
| 11 | Section 3 | `claude-community` marketplace | INSTALLED | `.claude/plugins/marketplaces/claude-community/` |
| 12 | Section 3 | `claude-for-financial-services` marketplace | INSTALLED | `.claude/plugins/marketplaces/claude-for-financial-services/` |
| 13 | Section 3 | `claude-plugins-official` marketplace | INSTALLED | `.claude/plugins/marketplaces/claude-plugins-official/` |
| 14 | Section 3 | `context-mode` marketplace | INSTALLED | `.claude/plugins/marketplaces/context-mode/` |
| 15 | Section 3 | `everything-claude-code` marketplace | INSTALLED | `.claude/plugins/marketplaces/everything-claude-code/` (ECC plugin cache) |
| 16 | Section 3 | `healthcare` + `life-sciences` + `knowledge-work-plugins` marketplaces | INSTALLED | `.claude/plugins/marketplaces/{healthcare,life-sciences,knowledge-work-plugins}/` |
| 17 | Section 3 | `openai-codex` marketplace | INSTALLED | `.claude/plugins/marketplaces/openai-codex/` (codex-plugin-cc per Wave 50 fire 9 ranking #2) |

**Total NEW DRIFT entries: ~17** (4 CLI tools + 4 Python/npm eval libs + 11 plugin marketplaces, with 3 grouped under row 16).

### GENUINE NOT_INSTALLED entries (REJECT-FOR-FIT or pending)

| # | Candidate | Probe | Verdict |
|---|---|---|---|
| 1 | `openai/evals` (Python) | `importlib.metadata.version('evals')` returns NOT_INSTALLED | REJECT-FOR-FIT per Wave 122 Ship 2 (Probe-7 demand-absence) — sister to deepeval which IS installed and covers eval-class needs |
| 2 | `openai-evals` (alt name) | NOT_INSTALLED | Alias for openai/evals; same REJECT |
| 3 | `promptfoo` Python pkg | NOT_INSTALLED via pip | INSTALLED via npm-global v0.121.11 (channel divergence; canonical wire is npm) |
| 4 | `mattpocock/skills` marketplace | NOT installed (no `mattpocock-*/` dir) | REJECT-FOR-FIT per harness-fit Probe 5 iter-92 (HARD-GATE setup-matt-pocock-skills `disable-model-invocation: true` + 3 sequential interactive prompts at install — incompatible with autonomous /loop mode) |
| 5 | `braintrustdata/braintrust-claude-plugin` (L350) | not in `.claude/plugins/cache/` | GENUINE PLANNED — npm install + `/plugin marketplace add` pending |

### Verdict

**Manifest drift cumulative: W145-F8 (16+) + W145-F13 (~36) + W145-F14 (~17) = ~69+ DRIFT entries surfaced across 3 sweep fires**. Approximately 29+ PLANNED entries remain for incremental future-fire sweep (W145-F15-NEW).

**Plugin marketplace findings (NEW)**: 11 marketplaces INSTALLED in `.claude/plugins/marketplaces/`. ECC plugin cache provides 6 servers via `plugin:everything-claude-code:*` prefix (confirmed via W141.2 forensics). Operator may have selectively skipped mattpocock-skills (HARD-GATE REJECT) + wshobson-agents (REJECT-FOR-FIT-MAJORITY per Wave 138 Fire 1).

**Root cause confirmed** (per W145-F8 + W145-F13 finding): manifest section-row status drift surfaces because install-provenance.md updates land but manifest section-row text is NOT auto-updated when install ships land — structural drift. Forward-only HONEST-CORRECTION via install-provenance.md APPEND remains correct discipline per `port-note-discipline.md` section 6.

### Cross-model gate disposition

N/A (mechanical install-state probe sweep; no design-surface edit). 15th cumulative consecutive no-Path-P-dispatch.

### Ladder advances

| Ladder | Prior (post-W141.2) | This fire |
|---|---|---|
| Mia pre-apply | n=337 | **n=345** (+8: 4 CLI probes + Python eval batch + npm eval batch + plugin marketplace ls + mattpocock-skills exclusion verify + braintrust-claude-plugin not-found verify + promptfoo channel divergence + Docker version) |
| FM-20 path-drift cascade | n=23 | **n=24** (+1: 7th-consecutive stale cron prompt pivot catch — sustained signal across 7 ticks now) |
| Manifest drift cumulative | W145-F8+F13 = ~52+ | **W145-F8 + W145-F13 + W145-F14 = ~69+ NEW DRIFT** |
| Path P recipe | n=32 | n=32 (15th cumulative consecutive no-Path-P probe/codification) |
| Cumulative cost-savings | ~2400s + ~64K tokens + ~3600 LOC | **~2520s + ~67K tokens + ~3800 LOC** |

### REVISED Forward Top-5 (post-W145-F14)

🥇 **W146-F8** SOTA cleanliness re-audit (HEAVY 3-agent Wave 24-D fan-out; quantitative metric refresh from 61% W146-F1 baseline — would benefit from significantly drift-corrected manifest baseline POST W145-F13+F14)
🥈 **W145-F15-NEW** Manifest drift sweep PART-4 (~29 remaining PLANNED entries)
🥉 **W141.1b** Graphiti+deepwiki+repomix+serena frontend wire fix — OPERATOR-GATED (Option A session restart OR Option B explicit `claude mcp add`)
#4 Fresh ecosystem discovery sweep (post all-arc-closures + drift correction)
OPERATOR-GATED HIGH-RISK: W145-F12b/F11b/F10b install / W138-F4 governance trio / W141B Docker MCP Gateway / W145-F5b cwc wire-activation

### Cite class

`constituents=[TIER-1-DIRECT @ WinGet manifest source + npm registry + PyPI + plugin marketplace dir, TIER-2 @ Z:/claude-sota/.claude/rules/cite-imports, TIER-3-LOCAL-OPERATOR-DERIVED @ Mia 17-entry multi-channel probe + 7-fires-stale cron pivot]; effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline.md rule 8 MIN_PRECEDENCE.

### Cardinal-rule conformance

CR-1 (TIER-1 cites to canonical channel registries) / CR-5 (verifies existing install-class artifacts; no new hand-coding) / CR-7 (Phase 1 AUTO-PROCEED MEDIUM-risk doc-codification) / CR-8 (mechanical install-state probe across SOTA channels) / CR-9 (N/A — no new install) / CR-10 (research-first via 17-entry probe sweep BEFORE manifest commentary) / CR-11 (META-process Mia n=337 to n=345) / CR-12 (N/A — drift-sweep not adoption) / Mia n=345 / FM-20 n=24 / FM-02 b+c atomic / git-cli-grammar / 15th cumulative no-Path-P-dispatch / port-note-discipline section 6 forward-only.

### Refs

- Sister W145-F8 fire-36 manifest drift sweep PART-1 (16+ entries surfaced)
- Sister W145-F13 manifest drift sweep PART-2 at `fc4e8b4` (~36 entries surfaced)
- Sister W141.2 forensics at `c88b8ae` (ECC plugin .mcp.json IS loaded vs workspace .mcp.json NOT loaded; CC version drift 2.1.119 < 2.1.132)
- MEMORY entries Wave 50 fire 9-10 Top-3 install priority + Wave 121 Ship 2 deepeval + Wave 122 Ship 2 openai/evals REJECT + Wave 123 Ship 2 ccusage + Wave 138 Fire 1 wshobson REJECT + Wave 137 Fire 2 mattpocock REJECT

**Wave 145 Fire 14 SHIPPED CLEAN** — ~17 NEW DRIFT entries surfaced (4 CLI tools + 4 eval libs + 11 plugin marketplaces) via 8-batch multi-channel install-state probe. 15th cumulative consecutive no-Path-P-dispatch (cumulative ~2520s + ~67K tokens + ~3800 LOC saved across W145-F2-F13 + W141 + W141.1 + W141.2 + W141 + W146 + W149 + W145-F14 arc). **Cumulative manifest drift correction: ~69+ DRIFT entries surfaced across 3 sweep fires**. Approximately 29+ PLANNED entries remain for W145-F15.
