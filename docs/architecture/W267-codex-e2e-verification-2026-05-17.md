## Claim 1: DISPUTED

Over-claim: W264 says, "9/9 layers converged" and "Composite verdict: SHIP" (`docs/architecture/W264-ULTIMATE-SYNTHESIS-2026-05-17.md:25`). Later correction says the honest verdict is "6/9 SHIP-applied + 3/9 SHIP-decided-pending-apply" (`docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md:21`). Live state also contradicts applied convergence: `curl -s :8000/mcp` returned empty/exit 1; `Test-NetConnection 127.0.0.1:8000` failed; `nssm status CogneeMCP` = `SERVICE_PAUSED`.

## Claim 2: DISPUTED

Graphiti and hindsight are wired: `.mcp.json:96-99` and `.hindsight/profiles/claude-code.env:22-25` carry Langfuse keys. Langfuse MCP exists at `.mcp.json:121-129`, with `mcp-server-langfuse/build/index.js` present. Cognee env is configured by `nssm get CogneeMCP AppEnvironmentExtra`, including `LANGFUSE_HOST`, `LANGFUSE_PUBLIC_KEY`, and `LANGFUSE_SECRET_KEY`; however Cognee is paused/unreachable (`SERVICE_PAUSED`, `:8000` TCP false). Wired config is VERIFIED; live cognee producer is DISPUTED.

## Claim 3: VERIFIED

`curl -s http://127.0.0.1:3000/api/public/health` returned `{"status":"OK","version":"3.170.0"}`. Auth with the supplied keys succeeded: authenticated GET to `/api/public/projects` (HTTP Basic via `LANGFUSE_PUBLIC_KEY`/`LANGFUSE_SECRET_KEY` env) returned project `5.17.2026` id `cmpa0h6ux0003o6067jlf4jgd`.

## Claim 4: DISPUTED

CLAUDE.md memory is live (`CLAUDE.md:1-3`), hindsight health is live (`curl -s :9077/health` = `{"status":"healthy","database":"connected"}`), memory MCP is configured (`.mcp.json:52-60`), and graphiti is configured (`.mcp.json:63-99`). Over-claim: five-tier memory includes cognee; live state shows cognee paused/unreachable (`nssm status CogneeMCP` = `SERVICE_PAUSED`; `curl -s :8000/mcp` exit 1).

## Claim 5: DISPUTED

Over-claim: W264 says `:8080` command contains `-ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard --spec-type ngram-mod --fit --fit-margin 1024` (`W264-ULTIMATE-SYNTHESIS-2026-05-17.md:176`). Live health is OK (`curl -s :8080/health` = `{"status":"ok","slots_idle":1,"slots_processing":3}`), but `nssm get IkLlamaServer AppParameters` shows `-cuda fa-offset=0 -ctk q8_0 -ctv q8_0 ... --parallel 4 --no-context-shift`, with no Hadamard, ngram-mod, or `--fit`.

## Claim 6: VERIFIED

`:8082` is healthy (`curl -s :8082/health` = `{"status":"ok","slots_idle":4,"slots_processing":0}`). W264 states live `:8082` is Qwen3-Embedding-4B (`W264-ULTIMATE-SYNTHESIS-2026-05-17.md:40,177`). Llama-swap has new targets: `qwen3-embed-0.6b` (`Z:/tools/llama-swap/config.yaml:63-71`) and `qwen3-reranker-0.6b` (`config.yaml:96-104`).

## Claim 7: VERIFIED

`Z:/models/qwen3-vl-8b` exists with `Qwen3VL-8B-Instruct-Q4_K_M.gguf`, `mmproj-Qwen3VL-8B-Instruct-F16.gguf`, and `mmproj-Qwen3VL-8B-Instruct-Q8_0.gguf`. Llama-swap target references the model and mmproj at `Z:/tools/llama-swap/config.yaml:78-90`.

## Claim 8: VERIFIED

`(Get-ChildItem Z:/claude-sota-installed-repos -Force | Measure-Object).Count` returned `120`.

## Claim 9: VERIFIED

`nvidia-smi --query-gpu=memory.used,memory.free --format=csv` returned `23471 MiB used, 668 MiB free`, about 97% used. W266 already measured saturation risk at `23749 MiB, 24564 MiB, 93 %` and calls near-ceiling VRAM (`W266-codex-2nd-pass-2026-05-17.md:10-12`). No mitigation was observed.

## Claim 10: VERIFIED

`nssm --version` returned `NSSM 2.24-101-g897c7ad 64-bit 2017-04-26`. W265 says NSSM is dead/abandoned and recommends migration (`W265-service-management-sota-2026-05-17.md:11,67-74,101`); W266 says "NSSM dead-upstream ... STANDS" and migration remains pending (`W266-doc-corrections-2026-05-17.md:45-54`).

## Gaps

Required path `.claude/.mcp.json` does not exist; root `.mcp.json` was used. Git status is dirty (`.mcp.json`, `accounts/repos/CLIProxyAPI`, and multiple untracked W265/W266 docs). Cognee is documented as live in `.mcp.json:11`, but live service state is paused/unreachable. The active `:8080` NSSM service does not match W263/W264-tuned flags despite llama-swap config containing those flags (`Z:/tools/llama-swap/config.yaml:29-34`).
