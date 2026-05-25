# 01 — User-provided 9-layer SOTA reference architecture (condensed baseline)

> **Source**: User-provided document this session turn (cite-anchor: conversation transcript Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/61a97310-6a3c-4623-b657-a69726eb22ff.jsonl — user message containing "# The Definitive Research Architecture for a Solo Developer Using Claude Code (May 2026)")
> **Treatment**: TIER-1-USER-DIRECTIVE inspiration; per-component Mia probe before adoption; CR-12 5-class disposition per candidate
> **Date**: 2026-05-10

This file condenses the user's comprehensive architecture document into a compact baseline for downstream gap matrix referencing. Full verbatim text lives in the source transcript.

## Verbatim TL;DR

> "The closed-loop SOTA research architecture is nine layers (L0–L8) assembled from a minimal-but-comprehensive set of named repos and MCPs: Claude Code 2.x + Superpowers (skills/methodology) + Spec-Kit (constitution/specs) + planning-with-files (persistent state) at the foundation; **github/github-mcp-server + Sourcebot + OSSInsight + Star History + DeepWiki MCP** for discovery; **Serena + RepoMix + ast-grep + DeepWiki + Context7** for ingestion and code intelligence; **OpenSSF Scorecard + OSV-Scanner + Trivy + Syft + Snyk Advisor + deps.dev + Semgrep** for multi-signal evaluation; **anthropics/skills skill-creator (Executor/Grader/Comparator/Analyzer) + Inspect AI + Promptfoo + DeepEval** for behavioral/A/B comparison; **MADR via log4brains + planning-with-files findings.md/comparison-matrix.md** for selection/knowledge management; **Spec-Kit /speckit.constitution → /speckit.plan → /speckit.implement** for construction handoff; and **OpenTelemetry → Langfuse + Splitrail + claude_telemetry** for the observability/feedback loop."

## The 9 layers

```
L0 FOUNDATION:   Claude Code 2.x + Superpowers + Spec-Kit + planning-with-files + ECC + codex
L1 DISCOVERY:    GitHub MCP + gh + OSSInsight + Star History + deps.dev + Snyk Advisor + 
                 awesome-* + Brave + Exa + arXiv + Semantic Scholar + PulseMCP + DeepWiki dir
L2 INGESTION:    gh clone + Software Heritage + Firecrawl + RepoMix + DeepWiki MCP + local cache
L3 EVALUATION:   surface signals + Scorecard + Snyk Advisor + deps.dev + OSV + Trivy + Syft +
                 Semgrep + ast-grep + CodeQL + Serena + SPDX/ScanCode/FOSSA + maintainer credibility
L4 COMPARISON:   skill-creator (Executor/Grader/Comparator/Analyzer) + Inspect AI + Promptfoo +
                 DeepEval + custom task harness + Vibe Code Bench / VIBE / SWE-bench Pro
L5 SELECTION:    weighted rubric S25/M20/C25/Co15/L10/P5 + comparison-matrix.md + log4brains MADR
L6 KNOWLEDGE:    planning-with-files (task_plan/findings/progress + hooks + attestation) +
                 Spec-Kit constitution + docs/adr/* + docs/research/comparisons/* + mem0 (optional)
L7 CONSTRUCTION: Superpowers + Spec-Kit + Context7 + Playwright MCP + Apify MCP + skill-creator
L8 FEEDBACK:     OTel → Langfuse + Splitrail + claude_telemetry + post-mortem ADRs + quarterly recursion
```

## The 9 dimensions (A-I) prescribed picks

| Dim | Topic | Prescribed picks |
|---|---|---|
| **A** | GitHub Discovery & Search | GitHub MCP + gh CLI + OSSInsight + Star History + deps.dev + Sourcebot + ast-grep + Semgrep |
| **B** | Repo Evaluation & Quality Scoring | Scorecard + Snyk Advisor + deps.dev + OSV-Scanner + Trivy + Syft + Semgrep + Sigstore |
| **C** | Code Intelligence & Semantic Indexing | Serena + RepoMix + DeepWiki MCP + ast-grep + Semgrep |
| **D** | Web/Crawl/Research | Brave + Firecrawl + Exa + Context7 + Playwright MCP + Apify MCP |
| **E** | Memory & Knowledge Management | planning-with-files + log4brains MADR + Spec-Kit constitution (+ mem0 optional) |
| **F** | Evaluation Frameworks | skill-creator + Inspect AI + Promptfoo + DeepEval |
| **G** | Comparison & Decision-Making | comparison-matrix.md + log4brains + gh-projects + Mermaid |
| **H** | Construction Handoff | Superpowers + Spec-Kit + planning-with-files + Context7 + Playwright + skill-creator + log4brains |
| **I** | Observability & Feedback | Native OTel → Langfuse + Splitrail + claude_telemetry |

## Weighted Rubric (rubric.md)

| Dimension | Weight | Inputs |
|---|---|---|
| Security | 25% | Scorecard + OSV-Scanner + Trivy/Grype + Best-Practices-Badge |
| Maintenance | 20% | commits-90d + contributors-active + Scorecard.Maintained + Snyk M |
| Capability | 25% | skill-creator eval pass-rate vs task prompts |
| Community | 15% | stars (log-scaled) + fork velocity + issue response time |
| License/Compl. | 10% | SPDX vs allowlist; copyleft penalty |
| Performance | 5% | micro-benchmarks if applicable, else neutral |

## 11-Step Research Workflow

1. **DEFINE** — `.specify/memory/constitution.md` Goal/Constraints/Acceptance + `/speckit.constitution`
2. **DISCOVER** — GitHub MCP + OSSInsight + Star History + deps.dev + Firecrawl + Brave + Exa → findings.md candidates
3. **TRIAGE** — surface filters (stars, last_commit, license allowlist, contributors, Snyk health) → cap top 5
4. **DEEP EVALUATE** — Scorecard + Snyk + OSV + Syft+Grype + Trivy + Semgrep + ast-grep + (CodeQL) → findings.md results
5. **SEMANTIC ANALYSIS** — RepoMix + Serena + DeepWiki + (Sourcebot) → findings.md Q&A
6. **BENCHMARK** — skill-creator Executor/Grader/Comparator/Analyzer + Inspect AI + Promptfoo
7. **COMPARE** — weighted rubric → comparison-matrix.md + tie-breakers + sensitivity ±5%
8. **SELECT** — log4brains ADR new (Context/Decision/Consequences/Alternatives)
9. **HANDOFF** — append to constitution `## Selected SOTA Dependencies` + `/speckit.specify` → `.plan` → `.tasks` → `.implement`
10. **BUILD** — Superpowers brainstorming → writing-plans → subagent-driven-development → Context7 docs → Playwright validation → ADRs as decisions arise
11. **FEEDBACK** — OTel traces → Langfuse + Splitrail per-session cost + post-mortem ADR; quarterly: re-run steps 4-7 on architecture itself

## 12 Failure modes + mitigations (summary)

1. **Star bias** → cap stars 5% weight; require Scorecard + Snyk + own eval
2. **Awesome-list bloat** → treat as discovery hint only; full L3 eval
3. **Stale benchmarks** → never quote SWE-bench ≥85% as verdict (SWE-ABS 19.78% false-positive); use Inspect AI + skill-creator on real tasks
4. **Maintainer abandonment** → Scorecard.Maintained <5 reject; bus-factor 1 + no 90d commits reject; Sigstore required for high-trust
5. **Security theater** → Scorecard alone insufficient; require ZERO Critical OSV + High-with-fix patched in 30d
6. **License pollution** → SPDX scan in CI; allowlist; copyleft penalty
7. **Prompt injection in research data** → Simon Willison Lethal Trifecta filter; never full-read untrusted text with private data + exfiltration vector; use Serena symbol view or repomix compressed dump; `.claudeignore` for secrets; plan-attestation SHA-256
8. **Hallucinated repos** → `gh repo view owner/repo` verification before any cite
9. **MCP supply-chain risk** → Snyk ToxicSkills Feb 2026 found 36% of public Agent Skills had prompt injection; install only from `claude-plugins-official` or repos with ≥1000 stars + recent commits + Sigstore-signed + no opaque post-install
10. **YOLO mode drift** → never `--dangerously-skip-permissions` outside isolated CI
11. **Source leak** → don't run agents from `~/`; cd into project root with `.claudeignore` set; audit Splitrail
12. **Tokenocalypse-style billing bugs** → pin Claude Code version; compare Splitrail counts to dashboard weekly

## 9 caveats (summary)

1. Benchmark numbers are time-stamped and stale fast — treat leaderboard figures as upper bounds
2. Anthropic's Git MCP CVE-2025-68143/144/145 (prompt-injection) + Trivy 2026 supply-chain compromises — verify current advisories
3. Claude Code v2.1.100 Tokenocalypse regression — pin v2.1.34 if affected
4. Anthropic skills marketplace policy changed April 4, 2026 — Pro/Max restrictions
5. DeepWiki free for PUBLIC repos only; private requires Cognition AI / Devin account
6. Future-tense language in source articles treated as marketing (e.g., "Promptfoo now part of OpenAI" — verify)
7. Snyk ToxicSkills 36% applies to public ClawHub/skills.sh — official `claude-plugins-official` is not in that 36%
8. Hosted services (Sourcegraph, Sourcebot Cloud, Greptile) shift pricing — self-hosted alternatives prescribed
9. OpenTelemetry GenAI conventions still Experimental as of early 2026 — wrap traces in OTel-pure attributes for portability

## Day 1 install set (per user document, ≤60 minutes)

```bash
npm install -g @anthropic-ai/claude-code
claude /plugin marketplace add obra/superpowers-marketplace
claude /plugin install superpowers@superpowers-marketplace
npx skills add OthmanAdi/planning-with-files --skill planning-with-files -g
claude /plugin install skill-creator@claude-plugins-official
claude mcp add serena -s user -- uvx --from git+https://github.com/oraios/serena \
  serena start-mcp-server --context ide-assistant --project .
brew install scorecard osv-scanner trivy syft grype semgrep ast-grep   # Windows: chocolatey or alt
npm i -g log4brains
```

## Conflicts to AVOID (per user document)

- Sourcegraph + Sourcebot (both index same repos)
- Letta + mem0 (both memory authority)
- tweakcc + Superpowers (SessionStart hook conflict)
- Trivy + Snyk Container in CI (overlap)
- Greptile + Sourcebot + Sourcegraph + DeepWiki simultaneously (context budget)
- More than 5 active MCPs without MCP Tool Search enabled

## Cite anchor

- Primary: User-provided document this session turn (TIER-1-USER-DIRECTIVE)
- Secondary cite-reinforcements user document already embeds: Claude Mythos Preview 93.9% / Opus 4.7 87.6% SWE-bench Verified; SWE-ABS 19.78% false-positive (March 2026); METR reviewer-merge ~24pp below benchmark; Snyk ToxicSkills 36% prompt-injection in public Agent Skills (Feb 2026); Zahan et al. arxiv 2601.18344 (75.9% of PyPI scores 0 on Maintained); CVE-2025-68143/144/145 Anthropic Git MCP
- TIER-3-LOCAL-COMPOSITION cite-class via `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — composition glue with user-derived inspiration counts as TIER-3 not TIER-1 per MIN_PRECEDENCE; treat as INSPIRATION for gap analysis, NOT as authority for adoption decisions

## Adoption disposition (translated to claude-sota-installed)

| Layer | User says PRESCRIBED | claude-sota-installed disposition |
|---|---|---|
| L0 | Claude Code 2.x + Superpowers + Spec-Kit + planning-with-files | ✅ ALREADY INSTALLED (95%+) |
| L1 | GitHub + OSSInsight + Star History + deps.dev + Brave + Exa + Firecrawl + Context7 | ⚠️ MIXED (most via MCP; OSSInsight + Star History + deps.dev gap) |
| L2 | gh + Firecrawl + RepoMix + DeepWiki | ✅ ALREADY INSTALLED |
| L3 | Scorecard + Snyk + deps.dev + OSV + Trivy + Syft + Semgrep + ast-grep + Serena + Sigstore | ⚠️ MIXED (OSV/Trivy/Semgrep/ast-grep/Serena ✅; Scorecard/Snyk/Syft+Grype/Sigstore ❌) |
| L4 | skill-creator + Inspect AI + Promptfoo + DeepEval | ⚠️ MIXED (Inspect AI/Promptfoo/DeepEval ✅; skill-creator GAP) |
| L5 | log4brains + comparison-matrix.md | ❌ GAP (log4brains not installed) |
| L6 | planning-with-files + Spec-Kit constitution + mem0 (optional) | ⚠️ MIXED (verify planning-with-files; mem0 deferred) |
| L7 | Superpowers + Spec-Kit + Context7 + Playwright + skill-creator | ✅ ALREADY INSTALLED (skill-creator gap noted in L4) |
| L8 | OTel + Langfuse + Splitrail + claude_telemetry | ⚠️ MIXED (Langfuse ✅; Splitrail/claude_telemetry ❌; Phoenix/openlit verify) |

Full per-component CR-12 disposition in 02-gap-matrix.md.

## Mia ladder advance (Fire 28 baseline)

n=1968 (tracker) → **n=1985** (+17: 9-layer condensed + 9-dimension matrix + rubric + 11-step workflow + 12 failure modes + 9 caveats + Day 1 install set + conflicts-to-avoid + adoption disposition translation + cite anchor + TIER-1-USER-DIRECTIVE class + verbatim TL;DR preservation + composition cite class per rule #8 + INSPIRATION-not-authority discipline + 9-layer-to-installed disposition + Mia-probe-mandate per component + roadmap forward-ref to 02-gap-matrix)
