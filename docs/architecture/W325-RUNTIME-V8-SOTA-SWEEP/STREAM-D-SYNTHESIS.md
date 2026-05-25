# W325 Stream D — Synthesis + Ranked Findings + W326 Ops-AIs

**Wave**: W325 Stream D · **Date**: 2026-05-19 · **HEAD**: `1360aeb`
**Stream scope**: runtime cleanness v8 + SOTA repo re-discovery + multi-MCP convergence sweep
**Time-bound**: ~45 min wall-clock target met (~38 min observed)
**Owner**: docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/* — STRICT-FILE-OWNERSHIP (no settings.json / no skills / no code edited)

---

## §1 — Stream D one-line headline

**Runtime is SHIP-CLEAN-WITH-CARRY-FORWARDS at HEAD `1360aeb`.** Zero net-new SHIP-BLOCKERs; 1 net-new HIGH stale-cite (ccstatusline AppData path slipped W286-A audit); 6-wave `claude doctor` regression continues to grow as silent-fallback failure-mode. 2 T1 INSTALL-CANDIDATEs surfaced via multi-MCP convergence (openlit + anthropics/skills) — both clear sca-v9 4.5 ship-gate; 4 of 5 top-5 candidates need W326 convergence-extension before audit.

---

## §2 — Cardinal-rule invariant table (Stream D self-audit)

| Rule | Status this stream | Evidence |
|---|---|---|
| **R1** (install primitives only from trusted plugins/skills/agents) | ✓ HOLD | No installs performed; analysis-only stream |
| **R2** (hooks = upstream-plugin OR direct-CLI) | ✓ HOLD | settings.json `hooks` audit per CLI-AND-MCP §6 confirms 8 events × direct-CLI body or sanctioned exception |
| **R3** (subagents = installed upstream OR documented) | ✓ HOLD | Stream D ran solo (no subagent dispatch this stream) |
| **R4** (CLAUDE.md + settings.json for behavior; no ad-hoc `.claude/rules/*.md`) | ✓ HOLD | Per W299-A REVERSAL W308: `self_invented_count: 0` HOLDS |
| **R5** (safety via permissions+sandboxing, NOT custom guards) | ⚠ **PARTIAL-HOLD** — 6th convergent finding | `permissions.defaultMode: "bypassPermissions"` + sandbox `enabled:false` SHIP-BLOCKER carry per W316-S1 + W314 Stream E + W316-S4 + W316-S5 L7 + W317-r2-S1 + W325-D F-C-1 |

---

## §3 — Ranked findings master list

Ordered by severity × convergence × actionability:

### HIGH (4 findings)

| ID | Title | Source | Priority | Action |
|----|----|----|----|----|
| **W325-D-F1** | `claude doctor` EXIT-0-silent 6-wave regression | CLEANNESS §2 F-W325-D-CLEAN-1 | P0 | File upstream `anthropics/claude-code` issue with 6-wave reproducer |
| **W325-D-F2** | ccstatusline AppData path (Z:-portability HIGH-violation, W286-A 6th-violation slip) | CLEANNESS §2 F-W325-D-CLEAN-2 | P0 | Replace settings.json:206 with `npx -y ccstatusline@<pinned>` form |
| **W325-D-F3** | R5 SHIP-BLOCKER `bypassPermissions`+sandbox 6-wave convergent | CLEANNESS §3 F-C-1 + cumulative | P0 | Operator-decision W326 — enable sandbox OR document rejection-rationale |
| **W325-D-F4** | basic-memory v0.21.1 pin → v3.3.1 actual = silent version drift | SERVICE-HEALTH §6 W326-D-SVC-1 | P1 | Investigate uvx pin discipline; reconcile pin vs reality |

### MEDIUM (3 findings)

| ID | Title | Source | Priority | Action |
|----|----|----|----|----|
| **W325-D-F5** | tavily MCP wired without cite-anchor in CLAUDE.md/audit-trail | CLI-AND-MCP §5 W326-D-CLI-3 | P1 | Add 1-line cite-anchor entry to CLAUDE.md L35 + `.mcp.json:_comments` |
| **W325-D-F6** | settings.json 15,755B over 15,360B cap (395B excess) | CLEANNESS §2 F-W325-D-CLEAN-4 | P1 | Re-trim via W317-A approach OR raise cap to 16 KB |
| **W325-D-F7** | Langfuse SEV-3 MethodNotAllowedError 15-30min recurrence | SERVICE-HEALTH §2 W326-D-SVC-2 | P1 | Bump to v3.171+ or investigate Next.js 16.2.3 known-issue |

### LOW (5 findings)

| ID | Title | Source | Priority | Action |
|----|----|----|----|----|
| **W325-D-F8** | pyright 1.1.408 vs 1.1.409 (1 patch behind) | CLI-AND-MCP §1 W326-D-CLI-2 | P2 | `pip install -U pyright` in Z:/venvs/claude |
| **W325-D-F9** | nvidia-gpu-exporter port-conflict :9835 (W317-r2-S1 carry) | SERVICE-HEALTH §3 W326-D-SVC-3 | P2 | Operator-decision: retire docker container OR resolve port-conflict |
| **W325-D-F10** | tools/migrate-cognee-state.ps1 obsolete (W312-A.7 closure) | CLEANNESS §4 N-3 | P2 | Move to tools/archive/ or git-delete |
| **W325-D-F11** | tools/sca-v7-prelim.sh:70 scorecard-fail silent-substitution | CLEANNESS §4 N-2 | P2 | Add `>&2 echo` before fallback |
| **W325-D-F12** | ccusage `.mcp.json` CR-9 migration (W314-r2 AI-r2-11 carry) | CLI-AND-MCP §3 W326-D-CLI-5 | P2 | npm-pinned migrate path |

---

## §4 — SOTA discovery summary (10 candidates × sca-v9)

### Verdict roster

| Tier | Candidates | Count |
|---|---|---|
| T1 INSTALL-CANDIDATE | openlit (C-1) + anthropics/skills (C-8) | 2 |
| T2 PATTERN-ONLY | traceloop/openllmetry (C-3) + hatchet (C-6) + pydantic/logfire (C-9) | 3 |
| T2 VENDOR-FORK / HOLD | memvid (C-2) + Tencent (C-5) + VoltAgent (C-7) | 3 |
| T3 PATTERN-VENDOR / EVAL-LANE | EverMind (C-4) + DeepResearch-Bench-II (C-10) | 2 |

### Convergence-quality gate

5 of 10 candidates achieved ≥2 source-family distinct convergence; **only 1 of 5 top-5 achieved ≥3-source-distinct** (the sca-v9 hard floor): C-1 openlit at Σ=4. The other 4 (C-8, C-10, C-2, C-7) require W326 convergence-extension before tier-routing finalizes.

**Anti-bias mandate validated 8th time**: stars (2,454 → 19,409 across roster) anti-correlates with tier assignment.

---

## §5 — W326 operator-AI queue (18 ops, ranked)

### P0 (5 ops)
1. **W326-D-1** — File `anthropics/claude-code` upstream issue: `claude doctor` EXIT-0-silent 6-wave reproducer (W325-D-F1)
2. **W326-D-2** — Fix ccstatusline AppData path in settings.json:206 → `npx -y ccstatusline@<pinned>` form (W325-D-F2)
3. **W326-D-3** — Operator-decision R5 SHIP-BLOCKER (W325-D-F3) — 6-wave convergent
4. **W326-D-4** — sca-v9 full audit pass on openlit/openlit (C-1 T1 INSTALL-CANDIDATE)
5. **W326-D-5** — sca-v9 full audit pass on anthropics/skills (C-8 T1 INSTALL-CANDIDATE, CR-1 priority)

### P1 (8 ops)
6. **W326-D-6** — Resolve basic-memory v0.21.1 → v3.3.1 silent drift (W325-D-F4)
7. **W326-D-7** — Cite-anchor tavily MCP in CLAUDE.md L35 + `.mcp.json:_comments` (W325-D-F5)
8. **W326-D-8** — Re-trim settings.json to ≤15,360B OR raise cap to 16KB (W325-D-F6)
9. **W326-D-9** — Langfuse v3.171+ bump for MethodNotAllowedError fix (W325-D-F7)
10. **W326-D-10** — Wire `imlrz/DeepResearch-Bench-II` as harness Lane F (C-10)
11. **W326-D-11** — Multi-source convergence-extension for C-2 (memvid), C-7 (VoltAgent), C-8 (anthropics), C-10 (DRB-II) — ≥3-source-distinct sca-v9 floor
12. **W326-D-12** — Confirm perplexity API key rotation per W317-r2-SEV1-1
13. **W326-D-13** — nvidia-gpu-exporter port-conflict :9835 decision (W317-r2-S1 carry)

### P2 (5 ops)
14. **W326-D-14** — `pip install -U pyright` (1.1.408 → 1.1.409)
15. **W326-D-15** — Retire/archive `tools/migrate-cognee-state.ps1`
16. **W326-D-16** — Improve `tools/sca-v7-prelim.sh:70` scorecard-fail stderr-log
17. **W326-D-17** — ccusage `.mcp.json` CR-9 migration (W314-r2 carry)
18. **W326-D-18** — Re-verify `.claude/plugins/cache/` dir count vs CLAUDE.md L34 claim (68/64/47)

---

## §6 — Carry-forward to /goal predicate

For operator's next `/goal` synthesis (per `goal-prompt-synthesis` skill mandate), the recommended Stream D contribution:

> **W325-D Stream D ship-summary**: 0 net-new SHIP-BLOCKERs; 4 HIGH findings (1 net-new + 3 carry); 3 MEDIUM; 5 LOW. Top P0 = file `claude doctor` upstream issue (6-wave regression) + fix ccstatusline AppData path (W286-A 6th-slip) + operator-decision R5 SHIP-BLOCKER convergent 6 findings now. Top SOTA = sca-v9 full audit on openlit + anthropics/skills (both T1 INSTALL-CANDIDATE; Σ-distinct 4+ for openlit).

---

## §7 — Stream D self-eval per sca-v9 (META-CHECK)

How well did Stream D do under its own rubric?

- **D38 cohort_overlap_signal**: Stream D candidates overlap with W316 ledger rows #73-77 (microsoft/agent-governance-toolkit + others) — cohort-density medium; new tier (memory + observability + skills + eval) discovered.
- **D40 research_arch_sota_alignment** (sca-v9 NEW dim): cited 9 arxiv papers (Autorubric, AdaRubric, Rulers, DeepResearch-Bench-II, AMA-Bench, Graph-based Memory taxonomy, Memory survey 2603.07670, AdaptOrch, SICA self-improving) — strong research-arch alignment 3/5 → would lift to 4-5 if Stream D actually wired one of these as harness Lane F (it doesn't this wave — recommendation-only).
- **D39 multi-mcp-convergence-quality**: 5 candidates probed, only 1 of 5 achieved ≥3-source-distinct = QUALITY GAP confirmed; W326 must close.
- **Δ33 Stage-0 existence-probe**: applied implicitly via gh REST validating all 10 candidates exist before tier-routing. ✓

**Self-eval composite**: Stream D execution clears 4.0/5 — solid but not SOTA-headline because convergence-extensions weren't completed in this 45-min budget.

---

## §8 — Closure

Stream D delivered all 6 required output files under STRICT-FILE-OWNERSHIP:
- `STREAM-D-CLEANNESS-V8.md` (cleanness scan)
- `STREAM-D-SERVICE-HEALTH.md` (10-service snapshot + diff)
- `STREAM-D-CLI-AND-MCP-V8.md` (versions + 14-MCP audit + hooks audit)
- `STREAM-D-SOTA-CANDIDATES.md` (10 NEW candidates × sca-v9 path-(b))
- `STREAM-D-CONVERGENCE-MATRIX.md` (top-5 × 7-MCP source families)
- `STREAM-D-SYNTHESIS.md` (this file — ranked findings + 18 W326 ops-AIs)

No destructive actions. No settings.json / skills / code modified. No secrets echoed (perplexity SEV-1 key UNROTATED carry referenced as `<redacted-W325>` semantically — no literal key appears in any Stream D output).

CARDINAL RULES R1-R5 status: 4 of 5 HOLD; R5 PARTIAL-HOLD carry-forward (6th convergent finding) demands W326 operator-decision.
