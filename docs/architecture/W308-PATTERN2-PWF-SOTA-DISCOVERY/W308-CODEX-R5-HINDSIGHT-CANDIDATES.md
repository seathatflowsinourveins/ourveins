# W308 Codex r5 — 2 Hindsight-Surfaced Candidates Audit (2026-05-19)

> **Model**: gpt-5.5 via codex CLI v0.130.0 · **Tokens**: 301,217 · **Cost**: ~$0.50
> **Web access**: enabled (live GitHub + README readings)
> **Trigger**: hindsight memory 2026-05-18 surfaced 2 candidates with score claims; codex r5 verifies + scores under sca-v5 rubric
> **Freshness**: both candidates 2026-current; NO stale pre-2025 refs surfaced (operator mandate honored)

## §0 TL;DR — Summary table

| Candidate | install_score / 5.0 (16.5 denom) | pattern_score / 5.0 (7.1 denom) | 5-tier verdict | Operator action |
|---|---:|---:|:---:|:---:|
| `lyonzin/knowledge-rag` (79★) | **3.50** | **3.31** | **T3 PATTERN-STUDY** | **PATTERN-STUDY** |
| `FrancyJGLisboa/agent-skill-creator` (944★) | **2.65** | **2.77** | **T5 REJECT** | **REJECT** |

## §1 Candidate 1: lyonzin/knowledge-rag — T3 PATTERN-STUDY

**Hindsight memory claim** (2026-05-18): "score 6/7 fills graphiti reranker gap with 12 MCP tools, BM25+ONNX-vector, cross-encoder reranker, and MMR diversification"

**Codex r5 verdict**: hindsight claim is **partly true, OVER-SCORED**. The runtime is NOT in a clean "reranker gap" state.

### §1.1 Verified facts (live GitHub readings)

| Claim | Codex finding | Cite |
|---|---|---|
| 12 MCP tools | TRUE at README/API level (`search_knowledge` + `get_document` + `reindex_documents` + category/document stats + CRUD + URL ingest + `search_similar` + retrieval evaluation) | github.com/lyonzin/knowledge-rag#L743-L908 |
| Hybrid BM25 + semantic vectors + RRF + cross-encoder reranker | TRUE at README/design level | #L397-L442 |
| Cross-encoder = `Xenova/ms-marco-MiniLM-L-6-v2` (enabled by default) | TRUE | #L1033-L1038 |
| Reranker fallback to RRF on load fail | TRUE (documented) | #L1148-L1157 |
| MMR diversification | README-verified, code-anchor-NOT-verified | github.com/lyonzin/knowledge-rag |
| License: MIT | TRUE | #L1328-L1330 |
| 2026-MAY freshness | STRONG — v3.9.0 "Quality Gate" released May 10, 2026 | #L1202-L1223 |
| 82 tests + CI matrix + fuzzing + security + memory baseline + API-surface diff | TRUE | #L1119-L1126 + #L1203-L1222 |

### §1.2 Hard-caps

- **D1 license**: PASS (MIT)
- **D5 typed evidence**: INSTALL-CAP — README/code claims only; no independent benchmark/practitioner field report
- **D7 maintenance**: PASS (v3.9.0 May 2026 + quality gate)
- **D10 duplication**: **CAPS INSTALL** — partial overlap with installed cognee/basic-memory memory/RAG retrieval surfaces; W263/W262 audits already discussed reranker lane + Qwen3 reranker target
- **D15 supply-chain**: PASS-WITH-RISK (Python/ChromaDB/FastEmbed/rank-bm25/watchdog + model downloads)
- **D16 bus factor**: **T1/T2 CAP** — solo maintainer ("Lyon. Security Researcher | Developer"); no foundation/org governance

### §1.3 "Reranker gap" reality check

Codex r5 found:
- W263-final-stack-2026-05-17.md:16 already discusses a hindsight reranker lane
- W262-memory-stack-audit-2026-05-17.md:10 already targets Qwen3 reranker

So the FULL runtime is NOT in a clean reranker gap. The MORE PRECISE gap is: **cognee/basic-memory do not expose a local document-RAG BM25+dense+cross-encoder MCP workflow with the 12-tool granularity** — knowledge-rag does. Partial overlap not full-duplicate.

### §1.4 Concrete patterns worth extracting (PATTERN-STUDY)

1. **Local ONNX cross-encoder fallback behavior** — reranker model load fails → RRF ordering (graceful degrade)
2. **Retrieval eval API surface** — `MRR@5` + `Recall@5` as first-class operations
3. **Public API surface freeze** — explicit API contract preservation
4. **Test-count anti-regression** — 82 tests as a baseline
5. **Memory baseline checks** — quality gate includes memory-baseline regression detection

### §1.5 Verdict justification

Hindsight memory "score 6/7" was inflated. The lite sca-v5 score is 3.50 install / 3.31 pattern → T3 PATTERN-STUDY. NOT T1/T2.

## §2 Candidate 2: FrancyJGLisboa/agent-skill-creator — T5 REJECT

**Hindsight memory claim** (2026-05-18): "score 5/7 fills skill-creator gap with scripts/security_scan.py, scripts/staleness_check.py, and 14-platform export adapter"

**Codex r5 verdict**: feature claims mostly TRUE; **adoption claim NOT defensible**.

### §2.1 Verified facts

| Claim | Codex finding | Cite |
|---|---|---|
| Meta-skill that converts workflows into skills | TRUE | github.com/FrancyJGLisboa/agent-skill-creator#L258-L309 |
| `security_scan.py` + `staleness_check.py` | TRUE | #L466-L481 + #L537-L545 |
| "14-platform" claim | TRUE as README positioning (Tier 1: 8 platforms; Tier 2: 5; Tier 3: 3) | #L386-L389 |
| "Deep semantic adapter" | FALSE — practical adapter is mostly installer/path conversion + Cursor/Windsurf format generation | #L448-L454 |
| `export_utils.py` for desktop/API variants | TRUE | #L559-L564 |
| License: MIT | TRUE | #L625-L627 |
| 944★ + 149 forks community signal | TRUE but D12 caps at 3 stars-alone | #L653-L663 |

### §2.2 Hard-caps (DECISIVE D10)

- **D1 license**: PASS (MIT)
- **D5 typed evidence**: INSTALL-CAP
- **D7 maintenance**: PASS-MEDIUM
- **D10 duplication**: **REJECT-CAP** — duplicate against installed `skill-creator@claude-plugins-official` (per `.claude/settings.json:207`)
- **D15 supply-chain**: PASS-WITH-RISK (install scripts create symlinks + remove existing paths during reinstall/uninstall — too broad for conservative adoption)
- **D16/D17/D18**: weak-to-medium (solo, shallow release surface, no strong independent review evidence)

### §2.3 Prior W287 audit cross-ref

W287-stream-e-skill-creator.md (this runtime, prior wave) ALREADY found this candidate solo-dev + duplicate → REJECTED. Codex r5 ratifies that prior decision.

Local incumbent `skill-creator@claude-plugins-official` has STRONGER feature surface:
- `run_eval.py` + `run_loop.py` + `quick_validate.py` + `package_skill.py` + `aggregate_benchmark.py`
- analyzer + comparator + grader agents
- Eval-driven skill-creator stack at `.claude/plugins/cache/claude-plugins-official/skill-creator/019a87b0b7b2/skills/skill-creator/scripts/`

Francy's net-new pieces (security_scan + staleness_check + export) don't beat the installed eval-loop primitive.

### §2.4 Verdict

T5 REJECT. **Operator action: REJECT**. Hindsight "score 5/7" was over-scored.

If any individual idea is reused (e.g., staleness semantics OR multi-platform export), apply directly to existing operator-curated skills WITHOUT adopting the repo.

## §3 Cross-candidate convergent observations

1. **Both candidates are solo-maintained** — D16 bus-factor cap applies to both
2. **Both surfaced via hindsight memory with inflated scores** — neither meets the implied "ADOPT-class" tier
3. **Both have legitimate PATTERN-STUDY value** — knowledge-rag at T3, agent-skill-creator at T5 (pattern-only extracts)
4. **Anti-bias: stars NOT a hardgate** — agent-skill-creator's 944★ correctly does NOT drive T1; D10 duplication correctly drives T5

## §4 Closures

- **lyonzin/knowledge-rag PATTERN-STUDY operator-action**: surface the 5 extractable patterns (§1.4) for potential W310+ application to mem-recall SKILL OR new memory-eval-discipline doc
- **FrancyJGLisboa/agent-skill-creator REJECT**: confirms W287 prior; no further action

## §5 Cardinal-rule self-check

- R1 ✓ (no install; both verdicts are RECOMMEND-only)
- R2 ✓
- R3 ✓ (codex CLI per W280a)
- R4 REVERSED ✓
- R5 ✓
- W286 P0C ✓
- `self_invented_count: 0` ✓

## §6 Citations (2026-current; NO stale pre-2025 refs)

- Codex r5 raw output: `tmp/codex-output/w309-codex-r5-hindsight-candidates.md` (20022 LOC raw; final ~80 LOC synthesis at lines ~19900-20022)
- lyonzin/knowledge-rag README: https://github.com/lyonzin/knowledge-rag (v3.9.0 May 10, 2026)
- FrancyJGLisboa/agent-skill-creator README: https://github.com/FrancyJGLisboa/agent-skill-creator
- Prior W287-stream-e-skill-creator.md (this runtime; 2026 prior wave)
- W263-final-stack-2026-05-17.md:16 (reranker lane reference)
- W262-memory-stack-audit-2026-05-17.md:10 (Qwen3 reranker target)
- VERDICT-LEDGER.md rows 34 + 35 (this commit)

## §7 Tags

#W308 #codex-r5 #verdict #hindsight-candidates #lyonzin-knowledge-rag #FrancyJGLisboa-agent-skill-creator #T3 #T5 #PATTERN-STUDY #REJECT #2026-current
