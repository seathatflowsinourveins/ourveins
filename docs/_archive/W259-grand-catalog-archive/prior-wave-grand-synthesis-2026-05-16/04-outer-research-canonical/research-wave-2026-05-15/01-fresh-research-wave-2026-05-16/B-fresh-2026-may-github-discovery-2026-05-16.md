# Wave 251 Agent B - Fresh 2026-May GitHub Discovery

## §0 STAND-IN-NOTICE / BRIDGE-MODE disclosure

[VERIFIED] Requested BRIDGE-MODE `codex exec` subprocess was attempted 3 times, each with <=90s call budget, and failed before model execution with local Codex app-server access errors:

| Attempt | Command shape | Budget | Result |
|---|---:|---:|---|
| 1 | `codex exec --ephemeral -p deep-review-exec --color never "<Wave 251 research prompt>"` | 90s | Failed before model: `failed to initialize in-process app-server client: Access is denied` |
| 2 | `codex exec --ephemeral --ignore-rules -m gpt-5.5 --color never "<narrow check prompt>"` | 90s | Same failure |
| 3 | `codex exec --ephemeral --ignore-user-config --ignore-rules -m gpt-5.5 --color never "<exact-line check prompt>"` | 90s | Same failure |

[INFERRED] Failure root is local Codex `CODEX_HOME=Z:/claude-sota-installed-state/.codex` temp/app-server wiring, not model refusal. This artifact is therefore a stand-in direct-research report, not a successful GPT-5.5 bridge-mode model artifact.

## §1 Discovery sources used

Source families used:

1. [VERIFIED] GitHub API live metadata:
   - `gh api 'search/repositories?q=topic:claude-code+pushed:>2026-04-15&sort=stars&order=desc&per_page=30'`
   - `gh api 'search/repositories?q=topic:mcp-server+stars:>50+pushed:>2026-03-15&sort=stars&order=desc&per_page=30'`
   - Direct `gh api repos/{owner}/{repo}` for candidate stars, creation date, push date, license, URL.
2. [VERIFIED] arXiv/web-indexed paper surfaces:
   - AdaptOrch: https://arxiv.org/abs/2602.16873
   - MASFactory: https://www.opentrain.ai/papers/masfactory-a-graph-centric-framework-for-orchestrating-llm-based-multi-agent-sys--arxiv-2603.06007/
   - Orla: https://papers.cool/arxiv/2603.13605
   - SWE-Skills-Bench: https://arxiv.org/abs/2603.15401
   - MCP usage study: https://arxiv.org/abs/2603.23802
3. [VERIFIED] Conference/benchmark surfaces:
   - ICLR 2026 ACE: https://ace-agent.github.io/blogs/2026-01-30-iclr-acceptance/
   - ICML 2026 downloads: https://icml.cc/Downloads/2026
   - XSkill ICML repo: https://github.com/XSkill-Agent/XSkill
   - GAIA leaderboard surface: https://huggingface.co/gaia-benchmark
   - SWE-bench Live: https://swe-bench-live.github.io/
4. [VERIFIED] Official/docs/runtime surfaces:
   - Anthropic Claude Code SDK hooks: https://code.claude.com/docs/en/agent-sdk/hooks
   - Anthropic Claude Code hooks reference: https://docs.anthropic.com/en/docs/claude-code/hooks
   - GitHub secret scanning via MCP changelog: https://github.blog/changelog/2026-05-05-secret-scanning-with-github-mcp-server-is-now-generally-available/
5. [VERIFIED] Marketplace/community scans:
   - Browserbase MCP repo: https://github.com/browserbase/mcp-server-browserbase
   - Kubernetes MCP repo: https://github.com/containers/kubernetes-mcp-server
   - Claude hook skill listing: https://claudskills.com/skills/hook-development/
   - Browser automation MCP guide: https://chatforest.com/guides/best-browser-mcp-servers/

## §2 Per-cohort candidate inventory tables

### C2 - arXiv 2026 Q1-Q2 code-linked agent papers

| Candidate | Repo | Paper/source | Net-new reason | Initial disposition |
|---|---|---|---|---|
| ACE | https://github.com/ace-agent/ace | ICLR 2026 Agentic Context Engineering | Context-evolution layer, not plain memory/RAG | ADOPT-NOW pilot |
| MASFactory | https://github.com/BUPT-GAMMA/MASFactory | arXiv 2603.06007 | Graph-centric orchestration artifact; code-linked | DEFER, overlaps orchestration |
| AgenticRAGTracer | https://github.com/YqjMartin/AgenticRAGTracer | arXiv-linked benchmark/source | Failure-localization diagnostic for agentic RAG | ADOPT-NOW cite/eval |
| mt-rag-benchmark | https://github.com/IBM/mt-rag-benchmark | MTRAG-UN / multi-turn RAG | Multi-turn RAG diagnostic, IBM source | DEFER, likely W250 overlap |
| awesome-llm-mas-rl | https://github.com/xxzcc/awesome-llm-mas-rl | arXiv 2605.02801 | Orchestration-trace schema/paper pool | CITE-CLASS only |

### C4 - PapersWithCode/benchmark winner-adjacent surfaces

| Candidate | Repo | Benchmark/source | Net-new reason | Initial disposition |
|---|---|---|---|---|
| mini-swe-agent | https://github.com/SWE-agent/mini-swe-agent | SWE-bench/SWE-bench Live ecosystem | Tiny reference harness and live eval baseline | ADOPT-NOW eval harness |
| SWE-Skills-Bench | https://github.com/GeniusHTX/SWE-Skills-Bench | arXiv 2603.15401 | Directly measures value of skills on SWE tasks | ADOPT-NOW eval |
| gaia-agent | https://github.com/gaia-agent/gaia-agent | GAIA-ready agent repo | Reproducible GAIA harness candidate | DEFER, low maturity |

### C7 - 2026 conference proceedings with code

| Candidate | Repo | Venue/source | Net-new reason | Initial disposition |
|---|---|---|---|---|
| ACE | https://github.com/ace-agent/ace | ICLR 2026 | Accepted, released code, context-engineering primitive | ADOPT-NOW pilot |
| XSkill | https://github.com/XSkill-Agent/XSkill | ICML 2026 | Continual skill learning for multimodal agents | DEFER, license missing |
| WildToolBench | https://github.com/yupeijei1997/WildToolBench | ICLR 2026 | Wild tool-use benchmark and multi-agent data generation | ADOPT-NOW cite/eval |

### Under-fired layer gaps

| Gap | Candidate | Repo/source | Initial disposition |
|---|---|---|---|
| Container/K8s agent runtime | Kubernetes MCP Server | https://github.com/containers/kubernetes-mcp-server | ADOPT-NOW MCP |
| K8s-native MCP control plane | MCP Runtime | https://github.com/Agent-Hellboy/mcp-runtime | DEFER, zero stars |
| Agent sandboxing | Kilntainers | https://github.com/Kiln-AI/Kilntainers | ADOPT-NOW sandbox pilot |
| Hook runtime ecosystem | cc-compact | https://github.com/hiiamtrong/cc-compact | DEFER, tiny but relevant |
| Agent verifier/safety | agent-verifier | https://github.com/Aurite-ai/agent-verifier | ADOPT-NOW safety skill |
| Secrets/safety MCP | GitHub MCP secret scanning | https://github.blog/changelog/2026-05-05-secret-scanning-with-github-mcp-server-is-now-generally-available/ | PROVIDER-COMPLEMENT |

### Browser automation beyond chrome-devtools+playwright

| Candidate | Repo | Initial disposition |
|---|---|---|
| Browserbase MCP | https://github.com/browserbase/mcp-server-browserbase | ADOPT-NOW, cloud-browser provider |
| Stagehand | https://github.com/browserbase/stagehand | ADOPT-NOW SDK/classic browser-agent primitive |
| parallel-browser-mcp | https://github.com/etairl/parallel-browser-mcp | DEFER, promising but early |

### Privacy/PII/Safety MCPs beyond W233-X

| Candidate | Repo/source | Initial disposition |
|---|---|---|
| presidio-hardened-x402 | https://github.com/presidio-v/presidio-hardened-x402 | CITE-CLASS; domain-specific PII payment middleware |
| agent-verifier | https://github.com/Aurite-ai/agent-verifier | ADOPT-NOW as local preflight skill |
| GitHub MCP secret scanning | https://github.blog/changelog/2026-05-05-secret-scanning-with-github-mcp-server-is-now-generally-available/ | PROVIDER-COMPLEMENT |

## §3 Per-candidate full 12-dimension scoring

Legend: Probe DAG is `1-7 hits/7` where available by repo/source inspection from public metadata only. SRA is use-class precision `D1-D10`. CPD is commit/day when commit count was cited by source, otherwise `UNK` because direct commit pagination was not completed in this pass.

| Candidate | Stars | Age | cpd | License | Conv A1 | Conv A2 | Conv A3 | Probe DAG | SRA | Wired | Native CC path | CR-12 disposition |
|---|---:|---|---:|---|---|---|---|---:|---:|---|---|---|
| ACE (`ace-agent/ace`) | 1,079 | 2025-11-16 | UNK | Apache-2.0 | ICLR+GitHub+blog | ACE authors + ICLR reviewers | >=3mo | 6/7 | 8/10 | P2 | DIRECT-CLONE/SKILL | GENUINELY-NEW |
| MASFactory | 393 | 2026-02-14 | UNK | Apache-2.0 | arXiv+GitHub+video | BUPT-GAMMA + paper authors | <3mo, strong provenance | 5/7 | 6/10 | P2 | DIRECT-CLONE | PARTIAL-OVERLAP |
| AgenticRAGTracer | 12 | 2026-02-02 | UNK | UNKNOWN | arXiv+GitHub+dataset refs | paper authors | ~3mo | 4/7 | 7/10 | P2 | DIRECT-CLONE | PARTIAL-OVERLAP |
| IBM mt-rag-benchmark | 138 | 2024-12-17 | UNK | Apache-2.0 | IBM+GitHub+paper | IBM authors | >=12mo | 5/7 | 7/10 | P2 | DIRECT-CLONE | DUPLICATE-FUNCTIONALITY |
| awesome-llm-mas-rl | 6 | 2026-05-04 | UNK | NOASSERTION | arXiv+GitHub | paper authors only | <1mo | 3/7 | 5/10 | P0 | CITE | CITE-CLASS-CANONICAL |
| mini-swe-agent | 4,368 | 2025-06-28 | UNK | MIT | SWE-bench+GitHub+HF/community | Stanford/Princeton ecosystem | >=10mo | 7/7 | 9/10 | P1 | DIRECT-CLONE/CLI | GENUINELY-NEW |
| SWE-Skills-Bench | 41 | 2026-03-15 | UNK | MIT | arXiv+GitHub+SWE-bench | authors + SWE community | <3mo, strong provenance | 5/7 | 9/10 | P2 | DIRECT-CLONE | GENUINELY-NEW |
| gaia-agent | 16 | 2025-11-11 | UNK | Apache-2.0 | GAIA+GitHub+AI SDK | repo author | >=6mo | 4/7 | 6/10 | P2 | DIRECT-CLONE | PARTIAL-OVERLAP |
| XSkill | 193 | 2026-03-01 | UNK | UNKNOWN | ICML+GitHub+project | XSkill authors | <3mo, strong provenance | 4/7 | 7/10 | P2 | DIRECT-CLONE | ECOSYSTEM-IMPORT |
| WildToolBench | 30 | 2026-01-03 | UNK | UNKNOWN | ICLR+GitHub+OpenReview | authors | >=4mo | 5/7 | 8/10 | P2 | DIRECT-CLONE | GENUINELY-NEW |
| Kubernetes MCP Server | 1,593 | 2025-02-11 | source cites 843 commits/415d=2.0 | Apache-2.0 | Red Hat/containers+MCP+GitHub | Red Hat engineers + ChatForest review | >=15mo | 7/7 | 9/10 | P1 | MCP | GENUINELY-NEW |
| MCP Runtime | 0 | 2025-08-23 | UNK | MIT | self-site+GitHub | weak | >=8mo but no adoption | 4/7 | 7/10 | P2/P3 | MCP | ECOSYSTEM-IMPORT |
| Kilntainers | 40 | 2026-02-09 | UNK | MIT | GitHub+Reddit+MCP category | Kiln-AI + MCP users | ~3mo | 6/7 | 8/10 | P1 | MCP | GENUINELY-NEW |
| cc-compact | 0 | 2026-04-18 | UNK | MIT | Reddit+GitHub+hooks docs | author only | <1mo | 3/7 | 6/10 | P0 | HOOK/SKILL | PARTIAL-OVERLAP |
| agent-verifier | 38 | 2026-03-02 | UNK | MIT | GitHub+Reddit+LangChain community | Aurite + users | ~2.5mo | 5/7 | 8/10 | P0/P1 | SKILL | GENUINELY-NEW |
| Browserbase MCP | 3,339 | 2024-12-05 | UNK | Apache-2.0 | Browserbase+MCP+GitHub | Browserbase + MCP directories | >=17mo | 7/7 | 9/10 | P1 | MCP | PROVIDER-COMPLEMENT |
| Stagehand | 22,673 | 2024-03-24 | UNK | MIT | Browserbase+GitHub+agent ecosystem | Browserbase + browser-agent users | >=2y | 7/7 | 9/10 | P2 | SDK | PROVIDER-COMPLEMENT |
| parallel-browser-mcp | 99 | 2026-04-12 | UNK | Apache-2.0 | GitHub+Reddit+Browser Run refs | author + MCP users | <2mo | 5/7 | 7/10 | P1 | MCP | PROVIDER-COMPLEMENT |
| presidio-hardened-x402 | 5 | 2026-03-31 | UNK | UNKNOWN | arXiv+GitHub | paper authors only | <2mo | 3/7 | 6/10 | P2 | DIRECT-CLONE | CITE-CLASS-CANONICAL |
| GitHub MCP secret scanning | n/a | GA 2026-05-05 | n/a | provider | GitHub+MCP+Secret Protection | GitHub | GA | 6/7 | 9/10 | P0 if enabled | MCP/provider | PROVIDER-COMPLEMENT |

## §4 Top-N ADOPT-NOW recommendations

1. [VERIFIED] `containers/kubernetes-mcp-server` - install/probe as the K8s/OpenShift MCP layer. It directly addresses the container/K8s under-fired gap and has the strongest production signal among net-new infra candidates.
2. [VERIFIED] `browserbase/mcp-server-browserbase` + `browserbase/stagehand` - add as provider-complement browser automation for cloud/headless sessions beyond local Playwright/Chrome DevTools.
3. [VERIFIED] `SWE-agent/mini-swe-agent` - keep as compact eval/reference harness for SWE-bench style agent loops; useful for regression comparisons against Claude Code/eee.
4. [VERIFIED] `GeniusHTX/SWE-Skills-Bench` - use as a skills-value eval suite before adding more skill packs.
5. [VERIFIED] `ace-agent/ace` - pilot as context-evolution research import, not as memory/RAG replacement.
6. [VERIFIED] `Kiln-AI/Kilntainers` - sandbox MCP pilot for ephemeral shell execution; isolate from secrets and measure Windows/Podman behavior before broad use.
7. [VERIFIED] `Aurite-ai/agent-verifier` - evaluate as a local agent-policy/security skill, especially for hallucinated tools, retry loops, and org policy drift.
8. [VERIFIED] GitHub MCP secret scanning GA - enable/check existing GitHub MCP wiring for secret scanning if repo has GitHub Secret Protection.

## §5 REJECT/DEFER with reasoning

| Candidate | Decision | Reason |
|---|---|---|
| MCP Runtime | DEFER | Interesting K8s-native MCP broker/control plane, but zero live GitHub stars and unclear independent adoption. Re-check after first real releases/users. |
| cc-compact | DEFER | Directly relevant PreCompact hook idea, but zero stars and tiny surface; use as cite/template only unless local hook need is immediate. |
| XSkill | DEFER | ICML 2026 signal, but missing license in GitHub API metadata blocks install until license is explicit. |
| WildToolBench | DEFER/ADOPT-EVAL | Strong eval/citation candidate; missing license in API metadata blocks runtime install. |
| AgenticRAGTracer | DEFER/ADOPT-EVAL | Valuable diagnostic but low adoption and unclear license. |
| presidio-hardened-x402 | CITE-CLASS | Useful PII pattern for agentic payments, but too domain-specific and no license surfaced by API. |
| gaia-agent | DEFER | Useful GAIA scaffold but low stars and no clear benchmark leadership. |
| MASFactory | DEFER | Good paper/code artifact but overlaps prior orchestration coverage; revisit only if graph-centric topology becomes immediate need. |

## §6 GAPS / HONEST-NON-FINDING

- [UNKNOWN] Real GPT-5.5 bridge-mode subprocess output was not obtained. All three `codex exec` attempts failed before model execution.
- [UNKNOWN] Exact commit/day for most repos was not computed because this pass did not run full GitHub commit pagination or clones. Only Kubernetes MCP had a source-cited commit count usable for CPD.
- [UNKNOWN] PapersWithCode top-K winner verification was incomplete. Public sources found benchmark/leaderboard-adjacent repos, but not enough primary leaderboard rows with direct repo links for all requested benchmarks by the time cap.
- [UNKNOWN] NeurIPS 2026 proceedings are not mature in Q1-Q2 2026; no NeurIPS 2026 accepted agent paper with stable code was verified.
- [REFUTED] Many 2026 "Claude Code" topic search hits are likely duplicate-functionality against W237/W250/W235 surfaces: memory packs, orchestration packs, skill catalogs, token optimizers, and Claude Code template packs were intentionally not re-scored unless they hit an under-fired gap.
- [INFERRED] OAuth/RBAC multi-tenant Claude Code and post-2026-05-08 multi-account fleet rotation remain weakly served by open-source candidates. Existing hits skew toward CLI proxy/fleet wrappers already known to this runtime or SaaS templates not specific to Claude Code OAuth fleet failure modes.

## §7 VERDICT one-line

VERDICT: NEEDS-HUMAN-TRIAGE - 8 ADOPT-NOW/PILOT candidates found across under-fired cohorts, but BRIDGE-MODE GPT-5.5 subprocess failed 3/3 before model execution; strongest net-new installs to probe are `containers/kubernetes-mcp-server`, `browserbase/mcp-server-browserbase`, `SWE-agent/mini-swe-agent`, `GeniusHTX/SWE-Skills-Bench`, `ace-agent/ace`, `Kiln-AI/Kilntainers`, `Aurite-ai/agent-verifier`, and GitHub MCP secret scanning.
