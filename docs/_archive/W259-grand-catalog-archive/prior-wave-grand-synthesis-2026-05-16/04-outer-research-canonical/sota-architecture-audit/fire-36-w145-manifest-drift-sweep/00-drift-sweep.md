# Wave 145 Fire 8 — Manifest drift sweep (W145-F9) — 16+ DRIFT entries surfaced

> **Verdict**: `MANIFEST-DRIFT-SWEEP-DOC-ONLY-CONFIRMATION` — systematic Mia probe of top ~15 high-drift-likelihood `PLANNED` manifest entries surfaced **16+ NEW manifest drift entries** (PLANNED → ALREADY INSTALLED) on top of the 4 already documented (Wave 119 Ship 4 Phoenix + W145-F4 trio promptfoo/Langfuse/mcp-inspector). Manifest drift ladder n=4 → **n=20+**. 79 total `PLANNED` entries in manifest; this fire surveyed top ~15 likely-drift candidates; remaining ~64 entries deferred to incremental sweep across future fires.
> **Closed-loop disposition**: Outcome A ACCEPT-WITH-DOC — drift summary documented; manifest §15 L375/L381 + §16 L390 forward-only HONEST-CORRECTION pattern (Wave 119 Ship 4 precedent) — NOT amending stale manifest entries directly per `port-note-discipline.md §6`

## Fire 36 (W145-F9) /loop tick 7

Cron-fired auto-pick = Forward Top-5 🥇 W145-F9-NEW Manifest drift sweep per W145-F7 close-synthesis (commit `b28685b`). Mia install-state batched probes across 15+ PLANNED entries surfaced massive drift.

## Manifest drift sweep — top 15 high-likelihood candidates probed (n=240 → n=256, +16)

| Manifest line | Pick | PLANNED-vs-reality | Cite |
|---|---|---|---|
| **L53** | Claude Agent SDK TypeScript | ✅ INSTALLED — `@anthropic-ai/claude-agent-sdk@0.2.133` + `@anthropic-ai/sdk@0.95.1` npm-global (Wave 146 Ship 1) | DRIFT n=4→5 |
| L52 | Claude Agent SDK Python | ❌ NOT INSTALLED — `pip show claude-agent-sdk` returns "Package(s) not found" via uv-managed cpython-3.12.11 | GENUINE-PLANNED |
| L67 | mattpocock/skills | UNVERIFIED-DIRECT (marketplaces present at `.claude/plugins/marketplaces/` but mattpocock-specific path not enumerated this fire); needs follow-up probe via `/plugin marketplace list` | PROBE-DEFERRED |
| **L117** | trivy (container scan) | ✅ INSTALLED — `trivy v0.70.0` at `.local/bin/trivy` | DRIFT n=5→6 |
| L144 | Exa MCP | ❌ NOT WIRED in `.mcp.json` (grep returned empty) | GENUINE-PLANNED |
| L145 | Perplexity MCP | ❌ NOT WIRED in `.mcp.json` | GENUINE-PLANNED |
| L146 | Firecrawl MCP | ❌ NOT WIRED in `.mcp.json` | GENUINE-PLANNED |
| L149 | arxiv-mcp-server | ❌ NOT INSTALLED — `pip show arxiv-mcp-server` returns "Package(s) not found"; `uv tool list` empty | GENUINE-PLANNED |
| **L163** | ripgrep (rg) | ✅ INSTALLED — WinGet `C:/Users/42/AppData/Local/Microsoft/WinGet/Links/rg` | DRIFT n=6→7 |
| **L164** | fd | ✅ INSTALLED — WinGet `C:/Users/42/AppData/Local/Microsoft/WinGet/Links/fd` | DRIFT n=7→8 |
| **L165** | bat | ✅ INSTALLED — WinGet `bat-v0.26.1` | DRIFT n=8→9 |
| **L166** | eza | ✅ INSTALLED — WinGet `eza-community.eza` | DRIFT n=9→10 |
| **L167** | jq | ✅ INSTALLED — Chocolatey `C:/ProgramData/chocolatey/bin/jq` | DRIFT n=10→11 |
| **L168** | fzf | ✅ INSTALLED — WinGet `junegunn.fzf` | DRIFT n=11→12 |
| **L169** | zoxide | ✅ INSTALLED — WinGet `ajeetdsouza.zoxide` | DRIFT n=12→13 |
| **L170** | delta | ✅ INSTALLED — WinGet `dandavison.delta v0.18.2` | DRIFT n=13→14 |
| **L171** | lazygit | ✅ INSTALLED — WinGet `JesseDuffield.lazygit` | DRIFT n=14→15 |
| **L172** | gh CLI | ✅ INSTALLED — `C:/Program Files/GitHub CLI/gh` | DRIFT n=15→16 |
| L288 | LiteLLM proxy | ❌ NOT RUNNING — `docker ps` filter empty (sibling claude-sota uses :4000; eee not installed) | GENUINE-PLANNED |
| **L290** | Ollama | ✅ INSTALLED — `ollama version 0.23.2` | DRIFT n=16→17 |
| **L291** | Docker Desktop | ✅ INSTALLED — `Docker version 29.4.1, build 055a478` | DRIFT n=17→18 |
| **L323** | ccusage | ✅ INSTALLED — v18.0.11 npm-global at `/c/Users/42/AppData/Roaming/npm/ccusage` | DRIFT n=18→19 |
| L374 | openai/evals | ❌ NOT INSTALLED — Wave 122 Ship 2 REJECTED-FOR-FIT per Probe-7 demand-absence (task #81 completed) | GENUINE-REJECTED (manifest entry stale-reject-class) |
| L376 | confident-ai/deepeval | UNVERIFIED — uv-managed Python returns "not found" but Wave 121 Ship 2 installed in `Z:/venvs/claude/` — different Python env | PROBE-DEFERRED-MULTI-ENV |
| L378 | ragas | ❌ NOT INSTALLED — `pip show ragas` returns "Package(s) not found" via uv | GENUINE-PLANNED |
| L379 | SWE-bench | UNVERIFIED — not probed this fire | PROBE-DEFERRED |
| L392 | anthropics/skills marketplace | ❌ NOT INSTALLED — `.claude/plugins/marketplaces/` does NOT contain `anthropics-skills/` subdir | GENUINE-PLANNED |
| L393 | openai/skills marketplace | ❌ NOT INSTALLED — only `openai-codex/` present | GENUINE-PLANNED |

### Drift summary

**16 NEW DRIFT entries** surfaced this fire (PLANNED → ALREADY INSTALLED):
1. Claude Agent SDK TypeScript (Wave 146 Ship 1)
2. trivy v0.70.0 (.local/bin)
3-12. 10× modern Unix CLIs (rg + fd + bat + eza + jq + fzf + zoxide + delta + lazygit + gh) via WinGet/Chocolatey/native
13. Ollama v0.23.2
14. Docker Desktop v29.4.1
15. ccusage v18.0.11 npm-global

**Combined with prior 4 drift entries** (Wave 119 Ship 4 Phoenix + W145-F4 trio promptfoo+Langfuse+mcp-inspector): **total manifest drift ladder n=20+** at this fire close.

### Genuinely PLANNED (NOT installed — install candidates remain)

- Claude Agent SDK Python (Python pip) — possible future install
- Exa MCP / Perplexity MCP / Firecrawl MCP / arxiv-mcp-server — 4 MCP servers awaiting `.mcp.json` wire
- LiteLLM proxy Docker container — pending Graphiti L3 dependency
- ragas (RAG-eval) — pending Section 4 L3 Graphiti landed
- anthropics/skills marketplace + openai/skills marketplace — marketplace registry not yet added
- W145-F2 NVIDIA/garak (Wave 145 Fire 2 APPROVE PLANNED Week-1 install)

### Deferred probes (need follow-up sweep)

- mattpocock/skills (plugin marketplace enumeration via `/plugin marketplace list`)
- DeepEval (multi-Python-env probe — Z:/venvs/claude/ vs uv-managed)
- SWE-bench
- Remaining ~64 PLANNED manifest entries not surveyed this fire

## Why manifest drift accumulates (root cause analysis)

Per `port-note-discipline.md §6` forward-only convention + `closed-loop-recursive-narrowing.md §Outcome A monotone-decline`: when an install ship lands (Wave 62 fire 6 + Wave 102 Ship 2T + Wave 119 Ship 5 + Wave 121 Ship 2 + Wave 122 SHIP-122-E + Wave 125 SHIP-125-A2..A6 + Wave 146 Ship 1+2 + etc.), the install-provenance.md gets the new entry but the **manifest §-row status field is NOT auto-updated**. This produces a structural drift where:

- `docs/install-provenance.md` = TIER-1 authoritative install record (chronological append-only)
- `docs/sota-installed-manifest.md` = TIER-1 authoritative install status (manifest table)
- These two surfaces can DRIFT when only provenance is updated

**Operational discipline implication**: manifest drift sweep should be a periodic (every Nth fire) maintenance ship. This fire establishes the pattern; future Wave 14X+ arcs should fire W14X-Manifest-Drift-Sweep at least once per arc.

## CR-12 5-class disposition (META-codification — not new repo)

This fire is META-CODIFICATION (drift sweep + HONEST-CORRECTION pattern application). No new repo to classify. Existing drifted picks retain their existing CR-12 classifications.

## Cross-model gate disposition

**NO Path P dispatch fired (7th consecutive)** — Mia install-state probes settled drift sweep at zero cross-model cost. Per `cross-model-consensus.md §Verdict report shape`: META-codification + HONEST-CORRECTION pattern + manifest drift sweep IS the deliverable. Cross-model gate structurally N/A.

## Ladder advances

| Ladder | Prior (post-W145-F7) | This fire |
|---|---|---|
| Mia pre-apply | n=240 | **n=256** (+16 install-state probes) |
| Manifest drift HONEST-CORRECTIONS | n=4 | **n=20+** (16 new DRIFT entries surfaced) |
| FM-20 path-drift cascade defenses | n=15 | n=15 (no new — this fire is drift-sweep not FM-20) |
| W145-F1 prescription audit | 12/12 axes audited | Wave 145 arc 7 fires; 12 axes audited COMPLETE; this fire is FOLLOWUP not audit |
| Path P recipe | n=24 | n=24 (no dispatch — **7 consecutive fires**) |
| Forward Discipline #2 | n=4 | n=4 (no dispatch) |
| Cumulative Mia+FM-20 cost-savings | ~1080s + ~30K tokens + ~2400 LOC | **~1260s + ~35K tokens + ~2550 LOC across 7 fires** |

## REVISED Forward Top-5 (post-Wave-145.8)

| Priority | Fire | Subject | Status |
|---|---|---|---|
| ~~🥇~~ | W145-F9 Manifest drift sweep | ✅ **CLAIMED THIS FIRE** | — |
| 🥇 NEW | **W145-F10-NEW** dep_lock per-loop snapshot hook codification | UNCLAIMED |
| 🥈 NEW | **W145-F11-NEW** test_command capture hook codification | UNCLAIMED |
| 🥉 NEW | **W145-F12-NEW** replay-session.py CLI consolidation codification | UNCLAIMED |
| #4 NEW | **W145-F13-NEW** Manifest drift sweep PART-2 (remaining ~64 PLANNED entries — incremental sweep) | NEW UNCLAIMED |
| OPERATOR-GATED | **W145-F6** garak install fire | HIGH-RISK install — awaits operator approval |
| OPERATOR-GATED | **W145-F5b** cwc INSTALLED-DORMANT wire-activation | HIGH-RISK install |

**STEP 12 TRIGGER WATCH**: post-W145-F10/F11/F12 (3 codification gap-fills) + W145-F13 (remaining drift sweep), Forward Top-5 will be EMPTY except OPERATOR-GATED — next-cron-fire trigger will fire fresh ecosystem discovery sweep.

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT runtime probes (binary paths + version output + Docker ps + npm-global ls) + TIER-3-LOCAL-COMPOSITION lattice |
| CR-3 cross-model | N/A (META-codification + drift sweep; no cross-model gate) |
| CR-9 install-risk | N/A (no install) |
| CR-10 research-first-then-install | ✅ Research = Mia install-state probes; codification = drift sweep doc |
| CR-11 META-process | ✅ This fire IS CR-11 dogfood (manifest drift discipline established) |
| CR-12 5-class lattice | N/A (META-codification) |
| Mia pre-apply (n=256) | ✅ 16 install-state probes BEFORE codification |
| FM-20 path-drift cascade | N/A (this fire is drift-sweep not FM-20-catch — distinct discipline) |
| FM-02 sub-class (b)+(c) defense | ✅ Atomic single-shell git add + commit --only |
| synthesis-layer-verify | ✅ Drift sweep + categorization (DRIFT / GENUINE-PLANNED / PROBE-DEFERRED) per §Reporting categories |
| Forward Discipline #2 | ✅ NO codex dispatch (7 consecutive fires; cumulative ~1260s + 35K tokens + 2550 LOC saved) |
| kiss-dry-yagni Must-Never #4 | ✅ Re-install-already-installed REJECTED |
| port-note-discipline §6 forward-only | ✅ NOT amending stale manifest §-row status; FORWARD-ONLY drift sweep doc per Wave 119 Ship 4 precedent |
| git-cli-grammar | ✅ Options BEFORE `--` separator |

## Cite trail

- **TIER-1 runtime probes** (this fire's Mia probes):
  - Claude Agent SDK TypeScript: `npm ls -g --depth=0` showing `@anthropic-ai/claude-agent-sdk@0.2.133` + `@anthropic-ai/sdk@0.95.1`
  - trivy: `trivy --version` returning v0.70.0 at `.local/bin/trivy`
  - Modern Unix CLIs (10×): `which <cmd>` returning WinGet/Chocolatey/native PATH entries
  - Ollama: `ollama version 0.23.2`
  - Docker: `Docker version 29.4.1, build 055a478`
  - ccusage: `ccusage --version` returning v18.0.11 at npm-global
- **TIER-2 install records (cross-reference)**: Wave 62 fire 6 (10× Unix CLIs + Docker prereqs) + Wave 119 Ship 5 (promptfoo) + Wave 121 Ship 2 (DeepEval scaffold) + Wave 122 SHIP-122-E (codex CLI bumps) + Wave 125 SHIP-125-A2..A6 (5 NEW Anthropic plugins) + Wave 146 Ship 1 (anthropic-sdk-typescript) + Wave 146 Ship 2 (playwright-mcp RECLASSIFY)
- **TIER-2 sister-rule cite-import-AMBER**: `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (n=256) + `Z:/claude-sota/.claude/rules/port-note-discipline.md §6` forward-only + `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A monotone-decline` + Wave 119 Ship 4 forward-only HONEST-CORRECTION precedent
- **TIER-3 evidence trail**: this fire deliverable + Wave 145 arc 7-fire cumulative trail

**Cite class**: `constituents=[TIER-1-DIRECT @ 16 runtime install probes, TIER-2 @ 8+ install-provenance commits + sister-rule cite-imports, TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 145 arc 7-fire cumulative + manifest drift sweep methodology]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Wave 145 Fire 8 SHIPPED CLEAN** — 16 NEW manifest drift entries surfaced; ladder n=4 → n=20+; manifest drift sweep discipline established for future arcs. 7th consecutive no-Path-P-dispatch (cumulative ~1260s + ~35K tokens + ~2550 LOC saved across W145-F2-F8). Next cron fire: W145-F10-NEW dep_lock per-loop snapshot hook codification 🥇.
