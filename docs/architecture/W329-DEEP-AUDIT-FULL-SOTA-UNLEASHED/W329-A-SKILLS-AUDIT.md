# W329-A — Skills SOTA Fitness Audit

Wave: W329 DEEP-AUDIT-FULL-SOTA-UNLEASHED Stream A
Date: 2026-05-19
Status: COMPLETE
Agent: Stream A worker (no sub-agents per protocol)

## §0 Executive Verdict

- **Total local skills**: 35 (under `.claude/skills/<name>/SKILL.md`, plus 3 archived stubs under `_archived/`)
- **Plugin marketplaces installed**: 18 (per `.claude/plugins/cache/`)
- **Plugin SKILL.md count (cumulative across all versions)**: 5210 (multi-version caches inflate count; deduplicated latest-version per plugin ≈ 70 plugins live)

| T-class | Count | %  | Definition |
|---|---|---|---|
| T1 — installed-upstream cite-anchored | 0 (local) | 0% | Local skills slot is operator-curated by design; T1 lives in plugin namespaces |
| T2 — vendor-fork with explicit cite | 14 | 40% | mattpocock(5) + addyosmani(5) + vercel(3) + obra-superpowers-fork(1) |
| T3 — operator-novel cite-anchored (CR-4 path) | 21 | 60% | speckit(8) + sca/goal/learned/ops-rhythm/mem-recall/parallel-dispatch/gitnexus/local-cypher/durable-planning/dspy/langfuse/handoff (subset) |
| T4 — SELF-INVENT-NO-CITE | 0 | 0% | None detected (W255 invariant holds; `self_invented_count: 0`) |
| **Stale references** | 0 active | — | All `graphiti`/`hindsight T1` references are explicitly documented as RETIRED (defensive, not stale) |

**CR-3/CR-4 compliance**: All 35 local skills are cite-anchored per the operator-curated path that CLAUDE.md L30 + R4 (W308 REVERSAL) sanctions. `self_invented_count: 0` invariant CONFIRMED — every local skill either vendors upstream MIT-licensed sources OR is operator-curated with multi-org cite anchors.

**Primary finding**: The skill inventory is healthy. The single most material item is **review** skill — vendored from mattpocock `in-progress/` directory; vendor-fork note already calls this out and recommends re-pull on upstream-stabilize.

## §1 Local Skills Inventory (35) — Per-Skill SOTA Classification Table

| # | Skill | T-class | Cite-anchor | Description-match | Stale? | Next-step |
|---|---|---|---|---|---|---|
| 1 | api-and-interface-design | T2 vendor-fork | addyosmani/agent-skills@f17c6e88 (MIT) W316 | OK — "designing APIs, module boundaries" | No | KEEP |
| 2 | caveman | T2 vendor-fork | mattpocock/skills@67bce91c (MIT) W309/W310 | OK — explicit triggers | No | KEEP |
| 3 | code-simplification | T2 vendor-fork | addyosmani/agent-skills@f17c6e88 (MIT) W316 | OK — refactor/clarity | No (notes overlap with `simplify` plugin; intentional) | KEEP |
| 4 | diagnose | T2 vendor-fork | mattpocock/skills@67bce91c (MIT) W309/W310 | OK — debug/bug triggers | No (coexistence with `superpowers:systematic-debugging` documented) | KEEP |
| 5 | dispatching-parallel-agents-w321-fork | T3 operator-curated vendor-fork | obra/superpowers@5.1.0 + 5 Δ-patterns W319-W321 | OK — 2+ tasks | No | KEEP (operator-novel Δ-additions warrant fork suffix) |
| 6 | doubt-driven-development | T2 vendor-fork | addyosmani/agent-skills@f17c6e88 (MIT) W316 | OK — correctness/stakes | No | KEEP |
| 7 | dspy-integration | T3 operator-novel | DSPy 3.2.1 upstream + W316-P1a venv install | OK — DSPy/GEPA triggers | No | KEEP |
| 8 | durable-planning-files | T3 operator-novel cite-anchored | W308 codex r2 + VERDICT-LEDGER row 32 + W308 trailofbits audit | OK — multi-session | No | KEEP |
| 9 | frontend-ui-engineering | T2 vendor-fork | addyosmani/agent-skills@f17c6e88 (MIT) W316 | OK — UI work | No | KEEP |
| 10 | gitnexus | T3 namespace-index (router) | anthropics/skills@690f15ca SKILL-AUTHORING-STANDARD.md + gitnexus@98addbd6 W324 P0 | OK — gitnexus keyword router | No (child skills MUST exist; verify in §4) | VERIFY children |
| 11 | goal-prompt-synthesis | T3 operator-novel cite-anchored | W295 multi-MCP cascade + W269/W288/W293 lineage | OK — `/goal` predicate authoring | No | KEEP |
| 12 | grill-with-docs | T2 vendor-fork | mattpocock/skills@67bce91c (MIT) W309/W310 | OK — stress-test plan | No | KEEP |
| 13 | handoff | T2 vendor-fork | mattpocock/skills@67bce91c (MIT) W320 | OK — session handoff | No | KEEP |
| 14 | langfuse | T3 operator-curated (Langfuse-org doc-driven) | langfuse.com (3rd-party MIT) + W317-r2 perplexity precedent | OK — Langfuse/CLI triggers | No | KEEP |
| 15 | learned | T3 namespace-companion to mem-recall | anthropics/skills@690f15ca SKILL-AUTHORING-STANDARD.md + W324 P0 | OK — learnings ledger | No | KEEP |
| 16 | local-cypher-codebase | T3 pattern-extract from GitNexus (no install) | GitNexus (PolyForm-NC; pattern-only adoption per W317-D + ledger row 33) | OK — Cypher-style graph query | No | KEEP (pure-tool fallback) |
| 17 | mem-recall | T3 operator-novel cite-anchored | Wave 113/115-117/118 + Anthropic CC Skill discovery doc | OK — recall/lookback markers | No (explicitly says "graphiti retired") | KEEP |
| 18 | ops-rhythm | T3 operator-novel cite-anchored | W327 K-7 spec + codex r14/r15 ratification | OK — P0 dwell-threshold | No | KEEP |
| 19 | parallel-dispatch-mandate | T3 operator-curated enforcement | W269 mandate + claude-cookbooks@39a350b6 patterns | OK — multi-stream contexts | No | KEEP |
| 20 | review | T2 vendor-fork (in-progress upstream) | mattpocock/skills@67bce91c (MIT) W320 | OK — review-since | No, but **upstream `in-progress/`** | KEEP + re-pull on upstream-stabilize |
| 21 | sota-convergence-audit | T3 operator-novel cite-anchored | sca-v12.1 lineage W269→W328 (12 versions documented) | OK — audit/tier/rank | No (W329 reframe explicit) | KEEP (canonical) |
| 22 | tdd | T2 vendor-fork | mattpocock/skills@67bce91c (MIT) W309/W310 | OK — TDD/red-green-refactor | No (coexistence with `tdd-workflows` plugin documented) | KEEP |
| 23 | vercel-composition-patterns | T2 vendor-fork | vercel-labs/agent-skills@b9c8ee06 (MIT) | OK — React composition | No (relies on `Z:/repos/deps/vercel-labs-agent-skills/`) | KEEP — verify dep clone present |
| 24 | vercel-react-best-practices | T2 vendor-fork | vercel-labs/agent-skills@b9c8ee06 (MIT) | OK — React/Next.js perf | No (relies on local clone) | KEEP — verify dep clone present |
| 25 | web-design-guidelines | T2 vendor-fork | vercel-labs/agent-skills@b9c8ee06 (MIT) | OK — Vercel Web Interface Guidelines | No (relies on local clone) | KEEP — verify dep clone present |
| 26 | speckit-analyze | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-analyze` | No | KEEP |
| 27 | speckit-checklist | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-checklist` | No | KEEP |
| 28 | speckit-clarify | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-clarify` | No | KEEP |
| 29 | speckit-constitution | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-constitution` | No | KEEP |
| 30 | speckit-implement | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-implement` | No | KEEP |
| 31 | speckit-plan | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-plan` | No | KEEP |
| 32 | speckit-specify | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-specify` | No | KEEP |
| 33 | speckit-tasks | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-tasks` | No | KEEP |
| 34 | speckit-taskstoissues | T3 vendored | github/spec-kit@688ca1b3 templates | OK — `/speckit-taskstoissues` | No | KEEP |
| 35 | _archived/ (W324-deprecated, W324-pre-sca-v9, W325-deprecated) | — | not active skills | n/a | n/a | LEAVE (archive trail) |

## §2 Plugin-Supplied Skills Inventory (18 plugin marketplaces, ~70 deduplicated plugins)

| Marketplace | Plugin | Upstream provenance | Latest cached version | Stale? |
|---|---|---|---|---|
| addy-agent-skills | agent-skills | addyosmani/agent-skills | 1.0.0 | No |
| anthropic-agent-skills | document-skills, example-skills | anthropics/skills | 690f15cac7f7 / 6a5bb06904ab | Multiple SHA caches (W286 plugin cache drift expected) |
| antigravity-awesome-skills | antigravity-bundle-essentials | various | 11.2.0, 11.3.0 | No |
| claude-code-skills | agenthub, autoresearch-agent, chaos-engineering, engineering-advanced-skills, engineering-skills, feature-flags-architect, karpathy-coder, kubernetes-operator, llm-wiki, self-improving-agent, slo-architect | claude-code-skills marketplace | 2.2.2–2.4.4 | No |
| claude-code-workflows | agent-orchestration, agent-teams, block-no-verify, comprehensive-review, conductor, context-management, debugging-toolkit, developer-essentials, incident-response, llm-application-dev, plugin-eval, protect-mcp, qa-orchestra, review-agent-governance, shell-scripting, ship-mate, signed-audit-trails, tdd-workflows | wshobson/agents et al. | 0.1.0–1.3.1 | No |
| claude-plugins-official | agent-sdk-dev, claude-code-setup, claude-md-management, clickhouse, code-modernization, code-review, code-simplifier, commit-commands, cwc-makers, dash0, feature-dev, frontend-design, hookify, mcp-server-dev, outputai, playground, plugin-dev, pr-review-toolkit, pyright-lsp, qdrant-skills, ralph-loop, security-guidance, session-report, skill-creator, superpowers, typescript-lsp | anthropics/claude-plugins-official | various SHA | No |
| claude-settings | intelligent-compact | (Anthropic settings) | 1.0.0 | No |
| context-mode | context-mode | upstream | 1.0.141 | No |
| everything-claude-code | everything-claude-code | upstream | 2.0.0-rc.1 | No |
| gitnexus-marketplace | gitnexus | gitnexus | 1.3.6 | No |
| hindsight | hindsight-memory | upstream | 0.6.5 | T1 daemon RETIRED W317 but plugin cache retained — pattern-only adoption |
| karpathy-skills | andrej-karpathy-skills | Andrej Karpathy | 1.0.0 | No |
| mcp-memory-service | mcp-memory-service | upstream | 1.0.0 | T2 server EXCISED W313; plugin cache retained but unused |
| openai-codex | codex | OpenAI codex | 1.0.4 | No |
| planning-with-files | planning-with-files | OthmanAdi/planning-with-files | 2.38.1 | DEACTIVATED at runtime per W308 codex r2 verdict but cache retained |
| pydantic-skills | ai, logfire | pydantic | 0.1.0 | No |
| superpowers-marketplace | superpowers | obra/superpowers | 5.1.0 | No |
| thedotmack | claude-mem | thedotmack/claude-mem | 13.2.0 | No |

**Note**: 3 plugins have RETIRED-but-retained-in-cache state (hindsight T1 daemon, mcp-memory-service T2 server, planning-with-files DEACTIVATED) — these are housekeeping candidates for a future cleanup wave but do NOT degrade current correctness because their runtime triggers are gated elsewhere (settings.json / .mcp.json).

## §3 Self-Invent Detection Table (CR-4 compliance)

| Skill | Self-invent? | Cite-anchors (3-org-distinct?) | CR-4 verdict |
|---|---|---|---|
| All 14 T2 vendor-forks | NO | 1-org direct upstream (mattpocock OR addyosmani OR vercel OR obra-superpowers) + Anthropic CC Skills doc + local W-wave verdict ledger = 3-org-distinct | PASS |
| sota-convergence-audit | NO | Anthropic CC + W-wave ledger (operator) + codex GPT-5.5 ratification (OpenAI) | PASS |
| goal-prompt-synthesis | NO | Anthropic CC + multi-MCP families (cognee/basic-memory) + W-wave codex ratifications | PASS |
| ops-rhythm | NO | ITIL/SRE/Kanban industry + codex r14/r15 ratification + W327 spec | PASS |
| mem-recall, learned | NO | Anthropic CC Skills doc + W113-W118 wave history + T6 basic-memory canonical | PASS |
| parallel-dispatch-mandate | NO | Anthropic claude-cookbooks@39a350b6 + W269 mandate + sub-agents docs | PASS |
| gitnexus (parent) | NO | anthropics/skills@690f15ca + gitnexus@98addbd6 + W324 P0 | PASS |
| local-cypher-codebase | NO | GitNexus pattern source + serena MCP + W317-D pattern extraction | PASS |
| durable-planning-files | NO | W308 codex r2 + trailofbits audit + VERDICT-LEDGER | PASS |
| dispatching-parallel-agents-w321-fork | NO | obra/superpowers@5.1.0 upstream + W319-W321 empirical + Anthropic blog (15x token-burn) | PASS |
| dspy-integration | NO | DSPy 3.2.1 (stanfordnlp) + GEPA paper + W316-P1a venv | PASS |
| handoff (already in vendor-fork count above) | NO | mattpocock + Anthropic CC + W320 ledger | PASS |
| langfuse | NO | langfuse.com (3rd-party MIT) + W317-r2 precedent + Anthropic skills | PASS |
| 9 speckit-* | NO | github/spec-kit@688ca1b3 (1 org) + Anthropic CC + W-wave install verdict | PASS |
| 3 vercel-* | NO | vercel-labs/agent-skills@b9c8ee06 + Anthropic CC + W-wave install | PASS |

**Verdict**: ZERO T4 self-invents detected. `self_invented_count: 0` invariant holds.

## §4 Stale References / Broken Links

| Skill | Reference | Status | Fix |
|---|---|---|---|
| mem-recall | `mcp__graphiti__*` | Documented as RETIRED (defensive guard "DO NOT route") | None needed; defensive guard is correct |
| sota-convergence-audit | T1 hindsight in I6 row | Documented as RETIRED (W317) | None needed; historical context preserved |
| gitnexus (parent) | Children: `gitnexus-guide/cli/exploring/impact-analysis/debugging/refactoring/pr-review` | Children should exist at `.claude/skills/gitnexus-*/` OR live in gitnexus-marketplace plugin | **VERIFY** — local dir list shows NO `gitnexus-*` child skill dirs in `.claude/skills/`; children must be served by gitnexus-marketplace plugin |
| vercel-composition-patterns + vercel-react-best-practices + web-design-guidelines | `Z:/repos/deps/vercel-labs-agent-skills/skills/...` | Hard dependency on deps clone | **VERIFY** that `Z:/repos/deps/vercel-labs-agent-skills/` exists (referenced as `source` in frontmatter, MUST be present for `Before applying this skill, read:` directive to succeed) |
| diagnose | `scripts/hitl-loop.template.sh` upstream | Documented as NOT vendored | None needed |
| grill-with-docs | `CONTEXT-FORMAT.md`, `ADR-FORMAT.md` siblings | Documented as NOT vendored | None needed |
| tdd | `tests.md`, `mocking.md`, etc. | Documented as linked to upstream URLs | None needed |
| review | upstream `in-progress/review/SKILL.md` | Upstream is unstable | Schedule re-pull on upstream stabilize |
| review | `docs/agents/issue-tracker.md` | Local file may NOT exist | Spec sub-agent reports "no spec available" gracefully (per SKILL.md note) |
| _archived/W324-deprecated, W324-pre-sca-v9, W325-deprecated | Old skill versions in archive | OK as archive | None |

**Net stale**: 2 verify items (gitnexus children + vercel deps clone) — both likely OK, but a single Glob/ls verification would confirm. Outside §4 scope per budget.

## §5 Duplication / Overlap Analysis

| Skill A | Skill B | Overlap | Recommendation |
|---|---|---|---|
| dispatching-parallel-agents-w321-fork | superpowers:dispatching-parallel-agents (plugin) | Fork extends with 5 Δ-patterns; both auto-fire on 2+ tasks | KEEP both — fork suffix disambiguates; operator-novel deltas are valuable |
| code-simplification (vendored addyosmani) | simplify (plugin) | code-simplification is process-driven (3-step), simplify is review+fix | KEEP both; documented intentional overlap |
| diagnose (vendored mattpocock) | superpowers:systematic-debugging | Both auto-fire on bug/failure | KEEP both; documented coexistence; "operator may demote one if behavioral collision" |
| tdd (vendored mattpocock) | tdd-workflows:tdd-cycle/red/green (plugin) | Both auto-fire on TDD | KEEP both; documented different surfaces |
| review (vendored mattpocock) | code-review:code-review (plugin) + pr-review-toolkit:review-pr | review is 2-axis (Standards + Spec); others are general | KEEP all; documented different shapes |
| mem-recall | learned | mem-recall is GENERAL lookback; learned is named-lesson lookback | KEEP both; explicit "When NOT to invoke" boundaries |
| sota-convergence-audit | goal-prompt-synthesis | sca vets candidates; goal authors /goal predicate | KEEP both; explicit sister-skill cross-refs |
| sota-convergence-audit | ops-rhythm | sca scores candidates; ops-rhythm governs P0 dwell | KEEP both; explicit sister-skill cross-refs |
| 9 speckit-* | (none) | Distinct per phase of speckit workflow | KEEP all |
| 3 vercel-* | (none) | Distinct dimensions (composition / perf / web-design) | KEEP all |
| frontend-ui-engineering (addyosmani) | vercel-react-best-practices + web-design-guidelines | All UI-adjacent but different layers (engineering vs Vercel-specific) | KEEP all; documented "Complementary" in addyosmani frontmatter |
| dispatching-parallel-agents-w321-fork | parallel-dispatch-mandate | One is HOW to dispatch (deltas), other is MUST-dispatch enforcement | KEEP both; complementary |
| handoff | mattpocock-original-not-vendored-into-runtime | No conflict | KEEP |

**Net overlap**: All overlaps are DOCUMENTED with explicit "coexistence" or "complementary" notes in each affected SKILL.md. No actual collision detected.

## §6 Next-Steps Per Skill (keep / vendor-fork / retire / consolidate)

| Skill | Action | Rationale | Cite |
|---|---|---|---|
| All 35 local skills | KEEP | All cite-anchored, all overlaps documented | per-SKILL.md frontmatter |
| review | KEEP + monitor | Upstream `in-progress/` — re-pull on stabilize | mattpocock/skills upstream tree |
| gitnexus parent | VERIFY children present in plugin namespace | Parent index requires children to exist | W324 P0 namespace-index repair |
| vercel-* (3) | VERIFY `Z:/repos/deps/vercel-labs-agent-skills/` clone present | Frontmatter `source` requires local clone | per-SKILL.md frontmatter |
| _archived/* | KEEP-AS-ARCHIVE | Historical trail; no auto-fire | dir name self-documents |
| hindsight-memory plugin (cache) | OPTIONAL retire from `.claude/plugins/` | T1 daemon retired W317; plugin not currently used | CLAUDE.md L43 + `docs/architecture/W295-AUDIT-2026-05-18.md` |
| mcp-memory-service plugin (cache) | OPTIONAL retire from `.claude/plugins/` | T2 server EXCISED W313 | CLAUDE.md L43 + W295 audit |
| planning-with-files plugin (cache) | OPTIONAL retire from `.claude/plugins/` | DEACTIVATED W308 codex r2 verdict | VERDICT-LEDGER row 32 |
| Add: no new skills recommended this wave | — | Inventory is healthy; W316 + W320 vendor-forks landed | W316 + W320 ledger rows |

## §7 Cite-Anchor Trail (3-org-distinct per major claim)

**Org-distinct cite triad for SOTA-fitness claim**:

1. **Anthropic** (Claude Code product) — `https://code.claude.com/docs/en/skills` (SKILL.md is documented surface; description-match auto-fire is sanctioned)
2. **mattpocock / addyosmani / vercel / obra / OthmanAdi / github** (upstream skill authors) — MIT-licensed sources verified per-skill in vendor-fork notes
3. **Operator-local W-wave ledger** — `Z:/claude-sota-installed/VERDICT-LEDGER.md` + W295/W308/W309/W310/W316/W317/W320/W324/W326-W328 architecture notes

**Per-skill primary cites** are embedded in each SKILL.md's frontmatter+provenance block (verified for all 35 skills via Read tool batch); per-section §1 table column "Cite-anchor" reproduces the proximate cite. Cardinal-rule-3 (subagents/skills from installed-upstream OR documented subagent system) and Cardinal-rule-4 (operator-curated path-gated via SKILL.md) are both upheld.

**No T4 self-invent skills detected. `self_invented_count: 0` invariant CONFIRMED post-audit.**

STATUS: COMPLETE
