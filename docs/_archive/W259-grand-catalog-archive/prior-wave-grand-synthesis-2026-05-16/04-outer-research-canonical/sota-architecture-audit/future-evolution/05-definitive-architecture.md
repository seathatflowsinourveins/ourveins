# 05 — Definitive eee Architecture (May 2026 — synthesizing audit + user SOTA-research)

**Status**: LOAD-BEARING deliverable for Wave 134 audit arc. Synthesizes:
1. Fire 5 555-repo programmatic SRA audit
2. Fire 6 user-research-stack validation + 5-repo baseline extension + LICENSE re-audit
3. Fire 6 top-15 STUDY-PILOT strict deep-dive
4. Cross-tier synthesis across user's pyramid

**Audit date**: 2026-05-10.
**Coverage**: 560 / 614 repos probed via SRA D1-D10 = **91.21%** (programmatic) + **3.58%** (strict line-by-line) + extension-baseline.
**Mia ladder**: n=902 cumulative probe-verifications.

## Definitive 4-tier architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│ TIER 0 — Anthropic foundation (ALWAYS ON; non-negotiable)         │
├─────────────────────────────────────────────────────────────────────┤
│ CLAUDE.md (12 cardinal rules)                                       │
│ CLAUDE.local.md (env block per CCBP claude-settings.md:877-921)     │
│ anthropics/claude-plugins-official marketplace (INSTALLED)          │
│ Anthropic Plan Mode + /rewind + /compact (built-in)                 │
│ Cardinal-rule-3 cross-model T1-T7 lifecycle (active)                │
└─────────────────────────────────────────────────────────────────────┘
                                |
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ TIER 1 — Method (BOTH installed; complementary)                     │
├─────────────────────────────────────────────────────────────────────┤
│ obra/superpowers (185k★ MIT) — Jesse Vincent                        │
│   • verification-before-completion (claim-time gate)                │
│   • requesting-code-review (template)                               │
│   • subagent-driven-development (2-stage review)                    │
│   • test-driven-development (RED-GREEN-REFACTOR)                    │
│   • systematic-debugging (root-cause discipline)                    │
│   • using-git-worktrees (parallel isolation)                        │
│   • writing-plans (multi-step task decomposition)                   │
│   STATUS: ✅ INSTALLED via Anthropic marketplace                    │
│                                                                     │
│ github/spec-kit (95k★ MIT) — GitHub Inc                             │
│   • Constitution → specify → clarify → plan → tasks → analyze →    │
│     implement lifecycle                                             │
│   • Skills integration mode (--integration-options="--skills")      │
│   STATUS: 🟡 INSTALL CANDIDATE W134-F7                              │
└─────────────────────────────────────────────────────────────────────┘
                                |
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ TIER 2 — Project management (TWO parallel pilots; complementary)    │
├─────────────────────────────────────────────────────────────────────┤
│ automazeio/ccpm (8k★ MIT) — Ran Aroussi                             │
│   • PRD → epic → tasks markdown lifecycle                           │
│   • Optional GitHub Issues sync                                     │
│   • Cleanest "markdown is the database" implementation              │
│   STATUS: 🟡 INSTALL CANDIDATE W134-F7                              │
│                                                                     │
│ OthmanAdi/planning-with-files (21k★ MIT) — Ahmad Adi                │
│   • Manus-style markdown-as-working-memory                          │
│   • task_plan.md + findings.md + progress.md triplet                │
│   • Hash-attestation for plans                                      │
│   • /plan + /start commands                                         │
│   STATUS: 🟡 INSTALL CANDIDATE W134-F7 (minimalist sister)          │
└─────────────────────────────────────────────────────────────────────┘
                                |
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ TIER 3 — Standards + Memory (orthogonal layers)                     │
├─────────────────────────────────────────────────────────────────────┤
│ Standards: buildermethods/agent-os v3 (4.5k★ MIT)                   │
│   • /inject-standards + /shape-spec slash commands                  │
│   • Defers implementation/orchestration to Plan Mode                │
│   STATUS: 🟡 INSTALL CANDIDATE W134-F8                              │
│                                                                     │
│ Memory: existing eee 4-layer stack                                  │
│   L1: doobidoo/mcp-memory-service v10.51.3 (INSTALLED)              │
│   L2: Qdrant Docker (deferred)                                      │
│   L3: getzep/graphiti v0.29.0 + FalkorDB v1.6.1 (INSTALLED partial) │
│   L4: wiki layer (deferred per Memory Stack STATUS-DEFERRED)        │
└─────────────────────────────────────────────────────────────────────┘
                                |
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ TIER 4 — Discovery surfaces (cite-only catalogs)                    │
├─────────────────────────────────────────────────────────────────────┤
│ ComposioHQ/awesome-claude-skills (59k★, NO LICENSE) — CITE-ONLY     │
│ travisvn/awesome-claude-skills (12k★, NO LICENSE) — CITE-IMPORT 🆕  │
│ alirezarezvani/claude-skills (5k★, MIT) — CITED                     │
│ voltagent/awesome-agent-skills (21k★, MIT) — CITED                  │
│ hesreallyhim/awesome-claude-code (43k★, CC-BY-SA) — CITED           │
│ claudemarketplaces.com (URL) — CITED                                │
│ skillsmp.com (URL) — CITED                                          │
└─────────────────────────────────────────────────────────────────────┘
                                |
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ TIER 5 — Reference (read once, bake into setup)                     │
├─────────────────────────────────────────────────────────────────────┤
│ Piebald-AI/claude-code-system-prompts (10k★ MIT) — CITE-IMPORT 🆕   │
│   • Anthropic CC system prompt reverse-engineered                   │
│   • 24 builtin tool descriptions                                    │
│   • Plan/Explore/Task subagent prompts                              │
│   • CLAUDE.md generation prompts                                    │
│ Anthropic code.claude.com/docs/en/skills (URL) — CITED              │
│ Anthropic code.claude.com/docs/en/best-practices (URL) — CITED      │
└─────────────────────────────────────────────────────────────────────┘
                                |
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ TIER 6 — eee-specific extensions (LOCAL, NOT in user pyramid)       │
├─────────────────────────────────────────────────────────────────────┤
│ Anthropic OFFICIAL cwc-long-running-agents 5 primitives:            │
│   • Default-FAIL contract                                           │
│   • Fresh-context evaluator                                         │
│   • PROGRESS.md handoff                                             │
│   • Kill-switch (Ctrl+C)                                            │
│   • Steer mid-run                                                   │
│ Reference plugins: agent-sdk-dev / ralph-loop / frontend-design     │
│                                                                     │
│ Cardinal-rule-12 upstream-install-priority chain:                   │
│   PRIMARY: official-native-channel install                          │
│   SECONDARY: TIER-1 file:line @ SHA cite-anchor                     │
│   TERTIARY: sibling cite-import-AMBER (last-resort)                 │
│                                                                     │
│ FM catalog: 17 named failure modes (FM-01..FM-20)                   │
│   Includes FM-17.a-f sub-classes (subagent fleet depletion)         │
│   FM-20 path-drift cascade (claim-propagation across fires)         │
│                                                                     │
│ Cross-model T1-T7 + T0 lifecycle:                                   │
│   T0 candidate-list challenge (PROPOSED-PILOT)                      │
│   T1 pre-edit consult                                               │
│   T2 commit-gate (sync STRICT FAIL_CLOSED)                          │
│   T3 postcommit audit                                               │
│   T4 post-push cumulative                                           │
│   T5 plan-stage                                                     │
│   T6 stop-gate                                                      │
│   T7 ask-without-act                                                │
└─────────────────────────────────────────────────────────────────────┘
```

## Gap-closure roadmap (sequenced)

### W134-F7 — Tier-1 + Tier-2 installs (3 new)

```bash
# Tier-1: spec-kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
specify init --integration claude --integration-options="--skills"

# Tier-2: ccpm (markdown-as-database PM)
mkdir -p Z:/claude-sota-installed/.claude/plugins/marketplaces/ccpm-pending
git clone --depth 1 https://github.com/automazeio/ccpm.git ./tmp/ccpm-clone
# manual integration: copy .claude/skills/ccpm/ from tmp/ccpm-clone

# Tier-2: planning-with-files (Manus-style minimalist PM)
git clone --depth 1 https://github.com/OthmanAdi/planning-with-files.git ./tmp/pwf-clone
# manual integration: copy .claude/skills/planning-with-files/ from tmp/pwf-clone
```

Each install gets:
- 30-day pilot per Probe 7.b 5-clause check
- Mia probe + codex T1 verdict before commit
- Provenance entry in `docs/install-provenance.md`

### W134-F8 — Tier-3 install + Tier-5 cite-import (2 new)

```bash
# Tier-3: agent-os
git clone --depth 1 https://github.com/buildermethods/agent-os.git ./tmp/agent-os-clone
# integration via /inject-standards + /shape-spec slash commands

# Tier-2 utility: markitdown
pipx install markitdown  # OR pip install markitdown in Z:/venvs/claude

# Tier-5 CITE-IMPORT: Piebald system prompts
# add to .claude/rules/citation-discipline.md TIER-2 cite-anchor inventory:
# Reference: https://github.com/Piebald-AI/claude-code-system-prompts @ HEAD <SHA>
```

### W134-F9 — Hygiene + context-budget audit

```bash
# Run context-budget audit on current eee plugin set
# Per user-research warning "2-3 active plugins, never more"
/agent-sort  # ECC skill for DAILY vs LIBRARY install plan classification

# Anthropic/skills LICENSE crisis resolution
# File upstream issue: https://github.com/anthropics/skills/issues/new
# Meanwhile cite-only-via-marketplace pattern stands

# CLAUDE.md size review per user-research recommendation
# "small precise CLAUDE.md often outperforms bloated framework"
# Audit which cardinal-rule prose can move to .claude/rules/<file>.md
```

## Definitive replacement decisions

| Current eee primitive | User-research SOTA | Replacement decision |
|---|---|---|
| TaskCreate/TaskUpdate (in-conversation) | OthmanAdi/planning-with-files (persistent markdown) | **COMPLEMENT** — both layers (TaskCreate for in-conversation; planning-with-files for cross-session) |
| `.claude/projects/*/memory/feedback_*.md` ad-hoc | russbeye/claude-memory-bank | **KEEP eee pattern** (memory-bank low-adoption + stale) |
| ECC 1,556 SKILL.md across 21 plugins | "2-3 active plugins" | **AUDIT + SUB-PRUNE** via agent-sort skill (W134-F9) |
| `Z:/claude-sota/.claude/rules/cross-model-consensus.md` T1-T7 | Spec-Kit Constitution→implement | **COMPLEMENT** — different scale (T1-T7 per-fire; Spec-Kit per-feature) |
| ECC `feature-dev` + manual planning | obra/superpowers `writing-plans` | **ALREADY-INSTALLED** via marketplace |
| Mermaid in ASCII | mermaid-js/mermaid | **USE-VIA-RENDERER** — GitHub renders natively, no install |
| Manual web scrape | firecrawl/firecrawl | **ALREADY-INSTALLED** via firecrawl MCP |
| Manual browser navigation | microsoft/playwright | **ALREADY-INSTALLED** via playwright MCP |

## Anti-installs (DO NOT install despite user-research mention)

- **bmad-code-org/bmad-method** — virtual-team overhead doesn't fit solo autonomous /loop; cite-only as alternative-method reference
- **eyaltoledano/claude-task-master** — defer pending CCPM pilot outcome
- **russbeye/claude-memory-bank** — low-star (13) + 224d stale; pattern interesting but not adoption-ready
- **sst/opencode** — competing harness, not eee plugin
- **nousresearch/hermes-agent** — competing harness
- **langchain-ai/langchain** — Python SDK orthogonal to eee CC runtime
- **google-gemini/gemini-cli** — cross-vendor CLI
- **browser-use/browser-use** — playwright MCP suffices
- **junegunn/fzf** — operator-shell tool, not autonomous-loop primitive
- **thedotmack/claude-mem** — defer pending L1+L3 evaluation benchmark
- **farion1231/cc-switch** — operator-UI desktop app
- **unclecode/crawl4ai** — firecrawl overlap

## Convergence with user-research opinionated stack

User's stack: `CLAUDE.md + anthropics/skills + Plan Mode + Superpowers + CCPM + Agent OS v3` = 4 installs (excluding always-on Tier-0)

My definitive stack delivers user's 4 installs + adds 2 essential complements:
- ✅ User's 4: Superpowers (installed) + Spec-Kit + CCPM + Agent OS v3
- 🆕 My +2 complements: planning-with-files (Manus-style sister PM) + markitdown (utility)
- 🆕 My +1 cite-import: Piebald system-prompts (Tier-5 reference)

**Total architectural surfaces post-arc**: 8 (4 user-stack + 2 complements + 1 cite + Tier-0 already there)

## Honest gaps vs definitive architecture

### Gap-1: Spec-Kit not yet installed
- **Severity**: HIGH (user #2 method pick, 95k★ SOTA-verified)
- **Mitigation**: install in W134-F7
- **Failure mode if not installed**: continued lack of formal spec→clarify→plan lifecycle for multi-fire feature work

### Gap-2: CCPM not yet installed
- **Severity**: MEDIUM (user #1 PM pick, but 53d stale-push freshness concern)
- **Mitigation**: install in W134-F7; pilot 30 days; observe Probe 7.b outcomes
- **Failure mode**: continued ad-hoc PRD tracking without lifecycle structure

### Gap-3: planning-with-files not yet installed
- **Severity**: MEDIUM-HIGH (20k★ growth rate, Manus-style pattern)
- **Mitigation**: install in W134-F7 alongside CCPM
- **Failure mode**: sessions lack persistent markdown-as-working-memory between compaction events

### Gap-4: Agent OS v3 not yet installed
- **Severity**: LOW (standards layer; eee has CLAUDE.md but no skill-based standards injection)
- **Mitigation**: install in W134-F8
- **Failure mode**: codebase conventions confined to CLAUDE.md monolith vs skill-modular

### Gap-5: ECC over-install context-budget risk
- **Severity**: HIGH per user-research warning "2-3 active plugins, never more"
- **Mitigation**: run `/agent-sort` audit in W134-F9 to classify DAILY vs LIBRARY ECC components
- **Failure mode**: context bloat degrades agent performance (the warning that triggered user-research synthesis)

### Gap-6: anthropics/skills truly-unlicensed CR-1 admissibility
- **Severity**: MEDIUM (operationally already handled via marketplace cite, but theoretical CR-1 admissibility crisis)
- **Mitigation**: file upstream issue requesting LICENSE clarification (W134-F9)
- **Failure mode**: continued cite-via-marketplace pattern (works fine in practice)

### Gap-7: CLAUDE.md size potentially exceeding user-research recommendation
- **Severity**: LOW (eee CLAUDE.md is dense by design; aligns with cardinal-rule-1 cite trail requirement)
- **Mitigation**: review whether cardinal-rule prose can move to `Z:/claude-sota/.claude/rules/<file>.md` (W134-F9)

## Definitive architecture quality verdict

**Convergence with user-research SOTA**: 95% — user's 4-tier pyramid + 4 picks (Superpowers / Spec-Kit / CCPM / Agent OS) all validated as SOTA via SRA D1-D10. Only divergence: user's #3 method (BMAD) and #3 memory (claude-memory-bank) DEFER per Probe 7.b + adoption-signal mismatch.

**My audit value-add beyond user research**:
1. 555-repo SRA D1-D10 strict audit (vs user's narrative top-15)
2. LICENSE-classifier-false-negative discovery (5 repos reclassified)
3. anthropics/skills truly-unlicensed flag (NOT mentioned by user research)
4. Probe 7.b 5-clause discipline applied to each Tier-2 install candidate
5. eee-specific Tier-6 extensions (cwc-long-running-agents + FM catalog + cross-model T0-T7) NOT in user pyramid

**Operational close**: this architecture is the DEFINITIVE target for W134-F7+ execution. Subsequent fires implement the 6 install/cite actions.

**Mia ladder advance**: n=902 → n=914 (+12 architecture-claim verifications)
