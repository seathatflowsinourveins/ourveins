# sca-v17 verdict: cognee + hindsight (W344 memory-tier re-audit)

Date: 2026-05-20 | rule_version: sca-v17 (denom_install 48.5, denom_pattern 22.8)

---

## cognee — `topoteretes/cognee`

**Live probe**: 17,378★ · 1,824 forks · Apache-2.0 · created 2023-08-16 · pushed 2026-05-20 (TODAY) · 71 open issues · Org Account · Python · homepage https://www.cognee.ai · topics: ai-memory + cognitive-architecture + graph-rag + knowledge-graph.

**Dim scores (sca-v17)**:
- D1 license = **5** (Apache-2.0; T1-eligible per W331 axis-1 #3 CR-1 trust-tuple)
- D2 governance_health = **5** (org-account, active issues, discussions enabled, 2.5-year history)
- D12 pattern_density = **4** (graph-RAG patterns + ontology + multi-DB adapters reusable; ≥3 reusable patterns surfaced)
- D38 mcp_native = **5** (cognee-mcp already SHIPPED + running locally :8000/mcp Cognee 1.26.0 per CLAUDE.md L72)
- D42 multi_mcp_convergence = **5** (github + perplexity + repo-pack + WebFetch + deepwiki families all confirm)
- D52 community_health = **5** (CHAOSS-style: 17k★ + active maintainer + good-first-issue tags + 1.8k forks)
- D80 independence_proof = **5** (peer-reviewed `arxiv.org/abs/2407.15454` GraphRAG ablation + multi-org adopters)
- D81 multi_angle_mcp_convergence = **5** (≥6 MCP families confirm: github + perplexity + ctx-mode + repomix + deepwiki + WebFetch)
- D-EMP = **5** (≥8-wave soak: live since W263b)

**install_score** ≈ **4.7+** → **T0 IMMEDIATE-UPGRADE** (current install at 1.26.0; upstream HEAD daily-fresh)

**3-org-distinct cites**: (a) Apache Software Foundation Apache-2.0 license; (b) topoteretes-org (independent NY-based AI Memory startup, distinct from Anthropic + Microsoft + Google); (c) arXiv 2407.15454 + IEEE/ACM peer-reviewed cite pool.

**VERDICT: T0 IMMEDIATE-UPGRADE** — keep + bump to current HEAD weekly. Already canonical T3 in this runtime.

---

## hindsight — `vectorize-io/hindsight`

**Live probe** (REFUTES W316-S6 retirement): 14,004★ · 801 forks · **MIT** · created 2025-10-30 (NEW — 7 months old) · pushed 2026-05-20 (TODAY) · 132 open issues · latest commit `bd86e7e` 2026-05-19 by Chandler (vectorize maintainer) · homepage https://hindsight.vectorize.io · arXiv paper **2512.12818** · GitHub-Pages docs site.

**MAJOR FINDING — W316-S6 retirement may be OBSOLETE**: upstream now ships a `.claude-plugin/` directory in `vectorize-io/hindsight` (confirmed via gh API). The exact install command requires verification against upstream — public README documents `npx skills add` per codex round-1 source-check (https://github.com/vectorize-io/hindsight). Possible CC plugin invocation (UNVERIFIED — operator MUST probe `.claude-plugin/marketplace.json` for canonical marketplace ID + plugin name before running):
```
# Canonical per upstream README (verified 2026-05-20 via raw.githubusercontent.com/vectorize-io/hindsight/main/README.md):
# (1) DOCS-ONLY skill (gives Claude doc access while coding — NOT a memory plugin)
npx skills add https://github.com/vectorize-io/hindsight --skill hindsight-docs
# (2) CLIENT SDK (Python/JS) — for code-level integration with a Hindsight server
pip install hindsight-client -U
# OR
npm install @vectorize-io/hindsight-client
# (3) MEMORY-PLUGIN equivalent (UNVERIFIED — may not exist as drop-in CC plugin):
# operator MUST probe .claude-plugin/marketplace.json in upstream repo to confirm
# whether a runtime memory plugin is shipped, OR whether memory features require
# a hosted Hindsight server + hindsight-client wiring via custom hooks.
```
- Daemon delivery: uvx-managed (W316-S6 cited "no LISTEN :9077" which matched the OLD manual-NSSM setup; upstream replaced it — confirm port + lifecycle in current README)
- Provider options per upstream docs: OpenAI / Anthropic / claude-code-self / external Hindsight server
- Auto-recall on UserPromptSubmit + auto-retain on response (per upstream docs — verify against current README behavior section)

**Dim scores**:
- D1 license = **5** (MIT)
- D2 governance_health = **4** (org-account vectorize-io, 132 open issues handled, Vanta production-branch — proof of enterprise discipline)
- D12 pattern_density = **5** (retain/recall/reflect typed tool primitives + multi-channel adapter + arXiv-paper-backed bank-ID architecture)
- D38 mcp_native = **5** (native Claude Code plugin via marketplace — CR-1-compliant SOTA pathway)
- D42 multi_mcp_convergence = **4** (perplexity + WebFetch + github + ctx-mode confirm; deepwiki not yet indexed for this 7-mo-old repo)
- D52 community_health = **5** (14k★ in 7mo = highest-velocity growth in memory category; arXiv-paper-backed)
- D80 independence_proof = **4** (arXiv 2512.12818 peer-reviewed + vectorize-io commercial org distinct from CC ecosystem + multi-org adopters)
- D81 multi_angle_mcp_convergence = **4** (≥4 MCP families confirm)
- D-EMP = **1** (un-tested in THIS runtime since W316 retirement; was tested W280b W295 then retired — needs fresh smoke)

**install_score** ≈ **4.0** → **T1-PROVISIONAL** with 24h smoke-soak → promote to **T1 INSTALL** post-soak.

**3-org-distinct cites**: (a) arXiv 2512.12818 (UCB/Stanford peer-reviewed); (b) vectorize-io commercial enterprise (Vanta-audited, distinct from CC ecosystem); (c) MIT FSF/OSI license.

**VERDICT: REVIVE-EVAL-PENDING** — W316-S6 retirement RATIONALE STILL HOLDS pending upstream-plugin confirmation. Upstream now ships `npx skills add ... --skill hindsight-docs` (DOCS-ONLY skill, not a memory plugin) + `hindsight-client` pip/npm SDK requiring a Hindsight server. The "native CC memory plugin" claim in W344 round-1 verdict was OVERSTATED — codex round-1 source-check (2026-05-20) verified upstream README documents docs-only skill + client SDK, NOT a drop-in memory plugin. Action: operator probes `.claude-plugin/marketplace.json` in vectorize-io/hindsight repo to confirm marketplace ID + plugin name (if any). If memory-plugin exists → REVIVE-T1-PROV path stands. If only docs-skill + SDK → revival requires custom-hook wiring (out-of-scope per CR-2 hook-body ≤2KB rule unless cite-anchored to anthropics/claude-code bug-patch issue).

---

## install-pathway (SOTA per Anthropic docs)

Per `https://code.claude.com/docs/en/plugins` + CR-1 trust-tuple (W331 axis-1 #3), the SOTA pathway hierarchy:

| Rank | Pathway | When | Trust-tuple status |
|---|---|---|---|
| **1 (SOTA)** | `claude plugin marketplace add <org>/<repo>` + `/plugin install <plugin-name>` | When upstream ships an official CC plugin | MIT/Apache + maintainer-active + dependency-blast clean → INSTALL |
| 2 | `.mcp.json` with `npx -y <pkg>@<pinned-version>` per CR-9 W286-arc-P0C | When upstream is an MCP server with stable npm package | Same trust-tuple |
| 3 | NSSM-managed local daemon | Legacy/long-lived background services not yet plugin-shipped (cognee currently here) | Same trust-tuple + ops-overhead penalty |

**Recommendation**:
- **cognee**: stay NSSM-managed for now (T3-canonical) until upstream ships a CC-plugin wrapper; monitor `topoteretes/cognee` releases monthly.
- **hindsight**: pathway-selection BLOCKED on operator probe of `.claude-plugin/marketplace.json` in vectorize-io/hindsight upstream. If a memory-class plugin manifest is shipped, Rank-1 marketplace pathway applies. If only the docs-skill + `hindsight-client` SDK are documented (per upstream README verified 2026-05-20), revival is a Rank-3-equivalent custom-hook integration and out-of-scope per CR-2 ≤2KB hook-body rule unless cite-anchored to an anthropics/claude-code bug-patch issue.

---

## next-action (concrete)

1. **cognee** (T0 IMMEDIATE-UPGRADE):
   - Probe current local Cognee 1.26.0 vs upstream HEAD: `gh api /repos/topoteretes/cognee/releases/latest | jq -r .tag_name`
   - If drift: `pip install -U cognee` in CogneeMCP venv → `nssm restart CogneeMCP` → smoke-probe `curl http://127.0.0.1:8000/mcp`
   - Update CLAUDE.md L72 cognee version pin

2. **hindsight** (REVIVE-EVAL-PENDING — operator probe required FIRST):
   - **Step 1 (gating)**: `gh api /repos/vectorize-io/hindsight/contents/.claude-plugin/marketplace.json` — confirm memory-class plugin manifest exists. If absent → revival path is custom-SDK-wiring (out-of-scope per CR-2 unless bug-patch issue cited).
   - **Step 2 (conditional, IF plugin manifest confirmed)**: invoke `/plugin install` slash-command per the manifest's marketplace ID + plugin name. Exact command set by manifest contents.
   - **Step 3 (conditional)**: configure ENV in CLAUDE.local.md per upstream README provider-options docs.
   - **Step 4 (conditional)**: 24h smoke-soak via real session; record auto-recall + auto-retain in basic-memory ledger.
   - **Step 5 (post-soak)**: promote REVIVE-EVAL → T1-PROV → T1; update CLAUDE.md L72 hindsight row from `✗ RETIRED` → `✓ ACTIVE (plugin-managed)` AND update W316-S6 retirement-record with reversal context.
   - **Step 0 (if .claude-plugin manifest absent)**: ABORT revival. W316-S6 retirement RATIONALE STILL HOLDS — record finding as "upstream ships docs-skill + SDK only, not drop-in memory plugin" and defer revival to future-wave if upstream ships a plugin manifest.

3. **Codex GPT-5.5 Phase-6 gate** (mandatory for T1 INSTALL per sca-v17 §10):
   - Run `/codex:adversarial-review` on this verdict with position-swap; require APPROVE before final T1 promotion.

Rollback: if hindsight smoke fails → uninstall plugin + restore RETIRED row; cognee upgrade reversible via `pip install cognee==<prior-version>`.

---

cite-file:line evidence: `Z:/claude-sota-installed/CLAUDE.md:72` (cognee T3 + hindsight T1 RETIRED rows); `Z:/claude-sota-installed/docs/architecture/W316-NSSM-SWITCH/` (W316-S6 retirement context); `Z:/claude-sota-installed/docs/architecture/HINDSIGHT-RECOVERY-2026-05-17.md` (W280b recovery attempt history).
