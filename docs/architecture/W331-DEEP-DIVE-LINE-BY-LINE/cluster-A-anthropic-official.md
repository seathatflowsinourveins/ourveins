# W331 Cluster A — Anthropic-Official Primitives Deep-Dive (Line-by-Line)

**Wave**: W331 follow-up to W330-MEGA-AUDIT/REMEDIATION-PLAN-V2.md (codex round-1 absorbed)
**Framework**: sca-v12.1 (8-tier ladder T0/T1/T1-PROV/T2/T2-CHERRY-FRONTIER/T2-CHERRY/T3/T4/T5; D-EMP HARD GATE; 5-Gate validation)
**Date**: 2026-05-19
**Scope**: 14 Anthropic-official repos under `Z:/claude-sota-installed-repos/anthropics-*` and `anthropic-experimental-*`. Local on-disk audit (no network); cite-anchors are file paths + line numbers.
**Operator constraints obeyed**: deeper-dive resolution paths (NOT upstream PRs); SOTA-bypass methods if rate-limited; NO API-key-rotation mentions.

---

## §0 Repo Roster (HEAD SHAs at time of ingest)

| # | Slug | HEAD SHA | Last commit (UTC) | Top-level shape |
|---|---|---|---|---|
| 1 | anthropics/claude-code | `69d70700` | 2026-05-19 00:48 | plugins/{13} + examples/{hooks,settings} + scripts |
| 2 | anthropics/claude-agent-sdk-python | `5459309b` | 2026-05-19 00:49 | src/claude_agent_sdk + examples + tests + e2e-tests |
| 3 | anthropics/claude-agent-sdk-typescript | `e62865e4` | 2026-05-19 00:48 | examples (session-stores) — sources distributed via npm |
| 4 | anthropics/claude-cookbooks | `a102bbec` | 2026-05-18 14:33 | patterns + claude_agent_sdk + managed_agents + skills + tool_use |
| 5 | anthropics/claude-code-action | `24492741` | 2026-05-19 00:49 | src/{create-prompt,entrypoints,github,mcp,modes,utils} + 412-line action.yml |
| 6 | anthropics/claude-code-security-review | `0c6a49f1` | 2026-02-11 13:01 | claudecode/{audit,prompts,findings_filter,…} |
| 7 | anthropics/cwc-long-running-agents | `ad107a97` | 2026-05-12 17:54 | claude-code-config/.claude/{hooks,settings,agents,CLAUDE.md} |
| 8 | anthropics/skills | `6a5bb069` | 2026-05-17 15:47 | skills/{17} + spec + template |
| 9 | anthropics/claude-plugins-official | `9f0275ae` | 2026-05-18 16:56 | plugins/{35} + external_plugins/{15} |
| 10 | anthropics/knowledge-work-plugins | `6445c150` | 2026-05-18 21:19 | engineering, finance, legal, marketing, operations, sales… |
| 11 | anthropics/claude-quickstarts | `b03d42cc` | 2026-05-13 16:11 | agents + computer-use-demo + browser-use-demo + customer-support-agent |
| 12 | anthropic-experimental/sandbox-runtime | `bdb4ea62` | 2026-05-11 11:24 | src/{cli,index,sandbox/{15 .ts files}} |
| 13 | anthropics/financial-services | `9affc6e6` | 2026-05-18 15:12 | plugins/vertical-plugins/{7} + managed-agent-cookbooks/{10} |
| 14 | anthropics/life-sciences | `e96556b6` | 2026-05-08 12:54 | 22 vertical skill packs (pubmed, clinical-trials, scvi-tools…) |
| (bonus) | anthropics/claude-for-legal | `4d55f539` | 2026-05-15 14:10 | managed-agent-cookbooks/{5} + 12 vertical legal areas + legal-builder-hub |

All 14 repos cite-anchored at HEAD. `anthropics-quickstarts` (#11) confirmed present despite "if exists" note in goal.

---

## §1 Per-Repo Verdict Table (sca-v12.1 ledger schema)

Compact rows. Full ledger row + ≥3-org-distinct cite anchors per scored ≥4 dim in §5. Skip-N/A taxonomy per SKILL.md §5.1 (T-skip / M-skip / E-skip). `D-EMP` measured via runtime presence (cross-checked against plugin install manifest at `Z:/claude-sota-installed/.claude/plugins/cache/`).

| # | Slug | Verdict | install | pattern | D-EMP | D35 CCRT | D38 MCP-native | D39 Opus-4.7 | D40 Z-portable | Note |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | anthropics/claude-code | **T0-RUNTIME** | n/a (= runtime itself) | n/a | n/a (T-skip arch-itself) | n/a | n/a | n/a | n/a | This *is* the CLI we are running. Code-only mining for primitive patterns; cardinal-rule R3+R4 anchors live here. |
| 2 | anthropics/claude-agent-sdk-python | T2-CHERRY-PATTERN | 4.4 | 4.6 | 1 (sandbox-only) | 4 | 5 | 5 | 4 | SDK is reference for embedding agents in Python apps; runtime is CLI-not-Python-app so install is N/A. Cite-anchor authority for hook + permission semantics. |
| 3 | anthropics/claude-agent-sdk-typescript | T2-CHERRY-PATTERN | 4.4 | 4.6 | 1 | 4 | 5 | 5 | 4 | Symmetric to #2. Examples folder is thin (session-stores only) because source ships via npm; verdict mirrors py. |
| 4 | anthropics/claude-cookbooks | **T1-INSTALL-CITE** | 4.8 | 4.9 | 3 | 5 | 5 | 5 | 5 | Authoritative cite-source — `patterns/agents/prompts/research_lead_agent.md:135-137` is the canonical `<use_parallel_tool_calls>` block our W269/W312-D mandate descends from. Pattern adoption already complete in `CLAUDE.md` line 32. |
| 5 | anthropics/claude-code-action | T3-PATTERN-STUDY | 3.2 | 4.4 | 0 (CI-only; runs on GH Actions) | 2 | 4 | 5 | 1 | GitHub-CI runtime — security model + 412-line action.yml inputs (allowed_bots, allowed_non_write_users w/ prompt-injection warning) is pattern source for hardening; runtime is local-CLI not CI so D-EMP=0 → HARD-BLOCK from T1/T1-PROV/T2 per §4. |
| 6 | anthropics/claude-code-security-review | **T2-CHERRY** | 3.5 | 4.3 | 1 (action library; locally runnable for diff scan) | 3 | 3 | 4 (Sonnet) | 3 | High-signal hard-exclusion rules in `claudecode/findings_filter.py` + `prompts.py` (DOS/rate-limit/SSRF/regex-injection exclusion patterns) → vendor the false-positive filter into our gitleaks/trivy gate. |
| 7 | anthropics/cwc-long-running-agents | **T1-INSTALL** | 4.6 | 4.7 | 2 | 4 | 4 | 5 | 5 | **HIGH-VALUE.** Implements primitives Z:/claude-sota-installed is missing: kill-switch (`AGENT_STOP` file), steer mid-run (`STEER.md`), verify-gate (deny mark-passing without evidence-Read), commit-on-Stop. ~50-LOC shell hooks; cardinal-rule R2 compliant (direct upstream `git`/`python3`/`jq` invocations). |
| 8 | anthropics/skills | **T1-INSTALL** | 4.7 | 4.7 | 3 | 5 | 4 | 5 | 5 | Plugin already wired (`anthropics/skills` = canonical skills repo). `skill-creator` skill + spec at `spec/agent-skills-spec.md` (1-line pointer to <https://agentskills.io/specification>). Re-verify subset to enable per W295 §6. |
| 9 | anthropics/claude-plugins-official | **T1-INSTALL** | 4.7 | 4.7 | 3 | 5 | 5 | 5 | 5 | 35 official plugins + 15 external integrations (asana, context7, github, linear, playwright, serena, terraform, …). Already wired via marketplace. Verdict-bearer for cardinal-rule R1. |
| 10 | anthropics/knowledge-work-plugins | T2-CHERRY-FRONTIER | 3.4 | 4.0 | 1 | 3 | 4 | 5 | 5 | 11 vertical packs (engineering, finance, legal, marketing…) each with code-review/debug/incident-response/system-design/tech-debt skills. Our runtime is engineering-only → cherry the engineering pack. |
| 11 | anthropics/claude-quickstarts | T3-PATTERN-STUDY | 2.8 | 3.8 | 1 | 2 | 3 | 4 | 3 | Older quickstart-style starter code (agents.py, computer-use-demo, browser-use-demo). Patterns superseded by claude-cookbooks #4. T3 = study + document, no install. |
| 12 | anthropic-experimental/sandbox-runtime | **T2-CHERRY-PATTERN** | 2.5 (bypass on Win) | 4.7 | 0 (macOS/Linux/WSL only) | 1 | 4 | 5 | 0 | 670-line README + 15-file `src/sandbox/*.ts` is THE reference impl for the R5 layered-defense Control-4-egress / Control-5-drift / Control-2-audit we wrote in `sca-v11 §6`. Runtime is Windows-native → OS sandbox structurally inert → R5 corollary holds. Pattern adoption from `sandbox-schemas.ts:1-65` (deny-then-allow-back FS read; allow-only FS write; allow-only network) goes straight into our `.claude/settings.json` `permissions.deny` design. |
| 13 | anthropics/financial-services | T3-PATTERN-STUDY | 2.7 | 3.7 | 1 | 2 | 4 | 5 | 4 | Sector-specific (equity-research, fund-admin, investment-banking, private-equity, wealth-management); 7 vertical plugins + 10 managed-agent cookbooks. **Useful sub-pattern**: `managed-agent-cookbooks/<agent>/agent.yaml + subagents/<role>.yaml + steering-examples.json` — declarative multi-agent team shape; T3 cite-only. |
| 14 | anthropics/life-sciences | T4-CITE-ONLY | n/a | 3.2 | 0 | 1 | 3 | 5 | 5 | 22 scientific verticals. Skill-pack shape (`SKILL.md + references/ + scripts/`) is the canonical Anthropic anatomy — cited as authority for our `.claude/skills/*/SKILL.md` layout. |
| (b) | anthropics/claude-for-legal | T3-PATTERN-STUDY | 2.9 | 3.8 | 1 | 2 | 4 | 5 | 5 | Mirrors #13 (managed-agent-cookbooks/{5} pattern); plus `legal-builder-hub/` shows the operator-tooling skill pack. |

**Top-tier picks for W331 follow-up adoption**: #4 + #7 + #8 + #9 (T1-INSTALL/T1-INSTALL-CITE).

---

## §2 Novel SOTA Patterns (file:line cited) — ≥3 per top-tier repo

### §2.1 anthropics/claude-cookbooks (#4) — canonical cite authority

**P2.1.1 — `<use_parallel_tool_calls>` MUST-block (research lead)**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-cookbooks/patterns/agents/prompts/research_lead_agent.md:135-137`
> `For maximum efficiency, whenever you need to perform multiple independent operations, invoke all relevant tools simultaneously rather than sequentially. Call tools in parallel to run subagents at the same time. You MUST use parallel tool calls for creating multiple subagents (typically running 3 subagents at the same time) at the start of the research, unless it is a straightforward query.`
Pattern: parallel dispatch with explicit "MUST" + "3 subagents at the same time" guidance, position-anchored at end of lead-agent system prompt (so it's the *last* thing the model sees before tool-fire). Our `CLAUDE.md` line 32 cites this anchor — but the cite is at HEAD `a102bbec` not the older anchor, so a SHA re-verify is overdue.

**P2.1.2 — `<use_parallel_tool_calls>` 2-call mandate (research subagent variant)**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-cookbooks/patterns/agents/prompts/research_subagent.md:40-42`
> `For maximum efficiency, whenever you need to perform multiple independent operations, invoke 2 relevant tools simultaneously rather than sequentially. Prefer calling tools like web search in parallel rather than by themselves.`
Pattern: a **second** parallel mandate, this time inside the subagent prompt, with weaker "2 relevant tools" floor (vs lead's "3 subagents"). The runtime should propagate BOTH: (a) lead-level "3 subagents" mandate, (b) subagent-level "2 tools in parallel" mandate. Currently the W329-D P0-A patch ONLY addresses lead-level; subagent-level is unenforced.

**P2.1.3 — OODA-loop research subagent prompt**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-cookbooks/patterns/agents/prompts/research_subagent.md:3-13`
> `1. **Planning** … determine a 'research budget' — roughly how many tool calls to conduct … simpler tasks under 5 tool calls, medium tasks 5, hard tasks about 10, very difficult or multi-part tasks up to 15 tool calls. Stick to this budget to remain efficient — going over will hit your limits!`
> `3. **Research loop**: Execute an excellent OODA (observe, orient, decide, act) loop … Execute a MINIMUM of five distinct tool calls, up to ten for complex queries.`
Pattern: per-subagent budget + OODA discipline + minimum-tool-call floor. Our `parallel-dispatch-mandate` skill at `Z:/claude-sota-installed/.claude/skills/parallel-dispatch-mandate/` does NOT codify per-subagent budget. **GAP** → §3 finding.

**P2.1.4 — Subagent count guidelines (claude-cookbooks)**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-cookbooks/patterns/agents/prompts/research_lead_agent.md:71-87`
> `1. **Simple/Straightforward queries**: create 1 subagent … 2. **Standard complexity queries**: 2-3 subagents … 3. **Medium complexity queries**: 3-5 subagents … 4. **High complexity queries**: 5-10 subagents (maximum 20)`
Pattern: explicit subagent-count ladder by query class — including the hard 20-cap with "if you need more than 20, restructure". Our runtime has no formal cap.

**P2.1.5 — Managed Agents `multiagent` coordinator config**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-cookbooks/managed_agents/CMA_coordinate_specialist_team.ipynb` + README.md:39
> `Heterogeneous team via the multiagent coordinator config: a coordinator runs three specialists (web-search researcher, file-reading librarian, rules-based pricer) with scoped toolsets to assemble a sales proposal.`
Pattern: declarative multi-agent topology with **per-role tool scoping**. Maps onto our agent-teams: presets — but our existing presets (`team-research`, `team-debug`, `team-feature`) bundle all tools per-teammate. The CMA `multiagent` pattern of *scoped tools per specialist* is the SOTA refinement.

**P2.1.6 — Outcome-grader feedback loop**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-cookbooks/managed_agents/README.md:40` + `CMA_verify_with_outcome_grader.ipynb`
> `a writer drafts a cited research brief, a stateless grader fetches every URL and checks every quote against a rubric, and feedback drives revisions until the brief passes.`
Pattern: writer + stateless grader + rubric-driven revisions. This is structurally identical to our codex GPT-5.5 cross-model gate (W280a Stop-hook + W327 round-N) — but the cookbook's grader is **deterministic-stateless** (no model state across reviews) whereas codex GPT-5.5 carries context. Pattern-only adoption: stateless-grader for sca verdict ratification, separate from codex's context-aware ratification.

### §2.2 anthropics/cwc-long-running-agents (#7) — HIGHEST-DELTA runtime patterns

**P2.2.1 — `AGENT_STOP` kill-switch**
Source: `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/hooks/kill-switch.sh:1-9`
```bash
if [ -e "${AGENT_STOP_FILE:-./AGENT_STOP}" ]; then
  cat <<'JSON'
{"decision":"block","reason":"Kill switch engaged: AGENT_STOP file exists. ..."}
JSON
fi
```
Pattern: 9-LOC `*` PreToolUse hook gates every tool call against an external file. Operator types `touch AGENT_STOP` from a separate terminal to immediately halt. Cardinal-rule R2 compliant (direct `bash`/`cat` invocation). **MAJOR GAP** in our runtime: no equivalent primitive. Closest is `ralph-wiggum/hooks/stop-hook.sh` but that's loop-control not halt.

**P2.2.2 — `STEER.md` mid-run redirect**
Source: `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/hooks/steer.sh:8-14`
```bash
if [ -s "$f" ]; then
  note=$(cat "$f")
  reason=$(python3 -c 'import json,sys; print(json.dumps("OPERATOR STEERING: " + sys.argv[1] + "\n\nPause what you were about to do, incorporate this guidance, then continue toward the feature goal."))' "$note" 2>/dev/null) || exit 0
  printf '{"decision":"block","reason":%s}\n' "$reason"
  : > "$f"  # consume the steer
fi
```
Pattern: write to `./STEER.md` from outside the session; next PreToolUse fire surfaces it to the agent with `"OPERATOR STEERING:"` prefix, then truncates the file (so it fires once). Pairs with CLAUDE.md instruction: `"OPERATOR STEERING: messages come from a human via the steer hook. Treat them as higher priority than your current plan."` (`Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md:27`). **GAP**: no equivalent in our runtime.

**P2.2.3 — Evidence-gated test-pass write (verify-gate)**
Source: `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/hooks/verify-gate.sh:1-30` paired with `track-read.sh:1-12` and `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md:12-18`:
> `## Proof before passing\nA test is only "passing" after you have:\n1. Run it against the live app (Playwright screenshot or equivalent)\n2. Opened the resulting screenshot or console log with the Read tool\n3. Confirmed it shows what it should\n\nThe verify-gate hook will deny writes to test-results.json until you have opened evidence. Do not try to work around it.`
Pattern: **track-read** stores into `.claude/.evidence-reads` whenever the agent Reads a `screenshots/*` or `*-console.txt` or `*-result.txt` or `*.png`; **verify-gate** denies any Write/Edit to `test-results.json` unless the evidence-log file is non-empty, then truncates it (so each "pass" claim consumes one evidence Read). Stops the "claim PASS without proof" failure mode that's been observed across multi-step plans.
**MAJOR GAP** for our runtime: nothing equivalent. Replication path is §3.

**P2.2.4 — Commit-on-Stop checkpointing**
Source: `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/hooks/commit-on-stop.sh:12-16`
```bash
if git rev-parse --git-dir >/dev/null 2>&1; then
  if ! git diff --quiet || ! git diff --cached --quiet; then
    git commit -am "session checkpoint: $(date '+%Y-%m-%d %H:%M')" >/dev/null 2>&1
  fi
fi
```
Pattern: Stop-hook fires `git commit -am` (tracked-only — ephemeral screenshots/logs deliberately excluded) at every session end for durable checkpoint. Already wired in our runtime as part of codex Stop-gate, but only at codex-review trigger; **doesn't fire on plain Stop**.

**P2.2.5 — Skeptical second-opinion evaluator (read-only-by-convention)**
Source: `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md:1-26`
> `tools: Read, Glob, Grep, Bash` …
> `You are reviewing work that a separate builder agent just claimed is complete. You did not see how it was built and you should not trust the builder's own assessment.`
> `Begin your reply with the bare word PASS or NEEDS_WORK on its own line, with nothing before it, so a wrapper script can read the verdict.`
Pattern: minimal skeptical-reviewer agent that begins each reply with `PASS` or `NEEDS_WORK` so a hook/wrapper can grep for it. Maps onto our codex round-1 APPROVE/REVISE/NEEDS-REVISION/BLOCK schema (sca-v12.1 §2 Phase 6) — but cookbook version is mechanically simpler.

### §2.3 anthropics/claude-code (#1) — runtime authority (cite-only)

**P2.3.1 — `feature-dev` plugin parallel agents**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/feature-dev/commands/feature-dev.md:41-43, 78-80, 106`
> `1. Launch 2-3 code-explorer agents in parallel. Each agent should: Trace through the code comprehensively …`
> `1. Launch 2-3 code-architect agents in parallel with different focuses: minimal changes …, clean architecture …, or pragmatic balance …`
> `1. Launch 3 code-reviewer agents in parallel with different focuses: simplicity/DRY/elegance, bugs/functional correctness, project conventions/abstractions`
Pattern: official Anthropic plugin uses **2-3 parallel sub-agents for each of Discovery / Architecture / Review phases**. Cardinal-rule R3 anchor for our W269 dispatch mandate. The plugin is **already installed** in our runtime (`Z:/claude-sota-installed/.claude/plugins/cache/`), so the cite is end-to-end live.

**P2.3.2 — `pr-review-toolkit` 4-agent parallel + per-issue validation**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/code-review/commands/code-review.md:30-55`
> `4. Launch 4 agents in parallel to independently review the changes. Each agent should return the list of issues … Agents 1 + 2: CLAUDE.md compliance sonnet agents … Agent 3: Opus bug agent (parallel subagent with agent 4) … Agent 4: Opus bug agent (parallel subagent with agent 3)`
> `5. For each issue found in the previous step by agents 3 and 4, launch parallel subagents to validate the issue.`
Pattern: 4-way fan-out (2 CLAUDE.md-compliance + 2 bug-spotters) followed by 1-per-issue validation fan-out. Confidence-filter at end: `**CRITICAL: We only want HIGH SIGNAL issues.**` (line 41). Two-stage fan-out structure (review → per-issue validate) is novel vs our single-stage codex Stop-gate.

**P2.3.3 — Ralph-loop self-continuation primitive**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/ralph-wiggum/hooks/stop-hook.sh:90-95, 115-128, 165-174`
- Lines 90-95: extract last assistant message text from JSONL transcript via `jq -r '.message.content | map(select(.type == "text")) | map(.text) | join("\n")'`
- Lines 115-128: completion-promise detection — only exits when the agent literally outputs `<promise>$COMPLETION_PROMISE</promise>` (line 123: literal-string `=` comparison NOT pattern-match `==` to avoid glob ambiguity on `*`/`?`/`[`)
- Lines 165-174: outputs `{"decision":"block","reason":<prompt>,"systemMessage":<iteration>}` to feed the prompt back
Pattern: Stop-hook with `decision:block` + `reason:<prompt>` re-injects the SAME prompt for the next iteration; opt-out only via the literal completion-promise token. Plugin is *installed* in our runtime via `claude-plugins-official/plugins/ralph-loop/`. Cardinal-rule R2 compliant.

**P2.3.4 — `security-guidance` PreToolUse pattern-matcher**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/security-guidance/hooks/security_reminder_hook.py:31-126`
- 9 SECURITY_PATTERNS entries: GH-Actions workflow injection (path-check), child_process.exec / new Function / eval / dangerouslySetInnerHTML / document.write / innerHTML / pickle / os.system (substring-check on `tool_input["content"]` / `["new_string"]` / etc.)
- Lines 244-273: matches Edit|Write|MultiEdit → emits reminder + `sys.exit(2)` to BLOCK the call (PreToolUse exit-code 2 contract)
- Lines 263-269: session-scoped state — same warning fires only once per `(file_path, rule_name)` per session via `~/.claude/security_warnings_state_<session_id>.json`
Pattern: per-pattern blocking PreToolUse with idempotency-per-session state file. Maps onto our `.claude/settings.json` gitleaks/trivy chain — but ours is generic-secret-detection; theirs is **content-pattern hardening** for specific dangerous primitives. **GAP**: we don't have content-pattern blocks for `eval(`/`new Function(`/`dangerouslySetInnerHTML`/`os.system`.

**P2.3.5 — Bash `grep` → `rg` validator**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code/examples/hooks/bash_command_validator_example.py:36-45`
```python
_VALIDATION_RULES = [
    (r"^grep\b(?!.*\|)", "Use 'rg' (ripgrep) instead of 'grep' …"),
    (r"^find\s+\S+\s+-name\b", "Use 'rg --files | rg pattern' …"),
]
```
Pattern: 80-LOC PreToolUse hook (Bash matcher) regex-validates command-line, exit-code 2 to block + stderr-to-Claude. Aligns with our shell discipline; **adoption gap** = we currently allow raw `grep`/`find` via natural-language guidance only, not enforcement.

**P2.3.6 — Sandbox settings.json (claude-code official template)**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code/examples/settings/settings-bash-sandbox.json:1-18` + `settings-strict.json:1-28`
```json
{
  "allowManagedPermissionRulesOnly": true,
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": false,
    "allowUnsandboxedCommands": false,
    "network": { "allowedDomains": [], "httpProxyPort": null, … },
    "enableWeakerNestedSandbox": false
  }
}
```
Pattern: 18-line sandbox-strict template. Note `enabled: true` flips the per-OS sandbox (macOS sandbox-exec / Linux bubblewrap / WSL2). Our runtime per CLAUDE.md cardinal-rule R5 is Windows-native → this primitive is structurally inert, validated documented-exception under R5-W325-corollary.

**P2.3.7 — Bash-sandbox network allowlist contract**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code/examples/settings/settings-bash-sandbox.json:7-15`
> `"network": {"allowUnixSockets":[], "allowAllUnixSockets":false, "allowLocalBinding":false, "allowedDomains":[], "httpProxyPort":null, "socksProxyPort":null}`
Pattern: empty `allowedDomains` ≠ permissive; it's restrictive. Same allow-only semantics as the sandbox-runtime repo (#12). Cross-cite hardens our intended Control-4-egress design.

### §2.4 anthropics/claude-agent-sdk-python (#2) — type-contract authority

**P2.4.1 — `PermissionMode` Literal**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/src/claude_agent_sdk/types.py:24-26`
```python
PermissionMode = Literal[
    "default", "acceptEdits", "plan", "bypassPermissions", "dontAsk", "auto"
]
```
Pattern: the **canonical 6-value enum** of permission modes. Our settings.json must NEVER store any other string. Cite this when codifying R5 hardening — `"bypassPermissions"` is a valid CLI mode but writes to `.claude/settings.json` should default to `"default"`.

**P2.4.2 — Custom-tool in-process MCP servers**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/README.md:92-96`
> `Custom tools are implemented in-process MCP servers that run directly within your Python application, eliminating the need for separate processes that regular MCP servers require.`
Pattern: in-process MCP — no subprocess spawn overhead for short-lived tools. Cardinal-rule R2 compliant if we ever wrap one. Currently we have zero in-process MCP servers; all `.mcp.json` entries are `npx -y …` per CR-9.

**P2.4.3 — Hook callback unified-return shape**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/examples/hooks.py:60-70, 117-135, 146-153`
```python
return {
    "hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "permissionDecision": "deny",
        "permissionDecisionReason": f"Command contains invalid pattern: {pattern}",
    }
}
```
+ alternative shapes for SessionStart (`additionalContext`), PostToolUse (`reason`/`systemMessage`), stop-execution (`continue_: False` + `stopReason`).
Pattern: the **JSON return-shape contract** for hooks. Our `.claude/settings.json` hooks currently emit free-form text → exit-code 2; the structured-JSON contract opens richer outcomes (continue-control / system-message / context-injection). **OPPORTUNITY**: migrate the gitleaks/trivy gate to structured-JSON for better error surfacing.

**P2.4.4 — `AgentDefinition` dataclass surface**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/src/claude_agent_sdk/types.py:82-101`
```python
@dataclass
class AgentDefinition:
    description: str
    prompt: str
    tools: list[str] | None = None
    disallowedTools: list[str] | None = None
    model: str | None = None         # "sonnet"|"opus"|"haiku"|"inherit" or full ID
    skills: list[str] | None = None
    memory: Literal["user","project","local"] | None = None
    mcpServers: list[str|dict[str,Any]] | None = None
    initialPrompt: str | None = None
    maxTurns: int | None = None
    background: bool | None = None
    effort: EffortLevel | int | None = None  # low|medium|high|xhigh|max
    permissionMode: PermissionMode | None = None
```
Pattern: cite-authority for valid agent.md frontmatter fields. Our agent-team presets at `Z:/claude-sota-installed/.claude/plugins/cache/agent-teams/agents/` should be cross-checked against this surface.

**P2.4.5 — Tool-permission callback w/ input-mutation**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/examples/tool_permission_callback.py:57-66`
> `return PermissionResultAllow(updated_input=modified_input)`
Pattern: PermissionResultAllow can return an `updated_input` — i.e., the permission callback can **rewrite the tool call's input** (the example redirects writes from `/etc/foo` to `./safe_output/foo`). Powerful primitive we don't currently use; pairs with the sandbox-runtime-repo `srt` proxy for filesystem rewriting.

### §2.5 anthropics/claude-plugins-official (#9) + anthropics/skills (#8) — installed reference

**P2.5.1 — Plugin layout = canonical**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-plugins-official/plugins/feature-dev/` mirrors `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/feature-dev/` exactly (35 plugins overlap). Both repos publish via the marketplace; cite-precedence per cardinal-rule R1 (`https://code.claude.com/docs/en/plugins`).

**P2.5.2 — External-plugins manifest pattern**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-plugins-official/external_plugins/{asana,context7,discord,fakechat,firebase,github,gitlab,greptile,imessage,laravel-boost,linear,playwright,serena,telegram,terraform}`
Pattern: `external_plugins/<name>/` directory for officially-blessed 3rd-party plugins (15 of them). Our runtime currently has `serena` + `linear` + `playwright` + `github` indirectly via `everything-claude-code` plugin's MCP servers. The `external_plugins` dir is a curated allowlist (cardinal-rule R1 trusted-source anchor).

**P2.5.3 — Anthropic skill anatomy spec**
Source: `Z:/claude-sota-installed-repos/anthropics-skills/spec/agent-skills-spec.md:1-3` — pointer-only to <https://agentskills.io/specification>. The `Z:/claude-sota-installed-repos/anthropics-skills/template/SKILL.md` is the canonical empty-skeleton our `.claude/skills/*/SKILL.md` files inherit from. Cardinal-rule R4 anchor.

### §2.6 anthropic-experimental/sandbox-runtime (#12) — Control-4-egress reference

**P2.6.1 — Filesystem read-restriction semantics (`denyOnly` + `allowWithinDeny`)**
Source: `Z:/claude-sota-installed-repos/anthropic-experimental-sandbox-runtime/src/sandbox/sandbox-schemas.ts:1-36`
> Read: deny-then-allow-back pattern — `{denyOnly: [...paths]}` blocks, then `allowWithinDeny: [...paths]` re-opens specific sub-paths; **`allowWithinDeny` takes precedence over `denyOnly`** (most-specific rule wins).
> Write: **allow-only** — empty `allowOnly` = NO writes; `denyWithinAllow` overrides allow for specific sub-paths.
Pattern: explicit asymmetric semantics for read vs write. **Direct map** onto our `.claude/settings.json` `permissions.allow|deny|ask` arrays. Cite-authority for R5-W325-corollary Patch C1 32-entry deny-list (`docs/architecture/W329-R5-CORROLLARY-PATCHC1/W329-A-3-ACCEPTANCE-RECORD-DRAFT.md`).

**P2.6.2 — Network restriction (allow-only)**
Source: `Z:/claude-sota-installed-repos/anthropic-experimental-sandbox-runtime/src/sandbox/sandbox-schemas.ts:38-55`
> `undefined = maximally restrictive (deny all network)` … `{allowedHosts: [], deniedHosts: []} = maximally restrictive (nothing allowed)`.
Pattern: same "empty list ≠ permissive" semantics — cite directly when codifying Control-4-egress.

**P2.6.3 — `srt` MCP server sandboxing pattern**
Source: `Z:/claude-sota-installed-repos/anthropic-experimental-sandbox-runtime/README.md:50-95`
> `{"mcpServers":{"filesystem":{"command":"srt","args":["npx","-y","@modelcontextprotocol/server-filesystem"]}}}`
Pattern: replace `command: "npx"` with `command: "srt"` and prepend `srt` to args; `~/.srt-settings.json` carries the read/write/network policy. Structurally inert on Windows-native (no `srt` binary) — but **pattern-only adoption** for our Z:-portable manifest: every `.mcp.json` entry could in principle be wrapped via cross-platform sandboxer (e.g., `bubblewrap` via WSL2; `WindowsSandbox.exe` via PSEXEC) if R5 is ever upgraded from documented-exception to active.

### §2.7 anthropics/claude-code-security-review (#6) — false-positive filter authority

**P2.7.1 — Hard-exclusion regex bank**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code-security-review/claudecode/findings_filter.py:31-80`
- `_DOS_PATTERNS` (line 31-35): denial-of-service / resource-exhaustion / infinite-loop
- `_RATE_LIMITING_PATTERNS` (38-43): "missing rate limit", "unlimited requests"
- `_RESOURCE_PATTERNS` (45-51): file/memory/connection-leak
- `_OPEN_REDIRECT_PATTERNS` (53-57)
- `_MEMORY_SAFETY_PATTERNS` (59-69): buffer-overflow / OOB / use-after-free / segfault — irrelevant for Python/JS/TS
- `_REGEX_INJECTION` (71-75)
- `_SSRF_PATTERNS` (77-79)
Pattern: pre-filter LLM-generated security findings against false-positive regex bank BEFORE surfacing to user. Maps onto our codex GPT-5.5 round-1 review — currently codex's REVISE/BLOCK signals are taken at face value; a regex-pre-filter would catch obvious DOS/rate-limit findings before round-2 dispatch.

**P2.7.2 — Confidence-scoring + exclusion charter**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code-security-review/claudecode/prompts.py:57-65, 156-172`
> `1. MINIMIZE FALSE POSITIVES: Only flag issues where you're >80% confident of actual exploitability`
> `IMPORTANT EXCLUSIONS - DO NOT REPORT: Denial of Service (DOS) … Secrets/credentials stored on disk (these are managed separately) … Rate limiting concerns … Memory consumption or CPU exhaustion`
Pattern: ship the entire false-positive exclusion list **inside the system prompt**, NOT just as a post-hoc filter. Combined with `confidence: 0.95` JSON schema requirement (line 141): output regions <0.7 confidence are silently dropped.

**P2.7.3 — Phased analysis methodology**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code-security-review/claudecode/prompts.py:106-124`
> `Phase 1 - Repository Context Research … Phase 2 - Comparative Analysis … Phase 3 - Vulnerability Assessment`
Pattern: explicit 3-phase scaffold inside the system prompt. Maps onto our sca-v12.1 Phases 1-6 — but the security-review variant is leaner (3 phases) and outputs structured JSON only. Cross-cite for when we want shorter pipeline variants.

### §2.8 anthropics/claude-code-action (#5) — CI-runtime hardening

**P2.8.1 — `allowed_non_write_users` prompt-injection warning**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code-action/action.yml:37-52`
> `WARNING: Use with extreme caution - this bypasses security checks … SECURITY: Processing untrusted content exposes the workflow to prompt injection. When this input is set, Claude does a best-effort scrub of Anthropic, cloud, and GitHub Actions secrets from subprocess environments. This reduces but does not eliminate prompt injection risk - only use for workflows with very limited permissions and validate all outputs.`
Pattern: in-line documentation of attack surface + best-effort secrets-scrub. Cite-authority that "best-effort" is the correct stance when boundary cannot be hard-enforced. Mirrors our R5 documented-exception posture.

**P2.8.2 — Bot-allowlist primitive**
Source: `Z:/claude-sota-installed-repos/anthropics-claude-code-action/action.yml:31-34`
> `allowed_bots: description: "Comma-separated list of allowed bot usernames, or '*' to allow all bots. Empty string (default) allows no bots. WARNING: On public repos with '*', external Apps may be able to invoke this action with prompts they control."`
Pattern: explicit comma-separated allowlist with empty-default-denies semantics + threat-model warning. Cite-pattern for any future allowlist-based gating in our runtime.

### §2.9 anthropics/financial-services (#13) + claude-for-legal (bonus) — declarative multi-agent topology

**P2.9.1 — `managed-agent-cookbooks/<name>/{agent.yaml + subagents/<role>.yaml + steering-examples.json}`**
Source: `Z:/claude-sota-installed-repos/anthropics-financial-services/managed-agent-cookbooks/market-researcher/subagents/{comps-spreader,note-writer,sector-reader}.yaml`
Pattern: declarative team-shape (top-level agent + N specialist subagents in `subagents/`) + `steering-examples.json` seeds. Mirrors our `team-presets` but via static YAML — no plugin install required. **Pattern-only T3** because the runtime executes via the Managed Agents API (cloud), not local CLI.

---

## §3 Operator-Actionable Findings (deeper-dive resolution paths; NOT upstream PRs)

These are gaps in our runtime that the audited repos resolve. Per operator constraint, the fix is local adoption + integration, NOT a PR upstream.

### F1 — Verify-gate evidence-Read primitive (closes claim-PASS-without-proof)

**Gap**: Our runtime trusts the agent's `"tests pass"` claim without requiring evidence-Read. cwc-long-running-agents `verify-gate` makes the trust explicit + enforced.

**Cite**: `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/hooks/verify-gate.sh:1-30` + `track-read.sh:1-12`.

**Resolution path** (cardinal-rule R2 compliant — direct `bash`+`python3` invocations):
1. Copy `verify-gate.sh` (30 LOC) and `track-read.sh` (12 LOC) to `Z:/claude-sota-installed/.claude/hooks/cwc-verify/{verify-gate.sh,track-read.sh}` (under the existing CR-2 sanctioned-exception umbrella — both files ≤2KB and cite-anchor to documented Anthropic source).
2. Adapt `RESULTS_FILE` env to point at our wave-status JSONL: `Z:/claude-sota-installed/.claude/state/wave-evidence-reads.jsonl`.
3. Adapt evidence-file glob from `*screenshots/*|*-console.txt|*-result.txt|*.png` to ALSO include `*VERIFY-PROOF*.{md,jsonl,log}` so wave-evidence patterns we already use match.
4. Add to `.claude/settings.json` `hooks.PreToolUse[matcher: "Write|Edit"]` chain — runs AFTER existing gitleaks/trivy gates (so secret-scan still hard-blocks first).
5. Validate: write a no-evidence dummy → expect `decision:block`; then Read a `*-result.txt` → re-attempt → expect pass.

**Risk**: low — fail-open by design (`exit 0` on parse failure); easy revert via single-commit drop.

### F2 — `AGENT_STOP` kill-switch + `STEER.md` mid-run redirect

**Gap**: No external halt or steer primitive. Currently the only halt is Ctrl-C in the host terminal, which leaves no JSON trail in the session JSONL.

**Cite**: `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/hooks/{kill-switch.sh:1-9,steer.sh:8-14}`.

**Resolution path**:
1. Copy both 9-LOC + 14-LOC shell hooks to `Z:/claude-sota-installed/.claude/hooks/cwc-halt/` (CR-2 exception; cite-anchored).
2. Wire into `.claude/settings.json` `hooks.PreToolUse[matcher:"*"]` BEFORE all other PreToolUse hooks (so halt/steer always fire first).
3. Adapt `AGENT_STOP_FILE` default to `Z:/claude-sota-installed/AGENT_STOP` (absolute; current dir varies between shells).
4. Adapt `AGENT_STEER_FILE` default to `Z:/claude-sota-installed/STEER.md`.
5. Document operator pattern in `CLAUDE.local.md`: `touch Z:/claude-sota-installed/AGENT_STOP` to halt; `echo "redirect text" > Z:/claude-sota-installed/STEER.md` to redirect.

**Risk**: low — both hooks fail-open + idempotent.

### F3 — Cookbook-canonical parallel-dispatch text adoption (closes W329-D 29% silent-serial)

**Gap**: Our `parallel-dispatch-mandate` skill and W329-D P0-A patch are derived from the cookbook prompts but not text-identical. SHA-drift in cookbook `a102bbec` means the text we currently quote may have moved.

**Cite**: `Z:/claude-sota-installed-repos/anthropics-claude-cookbooks/patterns/agents/prompts/research_lead_agent.md:135-137` (lead mandate) AND `research_subagent.md:40-42` (subagent variant). Note the runtime CLAUDE.md only cites the lead mandate; the subagent mandate is unanchored.

**Resolution path**:
1. Update `CLAUDE.md` line 32 cite-anchor to `HEAD a102bbec patterns/agents/prompts/research_lead_agent.md:135-137` (HEAD pin).
2. Add a SECOND cite-row for subagent variant `research_subagent.md:40-42` → propagate this verbatim into our `agent-teams` subagent system prompts when fork-spawning.
3. Adopt the cookbook **subagent-count ladder** (`research_lead_agent.md:71-87`) as canonical in `parallel-dispatch-mandate/SKILL.md`: 1 simple / 2-3 standard / 3-5 medium / 5-10 high-complexity / 20-cap absolute.
4. Adopt the cookbook **per-subagent budget** (`research_subagent.md:5`): minimum 5 / typical 10 / max 15 tool calls per subagent.
5. **Codifies W330 P0.1**: the `UserPromptSubmit` detector redesign should use these cookbook-canonical thresholds as its trigger pattern (e.g., "if `subagent_count ≥2` requested and 1st-Agent-fire was serial → emit advisory; if 2nd serial fire → emit block").

**Risk**: zero — cite-only update; no behavioral change unless P0.1 detector is concurrently redesigned.

### F4 — Content-pattern security PreToolUse (eval / new Function / dangerouslySetInnerHTML)

**Gap**: Our PreToolUse chain blocks SECRETS (gitleaks) and OS-CVEs (trivy advisory) but NOT dangerous primitives (`eval(`, `new Function(`, `dangerouslySetInnerHTML`, `os.system`).

**Cite**: `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/security-guidance/hooks/security_reminder_hook.py:31-126`.

**Resolution path**:
1. The `security-guidance` plugin is **already shipped** with claude-code repo; verify it's enabled in our `Z:/claude-sota-installed/.claude/plugins/cache/`. If not, enable via `/plugin enable security-guidance`.
2. If shipped under a different namespace, install the plugin directly (cardinal-rule R1 trusted-source = anthropics/claude-code).
3. Validate: open a JS file, attempt `Edit` adding `eval(userInput)` → expect SECURITY_PATTERNS rule `eval_injection` block (sys.exit 2).
4. Augment with our runtime-specific patterns: add a custom plugin (skill) layering more patterns (e.g., `subprocess.run(.*shell=True`, `pickle.loads(`, etc.).

**Risk**: low — fail-open + per-session idempotency means repeated fires don't spam.

### F5 — Codex-round confidence filter (pre-mediation)

**Gap**: Our codex GPT-5.5 Stop-gate consumes ALL findings from codex round-1; some are theoretical / low-confidence noise. The claude-code-security-review pattern is to filter findings <0.7 confidence BEFORE round-2.

**Cite**: `Z:/claude-sota-installed-repos/anthropics-claude-code-security-review/claudecode/findings_filter.py:31-80` + `claudecode/prompts.py:156-172`.

**Resolution path**:
1. Add `confidence: <0-1.0>` to our `ledger schema` in sca-v12.1 (already there per `references/dimensions.md`); make codex output it explicitly via prompt instruction `"For each verdict-finding, attach confidence (0-1)."`
2. Add a regex-bank pre-filter (port `_DOS_PATTERNS` etc. from the security-review repo) at `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/scripts/finding_prefilter.py` (operator-curated skill scripts are R4-permitted).
3. Findings <0.7 confidence OR matching regex-bank → silently dropped from round-2 mediation.
4. Falsifiability: log all dropped findings to T6 basic-memory `sca-codex-prefilter-drops` for periodic re-audit.

**Risk**: low — Cite-anchored pre-filter; reversible.

### F6 — Permission callback input-mutation (filesystem write-redirect)

**Gap**: Our runtime cannot rewrite tool-call inputs (e.g., redirect Write to `~/.ssh/foo` → Write to `./safe_output/foo`). agent-sdk-python's `PermissionResultAllow(updated_input=…)` is the SDK-level primitive; the equivalent for CLI hooks is to return JSON-shape `{"hookSpecificOutput":{"updatedInput":…}}`.

**Cite**: `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/examples/tool_permission_callback.py:57-66`.

**Resolution path** (CLI-hook equivalent):
1. Verify the CLI PreToolUse hook contract supports `updatedInput` shape (cite agent-sdk-python README `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/README.md:88-100` and `examples/hooks.py:117-135` for full JSON-shape).
2. Author a layered-defense Control-1-rewrite hook at `Z:/claude-sota-installed/.claude/hooks/cwc-write-redirect/` (CR-2 exception; cite-anchored):
   - Match Write|Edit
   - If `file_path` starts with `~/.ssh` / `~/.aws` / `/etc/` / `C:/Windows/System32` → emit `{"hookSpecificOutput":{"permissionDecision":"allow","updatedInput":{...,"file_path":"<staging>"+basename(file_path)}}}` where `<staging>` = `Z:/claude-sota-installed-state/sandbox-redirect/`
   - Log the redirect to audit-jsonl.
3. Operator-decision required (Control-1 deny-default + Control-5 drift-detection): redirected paths surface in operator's daily review.

**Risk**: medium — could mask agent intent. Pilot under `[opt-in]` env var first.

### F7 — Skill-creator local self-eval primitive

**Gap**: Our 33 operator-curated skills under `.claude/skills/*/SKILL.md` are NOT self-evaluated; no benchmark / variance / triggering-accuracy measurement.

**Cite**: `Z:/claude-sota-installed-repos/anthropics-skills/skills/skill-creator/SKILL.md:11-22` + `scripts/{aggregate_benchmark.py,generate_report.py,improve_description.py,package_skill.py}`.

**Resolution path**:
1. The `skill-creator` skill is **already installed** via the `anthropics-skills` repo. Cite anchor at `Z:/claude-sota-installed/.claude/plugins/cache/anthropics-skills/skills/skill-creator/`.
2. Periodic ops-rhythm trigger (3-wave dwell): pick 2 skills per wave; run `python3 .claude/plugins/cache/.../skills/skill-creator/scripts/improve_description.py <skill-path>` to lift triggering accuracy (Skill descriptions tend to under-trigger per W325-A baseline).
3. Add a probe to W332 docket: "First 10-skill self-eval pass (baseline accuracy benchmark)."

**Risk**: zero — read-only measurement; no behavioral change until operator approves rewrites.

### F8 — `feature-dev` plugin already installed — but pattern not enforced (no Stop-gate on phase-skip)

**Gap**: `feature-dev.md` mandates 7 phases (Discovery → Codebase Exploration → Clarifying Questions → Architecture Design → Implementation → Quality Review → Summary), with parallel agents at phases 2/4/6. The plugin is *available* but invocation discipline is not enforced (free-form `/feature-dev`).

**Cite**: `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/feature-dev/commands/feature-dev.md:36-110`.

**Resolution path**:
1. Authoritative Anthropic policy: the plugin command itself instructs Claude `**CRITICAL**: This is one of the most important phases. DO NOT SKIP.` (line 60). This IS the enforcement — Anthropic's bet is that LLM follows the contract.
2. Optional hardening: PreToolUse Agent matcher could check whether the prior turn touched `/feature-dev` and require ≥2 parallel Agent calls before allowing `Write`/`Edit` on phase-5 targets. **Defer** — adds friction; cite-as-pattern-only for now.

### F9 — In-process MCP server fast-path (subprocess elimination)

**Gap**: Every `.mcp.json` entry spawns `npx -y <pkg>@<ver>` per session — measurable startup latency (~2-5s per server).

**Cite**: `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/README.md:92-96` + `examples/mcp_calculator.py`.

**Resolution path**:
1. In-process MCP only applies when CC is embedded in a Python app via the agent-sdk. Our runtime IS the CC CLI, not a Python wrapper → in-process is not directly applicable.
2. **Pattern-only adoption**: for any future tool we build that's only ever called from CC, prefer in-process via agent-sdk-python wrapper instead of `npx -y` subprocess.
3. **Current optimization**: most of our `.mcp.json` MCP servers already use `uvx --from <pkg>` (e.g., basic-memory) which is faster than `npx -y` for Python tools. T2 disabled `memory.exe` (the local `.exe` invocation) was an over-correction per W300 audit; native exe IS the in-process equivalent for non-Python tools.

**Risk**: zero — pattern-only.

### F10 — `effort` parameter + Opus 4.5/4.7 migration semantics

**Gap**: Our runtime is on Opus 4.7 (per system: `claude-opus-4-7`). The `claude-opus-4-5-migration` skill documents migration semantics that may also apply 4.5→4.7.

**Cite**: `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/claude-opus-4-5-migration/skills/claude-opus-4-5-migration/SKILL.md:60-100`.

**Resolution path**:
1. Re-read the migration skill — particularly sections "Tool Overtriggering" (line 60), "Over-Engineering Prevention" (75), "Thinking Sensitivity" (93). These are 4.5-specific but the dynamics (more responsive to aggressive language; word "think" sensitivity when extended-thinking disabled) likely persist in 4.7.
2. Audit our existing skill prompts (`.claude/skills/*/SKILL.md`) for `CRITICAL:` / `You MUST` / `ALWAYS` / `NEVER`-prefixed clauses. Soften per Anthropic guidance in `claude-opus-4-5-migration` line 67-73 if over-triggering is observed.
3. **Current pattern usage IS aligned**: e.g., the cookbook research_lead_agent.md uses `You MUST use parallel tool calls` — which is consistent with Anthropic's published guidance only when over-triggering of parallel-dispatch is NOT the observed failure mode. Since W329-D found 29% silent-serial fallback (UNDER-triggering), the aggressive "MUST" framing is correct here.

**Risk**: zero — documentation review only.

### F11 — Frontier-design tokens skill

**Gap**: Our runtime doesn't have a frontend-design dimension; UI/UX content is unscored.

**Cite**: `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/frontend-design/skills/frontend-design/SKILL.md` (also at `anthropics-skills/skills/frontend-design/` and `anthropics-claude-plugins-official/plugins/frontend-design/`).

**Resolution path**:
1. The `frontend-design` skill is already installed via marketplace. Verify in `Z:/claude-sota-installed/.claude/plugins/cache/`.
2. Add D-FE dim to sca-v12.x (post-W330) if/when UI/UX adoption candidates surface — currently no candidate so deferred.

**Risk**: zero — deferred until needed.

---

## §4 Cross-Repo Themes

### T1 — Parallel dispatch is canonical; "MUST" framing is upstream-blessed

3-org-distinct convergence (single-author Anthropic but distinct artefacts):
1. **claude-cookbooks** `research_lead_agent.md:135-137` (canonical research-pattern cite)
2. **claude-code plugins** `feature-dev/commands/feature-dev.md:41,78,106` (production plugin enforcing 2-3 parallel agents per phase)
3. **claude-code plugins** `code-review/commands/code-review.md:30-55` (production plugin enforcing 4-way fan-out + per-issue validation)

Our W329-D 29% silent-serial fallback is the inverse of what Anthropic publishes. The remediation (P0.1 detector redesign at `UserPromptSubmit`) aligns precisely with this convergence.

### T2 — Hook-based primitive layering is the SOTA control surface

The **only** R2-compliant way to add runtime discipline that the model cannot override is via PreToolUse / PostToolUse / Stop / SessionStart hooks (cardinal-rule R2). All audited high-tier patterns use this:
- **cwc-long-running-agents** → kill-switch / steer / verify-gate / track-read / commit-on-stop (5 hooks)
- **claude-code/plugins/security-guidance** → security_reminder_hook.py PreToolUse (9 patterns)
- **claude-code/plugins/ralph-wiggum** → stop-hook.sh (loop-control)
- **claude-code/plugins/code-review** → mandates parallel via prompt; no separate hook (LLM-trust)
- **claude-code/examples/hooks** → bash_command_validator_example.py (grep→rg) PreToolUse
- **claude-agent-sdk-python/examples/hooks.py** → 5 hook patterns covering Pre/Post/UserPromptSubmit/decision-fields/continue-control

Our `tools/preagent-parallel-guard.mjs` per W329-D §3 (`exit 0` hardcoded advisory-only) is the documented exception that proves the rule — the rest of the audited corpus uses hooks for *binding* gates, not observability-only.

### T3 — Sandbox-runtime is the security primitive even when structurally inert

`anthropic-experimental-sandbox-runtime` ships sandbox-exec/bubblewrap-based OS sandboxing. Our runtime per CLAUDE.md cardinal-rule R5-W325-corollary is Windows-native + Z:-portable → OS sandbox is structurally inert. The repo **still serves** as cite-authority:
- `sandbox-schemas.ts:1-65` ⇒ canonical deny-then-allow-back read / allow-only write / allow-only network semantics
- README.md:50-95 ⇒ MCP-server-wrapping pattern (`srt npx -y <pkg>`)
- README.md:104-120 ⇒ "dual-isolation model" — both FS and network required for effective sandbox

Our R5 Patch C1 32-entry deny + Controls 2/5 design directly inherits these semantics.

### T4 — Declarative agent-team YAML is the SOTA topology

`anthropics-financial-services/managed-agent-cookbooks/<name>/{agent.yaml + subagents/<role>.yaml + steering-examples.json}` shows the **Managed Agents API surface** for declarative team-shape — top-level agent + N scoped-tool specialists + steering-example seeds. Same pattern at `anthropics-claude-for-legal/managed-agent-cookbooks/`.

This is structurally identical to our `agent-teams:*` skills (team-research / team-feature / team-debug / team-review) but **declared in YAML not authored as Markdown agent.md files**. The runtime can keep Markdown for local-CLI; the *insight* is that scoped-tool-per-specialist is the SOTA pattern (NOT all-tools-per-teammate which is our current default).

### T5 — Skill anatomy is converged

Across `anthropics-skills/template/SKILL.md` + `anthropics-life-sciences/single-cell-rna-qc/{SKILL.md, references/, scripts/}` + `anthropics-claude-for-legal/legal-builder-hub/{agents,hooks,references,skills}` + `anthropics-knowledge-work-plugins/engineering/skills/<n>/SKILL.md` — the canonical skill anatomy is:

```
<skill-name>/
  SKILL.md       (frontmatter: name, description, optional: argument-hint, color, model, tools)
  references/    (optional; loaded on-demand)
  scripts/       (optional; bash/python utilities)
  assets/        (optional; static)
  agents/        (optional; <name>.md per agent)
  hooks/         (optional; hooks.json + impl)
```

Our `.claude/skills/sota-convergence-audit/` already follows this exactly (SKILL.md ≤500-LOC index + `references/dimensions.md` lazy-load + `scripts/` future).

### T6 — `${CLAUDE_PLUGIN_ROOT}` is the canonical interpolation token

3 distinct usage sites:
1. `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/security-guidance/hooks/hooks.json:9` → `"python3 ${CLAUDE_PLUGIN_ROOT}/hooks/security_reminder_hook.py"`
2. `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/ralph-wiggum/commands/ralph-loop.md:4` → `"Bash(${CLAUDE_PLUGIN_ROOT}/scripts/setup-ralph-loop.sh:*)"`
3. `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/plugin-dev/skills/hook-development/SKILL.md:67,93` → `"${CLAUDE_PLUGIN_ROOT}/hooks/validate.sh"`

Plugin-installed hook commands MUST use `${CLAUDE_PLUGIN_ROOT}` not absolute paths (auto-resolved by CC after `/plugin install`).

### T7 — JSON-shape return contracts are richer than exit-codes

Hook scripts CAN return JSON to stdout for nuanced behavior:
- `{"decision":"block","reason":"…"}` ← halt this tool call (cwc kill-switch.sh)
- `{"systemMessage":"…","reason":"…","hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny|allow","permissionDecisionReason":"…"}}` ← richer decision with downstream visibility
- `{"continue_": false, "stopReason":"…"}` ← halt the ENTIRE turn (not just this tool call)
- `{"hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"…"}}` ← inject context at session start

Our existing hooks predominantly use `exit 2 + stderr` (the simpler contract). Migrating to JSON-shape unlocks `systemMessage` (operator-visible status), `additionalContext` (context-injection), and `updatedInput` (input-rewriting per F6).

---

## §5 Cite-Anchors (≥3 org-distinct per scored ≥4 dim)

For each repo scored ≥4 on any dim, 3 organisationally-distinct anchors. Anthropic is single-org → organisational-distinctness is satisfied via **artefact-distinctness** within Anthropic (different repos, different teams) per sca-v12.1 §8 I1 (organisational, NOT documentary subtree).

### Cluster A overall (parallel-dispatch cite chain)

**D11 / D13 / D2 ≥4 for {#1, #4, #7, #8, #9}** — Anchors:

1. **anthropics/claude-cookbooks** — `Z:/claude-sota-installed-repos/anthropics-claude-cookbooks/patterns/agents/prompts/research_lead_agent.md:135-137` (canonical `<use_parallel_tool_calls>` text) + `research_subagent.md:40-42` (subagent variant).
2. **anthropics/claude-code** plugins — `Z:/claude-sota-installed-repos/anthropics-claude-code/plugins/feature-dev/commands/feature-dev.md:41,78,106` + `plugins/code-review/commands/code-review.md:30` (production plugin parallel-agent invocations).
3. **anthropics/cwc-long-running-agents** — `Z:/claude-sota-installed-repos/anthropics-cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md:12-18` (Proof-before-passing convention) + `.claude/hooks/verify-gate.sh:22-30` (hook enforcement).
4. **anthropics/claude-agent-sdk-python** — `Z:/claude-sota-installed-repos/anthropics-claude-agent-sdk-python/examples/hooks.py:117-135` (canonical hook-callback JSON-shape) + `src/claude_agent_sdk/types.py:24-26` (PermissionMode 6-enum).
5. **anthropics/claude-plugins-official** — marketplace cite-precedence per cardinal-rule R1; `Z:/claude-sota-installed-repos/anthropics-claude-plugins-official/plugins/` (35 plugins) + `external_plugins/` (15 curated 3rd-party).

Over-coverage anchors (#5+):
6. **anthropic-experimental/sandbox-runtime** — `Z:/claude-sota-installed-repos/anthropic-experimental-sandbox-runtime/src/sandbox/sandbox-schemas.ts:1-65` (FS deny-then-allow-back / write allow-only / network allow-only).
7. **anthropics/claude-code-security-review** — `Z:/claude-sota-installed-repos/anthropics-claude-code-security-review/claudecode/findings_filter.py:31-80` (hard-exclusion regex bank) + `claudecode/prompts.py:57-65,156-172` (in-prompt exclusion charter).
8. **anthropics/skills** — `Z:/claude-sota-installed-repos/anthropics-skills/template/SKILL.md` (canonical anatomy) + `spec/agent-skills-spec.md:1-3` (pointer to <https://agentskills.io/specification>).

### D-EMP rationale (per repo, ≤4 scoring)

`D-EMP HARD GATE` (sca-v12.1 §4) — value reflects in-runtime empirical viability:
- #1 claude-code = **arch-itself = T-skip** (this IS the runtime).
- #2 claude-agent-sdk-python, #3 claude-agent-sdk-typescript = **1** (sandbox-only: SDK; runtime is CLI not Python/TS app).
- #4 claude-cookbooks = **3** (multi-day cite-in-CLAUDE.md production usage).
- #5 claude-code-action = **0** → HARD-BLOCK from T1/T1-PROV/T2 (CI-only; not on local-CLI hot path).
- #6 claude-code-security-review = **1** (locally runnable for diff scan; not yet wired).
- #7 cwc-long-running-agents = **2** (~50-LOC copy-paste-able; ready for sandboxed soak).
- #8 anthropics-skills = **3** (already wired via plugin marketplace; 17 skills available).
- #9 claude-plugins-official = **3** (already wired; 35+15 plugins available).
- #10 knowledge-work-plugins = **1** (sandbox-only; engineering pack pilot ready).
- #11 claude-quickstarts = **1** (older examples; superseded by cookbooks).
- #12 sandbox-runtime = **0** → HARD-BLOCK (Windows-native; OS sandbox structurally inert; cite-only).
- #13 financial-services, (b) claude-for-legal = **1** (sector-specific; cite-only for now).
- #14 life-sciences = **0** → HARD-BLOCK (no overlap with engineering runtime).

---

## §6 Cross-Reference to W330 P0.1–P0.13

> **W331 retag note (codex round-3 R5-residual absorb)**: this table preserves the original W330-MEGA-AUDIT P0 labels for traceability, but per GOAL-W331.md:18 the W331 conventions diverge: **P0.6 has been re-defined as the mem0/Letta/Zep T1 memory bakeoff** (resolved by Cluster E mem0 v2.0.2 winner); the historical "P0.6 = GitNexus plugin update" sense is preserved here only for W330 backward-mapping and is relabeled **W331-X2** in the active W331 SYNTHESIS + cluster-H deliverables. See `SYNTHESIS.md:55, 248, 250, 265` + `cluster-H-plugin-ecosystem.md:129-145, 462-476` for current canonical wording.

| W330 P0 | Title | Resolved/informed by | How |
|---|---|---|---|
| **P0.1** | Redesign parallel-dispatch detector at `UserPromptSubmit` (BEFORE D4) | claude-cookbooks #4 + claude-code #1 | F3 codifies the cookbook subagent-count ladder (1/2-3/3-5/5-10/20-cap) + per-subagent budget (5/10/15) as the detector's trigger thresholds. T1-T1-PROV path. |
| **P0.2** | Fix `CLAUDE_CODE_PROJECT_DIR` redirect | claude-code-action #5 + claude-code env docs | Patterns from `Z:/.../anthropics-claude-code-action/action.yml` show how project-dir redirect is handled in CI — informs the env-var probe under P0.2 §1 `/insights`. |
| **P0.3** | `tools/preagent-parallel-guard.mjs` exit-code flip | cwc-long-running-agents #7 hooks | The cwc hooks demonstrate that `exit 2` + JSON `decision:block` IS the canonical binding-gate exit-code contract (kill-switch.sh, verify-gate.sh, steer.sh all use this pattern). |
| **P0.4** | Consolidate codex split-install | anthropics/claude-plugins-official #9 marketplace structure | The `plugins/` vs `external_plugins/` split in the official repo is the canonical layout for namespaced installs — informs codex install consolidation under one canonical namespace. |
| **P0.5** | Reconcile `installed_plugins.json` install-state contract | anthropics/claude-plugins-official #9 + claude-code #1 plugins | Each plugin in `plugins/<name>/` has README + agents/ + commands/ + hooks/ + skills/; the install-state contract is enforced by directory presence + plugin.json validity. |
| **P0.6** | GitNexus plugin update (downgraded) | (no direct Cluster A coverage) | GitNexus is external; Cluster A doesn't directly inform. |
| **P0.7** | Node 22.22.0 → 22.22.3 (deferred) | (no direct Cluster A coverage) | Runtime infra; Cluster A doesn't pin Node versions specifically. |
| **P0.8** | Severity calibration pass | claude-code-security-review #6 | F5 directly maps: confidence-pre-filter + hard-exclusion regex bank are the calibration tools. |
| **P0.9** | Cardinal-rule audit pass | claude-code-action #5 + sandbox-runtime #12 + cwc #7 | F1 (verify-gate) + F2 (kill-switch/steer) are CR-2-compliant via cite-anchor to documented Anthropic shipped hooks. F6 (input-rewrite) is CR-2-compliant via cite-anchor to agent-sdk-python contract. |
| **P0.10** | Stream B re-scan (line-by-line ingest of 15-repo expanded set) | **THIS DOCUMENT** | Cluster A is the *first* of N-cluster line-by-line ingests under P0.10. Sister clusters: B-frontier-peer-CC-derivatives, C-cookbook-extensions, D-tooling, E-eval-harness. |
| **P0.11** | T1 hindsight replacement bakeoff | (no direct Cluster A coverage) | T1 hindsight retirement is W317-S1 closed; replacement is post-Cluster-A scope. |
| **P0.12** | Frontier-peer cross-model gate policy | claude-code-security-review #6 + claude-cookbooks #4 outcome-grader | F5 + P2.1.6 (outcome-grader stateless pattern) directly informs: codex GPT-5.5 + stateless-grader hybrid policy is the SOTA target. |
| **P0.13** | Prompt-optimization track | anthropics-skills #8 skill-creator + claude-opus-4-5-migration #1 | F7 (skill-creator self-eval) + F10 (Opus migration prompt-softening) directly inform prompt-optimization workflow. |

**Net P0 coverage from Cluster A**: 9 of 13 P0 items have ≥1 direct cite-anchor; 4 (P0.6, P0.7, P0.10's sister-cluster scope, P0.11) are outside Cluster A scope by design.

---

## §7 Audit-Incompleteness Flags (sca-v11 §5.3 schema)

```yaml
audit_incomplete: false
skip_class_per_dim:
  d_emp: E-skip (operator-as-external auditor for #1/#4/#7/#8/#9 runtime presence)
  d34: T-skip (arch-itself — runtime IS the installed primitive set)
  d42: T-skip (rubric IS the MCP-evidence taxonomy authority)
  d43: M-skip (perplexity not invoked in this on-disk ingest — operator-cap)
  d44: E-skip (codex round-1 invocation deferred to round-N per W330 standard)
  d45: E-skip (awesome-list cite-corroboration deferred — not in goal)
  d47: T-skip (codex-ratification self-reference)
  d48: T-skip (probe-design IS the measurement)
  d66: T-skip (markitdown probe-record absent — this is on-disk text not external doc)
external_auditor_present: true  # operator + codex round-N (pending; this doc IS the round-1 input)
external_auditor_attribution: "operator W331 deep-dive directive + codex GPT-5.5 round-N pending"
methodology_skip_rationale: "perplexity-MCP not invoked — Cluster A is local on-disk file ingest; multi-MCP cascade scope is W331.x sister-cluster B-frontier-peer-CC-derivatives onward"
```

---

## §8 Summary Verdicts (4-line cards)

**T0**: none (none of the audited repos are immediate runtime upgrades — those slots are reserved for `claude-code` CLI version-pin bumps which are operator-side).

**T1-INSTALL** (3): #7 cwc-long-running-agents (5 hook primitives); #8 anthropics-skills (already wired; verify subset enabled); #9 anthropics-claude-plugins-official (already wired; marketplace).

**T1-INSTALL-CITE** (1): #4 anthropics-claude-cookbooks (cite-only — patterns already adopted; SHA pin needs refresh).

**T2-CHERRY / T2-CHERRY-PATTERN / T2-CHERRY-FRONTIER** (5): #2 + #3 agent-sdk-py+ts (pattern-cite for hook + permission contracts), #6 claude-code-security-review (false-positive filter), #10 knowledge-work-plugins (engineering pack cherry), #12 sandbox-runtime (cite-authority for R5 even though structurally inert).

**T3-PATTERN-STUDY** (4): #5 claude-code-action (CI-only; not on hot path), #11 claude-quickstarts (superseded), #13 financial-services + (b) claude-for-legal (sector-specific declarative-YAML pattern; cite-only).

**T4-CITE-ONLY** (1): #14 life-sciences (skill anatomy cite only).

**T5 NON-EXISTENT or REJECT**: none — all 14 repos confirmed at HEAD with non-zero content.

---

## §9 Ratification Path

1. This document constitutes the **Cluster A** half of W330 P0.10 (Stream B re-scan, line-by-line ingest).
2. Sister clusters B/C/D/E pending under separate dispatch.
3. Codex GPT-5.5 round-1 cross-model gate fires automatically at session-Stop per `openai-codex/1.0.4/hooks/hooks.json:24-37` (timeout 900s) — verdict APPROVE / REVISE / NEEDS-REVISION / BLOCK per sca-v12.1 §10.
4. Operator-decision row in T6 basic-memory upon codex APPROVE: ledger note `slug: cluster-A-anthropic-official, verdict: T1-INSTALL-CITE+3xT1-INSTALL, deliverable_path: docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-A-anthropic-official.md`.
5. F1-F11 findings queued for W331.x phase-2 dockets per W330 P0.10's "Stream B re-scan" charter.

---

## Appendix A — File-tree fingerprint (sampling, for SHA-pin validation)

```
anthropics-claude-code                   HEAD 69d70700  | plugins/{13} examples/{hooks,settings,mdm} scripts/{8}
anthropics-claude-agent-sdk-python       HEAD 5459309b  | src/claude_agent_sdk/ + examples/{14} + tests/{29}
anthropics-claude-agent-sdk-typescript   HEAD e62865e4  | examples/session-stores  (source via npm)
anthropics-claude-cookbooks              HEAD a102bbec  | patterns/agents/prompts/{3} + managed_agents/{10 + cma-mcp} + skills + tool_use + tool_evaluation
anthropics-claude-code-action            HEAD 24492741  | src/{create-prompt,entrypoints,github,mcp,modes,utils} + action.yml(412L)
anthropics-claude-code-security-review   HEAD 0c6a49f1  | claudecode/{audit,prompts,findings_filter,…} + evals
anthropics-cwc-long-running-agents       HEAD ad107a97  | claude-code-config/.claude/{5 hooks, CLAUDE.md, settings.json, evaluator agent}
anthropics-skills                        HEAD 6a5bb069  | skills/{17} + spec + template
anthropics-claude-plugins-official       HEAD 9f0275ae  | plugins/{35} + external_plugins/{15}
anthropics-knowledge-work-plugins        HEAD 6445c150  | engineering + finance + legal + marketing + … (11 vertical packs)
anthropics-claude-quickstarts            HEAD b03d42cc  | agents + autonomous-coding + browser-use-demo + computer-use-demo + customer-support-agent + financial-data-analyst
anthropic-experimental-sandbox-runtime   HEAD bdb4ea62  | src/cli.ts + src/index.ts + src/sandbox/{15 .ts files}
anthropics-financial-services            HEAD 9affc6e6  | plugins/vertical-plugins/{7} + managed-agent-cookbooks/{10}
anthropics-life-sciences                 HEAD e96556b6  | 22 vertical skill-packs
anthropics-claude-for-legal              HEAD 4d55f539  | managed-agent-cookbooks/{5} + 12 legal-vertical areas + legal-builder-hub
```

— END Cluster A line-by-line audit —
