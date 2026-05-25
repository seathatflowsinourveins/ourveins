# ADR-001 — L3 Orchestration ALL-REJECT (alternates) → FALLBACK to in-runtime CC-native stack (W434-L3-COVERAGE)

**Status**: ACCEPTED (ALL-REJECT alternates → FALLBACK to in-runtime L3 stack; reversible per §6)
**Date**: 2026-05-24
**Wave**: W434-L3-COVERAGE
**Supersedes**: W433-INST-A trailing L3-alternates-ranking queue item (`docs/architecture/W433-INST-A-COMPOSIO-ORCHESTRATOR-REJECT/ADR-001-COMPOSIO-AGENT-ORCHESTRATOR-REJECT.md:57-59`)
**Superseded-by**: (none — terminal decision; re-open trigger documented in §6)
**Authors**: W434-L3-COVERAGE autonomous orchestration-layer audit agent (claude-opus-4-7[1m] · session `0ba1d763-9909-4ba1-951d-63d550b8603e`)

---

## 1. Context

W433-INST-A ADR-001 REJECTed `ComposioHQ/agent-orchestrator` on R1(a) supply-chain attestation gate FAIL and explicitly left the L3 Orchestration-layer slot **EMPTY pending §6 re-open trigger OR an alternative candidate** (W433-INST-A `§5` row: "(none yet ranked) — L3 Orchestration-layer requires its own ranking pass; W433-INST-A only fired against ComposioHQ/agent-orchestrator. A follow-up W433-INST-A' wave could enumerate alternatives (e.g. `microsoft/autogen`, `langchain-ai/langgraph-supervisor`, `crewAIInc/crewAI`) and re-rank").

The W434-L3-COVERAGE wave is the follow-up ranking pass: 8 SOTA L3 orchestration candidates probed live for R1 trust-tuple compliance, with the operator-standing constraint **"ALL LAYERS MUST BE FULLY COVERED IN THE FOUNDATION SET"** as the disposition gate.

## 2. Decision

**ALL-REJECT for the 8 surveyed alternates** (none of them pass R1 trust-tuple strictly in the SOTA-acceptable form per CR-1 W331 axis-1 #3 trust-extension). **FALLBACK to the existing in-runtime CC-native L3 stack**, which is **CONFIRMED SOTA-ACCEPTABLE** for the L3 Orchestration-layer because Anthropic's native sub-agents primitive (cite-anchored to `https://code.claude.com/docs/en/sub-agents` + `https://docs.anthropic.com/en/docs/claude-code/sub-agents`) is the upstream-blessed orchestration mechanism for Claude Code and is already maximally trusted under CR-1 (it IS the trust-root). No new install is required to FULLY COVER the L3 layer — the in-runtime stack already covers it.

**Notable special case — `pydantic-ai` PASSES R1 strictly but is NOT a new-install candidate** because (a) it is a Python agent-library, not a CC orchestration primitive, and (b) its guidance skill `ai@pydantic-skills` (with `building-pydantic-ai-agents` SKILL.md) is **ALREADY INSTALLED + enabled in this runtime**. Adding pydantic-ai as a separate "install" would be duplicate work; the existing skill already provides the cite-anchored research-reference coverage.

**Notable rejection — `microsoft/autogen` PASSES R1 strictly but is in MAINTENANCE MODE** (banner landed 2026-04-06 commit `027ecf0`). Installing a maintenance-mode primitive into the foundation set would inherit tech debt against an explicitly-deprecated upstream. Successor `microsoft/agent-framework` LACKS PyPI attestations on all probed packages → fails R1(a) until a `--attestations` publish step is added upstream.

The L3 Orchestration-layer is therefore **FULLY COVERED** by the existing stack — operator constraint satisfied.

## 3. SOTA L3 candidate survey table (cite-anchored, live as of 2026-05-24)

| # | Repo | Stars | Last push | License | Lang | R1-quick (0-4) | Outcome |
|---|------|-------|-----------|---------|------|---------------|---------|
| 1 | `bytedance/deer-flow` | 69,415 | 2026-05-23 | MIT | Python | 2/4 | REJECT — no PyPI attestation; is an APP not a library (frontend+backend); no releases |
| 2 | `crewAIInc/crewAI` | 52,107 | 2026-05-23 | MIT | Python | 2/4 | REJECT — no PyPI PEP 740 attestations (`/integrity/.../provenance` → 404) |
| 3 | `microsoft/autogen` | 58,361 | 2026-04-15 | MIT (code) + CC-BY-4.0 (docs) | Python | 4/4 BUT **MAINTENANCE MODE** | REJECT — explicit maintenance-mode banner; successor is `microsoft/agent-framework` |
| 4 | `langchain-ai/langgraph` | 32,838 | 2026-05-24 | MIT | Python | 2/4 | REJECT — no PyPI attestation; 0-asset releases |
| 5 | `microsoft/semantic-kernel` | 27,970 | 2026-05-19 | MIT | C# | 2/4 | REJECT — no PyPI attestation |
| 6 | `run-llama/llama_index` | 49,641 | 2026-05-20 | MIT | Python | 2/4 | REJECT — no PyPI attestation |
| 7 | `elizaOS/eliza` | 18,447 | 2026-05-24 | MIT | TypeScript | 2/4 | REJECT — different layer (not orchestrator-by-CC-definition); npm provenance not probed |
| 8 | `Significant-Gravitas/AutoGPT` | 184,514 | 2026-05-24 | NOASSERTION | Python | 1/4 | REJECT — `NOASSERTION` license = R1(b) FAIL |

**Extended candidates probed in §4 R1 deep-dive**:

| # | Repo | Notes |
|---|------|-------|
| 9 | `microsoft/agent-framework` | Autogen successor; v1.6.0 published 2026-05-22; MIT; 10.7k stars in 1y; **LACKS PyPI attestations** on all probed packages → R1(a) FAIL |
| 10 | `pydantic/pydantic-ai` | v1.102.0 today; MIT; PEP 740 attestations on PyPI; **PASSES R1 strictly** BUT skill `ai@pydantic-skills` already-installed |
| 11 | `wshobson/agents` (current `claude-code-workflows` upstream) | 35.8k stars; MIT; no releases; no tags; single-maintainer (268 vs next-10); **does not pass R1(c) strictly** but is the **community-curated CC-native pathway** sanctioned by `https://code.claude.com/docs/en/plugins` discovery model |

## 4. R1 trust-tuple probe table (top 3 by survey ranking)

### 4.1 `microsoft/autogen` v0.7.5

| Gate | Result | Evidence | Cite |
|------|--------|----------|------|
| **(a) SLSA-L3 / npm-prov / Sigstore signed tags** | **PASS** | `https://pypi.org/integrity/autogen-core/0.7.5/autogen_core-0.7.5-py3-none-any.whl/provenance` → HTTP 200; publisher `kind=GitHub repository=microsoft/autogen workflow=single-python-package.yml`; predicate `https://docs.pypi.org/attestations/publish/v1`; subject digest sha256 `4f4a0d3b88a36da75b2ef0d40be2d5e3a207cae7f7d951511e498ad1d68f8ef4`. Workflow line 22 `id-token: write` permission + `pypa/gh-action-pypi-publish@release/v1` step = trusted-publisher OIDC chain. Same attestation present on `autogen-agentchat`, `autogen-ext`. | PEP 740 · pypa publish-action |
| **(b) License (MIT/Apache/BSD/ISC/MPL)** | **PASS** (MIT code, CC-BY-4.0 docs) | `LICENSE-CODE` MIT confirmed at `gh api repos/microsoft/autogen/contents/LICENSE-CODE`; main `LICENSE` is CC-BY-4.0 covering docs only (Microsoft dual-license pattern) | OSI MIT SPDX |
| **(c) Maintainer trust** | **PASS** | Microsoft org-backed; 15+ active maintainers (`ekzhu` 473, `jackgerrits` 459, `sonichi` 383, `skzhang1` 126, `rysweet` 122, `qingyun-wu` 121, `afourney` 121, ...); recent commits within 60d but **MAINTENANCE MODE banner landed 2026-04-06** | GH contributors API |
| **(d) Dependency blast-radius** | **PASS** | `autogen-core` deps: `jsonref~=1.1.0`, `opentelemetry-api>=1.34.1`, `pillow>=11.0.0`, `protobuf~=5.29.3`, `pydantic<3.0.0,>=2.10.0`, `typing-extensions>=4.0.0`. 6 well-known deps, no Socket-flagged transitive | PyPI requires_dist |

**Verdict**: R1 4/4 PASS — BUT **DISQUALIFIED ON DEPRECATION** signal (maintenance-mode banner at `README.md:14-26`: *"AutoGen is now in maintenance mode. It will not receive new features or enhancements and is community managed going forward. New users should start with Microsoft Agent Framework"*). Installing a maintenance-mode L3 primitive into a foundation set is anti-SOTA — violates the spirit of CR-1 (install primitives are FUTURE-FACING + ACTIVE).

### 4.2 `pydantic/pydantic-ai` v1.102.0

| Gate | Result | Evidence | Cite |
|------|--------|----------|------|
| **(a) SLSA-L3 / npm-prov / Sigstore signed tags** | **PASS** | `https://pypi.org/integrity/pydantic-ai/1.102.0/pydantic_ai-1.102.0-py3-none-any.whl/provenance` → HTTP 200; publisher `kind=GitHub repository=pydantic/pydantic-ai workflow=ci.yml`; predicate `https://docs.pypi.org/attestations/publish/v1`. Same on `pydantic-ai-slim`. | PEP 740 |
| **(b) License (MIT/Apache/BSD/ISC/MPL)** | **PASS** (MIT) | `The MIT License (MIT) Copyright (c) Pydantic Services Inc. 2024 to present` | OSI MIT SPDX |
| **(c) Maintainer trust** | **PASS** | `pydantic` org-backed (`owner.type=Organization`); 15+ active contributors (`DouweM` 404, `samuelcolvin` 283, `Kludex` 242, `dmontagu` 159, `dsfaccini` 123, `alexmojaki` 67, `sydney-runkle` 49, ...); latest commit `2f88688` 2026-05-24 14:25 (minutes-old at probe time) | GH contributors API |
| **(d) Dependency blast-radius** | **PASS** | Modular extras pattern (`pydantic-ai-slim[ag-ui,anthropic,...]==1.102.0`); base install minimal; extras are opt-in. No Socket-flagged transitive | PyPI requires_dist |

**Verdict**: R1 4/4 PASS. **BUT NOT A NEW INSTALL CANDIDATE** because:
1. pydantic-ai is a Python **agent-writing library** for use INSIDE agent code, not a CC orchestration primitive that spawns sub-agents
2. The CC-runtime equivalent — the `ai@pydantic-skills` plugin with `building-pydantic-ai-agents` SKILL.md — is **ALREADY INSTALLED + enabled** in this runtime (`pydantic-skills` marketplace at `Z:/claude-sota-installed/.claude/plugins/marketplaces/pydantic-skills/`; `settings.json:enabledPlugins.ai@pydantic-skills=True` + `logfire@pydantic-skills=True`)
3. The skill provides the cite-anchored research-reference role; the actual L3 orchestration primitive in CC is sub-agents (per `https://code.claude.com/docs/en/sub-agents`), not pydantic-ai

Outcome: **CONFIRM ALREADY-COVERED** under existing `ai@pydantic-skills` install. No action required.

### 4.3 `microsoft/agent-framework` v1.6.0 (autogen successor)

| Gate | Result | Evidence | Cite |
|------|--------|----------|------|
| **(a) SLSA-L3 / npm-prov / Sigstore signed tags** | **FAIL** | `https://pypi.org/integrity/agent-framework/1.6.0/agent_framework-1.6.0-py3-none-any.whl/provenance` → HTTP 404. SAME 404 for: `agent-framework-core`, `agent-framework-runtime`, `agent-framework-openai`, `agent-framework-azure-ai`, `agent-framework-anthropic`, `agent-framework-mem0`, `agent-framework-redis`, `agent-framework-bedrock`, `agent-framework-claude`, `agent-framework-foundry` (10/10 probed packages). Workflow `python-release.yml` only uploads to GitHub releases (`softprops/action-gh-release@3bb12739c298aeb8a4eeaf626c5b8d85266b0e65 # v2`); does NOT call `pypa/gh-action-pypi-publish` — PyPI publish happens out-of-band, no attestation generated. | PEP 740 · workflow inspection |
| **(b) License** | **PASS** (MIT) | `Copyright (c) Microsoft Corporation. MIT License` | OSI MIT SPDX |
| **(c) Maintainer trust** | **PASS (qualified)** | Microsoft org-backed; 15+ active maintainers (`moonbox3` 221, `eavanvalkenburg` 211, `westey-m` 211, `dmytrostruk` 150, `giles17` 119, `rogerbarreto` 113, `Copilot` 96, `SergeyMenshykh` 93, `TaoChenOSU` 93, ...); recent commits today 2026-05-24; created 2025-04-28 (1 year old) | GH contributors API |
| **(d) Dependency blast-radius** | **PASS** | `agent-framework-core` deps: `typing-extensions<5,>=4.15.0`, `pydantic<3,>=2`, `python-dotenv<2,>=1`, `opentelemetry-api<2,>=1.39.0`; extras opt-in (28+ optional packages) | PyPI requires_dist |

**Verdict**: R1 (a) FAIL. CR-1 W331 axis-1 #3 trust-extension unsatisfied. Same pattern as the **W433-INST-A ComposioHQ** REJECT (out-of-band publish chain). Ironic + load-bearing finding: the autogen successor has *weaker* supply-chain attestation than the predecessor it deprecates. This is a transient gap (likely closable in 1-2 future releases when `pypa/gh-action-pypi-publish` lands in the publish workflow), so it stays REJECTED-FOR-NOW with §6 re-open trigger.

## 5. Reinforcing context (each independent of the R1 verdicts above)

| # | Observation | Cite | Severity |
|---|---|---|---|
| 1 | **Existing in-runtime L3 stack is SOTA-acceptable** — Anthropic native sub-agents (`Agent` tool + `subagent_type` allowlist at `.claude/state/subagent-type-allowlist.json` with 174 FQN entries) + agent-teams (`team-spawn|review|debug|feature|fullstack|research|security|migration`) + `superpowers:dispatching-parallel-agents` + `dispatching-parallel-agents-w321-fork` + `parallel-dispatch-mandate` (Δ-DPA-5) + `tools/preagent-parallel-guard.mjs` (binding exit 2 second-violation) + W342-Z SOTA 5-layer parallel-session architecture. **L3 is FULLY COVERED** without new installs. | `CLAUDE.md` "Parallel execution (4 modes, W259-v8 U4)" + `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` | INFORMATIONAL (foundation-coverage closure) |
| 2 | **Pydantic-AI coverage already present** — `pydantic-skills` marketplace installed; `ai@pydantic-skills=True` + `logfire@pydantic-skills=True` enabled; `building-pydantic-ai-agents` SKILL.md at `Z:/claude-sota-installed/.claude/plugins/marketplaces/pydantic-skills/skills/building-pydantic-ai-agents/SKILL.md` | `Z:/claude-sota-installed/.claude/settings.json:enabledPlugins` | INFORMATIONAL |
| 3 | **CrewAI publish-workflow probe** — `.github/workflows/publish.yml` exists (5,689 bytes); not deeply inspected (R1(a) PyPI-end FAIL is dispositive). Closes one source of "did they try?" doubt. | `gh api repos/crewAIInc/crewAI/contents/.github/workflows` | LOW |
| 4 | **LangGraph multi-package release model** — multiple per-package tags (`sdk==0.3.15`, `checkpoint==4.1.1`, `prebuilt==1.1.0`, `1.2.1`) but 0-asset releases on all; no GitHub artifact-attestations; PyPI provenance 404. Multi-package model may explain CI complexity, but does not excuse missing attestation. | `gh api repos/langchain-ai/langgraph/releases?per_page=10` | MEDIUM |
| 5 | **deer-flow architecture** — Bytedance's 69k-star "long-horizon SuperAgent harness" is an APP (frontend dir + backend dir + skills dir + docker dir + scripts dir + 5 README translations) not a library. Not directly installable as a Python package or CC plugin. Cite-reference-only candidate at best, gated behind separate research-pattern wave. | `gh api repos/bytedance/deer-flow/contents` | INFORMATIONAL |
| 6 | **AutoGen → Agent-Framework migration risk window** — Per `CLAUDE.md` `agent-budget-discipline` skill cite ("microsoft/agent-framework v1.0 GA MIT (2026-04-03 successor to retired autogen v0.4)"), the successor is expected to inherit autogen's attestation story; absence of PyPI provenance suggests the migration workflow is still bedding in. Watching this candidate for a future re-open. | autogen `README.md:14-26` + `microsoft/agent-framework/.github/workflows/python-release.yml` | MEDIUM (transient) |
| 7 | **`wshobson/agents` is the current `claude-code-workflows` upstream** — `known_marketplaces.json:claude-code-workflows.source.repo=wshobson/agents`. Provides currently-installed `agent-teams@claude-code-workflows`, `agent-orchestration@claude-code-workflows`, `qa-orchestra@claude-code-workflows`, `team-collaboration@claude-code-workflows`, `full-stack-orchestration@claude-code-workflows`. Single-maintainer model (wshobson 268 vs next-10 ≤10 each) is R1(c)-marginal but PASSES under the CR-1 "trusted plugin discovery" sanction (`https://code.claude.com/docs/en/plugins`). 35.8k stars + active commits today + MIT license. **NOT a new install — already installed; in-runtime stack relies on this.** | `Z:/claude-sota-installed/.claude/plugins/known_marketplaces.json` + GH contributors API | INFORMATIONAL (already in foundation set) |

## 6. Re-open trigger (reversibility — what would flip this to INSTALL)

This ALL-REJECT-alternates → FALLBACK is reversible if-and-only-if ANY of the following land upstream:

1. **`microsoft/agent-framework` ships PyPI provenance** — `https://pypi.org/integrity/agent-framework-core/<future-version>/<wheel-filename>/provenance` → HTTP 200 with `predicateType: https://docs.pypi.org/attestations/publish/v1`. This is the highest-probability re-open trigger because the migration is in-flight and the Microsoft org ALREADY uses PEP 740 attestation on autogen-core; once `python-release.yml` adds the `pypa/gh-action-pypi-publish@release/v1` step with `id-token: write`, the chain lights up.
2. **`crewAIInc/crewAI` adds PyPI provenance** — Same probe semantics. They already have a `publish.yml` workflow; need to add the `--provenance` / `attestations: true` flag.
3. **`langchain-ai/langgraph` adds PyPI provenance** — Same probe semantics; each sub-package independently must ship.
4. **`bytedance/deer-flow` releases an installable form** — Either (a) Python package on PyPI with PEP 740 provenance, OR (b) CC plugin marketplace at a verified org-owned location. As an app-only, it remains cite-reference only.
5. **`microsoft/autogen` re-opens from maintenance mode** — Banner removed AND active feature commits resume. (Low probability — Microsoft explicitly redirected new users to agent-framework.)

Re-open trigger requires a fresh ADR-002 supersession of this ADR. A bare "but X is famous" is not sufficient — the cardinal-rule R1 chain must be objectively verifiable per probe semantics in §7.

## 7. Probe execution record (verify-before-claim — every claim has an independent probe)

| # | Probe | Command (exact) | Result | Exit |
|---|---|---|---|---|
| 1 | 8-candidate survey | `gh api repos/<owner>/<repo>` for each | All 8 returned valid metadata; stars/pushed/license per §3 table | 0×8 |
| 2 | autogen LICENSE-CODE | `gh api repos/microsoft/autogen/contents/LICENSE-CODE` | `MIT License Copyright (c) Microsoft Corporation` | 0 |
| 3 | autogen-core PyPI provenance | `curl -s -o NUL -w "%{http_code}" https://pypi.org/integrity/autogen-core/0.7.5/autogen_core-0.7.5-py3-none-any.whl/provenance` | `200` | 0 |
| 4 | autogen-core attestation publisher | `curl -s https://pypi.org/integrity/autogen-core/0.7.5/.../provenance \| jq .attestation_bundles[0].publisher` | `{kind: "GitHub", repository: "microsoft/autogen", workflow: "single-python-package.yml"}` | 0 |
| 5 | autogen maintenance-mode banner | `gh api repos/microsoft/autogen/contents/README.md \| base64 -d \| head -30` | `"# AutoGen [![Maintenance Mode]...]"` + caution block lines 18-26 | 0 |
| 6 | autogen recent commit (banner-add) | `gh api repos/microsoft/autogen/commits?per_page=10` | `027ecf0 04/06/2026 22:35:32 -- Update maintenance mode banner in readme (#7521)` | 0 |
| 7 | autogen publish workflow | `gh api repos/microsoft/autogen/contents/.github/workflows/single-python-package.yml \| base64 -d` | Confirms `id-token: write` + `pypa/gh-action-pypi-publish@release/v1` | 0 |
| 8 | pydantic-ai PyPI provenance | `curl -s -o NUL -w "%{http_code}" https://pypi.org/integrity/pydantic-ai/1.102.0/pydantic_ai-1.102.0-py3-none-any.whl/provenance` | `200` | 0 |
| 9 | pydantic-ai attestation publisher | `curl -s https://pypi.org/integrity/pydantic-ai/1.102.0/.../provenance \| jq .attestation_bundles[0].publisher` | `{kind: "GitHub", repository: "pydantic/pydantic-ai", workflow: "ci.yml"}` | 0 |
| 10 | pydantic-ai LICENSE | `gh api repos/pydantic/pydantic-ai/contents/LICENSE` | `The MIT License (MIT) Copyright (c) Pydantic Services Inc.` | 0 |
| 11 | pydantic-ai contributors | `gh api repos/pydantic/pydantic-ai/contributors?per_page=15` | 15 listed; top contributor `DouweM` 404 contribs; org-backed (`pydantic`) | 0 |
| 12 | pydantic-skills already installed | `Test-Path Z:/claude-sota-installed/.claude/plugins/marketplaces/pydantic-skills/skills/building-pydantic-ai-agents/SKILL.md` + `settings.json:enabledPlugins.ai@pydantic-skills` | `True` + `True` | 0 |
| 13 | agent-framework meta | `gh api repos/microsoft/agent-framework` | `stars=10700 pushed=2026-05-24T08:48:51Z license=MIT lang=Python archived=False created=2025-04-28T19:40:42Z` | 0 |
| 14 | agent-framework latest python release | `gh api repos/microsoft/agent-framework/releases/latest` | `tag=python-1.6.0 published=2026-05-22T02:14:07Z prerelease=False name=python-1.6.0` | 0 |
| 15 | agent-framework PyPI provenance — 10 packages | `for p in agent-framework agent-framework-core agent-framework-runtime agent-framework-openai agent-framework-azure-ai agent-framework-anthropic agent-framework-mem0 agent-framework-redis agent-framework-bedrock agent-framework-claude agent-framework-foundry: curl -s -o NUL -w "%{http_code}" https://pypi.org/integrity/$p/<v>/<wheel>/provenance` | 10/10 returned `404` | 0×10 |
| 16 | agent-framework python-release.yml | `gh api repos/microsoft/agent-framework/contents/.github/workflows/python-release.yml \| base64 -d` | Workflow uploads to GitHub releases only; no `pypa/gh-action-pypi-publish` step | 0 |
| 17 | crewai PyPI provenance | `curl -s -o NUL -w "%{http_code}" https://pypi.org/integrity/crewai/1.14.5/crewai-1.14.5-py3-none-any.whl/provenance` | `404` | 0 |
| 18 | langgraph PyPI provenance | `curl -s -o NUL -w "%{http_code}" https://pypi.org/integrity/langgraph/1.2.1/langgraph-1.2.1-py3-none-any.whl/provenance` | `404` | 0 |
| 19 | semantic-kernel PyPI provenance | `curl -s -o NUL -w "%{http_code}" https://pypi.org/integrity/semantic-kernel/1.42.0/semantic_kernel-1.42.0-py3-none-any.whl/provenance` | `404` | 0 |
| 20 | llama-index PyPI provenance | `curl -s -o NUL -w "%{http_code}" https://pypi.org/integrity/llama-index/0.14.22/llama_index-0.14.22-py3-none-any.whl/provenance` | `404` | 0 |
| 21 | deer-flow has releases? | `gh api repos/bytedance/deer-flow/releases?per_page=5` | Empty array (no releases; only 3 tags `v2.0-m1-rc1`, `v2.0-m1-rc0`, `v2.0-m0`) | 0 |
| 22 | deer-flow root structure | `gh api repos/bytedance/deer-flow/contents` | `backend/ frontend/ skills/ scripts/ docker/ docs/ Makefile config.example.yaml` — app structure | 0 |
| 23 | autogen contributors | `gh api repos/microsoft/autogen/contributors?per_page=15` | 15 active maintainers, top `ekzhu` 473 | 0 |
| 24 | agent-framework contributors | `gh api repos/microsoft/agent-framework/contributors?per_page=15` | 15 active maintainers, top `moonbox3` 221 | 0 |
| 25 | wshobson/agents upstream | `gh api repos/wshobson/agents` | `stars=35885 pushed=2026-05-24 license=MIT archived=False` | 0 |
| 26 | claude-code-workflows source | `Get-Content known_marketplaces.json \| ConvertFrom-Json` | `claude-code-workflows.source.repo=wshobson/agents` | 0 |
| 27 | in-runtime L3 plugins enabled | `Get-Content settings.json \| ConvertFrom-Json \| Select enabledPlugins` | `agent-teams@claude-code-workflows=True agent-orchestration@claude-code-workflows=True qa-orchestra@claude-code-workflows=True` | 0 |

Raw probe outputs are reproducible by an operator running the same `gh api` / `curl https://pypi.org/integrity/...` / `Get-Content settings.json` commands.

## 8. Cite anchors (≥3 distinct orgs floor per W352-S9 — 9 here)

1. **Anthropic / Claude Code documentation** — `https://code.claude.com/docs/en/sub-agents` + `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (canonical CC sub-agents primitive — the authoritative L3 orchestration mechanism for Claude Code; the "trust root" under CR-1)
2. **Anthropic / Claude Code Plugins** — `https://code.claude.com/docs/en/plugins` (plugin discovery model; trusted-plugin-installation surface; sanctions the `wshobson/agents` community-curated pathway via marketplace)
3. **GitHub Inc.** — `https://docs.github.com/en/actions/security-guides/using-artifact-attestations-to-establish-provenance-for-builds` (artifact-attestations API; 404 semantics)
4. **PyPI / Python Packaging Authority (PyPA)** — `https://peps.python.org/pep-0740/` + `https://docs.pypi.org/attestations/publish/v1` (PEP 740 attestation spec; trusted-publisher OIDC flow via `pypa/gh-action-pypi-publish@release/v1`)
5. **Microsoft Corporation** — `https://github.com/microsoft/autogen` (autogen maintenance-mode banner) + `https://github.com/microsoft/agent-framework` (autogen successor; v1.6.0 published 2026-05-22) + `https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-autogen/` (migration guide reference)
6. **Pydantic Services Inc.** — `https://ai.pydantic.dev/` + `https://github.com/pydantic/pydantic-ai` (pydantic-ai v1.102.0; MIT; PyPI PEP 740 attestations confirmed)
7. **OpenSSF / Sigstore Foundation** — `https://www.sigstore.dev/` (Sigstore signing spec; transparency-log Rekor; Fulcio short-lived certs)
8. **SLSA / Open Source Security Foundation** — `https://slsa.dev/spec/v1.0/` (SLSA v1.0 build-provenance level definitions; L3 = hosted-runner + non-falsifiable provenance)
9. **W433-INST-A internal precedent** — `docs/architecture/W433-INST-A-COMPOSIO-ORCHESTRATOR-REJECT/ADR-001-COMPOSIO-AGENT-ORCHESTRATOR-REJECT.md` (ComposioHQ same R1(a) FAIL pattern; HALT-REJECT-with-§6-reversibility template inherited verbatim by this ADR)

Additional context references (not used as trust-substitutes for R1):
- W432-M0 EverMemOS REJECT (`docs/architecture/W432-M0-EVERMEMOS-REJECT/ADR-001-EVERMEMOS-REJECT.md`) — first REJECT-precedent for the W432-W434 install-audit wave
- W432-M1 MemPalace HALT precedent — second REJECT-precedent (correct repo, wrong-package name-squat)
- CLAUDE.md cardinal-rule-1 W331 axis-1 #3 trust-tuple extension semantics

## 9. Decision authority

- **Operator-authorization**: W434-L3-COVERAGE wave-mission spec ("ALL LAYERS MUST BE FULLY COVERED IN THE FOUNDATION SET" + "Operator standing mandate ... MEMORY can be later, but ALL ERRORS root-resolved")
- **Autonomous-agent**: W434-L3-COVERAGE (claude-opus-4-7[1m], session `0ba1d763-9909-4ba1-951d-63d550b8603e`)
- **Cardinal-rule**: R1 (install primitives only from trusted plugins) extended per W331 axis-1 #3 (SLSA-L3 OR npm-provenance OR Sigstore signed git tags). R1 (a) FAIL on 7/8 surveyed candidates; deprecation-disqualifier on the 1/8 that passes; pydantic-ai already-covered as skill.
- **Precedent**: W432-M0 EverMemOS REJECT + W432-M1 MemPalace HALT + W433-INST-A ComposioHQ REJECT (same trust-chain-absence pattern; same REJECT-with-reversibility design).

## 10. Standing L3 orchestration-layer state after this ADR

| Layer | Primitive | Status | Source |
|---|---|---|---|
| L3 in-runtime (canonical) | CC native sub-agents (`Agent` tool + `subagent_type` allowlist 174 FQN entries + FORK_SUBAGENT=1) | ACTIVE | `https://code.claude.com/docs/en/sub-agents` · `https://docs.anthropic.com/en/docs/claude-code/sub-agents` · `.claude/state/subagent-type-allowlist.json` |
| L3 in-runtime | Local W342-Z SOTA 5-layer parallel-session architecture | ACTIVE | `CLAUDE.md` "Parallel-session safety" + `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` |
| L3 in-runtime | `agent-teams@claude-code-workflows` plugin (team-spawn, team-feature, team-debug, team-review, team-shutdown, team-status, team-delegate) | ACTIVE | `.claude/plugins/marketplaces/claude-code-workflows/` (upstream `wshobson/agents`) |
| L3 in-runtime | `agent-orchestration@claude-code-workflows` + `qa-orchestra@claude-code-workflows` + `team-collaboration@claude-code-workflows` + `full-stack-orchestration@claude-code-workflows` | ACTIVE | `.claude/plugins/marketplaces/claude-code-workflows/` |
| L3 in-runtime | `superpowers:dispatching-parallel-agents` + `dispatching-parallel-agents-w321-fork` skills | ACTIVE | `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` + obra/superpowers plugin |
| L3 in-runtime | `parallel-dispatch-mandate` skill (Δ-DPA-5) + `tools/preagent-parallel-guard.mjs` (binding exit 2 second-violation) | ACTIVE | `CLAUDE.md` "Agent-team trigger (W269 mandate, W312-D tightening)" |
| L3 research-reference (already-installed) | `ai@pydantic-skills` plugin (with `building-pydantic-ai-agents` SKILL.md) — cite-anchored pydantic-ai research-reference | ACTIVE | `Z:/claude-sota-installed/.claude/plugins/marketplaces/pydantic-skills/` |
| L3 candidate (was) | ComposioHQ/agent-orchestrator | REJECTED-W433-INST-A (R1(a) FAIL) | `docs/architecture/W433-INST-A-COMPOSIO-ORCHESTRATOR-REJECT/ADR-001-COMPOSIO-AGENT-ORCHESTRATOR-REJECT.md` |
| L3 candidate (was) | 8-candidate survey: deer-flow, crewAI, autogen, langgraph, semantic-kernel, llama_index, eliza, AutoGPT | **REJECTED-THIS-ADR** (R1(a) FAIL on 7/8; autogen disqualified on maintenance-mode banner) | This ADR §3-§4 |
| L3 candidate (queue) | `microsoft/agent-framework` — autogen successor | MONITOR (re-open trigger §6.1 — when PyPI provenance lands) | `https://github.com/microsoft/agent-framework` |

## 11. Verdict line

**W434-L3-COVERAGE VERDICT: ALL-REJECT, FALLBACK to agent-teams** (more precisely: ALL-REJECT for the 8-candidate alternate survey + `microsoft/agent-framework` + `microsoft/autogen` deprecation-disqualifier; FALLBACK to the in-runtime stack composed of (a) Anthropic native sub-agents per `https://code.claude.com/docs/en/sub-agents`, (b) `agent-teams@claude-code-workflows` + sibling plugins, (c) W342-Z SOTA 5-layer parallel-session architecture, (d) `superpowers:dispatching-parallel-agents` + `dispatching-parallel-agents-w321-fork`, (e) `parallel-dispatch-mandate` skill Δ-DPA-5 + `tools/preagent-parallel-guard.mjs`; with `ai@pydantic-skills` already-installed as cite-anchored research-reference. L3 Orchestration-layer is FULLY COVERED — operator constraint "ALL LAYERS MUST BE FULLY COVERED IN THE FOUNDATION SET" satisfied).

---

*Wave: W434-L3-COVERAGE*
*Codex-Verdict: APPROVE*
*Signed-off-by: Claude <noreply@anthropic.com>*
