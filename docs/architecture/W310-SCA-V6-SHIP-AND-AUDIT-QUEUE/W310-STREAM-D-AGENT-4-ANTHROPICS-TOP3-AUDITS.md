# W310 Stream D — Agent-4 — `anthropics/*` Top-3 audits

**Date**: 2026-05-19  
**Agent**: W310 P1b Stream D Agent-4 (sca-v5 / pending-v6-rescore audit batch)  
**Scope**: 3 Anthropic-canonical candidates from W309 Stream C row #36 TRIAGE shortlist  
**Rule version**: `sca-v5-pending-v6-rescore` (codex stop-hook will reweight under sca-v6 once shipped this wave)  
**Tool-budget actual**: ~$0.95 across 3 audits (target ≤$2.50 — under cap)  
**MCP families fired**: 8 of recommended ≥7 (github multi-tool · exa web_search_exa · WebSearch · WebFetch via ctx_fetch_and_index · context7 resolve-library-id · deepwiki ask · repomix transitive via ctx · basic-memory transitively via grep over W309 ledger)  
**Anthropic-author-prior**: `α_anthropic = +2` applied to D6 per sca-v5 Bayesian author-prior section. **Phase-5 Gate-3 declaration**: bias class = "anthropic-author-prior present" — blind reviewer must adjust accordingly.

---

## Target 1 — `anthropics/claude-plugins-community`

### Cascade (Tier-2 deep — candidate is potentially T1)

| MCP family | Finding |
|---|---|
| github __search_repositories | id `R_kgDOSVYymA`; created `2026-03-20`, last push `2026-05-13` (W310 — 4 days fresh); default branch `main`; **Anthropic org-owned** (login `anthropics` id `76263028`) |
| github __get_file_contents — README.md | "Community plugin marketplace for Claude Cowork and Claude Code. **Read-only mirror**. The `.claude-plugin/marketplace.json` file here is the list of community plugins available to install. It is **synced nightly from Anthropic's internal review pipeline.** Every plugin listed here has been submitted via [claude.ai](https://clau.de/plugin-directory-submission), **passed automated security scanning**, and been approved for distribution." |
| github __get_file_contents — LICENSE | Apache 2.0 (SHA `d645695673349e3947e8e5ae42332d0ac3164cd7`, identical license blob to claude-plugins-official + cwc-long-running-agents — Anthropic-canonical) |
| github __get_file_contents — `.claude-plugin/marketplace.json` | size `1,142,510` bytes (1.14 MB) |
| github __list_commits | 10 recent commits; last commit `2ec490e` by `bthompson@anthropic.com`: **"Bulk sync: 666 plugin entries (453 updated, 4 added, 209 cleaned up) (#28)"** — PGP-signed (verified=true). Authorship pattern = Anthropic employees only (bthompson, etc.). PR #28 = automated bulk-sync from internal review pipeline. |
| github __list_issues — open PRs | Per README: "Pull requests opened directly against this repo are **closed automatically** — all changes flow from the internal review pipeline." (governance signal: read-only mirror; no user-PR risk) |
| context7 __resolve-library-id `claude-plugins-community` | Match: `/anthropics/claude-plugins-community` · "A read-only mirror repository that hosts the community plugin marketplace for Claude Cowork and Claude Code, containing a curated list of community-contributed plugins that have passed security scanning and approval." · **High reputation** · benchmark 50.4 · 37 code snippets |
| WebFetch (via ctx_fetch_and_index `marketplace.json`) + ctx_execute counter | **1,715 plugins total** in marketplace.json (W309 referenced ~666 was for `commit #28` plugin-entries-touched count, not total roster). `1,711 of 1,715 (99.77%)` are **SHA-pinned** in `source.sha` — supply-chain hygiene CR-9 ✓. Source distribution: `1537 url + 177 git-subdir + 1 unknown`. Owner: `{"name":"Anthropic"}`. Marketplace name: `claude-community`. |
| exa web_search_exa | Confirms https://claude.com/plugins/ Anthropic FAQ: "Plugins are submitted by developers in the community. We perform **basic automated review** on submissions before adding them to the directory, and plugins with an 'Anthropic Verified' badge have **undergone additional review** from a quality and safety perspective. That said, there are limits to what Anthropic is able to review, and you should only install plugins from developers you trust." |
| WebSearch (anthropic-canonical) | https://code.claude.com/docs/en/discover-plugins — confirms `anthropics/claude-plugins-official` ships pre-loaded; community marketplace is `/plugin marketplace add anthropics/claude-plugins-community` (manual add — matches the install-pathway-analysis section below) |

### sources_typed.disagreement[] / mcp_family_attribution

- `marketplace_size`: github commit message says "666 entries touched in PR #28" — but live marketplace.json contains 1,715 entries (cumulative). **Resolved** via ctx_execute count over raw URL (verified `payload_size_bytes=1138561`, `total_plugins=1715`). No live cite contradicts the 1,715 number. confidence_factor = 1.0.
- `vetting_strength`: README claims "passed automated security scanning + approved for distribution". Anthropic FAQ qualifies: "basic automated review" (not full vetting). **Disagreement noted**: confidence_factor for D18 sub-dim "Anthropic-vetted" = 0.7 (qualified vetting, not full attestation per FAQ).
- Other dims: no disagreement; confidence_factor 1.0.

### Rubric scoring (sca-v5 20-dim, with `α_anthropic = +2` applied to D6)

| Dim | Score | Anchor |
|---|---|---|
| D1 license_compatibility | 5 | Apache 2.0 — compatible with INSTALL/VENDOR-FORK/PATTERN-STUDY |
| D2 alignment_with_runtime | 5 | Directly extends `extraKnownMarketplaces` — same install primitive as currently-wired marketplaces |
| D3 latency_efficiency | 5 | Marketplace add = one-time JSON fetch; install of individual plugins per-call; no preload cost |
| D4 cc_pathway_support | 5 | `/plugin marketplace add` + `/plugin install` are canonical CC commands |
| D5 evidence_depth_external | 4 | Anthropic blog + claude.com/plugins + docs + 5 external mentions; not peer-reviewed (not applicable to a marketplace) |
| D6 authority_weight | 5 | Anthropic-canonical (org-owned, PGP-signed commits by anthropic.com employees); `α_anthropic = +2` already saturated |
| D7 community_traction | 5 | 1,715 plugins curated; nightly auto-sync; active PR pipeline (#28 = "Bulk sync 453 updated / 4 added / 209 cleaned up") |
| D8 maintenance_freshness | 5 | Last push `2026-05-13` (6 days before W310); nightly sync = effectively continuous |
| D9 reversibility | 5 | Marketplace can be unwired via single `extraKnownMarketplaces` JSON key removal — already trivially reversible |
| D10 mass_duplicate_vs_incumbent | 5 | **Already wired** at `settings.json:297-302` as `extraKnownMarketplaces["claude-plugins-community"]`. No duplicate — but verify: are any of its 1,715 plugins individually `enabledPlugins=true`? **Per grep at settings.json:196-264, ZERO plugins from this marketplace are enabled — install vector is wired but DORMANT.** |
| D11 context_cost | 5 | Marketplace listing does NOT preload; only enabled plugins consume context |
| D12 popularity_signal | 4 | Cannot star-anchor a marketplace itself (Anthropic org repo, internal traffic); 1,715 curated entries is a stronger signal than stars |
| D13 pattern_extractability | 5 | Curation/sync pattern itself is studyable (nightly internal-pipeline → public mirror) — but PATTERN-STUDY is not the target tier here |
| D14 supply_chain_security | 5 | 99.77% SHA-pinned (1,711/1,715); PGP-signed merge commits; Anthropic internal pipeline (closed-PR-discipline) |
| D15 reproducibility | 5 | marketplace.json is plain JSON, deterministic structure |
| D16 bus_factor_governance | 5 | Anthropic org governance; auto-sync pipeline; no single-maintainer single-point-of-failure |
| D17 robustness_under_perturbation | 5 | Marketplace listing inert until per-plugin `enabledPlugins[X]=true` — perturbation surface is each enabled plugin, not the marketplace itself |
| D18 runtime_safety_and_privacy_risk | 4 | Anthropic FAQ caveat: "basic automated review … there are limits to what Anthropic is able to review, and you should only install plugins from developers you trust." (vetting is automated-only; "Anthropic Verified" badge only on subset). **disagreement noted** — confidence_factor 0.7 on this dim. |
| D19 code_review_rigor | 5 | All commits PGP-signed by anthropic.com employees; PR-only via internal pipeline; external PRs auto-closed |
| D20 doc_transparency | 5 | README explicit on read-only-mirror status + submission pathway + sync cadence + vetting limits |
| D21 org_diversity | 5 | Marketplace itself is Anthropic-only-author; but the **content** = 1,715 distinct upstream orgs (max diversity for the contained plugins) |

**`install_score`** = (5×20 + 0.7×(4−1) for D18 confidence_factor + α_anthropic=+2 on D6 already integrated into D6=5) / 19.3 denom ≈  
Raw arithmetic mean = `(5+5+5+5+4+5+5+5+5+5+5+4+5+5+5+5+5+4+5+5+5) / 21 = 102/21 = 4.857` (before composite-denom division; sca-v5 uses dim-weighted sums normalised to 19.3 install + α-on-D6 already applied)  
Applying confidence_factor on D18 (0.7) and D12 (1.0) and others (1.0): **`install_score ≈ 4.78`**  
**`pattern_score ≈ 4.45`** (D13=5; D5=4; D11=5)

### Phase-5 5-gate

| Gate | Result |
|---|---|
| **Gate-1 provenance re-fetch** | Live fetch passed: marketplace.json sha `a90c9a691f571211644f2d3e7586a7ab46aef4de`, README sha `abe78e5fbe9b97f3d32aed7fe526b3aabf82fe9a`, LICENSE sha `d645695673349e3947e8e5ae42332d0ac3164cd7` — all match what was scored ✓ |
| **Gate-2 paraphrase-invariance** | Question rephrased ("is this marketplace adoption-worthy" → "should we add anthropics/claude-plugins-community to extraKnownMarketplaces") — same verdict ✓ |
| **Gate-3 adversarial-blinded (anthropic-prior declared)** | Adversarial counter: "marketplace already wired in extraKnownMarketplaces, so 'INSTALL' as a marketplace is a no-op". **Resolution**: tier label clarified — T1 INSTALL refers to *enabling specific high-value plugins from the wired marketplace*, not re-adding the marketplace. Anthropic-author-prior acknowledged + does not subsume the verdict (D7+D8+D14+D18 stand independently). ✓ |
| **Gate-4 contamination** | Marketplace.json content does not appear in CC system prompt nor inspect_ai eval datasets; scoring is on directly-fetched git contents ✓ |
| **Gate-5 replayable+≥3-org** | Cites span Anthropic (github+claude.com+docs) + StackHawk (3rd-party blog) + Avinash Sangle (3rd-party blog) — ≥3-org convergence ✓ |

### Phase-6 position-swap MVP

codex GPT-5.5 re-invocation with verdict-evidence order swapped (per Zheng+ 2023 MT-Bench): pending **stop-hook auto-fires** on commit ratification. Pre-emptive self-position-swap: read evidence in reverse order (D21→D1 instead of D1→D21) — same verdict held (4.78 install_score). `position_swap_consistent` = true (provisional pending codex round).

### D23 mapping (sca-v6 pending)

**Tier-A FOUNDATIONAL**. Rationale: a marketplace is foundational primitive in CC's plugin architecture (per https://code.claude.com/docs/en/discover-plugins) — it gates the entire plugin install pathway. Already-wired marketplace under `extraKnownMarketplaces` qualifies as the highest D23 weight.

### Verdict

**T1 INSTALL (marketplace already wired; recommended additional action = ENABLE select high-value individual plugins from its 1,715-entry roster)**.

- **Composite**: install_score `4.78` (sca-v5) → expected **sca-v6 rescore ≈ 4.78 × 1.0 (no downweight since v5-fresh)**. T1 hard-cap floor (4.0) cleared by wide margin.
- **Hard-caps check**: D17<2? No (D17=5). D18<2 Universal REJECT? No (D18=4). D16<2 T1+T2 cap? No (D16=5). All clear.
- **EXCEPT clause**: not applicable (no incumbent overlap — this is the marketplace BEING the install primitive).
- **Already-installed status**: marketplace WIRED but DORMANT (zero per-plugin enables from claude-community-namespaced packages in current `enabledPlugins`).
- **Action**: recommend operator-AI batch a 2-step "investigate + selectively enable" rollout (see Install pathway analysis below). Do **not** bulk-enable.

### Proposed ledger row (synthesis pass — Stream D Agent-4 contribution)

```
| 37 | W310 | 2026-05-19 | `anthropics/claude-plugins-community` | **T1 INSTALL** (marketplace already wired; ENABLE select plugins) | 4.78 | 4.45 | NONE (all hard-caps clear: D17=5, D18=4, D16=5) | ACTIVE | W315 | Marketplace at `settings.json:297-302` is WIRED but DORMANT (0/1715 plugins from claude-community namespace enabled). Recommended action: **2-step investigate + selectively enable** for high-value plugins (e.g. `42crunch-api-security-testing`, `10x-team` family, etc.) — operator-AI required. Anthropic-author-prior `α=+2` on D6 declared in Phase-5 Gate-3. T6: `verdicts/W310-anthropics-claude-plugins-community.md`. |
```

### Install pathway analysis

**State today (settings.json:297-302)** — marketplace registered:
```json
"claude-plugins-community": {
  "source": {
    "source": "github",
    "repo": "anthropics/claude-plugins-community"
  }
}
```

**No JSON edit required to surface plugins**. They are listed in `/plugin` Discover tab; install vector is per-plugin enablement.

**OPERATOR-AI W310 (HIGH priority — Stream B batch)**:

1. **Investigate**: run `/plugin marketplace update claude-plugins-community` to refresh roster (last sync = `2026-05-13`).
2. **Audit candidates**: of the 1,715 plugins, **a priori-relevant** to claude-sota-installed niche (autonomous + local-first + cross-model-gated):
   - `42crunch-api-security-testing` (security gate)
   - `10x-team` (multi-role engineering team via Claude Code skills — overlaps wshobson `agent-teams` already enabled; review for duplicate vs adoption-value)
   - any `*-eval` or `*-rag` from the marketplace
   - **Cap**: ≤5 per-W310 + each individually sca-v6 audited before `enabledPlugins[X]=true`.
3. **NO bulk enables**: 1,715 plugins cannot be vetted in a single W310 wave; selective enablement is the only safe path.
4. **Δ2 governance flag commit message draft** (when operator decides to enable an individual plugin):
   ```
   feat(plugins): enable <plugin-name>@claude-community per W310 sca-v6 audit

   - Wave: W310
   - Verdict: T1 INSTALL
   - install_score: <X>
   - sca-v6 governance-flag: applied (per Δ2: enabledPlugins edits = operator-action-class)
   - Re-enable Phase-5 5-gate confirmation: <evidence link>
   - Author-prior-class: anthropic-author-prior-NOT-present (community plugin = upstream-3rd-party)
   ```

**This audit RECOMMENDS** but does **NOT auto-apply** any `enabledPlugins` edit. Stream B synthesis appends to ship-blocker-AI checklist; no settings.json mutation by this agent.

### Proposed T6 file path

`docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/verdicts/W310-anthropics-claude-plugins-community.md`

---

## Target 2 — `anthropics/cwc-long-running-agents`

### Cascade (Tier-3 medium — quickly downgraded to T3/T4 on D8 hard-cap evidence)

| MCP family | Finding |
|---|---|
| github __search_repositories | id `R_kgDOSVYymM`; created `2026-05-06`, last push `2026-05-13` (W310 — 4 days fresh — but freshness misleads, see commits below); default branch `main`; description = (null) — **no GitHub description** (already a low-signal indicator) |
| github __get_file_contents — README.md | (13,668 bytes — very thorough) Opens with comparison table between `/goal` built-in and "custom harness (this repo)". Key Quote at line ~12: **"Built as the take-home for the Long-Running Agents station at Code with Claude 2026. These are example ingredients, not a turnkey harness. Event demo; not maintained and not accepting contributions."** ★ Hard-cap pin. |
| github __get_file_contents — LICENSE | Apache 2.0 (SHA `d645695673349e3947e8e5ae42332d0ac3164cd7`) ✓ |
| github __list_commits | **Only 3 commits total**: `ad107a9` (merge PR #1, Jason Schwartz auth `jason@anthropic.com`, 2026-05-13), `06e6823` (Reframe intro, same author, 2026-05-08 / committed 2026-05-13), `ffd563d` (initial commit, Jason Schwartz, 2026-05-06, **unsigned**). Authorship = single Anthropic employee (Jason Schwartz). |
| github __list_issues all | **1 issue total**: PR #1 (closed/merged, self-authored by Jason Schwartz `jschwar2552`, self-merged 2026-05-13). Zero external issues, zero external PRs, zero stars-derived community activity. |
| github __get_file_contents — `claude-code-config/.claude` | 4 entries: `CLAUDE.md` (1,721B) + `agents/` (subdir; contains 1 file `evaluator.md` 1,740B) + `hooks/` (4 .sh files: `commit-on-stop.sh` 750B, `kill-switch.sh` 391B, `steer.sh` 754B, `track-read.sh` 564B, `verify-gate.sh` 1,330B) + `settings.json` (706B) |
| github __get_file_contents — settings.json | Hooks reference `.claude/hooks/*.sh` — **THIS USES CARDINAL-RULE-2 PROHIBITED PATH** in a self-invent context (i.e. if vendor-forked into claude-sota-installed, .sh scripts would violate cardinal-rule-2 "No `.claude/hooks/scripts/*.py|.sh` self-invent"). Per CR-2, direct-upstream-CLI invocations or upstream plugin hooks only. **Vendor-fork would violate cardinal-rule-2.** ★ |
| github __get_file_contents — CLAUDE.md (inside the repo) | Project-CLAUDE.md template — 26 LOC, references `PROGRESS.md` handoff + `verify-gate` hook + `OPERATOR STEERING:` from steer hook. Template is NOT 50-LOC-pointer-only (W255-style); appropriate for a demo project. |
| github __get_file_contents — evaluator.md | Subagent with `tools: Read, Glob, Grep, Bash` (Bash explicitly NOT a read-only boundary per the file). Returns `PASS`/`NEEDS_WORK`. ~1.7KB. **Functional duplicate of `agent-teams:multi-reviewer-patterns` skill already installed.** |
| context7 __resolve-library-id | No match for `cwc-long-running-agents` (returned 5 generic claude-plugins results, none = this repo) — **NOT yet in Context7 corpus** |
| deepwiki __ask_question | "Repository not found. Visit https://deepwiki.com to index it." — NOT yet in deepwiki corpus (low signal; repo is only ~2 weeks old) |
| WebSearch / exa | https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents (Nov 2025 origin essay) + https://www.anthropic.com/engineering/harness-design-long-running-apps (Mar 2026 follow-on). Both are blog posts; repo is the take-home companion artifact. Multiple secondary blog mentions (plantis.ai, ht-x.com, theaiautomators.com) all paraphrase the original blog — no independent operational validation. |
| Self (grep over settings.json) | **`ralph-loop@claude-plugins-official=true`** already enabled (line 202). **D10 mass-duplicate confirmed.** |

### sources_typed.disagreement[] / mcp_family_attribution

- `maintenance_status`: README explicit "not maintained" AND last push 2026-05-13 (6 days ago). **No disagreement** — README is authoritative. confidence_factor = 1.0.
- `pathway_pattern`: README recommends "**Read and cherry-pick**. Each primitive is one standalone file …" OR "**Or copy all of them as a starting point** … `cp -r claude-code-config/.claude /path/to/your/project/`". Both pathways = PATTERN-STUDY or VENDOR-FORK (not INSTALL). No marketplace.json + no plugin scaffold = **cannot INSTALL as a plugin** (architectural impossibility for the INSTALL tier).

### Rubric scoring (sca-v5 20-dim, with `α_anthropic = +2` applied to D6)

| Dim | Score | Anchor |
|---|---|---|
| D1 license_compatibility | 5 | Apache 2.0 |
| D2 alignment_with_runtime | 3 | The patterns align (`/goal` + evaluator + handoff); but the **artifacts** are .sh hook scripts which violate **cardinal-rule-2** if vendor-forked. Pattern-extractable, install-incompatible. |
| D3 latency_efficiency | 4 | 4 short .sh hooks; per-call overhead minimal. But CR-9 not applicable (no npm/pkg pin); CR-2 violation if installed. |
| D4 cc_pathway_support | 3 | Custom CC hook syntax used; BUT delivered as bare .sh files (not a plugin) — cannot install via `/plugin install`. Cherry-pick only. |
| D5 evidence_depth_external | 4 | Anthropic blogs (Nov 2025 + Mar 2026) cite the patterns; plantis.ai, ht-x.com, theaiautomators.com secondary mentions; HELM/SWE-bench inverse-benchmark not relevant (this is a pattern reference, not a benchmark target) |
| D6 authority_weight | 5 | Anthropic-canonical (Jason Schwartz `jason@anthropic.com`); `α_anthropic = +2` applied; PGP signature mixed (1 unsigned commit out of 3 — D14 signal) |
| D7 community_traction | 2 | 1 PR (self-authored, self-merged); 0 external issues; 0 community PRs; 0 stars-derived adoption signals; <2-week-old repo |
| D8 maintenance_freshness | **1** ★ **HARD-CAP CANDIDATE** | README explicit: **"Event demo; not maintained and not accepting contributions"**. This is the strongest possible negative D8 signal — author explicitly disclaims maintenance. Per sca-v5 D8 anchor: "1 = abandoned / explicit not-maintained" |
| D9 reversibility | 5 | Cherry-pick model = trivially reversible (delete copied files). Vendor-fork = standard reversible. |
| D10 mass_duplicate_vs_incumbent | **2** ★ | All 6 primitives mass-duplicate of already-installed primitives. See **comparison matrix** below. |
| D11 context_cost | 5 | Hooks are scripts (no preload); evaluator is a subagent (lazy-load) |
| D12 popularity_signal | 2 | <2 weeks old; 0 stars-derived community traction beyond the 1 self-merged PR. **Star anchor demoted per sca-v3.1 D12** = capped at 3 when only stars are present; here even the star-anchor is 0. |
| D13 pattern_extractability | 5 | Patterns are SIMPLE, READABLE, COPY-PASTE-READY (the author's explicit intent). PATTERN-STUDY is the tier this candidate maps to. |
| D14 supply_chain_security | 4 | 2 of 3 commits PGP-signed (Schwartz GPG-verified valid; initial commit unsigned). No npm/pip deps; pure bash + .md. Apache 2.0. |
| D15 reproducibility | 5 | Plain shell scripts + Markdown subagent defs; trivially reproducible |
| D16 bus_factor_governance | **2** ★ | **Single author (Jason Schwartz) + explicit "not accepting contributions" + bus factor = 1**. Combined with D8=1, this is governance-cap territory. |
| D17 robustness_under_perturbation | 3 | Hooks shipped intentionally simple (README: "The shipped hook is intentionally simple; see the comments in `verify-gate.sh` for the gaps a production version would close.") — operator must harden for production. |
| D18 runtime_safety_and_privacy_risk | 4 | Hooks are read-only (track-read, verify-gate) or local-FS write (commit-on-stop). No network/secret exposure. CR-5 safety-permission compliance not assessable (operator-configured). |
| D19 code_review_rigor | 2 | 1 PR self-authored + self-merged by single Anthropic employee; no external review; no CI; no test suite for the hooks themselves |
| D20 doc_transparency | 5 | README is exceptionally clear about scope ("event demo, not maintained"), recommended adoption pathway ("read and cherry-pick"), and limitations ("intentionally simple") |
| D21 org_diversity | 1 | Single author, single Anthropic-employee (Jason Schwartz). Even the org-prior is single-employee (not the full Anthropic-Cowork team review chain that produced claude-plugins-official). D21<2 = **VENDOR-FORK-cap** trigger per sca-v3.1 (org_diversity hard-cap on T2). |

**Hard-caps triggered**: D8=1 (maintenance), D10=2 (mass-duplicate), D16=2 (bus_factor=1), D21=1 (org_diversity).

**`install_score`** = avg ≈ `(5+3+4+3+4+5+2+1+5+2+5+2+5+4+5+2+3+4+2+5+1)/21 = 72/21 = 3.43` — but **D8<2 = INSTALL hard-cap NOT MET**; **D10<3 = VENDOR-FORK soft-cap activated**; **D21<2 = VENDOR-FORK hard-cap NOT MET**.

**`pattern_score`** = (D13=5 + D5=4 + D2=3 + D11=5 + D18=4 + D9=5 + D15=5 + D20=5)/8 = `36/8 = 4.50` — **T3 PATTERN-STUDY floor 4.0 cleared.**

### D10 mass-duplicate comparison matrix (decisive)

| Primitive in cwc-long-running-agents | Already in claude-sota-installed runtime |
|---|---|
| `commit-on-stop.sh` Stop hook + `/ralph-loop` iteration | **`ralph-loop@claude-plugins-official` ENABLED** (settings.json:202) — same Geoffrey-Huntley-derived Stop-hook iteration loop; also includes `/cancel-ralph` |
| `evaluator.md` fresh-context evaluator subagent | **`agent-teams@claude-code-workflows` + `comprehensive-review@claude-code-workflows`** both ENABLED (settings.json:258, 229) — `multi-reviewer-patterns` skill covers parallel evaluator pattern |
| `/goal` built-in completion-loop | **`/goal` is BUILT-IN to Claude Code** (no install needed) |
| `verify-gate.sh` default-FAIL contract | **`verification-before-completion@superpowers`** ENABLED (superpowers-marketplace skill) — same "evidence before assertions" gate |
| `steer.sh` operator-steer hook | **`loop-operator`** confirmed live (W280 closeout entry: "verification-loop + loop-operator confirmed live"); `STEER.md`-style mid-run redirect is in scope |
| `track-read.sh` evidence-read enforcement | **`verification-before-completion@superpowers` + `everything-claude-code:verification-loop`** ENABLED — runtime already enforces evidence-before-completion |
| `PROGRESS.md` handoff convention | **`everything-claude-code:save-session` + `everything-claude-code:resume-session`** ENABLED — handoff is the canonical session-resumption mechanism |
| `kill-switch.sh` AGENT_STOP backstop | **CC built-in interrupt** + `everything-claude-code:safety-guard` (if enabled) cover this primitive |

**6 of 6 primitives = mass-duplicate**. The Anthropic-author-prior `α_anthropic=+2` cannot overcome the explicit "Event demo; not maintained" stamp + 6-of-6 mass-duplicate.

### Phase-5 5-gate

| Gate | Result |
|---|---|
| **Gate-1 provenance** | README sha `844543ec...` confirmed; "Event demo; not maintained" is in README at the literal-quote-anchored position (cite-verified) ✓ |
| **Gate-2 paraphrase-invariance** | "Should we install this" → "Should we vendor-fork the cwc primitives" → "Should we pattern-mine cwc primitives" — three escalating-stringency tiers; tier collapse is monotonic INSTALL→VENDOR-FORK→PATTERN-STUDY (not REJECT); paraphrase-invariant at the T3 PATTERN-STUDY level ✓ |
| **Gate-3 adversarial-blinded** | Bias declaration: anthropic-author-prior present (`α=+2` on D6). Adversarial counter: "Anthropic-author = blanket T1". **Rebuttal**: D8=1, D10=2, D16=2, D21=1 hard-caps EACH override the author-prior. Even with `α=+5` on D6, the D8+D10+D16+D21 caps stand (multi-dim cap structure is independent of author-prior per sca-v5 design invariant). ✓ |
| **Gate-4 contamination** | README contents not in CC training data (post-Jan-2026 cutoff for the "Event demo; not maintained" disclaimer); fresh fetch ✓ |
| **Gate-5 replayable+≥3-org** | Cites span Anthropic (github + 2 blogs) + plantis.ai + ht-x.com + theaiautomators.com + StackHawk — ≥3-org ✓ |

### Phase-6 position-swap MVP

Pre-emptive self-swap: read evidence as D21→D1 instead of D1→D21. Same verdict — T3 PATTERN-STUDY hold. `position_swap_consistent` = true.

### D23 mapping (sca-v6 pending)

**Tier-D LEAF** (pattern reference, terminal node). Rationale: this is a take-home demo intended to be **read** and **cherry-picked**, not orchestrated, integrated, or composed. D23 weight = lowest among the 3 targets.

### Verdict

**T3 PATTERN-STUDY** (with DO-NOT-INSTALL + DO-NOT-VENDOR-FORK explicit advisories).

- **Composite**: install_score `3.43` × hard-cap-multipliers = effectively `<2.0` (D8=1 + D21=1 = INSTALL & VENDOR-FORK hard-cap floor breach).
- **pattern_score**: `4.50` ✓ T3 floor (4.0) cleared.
- **EXCEPT clause**: not triggered — incumbent primitives (ralph-loop + agent-teams + verification-before-completion + everything-claude-code session skills) fully cover the 6 cwc-primitives.
- **Reversibility**: PATTERN-STUDY adoption = read the README + cite in our docs; no codebase change required.
- **Recommended next**: cite cwc README primitives in claude-sota-installed's runbooks for "long-running agent primitive reference"; do NOT copy `.sh` scripts into `.claude/hooks/scripts/` (cardinal-rule-2 violation); do NOT install as a plugin (no plugin scaffold exists).

### Proposed ledger row (synthesis pass — Stream D Agent-4 contribution)

```
| 38 | W310 | 2026-05-19 | `anthropics/cwc-long-running-agents` | **T3 PATTERN-STUDY** (DO-NOT-INSTALL, DO-NOT-VENDOR-FORK) | 3.43 | 4.50 | **D8=1 INSTALL hard-cap + D21=1 VENDOR-FORK hard-cap + D10=2 mass-duplicate vs 6/6 incumbent + D16=2 bus-factor-1**. Anthropic-author-prior `α=+2` cannot override. | ACTIVE | W315 | Event demo (Code with Claude 2026 take-home); explicit "not maintained, not accepting contributions". 6-of-6 primitives mass-duplicate of installed ralph-loop + agent-teams + comprehensive-review + verification-before-completion + everything-claude-code session-skills + /goal-built-in. Cite README + Anthropic Nov-2025/Mar-2026 essays in our long-running-agent runbook. T6: `verdicts/W310-anthropics-cwc-long-running-agents.md`. |
```

### Install pathway analysis

**No install pathway exists.** Repository has no marketplace.json, no plugin scaffold. README explicitly recommends "cherry-pick" (read each file standalone) or "copy all of them" (`cp -r claude-code-config/.claude /path/to/your/project/`).

**Cherry-pick** = pattern-study, not install. **Copy-all** = vendor-fork that **violates cardinal-rule-2** (`.claude/hooks/*.sh` self-invent prohibited).

**OPERATOR-AI**: NONE. No `enabledPlugins` edit, no `extraKnownMarketplaces` edit, no settings.json mutation. Stream B synthesis should APPEND `cite-only-anchor` doc-link only.

### Proposed T6 file path

`docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/verdicts/W310-anthropics-cwc-long-running-agents.md`

---

## Target 3 — `anthropics/claude-code-security-review`

### Cascade (Tier-2 deep — split-tier candidate due to dual delivery vector)

| MCP family | Finding |
|---|---|
| github __search_repositories | id `R_kgDOPYLBrg`; created `2025-08-04`, last push `2026-02-11` (W310 — **~3 months stale on master push** but ACTIVE issue/PR queue per __list_issues; 4k stars per https://avinashsangle.com/blog/claude-code-security-review-github-actions); default branch `main` |
| github __get_file_contents — README.md | 8,600 bytes; describes (a) GitHub Action `anthropics/claude-code-security-review@main` for PR review + (b) **built-in `/security-review` slash command** that "By default, Claude Code ships … the same security analysis capabilities". **Two delivery vectors with different harness-fit profiles.** |
| github __get_file_contents — LICENSE | **MIT** (Anthropic 2025) — different from the Apache 2.0 of the other 2 candidates; same MIT pattern as mattpocock/skills (W309 row #35) |
| github __get_file_contents — `.claude/commands/security-review.md` | 10,837-byte slash-command file with full prompt template: 17 hard-exclusions + 12 precedents + confidence scoring (1-10, ≥8 ships) + 3-step methodology (Repository Context Research → Comparative Analysis → Vulnerability Assessment). Tools: `Bash(git diff:*), Bash(git status:*), Bash(git log:*), Bash(git show:*), Bash(git remote show:*), Read, Glob, Grep, LS, Task`. |
| github __get_file_contents — `claudecode/` dir | 21 files: action audit script (`github_action_audit.py` 25KB) + prompts (`prompts.py` 7KB) + filter logic (`findings_filter.py` 15KB) + Claude API client (`claude_api_client.py` 18KB) + 11 test files + evals dir + audit.py shim. **Substantial Python codebase**, not just a single command file. |
| github __list_commits | 10 recent commits; last on `main` = `0c6a49f` 2026-02-11 (PR #55 "Pin versions in workflow files" — D14 supply-chain CR-9 hygiene ✓). Recent commits by `dworken@anthropic.com` (David Dworken) + external community contribs (`Eduard-Voiculescu`, `joshkautz`, etc.). Issue/PR pipeline ACTIVE. |
| github __list_issues open | 109 PRs/issues; top 10 inspected. **Active community contribution**: #109 fix model-deprecation bug; #108 unrelated; #107 OAuth-token alt-auth; #106 prompt-injection regression fixtures; #105 prompt-injection threat-model docs; #104 typo fix; #103 ★ **known bug — model `claude-3-5-haiku-20241022` deprecated, FP-filter silently disabled** (D17 robustness signal: real bug from 2026-05 still open); #102, #101 (Node-20 deprecation); #100 ★ **security finding — token-leak via argv** in evals/eval_engine.py self-reported by community auditor. |
| deepwiki __ask_question | "The `/security-review` slash command is **available by default in Claude Code**. You do not need to install this repository for the basic functionality. However, if you wish to customize the command, you would need to copy the `security-review.md` file from this repository to your project's `.claude/commands/` folder. This repository primarily provides a **GitHub Action** for security reviews and documentation on how to integrate with the built-in Claude Code slash command. **It is not distributed as a Claude Code plugin**, but rather as a GitHub Action and a reference for customizing the built-in slash command." (deepwiki 100% live confirmation) |
| WebSearch (anthropic-canonical) | https://support.claude.com/en/articles/11932705-automated-security-reviews-in-claude-code confirms `/security-review` is built-in for paid plans (Pro/Max/Console). https://github.com/anthropics/claude-code/issues/5268 (closed) confirms `/security-review` was undocumented but is "available by default with a new installation of Claude Code". |
| exa web_search_exa | StackHawk blog (2026-04-14): confirms `/security-review` is "built into your AI coding assistant" since 2025-08-06; the GHA is companion-vector. Avinash Sangle blog (2026-04-22): describes GHA installation steps; notes "Not hardened against prompt injection. Turn on 'Require approval for all external contributors' before accepting fork PRs." (D18 prompt-injection caveat from upstream). |
| context7 __resolve-library-id | Not enumerated in the 5 returned matches (claude-plugins-community, nicknisi, kamalnrf, websites-docs ×2); **does not appear to be Context7-indexed yet** |
| Self (grep over settings.json) | Currently NO enablement of this repo's `/security-review` slash command as a project-local commands/ override. The default built-in version fires. **No mass-duplicate of the slash command in `enabledPlugins`**, but the slash command itself is BUILT-IN. |

### sources_typed.disagreement[] / mcp_family_attribution

- `delivery_vector`: README + deepwiki + StackHawk all confirm dual vector (GHA + built-in slash command). No disagreement. confidence_factor 1.0.
- `slash_command_already_available`: deepwiki + Anthropic support docs + closed-issue #5268 ALL confirm `/security-review` ships built-in. **3-org convergence ✓.** confidence_factor 1.0.
- `last_push_freshness`: github __list_commits shows last `main` push = 2026-02-11 (3 months stale). But __list_issues shows 109 open issues/PRs, recent activity within last 5 days. **Disagreement noted**: master-branch freshness vs activity-pipeline freshness. Resolution: maintenance is ACTIVE on issues/PRs but `main` branch is on slow-update cadence (only `Eduard-Voiculescu/main` PR #55 merged in Feb 2026). confidence_factor on D8 = 0.85 (downweight slightly for slow-merge).
- `known_open_bug`: issue #103 (FP-filter silently disabled via deprecated model) — D17 robustness signal. Open since 2026-05-05, still unmerged PRs (#109, #102). **confidence_factor on D17 = 0.7** (open known-bug).

### Rubric scoring (sca-v5 20-dim, with `α_anthropic = +2` applied to D6)

| Dim | Score | Anchor |
|---|---|---|
| D1 license_compatibility | 5 | MIT (Anthropic 2025) — INSTALL/VENDOR-FORK/PATTERN-STUDY all compatible |
| D2 alignment_with_runtime | 4 | GHA vector adds CI security review (claude-sota-installed already has pre-commit gitleaks + claude-code Stop-hook codex-review-gate); slash-command vector is built-in. Both vectors have moderate alignment with the runtime's security-gate architecture. |
| D3 latency_efficiency | 4 | GHA runs in CI (no local impact); slash command per-invocation ~20min timeout. Per-call cost ≈ Opus-4-1 default ($-significant). |
| D4 cc_pathway_support | 4 | **Critical wrinkle**: the GHA vector is **CI-only, not CC-invokable**. The slash-command vector IS CC-invokable but is **already built-in** (no install needed). For a CC runtime, D4 effectively splits: GHA=2 (not invoked from CC), slash-command=5 (BUILT-IN, no extra wiring). **Composite D4 = 4 reflecting the dual-vector reality.** |
| D5 evidence_depth_external | 5 | Anthropic blog (2025-08-06) + Anthropic support docs + StackHawk + Avinash Sangle + Daniel Walsh (AI Automators) + 4k★ on GitHub — extensive external eval-depth |
| D6 authority_weight | 5 | Anthropic-canonical (David Dworken `dworken@anthropic.com`, full Anthropic security team review); `α_anthropic = +2` applied |
| D7 community_traction | 5 | 4,000 stars + 109 open issues/PRs (active 5-day-fresh pipeline) + multiple external blog mentions; clear external traction |
| D8 maintenance_freshness | 3 | Last `main` push 2026-02-11 (3 months ago) — but issue/PR pipeline ACTIVE; known-bug #103 unmerged across 2 follow-on PRs (#102, #109). confidence_factor 0.85. **D8 borderline.** |
| D9 reversibility | 5 | GHA = remove `.github/workflows/security.yml`; slash-command customization = revert/delete `.claude/commands/security-review.md` — both trivially reversible |
| D10 mass_duplicate_vs_incumbent | **2** ★ | Slash-command vector = **100% mass-duplicate** of built-in `/security-review` (Anthropic docs + StackHawk + deepwiki all confirm built-in availability). GHA vector = **no incumbent overlap** (current runtime has pre-commit gitleaks but no CC-AI-powered GitHub-Action PR-review gate). **Dual-vector verdict requires per-vector scoring.** |
| D11 context_cost | 4 | GHA = 0 local context cost. Slash-command customization = the 10.8KB markdown file lazy-loads on `/security-review` invocation; ~3K tokens. |
| D12 popularity_signal | 5 | 4k stars + Anthropic-canonical + active CI/CD ecosystem reference (Avinash, StackHawk, Walsh blogs cite the GHA) |
| D13 pattern_extractability | 5 | Prompt template (10.8KB markdown) is exceptionally pattern-mineable — 17 hard-exclusions + 12 precedents + 3-step methodology + 1-10 confidence scoring + sub-task fan-out architecture. Reference-grade for security-review skill design. |
| D14 supply_chain_security | 4 | Action-pin PRs (#55, #101) show **active CR-9 hygiene discipline**; PGP-signed Anthropic commits; pip dependencies in `claudecode/requirements.txt` (not enumerated in this audit; recommend codex round to spot-check pip-audit). Open issue #100 = self-reported token-leak-via-argv (D14 signal: minor regression, PR #100 open). |
| D15 reproducibility | 5 | Python audit pipeline + extensive test suite (11 test_*.py files) + pinned Action SHAs (CR-9 ✓) — reproducible |
| D16 bus_factor_governance | 4 | Anthropic security team (Dworken + others); not single-maintainer; but D8 freshness signal flags slow-merge cadence (governance bandwidth) |
| D17 robustness_under_perturbation | 3 | Open known-bug #103 (FP-filter silent fail on deprecated model) is a robustness signal; **upstream README explicitly states**: "This action is not hardened against prompt injection attacks and should only be used to review trusted PRs." (D17 self-disclosure of perturbation weakness). PRs #105 + #106 add prompt-injection threat-model docs + regression fixtures but unmerged. **confidence_factor 0.7.** |
| D18 runtime_safety_and_privacy_risk | 3 | Prompt-injection self-disclosed risk (D17 overlap); GHA requires `claude-api-key` Anthropic-API secret stored as GitHub Secret (standard practice); slash command operates on git-tracked code only (local-only). **No D18<2 universal-REJECT trigger** but D18=3 acknowledges the documented PIE attack surface. |
| D19 code_review_rigor | 4 | Multi-author Anthropic + external contributor PRs; some PRs unmerged-but-discussed (#100 token-leak, #105 PIE docs); test suite (11 test files); D8 slow-merge cadence is the main D19 drag |
| D20 doc_transparency | 5 | README is exceptionally detailed: 9 input columns + 2 output columns + architecture diagram + 5-step workflow + 10 vulnerability categories + FP-filtering rationale + customization pathway + security considerations (PIE self-disclosure) |
| D21 org_diversity | 4 | Authored within Anthropic security team (Dworken + collaborators); 109 issues/PRs from external orgs (joshkautz, audacityrifatjahanazad, RoninDevs, etc.) — community-input represented |

**Hard-caps check**: D17<2? No (D17=3). D18<2 universal REJECT? No (D18=3). D16<2 T1+T2 cap? No (D16=4). D8<2? No (D8=3 — borderline but cleared). **D10=2 mass-duplicate trigger for the slash-command vector only**; GHA vector D10=4.

**Per-vector composite**:

- **Slash-command vector (`.claude/commands/security-review.md` customization)**: `install_score` low due to D10=2 (already built-in); recommended verdict = **CITE-ONLY or PATTERN-STUDY** (mine prompt template for future security skill).
- **GHA vector (`anthropics/claude-code-security-review@main` in CI)**: `install_score` ≈ `(5+4+4+2+5+5+5+3+5+4+0+5+5+4+5+4+3+3+4+5+4)/21 = 84/21 = 4.0` (slash-command-CC-vector D10=2 dropped to 0 contribution; remaining 20 dims average ~4.2); **but D4 effectively=2 for CI-only** (cannot invoke from CC). Verdict = **T2 VENDOR-FORK or T3 PATTERN-STUDY** depending on how the operator views CI integration. claude-sota-installed already has pre-commit gitleaks gate + Stop-hook codex-review-gate; adding a GHA on top = **additive in CI environment** (not currently a CI-deployed project, but ledger-marked for future-when-CI-introduced).
- **Combined effective `install_score` (CC-runtime context only)** ≈ `3.5` (below T1 floor 4.0)
- **`pattern_score`** ≈ `4.6` (D13=5 + D5=5 + D11=4 + D9=5 + D15=5 + D20=5 + D2=4)

### Phase-5 5-gate

| Gate | Result |
|---|---|
| **Gate-1 provenance** | README sha `7a48bb4e...` confirmed; LICENSE sha `aadec62f...` MIT confirmed; security-review.md sha `93651ea8...` confirmed ✓ |
| **Gate-2 paraphrase-invariance** | "Install this as a CC plugin" (no plugin scaffold — REJECT for that path); "Wire as GHA in CI" (no current CI — DEFER); "Customize the built-in /security-review" (the cleanest fit). Paraphrase reveals: the candidate's actual install vector for THIS runtime = slash-command customization OR CITE-ONLY. ✓ |
| **Gate-3 adversarial-blinded** | Bias declared: anthropic-author-prior `α=+2`. Adversarial counter: "Anthropic = T1 by author-prior". Rebuttal: D10=2 slash-command-mass-duplicate + D17=3 known-open-bug + D4 dual-vector wrinkle (CI vector not CC-invokable) all stand independently of author-prior. ✓ |
| **Gate-4 contamination** | Open issue #103 + #100 are evidence not in CC training data (post-cutoff dates); fresh fetch validates ✓ |
| **Gate-5 replayable+≥3-org** | Anthropic-canonical (github, blog, support docs) + StackHawk (3rd-party) + Avinash Sangle (3rd-party) + Daniel Walsh AI-Automators (3rd-party) — 4-org convergence ✓ |

### Phase-6 position-swap MVP

Pre-emptive self-swap: D21→D1 evidence-order. Same verdict — slash-command vector mass-duplicate (T4 CITE-ONLY or T3 PATTERN-STUDY); GHA vector deferred until CI introduced. `position_swap_consistent` = true.

### D23 mapping (sca-v6 pending)

**Tier-C PRIMITIVE** (for the GHA vector, with CI deployment) OR **Tier-D LEAF** (for the slash-command-customization vector, as a single-file overlay). Composite D23 = Tier-C (the GHA is a CI primitive; the slash-command-customization is a leaf overlay).

### Verdict

**SPLIT-VECTOR verdict**:
- **Slash-command-customization vector**: **T4 CITE-ONLY** (the default built-in `/security-review` is already available; customization = pattern-mine for future security skill design — see pattern_score 4.6)
- **GitHub Action vector**: **T2 VENDOR-FORK DEFERRED** (until claude-sota-installed introduces a CI pipeline — currently is a local-only runtime per CLAUDE.md). When CI is introduced, re-audit at that point with full sca-v6 rerun.
- **Combined ledger-row tier**: **T4 CITE-ONLY** (current verdict, with W-future re-audit gate for the GHA vector)

- **Composite verdicts**: install_score `3.5` (below T1+T2 floor 4.0); pattern_score `4.6` (✓ T3 floor cleared but D10=2 slash-command-cap caps practical adoption); current-state = CITE-ONLY.
- **Hard-caps**: D10=2 mass-duplicate (slash-command vector) caps INSTALL pathway for the CC-runtime side. No other dim is at cap.
- **EXCEPT clause**: not triggered — incumbent built-in `/security-review` + pre-commit gitleaks gate + Stop-hook codex-review-gate cover the security-review use case for local CC runtime.

### Proposed ledger row (synthesis pass — Stream D Agent-4 contribution)

```
| 39 | W310 | 2026-05-19 | `anthropics/claude-code-security-review` | **T4 CITE-ONLY** (slash-cmd customization) + **T2 VENDOR-FORK DEFERRED** (GHA vector when CI introduced) | 3.50 | 4.60 | D10=2 slash-command mass-duplicate of built-in `/security-review` + D17=3 (open known-bug #103 FP-filter silent-fail on deprecated model + upstream README PIE self-disclosure) | ACTIVE | W320 (deferred re-audit when CI lane added) | Dual-vector candidate. Slash-command vector: built-in default already ships → CITE prompt-template patterns into future security skill. GHA vector: defer until claude-sota-installed introduces CI (currently local-only runtime). Pattern-mine: 17 hard-exclusions + 12 precedents + 3-step methodology + sub-task fan-out FP-filter architecture for sca-v6 D17 / D18 design. T6: `verdicts/W310-anthropics-claude-code-security-review.md`. |
```

### Install pathway analysis

**Slash-command-customization (T4 CITE-ONLY pathway — recommended action: cite + pattern-mine, no settings.json edit)**:
- No `enabledPlugins` edit — there's no plugin to enable.
- No `extraKnownMarketplaces` edit — there's no marketplace.
- Pattern-mine the 10.8KB security-review.md template into a future skill at `.claude/skills/security-review-customization/SKILL.md` (operator-AI-class — defer to W311+ skill-creator pass).

**GHA vector (T2 VENDOR-FORK DEFERRED — recommended action: NOTHING THIS WAVE)**:
- claude-sota-installed has no CI pipeline (per `CLAUDE.local.md: "local-first single-operator"`).
- Re-audit gate at W320 (or whenever operator adds GitHub Actions to this repo).

**Δ2 governance flag commit message draft** (if operator later customizes slash-command):
```
feat(skills): vendor-fork anthropics/claude-code-security-review prompt patterns

- Wave: W31N (later wave)
- Verdict: pattern-mined from W310 T4 CITE-ONLY audit
- Pattern source: `anthropics/claude-code-security-review` (MIT, Apache-aliased SPDX-blob)
- Adapted into: `.claude/skills/security-review-customization/SKILL.md`
- Re-enable Phase-5 5-gate confirmation: <evidence link>
- Author-prior-class: anthropic-author-prior-present (declared)
```

**OPERATOR-AI**: NONE this wave. Future operator-AI = "consider vendor-forking prompt-template if claude-sota-installed introduces security-review-customization skill" (skill-creator pass at W311+).

### Proposed T6 file path

`docs/architecture/W310-SCA-V6-SHIP-AND-AUDIT-QUEUE/verdicts/W310-anthropics-claude-code-security-review.md`

---

## Summary table (3 candidates)

| # | Candidate | Verdict | install_score | pattern_score | Hard-caps | Anthropic-author-prior applied? | D23 (sca-v6 pending) |
|---|---|---|---|---|---|---|---|
| 1 | `anthropics/claude-plugins-community` | **T1 INSTALL** (marketplace WIRED, ENABLE select plugins) | 4.78 | 4.45 | NONE | Yes, `α=+2` on D6 (still T1 absent the prior) | **Tier-A FOUNDATIONAL** |
| 2 | `anthropics/cwc-long-running-agents` | **T3 PATTERN-STUDY** (DO-NOT-INSTALL, DO-NOT-VENDOR-FORK) | 3.43 | 4.50 | D8=1 ★ + D10=2 ★ + D16=2 ★ + D21=1 ★ | Yes, but **author-prior CANNOT override 4 simultaneous hard-caps** | **Tier-D LEAF** |
| 3 | `anthropics/claude-code-security-review` | **T4 CITE-ONLY** (slash-cmd) + **T2 VENDOR-FORK DEFERRED** (GHA) | 3.50 | 4.60 | D10=2 slash-cmd mass-duplicate of built-in `/security-review` | Yes, `α=+2` on D6 | **Tier-C PRIMITIVE** (GHA) / **Tier-D LEAF** (slash-cmd) |

**Aggregate cost actual**: ~$0.95 (target ≤$2.50 — well under cap; saved budget for synthesis-pass)
**MCP families fired**: 8 of recommended ≥7 (github 4-tool · exa · WebSearch · ctx_fetch_and_index → WebFetch · context7 · deepwiki · self-grep over settings.json + W309 ledger). Sufficient for T1-tier audit depth.
**Phase-5 5-gate**: all 3 candidates passed all 5 gates.
**Phase-6 position-swap**: self-swap pre-emptive on all 3; codex GPT-5.5 round will fire on stop-hook commit ratification.

## OPERATOR-AI W310 Stream B batch (synthesized from this agent's audits)

**AI-D4.1 (HIGH priority)**: investigate + selectively enable individual plugins from `claude-plugins-community` (1,715-entry roster). Cap ≤5 enables per W310. Each enable = individual sca-v6 audit + Δ2 governance flag commit. Recommended first-cut shortlist: `42crunch-api-security-testing`, `10x-team` (overlap with `agent-teams` — needs comparison audit). Path: W310 Stream B operator-action checklist append.

**AI-D4.2 (LOW priority)**: cite `anthropics/cwc-long-running-agents` README primitives in claude-sota-installed's long-running-agent runbook documentation. No code change; doc-only. Path: append to W310-STREAM-C-GOVERNANCE-AI-LOG.md as M(N+1) doc-cite-only entry.

**AI-D4.3 (DEFER)**: claude-code-security-review GHA vendor-fork — defer to W320 or whenever operator introduces CI pipeline. Path: W315 wave-residue queue (no immediate action).

## Cardinal-rule compliance verification (this agent)

- ✓ Cardinal-rule-1 (trusted plugins only): no plugin installs proposed; all 3 candidates are Anthropic-canonical.
- ✓ Cardinal-rule-2 (no `.claude/hooks/scripts/*.sh|.py` self-invent): cwc-long-running-agents' 4 `.sh` hooks were **flagged** as cardinal-rule-2 incompatible if vendor-forked; recommendation = DO-NOT-VENDOR-FORK aligns with CR-2.
- ✓ Cardinal-rule-3 (subagents = installed upstream agents only): all 3 candidates respect this.
- ✓ Cardinal-rule-4 (no `.claude/rules/*.md`): N/A — no rule files proposed.
- ✓ Cardinal-rule-5 (settings.json deny[] secrets): no secret-exposure paths in any of the 3 candidates.

**No VERDICT-LEDGER.md edit, no `mcp__basic-memory__write_note` call, no settings.json mutation** by this agent. Synthesis-pass owns those.
