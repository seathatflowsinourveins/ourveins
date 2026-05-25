# evals/deepeval/ — DeepEval scaffold

Wave 121 Ship 2 scaffold. Closes Wave 121 Ship 1 verdict ADOPT-NOW for DeepEval — the eval-framework gap that promptfoo (Wave 119 Ship 5) doesn't fill (different shape: prompt-comparison vs metric-pytest).

## What's here

- `test_smoke.py` — pytest smoke (1 cheap import-only test + 1 LLM-as-judge live test gated by env)

## Cite

- Upstream: `confident-ai/deepeval` @ v4.0.0 Apache-2.0 (PyPI canonical; `https://pypi.org/project/deepeval/`)
- Verified live 2026-05-09: latest=4.0.0, license=Apache-2.0, requires_python=`<4.0,>=3.9`, repo=`https://github.com/confident-ai/deepeval`
- Wave 121 Ship 1 ADOPT-NOW verdict at `docs/install-provenance.md` (commit `c7f1aa6`)

## Operator quickstart

```powershell
# Token-safe default (zero LLM tokens — live test SKIPPED automatically per W134-F22-A fix):
Z:/venvs/claude/Scripts/python.exe -m pytest evals/deepeval/ -v
# Runs only test_deepeval_import_smoke (cheap import check); live test is skipped.

# Run cheap import-only smoke explicitly:
Z:/venvs/claude/Scripts/python.exe -m pytest evals/deepeval/test_smoke.py::test_deepeval_import_smoke -v

# OPT-IN to full live LLM-as-judge eval (spends Anthropic tokens via CPA eee-fleet-key-eval):
$env:DEEPEVAL_ENABLE_LIVE = "1"
Z:/venvs/claude/Scripts/python.exe -m pytest evals/deepeval/ -v
Remove-Item Env:DEEPEVAL_ENABLE_LIVE  # always unset after to avoid future-run token-burn
```

## Cost discipline (W134-F22-A token-safety fix; per kiss-dry-yagni Must-Never #4 + cardinal-rule-9)

- DeepEval invokes an LLM-as-judge for metric scoring — every live test run spends real
  Anthropic tokens via CPA `eee-fleet-key-eval` stratified API key
- **Default behavior (token-safe)**: `pytest evals/deepeval/` SKIPS the live LLM-as-judge
  test unless `DEEPEVAL_ENABLE_LIVE=1` is set explicitly. Accidental `pytest evals/` runs
  do NOT burn tokens.
- **Live eval opt-in**: explicit `$env:DEEPEVAL_ENABLE_LIVE = "1"` required per session/run

**Pre-fix history**: prior scaffold (Wave 121 Ship 2 + Wave 119 Ship 5) used
`DEEPEVAL_SKIP_LIVE` opt-out env var with LIVE-by-default behavior. Fire 19 GPT-5.5
cross-model audit (conf=0.88) identified the inverted cost-guard as a TOKEN-BURN risk
(P1-2). W134-F22-A inverts to `DEEPEVAL_ENABLE_LIVE` opt-in semantics.

## Sister surfaces

- `evals/promptfooconfig.yaml` (Wave 119 Ship 5) — prompt-comparison / regression. **Different shape** from DeepEval. Run both:
  - `promptfoo eval -c evals/promptfooconfig.yaml` → prompt regression
  - `pytest evals/deepeval/` → metric-based per-LLMTestCase eval

## Routing

Both eval surfaces route through CPA fleet (`http://127.0.0.1:8317/v1`) using stratified API key `eee-fleet-key-eval` per `.cli-proxy-api/config.yaml` (4-key class isolation: orchestrator / research / codex-bridge / eval).

Eval traffic is therefore isolated from main-orchestrator traffic — a runaway eval won't displace operator-conversation cache slots.

## CR conformance

- CR-1 cite SOTA primary: TIER-1-DIRECT to PyPI canonical + upstream GitHub URL at HEAD
- CR-3 cross-model gate: scaffold LOC small enough that mechanical-mirror exception applies (Wave 119 Ship 5 promptfoo scaffold = mirror chain context)
- CR-5 install-priority: pip install via PyPI official channel (NOT Z:/repos/deps clone-import)
- CR-6 fresh-from-github: `pip install deepeval@4.0.0` from `https://pypi.org/project/deepeval/` 2026-05-09
- CR-8 full-SOTA-content: ADAPTED-FROM-SOTA — DeepEval canonical pytest+metric pattern from upstream README
- CR-9 install-risk: LOW — single pip install, reversible via `pip uninstall deepeval` + `git rm -rf evals/deepeval/`
- CR-10 research-first: Wave 121 Ship 1 research-synthesis verified ADOPT-NOW BEFORE this install
- CR-11 META-process: corrected operating mode (token-efficiency focus) — no codex T1 fan-out, mechanical-mirror exception path
