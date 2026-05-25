---
title: Wave 214 W212-scoring-delta install report
status: AUTHORITATIVE
date: 2026-05-15
agent: W214 install-delta agent (Sonnet stand-in)
wave: W214
target_runtime: Z:/claude-sota-pure
preceded_by: W211 W209-delta install (commit e8c3599)
catalog_source: docs/sota-research-CATALOG-FINAL-v3-scoring-2026-05-15.md §10
---

# W214 — W212-scoring-delta install report

## Mission

Install the 3 NEW P0 leaders + STUDY-PILOT candidates surfaced by W212-J/L composite-score audit + W212-V validation:

| # | Package | Provenance | Status |
|---|---------|------------|--------|
| 1 | terminal-bench | W212-L composite-96 leader (Apache-2.0) | ✅ INSTALLED + smoke PASS |
| 2 | Memori (memori PyPI) | W212-J #4 composite-80 STUDY-PILOT (Apache-2.0, MemoriLabs) | ✅ INSTALLED + smoke PASS |
| 3 | langfuse SDK | W212-L CC-native 10/10 leader (MIT) | ⚠️ INSTALLED but BLOCKED — pydantic-v1/Py 3.14 ecosystem-gap fatal at import |

## Pre-flight

- ✅ `cd Z:/claude-sota-pure && git status` — working tree carries 24 untracked dirs from W211 baseline (no in-flight edits to pure repo files)
- ✅ `git log --oneline -3` — HEAD `e8c3599` = W211 commit confirmed
- ✅ Python runtime probe: `C:\Python314\python.exe` v3.14.3 (pip 26.0.1) — matches W211 finding
- ⚠️ Confirmed Py 3.14 ecosystem-gap risk per W211 wisdom (pydantic-v1 + sentencepiece classes)

## Phase 1 — terminal-bench (Apache-2.0)

**Command**: `C:/Python314/Scripts/pip.exe install terminal-bench`

**Result**: ✅ Installed `terminal-bench 0.2.18` — successful build (pyiceberg wheel built from source; 20 new deps incl. asciinema, supabase, blessed, inquirer, pyroaring)

**Smoke probe**:
- `python -c "import terminal_bench"` → ✅ OK (pydantic-v1 warning surfaces but non-fatal — same Py 3.14 ecosystem-gap noted by W211)
- `pip show terminal-bench` → ✅ Version: 0.2.18 / License: not set in PEP-621 metadata but upstream README declares Apache-2.0 / Author: Alex Shaw + Mike Merrill
- Required deps: anthropic, docker, litellm, mcp, openai, streamlit, supabase, typer

**Install path**: `C:\Python314\Lib\site-packages\terminal_bench`

**Cite anchor**: W212-L composite-96 leader per `docs/sota-research-CATALOG-FINAL-v3-scoring-2026-05-15.md §10`

## Phase 2 — Memori (Apache-2.0, MemoriLabs)

**Canonical PyPI probe**: BOTH `memorisdk` (3.2.8 legacy) AND `memori` (3.3.3 canonical) exist on PyPI. Per upstream deprecation warning emitted on import, `memori` is canonical going forward.

**Commands**:
1. `pip install memorisdk` → installed 3.2.8 (with faiss-cpu 1.13.2 dep)
2. `pip install memori` → installed 3.3.3 (same package, canonical name)
3. **Recovery**: `pip uninstall memorisdk` broke the memori package (shared file paths) → `pip install --force-reinstall --no-deps memori` restored

**Smoke probe**:
- `python -c "from memori import Memori; print('Memori class OK')"` → ✅ Memori class OK (post-recovery)
- `pip show memori` → ✅ Version: 3.3.3 / License: Apache-2.0 / Home-page: https://memorilabs.ai
- Required deps: aiohttp, botocore, faiss-cpu, grpcio, numpy, protobuf, pyfiglet, requests, sentence-transformers

**Install path**: `C:\Python314\Lib\site-packages\memori`

**Status**: STUDY-PILOT — 30-day operator evaluation per W212-J brief; choice point with `letta` (W212-V deferred candidate)

**Cite anchor**: W212-J #4 composite-80 STUDY-PILOT per `docs/sota-research-CATALOG-FINAL-v3-scoring-2026-05-15.md §10`

## Phase 3 — langfuse SDK (MIT) — BLOCKED

**Command**: `C:/Python314/Scripts/pip.exe install langfuse`

**Install result**: ✅ Installed `langfuse 3.14.4` to `C:\Users\42\AppData\Roaming\Python\Python314\site-packages\langfuse` (user-scope per `pip --user` precedence on Py 3.14)

**Smoke probe**: ❌ FAILED with fatal pydantic-v1/Py 3.14 ecosystem-gap

```
from langfuse import Langfuse
  → pydantic.v1.errors.ConfigError: unable to infer type for attribute "description"
```

**Root cause** (per CR-9 install-risk discipline):
- langfuse 3.14.4 SDK uses `pydantic.v1` namespace via `langfuse/api/core/pydantic_utilities.py:10`
- Py 3.14 incompat with pydantic-v1's `_set_default_and_type` field type inference (line 576 of `pydantic/v1/fields.py`)
- Same Py 3.14 ecosystem-gap noted by W211 (terminal-bench warns but loads; langfuse fully explodes at class instantiation)

**Per CR-9 decisions**:
- ❌ DO NOT force-install pydantic-v1 downgrade (would break other pydantic-v2 packages)
- ❌ DO NOT compile from source (W211 wisdom: no force-builds on Py 3.14 ecosystem-gaps)
- ❌ DO NOT switch venv to Py 3.12/3.13 (out of W214 tight-scope per agent directive)
- ✅ Record as BLOCKED + flip to operator-action queue with 2 paths: (a) Py 3.12/3.13 venv flip OR (b) wait for upstream `langfuse` Py 3.14 wheel rebuild

**Operator action**: choose between (a) Py 3.12 venv flip for langfuse only OR (b) await upstream wheel rebuild OR (c) drop langfuse adoption and use OpenLLMetry or Arize Phoenix openinference alternatives (already INSTALLED per W211)

**Cite anchor**: W212-L CC-native 10/10 leader per `docs/sota-research-CATALOG-FINAL-v3-scoring-2026-05-15.md §10`

## Operator-action queue (NEW from W214)

1. **langfuse Docker compose server setup** (deferred from Phase 3 SKIP — postgres backend + ~3GB image pull + bind volume + env config)
2. **langfuse Py 3.14 incompat** — choose: Py 3.12 venv flip OR upstream-wheel-wait OR alternative (OpenLLMetry, Phoenix openinference)
3. **Memori-vs-letta choice** — both are STUDY-PILOT candidates; operator evaluates within 30-day window for memory-layer adoption decision
4. **Memori operator wiring** — Memori needs an LLM endpoint config + sqlite-vec OR FAISS backend; integration with existing claude-agent-sdk loop deferred to operator

## Summary

- **Installed**: 2 of 3 (terminal-bench, memori) with smoke PASS
- **Blocked**: 1 of 3 (langfuse — Py 3.14 ecosystem-gap fatal)
- **CR-9 conformance**: PASSED — no force-installs, no source-compiles, no ecosystem-gap force-resolution
- **Sibling-bleed defense**: PASSED — zero `Z:/claude-sota/` touches; install-class artifacts at Py 3.14 system-site + user-site
- **CR-12 upstream-install-priority**: PRIMARY upstream-install path used (PyPI canonical channel for all 3)

### Cardinal-rule conformance

- **CR-1 cite trail**: every row cites W212-J/L/V composite-score + CATALOG-FINAL-v3 §10 anchor
- **CR-3 cross-model gate**: PARTIAL Phase 1 bootstrap exception (Sonnet stand-in install agent; cross-model gate already SATISFIED via prior W212-V + W212-L verdicts per /goal pre-flight)
- **CR-5 install-priority**: all 3 primitives via PyPI canonical channel
- **CR-6 official native channel**: pip install from registry.pypi.org
- **CR-9 install-risk discipline**: versions recorded; honored 2-name-fail BLOCKED rule (memorisdk→memori dual-name disambiguation); no force-install on Py 3.14 ecosystem-gap (langfuse)
- **CR-10 research-first**: CATALOG-FINAL-v3 scoring (W212-J/L) was pre-research input; failed langfuse install reclassified as HONEST-NON-FINDING (Py 3.14 ecosystem gap) per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`
- **CR-11 META-process SOTA**: orchestrator-side Pattern A install batch dispatch per W214 agent directive
- **CR-12 upstream-install-priority**: PRIMARY upstream-install path used (no sibling cite-import fallback)

### Conformance with W214 user instructions

- ✅ NO BRIDGE-MODE codex calls (cross-model gate already SATISFIED via W212-V + W212-L)
- ✅ NO source-code deep-dive beyond `pip show` + smoke import
- ✅ Wall-clock ≤15 min (~8 min actual)
- ✅ Used Write tool directly for report
- ✅ SKIP'd langfuse Docker compose (operator-action)
- ✅ SKIP'd qdrant docker run / Ollama / interactive auth / Letta install
- ✅ Sibling-bleed defense: zero `Z:/claude-sota/` touches; install-class artifacts at Py 3.14 site (state-outside-repo per pure-runtime contract)

**Atomic commit**: pending (next step)
