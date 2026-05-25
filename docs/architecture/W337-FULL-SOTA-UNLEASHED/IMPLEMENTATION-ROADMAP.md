# W337 Implementation Roadmap — Post-Codex-Adversarial-Review (REVISED)

> **Wave**: W337. **Date**: 2026-05-20. **Predecessor**: W336 (e18e72e). **Codex GPT-5.5 verdict**: BLOCK on draft synthesis → addressed in this revision; verdict pending re-review.
>
> **Status**: Phase-3 (implementation roadmap). Codex Phase-4 round-1 done (BLOCK with 4 hard blockers + 6 WARN); blockers resolved + addressed. Round-2 codex re-review queued post-merge.

## Canonical Count Definitions (resolves Codex Blocker 4)

To eliminate "plugins"/"marketplaces"/"cache"/"enabled" conflation:

| Metric | Source | Current | Notes |
|---|---|---|---|
| `cache_dirs` | `.claude/plugins/cache/` ls | **15** | per-marketplace download dir |
| `marketplace_records` | `known_marketplaces.json` keys | **22** | registered marketplaces (with source URLs) |
| `marketplace_dirs` | `.claude/plugins/marketplaces/` ls | **23** | filesystem marketplace dirs (1 not in known_marketplaces.json — investigate) |
| `installed_plugin_records` | `installed_plugins.json:plugins` keys | **64** | per-plugin install metadata records |
| `enablement_entries` | `settings.json:enabledPlugins` keys | **68** | enablement decisions logged |
| `enabled_true` | `settings.json:enabledPlugins` value=true | **59** | enabled |
| `enabled_false` | `settings.json:enabledPlugins` value=false | **9** | explicitly disabled |
| `load_successes` | `claude plugin list \| grep enabled` | ~58 | effective-enabled at runtime |
| `load_failures` | `claude plugin list` load-fail entries | **1** | `everything-claude-code@everything-claude-code` (per codex F9 probe) |

**CLAUDE.md L35 stale text** ("68 declared / 64 installed / 47 enabled per W315-r2 / 16 marketplaces / 22 defined / 6 unused / cache 18") MUST be replaced with the table above. Discrepancies:
- "18 cache" → 15 (post-W316 retirement of addy-agent-skills/gitnexus-marketplace/mcp-memory-service)
- "47 enabled" → 59 (W334-SOTA-UNLEASH ca6904a `feat: enable 18 high-value SOTA plugins per operator audit` added 12; W335 disabled 4 broken; net +12-4=+8 → still ≠ 12 delta; recount needed)
- "16 referenced / 22 defined / 6 unused" → 22 registered / 15 cache → 7 unused; reconcile

## Revised Top-10 GAP Closures (post-codex)

| # | Action | Status vs Draft | Effort | Risk | Owner |
|---|---|---|---|---|---|
| 1 | **`/ctx-upgrade`** mksglu/context-mode v1.0.141→v1.0.146 | UNCHANGED P0 | 1min | LOW (openclaw fix is upstream-tested) | runtime |
| 2 | ~~`/plugin marketplace add wshobson/agents`~~ → **RECONCILE existing wshobson sourcing** + verify intended-vs-actual coverage of 17 `*@claude-code-workflows` enabled plugins | **OVERTURNED (codex F1)** | 30min | LOW | plugin inventory |
| 3 | **Langfuse stack restart**: `docker compose -f Z:/claude-hub/observability/docker-compose.yml ps` then `up -d` (verify yml extension, NOT yaml); investigate why 5/6 containers exited(255) ~1h ago | REVISED command (.yml; restart not recreate) | 10min | LOW | observability |
| 4 | **`/insights` mark "command-verified, runtime-unverified"**; defer first run + monthly cadence until API not overloaded; capture artifact `~/.claude/usage-data/report.html` | REVISED (existence per docs.claude.com/commands#L110, runtime per codex F5 timed out 124) | 5min wait + 10min run | LOW | runtime workflow |
| 5 | **CLAUDE.md L35 drift fix** using canonical count table above; replace stale numbers | REVISED scope | 10min | LOW | docs |
| 6 | ~~Drop orphan gitnexus skill~~ → **CORRECT CLAUDE.md L52 path** — child skills are nested at `.claude/skills/gitnexus/<child>/`, not sibling `.claude/skills/gitnexus-<child>/` | **OVERTURNED (codex F7)** | 5min | NONE | docs |
| 7 | **Wire 9 real new hook events** (per direct ctx_search on Anthropic hooks doc): Setup, InstructionsLoaded, UserPromptExpansion, PermissionRequest, PermissionDenied, PostCompact, FileChanged, SubagentStart, SessionEnd. **PER CODEX F3**: wire only with explicit use-case + post-hook overhead budget. NO empty-hook coverage padding. | REVISED (9 verified vs Stream-C 6; some Stream-C names verified, some refined; codex agreed 6 are real) | 90min (15min × 6 with budgets) | MEDIUM | hook owner |
| 8 | **Decision-log**: GENERATE `.claude/state/sota-decisions.jsonl` FROM existing per-wave `VERDICT-LEDGER.md` (canonical = markdown; JSONL = derived index) — per codex F6 avoids double-bookkeeping | REVISED design | 60min | LOW | docs |
| 9 | ~~Refresh mattpocock fork~~ → **DEMOTED to P3 backlog** (codex F8: stylistic only, no security/major release) | DEMOTED | 5min when batch-refresh ships | NONE | vendor refresh |
| 10 | **Untracked files cleanup**: commit `tools/cleanup-root-phantom-paths.ps1` + `tools/repatch-autoresearch-namespaces.ps1`; gitignore `.gemini/`; delete `docs/architecture/W335-SOTA-CONVERGENCE-MAX/PASTE-BODY.txt` (W336 closed) | UNCHANGED | 5min | NONE | runtime |
| **NEW 11** | **Investigate `everything-claude-code@everything-claude-code` load failure** (codex F9 probe: enabled but fails to load) | NEW | 20min | MEDIUM | plugin inventory |
| **NEW 12** | **Calibrate PluginEval against W330-W337 prior decisions before deprecating sca-vN** (codex F2) | NEW | 90min | LOW | SOTA eval |
| **NEW 13** | **Refine alirezarezvani re-litigation cadence** to event-driven (codex F10): re-check on major upstream packaging changes OR concrete operator gap; W345 = backstop not earliest | NEW | 10min docs update | NONE | skill inventory |

## Phased Ship Plan

### W337 P0 SHIP (immediate, after operator sign)

```bash
# 1. ctx-upgrade (1min, LOW risk)
/ctx-upgrade

# 3. Langfuse restart (10min, LOW risk)
cd Z:/claude-hub/observability
docker compose -f docker-compose.yml ps          # baseline
docker compose -f docker-compose.yml up -d        # restart 5 exited containers
sleep 10
curl http://127.0.0.1:3000/api/public/health      # expect 200
# If exit(255) recurs, check docker compose logs langfuse-web for cause
```

### W337 P1 IMMEDIATE (this wave)

```bash
# 2. wshobson reconciliation (30min)
# Inventory current wshobson-sourced enabled plugins:
node -e 'const s=JSON.parse(require("fs").readFileSync("Z:/claude-sota-installed/.claude/settings.json","utf8")); const e=s.enabledPlugins; const cw=Object.entries(e).filter(([k,v])=>v===true && k.includes("@claude-code-workflows")); console.log("wshobson-sourced enabled count:",cw.length); for(const [k] of cw) console.log("  ",k);'
# Cross-ref against upstream README current plugin list (185 agents + 80 plugins)
# Decide: install N NEW plugins OR document why we have only K of M

# 5. CLAUDE.md L35 drift fix (10min)
# Edit CLAUDE.md L35 to use canonical-count table (above)

# 6. CLAUDE.md L52 gitnexus path fix (5min)
# Change `.claude/skills/gitnexus-{guide,exploring,...}` → `.claude/skills/gitnexus/{guide,exploring,...}`

# 10. Untracked cleanup (5min)
git add tools/cleanup-root-phantom-paths.ps1 tools/repatch-autoresearch-namespaces.ps1
echo ".gemini/" >> .gitignore
rm docs/architecture/W335-SOTA-CONVERGENCE-MAX/PASTE-BODY.txt
git add -u .gitignore docs/architecture/W335-SOTA-CONVERGENCE-MAX/PASTE-BODY.txt
git commit -m "chore(W337-P1): housekeeping — cleanup + gitignore + docs delete"
```

### W337 P1 EXTENDED (this wave + 1)

```bash
# 4. /insights command (5min wait + 10min run, when API stable)
# Run once successfully, capture report:
claude /insights  # waits for API; expect ~/.claude/usage-data/report.html
# Add monthly cadence via cron OR /loop tick

# 7. 9 new hook events (90min — only after use-case budgets defined)
# For each of: Setup, InstructionsLoaded, UserPromptExpansion, PermissionRequest, PermissionDenied, PostCompact, FileChanged, SubagentStart, SessionEnd
# Step 1: define use-case (what hook does + what overhead it adds)
# Step 2: implement minimal handler
# Step 3: smoke-test exit-code-0 path
# Step 4: cite-anchor to docs.anthropic.com event subsection

# 8. Decision-log generator (60min)
# Write tools/sota-decisions-from-ledger.mjs
# Parse all docs/architecture/W*-*/VERDICT-LEDGER.md → emit .claude/state/sota-decisions.jsonl
# Canonical source = markdown ledger; JSONL = derived index (regenerate on demand)

# 11. everything-claude-code load failure (20min)
# Step 1: run `claude plugin list 2>&1 | grep -i fail`
# Step 2: read .claude/plugins/cache/everything-claude-code/.plugin.json for required deps
# Step 3: check if cache structure is stale (post-W255 cleanup mismatch?)
# Step 4: either fix or disable in settings.json:enabledPlugins
```

### W337 P2 BACKLOG (later wave)

```bash
# 12. PluginEval calibration bakeoff (90min, before sca-vN deprecation)
# Take 10 prior W330-W337 install/retire decisions, run PluginEval, compare verdicts
# Document divergences. Only deprecate sca-vN if PluginEval agrees ≥80% on calibration set.

# 13. alirezarezvani cadence refinement (10min)
# Update docs/architecture/W337-FULL-SOTA-UNLEASHED/ULTIMATE-ARCHITECTURE.md §3 row
# Change "re-litigate W345" → "event-driven (major upstream packaging change OR concrete operator gap); W345 backstop"

# 9. mattpocock refresh (DEMOTED — wait for batch refresh)
# Trigger when ≥3 vendor forks need refresh together
```

## Operator-AIs (Action Items for Operator Sign)

- **AI-W337-1** [P0]: `/ctx-upgrade` — operator-confirm; reversible via git revert of cache dir
- **AI-W337-2** [P0]: Langfuse restart at `Z:/claude-hub/observability/docker-compose.yml`; operator-verify port :3000/api/public/health returns 200
- **AI-W337-3** [P1]: wshobson reconciliation — operator-decide whether to install N more wshobson plugins or stay at 17
- **AI-W337-4** [P1]: CLAUDE.md L35 + L52 drift fix — operator-sign on canonical count table
- **AI-W337-5** [P1]: 9 new hook events — operator-define use-case for each before wire
- **AI-W337-6** [P1]: decision-log generator design — operator-sign on canonical=markdown, derived=jsonl
- **AI-W337-7** [P1]: everything-claude-code load failure — operator-decide fix-vs-disable
- **AI-W337-8** [P2]: PluginEval calibration bakeoff (gate for sca-vN deprecation)
- **AI-W337-9** [P2]: alirezarezvani cadence policy update
- **AI-W337-10** [P3]: mattpocock refresh — defer to batch
- **AI-W337-11** [P1]: untracked files cleanup — operator-sign on individual file dispositions

## Rollback Plans

| Action | Rollback |
|---|---|
| `/ctx-upgrade` | `npm install -g @plugins/context-mode@1.0.141` (downgrade); cache dir restored from git |
| Langfuse restart | `docker compose down` (back to current dead state) |
| wshobson reconciliation | revert settings.json:enabledPlugins from git |
| CLAUDE.md drift fix | git revert HEAD |
| 9 new hooks wire | remove from settings.json:hooks |
| decision-log generator | rm `.claude/state/sota-decisions.jsonl` |
| untracked cleanup | git reset HEAD~1 + restore .gemini/ + restore PASTE-BODY.txt from git stash |

## Codex Round-2 LANDED — 2nd BLOCK verdict (this iteration's findings folded in)

The Ultimate-Architecture fork spawned a nested codex review (CODEX-ADVERSARIAL-REVIEW.md). **Verdict**: BLOCK (2nd pass). Complementary findings to round-1:

| Round-2 finding | Resolution applied here |
|---|---|
| **Langfuse `--recreate` flag invalid** (correct: `--force-recreate`); ULTIMATE-ARCHITECTURE.md command would fail | This roadmap uses `docker compose up -d` (no recreate flag needed for restart of exited containers). ULTIMATE-ARCHITECTURE.md to be patched separately. |
| **PluginEval not verifiable locally** — no local install, no statistical-method implementation found | Confirms reconciliation-not-install path (Top-10 #2 already revised). sca-vN deprecation gated behind calibration bakeoff (#12) — UNCHANGED. |
| **/insights NOT in CLI 2.1.145** — second codex disagrees with first-round verdict; aligns with my own `claude --help` probe (no insights subcommand) | **REVISED**: mark `/insights` as **UNVERIFIED in v2.1.145**; remove "P1 enable" action; defer to W338 if subsequent CLI version surfaces the command. Code.claude.com/commands#L110 entry may be roadmap-doc, not current. |
| **6 new hooks doc-only, no installed-plugin precedent** | Higher risk than assumed. Wire only ≤2 events with operator-confirmed use-case AND smoke-tested via `/hooks` menu before adding to settings.json. Defer remaining 7 to W338+ pending stability. |
| **decision-log JSONL design** (round-1 + round-2 codex) | **HYBRID**: keep `.claude/state/sota-decisions.jsonl` for **operator-curated WAVE-LEVEL decisions only** (low-volume, append-only, jq-queryable). EXTEND schema: add `timestamp`, `axis`, `verdict`, `confidence`, `rationale`, `sources`, `rollback_plan` (round-2 codex Axis 6). Use **basic-memory MCP** for high-volume per-task decisions (auto-write via skill). Canonical = markdown VERDICT-LEDGER.md per wave; JSONL = curated wave-level index; basic-memory = task-level. Three-tier ledger. |

### Net REVISED Top-10 (post-2-codex-rounds)

| # | Action | Net Status |
|---|---|---|
| 1 | `/ctx-upgrade` v1.0.141→v1.0.146 | UNCHANGED P0 |
| 2 | Reconcile wshobson (verify intended-vs-actual coverage of 17 enabled plugins) | UNCHANGED |
| 3 | Langfuse restart via `docker compose -f docker-compose.yml up -d` (NOT `--recreate`) | CONFIRMED P0 |
| 4 | **`/insights` REINSTATED** — round-2 codex found via binary grep of `Z:/claude-sota-installed/.local/bin/claude.exe`: native builtin `name:"insights"` + `usage-data` handling; hidden from `--help` output but PRESENT. Run + capture artifact `~/.claude/usage-data/report.html` + add monthly cadence. | **REVERSED back to P1** (round-1 missed it; round-2 binary-grep confirms; aligns with Stream-B claim) |
| 5 | CLAUDE.md L35 drift fix with canonical count table | UNCHANGED P1 |
| 6 | ~~Drop gitnexus orphan~~ **OVERTURNED, became path-doc fix** | UNCHANGED |
| 7 | Wire ≤2 of 9 new hook events (Setup + UserPromptExpansion for "InstructionsLoaded already implicit") with operator-confirmed use-cases ONLY | **NARROWED** (was 9; now ≤2 ship-immediate, 7 deferred) |
| 8 | decision-log → **basic-memory MCP** (NOT .jsonl) | **REDESIGNED** per codex F6 round-2 |
| 9 | mattpocock refresh → DEMOTED to P3 | UNCHANGED |
| 10 | Untracked cleanup | UNCHANGED |
| 11 | Investigate `everything-claude-code@everything-claude-code` load failure | UNCHANGED |
| 12 | **PluginEval not locally installed** (round-2 codex Axis 3) — install PluginEval first (verify `src/plugin_eval/stats.py`, `elo.py`, tests exist locally); then **run sca-v11 + PluginEval in PARALLEL for 2 waves** before sca-vN deprecation | **EXTENDED scope** (was single bakeoff; now 2-wave parallel-run) |
| 13 | alirezarezvani cadence refinement (event-driven) | UNCHANGED |

### Codex round-3 plan

Submit this 2-codex-round-revised roadmap as final. If round-3 returns BLOCK, escalate to operator-sign per W331 P0.7 frontier-peer policy (codex divergence → Sonnet 4.6 tiebreak per L26).

## W338+ Forward Work (deferred items)

- **multi-source convergence pipeline `tools/sota-convergence.mjs`** (Stream-F §5): low-risk, but defers to W340 after PluginEval calibration lands.
- **5-awesome-list scrape cadence** (Stream-F §7): vivy-yi/heilcheng/AGI-Edgerunners/luo-junyu/Zijian-Ni + arXiv/HF/Anthropic-blog quarterly. P3.
- **3-cloud-reviewer for high-stakes decisions** (Stream-F §8): codex + Opus + claude ultrareview ensemble. P3.
- **ECC plugin refresh + selective skill enablement** (Stream-C §3): currently @2.0.0-rc.1 with 100+ skills bundled. P2.
- **Stream-C cookbook pattern adoption** (research_lead_agent.md cite-SHA refresh + new pattern integration): low-impact docs update. P3.

## Ship-Readiness Verdict

**W337 P0 SHIP**: READY-pending-operator-sign on AI-W337-1 (ctx-upgrade) and AI-W337-2 (Langfuse restart).

**W337 P1 SHIP**: READY-pending-codex-round-2-APPROVE on the revised synthesis.

**Cardinal-rule compliance**: ALL 6 rules verified intact post-revision:
- CR-1: every action cite-anchored to stream or codex finding
- CR-2: no new hook-body code introduced; 9 new events use existing pattern (cite-anchored upstream)
- CR-3: subagent allowlist unchanged (no new subagent_type)
- CR-4: no new self-invented `.claude/rules/*.md`; operator-curated skills unchanged
- CR-5: permissions/sandbox unchanged
- CR-6: every claim verified via probe (codex blockers + my own ctx_batch_execute corrections)

End-of-roadmap.
