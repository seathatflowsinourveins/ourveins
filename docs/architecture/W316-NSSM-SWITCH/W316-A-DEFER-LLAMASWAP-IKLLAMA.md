# W316-A DEFER — LlamaSwap + IkLlamaServer NSSM Migration

**Date**: 2026-05-19
**Stream**: W316-A NSSM-SWITCH (cognee-scoped, RISK-BOUNDED)
**Scope statement**: This stream applied to cognee :8000 ONLY. LlamaSwap :8090 + IkLlamaServer :8080 are EXPLICITLY DEFERRED to W317 per operator mandate (CRITICAL local-model serving services — mid-session restart could kill GPU workflows).

## Services Deferred (W317-Stream-? carry-forward)

### 1. LlamaSwap :8090

- **NSSM service name**: `LlamaSwap` (newly discovered W314-r2 δ — flagged in `docs/architecture/W314-SERVICES-LOW-QUALITY/*.md` as undocumented service)
- **Function**: Embedding endpoint for cognee (`EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1`, model `qwen3-embed-0.6b`, 1024-dim)
- **Why-deferred**: CLAUDE.md AI-r2-5 still open (LlamaSwap not yet documented in tracked state); migration without prior docs runs CR-4 violation risk (project-behavior in CLAUDE.md before settings/runtime changes)
- **W317 prerequisite**: Land AI-r2-5 LlamaSwap docs in CLAUDE.md Pointers section + Status appendix FIRST; THEN smoke-probe servy-based replacement

### 2. IkLlamaServer :8080

- **NSSM service name**: `IkLlamaServer` (W310-A audit canonical; ikawrakow/ik_llama.cpp deep-dive in `docs/architecture/IK-LLAMA-FMOE-BUILD-2026-05-17.md`)
- **Function**: LLM endpoint (`OPENAI_BASE_URL=http://127.0.0.1:8080/v1`, model `qwen36`/`qwen3-coder:30b-a3b-q4_K_M`); cognee LLM + hindsight + graphiti share this 35B
- **Stability state**: 6+ min post-W310 RCA fix at commit `00:55`; CUDA crash-loop RESOLVED per W313 `docs/architecture/W313-V7-SHIP-READINESS/W310-CUDA-CRASH-LOOP-RCA.md`
- **Why-deferred**: Stability is FRESH (W313 ship 2026-05-19 00:55); restart-risk window during mid-session is highest for this service; defer until W317 + an operator-confirmed maintenance window
- **W317 prerequisite**: Empirical 7+ day stability proof (post-W310 fix) + operator-explicit "ok to restart IkLlama" greenlight

## Recommended W317 Sequence (LlamaSwap-first per W314-D)

Per `docs/architecture/W314-SOTA-DISCOVERY-AND-REAUDIT/STREAM-D-AELASSAS-SERVY-AUDIT.md` recommendation:

1. **W317-A1** — LlamaSwap docs in CLAUDE.md (close AI-r2-5)
2. **W317-A2** — LlamaSwap servy staged-pilot (lowest blast radius among 3 NSSM services; embedding endpoint failure degrades cognee ingest but doesn't crash interactive session)
3. **W317-A3** — 24h observation post LlamaSwap servy migration; if stable, proceed
4. **W317-B** — IkLlamaServer servy migration (HIGHER risk — 35B LLM shared by 3 consumers; needs maintenance window + operator-greenlight)
5. **W317-C** — cognee servy migration BUT ONLY AFTER: (a) upstream cognee-mcp `packages = ["src"]` namespace bug fixed (vendor-fork or upstream PR), AND (b) W298 SEV-1 plaintext LANGFUSE_SECRET_KEY env-file refactor LANDED

## Prerequisites Inventory (must close before W317)

| ID | Owner | Description | Blocking |
|---|---|---|---|
| AI-r2-5 | W317 docs | LlamaSwap CLAUDE.md docs | LlamaSwap servy migration |
| W298 SEV-1 | W317 ops | Plaintext LANGFUSE_SECRET_KEY in NSSM AppEnvironmentExtra — env-file refactor | cognee servy migration |
| cognee-mcp upstream | W317 vendor-fork | Fix `packages = ["src"]` → `packages = ["cognee_mcp"]` | uvx-stdio path for cognee |
| IkLlama 7d soak | W317 obs | Empirical 7-day stability post-W310 RCA | IkLlama servy migration |

## Why NOT Stage cognee-First This Wave

Operator scoping in mandate was correct: "**Apply to COGNEE :8000 ONLY this wave** (lowest blast radius)" — but empirical smoke-probe revealed cognee uvx-stdio is BLOCKED by upstream packaging bug, AND servy-cognee-first inverts the W314-D LlamaSwap-first risk-sequencing. Net effect: **W316-A correctly applied no-op + DEFER**; LlamaSwap-first ordering preserved for W317.

## Cardinal-Rule Compliance

- **R3 subagents**: scope respected (cognee only this wave); LlamaSwap + IkLlama untouched per operator file-ownership directive.
- **R5 safety**: zero destructive operations on LlamaSwap or IkLlama services this wave; their pre-state remains the W314-r1 baseline (LlamaSwap RUNNING @ :8090, IkLlamaServer RUNNING @ :8080).

## W317 Operator-AI

**AI-W317-NSSM-SWITCH-SEQUENCE**: Execute LlamaSwap-first staged-pilot per W314-D `aelassas/servy v8.4` recommendation; IkLlama second after 7d soak; cognee third ONLY after upstream `cognee-mcp` packaging fix + W298 secrets-vault env-file refactor. Smoke-probe each candidate's uvx-stdio AND servy invocation BEFORE apply — never trust theoretical sca-v7 scores without empirical D-EMP measurement (W316-A precedent: W314-A 20/20 score invalidated by 7/7 probe failures).
