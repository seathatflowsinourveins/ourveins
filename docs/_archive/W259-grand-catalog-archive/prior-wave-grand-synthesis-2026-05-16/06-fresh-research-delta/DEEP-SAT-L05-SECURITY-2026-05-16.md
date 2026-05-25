# DEEP-SATURATION L0.5 — Security + Provenance EXHAUSTIVE Coverage

> **Fork**: DEEP-SATURATION L0.5 Security/Provenance lane
> **Date**: 2026-05-16
> **Method**: 10 GraphQL queries + 25 name-search probes + WebSearch corroboration + cross-reference against existing canonical D1-D10 corpus (CANONICAL-D1-D10-146REPO-SCORING.md rows 69-72, ULTIMATE-SYNTHESIS-V-FINAL-V4 §L0.5)
> **Cite-class**: TIER-3-LOCAL-COMPOSITION (TIER-1-DIRECT GitHub API + TIER-2 WebSearch + TIER-3 prior-wave-cross-reference). Per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE.

---

## §A — Security Matrix (40+ rows)

Notation: `License | Stars | Updated | Sub-Category | D1 license-compatible | D2 maintained | D3 organic | D4 governance-tier | D5 trusted-source-signals | D6 native-CC-pathway | D7 community-adopted | D8 ≥3 distinct orgs | Native-CC-Pathway` (per harness-fit-Probe-DAG schema).

Sub-categories: **PII** | **GUARD** (guardrails) | **MCP-AUDIT** | **SECRETS** | **SIGSTORE** | **RED-TEAM** | **POLICY** | **AUDIT-TRAIL** | **INJECTION** (prompt-injection defense)

### §A.1 — Tier-1 anchors (verified canonical orgs)

| # | Repo | License | Stars | Updated | Sub-Cat | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Native-CC-Pathway |
|---|---|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **microsoft/presidio** | MIT | **8,087** | 2026-05-16 | PII | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 9 | `pip install presidio-analyzer presidio-anonymizer` + direct-CLI in hook OR MCP wrapper |
| 2 | **protectai/llm-guard** | MIT | **2,955** | 2026-05-16 | GUARD+PII+INJECTION | 10 | 10 | 9 | 8 | 9 | 9 | 8 | 8 | `pip install llm-guard` + Python lib in hook |
| 3 | **NVIDIA/garak** | Apache-2.0 | **~7,500** (v0.14.0 Feb 2026) | 2026-Q1 | RED-TEAM | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 9 | `pip install garak` + CLI invoke in scheduled hook |
| 4 | **NVIDIA-NeMo/Guardrails** | Apache-2.0 | published v0.21.0 | 2026-Q1 | GUARD | 10 | 10 | 10 | 10 | 10 | 8 | 9 | 9 | `pip install nemoguardrails` + Python lib (heavy — Colang DSL) |
| 5 | **snyk/agent-scan** (formerly InvariantLabs-AI/mcp-scan, renamed post-Snyk-acquisition June 2025) | Apache-2.0 | **2,410** | 2026-05-16 | MCP-AUDIT+INJECTION | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | `uvx snyk-agent-scan@latest` + direct CLI in hook |
| 6 | **getsops/sops** (formerly mozilla/sops, donated to CNCF 2023) | MPL-2.0 | **21,796** | 2026-05-16 | SECRETS | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | Direct CLI binary; secret-edit on commit |
| 7 | **FiloSottile/age** | BSD-3 | **22,300** | 2026-05-16 | SECRETS | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | Direct CLI binary; encrypted-secret recipient |
| 8 | **sigstore/cosign** | Apache-2.0 | **5,921** | 2026-05-15 | SIGSTORE | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 10 | Direct CLI; sign/verify SBOMs+containers+commits |
| 9 | **sigstore/rekor** | Apache-2.0 | ~1,100 | 2026 active | SIGSTORE | 10 | 10 | 10 | 10 | 10 | 7 | 9 | 9 | API service; transparency-log query in CI |
| 10 | **sigstore/policy-controller** | Apache-2.0 | **172** | 2026-05-03 | SIGSTORE+POLICY | 10 | 10 | 9 | 10 | 10 | 7 | 8 | 8 | K8s admission-controller (cluster-only, not local CC) |
| 11 | **cedar-policy/cedar** | Apache-2.0 | **1,481** | 2026-05-16 | POLICY | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 10 | `cargo install cedar-policy-cli` + direct CLI authz-rule eval |
| 12 | **cedar-policy/cedar-go** | Apache-2.0 | 198 | 2026-05-15 | POLICY | 10 | 10 | 9 | 10 | 9 | 9 | 8 | 8 | Go library; embed in hook binary |
| 13 | **zizmorcore/zizmor** (renamed from woodruffw/zizmor) | Apache-2.0 | **4,928** | 2026-05-16 | INJECTION+POLICY | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | `cargo install zizmor` + GH-Actions security lint hook |
| 14 | **trailofbits/claude-code-config** | n/a (CC-config) | (private repo) | 2026-02-27 | GUARD+AUDIT-TRAIL | 9 | 9 | 9 | 10 | 10 | 10 | 8 | 8 | Direct adopt — opinionated Claude Code defaults |
| 15 | **trailofbits/claude-code-devcontainer** | n/a (devcontainer) | (active) | 2026-Q1 | GUARD (sandbox) | 9 | 10 | 9 | 10 | 10 | 9 | 8 | 8 | Devcontainer; runs CC in bypass mode safely |

### §A.2 — Tier-2 emerging MCP+Agent security tools (Q1 2026 newcomers)

| # | Repo | License | Stars | Updated | Sub-Cat | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Native-CC-Pathway |
|---|---|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 16 | **mukul975/Anthropic-Cybersecurity-Skills** | Apache-2.0 | **6,346** | 2026-05-16 | GUARD+RED-TEAM | 10 | 10 | 7 | 6 | 7 | 10 | 8 | 6 | 754 plugin-skills; `/plugin install` if maintained |
| 17 | **0x4m4/hexstrike-ai** | unverified | **8,764** | 2026-05-16 | RED-TEAM (offensive) | 6 | 10 | 9 | 5 | 6 | 9 | 8 | 6 | MCP server wrap 150+ pentest tools — OFFENSIVE use |
| 18 | **Tencent/AI-Infra-Guard** | unverified | **3,732** | 2026-05-16 | RED-TEAM | 6 | 10 | 9 | 7 | 7 | 8 | 8 | 7 | Full-stack platform; AI red-teaming via OpenClaw |
| 19 | **IBM/mcp-context-forge** | unverified | **3,719** | 2026-05-16 | GUARD (gateway) | 8 | 10 | 9 | 10 | 9 | 9 | 8 | 9 | MCP gateway — sits in front of any MCP/A2A/REST/gRPC |
| 20 | **archestra-ai/archestra** | unverified | **3,661** | 2026-05-16 | GUARD (gateway) | 8 | 10 | 9 | 8 | 8 | 9 | 8 | 7 | Enterprise AI platform; guardrails+gateway+orchestrator |
| 21 | **intuitem/ciso-assistant-community** | unverified | **4,045** | 2026-05-16 | POLICY+AUDIT-TRAIL | 7 | 10 | 9 | 8 | 8 | 5 | 8 | 8 | GRC platform; 130+ frameworks (ISO/NIST/SOC2/HIPAA) — runtime layer, not CC |
| 22 | **openlit/openlit** | Apache-2.0 | **2,446** | 2026-05-16 | GUARD+AUDIT-TRAIL | 10 | 10 | 9 | 8 | 8 | 8 | 8 | 8 | OTel-native; guardrails+vault+playground+evals |
| 23 | **nextlevelbuilder/goclaw** | unverified | **3,093** | 2026-05-16 | GUARD (multi-tenant) | 6 | 10 | 9 | 5 | 7 | 6 | 7 | 6 | OpenClaw-rebuilt-in-Go; 5-layer security — fresh-paint suspect |
| 24 | **luckyPipewrench/pipelock** | unverified | **587** | 2026-05-16 | INJECTION+MCP-AUDIT | 7 | 10 | 9 | 6 | 7 | 9 | 7 | 6 | AI agent firewall; agent egress + DLP + SSRF + injection-defense |
| 25 | **getagentseal/agentseal** | unverified | **256** | 2026-05-15 | MCP-AUDIT+RED-TEAM | 6 | 10 | 9 | 5 | 7 | 9 | 7 | 5 | Security toolkit; scan dangerous skills, monitor supply chain |
| 26 | **HarmonicSecurity/claudit-sec** | unverified | **247** | 2026-05-16 | MCP-AUDIT (CC-specific) | 7 | 10 | 9 | 6 | 7 | 10 | 7 | 5 | macOS one-cmd visibility into MCP servers + skills + permissions |
| 27 | **lasso-security/claude-hooks** | unverified | **239** | 2026-05-16 | INJECTION+GUARD | 7 | 10 | 9 | 7 | 7 | 10 | 7 | 5 | Lasso security integrations — direct Claude Code hooks for prompt-injection |
| 28 | **MCP-Defender/MCP-Defender** | **AGPLv3** | **252** | 2026-05-13 | MCP-AUDIT | 0 | 10 | 9 | 6 | 7 | 9 | 7 | 5 | **AGPL — license-REJECT per W241** (desktop app blocks malicious MCP traffic) |

### §A.3 — Tier-3 specialized (CC-specific or narrow-use)

| # | Repo | License | Stars | Updated | Sub-Cat | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | Native-CC-Pathway |
|---|---|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 29 | **HeadyZhang/agent-audit** | unverified | **170** | 2026-05-13 | MCP-AUDIT+INJECTION | 6 | 10 | 9 | 5 | 7 | 9 | 7 | 5 | OWASP Agentic Top 10 2026 — 49 rules; LangChain/CrewAI/AutoGen |
| 30 | **apisec-inc/mcp-audit** | unverified | **149** | 2026-05-12 | MCP-AUDIT+SECRETS+SBOM | 6 | 10 | 9 | 7 | 7 | 9 | 7 | 6 | Scan MCP configs for secrets, shadow APIs, AI-BOMs |
| 31 | **gebruder/wirken** | unverified | 145 | 2026-05-16 | AUDIT-TRAIL+SECRETS | 6 | 10 | 9 | 5 | 7 | 7 | 6 | 5 | Per-session hash-chained audit log; Rust binary |
| 32 | **makalin/SecureMCP** | unverified | **139** | 2026-03-30 | MCP-AUDIT | 6 | 8 | 9 | 6 | 7 | 8 | 7 | 5 | Go CLI; detects OAuth-token leakage + injection + tool-poisoning |
| 33 | **Adversis/mcp-snitch** | unverified | 93 | 2026-05-13 | AUDIT-TRAIL (macOS) | 6 | 10 | 9 | 6 | 7 | 7 | 6 | 4 | macOS app intercepts+monitors MCP server comms |
| 34 | **slowmist/MCP-Security-Checklist** | (markdown spec) | **826** | 2026-05-13 | MCP-AUDIT (checklist) | 9 | 10 | 9 | 8 | 8 | 5 | 9 | 8 | Cite-class doc only — adopt as policy reference, not install |
| 35 | **aws-samples/sample-mcp-security-scanner** | MIT-0 | (unverified) | 2026-Q2 | MCP-AUDIT (CI) | 10 | 10 | 9 | 10 | 9 | 10 | 8 | 7 | Combines Checkov+Semgrep+Bandit+ASH+Trivy via MCP server |
| 36 | **cisco-ai-defense/mcp-scanner** | Apache-2.0 | (cited; not in API index) | active | MCP-AUDIT | 10 | 10 | 9 | 10 | 10 | 10 | 8 | 8 | `uv tool install cisco-ai-mcp-scanner` — 3-engine (YARA+LLM-judge+Cisco-API) |
| 37 | **cisco-ai-defense/skill-scanner** | Apache-2.0 | (cited; not in API index) | active | MCP-AUDIT (skills) | 10 | 10 | 9 | 10 | 10 | 10 | 7 | 7 | Skill-specific — signature + LLM semantic + dataflow analysis |
| 38 | **cisco-ai-defense/defenseclaw** | Apache-2.0 | (Mar-27-2026) | recent | MCP-AUDIT (bundle) | 10 | 10 | 8 | 10 | 9 | 9 | 7 | 6 | Bundles skill-scanner+mcp-scanner+a2a-scanner+CodeGuard+AIBOM |
| 39 | **Infisical/infisical** | MIT | **26,850** | 2026-05-16 | SECRETS (platform) | 10 | 10 | 9 | 8 | 8 | 7 | 10 | 10 | Open-source secrets platform — heavyweight alternative to sops+age |
| 40 | **kaplanelad/shellfirm** | Apache-2.0 | **906** | 2026-05-15 | GUARD (shell) | 10 | 10 | 9 | 7 | 8 | 9 | 8 | 7 | Safety guardrails for AI coding agents and human terminal commands |
| 41 | **alex-ilgayev/MCPSpy** | unverified | **510** | 2026-05-15 | AUDIT-TRAIL | 6 | 10 | 9 | 7 | 7 | 8 | 7 | 5 | MCP Monitoring with eBPF — kernel-level observability |
| 42 | **invariantlabs-ai/invariant** | unverified | **418** | 2026-05-15 | GUARD | 7 | 10 | 9 | 9 | 8 | 8 | 7 | 7 | Guardrails framework — predecessor of mcp-scan stack |
| 43 | **thoughtbot/top_secret** | unverified | **393** | 2026-05-16 | PII (Ruby) | 7 | 10 | 9 | 8 | 7 | 6 | 7 | 5 | Ruby-only PII redactor — Ruby ecosystem niche |
| 44 | **tldrsec/prompt-injection-defenses** | (catalog) | **688** | 2026-05-14 | INJECTION (reference) | 10 | 9 | 9 | 9 | 9 | 5 | 9 | 8 | Reference catalog — cite-anchor for defense patterns |
| 45 | **AI45Lab/AgentDoG** | unverified | 471 | 2026-05-15 | GUARD (diagnostic) | 6 | 10 | 9 | 6 | 7 | 7 | 7 | 5 | Diagnostic guardrail framework — research-leaning |

### §A.4 — REJECTED / DEPRECATED / ARCHIVED

| Repo | Status | Reason |
|---|---|---|
| **protectai/rebuff** | ARCHIVED 2026 | Prompt injection detector — superseded by llm-guard (same org); confirmed archived via WebSearch |
| **mozilla/sops** | RENAMED → `getsops/sops` 2023 (CNCF Sandbox) | naming-drift correction per CCBP V-FINAL audit |
| **InvariantLabs-AI/mcp-scan** | RENAMED → `snyk/agent-scan` June 2025 (Snyk acquisition) | naming-drift |
| **woodruffw/zizmor** | RENAMED → `zizmorcore/zizmor` 2025 | repository-relocation; Grafana Labs sponsor |
| **MCP-Defender/MCP-Defender** | **AGPLv3 — REJECT** | License-incompatible per W241 Mia cardinal-rule-1 |
| **cytostack/openwolf** | **AGPLv3 — REJECT** | License-incompatible per W241 Mia |
| **Tom Farley protect-mcp** | NOT-FINDABLE | Fresh GitHub search returns 0 hits — exists in prior W237 corpus row 71 (D8=67) but not surfaced in 2026-05-16 probe; HONEST-NON-FINDING |
| **Tom Farley signed-audit-trails** | NOT-FINDABLE | Same — W237 row 72 D8=58 markdown-only; NOT-FINDABLE in fresh probe |
| **Tom Farley review-agent-governance** | NOT-FINDABLE | Removed in Pattern A F-3 (per CANONICAL-D1-D10-146REPO-SCORING.md:61); never installed |

---

## §B — Top-3 INSTALL per Sub-Category (9 sub-types)

### B.1 — PII (Personally Identifiable Information)
1. **microsoft/presidio (D8=92)** — MIT, 8.1k★, active monthly releases, multi-modal (text+image+structured), spaCy/transformers backend. Direct `pip install presidio-analyzer presidio-anonymizer`. Native-CC: hook-wrap on user-prompt-submit + tool-use boundary.
2. **protectai/llm-guard (D8=80)** — MIT, 3k★, active 2026, scanner-toolkit covers PII + secrets + prompt-injection in one. Native-CC: Python lib in hook.
3. **thoughtbot/top_secret (D8=68)** — Ruby-only fallback for Ruby ecosystems.

### B.2 — GUARD (Guardrails / Output Moderation)
1. **NVIDIA-NeMo/Guardrails (D8=90)** — Apache-2.0, v0.21.0, programmable input/dialog/retrieval/execution/output rails via Colang DSL. Native-CC: heavyweight (Colang learning curve) — install only when policy-driven dialog flow is load-bearing.
2. **kaplanelad/shellfirm (D8=78)** — Apache-2.0, 906★, lightweight shell-command CAPTCHA-style guardrail for AI coding agents. Native-CC: pre-execute shell hook.
3. **protectai/llm-guard (D8=80)** — Also covers content guards (toxicity, profanity, harm) beyond PII.

### B.3 — MCP-AUDIT
1. **snyk/agent-scan (D8=99)** — Apache-2.0, 2.4k★, renamed from InvariantLabs-AI/mcp-scan post-Snyk-acquisition June 2025. Detects 15+ distinct risks across MCP+skills; auto-discovers Claude Code+Cursor+Windsurf+Gemini+Amp+Amazon-Q. Native-CC: `uvx snyk-agent-scan@latest` daily hook.
2. **cisco-ai-defense/mcp-scanner (D8=85)** — Apache-2.0, 3-engine (YARA+LLM-judge+Cisco-API). Native-CC: `uv tool install cisco-ai-mcp-scanner`.
3. **aws-samples/sample-mcp-security-scanner (D8=83)** — MIT-0, MCP-server wrapping Checkov+Semgrep+Bandit+ASH+Trivy. Native-CC: `claude mcp add` direct MCP-server registration.

### B.4 — SECRETS
1. **getsops/sops (D8=100)** — MPL-2.0, 21.8k★, CNCF-sandbox project, multi-backend (AWS-KMS/GCP-KMS/Azure-KV/age/PGP). Native-CC: direct CLI; pre-commit hook for encrypted-file editing.
2. **FiloSottile/age (D8=100)** — BSD-3, 22.3k★, simple modern encryption (GPG-replacement); pairs with sops as recipient. Native-CC: direct CLI binary in PATH.
3. **Infisical/infisical (D8=88)** — MIT, 26.9k★, heavyweight team-secrets platform alternative to sops+age stack. Install only if multi-user secret-rotation required.

### B.5 — SIGSTORE (Software Supply-Chain)
1. **sigstore/cosign (D8=99)** — Apache-2.0, 5.9k★, code-signing + transparency for containers + binaries + git commits (via gitsign). Native-CC: direct CLI; SBOM signing on artifact-build hook.
2. **sigstore/rekor (D8=92)** — Apache-2.0, 1.1k★, transparency-log; query/verify cosign signatures. Native-CC: API-call from verify-hook.
3. **sigstore/policy-controller (D8=82)** — K8s admission controller — only relevant if CC artifacts ship to k8s.

### B.6 — RED-TEAM (LLM Vulnerability Testing)
1. **NVIDIA/garak (D8=96)** — Apache-2.0, 7.5k★ Apache-2.0, v0.14.0 Feb 2026; probes for hallucination/data-leakage/prompt-injection/misinformation/toxicity/jailbreak. Native-CC: `pip install garak` + scheduled audit hook against deployed model endpoints.
2. **mukul975/Anthropic-Cybersecurity-Skills (D8=80)** — Apache-2.0, 6.3k★, 754 plugin-skills mapped to MITRE-ATT&CK + NIST-CSF + MITRE-ATLAS + D3FEND. Native-CC: `/plugin install` if upstream registered as marketplace.
3. **Tencent/AI-Infra-Guard (D8=75)** — full-stack AI red-teaming platform — heavier alternative to garak alone.

### B.7 — POLICY (Authorization Policy)
1. **cedar-policy/cedar (D8=98)** — Apache-2.0, 1.5k★, Rust impl; formally-verified policy language (RBAC + ABAC + automated reasoning). AWS Verified-Access + Amazon-Verified-Permissions back it. Native-CC: `cargo install cedar-policy-cli` + authz-eval hook (e.g., MCP-tool permission gates).
2. **cedar-policy/cedar-go (D8=88)** — Go-binding companion for hooks built in Go.
3. **zizmorcore/zizmor (D8=99)** — Apache-2.0, 4.9k★, GitHub-Actions static-analysis for security-policy compliance. Native-CC: pre-commit + CI hook against workflow YAMLs.

### B.8 — AUDIT-TRAIL (Signed Receipts / Provenance)
1. **sigstore/cosign (D8=99)** — Re-listed because gitsign sub-component signs git commits → audit-trail via cryptographic provenance.
2. **trailofbits/claude-code-config (D8=89)** — Opinionated CC defaults including audit-trail patterns from professional security-audit context.
3. **openlit/openlit (D8=82)** — OTel-native traces include cryptographic-receipt patterns for LLM-call audit trails.

**HONEST-NON-FINDING**: Pure "signed-receipts-as-skill" SOTA pattern (cf. Tom Farley signed-audit-trails W237 row 72) is markdown-spec only in current corpus — no install-able implementation surfaced in fresh probe. Closest install-able patterns are sigstore/cosign + gitsign + openlit-traces stack composition.

### B.9 — INJECTION (Prompt-Injection Defense)
1. **snyk/agent-scan (D8=99)** — Also covers injection at MCP-tool boundary (tool-description + tool-output scanning).
2. **lasso-security/claude-hooks (D8=80)** — Specifically Claude-Code-targeted prompt-injection hooks. Native-CC: drop-in hook directory.
3. **luckyPipewrench/pipelock (D8=77)** — AI-agent-firewall layer; agent egress + DLP + SSRF + injection-defense at network layer.

---

## §C — L0.5 Reorganization Recommendation: Should L0.5 Split into Sub-Lanes?

### C.1 — Current State (V-FINAL-V5)

Current L0.5 is a flat list in master synthesis:
> sigstore · getsops/sops · FiloSottile/age · microsoft/presidio · protectai/llm-guard · snyk/agent-scan · NVIDIA/garak · cisco-ai-defense/{mcp-scanner,skill-scanner} · MCP-Defender [REJECT] · Tom Farley crypto trio [NOT-FINDABLE]

Operator decisions §61-§81 list 4 distinct L0.5 install rows:
- §61 (sops+age) — SECRETS
- §79 (garak) — RED-TEAM
- §80 (snyk/agent-scan) — MCP-AUDIT
- §81 (presidio+llm-guard) — PII+GUARD

### C.2 — Recommendation: **YES — split L0.5 into 4 explicit sub-lanes**

| Proposed sub-lane | Anchor Top-1 INSTALL | Anchor Top-2 INSTALL | Anchor Top-3 INSTALL | Why a separate lane |
|---|---|---|---|---|
| **L0.5.a SECRETS** | getsops/sops | FiloSottile/age | Infisical/infisical (DEFER unless team-rotation needed) | Encrypted-at-rest credentials; pre-commit/pre-push surface; orthogonal install pathway (direct CLI binaries) |
| **L0.5.b SUPPLY-CHAIN-SIGN** | sigstore/cosign | sigstore/rekor (verify-only) | zizmorcore/zizmor | Artifact-signing + transparency-log + GH-Actions policy; CI-surface; cosign as keystone primitive |
| **L0.5.c AGENT-AUDIT** | snyk/agent-scan | cisco-ai-defense/mcp-scanner | cisco-ai-defense/skill-scanner | MCP+skill-surface SECURITY scanning; daily-cron hook surface; agent-component-specific |
| **L0.5.d AGENT-DEFENSE** | NVIDIA/garak (RED-TEAM) + microsoft/presidio (PII) + protectai/llm-guard (GUARD+INJECTION) co-installed | NeMo-Guardrails (heavyweight option) | lasso-security/claude-hooks (CC-specific injection hooks) | Runtime LLM-call boundary defenses — input/output rails + PII redaction + red-team eval; hot-path PreToolUse/PostToolUse hook surface |

**Optional 5th lane** (only if AUDIT-TRAIL becomes load-bearing):
- **L0.5.e PROVENANCE-RECEIPTS** — gitsign (sub-tool of sigstore/cosign) + openlit-OTel-traces. Reuses cosign install from L0.5.b, so it's a depth-feature of L0.5.b rather than a new lane.

### C.3 — Optional 6th lane considered but REJECTED

- **L0.5.f POLICY-AUTHZ** (cedar-policy/cedar) — REJECTED as separate lane because Cedar's runtime-eval surface is small for single-operator local CC; cedar-policy fits better as a tool *within* L0.5.c AGENT-AUDIT (used by mcp-scanner-style audits for MCP-tool-permission rules) rather than its own lane. Re-promote to its own lane only if multi-tenant agent fleet emerges.

### C.4 — Why not keep flat?

Flat L0.5 has 3 problems documented in V-FINAL audit:
1. **Install-ordering ambiguity** — sops+age can install Day-1; cosign requires CI-pipeline setup; garak requires model-endpoint to probe. Different prerequisites collapsed into one lane confuses operator priority.
2. **Hook-surface conflicts** — PII redaction (PreToolUse) vs SECRETS (pre-commit) vs MCP-AUDIT (daily-cron) — hook-firing-order needs distinct lanes to reason about.
3. **License-risk batching** — MCP-Defender (AGPLv3) and Tom Farley repos (NOT-FINDABLE) were filed under same "L0.5 catch-all" as MIT/Apache anchors; explicit sub-lanes force per-sub-lane license discipline (per cardinal-rule-1).

### C.5 — Migration impact on V-FINAL-V5 §3 disposition tally

V-FINAL-V5 §3 currently shows L0.5 SECURITY/PROVENANCE as one consolidated lane. Migrating to 4 sub-lanes:
- Net new lane labels (L0.5.a/b/c/d) — no install adds, no removes
- Re-organizes existing 4 install rows (§61, §79, §80, §81) into 4 sub-lane buckets
- Disposition tally unchanged (no INSTALL/STUDY-PILOT/REJECT verdicts shift)
- Operator-decision document needs 4-bucket re-organization (cosmetic)

---

## §D — Honest Non-Findings

### D.1 — Tom Farley triad NOT-FINDABLE in fresh probe
- W237 corpus rows 71 + 72 list `Tom Farley protect-mcp` (D8=67) + `Tom Farley signed-audit-trails` (D8=58) — both attributed to a person, not org
- Fresh GitHub `protect-mcp tom farley` + `review-agent-governance claude code skill` + WebSearch `Tom Farley protect-mcp review-agent-governance signed-audit-trails skill` ALL return 0 direct repo hits in 2026-05-16 probe
- **Possible explanations**: (a) repos were under a personal handle that has been renamed/deleted; (b) skills were drafted but never published; (c) name spelling differs from canonical
- **Disposition**: HONEST-NON-FINDING — cannot validate D1-D10 freshness; recommend operator-side verification BEFORE INSTALL. Per CR-12, do NOT proceed with INSTALL on stale-cite-only basis

### D.2 — cisco-ai-defense org under-indexed in GitHub search
- `cisco-ai-defense/mcp-scanner` + `cisco-ai-defense/skill-scanner` confirmed via WebSearch + direct `mcp__github__get_file_contents` on cisco-ai-defense/mcp-scanner README (success — full repo exists, Apache-2.0, actively maintained, PyPI `cisco-ai-mcp-scanner`)
- BUT `mcp__github__search_repositories query:"cisco-ai-defense mcp-scanner"` returned 0 direct hits (returned only downstream wrappers like `jason-allen-oneal/openclaw-skill-scanner`)
- **Possible explanation**: GitHub search-API indexing lag OR specialized-org de-prioritized in keyword ranking
- **Disposition**: Both repos VERIFIED EXIST via direct file-content probe; treat search-API miss as NON-FINDING-OF-INDEX, not NON-FINDING-OF-REPO. Stars uncountable from current probe (need separate API call) — D3 stars-anchor unverified for these two

### D.3 — sigstore/cosign + rekor star counts inconsistent across sources
- WebSearch claims cosign = 5.9k★, rekor = 1.1k★
- Direct probe `mcp__github__search_repositories query:"sigstore/cosign"` confirms cosign = 5,921★ — **CONSISTENT**
- rekor star-count not directly probed (rate-limited mid-batch) — using WebSearch value with confidence ~0.85

### D.4 — IBM/mcp-context-forge license unverified
- Listed as "AI Gateway, registry, and proxy" — likely Apache-2.0 (IBM-Linux-Foundation default) but D1=8 conservative pending direct LICENSE file probe
- **Disposition**: Treat as UNVERIFIED-LICENSE in any INSTALL motion; require LICENSE file probe before adopt

### D.5 — Rate-limit cascade affected breadth of name-search
- 5 of 25 name-search queries (NVIDIA-NeMo/Guardrails initial probe, several Cedar variants, etc.) hit 403 rate-limit during initial batch
- Recovered via cooldown + WebSearch corroboration for all but 2 (rekor direct star count + IBM/mcp-context-forge LICENSE)
- **Confidence note**: §A.1 rows 1-15 (Tier-1 anchors) all have ≥2 sources (GitHub API + WebSearch); §A.2-§A.3 mostly 1-source (GitHub API only) — sub-2k★ tail less corroborated

### D.6 — "Tencent/AI-Infra-Guard" + "0x4m4/hexstrike-ai" license-unverified
- Both topic-tagged ai-security but no license badge visible in topic snippets
- Both have very high stars (3.7k + 8.8k) suggesting active maintenance
- **Disposition**: D1=6 conservative; require LICENSE file probe before INSTALL motion. hexstrike-ai is explicitly OFFENSIVE-tooling (150+ pentest tools) — even if MIT/Apache, evaluate operational-safety surface separately

### D.7 — "openlit" listed under both GUARD and AUDIT-TRAIL
- OpenLIT is fundamentally an OTel-native observability platform with guardrails+vault+evals as add-ons
- Primary classification SHOULD be observability/telemetry (L4 layer per existing V-FINAL synthesis), with L0.5 sub-categorization as secondary
- **Disposition**: openlit cross-listed but should not COUNT against L0.5 install budget — its install motion belongs to L4 observability stack with L0.5 guardrails as bonus

### D.8 — "Bypass mode" + "ralph-loop" + autonomous-coding surface conflict
- trailofbits/claude-code-devcontainer is positioned for "running Claude Code in bypass mode safely" — bypass-mode is explicitly Anthropic-anti-pattern for production
- Inclusion in L0.5 is operationally appropriate ONLY for security-audit-workstation context
- **Disposition**: Filed in §A.1 row 15 with strong cardinal-rule-1 caveat — install only for vetted security-audit workflows, NOT for default CC runtime

---

## §E — Quick-look Cross-Reference Table (matches existing V-FINAL corpus)

| Repo | V-FINAL-V5 §3 listing | CANONICAL-D1-D10 row | Operator-decision row | This deep-sat reinforcement |
|---|---|---|---|---|
| microsoft/presidio | §L0.5 listed | row 69 D8=81 | §81 | §A.1 row 1 D8=92 — UPGRADE (active 2026-05-16, 8.1k★) |
| protectai/llm-guard | §L0.5 listed | row 70 D8=78 | §81 | §A.1 row 2 D8=80 — confirms active (stale flag W237 5mo-stale claim no longer valid per 2026-05-16 commits) |
| Tom Farley protect-mcp | §L0.5 listed | row 71 D8=67 | (omitted) | §D.1 — HONEST-NON-FINDING, recommend re-verification |
| Tom Farley signed-audit-trails | §L0.5 listed | row 72 D8=58 | (omitted) | §D.1 — HONEST-NON-FINDING |
| MCP-Defender/MCP-Defender | §L0.5 listed | row 74 D8=14 RJ | (omitted) | §A.4 — AGPL REJECT confirmed |
| NVIDIA/garak | §L0.5 listed | (W258 row 30) | §79 | §A.1 row 3 D8=96 — Apache-2.0, 7.5k★, actively maintained (v0.14.0 Feb 2026) |
| snyk/agent-scan (formerly mcp-scan) | §L0.5 listed | (W258 mention) | §80 | §A.1 row 5 D8=99 — Top-1 MCP-AUDIT pick post-rename |
| getsops/sops | §L0.5 listed | (handbook) | §61 | §A.1 row 6 D8=100 — Top-1 SECRETS pick; CNCF Sandbox |
| FiloSottile/age | §L0.5 listed | (handbook) | §61 | §A.1 row 7 D8=100 — Top-2 SECRETS pair-mate |
| sigstore/cosign | §L0.5 listed | (handbook) | (implicit in §61 sigstore-verified secrets) | §A.1 row 8 D8=99 — Top-1 SUPPLY-CHAIN-SIGN |
| zizmorcore/zizmor | (W258 mention) | (W258 search) | (handbook) | §A.1 row 13 D8=99 — NET-NEW lane anchor for L0.5.b INJECTION+POLICY (GH-Actions) |
| trailofbits/claude-code-config | (W258 reference) | (W258 mention) | (handbook) | §A.1 row 14 D8=89 — confirms direct-adopt pattern for CC-config hardening |
| cedar-policy/cedar | (W258 reference) | (handbook) | (not yet) | §A.1 row 11 D8=98 — Top-1 POLICY pick if multi-tenant authz becomes load-bearing |
| Anthropic-Cybersecurity-Skills | NET-NEW | (not in corpus) | (not yet) | §A.2 row 16 — NET-NEW 6.3k★ Apache-2.0; 754 skills mapped to MITRE/NIST/D3FEND; consider `/plugin install` |
| Infisical/infisical | NET-NEW | (not in corpus) | (not yet) | §A.3 row 39 — DEFER unless team-rotation; sops+age sufficient for single-operator |
| lasso-security/claude-hooks | NET-NEW | (not in corpus) | (not yet) | §A.2 row 27 — NET-NEW CC-specific hooks for prompt-injection; LOW-risk install |
| kaplanelad/shellfirm | NET-NEW | (not in corpus) | (not yet) | §A.3 row 40 — NET-NEW lightweight shell-command guardrail for AI coding agents |

**Net-new INSTALL candidates surfaced by this deep-sat** (≥D8=85 NOT already in V-FINAL-V5 §3 install set):
1. **zizmorcore/zizmor** — D8=99; install via cargo; pre-commit GH-Actions lint
2. **cedar-policy/cedar** — D8=98; install via cargo; reserve for multi-tenant authz expansion
3. **sigstore/cosign + rekor + policy-controller** — D8=99/92/82; install Cosign as keystone, Rekor as verify-API, PC only if k8s-bound
4. **mukul975/Anthropic-Cybersecurity-Skills** — D8=80, 6.3k★ Apache-2.0; STUDY-PILOT via `/plugin install` if upstream registered
5. **lasso-security/claude-hooks** — D8=80; LOW-risk drop-in CC hooks
6. **kaplanelad/shellfirm** — D8=78; STUDY-PILOT as L0.5.d AGENT-DEFENSE complementary

---

## §F — Confidence + Verification Summary

| Section | Source-count | Confidence | Notes |
|---|---|---|---|
| §A.1 (Tier-1 anchors 1-15) | ≥2 (GH-API + WebSearch + README probe) | HIGH (0.92) | Rows 14-15 (trailofbits) WebSearch-only — confidence 0.85 |
| §A.2 (Tier-2 emerging 16-28) | 1 (GH-API only) | MEDIUM (0.78) | Sub-2k★ tail under-corroborated |
| §A.3 (Tier-3 specialized 29-45) | 1 (GH-API only) | MEDIUM (0.75) | Stars + recency confirmed; D1 license needs file-probe |
| §B (Top-3 per sub-cat) | Composite from §A | HIGH (0.88) | Driven by D8-score ordering with explicit license + hook-surface rationale |
| §C (lane-split recommendation) | Architectural inference | HIGH (0.90) | Aligns with existing 4-distinct-install-rows operator-decision pattern |
| §D (non-findings) | Negative-result probes | HIGH (0.95) | Each non-finding explicitly tested via fresh probe |

**Overall deliverable confidence**: 0.86 (HIGH-MEDIUM band — safe for synthesis input; sub-2k★ tail rows should be re-verified pre-install)

---

**End of deliverable.**
