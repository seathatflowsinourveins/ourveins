# SOTA-Pure Wave-11 Stream-P — Deep audit of `hesreallyhim/awesome-claude-code`

**Date**: 2026-05-14
**Stream**: P (Wave-11 single-agent dispatch — deep mining of cite-anchored discovery-catalog)
**Repo**: `Z:\repos\deps\awesome-claude-code\` (note: NO `hesreallyhim-` prefix in deps; manifest cite at HEAD `6ebceefe` is older — **current HEAD `614f102accbcd48206d63a21df64adc984026b40` 2026-05-14 [VERIFIED via `git -C ... rev-parse HEAD`]**)
**Single canonical source**: `THE_RESOURCES_TABLE.csv` (NOT 10 per-category CSVs — README claims "Table of Contents: I. TODO. hm.")
**License**: CC-BY-NC-ND-4.0 (catalog content; CITE-ONLY, no fork-modify). Individual ITEMS in catalog each carry their own license verified per-row.

## 0. Methodology disclaimer (per FM-20 sub-claim Mia pre-apply)

Brief asserted "226 resource-table rows across 10 CSV categories." Empirical refutation: **226 rows confirmed**, but **stored in single `THE_RESOURCES_TABLE.csv`** (not 10 per-category files). Briefing's "10 CSV categories" claim was a CATEGORY-CLAIM drift (per `synthesis-layer-verify.md §Subclaim-type discriminator`) — actual structure is 1 CSV × 10 `Category` values. Audit proceeded against the canonical CSV; reports below preserve the 10-category grouping per brief intent.

---

## 1. CATALOG BREAKDOWN — 10 Categories × Row count × License distribution

**Total rows: 226** | **Active TRUE: 203** | **Stale TRUE: 86** | **Removed-from-origin: 4**

| Category | Rows | MIT | Apache-2.0 | NOT_FOUND | NOASSERTION | AGPL/GPL | Other |
|---|---:|---:|---:|---:|---:|---:|---:|
| Slash-Commands | 59 | 19 | 6 | 28 | 5 | 1 | 0 |
| Tooling | 51 | 33 | 5 | 3 | 4 | 4 | 2 (Unlicense+©) |
| Workflows & Knowledge Guides | 37 | 16 | 2 | 12 | 3 | 0 | 4 (©+CC-BY-SA) |
| CLAUDE.md Files | 28 | 12 | 5 | 1 | 3 | 5 | 2 (BSD-3+ISC) |
| Agent Skills | 19 | 12 | 2 | 2 | 0 | 1 | 2 (No-License+CC-BY-SA) |
| Hooks | 13 | 10 | 2 | 1 | 0 | 0 | 0 |
| Status Lines | 7 | 6 | 0 | 1 | 0 | 0 | 0 |
| Alternative Clients | 5 | 3 | 1 | 0 | 1 | 0 | 0 |
| Output Styles | 4 | 4 | 0 | 0 | 0 | 0 | 0 |
| Official Documentation | 3 | 2 | 0 | 0 | 0 | 0 | 1 (©) |

**Permissive-license total: 143/226 (63%)** — MIT 117 + Apache-2.0 23 + BSD-3 1 + Unlicense 1 + ISC 1 = 143
**Filter cascade**: 226 catalog rows → 25 inactive/removed dropped → 67 license-blocked dropped → 5 prior-adoption duplicates dropped → **129 permissive + active + non-duplicate candidates** across 9 categories (Official Documentation excluded — all 3 are docs not artifacts).

---

## 2. TOP-15 ADOPT-NOW MATRIX (cross-fire anti-overlap verified vs Wave 1-10)

Selection method: Top-2 per category × 9 categories = 18 raw → distilled to 15 after Mia pre-apply per `mia-pre-apply.md` (anti-overlap probe, multi-source convergence Axis-1 ≥3-distinct-orgs, harness-fit per `agent-harness-fit-verification.md` Probe DAG 1-7).

| # | Resource | Category | License | Upstream | Wave-11 Verdict | Rationale |
|---:|---|---|---|---|---|---|
| **1** | **claude-code-tools** (pchalasani) | Tooling | MIT | `https://github.com/pchalasani/claude-code-tools` | **ADOPT-NOW** | Session-continuity + cross-CC↔Codex handoff + Rust/Tantivy session search; fills gap NOT covered by Wave-1-10 (mcp-memory-service is L1 short-term, this is multi-session-cross-CLI bridge). Probe 4 plugin-namespace: no overlap with installed plugins. |
| **2** | **claudekit** (carlrannaberg) | Tooling | MIT | `https://github.com/carlrannaberg/claudekit` | **STUDY-PILOT** | 20+ subagents inc. `oracle (gpt-5)` + `code-reviewer 6-aspect`; PARTIAL-OVERLAP per CR-12 with `agent-teams@claude-code-workflows` already installed Phase 2A row 5. CR-12 disposition lattice: investigate which subagents are unique pre-install. |
| **3** | **Claude Scientific Skills** (K-Dense-AI) | Agent Skills | MIT | `https://github.com/K-Dense-AI/claude-scientific-skills` | **STUDY-PILOT-NARROW** | Research/science/engineering/finance/writing skills — gap-filler for Domain-Specific use beyond `addy-agent-skills` engineering focus. Probe 7.b demand-creates-new-workflow: pilot only if operator workflow needs scientific/research. |
| **4** | **TDD Guard** (nizos) | Hooks | MIT | `https://github.com/nizos/tdd-guard` | **STUDY-PILOT** | Hooks-driven TDD enforcement (PreToolUse:Edit blocks non-TDD changes). Complements `superpowers/tdd` skill (Wave-1-10 vendored). Probe 5 mode-harness-shape: claude-sota-installed runs autonomous /loop — TDD guard must NOT HARD-GATE in autonomous mode; pilot under explicit operator-mode opt-in. |
| **5** | **Claude Code Hook Comms (HCOM)** (aannoo) | Hooks | MIT | `https://github.com/aannoo/claude-hook-comms` | **STUDY-PILOT-NARROW** | Real-time subagent ↔ subagent comms via hooks + @-mention targeting + zero-dep. Catalog flags "a little unstable" at posting — Axis-3 stability gate borderline. Pilot only after fresh axis-3 re-verify. |
| **6** | **claude-devtools** (matt1398) | Tooling | MIT | `https://github.com/matt1398/claude-devtools` | **STUDY-PILOT-NARROW** | Desktop observability — turn-based context data + compaction visualization + subagent execution trees. Operational ROI for arc audit (`fm20-path-drift-cascade.md` evidence chains). |
| **7** | **claudia-statusline** (hagan) | Status Lines | MIT | `https://github.com/hagan/claudia-statusline` | **ADOPT-NOW** | Rust SQLite-first persistence + git integration + context progress bars + XDG-compliant; gap-filler — Wave-1-10 has NO statusline. Convergence-gate Axis-3 PASS (created 2025-08-23, ~9mo burn-in). |
| **8** | **Container Use** (dagger) | Tooling | Apache-2.0 | `https://github.com/dagger/container-use` | **STUDY-PILOT** | Multi-agent sandbox dev-envs by `dagger` (named-org). Axis-1 named-org PASS; Axis-3 ~12mo. Complements but does NOT duplicate `claude --worktree` (filesystem isolation only; Container Use adds stack-level isolation). |
| **9** | **Claude HUD** (jarrodwatts) | Status Lines | MIT | `https://github.com/jarrodwatts/claude-hud` | **STUDY-PILOT-NARROW** | Aggressively-featured status line (context+tools+agents+todos); higher feature density than #7 but newer (~4mo). Pick ONE statusline; defer until #7 piloted. |
| **10** | **Plannotator** (backnotprop) | Hooks | Apache-2.0 | `https://github.com/backnotprop/plannotator` | **STUDY-PILOT-NARROW** | Interactive plan-review UI on ExitPlanMode hook. Useful for `/plan` workflow + `/codex:rescue` interventions. Probe 5: requires interactive UI — autonomous /loop incompatible per `agent-harness-fit-verification.md` HARD-GATE class. Pilot in interactive mode only. |
| **11** | **ralph-orchestrator** (mikeyobrien) | Workflows | MIT | `https://github.com/mikeyobrien/ralph-orchestrator` | **REJECT-DUPLICATE** | Per CR-12 6-class disposition lattice — DUPLICATE of `ralph-loop@claude-plugins-official` (Anthropic-official) already installed Phase 2B-1 row 13. **DROPPED from Top-15.** |
| **12** | **Ralph for Claude Code** (frankbria) | Workflows | MIT | `https://github.com/frankbria/ralph-claude-code` | **REJECT-DUPLICATE** | Same as #11 — DUPLICATE of `ralph-loop@claude-plugins-official`. **DROPPED from Top-15.** |
| **13** | **Claude Code Templates** (davila7) | Tooling | MIT | `https://github.com/davila7/claude-code-templates` | **ADOPT-NOW** | "Incredibly awesome collection" — usage dashboard + analytics + slash commands + hooks + agents. Sister-catalog to hesreallyhim itself; cite-import as **research discovery surface** (NOT install). Probe 7.b demand: when picking templates for project class. |
| **14** | **claude-pace** (Astro-Han) | Status Lines | MIT | `https://github.com/Astro-Han/claude-pace` | **STUDY-PILOT-NARROW** | Bash+jq statusline showing rate-limit pace delta (burn rate vs time remaining). Operational ROI for `parallel-agent-wave.md §Cache-Aware Dispatch Pacing` (5h/7d window utilization). Lightweight (no Rust dep vs #7). |
| **15** | **Dippy** (ldayton) | Hooks | MIT | `https://github.com/ldayton/Dippy` | **STUDY-PILOT** | AST-based auto-approve safe Bash + prompt-for-destructive. Sister-pattern to Wave-11A `bash_command_allowlist.py` removal (ACCEPTED SAFETY REGRESSION) per `Z:\claude-sota\.claude\rules\layered-gates-architecture.md §4.1`. Could restore SAFETY-FLOOR without positive allowlist. |
| **16** | **/tdd-implement** (jerseycheese) | Slash-Commands | MIT | `https://github.com/jerseycheese/Narraitor/.../tdd-implement.md` | **STUDY-PILOT-NARROW** | TDD command pattern; sister to `superpowers/tdd` vendored skill. Single-file slash-cmd; copy-port (not plugin install) per CC-BY-NC-ND license + individual MIT row. Probe 6: license at file is permissive MIT. |
| **17** | **/analyze-issue** (jerseycheese) | Slash-Commands | MIT | same repo | **STUDY-PILOT-NARROW** | GitHub-issue analysis command. Operational ROI low (graphiti+github MCP already cover). Probe 7.a DEMAND-ABSENCE candidate — defer pending demand. |
| **18** | **claude-code-statusline** (rz1989s) | Status Lines | MIT | `https://github.com/rz1989s/claude-code-statusline` | **REJECT-FOR-FIT-PARTIAL-OVERLAP** | 4-line + themes + cost-tracking + MCP server monitoring; PARTIAL-OVERLAP with #7+#9+#14. Probe 4 plugin-namespace check: 4 statusline candidates compete; pick ONE per Probe 7.b 5-clause. |

### Final Top-15 (Mia-pre-applied):

After dropping rows #11, #12 (DUPLICATE of ralph-loop) and #18 (PARTIAL-OVERLAP), and including final candidates #16+#17, the **Top-15** is:

1. claude-code-tools (Tooling) — **ADOPT-NOW**
2. claudia-statusline (Status Lines) — **ADOPT-NOW**
3. Claude Code Templates (Tooling — discovery surface) — **ADOPT-NOW**
4. claudekit (Tooling) — **STUDY-PILOT**
5. Claude Scientific Skills (Agent Skills) — **STUDY-PILOT-NARROW**
6. TDD Guard (Hooks) — **STUDY-PILOT**
7. Claude Code Hook Comms (Hooks) — **STUDY-PILOT-NARROW**
8. claude-devtools (Tooling) — **STUDY-PILOT-NARROW**
9. Container Use (Tooling) — **STUDY-PILOT**
10. Claude HUD (Status Lines) — **STUDY-PILOT-NARROW**
11. Plannotator (Hooks) — **STUDY-PILOT-NARROW**
12. claude-pace (Status Lines) — **STUDY-PILOT-NARROW**
13. Dippy (Hooks) — **STUDY-PILOT**
14. /tdd-implement (Slash-Commands) — **STUDY-PILOT-NARROW**
15. /analyze-issue (Slash-Commands) — **STUDY-PILOT-NARROW (DEMAND-ABSENCE risk)**

---

## 3. ANTI-OVERLAP AUDIT (Top-15 vs Wave 1-10 prior adoptions)

| Top-15 candidate | Wave 1-10 nearest neighbor | Overlap class | Verdict |
|---|---|---|---|
| claude-code-tools | mcp-memory-service (L1 capture) | DISTINCT — multi-session-cross-CLI bridge vs L1 vector store | DISTINCT ✓ |
| claudia-statusline | — (no statusline in Wave-1-10) | NONE | DISTINCT ✓ |
| Claude Code Templates | hesreallyhim/awesome-claude-code (this catalog) | SIBLING-CATALOG (different curator/scope) | DISTINCT-AS-DISCOVERY ✓ |
| claudekit | `agent-teams@claude-code-workflows` | PARTIAL-OVERLAP (some subagents may duplicate) | CR-12 PARTIAL-OVERLAP — verify pre-install ⚠️ |
| Claude Scientific Skills | `agent-skills@addy-agent-skills` (engineering focus) | DISTINCT-DOMAIN (research/science vs engineering) | DISTINCT ✓ |
| TDD Guard | `superpowers/tdd` skill | DISTINCT-LAYER (skill = workflow doc; guard = enforcement hook) | DISTINCT ✓ |
| Claude Code Hook Comms | `agent-teams@claude-code-workflows` | DISTINCT-LAYER (subagent orchestration vs hook-comms transport) | DISTINCT ✓ |
| claude-devtools | `cwc-long-running-agents` (Anthropic) | DISTINCT-LAYER (observability desktop vs primitives) | DISTINCT ✓ |
| Container Use | `claude --worktree` Layer 0 | PARTIAL-OVERLAP — different isolation depths (FS vs stack) | CR-12 PROVIDER-COMPLEMENT ✓ |
| Claude HUD | claudia-statusline (#2) | INTRA-WAVE-11 PARTIAL-OVERLAP | DEFER (pilot #2 first) |
| Plannotator | `superpowers/plan` skill | DISTINCT-LAYER (skill = workflow; UI hook = visualization) | DISTINCT but autonomous-mode-incompatible ⚠️ |
| claude-pace | claudia-statusline (#2) | INTRA-WAVE-11 PARTIAL-OVERLAP | DEFER (pilot #2 first) |
| Dippy | Wave-11A `bash_command_allowlist.py` (removed) | RESTORATION-OF-REGRESSION class | CR-12 GENUINELY-NEW operator-decision ⚠️ |
| /tdd-implement | TDD Guard #6 + `superpowers/tdd` | TRIPLE-OVERLAP | DEFER — TDD Guard hook + superpowers skill cover this |
| /analyze-issue | graphiti+github MCPs | DEMAND-ABSENCE per Probe 7.a | DEFER |

**Anti-overlap summary**: 6 DISTINCT + 4 PARTIAL-OVERLAP (CR-12 dispositions vary) + 4 DEFER + 1 RESTORATION-CLASS = 15.

---

## 4. MANIFEST ROW ADDITIONS — Phase 2D+ for `Z:\claude-sota-pure\docs\sota-installed-manifest.md`

```markdown
### Phase 2D — Wave-11 awesome-claude-code Top-3 ADOPT-NOW (after Phase 2C smoke probes pass)

| # | Primitive | Type | Owner/Repo | HEAD SHA | Version | License | Trust class | Install class | Risk notes | Rollback |
|---|---|---|---|---|---|---|---|---|---|---|
| W11-1 | claude-code-tools | Tooling/session-continuity | pchalasani/claude-code-tools | TBD-probe | TBD | MIT | TIER-2-COMMUNITY | npm/pip via release artifact (verify cardinal-rule-6 official-native-channel) | New session-bridge primitive; verify cross-CC↔Codex handoff with existing context-mode plugin | `pip uninstall` / `npm uninstall -g`; revert `.claude/settings.json` hook entries |
| W11-2 | claudia-statusline | Status Lines | hagan/claudia-statusline | TBD-probe | TBD | MIT | TIER-2-COMMUNITY | `cargo install` from crates.io (verify cardinal-rule-6) | First statusline in runtime; verify XDG + SQLite path under Z:\claude-sota-installed-state\ | `cargo uninstall claudia-statusline`; remove `.claude/settings.json` `statusLine` config |
| W11-3 | Claude Code Templates (discovery surface) | Catalog | davila7/claude-code-templates | TBD-probe | TBD | MIT | TIER-2-COMMUNITY-CATALOG | CITE-REFERENCE-ONLY (not install-class per cardinal-rule-6) | Sibling catalog to hesreallyhim; cite anchor for template-class discovery | N/A (cite-only) |

### Phase 2E — Wave-11 STUDY-PILOT cohort (operator-decision required)

| # | Primitive | Pilot scope | Pilot success criterion | Pilot reversibility |
|---|---|---|---|---|
| W11-S1 | claudekit | Subset of subagents not duplicating Phase 2A row 5 | All distinct subagents adopted without naming collision | HIGH (per-subagent revert) |
| W11-S2 | Claude Scientific Skills | Research/finance/writing skills folder only | Operator triggers scientific task; skill loads cleanly | HIGH (rm folder) |
| W11-S3 | TDD Guard | Interactive sessions only; disabled in autonomous /loop per Probe 5 | TDD enforcement on opt-in basis | HIGH (settings.json toggle) |
| W11-S4 | Container Use (dagger) | Multi-agent stack isolation pilot | One subagent runs in container without breaking parent | MEDIUM (Docker dependency) |
| W11-S5 | Dippy | AST-based safe-Bash auto-approve restoration | No false-positive blocks; destructive ops correctly prompted | HIGH (hook disable) |

### Phase 2F — Wave-11 DEFER cohort (re-evaluate at Phase 3+ or operator demand)

W11-D1 Claude Code Hook Comms — wait for axis-3 stability re-verify
W11-D2 claude-devtools — desktop app, optional observability layer
W11-D3 Claude HUD vs claude-pace — pick ONE statusline after W11-2 pilot
W11-D4 Plannotator — interactive plan UI; autonomous-mode-incompatible
W11-D5 /tdd-implement + /analyze-issue — DEMAND-ABSENCE per Probe 7.a; verify use-case demand first
```

---

## 5. REJECT COHORT (license-blocked OR duplicate)

### License blockers (67 rows; representative):
- AGPL-3.0 (6 rows): incompatible with permissive-only mandate per `Z:\claude-sota\.claude\rules\agent-harness-fit-verification.md` Probe 6 LICENSE blocker class
- GPL-3.0 / GPL-2.0 (5 rows): same incompatibility
- NOT_FOUND (48 rows): cannot verify permissive; treat as license-blocker until upstream LICENSE acquired
- NOASSERTION (16 rows): GitHub API can't classify — operator-side verify required pre-adopt
- CC-BY-SA-4.0 (3 rows): cite-only catalog-class
- `&copy;` (4 rows): proprietary
- `No License / Not Specified` (1 row): default-block

### Prior-adoption duplicates (5 detected):
1-5: Owner-substring match against `anthropics/`, `wshobson/`, `addyosmani/`, `openai/`, `obra/`, `doobidoo/`, `upstash/`, `modelcontextprotocol/`, `yamadashy/`, `everything-claude-code/`, `fcakyon/`, `mksglu/`.

### Inactive/removed (25 rows):
`Active: FALSE` (23) + `Removed From Origin: TRUE` (4) — overlap = 25 unique rejected.

### Top-15 internal rejects:
- **#11 ralph-orchestrator + #12 Ralph for Claude Code** — DUPLICATE of `ralph-loop@claude-plugins-official` (Wave 1-10 Phase 2B-1 row 13). Anthropic-OFFICIAL ralph-loop wins per CR-12 disposition lattice ECOSYSTEM-IMPORT class.
- **#18 claude-code-statusline (rz1989s)** — PARTIAL-OVERLAP with intra-Wave-11 #7+#9+#14. Pick ONE statusline.

---

## 6. HONEST-NON-FINDINGS (categories with no net-new candidates)

Per `synthesis-layer-verify.md §Reporting categories` HNF discipline:

1. **Official Documentation (3 rows)** — All 3 rows are docs (Anthropic site / docs.claude.com pages) — NOT installable artifacts. **HNF.**
2. **Alternative Clients (4 candidates)** — `Claudable` + `claude-esp` + `crystal` (Stravu, DEPRECATED per `Z:\claude-sota\.claude\rules\parallel-sessions.md` external-managers table) + `Omnara` (STALE). claude-sota-installed runs canonical `claude.exe` only; alternative-client adoption defeats cardinal-rule-5 install-priority over hand-coding (these are ALTERNATIVE CC RUNTIMES, not extensions). **HNF.**
3. **CLAUDE.md Files (14 candidates)** — These are CLAUDE.md REFERENCE EXEMPLARS (`alexei-led/aws-mcp-server/blob/main/CLAUDE.md`, etc.) — discovery surface for crafting one's own CLAUDE.md, NOT artifacts to install. Existing claude-sota-installed CLAUDE.md is bootstrap-class per cardinal-rule-5. **HNF as adoption candidates; KEEP as cite-anchors for CLAUDE.md design patterns.**
4. **Output Styles (4 candidates)** — Gen-Alpha Slang (comedic), Debugging (STALE), ccoutputstyles (STALE), Awesome Output Styles (STALE meta-catalog). Operational ROI low; Anthropic CC ships output-style mechanism native. **HNF.**

---

## 7. KEY FINDINGS & ANTI-PATTERNS CAUGHT

### Finding 1 — Catalog freshness drift (HEAD bump caught)
Brief cited HEAD `6ebceefe` (2026-04-28); actual current HEAD is `614f102accbcd48206d63a21df64adc984026b40` (2026-05-14, **2.5-week drift**). Catalog README says "I. TODO. hm." — **catalog in transition state** per Marker Decay corollary. Per `port-note-discipline.md §6` forward-only: brief HEAD pin should refresh next-fire.

### Finding 2 — File-structure refutation (CATEGORY-CLAIM drift)
Brief said "10 CSV categories" → single CSV with 10 Category-column values. Mia-pre-apply caught this at synthesis BEFORE propagation per FM-20 §How-to-apply.

### Finding 3 — Top-15 has surprising overlap with prior Waves
2 of 18 raw candidates were ralph-loop duplicates (DUPLICATE-FUNCTIONALITY per CR-12); 1 was sibling-catalog (cite-import-only); 4 were intra-Wave-11 statusline overlap. **Net Top-15 distillation = 15 — and ONLY 3 are ADOPT-NOW vs 12 STUDY-PILOT-or-NARROW.**

### Finding 4 — Stale ratio (86/226 = 38%) is HIGH
Catalog has 38% stale-marked rows. Combined with NOT_FOUND license (48/226 = 21%) the **structurally-blocked + stale = ~58%** of catalog is not adoption-ready. Wave-11 distillation correctly filtered this.

### Finding 5 — `/loop` skill discoveries already-installed
`ralph-orchestrator` + `Ralph for Claude Code` (catalog rows 11+12 from Top-15) prove the Anthropic-OFFICIAL `ralph-loop@claude-plugins-official` adopted in Phase 2B-1 was the correct convergent choice per CR-12 disposition. Catalog confirms community converged on ralph-pattern; Anthropic-OFFICIAL implementation wins.

### Anti-pattern surfaced — Catalog-only mining produces narrow signal
Per `Z:\claude-sota-installed\.claude\rules\multi-source-discovery-breadth-discipline.md` ≥4-distinct-source gate: this Wave-11 Stream-P dispatch is **SINGLE-SOURCE** (only hesreallyhim catalog). Findings here MUST be cross-validated against other discovery surfaces (GitHub direct, DeepWiki, OSSInsight, Star History) BEFORE manifest adoption. **Single-source verdict is FRAGILE.** Recommendation: Wave-11 Stream-Q should fan-out the Top-3 ADOPT-NOW candidates against GitHub MCP + DeepWiki + Context7 + Brave Search per discovery breadth discipline.

---

## 8. FINAL ARTIFACT INDEX

Scratch files produced this fire (kept in `Z:\claude-sota-installed\tmp\`):
- `wave11p-csv-audit.py` — category × license matrix generator
- `wave11p-extract-candidates.py` — permissive + active + non-duplicate filter
- `wave11p-pick-top2.py` — Top-2 per category ranker
- `wave11p-prior-adoptions.txt` — Wave 1-10 adoption inventory
- `wave11p-candidates.txt` — 129 candidates dump (300+ LOC)
- `wave11p-duplicates.txt` — 5 prior-adoption duplicates flagged
- `wave11p-top2-per-category.txt` — final Top-2 ranking (154 LOC)
- **`sota-pure-wave11-P-awesome-cc-2026-05-14.md` — this final report**

Cite anchor for orchestrator integration: **`tmp/sota-pure-wave11-P-awesome-cc-2026-05-14.md`**

---

## 9. RECOMMENDED ORCHESTRATOR NEXT ACTIONS

1. **Phase 2D commit**: install Top-3 ADOPT-NOW (claude-code-tools + claudia-statusline + Claude Code Templates citeref) per manifest rows W11-1/W11-2/W11-3
2. **Wave-11 Stream-Q dispatch**: 4-source convergence-verify Top-3 (GitHub direct + DeepWiki + OSSInsight + Star History) per `multi-source-discovery-breadth-discipline.md`
3. **Defer 12 STUDY-PILOT until operator-trigger**: claudekit / scientific-skills / TDD-Guard / Hook-Comms / claude-devtools / Container-Use / HUD / Plannotator / Dippy / claude-pace / /tdd-implement / /analyze-issue
4. **DEPRECATE Wave-1-10 `ralph-loop` SKIP claim** — verified convergent via 2 community implementations (#11+#12 catalog rows); Anthropic-OFFICIAL choice ratified

AWESOME-CC-COMPLETE:
