---
title: W206-W209 Master Catalog — pure-runtime SOTA convergence research synthesis
status: AUTHORITATIVE-INDEX
date: 2026-05-15
scope: Index + cumulative ADOPT-NOW/STUDY-PILOT/REJECT-FOR-FIT/HNF across 12 wave artifacts
purpose: organize-for-deep-dive-without-bias per operator directive "orgnize all the research artifect in this folder form all layers"
cross-model-gate: PENDING — all 12 agent dispatches ran as Sonnet stand-in per CLAUDE.local.md ENV (g); real GPT-5.5 BRIDGE-MODE Path P verification queued for W210+ on cumulative ADOPT-NOW set
target-runtime: Z:\claude-sota-pure\ (currently 15 commits HEAD `4a20462`; 14 MCPs + 21 enabled plugins + 5 cwc native hooks wired)
---

# W206-W209 Master Catalog

## 1. Artifact Index (12 files)

| Wave | Agent | Topic | File | Status |
|---|---|---|---|---|
| W206 | A | C5+C6+C8+C9 cohort fan-out (7 ADOPT + 7 STUDY) | `tmp/wave206-agentA-c5c6c8c9-2026-05-15.md` (referenced via `tmp/wave206-comprehensive-checklist-2026-05-15.md`) | AUTHORITATIVE |
| W206 | B | Anthropic OFFICIAL 14-layer install matrix (47 CHANGELOG + 10 marketplaces) | `tmp/wave206-comprehensive-checklist-2026-05-15.md` | AUTHORITATIVE |
| W206 | C | 12 workflow pillars + daily checklist | `tmp/wave206-comprehensive-checklist-2026-05-15.md` | AUTHORITATIVE |
| W207 | D | Memory MCP + temporal-KG deep-dive (mem0+memvid+Letta NEW bands) | `tmp/wave207-agentD-memory-mcp-deep-2026-05-15.md` | AUTHORITATIVE |
| W207 | E | Open RAG ecosystem (8 Tier-1 chonkie/markitdown/unstructured/TEI/claude-context/ragas/deepeval/phoenix) | `tmp/wave207-agentE-open-rag-deep-2026-05-15.md` | AUTHORITATIVE |
| W207 | F | Eval+Obs+LongRun+Sandbox (cwc 5+3 line-by-line + 7 Tier-1) | `tmp/wave207-agentF-eval-obs-longrun-sandbox-2026-05-15.md` | AUTHORITATIVE |
| W208 | G | Skills ecosystem (mattpocock + vercel-labs + codex@openai + superpowers unvendored) | `tmp/wave208-agentG-skills-ecosystem-deep-2026-05-15.md` | AUTHORITATIVE |
| W208 | H | Orchestration patterns (agent-sdk-dev + superpowers exec-plans + Piebald + awesome-agentic-patterns) | `tmp/wave208-agentH-orchestration-patterns-deep-2026-05-15.md` | AUTHORITATIVE |
| W208 | I | Code-intel + browser + sec (Anthropic MCP-filesystem/git + trivy + syft + ast-grep CLI) | `tmp/wave208-agentI-codeintel-browser-sec-deep-2026-05-15.md` | AUTHORITATIVE |
| W209 | J | Token-eff + cost-opt (cnighswonger-cache-fix + instructor + chonkie) | `tmp/wave209-agentJ-token-eff-cost-opt-deep-2026-05-15.md` | AUTHORITATIVE |
| W209 | K | Plugin marketplace + hooks ecosystem (ECC 42 + Continuous-Claude-v3 19) | `tmp/wave209-agentK-marketplace-hooks-deep-2026-05-15.md` | AUTHORITATIVE |
| W209 | L | Long-arc resilience + agent-definition catalogs (PROGRESS.md + worker-fork + Piebald 100+) | `tmp/wave209-agentL-longarc-agents-deep-2026-05-15.md` | AUTHORITATIVE |

## 2. Cumulative ADOPT-NOW (28 candidates across all 12 artifacts)

| # | Wave-Agent | Candidate | Category | CR-12 disposition | Install path |
|---|---|---|---|---|---|
| 1 | W208 G | mattpocock-skills full engineering pack (8 skills) MIT @ HEAD 733d312 | Skills | GENUINELY-NEW (5 ADOPT subset; diagnose/tdd/improve-codebase-architecture/grill-with-docs/zoom-out) | marketplace.json verify; ELSE cite-import §14.5 |
| 2 | W208 G | vercel-labs/agent-skills 4-core pack MIT @ HEAD b9c8ee0 | Skills | GENUINELY-NEW (react-best-practices 70-rule + composition-patterns + view-transitions + web-design-guidelines) | marketplace.json verify; ELSE cite-import |
| 3 | W208 G + W210-pending | codex@openai-codex 3-skill pack (codex-cli-runtime + codex-result-handling + gpt-5-4-prompting) Apache-2.0 @ openai-codex@1.0.4 | Skills | GENUINELY-NEW (bridges CR-3 cross-model gate at skill layer) | `/plugin install codex@openai-codex@1.0.4` |
| 4 | W208 G | superpowers/skills/dispatching-parallel-agents @ HEAD e7a2d164 MIT | Skills | GENUINELY-NEW (not in 6-vendored set) | superpowers@claude-plugins-official already enabled — verify skill in manifest OR vendor |
| 5 | W208 G | superpowers/skills/executing-plans @ HEAD e7a2d164 MIT | Skills+Orch | GENUINELY-NEW (close-the-loop pair) | same as #4 |
| 6 | W208 H | anthropics agent-sdk-dev plugin (Anthropic OFFICIAL) | Orchestration | GENUINELY-NEW (cwc reference plugin per CLAUDE.md L294) | already enabled in pure runtime (W207 install) |
| 7 | W208 H | superpowers/skills/finishing-a-development-branch @ HEAD e7a2d164 MIT | Orchestration | GENUINELY-NEW (close-the-loop sub-skill) | same as #4 |
| 8 | W208 H | Piebald-AI agent-prompt-worker-fork.md (cite-anchor TIER-1 derivative) | Orchestration | CITE-CLASS-CANONICAL — ratifies CLAUDE.local.md ENV (e) | rule cite-anchor (no install) |
| 9 | W208 H | awesome-agentic-patterns Factory-over-Assistant.md @ HEAD ffb42768 | Orchestration | CITE-CLASS-CANONICAL (parent-design philosophy anchor) | rule cite-anchor |
| 10 | W208 H | awesome-agentic-patterns Compounding-Engineering-Pattern.md @ HEAD ffb42768 | Orchestration | CITE-CLASS-CANONICAL (Karpathy §5 named-author anchor) | rule cite-anchor |
| 11 | W208 I | modelcontextprotocol/server-filesystem Apache-2.0 @ HEAD acedea0c | Code-intel | GENUINELY-NEW (Anthropic-OFFICIAL MCP suite — biggest CR-12 PRIMARY gap) | `npx -y @modelcontextprotocol/server-filesystem </path>` per CR-12 PRIMARY |
| 12 | W208 I | modelcontextprotocol/server-git Apache-2.0 @ HEAD acedea0c | Code-intel | GENUINELY-NEW | `uvx mcp-server-git --repository <path>` |
| 13 | W208 I | aquasecurity/trivy Apache-2.0 @ HEAD e4325b18 (SLSA-3) | Security | PROVIDER-COMPLEMENT to osv-scanner (IaC + container + sensitive info) | `gh release download --repo aquasecurity/trivy <tag>` |
| 14 | W208 I | anchore/syft Apache-2.0 @ HEAD ee6ace36 (SBOM) | Security | GENUINELY-NEW (SBOM generator for install-provenance.md audit) | `gh release download --repo anchore/syft <tag>` |
| 15 | W208 I | ast-grep/ast-grep CLI dual MIT/Apache-2.0 @ HEAD master | Code-intel | PARTIAL-OVERLAP w/ serena LSP (tree-sitter AST pattern vs LSP semantic) — Mia probe alternate paths per W112 Ship 2CC n=36 | `cargo install ast-grep --locked` OR `npm install -g @ast-grep/cli` |
| 16 | W209 J | cnighswonger-claude-code-cache-fix v3.0.3 MIT @ HEAD 2f17aeb9 | Token-eff | GENUINELY-NEW (MEASURED 95.5% vs 82.3% cache-hit; 7 hot-reload extensions) | `npm install -g claude-code-cache-fix@3.0.3` + `ANTHROPIC_BASE_URL=http://127.0.0.1:9801` |
| 17 | W209 J | jxnl/instructor v1+ MIT @ HEAD 3f1d6ddb (Pydantic structured-output) | Token-eff | GENUINELY-NEW (operationalizes SHAPE-CLAIM gate at synthesis-layer-verify.md §Output-form modifier) | `pip install instructor` |
| 18 | W209 J | chonkie-inc/chonkie v1+ MIT @ HEAD 39d2ef35 (9 chunkers + SIMD) | Token-eff | GENUINELY-NEW (library-primitive chunker for graphiti+mcp-memory pre-embed) | `pip install chonkie[all]` |
| 19 | W209 K | ECC `block-no-verify.js` hook | Hooks | GENUINELY-NEW (CR-1 hard-rule enforcement) | wire to `.claude/settings.json` PreToolUse `Bash` |
| 20 | W209 K | ECC `mcp-health-check.js` hook | Hooks | GENUINELY-NEW (closes mcp-disconnect-recovery.md D1-D6 gap) | wire to `.claude/settings.json` PreToolUse + PostToolUseFailure |
| 21 | W209 K | ECC `governance-capture.js` hook | Hooks | GENUINELY-NEW (audit-action-loop.md Stage-2 universal Surface) | wire to multiple hook events |
| 22 | W209 K | Continuous-Claude-v3 `compiler-in-the-loop` hook | Hooks | GENUINELY-NEW (verify-loop per Karpathy P4) | wire to PostToolUse + Stop |
| 23 | W209 K | Continuous-Claude-v3 `file-claims` hook | Hooks | GENUINELY-NEW (parallel-session FM-02 mechanical lock) | wire to PreToolUse:Edit |
| 24 | W209 L | PROGRESS.md + Pipeline Status long-arc handoff convention | Long-arc | GENUINELY-NEW (rule codification) | new `.claude/rules/long-arc-handoff-discipline.md` ~80 LOC |
| 25 | W209 L | gsd context-monitor bridge-file PostToolUse pattern | Long-arc | PARTIAL-OVERLAP (complements userpromptsubmit_compact_threshold.py) | extract gsd pattern → repo-local PostToolUse hook ~60 LOC |
| 26 | W209 L | Anthropic /rewind primitive discipline codification | Long-arc | GENUINELY-NEW (rule codification of RUNTIME-NATIVE primitive) | new `.claude/rules/rewind-discipline.md` ~40 LOC OR section in closed-loop-recursive-narrowing.md |
| 27 | W209 L | Piebald "Worker fork" 4-rule discipline | Long-arc | CITE-CLASS-CANONICAL (ratifies CLAUDE.local.md ENV (e)) | section in team-orch-state-spawning.md ~30 LOC |
| 28 | W209 L | cwc evaluator pattern dogfood VERIFY | Long-arc | ALREADY INSTALLED — verify invocation surface | `claude --agent evaluator -p "..."` verify; cross-ref in verifier.md |

## 3. Cumulative STUDY-PILOT-NARROW (~50 candidates) — summarized by category

| Category | Top STUDY-PILOT candidates | Wave-Agent owners |
|---|---|---|
| **Skills (15+)** | mattpocock zoom-out/grill-me/triage/caveman/git-guardrails (W208G); vercel-labs react-view-transitions/react-native/vercel-cli (W208G); codex-result-handling/gpt-5-4-prompting (W208G); superpowers finishing-a-development-branch + receiving-code-review (W208G) | W208 G |
| **Orchestration (10+)** | wshobson plugin-eval (3-layer rubric) / review-agent-governance (Cedar+Ed25519) / awesome-agentic-patterns Adaptive-Sandbox-Fan-Out + Deterministic-Zero-LLM + Lane-Based-Queue + Multi-Model-Orch + Hybrid-LLM-Code-Workflow-Coordinator + LLM-Map-Reduce-Pattern | W208 H |
| **Code-intel/Browser/Sec (10+)** | MCP-fetch + MCP-memory + MCP-sequential-thinking (Anthropic OFFICIAL); brave-search-mcp; apify/crawlee-python; semgrep SAST | W208 I |
| **Token-eff (10+)** | BerriAI/LiteLLM (PROVIDER-COMPLEMENT vs CLIProxyAPI); open-compress/claw-compactor (PARTIAL-OVERLAP); openlit (DEFER eval-obs); traceloop/openllmetry-python (NOT in deps/); cnighswonger Docker-isolated proxy | W209 J |
| **Marketplace+Hooks (15+)** | ECC gateguard-fact-force + config-protection + quality-gate + cost-tracker + session-start-bootstrap; CC-v3 skill-activation-prompt + memory-awareness + impact-refactor; ComposioHQ awesome-claude-skills 78-SaaS pilot; gstack codex skill | W209 K |
| **Long-arc+Agents (10)** | ARIS dse-loop + auto-review-loop-llm SKILLs; gsd /pause-work + /resume-work; wshobson team-communication-protocols + task-coordination-strategies + parallel-debugging; Continuous-Claude maestro/arbiter/scribe pattern-extracts; UserPromptSubmit + SubagentStop + SessionEnd native hooks | W209 L |
| **Memory MCP (14)** | chroma + qdrant-mcp + basic-memory + cognee + mcp-knowledge-graph + lancedb + memgraph-community + token-savior + vestige + phantom + nocturne_memory + OpenSPG + memory-bank-mcp + surrealdb | W207 D |
| **Open RAG (6)** | graphrag + RAGatouille (WSL2-only) + pyserini + haystack + llama_index + R2R | W207 E |
| **Eval+Obs (8)** | inspect_ai + deepeval v4.0.0 + promptfoo + traceloop-sdk + langfuse + litellm + gitleaks + cwc 5+3 ALREADY-INSTALLED | W207 F |

## 4. Cumulative REJECT-FOR-FIT (~40 candidates) — summarized by reason class

| Reject reason | Count | Examples |
|---|---|---|
| **LICENSE blocker (AGPLv3 / GPL-3 / BSL / Elastic-2.0 / SSPL / proprietary)** | ~8 | openviking AGPLv3; paradedb AGPL-3.0; neo4j GPL-3; pathway BSL 1.1; phoenix-semi Elastic-2.0; surrealdb-temp BSL; snyk proprietary; ast-grep-mcp UNKNOWN |
| **Probe 5 mode-harness-shape FAIL (Windows-host / WSL-only / HARD-GATE / autonomous-loop-incompatible)** | ~12 | bubblewrap/firejail/gvisor/lima Linux-only; RAGatouille WSL2-only; wshobson conductor HARD-GATE Q&A; mattpocock setup-matt-pocock-skills HARD-GATE; superpowers brainstorming HARD-GATE; gsd-build --dangerously-skip-permissions; LLMLingua PyTorch+5GB-dep; LMCache vLLM self-hosted; H9-H12 ECC tmux/dev-server hooks; Continuous-Claude-v3 full install (Docker+PostgreSQL+12-step wizard); claude-squad pty.Start Windows-blocker; ARIS full install ML-research-specific |
| **CR-12 class 2 DUPLICATE-FUNCTIONALITY (vs incumbent)** | ~10 | superpowers using-superpowers (auto-fired); using-git-worktrees (parallel-session-worktree-isolation already covers); writing-skills (skill-creator @ Anthropic OFFICIAL); ast-grep-mcp (serena + ast-grep CLI cover); browser-use + stagehand (Claude IS LLM browser agent); chroma-mcp (mcp-memory + graphiti); CycloneDX/cdxgen (vs syft); anchore/grype (vs osv-scanner unless syft adopted); pinecone-mcp (memory stack); spences10/mcpick (vs /plugin native); wshobson full-stack-orchestration (vs agent-orchestration enabled); wshobson 75+ domain plugins (scope-mismatch) |
| **Probe 7.a DEMAND-ABSENCE** | ~5 | comby-tools/comby (covered by ast-grep CLI); shareAI-lab/learn-claude-code (tutorial scope); ed3dai/ed3d-plugins (RPI duplicate); pinecone-claude-code-plugin (memory duplicate); bitwize-music-studio (domain mismatch) |
| **Catalog-cite-only / single-maintainer-axis-1-FAIL** | ~6 | ComposioHQ/awesome-claude-skills license [UNKNOWN]; hesreallyhim CC-BY-NC-ND-4.0 cite-only; sickn33 single-individual maintainer; VoltAgent/awesome-openclaw-skills ecosystem-mismatch; alirezarezvani bulk DUPLICATE; JasonWarrenUK/goblin-mode Axis-2 PRACTITIONER FAIL |
| **MAINTENANCE-MODE / ARCHIVED / DEPRECATED** | ~4 | microsoft/autogen MAINTENANCE-MODE; IntelLabs/fastRAG ARCHIVED; kuzu ARCHIVED; stravu/crystal DEPRECATED Feb 2026; Vvkmnn/claude-emporium PRE-LAUNCH |
| **DEMAND-CREATES-NEW-WORKFLOW.b PARTIAL (deferred)** | ~4 | dbhub (no JSONL→SQLite ETL); langchain-ai/deepagents (ECOSYSTEM-IMPORT 6+ langgraph-* sub-pkgs); ComposioHQ/agent-orchestrator (macOS-focused); openai-evals (Probe-7 demand-absence per W122 Ship 2) |

## 5. HONEST-NON-FINDING accumulated

| HNF | Wave-Agent | Disposition |
|---|---|---|
| superpowers/agents/ directory NOT FOUND | W209 L | Superpowers ships SKILLS not agents |
| andrej-karpathy-skills/agents/ directory NOT FOUND | W209 L | Karpathy ships 1 skill only (karpathy-guidelines) |
| agentopology repo NOT FOUND in Z:/repos/deps/ | W209 L | Sibling W208 STUDY-PILOT cite stale or remote-only |
| smtg-ai/claude-squad NOT FOUND in deps/ probe | W209 L | Windows pty.Start blocker; upstream issue #275 open |
| mattpocock-skills marketplace.json existence NOT verified | W208 G | next-fire `mcp__github__get_file_contents path=marketplace.json` probe |
| vercel-labs marketplace.json existence likewise unverified | W208 G | next-fire verify; pnpm packages/* not root package.json |
| ComposioHQ + sickn33 + alirezarezvani + Shubhamsaboo HEAD-SHA freshness | W208 G | gh API rate limit at probe time; refresh on next fire |
| W206 gap-analysis OVER (caught by Mia pre-apply) | W207 install | "8 missing marketplaces" claim refuted by pure-runtime probe — actually 8 already enabled |
| Bash channel wedge (W208 I parser-level error `unexpected EOF`) | W208 I | switched to PowerShell + mcp__github__get_file_contents fallback |
| codex CLI cross-model gate NOT structurally satisfied | All 12 agents | All STAND-IN-NOTICE per CLAUDE.local.md ENV (g); Path P codex foreground+tee REQUIRED on cumulative ADOPT-NOW pre-install |

## 6. Gap-category synthesis (top underserved primitives across waves)

| Gap | Surfaced by | Severity | Closure path |
|---|---|---|---|
| **Anthropic-OFFICIAL MCP reference suite (filesystem + git + fetch + memory + sequential-thinking)** | W208 I | CRITICAL — biggest CR-12 PRIMARY gap | install Top-5 via `npx @modelcontextprotocol/server-*` (Anthropic-OFFICIAL Apache-2.0; CR-9 acknowledged) |
| **Cache_control normalization at proxy layer (MEASURED 13.2pp cache-hit gap)** | W209 J | HIGH | cnighswonger-cache-fix v3.0.3 proxy install |
| **Frontend/React + Vercel-ecosystem patterns** | W208 G | HIGH | vercel-labs/agent-skills 4-core pack |
| **Engineering-narrative skills (architecture-deepening + domain-language + plan-stress-testing)** | W208 G | HIGH | mattpocock-skills engineering 5-pack |
| **Default-FAIL evidence-gate contract + Fresh-context evaluator wiring** | W208 H | HIGH | cwc native primitives ALREADY installed but NOT operationally wired beyond W207 hook copy |
| **Adaptive Sandbox Fan-Out Controller** | W208 H | MEDIUM | extend parallel-agent-wave.md §CADP from static max-3 to signal-driven adaptive |
| **Structured-output streaming with schema validation (SHAPE-CLAIM operationalization)** | W209 J | HIGH | instructor + Pydantic install |
| **Library-primitive chunker for graphiti+mcp-memory pre-embed** | W209 J | MEDIUM | chonkie install |
| **UserPromptSubmit hook (proactive recall) + SubagentStop telemetry** | W209 K | HIGH | wire Continuous-Claude-v3 memory-awareness.mjs + native SubagentStop hook |
| **CR-1 mechanical enforcement (block-no-verify + MCP-health-check + governance-capture)** | W209 K | HIGH | wire 3 ECC hooks to settings.json |
| **PROGRESS.md long-arc handoff convention (cardinal-rule layer)** | W209 L | HIGH | create `.claude/rules/long-arc-handoff-discipline.md` |
| **Mid-task PostToolUse context-monitor (gsd bridge-file pattern)** | W209 L | MEDIUM | extract gsd-context-monitor.js as repo-local hook |
| **Worker-fork discipline (operational guard rails)** | W209 L | MEDIUM | cite-anchor Piebald 4-rule in team-orch-state-spawning.md |
| **Multi-layer security scanning (IaC misconfig + container vuln + SBOM)** | W208 I | MEDIUM | trivy + syft (gh release download) |
| **Pure tree-sitter AST pattern queries (independent of LSP)** | W208 I | LOW-MEDIUM | ast-grep CLI install |
| **License blockers on attractive repos (AGPLv3/GPL-3/BSL/Elastic-2.0/SSPL)** | W207 D + E | OPERATIONAL | maintain REJECT-lineage audit-trail in `docs/sota-installed-manifest.md` |

## 7. Cross-model gate status

ALL 12 W206-W209 agent dispatches ran as **Sonnet stand-in** per CLAUDE.local.md ENV (g) deprecated/env-funneled per CLAUDE_CODE_SUBAGENT_MODEL fallback OR Anthropic Max Opus pool depletion. **Cross-model gate NOT structurally satisfied** for any of the 28 ADOPT-NOW recommendations.

**Resolution paths** per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`:

1. **Path P codex foreground+tee** (orchestrator-direct): `codex exec --skip-git-repo-check --color never < .claude/state/codex_consult_w210_cumulative_adopt_now.txt 2>&1 | tee .claude/state/codex_consult_w210_cumulative_adopt_now_OUT.txt` — RECOMMENDED per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern D
2. **BRIDGE-MODE codex-rescue subagent** dispatch — agent wraps real codex CLI subprocess
3. **Accept stand-in verdict** under Outcome C MANUAL-OVERRIDE with documented gate-bypass rationale per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md` Outcome C
4. **Queue+retry** when GPT-5.5 codex available per `cross-model-consensus.md §On codex unavailable`

**Recommendation**: Path P with focused single-claim consult prompts per Pattern D — batch the 28 ADOPT-NOW into 4-6 categories (~5-6 candidates per consult) for ≤300s codex timeouts.

## 8. Pure-runtime install state (current HEAD `4a20462`, 15 commits)

| Layer | Installed | Wired |
|---|---|---|
| L0 prereqs (node 24.7+, Python venv, codex CLI v0.130+, claude CLI 2.1.140+) | ✓ | ✓ |
| L4 marketplaces enabled (8) | claude-plugins-official, claude-code-workflows, addy-agent-skills, openai-codex, context-mode, superpowers-dev, ecc, claude-settings | ✓ |
| L5 plugins enabled (21: 20 enabled + 1 codex disabled) | skill-creator + ralph-loop + security-guidance + agent-sdk-dev + frontend-design + commit-commands + hookify + feature-dev + code-review + superpowers + context-mode + context-management + agent-orchestration + agent-teams + tdd-workflows + debugging-toolkit + comprehensive-review + agent-skills + intelligent-compact + ecc | ✓ |
| L6 MCPs (14 servers) | memory + github + context7 + deepwiki + repomix + git + fetch + time + sequentialthinking + filesystem + gitnexus + chrome-devtools + playwright + serena | ✓ |
| L7 hooks (cwc native 5 + context-mode SessionStart) | track-read.sh + verify-gate.sh + kill-switch.sh + steer.sh + commit-on-stop.sh + context-mode-cache-heal.mjs | ✓ |
| L8 agents (cwc evaluator) | ALREADY INSTALLED at `.claude/agents/cwc/evaluator.md` | partial — invocation surface verify pending W210 |
| L10 memory backends (Memory L1 mcp-memory v10.51.3 + L3 graphiti @ FalkorDB v1.6.1) | ✓ INSTALLED + WIRED | ✓ |
| Operator-led pip+Docker+API-key batch (from W207 + W209 J) | PENDING — operator-led | PENDING |

## 9. W210+ proposed roadmap

| Priority | Action | Wave-target | Cost |
|---|---|---|---|
| **P0** | Path P codex foreground+tee cross-model gate on 28 ADOPT-NOW | W210 | ~25-50 min (5-6 batches × ~3-5 min each) |
| **P1** | Marketplace.json existence verification (mattpocock + vercel-labs) | W210 | ~5 min |
| **P2** | Pure rule codification (PROGRESS.md handoff + worker-fork 4-rule + /rewind discipline) | W210 single-fire | ~110 LOC total / ~15 min |
| **P3** | Operator-led pip+Docker+API-key batch (background; non-blocking) | W210+ | operator hands |
| **P4** | W210 fan-out 3 NEW agents (specs/scaffolding M / local-LLM-judge N / vector-DB+KG+agentic-RAG O) — beyond W206-W209 coverage | W210 | ~3 dispatches |
| **P5** | Anthropic-OFFICIAL MCP suite install (filesystem + git + fetch + memory + sequential-thinking — biggest gap) | W211+ | per CR-9 version-pinned install batch |
| **P6** | Hook wire batch (block-no-verify + mcp-health-check + governance-capture + compiler-in-the-loop + file-claims) | W212+ | settings.json edits + JSONL audit-trail wire |
| **P7** | Cache_control proxy install (cnighswonger-cache-fix v3.0.3) + instructor + chonkie pip | W213+ | operator-led |

## 10. Artifact organization for future deep-dive (operator-explicit ask: "organize for deep-dive without bias")

**Folder convention**: all W206-W209 artifacts persisted to `Z:\claude-sota-installed\tmp\wave2*-*-2026-05-15.md` (gitignored per `.gitignore:216`). 12 files + this master catalog = 13 total artifacts in `tmp/` for this 4-wave arc.

**Index access pattern**:
1. **Topical browse** — by ADOPT-NOW category → see §2 Cumulative ADOPT-NOW table → click file link
2. **Agent-domain browse** — by Wave-Agent (G/H/I/J/K/L) → see §1 Artifact Index → click file link
3. **Gap-category browse** — by underserved primitive class → see §6 Gap synthesis → trace to source agent
4. **Cross-model verification status** — §7 → ALL pending Path P codex T1
5. **Install state** — §8 → current 14 MCPs + 21 plugins + 5 hooks
6. **Roadmap** — §9 P0-P7

**Compounding-learning pattern per Karpathy §5 Layer-3** (compiled wiki): this master catalog IS the Layer-3 entry for the W206-W209 arc. Future fires reference this index FIRST before re-deriving findings; MEMORY.md L2 entries cross-link.

## 11. Cite trail authority

All file:line + HEAD SHA cites preserved verbatim in the 12 per-wave artifacts (this catalog references file paths only — not duplicating ~200+ verbatim cite anchors across the corpus per `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 no duplication).

Master cite-class summary per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE:
- **TIER-1-DIRECT** (upstream repo file:line + HEAD SHA): ~150+ cites across 12 artifacts
- **TIER-1-DIRECT** (Anthropic CC official docs URL): ~8 cites (hooks contract + sub-agents + settings + cli-reference)
- **TIER-2** (user-curated discovery surface): ~15 cites (catalog cites for awesome-lists)
- **TIER-3-LOCAL-OPERATOR-DERIVED**: this master catalog + sibling-archaeology references

**Recursive dogfood note**: this master catalog IS the synthesis layer per Karpathy §5 Wiki Compounding Surface 3-layer naming anchor — Layer 3 compiled wiki for the W206-W209 arc. Per `cardinal-rule-11-meta-process-sota.md` recursive completion: the build-this-runtime PROCESS itself follows SOTA practice (master catalog organizing 12 agent dispatches across 4 waves into single navigable index for future deep-dive without re-research bias).
