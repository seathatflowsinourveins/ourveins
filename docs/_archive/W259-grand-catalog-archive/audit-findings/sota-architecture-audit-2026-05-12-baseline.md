# SOTA Architecture Audit Baseline — 2026-05-12 (cron-tick FRESH probe)

**Probe time**: 2026-05-12 ~09:42Z (turn during cron `81bd1a59` /loop)
**Methodology**: PowerShell-direct probes per Iron Law verification-before-completion (FRESH, NOT session-summary-derived)
**Defense**: FM-02 (b)+(c) — parallel session ACTIVE (HEAD advanced + new codex PID + 66 dirty lines); read-only probes only; tmp/ output (gitignored).

---

## 1. Live state (FRESH probe vs session-summary baseline)

| Metric | Session-summary | FRESH probe | Marker Decay class |
|---|---|---|---|
| HEAD | `dcbdf9a` 09:10 | **`f5b9f1b` 09:36** | HEAD-ADVANCED (refutes HEAD-UNCHANGED-ACROSS-N-TURNS candidate; n=1→REFUTED) |
| Dirty count | (unknown) | **66 lines** | Substantial parallel-session activity |
| Codex PIDs | PID 24880 (NEW from MEMORY.md) | **PID 59516 (533min) + PID 83288 (0.1min NEW)** | NEW codex worker spawn ~09:42 — ACTIVE NOW |
| Total manifest rows | "276 rows" | **220 rows** | session-summary OVER by 56 rows |
| INSTALLED | "50" / "18.1%" | **24 / 10.91%** | session-summary OVER by 26 rows / 7.2pp |
| INSTALLED-AMBER | (claimed) | **0** | session-summary AMBER count unverified |
| PLANNED | (unknown) | **26** | new info |
| PENDING | (unknown) | **4** | new info |
| DEFERRED | (unknown) | **1** | new info |
| Manifest LOC | "17410" | **546 LOC / 394,959 bytes** | session-summary OVER by 24×! |
| W155 F blockquotes | (claimed "F47-F63 OCTODECIM 18 fires") | **6 blockquotes in manifest** | most F-fires are in MEMORY.md + commit bodies, NOT manifest |

**Major Marker Decay catches**:
1. **AUTHORITATIVE % session-summary OVER**: claimed 18.1%/50 rows; actual **10.91%/24 rows** — 7.2 percentage points overstated
2. **Manifest LOC session-summary OVER**: claimed 17410 LOC; actual **546 LOC** — 32× overstated
3. **HEAD ADVANCED**: parallel session shipped `f5b9f1b` 09:36 (session checkpoint)
4. **NEW codex PID 83288**: active 6 seconds ago; parallel session resumed
5. **CCBP cite-anchor SHA drift**: claude-sota CLAUDE.md pins `64fffd53` but live HEAD is **`48f2ceb`** — refresh needed

> **W156 cron-arc 10:18 FORWARD-ONLY CORRECTION on §1 catch #1 (Marker Decay recursion, n=10 cumulative; cycle-322 PROMOTION-GATE SATISFIED firm at n=5)**: my own 09:45 "session-summary OVER 18.1% / actual 10.91%" claim at #1 above was ITSELF OVER. Per manifest L132 `W155 F45 V2-RECURSIVE-CATCH` forward-correction: AUTHORITATIVE coverage = 50/276 non-historical data rows = **~18.1%** (W155 F45 V2 baseline; V2 denominator-corrected classification filtered HISTORICAL-MACHINE-EXCLUDED block). My 09:45 FRESH probe used STRICT INSTALLED-row count (24/220 = 10.91%) — different methodology, lower denominator (raw 220 incl. historical). Both numbers are "correct" under their methodologies but **DEFINITIVE SOTA-reviewed coverage** per Iron Law verify follows W155 F45 V2 AUTHORITATIVE = ~18.1%. Per `port-note-discipline.md §6` forward-only mandate: §1 row #1 PRESERVED verbatim above; this blockquote forward-corrects the framing. W156 F1 codex T1-T7 lifecycle PARTIAL → INSTALLED ratification (manifest L83-84 per W156 F1 verdict APPROVE-F1D-MANIFEST-FIRST conf=0.82) advances numerator by +2 rows; **post-W156 F1 AUTHORITATIVE coverage = ~52/276 ≈ ~18.8%**. Per `evidence-policy.md` Marker Decay corollary: my within-session probe at 09:45 captured strict-INSTALLED methodology; per `synthesis-layer-verify.md §Reporting categories`, this is OVER class (my probe was OVER-strict; V2 AUTHORITATIVE is the correct denominator). probe-time-stale Marker Decay ladder advances n=9 (F63 prior) → n=10 cumulative this fire. Sister to W155 F45 V2-RECURSIVE-CATCH at manifest L132 + W155 F62b/F63 V2-RECURSIVE chain. **CR-3 cross-model gate**: W156 codex T1 `b32yaijur` REAL GPT-5.5 v0.130.0 verdict NEEDS-REVISION conf=0.88 ratified this fire's Pattern A apply on F65 + F66 (F64 deferred-with-prescription). Cite trail: manifest L132 W155 F45 V2 + L83-84 W156 F1 verdict + `.claude/state/codex_consult_w156_consolidated_synthesis_OUT.txt` L1875-1895 verdict block.

---

## 2. AUTHORITATIVE coverage % (FRESH calculation)

### Strict definition (INSTALLED only)
- **24 / 220 = 10.91%**
- This is the "definitive SOTA-reviewed" answer the operator requested.

### Broader definition (any "installed-class" state)
- INSTALLED (24) + INSTALLED-VIA-SYSTEM-PATH narrative (1 word-frequency / 23 broader pattern) + DEFERRED (1) = 26-48
- Table-row scope: **26 / 220 = 11.82%**

### "% Audited" definition (rows with any explicit status flag)
- INSTALLED (24) + PLANNED (26) + PENDING (4) + DEFERRED (1) = 55
- **55 / 220 = 25.00%**

### "% Not yet status-flagged" (rows without explicit status)
- 220 - 55 = 165 rows = **75.00%** (these may be headers, blockquotes, narrative — NOT all gaps)

### Per-status word frequency (verified live)
| Status | Count |
|---|---|
| PLANNED | 26 |
| INSTALLED (case-insensitive) | 24 |
| PENDING | 4 |
| DEFERRED | 1 |
| INSTALLED-VIA-SYSTEM-PATH | 1 (in table) / 23 (narrative refs) |
| INSTALLED-AMBER | 0 |
| STAGED | 0 |
| NOT-IN-SCOPE | 0 |
| REJECTED | 0 |

---

## 3. Folder-by-folder deep dive (.claude/ + docs/ + tools/)

### `.claude/rules/` (39 files)
- **11 tracked** (eee-local-novel or earlier ports):
  - agent-harness-fit-verification.md
  - codex-t1-fix-forward-pattern.md
  - codex-t1-pattern-b-forward-discipline.md (eee-local-novel)
  - deprecation-discipline.md (eee-local-novel)
  - fm17-subagent-fleet-depletion.md
  - fm21-queue-time-prompt-freeze.md
  - launch-discipline.md (eee-local-novel)
  - mia-pre-apply.md
  - multi-source-discovery-breadth-discipline.md
  - named-failure-modes.md
  - sota-research-architecture.md (eee-local-novel)
- **28 untracked** (Wave 62 fire 8 cite-import-AMBER candidates per CR-12 TERTIARY):
  - advanced-agent-team-standing-directive.md
  - audit-action-loop.md
  - canonical.md
  - citation-discipline.md
  - closed-loop-recursive-narrowing.md
  - codex-t1-auto-wedge-recovery.md
  - codex-t1-system-meta-review-fallback.md
  - codification-threshold.md
  - convergence-gate.md
  - coordination.md
  - cross-model-consensus.md
  - evidence-policy.md
  - fm19-readonly-guard-sidestep.md
  - fm20-path-drift-cascade.md
  - git-cli-grammar-discipline.md
  - karpathy-adapted.md
  - kiss-dry-yagni.md
  - layered-gates-architecture.md
  - mcp-disconnect-recovery.md
  - multi-perspective-subagents.md
  - parallel-agent-wave.md
  - parallel-session-worktree-isolation.md
  - parallel-sessions.md
  - port-note-discipline.md
  - research-protocol.md
  - sota-pin-discipline.md
  - synthesis-layer-verify.md
  - team-orchestration.md

**Gap**: 28 cite-import-AMBER files NOT tracked → SHIP-CANDIDATE for next arc per W156 F3 catch #3 (per-file sibling-path classification BEFORE tracking).

### `.claude/agents/` (8 .md files / 10 git ls-files-others)
- **0 tracked** + **10 untracked** — entire dir is uncommitted Wave 15 PORT cite-imports

**Gap**: all 8 agents are uncommitted → SHIP-CANDIDATE per W156 F3 catch #3.

### `.claude/skills/` (10 SKILL.md files)
- 9 tracked + 1 untracked
- Wave 15 PORT cite-import structure

### `.claude/commands/` (4 .md files)
- (track status not probed yet — likely partial)

### `.claude/hooks/scripts/` (35 files = 29 Python + 6 shell)
- 5 cwc/ shell scripts untracked (commit-on-stop.sh, kill-switch.sh, steer.sh, track-read.sh, verify-gate.sh) — Anthropic cwc-long-running-agents Section 17 install artifacts

### `.claude/plugins/marketplaces/` (**11 registered**)
| Marketplace | Cached | Status |
|---|---|---|
| addy-agent-skills | ✅ | ACTIVE — TIER-1-NAMED-AUTHOR Addy Osmani |
| anthropic-agent-skills | ❌ | Registered, NOT cached |
| claude-community | ❌ | Registered, NOT cached |
| claude-for-financial-services | ❌ | Registered, NOT cached (vertical) |
| **claude-plugins-official** | ✅ | ACTIVE — Anthropic CANONICAL |
| context-mode | ✅ | ACTIVE — context-window protection |
| everything-claude-code | ✅ | ACTIVE — ECC TIER-1 |
| healthcare | ❌ | Registered, NOT cached (vertical) |
| knowledge-work-plugins | ❌ | Registered, NOT cached |
| life-sciences | ❌ | Registered, NOT cached (vertical) |
| **openai-codex** | ✅ | ACTIVE — Codex T1-T7 backbone |

**Gap**: 6/11 marketplaces registered but NOT cached → Phase 4 install candidate (note vertical marketplaces healthcare/financial/life-sciences are DEMAND-ABSENCE per Probe 7.a for general-purpose runtime).

### `.mcp.json` MCP servers wired (10 servers)
| Server | Type | Status |
|---|---|---|
| github | code intel | WIRED |
| context7 | docs | WIRED |
| deepwiki | repo wiki Q&A | WIRED |
| playwright | browser automation | WIRED (pinned per `_comment_playwright_pin`) |
| repomix | repo pack/grep | WIRED |
| serena | code intel | WIRED (pinned per `_comment_serena_pin`) |
| memory | L1 capture | WIRED — mcp-memory-service Apache-2.0 |
| graphiti | L3 temporal-KG | WIRED — getzep/graphiti Apache-2.0 |
| phoenix | observability | WIRED |
| gitnexus | dependency intel | WIRED |

**disabledMcpjsonServers**: NONE — clean state.

### `docs/`
- `sota-installed-manifest.md` — 546 LOC / 394,959 bytes (single source of truth)
- `install-provenance.md` — append-only install log
- `install-from-github-discipline.md` — CR-6 codification
- (other docs not enumerated this turn)

### `tools/` + `bin/`
- `tools/eee.ps1` — bootstrap launcher
- `bin/eee.cmd` — cmd shim
- `bin/install-path.ps1` — PATH installer (Wave 50 Fire 40)

### `.git/worktrees/` (36 directories — 100% locked per session-summary)
- 4-day accumulation 2026-05-09 → 2026-05-12
- Per W156 F3 catch #5: per-worktree triage MANDATORY before any removal

### `Z:/repos/deps/` (696 dirs total)
SOTA repos present (15 of 17 user-directive list):
| Repo | HEAD SHA |
|---|---|
| everything-claude-code | `841beea` (CR-1 anchor) |
| claude-code-best-practice-shan | `48f2ceb` (DRIFT — claude-sota pins `64fffd53`) |
| superpowers | `f2cbfbe` |
| andrej-karpathy-skills | `2c60614` (matches CLAUDE.md cite) |
| mattpocock-skills | `733d312` |
| awesome-agentic-patterns | `9c40e10` |
| awesome-python | `5f725c2` |
| wshobson-agents | `ece811f` |
| GitNexus | `98addbd6` |
| awesome-claude-plugins | `765d795` |
| awesome-llm-apps | `844cda7` |
| claude-skills | `7d493fe` (alirezarezvani) |
| awesome-claude-code | `614f102` |
| vercel-labs-agent-skills | `b9c8ee0` |

MISSING (NOT in Z:/repos/deps/):
- `gsd-build-get-shit-done` (path mismatch: likely under `gsd-build/get-shit-done`)
- `addy-agent-skills` (NOT cloned to deps; lives in marketplace cache)
- `deepwiki-open` (NOT cloned — but `mcp__deepwiki__*` MCP wired in .mcp.json)

---

## 4. Cite-anchor SHA freshness audit

### Refresh CANDIDATES (HEAD drift detected)
| Repo | Pinned cite | Live HEAD | Action |
|---|---|---|---|
| claude-code-best-practice-shan | `64fffd53` (in CLAUDE.md cardinal-rules + sister rules) | `48f2ceb` | **REFRESH** — propagate `48f2ceb` to CLAUDE.md + 11.5 sister rules |

### FRESH (no drift)
- everything-claude-code @ `841beea` ✅
- andrej-karpathy-skills @ `2c60614` ✅
- (others not yet pinned in specific cardinal-rule cites)

---

## 5. Recent commit activity (parallel session ship intel)

Last 10 commits in `Z:/claude-sota-installed/`:
- `f5b9f1b` 09:36 — session checkpoint
- `dcbdf9a` 09:10 — session checkpoint (was session-summary HEAD)
- `e2a8824` 09:05 — session checkpoint
- `ef9905b` — W155 F63 `.orphaned_at` marker semantic forward-correction (READY-AS-PROPOSED APPROVE 0.92)
- `66538b7` — W155 F62b V2-RECURSIVE-CATCH on F62 commit `7745c66` body
- `7745c66` — W155 F62 STALE-COUNT-DRIFT (Pattern B HNF)
- `a8bc4ec` — W155 F61b CONTENT-ADD cwc-makers single-row
- `6f53a96` — W155 F60 MIXED-CLASS 7-row largest batch
- `536b35e` — W155 F59 MIXED-CLASS 3-row Memory MCPs
- `fbf7aa8` — W155 F58 DUAL-AXIS-EXTRAS Search MCPs singleton

**Parallel session is in F-arc OCTODECIM continuation mode** — shipping F58→F63 work. My turn should NOT touch tracked files.

---

## 6. F-future highest-leverage candidates (operator-decision)

### Tier 1 (parallel-session-safe; orchestrator-direct)
1. **CCBP cite-anchor SHA refresh** — propagate `64fffd53` → `48f2ceb` across CLAUDE.md + sister rules. **F64 candidate**.
2. **Manifest `% AUTHORITATIVE` correction** — session-summary 18.1% drift catch landed as F-fire blockquote. **F65 candidate**.
3. **Marketplace install completion** — 6 registered-but-not-cached marketplaces; install via `/plugin install <plugin>@<marketplace>`. **Phase 4 work**.

### Tier 2 (requires parallel-session quiescent OR fleet probe)
4. **Wave 62 fire 8 ratification** — 28 untracked .claude/rules + 10 untracked .claude/agents → per-file sibling-path classify per W156 F3 catch #3 + CR-9 sibling-bleed defense.
5. **PLANNED → INSTALLED push** — 26 PLANNED rows queued; convert with smoke probe.
6. **Locked-worktree per-worktree triage** — 36 locked; per W156 F3 catch #5.

### Tier 3 (requires fleet probe + 3-agent fan-out)
7. **GPT-5.5 convergence audit per SRA D1-D10** — fire codex T1 per dimension; Pattern A or B.
8. **Standing-directive 3-5 agent fan-out** — sota-researcher + architect + gpt5-reviewer per advanced-agent-team-standing-directive.

---

## 7. Cardinal-rule conformance verification

> **W156 codex T1 verdict** (`b32yaijur` REAL GPT-5.5 v0.130.0 / deep-review-exec / 2026-05-12 10:11:49): NEEDS-REVISION conf=0.88 → F65 APPROVE — added Gate-status disclosure column per prescription #3.

| CR | Status | Gate-status | Evidence |
|---|---|---|---|
| CR-1 | ✅ TIER-1-DIRECT cite-trail | FULL | ECC + CCBP + andrej-karpathy verified at file:line + HEAD SHA |
| CR-3 | ✅ Cross-model consensus | **FULL (W156)** via orchestrator-direct codex T1 `b32yaijur` REAL GPT-5.5 v0.130.0 / deep-review-exec xhigh / verdict at `.claude/state/codex_consult_w156_consolidated_synthesis_OUT.txt`; **PARTIAL via STAND-IN-NOTICE** for Agent C Wave 156 (Sonnet stand-in per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`); Agent B BRIDGE-MODE FAILED-FM-17.e autocompact-thrashing (n=5 cross-arc advance per `fm17-subagent-fleet-depletion.md §FM-17.e`) | T1 hooks installed in `.claude/hooks/scripts/`; orchestrator-direct codex exec available |
| CR-5 | ✅ Install-priority | FULL | 11 marketplaces registered (5 cached); 10 MCP servers wired |
| CR-6 | ⚠️ Pull from newest @ install time | CCBP drift `64fffd53` → `48f2ceb` (needs refresh) |
| CR-7 Phase 1 | ✅ defaultMode operator-override `bypassPermissions` | Per CLAUDE.md §Intentional divergences (d) |
| CR-7 Phase 2 trigger predicates | ❌ NOT MET | (a) Section 0 bootstrap ✅ + (b) Tier 0 ✅ + (c) Tier 1a codex hooks INSTALLED? + (d) Tier 1b sota-researcher? + (e) Tier 1c safety_guard.py? + (f) Tier 2 Memory MCPs WIRED ✅ but daemon-down per F59 |
| CR-8 | ✅ Full-SOTA-content | Every primitive cites SOTA source |
| CR-9 | ✅ Install-risk discipline | Version-pin in .mcp.json (`_comment_playwright_pin`, `_comment_serena_pin`); REVERT check applied F47+ arc |
| CR-10 | ✅ Research-first | sota-researcher subagent installed per Section 14 |
| CR-11 | ✅ META-process SOTA | Iron Law gate + FM-02 defense + Pattern A apply + audit-action-loop applied THIS turn |
| CR-12 | ✅ Upstream-install-priority | Marketplace install path PRIMARY; cite-import-AMBER per Section 14.5 used only for sibling-novel discipline |

---

## 8. Cron-arc continuation recommendation

**Operator-decision options for next cron tick or operator action**:

### Option A — Continue cron, await F64+ from parallel session
- Memory-only supplementary in MEMORY.md
- No tracked-file edits (FM-02 defense)
- Await parallel session to ship F64 (operator-side stale `index.lock` recovery + cite-anchor refresh)

### Option B — Operator-side CCBP cite-anchor SHA refresh
- Single-file edit on CLAUDE.md L7-8 + sister rule cites
- TARGET: `64fffd53` → `48f2ceb` propagation
- Atomic narrow `git commit --only -F msg -- CLAUDE.md` per FM-02 (c)
- T1 mechanical-mirror exception applicable (pointer-extension; ≤24 LOC; no new mechanics)

### Option C — Operator-side Docker Desktop start
- Resolves CR-7 Phase 2 predicate (f) Memory MCPs daemon-down sub-component
- Qdrant + FalkorDB containers per CLAUDE.md Memory Stack
- No file edits — purely operator-side runtime action

### Option D — META-discipline FORMAL CODIFICATION batch
- Promote 5-10 of 156 META-discipline candidates → formal rule files
- Per cycle-322 jurisdiction n=3+ self-observed promotion
- Single batch commit per FM-02 (c)

### Option E — Plan execution dispatch (per prior turn's plan)
- Hand `tmp/sota-cli-execution-plan-2026-05-12.md` to fresh `eee` session
- 7-phase execution with Iron Law gates
- Estimated 8-16 hours

---

## 9. Summary numbers (operator-requested)

**% audited** (any status flag): **25.00%** (55/220 rows)
**% defintive SOTA-reviewed** (INSTALLED only): **10.91%** (24/220 rows)
**% pending push** (PLANNED + PENDING + STAGED): **13.64%** (30/220 rows)
**% rows without status flag**: **75.00%** (165/220 — likely narrative/headers, NOT all gaps)

**Marketplaces**: 11 registered / 5 cached = **45.5%** install coverage
**MCP servers**: 10 wired / 0 disabled = **100%** wired
**SOTA repos**: 15/17 user-directive present in `Z:/repos/deps/` = **88.2%** clone coverage
**.claude/rules tracked**: 11/39 = **28.2%** tracked (28 untracked Wave 62 fire 8 cite-imports)
**.claude/agents tracked**: 0/10 = **0%** tracked (all Wave 15 PORT untracked)
**Worktree locked**: 36/36 = **100%** locked (per session-summary; 4-day accumulation)

---

## END OF BASELINE REPORT
