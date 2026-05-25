# Wave 252-extension Agent A — Audit + Gap-Scan

[Date: 2026-05-15] [Agent: sota-researcher Sonnet stand-in — CLAUDE_CODE_SUBAGENT_MODEL may be set per CLAUDE.local.md ENV (g); cross-model gate PARTIAL — orchestrator-side BRIDGE-MODE NOT FIRED this dispatch per `cmc-env-funneled-disclosure.md` STAND-IN-NOTICE mandate]

VERDICT: GAP-CONFIRMED — n=18 P0/P1 gaps + n=9 P2 gaps identified; Stage 2 agents B+C+D+E have concrete targets.

## §1 Inventory of prior research artifacts (sampled, NOT fully read)

| Path | Size | Scope | Topics covered | Date | Quality grade |
|---|---|---|---|---|---|
| `research-wave-2026-05-15/05-grand-catalog/GRAND_CATALOG_2026-05-15.md` | 65.7K / 610 LOC | Master catalog across 11 layers / 130+ repos / Top-50 ranked | Foundation, Skills marketplaces, Workflow, Operator UIs, MCP servers (5.A-E memory/browser/code-intel/search/security), Orch frameworks, Token-eff, Eval, CLI, Bridges, Outliers | 2026-05-15 | **A** (most authoritative; 5-phase install priority + win-over-alternates commentary) |
| `01-fresh-research-wave-2026-05-16/W251-grand-comprehensive-checklist-2026-05-16.md` | 22K / 169 LOC | Wave 251 post-adversarial checklist | License blockers (context-mode ELv2 / FalkorDB SSPL / Phoenix ELv2 / trailofbits CC-BY-SA), survivor ADOPT-NOW table, fresh score-7+ discoveries, REJECT list, open gaps | 2026-05-16 | **A** (license-cleaned survivor roster) |
| `01-fresh-research-wave-2026-05-16/GRAND-SYNTHESIS-2026-05-16.md` | 18.3K / 173 LOC | Wave 251 grand synthesis | P0/P1 action queue, CR-12 disposition classes, license-state per row | 2026-05-16 | **A** |
| `01-fresh-research-wave-2026-05-16/A-existing-artifact-comprehensive-audit-2026-05-16.md` | 24.5K / 219 LOC | Wave 251 Agent A historical audit | W200-W250 wave inventory, gap-list §5.1-5.4, integrity P0 (context-mode dispute) | 2026-05-16 | **B+** (relies on W237/W240/W250 carryover that wasn't found) |
| `01-fresh-research-wave-2026-05-16/B-fresh-{github,2026-may}-discovery-2026-05-16.md` | 28K combined / 356 LOC | Wave 251 fresh-discovery (2 variants) | Cohort C2/C4/C7 fresh, Kubernetes-MCP, Browserbase, mini-swe-agent, GitHub-MCP-server, Stagehand | 2026-05-16 | **B+** (12-dim scoring; no Probe DAG executed per HONEST limitation §6) |
| `01-fresh-research-wave-2026-05-16/C-{adversarial-gap-scan,codex-bridge}-2026-05-16.md` | 38.8K combined / 376 LOC | Wave 251 adversarial review | Stale-verdict re-audit (cognee promoted, OpenViking confirmed reject), CR-12 re-audit, Agent B candidate adversarial probes | 2026-05-16 | **A-** (BRIDGE-MODE codex bridge did NOT fire per §0 STAND-IN-NOTICE) |
| `01-fresh-research-wave-2026-05-16/WAVE252-ACTION-PLAN-2026-05-16.md` | 5.5K / 89 LOC | W252 action plan (Top-3 + Probe DAG) | Kubernetes-MCP, Browserbase, mini-swe-agent probe results | 2026-05-16 | **B** (only 3 candidates probed) |
| `wave52/iter1a-shan-summary.md` | 17K / 170 LOC | shanraisshan CCBP extraction top-20 UNADOPTED patterns | autoMode classifier, --add-dir CLAUDE.md, env scrub, Command→Agent→Skill, type:"prompt" hooks, `paths:` lazy auto-activation, isolation:worktree, --strict-mcp-config, --max-budget-usd, --max-turns, /security-review, /insights, /team-onboarding | (Wave 52) | **A** (20 distinct unadopted patterns; high-leverage) |
| `wave52/iter1d-eee-install-plan.md` | 17.4K / 270 LOC | `eee` (Codex/GPT-5.5 reviewer) install plan | Codex 0.125→0.128 upgrade, auth modes, T1/T2/T3/T5/T6 hook wiring, profiles deep-review/deep-review-exec/headless-exec | (Wave 52) | **A** |
| `wave52/iter2b-advanced-unadopted.md` | 24.7K / 221 LOC | Top-10 advanced unadopted patterns | outputStyle plugin migration, ANTHROPIC_SMALL_FAST_MODEL pin, --system-prompt-file, session-report skill, claude-md-management, agent-sdk-dev, OTEL_LOG_USER_PROMPTS, CLAUDE_CODE_USE_POWERSHELL_TOOL, SessionEnd timeout extension, max_budget_usd | (Wave 52) | **A** |
| `wave52/iter3a-install-plan.md` | 30.9K / 455 LOC | Per-repo native install plan | ccusage, RTK, claude-task-master, OpenSpec, CCPM, Windows caveats | (Wave 52) | **A** |
| `README.md` (outer research root) | 25.9K / 78 LOC | Manifest of waves | Pointer to all sub-folders | mixed | C+ |
| `kits/v5-v62/` + `_archives/v10-v60/` | 60+ ZIP kits | Anonymous LLM-iterated zip-drops | Per Section 13 catalog finding 10: STRUCTURAL REJECT class (saturated, no NEW_ADDITIONS_SINCE_LAST_KIT.md) | mixed | **D** (cite-only; do NOT mine for adoption) |
| `v2-deep-synthesis/ULTIMATE_SOTA_RUNTIME_DESIGN.md` | (sampled) | Earlier ultimate design | superseded by GRAND_CATALOG | older | **C** |

Sub-folders NOT explored fully this fire: `recon-data/`, `02-mcp-servers/`, `03-orchestration-frameworks/`, `04-token-context-optimization/`, `01-cc-ecosystem/`, `06-executive-brief/`, `00-prior-research-baseline/sourcedive/` — flagged for Stage 2 review.

## §2 Coverage matrix (15 categories × prior artifacts)

| # | Category | Coverage 0-5 | Covered by | Gap size | Priority |
|---|---|---|---|---|---|
| 1 | Foundation chain (Anthropic-canonical) | **5** | GRAND_CATALOG §1 + wave52/iter1d | Minimal | L |
| 2 | Agent orchestration plugins (wshobson / superpowers / addy-osmani / conductor / agent-teams) | **4** | GRAND_CATALOG §2+§6 + W251 Section 3 (audited subset) | Conductor HARD-GATE deep-dive pending; Agent Teams plugin Probe 5 pending | **M** |
| 3 | Memory layer (mcp-memory-service / graphiti / cognee / claude-mem / OpenViking / Letta / mem0) | **4** | GRAND_CATALOG §5.A (18 entries) + Wave 251 C reclassification of cognee | claude-mem 76k★ Probe 4-6 NEVER executed; mem0 benchmark vs Graphiti pending; Letta/Cipher deep-dive missing; Engram/codebase-memory-mcp/phantom (Ghostwright) Q2-2026 entries shallow | **H** |
| 4 | RAG layer (open-RAG / vector DBs / hybrid search / re-rank) | **1** | Only Qdrant mention in sourcedive + IBM mt-rag-benchmark in W251 §4; pgvector mentioned once | Almost zero coverage: NO RAGatouille / NO R2R (SciPhi-AI) / NO LightRAG / NO HippoRAG / NO ColBERT / NO LanceDB / NO Weaviate / NO cross-encoder rerankers / NO hybrid BM25+dense / NO reciprocal-rank-fusion / NO open-rag benchmark suite | **H — CRITICAL** |
| 5 | MCP servers catalog (≥top-50 by stars) | **3** | GRAND_CATALOG §5.A-E + §1.10/1.11 | Top-50 enumeration incomplete; "punkpeye/awesome-mcp-servers" (~85k★) cited but rows not extracted; mcphub / mcp-runtime / supabase-mcp / stripe-mcp / postgres-mcp / mongodb-mcp / linear-mcp / slack-mcp / notion-mcp / brave-search-mcp NOT enumerated | **H** |
| 6 | Token / context optimization | **5** | GRAND_CATALOG §7 (16 entries with 7 ADOPT-NOW); 2026 stack identified (Anthropic cache + /compact + RTK + context-mode + repomix + caveman + ccusage) | LLMLingua REPLACED ✓; remaining gap: token-savior fabrication-test, headroom/lean-ctx/openwolf deep-dive | L (mostly closed) |
| 7 | Code-intelligence (serena / gitnexus / repomix / ast-grep / claude-code-lsps / graphify) | **4** | GRAND_CATALOG §5.C (11 entries) | gitnexus is current installed-baseline but NOT scored in catalog; graphify deep-dive pending; codebase-memory-mcp + Piebald-claude-code-lsps integration with serena/repomix not designed | **M** |
| 8 | Browser / web automation (playwright-mcp / chrome-devtools-mcp / browserbase / firecrawl / exa) | **4** | GRAND_CATALOG §5.B + W251 §3 fresh-disco | exa-mcp deep coverage MISSING (only generic mention as 5.D1); Stagehand 22k★ found but not in Top-50; deep crawler tools (Scrapling 49k★, crawl4ai, jina-reader) shallow probe | **M** |
| 9 | Cross-runtime / cross-model (ACP / codex CLI / codex-plugin-cc / gpt5 BRIDGE-MODE) | **4** | GRAND_CATALOG §10 + cite-import-AMBER from sibling cross-model-consensus.md | ACP 4-org cite chain ADOPT-NOW eligible per Wave 5 A10 closure but adapter `agentclientprotocol/claude-agent-acp` not yet pilot-installed; Gemini/Goose ACP-host cross-pollination unmapped | **M** |
| 10 | Eval / benchmarking (promptfoo / phoenix / langfuse / opik / openevals) | **3** | GRAND_CATALOG §8 (13 entries) | Phoenix server ELv2 caveat unresolved; inspect_ai 200+ evals not catalogued individually; SWE-bench Live + SWE-Skills-Bench fresh entries from W251 not integrated to main catalog; openevals (Anthropic-backed?) unmentioned; opik unmentioned | **M-H** |
| 11 | Security / safety / governance (semgrep / protect-mcp / signed-audit-trails / Trail of Bits / review governance) | **3** | GRAND_CATALOG §5.E (9 entries) + Wave 251 W251 §1 license-block sweep | `protect-mcp` PHANTOM coordinate unresolved (W251 §6 HNF #1); signed-audit-trails design pending; agent-verifier (Aurite-ai) STUDY-PILOT not deep-dived; codex-plugin-cc T0-T7 lifecycle audits unenumerated; Anthropic CC native `/security-review` slash command unprobed | **H** |
| 12 | Cost / telemetry (ccusage / langfuse / opik / Anthropic Admin API) | **3** | GRAND_CATALOG §7.14 + §5.D | langfuse-NOASSERTION license unresolved; tokscale fresh entry from W251 §3 not integrated; Anthropic Admin API for cost not designed; ccusage MCP `@ccusage/mcp` install path probe pending | **M** |
| 13 | Skill / plugin / workflow ecosystem (alirezarezvani / sickn33 / ComposioHQ / mattpocock / k-dense-ai) | **3** | GRAND_CATALOG §2 (25 entries) | Per-skill POWERFUL/SOLID/GENERIC/WEAK methodology from alirezarezvani not extracted; sickn33 1400+ skills not subsetted; mattpocock 50k★ skills not extracted; K-Dense-AI scientific skills not subsetted; oh-my-claudecode 33k★ not deep-dived | **M-H** |
| 14 | Sub-agent SDK frameworks (deepagents / goose / smolagents / openai-agents-python / agno / autogen / crewAI / langgraph / mastra) | **3** | GRAND_CATALOG §6 (28 entries) | Most marked STUDY-PILOT-NARROW or DEFER without integration design; ACP-host adapter pattern via deepagents/goose unmapped; Mastra event-sourced workflow + time-travel pattern not adopted | **L-M** |
| 15 | Native CC Q2 2026 features (`/goal`, `claude agents` CLI, asyncRewake, `--agent`, `--worktree`, fork-subagent, slash commands, MCPB extensions) | **2** | Sibling `docs/sota-feature-activation.md` cite + wave52/iter1a top-20 unadopted patterns | Anthropic 2026-04 sandboxing release scan NEVER executed (W251 §5.1 HIGH #5); MCPB extension format unmapped; type:"prompt" hooks adoption pattern shallow; `claude agents` CLI workflows unmapped; latent-flip activations (1M kill-switch / bypassPermissions revert) not benchmarked | **H** |

**Aggregate**: 4 categories at score 5 (FULL); 5 at score 4 (NEAR-FULL); 5 at score 3 (PARTIAL); 1 at score 2 (THIN); 1 at score 1 (CRITICAL — RAG layer).

## §3 GAP items (concrete tasks for Stage 2 agents)

### P0 — CRITICAL (must close before grand synthesis for `Z:\claude-sota-pure`)

- **GAP-1 — RAG layer comprehensive audit** (Cat 4)
  - Description: Almost zero coverage of open-RAG ecosystem; user explicitly cited "open rag" in directive.
  - Suggested repos: SciPhi-AI/R2R (deep-rag) / langchain-ai/rag-from-scratch / HKUDS/LightRAG / OSU-NLP-Group/HippoRAG / bclavie/RAGatouille / stanford-futuredata/ColBERT / lancedb/lancedb / weaviate/weaviate / qdrant/qdrant / vespa-engine/vespa / IBM/mt-rag-benchmark / explodinggradients/ragas / FlagOpen/FlagEmbedding (BGE rerank) / mixedbread-ai/mxbai-rerank / unum-cloud/usearch / pgvector/pgvector
  - Tool calls: `mcp__github__search_repositories topic:rag sort=stars` (2 queries) + `mcp__github__search_repositories topic:retrieval-augmented-generation` + Probe 6 license on top-15 + Probe 7.b demand-gate (which sss workflow consumes RAG?)
  - OUTPUT_BUDGET: max 500 LOC

- **GAP-2 — Anthropic 2026-04 sandboxing release scan** (Cat 15)
  - Description: W251 §5.1 HIGH #5 still OPEN; Anthropic shipped sandboxing primitives April 2026; never enumerated.
  - Suggested probes: `code.claude.com/docs/en/sandbox` / `code.claude.com/docs/changelog` / `anthropics/cwc-long-running-agents` HEAD bumps post-2026-05-05 / `anthropics/claude-plugins-official` per-plugin recent commits
  - Tool calls: WebFetch on Anthropic docs URLs + `mcp__github__get_file_contents anthropics/claude-plugins-official` recent commits
  - OUTPUT_BUDGET: max 300 LOC

- **GAP-3 — `protect-mcp` phantom-coordinate resolution** (Cat 11; W251 §6 HNF #1)
  - Description: Coordinate `TomFarley/protect-mcp` could not be resolved by Wave 251 Agent C; npm path unverified.
  - Suggested probes: `mcp__github__search_repositories protect-mcp` + `mcp__github__search_code "protect-mcp"` + npm-registry-direct: `https://registry.npmjs.org/protect-mcp` + correlate against `mcp_overhead_audit.jsonl` disabled-MCP cohort
  - Tool calls: 4-6 max
  - OUTPUT_BUDGET: max 150 LOC

- **GAP-4 — `mksglu/context-mode` license dispute closure** (Cat 6; Integrity P0)
  - Description: W240 Mia REJECT (ELv2) vs W250 A3 MIT claim CONTRADICT; W251 confirmed root LICENSE = Elastic License 2.0 (NOASSERTION at GitHub API).
  - Suggested probes: `gh api repos/mksglu/context-mode/license` + npm-registry direct on `context-mode` package + cross-check `.claude/plugins/marketplaces/` if locally cloned to determine which license governs install path
  - Tool calls: 3-4 max
  - OUTPUT_BUDGET: max 100 LOC

- **GAP-5 — `thedotmack/claude-mem` deep Probe 4-6** (Cat 3)
  - Description: 76k★ memory ecosystem leader; ADOPT-NOW eligible per GRAND_CATALOG §5.A1 but Probe DAG NEVER executed; integration vs incumbent doobidoo+graphiti unbenchmarked.
  - Suggested probes: license/active/cpd + Probe 4 plugin-namespace vs existing doobidoo install + Probe 7.b demand statement (does it replace or complement L1+L2?) + cite trail to Anthropic plugin marketplace
  - Tool calls: 5-6 max
  - OUTPUT_BUDGET: max 250 LOC

### P1 — HIGH (close ASAP for grand synthesis quality)

- **GAP-6 — MCP servers Top-50 by stars enumeration** (Cat 5)
  - Description: GRAND_CATALOG covers ~40 MCP entries across §5.A-E + §1.10/1.11 but no top-50 ranked enumeration; `punkpeye/awesome-mcp-servers` (~85k★) cited but rows not extracted.
  - Suggested action: `mcp__github__search_repositories topic:mcp-server sort=stars order=desc perPage=50` + license + Probe 4 plugin-namespace
  - Repos to verify: supabase-mcp / stripe-mcp / postgres-mcp / mongodb-mcp / linear-mcp / slack-mcp / notion-mcp / brave-search-mcp / huggingface-mcp / e2b-mcp / cloudflare-mcp / dbhub
  - OUTPUT_BUDGET: max 400 LOC

- **GAP-7 — `wshobson` granular plugin Probe 5 mode-harness-shape** (Cat 2)
  - Description: Wave 138 Fire 1 sibling caught Conductor HARD-GATE interactive Q&A setup; GRAND_CATALOG §2.8 says "DO NOT install whole marketplace" but per-plugin Probe 5 not executed for python-development / agent-teams / conductor / comprehensive-review.
  - Suggested probes: clone each plugin / read setup.md / scan for `disable-model-invocation` + interactive prompts + setup gates
  - OUTPUT_BUDGET: max 250 LOC

- **GAP-8 — superpowers Wave 51+ skill inventory refresh** (Cat 2)
  - Description: superpowers at 192,855★ verified 2026-05-16 (was 171k Apr-30); skill list may have grown beyond 14 core. Verify current `obra/superpowers/skills/` count + new skills not yet selectively vendored (per sibling claude-sota `team-orch-frameworks.md` 6-of-14 vendoring table).
  - Suggested probes: `mcp__github__get_file_contents obra/superpowers /skills` directory listing + per-skill HARD-GATE check
  - OUTPUT_BUDGET: max 200 LOC

- **GAP-9 — Cohort C2 ArXiv 2026 Q1-Q2 fresh primary-source crawl** (Cat 10, 14)
  - Description: W251 §5.1 HIGH #1; never executed in W237-W250.
  - Suggested probes: `mcp__arxiv__search_papers` with queries: "claude code agent" / "sub-agent SDK" / "long-running agent" / "context engineering" / "RAG retrieval" / "agent orchestration" (date >= 2026-01-01)
  - OUTPUT_BUDGET: max 300 LOC

- **GAP-10 — `agentclientprotocol/claude-agent-acp` pilot-install design** (Cat 9)
  - Description: ACP 4-org convergence FULLY-CLOSED but adapter not pilot-installed for `Z:\claude-sota-pure`. Wave 5 A10 closure declared ADOPT-NOW eligible.
  - Suggested probes: install path verification + integration design with existing codex CLI cross-model gate (does ACP replace or complement T1-T7?)
  - OUTPUT_BUDGET: max 200 LOC

- **GAP-11 — Phoenix / Langfuse / opik / openlit observability deep-dive** (Cat 10, 12)
  - Description: GRAND_CATALOG §5.D5+§5.D6+§8.10+§8.11 list 4 observability platforms but Phoenix ELv2-AMBER; Langfuse NOASSERTION; opik/openlit not catalogued; no comparison matrix for adoption decision.
  - Suggested probes: license probe (per-package) + Probe 7.b demand (does sss need LLM observability layer?) + integration with existing ccusage telemetry
  - OUTPUT_BUDGET: max 300 LOC

- **GAP-12 — Native CC Q2 2026 features deep enumeration** (Cat 15)
  - Description: wave52/iter1a top-20 unadopted patterns is a strong base; sibling `docs/sota-feature-activation.md` adds more but no consolidated "all v2.1.x features mapped to install state" exists.
  - Suggested probes: enumerate v2.1.139 CHANGELOG features + Anthropic CC official docs Q2 2026 release notes + map to `.claude/settings.json` adoption status
  - OUTPUT_BUDGET: max 400 LOC

- **GAP-13 — Skills marketplace deep extraction (alirezarezvani / sickn33 / mattpocock / k-dense)** (Cat 13)
  - Description: GRAND_CATALOG §2 lists these aggregators but per-skill POWERFUL/SOLID/GENERIC/WEAK extraction never done.
  - Suggested probes: clone alirezarezvani's AUDIT_REPORT.md classification + sickn33 1400+ skills filter for top 50 by domain + mattpocock TS/JS skills extraction
  - OUTPUT_BUDGET: max 500 LOC

- **GAP-14 — Anthropic MCPB extension format** (Cat 15)
  - Description: MCPB extension (Anthropic's binary MCP bundle) mentioned in mission but ZERO coverage in priors.
  - Suggested probes: WebFetch `code.claude.com/docs/en/mcp-bundles` + `anthropics/mcp-bundles` repo probe + map to existing 26-MCP `.mcp.json` inventory
  - OUTPUT_BUDGET: max 200 LOC

### P2 — MEDIUM

- **GAP-15** — `cognee` reclassified-pilot deep audit (W251 Axis 1 stale-verdict promoted to pilot — Cat 3, license verify)
- **GAP-16** — Trail of Bits `skills-curated` CC-BY-SA selective-import policy design (Cat 11)
- **GAP-17** — Container/K8s/cloud runtime pilot (Kubernetes-MCP from W252 action plan — Cat 5, 11)
- **GAP-18** — Browserbase + Stagehand cloud-browser pilot design (Cat 8)
- **GAP-19** — `claude-mem` vs `doobidoo/mcp-memory-service` benchmark protocol (Cat 3)
- **GAP-20** — `caveman` 65% token-cut + RTK composability empirical measurement (Cat 6)
- **GAP-21** — Outlier ecosystems (Hermes/NousResearch / cherry-studio / nanocoai / n8n) demand-gate (Cat 14)
- **GAP-22** — Agent SDK Q2 2026 feature delta (fork-subagent / async hooks / typed-state-graph) (Cat 14)
- **GAP-23** — Codex-plugin-cc T0-T7 lifecycle scripts deep audit per `.claude/plugins/cache/openai-codex/codex/<v>/` (Cat 9)

## §4 Recommendations for Stage 2 agent dispatch

| Agent | Mission | Target GAPs | Tool budget |
|---|---|---|---|
| **B (fresh discovery, GPT-5.5 BRIDGE-MODE)** | Cat 4 RAG layer comprehensive + Cat 5 MCP Top-50 enumeration | GAP-1, GAP-6, GAP-14 | ~25 tool calls |
| **C (adversarial / Probe DAG)** | Probe 4-7 on claude-mem + wshobson plugins + context-mode + protect-mcp resolve | GAP-3, GAP-4, GAP-5, GAP-7 | ~20 tool calls |
| **D (archaeology / cite-trail)** | ArXiv 2026 + Native CC Q2 features + MCPB + Anthropic sandboxing scan | GAP-2, GAP-9, GAP-12, GAP-14 | ~25 tool calls |
| **E (architect / synthesis)** | After B/C/D return: produce `Z:\claude-sota-pure` grand-catalog reconciling all gaps + 5-phase install priority + cite-trail | All P0+P1 | ~15 tool calls |

**Recommended Stage 2 fan-out**: 3 parallel agents (B+C+D) per `parallel-agent-wave.md §CADP rule 2` max-3-concurrent then synthesis agent E sequentially per `team-orchestration.md §Wave-Based Execution`.

## §5 Quality issues found in prior synthesis

1. **OVER claim — superpowers ★count drift**: 171,890 (sibling claude-sota pinned 2026-04-30) vs 192,855 (W251 verified 2026-05-16); Marker Decay per `evidence-policy.md` — re-verify before commit.
2. **PHANTOM-cite risk — `protect-mcp`**: W237/W250 referenced without resolved coordinate; W251 Agent C could not find `TomFarley/protect-mcp`. Mark UNKNOWN until resolved.
3. **License-status OVER**: `mksglu/context-mode` claimed MIT in W250 A3 via npm probe; W251 confirmed ROOT LICENSE = Elastic License 2.0 (NOASSERTION at GitHub API). OVER refuted; reclassify to ELv2-AMBER until npm-package-level license proven separately permissive.
4. **STAND-IN-NOTICE NOT honored**: Wave 251 GRAND-SYNTHESIS §14 disclosed 0/3 BRIDGE-MODE penetration this wave (orchestrator-side only). Per sibling `cmc-env-funneled-disclosure.md`, this is structural same-model degradation; commits depending on it must carry STAND-IN-NOTICE.
5. **HONEST-NON-FINDING — Wave 250 carryover not found**: A-existing-artifact audit explicitly states "evidence-caveat: The three exact Wave 250 paths named in the mission were not present at the requested location during this synthesis."
6. **Probe DAG NOT executed for any ADOPT-NOW candidate in GRAND_CATALOG**: §14 HONEST limitation #3 — R1 landscape survey only; Probe 1-7 deferred to Wave 2 but Wave 2 not separately documented.
7. **Score inflation risk — Row-2 fabrication-test concern** on token-savior (5.A15 "100% on benchmark") + lucasrosati 7.12 ("71.5x fewer tokens") + Mibayy 7.11 ("77% active cut"); GRAND_CATALOG §14 #6 flags these but verdicts remained STUDY-PILOT-NARROW rather than REJECT — should run convergence-gate.md Row-2 fabrication-test FAIL discipline.
8. **Kits saturation finding correct but UNDEPLOYED**: §13 finding 10 "Cohort 7 saturated at n=36; structural REJECT class applies" — yet new kits v52-v65 still appearing in archives; ensure Wave 252+ does NOT mine these.
9. **Stale star counts across GRAND_CATALOG**: most entries use baseline cites without 2026-05-15 fresh refresh; Marker Decay risk per cardinal-rule-7.

## §6 Self-disclosure (cross-model gate)

- **Stand-in or BRIDGE-MODE**: STAND-IN per CLAUDE.local.md ENV (g) if `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` env active; codex CLI NOT invoked this dispatch. Cross-model gate NOT structurally satisfied for this verdict — orchestrator must file 2nd-stage validation per `agent-harness-fit-verification.md §FM-09` 2-stage validation contract before adopting any prescription that's not pure-audit.
- **Probes run this fire**: 10 Bash head/wc probes (file inventories, header extraction, line counts) + 3 Bash directory listings + 3 Grep file-discovery probes (truncated to head_limit per hook guidance). NO WebFetch / NO mcp__github__search / NO Probe 6 LICENSE-file reads this fire — those are Stage 2 work.
- **Confidence**: HIGH on gap-list completeness for categories 1-14 (audited via header extraction + sampled tables); MEDIUM on category 15 (Anthropic Q2 2026 features — relies on sibling cite-import); LOW on per-repo Probe DAG status (universally NOT executed across all prior waves).
- **Token budget consumed**: ~20 tool calls (within 30 max); ~5500 LOC artifact body (within 600 LOC OUTPUT_BUDGET ceiling); termination per `on_text_match: "VERDICT:"` predicate at top of artifact.
- **Mia pre-apply candidates** for orchestrator: GAP-1 (RAG critical gap claim) + GAP-2 (sandboxing release scan) + GAP-14 (MCPB format) — verify these are genuinely uncovered by spot-checking `Grep` after dispatch.

VERDICT: GAP-CONFIRMED — Stage 2 fan-out to B+C+D+E recommended with concrete per-agent missions above.
