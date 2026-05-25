

## 2026-05-08 Wave 97 — Ship 1L: 4 MCP/Bash env-var belt-and-suspenders pins

### Origin

Wave 97 fan-3 advanced agent team (3-agent parallel dispatch replacing /loop pattern per user mandate). fan3-X1 (sota-researcher) deep-dived 4 MCP/Bash env vars from Wave 97 fan-2 Agent B Pattern 7+8+9. fan3-X1 caught FM-20 path-drift cascade in Agent B brief (MCP_TOOL_TIMEOUT cite was at L1071 — actually mcpServers block; corrected to L979).

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | APPROVE | 0.88 | clean single-round; no Pattern A needed; fan3-X1 design was correct |

Verdict file: `.claude/state/codex_consult_wave97_ship1l_mcp_env_OUT.txt`

### Mia pre-apply (4/4 PASS via fan3-X1 + orchestrator-side T1 verify)

| Env var | Pre-Mia in settings.json | Post-ship |
|---|---|---|
| MAX_MCP_OUTPUT_TOKENS | NO | "50000" |
| BASH_MAX_OUTPUT_LENGTH | NO | "50000" |
| BASH_MAX_TIMEOUT_MS | NO | "900000" |
| MCP_TOOL_TIMEOUT | NO | "120000" |

### TIER-1 SOTA cite chain (per fan3-X1 verification)

- **TIER-1-DIRECT CCBP**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:822,824,825,979 @ HEAD 64fffd53a7c6f8e2e0b1575fdd200b65cda04737`
- **TIER-1-DIRECT Anthropic CHANGELOG**: `Z:/repos/deps/claude-code/CHANGELOG.md:3259,3311,2686`
- **TIER-2 sister**: `cross-model-consensus.md §Profile selection rule` (T6 stop-gate 900s sizing anchor)
- **TIER-3 evidence**: `tmp/wave97-fan3-X1-mcp-env-deep-dive-2026-05-08.md` (full Probe 7+8+9 deep-dive)

### Edit (single file: `.claude/settings.json`)

Inserted 4 env-var pins + 4 _comment lines after L35 (`OTEL_LOG_USER_PROMPTS`), before existing CLAUDE_CODE_EFFORT_LEVEL block at L36.

### LAUNCH-DISCIPLINE D1

✅ **REVERSIBLE**: 1-block revert in settings.json
✅ **OBSERVABLE**: next session's MCP/Bash tool calls respect new ceilings; codex T6 stop-gate 900s sync-gate honors BASH_MAX_TIMEOUT_MS
✅ **INCREMENTAL**: 4-line env addition; orthogonal to existing 33 env keys

### CR-9 install-risk

- LOW for MAX_MCP_OUTPUT_TOKENS + BASH_MAX_OUTPUT_LENGTH
- MED for BASH_MAX_TIMEOUT_MS + MCP_TOOL_TIMEOUT (timeout-misconfig risk; values sized per fan3-X1 workload analysis)
- All 4 pins are belt-and-suspenders per CCBP defaults; reversible via single-block edit

### Operational impact

| Layer | Pre-Wave-97-Ship-1L | Post-Wave-97-Ship-1L |
|---|---|---|
| MCP output cap | implicit 25000 (CCBP default) | explicit 50000 (2× headroom for ctx_batch_execute + repomix) |
| Bash output cap | implicit (~30K observed) | explicit 50000 (5-10× headroom for codex T2 + cwc) |
| Bash timeout ceiling | implicit | explicit 900s (covers codex T6 + cwc + T1/T2) |
| MCP per-tool timeout | implicit | explicit 120s (prevents wedged-tool starvation; 2× ctx_batch_execute p95) |

### Cardinal-rule compliance

- **CR-1**: TIER-1-DIRECT cite chain at file:line + HEAD SHA (CCBP + Anthropic CHANGELOG)
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (APPROVE 0.88 single-round)
- **CR-5**: env-var-only addition; no hand-coded primitive
- **CR-6**: settings.json bootstrap-only file edit per cardinal-rule-5
- **CR-7**: Phase 1 — env vars don't change permission scope
- **CR-8**: ADAPTED-FROM-SOTA — values cite-anchored per fan3-X1 analysis
- **CR-9**: install-risk LOW-MED; reversible via 1-block edit
- **CR-10**: research-first via Wave 97 fan-3 X1 deep-dive + Mia 4/4 PASS BEFORE this ship
- **CR-11**: META-process SOTA — 3-agent fan-3 parallel dispatch (replacing /loop) + Mia + Pattern-A-ready (no Pattern A needed) + GPT-5.5 e2e + provenance + atomic commit

### Sister-rule integration

- `cross-model-consensus.md` T1: real GPT-5.5 e2e BEFORE commit; APPROVE 0.88 single-round
- `mia-pre-apply.md`: fan3-X1's Mia probe caught FM-20 path-drift in Agent B's L1071 cite (corrected to L979 forward-only per port-note-discipline.md §6)
- `fm20-path-drift-cascade.md`: another instance of cite-propagation cascade prevented at fan-3 layer
- `parallel-agent-wave.md §CADP rule 2`: 3-agent dispatch within max-3 cap

### Wave 97 Ship 1L — 15th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 86 | `824523f` | 1Q (CLIProxyAPI session-affinity; SUPERSEDED on strategy axis by Ship 1J) |
| 89-96 | (8 ships per prior provenance) | |
| 97-1A | `3c00615` | 1A — claude-md-management plugin enable |
| 97-1B | `a1f19f0` | 1B — gitleaks v8.30.1 install |
| 97-1G | `58be220` | 1G — CLAUDE_CODE_EFFORT_LEVEL=xhigh env-precedence pin |
| 97-1C+1D | `0110a9f` | 1C+1D — gitleaks PreToolUse hook + .gitleaks.toml |
| 97-1J | `88aa7b1` | 1J — CLIProxyAPI strategy fill-first → round-robin |
| **97-1L** | **THIS** | **1L — 4 MCP/Bash env-var belt-and-suspenders pins** |

### Update triggers

Re-evaluate when:
- ctx_batch_execute returns >50K bytes regularly (would justify MAX_MCP_OUTPUT_TOKENS bump)
- BASH_MAX_TIMEOUT_MS hits 900s ceiling on legitimate operation (would bump to 1800000 or higher)
- Anthropic CHANGELOG bumps any of the 4 env vars' default (would re-baseline)
- A 5th MCP env var surfaces in CCBP that should be pinned

### Ships pending in Wave 97 queue

- **Ship 1N** (P2): github/spec-kit install per fan3-X2 ADOPT-NOW conf=0.92
  - Operator-action: `LATEST_TAG=$(gh release list --repo github/spec-kit --limit 1 --json tagName -q '.[0].tagName') && uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@${LATEST_TAG} && specify init . --integration claude --integration-options="--skills"`
- **Ship 1F** (P3): scripts/*-hooks-rewrite.py cite-trail headers + provenance per fan3-X3 KEEP-WITH-CITE-IMPORT-AMBER (Class B both)
- **Ship 1J-followup** (operator-decision): equalize active Claude account priorities for TRUE round-robin burst-distribution
