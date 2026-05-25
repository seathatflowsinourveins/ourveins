

## 2026-05-08 Wave 97 — Ship 1F: cite-trail headers for scripts/*-hooks-rewrite.py (closes Wave 52 iter1c UNCLEAR-PROVENANCE)

### Origin

Wave 52 iter1c audit at `Z:/claude-sota-installed/docs/outer research/wave52/iter1c-installed-audit.md` flagged 2 scripts as UNCLEAR-PROVENANCE violation of cardinal-rule-5/8/9:
- `scripts/codex-plugin-hooks-rewrite.py`
- `scripts/ecc-plugin-hooks-rewrite.py`

Wave 97 fan-3 Agent X3 archaeology returned both scripts **Class B — Novel eee-side glue with TIER-1 substrate** + verdict **KEEP-WITH-CITE-IMPORT-AMBER** per CLAUDE.md Section 14.5. Required operator-action #1: "Add cite-trail header block to both scripts citing TIER-1 substrate file:line + HEAD SHA per cardinal-rule-1".

### Cross-model T1 gate (real GPT-5.5 e2e via codex CLI foreground+tee)

| Round | Verdict | Confidence | Outcome |
|---|---|---|---|
| Round-1 | NEEDS-REVISION | 0.93 | Caught 5 prescribed_edits (Wave 80 mixed in / cite-format / stale line-note / missing provenance / smoke-probe needed) |

**Pattern A 5-prescription apply:**

| # | Round-1 finding | Pattern A apply |
|---|---|---|
| F1 | Wave 80 behavior edits mixed in scripts/codex-plugin-hooks-rewrite.py | **Selective stage** via `git add -p` (staged 43 LOC header only; 220 LOC Wave 80 patches preserved unstaged for separate ship) |
| F2 | CR-1 anchors need exact `file:line @ full HEAD SHA` | Both headers updated to full 40-char SHA + symbol-anchor (`#main`, `#init`, `#brokerLifecycle`, `#getPluginRoot`) |
| F3 | Stale "Inline cites at lines 203/239/291/324" | REMOVED — replaced with symbol-anchored sentinel + function references per port-note-discipline.md §1 |
| F4 | Missing CITE-IMPORT-AMBER provenance entry | This entry IS the response |
| F5 | Rerun py_compile + --check probes | Smoke probes executed post-Pattern-A |

Verdict file: `.claude/state/codex_consult_wave97_ship1f_cite_trail_headers_OUT.txt`

### Edits (3 git-tracked files; Wave 80 patches preserved unstaged)

| File | Diff scope | Purpose |
|---|---|---|
| `scripts/codex-plugin-hooks-rewrite.py` | +37 LOC header (selective stage; 220 LOC Wave 80 patches in working tree, NOT in this commit) | cite-trail header per fan3-X3 verdict |
| `scripts/ecc-plugin-hooks-rewrite.py` | +39 LOC header | cite-trail header per fan3-X3 verdict |
| `docs/install-provenance.md` | +Wave 97 Ship 1F entry | this provenance entry |

**TOTAL Ship 1F staged**: 88 LOC doc-only header additions + provenance entry. NO behavior changes.

### TIER-1 SOTA cite chain (per Pattern A F2)

**Script 1 (`scripts/codex-plugin-hooks-rewrite.py`)**:
- TIER-1-DIRECT: `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/stop-review-gate-hook.mjs#main @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf`
- TIER-1-DIRECT: `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/session-lifecycle-hook.mjs#init @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf`
- TIER-1-DIRECT: `Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/lib/broker-lifecycle.mjs#brokerLifecycle @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf`

**Script 2 (`scripts/ecc-plugin-hooks-rewrite.py`)**:
- TIER-1-DIRECT: `Z:/repos/deps/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js#getPluginRoot @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a`

**CITE-IMPORT-AMBER provenance per Section 14.5**:
- Script 1 constituents: TIER-1-DIRECT @ codex-plugin-cc substrate (above) + TIER-3-LOCAL-OPERATOR-DERIVED @ sibling claude-sota commits `46358c2` (Wave 50 Fire 46 origin) + `d298d47` (Wave 50 Fire 43 path-mangling actual-fix) + Wave 80 P#3 extension
- Script 2 constituents: TIER-1-DIRECT @ everything-claude-code substrate (above) + TIER-3-LOCAL-OPERATOR-DERIVED @ sibling claude-sota commits `062455b` (Wave 52 runtime rescue) + `4b26416` (eee runtime port + env scrub)
- effective_tier (BOTH): **TIER-3-LOCAL-COMPOSITION** (MIN_PRECEDENCE per citation-discipline.md rule #8 due to eee-local composition glue)

**HONEST-NON-FINDING gate per CR-12 step (iii)** SATISFIED for both:
- `mcp__github__search_code "openai/codex-plugin-cc plugin-hook-bootstrap rewrite"` total_count=0
- ECC + superpowers + codex-plugin-cc upstream search returned NO rewriter tooling

### Mia pre-apply (3/3 PASS)

1. Both scripts pre-existed in working tree per Wave 52 iter1c finding (verified)
2. fan3-X3 archaeology classified both as Class B with full upstream substrate cites (verified)
3. CR-9 install-risk pre-cite-import REVERT check: NO precedent (verified `git -C Z:/claude-sota log --all --oneline -- scripts/codex-plugin-hooks-rewrite.py scripts/ecc-plugin-hooks-rewrite.py`)

### Smoke probes (Pattern A F5; post-edit verification)

```bash
python -m py_compile scripts/codex-plugin-hooks-rewrite.py  # SYNTAX-OK
python -m py_compile scripts/ecc-plugin-hooks-rewrite.py    # SYNTAX-OK
python scripts/codex-plugin-hooks-rewrite.py --check --quiet # idempotent verify
python scripts/ecc-plugin-hooks-rewrite.py --check --quiet   # idempotent verify
```

### LAUNCH-DISCIPLINE D1

✅ **REVERSIBLE**: `git revert <Ship-1F-commit>` reverts header additions; Wave 80 patches in working tree are unaffected
✅ **OBSERVABLE**: cite-trail header visible at top of each script (operator-grep-able)
✅ **INCREMENTAL**: Doc-only edits (88 LOC); ZERO behavior change; Wave 80 patches deferred to separate ship per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE

### CR-9 install-risk LOW

- Doc-only edits (header comments BEFORE existing docstring)
- Reversible via single git revert
- No runtime behavior modification
- `--check` mode of both scripts continues to work post-edit
- Wave 80 patches (220 LOC) preserved unstaged for separate ship — not silenced

### Operational impact

| Layer | Pre-Ship-1F | Post-Ship-1F |
|---|---|---|
| Wave 52 iter1c UNCLEAR-PROVENANCE flag | OPEN (CR-5/8/9 violation) | **CLOSED** (cite-trail headers + provenance entry; Class B confirmed; CITE-IMPORT-AMBER per Section 14.5) |
| Operator audit-trail | scripts had no upstream cite | cite-trail headers + Wave 80 sentinel symbol-anchors + retirement-condition |
| Wave 80 patches in working tree | uncommitted | preserved for separate ship (cycle-300 ONE-LOGICAL-UNIT-PER-FIRE) |

### Cardinal-rule compliance

- **CR-1**: TIER-1-DIRECT cite chain at file:line + full HEAD SHA + symbol-anchor (post Pattern A F2)
- **CR-3**: real GPT-5.5 codex T1 e2e (R1 NEEDS-REVISION → Pattern A 5-prescription apply)
- **CR-5**: install-priority — script existence justified via Class B Novel eee-side glue with TIER-1 substrate (Wave 97 fan-3 X3)
- **CR-7**: Phase 1 — doc-only edit; no permission change
- **CR-8**: ADAPTED-FROM-SOTA — both scripts' cite-import-AMBER provenance documented per Section 14.5
- **CR-9**: install-risk LOW; reversible; pre-cite-import REVERT check passed
- **CR-10**: research-first — Wave 97 fan-3 X3 archaeology BEFORE this header addition
- **CR-11**: META-process SOTA — fan-3 X3 dispatch + Pattern A 5-prescription apply + GPT-5.5 e2e + selective stage + provenance + atomic commit per cycle-300

### Sister-rule integration

- `cross-model-consensus.md` T1: real GPT-5.5 e2e BEFORE commit; R1 NEEDS-REVISION → Pattern A
- `codex-t1-fix-forward-pattern.md §Pattern A`: 5 prescribed_edits applied in single atomic apply
- `port-note-discipline.md §1`: symbol-anchor preferred over volatile line numbers
- `port-note-discipline.md §6`: forward-only — historical commit bodies not rewritten
- `kiss-dry-yagni.md` Must-Never #4: NOT duplicate — both scripts Class B novel glue per fan3-X3
- `cycle-300 ONE-LOGICAL-UNIT-PER-FIRE`: Wave 80 patches preserved unstaged for separate ship

### Wave 97 Ship 1F — 18th ship in this session arc

| Wave | Commit | Ship |
|---|---|---|
| 86-96 | (9 ships per prior provenance) | |
| 97-1A | `3c00615` | 1A — claude-md-management plugin |
| 97-1B | `a1f19f0` | 1B — gitleaks v8.30.1 |
| 97-1G | `58be220` | 1G — CLAUDE_CODE_EFFORT_LEVEL=xhigh |
| 97-1C+1D | `0110a9f` | 1C+1D — gitleaks Phase 2 |
| 97-1J | `88aa7b1` | 1J — CLIProxyAPI round-robin |
| 97-1L | `a7adfb6` | 1L — 4 MCP/Bash env-var pins |
| 97-1L-followup | `85905f9` | 1L-followup — full-unleash 3-bump |
| 97-1N | `4050871` | 1N — github/spec-kit v0.8.7 binary install |
| **97-1F** | **THIS** | **1F — cite-trail headers (closes Wave 52 iter1c UNCLEAR-PROVENANCE)** |

### Update triggers

Re-evaluate when:
- openai/codex-plugin-cc upstream lands Windows-aware POSIX→Win32 resolver — script 1 retires
- ECC upstream lands `getPluginRoot()` __dirname-relative fallback — script 2 retires
- Sibling claude-sota commit ID for Wave 80 P#3 extension is identified — update provenance trail
- Wave 80 patches need separate ship (next-up; preserved unstaged in working tree)

### Ships pending in Wave 97 queue

- **Wave 80 patches ship** (NEW DEFERRAL per Pattern A F1): 220 LOC unstaged in scripts/codex-plugin-hooks-rewrite.py — patch_191_stop_review_gate_hook + patch_245_session_lifecycle + WAVE80_191/245_SENTINEL + find_mjs_files; needs separate ship with own codex T1 e2e
- **Ship 1J-followup** (operator-decision): equalize active Claude account priorities for TRUE round-robin burst-distribution
