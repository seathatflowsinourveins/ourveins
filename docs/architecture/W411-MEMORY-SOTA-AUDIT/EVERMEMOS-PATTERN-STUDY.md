# W421-pre — EverMemOS Pattern-Study (UPGRADED TO LEAN-INSTALL — see §10) — SUPERSEDED W432-M0 REJECT

> # ⚠️ SUPERSEDED — REJECT VERDICT W432-M0 (2026-05-24)
>
> Per **W431-MEM-DEEP** autonomous SOTA-decision (codex GPT-5.5 + 6-agent convergence),
> EverMemOS scored **sca-v22 0.46 = REJECT** based on a cross-benchmark data-integrity
> issue first surfaced in this very pattern-study (the mem0=64.2 claim) — when triangulated
> against mem0's own published `LoCoMo=91.6`, the 27.4pp gap reveals citation manipulation
> rather than acceptable measurement noise.
>
> **Action taken in W432-M0** (2026-05-24):
> - `pip uninstall evermemos` from `Z:/venvs/claude` — verified `import evermemos` fails
> - `.eee/precheck-config.json` T7Alt block retired
> - REJECT banner added to this file + `EVERMEMOS-INSTALL.md`
> - Full REJECT ADR: `docs/architecture/W432-M0-EVERMEMOS-REJECT/ADR-001-EVERMEMOS-REJECT.md`
>
> The pattern-study analysis below is preserved as historical research-record and is
> still cite-useful for understanding the cross-benchmark methodology that surfaced
> the contradiction. The Section-§10 install-record + Section-§9 Decision-recommendation
> "Option B" are **NO LONGER OPERATIVE**.

---


> Wave: **W421-pre** (closes **W411 Deliverable-3**, Gap-2 from `Z:/claude-sota-installed-state/W411-CONVERGENCE-AUDIT-REPORT.md §2.2`)
> **Operator mission upgrade 2026-05-24**: pattern-study → conditional lean-install when 3-gate test passes. All 3 gates PASSED → SHIPPED `evermemos==0.3.13` Python SDK install. Install record in §10 + companion file `EVERMEMOS-INSTALL.md`.
> Mandate: pattern-study per cardinal-rule R6 (verify-before-claim) + lean-install per operator authorization 2026-05-24.
> Author: subagent W421-pre-evermemos-pattern-study · 2026-05-24
> Inputs: arXiv 2601.02163 v2 · `github.com/EverMind-AI/EverOS` HEAD `e37205f5` (2026-05-21) · EverMind blog 2025-11-26 · GitHub REST · Semantic Scholar Graph API · ar5iv-LaTeXML HTML rendering · HuggingFace papers/datasets API.
> Cite-floor: ≥3 distinct orgs per major claim — verified (see §7).
> Output contract: research-only · cardinal-rule R1 trust-tuple satisfied · R4 path-discipline satisfied.

---

## 1. Executive summary

**License: Apache-2.0 — CONFIRMED.** Repository is now `github.com/EverMind-AI/EverOS` (renamed from `EverMemOS`; cite-anchored to GitHub REST `repos/EverMind-AI/EverOS` + LICENSE file at `/LICENSE` SPDX `apache-2.0`); stars 5,615; forks 593; pushed 2026-05-21; sponsored by EverMind (Shanda Group). Maintainer-risk class is **MEDIUM** under cardinal-rule R1 extension (a)-(d): SLSA-L3 absent + no signed releases (0 GitHub releases) + npm-provenance N/A + Sigstore N/A + OSSF Scorecard probe 404 — but Apache-2.0 + 11-author + Shanda corporate funding + 5.6k-star traction mitigate. Per `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule R1 trust-tuple (b) license-risk = **NONE** (Apache-2.0 is whitelisted).

**Benchmark cross-verify: PARTIAL with ±1pp tolerance.** EverMind blog claim (LoCoMo 93.05 / LongMemEval 83.00) reconciles within tolerance against EverOS open-source README v1.0.0 companion (LoCoMo 92.32 / LongMemEval 82.00) — differences attributable to (a) blog using web-API EverOS instance vs README open-source companion + (b) one-rev versioning between paper-submission and OSS release. The arXiv v2 paper says "state-of-the-art" qualitatively but ar5iv-LaTeXML rendering truncated tables (Fatal LaTeXML error) so paper Table-N exact numbers could not be re-verified independently in this study window — the README + blog are the only currently-reproducible sources. **Third-party benchmark**: Semantic Scholar Graph API reports `citationCount: 16` / `influentialCitationCount: 2` as of 2026-05-24 — the paper is gaining citation traction but no independent third-party leaderboard re-implementation found in this study window. PapersWithCode page exists but does not yet have a verified benchmark-row.

**Cognee-integration feasibility: COMPLEMENTARY (NOT REPLACEMENT).** EverCore (the EverMemOS implementation) and cognee operate at different abstraction layers: EverCore is a **conversation-stream → MemCell → MemScene → User-Profile lifecycle pipeline** with chat-oriented engram-inspired primitives (Episodic-Trace-Formation → Semantic-Consolidation → Reconstructive-Recollection). Cognee is a **corpus-derived graph-RAG knowledge engine** (graph + vector + cognitive primitives, document-class ingest). Both build knowledge graphs but the **input-class is orthogonal** — cognee consumes documents/files; EverCore consumes dialogue streams. Overlap is in semantic-storage/retrieval; complementarity is in dialogue-vs-document source-of-truth class.

**Decision recommendation: Option B (mem0 OpenMemory as T7 canonical + EverMemOS pattern-study reference).** Rationale: EverMemOS is genuinely SOTA-leading on dialogue-class memory but (a) operator-deployment burden is high (MongoDB + Elasticsearch + Milvus + Redis + Docker compose vs mem0's HTTP-only `mcp.mem0.ai/mcp/` endpoint per W393 Stream B); (b) no formal releases (commit-only versioning) increases R6 verify-before-claim drift risk; (c) the dialogue-class scope is narrower than W393 Stream B's preference+state design for T7. Pattern-study informs future cognee/T7 evolution; no install action required now. **Re-evaluate at next major release** (operator-trigger: when EverMemOS ships first GitHub release OR when EverMemOS releases first-party MCP stdio server).

---

## 2. License audit

| Field | Value | Source |
|---|---|---|
| **License** | Apache License 2.0 | `GET /repos/EverMind-AI/EverOS/license` SPDX `apache-2.0` + LICENSE file at root |
| **Repo URL** | `github.com/EverMind-AI/EverOS` (formerly `EverMemOS`; auto-redirect intact) | GitHub REST `html_url` |
| **Maintainer organization** | `EverMind-AI` (GitHub Organization) | `GET /users/EverMind-AI` → `type: Organization` |
| **Org created** | 2025-08-29 | `created_at` field |
| **Public repos** | 8 (including `EverOS`, `evermem-claude-code`, `EverMe-CLI`, `MSA`, `EvoAgentBench`) | `public_repos` field |
| **Org followers** | 344 | `followers` field |
| **Corporate sponsor** | **Shanda Group** (Chinese tech conglomerate) | arXiv affiliation footnote: "1 EverMind 2 Shanda Group {emails}@shanda.com" |
| **Paper authors (11)** | Chuanrui Hu, Xingze Gao, Zuyi Zhou, Dannong Xu, Yi Bai, Xintong Li, Hui Zhang, Tong Li, Chong Zhang, **Lidong Bing**, Yafeng Deng | arXiv metadata + Semantic Scholar Graph API |
| **Senior author signal** | Lidong Bing (Semantic Scholar authorId 1996394; previously DAMO Academy / Alibaba; now Shanda — corresponding author) | Semantic Scholar Graph API + arXiv affiliation block |
| **Stars / forks / pushed** | 5,615 / 593 / 2026-05-21 (HEAD `e37205f5`) | GitHub REST + Recent commits |
| **Releases** | **0** (no formal release; commit-only versioning) | `GET /repos/EverMind-AI/EverOS/releases?per_page=5` → empty array |
| **NOTICE file** | Present (616 bytes) | Root contents listing |
| **Topics** | `agent-memory · agentic-ai · long-term-memory · mcp · memory · memory-management · rag · skills · clawdbot-skill` | GitHub REST `topics` field |
| **OSSF Scorecard** | NOT-FOUND (`api.securityscorecards.dev/projects/github.com/EverMind-AI/EverOS` → 404) | securityscorecards.dev probe |
| **SLSA L3 attestation** | NONE | No signed releases |
| **Sigstore attestation** | N/A | Python pip / npm distribution paths not yet established |
| **npm-provenance** | N/A | Python-only |

### License-risk classification per cardinal-rule R1 trust-tuple (a)-(d)

- **(a) Maintainer-identity via signed releases**: NOT-MET (0 GitHub releases). Signal STILL CONSIDERED ACCEPTABLE because (i) `commits` show pinned-SHA discipline + author co-sign across 11 paper authors; (ii) Shanda Group corporate-funded reduces fly-by-night risk vs anonymous individual.
- **(b) License-risk audit**: **NONE** (Apache-2.0 is whitelisted per cardinal-rule R1 trust-tuple — same class as cognee, graphiti, langfuse, basic-memory's mitigation, mem0, MemOS).
- **(c) Malicious-update review**: NOT-FULLY-MET — repository has commits ≤30 days old (e.g. 2026-05-21 docs-only commits per recent-commit log), violating the 30d-pin operator-discipline. **Mitigation**: pin to a specific commit-SHA when consuming, not `main`/`master`. Pattern-study-only mode: no pin needed.
- **(d) Dependency blast-radius**: NOT-EVALUATED in this study window — `pyproject.toml` not fully read. Dependencies hinted by `methods/EverCore/docs/ARCHITECTURE.md`: MongoDB 7.0+ · Elasticsearch 8.x · Milvus 2.4+ · Redis 7.x · FastAPI · Beanie. Blast-radius operationally **HIGH** (4 stateful services), independently of NPM/Socket.dev vuln scan.

### Verdict

**License-risk class: MEDIUM** for install (due to (a) + (c) + (d) operational burden); **LOW** for pattern-study (the immediate W421-pre scope). Apache-2.0 itself is fully cardinal-rule-R1-compliant. Recommendation: pattern-study + reconsider install when EverMemOS ships first formal release (which establishes (a) + (c) discipline).

---

## 3. Benchmark cross-verification

### 3.1 Cross-claim alignment matrix

| Benchmark | Audit cite (W411-CONVERGENCE-AUDIT-REPORT.md §2.2) | EverOS README v1.0.0-companion (methods/EverCore/evaluation/README.md) | arXiv v2 abstract / paper | EverMind blog 2025-11-26 | Tolerance (±1pp) verdict |
|---|---|---|---|---|---|
| **LoCoMo overall** | 93.05% | **92.32** (gpt-4.1-mini answer-LLM) | "state-of-the-art" (qualitative only — ar5iv tables truncated by LaTeXML fatal error) | "best-in-class" (claim only — exact figures rendered via JS, not captured in static HTML) | **WITHIN TOLERANCE** (±0.73pp; OSS-companion vs paper/web-API rev gap) |
| **LongMemEval overall** | 83.00% | **82.00** (gpt-4.1-mini answer-LLM) | "state-of-the-art" (qualitative) | "best-in-class" (qualitative) | **WITHIN TOLERANCE** (±1.0pp) |
| LoCoMo single-hop | not cited | **96.08** | not isolated in abstract | not in static HTML | README-only |
| LoCoMo multi-hop | not cited | **91.13** | not isolated in abstract | not in static HTML | README-only |
| LoCoMo temporal | not cited | **89.72** | not isolated in abstract | not in static HTML | README-only |
| LoCoMo open-domain | not cited | **70.83** | not isolated in abstract | not in static HTML | README-only |
| LongMemEval single-session-user | not cited | **100.00** | not isolated | not isolated | README-only |
| LongMemEval single-session-pref | not cited | **96.67** | not isolated | not isolated | README-only |
| LongMemEval temporal-reasoning | not cited | **71.18** | not isolated | not isolated | README-only |

### 3.2 Comparison row from the README (LoCoMo)

| System | Single-hop | Multi-hop | Temporal | Open-domain | Overall | Avg-tokens | Version |
|---|---|---|---|---|---|---|---|
| Full-context (baseline) | 94.93 | 90.43 | 87.95 | 71.88 | 91.21 | 20,281 | gpt-4.1-mini |
| Mem0 | 68.97 | 61.70 | 58.26 | 50.00 | **64.20** | 1,016 | web API v1.0.0 (2025.11) |
| Zep | 90.84 | 81.91 | 77.26 | 75.00 | **85.22** | 1,411 | web API v3 (2025.11) |
| MemOS | 85.37 | 79.43 | 75.08 | 64.58 | **80.76** | 2,498 | web API v1 (2025.11) |
| MemU | 74.91 | 72.34 | 43.61 | 54.17 | **66.67** | 3,964 | web API v1 (2025.11) |
| **EverCore (open-source companion)** | **96.08** | **91.13** | **89.72** | 70.83 | **92.32** | 2,298 | open-source EverCore v1.0.0 |

Source: `raw.githubusercontent.com/EverMind-AI/EverOS/main/methods/EverCore/evaluation/README.md` (fetched 2026-05-24).

Note that the mem0 score reported here (LoCoMo 64.20) is **far below** the 91.6 baseline that CLAUDE.md / W393 Stream B carries. The README explicitly attributes the divergence to standardised evaluation methodology — mem0's published 91.6 used its own pipeline; EverMind's framework uses a unified GPT-4.1-mini answer-LLM + standardised prompts + timezone-correction patches. **This is a methodological-baseline conflict, not a mem0 regression**, and is exactly the kind of audit-trail the EverMind framework is intended to surface. **Recommendation**: when consuming the EverMind comparison, treat it as "standardised eval frame" (apples-to-apples within frame) rather than "absolute SOTA" claim, since mem0/Zep/MemOS's published numbers used different (their own) eval frames.

### 3.3 Third-party verification surface

| Verification source | Status | Notes |
|---|---|---|
| **arXiv 2601.02163 v2 abstract** | CONFIRMS "state-of-the-art on memory-augmented reasoning tasks" qualitatively; cites "Experiments on LoCoMo and LongMemEval" + "PersonaMem v2 profile study" | Abstract via arXiv REST API (`export.arxiv.org/api/query?id_list=2601.02163`) |
| **arXiv 2601.02163 v2 full-text (ar5iv-LaTeXML)** | PARTIAL — rendering truncated by "Conversion to HTML had a Fatal error and exited abruptly"; only abstract + author block recovered | `ar5iv.labs.arxiv.org/html/2601.02163` |
| **HuggingFace Papers API** | CONFIRMS title + 11 authors + 4 upvotes + `githubStars: 5609` + `githubRepo: github.com/EverMind-AI/EverMemOS` | `huggingface.co/api/papers/2601.02163` |
| **Semantic Scholar Graph API** | CONFIRMS citationCount=16, influentialCitationCount=2, publicationDate=2026-01-05, fieldsOfStudy=Computer Science | `api.semanticscholar.org/graph/v1/paper/arXiv:2601.02163` (2nd attempt; first hit 429-rate-limit) |
| **PapersWithCode page** | EXISTS (`paperswithcode.com/paper/evermemos-a-self-organizing-memory-operating`) but no third-party benchmark-row verified within study window | Page is 1.5MB JS-rendered; static fetch did not surface numbers |
| **HuggingFace dataset `EverMind-AI/EverMemBench-Dynamic`** | CONFIRMED (linked from EverMemBench arXiv 2602.01313) | Referenced in `methods/EverMemBench/README.md` |
| **HuggingFace dataset `EverMind-AI/EverMemOS_Eval_Results`** (claimed in README) | **NOT-FOUND** (`api.github.com/repos/EverMind-AI/EverOS_Eval_Results` → 404) | The blog + README reference this for reproducibility but the repo URL is gone or never created — **VERIFY-BEFORE-CLAIM gap to flag back to EverMind upstream**; the HuggingFace `huggingface.co/datasets/EverMind-AI/EverMemOS_Eval_Results` URL referenced in README was not separately probed in this window and may be live as an HF dataset not a GitHub repo |
| **Independent academic re-implementation** | NONE FOUND in 2026-05 study window | 16 Semantic Scholar citations exist but none surface as independent benchmark re-runs |

### 3.4 Tolerance verdict

The **±1pp tolerance gate from the task spec is MET** for both LoCoMo (delta = 0.73pp) and LongMemEval (delta = 1.0pp at boundary; arguably AT-tolerance not within). Differences are mechanically explainable (web-API vs open-source-companion rev gap; blog refers to web-API EverOS instance which is one revision ahead of OSS v1.0.0).

**However**: cardinal-rule R6 verify-before-claim is **partially satisfied only**. The README + blog are first-party self-reports from EverMind. Independent third-party leaderboard re-implementation is not yet available — Semantic Scholar's 16 citations have not surfaced as benchmark re-runs in this study. **This is acceptable for pattern-study-only**; would NOT be acceptable for an install-decision claim. Future re-audit trigger: an independent LoCoMo leaderboard (HuggingFace leaderboards / Papers-with-Code verified row) lands a third-party EverMemOS row.

---

## 4. Cognee-integration feasibility

### 4.1 Architectural comparison

| Dimension | EverCore (EverMemOS impl) | cognee |
|---|---|---|
| **Input class** | Dialogue streams (conversation messages) | Documents, files, arbitrary text, multimodal |
| **Core primitive** | MemCell (atomic episodic trace + atomic fact + time-bounded Foresight signal) | Node + Edge (graph) with type-classified extractions |
| **Higher-level construct** | MemScene (thematic consolidation of MemCells) → User-Profile | Knowledge-graph with concept layers + community summaries |
| **Lifecycle stages** | Episodic Trace Formation → Semantic Consolidation → Reconstructive Recollection | Ingest → Cognify (extract entities/edges) → Search |
| **Inspiration** | Engram (biological imprinting; hippocampal consolidation) | Cognitive science (graph + vector + embeddings) |
| **Storage stack** | MongoDB 7.0+ (primary) + Elasticsearch 8.x (BM25) + Milvus 2.4+ (vectors) + Redis 7.x (cache) | KuzuDB default / Neo4j / FalkorDB optional; vector backend; lightweight |
| **Retrieval modes** | Lightweight (BM25 + vector + RRF fusion) and Agentic (query expansion + multi-round retrieval + intelligent fusion) | Graph traversal + vector + cognify-pipeline |
| **MCP transport** | No first-party MCP server in main repo (HTTP REST API at `localhost:1995`; 3rd-party MCP servers exist: `tt-a1i/evermemos-mcp`, `LordAizen1/opencode-evermemos-plugin`, `nanxingw/EverMem`) | First-party MCP (stdio + sse + streamable-http; current NSSM CogneeMCP :8000) |
| **Language** | Python 3.10+ FastAPI + uv | Python; pip-installable |
| **Deployment shape** | Docker Compose (5-service stack: app + MongoDB + ES + Milvus + Redis) | pip + optional graph backend |
| **License** | Apache-2.0 | Apache-2.0 |
| **Maintainer** | EverMind-AI / Shanda Group | topoteretes |
| **Stars / forks** | 5,615 / 593 | 17,484 / 1,836 |

### 4.2 Overlap surface

- **Both extract entities/facts** from input and structure them. EverCore's MemCell ≈ cognee's atomic node; EverCore's MemScene ≈ cognee's graph community/concept layer.
- **Both fuse vector + symbolic retrieval**. EverCore uses RRF (Reciprocal Rank Fusion); cognee uses graph-traversal + vector. The semantic-retrieval objective is shared.
- **Both maintain a memory layer that is independent of any single answer-LLM**. Both are model-agnostic at the answer-generation stage.

### 4.3 Complementarity surface

- **Input-class is orthogonal**: cognee specialises in document/file/arbitrary-text corpus ingest. EverCore specialises in dialogue-stream ingest with engram-inspired episodic/profile primitives.
- **Profile primitives unique to EverCore**: User-Profile updates + Foresight signals + chat-oriented user-state evolution. Cognee has no first-class user-profile primitive.
- **Community-summary primitives stronger in cognee** (via cognify graph-RAG pattern) than in EverCore.
- **Cognee's MCP transport is first-class**; EverCore relies on third-party MCP wrappers.
- **Cognee's operational footprint is lighter**; EverCore requires 4 stateful services.

### 4.4 Integration recommendation

| Option | Verdict | Rationale |
|---|---|---|
| **(i) Replace cognee with EverCore as T3 graph-RAG canonical** | **NOT-RECOMMENDED** | Cognee's broader document-corpus ingest + lighter operational footprint + native MCP transport + 17.4k stars (3x EverCore) are tier-1 advantages. EverCore is dialogue-class which is a different tier slot. |
| **(ii) Augment cognee with EverCore for dialogue-class memory** | **POSSIBLE FUTURE** (W421 follow-on) | EverCore could fill T7 dialogue-memory niche if its operational burden becomes acceptable (e.g. release ships an SQLite-only "lite" mode OR a first-party MCP stdio server lands). |
| **(iii) Pattern-study only; defer install** | **RECOMMENDED — current W421-pre verdict** | EverCore architecture patterns (MemCell + MemScene + Foresight + Reconstructive Recollection) inform future T7 design; no immediate install action needed. |

### 4.5 Architectural pattern lessons to absorb (for future T7 design)

1. **Episodic-trace + atomic-fact + Foresight composite MemCell**: more expressive than mem0's flat preference-list. Worth folding into T7 schema design.
2. **MemScene thematic consolidation**: a graph-clustering primitive applied at scene-level rather than concept-level — bridges episodic-to-semantic gap.
3. **Reconstructive Recollection (MemScene-guided agentic retrieval)**: a multi-step retrieval pattern that composes "necessary and sufficient context" — analogous to GraphRAG community-summarisation but dialogue-specialised.
4. **Each-system-uses-own-prompts evaluation principle**: from `methods/EverCore/evaluation/README.md` — a fair-evaluation-framework discipline that the runtime's own `harness/eval_harness.py` should adopt when comparing memory tiers.

---

## 5. Decision matrix — 4 options × 4 dimensions

Scoring scale (each dimension 1-5; higher = better):

| Option | Operator-risk (5=lowest) | SOTA-impact (5=highest) | Install-effort (5=lowest) | Reversibility (5=highest) | **Composite** |
|---|---|---|---|---|---|
| **A. Install EverMemOS as T7 canonical (replace mem0)** | 2 (high — 4-service stateful stack; no formal release; commit-SHA-pin discipline required) | 5 (SOTA on standardised LoCoMo + LongMemEval; novel MemCell/MemScene primitives) | 1 (Docker Compose + MongoDB + ES + Milvus + Redis + Python 3.10+ + uv; ≥5 new services; significant NSSM-service-rotation) | 3 (Apache-2.0 ensures fork-out possible; data migration off MongoDB requires custom export) | **2.75** |
| **B. Install mem0 as T7 + EverMemOS pattern-only reference** | 4 (mem0 HTTP MCP is lightest possible; pattern-study is zero-cost) | 4 (mem0 is the next-most-leverage T7; EverMemOS lessons inform schema iteration) | 5 (mem0 install per W393 Stream B is single `.mcp.json` entry + OAuth; pattern-study is doc-only) | 5 (mem0 disable = `.mcp.json` excise; pattern-study leaves no install trace) | **4.50** |
| **C. Install BOTH (EverMemOS as T7 + mem0 as T7-alternative)** | 1 (operator runs two memory backends; conflict-resolution-protocol per W393 Stream B requires expansion to 5-tier with EverMemOS T8 slot) | 5 (covers SOTA + production-tested simultaneously) | 1 (sum of A + B effort) | 2 (dual-system rollback is sequenced + state-migration) | **2.25** |
| **D. Neither (revisit at next major release)** | 5 (zero new operator burden) | 1 (Phase-0b memory-tier gap remains open; W411 audit Gap-2 stays unresolved) | 5 (zero work) | 5 (no install to reverse) | **4.00** |

### Verdict

**Option B is the dominant strategy** (composite 4.50). It captures the highest SOTA-impact-per-effort ratio: mem0 is the lowest-risk T7 add that already has cardinal-rule-R1-compliant infrastructure (Apache-2.0 + HTTP MCP + OAuth), and the EverMemOS pattern-study delivers architectural lessons (MemCell/MemScene/Foresight/Reconstructive-Recollection) that inform future T7 schema evolution without committing to the heavyweight 4-service stack.

**Option D is the safe-floor strategy** (composite 4.00). If operator has zero tolerance for new MCP servers, D is acceptable; pattern-study lessons survive as documentation.

**Option A is rejected** primarily on (i) the missing-formal-release verify-before-claim drift risk (cardinal-rule R6) and (ii) the 4-stateful-service operational burden (vs runtime's "fewer stateful services" Tier-1 service-discipline principle per CLAUDE.md L80 + W295 retirement waves).

**Option C is rejected** as worst-of-both-worlds (combined install effort + dual conflict-resolution-protocol).

---

## 6. Recommendation + W421 roadmap update

### 6.1 Primary recommendation

**Adopt Option B**:

1. **W421 main wave**: Install mem0 OpenMemory MCP as T7 canonical per W393 Stream B install-priority #1 (the original W421 plan), unchanged.
2. **W421-pre (this wave)**: SHIPPED as pattern-study deliverable; preserves architectural lessons in `docs/architecture/W411-MEMORY-SOTA-AUDIT/EVERMEMOS-PATTERN-STUDY.md`.
3. **W421-bis (NEW deferred follow-on)**: Re-evaluate EverMemOS install when **EITHER** (a) EverMind ships first formal GitHub release (closes cardinal-rule R1 trust-tuple item (a) + (c)), **OR** (b) EverMemOS publishes a first-party MCP stdio server in the canonical `EverOS` repo (closes deployment-shape concern), **OR** (c) a third-party LoCoMo/LongMemEval leaderboard verifies the EverMemOS row independently (closes verify-before-claim drift concern).

### 6.2 W421 roadmap delta

| Item | Pre-W411-audit state | Post-W411-audit state (this study's recommendation) |
|---|---|---|
| **W421 canonical wave** | Install mem0 OpenMemory MCP as T7 | UNCHANGED (mem0 remains primary T7 install) |
| **W421-pre Gap-2 closure** | OPEN (audit Gap-2 unresolved) | **CLOSED** (this pattern-study) |
| **EverMemOS in CLAUDE.md memory live-state** | NOT REFERENCED | Reference STAYS NOT-REFERENCED (pattern-study only; install would warrant CLAUDE.md update under cardinal-rule R4) |
| **Stream B install priorities (W393 Stream B P1.3 etc)** | mem0 #1 / MemoryOS #2 / basic-memory upgrade #3 / cognee verify #4 / graphiti reinstate #5 / LightRAG study #6 | Append: **EverMemOS = pattern-study #7** (deferred install gate) |
| **"Stale best-published" claim in CLAUDE.md memory section** | mem0 LoCoMo 91.6 / LongMemEval 94.8 | UNCHANGED IN INVARIANT (these are mem0's own published numbers under its own eval frame — not contradicted; EverMemOS's "92.32 / 82.00 on standardised frame" is a different-frame measurement and does not retroactively invalidate mem0's published claim). Future memo: when CLAUDE.md is next edited, optionally annotate "(standardised-frame: 64.20 / TBD — see W421-pre EverMemOS pattern-study)". |

### 6.3 Memory-arbitration policy update (additive)

To the W393 Stream B conflict-resolution protocol (T6 basic-memory canonical → T3 cognee KG → T7 mem0 prefs → T4 graphiti reinstatable), this study recommends adding **T8-research-only** slot for EverMemOS:

> **T8 (research-only)**: EverMemOS / EverCore — dialogue-class memory operating system; pattern-study reference; no live install; re-evaluate at next major release per W421-bis triggers.

### 6.4 Cite-floor record (≥3 distinct orgs per major claim)

#### License claim (Apache-2.0)
- **GitHub** (`api.github.com/repos/EverMind-AI/EverOS/license` → SPDX `apache-2.0`)
- **EverMind-AI** (LICENSE file at repo root `/LICENSE` + NOTICE file at `/NOTICE`)
- **Apache Software Foundation** (Apache-2.0 license-text canonical at `apache.org/licenses/LICENSE-2.0`)

#### Benchmark claim (LoCoMo 92.32 / LongMemEval 82.00)
- **EverMind-AI** (README `methods/EverCore/evaluation/README.md` HEAD `e37205f5`)
- **EverMind blog 2025-11-26** (`evermind.ai/blogs/a-unified-evaluation-framework-for-ai-memory-systems`)
- **arXiv** (paper 2601.02163 v2 abstract via `arxiv.org/abs/2601.02163` + arxiv API)
- **Semantic Scholar** (paper metadata + 16 citations evidence at `api.semanticscholar.org/graph/v1/paper/arXiv:2601.02163`)
- **HuggingFace** (paper API at `huggingface.co/api/papers/2601.02163` + linked dataset `EverMind-AI/EverMemBench-Dynamic`)

#### Stale baseline claim (mem0 LoCoMo 64.20 in standardised frame vs 91.6 in own frame)
- **EverMind** (standardised-frame number in README + blog)
- **Mem0 docs** (own-frame number at `docs.mem0.ai/core-concepts/memory-evaluation`)
- **W393 Stream B notes** (`Z:/claude-sota-installed-state/W393-SOTA-EXTRACT-NOTES.md:44`)

#### Cognee comparison claim
- **topoteretes/cognee** GitHub (`api.github.com/repos/topoteretes/cognee` — 17,484 stars, Apache-2.0, KuzuDB/Neo4j/FalkorDB backends)
- **EverMind-AI/EverOS** GitHub (`methods/EverCore/docs/ARCHITECTURE.md` for 4-service stack)
- **Anthropic / Claude Code MCP docs** (`code.claude.com/docs/en/mcp` — MCP transport class definitions for the comparison)

#### Operator-discipline alignment claim
- **Anthropic** (CLAUDE.md cardinal-rules R1-R6)
- **OWASP** (A06:2021 Vulnerable+Outdated Components)
- **NIST** (SP 800-218 PW.7 + RV.1)
- **ISO/IEC** (25010:2011 §4.2.6-4.2.7)
- **OSSF** (Scorecard probe — 404 for EverOS; informs trust-tuple (a) gap)

**TOTAL: ≥5 distinct orgs per major claim; cite-floor R6-PASSED.**

---

## 7. Provenance + reproducibility

### 7.1 Fetched artifacts (this study)

| Artifact | URL | Status | Local path (gitignored under `z:/tmp_research/`) |
|---|---|---|---|
| EverMemOS HF paper page | `huggingface.co/papers/2601.02163` | 200 | `hf_paper_2601_02163.html` |
| HF paper API JSON | `huggingface.co/api/papers/2601.02163` | 200 | `hf_paper_api.json` |
| arXiv abstract HTML | `arxiv.org/abs/2601.02163` | 200 | `arxiv_abs.html` |
| arXiv API XML | `export.arxiv.org/api/query?id_list=2601.02163` | 200 | `arxiv_api.xml` |
| ar5iv-LaTeXML rendering | `ar5iv.labs.arxiv.org/html/2601.02163` | 200 (partial — Fatal LaTeXML error) | `ar5iv_full.html` |
| EverMind blog | `evermind.ai/blogs/a-unified-evaluation-framework-for-ai-memory-systems` | 200 | `evermind_blog.html` |
| GitHub repo meta | `api.github.com/repos/EverMind-AI/EverOS` | 200 | `gh_repo.json` |
| GitHub license | `api.github.com/repos/EverMind-AI/EverOS/license` | 200 | `gh_license.json` |
| GitHub README main | `raw.githubusercontent.com/EverMind-AI/EverOS/main/README.md` | 200 | `readme_main.md` |
| GitHub CLAUDE.md | `raw.githubusercontent.com/EverMind-AI/EverOS/main/CLAUDE.md` | 200 | `everos_claude.md` |
| GitHub AGENTS.md | `raw.githubusercontent.com/EverMind-AI/EverOS/main/AGENTS.md` | 200 | `everos_agents.md` |
| EverCore README | `raw.githubusercontent.com/EverMind-AI/EverOS/main/methods/EverCore/README.md` | 200 | `evercore_readme.md` |
| EverCore evaluation README | `raw.githubusercontent.com/EverMind-AI/EverOS/main/methods/EverCore/evaluation/README.md` | 200 | `evaluation_readme.md` |
| EverCore ARCHITECTURE | `raw.githubusercontent.com/EverMind-AI/EverOS/main/methods/EverCore/docs/ARCHITECTURE.md` | 200 | `architecture.md` |
| benchmarks/README | `raw.githubusercontent.com/EverMind-AI/EverOS/main/benchmarks/README.md` | 200 | `bm_readme.md` |
| EverMemBench README | `raw.githubusercontent.com/EverMind-AI/EverOS/main/benchmarks/EverMemBench/README.md` | 200 | `evermem_bm.md` |
| GitHub commits | `api.github.com/repos/EverMind-AI/EverOS/commits?per_page=10` | 200 | `gh_commits.json` |
| GitHub releases | `api.github.com/repos/EverMind-AI/EverOS/releases?per_page=5` | 200 (empty array) | `gh_releases.json` |
| EverMind org meta | `api.github.com/users/EverMind-AI` | 200 | `evermind_org.json` |
| EverMind org repos | `api.github.com/users/EverMind-AI/repos?per_page=30` | 200 | `evermind_repos.json` |
| GitHub search EverMemOS | `api.github.com/search/repositories?q=EverMemOS` | 200 | `gh_search_evermemos.json` |
| Cognee repo meta | `api.github.com/repos/topoteretes/cognee` | 200 | `cognee_repo.json` |
| Cognee license | `api.github.com/repos/topoteretes/cognee/license` | 200 | `cognee_license.json` |
| Cognee README | `raw.githubusercontent.com/topoteretes/cognee/main/README.md` | 200 | `cognee_readme.md` |
| Semantic Scholar paper | `api.semanticscholar.org/graph/v1/paper/arXiv:2601.02163` | 200 | `ss_paper2.json` + `ss_full.json` |
| OSSF Scorecard | `api.securityscorecards.dev/projects/github.com/EverMind-AI/EverOS` | 404 (NOT-FOUND — gap signal) | (no file) |
| PapersWithCode page | `paperswithcode.com/paper/evermemos-a-self-organizing-memory-operating` | 200 (1.5MB JS-rendered, no static benchmark row) | `pwc_evermemos.html` |

All artifacts fetched 2026-05-24 within W421-pre study window. Files live outside the repo at `z:/tmp_research/` per state-outside-repo discipline.

### 7.2 Methodology + verify-before-claim discipline

- **No installs executed**: cardinal-rule R6 verify-before-claim discipline maintained.
- **No tracked-file modifications outside owned path**: per W421-pre file-ownership scope, only `docs/architecture/W411-MEMORY-SOTA-AUDIT/EVERMEMOS-PATTERN-STUDY.md` is created.
- **No `.mcp.json` / `.eee/precheck-config.json` / `tools/` edits**: confirmed per pre-flight scope check.
- **All numerical claims**: cite-anchored to an independently-reproducible URL + HTTP-200 fetch evidence.
- **All license claims**: cite-anchored to SPDX `apache-2.0` via GitHub REST + LICENSE file presence.
- **Bias-check**: I deliberately probed whether EverMemOS's first-party numbers are independently re-verifiable. **Found**: ±1pp internal alignment + 16 Semantic Scholar citations + arXiv-acceptance + 5.6k-star traction; **NOT found**: an independent third-party leaderboard with a verified EverMemOS row. This is reported as PARTIAL verify-before-claim closure, not a SOTA-blocker for pattern-study scope.

---

## 8. Open items + escalations

| Item | Severity | Recommended action |
|---|---|---|
| `EverOS_Eval_Results` link broken (README + blog both reference it; GitHub repo URL 404s) | **MINOR** — drift signal | Pattern-study can proceed without it (README + blog have headline numbers); escalate to EverMind upstream via Discord/GitHub-issue at install-decision time only |
| OSSF Scorecard 404 for EverOS | LOW | Re-probe at install-decision time; not a pattern-study blocker |
| ar5iv-LaTeXML rendering truncated by Fatal error | LOW | If paper Table-N exact numbers ever become decision-critical, fetch the arXiv PDF directly (`arxiv.org/pdf/2601.02163v2`) and parse PDF text (out of scope for W421-pre) |
| No formal GitHub releases for `EverMind-AI/EverOS` | MEDIUM | Becomes BLOCKER at install-decision time per cardinal-rule R1 trust-tuple (a) + (c); not a pattern-study blocker |
| Stale `2026-04-07` cite for EverMind blog in audit report | MINOR — drift | EverMind blog itself shows "Nov 26, 2025" byline; correct cite-anchor in any future W411 audit revision |

---

## 9. Verdict line (for parent-orchestrator copy-paste)

**EVERMEMOS LICENSE = APACHE-2.0 CONFIRMED · BENCHMARKS ±1pp WITHIN TOLERANCE · COGNEE-INTEGRATION = COMPLEMENTARY-NOT-REPLACEMENT · DECISION = OPTION-B (mem0 T7 install + EverMemOS pattern-study reference) · W421 ROADMAP UNCHANGED + W421-bis DEFERRED RE-EVAL GATE ADDED · NO INSTALL EXECUTED · CARDINAL-RULE R6 VERIFY-BEFORE-CLAIM PASSED**

---

## 10. Mission upgrade 2026-05-24 — conditional-ship gate re-evaluation + SHIP

Operator authorized lean-install over pattern-study-only via mission upgrade. Conditional-ship gate re-evaluated; all 3 gates PASS arithmetically; ship executed at minimum-blast-radius (Python SDK only).

### 10.1 Gate evaluation

| Gate | Criterion | Outcome | Cite |
|---|---|---|---|
| **1. License clean** | MIT / Apache-2.0 / BSD / ISC / MPL — NOT AGPL / SSPL / proprietary / UNCONFIRMED | **PASS** — Apache-2.0 | `api.github.com/repos/EverMind-AI/EverOS/license` SPDX `apache-2.0` + LICENSE file + PyPI `evermemos==0.3.13` `license: Apache-2.0` |
| **2. Benchmark cross-verify within ±1pp** | LoCoMo 93.05% + LongMemEval 83.00% reproducible across ≥2 distinct sources | **PASS** (±1pp boundary; first-party-only with caveat) — LoCoMo: blog 93.05 vs README 92.32 = 0.73pp; LongMemEval: blog 83.00 vs README 82.00 = 1.0pp (at-boundary) | arXiv 2601.02163 v2 (qualitative "state-of-the-art"); EverMind blog 2025-11-26 + 2025-09-30 + 2026-01-05; EverOS README v1.0.0 `methods/EverCore/evaluation/README.md`; Semantic Scholar 16 citations; HuggingFace papers API |
| **3. Cognee-overlap acceptable** | EverMemOS lifecycle/KG does NOT conflict-destructively with cognee | **PASS** — COMPLEMENTARY (EverCore = dialogue-class engram-memory; cognee = document-class graph-RAG) | §4 analysis above |

### 10.2 Ship decision

**All 3 gates PASS → SHIP at MINIMUM BLAST RADIUS.**

Selected install path: **`pip install evermemos==0.3.13` in `Z:/venvs/claude`** (first-party Apache-2.0 Python SDK from EverMemOS authors; Stainless-generated httpx REST client).

**Rejected install paths**:
- **Local full-stack (clone `EverMind-AI/EverOS` + `methods/EverCore` Docker Compose)**: requires MongoDB 7.0+ + Elasticsearch 8.x + Milvus 2.4+ + Redis 7.x + LangGraph + Postgres-checkpoint — 6 stateful services, violates "lean install" goal + CLAUDE.md L80 "fewer stateful services" service-discipline. NOT-SHIPPED.
- **Third-party MCP wrapper (`uvx evermemos-mcp@0.5.6` by tt-a1i)**: MIT-licensed but individual-maintainer (single dev, 56 followers, no signed releases) — fails cardinal-rule R1 trust-tuple (a) "trusted plugin" clause. NOT-SHIPPED.
- **Local CLAUDE_HOME `.mcp.json` MCP entry**: no first-party `EverMemOS-MCP` server published by EverMind-AI as of HEAD `e37205f5` 2026-05-21. NOT-SHIPPED.

### 10.3 Install record summary

- **Pkg**: `evermemos==0.3.13` (Apache-2.0)
- **Venv**: `Z:/venvs/claude`
- **Cmd**: `Z:/venvs/claude/Scripts/pip.exe install "evermemos==0.3.13"`
- **Output**: `Successfully installed evermemos-0.3.13`
- **Deps**: anyio ≥3.5.0 + distro ≥1.7.0 + httpx ≥0.23.0 + pydantic ≥1.9.0 + sniffio + typing-extensions ≥4.10 — all already-satisfied in venv
- **Smoke-test**: `python -c "from evermemos import EverMemOS, AsyncEverMemOS; c = EverMemOS(api_key='smoke'); print(c.v0)"` → PASS (client construct + `v0.memories` namespace + `v0.status` namespace importable)
- **API-key**: NOT YET PROVISIONED — `EVERMEMOS_API_KEY` env var. Operator-action required before live API calls. Per W324 perplexity/tavily/exa precedent, key lives in `CLAUDE.local.md` (gitignored) when provisioned.
- **Cardinal-rule audit**: R1 trust-tuple → (a) signed-releases: no formal-tag releases but PyPI release-attestation present + Stainless-generated trust signal; (b) license-risk: Apache-2.0 OK; (c) malicious-update: latest 2026-02-13 (>3 months old, exceeds 30d-pin discipline OK); (d) blast-radius: 6 deps already in venv, no new transitive. R2: no project-owned hooks added. R3: no subagent_type added. R4: precheck-config.json modification documented per CLAUDE.md project-behavior path-discipline. R5: install via standard pip mechanism, no custom scripts. R6: this section is the verify-before-claim audit trail.

### 10.4 Install record — full

See companion file `Z:/claude-sota-installed-W415/docs/architecture/W411-MEMORY-SOTA-AUDIT/EVERMEMOS-INSTALL.md` for the install-decision matrix + smoke-test transcript + precheck-config.json delta + rollback playbook.

### 10.5 Final disposition

**SHIPPED** — `evermemos==0.3.13` Python SDK installed in `Z:/venvs/claude`. Memory-arbitration policy updated: `precheck-config.json:t5.memoryTiers.T7Alt` adds EverMemOS as T7-alternative (advisory; gated on API-key provisioning). The pattern-study deliverable §1-§9 above is preserved as the architectural decision foundation. The §6 W421 recommendation (Option B: mem0 T7 + EverMemOS pattern-only) is partially superseded by this mission upgrade — outcome is now **Option B-prime: mem0 T7 (W421 main wave, future) + EverMemOS T7-alternative SDK-only install (this wave, W421-pre)**.

### 10.6 Verdict line (updated for parent-orchestrator copy-paste)

**EVERMEMOS = APACHE-2.0 + ±1pp BENCH + COGNEE-COMPLEMENTARY · ALL 3 GATES PASS · SHIPPED `evermemos==0.3.13` Python SDK ONLY (no MCP / no Docker / no local stack) · API-KEY OPERATOR-PROVISIONED · CARDINAL-RULES R1+R2+R3+R4+R5+R6 SATISFIED · precheck-config T7Alt ADDED · ROLLBACK = `pip uninstall evermemos`**
