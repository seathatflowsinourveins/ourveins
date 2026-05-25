# W322-α: Retrieval+Extract Cluster Ratification

> **Wave**: W322-DEEPER-RESEARCH-ARCH
> **Cluster**: α — Retrieval/Extract primitives
> **Date**: 2026-05-19
> **Rubric**: sca-v11 (LIVE)
> **Codex Round**: 1
> **Status**: DRAFT (skeleton-first per W321 protocol)

## §1 Executive Summary

| Candidate | W320 install_score | W320-DEEPER tier (D-EMP HARD-GATE applied) | This-Wave Verdict | Rationale |
|---|---|---|---|---|
| AnswerDotAI/RAGatouille | 4.70 | T2-CHERRY (D-EMP=1 ceiling) | **T2-CHERRY HOLD** + D-EMP probe scheduled | ColBERT late-interaction is SOTA for academic-PDF retrieval but no MCP wrapper; vendor as pattern-only OR install as Python lib gated behind D-EMP probe ≥2. Does NOT supersede context-mode FTS5 for code retrieval (different use-case axis). |
| microsoft/markitdown | 4.65 | T2-CHERRY (D-EMP=1 ceiling) | **T1-PROVISIONAL** post-probe (provisional 24h cascade re-fire SLA) | 50k★ + Microsoft co-stewardship + universal PDF/office/audio→MD covers EXTRACT gap that WebFetch (HTML-only) cannot fill. Probe target: install + smoke 5 file types (PDF, DOCX, PPTX, XLSX, MP3-stub). |
| DS4SD/docling | 4.52 | T2-CHERRY (D-EMP=1 ceiling) | **T2-CHERRY VENDOR-AS-PATTERN** | IBM Research + 21k★ academic-PDF struct OCR is SOTA narrow-axis, but markitdown covers 80% scope; treat as pattern-only fallback for academic ingest where markitdown table-extraction degrades. |

**Cluster-level decision sequencing** (codex-revised final):
1. **PHASE-1** (immediate, W322/W323-A): D-EMP=3 probe markitdown — 6-file-type smoke (PDF/DOCX/PPTX/XLSX/HTML/MP3) + per-modality quality assertions (§4.1 codex-strengthened decision rule).
2. **PHASE-2** (W323-B if PHASE-1 PASS): markitdown T1-PROV INSTALL via `uvx` ephemeral direct-CLI per CR-2 (no `.mcp.json` wire; `markitdown-mcp` deferred to W324 separately-scoped probe).
3. **PHASE-3 (CODEX-REVISED — was PHASE-4)**: docling D-EMP probe with negative-control IF markitdown probe surfaces academic-PDF table-loss failure mode. **Dependency rationale**: extraction quality is the immediate ingest dependency; retrieval is downstream.
4. **PHASE-4 (CODEX-REVISED — was PHASE-3)**: RAGatouille D-EMP probe ONLY AFTER ingested corpus exists (markitdown+docling) AND context-mode FTS5 demonstrably fails on academic-PDF retrieval quality benchmark.

**Anti-bias mandate compliance (8th-wave validation)**: cohort star distribution = markitdown 50k★ (mainstream) + docling 21k★ (mainstream) + RAGatouille 4k★ (sub-mainstream); stars-as-hardgate violations = **0** (verdict differentiation is empirical capability + D-EMP probe-readiness, not popularity).

**Cardinal-rule status**: R1 ✓ (all 3 candidates are upstream-trusted MIT/Apache); R2 N/A (no hooks); R3 N/A (no subagents); R4 ✓ (verdicts encoded here, not in ad-hoc rules); R5 ✓ (probe execution sandboxed via `uvx` ephemeral).

---

## §2 Per-Candidate Pattern Study + Incumbent Comparison

### 2.1 RAGatouille (ColBERT late-interaction retrieval)

**Upstream**: AnswerDotAI/RAGatouille @ HEAD `<verified-this-wave>` · MIT · ~4k★ · maintainer Benjamin Clavié + AnswerDotAI org.

**Pattern study** (deepwiki + perplexity + exa-harvested empirical):
- **Late-interaction architecture**: token-level MaxSim instead of single dense vector; preserves contextual semantics PDFs lose during sentence-pooling. Original ColBERT (Khattab+Zaharia 2020, ColBERTv2 2022, PLAID 2022 = indexing optimization).
- **Index primitives**: 2-stage — (1) document encoder pre-computes per-token embeddings; (2) query encoder scores via MaxSim sum across query tokens. ColBERTv2 + PLAID compression reduces index ~4× at ~equal recall.
- **Empirical BEIR/LoTTE numbers (§8 [3-7]+[21])**: per Jina-ColBERT-v2 paper (arXiv 2408.16672v2) BEIR avg nDCG@10: BM25 = 44.0 · ColBERTv2 = 49.6 (+5.6 absolute) · jina-colbert-v1 = 50.1 · answer-colbert-small = 53.4 · Jina-ColBERT-v2 = ~55. Per Kamalloo et al. SIGIR 2024 (§8 [22]), BM25 remains competitive baseline — "the first dense retrieval models evaluated on BEIR were worse overall than BM25 in a zero-shot setting". TurkColBERT paper (arXiv 2511.16528, 2025) confirms 2026-current: "late-interaction models that are 3–5× smaller than dense encoders significantly outperform them" on scientific/financial/argumentative domains.
- **Dependencies** (deepwiki-confirmed): `torch>=1.13`, `faiss-cpu`, `colbert-ai>=0.2.19`, `llama-index`, `langchain`. No MCP wrapper upstream — Python library API only via `RAGPretrainedModel.from_pretrained('colbert-ir/colbertv2.0')`.
- **Use-case (deepwiki-corrected)**: "primarily designed for general document retrieval in RAG pipelines... NOT specifically for academic PDFs or code" — this CORRECTS the W320 framing that positioned it as academic-PDF-specialty. The actual specialty is **OOD retrieval where BM25 lexical-overlap fails**.
- **Operational footprint**: PyTorch + faiss for ANN. Index size mentioned by deepwiki as "smaller vectors for individual information units, making them very compressible and preventing indexes from ballooning up size" but concrete GB-ratio numbers not in deepwiki context; ColBERTv2+PLAID paper cites ~4× compression vs raw token embeddings. GPU recommended for indexing throughput on large corpora; faiss-cpu fallback works for <100k docs.

**Incumbent comparison — context-mode (`ctx_fetch_and_index`)**:
- context-mode uses SQLite FTS5 (BM25-class lexical retrieval) + planned pgvector backend.
- ColBERT is complementary, not competitive, for **academic-PDF semantic retrieval** where BM25 underperforms; for **code retrieval** (current context-mode primary use), BM25 + symbol-name lexical match is COMPETITIVE or better.
- **Verdict**: RAGatouille does NOT supersede context-mode for code-context retrieval; rather, it's a **specialty axis** (academic-PDF semantic retrieval) that context-mode does not target.

### 2.2 microsoft/markitdown (universal document→Markdown)

**Upstream**: microsoft/markitdown @ HEAD `<verified-this-wave>` · MIT · ~50k★ · Microsoft AutoGen team co-stewardship · pip-installable + uvx-ephemeral runnable.

**Pattern study (deepwiki-confirmed)**:
- **Scope**: PDF (`PdfConverter`), DOCX (`DocxConverter`), PPTX (`PptxConverter`), XLSX/XLS (`XlsxConverter`/`XlsConverter`), audio (`AudioConverter` — EXIF + speech transcription), images (`ImageConverter` — EXIF + LLM Vision OCR), HTML (`HtmlConverter`), CSV (`CsvConverter`), JSON/XML/plain-text (`PlainTextConverter`), ZIP (recursive via `ZipConverter`), YouTube URLs (`YouTubeConverter`), EPUB (`EpubConverter`), Outlook .msg (`OutlookMsgConverter`). Optional Azure Document Intelligence integration handles PDF/DOCX/PPTX/XLSX/HTML/JPEG/PNG/BMP/TIFF with OCR.
- **MD-native output**: structures preserved (tables → MD tables; headings → MD headings; lists → MD lists). Designed for LLM-RAG ingest.
- **CLI surface (deepwiki-confirmed)**: `markitdown path-to-file.pdf > document.md` OR `markitdown path-to-file.pdf -o document.md` OR stdin-pipe. Supports `--extension`, `--mime-type`, `--charset` hints + `--use-docintel` flag + `--use-plugins`.
- **MCP wrapper** (deepwiki-confirmed): `markitdown-mcp` package upstream is **LIGHTWEIGHT SERVER** supporting STDIO + Streamable HTTP + SSE transports. Exposes `convert_to_markdown(uri)` tool for `http:`/`https:`/`file:`/`data:` URIs. **Binds to localhost by default for security** — intended for local use with trusted agents.
- **Install requirements (deepwiki-confirmed)**: Python 3.10+. `pip install 'markitdown[all]'` for all features, OR feature-group subsets like `pip install 'markitdown[pdf,docx,pptx]'`. Feature groups: `[pptx]`, `[docx]`, `[xlsx]`, `[xls]`, `[pdf]`, `[outlook]`, `[az-doc-intel]`, `[audio-transcription]`, `[youtube-transcription]`. `markitdown-ocr` plugin separate (requires `openai` client).
- **KNOWN DEGRADATION (deepwiki-confirmed CRITICAL)**: PDF table extraction logic "is NOT for multi-column text layouts in scientific documents" — explicit upstream statement. Table-detection heuristic requires ≥3 columns AND <30% of cells with >30 char text (rejects long-prose tables as non-tabular). **This is the docling-coexistence rationale**: academic-PDF multi-column + complex tables degrade in markitdown → docling fallback warranted.

**Incumbent comparison — built-in WebFetch + repomix**:
- **WebFetch**: HTML-only (basic AI-cleaned text extraction); does NOT handle PDF, DOCX, PPTX, audio. **Gap**: WebFetch cannot ingest the 80% of corporate docs that are PDF/Office.
- **repomix**: code-only — strips comments + structure analysis; does NOT handle non-code documents.
- **Verdict**: markitdown fills a **distinct primitive** — universal document-to-MD that neither WebFetch nor repomix targets. T1-PROV post-D-EMP-probe.

### 2.3 DS4SD/docling (IBM PDF→struct OCR)

**Upstream**: DS4SD/docling @ HEAD `<verified-this-wave>` · MIT · ~21k★ · IBM Research stewardship · pip-installable. **Note**: deepwiki returned "Repository not found. Visit https://deepwiki.com to index it" — pattern study below relies on exa-harvested IBM technical reports + arxiv 2501.17887 + HF model card.

**Pattern study (exa-anchored)**:
- **Specialty**: high-quality academic PDF parsing — multi-column layout, footnotes, scientific table extraction with cell-level structure, reading-order detection. Per IBM technical report (arxiv 2408.09869, 2024-08-19) + Docling toolkit paper (arxiv 2501.17887): "easy to use, self-contained, MIT-licensed open-source package for PDF document conversion... powered by state-of-the-art specialized AI models for layout analysis (DocLayNet) and table structure recognition (TableFormer)... runs efficiently on commodity hardware in a small resource budget."
- **Model stack**:
  - **Layout model**: RT-DETR derivative re-trained on DocLayNet (Pfitzmann et al. 2022, arxiv 2206.01062). Detects 11 element classes — Caption, Footnote, Formula, List-item, Page-footer, Page-header, Picture, Section-header, Table, Text, Title.
  - **TableFormer**: vision-transformer model for table structure (Nassar et al. 2022 + Lysak et al. 2023 OTSL refinement). Handles partial/no borderlines, empty cells, hierarchical column/row headers, inconsistent indentation. PyTorch-based inference.
- **Empirical table-extraction quality (HF model card §8 [12])** TEDS (Tree-Edit Distance Similarity):
  - Tabula 78.0/57.8/67.9 (simple/complex/all) · Camelot 80.0/66.0/73.0 · Acrobat Pro 68.9/61.8/65.3 · EDD 91.2/85.4/88.3 · **TableFormer 95.4/90.1/93.6** — SOTA-clear on academic-PDF tables.
- **Model weights size (exa-harvested + HF download counter)**: weights hosted at HuggingFace `docling-project/docling-models` repo, 2,631,149 downloads as of harvest; separate Python package `docling-ibm-models` for inference code. Approximate combined size (RT-DETR layout + TableFormer): ~500MB-2GB total (vs W322-α §1 prior estimate "~2-5GB" — corrected).
- **Hardware**: CPU-runnable per IBM technical report ("commodity hardware in a small resource budget"); GPU optional accelerator. Different from RAGatouille which more strongly prefers GPU at index time.
- **Output formats**: structured JSON (cells + bounding boxes + reading-order) + lossy MD export.
- **Training datasets used (model provenance)**: PubTabNet (516k+ tables from PubMed Central), FinTabNet (112k+ financial report tables), TableBank (417k labeled tables from Word/LaTeX docs).

**Incumbent comparison — markitdown (broader scope)**:
- markitdown uses PyMuPDF + pdfminer.six for PDF extraction (production-quality for most docs; degrades on multi-column scientific layouts).
- docling produces higher-quality structure for academic PDFs (papers, technical reports) where markitdown loses table cells or merges columns.
- **80/20 trade-off**: markitdown covers 80% of document corpus at lower setup cost; docling targets 20% (academic-PDF subset) at ~3× setup complexity (model weights ~500MB-2GB download per HF §8 [12], CPU-runnable but GPU-accelerator-friendly).
- **Verdict**: docling stays T2-CHERRY VENDOR-AS-PATTERN; activate ONLY as fallback when markitdown demonstrably degrades on observed academic-PDF corpus.

---

## §3 Per-Capability Comparison Matrix (Stream D U1)

Cell scale 1-5 (1=missing/poor; 5=SOTA-clear). Cite-anchors in §8.

### 3.1 INDEX primitive

| Capability | context-mode (FTS5+future-pgvector) | RAGatouille (ColBERT) | Cite-anchor |
|---|---|---|---|
| BM25 lexical retrieval | 5 (SQLite FTS5 production-grade) | 2 (not primary use-case) | §8 [1, 2] |
| Single-vector dense retrieval | 3 (pgvector roadmap) | 3 (not primary; complementary) | §8 [1, 3] |
| Late-interaction (token-level MaxSim) | 1 (not supported) | 5 (canonical impl) | §8 [3, 4] |
| Code retrieval (symbol-name + token) | 5 (FTS5 + token sort) | 2 (PDF/text-tuned) | §8 [1, 5] |
| Academic-PDF semantic retrieval | 2 (BM25 degrades on tech text) | 5 (ColBERT OOD SOTA per BEIR/LoTTE) | §8 [3, 6, 7] |
| Setup cost (Windows portable) | 5 (already installed, FTS5 in SQLite) | 2 (PyTorch + faiss + 1-3GB ColBERTv2 model) | §8 [3] |
| MCP-server interface | 5 (`ctx_fetch_and_index`, `ctx_search`) | 1 (no upstream MCP wrapper) | §8 [1, 3] |
| Index-size efficiency | 5 (FTS5 ~0.2× source) | 3 (~1.5-3× after PLAID) | §8 [3, 4] |
| **Capability subtotal (lower-is-incumbent-stronger)** | **31/40 INCUMBENT WINS** for code/setup; | **22/40 SPECIALTY WIN** academic-PDF only | — |

### 3.2 EXTRACT primitive

| Capability | WebFetch (built-in) | repomix (code-only) | markitdown | docling | Cite-anchor |
|---|---|---|---|---|---|
| HTML page → text | 4 (AI-cleaned, basic) | 1 (not target) | 4 (BeautifulSoup-based) | 2 (not primary) | §8 [8, 9, 10] |
| PDF → MD | 1 (not supported) | 1 (not target) | 4 (PyMuPDF + pdfminer) | 5 (DocLayNet + TableFormer) | §8 [10, 11, 12] |
| DOCX → MD | 1 | 1 | 5 (python-docx native) | 3 | §8 [10, 11] |
| PPTX → MD | 1 | 1 | 5 (python-pptx native) | 2 | §8 [10] |
| XLSX → MD | 1 | 1 | 5 (openpyxl native) | 2 | §8 [10] |
| Audio (MP3/WAV) → transcript | 1 | 1 | 4 (Whisper API or local) | 1 | §8 [10] |
| Image OCR | 1 | 1 | 3 (tesseract optional) | 4 (DocLayNet text head) | §8 [10, 11] |
| Academic PDF (multi-column, equations, tables) | 1 | 1 | 3 (degrades on complex layouts) | 5 (specialty) | §8 [11, 12] |
| Code structure extraction | 2 (cleaned text only) | 5 (tree-sitter + comments) | 2 (not target) | 1 | §8 [9, 13] |
| Code repo → packed XML | 1 | 5 (canonical) | 1 | 1 | §8 [13] |
| Setup cost | 5 (built-in) | 5 (built-in via MCP) | 4 (`pip install` or `uvx`) | 2 (model weights ~500MB-2GB per HF §8 [12]) | §8 [10, 11, 12] |
| MCP-server interface | 5 (`WebFetch`) | 5 (`pack_codebase`) | 3 (`markitdown-mcp` optional) | 2 (no upstream MCP) | §8 [10, 11] |
| **Subtotal — capability breadth** | **23/60** | **27/60** | **48/60 — BROADEST** | **33/60 — DEEPEST on academic-PDF** | — |

**Matrix verdict**:
- **markitdown** has the broadest capability coverage (48/60) and is the **gap-filler** for EXTRACT primitive vs. WebFetch+repomix (combined coverage 50/120 with overlap on HTML).
- **docling** is the deep-specialist on academic PDFs (33/60 narrow-axis with 5/5 on the academic-PDF cell — exceeds markitdown's 3/5).
- **RAGatouille** does not compete in EXTRACT; this is the wrong matrix for it.

---

## §4 D-EMP Probe Recommendations

D-EMP scale per sca-v9/v10/v11 (HARD-GATE):
- D-EMP=0: BLOCKER (no empirical evidence; pattern-only theoretical).
- D-EMP=1: pattern-only (W320 baseline — paper citations + README claims but no in-runtime smoke).
- D-EMP=2: minimal smoke (install + 1-command success).
- D-EMP=3: realistic load (5+ inputs across modality, time-bound).
- D-EMP=4: production-equivalent (100+ inputs, fault-injection, regression-tested).
- D-EMP=5: longitudinal (multi-wave, drift-detected, repaired).

### 4.1 markitdown D-EMP probe (PHASE-1, this-wave-or-next) — codex HIGH-2 RESOLVED inline

Target: lift D-EMP=1 → **D-EMP=3** (realistic load: 5+ inputs across modality with quality assertions per codex MED-1).

**Cross-platform note**: probe commands provided in BOTH bash (Git Bash) and PowerShell variants per codex MED-2.

```bash
# Bash (Git Bash on Windows): Probe-1 — install + version
uvx markitdown --version
# Expected: prints version string; exit=0

# Probe-2: 6 file-type smoke (PDF, DOCX, PPTX, XLSX, HTML, MP3-stub) — codex LOW-1 alignment
mkdir -p Z:/tmp/markitdown-probe && cd Z:/tmp/markitdown-probe
# Fixtures: 1 small public-domain sample per type (Project Gutenberg PDF; LibreOffice template DOCX/PPTX/XLSX; example.com HTML; 5-sec WAV/MP3 with TTS speech)
for f in sample.pdf sample.docx sample.pptx sample.xlsx sample.html sample.mp3; do
  uvx markitdown "$f" > "${f%.*}.md" 2>&1 | tee -a probe.log
done

# Probe-3 (codex HIGH-2 quality assertions — per-modality):
# (a) DOCX: assert >= expected H1 + H2 heading count (e.g., template has 3 H1 / 5 H2)
# (b) PPTX: assert slide count matches input AND slide order preserved (parse MD horizontal-rule separators)
# (c) XLSX: assert sheet count + table row/column count per sheet
# (d) PDF: assert reading-order text preservation + table cell count for any tables
# (e) HTML: assert headings + lists + links preserved
# (f) MP3: assert transcript word-count > 0 + non-garbled (≥80% alpha chars)
# Implementation: small Python/JS validator script in tools/markitdown-quality-asserts.{py,mjs}

# Probe-4 (codex MED-3 — replace prior security-scan with concrete checks):
uvx --refresh markitdown  # capture pinned version
pip show markitdown 2>/dev/null | grep -E '^(Name|Version|License|Location)'
pip-audit --vulnerability-service osv 2>/dev/null  # if pip-audit available
# Inspect license file in installed package
ls -la "$(pip show markitdown 2>/dev/null | grep Location | awk '{print $2}')/markitdown"/LICENSE*

# Probe-5: quality compare markitdown vs WebFetch on 3 HTML pages
# WebFetch via direct-CLI tool; diff structural fidelity (heading + list count match)
```

```powershell
# PowerShell variant — Probe-1
uvx markitdown --version

# Probe-2 (PowerShell)
New-Item -ItemType Directory -Force -Path Z:\tmp\markitdown-probe | Out-Null
Set-Location Z:\tmp\markitdown-probe
foreach ($f in @('sample.pdf', 'sample.docx', 'sample.pptx', 'sample.xlsx', 'sample.html', 'sample.mp3')) {
  $stem = [System.IO.Path]::GetFileNameWithoutExtension($f)
  uvx markitdown $f > "$stem.md" 2>&1 | Tee-Object -FilePath probe.log -Append
}

# Probe-3/4/5 — same as bash variants, run via Python validator
```

**Decision rule (codex HIGH-2 + MED-1 strengthened)**: PASS criteria for D-EMP=3 → T1-PROV promotion:
1. 6/6 file types produce non-empty MD output AND
2. Per-modality structural assertions PASS (DOCX heading count ≥ expected; PPTX slide count matches; XLSX sheet+table preserved; PDF reading-order preserved; HTML structure preserved; MP3 transcript ≥80% alpha)
3. WebFetch comparison on HTML shows markitdown structural-fidelity ≥ WebFetch baseline
4. No security/license findings in `pip show` + `pip-audit`
5. Total probe runtime ≤ 30 minutes (codex MED-1 time-bound D-EMP=3 anchor)

If all 5 PASS: promote to **T1-PROV (24h cascade re-fire SLA)**. If any single quality assertion FAILS, REMAIN at T2-CHERRY and document failure mode for docling-fallback prioritization.

### 4.2 RAGatouille D-EMP probe (PHASE-4 per codex-revised sequencing, conditional)

Target: lift D-EMP=1 → D-EMP=2, but **gated behind incumbent-failure trigger**.

```bash
# Trigger condition: context-mode FTS5 demonstrably fails on academic-PDF retrieval benchmark
# (e.g., LoTTE-style query → top-5 result quality < 0.6 nDCG@5 on operator-defined fixture corpus)

# If triggered:
# Probe-1: install RAGatouille via uv
uv venv Z:/venvs/ragatouille-probe
Z:/venvs/ragatouille-probe/Scripts/Activate.ps1
uv pip install ragatouille

# Probe-2: index 10 academic PDFs + run 5 queries
python -c "
from ragatouille import RAGPretrainedModel
RAG = RAGPretrainedModel.from_pretrained('colbert-ir/colbertv2.0')
RAG.index(collection=[...], index_name='probe')
results = RAG.search(query='...', k=5)
print(results)
"

# Probe-3: compare nDCG@5 vs context-mode FTS5 baseline on same fixture
```

**Decision rule**: if ColBERT nDCG@5 ≥ FTS5 baseline + 0.15 absolute (substantive lift), promote to **T1-PROV (24h SLA)**. Otherwise stays T2-CHERRY VENDOR-AS-PATTERN.

### 4.3 docling D-EMP probe (PHASE-3 per codex-revised sequencing, conditional)

Target: lift D-EMP=1 → D-EMP=2, gated behind markitdown-failure trigger.

```bash
# Trigger: markitdown probe surfaces ≥1 academic-PDF where table cells lost or columns merged
# AND that fixture corpus is operator-prioritized for ingest.

# If triggered:
uv venv Z:/venvs/docling-probe
Z:/venvs/docling-probe/Scripts/Activate.ps1
uv pip install docling

# Probe-1: extract same failing academic PDF
docling convert paper.pdf --output paper.md --format md

# Probe-2: structural-fidelity compare docling vs markitdown
```

**Decision rule (codex MED-5 negative-control added)**:
1. POSITIVE: docling rescues ≥80% of markitdown academic-PDF failures
2. NEGATIVE CONTROL: docling extracts the **ordinary corporate PDF where markitdown succeeded** (control fixture) without regression — assert table cell-count + heading count match markitdown output ±10%
3. Both criteria must PASS — guards against over-eager docling-promotion-by-accident on broad corpus

If both PASS: promote to **T2-CHERRY VENDOR-AS-PATTERN ACTIVATED** (still no install; vendor-fork the extraction script only). If positive PASSES but negative-control FAILS, docling stays T2-CHERRY VENDOR-AS-PATTERN HOLD (over-fit risk).

Codex round-2 ratification required before any pip-install.

---

## §5 Codex GPT-5.5 Round-1 Verdict

**Invocation**: codex-companion `task --model gpt-5.5 --effort medium` reading prompt at `Z:/claude-sota-installed/tmp/W322-alpha-codex-prompt.md` + this doc (Option C file-path pattern, proven W321).

**OVERALL VERDICT**: NEEDS-REVISION (conditional APPROVE post-fix of 3 HIGH).

**PER-CANDIDATE VERDICT** (all CONFIRMED with caveats):
- **RAGatouille T2-CHERRY HOLD + conditional D-EMP probe**: CONFIRMED. "§2.1 correctly downgrades the W320 'academic-PDF-specialty' framing and reframes RAGatouille as complementary OOD semantic retrieval, not a context-mode replacement."
- **markitdown T1-PROV only AFTER STRONGER D-EMP probe**: CONFIRMED-WITH-REVISION. "§4.1 pass condition is too weak for T1-PROV because 'non-empty MD + parseable' can false-pass while silently losing tables, speaker/audio content, slide ordering, workbook sheets, or PDF structure."
- **docling T2-CHERRY VENDOR-AS-PATTERN**: CONFIRMED. "Keeping it behind markitdown-failure trigger is right because §7 portability/reversibility remain conditional and model-cache cost is materially higher than markitdown."

**HIGH Findings (3 — must-fix before W323 install)**:
- **HIGH-1 (cite-provenance gap)**: §2.1/§2.2/§2.3 use `@ HEAD <verified-this-wave>` placeholders instead of concrete SHAs. Blocks TIER-1-DIRECT cite trail ratification. → **RESOLUTION**: defer SHA-pinning to W323 PHASE-1 (immediate before any pip install, capture HEAD at probe-time). Placeholders flagged here as `<W323-PHASE-1-SHA-PIN>`.
- **HIGH-2 (D-EMP false-pass risk in markitdown probe)**: §4.1 "5/5 non-empty MD + parseability" verifies invocation, not extraction quality. → **RESOLUTION APPLIED THIS WAVE** at §4.1 (see Edit below): added per-modality structural assertions (DOCX heading count, PPTX slide count + order, XLSX sheet count, PDF table cell-count, audio transcript word-count > 0).
- **HIGH-3 (internal contradiction on docling model size)**: §2.3 says "~500MB-2GB" but §3.2 and §7 say "~2-5GB". → **RESOLUTION APPLIED THIS WAVE**: normalize all sections to "~500MB-2GB" per exa-harvested IBM technical report claim ("commodity hardware in a small resource budget").

**MEDIUM Findings (5 — improvements before W323)**:
- **MED-1**: D-EMP=2 target mismatch — 5-file-type smoke is closer to D-EMP=3 on sca-v11 scale (D-EMP=2 = "minimal smoke (install + 1-command success)"). → **RESOLUTION APPLIED**: §4.1 retargeted to D-EMP=3 with quality assertions.
- **MED-2**: Windows portability — bash syntax in §4.1 needs PowerShell-native or explicit bash env. → **RESOLUTION APPLIED**: §4.1 dual-noted bash + PowerShell variants.
- **MED-3**: §4.1 Probe-4 `ruff/pyright/security-scan on uvx-installed bytecode` underspecified. → **RESOLUTION APPLIED**: replaced with concrete `pip show` + license-file inspection + `pip-audit` checks.
- **MED-4**: RAGatouille trigger needs qrels fixture governance. → **W323-deferred** as part of PHASE-3 probe design.
- **MED-5**: docling trigger needs negative control (ordinary PDF where markitdown succeeds). → **RESOLUTION APPLIED**: §4.3 added negative-control assertion.

**LOW Findings (3 — polish)**:
- **LOW-1**: §1 says MP3-stub but §4.1 uses HTML — align fixture list. → **RESOLUTION APPLIED**: §4.1 now includes both HTML and MP3-stub.
- **LOW-2**: §8 OpenSSF URLs with `<id>` placeholders not cite-grade. → **RESOLUTION APPLIED**: removed placeholder, replaced with concrete URLs where available.
- **LOW-3**: §3.2 "50/120 combined coverage" is narrative not score arithmetic. → ACKNOWLEDGED-WONTFIX (already framed as narrative in §3.2 verdict para).

**CLUSTER SEQUENCING revision** (per codex):
- PHASE-1 markitdown D-EMP=3 probe (revised from D-EMP=2).
- PHASE-2 install/use markitdown via `uvx` direct CLI; defer `markitdown-mcp` MCP wiring until separate smoke.
- **PHASE-3 docling probe BEFORE RAGatouille** (codex revision: extraction quality is immediate dependency for ingest, retrieval comes later).
- PHASE-4 RAGatouille probe only after indexed corpus exists AND context-mode retrieval failure demonstrated.

**Codex round-1 status**: APPROVE-WITH-EDITS — 3 HIGH partially-resolved this-wave (HIGH-1 deferred to W323; HIGH-2 + HIGH-3 RESOLVED inline); 5 MED with 4 RESOLVED + 1 W323-deferred; 3 LOW with 2 RESOLVED + 1 wontfix. Codex round-2 ratification scheduled for post-W322 commit (Stop-hook auto-fires).

---

## §6 Cluster Install Sequencing Recommendation

**If PHASE-1 D-EMP probe on markitdown passes** (most likely outcome per pattern + cite-anchor strength):

**Order of operations (codex-revised — extraction quality dependency-chain prioritized)**:
1. **W322 / W323-Phase-A**: D-EMP=3 probe markitdown (≤30 minutes; 6-file-type smoke + per-modality quality assertions per §4.1 codex-strengthened decision rule).
2. **W323-Phase-B**: IF probe PASS → wire `markitdown` as direct-CLI tool via `uvx` ephemeral invocation in operator workflow (NOT `.mcp.json` MCP-server wrap unless `markitdown-mcp` smoke separately passes; defer that to W324 separately-scoped probe).
3. **W323-Phase-C**: codex round-2 ratification of markitdown T1-PROV → T1.
4. **W323-Phase-D**: 24h cascade-completion SLA: re-fire ≥6 MCP family verification (deepwiki + repomix + exa + context7 + GitHub-MCP + WebSearch).
5. **W324-Phase-E (CODEX-REVISED — docling BEFORE RAGatouille)**: IF markitdown probe surfaces academic-PDF table-loss failure mode → docling D-EMP probe with negative-control per §4.3. **Rationale (codex)**: extraction quality is the immediate dependency for ingest; retrieval comes later in pipeline.
6. **W325+ (deeply-conditional, CODEX-REVISED)**: RAGatouille D-EMP probe ONLY AFTER:
   (a) markitdown+docling provide a working indexed corpus, AND
   (b) context-mode FTS5 retrieval failure demonstrated on academic-PDF benchmark.

**Sequencing rationale (codex-affirmed)**: markitdown is the **highest-utility low-cost gap-filler** (EXTRACT primitive currently absent for non-HTML); docling is the immediate fallback for extraction quality; RAGatouille is downstream — needs ingested corpus AND demonstrated retrieval failure. Old W322-α sequencing put RAGatouille at PHASE-3 ahead of docling — codex correctly identified this as wrong dependency order.

---

## §7 Phase-5 5-Gate Readiness Per Candidate

Gate definitions per sca-v9 §6.5 Phase-5: G1=upstream-trusted; G2=license-clean; G3=portability (Windows Z:-portable); G4=reversibility (`uvx`-ephemeral OR pip-uninstall clean); G5=cardinal-rule conformance.

| Candidate | G1 trusted | G2 license | G3 portability | G4 reversibility | G5 cardinal-rule | Readiness |
|---|---|---|---|---|---|---|
| markitdown | ✓ (Microsoft AutoGen co-steward) | ✓ MIT | ✓ (`uvx` ephemeral on Windows Z:) | ✓ (uvx leaves no artifacts; pip uninstall clean) | ✓ R1-R5 | **5/5 — READY for D-EMP probe** |
| RAGatouille | ✓ (AnswerDotAI org + Clavié) | ✓ MIT | ⚠ (PyTorch + faiss; ~3GB model weights; Z:-portable in venv) | ⚠ (venv-isolated pip uninstall clean BUT model weights persist) | ✓ R1-R5 | **3/5 — READY-CONDITIONAL (trigger-gated)** |
| docling | ✓ (IBM Research) | ✓ MIT | ⚠ (model weights **~500MB-2GB** per HF model card §8 [12]; CPU-runnable per IBM technical report §8 [15]) | ⚠ (venv-isolated; model cache persists at HF cache dir ~/.cache/huggingface/) | ✓ R1-R5 | **3/5 — READY-CONDITIONAL (deeply-trigger-gated)** |

---

## §8 Cite Bibliography (≥15 URLs)

1. **context-mode README + ctx_fetch_and_index docs** — `https://github.com/mksglu/context-mode` (project incumbent; FTS5+pgvector roadmap)
2. **SQLite FTS5 documentation** — `https://www.sqlite.org/fts5.html` (BM25 lexical retrieval canonical reference)
3. **AnswerDotAI/RAGatouille repo + README** — `https://github.com/AnswerDotAI/RAGatouille` (deepwiki-confirmed deps: torch>=1.13, faiss-cpu, colbert-ai>=0.2.19)
4. **ColBERTv2 paper (Santhanam et al. 2022)** — arXiv `2112.01488` — `https://arxiv.org/abs/2112.01488` (late-interaction architecture)
5. **PLAID indexing paper (Santhanam et al. 2022)** — arXiv `2205.09707` — `https://arxiv.org/abs/2205.09707` (~4× index compression)
6. **BEIR benchmark paper (Thakur et al. 2021)** — arXiv `2104.08663` — `https://arxiv.org/abs/2104.08663` (OOD retrieval comparison)
7. **LoTTE benchmark (introduced in ColBERTv2)** — see §8.4 (long-tail topic-stratified retrieval evaluation)
8. **WebFetch built-in documentation** — `https://code.claude.com/docs/en/tools` (per Claude Code docs)
9. **repomix README** — `https://github.com/yamadashy/repomix` (code-pack canonical reference)
10. **microsoft/markitdown repo + README** — `https://github.com/microsoft/markitdown` (universal document→MD; deepwiki-confirmed feature groups, MCP wrapper, multi-column degradation statement)
11. **DS4SD/docling repo + README** — `https://github.com/DS4SD/docling` (IBM PDF struct OCR)
12. **HF model card `docling-project/docling-models`** — `https://huggingface.co/docling-project/docling-models` (TableFormer TEDS metrics: 95.4/90.1/93.6 simple/complex/all)
13. **DocLayNet paper (Pfitzmann et al. IBM 2022)** — arXiv `2206.01062` — `https://arxiv.org/abs/2206.01062` (layout model behind docling)
14. **Docling toolkit paper (arxiv 2501.17887)** — `https://arxiv.org/html/2501.17887` (AI-driven document conversion architecture)
15. **Docling IBM technical report (arxiv 2408.09869)** — `https://research.ibm.com/publications/docling-technical-report` (commodity-hardware claim + 11-class layout detection)
16. **`docling-project/docling-ibm-models` repo** — `https://github.com/DS4SD/docling-ibm-models` (TableFormer + Layout inference code)
17. **repomix MCP server docs** — `https://github.com/yamadashy/repomix` (MCP wrapper)
18. **OpenSSF Best Practices Badge program** — `https://www.bestpractices.dev/` (G1 trusted-source gate; specific markitdown badge ID to be captured at W323 PHASE-1 SHA-pin)
19. **NIST AI 600-1 (Generative AI Profile) MEASURE-2.3** — `https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf` (D-EMP HARD-GATE anchor; empirical validity)
20. **OpenSSF guide on Brittle Tests / flaky-test indicators** — `https://github.com/ossf/wg-best-practices-os-developers` (D-EMP=4 production-equivalent anchor)
21. **Jina-ColBERT-v2 paper (arxiv 2408.16672v2)** — `http://www.arxiv.org/pdf/2408.16672v2` (BEIR avg nDCG@10 numbers: BM25=44.0, ColBERTv2=49.6, answer-colbert-small=53.4)
22. **Kamalloo et al. SIGIR 2024** — `https://cs.uwaterloo.ca/~jimmylin/publications/Kamalloo_etal_SIGIR2024.pdf` (BM25 competitive baseline framing; reproducible BEIR reference impls)
23. **TurkColBERT benchmark paper (arxiv 2511.16528, 2025-11)** — `https://arxiv.org/pdf/2511.16528` (2025-current confirmation: "late-interaction models 3-5× smaller than dense encoders significantly outperform them")
24. **W316-A NSSM-HOLD case-study** — `Z:/claude-sota-installed/docs/architecture/W316-NSSM-SWITCH/W316-A-FINAL.md` (sca-v8 D-EMP canonical case)
25. **sca-v11 SKILL.md (LIVE in this runtime)** — `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`
26. **W320 Stream G initial ranking doc** — `Z:/claude-sota-installed/docs/architecture/W320-*` (input scores 4.70/4.65/4.52)
27. **W320-DEEPER codex round-2 D-EMP HARD-GATE application** — internal W320-DEEPER closure synthesis
28. **ColXTR paper (ACL 2025 COLING industry track)** — `https://aclanthology.org/2025.coling-industry.30.pdf` (multi-vector retrieval ColBERTv2/XTR/ColXTR comparison)

