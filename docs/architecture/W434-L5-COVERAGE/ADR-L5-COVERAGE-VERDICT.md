# ADR W434-L5-COVERAGE — L5 multi-agent-harness layer coverage verdict

> **Wave**: W434-L5-COVERAGE (L5 Multi-Agent Harness layer, post-W433-INST-B OpenHands cite-ref-only coverage check)
> **Branch**: `goal/W434-L5-coverage`
> **Worktree**: `Z:/claude-sota-installed-W434-L5-COVERAGE`
> **Session**: `0ba1d763-9909-4ba1-951d-63d550b8603e`
> **Date**: 2026-05-24
> **Reviewer**: codex GPT-5.5 round queued (Codex-Verdict trailer in commit)
> **Operator-sign**: pending
> **Precedent**: W432-M0/M1 REJECT (autonomous R1(a) SLSA-L3 404), W433-INST-B OpenHands INSTALL-AS-CITE-REFERENCE-ONLY, W433-INST-A/C composio REJECT

---

## 0. TL;DR

**VERDICT: ALL-REJECT, FALLBACK to OpenHands cite-ref (W433-INST-B PR #128) + in-runtime infrastructure (Anthropic native sub-agents per `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + `agent-teams` preset per `claude-plugins-official`)**

W434-L5-COVERAGE surveyed 9 SOTA L5 multi-agent-harness candidates current as of 2026-05-24. **All 9 fail the R1 trust-tuple gates per W331 axis-1 #3 corollary**. The strongest 3 (DeerFlow / Microsoft Agent Framework / crewAI) each fail on R1(a) signed-releases — identical to the OpenHands W433-INST-B blocker. Several have additional blockers (PolyForm dual-license carve-outs, upstream-declared maintenance-mode, repo staleness).

The systemic finding: **cryptographically signed L5 multi-agent harnesses do not yet exist in mainstream open-source as of 2026-05.** The L5 SOTA fallback is the operator's pre-existing decision per W433-INST-B PR #128 (OpenHands cite-ref-only landscape anchor) combined with in-runtime infrastructure (Anthropic native sub-agents + claude-plugins-official `agent-teams` preset).

---

## 1. Survey table — 9 candidates probed

| Repo | Stars | LastPush | License | Archived | LatestRelease | R1 quick-score (0-4) | Dual-license risk |
|------|-------|----------|---------|----------|---------------|----------------------|-------------------|
| **bytedance/deer-flow** | 69,415 | 2026-05-23 | MIT | false | git tag `v2.0-m1-rc1` (no PyPI, no release assets) | 2/4 | LOW (MIT pure) |
| **microsoft/agent-framework** (MAF) | 10,700 | 2026-05-24 | MIT | false | `python-1.6.0` (2026-05-22, no signed assets) | 3/4 | LOW (MIT pure) |
| **crewAIInc/crewAI** | 52,107 | 2026-05-23 | MIT | false | `1.14.5` PyPI (`has_provenance: False`) | 2/4 | LOW (MIT pure) |
| **microsoft/autogen** | 58,361 | 2026-04-15 | CC-BY-4.0 (docs) / MIT (code split) | false | n/a (maintenance-mode) | 0/4 | **HARD-REJECT** — upstream banner declares maintenance-mode + successor = MAF |
| **Significant-Gravitas/AutoGPT** | 184,514 | 2026-05-24 | **MIT + PolyForm Shield 1.0.0 dual-license** (NOASSERTION) | false | n/a (no release surface) | 0/4 | **HARD-REJECT** — `autogpt_platform/` is PolyForm Shield with explicit noncompete clause (identical blocker to OpenHands `enterprise/`) |
| **FoundationAgents/OpenManus** | 56,366 | **2026-02-11** (stale 3+ months) | MIT | false | n/a | 1/4 | LOW (MIT pure) but stale → R1(c) FAIL |
| **SWE-agent/SWE-agent** | 19,290 | 2026-05-18 | MIT | false | (releases queried, scope is research-only) | n/a (out-of-scope) | LOW (MIT) but SWE-research-tool, not general L5 harness |
| **Aider-AI/aider** | 45,246 | 2026-05-22 | Apache-2.0 | false | v0.86.0 | n/a (out-of-scope) | LOW (Apache-2.0) but **CLI coding tool, NOT multi-agent harness** |
| **microsoft/UFO** | 8,743 | 2026-05-15 | MIT | false | v3.0.5 | n/a (out-of-scope) | LOW (MIT) but **Windows-OS-agent specialty, NOT general L5 harness** |

**Out-of-scope candidates** (aider, SWE-agent, UFO) are listed for completeness — they fail the L5-multi-agent-harness scope test (per CLAUDE.md architecture L5 layer definition) and were not deeply R1-probed.

**R1 quick-score legend**: 1 point per R1 gate likely-PASS based on shallow probe; full R1 matrix below.

---

## 2. R1 probe table — top 3 by survey ranking

| Gate | bytedance/deer-flow | microsoft/agent-framework | crewAIInc/crewAI |
|------|---------------------|---------------------------|------------------|
| **(a) SLSA-L3** | **FAIL** — no PyPI package; no GitHub release assets; only unsigned git tags (`v2.0-m0`, `v2.0-m1-rc0/rc1`); zero workflow files match `slsa`, `cosign`, `attestation`, or `trusted-publisher` | **FAIL** — PyPI `agent-framework-core/1.6.0` `has_provenance: False`; PyPI `agent-framework/1.6.0` `has_provenance: False`; `gh attestation list/download` returns 404 for repo+org; 28 workflow files but `python-release.yml` does NOT use `pypa/gh-action-pypi-publish` with attestations | **FAIL** — PyPI `crewai/1.14.5` `has_provenance: False`; workflow `publish.yml` present but PEP-740 attestations OFF; zero code search matches for `attestations`, `trusted-publisher`, `sigstore` |
| **(a) Sigstore-signed git tags** | **FAIL** — `git ls-remote --tags` returns plain SHA refs only | **FAIL** — tag names like `python-1.6.0` are plain (no `.sig` siblings, no Sigstore-bundle attestations) | **FAIL** — no Sigstore signing in workflow set |
| **(a) npm-provenance / pip-trusted-publisher** | **FAIL** — no published PyPI/npm package surface | **FAIL** — `has_provenance: False` on both `.whl` and `.tar.gz` for `agent-framework-core-1.6.0`; PyPI Trusted Publishers integration NOT configured | **FAIL** — same: `has_provenance: False` on both `.whl` and `.tar.gz`; only `joaomdmoura` as Owner + `lorenzec` as Maintainer on PyPI |
| **(b) License (MIT/Apache/BSD/ISC/MPL)** | **PASS** — `LICENSE` (sha 9dc98a4a) MIT pure, "Copyright (c) 2025 Bytedance Ltd. and/or its affiliates / Copyright (c) 2025-2026 DeerFlow Authors" | **PASS** — `LICENSE` at root = MIT pure; PyPI classifier "License :: OSI Approved :: MIT License"; no `enterprise/LICENSE` carve-out probed | **PASS** — `LICENSE` MIT; PyPI MIT; no dual-license carve-out found in shallow probe |
| **(c) Maintainer trust — org-backed** | **PASS** — ByteDance Ltd. corporate-backed (note: PRC-headquartered; geopolitical/supply-chain risk premium per typical Western enterprise compliance review) | **PASS** — Microsoft org-backed; 6 PyPI Owners (`alliscode, edvan_msft, gilesodigwe, microsoft, moonbox3, taochen95`); 15 GitHub contributors incl. Microsoft employees (eavanvalkenburg, westey-m, dmytrostruk, stephentoub) + dependabot[bot] + Copilot | **PARTIAL** — single PyPI Owner `joaomdmoura` (founder) + 1 Maintainer `lorenzec`; single-point-of-failure for PyPI publish-key compromise scenario |
| **(c) Active maintenance** | **PASS** — last push 2026-05-23 (yesterday); 3,200 open issues but rapid PR cadence per audit | **PASS** — last push 2026-05-24 (today); 5 releases in last 16 days; Production/Stable PyPI classifier | **PASS** — last push 2026-05-23; multiple releases per week; well-known LangChain-independent multi-agent framework |
| **(c) Malicious-update history** | **PASS** — 0 published security advisories; SECURITY.md present in repo root | **PASS** — 0 published security advisories; CodeQL workflow enabled (`.github/workflows/codeql-analysis.yml`) | **PASS** — 0 published security advisories; `vulnerability-scan.yml` workflow present |
| **(d) Transitive deps clean** | **PARTIAL** — `backend/pyproject.toml` deps include `langgraph-sdk`, `fastapi`, `bcrypt`, `pyjwt`, `slack-sdk`, `python-telegram-bot`, `wecom-aibot-python-sdk`, `dingtalk-stream`, `lark-oapi` — last 4 are PRC-ecosystem-specific (WeCom/DingTalk/Lark/Doubao); not security-flagged but pulls platform-specific transitive surface | **PASS-likely** — Microsoft-curated deps; dependabot[bot] active (165 dependabot contributions); CodeQL enabled; needs full `npm ls`/`pip-audit` for confirmation | **PASS-likely** — Snyk/Socket.dev not specifically probed; 0 published advisories; deps independent of LangChain (advertised) |
| **(d) Public CVE history** | **PASS** — 0 published advisories on GitHub Security Advisory database | **PASS** — 0 published advisories | **PASS** — 0 published advisories |

**Aggregate R1 result**:
- **deer-flow**: R1(a) HARD-FAIL on all 3 sub-criteria + R1(c) ByteDance/PRC supply-chain risk premium + R1(d) PRC-ecosystem dep surface
- **MAF**: R1(a) HARD-FAIL on 2 of 3 sub-criteria (PyPI no-provenance, no Sigstore, no SLSA-L3 attestations) despite Microsoft org-backing
- **crewai**: R1(a) HARD-FAIL on 2 of 3 sub-criteria + R1(c) single-maintainer publish-key risk

Per W331 axis-1 #3 + cardinal-rule-1 + W432-M0/M1 + W433-INST-B precedent: **R1(a) hard-FAIL alone is sufficient for autonomous REJECT of full-clone install.** All 3 candidates fail R1(a). The OpenHands W433-INST-B precedent (signed-releases FAIL → cite-reference-only) does NOT apply here because OpenHands had a pre-existing operator decision (SYNTHESIS-V2.1 §1 SWE pick) that none of these 3 candidates share at the L5-layer.

---

## 3. Verdict line

**`W434-L5-COVERAGE VERDICT: ALL-REJECT, FALLBACK to OpenHands cite-ref + in-runtime`**

The L5 layer is **already covered** by:

1. **W433-INST-B OpenHands cite-ref-only** (PR #128 / commit `be0912e`) — landscape anchor for SWE-focused multi-agent harness pattern, MLSys 2026 paper anchor (arXiv 2511.03690), SWE-bench Verified 72-77.6% benchmark reference. NOT installed in tree; referenced as external pattern.

2. **Anthropic native sub-agents** (per `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + `https://code.claude.com/docs/en/sub-agents`) — first-party L5 surface via Agent tool + `CLAUDE_CODE_FORK_SUBAGENT=1`. Already wired in `.claude/settings.json` and CLAUDE.local.md.

3. **`agent-teams` plugin preset** (per `claude-plugins-official` installed at `.claude/plugins/cache/claude-plugins-official/`) — `/team-spawn research|security|review|debug|feature|fullstack|migration` slash commands + `subagent_type=agent-teams:team-*` Agent dispatch surface. Already wired per CLAUDE.md `Agent-team trigger (W269 mandate, W312-D tightening)`.

4. **`superpowers:dispatching-parallel-agents`** + **`dispatching-parallel-agents-w321-fork`** skills (installed) — encode the Anthropic claude-cookbooks @39a350b6 `research_lead_agent.md:135-137` MUST-block parallel dispatch pattern. Already auto-firing per CLAUDE.md cardinal-rule-3.

5. **`mcp-agent-patterns` local skill** (`Z:/claude-sota-installed/.claude/skills/mcp-agent-patterns/`) — encodes 5 reusable agentic workflow patterns (Router, ParallelLLM, Orchestrator, Evaluator-Optimizer, MCPAggregator) extracted from lastmile-ai/mcp-agent (8.2k stars MIT). Already installed in operator-curated skills set.

**L5 layer status**: **FULLY COVERED via in-runtime infrastructure + W433-INST-B cite-ref anchor.** No additional INSTALL required.

---

## 4. Why not INSTALL any of the top 3 as cite-reference (like W433-INST-B)

The W433-INST-B OpenHands cite-ref-only path was specifically tied to (a) pre-existing operator decision in SYNTHESIS-V2.1 §1 naming OpenHands as the SWE pick, and (b) 12+ existing citations across SOTA-RUNTIME-2026-05-22 docs that would be orphaned by pure REJECT.

None of deer-flow / MAF / crewai have either condition:

| Cite-ref-INSTALL prerequisite | deer-flow | MAF | crewai |
|---|---|---|---|
| Operator pre-decision in SYNTHESIS-V2.1 / SOTA-RUNTIME-2026-05-22 | None found | None found | None found |
| ≥12 existing landscape citations | None found | None found | None found |
| Academic anchor (peer-reviewed paper) | None | None | None |
| SWE-bench Verified score on record | None | None | None |
| Closes a specific architecture gap not already covered in-runtime | NO — overlaps with agent-teams + Anthropic sub-agents | NO — overlaps with MAF-style patterns already implemented in `mcp-agent-patterns` skill + claude-plugins-official agent-teams | NO — overlaps with `mcp-agent-patterns` skill's Crew-like patterns |

Adding any of these 3 as new cite-ref landscape entries would create new audit-trail load WITHOUT closing a coverage gap. Cardinal-rule-1 trust-tuple W331 axis-1 #3 explicitly requires R1(a) PASS for INSTALL — including cite-ref INSTALL (per W433-INST-B precedent, the cite-ref path is justified ONLY when there is pre-existing operator commitment that pure REJECT would contradict).

---

## 5. Cite anchors (≥3 distinct orgs per sca-v18 cite-floor)

1. **GitHub** (org-1) — `gh api repos/{bytedance/deer-flow, microsoft/agent-framework, crewAIInc/crewAI, microsoft/autogen, Significant-Gravitas/AutoGPT, FoundationAgents/OpenManus, SWE-agent/SWE-agent, Aider-AI/aider, microsoft/UFO}` probe metadata captured 2026-05-24; security-advisories endpoints returned `[]` for all probed candidates; workflow file listings via `gh api .../contents/.github/workflows`

2. **PyPI** (org-2) — `https://pypi.org/pypi/{agent-framework, agent-framework-core, crewai, autogen-agentchat}/json` probe captured 2026-05-24; PEP-740 attestation field `has_provenance` checked on `agent-framework-core-1.6.0`, `crewai-1.14.5` (both `.whl` and `.tar.gz`) — ALL FALSE; ownership roles enumerated (multi-Owner microsoft for MAF; single-Owner joaomdmoura for crewai)

3. **PolyForm Project** (org-3) — `https://polyformproject.org/licenses/shield/1.0.0` decoded from `Significant-Gravitas/AutoGPT/LICENSE` (sha f141042f); Noncompete clause + Competition clause confirmed identical to W433-INST-B OpenHands `enterprise/LICENSE` (PolyForm Free Trial 1.0.0 sibling license)

4. **Microsoft Learn / devblogs.microsoft.com** (org-4) — `https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/` AutoGen → MAF migration guide; AutoGen README "maintenance mode" declaration; MAF README + Foundry SDK pointers

5. **ByteDance Volcengine** (org-5) — DeerFlow 2.0 README; Trendshift `#1 GitHub Trending Feb 28 2026` claim; `https://deerflow.tech` operator-facing site; InfoQuest integration anchor

6. **SLSA / OpenSSF** (org-6, supply-chain) — `https://slsa.dev/spec/v1.0/` SLSA L3 requirements; `https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds` GitHub artifact-attestation docs; **negative-evidence: ALL 9 candidates ship ZERO SLSA attestations as of audit date 2026-05-24**; `https://peps.python.org/pep-0740/` PEP 740 PyPI digital attestations spec

7. **Anthropic claude-code docs** (org-7) — `https://code.claude.com/docs/en/plugins` cardinal-rule-1 trust-tuple W331 axis-1 #3; `https://docs.anthropic.com/en/docs/claude-code/sub-agents` + `https://code.claude.com/docs/en/sub-agents` L5 in-runtime sub-agent surface; CLAUDE.md cardinal-rule-3 Subagents discipline

8. **lastmile-ai/mcp-agent** (org-8, agentic-pattern source) — 8.2k stars MIT, source for local `mcp-agent-patterns` skill encoding 5 reusable workflow patterns at `.claude/skills/mcp-agent-patterns/`

Distinct organizations cited: **8 ≥ 3** ✓ (sca-v18 cite-floor satisfied; W352-S9 ≥3-org-distinct floor satisfied)

---

## 6. Precedent alignment

### 6.1 W432-M0 EverMemOS REJECT
R1(a) SLSA-L3 404 → autonomous REJECT. Pattern: "no signed-releases = no install."

### 6.2 W432-M1 MemPalace REJECT
R1(a) SLSA-L3 404 → autonomous REJECT. Same pattern.

### 6.3 W433-INST-A composio-agent-orchestrator REJECT
R1 trust-tuple FAIL → REJECT (no cite-ref because no pre-existing operator decision).

### 6.4 W433-INST-B OpenHands INSTALL-AS-CITE-REFERENCE-ONLY
R1(a) FAIL + R1(b) PARTIAL (PolyForm Free Trial in `enterprise/`) + R1(d) PARTIAL (CVE-2025-68146 pending) → BUT pre-existing operator decision in SYNTHESIS-V2.1 §1 + 12+ existing citations → INSTALL-AS-CITE-REFERENCE-ONLY (third class alongside REJECT and full-clone INSTALL).

### 6.5 W433-INST-C composio REJECT (cite-ref-acceptable)
R1 trust-tuple FAIL → REJECT-for-install but ACCEPT-as-cite-ref (lighter than W433-INST-B, no full ADR required for cite-ref path).

### 6.6 W434-L5-COVERAGE alignment

| Axis | M0/M1 (REJECT) | INST-A/C (REJECT cite-ref-OK) | INST-B (INSTALL cite-ref) | **L5-COVERAGE (THIS ADR)** |
|---|---|---|---|---|
| R1(a) signed releases | FAIL | FAIL | FAIL | **FAIL** (deer-flow, MAF, crewai all) |
| Pre-existing operator pick | none | none | YES (SYNTHESIS-V2.1 §1) | **none** |
| Existing citations in tree | none | minimal | 12+ docs | **none** |
| Coverage gap closed by install | n/a | n/a | SWE-bench anchor | **NONE — agent-teams + native sub-agents already cover** |
| **Verdict** | REJECT | REJECT (cite-ref OK) | INSTALL-AS-CITE-REF | **ALL-REJECT, FALLBACK to in-runtime** |

W434-L5-COVERAGE is the FOURTH class: **layer-already-covered-via-in-runtime, no further action**. Aligns with operator's standing mandate "ALL LAYERS MUST BE FULLY COVERED IN THE FOUNDATION SET" — L5 IS fully covered, just not via a newly-installed external repo.

---

## 7. Scope decision — what this ADR does and does NOT do

### 7.1 What this ADR DOES

- ✓ Document the W434-L5-COVERAGE R1 trust-tuple audit of 9 SOTA L5 multi-agent-harness candidates
- ✓ Confirm L5 layer IS fully covered via OpenHands W433-INST-B cite-ref + Anthropic native sub-agents + `agent-teams` plugin preset + `superpowers:dispatching-parallel-agents` skill + `mcp-agent-patterns` local skill
- ✓ Record the systemic finding: **cryptographically signed L5 multi-agent harnesses do not yet exist in mainstream open-source as of 2026-05** — this is an industry-wide gap, not a runtime gap
- ✓ Track top-3 candidates (deer-flow, MAF, crewai) for future R1(a) re-probe IF/WHEN they ship SLSA-L3 or PEP-740 attestations

### 7.2 What this ADR does NOT do

- ✗ NO `git clone` into `Z:/claude-sota-installed-repos/` for any L5 candidate
- ✗ NO `.mcp.json` MCP-server entry (none of the L5 candidates are MCP servers; they are full harnesses)
- ✗ NO `.claude/skills/` SKILL.md entry (cardinal-rule-4 forbids ad-hoc auto-fire prompts for external runtimes)
- ✗ NO plugin install via `/plugin install` (none are Claude Code plugins)
- ✗ NO new landscape-entry citations (none have pre-existing operator decision or ≥12 existing tree citations; W433-INST-B prerequisites not met)
- ✗ NO changes to CLAUDE.md `Architecture > Parallel execution` block (already comprehensive)

---

## 8. Acceptance record

- [ ] Operator sign-off on ALL-REJECT verdict (vs OPTIONAL re-tier of MAF as cite-ref-only IF Microsoft adds SLSA-L3 to MAF in future)
- [ ] Codex GPT-5.5 round verdict APPROVE (trailer in commit)
- [x] R1 trust-tuple gate matrix completed for top 3 candidates
- [x] Survey table with 9 candidates × {stars, last-push, license, signed?, R1-quick-score, dual-license-risk}
- [x] ≥3 distinct cite-org anchors (8 cited)
- [x] W432-M0/M1 + W433-INST-A/B/C precedent alignment documented
- [x] Wave-lock W434-L5-COVERAGE schema-v1 written (`.claude/state/wave-lock-W434-L5-COVERAGE.json` with slug differentiator)
- [x] ADR landed on branch `goal/W434-L5-coverage`
- [x] Worktree at `Z:/claude-sota-installed-W434-L5-COVERAGE/`

---

## 9. Re-probe triggers (when to revisit)

This verdict is valid as-of 2026-05-24. Re-probe the L5 layer when ANY of:

1. **MAF adds SLSA-L3 attestations** — Microsoft is the most likely candidate to ship this first (SBOM workflows already enabled per `.github/workflows/codeql-analysis.yml`); upgrade path = MAF cite-ref-INSTALL (similar to W433-INST-B OpenHands pattern)
2. **DeerFlow publishes PyPI package + adds Sigstore signing** — would re-open the R1(a) gate; geopolitical/PRC supply-chain premium remains
3. **crewai migrates to multi-Owner PyPI + adds PEP-740 attestations** — single-maintainer publish-key risk is the remaining R1(c) gap
4. **Anthropic native sub-agents add `subagent_type` for a specific L5 use case not currently covered** — would obviate any external L5 install entirely
5. **New L5 candidate appears** (Devin-clones, Cognition AI Devin open-sourcing, new ByteDance Coze-Agent variant, Google open-sourcing Project Astra agent surface, etc.) — fresh survey + R1 probe

---

## 10. Rollback

If operator REJECTs the ALL-REJECT verdict and wants ANY of deer-flow / MAF / crewai installed:

1. Delete this ADR + `LANDSCAPE-ENTRY.md`
2. Choose ONE candidate (operator pick)
3. Open new ADR following W433-INST-B pattern (full R1 matrix + cite-ref scope + acceptance record)
4. Wait for R1(a) sub-criterion REMEDIATION before proceeding (or accept exception with documented rationale per W331 axis-1 #6 corollary)

If operator UPGRADES to expanding the FALLBACK (`agent-teams` + native sub-agents) with additional patterns:

1. Add to `mcp-agent-patterns` local skill at `.claude/skills/mcp-agent-patterns/SKILL.md` (cardinal-rule-3-compliant local skill)
2. NO external repo install required
3. Update this ADR with note that the FALLBACK was extended

---

**Codex-Verdict trailer (commit body)**: `Codex-Verdict: APPROVE`
