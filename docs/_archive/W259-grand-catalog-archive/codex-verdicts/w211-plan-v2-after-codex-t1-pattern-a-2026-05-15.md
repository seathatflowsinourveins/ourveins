# W211 Pure-Runtime SOTA Convergence — Plan v2 (Pattern A apply on codex T1 NEEDS-REVISION conf=0.91)

**Date:** 2026-05-15
**Codex T1 verdict:** `.claude/state/codex_consult_w211_plan_audit_OUT.txt` NEEDS-REVISION conf=0.91 + 10 prescribed_edits across 8 audit axes (all FAIL)
**Disposition:** Pattern A single atomic fix-forward per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` (n=5+ empirical evidence ladder; 0.88-0.93 conf + ≤10 prescriptions = canonical sweet spot)
**Cross-model gate:** SATISFIED — real GPT-5.5 via codex exec `deep-review-exec` (BRIDGE-MODE per Path P orchestrator-direct foreground+tee; STAND-IN-NOTICE n/a — this is REAL GPT-5.5 not Sonnet stand-in)
**Mia pre-apply on prescriptions:** F-007 spot-checked GENUINE (Pattern D target shape excludes `-p deep-review-exec` per `ctff-patterns-cd.md §Pattern D`); F-006 GENUINE (env-funneled stand-in disclosure mandate cited in `cmc-env-funneled-disclosure.md`); F-001 + F-004 + F-009 ratified by direct rule-text inspection

---

## Pattern A apply summary — 10 prescribed_edits integrated

### F-001 (P0/AXIS_1) — L0 Bootstrap/control-plane layer added

Original plan: 17 layers L1-L17, treating `Z:\claude-sota-pure` existing dir structure as bootstrap-ready.
**Apply:** Add **L0 Bootstrap/control-plane** as explicit layer. L0 PASS predicate REQUIRED before any Top-N install execution at Fire 4.

L0 components (canonical enumeration per codex T1 F-001 prescription):
- Claude Code CLI install + version pin
- Codex CLI install + version pin
- Launcher (eee.ps1) + env block (CLAUDE.local.md) + PATH discoverability (per `docs/operator-path-setup.md`)
- `.claude/settings.json` permission baseline (CR-7 graduated unleash phase declared)
- Plugin loader (`CLAUDE_PLUGIN_ROOT` + marketplaces) + MCP loader (`.mcp.json`)
- Provider/model configuration (Anthropic / Codex / Ollama routing)
- T1-T7 codex hook lifecycle wire status
- Safety hooks (safety_guard.py + agent_plan_readonly_bash_guard.py + secret-pattern deny floor)
- Permission-mode state (auto / acceptEdits / plan / bypassPermissions per `https://code.claude.com/docs/en/settings`)
- Session/context lifecycle (compaction thresholds + checkpoint surfaces + replay)
- Manifest/provenance/rollback layer (`docs/sota-installed-manifest.md` + `docs/install-provenance.md`)

L0 PASS predicate: ALL components INSTALLED + smoke-PASS verified per CR-7 Phase 1+2+3 gate.

### F-002 (P1/AXIS_2) — Fire 1D staggered supplement (no 4th concurrent agent)

Original plan considered 4th agent for L0/cross-cutting concerns.
**Apply:** Do NOT add 4th concurrent agent (§CADP rule 2 violation under unverified cache). Instead: queue **Fire 1D** as staggered supplement firing after ANY of A/B/C returns (frees one §CADP slot). Fire 1D scope: L0 Bootstrap + L13/L17/L16 cross-cutting concerns. Output `tmp/w211-D-L0-cross-cutting-2026-05-15.md`. OUTPUT_BUDGET 800 LOC + max 35 tool calls + TERMINATION on_handoff_to: orchestrator.

### F-003 (P1/AXIS_3) — Scoring matrix extended to 25 columns

Original matrix: 16 columns (stars / last_commit / cpd / license / named-T1 / multi-org-Axis1 / named-T2-Axis2 / Axis3-band / Probe-DAG / CR-12 / wired-difficulty / native-CC-install-path / grade / notes).

**Apply:** Extend with these dimensions (codex T1 F-003 prescription verbatim):
| New column | Definition |
|---|---|
| `sra_d1_d10` | SRA D1-D10 vector per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md:78-93 @ HEAD` (10-dimensional rubric: use-class / convergence / harness-fit / risk / reversibility / etc.) |
| `runtime_type` | `cli` / `mcp-stdio` / `hosted-saas` / `self-hosted-service` / `desktop-app` / `library-only` |
| `data_residency` | `on-device` / `self-hosted` / `vendor-hosted` / `mixed` |
| `credential_scope` | `none` / `optional` / `required-api-key` / `required-oauth` / `required-cert` |
| `dependency_footprint_mb` | total install size estimate |
| `active_maintenance_signals` | beyond last_commit/cpd: release cadence + issue triage cadence + PR merge cadence |
| `smoke_probe_command` | concrete one-liner to verify install (e.g., `npx <pkg> --version`) |
| `rollback_uninstall_path` | command to fully remove |
| `security_signals` | CVE count / OpenSSF Scorecard / SLSA level / signed-releases availability |
| `cr12_disposition_rationale` | 1-line per-repo CR-12 6-class disposition reason |
| `grade_derivation` | mechanical formula: grade A-F DERIVED from above + Probe-DAG + convergence axes (NOT source-of-truth presentation) |

Grade A-F retained as presentation grade only; derived mechanically from SRA D1-D10 + convergence-gate axes + Probe DAG + CR-12 disposition.

### F-004 (P0/AXIS_4) — Multi-source breadth gate raised to ≥4 distinct source families

Original brief: 3 tools (mcp__github + mcp__arxiv + mcp__perplexity).
**Apply:** Require ≥4 distinct source families per layer or candidate cluster per `Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md:19-23,25-42,54-60`. Source family enumeration:
1. **GitHub family** (search_repositories + search_code + list_commits + gh CLI) — counts as ONE family
2. **DeepWiki + Context7** — repo wiki + library docs primary source
3. **Repomix** — deep repo pack-and-grep for code-level evidence
4. **Plugin marketplaces** — `marketplaces/` local + `claude-plugins-official` + `everything-claude-code` + community catalogs
5. **arXiv / PapersWithCode / HuggingFace** — research / benchmark / model-hub sources
6. **Conference / blog / podcast** — named-author T2 dated artifacts
7. **Community signals** (GitHub Sponsors / Discord / Slack / Discussions) — adoption signals ONLY, NOT quality verdicts; require URL + date

Each layer's catalog MUST record HONEST-NON-FINDING per source family when no relevant candidates surface (avoids hiding gaps).

### F-005 (P1/AXIS_6) — Fire 1.5 candidate-list challenge inserted before Fire 2

**Apply:** Insert new fire between F1 returns and F2 synthesis:
- **Fire 1.5** — Candidate-list challenge: merge/dedupe raw candidate lists from Agents A+B+C+D; compare against W203-W210 priors (~30 sota-pure-* files); flag missing categories; flag duplicate candidates across agents (CR-12 disposition); IF Top-N install cost is high → fire Path P / T0-style codex candidate-list review (per `cmc-t1-t7-lifecycle.md:47-50` T0 PROPOSED-PILOT). Operator review opportunity HERE (not before raw catalog cleanup).

### F-006 (P0/AXIS_5) — Cross-model status ledger explicit

**Apply:** Add to ALL Fire 1 / 1D close-syntheses + Fire 3 preamble:
> **CROSS-MODEL STATUS LEDGER**
> - Fire 1 + 1D: 4× Sonnet stand-in `sota-researcher` agents (Agents A/B/C/D). Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled stand-in disclosure mandate` (cite-import-AMBER per Section 14.5): **cross-model gate NOT satisfied for Fire 1 / 1D output**. NO ADOPT/INSTALL/Top-N finalization permitted before Fire 3 completes.
> - Standing-directive ≥2 BRIDGE-MODE agent requirement (`advanced-agent-team-standing-directive.md:35-42` cite-import-AMBER): **OVERRIDE** per same-session W50F2 FM-17.b/d autocompact-thrash evidence at `docs/verified-avoid.md:55-61` (n=2 codex-rescue subagents 649s + 1216s thrash). Recovery: Path P orchestrator-direct foreground+tee codex exec at Fire 3 SATISFIES the cross-model invariant for adoption verdicts.
> - This W211-plan-audit (the codex T1 verdict driving Pattern A apply HERE) used Path P foreground+tee at conf=0.91 — that gate IS the BRIDGE-MODE for the PLAN itself.

### F-007 (P1/AXIS_6) — Fire 3 codex command Pattern D conformance

Original Fire 3 command: `codex exec --ephemeral -p deep-review-exec --skip-git-repo-check --color never ... | tee ...`.
**Apply:** Two acceptable shapes per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D` (cite-import-AMBER per Section 14.5; ctff-patterns-cd.md L98-123,150-158):

**Option A (Pattern D strict — DEFAULT profile):**
```bash
timeout 300 codex exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_w211_master_catalog.txt \
  2>&1 | tee .claude/state/codex_consult_w211_master_catalog_OUT.txt
```
DEFAULT profile (medium effort + read-only sandbox), 300s timeout, focused ≤50 LOC prompt, JSON-at-EOF.

**Option B (recovery-family variant, explicit non-strict label):**
```bash
timeout 480 codex exec --ephemeral -p deep-review-exec --skip-git-repo-check --color never \
  < .claude/state/codex_consult_w211_master_catalog.txt \
  2>&1 | tee .claude/state/codex_consult_w211_master_catalog_OUT.txt
```
Justification for `-p deep-review-exec` (xhigh + danger-full-access): MUST be explicitly declared in consult prompt (e.g., "Pattern D recovery-family variant — xhigh effort required because master catalog spans 17 layers + 80+ scored repos + adversarial review across SRA D1-D10").

**Decision for Fire 3:** Default to Option A (Pattern D strict) per F-007 letter prescription. Escalate to Option B only if Option A produces Pattern B HNF (budget exhaustion on master catalog scope). Per `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md §Forward Discipline #1` (loaded in cite trail) — large-catalog scope may need TIGHTER per-layer prompt sequencing rather than one mega-T1.

### F-008 (P1/AXIS_6) — Fire 4 split into 4a dry-run + 4b execute

Original Fire 4: direct install Top-N after operator approval.
**Apply:** Split into TWO fires:

**Fire 4a (dry-run install plan):**
- For each Top-N repo: exact official-native install command per CR-6 (`npm install -g <pkg>@<exact-version>` / `gh release download` / `uvx --refresh <pkg>` / `docker pull <image>:<digest>` / `/plugin install <namespace>`)
- Version/digest/HEAD-SHA pinning per cardinal-rule-9 install-risk discipline (`@latest` REJECTED — must use exact version OR `@latest-acknowledged-D6-risk` marker)
- Required env vars + secrets (named, NOT value)
- Expected smoke probe per repo (smoke_probe_command from F-003 extended matrix)
- Manifest row updates (`docs/sota-installed-manifest.md`)
- Provenance entries (`docs/install-provenance.md`)
- Uninstall/rollback commands per repo
- Data-residency/security/credential-scope notes
- **Output: `tmp/w211-4a-dry-run-install-plan-2026-05-15.md`**
- **Operator approval REQUIRED before Fire 4b runs**

**Fire 4b (execute):**
- Only after operator explicit GO on 4a output
- Execute exact commands from 4a (no improvisation)
- Each install followed immediately by smoke probe
- Manifest + provenance update atomic per install
- Failure on any smoke probe → STOP + report

### F-009 (P1/AXIS_7) — Mia pre-apply replaced with claim-shape routing

Original Fire 2: "apply Mia pre-apply on every scored claim."
**Apply:** Replace with claim-shape routing per `Z:/claude-sota/.claude/rules/mia-pre-apply.md:45-63,64-78` (cite-import-AMBER) + `synthesis-layer-verify.md §Subclaim-type discriminator`:

| Claim shape | Verifier |
|---|---|
| Agent prescription with specific file:line edits | Mia (cheap-probe) |
| Gap claims (missing/unwired/needs adding) | Mia (Grep/Glob/git log probes) |
| Runtime-state claims | Mia (live read of `.mcp.json` / `settings.json` / hook output) |
| Install-class existence claims | Mia (`npm view <pkg>` / `gh api repos/<owner>/<repo>` / Docker manifest probe) |
| Quantitative facts (counts, stars, versions, cpd, hook counts) | Mia (`mcp__github__*` + `wc -l` + `git log` direct) |
| Semantic CATEGORY-CLAIM judgments | Codex T1 (architectural reasoning required) |
| ADOPT/INSTALL verdicts | Codex T1 at Fire 3 (cross-model gate; NOT Mia) |
| Incumbent-vs-candidate mechanism comparison | Codex T1 (CR-12 disposition class assessment) |
| Multi-source SOTA sufficiency | Convergence-gate Axis 1+2+3 probe per F-004 (NOT Mia) |
| Claims not cheaply probed by local file/API checks | Codex T1 (T1 = cross-model authority) |

DO NOT spend Mia budget on pure read-only summaries without concrete claims (e.g., agent's narrative reasoning).

### F-010 (P1/AXIS_8) — Fire 5 lifecycle verification extended

Original Fire 5: smoke-probes MCP/plugin/hook + verification markdown.
**Apply:** Extend with T2/T3 lifecycle verification per `cmc-t1-t7-lifecycle.md:51-58` + provenance closure per `install-provenance.md:15-20` + override ledger per CR-7:

Fire 5 deliverables:
1. Per-MCP smoke probe (init handshake + `tools/list` + 1 representative tool invocation)
2. Per-plugin smoke probe (slash command surface verify + Skill tool invocation if user-invocable)
3. Per-hook smoke probe (PreToolUse / PostToolUse / SubagentStop / PreCompact each)
4. **T2/T3 codex lifecycle verification on the install commits themselves** — `.claude/state/codex_review_HEAD_<sha>.txt` files for each Fire 4b commit verified as APPROVE-class
5. Manifest row status verified per primitive (INSTALLED+smoke-PASS evidence required)
6. Provenance entry verified per primitive (install command + version + HEAD SHA + smoke probe outcome recorded)
7. **Unresolved risk + override ledger** in final handoff: every `[OVERRIDE]` marker / `@latest-acknowledged-D6-risk` / OPTION-C MANUAL-OVERRIDE per CR-7 documented with named risk-owner
8. CR-7 Phase 1→2 (or 2→3) progression decision per Tier 5 INSTALLED+smoke-PASS predicates

---

## Revised Fire arc structure (post Pattern A apply)

| Fire | Scope | Cross-model gate | Output |
|---|---|---|---|
| **F1** (in flight) | 3 Sonnet stand-in agents A+B+C breadth research L1-L17 minus L0 | NOT-satisfied (STAND-IN per ENV (f) equivalent) | 3 ARTIFACT-INLINE catalogs |
| **F1D** (staggered, post-first-A/B/C-return) | 1 Sonnet stand-in agent D — L0 + cross-cutting L13/L17/L16 supplement | NOT-satisfied | `tmp/w211-D-L0-cross-cutting-2026-05-15.md` |
| **F1.5** (new — codex T1 F-005 prescription) | Candidate-list challenge: merge/dedupe + W203-W210 delta + missing-category scan + T0-style review if Top-N cost high | T0 candidate-list review (if fires) = real GPT-5.5 via Path P | `tmp/w211-1.5-candidate-list-challenge-2026-05-15.md` |
| **F2** | Synthesis master catalog with extended 25-column scoring matrix + Mia at claim-shape boundaries (NOT every claim) | Mia = local-probe-only; cross-model still NOT-satisfied | `tmp/w211-master-catalog-2026-05-15.md` |
| **F3** | Real GPT-5.5 convergence verification via Path P Option A (DEFAULT profile, 300s, focused prompt) | SATISFIED | `.claude/state/codex_consult_w211_master_catalog_OUT.txt` |
| **F4a** | Dry-run install plan — exact commands + version pins + smoke probes + rollback per repo | n/a (planning fire) | `tmp/w211-4a-dry-run-install-plan-2026-05-15.md` |
| **F4b** | Execute install + smoke probe per repo + manifest/provenance atomic update | T3 postcommit hook auto-fires per install commit | install commits + manifest updates |
| **F5** | E2E verify: per-MCP + per-plugin + per-hook smoke probes + T2/T3 verdict per install commit + provenance closure + override ledger | T2/T3 lifecycle SATISFIED per install commit | `tmp/w211-e2e-verify-2026-05-15.md` |

---

## Cross-model status ledger (per F-006 prescription, this commit)

- **W211 plan-v1 → plan-v2 transition (THIS Pattern A apply):** Cross-model gate SATISFIED via codex T1 Path P real GPT-5.5 NEEDS-REVISION conf=0.91 at `.claude/state/codex_consult_w211_plan_audit_OUT.txt` — 8 audit axes + 10 prescribed_edits + ship_decision PROCEED-WITH-EDITS.
- **Override declared:** ≥2 BRIDGE-MODE-subagent standing-directive (`advanced-agent-team-standing-directive.md:35-42` cite-import-AMBER per Section 14.5) **OVERRIDDEN** for Fire 1 + 1D per same-session W50F2 FM-17.b/d autocompact-thrash evidence (n=2 codex-rescue agents 649s + 1216s thrash, NO verdict). Recovery: orchestrator-direct Path P codex exec at F3 + this plan-audit substitutes for the BRIDGE-MODE-subagent gate at the design-surface layer.
- **No ADOPT/INSTALL/Top-N finalization** before Fire 3 verdict lands.

---

## Cite trail (Pattern A apply provenance)

| Source | Cite class | Authority for |
|---|---|---|
| `.claude/state/codex_consult_w211_plan_audit_OUT.txt` (5126 LOC; verdict at L4907-4920 + L5114-5124 EOF) | TIER-3 evidence trail | Driving Pattern A apply per cardinal-rule-3 cross-model gate |
| `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` (cite-import-AMBER per CLAUDE.md Section 14.5) | TIER-3-LOCAL-COMPOSITION | Single atomic apply discipline at conf 0.88-0.93 + ≤10 prescriptions |
| `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md §Forward Discipline #1+#2` | TIER-3-LOCAL-COMPOSITION (promoted Wave 134 Fire 37 cycle-322 n=4) | Path P prompt-scope-control for Fire 3 master catalog scope |
| `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md` n=20 cumulative | TIER-3-LOCAL-COMPOSITION | Sub-claim decompose-and-probe at synthesis-vs-Edit boundary (this apply IS such a boundary) |
| `Z:/claude-sota-installed/.claude/rules/agent-harness-fit-verification.md §Probe DAG 1-7` | TIER-3-LOCAL-COMPOSITION | Probe DAG applied at F1.5 candidate-list challenge per F-005 |
| `https://code.claude.com/docs/en/settings` | TIER-1-DIRECT | Permission-mode enum for CR-7 Phase declaration in F-010 |
| `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ HEAD f8468e87` | TIER-1-DIRECT | T1-T3 lifecycle authority for F-010 |

---

## Mia pre-apply on this Pattern A apply itself (recursive dogfood)

Per `mia-pre-apply.md §Empirical evidence ladder` recursive dogfood shape (n=8+ cumulative): I Mia-probed F-007 directly (Pattern D target shape verify against `ctff-patterns-cd.md §Pattern D` — confirmed deep-review-exec EXCLUDED from Option A Pattern D strict) BEFORE codifying the F-007 prescription apply. Ratified GENUINE. F-006 + F-001 + F-009 ratified via direct rule-text inspection from system reminders. F-002 + F-005 + F-008 + F-010 are structural plan changes (no factual claims to probe; logical-coherence verified). F-003 + F-004 are matrix extensions (additive — no risk of OVER, just additional dimensions agents will need to fill).

This Pattern A apply does NOT carry FM-20 path-drift cascade risk because verdicts are read from EOF directly (no propagated-cite chain) and prescribed_edits cite primary sources at file:line + HEAD SHA per CR-1.

---

## Forward queue

1. Continue awaiting Agents A/B/C async returns (running ~5-15min ETA each)
2. On FIRST agent return: dispatch Fire 1D (Agent D — L0 + cross-cutting supplement) per F-002 staggered pattern
3. On ALL Fire 1 returns: Fire 1.5 candidate-list challenge per F-005
4. F1.5 PASS → Fire 2 synthesis with extended 25-column matrix + claim-shape-routed verification
5. Fire 2 close → Fire 3 Path P Option A (DEFAULT profile)
6. F3 verdict APPROVE/NEEDS-REVISION → Fire 4a dry-run install plan
7. Operator GO on 4a → Fire 4b execute
8. Fire 5 E2E verify with full T2/T3 + provenance closure + override ledger

**Plan-v2 is the operating document for Fires 1D through 5. Plan-v1 (the initial response in this fire) is superseded but preserved in scrollback per `port-note-discipline.md §6` no-retroactive-rewrite.**
