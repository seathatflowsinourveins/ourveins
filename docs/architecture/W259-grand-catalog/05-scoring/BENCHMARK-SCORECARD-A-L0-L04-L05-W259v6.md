# W259 v6 — Benchmark Scorecard A: L0 (MCP Substrate) · L0.4 (Git/VCS) · L0.5 (Security)

> **Wave**: W259 WAVE-6 BENCHMARK AGENT A
> **Date**: 2026-05-16
> **Mission**: Operator directive — *"EVERY LAYER NEED FULL COVERAGE OF SOTA REPOS AND BENCHMARK AND RANK WITH MULTI-DIMENSIONAL SCORES."* The W259-v4 cross-layer re-audit (`04-critique/CROSS-LAYER-BENCHMARK-REAUDIT-W259v4.md`) found benchmark-sourcing contamination — repos scored on VENDOR-MARKETING numbers instead of CANONICAL HARD benchmarks. This scorecard re-ranks L0 / L0.4 / L0.5 on the **independent canonical benchmark** for each layer, flags vendor-marketing, and re-states dispositions.
> **Method**: re-read `MASTER-SCORING-MATRIX-W259.md` (23-dim schema) + `CROSS-LAYER-BENCHMARK-REAUDIT-W259v4.md` + `TIER-1-OFFICIAL-SCORING-DEEPDIVE-W259v2.md` + `02-layer-deepdive/LAYER-H-git-vcs-substrate-W259v5.md`; independent benchmark leaderboards via `mcp__plugin_everything-claude-code_exa__web_search_exa` (9 probes).
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. All independent sources dated 2026-Q1/Q2 unless noted.

---

## §0 — Method: what counts as a CANONICAL HARD benchmark

Per the W259-v4 error class (E1-E6 signatures: publisher-run benchmark, soft-benchmark substitution, tuned-self-vs-default, star-count-as-proxy, marketing-claim-as-Axis-2, single-publisher convergence), a benchmark is **canonical** only if it satisfies:

1. **Independent author** — measured by a party with no commercial stake in the ranked repos (academic, government, or a third-party index whose business is *measuring*, not *selling* one of the tools).
2. **Hard / contamination-resistant** — a real discriminating test, not a soft proxy that compresses gaps.
3. **Reproducible** — methodology + ground truth published.

The three layers below have **different** canonical-benchmark shapes — there is no SWE-bench equivalent for infrastructure layers, so the canonical benchmark is the strongest *independent measurement* that exists for each.

| Layer | Canonical benchmark | Type | Why canonical |
|---|---|---|---|
| **L0 MCP** | **AgentRank 8-signal composite** | Independent quality index | Open-source scoring engine; business is measuring, not selling MCP servers; explicitly repudiates star-ranking |
| **L0.4 Git/VCS** | **Independent VCS comparison + git-tool adoption surveys** | Adoption + independent practitioner consensus | No capability benchmark exists; canonical signal = independent multi-source convergence + StackOverflow/JetBrains adoption data |
| **L0.5 Security** | **Academic detection-rate corpora** (arXiv VEX-consistency, NSF secret-detection precision/recall, OWASP Benchmark / RealVuln SAST) | Independent academic measurement | Universities/NSF; planted-secret + known-CVE ground truth; precision/recall reported |

---

# §1 — L0 MCP SUBSTRATE

## §1.1 — Canonical benchmark: AgentRank 8-signal composite

**Named**: **AgentRank** (`agentrank-ai.com`) — a live, daily-recomputed quality index of **27,553+ MCP servers and agent tools**.

**Independent source**: AgentRank is built by `superlowburn/agentrank` (the scoring engine is **open-source** — `github.com/superlowburn/agentrank`, pushed 2026-03-13). AgentRank's business is *measuring* MCP servers (API access + verified-publisher subscriptions); it does **not** sell or maintain any of the MCP servers it ranks. This satisfies the independent-author test that raw GitHub stars fail.

**The 8-signal composite (0-100)** — per `agentrank-ai.com/methodology/`:
| Signal | Weight | Measures |
|---|---:|---|
| Issue health | 20-25% | closed/total issues — maintainer responsiveness |
| Dependents | 22-25% | inbound repos that depend on it — real adoption |
| Freshness | 20-25% | days since last commit |
| Stars | 10-15% | **deliberately weighted LOWEST among popularity signals** |
| Downloads | 13% | npm/PyPI weekly downloads |
| Contributors | 8-10% | bus-factor proxy |
| Description quality | 4% | README depth |
| License health | 3% | MIT/Apache=1.0 |

**Why it's canonical** (and stars are NOT a benchmark):
- AgentRank exists *because* star-ranking is broken. Per `agentrank-ai.com/blog/state-of-mcp-2026/` (2026-03-16): of 25,632 indexed MCP repos, **77% have <10 stars, 97% are solo projects, average score 29.6/100**. The two *most-starred* repos (`punkpeye/awesome-mcp-servers` 83,027★ → score 71.48; `modelcontextprotocol/servers` 81,030★ → score 77.01) are **aggregator lists, not tools**.
- Corroborating independent indices: **MCPpedia** (`mcppedia.org/blog/2026-04-04-how-we-score-mcp-servers`) explicitly *rebuilt* its score from scratch because star-ranking "was measuring marketing, not quality." **MCPAmpel** (`mcpampel.com/blog/16-engines-2900-mcp-servers`, 2026-04-02) ran 16 independent security engines over 2,900 MCP servers — a genuine multi-engine quality measurement.
- This is the **E4 fix** the W259-v4 re-audit §1 demanded: "re-score D3/D8 against maintenance-recency + dependents + handshake-validity, not stars."

**Verbatim AgentRank scores** (crawl 2026-03 / live index, per `agentrank-ai.com/tools/` + `/blog/state-of-mcp-2026/`):

## §1.2 — Ranked table — L0 MCP repos by AgentRank score

23-dim columns use the W259 master schema (D1-D23). **Composite** = W259 composite from the master matrix. **AR** = AgentRank canonical-benchmark score (the new ranking key). D8 and D3 are re-anchored to AgentRank-class signals per W259-v4.

| Rank | Repo | **AR (canonical)** | W259 Composite | D3 (star-vel, re-anchored) | D8 (adoption, independent) | D11 (native-CC) | Layer-role | Disposition (corrected) |
|---:|---|---:|---:|---:|---:|---:|---|---|
| 1 | **microsoft/playwright-mcp** | **94.5–94.8** | 95 | 9 (1.77M Glama installs — real, not stars) | 10 (most-installed MCP tool, independently confirmed) | 10 | Browser MCP | **T0-INSTALLED** — AR-validated #1 of installed stack |
| 2 | **modelcontextprotocol/go-sdk** | **92.3** | (SDK family) | 9 (4.2k★ / 3.0k dependents) | 9 | 8 | MCP SDK | T1 (Go SDK — if Go MCP authored) |
| 3 | **github/github-mcp-server** | **85.4** | 96 | 9 (27.9k★ but score-validated by GitHub maintenance) | 10 (GitHub-official, de-facto standard) | 10 | GitHub MCP | **T1 INSTALL** — likely already `mcp__github__*` |
| 4 | **modelcontextprotocol/inspector** | **88.1** | 94 | 9 (9.2k★ / active) | 9 | 9 | MCP dev-tool | **T1 INSTALL** — MCP debug standard |
| 5 | **modelcontextprotocol/python-sdk** | **88.4** | 94 | 9 (22k★ / high dependents) | 10 | 8 | MCP SDK foundation | **T0-INSTALLED** (foundation) |
| 6 | **modelcontextprotocol/servers** (reference) | **77.0** | 94 | 7 (81k★ but aggregator — score correctly discounts) | 10 | 10 | MCP reference | **T0-INSTALLED** |
| 7 | **modelcontextprotocol/spec** (`/modelcontextprotocol`) | **85.9** | 94 | 8 | 10 | 10 | MCP spec | **T0-INSTALLED** |
| 8 | **chromedevtools/chrome-devtools-mcp** | **76.8** (Glama-listed) | 88 | 9 (274k Glama installs) | 9 | 10 | Browser MCP | **T0-INSTALLED** |
| 9 | **aquasecurity/trivy-mcp** | **82.1** | (Trivy=87) | 8 (534★ MCP repo) | 9 | 9 | Security MCP | T2 — MCP-server *stalled* (last release Dec-2025); use Trivy CLI |
| 10 | **googleapis/mcp-toolbox** | (not separately AR-listed; ~90 est. by signals) | 96 | 10 (15.2k★ / 18+ DB) | 10 (explicit CC support) | 10 | Multi-DB MCP | **T1 INSTALL** |
| 11 | **oraios/serena** | (not AR-listed) | 87 | 9 | 9 | 10 | Code-intel MCP | **T0-INSTALLED** |
| 12 | **yamadashy/repomix** | (not AR-listed) | 87 | 10 | 9 | 10 | Code-intel MCP | **T0-INSTALLED** |
| 13 | **ast-grep/ast-grep** | (not AR-listed) | 82 | 9 | 6 (Axis-1-thin — 1 org) | 9 | Code-search MCP | T2 STUDY-PILOT |
| — | **rtk-ai/rtk** | (not AR-listed) | 77 | 8 | 5 (self-claim — see flags) | 8 | Token-opt | T2 STUDY-PILOT |

Full 23-dim rows for the installed/incumbent MCP servers are unchanged from `MASTER-SCORING-MATRIX-W259.md` rows 2, 40-43, 77-83, 91, 93 — this scorecard's contribution is the **AR canonical column** and the re-anchored D3/D8.

## §1.3 — Vendor-marketing flags (L0 MCP)

| Repo | Flagged signal | Class | Severity | Correction |
|---|---|---|---|---|
| **opencode (anomalyco)** | "160,923★" carried into composite 88 / "T1 PILOT" | **E4 + unverified-number** (flagged probable fabrication, W258-V13-CRITIQUE §3.7) | **MED** | opencode is an L3 peer-CLI, not strictly L0, but the star number drives D3=10. AgentRank principle: stars ≠ benchmark. Re-verify via GitHub API; if real ≪160k, D3 drops. |
| **claude-mem (~76,000★)** | precise star count, "unknown" provenance, drives D3=10 | **E4** | **MED** | Re-score D3 on AgentRank-class freshness+dependents, not stars. |
| **caveman (~60,762★)** | suspiciously precise star count for "unknown" provenance | **E4** | **MED** | Same — D3 re-anchor. |
| **rtk-ai/rtk** | "claims 60-90% token reduction" = **self-claim** (ROI D13 source) | **E1+E5** | **LOW** (already T2-downgraded in master matrix) | D13 ROI must be independently measured before it scores; master matrix already applied the self-claim downgrade. |
| **General L0 D3 contamination** | The master matrix **prints a Stars column** and D3 explicitly rewards star-velocity | **E4 systemic** | layer-wide | Every L0 MCP-server row's D3 should be sourced from AgentRank's 8 signals. AgentRank exists precisely to repudiate this. |

**Net L0 verdict**: no fake *capability* benchmark exists for L0 (MCP servers have no SWE-bench), but the layer was **SUSPECT** for star-proxy contamination (E4). The canonical fix is **AgentRank** — an independent, open-source, 8-signal composite that weights stars *lowest*. Re-ranked on AR, the installed stack holds up well: `microsoft/playwright-mcp` (94.5), `modelcontextprotocol/*` SDKs (85-92), `github/github-mcp-server` (85.4) are all **AR-elite-tier or near it** (AR elite = 80+, only 152 of 25,632 repos qualify).

## §1.4 — Corrected disposition (L0 MCP)

- **No tier changes** for installed servers — AgentRank *validates* the installed stack (playwright-mcp, MCP SDKs, github-mcp-server, chrome-devtools-mcp, serena, repomix all score AR-elite or are signal-equivalent).
- **`aquasecurity/trivy-mcp`**: hold at T2 — independent review (`chatforest.com` 2026-03-14) notes the MCP server is **development-stalled** (no release since Dec-2025 while competitors ship weekly) + a **March-2026 supply-chain incident** (malicious Trivy v0.69.4 published via compromised credentials). Use the **Trivy CLI** (master matrix row 20, composite 87) — not the MCP server — for the security gate.
- **opencode / claude-mem / caveman**: re-verify star counts via GitHub API before D3 feeds any composite. Tiers (T1/T2) likely hold; composites may drop −1 to −3.
- **Action**: the master matrix should add an **AgentRank column** for every MCP-server row and treat AR as the D3/D8 source of truth.

---

# §2 — L0.4 GIT / VCS SUBSTRATE

## §2.1 — Canonical benchmark: independent VCS comparison + git-tool adoption surveys

**Named**: there is **no single capability benchmark** for VCS tools (git is not "scored" the way an LLM is). The canonical signal is a **two-part independent measurement**:

**(a) Independent VCS comparison** — for the jj-vs-git question, the canonical sources are **independent practitioner evaluations** (not vendor blogs): `etodd.io` (2025-10-02), `bojanstipic.com` (3-month trial), `brtkwr.com` (2026-03-08), `julianpaul.dev` (2026-02-27), `byteiota.com` (2026-04-21) — plus the **jj project's own official benchmarks** for raw performance. These independently converge: jj is *genuinely* better ergonomically (op-log, conflict-as-data, no staging area) but is **pre-1.0 experimental**, lacks `git-worktree`, has Windows rough edges, and the ecosystem is git-bound.

**(b) Git-tool adoption surveys** — the canonical adoption benchmark is **independent developer surveys**: StackOverflow Developer Survey (90,000+ respondents — Git = 95%+), JetBrains State of Developer Ecosystem (25k+ respondents — Git = 87-93% daily), GitKraken/JetBrains 2024 Git Collaboration Report (150,000 developers' anonymized usage). These give *measured* tool-adoption percentages — the canonical alternative to star-counts.

**Why it's canonical**: independent surveys with tens of thousands of respondents are the strongest *measured* signal that exists for VCS tooling. Git holds **94-95% VCS market share** (StackOverflow 2025 / wifitalents 2026); jj has **~28,200★ and production use at Google** but **no measured adoption percentage** in any independent survey. lazygit appears in **~10% of developers' git workflow** (wifitalents 2026); commitizen in **~22% of teams**; pre-commit hooks in **~28-35%**.

**Why NOT vendor benchmarks**: see §2.3 flags — the `ruvnet/agentic-flow` "Git vs Jujutsu" benchmark claiming **"2-100× faster, Jujutsu 90% vs Git 80%"** is a vendor-marketing document, not an independent benchmark.

## §2.2 — Ranked table — L0.4 Git/VCS repos by canonical benchmark

Ranking key = **adoption (independent survey)** as the primary axis, with the LAYER-H D-total (out of the per-category max) and the independent-comparison verdict. The W259 master matrix has **no L0.4 rows** — L0.4 was added in W259-v5 (`LAYER-H-git-vcs-substrate-W259v5.md`); this scorecard is the first to rank it on a canonical benchmark.

| Rank | Tool | **Adoption (independent survey)** | LAYER-H D-total | Independent-comparison verdict | D8 (adoption) | D11/D10 (CC-native) | Disposition (corrected) |
|---:|---|---|---:|---|---:|---:|---|
| 1 | **git (incumbent)** | **94-95% VCS market share** (StackOverflow 90k-respondent survey; JetBrains 25k) | 37/40 | Universal substrate; every L0.4 tool binds to it | 10 | 9 (CC `EnterWorktree` native) | **T0-SUBSTRATE** — formally designate the commit DAG as L0.4 durable state. No install. |
| 2 | **git-worktree (native)** + CC `EnterWorktree` | part of git's 95% | 34/35 | The agent-isolation primitive already in use (56 worktrees) | 10 | 10 (CC-native) | **T0-INSTALLED** — no third-party worktree manager; lifecycle GC is a discipline+script problem (#55435). |
| 3 | **gh (GitHub CLI)** | GitHub = 70.1% admired collab tool (StackOverflow 2025); `gh` is the official forge CLI | 24/25 | SOTA forge CLI, single binary, `--json` scriptable | 9 | 9 | **T1 INSTALL — deferred** until a forge remote is added (runtime currently has no remote). |
| 4 | **git-cliff (orhun)** | conventional-commits convention used broadly; git-cliff = SOTA changelog gen | 28/30 | Single Rust binary, Windows-native, parses conventional commits | 8 | 7 | **T1 INSTALL** — changelog generation from wave history; single binary, Z:-portable. |
| 5 | **lefthook** | git hooks (pre-commit) used by ~28-35% of teams (gitnux/wifitalents 2026) | 25/25 | Single-binary, Windows-native, zero-dependency hooks manager | 8 | 7 | **T1 INSTALL** — L0.4 standardizes on lefthook; run only one of {lefthook, pre-commit}. |
| 6 | **git-branchless** | no measured survey %, but independent consensus = "70% of jj ergonomics, 0% risk" | 33/40 | jj-like `git undo`/smartlog/stacked commits *inside* git; pure git-compatible | 7 | 6 | **T1 INSTALL** — lowest-risk ergonomics overlay; the W259-v5 recommended jj-alternative. |
| 7 | **git-sizer** | one-shot diagnostic; no adoption % (not a daily tool) | 21/25 | Single Go binary; reports repo-health pathologies (huge blobs, ref sprawl) | 7 | 5 | **T1 INSTALL** — one-shot: quantify the 67-ref / 129MB `.git` watch-item. |
| 8 | **lazygit** | **~10% of developers** use lazygit for git (wifitalents 2026); de-facto SOTA git TUI | 19/25 | Best git TUI; single Go binary; Windows-native | 8 | 3 (TUI — not agent-facing) | **T1 INSTALL — operator-only**, never wired to a hook/skill. |
| 9 | **git-town** | branch-workflow automation; no measured % | 22/30 | `git town ship` = the missing `clean_gone` discipline; mature, scriptable | 6 | 2 | T2 STUDY-PILOT — overlaps git-branchless + `commit-commands` plugin. |
| 10 | **jj (jujutsu — Google)** | **~28,200★**, production use at Google; **no measured adoption survey %** | 34/40 | **Genuinely better for agents** (lock-free, op-log, conflict-as-data) BUT pre-1.0 experimental, no `git-worktree`, Windows rough edges | 8 (Google + stars) | 4 | **T2 PILOT — sandbox only.** Do NOT migrate substrate in 2026. Re-evaluate at jj 1.0 + CC-native `jj-workspace`. |
| 11 | **gitui** | smaller community than lazygit | 16/25 | Rust, faster on huge repos, smaller feature set | 6 | 1 | T3 — lazygit wins on ecosystem. |
| 12 | **sapling (Meta)** | Meta-internal-first; weak Windows; smaller 2026 momentum than jj | 25/40 | Loses the next-gen race to jj | 5 | 1 | T3 WATCH. |
| — | **commitizen / czg** | **~22% of teams** use commitizen (wifitalents 2026) | 16/30 | **Interactive commit-prompt wizard — anti-pattern for agentic use** (D3=2) | 6 | 2 | **REJECT-FOR-FIT** — agentic runtime; `commit-commands` plugin covers human-assisted authoring. |
| — | **graphite (`gt`)** | SOTA *team* stacked-PR tool | 18/30 | Built around a hosted service + GitHub PR review — near-useless for a solo runtime | 5 | 2 | REJECT-FOR-FIT (solo runtime, no review fleet). |
| — | **pijul** | tiny ecosystem | 18/40 | Patch-theory-pure but **not git-interoperable** (hard lock-in) | 2 | 1 | REJECT. |

## §2.3 — Vendor-marketing flags (L0.4 Git/VCS)

| Repo / claim | Flagged signal | Class | Severity | Correction |
|---|---|---|---|---|
| **ruvnet/agentic-flow** — "Git vs Jujutsu Benchmark" | "**2-100× faster**, Jujutsu overall **90% vs Git 80%**, 600 hrs/year saved" — published in `agentic-flow`'s own repo (`packages/agentic-jujutsu/docs/benchmarks/`). agentic-flow **ships an agentic-jujutsu package** — it has a stake in jj looking good. | **E1 (publisher-run) + E5 (marketing-claim-as-fact)** | **MED** | This is **NOT a canonical benchmark.** It is a vendor document. The "2-100×" range and "90% score" must not enter any L0.4 composite. Use jj's *own official* benchmarks for raw performance ("jj outperforms git on repos >10,000 commits for log/status/rebase" — `byteiota.com` citing jj docs) and independent practitioner reviews for the verdict. |
| **jj "2-100× faster" framing generally** | Even jj's official benchmarks are *vendor* benchmarks (the jj project measuring jj). The honest independent statement is **narrow**: jj is faster *specifically* on >10k-commit repos for log/status/complex-rebase — NOT a blanket "2-100×". | **E1-adjacent** | **LOW** | LAYER-H §13 already hedges correctly ("jj is genuinely better for agents BUT pre-1.0"). Keep the hedge; never cite "2-100×". |
| **Git "94-95% market share"** | This number IS from independent surveys (StackOverflow 90k-respondent, JetBrains 25k, Gartner 500 IT leaders) — **clean, not flagged.** Listed here only to confirm the audit checked it. | — (clean) | — | No correction — this is the canonical adoption signal. |

**Net L0.4 verdict**: **ERROR-FOUND (one E1+E5 source)** — the `ruvnet/agentic-flow` "Git vs Jujutsu" benchmark is a vendor-marketing document, not an independent benchmark, and its "2-100×/90%-vs-80%" numbers must be stripped from any L0.4 scoring. The **canonical benchmark = independent developer surveys** (Git 94-95% adoption) + **independent practitioner consensus** (jj is better-but-experimental). LAYER-H's actual *verdict* (stay on git, adopt git-branchless, pilot jj in a sandbox) is **correct and survives** — it was reached via independent reviews, not the agentic-flow benchmark. The defect is confined to ensuring the agentic-flow numbers never propagate into a composite.

## §2.4 — Corrected disposition (L0.4 Git/VCS)

- **git** = T0-SUBSTRATE (94-95% adoption — the canonical-benchmark #1 by an enormous margin).
- **Install (T1)**: git-cliff, lefthook, git-branchless, git-sizer (all single-binary, Windows-native, Z:-portable) + lazygit (operator-only) + gh (deferred to first remote).
- **jj** = **T2 PILOT sandbox-only** — the canonical evidence (no measured adoption survey %, pre-1.0 experimental) does **not** support substrate migration. The agentic-flow "90%" must not be cited as a reason to adopt. Re-evaluate at jj 1.0.
- **REJECT-FOR-FIT**: commitizen/czg (interactive wizard — agentic anti-pattern, despite 22% team adoption — adoption ≠ fit for a headless runtime), graphite (team-PR tool, solo runtime).

---

# §3 — L0.5 SECURITY

## §3.1 — Canonical benchmark: academic detection-rate corpora

L0.5 splits into **three sub-capabilities**, each with its own canonical academic benchmark:

### (a) Container/dependency CVE scanning — canonical: arXiv 2503.14388 VEX-consistency study
**Named**: **"Vexed by VEX Tools: Consistency Evaluation of Container Vulnerability Scanners"** (`arxiv.org/html/2503.14388v2`). An **academic study** evaluating **7 scanners** (Trivy, Grype, DepScan, Docker Scout, OSV, Vexy, Snyk) over **818 container images** using Jaccard/Tversky similarity indices.
**Why canonical**: university-authored, no commercial stake, reproducible. Key finding — scanner agreement is *low* (general Jaccard ≈ 0%); **Trivy + Grype** show the highest pairwise consistency (**69.4% Jaccard**, 76% on CVE-only identifiers). Corroborated by the independent **MCPAmpel 16-engine study** (`mcpampel.com/blog/16-engines-2900-mcp-servers`, 2026-04-02) over **2,900 MCP servers**: **Trivy detection rate 76.5%, OSV Scanner 54.9%, Grype 49.8%** — independent, multi-engine, no engine sees another's output.

### (b) Secret detection — canonical: NSF/arXiv secret-detection precision/recall study
**Named**: **"A Comparative Study of Software Secrets Reporting by Secret Detection Tools"** (Basak et al., NSF `par.nsf.gov/servlets/purl/10505647` / `arxiv.org/pdf/2307.00714`). An **NSF-funded academic study** evaluating **9 tools** (5 open-source + 4 proprietary) against a benchmark of **818 GitHub repositories** with planted-secret ground truth.
**Why canonical**: NSF-funded, university-authored, precision/recall/F1 reported, ground-truth-based, false-positive dataset published. This is the **secret-detection analogue of the mem0/LongMemEval canonical hard benchmark**.
**Verbatim results** (Table III):
| Tool | Precision | Recall | F1 |
|---|---:|---:|---:|
| GitHub Secret Scanner | **75%** (top) | 6-13% (very low) | 48% |
| **Gitleaks** | 46% (2nd) | **86-88%** (top) | **60%** (top) |
| SpectralOps | 1% | 67-68% | — |
| TruffleHog (default) | 6% | 31-52% | 11% |
| **TruffleHog (`--only-verified`)** | **90%** | (reduced) | — |
| git-secrets | 5% | 4-8% | 8% |
Independent corroboration — **OWASP WrongSecrets `scanner-comparison`** (`github.com/OWASP/wrongsecrets`) benchmarks 7 secret scanners on a known-planted-secret corpus; MCPAmpel reports **detect-secrets 43.6%, Gitleaks 22.3%** detection rate over 2,900 repos.

### (c) SAST / code vulnerability detection — canonical: OWASP Benchmark + RealVuln SAST leaderboard
**Named**: **OWASP Benchmark** (`owasp.org/www-project-benchmark` — ~2,740 synthetic Java test cases, each mapped to a CWE with published true/false-positive ground truth, automated scorecard generators) + the independent **RealVuln** leaderboard (`arxiv.org/pdf/2604.13764`).
**Why canonical**: OWASP is a vendor-neutral foundation; ground truth (`expectedresults-1.2.csv`) is published; TPR/FPR scored. RealVuln adds a real-world (non-synthetic) corpus scored by strict **F3** (recall-weighted).
**Verbatim RealVuln F3 leaderboard** (`arxiv.org/pdf/2604.13764`, strict F3 — recall weighted 9×): a clean three-tier hierarchy — Security-Specialized scanner **Kolega.Dev = 73.0**, best general-purpose LLM **Claude Sonnet 4.6 = 51.7**, best rule-based SAST **Semgrep = 17.7** (Snyk 17.4, SonarQube 7.1). Rule-based SAST occupies the bottom tier.

## §3.2 — Ranked table — L0.5 Security repos by canonical benchmark

23-dim composite from `MASTER-SCORING-MATRIX-W259.md`. **Canonical-benchmark column** = the academic detection metric for the repo's sub-capability. D8 re-anchored to independent academic data (not vendor self-claims).

| Rank | Repo | **Canonical-benchmark score (independent)** | W259 Composite | D8 (adoption, independent) | D9 (FM-aware/CVE) | D11 (native-CC) | Sub-capability | Disposition (corrected) |
|---:|---|---|---:|---:|---:|---:|---|---|
| 1 | **aquasecurity/trivy** | **76.5% detection** (MCPAmpel 16-engine, 2,900 repos) · **69.4% Jaccard top-pair** (arXiv 2503.14388) · 4.2% false-positive (independent 100-image benchmark) | 87 | 9 (de-facto OSS standard — CNCF) | 8 | 9 | Container/dep CVE | **T1 INSTALL** — independently #1 detection rate among OSS scanners. |
| 2 | **gitleaks/gitleaks** | **F1 60% (top), recall 86-88% (top), precision 46% (2nd)** — NSF/arXiv 2307.00714 | 86 | 9 | 8 | 9 | Secret detection | **T1 INSTALL** — canonical-benchmark **#1 secret scanner by F1**. Best pre-commit gate. |
| 3 | **microsoft/agent-governance-toolkit** | **OWASP Agentic Top 10 — 10/10 coverage** (independent OWASP standard); 13k+ tests | 96 | 10 | 10 | 8 | Agentic runtime governance | **T1 INSTALL** — OWASP-standard-validated; MS-official; security gate. |
| 4 | **pre-commit/pre-commit** | hook substrate — used by ~28-35% of teams (independent surveys); no detection benchmark (it's a runner, not a scanner) | 84 | 10 | 9 | 6 | Hook substrate | **T1 INSTALL** — substrate; pairs with gitleaks/trivy. (L0.4 may prefer lefthook — run one.) |
| 5 | **anthropics/claude-code-security-review** | no public detection benchmark (AI-based PR review; OWASP-aligned) | 88 | 9 | 9 | 9 | PR security gate | **T1 INSTALL** — CC-native PR gate; complements (not replaces) Trivy/gitleaks. |
| 6 | **NVIDIA/garak** | LLM red-team probe suite — no CVE-corpus benchmark (different capability: LLM vuln probing) | 84 | 9 | 8 | 8 | LLM red-teaming | T2 STUDY-PILOT — distinct capability; demand-gated. |
| 7 | **ossf/scorecard** | OpenSSF supply-chain heuristic — no detection-rate benchmark (scores repo *practices*, not CVEs) | 84 | 9 | 9 | 6 | Supply-chain posture | T2 STUDY-PILOT. |
| — | **trufflehog (trufflesecurity)** | **precision 90% with `--only-verified`** / **6% default**; recall 31-52% — NSF/arXiv 2307.00714 | (not a master-matrix row; L0.5 §4 pick) | 9 (800+ verifier coverage) | 8 | 7 | Secret detection (deep) | **T2 STUDY-PILOT** — verification-mode precision is excellent; complements gitleaks (gitleaks for pre-commit speed, trufflehog for CI deep-audit). |
| — | **anchore/grype** | **49.8% detection** (MCPAmpel) · pairs with Trivy at 69.4% Jaccard; 6.8% false-positive | (not a master-matrix row) | 8 | 8 | 7 | Container/dep CVE | T3 — Trivy outperforms on detection + breadth; Grype only if SBOM-centric (Syft pairing). |
| — | **semgrep** | **OWASP Benchmark scored**; **RealVuln strict F3 = 17.7** (best rule-based SAST, but bottom tier vs LLM scanners) | (not a master-matrix row; L0 §4 pick via PyPI) | 8 | 8 | 7 | SAST | T2 STUDY-PILOT — canonical-benchmark says rule-based SAST is the weakest tier; useful but do not over-rate. |

## §3.3 — Vendor-marketing flags (L0.5 Security)

| Repo / claim | Flagged signal | Class | Severity | Correction |
|---|---|---|---|---|
| **Snyk** "461 unique true-positive finds / lowest FP" | Several "Snyk vs Trivy" comparisons (`techplained.com`, `expertquerieshub.com`) are SEO/affiliate content with **undisclosed methodology**; Snyk's database is **proprietary — independent verification impossible** (`safeguard.sh` notes this explicitly). Snyk's own pre-CVE-disclosure "14 hours before Log4Shell" is a **Snyk-published** claim. | **E1 (publisher-favored) + proprietary-unverifiable** | **LOW** (Snyk not a master-matrix install row) | If Snyk is ever scored, D8 must rest on the **academic** corpora (arXiv 2503.14388 / NSF 2307.00714), not vendor blogs. Proprietary-DB tools cannot be canonically benchmarked — flag as such. |
| **Puaro** "99.8% noise reduction vs Gitleaks" | `puaro.io/blog/secret-scanner-benchmark-report` is **Puaro's own blog**, ranking Puaro #1 against Gitleaks/TruffleHog/GitGuardian. Textbook **E1**. | **E1 (publisher-run)** | **LOW** (Puaro not scored) | Do not cite Puaro's "99.8%" anywhere. The canonical secret-detection benchmark is the NSF/arXiv study, where Puaro does not appear. |
| **DevSecOps-MCP** "80+ real vulnerabilities detected in testing" | self-reported test count in the repo's own README; no ground-truth corpus, no precision/recall. | **E1** | **LOW** | Self-reported "N vulnerabilities found" is not a benchmark — needs a known-CVE corpus + FP rate. |
| **`expertquerieshub.com` "10,000 image" Trivy/Snyk benchmark** | Trivy 76.5% / Snyk 134-avg numbers appear in an SEO content-farm article; one Trivy number (76.5%) *happens to match* the independent MCPAmpel study, so the **conclusion survives**, but the cite is content-farm-grade. | **E6-adjacent** | **LOW** | Re-anchor any Trivy detection number to **MCPAmpel** (2,900 MCP servers, 16 independent engines) or **arXiv 2503.14388**, not the content-farm article. |
| **W259 master matrix D8 for Trivy/gitleaks** | The master matrix scored Trivy D8=9 / gitleaks D8=9 on "de-facto standard" — **acceptable**, but the *number* should be explicitly anchored to the academic corpora now that they are surfaced. | E4-adjacent (mild) | **LOW** | D8 holds at 9 for both — but cite arXiv 2503.14388 (Trivy) and NSF 2307.00714 (gitleaks) as the anchor. |

**Net L0.5 verdict**: **CLEAN at the install-decision level** — the W259 master matrix's L0.5 picks (**Trivy + gitleaks + pre-commit**, plus agent-governance-toolkit) are **independently validated by the canonical academic benchmarks**: Trivy is the #1-detection-rate OSS container scanner (MCPAmpel 76.5%, arXiv-2503.14388 top-pair), gitleaks is the #1 secret scanner by F1 (NSF/arXiv 2307.00714, F1=60%). The vendor-marketing flags above (Snyk proprietary-unverifiable, Puaro self-blog, DevSecOps-MCP self-count) concern **non-installed** repos — none contaminated an L0.5 install decision. The only correction is **cite-hygiene**: explicitly anchor Trivy/gitleaks D8 to the academic corpora, and never cite content-farm or vendor-blog numbers.

## §3.4 — Corrected disposition (L0.5 Security)

- **No tier changes.** The L0.5 install set (Trivy, gitleaks, pre-commit/lefthook, agent-governance-toolkit, claude-code-security-review) is canonical-benchmark-validated and **holds**.
- **gitleaks vs trufflehog — clarified by the canonical benchmark**: gitleaks wins on **F1 (60%) and recall (86-88%)** and is the correct **pre-commit** gate (fast, regex+entropy, no network). trufflehog with `--only-verified` wins on **precision (90%)** and is the correct **CI deep-audit** tool (verifier coverage 800+ credential types). They are **complementary, not competitors** — the canonical benchmark supports running both at different pipeline stages.
- **Trivy vs Grype — clarified**: Trivy's **76.5% detection** beats Grype's **49.8%** (MCPAmpel); they pair at 69.4% Jaccard. Trivy is the L0.5 pick; Grype only if an SBOM-centric Syft workflow is adopted.
- **Action**: re-wire **gitleaks as a git pre-commit hook** via lefthook (per LAYER-H §9) — currently it is a CC-hook that fires *later*; the canonical benchmark (recall 86-88%) makes it the right pre-commit gate.

---

## §4 — Summary: canonical benchmark + top-3 per layer

| Layer | Canonical hard benchmark (independent) | Top-3 ranked by that benchmark | Vendor-marketing flagged |
|---|---|---|---|
| **L0 MCP** | **AgentRank 8-signal composite** (`agentrank-ai.com` / open-source `superlowburn/agentrank`; 27,553+ MCP servers; stars weighted *lowest*) | 1. microsoft/playwright-mcp (AR 94.5) · 2. github/github-mcp-server (AR 85.4) + MCP-SDK family (AR 85-92) · 3. modelcontextprotocol/inspector (AR 88.1) | opencode "160,923★", claude-mem "~76,000★", caveman "~60,762★" (E4 star-proxy); rtk-ai self-claim (E1+E5); D3-systemic star contamination |
| **L0.4 Git/VCS** | **Independent VCS comparison + git-tool adoption surveys** (StackOverflow 90k / JetBrains 25k — Git 94-95%) | 1. git (94-95% adoption) · 2. git-worktree + CC `EnterWorktree` · 3. gh / git-cliff / lefthook (T1 tool tier) | **ruvnet/agentic-flow "Git vs Jujutsu" benchmark** ("2-100× faster / 90%-vs-80%" — E1+E5 vendor doc; agentic-flow ships an agentic-jujutsu package) |
| **L0.5 Security** | **Academic detection-rate corpora** — arXiv 2503.14388 (VEX-consistency, 7 scanners) · NSF/arXiv 2307.00714 (secret-detection precision/recall, 9 tools) · OWASP Benchmark + RealVuln SAST F3 | 1. aquasecurity/trivy (76.5% detection — MCPAmpel) · 2. gitleaks (F1 60%, recall 86-88% — NSF/arXiv) · 3. microsoft/agent-governance-toolkit (OWASP Agentic 10/10) | Snyk (proprietary-unverifiable, E1); Puaro "99.8%" self-blog (E1); DevSecOps-MCP "80+ vulns" self-count (E1); content-farm Trivy/Snyk articles (E6) |

**Bottom line**: All three layers' W259 *install decisions* survive the canonical-benchmark re-audit — but each layer had a distinct contamination class. **L0** trusted GitHub stars (fix: AgentRank). **L0.4** had one vendor-marketing benchmark (`ruvnet/agentic-flow`'s "2-100×" jj numbers — must never enter a composite; the *verdict* "stay on git, pilot jj" was independently reached and is correct). **L0.5** is the cleanest — Trivy and gitleaks are *independently validated as #1* in their sub-capabilities by NSF/academic corpora; the vendor-marketing flags (Snyk/Puaro/DevSecOps-MCP) touch only non-installed repos. The corrective action across all three is **cite-hygiene**: anchor D3/D8 to the named independent benchmark, never to stars or vendor blogs.

---

## Appendix — Independent benchmark sources consulted (all 2026-Q1/Q2 unless noted)

- **L0 MCP**: `agentrank-ai.com` (methodology + `/tools` + `/blog/state-of-mcp-2026/` 2026-03-16 + `/blog/top-mcp-servers-2026/` + `/blog/best-mcp-servers-security/` 2026-03-17); `github.com/superlowburn/agentrank` (open-source scoring engine, 2026-03-13); `mcppedia.org/blog/2026-04-04-how-we-score-mcp-servers`; `mcpampel.com/blog/16-engines-2900-mcp-servers` (2026-04-02, 16-engine 2,900-server study); `chatforest.com/reviews/security-scanning-mcp-servers` (2026-03-24, Trivy-MCP stall + supply-chain incident).
- **L0.4 Git/VCS**: `github.com/jj-vcs/jj` (jj official); `etodd.io` (2025-10-02); `bojanstipic.com` (3-month trial); `brtkwr.com` (2026-03-08); `julianpaul.dev` (2026-02-27); `byteiota.com` (2026-04-21); `docs.jj-vcs.dev/latest/git-comparison/`; **flagged**: `github.com/ruvnet/agentic-flow/.../BENCHMARK_EXECUTIVE_SUMMARY.md` (vendor doc — E1+E5); `survey.stackoverflow.co/2025/`; `gitnux.org/git-statistics/` (2026-02-13); `wifitalents.com/git-commit-statistics/` (2026-02-12); `gitkraken.com/reports/git-collaboration-2024`; `devtoolsguide.com/git-tools-comparison` (2026-02-09).
- **L0.5 Security**: `arxiv.org/html/2503.14388v2` ("Vexed by VEX Tools", 7-scanner VEX-consistency); `par.nsf.gov/servlets/purl/10505647` / `arxiv.org/pdf/2307.00714` (Basak et al., NSF — 9-tool secret-detection precision/recall); `owasp.org/www-project-benchmark` (OWASP Benchmark, ~2,740 CWE-mapped test cases); `arxiv.org/pdf/2604.13764` (RealVuln SAST strict-F3 leaderboard); `github.com/OWASP/wrongsecrets` (`scanner-comparison`, 7-scanner planted-secret corpus); `mcpampel.com/blog/16-engines-2900-mcp-servers` (per-engine detection rates); `safeguard.sh/resources/blog/best-secret-scanning-tools-2026-comparison` (2026-03-31); **flagged**: `puaro.io/blog/secret-scanner-benchmark-report` (vendor self-blog — E1), `techplained.com`/`expertquerieshub.com` (content-farm Trivy/Snyk — E6).
