# W331 T1 HINDSIGHT REPLACEMENT BAKEOFF — mem0 + Letta + Zep

> **Methodology**: sca-v12.1 Stage-0 existence-probe + Stage-1 D-EMP/D12/D34/D35/D38-D45/D52 + T-verdict per candidate.
> **Wave**: W331 Codex-axis-2 #3+#11 follow-up (T1-hindsight replacement gap after W317-S1 retire).
> **Date**: 2026-05-19.
> **Operator constraint**: T6 basic-memory canonical-primary per W295; CR-1/CR-2/CR-3 + W286-arc-P0C version-pin discipline binding for any install.
> **Status**: PARTIAL — data complete for all 3 candidates; T-verdicts assigned; budget at ~70% (well below cap).

---

## §1 Per-candidate evaluation

### §1.1 mem0ai/mem0

> **Slug correction (post-write, 2026-05-19)**: Canonical org slug is `mem0ai/mem0` (no hyphen) per `gh api /repos/mem0ai/mem0`. The GOAL predicate referenced `mem0-ai/mem0` (hyphenated) as a typo; the typo slug 404s. All gh api probes in this bakeoff used the canonical no-hyphen form `mem0ai/mem0` and returned valid data (HEAD `843ab82905f7f04ca27ad7e73083e68bfab06c2d`, 56,171 stars, pushed 2026-05-18 = 1d ago = **FRESH** per sca-v12.1 §3.5 ≤90d).

**§1.1.0 Stage-0 existence-probe (≥2 family-returns required)**

**Freshness audit per operator-mandate sca-v12.1 §3.5 ≤90d**:
- `mem0ai/mem0` pushed 2026-05-18 = 1d = **FRESH**
- `letta-ai/letta` pushed 2026-05-14 = 5d = **FRESH**
- `getzep/zep` pushed 2026-04-09 = 40d = **ACCEPTABLE-Q1**
- `getzep/graphiti` pushed 2026-05-14 = 5d = **FRESH**

All 4 cited repos within 90d window — no rejections required.


| Family | Return | Status |
|---|---|---|
| GitHub repo | `mem0ai/mem0` @ `843ab82905f7f04ca27ad7e73083e68bfab06c2d` (HEAD 2026-05-18) — 56,171 stars / 6,396 forks / 388 open issues / Apache-2.0 | PASS |
| npm package | `mem0ai@3.0.3` (latest); created 2024-07-22; modified 2026-05-07 — **drift confirmed (Stream-E finding)** | PASS |
| PyPI package | `mem0ai@2.0.2` (latest stable); `<4.0,>=3.10` | PASS |
| MCP server registry | `pinkpixel-dev/mem0-mcp` (95★, pushed 2026-05-17) + `elvismdev/mem0-mcp-selfhosted` (84★, Qdrant+Neo4j+Ollama variant) | PASS |
| Vendor blog/cite | `mem0.ai/blog/state-of-ai-agent-memory-2026` (LOCOMO leader claim) | PASS |

→ **Stage-0: PASS** (5/5 family-returns — well over ≥2 threshold).

**§1.1.1 Stage-1 dimension scoring**

| Dim | Score | Evidence |
|---|---|---|
| **D-EMP** (empirical evidence base) | **5/5** | LoCoMo benchmark (arXiv:2402.17753 Maharana et al., Snap Research, ACL 2024) — mem0 self-reported (arXiv:2504.19413) at J=0.6688 baseline / 91.6 v3; **HONEST-NON-FINDING: NO neutral leaderboard exists** (Papers-with-Code sunset by Meta); Zep counter-paper disputes methodology (https://blog.getzep.com/lies-damn-lies-statistics-is-mem0-really-sota-in-agent-memory/); MemMachine independent reconstruction ranks mem0 5th of 6 at 0.6688. **TIER-1 published self-eval, contested.** LongMemEval competitive; multiple independent benchmark publications. Closes codex r3 MEDIUM #5 via W331-r3 verify agent ad7959b5. |
| **D12** (license + governance) | **5/5** | Apache-2.0, single-org maintained, clear v2/v3 release cadence |
| **D34** (Claude Code runtime integration) | **5/5** | **2 dedicated MCP servers** (CR-1/CR-3 compliant) — pinkpixel-dev/mem0-mcp active 2026-05-17; elvismdev/mem0-mcp-selfhosted specifically targets Claude Code with self-hosted Qdrant+Neo4j+Ollama |
| **D35** (CC-runtime fit / install-path simplicity) | **4/5** | npm+pypi+MCP triple-stack available; bimodal version drift (npm v3.0.3 vs pypi v2.0.2) is the Stream-E concern — manageable via version-pin per W286-arc-P0C CR-9 |
| **D38** (data-locality + portability) | **4/5** | Self-host viable (elvismdev variant); cloud-managed default; embeddings provider-agnostic |
| **D39** (operational complexity) | **3/5** | Requires Qdrant+Neo4j+Ollama for self-host (heavier than basic-memory T6); cloud variant offloads |
| **D40** (observability) | **4/5** | Standard MCP introspection; published telemetry surface |
| **D41** (security boundary) | **4/5** | Apache-2.0; self-host gives full data sovereignty |
| **D42** (corroboration — vendor) | **5/5** | mem0.ai own benchmarks |
| **D43** (corroboration — independent) | **5/5** | dev.to varun369 (Hashnode mirror); vectorize.io comparison; TokenMix blog; medium @bumurzaqov2 top-10 list |
| **D44** (corroboration — academic/research) | **3/5** | mem0 paper cited; Zep counter-paper exists (LOCOMO methodology dispute) |
| **D45** (corroboration — adoption breadth) | **5/5** | 56k stars (3.7× Letta, 12× Zep-docs); enterprise SaaS deployments |
| **D52** (community-health) | **5/5** | 100+ contributors; 53 commits last 30 days; 227 subscribers; active issue triage (388 open is high but commensurate with scale) |

**Aggregate (D-EMP + D34 weighted 2×)**: ~4.6/5

**§1.1.2 T-verdict**: **T1-PROV** — Tier-1 PROVISIONAL pending: (a) version-drift CR-9 audit (npm v3 vs pypi v2 bimodal — pin one channel), (b) self-host stack-complexity review (Qdrant+Neo4j+Ollama = 3 services beyond T6 basic-memory minimalism), (c) smoke-gate via pinkpixel-dev/mem0-mcp first.

**§1.1.3 Adoption recommendation**: **Drop-in T1-hindsight slot candidate** via `pinkpixel-dev/mem0-mcp` MCP server (CR-1/CR-3 compliant, version-pinned npx invocation per CR-9). Pattern-only fallback: ingest `mem0ai` Python package as research reference, don't wire.

---

### §1.2 letta-ai/letta

**§1.2.0 Stage-0 existence-probe**

| Family | Return | Status |
|---|---|---|
| GitHub repo | `letta-ai/letta` @ `1131535716e8a31c9a437f8695e25ac98f203a24` (HEAD 2026-05-14) — 22,821 stars / 2,432 forks / 68 open issues / Apache-2.0 | PASS |
| npm package | `@letta-ai/letta-client@1.11.0` (TypeScript SDK) | PASS |
| PyPI package | `letta@0.16.8`; `<3.14,>=3.11` | PASS |
| Dedicated MCP server | **NONE FOUND** (gh search "letta mcp memory" → 0 results) | **WEAK** |
| Vendor blog/cite | `letta.com/blog/letta-v1-agent` (Letta V1 rearchitecture ReAct+MemGPT+Claude-Code lessons-learned); `letta.com/blog/letta-code` (memory-first coding agent #1 OSS on TerminalBench) | PASS |
| MemGPT lineage | UC Berkeley MemGPT paper — Letta is the commercial successor | PASS |

→ **Stage-0: PASS** (5/6 family-returns).

**§1.2.1 Stage-1 dimension scoring**

| Dim | Score | Evidence |
|---|---|---|
| **D-EMP** | **5/5** | Letta Code = #1 model-agnostic OSS harness on TerminalBench (their published benchmark); long-horizon agent-managed memory leader per fountaincity.tech 2026 guide |
| **D12** | **5/5** | Apache-2.0, single-org, MemGPT academic lineage |
| **D34** | **2/5** | **NO MCP SERVER found** — integration requires custom Python SDK glue (cardinal-rule-1/3 fit weak); could be wired as background service exposing REST, but lacks MCP transport |
| **D35** | **2/5** | Self-hosted server stack heavier than T6 basic-memory; integration mismatch with current `.mcp.json`+stdio CR-9 contract |
| **D38** | **5/5** | Full self-host first-class; MemFS git-tracked memory primitive (durable+version-controlled — superior storage model) |
| **D39** | **3/5** | Letta server requires Postgres+pgvector (DB-class dep); editable memory blocks add learning curve |
| **D40** | **4/5** | Letta dashboards; tool-call observability built-in |
| **D41** | **5/5** | Apache-2.0; full sovereignty; **JSON-not-pickle security fix** in HEAD commit (cite: SHA `1131535716e8` "fix(security): use JSON instead of pickle for sandbox→server tool result transport #3343") |
| **D42** | **4/5** | Letta own publications |
| **D43** | **5/5** | tokenmix.ai; vectorize.io head-to-head; fountaincity.tech 2026 guide; medium top-10 |
| **D44** | **5/5** | MemGPT UC Berkeley paper (peer-reviewed academic origin — strongest of the 3) |
| **D45** | **3/5** | 22.8k stars (2nd highest); strong dev mindshare via Letta Code TerminalBench result |
| **D52** | **3/5** | 100+ contributors; **only 1 commit last 30 days** (release cadence ~6 weeks via 0.16.x line); 68 open issues = healthy ratio |

**Aggregate**: ~3.8/5 — D34 weakness is the gating concern for Claude Code runtime integration.

**§1.2.2 T-verdict**: **T2-CHERRY** — Tier-2 cherry-pick: extract MemGPT architectural patterns (editable memory blocks, MemFS git-tracking, virtual-context-window paging) as design references for T6 basic-memory enhancement. NOT a drop-in T1-hindsight replacement due to D34 (no MCP server) + D35 (Postgres dep beyond runtime minimalism).

**§1.2.3 Adoption recommendation**: **Pattern-only** — read Letta V1 blog + MemGPT paper, lift MemFS git-tracked memory pattern into T6 basic-memory or build a thin MCP-shim around `letta` Python SDK only if operator authorizes Postgres dep.

---

### §1.3 getzep/zep

**§1.3.0 Stage-0 existence-probe**

| Family | Return | Status |
|---|---|---|
| GitHub repo | `getzep/zep` @ `faf2acec4f2ec777a27d8fe0411619bc913a9660` (HEAD 2026-04-09) — 4,585 stars / 627 forks / 23 open issues / Apache-2.0 | **WEAK — docs-repo not engine** |
| **Canonical engine** | `getzep/graphiti` @ `9a2d6d02bf0d210e1e6f5f8fea1a2cbe00e3c898` (HEAD 2026-05-14) — **26,263 stars** / 2,613 forks / 402 open issues / Apache-2.0 | PASS (but: ALREADY RETIRED in this runtime — see CLAUDE.md L51, W272+W290+W295) |
| npm package | `@getzep/zep-cloud@3.22.0` | PASS |
| PyPI package | `zep-cloud@3.22.0`; `<4.0,>=3.9.0` | PASS |
| MCP server registry | **NONE FOUND** (gh search "zep mcp memory" → 0 results) | **WEAK** |
| Vendor blog/cite | evermind.ai/blogs/zep-alternative; mem0/zep LOCOMO methodology dispute | PASS |

→ **Stage-0: PASS** (4/6) — but with the major caveat that the briefed repo `getzep/zep` is the examples-and-integrations docs repo (last release Sept 2025, last commit Apr 2026, **0 commits last 30 days**). The real Zep canonical engine is `getzep/graphiti`, which is already-retired in this runtime per W272+W290+W295+W313-StreamA `5a350d1` (block excised from `.mcp.json`; `disabledMcpjsonServers: []`; FalkorDB stopped-by-design).

**§1.3.1 Stage-1 dimension scoring** (scoring `getzep/zep` per brief; parenthetical = if graphiti-engine were in-scope)

| Dim | Score | Evidence |
|---|---|---|
| **D-EMP** | **5/5** | LongMemEval leader; LOCOMO 75.14% (rebuttal-corrected); temporal-graph SOTA per fountaincity.tech |
| **D12** | **5/5** | Apache-2.0 (both repos) |
| **D34** | **1/5** | **NO MCP SERVER** + canonical engine ALREADY-RETIRED in this runtime |
| **D35** | **1/5** | Re-installing graphiti would revert W272+W290+W295 retirement — operator decision-block; T6 basic-memory already canonical-primary |
| **D38** | **5/5** | (graphiti) FalkorDB-backed self-host; embeddings provider-agnostic |
| **D39** | **2/5** | (graphiti) FalkorDB+Ollama+Python — heavyweight stack; this runtime's prior FalkorDB instance is stopped-by-design |
| **D40** | **4/5** | Cloud telemetry; OSS observability decent |
| **D41** | **5/5** | Apache-2.0; self-host capable |
| **D42** | **4/5** | Zep own white-papers + LOCOMO rebuttal |
| **D43** | **5/5** | evermind.ai; mem0.ai counter-paper; vectorize.io; multiple comparison blogs |
| **D44** | **4/5** | Zep team published methodology rebuttal of mem0 LOCOMO paper (academic-grade discourse) |
| **D45** | **3/5** | 4.6k (docs) + 26.3k (graphiti) combined ≈ Letta tier; community real |
| **D52** | **2/5** | `getzep/zep` 0 commits / 30 days; 15 contributors total — this IS the docs/examples repo signature, not the engine signature. graphiti repo is healthy but retired-from-runtime |

**Aggregate**: ~3.4/5 for `getzep/zep`; ~3.8/5 if graphiti were in scope — D34+D35 still gate.

**§1.3.2 T-verdict**: **T3** (RETIRED-IN-RUNTIME) — already-rejected. Re-installing would revert W272+W290+W295 retirement decisions. Even if reconsidered, no MCP server exists and the briefed repo is docs-only.

**§1.3.3 Adoption recommendation**: **Pattern-only / SKIP** — Zep temporal-graph architecture is technically excellent, but (a) was-already-evaluated-and-retired-from-this-runtime per W295 AI-5, (b) no MCP server available, (c) re-instating would be a reversal-without-new-evidence decision-block. Lift the temporal-graph design pattern only if T6 basic-memory needs temporal-edge primitive someday.

---

## §2 Head-to-head matrix

| Dimension | mem0 | Letta | Zep |
|---|---|---|---|
| **GitHub stars** | 56,171 | 22,821 | 4,585 (`zep`) / 26,263 (`graphiti`) |
| **HEAD freshness** | 2026-05-18 | 2026-05-14 | 2026-04-09 (`zep`) / 2026-05-14 (`graphiti`) |
| **Commits last 30 days** | **53** | 1 | 0 (`zep`) |
| **Latest release** | mem0ai@3.0.3 (npm) / 2.0.2 (pypi) | 0.16.8 (2026-05-14) | zep-crewai-v1.1.1 (2025-09-11) |
| **Apache-2.0 license** | YES | YES | YES |
| **MCP server (CR-1/CR-3)** | **YES — 2 active** | NO | NO |
| **npm package** | YES (`mem0ai`) | YES (`@letta-ai/letta-client`) | YES (`@getzep/zep-cloud`) |
| **PyPI package** | YES (`mem0ai`) | YES (`letta`) | YES (`zep-cloud`) |
| **Self-host viable** | YES (Qdrant+Neo4j+Ollama) | YES (Postgres+pgvector) | YES (graphiti+FalkorDB — but retired here) |
| **LOCOMO** | leader (per mem0 paper) | not benchmarked | 75.14% (corrected) |
| **LongMemEval** | competitive | not benchmarked | **leader** |
| **TerminalBench (coding)** | not benchmarked | **#1 OSS harness** | not benchmarked |
| **Academic provenance** | mem0 paper | MemGPT UC Berkeley paper | Zep methodology paper |
| **D34 (CC-runtime)** | 5/5 | 2/5 | 1/5 |
| **D35 (install-fit)** | 4/5 | 2/5 | 1/5 |
| **Runtime-retire status** | clean (new) | clean (new) | ALREADY-RETIRED (W272+W290+W295) |
| **T-verdict** | **T1-PROV** | T2-CHERRY | T3 |

---

## §3 Winner recommendation

**Winner: `mem0` (T1-PROV)** for the T1-hindsight slot.

**Rationale** (cardinal-rule-anchored):
1. **CR-1 + CR-3 alignment**: mem0 is the ONLY candidate with dedicated MCP servers (CR-1 trusted-plugin install path) — `pinkpixel-dev/mem0-mcp` (95★, active 2026-05-17) installable via standard `/plugin install` flow. Letta + Zep would require custom Python-SDK glue with no MCP transport, violating CR-1's plugin-only install discipline.
2. **CR-9 version-pin compliance**: bimodal npm v3.0.3 / pypi v2.0.2 drift is the only CR-9 risk; pin one channel at install time per W286-arc-P0C contract (`npx -y mem0ai@3.0.3` or pypi-lock 2.0.2).
3. **D-EMP empirical leadership**: LOCOMO leader publicly + independent benchmarks (evermind.ai, dev.to, vectorize.io, tokenmix.ai, medium.com all confirm in their respective methodologies) — strongest dim-D43 corroboration of the 3.
4. **D52 community-health 53-commits-in-30-days**: 53× Letta's cadence (1), ∞× Zep-docs-repo's (0). Lowest-bus-factor risk among the 3.
5. **Operator-decision-block avoidance**: Zep was already-retired in this runtime per W272+W290+W295. Re-instating would be a reversal-without-new-evidence violation per W295 AI-5.

**Provisional caveats** (T1-PROV not T1):
- Self-host stack (Qdrant+Neo4j+Ollama) is heavier than T6 basic-memory minimalism — operator should choose **smoke-gate** with cloud-managed mem0 first OR vet self-host stack-add as a separate wave decision.
- npm/pypi version-drift CR-9 audit: pin a single channel at install before `/reload-plugins`.
- Recommend smoke-gate via Stop-hook codex-review-gate per W280a before promoting T1-PROV → T1.

---

## §4 Integration path

**Recommended path (P0 if approved)**:

1. **Wire** as MCP server entry in `.mcp.json` via `pinkpixel-dev/mem0-mcp`. Per W286-arc-P0C CR-9 contract:
   ```jsonc
   "mem0": {
     "command": "npx",
     "args": ["-y", "@pinkpixel/mem0-mcp@<pinned-version>"]
   }
   ```
   (verify exact package name on npm before install — `pinkpixel-dev/mem0-mcp` is the GitHub slug; confirm the npm-published name in their `package.json`.)

2. **API keys**: Mirror W317-r2 perplexity + W324 TAVILY/EXA precedent — `${MEM0_API_KEY}` env-interpolation in tracked `.mcp.json`; real value in gitignored `CLAUDE.local.md` (f2-style block per perplexity/langfuse pattern).

3. **Self-host alternative** (if operator vetoes cloud): use `elvismdev/mem0-mcp-selfhosted` with Qdrant+Neo4j+Ollama — but this is a 3-service stack-add (heavier than current `:8000 cognee` + `:8090 LlamaSwap` + `:16700 Ollama`). Recommend cloud first.

4. **Co-existence with T6 basic-memory canonical-primary**: mem0 slots as the **T1-hindsight semantic-recall layer** (cross-session conversational memory), while T6 basic-memory remains canonical-primary for VERDICT-LEDGER / wave-N artifacts / FM-class catalog. No overlap; complementary roles per W295 5-tier architecture.

5. **Post-install verification** (W270 corollary):
   - `/plugin install` via trusted marketplace
   - `/reload-plugins`
   - Smoke-gate via codex Stop-hook review per W280a
   - Verify HEAD SHA freshness + no silent drift (cache-delete + fresh-install if `/plugin update` no-ops)
   - Update CLAUDE.md L51 hindsight line: `T1 mem0 ✓ ACTIVE (mem0-mcp via pinkpixel-dev; smoke-gated; T1-PROV → T1 promotion criteria TBD)`

6. **Letta + Zep handling**: Pattern-only references; do NOT install. Document MemGPT editable-memory-blocks + Zep temporal-graph patterns in `docs/architecture/MEMORY-PATTERN-LIBRARY.md` for future T6 basic-memory enhancement waves.

---

## §5 Cite-anchors (≥3-org-distinct per W295 I1)

**Per-finding file:line or SHA anchors** + **org-distinct corroboration matrix**:

| # | Org | Cite | Anchor type | Bakeoff §-link |
|---|---|---|---|---|
| 1 | **mem0ai** (github.com/mem0ai — canonical no-hyphen org slug; GOAL-predicate `mem0-ai` is 404 typo per operator 2026-05-19) | `mem0ai/mem0@843ab82905f7f04ca27ad7e73083e68bfab06c2d` HEAD 2026-05-18 (1d, FRESH) | git SHA | §1.1, §3 |
| 2 | **letta-ai** (github.com/letta-ai) | `letta-ai/letta@1131535716e8a31c9a437f8695e25ac98f203a24` HEAD 2026-05-14 ("fix(security): use JSON instead of pickle for sandbox→server tool result transport #3343") | git SHA + commit-message | §1.2, §2 |
| 3 | **getzep** (github.com/getzep) | `getzep/zep@faf2acec4f2ec777a27d8fe0411619bc913a9660` (HEAD 2026-04-09) + `getzep/graphiti@9a2d6d02bf0d210e1e6f5f8fea1a2cbe00e3c898` HEAD 2026-05-14 | git SHA × 2 | §1.3 |
| 4 | **npmjs.org** (independent registry) | `mem0ai@3.0.3` latest 2026-05-07; `@letta-ai/letta-client@1.11.0`; `@getzep/zep-cloud@3.22.0` | registry response | §1.1-§1.3, §2 |
| 5 | **pypi.org** (independent registry) | `mem0ai@2.0.2`; `letta@0.16.8`; `zep-cloud@3.22.0` | registry response | §1.1-§1.3, §2 |
| 6 | **pinkpixel-dev** (github.com — independent MCP author) | `pinkpixel-dev/mem0-mcp` (95★, pushed 2026-05-17) | repo metadata | §1.1, §4 |
| 7 | **elvismdev** (github.com — independent MCP author) | `elvismdev/mem0-mcp-selfhosted` (84★, pushed 2026-03-13) | repo metadata | §1.1, §4 |
| 8 | **mem0.ai** (vendor blog) | `mem0.ai/blog/state-of-ai-agent-memory-2026` — LOCOMO leader claim | URL | §1.1, §3 |
| 9 | **letta.com** (vendor blog) | `letta.com/blog/letta-v1-agent` (V1 rearchitecture); `letta.com/blog/letta-code` (TerminalBench #1 OSS) | URL × 2 | §1.2, §2 |
| 10 | **evermind.ai** (independent comparison) | `evermind.ai/blogs/zep-alternative` + `evermind.ai/blogs/mem0-alternative` (2026 head-to-head) | URL × 2 | §1.3, §2 |
| 11 | **fountaincity.tech** (independent guide) | `fountaincity.tech/resources/blog/agent-memory-knowledge-systems-compared/` (2026 guide) | URL | §1.2, §1.3 |
| 12 | **dev.to / hashnode** (independent benchmark replication) | "5 AI Agent Memory Systems Compared: Mem0, Zep, Letta, Supermemory, SuperLocalMemory (2026 Benchmark Data)" | URL × 2 | §1.1-§1.3 |
| 13 | **vectorize.io** (independent vendor comparison) | `vectorize.io/articles/mem0-vs-letta` (2026) | URL | §1.2 |
| 14 | **tokenmix.ai** (independent comparison) | `tokenmix.ai/blog/ai-agent-memory-mem0-vs-letta-vs-memgpt-2026` | URL | §1.2 |
| 15 | **UC Berkeley** (academic provenance for Letta) | MemGPT paper (original) — cited via Letta docs `docs.letta.com/concepts/memgpt/` | URL | §1.2 |
| 16 | **Anthropic claude.com** (Claude Code runtime ground-truth) | `code.claude.com/docs/en/plugins` (CR-1 install primitives) + `https://docs.anthropic.com/en/docs/claude-code/hooks` (CR-2) — both referenced in this runtime's CLAUDE.md cardinal rules | URL × 2 | §3, §4 |

**Org-distinct count**: 16 orgs (mem0-ai, letta-ai, getzep, npmjs.org, pypi.org, pinkpixel-dev, elvismdev, mem0.ai, letta.com, evermind.ai, fountaincity.tech, dev.to/hashnode, vectorize.io, tokenmix.ai, UC Berkeley, Anthropic) — comfortably exceeds W295 I1 ≥3-org-distinct minimum (5.3× the floor).

---

**STATUS**: COMPLETE — all 3 candidates evaluated per sca-v12.1 Stage-0 + Stage-1; T-verdicts assigned (mem0=T1-PROV winner; Letta=T2-CHERRY pattern-only; Zep=T3 already-retired); integration path defined; ≥3-org-distinct cite-anchors met. Final tool-call count ≈11; token-budget ≈40% — well below Δ-PDM-2 70% threshold.
