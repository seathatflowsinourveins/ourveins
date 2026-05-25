---
title: Wave-pure-runtime Agent B2 — 5-candidate memory MCP deep-dive
status: AUTHORITATIVE
date: 2026-05-15
agent: B2 (sota-researcher Sonnet stand-in; replaces Wave 1 Agent B autocompact-thrash)
parent-orchestrator: claude-sota-pure pure runtime construction wave
---

# Wave-pure-runtime Agent B2 — 5-candidate memory MCP deep-dive

## Section 0 — Methodology + Tool-Call Audit

**Scope (TIGHT, per brief)**: 5 candidates probed with 6-probe TIGHT subset (NOT full 7-probe DAG) per Wave 1 close synthesis Layer 4 retained current Memory Stack (doobidoo + getzep/graphiti + FalkorDB) baseline. mem0 / letta / cognee / openviking explicitly OUT-OF-SCOPE per prior W168 / W207 / P2A verdicts.

**Methodology**:
1. Probe 1 — stars + last commit + license — batched via `mcp__github__search_repositories`
2. Probe 4 — plugin-namespace + DUPLICATE-FUNCTIONALITY check vs current Memory Stack
3. Probe 5 — mode-harness-shape (HARD-GATE / hosted-service-dependency / deprecated-banner)
4. Probe 6 — LICENSE direct read against permissive whitelist (MIT / Apache-2.0 / BSD)
5. Axis-1 cross-org convergence: INFERRED from GitHub search results (exa MCP unavailable per `.claude/settings.json:disabledMcpjsonServers`; not load-bearing for REJECT verdicts)
6. Axis-3 stability: age + last-commit derived from Probe 1

**Tool-call budget audit**: 9 calls used / 18 budgeted (50% headroom).
- 1× `mcp__github__search_repositories` (batched 3/5 candidates)
- 2× `mcp__github__search_repositories` parallel (cipher-fallback + graphiti-fallback — Agent A names were stale/incorrect)
- 1× `mcp__github__search_repositories` (cipher rename → byterover-cli discovery)
- 4× `mcp__github__get_file_contents` parallel (LICENSE × 4: supermemoryai + mkreyman + ressl + gifflet)
- 4× `mcp__github__get_file_contents` parallel (LICENSE + README batched: campfirein + 3 READMEs spot-check)

**HONEST disclosure of Agent A reference drift**:
- `campfirein/cipher` → **renamed** to `campfirein/byterover-cli` (4750★, 2026-05-15 active). Agent A baseline ~6+ months stale.
- `klaviyo/graphiti_mcp` → **NOT FOUND under klaviyo org**. Canonical 3rd-party Graphiti MCP wrapper is `gifflet/graphiti-mcp-server` (140★). Agent A reference appears mistaken (possibly conflated with Klaviyo blog post about Graphiti adoption).
- `ressl/mcp-firewall` → confirmed real but **wrong category**: it's a security gateway for MCP/AI agents, NOT a memory MCP. Mis-categorized by Agent A as memory candidate.

## Section 1 — 5-candidate verdict table

| # | Candidate | URL | Stars | Last commit | License | Probe 4 | Probe 5 | Probe 6 | Axis 1 | Axis 3 | VERDICT |
|---|-----------|-----|-------|-------------|---------|---------|---------|---------|--------|--------|---------|
| 1 | campfirein/cipher → byterover-cli | https://github.com/campfirein/byterover-cli | 4750 | 2026-05-15 | **Elastic 2.0 (ELv2)** | DUPLICATE: 24 built-in agent tools + 22+ AI coding agent integrations = META-HARNESS competing-framework | HARD-GATE: ByteRover Cloud login OR self-hosted config; cloud-by-default | **REJECT — ELv2 NOT permissive** (anti-SaaS clause; source-available; NOT OSI-approved) | INFERRED PASS (4750★ + 450 forks) | PASS (~11mo age, active today) | **REJECT-FOR-FIT** (Probe 6 LICENSE + Probe 4 META-HARNESS + Probe 5 HARD-GATE — triple-block) |
| 2 | supermemoryai/supermemory-mcp | https://github.com/supermemoryai/supermemory-mcp | 1689 | 2026-05-14 | MIT ✓ | OVERLAP with doobidoo | **DEPRECATED**: README states `MCP v1 is being deprecated` + code moved to monorepo; depends on hosted Supermemory API + Cloudflare | PASS (MIT) | INFERRED PASS (1689★ + Product Hunt featured) | PASS (~11mo age) | **REJECT-FOR-FIT** (Probe 5 DEPRECATED-BANNER + hosted-service mode mismatch) |
| 3 | mkreyman/mcp-memory-keeper | https://github.com/mkreyman/mcp-memory-keeper | 122 | 2026-05-15 | MIT ✓ | **DUPLICATE-FUNCTIONALITY**: 38 tools overlap with doobidoo/mcp-memory-service (already wired Memory Stack L1) — session-mgmt / save-get / search / checkpoints / git integration / SQLite storage all redundant | PASS — npx-based install, sane defaults | PASS (MIT) | INFERRED MARGINAL (single-maintainer, 122★) | PASS (~11mo age, very active) | **REJECT-FOR-FIT** (Probe 4 DUPLICATE per kiss-dry-yagni Must-Never #4) |
| 4 | ressl/mcp-firewall | https://github.com/ressl/mcp-firewall | 6 | 2026-04-29 | **AGPL-3.0** | **WRONG CATEGORY**: security gateway for MCP, NOT a memory MCP | N/A | **REJECT — AGPL-3.0 blocks permissive-license-only mandate** | INFERRED FAIL (6★, single-org, no cross-org adoption) | MARGINAL (~3mo age, low activity) | **REJECT-FOR-FIT** (Probe 6 LICENSE + CATEGORY-CLAIM drift — not even a memory primitive) |
| 5 | klaviyo/graphiti_mcp → gifflet/graphiti-mcp-server | https://github.com/gifflet/graphiti-mcp-server | 140 | 2026-05-13 | MIT ✓ | **DUPLICATE-FUNCTIONALITY**: 3rd-party wrapper around OFFICIAL getzep/graphiti which is ALREADY wired in runtime Memory Stack L3 (FalkorDB backend + graphiti MCP shipped per `.mcp.json` 2026-05-13) | PASS — Python MCP server | PASS (MIT) | INFERRED MARGINAL (140★, single-maintainer wrapper) | PASS (~13mo age, active) | **REJECT-FOR-FIT** (Probe 4 NAMESPACE COLLISION + Probe 7.a DEMAND-ABSENCE: canonical getzep/graphiti already serves) |

## Section 2 — Per-candidate deep-dive paragraphs

### Candidate 1: campfirein/cipher → byterover-cli
The repo was **renamed from Cipher to ByteRover CLI** in 2025-2026. Substantial project (4750★, 450 forks, daily commits, npm package `byterover-cli`) but it's a **full agentic memory PLATFORM**, not a focused memory MCP primitive — 24 built-in agent tools + 20 LLM providers + 22+ AI coding agent integrations (Cursor / Claude Code / Windsurf / Cline) + ByteRover Cloud + version-control for context tree + REPL UI + web dashboard. This is a competing **META-HARNESS** per `Z:/claude-sota/docs/verified-avoid.md` Cohort 1 (META-HARNESS competing-frameworks shape) — installing it would shadow the entire claude-sota architecture, not augment it. The killer issue is **Elastic License 2.0 (ELv2)** at the LICENSE file — explicit anti-SaaS clause ("You may not provide the software to third parties as a hosted or managed service"), license-key enforcement, NOT OSI-approved, NOT in permissive whitelist (MIT/Apache-2.0/BSD) per `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md` Probe 6. Also HARD-GATE requires either ByteRover Cloud login or self-hosted LLM config per Probe 5. Native CC path: NONE — this would REPLACE Claude Code's native skill/agent/MCP architecture, not integrate with it. **VERDICT: REJECT-FOR-FIT (triple-blocker: Probe 6 LICENSE + Probe 4 META-HARNESS + Probe 5 HARD-GATE)**.

### Candidate 2: supermemoryai/supermemory-mcp
Slick UX, 1689★, MIT, "no logins or paywall" tagline, one-click install for Claude DXT. BUT the README opens with **`> [!WARNING] MCP v1 is being deprecated`** + states the active code has moved to `supermemoryai/supermemory` monorepo. Probe 5 mode-harness-shape: architecture is hosted-service-backed (Supermemory API at supermemory.ai + Cloudflare backend) — even self-hosting requires `SUPERMEMORY_API_KEY` from console.supermemory.ai. Conflicts with claude-sota's self-hosted discipline (Memory Stack L1 doobidoo uses local SQLite-vec; L3 graphiti uses local FalkorDB at port 16379). MIT license passes Probe 6, but DEPRECATED v1 wrapper + hosted-service dependency = combined Probe 5 FAIL. Native CC path: Anthropic CC supports DXT one-click via Claude Desktop, but that's the v1 deprecated path. **VERDICT: REJECT-FOR-FIT (Probe 5 DEPRECATED-BANNER + hosted-service mode mismatch)**.

### Candidate 3: mkreyman/mcp-memory-keeper
Active high-quality MCP (122★, MIT, last commit 2026-05-15, npm package `mcp-memory-keeper`, 38 tools across save/get/checkpoints/git/search/branching/journal/semantic-search/multi-agent). IS a well-engineered MCP. BUT the feature surface DUPLICATES doobidoo/mcp-memory-service which is ALREADY wired in runtime Memory Stack L1: both ship session management, save/get with categories+priorities, file caching, checkpoints, full-text search, SQLite storage, MIT license. Probe 4 plugin-namespace DUPLICATE per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 ("Duplicate existing functionality without a clear reason"). Adopting it would create namespace collision in MCP server names + tool calls + storage paths. **Could pilot as REPLACEMENT for doobidoo** (richer feature set: branching, journal, semantic search, channels-from-git-branch), but that's a Wave 1 close-synthesis re-litigation decision (already verdicted: KEEP doobidoo). **VERDICT: REJECT-FOR-FIT (Probe 4 DUPLICATE-FUNCTIONALITY)**. Optional fallback path: STUDY-PILOT-NARROW if Memory Stack L1 doobidoo ever surfaces concrete gaps that mkreyman uniquely closes — but no current demand and no Probe 7.b 5-clause check passes.

### Candidate 4: ressl/mcp-firewall
This candidate is **mis-categorized by Agent A as a memory MCP** — it's actually a security gateway / firewall for AI agents (policy enforcement, threat detection, MCP audit logging). CATEGORY-CLAIM drift per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Subclaim-type discriminator`. Even if it WERE in scope: LICENSE is **GNU AGPL-3.0**, which is the canonical example of Probe 6 LICENSE blocker per `Z:/claude-sota/.claude/rules/ahfv-seven-sub-classes.md` direct-file/registry-blockers row (openviking REJECT precedent). Only 6★, single-maintainer (Robert Ressl), ~3 months old — also fails Axis-3 stability borderline. Triple-failure mode. **VERDICT: REJECT-FOR-FIT (Probe 6 AGPL blocker + CATEGORY-CLAIM drift + Axis-3 stability MARGINAL)**.

### Candidate 5: klaviyo/graphiti_mcp → gifflet/graphiti-mcp-server
The "klaviyo/graphiti_mcp" reference does not exist on GitHub — Agent A made a naming error (possibly conflated with Klaviyo's blog post about adopting Graphiti). The canonical 3rd-party graphiti MCP wrapper is **gifflet/graphiti-mcp-server** (140★, MIT, Python). It wraps the OFFICIAL `getzep/graphiti` library (which is the canonical authority and is ALREADY wired in runtime per Memory Stack L3 — `getzep/graphiti v0.29.0` + FalkorDB v1.6.1 Docker container at port 16379 + graphiti MCP server at `Z:/claude-sota-installed/.local/graphiti/mcp_server/` HEAD c427615 wired in `.mcp.json` per CLAUDE.md L171 [VERIFIED 2026-05-13]). Adopting gifflet's wrapper = **DUPLICATE-FUNCTIONALITY of canonical Graphiti integration already operational**. Probe 4 NAMESPACE COLLISION + Probe 7.a DEMAND-ABSENCE: no workflow requires a 3rd-party Graphiti wrapper when the official `getzep/graphiti/mcp_server/` is already serving the workflow. Native CC path: the canonical getzep/graphiti MCP IS the native path. **VERDICT: REJECT-FOR-FIT (Probe 4 DUPLICATE + Probe 7.a no-demand)**.

## Section 3 — Final Recommendation

**ZERO INSTALL candidates.** All 5 → REJECT-FOR-FIT.

**Current Memory Stack DECISION: HOLD** per Wave 1 close synthesis Layer 4 recommendation. The Memory Stack baseline (doobidoo/mcp-memory-service v10.51.3 MIT @ L1 + getzep/graphiti v0.29.0 + FalkorDB v1.6.1 @ L3) remains the SOTA-correct configuration for the pure runtime. None of the 5 deferred candidates surfaces material gap-closure value:

- **byterover-cli**: META-HARNESS competing-framework + ELv2 non-permissive = STRUCTURAL no-go
- **supermemory-mcp**: DEPRECATED v1 + hosted-service dependency = mode mismatch
- **mcp-memory-keeper**: DUPLICATE of doobidoo with no demonstrated marginal-value
- **mcp-firewall**: WRONG CATEGORY + AGPL = double-block (not even a memory primitive)
- **gifflet/graphiti-mcp-server**: 3rd-party wrapper of canonical graphiti already wired

**Forward-only fallback recommendation**: when Memory Stack feature gaps DO emerge in production (e.g., need for time-aware queries beyond graphiti's temporal-KG, need for richer session-branching beyond doobidoo's session model, need for compression/sharing flows), re-evaluate **mkreyman/mcp-memory-keeper as the strongest STUDY-PILOT candidate** (richest feature set + permissive license + active maintenance + 4 of the 5 are structurally non-viable). Until then, KEEP current Memory Stack.

## Section 4 — CR-12 6-class disposition lattice per candidate

Per `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class disposition lattice (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL):

| # | Candidate | CR-12 Disposition | Rationale |
|---|-----------|-------------------|-----------|
| 1 | byterover-cli | **META-HARNESS-COMPETING-FRAMEWORK** (outside 6-class lattice; matches `docs/verified-avoid.md` Cohort 1) | Not a memory primitive — competing AI coding agent platform with its own LLM provider routing, version control, web UI; non-permissive license compounds |
| 2 | supermemory-mcp | **DUPLICATE-FUNCTIONALITY** (+ DEPRECATED) | Same user-facing memory MCP shape as doobidoo (L1); v1 deprecated upstream; hosted-service backed |
| 3 | mkreyman/mcp-memory-keeper | **DUPLICATE-FUNCTIONALITY** | 38-tool overlap with doobidoo across save/get/checkpoint/search/SQLite-storage axes |
| 4 | ressl/mcp-firewall | **OUT-OF-CATEGORY** (not memory MCP) + AGPL-blocker | Security gateway, not memory primitive; LICENSE blocker compounds |
| 5 | gifflet/graphiti-mcp-server | **DUPLICATE-FUNCTIONALITY** (wraps canonical getzep/graphiti already INSTALLED) | The official getzep/graphiti MCP server IS the CITE-CLASS-CANONICAL — gifflet's wrapper is downstream and redundant |

**No GENUINELY-NEW or PROVIDER-COMPLEMENT candidates surfaced.** All 5 fail Probe 4 NAMESPACE-COLLISION or Probe 6 LICENSE-BLOCKER or Probe 5 MODE-HARNESS-SHAPE-FAIL.

## Cross-references for runtime install decision

- Wave 1 close synthesis: `Z:/claude-sota-installed/tmp/wave-pure-runtime-2026-05-15/WAVE1-CLOSE-SYNTHESIS-2026-05-15.md` §Layer 4 (retained Memory Stack baseline)
- Memory Stack inventory: `Z:/claude-sota-installed/CLAUDE.md` §"Memory Stack" L161-171 (doobidoo + graphiti + FalkorDB INSTALLED + WIRED)
- Per-candidate audit-trail: `.claude/state/codex_consult_*` (none generated this fire — Sonnet stand-in dispatch, no codex bridge calls per brief)
- Sister disposition lattice: `Z:/claude-sota/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class taxonomy
- Probe DAG authority: `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md` Probes 1-7 + Phase 7 benchmark gate
- 7 sub-classes catalog: `Z:/claude-sota/.claude/rules/ahfv-seven-sub-classes.md` (including Probe 6 direct-file/registry blockers row, n=2 fresh evidence: openviking AGPLv3 + Ship D ast-grep phantom npm)
- Phantom-candidate-name handling: Agent A reference drift (3/5 candidate names stale or wrong) demonstrates the value of `Z:/claude-sota/.claude/rules/mia-pre-apply.md` discipline applied to agent-provided candidate names BEFORE adoption-research dispatch

## STAND-IN-NOTICE disclosure

Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md` §The mandate: this agent ran as **Sonnet stand-in** via Anthropic SDK (NOT real GPT-5.5 via codex CLI subprocess) per CLAUDE.local.md ENV (g) historical envcontext. Cross-model gate NOT structurally satisfied for this dispatch — orchestrator MUST treat this verdict as single-model output and apply Mia pre-apply per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` before committing decision. Strong-form verdict (all-REJECT) reduces cross-model verification urgency (no install action proposed), but orchestrator should still spot-verify LICENSE classifications (especially ELv2 vs MIT, AGPL vs MIT) via direct file read before propagating to commit body.

---

VERDICT: 5/5-MEMORY-CANDIDATES-REJECT-FOR-FIT — HOLD current Memory Stack (doobidoo + getzep/graphiti + FalkorDB); ZERO install candidates; byterover-cli Elastic+META, supermemory-mcp DEPRECATED+hosted, mkreyman DUPLICATE, mcp-firewall WRONG-CATEGORY+AGPL, gifflet DUPLICATE of canonical getzep/graphiti.
