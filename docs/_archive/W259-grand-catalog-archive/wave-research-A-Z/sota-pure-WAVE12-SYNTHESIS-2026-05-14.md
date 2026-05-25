---
title: W202 PURE Wave 12 — sub-synthesis (gap-resolution + cross-validation arc)
status: WAVE12-COMPLETE
date: 2026-05-14
arc: 7-stream parallel deeper-coverage + cross-validation
parent: tmp/sota-pure-WAVE7-11-MEGA-SYNTHESIS-2026-05-14.md
---

# W202 PURE — Wave 12 sub-synthesis

## Arc summary

7 parallel streams dispatched for deeper SOTA coverage (R/V/W/S/T) + cross-validation discipline (X/Y). 5/7 clean returns (R+V+T+W+Y) + 2/7 HONEST-NON-FINDING (S Python libs max_turns + X BRIDGE-MODE bundled-too-broad watchdog stall).

## Critical cross-stream corrections (verdict overturns)

| Original (Wave 7-11) | Overturned by (Wave 12) | Reason | Action |
|---|---|---|---|
| Stream A: claude-hud ADOPT-NOW | Stream W | 4mo borderline Axis-3 vs claudia-statusline 9mo + Rust+SQLite lighter + cargo rollback | Phase 2D row 2D.2 changes to claudia-statusline; claude-hud DEFER Phase 2E option-B |
| Stream E: 4 alirezarezvani ADOPT-NOW (rag-architect / spec-driven / tech-debt / observability) | Stream Y DeepWiki granularity DEFECT | rag-architect is embedded in Senior Prompt Engineer composite, NOT top-level skill; other 6 likely same | Flip cherry-pick → BLANKET-ADOPT-PARENT + disabledSkills config |
| Stream A: 8 candidates → 6 CONFIRMED | Stream Y 4-source strict | Only 13/15 Top-15 reach STRONG (≥3-source PASS) | Cumulative ~46 ADOPT-NOW → 13 CONFIRMED + 9 STUDY-PILOT + 14 BUNDLE-via-parent |

## Wave 12 stream results

### Stream R — GitNexus integration (STUDY-PILOT → ADOPT conditional)
- Install: `npm install -g gitnexus@1.6.4-rc.112` Phase 3 MCP per `Z:/repos/deps/gitnexus/README.md @ 98addbd6`
- License AMBER: PolyForm Noncommercial 1.0.0 (local-runtime OK, NOT commercial)
- Probe DAG: 6/7 PASS + 1 AMBER (Probe-6 LICENSE)
- **Strategic dual-install**: GitNexus (knowledge-graph + hooks + cross-session impact) + **Serena (MIT-permissive LSP alternative)** with Anthropic Opus 4.6 + GPT 5.4 named-T2 endorsements
- Manifest Section 8: row #14 gitnexus STUDY-PILOT + row #15 serena ADOPT-NOW
- 3 honest cite caveats: Sourcegraph INFERRED / GITNEXUS_HOME env unverified / Serena HEAD SHA not refreshed — Wave 13 verify

### Stream V — Docker compose stack (Phase 3.5 trigger-gated)
- 4 services designed: FalkorDB / Qdrant / Ollama / LiteLLM
- Port-mapping discipline: pure uses 17379 / 14000 / 6334+6335 / 11800 / 4000 — DISTINCT from sibling's 16379 / 13000 / 11700
- Profile-gated activation (NONE start by default; explicit `--profile <name>`)
- State-outside-repo: `Z:\claude-sota-pure-state\` per CR-5
- Security: 127.0.0.1-only binding; CR-9 reversibility ≤1min via `docker compose down`
- **Phase 3 minimum requires NO docker** (mcp-memory sqlite_vec satisfies)
- Verdicts: FalkorDB ADOPT-DEFERRED + Qdrant/Ollama/LiteLLM STUDY-PILOT
- DEFER actual file creation until Phase 3.5 trigger fires (Stream D §3.2 predicate)

### Stream W — Hooks deeper audit + statusline OVERTURN
- 49 hooks inventoried across 6 marketplaces:
  - claude-plugins-official: 8 / 5 plugins
  - claude-code-workflows: 4 (protect-mcp Cedar-native via npm CLI — NO custom runtime)
  - addy-agent-skills + superpowers-dev: ZERO hooks (SKILL-ONLY by design)
  - codex@openai-codex: 3 hooks (SessionStart/SessionEnd/Stop — T1-T5 GAP)
  - context-mode: 11 hooks
  - Phase 2A additions: intelligent-compact + ECC + context-management
- **Statusline OVERTURN**: claudia-statusline (hagan) SUPERSEDES claude-hud
- **gsd-context-monitor**: REJECT-as-is + ADOPT-AS-PATTERN — design fresh `pure_context_monitor.js` at Phase 2D Block 7 (CR-12 GENUINELY-NEW; ${CLAUDE_CONFIG_DIR} path rewrite per CR-9 sibling-bleed defense)
- Cedar governance: 8 hooks at Phase 2D close (6 new from Wave 7 C + 2 wrapped incumbents)
- Convergence: ≥9 distinct orgs (Anthropic + OpenAI + Seth Hobson + hagan + jarrodwatts + TÂCHES + obra/Jesse Vincent + Mert Koseoglu + Addy Osmani + ECC)

### Stream S — Python libs (HONEST-NON-FINDING)
- Max_turns / mid-write failure at 50 tool_uses / 274s
- Wave 13 retry with tighter scope (Top-5 instead of Top-10)
- Non-blocking for Phase 0-2A; per-hook pip install as needed

### Stream T — Karpathy 3-layer wiki (SELECTIVE-VENDOR Phase 2B+)
- Cite-path correction: `Z:\repos\deps\andrej-karpathy-skills` (NOT forrestchang prefix)
- Single skill `karpathy-guidelines` (68 LOC MIT) — NOT a bundle
- DOC-CLASS only (no scripts/hooks/validators)
- 3-layer wiki templates derived from Karpathy gist + sibling karpathy-adapted.md §5
- Install via `/plugin marketplace add forrestchang/andrej-karpathy-skills` + `/plugin install andrej-karpathy-skills@karpathy-skills`
- Axis-3 BORDERLINE 83d — re-audit at 90d gate
- Verdict: SELECTIVE-VENDOR Phase 2B+ (not firm ADOPT-NOW)

### Stream X — BRIDGE-MODE cross-review (HONEST-NON-FINDING)
- 515s wall-clock + autocompact-thrashing → FM-17.d watchdog stall (bundled-too-broad)
- 9 stand-in verdicts (A/C/D/E/F/L/P/Q/T) still require cross-model gate
- Wave 13 X-retry: split 9 reviews into 3 batches × 3 streams (CADP max-3) with ≤90s per-axis codex call budget per advanced-agent-team-standing-directive invariant #1
- Stream B's prior BRIDGE-MODE coverage of cwc/mcp-eval (G2/G6/G9) remains ARC-LEVEL gate-satisfaction for that surface

### Stream Y — 4-source cross-validation (Top-15 strict-convergence)
- 4 SOURCES: GitHub direct + DeepWiki ask_question + named-T2 endorsement + trajectory/memory grep
- 13/15 STRONG (≥3 PASS): see overturn table above
- 2/15 MEDIUM demoted to STUDY-PILOT: rag-architect (granularity) + claude-code-tools (slowing)
- **Stream E granularity DEFECT caught** → BLANKET-ADOPT-PARENT pattern
- Strict 4-source convergence reduces MEGA-SYNTHESIS ~46 → **13 CONFIRMED-ADOPT-NOW**
- 4 methodological caveats documented

## Updated Phase 2D ship plan (post-Wave-12 corrections)

### CONFIRMED-ADOPT-NOW (13 — STRONG ≥3-source convergence per Stream Y)

| # | Plugin | Source | Verdict gate |
|---|---|---|---|
| 1 | security-guidance | claude-plugins-official | Anthropic-OFFICIAL + Stream Y STRONG |
| 2 | claudia-statusline | hagan | Stream W overturn + Stream Y STRONG (replaces claude-hud) |
| 3 | compound-engineering | upstream MIT | Stream A + Stream Y STRONG |
| 4-7 | superpowers @ superpowers-dev | obra MIT | Monolithic install + 10 ENABLED + 2 disabledSkills |
| 8-9 | mattpocock grill-me + diagnose | mattpocock TIER-1-NAMED-AUTHOR | Stream Y STRONG |
| 10 | vercel-labs react-best-practices | Vercel-org | Stream Y STRONG |
| 11-12 | chief_of_staff_agent + Opus-Haiku fan-out | Stream F cookbook | Stream Y STRONG |
| 13 | get-shit-done prompt_guard.js | TÂCHES MIT selective-vendor | Stream Y STRONG + Stream Q ADOPT |

### STUDY-PILOT (9 — MEDIUM 2-source convergence)

- alirezarezvani rag-architect (granularity DEFECT — defer to BLANKET-ADOPT-PARENT)
- pchalasani claude-code-tools (slowing trajectory + single-named-author)
- karpathy-guidelines (Axis-3 83d → 90d gate)
- gitnexus (PolyForm Noncommercial AMBER — license accept gate)
- mksglu/context-mode (Elastic-2.0 + 75d fast-churn)
- gsd /spike pattern (selective-vendor as skill)
- gsd-context-monitor → design fresh pure_context_monitor.js
- tdd-guard (PARTIAL-OVERLAP superpowers/tdd)
- knowledge-work-plugins (await workflow signal)

### BUNDLE-via-parent (14 — defer cherry-pick per Stream Y granularity defect)

- 4 alirezarezvani sub-skills (rag-architect / spec-driven-workflow / tech-debt-tracker / observability-designer) → install full claude-code-skills marketplace with disabledSkills config
- Other 10 deferred or absorbed into existing plugin marketplaces

### NEW additions from Wave 12

- claudia-statusline (Stream W ADOPT replacing claude-hud)
- pure_context_monitor.js (Stream W GENUINELY-NEW Phase 2D Block 7 design)
- gitnexus + serena dual-install (Stream R Section 8)
- 4 docker services Phase 3.5 trigger-gated (Stream V Section 10)
- karpathy-guidelines plugin SELECTIVE-VENDOR (Stream T Section 11)
- 3 templates: L1 JSONL + L2 MEMORY.md + L3 docs/topic.md (Stream T Section 11)

## Pure-runtime state matrix (post-Wave-12)

| Phase | Status |
|---|---|
| Phase 0 bootstrap (12 files) | ✅ COMPLETE |
| Phase 0+ smoke probes (14-probe spec) | ✅ SHIPPED at `docs/smoke-probes-1-to-14.md`; 0/14 fired |
| Phase 1 marketplace registration | ⏳ PENDING — operator `/plugin marketplace add` |
| Phase 2A 11 plugins | ⏳ PENDING — revised per Wave 12 overturns (claudia-statusline + BLANKET-PARENT bundles) |
| Phase 2B cwc primitives | STUDY-PILOT direct-clone (Stream B correction) |
| Phase 2C claude-api skill (Wave 6 L) | ⏳ PENDING |
| Phase 2D Block 1-8 (~46 → 13 confirmed) | ⏳ PENDING — Wave 13 BRIDGE-MODE re-review |
| Phase 3 MCP wire (5 starter + 5 Anthropic-canonical + mcp-memory + gitnexus+serena) | ⏳ PENDING |
| Phase 3.5 Graphiti + docker stack | trigger-gated DEFERRED |
| Phase 4-6 vendor DB / observability / format | trigger-gated DEFERRED |

## Cross-model gate status (W202 arc final)

- **Stream B Wave 7**: real GPT-5.5 BRIDGE-MODE confirmed → ARC-LEVEL gate satisfied for cwc/mcp-eval surface (G2/G6/G9) + 7 critical adversarial corrections to Wave 5 K
- **Stream X Wave 12**: FAILED (FM-17.d watchdog stall) → 9 stand-in verdicts (A/C/D/E/F/L/P/Q/T) STILL UNDER STAND-IN-NOTICE
- **Wave 13 X-retry required** before install-class manifest commit per cross-model-consensus.md §Env-funneled mandate

## Subagent reliability metrics (W202 arc 16 streams)

- **14/16 clean returns** (87.5%)
- **2/16 HONEST-NON-FINDING** (S max_turns / X watchdog stall)
- **3/16 autocompact-thrashing notifications recovered via disk-probe** (B + C + Stream P Wave 11)
- **3/14 verdict overturns** validate cross-stream verification architecture (W overturns A; Y overturns E; B overturns Wave-5 K)

## Wave 13 queue (next-fire dispatch candidates)

1. **Wave 13 X-retry** — 3 batches × 3 BRIDGE-MODE streams for 9 stand-in verdicts (per-axis ≤90s codex budget; Pattern D recovery shape per ctff-patterns-cd.md)
2. **Wave 13 S-retry** — vinta/awesome-python with tighter scope (Top-5 single-category drill)
3. **Wave 13 Z** — smoke probe execution (14-probe protocol fire against Phase 0 bootstrap)
4. **Wave 13 AA** — Shubhamsaboo/awesome-llm-apps deep-mine (orchestration patterns)
5. **Wave 13 BB** — shareAI-lab/learn-claude-code audit
6. **Wave 13 CC** — manifest extension Block 1-8 atomic apply commit (post-X-retry verdict)
7. **Wave 13 DD** — ComposioHQ awesome-claude-skills deeper Top-5+ (Wave 9 E only spot-checked Top-2)
8. **Wave 13 EE** — Karpathy 3-layer wiki implementation files write (L1 JSONL + L2 MEMORY.md template + L3 sample docs file) at Z:\claude-sota-pure\ per Stream T deliverables

## Status

- W202 Wave 12 sub-synthesis COMPLETE
- 5 clean returns + 2 HONEST-NON-FINDING
- 3 cross-stream verdict overturns validate wave architecture
- 13 CONFIRMED-ADOPT-NOW (down from ~46 MEGA-SYNTHESIS via strict 4-source convergence)
- 9 STUDY-PILOT + 14 BUNDLE-via-parent
- Cross-model gate PARTIAL — 9 stand-in verdicts await Wave 13 X-retry
- Pure runtime scope locked; sibling Z:\claude-sota-installed\ + Z:\claude-sota\ UNTOUCHED
- Promotion blocker 0/5 conditions met (operator-Phase-1 still pending)
- Wave 13+ queue: 8 candidates for next-fire dispatch

End Wave 12 sub-synthesis.
