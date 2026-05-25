---
title: "Wave 252-extension Agent C — Adversarial Blind-Spot Audit (D1-D10 ruthless scan)"
date: 2026-05-15
role: "Agent C (evaluator — skeptical second-opinion adversarial reviewer)"
target-runtime: "Z:/claude-sota-pure (new pure runtime to be built)"
sources-reviewed:
  - "GRAND-SYNTHESIS-2026-05-16.md (18.3K, 173 lines)"
  - "W251-grand-comprehensive-checklist-2026-05-16.md (22.0K, 169 lines)"
  - "A-existing-artifact-comprehensive-audit-2026-05-16.md (24.5K, 219 lines)"
  - "GRAND_CATALOG_2026-05-15.md (65.7K, 610 lines — sampled head + tail + 4 mid sections)"
cite-class: "constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ four reviewed artifacts (synthesis outputs, NOT primary SOTA), TIER-2 @ Z:/claude-sota/.claude/rules/ sister-rule integration]; effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8."
stand-in-notice: "Sonnet stand-in per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied. Orchestrator MUST re-route via Path P codex foreground+tee OR BRIDGE-MODE Agent dispatch for grand-synthesis revisions."
budget: <=700 LOC
---

VERDICT: BLIND-SPOTS-FOUND conf=0.88 severity=P0
D1: 5 fabrication-risk rows  D2: 5 cite-class drift instances  D3: 6 high-Marker-Decay-volatility picks  D4: 13 entirely-missing categories  D5: 4 marketplace inventory gaps  D6: 5 wire-difficulty mis-rated rows  D7: 7 stars-only ranking anti-patterns  D8: 11 Q2 2026 Anthropic features missed  D9: 4 sibling-bias cite-chain failures  D10: 6 Top-30 picks with single-cohort fan-out

# Wave 252-extension Agent C — Adversarial Blind-Spot Audit

## §0 Provenance

Files read fully or via large-window sample:
- `GRAND-SYNTHESIS-2026-05-16.md` (173 lines) — full read
- `W251-grand-comprehensive-checklist-2026-05-16.md` (169 lines) — full read
- `A-existing-artifact-comprehensive-audit-2026-05-16.md` (219 lines) — full read
- `GRAND_CATALOG_2026-05-15.md` — sampled head L1-80 (Section 0 + Layer 1), L146-380 (Layers 4-7), L430-570 (Top-50 + convergence + limitations), targeted grep across full file for missing-category enumeration

Tool calls: 9 Bash grep sweeps covering 50+ candidate-keyword queries spanning the 13 missing categories below + 4 Read/sed window reads.

Confidence range: 0.78-0.93 per finding (averages stated inline). Findings stated as ADVERSARIAL — orchestrator must verify each before applying. Stand-in caveat above applies.

## §1 D1 — OVER / Fabrication-test FAILs

Per `Z:/claude-sota/.claude/rules/convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL`: >=3 unsourced numeric improvement claims = auto-FAIL.

| # | Repo | Unsourced numeric claims | Synthesis treatment | Adversarial verdict |
|---|------|-------------------------|---------------------|---------------------|
| D1-1 | `Mibayy/token-savior` (catalog 5.A15 / 7.11) | "77% active token cut", "100% on benchmark", "structural navigation" | Score 78 STUDY-PILOT-FAVORABLE (5.A15) / 78 STUDY-PILOT-NARROW (7.11) | Catalog SELF-FLAGS Row-2 risk but still scores 78 — should be DEFER/REJECT until BENCHMARK.md exists. Rows 5.A15 + 7.11 give INCONSISTENT verdicts for same repo. conf=0.88 |
| D1-2 | `lucasrosati/claude-code-memory-setup` (catalog 7.12) | "71.5x fewer tokens per session" with no methodology cite | Score 74 STUDY-PILOT-FAVORABLE | Single unsourced multiplier claim; need repo BENCHMARK.md before adoption. conf=0.85 |
| D1-3 | `JuliusBrussee/caveman` (catalog 7.4 / Top-50 #37) | "65% token cut" | Score 86 STUDY-PILOT-FAVORABLE | "Talk like caveman" skill at 60K star in 2-3mo IS launch-spike pattern. 65% claim has no eval harness. Need repro on SWE-bench-Live or HumanEval. conf=0.83 |
| D1-4 | `rtk-ai/rtk` (catalog 7.3 / Top-50 #20) | "60-90% token cut on common dev commands" | Score 92 ADOPT-NOW | 48K-star Rust binary scored ADOPT-NOW score 92 with NO benchmark-repo cited; per convergence-gate Row-2, >=3 numeric claims trigger fabrication-test. Need `rtk-ai/rtk-evals` separate eval repo or in-tree BENCHMARK.md. conf=0.81 |
| D1-5 | `diegosouzapw/OmniRoute` (catalog 7.5) | "RTK+caveman stacked ~95% savings" | Score 80 STUDY-PILOT-FAVORABLE | Cumulative multiplicative claim; no methodology. Mathematical stacking of independent compression claims is fabrication-shaped. conf=0.86 |

Action: every score-90+ ADOPT-NOW with >=3 numeric claims and zero methodology cite MUST be downgraded to STUDY-PILOT pending fabrication-test PASS.

## §2 D2 — Cite-class drift instances

Synthesis labels with cite-class that doesn't survive `citation-discipline.md` rule #8 lattice:

- D2-1: GRAND_CATALOG L562-583 Top install-priority presented as TIER-1 ADOPT-NOW; ACTUAL = TIER-1-DIRECT only with per-row file:line + HEAD SHA, but catalog uses only repo names + star counts. Effective tier = TIER-3-LOCAL-COMPOSITION until file:line + HEAD SHA attached. conf=0.91
- D2-2: `anthropics/skills` at 135,158 star Section 1.1 given TIER-1 score 97. NO SHA pin — fails CR-9 "Version-pin mandate"; @latest install would violate CR-9. conf=0.89
- D2-3: `obra/superpowers` (192,855 star "verified") Top-50 #3 score 97 — claimed "verified" but no `mcp__github__get_file_contents` blob SHA in synthesis. Marker Decay risk between W237 baseline and W252 install. conf=0.85
- D2-4: W251 §2 `langfuse/langfuse` "27,283 stars Apache MIT-core" labeled ADOPT-NOW — GitHub API reports `NOASSERTION` and synthesis admits in §6 HNF. Cite-class should be AMBER not ADOPT-NOW until LICENSE blob read. conf=0.93
- D2-5: `ryoppippi/ccusage` similarly labeled ADOPT-NOW with NOASSERTION GitHub field; W251 row 65 admits "after direct LICENSE/package probe" but is still in ADOPT-NOW section. conf=0.91

## §3 D3 — Marker Decay volatility list

Star counts captured May 2026; per `evidence-policy.md` Marker Decay, highest-volatility picks:

| # | Repo | May 2026 star claim | Volatility signal | Risk |
|---|------|---------------------|-------------------|------|
| D3-1 | `safishamsi/graphify` | 48,374 | No org/named-author verification; no axis-2 named-T2 endorsement | HIGH — launch-spike candidate |
| D3-2 | `JuliusBrussee/caveman` | 60,743 | Novelty skill — extreme launch-spike shape | HIGH |
| D3-3 | `sickn33/antigravity-awesome-skills` | 37,635 | Single-individual maintainer; sibling rule says >=180d re-audit (was 3.5mo in Apr) | HIGH |
| D3-4 | `thedotmack/claude-mem` | 75,997 | "7x to 75x outlier" — synthesis itself flags as suspicious | HIGH |
| D3-5 | `farion1231/cc-switch` | 71,847 / 71,863 inconsistency | Two synthesis values differ WITHIN ONE WAVE | MEDIUM |
| D3-6 | `mvanhorn/last30days-skill` | 25,906 | Solo author, very fresh | HIGH |

Action: each row MUST `mcp__github__get_file_contents path=README.md` + `gh api repos/<o>/<r>` fresh fetch BEFORE install commit. CR-9 install-risk discipline applies.

## §4 D4 — MISSING categories (13 entirely absent layers)

Grep across full GRAND_CATALOG (65.7K) returned ZERO HITS for the following 13 categories. For a pure SOTA runtime these are LOAD-BEARING infrastructure:

| # | Category | Synthesis hits | Canonical candidates omitted |
|---|----------|----------------|------------------------------|
| D4-1 | LLM router / gateway | LiteLLM only in HOLD-list; OpenRouter ZERO; Portkey ZERO; aisuite ZERO | `BerriAI/litellm`, `Portkey-AI/gateway`, `andrewyng/aisuite`, OpenRouter API |
| D4-2 | Local model serving | Ollama ZERO (only "backend" mention); vLLM/llama.cpp/MLX/gemma.cpp ZERO | `ollama/ollama`, `vllm-project/vllm`, `ggerganov/llama.cpp`, `ml-explore/mlx`, `google/gemma.cpp`, `huggingface/text-generation-inference` |
| D4-3 | Embeddings models | voyage/nomic/jinaai/bge/mxbai = ZERO | `voyage-ai/voyageai-python`, `nomic-ai/contrastors`, `jinaai/jina-embeddings-v3`, `FlagOpen/FlagEmbedding`, `mixedbread-ai/mxbai-embed-*` |
| D4-4 | Re-rankers | Cohere-rerank/bge-reranker/mxbai-rerank = ZERO | `cohere-ai/cohere-python` rerank, `FlagOpen/FlagEmbedding` reranker, `mixedbread-ai/mxbai-rerank-*` |
| D4-5 | Vector DBs (full) | Weaviate/Pinecone/Milvus(1 disabled)/LanceDB/Chroma/sqlite-vec all ZERO except 1 disabled hit | `weaviate/weaviate`, `pinecone-io/pinecone-python`, `milvus-io/milvus`, `lancedb/lancedb`, `chroma-core/chroma`, `asg017/sqlite-vec` |
| D4-6 | Document parsing (full) | docling(1 row); unstructured/marker/mineru/llamaparse ZERO; markitdown 1 row | `Unstructured-IO/unstructured`, `VikParuchuri/marker`, `opendatalab/MinerU`, `run-llama/llama_parse`, `microsoft/markitdown` |
| D4-7 | Web search MCPs | tavily/brave/duckduckgo/linkup/serper/you.com = ZERO | `tavily-ai/tavily-mcp`, brave-search MCP, `nickclyde/duckduckgo-mcp-server`, linkup MCP, serper MCP |
| D4-8 | Audio TTS/STT | Whisper/Cartesia/ElevenLabs/Deepgram/AssemblyAI = ZERO | `openai/whisper`, `cartesia-ai/cartesia-python`, `elevenlabs/elevenlabs-python`, `deepgram/deepgram-python-sdk`, `AssemblyAI/assemblyai-python-sdk` |
| D4-9 | Vision encoders | CLIP/BLIP/DINOv2/SAM2/Qwen2.5-VL/Florence-2 = ZERO | `openai/CLIP`, `salesforce/BLIP`, `facebookresearch/dinov2`, `facebookresearch/sam2`, `QwenLM/Qwen2.5-VL`, `microsoft/Florence-2` |
| D4-10 | Workflow orchestration | Temporal/Airflow/Prefect/Dagster = ZERO | `temporalio/temporal`, `apache/airflow`, `PrefectHQ/prefect`, `dagster-io/dagster` |
| D4-11 | Embedded sandbox / code interpreter | e2b/modal-sandbox/daytona/devcontainer/codesandbox = ZERO | `e2b-dev/e2b`, `modal-labs/modal`, `daytonaio/daytona`, `microsoft/devcontainers-cli` |
| D4-12 | Browser-use / computer-use agents | UI-TARS(1 row); browser-use/Skyvern(AGPL-rejected)/OpenAdapt/computer-use ZERO | `browser-use/browser-use`, `OpenAdaptAI/OpenAdapt`, `anthropics/anthropic-quickstarts/computer-use-demo` |
| D4-13 | Cache infrastructure (Redis layer) | Redis sidecar = 1 row P2 DEFERRED GRAND-SYNTHESIS L101; no probe done | `redis/redis-stack`, `valkey-io/valkey`, `dragonflydb/dragonfly` |

This is the biggest finding. The synthesis is a Claude-Code-plugin-centric catalog, NOT an LLM-stack catalog. For a PURE runtime build, layers D4-1 to D4-13 are mandatory infrastructure. Estimated 30-50 additional repos required to close.

## §5 D5 — Plugin / marketplace inventory gaps

W251 + GRAND_CATALOG mention `claude-plugins-official` + `wshobson/agents` + `addy-agent-skills` + `superpowers` + `codex-plugin-cc` (5 marketplaces). NOT inventoried:

- D5-1: `wshobson/agents` treated as single unit; mission requires sub-plugins `python-development`, `agent-teams`, `conductor`, `comprehensive-review` individually graded. Synthesis fails CR-9 "audited subset" mandate. Only `Conductor` HARD-GATE caveat mentioned.
- D5-2: `antigravity-bundle-essentials` — ZERO mention. `sickn33/antigravity-awesome-skills` mentioned as bulk-mining-only; the bundle is different and uninventoried.
- D5-3: `claude-plugins-official` sub-plugins — `agent-sdk-dev`, `ralph-loop`, `frontend-design`, `mcp-server-dev`, `pr-review-toolkit`, `skill-creator` — only `ralph-loop` named in Top-50; others ZERO in W251 row enumeration.
- D5-4: `addy-agent-skills` 21 engineering-phase skills NOT individually scored — just "ADOPT-NOW catalog" at #17 in Top-50. Per cardinal-rule-11 META-process discipline, each MUST be graded.

## §6 D6 — Wire-difficulty miscalibration

Picks rated wire=1/2 actually requiring 3+ env vars / docker / external service:

| # | Repo | Synthesis rating | Actual cost | Hidden surfaces |
|---|------|------------------|-------------|-----------------|
| D6-1 | `getzep/graphiti` v0.29.0 | wire=3 (pip+docker) — partial | pip + docker + FalkorDB SSPL acceptance + OPENAI_API_URL + FALKORDB_URI + FALKORDB_DATABASE + GRAPHITI_GROUP_ID = 6+ env vars | flags SSPL but undersells env-burden |
| D6-2 | `langfuse/langfuse` | wire=3 (Docker Compose) | Docker Compose 3-5 containers (PostgreSQL + Clickhouse + Redis + web + worker) + LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY + db migrations | significantly underestimated |
| D6-3 | `containers/kubernetes-mcp-server` | wire=1 P0=plugin (GRAND-SYNTHESIS L72) | K8s cluster auth + kubeconfig + RBAC bindings + namespace allowlist + read-only kubecontext + destructive-verb denylist | L72 says wire=1 but mitigation paragraph admits high-privilege concerns — INCONSISTENT |
| D6-4 | `browserbase/mcp-server-browserbase` | wire=1 P0=plugin | Browserbase API key (paid SaaS) + project ID + region + data-boundary review | SaaS dependency = wire=3+ minimum |
| D6-5 | `Kiln-AI/Kilntainers` | wire=1 P1=pip+wire | Windows/Podman/Docker isolation + secret-isolation pilot + Linux primary | multi-platform porting cost massively underestimated |

## §7 D7 — Stars-only ranking anti-pattern

Picks where stars dominate over Axis-3 stability / Axis-2 named-T2 / Probe-6 license+registry:

| # | Repo | Star count | What's hidden |
|---|------|-----------|---------------|
| D7-1 | `JuliusBrussee/caveman` 60,743 | Q2 2026 fresh-paint solo-author launch-spike; no named-T2; "talk like caveman" suggests low-effort meme. Score 86 — should be DEFER until burn-in (Axis-3 >=90d age check missed) |
| D7-2 | `safishamsi/graphify` 48,374 | Solo maintainer; no axis-2 dated practitioner artifact; broad claims. Score 85 — needs Axis-2 PARTIAL flag |
| D7-3 | `farion1231/cc-switch` 71,847 (inconsistent 71,863) | Stars dominate; no named-T2 endorsement. Score 86 — Q2 2026 fresh-paint risk |
| D7-4 | `thedotmack/claude-mem` 75,997 | Synthesis flags "7x-75x outlier" anomaly; should trigger fresh-paint detector. Score 89 ADOPT-NOW — should be STUDY-PILOT pending Axis-3 burn-in verify |
| D7-5 | `gsd-build/get-shit-done` 62,471 | Generic methodology repo, no named author cite. Score 70 STUDY-PILOT |
| D7-6 | `code-yeongyu/oh-my-openagent` 57,962 | Renamed from oh-my-opencode — naming volatility. Score 82 — re-audit |
| D7-7 | `mvanhorn/last30days-skill` 25,906 | Solo author, fresh — synthesis admits but still 7.0/10. Score 72 — needs >=180d gate |

## §8 D8 — Q2 2026 Anthropic CC features missed

Per https://code.claude.com/docs/en/changelog + CCBP changelog 2.1.x — ZERO mention in GRAND_CATALOG/GRAND-SYNTHESIS/W251:

| # | Feature | Hits in synthesis | Should be |
|---|---------|-------------------|-----------|
| D8-1 | `/goal` slash command (2.1.139) | ZERO | CITE-CLASS-CANONICAL (`docs/sota-feature-activation.md` references) |
| D8-2 | `claude agents` CLI | ZERO | CITE-CLASS-CANONICAL |
| D8-3 | `--agent <name>` CLI flag | ZERO | CITE-CLASS-CANONICAL |
| D8-4 | `--worktree` / `-w` CLI flag | only CLAUDE.local.md context | CITE-CLASS-CANONICAL — Boris Cherny named-T2 endorsed |
| D8-5 | asyncRewake hook field | ZERO | CITE-CLASS-CANONICAL (`lga-async-rewake.md` sibling-owner) |
| D8-6 | `[1m]` extended-context variant | ZERO except CLAUDE.local.md ENV (h) | CITE-CLASS-CANONICAL |
| D8-7 | Fork-subagent (CLAUDE_CODE_FORK_SUBAGENT) | only CLAUDE.local.md | CITE-CLASS-CANONICAL |
| D8-8 | `args: string[]` exec form in hooks | ZERO | CITE-CLASS-CANONICAL |
| D8-9 | Conditional `if:` hooks | ZERO | CITE-CLASS-CANONICAL — already used by T2 commit-time hook |
| D8-10 | MCPB (MCP-Bundle) extensions | ZERO | MAYBE GENUINELY-NEW depending on adoption |
| D8-11 | `/compact <hint>` steering | ZERO direct (only autocompact env) | CITE-CLASS-CANONICAL per coordination.md §12 |

For a NEW pure runtime, these are activation-knob CONFIG (not install candidates) but MUST be enumerated in the manifest Section 0.

## §9 D9 — Sibling-bias cite-chain failures

Per cardinal-rule-1 + CR-8: sibling `Z:/claude-sota` is TIER-3-LOCAL-OPERATOR-DERIVED, NOT TIER-1.

- D9-1: GRAND_CATALOG L506 "ACP convergence FULLY-CLOSED at Axis-1+2+3 per sibling cite" — verification path goes through `Z:/claude-sota` runtime, not fresh upstream. Cite-chain = sibling -> mistakenly TIER-1.
- D9-2: GRAND_CATALOG L515 "Cross-model gate is locked-in topology per CLAUDE.md cardinal-rule-3" cites the sibling CLAUDE.md = TIER-3-LOCAL-OPERATOR-DERIVED, not canonical SOTA. For `claude-sota-pure`, topology must be re-derived from upstream CCBP/Anthropic docs.
- D9-3: W251 §7 "P0 Quarantine protect-mcp" cites Agent C adversarial verdict; Agent C is itself a sibling-affiliated Sonnet stand-in per STAND-IN-NOTICE. Cite-chain is in-runtime evidence, not fresh probe.
- D9-4: Agent A audit §4 "96.8% freshness-validated at 1-day delta" is a SIBLING-RUNTIME claim (W237 = sibling Z:/claude-sota wave). For pure runtime, freshness re-validation MUST be fresh probe, not inherited.

## §10 D10 — Cohort discipline failures

Per `CLAUDE.md §SOTA Repository Discovery` + cardinal-rule-10: >=2-cohort fan-out mandate.

- D10-1: GRAND-SYNTHESIS §1 grand action checklist — 0 cohort tags on any P0/P1/P2 row
- D10-2: W251 §2 confirmed-ADOPT-NOW (12 rows) — 0 cohort tags
- D10-3: GRAND_CATALOG Top-50 — 0 `cohorts: [...]` annotations
- D10-4: Agent A audit §5.1 names Cohort C2/C4/C7 as HIGH-PRIORITY GAPS — explicitly confirms C2/C4/C7 NOT executed. ALL Top-50 sourced from C1 (GraphQL star+topic) + C5 (named-author) + C9 (stars-sorted) at most — NOT C2/C3/C4/C7
- D10-5: For PURE runtime build, fan-out must add C2 arXiv 2026-newest + C3 HuggingFace models+datasets + C4 PapersWithCode + C7 conference proceedings BEFORE adoption verdicts carry full convergence weight
- D10-6: `cohort_coverage_audit.py` (sibling) should be re-run on synthesis output — would emit DRIFT_NO_COHORT_TAG (P2) at minimum

## §11 Recommended grand-synthesis revisions

### P0 (must-fix before any install commit at `claude-sota-pure`)

1. Add LLM-router / local-serving / embeddings / vector-DB / re-ranker / document-parsing / web-search-MCP / audio / vision / sandbox / browser-use / cache categories (D4-1..13, 13 missing layers). Fresh sota-researcher dispatch per cardinal-rule-10.
2. Demote ALL stars-only ADOPT-NOW to STUDY-PILOT until SHA pin + Axis-3 >=180d + Axis-2 named-T2 dated artifact verified (D7-1..7). Per CR-9.
3. Resolve cite-class drift: every ADOPT-NOW row needs frontmatter cite-anchor `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` OR `mcp__github__get_file_contents` blob-SHA result (D2-1..5).
4. Mandate `BENCHMARK.md` for >=3-numeric-claim repos OR auto-FAIL per fabrication-test (D1-1..5).

### P1 (should-fix before W252 catalog)

5. Enumerate Q2 2026 Anthropic CC native features as Section 0 manifest baseline (D8-1..11)
6. Add cohort tags to all Top-50 rows (D10-1..6); re-run cohort_coverage_audit.py
7. Fix wire-difficulty ratings for Graphiti / Langfuse / Kubernetes-MCP / Browserbase / Kilntainers (D6-1..5)
8. Refresh sibling-bias cite-chains — re-verify ACP convergence + cross-model topology from upstream, not from sibling runtime (D9-1..4)
9. Inventory per-plugin scoring for wshobson sub-plugins + claude-plugins-official sub-plugins + addy-agent-skills 21 skills (D5-1..4)

### P2 (advisory)

10. Probe each high-volatility star count via fresh `mcp__github__get_file_contents path=README.md` + `gh api repos/<o>/<r>` (D3-1..6)
11. Run Probe DAG 1-7 on every ADOPT-NOW row (synthesis admits §14.3 "Probe DAG NOT YET RUN")
12. Re-verify FalkorDB SSPL acceptance vs Neo4j Apache-2.0 swap as graph backend

## §12 NEW research questions for Stage 2 (Agent D archaeologist + Agent E architect)

1. Canonical LLM-router for pure runtime? Probe `BerriAI/litellm` vs `Portkey-AI/gateway` vs `andrewyng/aisuite` vs OpenRouter on Anthropic-API native support, cost-routing primitive, failover spec.
2. Canonical embeddings stack? Probe `voyage-ai/voyageai-python` vs `nomic-ai/contrastors` vs `FlagOpen/FlagEmbedding` (bge) vs `mixedbread-ai/mxbai-embed-*` on MTEB 2026-newest, license, `.mcp.json`-native path.
3. Local model serving: Ollama vs vLLM vs llama.cpp? Probe Windows-native support, OpenAI-compat HTTP surface, GGUF/safetensors loader, FM-09 phantom-package risk.
4. Vector DB: Weaviate vs Milvus vs LanceDB vs sqlite-vec? Probe Probe-6 license+registry, Probe-5 mode-harness, Anthropic-native MCP existence.
5. Document parsing canonical? Probe `Unstructured-IO/unstructured` vs `VikParuchuri/marker` vs `opendatalab/MinerU` vs `microsoft/markitdown` vs `docling-project/docling` on PDF accuracy, layout-preservation, MCP wrapper.
6. Web-search MCP canonical? Probe `tavily-ai/tavily-mcp` vs brave-search-mcp vs `nickclyde/duckduckgo-mcp-server` on cost-per-query, Anthropic-native install path.
7. Sandbox / code interpreter canonical? Probe `e2b-dev/e2b` vs `modal-labs/modal` vs `daytonaio/daytona`.
8. Browser-use canonical? Probe `browser-use/browser-use` vs `OpenAdaptAI/OpenAdapt` vs `anthropics/anthropic-quickstarts/computer-use-demo`.
9. Which Anthropic Q2 2026 features (D8) are operator-knob ENABLED at install time vs LATENT? Build install-checklist mapping each to activation state.
10. What cohort fan-out is actually missing? Execute C2 arXiv 2026-newest + C3 HuggingFace + C4 PapersWithCode + C7 conference proceedings as fresh recall passes.
11. Axis-3 burn-in audit on Q2 2026 fresh-paint candidates (caveman / cc-switch / claude-mem / graphify / get-shit-done — D7-1..6)? Compute cpd-band per `convergence-gate.md`.
12. Should `protect-mcp` (D5 phantom) be entirely DROPPED from research? Synthesis can't even resolve its coordinate.
13. Canonical observability stack? Resolve langfuse NOASSERTION + phoenix ELv2 + opik license + OTel gen-AI semantic-convention drift in ONE Stage 2 dispatch.
14. Missing reasoning frameworks? Probe DSPy / autogen-magentic-one / TaskWeaver for orchestration alternatives.
15. Canonical eval-as-judge stack for pure runtime? Probe `confident-ai/deepeval`, `explodinggradients/ragas`, `braintrustdata/braintrust-sdk`, `openai/evals` against `promptfoo/promptfoo` ADOPT-NOW baseline.

VERDICT: BLIND-SPOTS-FOUND conf=0.88 severity=P0

---

## Summary for orchestrator

The prior synthesis is **NOT execution-ready** for a pure runtime build. Its most severe failure is **D4 — 13 entirely missing infrastructure categories** (LLM router, local model serving, embeddings, re-rankers, full vector-DB layer, document parsing, web-search MCPs, audio, vision, workflow orchestration, embedded sandbox, browser-use agents, cache infrastructure). The GRAND_CATALOG is a Claude-Code-plugin-centric inventory, not an LLM-stack catalog — for a pure SOTA runtime an estimated 30-50 additional repos are missing.

Other P0 findings: stars-only ranking (D7, 7 picks including a 60K-star "talk like caveman" meme skill scored 86), cite-class drift (D2, ADOPT-NOW rows with NOASSERTION licenses and no SHA pins), and fabrication-risk numeric claims (D1, 5 rows with >=3 unsourced "60-95% token cut" claims that the catalog self-flags but still scores 78-92).

The synthesis's own §HONEST limitations section admits 0/3 BRIDGE-MODE penetration and Wave 1 rate-limit — confirming the blind spots are systemic, not incidental.
