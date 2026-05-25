# Memory + RAG SOTA — Catalog Coverage Audit (W259v16)

> **Mission:** The operator pasted their own ~50-repo memory/RAG catalog and asked a DEFINITIVE question — does the W259 grand catalog cover every SOTA memory/RAG repo, or are there gaps? This is a **COVERAGE check** (is the repo catalogued), NOT a benchmark re-litigation. Every repo in the operator's list is cross-checked against `docs/architecture/W259-grand-catalog/` repo-by-repo.
>
> **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Constituents (2026-05-16): grep cross-reference of the W259 catalog tree + the four memory deep-dives (`MEMORY-LAYER-RECONCILED-W259v4.md`, `MEMORY-LAYER-FORENSIC-W259v2.md`, `MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md`, `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md`) + `COGNEE-INTEGRATION-CLAUDE-W259v6.md` + `SOTA-COMMUNITY-REPOS-W259v14.md` / `-W259v15-GITNEXUS.md` + `MASTER-SCORING-MATRIX-W259.md` + `02-layer-deepdive/LAYER-A-memory-rag-vector-kg.md` + GitHub MCP live metadata for the one not-found repo.
>
> **Benchmark-number discipline (operator-flagged):** the operator's pasted catalog cites Hindsight 91.4% and OMEGA 95.4% as if independently true. `MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md` already corrected BOTH to `[SELF-REPORTED]` (no memory engine has an independently-reproduced LongMemEval number; no official leaderboard exists). This audit does **not** re-import those numbers as truth — it only checks catalog presence.

---

## §0 — Headline verdict

> **The W259 memory/RAG catalog is SATURATED. Of the ~50 repos in the operator's pasted catalog, 49 are already catalogued and dispositioned. Exactly ONE — `MemoClaw/Eve` — is not found, and it is a low-signal, name-ambiguous, unverifiable repo that is CORRECTLY excluded (no native-CC pathway evidence, no resolvable GitHub identity). There are ZERO genuine gaps requiring a new catalog row.**

The operator's catalog maps cleanly onto the W259 memory work because the W259 memory deep-dives were *built from* an operator-supplied ~50-58-repo memory catalog in the first place (`MEMORY-LAYER-RECONCILED-W259v4.md §0` mission line: "Reconcile the operator's ~50-repo researched memory catalog"). This audit confirms the reconciliation is complete and re-derives the receipt.

`topoteretes/cognee-integration-claude` — the repo the operator named explicitly — **IS catalogued**, with its own dedicated deep-dive (`COGNEE-INTEGRATION-CLAUDE-W259v6.md`, composite ≈48, `REJECT-FOR-FIT`). See §4.

---

## §1 — Full coverage table

Legend — **Catalog doc**: `RECON`=`MEMORY-LAYER-RECONCILED-W259v4.md` · `FOREN`=`MEMORY-LAYER-FORENSIC-W259v2.md` · `EVID`=`MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md` · `ULT`=`MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` · `COGNEE`=`COGNEE-INTEGRATION-CLAUDE-W259v6.md` · `MATRIX`=`MASTER-SCORING-MATRIX-W259.md` · `LAYER-A`=`02-layer-deepdive/LAYER-A-memory-rag-vector-kg.md` · `COMM14/15`=`SOTA-COMMUNITY-REPOS-W259v14/v15`.

### 1.1 — Operator Tier-1 plugins

| Repo | In catalog? | Catalog tier / doc | Verdict |
|---|---|---|---|
| `thedotmack/claude-mem` | ✅ YES | `RECON` T1.1 + `MATRIX` row 6 (composite 89) + `FOREN` §4.1 | CATALOGUED — T1/T2 (Windows failure-modes flagged) |
| `supermemoryai/claude-supermemory` | ✅ YES | `RECON` T1.2 (~2.5k★, MIT, Pro-gated) | CATALOGUED — T1, cloud-gated |
| `letta-ai/claude-subconscious` | ✅ YES | `RECON` T1.3 + scored row (~74, T3) | CATALOGUED — T3 (explicitly a demo) |
| `vectorize-io/hindsight` (op. wrote "hindsight-memory") | ✅ YES | `RECON` T1.4 + T3.3 + `EVID` rank 1 + `ULT` T1 | CATALOGUED — **memory PRIMARY** (the catalog's #1 pick) |
| `AgriciDaniel/claude-obsidian` | ✅ YES | `RECON` T1.5 (MIT, 11 skills, Karpathy LLM-Wiki pattern) | CATALOGUED — T1 knowledge-engine |
| `basicmachines-co/basic-memory` | ✅ YES | `RECON` T1.6 + scored row (~68, T3) | CATALOGUED — T3 (AGPL D1 penalty) |
| `georgeantonopoulos/obsidian-cli-memory-bank-skill` | ✅ YES | `RECON` T1.7 (cardinal-rule-2 conflict flagged) | CATALOGUED — CITE-PATTERN only |
| `russbeye/claude-memory-bank` | ✅ YES | `RECON` T1.8 (memory-bank pattern, Cline-lineage) | CATALOGUED — T1 |
| `napkin` | ✅ YES | `RECON` T1.9 (~416★) | CATALOGUED — WATCH (low-star) |
| `ensue-skill` | ✅ YES | `RECON` T1.10 (~393★) | CATALOGUED — WATCH (low-star) |
| `homunculus` | ✅ YES | `RECON` T1.11 (~216★) | CATALOGUED — WATCH (low-star) |
| `cartographer` | ✅ YES | `RECON` T1.12 (~420★) | CATALOGUED — WATCH (low-star) |
| `iannuttall/claude-sessions` | ✅ YES | `RECON` T1.13 (~1.1k★, session-mgmt) | CATALOGUED — T1 adjacent |
| `claude-canvas` | ✅ YES | `RECON` T1.14 (~1.1k★, visual companion) | CATALOGUED — T1, not memory-core |
| `musistudio/claude-code-router` | ✅ YES | `RECON` T1.15 (~25.3k★) | CATALOGUED — **mis-filed by operator** (it is an L1 router, not memory; catalog notes this) |
| `MemU` / `NevaMind-AI/memU` | ✅ YES | `RECON` T1.16 (~3.5k★, Apache-2.0, 92.09% LoCoMo) | CATALOGUED — WATCHLIST (no LongMemEval, no native CC) |
| `memory_layer` (rohitg00 toolkit = `rohitg00/agentmemory`) | ✅ YES | `RECON` T1.17 + scored row (~72, T2) | CATALOGUED — T2 STUDY-PILOT (decay engine) |

### 1.2 — Operator Tier-2 MCP servers

| Repo | In catalog? | Catalog tier / doc | Verdict |
|---|---|---|---|
| `@modelcontextprotocol/server-memory` | ✅ YES | `RECON` T2.1 (MIT, Anthropic-reference) | CATALOGUED — T2 baseline |
| `doobidoo/mcp-memory-service` | ✅ YES | `RECON` T2.2 + scored row (~84, T1 STUDY-PILOT) | CATALOGUED — T1 pilot lane (honest, Windows-clean, OAuth) |
| `CaviraOSS/OpenMemory` | ✅ YES | `RECON` T2.3 + scored row (~78) + `ULT` §4 | CATALOGUED — T2 STUDY-PILOT (belief-quality angle) |
| `mem0-mcp-selfhosted` (`elvismdev/...`) | ✅ YES | `RECON` T2.4 + `LAYER-A` §1 (84★) | CATALOGUED — T2 (mem0-engine ceiling) |
| `WhenMoon-afk/claude-memory-mcp` | ✅ YES | `RECON` T2.5 | CATALOGUED — T2 community MCP (un-verified) |
| `mem0ai/mem0-mcp` | ✅ YES | `RECON` T2.6 (Apache-2.0, upstream) | CATALOGUED — T2 |
| `Heirloom` | ✅ YES | `RECON` T2.7 (Rust, AES-encrypted SQLite) | CATALOGUED — STUDY only (license unverified) |
| `mcp-obsidian` | ✅ YES | `RECON` T2.8 (MIT, Obsidian bridge) | CATALOGUED — T2 adjacent |
| `bitbonsai/mcpvault` | ✅ YES | `RECON` T2.9 (secrets vault MCP) | CATALOGUED — T2 adjacent, not memory-core |

### 1.3 — Operator Tier-3 engines

| Repo | In catalog? | Catalog tier / doc | Verdict |
|---|---|---|---|
| OMEGA (omegamax.co) | ✅ YES | `RECON` T3.1 + scored row (~78) + `FOREN` §3.1 + `EVID` rank 3 + `MATRIX` §0.5 (T2 STUDY-PILOT) | CATALOGUED — T2 PILOT (Windows-untested, Axis-1 fail) |
| Mastra OM (`mastra-ai/mastra`) | ✅ YES | `RECON` T3.2 + scored row (~80) + `FOREN` §3.2 + `EVID` rank 6 | CATALOGUED — CITE-PATTERN (no native CC plugin) |
| `vectorize-io/hindsight` | ✅ YES | (see §1.1 — memory PRIMARY) | CATALOGUED — T1 PRIMARY |
| Emergence AI (EmergenceMem) | ✅ YES | `RECON` T3.4 + §2.1 table (86%, proprietary) | CATALOGUED — proprietary, not installable |
| `letta-ai/letta` | ✅ YES | `RECON` T3.5 + scored row (~76, T3) + `LAYER-A` §4 (83.2%) | CATALOGUED — T3 CITE-PATTERN (competing harness) |
| `supermemoryai/supermemory` | ✅ YES | `RECON` T3.6 + `MATRIX` row 33 (84) + `LAYER-A` §4 | CATALOGUED — T2 STUDY-PILOT |
| `getzep/graphiti` (op. wrote "getzep/graphiti") | ✅ YES | `RECON` T3.7 + scored row (~85) + `MATRIX` row 16 (87) + `EVID` rank 2 + `ULT` T4 — **INSTALLED-LIVE** | CATALOGUED — T1 INSTALL (incumbent temporal tier) |
| `mem0ai/mem0` | ✅ YES | `RECON` T3.8 + `MATRIX` row 34 (84) + `MATRIX` §0.5 (T3 DOWNGRADED) | CATALOGUED — T3 (engine ceiling 49-66%) |
| `cognee-ai/cognee` (org is `topoteretes`) | ✅ YES | `RECON` Tier-3B + `COGNEE` (full deep-dive) + `LAYER-A` §3 + `ULT` T3 | CATALOGUED — T3 cold GraphRAG tier (the catalog uses correct org `topoteretes`) |
| `langchain-ai/langmem` | ✅ YES | `RECON` §1 "Other engines" table (MIT, LangChain-coupled) | CATALOGUED — framework-coupled, not standalone install |
| `plastic-labs/honcho` | ✅ YES | `RECON` §1 table + scored row (~70, T3) + `FOREN` §4 (STUDY-PILOT) | CATALOGUED — T3 (AGPL penalty; "Dreaming" interesting) |
| `Memori` (`GibsonAI/memori`) | ✅ YES | `RECON` §1 table (Apache-2.0, LLM-call interception, no CC primitive) | CATALOGUED — no CC primitive |
| `MemoClaw/Eve` | ❌ **NOT FOUND** | — | **see §3 — CORRECTLY EXCLUDED (unresolvable identity, no CC pathway)** |
| `MemPalace` | ✅ YES | `FOREN` §4.6 (dedicated sub-section) + §2.1 table + `RECON` §0.5 (E2E-vs-R@5 metric correction) | CATALOGUED — STUDY-PILOT-with-due-diligence (benchmark dispute flagged) |
| Cloudflare Agent Memory | ✅ YES | `RECON` §1 table (managed, Durable Object + Vectorize) + `FOREN` §4 | CATALOGUED — CF-side, not CC-native |
| Atlan | ✅ YES | `RECON` §1 table (paired with byterover line) | CATALOGUED — noted, not memory-core |
| byterover (Cipher) | ✅ YES | `RECON` §1 table + `LAYER-A` §4 (`campfirein/byterover-cli`) + `MATRIX` row 17 (`byterover-cli`, 87) + `FOREN` §4.5 | CATALOGUED — T1 BENCHMARK-vs-Graphiti (native CC skill) |

### 1.4 — Named explicitly by operator

| Repo | In catalog? | Catalog tier / doc | Verdict |
|---|---|---|---|
| `topoteretes/cognee-integration-claude` | ✅ YES | `COGNEE` §0 — **dedicated deep-dive**, 23-dim scored, composite ≈48 | CATALOGUED — `REJECT-FOR-FIT` (Agent-SDK lib, not a CC integration; no LICENSE; 5mo stale). See §4. |

### 1.5 — Community repos to check for catalog presence

| Repo | In catalog? | Catalog tier / doc | Verdict |
|---|---|---|---|
| `addyosmani/agent-skills` | ✅ YES | `COMM14` §1.4 (deep-dive, composite 88, T1 INSTALL — reclassify ACTIVE) | CATALOGUED — installed; W259v14 corrected its "dormant" mis-class |
| `Shubhamsaboo/awesome-llm-apps` | ✅ YES | `COMM14` §1.5 (deep-dive, composite ≈60) | CATALOGUED — SKIP for a CC runtime (LLM-app example corpus, not a CC primitive) |
| `abhigyanpatwari/GitNexus` | ✅ YES | `COMM15-GITNEXUS` (dedicated deep-dive, composite 70) + `MATRIX` row 99 | CATALOGUED — T2 STUDY-PILOT (installed; PolyForm-NC license caps adoption) |
| `mattpocock/skills` | ✅ YES | `COMM14` §1.6 (re-verify) + `MATRIX` row 53 (88) | CATALOGUED — T2 STUDY-PILOT |
| `hesreallyhim/awesome-claude-code` | ✅ YES | `COMM14` §1.3 (deep-dive, composite ≈76) | CATALOGUED — T3 discovery index (ND-license caveat) |
| `msitarzewski/agency-agents` | ✅ YES | `COMM14` §1.7 (deep-dive, composite ≈60) | CATALOGUED — SKIP (no native plugin pathway; dominated by wshobson) |
| `wshobson/agents` | ✅ YES | `COMM14` §1.8 (re-verify) + `MATRIX` row 7 (89) | CATALOGUED — T1 INSTALL SELECTIVE |

**Coverage count: 49 IN catalog / 1 NOT FOUND (of 50 distinct operator entries; `vectorize-io/hindsight` and `topoteretes/cognee-integration-claude` each counted once).**

---

## §2 — Catalog enrichment beyond the operator's list (context)

The W259 catalog is not merely *equal* to the operator's catalog — it is a **superset**. Memory/RAG repos catalogued that the operator's pasted list did **not** name:

- **`mem0ai/claude-code-plugin`** ("OpenMemory" — the mem0 CC plugin) — `RECON` T1.18.
- **6 Wave-2 round-2 repos** flagged by `COGNEE` §2.2 as not-yet-reconciled into `RECON §1`: `MemTensor/MemOS`, `MemMachine/MemMachine`, `EverMind-AI/EverOS`, `memodb-io/Acontext`, `zilliztech/memsearch`, `neo4j-labs/agent-memory`. (These are tracked in `01-graphql-discovery/MISSED-SOTA-REPOS-ROUND2-W259v2.md` + scored in `05-scoring/ROUND2-MISSED-SCORED-W259v3.md` — catalogued, just not folded into the single RECON table.)
- **`topoteretes/cognee-integrations`** (the `cognee-memory` CC plugin, pathway B) — `COGNEE` §1.2 — architecturally the best cognee↔CC bridge but license-blocked.
- **88-repo research-beyond sweep** — `ULT` §4 surveyed `zilliztech/memsearch`, `Tencent/TencentDB-Agent-Memory`, `FlowElement-ai/m_flow`, `oceanbase/powermem`, `zjunlp/LightMem`, `samvallad33/vestige`, `memvid/claude-brain`, `swarmclawai/swarmvault`, `MemTensor/HaluMem` — verdict: none displaces the 5-tier architecture.
- Research-tier: `A-MEM`, `MIRIX`, `MemoryOS`, `LiCoMemory` — `RECON §1` "research-tier" line.

This confirms the catalog's memory coverage is *broader* than the operator's catalog, not narrower — a second independent signal of saturation.

---

## §3 — The single NOT-FOUND repo: `MemoClaw/Eve`

| Field | Finding |
|---|---|
| Operator entry | "MemoClaw/Eve" (listed under Tier-3 engines) |
| W259 catalog presence | **NOT FOUND** — zero hits for `MemoClaw` or `MemClaw` across the entire `W259-grand-catalog/` tree (incl. `00-archive-from-prior-waves/`). |
| GitHub identity | **Unresolvable as written.** "MemoClaw/Eve" does not correspond to a discoverable `owner/repo` of any star significance. `MemoClaw` is not a known memory-engine org; `Eve` as a repo name is generic and collision-heavy. The token most likely refers to a very-low-signal or renamed/private project, or an operator transcription artifact. |
| Native-CC pathway | **No evidence of any** — no plugin.json, no MCP server, no CC skill surfaced by any catalog wave or by the 88-repo research-beyond sweep (`ULT §4`). |
| Star / recency / license | Not determinable — no resolvable repo. |

### Verdict: `MemoClaw/Eve` — **CORRECTLY EXCLUDED**

This is **not a genuine gap**. A repo qualifies as a genuine gap only if it is (a) identifiable, (b) high-quality, and (c) has a native-CC pathway or strong-org backing. `MemoClaw/Eve` fails (a) outright — it has no resolvable GitHub identity — and shows zero evidence of (b) or (c). The W259 memory waves ran three GitHub topic sweeps (`ULT §4`: 88 repos) plus the operator's own ~58-repo catalog plus a Wave-2 round-2 missed-repo discovery; a memory engine with any adoption signal would have surfaced. Recording it as a catalog row would be cataloguing noise.

**Recommended catalog action:** record `MemoClaw/Eve` in the REJECT/NOT-FOUND ledger as "unresolvable identity — no native-CC pathway evidence — not a genuine gap" so a future wave does not re-surface it as an open question. **No scored row is warranted.** If the operator can supply the actual `owner/repo` URL, a one-repo deep-dive can be run — but on the information given, exclusion is correct.

---

## §4 — `topoteretes/cognee-integration-claude` — explicit assessment

The operator named this repo explicitly and asked whether it belongs in the catalog as cognee's native-CC pathway. **It is already fully catalogued** — `COGNEE-INTEGRATION-CLAUDE-W259v6.md` is a dedicated deep-dive of exactly this repo. The W259 finding (re-confirmed here, not re-litigated):

- **It IS in the catalog.** `COGNEE` §0 carries a full 23-dimension score: composite **≈48 → `REJECT-FOR-FIT`**.
- **It is NOT cognee's native-CC pathway.** `cognee-integration-claude` is a **Claude *Agent SDK* (Python) library** — two `@tool`-decorated functions for `create_sdk_mcp_server()`. It has no `.claude-plugin/`, no `plugin.json`, no `.mcp.json`, no `SKILL.md`, no hooks. A CC-CLI runtime cannot consume it without bespoke Python glue (a cardinal-rule-1 self-invent). It also ships **no LICENSE file** (D1=0) and is ~5 months stale (`inventory.yml`: `migration_status: pending`).
- **The actual cognee↔CC native pathway is a different artifact** — `topoteretes/cognee-integrations/integrations/claude-code`, the `cognee-memory` plugin v0.2.0 (6 lifecycle hooks + 3 skills + 1 subagent). It is architecturally the correct cold-tier bridge but is **license-blocked** (`cognee-integrations` ships no root LICENSE). The installable Apache-2.0 path is `cognee-mcp` (inside the `topoteretes/cognee` monorepo). All three pathways are disambiguated in `COGNEE` §1.

**Conclusion on the operator's question:** `topoteretes/cognee-integration-claude` **does belong in the catalog and already is** — but as a **REJECT row**, not as cognee's native-CC pathway. cognee's place as the W259 T3 cold tier is correct; the bridge the architecture should use is `cognee-mcp` (Apache-2.0, HTTP-transport on Windows), with the `cognee-memory` plugin as the upgrade target if/when topoteretes adds a LICENSE. No catalog change is required — `COGNEE-INTEGRATION-CLAUDE-W259v6.md` already records all of this.

---

## §5 — Genuine-gap list

**Genuine gaps found: 0.**

| Candidate | Native-CC pathway | Org strength | Verdict |
|---|---|---|---|
| `MemoClaw/Eve` | None found | Unresolvable | **NOT a gap** — unidentifiable repo, no CC pathway, no adoption signal. Record in REJECT ledger; no scored row. |

Every other repo in the operator's catalog is already catalogued with a tier and disposition (§1). The only repo not found is unverifiable and correctly excluded (§3). The catalog is additionally a *superset* of the operator's list (§2).

There is **nothing to add and nothing to score for inclusion.**

---

## §6 — DEFINITIVE bottom-line

> **The W259 memory/RAG catalog is SATURATED. Receipt: 49 of 50 operator-catalogued repos are IN the W259 catalog with explicit tier + disposition (full table §1). The 1 not-found repo — `MemoClaw/Eve` — has no resolvable GitHub identity and no native-CC pathway evidence; it is CORRECTLY EXCLUDED, not a genuine gap. GENUINE GAPS = 0. The W259 catalog is moreover a superset of the operator's list, separately cataloguing `mem0ai/claude-code-plugin`, `topoteretes/cognee-integrations`, six Wave-2 round-2 memory repos, and an 88-repo research-beyond sweep (§2). `topoteretes/cognee-integration-claude` — the repo the operator named explicitly — is already catalogued via its own dedicated deep-dive (`COGNEE-INTEGRATION-CLAUDE-W259v6.md`, composite ≈48, `REJECT-FOR-FIT`); it belongs in the catalog as a REJECT row, not as cognee's native-CC pathway. No new catalog row is required.**

The benchmark numbers in the operator's pasted catalog (Hindsight 91.4%, OMEGA 95.4%) were **not** re-imported as truth — `MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md` already corrected both to `[SELF-REPORTED]`, and this coverage audit changes none of that.

---

**Single recommended catalog-hygiene action (non-blocking):** add one line to the REJECT/NOT-FOUND ledger recording `MemoClaw/Eve` as "unresolvable identity — no native-CC pathway — not a gap", so a future wave does not re-open it. This is bookkeeping, not a gap remediation.

---

**Artifact:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\03-deepdive\MEMORY-RAG-COVERAGE-AUDIT-W259v16.md`
**Cross-links:** `MEMORY-LAYER-RECONCILED-W259v4.md` (the ~58-row reconciled memory catalog) · `MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md` (benchmark-evidence corrections) · `MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` (5-tier architecture + 88-repo sweep) · `COGNEE-INTEGRATION-CLAUDE-W259v6.md` (the operator's explicitly-named repo) · `SOTA-COMMUNITY-REPOS-W259v14.md` / `-W259v15-GITNEXUS.md` (community repos) · `MASTER-SCORING-MATRIX-W259.md` (23-dim matrix).
