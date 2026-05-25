# W388 — Minimal-Core SOTA-Ship + Advanced Quality-Gates + Parallel Autonomous Merge — v2 (codex-revised)

> Synthesis of 5 research streams (A minimal-core · B quality gates · C parallel merge · D clean-seed · E layer-adoption) + codex r1 comprehensive review (REVISE@0.89, 14 findings — all folded into v2). Builds on W387 (LIVE+PROVEN): repo ruleset on main + fail-closed Codex-Verdict gate + clean `--auto` merge (#50/#51); required_signatures OFF until SSH-key reg; CI-defect fixed. Plan = GitHub Pro (no Enterprise/GHAS/merge-queue). Git history has LEAKED CREDS (rotation waived — safe iff repo stays private + publish is orphan-export only).
> CAVEAT: Stream E arXiv cites UNVERIFIED — patterns adopted, not paper-claims (CR-6).

## §1 STRATEGIC SPINE — go PUBLIC via orphan-export (wording tightened, codex r1#3)
- **Shipping a minimal clean core as a PUBLIC repo unlocks the listed GitHub Code Security / Secret Protection features for FREE on public:** CodeQL code-scanning + SARIF→Security-tab, dependency-review, secret-scanning alerts + push-protection (these are free on PUBLIC; NOT "free GHAS" generically). SOTA open-governance posture; maxes OpenSSF Scorecard.
- **Leaked-cred history stays PRIVATE.** Public repo = ORPHAN-EXPORT (new object store, ZERO private objects reachable — structural). No history ever pushed.
- **Merge Queue:** public **ORG** repo only (NOT public-personal, NOT Pro-private). → if MQ wanted, operator creates an org; else Pro-native parallel (§4).
- **GitHub artifact attestations:** PUBLIC-only on Free/Pro/Team (codex r1#8, corrects Stream B) → defer to Phase 2; keep non-GitHub SLSA provenance meanwhile.

## §2 THE MINIMAL CORE — as a computed CI-CLOSURE MANIFEST (codex r1#6,#7)
NOT a hand-picked list. **Generate the seed allowlist as the transitive closure of what CI + tooling actually references**, parsed from: every `.github/workflows/*.yml`, `package.json` scripts + `package-lock.json`, `.pre-commit-config.yaml` (ALL hook entry-points incl. lint-check.mjs, precommit-msys-hooks-form.mjs, preagent-wave-lock-guard.mjs, provenance-lint-v3.mjs, codex-trailer-gate.mjs, test files), `CODEOWNERS` paths, and the binding-gate tools. Either INCLUDE every referenced file OR rewrite the workflow before seeding (a referenced-but-missing file = broken seed CI).
- **CORE categories:** .github/{all workflows + CODEOWNERS + templates + dependabot.yml + SECURITY.md} · CLAUDE.md (≤50LOC, SCRUBBED) · .mcp.json (TEMPLATED) · .claude/settings.json (env-STRIPPED) · the publishable allowlist MOVED to `.claude/subagent-type-allowlist.json` or `schemas/` (NOT under .claude/state — high-risk root) · schemas/ · 6 anchor skills · .pre-commit-config.yaml + ALL its referenced hook scripts · package.json + package-lock.json · all linting manifests · essential docs · dotfiles.
- **DEFER (layer merges):** full skills→L8 · sota-discovery→L2 · harness/eval→L5 · etc.
- **EXCLUDE:** .claude/state/ (runtime/quota/gateguard) · tmp/ · the 6,600-file wave-history.
- **WAVE-HISTORY archive (codex r1#2 — DANGER fix):** keep PRIVATE-only (a `history` branch in the PUBLIC repo must NEVER be created from the leaked DAG — that defeats orphan-export). If a public archive is ever wanted, it must be a SEPARATE sanitized new-object orphan-copy that passes the §5 secret gate.
- STRUCTURE: flat-monorepo + path-scoped CODEOWNERS. VERSIONING: release-please v4.

## §3 QUALITY GATES — RE-PRIORITIZED (codex r1#5): governance/integrity FIRST, coverage second
Existing W387: pre-commit (gitleaks/ruff/shellcheck/cite-floor/cr2/…), CodeQL js-ts+python, commitlint, Codex-Verdict binding gate, zizmor, actionlint, harden-runner, trivy, scorecard, dependabot.
**TIER-0 first-order (the real #1 gaps for a 94%-config agent repo):**
- required-check COMPLETENESS + ownership/contract enforcement (the §6 integration-contracts + OWNERSHIP gate) · secret-clean-seed gate (§5) · **action SHA-pin enforcement** (`pinact` or zizmor unpinned-uses, codex r1#12) · least-privilege `permissions:` linting + NO `pull_request_target`-with-checkout · workflow-security (poutine — poisoned-pipeline, path-filter .github/**).
**TIER-1 add-now (free, Actions-runnable, autonomous):** diff-coverage via **local `diff-cover` + coverage XML** (NOT Codecov — codecov private upload needs an operator CODECOV_TOKEN + SaaS decision, codex r1#4) · TruffleHog-CI `--only-verified` · OSV-Scanner v2 (call-graph) · knip (TS dead-code) · typos/cspell + markdownlint.
**NIGHTLY:** Stryker/mutmut mutation · lychee · vale · pytest-benchmark · Scorecard-threshold.
**OPERATOR/PUBLIC-gated:** Codecov SaaS statuses (token) · GHAS gates (CodeQL-SARIF, dependency-review un-`continue-on-error`, secret-scanning push-protection — activate on PUBLIC) · GitHub artifact attestations (public).
**TIERING:** fast(<45s, composite, 1 status) / medium / nightly. concurrency cancel-in-progress. `on: merge_group` ONLY when MQ enabled (public-org; codex r1#13 — add a transition checklist that updates EVERY required workflow before enabling MQ).

## §4 PARALLEL AUTONOMOUS MERGE (Pro-native; Mergify OPTIONAL — codex r1#9)
- **Tier 1 = CANONICAL (NOW, $0, W387-PROVEN):** worktree-per-agent + `gh pr merge --squash --auto` + STRICT file-ownership (disjoint→conflict-free rebase) + serialized orchestrator + `--force-with-lease` + `mergeStateStatus`→`update-branch` polling. NO required check may depend on a third party.
- **Tier 2 = OPTIONAL (operator, after permission-review + dry-run):** Mergify free app (`.mergify.yml`: batch/rebase/speculative) — a 3rd-party app with WRITE authority + free-tier limits + config-drift risk; add ONLY after review, and never as a required-check dependency.
- **DEPENDENT layers:** `git spr` (squash-compatible) bottom-up; ghstack incompatible with squash-only. INDEPENDENT → parallel auto-merge.
- **Tier 3:** public-ORG native Merge Queue (operator).

## §5 CLEAN-SEED — split guarantee + SCRUB, not just scan (codex r1#1)
- **GUARANTEED: structural zero-HISTORY carryover** (orphan-export, new object store).
- **BEST-EFFORT only: current-file cleanliness** — scanners do NOT prove allowlisted configs/launchers are clean (low-entropy literals, local proxy keys, internal URLs, private paths in eee.ps1 / .claude/settings.json / .mcp.json / bin/eee.cmd can pass entropy tools). REQUIRED before publish: (a) **SCRUB/TEMPLATE every allowlisted config + launcher** (env-interp `${VAR}`, strip private paths/localhost service keys/account IDs); (b) **deterministic DENY rules** for literal `*_TOKEN`/`*_KEY`/`*_SECRET`/`AUTH`/private-paths/localhost-keys; (c) the secret scan — the AUTONOMOUS bar (Phase 1) = **2-tool: gitleaks + trufflehog `--results=verified,unknown --fail`** + the (b) deny-rules, NO inherited excludes, on the FINAL seed; ggshield (3rd tool) needs an operator `GITGUARDIAN_API_KEY` → added at operator Phase-0b/2 (codex r2); (d) manual operator eyeball of the (small) seed.
- Pipeline: fresh bare clone → orphan init → CI-closure-manifest allowlist rsync → scrub/template → deny-rules + 3-tool gate → author LICENSE/README/SECURITY → commit → **create empty public repo → enable security settings FIRST → then push** (codex r1#14, front-load settings) → push-protection on. Ongoing: scheduled private-repo Action, delta-commit, gate-before-every-push.

## §6 SELF-EVOLVING LAYER-ADOPTION — DUAL review (codex r1#10)
Layers as RELEASE ARTIFACTS: DISCOVER(sca-v22) → RC-synthesize (layer-agent, worktree, file-ownership, symptom-spec) → **FLIP-CENTERED GATE** (`flip=(fail→pass)−K·(pass→fail)`, K≥3; harness/eval_harness.py) → **TWO codex reviews: (1) code-AWARE adversarial review [reads the diff — security/maintainability/complexity; this is the CURRENT codex gate] + (2) implementation-blind flip/outcome review [anti-fabrication]** → squash-merge → POST-MERGE regression-scan + DRIFT-CONTROL auto-pause. Experience-pool (T6+Langfuse); integration-contracts.json (out-of-namespace diff → BLOCK); OWNERSHIP.json/wave. Decay-prevention: flip-gate + synthetic-sweep + 5-wave re-audit + complexity-budget.

## §7 PHASED PLAN — Phase 0 SPLIT into autonomous vs operator (codex r1#11)
**Phase 0a — AUTONOMOUS now (author + add-to-ruleset via admin PAT, through W387 clean-merge):** author the TIER-0 + TIER-1 gate workflows (pinact/perms-lint, poutine, trufflehog-CI, osv-scanner-v2, knip, diff-cover-local, typos, markdownlint) + add the green ones to the ruleset's required checks (admin-PAT — I can do this); the layer-adoption scaffold (integration-contracts.json, OWNERSHIP.json schema, flip-gate harness mode); generate the CI-CLOSURE manifest. NO external SaaS.
**Phase 0b — OPERATOR-gated external enforcement:** Codecov token + SaaS · Mergify app install · GitGuardian/ggshield key · (any repo-setting beyond ruleset).
**Phase 1 — AUTONOMOUS clean-seed DRY-RUN (no push):** build the §5 pipeline (closure-manifest → scrub → deny-rules → 2-tool gate [gitleaks + trufflehog]; ggshield added at Phase 0b/2 per codex r2); produce the seed locally; verify the gate passes; do NOT create/push the public repo.
**Phase 2 — OPERATOR-gated PUBLISH:** create public repo (+ org for MQ) → enable security settings → SSH-key reg (re-adds required_signatures) → optional two-App split → run Phase-1 for-real → push seed → GHAS gates activate.
**Phase 3 — continuous self-evolving layer-adoption (§6).**

## §8 RESIDUALS (updated)
Stream E cites unverified · GHAS/attestations/MQ require PUBLIC (+ORG for MQ) — operator-gated · required_signatures OFF until SSH-key · Codecov/Mergify/ggshield need operator (SaaS/app/key) · current-file secret-cleanliness is best-effort+scrub, NOT a guarantee · the two-App anti-fabrication split is the operator ceiling. Phase 0a + Phase 1 are autonomous-now; the rest is operator-gated.

## §9 Sources (multi-org — research streams A–E + codex r1/r2)
- GitHub Code Security / rulesets / merge-queue / attestations — https://docs.github.com/en/code-security
- OpenSSF Scorecard (gate + posture) — https://github.com/ossf/scorecard
- Poutine (poisoned-pipeline workflow scan) — https://github.com/boostsecurityio/poutine
- OSV-Scanner v2 (call-graph reachability SCA) — https://github.com/google/osv-scanner
- pinact (action SHA-pin enforcement) — https://github.com/suzuki-shunsuke/pinact
- knip (TS dead-code) — https://github.com/webpro-nl/knip
- git-spr (squash-compatible stacked PRs) — https://github.com/ejoffe/spr
- TruffleHog (verified-secret scan) — https://github.com/trufflesecurity/trufflehog
- SLSA provenance levels — https://slsa.dev/spec/v1.0/levels
