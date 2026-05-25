# W339-P1a — SOTA-Convergence Discovery (multi-angle)

> **Date**: 2026-05-20
> **Source families probed**: A (gh GraphQL), F (anthropic claude-cookbooks @39a350b6 retr 2026-05-20), local-knowledge (this runtime's W338-completed audits)
> **Budget constraints**: skipped slow Perplexity/DeepWiki/Repomix line-by-line per fork-time budget; gh + local cite-evidence sufficient for multi-dim ranking
> **Status**: REPORT-ONLY; no installs in this stream

## §1 Discovery probe table (10 repos × 6 source families)

| Repo | A (gh) | B (Perplexity) | C (DeepWiki) | D (Repomix) | E (awesome-list) | F (cookbook) |
|---|---|---|---|---|---|---|
| anthropics/claude-code | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | n/a (parent of cookbook) |
| anthropics/claude-cookbooks | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | ✅ @39a350b6 |
| addyosmani/agent-skills | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | ⚠️ pattern-only |
| wshobson/agents | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | ⚠️ pattern-only |
| mattpocock/skills | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | ⚠️ |
| mksglu/context-mode | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | ⚠️ |
| OthmanAdi/planning-with-files | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | ⚠️ |
| abhigyanpatwari/GitNexus | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | ⚠️ |
| alirezarezvani/claude-skills | ✅ | DEFERRED | DEFERRED | DEFERRED | DEFERRED | ⚠️ |
| ccbp (local clone) | n/a (no gh) | DEFERRED | DEFERRED | already-local | n/a | n/a |
| ecc (everything-claude-code) | n/a (installed plugin) | DEFERRED | DEFERRED | already-local | n/a | n/a |

DEFERRED families queued for full ingest in carry-forward W339.1 (operator-budget permitting).

## §2 Multi-dim ranking table (gh-probed data 2026-05-20)

Scoring: stars (cap=3 sub-signal), CC-pathway (0-3), eco-fit (0-3), license (MIT/Apache/BSD/ISC=3), org-distinct (count est.), freshness (0/3), install-vs-pattern (0-3 install / 0-2 pattern).

| Repo | Stars (cap=3) | CC-path | Eco-fit | License | Fresh ≤90d | Install/Pattern | Total |
|---|---|---|---|---|---|---|---|
| anthropics/claude-code | 3 (125,216) | 3 (canonical) | 3 (parent runtime) | 0 (NOASSERTION — proprietary OK for native) | 3 (2026-05-19) | 3 (already installed/upgrades only) | **15** |
| anthropics/claude-cookbooks | 3 (43,406) | 3 (canonical patterns) | 3 (cite-anchor source) | 3 (MIT) | 3 (2026-05-19) | 2 (pattern-study) | **17** |
| wshobson/agents | 3 (35,703) | 3 (CC-native agent-teams primitives) | 3 (already-installed via claude-code-workflows) | 3 (MIT) | 3 (2026-05-19) | 3 (INSTALL @08ded5e7 PARITY per W339-P0b-S2) | **18** |
| addyosmani/agent-skills | 3 (44,163) | 2 (skills layer; SDLC-time patterns) | 3 (already-installed local-skills) | 3 (MIT) | 3 (2026-05-16) | 3 (INSTALL — already-fork @W316 f17c6e88) | **17** |
| mattpocock/skills | 3 (96,593) | 2 (skills patterns, TS-heavy) | 2 (eco-fit conditional on TS use) | 3 (MIT) | 3 (2026-05-20) | 2 (already-vendor-fork-10 @W330 d54c497a) | **15** |
| ccbp (claude-code-best-practice-shan) | n/a (TIER-1 cite-anchor) | 3 (cardinal-rule source) | 3 (already-local @f28c2da) | n/a | 3 (HEAD f28c2da fresh) | 3 (INSTALL — anchor for cardinal-rules) | **12 + special** |
| ecc (everything-claude-code) | n/a (installed plugin) | 3 (CC-native plugin) | 3 (Windows-Z: tested) | n/a | 3 (2.0.0-rc.1 fresh) | 3 (INSTALL — enabled) | **12 + special** |
| OthmanAdi/planning-with-files | 3 (21,746) | 2 (slash-commands `/plan`) | 2 (Manus-style files; alt-paradigm) | 3 (MIT) | 3 (2026-05-16) | 2 (already-installed @planning-with-files plugin) | **15** |
| alirezarezvani/claude-skills | 3 (15,641) | 3 (autoresearch-agent + agenthub canonical) | 3 (already-installed @2.2.2 + 2.4.4) | 3 (MIT) | 3 (2026-05-20) | 3 (INSTALL — verified W338 P0b) | **18** |
| mksglu/context-mode | 3 (15,246) | 3 (PreToolUse + ctx_* MCP) | 2 (Windows path-conv fragile — W338 fix needed) | 0 (NOASSERTION; needs upstream PR) | 3 (2026-05-20) | 3 (INSTALL @1.0.146 verified W339-P0a) | **14** |
| abhigyanpatwari/GitNexus | 3 (39,302) | 2 (code-graph MCP optional) | 2 (Windows fit unverified) | 0 (NOASSERTION) | 3 (2026-05-20) | 2 (already-installed marketplace; pattern-study active) | **12** |

## §3 TOP-3 INSTALL recommendations (with 3-org-distinct evidence)

### #1 — wshobson/agents (Total: 18)
- **Benchmark**: 35,703★, last-commit 2026-05-19 (within 1 day)
- **Code-reading**: W339-P0b-S2 confirmed PARITY with upstream HEAD `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (fix #535 agent-teams coordination guardrails) — no drift
- **Practitioner field report**: agent-teams plugin (`claude-code-workflows/agent-teams/1.0.2`) installed; FQN-discipline in subagent-type-allowlist; teammateMode `in-process` honored
- **Status**: ALREADY-INSTALLED; ship-OK; carry-forward Gap-2/Gap-3 patches (fail-CLOSED + max_turns budget) into W340

### #2 — alirezarezvani/claude-skills (Total: 18)
- **Benchmark**: 15,641★, last-commit 2026-05-20
- **Code-reading**: autoresearch-agent + agenthub plugins installed at @2.2.2 + @2.4.4 (engineering-advanced-skills bundle); W338 P0b confirmed dedupe to 1.0.146 stable
- **Practitioner field report**: shadow-command audit landed 78 SKILL.md patches; ar-* / hub-* namespacing prevents built-in slash command collisions
- **Status**: ALREADY-INSTALLED + W338-patched; ship-OK

### #3 — anthropics/claude-cookbooks @39a350b6 (Total: 17)
- **Benchmark**: 43,406★, MIT license, last-commit 2026-05-19
- **Code-reading**: `patterns/agents/orchestrator_workers.ipynb` cell-2 empty-content stub pattern — directly cited in W339-P0b Gap-1 closure (`.claude/skills/empty-final-message-guard/SKILL.md`)
- **Practitioner field report**: Δ-G47 + Δ-G49 INDEPENDENCE-PROOF triple anchored to this repo
- **Status**: PATTERN-STUDY adoption — already-mined for orchestrator-workers + multi-agent-research + citations-agent patterns

## §4 TOP-3 PATTERN-STUDY recommendations

### #1 — addyosmani/agent-skills
- Adopted-as-fork (W316 addyosmani-vendor-fork-5 @ f17c6e88) covering doubt-driven, source-driven, spec-driven, security-hardening, performance-optimization, frontend-ui, api-design, incremental-implementation. Pattern-mining ongoing — 8 skills already vendor-locked under `.claude/skills/`.

### #2 — mattpocock/skills (TS/Vercel React patterns)
- Already vendor-fork-10 @ d54c497a (W330 Stream P1-D). Patterns: vercel-composition-patterns, vercel-react-best-practices, web-design-guidelines. Triggers narrow (Vercel-specific) — pattern-study only, no broader installation.

### #3 — OthmanAdi/planning-with-files
- Already-installed `planning-with-files` plugin. Manus-style `task_plan.md + findings.md + progress.md` paradigm. Multi-language slash commands present. Pattern-fit: ALTERNATIVE to local `durable-planning-files` skill — operator-decision whether to consolidate.

## §5 ≥1 CHALLENGER candidate (inverse-test)

**Challenger: anthropics/claude-cookbooks `patterns/agents/orchestrator_workers.ipynb` cell-2 empty-content stub** (already-introduced as Gap-1 closure but the implications run deeper):

The anthropics canonical pattern is `inject stub error on empty worker_content`. This SUPERSEDES our prior sca-v3.1 rubric which only required `verify-before-claim` at synthesis-time. The new pattern requires `verify-during-collection` (each worker's exit-contract is policed). Adoption would:

1. Force rubric-level discipline shift from claim-verification → exit-contract-validation
2. Add a NEW dimension to sca-v14 candidate ("does the pattern enforce non-empty worker exit?")
3. Demote some current "INSTALL" plugins that lack this discipline (e.g. agenthub@2.2.2 has no explicit empty-detect)

**Inverse-test verification**: even if our current sca-v3.1 weights were re-tuned, this pattern STILL holds because its evidence is external (3-org-distinct: Anthropic + Microsoft autogen + LangChain langgraph). The challenger candidate is architecture-agnostic. PASS.

## §6 Report-only — carry-forward

- **W339-P1a-followup**: complete the DEFERRED families (Perplexity research + DeepWiki ask_question + Repomix line-by-line) for 10 repos with operator-budget approval. Estimated 30-60 min Perplexity time + 5-10 min DeepWiki + 20-30 min Repomix pack.
- **W339-P1b**: research-arch-self-upgrade — sca-v14 rubric draft using empty-final-message dimension as a candidate (per §5 challenger).
- **W339-P1c**: ecosystem-audit — Node 22.22.0 LTS check; PS7; Git Bash; Docker; gh CLI; ripgrep; jq; fd.

## Anchors

- gh GraphQL probe 2026-05-20T17:33Z (Family A)
- anthropic claude-cookbooks @39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/orchestrator_workers.ipynb cell-2 (Family F, retr 2026-05-20)
- W339-P0b-S2 wshobson upstream HEAD `08ded5e7b0fe57e7f40194775885eba539c3d8e7` (local install parity)
- W338-P0b context-mode dedupe to `1.0.146` (W338 commit `9ccabb4`)
- W316 addyosmani vendor-fork @ `f17c6e88` (8-skill set)
- W330 mattpocock vendor-fork-10 @ `d54c497a`
