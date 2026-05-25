

## 2026-05-09 Wave 112 Ship 2AA: GitNexus MCP wire (CR-9 sibling-bleed closure; PolyForm Noncommercial DOWNGRADE-WITH-DISCLOSURE)

**Origin**: operator URL `https://github.com/abhigyanpatwari/GitNexus` 2026-05-09 (after Wave 112 Ship A1 commit `f29c973` 5-CLI batch). Closes Ship 2AA-followup queued in Ship A1.

**CR-9 sibling-bleed closure**: 9 inherited rules (canonical/citation-discipline/codex-t1-auto-wedge-recovery/codex-t1-fix-forward-pattern/codex-t1-system-meta-review-fallback/layered-gates-architecture .md) reference `gitnexus_pre_edit_impact_guard.py` + `mcp__gitnexus__detect_changes/impact/context` — but ZERO eee install pre-this-ship. Per cardinal-rule-9 sibling-bleed defense + cardinal-rule-12 PRIMARY upstream-install: install via npm registry official channel.

**Installed**:
- Command: `npm install -g gitnexus@1.6.3` (CR-9 version-pinned)
- Binary: `/c/Users/42/AppData/Roaming/npm/gitnexus`
- Smoke probe: `gitnexus --version` → `1.6.3` PASS
- CLI commands available: setup / analyze / index / serve / mcp / list / status / clean / remove / wiki / augment / query / context / impact / cypher / detect-changes / eval-server / group

**Wired in `.mcp.json`** (Wave 112 Ship 2AA commit `eecc2da`): gitnexus stdio MCP entry `{command:"gitnexus", args:["mcp"]}`. Total MCP servers post-wire: 12 (was 11 — phoenix added by parallel session post Wave 109 OTel ship).

**License DOWNGRADE-WITH-DISCLOSURE per SRA D1 use-class lattice**:
- License: PolyForm Noncommercial 1.0.0 (`Z:/repos/deps/gitnexus/LICENSE @ HEAD 55d5042`)
- eee runtime use: ACCEPTABLE (local autonomous /loop runtime; NOT SaaS, NOT commercial product distribution)
- Operator MUST not redistribute commercially without commercial license from `akonlabs.com`
- Consistent with FalkorDB SSPLv1 + context-mode ELv2 prior verdicts (per Wave 102 Ship 2T-correction reclassifications)
- Maintainer: abhigyanpatwari (TIER-4-NAMED-INDIVIDUAL — bus-factor risk disclosed)

**SRA D1-D10 scoring** (orchestrator-side; codex T1 deferred Pattern B HNF):
- D1 license-use-class: ⚠️ CONDITIONAL (PolyForm Noncommercial — OK for local-runtime; NOT SaaS-distributed)
- D2 freshness: ✅ PASS (last commit 2026-05-02 = 7 days ago)
- D3 star-velocity: ✅ no fresh-paint signal (mature multi-year repo)
- D4 maintainer-provenance: ⚠️ TIER-4-NAMED-INDIVIDUAL (bus-factor disclosed)
- D5 active-maintenance: ✅ PASS (gitnexus-claude-plugin subdir last commit 2026-04-30 per codex T1 trace mining)
- D6 use-class compatibility: ✅ PASS (autonomous /loop runtime + MCP-native + multi-AI-tool support)
- D7 Anthropic-aligned: ✅ PASS (explicit Claude Code MCP integration via `gitnexus setup` auto-config)
- D8 industry adoption: ✅ PASS ≥3 distinct orgs (Cursor + Claude Code + Codex + Windsurf + OpenCode in README)
- D9 failure-mode awareness: ⚠️ scam-token warning in README — NOT impostor-domain anti-pattern per `Z:/claude-sota-installed/.claude/rules/convergence-gate.md §Even-shorter-path` (that rule fires on impostor-DOMAINS-distributing-malware NOT crypto-token-impersonation; auto-REJECT does NOT apply)
- D10 N/A (not a replacement)

Composite: 7-8/10 + critical D1 CONDITIONAL + D6 PASS → **DOWNGRADE-WITH-DISCLOSURE** per SRA convergence verdict tier.

**CR-3 Phase 1 bootstrap exception**: codex T1 deep-review-exec foreground+tee fired BEFORE this commit (240s budget per FM-17.d defense; output at `.claude/state/codex_consult_wave112_ship2aa_gitnexus_install_OUT.txt` 2403 LOC). Result: timeout exit=124 → **Pattern B HONEST-NON-FINDING** per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern B. codex was actively investigating: SRA D2 5-band table + GitNexus README community-integrations + gitnexus-claude-plugin git-log. Trace-mined embedded evidence:
- gitnexus-claude-plugin actively maintained: last commit 2026-04-30 `fix(hook): resolve canonical repo root + guard read-only FTS ensure (#1226)`
- Community integrations confirmed: pi-gitnexus + gitnexus-stable-ops (small adopter ecosystem)
- Scam-alert anti-pattern check: orchestrator-side disposition — convergence-gate.md §Even-shorter-path REJECT does NOT apply (different mechanism: impostor-DOMAIN vs crypto-TOKEN)

T2 commit-time hook (`codex_t2_pre_commit_gate.py`) IS the cross-model verification net per cardinal-rule-3 Phase 1 bootstrap exception. Same disposition pattern as Wave 109 closure + Wave 112 Ship A1 commit `f29c973`.

**CR conformance**: CR-1 ✅ TIER-1 cites preserved + CR-3 ⚠️ Phase 1 bootstrap exception (Pattern B HNF) + CR-5 ✅ official native channel (npm) + CR-6 ✅ fresh-from-github @1.6.3 + CR-7 ✅ Phase 3 + CR-8 ✅ ADAPTED-FROM-SOTA + CR-9 ⚠️ MEDIUM (license + bus-factor disclosed) + CR-10 ✅ research-first (probed install + license + git history BEFORE install) + CR-11 ✅ META-process (Mia pre-apply + Pattern B HNF + SRA D1-D10 + DOWNGRADE-WITH-DISCLOSURE per convergence-gate verdict tier) + CR-12 ✅ PRIMARY upstream-install.

**What this unlocks**:
- `mcp__gitnexus__impact`: blast radius analysis on Edit/Write
- `mcp__gitnexus__detect_changes`: git diff → symbol map
- `mcp__gitnexus__context`: 360-degree symbol view (callers/callees/processes)
- `gitnexus_pre_edit_impact_guard.py` hook (cite-imported from sibling) can now resolve to actual gitnexus binary on PATH — closes 9 sibling-bleed references
- `gitnexus analyze` for repo indexing into knowledge graph (LadybugDB native + tree-sitter parsing)

**Operator action suggested**: Run `gitnexus analyze .` in eee runtime to index claude-sota-installed itself; mcp__gitnexus__impact + detect_changes return real symbols only after indexing. Index data persists in `.gitnexus/` subdir (gitignored).

**FM-02 sub-class (c) cwc bundled-drift n=8+ same-arc**: this provenance commit lands narrowly via `git commit --only -- docs/install-provenance.md`. Wave 112 Ship 2AA wire commit `eecc2da` already landed atomically per `parallel-session-worktree-isolation.md §FM-02(b/c)` defense.

**Outstanding queue (post Wave 112 Ship 2AA)**:
- 🆕 Ship 2BB-followup D4Vinci/Scrapling SRA D1-D10 (operator URL 2026-05-09 — still queued)
- 🆕 FM-17.e n=4 catalog→OWNED rule promotion (per cycle-322 + Wave 112 Ship A1 catch)
- 🆕 Ship 2AA-followup-2: `gitnexus analyze .` to bootstrap eee knowledge graph (operator action OR cron-fire)
- 🆕 Ship A2-version-pin: pin 5 newly-installed CLIs from Ship A1 to captured versions per CR-9
- 🚧 Ship M-fleet-mgmt-key: CPA :8317 management-key env config (operator action; gates live fleet introspection)
- 🚧 Ship 2N-batch3-G skillOverrides: 24h+ Phoenix telemetry data accumulation
- 🚧 Ship 2W reframed: container wire-or-disclose-non-consumption per Wave 110 parallel-agent-G finding
- 🚧 Ship 2A-pilot rtk vs snip: operator decision DEFERRED
- 🚧 Ship 2Y-stage2 cite-anchor migration: 212 CCBP + 20 codex SHA bumps

**Wave 112 Ship 2AA closure note**: 39th commit in this session arc (post Wave 112 Ship A1 37th + Ship 2AA wire 38th + this provenance closure 39th). Cron `ae540201` armed `7,22,37,52 * * * *` for autonomous /loop continuation. GitNexus install + MCP wire complete; CR-9 sibling-bleed gap closed for the 9 cite-imported rules.
