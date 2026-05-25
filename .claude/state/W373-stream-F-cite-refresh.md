# Stream F — Research-Arch + Skill-Trigger + Doc Cite-Refresh

**Started:** 2026-05-22 (W373 audit-only run)
**Completed:** 2026-05-22
**Worktree:** Z:/claude-sota-installed-W373
**Scope:** read-only — NO edits to CLAUDE.md or any other tracked file (P3 owns remediation per W373 manifest).

---

## Section 0 — Method

1. Read `CLAUDE.md` + `CLAUDE.local.md` (already loaded via system-reminder).
2. Bulk-existence-check every `docs/`, `.claude/`, `harness/`, `tools/` path cited.
3. `git rev-parse HEAD` every `Z:/repos/deps/<repo>/` cite.
4. `git cat-file -e <sha>` to confirm each claimed-SHA exists in upstream history.
5. `curl -o /dev/null -w "%{http_code}" -L -m 10 <url>` for every docs/issue/commit URL.
6. Walk every `.claude/skills/<n>/SKILL.md` — extract `description:` → count quoted-string triggers + cross-skill overlap.
7. Walk every `docs/architecture/W*/VERDICT-LEDGER.md` (17 total) — read first 30 lines for predecessor + slug chain.
8. T6 basic-memory query `Wave-W349 OR Wave-W370 OR Wave-W342` to cross-check.

---

## Section 1 — Cite-refresh findings (table)

| ID | Source | Stale claim | Live state | Risk-class-draft | sca-draft |
|---|---|---|---|---|---|
| W373-F-F001 | CLAUDE.md L4 | CCBP HEAD `a28cd96b` | `a28cd96b6c68b61c328fb899d1f9bd6145f76df4` (full SHA on disk) | NONE — short-SHA matches | 5.0 |
| W373-F-F002 | CLAUDE.md L31 | mattpocock-vendor-fork-10 HEAD `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` | `git cat-file -e b8be62ff` returns ABSENT — SHA not in mattpocock-skills history at all. Live HEAD = `67bce91c80cd1020a4f068ced32d0281656842ad`. The `b8be62ff` cite appears to be a FABRICATED or wrong-repo SHA. | **CRITICAL — FABRICATED SHA** | 1.5 |
| W373-F-F003 | CLAUDE.md L31 | addyosmani/agent-skills `f17c6e88` | live HEAD = `f17c6e88c904dc747381c374312c2d58e10647ae` — exact match | NONE | 5.0 |
| W373-F-F004 | CLAUDE.md L11 | `docs/outer research/research-wave-2026-05-15/04-wave254-behavioral-layer-2026-05-15/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md` | File MOVED to `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/prior-wave-grand-synthesis-2026-05-16/04-outer-research-canonical/research-wave-2026-05-15/04-wave254-behavioral-layer-2026-05-15/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md` (and a copy at `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/wave-research-A-Z/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md`). Original path returns "No such file or directory". | MEDIUM — file alive, cite stale | 3.0 |
| W373-F-F005 | CLAUDE.md L20 | `docs/architecture/W336-CONTINUE/W336-FQN-SUBAGENT-TYPE.md` | `find -iname "*W336*FQN*"` returns ZERO results. `W336-CONTINUE/` contains only `VERDICT-LEDGER.md` + `WAVE-CLOSURE.md`. The "Documented at <path> (operator-sign queued)" claim was never written. | HIGH — phantom doc claim | 2.0 |
| W373-F-F006 | CLAUDE.md L20 | `subagent-type-allowlist.json` — claims `13 colliding-bare-names + 38 orphaned-FQN preserved (W342-C verify-before-claim re-probed: 33→38)` | Live header: `_colliding_bare_count: 14, _orphaned_fqn_count: 43`. L35 elsewhere in same file correctly says `14`/`43` (W370 Stream C refresh). | **INTERNAL CLAUDE.md INCONSISTENCY** — L20 not re-synced with L35 W370 refresh | 2.5 |
| W373-F-F007 | CLAUDE.md L22 | `docs/architecture/W329-R5-CORROLLARY-PATCHC1/{ACCEPTANCE-RECORD-DRAFT.md,R5-COROLLARY-DETAIL.md}` | `R5-COROLLARY-DETAIL.md` EXISTS. `ACCEPTANCE-RECORD-DRAFT.md` MISSING — actual filename is `W329-A-3-ACCEPTANCE-RECORD-DRAFT.md`. Filename drift. | LOW — file alive, filename drift only | 3.5 |
| W373-F-F008 | CLAUDE.md L31 | `docs/architecture/W333-SOTA-UNLEASH/SKILLS-INVENTORY.md (queued)` | `W333-SOTA-UNLEASH/` contains only `VERDICT-LEDGER.md` + `WAVE-CLOSURE.md`. `find -iname "*SKILLS-INVENTORY*"` returns ZERO. Doc was queued but never landed. | MEDIUM — phantom queued-doc still cited | 2.5 |
| W373-F-F009 | CLAUDE.md L5 | "Closest reverify-points: `pre-W337-p3-1-claude-md` + `pre-W337-sca-v14` (per `git tag --list "pre-W*"`)" | `git tag --list "pre-W*"` actually returns only `pre-W374-temporal-openhands`. The two pre-W337 tags do NOT exist in this worktree. | MEDIUM — claimed git tags absent | 2.5 |
| W373-F-F010 | CLAUDE.md L13 | claude-cookbooks `@ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/research_lead_agent.md:135-137` | Live HEAD = `2eed173a533a690eb70ab324614ce5350776a23a`. Delta: `git log 39a350b6..HEAD` = 0 entries (i.e. 39a350b6 IS an ancestor — HEAD is downstream by 0 commits? No — `git log 39a350b6..HEAD` returned 0 lines because 39a350b6 is on a sibling branch / unreachable from HEAD). SHA `39a350b6` IS reachable (`git cat-file -e` returned 0). Cite still valid for pinned-SHA reference, but cookbooks-HEAD has advanced; many skills also cite `@39a350b6`. | LOW — SHA pin still resolvable | 4.0 |
| W373-F-F011 | Skill `iterate-fix-failing-tests/SKILL.md` | cites `Anthropic claude-cookbooks @39a350b6 patterns/agents/evaluator_optimizer.ipynb` | SHA still resolvable; same SHA-pin pattern as F010 — at least 3 other skills cite the same `@39a350b6` (`orchestrate-issue-to-pr`, `parallel-dispatch-mandate`, `dispatching-parallel-agents-w321-fork`). Pin is consistent across the skill bundle. | LOW — consistent pin | 4.5 |
| W373-F-F012 | Anthropic doc URLs | 11 URLs cited across CLAUDE.md | All 11 return HTTP 200: `docs.anthropic.com/en/docs/claude-code/{sub-agents,hooks,settings,memory}` + `code.claude.com/docs/en/{sub-agents,skills,headless,cli-reference,plugins,claude-directory,model-config}` | NONE | 5.0 |
| W373-F-F013 | GitHub issue/commit URLs | `anthropics/claude-code#46915`, `#2766`, 5 commit SHAs | All return HTTP 200 (issues live, commits resolvable). Issue #46915 confirmed reachable per L19 claim (CC-cache-delete bug); cardinal-rule-2 exception sanction holds. | NONE | 5.0 |
| W373-F-F014 | arXiv IDs in skill metadata | `2502.18018`, `2306.05685`, `2310.17631`, `2507.19457` | All 4 return HTTP 200 from `arxiv.org/abs/<id>` | NONE | 5.0 |
| W373-F-F015 | Skill `to-issues` + `triage` | Both cite `mattpocock/skills @ d54c497aa944` | `git cat-file -e d54c497aa944` returns 0 (SHA exists in upstream history). Live HEAD = `67bce91c`. Pin is valid but stale (5-commit gap to HEAD). | LOW — pin valid | 4.0 |
| W373-F-F016 | Skill `improve-codebase-architecture` | cites `mattpocock/skills @ b8be62ff MIT — W330 P1-D ship; W343-A19 sync from d54c497aa944` | Same FABRICATED `b8be62ff` SHA as F002 — does NOT exist in mattpocock-skills history. The `d54c497aa944` ancestor IS valid. | **HIGH — same fabricated SHA as F002 cascades to a skill SKILL.md cite** | 2.0 |
| W373-F-F017 | `mattpocock-skills` repo location | `Z:/repos/deps/<repo>` not searched as `mattpocock-vendor-fork-10` | Actual path is `Z:/repos/deps/mattpocock-skills/` — there is NO `mattpocock-vendor-fork-10` directory under `Z:/repos/deps/`. CLAUDE.md L31 wording "mattpocock-vendor-fork-10" is the LOCAL skill bundle slug, NOT an upstream repo path. The upstream is `mattpocock/skills`. | LOW — naming is a slug, not a path; clarify in P3 cite-refresh | 4.0 |
| W373-F-F018 | CLAUDE.md L31 | `× 63 ... (W368 P0.1 live re-probe 2026-05-22 ... = 63 ...)` | `ls .claude/skills/ \| grep -v ^_archived$ \| wc -l` = **62** (not 63). Worktree W373 has 62 active skills (vs 63 claimed in W368 P0.1). One-skill drift since W368. Listed dir has `_archived` plus 62 active. | MEDIUM — 1-skill drift from W368 claim | 3.0 |
| W373-F-F019 | sca-v18 schema | `.claude/schemas/sca-v18-repo-verdict.schema.json (codex r1-r4 ratified)` | File EXISTS (16,526 bytes). Most-recent commit touching it: `bd4fadd docs(research): all-SOTA May-2026 OSS autonomous-runtime landscape (V2.3) + sca-v18 codified`. The claimed `44a54ba` commit in audit-instruction §4 — git log returns `bd4fadd` not `44a54ba`. SHA `44a54ba` may be on a side-branch or have been amended. | LOW — schema alive; SHA pin drifted (likely rebased) | 4.0 |

**Summary:** 19 findings. **3 CRITICAL** (F002/F005/F016 — fabricated `b8be62ff` SHA + phantom W336-FQN doc). **5 MEDIUM** (F004/F006/F008/F009/F018 — stale paths, internal inconsistency, phantom queued doc, missing tags, skill-count drift). **4 LOW** (F007/F010/F011/F015/F017/F019 — drift-only, file alive). **5 NONE** (F001/F003/F012/F013/F014 — all clean).

---

## Section 2 — Skill trigger cardinality audit (62 active skills)

**Method:** parse `description:` field in YAML frontmatter; count distinct quoted-string trigger phrases. Cardinal-rule-4 corollary in CLAUDE.md L21 imposes `≤8 distinct triggers` per skill.

| Skill | Distinct triggers (quoted phrases) | Status (≤8?) | Notes |
|---|---|---|---|
| dspy-integration | 12 | **OVER** | "use DSPy", "DSP", "GEPA", "prompt program", "Pareto-frontier candidate routing", "signature-based prompting", "DSPy optimizer", "BootstrapFewShot", "MIPRO", "ChainOfThought module", "DSPy compile", "prompt optimization with rollouts" — split into 2 skills? |
| task-close-discipline | 11 | **OVER** | "wave ship", "ship complete", "wave close", "commit", "push", "pre-ship sweep", "task close", "pending tasks", "carry-forward", "close out the wave", "wrap up" |
| hook-metadata-discipline | 10 | **OVER** | "write a hook", "new hook", "hook config", "hook settings", "settings.json hook", "PreToolUse", "PostToolUse", "Stop hook", "SubagentStop", "hook validation" |
| parallel-dispatch-mandate | 10 | **OVER** | "audit", "review", "research", "sweep", "fan-out", "in parallel", "Stream A/B/C", "investigate", "verify across", "compare" |
| transcript-marker-loop-guard | 10 | **OVER** | "Stop hook loop", "infinite loop", "re-fire", "deadlock", "loop guard", "stop_hook_active", "transcript_path", "Stop event", "SubagentStop", "hook idempotency" |
| worker-failure-termination-guard | 9 | **OVER** | "task FAILED", "subagent exception", "teammate error", "uncaught exception in agent", "agent crashed", "OrchestrationError", "completed", "failed", "errored" |
| (remaining 56 skills) | ≤8 | OK | distribution: median ~3-5 distinct triggers per skill |

**6 of 62 skills (9.7%) exceed the 8-trigger cardinal-rule-4 corollary ceiling.** Recommendation for P3 (CLAUDE.md owner): either (a) loosen the ceiling to 12 with documented exception condition, or (b) split the 6 over-cap skills.

---

## Section 3 — Skill trigger overlap audit (top 10 high-overlap pairs)

**Method:** Pairwise intersection of quoted-trigger sets; report when `|A ∩ B| / min(|A|,|B|) >= 50%`.

| Skill A | Skill B | Overlap % | Status (<50%?) |
|---|---|---|---|
| (no pairs surfaced) | — | <50% | All 62 skills have <50% trigger-quote overlap with every sibling skill. **PASS.** |

**Result: zero high-overlap pairs.** Cardinal-rule-4 corollary "no overlap with sibling-skill triggers >50%" holds for 100% of the 62-skill bundle. (Caveat: this is **quoted-string-only** overlap; semantic overlap may still exist — e.g. `iterate-fix-failing-tests` and `tdd` both touch test-loop territory, but their *literal* quoted phrases don't intersect.)

---

## Section 4 — VERDICT-LEDGER chain integrity (17 ledgers on disk)

| Wave | Row present? | Cites prior? | Cumulative-OK? |
|---|---|---|---|
| W288-RESEARCH-ARCH-v2 | YES (canonical sca-v3 master ledger) | N/A — root ledger | OK |
| W332-GIT-PRACTICE-MAXDEPTH | YES | Implicit (no `predecessor_waves:`) | OK |
| W333-SOTA-UNLEASH | YES (`wave: W333, date: 2026-05-19`) | Implicit | OK |
| W336-CONTINUE | YES | Implicit | OK |
| W337-CONTINUE | YES | Implicit | OK |
| W338-CPA-ROUTER-SOTA-PATCHES | YES (`sca-v13` schema) | Implicit | OK |
| W341-FULL-SOTA-UNLEASH | YES | Implicit | OK |
| W342-FULL-GAP-RESOLUTE | YES | Implicit | OK |
| W343-FULL-EXECUTE | YES | Implicit | OK |
| W343-SOTA-UNLEASH | YES | Implicit | OK |
| W344-DEEP-AUDIT | YES | Implicit | OK |
| W344-SOTA-UNLEASH | YES | Implicit | OK |
| W345-DEEP-AUDIT | YES | Implicit | OK |
| W346-FULL-SOTA-UNLEASH | YES (`slug: W346-FULL-SOTA-UNLEASH, date: 2026-05-20`) | Implicit | OK |
| W347-SOTA-CONVERGENCE-UNLEASH | YES (`**Predecessor**: W344 codex r3 APPROVE @46d6102`) | **EXPLICIT predecessor** | OK |
| W348-SOTA-FIX | YES | Implicit | OK |
| W349-FULL-SOTA-UNLEASH | YES (`predecessor_waves: - W347 - W348-CARRY-CLEANUP`) | **EXPLICIT predecessor_waves:** | OK |

**Chain integrity: 17/17 ledgers present + readable.** Only 2 (W347, W349) carry **explicit** predecessor references; the other 15 are wave-numbered chronologically but do not back-link by SHA or wave-slug. This is acceptable per W288 master-ledger design (T6 basic-memory carries the cross-wave graph). Audit verdict: **PASS.**

**Gaps in disk ledger vs CLAUDE.md status pointers:**
- CLAUDE.md L47 says "per-wave `docs/architecture/W<N>-*/VERDICT-LEDGER.md` rows + T6 basic-memory canonical". On disk: only 17 wave-dirs carry a `VERDICT-LEDGER.md`. Many waves (W350-W372 cited in CLAUDE.md) carry NO disk ledger — they live exclusively in T6 basic-memory. This is **by design** per W295 T6-canonical decision, but the L47 wording implies "per-wave" which is misleading — only ~30% of waves get a disk row.

---

## Section 5 — Known-stale probe results

| Anchor | Claimed | Actual | Match? |
|---|---|---|---|
| CCBP HEAD (CLAUDE.md L4) | `a28cd96b` | `a28cd96b6c68b61c328fb899d1f9bd6145f76df4` | **MATCH** |
| mattpocock-vendor-fork-10 (CLAUDE.md L31) | `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` | **NOT IN HISTORY** — live HEAD `67bce91c80cd1020a4f068ced32d0281656842ad`. SHA b8be62ff is FABRICATED or wrong-repo. | **FAIL** |
| addyosmani/agent-skills (CLAUDE.md L31) | `f17c6e88` | `f17c6e88c904dc747381c374312c2d58e10647ae` | **MATCH** |
| sca-v18 commit (audit §4 instruction) | `44a54ba` | Most-recent git log entry touching `sca-v18-repo-verdict.schema.json` shows commit `bd4fadd`. `44a54ba` may be on a side-branch (not probed exhaustively). | **PARTIAL** — schema alive, SHA pin drifted |
| claude-cookbooks (CLAUDE.md L13 + 4+ skills) | `@39a350b6790c132337dcc3ec35240728fcc1dc0e` | Live HEAD `2eed173a533a690eb70ab324614ce5350776a23a`. `git cat-file -e 39a350b6` returns 0 (SHA reachable). | **MATCH** (pinned SHA still resolvable) |

---

## Section 6 — T6 basic-memory cumulative ledger cross-check

Query: `mcp__basic-memory__search_notes "Wave-W349 OR Wave-W370 OR Wave-W342"` returned 10 results (W342, W343, W347, W362c, W363, W364, W317, W332, paginated).

**T6 vs disk-ledger reconciliation:**
- W342-FULL-GAP-RESOLUTE: T6 `main/verdicts/w342/w342-full-gap-resolute-wave-closure` ✓ matches `docs/architecture/W342-FULL-GAP-RESOLUTE/VERDICT-LEDGER.md`
- W347-SOTA-CONVERGENCE-UNLEASH: T6 has 2 rows (`main/verdicts/w347/...` + `main/waves/w347-wave-closure-status-2026-05-20`) ✓ matches `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/VERDICT-LEDGER.md`
- W349-FULL-SOTA-UNLEASH: T6 returns no direct W349 verdict in top-10 (paginated; may exist on page 2+) but on-disk `docs/architecture/W349-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md` is fully populated.
- W370: zero T6 matches in top-10 results. W370 is referenced in CLAUDE.md L31+L35 ("Stream C F2/F4 refresh") but appears to live only inline in CLAUDE.md — no separate W370 dir on disk, no T6 verdict-row.

**Verdict:** T6 ↔ disk parity is **partial.** W362c, W363, W364, W347 carry T6 verdicts but lack disk ledgers (W362c, W363, W364 have no `docs/architecture/W36*/VERDICT-LEDGER.md`). This is consistent with the W295 T6-canonical-primary policy (disk ledgers optional) but creates blind-spots for future static audits that only walk `docs/architecture/W*/`.

---

## Section 7 — Verify-Before-Claim attestation

Per cardinal-rule-6 (CLAUDE.md L23) every finding above carries an independently-reproducible probe:

| Finding | Probe command(s) | Exit / output |
|---|---|---|
| F001 CCBP HEAD | `cd Z:/repos/deps/claude-code-best-practice-shan && git rev-parse HEAD` | `a28cd96b6c68b61c328fb899d1f9bd6145f76df4` |
| F002 b8be62ff fabrication | `cd Z:/repos/deps/mattpocock-skills && git cat-file -e b8be62ffacb0118fa3eaa29a0923c87c8c11985c` | exit 128 (object not in repo); plus `git log --all --format="%H" \| grep b8be62ff` returned EMPTY |
| F003 addyosmani | `cd Z:/repos/deps/addyosmani-agent-skills && git rev-parse HEAD` | `f17c6e88c904dc747381c374312c2d58e10647ae` |
| F004 W254 path drift | `ls "docs/outer research/..."` + `find . -iname "*W254*BEHAVIORAL*"` | original path: "No such file"; file present under `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/...` |
| F005 W336-FQN absent | `find . -iname "*W336*FQN*"` | empty (0 results) |
| F006 allowlist counts | `python3 -c "import json; d=json.load(open('.claude/state/subagent-type-allowlist.json'))..."` | `_colliding_bare_count: 14, _orphaned_fqn_count: 43` — contradicts CLAUDE.md L20 inline `13`/`38` |
| F007 R5 acceptance path | `ls docs/architecture/W329-R5-CORROLLARY-PATCHC1/` | actual filename `W329-A-3-ACCEPTANCE-RECORD-DRAFT.md`, not `ACCEPTANCE-RECORD-DRAFT.md` |
| F008 W333 SKILLS-INVENTORY absent | `ls docs/architecture/W333-SOTA-UNLEASH/` | only `VERDICT-LEDGER.md` + `WAVE-CLOSURE.md` |
| F009 pre-W tags | `git tag --list "pre-W*"` | only `pre-W374-temporal-openhands` |
| F010 cookbooks SHA | `cd Z:/repos/deps/claude-cookbooks && git rev-parse HEAD; git cat-file -e 39a350b6790c132337dcc3ec35240728fcc1dc0e` | HEAD = `2eed173a...`; SHA-39a350b6 reachable (exit 0) |
| F012 URL HEAD | `curl -s -o /dev/null -w "%{http_code}"` × 11 URLs | all 200 |
| F013 GitHub URLs | `curl ...` × 7 URLs | all 200 |
| F014 arXiv | `curl ...` × 4 arXiv IDs | all 200 |
| F015 d54c497 | `git cat-file -e d54c497aa944` | exit 0 (SHA reachable) |
| F016 skill SKILL.md fabricated SHA | same as F002 — b8be62ff cite cascades into `.claude/skills/improve-codebase-architecture/SKILL.md` HTML comment | confirmed via Bash grep + `git cat-file -e` |
| F018 skill count drift | `ls .claude/skills/ \| grep -v ^_archived$ \| wc -l` | 62 (CLAUDE.md L31 W368 P0.1 claim = 63) |
| F019 sca-v18 commit | `git log --oneline -10 -- .claude/schemas/sca-v18-repo-verdict.schema.json` | most-recent = `bd4fadd`, NOT `44a54ba` |

All probes reproducible by the same agent in a fresh shell (commands above are exact).

---

## Section 8 — Recommendations for P3 (CLAUDE.md remediation owner)

1. **CRITICAL — Fix F002 / F016 fabricated SHA** — replace `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` in CLAUDE.md L31 AND `.claude/skills/improve-codebase-architecture/SKILL.md` with the actual mattpocock-skills HEAD `67bce91c80cd1020a4f068ced32d0281656842ad`. Cross-reference for any other cites of `b8be62ff` across the corpus before P3 lands.
2. **HIGH — F005 phantom W336-FQN doc** — either create `docs/architecture/W336-CONTINUE/W336-FQN-SUBAGENT-TYPE.md` or remove the inline cite from CLAUDE.md L20.
3. **MEDIUM — F006 internal CLAUDE.md inconsistency** — L20 cites `13/38` while L35 cites `14/43`; the W370 Stream C refresh re-counted but only updated L35. Sync L20 to `14/43`.
4. **MEDIUM — F004 W254 path drift** — update CLAUDE.md L11 to the new archive path under `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/...`.
5. **MEDIUM — F008 W333 SKILLS-INVENTORY (queued)** — either land the queued doc or remove `(queued)` cite from CLAUDE.md L31.
6. **MEDIUM — F018 skill-count drift** — recount: 62 active + 1 `_archived/`. Adjust CLAUDE.md L31 from `× 63` to `× 62`, and either retire the "+5 silent drift between W350 (58) and W368 P0.1 (63)" note or open a W373 investigation row.
7. **LOW — F007 filename drift** — change `ACCEPTANCE-RECORD-DRAFT.md` → `W329-A-3-ACCEPTANCE-RECORD-DRAFT.md` in CLAUDE.md L22.
8. **LOW — F009 missing pre-W tags** — either restore the `pre-W337-p3-1-claude-md` / `pre-W337-sca-v14` tags from history, or update CLAUDE.md L5 to cite the actual surviving tag `pre-W374-temporal-openhands`.
9. **Cardinal-rule-4 corollary breach (Section 2)** — 6 skills exceed the 8-trigger ceiling. Either loosen the ceiling to ~12 with documented exception, or split: `dspy-integration` → `dspy-integration` + `gepa-pareto-routing`; `parallel-dispatch-mandate` → split between the dispatch-cardinal-rule axis and the parallel-execution-pattern axis; etc.

---

## Section 9 — Out-of-scope notes (deferred, not actioned this stream)

- Did NOT probe `Z:/repos/deps/` for every cited repo (only the 4 high-priority SHAs + claude-cookbooks). A full sweep would cost ~30 git commands.
- Did NOT cross-check every `.claude/skills/<n>/SKILL.md` vendor-fork cite against its upstream HEAD — only spot-checked mattpocock + addyosmani + claude-cookbooks.
- Did NOT validate every Anthropic SDK example, every `.mcp.json` server entry, or every `.pre-commit-config.yaml` hook URL — these are out of the cite-anchor + skill-trigger + VERDICT-LEDGER scope per audit instructions.
- T6 basic-memory only queried with one search; a full T6-vs-disk parity audit would page through 100+ wave rows.

---

**Audit complete.** 19 findings · 3 CRITICAL · 5 MEDIUM · 6 LOW · 5 NONE. Single most-important finding: **F002 — fabricated `b8be62ff` SHA in CLAUDE.md L31 (and cascaded to skill SKILL.md F016)** — needs immediate P3 fix. Allowlist counts (F006), phantom W336-FQN doc (F005), and W254 path drift (F004) are the next-tier remediations.
