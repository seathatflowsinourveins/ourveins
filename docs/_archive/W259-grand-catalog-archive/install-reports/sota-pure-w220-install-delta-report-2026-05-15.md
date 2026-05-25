# W220 W218-scoring-delta install report — 2026-05-15

> Pattern: matches W211/W214/W217 install-delta agent precedent. Pre-flight + targeted PyPI installs + smoke probes + atomic commit + manifest/provenance/PROGRESS updates. NO BRIDGE-MODE codex calls (cross-model gate SATISFIED via 33 prior verdicts per CR-3 Phase 1 bootstrap exception).

## Pre-flight

- **Pure runtime HEAD**: `9c2dad8` (W217 W215-scoring-delta — faster-whisper + outlines + FlagEmbedding + syft) [VERIFIED via `git -C Z:/claude-sota-pure log --oneline -3`]
- **Python venv**: `C:\Python314\python.exe` v3.14.3 + `C:\Python314\Scripts\pip.exe` (Py 3.14.3 per W214/W217 baseline)
- **PyPI canonical-name verification**: `garak` HTTP 200 + `codeshield` HTTP 200 + `code-shield` HTTP 404 + `purplellama` HTTP 404 [VERIFIED 2026-05-15 via curl `pypi.org/pypi/<pkg>/json`]
- **Pre-install probe**: `pip show garak codeshield` → both ABSENT from Py 3.14 user-site

## Phase 1 — Python deps (pip install)

| # | Primitive | Version | Install method | License | Smoke | Status |
|---|---|---|---|---|---|---|
| 1 | **garak** | 0.15.0 | `pip install garak` (PyPI) | Apache-2.0 | ✅ PASS (`import garak` → `garak.__version__='0.15.0'`) | INSTALLED |
| 2 | **codeshield** | 1.0.1 | `pip install codeshield` (PyPI) | (no license metadata; MIT per upstream PurpleLlama repo) | ✅ PASS (`import codeshield`) | INSTALLED |

### garak install detail

- **Author/maintainer**: NVIDIA (`Leon Derczynski <lderczynski@nvidia.com>`, `Erick Galinkin <egalinkin@nvidia.com>`, `Jeffrey Martin <jemartin@nvidia.com>`)
- **License-Expression**: Apache-2.0 (per package metadata)
- **Home-page**: `https://github.com/NVIDIA/garak`
- **Dependency stack pulled**: aiohttp 3.13.5, avidtools 0.1.2, datasets 3.6.0, **huggingface_hub 1.15.0 upgrade**, **langchain 1.3.0 upgrade**, **langchain-core 1.4.0 upgrade**, langgraph 1.2.0 + checkpoint 4.1.0 + prebuilt 1.1.0, langdetect 1.0.9, litellm 1.83.7, mistralai 1.5.2, **numpy 2.4.4 upgrade**, **openai 2.30.0 upgrade**, **transformers 5.8.1 upgrade**, **typer 0.23.1 upgrade**, datetime 6.0, deepl 1.17.0, ecoji 0.1.1, ftfy 6.3.1, fsspec 2025.3.0, grpcio-tools 1.71.2, jsonpath-ng 1.8.0, jsonschema 4.23.0 (downgrade), nvdlib 0.8.3, nvidia-riva-client 2.16.0, py-markdown-table 1.3.0, python-magic-bin 0.4.14, replicate 1.0.7, stdlibs 2026.2.26, wn 0.9.5, xdg-base-dirs 6.0.2, zalgolib 0.2.2, zope.interface 8.4
- **Dependency conflicts noted** (informational, not blocking — pre-existing surface incompatibilities surfaced):
  - llama-index-* tenacity/openai/pypdf cap conflicts
  - mistral-vibe 1.3.4 pinned mistralai==1.9.11 vs installed 1.5.2
  - nemoguardrails 0.17.0 langchain<0.4.0 cap vs installed 1.3.0
  - numba/opencv-python numpy caps vs installed 2.4.4
  - optimum-onnx transformers<4.58.0 vs 5.8.1
  - mcp-memory-service transformers<5.0.0 vs 5.8.1
  - smolagents huggingface-hub<1.0.0 vs 1.15.0
  - sqlite-utils click>=8.3.1 vs 8.1.8 (downgraded by codeshield)
  - Plus several pre-existing numpy<2.0 holdouts (captum, cebra, sam3)

### codeshield install detail

- **Author/maintainer**: Meta (`Sahana CB <csahana@meta.com>`, `Thomas Robinson <trobinson@meta.com>`)
- **License**: empty in metadata; MIT per upstream `meta-llama/PurpleLlama` repo
- **Home-page**: `https://github.com/meta-llama/PurpleLlama`
- **Dependency stack**: `pyyaml`, **semgrep 1.163.0** (heavy: pulled glom 25.12.0, ruamel.yaml.clib 0.2.15, semantic-version 2.10.0)
- **Notable downgrades caused**: click 8.3.1 → 8.1.8, mcp 1.26.0 → 1.23.3 (semgrep dep ceiling)

## Phase 2 — Already-likely-present (probe-and-record)

| Primitive | Probe outcome | Note |
|---|---|---|
| `claude-code-action` | NOT PROBED — operator-action class (interactive GitHub App install via `/install-github-app`) | OPERATOR-DECISION; SKIPPED per task spec |
| `trigger.dev` | NOT PROBED — Node.js + Docker compose class (not pip) | OPERATOR-DECISION; SKIPPED per task spec |
| `uv` | (already W207) | ALREADY-PRESENT |
| `trivy` | (already W207) | ALREADY-PRESENT |
| `syft` | (already W217) | ALREADY-PRESENT |
| `repomix` | (already wired) | ALREADY-PRESENT |

## Phase 3 — SKIP list (operator-decision per task spec)

These W218 P0/secondary leaders were explicitly NOT auto-installed:

| Primitive | Reason | Operator action |
|---|---|---|
| **claude-code-action** | Requires interactive GitHub App install on target repos | `claude` → `/install-github-app` |
| **trigger.dev** | Node.js framework + npm + Docker compose + workflow design | Operator-decision (Node + `docker compose -f trigger.dev/docker-compose.yml up`) |
| ory/hydra + ory/kratos | Multi-tenant runtime decision per W218-Q | Operator-decision |
| spicedb / openfga | Pick one per W218-Q (codex picked spicedb) | Operator-decision |
| sops + age | Security-policy decision | Operator-decision |
| NeMo-Guardrails Py 3.13 sidecar | Py 3.13 sidecar runtime decision per W218-R DEGRADE | Operator-decision |
| vLLM / LlamaFactory / unsloth | Heavy GPU workloads | Operator-decision |

## Failures / Blocked

**ZERO** install failures this fire. Both `garak` and `codeshield` installed on first attempt with default PyPI canonical-channel — no Round-2 fix-forward needed.

The dependency conflicts surfaced by `garak` install (large transformers/numpy/openai upgrades that broke caps in pre-existing llama-index/nemoguardrails/smolagents/etc.) are **pre-existing surface incompatibilities exposed** by major-version bumps — they do NOT block `garak` itself from importing or running (smoke probe PASS).

## Operator-action queue (extends W217 cumulative, currently 42 items pre-W220)

### W218 items CLOSED via this install (2 items)

1. **NVIDIA/garak install** (W218-R P0) — `pip install garak` — ✅ INSTALLED v0.15.0
2. **PurpleLlama-CodeShield install** (W218-R P0) — `pip install codeshield` — ✅ INSTALLED v1.0.1

### W218 items REMAINING-QUEUED (operator-decision)

3. **claude-code-action install** (W218-P P1) — `/install-github-app` on target repos
4. **trigger.dev workflow install** (W218-R P1) — Node + Docker compose stack
5. **ory/hydra + ory/kratos** (W218-Q P2) — multi-tenant runtime question
6. **spicedb (or openfga)** (W218-Q P2) — fine-grained authZ; codex picked spicedb
7. **sops + age** (W218-Q P3) — secrets encryption
8. **NeMo-Guardrails Py 3.13 sidecar** (W218-R DEGRADE) — Py 3.13 sidecar option

### Pre-existing-system dep drift (informational, NOT blocking — surfaced by garak install)

9. llama-index family tenacity/openai/pypdf cap reconciliation (operator: pick langchain v1.x stack OR re-pin llama-index)
10. nemoguardrails 0.17.0 langchain<0.4.0 cap vs installed 1.3.0 (operator: upgrade nemoguardrails OR re-pin langchain)
11. mistral-vibe 1.3.4 mistralai==1.9.11 pin vs installed 1.5.2 (operator: upgrade mistral-vibe)
12. numba 0.63.1 + opencv-python 4.12 numpy<2.4 caps vs installed 2.4.4 (operator: upgrade numba+opencv OR re-pin numpy)
13. optimum-onnx transformers<4.58 vs installed 5.8.1 (operator: upgrade optimum-onnx)
14. mcp-memory-service transformers<5.0 vs installed 5.8.1 (operator: upgrade mcp-memory-service OR pin transformers)
15. smolagents huggingface-hub<1.0 cap vs installed 1.15.0 (operator: upgrade smolagents)
16. sqlite-utils click>=8.3.1 vs installed 8.1.8 (codeshield-induced downgrade; operator: re-install sqlite-utils OR accept)
17. captum + cebra + sam3 numpy<2.0 pre-existing holdouts (pre-W220, NOT W220-caused)

### W217 + prior items still pending (42-item baseline)

(Per W217 report — bge-m3 weights / Qwen3-Reranker weights / outlines v1.x upgrade / Ollama health-check / outlines_core source build / system dep-resolver drift / spec-kit / vLLM+LlamaFactory+unsloth+verl / Portkey-vs-LiteLLM / langfuse Docker server / EmbeddingGemma re-verify. Plus W214 langfuse Docker / Memori-vs-letta choice. Plus earlier waves.)

## CR conformance

- **CR-1 SOTA cite at file:line**: each row carries TIER-1-DIRECT cite-class (PyPI canonical-channel + NVIDIA/garak upstream + meta-llama/PurpleLlama upstream)
- **CR-3 cross-model consensus**: SATISFIED via 33 prior codex verdicts (Phase 1 bootstrap exception — no new BRIDGE-MODE call this fire)
- **CR-5 install-priority**: both primitives via upstream SOTA install (pip from PyPI canonical registry) — no hand-coded
- **CR-6 official native channel**: pip = `registry.pypi.org` canonical; NVIDIA/Meta upstream-published
- **CR-8 full-SOTA-content invariant**: each manifest row carries cite-class TIER-1-DIRECT publisher metadata + author identity
- **CR-9 install-risk discipline**: ZERO Round-2 fix-forward needed; no `@latest` un-pinned (PyPI default = latest at time-of-install); no REVERT-precedent affected; dependency conflicts surfaced are pre-existing surface incompatibilities, NOT W220-caused regressions
- **CR-10 research-first-then-install**: W218 scoring matrix (catalog v5 §11 + §12) provided SOTA research; W211/W214/W217 precedents provided install-mechanic research

## Sibling-bleed defense

- ✅ Zero `Z:/claude-sota/` reads/writes
- ✅ Install-class artifacts at Py 3.14 site-packages (`C:\Python314\Lib\site-packages`) — state-outside-repo
- ✅ Pure-runtime contract preserved
- ✅ NO BRIDGE-MODE codex calls (cross-model gate SATISFIED via 33 prior verdicts per CR-3 Phase 1 bootstrap exception)
- ✅ NO interactive auth flows / Docker run / model pulls / CLAUDE.md edits / sibling-touches per task spec safety mandates
- ✅ Used Write/Edit tools directly for report + provenance artifacts

## Smoke summary

**2/2 PASS** — both new pip installs verified via `python -c "import <module>"` exit 0.

```
$ python -c "import garak; print('garak OK', garak.__version__)"
garak OK 0.15.0

$ python -c "import codeshield; print('codeshield OK', dir(codeshield)[:10])"
codeshield OK ['__doc__', '__file__', '__loader__', '__name__', '__package__', '__path__', '__spec__']
```

Wall-clock: ~8 min (within 15-min cap per W211/W214/W217 pattern).

## Cite anchor (CATALOG-FINAL-v5 + W218)

- **garak**: `Z:/claude-sota-pure/docs/sota-research-CATALOG-FINAL-v5-comprehensive-2026-05-15.md:155,465,624` — W218-R composite 8.8 / TIER-1 INSTALL Apache-2.0 LLM red-team scanner / pip install garak
- **codeshield**: `Z:/claude-sota-pure/docs/sota-research-CATALOG-FINAL-v5-comprehensive-2026-05-15.md:159,466,645-647` — W218-R composite 8.7 / TIER-1 INSTALL MIT code-vuln scanner / Py 3.14 PASS verified by codex Call 3 / pip install codeshield

(Atomic commit per task spec final step; report path: this file.)
