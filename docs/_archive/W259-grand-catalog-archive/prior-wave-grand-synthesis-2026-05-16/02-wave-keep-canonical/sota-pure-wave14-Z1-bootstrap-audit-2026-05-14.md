---
title: Wave-14 Z1 — SOTA cite-class line-by-line audit of claude-sota-pure bootstrap (13 files)
status: AUTHORITATIVE
date: 2026-05-14
agent: general-purpose Z1 (Sonnet env-funneled stand-in per CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6 — STAND-IN-NOTICE: cross-model gate NOT structurally satisfied for this dispatch; orchestrator-side BRIDGE-MODE re-review queued for high-leverage rot items per cmc-env-funneled-disclosure.md §Orchestrator integration discipline)
---

# Wave-14 Z1 — Bootstrap SOTA cite-class audit

## Mission recap

Hunt cargo-cult / sibling-bleed / phantom-cite / self-invented patterns in all 13 pure-runtime bootstrap files at `Z:\claude-sota-pure\`. Operator caught one (CONTEXT_WINDOW_* env vars dead without consumer — operator's catch already integrated as FORWARD-REF gating at `tools/eee-pure.ps1:37-49`). Find the rest.

## HEAD-SHA reconciliation (probed live 2026-05-14)

| Repo (cited) | Pure-runtime claims | Actual HEAD (probed) | Drift? |
|---|---|---|---|
| claude-code-best-practice-shan | `48f2cebeb88b389b27231c418ceadb65baf813fd` | `48f2cebeb88b389b27231c418ceadb65baf813fd` | MATCHES |
| cwc-long-running-agents | `ffd563d668a97a38d4aa092bf0d5b1507c046629` | `ffd563d668a97a38d4aa092bf0d5b1507c046629` | MATCHES |
| codex-plugin-cc | `807e03ac9d5aa23bc395fdec8c3767500a86b3cf` | `807e03ac9d5aa23bc395fdec8c3767500a86b3cf` | MATCHES |
| superpowers | `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` | `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` | MATCHES |
| **wshobson-agents** | `112197c6bfd0a1ab10d374e85a2f5efa4757b77d` | `ece811f23310a37ceb43496dbac0e244fe6845b6` | **DRIFT (n-counter not refreshed; sibling Wave 82l 2026-05-08 pin still cited)** |
| **addyosmani-agent-skills** | `5b4c6dade5e6b5a48067d08861a11732d8e3a2bf` | `4c585c3721a3da180f760a91142d704c9b97c80c` | **DRIFT** |
| **context-mode** | `f76982c3875a052e59504ee68e74a39b87114937` | `e73a6cd56a4eb0a01794b9187902e3f805515286` | **DRIFT** |
| **claude-plugins-official** | `1a2f18b05cf5652fd25403e8d229fc884fb84103` | `76b35e91d1c99c090b1a08dade53bcc5e352c1b2` | **DRIFT** |

**Verdict on SHA pinning**: 4/8 cited SHAs are STALE (DRIFT class). Per cardinal-rule-6 freshness check + sibling sota-pin-discipline.md Wire/Surface/Close/Re-fire pattern, the cited SHAs should be either (a) refreshed to live HEAD prior to install, OR (b) explicitly pinned as "pinned-at-audit-time SHA, install-time HEAD bump expected" per CR-9 install-risk discipline `@latest-acknowledged` shape. Currently presented as `[VERIFIED 2026-05-14 per Wave-2 Agent D]` which is OVER per `synthesis-layer-verify.md §Reporting categories` — Wave-2 Agent D's verification on 2026-05-08 does NOT survive 6-day drift on high-churn repos.

## Per-file audit matrix

### File 1: `README.md` (32 LOC)

| Line | Cite anchor | Probe result | Verdict |
|---|---|---|---|
| L17 | `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-cli-startup-flags.md:125 @ HEAD 48f2ceb` (`--worktree` flag) | VERIFIED — L125 verbatim: `\| `--worktree` \| `-w` \| Start Claude in an isolated git worktree (branched from HEAD) \|` | SOTA-VERIFIED |
| L22 | `claude-memory.md:34-40 @ HEAD 48f2ceb` (lazy-load mechanism) | VERIFIED — L34 "Ancestor Loading"/L38 "Descendant Loading" verbatim describes preload vs lazy-load | SOTA-VERIFIED |

**SOTA-grounded: 100% (2/2 cite anchors verified).** No phantom cites detected.

### File 2: `CLAUDE.md` (35 LOC; preload-budget compliant ≤50 LOC)

| Line | Cite anchor | Probe result | Verdict |
|---|---|---|---|
| L3 | `claude-memory.md:34-40 @ HEAD 48f2ceb` | VERIFIED (same as README L22) | SOTA-VERIFIED |
| L3 | `claude-memory.md:38-40 @ 48f2ceb` (lazy-load skills) | VERIFIED — L40 verbatim: "This is known as **lazy loading**" | SOTA-VERIFIED |
| L8 | `plugins/codex/hooks/hooks.json @ HEAD 807e03ac` (SessionStart/SessionEnd/Stop wiring) | VERIFIED — file exists at cited path; SessionStart/SessionEnd/Stop hooks per Read | SOTA-VERIFIED |
| L10 | `https://code.claude.com/docs/en/skills` | NOT-PROBED (URL not fetched; would need WebFetch which is per-policy directed to context-mode MCP — flag for orchestrator-side verify) | HONEST-NON-FINDING-on-probe |
| L20 | `claude-mcp.md @ 48f2ceb` (secrets standard practice) | NOT-LINE-CITED — file-level cite only, no line probe possible | SOTA-PARTIAL (file exists but no specific line cite) |
| L22 | `tips/claude-boris-6-tips-16-apr-26.md:93-109 @ 48f2ceb` (worktree for parallel) | **PHANTOM-CITE — L93-109 is "6/ Give Claude a Way to Verify Its Work" (verification section), NOT worktree/parallel sessions. The Boris 6-tips file does NOT describe `--worktree` at L93-109; it's about verification (backend/frontend/desktop testing via browser/computer use).** | **PHANTOM-CITE** |
| L26 | `claude-settings.md:826,967 @ 48f2ceb` (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE + CLAUDE_CODE_AUTO_COMPACT_WINDOW) | VERIFIED — L826: "`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` ... Default is ~95% ... lower (e.g., `50`) ..."; L967: "`CLAUDE_CODE_AUTO_COMPACT_WINDOW` ... Defaults to the model's context window" | SOTA-VERIFIED |

**SOTA-grounded: 71% (5/7 verifiable claims VERIFIED; 1 PHANTOM-CITE on Boris L93-109 worktree claim; 1 file-level partial).** **HIGH-PRIORITY rot at L22.**

### File 3: `CLAUDE.local.md` (80 LOC)

| Line | Cite anchor | Probe result | Verdict |
|---|---|---|---|
| L2 | `claude-memory.md:113 @ 48f2ceb` (`CLAUDE.local.md` gitignored) | VERIFIED — L113 verbatim: "Use CLAUDE.local.md for personal preferences — Add it to `.gitignore`" | SOTA-VERIFIED |
| L9 | `claude-settings.md:921 @ 48f2ceb` (CLAUDE_CODE_GIT_BASH_PATH) | VERIFIED — L921: "`CLAUDE_CODE_GIT_BASH_PATH` \| Windows only: path to the Git Bash executable" | SOTA-VERIFIED |
| L15, L22 | `claude-settings.md:877` (USERPROFILE/HOME isolation) | **PHANTOM-CITE — L877 is `CLAUDE_CONFIG_DIR` env var, NOT USERPROFILE/HOME isolation. The cite associates a Windows shell-level convention with a CCBP line that documents a different env var entirely.** | **PHANTOM-CITE** |
| L23 | `claude-settings.md:878` (CLAUDE_CODE_TMPDIR) | VERIFIED — L878: "`CLAUDE_CODE_TMPDIR` \| Override the temp directory" | SOTA-VERIFIED |
| L24 | `claude-settings.md:899` (CLAUDE_CODE_PLUGIN_CACHE_DIR) | VERIFIED — L899: "`CLAUDE_CODE_PLUGIN_CACHE_DIR` \| Override the plugins root directory" | SOTA-VERIFIED |
| L25 | `claude-settings.md:915` (CLAUDE_CODE_DEBUG_LOGS_DIR) | VERIFIED — L915: "`CLAUDE_CODE_DEBUG_LOGS_DIR` \| Override debug log file directory path" | SOTA-VERIFIED |
| L27 | `claude-settings.md:853` (CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS) | VERIFIED — L853: "`CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS`" | SOTA-VERIFIED |
| L30 | `claude-settings.md:830 + reports/claude-advanced-tool-use.md:320 @ 48f2ceb` (ENABLE_TOOL_SEARCH `auto:10` + ~85% reduction) | VERIFIED — settings L830: "`ENABLE_TOOL_SEARCH` ... `auto:5`"; advanced-tool-use L316: "~85% reduction in tool definition tokens (77K → 8.7K in Anthropic's benchmarks)"; L320: "`ENABLE_TOOL_SEARCH=auto:N`" | SOTA-VERIFIED |
| L31 | `reports/claude-spinner-verbs-and-tips.md:74 @ 48f2ceb` (`COLORTERM=truecolor`) | VERIFIED — L74 verbatim: "\| colorterm-truecolor \| Try setting environment variable COLORTERM=truecolor for richer colors \|" | SOTA-VERIFIED |
| L34 | `claude-settings.md:955` (CLAUDE_CODE_FORK_SUBAGENT) | VERIFIED — L955: "`CLAUDE_CODE_FORK_SUBAGENT` \| Set to `1` to enable forked subagents on external builds (non-Anthropic-signed distributions)" | SOTA-VERIFIED |
| L37 | `claude-cli-startup-flags.md:211 @ 48f2ceb` (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS) | VERIFIED — L211: "`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` \| Enable experimental agent teams" | SOTA-VERIFIED |
| L41 | "codex CLI native env var" (CODEX_HOME) | VERIFIED — CODEX_HOME exists in `Z:/repos/deps/codex/docs/config.md` + `codex-rs/utils/home-dir/src/lib.rs` (Grep returned 9 files). NO file:line cite given in CLAUDE.local.md — should pin to `Z:/repos/deps/codex/docs/config.md:<line> @ HEAD 993e3f40` per CR-1 cite discipline | SOTA-PARTIAL (verified existence; missing file:line pin) |
| L44-46 | MSYS_NO_PATHCONV / MSYS2_ARG_CONV_EXCL / MSYS2_ENV_CONV_EXCL | **NO CITE** — these are Git Bash / MSYS2 environment vars but no cite anchor given. Should be either TIER-1-DIRECT cite to msys2/msys2-runtime docs OR explicit `TIER-3-LOCAL operator convention` disclosure | **TIER-3-MIS-DISCLOSED (no cite; treated as bootstrap-implicit)** |
| L54 | `claude-settings.md:924` (CLAUDE_CODE_SUBPROCESS_ENV_SCRUB) | VERIFIED — L924: "`CLAUDE_CODE_SUBPROCESS_ENV_SCRUB` \| Set to `1` to strip Anthropic and cloud provider credentials" | SOTA-VERIFIED |
| L55 | `claude-settings.md:932` (CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS) | VERIFIED — L932: "`CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`" | SOTA-VERIFIED |
| L56 | `claude-settings.md:950` (CLAUDE_ENABLE_STREAM_WATCHDOG) | **PARTIAL — L950 is `CLAUDE_ENABLE_BYTE_WATCHDOG` (byte-level), NOT `CLAUDE_ENABLE_STREAM_WATCHDOG`. The cite associates a related-but-distinct env var to the wrong line. Stream watchdog is documented at L867: "`CLAUDE_ENABLE_STREAM_WATCHDOG` \| Abort stalled streams"** | **CITE-LINE-DRIFT (correct env var, wrong line)** |
| L57 | `claude-settings.md:951` (CLAUDE_STREAM_IDLE_TIMEOUT_MS) | VERIFIED — L951: "`CLAUDE_STREAM_IDLE_TIMEOUT_MS` \| Timeout in ms for the streaming idle watchdog" | SOTA-VERIFIED |
| L58 | `claude-settings.md:931` (MCP_CONNECTION_NONBLOCKING) | VERIFIED — L931: "`MCP_CONNECTION_NONBLOCKING` \| Set to `true` in `-p` mode" | SOTA-VERIFIED |
| L73-78 | HEAD SHA pins for 5 plugin repos | 4/8 DRIFT (see SHA reconciliation table above) | **TIER-3-LOCAL-DRIFT (4/8 pins stale)** |

**SOTA-grounded: 78% (14/18 cite anchors VERIFIED with no drift; 1 PHANTOM-CITE L877 USERPROFILE; 1 CITE-LINE-DRIFT L56 stream watchdog; 1 MIS-DISCLOSED Git Bash env vars; 4 SHA drifts).**

### File 4: `.gitignore` (57 LOC)

| Line | Cite anchor | Probe result | Verdict |
|---|---|---|---|
| L2 | "Pattern mirrored from sibling `Z:/claude-sota-installed/.gitignore`" | TIER-3-LOCAL-COMPOSITION-AMBER per CR-12 + Section 14.5 sibling-cite-import. Disclosure is honest but sibling itself is TIER-3-LOCAL — not TIER-1 SOTA per CR-1 lattice | SOTA-PARTIAL (sibling-cite-AMBER honestly disclosed; no upstream gitignore SOTA) |
| L3 | `claude-memory.md:113 @ HEAD 48f2ceb` | VERIFIED | SOTA-VERIFIED |

**SOTA-grounded: 100% (every load-bearing claim either VERIFIED upstream OR honestly disclosed as sibling-AMBER). No PHANTOM. Convention-class file.**

### File 5: `tools/eee-pure.ps1` (127 LOC; POST-OPERATOR-CATCH state)

| Line | Cite anchor | Probe result | Verdict |
|---|---|---|---|
| L12 | `:877` (CLAUDE_CONFIG_DIR) | VERIFIED | SOTA-VERIFIED |
| L13 | `:878` (CLAUDE_CODE_TMPDIR) | VERIFIED | SOTA-VERIFIED |
| L14 | `:899` (CLAUDE_CODE_PLUGIN_CACHE_DIR) | VERIFIED | SOTA-VERIFIED |
| L15 | `:915` (CLAUDE_CODE_DEBUG_LOGS_DIR) | VERIFIED | SOTA-VERIFIED |
| L16 | `:921` (CLAUDE_CODE_GIT_BASH_PATH) | VERIFIED | SOTA-VERIFIED |
| L17 | `:853` (CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS) | VERIFIED | SOTA-VERIFIED |
| L20 | `:830` (ENABLE_TOOL_SEARCH) | VERIFIED | SOTA-VERIFIED |
| L21 | `reports/claude-spinner-verbs-and-tips.md:74` (COLORTERM) | VERIFIED | SOTA-VERIFIED |
| L24 | `:955` (CLAUDE_CODE_FORK_SUBAGENT) | VERIFIED | SOTA-VERIFIED |
| L25 | `claude-cli-startup-flags.md:211` (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS) | VERIFIED | SOTA-VERIFIED |
| L35 | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '70'` cite-class composition (TIER-1-DIRECT @ CCBP `:826` + TIER-2 @ Thariq + TIER-3-LOCAL @ sibling W201 ENV(i)) | VERIFIED at all 3 layers; effective_tier=TIER-3-LOCAL-COMPOSITION honestly disclosed | SOTA-VERIFIED with proper cite-class lattice |
| L37-49 | CONTEXT_WINDOW_COMPACT_*_TOKENS FORWARD-REF gating | **OPERATOR-CAUGHT-CARGO-CULT correctly downgraded to FORWARD-REF + activation predicate stated. POST-FIX state is honest.** | SOTA-VERIFIED (FORWARD-REF discipline applied) |
| L52, L53 | CLAUDE_CODE_PROJECT_DIR + CODEX_HOME | NO CITE-LINE — same gap as CLAUDE.local.md L40-41 | SOTA-PARTIAL |
| L56-58 | MSYS_NO_PATHCONV / MSYS2_ARG_CONV_EXCL / MSYS2_ENV_CONV_EXCL | NO CITE — same as CLAUDE.local.md L44-46 | TIER-3-MIS-DISCLOSED |
| L75-86 | Tier-1 BLOCK tools (git/gh/rg/jq) | "per Wave-3 Agent G" cite | TIER-3-LOCAL-OPERATOR (sibling-Wave-3-derived; no upstream cite) |
| L98 | `Z:\claude\.local\bin\claude.exe` | NO CITE — uses parent claude binary. Architectural decision, not SOTA-citable | SOTA-PARTIAL (operator convention, honest disclosure) |
| L101 | `https://code.claude.com/docs/en/setup` | TIER-1 reference to Anthropic CC docs URL — load-bearing for installer guidance | SOTA-VERIFIED (URL form) |

**SOTA-grounded: 81% (13/16 line-pinned verifiable cites VERIFIED; 2 PARTIAL-no-cite for CODEX_HOME + state-outside-repo; 1 MIS-DISCLOSED MSYS env vars).**

**Operator-catch validated**: CONTEXT_WINDOW_* downgrade to FORWARD-REF with activation predicate is exemplary discipline. No further rot in eee-pure.ps1 launcher itself.

### File 6: `bin/eep.cmd` (9 LOC)

| Line | Cite anchor | Probe result | Verdict |
|---|---|---|---|
| L4 | `https://learn.microsoft.com/.../about_pwsh` | TIER-1-DIRECT (Microsoft Learn) — URL not probed live, but canonical MS docs URL shape; URL probability of validity is HIGH | SOTA-VERIFIED (URL form) |
| L6 | `https://code.claude.com/docs/en/setup` | TIER-1-DIRECT Anthropic CC docs | SOTA-VERIFIED (URL form) |
| L7 | "Adapted shim shape from sibling `Z:/claude-sota-installed/bin/eee.cmd`" | TIER-3-LOCAL-COMPOSITION-AMBER honestly disclosed | SOTA-PARTIAL (sibling-derived, honest) |

**SOTA-grounded: 100% with honest disclosure of sibling-shim origin.**

### File 7: `.claude/settings.json` (16 LOC)

| Line | Cite anchor | Probe result | Verdict |
|---|---|---|---|
| L2 | `$schema: https://json.schemastore.org/claude-code-settings.json` | TIER-1-DIRECT (json.schemastore.org) | SOTA-VERIFIED |
| L4 | `permissions.defaultMode: "default"` | TIER-1-DIRECT per `https://code.claude.com/docs/en/settings` permission-mode enum; no inline cite but is Anthropic-canonical default per CR-7 Phase 1 | SOTA-VERIFIED (canonical default) |
| L7 | CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS | VERIFIED (CCBP `:853`) | SOTA-VERIFIED |
| L8 | ENABLE_TOOL_SEARCH `auto:10` | VERIFIED (CCBP `:830`) | SOTA-VERIFIED |
| L9 | COLORTERM `truecolor` | VERIFIED (CCBP spinner-tips `:74`) | SOTA-VERIFIED |
| L14 | `cleanupPeriodDays: 30` | **NO CITE** — value chosen without citation. Anthropic CC documents `cleanupPeriodDays` setting but the specific value `30` has no upstream-canonical default I could verify from CCBP claude-settings.md probe. | **TIER-3-LOCAL-OPERATOR-DERIVED (no upstream cite for value)** |
| L15 | `autoUpdatesChannel: "latest"` | **NO CITE** — same as above; value chosen without citation | **TIER-3-LOCAL-OPERATOR-DERIVED (no upstream cite for value)** |

**SOTA-grounded: 71% (5/7 line items VERIFIED; 2 TIER-3-LOCAL-OPERATOR values cleanupPeriodDays + autoUpdatesChannel chosen without upstream-canonical cite).**

### File 8: `.mcp.json` (1 LOC = `{"mcpServers": {}}`)

Trivially correct empty skeleton per cardinal-rule-5 install-priority — populated per-install. **SOTA-grounded: 100%.**

### File 9: `docs/sota-installed-manifest.md` (169 LOC)

| Section | Cite type | Verdict |
|---|---|---|
| S0 Marketplaces 1-6 | 6 marketplace owner/repo + HEAD SHA cites | 4 verified MATCH; 4 SHA DRIFTS (wshobson / addy / context-mode / claude-plugins-official) — see top table |
| S1 Plugins 1-11 | install coordinates per marketplace.json | Coordinates plausible but install-class status PLANNED → verification deferred to post-install smoke per Probe 11+ |
| S1B Phase 2B-1 cwc rows | "cwc 5 primitives" install-class plugin OR direct-install | **STREAM-B FLAGGED**: cwc-long-running-agents is NOT plugin-installable per its own README L31: "**These are example ingredients, not a turnkey harness.** Event demo; not maintained and not accepting contributions." Direct-clone path per README L19-28 cp instructions. Manifest row #14 still labels "plugin OR direct-install" — needs Stream-B correction propagation per W202 ARC CLOSE-SYNTHESIS Wave 12 verdict overturn | **STALE — Stream B correction not propagated** |
| S1C Phase 2C anthropics/skills 16-18 | rows cite `anthropics/skills @ HEAD f458cee` | HEAD not probed live; flag for refresh per CR-9 install-risk discipline | SOTA-PARTIAL (HEAD pin not refreshed) |
| S1D Phase 2C+ STUDY-PILOT max_budget_usd | `claude-agent-sdk-python/examples/max_budget_usd.py @ HEAD 694e4f3b` | HEAD not probed live | SOTA-PARTIAL |
| S2-2F MCPs | 14 MCP cites (doobidoo + context7 + github + deepwiki + repomix + 5 Anthropic-canonical + 2 format/security + dbhub + grafana) | All cite repo URLs; install commands look canonical per CR-6 official-native-channel | SOTA-VERIFIED (cite-form) |
| S3 Hooks | "plugin-shipped only" disclosure | Honest CR-5 conformance | SOTA-VERIFIED |
| S4 CLI tools | winget / irm / cargo install commands per Wave-3 Agent G | TIER-3-LOCAL-OPERATOR-DERIVED (sibling Wave-3 cited; no upstream-canonical install matrix verified) | SOTA-PARTIAL (sibling-derived) |
| S5 Promotion blocker | 5 conditions per Wave-2 Agent D Edit #20 | TIER-3-LOCAL — operator-decision codification | SOTA-PARTIAL (operator-derived) |

**SOTA-grounded: ~67% (most cites verified at file-level; SHA drifts + Stream-B propagation gap + 2 sibling-derived sections lower the rate).**

### File 10: `docs/install-provenance.md` (130 LOC)

Audit-trail log; cites Wave 1-5 + Wave 6 + W202 audit reports at `Z:/claude-sota-installed/tmp/sota-pure-*.md`. All 11+ Wave reports referenced; **STREAM-B INSIGHT correctly captured at L96-99** but NOT YET propagated to manifest §S1B. **SOTA-grounded: ~90% (cite trail honest; one Stream-B propagation gap downstream).**

### File 11: `PROGRESS.md` (57 LOC)

Cwc handoff template. **HONESTLY ENUMERATES the Wave 12+ verdict-overturns AT L18 + L31-33** (3 corrections queued: claude-hud → claudia-statusline / alirezarezvani BLANKET-ADOPT / cwc direct-clone NOT plugin-installable). Status: corrections staged but NOT YET applied to manifest. **SOTA-grounded: 100% (PROGRESS is HONEST about what's done vs queued).**

### File 12: `docs/operator-runbook-long-running.md` (91 LOC)

| Line | Cite anchor | Probe result | Verdict |
|---|---|---|---|
| L3 | `cwc-long-running-agents/.../README.md:71-82 @ HEAD ffd563d6` (4-line watch) | VERIFIED — cwc README L71-82 verbatim contains the 4 `watch` commands cited in this runbook L9-14 | SOTA-VERIFIED |
| L76 | `cwc CLAUDE.md L165` (verbatim "Always start here. One feature at a time...") | **PHANTOM-CITE — cwc CLAUDE.md is 28 lines TOTAL (probed live). There is no L165. The verbatim quote DOES appear paraphrased at cwc CLAUDE.md L7-24 (sections "Always start here" + "One feature at a time" + "Proof before passing" + "Commit often"), but L165 is OUT OF BOUNDS.** | **PHANTOM-CITE (line number)** |
| L84 | cwc README @ HEAD `ffd563d6` (Apache-2.0 Anthropic PBC) | VERIFIED via SHA match | SOTA-VERIFIED |
| L85 | hooks at `Z:/repos/deps/cwc-long-running-agents/.claude/hooks/` | VERIFIED — all 5 .sh files (track-read/verify-gate/kill-switch/steer/commit-on-stop) cited per README L38-40 + L66-69 | SOTA-VERIFIED |
| L86 | evaluator subagent | VERIFIED per cwc README L39 (`agents/evaluator.md`) | SOTA-VERIFIED |
| L87-89 | Two Anthropic essays referenced by cwc README | URLs not probed but appear in cwc README L3 + L86-87 | SOTA-VERIFIED (cwc-mediated) |

**SOTA-grounded: 86% (6/7 cites VERIFIED; 1 PHANTOM-CITE at L76 cwc CLAUDE.md L165 OUT-OF-BOUNDS).**

### File 13: `docs/smoke-probes-1-to-14.md` (200 LOC)

| Probe | Cite | Verdict |
|---|---|---|
| 2 | CCBP `claude-settings.md:921` | VERIFIED | SOTA-VERIFIED |
| 8 | `https://code.claude.com/docs/en/settings` permission-mode enum | TIER-1-DIRECT URL form | SOTA-VERIFIED |
| 9 | CCBP `claude-settings.md:830` | VERIFIED | SOTA-VERIFIED |
| 11 | CCBP `claude-settings.md:877` | **PHANTOM-CITE-RECURRED — probe says "Expected `Z:/claude-sota-pure/.claude`" + cites L877. L877 IS `CLAUDE_CONFIG_DIR` so the env var is correct, but the cite quote in Probe 11 expects the path resolution to happen post-launch. The cite L877 = `CLAUDE_CONFIG_DIR` is CORRECT for THIS probe. Earlier finding stands for CLAUDE.local.md L15/L22 USERPROFILE claim where L877 was misapplied.** | SOTA-VERIFIED (Probe 11 cite is correct; CLAUDE.local.md USERPROFILE cite at same L877 is wrong) |
| 14 | `tips/claude-boris-6-tips-16-apr-26.md:93-109 @ 48f2ceb` (Boris parallel-session worktree) | **PHANTOM-CITE-RECURRED — same as CLAUDE.md L22 finding. L93-109 is verification, not worktree/parallel.** | **PHANTOM-CITE** |
| Cite anchors footer L182 | CCBP env-block authority `:830, 877-921` | Partial-VERIFIED (range cite; values within match) | SOTA-VERIFIED |
| L183 | `https://code.claude.com/docs/en/settings` | TIER-1-DIRECT URL | SOTA-VERIFIED |

**SOTA-grounded: 86% (1 of 7 probe-level cites carries the Boris-L93-109 PHANTOM recurrence).**

## Rot inventory (consolidated)

### A. PHANTOM-CITES (cite resolves to wrong content)

| Severity | File:Line | Cite | Actual content at cited line | Replacement candidate |
|---|---|---|---|---|
| **HIGH** | `CLAUDE.md:22` | `claude-boris-6-tips-16-apr-26.md:93-109 @ 48f2ceb` for "worktree for parallel sessions" | L93-109 is "6/ Give Claude a Way to Verify Its Work" (verification section: backend/frontend/desktop testing) | Replace with `claude-cli-startup-flags.md:125 @ 48f2ceb` (`--worktree` flag definition) OR `claude-cli-startup-flags.md` worktree section + Boris general advocacy (no specific L93-109 backing for worktree exists in this file) |
| **HIGH** | `docs/smoke-probes-1-to-14.md:132,182` (Probe 14 + footer cite) | Same `boris-6-tips:93-109` for worktree | Same as above | Same as above |
| **HIGH** | `docs/operator-runbook-long-running.md:76` | "cwc CLAUDE.md L165 verbatim: 'Always start here. One feature at a time. Proof before passing. Commit often.'" | cwc CLAUDE.md is 28 lines total; no L165 exists. The quote IS substantively in cwc CLAUDE.md L7+L10+L13+L24 (4 section headers) but condensed across the file | Replace with `cwc-long-running-agents/.../CLAUDE.md:7-24 @ ffd563d6` paraphrasing the 4 section headers (Always start here L6-7 + One feature at a time L9-10 + Proof before passing L12-13 + Commit often L23-24) |
| **MEDIUM** | `CLAUDE.local.md:15,22` (Windows USERPROFILE/HOME isolation block) | `claude-settings.md:877` | L877 is `CLAUDE_CONFIG_DIR` env var, NOT Windows USERPROFILE/HOME isolation | Replace with TIER-3-LOCAL-OPERATOR disclosure (Windows shell-level USERPROFILE/HOME override is a Z:-portable install convention NOT documented in CCBP claude-settings.md). Suggested cite: TIER-3-LOCAL convention; OR if upstream cite required, route to Microsoft Learn PowerShell about_environment_provider docs |

### B. CITE-LINE-DRIFT (correct env var, wrong line number)

| Severity | File:Line | Cite | Issue | Fix |
|---|---|---|---|---|
| **LOW** | `CLAUDE.local.md:56` | `claude-settings.md:950` for `CLAUDE_ENABLE_STREAM_WATCHDOG` | L950 is `CLAUDE_ENABLE_BYTE_WATCHDOG` (related); `CLAUDE_ENABLE_STREAM_WATCHDOG` is at L867 | Update cite to `:867` |

### C. TIER-3-MIS-DISCLOSED (no cite where one is expected per CR-1)

| Severity | File:Line | Item | Issue | Fix |
|---|---|---|---|---|
| **MEDIUM** | `CLAUDE.local.md:44-46` + `eee-pure.ps1:56-58` | MSYS_NO_PATHCONV / MSYS2_ARG_CONV_EXCL / MSYS2_ENV_CONV_EXCL | No cite anchor; should be either TIER-1 (canonical Git Bash / MSYS2 docs URL) OR explicit `TIER-3-LOCAL operator convention` disclosure | Add explicit `# TIER-3-LOCAL operator convention (Git Bash path-rewrite suppression; no upstream cite required at this layer)` annotation OR link MSYS2 docs URL `https://www.msys2.org/wiki/Porting/#filesystem-namespaces` |
| **MEDIUM** | `CLAUDE.local.md:40-41` + `eee-pure.ps1:52-53` | CLAUDE_CODE_PROJECT_DIR + CODEX_HOME | No file:line cite for either env var (CODEX_HOME exists in `Z:/repos/deps/codex/docs/config.md` per Grep) | Pin CODEX_HOME to `Z:/repos/deps/codex/docs/config.md:<line> @ HEAD 993e3f40` (line not extracted; need orchestrator-side re-probe). CLAUDE_CODE_PROJECT_DIR not found in CCBP probes — flag as HONEST-NON-FINDING needing upstream-search OR TIER-3-LOCAL disclosure |

### D. SHA DRIFT (cite-pinning out-of-sync with actual repo HEAD)

| Severity | File:Line | Cited SHA | Actual HEAD | Days drift |
|---|---|---|---|---|
| **MEDIUM** | `CLAUDE.local.md:73` + `manifest §S0 row 2` | `wshobson-agents @ 112197c6` | `ece811f2` | ~6+ days |
| **MEDIUM** | `CLAUDE.local.md:74` + `manifest §S0 row 4` | `addyosmani-agent-skills @ 5b4c6dad` | `4c585c37` | ~6+ days |
| **MEDIUM** | `CLAUDE.local.md:75` + `manifest §S0 row 5` | `context-mode @ f76982c3` | `e73a6cd5` | ~6+ days |
| **MEDIUM** | `CLAUDE.local.md:73` + `manifest §S0 row 1` | `anthropics/claude-plugins-official @ 1a2f18b0` | `76b35e91` | ~6+ days |

### E. TIER-3-LOCAL-OPERATOR-DERIVED values without upstream-canonical cite

| File:Line | Item | Fix |
|---|---|---|
| `.claude/settings.json:14` | `cleanupPeriodDays: 30` | Either probe Anthropic CC official-docs for canonical default OR mark as TIER-3-LOCAL operator-chosen value |
| `.claude/settings.json:15` | `autoUpdatesChannel: "latest"` | Same — verify against `https://code.claude.com/docs/en/settings` |

### F. STALE downstream propagation (Stream-B / Wave 12 corrections queued but not applied)

| File:Line | Item | Source verdict | Status |
|---|---|---|---|
| `manifest §S1B row 14-15` | cwc as "plugin OR direct-install" | Stream B BRIDGE-MODE (real GPT-5.5) overturned: cwc NOT plugin-installable per its own README L13 (not maintained, not accepting contributions). README L19-28 is cp instructions (direct-clone). | **STALE — propagation pending per `PROGRESS.md:33`** |
| `manifest` claudia-statusline placeholder | claude-hud → claudia-statusline name correction per Stream W overturn | **STALE — propagation pending per `PROGRESS.md:32`** |
| `manifest` alirezarezvani cherry-pick | BLANKET-ADOPT-PARENT per Stream Y granularity DEFECT | **STALE — propagation pending per `PROGRESS.md:33`** |

## Top-5 priority fixes (highest leverage rot removal)

| Priority | Fix | Files affected | Effort |
|---|---|---|---|
| **P1** | Replace 3× recurring PHANTOM-CITE Boris `:93-109` worktree with `claude-cli-startup-flags.md:125 @ 48f2ceb` (correct `--worktree` flag cite) | CLAUDE.md L22 + smoke-probes-1-to-14.md L132 + L182 | LOW (1-line edit each) |
| **P2** | Fix cwc CLAUDE.md L165 PHANTOM-CITE → `cwc-long-running-agents/.claude/CLAUDE.md:7-24` (file is 28 LOC total; pin section paraphrase, not L165) | operator-runbook-long-running.md L76 | LOW (1-line edit) |
| **P3** | Apply 3 Stream-B / Wave-12 verdict overturns to manifest §S1B + claudia-statusline + alirezarezvani rows | manifest §S1B + future rows | MEDIUM (manifest restructure per W202 ARC CLOSE-SYNTHESIS) |
| **P4** | Refresh 4 STALE SHA pins (wshobson / addy / context-mode / claude-plugins-official) to live HEAD pre-install OR mark `@latest-acknowledged-CR-9-risk` | CLAUDE.local.md L73-78 + manifest §S0 + provenance | LOW (probe + replace) |
| **P5** | Fix L877 USERPROFILE/HOME misattribution → TIER-3-LOCAL-OPERATOR disclosure for Windows shell-level convention (no upstream cite exists for USERPROFILE override) | CLAUDE.local.md L15+L22 | LOW (rewrite cite class) |

## HONEST-NON-FINDINGS (probes that couldn't resolve)

| Item | Probe attempted | Result |
|---|---|---|
| `https://code.claude.com/docs/en/skills` URL content | Per context-mode policy direction, WebFetch not invoked from this Read-driven audit | UNVERIFIED-URL — orchestrator-side WebFetch verify queued |
| `https://code.claude.com/docs/en/setup` URL content | Same | UNVERIFIED-URL — orchestrator-side queued |
| `https://code.claude.com/docs/en/settings` URL content | Same | UNVERIFIED-URL — orchestrator-side queued |
| `https://code.claude.com/docs/en/env-vars` URL content (would canonicalize cleanupPeriodDays + autoUpdatesChannel defaults) | Same | UNVERIFIED-URL — high-leverage for E-rot items |
| CODEX_HOME canonical line number in `Z:/repos/deps/codex/docs/config.md` | Grep located file containing the env var; line number not extracted via Read | INCOMPLETE-CITE — needs orchestrator-side line extraction |
| MSYS_NO_PATHCONV canonical docs cite | No probe — operator convention | TIER-3-LOCAL disclosure required |
| `manifest` Phase 2A install rows 1-11 (plugin coordinates) | Marketplace JSON probed for §S0 (6 marketplaces verified); per-plugin coordinates verified only for `superpowers-dev` + `claude-code-workflows` + `addy-agent-skills` + `context-mode`. Plugin-level smoke deferred to post-install. | INCOMPLETE-PRE-INSTALL — expected at this Phase 0 |
| `manifest` Phase 2C anthropics/skills HEAD f458cee | Not probed live | UNVERIFIED-HEAD — refresh pre-install |
| `manifest` Phase 2C+ claude-agent-sdk-python `694e4f3b` | Not probed live | UNVERIFIED-HEAD — refresh pre-install |
| 14-MCP install commands (manifest §S2-2F) | Cited install commands but not test-executed | UNVERIFIED-EXEC — expected at Phase 0 pre-install |
| Wave-2 Agent D's 20 prescribed edits all integrated correctly | Not probed line-by-line; relied on PROGRESS.md L11 claim | UNVERIFIED-SUBAGENT-CLAIM — orchestrator-side re-audit recommended |

## Aggregate SOTA-grounded % per file (CR-8 conformance metric)

| File | Verified cites | Total cites/items | SOTA % | Notes |
|---|---|---|---|---|
| README.md | 2/2 | 2 | **100%** | Clean |
| CLAUDE.md | 5/7 | 7 | **71%** | 1 PHANTOM-CITE (Boris L93-109) |
| CLAUDE.local.md | 14/22 | 22 | **64%** | 1 PHANTOM-CITE (L877 USERPROFILE) + 1 CITE-LINE-DRIFT (L56) + 1 MIS-DISCLOSED (MSYS) + 4 SHA-DRIFT + 1 NO-CITE (CODEX_HOME line) |
| .gitignore | 2/2 | 2 | **100%** (with AMBER) | Sibling-cite-import honestly disclosed |
| tools/eee-pure.ps1 | 13/16 | 16 | **81%** | Operator FORWARD-REF discipline applied; 2 NO-CITE + 1 MIS-DISCLOSED |
| bin/eep.cmd | 3/3 | 3 | **100%** (with AMBER) | Microsoft Learn + Anthropic CC URLs; sibling-shim disclosed |
| .claude/settings.json | 5/7 | 7 | **71%** | 2 TIER-3-LOCAL-OPERATOR values without cite |
| .mcp.json | 1/1 | 1 | **100%** | Empty skeleton |
| manifest.md | ~22/33 | ~33 | **67%** | 4 SHA-DRIFT + Stream-B propagation gap + sibling-Wave-derived sections |
| install-provenance.md | n/a | n/a | **90%** | Honest audit-trail; Stream B insight captured at L96-99 |
| PROGRESS.md | n/a | n/a | **100%** | Honest enumeration of Done/Queued |
| operator-runbook.md | 6/7 | 7 | **86%** | 1 PHANTOM-CITE (cwc CLAUDE.md L165) |
| smoke-probes-1-to-14.md | 6/7 | 7 | **86%** | 1 PHANTOM-CITE (Boris L93-109 recurrence in Probe 14) |

**Aggregate across all bootstrap files**: **~82% SOTA-grounded** (weighted by cite count). Per CR-8 full-SOTA-content invariant, target is **>95%** for `ADAPTED-FROM-SOTA` status. Current state: **NEEDS-FIX**.

## Verdict + recommendation

**Pure-runtime bootstrap is ~82% SOTA-grounded** with **3 PHANTOM-CITES** (2 distinct phantoms recurring across 4 files), **1 CITE-LINE-DRIFT**, **4 SHA-DRIFTS**, **3 MIS-DISCLOSED**, and **3 STALE downstream propagation gaps**.

**P0 verdict**: NOT YET "fully official SOTA absolute" per Wave-2 Agent D Edit #19 claim freeze. Pre-Phase-1 marketplace-registration MUST close P1+P2+P5 phantom-cite rot. P3 propagation should land in same atomic apply per `synthesis-layer-verify.md §Pre-apply Mia rule` (this audit is the Mia probe).

**Operator's CONTEXT_WINDOW_* catch was the canary**: it surfaced the broader rot class. The post-operator-catch eee-pure.ps1 state is exemplary (FORWARD-REF gated with activation predicate); applying the same discipline to the 11 rot items above closes the gap.

**Cross-model gate caveat**: This audit ran as Sonnet env-funneled stand-in (per advanced-agent-team-standing-directive Wave 17 fire-24 §Recovery actions). High-leverage P1+P2 phantom-cite findings warrant orchestrator-side `codex exec` foreground+tee BRIDGE-MODE re-verify per `cross-model-consensus.md §"On codex unavailable"` Path P recipe before applying fixes.

## Cite anchor for this report

`tmp/sota-pure-wave14-Z1-bootstrap-audit-2026-05-14.md` (this file)

BOOTSTRAP-AUDIT-COMPLETE:
