# 01 — User SOTA Stack Validation (May 2026 external research vs my Fire 5 audit)

**Source**: User's external SOTA research synthesis attached in W134-F6 directive (May 2026).
**Probe data**: `_extension-and-reaudit-metadata.json` (deep gh API + LICENSE-file content + README head for 18 repos).
**Audit date**: 2026-05-10.

## Methodology

User identified canonical 4-tier stack. Each entry cross-referenced to:
- My Fire 5 audit verdict (B1-B6)
- Deep re-probe (LICENSE file content + repo metadata + age + push freshness)
- Final reconciled SRA D1-D10 verdict

Where my Fire 5 verdict diverges from user research, I provide HONEST-NON-FINDING with reasoning + reconciliation.

## Tier 0 — Anthropic foundation

### CLAUDE.md pattern

- **User cite**: `claude.com/blog/using-claude-md-files` (Anthropic's official guide)
- **My status**: ALREADY IMPLEMENTED at `Z:/claude-sota-installed/CLAUDE.md` (12 cardinal rules) + `CLAUDE.local.md` (env block)
- **Verdict**: **✅ CONVERGENT-INSTALLED** — eee runtime has rich CLAUDE.md per CCBP `claude-memory.md` upstream pattern
- **Gap**: NONE; eee CLAUDE.md is denser than user-research recommends ("small precise CLAUDE.md often outperforms bloated framework")
- **Recommendation**: review CLAUDE.md size vs user-research signal "small CLAUDE.md + many skills + one method framework"; current eee CLAUDE.md is ~600 lines — possibly heavier than canonical SOTA

### anthropics/skills

- **User cite**: 131k★ Anthropic reference skills (docx, pdf, pptx, xlsx, brand-guidelines, skill-creator)
- **My re-probe**: 131,576★, **TRULY UNLICENSED** (no LICENSE file at root despite Anthropic OFFICIAL ownership), created 2025-09-22, push 1d ago, topics `['agent-skills']`
- **Verdict**: **⚠️ CRITICAL DIVERGENT** — Despite user's canonical Tier-0 status, `anthropics/skills` LITERALLY HAS NO LICENSE FILE at root. CR-1 cite tier admissibility requires permissive license; without it, status defaults to ALL-RIGHTS-RESERVED + no permission to use beyond what GitHub's TOS permits.
- **Reconciliation**: Anthropic likely intends Apache-2.0 or MIT (consistent with rest of `anthropics/*` org) but the LICENSE file is **literally missing**. This is either (a) GitHub bug, (b) genuine oversight, or (c) deliberate policy (unlikely given other Anthropic repos have LICENSE files).
- **Action**: file upstream issue requesting LICENSE file clarification; meanwhile cite-only-NOT-INSTALL via Anthropic OFFICIAL marketplace (where licensing is explicit per plugin's own LICENSE file).
- **SRA score**: D1=FAIL-PROVISIONAL / D4=PASS-TIER-1 / D6=PASS / D7=PASS (Anthropic-aligned per definition) / others=PASS → mixed; **resolved verdict: ALREADY-CITED-via-marketplace** (the Anthropic plugins marketplace has LICENSE clarity per `anthropics/claude-plugins-official` MIT)

### anthropics/claude-plugins-official

- **User cite**: First-party marketplace
- **My status**: ALREADY INSTALLED at `.claude/plugins/marketplaces/claude-plugins-official/` per `sota-installed-manifest.md` §3
- **Verdict**: **✅ CONVERGENT-INSTALLED**

### Plan Mode + checkpoints

- **User cite**: Built into Claude Code (Shift+Tab plan, Ctrl+G plan-editor, double-Esc rewind)
- **My status**: Built-in CC feature; documented in CLAUDE.md cardinal-rule-3 (cross-model T1-T5 lifecycle includes Plan → T1 → Implement)
- **Verdict**: **✅ CONVERGENT-INSTALLED** — eee uses Plan Mode per Anthropic CC sub-agents docs + RPI workflow `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/rpi/rpi-workflow.md`

## Tier 1 — Method framework (PICK ONE — user research)

### 🥇 obra/superpowers (User's #1 method pick)

- **User cite**: "Built by Jesse Vincent at Prime Radiant. Available in Anthropic's official marketplace. Auto-triggered skills for TDD (RED-GREEN-REFACTOR enforced), root-cause debugging, subagent-driven code review, worktree management. Most installed framework per libhunt."
- **My re-probe**: **185,185★** (HIGHER than user-research's snapshot), **MIT** (Jesse Vincent), created 2025-10-09, push 2d ago, MIT confirmed via LICENSE file content read.
- **My Fire 5 status**: pre-existing baseline already-cited; INSTALLED via marketplace per `sota-installed-manifest.md` §3
- **Verdict**: **✅ CONVERGENT-INSTALLED + USER-#1-RANKING** — eee has Superpowers active; cardinal-rule-11 META-process uses superpowers skills (verification-before-completion / requesting-code-review / etc.)
- **SRA score**: D1=PASS-MIT / D2=PASS-2d-push / D3=PASS-185k-star + 7mo-age (STRONG-PROVENANCE-EXPRESS — Jesse Vincent named-T2 author) / D4=PASS-named-T2 / D5=PASS-active / D6=PASS-autonomous-mode / D7=PASS-Anthropic-marketplace / D8=PASS-massive / D9=no FM / D10=PASS-installed → **10/10 PASS**

### 🥈 github/spec-kit (User's #2 method pick)

- **User cite**: "Most rigorous spec-driven workflow. Constitution → specify → clarify → plan → tasks → analyze → implement. SkillsIntegration mode for Claude Code (`--integration-options=\"--skills\"`). 70+ community extensions. v0.8.1."
- **My re-probe**: **95,110★** MIT (GitHub Inc), created 2025-08-21, push 1d ago, topics `['ai', 'copilot', 'development', 'engineering', 'prd', 'spec', 'spec-driven']`
- **My Fire 5 status**: STUDY-PILOT-CANDIDATE (B3 top entry)
- **Verdict**: **✅ CONVERGENT-NOT-YET-INSTALLED — Tier-1 NEXT-INSTALL CANDIDATE**
- **SRA score**: D1=PASS-MIT / D2=PASS / D3=PASS-95k-star (GitHub Inc named-T1 org per `convergence-gate.md` STRONG-PROVENANCE-EXPRESS) / D4=PASS-T1-OFFICIAL / D5=PASS-active / D6=PASS-Skills-integration-mode / D7=PASS-Anthropic-aligned / D8=PASS / D9=no FM / D10=PASS → **10/10 PASS**
- **Probe 7.b 5-clause** (per user-research demand-signal):
  1. **Named use case**: "spec-driven dev for new sss features that need RFCs" — sss has cross-model T1-T5 lifecycle but lacks formal spec→clarify→plan→tasks discipline
  2. **Local input/source path**: future sss `docs/specs/<feature>/` directory
  3. **Wiring path**: `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git` + `specify init <project> --integration claude --integration-options="--skills"`
  4. **Incumbent comparison**: sss has `Z:/claude-sota/.claude/rules/cross-model-consensus.md` T1-T5 cycle but it's per-fire not per-feature-spec; Spec-Kit adds feature-level spec lifecycle
  5. **Reversible time-box**: 30-day pilot; success = ≥1 multi-fire feature shipped via spec-kit lifecycle; retire path = `pip uninstall specify-cli`
- **Recommendation**: **INSTALL as Tier-1 method-2 in W134-F7**

### 🥉 bmad-code-org/bmad-method (User's #3 method pick)

- **User cite**: "Build More Architect Dreams. 12+ specialized agent personas. V6 introduced Skills Architecture and is more expansion-pack-friendly (game dev, marketing, ML)."
- **My Fire 5 verdict**: REJECT-FOR-FIT-LICENSE (NOASSERTION at 46k★)
- **My re-probe**: 46,792★, **ACTUALLY MIT** (LICENSE-CLASSIFIER FALSE-NEGATIVE!) — license file head: `"MIT License  Copyright (c) 2025 BMad Code, LLC  This project incorporates contri..."` — SPDX classifier flagged NOASSERTION because the file mixes MIT with "This project incorporates contributions from..." which confuses auto-detection.
- **Verdict**: **⚠️ FIRE-5-OVER-CLAIM CORRECTED → STUDY-PILOT-CANDIDATE**
- **SRA score (revised)**: D1=PASS-MIT (corrected) / D2=PASS-0d-push / D3=PASS-46k-star + 13mo-age / D4=PASS-org-named / D5=PASS / D6=PASS-expansion-packs / D7=PASS / D8=PASS / D9=no FM / D10=PASS → **10/10 PASS**
- **Probe 7.b**: heavier than Superpowers (12+ agent personas + virtual team). User-research notes "Heavier than the other two — worth it for larger projects or teams." sss is solo-operator + autonomous /loop — BMAD's overhead exceeds demand.
- **Verdict**: **DEFER** (Probe 7.b not satisfied — virtual-team value-prop doesn't fit autonomous /loop workflow; BMAD's pattern overlaps with sss's existing advanced-agent-team standing directive)

## Tier 2 — Project management layer (PICK ONE — user research)

### 🥇 automazeio/ccpm (User's #1 PM pick)

- **User cite**: "PRD → epic → tasks, all plain markdown. Each task gets `acceptance_criteria`, `effort`, `depends_on`, `parallel`, `conflicts_with` metadata. Agent Skills standard, harness-agnostic. **Cleanest 'markdown is the database' implementation.**"
- **My Fire 5 verdict**: DEFER (push ~50d stale concern)
- **My re-probe**: 8,084★, MIT (Ran Aroussi), 264d age, **push 53d ago** (still 53d stale — confirms my Fire 5 finding)
- **Verdict**: **⚠️ MIXED — push freshness concern stands BUT user-research strongly signals SOTA**
- **SRA score**: D1=PASS-MIT / D2=PARTIAL (53d push — borderline freshness) / D3=PASS-8k-star (Ran Aroussi is named-T2-author per yfinance/pandas-ta) / D4=PASS-named-T2 / D5=PARTIAL / D6=PASS-Agent-Skills / D7=PASS / D8=PASS / D9=no FM / D10=PASS → **8/10 PASS, 2/10 PARTIAL**
- **Probe 7.b 5-clause**:
  1. **Named use case**: "PRD-to-tasks pipeline for sss multi-fire features" — sss has Wave/Fire arc tracking but no PRD format
  2. **Local input/source path**: `.claude/prds/<feature>.md` + `.claude/epics/<feature>/`
  3. **Wiring path**: `/plugin install ccpm@<marketplace>` IF marketplace exists; ELSE git clone + manual integration
  4. **Incumbent comparison**: sss tasks (TaskCreate/TaskUpdate) cover within-fire tracking; CCPM adds cross-fire PRD-level structure
  5. **Reversible time-box**: 30-day pilot; success = ≥1 multi-fire arc tracked via CCPM PRD→epic→tasks; retire = delete `.claude/prds/` + revert plugin
- **Recommendation**: **STUDY-PILOT** — install in W134-F7 alongside Spec-Kit; complement, not substitute

### 🥈 eyaltoledano/claude-task-master (User's #2 PM pick)

- **User cite**: "Lives in `.taskmaster/`, parses PRDs into structured tasks with research-backed expansion (Perplexity integration). MCP-native, `task-master start <id>` auto-launches Claude Code with full task context."
- **My Fire 5 verdict**: REJECT-FOR-FIT-LICENSE (NOASSERTION at 27k★)
- **My re-probe**: 27,080★, **ACTUALLY MIT** (FALSE-NEGATIVE — header reads "Task Master License" then body is "MIT License Copyright (c) 2025 — Eyal Toledano, Ralph Khre..."). SPDX classifier confused by custom header.
- **Verdict**: **⚠️ FIRE-5-OVER-CLAIM CORRECTED → STUDY-PILOT-CANDIDATE**
- **Compared to CCPM**: User-research notes "Stronger if you want AI to *generate and decompose* tasks; CCPM is stronger if you want the artifacts cleanly versioned."
- **Recommendation**: **DEFER pending CCPM pilot outcome** — install Task Master only if CCPM Probe 7.b shows AI-decomposition demand is high

### 🥉 OthmanAdi/planning-with-files (User's #3 minimalist pick — NEW to my baseline)

- **User cite**: "Cleanest implementation of the Manus 'markdown-as-working-memory' pattern. `task_plan.md` + `findings.md` + `progress.md` + `/plan` and `/start` commands. Hash-attestation. If CCPM and Task Master feel like overkill, this is the right starting point."
- **My probe (NEW)**: **20,812★** MIT (Ahmad Adi), created 2026-01-03 (127d old), push 5d ago. Description: "Claude Code skill implementing Manus-style persistent markdown planning — the workflow pattern behind the $2B acquisition". Topics include `claude-skills`, `agent-skills`, `antigravity`, `copilot-skills`.
- **Verdict**: **🆕 NEW-BASELINE-EXTENSION + STUDY-PILOT-CANDIDATE**
- **SRA score**: D1=PASS-MIT / D2=PASS-5d-push / D3=PASS-20k-star + 4mo-age (STRONG-PROVENANCE-EXPRESS via $2B-acquisition cite + 20k stars in 4mo) / D4=PASS-solo-named (Ahmad Adi) / D5=PASS / D6=PASS-Agent-Skills-standard / D7=PASS-Anthropic-aligned / D8=PASS / D9=no FM / D10=PASS → **10/10 PASS**
- **Recommendation**: **INSTALL as Tier-2 lightweight PM in W134-F7** — sister to CCPM; user research presents as the minimalist alternative

## Tier 3 — Standards & memory (orthogonal — install BOTH if relevant)

### buildermethods/agent-os (User's standards pick — NEW to my baseline)

- **User cite**: "v3 *retired* its own implementation/orchestration phases and now defers to Claude Code's Plan Mode. Use it as your standards layer alongside any Tier 1 framework. `/inject-standards` and `/shape-spec`."
- **My probe (NEW)**: **4,487★** MIT (CasJam Media LLC / Builder Methods), created 2025-07-16 (297d old), push 5d ago.
- **Verdict**: **🆕 NEW-BASELINE-EXTENSION + STUDY-PILOT-CANDIDATE**
- **SRA score**: D1=PASS-MIT / D2=PASS-5d-push / D3=PASS-4.4k-star + 10mo-age / D4=PASS-org-named (CasJam Media — Builder Methods consultancy) / D5=PASS / D6=PASS-Plan-Mode-deferred-design / D7=PASS-Anthropic-aligned (defers to Plan Mode) / D8=PASS / D9=no FM / D10=PASS → **10/10 PASS**
- **Recommendation**: **INSTALL as Tier-3 standards layer in W134-F8**

### russbeye/claude-memory-bank (User's memory pick — NEW to my baseline)

- **User cite**: "Structured memory in `.claude/memory_bank/` with categories for decisions/, patterns/, architecture/, troubleshooting/. JIT retrieval via `/context-query`. 12 specialized memory agents."
- **My probe (NEW)**: **13★** MIT (Russ Beye), created 2025-09-07 (244d old), push 2025-09-28 (**224d stale!**)
- **Verdict**: **🆕 NEW-BASELINE-EXTENSION but DEFER per low-star + stale-push**
- **SRA score**: D1=PASS-MIT / D2=FAIL-224d-stale / D3=FAIL-13-stars / D4=PASS-solo-named / D5=FAIL-stale / D6=PASS-Agent-Skills / D7=PASS / D8=FAIL-low-adoption / D9=no FM / D10=PARTIAL → **4/10 PASS, 5/10 FAIL**
- **Recommendation**: **DEFER** — user-research signal exists but low community adoption + stale-push (224d) violates SRA D2+D3+D5+D8. Currently eee has L1 mcp-memory-service + L3 Graphiti + memory file system; memory-bank's specific patterns can be CITE-only-not-install. Re-audit when push freshens AND stars grow.

## Tier 4 — Curated skill libraries (cherry-pick, never install whole — user research)

### ComposioHQ/awesome-claude-skills (User cite)

- **User cite**: Best curated awesome-list
- **My Fire 5 verdict**: REJECT-FOR-FIT-LICENSE (NONE at 59k★)
- **My re-probe**: 59,061★, **TRULY UNLICENSED** (no LICENSE file content found)
- **Verdict**: **✅ CONVERGENT-on-cite-only-not-install** — already-cited in `Z:/claude-sota/.claude/rules/research-protocol.md` §6-catalog discovery surface
- **Action**: cite-only, never fork-modify

### travisvn/awesome-claude-skills (User cite — NEW to my baseline)

- **User cite**: Sister to ComposioHQ — best curated lists
- **My probe (NEW)**: **12,349★**, **NO LICENSE**, created 2025-10-16 (205d), push 12d ago
- **Verdict**: **🆕 NEW-BASELINE-EXTENSION + REJECT-FOR-FIT-LICENSE (cite-only-acceptable)**
- **Action**: add to `Z:/claude-sota/.claude/rules/research-protocol.md` §6-catalog discovery surface ALONGSIDE ComposioHQ as alternative

### alirezarezvani/claude-skills

- **User cite**: "232+ skills, 5,200+ stars, organized by domain"
- **My Fire 5 status**: ALREADY-CITED in CLAUDE.md `research-protocol.md` cite anchor
- **Verdict**: **✅ CONVERGENT-CITE-ONLY**

### claudemarketplaces.com + skillsmp.com

- **User cite**: Discovery UIs
- **My status**: URLs not repos; cite-only references
- **Verdict**: **✅ CONVERGENT-cite-only**

## Tier 5 — Reference (read once, bake into your own setup)

### Piebald-AI/claude-code-system-prompts (NEW to my baseline)

- **User cite**: "Anthropic's own system prompts, builtin tool descriptions, sub-agent prompts (Plan/Explore/Task), CLAUDE.md generation prompts. Single best reference for understanding *how* Claude Code actually thinks."
- **My probe (NEW)**: **10,086★** MIT (Piebald LLC), created 2025-11-18 (172d), push 1d ago. Topics `['claude-code', 'claude-code-system-prompts', 'system-prompts']`.
- **Verdict**: **🆕 NEW-BASELINE-EXTENSION + STUDY-PILOT-CANDIDATE-CITE-CLASS**
- **SRA score**: D1=PASS-MIT / D2=PASS-1d-push / D3=PASS-10k-star + 5.6mo-age / D4=PASS-named-org-Piebald / D5=PASS / D6=PASS-cite-only-not-install / D7=PASS-Anthropic-aligned-via-reverse-engineering / D8=PASS / D9=no FM / D10=PASS-via-cite → **10/10 PASS**
- **Recommendation**: **CITE-IMPORT** — add to `Z:/claude-sota/.claude/rules/citation-discipline.md` TIER-2 cite-anchors as "Anthropic CC internals reference (reverse-engineered by Piebald)"; do NOT install — read once + bake patterns into eee's existing skill authoring

### Anthropic's official docs (`code.claude.com/docs/en/skills`)

- **User cite**: TIER-1-DIRECT authority
- **My status**: ALREADY CITED throughout CLAUDE.md cardinal rules + `research-protocol.md`
- **Verdict**: **✅ CONVERGENT-CITED**

## Critical reconciliation summary

### Fire 5 OVER-claims corrected (LICENSE-classifier false-negatives)

5 repos that Fire 5 flagged as REJECT-FOR-FIT-LICENSE are actually permissive:

| Repo | Fire 5 SPDX | Actual License (from file) | Reclassify to |
|---|---|---|---|
| bmad-code-org/bmad-method | NOASSERTION | MIT (with "incorporates contributions" suffix) | STUDY-PILOT (still DEFER per Probe 7.b — virtual-team overhead) |
| eyaltoledano/claude-task-master | NOASSERTION | MIT (with custom "Task Master License" header) | STUDY-PILOT (deferred pending CCPM pilot) |
| modelcontextprotocol/servers | NOASSERTION | MIT→Apache-2.0 transition (both permissive) | STUDY-PILOT-CITE-CLASS |
| modelcontextprotocol/modelcontextprotocol | NOASSERTION | MIT→Apache-2.0 transition | STUDY-PILOT-CITE-CLASS |
| humanlayer/humanlayer | NOASSERTION | Apache Software License 2.0 | STUDY-PILOT |

**Recommendation**: file a CR-1 cite-class refinement — when SPDX returns NOASSERTION, run direct LICENSE-file-content probe BEFORE classifying as REJECT-FOR-FIT-LICENSE. Mia ladder advance n=853 → n=858 (+5 corrections).

### Anthropic-OFFICIAL truly-unlicensed concern

`anthropics/skills` (131k★) and `anthropics/claude-agent-sdk-typescript` (1.4k★) literally have NO LICENSE file. This is a **CR-1 admissibility crisis** for the Tier-0 foundation user-research recommends:

- User's stack assumes `anthropics/skills` is the canonical reference repo for Agent Skills standard
- Without LICENSE, even cite-import is technically permission-undefined under default copyright
- Recommendation: file upstream issue with Anthropic OR rely on the `claude-plugins-official` marketplace where individual plugins have explicit LICENSE

### Anthropic-aligned but ELv2 confirmed

`mksglu/context-mode` 14k★ ELv2 — user-research did not flag, but my Fire 5 already correctly classified. ELv2 is acceptable for sss local-plugin use-class per SRA D1 use-class precision.

## Adoption decision matrix (post-validation)

| Tier | User pick | My final verdict | Action queue |
|---|---|---|---|
| Tier 0: CLAUDE.md | ✅ implemented | ✅ INSTALLED | (review size for trimming opportunity) |
| Tier 0: anthropics/skills | foundation | ⚠️ cite-only via marketplace (no LICENSE) | file upstream issue |
| Tier 0: claude-plugins-official | foundation | ✅ INSTALLED | none |
| Tier 0: Plan Mode | built-in | ✅ ACTIVE | none |
| Tier 1: obra/superpowers | 🥇 method | ✅ INSTALLED via marketplace | none |
| Tier 1: github/spec-kit | 🥈 method | 🟡 INSTALL CANDIDATE (W134-F7) | install + 30-day pilot |
| Tier 1: bmad-code-org/BMAD | 🥉 method | ⚠️ DEFER (overhead-vs-demand) | re-evaluate when sss adds team-workflow |
| Tier 2: automazeio/ccpm | 🥇 PM | 🟡 INSTALL CANDIDATE (W134-F7) | install + 30-day pilot (despite 53d stale-push concern) |
| Tier 2: task-master | 🥈 PM | ⚠️ DEFER pending CCPM outcome | re-evaluate post-CCPM |
| Tier 2: planning-with-files | 🥉 PM (minimalist) | 🟡 INSTALL CANDIDATE (W134-F7) | install — Manus-style + 20k★ |
| Tier 3: agent-os v3 | standards | 🟡 INSTALL CANDIDATE (W134-F8) | install + `/inject-standards` test |
| Tier 3: claude-memory-bank | memory | ⚠️ DEFER (low-star + stale) | re-audit when fresh |
| Tier 4: awesome-claude-skills | cite-only | ✅ CITED | add travisvn alongside ComposioHQ |
| Tier 5: Piebald system-prompts | reference | 🟡 CITE-IMPORT | add to citation-discipline.md TIER-2 |

## Next-fire ship plan

**W134-F7 — 4 INSTALLS (Tier 1+2)**:
1. github/spec-kit (Tier-1 method-2) — `uv tool install specify-cli`
2. automazeio/ccpm (Tier-2 PM-1) — git clone OR marketplace install
3. OthmanAdi/planning-with-files (Tier-2 PM-3 minimalist) — git clone for `.claude/skills/`
4. (defer Task Master + Memory Bank per Probe 7.a/D8)

**W134-F8 — 1 INSTALL + 1 CITE (Tier 3 + Tier 5)**:
5. buildermethods/agent-os (Tier-3 standards) — `/inject-standards`
6. Piebald-AI/claude-code-system-prompts (Tier-5 reference) — CITE-IMPORT to `citation-discipline.md`

**W134-F9 — Anthropic/skills LICENSE crisis resolution**:
- Probe Anthropic upstream issue tracker / Discord for `anthropics/skills` LICENSE status
- File upstream issue if no recent traffic; meanwhile cite-only-via-marketplace stands

**W134-F10 — definitive architecture synthesis** (folder file 05)

**Mia ladder advance**: n=853 → n=860 (+7 verifications including 5 LICENSE-classifier false-negative corrections + 2 truly-unlicensed-Anthropic confirmations)
