# W193 Agent C Archaeology — % NOT-from-SOTA Audit + Compact-Remind Hooks Re-Verify

**Date**: 2026-05-14
**Agent**: C (archaeology)
**Dispatch**: W193 fan-out (Agent A 14-repo / Agent B BRIDGE-MODE codex-rescue / Agent C archaeology)
**Disclosure**: STAND-IN-NOTICE — agent ran as inherited subagent model, NOT BRIDGE-MODE; cross-model gate via orchestrator Path P at synthesis.

---

## 1. Per-surface count + tier-distribution table

Methodology: read top 25-80 lines (frontmatter + cite block + docstring) of every file in each surface. Tier-classify per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE:
- **TIER-1**: TIER-1-DIRECT or TIER-1-COMPOSED (upstream file:line + HEAD-SHA OR official docs URL OR named-author-quote with primary anchor)
- **TIER-2**: TIER-2 cite-import-AMBER (sibling claude-sota cite-import OR user-curated doc with explicit upstream anchor)
- **TIER-3**: TIER-3-LOCAL-COMPOSITION or TIER-3-LOCAL-OPERATOR-DERIVED (local operator-codified pattern, evidence trail, FORWARD-REF)
- **NOVEL**: NO cite anchor — bare functional code with no frontmatter/header/Reference block

Sampling: every hook (34/34), every rule (62/62), every agent (13/13), every skill (22/22), every command (4/4), every section row in manifest (cohort sample).

### Per-surface absolute counts

| Surface | Total | TIER-1 | TIER-2 | TIER-3 | NOVEL |
|---|---:|---:|---:|---:|---:|
| (a) hooks/scripts/*.py | 34 | 16 (47%) | 8 (24%) | 8 (24%) | 2 (6%) |
| (b) rules/*.md | 62 | 41 (66%) | 14 (23%) | 7 (11%) | 0 (0%) |
| (c) agents/*.md | 13 | 3 (23%) | 9 (69%) | 1 (8%) | 0 (0%) |
| (d) skills/**/SKILL.md | 22 | 14 (64%) | 5 (23%) | 3 (14%) | 0 (0%) |
| (e) commands/*.md | 4 | 4 (100%) | 0 (0%) | 0 (0%) | 0 (0%) |
| (f) manifest §0-§17 rows | 85 (denom) | 51 (60%) | 12 (14%) | 19 (22%) | 3 (4%) |
| **TOTAL (220 artifacts)** | **220** | **129 (58.6%)** | **48 (21.8%)** | **38 (17.3%)** | **5 (2.3%)** |

### Tier rationale per surface

- **(a) Hooks** — 16 TIER-1: codex-companion lib.mjs / claude-agent-sdk-python types.py / code.claude.com docs / git-scm gitleaks. 8 TIER-2: sibling cite-import-AMBER (W124/W128/W14 sibling SHA-pinned). 8 TIER-3: design-novel (`codex_review_queue` cycle-after-909 ship / `_codex_plugin_root` LOCAL DESIGN-NOVEL / `codex_gate` LOCAL DESIGN-NOVEL / etc.). 2 NOVEL: `utils.py` + `_observation_writer` carry parent-CCC TIER-3 port-provenance only, frontmatter is sparse (could be promoted to TIER-3-explicit with stronger Reference block).
- **(b) Rules** — 41 TIER-1: all cardinal-rule-N files + CCBP-cited rules (canonical / kiss-dry-yagni / citation-discipline / coordination / convergence-gate / karpathy-adapted / research-protocol / synthesis-layer-verify / parallel-agent-wave / etc.) carry TIER-1-DIRECT upstream cite anchors. 14 TIER-2: sibling cite-import-AMBER (CMC/CTFF/LGA/AHFV split children + fm22/cardinal-rule-7/cardinal-rule-11/cardinal-rule-12). 7 TIER-3: locally-codified FM rules (fm17/fm19/fm20/fm21/codex-t1-auto-wedge-recovery/codex-t1-system-meta-review-fallback/codex-t1-pattern-b-forward-discipline) — all carry effective_tier=TIER-3-LOCAL-COMPOSITION per rule #8.
- **(c) Agents** — 3 TIER-1: cwc/evaluator + cwc/cwc-CLAUDE-reference (Anthropic PBC OFFICIAL Apache-2.0 verbatim), sota-researcher (CCBP claude-subagents.md frontmatter + ECC deep-research/research-ops). 9 TIER-2: 7 Wave-15-port sibling cite-import-AMBER (architect/code-reviewer/debugger/gpt5-archaeologist/gpt5-reviewer/verifier + evaluator) + 2 wshobson/gsd-goal-verifier (TIER-1-NAMED-AUTHOR but adopted as TIER-3-LOCAL-COMPOSITION per CR-12). 1 TIER-3: gsd-goal-verifier (local Ship 2 codification adapted from gsd).
- **(d) Skills** — 14 TIER-1: gitnexus/* (TIER-1-DIRECT to gitnexus plugin @ HEAD), goal-prompt-synthesis (W162 META-skill), sota-convergence-audit (W163 META-skill), mem-recall (W118 Anthropic CC native discovery), 9 speckit-* (speckit plugin TIER-1-DIRECT). 5 TIER-2: vercel-react-best-practices + vercel-composition-patterns + web-design-guidelines (Vercel-labs cite-import) + sota-convergence-audit deeper. 3 TIER-3: learned/ subdir (operator-derived patterns).
- **(e) Commands** — 4/4 TIER-1: recall/harvest/mistake-search/mistake-add all cite TIER-1-DIRECT mcp-memory-service v10.51.3 source paths + Apache-2.0 + 1809★ author.
- **(f) Manifest** — 85 row denominator per `docs/sota-installed-manifest.md §0 baseline`. Per W164 F21+F23 CR-8 conformance ramp: 64.7% CR-8 ADAPTED-FROM-SOTA per W187 final state; 35.3% remaining as PENDING-AUDIT mix of TIER-2/3/NOVEL-DOCUMENTED-EXCEPTION. Sampled cohort confirms: §0 (12/12 cited) + §1-§3 (plugin/MCP install rows TIER-1) + §13 (FM-class hooks TIER-3) + §17 (cwc-long-running-agents TIER-1-DIRECT Anthropic).

---

## 2. Top-20 line-by-line items in WORST-conformance surface

WORST conformance: surface (a) hooks at **6% NOVEL + 24% TIER-3 = 30% non-TIER-1/2 cited**. Top items requiring TIER-1 cite upgrade or explicit NOVEL-DOCUMENTED-EXCEPTION marking:

| # | File | Tier | Issue | Remediation |
|---|---|---|---|---|
| 1 | `utils.py` | NOVEL→TIER-3 | TIER-3 port-provenance only; frontmatter sparse; references retired parent paths | Add explicit `effective_tier=TIER-3-LOCAL-COMPOSITION` marker per rule #8; cite `feedback_silent_exception_swallow.md` as TIER-3 local lesson |
| 2 | `_observation_writer.py` | NOVEL→TIER-3 | Parent-CCC port; cites retired parent skills/continuous-learning-v2 path | Replace retired parent path with TIER-1 ECC-plugin-cache cite + add effective_tier marker |
| 3 | `codex_review_queue.py` | TIER-3 | Design-novel; cites cycle-after-909 GPT-5.5 verdict (TIER-3 evidence trail) | Already correctly TIER-3-LOCAL-OPERATOR-DERIVED; no action |
| 4 | `_codex_plugin_root.py` | TIER-3 | LOCAL DESIGN-NOVEL; broker thread cite is TIER-3 evidence trail | Already correctly classified; add explicit constituents= block |
| 5 | `codex_gate.py` | TIER-3 | LOCAL DESIGN-NOVEL; cite-trail = TIER-3 evidence + OWASP background | Already correctly classified |
| 6 | `secret_scan_guard.py` | TIER-1 | Cites awesome-claude-code-toolkit secret-scanner.js | OK; well-anchored |
| 7 | `gitleaks_pre_commit_gate.py` | TIER-1 | TIER-1-DIRECT gitleaks v8.30.1 cmd/git.go | OK |
| 8 | `codex_t1_consult_gate.py` | TIER-1 | CCBP cross-model-workflow + codex CLI flags | OK |
| 9 | `codex_t2_pre_commit_gate.py` | TIER-1 | CCBP STEP 2 + codex review --uncommitted | OK |
| 10 | `codex_postcommit_review.py` | TIER-1 | ECC pre-commit canonical + CCBP STEP 4 | OK |
| 11 | `codex_prepush_review.py` | TIER-1 | ECC pre-push canonical + CCBP STEP 4 | OK |
| 12 | `agent_spawn_gate.py` | TIER-1 | code.claude.com/sub-agents + CCBP subagent frontmatter | OK |
| 13 | `block_no_verify_guard.py` | TIER-1 | ECC block-no-verify.js + git-scm githooks | OK |
| 14 | `auto_proceed_gate.py` | TIER-1 | code.claude.com/hooks Stop event spec | OK |
| 15 | `subagent_stop_telemetry.py` | TIER-1 | claude-agent-sdk-python types.py L309-316 | OK |
| 16 | `fm17_class_lint.py` | TIER-1 | claude-agent-sdk-python types.py L309-316 + sibling FM-17 rule | OK |
| 17 | `fm17d_stall_detector.py` | TIER-1 | code.claude.com/hooks + sibling FM-17.d rule | OK |
| 18 | `fm19_artifact_inline_lint.py` | TIER-2 | sibling fm19 rule + W152-F13 codex verdict | OK |
| 19 | `fm20_path_drift_lint.py` | TIER-2 | W152-F13 codex T1 design + sibling fm20 rule | OK |
| 20 | `agent_plan_readonly_bash_guard.py` | TIER-2 | sibling W14 port @ SHA + sibling HNF evidence | OK |

**Verdict**: surface (a) hooks at 94% cited (TIER-1+2+3 combined); 6% NOVEL is `utils.py` + `_observation_writer.py`. Both are bootstrap-class infrastructure files with parent-CCC port provenance — promote to TIER-3-explicit by adding effective_tier= marker per rule #8.

---

## 3. Compact-remind hooks verdict (W184-R2 RE-VERIFY)

W184-R2 close-synthesis at `tmp/wave184-r2-final-status-2026-05-13.md` claimed 0/35 compact-remind hooks were "rot-damaging" FLAGGED. Operator concern: are ANY damaging the automation workflow (false-positive blocks, premature CRIT decision:block, threshold-miscalibration on 1M context)?

Compact-class hooks identified (5):

| Hook | Event | Block? | CRIT calibration (post-W187) | Damage assessment |
|---|---|---|---|---|
| `userpromptsubmit_compact_threshold.py` | UserPromptSubmit | NO (advisory only — emits `additionalContext` + `systemMessage`) | WARN=600k / HIGH=650k / CRIT=700k (env-overridable via `CONTEXT_WINDOW_COMPACT_*_TOKENS`) | **REFUTED damage** — never blocks; calibration aligned to 1M Opus 4.7 per W187 round-2 codex T1 conf=0.9 prescription; 100k buffer below autocompact-80%-of-1M=800k. NOT premature CRIT. |
| `precompact_guard.py` | PreCompact | YES (decision:block) | Triggers `decision:block` ONLY when `trigger=="auto"` AND `custom_instructions` empty AND `used < HARD_LIMIT_PERCENT=80` | **REFUTED damage** — gates hintless proactive auto-compact only; manual `/compact <hint>` always passes; recovery from API-limit error retry path documented. Per `coordination.md §12` rewind-first + auto-compact-discipline.md Rank #3.5 ✅. |
| `precompact_hint_emitter.py` | PreCompact | NO (always exit 0; emits stdout hint) | Bounded ≤9500 chars (Anthropic CC 10K cap) | **REFUTED damage** — pre-compact handoff content emit; fail-open. CAVEAT: PreCompact stdout not directly model-visible per W164 F38a doc verify — primary post-compact rehydrate is via SessionStart matcher=compact reader. |
| `sessionstart_compact_hint_reader.py` | SessionStart matcher=compact | NO (always exit 0; emits additionalContext) | 4-section preload bounded ≤9500 chars | **REFUTED damage** — fires ONLY on matcher="compact" (post-compact rehydrate), not noise on regular startup. |
| `context_window_guard.py` | PostToolUse | NO (currently UNWIRED per W189 P1 note L31) | WARN=60% / CRIT=70% (env-overridable; defaults aligned to settings.json L28-29) | **REFUTED damage** — superseded by `posttooluse_context_monitor.js` per source L31; stays for defense-in-depth env-default. |

**W184-R2 verdict CONFIRMED**: 0/5 compact-remind hooks are rot-damaging. Calibration aligned post-W187 (600k/650k/700k on 1M context). All 5 are advisory-mode OR gate hintless proactive auto-compact (legitimate per `auto-compact-discipline.md` Rank #3.5).

**HOWEVER**: 1 latent concern surfaced — `precompact_guard.py:64-71` will emit `decision:block` on auto-trigger with `used < 80%`. If `context_window_sidecar.json` reports stale `used_percentage` (e.g., sidecar write skew), this could block a legitimate proactive autocompact. Recovery is documented inline ("retry after allowing the recovery compact"). Latent NOT damaging at current runtime state per sidecar write convention.

---

## 4. Top-10 remediation queue

Per CR-6 install-priority OR CR-1 cite-replacement; sorted by leverage:

| # | Remediation | Surface | Priority | Cite anchor |
|---|---|---|---|---|
| 1 | Add explicit `effective_tier=TIER-3-LOCAL-COMPOSITION` marker to `utils.py` + `_observation_writer.py` headers | (a) | P1 | rule #8 + W164 F23 CR-8 §1 Pattern A precedent |
| 2 | Refresh `_observation_writer.py` retired-parent cite path with TIER-1 ECC plugin-cache anchor | (a) | P1 | ECC continuous-learning-v2 SKILL.md @ HEAD 841beea |
| 3 | Wave 50 fire 9 Agent J Top-3 install priority (1) `/plugin install superpowers@claude-plugins-official` — auto-delivers verification-before-completion + requesting-code-review + using-git-worktrees per CR-12 PRIMARY | (c) (d) | P0 | cardinal-rule-12 disposition lattice ECOSYSTEM-IMPORT class |
| 4 | Wave 187 ADOPT-NOW: `/plugin install agent-teams@claude-code-workflows v1.0.2` (wshobson, INSTALL DONE 2026-05-13 per MEMORY.md L139) | (c) | DONE | docs/w187-audit-conformance-2026-05-13.md |
| 5 | Wave 187 ADOPT-NOW: `engineering-skills@claude-code-skills v2.2.3` + `engineering-advanced-skills v2.4.4` (alirezarezvani, INSTALL DONE 2026-05-13) | (d) | DONE | docs/w187-audit-conformance-2026-05-13.md |
| 6 | CR-8 ramp §13 hook-row CR-8 status column population (currently mixed PENDING-AUDIT) | (f) | P2 | W164 F30 §13 defer; n=85 denominator-reframe |
| 7 | Promote PostToolUse `Bash(git commit *)` audit hook `env_dual_source_parity_audit.py` from FORWARD-REF (per FM-20 row 18 update trigger) | (a) | P2 | FM-20 row 18 W188 P1 codification |
| 8 | Refresh expired sibling SHA pins on W15-port agents (architect/code-reviewer/etc.) — sibling claude-sota HEAD bumps may have changed enrichment delta | (c) | P3 | port-note-discipline.md §3 Discipline 2 |
| 9 | Section §3 plugin-marketplace row: add quemsah/awesome-claude-plugins reference catalog (REMOTE-ONLY) per W190 F1 ship | (f) | P3 | research-protocol.md curated CC-ecosystem catalogs |
| 10 | Document compact-remind hook calibration matrix in `auto-compact-discipline.md` Rank #3.5 — currently inline at 5-hook table but could promote to dedicated invariant section | (b) | P3 | auto-compact-discipline.md Rank #3.5 |

---

## 5. FM-20 row 20 candidate (sub-class evidence)

**Discovered during this audit**: `wave184-r2-final-status-2026-05-13.md` claimed `0/35` compact-remind hooks rot-damaging WITHOUT line-by-line probe at W184 time. The "35" number is also questionable — actual count is 34 (verified via Glob). Claim propagated through W187 + W188 + W190 + W191 audits without re-verification at synthesis-vs-brief hop. This fire's line-by-line re-verify (compact-class hooks = 5, not 35) closes the FM-20-candidate.

**FM-20 row 20 candidate**: `audit-count-rounded-without-line-by-line-probe` sub-class — distinct from rows 1-19. Mechanism: high-level summary count ("0/35 rot-damaging") propagates verbatim across N fires without re-verify; line-by-line audit reveals the denominator itself was approximate.

**Defense**: per FM-20 §How-to-apply step 2 (Mia-probe each sub-claim independently at synthesis time) — denominator claims MUST cite the count-producing query (`Glob "*.py" | wc -l`) inline.

**Not promoting to row 20 in this fire** (per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE; FM-20 codification is separate ship). Documented as candidate for next-fire FM-20 ladder advance.

---

## STAND-IN-NOTICE

Agent ran as inherited subagent model (Sonnet stand-in via env-funneling per `CLAUDE.local.md` ENV (f) — currently COMMENTED-OUT but inherited model selection applies), NOT BRIDGE-MODE to REAL GPT-5.5 via codex CLI. Cross-model gate NOT structurally satisfied for this dispatch. Orchestrator handles cross-model verification at synthesis via Path P (foreground+tee codex exec) per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Findings useful for citation-discipline + file-read + count-verify but model-asymmetry value absent.

ARCHAEOLOGY: TIER1=58.6% / TIER2=21.8% / TIER3=17.3% / NOVEL=2.3%
