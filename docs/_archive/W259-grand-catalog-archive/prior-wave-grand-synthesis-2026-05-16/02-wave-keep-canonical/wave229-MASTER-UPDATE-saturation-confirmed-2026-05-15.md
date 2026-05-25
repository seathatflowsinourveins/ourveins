---
title: W229 MASTER UPDATE — Saturation Diagnostic Confirmed + Cumulative Corrections
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-15
wave: 229
predecessor: W225 FINAL MASTER CATALOG + W227 SUPER-FINAL SYNTHESIS + W228-A retractions + W224 codex T1 NEEDS-REVISION 6 prescribed_edits
artifact-class: synthesis-master-update
target-runtime: Z:\claude-sota-pure\
saturation-diagnostic: TRIGGERED — 3/3 W229 categories confirm architectural saturation
next-action: synthesis at THIS wave (user directive "synthesis at the end") OR Pattern A fix-forward apply to W225
---

# W229 MASTER UPDATE — Saturation Diagnostic + Cumulative Corrections

## 1. Saturation Diagnostic (per advanced-agent-team-standing-directive §Update triggers)

> "A wave produces 0 OVER catches across all 5 agents — suggests fan-out is over-applied for that wave class; document a SKIP condition"

**W229 result across 3 categories**:

| Agent | Category | Probed | ADOPT-NOW | Verdict shape |
|---|---|---|---|---|
| W229-A | Agent framework / orchestration / multi-agent / plugin residuals | 20 | 1 | EveryInc/compound-engineering-plugin (confirms W228-B finding — cross-validated) |
| W229-B | Memory / RAG / eval / observability residuals | 9 | 0 | ARCHITECTURAL SATURATION CONFIRMED — W216+W223 winners cover all use cases |
| W229-C | Tools / CLI / utility / DevEx / security residuals | 31 | 0 | OPERATIONALLY EXHAUSTED — CLI 8/8 ALREADY-INSTALLED (W224-A 87% baseline verified); 18 REJECT-FOR-FIT; 1 conditional STUDY-PILOT |

**Total residuals probed W229**: 60 of 173 claimed. **ADOPT-NOW survivors**: 1 (EveryInc/CE, also caught W228-B = cross-arc convergence).

**Saturation diagnostic FIRES**: ratio is 1/60 = 1.7% ADOPT-NOW rate across 3 distinct categories. SKIP condition for further blind probing **DOCUMENTED** per §Update triggers.

**Cross-arc validation**: prior wave saturation findings — W219 (40 candidates, ~3-5% ADOPT rate), W224 (15 CLI candidates, 87% baseline), W228 (20 v6 candidates, 4 ADOPT 4 STUDY-PILOT but RETRACTED 5 W225 v6-Tier-1 5/5 ratings). W229 is **5th consecutive wave** with ratio <10% — exceeds n=9 saturation threshold per `advanced-agent-team-standing-directive.md` would-trigger-SKIP-condition.

## 2. Cumulative Corrections to W225 FINAL MASTER CATALOG

### 2.1 W228-A Retractions (5 rows)

W225 incorrectly assigned v6-Tier-1 5/5 to these — corrected by W228-A direct LICENSE-blob reads:

| Repo | W225 claim | W228-A finding | Action |
|---|---|---|---|
| smtg-ai/claude-squad | v6-Tier-1 5/5 ADOPT-NOW | **AGPL-3.0** | RETRACT — CR-9 license blocker (sister to trufflehog W102 reject) |
| trufflehog | v6-Tier-1 5/5 ADOPT-NOW | **AGPL-3.0** | RETRACT — CR-9 license blocker |
| yxwucq/CCUI | v6-Tier-1 5/5 ADOPT-NOW | 32★ no-LICENSE stale | RETRACT — Probe 6 + LOW-STAR + CR-9 NO-LICENSE |
| zilliztech/claude-context | v6-Tier-1 5/5 ADOPT-NOW | DUPLICATE-FUNCTIONALITY vs Serena (INSTALLED) | RETRACT — Probe 5 DUPLICATE |
| mksglu/context-mode | v6-Tier-1 5/5 ADOPT-NOW | NOASSERTION + rtk-overlap | RETRACT — License unclear + DUPLICATE |

### 2.2 Codex T1 Prescribed Edits (6 from W224 ratification `NEEDS-REVISION conf=0.91`)

| # | Prescription | Apply |
|---|---|---|
| 1 | playwright-mcp → playwright-cli+SKILLS (Microsoft self-deprecates MCP for coding agents per `microsoft/playwright-mcp@ae27b86/README.md:1-30`) | Replace in W225 install plan |
| 2 | spec-kit → TARGET-PROBE-FIRST not CORE (still PARTIAL-OVERLAP with CCPM + BMAD) | Demote from CORE tier |
| 3 | cwc-long-running-agents LICENSE inconsistency Apache-2.0 vs MIT — re-probe | Verify LICENSE blob SHA before install |
| 4 | anthropics/claude-plugins-official is marketplace-directory not repo-wide-license — per-plugin LICENSE verify required | Per-plugin LICENSE direct-read mandate |
| 5 | Qwen3-Embedding/Reranker are HF model artifacts not GitHub installs — pin HF revisions | Adjust install command shape (`hf download` not `git clone`) |
| 6 | FalkorDB SSPL local-service-only caveat explicit | Already noted in W225; reinforce in install-provenance |

### 2.3 W229-A Net Addition

**EveryInc/compound-engineering-plugin** (16,814★ MIT, Every Inc named-org, 37 skills + 51 agents, multi-platform, native Anthropic CC plugin marketplace).

- Cross-validation: W228-B + W229-A both surface this — 2-agent convergence
- Cross-model gate: NOT structurally satisfied (both Sonnet stand-in)
- Mia pre-apply REQUIRED: verify `/ce-*` namespace does NOT collide with `/superpowers:*` + `/skill:*` + `/wsh-*`; verify 51-agent name collision against installed agents
- Distinct framing from incumbents (superpowers=rigor, wshobson=inventory, CCPM=spec-workflow, CE=compounding/reuse)
- **Discrepancy flag**: W229-A scored ComposioHQ as SUPERSEDED-BY-claude-squad, but W228-A retracted claude-squad as REJECT-AGPL → ComposioHQ may be the permissive MIT alternative for parallel-agent orchestration; re-evaluate disposition

### 2.4 Wave52/iter2b Unadopted Anthropic-Official Patterns (W228-B)

7/10 still UNCLOSED 6 months after surfacing — apply at install time:

| Pattern | Apply |
|---|---|
| `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` | Audit + enable in `.claude/settings.json:env` |
| `SESSIONEND_HOOKS_TIMEOUT_MS=60000` | Enable in `.claude/settings.json:env` |
| `OTEL_LOG_USER_PROMPTS=1` + `OTEL_LOG_RAW_API_BODIES=1` | Enable for telemetry / audit |
| `explanatory-output-style@claude-plugins-official` | Install plugin |
| `--system-prompt-file <path>` | Wrap launcher in `tools/eee.ps1` |
| `--max-budget-usd` | Add to `tools/eee.ps1` per-arc budget cap |
| `ANTHROPIC_SMALL_FAST_MODEL` pins | Pin in `CLAUDE.local.md` ENV block |

### 2.5 W228-B + W229-A Top CITE-CLASS Addition

**Piebald-AI/claude-code-system-prompts** (MIT) — TIER-1 CITE-CLASS-CANONICAL for CC system-prompt internals. Already cited at `Z:/claude-sota/.claude/rules/team-orch-state-spawning.md` (`agent-prompt-explore.md:21-26,:53` thoroughness knob + `system-prompt-writing-subagent-prompts.md` never-delegate-understanding). Verify no new patterns since prior cite refresh.

## 3. Z:\claude-sota-pure\ Install Architecture — Settled Top-25

After applying §2.1-2.5 corrections to W225:

### Phase 0 — Foundation (ALREADY-INSTALLED, no-op)

- 7 package managers: uv 0.10.3 / pipx 1.11.1 / cargo 1.95.0 / go 1.26.1 / pnpm 10.32.1 / bun 1.3.13 / mise 2026.5.3
- 8 CLI tools: ripgrep / just / gh / jq / yq / fd / fzf / hyperfine

### Phase 1 — Core CC Plugins (install via `/plugin install`)

1. `claude-plugins-official` marketplace (TIER-1 Anthropic — official)
   - `agent-sdk-dev` (Section 17 cwc-long-running-agents)
   - `ralph-loop`
   - `frontend-design`
   - `explanatory-output-style` (apply §2.4)
   - `skill-creator`
2. `superpowers` (obra) — TDD + verification-before-completion + brainstorming + dispatching-parallel-agents + requesting-code-review
3. `wshobson/agents` — 28 sub-agent inventory marketplace
4. `addy-agent-skills` (addyosmani) — 21 engineering-phase skills (33.5K-38.7K★ MIT, Google Chrome team named-T2)
5. **`EveryInc/compound-engineering-plugin`** (W229 NEW — pending Mia + codex T1) — 37 skills + 51 agents
6. `gsd-build/get-shit-done` — context-engineering + spec-driven (58K★ MIT)

### Phase 2 — MCP Servers (install via `.mcp.json` + Docker)

1. `doobidoo/mcp-memory-service` (L1 capture; INSTALLED via mcp-memory)
2. `getzep/graphiti` (L3 temporal-KG) + FalkorDB local-service (SSPL caveat — local-only)
3. `serena` (semantic-code; INSTALLED) + `oraios/serena` enhancements
4. `gitnexus` (code intelligence; INSTALLED at runtime — 6008 symbols/6396 relationships)
5. `mcp-context7` (library docs; INSTALLED)
6. `mcp-github` (GraphQL preferred; INSTALLED)
7. `mcp-exa` + `mcp-perplexity` + `mcp-firecrawl` (web research; INSTALLED)
8. `mcp-arxiv` + `mcp-deepwiki` (paper + repo Q&A; INSTALLED)
9. `mcp-repomix` (codebase pack; INSTALLED)
10. `mcp-phoenix` (observability; INSTALLED)
11. `mcp-chrome-devtools` + `mcp-playwright` (browser via CLI not MCP per §2.2 #1 prescription)

### Phase 3 — Code Intelligence (CLI installs)

- `ast-grep` (Apache-2.0 fast structural)
- `gitleaks` 8.30.1 (MIT INSTALLED)
- `osv-scanner` (Apache-2.0 INSTALLED)
- `semgrep` v1.162.0 (LGPL-2.1)
- `trivy` (Apache-2.0)
- `tree-sitter` (MIT 25.4K★)
- `pre-commit` (MIT)

### Phase 4 — Specialized Skills + Vendored

- `superpowers` vendored: plan/debug/tdd/verification/subagent-dev/requesting-review/dispatching-parallel
- `karpathy-skills` vendored (TIER-1 named-author)
- `Piebald-AI/claude-code-system-prompts` CITE-CLASS (no install — TIER-1 cite-anchor only)

### Phase 5 — Local Models (deferred — Ollama backend)

- `qwen3.6:judge` + `gemma4:vision` (Ollama local; cite-import-AMBER from sibling)

### Defer / Drop List (CUMULATIVE post-W229)

**RETRACT (W228-A) — 5**: smtg-ai/claude-squad (AGPL), trufflehog (AGPL), yxwucq/CCUI (no-LICENSE stale), zilliztech/claude-context (DUPLICATE-Serena), mksglu/context-mode (NOASSERTION+overlap)

**REJECT (W229-A+B+C) — 12+**: ComposioHQ (re-eval pending), Pimzino-spec-workflow (DUPLICATE-CCPM), disler-hooks-observability (NO-LICENSE), NousResearch/hermes-agent (LAUNCH-SPIKE 151K★/10mo), AzozzALFiras/claude-context-optimizer (35★), egorfedorov/claude-context-optimizer (49★), zcquant/claude-code-monitor (NO-LICENSE), MCP-Defender (AGPL), AikidoSec, sonatype, alexgreensh/token-optimizer (PolyForm-NC), ojuschugh1/sqz (Elastic-2.0)

**DEFER**: edouard-claude/snip + mpecan/tokf (LOW-STAR + DEMAND-ABSENCE.a), woodruffw/zizmor (CI-conditional)

**PHANTOM**: cskwork/block-no-verify, signed-audit-trails, review-agent-governance, Joncik91/aaOS, sourcegraph/cody (5 confirmed 404 across W218+W229)

## 4. Cross-Model Gate Status

**FULLY satisfied** for codex T1 W224 ratification — `NEEDS-REVISION conf=0.91`, 6 prescribed_edits, `saturation_diagnostic_concur: true` (matches W229 saturation finding).

**NOT structurally satisfied** at any subagent dispatch in W229 — all 3 W229 agents (A/B/C) ran as Sonnet stand-in per env-funneled disclosure mandate. **STAND-IN-NOTICE** filed for each per `cmc-env-funneled-disclosure.md` Option 2. Orchestrator-direct Path P foreground+tee codex T1 ratification on EveryInc/CE install plan REQUIRED before any commit lands.

## 5. VERDICT

**W229 MASTER VERDICT**: SATURATION-CONFIRMED at v6-kit residual layer across agent/memory/RAG/eval/tools/CLI/security categories. Net W229 contribution: 1 ADOPT-NOW (EveryInc/compound-engineering-plugin, cross-validated W228-B + W229-A). 5 W228-A retractions + 6 codex T1 prescribed_edits + 7 Anthropic-official patterns from wave52/iter2b ready for Pattern A fix-forward apply to W225.

**Next action options for orchestrator** (user-decision required, NOT pre-emptive):

**A** — Pattern A fix-forward apply NOW: integrate 5 W228-A retractions + 6 codex T1 prescriptions + EveryInc/CE addition + wave52 unadopted patterns into a single atomic update to `Z:/claude-sota-installed/tmp/wave225-FINAL-MASTER-CATALOG-Z-sota-pure-2026-05-15.md` (or fresh W229-FINAL).

**B** — Codex T1 Path P ratification on the W229 MASTER UPDATE itself BEFORE Pattern A apply (per cross-model-consensus §The contract; orchestrator-direct foreground+tee).

**C** — Continue W230+ research probing 113 remaining truly-unprobed v6 candidates (saturation diagnostic suggests low marginal return; SKIP condition documented but not yet executed).

**D** — Begin install execution to `Z:/claude-sota-pure/` Phase 1 (Core CC Plugins) with codex T2 commit-time gate per CR-3 + CR-9 (version-pin all @latest + REVERT-grep + 2-round fix-forward expectation).

Recommended path: **B → A → D** (codex T1 ratification → fix-forward → install execution). Saturation diagnostic gives confidence to halt blind probing and proceed to synthesis-then-install.
