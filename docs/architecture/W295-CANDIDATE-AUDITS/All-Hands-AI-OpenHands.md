# W295 Candidate Audit — `All-Hands-AI/OpenHands` (renamed `OpenHands/OpenHands`)

> **Rubric**: sota-convergence-audit v3.1 (W293 17-dim, dual install_score+pattern_score, 5-tier soft-gate ladder)
> **Decided**: 2026-05-18
> **Decided by**: sota-convergence-audit (W295 wave) + pending codex Stop-hook
> **Audit scope**: 30 min wall-clock, 6+ MCP/Web evidence channels, dual-composite scoring under v3.1
> **Rule version**: `sca-v3.1` (full weight 1.0)
> **Wave context**: W289-F3 SOTA discovery surfaced this as prelim-T2 code-agent candidate; this audit settles the tier verdict.

---

## §1. Candidate identity + adoption question

| Field | Value |
|---|---|
| Repo (current) | `OpenHands/OpenHands` (renamed from `All-Hands-AI/OpenHands` ~Q4 2025) |
| Upstream URL | https://github.com/OpenHands/OpenHands |
| Description | Open platform for autonomous AI software developers (code-agent runtime) |
| Domain | **Competing-architecture runtime** — peer/competitor to Claude Code itself, not a CC plugin |
| License | **MIT for `openhands/` + `agent-server/` core; separate license for `enterprise/`** (`LICENSE` file `[EXTERNAL]` https://raw.githubusercontent.com/All-Hands-AI/OpenHands/main/LICENSE accessed 2026-05-18). GitHub API `license.spdx_id = "NOASSERTION"` due to mixed-license repo. |
| Latest activity | `updated_at: 2026-05-18T18:28:28Z`, `created_at: 2024-03-13` — 26-month active repo |
| Stars / Forks | 73,981★ / 9,383 forks (GitHub API, accessed 2026-05-18) |
| Maintainer | All Hands AI (commercial entity, Boston MA). Founders: Robert Brennan (CEO), Xingyao Wang (CAIO), Graham Neubig (Chief Scientist, CMU faculty). $23.8M total funding (Series A Madrona+Menlo+Fujitsu, Nov 2025) `[EXTERNAL]` https://openhands.dev/blog/weve-just-raised-18-8m... accessed 2026-05-18. |
| Org rename signal | **Silent SHA-class drift** — repo moved from `All-Hands-AI/*` to `OpenHands/*`; existing docs/integrations referencing the old org auto-redirect but break under W270 governance discipline. Operator-action items listed in OpenHands troubleshooting docs `[EXTERNAL]` https://docs.all-hands.dev/openhands/usage/troubleshooting accessed 2026-05-18. |
| Adoption question | Should the W290 runtime adopt OpenHands as: (a) a peer agent platform via subprocess (T1/T2 install equivalent), (b) vendor-fork a subset of its skills/plugins/agents into Claude-Code, (c) extract architectural patterns only (T3), or (d) cite-only (T4)? |

**Harness-fit gating question**: OpenHands is itself a **code-agent runtime**, not a Claude Code plugin / skill / MCP server. **It is structurally a competing-runtime**, NOT an integrable primitive. Therefore T1 INSTALL is architecturally inapplicable to this runtime (which IS Claude Code). The realistic tier ceiling is T2 VENDOR-FORK (specific assets liftable into CC shape) or T3 PATTERN-STUDY.

---

## §2. Discovery — 4+ source families (v3 Stream A minimum)

Six independent source families consulted:

1. **DeepWiki** (`ask_question` on `All-Hands-AI/OpenHands`): agent architecture (CodeAct loop), sandbox model (Docker + Remote + Local runtimes), MCP integration model (`AgentSettings.MCPConfig`), license breakdown, Windows pathway (WSL2/Docker-only, not native). Cited file `frontend/src/types/core/actions.ts` for action space. `[EXTERNAL]` DeepWiki query 2026-05-18.
2. **GitHub API** (`/repos/All-Hands-AI/OpenHands` → 301 redirect): 73,981★, 9,383 forks, 408 open issues, `license.spdx_id="NOASSERTION"`, `default_branch="main"`, `archived=false`, topics `[agent, claude-ai, cli, llm, openai, ...]`, `updated_at=2026-05-18T18:28:28Z`. Active development confirmed at audit-time.
3. **Official docs** (https://docs.all-hands.dev, https://docs.openhands.dev): MCP server management via `~/.openhands/mcp.json` (Claude-Code-compatible `mcpServers` format), `openhands mcp add` CLI, runtime model (Docker/Remote/Local), Windows = "OpenHands only supports Windows via WSL" `[EXTERNAL]` https://docs.all-hands.dev/openhands/usage/troubleshooting accessed 2026-05-18.
4. **Practitioner blogs / SWE-bench leaderboard** `[EXTERNAL]`:
   - https://agentmarketcap.ai/blog/2026/04/10/open-source-coding-agents-2026... (Apr 2026): "OpenHands clears 53%+ when paired with Claude 4.5"; "60,000+ stars, 4M downloads"; "contributions from engineers at AMD, Apple, Google, Amazon, Netflix, NVIDIA, Mastercard, VMware"
   - https://rightaichoice.com/blog/ai-coding-assistant-leaderboard-swe-bench-humaneval-2026 (Apr 2026): OpenHands+Sonnet 4.6 = ~61% SWE-bench Verified, beats Cline/Aider/Devin
   - https://starlog.is/articles/.../openhands-openhands (May 2026): claims **77.6% SWE-bench Verified** (newest measurement available 2026)
   - https://localaimaster.com/blog/openhands-vs-swe-agent (Feb 2026): OpenHands+Claude 4.5 Extended Thinking = 72%; with Critic Model = 66.4%
5. **Hacker News practitioner threads** `[EXTERNAL]`:
   - https://news.ycombinator.com/item?id=42736810 (creator Robert Brennan): "~20% of commits to OpenHands codebase are now authored or co-authored by OpenHands itself"; "agents are improving on a weekly basis"
   - https://news.ycombinator.com/item?id=44051241 (Show HN): "one of the top 50 python projects of all time"; competitive with Devin/Codex/Jules
6. **Bug-tracker / failure-mode evidence** `[EXTERNAL]`:
   - Issue #12500 (Jan 2026): "Sandbox container starts but OpenHands fails to connect via `host.docker.internal`" — Windows 11 + Docker Desktop + WSL2 — required `OH_WEB_URL=http://$(hostname -f):3000 + SANDBOX_CONTAINER_URL_PATTERN=http://$(hostname -f):{port}` workaround
   - Issue #7830 (Apr 2025): "Runtime initialization fails on WSL" — `Connection reset by peer` errors during docker_runtime connect
   - Issue #7269 (Mar 2025): "Docker compose doesn't work out of the box under Windows" — official response: "for Windows please use WSL"
   - Issue #3810 (Sep 2024): "Why do I 'must use WSL'?" — maintainer reply: "WSL is necessary, sorry, for the project to work well. ... we don't support that configuration [native Windows], we don't have it and don't test on it"

**Convergence diversity check (v3 Step 3 typed evidence)**:

- **BENCHMARK with numbers (≥1 required)**: ✓ SWE-bench Verified 77.6% (Starlog May 2026), 72% (LocalAiMaster Feb 2026), 61% (RightAIChoice Apr 2026), 53% (CodeAct 2.1 Nov 2025) — multiple measured values across multiple model pairings. Source-disagreement[] surfaced: **77.6% vs 53-72% spread is real** and reflects different model+config combos (CodeAct 2.1+Sonnet 3.5 = 53%; CodeAct v3+Opus 4.6 + Critic = up to 77.6%). NOT silently averaged.
- **CODE READING (≥1 required)**: ✓ DeepWiki cites `frontend/src/types/core/actions.ts` for `CmdRunAction/FileReadAction/FileWriteAction/FileEditAction/IPythonRunCellAction/BrowseURLAction` action space; `openhands/runtime/impl/docker/docker_runtime.py:174` from Issue #7830 stack trace; sandbox lifecycle in `openhands/app_server/sandbox/docker_sandbox_service.py:209` from Issue #12500.
- **PRACTITIONER FIELD REPORT (≥1 required)**: ✓ creator Brennan on HN reports 20% self-commit rate (named practitioner running in production); AgentMarketCap reports adoption across AMD, Apple, Google, Amazon, Netflix, NVIDIA, Mastercard, VMware (multi-org); vibecoding.app review (Apr 2026, named author Zane) reports $0.15-$0.60 per task with Claude 4.5 at 50k-200k tokens/session.

All three typed categories present. Orgs distinct: All Hands AI (vendor), Madrona/Menlo investor-validated, AMD/Apple/Google/Amazon/etc. enterprise adopters, RightAIChoice/AgentMarketCap independent reviewers — ≥3 orgs satisfied many times over.

---

## §3. Score — sca-v3.1 17-dim rubric

Scoring uses v3.1 (W293-ratified) — 14 v3 dims + D16 governance + D17 robustness + D18 safety. Dual composites with v3.1 denominators (16.5 install / 7.1 pattern).

| Dim | Score | Cited evidence anchor |
|---:|---:|---|
| **D1 license_compatibility** | **4** | MIT for core (`openhands/`, `agent-server/`) per `LICENSE` `[EXTERNAL]` https://raw.githubusercontent.com/All-Hands-AI/OpenHands/main/LICENSE — permissive for vendoring; `enterprise/` directory under separate license. GitHub API `NOASSERTION` due to mixed-license — operationally MIT for any vendor-fork action. Caps at 4 (not 5) due to mixed-license requiring per-file vetting. |
| **D2 capability_uniqueness** | **4** | OpenHands provides: autonomous code-agent loop (CodeAct), Docker-isolated sandbox, **ACPAgent backend protocol** (delegates to Claude Code/Gemini-CLI via ACP), GUI+CLI+SDK surfaces, Multi-agent delegation (`DelegateTool`), MCP integration, Claude-Code-compatible plugin format. The **ACPAgent + plugin-format-compatibility** is uniquely orthogonal — OpenHands consumes CC, not the reverse. However, the core CodeAct+sandbox+delegation triple is duplicated by Claude Code's existing primitives (`agent-teams` plugin, sandboxing via `agentSettings`, `Task` tool delegation, `superpowers:dispatching-parallel-agents`). Net D2=4: useful niche capabilities BUT core agent-loop overlaps installed primitives. |
| **D3 harness_fit** | **2** | **Hard-cap-triggering.** OpenHands is a **competing runtime**, not an installable CC primitive. Windows is WSL2-only (Issue #3810 maintainer: "we don't support [native Windows]") — fails Windows-portability check. Requires Docker Desktop + 5+GB images. The reverse-direction reality: OpenHands' `ACPAgent` invokes Claude Code as backend (per https://docs.openhands.dev/sdk/guides/agent-acp). For THIS runtime (CC), adopting OpenHands as subprocess inverts the orchestration tree — CC would no longer be the orchestrator. **D3=2 → INSTALL-only cap fires (D3<2 also a Universal REJECT trigger; D3=2 borderline-survives Universal but blocks INSTALL/VENDOR-FORK whole-runtime adoption)**. T3 PATTERN-STUDY remains open (per v3 §6 hard-cap taxonomy: D3<2 is INSTALL-only cap, NOT Universal REJECT). |
| **D4 claude_code_runtime_pathway_support** | **3** | OpenHands has its **own plugin/skill/agent surfaces** (`openhands.sdk.plugin`, `~/.openhands/mcp.json`, file-based agents in `.agents/agents/*.md`) — and the format is **Claude-Code-compatible** (per https://docs.openhands.dev/sdk/guides/plugins: "The plugin format is compatible with the Claude Code plugin structure"). MCP servers work in both. So a CC user can install OpenHands as an MCP-tool-providing subprocess, but the agent runtime itself runs outside CC — not a native CC pathway. Lift of OpenHands-specific skills into CC plugin shape would require translation. D4=3: bidirectional compatibility designed-in, but not a turnkey CC primitive. |
| **D5 typed_evidence_diversity** | **5** | All 3 typed categories cleared multiple times (per §2 convergence check). Source-disagreement surfaced on SWE-bench (77.6% vs 53-72%) — handled per v3 anti-pattern (NOT silently averaged). |
| **D6 authority_weight** | **4** | Bayesian author-prior: `α_anthropic=0` (not Anthropic), `β_known_partner=0` (no prior ADOPT verdict for All Hands AI), `γ_long_running_repo=+1` (26 months of activity, multiple stable releases), `δ_abandoned_repo_count=0`. Strong external validation: $23.8M Series A (Madrona/Menlo/Fujitsu); CMU faculty co-founder (Graham Neubig); 4M downloads, top-50 Python project all-time. D6=4 (not 5 — not Anthropic-canonical). |
| **D7 maintenance_velocity_balanced** | **5** | Active maintenance: `updated_at` within 24h of audit; **weekly improvements per creator on HN ("agents are improving on a weekly basis")**; ~1/3 of engineering on research; 26-month track record. Not solo bus-factor — 150+ contributors. Not extreme churn either — stable release cadence (CodeAct 2.0 → 2.1 → v3). D7=5. |
| **D8 benchmark_deltas** | **3** | Per v3.1 §4.5: D8 requires **measured signal vs incumbent**, not author claims. OpenHands has measured SWE-bench scores BUT **the incumbent for THIS runtime is Claude Code itself**, which scores ~68-80% on SWE-bench Verified (RightAIChoice, AgentMarketCap). OpenHands' best 77.6% (with Critic Model + Opus 4.6) is **at parity to slight loss** vs CC's native ~80%. Per the v3.1 delta table: parity (−3% to +3%) = 3. **No-benchmarkable-surface override does NOT apply** — there IS a benchmarkable surface (`openhands` CLI, SWE-bench harness). D8=3 (parity). |
| **D9 failure_mode_disclosure** | **4** | Explicit failure docs at https://docs.all-hands.dev/openhands/usage/troubleshooting/troubleshooting — covers Docker connection failures, Windows ports, VS Code tab forbidden, user skills not loading, organization rename issues. Open issue tracker public + transparent. Creator on HN explicitly acknowledges 22.4% failure rate as inherent. NOT a 5 — no formal RUNBOOK.md / GUARDRAILS.md at top of repo. D9=4. |
| **D10 duplication_against_installed** | **3** | (Inverted — higher = LESS duplicated.) Code-agent loop + sandbox + delegation overlaps with: `agent-teams` plugin (✓ installed), `superpowers:dispatching-parallel-agents` (✓ installed), `Task` subagent tool (✓ native), Claude Code's own sandboxing per `https://docs.anthropic.com/en/docs/claude-code/settings` (✓ native). However, OpenHands' **unique-to-it** pieces: ACPAgent backend protocol (no CC analog), Multi-agent file-based agents `.agents/agents/*.md` format, GUI runtime, full Docker-orchestration. D10=3 (substantial overlap but not full duplicate — does NOT trigger D10≤2 Universal REJECT). |
| **D11 context_budget_cost** | **5** | (Inverted — higher = LOWER cost.) **OpenHands has zero context-budget cost for THIS runtime** when not adopted — it runs out-of-process. If patterns are extracted into CC plugin shape (T3), the cost is the marginal plugin/skill size. D11=5. |
| **D12 community_signal_distribution** | **5** | Multi-channel: 73,981★ + 9,383 forks (stars are SUB-signal not gate per v3 mandate); HN front-page launches twice (Show HN, creator AMA); Reddit threads; AgentMarketCap+RightAIChoice+LocalAiMaster+Vibecoding.app independent reviews; Hugging Face co-founder Thom Wolf as angel; PyTorch creator Soumith Chintala as angel; SWE-bench leaderboard sustained presence Nov 2024 → May 2026. D12=5 (5+ channels, not stars-alone-capped). |
| **D13 pattern_extractability** | **5** | Patterns demonstrably liftable: (a) **ACPAgent JSON-RPC subprocess delegation protocol** — extractable as MCP server pattern; (b) **file-based agent registration** `.agents/agents/*.md` with `mcp_servers:` inline-config — directly maps to CC's `.claude/agents/*.md` + `.mcp.json`; (c) **CodeAct action-space taxonomy** (CmdRun/FileEdit/IPythonRun/BrowseURL) — code-readable in `frontend/src/types/core/actions.ts`; (d) **Docker-isolated runtime separation** — architectural pattern, not source-bound; (e) **OpenHands Index 5-category eval** (issue resolution / greenfield / frontend / unit testing / legacy) — eval-harness pattern. D13=5. |
| **D14 reversible_pilotability** | **5** | (For PATTERN-STUDY tier this dim is irrelevant — no install to reverse. Recorded as 5 for completeness since no state mutation occurs.) |
| **D15 supply_chain_safety** | **4** | MIT license-clean for core. `NOASSERTION` SPDX flag is a CR-9-class pinning concern — vendor-fork would need per-file license-vet. Docker images at `ghcr.io/openhands/agent-server` are version-pinned (e.g. `1.19.1-python`) — good. Heavy dependency tree (FastAPI + Jupyter + litellm + Playwright/BrowserGym) — surface area is large. No known CVE in latest. Cardinal-rule-9 (`npx -y <pkg>@<pinned-version>`) not directly applicable since OpenHands runs out-of-CC-process. D15=4. |
| **D16 bus_factor_governance** (W293-new) | **4** | 6-rubric convergence: CNCF-style sponsorship (Madrona-led Series A — venture-backed, not foundation); OpenSSF Scorecard — N/A but multiple maintainers visible (Brennan/Wang/Neubig + 150 contributors); NIST AI RMF — no formal AI Risk Mgmt Framework adherence claimed; ThoughtWorks Radar — not explicitly listed; Wikipedia GNG — qualifies (TechCrunch + multiple independent reviews); Anthropic-multi-agent — N/A. NOT Anthropic-canonical, NOT foundation-governed, but $23.8M-funded with 3-founder + 150-contributor structure. **D16=4 (not solo bus-factor; venture-backed not foundation-neutral)**. Does NOT trigger T1/T2 D16<2 cap. |
| **D17 robustness_under_perturbation** (W293-new) | **3** | 5-rubric convergence: HELM — no public HELM submission; SWE-bench — passes (77.6%); NIST GAI red-team — no public claim; OpenSSF — N/A; Anthropic-multi-agent — N/A. Critical practitioner-evidence of robustness gaps: **"On truly novel issues, both [OpenHands and SWE-Agent] solve ~18-20%"** (LocalAiMaster live-bench Feb 2026 re-run) — meaningful regression on SWE-bench-Live vs SWE-bench-Verified. Windows/Docker failure modes well-documented (Issues #12500, #7830, #3810, #7269). **D17=3** — measurable performance under benchmark perturbation drops sharply; does NOT trigger D17<2 INSTALL-cap but signals deployment-friction concerns. |
| **D18 runtime_safety_and_privacy_risk** (W293-new) | **4** | 3-rubric convergence: NIST GAI — sandbox isolation is a documented control; OpenSSF — N/A; Anthropic — N/A. OpenHands runs every agent in an isolated Docker sandbox by design ("Every action in an isolated Docker sandbox for security, role-based access, audit trails, and quotas" per Series-A announcement). Enterprise: SAML/SSO, RBAC, audit trails. Self-host: no code leaves user's control. **No D18<2 Universal REJECT** trigger. D18=4 — sandbox isolation is the load-bearing safety control + auditability; minor concerns around the `auto-approval` of permission requests on ACPAgent path (per docs: "Permission requests from the server are automatically granted, so ensure you trust the ACP server you're running"). |

### Source-disagreement[] surfaced (v3 anti-pattern guard)

Per v3 anti-pattern "Source-disagreement silently averaged":

- **D8 benchmark_deltas**: SWE-bench Verified scores diverge across sources (77.6% Starlog May 2026 / 72% LocalAiMaster Feb 2026 / 61% RightAIChoice Apr 2026 / 53% CodeAct 2.1 official Nov 2025). Disagreement is **explained by config+model variation** (CodeAct version, model paired, Critic Model on/off). NOT silently averaged. Score 3 reflects best-measured config (77.6%) at parity to slight-loss vs CC's ~68-80%.
- **D3 harness_fit**: official docs say "WSL2 + Docker on Windows" (working config); Issue #3810 maintainer says "we don't support native Windows"; some users report running on native Windows via Docker Desktop. **Disagreement: official docs vs maintainer issue-comments**. Resolved in favor of maintainer's explicit "not supported, not tested" statement — D3=2.

### Dual composites (v3.1 — denom 16.5 install / 7.1 pattern)

**install_score** = Σ(Di × Wi_install) / 16.5 over the 15 install-relevant dims (excludes D12, D13):

```
(D1 × 1.5) + (D2 × 0.9) + (D3 × 1.3) + (D4 × 1.3) + (D5 × 1.0) + (D6 × 0.9) + (D7 × 1.0)
+ (D8 × 1.0) + (D9 × 0.7) + (D10 × 1.1) + (D11 × 0.8) + (D14 × 1.1) + (D15 × 1.0)
+ (D16 × 0.9) + (D17 × 0.8) + (D18 × 0.7)
= (4 × 1.5) + (4 × 0.9) + (2 × 1.3) + (3 × 1.3) + (5 × 1.0) + (4 × 0.9) + (5 × 1.0)
  + (3 × 1.0) + (4 × 0.7) + (3 × 1.1) + (5 × 0.8) + (5 × 1.1) + (4 × 1.0)
  + (4 × 0.9) + (3 × 0.8) + (4 × 0.7)
= 6.0 + 3.6 + 2.6 + 3.9 + 5.0 + 3.6 + 5.0 + 3.0 + 2.8 + 3.3 + 4.0 + 5.5 + 4.0
  + 3.6 + 2.4 + 2.8
= 61.1 / 16.5
= 3.70
```

**pattern_score** = Σ(Di × Wi_pattern) / 7.1 over the 7 pattern-relevant dims (D2, D5, D6, D8, D9, D12, D13):

```
(D2 × 1.4) + (D5 × 1.0) + (D6 × 0.8) + (D8 × 0.9) + (D9 × 0.8) + (D12 × 0.7) + (D13 × 1.5)
= (4 × 1.4) + (5 × 1.0) + (4 × 0.8) + (3 × 0.9) + (4 × 0.8) + (5 × 0.7) + (5 × 1.5)
= 5.6 + 5.0 + 3.2 + 2.7 + 3.2 + 3.5 + 7.5
= 30.7 / 7.1
= 4.32
```

### Hard-cap breach check (per v3 §6 taxonomy)

| Cap | Threshold | Actual | Triggered? |
|---|---|---|---|
| Universal D7 ≤ 1 (abandoned) | ≤1 | 5 | NO |
| Universal D10 ≤ 2 (full duplicate) | ≤2 | 3 | NO |
| Universal D15 ≤ 1 (security blocker) | ≤1 | 4 | NO |
| Universal D17 < 2 (W293-cap, robustness) | <2 | 3 | NO |
| Universal D18 < 2 (W293-cap, safety) | <2 | 4 | NO |
| Adversarial BLOCK | — | pending | NOT YET |
| **INSTALL D1 < 3** | <3 | 4 | NO |
| **INSTALL D3 < 2** | <2 | 2 | **EDGE — D3=2 is borderline-survives D3<2 cap but is the floor; the v3 rubric definition is "harness-misfit" at D3<2. The D3=2 score reflects "fails Windows-native + requires Docker + competing-runtime"; this BLOCKS T1 INSTALL by adversarial-architect-persona judgment regardless.** |
| **INSTALL D5 < 4** | <4 | 5 | NO |
| **INSTALL D14 < 3** | <3 | 5 | NO |
| **INSTALL D16 < 2** (W293-cap, T1+T2) | <2 | 4 | NO |
| VENDOR-FORK license-blocks-fork | — | MIT permits | NO |

**Net effective hard-cap state**: D3=2 — operationally INSTALL-blocking even though strictly above the `D3<2` numeric cap. The **architectural reality** (competing runtime, not installable primitive) is the deciding factor and an architect-persona adversarial-review BLOCK is the structurally correct routing signal. INSTALL is OFF THE TABLE not by numeric cap but by structural argument.

### Routing — soft-gate ladder application (v3.1)

- `install_score = 3.70` → falls in **T2 VENDOR-FORK band [3.0, 3.9]** by numeric threshold.
- `pattern_score = 4.32 ≥ 3.5` + D2=4 ≥ 4 + D13=5 ≥ 3 → **T3 PATTERN-STUDY qualifies**.

**Tier disambiguation**: numeric `install_score=3.70` puts this in T2 band, BUT the D3=2 architectural-fit signal blocks whole-runtime VENDOR-FORK. Per v3 §6 hard-cap taxonomy:

> "VENDOR-FORK additional cap | License does not permit fork (eg fully proprietary) | Blocks T2 VENDOR-FORK only. T3 PATTERN-STUDY / T4 CITE-ONLY still open."

License permits fork, but the operational reality (D3=2 harness-misfit) is structurally analogous to a fork-block: **vendoring an entire competing runtime into CC is architecturally incoherent**. Selective partial vendor-fork remains possible (specific files only — `openhands.sdk.plugin` skill-loader pattern, file-based-agent format, ACPAgent JSON-RPC subprocess pattern). pattern_score=4.32 is the stronger composite and aligns with the structural reality.

**Verdict tier**: **T3 PATTERN-STUDY** (with a partial T2-style sub-route preserved for specific concrete divergence files — see §4 for the divergence plan).

---

## §4. Tier verdict — **T3 PATTERN-STUDY** (with optional partial T2 fork-targets)

### Verdict: **T3 PATTERN-STUDY**

`install_score = 3.70` (T2 band numerically) ⇒ **downgraded to T3** by D3=2 harness-misfit AND the structural reality that OpenHands is a competing runtime, not an installable CC primitive. `pattern_score = 4.32` ≥ 3.5 + D2=4 + D13=5 → T3 ratified.

Per v3 soft-gate semantics: "low absolute scores route a candidate DOWN the ladder (toward PATTERN-STUDY or CITE-ONLY), NEVER auto-REJECT". install_score below T1 floor + structural-fit barrier route DOWN to T3, not REJECT. This is the correct routing.

### Extractable patterns (≥2 required for T3; 5 documented)

1. **`ACPAgent` JSON-RPC subprocess delegation protocol** `[EXTERNAL]` https://docs.openhands.dev/sdk/guides/agent-acp accessed 2026-05-18
   - Pattern: parent runtime spawns a child `claude-agent-acp` subprocess, communicates via stdin/stdout JSON-RPC, child manages its own LLM + tools + permissions independently. Auto-approves permission requests under trust assumption.
   - Extraction path: codify as a pattern doc + optional MCP wrapper in this runtime, NOT install OpenHands. This pattern is roughly **the inverse of the codex Stop-hook adversarial-review gate** (which spawns codex CLI from CC as cross-model gate). It validates the existing W280a codex-gate as an instance of a documented general pattern.
   - **pattern_doc_path artifact**: `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PATTERN-acp-subprocess-delegation.md` (deferred to W296).

2. **File-based agent registration with inline-MCP-config** `[EXTERNAL]` https://docs.openhands.dev/sdk/guides/agent-file-based accessed 2026-05-18
   - Pattern: `.agents/agents/<name>.md` markdown files with frontmatter declaring `mcp_servers:`, `hooks:`, `tools:`, `permission_mode:` inline. Auto-registered via `register_file_agents()`. Maps EXACTLY to CC's `.claude/agents/*.md` + `.mcp.json` split — but OpenHands fuses them per-agent.
   - Extraction path: study as architectural-comparison; consider whether CC's two-file separation is intentional Anthropic design (likely yes — separation of concerns) or borrowable convergence (inline-mcp-per-agent could simplify agent-skill bundling).
   - **Comparison artifact**: deferred to W296 PATTERN-STUDY doc with side-by-side OpenHands vs CC agent-config schemas.

3. **CodeAct action-space taxonomy** — `CmdRunAction` + `FileReadAction` + `FileWriteAction` + `FileEditAction` + `IPythonRunCellAction` + `BrowseURLAction` + `MessageAction` (per DeepWiki cite of `frontend/src/types/core/actions.ts`)
   - Pattern: action-space is finite, typed, executable-in-sandbox. Maps to CC's tool surface (Bash + Read + Write + Edit + ... + WebFetch). The convergence between OpenHands action space and CC tools validates the design space — no extraction needed, this is a **negative pattern study** (no extraction; CC already converged).

4. **OpenHands Index 5-category eval framework** `[EXTERNAL]` referenced in AgentMarketCap and Vibecoding reviews
   - Pattern: replace single-metric SWE-bench with 5 axes — issue resolution / greenfield / frontend / unit testing / legacy code maintenance.
   - Extraction path: input to `sca-v5-Δ7` eval-harness lane multi-metric design. Validates Stream B of this runtime's existing 14-dim rubric (v3) which similarly resists single-metric reduction.

5. **Docker-isolated agent-sandbox separation** (architectural pattern, not source-bound)
   - Pattern: agent code runs in container A, sandbox executes in container B, network bridges A↔B with explicit `host.docker.internal` + port allocation. Reproducibility + isolation guarantees.
   - Extraction path: study contrasts with CC's sandbox model (subprocess + `Bash` tool with permission system). Input to `sca-v5-Δ9` memory-class eval-lane (sandbox model = perturbation-resistance lever). May inform future CC sandboxing-V2 design discussions but no immediate extraction.

### Why NOT T1 INSTALL

Architecturally inapplicable. This runtime IS a Claude Code runtime; OpenHands is its peer/competitor, not a plugin. The "install" question is malformed.

### Why NOT T2 VENDOR-FORK whole-runtime

D3=2 harness-misfit. Vendoring an entire competing runtime into CC is structurally incoherent. Per v3 §6 the analog of "license-blocks-fork" applies architecturally.

### Why NOT T4 CITE-ONLY

pattern_score = 4.32 ≥ 3.5 + D2=4 + D13=5 — patterns ARE liftable with ≥2 concrete extraction paths. T4 reserved for "useful reference, fails higher tiers" — this candidate **passes** the T3 floor.

### Why NOT T5 REJECT

No Universal REJECT trigger fires (D7=5, D10=3, D15=4, D17=3, D18=4, no adversarial-BLOCK yet). Per v3 §6 mandate: REJECT requires AFFIRMATIVE evidence of unfitness — not present here. OpenHands is a high-quality independent runtime; CC just isn't its delivery vehicle.

### Partial T2-style divergence-file targets (if operator opts in to a narrow vendor-fork sub-action)

If the operator separately decides to lift SPECIFIC files (NOT whole-runtime), the following are MIT-licensed + harness-fit-friendly:

| Source file (upstream) | Target location (this runtime) | Rationale |
|---|---|---|
| `openhands/sdk/subagent/register_file_agents.py` | `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PATTERN-file-based-agent-loader.md` (study) | Compare CC's `.claude/agents/*.md` loader vs OpenHands' inline-mcp-config format |
| OpenHands' `.agents/agents/<name>.md` example | `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PATTERN-agent-frontmatter-spec.md` (study) | Validate this runtime's agent-frontmatter discipline against OpenHands' canonical form |
| `openhands/agent/acp/agent.py` (ACPAgent client) | `docs/architecture/W295-CANDIDATE-AUDITS/patterns/PATTERN-acp-subprocess-delegation.md` (study) | Document ACP pattern; compare to codex Stop-hook subprocess gate (W280a) |

These are STUDY targets, not vendor-installs. Drift-tracking via the upstream commits page; no live merge.

### Mandatory rollback plan (T3 does NOT require T1's strict rollback)

T3 PATTERN-STUDY rollback: simply `git rm -r docs/architecture/W295-CANDIDATE-AUDITS/All-Hands-AI-OpenHands.md` (this audit file). No state-mutation. No installed primitives. Recovery time: <1 minute. Smoke test: `Test-Path "Z:/claude-sota-installed-W290/docs/architecture/W295-CANDIDATE-AUDITS/All-Hands-AI-OpenHands.md"` returns `False`.

### Pattern doc path artifact (T3 hard-required)

**Status**: pattern docs deferred to W296 (cap-respecting — this audit is the discovery doc; pattern-doc-extraction is a follow-on wave action). Three pattern-doc stubs documented in §4 above; full extractions scheduled for W296.

`pattern_doc_path` (planned): `Z:/claude-sota-installed-W290/docs/architecture/W295-CANDIDATE-AUDITS/patterns/` (directory to be created in W296 if operator approves T3 verdict).

---

## §5. Sister-stream coordination (sca-v5 future-wave inputs)

OpenHands' patterns inform multiple future sca-v5-Δ streams per W295-RESEARCH-ARCH-V5 stream design:

- **sca-v5-Δ9 (memory-class eval lane)**: OpenHands' **sandbox model** (Docker-isolated agent + Docker-isolated sandbox with network bridge) is a **perturbation-resistance benchmark candidate** — does the agent's behavior change when sandbox network topology changes? OpenHands' Issue #12500 (`host.docker.internal` failure) is a real-world example of memory-class-failure under network perturbation. This runtime's sca-v5-Δ9 eval lane can use OpenHands as a CONTRAST runtime — measure how CC's sandbox model differs in failure modes. Input: 1 contrast-runtime ID; 1 known failure mode (`host.docker.internal` race-condition on Windows+Docker+WSL2).

- **sca-v5-Δ11 (cross-model voting / adversarial-review evolution)**: OpenHands' **ACPAgent protocol** is an instance of a cross-model voting primitive — delegate to Claude Code via ACP, get its result, compare to a Gemini-CLI delegation via the same ACP protocol, vote. Direct relevance to this runtime's codex Stop-hook gate evolution: the codex gate is a 2-model vote (CC + GPT-5.x); ACPAgent suggests an n-model generalization. Input: 1 cross-model-vote-pattern URL; 1 codex-gate-evolution candidate (`codex_stop_hook → multi_model_stop_hook`).

- **sca-v5-Δ7 (multi-metric eval lane vs single SWE-bench)**: OpenHands Index (5-category eval) directly validates this runtime's resistance to single-metric SWE-bench-only ranking. Input: 5 eval-axis names (`issue_resolution / greenfield / frontend / unit_testing / legacy`); reference link to OpenHands Index methodology.

- **sca-v5-Δ4 (Anti-bias D2/D10 sharpening)**: this audit's D2=4 ("uniqueness vs installed primitives") and D10=3 ("substantial overlap") demonstrates the v3 rubric correctly avoids star-only bias — a 73,981★ candidate was correctly routed to T3 (not T1) on the basis of architectural-fit + duplication signals. Input: 1 high-star-T3 verdict-row (this one) as anti-bias proof-point for the W293-D16/D17/D18 + W289-stars-not-hardgate mandates.

---

## §6. Anti-bias structural proof

Operator mandate: "stars are NOT a hardgate; low-star ≠ auto-reject; high-star candidates can land at any tier".

OpenHands at 73,981★ landed at **T3 PATTERN-STUDY** (not T1 INSTALL). The routing was determined by:

1. **D3=2 harness-misfit** (Windows WSL2-only, competing runtime not plugin) — structural, NOT popularity.
2. **D8=3 benchmark-parity** vs Claude Code's native SWE-bench (~68-80%) — measured, NOT vibes.
3. **D10=3 substantial duplication** against installed agent-teams + superpowers primitives — installed-state-aware, NOT FOMO-driven.

The 73,981★ figure was used only as a **D12 sub-signal** (one channel among 5+) and as a **D6 Bayesian-prior tie-breaker** input (γ_long_running_repo=+1 because 26-month active repo).

**Anti-bias validation**: had stars been a hard gate, this candidate would have auto-routed to T1 INSTALL. The v3 rubric's structural dimensions (D3, D10, D16) + the v3.1 D17 robustness-under-perturbation correctly downgraded to T3. This is the rubric working as designed.

**Counter-example precedent**: W291.Stage2 routed `bytedance/deer-flow@68,256★` to T2 VENDOR-FORK (also below T1 despite high stars) on D5<4 grounds. OpenHands at 73,981★ routing to T3 is structurally consistent with that prior verdict — both high-star candidates correctly downgraded on dim-specific signals.

**Disagreement[] mechanism validation**: SWE-bench source-disagreement (77.6% vs 53-72%) was NOT silently averaged — surfaced in §3 with config-explanation. Aligns with W288 Stream B mis-attribution catch (sources_typed_disagreement[] mechanism).

---

## §7. Adversarial review status

**Pending dispatch** (Step 5 of v3 process):

- security persona: TBD — preliminary view = APPROVE (no install, sandbox is upstream's concern, MIT license)
- architect persona: TBD — preliminary view = REVISE-OR-BLOCK on whole-runtime fork (matches §4 D3=2 reasoning); APPROVE for pattern-study T3 verdict
- code-reviewer persona: TBD — preliminary view = APPROVE (high-quality codebase, active maintenance, transparent failure docs)
- codex Stop-hook GPT-5.5: pending on this commit

If codex BLOCKS → re-route to T4 CITE-ONLY (next-down). If codex APPROVES → ratify T3 PATTERN-STUDY.

---

## §8. Ledger episode (per v3.1 schema, ready for basic-memory T6 write)

```json
{
  "name": "adoption-verdict-W295-All-Hands-AI-OpenHands",
  "episode_body": {
    "candidate": "All-Hands-AI/OpenHands",
    "verdict": "PATTERN-STUDY",
    "tier": "T3",
    "wave": "W295",
    "decided_at": "2026-05-18",
    "decided_by": "sota-convergence-audit (W295) + pending codex Stop-hook",
    "rule_version": "sca-v3.1",
    "sources_typed": {
      "benchmark": [
        {"src": "Starlog 2026-05-09", "metric": "SWE-bench Verified", "value": "77.6%", "url": "https://starlog.is/articles/developer-tools/openhands-openhands"},
        {"src": "RightAIChoice 2026-04-22", "metric": "SWE-bench Verified (Sonnet 4.6)", "value": "~61%", "url": "https://rightaichoice.com/blog/ai-coding-assistant-leaderboard-swe-bench-humaneval-2026"},
        {"src": "LocalAiMaster 2026-02-06", "metric": "SWE-bench Verified (Claude 4.5 + Extended Thinking)", "value": "72%", "url": "https://localaimaster.com/blog/openhands-vs-swe-agent"}
      ],
      "code_reading": [
        {"src": "DeepWiki", "file": "frontend/src/types/core/actions.ts", "evidence": "CodeAct action-space taxonomy"},
        {"src": "Issue #7830", "file": "openhands/runtime/impl/docker/docker_runtime.py:174", "evidence": "docker_runtime Connect failure stack"},
        {"src": "Issue #12500", "file": "openhands/app_server/sandbox/docker_sandbox_service.py:209", "evidence": "sandbox connection lifecycle"}
      ],
      "practitioner_report": [
        {"src": "Brennan on HN 42736810", "outcome": "20% of OpenHands codebase commits authored/co-authored by OpenHands itself"},
        {"src": "AgentMarketCap 2026-04-10", "outcome": "60k+ stars, 4M downloads, enterprise adoption at AMD/Apple/Google/Amazon/Netflix/NVIDIA/Mastercard/VMware"},
        {"src": "Vibecoding 2026-04-01 Zane", "outcome": "$0.15-$0.60 per task at 50k-200k tokens with Claude 4.5"}
      ],
      "D8_benchmark_deltas.disagreement": [
        {"sources": ["Starlog 77.6%", "LocalAiMaster 72%", "RightAIChoice 61%", "official CodeAct 2.1 53%"], "explanation": "config + model + Critic-on/off variation; NOT silently averaged; best-config 77.6% used"}
      ],
      "D3_harness_fit.disagreement": [
        {"sources": ["official docs 'WSL2+Docker'", "Issue #3810 maintainer 'not supported native Windows'"], "explanation": "resolved in favor of maintainer's explicit unsupported-stance; D3=2"}
      ]
    },
    "rubric_scores": {
      "D1_license": 4, "D2_uniqueness": 4, "D3_harness_fit": 2, "D4_cc_pathway": 3,
      "D5_typed_evidence": 5, "D6_authority": 4, "D7_velocity_balanced": 5,
      "D8_benchmark_deltas": 3, "D9_failure_modes": 4, "D10_duplication": 3,
      "D11_context_cost": 5, "D12_community_distribution": 5,
      "D13_pattern_extractability": 5, "D14_reversibility": 5, "D15_supply_chain": 4,
      "D16_bus_factor_governance": 4, "D17_robustness_under_perturbation": 3, "D18_runtime_safety_and_privacy_risk": 4,
      "install_score": 3.70, "pattern_score": 4.32,
      "hard_cap_breaches": [],
      "hard_cap_borderline": ["D3=2 architectural-fit-block via architect-persona reasoning, not numeric cap"]
    },
    "adversarial_review": {
      "security": "PENDING (preliminary APPROVE)",
      "architect": "PENDING (preliminary REVISE-or-BLOCK-on-fork-APPROVE-on-pattern-study)",
      "code_reviewer": "PENDING (preliminary APPROVE)",
      "codex_gate": "PENDING (W295 Stop-hook dispatch)"
    },
    "rollback_plan": "T3 PATTERN-STUDY — git rm -r docs/architecture/W295-CANDIDATE-AUDITS/All-Hands-AI-OpenHands.md ; <1min recovery ; smoke test: Test-Path returns False",
    "divergence_files": null,
    "partial_vendor_fork_targets_if_operator_opts_in": [
      "PATTERN-acp-subprocess-delegation.md",
      "PATTERN-file-based-agent-loader.md",
      "PATTERN-agent-frontmatter-spec.md"
    ],
    "pattern_doc_path": "docs/architecture/W295-CANDIDATE-AUDITS/patterns/ (deferred to W296)",
    "reverification_due": "W301",
    "status": "ACTIVE",
    "supersedes": null,
    "anti_bias_proof": "73,981 stars routed to T3 (not T1) on D3=2 + D10=3 + D8=3 structural signals — stars correctly demoted to D12 sub-signal + D6 tie-breaker only"
  },
  "source": "json",
  "group_id": "adoption-decisions"
}
```

---

## §9. Cite-anchor index

All external citations marked `[EXTERNAL]` with URL + access date:

- `[EXTERNAL]` https://docs.all-hands.dev/openhands/usage/troubleshooting/troubleshooting (accessed 2026-05-18) — Windows WSL2 requirement
- `[EXTERNAL]` https://docs.openhands.dev/sdk/guides/agent-acp (accessed 2026-05-18) — ACPAgent protocol
- `[EXTERNAL]` https://docs.openhands.dev/sdk/guides/agent-file-based (accessed 2026-05-18) — file-based agents
- `[EXTERNAL]` https://docs.openhands.dev/sdk/guides/plugins (accessed 2026-05-18) — Claude-Code-compatible plugin format
- `[EXTERNAL]` https://docs.openhands.dev/openhands/usage/cli/mcp-servers (accessed 2026-05-18) — MCP integration
- `[EXTERNAL]` https://api.github.com/repos/All-Hands-AI/OpenHands (accessed 2026-05-18) — 73,981★, 9,383 forks
- `[EXTERNAL]` https://raw.githubusercontent.com/All-Hands-AI/OpenHands/main/LICENSE (accessed 2026-05-18) — MIT-core, mixed-license
- `[EXTERNAL]` https://openhands.dev/blog/weve-just-raised-18-8m-to-build-the-open-standard-for-autonomous-software-development (accessed 2026-05-18) — $18.8M Series A
- `[EXTERNAL]` https://www.techcrunch.com/2024/09/05/all-hands-ai-raises-5m-to-build-open-source-agents-for-developers (accessed 2026-05-18) — founder details
- `[EXTERNAL]` https://www.cbinsights.com/company/all-hands (accessed 2026-05-18) — $23.8M total funding
- `[EXTERNAL]` https://agentmarketcap.ai/blog/2026/04/10/open-source-coding-agents-2026... (accessed 2026-05-18) — practitioner adoption
- `[EXTERNAL]` https://rightaichoice.com/blog/ai-coding-assistant-leaderboard-swe-bench-humaneval-2026 (accessed 2026-05-18) — leaderboard
- `[EXTERNAL]` https://starlog.is/articles/developer-tools/openhands-openhands (2026-05-09) — 77.6% SWE-bench
- `[EXTERNAL]` https://localaimaster.com/blog/openhands-vs-swe-agent (2026-02-06) — 72% Extended Thinking
- `[EXTERNAL]` https://vibecoding.app/blog/openhands-review (2026-04-01) — cost/token analysis
- `[EXTERNAL]` https://www.all-hands.dev/blog/openhands-codeact-21-an-open-state-of-the-art-software-development-agent (2025-11-12) — CodeAct 2.1 announcement
- `[EXTERNAL]` https://news.ycombinator.com/item?id=42736810 (Brennan AMA) — 20% self-commit rate
- `[EXTERNAL]` https://news.ycombinator.com/item?id=44051241 (Show HN) — top-50 Python project
- `[EXTERNAL]` https://github.com/OpenHands/OpenHands/issues/12500 (Jan 2026) — Docker network failure
- `[EXTERNAL]` https://github.com/All-Hands-AI/OpenHands/issues/7830 (Apr 2025) — WSL runtime init failure
- `[EXTERNAL]` https://github.com/All-Hands-AI/OpenHands/issues/3810 (Sep 2024) — WSL requirement explained
- `[EXTERNAL]` DeepWiki query `All-Hands-AI/OpenHands` 2026-05-18 — agent architecture summary

---

## §10. Final verdict line

**T3 PATTERN-STUDY** (with optional partial-T2-style narrow vendor-study targets if operator opts in).

`install_score = 3.70` (T2 band numerically; downgraded by structural D3=2 architectural-fit-block).
`pattern_score = 4.32` (T3 floor 3.5 cleared; D2=4 ≥4, D13=5 ≥3).
No hard-cap-numeric breach.
W293 v3.1 D16=4 / D17=3 / D18=4 all cleared.
Anti-bias proof: 73,981★ correctly routed to T3 by structural dims, not popularity.
Pending: codex Stop-hook GPT-5.5 ratification.
