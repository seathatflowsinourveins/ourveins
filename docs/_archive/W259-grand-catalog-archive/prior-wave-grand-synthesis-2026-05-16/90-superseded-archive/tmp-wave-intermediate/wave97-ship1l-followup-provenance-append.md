

## 2026-05-08 Wave 97 — Ship 1L-followup: full-unleash env-var bumps (3 of 4 bumped; 1 KEEP per context-rot guardrail)

### Origin

User explicit Wave 97 mandate: "make sure we are fully unleash with sota harness, with our advacned workflow, what is the general limit should set? should we using higher limit?"

Trajectory: user has consistently directed "full advanced unleash of all performance, foundation level, and beyond" + cardinal-rule-7 graduated-unleash currently at Phase 3 (`defaultMode: bypassPermissions` per Wave 82d). Ship 1L (commit `a7adfb6`) shipped 4 belt-and-suspenders pins sized at 5-10× observed p95. Ship 1L-followup bumps 3 of 4 to align with full-unleash trajectory while KEEPING MAX_MCP_OUTPUT_TOKENS at 50000 per context-rot guardrail.

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | APPROVE | 0.86 | clean single-round; no Pattern A needed |

Verdict file: `.claude/state/codex_consult_wave97_ship1l_followup_unleash_bumps_OUT.txt`

Codex rationale verbatim: "The three bumps are bounded, reversible, aligned with the Phase 3 full-unleash mandate, and the decision to keep MAX_MCP_OUTPUT_TOKENS at 50000 is the correct context-rot guardrail while still increasing Bash and MCP headroom materially."

### 4-axis bump table

| Env var | Ship 1L | Ship 1L-followup | Rationale |
|---|---|---|---|
| MAX_MCP_OUTPUT_TOKENS | 50000 | **50000 (KEEP)** | Going higher GENUINELY risks context-rot at 70% autocompact; single MCP result >100K floods context |
| BASH_MAX_OUTPUT_LENGTH | 50000 | **100000** | 100K chars ≈ 25K tokens; well below 300-400K context-rot threshold per Karpathy 1M calibration |
| BASH_MAX_TIMEOUT_MS | 900000 (15min) | **1800000 (30min)** | Covers full-repo gitleaks scans + large monorepo clone (5-15min) + edge cases beyond codex T6 900s |
| MCP_TOOL_TIMEOUT | 120000 (2min) | **300000 (5min)** | Heavy ctx_batch_execute (8-10 concurrent commands p99) + repomix large-repo + gitnexus 10K+ symbol graph |

### Edit (single file: `.claude/settings.json`)

3 line-edits + 3 _comment line updates documenting bump rationale + Ship 1L history preserved.

### LAUNCH-DISCIPLINE D1

✅ **REVERSIBLE**: 3 line-edits (1-line revert each)
✅ **OBSERVABLE**: subsequent session Bash/MCP calls can run longer / produce larger output before truncation/timeout
✅ **INCREMENTAL**: bump on existing Ship 1L pins; no NEW env vars

### CR-9 install-risk MED

- Each bump independently reversible
- BASH_MAX_TIMEOUT_MS 30min still under "user impatience" threshold; auto-background via BASH_DEFAULT_TIMEOUT_MS UNCHANGED
- BASH_MAX_OUTPUT_LENGTH 100K well below context-rot threshold
- MCP_TOOL_TIMEOUT 5min preserves fan-out parallelism (wedged tools eventually time out)
- MAX_MCP_OUTPUT_TOKENS KEEP — context-rot guardrail explicitly preserved per codex T1 rationale

### Operational impact

| Layer | Pre Ship 1L-followup | Post Ship 1L-followup |
|---|---|---|
| Heavy Bash commands | 15min ceiling (gitleaks full-history could hit) | 30min ceiling (covers gitleaks + monorepo clone + cwc edge) |
| Bash output | 50K chars cap | 100K chars cap (5-10× → 10-20× headroom) |
| MCP tool calls | 2min p99 wedge-protection | 5min p99 (heavy ctx_batch_execute / repomix safe) |
| MCP output | 50000 tokens (UNCHANGED) | 50000 tokens (UNCHANGED — context-rot guardrail) |

### Honest limitation

Ship 1L-followup does NOT raise MAX_MCP_OUTPUT_TOKENS despite full-unleash mandate. Rationale:
- Single MCP tool returning 100K+ tokens (e.g. ctx_batch_execute with 12 commands × 10K each) consumes 10% of 1M context per call
- Multiple such calls accumulate to push autocompact firing earlier (CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 = 700K trigger)
- Higher = faster context-rot = harder to debug
- 50000 already 2× CCBP default; further bump requires evidence of ctx_batch_execute hitting 50K ceiling (not currently observed)

If user provides operational evidence of ctx_batch_execute truncation at 50K, Ship 1L-followup-2 can bump to 100000 with explicit context-rot trade-off documented.

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT CCBP**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:822,824,825,979 @ HEAD 64fffd53`
- **TIER-1-DIRECT Anthropic CHANGELOG**: `Z:/repos/deps/claude-code/CHANGELOG.md:3259,3311,2686`
- **TIER-1-DIRECT karpathy-adapted §5**: 1M calibration context-rot at 300-400K threshold
- **TIER-2 sister**: Ship 1L provenance entry (Wave 97 Ship 1L commit `a7adfb6`)
- **TIER-3 evidence**: `tmp/wave97-fan3-X1-mcp-env-deep-dive-2026-05-08.md` + this commit's verdict file

### Cardinal-rule compliance

- **CR-1**: TIER-1 cite chain identical to Ship 1L + karpathy-adapted §5 context-rot anchor
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (APPROVE 0.86 single-round)
- **CR-5**: env-var-only edit; no hand-coded primitive
- **CR-7**: Phase 3 graduated-unleash ALIGNED with full-unleash bump trajectory
- **CR-8**: ADAPTED-FROM-SOTA — values cite-anchored to CCBP defaults + context-rot risk analysis
- **CR-9**: install-risk MED — each bump independently reversible
- **CR-10**: research-first via Wave 97 fan-3 X1 baseline + this followup evidence-based bump trajectory
- **CR-11**: META-process SOTA — fan-3 dispatched + Pattern-A-ready (no Pattern A needed) + GPT-5.5 e2e + provenance + atomic commit per cycle-300

### Wave 97 Ship 1L-followup — 16th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 86 | `824523f` | 1Q |
| 89-96 | (8 ships) | |
| 97-1A | `3c00615` | 1A — claude-md-management plugin |
| 97-1B | `a1f19f0` | 1B — gitleaks v8.30.1 |
| 97-1G | `58be220` | 1G — CLAUDE_CODE_EFFORT_LEVEL=xhigh |
| 97-1C+1D | `0110a9f` | 1C+1D — gitleaks Phase 2 |
| 97-1J | `88aa7b1` | 1J — CLIProxyAPI round-robin |
| 97-1L | `a7adfb6` | 1L — 4 MCP/Bash env-var pins |
| **97-1L-followup** | **THIS** | **1L-followup — full-unleash 3-bump (KEEP MAX_MCP_OUTPUT_TOKENS)** |

### Update triggers

Re-evaluate when:
- ctx_batch_execute observed truncation at 50K → bump MAX_MCP_OUTPUT_TOKENS with context-rot trade-off explicit
- BASH_MAX_TIMEOUT_MS hits 30min ceiling → bump to 3600000 (1h)
- MCP_TOOL_TIMEOUT hits 5min ceiling → bump to 600000 (10min)
- Anthropic ships hot-reload for any of the 4 env vars → reduce reliance on launcher restart
- Cardinal-rule-7 trajectory bumps to Phase 4 (would re-baseline ceiling philosophy)

### Pending fan-3 ships (deferred per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE)

- **Ship 1N**: github/spec-kit install (fan3-X2 ADOPT-NOW conf=0.92)
- **Ship 1F**: scripts/*-hooks-rewrite.py cite-trail headers (fan3-X3 KEEP-WITH-CITE-IMPORT-AMBER Class B)
- **Ship 1J-followup**: priority-equalization (operator-decision)
