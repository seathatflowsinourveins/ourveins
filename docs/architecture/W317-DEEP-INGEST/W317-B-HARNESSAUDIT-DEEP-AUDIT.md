# W317-B Deep Audit — eric-ai-lab/HarnessAudit (arxiv:2605.14271)

> Wave: W317 | Stream: B | Decided: 2026-05-19 | rule_version: sca-v7.1
> **No prior T6 verdict — first-wave consideration.**
> **CRITICAL FINDING**: paper exists + 5 days old (publication date 2026-05-14, deep-ingest 2026-05-19); **GitHub code repository at canonical path `github.com/eric-ai-lab/HarnessAudit` DOES NOT EXIST** (Stage-0 PARTIAL fail per Δ33).

## Provenance + HEAD probe

| Field | Value | Source |
|---|---|---|
| Canonical github path probed | `github.com/eric-ai-lab/HarnessAudit` | mandate-specified |
| **Repo existence (github)** | **NEGATIVE** (org listing of 43 repos shows: Soft-Thinking + GRIT + SafePro + llm_coordination + Discffusion + CPL + EditRoom + many vision-language repos — **NO HarnessAudit**) | WebSearch × 4 distinct queries; site:github.com filter also returned 0 |
| **Paper existence** | **POSITIVE** | arxiv:2605.14271 + HF papers + WebSearch |
| Paper title | "Auditing Agent Harness Safety" | arxiv abstract |
| Paper published | **2026-05-14** (5 days before W317-B execution) | arxiv |
| Paper authors | Chengzhi Liu, Yichen Guo, Yepeng Liu, Yuzhe Yang, Qianqi Yan, Xuandong Zhao, Wenyue Hua, Sheng Liu + 3 more (11 total) | arxiv |
| Author affiliations | UCSB + UC Berkeley + University of Wisconsin + Stanford + Microsoft Research | WebSearch (multi-institution authorship) |
| Correspondence | ericxwang@ucsb.edu | arxiv |
| HF papers status | INDEXED with 45 upvotes + 2-comment community discussion | mcp__hf-mcp-server__paper_search |
| HarnessAudit-Bench | 210 tasks × 8 real-world domains × single+multi-agent configs × embedded safety constraints | arxiv abstract |
| Public code release | **NOT YET RELEASED** (paper 5 days old; typical NLP-paper code-release convention is 1-3 months post-arxiv) | WebSearch confirmation |
| `single_agent.cli` filename probe | Not findable via WebSearch; the original mandate may have referenced internal-codebase-path conjectured from paper architecture without source code being public yet | WebSearch + paper-search exhaustive |

## Stage-0 existence-probe (per Δ33)

| Family | Repo (github) result | Paper (arxiv) result |
|---|---|---|
| github | **NEGATIVE** | N/A (org listing comprehensive; HarnessAudit absent) |
| WebSearch (× 4 queries) | **NEGATIVE** | **POSITIVE** (multiple hits anchored on arxiv ID) |
| exa / direct-search | **NEGATIVE** (repomix 0-files — same stub-pattern as W315-B agentflow non-existent repo) | **POSITIVE** (arxiv accessible) |
| paper-search | N/A | **POSITIVE** (HF papers index + 45 upvotes) |
| deepwiki | **NEGATIVE** ("Repository not found") | N/A |
| basic-memory T6 | **NEGATIVE** (no prior verdict — first-wave consideration) | **NEGATIVE** |
| context7 | NEGATIVE (no `eric-ai-lab/HarnessAudit` resolution) — expected for not-yet-released code | NEGATIVE |

> **Stage-0 RESULT for code-repo candidate**: **FAIL** (4 distinct families return 0 hits for `eric-ai-lab/HarnessAudit` github repo; Δ33 triggers AUTO-REJECT-NON-EXISTENT-CANDIDATE for code).
> **Stage-0 RESULT for paper-anchor candidate**: **PASS** (4 distinct families confirm arxiv:2605.14271 paper exists with multi-institution authorship + HF papers indexing).
> **Resolution per sca-v7.1 §Stage-0 split-evaluation rule**: PAPER is a legitimate research anchor (T1-PAPER-ANCHOR-PENDING-REPO-RELEASE); REPO is non-existent right now (T5-CITE-ONLY for the github-repo candidate).

## Confounder flag (per active-/goal mandate to detect Δ33 silent-fallback)

WebSearch surfaced a SEPARATE artifact: `affaan-m/everything-claude-code` issue #522 "/harness-audit is basically vapor" + issue #979 "/harness-audit is not usable for consumer projects" + `everything-claude-code:harness-audit` skill in the local plugin marketplace (visible in the system-skills list). This `/harness-audit` is a **Claude Code skill** (v1.9.0 deterministic-via-scripts/harness-audit.js) that performs deterministic repo audit + prioritized scorecard. **It is NOT the same artifact as the UCSB paper.** No conflation should occur; the UCSB-paper artifact is named "HarnessAudit-Bench" + framework "HarnessAudit" (paper-anchored) vs the ECC-plugin `/harness-audit` skill (runtime-Claude-Code-tool).

## Hard-cap check (9 dims per sca-v7.1)

> Because the code-repo does NOT exist, formal hard-cap scoring is INAPPLICABLE for tier-routing of the github candidate. Hard-cap evaluation for the PAPER anchor (T1-PAPER-ANCHOR-PENDING-REPO-RELEASE state):

| Dim | Score | Hard cap? | Notes |
|---|---:|:---:|---|
| **D1 license** | N/A (no code yet) | N/A | Paper has academic-publication "license" (arxiv open-access typical) |
| **D3 install primitive** | 1 (no code) | **AT FLOOR** | Cannot install non-existent code |
| **D5 supply chain** | 4 (academic-publication chain through arxiv + HF papers; multi-institution authorship) | NOT cap | Strong for paper |
| **D14 install command** | N/A | N/A | No pin to apply |
| **D16 bus factor** | 5 (11-author multi-institution group) | NOT cap | Robust |
| **D24 attack surface** | N/A (no code) | N/A | No surface |

> **Hard-cap verdict**: code-repo candidate FAILS D3 at floor; paper-anchor candidate passes all applicable dims but is a research-citation not an installable primitive.

## 3-org-distinct anchors

| Anchor | Org | Distinct |
|---|---|---|
| arxiv:2605.14271 (Chengzhi Liu et al.) — 11 authors | UCSB ERIC Lab + UC Berkeley + UW + Stanford + Microsoft Research | Multi-org cluster (5 distinct institutions) |
| arxiv preprint server (Cornell) | Cornell-hosted academic-publishing infrastructure | Anchor-2 (academic-publisher) |
| HF papers index (Hugging Face) + 45 upvotes + 2-comment community discussion | Hugging Face academic-curation community | Anchor-3 (community-curation) |

> **3-org-distinct**: PASS-PAPER-ONLY (multi-institutional paper authorship confirmed; 5 institutions × 11 authors); **FAIL-FOR-CODE** since repo non-existent.

## sca-v7.1 install_score path-(b) scored-dim default — INAPPLICABLE FOR CODE-REPO

The code-repo Stage-0 FAIL per Δ33 means there is NO INSTALL-CANDIDATE to score. Per sca-v7.1 §Δ33 codification: candidates auto-REJECTed at Stage-0 are not subjected to dim-by-dim install_score computation (resource-conservation rule).

For the paper-anchor as a citation-target candidate (NOT an install candidate), an APPROXIMATE pattern_score is computed below:

## sca-v7.1 pattern_score 12.9 (paper-anchor track only)

| Dim (W_pattern) | Score | W×Score |
|---|---:|---:|
| D2 capability uniqueness (1.0) | 4 (trajectory-audit framework with 3 pillars — boundary compliance + execution fidelity + system stability — is novel for May 2026) | 4.0 |
| D13 pattern extractability (1.0) | 4 (210-task benchmark + 8-domain taxonomy + violation-trajectory-position findings cleanly extractable into prompt-engineering / safety-eval methodology) | 4.0 |
| D22 standardization (1.0) | 3 (single-paper; not-yet-cohort-standardized; competitive with Claw-Eval 300-task + AgentAuditor + AgentHarm) | 3.0 |
| D29 browse / retrieval quality (0.7) | 4 (arxiv DOI + HF papers + UCSB ERIC Lab homepage) | 2.8 |
| D30 judge-on-judge calibration (0.9) | 3 (trajectory-audit IS judge-on-trajectory pattern; not strictly judge-on-judge) | 2.7 |
| D34 cohort overlap (0.3, inverted) | 2 (overlaps with Claw-Eval 2604.06132 + AgentAuditor 2506.00641 + AgentHarm 2410.09024 + ATBench 2604.02022 — moderate cohort overlap) | 0.6 |

> **pattern_score sum**: ~17.1 / 4.9 weight-sum ≈ **3.49** (paper-anchor only; tracking for W319 re-litigation when code releases)

## Tier verdict + routing

> **T5-CITE-ONLY** (for the github-repo candidate at `eric-ai-lab/HarnessAudit` — Stage-0 FAIL per Δ33)
> **T1-PAPER-ANCHOR-PENDING-REPO-RELEASE** (for the paper as a research-methodology citation — eligible for re-litigation in W319 if/when code releases)

> **The original /goal mandate referenced this candidate as "Lane D real-binding (replaces SETUP-PENDING placeholder per W316-codex-r3 closure)" — this binding CANNOT yet be made**. The eric-ai-lab/HarnessAudit repository does not exist in the public-github-canonical-path-namespace. The Lane D binding will need a different artifact or must wait for HarnessAudit code release.

**Alternative routing for "Lane D real-binding" placeholder (W318 operator-AI):**

1. The system-skills list shows `everything-claude-code:harness-audit` SKILL (deterministic-scorecard skill) ALREADY EXISTS in the ECC plugin marketplace. This may be the actual intended "Lane D binding" target — operator clarification needed.
2. Alternatively, if the binding genuinely refers to the arxiv:2605.14271 framework, then Lane D must remain SETUP-PENDING for ≥1-3 months until code release. Recommend setting an explicit "Code-release-watch" trigger on arxiv:2605.14271 paper-DOI + GitHub eric-ai-lab/UCSB-NLP-Chang-org listings.
3. A third candidate worthy of Lane D binding (per W317-B cross-candidate synergy with HCAST): `aimingsys/AutoHarness` (visible in WebSearch result list) "AutoHarness: Automated Harness Engineering for AI Agents" — RECOMMEND queue this for W318 deep-ingest as an alternative Lane D binding candidate.

## Absorption-vector for sca-v7.1

1. **PRIMARY** (paper-anchor only): trajectory-audit-vs-output-audit distinction (paper finds 44% of safety violations are MID-TRAJECTORY not end-state) → sca-v7.1 §6.6.2 NEW sub-section "trajectory-aware audit primitives" for runtime-eval methodology. Cite arxiv:2605.14271.
2. **SECONDARY**: 8-real-world-domain taxonomy (refunds + clinical triage + insurance + office coordination + software defects + 3 more) → sca-v7.1 D28 long-running-agent-fitness empirical anchor SUPPLEMENT to HCAST.
3. **TERTIARY**: multi-agent collaboration "expands safety risk surface" finding → sca-v7.1 D24 attack-surface notes that multi-MCP-agent compositions also expand surface; this is a meta-research confirmation.

## Stage-0 + D-EMP (per sca-v8 DRAFT — Stream A)

- **Stage-0 (repo)**: **FAIL** (4 distinct families return 0 hits)
- **Stage-0 (paper)**: PASS
- **D-EMP**: **INAPPLICABLE** (no runtime install possible; paper-anchor is research-citation only)
- **D-EMP smoke evidence**: N/A

## Operator-AIs queued W318+

- **AI-W317-B-HARNESSAUDIT-CODE-RELEASE-WATCH**: set an explicit watch on arxiv:2605.14271 paper-DOI + `github.com/eric-ai-lab/HarnessAudit` (canonical) + `github.com/UCSB-NLP-Chang/HarnessAudit` (alternate) + `github.com/UCSB-ERIC/HarnessAudit` (alternate). Re-litigate in W319 if code lands; otherwise keep T5-CITE-ONLY for repo + T1-PAPER-ANCHOR-PENDING for paper.
- **AI-W317-B-LANE-D-OPERATOR-CLARIFICATION**: operator needs to confirm whether "Lane D real-binding (replaces SETUP-PENDING placeholder)" refers to (a) the arxiv:2605.14271 framework (must wait), (b) the ECC `harness-audit` skill (already exists), or (c) a different artifact. Without clarification, Lane D remains SETUP-PENDING.
- **AI-W317-B-LANE-D-ALT-CANDIDATE**: queue `aimingsys/AutoHarness` (or `aiming-lab/AutoHarness`) for W318 deep-ingest as alternative Lane D binding candidate.
- **AI-W317-B-DELTA-33-VINDICATION**: this audit is the FIRST W317-wave concrete catch of the Δ33 Stage-0 existence-probe rule SUCCESSFULLY identifying a NEW kind of candidate (paper-published-but-code-not-yet-released) that prior pre-Δ33 protocols would have either rejected outright OR silently-fallen-back-to-similar-named-artifact (`/harness-audit` skill confounder caught). Sca-v7.1 §1 codification VINDICATED.

## Cite-anchors (for ledger row)

- `arxiv:2605.14271` — "Auditing Agent Harness Safety" by Chengzhi Liu + 10 co-authors (2026-05-14)
- `hf.co/papers/2605.14271` — HF papers index (45 upvotes, 2-comment discussion)
- `github.com/eric-ai-lab` org listing — **HarnessAudit ABSENT** (43 repos visible, none matching)
- `eric-ai-lab.github.io` — UC ERIC Lab homepage (no HarnessAudit project page yet)
- `affaan-m/everything-claude-code` issues #522 + #979 — CONFOUNDER artifact (separate `/harness-audit` skill)
- T6: NO prior verdict — first-wave consideration

## Rollback

`git rm docs/architecture/W317-DEEP-INGEST/W317-B-HARNESSAUDIT-DEEP-AUDIT.md` (markdown-only; no runtime artifact created — and none could be created since repo does not exist).
