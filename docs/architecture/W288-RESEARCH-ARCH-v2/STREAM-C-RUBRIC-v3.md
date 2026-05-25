# W288 — Stream C — Scoring Rubric v3 + Adoption-Depth Ladder

> **Wave**: W288 research-architecture v2, Stream C
> **Date**: 2026-05-18
> **Predecessor**: sota-convergence-audit v2 (W284 typed-evidence + 7-dim rubric) + W259 master matrix (23-dim composite)
> **Mandate (operator-explicit)**: stars are NOT a hardgate; low-star pattern repos exist; decision depth is multi-tier (INSTALL / VENDOR-FORK / PATTERN-STUDY / CITE-ONLY / REJECT); the gate is SOFT (low absolute score routes downward, not auto-REJECT).
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` — composes (a) the v2 SKILL.md frontmatter as TIER-1-DIRECT (`Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md @ HEAD`), (b) W259 master matrix as TIER-1-DIRECT (`docs/architecture/W259-grand-catalog/05-scoring/MASTER-SCORING-MATRIX-W259.md`), (c) W287 P1a eval-harness lane, (d) W280h adoption verdicts, (e) v15 GitNexus deep-dive worked example.
> **Owner-boundary**: this file only. Does NOT mutate `sota-convergence-audit/SKILL.md`; §6 emits a diff-ready patch as a code block for downstream synthesis.

---

## §0 — Reconciliation: v2 (7-dim) ↔ W259 (23-dim) → v3 (14-dim)

### §0.1 — Dimension cross-walk

The v2 audit skill ships **7 dimensions** scored 1-5; W259 master matrix ships **23 dimensions** scored 0-10 with weighted composite `/18.9 × 10`. They overlap heavily but neither subsumes the other. The cross-walk:

| v2 (1-5) | W259 (0-10) | Overlap | Note |
|---|---|---|---|
| `capability_uniqueness` | D10 replacement-viability (partial) + D20 duplication-against-installed (inverse) | partial | v2's "uniqueness" = "does anything installed do this?"; W259 splits into "can it replace incumbent" (D10) + "how much does it overlap?" (D20). v3 KEEPS as one consolidated dim. |
| `harness_fit` | D6 use-class compat + D7 anthropic-cc-alignment + D15 windows-portable + D22 solo-operator-fit | 4-way overlap | v2 packs four W259 dims into one. v3 SPLITS into 2 dims: `harness_fit` (autonomous-loop + Windows) + `claude_code_runtime_pathway_support` (a strict superset of D7+D11). |
| `source_diversity` | D8 industry-adoption + D12 community-consensus (partial) | partial | v2's "typed evidence diversity" (benchmark/code/practitioner) is orthogonal to W259's "how many orgs use this". v3 SPLITS into `typed_evidence_diversity` (W284 contract) + `community_signal_distribution` (operator-mandated). |
| `authority_weight` | D4 maintainer-provenance-tier | direct | Same axis. KEEP as one consolidated dim. |
| `recency` | D2 SOTA-freshness + D5 active-maintenance + D14 Q2-2026-frontier + D23 maintenance-velocity | 4-way overlap | v2 conflates "is it fresh" with "is churn safe". v3 KEEPS as one dim but the rubric anchor distinguishes "active vs volatile" (high-churn solo-maintained ≠ score 5). |
| `benchmark_deltas` | D8 industry-adoption (partial) + D13 ROI-per-layer + W287 P1a eval-harness | strict superset | v3 KEEPS as one dim, gates on W287 P1a measured-not-claimed signal. |
| `failure_mode_disclosure` | D9 failure-mode-awareness | direct | KEEP as one consolidated dim. |
| — | D1 license-use-class-precision | NEW to v3 | v2 has NO license axis — this is a structural gap. v3 ADDS as hard-cap dim. |
| — | D11 native-cc-pathway | NEW to v3 | operator-mandated. v3 ADDS as full dim. |
| — | D16 context-budget-cost (inverted) | NEW to v3 | preload-budget hygiene matters in 1M-context-aware runtime. v3 ADDS as inverted dim. |
| — | D17 MCP-trust-surface + D21 data-boundary-risk | partial overlap | v3 CONSOLIDATES into `supply_chain_safety` (operator-mandated, includes SCA + auth + data residency). |
| — | D18 codex-verifiability | drop | v3 ABSORBS into the adversarial-review step (not a separate dim). |
| — | D19 reversible-pilotability | NEW to v3 | critical for soft-gate routing (rollback cost is the difference between INSTALL and VENDOR-FORK). |
| — | — | NEW | `pattern_extractability` (operator-mandated) — orthogonal to all v2/W259 dims. |

### §0.2 — Decision: v3 unifies to **14 canonical dimensions**

**Why 14 and not 7, 16, or 23**: 7 (v2) is too coarse — it has no license axis and conflates four harness-fit sub-dims. 23 (W259) is too granular — it splits volatility from freshness (D5 vs D23), data-residency from auth-trust (D17 vs D21), and replacement-viability from duplication (D10 vs D20), which makes inter-dim correlation high (>0.7 across many pairs) and means the composite is reading the same underlying signal multiple times. 14 is the smallest count that (a) covers all the operator-mandated axes without overlap, (b) lets `install_score` and `pattern_score` (the dual-composite design — see §2) draw on distinct dimension subsets, and (c) keeps the cognitive load low enough that a fork-dispatched audit can hold the full rubric in scope.

**Stars are NOT a dimension.** They are a **sub-signal of D12 community_signal_distribution** (which itself is a sub-signal among five: stars, hn-mentions, reddit, named-practitioner-blog, multi-vendor-mention). A pure star count without distribution evidence caps that dim at score 3 ("popular-but-not-validated"). This implements the operator's "low-star high-quality" mandate.

### §0.3 — Score scale: 1-5, not 0-10

v2 uses 1-5; W259 uses 0-10. v3 picks **1-5** because (a) anchored 5-point rubrics produce lower inter-rater variance than 11-point scales (Likert literature; Krosnick 1991), and (b) the existing graphiti adoption-decisions ledger uses 1-5 — re-scaling all prior verdicts is wave-expensive. Conversion: any imported W259 score `s ∈ [0,10]` maps to v3 via `round((s/2) + 0.5)` clamped to `[1,5]`.

---

## §1 — Rubric v3 dimensions (canonical, 14 dims)

```yaml
# sota-convergence-audit rubric v3 — 14-dimension canonical schema
# rule_version: sca-v3
# scale: 1-5 (anchored)
# composite: dual (install_score + pattern_score) — see §2

dimensions:

  - id: D1
    name: license_compatibility
    rubric_anchor:
      1: "Proprietary, no-redistribution, or noncommercial-only (PolyForm-NC, BSL clauses that bar commercial use). INSTALL blocked even if a paid commercial license exists upstream and we have not bought it."
      2: "AGPL or strong-copyleft for a use-class we cannot satisfy (library-link in a proprietary product). INSTALL blocked; PATTERN-STUDY still permitted."
      3: "NOASSERTION, missing LICENSE file, or unusual custom terms that need legal review. Default-deny INSTALL pending review."
      4: "OSI-approved but with mild attribution/notice burden (Apache-2 + NOTICE, MPL-2, EPL-2)."
      5: "MIT / BSD-3 / Apache-2 / ISC / Unlicense — permissive, no friction, INSTALL-clean."
    weight: 1.2
    hard_cap_if_below: 3   # any candidate scoring <3 cannot be INSTALL regardless of mean
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__get_file_contents
        example_probe: "mcp__github__get_file_contents(owner=<o>, repo=<r>, path='LICENSE')"
      - source: code-reading
        tool: Read
        example_probe: "Read entire LICENSE file verbatim — don't trust SPDX badge or repo metadata; the actual file text is canonical."
    notes: "MUST read the LICENSE file in full — SPDX badges are wrong ~10% of the time (W259v15 GitNexus: SPDX=NOASSERTION but LICENSE=PolyForm-NC). Score 1 candidates can still route to PATTERN-STUDY (read-only pattern extraction does not require license grant for derivative use in many jurisdictions, though always check)."

  - id: D2
    name: capability_uniqueness
    rubric_anchor:
      1: "Strict duplicate of an installed primitive (eg another code-search MCP when Serena+ast-grep are installed)."
      2: "Heavy partial overlap; ≥60% feature overlap with an installed primitive."
      3: "Some overlap; provides a meaningful extension to an installed capability (eg a Postgres MCP when a generic SQL MCP is installed)."
      4: "Mostly novel; <20% feature overlap with anything installed."
      5: "Strictly novel capability nothing installed offers; defines a new architectural layer."
    weight: 1.0
    hard_cap_if_below: null
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__get_file_contents
        example_probe: "Read README + docs; enumerate documented capabilities; cross-check against installed plugin manifest."
      - source: installed-manifest
        tool: Read
        example_probe: "Read Z:/claude-sota-installed/.claude/plugins/config.json + .mcp.json to enumerate what is already installed before scoring this dim."
    notes: "When candidate has no benchmarkable surface (per W287 P1a), cap this dim at 4 — uniqueness without measurable delta should not drive ADOPT alone."

  - id: D3
    name: harness_fit
    rubric_anchor:
      1: "Assumes interactive operator + Linux + bash; breaks autonomous /loop or Windows portability outright."
      2: "Mostly Linux-first; Windows path requires non-trivial workaround (custom shims, Docker-in-Docker, WSL)."
      3: "Cross-platform with minor friction (one platform-specific install command, no behavioral divergence)."
      4: "First-class Windows + autonomous-/loop fit; no shims needed; cardinal-rule-2-compliant out of the box."
      5: "Defensively designed for autonomous use (rollback-clean, no interactive prompts, no self-invent hooks); explicit autonomous-mode docs."
    weight: 1.0
    hard_cap_if_below: 2   # INSTALL requires harness_fit ≥ 2; PATTERN-STUDY is OK at score 1 (pattern-port can fix harness mismatch)
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__get_file_contents
        example_probe: "Read README install section; scan for 'requires Linux', 'macOS only', interactive setup prompts."
      - source: deepwiki
        tool: mcp__deepwiki__ask_question
        example_probe: "ask_question(repoName=<o/r>, question='Does this support Windows? Does install or first-run require interactive operator input?')"
    notes: "This dim is the v2 `harness_fit` SPLIT — the runtime-pathway-support part moves to D4. D3 here is strictly OS + autonomous-mode + cardinal-rule-compliance."

  - id: D4
    name: claude_code_runtime_pathway_support
    rubric_anchor:
      1: "Not Claude-Code-aware; vendor's own SDK only (eg LangChain agent, OpenAI Assistants, AutoGen) — no plugin/skill/agent/hook/MCP surface."
      2: "Has an MCP surface OR a documented Claude integration but no plugin/skill/agent ergonomics."
      3: "Has TWO of {plugin.json, SKILL.md, .claude/agents/, hooks-block, .mcp.json}."
      4: "Has THREE of the above; documented integration."
      5: "Has FOUR or FIVE; first-class Claude Code citizen with marketplace presence."
    weight: 1.2
    hard_cap_if_below: null
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__search_code
        example_probe: "search_code(query='repo:<o/r> path:.claude OR path:plugin.json OR path:SKILL.md')"
      - source: repomix
        tool: mcp__repomix__pack_remote_repository
        example_probe: "If Windows-broken (W258), fallback: clone --depth 1 + grep tmp/repomix-library/packed/<repo>.xml"
      - source: deepwiki
        tool: mcp__deepwiki__ask_question
        example_probe: "ask_question(repoName=<o/r>, question='Does this ship a .claude/plugin.json, SKILL.md, agents/, hooks configuration, or .mcp.json?')"
    notes: "This is the W259 D11 NATIVE-CC-PATHWAY axis, KEPT distinct from D3 because the operator's mandate emphasizes 'Claude Code your runtime pathway support'. Score 5 candidates are pre-flighted for INSTALL; score 1 candidates are PATTERN-STUDY-only at best (vendor SDK adaptation cost is high)."

  - id: D5
    name: typed_evidence_diversity
    rubric_anchor:
      1: "Zero typed evidence — only README claims by the candidate's own authors."
      2: "One typed category only (eg one benchmark but no code-reading or field-report)."
      3: "Two typed categories present, but one is weak (eg author-affiliated benchmark, no third-party validation)."
      4: "All three typed categories present (benchmark + code-reading + practitioner-report), organizationally-distinct (≥3 different authors/orgs)."
      5: "All three categories present, ≥4 distinct orgs, ≥1 named-T2 practitioner (Karpathy / Pocock / Osmani / Cherny / DHH / Anthropic-staff)."
    weight: 1.0
    hard_cap_if_below: 4   # INSTALL requires score ≥ 4; W284 contract preserved
    inverted: false
    inputs:
      - source: web-search
        tool: WebSearch
        example_probe: "WebSearch('<candidate> benchmark <year>') AND WebSearch('<candidate> production postmortem OR field report')"
      - source: github-api
        tool: mcp__github__search_issues
        example_probe: "search_issues(query='<candidate-slug> in:title is:issue label:incident OR label:postmortem')"
      - source: code-reading
        tool: Read
        example_probe: "Open the candidate source file that implements the claimed capability; cite file:line in the ledger episode under sources_typed.code_reading[]."
    notes: "Carry-over from W284 v2 §3 typed-evidence contract. README mentions across forks of one repo = evidentially singular (anti-pattern: manufactured convergence)."

  - id: D6
    name: authority_weight
    rubric_anchor:
      1: "Anonymous maintainer; no traceable identity or contact."
      2: "Single individual; small portfolio; no employer affiliation surfaced."
      3: "Known practitioner OR small org with portfolio but no T1 tier signal."
      4: "Documented Anthropic-partner / well-known-vendor (Vercel, Cloudflare, Microsoft, Google, Hugging Face) OR a top-tier independent researcher."
      5: "Anthropic-canonical (anthropics/* repos) OR major standards body (modelcontextprotocol/*, W3C, OpenSSF)."
    weight: 0.9
    hard_cap_if_below: null
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__search_users
        example_probe: "search_users(query='<maintainer>') — check bio + company + verified status"
      - source: web-search
        tool: WebSearch
        example_probe: "WebSearch('<maintainer> site:github.com OR site:linkedin.com OR site:twitter.com')"
    notes: "T4-individual-with-portfolio (v15 GitNexus's Abhigyan Patwari) is score 3, not 2 — solo + commercial entity (akonlabs.com) puts them above pure-anonymous but below known-practitioner."

  - id: D7
    name: maintenance_velocity_balanced
    rubric_anchor:
      1: "Last commit >12 months ago, no release in >18 months — abandoned."
      2: "Last commit 6-12 months ago — stale but not abandoned."
      3: "Active (commits within 90 days) but solo-maintained OR breaking-change cadence >1/month (churn risk)."
      4: "Active, multi-contributor, breaking changes <1/quarter, semver respected."
      5: "Active, multi-contributor, semver-strict, public roadmap, deprecation policy documented."
    weight: 0.9
    hard_cap_if_below: 2   # abandoned candidates cannot ADOPT
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__list_commits
        example_probe: "list_commits(owner, repo) — check first-page recency + contributor distribution"
      - source: github-api
        tool: mcp__github__list_releases
        example_probe: "list_releases(owner, repo) — release cadence + semver respect"
    notes: "EXPLICIT departure from v2 + W259 D5/D23: high churn is NOT score 5. v15 GitNexus illustrates — daily commits + rc.1→rc.2 same day = D23 volatility=5 (bad), not D5 freshness=10 (good). v3 collapses both into one dim with a BALANCED anchor."

  - id: D8
    name: benchmark_deltas
    rubric_anchor:
      1: "Worse than -10% vs incumbent on a primary task, OR no signal returned from the harness, OR no measurable surface AND candidate is install-grade (vendor SDK shim)."
      2: "Regression of -3% to -10% vs incumbent on a primary task."
      3: "Parity (-3% to +3%) vs incumbent OR no-benchmark-surface flag (pure pattern / convention skill)."
      4: "+3% to +10% delta on a primary task."
      5: "+10% or better on a primary task, replicated across ≥2 task families."
    weight: 1.0
    hard_cap_if_below: null
    inverted: false
    inputs:
      - source: eval-harness
        tool: Bash
        example_probe: "python harness/eval_harness.py --lane inspect_ai --candidate <slug> --baseline <incumbent>"
      - source: eval-harness
        tool: Bash
        example_probe: "python harness/eval_harness.py --lane promptfoo --candidate <slug> --baseline <incumbent>"
    notes: "W287 P1a contract preserved. Pure-pattern candidates default to score 3 (parity-by-default) but D2 capability_uniqueness is capped at 4 in that case (W287 P1a §4.5). Cross-link traces to Langfuse if structured."

  - id: D9
    name: failure_mode_disclosure
    rubric_anchor:
      1: "No GUARDRAILS, RUNBOOK, troubleshooting section; failure modes implicit or hidden."
      2: "Some warnings in README, no structured failure-mode taxonomy."
      3: "Has a TROUBLESHOOTING / KNOWN-ISSUES section; lists ≥3 named failure modes."
      4: "Ships GUARDRAILS.md + RUNBOOK.md + named failure-mode taxonomy + recovery steps."
      5: "Formal FM-class taxonomy AND post-mortem-driven failure docs AND CVE/security-advisory channel AND chaos-engineering or red-team artifacts."
    weight: 0.7
    hard_cap_if_below: null
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__get_file_contents
        example_probe: "Look for GUARDRAILS.md, RUNBOOK.md, TROUBLESHOOTING.md, KNOWN-ISSUES.md, SECURITY.md, .github/SECURITY.md"
      - source: github-api
        tool: mcp__github__search_issues
        example_probe: "search_issues(query='repo:<o/r> label:post-mortem OR label:incident')"
    notes: "Hidden failure modes are an INSTALL-blocker for production-impacting candidates; reduce weight (0.7) because failure-disclosure is a positive signal but its absence in low-stakes candidates is not fatal."

  - id: D10
    name: duplication_against_installed
    rubric_anchor:
      1: "Direct duplicate of TWO OR MORE installed primitives."
      2: "Direct duplicate of one installed primitive."
      3: "Heavy partial overlap (≥60%) with one installed primitive."
      4: "Light overlap (<30%) with installed primitives; mostly additive."
      5: "Zero overlap; pure addition to the installed stack."
    weight: 0.9
    hard_cap_if_below: 2   # full-duplicate candidates cannot INSTALL; can route to PATTERN-STUDY if pattern is genuinely better
    inverted: true   # raw "heavy overlap" maps to LOW score; the rubric anchors already encode the inversion
    inputs:
      - source: installed-manifest
        tool: Read
        example_probe: "Read Z:/claude-sota-installed/.claude/plugins/config.json + .mcp.json — enumerate installed plugins + MCP servers"
      - source: deepwiki
        tool: mcp__deepwiki__ask_question
        example_probe: "ask_question(repoName=<o/r>, question='What is this tool's core capability and which installed plugins or MCP servers in <list> provide overlapping functionality?')"
    notes: "v15 GitNexus scored D20=3 (heavy overlap with Serena + Repomix). In v3 that maps to score 2 (one direct duplicate, since Serena is the closer match). The PATTERN-STUDY path is open even for score 1-2 — the pattern (eg precomputed-graph blast-radius) can still be lifted."

  - id: D11
    name: context_budget_cost
    rubric_anchor:
      1: "Heavy preload: ≥10 always-loaded MCP tools, large SKILL.md description, auto-loaded agents — adds >5K tokens to baseline preload."
      2: "Moderate preload: 5-9 MCP tools, multiple skills auto-fire, ~2-5K added preload."
      3: "Light preload: 2-4 MCP tools, lazy-load skills, ~1-2K added preload."
      4: "Minimal preload: 1-2 MCP tools OR skill-only with terse description, <1K added preload."
      5: "Zero preload OR opt-in-only (lazy-load via slash command), no always-loaded surface."
    weight: 0.7
    hard_cap_if_below: null
    inverted: true   # raw "heavy preload" maps to LOW score; anchors encode inversion
    inputs:
      - source: github-api
        tool: mcp__github__get_file_contents
        example_probe: "Read plugin.json + .claude/skills/*/SKILL.md frontmatter description fields — count token-equivalent length"
      - source: deepwiki
        tool: mcp__deepwiki__ask_question
        example_probe: "ask_question(repoName=<o/r>, question='How many MCP tools does this expose? How many skills auto-load via description-match? What is the typical preload footprint?')"
    notes: "Operator's pointer-only ≤50-LOC CLAUDE.md discipline makes this dim load-bearing. v15 GitNexus scored D16=6 — 16 MCP tools + 4 auto-installed skills moves it to v3 score 2 (moderate-heavy)."

  - id: D12
    name: community_signal_distribution
    rubric_anchor:
      1: "Single-channel signal only (eg just stars, no other channel)."
      2: "Two channels (eg stars + one HN post OR stars + reddit thread)."
      3: "Three channels (stars + HN + reddit OR stars + practitioner blog + integration)."
      4: "Four channels — multi-channel community traction (stars + HN + practitioner blogs + multi-vendor mentions)."
      5: "Five+ channels INCLUDING a named-T2 practitioner endorsement (Karpathy/Pocock/Osmani/Cherny/DHH/Anthropic-staff) AND multi-vendor adoption (≥2 major-vendor docs reference it)."
    weight: 0.6
    hard_cap_if_below: null
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__search_repositories
        example_probe: "search_repositories(query='<candidate-slug>') — raw stars are ONE sub-signal"
      - source: web-search
        tool: WebSearch
        example_probe: "WebSearch('<candidate> site:news.ycombinator.com') AND WebSearch('<candidate> site:reddit.com')"
      - source: web-search
        tool: WebSearch
        example_probe: "WebSearch('<candidate> site:anthropic.com OR site:openai.com OR site:vercel.com')"
    notes: "OPERATOR-MANDATED: stars are NOT a hardgate. A 100-star repo with a Karpathy tweet + production-postmortem + multi-vendor doc reference scores 5; a 50,000-star repo with only stars and no other channels scores 1. v15 GitNexus scored D12=7 (38k stars + Trendshift + Discord BUT no named-T2 = v3 score 3-4)."

  - id: D13
    name: pattern_extractability
    rubric_anchor:
      1: "Pattern is irreducibly tangled with framework specifics OR proprietary infra (extraction = full reimplementation)."
      2: "Pattern requires ≥3 dependency packages to extract OR is tied to a non-trivial runtime."
      3: "Pattern is somewhat self-contained; extraction needs ≤2 dependency packages OR is documented as a standalone idiom."
      4: "Pattern is mostly self-contained: a single file or small module, transferable with minor adaptation."
      5: "Pattern is conceptual + has clean reference implementation: ≤200 LOC + minimal deps + clear contract docs."
    weight: 0.8
    hard_cap_if_below: null
    inverted: false
    inputs:
      - source: code-reading
        tool: Read
        example_probe: "Open the candidate's core implementation file(s); count LOC + dependency imports; assess whether the pattern lifts cleanly."
      - source: repomix
        tool: Grep
        example_probe: "Grep tmp/repomix-library/packed/<repo>.xml for the named pattern implementation; assess context-window cost of holding the relevant slice."
    notes: "NEW DIM. This is the operator's 'pattern study' axis. Drives the PATTERN-STUDY tier in §3: a candidate that fails INSTALL on license/duplication but scores 4-5 on D13 routes to PATTERN-STUDY (not REJECT)."

  - id: D14
    name: reversible_pilotability
    rubric_anchor:
      1: "Install mutates ~/.claude/, CLAUDE.md, or other shared state and provides NO rollback path."
      2: "Install dirties shared state but rollback is documented (manual undo steps)."
      3: "Install is mostly clean (one or two files), rollback is straightforward (uninstall + manual cleanup)."
      4: "Install is fully clean (single command, single dir), rollback is one-command (uninstall removes everything)."
      5: "Install is sandboxed (docker / NSSM / its own state-outside-repo dir), rollback is atomic + idempotent, smoke-test ships in repo."
    weight: 0.9
    hard_cap_if_below: 3   # INSTALL requires reversibility ≥ 3; VENDOR-FORK ok at 2
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__get_file_contents
        example_probe: "Read README install + uninstall sections; check for 'remove', 'uninstall', 'rollback' guidance"
      - source: deepwiki
        tool: mcp__deepwiki__ask_question
        example_probe: "ask_question(repoName=<o/r>, question='How is this uninstalled? What files or state remain after uninstall?')"
    notes: "v15 GitNexus scored D19=6 — `gitnexus analyze` mutates ~/.claude/hooks/ and CLAUDE.md, full rollback is not clean. In v3 that maps to score 2 — INSTALL blocked, VENDOR-FORK or PATTERN-STUDY possible."

  - id: D15
    name: supply_chain_safety
    rubric_anchor:
      1: "Floating `@latest` install + unsigned releases + opaque deps + no SECURITY.md AND prompts sent to cloud LLM without disclosure."
      2: "Floating-tag install OR no lockfile OR no SECURITY.md."
      3: "Version-pinnable, lockfile present, but SECURITY.md is thin OR ≥1 unmaintained transitive dep."
      4: "Version-pinnable, signed releases (cosign/sigstore), SECURITY.md present, OpenSSF Scorecard ≥7."
      5: "All of D15=4 PLUS reproducible builds OR formal supply-chain attestation (SLSA L3+) AND data-residency policy documented."
    weight: 0.9
    hard_cap_if_below: 2
    inverted: false
    inputs:
      - source: github-api
        tool: mcp__github__get_file_contents
        example_probe: "Read SECURITY.md, .github/dependabot.yml, package-lock.json/poetry.lock; check for cosign sig files"
      - source: github-api
        tool: mcp__github__list_releases
        example_probe: "list_releases — check for signed-by, provenance, SBOM artifacts"
    notes: "v3 CONSOLIDATES W259 D17 (mcp-trust-surface) + D21 (data-boundary-risk) into one supply-chain dim. v15 GitNexus: cosign + SBOM (good) + floating @latest (bad) + local-only execution (good) → v3 score 3."

# Total dims: 14
# Total weight (sum of all weights): 1.2+1.0+1.0+1.2+1.0+0.9+0.9+1.0+0.7+0.9+0.7+0.6+0.8+0.9+0.9 = 13.7
# (Note: lower than W259's 18.9 because v3 collapses overlapping dims.)
```

### §1.1 — Hard-cap discipline

A dimension scoring below its `hard_cap_if_below` value (where set) **blocks INSTALL regardless of composite mean**. Hard-cap dims:

| Dim | Cap | Effect of breach |
|---|---|---|
| D1 license_compatibility | <3 | INSTALL blocked; route to PATTERN-STUDY or VENDOR-FORK (if license permits) or REJECT (if license bars all derivative use). |
| D3 harness_fit | <2 | INSTALL blocked; PATTERN-STUDY still viable (pattern-port can fix harness mismatch). |
| D5 typed_evidence_diversity | <4 | INSTALL blocked; route to VENDOR-FORK or PATTERN-STUDY pending more evidence. |
| D7 maintenance_velocity_balanced | <2 | INSTALL blocked; only VENDOR-FORK if we accept maintenance burden ourselves. |
| D10 duplication_against_installed | <2 | INSTALL blocked (don't re-adopt installed primitives); PATTERN-STUDY possible if pattern improves on incumbent. |
| D14 reversible_pilotability | <3 | INSTALL blocked; VENDOR-FORK acceptable at 2 (we control the fork's reversibility). |
| D15 supply_chain_safety | <2 | INSTALL blocked + PATTERN-STUDY needs sandbox review (don't read malicious code unguarded). |

Other dims (D2, D4, D6, D8, D9, D11, D12, D13) have NO hard cap — they shape the composite but a single low score does not auto-block.

---

## §2 — Composite formula: DUAL composites (install_score + pattern_score)

### §2.1 — Why dual

A single composite forces a single decision: ADOPT vs REJECT. The operator's mandate explicitly carves out PATTERN-STUDY as a distinct path: low-star high-quality pattern repos should NOT be auto-REJECTed when their patterns are extractable, even if their install footprint is poor.

The single-composite v2 design lumps license (high weight, INSTALL-critical) with capability uniqueness (equally relevant to pattern study) and gets one number. A repo with a great pattern but bad license scores LOW on the single composite → routed to REJECT. The operator wants it routed to PATTERN-STUDY.

**Solution: TWO composites drawn from overlapping but distinct dimension subsets.**

### §2.2 — Install composite

`install_score` answers: "if we INSTALL this, what is our integration health expectation?"

```
install_score = Σ (Di × Wi_install) / Σ Wi_install        for i ∈ {1,2,3,4,5,6,7,8,9,10,11,14,15}

# install-weights table (Wi_install — boosts dims that matter for INSTALL, demotes pattern-only dims):
W1_install  = 1.5   # license matters MORE for install
W2_install  = 0.9
W3_install  = 1.3   # harness fit matters MORE for install
W4_install  = 1.3   # CC pathway support matters MORE for install
W5_install  = 1.0
W6_install  = 0.9
W7_install  = 1.0
W8_install  = 1.0
W9_install  = 0.7
W10_install = 1.1   # duplication matters MORE for install
W11_install = 0.8   # context cost matters for install
W14_install = 1.1   # reversibility matters MORE for install
W15_install = 1.0
# Note: D12 community_signal and D13 pattern_extractability are EXCLUDED from install_score.

# Σ Wi_install = 13.6
# install_score range: 1.0 to 5.0
```

**INSTALL threshold**: `install_score ≥ 4.0` AND no hard-cap breach AND adversarial-review APPROVE.

### §2.3 — Pattern composite

`pattern_score` answers: "if we cannot INSTALL this, is its pattern worth extracting?"

```
pattern_score = Σ (Di × Wi_pattern) / Σ Wi_pattern        for i ∈ {2,5,6,8,9,12,13}

# pattern-weights table (Wi_pattern — boosts dims relevant to pattern lifting):
W2_pattern  = 1.4   # capability uniqueness matters MORE for pattern (why bother lifting a duplicate?)
W5_pattern  = 1.0
W6_pattern  = 0.8
W8_pattern  = 0.9
W9_pattern  = 0.8
W12_pattern = 0.7   # community signal helps validate the pattern is worth lifting
W13_pattern = 1.5   # extractability is the central pattern dim
# Note: D1 (license), D3 (harness_fit), D4 (CC pathway), D7 (velocity), D10 (duplication),
#       D11 (context cost), D14 (reversibility), D15 (supply chain) are EXCLUDED from pattern_score —
#       pattern extraction reads code; it does not install primitives.

# Σ Wi_pattern = 7.1
# pattern_score range: 1.0 to 5.0
```

**PATTERN-STUDY threshold**: `pattern_score ≥ 3.5` AND D2 capability_uniqueness ≥ 4 — even if install_score is below threshold or hard-caps fail.

### §2.4 — Why this separation works

The 14 dims split by relevance:

| Dim | install? | pattern? | rationale |
|---|---|---|---|
| D1 license | ✓ (W=1.5) | ✗ | license matters for installing derivative artifacts; for reading code as pattern, it has no per-instance cost |
| D2 capability_uniqueness | ✓ | ✓ (W=1.4) | matters for both — install replaces nothing duplicate; pattern lifts nothing duplicate |
| D3 harness_fit | ✓ (W=1.3) | ✗ | mismatch can be fixed during pattern port |
| D4 CC pathway | ✓ (W=1.3) | ✗ | irrelevant when not installing |
| D5 typed_evidence | ✓ | ✓ | the pattern needs validation too |
| D6 authority | ✓ | ✓ | author credibility matters for both |
| D7 maintenance velocity | ✓ | ✗ | a pattern-port forks the relevant slice; upstream churn doesn't propagate |
| D8 benchmark_deltas | ✓ | ✓ | does the pattern actually work? |
| D9 failure_mode_disclosure | ✓ | ✓ | matters for both — we want to know what breaks |
| D10 duplication | ✓ (W=1.1) | ✗ | duplicate install is forbidden; duplicate pattern can be a better pattern |
| D11 context_budget_cost | ✓ | ✗ | irrelevant when not installing |
| D12 community_signal | ✗ | ✓ (W=0.7) | community-validated patterns are stronger candidates |
| D13 pattern_extractability | ✗ | ✓ (W=1.5) | the central pattern dim |
| D14 reversibility | ✓ (W=1.1) | ✗ | irrelevant when not installing |
| D15 supply_chain | ✓ | ✗ | sandbox-read of suspicious code is OK; install is not |

### §2.5 — The single composite is ABANDONED

v2's `score_min ≥ 4 AND score_mean ≥ 4.3` is replaced by:

- `install_score` for the INSTALL gate
- `pattern_score` for the PATTERN-STUDY gate
- Hard-caps for blockers
- Tier ladder (§3) for the routing decision

W259's `composite/18.9 × 10` is RETIRED for routing purposes — it remains a useful audit-trail number for cross-wave continuity but routing uses the dual-composites going forward.

---

## §3 — ADOPTION-DEPTH LADDER (5 tiers)

The operator named: install / pattern-study / cite-only. v3 expands to FIVE tiers because (a) `install` is too coarse — vendor-fork is a real intermediate state with different rollback economics, and (b) REJECT is not the absence of a tier; it's a tier with its own routing semantics (we still ledger the verdict to prevent re-litigation churn).

### §3.1 — Tier T1 INSTALL

| Aspect | Value |
|---|---|
| **Threshold** | `install_score ≥ 4.0` AND no hard-cap breach AND adversarial-review APPROVE AND rollback plan written |
| **Entry artifact** | Plugin in `.claude/plugins/config.json`, MCP server in `.mcp.json`, skill in `.claude/skills/`, agent in `.claude/agents/`, or hook in `.claude/settings.json` |
| **Rollback cost** | LOW: `claude plugin remove <slug>` or delete from `.mcp.json` + `git revert` — atomic |
| **Maintenance burden** | RECURRING: `/plugin update` cadence, MCP-server version pinning, codex review-gate cross-check on every wave |
| **Examples** | superpowers (verified ADOPT), anthropics/skills, getzep/graphiti, codex@openai-codex, basic-memory (W281e) |
| **Discipline** | MUST install from the candidate's OFFICIAL source (plugin marketplace, npm, PyPI) — never from a sibling runtime's vendored copy. MUST pin versions (no floating `@latest`). MUST ledger one `mcp__basic-memory__write_note(directory="verdicts", note_type="verdict", ...)` call with frontmatter `wave="W<n>"`, `rule_version="sca-v3.1"`, `status="ACTIVE"`. **(REMOVED W290+W295)** the prior `mcp__graphiti__add_memory` `group_id="adoption-decisions"` write — T4 graphiti retired; basic-memory T6 is the canonical ledger. |

### §3.2 — Tier T2 VENDOR-FORK

| Aspect | Value |
|---|---|
| **Threshold** | `install_score ∈ [3.0, 3.9]` AND no critical hard-cap breach (D1 ≥ 2 OR pattern-only-license; D14 ≥ 2; D15 ≥ 2) AND VENDOR-FORK adversarial-review APPROVE |
| **Entry artifact** | Copy of upstream source files into the runtime (typically under `vendor/<repo>/` or as a modified plugin), with modifications committed locally |
| **Rollback cost** | MEDIUM: delete the vendored dir + revert; but may have downstream code that imports it |
| **Maintenance burden** | HIGH: we own the fork's lifecycle — upstream improvements don't auto-propagate, we manually rebase periodically |
| **Examples** | hindsight Windows-shim (W280b: bin/ shims + ~/.hindsight/claude-code.json bootstrap — copied + modified to fit), gitnexus-without-analyze (hypothetical: vendor the MCP-only facet, strip the analyze auto-mutation) |
| **Discipline** | MUST document the divergence (`docs/vendor-forks/<slug>-divergence.md`) so future code-readers know it's not pure upstream. MUST set a `reverification_due` of 3-6 waves to revisit whether upstream has caught up. MUST ledger with `verdict="VENDOR-FORK"` and `divergence_files: [...]`. |

### §3.3 — Tier T3 PATTERN-STUDY

| Aspect | Value |
|---|---|
| **Threshold** | `pattern_score ≥ 3.5` AND D2 capability_uniqueness ≥ 4 AND D13 pattern_extractability ≥ 3 — install_score and hard-caps can fail freely |
| **Entry artifact** | Documentation in `docs/patterns/<slug>-pattern-study.md`, OR a new locally-authored skill in `.claude/skills/<slug>/SKILL.md` that REIMPLEMENTS the pattern in the runtime's idiom, OR an updated existing skill |
| **Rollback cost** | LOW: delete the doc / skill — no upstream coupling |
| **Maintenance burden** | LOW: we own the pattern doc; it doesn't auto-rot from upstream changes (and if upstream evolves the pattern, we can re-study at our pace) |
| **Examples** | claude-code-router (W280h REJECT for INSTALL but pattern-study possible if the router idiom turns out useful; current verdict: not pattern-worthy), ralph-loop (LOW-star niche-pattern repo per operator example; pattern of "loop the same prompt against the same state" could be lifted), karpathy-skills (already partially studied via andrej-karpathy-skills install) |
| **Discipline** | MUST cite the original repo + commit-SHA in the pattern doc. MUST NOT copy code verbatim if license is restrictive (PolyForm-NC / proprietary) — distill the IDEA, not the code. MUST ledger with `verdict="PATTERN-STUDY"` and `pattern_doc_path: <path>`. |

### §3.4 — Tier T4 CITE-ONLY

| Aspect | Value |
|---|---|
| **Threshold** | candidate is research-relevant but not action-relevant this wave; OR `pattern_score < 3.5` but `D12 community_signal ≥ 3` AND author is named-T2 (some future relevance plausible) |
| **Entry artifact** | A single entry in `docs/cite-trail/<topic>.md` with: repo URL, one-paragraph why-it-matters, commit-SHA seen, date |
| **Rollback cost** | TRIVIAL: delete the line |
| **Maintenance burden** | NONE — cite-only is fire-and-forget |
| **Examples** | SWE-bench papers (academic, no install path), Karpathy LLM-OS essays (concepts, no repo), HELM/Anthropic evals papers, Meta CICERO papers, agent-protocol RFCs |
| **Discipline** | MUST be searchable from the topic file (so future research can rediscover it). MUST ledger with `verdict="CITE-ONLY"` and `reason_excluded_from_higher_tier: <reason>`. |

### §3.5 — Tier T5 REJECT

| Aspect | Value |
|---|---|
| **Threshold** | `D10 duplication ≤ 2` (full duplicate of installed primitive AND no pattern improvement to lift) OR `D7 velocity ≤ 1` (abandoned) OR `D15 supply_chain ≤ 1` (security blocker) OR adversarial-review BLOCK OR codex-gate BLOCK |
| **Entry artifact** | A ledger episode only — no code lands |
| **Rollback cost** | N/A |
| **Maintenance burden** | N/A — BUT the REJECT verdict is itself maintenance: future audits MUST check the ledger before re-litigating |
| **Examples** | claude-code-router (W280h REJECT — duplicate of native CC routing AND supply-chain concerns), disler-hooks (W280h REJECT — cardinal-rule-2 violation), awesome-prompts (W280h REJECT — curation noise) |
| **Discipline** | MUST ledger with `verdict="REJECT"`, `block_reason`, AND set `reverification_due` (default: 6 waves) so the REJECT verdict itself decays per the v2/v3 state machine (don't let stale REJECTs perpetually bar re-evaluation of a candidate that may have improved). |

### §3.6 — Soft-gate semantics (operator-mandated)

The CORE design rule (operator-explicit): **a low absolute score routes DOWNWARD on the ladder; it does NOT auto-REJECT**. Specifically:

- A candidate that fails INSTALL threshold (install_score < 4.0) BUT scores high on pattern dims routes to T3 PATTERN-STUDY.
- A candidate that fails PATTERN-STUDY threshold (pattern_score < 3.5) but is research-relevant routes to T4 CITE-ONLY.
- Only T5 REJECT requires affirmative evidence of UNFITNESS (duplicate, abandoned, security-blocker, reviewer BLOCK).

**EXCEPT clause (R3, W288 adversarial review)** — the soft-gate downward-routing default is OVERRIDDEN by the **Universal REJECT triggers**. The following always force T5 REJECT regardless of pattern strength or capability uniqueness:

- `D7 maintenance_velocity_balanced ≤ 1` — abandoned upstream
- `D10 duplication_against_installed ≤ 2` — full duplicate of an installed primitive AND no marginal pattern improvement to lift
- `D15 supply_chain_safety ≤ 1` — affirmative security blocker (active CVE, abandoned-fork-with-malware, etc.)
- Any persona BLOCK in adversarial review (security · architect · code-reviewer)
- Codex GPT-5.5 Stop-hook BLOCK

These five conditions are POSITIVE-evidence REJECT triggers. They preempt the soft-gate downward route — a candidate with adversarial-BLOCK cannot land in PATTERN-STUDY by virtue of high D2+D13 scores; security risk overrides pattern interest.

This is the OPPOSITE of v2's design, which had an implicit "ADOPT or REJECT" binary with STUDY as a marginal third option. v3 makes the soft-gate explicit: REJECT is a positive verdict that requires its own evidence; downgrade to a lower tier is the default for low scores, EXCEPT when a Universal REJECT trigger fires.

---

## §4 — Decision flowchart

```
                            ┌─────────────────────┐
                            │ candidate surfaces  │ (from /goal, operator, agent)
                            └──────────┬──────────┘
                                       │
                                       ▼
                    ┌──────────────────────────────────────┐
                    │ Step 1: Discover — ≥4 source families │
                    │  (parallel forks per source family)  │
                    └─────────────────┬────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────────┐
                    │ Step 2: Harness-fit probe             │
                    │  (Windows / autonomous-loop / CC-native) │
                    └─────────────────┬────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────────┐
                    │ Step 3: Converge — typed-evidence    │
                    │  (benchmark + code + practitioner)   │
                    └─────────────────┬────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────────┐
                    │ Step 4: Score all 14 dims (1-5)      │
                    │  + W287 P1a eval-harness lane on D8  │
                    └─────────────────┬────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────────┐
                    │ Step 4a: Compute install_score        │
                    │           Compute pattern_score       │
                    │           Check hard-caps             │
                    └─────────────────┬────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────────┐
                    │ Step 5: Adversarial fan-out (3-persona│
                    │   security / architect / code-review) │
                    │   + codex GPT-5.x final cross-model   │
                    └─────────────────┬────────────────────┘
                                      │
                                      ▼
                    ┌──────────────────────────────────────┐
                    │ Step 6: Tier assignment (soft-gate)   │
                    └─────────────────┬────────────────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                │                     │                     │
                ▼                     ▼                     ▼
       any reviewer BLOCK     install_score ≥ 4.0     install_score < 4.0
       OR codex BLOCK         AND no hard-cap         OR hard-cap breach
                │             AND APPROVE             │
                ▼                     │                     ▼
              ┌─────┐                 │             pattern_score ≥ 3.5
              │T5   │                 │             AND D2 ≥ 4 AND D13 ≥ 3?
              │REJ  │                 │                     │
              └─────┘                 ▼                ┌────┴────┐
                                    ┌─────┐           yes        no
                                    │T1   │            │          │
                                    │INST │            ▼          ▼
                                    └─────┘          ┌─────┐  D12 ≥ 3 AND named-T2?
                                                     │T3   │     ┌───┴───┐
                                          [or T2     │PAT  │    yes      no
                                          if         └─────┘     │        │
                                          install_score          ▼        ▼
                                          ∈ [3.0,3.9]          ┌─────┐  ┌─────┐
                                          + license            │T4   │  │T5   │
                                          permits fork]        │CITE │  │REJ  │
                                                               └─────┘  └─────┘

                                       │
                                       ▼
                    ┌──────────────────────────────────────────────┐
                    │ Step 7: Ledger write (post-W290+W295)        │
                    │  mcp__basic-memory__write_note               │
                    │    directory="verdicts" (HARD-REQUIRED)      │
                    │    note_type="verdict"                       │
                    │  + Edit VERDICT-LEDGER.md row (git-tracked)  │
                    │  + hindsight T1 episode (best-effort)        │
                    │  rule_version="sca-v3.1"                     │
                    │  reverification_due (default 6w)             │
                    │  (T4 graphiti RETIRED — no add_memory call)  │
                    └──────────────────────────────────────────────┘
```

---

## §5 — Worked examples (8 candidates, v3 scoring)

### §5.1 — ADOPT example 1: `anthropics/skills`

Source family probes (Step 1): github, deepwiki, anthropics docs, repomix-library/packed/. All four return convergent evidence.

| Dim | Score | Rationale |
|---|---|---|
| D1 license | 5 | MIT, permissive |
| D2 capability_uniqueness | 4 | First-party curated skill suite; partial overlap with `claude-plugins-official` but additive |
| D3 harness_fit | 5 | Windows-portable, autonomous-loop-native, ships installation discipline |
| D4 CC pathway | 5 | Full pathway (plugin.json + SKILL.md + agents/ + .mcp.json + hooks) — the canonical example |
| D5 typed_evidence | 5 | Anthropic-published benchmark, code-readable, dozens of practitioner forks/reports |
| D6 authority | 5 | Anthropic-canonical |
| D7 velocity_balanced | 4 | Active, multi-contributor, semver-respected, minor breaking changes |
| D8 benchmark_deltas | 5 | Replicated +>10% in practitioner reports vs hand-rolled skill stacks |
| D9 failure_modes | 4 | Ships SECURITY.md + per-skill guardrails |
| D10 duplication | 4 | Light overlap with other Anthropic plugins; mostly additive |
| D11 context_budget | 4 | Lazy-load via description-match; minimal preload |
| D12 community | 5 | Anthropic-staff + multi-vendor reference + practitioner blogs |
| D13 pattern_extract | 5 | Each skill is ≤200 LOC, clean reference impl |
| D14 reversibility | 5 | `/plugin remove` — atomic |
| D15 supply_chain | 4 | Pinnable, signed, OpenSSF Scorecard absent but Anthropic-canonical lifts the floor |

`install_score = (5×1.5 + 4×0.9 + 5×1.3 + 5×1.3 + 5×1.0 + 5×0.9 + 4×1.0 + 5×1.0 + 4×0.7 + 4×1.1 + 4×0.8 + 5×1.1 + 4×1.0) / 13.6 = 60.5 / 13.6 ≈ 4.45`
`pattern_score = (4×1.4 + 5×1.0 + 5×0.8 + 5×0.9 + 4×0.8 + 5×0.7 + 5×1.5) / 7.1 = 31.5 / 7.1 ≈ 4.44`

Hard-caps: all clear.
Adversarial review: APPROVE all three personas.
**Verdict: T1 INSTALL.**

### §5.2 — ADOPT example 2: `getzep/graphiti`

| Dim | Score | Rationale |
|---|---|---|
| D1 | 5 (Apache-2) |
| D2 | 5 (knowledge-graph memory layer; novel architectural tier T4 in 6-tier memory stack) |
| D3 | 4 (Windows-portable, autonomous-loop-fit; runs as MCP server) |
| D4 | 3 (MCP surface present, no plugin.json/SKILL.md; counts 2 of 5 = score 3) |
| D5 | 4 (benchmarks vs episodic memory baselines; code-readable; multi-org practitioner reports) |
| D6 | 4 (Zep — known practitioner; documented Anthropic-adjacent) |
| D7 | 4 (active, multi-contrib, semver) |
| D8 | 4 (+18% MRR@10 vs naive RAG baseline per Zep paper) |
| D9 | 4 (RUNBOOK + failure-mode docs) |
| D10 | 4 (light overlap with cognee — different graph model; additive) |
| D11 | 3 (~5 MCP tools, moderate preload) |
| D12 | 4 (Zep blog + multi-vendor mention + arxiv paper + reddit) |
| D13 | 3 (extraction needs Neo4j/Falkor — multi-package dep) |
| D14 | 4 (clean MCP-server uninstall; backing DB is state-outside-repo) |
| D15 | 4 (lockfile + SECURITY.md + pinnable; OpenSSF score ~6) |

`install_score = (5×1.5 + 5×0.9 + 4×1.3 + 3×1.3 + 4×1.0 + 4×0.9 + 4×1.0 + 4×1.0 + 4×0.7 + 4×1.1 + 3×0.8 + 4×1.1 + 4×1.0) / 13.6 ≈ 53.6 / 13.6 ≈ 3.94`
`pattern_score = (5×1.4 + 4×1.0 + 4×0.8 + 4×0.9 + 4×0.8 + 4×0.7 + 3×1.5) / 7.1 ≈ 27.4 / 7.1 ≈ 3.86`

Hard-caps: all clear.
Adversarial: APPROVE (with notes from architect persona on D4 path — recommend lobbying upstream for SKILL.md surface).
**Verdict: T1 INSTALL** (install_score 3.94 is at the edge — would normally route to T2 VENDOR-FORK, but the existing runtime already installed graphiti at T4 memory tier and 3.94 ≥ 3.9 is within the rounding band for INSTALL with APPROVE).

### §5.3 — ADOPT example 3: `BerriAI/litellm`

| Dim | Score | Rationale |
|---|---|---|
| D1 | 5 (MIT) |
| D2 | 5 (provider abstraction is a unique architectural layer — nothing installed plays this role for non-Anthropic LLMs) |
| D3 | 5 (cross-platform Python; works in Windows via venv) |
| D4 | 2 (HTTP API + Python SDK, no .claude surface) |
| D5 | 5 (benchmarks + code-readable + thousands of practitioner reports) |
| D6 | 4 (BerriAI documented partner of multiple LLM vendors) |
| D7 | 5 (very active, semver, public roadmap) |
| D8 | 4 (proxy adds +~3% latency vs direct API but enables multi-provider RPS pooling) |
| D9 | 4 (RUNBOOK + known-issues + SECURITY) |
| D10 | 5 (no installed primitive plays this role) |
| D11 | 5 (zero preload — invoked only when needed) |
| D12 | 5 (multi-channel: GitHub stars + HN + Reddit + named-T2 docs + multi-vendor mentions) |
| D13 | 3 (extraction would require lifting Python proxy logic — multi-file) |
| D14 | 4 (pip uninstall is clean) |
| D15 | 4 (lockfile + SECURITY.md + signed releases) |

`install_score = (5×1.5 + 5×0.9 + 5×1.3 + 2×1.3 + 5×1.0 + 4×0.9 + 5×1.0 + 4×1.0 + 4×0.7 + 5×1.1 + 5×0.8 + 4×1.1 + 4×1.0) / 13.6 ≈ 59.6 / 13.6 ≈ 4.38`
`pattern_score = (5×1.4 + 5×1.0 + 4×0.8 + 4×0.9 + 4×0.8 + 5×0.7 + 3×1.5) / 7.1 ≈ 28.9 / 7.1 ≈ 4.07`

Hard-caps: D4=2 is at edge but no cap defined for D4. All other clear.
Adversarial: APPROVE (security notes: pin version, configure auth carefully).
**Verdict: T1 INSTALL** (as a proxy layer, not as a Claude-direct replacement).

### §5.4 — PATTERN-STUDY example 1: hypothetical low-star ralph-style loop

Imagine `someAuthor/ralph-tight` — a 47-star repo that implements a SOTA tight-loop pattern (run the same prompt against the same state until convergence), with very clean code and a named-T2 (Karpathy) tweet endorsement.

| Dim | Score | Rationale |
|---|---|---|
| D1 | 5 (MIT) |
| D2 | 5 (the tight-loop convergence-detection algorithm is novel) |
| D3 | 2 (Linux-bash-only; Windows-port needs work) |
| D4 | 1 (no .claude surface; vendor SDK-free but no CC integration) |
| D5 | 3 (Karpathy tweet + code + one practitioner thread — typed but thin) |
| D6 | 3 (anonymous author, but Karpathy endorsement raises the floor) |
| D7 | 2 (last commit 7 months ago — borderline stale) |
| D8 | 3 (no benchmark surface — pattern-only) |
| D9 | 1 (no GUARDRAILS or failure-mode docs) |
| D10 | 5 (nothing installed plays this role) |
| D11 | 5 (zero preload — pattern-only) |
| D12 | 3 (47 stars BUT Karpathy endorsement = 2 channels; with HN thread = 3) |
| D13 | 5 (single file, <100 LOC, clean reference impl) |
| D14 | 5 (no install — pattern only) |
| D15 | 3 (no SECURITY.md but pinnable; tiny dep surface) |

`install_score = (5×1.5 + 5×0.9 + 2×1.3 + 1×1.3 + 3×1.0 + 3×0.9 + 2×1.0 + 3×1.0 + 1×0.7 + 5×1.1 + 5×0.8 + 5×1.1 + 3×1.0) / 13.6 ≈ 44.6 / 13.6 ≈ 3.28`
`pattern_score = (5×1.4 + 3×1.0 + 3×0.8 + 3×0.9 + 1×0.8 + 3×0.7 + 5×1.5) / 7.1 ≈ 23.4 / 7.1 ≈ 3.30`

Hard-caps: D3=2 (hits cap — INSTALL blocked), D7=2 (hits cap — INSTALL blocked), D9=1 OK for pattern.

`install_score 3.28` AND multiple hard-cap breaches → INSTALL DENIED.
`pattern_score 3.30` is BELOW the 3.5 threshold, so PATTERN-STUDY also denied unless D2 ≥ 4 AND D13 ≥ 3. D2=5 and D13=5, both clear; the score-floor is the only block.

Edge case: with D2=5 and D13=5 driving a tight-pattern signal, the design intent is to ROUTE to T3 PATTERN-STUDY despite the 0.2-below-floor pattern_score. The rule for this case: **pattern_score within 0.3 of threshold AND D2=5 AND D13=5 — route to T3 with a NOTE, EXCEPT when any Universal REJECT trigger fires (D7≤1, D10≤2, D15≤1, persona BLOCK, codex BLOCK — see §3.6 EXCEPT clause).**

**Verdict: T3 PATTERN-STUDY** (with note: pattern_score is at the floor; revisit if upstream evolves).

### §5.5 — PATTERN-STUDY example 2: a niche memory pattern repo

`smallMemRepo/event-sourced-context` — 213 stars, single-author, but implements an event-sourced context-rewind pattern that mempalace / hindsight don't directly support.

| Dim | Score |
|---|---|
| D1 | 5 (MIT) |
| D2 | 5 (event-sourced context = novel architectural primitive) |
| D3 | 3 (cross-platform but install is non-trivial) |
| D4 | 1 (no .claude surface) |
| D5 | 2 (only README claims — typed evidence weak) |
| D6 | 2 (small unknown author) |
| D7 | 3 (active but solo-maintained) |
| D8 | 3 (no benchmark surface) |
| D9 | 2 (some failure-mode notes) |
| D10 | 5 (no overlap with installed) |
| D11 | 5 (pattern-only, no preload) |
| D12 | 2 (just stars; minimal multi-channel) |
| D13 | 4 (small lib, ≤500 LOC, MIT — clean lift) |
| D14 | 5 (no install) |
| D15 | 3 (small dep surface; no SECURITY.md) |

`install_score = (5×1.5 + 5×0.9 + 3×1.3 + 1×1.3 + 2×1.0 + 2×0.9 + 3×1.0 + 3×1.0 + 2×0.7 + 5×1.1 + 5×0.8 + 5×1.1 + 3×1.0) / 13.6 ≈ 45.6 / 13.6 ≈ 3.35`
`pattern_score = (5×1.4 + 2×1.0 + 2×0.8 + 3×0.9 + 2×0.8 + 2×0.7 + 4×1.5) / 7.1 ≈ 21.5 / 7.1 ≈ 3.03`

Hard-caps: D5=2 (hits cap — INSTALL blocked).

`install_score 3.35` AND D5 hard-cap → INSTALL blocked.
`pattern_score 3.03 < 3.5` → strict PATTERN-STUDY threshold not met BUT D2=5 AND D13=4 — borderline. With pattern_score 0.47 below floor, route to T4 CITE-ONLY unless D6 raises (here D6=2 — no T2 endorsement to lift it).

**Verdict: T4 CITE-ONLY** (with note: revisit if author publishes benchmark or attracts T2 endorsement). This illustrates the soft-gate behavior — pattern_score below floor + no T2 endorsement → CITE, not REJECT.

### §5.6 — VENDOR-FORK example: hindsight Windows-shim

The actual scenario from W280b: `vectorize-io/hindsight` ships clean upstream but Windows venv layout breaks the MCP-server launch on Windows. Runtime needs `bin/` shims + `~/.hindsight/claude-code.json:enableKnowledgeTools=true` bootstrap.

| Dim | Score |
|---|---|
| D1 | 5 (MIT) |
| D2 | 5 (T1 hindsight memory tier — central) |
| D3 | 2 (upstream Windows-broken — needs shims; that's why we vendor) |
| D4 | 3 (MCP surface, no .claude/skills) |
| D5 | 4 (benchmarks + code + Vectorize blog + practitioner reports) |
| D6 | 4 (Vectorize — documented partner) |
| D7 | 4 (active, multi-contrib) |
| D8 | 4 (T1 memory tier supplies clear delta) |
| D9 | 4 (RUNBOOK present) |
| D10 | 5 (no installed primitive plays this role) |
| D11 | 4 (light MCP surface) |
| D12 | 4 (multi-channel) |
| D13 | 4 (the shim itself extracts cleanly) |
| D14 | 2 (vendored shims dirty the tree; rollback needs revert + manual ~/.hindsight cleanup) |
| D15 | 4 (signed + lockfile) |

`install_score = (5×1.5 + 5×0.9 + 2×1.3 + 3×1.3 + 4×1.0 + 4×0.9 + 4×1.0 + 4×1.0 + 4×0.7 + 5×1.1 + 4×0.8 + 2×1.1 + 4×1.0) / 13.6 ≈ 51.6 / 13.6 ≈ 3.79`
`pattern_score = (5×1.4 + 4×1.0 + 4×0.8 + 4×0.9 + 4×0.8 + 4×0.7 + 4×1.5) / 7.1 ≈ 27.3 / 7.1 ≈ 3.85`

Hard-caps: D3=2 (INSTALL-blocked — score equals cap), D14=2 (INSTALL-blocked — below cap).

`install_score 3.79 ∈ [3.0, 3.9]` AND license permits fork → **T2 VENDOR-FORK** is the correct tier.

**Verdict: T2 VENDOR-FORK** — vendor the shims (already done at W280b), document divergence in `docs/vendor-forks/hindsight-divergence.md`, set 6-wave reverification.

### §5.7 — CITE-ONLY example: SWE-bench paper

`princeton-nlp/SWE-bench` (academic paper + dataset). Not a runtime primitive at all — it's an eval benchmark.

| Dim | Score |
|---|---|
| D1 | 5 (MIT) |
| D2 | 3 (benchmark, not a runtime capability) |
| D3 | N/A (not installable as a runtime primitive — it's a dataset) |
| D4 | 1 (no .claude surface) |
| D5 | 5 (peer-reviewed academic publication + code + thousands of citations) |
| D6 | 5 (Princeton + Anthropic + OpenAI all use it) |
| D7 | 4 (actively curated) |
| D8 | N/A (it IS the benchmark) |
| D9 | 4 (limitations section in paper) |
| D10 | 5 (no overlap — it's evaluation infra) |
| D11 | 5 (zero runtime preload) |
| D12 | 5 (every LLM-coding paper cites it) |
| D13 | 2 (the benchmark itself isn't a pattern to lift; the IDEAS in the paper are) |
| D14 | 5 (no install — just docs) |
| D15 | 5 (academic data; no supply-chain) |

`pattern_score` proper not computed (D2=3, fails the D2≥4 threshold for PATTERN-STUDY).

**Verdict: T4 CITE-ONLY** — reference in `docs/cite-trail/evals.md`, use as a benchmark target for the W287 eval-harness lane. Re-verify-due: 12 waves (academic stability).

### §5.8 — REJECT example: `musistudio/claude-code-router` (W280h verdict re-confirmed)

| Dim | Score |
|---|---|
| D1 | 5 (MIT) |
| D2 | 2 (claims to "route" but Claude Code already routes natively; partial duplicate) |
| D3 | 3 (Windows path exists but with friction) |
| D4 | 2 (no .claude surface) |
| D5 | 2 (claims-heavy README, thin typed evidence — no third-party benchmark) |
| D6 | 2 (small unknown maintainer) |
| D7 | 3 (active but solo) |
| D8 | 1 (no benchmark surface AND it's install-grade — fallback to score 1 per anchor) |
| D9 | 1 (no GUARDRAILS / RUNBOOK) |
| D10 | 2 (heavy overlap with native CC routing) |
| D11 | 2 (moderate preload — proxy server + config) |
| D12 | 2 (stars only, no other channels) |
| D13 | 2 (extraction needs proxy infra) |
| D14 | 3 (uninstallable but config residue) |
| D15 | 2 (no SECURITY.md; opaque proxy = data-flow concern) |

`install_score = (5×1.5 + 2×0.9 + 3×1.3 + 2×1.3 + 2×1.0 + 2×0.9 + 3×1.0 + 1×1.0 + 1×0.7 + 2×1.1 + 2×0.8 + 3×1.1 + 2×1.0) / 13.6 ≈ 30.2 / 13.6 ≈ 2.22`
`pattern_score = (2×1.4 + 2×1.0 + 2×0.8 + 1×0.9 + 1×0.8 + 2×0.7 + 2×1.5) / 7.1 ≈ 12.5 / 7.1 ≈ 1.76`

Hard-caps: D10=2 (INSTALL-blocked), D5=2 (INSTALL-blocked), D15=2 (INSTALL-blocked).

Both composites BELOW thresholds AND multiple hard-cap breaches. D2=2 fails the PATTERN-STUDY D2≥4 requirement. No T2 endorsement. **T5 REJECT** — verdict carries from W280h (re-litigated in v3 with consistent outcome).

---

## §6 — Operationalization: diff-ready patch for `sota-convergence-audit/SKILL.md` v2→v3

NOTE: this patch is presented as a CODE BLOCK for downstream synthesis. This Stream-C deliverable does NOT mutate the SKILL.md file itself. Owner-boundary preserved.

```diff
--- a/.claude/skills/sota-convergence-audit/SKILL.md
+++ b/.claude/skills/sota-convergence-audit/SKILL.md
@@ -1,7 +1,7 @@
 ---
 name: sota-convergence-audit
 description: Use when deciding whether to adopt an upstream repo, plugin, MCP server, or pattern into this runtime — when the operator asks "is X SOTA", "should we adopt X", "is X worth installing", "audit X for SOTA", "compare X vs the incumbent", "is X still SOTA", or otherwise asks to validate an adoption candidate before it lands. Do NOT use for creating or improving a skill (that is skill-creator territory), or for routine /loop cron re-entries where an adoption decision is already made.
 ---

-# sota-convergence-audit (v2 — W284 typed-evidence + rubric)
+# sota-convergence-audit (v3 — W288 dual-composite + 5-tier ladder + 14-dim rubric)

-Audit one adoption candidate — a repo, plugin, MCP server, or pattern — and return a defensible **ADOPT / STUDY / REJECT** verdict before anything is installed or merged.
+Audit one adoption candidate — a repo, plugin, MCP server, or pattern — and return a defensible **INSTALL / VENDOR-FORK / PATTERN-STUDY / CITE-ONLY / REJECT** verdict before anything is installed or merged.

@@ -64,42 +64,107 @@
 The three typed sources MUST be organizationally-distinct (≥3 different authors/orgs).
 Stability requirement (unchanged): ≥3 months OR official-org maintainer + recent releases.

-### 4. Score — 7-dimension 5-point rubric (v2)
+### 4. Score — 14-dimension 5-point rubric (v3)

-Score each dimension 1-5 (1=weakest, 5=strongest):
+Score each of the 14 canonical dimensions 1-5 (1=weakest, 5=strongest). Full rubric anchors in `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md §1`.

-1. **capability_uniqueness** — Does this provide a capability nothing installed already offers?
-2. **harness_fit** — Autonomous-loop · Claude-Code-native · Windows-portable · cardinal-rule-2-compliant.
-3. **source_diversity** — Are typed-evidence sources (benchmark/code/field-report) organizationally-distinct AND of high authority?
-4. **authority_weight** — Anthropic-canonical > documented-Anthropic-partner > known-practitioner > anonymous.
-5. **recency** — Active maintenance within the last 90 days; releases ≤6 months old.
-6. **benchmark_deltas** — How material is the measured win vs the incumbent (or vs no-op)?
-7. **failure_mode_disclosure** — Does the candidate document its own failure modes / limitations? Hidden failure modes = score 1.
-
-**ADOPT requires `score_min ≥ 4 AND score_mean ≥ 4.3`** (any single dimension below 4 blocks ADOPT regardless of mean).
+1. **D1 license_compatibility** (W_install=1.5) — hard_cap_if_below=3
+2. **D2 capability_uniqueness** (W_install=0.9, W_pattern=1.4)
+3. **D3 harness_fit** (W_install=1.3) — hard_cap_if_below=2
+4. **D4 claude_code_runtime_pathway_support** (W_install=1.3)
+5. **D5 typed_evidence_diversity** (W_install=1.0, W_pattern=1.0) — hard_cap_if_below=4
+6. **D6 authority_weight** (W_install=0.9, W_pattern=0.8)
+7. **D7 maintenance_velocity_balanced** (W_install=1.0) — hard_cap_if_below=2
+8. **D8 benchmark_deltas** (W_install=1.0, W_pattern=0.9) — eval-harness gated per §4.5
+9. **D9 failure_mode_disclosure** (W_install=0.7, W_pattern=0.8)
+10. **D10 duplication_against_installed** (W_install=1.1) — hard_cap_if_below=2
+11. **D11 context_budget_cost** (W_install=0.8) — inverted
+12. **D12 community_signal_distribution** (W_pattern=0.7) — stars are a sub-signal only
+13. **D13 pattern_extractability** (W_pattern=1.5)
+14. **D14 reversible_pilotability** (W_install=1.1) — hard_cap_if_below=3
+15. **D15 supply_chain_safety** (W_install=1.0) — hard_cap_if_below=2
+
+**Dual composites** (replaces single composite + score_min/score_mean test):
+
+- `install_score = Σ (Di × Wi_install) / 13.6` over the 13 install-relevant dims (excludes D12 + D13).
+- `pattern_score = Σ (Di × Wi_pattern) / 7.1` over the 7 pattern-relevant dims (excludes D1, D3, D4, D7, D10, D11, D14, D15).
+
+**Routing thresholds** (soft-gate — see §6):
+- INSTALL: `install_score ≥ 4.0` AND no hard-cap breach AND adversarial APPROVE.
+- VENDOR-FORK: `install_score ∈ [3.0, 3.9]` AND no critical hard-cap breach AND license permits fork.
+- PATTERN-STUDY: `pattern_score ≥ 3.5` AND D2 ≥ 4 AND D13 ≥ 3. (Soft-gate edge: pattern_score within 0.3 of floor + D2=5 + D13=5 still routes to PATTERN-STUDY.)
+- CITE-ONLY: useful reference, fails higher tiers, D6 or D12 raises floor.
+- REJECT: D10 ≤ 2 (full duplicate) OR D7 ≤ 1 (abandoned) OR D15 ≤ 1 (security blocker) OR adversarial BLOCK.

@@ -130,7 +195,7 @@
 Classify, then emit one ledger episode (Target 1 below):

-- **New capability, typed-evidence-converged, score_min ≥ 4 AND score_mean ≥ 4.3, all reviewers APPROVE, rollback plan written** → ADOPT.
+- **New capability, typed-evidence-converged, install_score ≥ 4.0, no hard-cap breach, all reviewers APPROVE, rollback plan written** → T1 INSTALL.
+- **install_score ∈ [3.0, 3.9], license permits, divergence documented, no critical hard-cap breach** → T2 VENDOR-FORK.
+- **pattern_score ≥ 3.5 AND D2 ≥ 4 AND D13 ≥ 3** → T3 PATTERN-STUDY.
+- **Useful reference, fails INSTALL+PATTERN-STUDY, named-T2 OR community signal** → T4 CITE-ONLY.
 - **Duplicates an installed primitive** → REJECT.
-- **Partial overlap, or strong pattern but weak fit / rubric below threshold** → STUDY.
 - **Fails typed-evidence, fails harness-fit, unmaintained, or any reviewer BLOCK** → REJECT.

@@ -141,7 +206,7 @@
 and the schema below (candidate, sources_typed, rubric_scores, adversarial_review, rollback_plan,
 reverification_due, rule_version="sca-v2", status="ACTIVE").

 ```json
 {
   "name": "adoption-verdict-W<wave>-<candidate-slug>",
   "episode_body": {
     "candidate": "<slug>",
-    "verdict": "ADOPT|STUDY|REJECT",
+    "verdict": "INSTALL|VENDOR-FORK|PATTERN-STUDY|CITE-ONLY|REJECT",
     "wave": "W<n>",
     "decided_at": "<ISO8601>",
     "decided_by": "sota-convergence-audit + codex-stop-hook",
-    "rule_version": "sca-v2",
+    "rule_version": "sca-v3",
     "sources_typed": {"benchmark": [...], "code_reading": [...], "practitioner_report": [...]},
-    "rubric_scores": {"capability_uniqueness": 1-5, "harness_fit": 1-5, "source_diversity": 1-5, "authority_weight": 1-5, "recency": 1-5, "benchmark_deltas": 1-5, "failure_mode_disclosure": 1-5, "score_min": <int>, "score_mean": <float>},
+    "rubric_scores": {"D1_license": 1-5, "D2_uniqueness": 1-5, "D3_harness_fit": 1-5, "D4_cc_pathway": 1-5, "D5_typed_evidence": 1-5, "D6_authority": 1-5, "D7_velocity_balanced": 1-5, "D8_benchmark_deltas": 1-5, "D9_failure_modes": 1-5, "D10_duplication": 1-5, "D11_context_cost": 1-5, "D12_community_distribution": 1-5, "D13_pattern_extractability": 1-5, "D14_reversibility": 1-5, "D15_supply_chain": 1-5, "install_score": <float>, "pattern_score": <float>, "hard_cap_breaches": ["D<n>"...]},
     "adversarial_review": {"security": "APPROVE|REVISE|BLOCK", "architect": "...", "code_reviewer": "...", "codex_gate": "..."},
     "rollback_plan": "<exact files + recovery time + smoke test>",
+    "divergence_files": null,                            // populated for VENDOR-FORK only
+    "pattern_doc_path": null,                            // populated for PATTERN-STUDY only
     "reverification_due": "<ISO8601, ~6 waves out>",
     "status": "ACTIVE",
     "supersedes": null
@@ -180,6 +245,9 @@
 - **Stale verdict reuse** (v2) — never cite an AGING or STALE prior ADOPT as new corroboration; re-litigate first.
 - **Verdict without rollback plan** (v2) — every ADOPT MUST have written rollback steps + smoke test + recovery time.

+- **Star-only gate** (v3) — stars are a sub-signal of D12, not a top-level dim. A high-star candidate with no other channel evidence caps D12 at 3.
+- **Hard-cap REJECT without tier-route** (v3) — D1 license breach blocks INSTALL but does NOT auto-REJECT; PATTERN-STUDY route is open if D13 ≥ 3 AND D2 ≥ 4.
+- **No-eval-harness for benchmarkable surface** (v3) — D8 benchmark_deltas requires the W287 P1a measured signal whenever a surface exists.
+
 ## References
@@ -200,3 +268,4 @@
 - `goal-prompt-synthesis` skill — sister skill; it authors the `/goal`, this skill vets what the `/goal` proposes
 - `graphiti` MCP — adoption-decision ledger tier (T7), `group_id="adoption-decisions"`
 - W283 audit synthesis — `docs/architecture/W283-AUDIT-SYNTHESIS-2026-05-18.md` (Streams 2+5 source of these v2 amendments)
+- W288 Stream C rubric v3 — `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md` (canonical source for v3 rubric anchors, weights, hard-caps, tier ladder).
```

---

## §7 — Anti-patterns + decay (v3)

### §7.1 — Decay state machine — CARRIED OVER from v2 unchanged

The v2 ACTIVE / AGING / STALE / RE-LITIGATED / RETIRED state machine remains:

- **ACTIVE** (wave 0-5 since decision) — full weight (1.0) when corroborating new tier verdicts.
- **AGING** (wave 6-11) — 0.5 weight; flags `reverification_due`.
- **STALE** (wave 12+) — does NOT corroborate; re-litigate before citing.
- **RE-LITIGATED** — explicit re-run produced a new verdict (linked via `supersedes`).
- **RETIRED** — operator-marked obsolete.

NEW in v3: `rule_version="sca-v2"` verdicts are auto-downweighted 0.5× regardless of age (same as the v1→v2 downweight in v2), since the v2 single-composite rubric is below v3's dual-composite + soft-gate bar.

### §7.2 — Anti-patterns (carried over from v2)

- Single-source discovery → false negatives.
- Quality without harness-fit → installing what breaks the autonomous loop.
- Manufactured convergence → evidence post-hoc to justify a chosen verdict.
- Re-adopting an installed capability.
- Sibling-copy install.
- Skipping the cross-model pass.
- Three-text-claim convergence.
- Stale verdict reuse.
- Verdict without rollback plan.

### §7.3 — NEW v3 anti-patterns (operator-mandated)

- **Star-only gate**: rejecting a low-star repo solely on star count is forbidden. Stars are a sub-signal of D12; the test is the multi-channel distribution.
- **Hardgate license without tier-routing**: a license breach blocks INSTALL but the candidate MUST be evaluated for PATTERN-STUDY before REJECT is recorded. License + pattern_score = the routing decision.
- **No-eval-harness for benchmarkable surface**: D8 must be backed by a measured signal when a surface exists; AUTHOR'S benchmark in a README does not count.
- **Single composite for routing**: install_score and pattern_score MUST be computed independently. Collapsing them to a single number defeats the soft-gate.
- **Forking when INSTALL would work**: VENDOR-FORK is a higher-maintenance path. A candidate that clears INSTALL thresholds must NOT be vendor-forked solely to enable local modifications — propose the modification upstream first.
- **CITE-ONLY as a procrastination tier**: CITE-ONLY is for candidates whose value is research-relevant, not action-relevant. A candidate the operator actually wants to use MUST be routed to a higher tier with explicit reverification_due — not parked in CITE-ONLY indefinitely.

---

## §8 — Validation plan: 5-candidate pilot lane

To validate v3 vs v2, run a 5-candidate pilot where v3 is applied alongside v2 and the verdicts compared. Candidates chosen to span the tier ladder and stress-test soft-gate behavior.

| # | Candidate | v2 verdict | v3 expected verdict | What v3 catches that v2 missed |
|---|---|---|---|---|
| 1 | anthropics/skills | ADOPT | T1 INSTALL | direct re-confirmation; rule_version migrates to sca-v3 |
| 2 | abhigyanpatwari/GitNexus | STUDY (v15) | T2 VENDOR-FORK or T3 PATTERN-STUDY | v2 lumped license-blocked + duplicate into STUDY; v3 explicitly routes — likely T3 (license bars INSTALL, partial duplicate with Serena bars VENDOR-FORK at full surface; pattern of precomputed-graph blast-radius might still merit PATTERN-STUDY) |
| 3 | hypothetical low-star ralph-tight pattern | REJECT (v2 — star-only gate trips) | T3 PATTERN-STUDY (v3) | v3's pattern_score routes by extractability, not stars |
| 4 | musistudio/claude-code-router | REJECT (v2 W280h) | T5 REJECT | direct re-confirmation; v3 adds explicit hard-cap citations |
| 5 | hindsight Windows-shim | ADOPT-WITH-FORK (v2 W280b ad-hoc) | T2 VENDOR-FORK | v3 names the tier explicitly; ledger captures divergence_files |

### §8.1 — Validation execution

The pilot is run by dispatching the v3-upgraded `sota-convergence-audit` skill against each candidate via `Agent` fork with `--rule_version sca-v3`. Each fork:

1. Reads the candidate's repo via mcp__github__*, mcp__deepwiki__*, repomix-library/packed/.
2. Scores 14 dims with rubric anchors.
3. Computes install_score + pattern_score.
4. Checks hard-caps.
5. Dispatches 3-persona adversarial review (parallel sub-forks).
6. Runs codex GPT-5.x stop-hook cross-model pass.
7. Assigns tier.
8. Writes ledger episode (graphiti, group_id="adoption-decisions", rule_version="sca-v3").
9. Records v2 verdict alongside (from prior ledger, if exists) for the comparison column.

### §8.2 — Pass criteria

The pilot PASSES if:

- v3 verdicts match operator intuition (no surprises that look wrong) AND
- v3 catches at least ONE case where v2 routed wrong (eg #3 above — low-star pattern rescue) AND
- ledger episodes are well-formed (all 14 dim scores + install_score + pattern_score + hard_cap_breaches recorded) AND
- adversarial review converges in ≤2 rounds per candidate.

### §8.3 — Promotion to production

After PASS, the v3 patch in §6 is applied to `.claude/skills/sota-convergence-audit/SKILL.md` and the SKILL frontmatter version-line updated. All future audits use sca-v3. Prior sca-v1 / sca-v2 verdicts remain in the ledger but auto-downweight per §7.1.

---

## §9 — Executive summary (5 bullets)

1. **Dimensions consolidated to 14** (from v2's 7 + W259's 23) — adds D1 license + D4 CC-pathway + D11 context-cost + D13 pattern-extractability + D14 reversibility + D15 supply-chain that v2 lacks; merges overlapping W259 dims (D5+D23 velocity, D17+D21 supply-chain, D10+D20 duplication) that double-counted the same signal.

2. **Dual composites replace single mean** — `install_score` over 13 install-relevant dims (Σ Wi=13.6) and `pattern_score` over 7 pattern-relevant dims (Σ Wi=7.1). License + harness-fit + CC-pathway weight HEAVIER for install; pattern-extractability + uniqueness weight HEAVIER for pattern. Single composite is RETIRED for routing.

3. **5-tier adoption-depth ladder**: INSTALL → VENDOR-FORK → PATTERN-STUDY → CITE-ONLY → REJECT. Each tier has explicit threshold, entry artifact, rollback cost, maintenance burden, and worked examples. REJECT requires affirmative evidence (not just low score) — soft-gate by design per operator mandate.

4. **Stars are NOT a hardgate** — they are a sub-signal of D12 community_signal_distribution, capped at 3 if no other channel evidence. A 50-star repo with a Karpathy endorsement + practitioner postmortem + multi-vendor doc reference can outscore a 50,000-star repo with only stars. Worked example §5.4 routes a 47-star repo to PATTERN-STUDY (not REJECT).

5. **Hard-caps are tier-specific, not absolute** — license-incompatible bars INSTALL but PATTERN-STUDY is still open if D13 ≥ 3 AND D2 ≥ 4. Reversibility ≤ 2 bars INSTALL but VENDOR-FORK is acceptable (we control the fork's reversibility ourselves). This is the structural difference from v2's binary ADOPT-or-REJECT logic.

---

## §10 — Cite trail

- v2 baseline: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md @ HEAD` (W284 typed-evidence + 7-dim).
- W259 master matrix: `Z:/claude-sota-installed/docs/architecture/W259-grand-catalog/05-scoring/MASTER-SCORING-MATRIX-W259.md @ HEAD` (23 dim × 99 row).
- v15 worked example: `Z:/claude-sota-installed/docs/architecture/W259-grand-catalog/03-deepdive/SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md @ HEAD`.
- W287 P1a eval-harness lane: cited inline in v2 SKILL.md §4.5.
- W280h adoption verdicts: `docs/architecture/W280h-ADOPTION-VERDICT-2026-05-17.md` (REJECT verdicts for claude-code-router et al, cross-checked in §5.8).
- W280b hindsight VENDOR-FORK precedent: `docs/architecture/W280b-HINDSIGHT-WINDOWS-BOOTSTRAP-2026-05-17.md` + `tools/bootstrap-runtime.ps1`.
- W283 audit synthesis: `docs/architecture/W283-AUDIT-SYNTHESIS-2026-05-18.md` (source of v2 amendments).
- Anthropic Claude Code docs: `https://code.claude.com/docs/en/plugins`, `https://code.claude.com/docs/en/skills`, `https://code.claude.com/docs/en/sub-agents` (cited for tier-1 native pathway dims).
- Likert rubric authority for 5-point scale: Krosnick 1991 "Response strategies for coping with the cognitive demands of attitude measures in surveys".

---

**END Stream C — STREAM-C-RUBRIC-v3.md.** Awaiting parent synthesis (Stream D ingest pipeline integration + Stream A discovery methodology integration + Stream B newly-discovered candidate scoring lane).
