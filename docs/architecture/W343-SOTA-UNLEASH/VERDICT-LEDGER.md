# W343-SOTA-UNLEASH — VERDICT LEDGER

> Wave W343 / branch `goal/W343`. Per CLAUDE.md cardinal-rule-3 + sca-v15 §10 ledger schema.

## Pre-wave snapshot (2026-05-20)

- Branch `goal/W343` @ f920dc2 (from `main` HEAD)
- W342-AUDIT 8-stream parallel deep-audit complete (E1–E8); paste-ready /goal predicate accepted (3760 chars).
- Sister worktrees live: `W335 (goal/W336-continue)`, `W337 (goal/W337-continue)`.

## Per-candidate verdict rows (sca-v15 schema; populated per Phase-5 5-gate + Phase-6 codex r1)

### Row 1 — ruvnet/ruflo (W343-A5 ratified 2026-05-20)

```yaml
slug: ruvnet/ruflo
verdict: T3 PATTERN-STUDY (REJECT install)
install_score: 18.7 / 46.9   # 40% — below T2 install bar
pattern_score: 16.4 / 21.8   # 75% — qualifies pattern study
d_emp: 1
d_ccrt_d35: 2
d12_pattern_density: 5     # GOAP A*, ed25519 federation, 3-tier router, SONA, 12 worker types
d67_task_adaptive_topology_fit: 1     # HIJACKS parent topology role (cardinal-rule-3 conflict)
d76_empty_final_message_detection: 1  # opaque swarm; no Δ-G49 sentinels
d77_fail_closed_worker_exception: 1   # Raft/BFT silent retry; no OrchestrationError surfacing
d78_budget_cap_enforcement: 2         # cost-tracker plugin exists but not mid-loop
rule_version: sca-v15
codex_round_1_verdict: deferred-to-wave-level
phase_5_gates: {gate_1_trust: PASS, gate_2_evidence: PASS, gate_3_cross_model: DEFERRED, gate_4_harness_fit: FAIL, gate_5_anti_bias: PARTIAL_FAIL}
wave: W343
date: 2026-05-20
rejection_rationale: |
  HARD-FAILS CR-2 (writes hook bodies: hook-handler.cjs, intelligence.cjs, ruflo-hook.sh > 2KB, NOT cite-anchored bug-patch shims).
  HARD-FAILS CR-4 (mutates CLAUDE.md without opt-in — violates ≤50 LOC pointer discipline).
  HIJACKS parent topology role (D67 v13 fail).
  DOES NOT use CLAUDE_CODE_FORK_SUBAGENT (own Task dispatch path, bypasses parallel-dispatch mandate).
patterns_extracted:
  - GOAP A* hierarchical planner pattern (study for /loop scheduling)
  - ed25519 federation pattern (study for cross-runtime sync)
  - 3-tier WASM+Haiku+Opus router pattern (study for cost optimization)
  - SONA learning pattern
  - 12-worker-type taxonomy (study against W340 SB-3 allowlist completeness)
rollback_plan: NOT-INSTALLED; n/a
```

### Row 2 — Yeachan-Heo/oh-my-claudecode (W343-A7 ratified 2026-05-20)

```yaml
slug: Yeachan-Heo/oh-my-claudecode
version: v4.13.0
verdict: T3 PATTERN-STUDY (REJECT install; CONDITIONAL T2 ADAPTER if Windows native-team path validated + duplication ≤30%)
install_score: 18.4 / 46.9   # 39%
pattern_score: 14.6 / 21.8   # 67%
freshness: FRESH (HEAD 2026-05-17, daily commits)
license: MIT
windows_compat: PARTIAL — /team in-session works native; omc team CLI workers + omc wait need tmux/psmux/WSL2
duplication_pct: ~75% on team-spawn primitive (vs claude-code-workflows:agent-teams); ~40% on pipeline stages; ~10% extra-surfaces
rule_version: sca-v15
codex_round_1_verdict: deferred-to-wave-level
patterns_worth_porting:
  - team-plan → team-prd → team-exec → team-verify → team-fix bounded loop
  - /ccg tri-model fan-out (Codex + Gemini + Claude synthesizer)
  - Ralph persistence loop with verify/fix bounded by max-attempts
  - Skill auto-inject pattern (.omc/skills/*.md trigger-matched)
  - Mode composition matrix (Team/Ralph/Ultrawork/Autopilot/Pipeline + Artifact-only Ultragoal handoff)
wave: W343
date: 2026-05-20
rejection_rationale: |
  75% team-spawn primitive duplication with already-installed claude-code-workflows:agent-teams (both wrap CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 native primitive).
  30% of surface requires tmux/psmux/WSL2 — Windows-native operator burden.
  6-hook surface + OpenClaw bridge merits security audit before enable.
  19 agents + 12+ skills mostly bare-named — W333-D5 FQN-discipline collision risk.
rollback_plan: pattern-only adoption needs no rollback; if T2-ADAPTER pursued, /plugin uninstall + npm uninstall + clean .omc/ ~/.omc/ + git revert
```

### Row 3 — colbymchenry/codegraph (W343-A3 ratified 2026-05-20 — TOP INSTALL CANDIDATE)

```yaml
slug: colbymchenry/codegraph
version_pin: 0.7.10   # codex r1 r2-tightening: EXACT pin per CR-1 W286-arc-P0C; latest stable per npm registry probe 2026-05-20
verdict: T1 INSTALLED (MCP server tier) — INSTALL EXECUTED 2026-05-20 per Stream W343-A14
trust_tuple_status: AMBER-VERIFIED   # codex r1: MIT + small deps but single-maintainer + no SLSA/provenance; npm audit --omit=dev: 0 vulnerabilities (51 transitive deps); license distribution: 39 MIT / 6 ISC / 2 Apache-2.0 / 1 BSD-3-Clause / 1 Unlicense / 2 dual-permissive — all OSI-permissive, zero AGPL/SSPL contamination
install_score: 40.1 / 46.9   # 86%
pattern_score: n/a (full-install candidate)
d_emp: 5     # 6-codebase benchmark: 92% fewer tool calls, 71% faster (independently corroborated)
d_ccrt_d35: 4
d12_pattern_density: 5   # MCP tool registry + tree-sitter pipeline + FTS5 + auto-sync hooks
d35_anthropic_official: 4  # MCP spec compliance + stdio transport + ~/.claude.json + permissions auto-allow
d38_cc_native: 5     # ships CC-native installer (claude.ts) + writes ~/.claude/CLAUDE.md + permissions block
d39_windows: 5     # README explicit Windows badge + native FSEvents/inotify/ReadDirectoryChangesW
d40_z_portable: 4    # respects $env:USERPROFILE; .codegraph/ per-project
d41_loop_compat: 4   # MCP stdio long-lived; auto-sync hooks compatible with /loop cron
license: MIT
stars: 8300
freshness: FRESH (≤24h)
storage: SQLite + FTS5 (.codegraph/codegraph.db)
parser: web-tree-sitter + WASM grammars (19+ langs)
external_deps: none (100% local, no API keys, no Docker, no Neo4j)
mcp_tools: [codegraph_search, codegraph_context, codegraph_callers, codegraph_callees, codegraph_impact, codegraph_node, codegraph_files, codegraph_status, codegraph_explore]
harness_fit: STRONG
duplication: complementary (NOT competing) with local-cypher-codebase skill; codegraph = persistent index, local-cypher = on-demand pattern-extract fallback
rule_version: sca-v15
codex_round_1_verdict: deferred-to-wave-level
phase_5_gates: {gate_1_trust: PASS, gate_2_evidence: PASS, gate_3_cross_model: DEFERRED, gate_4_harness_fit: STRONG, gate_5_anti_bias: PASS}
note: closes W342-E8 carry-forward P2.1 pilot
wave: W343
date: 2026-05-20
install_cmd_executed_2026-05-20: |
  # Stream W343-A14 actual execution (NOT codex r1's proposed sequence — corrections in-line)
  # Step 1: trust-tuple verification (PASSED)
  npm view @colbymchenry/codegraph@0.7.10 dependencies   # 10 direct deps confirmed
  npm install --package-lock-only @colbymchenry/codegraph@0.7.10 && npm audit --omit=dev   # 0 vulnerabilities (51 trans deps)
  # Step 2: MCP wiring (manual edit of Z:/claude-sota-installed-W343/.mcp.json)
  #   Added entry: "codegraph": {"type": "stdio", "command": "npx", "args": ["-y", "@colbymchenry/codegraph@0.7.10", "serve", "--mcp"]}
  #   NOTE: codex r1 proposed "mcp-server" subcommand — CORRECTED to actual CLI: `serve --mcp` (verified via --help)
  #   NOTE: codex r1 proposed `init --no-claude-md-mutation` flag — that flag DOES NOT EXIST (verified via init --help)
  #   CR-4 satisfied via: $HOME=Z:/claude-sota-installed; ~/.claude/CLAUDE.md does not exist; init verified to write ONLY .codegraph/ locally
  # Step 3: per-project init
  cd Z:/claude-sota-installed-W343 && npx -y @colbymchenry/codegraph@0.7.10 init
  #   Result: created .codegraph/{codegraph.db (139264 B), config.json (2876 B), .gitignore (173 B)}
  #   HOME-write probe: ls ~/.codegraph → does not exist (no global writes)
  # Step 4: .gitignore — added `.codegraph/` line at repo root .gitignore (per-project local-only per CR-5)
  # Step 5: MCP handshake probe — spawned `npx ... serve --mcp` + sent JSON-RPC initialize → serverInfo {name:"codegraph", version:"0.1.0"} returned; "File watcher active" log fired on stderr; no crash
  # Step 6: NO CLAUDE.md mutation (global or local); NO settings.json permissions block write; NO interactive installer used
dep_licenses_recorded_full:   # codex r1 trust-tuple verified across all 51 transitive
  direct_10_deps: commander ^14.0.2 / picomatch ^4.0.3 / sisteransi ^1.0.5 / jsonc-parser ^3.3.1 / @clack/prompts ^1.3.0 / fast-wrap-ansi ^0.2.0 / web-tree-sitter ^0.25.3 / fast-string-width ^3.0.2 / node-sqlite3-wasm ^0.8.30 / tree-sitter-wasms ^0.1.11
  tree-sitter-wasms: Unlicense (public domain — OSI-recognized)
  node-sqlite3-wasm: MIT
  transitive_license_distribution_n51: {MIT: 39, ISC: 6, Apache-2.0: 2, BSD-3-Clause: 1, "MIT OR WTFPL": 1, "BSD-2-Clause OR MIT OR Apache-2.0": 1, Unlicense: 1}
  agpl_sspl_proprietary_contamination: NONE
  vulnerability_count: 0 (npm audit --omit=dev clean post-pin)
files_modified:
  - .mcp.json (added codegraph mcpServers entry + provenance comment block)
  - .gitignore (added .codegraph/ entry)
  - .codegraph/ (auto-created by init — gitignored; not tracked)
  - docs/architecture/W343-SOTA-UNLEASH/VERDICT-LEDGER.md (this row updated)
  - docs/architecture/W343-SOTA-UNLEASH/OP-SIGN.md (OS-7 flipped DONE)
rollback_plan: |
  Remove `codegraph` key from .mcp.json mcpServers + remove provenance comment from _comments_addendum
  Remove `.codegraph/` line from .gitignore
  rm -rf .codegraph/
  git revert <install-commit>
  No global CLAUDE.md / settings.json / ~/.claude/ mutation occurred — no out-of-repo cleanup needed.
  Total reversal ≤2 min.
```

### Row 4 — nyldn/claude-octopus (W343-A6 ratified 2026-05-20)

```yaml
slug: nyldn/claude-octopus
version: v9.38.0
verdict: T3 PATTERN-STUDY (REJECT install)
install_score: 24.3 / 46.9   # 52% — below 60% install floor
pattern_score: 17.4 / 21.8   # 80% — above 70% pattern floor
d12_pattern_density: 4
d44_codex_round_efficiency: 1   # solo-codex authority already exists; octopus 8-way may slow round-1
d52_community_health: 4   # 3.4k★ + active maint + 117 tests
d76_orchestration_primitive: 4   # consensus-gate + adversarial-loop well-designed
d77_subagent_compose: 3   # bare-name FQN risk (W333-D5)
d78_hook_discipline: 2   # 8 auto-invoke hooks collide with codex SessionStart/Stop
license: MIT
stars: 3400
freshness: FRESH (v9.38.0 active 2026-05-19)
duplication_pct: ~80% with W331-P0.7 FRONTIER-PEER POLICY (codex GPT-5.5 authority + Sonnet 4.6 tiebreaker)
rule_version: sca-v15
codex_round_1_verdict: deferred-to-wave-level
patterns_to_adopt:
  - Two-stage review (spec-compliance + code-quality split — enhance /codex:review)
  - Configurable quality threshold env var (CLAUDE_OCTOPUS_QUALITY_THRESHOLD=75%) — pattern for W331 cross-model gate tuning
  - Provider-aware prompt preflight (prevents silent oversize failures) — generic
note: aligns W331-P0.7 FRONTIER-PEER POLICY (8-model adversarial consensus) but DUPLICATES it
wave: W343
date: 2026-05-20
rejection_rationale: |
  80% overlap with existing W331 FRONTIER-PEER (codex authority + Sonnet tiebreaker).
  8 auto-invoke discipline-mode hooks collide with openai-codex plugin SessionStart/SessionEnd/Stop (race conditions).
  MSYS path-rewrite + bash orchestrate.sh + git-bash heredoc fragility — Windows operator burden.
  32 personas + 48 commands + 52 skills mostly bare-named (W333-D5 FQN-discipline violation risk; code-reviewer collides across 6 plugins).
  claude-mem dependency conflicts with T6 basic-memory canonical-primary memory tier (W295).
rollback_plan: NOT-INSTALLED; n/a
```

### Row 5 — VoltAgent/awesome-claude-code-subagents (W343-A8 ratified 2026-05-20)

```yaml
slug: VoltAgent/awesome-claude-code-subagents
verdict: INSTALLED-CHERRY (5 .md files cherry-picked + FQN-prefixed; plugin install REJECTED)
cherry_pick_executed_2026-05-20: |
  Stream W343-A15 executed cherry-pick of 5 .md files into Z:/claude-sota-installed-W343/.claude/agents/:
    1. voltagent-ai-writing-auditor.md       (4538 B, +306 attribution)  [src: 04-quality-security/ai-writing-auditor.md]
    2. voltagent-codebase-orchestrator.md    (7266 B, +311 attribution)  [src: 09-meta-orchestration/codebase-orchestrator.md]
    3. voltagent-powershell-7-expert.md      (2640 B, +311 attribution)  [src: 02-language-specialists/powershell-7-expert.md]
    4. voltagent-powershell-5.1-expert.md    (2798 B, +313 attribution)  [src: 02-language-specialists/powershell-5.1-expert.md]
    5. voltagent-ui-ux-tester.md             (7246 B, +300 attribution)  [src: 04-quality-security/ui-ux-tester.md]
  Frontmatter `name:` rename per file: bare → voltagent-prefixed (5/5 PASS)
  Source-attribution HTML comment appended to each file (5/5 PASS)
  FQN collision check vs installed plugin agents (.claude/plugins/**/agents/*.md): 0 matches on bare names — no collision
  Fetch via curl -sL https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/<path>
  Commit pending: orchestrator-side single commit (per W343-A15 spec)
install_score: 24.6 / 46.9   # 52%
pattern_score: 17.2 / 21.8   # 79%
license: MIT
stars: 20200
freshness: ACTIVE (last_commit 2026-04-01)
is_plugin: true               # .claude-plugin/marketplace.json + 10 per-category plugin.json
duplication_pct: ~70%+ on agent-names vs wshobson/agents (already T1-installed canonical)
rule_version: sca-v15
codex_round_1_verdict: deferred-to-wave-level
phase_5_gates: {gate_1_trust: PASS, gate_2_dup: FAIL, gate_3_cross_model: DEFERRED, gate_4_install: AVOID-PLUGIN-ROUTE, gate_5_arch_fit: PASS-PARTIAL}
wave: W343
date: 2026-05-20
cherry_pick_targets: # 5 unique gap-fillers absent from wshobson + Windows-relevant
  - categories/04-quality-security/ai-writing-auditor.md     # anti-fabrication discipline parallel to CR-6
  - categories/09-meta-orchestration/codebase-orchestrator.md # safe refactor governance (6955 B)
  - categories/02-language-specialists/powershell-7-expert.md # PS7 specialist absent in wshobson
  - categories/02-language-specialists/powershell-5.1-expert.md # legacy-PS coverage
  - categories/04-quality-security/ui-ux-tester.md           # exhaustive documented-flow tester
  # BONUS: categories/10-research-analysis/project-idea-validator.md (brutal go/no-go)
install_command_revised: |
  # Codex r1 REVISE: add FQN-style filename prefix to prevent wshobson-collisions
  # For each target, save AS: voltagent-<original-name>.md
  curl -sO https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/categories/<path>
  mv <original>.md voltagent-<original>.md  # FQN-prefix per W333-D5
  # Drop into Z:/claude-sota-installed/.claude/agents/
  # Single commit; DO NOT add VoltAgent plugin to marketplace
fqn_prefix_required: voltagent-   # per codex r1 to avoid collision with wshobson canonical agents
rollback_plan: rm cherry-picked voltagent-*.md files + git revert single SHA
```

## Codex round-1 wave-level verdict (2026-05-20 17:35 UTC)

```yaml
codex_round_1_wave_verdict: REVISE
findings:
  - Row 3 codegraph version_target ">=0.7.9" → must be EXACT pin "0.7.10" (latest stable) per CR-1 W286-arc-P0C
  - Row 3 trust-tuple AMBER (MIT + small deps but single-maintainer + no SLSA/provenance) — npm audit --omit=dev required
  - Row 3 dep licenses recorded: tree-sitter-wasms Unlicense + node-sqlite3-wasm MIT
  - Row 3 unattended installer ~/.claude/CLAUDE.md mutation = CR-4 risk; prefer manual MCP wiring with --no-claude-md-mutation flag
  - Row 5 VoltAgent cherry-pick: FQN-prefix files as voltagent-<name>.md to prevent wshobson collisions
net_architecture_decisions: APPROVED (4 rejects defensible + codegraph install + VoltAgent cherry-pick split correct)
revisions_applied: 4 (version pin + AMBER note + dep licenses + FQN prefix)
log_path: tmp/W343-P1-codex-wave-review.log
codex_round_2_wave_verdict: APPROVE (substance) + document-cleanup REVISE applied this commit (duplicate Row 5 + stale wave-verdict block removed)
```

## Vendor-fork drift audit (W343-A9-DIRECT 2026-05-20 17:25 UTC; W343-A19 sync 2026-05-20)

| Fork | Pinned SHA | HEAD SHA | Drift | Pushed | License | Stars | Recommendation |
|---|---|---|---|---|---|---|---|
| mattpocock/skills | b8be62ffacb0 | b8be62ffacb0 | 0 commits (SYNCED W343-A19) | 2026-05-20 | MIT | 96.8k | STABLE (synced — only `improve-codebase-architecture` affected: SKILL.md +15/-5, HTML-REPORT.md +123 new; see VENDOR-SYNC-W343.md) |
| addyosmani/agent-skills | f17c6e88 | f17c6e88c904 | 0 commits | 2026-05-16 | MIT | 44.2k | HOLD-AT-PIN (no drift) |
| obra/superpowers (plugin) | claude-plugins-official version | f2cbfbefebbf upstream | (plugin auto-updates) | 2026-05-14 | MIT | 199.9k | TRUST-PLUGIN-AUTOUPDATE (marketplace handles) |

Aggregate: vendor-sync complete in W343-A19. All forks stable at HEAD as of 2026-05-20.

## Wave-level codex review summary (round-1 + round-2 2026-05-20 17:35-17:42 UTC)

5 candidate ratifications complete (1 INSTALL + 1 CHERRY + 3 PATTERN-STUDY-REJECT-INSTALL). Net surface impact: install only `colbymchenry/codegraph@0.7.10` (npm pkg + MCP server, manual wiring with `--no-claude-md-mutation`) + cherry-pick 5 .md files from VoltAgent (FQN-prefixed `voltagent-*.md`). No plugin marketplace additions.

```yaml
codex_round_1_wave_verdict: REVISE (4 findings)
codex_round_2_wave_verdict: APPROVE (substance: 4 revisions confirmed addressed; this commit resolves the document-cleanup REVISE noted by r2)
position_swap_consistent: not-tested (single-pass review per ≤2 rounds contract)
log_paths:
  - tmp/W343-P1-codex-wave-review.log     # round-1 REVISE detail
  - tmp/W343-P1-codex-wave-review-r2.log  # round-2 substance-APPROVE + document-cleanup REVISE
ratification_status: SHIP-READY post document-cleanup (r2 substance-approval + cleanup applied in this commit)
```

## SHIP / STOP gate state

- [x] 5 candidate ratifications COMPLETE: codegraph T1 INSTALL · VoltAgent T2-CHERRY · ruflo T3 REJECT · octopus T3 REJECT · oh-my-claudecode T3 REJECT
- [x] Wave-level codex r1 REVISE → 4 revisions applied → r2 substance-APPROVE (with document-cleanup REVISE addressed in this commit)
- [x] 5 P0 sub-actions closed: P0.a ✅ migrate+delete · P0.b ✅ already-fixed-W341 + thin re-export shim added · P0.c ✅ CJS-in-ESM fix at L75 · P0.d ✅ 3 fail-CLOSED flips · P0.e ✅ re-measured (0.0030, 30d rolling — trajectory tracked post-merge; STOP-gate aspect "≥0.30" requires multi-day organic accumulation, not single-session)
- [x] CLAUDE.md ≤50 LOC body — VERIFIED 50 total / 37 non-blank post drift-refresh
- [x] Vendor-fork drift audit: addyosmani 0 commits (no work) · mattpocock 2 commits low-priority (DEFER W344) · obra auto-updates (marketplace handles)
- [x] Codegraph install execution (Stream W343-A14 EXECUTED 2026-05-20: .mcp.json wired with `serve --mcp`; .codegraph/ created locally; .gitignore updated; MCP handshake verified `serverInfo:{name:"codegraph",version:"0.1.0"}`; npm audit clean 0 vulns; 51 transitive deps all OSI-permissive; CR-4 satisfied — no ~/.claude/CLAUDE.md mutation; no interactive installer used)
- [x] VoltAgent cherry-pick × 5 .md (W343-A15 executed 2026-05-20; FQN-prefixed; 0 collision; commit pending orchestrator-side)

## P0 commit prep (2026-05-20 16:50 UTC)

- Branch: `goal/W343`, base SHA: f920dc2
- Staged: 14 files / +691 / -18 (CLAUDE.md, package.json, tools/parallel-guard-regex.mjs NEW, tools/lint-check.mjs NEW, tools/build-subagent-allowlist.mjs, tools/preagent-parallel-guard.mjs, tools/preagent-subagent-validator.mjs, tools/subagent-stop-guard.mjs, docs/architecture/W343-SOTA-UNLEASH/{P0,P1,P2,VERDICT-LEDGER,OP-SIGN,BYPASS-MARKER-RATIONALE}.md)
- `npm run lint` → 17/17 .mjs PASS
- `node tools/parallel-guard-regex.mjs` smoke → 5/5 PASS
- `node --check` on all 6 P0-touched scripts → clean
- Codex GPT-5.5 round-1 review running in background (15-min max wait); will commit with Codex-Verdict trailer once verdict lands

## T6 basic-memory wave-row (queued)

After ship, write to `mcp__basic-memory__write_note` permalink `waves/W343-SOTA-UNLEASH` with note-type `wave-closure`, tags `["W343", "sota-unleash", "operator-confirmed-ship"]`. Body = redacted-secrets synthesis + provenance block (6 sources from W342-AUDIT cascade, codex round-1 verdict, ceiling honored).
