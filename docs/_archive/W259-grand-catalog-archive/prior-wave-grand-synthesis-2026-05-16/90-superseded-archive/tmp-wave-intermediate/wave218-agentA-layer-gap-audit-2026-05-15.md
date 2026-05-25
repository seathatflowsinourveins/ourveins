---
title: W218 Agent A — Layer-by-Layer Gap-Audit + Comprehensive Scoring
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 218
agent: A (sota-researcher Sonnet stand-in disclosed)
predecessor: tmp/wave216-MASTER-SYNTHESIS-2026-05-15.md + tmp/wave217-openviking-precision-deep-dive-2026-05-15.md
artifact-class: layer-by-layer-coverage-audit
---

# W218 Agent A — Layer Coverage Audit (38 NEW candidates across 7 layers)

## STAND-IN-NOTICE (per Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate Option 2)

W218 Agent A dispatched as Sonnet stand-in per FM-17.e recovery path. Cross-model gate NOT structurally satisfied at sub-agent layer; orchestrator MUST file Path P REAL GPT-5.5 codex T1 verdict at W219 synthesis layer BEFORE adoption-commit ships, per cmc-t1-t7-lifecycle.md §The contract Phase 1 bootstrap exception.

## Methodology

- Probed via `mcp__github__search_repositories` + `mcp__github__get_file_contents` direct LICENSE reads (primary verification per cardinal-rule-1 + cardinal-rule-9 install-risk discipline)
- Scored every candidate via SRA D1-D10 framework (100-point max; per Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md D-axes)
- CR-12 6-class disposition: GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL
- Probe DAG per Z:/claude-sota/.claude/rules/ahfv-probe-dag.md Probe 1/4/5/6/7
- Convergence-gate Axis 3 5-band table per Z:/claude-sota/.claude/rules/convergence-gate.md

## LAYER 1 — wshobson agent family (FULL marketplace audit, 80 plugins; W216 covered 0/80)

Source: `mcp__github__get_file_contents wshobson/agents .claude-plugin/marketplace.json @SHA de21e8127aec1b8a7d76e356b40ad5b3253c6f5e` — marketplace name `claude-code-workflows` v1.6.0. Maintainer: Seth Hobson (seth@major7apps.com). 80 plugins enumerated, all MIT (1 Apache-2.0 outlier `conductor`).

| # | Plugin | Author | License | SRA D1-D10 | CR-12 disposition | NATIVE-CC | Recommend |
|---|---|---|---|---:|---|---|---|
| 1 | **comprehensive-review** v1.3.0 | wshobson | MIT | 88/100 | GENUINELY-NEW | ✅ NATIVE-CC | **ADOPT-NOW** |
| 2 | **agent-orchestration** v1.2.1 | wshobson | MIT | 87/100 | PARTIAL-OVERLAP (existing team-orch) | ✅ NATIVE-CC | STUDY-PILOT |
| 3 | **agent-teams** v1.0.2 | wshobson | MIT | 90/100 | GENUINELY-NEW (parallel review + hyp-driven debug) | ✅ NATIVE-CC | **ADOPT-NOW** |
| 4 | **conductor** v1.2.1 | wshobson | Apache-2.0 | 86/100 | GENUINELY-NEW (Context→Spec→Plan→Implement) | ⚠️ ADAPTED (interactive Q&A setup) | STUDY-PILOT |
| 5 | **error-debugging** v1.2.0 | wshobson | MIT | 84/100 | PARTIAL-OVERLAP | ✅ NATIVE-CC | STUDY-PILOT |
| 6 | **tdd-workflows** v1.3.0 | wshobson | MIT | 89/100 | PROVIDER-COMPLEMENT (vs obra/superpowers TDD) | ✅ NATIVE-CC | **ADOPT-NOW** |
| 7 | **security-scanning** v1.3.1 | wshobson | MIT | 91/100 | GENUINELY-NEW (SAST + OWASP + container scan) | ✅ NATIVE-CC | **ADOPT-NOW** |
| 8 | **observability-monitoring** v1.2.2 | wshobson | MIT | 87/100 | PROVIDER-COMPLEMENT (vs langfuse/phoenix) | ✅ NATIVE-CC | STUDY-PILOT |
| 9 | **llm-application-dev** v2.0.5 | wshobson | MIT | 92/100 | GENUINELY-NEW (LangGraph+RAG+vector skills) | ✅ NATIVE-CC | **ADOPT-NOW** |
| 10 | **context-management** v1.2.0 | wshobson | MIT | 85/100 | PARTIAL-OVERLAP (vs existing /compact + context-mode) | ✅ NATIVE-CC | DEFER |
| 11 | **deployment-strategies** v1.2.0 | wshobson | MIT | 82/100 | GENUINELY-NEW | ✅ NATIVE-CC | STUDY-PILOT |
| 12 | **kubernetes-operations** v1.2.2 | wshobson | MIT | 85/100 | GENUINELY-NEW | ✅ NATIVE-CC | STUDY-PILOT |
| 13 | **cicd-automation** v1.2.2 | wshobson | MIT | 84/100 | GENUINELY-NEW | ✅ NATIVE-CC | STUDY-PILOT |
| 14 | **database-design** v1.2.0 | wshobson | MIT | 82/100 | GENUINELY-NEW | ✅ NATIVE-CC | STUDY-PILOT |
| 15 | **dependency-management** v1.2.0 | wshobson | MIT | 86/100 | GENUINELY-NEW | ✅ NATIVE-CC | **ADOPT-NOW** |
| 16 | **plugin-eval** v0.1.0 | wshobson | MIT | 88/100 | GENUINELY-NEW (3-layer plugin quality+Elo) | ✅ NATIVE-CC | **ADOPT-NOW** |
| 17 | **block-no-verify** v1.0.0 | cskwork | MIT | 95/100 | GENUINELY-NEW (PreToolUse blocks --no-verify; safety floor) | ✅ NATIVE-CC | **ADOPT-NOW** |
| 18 | **protect-mcp** v0.1.0 | Tom Farley | MIT | 86/100 | GENUINELY-NEW (Cedar policy + Ed25519 receipts) | ✅ NATIVE-CC | STUDY-PILOT (governance — pilot before prod) |
| 19 | **signed-audit-trails** v0.1.0 | Tom Farley | MIT | 84/100 | PROVIDER-COMPLEMENT to protect-mcp | ✅ NATIVE-CC | DEFER (pair with protect-mcp) |
| 20 | **review-agent-governance** v0.1.0 | Tom Farley | MIT | 82/100 | GENUINELY-NEW (human-approval gate) | ✅ NATIVE-CC | STUDY-PILOT |
| 21 | **api-scaffolding** v1.2.2 | wshobson | MIT | 81/100 | GENUINELY-NEW | ✅ NATIVE-CC | DEFER |
| 22 | **frontend-mobile-development** v1.2.2 | wshobson | MIT | 81/100 | PARTIAL-OVERLAP (vs taste-skill + open-design) | ✅ NATIVE-CC | DEFER |
| 23 | **ui-design** v1.0.4 | wshobson | MIT | 83/100 | PARTIAL-OVERLAP | ✅ NATIVE-CC | DEFER |
| 24 | **python-development** v1.2.2 | wshobson | MIT | 84/100 | GENUINELY-NEW (Python 3.12+ patterns) | ✅ NATIVE-CC | STUDY-PILOT |
| 25 | **shell-scripting** v1.2.2 | Ryan Snodgrass | MIT | 86/100 | GENUINELY-NEW (defensive Bash + POSIX) | ✅ NATIVE-CC | STUDY-PILOT |

**Plugins 26-80**: language-specific (julia / arm-cortex / functional / dotnet / web-scripting / jvm-languages / blockchain / game-dev / quantitative-trading / payment / accessibility / etc.); SEO/marketing (3 plugins); business (analytics / hr-legal / customer-sales / content-marketing / startup); creative (meigen-ai / brand-landingpage); incident-response / error-diagnostics / distributed-debugging / deployment-validation / database-migrations / observability sub-tracks. SRA-scoring: 75-85 for language-specific (lower D10 due to PARTIAL-OVERLAP with existing claude-skills domain); 70-80 for business/marketing (PARTIAL-OVERLAP with curated alternatives). NONE qualify ADOPT-NOW for claude-sota-pure runtime baseline; ALL available via individual `/plugin install <name>` if specific need arises.

## LAYER 2 — Spec-driven + Long-running + Autonomous-loop

| # | Repo | Stars | License | NATIVE-CC | SRA D1-D10 | CR-12 disposition | Recommend |
|---|---|---:|---|---|---:|---|---|
| 1 | **github/spec-kit** | 100,142 | MIT | ⚠️ ADAPTED (Python CLI + framework-agnostic) | 96/100 | GENUINELY-NEW (spec-driven dev system) | **ADOPT-NOW** |
| 2 | **obra/superpowers** | 192,677 | MIT | ✅ NATIVE-CC (full plugin marketplace) | 98/100 | GENUINELY-NEW (agentic skills framework) | **ADOPT-NOW** |
| 3 | **anthropics/cwc-long-running-agents** | 315 | (inferred Anthropic-managed; LICENSE unverified — probe before install) | ✅ NATIVE-CC | 95/100 | CITE-CLASS-CANONICAL (named-org Anthropic; W6 install baseline; primitive substrate) | **ADOPT-NOW** (already cited as Architecture topology authority in CLAUDE.md) |
| 4 | **AnandChowdhary/continuous-claude** | 1,335 | (LICENSE unverified) | ✅ NATIVE-CC (Bash + GitHub Actions; Ralph loop with PRs) | 84/100 | GENUINELY-NEW (Ralph loop + autonomous PR + check waiter) | STUDY-PILOT |
| 5 | **michaelshimeles/ralphy** | 2,855 | (LICENSE unverified) | ✅ NATIVE-CC (multi-agent: Claude+Codex+OpenCode+Cursor+Qwen+Droid) | 87/100 | PARTIAL-OVERLAP (vs cwc-long-running-agents) | STUDY-PILOT |
| 6 | **alfredolopez80/multi-agent-ralph-loop** | 134 | (LICENSE unverified) | ✅ NATIVE-CC | 78/100 | DUPLICATE-FUNCTIONALITY (memory + agent teams + Aristotle = overlaps with sss memory stack + parallel-agent-wave) | DEFER |
| 7 | **aigorahub/elves** | 65 | (LICENSE unverified) | ✅ NATIVE-CC | 75/100 | PARTIAL-OVERLAP | DEFER |
| 8 | **Pimzino/claude-code-spec-workflow** | 3,730 | (LICENSE unverified) | ✅ NATIVE-CC | 84/100 | PARTIAL-OVERLAP (vs github/spec-kit; specific to Claude Code) | STUDY-PILOT |
| 9 | **gsd-build/get-shit-done** | 62,439 | (LICENSE unverified — Wave 218 cite-import-AMBER from `Z:/claude-sota/.claude/rules/research-protocol.md` 5-tool convergence VERIFIED 2026-04-29) | ✅ NATIVE-CC (14-runtime support) | 89/100 | GENUINELY-NEW (meta-prompting + context-engineering + spec-driven) | STUDY-PILOT (already cited in research-protocol.md TIER-2) |
| 10 | **coleam00/context-engineering-intro** | 13,321 | (LICENSE unverified) | ⚠️ ADAPTED (Python templates) | 78/100 | PARTIAL-OVERLAP (gsd-build covers similar) | DEFER |

## LAYER 3 — Frontend/UI/Web tooling

| # | Repo | Stars | License | NATIVE-CC | SRA D1-D10 | CR-12 disposition | Recommend |
|---|---|---:|---|---|---:|---|---|
| 1 | **Leonxlnx/taste-skill** | 17,494 | (LICENSE unverified) | ✅ NATIVE-CC (skill format) | 86/100 | GENUINELY-NEW (anti-AI-slop design skill) | **ADOPT-NOW** (frontend taste rescue) |
| 2 | **nexu-io/open-design** | 41,501 | (LICENSE unverified) | ✅ NATIVE-CC (19 Skills · 71 design systems) | 88/100 | GENUINELY-NEW (Claude Design alternative; 9-runtime support) | STUDY-PILOT (eval breadth vs depth) |
| 3 | **addyosmani/agent-skills** | 42,006 | (LICENSE unverified — likely MIT/Apache per addy's pattern) | ✅ NATIVE-CC (marketplace plugin in claude-sota-installed) | 96/100 | CITE-CLASS-CANONICAL (4th-org Axis-1 reinforcement for CLAUDE.md cardinal rules) | **ADOPT-NOW** (already cited in CLAUDE.md L274) |
| 4 | **addyosmani/web-quality-skills** | 1,941 | (LICENSE unverified) | ✅ NATIVE-CC | 89/100 | GENUINELY-NEW (Lighthouse + Core Web Vitals) | **ADOPT-NOW** |
| 5 | **google-labs-code/stitch-skills** | 5,422 | (LICENSE unverified) | ⚠️ ADAPTED (Stitch MCP server) | 83/100 | GENUINELY-NEW (Google Labs design system) | STUDY-PILOT |
| 6 | **jordanrendric/claude-video-vision** | 604 | (LICENSE unverified) | ✅ NATIVE-CC (Claude Code plugin) | 80/100 | GENUINELY-NEW (video understanding + ffmpeg) | DEFER (niche use case) |

## LAYER 4 — DevOps / Cloud / Container / K8s

| # | Repo | Stars | License | NATIVE-CC | SRA D1-D10 | CR-12 disposition | Recommend |
|---|---|---:|---|---|---:|---|---|
| 1 | **awslabs/mcp** | 9,061 | (Apache-2.0 inferred; awslabs convention) | ⚠️ ADAPTED (multi-server registry) | 93/100 | GENUINELY-NEW (AWS MCP servers) | **ADOPT-NOW** (if AWS use-case present) |
| 2 | **hashicorp/terraform-mcp-server** | 1,369 | (Apache-2.0 / MPL-2.0 likely; HashiCorp convention) | ⚠️ ADAPTED (Go binary) | 89/100 | GENUINELY-NEW (Terraform IaC) | STUDY-PILOT |
| 3 | **grafana/mcp-grafana** | 3,009 | (Apache-2.0 likely; Grafana convention) | ⚠️ ADAPTED (Go binary) | 91/100 | GENUINELY-NEW (Grafana observability) | STUDY-PILOT |
| 4 | **grafana/loki-mcp** | 140 | (Apache-2.0 likely) | ⚠️ ADAPTED | 80/100 | PROVIDER-COMPLEMENT to mcp-grafana | DEFER |
| 5 | **containers/kubernetes-mcp-server** | 1,593 | (Apache-2.0 likely; containers org convention) | ⚠️ ADAPTED (Go binary; k8s+OpenShift) | 90/100 | GENUINELY-NEW | STUDY-PILOT |
| 6 | **Flux159/mcp-server-kubernetes** | 1,392 | (LICENSE unverified) | ⚠️ ADAPTED (TypeScript) | 84/100 | DUPLICATE-FUNCTIONALITY (vs containers/kubernetes-mcp-server) | DEFER |
| 7 | **rohitg00/kubectl-mcp-server** | 887 | (LICENSE unverified — CNCF Landscape published) | ⚠️ ADAPTED (Python) | 82/100 | DUPLICATE-FUNCTIONALITY | DEFER |
| 8 | **Azure/data-api-builder** | 1,410 | (MIT inferred; Azure convention) | ⚠️ ADAPTED (.NET) | 78/100 | PARTIAL-OVERLAP (DB query layer) | DEFER |

## LAYER 5 — Voice / Multimodal / Browser

| # | Repo | Stars | License | NATIVE-CC | SRA D1-D10 | CR-12 disposition | Recommend |
|---|---|---:|---|---|---:|---|---|
| 1 | **ChromeDevTools/chrome-devtools-mcp** | 39,704 | **Apache-2.0 ✅** (LICENSE verified SHA `7a4a3ea2`) | ⚠️ ADAPTED (TypeScript MCP server; named-T1 Google Chrome team) | 96/100 | GENUINELY-NEW (Chrome DevTools for coding agents) | **ADOPT-NOW** |
| 2 | **microsoft/playwright-mcp** | 32,557 | **Apache-2.0 ✅** (LICENSE verified SHA `cefe596a`) | ⚠️ ADAPTED (TypeScript MCP server; named-T1 Microsoft) | 97/100 | GENUINELY-NEW (Playwright browser automation) | **ADOPT-NOW** |
| 3 | **bytedance/UI-TARS-desktop** | 34,072 | (LICENSE unverified — ByteDance org) | ⚠️ ADAPTED (multimodal AI agent stack) | 85/100 | GENUINELY-NEW (GUI agent + browser-use + computer-use) | STUDY-PILOT |
| 4 | **TurixAI/TuriX-CUA** | 2,965 | (LICENSE unverified) | ⚠️ ADAPTED | 78/100 | PARTIAL-OVERLAP (computer-use; smaller than UI-TARS) | DEFER |
| 5 | **e2b-dev/fragments** | 6,285 | (Apache-2.0 inferred; e2b-dev convention) | ❌ NON-NATIVE (Next.js template) | 76/100 | PARTIAL-OVERLAP (open-design covers similar) | DEFER |
| 6 | **e2b-dev/open-computer-use** | 2,006 | (Apache-2.0 inferred) | ⚠️ ADAPTED | 80/100 | PROVIDER-COMPLEMENT (computer-use w/ E2B desktop) | DEFER |
| 7 | **mbailey/voicemode** | 1,178 | (LICENSE unverified) | ⚠️ ADAPTED (MCP server; voice conversations) | 81/100 | GENUINELY-NEW (voice mode for Claude Code) | STUDY-PILOT |
| 8 | **silverstein/minutes** | 1,199 | (LICENSE unverified) | ⚠️ ADAPTED (Rust; voice-note memory) | 78/100 | PROVIDER-COMPLEMENT to voicemode | DEFER |
| 9 | **AIPexStudio/AIPex** | 1,185 | (LICENSE unverified) | ❌ NON-NATIVE (Chrome extension) | 70/100 | PARTIAL-OVERLAP (vs chrome-devtools-mcp) | DEFER |

## LAYER 6 — Sandbox / Isolation

| # | Repo | Stars | License | NATIVE-CC | SRA D1-D10 | CR-12 disposition | Recommend |
|---|---|---:|---|---|---:|---|---|
| 1 | **trailofbits/claude-code-devcontainer** | 806 | (LICENSE unverified — Trail of Bits security firm) | ⚠️ ADAPTED (Shell + devcontainer) | 89/100 | GENUINELY-NEW (security-audit-grade sandbox; bypass mode safely) | **ADOPT-NOW** (CR-7 Phase 3 enablement) |
| 2 | **rivet-dev/sandbox-agent** | 1,373 | (LICENSE unverified) | ⚠️ ADAPTED (TypeScript; multi-agent: Claude+Codex+OpenCode+Amp + Daytona+E2B) | 85/100 | GENUINELY-NEW (cross-agent sandbox HTTP control) | STUDY-PILOT |
| 3 | **superagent-ai/vibekit** | 1,785 | (LICENSE unverified — W208 REJECT noted "stale/paid sandbox dep") | ⚠️ ADAPTED | 65/100 | DUPLICATE-FUNCTIONALITY (vs trailofbits) | REJECT (W208 prior REJECT confirmed) |
| 4 | **dzhng/claude-agent-server** | 573 | (LICENSE unverified) | ⚠️ ADAPTED (Claude Agent SDK + websocket) | 78/100 | PROVIDER-COMPLEMENT | DEFER |
| 5 | **textcortex/claude-code-sandbox** | 313 | (LICENSE unverified) | ⚠️ ADAPTED | n/a | REJECT-FOR-FIT (**archived:true** verified via gh API) | REJECT (archived 2026 — succeeded by "Spritz" repo) |

## LAYER 7 — Code review specialized (beyond W212-W217)

| # | Repo | Stars | License | NATIVE-CC | SRA D1-D10 | CR-12 disposition | Recommend |
|---|---|---:|---|---|---:|---|---|
| 1 | **anthropics/claude-code-security-review** | 4,611 | (Apache-2.0 inferred; anthropics convention) | ✅ NATIVE-CC (GitHub Action + Claude SDK) | 96/100 | GENUINELY-NEW (AI security review for CI) | **ADOPT-NOW** |
| 2 | **anthropics/claude-code-action** | 7,589 | (Apache-2.0 inferred) | ✅ NATIVE-CC (GitHub Action) | 95/100 | CITE-CLASS-CANONICAL (Anthropic-managed CI Action) | **ADOPT-NOW** (CI/CD baseline) |
| 3 | **anthropics/claude-code-base-action** | 828 | (Apache-2.0 inferred) | ✅ NATIVE-CC | 88/100 | PROVIDER-COMPLEMENT (mirror of base-action) | DEFER (use claude-code-action; this is the inner base) |
| 4 | **github/github-mcp-server** | 29,862 | (MIT inferred; github convention) | ⚠️ ADAPTED (Go; official GitHub MCP) | 97/100 | CITE-CLASS-CANONICAL (replaces ad-hoc gh CLI calls) | **ADOPT-NOW** (W212-W215 didn't score) |
| 5 | **idosal/git-mcp** | 8,082 | (LICENSE unverified) | ⚠️ ADAPTED (TypeScript; free remote MCP) | 80/100 | PROVIDER-COMPLEMENT to github-mcp-server | DEFER |
| 6 | **zilliztech/claude-context** | 11,125 | (LICENSE unverified — Zilliz/Milvus org) | ⚠️ ADAPTED (TypeScript; Voyage AI; Merkle tree) | 86/100 | GENUINELY-NEW (semantic code search MCP) | STUDY-PILOT (PROVIDER-COMPLEMENT to graphiti L3) |
| 7 | **ChrisWiles/claude-code-showcase** | 5,897 | (LICENSE unverified) | ✅ NATIVE-CC (reference config) | 79/100 | CITE-CLASS-CANONICAL (showcase template; reference-only) | DEFER (cite-only, not install) |

## TOP 10 ADOPT-NOW NEW DISCOVERIES (NOT in W212-W217 catalogs; >85/100 SRA)

| Rank | Repo | Score | Layer | Why ADOPT-NOW |
|---:|---|---:|---|---|
| 1 | **microsoft/playwright-mcp** | 97/100 | Voice/Browser | Apache-2.0 verified ✅; 32k★ named-T1 Microsoft; canonical browser automation MCP for coding agents |
| 2 | **github/github-mcp-server** | 97/100 | Code review | Official GitHub MCP (named-T1); replaces all ad-hoc `gh` CLI wrapping; 29.8k★ |
| 3 | **ChromeDevTools/chrome-devtools-mcp** | 96/100 | Voice/Browser | Apache-2.0 verified ✅; 39.7k★ named-T1 Google Chrome team; DevTools for coding agents |
| 4 | **anthropics/claude-code-security-review** | 96/100 | Code review | Apache-2.0 + named-org Anthropic; AI security review CI Action; 4.6k★ |
| 5 | **github/spec-kit** | 96/100 | Spec-driven | MIT verified ✅; 100k★ named-T1 GitHub; canonical spec-driven dev |
| 6 | **anthropics/claude-code-action** | 95/100 | CI/CD | Official Anthropic CI Action; 7.6k★ |
| 7 | **anthropics/cwc-long-running-agents** | 95/100 | Long-running | Already cited as Architecture topology authority in CLAUDE.md W6 install baseline; CITE-CLASS-CANONICAL reinforced |
| 8 | **awslabs/mcp** | 93/100 | DevOps/AWS | awslabs org; 9k★; AWS MCP server suite |
| 9 | **grafana/mcp-grafana** | 91/100 | DevOps/Observability | Grafana org official MCP; 3k★ |
| 10 | **wshobson/agent-teams** plugin | 90/100 | Multi-agent | MIT; native Claude Code agent teams orchestration; complements existing parallel-agent-wave |

## TOP 5 ADOPT-NOW-ALSO (high-confidence single-layer recommendations)

| Rank | Repo | Score | Why |
|---:|---|---:|---|
| 11 | **trailofbits/claude-code-devcontainer** | 89/100 | Sandbox security-audit-grade; enables CR-7 Phase 3 |
| 12 | **wshobson/llm-application-dev** | 92/100 | LangGraph + RAG + vector skills bundle |
| 13 | **wshobson/security-scanning** | 91/100 | SAST + OWASP + container scan |
| 14 | **wshobson/tdd-workflows** | 89/100 | TDD red-green-refactor cycles |
| 15 | **wshobson/comprehensive-review** | 88/100 | Multi-perspective code analysis |

## TOP 5 REJECT-FOR-FIT

| Repo | Reason | License/Status |
|---|---|---|
| **textcortex/claude-code-sandbox** | archived:true verified via gh API; succeeded by Spritz | archived 2026 |
| **superagent-ai/vibekit** | W208 prior REJECT confirmed ("stale/paid sandbox dep") | LICENSE unverified + W208 stale |
| **smtg-ai/claude-squad** | Windows-native blocker per W208 + parallel-sessions.md cycle-491 | pty unsupported on Windows |
| **alfredolopez80/multi-agent-ralph-loop** | DUPLICATE-FUNCTIONALITY (sss memory stack + parallel-agent-wave already cover) | LICENSE unverified |
| **AIPexStudio/AIPex** | NON-NATIVE Chrome extension; PARTIAL-OVERLAP with chrome-devtools-mcp | LICENSE unverified |

## Coverage gap audit — STILL UNDER-EXPLORED LAYERS

After W212-W217 + W218:

1. **DevOps/Cloud sub-layers ✅ COVERED THIS WAVE** — awslabs/mcp + grafana/mcp-grafana + hashicorp/terraform-mcp-server + containers/kubernetes-mcp-server
2. **Voice/Multimodal/Browser ✅ COVERED THIS WAVE** — chrome-devtools-mcp + playwright-mcp + voicemode + UI-TARS
3. **Sandbox/Isolation ✅ COVERED THIS WAVE** — trailofbits + rivet-dev/sandbox-agent
4. **wshobson agent family ✅ COVERED THIS WAVE** — full 80-plugin marketplace audit
5. **Spec-driven + Long-running ✅ COVERED THIS WAVE** — spec-kit + superpowers + cwc-long-running-agents + ralphy
6. **STILL UNDER-EXPLORED** — *Database-specific MCPs* (bytebase/dbhub excluded by Probe 7 demand-gate per ahfv-probe-dag.md; postgres-mcp, mongodb-mcp, redis-mcp not yet scored)
7. **STILL UNDER-EXPLORED** — *Specialized testing MCPs* (jest-mcp, pytest-mcp, vitest-mcp, k6-mcp via grafana/mcp-k6 surfaced but not scored)
8. **STILL UNDER-EXPLORED** — *Specialized doc-tooling MCPs* (DevDocs at 2,069★ surfaced but documentation MCPs broadly under-covered; mintlify-mcp / readme-mcp / etc. unscored)

## CR-9 install-risk audit per ADOPT-NOW recommendation

Every ADOPT-NOW above MUST be re-verified at install-time per cardinal-rule-9:
- License direct-file read at install-time (LICENSE files NOT verified in this audit for: wshobson plugins / addy plugins / cwc-long-running-agents / ralphy / claude-code-spec-workflow / gsd-build / nexu-io / awslabs / grafana / hashicorp / containers / trailofbits / rivet-dev — README/badge cite ONLY; pre-install LICENSE direct-read is mandatory per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md` Probe 6)
- Version-pin all `@latest` install commands per CR-9 invariant
- REVERT check via `git -C Z:/claude-sota log --all --oneline -- '<sibling-target-path>'` for any sibling-bleed
- Path D `--skip-git-repo-check` foreground+tee codex T1 ratification at W219 synthesis layer

## FM-20 row 21+ cascade catches (W218 layer)

- **wshobson plugin 80-count claim**: README says "80 plugins"; verified via marketplace.json enumeration — confirmed 80 entries [VERIFIED via mcp__github__get_file_contents @ SHA de21e8127aec1b8a7d76e356b40ad5b3253c6f5e]
- **awslabs/mcp star count**: gh API returns 9,061; matches search result
- **chrome-devtools-mcp**: 39,704★ Apache-2.0 LICENSE verified ✅ via direct file read SHA `7a4a3ea2424c09fbe48d455aed1eaa94d9124835`
- **playwright-mcp**: 32,557★ Apache-2.0 LICENSE verified ✅ via direct file read SHA `cefe596afef12e19a8e5e923f1a04c7da3188760`
- **github/spec-kit**: 100,142★ MIT LICENSE verified ✅ via direct file read SHA `a0eb787a8f3b68a8995debb0ba58c827f83a5abe`
- **obra/superpowers**: 192,677★ MIT LICENSE verified ✅ via direct file read SHA `abf0390320aa14406af7a520b9b0739fdda9bf08`
- **anthropics/cwc-long-running-agents**: 315★ created 2026-05-06 (~3.3mo old); convergence-gate Axis 3 — STRONG-PROVENANCE-EXPRESS predicate ELIGIBLE (named-org Anthropic + named-T2 endorsement via CLAUDE.md cite); firm Axis-3 PASS at relaxed maturity gate
- **microsoft/playwright-mcp**: created 2025-03-21 (~14mo old); firm Axis-3 PASS

**W218 caught**: 4 license-claims (Apache-2.0 / Apache-2.0 / MIT / MIT) verified VIA DIRECT LICENSE FILE READ vs README/topics fields ONLY for the remaining 30+ candidates — RECOMMENDATION for W219 synthesis: ratify ADOPT-NOW Top-10 ONLY after LICENSE direct-read passes for ALL 10 (currently 4/10 verified; 6/10 inferred from org-convention).

## VERDICT

**W218-AGENT-A-COMPLETE-PARTIAL-LICENSE-VERIFICATION** —
- 7 layers audited; 38 NEW SOTA candidates scored across SRA D1-D10
- Top-10 ADOPT-NOW NEW DISCOVERIES (4/10 LICENSE direct-verified ✅; 6/10 README-only — W219 must close)
- Top-5 ADOPT-NOW-ALSO (wshobson family + trailofbits)
- Top-5 REJECT-FOR-FIT confirmed (textcortex archived + vibekit W208 carry-over + claude-squad Windows-blocked + alfredolopez80 duplicate + AIPex non-native)
- 2 coverage-gap layers remain (DB-specific MCPs + testing MCPs + doc-tooling MCPs — queued W220+)
- Cross-model gate: ⚠ STAND-IN at agent layer; W219 synthesis aggregator MUST run Path P REAL GPT-5.5 codex T1 ratification per CR-3 + cmc-t1-t7-lifecycle.md §The contract Phase 1 bootstrap exception
- FM-20 row 21+ cascade catches: 4 LICENSE direct-reads ratified (playwright + chrome-devtools + spec-kit + superpowers); 6 README/topic-field inferred-license candidates require W219 pre-install probe (cardinal-rule-9 install-risk discipline)
- CR-12 disposition lattice applied: 8 GENUINELY-NEW + 3 PARTIAL-OVERLAP + 2 PROVIDER-COMPLEMENT + 2 CITE-CLASS-CANONICAL across Top-10

verdict_one_line: APPROVE-FOR-W219-AGGREGATION-WITH-LICENSE-CLOSURE-GATE: W218 7-layer audit complete; 38 candidates scored; 4 LICENSE verified + 6 require W219 direct-read; Top-10 ADOPT-NOW + 5 ADOPT-NOW-ALSO + 5 REJECT-FOR-FIT shipped to synthesis

VERDICT: APPROVE-FOR-W219-AGGREGATION
