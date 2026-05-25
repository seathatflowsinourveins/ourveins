# W433-SEED-INSTALL — SOTA-Repos Seed Install Spec

**Date**: 2026-05-24
**Wave**: W433 (Phase III-A — operator's foundational install set)
**Status**: SPEC (operator-approved 2026-05-24 brainstorm)
**Prerequisite**: W432 cascade complete (Tranche-2 #107 + #108 landed)
**Companion**: W432-FINALIZE-spec §13 ADR v2 (A2 Local-Only) + W433-A0 unified G7-path commit
**Out-of-scope** (defer to W434+): per-layer expansion · memory-layer · advanced parallel-sessions design

---

## 1. Scope

Per operator brainstorm 2026-05-24: install operator-listed SOTA-foundation seed set, BEFORE per-layer expansion (W434) + BEFORE G7 public-mirror publish (W435). Apply R1 trust-tuple cryptographic chain BEFORE each install (MemPalace HALT precedent — see W432-FINALIZE §13).

In-scope (this spec):
- **3 NEW installs** with full R1 trust-tuple gate
- **3 CITE-REFRESH** waves for already-installed repos
- **1 cite-anchor reference** (curation list; no install)

Out-of-scope (separate specs):
- W434 per-layer expansion with additional SOTA-repos per layer
- W435 G7 public-mirror publish (10-step pre-publish checklist; operator-gated)
- Memory layer installs (MemPalace re-evaluation, MemOS, mem0, Zep) — per operator "memory can be later"

## 2. Candidate Currency Probe (2026-05-24, R1 currency gate)

All 7 operator-listed candidates passed `gh repo view` ACTIVE check:

| Candidate | Stars | Pushed | Currency | Action |
|---|---:|---|---|---|
| `shanraisshan/claude-code-best-practice` | 54.6k | today | ACTIVE ✅ | CITE-REFRESH (already CLAUDE.md L4 anchor) |
| `vercel-labs/agent-skills` | 27.0k | 2d ago | ACTIVE ✅ | CITE-REFRESH (already vendor-forked `vercel-*`) |
| `wshobson/agents` | 35.8k | today | ACTIVE ✅ | CITE-REFRESH (already installed) |
| `assafelovic/gpt-researcher` | 27.3k | 38d ago | ACTIVE-recent ✅ | CITE-REFRESH + version-bump probe |
| `addyosmani/agent-skills` | 45.4k | today | ACTIVE ✅ | CITE-REFRESH (already `addyosmani-vendor-fork-5`) |
| **`ComposioHQ/agent-orchestrator`** | **7.2k** | **today** | **ACTIVE ✅** | **NEW INSTALL** (orchestrator for parallel coding agents) |
| **`All-Hands-AI/OpenHands`** | **74.7k** | **today** | **ACTIVE ✅** | **NEW INSTALL** (full multi-agent harness) |
| **`ComposioHQ/composio`** | **28.4k** | **3d ago** | **ACTIVE ✅** | **NEW INSTALL** (1000+ toolkits framework) |
| `ComposioHQ/awesome-claude-skills` | 61.6k | 3d ago | ACTIVE ✅ | CITE-ANCHOR-REFERENCE (curation list; meta-discovery; not install) |

## 3. Layer Decomposition

| Layer | Purpose | Targets |
|---|---|---|
| **L0 — Best-Practices** | Cardinal-rule + cite-anchor discipline | shanraisshan/CCBP (cite-refresh) |
| **L1 — Skills (curated)** | Skill auto-fire on description-match | Vercel + addyosmani + wshobson (cite-refresh) + ComposioHQ/awesome-claude-skills (cite-anchor) |
| **L2 — Research** | Deep-research workflow | gpt-researcher (W411 install; version-bump probe) |
| **L3 — Orchestration** | Parallel-coding-agents control | **ComposioHQ/agent-orchestrator NEW INSTALL** |
| **L4 — Toolkit Framework** | 1000+ integrations + tool-search | **ComposioHQ/composio NEW INSTALL** |
| **L5 — Multi-Agent Harness** | AI-driven full-dev workflow | **All-Hands-AI/OpenHands NEW INSTALL** |
| **L-deferred** | Memory tier | (per operator: deferred to focused PR) |

## 4. Sub-Wave Dispatch Plan

3 NEW-INSTALL sub-waves + 3 CITE-REFRESH sub-waves + 1 cite-anchor-reference. All parallel-safe (different file surfaces).

| Sub-wave | Layer | Action | Target | Sub-agent worktree |
|---|---|---|---|---|
| **W433-INST-A** | L3 Orchestration | NEW INSTALL | ComposioHQ/agent-orchestrator | `Z:\claude-sota-installed-W433-INST-A` |
| **W433-INST-B** | L5 Harness | NEW INSTALL (caution: heavy footprint) | All-Hands-AI/OpenHands | `Z:\claude-sota-installed-W433-INST-B` |
| **W433-INST-C** | L4 Toolkit | NEW INSTALL | ComposioHQ/composio | `Z:\claude-sota-installed-W433-INST-C` |
| **W433-REF-D** | L1 Skills | CITE-REFRESH | Vercel + addyosmani + wshobson + awesome-claude-skills | `Z:\claude-sota-installed-W433-REF-D` |
| **W433-REF-E** | L0 Best-Practices | CITE-REFRESH | shanraisshan/CCBP (CLAUDE.md L4 SHA) | `Z:\claude-sota-installed-W433-REF-E` |
| **W433-REF-F** | L2 Research | CITE-REFRESH + version probe | gpt-researcher | `Z:\claude-sota-installed-W433-REF-F` |

## 5. R1 Trust-Tuple Cryptographic Chain (REQUIRED for each NEW INSTALL)

Each NEW INSTALL agent MUST verify ALL gates BEFORE actual install. If ANY fails: HALT + write design-only ADR (same pattern as W432-M1 MemPalace HALT → PR #105 Path C).

```
1. LICENSE CHECK (must be permissive)
   - License = MIT | Apache-2.0 | BSD-3 | ISC | MPL-2.0
   - REJECT: AGPL-3.0 | SSPL-1.0 | proprietary | NOASSERTION
   - Probe: `gh api repos/<org>/<repo>/license --jq '.license.spdx_id'`

2. SLSA-L3 ATTESTATION (or equivalent)
   - GitHub artifact-attestation: `gh api repos/<org>/<repo>/attestations`
   - OR npm-provenance (for npm packages): `npm view <pkg> dist.attestations`
   - OR PyPI release-attestation (PEP-740): `https://pypi.org/integrity/<pkg>/<ver>/provenance`
   - OR Sigstore bundle on releases

3. SIGNED COMMITS
   - Latest commit GPG/SSH-verified:
     `gh api repos/<org>/<repo>/commits/<sha>/.commit.verification.verified == true`

4. CURRENCY
   - Last commit ≤90 days old
   - No archived flag
   - Latest release ≤180 days old (allowance for stable repos)

5. MAINTAINER-TRUST
   - ≥3 active maintainers (>=10 commits in last 90 days each) OR
   - Corp-sponsored (e.g., Anthropic, Vercel, ComposioHQ, All-Hands-AI)

6. DEPENDENCY BLAST-RADIUS
   - Transitive deps: no Snyk/Socket.dev HIGH+ flags
   - `pip-audit` / `npm audit` clean at floor versions

7. 3RD-PARTY BENCHMARK VERIFICATION (where claimed)
   - If repo claims SOTA on benchmark: probe at least 1 3rd-party reproduction
   - REJECT if cross-benchmark contradiction (MemPalace EverMemOS lesson: 27.4pp gap was disqualifying)
```

If ALL pass: proceed with install + dedicated PR. If ANY fail: HALT-design-only.

## 6. Sequencing

**Prerequisite**: W432 cascade complete (Tranche-2 lands #107 + #108; main has all W432-FINALIZE work).

```
[W432 cascade complete] ─────> [worktree-cap headroom (prune merged-PR worktrees)] ─────┐
                                                                                          │
                            ┌─────────────────────────────────────────────────────────────┘
                            ▼
                   PARALLEL DISPATCH (6 agents, 3 NEW-INSTALL + 3 CITE-REFRESH)
                            │
       ┌────────────────────┼──────────────────────────────────────────────────┐
       │                    │                                                    │
       ▼                    ▼                                                    ▼
W433-INST-A          W433-INST-B (heavy footprint)                       W433-REF-D + REF-E + REF-F
agent-orchestrator   OpenHands                                          (cite-refresh waves; lightweight)
       │                    │                                                    │
       ▼                    ▼                                                    │
[R1 verify]          [R1 verify + Docker-footprint                             │
       │              dry-run + operator H-Y gate]                              │
       ▼                    ▼                                                    │
W433-INST-C                                                                     │
composio (after agent-orchestrator                                              │
+ OpenHands gates check)                                                        │
       │                                                                         │
       ▼                                                                         ▼
[all sub-waves PR-merged] ──> [W434 per-layer expansion design]
                                                          │
                                                          ▼
                                                  [W435 G7 public publish]
```

## 7. Operator-decision gates (W433-specific)

| Gate | When | Action | Default |
|---|---|---|---|
| **H-X** (autonomous) | Per-install R1 result | INSTALL vs HALT-design-only per R1 gate | AUTONOMOUS |
| **H-Y** | W433-INST-B OpenHands footprint | Accept Docker stack OR HALT pattern-study | OPERATOR-DECIDE |
| **H-Z** | After seed lands | Approve W434 per-layer expansion scope | OPERATOR-DECIDE |
| **H-AA** | After seed lands | Approve W435 G7 public publish trigger | OPERATOR-DECIDE (10-step checklist) |

## 8. Cardinal-rule R1-R6 compliance per sub-wave

| Rule | Mechanism |
|---|---|
| R1 trust-tuple | §5 cryptographic chain enforced per NEW install; MemPalace HALT precedent |
| R2 hooks ≤2KB | No new hooks introduced in seed installs |
| R3 subagent FQN | All Agent dispatches use `subagent_type=general-purpose` |
| R4 CLAUDE.md ≤50 LOC | Cite-refresh stays within budget; new wave entries trimmed |
| R5 sandbox | Each install runs in isolated worktree; no global mutation |
| R6 verify-before-claim | Each install reports DONE only on empirical probe success |

## 9. Cite anchors (≥3 distinct orgs — 9 here per W352-S9 floor)

1. **Anthropic** — https://docs.anthropic.com/en/docs/claude-code/plugins (R1 trust-tuple)
2. **GitHub** — https://docs.github.com/en/repositories (repo probe API)
3. **SLSA** — https://slsa.dev/spec/v1.0/levels (Level 3 attestation)
4. **Sigstore** — https://www.sigstore.dev/ (signature verification)
5. **OpenSSF** — https://scorecard.dev/ (maintainer trust + Pinned-Dependencies)
6. **NIST** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SSDF PW.7)
7. **OWASP** — https://owasp.org/www-project-top-10-ci-cd-security-risks/ (CICD-SEC-3)
8. **PEP-740** — https://peps.python.org/pep-0740/ (PyPI release-attestation)
9. **W432-FINALIZE §13 ADR v2 internal** — `docs/superpowers/specs/2026-05-24-W432-FINALIZE-design.md` §13

## 10. Self-review

- **Placeholders**: none — operator-input slots absent
- **Internal consistency**: §3 layers map 1:1 to §4 sub-waves to §6 sequencing
- **Scope check**: 6 sub-waves + 1 cite-anchor; each implementable in single sub-agent worktree
- **Ambiguity**: §7 H-X is autonomous-decision; if operator wants different boundary, edit before dispatch

## 11. Implementation plan handoff

After operator review: transition to **superpowers:subagent-driven-development** to dispatch 6 sub-wave agents in parallel after W432 cascade completes. Per-sub-wave agent prompts will be written inline at dispatch time per `superpowers:writing-plans` template (each agent gets full task text + R1 probe steps + Path A commit pattern).

## 12. Cross-spec convergence

- **W431-GH-BINDING** Mirror+SoT → preserved (seed install lands in private SoT `myvein`; later publishes to public `ourveins` at G7)
- **W432-FINALIZE §13 ADR v2** Local-Only → preserved (no new CI AI gates added; each install carries its own deterministic CI gates per upstream)
- **W433-A0** Unified G7 commit → preserved (seed installs feed the G7 mirror)
- **MemPalace HALT precedent** → applied (R1 trust-tuple cryptographic chain mandatory per NEW install)
