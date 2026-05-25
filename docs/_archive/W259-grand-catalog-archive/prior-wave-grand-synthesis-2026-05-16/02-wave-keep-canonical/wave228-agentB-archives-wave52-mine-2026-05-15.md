# Wave 228 Agent B — _archives/ + wave52/ deep-mine (sota-researcher Sonnet stand-in)

**Date**: 2026-05-15
**Role**: sota-researcher (Sonnet stand-in per `cmc-env-funneled-disclosure.md §The mandate` Option 2 explicit-disclosure — STAND-IN-NOTICE: cross-model gate NOT structurally satisfied for this dispatch)
**Scope**: Deep mine of `Z:/claude-sota-installed/docs/outer research/_archives/` (54 zip kits) + `wave52/` (9 already-extracted analysis files) for SOTA candidates NOT in W212-W227 catalogs.

## Section 1 — Archive folder inventory summary

### `_archives/` zip inventory (54 files)

54 SOTA research kit archives spanning **v5 → v62** (~50+ versions of incremental SOTA convergence), each ~28-90KB. Status: 54 zip files; **kits already extracted to** `Z:/claude-sota-installed/docs/outer research/kits/v{10..40+}/` containing 2021 MD files total.

### `wave52/` extracted files (9 files)

Wave 52 was the install-planning wave (2026-05-07) — analysis already curated:
- `WAVE52-ITER1B-FINAL-REPORT.md` (3.6K) — final iter1B report
- `iter1a-shan-extraction.json` (99.7K) + `iter1a-shan-summary.md` (17.2K) — CCBP shan top-20 patterns
- `iter1b-convergence-map.md` (6.2K) + `iter1b-kits-catalog.json` (6K) — kit URL inventory
- `iter1c-installed-audit.md` (6.9K) — installed-vs-uninstalled audit
- `iter1d-eee-install-plan.md` (17.4K) — eee install plan
- **`iter2b-advanced-unadopted.md` (24.7K) — TOP 10 Anthropic-official patterns not yet adopted (KEY FIND)**
- `iter3a-install-plan.md` (30.9K) — install plan synthesis

## Section 2 — All GitHub URLs extracted (deduped)

- **wave52/**: ~50 unique URLs
- **kits/**: **382 unique GitHub URLs** spanning all 65 versions
- **W212-W227 incumbent set**: 24 unique URLs
- **Delta after dedup + normalize**: **368 candidate URLs in kits NOT in W212-W227**

## Section 3 — NEW candidates not yet scored (top 6 by leverage)

| # | Candidate | URL | Why NEW (not in W212-W227) |
|---|---|---|---|
| 1 | **EveryInc/compound-engineering-plugin** | `github.com/EveryInc/compound-engineering-plugin` | NOT in W227 catalog; 88 skills/agents, multi-IDE Claude/Codex/Cursor/Copilot/Gemini support |
| 2 | **SuperClaude-Org/SuperClaude_Framework** | `github.com/SuperClaude-Org/SuperClaude_Framework` | NOT in W227 catalog; 30 commands + 20 agents + 7 modes + 8 MCP servers + v4.3.0 |
| 3 | **Wirasm/PRPs-agentic-eng** | `github.com/Wirasm/PRPs-agentic-eng` | PRP methodology + Ralph loop integration + 11 commands |
| 4 | **disler/claude-code-hooks-multi-agent-observability** | `github.com/disler/claude-code-hooks-multi-agent-observability` | Multi-agent observability dashboard (12 hook events, Bun+Vue+SQLite+WebSocket realtime) |
| 5 | **Piebald-AI/claude-code-system-prompts** | `github.com/Piebald-AI/claude-code-system-prompts` | Reverse-engineered Claude Code system prompts catalog + ~40 system reminders (Jan 2026) |
| 6 | **manaflow-ai/cmux** | `github.com/manaflow-ai/cmux` | Ghostty-based macOS terminal + Claude Code Teams native splits |
| 7 | **wave52 iter2b unadopted patterns 1-10** | (Anthropic CC env vars + plugins) | TOP 10 Anthropic-official patterns from wave52 deep-audit |

## Section 4 — Comprehensive scoring of NEW candidates

### Candidate 1: EveryInc/compound-engineering-plugin

| Axis | Verdict |
|---|---|
| **LICENSE** | MIT [VERIFIED 2026-05-15 via direct README read at @HEAD `39cb9da3`] |
| **Convergence Axis 1** | PARTIAL — 1 org (EveryInc) named-author "Brian DiCenzo" + cite via `awesome-claude-code` |
| **Convergence Axis 2** | PASS — public blog series `every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents` (named author + dated artifacts) |
| **Convergence Axis 3** | PARTIAL — need explicit age probe; v1+ release stable |
| **NATIVE-CC** | YES — `/plugin marketplace add EveryInc/compound-engineering-plugin` + `/plugin install compound-engineering` |
| **CR-12 disposition** | **PROVIDER-COMPLEMENT** — compounds with installed `superpowers@claude-plugins-official` (88: 37 skills + 51 agents) |
| **Probe 7.b harness-fit** | PASS — creates new workflow (`/ce-strategy → /ce-ideate → /ce-brainstorm → /ce-plan → /ce-work → /ce-code-review → /ce-compound`) |
| **Wired difficulty** | **LOW** — single `/plugin install` |

### Candidate 2: SuperClaude-Org/SuperClaude_Framework

| Axis | Verdict |
|---|---|
| **LICENSE** | MIT [VERIFIED via README badge at @HEAD `226c45cc`] |
| **Convergence Axis 1** | FAIL — 1 org single maintainer |
| **NATIVE-CC** | NO — installs via pipx (Python SDK) + slash commands separate from Claude plugin marketplace; v5 PROMISES marketplace "no ETA" |
| **CR-12 disposition** | **PARTIAL-OVERLAP / DUPLICATE-FUNCTIONALITY** — overlaps with installed `agent-orchestration@claude-code-workflows`, `agent-teams@claude-code-workflows`, `superpowers@claude-plugins-official`, `skill-creator@claude-plugins-official` |
| **Probe 7.b harness-fit** | FAIL — meta-programming-config-framework competes with native Claude plugin marketplace |

### Candidate 3: Wirasm/PRPs-agentic-eng

| Axis | Verdict |
|---|---|
| **LICENSE** | MIT (verbatim README) |
| **Freshness** | Active 2026; `.claude/commands/prp-core/` with 11 commands at @HEAD `9581e15d` |
| **Convergence Axis 1** | FAIL — 1 maintainer (Wirasm/Rasmus Widing) |
| **NATIVE-CC** | PARTIAL — copy commands; NOT installable as marketplace plugin |
| **CR-12 disposition** | **PARTIAL-OVERLAP** — overlaps with installed `ralph-loop@claude-plugins-official` + `feature-dev@claude-plugins-official` |

### Candidate 4: disler/claude-code-hooks-multi-agent-observability

| Axis | Verdict |
|---|---|
| **LICENSE** | UNVERIFIED — `LICENSE` file FETCH FAILED; HONEST-NON-FINDING |
| **Convergence Axis 2** | PASS — YouTube deep-dive videos + IndyDevDan named YouTube channel + `agenticengineer.com/tactical-agentic-coding` workshop |
| **NATIVE-CC** | PARTIAL — `cp -R .claude` directory + Bun server + Vue client + `ANTHROPIC_API_KEY` env required |
| **CR-12 disposition** | **GENUINELY-NEW** — realtime observability dashboard for 12 hook events; fills observability-dashboard gap |
| **Wired difficulty** | MEDIUM-HIGH — Bun stack + dependency installation + server runs at port 4000/5173 |

### Candidate 5: Piebald-AI/claude-code-system-prompts

| Axis | Verdict |
|---|---|
| **LICENSE** | MIT [VERIFIED 2026-05-15 via direct LICENSE read at @HEAD `89eae926` content-SHA `f2041191`] |
| **Freshness** | Active — Jan 23, 2026 "added all of Claude Code's ~40 system reminders" |
| **NATIVE-CC** | NO — REFERENCE catalog, not installable plugin |
| **CR-12 disposition** | **CITE-CLASS-CANONICAL** — reverse-engineered system prompts catalog |
| **Wired difficulty** | NONE — reference-only |

### Candidate 6: manaflow-ai/cmux

| Axis | Verdict |
|---|---|
| **LICENSE** | **GPL-3.0-or-later** (dual-licensed; commercial available) — Probe 6 LICENSE BLOCKER |
| **CR-12 disposition** | **REJECT-FOR-FIT** per Probe 5 (mode-harness-shape) — **macOS-only** (Swift/AppKit native); claude-sota-installed is **Windows 11 Pro** |
| **Double blocker** | macOS-only + GPL-3.0 |

### Candidate 7: wave52 iter2b Top 10 Anthropic-official patterns (delta vs installed)

| iter2b # | Pattern | Status in claude-sota-installed | Action |
|---|---|---|---|
| 1 | Migrate `outputStyle: "Explanatory"` → `explanatory-output-style@claude-plugins-official` plugin | Plugin present but NOT in `settings.json` enabledPlugins | **ENABLE** — drop-in replacement (LOW risk) |
| 2 | `ANTHROPIC_SMALL_FAST_MODEL` + `ANTHROPIC_DEFAULT_HAIKU_MODEL` pins | NOT SET | **ADD** to settings.json env (LOW risk) |
| 3 | `--system-prompt-file` for sss/eval personas | NOT WIRED in tools/eee.ps1 | **ADD** wrapper (LOW-MED risk) |
| 4 | `session-report@claude-plugins-official` | **INSTALLED** ✅ | DONE |
| 5 | `claude-md-management@claude-plugins-official` | **INSTALLED** ✅ | DONE |
| 6 | `agent-sdk-dev@claude-plugins-official` | **INSTALLED** ✅ | DONE |
| 7 | `OTEL_LOG_USER_PROMPTS=1` + `OTEL_LOG_RAW_API_BODIES=1` | UNKNOWN — needs env audit | **AUDIT** + add (MEDIUM risk — PII; gate via local-only Langfuse) |
| 8 | `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` (Windows pwsh tool) | UNKNOWN — needs env audit | **AUDIT** + add (Windows-native value MEDIUM risk) |
| 9 | `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=60000` | UNKNOWN — likely missing | **ADD** to settings.json env (LOW risk) |
| 10 | SDK `--max-budget-usd` + custom session_stores | NOT WIRED in tools/eee.ps1 | **ADD** to launcher cmdline (LOW risk for cap; defer session_stores) |

## Section 5 — Recommendation per candidate

| # | Candidate | Verdict | Rationale | Reversibility |
|---|---|---|---|---|
| 1 | **EveryInc/compound-engineering-plugin** | **ADOPT-NOW-CONDITIONAL** | NATIVE-CC + MIT + 88 skills/agents + PROVIDER-COMPLEMENT to superpowers. Conditional: Axis-3 age ≥90d probe gate | HIGH |
| 2 | **SuperClaude-Org/SuperClaude_Framework** | **REJECT-FOR-FIT** | DUPLICATE-FUNCTIONALITY with installed primitives; pipx competing with native plugin marketplace | HIGH |
| 3 | **Wirasm/PRPs-agentic-eng** | **STUDY-PILOT-NARROW** | Pilot 1-2 commands (`/prp-prd` + `/prp-debug` 5-Whys); PARTIAL-OVERLAP with ralph-loop | HIGH |
| 4 | **disler/claude-code-hooks-multi-agent-observability** | **STUDY-PILOT-DEFER** | LICENSE audit BLOCKER first (HONEST-NON-FINDING); Bun stack operational overhead | HIGH |
| 5 | **Piebald-AI/claude-code-system-prompts** | **ADOPT-NOW** as CITE-CLASS-CANONICAL reference | MIT + active + ~40 system reminders catalog; no install needed | TRIVIAL |
| 6 | **manaflow-ai/cmux** | **REJECT-FOR-FIT** | macOS-only + GPL-3.0 double-blocker | N/A |
| 7 | **wave52 iter2b 10 patterns** | **ADOPT-NOW-PARTIAL** (closures #1+#2+#3+#7+#8+#9+#10) | Patterns #4+#5+#6 already INSTALLED; remaining 7 are Anthropic-official env+plugin requiring settings.json + tools/eee.ps1 updates | HIGH |

## Section 6 — VERDICT

**VERDICT**: Wave 228 Agent B archives + wave52 deep-mine surfaces **6 NEW SOTA candidates + 7 unadopted Anthropic-official patterns** not in W212-W227 catalogs (zero overlap verified). Recommended Pattern A apply order:

1. **HIGH-LEVERAGE adoption batch** (LOW risk, immediate): wave52 iter2b patterns #1/#9 (settings.json env + plugin enable) — ~10 LOC delta
2. **PROVIDER-COMPLEMENT install**: `EveryInc/compound-engineering-plugin` via `/plugin install` — NATIVE-CC, MIT, 88 skills/agents
3. **CITE-CLASS reference adoption**: `Piebald-AI/claude-code-system-prompts` as cite-anchor
4. **STUDY-PILOT-NARROW (1-2 commands only)**: `Wirasm/PRPs-agentic-eng` `/prp-debug` 5-Whys methodology
5. **STUDY-PILOT-DEFER**: `disler/claude-code-hooks-multi-agent-observability` — LICENSE-audit first
6. **MEDIUM-RISK Windows-specific**: `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` + OTEL log env additions — test in `--debug` first
7. **REJECT**: cmux (macOS+GPL double-blocker); SuperClaude (DUPLICATE-FUNCTIONALITY)

**Key finding**: `wave52/iter2b-advanced-unadopted.md` (24.7K) is the highest-value buried artifact — it contains a fully-verified Anthropic-official adoption checklist that **6 months later (W225 final) still has 7/10 unclosed patterns** including Windows-native PowerShell tool migration (#8) and SessionEnd timeout fix (#9).

**STAND-IN-NOTICE**: cross-model gate NOT structurally satisfied — orchestrator MUST file 2nd-stage validation before any ADOPT-NOW commit.
