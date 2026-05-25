# W373 Phase 1 — Six-Stream Agent Dispatch Prompts

> **Dispatch pattern:** all 6 prompts MUST go in ONE assistant message as 6 concurrent `Agent`
> tool calls (per W269/W312-D parallel mandate). Serial dispatch = silent-fallback violation.
>
> Each agent gets `subagent_type: general-purpose` and writes to its own owned file. Zero-conflict.

---

## Stream A — Runtime inventory deep audit

**Owned output:** `.claude/state/W373-stream-A-runtime-inventory.md`

```
You are auditing the claude-code runtime at Z:/claude-sota-installed-W373/. Produce a structured
inventory of every primitive currently installed, with version + license + cadence + CVE signals.

Read-only inputs (from Z:/claude-sota-installed-W373/):
- .mcp.json (16 MCPs)
- .claude/settings.json
- .claude/plugins/installed_plugins.json (47 enabled)
- .claude/plugins/known_marketplaces.json (22 registered)
- .claude/state/subagent-type-allowlist.json
- .claude/skills/*/SKILL.md (63 skills)

Per-item axes:
1. version-pin form (npm:@pkg@x.y.z / uvx --from pkg==x.y.z / git+https://repo@sha / latest)
2. upstream HEAD SHA (probe via gh api or git ls-remote)
3. npm dist-tags.latest comparison (drift?)
4. license (MIT/Apache-2.0/AGPL/Proprietary/Unknown)
5. 30-day commit cadence on upstream main
6. CVE signal (Socket.dev/Snyk; null if unknown)

Output schema (write to .claude/state/W373-stream-A-runtime-inventory.md):

# Stream A — Runtime Inventory
**Started:** <ISO> **Completed:** <ISO>

## Findings (table)
| ID | Category | Subject | Evidence | Risk-class-draft | sca-draft |
|----|----------|---------|----------|------------------|-----------|
| W373-A-F001 | MCP | github MCP version drift @2025.4.8 vs latest | .mcp.json:23 | LOW | 4.5 |
...

## Coverage
- audited: 16 MCPs · 47 plugins · 22 marketplaces · 63 skills · subagent-allowlist · hooks
- not-audited (deferred): <list>

## Verify-Before-Claim attestation
- one VERIFIED/UNVERIFIED line per finding

DO NOT modify any file outside .claude/state/W373-stream-A-*. DO NOT spawn sub-subagents.
Report DONE when complete.
```

---

## Stream B — SOTA catalog cross-check + live May-2026 refresh

**Owned outputs:** `.claude/state/W373-stream-B-sota-catalog-gapfind.md` + `docs/architecture/W373-SOTA-READY/CATALOG-CROSS-CHECK-LEDGER.md`

```
You are gap-finding SOTA-missing repos for the claude-code runtime. Cross-check LANDSCAPE.md
catalog against live runtime, resolve 3 named gaps, and surface May-2026 emerging SOTA via
multi-MCP convergence.

Read-only inputs:
- docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md (50 × 6-tier catalog)
- .mcp.json + .claude/plugins/installed_plugins.json + known_marketplaces.json
- Z:/claude-sota-installed-repos/ directory listing (133 dirs)

3 named gap-resolutions:
1. shanraisshan/claude-code-best-practice — install as marketplace? skill bundle? cite-only?
   Probe: gh api repos/shanraisshan/claude-code-best-practice; classify.
2. ComposioHQ — resolve to specific repo (composio · composio-toolkit · composio-mcp · RubeApp).
   Pick winner via README + stargazers + last-commit comparison.
3. rohitg00/agentmemory — MCP, skill, plugin, or Python library?
   Probe gh api repos/rohitg00/agentmemory; classify; recommend install-shape.

Live SOTA refresh (sca-v17 3-org-distinct convergence):
- perplexity.perplexity_research: "claude-code SOTA repos May 2026 MCP plugin skill"
- exa.web_search_exa: same
- firecrawl.firecrawl_search: same
- hf-mcp.hub_repo_search: "claude-code"
- deepwiki.ask_question: "What are the SOTA Claude Code plugins as of May 2026?"

For May-2026 candidates with ≥2 distinct convergence sources NOT in LANDSCAPE.md: add as Tier-3.

Output schema (.claude/state/W373-stream-B-sota-catalog-gapfind.md + CATALOG-CROSS-CHECK-LEDGER.md):

# Stream B — SOTA Catalog Gap-Find
**Started:** ... **Completed:** ...

## Catalog Cross-Check Ledger (≥50 rows for Tier 1+2)
| Tier | LANDSCAPE entry | Present? | Pinned? | Latest-OK? | License-OK? | Active? | Action |
|------|-----------------|----------|---------|------------|-------------|---------|--------|

## Three named-repo resolutions
- shanraisshan/CCBP: <verdict>
- ComposioHQ: <resolved repo>; install-shape = <MCP|skill|plugin|cite-only>
- rohitg00/agentmemory: <verdict>; install-shape = <...>

## Live SOTA refresh — May-2026 beyond LANDSCAPE.md
| Candidate | Convergence sources | Tier | Recommend |

## Findings (table)
| ID | Category | Subject | Evidence | Risk-class-draft | sca-draft |

Report DONE. Owned files only.
```

---

## Stream C — Git-tree + automation/CI hygiene

**Owned output:** `.claude/state/W373-stream-C-git-automation.md`

```
You are auditing the git-tree topology + CI/CD/pre-commit/branch-protection surface for SOTA.

Read-only inputs:
- `git worktree list` (7 worktrees now including W373 + W374-EXT)
- `git log --oneline <branch>..main` per worktree
- .github/workflows/*.yml
- .pre-commit-config.yaml (13 gates)
- tools/eee.ps1 + eee-status.ps1 + preagent-*.mjs
- commitlint.config.js
- branch-protection: gh api repos/<owner>/<repo>/branches/main/protection

Specific audits:
1. W362a/W362bA/W362c worktrees: orphan-commit count per branch; classify safe-to-prune.
2. Pre-commit gate SHAs: gitleaks v8.30.1 · ruff v0.15.12 · actionlint v1.7.12 · commitlint v20.5.3 — drift check.
3. GitHub Actions: parallel-ratio gate (W370 P2.2) · codex-jury workflow · CodeQL · Dependabot.
4. preagent gates binding-mode (W329 R5-corollary).
5. Branch-protection on main: require-PR / status-checks / signed-commits / linear-history.

Output schema (.claude/state/W373-stream-C-git-automation.md):

# Stream C — Git-tree + Automation/CI Hygiene
**Started:** ... **Completed:** ...

## Findings (table)
| ID | Category | Subject | Evidence | Risk | sca-draft |

## Worktree disposition table (current 7; W350 cap=5)
| Worktree | Branch | Orphans | Verdict (KEEP/PRUNE-CANDIDATE) | Reason |

## CI workflow inventory
| Workflow | Trigger | Status |

## Pre-commit gate version-drift
| Hook | Pinned | Latest upstream | Drift? |

## Verify-Before-Claim attestation

Report DONE. Owned files only.
```

---

## Stream D — Hidden-error / silent-fallback / stale-reference sweep

**Owned output:** `.claude/state/W373-stream-D-hidden-errors.md`

```
You are hunting hidden errors + silent fallbacks + stale references.

Read-only inputs:
- All of Stream A's input set
- CLAUDE.md (every numbered claim + Runtime State + Status pointers)
- docs/architecture/W*/VERDICT-LEDGER.md
- tools/preagent-*.mjs

Specific sweeps:
1. parallel_ratio empirical re-probe over last 30d .claude/projects/<project>/*.jsonl:
   - parallel_ratio = (parallel-multi-Agent-sessions) / (total-multi-stream-sessions); target ≥0.7
2. preagent gate dry-run (--dry-run flag if present):
   - tools/preagent-parallel-guard.mjs · subagent-validator.mjs · d73-gate.mjs
3. W342 phantom-enabled re-scan: enabledPlugins entries ↔ cache dirs
4. W370 stale-fact CLAUDE.md scan: every claim → live state match?
5. claudelint / everything-claude-code checkers if installed
6. Stale 'SOFT-DISABLED' / 'RETIRED' / 'EXCISED' references vs live settings.json

Output schema (.claude/state/W373-stream-D-hidden-errors.md):

# Stream D — Hidden Errors / Silent Fallbacks / Stale References
**Started:** ... **Completed:** ...

## Findings (table)
| ID | Type | Subject | Evidence | Risk | sca-draft |

## parallel_ratio measurement
- Sessions probed: N · multi-stream: M · multi-Agent-in-1-msg: K
- parallel_ratio = K/M = <value> vs target 0.7

## CLAUDE.md stale-fact audit
| Line | Claim | Live state | Match? |

## Verify-Before-Claim attestation

Report DONE. Owned files only.
```

---

## Stream E — MCP / memory-tier live deep-probe

**Owned output:** `.claude/state/W373-stream-E-mcp-memory-live.md`

```
You are live-probing every external service the runtime depends on.

Probes (per service):

MCPs in .mcp.json (16):
- HTTP: github · deepwiki · cognee :8000 · hf-mcp — HEAD probe → expect alive
- stdio: chrome-devtools · repomix · serena (uvx SHA-pinned 249f6b07) · ccusage · langfuse-mcp · basic-memory · perplexity · playwright · exa · firecrawl · codegraph · docling

Memory tiers:
- T2 sqlite_vec: .claude/plugins/data/<everything-claude-code>/memory.db existence
- T3 cognee :8000: Get-Service CogneeMCP + curl POST initialize → expect serverInfo
- T5 langfuse :3000: curl /api/public/ → 200/401
- T5 OTel :3000/api/public/otel/v1/traces: probe
- T6 basic-memory: BASIC_MEMORY_HOME dir + basic-memory --version
- Ollama :16700: curl /v1/models → JSON
- LlamaSwap :8090: Get-Service llama-swap + curl /health
- FalkorDB :16379: Test-NetConnection

Per service: VERSION (claimed vs live) · LATEST upstream · DRIFT · LICENSE · CVE-flag.

Output schema (.claude/state/W373-stream-E-mcp-memory-live.md):

# Stream E — MCP / Memory-Tier Live Deep-Probe
**Started:** ... **Completed:** ...

## MCP probe matrix
| MCP | Transport | Pinned | Live | Latest | Wire alive? | License | CVE? |

## Memory tier matrix
| Tier | Service | Endpoint | Status | Version |

## Findings (table)
| ID | Subject | Evidence | Risk | sca-draft |

## Verify-Before-Claim attestation

Report DONE. Owned files only.
```

---

## Stream F — Research-arch + skill-trigger + documentation cite-refresh

**Owned output:** `.claude/state/W373-stream-F-cite-refresh.md`

```
You are auditing every cite-anchor in CLAUDE.md + skill triggers + VERDICT-LEDGER rows.

Read-only inputs:
- CLAUDE.md (every parenthetical + URL + path reference)
- .claude/skills/*/SKILL.md (every description field)
- docs/architecture/W*/VERDICT-LEDGER.md (cumulative chain)
- mcp__basic-memory__search_notes (T6 cumulative knowledge)
- docs/architecture/SOTA-RUNTIME-2026-05-22/LANDSCAPE.md
- Cited HEAD SHAs of repos at Z:/repos/deps/

Specific audits:
1. CLAUDE.md cite-anchors: per anchor: file exists? GitHub URL alive? HEAD SHA still HEAD? arXiv ID valid?
2. Skill SKILL.md description audits:
   - Per skill: distinct trigger phrases count (target ≤8 per cardinal-rule-4)
   - Per skill pair: trigger overlap (target <50%)
3. VERDICT-LEDGER row integrity: each cites prior row; pre-W255 → W373 chain.
4. Known-stale check:
   - CCBP HEAD a28cd96b (CLAUDE.md L4) — still HEAD?
   - mattpocock-vendor-fork-10 @ b8be62ffacb0 (CLAUDE.md L29)
   - addyosmani/agent-skills @ f17c6e88 (CLAUDE.md L29)
   - sca-v18 commit 44a54ba
5. T6 cumulative ledger: search_notes("Wave-W*") matches disk.

Output schema (.claude/state/W373-stream-F-cite-refresh.md):

# Stream F — Cite-Refresh
**Started:** ... **Completed:** ...

## Cite-refresh findings
| ID | Source | Stale claim | Live state | Risk | sca-draft |

## Skill trigger cardinality
| Skill | Distinct triggers | Status (≤8?) | Notes |

## Skill trigger overlap (top 10 high-overlap pairs)
| Skill A | Skill B | Overlap % | Status (<50%?) |

## VERDICT-LEDGER chain integrity
| Wave | Row present? | Cites prior? | Cumulative-OK? |

## Verify-Before-Claim attestation

Report DONE. Owned files only.
```

---

## Sync Protocol

Parent orchestrator dispatches all 6 prompts in ONE message, then awaits 6 TaskUpdate completed events.
No new Agent dispatch fires until all 6 streams report DONE OR watchdog escalates (T+90min).
