# W432-SOTA-UNLEASH-FULL — Full SOTA Unleash Spec (R1 Layered Sequential)

**Date**: 2026-05-24
**Status**: SPEC (operator-approved R1 Layered Sequential approach)
**Companion to**: `docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md` (parent spec; this is an addendum)
**Brainstorm record**: in-conversation 2026-05-24 — operator showed richer SOTA-features state (Copilot Code Review under cloud-agent settings, CodeQL ON, Secret-scanning ON, Dep-vuln ON, Ruleset `main-branch-protection-sota` 5-rules-applied, Webhooks empty, Models tab available, MCP for cloud agent configurable)

---

## 1. Scope

In-scope (this addendum):

- **Sub-wave W432-COPILOT-PROBE**: Empirical test on a small PR to determine if Copilot Code Review fires automatically on this repo's PRs. Result drives architecture: if YES → upgrade A2 Local-Only to A1+ Triple-Gate; if NO → confirm A2.
- **Sub-wave W432-SOTA-UNLEASH-AUDIT**: Audit all 11 SOTA-features surfaces; verify enabled state; configure dormant ones (Webhooks, Models tab use, MCP for Copilot cloud agent future-proofing).
- **Sub-wave W432-RULESET-RECONCILE**: Read existing `main-branch-protection-sota` ruleset (5 rules / 1 branch); compare to parent-spec §7.2 v2 design; merge-or-amend if needed (parent spec's PATCH may be REDUNDANT with operator-applied ruleset).

Out-of-scope (separate specs):
- W433 SOTA research repos matrix (gpt-researcher + STORM + deer-flow + etc.)
- W434 Parallel sessions workflow
- W435 G7 first public publish

## 2. Why R1 Layered Sequential

| Why | Detail |
|---|---|
| **Don't break cascade** | 4 PRs MERGED + 6 PRs in flight; Tranche-2/3 about to dispatch. R1 doesn't disrupt. |
| **Empirically driven** | Copilot Code Review activation state UNCERTAIN; test PR before committing to A1+ |
| **Already-applied ruleset** | `main-branch-protection-sota` (5 rules) exists; parent-spec PATCH may conflict or duplicate |
| **Operator-time efficient** | Operator has done most enablement; my job = verify + fill gaps + don't duplicate |
| **R6 verify-before-claim** | Each sub-wave verifies before claiming SOTA-status |

## 3. Sub-wave components

### 3.1 W432-COPILOT-PROBE

**Goal**: Empirically determine whether Copilot Code Review fires on regular PRs on this repo.

**Files**:
- Create: `tmp/W432-COPILOT-PROBE-test.md` (small trivial doc-only file)
- Open: PR with that file
- Probe: `gh api repos/.../pulls/<N>/reviews --jq '.[] | select(.user.login | contains("copilot"))'`

**Output**:
- If Copilot bot review found within 5 min → Copilot Code Review IS active on PRs → recommend A1+ upgrade
- If no Copilot bot review after 30 min → Copilot Code Review is NOT active on regular PRs → confirm A2
- Result documented at `docs/architecture/W432-COPILOT-PROBE/RESULT.md`

**Owner**: subagent dispatch

### 3.2 W432-SOTA-UNLEASH-AUDIT

**Goal**: Audit + configure all 11 SOTA-features surfaces.

**Surface audit (11 items)**:

| # | Surface | Current state (operator-shown 2026-05-24) | Action |
|---|---|---|---|
| 1 | Copilot Code Review | ON (in cloud-agent validation context) | W432-COPILOT-PROBE will determine real PR-level state |
| 2 | CodeQL code scanning | ON | Verify configured for js/ts/py langs |
| 3 | Secret scanning | ON | Verify push-protection also enabled |
| 4 | Dependency vulnerability checks | ON | Verify Dependabot security updates also enabled |
| 5 | Dependabot version updates | ?? | Verify via `gh api repos/.../dependabot/secrets` + `.github/dependabot.yml` watchlist |
| 6 | Firewall + allowlist (cloud agent) | ON | Operator-shown; verify custom allowlist not needed |
| 7 | Workflow approval policy | ON | Operator-shown; protects Actions secrets from Copilot pushes |
| 8 | Webhooks | Empty | OPTIONAL: configure Slack/Discord notification webhook |
| 9 | Models tab (GitHub Models) | Available | OPTIONAL: enable for prompt-eng evaluations |
| 10 | MCP config for Copilot cloud agent | Empty | OPTIONAL: configure even without license (future-proof) |
| 11 | Ruleset `main-branch-protection-sota` | EXISTS (5 rules / 1 branch) | W432-RULESET-RECONCILE will inspect + amend |

**Files**:
- Create: `docs/architecture/W432-SOTA-UNLEASH-AUDIT/AUDIT-REPORT.md`
- Possibly modify: `.github/dependabot.yml` (Dependabot config additions)
- Possibly modify: repo-level Settings via `gh api -X PATCH` for `security_and_analysis` block

**Owner**: subagent dispatch

### 3.3 W432-RULESET-RECONCILE

**Goal**: Read existing `main-branch-protection-sota` ruleset; compare to parent-spec §7.2 v2 design; merge-or-amend.

**Steps**:
1. `gh api repos/.../rulesets | jq '.[] | select(.name=="main-branch-protection-sota")'` → get ruleset JSON
2. Diff against parent-spec §7.2 v2 design (8 deterministic checks + 2 binding workflows)
3. If existing ruleset has ALL required-status-checks → no-op
4. If existing ruleset MISSING any → `gh api -X PUT rulesets/<id>` with merged JSON
5. Verify final ruleset enforces deny-deletion + non-fast-forward + linear-history + signatures + PR review + status-checks

**Files**:
- Create: `docs/architecture/W432-RULESET-RECONCILE/DIFF-REPORT.md`
- Possibly modify: nothing in tree (ruleset is GitHub-side state)

**Owner**: subagent dispatch

## 4. Sequencing (parallel-safe within this addendum)

```
[W432-FINALIZE Tranche-1] ──> DONE ✅
     │
     ├──> [W432-FINALIZE Tranche-2 implementer] (separate; not in this addendum)
     │
     └──> Parallel:
            ├── W432-COPILOT-PROBE (test PR; passive wait for bot review)
            ├── W432-SOTA-UNLEASH-AUDIT (11-surface audit)
            └── W432-RULESET-RECONCILE (ruleset diff + amend)
                       │
                       ▼ (when all 3 done)
            [Synthesize results → optional A2→A1+ upgrade decision]
                       │
                       ▼
            [W432-FINALIZE Tranche-3 sub-waves] (separate; in parent-spec)
```

## 5. Operator decision points (this addendum)

| Gate | When | Action |
|---|---|---|
| H-A | After W432-COPILOT-PROBE returns | Operator decides whether to upgrade to A1+ Triple-Gate if Copilot fires; or stick with A2 |
| H-B | After W432-SOTA-UNLEASH-AUDIT returns | Operator decides which OPTIONAL surfaces to enable (Webhooks for notifications, Models tab, MCP) |
| H-C | After W432-RULESET-RECONCILE returns | Operator decides whether to amend existing ruleset to add any missing status-checks |

## 6. Cardinal-rule compliance

| Rule | Mechanism |
|---|---|
| R1 trust-tuple | Audit verifies SLSA/Sigstore status on any new feature enablement |
| R2 hooks ≤2KB | No new hooks created in this addendum |
| R3 subagent FQN | All sub-wave dispatches use FQN form |
| R4 CLAUDE.md ≤50 LOC | No CLAUDE.md changes |
| R5 sandbox | No sandbox change |
| R6 verify-before-claim | Each sub-wave produces evidence-based report; codex r1 gate per PR |

## 7. Cite anchors (≥3 distinct orgs — 7 here)

1. **GitHub** — https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets (Rulesets API)
2. **GitHub Copilot** — https://docs.github.com/en/copilot/using-github-copilot/code-review (Code Review)
3. **OpenSSF** — https://scorecard.dev/ (Scorecard maintenance score)
4. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7)
5. **OWASP** — https://owasp.org/www-project-top-10-ci-cd-security-risks/ (CICD-SEC-2/3)
6. **arXiv** — https://arxiv.org/abs/2410.13718 (cross-model code review research; arXiv:2410.13718)
7. **W432-FINALIZE parent spec** — `docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md` §13 ADR v2

## 8. Self-review

- **Placeholders**: none — operator-input slots NOT present in this addendum
- **Internal consistency**: 3 sub-waves each have clear goal + files + owner; matches §4 sequencing diagram
- **Scope check**: 3 small sub-waves; each implementable as separate PR with 1 subagent dispatch
- **Ambiguity**: §3.1 Copilot-Probe success criterion is binary (review-found within 30 min); clear

## 9. Implementation plan handoff

After operator review: transition to **superpowers:writing-plans** OR (since this addendum is small) skip directly to **superpowers:subagent-driven-development** to dispatch the 3 sub-wave agents in parallel. Recommendation: skip writing-plans for this addendum (sub-waves are well-bounded; full spec sufficient). Each sub-wave produces its own PR; codex r1 review per PR.
