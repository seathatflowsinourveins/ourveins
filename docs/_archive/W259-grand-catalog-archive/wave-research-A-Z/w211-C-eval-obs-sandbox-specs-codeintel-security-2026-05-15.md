---
title: W211 Agent C — L9-L14 + L16 SOTA Convergence (Eval + Obs + Sandbox + Specs + Code-Intel + Security + Skill-Cat)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (W211 Fire 1; dispatch id a9bd3252c77326862)
dispatch_mode: Sonnet stand-in via Anthropic SDK — STAND-IN-NOTICE (NOT real GPT-5.5)
scope: L9 evals + L10 observability + L11 sandbox + L12 specs/scaffolding + L13 code-intel + L14 security + L16 skill/plugin catalogs
inspiration: NONE (W207/W210 not found this fire — built from scratch)
output_budget: 1500 LOC max
cross_model_gate: NOT-satisfied (stand-in); Fire 3 Path P required
---

# W211 Agent C — L9-L14 + L16 SOTA Convergence Report

## STAND-IN-NOTICE (Disclosure per cross-model-consensus.md §Env-funneled disclosure)

This dispatch ran as **Sonnet stand-in via Anthropic SDK** (NOT real GPT-5.5 via codex CLI subprocess). Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: cross-model gate NOT structurally satisfied for this dispatch. Orchestrator should treat this as a TIER-3 evidence-trail and either (a) re-fire via real GPT-5.5 BRIDGE-MODE codex-rescue for validation, OR (b) accept stand-in verdict with documented gate-bypass rationale in commit body.

## §0 — Universe scored (7 layers × ~5 candidates = ~38 unique repos)

### L9 — Evaluation (5 picks)

| repo | stars | license | named-T1 | Axis1 | Axis3 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|---|---|
| promptfoo/promptfoo | 21,283 | MIT | PromptFoo Inc. (named by OpenAI+Anthropic README) | PASS | STABLE-BURN-IN 1090d+ | 2 | **A** | YAML declarative; CI/CD-native; 500+ red-team vectors |
| **langfuse/langfuse** | 27,267 | MIT | Langfuse Inc. YC W23 | PASS | STABLE-BURN-IN 724d+ | 3 | **A+** | OTel-native; tracing+metrics+evals+prompt-mgmt+playground+datasets UNIFIED |
| confident-ai/deepeval | 15,446 | Apache-2.0 | Confident AI | PASS (50+ metrics) | STABLE-BURN-IN 1010d+ | 2 | **A** | Broadest metric library + G-Eval framework |
| Arize-ai/phoenix | 9,689 | Elastic v2 | Arize AI / OpenInference org | PASS | STABLE-BURN-IN 1283d+ | 3 | **A** | OTel-native; 2.5M+/mo downloads; most-installed OSS LLM obs |
| Kiln-AI/Kiln | 4,828 | MIT | Chesterfield Labs | borderline | STABLE-BURN-IN 663d+ | 4 | **B+** | All-in-one workbench: eval+RAG+fine-tune+synthetic |

**L9 TOP-2 STACK**: **langfuse** (PRIMARY unified eval+obs+prompt-mgmt) + **promptfoo** (SECONDARY CI red-team)

### L10 — Observability/Tracing (5 picks)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| langfuse/langfuse | (L9 dual) | MIT | Langfuse Inc. | 3 | **A+** | (see L9) |
| **openlit/openlit** | 2,441 | Apache-2.0 | OpenLIT Inc. | 2 | **A** | OTel-native; 50+ integrations including Claude Agent SDK; one-line install |
| traceloop/openllmetry | 7,108 | Apache-2.0 | Traceloop Inc. (donating to OTel SIG) | 2 | **A-** | Pure OTel SDK; vendor-neutral substrate |
| Arize-ai/openinference | 971 | Apache-2.0 | Arize AI | 2 | **A-** | OTel SIG-aligned; 16+ instrumentation packages; MCP-aware |
| Arize-ai/phoenix | (L9 dual) | Elastic v2 | Arize | 3 | **A** | (see L9) |
| pydantic/logfire | 4,246 | MIT (SDK; server closed) | Pydantic team | 3 | **B+** | Strongest Python ergonomics; closed-source server limits self-host |
| AgentOps-AI/agentops | 5,551 | MIT | AgentOps Inc. | 3 | **B+** | Replay-focused; CrewAI/AG2 native; SaaS-first |
| Helicone/helicone | high | Apache-2.0 | Helicone Inc. YC | 3 | **B+** | AI Gateway + observability dual function; 100+ models |

**L10 TOP-2 STACK**: **openlit** (one-line PRIMARY; Claude Agent SDK native; docker self-host) + **traceloop/openllmetry** (vendor-neutral OTel substrate)

### L11 — Sandbox/Execution (5 picks)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| **e2b-dev/e2b** | high | Apache-2.0 | E2B Inc. (Fortune 500 ~50%) | 3 | **A+** | Firecracker microVMs <200ms boot; cloud + self-host |
| daytonaio/daytona | high | Apache-2.0 | Daytona Inc. | 3 | **A** | 90ms fastest sandbox creation; native Git+LSP+computer-use |
| **superradcompany/microsandbox** | ~4,700 | Apache-2.0 | Superrad Co. YC + libkrun upstream | 4 | **A** | Self-hosted libkrun microVM <100ms boot; OCI-compatible; ships `microsandbox-mcp` |
| Modal Labs (modal-com/modal) | high (inferred) | Apache-2.0 | Modal | 3 | **A-** | Data/GPU-heavy workloads; zero-ops scaling |
| restyler/awesome-sandbox | medium | curated | restyler | 1 cite-only | **B+** | Reference catalog: microVMs/gVisor/V8/WASM/containers |

**L11 TOP-1 STACK + MCP**: **e2b** (cloud-easy PRIMARY) OR **microsandbox** (self-host PRIMARY; ships matching MCP server `microsandbox-mcp`)

### L12 — Specs/Scaffolding (5 picks)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| **github/spec-kit** | high | MIT | GitHub / Microsoft | 2 | **A+** | Canonical SDD from GitHub; `--integration claude --integration-options="--skills"` mode |
| **bmad-code-org/BMAD-METHOD** | 43,000+ | MIT | BMad Code LLC | 3 | **A** | 12+ specialized agents (PM/Architect/Dev/QA/UX); scale-adaptive |
| eyaltoledano/claude-task-master | high | MIT-Commons-Clause | Hamster Inc. | 2 | **A** | MCP server canonical; task/tag/workstream-aware; multi-provider |
| wshobson conductor plugin | (in wshobson) | MIT | wshobson | 2 | **A** | Context-driven dev; TDD-native; semantic-revert |
| wshobson agent-teams plugin | (in wshobson) | MIT | wshobson | 2 | **A** | 7 team presets for parallel workflows |

**L12 TOP-2 STACK**: **github/spec-kit** (skill-mode PRIMARY) + **BMAD-METHOD** OR **claude-task-master** (SECONDARY)

### L13 — Code Intelligence (5 picks)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| **abhigyanpatwari/GitNexus** | 14,000 | PolyForm-NC | Akon Labs / @abhigyanpatwari | 2 | **A+** | Deepest CC integration: MCP tools + 4 skills + PreToolUse hooks + 14 languages |
| ast-grep/ast-grep | high | MIT | @HerringtonDarkholme | 1 | **A** | Tree-sitter structural search; 14 languages |
| **semgrep/semgrep** | high | LGPL-2.1 | Semgrep Inc. | 2 | **A** | CC plugin marketplace official; SAST+SCA+secrets; PreToolUse hooks |
| mcp__deepwiki__ (assumed) | n/a MCP | n/a | DeepWiki | 1 | **A-** | AI-powered repo Q&A |
| mcp__repomix__ (assumed) | n/a MCP | n/a | Repomix | 1 | **A-** | Codebase packing for cross-file analysis |

**L13 TOP-2 STACK**: **GitNexus** (PRIMARY zero-config; verify PolyForm-NC license fit) + **ast-grep** (SECONDARY universal AST)

### L14 — Security/Supply-Chain (5 picks)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| **sigstore/cosign** | high | Apache-2.0 | Sigstore / Linux Foundation / Chainguard / Red Hat | 2 | **A+** | Canonical supply-chain signing; OIDC keyless via Fulcio + Rekor |
| cisco-ai-defense/mcp-scanner | medium | Apache-2.0 | Cisco AI Defense | 3 | **A** | Multi-engine MCP scanner; YARA+LLM+Cisco API; CI/CD-friendly |
| gitleaks/gitleaks | high | MIT | Gitleaks / Zricethezav | 1 | **A** | Lightweight regex secret scanner; pre-commit native |
| **trufflesecurity/trufflehog** | high | AGPL-3.0 | Truffle Security Co. | 1 | **A+** | 800+ secret detectors with ACTIVE validation; CAVEAT: AGPL |
| semgrep/semgrep | (L13 dual) | LGPL-2.1 | Semgrep Inc. | 2 | **A** | (see L13) |

**L14 TOP-3 STACK**: **gitleaks + trufflehog combo** (PRIMARY secrets) + **sigstore/cosign** (PRIMARY supply-chain) + **cisco-ai-defense/mcp-scanner** (PRIMARY MCP-server-audit)

### L16 — Skill/Plugin Catalogs (5 picks)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| **anthropics/claude-plugins-official** | high | mixed per-plugin | Anthropic OFFICIAL | 1 | **A+** | OFFICIAL marketplace; 55+ curated plugins; auto-available |
| **obra/superpowers** | 94,000+ | MIT | Jesse Vincent / Prime Radiant | 2 | **A+** | Complete SDD methodology; accepted into official marketplace |
| **wshobson/agents** | high | MIT | William Shobson | 2 | **A+** | Largest CC marketplace: 80 plugins / 185 agents / 153 skills / 100 commands |
| anthropics/skills | high | Apache-2.0 | Anthropic OFFICIAL | 1 | **A** | Official skill examples + spec + template |
| hesreallyhim/awesome-claude-code | 43,834 | CC-BY-NC-ND-4.0 | community | 1 cite-only | **A** | Largest CC awesome-list: 226 resources |

**L16 TOP-3 STACK**: **anthropics/claude-plugins-official** + **anthropics/skills** (foundation) + **obra/superpowers** (workflow) + **wshobson/agents** (broadest ecosystem)

## §1 — Cross-cutting observations

### A. Multi-org convergence on OpenTelemetry as universal substrate (Axis 1 firm)
Datadog/Honeycomb/New Relic + LangChain/CrewAI/AutoGen all emit OTel-compliant spans. **L10 install MUST use OpenTelemetry-native tools.** openlit/openllmetry/Phoenix/Langfuse/Logfire all OTel-native.

### B. Spec-Kit + skill-mode is canonical CC-native SDD (Axis 1+2+3 firm)
GitHub Spec-Kit ships `--integration-options="--skills"` flag installing `speckit-*` skills as CC agent skills. Spec-Kit + BMAD + Task-Master all converge on this pattern.

### C. License compatibility caveats
- **trufflehog** AGPL-3.0 limits closed-source enterprise embedding (CLI use fine)
- **GitNexus** PolyForm Noncommercial — OK personal/research/internal; commercial requires Akon Labs license
- **awesome-claude-code** CC-BY-NC-ND-4.0 — cite-only

### D. Sandbox MCP-server pattern (matching microsandbox)
microsandbox ships matching MCP `microsandbox-mcp` (`claude mcp add --transport stdio microsandbox -- npx -y microsandbox-mcp`). **SOTA pattern for sandbox-MCP integration.** E2B/Daytona lack official matching MCP (community impls exist).

### E. Security stack convergence (Axis 1+2+3 firm)
Cosign (Sigstore) + Gitleaks/Trufflehog + Semgrep/MCP-scanner is SOTA security stack.

## §2 — RECOMMENDED PURE-RUNTIME INSTALL ORDER

```
L9+L10:  langfuse (eval+obs unified)  +  openlit (one-line tracing SDK)  +  openllmetry (vendor-neutral substrate)
L11:     microsandbox + microsandbox-mcp (self-host)  OR  e2b (cloud-easy)
L12:     github/spec-kit (--skills)  +  BMAD-METHOD  OR  claude-task-master
L13:     GitNexus (zero-config)  +  ast-grep
L14:     gitleaks + trufflehog + cosign + cisco-ai-mcp-scanner
L16:     anthropics/claude-plugins-official + anthropics/skills + obra/superpowers + wshobson/agents
```

### Install order TLDR

1. `/plugin install superpowers@claude-plugins-official`
2. `/plugin marketplace add wshobson/agents` + selective `/plugin install ...@claude-code-workflows`
3. `/plugin marketplace add anthropics/skills` + `/plugin install example-skills@anthropic-agent-skills`
4. `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@<latest>` + `specify init . --integration claude --integration-options="--skills"`
5. `pip install openlit langfuse promptfoo deepeval` + langfuse docker compose self-host
6. `npm i microsandbox` + `claude mcp add --transport stdio microsandbox -- npx -y microsandbox-mcp`
7. `npx gitnexus analyze` + `npm install -g @ast-grep/cli`
8. `brew install gitleaks trufflehog cosign` + `uv tool install cisco-ai-mcp-scanner` + `/plugin marketplace add semgrep/mcp-marketplace`

## §3 — Cite trail (TIER-1-DIRECT pinned anchors all VERIFIED 2026-05-15)

- e2b-dev/e2b @ SHA 70f0d833f5ab9c2e3c3eb10115744f85376bedf4
- github/spec-kit @ SHA 13c167e107c2406432fdb6619539482e9fca975b
- microsandbox @ SHA cf1800f47a766c494ac4c7ae175aaf590807a3ce
- microsandbox-mcp @ SHA 9dc31479e04087a4eb65ae81e38f363d115f1784
- daytonaio/sdk @ SHA e38e6a5ec55651fee4c9cb74067d40824ecd0013
- bmad-code-org/BMAD-METHOD @ SHA 5090cfb09617eeb9c5fb547d4d10529d9886adcd
- eyaltoledano/claude-task-master @ SHA 1bf67c568b7943b01b17263f7ac6226b4c63123f
- cisco-ai-defense/mcp-scanner @ SHA 6915d44de089cfe4f80b9b28867e02d453bb13d1
- ast-grep/ast-grep @ SHA 504d24e820e460b23fc36084f33b270737c1053d
- semgrep/semgrep @ SHA b3173abf26abb2f850807731959989b25eb8f8ea
- sigstore/cosign @ SHA 4dcb7060f483283eeb80075735f6c7325ad9ef24
- gitleaks/gitleaks @ SHA 214506f571dc5ac7b06fc16123cf524659b67655
- trufflesecurity/trufflehog @ SHA 20f309afec1e155e12d5c22a71f7e7f958199313
- anthropics/claude-plugins-official marketplace @ SHA 29e2bfe6089ff48a4a501b9d3827b8fcbd781013
- openlit/openlit @ SHA 4d1f381dfefd25bfafea2b9bfc672f60eb7a3aa4
- obra/superpowers @ SHA ea17e30e0a31f4a0b1079007b88384e29ec03b62
- wshobson/agents @ SHA 035d11c52ad8131933f4e1eed5980857cd0c7d1e
- abhigyanpatwari/GitNexus @ SHA e08c0eb7d5caca7a01f5ec7472ea6ac59cbac03d

## §4 — HONEST-NON-FINDINGS

1. **No W207/W210 prior artifacts found** — researched from scratch
2. **GitHub API rate-limit hit mid-research** — recovered via WebFetch + direct repo lookups
3. **Daytona main repo** — could not directly fetch monorepo README; used daytonaio/sdk + curated web sources
4. **No matching MCP server for E2B/Daytona** — only microsandbox ships official `microsandbox-mcp`
5. **Logfire server is closed-source** — SDK MIT but observability backend requires enterprise license OR cloud SaaS

SYNTHESIS COMPLETE
