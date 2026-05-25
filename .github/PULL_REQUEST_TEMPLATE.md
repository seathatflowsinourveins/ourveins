# Pull Request — Wave-Architecture Compliance

## Cardinal-Rule Compliance (CLAUDE.md L13-L17)

- [ ] **R1** — Install primitives from trusted plugins/skills/agents only; trust-tuple (SLSA-L3 / npm-provenance / Sigstore + license MIT/Apache/BSD/ISC/MPL + commit-age + blast-radius) verified for new dependencies
- [ ] **R2** — Hooks = upstream-plugin OR direct-CLI; NO new project-owned `.claude/hooks/**` >2 KB (sanctioned exception requires GH-issue cite-anchor)
- [ ] **R3** — Subagent dispatches use `subagent_type` from `.claude/state/subagent-type-allowlist.json` (307 entries)
- [ ] **R4** — Project behavior in CLAUDE.md + settings.json; no ad-hoc `.claude/rules/*.md`
- [ ] **R5** — Safety via CC permissions + 5-control layered-defense; no new custom guard scripts outside sanctioned `tools/`
- [ ] **R6** — Every DONE claim cites independent probe (test exit code / command stdout / codex verdict / operator sign)

## sca-v13 D-EMP HARD GATE

- [ ] D-EMP empirical_viability ≥1 — smoke-tested in-runtime before claiming T1/T1-PROV/T2
- [ ] If D-EMP=0, candidate routed to T3-or-lower (no install path)

## Cite-Anchor Discipline (Meta-Invariant I1)

- [ ] ≥3 org-distinct cite-anchors for any claim score ≥4 on D2/D5/D9
- [ ] Honest-state tagging: tools/services explicitly tagged **operational** vs **aspirational** vs **reference-only**
- [ ] No inflation: aspirational refs (inspect_ai harness pending W333, Sigstore not yet wired, SLSA L3 not yet wired, GEPA nightly cron pending W333+) not cited as operational
- [ ] Cite-anchor refresh: if CCBP / Anthropic docs cited, HEAD-SHA verified within last 7 days

## Parallel-Dispatch Compliance (W269)

- [ ] If PR involves 2+ independent workstreams, dispatch evidence shows 2+ Agent calls in ONE message (not serial)
- [ ] No silent-fallback to solo serial dispatch

## Pre-commit Gate (must all pass; CI will block on red)

- [ ] gitleaks (no secrets in diff)
- [ ] trivy (no HIGH/CRITICAL CVE for `git push` / `git commit` / `gh pr create` paths)
- [ ] ruff (Python lint clean)
- [ ] shellcheck (Bash lint clean)
- [ ] provenance-lint-v3 (≥3 org-distinct cite-anchors per claim)
- [ ] cr2-2kb-hooks (no `.claude/hooks/**` >2KB)

## codex GPT-5.5 cross-model review (auto-fires on PR open)

- [ ] codex review APPROVE or REVISE-with-operator-absorbed (NEEDS-REVISION / BLOCK requires re-work before merge)
- [ ] If position-swap re-invocation triggered (T1-equivalent ship), both rounds consistent

## Wave Context

- **Wave**: W___
- **P0 ref**: `docs/architecture/W___/...`
- **SEV class**: SEV-0 (CRITICAL) / SEV-1 (8+ wave dwell) / HIGH / MEDIUM / LOW / LOW-LEAK
- **Dwell class** (per ops-rhythm SKILL): fresh / 3-wave / 5-wave / 8-wave
- **Owner**: OPERATOR (manual) / ENG (mechanizable) / EXTERNAL (vendor)

## Summary

(1-2 sentences)

## Acceptance Criteria Met

(paste-ready)

## Rollback Plan

(1 paragraph)

## Operational vs Aspirational Audit

- [ ] All tools/services cited in this PR are **operational** in the runtime (verified)
- [ ] Aspirational references (planned for future waves) are explicitly tagged `aspirational` not `operational`
- [ ] No inspect_ai / Sigstore / SLSA L3 / GEPA / Memento-II / AutoSOTA claims as "in our stack today" without harness/cron/CI stand-up evidence

## CR-9 Pin Discipline

- [ ] New `.mcp.json` entries (if any) use `npx -y <pkg>@<pinned-version>` form
- [ ] Sanctioned exceptions (`uvx --from <pkg>==<version>`, `uvx --from git+...@<SHA>`, local-build, local HTTP NSSM) cite-anchored to W-wave precedent

## Risk Assessment

- **Blast radius**: <files affected>
- **Reversibility**: easy / medium / hard
- **Production impact**: none / dev-only / runtime-config
