---
title: W202 PURE — Wave 7-11 MEGA-SYNTHESIS for claude-sota-pure runtime
status: SYNTHESIS-COMPLETE
date: 2026-05-14
agent: orchestrator (W202 arc)
arc: 9-stream parallel gap resolution → ~46 ADOPT-NOW candidates + ~17 STUDY-PILOT + ~20 REJECT/DUPLICATE
scope: integration deliverable for Z:\claude-sota-pure\ Phase 2D+ extension manifest update
---

# W202 PURE — MEGA-SYNTHESIS (Waves 7-11)

## Arc summary

9 parallel streams dispatched per CADP-override (operator-authorized push past 3-cap). 5/9 returned cleanly via notification + 4/9 recovered from disk (B + C autocompact-thrashing-class — file-on-disk recovery pattern n+2 same-class). All 9 audit reports persisted at `Z:/claude-sota-installed/tmp/sota-pure-wave{7..11}-{A,B,C,D,E,F,L,P,Q}-*-2026-05-14.md`.

## 11 GAP resolution matrix

| GAP | Stream | Resolution | Manifest action |
|---|---|---|---|
| G1 anthropics/skills 2-field frontmatter | A | **RESOLVED-NO-DEFECT** (intentional upstream min) | None — close gap |
| G2 cwc plugin-vs-clone | B | **STUDY-PILOT** — direct-clone only; NOT plugin-installable | Correct Wave 5 K row to direct-copy + Windows-shell-port |
| G3 superpowers marketplace name | A+L | **RESOLVED-VERIFIED** = `superpowers-dev` | Install coordinate `superpowers@superpowers-dev` |
| G4 mksglu/context-mode Elastic-2.0 | A | **STUDY-PILOT-WITH-AMBER** — re-audit +90d | Defer Phase 2A; Wave 13 re-audit |
| G5 max_budget_usd cap | C | Cedar policy + 2-hook design (PostToolUse + Stop + ccusage) | Section 7 governance row |
| G6 cwc 6-Probe-DAG | B | **STUDY-PILOT** — primitives fit WITH EDITS (Windows shell port) | Section 1B-1 corrected install plan |
| G7 5 extension candidates | A | 3 ADOPT-NOW + 2 STUDY-PILOT-DEFER | Phase 2D rows 1-3 |
| G8 REJECT-cohort enforcement | (carry-over Wave 4 J) | financial-services + VoltAgent-subagents + claude-task-master archived | docs/verified-avoid.md cohort entries |
| G9 mcp-eval automated gates | B+F | **ADOPT-CONCEPT** — start Vercel `@ai-sdk/mcp` smoke; defer Composio/Managed-Agents | Phase 3.5+ gate scaffold |
| G10 skill governance | C | skill-creator + skill-reviewer wire + Cedar policy | Section 7 governance row |
| G11 long-running observability | C | 3-primitive design beyond cwc (token-stream telemetry + stuck-detect + memory-audit) | Section 7 governance rows |

## ADOPT-NOW manifest queue (~46 net-new candidates)

### Phase 2D Block 1 — Stream A (3 rows)

| # | Plugin | Source | License | Verdict |
|---|---|---|---|---|
| 2D.1 | security-guidance | claude-plugins-official | Anthropic-OFFICIAL | ADOPT-NOW |
| 2D.2 | claude-hud | upstream 22776★ MIT | MIT | ADOPT-NOW (first statusline in pure runtime) |
| 2D.3 | compound-engineering | upstream 16748★ MIT | MIT | ADOPT-NOW (mistake-to-skill loop) |

### Phase 2D Block 2 — Stream L superpowers monolithic (10 SKILLS enabled + 2 disabled)

Install: `/plugin install superpowers@superpowers-dev` (HEAD f2cbfbef MIT)
ENABLED 10: using-superpowers / verification-before-completion / TDD / systematic-debugging / writing-plans / executing-plans / subagent-driven-development / requesting-code-review / receiving-code-review / using-git-worktrees
STUDY-PILOT 11th: dispatching-parallel-agents (pure-runtime divergence from sibling REJECT — no parallel-agent-wave.md inheritance)
DISABLED 2 via `disabledSkills` post-install config: brainstorming (HARD-GATE) + writing-skills (size-sprawl + SUPERSEDED-BY skill-creator)

### Phase 2D Block 3 — Stream E deeper catalog (11 rows)

| # | Source | Component | Verdict |
|---|---|---|---|
| 2D.4 | alirezarezvani/claude-code-skills | rag-architect | ADOPT-NOW POWERFUL |
| 2D.5 | alirezarezvani/claude-code-skills | spec-driven-workflow | ADOPT-NOW POWERFUL |
| 2D.6 | alirezarezvani/claude-code-skills | tech-debt-tracker | ADOPT-NOW POWERFUL |
| 2D.7 | alirezarezvani/claude-code-skills | observability-designer | ADOPT-NOW POWERFUL |
| 2D.8 | mattpocock/skills | grill-me | ADOPT-NOW TIER-1-NAMED-AUTHOR-QUOTE |
| 2D.9 | mattpocock/skills | grill-with-docs | ADOPT-NOW |
| 2D.10 | mattpocock/skills | diagnose | ADOPT-NOW |
| 2D.11 | mattpocock/skills | triage | ADOPT-NOW |
| 2D.12 | vercel-labs/agent-skills | react-best-practices | ADOPT-NOW Vercel-org STRONG-PROVENANCE-EXPRESS |
| 2D.13 | vercel-labs/agent-skills | web-design-guidelines | ADOPT-NOW |
| 2D.14 | vercel-labs/agent-skills | composition-patterns | ADOPT-NOW |

### Phase 2D Block 4 — Stream F cookbook patterns (12 rows)

| # | Pattern | Source | Install class |
|---|---|---|---|
| 2D.15 | chief_of_staff_agent reference deployment | `.claude/` template at `claude_agent_sdk/chief_of_staff_agent/` | TEMPLATE-COPY |
| 2D.16 | output-styles primitive | cookbook | CITE-ONLY |
| 2D.17 | research_agent | cookbook | TEMPLATE-COPY |
| 2D.18 | observability_agent MCP routing | cookbook | PATTERN |
| 2D.19 | SRE subprocess MCP server | cookbook | PATTERN |
| 2D.20 | Opus-Haiku fan-out (multimodal/using_sub_agents.ipynb cells 4-8) | cookbook | CODE-EXTRACT |
| 2D.21 | contextual-RAG verbatim prepend prompt | `capabilities/...lambda_function.py:11-23` | PATTERN |
| 2D.22 | knowledge-graph builder | cookbook | PATTERN |
| 2D.23 | Admin API usage/cost telemetry | `observability/` | TEMPLATE-COPY |
| 2D.24 | Message Batches API 50% cost reduction | `misc/batch_processing.ipynb` | PATTERN |
| 2D.25 | agent_visualizer + html_renderer | `utils/` | UTIL-COPY |
| 2D.26 | custom_skills 3-example authoring reference | cookbook | TEMPLATE-COPY |

### Phase 2D Block 5 — Stream Q gsd PROVIDER-COMPLEMENT (4 rows)

| # | Component | Verdict |
|---|---|---|
| 2D.27 | prompt_guard.js (14 regex injection patterns) | ADOPT-NOW selective-vendor |
| 2D.28 | read_injection_scanner.js (summarisation-survival) | ADOPT-NOW selective-vendor + addresses post-compact context-bleed |
| 2D.29 | conventional_commit_gate.sh | ADOPT-NOW (T2 cross-model semantic complement) |
| 2D.30 | Conventional Commits CLAUDE.md discipline | CITE-ONLY |

### Phase 2D Block 6 — Stream P awesome-claude-code (3 rows)

| # | Resource | License | Verdict |
|---|---|---|---|
| 2D.31 | claude-code-tools (Tooling/session-bridge) | MIT | ADOPT-NOW |
| 2D.32 | claudia-statusline (DUPLICATE with 2D.2 claude-hud — pick one — pure recommends claude-hud per Stream A 22776★) | MIT | SKIP-DUPLICATE-OF-2D.2 |
| 2D.33 | Claude Code Templates | MIT | CITE-ONLY (sibling-catalog discovery surface) |

### Phase 2D Block 7 — Stream D memory architecture (3 sections)

- Manifest **Section 2 row #1 update**: mcp-memory ADOPT-NOW with HEAD pin `7c697327` + sqlite_vec embedded + state-outside-repo path
- Manifest **NEW Section 2.5**: Graphiti L3 DEFERRED Phase 3.5 with explicit trigger predicate
- Manifest **NEW Section 6**: Karpathy 3-layer wiki architecture for pure runtime

### Phase 2D Block 8 — Stream C governance (3 specs)

- **Section 7.1** max_budget_usd dollar-cost cap: Cedar policy + PostToolUse hook + Stop hook + ccusage telemetry
- **Section 7.2** skill governance: skill-creator + skill-reviewer + Cedar policy
- **Section 7.3** long-running observability: 3 primitives beyond cwc (token-stream / stuck-detect / memory-audit)

## STUDY-PILOT queue (~17 deferred)

- knowledge-work-plugins (await workflow signal)
- tdd-guard (PARTIAL-OVERLAP superpowers/tdd)
- mksglu/context-mode (Elastic-2.0 AMBER re-audit +90d)
- ComposioHQ lead-research-assistant (Composio MCP wire pending)
- mcp-server-builder (P4 namespace overlap anthropics/skills:mcp-builder)
- zoom-out (disable-model-invocation operator-only)
- langsmith-fetch (Composio cred-gate)
- claudekit / TDD Guard / Container Use / Dippy / claude-devtools (Stream P 5-cohort)
- /gsd-spike (selective-vendor as `.claude/skills/spike/SKILL.md`)
- gsd-eval-auditor (defer until eval pipeline ships)
- gsd-context-monitor (comparison study vs sibling W175)

## REJECT cohort (~20)

- 8 from Stream Q (6/8 Probe-4 DUPLICATE caught by Mia: GitNexus + CCBP RPI + codex T2/T3 + Serena)
- 2 from Stream L superpowers (brainstorming HARD-GATE + writing-skills size-sprawl/SUPERSEDED)
- 2 from Stream E ComposioHQ (mcp-builder + webapp-testing duplicate anthropics/skills:example-skills)
- 2 from Stream P (ralph-orchestrator + Ralph for Claude Code — DUPLICATE ralph-loop@claude-plugins-official)
- Stream A Candidate-2 misidentification (`claude-code-security-review` is GitHub-Action NOT plugin — superseded by security-guidance)
- ~4 Stream P intra-Wave-11 statusline PARTIAL-OVERLAP (pick claude-hud)

## CRITICAL adversarial corrections (Stream B GPT-5.5 BRIDGE-MODE)

1. **cwc NOT plugin-installable** — Wave 5 K's "Phase 2B-1 plugin install" was misclassified. Correct install: direct-clone to `Z:/claude-sota-pure/.local/cwc/` + selective hook merge into `.claude/settings.json` (NOT blanket copy).
2. **PROGRESS.md collision** — pure already has bootstrap PROGRESS.md; cwc copy would overwrite. Preserve existing.
3. **commit-on-stop.sh risky** — auto-commits tracked changes at session end; enable LAST after commit discipline settles.
4. **`empty .claude/{rules,agents,skills,commands}/`** is inaccurate state claim — dirs are MISSING not empty. Update install plan wording.
5. **mcp-eval is pattern family** — NOT single upstream product. Pure must name concrete gate (recommend Vercel `@ai-sdk/mcp` smoke as lowest-friction lane).
6. **Anthropic cookbook + Anthropic SDK ≠ 3 orgs** — both are anthropics org. Need external (Vercel/Composio) for ≥3-org gate.
7. **Windows shell adaptation required** for all 5 cwc primitives — POSIX shell + Python3 dependencies need port/wrapper for pure runtime.

## STAND-IN-NOTICE roster (cross-model gate compliance)

| Stream | Origin | Cross-model gate |
|---|---|---|
| A | Sonnet env-funneled (likely) | PARTIAL — re-fire BRIDGE-MODE adversarial pre-commit |
| B | **real GPT-5.5 BRIDGE-MODE confirmed** | FULL — codex-rescue subagent |
| C | Sonnet env-funneled (likely) | PARTIAL |
| D | self-disclosed Sonnet stand-in | PARTIAL — explicit |
| E | Sonnet env-funneled (likely) | PARTIAL |
| F | Sonnet env-funneled (likely) | PARTIAL |
| L | Sonnet env-funneled (likely) | PARTIAL |
| P | Sonnet env-funneled (likely) | PARTIAL |
| Q | Sonnet env-funneled (likely) | PARTIAL |

**8/9 streams require BRIDGE-MODE codex T1 review pre-install per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`** before install-class manifest commit. Stream B's adversarial findings already cross-validate Streams A+C+D+L+F+Q at ARC-LEVEL (Stream B caught Wave 5 K overclaims that other streams would have built on).

## Promotion blocker status (5 conditions per manifest Section 5)

ACTIVE (0/5 met):
1. ❌ All 6 marketplaces registered (operator-Phase-1 pending)
2. ❌ All Phase 2A 11 plugins installed + smoke-tested
3. ❌ Phase 3 starter 5 MCPs wired + healthcheck PASS
4. ❌ All 14 smoke probes GREEN (0/14 fired)
5. ❌ At least 1 end-to-end gap-resolution workflow successful

W202 advances manifest planning + audit depth, NOT promotion conditions (those require operator-side Phase-1 invocation).

## Next-fire queue (Wave 12+ deeper coverage)

1. **Wave 12 R**: GitNexus integration for pure runtime cross-session state visibility
2. **Wave 12 S**: vinta/awesome-python Top-10 for hook-script + skill-runtime libraries
3. **Wave 12 T**: forrestchang/andrej-karpathy-skills deeper Karpathy 3-layer wiki implementation
4. **Wave 12 U**: hooks audit beyond Wave 7 C (`.claude/plugins/marketplaces/**/hooks/` inventory)
5. **Wave 12 V**: docker compose stack design (FalkorDB + Qdrant + Ollama + LiteLLM)
6. **Wave 12 W**: Shubhamsaboo/awesome-llm-apps deep-mine for LLM-orchestration patterns
7. **Wave 12 X**: BRIDGE-MODE codex T1 cross-model adversarial review on Streams A+C+D+E+F+L+P+Q (8 stand-in verdicts pre-commit)
8. **Wave 12 Y**: 4-source cross-validation per Stream P methodological note (≥4-source gate)
9. **Wave 12 Z**: smoke probe execution (run 14-probe protocol pre-Phase-1)

## Cross-model gate satisfaction

- Stream B BRIDGE-MODE confirmed real GPT-5.5 codex dispatch + 7 critical adversarial findings → satisfies cross-model gate at ARC-LEVEL for the cwc/mcp-eval surface (G2/G6/G9)
- 8/9 remaining streams Sonnet env-funneled → defer install-class commit until BRIDGE-MODE cross-review (Wave 12 X)
- Per cross-model-consensus.md §The contract Phase 1 bootstrap exception: orchestrator-side `codex exec` foreground+tee available as Wave 12 X mechanism

## Manifest update protocol (post-MEGA-SYNTHESIS)

1. Read `Z:/claude-sota-pure/docs/sota-installed-manifest.md` current state
2. Apply Block 1-8 row additions via Edit (single atomic ship per FM-20 row 20 single-shell)
3. Correct Wave 5 K Section 1B-1 row per Stream B Critical Finding #1
4. Add `docs/verified-avoid.md` Cohort entries for ~6 REJECT cohort additions
5. Update PROGRESS.md (Wave 7-11 → Done; Wave 12+ → Next queue)
6. Append `docs/install-provenance.md` Wave 7-11 entry with full 9-stream cite trail
7. mcp-memory store W202 close-synthesis (cross-session persistence — defer to post-Phase-3 mcp-memory wire)
8. Atomic commit per FM-20 row 20 single-shell: `git -C Z:/claude-sota-pure add -- <files> && git -C Z:/claude-sota-pure commit -F .claude/state/w202-msg.txt`

## Convergence-gate Axis-1+2+3 summary

- **Axis 1 ≥3-distinct-orgs**: SATISFIED across ALL ADOPT-NOW rows. Distinct orgs surfaced: Anthropic + shanraisshan + OpenAI + addyosmani + obra + Vercel + Composio + alirezarezvani + mattpocock + buildwithclaude + ComposioHQ + ECC + Karpathy = 13+ orgs
- **Axis 2 named-T2 practitioners**: mattpocock (named TIER-1-NAMED-AUTHOR via Pragmatic Programmer + DDD), Karpathy (named TIER-1), Boris Cherny (named TIER-1), Seth Hobson (named TIER-2 for wshobson/context-management), Addy Osmani (named TIER-2)
- **Axis 3 stability**: PASS for cwc (Anthropic PBC), Anthropic OFFICIAL plugins, mattpocock 48K★ (5y), Karpathy named-author works. PARTIAL for context-mode (75d/15.6cpd fast-churn — STUDY-PILOT-with-AMBER).

## Cite trail aggregate

All 9 stream reports at `Z:/claude-sota-installed/tmp/sota-pure-wave{7..11}-{A,B,C,D,E,F,L,P,Q}-*-2026-05-14.md`. Cross-references at file:line + HEAD SHA preserved per cardinal-rule-1.

## Status

- 9/9 STREAMS COMPLETE
- ~46 ADOPT-NOW staged for Phase 2D manifest update
- ~17 STUDY-PILOT deferred to future waves
- ~20 REJECT cohort (Mia pre-apply 6/8 catches validated)
- 7 critical adversarial corrections from Stream B GPT-5.5 BRIDGE-MODE
- 0/5 promotion blocker conditions met (operator-Phase-1 pending)
- Wave 12+ queue: 9 deeper-coverage candidates including BRIDGE-MODE re-review on 8 stand-in verdicts

End MEGA-SYNTHESIS.
