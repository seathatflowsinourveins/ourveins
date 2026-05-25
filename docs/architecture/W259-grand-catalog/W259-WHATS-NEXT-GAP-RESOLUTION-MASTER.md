# W259 — What's Next + Gap Resolution (MASTER — official-docs-grounded)

> **Date**: 2026-05-16 | **Sources**: W259-v12 official-docs audit · W259-v13 integration-paths Part1+Part2 · W259-v14 community-repo deep-dive · W259-GAP-RESOLUTION-PLAYBOOK
> Answers the operator question: *"what is next and what gaps need to be resolved."* Every item grounded in an official-doc / official-repo cite.
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION`.

## §0 — Where W259 stands

- **Synthesis**: complete (v1-v7) — 6,958-file catalog, 23-layer architecture, 144 repos × 23 dims, per-layer canonical benchmarks, 30 CC dimensions audited.
- **Execution**: v8-v15 applied — 4 hooks, Proactive style, harness, git GC; **v15 (2026-05-16)**: pre-commit security hook WIRED + verified, git tree consolidated to `main` + cruft gitignored. Record: `../07-final-synthesis/W259v15-GAP-EXECUTION-LOG.md`.
- **Audited**: v12 (W259's own claims vs official docs — runtime COMPLIANT) + v13 (every layer's repos vs their official docs) + v14 (named community repos).
- **Git**: 16 W259 commits, `main`==`HEAD`==`02cedde`, tree clean (2 deliberate untracked: `config.toml`, `bin/desktop-config-migrate.ps1`).

## §1 — CATALOG CORRECTIONS (official-docs contradictions found by v13/v14)

The W259 master scoring matrix's NATIVE-CC-PATHWAY (D11) dimension had errors — these repos DO have official CC integration paths the catalog recorded as "library only / no MCP":

| Repo | Catalog said | Official-docs TRUTH | Fix |
|---|---|---|---|
| **Langfuse** | "no MCP support" | **WRONG** — has an official MCP server | D11 ↑; observability MCP is installable |
| **pydantic-ai** | library only | Official CC **skill**: `claude plugin install ai@pydantic-skills` (marketplace `pydantic/skills`) | D11 ↑; add to L2.5 install path |
| **promptfoo** | one-flow pilot | **THREE** official CC paths: `ClaudeAgentSdkProvider` + `promptfoo-evals` skill + `promptfoo mcp` | D11 ↑ |
| **opik** | study-pilot | Official `opik-mcp` + CC OTel route | D11 ↑ |
| **vLLM** | T1-fallback library | Official `ANTHROPIC_BASE_URL` CC-backend path | note the CC-backend path |
| **foam** | markdown PKM | Official `@foam/mcp` server (license MIT-vs-NOASSERTION ambiguous — verify) | D11 ↑ pending license |
| **microsoft/agent-governance-toolkit** | D11=8 "T1 INSTALL" | **NO plugin.json / NO .mcp.json** — only GitHub Action + pre-commit + pip SDK | D11 ↓ to ~2; reclassify as CI-gate not CC-plugin |
| **addyosmani/agent-skills** | "DORMANT — 15 superpowers dups" | **WRONG** — TIER-2-practitioner, MIT, full plugin.json+marketplace.json, 22-skill SDLC suite; source-driven-development / context-engineering / doubt-driven-development are NOT superpowers dups | **Reclassify ACTIVE-selective, T1** |
| **litellm** | "Claude Code Plugin Marketplace" | proxy-side registry, NOT a CC plugin — integration is `ANTHROPIC_BASE_URL` env-redirect | wording only; install decision unaffected |

**Action**: these are D11-dimension corrections — apply to `MASTER-SCORING-MATRIX-W259.md` rows in a W260 rescore pass (documented here as the authoritative correction).

## §2 — INSTALL GAPS (prioritized, official-path-cited)

### P0 — STATUS (corrected against verified live state — W259-v15, 2026-05-16)
| # | Repo | Status | Note |
|---|---|---|---|
| G1 | **`pre-commit`** | ✅ **RESOLVED** | Never an install gap — `pre-commit` 4.6.0 already in `.local\bin`, `.pre-commit-config.yaml` already W135-authored+codex-reviewed. Real gap: the git hook was unwired (a redundant `core.hooksPath` blocked `pre-commit install`). **`.git/hooks/pre-commit` now wired + verified** — `gitleaks-system...Passed` on commits `e7315be`/`02cedde`. |
| G2 | **`gitleaks`** | ✅ **RESOLVED** | Already installed — `gitleaks` 8.30.1 in `.local\bin`, on PATH. The W259-v13 "not on PATH" claim was stale. |
| G3 | **`trivy`** | ✅ **RESOLVED** | Already installed — `trivy` 0.70.0 in `.local\bin`. L0.5 is **7/7** (gitleaks · trivy · pre-commit · ruff · shellcheck · semgrep · actionlint) — NOT "0/5". The W259-v13 "weakest layer" claim was stale. |
| G4 | **Hindsight** (`vectorize-io/hindsight-memory`) | ⚠ **RE-FRAMED — operator decision, not a gap** | Memory is already 2-system-covered: `memory` MCP (sqlite_vec, functional) + `graphiti` MCP (temporal-KG). A 3rd engine = W259 D20 duplication. Hindsight's distinct value is cross-subagent shared memory — a deliberate architecture choice. The real memory gap is **O1** (graphiti's down Ollama backend). |
| G5 | **`addyosmani/agent-skills`** | ◐ marketplace registered; plugin not installed | `addy-agent-skills` IS in `known_marketplaces.json`; no plugin installed from it yet. T1 ACTIVE-selective (v14). Clean `claude plugin install` when wanted. |

### P1 — official CC path exists, wire into the Agent-SDK harness
| # | Repo | Official path | Note |
|---|---|---|---|
| G6 | **`inspect_ai`** | official `sandbox_agent_bridge()` (proxy :13131) | L4 eval #1 (UK AISI); wire into `harness/eval_harness.py` |
| G7 | **`promptfoo`** | `promptfoo-evals` skill OR `promptfoo mcp` OR `ClaudeAgentSdkProvider` | the harness already has a `run_promptfoo_lane` stub |
| G8 | **`pydantic-ai` skill** | `claude plugin install ai@pydantic-skills` | L2.5 — official skill the catalog missed |
| G9 | **`gotalab/cc-sdd`** (v14 NEW) | SDD harness — pilot | spec-driven-development harness, score 85 |

### P2 — operator-judgment (shared-state / safety / demand-gated)
- **cognee re-add** — heavy shared-venv install (`Z:\venvs\claude`, 3 runtimes); graphiti already covers cold-tier KG. Re-add via self-starting stdio if adopted (playbook Gap A).
- **U2 permission flip** `bypassPermissions`→`auto` — `defaultMode:"auto"` in user/project-local settings.json IS valid+honored (W259-v12 F1 correction). Safety-posture call.
- **`foam` MCP** — official `@foam/mcp` server, but license MIT-vs-NOASSERTION ambiguous — resolve per cardinal-rule-1 before install.

## §3 — OPERATIONAL GAPS (wired but not functional / not exploited)

| # | Gap | Detail | Resolution |
|---|---|---|---|
| O1 | **Graphiti MCP non-functional** | MCP wired (stdio, FalkorDB) but its Ollama backend (`:11700`/`:11434`) is down → embeddings fail | Start Ollama + pull `qwen3-embedding:0.6b` per the graphiti entry's `--embedder-model` |
| O2 | **`claude --bg` unused** | W259-v8 documented background-sessions as the 4th parallel mode; zero built artifacts use it | Dispatch codex-review / nightly-eval as `claude --bg` sessions |
| O3 | **FM-catalog (L9) not built** | W259-v7 designed `.claude/fm-catalog/`; not created | Build it on the W259-v9 Agent-SDK harness |
| O4 | **CCBP cite-anchor stale** | local pin `48f2ceb` is **1 commit behind** upstream `ac0d87d` ("updated codex hooks") | `git -C Z:/repos/deps/claude-code-best-practice-shan fetch` + bump the pin in CLAUDE.md/CLAUDE.local.md (cardinal-rule-6 freshness) |
| O5 | **8-9 CCBP-secondary date-stamps UNVERIFIED** | W259-v12: mechanisms real, dates (Feb 5/17, Mar 25, Apr 8/9, May 7/8/12 2026) need a `release-notes/api` re-fetch | next-session primary-source re-probe |
| O6 | **T0.0 plugin-budget not executed** | `claude plugin details` now available (binary 2.1.143); 62% of installed skills dead-weight | run `claude plugin details` → ACTIVE/DORMANT/DISCOVERY-ONLY |

## §4 — WHAT'S NEXT — the prioritized punch list (W259-v15 corrected)

**Resolved in W259-v15** (2026-05-16): ~~G1 / G2 / G3~~ — pre-commit wired + verified, L0.5 confirmed 7/7; git tree consolidated to `main`, stale branch deleted, cruft gitignored (13→2 untracked).

**Operator-decisions** — each touches shared infra / safety / 3rd-party state; not autonomously executable:
1. **O1 — restore Graphiti** — start Ollama on `:11700` + `ollama pull qwen3-embedding:0.6b` → recovers the temporal-KG ingest tier. This is the *real* memory gap.
2. **Hindsight** — install only as a deliberate 3rd memory engine, if cross-subagent shared memory is wanted (not a gap-fill — see G4).
3. **U2** — `defaultMode` `bypassPermissions`→`auto` safety-posture flip.

**Autonomously-executable tail** — official paths, reversible:
4. **G5** — `claude plugin install` addyosmani/agent-skills (marketplace already registered).
5. **G6+G7** — wire inspect_ai + promptfoo eval-lanes into `harness/eval_harness.py` (official bridge paths).
6. **superpowers dedup** — installed from 2 marketplaces (`claude-plugins-official` + `obra/superpowers-marketplace`, both 5.1.0); drop one.
7. **O6** — `claude plugin details` plugin-budget audit (42 plugins installed).
8. **O4** — bump CCBP cite-pin `48f2ceb`→`ac0d87d` (re-verify cited line-numbers first).
9. **D11 rescore** — apply §1 catalog corrections + the GitNexus W259-v15 scorecard row to `MASTER-SCORING-MATRIX-W259.md`.

## §5 — Verdict (W259-v15)

**W259 is research-complete; execution is now substantially landed.** W259-v15 verified the runtime is **more built-out than the v13 gap docs implied** — L0.5 security is 7/7 installed (not 0/5), pre-commit was an unwired-hook problem (now fixed + verified), and memory is already 2-system-covered. The "install gaps" G1/G2/G3 were stale.

What genuinely remains splits cleanly: **3 operator-decisions** (O1 Ollama-restart · Hindsight-as-deliberate-3rd-engine · U2 safety-flip) and a short **autonomously-executable** tail (addy-skills install · harness eval-lane wiring · superpowers dedup · plugin-budget audit · CCBP pin · D11 rescore). The GitNexus deep-dive (the one v14-missed community repo) is scored in `../03-deepdive/SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md`; the full execution record is `../07-final-synthesis/W259v15-GAP-EXECUTION-LOG.md`.

The community-curation landscape converges (v14) on **4 canonical repos**: wshobson/agents + addyosmani/agent-skills + mattpocock/skills + VoltAgent/awesome-agent-skills — ECC / awesome-llm-apps / agency-agents are star-inflated noise.
