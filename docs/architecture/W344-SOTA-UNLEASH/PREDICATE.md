# W344-FULL-SOTA-UNLEASH — Full Goal Predicate (source-of-truth)

> /goal predicate has 4000-char limit; this is the unabridged source-of-truth referenced from the tight /goal version.

## Wave envelope

- **Branch**: w344-sota-unleash on git worktree at Z:/claude-sota-installed-W344 (per CLAUDE.md L14 W280d — one-worktree-per-session safety)
- **Budget**: Opus 4.7 + GPT-5.5 unlimited
- **Mandate**: AGENT-TEAM REQUIRED ≥6 Agent calls in ONE message (Orchestrator-Worker per Δ-G49)
- **Quality gate**: every stream MUST pass codex GPT-5.5 R2-or-better APPROVE pre-merge
- **No-self-invent**: every fix grounded in cited SOTA-repo line OR upstream cookbook adaption

## P0 SHIP-BLOCKERS

- **P0.1** R4 cross-prompt false-acquit fix in `tools/preagent-parallel-guard.mjs` — scope tick evidence to current user prompt via `state.intentSetTs` lower-bound cutoff OR clear tick-dir in `parallel-guard-userpromptsubmit.mjs`. Acceptance: codex R5+ APPROVE + 50-iter cross-prompt-boundary stress test PASS.
- **P0.2** `parallel_ratio` re-measure post-bd25142 ≥7d traffic; record at `.claude/state/parallel-ratio-W344.json` with expected uplift toward ≥0.05 gate.
- **P0.3** alirezarezvani MARKETPLACE-DELETE execution (operator-sign captured inline) — `rm -rf .claude/plugins/marketplaces/claude-code-skills .claude/plugins/cache/claude-code-skills`; update settings.json + `/reload-plugins` verify.
- **P0.4** Hidden-error + silent-fallback sweep across `.mjs|.py|.ps1` — grep `catch { /* */ }` + swallow-without-log + `exit 0` advisory-without-binding; codex-reviewed surgical fixes.
- **P0.5** Insights-feature parity audit vs CCBP — clone Anthropic/claude-code-best-practice-shan; wire missing surface (`ctx_insight` dashboard + session-report) as upstream-skill adoption.

## P1 SOTA REPO LINE-BY-LINE INGEST (11 named repos; ≥3 MCP-family per repo)

- **P1.1** anthropics/claude-cookbooks @ HEAD — `orchestrator_workers.ipynb` + `research_lead_agent.md` + `citations_agent.md`; pin SHA in skill cite-anchors
- **P1.2** anthropics/claude-code @ HEAD — official CLI source; compare runtime behaviors; identify any silent-fallback shim my runtime adds beyond upstream
- **P1.3** wshobson/agents — agent-templates + comprehensive-review + context-management + agent-teams; verify plugin install vs HEAD; per-primitive Y/N adoption ranking
- **P1.4** addyosmani/agent-skills — 5 skills; verify SHA-pin vs HEAD a28cd96b
- **P1.5** mksglu/context-mode — verify ctx_insight + ctx_doctor + ctx_purge surfaces; cross-check vs ECC plugin behavior
- **P1.6** OthmanAdi/planning-with-files — verify multilingual variants (ar/de/es/zh/zht) present + active
- **P1.7** abhigyanpatwari/GitNexus — DECISION GO/NO-GO per sca-v17 trust-tuple (currently pattern-study only via local-cypher-codebase skill)
- **P1.8** alirezarezvani/claude-skills — close in P0.3 then archive PATTERN-ONLY learnings
- **P1.9** mattpocock/skills — vendor-fork @ d54c497aa944; verify SHA + diff against HEAD
- **P1.10** CCBP — current cite HEAD a28cd96b; re-probe HEAD + update CLAUDE.md L3 chain if drifted
- **P1.11** ECC plugin source — full audit; reconcile installed-skills view; identify load_failures or shadowed skills

## P2 RESEARCH ARCHITECTURE META-UPGRADE

- **P2.1** sca-v16 → sca-v17: +D81 multi-angle MCP convergence (≥4-distinct-MCP-family-cite); 3-org-distinct: NIST AI 600-1 MEASURE-3.1 + OSSF Scorecard + Anthropic research_lead_agent.md
- **P2.2** +D82 low-stars-but-high-quality rule: pattern-density (D12) override allows T2-CHERRY tier for repos <500★ when pattern-density ≥2 + ≥3-org-distinct cite + active maintainer
- **P2.3** +D83 decision-impact-tier dim: each candidate scored on (install / pattern-study / cite-only) + which arch layer (L1-L10) touched
- **P2.4** Research-meta repo discovery: ingest 3 research-arch repos (lastmile-ai/mcp-agent + microsoft/autogen + langchain-ai/langgraph supervisor)
- **P2.5** Effectiveness telemetry: instrument sca-v17 decisions with measure-after-N-waves outcome tracking

## P3 RUNTIME ECOSYSTEM SOTA SWEEP

- **P3.1** Node.js v22.22.0 — ingest awesome-nodejs + nodejs.org/docs/v22 + tc39/proposals; cookbook-adapt 5+ patterns (native test runner, --watch, permissions model)
- **P3.2** Git Bash + PowerShell ecosystem — microsoft/PowerShell docs + Git for Windows release notes; verify Bash + pwsh invocation parity
- **P3.3** Docker + CLI tools — ingest docker/cli + awesome-cli; flag missing CLI primitive vs runtime tools/
- **P3.4** GitHub CI/CD — ship `.github/workflows/*.yml`: codex-review-gate + pre-commit-mirror + parallel-guard-stress + sca-decision-audit + skills-trigger-eval. Anchor: actions-runner-controller + github/super-linter + reviewdog

## P4 HOOKS + ORCHESTRATION DEEP AUDIT

- **P4.1** Hook full audit per Anthropic hooks doc + claudekit hook-metadata-discipline skill
- **P4.2** Agent-team orchestration silent-fallback hunt: synthetic team-spawn + monitor empty_final_message + worker-exception + dispatch-fail
- **P4.3** SubagentStop hook audit: ensure transcript-marker loop-guard pattern present
- **P4.4** PostToolUseFailure visibility: extend matcher to Edit|Write|MultiEdit failures so linter-revert events surface

## P5 STALE-REFERENCE + LOW-QUALITY CLEAN-UP

- **P5.1** grep all `.md` for cite-anchors with stale SHAs (CCBP / claude-cookbooks); refresh to HEAD
- **P5.2** Audit `.claude/skills/*/SKILL.md` for ad-hoc triggers OR ≥50% sibling-trigger overlap; retire or merge
- **P5.3** grep `.mjs/.py/.ps1` for TODO|FIXME|XXX >30d; close or escalate
- **P5.4** Sweep `tmp/` + `.claude/state/` + state-outside-repo for >30d orphans; archive or delete

## P6 FUTURE-SESSION ENFORCEMENT

- **P6.1** Add CLAUDE.md rule: concurrent-session collision protection (worktree-per-session per W280d)
- **P6.2** Add pre-commit gate: warn-and-block if dirty main worktree + concurrent worktree on same branch
- **P6.3** Ship `.claude/skills/session-handoff/SKILL.md` codifying W343 cherry-pick recovery pattern

## Mandates

- W269 ≥6 Agent calls in ONE message (P0 + P1 + P2 + P3 + P4 + P5 streams)
- Codex GPT-5.5 task --effort high APPROVE required pre-commit (W335; BOOTSTRAP forbidden for code changes — only documented R-iterations)
- Cardinal-rules CR-1..CR-6 hold; self_invented_count=0 strict; CLAUDE.md ≤50 LOC ceiling
- Δ-DPA-1 skeleton-first + Δ-DPA-2 budget 140k/15-call + Δ-DPA-5 FQN-validated subagent_type
- Verify-before-claim (CR-6): file:line OR command stdout OR codex verdict
- Multi-angle MCP convergence MANDATORY: every P1 repo ingest uses ≥3 distinct MCP families
- GPT-5.5 GitHub GraphQL access for repo enum + deepwiki/repomix for line-by-line ingest

## Report/Ship

- Each closure → VERDICT-LEDGER row at `docs/architecture/W344-SOTA-UNLEASH/` + T6 basic-memory write (`verdicts/W344/`)
- Conventional commit: `feat(w344): full-sota-unleash close — P0.1-5 + P1.1-11 + P2.1-5 + P3.1-4 + P4.1-4 + P5.1-4 + P6.1-3`
- Update CLAUDE.md runtime state metrics + carry-forward delta
- Re-run codex final-round APPROVE on full wave commit

## STOP clause

CLAUDE.md ≤50 LOC. No --no-verify. No silent fallback. W345 carry-forward requires explicit DWELL-CLASS annotation per ops-rhythm.
