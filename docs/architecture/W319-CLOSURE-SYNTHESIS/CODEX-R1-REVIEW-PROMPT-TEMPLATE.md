# W319 Codex Round-1 Review Prompt (Template — fill at synthesis time)

Per `goal-prompt-synthesis` SKILL.md §6.2 PowerShell pattern. Cross-model gate: must get `VERDICT: APPROVE` on first non-empty line before W319 ship-done.

## Fire Pattern (PowerShell — primary)

```powershell
$reviewPrompt = @"
You are performing a cross-model adversarial review of W319 ship commit <SHA>. Apply the W295 anti-bias gates per goal-prompt-synthesis SKILL.md §6.2.

CRITERIA (all must hold):
- W269 mandate: ≥2-stream → MUST use multi-agent (4/4 satisfied this wave)
- Cardinal rules R1-R5 hold (note R5 PARTIAL-HOLD carry-forward from W317-r2)
- Sca-v7.1 or v8.1-partial self-eval install_score ≥4.5 with margin (if sca-v8.1 partial-ship landed)
- Multi-MCP convergence ≥6 source families documented for any new candidate
- No new project-owned hook bodies (cardinal-rule-2)
- No new .claude/rules/* self-invents (cardinal-rule-4)
- SEV-1 Perplexity key remains UNROTATED per W319-SEV-1-INCIDENT carry-forward — verify no new pplx-* literal in diff
- CLAUDE.md L48-L50 cap invariants: ≤50 LOC body, ≤3 worktrees, self_invented_count: 0
- settings.json post-W318 budget: ~15,964B (W317 cap 15,360B exceeded by F-V6-1 trivy fix — W319 to confirm new budget)

DIFF CONTEXT:
<paste W319 ship-commit git diff here>

W319 STREAM FINDINGS:
- Stream A (orchestration audit): <summary>
- Stream B (multi-repo ingest): <summary>
- Stream C (research-arch v8.1 partial-ship): <summary + SKILL.md diff if any>
- Stream D (runtime cleanness v7): <summary>

OUTPUT FORMAT (REQUIRED):
Start your response with EXACTLY one of these literal markers on a single line:
- VERDICT: APPROVE
- VERDICT: REVISE (then list specific revisions needed)
- VERDICT: BLOCK (then explain why ranking must be re-done)

After the verdict line, provide a ≤500-word justification citing which CRITERIA you applied.
"@

# Resolve companion + fire:
$codexCompanion = "Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs"
$outputFile = "tmp/W319-codex-r1-output.txt"
node $codexCompanion task --effort high $reviewPrompt 2>&1 | Tee-Object -FilePath $outputFile

# Parse FIRST non-empty line:
$firstLine = (Get-Content -LiteralPath $outputFile) | Where-Object { $_.Trim() -ne '' } | Select-Object -First 1
if ($firstLine -match '^\s*VERDICT:\s*(APPROVE|REVISE|BLOCK)\s*$') {
    $verdict = $Matches[1]
    Write-Host "W319 codex-r1 verdict=$verdict"
} else {
    throw "First non-empty line not parseable — fail CLOSED"
}
```

## Plugin-Native Stop-Hook Backstop

Per `openai-codex/codex/1.0.4/hooks/hooks.json:24-37` the `stop-review-gate-hook.mjs` auto-fires on session-end (timeout 900s). If we fail to manually fire round-1 above, the Stop hook provides a backstop review at session-close.

## Round-N Iteration Pattern

If verdict=REVISE:
1. Read codex output for specific findings
2. Apply minimal closure-fix commit (e.g., `ship(W319-codex-r1): <finding> closure`)
3. Re-fire codex on the new HEAD
4. Iterate until verdict=APPROVE (typical: 1-3 rounds based on W316-r4 + W317-r2 + W318-r1 patterns)

If verdict=BLOCK:
- Critical bias or false-control identified
- Do NOT ship; re-do discovery + re-dispatch streams
- Pattern: W315-codex-r1 (NEEDS-REVISION → 4.461 vs 4.857 indeterminate denom) led to W316 full re-do

## Convergence Consensus Requirement (operator mandate)

Operator: "ship with convergence sota insights and e2e with gpt 5.5"
- Both Claude (orchestrator) AND GPT-5.5 (reviewer) MUST agree on findings before ship-done
- Cross-model gate is the operator's explicit consensus requirement
- A pure-Claude verdict is INSUFFICIENT — convergence-consensus mandate
