# Wave 159 Phase 2 — end-of-arc audit metrics

> Codified Ship 10 of Wave 159 Phase 2 PATH-D arc 2026-05-12. Per `/goal v7-tight` predicate audit-metrics requirement (% rules audited / % SOTA-reviewed / hook agent_id baseline). Forward-only baseline; Wave 160 fix-forward targets enumerated below.

## Arc summary

| Phase | Start state | End state | Δ |
|---|---|---|---|
| Wave 159 P2 PATH-D arc | 5 rules >40k + settings.json 59k + 16 OPEN T3 findings | 0 rules >40k + settings.json 21k + 16 OPEN T3 findings | 5×split + 38k extract |
| Cumulative ships | 0 | 10 | +10 of 11 cap-cap-11 |
| FM-02 sub-c COMMIT-LAYER ABSORPTION ladder | n=10 | n=13 | +3 same-arc session-checkpoint cron sub-variant |
| /doctor performance warnings | 5 rules + CLAUDE.md (6 files) | 1 file (CLAUDE.md only) | -5 closed; CLAUDE.md DEFERRED Wave 160 |

## Audit conformance metrics (post-Wave-159-P2)

| Metric | Numerator | Denominator | % | /goal Target | Gap |
|---|---|---|---|---|---|
| Rules with HEAD-SHA cite anchors | 38 | 56 | **67.9%** | ≥90% | -22.1pp |
| Rules under 40k threshold | 56 | 56 | **100%** | 100% | ✅ |
| Rules under 50k threshold | 56 | 56 | 100% | n/a | ✅ |
| Hook scripts emitting `agent_id` field | 6 | 23 (JSONL-emitting) | **26.1%** | ≥90% | -63.9pp |
| settings.json size | 21,261 bytes | 32,768 budget | **64.9%** | ≤100% | ✅ |
| CLAUDE.md size (DEFERRED) | ~64,000 bytes | 40,960 budget | **156.4%** | ≤100% | -56.4pp (Wave 160) |
| `.mcp.json` `_comments` properly nested | yes | top-level outside mcpServers | ✅ | top-level | ✅ |
| Active T3 OPEN findings | 16 | n/a | n/a | reduce | unchanged this arc |

## CR-7 Phase 2 transition matrix (NOT-YET-MET)

| Predicate | Status | Source |
|---|---|---|
| (a) Section 0 bootstrap rows = INSTALLED | TRUE (per Wave 124 audit) | docs/sota-installed-manifest.md §0 |
| (b) Tier 0 CLI tools + CC binary = INSTALLED-VIA-SYSTEM-PATH | TRUE | manifest §10 + §1 |
| (c) Tier 1a codex T1-T7 hooks = INSTALLED smoke-PASS | PARTIAL — gates fire WARN on multi-file edits per SYSTEM-meta-review fallback | this arc evidence n=5+ |
| (d) Tier 1b sota-researcher = INSTALLED smoke-PASS | INSTALLED-AMBER per manifest §14 | manifest |
| (e) Tier 1c safety_guard.py = INSTALLED smoke-PASS | TRUE | manifest §13 + active hook |
| (f) Tier 2 Memory + Research + Code intel MCPs | PARTIAL — mcp-memory + graphiti installed; others pending | manifest §4 / §7 / §8 |
| **Overall CR-7 Phase 2 eligibility** | **NOT MET** — Tier 1c/2 PARTIAL + 16 OPEN T3 findings BLOCK | per cardinal-rule-7 |
| Coverage estimate | **≈55-70%** | unchanged this arc — Wave 160 work required |

## Wave 160 fix-forward queue (priorities)

| Priority | Target | Current state | Gap | Estimated effort |
|---|---|---|---|---|
| **P0** | SB6 CLAUDE.md split via cardinal-rule-promotion to rule-layer | 62.6k inline | split into root pointer + 4 `.claude/rules/cardinal-rule-<N>.md` files with `paths:` lazy-load | 60-90min with T0+T1xhigh+T5+Probe-DAG gating |
| **P0** | SB8 hook agent_id propagation 26.1% → ≥90% | 6/23 scripts | edit ~17 JSONL-emitting hooks to persist `payload.get('agent_id')` + `payload.get('agent_type')` per `audit-action-loop.md §Hook telemetry contract` + SDK types.py:246-262 | 45-60min mechanical refactor across 17 scripts |
| **P1** | Rules HEAD-SHA cite anchor coverage 67.9% → ≥90% | 18 rules missing cite anchors | identify missing-cite rules + add `@ HEAD <sha>` per cardinal-rule-1 lattice | 30-45min |
| **P1** | PATH-F SOTA adoptions Top-10 (DEFERRED from this arc) | 0 of 10 | ECC autonomous-loops + agent-harness-construction + canary-watch + content-hash-cache + mcp-server-patterns + prompt-optimizer + Vercel 4 (deploy-to-vercel + react-native + react-view-transitions + vercel-cli-with-tokens) | per-skill 5-10min + multi-cohort fan-out audit |
| **P2** | 16 OPEN T3 findings disposition | 16 unchanged | classify per `closed-loop-recursive-narrowing.md §Disposition signal severity gate` (Outcome A/B/C) | 60-120min batch |
| **P2** | T3 NEVER FIRED ON SESSION-CHECKPOINT-COMMITS cycle-322 promotion (n=4 firm) | catalog candidate | promote to `named-failure-modes.md` row OR dedicated rule | 15-30min |
| **P3** | Settings.json hook entry dedup (4× 6-occurrence scripts) | 24 dup entries | collapse via matcher consolidation OR `if:` array per Anthropic CC hooks spec (CHANGELOG.md re: hooks if-array support) | 30-45min + cross-model T1 (sync hooks load-bearing) |

## SOTA-audit findings (Wave 159 P2 SB6 disposition research)

Audit conducted via `multi-source-discovery-breadth-discipline.md` ≥4 distinct sources (local Z:/repos/deps Grep + CCBP claude-memory.md + sibling claude-sota CLAUDE.md + cwc-long-running-agents/CLAUDE.md):

| Finding | Evidence | Implication |
|---|---|---|
| 29 of 30 SOTA repos have CLAUDE.md ≤40k | Z:/repos/deps Grep 30-repo enumeration; only Archon at 47k breaches | SOTA precedent supports CLAUDE.md split |
| Sibling claude-sota canonical reference = 22.9k | wc -c Z:/claude-sota/CLAUDE.md | This runtime's CR-5..CR-12 + Skill Orchestration + Architecture pushed +40k from sibling baseline |
| CCBP `claude-memory.md` canonical pattern = lazy-load descendants | `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:36-105 @ HEAD 48f2ceb` | Root CLAUDE.md MUST stay (always-load); mechanics CAN move to `.claude/rules/*.md` (lazy-load via paths glob) |
| Anthropic `cwc-long-running-agents/CLAUDE.md` minimal = 1.7k | `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/CLAUDE.md` | SOTA pattern = ROOT minimalism + mechanics in rule-layer |
| 113 cite-anchors in CLAUDE.md ecosystem | 73 internal + 40 reverse-cites from `.claude/rules/` + `docs/` | HIGH blast radius if split poorly executed |

**SOTA verdict**: split IS aligned with SOTA practice. **Path forward**: Wave 160 SB6 = TOP-3 cardinal-rule promotion (CR-7 graduated-unleash + CR-8 SOTA-content + CR-12 install-priority extracted to `.claude/rules/cardinal-rule-N-<slug>.md` files with frontmatter `paths:` glob matching trigger surface). CLAUDE.md root keeps ONE-LINE cardinal-rule statements + pointer routing.

## FM-02 sub-class (c) COMMIT-LAYER ABSORPTION evidence ladder (Wave 159 P2 contribution)

n=10 → n=13 same-arc 2026-05-12 via session-checkpoint cron sub-variant:

| # | Wave 159 P2 ship | Atomic commit | Parent rewrite absorbed into | Logical unit |
|---|---|---|---|---|
| 11 | SB3 ctff 4-child split | `708aeda` (children) | session-checkpoint `509257c` 20:28 (parent) | COMPLETE_ACROSS_CHAIN |
| 12 | SB4 lga 3-child split + F-004 cite-fix | `1286c84` (children + cite-fix) | session-checkpoint `c82a487` 20:42 (parent) | COMPLETE_ACROSS_CHAIN |
| 13 | SB5 ahfv 3-child split | `bf0abec` (children) | session-checkpoint `4423e46` 20:56 (parent) | COMPLETE_ACROSS_CHAIN |

Per `port-note-discipline.md §6` forward-only: accept absorption pattern; logical unit COMPLETE across commit chain. cycle-322 n=3 same-arc threshold SATISFIED for new session-checkpoint cron sub-variant; META-router enrichment shipped Ship 8 commit `9e2a205`.

**NEW recovery option #6 added to FM-02 META-router** (Ship 8 commit `9e2a205`):
- (a) disable session-checkpoint cron during multi-file split pipeline window
- (b) worktree-isolate via `eee --worktree` (Layer 0 filesystem-level isolation)
- (c) accept absorption pattern as DESIGN and acknowledge cross-commit-chain logical-unit boundary in commit-message construction

## Ship inventory (cum-10 of 11 cap)

| # | Ship | Commit | Type | Logical unit |
|---|---|---|---|---|
| 1 | D1 .mcp.json `_comments` relocation | `6fd8ca2` | mechanical | COMPLETE |
| 2 | D2 .doctor probe bash-only | bundled D1 | mechanical | COMPLETE |
| 3 | D3 SOTA auto-compact codification | `35b793e` | docs | COMPLETE |
| 4 | D4 channel-pin decision | `f0b51e5` | docs | COMPLETE |
| 5 | SB3 ctff 43.9k → 11.4k pointer + 4 children | `708aeda` | rule-split | COMPLETE_ACROSS_CHAIN |
| 6 | SB4 lga 40.6k → 19.4k pointer + 3 children + F-004 | `1286c84` | rule-split | COMPLETE_ACROSS_CHAIN |
| 7 | SB5 ahfv 40.8k → 12.9k pointer + 3 children | `bf0abec` | rule-split | COMPLETE_ACROSS_CHAIN |
| 8 | FM-02 sub-c META-router enrichment + session-checkpoint cron sub-variant | `9e2a205` | META-router | COMPLETE |
| 9 | settings.json 59k → 21k provenance extraction | `10fc22e` | provenance-extraction | COMPLETE |
| 10 | THIS COMMIT — end-of-arc audit metrics | TBD | audit-metrics-doc | COMPLETE_PENDING_COMMIT |

1 ship remaining to /goal v7-tight cum-cap-11: **Ship 11 = Wave 159 P2 close-synthesis** (`docs/wave159p2-close-synthesis.md`).

## Cite class for this audit-metrics doc

`constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 159 P2 ships D1+D2+D3+D4+SB3+SB4+SB5+Ship-8+Ship-9 same-arc evidence + multi-source-discovery-breadth-discipline.md ≥4-source SOTA audit, TIER-2-SISTER-RULE @ audit-action-loop.md Wire/Surface/Close/Re-fire discipline + cardinal-rule-7 graduated-unleash matrix + multi-source-discovery-breadth-discipline.md ≥4-source mandate]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Forward-only convention

Per `port-note-discipline.md §6`: this audit-metrics doc is forward-only. Historical Wave 159 P2 ship commit bodies remain unmodified. Wave 160 fix-forward priorities queued above; no retroactive rewrites.
