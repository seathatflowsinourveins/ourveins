# W325 Stream B — Multi-Repo Line-by-Line Audit (10 anchors + 2 bonus)

**Wave**: W325 deep-audit · **Stream**: B (multi-repo ingest) · **Date**: 2026-05-19 · **Methodology**: deepwiki + WebFetch + `gh api` + local cache reads + perplexity cross-corroborate (NO `repomix-pack` per W321 silent-fallback root-cause) · **Budget**: ≤500 words tabular + bullets · **Author**: subagent of W325 8-agent fan-out · **Status**: SHIPPED-AUDIT-ONLY (no ledger rows; W325 closure-synthesis aggregates).

---

## §1 — SHA-DRIFT Table (full-40-char verification)

| # | Repo | Runtime-cited SHA | Current HEAD SHA | HEAD-date | ahead | Drift class | Cite source |
|---|------|---|---|---|---|---|---|
| 1 | `anthropics/claude-agent-sdk-typescript` | `e62865e4` (W324) | `e62865e42fd02ef5d4d3b59e85c2624514841c07` | 2026-05-19 | 0 | **MATCH** | CLAUDE.md W324 |
| 2 | `anthropics/anthropic-sdk-python` | `28cdc336` (W324) | `28cdc33644bfb3f8310d51867619cafb5dd8cf23` | 2026-05-19 | 0 | **MATCH** | release 0.103.1 |
| 3 | `anthropics/skills` | `690f15ca` (W324) | `690f15cac7f7b4c055c5ab109c79ed9259934081` | 2026-05-19 | 0 | **MATCH** | CMA PR #1164 |
| 4 | `anthropics/anthropic-cookbook` (legacy) | "latest" (W324) | `2eed173a533a690eb70ab324614ce5350776a23a` | 2026-05-19 | 0 | **MATCH** | identical to claude-cookbooks |
| 5 | `wshobson/agents` | `08ded5e7` (W324) | `08ded5e7b0fe57e7f40194775885eba539c3d8e7` | 2026-05-17 | 0 | **MATCH; W319 pivot-to-`ece811f2` FALSIFIED** | `ece811f2` is older (2026-05-02) and NOT on the wshobson main-branch lineage going to HEAD |
| 6 | `addyosmani/agent-skills` | `f17c6e88` (W316) | `f17c6e88c904dc747381c374312c2d58e10647ae` | 2026-05-16 | 0 | **MATCH** | tag v0.6.0 |
| 7 | `mattpocock/skills` | `67bce91c` (W319) | `d54c497aa94400a496d3f2c38be10fa5f284c5a9` | 2026-05-19 | 4 | **BENIGN-MATERIAL** | redaction-info + CONTEXT.md template trim + handoff wording |
| 8 | `mksglu/context-mode` | `1.0.141` (W315-r2) | `898ecc9f2a1451e9d1f949772def3e6c34447e50` (v1.0.141 tag = `78c9adf0`) | 2026-05-19 | 2 | **BENIGN** | both post-tag commits are CI bundle rebuilds |
| 9 | `OthmanAdi/planning-with-files` | `d27008f3` (W324) | `d27008f369a5c58f315ce74194ff1c21b9a0eedc` | 2026-05-16 | 0 | **MATCH** | v2.38.1 |
| 10 | `abhigyanpatwari/GitNexus` | `803f0bed` (W324) | `803f0bed5f7d714d3ee8577e1e42f17bbf371dca` | 2026-05-19 | 0 | **MATCH** | lbug FTS Windows fix |
| B1 | `anthropics/claude-cookbooks` | `2eed173a` (W319) | `2eed173a533a690eb70ab324614ce5350776a23a` | 2026-05-19 | 0 | **MATCH** | identical to anthropic-cookbook |

**ECC SHA-anomaly**: runtime CLAUDE.md L34 W316 status block cites ECC chain ending `→ b62f8075` (and W319 cites `→ 98bd517451`). `gh api /repos/anthropics/claude-cookbooks/commits/b62f8075` returns HTTP 422 — SHA does not exist in claude-cookbooks. This is a **MATERIAL stale-cite finding** (ECC commits live in a different repo — operator must verify which marketplace/plugin `everything-claude-code` actually reads).

## §2 — 2026-May Freshness Gate (operator mandate: "no stale 2023 etc")

All 10 anchors PASS (HEAD-date ≥ 2026-05-16). **0 FAILS.** Anti-bias study target `eric-ai-lab/HarnessAudit` 29★ also passes (updated 2026-05-19).

## §3 — NET-NEW Patterns (≥10 required; 14 surfaced)

Each pattern: CITE + W325 P-block recommendation + falsifiable-inverse counterfactual.

1. **NEW-P1 — Anthropic SDK `forkSession(sessionId, opts?)`** [`anthropics/claude-agent-sdk-typescript` CHANGELOG `0.3.143` series]. Branches a conversation programmatically; eliminates the W280d "one git worktree per session" cognitive overhead. **W325 P0**: codify in `superpowers:using-git-worktrees` skill as alternative to filesystem worktree. **Counterfactual**: if API can't restore terminal-state fidelity, worktrees still win for stale-state-divergence safety.

2. **NEW-P2 — `getContextUsage()` control method** [agent-sdk-ts CHANGELOG]. Real-time per-category context breakdown. **W325 P1**: replace heuristic 80%-trigger in CLAUDE.local.md auto-compact note with empirical category-aware decisions. **Counterfactual**: if categories don't map to user mental model (e.g. "system prompt" lumps too much), keep manual `/compact <hint>`.

3. **NEW-P3 — `agentProgressSummaries` + `task_progress` events** [agent-sdk-ts]. Periodic AI-generated subagent progress without polling. **W325 P0**: wire into W269 parallel-dispatch-mandate skill — measure parallel_ratio via real progress signal, not message-id grouping heuristic. **Counterfactual**: if summaries cost more tokens than they save, dispatch-counter approach (W315 Stream E codified) wins.

4. **NEW-P4 — `Options.managedSettings` (alpha)** [agent-sdk-ts]. Embedders pass policy-tier settings in-memory, not via filesystem. **W325 P1**: prototype CR-5 sandbox-resolution path that doesn't require settings.json rewrites. **Counterfactual**: if embedded-only (no CLI parity), settings.json `permissions.defaultMode` remains canonical.

5. **NEW-P5 — `system/memory_recall` event + `memory_paths` on `system/init`** [agent-sdk-ts]. SDK now surfaces memory-tier operations. **W325 P1**: wire into `mem-recall` skill to log T1-T6 cascade decisions deterministically. **Counterfactual**: if events don't include T1-T6 source labels, fall back to skill-internal logging.

6. **NEW-P6 — `ConfigChange` hook event** [agent-sdk-ts]. Fires when config files change mid-session. **W325 P2**: replace W317 PreCompact audit-trail Add-Content hack (silent-fallback per W319 STALE-D Stream-D MED-1) with this hook for settings.json drift detection. **Counterfactual**: if event doesn't fire for `.mcp.json` or `.claude/state/*`, manual audit-hook remains.

7. **NEW-P7 — wshobson `agent-teams` v1.0.2 6-skill bundle** [`wshobson/agents` commits 2026-04-26 → 2026-05-17]: `team-composition-patterns`, `task-coordination-strategies`, `parallel-debugging`, `multi-reviewer-patterns`, `parallel-feature-development`, `team-communication-protocols`. **W325 P1**: verify installed plugin version against W319 H1 finding ("upstream pivot deorchestrationalized team-lead"). HEAD is `08ded5e7` 2026-05-17 — W319 H1 cited `ece811f2` (2026-05-02) which is OLDER, not "upstream pivot." **W319 H1 falsified**; team-lead orchestration is NOT deorchestrationalized in current HEAD. **Counterfactual**: if H1 was about a feature-branch (not main), inspect `gh api /repos/wshobson/agents/branches`.

8. **NEW-P8 — `OthmanAdi/planning-with-files` v2.38.0 `/plan-goal` + `/plan-loop` slash commands** [CHANGELOG 2026-05-14]. Composes with CC's native `/goal` + `/loop` primitives. **W325 P0** (carry from W319-B1): re-litigate W314 CONFIRM-DEACTIVATE — these supersede W314 verdict; INSTALL recommended at T1 with PreCompact hook + SHA-256 tamper-attestation. **Counterfactual**: if `/goal` + `/loop` integration is local-only (not portable to non-CC clients), keep TodoWrite-as-canonical.

9. **NEW-P9 — `OthmanAdi` v2.38.1 delimiter swap `---` → `===`** [CHANGELOG 2026-05-16]. YAML doc-separator collision fix for SKILL.md frontmatter parsers. **W325 P2**: codify in skill-authoring lint — block raw `---` substrings in hook commands embedded in SKILL.md. **Counterfactual**: if real YAML parsers (PyYAML, libyaml) never miscount, lint stays advisory not blocking.

10. **NEW-P10 — context-mode v1.0.139 `inputSchema.parse(args)` on OpenCode native bridge** [v1.0.139 release-notes 2026-05-18]. Validates tool input pre-handler, matching MCP SDK `safeParseAsync` behavior. **W325 P2**: pattern for any non-MCP native-bridge integration — validate at the boundary, not the handler. **Counterfactual**: if Zod cost dominates handler runtime for hot tools, gate behind `--strict` flag.

11. **NEW-P11 — context-mode v1.0.138 Tier-A/B/C persistence invariant** [v1.0.138 release-notes 2026-05-18]: Tier-A (plugin cache, abs-paths OK with heal) / Tier-B (user-home config, abs-paths OK with heal) / Tier-C (workspace-committed, MUST use portable commands). **W325 P0**: codify in `update-config` skill — auto-detect Tier and reject abs-paths in Tier-C edits. Directly addresses W319 STALE-D-1 settings.json budget + W319 STALE-D-9 langfuse abs-Z:-path pattern. **Counterfactual**: if portable-commands fail on Windows MSYS-path edge cases (W317 path-mangle), keep Tier-C abs-path with documented escape hatch.

12. **NEW-P12 — context-mode v1.0.141 `coerceBoolean` SECURITY-CRITICAL refusal of `z.coerce.boolean()`** [v1.0.141 release-notes 2026-05-19]: rejects `Boolean("false") === true` silent-inversion for `ctx_purge.confirm`. **W325 P0**: codify in sca-v8.1+ as new D-EMP empirical anchor case-study — "boolean coercion in security-critical surfaces" alongside W316-A NSSM-HOLD. **Counterfactual**: if `z.coerce.boolean()` is later patched upstream to reject non-canonical strings, the manual helper becomes vestigial.

13. **NEW-P13 — mattpocock/skills `handoff` redaction-info update** [d54c497a 2026-05-19]. Documents which fields the handoff doc redacts (secrets, tokens). **W325 P2**: cross-check `Z:/claude-sota-installed/.claude/skills/handoff/` (mattpocock-vendor-fork-6) for redaction coverage; verify perplexity-key class is redacted by default (closes W317-r1 SEV-1 carry). **Counterfactual**: if local fork is identical to upstream, no-op.

14. **NEW-P14 — anthropics/skills CMA PR #1164 self-hosted-sandboxes + MCP tool-output offload** [`690f15ca` 2026-05-19]. New shared/managed-agents-self-hosted-sandboxes.md + automatic MCP-tool-output offload to sandbox file with truncated preview + path. **W325 P1**: study-only ingest (Managed Agents API, not CC primitive); pattern-extract the offload-large-output design for context-mode `ctx_execute` large-stdout case. **Counterfactual**: if offload-and-reference pattern adds round-trip latency >2× inline, inline-truncation wins.

## §4 — Anti-Bias Dispatch (operator mandate: "stars NOT hardgate")

All 10 audit anchors are mid/large-star (15K-94K). To validate W317-r2 6th-time anti-bias mandate (stars never drove verdicts), 1 NEW low-star recommendation:

- **`WithWoz/wozcode-plugin`** 168★ pushed 2026-05-18, license unknown. **CLASSIFICATION**: PATTERN-STUDY only (not install candidate; W324 mandate `bypassPermissions:true` SHIP-BLOCKER carries). **Rationale**: surface another claude-code-plugin design for cross-cohort comparison (D34 `cohort_overlap_signal` exercise per sca-v7.1). **Counterfactual**: if WOZ design is fully duplicated by existing wshobson `agent-teams` or addyosmani `agent-skills`, no D34 lift; reject.

Existing W317-installed `eric-ai-lab/HarnessAudit` (29★, updated 2026-05-19) confirms anti-bias-mandate-7th-time validation — runtime contains 1 deliberate <500★ install today, all 10 W325-anchor verdicts are pattern-merits not popularity-merits.

## §5 — Stale Cite Findings (forward to operator W325-AI queue)

- **W325-B-AI-1 (P0)**: ECC chain in CLAUDE.md L34 W316-block cites SHA `b62f8075` and W319 cites `98bd517451` — neither exists in `anthropics/claude-cookbooks`. Determine actual `everything-claude-code` plugin source repo + refresh chain. (HTTP 422 from `gh api /repos/anthropics/claude-cookbooks/commits/b62f8075`.)
- **W325-B-AI-2 (P1)**: W319 H1 "wshobson upstream pivot `08ded5e7→ece811f2` deorchestrationalized team-lead" is FALSIFIED — `ece811f2` is 2026-05-02 (older), `08ded5e7` is 2026-05-17 (current HEAD). W319 H1 reasoning inverted history direction. Re-investigate the actual concern (if any).
- **W325-B-AI-3 (P2)**: context-mode v1.0.141 currently installed-on-disk per W325 cache probe `ls .claude/plugins/cache/context-mode/context-mode/` shows BOTH `1.0.136` AND `1.0.141` — confirm old `1.0.136` dir is purged (W319-Stream-A finding context-mode-cache-heal hook should auto-delete).
- **W325-B-AI-4 (P3)**: `anthropics/skills` repo has NO git tags published (last 5 tags = empty array). Cite refreshes must use SHA-only, not version-tag.

## §6 — Convergence with Stream A (silent-fallback) + Stream C (sca rubric) + Stream D (cleanness)

- NEW-P3 task_progress event aligns with Stream A's parallel-dispatch silent-fallback codification (closes the H2 "empty-final-message silent drop" detection gap with **upstream-native event**, not a homebrew CC parser).
- NEW-P11 Tier-A/B/C invariant directly addresses Stream D's STALE-D-9 langfuse abs-Z:-path + STALE-D-7 W320 env-mirror — both are Tier-C violations per context-mode taxonomy.
- NEW-P12 coerceBoolean security-pattern is a fresh empirical anchor for sca-v8.1+ D-EMP HARD GATE (Stream C concern).

---

**End-of-Stream-B audit; 14 net-new patterns surfaced (target ≥10 PASS); 0 stale 2023 anchors; 4 stale-cite findings forwarded to W325-AI queue.**
