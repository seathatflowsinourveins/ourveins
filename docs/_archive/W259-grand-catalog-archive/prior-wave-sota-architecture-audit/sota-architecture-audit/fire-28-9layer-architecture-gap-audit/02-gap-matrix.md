# 02 — Gap Matrix (per-component current state + CR-12 5-class disposition)

> **Method**: For each prescribed component in user 9-layer architecture, probe current install state + classify per CR-12 5-class lattice (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT) + emit INSTALL / CITE-ADAPT / DEFER / HONEST-NON-FINDING verdict
> **Cite class**: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 (TIER-1-USER-DIRECTIVE inspiration + TIER-3-LOCAL-OPERATOR-DERIVED current state probe)
> **Current state probe**: ctx_batch_execute 2026-05-10 23:13 — covers .mcp.json + plugin caches + npm-global + .local/bin + Z:/venvs/claude pip packages

## Legend

- **INSTALL-NOW**: high-priority gap; install via CR-6 official-native-channel; ≤1 fire ahead
- **INSTALL-LATER**: medium-priority gap; install via CR-6; queued for sub-arc
- **CITE-ADAPT**: no install needed; use existing eee primitive that covers same surface
- **DEFER**: low-priority OR demand-absent OR PARTIAL-OVERLAP without compelling case
- **HONEST-NON-FINDING**: prescribed but no upstream parity to install AND no need to cite-adapt
- **ALREADY-INSTALLED**: ✅ verified present in current eee
- **VERIFY-FIRST**: install state ambiguous; needs targeted probe before disposition

## L0 FOUNDATION

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| Claude Code 2.x | ✅ ALREADY-INSTALLED (Z:/claude-sota-installed/.local/bin/claude.exe) | GENUINELY-NEW (no parallel) | n/a | Native binary; per-loop cron via /loop skill |
| Superpowers plugin | ✅ ALREADY-INSTALLED (claude-plugins-official marketplace) | GENUINELY-NEW | n/a | 14+ skills auto-loaded; using-superpowers fires every session |
| Spec-Kit | ✅ ALREADY-INSTALLED (specify.exe in .local/bin) | GENUINELY-NEW | n/a | constitution/plan/tasks/implement workflow |
| planning-with-files | ⚠️ VERIFY-FIRST (likely via marketplace; need grep) | GENUINELY-NEW | INSTALL-NOW if absent | task_plan.md/findings.md/progress.md + hooks + plan-attestation SHA-256 |
| ECC plugin | ✅ ALREADY-INSTALLED (everything-claude-code) | PROVIDER-COMPLEMENT (vs Superpowers) | n/a | Provides agent-eval, safety-guard, autonomous-loops, deep-research, etc |
| openai-codex plugin | ✅ ALREADY-INSTALLED (codex@1.0.4 + CLI v0.130.0) | GENUINELY-NEW | n/a | T1-T7 cross-model lifecycle backbone |

## L1 DISCOVERY

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| GitHub MCP | ✅ ALREADY-INSTALLED (mcp__plugin_everything-claude-code_github__* — 30+ tools) | GENUINELY-NEW | n/a | OAuth-wired; full API coverage |
| gh CLI | ✅ ALREADY-INSTALLED | GENUINELY-NEW | n/a | Scripting fallback |
| OSSInsight API | ❌ NOT-WIRED (no MCP server; HTTP-direct possible) | GENUINELY-NEW (no parallel) | DEFER | 10B-event analytics free API; useful for trending; not load-bearing; queue as HTTP-direct probe for future research fires |
| Star History | ❌ NOT-WIRED (HTML/screenshot tool) | GENUINELY-NEW | DEFER | One-shot use via WebFetch when needed; doesn't justify MCP install |
| deps.dev API | ❌ NOT-WIRED (no MCP server) | GENUINELY-NEW | INSTALL-LATER | Transitive dep + license + Scorecard view; HTTP-direct probe via ctx_fetch_and_index suffices initially |
| Snyk Advisor | ❌ NOT-WIRED (no MCP server) | PROVIDER-COMPLEMENT (vs Scorecard) | DEFER | Web-only; can WebFetch when needed; HTTP-direct possible for API |
| Brave Search MCP | ⚠️ VERIFY-FIRST (server installed @brave/brave-search-mcp-server@2.0.75 npm-global; not in .mcp.json) | GENUINELY-NEW | INSTALL-NOW (wire .mcp.json entry) | Independent 29B-page index; 669ms latency; top Agent Score |
| Exa MCP | ✅ ALREADY-INSTALLED (mcp__plugin_everything-claude-code_exa__*) | GENUINELY-NEW | n/a | Semantic + findSimilar |
| Firecrawl MCP | ⚠️ VERIFY-FIRST (firecrawl-mcp@3.11.0 npm-global; not in current .mcp.json) | GENUINELY-NEW | INSTALL-NOW (wire .mcp.json entry; needs FIRECRAWL_API_KEY) | Curated index + autonomous research agent endpoint |
| Context7 MCP | ✅ ALREADY-INSTALLED (mcp__plugin_everything-claude-code_context7__*) | GENUINELY-NEW | n/a | Live version-pinned docs |
| awesome-claude-code / awesome-mcp-servers | ✅ DOC-REFERENCE-ONLY (multiple awesome-list pkgs in npm) | GENUINELY-NEW (cite-only) | n/a | Discovery-hint catalogs; treat as reference per failure-mode #2 |
| arXiv + Semantic Scholar APIs | ❌ NOT-WIRED (no MCP) | GENUINELY-NEW | DEFER | Academic research; on-demand WebFetch suffices |
| PulseMCP / MCP Registry / DeepWiki Directory | ❌ NOT-WIRED | GENUINELY-NEW (cite-only) | DEFER | Discovery-hint catalogs |
| Sourcebot | ❌ NOT-INSTALLED (self-hosted code search server) | PARTIAL-OVERLAP (vs ast-grep + Grep + RepoMix) | DEFER | Heavyweight (Docker Compose); only justified at 10+ repos scale; eee uses single-runtime so PARTIAL-OVERLAP with existing primitives |

## L2 INGESTION

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| gh CLI clone | ✅ ALREADY-INSTALLED | n/a | n/a | Standard |
| Software Heritage archive | ❌ NOT-WIRED (HTTP API only) | PARTIAL-OVERLAP (vs git clone) | DEFER | Long-term archival; not load-bearing for normal research |
| Firecrawl (full-page→MD) | ⚠️ wire .mcp.json | GENUINELY-NEW | INSTALL-NOW (same as L1) | Covered above |
| RepoMix MCP | ✅ ALREADY-INSTALLED (repomix@1.14.0 npm + .mcp.json entry) | GENUINELY-NEW | n/a | Whole-repo → single LLM-ready file |
| DeepWiki MCP | ✅ ALREADY-INSTALLED (mcp.deepwiki.com/mcp wired) | GENUINELY-NEW | n/a | Auto-generated wikis + Q&A on 50K+ public repos |
| Local cache convention | ⚠️ AD-HOC (.claude/state/ + tmp/) | GENUINELY-NEW | DEFER | Codify `$XDG_CACHE_HOME/research/<owner>/<repo>/` convention in skill once need surfaces |

## L3 EVALUATION

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| Surface signals (stars+age+forks+commits-90d) | ✅ via GitHub MCP | n/a | n/a | Standard |
| OpenSSF Scorecard CLI | ❌ NOT-INSTALLED | GENUINELY-NEW | INSTALL-NOW | `go install github.com/ossf/scorecard/v5@latest` OR `gh release download --repo ossf/scorecard` — 18 automated checks, 0-10; cite-anchor: per user document failure-mode #5 |
| Snyk CLI | ❌ NOT-INSTALLED | PROVIDER-COMPLEMENT (vs OSV-Scanner) | INSTALL-LATER | `npm i -g snyk`; provides Advisor 4-category package health; OSV-Scanner already covers core CVE matching |
| deps.dev API | ❌ NOT-WIRED | GENUINELY-NEW | INSTALL-LATER (HTTP-direct probe in research skill) | https://api.deps.dev/v3/ free no-key; can integrate via ctx_fetch_and_index |
| OSV-Scanner | ✅ ALREADY-INSTALLED (.local/bin/osv-scanner.exe) | GENUINELY-NEW | n/a | Google OSV DB |
| Trivy | ✅ ALREADY-INSTALLED (.local/bin/trivy.exe) | GENUINELY-NEW | n/a | Broad scanner |
| Syft + Grype | ❌ NOT-INSTALLED | DUPLICATE-FUNCTIONALITY (vs Trivy SBOM mode) | DEFER | Trivy `--format cyclonedx` covers SBOM generation; Grype matcher is 30-40% faster but Trivy suffices; CR-9 anti-pattern Sourcebot+Sourcegraph-style duplicate; revisit if Trivy depth insufficient |
| Semgrep | ✅ ALREADY-INSTALLED (.local/bin/semgrep.exe + pysemgrep.exe) | GENUINELY-NEW | n/a | AST + security rules |
| ast-grep | ✅ ALREADY-INSTALLED (@ast-grep/cli@0.42.0 npm-global) | GENUINELY-NEW | n/a | Structural search |
| CodeQL | ❌ NOT-INSTALLED | PARTIAL-OVERLAP (vs Semgrep heavy mode) | DEFER | Heavyweight; only justified for critical deps; Semgrep + ast-grep cover 80% case |
| Serena | ✅ ALREADY-INSTALLED (uvx in .mcp.json) | GENUINELY-NEW | n/a | LSP-backed semantic |
| License: SPDX + ScanCode | ⚠️ AD-HOC (gh API + WebFetch) | PARTIAL-OVERLAP | DEFER | Manual SPDX scan via gh + WebFetch suffices; ScanCode CLI install if formal license-audit workflow needed |
| Sigstore | ❌ NOT-INSTALLED | GENUINELY-NEW | INSTALL-LATER | `npm i -g sigstore` OR `gh release download --repo sigstore/cosign`; high-trust maintainer credibility verification |
| gitleaks | ✅ ALREADY-INSTALLED (.local/bin/gitleaks.exe) | PROVIDER-COMPLEMENT (vs Trivy secret-scan) | n/a | Pre-commit secret scan |
| pre-commit | ✅ ALREADY-INSTALLED (.local/bin/pre-commit.exe) | GENUINELY-NEW | n/a | Hook framework |
| typos | ✅ ALREADY-INSTALLED (.local/bin/typos.exe) | GENUINELY-NEW | n/a | Typo-checker |

## L4 COMPARISON

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| anthropics/skills skill-creator | ⚠️ VERIFY-FIRST (anthropic-agent-skills marketplace connected; need to verify plugin install) | GENUINELY-NEW | INSTALL-NOW if absent | `/plugin install skill-creator@claude-plugins-official` (or anthropic-agent-skills) — Executor/Grader/Comparator/Analyzer sub-agents |
| Inspect AI | ✅ ALREADY-INSTALLED (inspect-ai 0.3.205 in Z:/venvs/claude) | GENUINELY-NEW | n/a | UK AISI 200+ pre-built evals |
| Inspect Evals | ⚠️ VERIFY-FIRST (separate package from inspect-ai) | GENUINELY-NEW | INSTALL-NOW | `pip install inspect-evals` — SWE-bench/GAIA/Cybench pre-built |
| Promptfoo | ✅ ALREADY-INSTALLED (promptfoo@0.121.11 npm-global) | GENUINELY-NEW | n/a | YAML A/B; used by OpenAI/Anthropic |
| DeepEval | ✅ ALREADY-INSTALLED (deepeval 4.0.0 in Z:/venvs/claude) | GENUINELY-NEW | n/a | 50+ metrics pytest-like |
| Custom task harness | ⚠️ AD-HOC (per-fire codex T1 prompts; future: evals/codex_miss_cases.jsonl per cross-model-consensus rule eval-case mandate) | GENUINELY-NEW | DEFER | Pattern in cross-model-consensus.md §Eval-case mandate; not a separate install |
| Vibe Code Bench / VIBE Bench / SWE-bench Pro | ❌ REFERENCE-ONLY (per user failure-mode #3 caveat) | n/a | n/a | Saturated; use only for sanity-check |

## L5 SELECTION

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| Weighted rubric (S25/M20/C25/Co15/L10/P5) | ⚠️ AD-HOC (used implicitly in research skill / sota-researcher agent) | GENUINELY-NEW | INSTALL-LATER (codify as docs/rubric.md) | Document rubric per user-doc Part 5 template; future research fires reference |
| log4brains | ❌ NOT-INSTALLED | GENUINELY-NEW | INSTALL-NOW | `npm i -g log4brains && log4brains init` — MADR + hot-reload site; ADR primary; pair with docs/install-provenance.md (current ADR-substitute) |
| comparison-matrix.md template | ⚠️ AD-HOC (tracker files use ad-hoc tables; no formal template) | GENUINELY-NEW | INSTALL-NOW (codify template under .claude/skills/repo-compare/ OR docs/templates/) | Template per user-doc Part 5 |
| MADR ADR format | ⚠️ AD-HOC (install-provenance.md is per-fire log; no ADR format) | PARTIAL-OVERLAP (vs install-provenance which is more chronological) | INSTALL-LATER | log4brains brings format; install-provenance.md continues per-fire log; ADRs are decision-permanent |
| Tie-breakers (bus-factor, OSSF best-practices badge tier, time-decay, downstream blast radius) | ⚠️ AD-HOC | GENUINELY-NEW | INSTALL-LATER (codify in rubric.md) | Per user-doc Part 5 |

## L6 KNOWLEDGE

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| planning-with-files (Manus pattern) | ⚠️ VERIFY-FIRST | GENUINELY-NEW | INSTALL-NOW if absent | task_plan.md/findings.md/progress.md + hooks + plan-attestation SHA-256; per user-doc Part 5 + L0 row |
| Spec-Kit constitution.md | ✅ ALREADY-INSTALLED (specify.exe) | GENUINELY-NEW | n/a | `.specify/memory/constitution.md` |
| docs/adr/*.md | ❌ NOT-WIRED (no docs/adr/ folder; install-provenance.md acts as chronological log) | GENUINELY-NEW | INSTALL-NOW (after log4brains) | Bring docs/adr/ + log4brains hot-reload site |
| docs/research/comparisons/*.md | ⚠️ AD-HOC (docs/sota-architecture-audit/ + tmp/ have ad-hoc comparison files) | GENUINELY-NEW | INSTALL-LATER (codify convention) | After comparison-matrix.md template |
| mem0 | ❌ NOT-INSTALLED (Z:/venvs/claude has no mem0 Python pkg; @mem0/openclaw-mem0 npm-global is different) | DUPLICATE-FUNCTIONALITY (vs mcp-memory + graphiti) | DEFER | Per user-doc "only when cross-session personalization matters"; eee has mcp-memory (sqlite-vec) + graphiti (FalkorDB) + ECC memory MCP covering this surface; CR-12 DUPLICATE per kiss-dry-yagni Must-Never #4 |

## L7 CONSTRUCTION

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| Superpowers (brainstorming → plan → TDD → review) | ✅ ALREADY-INSTALLED | GENUINELY-NEW | n/a | Auto-fires via using-superpowers meta-skill |
| Spec-Kit | ✅ ALREADY-INSTALLED | GENUINELY-NEW | n/a | constitution/plan/tasks/implement |
| Context7 | ✅ ALREADY-INSTALLED | GENUINELY-NEW | n/a | Live docs |
| Playwright MCP | ✅ ALREADY-INSTALLED | GENUINELY-NEW | n/a | Browser validation in TDD |
| Apify MCP | ❌ NOT-INSTALLED | PROVIDER-COMPLEMENT (vs Firecrawl + Brave + Exa) | DEFER | Apify shines for LinkedIn/social/structured scraping; eee covers via Perplexity MCP + Firecrawl; install if structured-scraping load surfaces |
| skill-creator (CR-12 GENUINELY-NEW) | ⚠️ VERIFY-FIRST (see L4) | GENUINELY-NEW | INSTALL-NOW if absent | Same as L4 row |

## L8 FEEDBACK

| Component | Current state | CR-12 class | Disposition | Notes |
|---|---|---|---|---|
| Native OTel (Claude Code 2.x) | ✅ AVAILABLE (env vars CLAUDE_CODE_ENABLE_TELEMETRY=1) | GENUINELY-NEW | VERIFY-FIRST (probe if telemetry env wired) | Built-in OTLP export |
| Langfuse | ✅ ALREADY-INSTALLED (langfuse 4.2.0 Python + langfuse-cli npm) | GENUINELY-NEW | INSTALL-LATER (wire OTel endpoint) | Self-hosted Docker possible; cloud free tier 50K obs/mo |
| Splitrail | ❌ NOT-INSTALLED | PROVIDER-COMPLEMENT (vs ccusage which is installed) | DEFER | ccusage@18.0.11 npm-global covers similar surface (CC-specific token tracking); Splitrail extends cross-CLI (CC + Codex + Gemini + Copilot + Cline); install when cross-CLI tracking becomes load-bearing |
| TechNickAI/claude_telemetry | ❌ NOT-INSTALLED | DUPLICATE-FUNCTIONALITY (vs native OTel) | DEFER | `claudia` wrapper; native OTel is canonical; install only if Logfire/Sentry/Honeycomb/Datadog backend specifically needed |
| Phoenix (Arize) | ⚠️ VERIFY-FIRST (Wave 119 cited install but not visible in Z:/venvs/claude) | PROVIDER-COMPLEMENT (vs Langfuse) | VERIFY-FIRST | If absent post-Wave-119, install OR document removal/replacement |
| openlit | ⚠️ VERIFY-FIRST (Wave 109 cited install but not visible in Z:/venvs/claude) | PROVIDER-COMPLEMENT (vs Langfuse + native OTel) | VERIFY-FIRST | Same as Phoenix; verify Wave 109 ship status |
| Post-mortem ADRs | ⚠️ AD-HOC (install-provenance entries serve as post-mortem; no log4brains ADRs yet) | GENUINELY-NEW | INSTALL-LATER (after log4brains) | After log4brains lands |
| Quarterly recursion (re-run L3-L5 on architecture) | ⚠️ AD-HOC (Wave 134 series IS this recursion) | GENUINELY-NEW | n/a | Already practiced |

## Priority install summary (next-fire roadmap inputs)

### HIGH priority (INSTALL-NOW — Fire 29-30 candidates)

1. **Brave Search MCP wiring** — server installed @brave/brave-search-mcp-server@2.0.75 npm-global; add `.mcp.json` entry + BRAVE_API_KEY env. Effort: ~5min. Value: independent 29B-page index; agentic-friendly.
2. **Firecrawl MCP wiring** — server installed firecrawl-mcp@3.11.0 npm-global; add `.mcp.json` entry + FIRECRAWL_API_KEY env. Effort: ~5min. Value: full-page extraction + autonomous research agent.
3. **planning-with-files verification + install if absent** — `npx skills add OthmanAdi/planning-with-files --skill planning-with-files -g` per user-doc Day 1; SHA-256 plan-attestation hooks. Effort: ~10min.
4. **skill-creator plugin verification + install if absent** — `/plugin install skill-creator@claude-plugins-official` per user-doc Day 1; 4 sub-agents for A/B eval. Effort: ~5min.
5. **OpenSSF Scorecard CLI install** — `go install github.com/ossf/scorecard/v5@latest` OR `gh release download --repo ossf/scorecard`; 18 automated checks. Effort: ~15min (verify go install or release).
6. **log4brains install** — `npm i -g log4brains && log4brains init`; MADR + hot-reload site. Effort: ~15min.
7. **Inspect Evals package install** — `pip install inspect-evals`; SWE-bench/GAIA/Cybench pre-built. Effort: ~5min.
8. **Phoenix + openlit Wave-status verification** — probe whether prior install rolled back; reconcile with current Langfuse-only state. Effort: ~10min.

### MEDIUM priority (INSTALL-LATER — Fire 31-35 candidates)

9. **deps.dev HTTP-direct integration** — wire `https://api.deps.dev/v3/` probe into research skill OR repo-evaluate skill
10. **Snyk CLI** — `npm i -g snyk` if package-health coverage gap surfaces beyond OSV-Scanner
11. **Sigstore CLI** — `gh release download --repo sigstore/cosign`; high-trust maintainer verification
12. **Docs/rubric.md formal codification** — weighted rubric per user-doc Part 5 template
13. **comparison-matrix.md template** — under `.claude/skills/repo-compare/` per user-doc Part 5
14. **docs/adr/ folder + log4brains hot-reload site** — after log4brains lands

### LOW priority (DEFER unless demand surfaces)

15. **OSSInsight HTTP-direct probe** — DEFER (10B-event analytics useful but not load-bearing)
16. **Star History HTML/screenshot** — DEFER (one-shot WebFetch suffices)
17. **Snyk Advisor wiring** — DEFER (web-only; Scorecard + OSV cover security)
18. **Sourcebot self-host** — DEFER (Docker Compose heavyweight; PARTIAL-OVERLAP with ast-grep + Grep + RepoMix; CR-12 anti-pattern per user-doc "do not install Sourcegraph + Sourcebot")
19. **Software Heritage archive** — DEFER (long-term archival not load-bearing)
20. **arXiv + Semantic Scholar APIs** — DEFER (on-demand WebFetch suffices)
21. **Syft + Grype** — DEFER (DUPLICATE-FUNCTIONALITY with Trivy)
22. **CodeQL** — DEFER (PARTIAL-OVERLAP with Semgrep heavy mode; heavyweight)
23. **Apify MCP** — DEFER (PROVIDER-COMPLEMENT with Firecrawl + Brave + Exa)
24. **mem0 Python** — DEFER (DUPLICATE-FUNCTIONALITY with mcp-memory + graphiti + ECC memory)
25. **Splitrail** — DEFER (ccusage already covers CC-specific; cross-CLI not load-bearing)
26. **TechNickAI/claude_telemetry** — DEFER (DUPLICATE-FUNCTIONALITY with native OTel)

## Discipline conformance

| Discipline | Application |
|---|---|
| CR-1 cite-trail | Each row cites current-state probe + user-doc disposition + CR-12 class rationale |
| CR-3 cross-model | This gap matrix submitted to codex T1 review (3rd Forward Discipline #2 dogfood; cycle-322 n=3 promotion completion) |
| CR-5 install-priority | INSTALL-NOW/LATER all via CR-6 official-native-channel; DEFER explicitly classified |
| CR-6 official-native-channel | INSTALL-NOW rows specify `npm i -g` / `pip install` / `go install` / `gh release download` / `/plugin install` paths |
| CR-8 full-SOTA-content | Disposition cites user-document inspiration + current install evidence |
| CR-9 install-risk | Per-item version-pin discipline; alternate-channel probe per Wave 112 Ship 2CC; sibling-bleed defense (none here — no sibling content) |
| CR-10 research-first-then-install | User-document IS the research; this gap matrix IS the result; specific install fires (Fire 29+) execute |
| CR-11 META-process | THIS FIRE IS the CR-11 dogfood; gap audit IS the META-process; codex T1 cross-model gate |
| CR-12 5-class lattice | EVERY row classified; DUPLICATE-FUNCTIONALITY entries explicitly justify REJECT per kiss-dry-yagni Must-Never #4 |
| FM-02 sub-class (b) defense | Atomic git add + commit --only -- pathspec for Fire 28 commit |
| Forward Discipline #2 | This file's codex T1 review = recursive dogfood instance n=3 (Fire 27-E n=1 + Fire 27-F n=2 + this fire n=3 = cycle-322 promotion threshold completion) |

## Mia ladder advance (gap matrix)

n=1985 (baseline-summary) → **n=2008** (+23: 9-layer gap matrix + per-component CR-12 5-class lattice classifications + 26 priority install candidates + 3-tier (HIGH/MED/LOW) prioritization + 7 row-level DEFER rationales (kiss-dry-yagni / PARTIAL-OVERLAP / DUPLICATE-FUNCTIONALITY / PROVIDER-COMPLEMENT) + INSTALL-NOW vs INSTALL-LATER vs CITE-ADAPT vs DEFER vs HONEST-NON-FINDING vs ALREADY-INSTALLED vs VERIFY-FIRST 7-disposition taxonomy + discipline conformance matrix + Phoenix+openlit verify gap + Brave+Firecrawl npm-installed-but-not-wired delta + log4brains gap + skill-creator gap + Inspect-Evals separate-package note + Sourcebot anti-pattern carve-out per user-doc + mem0 DUPLICATE carve-out per kiss-dry-yagni + Splitrail PROVIDER-COMPLEMENT carve-out vs ccusage + Apify PROVIDER-COMPLEMENT carve-out vs Firecrawl + claude_telemetry DUPLICATE carve-out vs native OTel + Syft+Grype DUPLICATE carve-out vs Trivy + CodeQL PARTIAL-OVERLAP carve-out vs Semgrep heavy mode + OSSInsight DEFER not-load-bearing + 3rd Forward-Discipline-#2-dogfood cycle-322-promotion-completion note)
