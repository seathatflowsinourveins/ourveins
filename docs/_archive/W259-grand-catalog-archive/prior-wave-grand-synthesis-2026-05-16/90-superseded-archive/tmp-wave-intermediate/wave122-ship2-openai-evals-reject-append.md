
---

## Wave 122 Ship 2 — openai/evals → REJECT-FOR-FIT (Probe-7 demand-absence; Mia OVER #54)

**Date**: 2026-05-09
**Trigger**: Wave 121 Ship 2 (DeepEval) provenance closure left a "Add openai/evals integration" line in `evals/README.md` "Future work" — natural-next-ship inference. THIS ship probes the demand-evidence BEFORE installing.
**Outcome**: NO INSTALL (Mia OVER catch on operator's own ship-queue propagation)

### License probe (verified — license is fine; demand is the blocker)

```
$ curl -sS https://api.github.com/repos/openai/evals/license
{"license": {"name": "Other", "spdx_id": "NOASSERTION"}, ...}

$ curl -sSL https://raw.githubusercontent.com/openai/evals/main/LICENSE.md | head -5
MIT License
Copyright (c) 2023 OpenAI
Permission is hereby granted, free of charge, to any person obtaining a copy ...
```

GitHub auto-classifier returned `NOASSERTION` because LICENSE.md contains MIT for code + dataset-specific licenses for embedded eval datasets (Open Data Commons / CC0 / etc per `huggingface.co/datasets/c4` + `oscar` + `openwebtext` + Wikipedia). The CODE is MIT, which is permissive ✓. License is NOT the blocker.

### PyPI canonical metadata

```
$ python -c "import json; d=json.load(open('tmp/evals-pypi.json')); ..."
name: evals
latest: 3.0.1.post1
requires_python: >=3.9
project_urls: {'repository': 'https://github.com/openai/evals'}
```

### Probe DAG verdict

| Probe | Status | Evidence |
|---|:---:|---|
| P1 count-OVER | ✅ PASS | openai/evals on GitHub (TIER-1 OFFICIAL openai org) |
| P2 SDK-vs-CLI | ✅ PASS | Python package + CLI; works in eee venv |
| P3 architectural-API | ✅ PASS | pytest-compatible eval registry |
| P4 plugin-namespace | ✅ PASS | not in 5 enabled plugin caches |
| P5 mode-harness-shape | ✅ PASS | Python framework, fits eee venv |
| P6 LICENSE/registry | ✅ PASS | MIT code + dataset-specific (permissive ✓) |
| **P7 demand-absence** | ❌ **FAIL** | **No eee workflow consumes openai/evals registry** |

### P7 demand-absence detail

eee just shipped Wave 121 Ship 2 DeepEval scaffold (1 fire ago). Operator usage of evals/ is currently:
- `pytest evals/deepeval/test_smoke.py::test_deepeval_import_smoke` — runs only because Mia probed it; not on routine cadence
- `promptfoo eval -c evals/promptfooconfig.yaml` — never operator-run since Wave 119 Ship 5 scaffold landed
- No PostCommit gate, no CI/CD eval gate, no eval-driven-development discipline yet

**Operational reality**: eee has 2 eval scaffolds (promptfoo + DeepEval) that the operator hasn't routinely run. Adding a 3rd (openai/evals) before either of the existing two has operator usage = adding more uncovered scaffold. Per `kiss-dry-yagni.md` Must-Never #4 (no duplicate functionality) + `agent-harness-fit-verification.md` Probe-7 demand-absence: REJECT-FOR-FIT.

### Comparison with Wave 121 Ship 1 verdict (corrected per Mia #53 Inspect AI)

Same shape as Inspect AI:
- Inspect AI 2K★ MIT (UK AISI safety eval) — REJECT-FOR-FIT P7 (eee has no model-deployment workflow consuming safety verdicts)
- openai/evals MIT (enterprise eval registry) — REJECT-FOR-FIT P7 (eee has no routine eval workflow consuming eval-registry primitives)

Both are LICENSE-OK + UPSTREAM-OK + ARCHITECTURE-OK. Both fail P7 demand-absence because eee's eval-driven-development discipline is in scaffold-only state. Promotion to ADOPT-NOW only when operator demonstrates routine eval usage.

### Re-evaluate trigger (forward-only)

Re-open the openai/evals adoption question when ALL of:
1. Operator has invoked `pytest evals/deepeval/` OR `promptfoo eval` ≥3 times in the last 30 days (= routine usage)
2. A specific eval from the openai/evals registry (e.g., MMLU / TruthfulQA / GSM8K) is named as required for an eee workflow
3. eval-driven-development is in `kiss-dry-yagni.md` n=2+ pattern (i.e. discipline is real, not aspirational)

### Files changed: 1 edit + 1 prov entry

- `evals/README.md` — flip "Add openai/evals integration" line from PENDING to **REJECT-FOR-FIT** with cite-trail (-2 +5 LOC delta)
- `docs/install-provenance.md` — this entry (+~70 LOC append)

### CR conformance

- CR-1: TIER-1-DIRECT to GitHub API license probe + PyPI canonical metadata + LICENSE.md verbatim
- CR-3: cross-model gate via mechanical-mirror exception (REJECT verdict via Probe DAG; no codex T1 fan-out for HONEST-NON-FINDING per `agent-harness-fit-verification.md` FM-09 line 116)
- CR-5: NO install (REJECT closes the install-decision question)
- CR-6: live PyPI + GitHub API probe at 2026-05-09 12:35ish EDT
- CR-8: ADAPTED-FROM-SOTA — Probe DAG + P7 demand-absence verbatim
- CR-9: ZERO-RISK no install action
- CR-10: research-first — Probe DAG IS the research; result IS the answer
- CR-11: corrected operating mode — token-efficiency focus; mechanical Probe DAG verdict; no over-fan-out

### Mia OVER ladder Wave 97-122

n=53 → **n=54** (Mia pre-apply caught my own ship-queue propagation OVER — the "Future work" line in evals/README.md was treated as ADOPT-NOW signal when it was actually an UNVERIFIED candidate; Probe-7 P7 demand-absence test refuted)

### Cumulative

- Wave 122 SHIP-122-E (codex 0.130.0): committed 4930c2d
- Wave 122 Ship 2 (THIS): openai/evals REJECT-FOR-FIT; 1 edit + 1 prov entry
- **Total: 18 ship-class deliverables in session arc**

### Forward-ref / next ship

- Operator-action: actually RUN eval scaffolds at least once to prove discipline real
- Wave 122 P0 close-the-loop (~1030 LOC; Plan agent C synthesis): codex Tier-1a hooks + INSTALLED-AMBER + STAGED + fm17d schema — separate ship per ONE-LOGICAL-UNIT-PER-FIRE
- Mia ladder discipline pattern n=54 across 25 fires: ~1 OVER catch per 2 fires; pre-apply discipline working

