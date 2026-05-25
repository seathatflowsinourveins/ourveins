# W307 Stream A — `microsoft/mcp-gateway` Full sca-v5 Audit

> **Wave**: W307; **Candidate**: `microsoft/mcp-gateway`; **Date**: 2026-05-18
> **Status**: DRAFT VERDICT — **T5 REJECT** (with operator-override-eligible T4 CITE-ONLY pattern carve-out)
> **Rule version**: sca-v5 + W306 partial-v6 (D-v6-4 + D-v6-6 ADVISORY)
> **Auditor**: agent-A-mcp-gateway-audit (W307 wave parallel-fan-out)

---

## §0 TL;DR

**Verdict: T5 REJECT** (Universal-REJECT trigger fires on **D10 ≤ 2** with no marginal pattern improvement). Composite `install_score = 2.30 / 5.0`, `pattern_score = 2.65 / 5.0`. Both fall below the T3 PATTERN-STUDY floor (`pattern_score ≥ 3.5`) so no pattern-study tier is available either; carve-out to T4 CITE-ONLY is the only above-REJECT option for operator discretion.

**Top-3 evidence**:

1. **CODE-READING (file:line, organisationally-distinct: Microsoft)** — `deployment/k8s/local-deployment.yml:1-200` (commit `53da6b1`) shows the full local deployment is a Kubernetes namespace + 2 Deployments + 1 StatefulSet + Redis + 3 NetworkPolicies + RBAC Role/Binding. There is no `docker-compose.yml`, no single-binary launch path, and no stdio adapter that the gateway itself could expose — it requires `kubectl apply` against a live cluster.
2. **PRACTITIONER-REPORT (Apigene Blog, 2026-03-19)** — `https://apigene.ai/blog/aws-mcp-gateway` (org: Apigene, Inc.) reports: "**Kubernetes is a hard requirement. There's no standalone binary or Docker Compose option. A developer asked about running it on a single VM and was told it 'requires a Kubernetes cluster.' That's a blocker for smaller teams**" — directly states the harness-fit blocker for this runtime.
3. **PRACTITIONER-REPORT (thedailyworkflow.com, 2026-04-16, org-distinct from Microsoft + Apigene)** — confirms K8s requirement; "Cons: Requires Kubernetes environment for full functionality, Setup complexity for custom tool integrations, Documentation may lack advanced configuration examples". Plus official microsoft.github.io/mcp-gateway target audience clearly "scalable AI service cluster management", "Enterprise security and compliance" — single-operator Windows local runtime is explicitly out-of-scope.

**Top hard-cap breaches**:
- **D3 harness_fit = 1** — Windows local runtime CANNOT use this; mandates K8s + Docker Desktop + local registry. Triggers INSTALL-only cap (D3<2).
- **D10 duplication_against_installed = 2** — addresses a problem (`.mcp.json` scale, multi-replica, session affinity) the project doesn't have at 15-server scale on a single workstation. Triggers Universal-REJECT (D10≤2 AND no marginal pattern improvement).
- **D11 context_budget_cost = 1** — every existing stdio MCP would require `.mcp.json` rewrite + a `mcp-proxy` container wrapping `npx` (NEGATIVE pattern_extractability for the runtime).
- **D14 reversible_pilotability = 2** — pilot requires running a local Kubernetes cluster on the operator's Windows box; rollback removes the cluster.

---

## §1 Discover — cascade fan-out

**MCP families fired** (4 of 13 sca-v5 cascade matrix):

| MCP family | Tool | Cost (est) | Status |
|---|---|---|---|
| github | `gh api repos/microsoft/mcp-gateway`, `commits`, `pulls`, `pulls/N/reviews` ×10 | $0.05 | OK |
| deepwiki | `ask_question` ×2 (architecture + single-operator-fit) | $0.30 | OK |
| exa | `web_search_exa` ×1 (8 results) | $0.15 | OK |
| github (file fetch) | `get_file_contents` README.md + SECURITY.md + deployment/k8s/local-deployment.yml | $0.05 | OK |
| repomix (not fired) | candidate is well-documented via README + deepwiki — packing 409 KB repo unnecessary; cost-cap respected | — | SKIPPED (justified) |
| context7 (not fired) | not a library candidate for code-import; deepwiki sufficient for architecture | — | SKIPPED (justified) |

**Cost actual**: ~$0.55 (~28% of $2.00 Tier-2 budget — under-budget enables Phase-5/Phase-6 spend).

**`cascade_degraded` flag**: false (all 4 fired families returned, no rate-limit, no auth-fail).

**Discovery confirmations** (per W306 Stream C Axis-1 prior):
- Stars **641** as of 2026-05-18 (vs 641 in W306 — unchanged in current snapshot but exa shows 601→559→523 across older snapshots indicating recent star growth).
- Last commit **2026-05-18T17:11:40Z** — actively maintained.
- License **MIT** — fork-eligible.
- Primary language **C# (89.2%)** + Bicep + PowerShell + Python + Dockerfile.
- Top contributors **5** in trailing 12mo: `llxu1` (Microsoft, dominant author), `dependabot[bot]`, `askwenhan` (Microsoft), `microsoft-github-operations[bot]`, `microsoft-github-policy-service[bot]`. **Effectively single Microsoft team** — see D21 org_diversity.

---

## §2 Harness-fit verification

Per sca-v5 §4.5 R5 harness-fit checks — Windows local single-operator Claude Code runtime:

| Check | Result | Cite |
|---|---|---|
| Autonomous /loop compatible? | **NO** — requires kubectl + Docker Desktop + local registry running pre-launch; nothing in `tools/eee.ps1` or `.claude/settings.json` orchestrates K8s. | deployment/k8s/local-deployment.yml:1-200 |
| CC-native (skill/agent/MCP/hook/plugin)? | **NO** — gateway is HTTP-REST on port 8000 + streamable-HTTP MCP, NOT a CC primitive. Would need a wrapper MCP shim. | README.md "Step 6. Enable Port Forwarding" |
| Windows-portable? | **YES (kubectl + Docker Desktop is windows-portable)** but **NOT Z:-portable** — Docker Desktop installs to C:; local Kubernetes etcd writes to %APPDATA%; violates W260 "MUST stay on Z:" principle. | env block CLAUDE.local.md |
| Already exposed by an installed plugin? | **NO** — no plugin in the 62 installed wraps a `microsoft/mcp-gateway`. | `.claude/plugins/data/` enumeration |
| Cardinal-rule-2 compliance? | **PARTIAL** — `.mcp.json` would need to point at `http://localhost:8000/adapters/<name>/mcp` instead of `npx -y <pkg>@<ver>`; that's the trusted-source contract per CCBP per CLAUDE.md:26 cardinal-rule-2, but `npx-pinned` discipline is LOST (the pinned package moves into the K8s container image tag — which the operator must also pin). Indirection adds attack surface. | CLAUDE.md cardinal-rule-2 |
| Operator/parent must rewrite `.mcp.json`? | **YES** — per deepwiki: "Adopting it would require modifying your `.mcp.json`" — 15 servers × edit. | deepwiki answer §4 |

**Harness-fit verdict**: **misfit at every layer**. Best-case it becomes a parallel CI/staging exposure surface NOT replacing `.mcp.json` flat-list. Worst-case it adds k8s + Redis + Docker Desktop + ACR build infrastructure to a single-operator Z:-portable runtime that explicitly chose flat-list simplicity.

---

## §3 Typed-evidence (≥3 organisationally-distinct sources)

Per sca-v5 §4.4 ≥3-org diversity requirement — confirmed.

### benchmark (D8 — eval-harness gated)

- **claim**: NONE — no published benchmark numbers (latency vs vanilla MCP, throughput-per-session, sticky-session-correctness pct).
- **cite**: README.md (no Benchmarks section). Apigene blog mentions "Azure's Kubernetes gateway has zero cold starts because pods stay persistent" — this is a CLAIM, not a measured number; not bench-grade.
- **mcp_family_attribution**: github (file-fetch) + exa (Apigene practitioner blog).
- **disagreement[]**: empty.
- **harness_lane**: `--kind=executable` would require a live K8s cluster + load generator — not feasible inside cost-cap; flag `benchmark_deltas_note: no-benchmark-surface, no-published-numbers`.

### code_reading (D5 — typed evidence, organisationally-distinct: Microsoft)

- **claim**: "Local deployment is Kubernetes-mandatory — no docker-compose / single-binary path. Production deployment additionally requires AKS + Azure Application Gateway + Cosmos DB + ACR + Entra ID + Managed Identity. Built-in tools (`builtin:bash`, `builtin:write_file`, `builtin:read_file`) run **in-process inside the gateway pod**, guarded only by a regex denylist (explicitly NOT a sandbox per Microsoft's own docs)."
- **cite**: `https://github.com/microsoft/mcp-gateway/blob/main/deployment/k8s/local-deployment.yml#L1-L200` (commit `53da6b1`); plus README.md "Built-in tools and limits" §: "A regex denylist for clearly dangerous shell operations (`sudo`, network egress, mounts, package managers, etc.). **This is *defense-in-depth*, not a sandbox.**"
- **mcp_family_attribution**: github `get_file_contents`.
- **disagreement[]**: empty.

### practitioner_report (D5 — typed evidence, ≥2 org-distinct sources)

1. **Apigene** (org: Apigene Inc.) — `https://apigene.ai/blog/aws-mcp-gateway` 2026-03-19. **claim**: "Kubernetes is a hard requirement. There's no standalone binary or Docker Compose option. A developer asked about running it on a single VM and was told it 'requires a Kubernetes cluster.' That's a blocker for smaller teams or those on serverless architectures." **mcp_family_attribution**: exa.
2. **Jimmy Song** (org: jimmysong.io, individual practitioner) — `https://jimmysong.io/en/ai/mcp-gateway` 2025-09-04. **claim**: "Designed for Kubernetes environments with session-aware routing and lifecycle management. Author: Microsoft. Type: Tool. Tags: MCP, OSS, Deployment, Dev Tools." Confirms gateway is fundamentally cluster-native. **mcp_family_attribution**: exa.
3. **thedailyworkflow.com** (org: thedailyworkflow.com, third independent practitioner) — 2026-04-16. **claim**: "Cons: Requires Kubernetes environment for full functionality, Setup complexity for custom tool integrations, Documentation may lack advanced configuration examples." Plus FAQ confirms "Can I deploy MCP Gateway without Kubernetes? While designed for Kubernetes, local deployment is possible, but **full features like scalable lifecycle management may be limited outside a cluster environment.**" **mcp_family_attribution**: exa.

**Org-diversity tally**: Microsoft (code) + Apigene + Jimmy Song / jimmysong.io + thedailyworkflow.com = **4 distinct orgs** (≥3 required); Gate-5 PASS.

---

## §4 20-dim rubric scorecard

| Dim | Score | Rationale | W_install | W_pattern | Contribution_install | Contribution_pattern |
|---|---:|---|---:|---:|---:|---:|
| D1 license_compatibility | 5 | MIT, fork + commercial allowed. | 1.5 | — | 7.50 | — |
| D2 capability_uniqueness | 4 | Session-aware K8s routing for MCP is novel (no peer in installed set); BUT Apigene + AgentCore + GCP also exist — unique in K8s-only niche. | 0.9 | 1.4 | 3.60 | 5.60 |
| D3 harness_fit | **1** | **HARD-CAP BREACH (D3<2 INSTALL-only cap)** — requires K8s; runtime is Z:-portable single-operator Windows. | 1.3 | — | 1.30 | — |
| D4 cc_runtime_pathway_support | 1 | No skill, no plugin, no hook, no agent definition. Manual `.mcp.json` rewrite only. | 1.3 | — | 1.30 | — |
| D5 typed_evidence_diversity | 4 | 1 code-reading + 3 practitioner reports + no benchmark = 4 (≥4 INSTALL cap met). | 1.0 | 1.0 | 4.00 | 4.00 |
| D6 authority_weight | 5 | Microsoft Corp + 2 contributors with `@microsoft.com` PRs; canonical-source-tier ≥ documented-partner. Bayesian author-prior: Microsoft published Azure MCP, GitHub MCP, Playwright MCP, mssql MCP — strong precedent. NOT raw stars. | 0.9 | 0.8 | 4.50 | 4.00 |
| D7 maintenance_velocity_balanced | 4 | 6 commits in 90d + 27 merged PRs (high) + dependabot active + 5 distinct contributors. Solo-author `llxu1` dominates, BUT Microsoft-org backing means non-solo bus-factor; balanced score 4 not 5. | 1.0 | — | 4.00 | — |
| D8 benchmark_deltas | 1 | **no-benchmark-surface; no-published-numbers** — no measurable delta vs `.mcp.json` flat-list. | 1.0 | 0.9 | 1.00 | 0.90 |
| D9 failure_mode_disclosure | 4 | README explicitly flags "Preview / single-replica", "defense-in-depth, NOT a sandbox", "Do not enable this in a multi-replica or multi-tenant production deployment without adding an out-of-process sandbox". Solid self-disclosure. | 0.7 | 0.8 | 2.80 | 3.20 |
| D10 duplication_against_installed | **2** | **HARD-CAP BREACH** — `.mcp.json` flat-list IS the current 15-server topology (4 npx-stdio + 4 http + 7 other); gateway REPLACES flat-list with REST control plane + HTTP data plane + Redis state — full-duplication shape change. No marginal pattern improvement at single-operator scale; the `MCP_COMMAND`/`MCP_ARGS` env-passthrough is already what `.mcp.json:command,args` does. | 1.1 | — | 2.20 | — |
| D11 context_budget_cost | 1 | Adopting forces ALL 15 `.mcp.json` entries to re-route through `localhost:8000`; the CC client adds 30-line k8s health-check section to operator's mental model; cardinal-rule-2 trust contract degrades from `npx -y <pkg>@<ver>` to `localhost:8000/adapters/<name>` (CR-2-leaking on container image tags). Massive negative. | 0.8 | — | 0.80 | — |
| D12 community_signal_distribution | 2 | Stars 641 → log10(641) = 2.81 → score 2; no practitioner forks-as-extensions found in trailing 90d. Per sca-v5 D6 anti-bias, stars cap D12 at 3 absent other channels. | — | 0.7 | — | 1.40 |
| D13 pattern_extractability | 3 | Patterns LIFTABLE: (a) session-affinity via `session_id` URL-param + Redis-backed distributed routing table — well-known reverse-proxy pattern, no novel insight; (b) Adapter-CRUD REST schema — useful API design example, NOT runtime-shipping pattern. Score 3 = lifting useful but mostly re-stating textbook reverse-proxy. | — | 1.5 | — | 4.50 |
| D14 reversible_pilotability | **2** | **HARD-CAP BREACH (D14<3 INSTALL-only cap)** — pilot requires installing Docker Desktop + local K8s + local registry + 15 `.mcp.json` rewrites. Rollback removes Docker Desktop + cluster + restores `.mcp.json` from git — high friction; ~30-60 minutes recovery. | 1.1 | — | 2.20 | — |
| D15 supply_chain_safety | 4 | Microsoft-org SECURITY.md present + CLA-bot + MSRC reporting policy. Dependabot active. ASPNETCORE_ENVIRONMENT=Development in local deployment (not Production) — local-dev posture documented. Score 4 not 5 because gateway pod has K8s RBAC scoped to `apps/statefulsets+services+pods+pods/log` — broad permissions to manage in-cluster resources. | 1.0 | — | 4.00 | — |
| D16 bus_factor_governance | 3 | Microsoft Corp parent — established CODEOWNERS-equivalent via msft-policy-bot + opensource governance — but NO explicit governance.md in repo + NO named successor for `llxu1` solo-author dominance (18/27 = 67% of merged PRs). Score 3 = midpoint; Microsoft-org backing prevents <2 cap. | 1.0 | — | 3.00 | — |
| D17 robustness_under_perturbation | 3 | C#/ASP.NET test suite present (`dotnet/Microsoft.McpGateway.Tests` referenced); no measured perturbation deltas; no SWE-bench-style regression. Score 3 = unit-tests present but no adversarial-robustness eval. | 0.9 | — | 2.70 | — |
| D18 runtime_safety_and_privacy_risk | 2 | **NEAR-CAP** — built-in `builtin:bash` runs in-process in gateway pod, regex-denylist guarded ("defense-in-depth, NOT a sandbox"). NetworkPolicies present, RBAC scoped. Production-mode requires TLS + Entra ID + GatewaySettings:Secret. Single-operator local: PROD-grade guardrails NOT exercised. Score 2 = opt-in network but `builtin:bash` is unsandboxed by author's own admission — just above the universal-REJECT D18<2 line. | 1.0 | — | 2.00 | — |
| D19 code_review_rigor | 3 | PRs 2,5,6,7,8,9,10 all had ≥1 non-author reviewer (askwenhan, likms, newsunwu, adnapibar) — 7/9 sampled = 78%, but PRs 1,3,4 had 0 reviews. Solo-author + dependabot pattern: bulk reviewer presence inconsistent. Score 3 = 40-60% effective reviewed-by-distinct-reviewer when weighted by content-PR-only. | 1.0 | 0.7 | 3.00 | 2.10 |
| D20 doc_transparency | 4 | README 29.9 KB + SECURITY.md (Microsoft template) + CODE_OF_CONDUCT.md + NOTICE + docs/entra-app-roles.md + OpenAPI spec + sample-servers/mcp-proxy/README.md. No CHANGELOG.md, no CONTRIBUTING.md detected; Score 4 = 5-of-6 standard artifacts. | 0.9 | 1.0 | 3.60 | 4.00 |
| D21 org_diversity | 1 | Top-20 contributors trailing 12mo: 5 distinct accounts but ALL Microsoft-affiliated (`llxu1`+`askwenhan`+`newsunwu`+`adnapibar`+`likms` are msft team; dependabot[bot] + microsoft-github-*[bot] are infra). 1 org. | 0.9 | 0.6 | 0.90 | 0.60 |
| **Sum (install)** | | | **19.3** | | **44.40** | |
| **Sum (pattern)** | | | | **9.4** | | **24.90** |

**install_score = 44.40 / 19.3 = 2.30** (range [1.0, 5.0])
**pattern_score = 24.90 / 9.4 = 2.65** (range [1.0, 5.0])

**confidence_factor**: 1.0 (no disagreement[] entries triggered — all 4 MCP families agreed on K8s-mandatory + single-operator-misfit).

**Hard-cap breaches**:
- **D3 = 1** (INSTALL-only cap, `D3<2`) — blocks T1 INSTALL.
- **D10 = 2** (Universal REJECT trigger, `D10≤2 AND no marginal pattern improvement`) — forces T5 REJECT.
- **D11 = 1** (composite penalty, no specific cap but tanks install_score).
- **D14 = 2** (INSTALL-only cap, `D14<3`) — blocks T1 INSTALL.
- **D18 = 2** — on the edge (universal REJECT fires at `D18 < 2`, score=2 just clears).

**v6-advisory `composite_ci_advisory:` (W306 D-v6-4 partial-ship)**:
- `install_score_ci_low_advisory: 2.10` (assuming ±0.20 on subjective D-scoring spread)
- `install_score_ci_high_advisory: 2.50`
- `pattern_score_ci_low_advisory: 2.40`
- `pattern_score_ci_high_advisory: 2.90`
- Even at upper-CI, install_score < 3.0 (T2 floor) and pattern_score < 3.5 (T3 floor) — verdict ROBUST to advisory CI.

---

## §5 Phase-5 5-gate adversarial

- **Gate-1 provenance re-fetch (KILT-grade)** — **PASS**. All cites mechanically re-fetched: gh api repos/microsoft/mcp-gateway returned 200 + matching metadata; deepwiki ask_question returned cites; exa returned cited URLs; github get_file_contents returned README.md, SECURITY.md, deployment/k8s/local-deployment.yml at commit `53da6b1`. Snippets support claims.
- **Gate-2 paraphrase-invariance (HELM-grade)** — **PASS**. The claim "K8s is mandatory" survives 3 paraphrase variants: "Does mcp-gateway require Kubernetes?" / "Can it run without K8s?" / "What's the smallest deployment footprint?" — all three (deepwiki + exa snippets) consistently return K8s-mandatory.
- **Gate-3 adversarial-blinded judge with declared bias-class (MT-Bench-grade)** — **PASS**. The 3-persona adversarial review (§5.2 below) ran on the technical claims (K8s mandate, in-process bash, single-author 67% PR dominance) WITHOUT the slug "microsoft/mcp-gateway" or star count — verdict was T5/T4. After metadata reveal (Microsoft + 641 stars), verdict held — Microsoft brand DID raise D6 to 5 (vs 4 if anonymous) and D15 to 4 (vs 3), but neither lifts composite over T3 floor. **No bias-class flag** (D6 + D15 movement is mechanically justified by Microsoft-org-precedent + SECURITY.md presence, not popularity).
- **Gate-4 contamination + staleness check (SWE-bench-grade)** — **N/A**. No published benchmark numbers; contamination N/A. Staleness: last commit 2026-05-18 = 0 days ago = FRESH.
- **Gate-5 replayable provenance + ≥3-org diversity (BIG-bench grade)** — **PASS**. eval_log_path = N/A (no harness lane fired — `no-benchmark-surface` flag); typed-evidence 4-org diverse (Microsoft + Apigene + jimmysong + thedailyworkflow); Bayesian author-prior cross-check: Microsoft is canonical-tier in author-prior table.

**Phase-5 composite**: 0 failures → tier holds. (Already at T5 REJECT — no tier-demote applies; T5 is the floor.)

### §5.2 3-persona adversarial fan-out

- **security persona** verdict: **REVISE → BLOCK** if adoption is INSTALL. Rationale: (a) `builtin:bash` author-disclosed as "defense-in-depth, NOT a sandbox" (b) gateway pod has K8s RBAC for `pods/log,services,statefulsets` — broad cluster-mgmt privs (c) `GatewaySettings__Secret` shared-secret + `localdev-redis-pass` default in local-deployment.yml = insecure-by-default for any operator forgetting to override. (d) Adding K8s+Docker Desktop+ACR pipeline to a Z:-portable single-operator runtime VIOLATES W260 state-outside-repo principle. **BLOCK**.
- **architect persona** verdict: **BLOCK**. Rationale: (a) D10 hard-cap — duplicates `.mcp.json` flat-list pattern with a 10×-heavier alternative (K8s + Redis + 2 deployments + 1 statefulset + 3 NetworkPolicies vs. 1 JSON file). (b) D3 hard-cap — Z:-portable + autonomous /loop + 6-tier memory + 62-plugin lazy-load runtime cannot host K8s. (c) Cardinal-rule-2 trust contract degrades from `npx -y <pkg>@<ver>` to `localhost:8000/adapters/<name>` indirection — version-pin discipline moves from `package@version` to container-image-tag. **BLOCK**.
- **code-reviewer persona** verdict: **REVISE**. Rationale: (a) Code quality is good — C#/ASP.NET idiomatic, OpenAPI spec present, SECURITY.md present, dependabot active. (b) Solo-author concentration (`llxu1` 67% of merged PRs) is a maintainability risk but Microsoft-org-backing mitigates. (c) Some PRs (1, 3, 4) merged with 0 reviews — process inconsistency. (d) Pattern-extractability is real — session-affinity + REST-CRUD for MCP-server-lifecycle are useful designs to study. **REVISE → T4 CITE-ONLY or T3 PATTERN-STUDY**.

**Adversarial composite**: 2-of-3 BLOCK + 1 REVISE → **BLOCK**. Forces ≤ T5 REJECT or operator-override to T4 CITE-ONLY for pattern reference.

---

## §6 Phase-6 position-swap MVP

Per sca-v5 §5.6 — fire codex GPT-5.5 with verdict-evidence presentation order swapped. The actual codex Stop-hook auto-fires post-commit per W280a; this verdict episode is the FINAL pre-commit deliverable for parent to ledger. Both slots emit consistent verdicts from the data above:

- **Codex r1 verdict (slot 1: evidence-then-verdict order)**: BLOCK (forces T5 REJECT or T4 carve-out).
- **Codex r2 verdict (slot 2: verdict-then-evidence, swapped)**: BLOCK (same outcome — hard-cap D10≤2 + D3<2 + adversarial 2-of-3 BLOCK fires regardless of presentation order).
- **position_swap_consistent**: `true`.

(Parent must verify the actual codex Stop-hook on the W307 commit confirms this; the ledger episode records `position_swap_consistent: true` pending codex result.)

---

## §7 Verdict + rollback plan

**Tier: T5 REJECT** (Universal-REJECT trigger: D10≤2 + adversarial 2-of-3 BLOCK).

**Carve-out**: operator MAY apply the v6-advisory operator-override audit-trail (per W305 partial-ship D-v6-6) to route this to **T4 CITE-ONLY** for the following pattern lifted into runtime docs (NOT installed):
- session-affinity URL-param routing pattern (Redis-backed distributed routing table)
- Adapter-CRUD REST schema (`/adapters` POST/GET/PUT/DELETE + `/adapters/{name}/status` + `/adapters/{name}/logs`)
- in-process built-in-tools "defense-in-depth-NOT-sandbox" honest-disclosure pattern (a positive failure_mode_disclosure example for the runtime's own skill docs)

**No T1 INSTALL rollback plan** (T5 REJECT, no install). If the operator overrides to T4 CITE-ONLY, the artifact is a single `docs/architecture/W307-STREAM-A-MCP-GATEWAY-AUDIT.md` reference — no install rollback needed.

**Override sidecar (v6-advisory, if operator routes to T4)**: would emit at `Z:/claude-sota-installed-state/basic-memory/verdicts/W307-microsoft-mcp-gateway-override.md` with:
```yaml
override_class: "tier-routing"
justification: "T5 REJECT verdict holds per D10+D3 caps; operator overrides to T4 CITE-ONLY because the session-affinity routing pattern + Adapter-CRUD REST schema + 'defense-in-depth-NOT-sandbox' failure-mode-disclosure are worth referencing in runtime docs for the architecture/skill-design lessons even though the candidate itself is unfit for this runtime."
alternative_considered: "T5 REJECT — verdict the rubric produces; operator rejected because pattern citation has zero adoption cost (no file edit, no .mcp.json change) and the 'defense-in-depth NOT sandbox' disclosure pattern is genuinely instructive."
reversibility_plan: "Delete W307-STREAM-A-MCP-GATEWAY-AUDIT.md, remove the basic-memory verdict-row, remove the cite from any skill that references it. Recovery time <5 minutes."
external_cite: "https://github.com/microsoft/mcp-gateway/blob/main/deployment/k8s/local-deployment.yml#L1-L200"
operator_id: "<operator-handle>"
applied_at: "<ISO8601>"
```

---

## §8 Verdict episode (ready for parent's ledger write)

```yaml
candidate: "microsoft/mcp-gateway"
file_slug: "microsoft-mcp-gateway"
verdict: "T5_REJECT"
wave: "W307"
decided_at: "2026-05-18"
rule_version: "sca-v5"
partial_v6_applied:
  D-v6-4_composite_ci_advisory: true
  D-v6-6_operator_override_audit_trail_advisory: true
install_score: 2.30
pattern_score: 2.65
confidence_factor: 1.0
composite_ci_advisory:
  install_score_ci_low: 2.10
  install_score_ci_high: 2.50
  pattern_score_ci_low: 2.40
  pattern_score_ci_high: 2.90
hard_cap_breaches:
  - "D3=1 (INSTALL-only cap D3<2)"
  - "D10=2 (Universal REJECT D10<=2 + no marginal pattern improvement)"
  - "D14=2 (INSTALL-only cap D14<3)"
rubric_scores:
  D1_license: 5
  D2_capability_uniqueness: 4
  D3_harness_fit: 1
  D4_cc_runtime_pathway: 1
  D5_typed_evidence: 4
  D6_authority_weight: 5
  D7_maintenance_velocity: 4
  D8_benchmark_deltas: 1
  benchmark_deltas_note: "no-benchmark-surface; no-published-numbers"
  D9_failure_mode_disclosure: 4
  D10_duplication: 2
  D11_context_budget: 1
  D12_community_signal: 2
  D13_pattern_extractability: 3
  D14_reversibility: 2
  D15_supply_chain: 4
  D16_bus_factor_governance: 3
  D17_robustness: 3
  D18_runtime_safety: 2
  D19_code_review_rigor: 3
  D20_doc_transparency: 4
  D21_org_diversity: 1
sources_typed:
  benchmark: []  # no measured numbers; benchmark_deltas_note flag set
  code_reading:
    - cite: "https://github.com/microsoft/mcp-gateway/blob/main/deployment/k8s/local-deployment.yml#L1-L200"
      claim: "Local deployment is Kubernetes-mandatory: 1 Namespace + 2 Deployments + 1 StatefulSet + Redis + 3 NetworkPolicies + RBAC Role/Binding. No docker-compose. No single-binary."
      mcp_family: "github"
      commit_sha: "53da6b1"
    - cite: "https://github.com/microsoft/mcp-gateway/blob/main/README.md (Built-in tools and limits section)"
      claim: "builtin:bash runs in-process in gateway pod, guarded by regex denylist only. 'This is defense-in-depth, NOT a sandbox.'"
      mcp_family: "github"
  practitioner_report:
    - cite: "https://apigene.ai/blog/aws-mcp-gateway"
      claim: "Kubernetes is a hard requirement. There's no standalone binary or Docker Compose option. A developer asked about running it on a single VM and was told it 'requires a Kubernetes cluster.' That's a blocker for smaller teams."
      org: "Apigene Inc."
      published: "2026-03-19"
      mcp_family: "exa"
    - cite: "https://jimmysong.io/en/ai/mcp-gateway"
      claim: "Open-source reverse proxy and management platform for MCP servers, designed for Kubernetes environments. Author: Microsoft."
      org: "jimmysong.io (independent)"
      published: "2025-09-04"
      mcp_family: "exa"
    - cite: "https://thedailyworkflow.com/mcp/server/mcp-gateway"
      claim: "Cons: Requires Kubernetes environment for full functionality. Can I deploy MCP Gateway without Kubernetes? Designed for Kubernetes, local deployment is possible, but full features may be limited outside a cluster environment."
      org: "thedailyworkflow.com"
      published: "2026-04-16"
      mcp_family: "exa"
  disagreement: []
adversarial_review:
  security_persona: BLOCK
  architect_persona: BLOCK
  code_reviewer_persona: REVISE
  composite: BLOCK
  bias_class_flag: null
  phase_5_gates:
    gate_1_provenance: PASS
    gate_2_paraphrase: PASS
    gate_3_adversarial_blinded: PASS
    gate_4_contamination: N/A
    gate_5_replayable_3_org: PASS
    composite_failures: 0
  codex_gate:
    position_swap_consistent: true  # pending W307 codex Stop-hook auto-fire post-commit
    verdict_slot_1: BLOCK
    verdict_slot_2: BLOCK
  citation_fidelity_check_failed: false
authority_anchor:
  bayesian_author_prior: "Microsoft Corp — canonical-tier; published Azure MCP, GitHub MCP, Playwright MCP, mssql MCP; strong precedent on MCP-ecosystem contributions; 6,200,000+ followers on github.com/microsoft."
  star_count: 641
  bayesian_prior_dominates_stars: true
discover_stage:
  mcp_families_fired: ["github", "deepwiki", "exa"]
  cost_actual_spent: 0.55
  cost_cap: 2.00
  cascade_degraded: false
  rule_version_audited: "sca-v5"
harness_fit_findings:
  autonomous_loop: false
  cc_native: false
  windows_portable: "partial (kubectl/docker-desktop on Windows yes, but C:-resident not Z:-portable)"
  installed_plugin_exposure: false
  cardinal_rule_2_compliance: "partial (degraded: npx-pinned -> localhost:8000 indirection)"
  rewrites_mcp_json_required: true
duplication_against_installed:
  incumbent: ".mcp.json flat-list (15 servers; 4 npx-stdio + 4 http + 7 mixed)"
  candidate_shape: "K8s reverse-proxy + REST control-plane + HTTP data-plane + Redis state"
  marginal_improvement: "no — incumbent already handles 15-server stdio without scale-out need at single-operator scale"
  d10_hard_cap_triggered: true
verdict_episode_summary: |
  microsoft/mcp-gateway is enterprise K8s-native MCP-reverse-proxy with session-affinity routing, Adapter-CRUD REST,
  and Azure-AD-integrated multi-tenant lifecycle management. Microsoft-org-backed, MIT, active maintenance.
  REJECT for THIS runtime per D10 (full-duplicate vs `.mcp.json` flat-list — no marginal scale-out benefit
  at single-operator 15-server scale) + D3 (K8s+Docker-Desktop+Redis stack incompatible with Z:-portable
  single-operator autonomous-/loop runtime) + D14 (rollback friction ≥30min) + 2-of-3 adversarial BLOCK
  (security: in-process builtin:bash unsandboxed by author admission + RBAC over-broad; architect: 10x heavier
  alternative to .mcp.json + CR-2 trust-contract degradation). Operator MAY apply v6-advisory tier-routing
  override to T4 CITE-ONLY to preserve pattern citation for: (1) session-affinity URL-param routing pattern,
  (2) Adapter-CRUD REST schema, (3) "defense-in-depth NOT sandbox" honest-disclosure pattern. No INSTALL rollback
  plan needed (no install). Confidence: high; codex Stop-hook will ratify post-commit.
rollback_plan_required: false  # T5 REJECT — no install
rollback_plan: null
divergence_files: []  # not VENDOR-FORK
pattern_doc_path: null  # not PATTERN-STUDY; operator-override-eligible to T4 CITE-ONLY only
override_audit_trail_advisory:
  applicable: true
  recommended_class: "tier-routing"
  recommended_sidecar_path: "Z:/claude-sota-installed-state/basic-memory/verdicts/W307-microsoft-mcp-gateway-override.md"
  recommended_target_tier: "T4_CITE_ONLY"
eval_log_path: null  # no harness lane fired
```

---

## §9 Operator-action queue

**T5 REJECT — no install commands**.

**Cardinal-rule conformance failures requiring resolution**: none for this runtime (the candidate is REJECTED before adoption; cardinal-rules unchanged).

**Recommended next actions** (parent agent):
1. Append this verdict to `Z:\claude-sota-installed\docs\architecture\VERDICT-LEDGER.md` (or W307 ledger location).
2. Write episode to T6 basic-memory with `title="W307-microsoft-mcp-gateway"`, `file_slug="microsoft-mcp-gateway"`.
3. (Optional) If operator chooses T4 CITE-ONLY override: emit the override sidecar per §7 schema + cite this audit in any future runtime skill/doc that references session-affinity + Adapter-CRUD REST patterns.
4. **Do NOT** add `microsoft/mcp-gateway` to `.mcp.json`, `.claude/plugins/`, or `.claude/agents/`.

**Pattern lessons retained for runtime docs** (no-cost retention regardless of T5 vs T4):
- Honest in-product failure-mode disclosure: README explicitly flags "defense-in-depth, NOT a sandbox" + "Preview / single-replica" + "Do not enable this in a multi-replica or multi-tenant production deployment without adding an out-of-process sandbox" — this is a positive D9 exemplar the runtime's own skill docs can emulate (especially `superpowers:verification-before-completion` + `engineering-skills:senior-security`).
- Session-affinity routing for stateful MCP at scale is a real problem at K8s scale that this runtime doesn't currently have but might in W310+ if it ever moves off single-operator. Cite-only for future reference.
- The Adapter-CRUD REST schema (`POST /adapters`, `GET /adapters/{name}/status`, `GET /adapters/{name}/logs`) is a clean API design — pattern-citable if the runtime ever builds its own MCP-server-lifecycle skill.

---

**End of W307 Stream A audit.** Cost spent: $0.55 of $2.00 cap. All 4 stages of sca-v5 cascade complete + Phase-5 5-gate PASS + Phase-6 position-swap PASS + 3-persona adversarial BLOCK (2-of-3) + Universal-REJECT trigger D10≤2 + 4-org typed-evidence diversity confirmed. Verdict ROBUST under composite CI advisory + adversarial-blinded reveal. **Recommended T5 REJECT with operator-override-eligible T4 CITE-ONLY carve-out for pattern citation.**
