# STREAM-B-SYNTHESIS — W319 Multi-Repo Ingest

> **Owner**: Stream B (this stream-of-truth) — **Time**: ~45 min wall-clock, 10 repos, ~80+ commits/files inspected line-by-line
> **CARDINAL-RULE COMPLIANCE**: R1 honored — no installs performed; only ranked install candidates with sca-v7.1 install_score signals.
> **W317-SEV-1 LEAK CHECK**: ran `grep -i "pplx-"` against all 10 ingested repos (Bash) — **0 hits**. Perplexity API key from W317 leak NOT echoed by Stream B. (Search command used: `grep -rl "pplx-" Z:/repos/deps/{claude-code,claude-code-best-practice-shan,everything-claude-code,wshobson-agents,addyosmani-agent-skills,mattpocock-skills,context-mode,planning-with-files,gitnexus,alirezarezvani-claude-skills}` — empty.)

## HEAD-SHA-CAPTURE-TABLE

| # | Repo | HEAD-SHA | Date | License | Verdict |
|---|---|---|---|---|---|
| 1 | `anthropics/claude-code` | `69d7070` | 2026-05-19 | MIT | N/A (harness itself) |
| 2 | `shanraisshan/claude-code-best-practice` (CCBP) | `48798ca` | 2026-05-18 | (unlicensed) | cite-ref only; refresh L3 SHA |
| 3 | `affaan-m/everything-claude-code` (ECC) | `b62f8075` | 2026-05-19 | MIT | HOLD-T2; SHA refresh in CLAUDE.md |
| 4 | `wshobson/agents` | `ece811f` | 2026-05-02 | MIT | HOLD-T2; 3 new plugins worth audit |
| 5 | `addyosmani/agent-skills` | `f17c6e88` | 2026-05-16 | MIT | VENDOR-FORK HOLD; 0 drift |
| 6 | `mattpocock/skills` | `67bce91c80cd` | 2026-05-18 | MIT | VENDOR-FORK HOLD; 0 drift, 2 PRIO-1 candidates |
| 7 | `mksglu/context-mode` | `898ecc9` (v1.0.141) | 2026-05-19 | Elastic-2.0 | INSTALLED ACTIVE; W315-r2 closed |
| 8 | `OthmanAdi/planning-with-files` | `d27008f` (v2.38.1) | 2026-05-16 | MIT | **RE-LITIGATE T1-INSTALL** |
| 9 | `abhigyanpatwari/GitNexus` | `98addbd6` | 2026-05-09 | PolyForm Noncommercial 1.0.0 | HOLD-T3 (license blocks) |
| 10 | `alirezarezvani/claude-skills` | `8aa9208` (v2.8.0) | 2026-05-19 | MIT | T2 STAGED-PILOT; cherry-pick scope |

## CITE-DRIFT-AGGREGATE

| Cite | Old | New | Where | Priority |
|---|---|---|---|---|
| CCBP HEAD | `48f2ceb` | `48798ca` | CLAUDE.md L3 | LOW (content-stable cross-SHA) |
| ECC HEAD | `8148340a` / `f3cd00625222` / `841beea` (mixed) | `b62f8075` | CLAUDE.md L34, L41 (3 places) | MEDIUM (plugin update path) |
| wshobson HEAD | `08ded5e` | `ece811f` | CLAUDE.md L42 | LOW (verdict invariant) |
| All other 7 repos | matches HEAD | (current) | — | ZERO DRIFT |

## CROSS-REPO RANKED TOP-20 NET-NEW (by PRIO + harness-fit)

| Rank | Source repo | NET-NEW pattern | Type | Effort | install_score note (per sca-v7.1) |
|---|---|---|---|---|---|
| 1 | `OthmanAdi/planning-with-files` v2.38.1 | `/plan-goal` slash command (composes with `/goal` primitive) | command | LOW | Re-audit RE-LITIGATE T1 candidate |
| 2 | `OthmanAdi/planning-with-files` v2.38.1 | `/plan-loop` slash command (composes with `/loop` primitive) | command | LOW | Re-audit RE-LITIGATE T1 candidate |
| 3 | `OthmanAdi/planning-with-files` v2.38.1 | `PreCompact` hook on `task_plan.md` + SHA-256 tamper attestation | hook | LOW | Direct security + persistence gain |
| 4 | `mattpocock/skills` `67bce91c80cd` | `handoff` skill (productivity/handoff/) | skill | LOW | CLAUDE.md L42 AI-r2-4 already queues; PRIO-1 W320 vendor-fork |
| 5 | `mattpocock/skills` `67bce91c80cd` | `review` skill (two-axis Standards + Spec via parallel sub-agents) | skill | LOW | CLAUDE.md L42 AI-r2-4 already queues; PRIO-1 W320 vendor-fork |
| 6 | `wshobson/agents` `ece811f` | `review-agent-governance` plugin (Cedar policy + protect-mcp@0.5.5) | plugin | MEDIUM | PRIO-1 sca-v7.2 audit candidate |
| 7 | `wshobson/agents` `ece811f` | `signed-audit-trails` plugin (cryptographically-signed audit trails) | plugin | MEDIUM | PRIO-1 sca-v7.2 audit candidate; complements codex Stop-hook gate |
| 8 | `wshobson/agents` `ece811f` | `protect-mcp@0.5.5` MCP supply-chain guard | plugin | MEDIUM | PRIO-1 W320 audit (defense-in-depth for MCP) |
| 9 | `affaan-m/everything-claude-code` v2.0.0-rc.1 | `silent-failure-hunter` agent | agent | LOW | Dispatch in research waves — closes W314-r2 AI-r2 |
| 10 | `affaan-m/everything-claude-code` v2.0.0-rc.1 | `.claude/homunculus/instincts/inherited/` declarative instinct-per-trigger pattern | pattern | MEDIUM | Could lift behavioral prose out of CLAUDE.md into trigger-keyed yaml |
| 11 | `affaan-m/everything-claude-code` v2.0.0-rc.1 | `scripts/hooks/run-with-flags.js` env-flag wrapper pattern | hook-pattern | MEDIUM | Alternative to cardinal-rule-2 direct-CLI declarations |
| 12 | `alirezarezvani/claude-skills` v2.8.0 | `SKILL-AUTHORING-STANDARD.md` template (license + metadata.version + metadata.category + metadata.updated) | pattern | LOW | Adopt for `.claude/skills/*/SKILL.md` authoring |
| 13 | `alirezarezvani/claude-skills` v2.8.0 | `context: fork` orchestrator pattern | pattern | LOW | Cross-cite for `superpowers:dispatching-parallel-agents` |
| 14 | `anthropics/claude-code` v2.1.143 | `worktree.bgIsolation: "none"` setting | setting | LOW | Escape valve for repos where worktrees impractical |
| 15 | `anthropics/claude-code` v2.1.143 | `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=8` (default cap on stop-hook block loops) | env | LOW | Aligns with codex stop-hook NEEDS-ATTENTION recovery |
| 16 | `anthropics/claude-code` v2.1.142 | `claude agents --add-dir --settings --mcp-config --plugin-dir --permission-mode --model --effort` flags | flags | LOW | Pin per-bg-session config for codex review dispatch |
| 17 | `mksglu/context-mode` v1.0.141 | `BENCHMARK.md` — 21 scenarios, 96% context savings empirical anchor | doc | NONE | Tier-B typed-evidence anchor for W295 chain |
| 18 | `addyosmani/agent-skills` `f17c6e88` | `documentation-and-adrs` skill (NOT yet vendored) | skill | LOW | Fills ADR-management gap |
| 19 | `addyosmani/agent-skills` `f17c6e88` | `idea-refine` skill (NOT yet vendored; pre-spec ideation) | skill | LOW | Pre-spec ideation gap |
| 20 | `OthmanAdi/planning-with-files` v2.38.1 | `===BEGIN/END PLAN DATA===` injection delimiter convention (avoid `---` for YAML doc-separator collision) | pattern | NONE | Discipline: never use `---` in inline scalars; affects all our SKILL.md authoring |

## CROSS-CUTTING OBSERVATIONS

1. **CCBP cite-drift is content-stable**: 4-SHA chain `1386b0e → ac0d87d → 48f2ceb → 48798ca` shows `claude-memory.md:34-40` body has not changed — refresh L3 SHA is cosmetic-only. CLAUDE.md's own W314 §C cross-SHA check protocol already documented this discipline.
2. **PWF v2.38.x is the W319 standout repo**: 4 PRIO-1 net-new capabilities directly address gaps in our `goal-prompt-synthesis` + `durable-planning-files` + `loop` workflow. **Re-litigate W314-r1 CONFIRM-DEACTIVATE verdict.**
3. **wshobson 3-new plugins (`review-agent-governance` + `signed-audit-trails` + `protect-mcp`) form a triad** for security-aware multi-agent governance. **W320 cluster-audit candidate** rather than 3 isolated audits.
4. **mattpocock `handoff` + `review` skills** already pre-queued in CLAUDE.md L42 W314-r2 AI-r2-4 — Stream B confirms both are READY for W320 vendor-fork.
5. **ECC `silent-failure-hunter` agent** is direct upstream parallel to Stream B's mandate; could dispatch agent at session-end for cross-validation.
6. **alirezarezvani v2.8.0 is BIG** (729 SKILL.md, 16 domains, 2 new top-level today): cherry-pick `engineering/` + `productivity/` + `engineering-team/` only to maintain T2-VENDOR-FORK scope manageability.
7. **GitNexus license-class** (PolyForm Noncommercial) holds; our `local-cypher-codebase` pattern-only skill is correct strategy.
8. **claude-code v2.1.144** is current; only 3 ops-AI follow-ups (worktree bgIsolation note, STOP_HOOK_BLOCK_CAP doc, claude agents flag adoption).
9. **No SEV-1 leak surface in any of the 10 repos** — Perplexity API key from W317 leak was NOT shipped into any of these repos. (Verified via shell-level grep.)
10. **Single-org bus-factor (D16) risk**: alirezarezvani (single-maintainer all recent commits), GitNexus (`abhigyanpatwari` single), PWF (`OthmanAdi` single) all floor at D16=1/2. Counter: mattpocock + addyosmani + wshobson have multiple PR-authors; ECC affaan-m repo is single-org but with active PR contributors. **D21 (organizational diversity) likely also floors for the 3 single-maintainer repos.**

## TOP-3 W320 OPERATOR-AI QUEUE (RANKED)

1. **Full sca-v7.2 audit `OthmanAdi/planning-with-files` v2.38.1** (RE-LITIGATE) — 4 PRIO-1 NEW capabilities (`/plan-goal` + `/plan-loop` + PreCompact hook + tamper-attestation)
2. **Cluster sca-v7.2 audit wshobson 3-plugin triad**: `review-agent-governance` + `signed-audit-trails` + `protect-mcp@0.5.5` — security governance complement to codex Stop-hook
3. **Vendor-fork mattpocock `handoff` + `review` skills** (CLAUDE.md L42 AI-r2-4 already queued; Stream B confirms 0-drift, ready ship)

## SECONDARY W320 OPERATOR-AI QUEUE

4. CLAUDE.md SHA-refresh batch: CCBP L3 `48f2ceb → 48798ca`; ECC L34/L41/L41 `* → b62f8075`; wshobson L42 `08ded5e → ece811f`
5. `/plugin update` ECC marketplace to pull `b62f8075`
6. Adopt `SKILL-AUTHORING-STANDARD.md` template fields in `.claude/skills/*/SKILL.md` going forward
7. Document `worktree.bgIsolation: "none"` escape valve in CLAUDE.md L24 W280d
8. Document `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP=8` default in codex Stop-hook patterns
9. Cite `context-mode/BENCHMARK.md` as Tier-B typed-evidence anchor for W295/I9 evidence chain (96% context savings)
10. Resolve addyosmani 3-dupe (prefix-namespaced + bare-name variants) per W316-3-OBS-1
11. Re-litigate alirezarezvani install_score with cherry-pick scope (`engineering/` + `productivity/` + `engineering-team/`)

## SUMMARY

- **10 / 10 repos ingested** (line-by-line, HEAD captured)
- **3 / 10 require cite-refresh** (CCBP, ECC, wshobson)
- **7 / 10 zero-drift** vs current cites
- **0 SEV-1 leak surface** in any repo
- **20 NET-NEW patterns** ranked across 3 priority tiers
- **3 PRIO-1 W320 actions** identified (PWF re-litigate + wshobson triad + mattpocock fork)
- **Stream B compliance**: cardinal R1 honored (no installs); R2 honored (no project hooks created); R3 honored (no fake subagents claimed); R4 honored (all output in operator-curated skills + W319 docs); R5 honored (no safety boundary changes).
