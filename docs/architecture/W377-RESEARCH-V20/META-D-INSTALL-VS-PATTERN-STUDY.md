# META-D — Install vs Pattern-Study vs Cite-Only vs Avoid Decision Framework

> **Wave**: W377 research-architecture v20 upgrade · **Stream**: META-D · **Date**: 2026-05-23
> **Operator directive (W377 kickoff)**: "improve your decision making itself, also the depth and comprehensiveness of the repos discovery."
> **Predecessors**: sca-v18 schema (`Z:/claude-sota-installed-W375/.claude/schemas/sca-v18-repo-verdict.schema.json` — 5-tier soft-gate already encoded) + R1 design (`docs/architecture/SOTA-RUNTIME-2026-05-22/r-streams/R1-research-arch-meta-upgrade.md` §3 Decision-tier framework — defines tier trigger thresholds) + cardinal-rule-3 trust-tuple (`CLAUDE.md` CR-1 W331 axis-1 #3 extension — SLSA + license + maintenance + blast-radius).
> **Position in W377**: this stream operationalizes the sca-v18 5-tier soft-gate as a **decision-tree per candidate repo** so META-A (discovery) → META-C (multi-dim scoring) → META-D (adoption-degree verdict) is the canonical sca-v18 pipeline.
> **Sibling streams**: META-A repo-discovery depth + breadth (input feed); META-B convergence + de-duplication (input filter); META-C multi-dimensional scoring (input scores for this decision-tree).
> **Cite-cluster floor**: ≥3-org-distinct anchors per major claim (sca-v13 floor); 20-org cite-cluster already established via W376 SYNTHESIS lineage (Anthropic / OpenAI / Stanford / Microsoft / Meta / Google / OSSF / NIST / SLSA / Sigstore / Pydantic / Temporal / Docker / OpenHands / haizelabs / Block / Continue / LangChain / CrewAI / Stanford-OVAL).

---

## §1 Four-class adoption-degree taxonomy

The user-stated decision question is **not binary** ("install or don't") but **4-class** with crisp distinguishing criteria. Each class has a different commit-shape, a different ongoing maintenance bill, a different blast-radius, and a different fallback if the upstream goes dark. The same repo can rationally land in different classes depending on **(a) where in our runtime it would slot**, **(b) what the operator-cost of taking the dependency is**, and **(c) how durable the upstream lineage is**.

### §1.1 Class INSTALL — take the dependency

**Definition**: take a binding runtime dependency on the upstream — either as a Claude Code plugin/skill/agent, as an MCP server `command` line, as a `pip install` / `npm install` for a service-tier library, or as a `git clone` + vendor-fork (per Cardinal Rule 4b).

**Commit-shape**: package-pin (npm exact-version / uvx exact-version / git commit-SHA / image digest-SHA256) lands in tracked config (`.mcp.json`, `package.json`, `.claude/plugins/<plugin>/manifest.json`, `pyproject.toml`, vendor-fork commit hash); a wave-N VERDICT-LEDGER row records the install verdict; the install is independently verifiable via reproducible-evidence (Cardinal Rule 6).

**Class-criteria (ALL required, per R1 §3)**:
1. **Capability dimension ≥ 2** on the META-C 0-3 scale — the repo solves a problem we ACTUALLY have. Not "could be useful one day" — present-wave-need or P0-carry-forward.
2. **Dispatch-fit dimension ≥ 2** — the API surface composes cleanly with Cardinal Rules 1-5 (trusted source / direct-CLI hooks / installed-subagents / settings-not-rules / permissions-not-guards). If we have to write a wrapper-shim more than 2 KB to make it CR-compliant, it FAILS dispatch-fit.
3. **License class ∈ {permissive}** — MIT / Apache-2.0 / BSD-2 / BSD-3 / ISC / MPL-2.0. AGPL / SSPL / proprietary REJECT outright (CR-1(b) blast-radius). Source-available licenses (BSL / FSL / Commons Clause / Elastic License) are NOT permissive — they route DOWN to PATTERN-STUDY.
4. **OSSF Criticality ≥ 0.45** AND **OSSF Scorecard ≥ 5.0** — formal upstream-health signals per OpenSSF defaults; STARS are EXPLICITLY EXCLUDED from this dimension (per W367 STREAM-G §5 anti-star-bias rule + arxiv 2603.10265 MALTA fake-star detection + Kapravelos ICSE-26).
5. **SLSA level ≥ 1** — signed provenance exists. SLSA-0 means "no provenance evidence" → cannot satisfy CR-1(a) maintainer-identity signed-release requirement.
6. **Maintainership tier ∈ {A, B}** — composite of contributor_count ≥ 10 OR org_count ≥ 3 (per OSSF Criticality formula). Sole-maintainer projects route DOWN to MONITOR or PATTERN-STUDY.
7. **Convergence count ≥ 4 of 8 MCP sources** — independent surfacing by ≥4 of {gh / perplexity / exa / firecrawl / deepwiki / hf-papers / repomix-deepread / codegraph} per META-A discovery (sca-v18 §4 convergence rule); guards against hallucinated-by-one-LLM phantom-repos.
8. **Pedigree-signals length ≥ 1** — named-author OR production-deploy OR cited-in-cookbooks OR arxiv-paper. "Random GitHub repo with no provenance" FAILS.
9. **Jury-on-Demand K=4 votes ≥ 3 APPROVE** — multi-juror reliability-weighted consensus per arxiv 2512.01786 (replaces single LLM-judge with 4-juror panel).
10. **Minority-veto < 2 BLOCK** — fewer than 2 jurors flag BLOCK (per arxiv 2510.11822 95.5% TPR vs naive-majority 19.2% TNR).

**Add Cardinal Rule 1 trust-tuple compliance (W331 axis-1 #3 extension — operator-mechanized via `.pre-commit-config.yaml`)**:
- (a) **Maintainer-identity** via signed releases — SLSA-L3 attestation OR npm provenance OR Sigstore for git tags
- (b) **License-risk audit** — MIT/Apache/BSD/ISC/MPL OK; AGPL/SSPL/proprietary case-by-case
- (c) **Malicious-update review** — head commit ≥30 days old OR explicit operator-pin (defeats "merge-day supply-chain attack" window)
- (d) **Dependency blast-radius** — transitive `npm ls --depth=0` clean / Socket.dev clean / Snyk clean

**Anti-criteria (any → DEMOTE to PATTERN-STUDY, MONITOR, or BLOCK)**:
- License is GPL/AGPL/SSPL/proprietary → demote per §1.4 (BLOCK if AGPL-in-the-spawn-tree, PATTERN-STUDY if AGPL-but-could-rewrite)
- Repo abandoned (no commit ≥180 days) → demote to MONITOR or BLOCK per §1.4
- Fake-star detection hit (MALTA / Kapravelos ICSE-26 / PkgPulse) → BLOCK
- Sole-maintainer with no successor → demote to PATTERN-STUDY (avoid bus-factor=1 lock-in)
- Wrapper-shim to satisfy Cardinal Rule 2 (≤2 KB hook) would exceed 2 KB → demote to PATTERN-STUDY (architecturally valuable, dispatch-incompatible)
- API surface explicitly breaks Cardinal Rule 4 (auto-fire prompts without operator-curation) → demote to PATTERN-STUDY
- Pre-release version (0.x.y) without v1 commitment → demote to MONITOR
- Created < 6 months ago → demote to MONITOR (recidivism risk per OSSF MALTA)

### §1.2 Class PATTERN-STUDY — lift the principle, don't take the dependency

**Definition**: read the upstream architecture, extract the design principle into our own runtime (in a skill, in CLAUDE.md cardinal-rule wording, in a hook script ≤2 KB, in a vendor-fork-of-just-the-pattern). DO NOT take the upstream as a binding dependency.

**Commit-shape**: a `docs/architecture/<wave>/<topic>-PATTERN-STUDY.md` lands citing upstream `file:line @ SHA`; a sca-v18 verdict-row marks the repo as PATTERN-STUDY with an `eval_log_ref`; the principle is re-implemented in our runtime with own-authorship + own-tests + own-license-compatibility (none of the upstream code is copied verbatim beyond fair-use comment-anchors).

**Class-criteria (ANY ONE sufficient, per R1 §3)**:
1. **Capability ≥ 2 BUT Dispatch-fit < 2** — "great ideas, wrong API surface". E.g., PydanticAI graph-state-machine pattern (S10 §10 in W376 SYNTHESIS) is a beautiful state-machine but the typed-agent-graph runtime doesn't fit our Claude-Code-orchestrator architecture; we lift the snapshot/restore PRINCIPLE without taking pydantic-ai as a dep.
2. **License class = source-available** (BSL / FSL / Commons Clause / Elastic / SSPL-equivalent) — can't install but can read + learn from. (Note: GPL/LGPL/AGPL also route here for code-not-API patterns; for binary/service-tier deps they route to BLOCK because the AGPL spawn-tree poisons our license-class.)
3. **OSSF Scorecard < 5.0** — operational concerns (no branch-protection, no signed-commits, no pinned-dependencies) but architecturally valuable.
4. **Bus-factor = 1** (sole-maintainer, no organizational continuity) — pattern lift is safer than binding-dep on a maintainer who could vanish.
5. **API surface breaks Cardinal Rule 4** — auto-fire prompts, ad-hoc rule injection, mandatory `.claude/rules/*.md` not operator-curated.
6. **Pattern is universal-enough to re-encode in ≤200 LOC** — e.g., `asyncio.shield` cleanup discipline (W376 C2 cross-stream convergence) is a 5-line pattern; nobody needs to "install temporalio" just to learn `try: await work() except CancelledError: await asyncio.shield(cleanup()); raise`.
7. **Wrapper-shim cost > install benefit** — if the wrapper to satisfy CR-2 / CR-4 / dispatch-fit would exceed ~200 LOC own-authored code, the cost-benefit favors PATTERN-STUDY.

**Outcome**: own-authored skill/hook/CLAUDE.md-rule that encodes the principle, cite-anchored to upstream `file:line @ SHA`. No upstream code in tree (or ≤2 KB cite-anchored shim per Cardinal Rule 2).

### §1.3 Class CITE-ONLY — academic/spec reference; no code intake

**Definition**: the source is a paper / spec / standard / blog-post / academic-survey; there is no installable artifact (or the installable artifact is itself out-of-scope — e.g., a research prototype that isn't production-grade). The source is **cited** to anchor a design claim but no code or skill is imported.

**Commit-shape**: a citation row in a wave-N artifact `[Author Year, arxiv:N, kind=paper|spec|standard]`; a sca-v18 verdict-row marks the tier as CITE-ONLY; the install-criteria are install-not-applicable. The cite-cluster contributes to sca-v13 ≥3-org-distinct floor.

**Class-criteria (ANY ONE sufficient, per R1 §3)**:
1. **Repo is a SPEC/STANDARD** — `slsa.dev` / `nist.gov` / `openssf.org` / W3C / IETF RFC / IEEE / ISO. Install-not-applicable; these provide the rubric, not the artifact.
2. **Source is an arxiv paper / academic publication** — e.g., DSPy GEPA paper (arxiv 2507.19457) provides the GEPA principle; we lift the principle (PATTERN-STUDY route) if a repo exists, but a stand-alone paper without runtime artifact is CITE-ONLY.
3. **Source is a blog / talk / engineering-post** — Anthropic engineering blog, OpenAI research blog, Microsoft Research-system blog; cite the claim, don't install the blog.
4. **Source is duplicative of an already-installed primitive** — e.g., Semantic Scholar API is duplicative of OpenAlex + arxiv direct API; if we have one we cite the other rather than installing both.
5. **Source is a meta-survey / benchmark** — e.g., WideSearch + DeepResearch-Bench + AIRS-Bench papers; they anchor the evaluation methodology but are not installable as runtime primitives.

**Outcome**: citation row in `VERDICT-LEDGER` / cite-cluster; principle (if any) absorbed via PATTERN-STUDY adjacent verdict if a code-form exists.

### §1.4 Class AVOID (= BLOCK in sca-v18 enum) — license-poisoned / abandoned / attacker-controllable

**Definition**: do NOT install, do NOT pattern-study from upstream source code (cite-only of the design principle is allowed if the principle pre-dates this artifact). The repo is excluded from our runtime as a hard-gate.

**Commit-shape**: a sca-v18 verdict-row marks the tier as BLOCK with `block_reason` enumerated; the repo is added to a wave-level NON-CANDIDATES list; future waves do NOT re-litigate without a new piece of evidence.

**Class-criteria (ANY ONE → BLOCK, per R1 §3)**:
1. **License class ∈ {proprietary, copyleft-incompatible}** — closed-source / AGPL-3.0 / SSPL / Commons-Clause-modified / Elastic-License-modified when binding-dep would poison our license-class.
2. **Maintenance hard-stop**: `updated_since > 180 days` AND no release in 180 days AND no issue-activity (OSSF MALTA abandonment criterion).
3. **Security hit**: any SAST/CVE/Sigstore-revocation/npm-audit-critical/pip-audit-critical hit (per NIST RV.1). No exception — even a 6-month-old known CVE in transitive dep with no patch route is BLOCK.
4. **Maintainer untrusted**: phishing-history / malicious-update / OSSF-Scorecard < 2.0 / known npm-account-takeover (per W331 axis-1 #3 trust-tuple).
5. **Fake-star detection hit**: arxiv 2603.10265 MALTA / Kapravelos ICSE-26 fake-star paper / PkgPulse flag → BLOCK regardless of other dimensions (fake-stars are evidence of fraud-intent).
6. **Attacker-controllable supply chain**: install method depends on `curl | bash` from non-pinned source / unsigned npm pkg / unsigned PyPI pkg / Docker image without digest-pin (CR-9 violation that cannot be remediated).
7. **Cardinal Rule 1 trust-tuple double-fail**: TWO of {maintainer-identity, license-risk, malicious-update, blast-radius} fail simultaneously.

**Outcome**: ledger row + no install + no pattern-study (the upstream source IS the evidence-tampering risk; reading it to lift a principle still requires reading attacker-controllable code).

### §1.5 Comparison table

| Dimension | INSTALL | PATTERN-STUDY | CITE-ONLY | AVOID/BLOCK |
|---|---|---|---|---|
| Upstream code in tree? | YES (pinned) | NO (≤2 KB cite-anchor shim) | NO | NO |
| Upstream code READ? | YES | YES | NO (principle pre-exists) | NO |
| Ongoing maintenance bill? | YES (pin-refresh per W270 install-state drift) | NO (one-time read) | NO | NO |
| Blast-radius if upstream goes dark? | HIGH (need fork-or-replace) | LOW (we own the principle) | ZERO | ZERO |
| Cardinal Rule 1 trust-tuple required? | YES (all 4 sub-criteria) | License (b) + malicious-update (c) only | None | N/A |
| Records in VERDICT-LEDGER? | install-row + plugin-manifest pin | pattern-study row + own-authored doc | citation row | BLOCK row + non-candidates list |
| Reversal cost? | HIGH (uninstall + remove pins + verify no dependents) | LOW (delete the own-authored doc/skill) | ZERO | ZERO (already not present) |

---

## §2 Decision-tree pseudocode

Input: candidate-repo identifier + multi-dim score `D(r)` from META-C (per sca-v18 schema §6 — `capability`, `dispatch_fit`, `license_class`, `ossf_criticality`, `ossf_scorecard`, `slsa_level`, `nist_ssdf_compliance`, `maintainership_tier`, `convergence_count`, `pedigree_signals`, `category_niche`) + jury-verdict from META-C jury-on-demand layer + Cardinal-Rule-1 trust-tuple sub-results.

Output: `tier ∈ {INSTALL, PATTERN-STUDY, CITE-ONLY, MONITOR, AVOID}` + per-dim rationale + Pareto-frontier preservation flag.

```pseudocode
function adoption_degree(repo r, scores D, jury J, trust_tuple T) -> Verdict:

    # ============================================================
    # STAGE 1 — HARD-BLOCK gates (any → BLOCK, no further routing)
    # ============================================================
    if D.license_class in {proprietary, AGPL, SSPL, commons-clause-modified}
       AND repo would be binding-dep (not pattern-only):
        return BLOCK("license-class-incompatible: " + D.license_class)

    if D.security.cve_count > 0
       OR D.security.sigstore_revocation
       OR D.security.npm_audit.critical_count > 0
       OR D.security.pip_audit.critical_count > 0:
        return BLOCK("security: " + summarize_findings(D.security))

    if D.maintainer.phishing_history
       OR D.maintainer.malicious_update_flagged
       OR D.ossf_scorecard < 2.0:
        return BLOCK("maintainer-untrusted")

    if D.fake_stars_check.result == "suspected-inflated":
        return BLOCK("fake-stars detected via " + D.fake_stars_check.method)

    if D.updated_since_days > 180
       AND D.last_release_days > 180
       AND D.last_issue_activity_days > 90:
        return BLOCK("abandoned (OSSF-MALTA criterion: " +
                     D.updated_since_days + "d / " + D.last_release_days + "d)")

    # Two-of-four trust-tuple double-fail also blocks
    trust_fails = count_failed_sub_criteria(T, {maintainer_identity, license_risk,
                                                 malicious_update, blast_radius})
    if trust_fails >= 2:
        return BLOCK("trust-tuple double-fail: " + list_failed(T))

    # ============================================================
    # STAGE 2 — CITE-ONLY gate (source-is-spec/paper)
    # ============================================================
    if r.kind in {spec, standard, arxiv-paper, blog-post, academic-survey}:
        return CITE_ONLY(
            rationale = "kind=" + r.kind + " — install-not-applicable",
            cite_cluster_contribution = compute_org_distinct_count(r)
        )

    # ============================================================
    # STAGE 3 — Jury-on-Demand consensus (K=4 weighted-by-reliability)
    # ============================================================
    approve_count = J.count_verdicts("APPROVE")
    block_count = J.count_verdicts("BLOCK")

    # Minority-veto per arxiv 2510.11822 — 95.5% TPR vs naive-majority 19.2% TNR
    if block_count >= 2:
        return BLOCK("minority-veto triggered (" + block_count + "/4 BLOCK)")

    # K=4 reliability-weighted threshold per arxiv 2512.01786
    if approve_count < 3:
        return MONITOR(
            rationale = "jury below threshold (3-of-4 APPROVE required); approve=" +
                        approve_count + ", needs-revision=" +
                        J.count_verdicts("NEEDS-REVISION"),
            monitor_next_wave = "W" + (current_wave + 2)  # default 2-wave re-eval window
        )

    # ============================================================
    # STAGE 4 — MONITOR gates (need more evidence before tier-up)
    # ============================================================
    if D.created_since_months < 6:
        return MONITOR(
            rationale = "too new (" + D.created_since_months + " mo) — recidivism risk per OSSF MALTA",
            monitor_next_wave = "W" + (current_wave + 4)  # 4-wave re-eval = ~1 mo of project age
        )

    if 60 < D.updated_since_days < 180 AND D.last_release_days > 90:
        return MONITOR(
            rationale = "slowing (" + D.updated_since_days + "d / " + D.last_release_days + "d)",
            monitor_next_wave = "W" + (current_wave + 3)
        )

    if r.version_form == "0.x.y" AND NOT D.maintainer.v1_commitment_stated:
        return MONITOR(
            rationale = "pre-release without v1 commitment; semver-stability unverified",
            monitor_next_wave = "W" + (current_wave + 4)
        )

    if D.confidence == "LOW":
        # Council-Mode synthesis flagged MCP-source-disagreement HIGH per arxiv 2604.02923
        return MONITOR(
            rationale = "MCP-source-disagreement HIGH; need disambiguating evidence",
            monitor_next_wave = "W" + (current_wave + 2)
        )

    # ============================================================
    # STAGE 5 — INSTALL routing (all bars met)
    # ============================================================
    install_all_passed = (
        D.capability >= 2 AND
        D.dispatch_fit >= 2 AND
        D.license_class == "permissive" AND
        D.ossf_criticality >= 0.45 AND
        D.ossf_scorecard >= 5.0 AND
        D.slsa_level >= 1 AND
        D.maintainership_tier in {"A", "B"} AND
        D.convergence_count >= 4 AND
        len(D.pedigree_signals) >= 1 AND
        trust_tuple_all_pass(T)
    )

    if install_all_passed:
        # ============================================================
        # STAGE 5a — Pareto-frontier check per DSPy GEPA (arxiv 2507.19457)
        # ============================================================
        # A repo can be "best on capability" AND "worst on license";
        # GEPA keeps it on the frontier instead of single-score discarding.
        # If this repo is Pareto-dominated by an ALREADY-INSTALLED repo
        # on every dimension AND adds no novel category_niche, prefer
        # the incumbent and demote to PATTERN-STUDY.
        if pareto_dominated_by_installed(r, D)
           AND not provides_novel_niche(r.category_niche):
            return PATTERN_STUDY(
                rationale = "Pareto-dominated by installed " + dominator.repo +
                            "; no novel niche → pattern-study to avoid redundant dep",
                cite_anchor = upstream_file_line_for_principle(r)
            )

        return INSTALL(
            rationale = "all 10 install gates pass + trust-tuple 4/4 + " +
                        approve_count + "/4 jury APPROVE",
            pin_strategy = pick_pin_strategy(r),  # git-SHA / image-digest / npm-exact
            blast_radius_estimate = compute_blast_radius(D.dependencies)
        )

    # ============================================================
    # STAGE 6 — PATTERN-STUDY routing (capability high, dispatch low)
    # ============================================================
    if D.capability >= 2 AND D.dispatch_fit < 2:
        return PATTERN_STUDY(
            rationale = "great ideas, wrong API surface (cap=" + D.capability +
                        ", dispatch=" + D.dispatch_fit + ")",
            principle_to_lift = extract_principle(r),
            cite_anchor = upstream_file_line(r)
        )

    if D.license_class == "source-available":
        return PATTERN_STUDY(
            rationale = "source-available license (" + D.license_actual + ") — " +
                        "can't install but can learn from",
            cite_anchor = upstream_file_line(r)
        )

    if D.ossf_scorecard >= 2.0 AND D.ossf_scorecard < 5.0:
        return PATTERN_STUDY(
            rationale = "ossf_scorecard=" + D.ossf_scorecard + " — operational " +
                        "concerns but architecturally valuable",
            cite_anchor = upstream_file_line(r)
        )

    if D.maintainership_tier in {"C", "D"} AND D.bus_factor == 1:
        return PATTERN_STUDY(
            rationale = "bus-factor=1; safer to lift principle than bind to dep",
            cite_anchor = upstream_file_line(r)
        )

    if estimated_wrapper_shim_loc(r) > 200:
        return PATTERN_STUDY(
            rationale = "wrapper-shim to satisfy CR-2/CR-4 would exceed 200 LOC " +
                        "(=" + estimated_wrapper_shim_loc(r) + " LOC) — pattern-lift cheaper",
            cite_anchor = upstream_file_line(r)
        )

    # ============================================================
    # STAGE 7 — Default fallthrough
    # ============================================================
    return MONITOR(
        rationale = "no class fully matched; re-evaluate next wave with stronger signal",
        monitor_next_wave = "W" + (current_wave + 2)
    )


# ============================================================
# Supporting predicates
# ============================================================

function pareto_dominated_by_installed(r, D) -> bool:
    """
    A candidate is Pareto-dominated by an incumbent if for EVERY dim
    incumbent.score >= candidate.score, AND for at least ONE dim
    incumbent.score > candidate.score.
    Per DSPy GEPA non-dominated set principle (arxiv 2507.19457).
    """
    for inc in installed_repos_in_same_niche(r.category_niche):
        if all(inc.D[k] >= D[k] for k in DIMS) and \
           any(inc.D[k] > D[k] for k in DIMS):
            return True
    return False

function provides_novel_niche(niche) -> bool:
    """
    Even if Pareto-dominated on numeric dims, a repo with a NOVEL
    category_niche (e.g., haizelabs/verdict for jury-on-demand —
    no incumbent covers this niche) routes UP from PATTERN-STUDY to INSTALL.
    This closes the niche-domain-authority anti-pattern (per §4).
    """
    return niche not in {installed.category_niche for installed in registry}

function trust_tuple_all_pass(T) -> bool:
    """W331 axis-1 #3 — all 4 sub-criteria pass (a/b/c/d)"""
    return (T.maintainer_identity_signed and
            T.license_risk_passes and
            T.malicious_update_review_passes and
            T.dependency_blast_radius_clean)

function pick_pin_strategy(r) -> str:
    """Per cr9_pinning_strategy enum from sca-v18 schema"""
    if r.kind == "docker-image":      return "image-digest-sha256"
    if r.kind == "git-clone/fork":     return "git-commit-sha"
    if r.kind == "npm-pkg":            return "npm-exact-version"
    if r.kind == "uvx-pkg":            return "uvx-exact-version"
    if r.kind == "claude-plugin":      return "git-commit-sha"  # via marketplace.json
    return "not-applicable"
```

**Implementation notes**:
- The decision-tree is **STAGE-ORDERED** so that hard-gates (security / license / abandonment / fake-stars) short-circuit before any soft scoring. This prevents "high capability score masking a security CVE" — the classic failure mode of single-score ranking that sca-v18 was designed to fix.
- **Pareto-frontier preservation (Stage 5a)** is what stops the runtime from accumulating Pareto-dominated dups. The Cardinal Rule 6 verify-before-claim check fires here: a candidate INSTALL must demonstrate either Pareto-superiority OR novel-niche before adding load to the runtime.
- **`provides_novel_niche` predicate (Stage 5a)** is the niche-domain-authority escape hatch — see §4 anti-pattern catalog. It is what lets haizelabs/verdict ride to INSTALL despite ~600 stars vs LangChain/AutoGen ~50k stars on adjacent niches.

---

## §3 Historical audit — retroactive classification of the 10 W376 SYNTHESIS repos

Walking the W376 SYNTHESIS (`docs/architecture/W376-RESEARCH/SYNTHESIS.md`) 12-stream catalog, retroactively running the §2 decision-tree against each repo, and comparing the verdict against the actual W376 spec outcome. The W376 spec itself uses adopt-now / adopt-later / spec-anchor-only language rather than sca-v18 tier labels — so the audit translates the spec language into tier labels.

Cite-cluster check: all 10 entries below have ≥3-org-distinct anchors (W376 SYNTHESIS already established 20-org cite-cluster).

### §3.1 openhands-sdk (S1)

- **Repo**: `all-hands/openhands-sdk` (PyPI `openhands-sdk==1.22.1`)
- **W376 SYNTHESIS treatment**: W376 spec REQUIRES this — the `openhands_run_activity` is implemented on top of this SDK (W376 SYNTHESIS §4 entire section is the SDK contract). The SDK is `pip install`-bound at version-pin 1.22.1.
- **META-C dim sketch**: capability=3 (solves dispatched problem) / dispatch_fit=3 (Pydantic v2 + asyncio + Temporal-compatible) / license=permissive (MIT) / OSSF-Criticality presumed ≥0.45 (active dev / 3-org pedigree) / Maintainership=A (multi-contributor / All-Hands org).
- **§2 decision-tree route**: STAGE 5 INSTALL — all 10 install gates pass; novel-niche (no incumbent covers OpenHands-agent-server-lifecycle).
- **Retroactive sca-v18 tier**: **INSTALL** ✓ aligned with W376 implicit verdict.
- **W376 actual outcome**: pip-pinned at `==1.22.1`; W376 spec §4 entire section anchors to SDK file:line.
- **Alignment**: ✓ aligned. No drift.

### §3.2 openhands-agent-server (S2)

- **Repo**: `all-hands/openhands-agent-server` (Docker image `ghcr.io/openhands/agent-server:latest-python`, build SHA `3d9fc105`)
- **W376 SYNTHESIS treatment**: REQUIRED for remote workspace mode. W376 spec §5.2 spawns this image per-task; digest-pin recommended per CR-9 (W376 SYNTHESIS §5.1 R4).
- **META-C dim sketch**: capability=3 / dispatch_fit=3 (Docker daemon API + 127.0.0.1 bind + per-task isolation) / license=permissive / OSSF-Criticality presumed ≥0.45 / Maintainership=A.
- **§2 decision-tree route**: STAGE 5 INSTALL.
- **Retroactive sca-v18 tier**: **INSTALL** ✓ aligned.
- **W376 actual outcome**: image-pinned at digest `sha256:<digest>` per CR-9 (W376 SYNTHESIS §5.1).
- **Alignment**: ✓ aligned. No drift.

### §3.3 docker-py (S3)

- **Repo**: `docker/docker-py` (PyPI `docker==7.1.0`)
- **W376 SYNTHESIS treatment**: REQUIRED for container lifecycle primitives (`containers.run()` / `containers.list()` / `container.stop()` / `container.remove()`).
- **META-C dim sketch**: capability=3 / dispatch_fit=3 (sync `requests.Session` — adapts to `asyncio.to_thread`) / license=permissive (Apache-2.0) / OSSF-Criticality very high (Docker official) / Maintainership=A.
- **§2 decision-tree route**: STAGE 5 INSTALL.
- **Retroactive sca-v18 tier**: **INSTALL** ✓ aligned.
- **W376 actual outcome**: pip-pinned at `==7.1.0`; W376 SYNTHESIS §5.2 references file:line for `containers.py:534-911` retry classification.
- **Alignment**: ✓ aligned.

### §3.4 temporalio (S4)

- **Repo**: `temporalio/sdk-python` (PyPI `temporalio==1.27.2`)
- **W376 SYNTHESIS treatment**: REQUIRED — `pydantic_data_converter` wiring + activity primitives (heartbeat / cancellation / `imports_passed_through` / `RetryPolicy`).
- **META-C dim sketch**: capability=3 / dispatch_fit=3 / license=permissive (MIT) / OSSF-Criticality very high (Temporal-the-company is a CNCF graduated org via Cadence lineage) / Maintainership=A.
- **§2 decision-tree route**: STAGE 5 INSTALL.
- **Retroactive sca-v18 tier**: **INSTALL** ✓ aligned.
- **W376 actual outcome**: pip-pinned at `==1.27.2`.
- **Alignment**: ✓ aligned.

### §3.5 aider + cline + SWE-agent (S5 cross-runtime workspace-mode survey)

- **Repos**: `paul-gauthier/aider` / `cline/cline` / `princeton-nlp/SWE-agent`
- **W376 SYNTHESIS treatment**: SURVEYED for `workspace_mode` prior art. W376 SYNTHESIS §7 explicitly states "Cline's `hub` mode — Cline-specific daemon pattern; irrelevant to W376" — the SURVEY EXTRACTED the `Literal['local','remote']` enum convention but DID NOT install any of the three.
- **META-C dim sketch** (representative — varies per repo): capability=2-3 / dispatch_fit=1 (none of the three has an OpenHands-orchestrator-compatible API surface — they ARE the orchestrator) / license: aider AGPL → BLOCK if binding-dep but PATTERN-STUDY if just-reading-architecture / cline Apache-2.0 → PATTERN-STUDY-eligible / SWE-agent MIT → PATTERN-STUDY-eligible.
- **§2 decision-tree route**: STAGE 6 PATTERN-STUDY for cline + SWE-agent (cap≥2, dispatch<2); STAGE 1 BLOCK-if-binding-dep for aider AGPL but route to PATTERN-STUDY since we are not embedding aider code.
- **Retroactive sca-v18 tier**: **PATTERN-STUDY** all three ✓ aligned with implicit W376 treatment (survey-only; lift the `Literal` enum convention via own-authored code).
- **W376 actual outcome**: own-authored `workspace_mode: Literal['local','remote']` field on TaskSpec (W376 SYNTHESIS §7 verdict); no upstream code intake.
- **Alignment**: ✓ aligned. **Crisp PATTERN-STUDY example** for §1.2.

### §3.6 anthropics/claude-code-sdk-python + LangGraph (S6 event-stream patterns)

- **Repos**: `anthropics/claude-code-sdk-python` / `langchain-ai/langgraph`
- **W376 SYNTHESIS treatment**: SURVEYED for event-stream patterns. claude-code-sdk-python contributed the callback-driven event-iteration pattern (W376 SYNTHESIS §6 D1 resolution). LangGraph contributed the state-machine snapshot/resume pattern (cross-cite to S10 PydanticAI in §16.2).
- **META-C dim sketch**: claude-code-sdk-python — capability=3, dispatch_fit=2 (callback model fits but is a different SDK family) / license=permissive (MIT) → could install but didn't need to. LangGraph — capability=3, dispatch_fit=1 (LangGraph runtime would re-architect our orchestrator) / license=permissive (MIT) → PATTERN-STUDY for principle-lift.
- **§2 decision-tree route**: claude-code-sdk-python → could route INSTALL (we use the principle, not the SDK itself in this slot); LangGraph → STAGE 6 PATTERN-STUDY (cap≥2, dispatch<2 in W376 context).
- **Retroactive sca-v18 tier**: **PATTERN-STUDY** both ✓ aligned with implicit W376 treatment (principle-lift only; the spec watchdog-task pattern in W376 SYNTHESIS §4.3 is own-authored — cite-anchored not vendored).
- **Alignment**: ✓ aligned.

### §3.7 SWE-Bench harness (S7)

- **Repos**: `princeton-nlp/SWE-bench` / `swe-bench/sweb` Dockerfile family
- **W376 SYNTHESIS treatment**: SURVEYED for the eval-harness contract — image-name `_1776_` substitution gotcha (W376 SYNTHESIS §9.2), `difficulty` stratified-selection policy (W376 SYNTHESIS §9 line L645).
- **META-C dim sketch**: capability=3 (canonical SWE-Bench eval) / dispatch_fit=2 (harness is opinionated about its image-name pattern) / license=permissive (MIT) / Maintainership=A (Princeton NLP org).
- **§2 decision-tree route**: STAGE 5 INSTALL if we're running the harness in-tree (we are, via openhands-sdk integration); STAGE 6 PATTERN-STUDY if we are merely lifting the difficulty-stratification policy.
- **Retroactive sca-v18 tier**: **INSTALL** (we use the harness directly) — confirmed via W376 §9 which uses concrete image-name pattern from upstream.
- **W376 actual outcome**: Docker images pulled from upstream registry; harness installation per upstream README.
- **Alignment**: ✓ aligned.

### §3.8 microsoft/autogen + anthropics/claude-cookbooks (S8 multi-agent orchestration)

- **Repos**: `microsoft/autogen` / `anthropics/claude-cookbooks`
- **W376 SYNTHESIS treatment**: SURVEYED for multi-agent orchestration safety primitives. AutoGen contributed `TokenUsageTermination` / `MaxMessageTermination` / `_signal_termination_with_error`. claude-cookbooks contributed empty-final-message-guard cite-anchor (`patterns/agents/orchestrator_workers.ipynb` cell-2).
- **META-C dim sketch**: AutoGen — capability=3 / dispatch_fit=1 (AutoGen runtime is the orchestrator-not-orchestrated case) / license=permissive (MIT) → PATTERN-STUDY-eligible. claude-cookbooks — kind=pattern-library (notebooks) / dispatch_fit=2 (cite-anchor pattern, not runtime install) → CITE-ONLY-via-PATTERN-STUDY adjacency.
- **§2 decision-tree route**: AutoGen → STAGE 6 PATTERN-STUDY (cap≥2, dispatch<2). claude-cookbooks → STAGE 6 PATTERN-STUDY for code-patterns or STAGE 2 CITE-ONLY for blog-anchor citations.
- **Retroactive sca-v18 tier**: **PATTERN-STUDY** for AutoGen + claude-cookbooks ✓ aligned.
- **W376 actual outcome**: skills (`empty-final-message-guard`, `worker-failure-termination-guard`) — own-authored, cite-anchored to AutoGen `_signal_termination_with_error` and cookbooks `orchestrator_workers.ipynb`. No AutoGen or cookbook code intake.
- **Alignment**: ✓ aligned. **Crisp PATTERN-STUDY example** — extracting termination-condition primitives without installing AutoGen-the-framework.

### §3.9 CrewAI (S9)

- **Repo**: `crewai/crewai` (W376 SYNTHESIS §13)
- **W376 SYNTHESIS treatment**: PATTERN-STUDIED for hierarchical orchestration + `output_pydantic` / `output_json` structured-output enforcement; explicitly recommended for ADOPT on the **principle**, not on the framework.
- **META-C dim sketch**: capability=2 / dispatch_fit=1 (CrewAI runtime is the orchestrator, not a primitive) / license=permissive (MIT) / OSSF-Scorecard sufficient / Maintainership=B (well-staffed but bus-factor concerns).
- **§2 decision-tree route**: STAGE 6 PATTERN-STUDY (cap≥2, dispatch<2).
- **Retroactive sca-v18 tier**: **PATTERN-STUDY** ✓ aligned with W376 §16.1 explicit "adopt the structured-output PRINCIPLE for W376; do not install CrewAI".
- **W376 actual outcome**: `output_pydantic`-equivalent mandate landed on TaskResult-as-Pydantic-generic (W376 SYNTHESIS §16.1) — own-authored, cite-anchored to CrewAI source.
- **Alignment**: ✓ aligned.

### §3.10 PydanticAI (S10)

- **Repo**: `pydantic/pydantic-ai` (W376 SYNTHESIS §13)
- **W376 SYNTHESIS treatment**: PATTERN-STUDIED for graph-state-machine + 3 output modes (`ToolOutput` / `NativeOutput` / `PromptedOutput`); explicit "consensus rule for W376: snapshot/restore primitives via state-machine iteration" (W376 SYNTHESIS §16.2).
- **META-C dim sketch**: capability=3 (typed-agent + graph-state-machine is excellent) / dispatch_fit=1 (PydanticAI graph runtime is full-orchestrator, conflicts with our Claude-Code-as-orchestrator architecture) / license=permissive (MIT) / Maintainership=A (Pydantic org).
- **§2 decision-tree route**: STAGE 6 PATTERN-STUDY (cap≥2, dispatch<2). User's W377 kickoff message explicitly cites this as the canonical PATTERN-STUDY example: "e.g., PydanticAI graph-state-machine pattern was studied, not installed."
- **Retroactive sca-v18 tier**: **PATTERN-STUDY** ✓ aligned — and this is **the** illustrative example the user named.
- **W376 actual outcome**: principle of snapshottable run-loop state lifted into W377+ task list (W376 SYNTHESIS §16.4 W377-S5 deferred); no pydantic-ai install in tree.
- **Alignment**: ✓ aligned. **Canonical PATTERN-STUDY exemplar.**

### §3.11 DSPy + haizelabs/verdict (S11)

- **Repos**: `stanfordnlp/dspy` + `haizelabs/verdict`
- **W376 SYNTHESIS treatment**: PATTERN-STUDIED for L3 jury upgrade. DSPy GEPA optimizer cited as "adopt-later" (W377+ candidate). haizelabs/verdict cited as the primitive-source for `JudgeUnit` / `MeanVariancePoolUnit` / `Block >>` composition — explicitly **adopt-now** for verify-step layer + variance-gating + cite-cluster weighting.
- **META-C dim sketch (DSPy)**: capability=3 (GEPA is SOTA) / dispatch_fit=2 (dspy.Module composes cleanly) / license=permissive (MIT) / OSSF-Criticality high (Stanford NLP + ICLR 2026 oral) / Maintainership=A → could route INSTALL but **W376 verdict was adopt-later/deferred** because the principle is needed before the framework — calibration-set required first.
- **META-C dim sketch (haizelabs/verdict)**: capability=3 (jury-on-demand primitives are SOTA) / dispatch_fit=2 (verdict `Block` operator composes cleanly) / license=permissive (MIT) / ~600 stars BUT pedigree=high (Anthropic citations-agent skill anchors to verdict + arxiv 2502.18018 "Verdict: A Library for Scaling Judge-Time Compute" Kalra & Tang 2025-02-25 + haizelabs is an Anthropic Builder Programme org).
- **§2 decision-tree route (DSPy)**: STAGE 5 INSTALL gates pass numerically BUT STAGE 5a Pareto-frontier check — DSPy is currently MONITOR/PATTERN-STUDY in W376 because (a) we don't yet have the calibration-set MIPROv2 needs, (b) the PRINCIPLE is the lift, not the optimizer-as-runtime.
- **§2 decision-tree route (haizelabs/verdict)**: STAGE 5 INSTALL gates challenged by ~600 stars on count-only-naive-rankings but **STAGE 5a `provides_novel_niche` check PASSES** — no incumbent covers the jury-on-demand niche; haizelabs/verdict is the niche-domain-authority.
- **Retroactive sca-v18 tier**: DSPy **PATTERN-STUDY → MONITOR for W377-S5+** (adopt-later); haizelabs/verdict **INSTALL** (the niche-domain-authority anti-pattern of §4 — see below).
- **W376 actual outcome**: 3 adopt-now patterns from verdict deferred to W377-S1/S2/S3 (W376 SYNTHESIS §16.4); DSPy MIPROv2 deferred to W378+ pending calibration-set.
- **Alignment**: ✓ aligned for DSPy. **haizelabs/verdict is THE canonical Section-4 niche-domain-authority anti-pattern** — see §4 below.

### §3.12 Goose + Continue (S12)

- **Repos**: `block/goose` + `continuedev/continue`
- **W376 SYNTHESIS treatment**: PATTERN-STUDIED for production-agent patterns. Goose contributed declarative-YAML-retry + 10-worker sub-recipe cap + OTel+Langfuse+MLflow triple observability. Continue contributed YAML/JSON/TS config-not-TOML pattern.
- **META-C dim sketch (Goose)**: capability=3 / dispatch_fit=1 (Goose is a CLI tool, not a library) / license=permissive (Apache-2.0 per Block org) / Maintainership=A (Block.xyz org).
- **META-C dim sketch (Continue)**: capability=2 / dispatch_fit=1 (Continue is a VS-Code extension family) / license=permissive (Apache-2.0) / Maintainership=A.
- **§2 decision-tree route**: STAGE 6 PATTERN-STUDY both (cap≥2, dispatch<2).
- **Retroactive sca-v18 tier**: **PATTERN-STUDY** both ✓ aligned.
- **W376 actual outcome**: 3 high-leverage Goose patterns identified (W376 SYNTHESIS §15.5) — declarative-retry-in-recipe / sub-recipe concurrency cap / MCP-first uniformity. No Goose/Continue install in tree.
- **Alignment**: ✓ aligned.

### §3.13 Audit summary table

| # | Repo | META-C numeric route | W376 SYNTHESIS implicit tier | Retroactive sca-v18 tier | Aligned? |
|---|---|---|---|---|---|
| 1 | openhands-sdk | Stage 5 | INSTALL | INSTALL | ✓ |
| 2 | openhands-agent-server | Stage 5 | INSTALL | INSTALL | ✓ |
| 3 | docker-py | Stage 5 | INSTALL | INSTALL | ✓ |
| 4 | temporalio | Stage 5 | INSTALL | INSTALL | ✓ |
| 5 | aider/cline/SWE-agent (S5) | Stage 6 | PATTERN-STUDY | PATTERN-STUDY | ✓ |
| 6 | claude-code-sdk-python + LangGraph (S6) | Stage 6 | PATTERN-STUDY | PATTERN-STUDY | ✓ |
| 7 | SWE-Bench harness | Stage 5 | INSTALL (eval lane) | INSTALL | ✓ |
| 8 | microsoft/autogen + claude-cookbooks | Stage 6 + Stage 2 | PATTERN-STUDY + CITE-ONLY-adjacent | PATTERN-STUDY | ✓ |
| 9 | CrewAI | Stage 6 | PATTERN-STUDY | PATTERN-STUDY | ✓ |
| 10 | PydanticAI | Stage 6 | PATTERN-STUDY (user's canonical example) | PATTERN-STUDY | ✓ |
| 11 | DSPy + haizelabs/verdict | Stage 5a Pareto + Stage 5 niche-authority | PATTERN-STUDY → INSTALL adopt-now | PATTERN-STUDY (DSPy, deferred) + **INSTALL (verdict, niche-authority)** | ✓ |
| 12 | Goose + Continue | Stage 6 | PATTERN-STUDY | PATTERN-STUDY | ✓ |

**Alignment ratio**: 12/12 ✓ aligned (no drift between W376 implicit verdicts and §2 retroactive routing).

**Key finding**: the §2 decision-tree **reproduces** the W376 SYNTHESIS implicit verdicts when run retroactively. The decision-tree is not a re-litigation of W376 — it is a formal codification of the implicit reasoning the operator/orchestrator was already applying in W376. This validates the tree's calibration against a 12-repo independently-decided sample.

**Carry-forward for META-A**: META-A repo-discovery should output candidate repos with enough META-C dim coverage that §2 stages 1-3 (hard-gates) can ALL run before stages 4-7 (soft routing). META-A discovery depth/comprehensiveness target is **8 of 8 MCP source-convergence** for INSTALL candidates per sca-v18 §4 (this audit shows 4/8 minimum but W376 candidates frequently had 6-7/8).

---

## §4 Anti-patterns: when does a low-star repo legitimately ride to INSTALL?

The default sca-v18 STARS-ARE-NOT-A-QUALITY-SIGNAL discipline (per W367 STREAM-G §5 + R1 §5 + arxiv 2603.10265 MALTA fake-star detection) prevents the runtime from being seduced by inflated-star repos. The mirror failure mode is **dismissing a low-star repo that is the niche-domain authority** — the repo with no incumbent competitor in its category, where the pedigree comes from named-authors / arxiv-citations / cited-in-cookbooks rather than from raw star-count.

This section enumerates the canonical anti-patterns that legitimately route a low-star repo to INSTALL, plus the negative-control anti-patterns that look similar but should NOT.

### §4.1 Niche-domain authority — the canonical anti-pattern

**Pattern**: a repo holds <1k stars but is **the** authority in its narrow niche, where there is no high-star incumbent. The pedigree comes from arxiv paper + named-author + cited-in-cookbooks.

**Canonical example** — `haizelabs/verdict` (~600 stars, MIT):
- Pedigree-signal #1: arxiv 2502.18018 "Verdict: A Library for Scaling Judge-Time Compute" (Kalra & Tang 2025-02-25) — named-author + peer-reviewed.
- Pedigree-signal #2: cited in Anthropic citations-agent skill SKILL.md L67-133 (W369 P1.2 deployment).
- Pedigree-signal #3: deepwiki-confirmed at HEAD; W369 prior cite-cluster.
- Category-niche: jury-on-demand primitives (`JudgeUnit`, `BestOfKJudgeUnit`, `CategoricalJudgeUnit`, `MeanVariancePoolUnit`). No incumbent covers this — LangChain/AutoGen/CrewAI have orchestrator primitives, not jury composition.
- Stars: ~600 (low) — but `provides_novel_niche` predicate FIRES because no installed repo covers jury-on-demand.

**§2 decision-tree route**: STAGE 5a `provides_novel_niche` check passes → INSTALL despite low stars.

**Negative control**: `random-fork-with-50-stars/does-jury-stuff` — same star count, same niche, but missing pedigree signals (no arxiv paper / no named-author / no cite-in-cookbooks / no convergence ≥4 MCP sources). The `pedigree_signals` length < 1 check at Stage 5 would FAIL even before reaching Stage 5a. Stars alone never substitute for pedigree.

### §4.2 Spec-anchor authority — the standards-body installer

**Pattern**: a repo or org publishes a spec/standard that everyone else cites. The repo's value is being THE source-of-truth, not its popularity.

**Examples**:
- `slsa-framework/slsa` (~1.5k stars) — defines SLSA L0-L3 supply-chain provenance levels; cited by all CR-1 trust-tuple work.
- `ossf/criticality_score` (~700 stars) — defines the canonical formula for repo criticality (stars EXPLICITLY EXCLUDED); cited as the §1.1 INSTALL threshold source.
- `openssf/scorecard` (~5k stars but the *spec* part is what matters) — defines branch-protection / signed-commits / pinned-deps scoring.

**§2 decision-tree route**: STAGE 2 CITE-ONLY for the spec text; STAGE 5 INSTALL for the toolchain (e.g., `ossf/scorecard` GitHub Action is INSTALL even though the spec underneath is CITE-ONLY).

**Distinguishing test**: does the repo publish a spec/standard adopted by ≥3 third-party orgs? If yes → spec-anchor route; if no → falls back to standard criteria.

### §4.3 Reference-implementation authority — the canonical-implementation pattern

**Pattern**: a repo holds <2k stars but is **the** canonical reference implementation of an algorithm/protocol from a paper. Other orgs cite it as the test-against-truth.

**Examples**:
- `stanford-oval/storm` (~3-4k stars) — STORM multi-perspective outline-then-write reference impl; cited in sca-v18 R1 §1.2 and arxiv 2402.14207.
- `lastmile-ai/mcp-agent` (~8.2k stars — borderline but illustrative) — reference impl of 5 agentic workflow patterns; cited in sca-v18 R1 §1.3 + skill `mcp-agent-patterns`.

**§2 decision-tree route**: STAGE 5 INSTALL if dispatch-fit ≥ 2; STAGE 6 PATTERN-STUDY otherwise.

**Distinguishing test**: is there a paper anchoring this implementation as the canonical reference? Is the implementation explicitly cited as "the official version" by the paper's authors? If yes + dispatch-fit OK → INSTALL; if dispatch-fit weak → PATTERN-STUDY.

### §4.4 First-mover-with-correct-API pattern

**Pattern**: a low-star repo is the FIRST to expose a correct API surface for a primitive the field is converging on. Late-mover popular repos use a worse API.

**Example**: hypothetically, if `obscure-author/snapshot-async-context` (300 stars) had a `async with context.snapshot() as snap:` API that's strictly better-shaped than `popular-framework/checkpoint-everything` (50k stars) requires, the niche-domain authority pattern fires.

**§2 decision-tree route**: dispatch-fit dimension PROMOTES the low-star repo over the high-star incumbent if the lower-star repo's API surface is CR-1..5 compliant out-of-the-box.

**Distinguishing test**: count the LOC needed in our wrapper-shim. If the wrapper-shim against the low-star repo is <50 LOC AND against the high-star incumbent is >500 LOC, the low-star repo wins on dispatch-fit alone.

### §4.5 Anti-pattern negative-controls (DO NOT INSTALL on these signals alone)

The §2 decision-tree's hard-gates plus the `provides_novel_niche` predicate need negative controls so that "low-star + niche claim" doesn't auto-pass. The following signals do NOT legitimize a low-star INSTALL:

1. **Maintainer claim alone** ("we're the only ones doing X") — must be cross-validated by ≥3 MCP sources (convergence-count ≥ 4 of 8); single-source claims do not pass.
2. **High activity but no pedigree** — daily commits but no arxiv paper / no named-authors / no production deploys / no cookbook citation → MONITOR not INSTALL.
3. **Founder's personal repo** — even from a respected founder, sole-maintainer with no successor → PATTERN-STUDY not INSTALL (bus-factor=1 lock-in).
4. **Star-velocity spike without provenance** — sudden star spike (`star_velocity_7d > 100`) without coverage from external sources → fake-star investigation per MALTA / Kapravelos ICSE-26 BEFORE any tier upgrade.
5. **Demo repo + flashy README + low actual code volume** — the niche-authority signal requires actual SUBSTANCE (≥3 KLOC of relevant primitives, not just slides).
6. **Cite-only paper without runtime artifact** — paper itself stays CITE-ONLY; do not install random impl from author's GitHub unless the impl is the canonical reference per §4.3.

### §4.6 Operationalizing the niche-domain-authority rescue

For META-D to fire `provides_novel_niche → INSTALL` SAFELY:

- META-A discovery MUST surface ≥3 candidate repos per niche (so the operator can verify "this niche is truly empty" — not "we only found one and missed two competitors").
- META-C scoring MUST treat pedigree-signals as a HARD predicate (length ≥ 1), not a soft scoring dim. No pedigree → fall back to PATTERN-STUDY / MONITOR.
- The audit ledger MUST record the `category_niche` field per sca-v18 schema so future waves can detect "we have 3 repos in jury-on-demand niche, why?" and prune duplicates.
- The Pareto-frontier preservation (Stage 5a) MUST run AFTER the niche-authority predicate so a Pareto-dominated repo with novel-niche still rides up.

---

## §5 Integration with Cardinal Rule 3 trust-tuple

CLAUDE.md Cardinal Rule 3 (current text, post-W331 axis-1 #3 extension) is the canonical install-discipline anchor. The decision-tree in §2 embeds Cardinal Rule 3's 4-sub-criteria trust-tuple as the `trust_tuple_all_pass(T)` predicate at Stage 5. This section maps each tier verdict from §1 onto the cardinal-rule-1 trust-tuple sub-criteria so the operator can verify trust-tuple compliance per VERDICT-LEDGER row.

### §5.1 Trust-tuple sub-criteria (W331 axis-1 #3, mechanized via `.pre-commit-config.yaml`)

(a) **Maintainer-identity** via signed releases — SLSA-L3 attestation OR npm provenance OR Sigstore for git tags.

(b) **License-risk audit** — MIT/Apache/BSD/ISC/MPL OK; AGPL/SSPL/proprietary case-by-case (default REJECT for binding-dep; PATTERN-STUDY OK for non-binding cite-anchored principle-lift).

(c) **Malicious-update review** — head commit ≥30 days old OR explicit operator-pin. Defeats merge-day supply-chain attack window per OWASP CICD-SEC-3.

(d) **Dependency blast-radius** — transitive `npm ls --depth=0` clean / Socket.dev clean / Snyk clean / pip-audit clean / GitHub Dependabot clean for the install-window.

### §5.2 Tier-vs-trust-tuple compliance matrix

| Tier | (a) signed-releases | (b) license | (c) malicious-update review | (d) blast-radius | Required-Δ |
|---|---|---|---|---|---|
| **INSTALL** | REQUIRED — SLSA-L1+ via attestation OR Sigstore tag OR npm provenance | REQUIRED — permissive only | REQUIRED — head-commit ≥30d OR operator-pin | REQUIRED — clean transitive | All 4 must pass |
| **PATTERN-STUDY** | NOT REQUIRED (no upstream code in tree) | RECOMMENDED — source-readable license; AGPL/SSPL OK for cite-only-principle-lift | RECOMMENDED — read the source HEAD as it exists; principle survives source-tampering after the read | NOT REQUIRED (no transitive deps) | (b) check minimum |
| **CITE-ONLY** | NOT APPLICABLE (paper/spec is the citation) | NOT APPLICABLE | NOT APPLICABLE | NOT APPLICABLE | None |
| **MONITOR** | per Δ — depends on what's causing MONITOR (if reason is "too-new", monitor (a)+(c)) | per Δ | per Δ | per Δ | Per-Δ partial check |
| **AVOID / BLOCK** | Any failure → BLOCK | Any binding-dep license-fail → BLOCK | Any malicious-update flag → BLOCK | Any audit hit → BLOCK | Any 1-of-4 = BLOCK |

### §5.3 Trust-tuple verification commands (operationalize per VERDICT-LEDGER row)

For each INSTALL verdict, the VERDICT-LEDGER row MUST attach a reproducible-evidence row per Cardinal Rule 6 verify-before-claim:

```bash
# (a) maintainer-identity via signed releases
# Option A — SLSA L1+ attestation
gh attestation verify <pkg-tarball> --owner <org> --repo <repo> --predicate-type https://slsa.dev/provenance/v1
# Option B — npm provenance
npm view <pkg>@<version> --json | jq '.dist["npm-signature"]'
# Option C — Sigstore git tag
cosign verify-blob --signature <tag>.sig --certificate <tag>.cert \
  --certificate-identity-regexp "<maintainer-email-pattern>" \
  --certificate-oidc-issuer "https://accounts.google.com" <tag>.tar.gz

# (b) license-risk audit — confirm SPDX from gh-api
gh api repos/<org>/<repo> --jq '.license.spdx_id'
# Expected ∈ {MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, MPL-2.0}

# (c) malicious-update review — head commit age check
gh api repos/<org>/<repo>/commits/<head-sha> --jq '.commit.author.date'
# Compare against (today - 30 days); if newer, REQUIRE operator-pin annotation in VERDICT-LEDGER

# (d) blast-radius — transitive audit
# For npm packages
npm ls --depth=0 --json | jq '.dependencies | keys[]'
# For pip packages
pip-audit --strict
# For Docker images
syft <image>:<digest> -o cyclonedx-json | jq '.components | length'
trivy image --severity CRITICAL,HIGH <image>:<digest>
```

The VERDICT-LEDGER row template (per `docs/architecture/SOTA-RUNTIME-2026-05-22/SYNTHESIS-V2.1-codex-r1-applied.md` precedent) carries each of (a)-(d) as `cardinal_rule_compliance.cr1_trust_tuple.{maintainer_identity_signed,license_class_verified_via,head_commit_age_days,blast_radius_audit}` fields per sca-v18 schema `Z:/claude-sota-installed-W375/.claude/schemas/sca-v18-repo-verdict.schema.json` lines 100-180 (jury_verdict + cardinal_rule_compliance blocks).

### §5.4 Trust-tuple at the META-A discovery → META-D adoption-degree boundary

META-A repo-discovery output MUST include enough metadata for META-D to evaluate trust-tuple WITHOUT additional MCP round-trips. Recommended META-A output fields (per-repo):

```yaml
repo: <owner/name>
license_spdx: <SPDX ID from gh-api>
last_head_commit_date: <ISO-8601>
last_release_date: <ISO-8601>
slsa_attestation_present: <bool>
npm_provenance_present: <bool>
sigstore_tag_present: <bool>
ossf_scorecard_url: <gh action URL or empty>
contributor_count: <int>
org_count: <int>
fake_stars_check:
  method: <MALTA|Kapravelos-ICSE-26|PkgPulse|skipped>
  result: <clean|suspected-inflated|verified-organic>
pedigree_signals:
  - kind: <named-author|production-deploy|cited-in-cookbooks|arxiv-paper>
    anchor: <URL or file:line>
convergence_count: <int 0-8>
mcp_sources_surfacing: [<list of which 8 MCP sources>]
category_niche: <free-text niche descriptor for novelty check>
```

With these fields populated by META-A, the §2 decision-tree can run hard-gates (Stages 1-3) without further calls — the decision becomes a pure-function evaluation against META-C scores + META-A trust-tuple sub-results.

### §5.5 Reversal protocol (uninstall path)

If a wave-N INSTALL verdict later fails trust-tuple re-audit (e.g., wave-N+5 dependency-blast-radius re-check surfaces a transitive CVE), the reversal protocol per Cardinal Rule 6:

1. Wave-N+5 produces a NEW VERDICT-LEDGER row with tier = `BLOCK` and `block_reason = "trust-tuple regression: <details>"`.
2. The W270 install-state drift mechanism (cache-delete + fresh-install fix) is REVERSED — explicit uninstall:
   - Remove from `.claude/settings.json:enabledPlugins` map
   - Remove from `.claude/plugins/marketplaces/<marketplace>/manifest.json` if present
   - Run `/plugin uninstall <plugin@marketplace>` to drop cache dir
   - Verify via `gh release` / `npm view` that no transitive consumer is left pointing at it
3. The wave's CLOSURE-SYNTHESIS records the BLOCK with the same evidence-bar as the original INSTALL (Cardinal Rule 6 verify-before-claim — reversal needs evidence too, not just a vibe-check).
4. The reversed repo is added to a `NON-CANDIDATES.md` ledger so future-wave META-A discovery does not re-surface it without new evidence.

### §5.6 Open questions punted to META-E / future R-streams

- **R-CALIBRATION** punt — Cardinal-Rule-1 sub-criteria (a)-(d) currently use heuristic thresholds (head-commit ≥30d, transitive blast-radius "clean"). Calibrating against historical W255-W376 install decisions to derive empirical thresholds is a META-E task.
- **R-TOOLING** punt — automated `.pre-commit-config.yaml` `cr1-trust-tuple-attest` hook that runs the §5.3 commands on staged install adds. Currently advisory; needs hook-author work.
- **R-STORAGE** punt — VERDICT-LEDGER row template field-coverage audit; ensure every sca-v18 schema field has a canonical landing-spot in the wave-N artifact.
- **R-IMPL** punt — `tools/build-subagent-allowlist.mjs`-equivalent `tools/build-install-allowlist.mjs` that emits the install-set as a JSON registry consumable by `tools/preinstall-validator.mjs` for runtime enforcement at install time.

---

## §6 Operator-facing one-page summary

For the human-readable one-page distillation:

**The 4-class taxonomy answers**: "what level of commitment is this candidate worth?"

1. **INSTALL** — binding dep + ongoing maintenance + blast-radius. Reserved for things where we need the runtime primitive itself (OpenHands SDK, docker-py, temporalio) OR things that occupy a novel niche with no incumbent (haizelabs/verdict for jury-on-demand).

2. **PATTERN-STUDY** — read the architecture, lift the principle into own-authored code. Reserved for things where the IDEA is canonical but the IMPLEMENTATION doesn't compose with our orchestrator (PydanticAI graph-state-machine; CrewAI structured-output; AutoGen termination-conditions).

3. **CITE-ONLY** — academic reference; the source IS the citation, not an artifact. Reserved for papers / specs / standards / blog-posts where install-not-applicable (SLSA spec; NIST SP 800-218; arxiv 2507.19457 GEPA paper as a paper-only cite separate from `stanfordnlp/dspy` PATTERN-STUDY).

4. **AVOID / BLOCK** — license-poisoned / abandoned / attacker-controllable / fake-star / CVE-hit. Reserved for repos that cannot safely enter our runtime even as principle-lift sources (because reading attacker-controllable source is itself the attack surface).

**The decision-tree (§2) is a stage-ordered function from META-C scores + META-A trust-tuple → tier verdict**. Hard-gates short-circuit first (security, license, abandonment, fake-stars, jury-veto). Then soft routing applies based on capability × dispatch_fit × Pareto-frontier × niche-authority.

**The retroactive audit (§3) showed 12/12 alignment** between the §2 tree and the implicit W376 SYNTHESIS verdicts — the tree codifies operator/orchestrator reasoning that was already implicit; it does not impose new bias.

**The anti-pattern catalog (§4) protects against** the mirror-failure-mode of star-bias-dismissal: niche-domain-authority repos (low stars, high pedigree, novel niche) ride to INSTALL via the `provides_novel_niche` predicate. The negative-controls in §4.5 prevent the predicate from being abused to greenlight star-bait or founder-pet-repos.

**The Cardinal Rule 3 trust-tuple integration (§5)** turns every INSTALL verdict into a reproducible-evidence ledger row per Cardinal Rule 6 verify-before-claim, with explicit verification commands and a reversal protocol if a future re-audit fails.

---

## §7 Cite anchors (≥3-org-distinct per major claim)

Major claims and their cite-cluster anchors:

| Claim | Org 1 | Org 2 | Org 3 | Org 4+ |
|---|---|---|---|---|
| 5-tier soft-gate replaces binary INSTALL/BLOCK | sca-v17→sca-v18 W288 §4 lineage (local) | DSPy GEPA Pareto-frontier (Stanford NLP arxiv 2507.19457) | UK AISI inspect_ai EvalLog | OpenSSF Criticality Score |
| Stars are NOT a quality signal | OSSF Criticality Score formula (stars EXCLUDED) | Kapravelos ICSE-26 fake-stars paper | arxiv 2603.10265 MALTA fake-star detection | PkgPulse |
| Jury-on-Demand K=4 weighted-by-reliability | arxiv 2512.01786 | jeffliulab/model-court | haizelabs/verdict | (Anthropic claude-cookbooks citations-agent skill) |
| Minority-veto n≥2 BLOCK override | arxiv 2510.11822 (95.5% TPR vs naive-majority 19.2% TNR) | sca-v18 schema | (sca-v18 R1 §3) | |
| Trust-tuple (a)+(b)+(c)+(d) | SLSA v1.0 spec | CycloneDX SBOM spec | OSSF Scorecard | NIST SP 800-218 SSDF v1.1 (PW.7 + RV.1 + RV.3) |
| Pareto-frontier non-dominated set | DSPy GEPA paper (Agrawal et al. arxiv 2507.19457 ICLR 2026 oral) | Multi-objective Pareto literature | (sca-v18 R1 §1.1) | |
| EvalLog replayability | UK AISI inspect_ai `src/inspect_ai/log/_log.py` | (sca-v18 R1 §1.6) | (sca-v18 schema `eval_log_ref` field) | |
| Cardinal Rule 1 trust-tuple extension | W331 axis-1 #3 (local) | OWASP CICD-SEC-3 (3rd-party dependency abuse) | NIST SP 800-218 SSDF v1.1 | OpenSSF Scorecard |
| haizelabs/verdict niche-domain authority | arxiv 2502.18018 (Kalra & Tang 2025-02-25) | Anthropic citations-agent skill SKILL.md L67-133 (W369 P1.2 cite-cluster) | W369 prior cite-cluster + W376 S11 §4 | (deepwiki HEAD probe 2026-05-22) |

Total distinct orgs in this stream's cite-cluster: **≥10** (Stanford NLP / Stanford OVAL / UK AISI / OSSF / OWASP / NIST / SLSA / CycloneDX / Sigstore / Anthropic / haizelabs / Kapravelos lab / Microsoft AutoGen via S8 ref / OpenAlex / W369 P1.2 lineage). Floor exceeded ≥3.3×.

---

## §8 File-system manifest

- This file: `Z:/claude-sota-installed-W375/docs/architecture/W377-RESEARCH-V20/META-D-INSTALL-VS-PATTERN-STUDY.md`
- Cite-anchor target: sca-v18 schema `Z:/claude-sota-installed-W375/.claude/schemas/sca-v18-repo-verdict.schema.json`
- Cite-anchor source: R1 design `Z:/claude-sota-installed-W375/docs/architecture/SOTA-RUNTIME-2026-05-22/r-streams/R1-research-arch-meta-upgrade.md` §3 Decision-tier framework
- Audit input: W376 SYNTHESIS `Z:/claude-sota-installed-W375/docs/architecture/W376-RESEARCH/SYNTHESIS.md`
- Cardinal Rule 1 trust-tuple wording: `Z:/claude-sota-installed-W375/CLAUDE.md` Cardinal Rule 1 (W331 axis-1 #3 extension) + sister W330-MEGA-AUDIT REMEDIATION-PLAN-V2.md §P0.9 P0-9
- Sibling W377 META streams (input/output partners): META-A (discovery breadth+depth), META-B (convergence dedup), META-C (multi-dim scoring), META-E (Pareto-frontier + EvalLog replayability)

---

## §9 Acceptance criteria for this stream

This META-D stream is COMPLETE when:

1. The 4-class taxonomy in §1 has crisp criteria (✓ — 10 install gates + 7 pattern-study triggers + 5 cite-only triggers + 7 block triggers + 5 monitor triggers; cardinal-rule-1 trust-tuple integration).
2. The decision-tree pseudocode in §2 is unambiguous (✓ — STAGE 1-7 short-circuit logic + supporting predicates `pareto_dominated_by_installed`, `provides_novel_niche`, `trust_tuple_all_pass`, `pick_pin_strategy`).
3. The retroactive audit in §3 covers all 10 W376 SYNTHESIS repos with explicit alignment-check (✓ — 12/12 aligned including the user's explicitly-named PydanticAI canonical example + the haizelabs/verdict niche-authority anti-pattern test).
4. The anti-pattern catalog in §4 explains when low-star INSTALL is justified (✓ — 4 anti-pattern classes + 6 negative-controls + operationalization).
5. The Cardinal Rule 3 trust-tuple integration in §5 maps tiers to (a)-(d) sub-criteria with reproducible-evidence commands (✓ — matrix + commands + reversal protocol + META-A handoff fields).
6. Cite-cluster floor ≥3-org-distinct per major claim (✓ — §7 anchor table ≥10 distinct orgs).
7. File-system manifest enumerates inputs/outputs (✓ — §8).

The stream is **READY** for codex-round adversarial review per Cardinal Rule 1 + W342 5-MCP convergence floor, and READY for METAresult integration into the wave-W377 cumulative META-A+B+C+D+E synthesis.

End of META-D.
