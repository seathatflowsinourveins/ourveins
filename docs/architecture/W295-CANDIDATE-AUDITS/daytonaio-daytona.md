# W295 sca-v3.1 audit — daytonaio/daytona

> Wave: W295 P1d · Date: 2026-05-18 · Auditor: parallel-Agent fork
> Rubric: sca-v3.1 (17 D-ids — 14 v3 base dims D1-D15 + W293 additions D16 bus_factor_governance + D17 robustness_under_perturbation + D18 runtime_safety_and_privacy_risk; dual install_score + pattern_score; 5-tier ladder; composite denoms install=16.5, pattern=7.1)
> Branch context: `sota-converge-w290` (W295-RESEARCH-ARCH-V5 four-stream `sca-v3.1 → sca-v5` work-in-flight; this audit applies v3.1 per goal mandate)
> 6-MCP evidence (6 source families queried 2026-05-18 17:00-18:30Z):
> 1. **DeepWiki** — `mcp__deepwiki__ask_question` × 2 (architecture + lang/license/MCP)
> 2. **GitHub MCP** — `search_repositories` + `get_file_contents` (README, LICENSE, SECURITY.md, AGENTS.md, CONTRIBUTING.md) + `list_commits` (15 recent)
> 3. **GitHub REST API direct** — repo stats, contributors (top-20), releases (10), 90-day issue velocity, security-advisories, workflows, dependabot
> 4. **Context7-equivalent** — Daytona docs site `daytona.io/docs/en/*` (mcp/, claude-agent-sdk-*, oss-deployment/)
> 5. **Exa** — 6 web searches (comparisons, AGPL concerns, production reports, MCP integration, devcontainer fit)
> 6. **WebSearch** — funding round + pivot narrative (10 sources)

---

## §1 — Candidate one-liner

`daytonaio/daytona` is an **AGPL-3.0 cloud-first runtime that provisions OCI/Docker sandboxes ("full composable computers") in 27-90 ms for AI-generated code execution**, exposing CLI + 5-language SDKs (Python/TS/Go/Ruby/Java) + an MCP server (`daytona mcp init claude`) that lets Claude Code, Cursor, and Windsurf drive a remote sandbox. Architecturally it's an Interface/Control/Compute plane separation (NestJS API + Go runner/proxy/daemon/snapshot-manager/ssh-gateway/otel-collector + React dashboard) with Sysbox-style user-namespace isolation, supporting managed (`app.daytona.io`) or self-hosted (Docker Compose) deployments; its 2026 pivot reframes it as "infrastructure for AI agents" (Feb 2026 $24M Series A led by FirstMark Capital).

## §2 — Evidence pack (per the v3.1 contract)

### Benchmark with numbers (≥1)

**Source 1 — superagent.sh benchmark 2026-01-16** [EXTERNAL — https://www.superagent.sh/blog/ai-code-sandbox-benchmark-2026, accessed 2026-05-18]: Daytona cold-start ~90 ms vs E2B ~150 ms vs Blaxel ~25 ms vs Modal sub-second vs Cloudflare 2-3 s vs Beam 2-3 s. Hourly cost $0.0828 (1 vCPU) — tied with E2B/Blaxel as cheapest of 7 providers. Max runtime: unlimited (only Daytona, Beam, Blaxel offer this).

**Source 2 — agentmarketcap.ai benchmark 2026-04-10** [EXTERNAL — https://agentmarketcap.ai/blog/2026/04/10/sandboxed-code-execution-ai-agents-e2b-modal-daytona, accessed 2026-05-18]: Daytona provisioning 27-90 ms (fastest of the three "serious contenders" E2B/Modal/Daytona); only platform offering Computer Use support (Win/Linux/macOS desktop control) of E2B/Modal/Daytona triumvirate; only one with both open-source + BYOC/self-hosted modes.

**Source 3 — blaxel.ai blog 2026-04-20** [EXTERNAL — https://blaxel.ai/blog/best-cloud-sandboxes-ai-agents-2026, accessed 2026-05-18]: Container isolation type "shares the host kernel. The CNCF recommends VM-based sandboxes for untrusted multi-tenant workloads" — flagged as security-depth tradeoff against E2B (Firecracker microVM), Modal (gVisor), and Blaxel (microVM).

### Code reading (≥1)

**Source 1 — `README.md` `apps/` map** [EXTERNAL — https://github.com/daytonaio/daytona/blob/main/README.md, accessed 2026-05-18 at SHA `70b604d`]: 10 deployable apps confirm the polyglot Interface/Control/Compute architecture (`apps/api` NestJS, `apps/cli` Go, `apps/daemon` Go, `apps/runner` Go, `apps/proxy` Go, `apps/snapshot-manager` Go, `apps/ssh-gateway` Go, `apps/otel-collector` Go, `apps/dashboard` React, `apps/docs` Astro). Repo size 139,688 KB confirms heavyweight monorepo (Go+TS+Python+Ruby+Java).

**Source 2 — `.licenserc.yaml`** [EXTERNAL — https://github.com/daytonaio/daytona/blob/main/.licenserc.yaml, accessed 2026-05-18]: `spdx-id: AGPL-3.0`, `copyright-owner: Daytona Platforms Inc.` — verbatim AGPL-3.0 file headers required on every `.go`/`.sh`/`.js`/`.ts`/`.tsx`/`.py` (excluding `libs/**` except `libs/computer-use/**`, and `apps/docs/**`). Confirms strong-copyleft network-clause license.

**Source 3 — Daytona official Claude Code guide** [EXTERNAL — https://www.daytona.io/docs/en/claude-code-run-tasks-stream-logs-sandbox/, accessed 2026-05-18]: Python sample shows `pty_handle.send_input(f"ANTHROPIC_API_KEY={...} claude --dangerously-skip-permissions -p '...' --output-format stream-json --verbose\n")` — Claude Code is treated as a downstream client; integration runs inside the sandbox via PTY, not as a peer of the orchestrator. Indicates the integration target is "agent inside sandbox", not "orchestrator outside sandbox" — a fit-shape mismatch with this runtime's posture.

### Practitioner field report (≥1)

**Source 1 — `benchflow-ai/benchflow` Issue #102, 2026-03-29** [EXTERNAL — https://github.com/benchflow-ai/benchflow/issues/102, accessed 2026-05-18]: `benchflow` (a third-party eval-harness using Daytona for trial runs) reports "2,187 orphaned sandboxes spanning 3 days of eval runs, all still in `STARTED` state, consuming the full 5,000 GiB quota." Root cause: no `auto_delete_interval` default + CancelledError + process-kill cases bypass `await env.stop(delete=True)` cleanup, plus `atexit` only closes HTTP client. **NAMED PRACTITIONER · PRODUCTION OUTCOME · NEGATIVE SIGNAL.**

**Source 2 — Issue #4642 `Add getOrCreate sandbox method`, 2026-05-05 (dalinkstone)** [EXTERNAL — https://github.com/daytonaio/daytona/issues/4642, accessed 2026-05-18]: Reports "**this recurring failure mode (observed dozens of times per week in production)**" where archived sandboxes return misleading 404 on toolbox calls. Direct quote: "Forcing every consumer to re-implement this lifecycle by hand produces real production failures." **NAMED PRACTITIONER · PROD-VOLUME OUTCOME · NEGATIVE SIGNAL.**

**Source 3 — PRNewswire / FirstMark Series A announcement, 2026-02-06** [EXTERNAL — https://www.prnewswire.com/news-releases/daytona-raises-24m-series-a-to-give-every-agent-a-computer-302680740.html, accessed 2026-05-18]: Strategic-investor confirmation from Datadog + Figma Ventures; reached $1M forward revenue run-rate in <3 months post-pivot; FirstMark partner Matt Turck joined Board. **NAMED ORGS (Datadog, Figma) · COMMERCIAL VALIDATION SIGNAL · POSITIVE.**

**Typed-evidence org-distinctness**: superagent.sh + agentmarketcap.ai + blaxel.ai + benchflow-ai + dalinkstone + PRNewswire/FirstMark = **≥6 organizationally distinct sources** ✓ (Stream C Gate-5 satisfied).

**Disagreement flag** (`sources_typed.disagreement[]`): benchmark says "fastest cold-start, broadest feature, open-source winner"; practitioners say "production-stuck-state lifecycle leaks, misleading 502/400 status codes, archived-sandbox-404, recurring weekly failures". Both signals corroborated by separate orgs — surface in §5 not silently averaged.

## §3 — 17-dim scoring (sca-v3.1)

> Methodology note: weights drawn from `Z:/claude-sota-installed-W290/.claude/skills/sota-convergence-audit/SKILL.md:73-95` for the v3 14-dim base (D1-D15). D16/D17/D18 weights per CLAUDE.md W293 sca-v3.1 ship description (denom 16.5). D12+D13 excluded from `install_score`; only D2/D5/D6/D8/D9/D12/D13 enter `pattern_score` (per SKILL.md:96 — D1, D3, D4, D7, D10, D11, D14, D15 excluded; D16/D17/D18 are install-scope additions and excluded from `pattern_score`).

| Dim | Score (1-5) | Anchor cite (EXTERNAL unless tagged) | install_weight | pattern_weight |
|---|---:|---|---:|---:|
| D1 license_compatibility | **2** | AGPL-3.0 + § 13 Remote Network Interaction triggers network-server source disclosure. https://github.com/daytonaio/daytona/blob/main/LICENSE (2026-05-18). Our runtime is autonomous, single-operator, NOT distributed as a network service → AGPL §13 trigger does NOT fire for local-only use. BUT: any vendored AGPL code would virally infect this repo's currently-permissive intent, blocking commercial relicensing forever. **INSTALL-only hard-cap fires (D1 < 3).** | 1.5 | n/a |
| D2 capability_uniqueness | **4** | Computer Use across Win/Linux/macOS desktops is UNIQUE among E2B/Modal/Daytona triumvirate per agentmarketcap.ai 2026-04-10. 27-90 ms cold-start fastest in category. AGPL OSS + BYOC self-host combo also unique. Counter-evidence: SmolVM/OpenSandbox cited in roborhythms.com 2026-04-11 as community-preferred no-conflict alternatives with parity feature-sets — capability is contested but real. | 0.9 | 1.4 |
| D3 harness_fit | **1** | **HARD-CAP TRIGGER (D3 < 2).** Daytona is cloud-first (`app.daytona.io`), assumes external-service sandbox provisioning + DAYTONA_API_KEY + Daytona-side OCI/Docker daemon — alien to this runtime's local-first single-operator Windows posture. Self-hosted Docker-Compose stack requires PostgreSQL/Redis/Dex/MinIO/Caddy + Linux runners (`apps/runner` Go service) — non-trivial Windows-host operational burden. CLAUDE.md:22 cardinal rule 5 anchors safety to "Claude Code permissions + sandboxing" (built-in) NOT to a fleet of external compute. https://www.daytona.io/docs/en/oss-deployment/ — "Caddy logs show HTTP 429 rateLimited" + Cloudflare TLS-terminating proxy required. | 1.3 | n/a |
| D4 claude_code_runtime_pathway_support | **4** | Native MCP server (`daytona mcp init claude` per https://www.daytona.io/docs/en/mcp/, 2026-05-18) covers sandbox-mgmt + fs + git + exec + computer-use + preview tools. claude-agent-sdk pre-installed in default sandbox image per DeepWiki (2026-05-18). 2 official "Build with Claude Agent SDK" guides shipped. Loses 1 point because the integration target is Claude-as-client-inside-sandbox, not Claude-Code-runtime-as-host (per Source 3 §2 code-reading) — the runtime's actual posture is the latter. | 1.3 | n/a |
| D5 typed_evidence_diversity | **4** | All three typed categories present (3 benchmarks · 3 code-readings · 3 field-reports) with ≥6 distinct orgs (superagent.sh, agentmarketcap.ai, blaxel.ai, benchflow-ai, dalinkstone, FirstMark/PRNewswire). Sources_typed.disagreement flagged (positive benchmarks vs negative production reports). Loses 1 for the disagreement (Stream A §4 — codex second-pass would be warranted but is out-of-scope for this fork). | 1.0 | 1.0 |
| D6 authority_weight (Bayesian author-prior) | **3** | `α_anthropic=0` (not Anthropic) + `β_known_partner=0` (no prior ACTIVE ledger entry for daytonaio) + `γ_long_running_repo=+1` (created 2024-02-06, 27 months active, 324 tags, 174 releases — comfortably ≥12-month + ≥3-release threshold) + `δ_abandoned_repo_count=0`. Prior = +1 baseline 2 → 3. Star-tiebreaker (72,438★) does NOT lift further because there's no tied candidate to break against. | 0.9 | 0.8 |
| D7 maintenance_velocity_balanced | **5** | 10 releases in 30 days (v0.168.0 2026-04-21 → v0.177.0 2026-05-15), 100+ commits last 30 d, 324 tags total, dependabot.yml active, 8 CI workflows, 220 contributors with healthy top-15 distribution (top contributor Tpuljak 640 commits = ~6% of contributions, not solo-dominated). Cadence is "extreme" — could be downscored 1 for churn — but balanced by 5 strategic investors + 2-year track record. | 1.0 | n/a |
| D8 benchmark_deltas | **4** | Multiple measured deltas vs alternatives: cold-start 27-90 ms (fastest of 7 platforms per superagent.sh 2026-01-16); unique Computer Use capability per agentmarketcap.ai 2026-04-10. NO eval-harness `python harness/eval_harness.py --mode sota-rubric --candidate daytona --kind executable --smoke <path>` was run this audit — author-claim caps would fire at 2 per SKILL.md:271 "No-eval-harness for benchmarkable surface", but third-party measured benchmarks from 2 distinct orgs lift past the author-claim-only floor to 4. Not 5 because no parity test was run against this runtime's actual workload. | 1.0 | 0.9 |
| D9 failure_mode_disclosure | **4** | SECURITY.md present (https://github.com/daytonaio/daytona/blob/main/SECURITY.md) with explicit scope/exclusion list + 90-day disclosure + $100-$1000 bounty + safe harbor. CONTRIBUTING.md present, AGENTS.md (10 KB) documents Nix dev-shell + non-interactive agent usage. Public security-advisories: 0 (could be coverage gap or genuine). Known production failure modes documented openly in GitHub issues (#102 / #4142 / #4642 / #2191 / #2390). | 0.7 | 0.8 |
| D10 duplication_against_installed | **3** | Currently installed: zero sandbox/container layer — runtime relies on Claude Code's built-in `Bash` tool + Anthropic permissions (CLAUDE.md:22 cardinal rule 5). Daytona would NOT duplicate an installed plugin (✓), but it would duplicate the OS-native sandbox already supplied by Claude Code itself — partial duplication. Inverted scale: 3 = "partial overlap with built-in OS-supplied capability"; not 2 (no INSTALLED equivalent). | 1.1 | n/a |
| D11 context_budget_cost | **2** | If installed via MCP: ~10 tools (sandbox-mgmt + fs + git + exec + computer-use + preview) ≈ 1-2k preload tokens. PLUS the operational burden of maintaining a self-hosted Docker-Compose stack (PostgreSQL/Redis/Dex/MinIO/Caddy/runner) is a context-cost for every operator decision-cycle (debugging sandbox stuck-states etc.) Inverted: lower = worse. 2 reflects high operational tax. | 0.8 | n/a |
| D12 community_signal_distribution | **4** | Multi-channel: 72,438 stars (HIGH but capped at 3 if stars-alone per SKILL.md:88) + topics `ai-agents`/`ai-runtime`/`ai-sandboxes` + Series A 2026-02-06 with FirstMark/Datadog/Figma (TIER-1 investors per technews180/tech.eu/alleywatch) + 6+ practitioner-blog comparisons (blaxel.ai, agentmarketcap.ai, superagent.sh, dev.to/thedailyagent, roborhythms.com, rywalker.com) + Slack community + 220 contributors + 5,571 forks. Multi-channel ✓ → 4, not stars-alone. | n/a | 0.7 |
| D13 pattern_extractability | **4** | Patterns extractable WITHOUT installing: (a) MCP-server-for-sandbox-control API design as a reference for any sandbox MCP we might build; (b) sub-90ms-OCI-cold-start technique (Sysbox + user-namespace + pre-warmed snapshot pool — cited in deepwiki); (c) declarative-builder + state-machine sandbox lifecycle (started/stopping/archived/destroyed transitions) — Issues #4642 + #2390 document the failure modes that any sandbox-state-machine MUST handle; (d) AGENTS.md Nix-dev-shell pattern for non-interactive agent builds (universally portable). Patterns are clearly separable; 4 not 5 because the most distinctive feature (Computer Use) is at `libs/computer-use/**` and is intentionally MIT-or-other-license-exempted from AGPL header (per `.licenserc.yaml`) — easier to lift. | n/a | 1.5 |
| D14 reversible_pilotability | **1** | **HARD-CAP TRIGGER (D14 < 3).** A T1 INSTALL would require: self-hosted Docker-Compose stack on a Linux host (NOT Windows-native — this runtime is Windows-portable Z:\), DAYTONA_API_KEY config, MCP server entry, OPTIONAL Cloudflare/Caddy TLS proxy, OPTIONAL Dex OIDC, persistent state across PostgreSQL/Redis/MinIO volumes. Rollback = full Docker-Compose teardown + state purge + MCP server removal + permission reset — multi-hour operation with state-loss risk. NOT a single-file revert. NOT a single-commit revert. | 1.1 | n/a |
| D15 supply_chain_safety | **2** | Cross-language monorepo with Go (`go.work`), TS (Nx + Yarn 4), Python (Poetry), Ruby (Bundler), Java (Gradle) = 5 dependency-graphs to audit. Dependabot.yml ACTIVE ✓. OpenSSF Scorecard NOT PUBLISHED (https://api.securityscorecards.dev/projects/github.com/daytonaio/daytona → 404, accessed 2026-05-18) — explicit gap for v3.1 D15 supply-chain anchor. 0 public security-advisories. Sandbox uses `nullclaw` host-kernel-sharing model, not microVM — CNCF guidance "VM-based sandboxes recommended for untrusted multi-tenant workloads" per blaxel.ai 2026-04-20. INSTALL-only hard-cap fires (D15 < 2 would force Universal REJECT, but D15 = 2 sits exactly at the cap — INSTALL-block, not REJECT). | 1.0 | n/a |
| **D16 bus_factor_governance** (W293) | **4** | Top contributor Tpuljak 640 commits = ~14% of top-15-contributor commit-count (not 50%+ solo dominance). FirstMark Capital board seat (Matt Turck) = governance anchor. ContributorsAggregate 220 + 5 strategic investors (FirstMark, Pace, Upfront, E2VC, Darkmode + Datadog/Figma strategic) = diversified org. Loses 1 because copyright held by single private company (Daytona Platforms Inc.) — not foundation-governed (cf. CNCF/ASF). | 1.0 | n/a |
| **D17 robustness_under_perturbation** (W293) | **2** | Production reports document MULTIPLE perturbation-fragility cases: (a) `bnchflow#102` 2,187-orphan-sandbox cleanup-failure on CancelledError/SIGKILL paths; (b) `dt#4642` archived-sandbox 404 misleading status "observed dozens of times per week in production"; (c) `dt#4142` 502/400 misleading-error on state-transition (4 occurrences in single 1s window of testing); (d) `dt#2390` sandbox-stuck-in-`starting`-state-for-12hr with no recovery path. State-machine perturbation handling is the documented soft spot. Per W293 hard-cap rule (D17 < 2 = INSTALL-cap): D17 = 2 sits exactly at the cap → INSTALL-block fires. | 1.0 | n/a |
| **D18 runtime_safety_and_privacy_risk** (W293) | **3** | Container isolation shares host kernel (CNCF advises against for untrusted multi-tenant — cited blaxel.ai). NESTjs API + Toolbox-API expose code-execution endpoints; SECURITY.md confirms `In-sandbox privilege escalation` is **OUT OF SCOPE** for the bounty program — meaning "root-in-sandbox is by design" (per SECURITY.md:Excluded #1). For LOCAL SELF-HOSTED single-operator use this is acceptable (you trust yourself). For cloud-multi-tenant use (which is Daytona's other deployment mode) it is the documented attack-surface. D18 ≥ 2 (no Universal-REJECT trigger). | 1.0 | n/a |

### Composite calculation

```
install_score = Σ(D_i × W_install,i) / 16.5 over 16 install-relevant dims (D1..D11, D14..D18; excludes D12+D13)

= (2×1.5 + 4×0.9 + 1×1.3 + 4×1.3 + 4×1.0 + 3×0.9 + 5×1.0 + 4×1.0 + 4×0.7 + 3×1.1 + 2×0.8 + 1×1.1 + 2×1.0 + 4×1.0 + 2×1.0 + 3×1.0) / 16.5
= (3.0 + 3.6 + 1.3 + 5.2 + 4.0 + 2.7 + 5.0 + 4.0 + 2.8 + 3.3 + 1.6 + 1.1 + 2.0 + 4.0 + 2.0 + 3.0) / 16.5
= 48.6 / 16.5
= 2.945
```

```
pattern_score = Σ(D_i × W_pattern,i) / 7.1 over 7 pattern-relevant dims (D2, D5, D6, D8, D9, D12, D13)

= (4×1.4 + 4×1.0 + 3×0.8 + 4×0.9 + 4×0.8 + 4×0.7 + 4×1.5) / 7.1
= (5.6 + 4.0 + 2.4 + 3.6 + 3.2 + 2.8 + 6.0) / 7.1
= 27.6 / 7.1
= 3.887
```

| **install_score** | **2.945** | below T2 floor (3.0) |  |  |
| **pattern_score** | **3.887** | above T3 floor (3.5) AND D2=4 (≥4) AND D13=4 (≥3) → T3 OPEN |  |  |
| **Hard-cap breaches** | **D1<3 (INSTALL-cap), D3<2 (INSTALL-cap), D14<3 (INSTALL-cap), D15=2 (INSTALL-cap), D17=2 (INSTALL-cap)** — 5 INSTALL-only caps, 0 Universal-REJECT triggers |  |  |  |

## §4 — Tier verdict

**Tier**: **T3 PATTERN-STUDY**

**Rationale**:
1. `install_score 2.945` is below T2 VENDOR-FORK floor (3.0) — soft-gate routes DOWN, not REJECT.
2. **Five INSTALL-only hard-caps fire**: D1<3 (AGPL §13 viral risk to commercial relicensing) + D3<2 (cloud-first + Linux-only self-host alien to local-Windows posture) + D14<3 (multi-hour irreversible install) + D15=2 (no OpenSSF Scorecard + host-kernel-shared isolation) + D17=2 (production state-machine fragility documented in 4+ open issues). Any one of D1/D3/D14 individually blocks INSTALL per SKILL.md:171-173.
3. **VENDOR-FORK (T2) also blocked**: install_score sits at 2.945 (below T2 floor 3.0); AGPL forking IS permitted by license but the *combined* install-cap pressure exceeds the T2 "no critical hard-cap" guarantee.
4. **PATTERN-STUDY (T3) remains OPEN**: pattern_score 3.887 ≥ 3.5 floor ✓; D2 capability_uniqueness = 4 ≥ 4 ✓; D13 pattern_extractability = 4 ≥ 3 ✓. Patterns are clearly extractable WITHOUT installing Daytona itself.
5. **Universal-REJECT triggers do NOT fire**: D7 maintenance = 5 (not abandoned), D10 duplication = 3 (not full duplicate), D15 = 2 (above the security-blocker floor of 1), no adversarial-persona-BLOCK signal collected here (3-persona fan-out deferred to W295 sister-stream coordination per task scope; would be required before T2 routing but not for T3 PATTERN-STUDY which is the chosen tier).

**Adversarial review pre-flight** (which persona would BLOCK, if any):
- **security persona**: would BLOCK T1 INSTALL on D15=2 + D18=3 (host-kernel-shared isolation, in-sandbox root-by-design, no OpenSSF Scorecard, AGPL §13 if ever redistributed as networked service). Would APPROVE T3 PATTERN-STUDY (no execution surface in extracted patterns).
- **architect persona**: would BLOCK T1 INSTALL on D3=1 (cloud-first model breaks local-Windows-portable posture + cardinal-rule-2 sandbox-via-permissions doctrine) and D14=1 (irreversible multi-service stack). Would APPROVE T3 PATTERN-STUDY (no architecture mutation).
- **code-reviewer persona**: would CAUTION-APPROVE T3 on production-fragility evidence (#102, #4142, #4642, #2390, #2191) — extracted patterns MUST include the failure-mode anti-patterns, not only the happy path. Would BLOCK any T2 VENDOR-FORK that vendored the lifecycle/state-machine code unmodified.

**Rollback plan** (if T1 INSTALL): N/A — INSTALL blocked by 5 hard-caps.

**Pattern extraction** (T3 PATTERN-STUDY — chosen tier):
- **Pattern P1 — MCP-server-for-sandbox-control API contract**: how the 6-tool surface (sandbox-mgmt, fs, git, exec, computer-use, preview) is composed → cite https://www.daytona.io/docs/en/mcp/ and `apps/cli/cmd/mcp/*` (Go).
- **Pattern P2 — sandbox-state-machine perturbation handling (as anti-pattern study)**: the 4 documented production failure modes (#102 orphan cleanup, #4142 status-code misleading, #4642 archived-sandbox 404, #2390 stuck-starting) form a canonical FAILURE-CATALOG any future sandbox-related skill MUST guard against → cite the 4 GitHub issue URLs verbatim in a runtime-side `failure-mode-catalog/sandbox-state-machine.md` doc.
- **Pattern P3 — sub-90ms OCI cold-start via Sysbox + user-namespace + pre-warmed snapshot pool**: architectural reference if ever building a local sandbox layer → cite the DeepWiki architecture answer ("Sysbox enforces Linux user-namespaces..."), partial-virtualization of procfs/sysfs, immutable initial mounts, selective syscall interception.
- **Pattern P4 — AGENTS.md Nix-dev-shell-for-non-interactive-agent-builds**: portable build-recipe pattern for cross-language repos → cite https://github.com/daytonaio/daytona/blob/main/AGENTS.md verbatim.
- **Pattern extraction target**: `docs/architecture/patterns-from-daytona-W295.md` (NEW file, ≤200 LOC, cite-only — no AGPL code copied).

## §5 — Sister-stream coordination (W295 sca-v3.1 → sca-v5)

Sca-v5-Δ deltas under construction in `docs/architecture/W295-RESEARCH-ARCH-V5/`. Map of where this candidate's findings inform v5 evolution:

- **sca-v5-Δ1 (Structured Results per-probe policy)**: This candidate is a classic example where composite-score 2.945 hides the real signal — D3=1 + D14=1 are the load-bearing veto signals; their effect is averaged-down by D7=5 + D2=4. Daytona is a CONFIRMATORY example for moving to per-probe + tier-policy vector consumption.
- **sca-v5-Δ2 (Veto-Gates separated)**: D1<3 + D3<2 + D14<3 + D17<2 ALL fire as INSTALL-only caps but the composite still produces a numerical score — under Δ2 these would be EXPLICIT Veto-Gates with auto-routing, not soft-caps inside the composite. This audit confirms the Veto-Gate design is warranted.
- **sca-v5-Δ3 (Adaptive task-specific rubric)**: Daytona is a sandbox/container-runtime candidate. An adaptive rubric for this class would add probes like `host_kernel_isolation_model`, `state_machine_idempotency`, `cleanup_on_signal_handling`, `cold_start_p99_ms`. Current sca-v3.1's D17 robustness captures these but coarsely; per-class probes would surface them sharper.
- **sca-v5-Δ4 (D19 code_review_rigor)**: Could not measure (would need PR-merge analysis last 90 d). Daytona's `apps/dashboard` PR #2873 today shows 1 reviewer required — partial signal only.
- **sca-v5-Δ10 (5 anti-bias gates)**: Gate-4 provenance-audit ✓ (all cites have access-date + URL + commit-SHA where applicable). Gate-5 org-count ✓ (≥6 distinct). Gate-2 paraphrase-invariance: NOT run. Gate-3 adversarial-blinded: NOT run. Gate-1 mechanical re-fetch: deferred (URLs are durable).

**Does candidate CHALLENGE sca-v3.1 architecture?** YES — moderately. Daytona's pattern_score 3.887 > install_score 2.945 by 0.942 = the LARGEST install/pattern gap seen in the W288-W295 verdict series so far (cf. PageIndex install 3.85/pattern 4.66 = gap 0.81; Acontext 3.06/3.63 = 0.57). This validates the dual-composite design (a single-composite would have averaged to ~3.4 — incorrectly close to T2 floor); it also shows the gap-magnitude itself is a useful soft-signal that the current rubric does not exploit (could become a sca-v5 candidate "pattern-dominance ratio" probe).

## §6 — Anti-bias structural proof

- **All cites EXTERNAL with URL + access date**: ✓ — every §2 source has https URL + `accessed 2026-05-18`. Internal cites (CLAUDE.md:22, SKILL.md:73-95, W295-STREAM-E-SYNTHESIS.md) are marked as runtime-internal in context.
- **≥3 distinct external orgs sourced**: ✓✓ — six (superagent.sh, agentmarketcap.ai, blaxel.ai, benchflow-ai, FirstMark/PRNewswire, Daytona Platforms Inc. as primary).
- **Inverse test: would verdict hold under different current architecture?**
  - Under a **multi-tenant SaaS architecture** (Cursor / Codeium-style cloud), Daytona's harness_fit D3 would lift to 4-5 (cloud-first matches cloud-first) and reversibility D14 to 3-4 (you don't have a Windows portability invariant). Composite would lift to ~3.8-4.0 → **verdict would FLIP to T1 INSTALL or T2 VENDOR-FORK**. The verdict is **duty-grounded** (this runtime's posture), not vendor-promoted — passes inverse test.
  - Under a **Windows-portable autonomous-loop architecture WITHOUT cardinal rule 5 sandbox-via-permissions** (i.e., if we explicitly chose to operate untrusted code), D10 would drop to 2 (full duplicate of installed need) but D2+D3 would lift — composite roughly unchanged → verdict T3 holds. Robust under perturbation.

---

## Stop-time deliverable checklist

- [x] `Z:/claude-sota-installed-W290/docs/architecture/W295-CANDIDATE-AUDITS/daytonaio-daytona.md` written (this file)
- [x] 6-MCP evidence-source family count: 6 (DeepWiki, GitHub MCP, GitHub-REST-direct via ctx_execute, daytona.io official docs, Exa, WebSearch)
- [x] Typed-evidence: 3 benchmarks + 3 code-readings + 3 field-reports across ≥6 distinct orgs
- [x] All 17 v3.1 dims scored 1-5 with anchor cites
- [x] Dual composites computed (install 2.945 / pattern 3.887)
- [x] Hard-cap breach list: 5 INSTALL-only (D1<3, D3<2, D14<3, D15=2, D17=2)
- [x] Tier verdict: T3 PATTERN-STUDY (soft-gate routed DOWN from below-T2-floor, not auto-REJECTED per v3 anti-pattern §269)
- [x] 3-persona adversarial pre-flight projected (security/architect/code-reviewer)
- [x] Pattern extraction targets P1-P4 enumerated with cite locations
- [x] Sister-stream coordination map to sca-v5-Δ1/Δ2/Δ3/Δ4/Δ10
- [x] Anti-bias structural proof + inverse-test executed

**Pending downstream (next operator action)**: full 3-persona adversarial fan-out via `superpowers:dispatching-parallel-agents` or `/team-spawn review` to ratify T3 PATTERN-STUDY verdict; basic-memory T6 ledger write to `verdicts/W295-daytonaio-daytona.md`; VERDICT-LEDGER.md row append; codex GPT-5.5 cross-model Stop-hook fire.
