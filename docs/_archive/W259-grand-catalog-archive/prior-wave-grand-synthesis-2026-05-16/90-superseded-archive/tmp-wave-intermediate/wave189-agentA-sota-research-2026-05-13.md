# Wave 189 Agent A — SOTA Research: 15-repo Probe-DAG + convergence + Q1/Q2 cross-cutting
# Runtime: Z:/claude-sota-installed | Date: 2026-05-13 | Agent A (research-only)
# Discovery sources (>=4 distinct families per multi-source-discovery-breadth-discipline.md):
#   1. GitHub MCP (search_repositories x9 — all verified)
#   2. DeepWiki MCP (ask_question x5 — gsd / wshobson / learn-claude-code / superpowers / ECC)
#   3. Local deps clones (Z:/repos/deps/ — 10 repos present, file:line + HEAD SHA reads)
#   4. Runtime introspection (Z:/claude-sota-installed/ settings.json + 36 hook scripts + 64 rules + manifest)
# HONEST-NON-FINDING on Exa + context-mode MCP: NOT AVAILABLE in this subagent runtime —
#   compensated via GitHub + DeepWiki + local-clone + runtime-introspection (4 families satisfied).

## EXECUTIVE SUMMARY — operator's "rot / low quality context" is a TUNING gap, not a missing-primitive gap

The runtime ALREADY has a deep compact/preload hook layer (verified 2026-05-13):
- `auto-compact-discipline.md` (15.6KB, 7-rank recipe) + `sessionstart-preload-discipline.md` (11.4KB) RULES present
- 5 compact-class hooks: `precompact_guard.py` + `precompact_hint_emitter.py` + `sessionstart_compact_hint_reader.py` + `userpromptsubmit_compact_threshold.py` + ECC `pre-compact.js`
- PreCompact 4-layer stack WIRED: intelligent-compact `precompact_priorities.sh` + ECC `pre-compact.js` + context-mode `precompact.mjs` + ECC `suggest-compact.js`
- SessionStart matcher=="compact" rehydrate hook WIRED (`sessionstart_compact_hint_reader.py`)

The gap is calibration drift (FM-20 row 18 candidate already codified): script defaults were 200k-era
(250k/300k/350k) which fire CRIT at 35% on a 1M context window -> premature hard-blocks; W187 round-2 fixed
to 600k/650k/700k. Three of the 15 repos provide install-class hooks that materially CLOSE the remaining gap.

Top-3 verdicts for THIS runtime's hook/compact/preload gap:
1. `gsd-build/get-shit-done` — STUDY-PILOT — `gsd-context-monitor.js` PostToolUse context-guardrail hook
   (advisory `additionalContext` warnings at 35%/25% remaining + auto-state-record) is exactly the
   PostToolUse-class continuous-monitoring layer the runtime LACKS. Runtime-agnostic, MIT-likely, 11.4k stars.
2. `affaan-m/everything-claude-code` — ALREADY-INSTALLED-RATIFY — `strategic-compact` SKILL.md is the
   canonical Q1+Q2 cite source ("What Survives Compaction" table). Confirm SessionStart 3-hook pattern
   wired vs ECC plugin (`session-start.js` HISTORICAL-REFERENCE-ONLY guard is the SOTA preload pattern).
3. `obra/superpowers` — ALREADY-INSTALLED-RATIFY — `session-start` hook bootstrap-injection pattern
   (using-superpowers content into FIRST user message, NOT system message — token-bloat avoidance) is
   the SOTA SessionStart shape; superpowers has NO compact skill (HONEST-NON-FINDING confirmed).

## Q1 — SOTA AUTO-COMPACT METHOD (canonical PreCompact / SessionStart hook shape)

Q1 finding: the canonical method is STRATEGIC (phase-boundary) compaction + a 4-layer PreCompact
preservation stack + env-driven threshold tuning. The runtime already implements all of it.

A. Canonical SOTA recipe — ECC `strategic-compact` SKILL.md (the primary cite source):
`Z:/repos/deps/everything-claude-code/skills/strategic-compact/SKILL.md:1-150 @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a`
- Verbatim "Why Strategic Compaction": "Auto-compaction triggers at arbitrary points... often mid-task,
  losing important context. Strategic compaction at logical boundaries: After exploration, before
  execution / After completing a milestone / Before major context shifts."
- Mechanism: `suggest-compact.js` PreToolUse Edit|Write hook — tool-call counter, suggests at
  `COMPACT_THRESHOLD` (default 50), reminds every 25 after. Cite: `scripts/hooks/suggest-compact.js`.
- Compaction Decision Guide table (Research->Planning=Yes / Mid-implementation=No / After-failed-approach=Yes).
- ALSO INSTALLED in runtime: `.claude/plugins/cache/everything-claude-code/.../skills/strategic-compact/SKILL.md`

B. Canonical PreCompact hook shape — ECC `pre-compact.js` (the reference implementation):
`Z:/repos/deps/everything-claude-code/scripts/hooks/pre-compact.js:1-44 @ HEAD 841beea4`
- Shape: read stdin payload -> appendFile(compactionLog, "[timestamp] Context compaction triggered")
  -> annotate active `*-session.tmp` file with compaction marker -> process.exit(0) (advisory, non-blocking).
- Anthropic CC contract: PreCompact {"decision":"block"} OR exit 2 BLOCKS compaction (reserve for hard-block).

C. Runtime's PreCompact 4-layer stack (ALL WIRED, verified `.claude/settings.json:501-510` + runtime rule):
| Layer | Plugin / script | Surface | LOC | Status |
|---|---|---|---|---|
| Prompt-augmentation | intelligent-compact `precompact_priorities.sh` | 6-section A-F priority injection | 71 | WIRED (PreCompact matcher=="*") |
| State-save audit | ECC `pre-compact.js` | compaction-log.txt timestamp | 44 | INSTALLED (ECC plugin) |
| Session-event SQLite | context-mode `precompact.mjs` | <2KB XML resume-snapshot | 76 | INSTALLED (context-mode plugin) |
| Tool-call threshold | ECC `suggest-compact.js` | `/compact` suggestion N=50/+25 | 80 | INSTALLED (ECC plugin) |
| Hintless-block guard | runtime `precompact_guard.py` | blocks hintless auto-compact <80% | 78 | WIRED-class (cite: precompact_guard.py:1-90) |
| Pre-compact handoff emitter | runtime `precompact_hint_emitter.py` | compact_hint.json sidecar emit | — | INSTALLED (cite: precompact_hint_emitter.py:1-50) |
Cite: `Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md` section "Rank #3.5 — PreCompact hook layer"

D. Canonical SessionStart hook shape — TWO converging SOTA patterns:
1. ECC `session-start.js` — HISTORICAL-REFERENCE-ONLY guard pattern. DeepWiki verbatim: "Wraps prior
   session summaries in a 'HISTORICAL REFERENCE ONLY' guard to prevent the model from re-executing stale
   skill invocations or arguments from before compaction." Cite: `scripts/hooks/session-start.js:1-55`
   (`DEFAULT_SESSION_START_CONTEXT_MAX_CHARS = 8000` bound; 7-day session-file detection).
2. superpowers `session-start` — bootstrap-injection into FIRST USER MESSAGE (not system message)
   for token-bloat avoidance. Cite: `Z:/repos/deps/superpowers/hooks/session-start:1-60 @ HEAD
   f2cbfbefebbfef77321e4c9abc9e949826bea9d7`. Emits `hookSpecificOutput.additionalContext` for Claude
   Code, `additional_context` for Cursor — platform-detected.

E. Threshold-tuning — CCBP env vars (the canonical knobs):
`Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826,851,967-969 @ HEAD 48f2ceb`:
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (1-100; default ~95%; set lower to trigger earlier) — L826
- `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (token capacity for compaction calc; "use lower value e.g. 500000 on a
  1M model to treat it as 500K for compaction") — L967 <- directly relevant to runtime's 1M-context drift
- `CLAUDE_CODE_DISABLE_1M_CONTEXT` / `DISABLE_AUTO_COMPACT` / `DISABLE_COMPACT` — L851,968,969
- CCBP L725 verbatim tip: "Use /compact at ~50% context" (the canonical pre-emptive threshold)

F. The Anthropic native context-window status payload (the data the runtime's hooks consume):
`claude-settings.md:673-677 @ 48f2ceb` — `context_window.used_percentage` / `.remaining_percentage` /
`.context_window_size` (200000 default, 1000000 extended) / `.current_usage`. The runtime's
`userpromptsubmit_compact_threshold.py` + gsd's `gsd-context-monitor.js` both read this payload.

## Q2 — POST-COMPACT NEW-SESSION PRELOAD (% survival + SOTA preload practice)

Q2 finding: there is NO fixed % — compaction is SELECTIVE not proportional. The canonical "what
survives" enumeration is a DISCRETE LIST (ECC strategic-compact SKILL.md). SOTA preload = the
SessionStart matcher=="compact" rehydrate hook + Karpathy 3-layer wiki + HISTORICAL-REFERENCE guard.

A. CANONICAL "What Survives Compaction" — ECC `strategic-compact` SKILL.md (verbatim, the Q2 answer):
`Z:/repos/deps/everything-claude-code/skills/strategic-compact/SKILL.md:~95-105 @ HEAD 841beea4`:
| PERSISTS | LOST |
|---|---|
| CLAUDE.md instructions | Intermediate reasoning and analysis |
| TodoWrite task list | File contents you previously read |
| Memory files (`~/.claude/memory/`) | Multi-step conversation context |
| Git state (commits, branches) | Tool call history and counts |
| Files on disk | Nuanced user preferences stated verbally |

DeepWiki ECC corroboration (verbatim): "Across compaction, CLAUDE.md instructions, TodoWrite task lists,
memory files, and git state persist, while intermediate reasoning, file contents previously read, and tool
call history are lost." -> There is no "% survives" — survival is categorical, not proportional.

B. The ~50k empirical anchor (learn-claude-code educational reference):
DeepWiki `shareAI-lab/learn-claude-code` (60.3k stars MIT, HEAD probed via search 2026-05-14): teaches a
3-layer compression strategy — Micro-compact (Layer 1: replace old tool_result with `[Previous: used
bash]` placeholders), Auto-compact (Layer 2: triggered ~50,000 tokens, save transcript + LLM-summarize +
replace history), Manual Compact (Layer 3: explicit `compact` tool). This is the EDUCATIONAL reference
model — the real Claude Code threshold is ~95% per CCBP L826, NOT 50k. learn-claude-code is
educational-only (no installable components) — cite-class reference for the COMPRESSION-LAYER mental model.

C. SOTA preload practice — the runtime ALREADY implements the canonical pattern:
Runtime `sessionstart_compact_hint_reader.py:1-45` (verified) — fires ONLY on SessionStart
matcher=="compact" (post-auto-compact rehydrate boundary per Anthropic CC hooks contract), emits 4 sections
via `hookSpecificOutput.additionalContext`, bounded <=9500 chars (10K cap safety margin):
- (a) `compact_hint.json` (fresh <=300s) — pre-compact handoff content
- (b) `MEMORY.md` head 3K chars — Karpathy section 5 Layer-2 index
- (c) last-3 close-syntheses by mtime — Karpathy section 5 Layer-3 compiled wiki
- (d) `git log -5 --oneline` — Layer-1 chronological proxy
This IS the SOTA shape. Cite: runtime rule `sessionstart-preload-discipline.md` section "The contract".

D. SOTA preload anti-pattern guard — the HISTORICAL-REFERENCE-ONLY wrapper:
ECC `session-start.js` (DeepWiki-verified) wraps prior summaries in a "HISTORICAL REFERENCE ONLY" guard so
the model does NOT re-execute stale skill invocations from before compaction. This is the FM-21
queue-time-prompt-freeze defense at the preload layer — the runtime should confirm its
`sessionstart_compact_hint_reader.py` applies an equivalent stale-belief guard (cite:
`fm20-path-drift-cascade.md` + `fm21-queue-time-prompt-freeze.md` are the runtime's analog rules).

E. CLAUDE.md loading semantics (the always-loaded preload baseline):
`Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:36-95 @ HEAD 48f2ceb`:
- Ancestor CLAUDE.md files load IMMEDIATELY at startup (walk UP the tree). Descendant = lazy. Siblings never.
- `~/.claude/CLAUDE.md` (global) applies to ALL sessions. <- This is the always-survives preload floor;
  it's why CLAUDE.md + CLAUDE.local.md are the runtime's bootstrap preload (cardinal-rule-5).

F. Karpathy 3-layer wiki = the SOTA cross-session compounding-preload model:
Runtime `auto-compact-discipline.md` section "Rank #5" — Layer-1 chronological (`.claude/state/*.jsonl`),
Layer-2 index (`MEMORY.md` <=200 lines / 150-char pointers), Layer-3 compiled wiki
(`docs/karpathy-llm-wiki-practice.md` + `.claude/rules/*.md`). The runtime's MEMORY.md is the operational
Layer-2 — actively maintained (last reset W180 F5).

## 15-REPO PROBE-DAG + CONVERGENCE VERDICT TABLE

Probe DAG: P1 count-OVER / P2 SDK-vs-CLI / P3 architectural-API / P4 plugin-namespace /
P5 mode-harness-shape / P6 direct-file-blockers (license/registry) / P7 demand-gate.
Convergence Axis: A1 >=3 distinct orgs / A2 >=2 named-T2 / A3 >=3mo stability.
Verdict scoped to THIS runtime's hook/compact/preload gap.

### VERDICT SUMMARY TABLE

| # | Repo | License | stars | P-DAG critical fails | A1 >=3org | Verdict (compact/preload gap) |
|---|---|---|---|---|---|---|
| 1 | wshobson/agents | MIT-likely | 80-plugin | P4 partial | format-level | STUDY-PILOT (`context-management` plugin only) |
| 2 | abhigyanpatwari/GitNexus | NOASSERTION | 38.2k | P2 (browser!=CLI) | single-org | REJECT-FOR-COMPACT-GAP (code-intel, not compact; CLI already installed) |
| 3 | quemsah/awesome-claude-plugins | none | 690 | catalog | single-org | CITE-ONLY (discovery surface) |
| 4 | Shubhamsaboo/awesome-llm-apps | Apache-2.0 | 110.2k | P3+P5+P7.a | single-org | REJECT-FOR-FIT (LLM-app gallery, architectural mismatch) |
| 5 | forrestchang/andrej-karpathy-skills | MIT(README) | — | none | named-author | ALREADY-CITED-RATIFY (Karpathy section 5 = preload model) |
| 6 | mattpocock/skills | MIT(README) | — | P5 HARD-GATE + P7.a | single-org | REJECT-FOR-FIT (no compact skill; setup HARD-GATE) |
| 7 | hesreallyhim/awesome-claude-code | CC-BY-NC-ND | 43.6k | catalog | single-org | CITE-ONLY (discovery surface) |
| 8 | alirezarezvani/claude-skills | MIT | 14.7k | P7 demand-not-verified | single-org | STUDY-PILOT (general skills; no compact skill confirmed) |
| 9 | gsd-build/get-shit-done | MIT-likely | 11.4k | none — P7.b PASS | pattern-level | STUDY-PILOT (star) (`gsd-context-monitor.js` — strongest hook-gap candidate) |
| 10 | vercel-labs/agent-skills | Vercel-org | — | P7.a | Vercel-org | REJECT-FOR-COMPACT-GAP (frontend skills; already DORMANT) |
| 11 | affaan-m/everything-claude-code | (installed) | — | P4: suggest-compact DISABLED | pattern-level | ALREADY-INSTALLED-RATIFY (star) (canonical Q1/Q2 source; re-enable check needed) |
| 12 | shanraisshan/claude-code-best-practice | (cite-class) | — | none | independent-3rd-party | ALREADY-CITED-RATIFY (Q1/Q2 env-var authority; pin-bump avail) |
| 13 | vinta/awesome-python | NOASSERTION | 297.5k | catalog | single-org | CITE-ONLY (Python discovery surface) |
| 14 | shareAI-lab/learn-claude-code | MIT | 60.3k | P2+P5 educational-only | org | CITE-CLASS-CANONICAL (CR-12 class 6; compaction mental-model ref) |
| 15 | ComposioHQ/awesome-claude-skills | conflict | 59.7k | P6 license-blocker | org | CITE-ONLY (discovery surface; license-conflicted) |

ADOPT-NOW: 0 (no repo passes >=3-distinct-org Axis-1 AS A DIRECT INSTALL for the specific gap — all
hook-relevant candidates are single-org -> STUDY-PILOT ceiling per convergence-gate).
STUDY-PILOT: 3 (gsd star / wshobson context-management / alirezarezvani general-skills).
ALREADY-INSTALLED/CITED-RATIFY: 4 (ECC star / CCBP / Karpathy / — these are the existing compact/preload backbone).
REJECT/CITE-ONLY: 8 (4 awesome-lists discovery-only + Shubhamsaboo + mattpocock + vercel-labs + GitNexus-for-this-gap).

### Per-repo detail highlights

9. gsd-build/get-shit-done — Local clone HEAD `3aaed8f5d7c3492678b867e6687d42c88fe227e5` (last commit
   2026-05-09). `gsd-context-monitor.js` is a pure PostToolUse hook reading the Anthropic native
   `context_window` payload + a statusline bridge file. Runtime-agnostic by design (verbatim source
   comment: "Using __dirname makes this work on Claude Code, OpenCode, Gemini, Kilo, etc."), advisory-only
   (`additionalContext` warnings at 35%/25%-remaining, never imperative), silent-fail (never blocks tool
   exec), debounced 5-calls with severity-escalation bypass, auto-records state breadcrumb on CRITICAL.
   Probe 7.b 5-clause check PASS — the runtime has PreCompact + SessionStart + UserPromptSubmit-threshold
   hooks but NO PostToolUse continuous context-monitor. STRONGEST hook-gap candidate this fire.

11. affaan-m/everything-claude-code — ECC IS INSTALLED (`enabledPlugins` true; plugin cache at
   `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`). GAP FOUND:
   `ECC_DISABLED_HOOKS` in `.claude/settings.json:8` lists `pre:edit-write:suggest-compact` as DISABLED —
   the strategic-compact PreToolUse counter hook is OFF. Recommendation: verify whether
   `userpromptsubmit_compact_threshold.py` is the intentional replacement before re-enable.

## RECOMMENDATIONS FOR THE ORCHESTRATOR (hook/compact/preload gap closure)

1. PRIMARY (STUDY-PILOT, cite-adapt): `gsd-context-monitor.js` — cite-adapt as the runtime's missing
   PostToolUse continuous context-monitor layer. MIT-likely, runtime-agnostic, advisory-only, silent-fail,
   debounced. Cite: `Z:/repos/deps/get-shit-done/hooks/gsd-context-monitor.js @ HEAD 3aaed8f5d7c3492678b867e6687d42c88fe227e5`.
   Cross-model T1 verification REQUIRED per SRA mandate.
2. VERIFY-AND-ACT (ALREADY-INSTALLED): ECC `suggest-compact` hook is DISABLED in
   `.claude/settings.json:8` `ECC_DISABLED_HOOKS`. Determine if `userpromptsubmit_compact_threshold.py`
   is the intentional replacement; if not, re-enable. Cite ECC `strategic-compact/SKILL.md` verbatim as
   the Q1+Q2 authority in any compact-rule edits.
3. TUNING (not new install): the operator's "rot / low quality context" complaint maps to FM-20 row 18
   (env-codified-not-sourced) — already partly addressed by W187 round-2 (350k->700k CRIT). Confirm
   `CONTEXT_WINDOW_COMPACT_*` settings.json env + CLAUDE.local.md ENV(j) + script defaults are all
   aligned at 600k/650k/700k. Consider CCBP `CLAUDE_CODE_AUTO_COMPACT_WINDOW` (treat 1M as 500k for
   compaction calc) per `claude-settings.md:967`.
4. CITE-PIN REFRESH: W187 Agent A flags CCBP `48f2ceb` -> `f8468e87` available — evaluate the pin bump.
5. DO NOT INSTALL: the 4 awesome-lists (quemsah / hesreallyhim / vinta / ComposioHQ) + Shubhamsaboo +
   mattpocock + vercel-labs for this gap — none are compact/preload primitives. learn-claude-code is
   educational-only (CITE-CLASS-CANONICAL per CR-12 class 6).

## METHODOLOGY NOTES + HONEST-NON-FINDINGS

- Discovery breadth (>=4 families): SATISFIED — GitHub MCP + DeepWiki MCP + local deps clones + runtime
  introspection. Exa MCP + context-mode MCP were NOT available in this subagent runtime (HONEST-NON-FINDING).
- HONEST-NON-FINDING #1: superpowers has NO compact/context-compaction skill (DeepWiki + local `ls` confirmed).
  Its `session-start` hook bootstrap-injection IS a SOTA preload pattern.
- HONEST-NON-FINDING #2: mattpocock/skills has NO context-management category (verified local `ls`).
- HONEST-NON-FINDING #3: the runtime is NOT missing compact/preload PRIMITIVES — it has 6+ compact-class
  hooks + 2 dedicated rules + a 4-layer PreCompact stack. The gap is (a) a PostToolUse continuous monitor
  (gsd fills it) and (b) threshold calibration (already being fixed W187).
- Convergence-gate >=3-distinct-org reality: every hook-relevant candidate (gsd / wshobson / ECC) is
  single-org -> none qualify for ADOPT-NOW as a direct install. The PATTERNS converge (3-source
  pattern-level), which supports STUDY-PILOT + cite-adapt, not wholesale install.
- Cross-model T1 mandate: any STUDY-PILOT that becomes an install decision MUST be cross-model-verified
  via REAL GPT-5.5 codex T1 before commit.

ARTIFACT-INLINE: end of report.
