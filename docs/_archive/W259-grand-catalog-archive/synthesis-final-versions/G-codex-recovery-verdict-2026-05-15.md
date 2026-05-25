# Wave 255 — Codex Recovery Verdict (orchestrator-direct GPT-5.5 after 3/3 subagent FM-17 failure)

**Verdict origin**: real GPT-5.5 via `codex exec --ephemeral -p deep-review-exec` orchestrator-direct foreground+tee (Path P). Recovers the Wave 255 systemic subagent failure (3/3 sota-researcher agents FM-17 gateway error). Background job `bzn3cnxi2`, exit 0. Output 14656 lines; verdict block at L14569-14656.
**Reviewed**: 5 axes (user-named repos / wshobson + superpowers / LLMLingua replacement / 4 missing categories / honest saturation verdict). All findings source-cited at file:line + HEAD SHA.

---

## WAVE-255-RECOVERY-VERDICT: SATURATION-CONFIRMED

**CROSS-MODEL-GATE: SATISFIED** (real GPT-5.5 codex CLI verdict on file).

**Axis 5 honest verdict**: "SATURATION-CONFIRMED with caveat: Wave 254 missed category writeups, not firm installs. The pure-runtime should close L7 observability and avoid importing every young repo."

---

## 14 Findings (source-cited; file:line + HEAD SHA)

### Axis 1 — User-named repos

| # | Sev | Finding | Disposition |
|---|---|---|---|
| **F-1** | P1 | `volcengine/OpenViking/examples/claude-code-memory-plugin` IS a native CC plugin (`.claude-plugin/plugin.json` exists; README install: `claude plugin install openviking-memory@local-marketplace`). No separate subdir LICENSE — **AGPLv3 root applies by inheritance**. Cite: `OpenViking/LICENSE:1-2 @ af4c54f` + `examples/claude-code-memory-plugin/.claude-plugin/plugin.json:2-4 @ af4c54f` + `README.md:51-55 @ af4c54f` | **REJECT for install, CITE-ONLY** |
| **F-2** | P2 | `topoteretes/cognee` valid Apache-2.0 + has native MCP surface (`cognee-mcp` FastMCP stdio: `remember`/`recall`/`forget`). `pip install cognee` requires Python `<3.15`. **`cognee-integrations` sidecar UNLICENSED** — do NOT use integrations subdir. Cite: `cognee/LICENSE:1-2 @ 4ca1d0c` + `pyproject.toml:2-26,202-217 @ 4ca1d0c` + `cognee-mcp/src/server.py:73,1074,1124,1180,1519-1520 @ 4ca1d0c`; `cognee-integrations` LICENSE absent @ `f02ac2e`. Grade **B+** | **STUDY-PILOT** (parent `cognee`/`cognee-mcp` only) |
| **F-3** | P2 | `langfuse/langfuse`: core MIT, `ee/` commercial. **Native Langfuse MCP exists** at `/api/public/mcp` streamableHttp Basic Auth — bypasses local Python SDK entirely. **OVERTURNS Agent D**: SDK `langfuse==4.6.1` uses `pydantic>=2,<3` NOT pydantic-v1; Py3.14 block was stale premise. Cite: `langfuse/LICENSE:3-17 @ 352cdf3` + `ee/LICENSE:18-37 @ 352cdf3` + `web/src/pages/api/public/mcp/index.ts:2-15,79-95 @ 352cdf3`. Grade **A** | **ENABLE/UPDATE MCP-PILOT** (not new install; MCP-side enable) |

### Axis 2 — wshobson + superpowers

| # | Sev | Finding | Disposition |
|---|---|---|---|
| **F-4** | P2 | `wshobson/agents` IS real MIT Claude plugin marketplace. **Wave 254 F-2 was WRONG about plugins-as-standalone-repos** — the plugins exist as DIRS inside `wshobson/agents`, not as standalone repos. Source grades (pure-runtime): `plugin-eval` **A-**, `protect-mcp` **B+**, `agent-teams` **B+**, `shell-scripting` **B+**, `conductor` **B**, `review-agent-governance` **B-**, `signed-audit-trails` **C+/B-**, `block-no-verify` **C+** (only if local hook doesn't already block). Cite: `README.md:1,7-9,47-55 @ 112197c` + `.claude-plugin/marketplace.json:2,9,12 @ 112197c` | **selective STUDY/PILOT** (no bulk install) |
| **F-5** | P3 | wshobson does NOT duplicate `claude-plugins-official` wholesale, but `comprehensive-review` overlaps already-installed review surfaces. Cite: `Z:/claude-sota-installed/.claude/settings.json:514-548` | avoid double-install of equivalent review workflows |
| **F-6** | P3 | `obra/superpowers` v5.1.0 (2026-04-30) — no NEW 2026-05 SOTA skill requires vendoring; focus is worktree/code-review consolidation. Cite: `superpowers/README.md:154-196 @ f2cbfb` + `RELEASE-NOTES.md:3-32 @ f2cbfb` | **do NOT bulk vendor**; add only missing core-flow skills |

### Axis 3 — LLMLingua replacement (operator's repeated flag)

| # | Sev | Finding | Disposition |
|---|---|---|---|
| **F-7** | P1 | Operator IS right `microsoft/LLMLingua` outdated as install target, **BUT `buildoak/wet` is NOT a firm replacement**. 37 stars, MIT, created 2026-03-14, pushed 2026-03-19; claims SWE-bench compression + tool-result rewriting BUT **young AND unauthenticated control endpoints documented** (security concern). Cite: `wet/LICENSE:1-5 @ f570d43` + `README.md:19-41,67-88,170-172,254-300 @ f570d43`. Grade **C+/B-** | **WATCH/PILOT** (not install-now) |
| **F-8** | P2 | **`yvgude/lean-ctx` IS the strongest named LLMLingua replacement candidate** — but it's a context runtime, not pure prompt compression. Apache-2.0, **1,669 stars**, created 2026-03-23, pushed 2026-05-16; local-first file/shell compression, MCP server, Claude/Codex integrations, PR context packs, 60-95% savings claimed. Cite: `lean-ctx/LICENSE:2-4 @ 0f56fbe` + `README.md:11-16,47,81-109,117-120,150-192,278-280 @ 0f56fbe`. Grade **B+/A- source surface, 90d-gated** | **STUDY-PILOT** (90d burn-in gate) |
| **F-9** | P2 | Fresh 2026-03+ compression alternatives exist but none overturn saturation. **`claudioemmanuel/squeez`** best watchlist (Apache-2.0, 120 stars, native Claude/Codex hooks/MCP, benchmark suite). `sliday/tamp` MIT (LLMLingua+textpress stages, cache-safe). `edgee-ai/edgee` Apache Rust gateway. Cite: `squeez/README.md:14,58-63,99-110,123-139,272-289,544-548 @ 9626b3d` + `tamp/README.md:3,47-52,209,298-304,328-330 @ 4a58c9c` + `edgee/README.md:23-34,118-128,202-212 @ 5316d52` | **watchlist** (no firm install) |

### Axis 4 — 4 Missing Categories (codex F-6 from Wave 254)

| # | Sev | Finding | Disposition |
|---|---|---|---|
| **F-10** | P2 | **FR-1 model-routing** top pick: **LiteLLM if demand exists**. Unified API, 100+ providers, virtual keys, spend tracking, guardrails, load balancing, MIT core / enterprise boundary. Runner-up: Portkey (managed gateway/MCP gateway). OpenRouter is managed-only not install-primitive. RouteLLM research-stale. Cite: `litellm/README.md:46-61,263-343,397-398 @ c459646` + `litellm/LICENSE:1-6 @ c459646` + `Portkey README.md:35-50,193-209 @ 351692f` + `RouteLLM README.md:13-15,101-107,134-142 @ 0b64fda`. Probe 7: **direct Claude+codex sufficient unless provider abstraction needed** | NO INSTALL unless demand emerges |
| **F-11** | P2 | **FR-2 multi-account/quota/failover**: no new 2026-05 open primitive beats existing operator fleet discipline. LiteLLM/Portkey/OpenRouter provide *provider*-key balancing not *Claude account-pool* governance | **NO INSTALL** unless replacing local CLIProxyAPI |
| **F-12** | P2 | **FR-3 prompt-cache management**: Anthropic-native first (`cache_control` automatic, 5m default TTL, optional 1h TTL, cache read/write usage fields). Telemetry via provider usage fields + Langfuse/Opik/OpenTelemetry. **No 3rd-party cache plugin firm enough to install**. Cite: Anthropic docs lines 193-207, 251-299, 458-484, 533-542 | **Anthropic-native + Langfuse/Opik telemetry; no 3rd-party install** |
| **F-13** | P2 | **FR-4 agent-eval harness**: top picks **Inspect AI** (general agent eval) + **promptfoo** (prompt regression / redteam). SWE-bench is benchmark not runtime harness. RepoAgentBench promising but tiny/young. Cite: `inspect_ai/README.md:3-9 @ a90afdc` + `docs/agents.qmd:8-20 @ a90afdc` + `promptfoo/README.md:1,12,54-58,76-80 @ 93f5f1e` + `SWE-bench/README.md:42-55,79-106 @ f7bbbb2` + `repoagentbench/README.md:10-12,98-128,183-205 @ 133e584` | **STUDY-PILOT inspect_ai OR promptfoo** if named eval workflow exists |

### Axis 5 — Honest saturation verdict

| # | Sev | Finding | Disposition |
|---|---|---|---|
| **F-14** | P1 | Wave 254 saturation is **MOSTLY REAL, NOT LAZY**. Fresh research corrected details + populated the 4 missing categories (Axis 4 above) but **did NOT produce new firm installs beyond opik + openllmetry, plus possibly Langfuse MCP enablement (per F-3)**. Wave 254 already recorded W229 maturity + L0-L11 coverage. Cite: `GRAND-SYNTHESIS-pure-runtime-2026-05-15.md:30-50,85-86,125,168-171,253` | SATURATION-CONFIRMED |

---

## Updated firm install recommendations (post-Wave-255 codex recovery)

Synthesis of Wave 254 grand synthesis §4 + this Wave 255 codex recovery:

1. **`comet-ml/opik`** (Apache-2.0) — INSTALL-NOW (L7 observability GAP-2; unchanged)
2. **`traceloop/openllmetry`** (Apache-2.0) — INSTALL-NOW (L7 observability GAP-2; unchanged)
3. **NEW per F-3: Langfuse native MCP** — **ENABLE/UPDATE** (not new install — pure-runtime already has langfuse SDK partially; flip to MCP path which bypasses the supposed-Py3.14 block that was a stale premise). Native MCP at `/api/public/mcp` streamableHttp Basic Auth.

**STUDY-PILOT queue updated**:
- `cognee` (B+) — parent + `cognee-mcp` only, NOT integrations
- `yvgude/lean-ctx` (B+/A-) — strongest LLMLingua replacement candidate, 90d-gated
- wshobson selective: `plugin-eval` (A-), `protect-mcp` (B+), `agent-teams` (B+), `shell-scripting` (B+) — selective pilot

**WATCH (no install)**:
- `buildoak/wet` (C+/B-) — young, unauthenticated endpoints; not firm LLMLingua replacement despite Wave 254 framing
- `claudioemmanuel/squeez`, `sliday/tamp`, `edgee-ai/edgee` — compression watchlist

**REJECT**:
- `volcengine/OpenViking/examples/claude-code-memory-plugin` — native CC plugin BUT AGPLv3-by-inheritance from root (no separate subdir license)
- `cognee-integrations` (UNLICENSED) — use parent `cognee` directly
- `langfuse/ee/` commercial folders (use core MIT only)
- Anything from "Axis 5 caveat: avoid importing every young repo"

**NO INSTALL on the 4 missing categories** unless explicit demand surfaces in pure-runtime:
- FR-1 LiteLLM — if provider abstraction needed (Probe 7.a likely-REJECT for direct Claude+codex sufficient)
- FR-2 — no install (operator fleet discipline incumbent)
- FR-3 — Anthropic-native `cache_control` + Langfuse/Opik telemetry
- FR-4 — Inspect AI OR promptfoo only if named eval workflow

---

## Disposition

The Wave 254 grand synthesis stands as authoritative. This Wave 255 codex recovery:
1. Corrects Wave 254 F-3 langfuse-blocked premise (was stale — SDK 4.6.1 is pydantic-v2 compatible; native MCP also bypasses SDK)
2. Adds OpenViking memory-plugin license-inheritance disposition
3. Adds wshobson per-plugin source grades (A- through C+)
4. Confirms saturation independently via 2nd codex pass
5. Populates the 4 missing categories with specific top picks + Probe 7 demand-gate analysis

**No re-fire needed.** Codex confirms Wave 254 conclusion: SATURATION is real, runtime is at W229 maturity, net-new firm installs ≈ 2-3 (opik + openllmetry + possibly Langfuse MCP enablement).
