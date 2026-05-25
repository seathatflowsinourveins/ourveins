# Contributing — claude-sota-installed

> Per W333.5 Stream 5 — wave-architecture contributor contract. Skim before first PR.

This is a PRIVATE single-operator runtime. Contributions enter via PR → main with mandatory codex GPT-5.5 cross-model review (W331 P0.7 AUTHORITY).

## §1 Six Cardinal Rules (R1-R6 contract — every PR must hold)

Per `CLAUDE.md` L13-L17:

| Rule | What it enforces | Mechanical gate |
|---|---|---|
| **R1** | Install primitives only from trusted plugins/skills/agents; trust-tuple = SLSA-L3/npm-provenance/Sigstore + license MIT/Apache/BSD/ISC/MPL + commit-age + dep blast-radius | `actions/dependency-review-action` in `ci.yml` (deny AGPL/SSPL) |
| **R2** | Hooks = upstream-plugin OR direct-CLI; NO project-owned `.claude/hooks/**` >2 KB except sanctioned bug-patch shim cite-anchored to GH issue | `.pre-commit-config.yaml:cr2-2kb-hooks` |
| **R3** | Subagent `subagent_type` MUST be in `.claude/state/subagent-type-allowlist.json` | `tools/preagent-subagent-validator.mjs` exit-2 |
| **R4** | Project behavior in CLAUDE.md + settings.json; `.claude/rules/*.md` only if upstream-shipped OR operator-curated SKILL.md-gated | `self_invented_count: 0` invariant |
| **R5** | Safety via CC permissions + 5-control layered-defense (deny + audit-log + redaction + egress + drift) | `settings.json:permissions.deny` enumeration |
| **R6** | Verify-before-claim — every DONE cites independent probe (test exit code / command stdout / codex verdict / operator-sign) | PR template checkbox + codex-review.yml gate |

## §2 Conventional Commits (commitlint-blocking)

```
<type>(<scope>): <subject>

<body — lines ≤200 chars, blank line above>

<footer>
```

Allowed types (per `.commitlintrc.json`):

`feat` · `fix` · `docs` · `style` · `refactor` · `perf` · `test` · `chore` · `ci` · `build` · `revert` · `wave` (🌊 wave-architecture decisions) · `ship` (🚀 wave-closure)

Subject ≤120 chars. Body line max 200. No PascalCase/UPPER subjects.

Use `cz` (`commitizen` installed via `uv tool install commitizen`) for interactive guidance.

## §3 Wave-architecture process

Each wave is a self-contained P0..Pn closure. The flow:

1. **Author the `/goal`** — use `goal-prompt-synthesis` skill (sca-v13 §1-§7); paste ≤3800 chars
2. **Set `/goal` to lock the Stop-hook** — hook blocks `stop` until condition holds
3. **4-stream parallel agent-teams dispatch** — per W269 mandate, 2+ Agent calls in 1 message for multi-stream contexts
4. **Per-stream skeleton-first** — Δ-PDM-1 protocol: skeleton-file at start; iterative Edit until budget cap; STATUS sentinel on partial
5. **Wave-closure synthesis** — `docs/architecture/W<N>-SHIP/CLOSURE-SYNTHESIS.md` with VERDICT-LEDGER row
6. **Wave-closure tag** — `git tag W<N>-ship-<date>`; triggers `provenance.yml` (SLSA L3 + Sigstore)
7. **Operator-sign or codex APPROVE** — per W331 P0.7 cross-model gate

## §4 PR review gate semantics

Per W331 P0.7 FRONTIER-PEER POLICY:

- **codex GPT-5.5 = AUTHORITY** on adversarial review (fires via `codex-review.yml` on PR open)
- **Sonnet 4.6 = tie-breaker** when codex round-1 + round-2 diverge
- **Local Ollama = cheap-triage-ONLY**, NOT adversarial-review authority

Verdicts: `APPROVE` / `REVISE` (operator absorbs; re-dispatch) / `NEEDS-REVISION` (blocks merge) / `BLOCK` (reject).

Position-swap re-invocation MANDATORY for T1-equivalent ship decisions (defeats position-bias per MT-Bench + JudgeLM 3-org convergence).

## §5 sca-v13/v14 framework for new-primitive adoption

ANY new install / vendor-fork / pattern-extract MUST pass:

1. **Stage-0 existence probe** (≥2 distinct source families per sca-v13 §1)
2. **Stage-0.5 ENUMERATION-BYPASS** if search-family + >1000 results (per §1.5)
3. **Phases 1-6** (multi-MCP cascade → triangulation → anti-bias → weighted-sum → 5-gate → codex round)
4. **D-EMP HARD GATE** ≥1 (empirical-viability smoke-test before T1-claim)
5. **3-org-distinct cite-anchors per score≥4** (Meta-Invariant I1)
6. **Honest-state tagging** OPERATIONAL / ASPIRATIONAL / REFERENCE-ONLY

Cite-anchor inflation (citing aspirational refs as operational) is forbidden — `codex-review.yml` prompt explicitly flags `inspect_ai`/`Sigstore`/`SLSA`/`GEPA`/`Memento-II`/`AutoSOTA` when claimed operational without harness/cron/CI evidence.

## §6 Pre-commit gates (must all pass; CI mirrors locally)

```yaml
- gitleaks                       # secrets
- trivy fs (HIGH/CRITICAL)       # CVE scan on push/commit
- ruff check / ruff format       # Python
- shellcheck                     # Bash
- provenance-lint-v3             # cite-anchor density
- cr2-2kb-hooks                  # R2 mechanization
- actionlint-system              # YAML lint
- zizmor (high-severity)         # workflow supply-chain
- commands-no-retired-memory-ns  # W333 P0-3 regression guard
- commitlint                     # Conventional Commits
```

Run locally: `pre-commit run --all-files`.

## §7 Local dev tools

- `act` (winget `nektos.act`) — local GH Actions runner; test before push
- `cz` / `commitizen` (uv tool) — interactive Conventional-Commits authoring
- `gitleaks`, `trivy`, `actionlint`, `zizmor` — already wired via pre-commit

## §8 Wave-architecture submission

For a wave-N P0:

```bash
# 1. Branch
git checkout -b goal/W<N>-<descriptor>

# 2. Author work
# ... edits + commits with wave(W<N>): / feat(W<N>-P<X>): / ship(W<N>): types

# 3. Pre-push verification (R6)
pre-commit run --all-files
node tools/parallel-ratio-telemetry.mjs --window 30d   # sanity probe

# 4. Push + open PR
git push -u origin goal/W<N>-<descriptor>
gh pr create --base main --head goal/W<N>-<descriptor>

# 5. Watch codex-review.yml fire (needs OPENAI_API_KEY repo secret)

# 6. Address codex VERDICT, then iterate or merge
```

## §9 Honest-state declaration

PR description MUST tag each new tool/service/dep as:
- `OPERATIONAL` — verified-via-probe; functioning in runtime today
- `ASPIRATIONAL` — planned for wave-N+, with explicit P0-action ID
- `REFERENCE-ONLY` — read-only research cite; never to be wired

Inflation (aspirational-as-operational) = codex VERDICT: REVISE.

## §10 Rollback

Every PR must include a 1-paragraph rollback plan. If the change breaks production, the rollback path must be ≤5 commands to safety.

For destructive operations: explicit confirmation in PR body + reviewer approval.

## §11 Cite — discipline anchors

- `CLAUDE.md` — root contract
- `.claude/skills/sota-convergence-audit/SKILL.md` — sca-v13/v14 rubric
- `.claude/skills/ops-rhythm/SKILL.md` — 3/5/8-wave dwell escalation
- `.claude/skills/parallel-dispatch-mandate/SKILL.md` — W269 multi-stream
- `.claude/skills/goal-prompt-synthesis/SKILL.md` — /goal authoring
- `docs/architecture/W<N>-*/CLOSURE-SYNTHESIS.md` — per-wave audit trail
- `https://www.conventionalcommits.org/en/v1.0.0/`
- `https://slsa.dev/spec/v1.0/levels#build-l3`
- `https://docs.sigstore.dev`
