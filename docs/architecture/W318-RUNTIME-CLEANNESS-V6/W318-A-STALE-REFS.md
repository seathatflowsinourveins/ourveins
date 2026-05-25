# W318-A — Stale References Audit (2026-05-19)

> Stream A / W318. Audit CLAUDE.md + CLAUDE.local.md + settings.json + .mcp.json + W314-W317 docs for stale upstream SHAs, retired-service citations, closed-but-flagged operator-AIs, and dead config blocks.

## 1. Upstream SHA drift audit

### Cited SHAs in CLAUDE.md vs current upstream HEAD

| Component | Cited SHA | Upstream HEAD | Drift | Severity | Recommendation |
|-----------|-----------|---------------|-------|----------|----------------|
| CCBP (claude-code-best-practice-shan) | `48798ca` (CLAUDE.md L3) | `48798ca` (verified 2026-05-18 23:05 +0500) | **0 commits** | NONE | ZERO DRIFT — content stable |
| CCBP (older citations) | `1386b0e` → `ac0d87d` → `48f2ceb` → `48798ca` | `48798ca` | 4-chain (all chore/badges) | NONE | Citation lineage documented in CLAUDE.md L3-comment per W314-Stream-C |
| superpowers | `f2cbfbe` (2026-05-04) | `f2cbfbe` | **stable** | NONE | No drift; v5.1.0 cited |
| ECC plugin (everything-claude-code) | `aaabe594 → 33ed494a → f17c6e88 → f3cd00625222 → 841beea` (various status lines) | `b62f8075` (2026-05-19 09:16 -0400) | **AT LEAST 1 commit drift** since W315-r2 cite | HIGH | **W316-E AI carry-forward still open** — `/plugin update` to `b62f8075` (newer than W315-r2 `f3cd006`) |
| ECC plugin cache | `v2.0.0-rc.1` | `v2.0.0-rc.1` upstream | **0 drift** | NONE | cache + upstream both 2.0.0-rc.1 |
| AGT (agent-teams) | `08ded5e` (W312-Stream-C) | not re-probed this wave | unknown | LOW | Plugin cache `v1.0.2` matches W312 cite |
| mattpocock skills | `67bce91c80cd` (CLAUDE.md L30 vendor-fork-4) | not re-probed this wave | unknown | LOW | W312-codex-r1 ratified the vendor-fork-4 claim |
| wshobson | `08ded5e` (W312-Stream-C) | not re-probed | unknown | LOW | T2-HOLD per W312 |
| codex plugin | `v1.0.4` (CLAUDE.md L8) | `v1.0.4` upstream cached | **0 drift** | NONE | Plugin native Stop-hook verified at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:26-37` |

**Stale-SHA total**: **1 HIGH** (ECC drifted since W315-r2 → CLAUDE.md L34 cites `f3cd006` but upstream is `b62f8075`); **5 LOW** (older SHAs documented in W315/W314 status lines; no real damage since CLAUDE.md L3 cites the current HEAD).

## 2. Retired-service citations still active

### CLAUDE.local.md L80 (HIGH — operator-blocking)

```
- **Services**: FalkorDB (`:16379`) + Ollama (`:16700` ... ) live for graphiti
  (W263d swapped from `qwen3:8b` ...)
- cognee-mcp at `:8000` (NSSM `CogneeMCP`, W263b).
```

**Status as of 2026-05-19**:
- FalkorDB :16379 → **DOWN** (Connection refused; retired with graphiti per W313 Stream A `5a350d1`)
- Ollama :16700 → **RUNNING** but graphiti is RETIRED so the citation is now stale-by-association ("for graphiti" obsolete)
- cognee-mcp :8000 → still LIVE
- Phoenix :16006 → still RUNNING (per W315-r2-E re-discovery)

**Recommendation**: rewrite CLAUDE.local.md L80 (HIGH; operator action — gitignored file):
```
- **Services**: 7 LIVE — CogneeMCP :8000 (NSSM) · basic-memory :8765/mcp (uvx)
  · IkLlamaServer :8080 (NSSM) · LlamaSwap :8090 (NSSM) · Langfuse :3000 (docker)
  · Phoenix :16006 (docker, idle) · OllamaServe :16700 (NSSM, idle/0-models).
  STOPPED/RETIRED: FalkorDB :16379 (W295) · graphiti (W313 .mcp.json excision)
  · Hindsight :9077 (W316-S6, no replacement).
```

### CLAUDE.local.md L81 (HIGH)

```
- **MCP servers**: wired in `.mcp.json` (project root) — memory, graphiti, github, ...
```

**Status**: graphiti excised in W313 `5a350d1`; memory in `disabledMcpjsonServers` (was, now empty); list mentions servers no longer present.

**Recommendation**: re-list current `.mcp.json` mcpServers keys (live audit).

### CLAUDE.md L35 — already corrected at W315-r2

CLAUDE.md L35 (status W317-S1 line) correctly reads "graphiti **✗ RETIRED**" and notes Phoenix RUNNING per W315-r2-E. **No action needed for CLAUDE.md L35.**

## 3. Closed-but-still-active operator-AI references

### W312-A.6 (Ollama-down intent → CLOSED-INTENTIONAL per W314-r2 / W315-r2)

CLAUDE.md L41 still mentions "operator-AI W316 to decide retain-running OR re-stop". Per W315-r2-E and W316 follow-up the decision was **retain-running idle/0-models**. The text "operator-AI W316 to decide" is closed.

**Recommendation**: drop "operator-AI W316 to decide retain-running OR re-stop" from CLAUDE.md L35 (W317-S1 status appendix). HIGH editorial (status-line drift; closed-but-cited).

### W312-A.7 (cognee data-dir cite refresh → CLOSED in W314-r1)

CLAUDE.md L35 already cites `Z:/claude-sota-installed-state/cognee/{data,databases,logs,models,tmp}` — closed.

### W312-A.8 (basic-memory `.exe` retire → CLOSED via W308 uvx-pin)

Status line correctly cites uvx pin. No action.

### W267-related "27 orphan mailboxes archive" (per W312-D F5 archived)

Only 1 mailbox `claude-sota-installed` remains. **CONFIRMED CLEAN.**

## 4. Dead config blocks

### `.mcp.json` `disabledMcpjsonServers` array

W313 Stream A `5a350d1` excised graphiti block from `.mcp.json` and set `disabledMcpjsonServers: []`. Re-probed 2026-05-19: `disabledMcpjsonServers` not present in `mcpServers` key probe (NOT-PRESENT). **Check confirmed clean.**

### Memory `.exe` per W300 (CR-9 exception)

W300-AI-1 corollary documented at CLAUDE.md L17 says the disabled `memory.exe` block "can be deleted entirely at next housekeeping wave." Probe shows no `disabledMcpjsonServers` key present in `.mcp.json` at all — **the block has been cleaned up**. CLAUDE.md L17 note ("can be deleted entirely at next housekeeping wave") is now stale-by-completion.

**Recommendation**: Update CLAUDE.md L17 to reflect that the memory.exe block has been deleted (HIGH editorial — closed-but-still-cited as TODO).

### .claude/hooks/context-mode-cache-heal.mjs (CR-2 exception)

Shim at `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs` (28 LOC, 1656 bytes) — patches `anthropics/claude-code#46915` per CLAUDE.md L19 sanctioned exception. **STILL NEEDED** (upstream issue OPEN per W314-r2 verification). Cardinal-rule-2-exception preserved.

## 5. W317-r2 SEV-1 perplexity-key carryover

CLAUDE.local.md should contain `PERPLEXITY_API_KEY` env var. `.mcp.json` correctly uses `${PERPLEXITY_API_KEY}` interpolation per W317 Stream 7 install report. **W319 operator-blocking SEV-1 key rotation** per W317-codex-r2 F2-r2 — still OPEN as W319 task. **No action this wave** (per W317 commit message `3be2e4c`: "AI-W318-2 rewritten as W319 operator-blocking SEV-1 incident").

## 6. Summary

| Severity | Count | Examples |
|----------|-------|----------|
| HIGH     | 4     | CLAUDE.local.md L80 graphiti+FalkorDB+Ollama-for-graphiti stale; CLAUDE.local.md L81 MCP list stale; CLAUDE.md L17 memory.exe TODO closed-by-completion; CLAUDE.md L35 W312-A.6 Ollama-decision text closed but cited |
| MED      | 1     | ECC plugin SHA drift since W315-r2 (target `b62f8075` is newer than cited `f3cd006`/`841beea`) |
| LOW      | 5     | Various old SHA citations in W314/W315/W316 status appendices (CCBP `1386b0e`, ECC `aaabe594`/`33ed494a`/`f17c6e88` — all legacy; no action since CLAUDE.md L3 current-pointer is correct) |

**Top-5 paste-ready fixes**: see W318-A-SYNTHESIS.md.
