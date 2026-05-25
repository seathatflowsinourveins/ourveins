## ARTIFACT-INLINE: tmp/wave212-orchestrator-mia-preapply-2026-05-15.md

### 1. Artifact Persistence Status

| item | status |
|---|---|
| requested catalog path | `tmp/wave212-agentO-token-obs-eval-catalog-2026-05-15.md` |
| source checked: `.claude/state` | no matching `codex_consult_*wave212*` / `*agentO*` OUT file found |
| source checked: `tmp/` | no prior Agent O Wave 212 token/obs/eval catalog found; existing Wave 210 Agent O and Wave 212 Agent N files only |
| source checked: Codex transcript | found `Z:/claude-sota-installed-state/.codex/sessions/2026/05/15/rollout-2026-05-15T12-26-50-019e2c76-4cef-7593-94a4-beddc3a22ab6.jsonl` |
| persistence result | WRITTEN |
| persisted size | 13,290 bytes |
| required content spot-check | contains 25-candidate summary, six layers, Langfuse A-/MIT-core section, six ADOPT-NOW names, and `VERDICT: O-WAVE212-COMPLETE` |

### 2. Mia Rule Availability

The requested rule path `Z:/claude-sota/.claude/rules/mia-pre-apply.md` was not present in this environment. `Z:/claude-sota` itself was not present; available sibling roots were `Z:/claude-sota-pure`, `Z:/claude-sota-pure-state`, `Z:/claude-sota-state`, and `Z:/claude-sota(retired)`.

Fallback used: the explicit probe discipline in the orchestrator task plus the local prior Mia synthesis artifact at `docs/sota-architecture-audit/fire-14-agent-team/02-synthesis-and-mia-pre-apply.md`.

### 3. Per-Candidate Mia Probe Results

| candidate | Probe 4 plugin/skill namespace | Probe 6 license verification | existing install check | alternate-install-path probe | verdict |
|---|---|---|---|---|---|
| promptfoo | Documentation/skill references found, but no dedicated repo-local plugin install; stronger blocker is existing CLI install | `Z:/repos/deps/promptfoo/LICENSE` and `package.json` verify MIT; repo HEAD `3ac2b3305b05e9e1afca8b140939314028b4d3f7` | `npm -g ls --depth=0 promptfoo` shows `promptfoo@0.121.11`; `promptfoo --version` returns `0.121.11`; no `Z:/venvs/claude/Scripts/promptfoo*` | `npx --yes promptfoo@0.121.11 --version` failed due npm cache EPERM at `C:/Users/42/AppData/Local/npm-cache`, but global CLI is already available at `C:/Users/42/AppData/Roaming/npm/promptfoo*` | OVER |
| garak | No plugin/skill namespace duplicate found | `Z:/repos/deps/garak/LICENSE` verifies Apache-2.0; repo HEAD `c56023a19f595885bab2d8b255a415764908c6be` | `pip show garak` in `Z:/venvs/claude` not found; `import garak` in venv not found; `garak --version` returns `garak LLM vulnerability scanner v0.15.0` | CLI exists at `Z:/claude-sota-installed/.local/bin/garak.exe`, outside requested venv path | OVER |
| outlines | Broad text hits are generic English "outlines"; no dedicated Outlines package/plugin duplicate found | `Z:/repos/deps/outlines/LICENSE` and `pyproject.toml` verify Apache-2.0; repo HEAD `c4212c447bf25c5020888ad2032b61aeb691ea38` | no `Z:/venvs/claude/Scripts/outlines*`; `pip show outlines` not found; `import outlines` not found; `Get-Command outlines` not found | no alternate CLI/package path found | GENUINE-GAP |
| Zod | Dedicated skill/catalog duplicate exists: `zod-validation-expert`; many plugin docs reference Zod | direct raw GitHub LICENSE verifies MIT: `https://raw.githubusercontent.com/colinhacks/zod/main/LICENSE` | not global/root-installed at `C:/Users/42/AppData/Roaming/npm/node_modules/zod` or `Z:/claude-sota-installed/.local/npm/node_modules/zod` | local nested package installs found under multiple plugin `node_modules`, including context-mode, everything-claude-code cache, thedotmack/claude-mem, and `Z:/claude-sota-installed/.local/npm/node_modules/@ccusage/mcp/node_modules/zod` | OVER |
| msgspec | No plugin/skill namespace duplicate found | direct raw GitHub LICENSE verifies BSD-3-Clause terms: `https://raw.githubusercontent.com/jcrist/msgspec/main/LICENSE` | no `Z:/venvs/claude/Scripts/msgspec*`; `pip show msgspec` not found; `import msgspec` not found; `Get-Command msgspec` not found | no alternate CLI/package path found | GENUINE-GAP |
| langfuse | Dedicated Langfuse skill/plugin duplicate exists in `antigravity-awesome-skills` catalog and bundle skill paths | `Z:/repos/deps/langfuse/LICENSE` verifies MIT core with EE directories excluded; `Z:/repos/deps/langfuse/ee/LICENSE` verifies commercial EE license; `Z:/repos/deps/langfuse-python/LICENSE` and `pyproject.toml` verify MIT SDK; repo HEADs: core `2466d4ce9bc33b24d6ae5c63cc32293555eec0c0`, Python SDK `8bcc8fa84de7d72955ce76c0045e45b6730ffe76` | `pip show langfuse` in `Z:/venvs/claude` shows `langfuse 4.2.0`, MIT; `import langfuse` resolves to `Z:/venvs/claude/Lib/site-packages/langfuse/__init__.py`; `langfuse` CLI available at `C:/Users/42/AppData/Roaming/npm/langfuse*` | installed Python package scan found `ee_path_hits_count 0`; no EE import/vendor risk in installed SDK payload | OVER; constraint retained: core SDK only, no EE vendoring |

### 4. Final Install Queue

| candidate | install disposition | constraint |
|---|---|---|
| outlines | GENUINE-GAP | install as optional Python dependency only where provider-native structured output is absent |
| msgspec | GENUINE-GAP | install only for hot-path hook IPC/log JSON or MessagePack parsing |

### 5. Dropped From Install Queue

| candidate | drop reason |
|---|---|
| promptfoo | already globally installed at `promptfoo@0.121.11`; `npx` probe blocked by npm cache EPERM, not by package absence |
| garak | already available as CLI at `Z:/claude-sota-installed/.local/bin/garak.exe`; venv package absent |
| Zod | already present as nested dependency in local plugin/node module trees and dedicated `zod-validation-expert` skill exists |
| langfuse | already installed in venv as `langfuse 4.2.0`, CLI exists, and dedicated skill/plugin duplicate exists; no installed EE payload detected |

### 6. Probe 4 / Probe 6 Blockers

| blocker | affected candidate(s) | impact |
|---|---|---|
| Probe 4 namespace duplicate | Zod, langfuse | drop from install queue unless orchestrator explicitly wants docs/skill consolidation rather than package install |
| Probe 6 conditional license boundary | langfuse | core SDK is MIT, but self-host/core repo adoption must exclude `ee/`, `web/src/ee/`, and `worker/src/ee/` commercial-license material |
| alternate path already installed | promptfoo, garak, langfuse | drop from install queue to avoid redundant installs |
| npm cache EPERM | promptfoo npx probe, `npm view zod` probe | does not block installed global promptfoo use; Zod license was verified via direct GitHub raw LICENSE instead |

MIA-COMPLETE
