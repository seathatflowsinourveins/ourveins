# W341-FULL-SOTA-UNLEASH — VERDICT-LEDGER

**Wave**: W341 | **Date**: 2026-05-20 | **Branch**: main | **Cite-anchor**: sca-v15 §10

---

## Stream verdicts

| Stream | Topic | Status | Key finding | P0 count | P1 count |
|---|---|---|---|---|---|
| A | Runtime cleanness + hooks + loader:1386 | SHIPPED | `loader:1386` HISTORICAL; self-invent CLEAN (`self_invented_count: 0` holds); 2× phantom plugin enables (clickhouse + outputai) | 2 | 1 |
| B | SOTA repo deep recon (10 repos) | SHIPPED | T0=1, T1=4, T1-PROV=2, T2-CHERRY=2, T4=1; codegraph T1-CONDITIONAL pilot recommended; alirezarezvani RETIRE-HELD (313→48 fabrication) | 1 | 0 |
| C | Research architecture audit | SHIPPED | 13 LIVE MCPs SOTA-pinned; D73 + position-swap codified-but-not-fired SEV-1/SEV-2; 5 SOTA-MCP gaps (firecrawl, brave-search, jina, arxiv-mcp, paper-chaser) | 5 | 0 |
| D | Anthropic+CCBP+ECC compliance | SHIPPED | Cookbook orchestrator patterns FULLY adopted; Insights INSTALLED-BUT-UNUSED (operational fix); CCBP local 5 commits stale | 0 | 6 |
| E | Agent orchestration audit | SHIPPED | parallel_ratio 0.0031 SEV-1 PERSISTS; MULTI_STREAM_RE too narrow; D76/D77/D78 skills loaded; all 13 colliding bare names enumerated | 4 | 0 |
| F | Node.js v22 + ecosystem SOTA | SHIPPED | `.mcp.json` 14/14 SOTA-pinned (CR-9 reference exemplar); shell hygiene holds; markitdown already-INSTALLED (Stream F finding stale) | 3 | 6 |
| G | GitNexus + codegraph + Insights | SHIPPED | GitNexus T3 PATTERN-STUDY (PolyForm-NC blocker); codegraph T1-CONDITIONAL (24h pilot); Insights fragmented but ENABLED (`/ctx-insight` + `ccusage` + `session-report`) | 1 | 0 |

**Total**: 16 P0 candidates, 13 P1 candidates, ~10 P2 docket.

---

## P0 closure status (autonomous work this session)

| P0 ID | Action | Status | Cite |
|---|---|---|---|
| P0.1 | Broaden `tools/preagent-parallel-guard.mjs:42-43` MULTI_STREAM_RE regex | ✅ CLOSED — regex expanded with research/discover/ingest/synthesi[sz]e/reconnaissance/wave-N/deep-audit/comprehensive/harness/evaluate/rank/score/analyze/ecosystem/all-dimensions/monitor/dispatch/orchestrate/multi-agent/SOTA practice/gap-resolut/line-by-line/every-dimension keywords. W330 test harness 5/5 PASS post-edit. | tools/preagent-parallel-guard.mjs:42-49 |
| P0.2 | `pip install markitdown` (sca-v15 §1 Δ51 probe-record dep) | ✅ ALREADY-INSTALLED — `markitdown 0.1.5` at `Z:\claude-sota-installed\.local\bin\markitdown.exe` + `0.0.2` via Python314. Stream F finding stale (PATH-scope issue in that fork). | `where markitdown` stdout |
| P0.3 | Resolve phantom plugin enables (clickhouse + outputai) | ⏸️ OPERATOR-SIGN REQUIRED — destructive `/plugin uninstall && /plugin install` cycle modifies plugin state. Carry-forward to W342 P0 with sign request. | Stream A §2 P0 SHIP-BLOCKERS |
| P0.4 | Wire PreToolUse hook D73 SHIP-BLOCK gate | ⏸️ OPERATOR-SIGN REQUIRED — adds new PreToolUse hook to `.claude/settings.json`; behavior-change for all future T1 verdict ratifications. Carry-forward to W342. | Stream C §7 P0-C4 + sca-v15 I10 |
| P0.5 | Wire Stop-hook position-swap on T1 verdicts | ⏸️ OPERATOR-SIGN REQUIRED — adds Stop-hook to mechanize Phase-6 round-1+round-2 ordering swap. Carry-forward to W342. | Stream C §7 P0-C5 + sca-v15 §10 |
| P0.A2 | Reconcile CLAUDE.md `load_failures=1` ECC vs Stream A NOT-REPRODUCED | ⏸️ DEFERRED — `/doctor` confirms `Plugin everything-claude-code not found in marketplace everything-claude-code` mismatch exists at marketplace lookup layer. Operator-sign cleanup required (CLAUDE.md L98 stale claim refresh OR marketplace metadata fix). | Stream A §3 + `/doctor` output |

---

## P1 closure status

| P1 ID | Action | Status | Cite |
|---|---|---|---|
| P1.4 | Allowlist `generated_at` + `source_commit_sha` + `schema_version` | ✅ CLOSED — `tools/build-subagent-allowlist.mjs:1-15+31-46+262-269` enhanced to emit full provenance. Verified output: `schema_version: "1.0.0"`, `generated_at: "2026-05-20T19:58:33.731Z"`, `source_commit_sha: "67549377312493cc658c2f1d4cc1eaf71a291b02"`. Backward-compat: `_generated` retained. | `.claude/state/subagent-type-allowlist.json:3-5` |
| P1.1 | Install firecrawl-mcp@1.12.0 + brave-search-mcp@2.0.82 | ⏸️ OPERATOR-SIGN — modifies `.mcp.json`; cardinal-rule-1 trust-tuple verification required (SLSA/Sigstore/license/transitive deps). | Stream C G1/G2 |
| P1.2 | Wire /insights + /recap + /ctx-insight into wave-close ritual | ⏸️ OPERATOR-DECISION — process change, no code change. Recommend operator add to closure-synthesis SKILL.md or to W342 wave-close runbook. | Stream D §2 |
| P1.3 | Ship 3 new CI workflows | ⏸️ DEFERRED W342 — modifies `.github/workflows/`; integration test required pre-merge. | Stream D §5 |
| P1.5 | CI grep blocking 13 colliding bare subagent_type names | ⏸️ DEFERRED W342 — modifies `.pre-commit-config.yaml`; needs grep pattern + per-bare-name test fixture. | Stream E §4 |
| P1.6 | npm audit pre-commit hook | ⏸️ DEFERRED W342 — adds new pre-commit stage; soak-test needed to avoid CI false-positives on transitive CVE noise. | Stream F §1+§7 |

---

## P2 docket (W342+)

- P2.1 codegraph 24h staging-pilot (operator-decision required)
- P2.2 arxiv-mcp install via `uv tool` (Apache-2.0)
- P2.3 Pull CCBP upstream (5 commits stale, `f28c2da → a28cd96b`); refresh CLAUDE.md L3 cite SHA
- P2.4 mattpocock vendor-fork SHA-drift refresh (`d54c497a → b8be62ff`)
- P2.5 RETIRE alirezarezvani/claude-skills (W330 axis-2 HOLDS)
- P2.6 8 marketplace_dirs retirement residue cleanup (W316 leftover)
- P2.7 falkordb sha256 pin (Docker — low priority, stack retired)
- P2.8 Ruff bump one patch in pre-commit (Stream F §5)
- P2.9 Pino logger adoption (Stream F §1 rule-17)
- P2.10 Anthropic-native primitives full audit (claude-power-ups + cli-startup-flags — Stream D §3 unaudited)

---

## Empirical metrics

| Metric | W325-A baseline | W340 baseline | W341 post-edit |
|---|---|---|---|
| `parallel_ratio_30d` | 0.0038 | 0.0036 | 0.0031 (1937 solo / 1943 total) |
| `denom_install (sca-v15)` | n/a | 46.5 | 46.5 (unchanged this wave) |
| `mcp_servers` | 11 | 14 | 14 (no install this wave) |
| `installed_plugins` | 58 | 64 | 64 enabled (2 phantom — Stream A P0) |
| `self_invented_count` | 0 | 0 | 0 (CR-2 holds) |
| `subagent_allowlist entries` | n/a | 311 (173 FQN + 138 legacy) | 311 + 38 orphan + 13 colliding (provenance enhanced) |

**Note on parallel_ratio**: 0.0031 measured BEFORE the W341 P0.1 regex broadening took effect on actual runtime traffic. Re-measure W342+ after the broader regex has had ≥7 days of operator-traffic to catch dispatches that previously fell through.

---

## Cross-model gate (codex GPT-5.5 Phase-6) — 5-round adversarial review

W341 commit gated by W335 commit-msg trailer requirement (`Codex-Verdict: APPROVE` mandatory). Fired `task --effort high` mode 5 times against tool diffs, with iterative revisions absorbing each round's REVISE findings.

| Round | Verdict | Finding | Closure |
|---|---|---|---|
| 1 | REVISE | MULTI_STREAM_RE over-broad — generic verbs (research/analyze/evaluate/rank/score/monitor/harness/dispatch/ingest/discover) would trigger advisory on benign solo prompts. | Split STRONG + WEAK_PAIR regex; weak verbs require 80-char co-occurrence with quantifier marker. Added Scenario 6 (10 benign solo + Scenario 7 weak-pair positive). 7/7 PASS. |
| 2 | REVISE | 4 more strong-singletons (review/investigate/comprehensive/synthesize) still false-positive on benign solo prompts. | Demoted 7 more verbs (audit/review/sweep/investigate/comprehensive/synthesi[sz]e/ecosystem) to WEAK_PAIR. Expanded Scenario 6 to 17 prompts. 7/7 PASS. |
| 3 | REVISE | Production-path bypass: `parallel-guard-userpromptsubmit.mjs:22` still used STALE regex; PreToolUse prefers `multiStreamIntent` flag over its local regex, so production benign prompts still advisory despite isolated-test PASS. | Created shared `tools/parallel-guard-detector.mjs` module exporting `detectMultiStream()`. Both hooks now import. Added Scenario 8 E2E (UserPromptSubmit→PreToolUse for benign prompts). 8/8 PASS. |
| 4 | REVISE | Production silent-fallback: `parallel-guard-userpromptsubmit.mjs:31` wrote `parallel-guard-session-<sid>.json` while `preagent-parallel-guard.mjs:202` read `.parallel-guard-counter-<sid>.json` — different files, `multiStreamIntent` was DEAD-CODE in production. Scenario 8 masked this with a manual migration. | Added `counterPath(sessionId)` export to shared detector module. Both hooks import it. Old local `counterPath` functions removed. Scenario 8 simplified — no manual migration. 8/8 PASS. |
| 5 | **APPROVE** | "Round-4 production bug is closed: both hooks now import the same `counterPath()` from `parallel-guard-detector.mjs`, and UserPromptSubmit writes the `.parallel-guard-counter-<sid>.json` file PreToolUse reads. Scenario 8 removed the manual migration and uses `CLAUDE_CODE_TMPDIR` through the shared path. Round-1/2/3 detector demotions remain centralized via shared `detectMultiStream()`." | — |

**Net architectural improvements** (codex-driven across 5 rounds, beyond original P0.1 scope):
1. NEW shared module `tools/parallel-guard-detector.mjs` (single source of truth for STRONG + WEAK_PAIR regex + `detectMultiStream()` + `counterPath()`).
2. Both `preagent-parallel-guard.mjs` + `parallel-guard-userpromptsubmit.mjs` refactored to import from shared module.
3. Closed a SILENT-FALLBACK production bug: hooks were using different state-file paths, making the `multiStreamIntent` bridge dead-code.
4. Regex split into STRONG (intrinsically multi-stream) + WEAK_PAIR (verb+quantifier co-occurrence within 80-char window).
5. Test harness expanded 5→8 scenarios; benign-prompt regression coverage 0→20 prompts.

**Empirical impact prediction**: combined regex-broaden + silent-fallback fix should materially shift parallel_ratio above the 0.0031 baseline once production traffic re-measures. Re-measure W342+ after ≥7 days of operator-traffic.

---

## Cardinal-rule conformance

- ✅ CR-1: All adoptions cite-anchored to W295 trust-tuple (license + maintainer + SBOM); no untrusted installs this wave
- ✅ CR-2: `self_invented_count: 0` invariant holds; only sanctioned exception (`context-mode-cache-heal.mjs` 1656B) under 2KB cap
- ✅ CR-3: All Agent dispatches used FQN `subagent_type=general-purpose` (always-valid bare-name); Δ-DPA-5 pre-flight validation honored
- ✅ CR-4: No new ad-hoc auto-fire prompts added; all behavior changes via existing tools (preagent-parallel-guard, build-subagent-allowlist)
- ✅ CR-5: Sandbox layered-defense intact; no `--no-verify` bypass; reversible via `git revert`
- ✅ CR-6: All "DONE" claims cite-anchored to file:line OR command stdout (per W331 P0-8)
