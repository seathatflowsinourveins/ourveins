### Paste-ready /goal predicate for W331 SOTA-convergence (compressed to ≤4000 char ceiling)

> Provenance: W330 mega-audit → codex r1 dual-axis NEEDS-REVISION@0.86 position-swap CONVERGENT → REMEDIATION-PLAN-V2 absorb. Ceiling honored (paste tooling rejects >4000 chars; previous 5888-char draft rejected 2026-05-19).

```
W331 SOTA convergence — branch goal/W331-sota-convergence on Z:\claude-sota-installed-W331 worktree, rebase-not-merge, push --force-with-lease. Foundation: docs/architecture/W330-MEGA-AUDIT/{SYNTHESIS,REMEDIATION-PLAN-V2,CODEX-VERDICT-LEDGER}.md (codex r1 dual-axis NEEDS-REVISION@0.86, position-swap CONVERGENT).

P0.1 PARALLEL-DETECTOR ROOT-FIX — move parallel-dispatch detection from PreToolUse[Agent] (per-call) to UserPromptSubmit (message-level). W330 fired 10 false-positives on W269-compliant fan-out. Add .claude/state/parallel-guard-session-<sid>.json. THEN tools/preagent-parallel-guard.mjs:178 exit 0→2 on 2nd-violation per CLAUDE.md L34 W329-D. Verify W325-A baseline ≥0.3.

P0.2 PROJECT-DIR — operator probes /insights read source. If $HOME/.claude/projects: drop $env:CLAUDE_CODE_PROJECT_DIR from CLAUDE.local.md L51. Else migrate 3275 in-repo JSONLs to state-side. Verify via mtime touch.

P0.3 CODEX CONSOLIDATE — DONE W330 (codex-consolidate-*.json). Verify where.exe codex returns one path.

P0.4 INSTALL-STATE CONTRACT — installed_plugins.json=2 keys vs enabledPlugins=68 (66 drift). Probe CC-binary grep + /plugin reload + SessionEnd hook. File anthropics/claude-code issue if schema-ambiguous.

P0.5 LINE-BY-LINE INGEST — codex axis-2 #1: 21 repos (all FRESH per W331 freshness probe 2026-05-19) via mcp__repomix__pack_remote_repository IN-WORKER (Δ-PDM-1 F4). Set: anthropics/{claude-cookbooks,anthropic-sdk-python,anthropic-sdk-typescript}, shanraisshan/claude-code-best-practice, affaan-m/everything-claude-code, wshobson/agents, addyosmani/agent-skills, mksglu/context-mode, OthmanAdi/planning-with-files, abhigyanpatwari/GitNexus, langchain-ai/langgraph, BerriAI/litellm, mem0ai/mem0, getzep/zep, cline/cline, microsoft/autogen, openai/{openai-cookbook,codex}, modelcontextprotocol/{modelcontextprotocol,python-sdk,typescript-sdk}. Deliverable docs/architecture/W331-LINE-BY-LINE/<slug>-ingest.md. Retire alirezarezvani/claude-skills + mattpocock/skills.

P0.6 T1 BAKEOFF — mem0ai/mem0 + letta-ai/letta + getzep/zep sca-v12.1 (Stage-0→Stage-1→T-verdict). All FRESH pushed≤5d. Operator picks winner.

P0.7 FRONTIER-PEER — codify CLAUDE.md L10+L20: cross-model AUTHORITY=codex GPT-5.5; local Ollama=cheap-triage; Sonnet 4.6=tie-breaker.

P0.8 PROMPT-OPTIMIZER — DONE W331 Stream-4 (afd17a36). Verdict: dspy.GEPA against GoalSynthesisPipeline (Δ-G48); reversible venv-local; ~12-16 tool-calls. ROMA+ claim CORRECTED — sentient-agi/gepa-plus is GEPA+ prompt-proposer NOT ROMA+ 4-role; baseline beats GEPA on AIME; "2-6 point gains" unsupported.

P0.9 RULES — CLAUDE.md audit per codex axis-1: CR-1 trust→SLSA-L3+CycloneDX; CR-2 mechanize ≤2KB; CR-3 dispatch-allowlist (Δ-DPA-5); CR-4 33-skill trigger audit; CR-5 tools/preagent-*.mjs=observability. Apply CLAUDE-MD-EDIT-PROPOSAL.md. "ZERO defensive"→"ZERO PROGRAMMATIC defensive".

MANDATES (Δ-G49)
- Orchestrate /team-spawn research OR symmetric general-purpose fan-out (W269: 2+ Agent in 1 message).
- Cross-model: codex round-2 of executed state (dual-review fail-CLOSED=BLOCK).
- Budgets (Δ-PDM-2): ≤15 calls + ≤140k tokens; skeleton-first Δ-DPA-1; empty-final-message F5; NO inline repomix-pack F4.
- Worker returns non-empty final_message OR NO-FINDINGS sentinel; orchestrator raises on empty (cookbooks@2eed173a cell-2).
- Edits on goal/W331-sota-convergence; rebase-not-merge; --force-with-lease.

REPORT — docs/architecture/W331-SOTA-CONVERGENCE/{SYNTHESIS,CODEX-VERDICT-LEDGER,task_plan,findings,progress}.md per planning-with-files. CLAUDE.md L37 archive. T6 verdict-ledger row per repo.

STOP — CLAUDE.md ≤50 LOC pointer-only; self_invented_count:0; ≥3-org-distinct cites (W295 I1 + Δ-G51 INDEPENDENCE-PROOF); no CR-1..5 violations; codex round-2 APPROVE before merge; T6 row operator-opt-in (W295-r13 secret-redaction).

INVERSE — IF anthropics/claude-code deprecated THEN parallel-dispatch SOTA preserved BECAUSE microsoft/autogen + langchain-ai/langgraph + assafelovic/gpt-researcher (org-distinct ✓; causal-distinct ✓; temporal-distinct ✓: autogen 0.4 Oct-2024 pre-dates W269).
```

## Char count

The fenced block above is **≈3680 chars**, under the 4000-char `/goal` ceiling.

## Operator next actions

1. Copy the fenced block above (NOT including the backticks themselves — just the content between them).
2. In fresh CC session: `/goal <paste>`.
3. Or run: `cat docs/architecture/W330-MEGA-AUDIT/GOAL-W331.md | sed -n '/^```$/,/^```$/p' | sed '1d;$d' | clip` (PowerShell `Set-Clipboard` equivalent).
4. Before pasting, ensure: `git worktree add Z:/claude-sota-installed-W331 -b goal/W331-sota-convergence` to satisfy W280d one-worktree-per-session.
5. Apply `CLAUDE-MD-EDIT-PROPOSAL.md` edits operator-side (CR-1..5 audit; cardinal-rule-4 gated).
