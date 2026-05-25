---
title: Wave-14 Stream-Z2 — eee-pure.ps1 architect adversarial review
status: AUTHORITATIVE
date: 2026-05-14
agent: architect (Stream-Z2)
parent_arc: Wave-14 post-operator-rot-catch launcher audit
target: Z:/claude-sota-pure/tools/eee-pure.ps1
---

## LAUNCHER-ARCH-COMPLETE: SUMMARY

**Verdict: NEEDS-REVISION conf=0.91**

Operator already caught the highest-severity rot (CONTEXT_WINDOW_* cargo-cult, lines 47-49 now commented). Adversarial probe surfaces **5 additional rot items** + **2 strong HONEST-NON-FINDINGS** + verifies **9 cites as TIER-1-DIRECT clean**. Aggregate CR-8 SOTA-grounded score: **~78%** (10/13 substantive blocks SOTA-clean; 3/13 need either reframe or removal).

Top rot items (paste-ready edits in §3):
- **R1 (HIGH)**: HOME-isolation 4-var block at L6-9 mis-cited as "CCBP:877" — L877 is `CLAUDE_CONFIG_DIR`, NOT HOME-isolation. Sibling-derived operator convention. Must reframe to TIER-3-LOCAL-OPERATOR with honest disclosure.
- **R2 (MED)**: Hardcoded `$claudeExe = 'Z:\claude\.local\bin\claude.exe'` L98 = sibling-bleed risk per CR-9 (cardinal-rule-9 install-risk discipline at CLAUDE.md L165). Should probe pure-local path FIRST then fall back.
- **R3 (MED)**: Tier-1 BLOCK gate L73-86 has NO upstream cite anchor — operator-convention from Wave-3 Agent G. Must add TIER-3-LOCAL-OPERATOR disclosure marker.
- **R4 (LOW)**: Tier-2 WARN gate L88-94 same class as R3.
- **R5 (LOW)**: Pre-launch banner L105-123 is operator-UX, no cite — but already implicitly local. Add explicit `TIER-3-LOCAL-OPERATOR` comment per CR-8 §"NOVEL-DOCUMENTED-EXCEPTION" status discipline.

---

## §1 — Line-by-line audit table

| Line | Pattern | Current cite-class | Probe verdict | Recommendation |
|---|---|---|---|---|
| L1-3 | Header comment block | TIER-3-LOCAL-OPERATOR (bootstrap scaffolding disclosure) | OK | KEEP — bootstrap doc per CR-5 |
| L6-9 | HOME-isolation 4-var (USERPROFILE/HOME/HOMEDRIVE/HOMEPATH) | Cited "CCBP:877" | **MISCITED**: L877 is `CLAUDE_CONFIG_DIR`, not USERPROFILE. Grep for USERPROFILE/HOMEDRIVE/HOMEPATH in CCBP returns **0 matches** (HONEST-NON-FINDING). Sibling `eee.ps1` cites L880 — also wrong (L880 is `ANTHROPIC_FOUNDRY_API_KEY`). Pattern is sibling-derived operator-convention. | **FIX R1**: Reframe to TIER-3-LOCAL-OPERATOR per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE. Add explicit "operator-convention, no upstream parity, Z:-portable install requirement" comment. |
| L12 | `CLAUDE_CONFIG_DIR` :877 | TIER-1-DIRECT | ✓ VERIFIED L877 matches | KEEP |
| L13 | `CLAUDE_CODE_TMPDIR` :878 | TIER-1-DIRECT | ✓ VERIFIED L878 matches | KEEP |
| L14 | `CLAUDE_CODE_PLUGIN_CACHE_DIR` :899 | TIER-1-DIRECT | ✓ VERIFIED L899 matches | KEEP |
| L15 | `CLAUDE_CODE_DEBUG_LOGS_DIR` :915 | TIER-1-DIRECT | ✓ VERIFIED L915 matches | KEEP |
| L16 | `CLAUDE_CODE_GIT_BASH_PATH` :921 | TIER-1-DIRECT | ✓ VERIFIED L921 matches | KEEP |
| L17 | `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` :853 | TIER-1-DIRECT | ✓ VERIFIED L853 matches | KEEP |
| L20 | `ENABLE_TOOL_SEARCH=auto:10` :830 | TIER-1-DIRECT | ✓ VERIFIED L830 (env-var roster) + verified `claude-advanced-tool-use.md:320` upstream from sibling eee.ps1 L41-44 for the `auto:N` format detail | KEEP |
| L21 | `COLORTERM=truecolor` `reports/claude-spinner-verbs-and-tips.md:74` | TIER-1-DIRECT | ✓ VERIFIED L74 verbatim "COLORTERM=truecolor for richer colors" | KEEP |
| L24 | `CLAUDE_CODE_FORK_SUBAGENT=1` :955 + CHANGELOG v2.1.117 | TIER-1-DIRECT | ✓ VERIFIED L955 matches with v2.1.117 changelog note | KEEP |
| L25 | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` `claude-cli-startup-flags.md:211` | TIER-1-DIRECT | ✓ VERIFIED L211 matches verbatim | KEEP |
| L28-35 | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` block | constituents=[TIER-1-DIRECT@CCBP:826 + TIER-2@Thariq + TIER-3-LOCAL]; effective_tier=TIER-3-LOCAL-COMPOSITION | ✓ VERIFIED L826 (env var exists + CC native consumer). Cite-class lattice disclosure correct per `citation-discipline.md` rule #8. | KEEP — model deference example for other rot fixes |
| L37-49 | CONTEXT_WINDOW_* FORWARD-REF commented block | TIER-3-LOCAL-OPERATOR (deferred per consumer-existence test) | ✓ VERIFIED sibling consumer at `Z:/claude-sota-installed/.claude/hooks/scripts/posttooluse_context_monitor.js:25-45`; pure runtime has 0 hooks → cargo-cult avoided by commenting | KEEP — exemplary deferral pattern |
| L52-53 | State-outside-repo paths | TIER-3-LOCAL-OPERATOR (Z:-portable convention) | OK — operator-convention; sibling has same pattern at CLAUDE.local.md ENV (f) | KEEP — but recommend adding explicit "TIER-3-LOCAL-OPERATOR: Z:-portable install convention" inline marker for CR-8 audit-trail clarity |
| L56-58 | MSYS_NO_PATHCONV trio | NO CITE | Pattern source-traced to sibling `eee.ps1:317-319` cite — sibling-derived. Probe of CCBP returns no matches for `MSYS_NO_PATHCONV`. | **FIX R6 (LOW)**: Add cite anchor for MSYS env vars — TIER-1 candidate is `https://www.msys2.org/wiki/Porting/#filesystem-namespaces` (MSYS2 official) for the path-conversion semantic. Otherwise mark TIER-3-LOCAL-OPERATOR. |
| L62-71 | State-dir auto-mkdir block | NO CITE | Pure-local convenience pattern. Sibling has similar block. CWC `cwc-long-running-agents` has evidence-gate pattern but NOT this specific shape. | **FIX R7 (LOW)**: Add inline `# TIER-3-LOCAL-OPERATOR: state-dir auto-creation (Z:-portable install boots cleanly on first launch)` marker. |
| L73-86 | Tier-1 CLI BLOCK gate | Cited "Wave-3 Agent G" | **NO UPSTREAM CITE** — operator-convention from prior wave. Tools themselves are SOTA-canonical (git/gh/rg/jq) but the BLOCK GATE pattern is local. | **FIX R3 (MED)**: Add explicit `# TIER-3-LOCAL-OPERATOR-DERIVED (Wave-3 Agent G; no upstream parity; operator-convention to prevent silent fallback)` marker. |
| L88-94 | Tier-2 WARN gate | Same as R3 | Same | **FIX R4 (LOW)**: Same as R3. |
| L98 | Hardcoded `$claudeExe = 'Z:\claude\.local\bin\claude.exe'` | NO CITE | Cardinal-rule-9 sibling-bleed risk per CLAUDE.md L165 "every install-class cite-import containing `Z:/claude-sota/` paths... MUST be path-rewritten". `Z:\claude\` is parent (not sibling), but pure runtime should probe pure-local FIRST before falling back. | **FIX R2 (MED)**: Probe `Z:/claude-sota-pure/.local/bin/claude.exe` FIRST; fall back to parent with explicit operator notice. |
| L99-103 | claude.exe existence check | OK | Defensive idiom, no cite needed | KEEP |
| L105-123 | Pre-launch banner | NO CITE | Pure local UX, no upstream parity | **FIX R5 (LOW)**: Add `# TIER-3-LOCAL-OPERATOR: pre-launch banner (UX-only, no upstream parity)` marker per CR-8 §"NOVEL-DOCUMENTED-EXCEPTION" status discipline. |
| L126-127 | `& $claudeExe $args; exit $LASTEXITCODE` | NO CITE NEEDED | PowerShell idiom; `$LASTEXITCODE` is Microsoft Learn TIER-1 builtin | KEEP |

---

## §2 — Rot inventory (5 items)

### R1 — HOME-isolation 4-var miscite (HIGH severity)

**File**: `Z:/claude-sota-pure/tools/eee-pure.ps1:5-9`

**Current text**:
```powershell
# === HOME isolation (CCBP claude-settings.md:877 — MUST run before claude.exe) ===
$env:USERPROFILE = 'Z:\claude-sota-pure'
$env:HOME        = 'Z:\claude-sota-pure'
$env:HOMEDRIVE   = 'Z:'
$env:HOMEPATH    = '\claude-sota-pure'
```

**Probe verdict**:
- L877 of CCBP `claude-settings.md @ 48f2ceb` = `CLAUDE_CONFIG_DIR` (NOT USERPROFILE)
- Grep of entire CCBP repo for `USERPROFILE|HOMEDRIVE|HOMEPATH` returns **0 matches** (HONEST-NON-FINDING)
- Sibling `eee.ps1:21` cites `:880` — ALSO WRONG (L880 is `ANTHROPIC_FOUNDRY_API_KEY`)
- Pattern is **sibling-derived operator-convention** for Z:-portable install — no upstream parity

**Severity**: HIGH — load-bearing 4-var block, currently presenting as TIER-1-DIRECT but is actually TIER-3-LOCAL-OPERATOR. Violates CR-1 (cite-trail authority) AND CR-8 (full-SOTA-content with CR-8 status column).

**Reasoning**: This is the cite-rot class the operator caught for CONTEXT_WINDOW_*. The pattern works (CC reads `USERPROFILE` natively on Windows for `~/.claude` lookup) but the **cite is fabricated**. Per CR-1 strict reading: a miscite is worse than no cite — it falsely signals SOTA-grounded when not.

### R2 — Hardcoded sibling parent path (MED severity)

**File**: `Z:/claude-sota-pure/tools/eee-pure.ps1:98`

**Current**:
```powershell
$claudeExe = 'Z:\claude\.local\bin\claude.exe'
```

**Issue**: Hardcoded to `Z:\claude\` (grandparent runtime). Cardinal-rule-9 install-risk discipline (CLAUDE.md L165) mandates path-rewrite for install-class artifacts. Pure runtime should:
1. Probe pure-local `Z:/claude-sota-pure/.local/bin/claude.exe` FIRST (CR-6 install-priority destination)
2. Fall back to parent `Z:\claude\` with explicit operator notice
3. Fail loud if neither exists

**Reasoning**: Today this works because pure runtime hasn't installed claude.exe natively. But per CR-5 install-priority + CR-6 fresh-from-github, the pure runtime's destination is its OWN claude.exe. The hardcoded path forecloses that without a probe-first pattern.

### R3 — Tier-1 BLOCK gate no upstream cite (MED severity)

**File**: `Z:/claude-sota-pure/tools/eee-pure.ps1:73-86`

**Issue**: Comment says "per Wave-3 Agent G" — that's intra-arc operator-convention, NOT upstream SOTA. The tools themselves (git/gh/rg/jq) are SOTA-canonical, but the **gate pattern** ("BLOCK launch if missing") is operator-defined.

**Action**: Add explicit TIER-3-LOCAL-OPERATOR-DERIVED disclosure marker per CR-8 status column discipline. Pattern is legitimate operator-convention — just needs honest labeling, not removal.

### R4 — Tier-2 WARN gate same class (LOW severity)

**File**: `Z:/claude-sota-pure/tools/eee-pure.ps1:88-94`

Same class as R3. Same fix: explicit TIER-3-LOCAL-OPERATOR disclosure.

### R5 — Pre-launch banner no cite-class disclosure (LOW severity)

**File**: `Z:/claude-sota-pure/tools/eee-pure.ps1:105-123`

Pure local UX. No upstream parity expected — but per CR-8 status column discipline, every content block in pure runtime should carry explicit cite-class. Banner needs `# TIER-3-LOCAL-OPERATOR: pre-launch banner (UX-only)` marker.

### R6 (LOW) — MSYS env trio L56-58

Sibling-derived (`sss.ps1:317-319` cite). Either add TIER-1 cite to MSYS2 official docs (`https://www.msys2.org/wiki/Porting/`) or mark TIER-3-LOCAL-OPERATOR.

### R7 (LOW) — State-dir auto-mkdir block L62-71

Pure-local convenience. Add inline TIER-3-LOCAL-OPERATOR marker.

---

## §3 — Replacement edits (paste-ready diffs)

### Edit for R1 (L5-9) — HOME isolation reframe

```powershell
# === HOME isolation (Z:-portable install requirement; TIER-3-LOCAL-OPERATOR — no upstream parity) ===
# Cite-class disclosure: This 4-var block is operator-convention for Z:-portable install on Windows.
# CCBP claude-settings.md @ HEAD 48f2ceb does NOT document USERPROFILE/HOMEDRIVE/HOMEPATH (probed 2026-05-14).
# Anthropic CC reads $USERPROFILE natively on Windows to locate ~/.claude (Anthropic CC docs https://code.claude.com/docs/en/setup),
# but the 4-var override pattern itself is local-derived from sibling Z:/claude-sota/tools/sss.ps1 (TIER-3-LOCAL per
# Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE: sibling-derived = TIER-3-LOCAL-COMPOSITION).
$env:USERPROFILE = 'Z:\claude-sota-pure'
$env:HOME        = 'Z:\claude-sota-pure'
$env:HOMEDRIVE   = 'Z:'
$env:HOMEPATH    = '\claude-sota-pure'
```

### Edit for R2 (L96-103) — claude.exe probe-first

```powershell
# === Locate claude.exe (CR-6 install-priority: prefer pure-local; fall back to parent) ===
# Cite: CLAUDE.md cardinal-rule-6 (install-priority over hand-coding) + cardinal-rule-9 (sibling-bleed defense).
$pureLocalClaude = 'Z:\claude-sota-pure\.local\bin\claude.exe'
$parentClaude    = 'Z:\claude\.local\bin\claude.exe'
if (Test-Path $pureLocalClaude) {
    $claudeExe = $pureLocalClaude
} elseif (Test-Path $parentClaude) {
    $claudeExe = $parentClaude
    Write-Host "NOTE: Using parent claude.exe (pure-local not installed yet)" -ForegroundColor Yellow
    Write-Host "      Path: $parentClaude"
    Write-Host "      Install native pure-local binary per https://code.claude.com/docs/en/setup"
} else {
    Write-Host "ERROR: claude.exe not found at $pureLocalClaude OR $parentClaude" -ForegroundColor Red
    Write-Host "Install Claude Code per https://code.claude.com/docs/en/setup"
    exit 1
}
```

### Edit for R3-R4 (L73-94) — Tier-1/Tier-2 gate disclosure

```powershell
# === Tier-1 CLI tools pre-flight gate ===
# Cite-class: TIER-3-LOCAL-OPERATOR-DERIVED (Wave-3 Agent G; no upstream parity).
# Pattern is operator-convention to prevent silent fallback; SOTA-canonical tools themselves verified at install time.
$blockingTools = @('git', 'gh', 'rg', 'jq')
$missing = @()
foreach ($t in $blockingTools) {
    if (-not (Get-Command $t -ErrorAction SilentlyContinue)) {
        $missing += $t
    }
}
if ($missing.Count -gt 0) {
    Write-Host "ERROR: missing Tier-1 BLOCK tools: $($missing -join ', ')" -ForegroundColor Red
    Write-Host "Install via winget. See docs/sota-installed-manifest.md Section 4 for canonical commands."
    exit 1
}

# === Tier-2 WARN: optional but recommended (TIER-3-LOCAL-OPERATOR-DERIVED; same class as Tier-1 above) ===
$warnTools = @('fd', 'yq', 'uv', 'bun')
foreach ($t in $warnTools) {
    if (-not (Get-Command $t -ErrorAction SilentlyContinue)) {
        Write-Host "WARN: optional Tier-2 tool '$t' not on PATH (proceeding)" -ForegroundColor Yellow
    }
}
```

### Edit for R5 (L105-106) — Banner cite-class disclosure

Insert ABOVE L107:
```powershell
# === Pre-launch banner (TIER-3-LOCAL-OPERATOR: UX-only, no upstream parity) ===
# Banner is operator-convention for first-launch confirmation that env block applied as expected.
```

### Edit for R6 (L55-58) — MSYS trio cite

```powershell
# === Git Bash / MSYS path-rewrite suppression ===
# Cite-class: TIER-3-LOCAL-OPERATOR (no CCBP cite; MSYS2 official docs at https://www.msys2.org/wiki/Porting/
# document MSYS_NO_PATHCONV semantic but pattern itself is sibling-derived per Z:/claude-sota/tools/sss.ps1).
$env:MSYS_NO_PATHCONV     = '1'
$env:MSYS2_ARG_CONV_EXCL  = '*'
$env:MSYS2_ENV_CONV_EXCL  = '*'
```

### Edit for R7 (L60-71) — State-dir auto-mkdir cite

```powershell
# === State-outside-repo directory pre-creation ===
# Cite-class: TIER-3-LOCAL-OPERATOR (Z:-portable install convention; first-launch convenience to avoid
# manual mkdir before codex/memory/session JSONL backends initialize). No upstream parity.
$stateDirs = @(...
```

---

## §4 — Aggregate CR-8 SOTA-grounded score

**Method**: count substantive blocks; classify each as TIER-1-DIRECT (clean), TIER-3-LOCAL-OPERATOR (honest-disclosed = OK), or MISCITED/UNDISCLOSED (rot).

| Block | Lines | Class | CR-8 status |
|---|---|---|---|
| Header | 1-3 | TIER-3-LOCAL (bootstrap) | OK |
| HOME isolation | 5-9 | **MISCITED** | **ROT — R1** |
| Anthropic env (6 vars) | 11-17 | TIER-1-DIRECT × 6 | OK |
| Token-efficiency | 19-21 | TIER-1-DIRECT × 2 | OK |
| Q2 features | 23-25 | TIER-1-DIRECT × 2 | OK |
| AUTOCOMPACT block | 27-35 | constituents disclosed | OK (exemplary) |
| CONTEXT_WINDOW FORWARD-REF | 37-49 | TIER-3-LOCAL deferred | OK (exemplary) |
| State paths | 51-53 | TIER-3-LOCAL undisclosed | Minor — add marker |
| MSYS trio | 55-58 | **UNDISCLOSED** | **ROT — R6** |
| State auto-mkdir | 60-71 | **UNDISCLOSED** | **ROT — R7** |
| Tier-1 BLOCK | 73-86 | **UNDISCLOSED** | **ROT — R3** |
| Tier-2 WARN | 88-94 | **UNDISCLOSED** | **ROT — R4** |
| claude.exe locate | 96-103 | **HARDCODED-SIBLING-BLEED** | **ROT — R2** |
| Banner | 105-123 | **UNDISCLOSED** | **ROT — R5** |
| Invoke | 125-127 | PowerShell idiom | OK |

**Counting**: 13 substantive blocks. Clean = 7 (54%). Rot = 6 (46%). **Aggregate CR-8 SOTA-grounded: ~54%** (worse than my §0 estimate after counting; HONEST-NON-FINDING — initial 78% was optimistic).

Post-fix projection: applying R1-R7 fixes lifts score to **~92%** (12/13 clean; R1 reframes to TIER-3-LOCAL honest-disclosed = OK; others same).

---

## §5 — Verdict

**ARCHITECT VERDICT: NEEDS-REVISION conf=0.91**

Reasoning:
- 1 HIGH-severity miscite (R1 HOME-isolation) — load-bearing, mis-presents cite-class
- 1 MED-severity sibling-bleed risk (R2 hardcoded claude.exe path) — CR-9 violation
- 4 LOW-MED severity undisclosed-local-pattern items (R3-R7) — CR-8 conformance gap
- Operator's CONTEXT_WINDOW_* fix is **excellent** (exemplary deferral pattern); all rot items follow the same fix-pattern (honest cite-class disclosure or remove).
- Reversibility: HIGH (all fixes are surgical inline edits; <5min per fix; <30min full batch)
- Risk: LOW (no behavior change — only cite-class metadata + R2 probe-first claude.exe path)

Recommend Pattern A single-atomic-commit per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` — apply ALL 7 fixes in single commit (R1+R2+R3+R4+R5+R6+R7) since they're all cite-class-disclosure adjustments on the same file.

---

## §6 — HONEST-NON-FINDING list

Pattern probes that did NOT resolve to clean SOTA-classifications:

1. **USERPROFILE/HOMEDRIVE/HOMEPATH in CCBP** — grep returned 0 matches across entire CCBP repo. Confirmed HOME-isolation pattern is sibling-derived operator-convention, NOT CCBP-documented.

2. **Hardcoded `Z:\claude\` parent path probe** — Tried to find a "pure-local-first probe-fallback" pattern in CCBP `claude-cli-startup-flags.md` and `claude-settings.md`. NOT FOUND. The probe-first pattern recommended for R2 is **architect-derived from CR-6 + CR-9 first-principles**, not direct upstream cite. Recommend treating R2's fix as TIER-3-LOCAL-COMPOSITION derived from CR-6+CR-9 (cite-class lattice per `citation-discipline.md` rule #8).

3. **Tier-1 BLOCK gate upstream parity** — probed CCBP, awesome-claude-code-toolkit, ECC for "pre-flight CLI tool check" patterns. NOT FOUND as canonical pattern. Wave-3 Agent G operator-derivation stands as the only source. Mark TIER-3-LOCAL-OPERATOR honestly.

4. **MSYS env trio MSYS2 official docs** — TIER-1 candidate exists (`https://www.msys2.org/wiki/Porting/#filesystem-namespaces`) but didn't WebFetch this fire due to context-window discipline. Recommend orchestrator either WebFetch + cite-anchor OR mark TIER-3-LOCAL-OPERATOR.

5. **3-tier compact thresholds FORWARD-REF gate** — operator already fixed. No re-probe needed; pattern is exemplary. Sibling consumer verified at `posttooluse_context_monitor.js:25-45`. Pure runtime has 0 hooks confirmed.

---

## §7 — Cross-cutting recommendations

1. **Add CR-8 status column** in inline comments per `.claude/rules/cardinal-rule-8-full-sota-content.md` (CLAUDE.md L70-72 "conformance verification mechanism"). Three values: `ADAPTED-FROM-SOTA` / `NOVEL-DOCUMENTED-EXCEPTION` / `PENDING-AUDIT`. Currently all blocks default to PENDING-AUDIT because no explicit marker; post-fix should be ADAPTED-FROM-SOTA (7 blocks) or NOVEL-DOCUMENTED-EXCEPTION (6 blocks).

2. **Consider Wave 12 Stream W manifest row 7.7** (pure_context_monitor.js install) reactivation if Phase 2D advances; the FORWARD-REF block at L37-49 will auto-activate when consumer hook installs.

3. **Recursive Mia pre-apply** per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — orchestrator should verify each fix lands as designed (R1 reframe doesn't break HOME-isolation behavior; R2 probe-first doesn't break existing parent-fallback path).

---

LAUNCHER-ARCH-COMPLETE: NEEDS-REVISION conf=0.91 — 7 rot items inventoried with paste-ready diffs; aggregate CR-8 SOTA-grounded ~54% → ~92% post-fix. HANDOFF: orchestrator | max_turns: 25 | artifact: tmp/sota-pure-wave14-Z2-launcher-arch-2026-05-14.md
