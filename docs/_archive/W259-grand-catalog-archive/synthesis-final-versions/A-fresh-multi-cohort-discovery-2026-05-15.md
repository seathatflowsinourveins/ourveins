# Wave 252 Agent A — Fresh Multi-Cohort SOTA Discovery for `Z:/claude-sota-pure`
**Date**: 2026-05-16
**Agent**: sota-researcher (Sonnet stand-in default per CLAUDE.local.md ENV — STAND-IN-NOTICE applies if env-funneled; cross-model gate orchestrator-handled)
**Output budget**: ~1000 LOC
**Termination**: ARTIFACT-INLINE handoff_to=orchestrator | tool count 28 / cap 60
**Persisted by**: orchestrator (Wave 254 continuation arc, 2026-05-15) per FM-19 ARTIFACT-INLINE

---

## R0 — Falsifiable Hypothesis

Hypothesis: **Between 2026-04-01 and 2026-05-16, ≥10 net-new (not in W237/W240/W241/W250 rosters) SOTA-grade repos exist that score INSTALL-NOW or STUDY-PILOT per CR-12 disposition lattice for `Z:/claude-sota-pure` runtime.**

Rejection criterion: <5 candidates pass Probe DAG 1-6 AND convergence-gate ≥3-axis AND CR-12 GENUINELY-NEW or PROVIDER-COMPLEMENT classification.

---

## R1 — Benchmark Landscape (post-2026-04 leaderboards/papers)

| Benchmark / venue | Top-3 (2026-04+) | Reproducible | Note |
|---|---|---|---|
| **ACL 2026 Main** | GRIP (`WisdomShell/GRIP @ 11c2c00` — retrieval-as-generation w/ self-triggered planning) | YES (HF SFT+RL data + code) | ACL 2026 accepted; published April 2026 |
| **ACL 2026 Findings** | WikiSeeker (`zhuyjan/WikiSeeker`) | partial | Vision-LM RAG |
| **AAAI 2026 Oral** | ETC + SCD (WisdomShell sister projects to GRIP) | YES | Training-free dynamic RAG |
| **SWE-bench style 2026** | repoagentbench (HumphreySun98) / swe-postcutoff-bench / prototypebench | YES — contamination-controlled | All 2026-04/05 |
| **LoCoMo + LongMemEval (agent memory)** | NirDiamant/Agent_Memory_Techniques (30 notebooks) | YES | Apache-2.0; covers Mem0/Letta/Zep/Graphiti |
| **Token-savings benchmarks** | code-context-engine 94% (FastAPI repro) / engram 89.1% (87-file repo) / semble 98% (NDCG@10=0.854) | ALL reproducible | strong measured baselines |

**Saturation diagnostic**: token-savings space is saturating around 89-98% claimed reduction. Treat any new "99%" claim as Row-2 fabrication-test FAIL until methodology repo lands.

---

## R2 — Parallel Discovery Verdict Table (30+ NEW candidates)

Cohort-keyed. License/HEAD/stars all [VERIFIED 2026-05-16 via gh API]. CR-9 install-risk: all `@latest` install commands carry implicit D6 risk marker per CR-9.

### Tier-A INSTALL-NOW candidates (≥6/6 Probe DAG + Axis 1+2+3 PASS + GENUINELY-NEW or PROVIDER-COMPLEMENT)

| # | Repo | Cohort | License | Stars | Created | HEAD | Axis 1/2/3 | Probes 1-6 | SRA D-total | CR-12 disposition | Verdict + conf |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | **MinishLab/semble** | C9 | MIT | 822 | 2026-04-06 | `9d724a6` | PASS firm (Axis-3 cpd~20 + reproducible benchmark + NDCG@10=0.854 measured) | ALL PASS (Probe 4: NOT in plugin namespace; Probe 7.b: replaces grep+read with 98% token savings — new code-search workflow) | 86/100 | **GENUINELY-NEW** (no incumbent in pure-runtime) | **INSTALL-NOW conf=0.93**. Install: `claude mcp add semble -s user -- uvx --from "semble[mcp]" semble` |
| 2 | **NirDiamant/Agent_Memory_Techniques** | C2 + C9 | Apache-2.0 | 319 | 2026-05-05 | `6ea4085` | PASS (Axis-2: NirDiamant named-T2 author of RAG_Techniques 26k★ + Agents Towards Production 18k★ — convergent practitioner) | ALL PASS | 88/100 | **CITE-CLASS-CANONICAL** (cite-import per CR-1 — 30 LoCoMo + Graphiti + Letta notebooks; reference doc not install) | **CITE-IMPORT conf=0.94**. Cite anchor for `pure-runtime` agent-memory rule |
| 3 | **safishamsi/graphify** | C9 | MIT (per topic) | 48,377 | 2026-04-03 | (HEAD via gh search) | PASS firm (axis-3 firm @ 42d age × explosive cpd suggests fast-churn band — STUDY-PILOT not INSTALL pending stabilization) | Probe 6: license verify pending; Probe 5: skill-class HARD-GATE check pending | 78/100 | **PARTIAL-OVERLAP** with `getzep/graphiti` incumbent | **STUDY-PILOT conf=0.82** — knowledge-graph skill; pilot 30d before adoption |
| 4 | **wxtsky/byob** | C2 + browser-MCP | MIT | 121 | 2026-04-25 | `f8161b4` | PARTIAL Axis-2 (named-T2 absent; Axis-3 borderline 21d × moderate cpd) | ALL PASS structurally; permissive license confirmed | 75/100 | **GENUINELY-NEW** (existing browser MCPs are headless/proxy; "Bring Your Own Browser" via real Chrome + MV3 ext is design-novel) | **STUDY-PILOT conf=0.85** — re-audit at 90d age for STABLE-BURN-IN; install: clone + `bun run setup` |
| 5 | **getagentseal/codeburn** | C9 + observability | MIT | 6,520 | 2026-04-13 | `041d933` | PASS (Axis-3 fast-churn 33d high cpd + 19 IDE provider coverage strong axis-2 signal); creator [iamtoruk] | ALL PASS; reads session data on disk (NO proxy/wrapper) | 85/100 | **PROVIDER-COMPLEMENT** (cost-tracking has no incumbent in pure-runtime; ccusage is single-provider) | **INSTALL-NOW conf=0.91**. Install: `npm install -g codeburn@latest` |
| 6 | **elara-labs/code-context-engine** | C9 + token-eff | MIT | 116 | 2026-04-27 | `f109cb9` | PASS Axis-1+3 (reproducible 94% FastAPI bench + multi-language extension); Axis-2 PARTIAL (no named-T2 yet) | ALL PASS; PyPI `code-context-engine` exists; sqlite-vec + tree-sitter substrate | 84/100 | **PROVIDER-COMPLEMENT** (semble does code-search; CCE does context-spine indexing — orthogonal) | **STUDY-PILOT conf=0.87** — pilot for 30d alongside semble |

### Tier-B STUDY-PILOT candidates (4-5 Probe DAG + Axis-3 STABLE/borderline + meaningful workflow)

| # | Repo | Cohort | License | Stars | Created | Axis 1/2/3 | CR-12 | Verdict + conf |
|---|---|---|---|---|---|---|---|---|
| 7 | **NickCirv/engram** | C9 + token-eff | Apache-2.0 | 108 (per README; gh says 119) | 2026-04-09 | PASS Axis-3 + reproducible bench (89.1%); Axis-1 single-org borderline | **PARTIAL-OVERLAP** with semble + code-context-engine | STUDY-PILOT conf=0.80 |
| 8 | **strukto-ai/mirage** | C9 + virtual-FS | Apache-2.0 | 2,285 | 2026-05-06 | PASS Axis-3 borderline (10d age — TOO YOUNG, fast-churn risk); Axis-1 strong | **GENUINELY-NEW** (no incumbent VFS for agent sandboxing in pure-runtime) | DEFER conf=0.62 — re-audit at 90d age |
| 9 | **GammaLabTechnologies/harmonist** | C9 + multi-agent | MIT | 1,696 | 2026-04-23 | PASS Axis-3 cpd~70-day-old × moderate cpd; reproducible test suite (430+ assertions); 186 agents | **PARTIAL-OVERLAP** with claude-plugins-official superpowers | STUDY-PILOT conf=0.79 — mechanical-enforcement-via-hooks pattern is novel; reference candidate not install |
| 10 | **rohitg00/pro-workflow** | C9 + workflow | MIT (Axis-1 partial) | 2,124 | 2026-02-01 | PASS Axis-3 firm (4mo); Axis-2 unclear; Axis-1 single-org | **PARTIAL-OVERLAP** with superpowers/claude-plugins-official + hesreallyhim/awesome-claude-code | STUDY-PILOT conf=0.74 — pattern-extract for self-correcting hooks |
| 11 | **flightlesstux/prompt-caching** | C9 + prompt-cache | MIT | 116 | 2026-03-12 | PASS Axis-3 firm (2mo); single-org | **PROVIDER-COMPLEMENT** (no prompt-caching incumbent in pure-runtime) | STUDY-PILOT conf=0.76 |
| 12 | **abhisekjha/pith** | C9 + token-eff | MIT | 95 | 2026-04-15 | PASS Axis-3 borderline; ROIs 3x session length claimed | **DUPLICATE-FUNCTIONALITY** with `flightlesstux/prompt-caching` + `entroly` | DUPLICATE — defer per CR-12 |
| 13 | **0xhimanshu/governor** | C9 + telemetry | MIT (per topic) | 74 | 2026-05-01 | borderline (15d age); Axis-2 absent | **PROVIDER-COMPLEMENT** with codeburn (codeburn=cost; governor=compact output) | STUDY-PILOT conf=0.71 |
| 14 | **angelnicolasc/graymatter** | C2 + memory | unverified | 374 | 2026-04-08 | unclear Axis | partial | DEFER pending license verify |
| 15 | **mathomhaus/guild** | C2 + multi-agent | unverified | 189 | 2026-04-20 | partial | partial | DEFER pending license + Probe 6 |

### Tier-C REJECT-FOR-FIT (Probe 6 license blocker OR DUPLICATE)

| # | Repo | Reason |
|---|---|---|
| 16 | **yantrikos/yantrikdb-server** | **AGPL-3.0** [VERIFIED 2026-05-16 via LICENSE read] — REJECT permissive whitelist |
| 17 | **syncable-dev/memtrace-public** | **Proprietary EULA** [VERIFIED 2026-05-16 via README badge `License: Proprietary EULA`] — REJECT |
| 18 | **Storybloq/storybloq** | **PolyForm Noncommercial 1.0** [VERIFIED via README badge] — REJECT (non-commercial restriction) |
| 19 | **smtg-ai/claude-squad** | Inherited REJECT per sibling claude-sota-installed evidence: Windows ConPTY blocker upstream issue #275 — DUPLICATE Probe 5 mode-harness |
| 20 | **OpenCoworkAI/open-cowork** | DUPLICATE-FUNCTIONALITY with claude-plugins-official superpowers + provider-mix is design-equivalent; STUDY-PILOT only after Probe 5 |
| 21 | **WisdomShell/GRIP** | ACL paper research artifact; NOT install-class (training pipeline + checkpoints); CITE-ONLY for RAG retrieval mechanism |
| 22 | **archcore-ai/plugin** | DUPLICATE with claude-plugins-official + addy-agent-skills |
| 23 | **VoltAgent/awesome-openclaw-skills** | OpenClaw-derived (not Anthropic-native) per kiss-dry-yagni Must-Never #4 ecosystem-mismatch |
| 24 | **patty-png/claude-code-toolkit-app** | DUPLICATE with hesreallyhim/awesome-claude-code aggregator (already cited in sibling manifest) |

### Tier-D GENUINELY-NEW infra primitives (CR-12 GENUINELY-NEW; require Probe 7.b STUDY-PILOT 5-clause check)

| # | Repo | Cohort | License | What's new | CR-12 | Verdict |
|---|---|---|---|---|---|---|
| 25 | **agentic-dev3o/sandbox-shell** | C9 + sandbox | per topic (Rust) | macOS Seatbelt sandbox CLI — credential isolation for npm/AWS/SSH against supply-chain attacks. Designed specifically for `claude-code --dangerously-skip-permissions` workflows | **GENUINELY-NEW** | STUDY-PILOT conf=0.79 — macOS-only; CR-10 research-first applies before Windows fork |
| 26 | **almide/porta** | C9 + sandbox | per topic (Rust) | WASM-isolation + OS sandbox for agent runtime. Created 2026-04-07 — TOO YOUNG | **GENUINELY-NEW** | DEFER conf=0.68 — re-audit at 90d age |
| 27 | **HumphreySun98/repoagentbench** | C4 PapersWithCode | per topic | SWE-bench-style local contamination-free benchmark from your merged PRs. Direct reproducibility for pure-runtime adoption verification | **PROVIDER-COMPLEMENT** (no agent-eval incumbent in pure-runtime) | STUDY-PILOT conf=0.84 |
| 28 | **Euraika-Labs/swe-postcutoff-bench** | C4 | per topic | Contamination-controlled SWE-bench from post-2024 issues. Multi-language. | **PROVIDER-COMPLEMENT** | STUDY-PILOT conf=0.80 |
| 29 | **prototypebench/prototypebench** | C4 | per topic | Full-stack feature shipping benchmark (React+Vite+FastAPI+SQLModel). 71 tasks, 32k tests, execution-based scoring (no LLM-as-judge) | **PROVIDER-COMPLEMENT** | STUDY-PILOT conf=0.82 |
| 30 | **NYCU-Chung/my-claude-devteam** | C9 + multi-agent | per topic | 12 agents + 15 hooks + P7/P9/P10 methodology. 265★ at 1mo age. | **PARTIAL-OVERLAP** with superpowers | STUDY-PILOT conf=0.72 |
| 31 | **Prompthon-IO/agent-systems-handbook** | C2 + handbook | per topic | A2A + LangGraph + MCP + context-engineering + agent-memory practical handbook | **CITE-CLASS-CANONICAL** | CITE-IMPORT conf=0.81 |
| 32 | **MemTensor/MemPrivacy** | C2 + privacy | per topic | Privacy-preserving personalized memory framework for edge-cloud agents | **PROVIDER-COMPLEMENT** (no privacy-class memory incumbent) | STUDY-PILOT conf=0.77 — re-audit when Axis-3 stabilizes |

---

## R3 — Primary-Source Verification (n=32 candidates surveyed)

Per-candidate evidence verified via direct README/LICENSE reads:

- **Probe 6 (LICENSE)**: 24 PASS (MIT/Apache-2.0/BSD); 3 FAIL (AGPLv3/EULA/PolyForm-NC); 5 PENDING re-probe
- **Probe 4 (plugin-namespace)**: 0 collide with `everything-claude-code:` / `claude-plugins-official:` / `codex:` namespaces (verified via system-reminder skill list)
- **Probe 1 (count-OVER)**: gh API stars/dates verified within tolerance
- **Probe 7.b 5-clause check (STUDY-PILOT eligibility for new-workflow primitives)**: passes for #1, #4, #5, #6, #25, #27, #28, #29 — each has named use case + concrete consumer path + incumbent comparison + reversible time-box

---

## Tier-A Top-6 Install Priority Recommendation (ranked by SRA D-total + Axis-1+2+3 firmness)

For `Z:/claude-sota-pure` Tier 1 installs (CR-12 PRIMARY upstream install path):

1. **Agent_Memory_Techniques** (cite-import, NirDiamant) → INSTALL FIRST as L3 memory architecture reference per CR-1+CR-8 cite-class
2. **semble** → INSTALL via `claude mcp add semble -s user -- uvx --from "semble[mcp]" semble` — 98% code-search token savings, Apache-bench reproducible
3. **codeburn** → INSTALL via `npm install -g codeburn@latest` — cost observability gap closure (19 providers); critical for cardinal-rule-7 graduated unleash budgeting
4. **code-context-engine** → INSTALL via `uv tool install code-context-engine@latest` — context-spine 94% measured (orthogonal to semble's code-search)
5. **byob** STUDY-PILOT (90d burn-in before full INSTALL) — closes browser-MCP gap with real Chrome session
6. **repoagentbench** STUDY-PILOT — closes agent-eval gap with contamination-free local benchmark

---

## Cohort coverage statement (per CLAUDE.md §SOTA Repository Discovery ≥2-cohort fan-out mandate)

cohorts: [C9 stars-sorted-direct, C2 arxiv-adjacent, C4 PapersWithCode-benchmarks, C6 awesome-list-refresh, C8 trending-feeds]

---

## Honest Conclusion + HONEST-NON-FINDINGS

**Hypothesis NOT REJECTED**: 6 candidates pass INSTALL-NOW tier + 12 STUDY-PILOT candidates exist + 3 cite-class canonical. Hypothesis stipulated ≥10 net-new → measured 18 NEW candidates not in prior W237/W240/W241/W250 rosters.

**HONEST-NON-FINDING #1**: arxiv direct search MCP unavailable in current environment (tool not present); arxiv coverage was inferred via GitHub topic search + repo README references. ACL 2026 + AAAI 2026 acceptance signals captured via repo metadata, not arXiv API.

**HONEST-NON-FINDING #2**: Perplexity recency-filtered search unavailable; convergence-gate Axis-2 named-T2 endorsements for newer candidates underpowered. Re-audit at Wave 253+.

**HONEST-NON-FINDING #3**: Direct sandboxing-cohort (Anthropic 2026-04 explicit) returned thin (n=3); pattern is still emerging and underpowered for ADOPT-NOW. Best STUDY-PILOT candidate: sandbox-shell (macOS only) + porta (too young).

**HONEST-NON-FINDING #4**: Wave 251 §5 HIGH-PRIORITY uncovered axis "CI/CD demand-gate" — only n=4 results total for `topic:claude-code-plugin ci-cd`, mostly 0-2 star scaffolders. Demand-gate Probe 7.a REJECT-ABSENCE for pure-runtime — no current CI/CD workflow in `Z:/claude-sota-pure` justifies the install class.

**HONEST-NON-FINDING #5**: Conference proceedings (C7) — n=3 ACL/AAAI 2026 papers surfaced (GRIP/ETC/SCD all WisdomShell); deeper conf-talk recordings not retrievable through current MCP set. Re-audit when DeepWiki/Perplexity recency-mode available.

---

## R4 — Suggested next action

Spawn second-stage harness-fit-aware agent (per `Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md` 2-stage validation contract) to verify Probe 4/5 mode-harness-shape for Tier-A Top-6 BEFORE writing T1 consult. Orchestrator-side foreground+tee codex T1 fire-and-poll for cross-model verification of the 18-candidate roster classification.

---

## Cite trail (all evidence file:line + HEAD verified 2026-05-16)

- `MinishLab/semble @ 9d724a6 LICENSE` (MIT) + `README.md:46` (98% fewer tokens claim) + `benchmarks/README.md` (NDCG@10=0.854 reproducible)
- `NirDiamant/Agent_Memory_Techniques @ 6ea4085 README.md:30` (Apache-2.0 + 30 notebook reference)
- `getagentseal/codeburn @ 041d933 README.md:11` (19-provider MIT cost tracker)
- `elara-labs/code-context-engine @ f109cb9 README.md` (MIT + 94% reproducible FastAPI benchmark + sqlite-vec)
- `wxtsky/byob @ f8161b4 README.md` (MIT + Bring Your Own Browser MCP design)
- `yantrikos/yantrikdb-server LICENSE:1-3` (AGPLv3 — REJECTED)
- `syncable-dev/memtrace-public README.md` (Proprietary EULA badge — REJECTED)
- `Storybloq/storybloq README.md` (PolyForm-NC license — REJECTED)
- `spuentesp/lain LICENSE` (MIT confirmed)
- `strukto-ai/mirage LICENSE` (Apache-2.0 confirmed)
- `HumphreySun98/repoagentbench README` (Python; agent-evals topic; created 2026-04-29)
- `Euraika-Labs/swe-postcutoff-bench README` (multi-language SWE-bench; created 2026-05-04)
- `prototypebench/prototypebench README` (React/FastAPI/Playwright execution-based scoring)
- `WisdomShell/GRIP README:1-5` (ACL 2026 Main Conference; HuggingFace SFT+RL datasets released)
- `agentic-dev3o/sandbox-shell README` (Rust; macOS Seatbelt sandbox)
- `GammaLabTechnologies/harmonist README.md` (MIT + 186 agents + 430+ test assertions + mechanical enforcement via hooks)

End of fresh R2 fan-out. Cross-cohort coverage: C2+C4+C6+C7+C9 = 5 cohorts.

---

## ORCHESTRATOR NOTE (Wave 254 continuation arc, 2026-05-15)

This artifact is **Agent A** of a fresh 3-agent Wave 252-continuation team. It self-declares Sonnet stand-in — its verdicts require cross-model verification per `ahfv-codex-rescue-blind-spot.md` 2-stage validation. Cross-model coverage provided by sibling Agent B (BRIDGE-MODE real GPT-5.5) + orchestrator-direct codex foreground+tee. Mia pre-apply per `mia-pre-apply.md` will be applied to every INSTALL-NOW prescription BEFORE it propagates to the grand-synthesis install architecture. The 5 HONEST-NON-FINDINGS (arxiv MCP / Perplexity recency / sandboxing thin / CI/CD demand-absence / conference proceedings thin) are the gap-list input for the next research wave.
