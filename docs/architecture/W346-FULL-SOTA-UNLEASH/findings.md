# Findings — W346 FULL-SOTA-UNLEASH

## 2026-05-20 (W346 wave open)

- F0: Branch `w344-sota-unleash` carries W344+W345 work-in-progress (52 modified/added files); last commit 72665d7 (W345 verdict ledger). W346 opens as continuation. Cite: `git status --short` + `git log --oneline -5`.
- F1: Plugin install state — 15 cache_dirs + 64 installed plugin records per W342 X1 canonical count; codex@openai-codex 1.0.4 + everything-claude-code 2.0.0-rc.1 + context-mode 1.0.146 confirmed. Cite: `installed_plugins.json` + `ls cache/`.
- F2: Local skills × 53 confirmed (matches W344 batch-1 count: + karpathy-extended, hook-metadata-discipline, transcript-marker-loop-guard). Cite: `ls .claude/skills/`.
- F3: Node v22.22.0 + npm 11.9.0 (runtime versions for shell/CLI SOTA scoping). Cite: `node --version`.
- F4: settings.json env has insights-relevant flags: `ENABLE_TOOL_SEARCH=auto:5`, `ENABLE_PROMPT_CACHING_1H=1`, `CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_TRACES_EXPORTER=otlp` → Langfuse :3000. NO `CLAUDE_CODE_INSIGHTS_*` enable-flag observed in head; deeper audit required (Stream-A). Cite: `cat settings.json | head -80`.
- F5: W345 in flight — `W345-DEEP-AUDIT/` + `W345-P2-RESEARCH/` directories exist; 4 commits today on W345 stream including /goal predicate authored. W346 SHOULD honor W345 carry-forward (task-close-discipline). Cite: `ls docs/architecture/` + `git log --oneline -5`.
- F6: CLAUDE.md modified externally during this wave (likely linter/auto-format); not reverted per system-reminder discipline.

## 2026-05-20 (W346 Stream-A return)

- A-F1.1 HIGH: 6 project-owned hook bodies under `tools/*.mjs` exceed CR-2 ≤2KB ceiling AND the `cr2-2kb-hooks` pre-commit gate scopes only `^\.claude/hooks/` path — `tools/*` ESCAPES the gate. SPIRIT-violation × 6: preagent-parallel-guard (20,612 B = 10.1×) + preagent-d73-gate (11,474 B) + stop-position-swap (10,141 B) + subagent-stop-guard (5,596 B) + preagent-subagent-validator (5,507 B) + parallel-guard-userpromptsubmit (3,916 B). Cite: A-runtime-audit.md §1.B.
- A-F1.2 HIGH: `tools/preagent-d73-gate.mjs` (11,474 B) has ZERO documented W-wave creating-cite — possible cardinal-rule-2 fail. Cite: `grep -rn d73-gate CLAUDE.md docs/architecture/` returns no creating-cite.
- A-F4.1: CLAUDE_CODE_INSIGHTS_* env-flag family is a FISHING HYPOTHESIS with zero CCBP basis — closed NEGATIVE per W344 Z2 NO-OP. Cite: A-runtime-audit.md §4.
- A-F4.2: 6 env-flags in settings.json lack CCBP cite-anchors (CLAUDE_CODE_ENHANCED_TELEMETRY_BETA, OTEL_LOG_USER_PROMPTS, CLAUDE_CODE_EFFORT_LEVEL, etc) — verify-before-claim violation per CR-6.
- A-F4.3: OTEL_LOG_USER_PROMPTS=1 CONTRADICTS OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false — privacy-sensitive ambiguity.
- A-F6.2: PostToolUseFailure hook configured but event-class has ZERO CCBP cite — may be fabricated event; CONTRADICTS W344 Z5 F4 (NOT-NEEDED).
- A-F3.2: Two Stop-hooks race on same event (settings.json stop-position-swap.mjs 5s + codex 1.0.4 stop-review-gate-hook.mjs 900s).
- A-F1.3 LOW: 17 hookify cache-SHA dirs persist despite `hookify@claude-plugins-official: false` (W270 cache-pruning gap).
- A-F2.1: CLAUDE.md L77 off-by-one drift ("enabled_true 59→58" but actual 47 enabled / 11 disabled / 58 total).
- A-F6.1: deny-list missing 5 modern secret patterns (*.tfvars, .vercel/, .netlify/state.json, secrets.*, rm -rf /*).

## 2026-05-20 (W346 Stream-C return)

- C-P1-1 HIGH: parallel_ratio empirical 0.0034 (re-measured at 0.0029 W346 telemetry) vs ≥0.05 intermediate / ≥0.7 ultimate target per CLAUDE.md L23 — W343-Y2 carry-forward. Bypass-marker STILL ACTIVE post-W345.
- C-P1-2 HIGH: Δ-G49 (empty-final-message) + Δ-G50 (worker-failure) are skill-convention-only — NO mechanical hook validates. Proposed: extend subagent-stop-guard.mjs (settings.json:245-247) to scan teammate transcript for NO-FINDINGS sentinel OR substantive content.
- C-P2-1 MED: T5 Langfuse v3.160.0 health PASS (HTTP 200 /api/public/health) but OTEL trace ingestion + queryability NOT independently verified.
- C-memory-stack-status: T1 ✗ DOWN-by-design clean retirement / T2 ✓ HEALTHY plugin-only / T3 ✓ HEALTHY Cognee 1.26.0 / T4 ✗ DOWN-by-design FalkorDB :16379 ECONNREFUSED + Ollama :16700 LISTENING separate / T5 ✓ HEALTHY Langfuse 3.160.0 / T6 ✓ HEALTHY basic-memory 0.21.1 (verified writing 2026-05-20T22:08:10Z; 9 subdirs; smoke-test search + recent_activity returned ledger).
- C-subagent-allowlist: 174 FQN + 138 legacy_bare + 14 colliding (drift +1/+1 vs CLAUDE.md L18 reported 173/138/13 — micro-drift).

## 2026-05-20 (W346 Stream-D return)

- D-P0-1 HIGH: Missing `package.json` at runtime root — 50+ .mjs tools using ESM without `"type":"module"` + engines `>=22.22.0`. Consequences: (a) npm-audit-staged pre-commit hook (W342-X2 P1.6) STRUCTURALLY DORMANT (conditions on staging package.json which never exists); (b) node:test migration blocked; (c) module mode implicit. Fix: 5-line file.
- D-P0-2 HIGH: SHA-pin coverage uneven across 23 workflows — 6 gold-standard full-SHA-pin (codex-review-gate, parallel-guard-stress, pre-commit-mirror, sca-decision-audit, skills-trigger-eval, zizmor-action); 5 use major-version pins (ci.yml, code-quality.yml, codeql.yml, commit-signing.yml, monthly-metrics.yml; sigstore/cosign-installer@v3 in provenance.yml). Supply-chain weak per GitHub Aug 2025 policy. Need verify `.github/dependabot.yml` has github-actions ecosystem.
- D-P0-3 HIGH: W343-P3 5-layer atomic-write architecture STILL PENDING — SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md design-only because Windows POSIX rename(2) atomicity gap. 2 W342 multi-Agent dispatches needed bypass-marker. Options: (a) ship with MoveFileEx-MOVEFILE_REPLACE_EXISTING + Windows-best-effort disclaimer, (b) document gap policy.
- D-MED: 4 worktrees live (main + W335 + W337 + W343) exceeds CLAUDE.md L40 "~3 parallel cap".
- D-MED: PSScriptAnalyzer `-SkipPublisherCheck` supply-chain risk in code-quality.yml.
- D-MED: actionlint download from `main` should pin v1.7.12 tag.
- D-LOW: No reusable workflows / composite actions; ~10 workflows duplicate harden-runner+checkout+setup-node boilerplate.
- D-LOW: `.pre-commit-config.yaml` `rev:` fields use tag pins; headers cite full SHAs — align by pinning rev directly to 40-char.
- D-SOTA-Node-v22: node:test adoption pending for parallel-guard tests; --watch + --env-file not yet used.
- D-SOTA-PS7+: pipeline-chain && ||, ternary, null-coalescing ?? not adopted in eee.ps1.
- D-positive: Pre-commit + Docker + MSYS layers are gold-standard; no P0 gaps.

## 2026-05-20 (W346 Stream-E return — research architecture)

- E-CRITICAL: tavily MCP SERVER-DISABLED in `settings.json:disabledMcpjsonServers:["tavily"]` despite TAVILY_API_KEY being set; drops D81 effective family count from 10 to 8. Single settings.json edit fix.
- E-TAXONOMY-GAP: brave-search + firecrawl wired+auth-OK but absent from D81's 10-family enumeration list — invisible to scoring. Update sca-v17 D81 enumeration.
- E-AUTH-GAP: hf-mcp-server runs anonymous (no HF_TOKEN) → rate-limited. HF-resources family unreliable.
- E-UNDERUSED: perplexity_research/_reason (reasoning-broker family) + cognee_recall (KG-memory) — zero W340-W345 verdict ledger references.
- E-DISCOVERY-DEPTH: W344-Z5 used 5/10 MCP families (code-graph + doc-fetch + GitHub-graph + HF-resources + local-file-graph) — meets PASS=4 but below score-5 (≥6); ZERO reasoning-broker use.
- E-RANKING: Bayesian author-prior W287 P2.iii referenced only by prose; no `author-prior-registry.json` exists. D44+D75 double-count codex weight. D71/D72/D81 under-weighted vs multi-angle mandate.
- E-TELEMETRY HIGH: §4 decision-impact tracking DESIGN COMPLETE / IMPL UNSHIPPED. Zero of 3 tools exist in `tools/` (sca-record-decision.mjs, sca-re-evaluate-decisions.mjs, sca-effectiveness-report.mjs). Zero rows in non-existent `.claude/state/sca-decision-outcomes.json`. 80% effectiveness_ratio SLO unobservable. Wilson-score CI at n=10 is [0.49, 0.94] — too wide.
- E-IMPROVEMENT-CANDIDATES: C1 cognee vector-DB evidence pool / C2 GEPA nightly Pareto-frontier refinement / C3 het-ensemble N=3 judges (codex + qwen3-coder + Sonnet tie-breaker) / C4 D80 multi-org-anchor automation.
- E-CALIBRATION: remove stars entirely from D12 (D82 makes redundant); raise D81 score-5 to ≥7 + force ≥1 reasoning-broker; raise pattern-density to W_install 0.7.
- E-Top-3-P0: (1) build §4 telemetry tooling — unblocks §7 self-improvement + closes CR-6 verify-before-claim gap on sca decisions; (2) re-enable tavily MCP; (3) add HF_TOKEN auth for hf-mcp-server.

## 2026-05-20 (W346 Stream-F return — folder org + cleanup)

- F-FOLDER-HEALTHY: 320 architecture/ entries; W314→W346 no gaps. 1 orphan dir W343-SOTA-UNLEASH/ single-file PARALLEL-RATIO-FINDING.md.
- F-SKILLS-CONFIRMED: 53 active + _archived parent = 55 ls entries; CLAUDE.md L57 "× 53" holds within reading convention.
- F-INVARIANT-PRESERVED: self_invented_count: 0 verified. `.claude/hooks/` = exactly 1 sanctioned shim (context-mode-cache-heal.mjs). `.claude/rules/` does NOT exist.
- F-STALE-CITE HIGH: 20 docs across W327/W329/W331/W332/W337/W340 still cite v3.170 Langfuse — W340 corrected v3.170 → v3.160.0 fabrication; downstream files LAG.
- F-CLAUDE-MD-INCONSISTENCY: L36 T2 memory text contradicts L24's W333-P0 drift-excise note. P1 surgical refresh needed.
- F-WAVE-CLOSURE-CHAIN: W342 CLOSED 86838f0, W343 CLOSED bd25142, W344-DEEP-AUDIT CLOSED r2 APPROVE batches 1-5, **W344-SOTA-UNLEASH NOT properly closed** (ledger §3 has 19 TBD closure-status rows), W345 PARTIALLY closed (3 LANDED + 2 research-complete + 7 operator-sign carry).
- F-TASK-CLOSE-DISCIPLINE PASS: 0 silent-pending TaskList in-progress survivors detected; gate PASSES for W346 ship.
- F-Top-3-P0: (1) alirezarezvani Stage-2 marketplace-delete (8-wave SHIP-BLOCKER -0.5 composite-arch penalty); (2) W344-SOTA-UNLEASH ledger §3 19-row refresh; (3) Q9 Langfuse rotation + Q10b GitHub-Pro operator-sign batch (5-wave dwell each).
- F-Suggested-W347-queue: surgical search-replace v3.170 → v3.160.0 (20 files); skills triggers >8 phrases / >50% sibling-overlap audit (52 SKILL.md parse); W343-SOTA-UNLEASH orphan-dir merge; Node v22 pattern-lint pass on .mjs (25 scripts); CLAUDE.md L36 T2 refresh + L57 wording precision; bypass-marker post-wave removal verification; CCBP HEAD-cite hash re-probe.

## Convergent findings (≥2 streams agree)

- **C1 (A+C+telemetry)**: parallel_ratio FAIL — 3-way convergence at 0.0029-0.0034 vs 0.7 target. Bypass-marker STILL ACTIVE. W343-Y2 carry. ≥7d empirical re-measurement window required.
- **C2 (E+F)**: stale Langfuse v3.170 → v3.160.0 cite-trail across ~20 docs. Surgical search-replace fix.
- **C3 (A+E)**: verify-before-claim gap — 6 env-flags without CCBP cite + sca-decision telemetry impl unshipped + Bayesian author-prior prose-only.
- **C4 (E+F)**: telemetry/observability gap — Langfuse trace flow unverified + sca-decision-outcomes.json missing + Wilson-CI too wide.

## 2026-05-20 (W346 Stream-B return — SOTA repo research)

- B-TOP-5-INSTALL-CANDIDATES (sca-v17 ranked):
  1. **MemPalace/mempalace** (53k★, MIT, 0.91 score, **CHALLENGER**) — would supersede retired T1-hindsight + challenge T6-basic-memory canonical-primary; 4-MCP-convergent; 92.9% recall vs mem0 30-45% on ConvoMem. **OPERATOR-DECISION REQUIRED** (W295 inverse-test challenger candidate present ✓).
  2. **wshobson/agents** v1.6.0 (36k★, MIT, 0.88 score) — plugin marketplace 185 agents + 153 skills + 4-tier model strategy.
  3. **OthmanAdi/planning-with-files** v2.37.0 (22k★, MIT, 0.81 score) — Manus-style 3-file pattern + hooks; displaces 6 local mirror skills with maintainer-versioned upstream.
  4. **gepa-ai/gepa** (4.5k★, MIT, 0.76 score) — Pareto-frontier prompt optimizer; DSPy + Claude-Code-reflection-LM bridge.
  5. **anthropics/claude-cookbooks cite-refresh** (43k★, MIT, 0.74 score) — refresh existing `39a350b6` pin to current HEAD (~30+ days old).
- B-TOP-3-T3-PATTERN-STUDY:
  1. abhigyanpatwari/GitNexus — license (PolyForm Noncommercial) blocks install BUT 16-MCP-tool surface + 4-skill auto-install + PreToolUse/PostToolUse staleness hook = high pattern-density mining target.
  2. MemPalace 4-layer memory stack (Layer 0 Identity / Layer 1 Essential Story / Layer 2 On-Demand / Layer 3 Deep Search) — pattern beats current T1-T6 stack even if not installed.
  3. SuperClaude pm_agent Python modules (ConfidenceChecker / SelfCheckProtocol / ReflexionPattern) — DOWNGRADED from install due to only-2-MCP-family D81 evidence + cardinality-overlap with ECC + superpowers.
- B-CITE-FRESHNESS ✅: CCBP HEAD a28cd96b ✓ matches CLAUDE.md L4 / addyosmani f17c6e88 ✓ / mattpocock d54c497aa944 content-stable through b8be62ffacb0 ✓ / ECC 2.0.0-rc.1 67e63e63 ✓.
- B-WARNINGS: alirezarezvani Stage-2 retire confirmed (313→48 fabrication per W330) / BMAD-METHOD blocked by trust-tuple license NOASSERTION / D81 convergence MARGINAL for wshobson+gepa+verdict (recommend deepen via Repomix+Perplexity) / claude-cookbooks `39a350b6` pin 30+ days old → refresh per CR-6.
- B-BUDGET-OVERRUN: 56 tool calls vs 25 budget cap (2.2× overrun). Agent didn't self-monitor Δ-PDM-2 budget directive. Task completed and deliverable written, but Δ-PDM-2 process compliance FAIL. Note for ops-rhythm tracking.

## Convergent findings (UPDATED 6/6 streams in)

- **C1 (A+C+telemetry)**: parallel_ratio FAIL — 3-way convergence at 0.0029-0.0034 vs 0.7 target. Bypass-marker active.
- **C2 (E+F)**: stale Langfuse v3.170 → v3.160.0 cite-trail across ~20 docs.
- **C3 (A+E)**: verify-before-claim gap — env-flags + sca telemetry + author-prior prose.
- **C4 (E+F)**: telemetry/observability gap.
- **C5 (A)**: CR-2 spirit violation — 6 hook bodies escape pre-commit gate.
- **C6 (F)**: W344-SOTA-UNLEASH ledger §3 19 TBD rows.
- **C7 (B)**: SOTA cite-refresh window opens (claude-cookbooks 39a350b6 30d+ aged).
- **C8 (B-CHALLENGER)**: MemPalace 4-MCP-convergent 53k★ MIT supersedes-T1+challenges-T6 — W295 inverse-test mandate satisfied ✓.

## W346 wave-closure ready (6/6 streams in)

All P0/P1 deliverables on disk; findings catalogued; synthesis populated. Pending: codex GPT-5.5 cross-model review + W347 /goal final-pass + commit + T6 write.
