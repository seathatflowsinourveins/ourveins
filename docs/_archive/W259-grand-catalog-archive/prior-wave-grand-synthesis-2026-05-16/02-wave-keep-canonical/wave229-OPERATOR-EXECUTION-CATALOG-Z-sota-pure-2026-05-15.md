---
title: Wave 229 OPERATOR-EXECUTION-CATALOG — Z:\claude-sota-pure Final Multi-Wave Synthesis
status: AUTHORITATIVE-FINAL-OPERATOR-EXECUTION-READY
date: 2026-05-15
wave: 229
predecessors: W213-W228 cumulative (18 dispatches + 2 syntheses + parallel-session W223-MASTER-CATALOG 40.3K + orchestrator-direct verifications)
agents-cumulative: 18 my-arc dispatches × 6 waves (W220+W221+W222+W223+W226+W228); 27 phantom-cite catches; 2 LOAD-BEARING META; 3 MAJOR REVISIONS
artifact-class: operator-execution-catalog-final
cross-model-gate-status: PARTIALLY-SATISFIED — orchestrator-direct GitHub API verifications at synthesis boundary; Pattern D codex T1 review queued as Forward Top-5 F2 BEFORE any Phase 1-9 commit
---

# Wave 229 OPERATOR-EXECUTION-CATALOG — Z:\claude-sota-pure Final Synthesis

## §0 Executive Summary

This OPERATOR-EXECUTION catalog is the **final deliverable** integrating all 6 my-arc research waves (W220+W221+W222+W223+W226+W228) + parallel-session W223-MASTER-CATALOG (40.3K) + W226-N per-repo A-F source-deep audit + W228 deltas. **Read W227 SUPER-FINAL SYNTHESIS as comprehensive baseline** (Tier 1-4 catalog + Phase 0-9 install order) — this W229 catalog applies W228 revisions ON TOP.

**Key W229 contributions OVER W227**:
1. **11 new Tier-A SOTA CLI** ADOPT-NOW (W228-P CI/CD + git + docs + CLI cohort)
2. **REVISED wshobson Top-5** (W228-Q): Tom Farley governance trio (NEW DISCOVERY) + block-no-verify + context-management
3. **3 specialty-layer ADOPT-NOW** (W228-R): sentence-transformers + promptfoo + PurpleLlama
4. **5 NEW wshobson DEMOTED-DUPLICATE** (W228-Q kiss-dry-yagni Must-Never #4): agent-orchestration (IDENTICAL SHA to context-management) + debugging-toolkit + tdd-workflows + comprehensive-review + error-debugging
5. **NEW wshobson REJECT-FOR-FIT** (W228-Q): conductor plugin (4th HARD-GATE cohort instance)
6. **7 NEW PHANTOM-CITE catches** (W228-R: ragas-rebrand + voyage-API-only + jina-rebrand + nomic-PHANTOM-AS-REPO + ColBERT-org-correction + clerk-MCP-doesn't-exist + sentence-transformers-rebrand)
7. **1 NEW PHANTOM** (W228-P): mintlify/mint SaaS-not-repo

**Cumulative discipline ladder advanced**: phantom-cite catches **n=27** (W221-E 3 + W222-G 1 + W222-H 4 + W222-I 1 + W226-O 5 + W226-M 4 + W226-N 1 + W228-P 1 + W228-R 7 = 27 catches, 26 net after 1 conflict resolved orchestrator-direct on chopratejas/headroom).

---

## §1 Cumulative PHANTOM-CITE Audit Trail (n=27 catches, 26 net)

See W227 SUPER-FINAL §1 for catches 1-19. Additional W228 catches:

| # | Wave | Cite phantom | Resolution | Action |
|---|---|---|---|---|
| 20 | W228-P | `mintlify/mint` | PHANTOM — Mintlify is SaaS (mintlify.com), NOT installable repo | `docs/verified-avoid.md` add Cohort 6 (SaaS-not-repo) |
| 21 | W228-R | `explodinggradients/ragas` | REBRANDED → `vibrantlabsai/ragas` | Use canonical slug |
| 22 | W228-R | `voyage-ai/voyage-embeddings` | PHANTOM — Voyage AI is API-only commercial | CR-5 install-priority FAIL; EXCLUDE |
| 23 | W228-R | `jina-ai/jina` | REBRANDED → `jina-ai/serve` (21,872★) | Use canonical slug |
| 24 | W228-R | `nomic-ai/nomic-embed` | PHANTOM-AS-REPO (HF model only, no repo) | Use via sentence-transformers |
| 25 | W228-R | `colbert-ai/colbert` | PHANTOM — actual `stanford-futuredata/ColBERT` | Use canonical org |
| 26 | W228-R | `clerk/clerk-mcp` | PHANTOM — Clerk has NO official MCP; only 2★ community template | REJECT-NOT-OFFICIAL |
| 27 | W228-R | `UKPLab/sentence-transformers` | REBRANDED → `huggingface/sentence-transformers` (Tom Aarsen HF Maintainer) | Use canonical slug |

---

## §2 W228 Deltas to W227 SUPER-FINAL Catalog

### Tier-A NEW from W228-P (11 SOTA CLI tools — ALL ADOPT-NOW immediate)

| # | Repo | Stars | License | Use case | Install |
|---|---|---:|---|---|---|
| Δ1 | `dandavison/delta` | 30,803 | (verify) | Git diff pager (cross-ref W220-A) | `winget install dandavison.delta` |
| Δ2 | `Wilfred/difftastic` | 25,308 | MIT-class | Structural diff (W220-A confirm) | `cargo install difftastic` |
| Δ3 | `jesseduffield/lazygit` | 77,989 | MIT | Interactive git TUI | `winget install JesseDuffield.lazygit` |
| Δ4 | `sharkdp/bat` | (verified) | MIT/Apache-2.0 dual | Modern cat | `winget install sharkdp.bat` |
| Δ5 | `sharkdp/fd` | (verified) | MIT/Apache-2.0 dual | Modern find | `winget install sharkdp.fd` |
| Δ6 | `BurntSushi/ripgrep` | 63,794 | MIT | Modern grep (ALREADY-INSTALLED — verify pin) | `winget install BurntSushi.ripgrep.MSVC` |
| Δ7 | `eza-community/eza` | 21,790 | MIT/EUPL-1.2 | Modern ls | `cargo install eza` |
| Δ8 | `ajeetdsouza/zoxide` | 36,655 | MIT | Smart cd | `winget install ajeetdsouza.zoxide` |
| Δ9 | `tldr-pages/tldr` | 62,529 | CC-BY-4.0 | Man alternative | `npm install -g tldr` |
| Δ10 | `bootandy/dust` | 11,694 | Apache-2.0 | Modern du | `cargo install du-dust` |
| Δ11 | `ClementTsang/bottom` | 13,335 | MIT | Modern top | `cargo install bottom` |
| Δ12 | `XAMPPRocky/tokei` | 14,426 | MIT/Apache-2.0 | Modern cloc | `cargo install tokei` |

### Tier-B NEW from W228-P (CI/CD when activated)

| # | Repo | Stars | License | Use case |
|---|---|---:|---|---|
| Δ13 | `anthropics/claude-code-action` | 7,591 | MIT (Anthropic OFFICIAL) | GitHub Action — @claude mentions trigger CC in CI |
| Δ14 | `promptfoo/promptfoo` | 21,291 | MIT (Anthropic+OpenAI per README) | LLM eval CI/CD (also Layer A W228-R) |

### Tier-C NEW from W228-P (docs when activated)

| # | Repo | Stars | License | Use case |
|---|---|---:|---|---|
| Δ15 | `mkdocs/mkdocs` + `squidfunk/mkdocs-material` | 22,083 + 26.7K | BSD-2 + MIT | Python-native docs (matches Z:/venvs/claude) |
| Δ16 | `facebook/docusaurus` | 64,918 | MIT | If React/TypeScript stack arrives |

### REVISED wshobson Top-5 from W228-Q (SUPERSEDES W220-C Top-5)

| # | Repo | Author | License | Discovery | Verdict |
|---|---|---|---|---|---|
| Δ17 | **`wshobson/agents/plugins/protect-mcp`** | **Tom Farley** | MIT | **NEW W228-Q** | ADOPT-NOW — Cedar policy enforcement + Ed25519 signed receipts (GENUINELY-NEW cryptographic governance) |
| Δ18 | **`wshobson/agents/plugins/review-agent-governance`** | **Tom Farley** | MIT | **NEW W228-Q** | ADOPT-NOW — Hermes failure-mode prevention (GENUINELY-NEW) |
| Δ19 | **`wshobson/agents/plugins/signed-audit-trails`** | **Tom Farley** | MIT | **NEW W228-Q** | ADOPT-NOW — Teaching companion to protect-mcp (GENUINELY-NEW) |
| Δ20 | `wshobson/agents/plugins/block-no-verify` | cskwork | MIT | W228-Q confirmed | ADOPT-NOW — mechanical canonical.md Must-Never #3 enforcement (GENUINELY-NEW) |
| Δ21 | `wshobson/agents/plugins/context-management` | Seth Hobson | MIT | W228-Q confirmed | ADOPT-NOW — PROVIDER-COMPLEMENT to Memory Stack |

**Install command (corrected per W228-Q)**:
```bash
/plugin marketplace add wshobson/agents
/plugin install protect-mcp@wshobson
/plugin install review-agent-governance@wshobson
/plugin install signed-audit-trails@wshobson
/plugin install block-no-verify@wshobson
/plugin install context-management@wshobson
```

### Specialty Top-3 from W228-R

| # | Repo | Stars | License | Use case |
|---|---|---:|---|---|
| Δ22 | `huggingface/sentence-transformers` | (HF maintained) | Apache-2.0 | **Embedding + Reranker + Sparse 3-in-1** install (Layers B+C combined) |
| Δ23 | `promptfoo/promptfoo` (cross-ref Δ14) | 21,291 | MIT | LLM eval — strongest convergence Axis-1+2+3 (Anthropic + OpenAI) |
| Δ24 | `meta-llama/PurpleLlama` (LlamaGuard 3) | (large) | MIT + Llama Community | DEMAND-GATED — for untrusted-input filtering |

### NEW REJECT-FOR-FIT additions from W228

| Repo | Rationale |
|---|---|
| `mintlify/mint` (W228-P) | PHANTOM — SaaS not installable repo |
| `voyage-ai/voyage-embeddings` (W228-R) | PHANTOM — API-only commercial fails CR-5 |
| `clerk/clerk-mcp` (W228-R) | PHANTOM — does NOT exist |
| `cohere-ai/cohere-toolkit` (W228-R) | ARCHIVED — Probe 6 archive blocker |
| `AI21Labs/in-context-ralm` (W228-R) | ARCHIVED |
| `evansims/openfga-mcp` (W228-R) | ARCHIVED |
| `wshobson/agents/plugins/conductor` (W228-Q) | **4th HARD-GATE cohort** — "CRITICAL RULES: Ask ONE question per turn. Wait for user response" mode-harness-shape FAIL |
| `wshobson/agents/plugins/agent-orchestration` (W228-Q) | DEMOTED-DUPLICATE — IDENTICAL SHA to context-management (W220-C missed) |
| `wshobson/agents/plugins/debugging-toolkit` (W228-Q) | DUPLICATE — superpowers:debug covers |
| `wshobson/agents/plugins/tdd-workflows` (W228-Q) | DUPLICATE — superpowers:tdd vendored |
| `wshobson/agents/plugins/comprehensive-review` (W228-Q) | DUPLICATE — sss 5-lens cross-model-consensus covers |
| `wshobson/agents/plugins/error-debugging` (W228-Q) | DUPLICATE — overlaps multiple |
| `auth0/auth0-mcp-server` (W228-R) | Probe 7.a DEMAND-ABSENCE — no sss auth workflow |
| `supabase-community/supabase-mcp` (W228-R) | Probe 7.a DEMAND-ABSENCE — no sss Supabase backend |

---

## §3 FINAL CUMULATIVE Catalog (W227 + W228 deltas)

### Total ADOPT-NOW count (cumulative W213-W228)

**~50+ ADOPT-NOW candidates** across all phases:

#### Foundation (Phase 0 — already-LANDED)
F1-F7 per W227 §2 Tier 1 Foundation (cwc-long-running-agents + sops + mcp-memory + graphiti + FalkorDB + gsd-build + 13+ MCPs in `.mcp.json`)

#### Phase 1 — Marketplaces (4 commands)
- anthropics/claude-plugins-official (19,447★ A+) + anthropics/skills (135,067★ A+) + addy-agent-skills (39,100★) + wshobson/agents (35,400★)

#### Phase 2 — Measurement + Voice/TTS-STT
- ccusage 14,221★ A + elevenlabs-mcp 1,364★ A- OFFICIAL

#### Phase 3 — Anthropic OFFICIAL repos + skills + plugins
- claude-cookbooks 43,047★ A+ + mcp-builder skill A+ + document-skills + 3 medium-priority plugins (explanatory-output-style + learning-output-style + rust-analyzer-lsp)

#### Phase 4 — MCP Framework + Code Intel + W228-P Tier-A CLI
- PrefectHQ/fastmcp 25,175★ A + ast-grep 13,808★ A
- **NEW W228-P (11)**: delta + difftastic + lazygit + bat + fd + ripgrep-pin + eza + zoxide + tldr + dust + bottom + tokei

#### Phase 5 — Workflow harness + Parallel operator (REVISED)
- BMAD-METHOD 47,256★ B+ (PARTIAL-OVERLAP selective)
- ~~claude-squad 7,482★~~ **REJECTED W226-N AGPL-3.0 LICENSE BLOCKER**
- Alternative: `eee --worktree` (already wired) for parallel operator

#### Phase 6 — Memory L4 + Observability + LLM proxy + W228-R specialty
- cognee 17,246★ + cognee-integrations CC plugin
- langfuse 27,280★ A- + mcp-server-langfuse 167★
- litellm 47,091★ STUDY-PILOT.b
- **NEW W228-R (3)**: sentence-transformers (Apache-2.0 embedding+reranker 3-in-1) + promptfoo 21,291★ MIT eval-CI/CD + PurpleLlama demand-gated

#### Phase 7 — Security + DocAI + Notification + Data-Eng
- Trivy 35,011★ A (corrected from W220-A 28k+) + bandit + PaddleOCR 77,913★ + ntfy 22k★ + ntfy-mcp
- **NEW W226-M Layer C (2)**: DuckDB 38,230★ + motherduck-mcp 480★ (JSONL audit warehouse SQL)

#### Phase 8 — Browser MCP migration (REVISED W223-K)
- `microsoft/playwright-cli + SKILLs` 88,777★ A PRIMARY (replaces playwright-mcp per Microsoft README)
- `ChromeDevTools/chrome-devtools-mcp` 39,706★ A- SECONDARY (perf/debug)

#### Phase 9 — Agent-orch + ACP + RAG-e2e (selective)
- claude-agent-acp 1,900★ + agentclientprotocol/python-sdk 255★
- onyx 29,400★ OR ragflow 80,600★ (operator picks)
- Temporal 20,100★ B+ workflow engine (durable execution)

#### Phase 10 — wshobson governance + CI/CD (NEW post-W228)
- **NEW W228-Q (5)**: protect-mcp (Tom Farley) + review-agent-governance (Tom Farley) + signed-audit-trails (Tom Farley) + block-no-verify + context-management
- **NEW W228-P CI/CD-tier-B (2)**: anthropics/claude-code-action 7,591★ Anthropic OFFICIAL + promptfoo 21,291★

---

## §4 Forward Top-5 (next-fire candidates per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE)

1. **F1 — Wave 230 cite-anchor migration ship**: Update Z:/claude-sota-installed CLAUDE.md + 50+ rule files to migrate `Z:/claude-sota/...` anchors → `Z:/claude-sota-installed/.claude/rules/...` (FM-20 row 9 path-retirement closure)
2. **F2 — Pattern D codex T1 cross-model review** of this W229 OPERATOR-EXECUTION-CATALOG: `codex exec --skip-git-repo-check --color never -p deep-review-exec` foreground+tee on Phase 0-10 install order; budget 300s — CRITICAL for cross-model gate full satisfaction
3. **F3 — Phase 1-3 install execution** (operator-actionable): 4 marketplace adds + ccusage + claude-cookbooks clone + mcp-builder skill install — lowest-risk first-phase
4. **F4 — Phase 4 Tier-A SOTA CLI batch install**: 11 W228-P picks via `winget install` / `cargo install` / `npm install -g` — parallel install, no inter-dependencies
5. **F5 — `docs/verified-avoid.md` cohort updates**: 26 phantom-cite catches + 13+ license/duplicate/demand-absence/HARD-GATE/SaaS-not-repo REJECT additions

---

## §5 Cross-Model Gate Satisfaction Status (Wave 229)

| Gate layer | Status | Action |
|---|---|---|
| Pre-edit T1 codex consult | **PARTIALLY-SATISFIED** — parallel-session Path P W222 Pattern B HNF + my-arc 18 dispatches all STAND-IN; orchestrator-direct GitHub API verifications at synthesis boundary | Wave 230 Pattern D codex review F2 |
| Commit-time T2 hook | INSTALLED + ACTIVE per manifest §2 L84 W156 F1 | Auto-fires per `if: Bash(git commit *)` |
| Post-commit T3 hook | INSTALLED + ACTIVE | 283 codex_review_HEAD_*.txt telemetry files confirm |
| Mia pre-apply | SATISFIED — chopratejas/headroom conflict resolved + claude-squad AGPL catch + 27 phantom verifications | Applied at all synthesis-vs-Edit boundaries |
| Phantom-cite discipline | SATISFIED — n=27 catches; discipline ladder firm | Continue per fire |
| Multi-source ≥4 discovery | SATISFIED — 14+ catalog discovery surface | Inherited for future fires |
| FM-09 2-stage validation | PENDING — Sonnet stand-in dispatches require BRIDGE-MODE re-fire before commit | Pattern D codex T1 F2 satisfies |

---

## §6 Cumulative Research Artifacts (W220-W228)

All persisted at `Z:/claude-sota-installed/tmp/`:

| Wave | Agents | Artifacts |
|---|---|---|
| W220 | A, C (B FAILED FM-17.b/d) | 2 artifacts |
| W221 | D, E, F | 3 artifacts (E = CRITICAL phantom finding) |
| W222 | G, H, I | 3 artifacts (H = LOAD-BEARING meta-finding, I = partial) |
| W223 | J, K (L TRUNCATED) | 2 artifacts (K = MAJOR REVISION playwright-mcp→cli) |
| W225 SYNTHESIS | orchestrator | wave225-FINAL-SYNTHESIS-Z-sota-pure-install-catalog-2026-05-15.md |
| W226 | M, N, O | 3 artifacts (N = per-repo A-F grades + claude-squad AGPL catch) |
| W227 SYNTHESIS | orchestrator | wave227-SUPER-FINAL-SYNTHESIS-Z-sota-pure-2026-05-15.md |
| W228 | P, Q, R | 3 artifacts (Q = NEW Tom Farley governance trio discovery, R = 7 phantom catches) |
| **W229 SYNTHESIS** | orchestrator | **wave229-OPERATOR-EXECUTION-CATALOG-Z-sota-pure-2026-05-15.md** ← THIS DOCUMENT |
| Parallel-session | external | wave223-MASTER-CATALOG-Z-sota-pure-2026-05-15.md (40.3K baseline) |

**Total**: 18 research artifacts + 3 syntheses + 1 parallel-session catalog = 22 deliverables.

---

## §7 VERDICT

**APPROVE-OPERATOR-EXECUTION-CATALOG-READY**:

- **~50+ ADOPT-NOW candidates** across 10 phases (W213-W228 cumulative)
- **22+ STUDY-PILOT.b CONDITIONAL** candidates (operator workflow gate)
- **~85+ REJECT** entries (license + duplicate + demand-absence + HARD-GATE + SaaS-not-repo + archived + phantom)
- **27 PHANTOM-CITE catches** (26 net after chopratejas/headroom conflict resolution)
- **2 LOAD-BEARING META findings**:
  1. `Z:/claude-sota/` retired path-migration plan (Forward F1)
  2. W226-N claude-squad AGPL discovered via source-code audit
- **3 MAJOR REVISIONS**:
  1. playwright-mcp → playwright-cli + SKILLs (W223-K Microsoft direction)
  2. claude-squad ADOPT-NOW → REJECT (W226-N AGPL-3.0 source audit)
  3. wshobson Top-5 → Tom Farley governance trio + block-no-verify + context-management (W228-Q REVISED, supersedes W220-C surface)
- **1 NEW DISCOVERY**: Tom Farley cryptographic governance class (Cedar + Ed25519 signed receipts) — GENUINELY-NEW
- **Cross-model gate**: PARTIALLY-SATISFIED — Wave 230 Pattern D codex review queued as F2
- **Phase 0-10 install order** ready for operator execution

**verdict_one_line**: `OPERATOR-EXECUTION-READY: ~50 ADOPT-NOW + 22 STUDY-PILOT.b + 85+ REJECT across 10 phases for Z:\claude-sota-pure; per-repo A-F grades from W226-N; 27 phantom catches; Tom Farley governance trio NEW DISCOVERY; 3 major revisions; cross-model gate Wave 230 Pattern D queued; deliverable-complete for operator install execution.`

VERDICT: **APPROVE-OPERATOR-EXECUTION-CATALOG-READY-FOR-Z-SOTA-PURE-INSTALL**
