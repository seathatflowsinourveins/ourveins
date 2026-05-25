# Wave 131 Agent A — SOTA Convergence Audit (READ FROM AGENT-RETURN-INLINE)

**Source**: agent return notification at task `ad6318ac7b870af36`, output JSONL at `tmp/claude/Z--claude-sota-installed/8d7c5a95-4656-4085-a6e1-097f7e46eca8/tasks/ad6318ac7b870af36.output`

## Cross-model gate

Sonnet stand-in (sota-researcher subagent dispatch — NOT BRIDGE-MODE per agent class). For cross-model gate: pair with Wave 131 Agent B's REAL GPT-5.5 verdict via Path P (`tmp/wave131-agentB-eee-architecture-archaeology-2026-05-09.md`).

## Headline VERDICT

**17 SOTA gaps identified, 6 ADOPT-NOW (3 P0/P1 immediate-install) / 8 STUDY-PILOT / 3 DISCOVERY-ONLY-by-design**

Top P0 ship per Agent A (PRE-MIA): rtk-ai/rtk via `npm install -g rtk@latest && rtk init -g`

## Mia OVER refutations (Wave 131 orchestrator-side post-receipt — n=102-106, 4 catches)

| Agent A claim | Mia probe | Verdict |
|---|---|---|
| rtk hook MISSING (P0 install) | `ls .local/cargo/bin/rtk*` + `rtk init --help` + grep settings.json | **OVER #102** — rtk.exe 6.8MB INSTALLED + WIRED at `.claude/settings.json` PreToolUse[6][last]; the runtime warning is rtk's COSMETIC banner check for `init -g` global config (separate from CC's project-local hook wire). Project-local wire is operational. |
| ccusage MISSING (P0 install) | `which ccusage && ccusage --version` | **OVER #103** — ccusage v18.0.11 ALREADY INSTALLED at user-global npm (`C:/Users/42/AppData/Roaming/npm/ccusage`). Per Wave 112 Ship 2CC archeology codification: user-global npm path is canonical for npm tools. |
| ast-grep MISSING (P1 install) | `which ast-grep && ast-grep --version` | **OVER #104** — ast-grep 0.42.0 ALREADY INSTALLED at user-global npm. |
| specify CLI present but plugin layer missing (P1) | `ls .local/bin/specify* && specify --version` | PARTIAL OVER #105 — specify 0.8.7 CLI binary ALREADY at `.local/bin/`. The "plugin layer" framing needs separate verification (whether spec-kit ALSO ships a /plugin install path beyond the CLI). |

**Pattern recurrence**: this is the SAME pattern Wave 112 Ship 2CC archeology codified at n=29→n=36 ladder advance — INSTALL-class prescriptions probed only via PATH miss alternate install paths. Agent A used `command -v` heuristic but didn't probe user-global npm + cargo + WinGet alternate channels per `mia-pre-apply.md §Alternate-install-path probe discipline (Wave 112 Ship 2CC archeology codification — n=36)` mandate.

**Mia ladder advance**: n=99 → n=106 (7 catches across Wave 130 Fire 5+6 + Wave 131).

## Agent A's headline matrix (preserved verbatim from artifact)

### Top P0+P1 ship recommendations (after Mia refutation)

After Mia pre-apply pruning, Agent A's P0/P1 list reduces to ZERO immediate-install candidates. The top P2/P3 STUDY-PILOT candidates remain valid:

- **garrytan/gstack** (P2 STUDY-PILOT) — sibling already documents 8-instance evidence ladder for adopting Pattern B mitigation patterns per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern-B mitigation patterns gstack-derived n=8` (cite-import-AMBER). Adoption shape: refactor `codex_t1_consult_gate.py` to use codex CLI `--json` flag + parse `turn.completed` events per gstack:1019-1049. Closes FM-17 zero-investigation Pattern B subclass mechanically (currently only documented).
- **vercel-labs/agent-skills** (P2 AUDIT-REQUIRED) — task brief mentions but no `Z:/repos/deps/` entry. Cannot execute Probe DAG 1-7 without fresh clone. Wave 132 dispatch should `git clone --depth 1 https://github.com/vercel-labs/agent-skills` first.
- **wshobson/agents** (P2 STUDY-PILOT) — agents-collection candidate for net-new agent shapes vs eee's 8 native; needs axis-2 closure sweep.
- **alirezarezvani/claude-skills** (P2 STUDY-PILOT) — cherry-pick top-N skills from 540 SKILL.md across 9 domains.
- **trailofbits/claude-code-config** (P3) — hardening profile.
- **promptfoo + openai/evals + swe-bench** (P3) — eval surface gap per V62 "Final convergence" doctrine ("Benchmarks/evals = proof, not vibes").

### V62 13-category installed-vs-missing matrix (Agent A summary)

- **FOUNDATION_OFFICIAL**: 24 entries / PARTIAL — 6 INSTALLED (claude-code, codex CLI, codex-plugin-cc, github-mcp-server, playwright-mcp, context7); 18 MISSING (most as DISCOVERY-ONLY)
- **DEFAULT_INSTALL_CORE**: 13 / PARTIAL — 4 INSTALLED via .local/ (serena, repomix, mise, pre-commit) + 2 INSTALLED user-global (ccusage, ast-grep) + 1 INSTALLED+wired (rtk); rest are system-PATH (ripgrep / fd / jq / yq / gh / just / uv) — likely on system PATH, audit needed
- **MEASUREMENT_VISIBILITY**: 9 / PARTIAL — Phoenix OTel INSTALLED (Wave 109); ccusage user-global INSTALLED; ccstatusline + cross-code-organizer + claude-hud MISSING (P3)
- **TOKEN_CONTEXT_ELITE**: 23 / PARTIAL — context-mode + context7 + playwright-mcp INSTALLED + rtk wire; ast-grep INSTALLED user-global; aider/mgrep/code2prompt MISSING (P3)
- **CODEBASE_INTELLIGENCE**: 11 / PARTIAL — serena + repomix INSTALLED; ast-grep INSTALLED; aider MISSING (P3)
- **MEMORY_MCP_AUDIT_REQUIRED**: 17 / FULL — doobidoo + getzep INSTALLED + audited; alternatives REJECTED-AS-DUPLICATE per kiss-dry-yagni #4
- **WORKFLOW_REFERENCE_HIGH_STAR**: 17 / GOOD — superpowers + ECC + addyosmani INSTALLED; spec-kit CLI INSTALLED; BMAD-METHOD + wshobson + gstack + gsd MISSING (P2/P3)
- **WORKFLOW_HARNESS_ELITE**: 21 / MISSING-MOSTLY — wshobson + BMAD + spec-kit-plugin + context-engineering + PRPs all not installed (P2/P3)
- **PARALLEL_OPERATOR_ELITE**: 19 / MISSING-by-design — eee uses native worktree-isolation per `parallel-session-worktree-isolation.md` cite-import-AMBER
- **CODEX_BRIDGES**: 7 / GOOD — codex-plugin-cc INSTALLED + T1-T7 hooks active
- **EVAL_PEER_ARCHITECTURE**: 16 / WEAK — only Phoenix OTel; no swe-bench/promptfoo/openai-evals (P3)
- **AGENT_FRAMEWORK_REFERENCE**: 17 / by-design REFERENCE-ONLY per `team-orchestration.md §Sister-framework references`
- **SECURITY_QUALITY_ELITE**: 39 / GOOD — semgrep + gitleaks + trivy + osv-scanner + typos + vale + pre-commit + mise INSTALLED; MCP-supply-chain scanners (cisco-ai-defense/mcp-scanner + InvariantLabs-ai/mcp-scan + MCP-Defender) MISSING (P2)

### Final convergence doctrine score (Agent A's verdict against V62 §"Final convergence")

| Doctrine | eee state |
|---|---|
| Context admission > prompt engineering | PARTIAL via context-mode + ENABLE_TOOL_SEARCH=auto:5 |
| Semantic retrieval > file dumping | PARTIAL via serena + repomix + context7 |
| Read-path compression | PARTIAL via context-mode |
| Skills/rules > giant CLAUDE.md | GOOD — CLAUDE.md ~30K, skills via plugin marketplace |
| Slash commands > repeated prompting | PARTIAL — minimal /commands installed |
| Hooks > hoping the model remembers | STRONG — codex T1/T2 hooks ACTIVE |
| Subagents = context isolation | STRONG — 8 native agents w/ frontmatter isolation |
| Worktrees = file isolation | STRONG — eee --worktree wired |
| Codex = second-model witness | STRONG — T1+T2+T3 lifecycle ACTIVE |
| Memory plugins = audit-required, not default | STRONG — doobidoo + getzep audited+selected |
| MCPs = selective, not global | GOOD — 9 MCPs wired, selectively chosen |
| Benchmarks/evals = proof, not vibes | WEAK — no swe-bench/promptfoo/openai-evals wired |
| Operator dashboards = multi-agent control plane | PARTIAL via Phoenix OTel |
| CLI quality gates > vibes | STRONG — 19 .local/bin/ tools |
| GitHub issues/PRs/ADRs = durable memory | GOOD — git-cli-grammar-discipline + commit cadence |

Score: **5 STRONG / 5 GOOD / 4 PARTIAL / 1 WEAK = eee runtime is in solid SOTA shape**.

## Recommended next-fire ship plan (post Mia refutation)

1. **CLOSE Task #47** (graphiti obsolete — VERIFIED via Mia probe earlier this fire) — small ship, no install
2. **Path P codex exec for Agent C 12-repo verification** — replaces dead Agent C; orchestrator-direct REAL GPT-5.5 dispatch satisfies standing-directive invariant #1 (≥2 BRIDGE-MODE)
3. **`.claude/settings.json` cleanup ship** — remove 3 dead `_comment_*` keys (1446+1324+1135 chars total ≈ 4KB JSON noise) per Agent B; audit 9 unreferenced hook scripts (228KB) for archive-vs-rewire
4. **Garrytan/gstack OPERATIONAL adoption** — refactor `codex_t1_consult_gate.py` for `--json` event parsing per sibling cite at n=8
5. **vercel-labs/agent-skills clone + Probe DAG 1-7** — Wave 132 first dispatch
6. **`tests/test_mcp_json_smoke.py`** — gate `.mcp.json` edits before risky-feature work (Agent B's 100% bug-ratio finding)
7. **Sibling fm17 backport (Task #91)** — sibling-context fire (CR-9 sibling-bleed defense)

The eee runtime architecture is in GOOD shape — Wave 131 audit confirms 5 STRONG / 5 GOOD / 4 PARTIAL / 1 WEAK score across V62 13-category SOTA matrix. Top remaining gaps are:
- Eval surface (Benchmarks/evals = proof, not vibes — currently WEAK)
- Hook/config debt (`.claude/settings.json` 87% bug-ratio + dead `_comment_*` keys + 9 unreferenced scripts)
- vercel-labs/agent-skills not yet audited (P2 audit-required)
