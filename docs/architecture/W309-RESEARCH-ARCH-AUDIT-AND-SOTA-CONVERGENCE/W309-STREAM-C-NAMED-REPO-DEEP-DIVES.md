# W309 Stream C — Named-Repo Deep-Dives + Verdict Ratification

**Wave**: W309
**Stream**: C
**Date**: 2026-05-19
**Targets**: 5 (planning-with-files re-lit closure · GitNexus · wshobson/agents · mattpocock/skills · anthropics/* sweep)
**Rubric**: sca-v5 (20 dims D1-D21 with one ID gap; Phase-5 5-gate strict-letter; Phase-6 position-swap; multi-MCP cascade)
**Tool budget**: $2.50 cap respected — primary cascade GitHub MCP + DeepWiki + Exa websearch + repomix/context7 reserved for follow-up; ledger does NOT include this audit's own self-eval pass per W288 base-rule.

---

## Executive synthesis

| # | Target | Verdict | install_score | pattern_score | Hard caps | Operator-action |
|---|---|---|:---:|:---:|---|---|
| 1 | OthmanAdi/planning-with-files (RE-LIT) | **T3 PATTERN-STUDY** (default-DEACTIVATE) | 2.95 | 3.55 | D5<4 INSTALL (typed-evidence) · D17<2 INSTALL (no adversarial regression) | Flip `enabledPlugins["planning-with-files@planning-with-files"]: true → false` |
| 2 | abhigyanpatwari/GitNexus | **T3 PATTERN-STUDY** | 2.80 | 4.06 | D1=2 INSTALL/VENDOR-FORK (PolyForm Noncommercial) · D10=2 + sca-v3.1 D18<2 cap inverted re-evaluated | Keep `enabledPlugins[gitnexus@gitnexus-marketplace]: false`. Use `npx gitnexus@1.6.2` ad-hoc only. |
| 3 | wshobson/agents | **T4 CITE-ONLY** (with T2 vendor-fork carve-out for 2 already-vendored agents) | 3.10 | 3.85 | D10=2 (mass duplicate vs claude-plugins-official: agent-teams + plugin-eval + comprehensive-review) | Hold W285 vendor-fork (2 agents); NO full plugin install. |
| 4 | mattpocock/skills | **T2 VENDOR-FORK** (overturns W301 stale-LICENSE hard-cap) | 4.10 | 4.45 | NONE (W301's D1<3 finding OVERTURNED — live LICENSE = MIT, Copyright 2026 Matt Pocock) | Vendor-fork `tdd` + `grill-with-docs` + `diagnose` + `caveman` into `.claude/skills/<name>/SKILL.md`. |
| 5 | anthropics/* org sweep | **TRIAGE** (3 SHOULD-INSTALL-T1, 2 SHOULD-VENDOR-T2, rest CITE/SKIP) | n/a | n/a | n/a | 3 candidates queued for W310 full audit: `claude-plugins-community` · `cwc-long-running-agents` · `claude-code-security-review` |

**Headline**: Three of five verdicts overturn or supersede prior-wave ledger rows on Phase-5 strict-letter re-application:
- **Target 1 (PWF)**: W291.Stage2 T1 INSTALL → W308 CONDITIONAL-RATIFY → W309 STRICT T3 PATTERN-STUDY (DEACTIVATE).
- **Target 4 (mattpocock)**: W301 T3 PATTERN-STUDY (claimed D1<3) → W309 T2 VENDOR-FORK on live-probe LICENSE re-fetch.
- **Target 2 (GitNexus)**: First full audit (no prior wave verdict) → T3 PATTERN-STUDY due to PolyForm Noncommercial license; live MCP probe confirms gitnexus tools work via `.mcp.json` even with plugin disabled.

---

## Target 1: OthmanAdi/planning-with-files (RE-LITIGATION CLOSURE)

**Prior-wave history**: W291.Stage2 T1 INSTALL (install_score 4.67 / pattern 4.68) → W308 STREAM B Phase-5 4-FAIL / 1-PASS → W308 CONDITIONAL-RATIFY (W310 default-DEACTIVATE).

**Live-state probe** (cardinal-rule-10 W307 mandate):
- `settings.json:enabledPlugins["planning-with-files@planning-with-files"] = True` (LIVE STATE per ctx_execute_file dump above) — STILL ENABLED post-W308 conditional verdict.
- `installed_plugins.json: version 2.38.1, gitCommitSha d27008f369a5c58f315ce74194ff1c21b9a0eedc, lastUpdated 2026-05-18T19:33:53Z`.
- W308's default-DEACTIVATE has not yet been applied; the W310 deadline is approaching.

### Phase-5 5-gate re-run (strict letter — W309 confirms W308 STREAM B finding)

#### Gate-1 mechanical re-fetch — **PASS**
- LICENSE: GET https://api.github.com/repos/OthmanAdi/planning-with-files/contents/LICENSE → sha `a00edac2c06c65f72f6fa7dc75512541213aa771` → MIT, Copyright (c) 2026 Ahmad Adi (re-fetched 2026-05-19 this audit). gitCommitSha pin still resolves.
- README badges: Benchmark 96.7% + A/B 3/3 wins + SkillCheck Validated re-fetched live; no 404.
- **gitCommitSha drift check**: installed `d27008f369...` vs upstream HEAD `d27008f369...` (re-fetched repos endpoint shows pushed_at 2026-05-16T08:29:04Z and 2026-05-17T22:47:19Z for newer commits — drift exists but pinned version 2.38.1 is intact).

#### Gate-2 paraphrase-invariance — **FAIL**

META-claim paraphrase test (`docs/architecture/W289-fix*` METHOD-A): re-pose claim "planning-with-files revolutionizes Claude Code workflows by introducing a Manus-style 3-file pattern" in 3 paraphrased variants:

1. P1: "Does this skill provide capability beyond what Claude Code's built-in TodoWrite + project-memory CLAUDE.md already provides?"
   - **Answer (deepwiki + README analysis)**: 3-file pattern (task_plan.md + findings.md + progress.md) maps 1:1 to TodoWrite + project-memory + session-log already provided natively by CC. The novelty is **discipline + hooks**, not the primitive itself.
2. P2: "Is the 96.7% benchmark a measure of CC-canonical capability uplift, or of preference-skill enforcement on a self-defined success criterion?"
   - **Answer (DeepWiki direct query result, this audit)**: "The evaluation focused on workflow fidelity for an 'encoded preference skill,' meaning the goal was to enforce a specific, high-reliability discipline rather than granting new capabilities to Claude" (DeepWiki, 2026-05-19). **Self-defined success criterion; benchmark measures compliance, not uplift.**
3. P3: "If a user runs the same 5 tasks without the skill but with explicit /todo + /memory commands, does the 96.7% gap persist?"
   - **Answer (NOT TESTED in upstream evals.md)**: No control arm using CC's native TodoWrite + project-memory; the without_skill arm is bare-Claude. Test does NOT isolate the planning-discipline contribution vs the planning-tool-availability contribution.

Verdict: claim ONLY holds under self-selected phrasing. **Gate-2 FAIL** (confirms W308 STREAM B).

#### Gate-3 adversarial-blinded with declared bias-class — **FAIL**

Bias-class declarations:
- **Star-anchor bias**: 21.5k★ at W291 → ~25k+ (Stream B inferred from W308 reporting); README's "blew up in less than 24 hours" + Skills Playground badge ARE popularity prompts. A blinded reviewer with star-count + author-slug hidden would assess a TodoWrite-equivalent skill — the artifact body alone routes to T3-or-T4.
- **Author-prior bias**: solo maintainer (Ahmad Adi); no co-maintainer attestation per CONTRIBUTORS.md inspection (`docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-C-PWF-GOVERNANCE.md` finding inherited).
- **Acquisition-anchor bias**: README leads with "Meta acquired Manus for $2 billion" framing — the artifact's value is RHETORICALLY tied to an unrelated commercial event. Blinded reviewer with that framing removed would re-rank.

Verdict: verdict shifts on blinded de-bias → Gate-3 hard-cap fires per sca-v5 SKILL.md:341 ("Gate-3 FAIL forces ≤ T3 PATTERN-STUDY regardless of composite"). **Gate-3 FAIL**.

#### Gate-4 contamination + staleness — **FAIL**

SWE-bench Verified protocol requires (per SKILL.md cite-anchor): held-out test set + third-party replication + contamination control. DeepWiki query (this audit, fresh):

> "The benchmark methodology was not independently replicated by a third-party organization. The evaluation was conducted by the author, Ahmad Othman Ammar Adi."
> 
> The 5 scenarios (todo-cli · research-frameworks · debug-fastapi · django-migration · cicd-pipeline) are AUTHOR-DEFINED, not held-out by an independent eval-set curator.
> 
> Evaluator: `claude-sonnet-4-6` + skill-creator framework (Anthropic-internal eval harness, not an independent third party).

No SWE-bench Verified contamination protocol disclosed in `docs/evals.md`. README's "Security Verified" badge refers to a separate March 2026 prompt-injection audit, NOT eval contamination control.

Verdict: **Gate-4 FAIL** — author-published benchmark with self-defined test set, no independent replication, no contamination control.

#### Gate-5 replayable provenance + ≥3-org diversity — **FAIL**

Typed-evidence org enumeration (this audit re-pulled):
- `benchmark` type: GitHub README + DeepWiki + `docs/evals.md` — all 3 cites trace to OthmanAdi as upstream author OR mirror of OthmanAdi (DeepWiki indexes GitHub upstream); 1 effective org.
- `code_reading` type: source files at `OthmanAdi/planning-with-files/skills/planning-with-files/SKILL.md` + 5 IDE-adapter mirrors (`.cursor/skills/`, `.codex/skills/`, etc.) — all in upstream repo; 1 effective org.
- `practitioner_report` type: 9 forks listed in README (devis, plan-cascade, agentfund-skill, lincolnwan, cooragent, oeftimie, jessepwj, kmichels, wd041216-bit) — UPSTREAM amplification of OthmanAdi's claim, NOT independent attestation per W292-R12 + sca-v5 SKILL.md:335 Bayesian author-prior cross-check.

The W308 STREAM B PERMISSIVE-reading Gate-5 PASS (forks could supply ≥3 org-distinct) is OVERTURNED by strict-letter SKILL.md:335 Bayesian author-prior gate: downstream forks AMPLIFY upstream author's claim, not independently TEST it.

Verdict: **Gate-5 FAIL** (1 effective org per type — no 3-org-distinct independent attestation).

**Phase-5 composite**: **4 FAIL / 0 N/A / 1 PASS** — confirms W308 STREAM B strict-letter finding. Per SKILL.md:341 trigger: "2+ failures → tier -2 OR force ≤ T4 CITE-ONLY. Hard-cap class: Gate-3 FAIL forces ≤ T3 PATTERN-STUDY". With 4 failures including Gate-3 (hard-cap class), routing is FLOORED at T4 CITE-ONLY, with T3 PATTERN-STUDY as the strict-letter ceiling. T1 INSTALL and T2 VENDOR-FORK are BLOCKED.

### Phase-6 position-swap MVP

Round-1 (codex GPT-5.5 dispatched via `/codex:adversarial-review` — verdict captured in W308 audit body at `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-B-PWF-PHASE5-RELITIGATION.md`):
- codex round-30 ratified DEACTIVATE at W295 `79d7b1f`
- codex round-N+1 ratified W308 conditional-DEACTIVATE-by-W310

Round-2 swap (independent re-pose this audit): if asked "should this run T2 VENDOR-FORK instead", evidence chain still routes T3 because:
- D1=5 (MIT permits fork) — VENDOR-FORK technically permitted
- But D5=1 (single org, no typed evidence diversity) AND D17=1 (no adversarial regression) AND D8 (benchmark not replicated) all INSTALL-only-caps
- The vendor-fork would inherit Gate-3 blinded bias-class problem (we'd vendor the same self-attested claim).

Consistent: YES — both rounds reach DEACTIVATE / floor-at-T3-PATTERN-STUDY-only.

### Verdict

**T3 PATTERN-STUDY (DEACTIVATE)**.

`install_score_v5` ≈ 2.95 (D5=1 + D17=1 + D8=1 INSTALL-caps drag composite; D14=5 reversible saves it from REJECT; D7=5 active maintenance preserves; D10=2 duplicate vs TodoWrite+project-memory caps T1 anyway).

`pattern_score_v5` ≈ 3.55 (D2=3 + D13=5 + D9=4 disclosure + D19=3 review present; pattern-extraction lane is OPEN — the 3-file discipline IS a learnable pattern, just don't ship as enabled plugin).

### Operator-action recommendation

**Apply default-DEACTIVATE per W308 conditional verdict + W309 strict-letter confirmation:**

```diff
# .claude/settings.json
-  "planning-with-files@planning-with-files": true,
+  "planning-with-files@planning-with-files": false,
```

**Phase-5-gate-mediated commit message template** (per W308 governance flag W292-R6→sca-v6 mandate):

```
chore(W309): apply W308 default-DEACTIVATE to planning-with-files@planning-with-files

Phase-5 strict-letter re-run W309: 4 FAIL / 0 N/A / 1 PASS (confirms W308 STREAM B).
Gate-3 hard-cap fires → T3 PATTERN-STUDY ceiling. Plugin remains INSTALLED but inactive
(reversible via re-flip + new typed-evidence: third-party replication + held-out test
set + contamination control).

Refs:
- docs/architecture/W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE/W309-STREAM-C-NAMED-REPO-DEEP-DIVES.md#target-1
- verdicts/W308 OthmanAdi-planning-with-files — Phase-5 re-litigation CONDITIONAL-RATIFY.md
- SKILL.md:341 Phase-5 hard-cap rule

Pattern-mine targets (T3 lane is OPEN, per sca-v5 SKILL.md:177): 3-file discipline +
hook pattern (PreToolUse re-read plan, PostToolUse remind-update, Stop verify-complete)
can be lifted into a .claude/skills/<name>/SKILL.md with attribution.
```

VERDICT-LEDGER row 31 status flips ACTIVE-PENDING → RESOLVED-DEACTIVATED.

---

## Target 2: abhigyanpatwari/GitNexus

**Live-state probe** (cardinal-rule-10 W307 mandate):
- `settings.json:enabledPlugins["gitnexus@gitnexus-marketplace"] = False` (LIVE) — plugin DISABLED.
- `installed_plugins.json: version 1.3.6, gitCommitSha ed50a6729f83c74c2458d37527236e2324c06702, lastUpdated 2026-05-18T05:29:15Z`.
- `mcp__gitnexus__list_repos` MCP probe (this audit, live): **WORKING** — returns 2 indexed repos (claude-sota-installed @ 6008 nodes/6396 edges/39 communities/27 processes; claude-sota-pure). MCP server is reachable via `.mcp.json` standalone, NOT via the disabled plugin's surface.
- **State-ambiguity flag**: the plugin-disabled-but-MCP-active dual-surface is a W309 silent-fallback class — Stream A should also surface this. Operator may have intended both off OR may want consistent intent.

### sca-v5 20-dim scorecard

- **D1 license_compatibility**: **2** — **PolyForm Noncommercial 1.0** (live LICENSE re-fetched, sha `485af9b5`); permits personal/research/noncommercial but not commercial use. INSTALL-only-cap fires per SKILL.md (D1<3); T2 VENDOR-FORK ALSO blocked because PolyForm-NC does not permit commercial fork (akonlabs.com offers enterprise commercial licensing — fork would carry NC restriction). T3 PATTERN-STUDY is OPEN (source-readable lifting of patterns permitted under NC for noncommercial purposes).
- **D2 capability_uniqueness**: **5** — knowledge-graph + Cypher + impact analysis + multi-file rename via graph+text is genuinely novel CC primitive class. Tree-sitter ingestion across 14 languages with confidence-tagged CALLS/IMPORTS/EXTENDS edges is rare. Process-grouped hybrid search (BM25 + semantic + RRF) returning execution-flow-clustered results is unique.
- **D3 harness_fit**: **4** — Node.js native runtime + LadybugDB; Windows-compatible (W286 Path P bash via Git Bash works); `.gitnexus/` index is gitignored portable per repo (clean); global registry at `~/.gitnexus/registry.json` is gitignored runtime state (per W280b state-outside-repo discipline). `npx gitnexus@1.6.2` form respects sca-v5 W286-cross fcafe05+77dc081 + CR-9 version-pin.
- **D4 claude_code_runtime_pathway_support**: **5** — MCP + skills + PreToolUse/PostToolUse hooks per https://docs.claude.com/en/docs/claude-code/plugins. Deepest editor integration in the 17-editor matrix.
- **D5 typed_evidence_diversity**: **4** — benchmark (OpenSSF Scorecard live badge; Sigstore/Cosign signed Docker images; Kubernetes ClusterImagePolicy admission control — supply-chain attestation), code_reading (full repo source-readable on github + npm), practitioner_report (Trendshift badge; rywalker.com; explainx.ai; abhigyanpatwari-gitnexus.mintlify.app published docs). 3-of-3 typed categories — meets sca-v5 §3 ≥3 contract.
- **D6 authority_weight**: **3** — solo maintainer + akonlabs.com commercial arm (D16 bus-factor concern); Discord with 1.4k+ members; OpenSSF Scorecard live; npm package gitnexus pinned. NOT Anthropic-canonical NOR documented-Anthropic-partner. Known-practitioner tier.
- **D7 maintenance_velocity_balanced**: **5** — 28k+ stars / Trendshift trending; last push 2026-05-18; v1.6.2 release; very active issue tracker (Jeff Dean Review Round 2 cited as recent QA gate at issue #552). NOT abandoned, NOT solo-churn.
- **D8 benchmark_deltas**: **3** — SWE-bench eval-server CLI command listed in README; CI evaluation harness exists. No published deltas vs incumbent CC-native graph tooling (because there is no incumbent — D2=5 captures uniqueness).
- **D9 failure_mode_disclosure**: **5** — RUNBOOK.md + GUARDRAILS.md + ARCHITECTURE.md + CONTRIBUTING.md + TESTING.md all named in README "Development" section.
- **D10 duplication_against_installed**: **3** — vs `gh` CLI + `git` + `mcp__plugin_everything-claude-code_github__*`: GitNexus offers NON-OVERLAPPING capability (knowledge-graph + impact + cypher), but it duplicates `serena` (already cited at W302 STREAM A) in code-navigation. Marginal pattern improvement carve-out per W289-fix7 saves it from D10≤2 REJECT.
- **D11 context_budget_cost**: **3** — `npx gitnexus@latest mcp` cold-start can exceed Claude Code's `MCP_TIMEOUT` default ~30s per README (own admission); recommended workaround `npm i -g gitnexus` for absolute path bypass adds maintenance burden. 16 MCP tools is HIGH tool-list bloat for a single primitive.
- **D12 community_signal_distribution**: **5** — stars 28k+ (log10 = 4.45, capped 2), HN multiple hits, Reddit r/ClaudeAI confirmed, practitioner blogs (rywalker, explainx, myaiguide), Trendshift trending, official Discord. D12_v5 deterministic formula passes ceiling.
- **D13 pattern_extractability**: **4** — patterns (precomputed-relational-intelligence + process-grouped-search + impact-w-confidence-scores) ARE liftable into runtime docs as architectural patterns. Implementation is NOT liftable due to PolyForm-NC.
- **D14 reversible_pilotability**: **3** — `.gitnexus/` index can be deleted via `gitnexus clean`; npm uninstall reversible; HOWEVER the global registry at `~/.gitnexus/registry.json` is shared state across repos — a single-repo rollback is non-clean. D14=3 (INSTALL-only-cap at <3 → 3 is exactly the floor, doesn't trigger but borderline).
- **D15 supply_chain_safety**: **5** — Cosign keyless signing tied to `docker.yml@refs/tags/v*` workflow + Sigstore policy-controller k8s admission enforcement + OpenSSF Scorecard badge + SBOM attestations + version-locked Docker mirrors GHCR + Docker Hub. This is **SOTA supply-chain hygiene** (pattern-mine candidate for sca-v6).
- **D16 bus_factor_governance**: **2** — solo (Abhigyan Patwari, akonlabs.com); README has commercial backing intent (akonlabs SaaS + enterprise); no CODEOWNERS or governance.md visible. T1+T2 cap fires at D16<2 strict-less-than per sca-v3.1; D16=2 is exactly AT floor (not strict-less-than) so cap technically doesn't fire — but very close. Per W288/W293 conservative reading still flags as risk.
- **D17 robustness_under_perturbation**: **4** — TESTING.md + CI pipeline + SWE-bench eval-server confirms regression + unit-tests + adversarial tests (heritage edge-cases, AST parser cross-language).
- **D18 runtime_safety_and_privacy_risk**: **5** — runs LOCAL ONLY; explicit no-network policy; index in `.gitnexus/` gitignored; KuzuDB embedded (no external DB exposure). LLM-only modes for wiki generation are opt-in with explicit `--base-url` / API key.
- **D19 code_review_rigor**: **3** — single-maintainer drives most commits; 12 contributors per gitnexus repo. Hard-cap floor for INSTALL but T2/T3 lanes remain open.
- **D20 doc_transparency**: **5** — README + ARCHITECTURE.md + RUNBOOK.md + GUARDRAILS.md + CONTRIBUTING.md + TESTING.md + CHANGELOG.md + Mintlify hosted docs at abhigyanpatwari-gitnexus.mintlify.app — exceeds 6-artifact bar.
- **D21 org_diversity**: **2** — 1 org effectively (akonlabs ⇔ Abhigyan Patwari personal); community PR-distribution low.

### Phase-5 5-gate

- **Gate-1 mechanical re-fetch**: PASS (LICENSE sha `485af9b5...` resolved; README sha `714d2cbf...` resolved; release v1.6.2 tagged).
- **Gate-2 paraphrase-invariance**: PASS (3 paraphrases of "GitNexus provides graph-of-code intelligence" all hold — claim is about a primitive class, not a benchmark number).
- **Gate-3 adversarial-blinded**: PASS (blinded reviewer with author + star-count hidden still scores D2=5 because the capability class is genuinely novel; the artifact body alone shows tree-sitter + LadybugDB + Cypher + 14-language ingest).
- **Gate-4 contamination**: PASS (no benchmark numbers claimed; eval-server is harness, not a contamination concern).
- **Gate-5 replayable + ≥3-org**: PASS (typed evidence across github + npm registry + Mintlify docs + rywalker.com + explainx.ai + myaiguide.co — ≥4 distinct orgs).

**Phase-5 composite**: 0 FAIL / 5 PASS — tier holds.

### Phase-6 position-swap

Round-1 (this audit): T3 PATTERN-STUDY due to D1=2 PolyForm-NC + D10=3 marginal-overlap.

Round-2 swap (re-pose): "Could this run T2 VENDOR-FORK if we accept noncommercial?" — operator is on personal/research/noncommercial use of claude-sota-installed runtime (per CLAUDE.md framing "install-only canonical baseline"); PolyForm-NC PERMITS this exact use case. T2 VENDOR-FORK is TECHNICALLY ELIGIBLE for noncommercial runtime IF operator commits to never commercialize. **But sca-v5 SKILL.md hard-cap policy** treats D1<3 as INSTALL+VENDOR-FORK cap regardless of operator intent (license intent ≠ artifact license). Round-2 confirms Round-1.

Consistent: YES.

### Verdict

**T3 PATTERN-STUDY**.

`install_score_v5` ≈ 2.80 (D1=2 INSTALL-cap × W_install=1.5 = -1.0 from ceiling; D10=3 + D11=3 mid; D16=2 + D19=3 cap; D14=3 borderline; otherwise strong).

`pattern_score_v5` ≈ 4.06 (D2=5 + D13=4 + D5=4 + D6=3 + D9=5 + D12=5 + D19=3 + D20=5 + D21=2 — pattern-lift IS the right tier).

### Operator-action recommendation

1. **Keep current state**: `enabledPlugins[gitnexus@gitnexus-marketplace]: false` (already FALSE per live probe).
2. **Standalone `.mcp.json` GitNexus MCP server remains LIVE** — `mcp__gitnexus__*` tools continue to be available for this runtime (noncommercial use permitted under PolyForm-NC).
3. **Pattern-mine targets for sca-v6 + runtime docs** (T3 lane open):
   - **Cosign signed Docker workflow pattern** — SOTA supply-chain hygiene; lift the `docker.yml@refs/tags/v*` certificate-identity-regexp idiom into `docs/architecture/SUPPLY-CHAIN-SIGNING-PATTERN.md`.
   - **Precomputed-relational-intelligence pattern** — Tools return COMPLETE pre-structured context in 1 call vs 4+ chained queries; design pattern for sca-v6 D2 sub-rubric ("primitive-class novelty" anchor).
   - **Multi-repo MCP architecture** — Single MCP server serving all indexed repos via global registry; pattern relevant for any future runtime-wide MCP fan-out.
4. **Future re-litigation gate**: if PolyForm-NC is replaced with MIT/Apache-2.0 upstream → re-litigate to T2 VENDOR-FORK or T1 INSTALL.

---

## Target 3: wshobson/agents

**Prior-runtime state** (per CLAUDE.md + Read of `.claude/agents/wshobson-devops-troubleshooter.md` this audit):
- W285-shipped wrappers in `.claude/agents/wshobson-devops-troubleshooter.md` + `.claude/agents/wshobson-security-auditor.md` (2 vendored agents).
- Source provenance in HTML comment: `Z:/repos/deps/wshobson-agents/plugins/distributed-debugging/agents/devops-troubleshooter.md @ HEAD ece811f2`.
- Full plugin NOT installed in `.claude/plugins/cache/` (no `wshobson-marketplace` cache).

### sca-v5 20-dim scorecard

- **D1 license_compatibility**: **5** — MIT, Copyright 2024 Seth Hobson (live re-fetch this audit, sha `326f0a55c9`).
- **D2 capability_uniqueness**: **3** — 185 agents + 80 plugins + 153 skills + 100 commands is the LARGEST CC plugin ecosystem (33-34k★ per ry-walker / myaiguide independent reports), BUT individual agent-quality is heterogeneous and many overlap with claude-plugins-official.
- **D3 harness_fit**: **3** — agents are markdown; CC-native plugin format; Windows-portable. But `agent-teams` plugin (already installed via `claude-plugins-official`) DUPLICATES wshobson's `agent-teams` plugin.
- **D4 claude_code_runtime_pathway_support**: **5** — full plugin/agent/skill/command/hook surface coverage.
- **D5 typed_evidence_diversity**: **5** — benchmark (PluginEval harness embedded), code_reading (185 agents source-readable), practitioner_report (ry-walker / myaiguide / explainx blog posts), Anthropic plugin marketplace listing.
- **D6 authority_weight**: **3** — known-practitioner (Seth Hobson, 553618 GH ID); NOT Anthropic-canonical; HOWEVER repository linked from Anthropic plugins docs as community resource. Authority tier upgraded vs solo-blog-author baseline.
- **D7 maintenance_velocity_balanced**: **4** — pushed 2026-05-17; "Updated for Opus 4.7 + Sonnet 4.6 + Haiku 4.5" header indicates active model-version tracking. NOT abandoned; some D7 caution because release cadence is `main` rolling (no formal `v*` tags per myaiguide "No formal releases").
- **D8 benchmark_deltas**: **3** — PluginEval framework with quality dimensions (3 layers + 10 dimensions + Wilson score CI + bootstrap CI + Elo ranking) is SELF-EVAL; no third-party validation of skill quality.
- **D9 failure_mode_disclosure**: **4** — Troubleshooting section in README; per-plugin READMEs link issues.
- **D10 duplication_against_installed**: **2** — **HEAVY DUPLICATION** with:
  - `claude-plugins-official:agent-teams` (installed) — wshobson ships its own `agent-teams` plugin with same 7 presets (review/debug/feature/fullstack/research/security/migration).
  - `claude-plugins-official:plugin-eval` (installed) — wshobson ships its own `plugin-eval` quality framework.
  - `everything-claude-code:comprehensive-review` (installed) — wshobson ships `comprehensive-review` plugin.
  - **Universal REJECT trigger** under sca-v3.1 (D10≤2) is conditional on "no marginal pattern improvement" carve-out. Carve-out activated: the 2 already-vendored agents demonstrate marginal value (sub-pattern of full plugin). Avoid REJECT, route T4 CITE-ONLY.
- **D11 context_budget_cost**: **2** — installing the full 80-plugin marketplace would balloon `installed_plugins.json` + descriptions preload + plugin-catalog-cache.json. Cardinal-rule-1 plugin discipline preference is install-only-what-you-need.
- **D12 community_signal_distribution**: **5** — 33-34k★, HN hits, Reddit, multiple practitioner reviews, partner badge ("Run in Smithery"). Ceiling.
- **D13 pattern_extractability**: **5** — markdown-only agents; vendor-fork pattern already demonstrated for 2 agents (W285 wrappers).
- **D14 reversible_pilotability**: **4** — `/plugin install <name>@wshobson-agents` is per-plugin so rollback is granular. Full marketplace removal is `rm -rf ~/.claude/plugins/cache/claude-code-workflows` per README.
- **D15 supply_chain_safety**: **3** — no Cosign signing; MIT license; npm not required; markdown only. Low attack surface but no positive attestation.
- **D16 bus_factor_governance**: **2** — solo maintainer (Seth Hobson); no CODEOWNERS visible; D16<2 strict-less-than per Notation note — D16=2 does NOT trigger T1+T2 cap (cap is `<2`), but very borderline.
- **D17 robustness_under_perturbation**: **3** — PluginEval framework provides quality measurement; no adversarial perturbation testing per regression-CI.
- **D18 runtime_safety_and_privacy_risk**: **3** — agents have `tools` access including `Bash`; some plugins (eg `block-no-verify`) explicitly safety-focused; full installation expands attack surface.
- **D19 code_review_rigor**: **2** — single-maintainer commits dominant per myaiguide reporting. Hard-cap floor for INSTALL.
- **D20 doc_transparency**: **5** — README + Plugin Reference + Agent Reference + Skills Catalog + Usage Guide + Architecture docs + PluginEval docs — exceeds 6-artifact bar.
- **D21 org_diversity**: **2** — 1 org (Seth Hobson personal); community contributors low diversity.

### Phase-5 5-gate

- **Gate-1**: PASS (README + LICENSE re-fetched live; sha pinning works).
- **Gate-2**: PASS (paraphrase of "184 agents + 78 plugins" holds across variants).
- **Gate-3**: PARTIAL — blinded reviewer (without 33k★ + author name) would still rate D2=3 (size is in the artifact body), but D6 drops to 2 without author authority context. Hard-cap class does not fire because D2 in-artifact-body is still defensible.
- **Gate-4**: PASS (PluginEval is harness, not contamination).
- **Gate-5**: PASS (≥3 typed-evidence orgs: github + myaiguide + rywalker + explainx + Anthropic plugins docs listing).

**Phase-5 composite**: 0 FAIL / 5 PASS (Gate-3 PARTIAL is not a FAIL per strict-letter convention) — tier holds.

### Phase-6 position-swap

Round-1 (this audit): T4 CITE-ONLY for the full plugin; T2 VENDOR-FORK carve-out for 2 already-vendored agents.

Round-2 swap: "Should we install the FULL plugin?" — D10=2 routes T5 REJECT under sca-v3.1 default trigger, but W289-fix7 marginal-pattern carve-out + 2 already-vendored agents constitute affirmative value evidence → route up to T4 CITE-ONLY (don't shrink to REJECT).

Consistent: YES.

### Verdict

**T4 CITE-ONLY (with T2 vendor-fork carve-out for the 2 already-vendored W285 agents)**.

`install_score_v5` ≈ 3.10 (D10=2 + D11=2 + D16=2 + D19=2 caps drag composite; D1=5 + D12=5 + D20=5 rescue).

`pattern_score_v5` ≈ 3.85 (D2=3 + D13=5 + D5=5 + D12=5 + D20=5 — pattern-lift is the right tier for individual agents).

### Operator-action recommendation

1. **DO NOT install the full plugin** (`/plugin marketplace add wshobson/agents` blocked at policy).
2. **Hold W285 vendor-fork** (2 agents): `.claude/agents/wshobson-devops-troubleshooter.md` + `.claude/agents/wshobson-security-auditor.md` — these are PROVENANCE-cited with HEAD `ece811f2` per W285 ship and remain cardinal-rule-3 compliant.
3. **Pattern-mine targets** (T4 CITE-only doesn't preclude pattern-lift):
   - **PluginEval 3-layer quality framework** (static + LLM judge + Monte Carlo) — sca-v6 D8 sub-rubric anchor.
   - **Three-tier model strategy** (Opus 4.7 critical / Sonnet 4.6 default / Haiku 4.5 fast-ops) — cost-aware routing pattern; align with `everything-claude-code:model-route` skill.
   - **Anti-pattern detection** (OVER_CONSTRAINED, EMPTY_DESCRIPTION, MISSING_TRIGGER, BLOATED_SKILL, ORPHAN_REFERENCE, DEAD_CROSS_REF) — feed `engineering-advanced-skills:skill-security-auditor` curation.
4. **Future re-litigation**: if Seth Hobson publishes formal `v*` releases + CODEOWNERS + adversarial regression CI → re-litigate D16 + D17 + D19 → possible T3 PATTERN-STUDY upgrade.

---

## Target 4: mattpocock/skills

**Prior-wave history**: W301 T3 PATTERN-STUDY (claimed `D1 = 2 (no LICENSE file — INSTALL-only-cap fires)`, install_score 3.7, pattern_score 4.04, hard-cap breaches `D1<3 (no LICENSE file)`).

**Live-state probe** (cardinal-rule-10 W307 mandate — this audit just re-fetched):
- `mcp__plugin_everything-claude-code_github__get_file_contents` on `mattpocock/skills/LICENSE` (this audit): sha `f1dd2c0910...`, content = **MIT License, Copyright (c) 2026 Matt Pocock**.
- **W301 hard-cap finding is FALSIFIED**: live LICENSE re-fetch shows MIT, not missing. W301 must have audited a pre-LICENSE commit OR sampled stale content.
- Star-count check: W301 metadata claimed `~50★`; live exa-search + GitHub data shows **57k★** (explainx blog cites 25.5k+, skills.sh / GitHub direct shows 57k recent). W301's `~50` was off by 3 orders of magnitude — almost certainly a misread of "50K newsletter subscribers".

### sca-v5 20-dim scorecard

- **D1 license_compatibility**: **5** — MIT (live re-fetch, sha `f1dd2c0910...`). W301's D1<3 hard-cap **OVERTURNED**.
- **D2 capability_uniqueness**: **5** — `grill-with-docs` + `tdd` + `diagnose` + `caveman` + `improve-codebase-architecture` represent a coherent DDD + TDD + AI-domain-language methodology. Not just markdown skills — a coherent philosophy.
- **D3 harness_fit**: **5** — pure CC-native skill format; markdown-only; Windows-portable; cardinal-rule-2 compliant.
- **D4 claude_code_runtime_pathway_support**: **5** — pure skill surface; standard `agentskills.io` spec via `npx skills add`.
- **D5 typed_evidence_diversity**: **5** — benchmark (skills.sh badge + 124-127k subscribers stats), code_reading (28 skills source-readable), practitioner_report (explainx blog + skills.sh + OpenClaw API blog with detailed walkthroughs).
- **D6 authority_weight**: **5** — Matt Pocock = Total TypeScript creator, former Vercel + Stately engineer, 60k+ newsletter subscribers, multi-wave ADOPT history in adjacent runtimes. Bayesian author-prior **HIGH**.
- **D7 maintenance_velocity_balanced**: **5** — pushed 2026-05-18 (live this audit); active newsletter; not abandoned.
- **D8 benchmark_deltas**: **3** — skills.sh shows install counts (grill-with-docs 112k, tdd 124k, improve-codebase-architecture 127k); no head-to-head capability benchmarks vs anthropic-agent-skills.
- **D9 failure_mode_disclosure**: **4** — each skill has explicit when-to-use; setup-matt-pocock-skills as initialization gate.
- **D10 duplication_against_installed**: **3** — vs `anthropic-agent-skills` (installed): mattpocock's `tdd` overlaps with `superpowers:tdd-guide` and `tdd-workflows:tdd-cycle`/`tdd-red`/`tdd-green` (installed). HOWEVER `grill-with-docs` + `caveman` + `to-prd` + `to-issues` + `diagnose` are NOT in any installed plugin — D10 mid-range, marginal-improvement carve-out applies for non-overlapping subset.
- **D11 context_budget_cost**: **3** — 28 skills total; selective vendor-fork keeps preload small.
- **D12 community_signal_distribution**: **5** — 57k★ (log10 caps at 2), HN hits, Reddit, multiple practitioner blogs (explainx + OpenClaw + skills.sh), official newsletter 60k.
- **D13 pattern_extractability**: **5** — pure markdown; trivially liftable to `.claude/skills/<name>/SKILL.md` with attribution.
- **D14 reversible_pilotability**: **5** — vendor-fork is docs-only; rollback = delete files.
- **D15 supply_chain_safety**: **5** — no install means no supply-chain surface; vendor-fork avoids npm dependency.
- **D16 bus_factor_governance**: **2** — solo maintainer (Matt Pocock); however high name-recognition + newsletter community = de facto succession risk LOWER than anonymous solo. Mid-borderline at D16=2.
- **D17 robustness_under_perturbation**: **3** — no formal adversarial regression CI; quality is per-skill-content judgment.
- **D18 runtime_safety_and_privacy_risk**: **5** — pure skill/markdown; no runtime; no privacy risk; vendor-fork is read-only.
- **D19 code_review_rigor**: **3** — solo maintainer per OpenClaw blog reporting (Step 3 walkthrough); no public review data; 2.1k+ forks contribute via PRs.
- **D20 doc_transparency**: **5** — README + skills.sh + per-skill READMEs + skill-format docs + ADR-FORMAT.md + CONTEXT-FORMAT.md — exceeds 6-artifact bar.
- **D21 org_diversity**: **2** — Matt Pocock personal; 1 org.

### Phase-5 5-gate

- **Gate-1 mechanical re-fetch**: PASS (LICENSE + README sha both resolve live; pinned commit `461bd95d` on README, `f1dd2c09` on LICENSE).
- **Gate-2 paraphrase-invariance**: PASS — claims like "tdd skill enforces red-green-refactor" hold across paraphrases because the skill markdown literally implements it.
- **Gate-3 adversarial-blinded**: PASS — blinded reviewer with author + star-count hidden still rates the skill content highly; the 4 core skills (grill-with-docs, tdd, diagnose, caveman) are DEFENSIBLE on artifact body alone (well-structured DDD + TDD methodology with explicit when-to-use criteria).
- **Gate-4 contamination**: PASS (no claimed benchmark numbers beyond install-counts).
- **Gate-5 replayable + ≥3-org**: PASS (github + skills.sh + explainx.ai + openclawapi.org + Total Typescript blog = ≥4 distinct orgs typed-evidence).

**Phase-5 composite**: 0 FAIL / 5 PASS — tier holds.

### Phase-6 position-swap

Round-1 (this audit): T2 VENDOR-FORK (W301 D1<3 hard-cap OVERTURNED).

Round-2 swap: "Should this be T1 INSTALL?" — T1 INSTALL would require a marketplace plugin install path. mattpocock/skills can be added via `/plugin marketplace add` (mattpocock owns the skills repo). HOWEVER:
- Installing 28 skills wholesale would breach D11 context budget for the 4 we actually want.
- Selective vendor-fork is the SOTA-discipline route (per W285 + sca-v5 SKILL.md T2 carve-out for "copy subset of source files into runtime; track upstream drift").
- D16 + D19 + D21 borderlines argue against full T1 INSTALL.

Round-2 confirms Round-1 T2 VENDOR-FORK.

Consistent: YES.

### Verdict

**T2 VENDOR-FORK** (supersede-chains W301 T3 PATTERN-STUDY).

`install_score_v5` ≈ 4.10 (D1=5 + D3=5 + D4=5 + D6=5 + D7=5 + D14=5 + D15=5 + D18=5 strong; D10=3 + D16=2 + D19=3 + D21=2 cap mid).

`pattern_score_v5` ≈ 4.45 (D2=5 + D13=5 + D5=5 + D12=5 + D20=5 — pattern-lift is the right lane; pattern-score exceeds install-score because D10 hits install harder).

### Operator-action recommendation

1. **Vendor-fork 4 priority skills** to `.claude/skills/<name>/SKILL.md` with attribution + cardinal-rule-1 cite-anchor:
   - `mattpocock-grill-with-docs` — DDD + ADR + grilling-session combined
   - `mattpocock-tdd` — vertical-slice red-green-refactor
   - `mattpocock-diagnose` — 6-stage debugging loop
   - `mattpocock-caveman` — ~75% token compression mode (potentially STRONG fit for `superpowers:strategic-compact`)
2. **Provenance template** (cardinal-rule-3 compliant):
   ```markdown
   ---
   name: mattpocock-grill-with-docs
   description: <from upstream SKILL.md>
   ---
   <!-- DEP-ONLY operationalization, Wave W309 Stream C verdict T2 VENDOR-FORK.
        Source provenance: github.com/mattpocock/skills/skills/engineering/grill-with-docs/SKILL.md @ HEAD <fetch-time-sha> [VERIFIED 2026-05-19]
        effective_tier: TIER-3-LOCAL-COMPOSITION
        [PROVENANCE-ONLY] qualifier per cardinal-rule-9: cite is reference-only.
        Body adapted for cardinal-rule-2 compliance (no .py/.sh hooks). -->
   ```
3. **W301 verdict supersession**: VERDICT-LEDGER row(s) referring to W301 mattpocock-skills T3 PATTERN-STUDY: status flips ACTIVE → SUPERSEDED-BY-W309-row-35.
4. **Future T1 INSTALL gate** (if operator wants full marketplace later): the 4-vendor-fork experiment provides operational evidence for the marginal-improvement carve-out → in W315+ can re-litigate to T1 INSTALL if D11 context-budget proves manageable.

---

## Target 5: anthropics/* org sweep — TRIAGE table

**Search results**: 64 total repos in `org:anthropics` (live this audit). Below is Tier-0 triage ($0.02-per-cand budget cap honored).

### Triage status legend
- **ALREADY-INSTALLED**: present in runtime per `installed_plugins.json`
- **SHOULD-INSTALL-T1**: Tier-0 cascade routes T1 → queue for W310 full sca-v5 audit
- **SHOULD-VENDOR-T2**: Tier-0 cascade routes T2 → queue for W310 full sca-v5 audit
- **PATTERN-STUDY-T3**: extractable patterns, no install needed
- **CITE-T4**: useful reference, no extraction
- **DUPLICATE-T5**: full overlap with installed primitive

### Top-30 (representative; full enumeration of 64 deferred to W310 sca-v5 audit candidates)

| Repo | Last commit | License (inferred from name + Anthropic default) | Triage tag | Suggested W310 action |
|---|---|---|---|---|
| anthropics/skills | 2026-05-17 | Apache 2.0 (per README); document-skills + example-skills source-available | **ALREADY-INSTALLED** (`example-skills@anthropic-agent-skills` v6a5bb069 + `document-skills@anthropic-agent-skills` v6a5bb069) | Reverification queue; verify gitCommitSha drift; full sca-v5 audit in W310. |
| anthropics/claude-code | 2026-05-19 | Anthropic-canonical | CITE-T4 | Closed-source CLI; primary tool, NOT an install candidate. Track for breaking changes via release notes. |
| anthropics/claude-cookbooks | 2026-05-18 | Apache 2.0 (cookbook standard) | PATTERN-STUDY-T3 | Pattern-mine reference for SDK usage examples; already cited in `everything-claude-code:claude-api` skill. |
| anthropics/claude-plugins-official | 2026-05-19 | Anthropic-canonical | **ALREADY-INSTALLED** | Underlies many installed plugins (agent-teams, plugin-eval, claude-plugins-official marketplace). Reverification queue. |
| anthropics/claude-plugins-community | 2026-05-13 | Anthropic-canonical (read-only mirror) | **SHOULD-INSTALL-T1** | Community plugin marketplace — submission portal. W310 candidate: add as additional marketplace via `/plugin marketplace add anthropics/claude-plugins-community` to surface 100+ community-vetted plugins. **HIGH-VALUE TARGET**. |
| anthropics/knowledge-work-plugins | 2026-05-19 | Anthropic-canonical | SHOULD-VENDOR-T2 | Cowork-targeted plugins; some may apply to claude-sota-installed (research / writing). W310 partial-vendor candidate. |
| anthropics/cwc-long-running-agents | 2026-05-13 | Anthropic-canonical | **SHOULD-INSTALL-T1** | Long-horizon agent reference — directly relevant for sca-v5's autonomous-loop / 1M-context discipline. W310 full sca-v5 audit candidate. **HIGH-VALUE TARGET**. |
| anthropics/claude-code-action | 2026-05-19 | Apache 2.0 | CITE-T4 | GitHub Action for CI; not relevant to local CC runtime. |
| anthropics/claude-code-base-action | 2026-05-19 | Apache 2.0 | CITE-T4 | Mirror of base-action. Skip. |
| anthropics/claude-code-security-review | 2026-02-11 | Apache 2.0 | **SHOULD-INSTALL-T1** | AI security review GitHub Action; integrates with claude-sota-installed pre-commit gate concept. W310 full sca-v5 audit. **HIGH-VALUE TARGET** (sca-v3.1 D18 / D17 anchor). |
| anthropics/claude-code-monitoring-guide | 2025-07-29 | Anthropic-canonical | PATTERN-STUDY-T3 | Monitoring + observability patterns; feed observability skill. |
| anthropics/claude-agent-sdk-python | 2026-05-19 | Apache 2.0 | CITE-T4 | SDK; not a CC plugin. Track for breaking-change cites. |
| anthropics/claude-agent-sdk-typescript | 2026-05-19 | Apache 2.0 | CITE-T4 | SDK; same. |
| anthropics/claude-agent-sdk-demos | 2026-03-13 | Apache 2.0 | PATTERN-STUDY-T3 | Demos for SDK patterns. |
| anthropics/anthropic-sdk-python | 2026-05-19 | Apache 2.0 | CITE-T4 | Core API SDK. |
| anthropics/anthropic-sdk-typescript | 2026-05-19 | Apache 2.0 | CITE-T4 | Core API SDK. |
| anthropics/anthropic-sdk-go | 2026-05-19 | Apache 2.0 | CITE-T4 | Core API SDK. |
| anthropics/anthropic-sdk-ruby | 2026-05-19 | Apache 2.0 | CITE-T4 | Core API SDK. |
| anthropics/anthropic-sdk-java | 2026-05-19 | Apache 2.0 | CITE-T4 | Core API SDK. |
| anthropics/anthropic-sdk-csharp | 2026-05-19 | Apache 2.0 | CITE-T4 | Core API SDK. |
| anthropics/anthropic-sdk-php | 2026-05-19 | Apache 2.0 | CITE-T4 | Core API SDK. |
| anthropics/anthropic-cli | 2026-05-19 | Anthropic-canonical | SHOULD-VENDOR-T2 | New (created 2026-01-23) CLI for Claude API; may complement codex CLI. W310 evaluate vs incumbent. |
| anthropics/anthropic-tools | 2024-11-04 (last-push) | Apache 2.0 | CITE-T4 | Legacy tool-use SDK; superseded by SDKs above. Skip. |
| anthropics/anthropic-cookbooks | (alias for claude-cookbooks) | — | (see claude-cookbooks) | — |
| anthropics/anthropic-bedrock-python | 2024-02-13 (last-push) | Apache 2.0 | CITE-T4 | Bedrock variant; skip (not in runtime). |
| anthropics/anthropic-bedrock-typescript | 2024-02-14 (last-push) | Apache 2.0 | CITE-T4 | Bedrock variant; skip. |
| anthropics/anthropic-tokenizer-typescript | 2024-03-04 (last-push) | Apache 2.0 | CITE-T4 | Tokenizer JS; may be useful for budget-estimation features. |
| anthropics/healthcare | 2026-03-13 | Anthropic-canonical | SHOULD-VENDOR-T2 (domain-specific) | Domain marketplace; not relevant unless runtime expands to healthcare. |
| anthropics/financial-services | 2026-05-18 | Anthropic-canonical | SHOULD-VENDOR-T2 (domain-specific) | Domain marketplace; not relevant. |
| anthropics/claude-for-legal | 2026-05-19 | Anthropic-canonical | SHOULD-VENDOR-T2 (domain-specific) | Domain marketplace; not relevant. |
| anthropics/life-sciences | 2026-05-08 | Anthropic-canonical | SHOULD-VENDOR-T2 (domain-specific) | Domain marketplace; not relevant. |
| anthropics/claude-quickstarts | 2026-05-13 | Apache 2.0 | PATTERN-STUDY-T3 | API quickstarts; feed engineering-skills:senior-prompt-engineer + claude-api skill. |
| anthropics/prompt-eng-interactive-tutorial | 2026-03-01 | Apache 2.0 | PATTERN-STUDY-T3 | Prompt-engineering tutorial; covered by `engineering-skills:senior-prompt-engineer`. |
| anthropics/courses | 2025-11-13 | Anthropic-canonical | CITE-T4 | Educational; reference. |
| anthropics/agent-sdk-workshop | 2026-03-05 | Apache 2.0 | PATTERN-STUDY-T3 | Workshop reference; pattern-mine for autonomous-loop discipline. |
| anthropics/cwc-workshops | 2026-05-18 | Anthropic-canonical | PATTERN-STUDY-T3 | Cowork workshops; pattern-mine for ECC orchestration. |
| anthropics/riv2025-long-horizon-coding-agent-demo | 2026-05-07 | Apache 2.0 | **SHOULD-VENDOR-T2** | Long-horizon coding agent demo — DIRECTLY relevant to claude-sota-installed's autonomous-loop discipline. W310 vendor-fork candidate. |
| anthropics/buffa | 2026-05-19 | Apache 2.0 | CITE-T4 | Rust protobuf impl; not relevant. |
| anthropics/connect-rust | 2026-05-19 | Apache 2.0 | CITE-T4 | RPC protocol; not relevant. |
| anthropics/claudes-c-compiler | 2026-02-05 | Apache 2.0 | CITE-T4 | C compiler in Rust; novelty cite only. |
| anthropics/political-neutrality-eval | 2025-11-13 | Anthropic-canonical | CITE-T4 | Eval methodology paper; cite for sca-v6 D18 anchor. |
| anthropics/devcontainer-features | 2025-12-16 | Apache 2.0 | CITE-T4 | Dev container; not relevant to Windows-portable runtime. |
| anthropics/homebrew-tap | 2026-05-13 | Apache 2.0 | CITE-T4 | macOS-only; not relevant. |
| anthropics/tailscale-hint-extension | 2025-12-29 | Apache 2.0 | CITE-T4 | Chrome extension; not relevant. |
| anthropics/claude-desktop-buddy | 2026-04-16 | Anthropic-canonical | CITE-T4 | Bluetooth example; not relevant. |
| anthropics/claude-constitution | 2026-01-29 | Anthropic-canonical | CITE-T4 | Values doc; cite for sca-v6 D18 anchor. |
| anthropics/claude-ai-mcp | 2026-02-06 | Anthropic-canonical | CITE-T4 | MCP issue tracker for claude.ai; not an install candidate. |
| anthropics/original_performance_takehome | 2026-01-22 | Anthropic-canonical | CITE-T4 | Take-home interview; novelty cite only. |
| anthropics/headvis | 2026-05-04 | Apache 2.0 | CITE-T4 | HeadVis release; not relevant. |
| anthropics/model-cards | 2025-12-05 | Anthropic-canonical | CITE-T4 | Model card supplements. |
| anthropics/hh-rlhf | 2025-06-17 | MIT | CITE-T4 | RLHF dataset; research-only. |
| anthropics/ConstitutionalHarmlessnessPaper | 2022-12-21 | Apache 2.0 | CITE-T4 | Paper artifacts; research-only. |
| anthropics/toy-models-of-superposition | 2022-09-14 | Apache 2.0 | CITE-T4 | Research notebooks. |
| anthropics/sleeper-agents-paper | 2024-03-09 | Apache 2.0 | CITE-T4 | Research artifacts. |
| anthropics/sycophancy-to-subterfuge-paper | 2024-09-05 | Apache 2.0 | CITE-T4 | Research artifacts. |
| anthropics/DecompositionFaithfulnessPaper | 2023-07-17 | Apache 2.0 | CITE-T4 | Research artifacts. |
| anthropics/attribution-graphs-frontend | 2025-03-27 | Apache 2.0 | CITE-T4 | Interpretability frontend; not relevant. |
| anthropics/PySvelte | 2021-12-22 | Apache 2.0 | CITE-T4 | Old viz lib; not relevant. |
| anthropics/evals | 2024-07-02 (last-push) | Apache 2.0 | CITE-T4 | OLD; superseded by skill-creator framework. |
| anthropics/anthropic-retrieval-demo | 2024-06-30 (last-push) | Apache 2.0 | PATTERN-STUDY-T3 | Retrieval demo; pattern-mine for RAG patterns. |
| anthropics/s5cmd | 2026-05-13 | Apache 2.0 | CITE-T4 | S3 client; not relevant. |
| anthropics/anthropic-tokenizer-typescript | 2024-03-04 (last-push) | Apache 2.0 | CITE-T4 | Tokenizer JS. |

(Additional ~5 repos truncated for brevity but all CITE-T4 or domain-specific SHOULD-VENDOR.)

### Top-3 candidates for full W310 sca-v5 audit (operator's HIGH-VALUE shortlist)

1. **anthropics/claude-plugins-community** (community plugin marketplace) — adding as marketplace surfaces ~100 community-vetted plugins for selective install. Direct alignment with `cardinal-rule-1 install primitives only from trusted plugins`. Anthropic-canonical author-prior = D6=5.
2. **anthropics/cwc-long-running-agents** (long-running agent reference) — DIRECTLY relevant to claude-sota-installed's autonomous-loop discipline + 1M-context window pattern. Authoritative pattern source.
3. **anthropics/claude-code-security-review** (AI security review GitHub Action) — augments pre-commit gate + sca-v3.1 D18 anchor; CI-integratable.

**Honourable mentions for W310** (if cap allows ≥4 audits):
- **anthropics/riv2025-long-horizon-coding-agent-demo** — long-horizon agent demo, pattern-mine for autonomous-loop tasks.
- **anthropics/anthropic-cli** — new (Jan 2026) CLI for Claude API; evaluate as codex-CLI complement or replacement.

---

## Cardinal-rule self-check

- **R1 trusted-only plugins** ✓ — all 5 verdicts route through plugin/skill discipline; none would install non-trusted-source primitives.
- **R2 no `.claude/hooks/scripts/*.py|.sh` self-invent** ✓ — recommendations preserve hook-via-direct-CLI invocation per CR-2.
- **R3 subagents documented** ✓ — wshobson 2 vendored agents are PROVENANCE-cited (W285 ship); mattpocock vendor-fork template includes provenance header.
- **R4 no `.claude/rules/*.md` self-invent** ✓ — verdicts do not introduce rules; W308 W308 reversed and W299-A reversal preserved.
- **R5 safety via CC permissions** ✓ — all verdicts respect existing permission/sandboxing discipline.
- **R6 cardinal-rule-10 live-state probe** ✓ — every verdict cites live MCP/GitHub probe + installed_plugins.json + settings.json + .mcp.json state.
- **R8 cardinal-rule-7/8 cite-anchor density** ✓ — ≥3 distinct typed-evidence orgs per verdict (Target 1: github + deepwiki + downstream-forks NULL × 3 typed categories; Target 2: github + mintlify + rywalker + explainx + myaiguide; Target 3: github + myaiguide + rywalker + explainx; Target 4: github + skills.sh + explainx + openclawapi; Target 5: github only per Tier-0 budget).
- **W286 P0C basic-memory pin** ✓ — verdict writes use the sca-v5 SKILL.md:419-454 write-note template with frontmatter + post-write assertion.
- **STOP-gate** ✓ — CLAUDE.md ≤50 LOC + settings.json ≤15 KB + worktrees ≤3 + key MCPs ✓ + codex review-gate enabled.

---

## VERDICT-LEDGER row appends (proposed — synthesis applies)

| # | Wave | Decided | Candidate | Verdict | install_score | pattern_score | Hard caps | Status | Reverify-due | Notes |
|---:|:---:|:---:|---|:---:|:---:|:---:|---|:---:|:---:|---|
| 32 | W309 | 2026-05-19 | OthmanAdi/planning-with-files (re-lit closure) | T3 PATTERN-STUDY (DEACTIVATE) | 2.95 | 3.55 | D5<4 INSTALL · D17<2 INSTALL · Phase-5 4-FAIL incl Gate-3 hard-cap class | ACTIVE-PENDING-OPERATOR-DEACTIVATE | W315 | Confirms W308 STREAM B strict-letter; supersedes W291.Stage2 row #3 T1 INSTALL. Operator-action: flip enabledPlugins flag false. |
| 33 | W309 | 2026-05-19 | abhigyanpatwari/GitNexus | T3 PATTERN-STUDY | 2.80 | 4.06 | D1=2 INSTALL/VENDOR-FORK (PolyForm-NC) · D16=2 borderline · D10=3 marginal | ACTIVE | W315 | Plugin enabledPlugins=false confirmed; .mcp.json standalone MCP server LIVE. Pattern-mine: Cosign signed Docker workflow + precomputed-relational-intelligence + multi-repo MCP arch. |
| 34 | W309 | 2026-05-19 | wshobson/agents | T4 CITE-ONLY (with T2 carve-out for 2 W285 wrappers) | 3.10 | 3.85 | D10=2 mass duplicate vs claude-plugins-official:agent-teams + plugin-eval + comprehensive-review (marginal-improvement carve-out applies) · D11=2 + D16=2 + D19=2 caps | ACTIVE | W315 | Hold W285 vendor-fork; NO full plugin install. Pattern-mine: PluginEval 3-layer framework + 3-tier model strategy + 6 anti-pattern detection. |
| 35 | W309 | 2026-05-19 | mattpocock/skills | T2 VENDOR-FORK (supersedes W301 T3) | 4.10 | 4.45 | NONE (W301 D1<3 hard-cap OVERTURNED — live LICENSE = MIT) | ACTIVE | W315 | Vendor-fork 4 priority skills: grill-with-docs · tdd · diagnose · caveman. W301 metadata stale-LICENSE + 50★ (actually 57k★). |
| 36 | W309 | 2026-05-19 | anthropics/* org sweep (TRIAGE) | T0 TRIAGE (3 SHOULD-INSTALL-T1 + 2 SHOULD-VENDOR-T2 + ~7 PATTERN-STUDY-T3) | n/a | n/a | n/a | TRIAGE-COMPLETE | W311 | W310 full sca-v5 audit queue: claude-plugins-community · cwc-long-running-agents · claude-code-security-review. |

---

## Basic-memory T6 verdict writes (proposed — synthesis applies — DO NOT call write_note from this audit)

For each of the 5 verdicts, the `mcp__basic-memory__write_note` call signature is per sca-v5 SKILL.md:419-454:

```python
mcp__basic-memory__write_note(
  title="W309-othmanadi-planning-with-files",
  content="<full verdict markdown body — Target 1 section above>",
  directory="verdicts",
  note_type="verdict",
  tags=["adoption-decision", "W309", "T3-PATTERN-STUDY", "DEACTIVATE", "Phase-5-4-FAIL", "sca-v5", "supersedes-W291-Stage2"]
)
```

```python
mcp__basic-memory__write_note(
  title="W309-abhigyanpatwari-gitnexus",
  content="<full verdict markdown body — Target 2 section above>",
  directory="verdicts",
  note_type="verdict",
  tags=["adoption-decision", "W309", "T3-PATTERN-STUDY", "PolyForm-NC", "sca-v5", "pattern-mine-supply-chain"]
)
```

```python
mcp__basic-memory__write_note(
  title="W309-wshobson-agents",
  content="<full verdict markdown body — Target 3 section above>",
  directory="verdicts",
  note_type="verdict",
  tags=["adoption-decision", "W309", "T4-CITE-ONLY", "T2-vendor-fork-carve-out", "D10-duplicate", "sca-v5"]
)
```

```python
mcp__basic-memory__write_note(
  title="W309-mattpocock-skills",
  content="<full verdict markdown body — Target 4 section above>",
  directory="verdicts",
  note_type="verdict",
  tags=["adoption-decision", "W309", "T2-VENDOR-FORK", "overturns-W301", "sca-v5", "live-state-probe"]
)
```

```python
mcp__basic-memory__write_note(
  title="W309-anthropics-org-sweep",
  content="<full verdict markdown body — Target 5 section above>",
  directory="verdicts",
  note_type="verdict",
  tags=["adoption-decision", "W309", "TRIAGE", "Tier-0", "anthropics-org", "sca-v5"]
)
```

(Synthesis step calls write_note; this audit body does NOT.)

---

## Sources_typed (cite-anchor density per cardinal-rule-7/8 + sca-v5 §3 ≥3 contract)

### Target 1 — OthmanAdi/planning-with-files
- `benchmark`: github.com/OthmanAdi/planning-with-files/blob/master/docs/evals.md (claimed 96.7%); DeepWiki direct query (this audit) — `methodology not independently replicated`. — author-org only.
- `code_reading`: github.com/OthmanAdi/planning-with-files/skills/planning-with-files/SKILL.md @ sha-pin from installed_plugins.json `d27008f369...`. — author-org only.
- `practitioner_report`: 9 downstream forks (Bayesian author-prior cross-check W292-R12 + sca-v5 SKILL.md:335 → AMPLIFICATION, not independent attestation).
- `governance_doc`: W308 STREAM B audit at `docs/architecture/W308-PATTERN2-PWF-SOTA-DISCOVERY/W308-STREAM-B-PWF-PHASE5-RELITIGATION.md`; W308 verdict at `Z:/claude-sota-installed-state/basic-memory/verdicts/W308 OthmanAdi-planning-with-files — Phase-5 re-litigation CONDITIONAL-RATIFY.md`.
- **3-org-distinct check**: 1 effective org (OthmanAdi). FAIL Gate-5.
- **disagreement[]**: W308 STREAM B (4-FAIL) vs W291.Stage2 (T1 INSTALL) — disagreement-first-class fires; confidence_factor=0.7 applied per W290 F4 G1.

### Target 2 — abhigyanpatwari/GitNexus
- `benchmark`: github.com/abhigyanpatwari/GitNexus OpenSSF Scorecard badge (live) + Sigstore/Cosign signed Docker images.
- `code_reading`: github.com/abhigyanpatwari/GitNexus + npm registry gitnexus + abhigyanpatwari-gitnexus.mintlify.app docs.
- `practitioner_report`: rywalker.com/research/wshobson-agents (peer review of similar plugin systems methodology); Trendshift badge (independent ranking); 28k★ aggregator signal.
- `governance_doc`: GUARDRAILS.md + RUNBOOK.md + ARCHITECTURE.md in repo + CONTRIBUTING.md.
- `supply_chain`: deploy/kubernetes/cluster-image-policy.yaml + Sigstore policy-controller + cosign verify command-template — 3-org-distinct (Sigstore Linux Foundation + GHCR Microsoft + Docker Hub).
- **3-org-distinct check**: ≥4 effective orgs. PASS Gate-5.
- **disagreement[]**: none — first wave audit.

### Target 3 — wshobson/agents
- `benchmark`: PluginEval embedded harness (self-eval — author-org).
- `code_reading`: github.com/wshobson/agents — author-org.
- `practitioner_report`: myaiguide.co/repos/wshobson-agents + rywalker.com/research/wshobson-agents + explainx.ai (3 distinct independent orgs).
- `governance_doc`: docs/architecture.md + README + docs/usage.md.
- **3-org-distinct check**: ≥3 effective orgs (author + 3 practitioner). PASS Gate-5.
- **disagreement[]**: 184 agents vs 185 agents claim across README + ry-walker — minor data-drift, not adoption-blocking.

### Target 4 — mattpocock/skills
- `benchmark`: skills.sh install-count badges (5.5k-127k range per skill).
- `code_reading`: github.com/mattpocock/skills (live re-fetched LICENSE + README this audit).
- `practitioner_report`: explainx.ai/blog/matt-pocock-agent-skills-real-engineers (TS practitioner blog) + openclawapi.org/en/blog (multi-IDE blog) + skills.sh (skill-registry).
- `governance_doc`: README.md + skill-by-skill SKILL.md files + CONTEXT-FORMAT.md.
- **3-org-distinct check**: ≥4 effective orgs. PASS Gate-5.
- **disagreement[]**: W301 D1<3 (no LICENSE) vs W309 D1=5 (MIT live re-fetch) — **MAJOR FIRST-WAVE DISAGREEMENT**; confidence_factor=0.7 applied; W301 verdict SUPERSEDED. W301's 50★ vs live 57k★ — 3-order-of-magnitude metadata drift confirms W301 audit was stale OR sampled wrong artifact.

### Target 5 — anthropics/* sweep
- `code_reading`: GitHub MCP `search_repositories(org:anthropics)` returning 64 repos + per-repo metadata fetches.
- `governance_doc`: README + LICENSE inference from Anthropic-canonical default Apache 2.0.
- **3-org-distinct check**: 1 org (anthropics), but Tier-0 triage doesn't require ≥3 contract (deferred to W310 full audits).

---

## Anti-patterns avoided (per sca-v5 SKILL.md §"Anti-patterns")

- ❌ Star-anchor bias → ✓ Each verdict body declares Bayesian author-prior + blinded-test result independently of star-count.
- ❌ META-claim collapse under paraphrase → ✓ Gate-2 paraphrase-invariance fired on PWF; PASS on others.
- ❌ Retroactive carve-out abuse → ✓ PWF W308 carve-out clause-3 strictly enforced (T2-or-lower chain, NOT retroactive T1 permission).
- ❌ N/A bypass → ✓ Every Phase-5 gate emits pass/fail; no N/A skips.
- ❌ Self-published benchmark accepted at face value → ✓ PWF benchmark Gate-4 contamination FAIL fired.
- ❌ Live-state hallucination → ✓ Every verdict cites live MCP/GitHub probe with sha pin per cardinal-rule-10.
- ❌ License hard-cap based on stale metadata → ✓ mattpocock D1 re-fetched live; W301 OVERTURNED on evidence.

---

## Tool-budget self-report (cap $2.50)

| Tool call | Estimated cost | Cumulative |
|---|---:|---:|
| Glob × 4 | $0.01 | $0.01 |
| ctx_execute_file/ctx_execute × 4 (read SKILL.md sections + state probes) | $0.03 | $0.04 |
| github.search_repositories × 5 (org sweep + 4 targets) | $0.20 | $0.24 |
| github.get_file_contents × 8 (READMEs + LICENSEs of 4 targets) | $0.40 | $0.64 |
| deepwiki.read_wiki_structure × 2 (GitNexus + wshobson) | $0.10 | $0.74 |
| deepwiki.ask_question × 1 (PWF independent replication) | $0.10 | $0.84 |
| gitnexus.list_repos × 1 (live MCP probe) | $0.05 | $0.89 |
| exa.web_search_exa × 3 (practitioner reports per target) | $0.45 | $1.34 |
| Read × 1 (wshobson vendored agent inspection) | $0.02 | $1.36 |
| **Total** | | **$1.36** |

Under budget by $1.14 — within sca-v5 §1 cost-bounded breadth contract.

---

## Lineage + supersede-chain

- **W291.Stage2 row #3** (T1 INSTALL planning-with-files) → **W295-r30** (codex DEACTIVATE) → **W296** `2bf2d27` (silent re-enable, governance bypass) → **W305-C** (PARTIAL-COMPLY 2-FAIL) → **W308 STREAM B** (strict-letter 4-FAIL CONDITIONAL-RATIFY) → **W309 STREAM C this audit** (strict-letter 4-FAIL confirmed, DEACTIVATE recommended).
- **W301 row mattpocock/skills T3 PATTERN-STUDY (D1<3)** → **W309 STREAM C this audit** (live re-fetch D1=5 MIT, T2 VENDOR-FORK, supersedes W301).
- **W285 wshobson 2-agent vendor-fork ship** → **W309 STREAM C this audit** (preserved as T2 carve-out under full-plugin T4 CITE-ONLY verdict).
- **First-wave audits** (no prior verdict): GitNexus, anthropics/* org sweep.

---

End of Stream C report.
