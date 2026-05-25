# SOTA-LAYERS-LANDSCAPE — the canonical per-layer SOTA-repo reference (final form)

> **What this is:** the single consolidated map of *every architecture layer → its SOTA repos*, with an
> adoption verdict (INSTALL / INSTALL-caveat / PATTERN-STUDY / SECURITY-MIDDLEWARE / MONITOR / REFERENCE /
> BLOCK) per repo. It supersedes the scattered landscape/catalog docs as the source of truth for what is
> SOTA per layer and what we've actually adopted.
>
> **How it was built (W385, 2026-05-23):** a 3-stream extraction, reconciled —
> (A) the current candidate landscape `SOTA-RUNTIME-2026-05-22/LANDSCAPE.md` V2.2 (50 candidates, codex r1–r4) ∩
> (B) `docs/sota-installed-manifest.md` (125 rows) ∩
> (C) the **live runtime** (`.mcp.json` = **17 servers** · `enabledPlugins` = 47 enabled · 63 skills) + the W259 grand-catalog gap survey.
> Every row is one of those three sources; drift between them is §3.

---

## §0 Reading guide

- **Verdict vocabulary** (from sca-v18 / the W384 decision plane): `INSTALL` = adopt as runtime · `INSTALL-caveat` = adopt with a named condition · `INSTALL-candidate` = recommended for adoption but not yet in the ratified landscape (coverage-gap finds) · `PATTERN-STUDY` = extract patterns, don't install · `SECURITY-MIDDLEWARE` = wrap-around guard · `MONITOR` = insufficient evidence, watch · `REFERENCE` = cite-only · `BLOCK` = license/maintenance/verification fail. **Tier is orthogonal to live-status** (⬚ = candidate / not-yet-adopted; ✅ = live).
- **Live status**: ✅ live in this runtime · ⬚ candidate (not yet adopted) · ⚠ drift (manifest≠live, see §3).
- Stars are **informational only** (anti-bias — a low-star repo can be high-quality in a niche → PATTERN-STUDY).

---

## §1 Layer × SOTA-repo matrix

### L1 · Reasoning / Consensus  (✅ all live)
| Repo / primitive | verdict | note |
|---|---|---|
| Claude Code CLI (Opus 4.7, 1M) | ✅ INSTALL | the orchestrator host |
| `@openai/codex` (GPT-5.5) | ✅ INSTALL | cross-model gate authority; T1–T7 hooks wired |
| Sonnet 4.6 | ✅ INSTALL | tie-breaker |
| Ollama `qwen3-coder:30b` :16700 | ✅ INSTALL | cheap-triage only |

### L2 · Research architecture  (the SOTA-adoption engine — feeds L3/L6/this doc)
| Repo / primitive | verdict | note |
|---|---|---|
| **sca-v22** `tools/sota-discovery/` | ✅ INSTALL (built) | discover→converge→decide→compare; merged `2a37eb7` (W384) |
| `microsoft/autogen` MagenticOne | PATTERN-STUDY | two-loop replan + task/progress-ledger + stall-counter — fold into convergence/decision |
| `assafelovic/gpt-researcher` | PATTERN-STUDY | SourceCurator multi-angle pattern (already studied W377) |

### L3 · Agent-runtime  (autonomous SWE/agent runtimes — dispatch targets, mostly PATTERN-STUDY for a curation repo)
| Repo | stars | verdict | note |
|---|---|---|---|
| **`OpenHands/OpenHands`** | — | **INSTALL** ✅partial | top OSS SWE-bench 77.6%; MIT; **the single-install answer**; **`openhands-dispatch` MCP is LIVE** in `.mcp.json` (wired via W374) → partially adopted; pin v1.7.0 + image digest; codex r1–r4 ratified (scalar MEDIUM — V0→V1 caveat) |
| `browser-use/browser-use` | 95k | INSTALL ⬚ | MIT browser automation; quad dispatch (CLI+MCP+REST+SDK) |
| `browserbase/stagehand` | 22.7k | INSTALL ⬚ | MIT cloud-managed browser; hosted MCP + 5-lang SDK |
| `aaif-goose/goose` | — | INSTALL ⬚ | Apache-2.0 YAML-recipe agent; ⚠ repo MOVED from `block/goose` (stale path in old catalogs) |
| `cline/cline` | ~38k | INSTALL-caveat | triple-surface (SDK+IDE+CLI), full MCP host; **coverage-gap add** — prefer if VS-Code-native |
| `Aider-AI/aider` | — | INSTALL-caveat | install from git main (PyPI v0.86.0 frozen 2025-08 = stale-PyPI trap) |
| `plandex-ai/plandex` | 15k | INSTALL-caveat | Go-native; large-codebase refactors |
| `strands-agents/sdk-python` | 5.9k | INSTALL-caveat | AWS-centric |
| `RooCodeInc/Roo-Code` | ~20-24k | MONITOR | Cline fork + MCP marketplace; needs differentiation probe vs Cline (coverage-gap) |
| `microsoft/UFO` | 8.7k | MONITOR | Windows UI agent — must run in Sandbox VM (high blast radius) |
| Skyvern · open-interpreter (AGPL) · AutoGPT (Polyform) · suna/BrowserGym/multica (NOASSERTION) · devika/SuperAGI/gpt-engineer (abandoned) · cersei (CC-replacement) | — | **BLOCK** | license / maintenance / category fails |

### L4 · Orchestration
| Repo | verdict | note |
|---|---|---|
| `crewAIInc/crewAI` | INSTALL ⬚ | MIT core; INSTALL-with-category-exception (codex F7 — F500 production evidence compensates) |
| `dapr/dapr-agents` | INSTALL-caveat | CNCF; K8s/sidecar overhead on Windows |
| `inngest/agent-kit` | INSTALL-caveat | TS deterministic-routing network |
| `mastra-ai/mastra` | MONITOR | dual-license (don't ship `ee/`); codex r4 pending re-tier → caveat |
| `wshobson/agents` | ✅ INSTALL | agent-teams/orchestration — **already installed** (16 workflow plugins enabled) |
| `n8n` (fair-code) · `windmill` (AGPL) | BLOCK | non-permissive |

### L5 · Durable execution
| Repo | verdict | note |
|---|---|---|
| **`temporalio/temporal`** + sdk-python | INSTALL ⬚ | MIT durable spine; **NOW-priority with OpenHands (W374 plan)**; HIGH all dims |
| `dbos-inc/dbos-transact-ts` · `hatchet-dev/hatchet` · `trigger-dev/trigger.dev` | INSTALL-caveat | TS/Postgres Temporal-alternatives |
| `restatedev/restate` (BSL) | BLOCK | source-available |

### L6 · Memory / RAG
| Repo | stars | verdict | note |
|---|---|---|---|
| `basic-memory` (T6) | — | ✅ INSTALL | canonical-primary; live |
| `cognee` (T3) | — | ✅ INSTALL | GraphRAG; live :8000 |
| `letta-ai/letta` | — | INSTALL ⬚ | source INSTALL-tier; Apache-2.0 stateful memory; REST :8283; caveat = MEDIUM confidence (deepwiki-only grounding, codex F3); not yet adopted |
| **`supermemoryai/supermemory`** | 22.5k | INSTALL-candidate ⬚ | **#1 on LongMemEval+LoCoMo+ConvoMem** (81.6%); native CC plugin — **top coverage-gap add** |
| `MemTensor/MemOS` · `memvid` · `NevaMind-AI/memU` · `MemoriLabs/Memori` · `zilliztech/memsearch` | 1.7–15.5k | PATTERN-STUDY | memory-layer alternatives cluster (coverage-gap) — study vs supermemory before adopting |

### L7 · MCP fabric  (17 live servers)
| Repo / server | verdict | note |
|---|---|---|
| deepwiki · github · repomix · serena · ccusage · cognee · langfuse · basic-memory · hf-mcp-server · perplexity · playwright · exa · firecrawl · codegraph · chrome-devtools · docling · **openhands-dispatch** | ✅ INSTALL | the **17** live `.mcp.json` servers (⚠ codegraph/docling/hf/openhands-dispatch have no manifest row — §3) |
| `ComposioHQ/composio` | INSTALL ⬚ | source INSTALL-tier; MIT SDK + MCP HTTP drop-in; caveat = SaaS backend; 30-min `.mcp.json` edit; not yet adopted |
| `nango` (Elastic License) | BLOCK | source-available |

### L8 · Behavioral (plugins / skills)  (47 enabled plugins · 63 skills)
| Source | verdict | note |
|---|---|---|
| `anthropics/claude-plugins-official` (19) · `affaan-m/everything-claude-code` · `wshobson/agents` (16) · `mattpocock` (10× vendor-fork) · `addyosmani` · `pydantic` · `karpathy` · `anthropics/skills` | ✅ INSTALL | the live behavioral fabric — **mattpocock & wshobson already adopted** |
| `vercel-labs/ralph-loop-agent` | REFERENCE | ralph-loop skill installed; source = coverage-gap reference |

### L9 · Hook/gate + code-quality + git/CI
| Repo / tool | verdict | note |
|---|---|---|
| pre-commit (gitleaks·ruff·shellcheck·trivy·cosign·commitlint·codex-trailer·wave-lock) | ✅ INSTALL | the live gate suite |
| **`opengrep/opengrep`** | ~2k | INSTALL-candidate ⬚ | **fills the empty SAST slot** in the gate (coverage-gap, W259-GAP §3 IMPORTANT) |
| `continuedev/continue` | INSTALL-caveat | CI-status-as-markdown-file repositioning — wire for CI-gated AI PR review |
| `prek-rs/prek` | REFERENCE | Rust pre-commit drop-in (nice-to-have; current gate works) |

### L10 · Security-middleware  (NEW tier)
| Repo | stars | verdict | note |
|---|---|---|---|
| `microsoft/agent-governance-toolkit` v3.7.0 | 1.8k | SECURITY-MIDDLEWARE ⬚ | MIT; covers **10/10 OWASP Agentic Top-10** + MCP-gateway-aware; wrap around any installed runtime |

### L11 · Observability / Memory-tiers retired
| Item | verdict | note |
|---|---|---|
| Langfuse :3000 (v3.174.1) · ccusage · logfire | ✅ INSTALL | live |
| T1 hindsight · T4 graphiti | RETIRED | excised W295/W313 (⚠ manifest still lists — §3 D3/D4/D6) |

---

## §2 Coverage gaps to fold in (13 — from the 99-repo grand catalog, absent from the 2026-05-22 landscape)

**Highest value (add as full rows):** `supermemoryai/supermemory` (L6, #1-benchmark memory) · `cline/cline` (L3, 38k) · `RooCodeInc/Roo-Code` (L3, ~20k; formerly RooVetGit) · `opengrep/opengrep` (L9, the only real SAST gap).
**Memory cluster (study before adopt):** memvid · memU · Memori · MemOS · memsearch.
**Nice-to-have:** `microsoft/mcp-for-beginners` (reference) · `vercel-labs/ralph-loop-agent` (reference) · `prek-rs/prek` · CLIProxyAPI (internal).

---

## §3 Manifest ↔ live drift to fix (17 — feeds the CLAUDE.md/.mcp.json accuracy pass)

**STALE-manifest (10):** chrome-devtools (manifest DEFERRED, live ON) · context7 (manifest INSTALLED, live ABSENT) · graphiti + memory + phoenix + hindsight (retired but not marked) · langfuse (manifest PLANNED, live ON) · trivy (S5 PLANNED vs S17 INSTALLED) · Qdrant L2 (image-only) · obra/superpowers (redundant).
**NO-MISSING / live-but-unmanifested (7):** codegraph · docling · hf-mcp-server · **openhands-dispatch** (MCPs with no manifest row — openhands-dispatch was missed by the earlier audit's "16" count too) · planning-with-files · thedotmack/claude-mem · `@anthropic-ai/sdk@0.95.1`.

> These 17 are the same drift the architecture audit flagged. Correcting `docs/sota-installed-manifest.md` + `.mcp.json` provenance is the Phase-0 "source-of-truth accuracy" pass.

---

## §4 Archive manifest + the "final form" principle

**Repo doc-mass reality:** 8,666 tracked files; **8,112 (94%) in `docs/`**; `docs/architecture/` = 8,093 across 344+ wave-folders. The bulk is the **6,614-file `_archive/W259-grand-catalog-archive/` subtree** (already archive-named) — the runtime's *memory/provenance ledger*, intentionally retained in the **private core**.

**In-place archiving was ATTEMPTED and REVERTED (W385).** Moving the 57 candidate root files (52 W26x wave-syntheses + 5 superseded 2026-05-17 audits) into `_ARCHIVE/` broke **31 live docs** that cross-reference them (codex W385 finding 5 — `docs/settings-provenance-trail.md`, `W270*`, `W289*`, `docs/architecture/README.md`, `CHANGELOG.md`, …). This repo's dense cross-reference web makes in-place `git mv` the **wrong** declutter mechanism — it trades a cosmetic root-tidy for 31 broken references.

**The correct declutter = the W383-P5 orphan public-showcase** — a fresh orphan repo curated by *allowlist* (the SOTA code in `tools/sota-discovery/` + `tests/` + this landscape + the corrected diagrams + a clean README), clean *by construction* and with **zero broken cites** — never a filter of the 8,000-file private history. The **private core keeps the full cross-referenced memory**; "clean" lives in the public export.

---

<sub>Cite (machine-scannable, ≥3 orgs): https://github.com/OpenHands/OpenHands · https://github.com/temporalio/temporal · https://github.com/letta-ai/letta · https://github.com/crewAIInc/crewAI · https://github.com/ComposioHQ/composio · https://github.com/microsoft/agent-governance-toolkit · https://github.com/supermemoryai/supermemory · https://github.com/opengrep/opengrep · https://owasp.org (Agentic Top-10) · https://slsa.dev — synthesized from docs/architecture/SOTA-RUNTIME-2026-05-22/ (codex r1–r4) + docs/sota-installed-manifest.md + live .mcp.json/settings.json. W385 3-stream extraction, 2026-05-23.</sub>
