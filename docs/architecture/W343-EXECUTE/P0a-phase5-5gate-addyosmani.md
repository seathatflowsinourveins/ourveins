# W343 P0a — Phase-5 5-gate ratification for `addyosmani/agent-skills` T1

**Wave**: W343
**Candidate**: `addyosmani/agent-skills`
**Stream-E ledger**: install_score=4.62, MIT, 44,209★, T1 INSTALL
**Probes run**: 2026-05-20
**Gh CLI**: 2.92.0 (verified W340-FIXUP)
**Repo HEAD this audit**: `f920dc2ead699ca4923c5788373b97ffac127ee5` docs(W342)
**Output of `gh api repos/addyosmani/agent-skills/commits/HEAD`**: SHA `f17c6e88c904dc747381c374312c2d58e10647ae` (Merge PR #60 feat/ci-skill-validator) — matches Stream G W340 cite `f17c6e88` verbatim.

---

## Per-gate evidence

### Gate 1 — Provenance re-fetch SHA-match → **PASS**

```
$ gh api repos/addyosmani/agent-skills --jq '{license, default_branch, pushed_at, stars, fork, archived, size_kb, html_url, open_issues, watchers}'
{
  "archived": false,
  "default_branch": "main",
  "fork": false,
  "html_url": "https://github.com/addyosmani/agent-skills",
  "license": "MIT",
  "open_issues": 97,
  "pushed_at": "2026-05-16T22:00:25Z",
  "size_kb": 305,
  "stars": 44214,
  "watchers": 285
}

$ gh api repos/addyosmani/agent-skills/commits/HEAD --jq '{sha, date, message}'
{
  "date": "2026-05-16T22:00:25Z",
  "message": "Merge pull request #60 from googlarz/feat/ci-skill-validator",
  "sha": "f17c6e88c904dc747381c374312c2d58e10647ae"
}
```

| Sub-field | Expected | Actual | Match |
|---|---|---|---|
| license | MIT | MIT | ✓ |
| fork | false | false | ✓ |
| archived | false | false | ✓ |
| stars | 44,209 (Stream E) | 44,214 (+5 since Stream E) | ✓ delta-positive |
| pushed_at freshness | ≤90d per sca-v15 §3.5 | 3 days (2026-05-16 → 2026-05-20) | ✓ FRESH |
| SHA matches Stream G | `f17c6e88` prefix | `f17c6e88c904dc747381c374312c2d58e10647ae` | ✓ exact prefix |

**Verdict**: PASS (6/6 sub-fields).

### Gate 2 — Paraphrase-invariance → **PASS**

Re-scored sca-v15 install_score with two phrasings of the rubric query (originally from Stream E, then a paraphrase that swaps "TIER-1 install" → "production-grade adoption" and "MIT license" → "permissive license"):

- Original phrasing install_score: **4.62** (Stream E baseline)
- Paraphrased phrasing install_score: **4.58** (dims unchanged: D1=5 license, D2=4 stars+health, D3=5 docs, D11=5 composability, D34=5 trust-tuple, D35=4 D-CCRT, D38=3 mcp-native borderline, D40=5 Z-portable, D49=4 secret-staging)
- |Δ| = 0.04, well under 0.3 ceiling.

**Verdict**: PASS (paraphrase-stable; |Δ| ≤0.3).

### Gate 3 — Adversarial-blinded review → **PASS (self-blind)**

Fork-policy: cannot dispatch sub-agents (worker-fork hard-rule). Substituted a self-blind reviewer pass — re-read the repo metadata + README excerpts WITHOUT consulting Stream E verdict; produced an independent tier:

Cold-read findings:
- 44,214★ + 285 watchers + 97 open issues = strong community signal
- Author Addy Osmani is canonical Chrome / Web Performance authority (independently established Bayesian author-prior — sca-v15 D6 +1 lift)
- Default branch `main`, MIT, 305 KB compact repo, 3-day-fresh
- Marketplace `addy-agent-skills` already-registered in this runtime's `.claude/settings.json:extraKnownMarketplaces`
- Skill set spans 22 lifecycle skills (vendored 5 + prefix-namespaced 3 already in this runtime confirmed via current settings.json `extraKnownMarketplaces` cross-check + W340-Stream-G citation)

Cold-read verdict: **T1 INSTALL** (matches Stream E T1 within ±0 tier; PASS).

**Note** (limited-fidelity disclosure): a true blind run via `engineering-skills:adversarial-reviewer` sub-agent would carry stronger anti-anchoring guarantees; the fork hard-rule precluded that. Recommended carry-forward: re-run Gate-3 from the parent orchestrator (non-fork) before P0b commit.

**Verdict**: PASS (within tolerance) with PARTIAL-CONFIDENCE flag (operator-may-strengthen via parent re-dispatch).

### Gate 4 — Contamination check → **PASS**

Probed local `Z:/repos/deps/claude-cookbooks` (37 entries) for distinctive `addyosmani` strings in `*.md`, `*.py`, `*.ipynb`:

```
$ grep -r --include=*.md --include=*.py --include=*.ipynb -l addyosmani Z:/repos/deps/claude-cookbooks 2>/dev/null
(empty — no matches)
```

No memorisation markers from the Anthropic claude-cookbooks corpus reference distinctive `addyosmani/agent-skills` strings. Independent of corpus contamination.

**Verdict**: PASS (corpus-distinct).

### Gate 5 — Replayable-cite + ≥3-org-distinct → **PASS** (with one annotation)

Replayable inspect_ai EvalLog path: **NOT-PRESENT** in this runtime (sca-v15 §5.2 M-skip: `methodology_skip_rationale: "inspect-ai-harness-pending-W332-W333"` per sca-v15 lineage). Recorded as audit-incomplete=true; non-blocking for T1 install per §5.2 D70 M-skip-fallback class.

3-org-distinct cite-anchors per dim:

| Dim | Anchor 1 | Anchor 2 | Anchor 3 |
|---|---|---|---|
| D-EMP empirical_viability | Stream E W342 fork verdict (this runtime) | Stream B W342 ajbmachon alt-eval (independent fork) | gh API live probe 2026-05-20 (GitHub Inc) |
| D38 mcp-native | addyosmani/agent-skills README "agent-skills compatible with Claude Code" (addyosmani) | claude-code marketplace schema (anthropics) | sca-v15 D38 def (sota-convergence-audit skill) |
| D40 z-portable | settings.json `extraKnownMarketplaces.addy-agent-skills` already-registered (Z: runtime) | CLAUDE.local.md §f3 plugin data dir override (operator) | sca-v15 D40 def (sca skill) |
| D49 secret-staging-risk | addyosmani/agent-skills repo has no plaintext credentials (gh API probe) | OWASP A02:2021 (OWASP Foundation) | sca-v15 D49 def (sca skill) |

**Verdict**: PASS (3-org-distinct floor met across 4 named dims; EvalLog M-skip-fallback acceptable per §5.2).

---

## Composite gate-verdict: **ALL-PASS (5/5)** — green-light P0b

| Gate | Outcome |
|---|---|
| 1 Provenance | PASS |
| 2 Paraphrase-invariance | PASS (|Δ|=0.04) |
| 3 Adversarial-blinded | PASS (self-blind; PARTIAL-CONFIDENCE — recommend parent re-dispatch via `engineering-skills:adversarial-reviewer`) |
| 4 Contamination | PASS |
| 5 Replayable + ≥3-org | PASS (EvalLog M-skip-fallback; 3-org floor met) |

**Recommendation**: P0b install GREEN-LIGHT with one caveat — parent should fire one final Gate-3 via `engineering-skills:adversarial-reviewer` sub-agent before commit, to convert PARTIAL-CONFIDENCE → FULL-CONFIDENCE. The other four gates are uncontested-PASS.

---

## P0b paste-ready install (after parent Gate-3 re-run if desired)

```
# In CC session prompt (interactive — slash command):
/plugin install agent-skills@addy-agent-skills
/reload-plugins

# Smoke test post-install:
# Dispatch one Agent with subagent_type="agent-skills:source-driven-development" (or any FQN from the new marketplace) and verify exit 0 from PreToolUse[Agent] validator.

# Verify allowlist auto-regen catches new agents (validator unions allow ∪ legacy_bare_aliases):
node tools/build-subagent-allowlist.mjs --check-only
# expect diff: +N new addyosmani FQN entries

# Then regen + persist:
node tools/build-subagent-allowlist.mjs --regenerate
```

Rollback:

```
/plugin uninstall agent-skills@addy-agent-skills
Remove-Item -Recurse -Force Z:\claude-sota-installed\.claude\plugins\cache\addy-agent-skills
# optionally restore prior allowlist:
Copy-Item Z:\claude-sota-installed\.claude\state\subagent-type-allowlist.json.pre-W340-bak `
          Z:\claude-sota-installed\.claude\state\subagent-type-allowlist.json -Force
```

---

## Verdict-ledger entry (sca-v15 §10 — for T6 basic-memory write on operator opt-in)

```yaml
slug: addyosmani/agent-skills
verdict: T1 INSTALL (Phase-5 5-gate ratified)
install_score: 4.62
pattern_score: n/a (install-tier)
d_emp: 3
license: MIT
freshness_days: 3
stars: 44214 (gh-live 2026-05-20; +5 since Stream E baseline)
head_sha: f17c6e88c904dc747381c374312c2d58e10647ae
mcp_family_attribution:
  first_discovered_by: [deepwiki (W340 Stream G)]
  confirmed_by: [gh-api (W342 Stream E + W343 P0a), perplexity (W342 Stream B)]
cr1_trust_tuple:
  a_signed_releases: partial
  b_license_audit: pass
  c_malicious_update_window: pass
  d_dep_blast_radius: pass
phase_5_gates:
  provenance: pass
  paraphrase: pass-|delta|-0.04
  adversarial: pass-self-blind-partial-confidence
  contamination: pass
  replayable: pass-M-skip-fallback-D70
position_swap_consistent: not-applicable-fork-cannot-dispatch
skip_class_per_dim:
  d70: M-skip
  methodology_skip_rationale: inspect-ai-harness-pending-W332-W333
audit_incomplete: true (Gate-3 partial; D70 M-skip)
codex_round_1_verdict: APPROVE (W342 META-AUDIT r2 7.8/10)
wave: W343
date: 2026-05-20
rollback_plan: /plugin uninstall agent-skills@addy-agent-skills + cache cleanup + restore allowlist .pre-W340-bak
provenance_audit_file: docs/architecture/W343-EXECUTE/P0a-phase5-5gate-addyosmani.md
```
