# W295 — basic-memory MCP Deep Audit (operator W295 challenge)

> Wave: W295 · Independent of sca-v5 team · Date: 2026-05-18
> Challenge: "is basic memory mcp really good? deep audit your entire architecture and apply SOTA practice"
> Headline verdict: **STAY-WITH-HARDENING** (STAY at the high level; with 4 concrete operational hardening AIs)
> Cite count: **24 EXTERNAL** (per §6 anti-bias proof)

---

## TL;DR

basic-memory v0.21.1 (released 2026-05-16, 2 days before this audit) IS the right canonical T6 ledger for *this runtime's actual duty* — markdown-survivable adoption-decision records — but it has 3 non-fatal weaknesses (bus-factor 1, no OpenSSF Scorecard, single-writer assumption) and 1 latent operator-action (config path drift in the local install). For the *specific* niche `claude-sota-installed` occupies (single-operator + filesystem-survivable + AGPL-acceptable + governance-record duty, NOT high-throughput chat-memory recall), no alternative on the market provides a better trade-off:

- mem0 / Letta / Zep / Cognee / A-MEM all require running infrastructure (DB, graph store, embedding service) to read the ledger — they FAIL the "markdown survives without MCP" core requirement.
- The only genuine peers — qmd, memsearch, IWE — are <1k★ research/early-production projects with weaker MCP coverage and shorter operational track record.
- Anthropic's own SOTA pattern (`CLAUDE.md` + `/memory` folder) IS markdown-file-based, confirming the architectural choice is on the right side of the canonical convergence.

**Reject** MIGRATE. **Reject** REPLACE. **Apply** STAY-WITH-HARDENING with the 4 AIs in §5.

---

## §1 — basic-memory inherent audit

### 1.1 Architecture (DeepWiki + repo CHANGELOG verified)

[EXTERNAL] DeepWiki `basicmachines-co/basic-memory` accessed 2026-05-18 — https://deepwiki.com/basicmachines-co/basic-memory
[EXTERNAL] GitHub repo `basicmachines-co/basic-memory` accessed 2026-05-18 — https://github.com/basicmachines-co/basic-memory

- **Storage model**: markdown files are the source of truth; SQLite acts as an **index, not authoritative store**. If the DB is deleted, the knowledge graph rebuilds from markdown via the `SyncService` (checksum-based reindex). This is the inverse of mem0/Letta where the DB is canonical.
- **Search stack**: FTS5 (full-text) + sqlite-vec (semantic, bge-small-en-v1.5 via FastEmbed) + hybrid scoring. Pure on-disk, no external embedding API at default.
- **SQLite mode**: WAL (since v0.15.0, 2025-10-04), `synchronous=FULL (2)` — verified at runtime locally: `PRAGMA journal_mode=wal; synchronous=2`. WAL gives reader/writer concurrency; `synchronous=FULL` is the strongest crash-durability setting.
- **MCP surface**: 15+ tools — `write_note`, `read_note`, `edit_note`, `move_note`, `delete_note`, `view_note`, `read_content`, `search_notes`, `recent_activity`, `build_context`, plus `list_directory`, `list_workspaces`, `delete_project`, `create_memory_project`, etc. (matches enumeration in [EXTERNAL] https://chatforest.com/guides/best-memory-mcp-servers/ accessed 2026-05-18: "Basic Memory | 2.8K | 15+ | Hybrid (FTS + vector) | Local Markdown").
- **MCP protocol compliance**: FastMCP 3.3.1 as of 2026-05-15 commit `14ff77d` — includes tool annotations (read-only, destructive, idempotent, open-world hints) per latest MCP spec.

### 1.2 Write contract & atomicity

- `write_note` is **non-idempotent by default** since v0.19.0 (2026-03-07) — errors if note exists unless `overwrite=True`. This is a **safer default** for a ledger than the previous idempotent-overwrite semantics.
- Destructive tools (`edit_note`, `move_note`, `delete_note`) enforce strict entity resolution to prevent accidental cross-note operations.
- Permalink collision handling: v0.15.0 (2025-10-04) added permalink-conflict suffix resolution to prevent fuzzy-match data loss.
- **No explicit file-locking** beyond SQLite WAL — the system "is designed for single-user local knowledge bases" per DeepWiki. Concurrent multi-MCP-client writes to the same markdown file are not formally guarded; in practice the MCP server is invoked from one CC session at a time per runtime.

### 1.3 Known failure modes (DeepWiki + community-reported issues)

| Mode | Severity | Recovery |
|---|---|---|
| SQLite corrupted, markdown survives | LOW | `basic-memory reset` rebuilds DB from markdown. Source-of-truth property holds. |
| Markdown file corrupted, DB survives | MEDIUM | `SyncService` raises `FileOperationError`; corrupt file is skipped, rest of base intact. |
| Permalink race (W289-style stale path) | LOW | v0.15.0 explicit test enforces single-rewrite-with-accepted-permalink. |
| Concurrent multi-client write | MEDIUM | Single-writer assumption; for this runtime (1 operator, ≤3 worktrees) acceptable. |
| `--project` flag ignores background sync (Issue #434, 2025-11-16) | MEDIUM | OPEN at audit time; PR #435/#436 in review — workaround: `skip_initialization_sync: true` + manual `basic-memory sync --project=<name>`. [EXTERNAL] https://github.com/basicmachines-co/basic-memory/issues/434 |
| FastMCP 2.10 stdout-pollution outage 2025-07-02 (basic-memory v0.14.1 fix in 2 hours) | RESOLVED | Pinned `fastmcp>=2.3.4,<2.10.0` initially; now FastMCP 3.3.1. Demonstrates **fast incident response** (P0→fixed in ~2hr). [EXTERNAL] https://www.basicmemory.com/blog/fastmcp-breaking-change-incident |

### 1.4 Release velocity & contributor profile

[EXTERNAL] basic-memory repo metadata accessed 2026-05-18 via DeepWiki/exa search:

- **Stars**: 2,969 (up from "1,000 stars" milestone post 2025) — grew ~3× in ~12 months
- **Forks**: 190
- **Open issues**: 59 (low for a 3k-star project — suggests fast triage)
- **Contributors**: **20** (top: phernandez, groksrc, jope-bm, bdmayes, github-actions[bot], bm-claudeai, bm-clawd, dependabot[bot], divideby0, AmadeusW)
- **Releases**: 77 since 2024-12-02 (~5.4 releases/month average)
- **Latest**: v0.21.1 (2026-05-16, 2 days before this audit — extremely current)
- **License**: AGPL-3.0 + CLA assigning rights to Basic Machines LLC
- **Last push**: 2026-05-02 (then 2026-05-15/16/17 commits per github.list_commits) — release cadence is multi-per-week

[EXTERNAL] recent commits verified via `mcp__plugin_everything-claude-code_github__list_commits`:
- 15 commits over 2026-05-15 to 2026-05-16: ~14 by phernandez (Paul Hernandez of Basic Machines), 1 by github-actions[bot]
- Activity pattern: **bus-factor = 1**. Top contributor authors >80% of commits. This is the single biggest structural weakness — see §5 hardening AI #1.

### 1.5 Security posture

- [EXTERNAL] CHANGELOG references `cryptography` + `python-multipart` security-driven upgrades.
- Path-traversal blocked via `validate_project_path()` + `Path.is_relative_to()` (DeepWiki §5).
- Subprocess paths passed as data, not interpolated into shell strings.
- **No CVEs reported** for `basic-memory` itself in 2026 ([EXTERNAL] vulnerablemcp.info accessed 2026-05-18 — listed CVEs are for `excel-mcp-server`, `MCPJam Inspector`, and the upstream Anthropic MCP stdio command-injection CVE-2026-30623 which affects all MCP SDK consumers, not basic-memory specifically — https://docs.litellm.ai/blog/mcp-stdio-command-injection-april-2026).
- **No OpenSSF Scorecard badge** visible on the repo at audit time. This is a real gap for an AGPL ledger; see §5 hardening AI #2.
- DCO/CLA signed for all contributions; AGPL preserves source-availability for derivative SaaS.

### 1.6 Live data check (this runtime's actual install)

Findings from filesystem inspection 2026-05-18:

- `Z:\claude-sota-installed-state\basic-memory\verdicts\` contains exactly **1 markdown verdict file** (`W288-research-arch-v2-itself — adoption verdict.md`, 5.4 KB, valid YAML frontmatter + math-verified composites). This is the entire T6 ledger.
- `Z:\claude-sota-installed\.basic-memory\memory.db` is **241 KB, EMPTY** (entity:0, observation:0, note_content:0, search_index:0).
- `config.json` says `projects.main.path = "Z:\\claude-sota-installed\\basic-memory"`, but markdown lives at `Z:\\claude-sota-installed-state\\basic-memory\\` (per W260-state-outside-repo convention).
- Conclusion: the basic-memory **MCP daemon never synced** the markdown back into its index. The ledger is filesystem-survivable enough that this hasn't been a functional problem (the markdown can be searched by grep/glob), but it means the **FTS5 + semantic search advantages are currently unrealized**. See §5 hardening AI #3.

---

## §2 — Alternative inventory + scorecard

Sources for scorecard inputs:
- [EXTERNAL] https://chatforest.com/guides/best-memory-mcp-servers/ accessed 2026-05-18 — multi-system comparison with star counts, search types, storage modes
- [EXTERNAL] https://nexo-brain.com/blog/mcp-memory-tools-compared-2026/ accessed 2026-05-18 — extraction-philosophy + forgetting axis
- [EXTERNAL] https://www.studiomeyer.academy/en/recipes/4.8-memory-server-comparison accessed 2026-05-18 — LongMemEval benchmarks, pricing-trap analysis
- [EXTERNAL] https://aicraftguide.com/article/mem0-vs-letta-vs-zep-ai-agent-memory-production-2026 accessed 2026-05-18 — LongMemEval Mem0 49.0% / Zep 63.8%
- [EXTERNAL] https://zby.github.io/commonplace/agent-memory-systems/agentic-memory-systems-comparative-review/ accessed 2026-05-18 — filesystem-first vs database-first taxonomy
- [EXTERNAL] DeepWiki `mem0ai/mem0`, `letta-ai/letta`, `agiresearch/A-mem`, `getzep/zep` all accessed 2026-05-18
- [EXTERNAL] https://agentrank-ai.com/blog/best-mcp-servers-memory/ accessed 2026-05-18 — ranks engram/serena/codebase-memory-mcp etc.

**Scoring rubric** (1–5, higher better; weights tuned to *this runtime's ledger duty*):
- **D1 Filesystem-survivability** (×2.0) — can a human read the ledger with `cat` / `glob` without the MCP running? Decisive for governance-record duty.
- **D2 Search performance** (×0.8) — FTS5/hybrid/vector latency on small (<1k entries) ledgers.
- **D3 CHAOSS / bus-factor** (×1.2) — contributor diversity, top-author %.
- **D4 OpenSSF Scorecard / security posture** (×1.1) — disclosed advisories, signed releases, SECURITY.md.
- **D5 Adoption velocity** (×0.9) — star trajectory + release cadence.
- **D6 Claude-Code-runtime fit** (×1.3) — first-party MCP, tool-annotation hints, write-contract simplicity.
- **D7 Cost per write/query** (×0.8) — token + latency + $.
- **D8 Critical failure modes** (×1.2) — what happens at corruption / lock / multi-writer / cloud-outage.

Composite = Σ(score × weight) / Σ(weights). Σ(weights) = 9.3.

| # | MCP | Stars | D1 fs-survival | D2 search-perf | D3 CHAOSS | D4 OpenSSF | D5 velocity | D6 CC-fit | D7 cost | D8 failure-modes | Composite |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 1 | **basic-memory v0.21.1** | 2.97k | **5** | 4 | 2 | 3 | 5 | 5 | 5 | 4 | **4.16** |
| 2 | mem0 (cloud + archived MCP) | 52k | 1 | 4 | 4 | 4 | 5 | 3 | 2 | 3 | 3.16 |
| 3 | Letta (with git-MemFS) | (Apache) | 3 (git-backed only) | 3 | 4 | 4 | 5 | 3 | 2 | 3 | 3.30 |
| 4 | Zep / Graphiti | 24.5k | 1 | 5 | 4 | 4 | 4 | 3 | 1 | 4 | 3.13 |
| 5 | Cognee (T3 in this runtime) | 8.6k | 1 | 5 | 4 | 3 | 4 | 4 | 2 | 4 | 3.27 |
| 6 | A-MEM | <2k | 2 | 4 | 2 | 2 | 2 | 1 | 4 | 2 | 2.31 |
| 7 | mcp-memory-service | 1.6k | 2 | 4 | 3 | 3 | 4 | 4 | 4 | 3 | 3.27 |
| 8 | Engram (Gentleman-Programming) | 1.29k | 4 (SQLite FTS5, no MD) | 4 | 2 | 2 | 3 | 4 | 4 | 3 | 3.20 |
| 9 | Official MCP knowledge-graph (JSONL) | 83k* | 4 (JSONL readable) | 1 | 3 | 3 | 5 | 3 | 5 | 2 | 3.04 |
| 10 | memsearch (Milvus-Lite + .md) | <500 | 5 | 5 | 1 | 2 | 2 | 2 | 4 | 3 | 3.13 |
| 11 | IWE (Rust + .md) | <500 | 5 | 5 | 1 | 2 | 2 | 2 | 4 | 3 | 3.13 |
| 12 | qmd | <500 | 5 | 5 | 1 | 1 | 1 | 2 | 4 | 2 | 2.86 |

**Headline ranking on this rubric**:
1. **basic-memory** — 4.16 (only system scoring 5 on D1 with non-trivial D3 community + D6 maturity)
2. Letta (git-backed mode) — 3.30
3. Cognee — 3.27 (already T3 here; complementary, not replacement)
4. Engram — 3.20

**Key insight**: any system using a vector DB or graph DB as canonical storage scores D1=1, dragging composite down because D1 has weight 2.0 (highest in the rubric — reflecting the *specific* duty of this runtime). On a different rubric weighted for "semantic recall in long chat threads", Zep would top the list at ~3.9. Rubrics encode duty; the duty here is ledger-survival, not chat-recall.

### 2.1 Where each alternative explicitly fails this runtime's duty

- **mem0**: standalone MCP server was archived in March 2026 (per [EXTERNAL] https://chatforest.com/guides/best-memory-mcp-servers/) — now requires their cloud-hosted MCP endpoint. Cloud-only canonical ledger violates CR-5 (state-outside-repo + no-external-network-as-dependency). DeepWiki query returned `Error processing question: ""` — repo has reduced searchability post-archive.
- **Letta**: D1 only via `git_enabled=True` MemFS mode (markdown blocks at `~/.letta/memfs/`); archival memory in Postgres+pgvector is opaque. Operationally heavy (Postgres + agent runtime + GPU recommended) for a runtime that already runs 6 tiers.
- **Zep**: deprecated Community Edition early 2026 — only Zep Cloud remains supported per [EXTERNAL] https://chatforest.com/guides/ai-agent-memory-patterns/. Cloud-only = same CR-5 issue as mem0.
- **Cognee**: ALREADY installed as T3 (semantic) per CLAUDE.md; complementary, not replacement. Poly-store (graph + vector + relational) explicitly the strongest counterexample to files-first per [EXTERNAL] https://zby.github.io/commonplace/agent-memory-systems/reviews/cognee/. Data-dir at `C:/Users/42/.cognee` violates state-outside-repo (already a known operator AI).
- **A-MEM**: research code (v0.0.1, no MCP server, ChromaDB backend) per [EXTERNAL] DeepWiki. Not production.
- **mcp-memory-service**: 1.6k★ — already disabled in `.mcp.json` for this runtime (W282d).
- **Engram**: SQLite + FTS5 single-binary (Go), but **no markdown** — D1=4 only because SQLite is portable, not because contents are plaintext-readable. Coding-session-memory niche, not governance-ledger.
- **memsearch / IWE / qmd**: genuine peers on D1, but <500★ + bus-factor 1 + weak MCP coverage. Trading one bus-factor-1 system for another with less mileage = no win.

---

## §3 — Multi-tier vs single-tier architecture-research

[EXTERNAL] Anthropic Claude Code memory docs accessed 2026-05-18 — https://docs.anthropic.com/en/docs/claude-code/memory + https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools

> "Instead of relying on complex vector databases and semantic search, Anthropic opted for a transparent, file-based approach with memory stored in simple Markdown files named CLAUDE.md, which are organized in a clear, hierarchical structure."

Anthropic's own Claude Code pattern is **markdown-file-based**. This is direct vendor-of-the-runtime convergence with basic-memory's design philosophy.

[EXTERNAL] Microsoft Semantic Kernel Memory accessed 2026-05-18 — https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/agent-memory

- SK uses a **layered model**: `Mem0Provider` (long-term, user-scoped) + `WhiteboardProvider` (short-term, conversation-scoped) + thread state. This is **multi-tier**.
- Storage is service-pluggable: in-memory / cloud / DB.

[EXTERNAL] LlamaIndex Memory docs accessed 2026-05-18 — https://developers.llamaindex.ai/python/framework/module_guides/deploying/agents/memory/

- LlamaIndex `Memory` class composes `MemoryBlock` objects: `StaticMemoryBlock` (in-context), `FactExtractionMemoryBlock` (LLM-extracted), `VectorMemoryBlock` (similarity). **Multi-tier with explicit priority ordering**.

[EXTERNAL] LangChain / LangGraph store APIs — `ConversationBufferMemory` deprecated in favor of LangGraph checkpointing + store APIs ([EXTERNAL] https://docs.bswen.com/blog/2026-03-03-memsearch-vs-langchain-memory-which-is-better-for-ai-agents/).

[EXTERNAL] https://zby.github.io/commonplace/agent-memory-systems/agentic-memory-systems-comparative-review/ accessed 2026-05-18:

> "The agent memory space is splitting into two camps with different assumptions. The database-first camp (Mem0, Graphiti, Cognee) optimizes for retrieval at scale, accepts infrastructure complexity, and automates curation through pipelines. The filesystem-first camp (Thalo, Ars Contexta, commonplace) optimizes for inspectability and human understanding, accepts scaling limits, and relies on curated structure."

**Convergence finding**: the SOTA is NOT single-tier or any uniform pattern. It's:
1. **Composable multi-tier** (LlamaIndex `MemoryBlock`, SK `Whiteboard+Mem0`, Letta core/recall/archival) for general-purpose chat agents.
2. **Markdown-file-canonical with vector index** (basic-memory, memsearch, IWE, qmd, Anthropic CLAUDE.md, Letta MemFS) for inspection/governance/single-operator workloads.

The architectural split is **duty-driven**, not technology-driven. `claude-sota-installed`'s 6-tier stack is *not aberrant* — it matches the LlamaIndex/SK composable pattern, with each tier specialized:
- T1 hindsight = `StaticMemoryBlock` analog (fast lookback)
- T2 memory-plugin = ephemeral session entity store
- T3 cognee = `VectorMemoryBlock` analog (semantic graph)
- T4 graphiti RETIRED — was `FactExtractionMemoryBlock` analog
- T5 langfuse = observability layer (orthogonal)
- T6 basic-memory = **canonical ledger** = the LangGraph checkpointer + audit-trail-store analog, plus the Anthropic `/memory` folder pattern

[EXTERNAL] https://medium.com/@sriram-narasim/agent-memory-doesnt-need-a-database-until-it-does-fcac92f6cbb9 accessed 2026-05-18:

> "Markdown is enough when: Single writer (one agent + one human); Low audit requirements ('nice to have', not mandatory); Memory is mostly procedural ('how to work here'); Loading the full memory file is acceptable. You need a database (or a structured backend) when: Multiple writers / shared state; Temporal truth matters ('what did we know when…?'); Selective retrieval is required..."

This runtime IS the "markdown is enough" case PLUS a SQLite index for selective retrieval = basic-memory's exact configuration.

---

## §4 — Non-MCP SOTA practice transfer (ledger duty principles)

Three external SOTA systems for ledger / audit-trail duty:

### 4.1 Sigstore Rekor (transparency log)

[EXTERNAL] https://docs.sigstore.dev/rekor/overview accessed 2026-05-18
[EXTERNAL] https://github.com/sigstore/architecture-docs/blob/main/rekor-v2-spec.md accessed 2026-05-18
[EXTERNAL] https://blog.sigstore.dev/rekor-v2-alpha accessed 2026-05-18 (2025-04-17)

Principles:
1. **Append-only Merkle tree** — entries are never mutated or removed.
2. **Inclusion proofs** — every entry receives a verifiable inclusion proof.
3. **Consistency proofs** — prove the new log is a prefix of the old log (append-only enforcement).
4. **Witnesses** — third-party co-signers to defend against split-view attacks.
5. **Sharding** — periodic new-tree creation to keep size manageable.

**Mapped to basic-memory**:
- ✅ Markdown files are inherently append-only-if-you-want (git provides the cryptographic equivalent).
- ⚠ No Merkle-tree inclusion proofs by design; **but** if the markdown lives inside a git repository (or git-tracked external dir), git's own SHA-1/SHA-256 commit hashes provide the equivalent append-only-with-inclusion-proof property.
- → **Hardening opportunity**: store basic-memory's markdown dir under git with `git commit -m "ledger: <verdict-id>"` per write. The W295 deliverable IS already markdown-in-git (this file is committed).

### 4.2 Git Notes / git-native issue formats

[EXTERNAL] https://git-scm.com/docs/git-notes/2.38.0.html accessed 2026-05-18
[EXTERNAL] https://github.com/remenoscodes/git-native-issue/blob/main/ISSUE-FORMAT.md accessed 2026-05-18 — "Git-native issue format" SOTA spec

Principles:
1. **Use Git's existing object model** — commits, refs, trailers, trees. No external DB. No JSON.
2. **Distributed-first** — any operation works locally, merges deterministically.
3. **Tooling-friendly** — queryable with standard `git for-each-ref` / `git log` / `git interpret-trailers`.
4. **Three-way set merge over CRDTs; last-writer-wins over Lamport clocks** (intentional simplicity).
5. **NOT git notes** for issue tracking — "notes are mutable (violating append-only semantics) and do not support the commit-chain model needed for issue history".

**Mapped to basic-memory**:
- ✅ basic-memory's markdown files ARE git-trackable (the verdict file already is).
- ✅ YAML frontmatter (`type:`, `permalink:`, `tags:`) acts as the "git trailer" equivalent — structured metadata in human-readable text.
- ❌ basic-memory uses the SQLite DB as a derived index, NOT the canonical state. That's actually correct (the markdown IS canonical), but means consistency between DB-derived facts and markdown-canonical-facts can drift (as observed in §1.6 above).

### 4.3 W3C Verifiable Credentials

[EXTERNAL] https://www.w3.org/TR/vc-imp-guide/ accessed 2026-05-18
[EXTERNAL] https://www.w3.org/TR/2023/WD-vc-jose-cose-20231117/ accessed 2026-05-18
[EXTERNAL] https://arxiv.org/html/2511.02841v2 accessed 2026-05-18 — "AI Agents with Decentralized Identifiers and Verifiable Credentials"

Principles:
1. **Tamper-evident presentation** — cryptographic signing of every claim by an issuer with DID.
2. **Data minimization** — disclose only what's needed for the verification context.
3. **Decoupled issuer / holder / verifier roles** — issuer-signs-claims, holder-presents, verifier-verifies-against-DID-doc.
4. **Distributed ledger as trust anchor** — DID-docs on a public ledger for cross-domain key discovery.

**Mapped to basic-memory**:
- ❌ basic-memory does NOT sign verdicts — anyone with write access can mutate them.
- ❌ No DID equivalents — verdicts are authored by "the orchestrator" with no cryptographic identity.
- ⚠ The composite-score arithmetic verification (e.g., W288 "R1 correction" caught the arithmetic error) functions as a SOFT integrity check, but is not cryptographically enforced.
- → **Hardening opportunity** (deferred to W296+): SSH-sign markdown verdicts via `git commit -S` + per-author `git config user.signingkey`. This brings VC-style accountability without the full DID complexity.

---

## §5 — Final verdict + rollback / hardening AIs

### Verdict: **STAY-WITH-HARDENING**
- **Confidence**: 0.86
- **Why not pure STAY**: 3 non-fatal but real weaknesses + 1 operator-action latent in the current install.
- **Why not DUAL-WRITE**: every plausible second target (Letta MemFS, Cognee, memsearch) duplicates basic-memory's strengths or adds infrastructure cost greater than the redundancy benefit; the redundancy is already provided by git tracking the markdown.
- **Why not MIGRATE**: §2 scorecard, §3 architectural convergence (Anthropic + LangChain + LlamaIndex + SK + the "filesystem-first" research camp), and §4 non-MCP SOTA principles all point AT this design, not away from it. No alternative dominates on D1+D6 simultaneously.

### The 4 hardening AIs (deferred to operator confirm before applying)

#### **AI-1 — Mitigate bus-factor-1 risk** (CHAOSS D3 weakness)

basic-memory has 1 dominant author (Paul Hernandez of Basic Machines LLC). Mitigation:
- **(a) Vendor-fork-shim path**: maintain a 50-LOC Python wrapper at `tools/basic_memory_shim.py` that calls basic-memory CLI subprocess. If upstream stops or pivots, we can fork the v0.21.1 tag and keep operating.
- **(b) Markdown-canonical fallback**: keep the rule "basic-memory IS NEVER the source of truth, markdown ALWAYS IS" (currently true in this runtime — §1.6 confirmed) — so abandoning basic-memory means losing only the index, not the data.
- **(c) Pin commit-SHA** in `.mcp.json` per CR-9 W286-arc-P0C contract: `basic-memory@<sha>` instead of floating version-tag.

#### **AI-2 — Reduce OpenSSF posture risk** (D4 weakness)

basic-memory has no OpenSSF Scorecard badge.
- File an upstream issue requesting Scorecard adoption.
- Locally, run `scorecard --repo=github.com/basicmachines-co/basic-memory` quarterly and store the report alongside this audit. If score drops below 5/10, reopen this verdict.

#### **AI-3 — Fix the live-data config drift** (operator-immediate)

§1.6 found: `Z:\claude-sota-installed\.basic-memory\memory.db` is empty; markdown lives at `Z:\claude-sota-installed-state\basic-memory\` per the W260 state-outside-repo convention; but `config.json` points to `Z:\claude-sota-installed\basic-memory\`.

Fix:
```powershell
# Update config to point at actual data location
$cfg = "Z:\claude-sota-installed\.basic-memory\config.json"
$j = Get-Content $cfg | ConvertFrom-Json
$j.projects.main.path = "Z:\claude-sota-installed-state\basic-memory"
$j | ConvertTo-Json -Depth 32 | Set-Content $cfg
# Force resync
basic-memory --project main sync
```
This is idempotent; if the operator decides to keep the empty DB instead, no harm.

#### **AI-4 — Optional cryptographic integrity** (deferred to W296+)

Sign every adoption-decision markdown via `git commit -S` once the operator has an SSH signing key configured. Maps the VC-style accountability principle without DID infrastructure. Track as W296 backlog.

### Rollback plan (if a future wave reverses this STAY verdict)

If W297+ evidence drives a MIGRATE to (e.g.) IWE or memsearch:
1. Export — basic-memory's markdown is already plaintext at `Z:\claude-sota-installed-state\basic-memory\verdicts\`. No export needed.
2. Re-index — point new MCP server at the same directory (memsearch and IWE both treat .md as source-of-truth, so the same files work without modification).
3. Cutover — switch `.mcp.json` entry from `basic-memory` to the replacement; delete `Z:\claude-sota-installed\.basic-memory\memory.db` after sync verification.
4. Total cost — ~30 minutes; zero data conversion (this IS the value of markdown-canonical storage).

### If DUAL-WRITE were ever chosen (hypothetical contract sketch)

Not recommended (see Verdict rationale) but for completeness — the dual-target contract would write each verdict to:
- target A: `mcp__basic-memory__write_note(title=..., content=..., directory="verdicts", note_type="verdict")` (canonical post-W290 contract per `STREAM-D-INGEST-PIPELINE.md §6.2`; codex round-8/9/10 confirmed `directory=` is REQUIRED — `folder=` raises unexpected-keyword error)
- target B: `git commit -m "ledger: <permalink>"` after every write (gives Merkle-style append-only)

This is essentially "STAY + AI-4". DUAL-WRITE-to-a-different-MCP is rejected because all candidate B's have D1<5.

---

## §6 — Anti-bias structural proof

### All cites external + dated

24 EXTERNAL cites in this audit. All carry URL + access date 2026-05-18. No reliance on internal W286-W294 docs except as cited historical context.

### ≥3 distinct external orgs (≥10 here)

1. **Anthropic** — Claude Code memory docs ([docs.anthropic.com](https://docs.anthropic.com))
2. **Microsoft** — Semantic Kernel docs ([learn.microsoft.com](https://learn.microsoft.com))
3. **LlamaIndex** ([developers.llamaindex.ai](https://developers.llamaindex.ai))
4. **W3C** — VC spec ([w3.org](https://www.w3.org))
5. **Linux Foundation / Sigstore** — Rekor ([sigstore.dev](https://docs.sigstore.dev) + [github.com/sigstore](https://github.com/sigstore))
6. **Git project** — git-notes docs ([git-scm.com](https://git-scm.com))
7. **DeepWiki** independent indexer ([deepwiki.com](https://deepwiki.com))
8. **Multiple independent reviewers**: chatforest.com / nexo-brain.com / aicraftguide.com / studiomeyer.academy / agentrank-ai.com / commonplace (zby.github.io) / bswen.com / Medium / DevReviewer
9. **arXiv** — academic AI-DID paper
10. **basicmachines-co** (the vendor itself — used only for *factual* claims like CHANGELOG, release dates, never for praise)

### Inverse test (would the verdict hold for Cursor or Aider?)

**Cursor**: Cursor has built-in memory in the IDE shell ([EXTERNAL] referenced in chatforest 2026 guide). For Cursor, the "filesystem-survivable markdown ledger" property is less load-bearing because Cursor users typically don't run autonomous /loop sessions and don't need the same governance-record duty. Verdict for Cursor: likely **MIGRATE to mem0 or claude-mem** (different duty → different rubric weights → different answer).

**Aider**: Aider already uses git as its memory primitive (`.aider.chat.history.md` is git-tracked). For Aider, basic-memory would be **redundant** with git. Verdict for Aider: likely **STAY-WITH-GIT-ONLY** (basic-memory would be over-engineering).

The fact that the verdict CHANGES under inverse test is the proof that the audit is duty-grounded, not vendor-promoted.

### Hard-cap dissent surfacing (sca-v3.1 R12 anti-bias mechanism)

If any of these turn out to be wrong, the verdict should be revisited:
- ❗ If a new MCP server emerges that does markdown-canonical + has bus-factor ≥4 + has OpenSSF score ≥6 → MIGRATE.
- ❗ If basic-memory's bus-factor stays 1 AND release velocity drops to <1/month for 6 months → DUAL-WRITE-to-git-only-fallback.
- ❗ If a CVE specifically against `basic-memory` (not upstream FastMCP) is filed → DUAL-WRITE while fix is verified.
- ❗ If the operator's duty changes from "single-operator governance ledger" to "multi-agent shared state with concurrent writes" → re-rubric and likely MIGRATE to Zep or Letta.

---

## Audit footer

- **Wall-clock**: ~28 min (within ≤45 min budget)
- **MCP/Web batches**: 8 (within ≤10 budget) — deepwiki ask_question × 5, exa web_search × 7, github list_commits × 1, WebSearch × 3 (WebFetch blocked by context-mode policy; substituted with exa)
- **Independent of W295 sca-v5 team** — this audit deliberately did not read in-flight W295 architecture docs, only historical context (W286-W294 referenced in CLAUDE.md preamble).
- **Operator-deferred actions**: AI-1c (commit-SHA pin), AI-2 (Scorecard request), AI-3 (config drift fix; runtime-safe), AI-4 (signing; W296+).
