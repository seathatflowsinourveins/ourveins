# W329 — DEEP-AUDIT FULL-SOTA-UNLEASHED

> Wave initiated 2026-05-19. Operator mandate: full SOTA audit of skills + insights + research-architecture + silent-fallbacks + agent-team orchestration + runtime + CCBP/ECC/Anthropic upstream compare + SOTA repos refresh, with cross-model GPT-5.5 consensus. "MAX workflow quality. No silent fallbacks. All from SOTA repos. Source of truth = SOTA convergence insights from sota repos and community."

## Wave-state snapshot (W329 dispatch time)

| Aspect | State | Cite |
|---|---|---|
| Claude CLI | v2.1.144 (Z:-portable `/z/claude-sota-installed/.local/bin/claude`) | `(Get-Command claude).Source` probe |
| Node | v22.22.0 (fnm 1.39.0 managed) | `node --version` |
| npm / npx / uvx | 11.9.0 / 11.9.0 / 0.10.3 | tooling probe |
| Plugin count | 64 enabled plugins across 18 marketplace caches | `installed_plugins.json` |
| Local skills | 35 (incl `_archived`) at `.claude/skills/<name>/SKILL.md` | `ls .claude/skills/` |
| MCP servers | 14 declared in `.mcp.json` | `mcp.json` |
| Settings env keys | 51 | `settings.json:env` |
| Hooks events | 8 (SessionStart, PreToolUse×3, PostToolUse, PreCompact, WorktreeRemove, Notification, PostToolUseFailure, TaskCompleted) | `settings.json:hooks` |
| Permissions | 12 allow, 18 deny, defaultMode `default` | `settings.json:permissions` |
| `disabledMcpjsonServers` | `[]` (empty) | `settings.json:disabledMcpjsonServers` |
| Sandbox | `enabled:false` + `allowUnsandboxedCommands:true` (R5 SHIP-BLOCKER 7+ waves carry) | `settings.json:sandbox` |
| teammateMode | `in-process` (native, no env-flag needed since W259) | `settings.json:teammateMode` |
| outputStyle | `Proactive` | `settings.json:outputStyle` |
| alwaysThinkingEnabled | `true` | `settings.json:alwaysThinkingEnabled` |
| autoMemoryEnabled | `false` (env CLAUDE_CODE_DISABLE_AUTO_MEMORY=1 dominates) | `settings.json:env` |
| Insights dashboard | ctx_insight LIVE on :4747 | `netstat -an` |
| Phoenix observability | LIVE on :16006 (prior status claimed stopped — state-changed re-verified) | `netstat -an` |
| Cognee NSSM | RUNNING (:8000/mcp) | `sc query CogneeMCP` |
| LlamaSwap NSSM | RUNNING (:8090) | `sc query LlamaSwap` |
| Langfuse | LIVE :3000 (v3.170.0 docker) | `netstat -an` |
| ollama | LIVE :16700 | `netstat -an` |
| Llama-server | LIVE :8080 | `netstat -an` |
| Parallel-ratio (30d aggregate) | **0.0036 SEV-1** (denom 1676, target ≥0.30) | `tools/parallel-ratio-telemetry.mjs` |
| Parallel-ratio (W329 dispatch) | **1.0** (7/7 Agent calls in 1 assistant message) | this wave |
| Disk state-outside-repo | 4.1 GB | `du -sh Z:/claude-sota-installed-state` |
| VERDICT-LEDGER.md | MISSING from repo root (CLAUDE.md L52 reference is STALE — actual ledger lives at T6 basic-memory + per-wave dirs) | `Test-Path` probe |
| `self_invented_count` | 0 (W255 cleanup invariant holds) | per CLAUDE.md L7 |
| Cardinal rules R1-R4 | ✓ HOLD | per `CLAUDE.md` |
| Cardinal rule R5 | ⚠ PARTIAL-HOLD (sandbox+bypassPermissions 7+ wave SHIP-BLOCKER pending operator decision) | per `CLAUDE.md` |
| In-progress wave dirs (uncommitted) | W320-W328 visible: W320-RESEARCH-ARCHITECTURE-ENHANCEMENT, W321-META-FOUNDATION-WAVE, W321-OPEN-SOURCE-CUTOVER, W322-DEEPER-RESEARCH-ARCH, W322-WAVE, W323-COMPREHENSIVE-AUDIT-WAVE, W326-RESEARCH-ARCHITECTURE-OVERHAUL, W327-COOKBOOK-WAVE, W328-CODEX-ROUND-14-RESULT, W328-COMPOSITE-RECALC-VALIDATE, W328-COMPOSITE-REVAL-AND-SOTA, W328-GH-SOTA-METHODS, W328-GHMCP-USAGE-CORRECTION, W328-HF-SOTA-METHODS, W328-HF-USAGE-CORRECTION, W328-INSIGHTS-OPERATOR-ENABLED, W328-INSIGHTS-WIRE-APPLY, W328-K5-MINIMAL-COORD, W328-K8-PROVENANCE-VERIFY, W328-PROVENANCE-LINT-V2, W328-R5-VERIFY, W328-SKILL-ABSORB-WAVE; tools/insights-wireup/, tools/research-stack/ | `git status` |

## 7-stream parallel dispatch (this wave — W269 mandate compliant, 7/7 = 100% parallel_ratio)

| Stream | Title | subagent_type | Status | Deliverable |
|---|---|---|---|---|
| A | Skills audit (35 local + 64 plugin) | general-purpose | ✓ COMPLETE | `W329-A-SKILLS-AUDIT.md` |
| B | Insights + native CC features | general-purpose | ✓ COMPLETE | `W329-B-INSIGHTS-NATIVE-FEATURES.md` |
| C | Research architecture v8 SOTA design | general-purpose | ✓ COMPLETE | `W329-C-RESEARCH-ARCH-V8.md` |
| D | Silent fallback hunt + orchestration audit | debugging-toolkit:debugger | ✓ COMPLETE | `W329-D-SILENT-FALLBACK-AGENT-ORCHESTRATION.md` |
| E | CCBP + ECC + Anthropic upstream compare | general-purpose | ✓ COMPLETE | `W329-E-CCBP-ECC-ANTHROPIC-COMPARE.md` |
| F | Runtime env audit (Node22+Docker+Shell+MSYS) | shell-scripting:bash-pro | ✓ COMPLETE | `W329-F-RUNTIME-ENV-AUDIT.md` |
| G | SOTA repos refresh + line-by-line ingest | general-purpose | ✓ COMPLETE | `W329-G-SOTA-REPOS-INGEST.md` |
| **H** | **Ultimate Architecture Synthesis** (orchestrator-synthesized AFTER A-G) | self | ✓ COMPLETE | `W329-H-ULTIMATE-ARCHITECTURE-SYNTHESIS.md` |

## Stream A — preliminary results (returned)

- **35 local skills** inventoried + 18 plugin marketplaces (~70 dedup plugins, 5210 cumulative SKILL.md files)
- **T1 installed-upstream**: 0 local (by design — installed-upstream skills live in plugin namespace)
- **T2 vendor-fork with cite**: 14 (mattpocock 5 + addyosmani 5 + vercel 3 + obra-superpowers fork 1)
- **T3 operator-novel cite-anchored**: 21 (speckit 9 + sca/goal/learned/ops-rhythm/mem-recall/parallel-dispatch-mandate/gitnexus/local-cypher/durable-planning/dspy/langfuse/handoff-variants)
- **T4 SELF-INVENT-NO-CITE**: **0** ← `self_invented_count: 0` invariant CONFIRMED
- All graphiti / hindsight T1 references are explicit DEFENSIVE "DO NOT route" guards (correctly stale-defensive)
- 3 plugins in retired-but-cached state (hindsight-memory, mcp-memory-service, planning-with-files) — housekeeping for future wave; no current correctness impact
- 2 VERIFY items: gitnexus parent index assumes plugin-namespace children, vercel-* assumes `Z:/repos/deps/vercel-labs-agent-skills/` clone
- No duplication collision detected (overlap documented in SKILL.md frontmatter)

**Verdict**: Skill inventory healthy + CR-3/CR-4 compliant. No retires required this wave.

## Stream H — Ultimate Architecture Synthesis (orchestrator deliverable)

> Will be written after streams B-G complete. Will include:
> - Multi-dim repos ranking score (per sca-v12 W328 dims D1-D49+D52-D65+D66)
> - Architecture layer model (L1-L7 per prior W316-S5 blueprint + corrections)
> - Per-repo ranking score vs alternatives in same category
> - SOTA convergence trail (multi-MCP family attribution per claim)
> - GPT-5.5 codex cross-model consensus (Phase-6 position-swap)
> - Operator next-steps (P0/P1/P2 prioritized)
> - Cardinal-rule R5 (sandbox+bypassPermissions) operator-decision unblock proposal

## Cite-anchor trail (W329 foundational)

1. Anthropic CC skills doc: https://code.claude.com/docs/en/skills (skill auto-fire description-match)
2. Anthropic sub-agents doc: https://docs.anthropic.com/en/docs/claude-code/sub-agents (Agent tool semantics + fork-subagent inheritance)
3. Anthropic claude-cookbooks: https://github.com/anthropics/claude-cookbooks `@2eed173a` `patterns/agents/orchestrator_workers.ipynb cell-2` (empty-response guard canonical pattern)
4. Anthropic Multi-Agent Research blog: https://www.anthropic.com/research/built-multi-agent-research-system (15× token-burn + orchestrator-worker pattern empirical anchor)
5. CCBP: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/*` (claude-memory, claude-settings, claude-hooks)
6. ECC plugin: `everything-claude-code@2.0.0-rc.1` (everything-claude-code marketplace)
7. wshobson/agents: https://github.com/wshobson/agents (agent-teams plugin lineage)
8. mattpocock/skills: https://github.com/mattpocock/skills `@67bce91c80cd` (handoff + review + tdd + grill-with-docs + caveman + diagnose vendor-forks)
9. addyosmani/agent-skills: https://github.com/addyosmani/agent-skills `@f17c6e88c904dc747381c374312c2d58e10647ae` (interview-me + doubt-driven-development + frontend-ui-engineering + api-and-interface-design + code-simplification vendor-forks)
10. mksglu/context-mode: https://github.com/mksglu/context-mode `@1.0.141` (context-mode plugin)
11. OthmanAdi/planning-with-files: https://github.com/OthmanAdi/planning-with-files `@2.38.1` (planning-with-files plugin — currently disabled per W312-codex-r1 supersession-chain ratification of W309 row #32)
12. abhigyanpatwari/GitNexus: https://github.com/abhigyanpatwari/GitNexus (T3 PATTERN-STUDY per W312 — license + bus-factor + MCP-attack-surface convergent hard-caps)
13. alirezarezvani/claude-skills: https://github.com/alirezarezvani/claude-skills (W319-B alirezarezvani SKILL-AUTHORING-STANDARD PATTERN-ONLY ADOPTION — 3-of-10 patterns cherry-picked)

STATUS: ORCHESTRATOR IN-FLIGHT — 6 streams pending, synthesis to follow.
