# W326 Stream C — closure synthesis

**Wave**: W326 Stream C — SOTA install verify
**Date**: 2026-05-19 (this session)
**HEAD at audit-time**: `3731ca7` (W325 closure; prompt-baseline was `f52aebc`, advanced 2 commits)
**File ownership**: `docs/architecture/W326-SOTA-INSTALL-VERIFY/*` only (compliant — 0 files modified outside this dir)
**Stream peers**: A (sca-v9 math fix per W326-B-1 — composite_denom_install 33.7→34.7), B (GPT-5.5 deep audit), D (settings fixes), this Stream C (SOTA install verify)
**Wall-clock**: ~30 min execution (under 40-min target)

---

## §1 — Headline finding

**`/plugin update` successfully landed today (2026-05-19)** with material changes:
1. **ECC** `841beea` → `8148340a` (CLOSES W316 + W317 forward-AI chain on ECC drift; live upstream HEAD reached)
2. **`document-skills@anthropic-agent-skills`** NET-NEW INSTALL (4 skills: xlsx, docx, pptx, pdf at sha=`690f15cac7`)
3. **`context-mode`** v1.0.136 → v1.0.141 on disk (BUT session still binds to v1.0.136 — reload required)
4. **12+ claude-plugins-official sub-plugins** bumped to `aee724086c` (frontend-design, skill-creator, pr-review-toolkit, etc.)

**Cumulative wave result**: 64 plugins installed (was 63 pre-W326; +1 net-new). All 4 prior W316/W317 plugin-update carry-forward AIs are CLOSED.

**Top-3 install candidate verdicts (sca-v9 strict-scoring)**:
1. **openlit/openlit** — **reclassified T1→T3 PATTERN-STUDY OR T2 LIBRARY** (sca-v9 D35=1 soft-cap; honest install_score 3.456/5; operator-override to T2-LIBRARY-INSTALL viable if observability scope ratified)
2. **anthropics/skills** — **T1 INSTALL PARTIALLY-EXECUTED** (2 of 3 marketplace plugins installed: document-skills NEW this session + example-skills W317-S5; 3rd plugin `claude-api` DEFER — zero net-new skills)
3. **imlrz/DeepResearch-Bench-II** — **T3 EVAL-LANE confirmed**; Lane F SCAFFOLD drafted (paste-ready stub for `harness/eval_harness.py`; real-binding deferred to W327 operator)

**Cardinal-rule status**: R1-R5 ✓ HOLD. `self_invented_count: 0` HOLDS. CLAUDE.md ≤50 LOC body ✓. settings.json + .mcp.json UNCHANGED by this stream.

---

## §2 — Deliverables

| File | Lines | Purpose |
|---|---|---|
| `W326-C-1-PLUGIN-UPDATE-STATE.md` | ~210 | `/plugin update` post-state verify; 18 cache dirs + 64 plugins enumerated |
| `W326-C-2-OPENLIT-FULL-AUDIT.md` | ~280 | openlit sca-v9 audit + reclassification + install spec + rollback |
| `W326-C-3-ANTHROPICS-SKILLS-FULL-AUDIT.md` | ~210 | anthropics/skills audit + W324 SHA zero-drift verify + marketplace mapping + `claude-api` defer-rationale |
| `W326-C-4-DEEPRESEARCH-BENCH-II-LANE-F.md` | ~290 | DRB2 sca-v9 audit + Lane F SCAFFOLD draft (paste-ready harness stub) + cost analysis |
| `STREAM-C-SYNTHESIS.md` | this file | closure synthesis + W327 forward-AI ranking |

**Total**: ~1,000 lines of audit documentation produced in <40 min wall-clock; 0 destructive operations; 0 file mutations outside scope.

---

## §3 — Cross-cutting findings (multi-stream)

### 3.1 — sca-v9 D35 soft-cap is correctly TIGHT
The W325 Stream-D rough-score "T1 INSTALL-CANDIDATE ~4.5" for openlit was preliminary and did not apply the sca-v9 §5.7 D35<2 soft-cap. Full strict audit lands openlit at install_score = 3.456 (T3-or-T2-LIBRARY territory). **This is the rubric working as designed** — D35 distinguishes "library that python code imports" from "CC primitive (plugin/skill/MCP server/hook)" — important separation in a CC-first runtime.

**Implication for sca-v9 evolution**: sca-v9 §5.7 may benefit from explicit T2-LIBRARY tier (not just T2-PATTERN-VENDOR) for cases like openlit where the candidate is a library + the runtime python code can directly import it. The "PATTERN" framing is over-restrictive — "library-tier install" is a real T2 mode (pip install into venv, no settings.json/mcp.json mutation, library code imports). **W327 candidate**: codify "T2-LIBRARY" sub-tier in next sca-v10 iteration.

### 3.2 — Anthropic marketplace partial-install pattern is good practice
W326 confirms that `anthropics/skills` operator-installed the 2 most-broadly-useful plugins (document-skills + example-skills covering 16 of 17 marketplace skills) and deferred the 3rd zero-net-new plugin. This is **selective install discipline** — install for value, not for marketplace-coverage. The CR-1 (Anthropic trust-source) does NOT require installing ALL plugins from a trusted marketplace — only that ALL installed plugins ARE from trusted marketplaces.

### 3.3 — Empirical-viability evidence-hierarchy (sca-v9 D-EMP)
Three audits produced 3 distinct D-EMP levels:
- **openlit D-EMP=1** (PASS-GATE-AT-MINIMUM; PyPI-existent + DeepWiki-indexed, but no local smoke run this stream)
- **anthropics/skills D-EMP=5** (FULLY-VIABLE; already in cache + auto-fire active in current session's available-skills list — empirical PROOF in-session)
- **DRB2 D-EMP=4** (paper + leaderboard + HF dataset + Apache-2.0 code = strong-but-not-confirmed-by-local-smoke)

**The 5-1-4 spread validates D-EMP as a useful gate**: openlit and DRB2 both have strong corroboration but lack hands-on verification, while anthropics/skills demonstrates the highest empirical-viability via in-runtime presence.

### 3.4 — 5th-wave GitHub-MCP silent-fallback workaround validated
This stream invoked GitHub via REST `curl` (not the MCP `search_repositories` family) for all repo-fingerprint operations. **All 6 GitHub-REST calls succeeded** — no silent-fallback, no 0-count anomalies. Cross-reference to W315-r2 Stream B finding: GitHub-MCP silent-fallback workaround via direct REST is confirmed-effective. **Pattern: use `curl + jq` (or python json.load) over GitHub-REST for any repo fingerprinting; reserve GitHub-MCP search_repositories for fuzzy-discovery only.**

[NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths. Source-deep-dive (3-org-distinct): github/docs qualifier table + api.github.com runtime probes + perplexity.ai aggregation confirm `repo:owner/name` + `user:`/`org:`/`owner:` validity. The REST-based workaround remains SOTA for rate-limit-budget reasons, not for upstream-defect mitigation.]

### 3.5 — DeepWiki indexes high-star but skips low-star
DeepWiki returned full Q&A for `openlit/openlit` (2454★) and `anthropics/skills` (137567★) but **NOT-FOUND** for `imlrz/DeepResearch-Bench-II` (50★). This is the documented DeepWiki indexing-lazy behavior. **Mitigation for low-star candidates**: rely on arXiv + HF + leaderboard + first-party README — exactly the pattern this stream used for DRB2 (Stage-0 6-of-7 sources tolerable).

---

## §4 — Forward-AIs ranked (W327 backlog)

### P0 (next-wave-mandatory)

| ID | Action | Stream | Notes |
|---|---|---|---|
| W326-C-1-AI-1 | **`/reload-plugins` or session-restart** to switch context-mode from v1.0.136 (in-session) to v1.0.141 (on-disk) | C-1 | every ctx_* call surfaces upgrade banner; harness shim still binds old version |
| W327-NEW-1 | **Commit the unstaged plugin delta**: `git add .claude/plugins/{installed_plugins,known_marketplaces}.json && git commit` with the W326 closure synthesis | C-1 | unstaged delta = potential lost work on session-end |
| W326-C-3-AI-1 | **DEFER `claude-api@anthropic-agent-skills` install** — zero net-new (skill is already accessible via document-skills + example-skills caches) | C-3 | confirms partial-install is COMPLETE |

### P1 (operator-decision required)

| ID | Action | Stream | Notes |
|---|---|---|---|
| W326-C-2-AI-1 | **OPENLIT install-decision**: T2-LIBRARY-INSTALL (`pip install openlit==1.42.0` + 10-line wire into eval_harness.py) OR DEFER pending observability-rack scoping | C-2 | strict sca-v9 score 3.456 below T1 floor 4.5; operator-override to T2 viable per CR-1-orthogonal library-tier exception |
| W326-C-4-AI-1+AI-2 | **DRB2 clone + Lane F SCAFFOLD apply** to `harness/eval_harness.py` (paste-ready stub at C-4 §5) | C-4 | small commit; cardinal-rule-2 N/A (eval_harness is project-owned not hook); cost: ~$0.50 smoke if operator pre-generates 5 reports |
| W326-C-1-AI-3 | **`/plugin update`** context-mode v1.0.141 → v1.0.142 (already-published upstream; staying current) | C-1 | T0 next-wave per CCBP `48f2ceb` plugin-currency mandate |

### P2 (housekeeping)

| ID | Action | Stream | Notes |
|---|---|---|---|
| W326-C-1-AI-4 | **Marketplace pruning audit** — 5 declared-but-no-cache marketplaces (knowledge-work-plugins, claude-community, claude-for-financial-services, healthcare, life-sciences) | C-1 | W315/W316/W317 carry-forward |
| W326-C-1-AI-5 | **Orphan cache cleanup** — `mcp-memory-service` and `superpowers-marketplace` cache dirs have no installed_plugins.json entries | C-1 | safe-delete after operator-verification |
| W326-C-3-AI-3 | **Verify available-skills surface post-reload** — confirm 17 anthropic-agent-skills register correctly; check for namespace-deduplication of `claude-api` skill (appears 3 ways currently) | C-3 | post-reload session smoke |
| W326-C-2-AI-4 | **eval_harness.py docstring update** at L41 add `# Optional: openlit>=1.42.0 ...` for observability flag | C-2 | if openlit installed |
| W326-C-4-AI-3+AI-4+AI-5 | **DRB2 smoke run** with current Opus 4.7 — establish baseline before benchmarking other models | C-4 | requires GEMINI_API_KEY |

### P3 (deferred / informational)

| ID | Action | Stream | Notes |
|---|---|---|---|
| W326-C-1-AI-6 | **`enabledPlugins` map semantics clarification** — only 1 explicit entry but 47 enabled-by-default per CLAUDE.md L34; verify Anthropic-doc'd semantics | C-1 | documentation drift |
| W326-C-3-AI-4 | **Document duplicate-namespace pattern** in CLAUDE.md L46 — anthropic-agent-skills's `source: "./"` causes same SKILL.md surfaces under multiple namespaces; upstream-design not a bug | C-3 | cosmetic clarification |
| W326-C-4-AI-7 | **DRB2 data license** — 2 tasks (idx=26, idx=110) are CC-BY-NC; if commercial use of evaluations, exclude these tasks | C-4 | downstream commerciality concern |
| W326-C-4-AI-9 | **Compare DRB2 vs DRB1** (`Ayanami0730/deep_research_bench`) — predecessor benchmark; check if more mature/comprehensive | C-4 | extra-context for benchmark selection |
| W326-C-2-AI-6 | **NSSM wrap otel-gpu-collector** if openlit observability ratified (closes nvidia-gpu-exporter port-conflict W317-r2) | C-2 | conditional on openlit install |
| sca-v10 codification | **T2-LIBRARY sub-tier** — codify in next sca-v10 iteration (W327 candidate) | (cross-cutting §3.1) | rubric evolution |

**Total W327 forward-AI count from Stream C**: **25 AIs** (3 P0 + 5 P1 + 8 P2 + 9 P3).

---

## §5 — Cardinal-rule compliance audit (this stream)

| Rule | Check | Status |
|---|---|---|
| R1 trust-source | All 3 candidates trusted: openlit (Apache-2.0 OSS), anthropics/skills (first-party), DRB2 (Apache-2.0 + academic USTC+Tsinghua) | ✓ |
| R2 no-self-hook | NO hook modifications; only docs/ writes | ✓ |
| R3 subagent contract | No subagent modifications | ✓ |
| R4 CLAUDE.md + settings authority | NO CLAUDE.md or settings.json mutations from this stream | ✓ |
| R5 sandbox/permissions | No mutations to permissions; R5 carry-forward SHIP-BLOCKER unchanged (`bypassPermissions: true` + sandbox `enabled: false` — pre-existing per W325 Stream-C; orthogonal to this audit) | ✓ orthogonal |
| `self_invented_count: 0` | No `.claude/rules/*.md` or `.claude/hooks/scripts/*.py` self-invented | ✓ |
| 3-org-distinct anchors | openlit: Arize + Grafana + OneUpTime PASS; anthropics: single-org-by-design (CR-1 dominant); DRB2: USTC + Tsinghua + HF/Anthropic-leaderboard PASS | ✓ |
| Stars-not-hardgate | openlit 2454★ (mid-star, T2-LIBRARY); anthropics 137k★ (high-star, T1 by CR-1 not stars); DRB2 50★ (low-star, T3-EVAL-LANE — stars-VALIDATED) | ✓ 7th-wave anti-bias confirmed |
| Stage-0 existence-probe | openlit 6/6 PASS; anthropics 7/7 PASS; DRB2 6/7 (deepwiki-tolerable) | ✓ |
| File ownership | docs/architecture/W326-SOTA-INSTALL-VERIFY/* only (5 files created) | ✓ |
| No destructive installs | 0 destructive ops (pip/git-clone/plugin-install all deferred to operator) | ✓ |
| Secret redaction | No pplx-*/pk-lf-*/sk-lf-*/ghp_*/sk-* literals appeared in audit (operator's GEMINI_API_KEY referenced as `<your-gemini-key>` placeholder; LANGFUSE_* not mentioned) | ✓ |

**All checks PASS**.

---

## §6 — Strategic next steps (operator decision tree)

**Question 1**: Commit `installed_plugins.json` + `known_marketplaces.json` unstaged delta?
- **YES** (recommended) — these are post-`/plugin update` truthful state; no behavioral risk
- **NO** — only if planning to roll back the `/plugin update` entirely (unlikely; updates are upstream-trusted)

**Question 2**: Install openlit at T2-LIBRARY tier?
- **YES** (recommended if observability is a stated need)
  - Cost: 10s install + 10-line eval_harness.py wire
  - Benefit: OTel-native LLM call traces + GPU monitoring (closes nvidia-gpu-exporter gap)
  - Path: §6 in `W326-C-2-OPENLIT-FULL-AUDIT.md`
- **DEFER** — if observability-rack scoping not yet ratified (grafana + prometheus + nvidia-gpu-exporter all EXITED per W317-r2 §S6)

**Question 3**: Install `claude-api@anthropic-agent-skills`?
- **DEFER** (recommended) — zero net-new (skill is already accessible via 2 other plugin cache paths)
- Re-evaluate at W327+ if Anthropic publishes additional skills under that plugin namespace

**Question 4**: Wire DRB2 Lane F into eval_harness.py?
- **YES with SCAFFOLD-ONLY initial step** (recommended) — paste-ready stub at `W326-C-4 §5`; SCAFFOLD has zero cost (returns SETUP-PENDING until real-binding) and primes the runtime for W327+ real evaluation
- Real-binding requires repo clone + GEMINI_API_KEY + pre-generated reports → 1-2 hours operator-time

**Question 5**: Update context-mode v1.0.141 → v1.0.142?
- **YES at session-restart** — staying current per plugin-currency mandate; new patches keep arriving

---

## §7 — Cite-anchors (cross-referenced from the 4 audit files)

- ECC HEAD `8148340a` ← `https://github.com/affaan-m/everything-claude-code`
- openlit HEAD `7ca59852` ← `https://github.com/openlit/openlit` (PyPI v1.42.0 Apache-2.0)
- anthropics/skills HEAD `690f15cac7` ← `https://github.com/anthropics/skills` (W324 SHA zero-drift verified)
- DeepResearch-Bench-II HEAD `11d87de4` ← `https://github.com/imlrz/DeepResearch-Bench-II` (arXiv 2601.08536)
- sca-v9 SKILL.md `composite_denom_install=34.7` ← `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` L416 (post-W326-B-1 math fix; assumes Stream B landed; if Stream B not-yet-shipped, current authoritative value is **33.7** and all 3 audit composite scores re-divide by 30.3 instead of 31.3 — operator MUST confirm Stream B status before final ledger commit)
- W325 Stream-D source: `Z:/claude-sota-installed/docs/architecture/W325-RUNTIME-V8-SOTA-SWEEP/STREAM-D-SOTA-CANDIDATES.md`
- CLAUDE.md L34 plugin-count disambiguation: "64 plugins declared / 64 actually installed (47 enabled, per W315-r2 Stream E disambiguation 2026-05-19)"
- CCBP `48f2ceb` plugin-currency mandate: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md`
- Anthropic plugin docs: `https://code.claude.com/docs/en/plugins` (canonical marketplace + install pattern)
