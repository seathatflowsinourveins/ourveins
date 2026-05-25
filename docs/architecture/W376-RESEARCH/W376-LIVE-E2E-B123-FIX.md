# W376 Live E2E — OpenHands runs GPT-5.5 (Tasks 13-14) + CodexCLIProvider B1/B2/B3 fix

**Date:** 2026-05-23 · **Branch:** `goal/W375-openhands-sota` (PR #33) · **Operator-authorized:** "invoke openhand now, with gpt5.5 full e2e"

## Question answered

**Can OpenHands use GPT-5.5? — YES, proven end-to-end (reproduced 3×).** Not via the OpenAI direct API (the env `OPENAI_API_KEY` is rejected: *"Incorrect API key"*), but via the **codex CLI ChatGPT-OAuth path** the runtime already uses: the W375 `CodexCLIProvider` registers a litellm custom provider `codex`, so OpenHands' own `LLM(model="codex/<profile>")` routes **OpenHands → litellm → `codex exec --model gpt-5.5` → GPT-5.5**, $0/token on subscription.

## Live e2e evidence (isolated venv `Z:/venvs/openhands-e2e`, openhands-sdk 1.22.1)

```
=== PHASE 1: OpenHands LLM -> GPT-5.5 via 'codex/t1-light' (FIXED provider, no patches) ===
[OK] codex/t1-light responded in 41.6s: 'OPENHANDS_GPT_E2E_OK' match=True
=== PHASE 2: full OpenHands Agent loop on 'codex/t1-light' ===
[OK] conv.run() in 38.7s. events: ['SystemPromptEvent','MessageEvent','MessageEvent']
   -> agent emitted "OPENHANDS_AGENT_E2E_OK"
=== CLEAN E2E VERDICT (shipped provider, unpatched) === Phase 1: PASS | Phase 2: ran
```

- **Phase 1** — OpenHands `LLM.completion()` returns a GPT-5.5 answer.
- **Phase 2** — the full `Agent` + `Conversation` + `send_message` + `run()` loop runs on GPT-5.5 (`reasoning_output_tokens` in the codex trace confirms the reasoning model).
- Scripts: `tmp/openhands-brainstorm/{oh_e2e_codex.py (host-patched), oh_e2e_clean.py (unpatched shipped provider), codex_spawn_probe.py (raw subprocess diagnostic)}`.

## Three defects the live e2e surfaced (the mocked unit suite missed all three — it never reaches the model backend)

| # | Defect | Severity | Evidence |
|---|--------|----------|----------|
| **B3** | `LITELLM_RESPONSE_SCHEMA` lacked `additionalProperties:false` + `required[]` on object nodes → **`400 invalid_json_schema`** from OpenAI strict structured-output | 🔴 **production-affecting, cross-platform** — every real jury dispatch (`make_jury_llm`→`LLM("codex/deep-review-exec")`) would 400 on any OS | raw `codex exec` returned the 400; with the strict schema → `RC:0 {"choices":[{"message":{"role":"assistant","content":"OK"}}]}` |
| B1 | bare argv `"codex"` not Windows-`CreateProcess`-spawnable (npm ships `codex.cmd`/native `codex.exe`; no PATHEXT lookup) | 🟡 Windows-host-dev only (prod = Linux Docker, `codex` resolves via execvp) | `FileNotFoundError [WinError 2]` |
| B2 | `{CODEX_HOME,PATH}`-only env allowlist strips Windows runtime essentials (SystemRoot/TEMP/ComSpec/…) | 🟡 Windows-host-dev only | native exe failed to start under restricted env |

## Fix (`agents/codex_cli_llm.py` + `tests/test_codex_cli_llm.py`)

- **B3**: strict-valid `LITELLM_RESPONSE_SCHEMA` (`additionalProperties:false` + full `required[]` on all 3 object nodes). Cross-platform correctness fix.
- **B1**: new `_codex_argv_prefix()` — `os.name != "nt"` returns bare `["codex"]` (Linux/Docker **byte-identical**); Windows prefers native `codex.exe` (PATH → npm-tree glob), else routes `codex.cmd` through `cmd.exe`.
- **B2**: Windows-guarded (`os.name == "nt"`) augmentation of the allowlist with **non-secret** runtime vars only — the no-secret-leak invariant (codex-r1) is preserved.
- **Tests**: relaxed the over-strict argv assertion to be launcher-agnostic; added `test_response_schema_is_openai_strict_valid` (recursive guard — would have caught B3) + `test_codex_argv_prefix_resolves_launcher`.

## Verification (verify-before-claim)

- `tests/test_codex_cli_llm.py`: **7/7 PASS** (5 original + 2 new) — `Z:/venvs/claude` pytest 9.0.3.
- Live e2e against the **fixed, unpatched** shipped provider: Phase 1 PASS + Phase 2 ran (above).
- **Codex GPT-5.5 cross-model gate (`model_reasoning_effort=high`): APPROVE @ 0.90** — B1/B2/B3/TESTS all SOUND, `FINDINGS: none`, `LINUX_PROD_UNCHANGED: YES`. Verdict at `tmp/openhands-brainstorm/codex-b123-out.txt`.

## Scope note

Production W375 runs the Temporal worker in Linux Docker, where B1/B2 never applied and B3 is the only defect that would have fired. The Linux/Docker code path is unchanged (all Windows logic is `os.name=="nt"`-guarded; argv prefix is still `["codex"]`, env allowlist unchanged outside the guard). PR #33 merge to `main` remains operator-gated.
