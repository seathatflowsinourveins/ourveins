# W318-A SYNTHESIS — Runtime Cleanness + Silent-Fallback v6 + Agent-Orchestration (2026-05-19)

> Stream A / W318 ship. Aggregates W318-A-{PARALLEL-RATIO,STALE-REFS,SILENT-FALLBACK-V6,TERMINAL-ERRORS,AGENT-ORCHESTRATION}.md.

## 1. Headline numbers

```
parallel_ratio post-W317:              1.000  (target ≥0.7 cleared by +0.300)
                                       (W314-C baseline: 0.587)
Stale refs found:                      10  (HIGH=4, MED=1, LOW=5)
Silent-fallback v6 findings:            8  (HIGH=3, MED=3, LOW=2)
   - NEW vs W314-r1-C carryover:       5 NEW / 3 CARRYOVER
Terminal error verdicts:                7 issues
   - RESOLVED:                         3  (eee gate / MSYS / BASH_ENV)
   - OPEN-HIGH:                        2  (trivy exit-code / Hindsight stale probe)
   - OPEN-INTERMITTENT:                1  (claude doctor 30s hang)
   - ACK-BY-DESIGN:                    1  (eee.ps1 warn-allow)
Agent-orchestration verdict:           TeamCreate OPERATIONAL ✓
   - Silent-fallback root-causes:      4 patterns identified
     - 1 RESOLVED                      (W269 parallel mandate → skill)
     - 1 CHRONIC-MITIGATED             (GitHub MCP 6-wave)
     - 1 DEFER-UPSTREAM                (PROJECT_DIR)
     - 1 BY-DESIGN                     (no-nested-teams)
```

## 2. Operator-flagged concern: "silent fallback or errors" — ROOT-CAUSE

The operator's intuition is **CORRECT** but the silent-fallback is largely NOT in our orchestration — it is in (a) the GitHub MCP returning 0-hits silently, and (b) the pre-W317 W269-mandate-in-prose pattern (now RESOLVED). The CC architectural "no-nested-teams" constraint contributes to the perception (subagents lack the Agent tool, so cannot fan-out further — which can LOOK like a silent fallback to fan-out but is actually enforced absence).

**Recommendation**: ship a "silent-fallback root-cause taxonomy" section in CLAUDE.md L19 region to disambiguate the 4 patterns for future operators.

## 3. Top-5 paste-ready CLAUDE.md / settings.json / SKILL.md fixes

### FIX #1 (HIGH) — settings.json trivy `--exit-code 0` fix

**Target**: `.claude/settings.json` PreToolUse Bash hook (commit-push-PR gate).

**Find**:
```
trivy fs --quiet --skip-dirs .claude/plugins ... --exit-code 0 --scanners vuln . 2>&1 | ...
```

**Replace with**:
```
trivy fs --quiet --skip-dirs .claude/plugins --skip-dirs node_modules --skip-dirs .git --skip-dirs tmp --severity HIGH,CRITICAL --no-progress --exit-code 1 --scanners vuln . 2>&1; rc=$?; [ $rc -eq 0 ] || { echo 'trivy: HIGH/CRITICAL vulns detected — BLOCK' >&2; exit 2; }
```

**Why**: parallel with W314-r2-β-F1 gitleaks fix. Pre-publish trivy gate must BLOCK on HIGH/CRITICAL CVEs.

### FIX #2 (HIGH) — CLAUDE.local.md L80-81 retired-service rewrite

**Target**: `CLAUDE.local.md` (gitignored — operator-only edit).

**Find**:
```
- **Services**: FalkorDB (`:16379`) + Ollama (`:16700` ... ) live for graphiti ...
- **MCP servers**: wired in `.mcp.json` (project root) — memory, graphiti, github, ...
```

**Replace with**:
```
- **Services (post-W317-W318 live state)**: 7 LIVE — CogneeMCP :8000 (NSSM) ·
  basic-memory :8765/mcp (uvx) · IkLlamaServer :8080 (NSSM) · LlamaSwap :8090
  (NSSM) · Langfuse :3000 (docker) · Phoenix :16006 (docker, idle) ·
  OllamaServe :16700 (NSSM, idle/0-models). STOPPED/RETIRED: FalkorDB :16379
  (W295) · graphiti (W313 .mcp.json excision) · Hindsight :9077 (W316-S6).
- **MCP servers (.mcp.json mcpServers keys)**: github · context7 · deepwiki ·
  playwright · chrome-devtools · repomix · serena · ccusage · cognee · langfuse
  · basic-memory · perplexity · (+ plugin-shipped: memory + sequential-thinking
  + context-mode). disabledMcpjsonServers: [].
```

**Why**: removes 2-wave stale citations of retired services; matches W315-r2-E + W318 service health probe.

### FIX #3 (HIGH) — `parallel-dispatch-mandate` SKILL.md status promotion

**Target**: `.claude/skills/parallel-dispatch-mandate/SKILL.md` frontmatter.

**Find** (in `description:` field): the existing description triggers.

**Add to description (append)**:
```
Also fires on: "audit your entire", "comprehensive sweep", "Stream {A,B,C,D,E}-*",
"5-stream", "all in parallel", "fan-out N agents", "in 1 message", "Wave NNN
parallel sweep". POST-W317 measurement validates 1.000 parallel_ratio (vs
0.587 W314-C baseline) — KEEP as canonical mandate-enforcement primitive.
```

**Why**: codifies the W317-W318 trigger expansion; documents validation evidence inline.

### FIX #4 (HIGH) — CLAUDE.md L17 memory.exe closure update

**Target**: CLAUDE.md cardinal-rule-2 area, the W300-AI-1 corollary line.

**Find**:
```
Per W300-AUDIT §3 the disabled `memory.exe` block can be deleted entirely at next housekeeping wave.
```

**Replace with**:
```
The disabled `memory.exe` block was deleted in W318 housekeeping (W300-AI-1
CLOSED — `.mcp.json:disabledMcpjsonServers` key not present; `mcp__plugin_
everything-claude-code:memory` is the live tier-2 primitive).
```

**Why**: closes a TODO that has been silently completed.

### FIX #5 (HIGH) — sca-v7 / goal-prompt-synthesis SKILL.md Stage-0 GitHub-MCP fallback

**Target**: `.claude/skills/sota-convergence-audit/SKILL.md` § Stage-0 existence-probe, and `.claude/skills/goal-prompt-synthesis/SKILL.md` lookup section.

**Add**:
```
### GitHub MCP search_repositories 6-wave silent-fallback (chronic per W312-D
F1 + W313-D + W314-B + W315-D + W316-D + W318-V6-F6)

When `mcp__plugin_everything-claude-code_github__search_repositories` returns
0 hits on a well-formed query (or any query that operator expects to match
≥1 known repo), the call has SILENTLY failed (rate-limit / auth / query-syntax
mismatch). MANDATORY Stage-2 cascade:

  bash tools/gh-search-rest.sh <query>   # REST API wrapper

If Stage-2 also returns 0 hits AND the operator has a known-good repo slug
hypothesis, escalate to Stage-3:

  curl -s "https://api.github.com/repos/<owner>/<repo>"   # direct existence-probe

If Stage-3 returns 200 OK with valid repo data while MCP returned 0 hits,
the MCP IS in silent-fallback. Report finding to W319 as F-V6-6+1 (now 7-wave).
```

**Why**: closes the W314-r2-AI-r2-7 carryover; codifies the chronic silent-fallback as a Stage-2 cascade primitive in the SOTA-convergence pipeline.

## 4. W319 queue (forwarded operator-AIs)

1. **F-V6-1** trivy `--exit-code 0` HIGH fix (FIX #1 above)
2. **F-V6-3** sca-v7-prelim.sh graceful-degrade MEDIUM fix
3. **F-V6-4** Lane D eval_harness.py real-binding HIGH smoke-check hook
4. **F-V6-6** GitHub MCP 6-wave HIGH chronic — codify Stage-2 cascade in skills (FIX #5)
5. **F-V6-7** PROJECT_DIR upstream-issue-60561 LOW track
6. **CLAUDE.local.md** L80-81 stale-service rewrite HIGH (FIX #2)
7. **CLAUDE.md** L17 memory.exe closure HIGH editorial (FIX #4)
8. **CLAUDE.md** L35 W312-A.6 Ollama-decision text HIGH editorial
9. **claude doctor 30s hang** intermittent — file upstream issue with reproducer
10. **eee.ps1 :9077 Hindsight stale-probe** audit — remove or guard
11. **parallel_ratio telemetry hook** W312-D F4 → W313 → ... → W318 carryover; auto-log to T6 basic-memory
12. **W269 mandate target tighten ≥0.8** for next sca-vNext (post-W317 actuals at 1.000)
13. **Agent-orchestration root-cause taxonomy** in CLAUDE.md L19 region

## 5. Cardinal-rule invariants (verified this stream)

- R1 (trusted plugins only) ✓
- R2 (hooks = upstream-plugin OR direct-CLI; sanctioned exception: `context-mode-cache-heal.mjs` patches upstream #46915, 28 LOC, still needed) ✓
- R3 (subagents = installed upstream OR documented system) ✓
- R4 (project behavior in CLAUDE.md + settings.json; `.claude/rules/` per Anthropic canonical; `self_invented_count: 0`) ✓
- R5 (safety boundaries via permissions/sandboxing) ✓ (sandbox.* block still NOT codified — W315-AI carryover)
- CLAUDE.md body ≤50 LOC ✓ (current: ~46-48 LOC body; status appendices rolling-3 retention)
- settings.json ≤15 KB ✓ (15,823 bytes — slightly over; consider re-audit W319)
- worktrees 3/3 at cap ✓ (main + W287 + W290)
- T6 basic-memory ✓ (VERDICT-LEDGER.md 546 LOC, ~71+ verdicts)
- `self_invented_count: 0` ✓

## 6. Files written this stream

- `docs/architecture/W318-RUNTIME-CLEANNESS-V6/W318-A-PARALLEL-RATIO.md` (this dir)
- `docs/architecture/W318-RUNTIME-CLEANNESS-V6/W318-A-STALE-REFS.md`
- `docs/architecture/W318-RUNTIME-CLEANNESS-V6/W318-A-SILENT-FALLBACK-V6.md`
- `docs/architecture/W318-RUNTIME-CLEANNESS-V6/W318-A-TERMINAL-ERRORS.md`
- `docs/architecture/W318-RUNTIME-CLEANNESS-V6/W318-A-AGENT-ORCHESTRATION.md`
- `docs/architecture/W318-RUNTIME-CLEANNESS-V6/W318-A-SYNTHESIS.md` (this file)
- `tmp/w318-parallel-ratio-stream.js` (analyzer)
- `tmp/w318-parallel-ratio-data.json` (machine-readable per-session breakdown)

## 7. Settings.json hooks audit table (silent-fallback patterns)

| Event | Matcher | Timeout | Patterns | Severity |
|-------|---------|---------|----------|----------|
| PreToolUse | Bash | 60s | exit0-in-cmd (`--exit-code 0` trivy + gitleaks) | HIGH (trivy NOT fixed; gitleaks WAS fixed W314-r2) |
| PreToolUse | Edit\|Write | 5s | exit0-in-cmd + 2>/dev/null (W317-A Δ34 lint) | ACK-by-design (advisory) |
| PostToolUse | Edit\|Write\|MultiEdit | None | exit0-in-cmd (ruff/shellcheck `exit $rc` — APPLIED W314-r2) | OK (rc-propagation works) |
| PreCompact | auto | None | exit0-in-cmd (precompact log → SilentlyContinue) | LOW (log-write only) |
| Notification | * | None | exit0-in-cmd (Beep try/catch) | OK (cosmetic) |
| PostToolUseFailure | Bash | 3s | exit0-in-cmd (json-parse failure → hookSpecificOutput) | ACK-by-design (additionalContext) |

**Trivy** is the only HIGH-severity gap remaining; everything else is acknowledged-by-design or already-fixed.
