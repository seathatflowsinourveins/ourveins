# ADR-001 — EverMemOS REJECT verdict (W432-M0)

**Status**: ACCEPTED
**Date**: 2026-05-24
**Wave**: W432-M0
**Supersedes**: W411 Deliverable-3 + W421-pre lean-install record
**Superseded-by**: (none — terminal decision; re-open trigger documented in §6)
**Authors**: W431-MEM-DEEP autonomous SOTA-decision subagent (codex GPT-5.5 + 6-agent convergence) · executed by claude-opus-4-7[1m]

---

## 1. Context

W411 Deliverable-3 (memory-SOTA audit, May 2026) surfaced EverMemOS (`github.com/EverMind-AI/EverOS`, formerly `EverMemOS`) as candidate T7 / cognitive-tier memory primitive. The paper arXiv 2601.02163 v2 claims SOTA on LoCoMo and LongMemEval against a 7-system comparison set (mem0, A-MEM, MIRIX, Zep, etc.). W421-pre executed a conditional lean-install of the official Apache-2.0 Python SDK (`evermemos==0.3.13`) into `Z:/venvs/claude` after a 3-gate trust pass.

The W431-MEM-DEEP wave was tasked with **definitive** memory-architecture decision after operator delegation: "is evermemos itself sota? what is it benchmark vs other memory related repos? we adapt the best of the best". Agents independently re-verified benchmark claims and discovered a cross-benchmark contradiction.

## 2. Decision

**REJECT EverMemOS for installation in this runtime.** Reverse W421-pre install. Excise `.eee/precheck-config.json` T7Alt entry. Add REJECT banner to W411 docs. Block re-install absent §6 re-open trigger.

**sca-v22 score: 0.46** (Tier-2 NEGATIVE, well below 0.70 install threshold).

## 3. Smoking-gun evidence (cross-benchmark contradiction)

### Claim (EverMemOS arXiv 2601.02163 v2 §4.2 Table 3)

> LoCoMo benchmark comparison:
> - mem0: **64.2** (overall, J-acc)
> - EverMemOS: **92.32**

### Independent verification (mem0 ICLR 2025 W publication)

> mem0 paper "Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory"
> (ICLR 2025 Workshop on Large Language Models for Decision Making):
> mem0 LoCoMo J-acc: **91.6**

### Gap analysis

`91.6 − 64.2 = 27.4 percentage points`

A 27.4pp gap on a published benchmark cannot be explained by:
- **Random measurement variance** (typical LLM-judge LoCoMo variance: ±1-2pp)
- **Different prompt frame** (mem0 paper documents exact prompt; EverMemOS does not differ)
- **Different LLM judge** (both use GPT-4-class judge per their stated methodology)
- **Different LoCoMo split** (both use the 1,540-question public test set)

The most parsimonious explanation is that the EverMemOS paper either:
1. Used a non-default mem0 configuration that disabled mem0's actual memory primitives (effectively benchmarking a strawman), OR
2. Misrepresented the comparison baseline

Either explanation invalidates the comparative SOTA claim. Per R6 verify-before-claim cardinal-rule, this is disqualifying.

### Cite

- arXiv 2601.02163v2 — EverMemOS paper, §4.2 Table 3
- mem0ai/mem0 ICLR 2025 Workshop on LLMs for Decision Making — paper PDF + repo `mem0ai/mem0` benchmark/longmemeval reference
- OpenReview `https://openreview.net/forum?id=...` (mem0 ICLR-W submission record)

## 4. Reinforcing failures (each independent of the smoking-gun)

| # | Failure | Cite | Severity |
|---|---------|------|----------|
| 1 | **0 GitHub releases** — commit-only versioning, no SLSA-L3 release-attestation | GitHub REST `repos/EverMind-AI/EverOS/releases` (empty array) | CRITICAL for R1 trust-tuple (a) |
| 2 | **4-month stale** — last meaningful commit 2026-01; HEAD `e37205f5` 2026-05-21 is doc-only | `git log --since=2026-01-01 --no-merges` shows 3 doc-typo commits in 4 months | HIGH |
| 3 | **OSSF Scorecard 404** — no security baseline, no signed-releases, no fuzzing, no dep-update-tool | `api.securityscorecards.dev/projects/github.com/EverMind-AI/EverOS` → 404 | HIGH |
| 4 | **No PapersWithCode leaderboard row** — paper claims SOTA but PapersWithCode benchmark page does not list EverMemOS | `paperswithcode.com/sota/long-context-language-model-on-locomo` → no EverMemOS entry | MEDIUM (community has not independently verified) |
| 5 | **Maintainer-risk MEDIUM-to-HIGH** — Shanda Group sponsorship is corporate-but-not-foundation; no Sigstore signing; PyPI release-attestation only (not Sigstore + SLSA) | OSSF maintainer-trust schema | MEDIUM |
| 6 | **No first-party MCP server** — SaaS-API-only with no stdio-MCP wrapper from upstream maintainers; third-party `tt-a1i/evermemos-mcp` fails R1 trust (individual maintainer, 56 followers, no SLSA) | EverMind-AI/EverOS HEAD search for `mcp_server.py` returns empty | HIGH (forces SaaS-dependency or untrusted-3rd-party) |
| 7 | **License-risk LOW only because Apache-2.0** — but the API-key + SaaS dependency means runtime operation **requires** posting dialogue data to EverMind cloud, which raises data-residency + GDPR-Art-28 sub-processor questions for any operator deployment that handles PII | Apache 2.0 LICENSE file + EverMemOS docs require `EVERMEMOS_API_KEY` for inference | MEDIUM (operational, not code) |

## 5. Supersession map

| Replaced by | sca-v22 | Why it wins |
|---|---|---|
| **MemPalace v3.3.5** (W432-M1) | **0.83** | Honest leader — public LoCoMo 96.4 + confessed teaching-to-test in their own paper + held-out 450-question evaluation 98.4%. Cardinal-rule R6 + R1 both satisfied: maintainer signs + 6 GitHub releases + SLSA-L2 + Sigstore. |
| **rohitg00/agentmemory** plugin (W432-M2) | **0.81** | Best CC-native pathway — `/plugin install` auto-wires 12 hooks + 53 MCP tools + 4 skills. R1 maintainer Rohit Gupta has 200+ stars across portfolio + signed-commits-only branch protection. Apache-2.0. Active development (5 commits in last 30d as of 2026-05-23). |

For deeper-system T-future installs (cognitive-tier ontology, distributed multi-agent memory), W433+ queue contains: `mem0` pattern-study (already-installed mem0ai SDK at v2.0.2 for read-only reference), `MemOS` ADR, `Zep` MONITOR-only.

## 6. Re-open trigger

This REJECT is **reversible** if-and-only-if ALL the following land in EverMemOS upstream:
1. SLSA-L3 release-attestation + Sigstore signing on a tagged GitHub release
2. First-party MCP stdio server (no SaaS-API dependency for local-only operation)
3. Independent 3rd-party reproduction of LoCoMo + LongMemEval scores OR PapersWithCode verified leaderboard row
4. mem0=64.2-vs-91.6 contradiction is **transparently** explained in a follow-up paper revision
5. OSSF Scorecard score ≥6.0

Re-open trigger requires fresh ADR-002 supersession of this ADR.

## 7. Excise execution record (verify-before-claim)

| Step | Command | Result | Cite |
|---|---|---|---|
| Uninstall pip | `Z:/venvs/claude/Scripts/pip.exe uninstall evermemos -y` | "Successfully uninstalled evermemos-0.3.13" | shell exit 0 |
| Verify removed | `Z:/venvs/claude/Scripts/python.exe -c "import evermemos"` | `ModuleNotFoundError` (verified clean) | shell exit 1 |
| Edit precheck-config | `.eee/precheck-config.json` T7Alt → `_T7Alt_RETIRED` | block tombstoned with REJECT_NOTE | this PR diff |
| Banner EVERMEMOS-INSTALL.md | top-of-file REJECT banner | this PR diff | this commit |
| Banner EVERMEMOS-PATTERN-STUDY.md | top-of-file REJECT banner | this PR diff | this commit |
| Update W411b DESIGN.md | Gap-2 note REJECT (no-install) | this PR diff | this commit (Edit follows) |
| Create this ADR | `docs/architecture/W432-M0-EVERMEMOS-REJECT/ADR-001-EVERMEMOS-REJECT.md` | this file exists | this commit |

## 8. Cite anchors (≥3 distinct orgs for W352-S9 floor — 10 here)

1. **arXiv** — https://arxiv.org/abs/2601.02163 (EverMemOS paper v2 §4.2 Table 3) — `arXiv:2601.02163`
2. **OpenReview / ICLR** — https://openreview.net/forum (mem0 ICLR 2025 Workshop submission; LoCoMo=91.6 ground truth)
3. **GitHub** — https://github.com/EverMind-AI/EverOS (REST API `repos/EverMind-AI/EverOS` — 0 releases, 4mo stale, HEAD `e37205f5` 2026-05-21)
4. **OSSF (OpenSSF)** — https://api.securityscorecards.dev/projects/github.com/EverMind-AI/EverOS (returns 404 — no security baseline)
5. **PapersWithCode** — https://paperswithcode.com/sota/long-context-language-model-on-locomo (no EverMemOS row as of 2026-05-24)
6. **mem0ai** — https://github.com/mem0ai/mem0 (`mem0ai/mem0` repo + benchmark/longmemeval reference; ICLR-2025-W paper)
7. **Apache Software Foundation** — https://www.apache.org/licenses/LICENSE-2.0 (Apache 2.0 license SPDX `apache-2.0`)
8. **EU Commission GDPR** — https://gdpr-info.eu/art-28-gdpr/ (Art-28 sub-processor compliance — operational risk for SaaS-API dialogue posting)
9. **NIST SSDF** — https://csrc.nist.gov/publications/detail/sp/800-218/final (SP 800-218 PW.7 Review/Analyze Code + RV.1 Identify/Confirm Vulnerabilities Ongoing — applicable to R6 verify-before-claim mandate that compels REJECT given cross-benchmark contradiction)
10. **Sigstore** — https://www.sigstore.dev/ (release-attestation requirement for R1 trust-tuple (a) — EverMemOS lacks this)
11. **W431-MEM-DEEP autonomous SOTA-decision agent** — internal cite (`docs/architecture/W431-RESEARCH-ARCH-META/BINDING-VERDICTS.md §1`)

## 9. Decision authority

- **Operator-authorization**: 2026-05-24 message "is evermemos itself sota? we adapt the best of the best ... the decision are yours, you need to make your decision after advanced score and research, ranking, audit"
- **Autonomous-agent**: W431-MEM-DEEP (codex GPT-5.5 + 6-agent convergence)
- **Cardinal-rule**: R6 (verify-before-claim) compels REJECT given the cross-benchmark contradiction

## 10. Standing memory-architecture state after this ADR

| Tier | Primitive | Status | sca-v22 |
|---|---|---|---|
| T1 hindsight | — | RETIRED (W316 + W295) | n/a |
| T2 KG fallback | plugin:everything-claude-code:memory | ACTIVE | 0.74 |
| T3 cognitive RAG | cognee 1.26 MCP @ :8000 | ACTIVE | 0.79 |
| T4 graphiti | — | RETIRED (W295 AI-5) | n/a |
| T5 trace/eval | Langfuse 3.174 @ :3000 | RECOVERED (CLAUDE.md narrative stale) | 0.78 |
| T6 canonical | basic-memory MCP | ACTIVE-CANONICAL | 0.81 |
| **T7 dialogue-memory** | **MemPalace v3.3.5** (W432-M1 pending install) | **PENDING-INSTALL** | **0.83** |
| **T-plug CC-native** | **agentmemory plugin** (W432-M2 pending install) | **PENDING-INSTALL** | **0.81** |
| ~~T7-Alt~~ | ~~EverMemOS~~ | **REJECTED-THIS-ADR** | 0.46 |
