

## 2026-05-08 Wave 101 — Ship 2Q: cwc commit-on-stop throttle wrapper (Option D HYBRID; codex T1 APPROVE 0.92 clean)

### Origin

Wave 100 codification: cwc-bundled-drift n=5 cumulative across Wave 98-100 (`00d1bde` + `72d257a` designed + `68169d9` + `20785c5` + `4e5dc95` + `ebb55a6`). 9 cwc auto-checkpoints in 3hrs (~1 per 20min) — exceeds cycle-322 n=3 self-observed promotion bar. Wave 101 Agent A (`a7d30a485c10d68d9` 310s / 18 tools) APPROVE-DESIGN conf=0.88 with Option D HYBRID wrapper.

### TIER-1 SOTA cite chain

- **TIER-1-DIRECT**: `Z:/repos/deps/cwc-long-running-agents/claude-code-config/.claude/hooks/commit-on-stop.sh @ HEAD ffd563d668a97a38d4aa092bf0d5b1507c046629` (Apache-2.0 Anthropic OFFICIAL; 17 LOC; wrapper preserves verbatim per CR-12 upstream-install-priority)
- **TIER-3-LOCAL-COMPOSITION**: throttle predicate (Lamport timestamp + git porcelain shortstat) is sss-novel mechanical composition over TIER-1 cwc primitive. Per CR-1 rule #8 lattice: `effective_tier=TIER-3-LOCAL-COMPOSITION`.
- **TIER-2 sister**: Wave 101 Agent A artifact at `tmp/wave101-A-ship2q-cwc-discipline-revision-2026-05-08.md`
- **TIER-2 sister**: `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A + `closed-loop-recursive-narrowing.md` Outcome A continuity

### Architecture

**Option D HYBRID wrapper** combines Pattern P5 env kill-switch + Pattern P3 hybrid throttle (time AND LOC) + delegation to upstream cwc verbatim:

1. **Pattern P5 env kill-switch**: `CWC_COMMIT_ON_STOP_DISABLE=1` short-circuits hook (matches sister `FM17_STALL_DETECTOR_DISABLE=1` convention)
2. **Pattern P3 hybrid throttle**: skip ONLY if BOTH (a) elapsed < `CWC_COMMIT_ON_STOP_MIN_INTERVAL_SEC` (default 3600) AND (b) LOC delta < `CWC_COMMIT_ON_STOP_MIN_LOC` (default 50). Commit if EITHER threshold broken.
3. **CR-12 delegation**: invokes `${CLAUDE_PROJECT_DIR}/.local/cwc/claude-code-config/.claude/hooks/commit-on-stop.sh` verbatim when throttle predicate fails

### Edits (2 files / +68 / -1)

1. `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh` (NEW; +67 LOC bash wrapper)
2. `.claude/settings.json:234` Stop[1].command REWIRE (1-line edit; old upstream-direct → new wrapper)

### Cross-model T1 gate (real GPT-5.5 e2e foreground+tee — FULLY UNLEASHED per Ship 2P; NO --sandbox flag)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | **APPROVE** | **0.92** | **CLEAN single-round; ZERO prescribed_edits** |

Verdict file: `.claude/state/codex_consult_wave101_ship2q_cwc_throttle_wrapper_OUT.txt` (342 lines / 65s / 13,307 tokens).

**Codex verdict verbatim**: "Defaults 3600s/50 LOC and skip-only-if-both hybrid logic are appropriate, upstream cwc remains untouched/delegated verbatim, tracked-only semantics should stay out of Ship 2Q scope, prior Outcome A commits remain forward-only, TIER-3 local composition is correct, and CWC_COMMIT_ON_STOP_DISABLE=1 should be codified as the hook-wire /loop discipline successor."

### Throttle behavior expected post-ship

| Scenario | Pre-Ship-2Q | Post-Ship-2Q |
|---|---|---|
| Active /loop with frequent small edits | ~1 cwc auto-checkpoint per 20min | ~1 per hour (or sooner if >50 LOC accumulates) |
| Genuine session-end with pending dirty tree | commit | commit (either time>1hr OR LOC>50 breaks predicate) |
| Operator wants no auto-checkpoint (e.g., codex T1 hook-wire ship) | n/a | `$env:CWC_COMMIT_ON_STOP_DISABLE='1'` before session |

### Operator discipline successor (Wave 98 lesson n=2 RETIRED Ship 2P → Wave 101 Ship 2Q codification)

Per codex T1 prescription Q7: **`CWC_COMMIT_ON_STOP_DISABLE=1` is the architectural successor to the retired `--sandbox=read-only` Wave 98 lesson**. Recommended discipline for /loop fires running codex T1 e2e on hook-wire ships.

Forward-only operator-discipline:
- For ANY ship that wires/modifies a Stop hook: pre-set `$env:CWC_COMMIT_ON_STOP_DISABLE='1'` before launching `eee`
- For NORMAL development sessions: leave unset (default throttle 3600s/50 LOC catches genuine session-end)

### CR-9 install-risk LOW

- Wrapper is pure orchestration over upstream verbatim
- No `@latest` install (cwc native-installed; HEAD pinned at ffd563d6)
- No sibling-bleed (zero `Z:/claude-sota/` paths; uses `${CLAUDE_PROJECT_DIR}` env)
- Reversible: `rm wrapper.sh + revert settings.json:234`
- Sibling REVERT-check clean (no precedent for cwc throttle in sibling)

### Forward-only Outcome A continuity (port-note-discipline §6)

Prior cwc-bundled-drift commits remain UNMODIFIED:
- Wave 98: `00d1bde`
- Wave 99: `72d257a` (designed firing)
- Wave 100: `68169d9` + `20785c5` + `4e5dc95` + `ebb55a6`
- Wave 101 (pre-throttle): `af665a4` + `711307a` (last 2 fires before throttle takes effect)

Total cumulative cwc auto-checkpoints in this session = **9** before throttle activated. Post-Ship-2Q throttle: expected ~1 per hour going forward.

### Wave 101 — 19th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 100-2N-batch1 | `1deb221` | Top-3 OFFICIAL plugin enable |
| 100-2P | `b6dc7e5` | GPT-5.5 fully-unleashed operator-override |
| 100-2P-followup | `47b7cc6` | provenance recovery (Mia OVER #13) |
| 100-2N-cache (operational fix; cache gitignored) | (no commit needed) | 4 plugin cache roots populated |
| 100-2R | `4e5dc95` (cwc auto-captured) | eee HARD-GATE plugin cache populate provenance |
| 100-2S | `e3064c0` | operator settings.json cleanup + skipDangerousModePermissionPrompt |
| **101-2Q** | **`5cc1633`** | **cwc commit-on-stop throttle wrapper (codex T1 APPROVE 0.92 clean)** |

### CR COMPLIANCE

- **CR-1**: TIER-3-LOCAL-COMPOSITION over TIER-1 cwc primitive (rule #8 lattice)
- **CR-3**: real GPT-5.5 codex T1 e2e BEFORE commit (APPROVE 0.92 clean single-round)
- **CR-5**: install-priority — wrapper preserves Anthropic OFFICIAL primitive
- **CR-6**: official-native-channel — cwc native-installed at `.local/cwc/`
- **CR-7**: Phase 1 — operational fix
- **CR-8**: ADAPTED-FROM-SOTA — git porcelain shortstat + Lamport timestamp
- **CR-9**: install-risk LOW
- **CR-10**: research-first — Wave 101 Agent A pattern survey
- **CR-11**: META-process SOTA — agent fan-out → orchestrator-direct ship → codex T1 e2e → APPROVE single-round
- **CR-12**: SATISFIED — upstream cwc UNTOUCHED; wrapper forward-only ADDITION

### Outstanding queue (post Ship 2Q)

#### Tier 1 — Wave 101 NEXT (CR-12 PRIMARY)
- **Ship 2L**: anthropics/skills 3-plugin install (Agent B APPROVE-DESIGN 0.91; document-skills + example-skills + claude-api wrapping 17 skills; marketplace already added at HEAD `d211d437`)

#### Tier 1 — un-completed
- Ship 2N-batch2 (mcp-server-dev + commit-commands + hookify) · Ship 2N-batch3 (playground)
- Ship 2B claude-code-security-review · Ship 2C Superpowers cite · Ship 2M inspect_ai

#### Tier 2 — Wave 100 systematic optimization
- SHIP-2 Wave 98 Ship A + D (priority-bucket equalize + FM-17.b.i defense; operator-decision)
- SHIP-3 cnighswonger v3.3.0 chained (99.8% cache reduction)
- D2.3 MAX_MCP_OUTPUT_TOKENS settings-only fast win
- D5.3 chrome-devtools-mcp study-pilot
- D2.1 chopratejas/headroom

### Update triggers

Re-evaluate this ship when:
- A 6th cwc-bundled-drift incident lands DESPITE throttle (n=6 promotes to mechanical-enforcement; e.g., pre-commit hook validating staged scope before commit-on-stop fires)
- Default 3600s/50 LOC tuned operationally (likely too conservative or too aggressive — operator-decision after 7-day burn-in)
- Anthropic CC ships native session-checkpoint primitive that obviates cwc commit-on-stop (would retire Wave 98 Ship 2A wire + this wrapper)
- A 4th silent-shell-EOF Mia OVER lands (n=3 codifies "verify cat >> took effect" lesson to rule layer)
