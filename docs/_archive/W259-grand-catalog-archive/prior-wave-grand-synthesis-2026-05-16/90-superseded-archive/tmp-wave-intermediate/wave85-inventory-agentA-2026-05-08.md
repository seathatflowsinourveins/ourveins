# Wave 85 Agent A — Full Repo Inventory (76 primitives)

**Probe**: 2026-05-08 12:00 UTC | sota-researcher | 36 tools / 302s

## §1 Plugin Marketplaces (14 registered, 7 enabled)

**ENABLED (7)**: superpowers + codex + everything-claude-code + pyright-lsp + agent-sdk-dev + ralph-loop + frontend-design

**INSTALLED-UNWIRED (7)**: skills + knowledge-work-plugins + claude-plugins-community + financial-services + healthcare + life-sciences + addy-agent-skills

**DUPLICATES (3)**: `agent-skills` (overlaps addy-agent-skills) + `anthropic-agent-skills` (overlaps skills) + `claude-for-financial-services` (overlaps financial-services) — cleanup-actionable

**EMPTY (1)**: `claude-community` (only LICENSE+README)

## §2 Binaries (`.local/bin/`, 12 inc sidecars)

**WIRED (4)**: claude.exe + cli-proxy-api.exe + cpa-usage-keeper.exe + rtk.exe (PATH only, init pending)

**INSTALLED-UNWIRED (5 Section 5 tools, DEFERRED to hook wire)**: osv-scanner + semgrep+pysemgrep + trufflehog + typos + vale (Wave 62 fire 6 install)

**TRUE ORPHANS (3 cleanup-actionable)**: ant.exe + markitdown.exe + trivy.exe (no consumer/manifest entry)

## §3 MCP Servers (7, ALL WIRED)
github + context7 + deepwiki + playwright + serena + context-mode + memory

## §4 Hook Scripts (15 Python + 4 CWC bash + 2 plugin-delivered)

**WIRED (10 Python)**: agent_spawn_gate, auto_proceed_gate, block_no_verify, codex_postcommit_review, codex_prepush_review, codex_t1_consult_gate, codex_t2_pre_commit_gate, codex_t5_plan_review_gate, secret_scan_guard, subagent_stop_telemetry (Ship 1G)

**WIRED (4 CWC bash)**: kill-switch + steer + track-read + verify-gate

**WIRED (2 plugin-delivered)**: stop-review-gate-hook.mjs + session-lifecycle-hook.mjs

**DORMANT (2 Section 13)**: agent_plan_readonly_bash_guard + safety_guard (CR-7 Phase 2 gated)

**DISABLED (1)**: fm17d_stall_detector (FM17_STALL_DETECTOR_DISABLE=1 — schema-rot pending fix)

**PENDING (1)**: codex_review_queue (Path C orchestration layer)

**LEGACY (1 cleanup)**: codex_gate.py (no settings.json registration)

**HELPERS (4)**: _codex_plugin_root, _guard_base, _observation_writer, utils

## §5 Other Primitives

- **cpa-usage-keeper sidecar**: WIRED via T0.9 (Ship 1B+1C)
- **OAuth fleet (10 files)**: WIRED via cli-proxy-api
- **CWC long-running-agents** (.local/cwc/): 5 install-class primitives + 4 bash hooks (Wave 6/62 native install from anthropics/cwc-long-running-agents @ ffd563d6)
- **Local agents (8)**: architect / code-reviewer / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / sota-researcher / verifier — all WIRED (Agent tool subagent_type)
- **Local rules (35)**: ALL WIRED via global system prompt
- **Local skills (1 dir)**: superseded by plugin install

## §7 SUMMARY

**76 primitives inventoried**:
- INSTALLED-WIRED (active): ~52
- INSTALLED-UNWIRED orphans: ~15 (3 true binary orphans + 3 marketplace duplicates + 1 legacy hook + 7 unwired-discovery marketplaces + ant/markitdown/trivy)
- INSTALLED-DEFERRED ship-pending: ~9 (5 Section 5 quality tools + 2 dormant Section 13 hooks + 1 disabled fm17d + 1 pending codex_review_queue)
- CITED-only (no install): 35+ rules + cardinal-rule cites

**Cleanup-actionable**: 7 items
- 3 true binary orphans: ant.exe / markitdown.exe / trivy.exe
- 3 marketplace duplicates: agent-skills / anthropic-agent-skills / claude-for-financial-services
- 1 legacy hook: codex_gate.py

**Operator decisions queued**:
- (a) Section 5 quality-tool hook wire ship (5 binaries on PATH; consumer hook queued)
- (b) CR-7 Phase 2 trigger via Section 13 dormant-hook activation
- (c) fm17d schema-rot fix or removal
- (d) Cleanup 3 binary orphans + 3 marketplace duplicates

**Wave provenance**: Wave 50 (foundation) + Wave 62 (cwc + quality tools) + Wave 75-79 (kits-convergence + token-opt) + Wave 82 (mega-batch marketplace) + Wave 84 (telemetry).

## HANDOFF
verdict_one_line: 76 primitives total / ~52 WIRED-active / ~15 UNWIRED (7 cleanup-actionable) / ~9 DEFERRED-ship-pending; operator decisions queued for Section 5 hook wire + Section 13 dormant activation + fm17d fix + 7-item cleanup.
