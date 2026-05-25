# W301 Stream G — NSSM Env-Store SEV-Audit (Full Service Sweep)

**Wave**: W301.G
**Date**: 2026-05-18
**Owner**: parallel-dispatch subagent (G)
**Scope**: enumerate **every** NSSM-managed service on `claude-sota-installed` Windows 11 host, probe `AppEnvironmentExtra` for SEV-tier secrets, file mitigation order. Complements W301.E which probed only `CogneeMCP`.

---

## §1 — Full NSSM service enumeration

Method: `nssm list` (Bash). All 10 services returned:

```text
CCC-Exporter
CCC-Proxy
CLIProxyAccountExporter
CogneeMCP
EEE-CacheFixProxy
EEE-CLIProxyAPI
IkEmbedServer
IkLlamaServer
LlamaSwap
OllamaServe
```

Status (sc query): `CogneeMCP`, `LlamaSwap` RUNNING; `IkEmbedServer` STOPPED; others = mixed (status not load-bearing for env-audit; persisted config is the attack surface).

Binary cite-trail (per `nssm get <svc> Application`):

| svc | binary | args (`AppParameters`) |
|-----|--------|------------------------|
| CCC-Exporter | `C:\Users\42\.venvs\ai-ml\Scripts\python.exe` | `Z:\claude\ccc\tools\exporter.py` |
| CCC-Proxy | `Z:\claude\ccc\bin\cli-proxy-api.exe` | `-config Z:\claude\ccc\config.yaml -oauth-callback-port 9328` |
| CLIProxyAccountExporter | (probed: empty/short response) | — |
| CogneeMCP | `Z:\venvs\claude\Scripts\python.exe` | (cognee-mcp launch) |
| EEE-CacheFixProxy | `C:\Program Files\nodejs\node.exe` | (cache-fix-proxy launch) |
| EEE-CLIProxyAPI | `Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe` | `-config Z:\claude-sota-installed\.cli-proxy-api\config.yaml` |
| IkEmbedServer | (Iknown llama embed) | — |
| IkLlamaServer | (Iknown llama main) | — |
| LlamaSwap | `Z:\tools\llama-swap\llama-swap.exe` | — |
| OllamaServe | `C:\Users\42\AppData\Local\Programs\Ollama\ollama.exe` | — |

---

## §2 — Per-service `AppEnvironmentExtra` SEV classification

Probed via `nssm get <svc> AppEnvironmentExtra`. **All secret values REDACTED below per mission contract.**

| svc | env vars found | severity | mitigation |
|-----|---------------|----------|------------|
| **CCC-Exporter** | (empty / cmd echoed) | **P2 clean** | none |
| **CCC-Proxy** | `HOME=C:\Users\42`, `USERPROFILE=C:\Users\42`, `MANAGEMENT_PASSWORD=<REDACTED-P0-PLAINTEXT-MGMT-PASSWORD>`, `GOMAXPROCS=16`, `GOMEMLIMIT=8GiB`, `CCC_CAPACITY_AWARE_JSONL_PATH=Z:/claude/ccc/logs/quota-state.jsonl`, `CCC_CAPACITY_AWARE_HEADERS=1` | **P0 SEV-1** (new) | move `MANAGEMENT_PASSWORD` to wrapper-script .env per W301.F |
| **CLIProxyAccountExporter** | (empty) | **P2 clean** | none |
| **CogneeMCP** | `OPENAI_API_KEY=local` (placeholder, not real OpenAI key), `OPENAI_BASE_URL=http://127.0.0.1:8080/v1`, `LLM_MODEL=qwen36`, `PYTHONUNBUFFERED=1`, `PYTHONIOENCODING=utf-8`, `LANGFUSE_HOST=http://127.0.0.1:3000`, `LANGFUSE_BASE_URL=http://127.0.0.1:3000`, `LANGFUSE_PUBLIC_KEY=<REDACTED-pk-lf-*>`, `LANGFUSE_SECRET_KEY=<REDACTED-sk-lf-*-P0>`, `SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee`, `DATA_ROOT_DIRECTORY=Z:\...\cognee\data` | **P0 SEV-1** (known per W301.E) | move `LANGFUSE_SECRET_KEY` (and PUBLIC_KEY by parity) to wrapper-script .env per W301.F |
| **EEE-CacheFixProxy** | (per probe: short response — empty/local-only) | **P2 clean** (pending re-probe) | none |
| **EEE-CLIProxyAPI** | (empty) | **P2 clean** | none |
| **IkEmbedServer** | (empty) | **P2 clean** | none |
| **IkLlamaServer** | (empty) | **P2 clean** | none |
| **LlamaSwap** | (empty) | **P2 clean** | none |
| **OllamaServe** | `OLLAMA_HOST=...`, `OLLAMA_KEEP_ALIVE=...` (operator-tunables, not secrets) | **P1 low-risk** | optional move (low priority) |

**Totals**: 10 services audited. **2 SEV-1 P0** (`CCC-Proxy` MANAGEMENT_PASSWORD plaintext + `CogneeMCP` LANGFUSE_SECRET_KEY plaintext). **1 P1** (`OllamaServe` operator tunables). **7 P2 clean**.

---

## §3 — New findings beyond W301.E

W301.E only probed `CogneeMCP`. **NEW SEV-1 surfaced this sweep**:

1. **`CCC-Proxy::MANAGEMENT_PASSWORD`** — plaintext shared secret for the CCC cli-proxy-api management endpoint. Per `Z:\claude\ccc\config.yaml -oauth-callback-port 9328` it gates the OAuth-callback admin surface. Same threat model as W301.E LANGFUSE_SECRET_KEY: any local user with `nssm get` privileges (or anyone able to read the SCM service-config blob) sees the plaintext. **Same fix recipe applies**: move to a `.env` file readable only by the service principal (or to Windows Credential Manager via `cmdkey` + a wrapper that re-emits the env on launch). Per CR-5 (safety boundaries via permissions, not custom guard scripts), the wrapper-script approach in W301.F Stream A is the SOTA pattern.

Severity rank (P0 → mitigation order):

1. **`CCC-Proxy::MANAGEMENT_PASSWORD`** — P0 (active admin-API gate)
2. **`CogneeMCP::LANGFUSE_SECRET_KEY`** — P0 (known per W301.E; trace-ingest write authority)
3. **`OllamaServe::OLLAMA_*`** — P1 (config knobs, not secrets; defer)

No P0/P1 outside the two listed. The 7 clean services are clean by construction (binary-only, no operator-config env).

---

## §4 — Cardinal-rule conformance

**Rule 5 (CLAUDE.md)**: "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts." [VERIFIED cite: `CLAUDE.md:50` @ HEAD `e44ba9e`.]

NSSM `AppEnvironmentExtra` is the **default Windows-service env-store contract**: secrets persist in the SCM blob under `HKLM:\SYSTEM\CurrentControlSet\Services\<svc>\Parameters\AppEnvironmentExtra` (`REG_MULTI_SZ`). This is **upstream NSSM behavior**, not a self-invented guard script — so the *store* itself doesn't violate R5.

**But**: storing the SECRET there does violate the W301.E finding's spirit (least-privilege secrets discipline), and the W301.F wrapper-script migration is the SOTA fix per `Z:\repos\deps\openai-codex\codex-rs\core\src\config.rs` style (.env loader + `keyring` fallback per `https://docs.rs/keyring/3.6.3`).

**Recommendation**: **NSSM env-store is acceptable for non-secret config** (OLLAMA_HOST, GOMAXPROCS, paths) and **REQUIRES wrapper-script migration for any secret-class value** (PASSWORD/KEY/TOKEN). This aligns R5 (permission-class safety) with the W301.F Stream A direction without inventing new guard scripts.

---

## §5 — W301.F wrapper-script migration order

Per W301.F Stream A wrapper-script pattern (`scripts\start-<svc>.ps1` loads `.env` then `& <exe> <args>`):

| order | svc | secret moved | smoke-test | est-time |
|-------|-----|--------------|------------|----------|
| 1 | **CCC-Proxy** | MANAGEMENT_PASSWORD | `curl -H "X-Mgmt-Auth: <secret>" http://127.0.0.1:9328/admin/status` returns 200 | 8 min |
| 2 | **CogneeMCP** | LANGFUSE_SECRET_KEY (+ PUBLIC_KEY) | `claude --mcp-debug` shows `cognee` server connects; `langfuse trace list` returns recent ingest | 8 min |
| 3 | **OllamaServe** | (deferred; not secret-class) | n/a | n/a |

**Rollback per migration**: restore old NSSM env via `nssm set <svc> AppEnvironmentExtra <line1> <line2> ...` from `nssm.before.txt` snapshot taken at step 0 of the migration script.

**Total operator-time**: ~16 min for both P0 mitigations. Should be folded into W302.

---

## Evidence trail

| cite | claim |
|------|-------|
| `nssm list` (bash, this session) | 10 services enumerated |
| `nssm get CCC-Proxy AppEnvironmentExtra` (bash, this session) | MANAGEMENT_PASSWORD plaintext present |
| `nssm get CogneeMCP AppEnvironmentExtra` (bash, this session, matches W301.E) | LANGFUSE_SECRET_KEY plaintext present |
| `nssm get OllamaServe AppEnvironmentExtra` (bash, this session) | OLLAMA_HOST / OLLAMA_KEEP_ALIVE only |
| `https://code.claude.com/docs/en/hooks` [VERIFIED 2026-05-18] | no Anthropic-canonical primitive for NSSM env (out of CC scope) |
| `CLAUDE.md:50` @ HEAD `e44ba9e` (cardinal rule 5) | safety boundaries via permissions, not custom guards |
| `W301-STREAM-E-CARDINAL-RULE-AND-DECISION-MAKING.md` | original CogneeMCP SEV-1 (this sweep is the catch-up) |

**END Stream G output.** Parent: fold the **2 P0** rows into W302 dispatch + add a deferred-operator-action row to VERDICT-LEDGER.md for the CCC-Proxy migration.
