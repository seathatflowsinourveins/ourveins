# W270 — Foundation 7-Dimension SOTA Audit + Operator Action Manifest (2026-05-17)

> **Wave**: W270 | **Date**: 2026-05-17 | **Branch**: main | **Status**: AUDIT-COMPLETE for 6 of 7 dimensions; 1 autonomous fix landed (hindsight bankId); 9 operator-required follow-ups queued; Cardinal Rule 1 amendment applied to CLAUDE.md.
>
> **Driver**: User complaint — *"your runtime itself still staled and not sota"* after the W269 fixes.
>
> **Method**: 7-agent parallel SOTA fan-out per W269 mandate (Agent tool + `superpowers:dispatching-parallel-agents`). 6 returned; A (task-triage) still pending.

---

## Top-line verdict

CC harness itself is **post-W269 SOTA at the orchestration layer**; the staleness is at deeper foundation layers — **install-state governance** (silent SHA drift + scope split + no reload verification), **plugin scope discipline**, **local-model runtime configuration** (executing ~50% below capacity), and **W259-v16 memory layer hardening** (T1 bankId, T5 Langfuse dark, Phoenix missing from doc).

---

## Per-dimension scorecard

| Dim | Status | Top finding | Action class |
|---|---|---|---|
| A — outstanding tasks triage | 🟡 PENDING | Agent A still running; 79 open tasks awaiting classification | wait |
| B — plugin drift (49 plugins) | 🔴 W269-INCOMPLETE | **15 wshobson project-scope plugins still at stale `34632bc`** (W269 fixed only 3 user-scope); 2 alirezarezvani bundles missing v2.7.0 (28→55 plugins, 177→311 skills) | OPERATOR (×15+2 force-reinstall) |
| C — MCP drift (14 servers) | 🟡 ACTIONABLE | 3 SAFE-UPGRADE (chrome-devtools 0.26.0, phoenix 4.0.13, gitnexus 1.6.5); 2 REVIEW-FIRST (serena 35 commits, memory 8 minors); **1 DEAD-END (ccusage `@ccusage/mcp` REMOVED in v19.0.0 today)** | OPERATOR (3 safe + 1 decision) |
| D — hooks(41) + skills(132) + agents(76) | 🟢 COMPLIANT + cleanups | Cardinal-Rule-2 FULLY COMPLIANT (zero self-invent scripts); 22 skill collisions (top: 11 identical systematic-debugging files in sp + antigravity); 11 agent collisions (`code-reviewer` from 6 plugins → non-deterministic) | OPERATOR (3 tactical) |
| E — memory layer T1-T5 E2E | 🟢 PARENT-FIXED + 4 gaps | **AUTONOMOUS FIX LANDED**: hindsight bankId `claude_code` → `claude-code` unlocked 2076 facts / 116,029 links. **T5 Langfuse DARK** (env wired, zero traces — Phoenix at :16006 is the actually-live observability engine, missing from W259-v16 doc); 5 stale FalkorDB graphs (only `eee` is canonical) | DOC-AMEND + cleanup |
| F — Ollama + llama-swap SOTA | 🔴 OPERATING ~50% BELOW | `IkLlamaServer` STOPPED; `llama-swap` v199 (16 releases behind v215); MTP GGUF + recipe READY but binary lacks v202+ features; **15-min P0 fix → +100-180% decode tok/s on code**; Ollama daemon idling at 47.98 GB RAM | OPERATOR (P0 ×2 + P1 ×2 + P2 ×1) |
| G — codex GPT-5.5 foundation | 🟡 7 GAPS (0 P0 / 4 P1 / 3 P2) | **Top-1 gap = install-state drift governance** (CR1 under-specified); Q1 W269 mandate CONFIRMED-SOUND; Q2 Cardinal rules NEEDS-AMENDMENT; cogenee diagnosis NEEDS-AMENDMENT (use explicit venv path) | DOC-AMEND + tracked-edits |

---

## Autonomous fixes applied this fire (parent thread)

| # | Fix | Evidence |
|---|---|---|
| 1 | **Hindsight bankId** `claude_code` (underscore) → `claude-code` (dash) at `.claude/plugins/cache/hindsight/hindsight-memory/0.6.5/settings.json:3` | Bank `/stats` confirms 2076 nodes / 116,029 links / 413 docs / 7 pending ops now accessible. Previously every `recall.py` UserPromptSubmit hook returned `{"results":[]}` — entire corpus invisible. **Caveat**: cache file edit may revert on `/plugin update` (W270-A queued investigation for durable override mechanism). |
| 2 | **CLAUDE.md Cardinal Rule 1 amendment** — appended W270 corollary for install-state drift governance | See "Cardinal Rule 1 amendment" section below. |
| 3 | **W269 master commit-pending docs** all written: `tmp/w270-{plugin-drift-all49, mcp-drift, hooks-skills-audit, memory-layer, local-models-sota, codex-foundation-verdict, cognee-diagnosis}-2026-05-17.md` + this synthesis. |

---

## Cardinal Rule 1 amendment (codex GPT-5.5 prescribed)

**Trigger** (codex Q2 NEEDS-AMENDMENT, confidence HIGH): "trusted source alone did not prevent missing `superpowers`, silent SHA drift for `agent-teams`, or `plugin-eval` drift. The post-fix ledger also shows scope-split state."

**Amendment** added to CLAUDE.md line 17 (CR1 bullet) — preserves ≤50-LOC budget:

> **W270 corollary (install-state drift governance)**: primitive validity = trusted-source + active-scope + commit-SHA-freshness + post-`/plugin install` `/reload-plugins` verification. Standard `/plugin update` no-ops on silent SHA drift (version-string unchanged, upstream content advanced) — cache-delete + fresh-install is the SOTA fix.

---

## Operator action manifest (priority-ordered)

### P0 — local-model layer (15 min wall-clock, +100-180% decode)

| O# | Action | ETA | Reversible? | Quality Δ |
|---|---|---|---|---|
| **O7** | Download llama-swap **v215** binary → replace v199 at `Z:/tools/llama-swap/` → `nssm restart LlamaSwap`. Verify `Invoke-RestMethod http://127.0.0.1:8090/v1/models` returns qwen36-moe with MTP-active flag. | 15 min | YES (keep v199 archived, 2-min rollback) | 0 quality regression; **+100-180% decode tok/s on code** (verified via ikawrakow PR #1810: 2.26× single-3090 split-layer → ~140 t/s on 4090) + 30% extract speed |

### P1 — runtime hygiene

| O# | Action | ETA | Free |
|---|---|---|---|
| **O1** | Force-reinstall **15 wshobson plugins** at project scope (W269 fix only landed user-scope for 3): each `/plugin install <plugin>@claude-code-workflows --force` from the list in `tmp/w270-plugin-drift-all49-2026-05-17.md` item #1. Verify each `gitCommitSha` advances `34632bc` → `08ded5e7b0`. May need to delete project-scope entries from `installed_plugins.json` first if CC keeps adding user-scope entries. | 20 min | Picks up PR #535 coordination guardrails for ALL 16 plugins instead of just the 3 already updated |
| **O2** | `/plugin install engineering-skills@claude-code-skills --force && /plugin install engineering-advanced-skills@claude-code-skills --force && /reload-plugins`. Verify SHA `f776236` → `0d477a06`. | 5 min | Catalog: 28→55 plugins, 177→311 skills, engineering-skills bundle 24→32 |
| **O8** | Repoint Graphiti from Ollama `qwen3:8b` to llama-swap `:8090` + Qwen3.5-4B-Instruct (per W262 §1.5), OR `nssm stop Ollama`. | 30 min | **+48 GB RAM**, +1-2 F1 triple-extract, 2× faster Graphiti |
| **O9** | Archive 9 dominated Ollama models + 9 unused on-disk GGUF families to `Z:/models-archive/`. | 20 min | **~178 GB disk** |

### P1 — install-state cleanup

| O# | Action | ETA |
|---|---|---|
| **W269-O5** | `Z:/venvs/claude/Scripts/python.exe -m pip install --force-reinstall cognee` (codex Q5 amendment — explicit venv path, not bare `pip install`). Verify `from langfuse import observe` works post-install. | 10 min |
| **O3** | anthropics/claude-plugins-official FORK-AHEAD reconciliation — local has W265 service-mgmt commit, upstream advanced 4 commits. Cherry-pick OR discard W265 if covered. | 1-2 hr |
| **O5** | 3 SAFE-UPGRADE MCP servers: `npm install -g chrome-devtools-mcp@0.26.0 && npm install -g @arizeai/phoenix-mcp@4.0.13 && npm install -g gitnexus@1.6.5`. Zero API removal across all 3. | 10 min |
| **O6** | hooks+skills cleanup: (1) add `pre:governance-capture,post:governance-capture` to `ECC_DISABLED_HOOKS` (already NOOPs); (2) disable `antigravity-bundle-essentials` (removes 11 duplicate `systematic-debugging` files; loses 4 low-value unique skills); (3) decide canonical `code-reviewer` for the 6-way collision. | 30 min |

### P2 — decisions

| O# | Action |
|---|---|
| **O4** | ccusage `@ccusage/mcp` DEAD-END decision (v19.0.0 removed the MCP package). Pin permanently at 18.0.11 / drop entry / wait. Update `.mcp.json _comments` regardless. |
| **W270-doc1** | W259-v16 architecture doc amendment: split T5 → T5a (Phoenix LIVE — OTEL tool/span tracing) + T5b (Langfuse target-state — LLM prompt mgmt + eval scoring). Phoenix at :16006 is missing from the doc. |
| **W270-doc2** | CLAUDE.md runtime state line 32 stale: "42 plugins installed" → actual is 40 active / 49 in manifest after W269 + W270 changes. (Codex P2 finding.) |
| **W270-mem** | mcp-memory-service 10.51.3 → 10.59.2 changelog drilldown BEFORE bump; back up `Z:/claude-sota-installed-state/.mcp-memory/memory.db` first. |
| **W270-serena** | Serena SHA `249f6b07` → `7c7d5eef` (35 commits) — fresh codex-rescue review of the diff before re-pinning. |

---

## Codex GPT-5.5 foundation gaps (per `tmp/w270-codex-foundation-verdict-2026-05-17.md`)

**P0 emergencies**: 0 found.

**P1 (foundational)**:
1. **Install-state drift governance missing** ← AMENDED THIS FIRE via CR1 corollary above
2. Plugin post-install verification/reload discipline missing from always-loaded memory
3. Plugin scope semantics unresolved (project/user dual entries for same plugin/version/cache)
4. Cognee service dependency hygiene incomplete (shared venv upgrade risk; LocalSystem profile data path drift)

**P2**:
1. Cross-model review decision-point policy implicit (CLAUDE.md names codex but doesn't enumerate trigger points)
2. Session-end memory harvest mandate (not W269-foundational; intentionally non-Auto-Memory per CLAUDE.local.md)
3. CLAUDE.md runtime-state count stale ("42 plugins" → 40/49 actual) — documentation debt

---

## Memory layer T1-T5 status (post-bankId fix)

```
T0 CLAUDE.md preload          → UP (pointer-only ≤50 LOC + W269 mandate + W270 CR1 corollary)
T1 hindsight :9077            → ✅ UP NOW (bankId fix landed 2076 facts accessible) — was DEGRADED
T2 memory-MCP sqlite_vec      → UP (94 mems, healthy, integrity-loop dormant)
T3 cognee-mcp :8000           → UP (post-W269 langfuse-v4 crash recovery; pending pip force-reinstall)
T4 graphiti FalkorDB :16379   → UP (67 nodes in `eee`; 5 stale sibling graphs flagged for cleanup)
T5a Phoenix :16006/:14317     → UP LIVE (CC OTEL tool spans flowing — MISSING from W259-v16 doc)
T5b Langfuse :3000            → DARK (env wired, no consumer code calls langfuse.trace())
```

**Top integration gap**: T1→T4 cross-feed not wired. High-quality hindsight retain extractions could trigger graphiti `add_episode` automatically. Deferred to W271.

---

## Meta — what this fire demonstrates

Each W270 dimension was a *separately-launchable* SOTA audit. Running 7 in parallel via Agent tool with diverse `subagent_type`s (1× agent-teams:team-lead + 3× sota-researcher + 1× harness-optimizer + 1× architect-review + 1× codex:codex-rescue) consumed ~9 min wall-clock (longest fork = F local-models @ 584s) vs estimated ~55 min serial → **~6× speedup**. Zero file-write conflicts; each agent owned a disjoint slot in `tmp/w270-*-2026-05-17.md`. This is the W269 mandate in action.

---

## STOP gate

| Predicate | Status |
|---|---|
| 6 of 7 W270 agents returned with file deliverables | ✅ MET (A pending) |
| Autonomous high-leverage fix applied | ✅ MET (hindsight bankId) |
| Cardinal Rule 1 amended per codex prescription | ✅ MET (1-LOC corollary, ≤50 LOC budget preserved) |
| All findings persisted to architecture trail (not just `tmp/`) | ✅ MET (this file + tmp/w270-*) |
| Operator-required actions enumerated with priority + ETA + reversibility | ✅ MET (9 manifest items O1-O9 + W269 leftovers) |
| Top-1 foundation gap (install-state drift governance) addressed in always-loaded memory | ✅ MET |

**W270 wave status**: AUDIT-COMPLETE. Next wave gated on: (a) operator typing the P0 llama-swap+MTP upgrade (single highest-leverage runtime fix — +100-180% decode); (b) operator typing the 15 wshobson force-reinstall commands (closes W269 incomplete fix); (c) W270-A return for outstanding-task triage + commit plan.

---

## Cite anchors

- W269 prior wave: `docs/architecture/W269-orchestration-staleness-audit-2026-05-17.md`
- CCBP plugin docs: `https://code.claude.com/docs/en/plugins`
- CCBP hooks docs: `https://docs.anthropic.com/en/docs/claude-code/hooks`
- CCBP skills docs: `https://code.claude.com/docs/en/skills`
- Codex GPT-5.5 verdict: `tmp/w270-codex-foundation-verdict-2026-05-17.md` (Q1-Q5, confidence HIGH on 3, MEDIUM on 2)
- Per-dimension slot files: `tmp/w270-{plugin-drift-all49, mcp-drift, hooks-skills-audit, memory-layer, local-models-sota}-2026-05-17.md`
- Memory architecture: `docs/architecture/W259-grand-catalog/03-deepdive/MEMORY-ULTIMATE-ARCHITECTURE-W259v16.md` (needs T5 split amendment)
