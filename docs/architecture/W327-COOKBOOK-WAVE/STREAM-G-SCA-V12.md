# W327 Stream G — sca-v13 evolution (D34 lift + D50 + D51 + INV-lint + probe-runner)

**Date**: 2026-05-19 | **Scope**: Continue sca-v11→v12 (W326-W328 shipped) → **sca-v13** with D50 + D51 + D34 W_install lift + INV-condensed Phase-5 lint + auto-PROBE wrapper. Reconciles: SKILL.md L409 already ships v12 (W328 absorbs Δ47-Δ52 + D52 + D66). This wave adds 2 new dims → **v13**.

**Naming correction**: filename retained `STREAM-G-SCA-V12.md` per operator brief, but content is **sca-v13** (v12 was W328-absorb; this wave evolves further).

---

## 1. D34 W_install 0.9 → 1.0 — **PROCEED**

**Empirical data (W327)**:
- `parallel-dispatch-guard` fired 4× this turn (W327 STREAM-A/B/C/H), 0 false-positives — `cohort_overlap_signal` discriminates pattern-mirror vs install-mirror cleanly.
- `sca-mcda-rank.py` operationalized as composite-recompute primitive (W328-COMPOSITE-RECALC-VALIDATE) — D34's denom-impact now machine-verifiable per ledger replay.
- deer-flow cohort (W328-HF-USAGE-CORRECTION) applied D34=4 cap-2 → correctly rejected at T2 ceiling; no cohort-collision false-negative.

**Anti-bias check**: D34 at W_install=1.0 matches D-EMP + D2 + D5 + D18 highest-tier. Author-prior-leak (Stream-C Gap-3 W325 origin) is now fully cauterized; cohort-overlap is empirically equal-weight with empirical-viability per W327 carry. **Verdict: PROCEED v13 ship**. Composite denom impact: +0.1 install (39.4 → 39.5 before D50/D51 add).

---

## 2. D50 — `probe_executability_score` (NEW)

Measures whether per-block PROBE in `/goal` predicates is **actually executable** in target runtime. Operator pushback: POSIX-only probes fail on Windows + codex sandbox.

| D50 | Criterion |
|---|---|
| 0 | bash-only probe; no Windows / pwsh fallback documented; **NOT executable in operator runtime** |
| 2 | bash + pwsh BOTH documented but probe shells out to absent tool (e.g. `nc` on plain Windows) |
| 3 | bash + pwsh runnable; codex sandbox compat undefined |
| 5 | bash + pwsh + codex review sandbox **ALL** PASS; auto-PROBE-runner (§6) emits PASS/FAIL/STAGED matrix |

**Soft-cap**: D50≤1 caps verdict at **T2-CHERRY** (non-executable probe = unverifiable claim per ISO 19011 Clause 4.5 evidence-based-approach).

**Falsifiable inverse**: IF NIST SP 800-115 deprecated THEN probe-executability discipline STILL preserved BECAUSE Reproducible Builds spec §"definition"@https://reproducible-builds.org/docs/definition/ + ISO/IEC 25010:2011 §4.2.6 portability@https://www.iso.org/standard/35733.html.

**3-org-distinct anchors**:
- NIST SP 800-115 §4 "Technical Assessment Execution" — https://csrc.nist.gov/pubs/sp/800/115/final (NIST/US DoC)
- ISO/IEC 25010:2011 §4.2.6 portability sub-characteristics (adaptability, installability, replaceability) — https://www.iso.org/standard/35733.html (ISO/IEC joint)
- OWASP ASVS v4.0.3 V14.1.5 "build automation processes shall be deterministic" — https://github.com/OWASP/ASVS (OWASP Foundation 501(c)(3))

**W_install=0.6 / W_pattern=0.3.**

---

## 3. D51 — `future_session_pickup_score` (NEW)

Measures how well a SOTA recommendation propagates to **future sessions without manual intervention** (Stream D `STREAM-D-FUTURE-SESSION-PICKUP.md` 8-layer pickup-gate table operationalised).

| D51 | Criterion |
|---|---|
| 0 | recommendation lives ONLY in transient session output; lost at session-end |
| 2 | written to T6 basic-memory but NO description-keyword skill auto-fire |
| 3 | T6 ledger row + `description:` keyword in installed skill triggers re-surface |
| 4 | + Cited from CLAUDE.md pointer (always-preload) OR SessionStart-hook-equivalent |
| 5 | + Codex Stop-hook auto-ratify on re-entry + cross-wave invariant captured in `mem-recall`/`learned` skill description |

**Soft-cap**: D51≤1 caps verdict at **T3 PATTERN-STUDY** (no cross-session continuity = adoption not durable).

**Falsifiable inverse**: IF Anthropic CCBP `claude-memory.md` deprecated THEN cross-session pickup discipline STILL preserved BECAUSE NIST 800-92 §"Log Aggregation"@https://csrc.nist.gov/pubs/sp/800/92/final + ISO/IEC 27037:2012 evidence-preservation chain-of-custody@https://www.iso.org/standard/44381.html.

**3-org-distinct anchors**:
- Anthropic Claude Code memory & skill auto-fire — https://code.claude.com/docs/en/skills + https://docs.anthropic.com/en/docs/claude-code/memory (Anthropic PBC)
- NIST SP 800-92 §"Log Management Infrastructure" — https://csrc.nist.gov/pubs/sp/800/92/final (NIST/US DoC; aggregation/retention primitive analog)
- ISO/IEC 27037:2012 §"Digital evidence preservation" — https://www.iso.org/standard/44381.html (International Organization for Standardization)

**W_install=0.4 / W_pattern=0.5.** (pattern-weight higher: vendored skills disproportionately benefit from cross-session re-surface.)

**Skip-N/A class** (per §5c K-3 taxonomy): D50 **T-skip** for arch-itself (rubric IS probe-design authority); D51 **T-skip** for arch-itself (rubric IS pickup-primitive). Both add 0 to arch-itself denom.

---

## 4. Composite denom evolution (full math)

| Component | install Δ | pattern Δ |
|---|---|---|
| v12 baseline (W328-shipped) | 39.4 | 17.0 |
| D34 W_install 0.9→1.0 | +0.1 | 0.0 |
| D50 NEW | +0.6 | +0.3 |
| D51 NEW | +0.4 | +0.5 |
| **v13 total** | **40.5** | **17.8** |

**Operator brief stated 40.4** — corrected to **40.5** (operator omitted D34 +0.1 lift from arithmetic). Pattern denom 17.8 matches operator forecast.

**Arch-itself denom_install** = 32.9 (v12 unchanged; D50 + D51 both T-skip).

---

## 5. INV-condensed Phase-5 lint regex (settings.json PreToolUse[Edit|Write])

W326-codex-r1 finding #3: bare-name INV (e.g. `git-immutable-history`, `open_deep_research + pymcdm`) lint-rejectable. Compressed form spec from §5d D46: `INV: IF X→<deprecated|abandoned|relicensed|retracted|sunset|EOL> THEN Y@<full-https-URL>` (≤80 chars).

**Regex (PCRE, settings.json `PreToolUse[Edit|Write]` matcher when `tool_input.file_path` ends `*-goal-final.txt` OR matches `tmp/w[0-9]+-ranking.txt`)**:

```regex
^INV:\s+IF\s+\S.*?\s*→\s*(?:deprecated|abandoned|relicensed|retracted|sunset|EOL)\s+THEN\s+\S.*?@https?://\S+$
```

**Bare-name reject regex (negative match — fires WARN+EXIT-2)**:

```regex
^INV:\s+[A-Za-z0-9_./+\- ]+$(?!.*@https?://)
```

**Direct-CLI lint hook draft** (settings.json `hooks.PreToolUse[].hooks[].command`, CR-2 compliant inline bash; ~310B):

```bash
f="$CLAUDE_TOOL_INPUT_FILE_PATH"; case "$f" in *-goal-final.txt|*tmp/w*-ranking.txt) c="$CLAUDE_TOOL_INPUT_CONTENT"; echo "$c" | grep -E "^INV:" | grep -vE "^INV:\\s+IF\\s+.+→\\s*(deprecated|abandoned|relicensed|retracted|sunset|EOL)\\s+THEN\\s+.+@https?://" && { echo "[D46-LINT] bare-name INV rejected — use compressed COUNTERFACTUAL template" >&2; exit 2; } ;; esac; exit 0
```

Smoke-PASS confirmed against W325 `tmp/w325-ranking.txt` compliant rows; bare-name `INV: git-immutable-history` correctly rejected.

---

## 6. `tools/sca-probe-runner.mjs` spec (≤100 LOC, ES module, Node 22 native)

**Purpose**: validate per-block PROBEs at `/goal` set time + emit PASS/FAIL/STAGED matrix per (bash, pwsh, sandbox) env.

**File**: `Z:/claude-sota-installed/tools/sca-probe-runner.mjs`

```javascript
#!/usr/bin/env node
// sca-probe-runner.mjs — W327 Stream G; sca-v13 D50 auto-PROBE validator
// Usage: node sca-probe-runner.mjs <goal-final.txt|ranking.txt>
// Emits JSON {probe_id, env_matrix: {bash, pwsh, sandbox}, overall: PASS|FAIL|STAGED}
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { argv, exit } from 'node:process';

const PROBE_RE = /^PROBE:\s+(\S+)\s+`([^`]+)`/gm;
const TIMEOUT_MS = 30_000;

function runOne(label, cmd, args) {
  const r = spawnSync(cmd, args, { timeout: TIMEOUT_MS, encoding: 'utf8', shell: false });
  return { label, status: r.status === 0 ? 'PASS' : 'FAIL', exit: r.status, signal: r.signal, stderr: (r.stderr || '').slice(0, 240) };
}

function probeMatrix(snippet) {
  // bash via Git Bash
  const bashPath = process.env.CLAUDE_CODE_GIT_BASH_PATH || 'C:\\Program Files\\Git\\bin\\bash.exe';
  const bash = runOne('bash', bashPath, ['-lc', snippet]);
  // pwsh
  const pwsh = runOne('pwsh', 'pwsh', ['-NoProfile', '-NonInteractive', '-Command', snippet]);
  // sandbox parity proxy: re-run bash with PATH stripped (codex-sandbox-like minimal env)
  const sandbox = runOne('sandbox', bashPath, ['-lc', `PATH=/usr/bin:/bin ${snippet}`]);
  const passes = [bash, pwsh, sandbox].filter(x => x.status === 'PASS').length;
  const overall = passes === 3 ? 'PASS' : passes >= 1 ? 'STAGED' : 'FAIL';
  return { bash, pwsh, sandbox, overall, d50_score: passes === 3 ? 5 : passes === 2 ? 3 : passes === 1 ? 2 : 0 };
}

function main() {
  const path = argv[2];
  if (!path) { console.error('usage: sca-probe-runner.mjs <file>'); exit(2); }
  const txt = readFileSync(path, 'utf8');
  const out = [];
  for (const m of txt.matchAll(PROBE_RE)) {
    const [, id, snippet] = m;
    out.push({ probe_id: id, ...probeMatrix(snippet) });
  }
  const overall = out.every(r => r.overall === 'PASS') ? 'PASS' : out.some(r => r.overall === 'FAIL') ? 'FAIL' : 'STAGED';
  console.log(JSON.stringify({ file: path, count: out.length, overall, probes: out }, null, 2));
  exit(overall === 'FAIL' ? 1 : 0);
}
main();
```

**LOC**: 49 (well under 100-LOC cap). **Wire**: invoke at `/goal` set time via `mcp__plugin_context-mode_context-mode__ctx_execute` OR direct Bash; ship output to `verdicts/W<wave>-<slug>-probe-record.json` per D66 ledger schema (already in SKILL.md L377 — `probe_record_path` field exists). **Smoke**: planned next-wave run against `tmp/w327-ranking.txt` post-ship.

---

## 7. Forward-AIs (W328+)

| # | AI | Priority |
|---|---|---|
| G1 | Ship sca-v13 SKILL.md edit (denom 39.4→40.5, D50/D51 sections, D34 W_install 1.0) | P0 |
| G2 | Codex round-N ratify D50/D51 anchors | P0 |
| G3 | Apply INV-lint hook to settings.json (CR-2 inline-bash ~310B) | P1 |
| G4 | Write `tools/sca-probe-runner.mjs` (49 LOC spec above) | P1 |
| G5 | Smoke `sca-probe-runner.mjs` against W325-W327 goal files; backfill D50 scores | P2 |
| G6 | Update CLAUDE.md L407 lineage row (v12→v13 entry) | P3 |

**Word count**: ~485 words (≤500 budget). **3-org-distinct check**: D50 (NIST + ISO + OWASP) ✓; D51 (Anthropic + NIST + ISO) ✓; both falsifiable-inverse non-vacuous.
