# W314 Stream A — Operator Action-Items (Paste-Ready Diffs)

**Wave**: W314 · **Stream**: A
**Date**: 2026-05-19
**Synthesis layer note**: this file lists every change Stream A proposes. Stream A does NOT apply edits to `.claude/settings.json`, `.mcp.json`, or `CLAUDE.md` directly — the parent synthesis layer applies them after cross-stream consensus.

---

## §1 Priority-ordered backlog

### **AI-1 (HIGH) — Replace NSSM cognee with uvx stdio**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-NSSM-REPLACEMENT.md` §3-§5

**File**: `.mcp.json`

**Action**:
1. Replace cognee block per W314-A-NSSM-REPLACEMENT §4.1.
2. After verification, tear down NSSM per §4.2.
3. Update CLAUDE.md L35 per §4.3.

**Smoke gate**: operator must run §4.1 smoke probe A or B BEFORE committing.

**Reversible**: yes, per §4.4.

**Operator confirm required**: yes (smoke-probe outcome dictates final invocation string).

---

### **AI-2 (HIGH) — Close W312-A.7 (cognee data-dir cite drift)**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §4 F1

**File**: `CLAUDE.md` L35

**Paste-ready diff**:

```diff
- T3 cognee ✓ ACTIVE (NSSM `:8000/mcp`; data-dir cite `C:/Users/42/.cognee` **VERIFIED MISSING on disk per W312-A §4 A.7** — operator-AI-W312-A-7: inspect NSSM `PathName` and refresh cite to actual data-dir)
+ T3 cognee ✓ ACTIVE (uvx-stdio `cognee==1.1.0` post-W314 NSSM removal; data-dir `Z:/claude-sota-installed-state/.cognee` per CLAUDE.local.md state-outside-repo redirect — closes W312-A.7)
```

**Note**: This depends on AI-1 landing first. If operator rejects AI-1, the data-dir cite still needs fixing to `Z:/claude-sota-installed-state/.cognee` (NSSM remains, only the cite is wrong).

**Reversible**: yes (text-only edit).

---

### **AI-3 (MEDIUM) — Close W312-A.10 (CCBP cite SHA refresh)**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §2 + §4 F2

**Files**: `CLAUDE.md` L3 + `CLAUDE.local.md` L3

**Paste-ready diff (CLAUDE.md L3)**:

```diff
- > Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 1386b0e` [VERIFIED 2026-05-18 W288 Stream H-1 + W288-P3 wave]
+ > Per CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2ceb` [VERIFIED 2026-05-19 W314 Stream A — content-stable between 1386b0e and 48f2ceb; remote origin/HEAD is 48798ca, 3 commits ahead, no impact on cited L34-40 anchor]
```

**Paste-ready diff (CLAUDE.local.md L3)**:

```diff
- > Loaded via CCBP `claude-memory.md:113 @ ac0d87d` — CLAUDE.local.md holds per-machine preferences; gitignored, NEVER commit.
+ > Loaded via CCBP `claude-memory.md:113 @ 48f2ceb` (W314 refresh from ac0d87d — content-stable at L113) — CLAUDE.local.md holds per-machine preferences; gitignored, NEVER commit.
```

**Reversible**: yes (text-only).

---

### **AI-4 (MEDIUM) — Close W311 C-A (plugin count drift)**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §4 F3 + §5

**File**: `CLAUDE.md` L34

**Paste-ready diff**:

```diff
- - **Harness wired**: 64 plugins installed (W254 §3 behavioral set live; W281 audit 2026-05-18; W311 count refresh 2026-05-19); `.claude/settings.json` hooks are direct-CLI invocations (gitleaks·ruff·shellcheck·git — cardinal-rule-2-compliant); pre-commit security gate runs every commit; plugin skills auto-fire per `description:` match.
+ - **Harness wired**: 47 plugins enabled / 21 disabled (68 listed across 18 marketplaces; W314 audit 2026-05-19); `.claude/settings.json` hooks are direct-CLI invocations (gitleaks·ruff·shellcheck·git — cardinal-rule-2-compliant); pre-commit security gate runs every commit; plugin skills auto-fire per `description:` match.
```

**Note**: The "64" was a count that may have meant "enabled" + a 17-disabled co-set at W311. Today's actuals are 47/21/68. The count refresh is hygienic.

**Reversible**: yes (text-only).

---

### **AI-5 (MEDIUM) — Close W295 graphiti "preserved-for-inspection" stale clause**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §4.2

**File**: `CLAUDE.md` L36

**Paste-ready diff**:

```diff
- T4 `graphiti` **✗ RETIRED** (W272+W290+W295 AI-5; `settings.json:disabledMcpjsonServers` now includes `graphiti`; `.mcp.json:64-77` block preserved for inspection; FalkorDB+Ollama can be stopped)
+ T4 `graphiti` **✗ RETIRED** (W272+W290+W295 AI-5; block excised from `.mcp.json` in W313 Stream A `5a350d1`; `disabledMcpjsonServers: []` post-cleanup; FalkorDB+Ollama+Phoenix services confirmed STOPPED W314)
```

**Reversible**: yes (text-only).

---

### **AI-6 (LOW) — Close W300-AI-1 / W312-A.8 (memory.exe retire-candidate)**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §4.2

**File**: `CLAUDE.md` L29

**Paste-ready diff**:

```diff
- **W300-AI-1 corollary** (added W308, W312-A clarified): the disabled `memory` MCP entry's local-`.exe` `.mcp.json` invocation (`Z:/venvs/claude/Scripts/memory.exe`) is a P0C-CR-9-exception case retained-as-dormant in `disabledMcpjsonServers`; the live `basic-memory` MCP uses CR-9-compliant `uvx --from basic-memory==0.21.1` (no .exe). Per W300-AUDIT §3 the disabled `memory.exe` block can be deleted entirely at next housekeeping wave.
+ **W300-AI-1 closure W314**: the dormant `memory` MCP entry (Z:/venvs/claude/Scripts/memory.exe invocation) was excised from `.mcp.json` in W313 Stream A `5a350d1` (16→10 mcpServers; `disabledMcpjsonServers: []`); `memory.exe` binary may still be removed from `Z:/venvs/claude/Scripts/` at next housekeeping (operator-decision, not runtime-blocking).
```

**Reversible**: yes (text-only).

---

### **AI-7 (LOW) — Housekeeping: `installed_plugins.json` + `known_marketplaces.json` git-churn**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §4.2 + §5

**Files**: `.gitignore` (proposed addition)

**Proposed paste-ready diff**:

```diff
+ # W314 — runtime plugin state (lastUpdated timestamps churn every CC session)
+ .claude/plugins/installed_plugins.json
+ .claude/plugins/known_marketplaces.json
```

**Alternative**: accept the churn-noise tradeoff. Each `lastUpdated` tick produces a 2-3 line git-diff that is noisy but harmless.

**Recommendation**: **DEFER to W315 — operator decision**. Both options are defensible. Current state (tracked) gives a historical audit trail; gitignored gives clean `git status`.

**Reversible**: yes (revert .gitignore edit + `git add` the files back).

---

### **AI-8 (INFO) — Close W310-γ / W312-B-3 (chrome-devtools-mcp drift)**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §4 F4

**Action**: NONE. The drift does not exist — upstream `chrome-devtools-mcp` latest tag at `https://github.com/ChromeDevTools/chrome-devtools-mcp/releases/latest` is **`chrome-devtools-mcp-v0.26.0`** (release id 324329454, fetched 2026-05-19). Local `.mcp.json` pins `chrome-devtools-mcp@0.26.0`. **Exact parity.** The W310-γ "major drift to 1.0.1" was a speculative call-out; 1.0.1 has not shipped.

**File change**: none.

**Disposition**: close W310-γ + W312-B-3 + W313 Stream A finding-7 as **OBSOLETE-RESOLVED — no upstream drift exists**.

---

### **AI-9 (INFO) — Confirm W312-A.6 (Ollama-stopped intent)**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §4 F5

**Probe result**: Ports 16700 (Ollama), 16379 (FalkorDB), 16006 (Phoenix) are all **CLOSED** (Test-NetConnection 2026-05-19). These services are retired per W295 and W302 ledger entries. **All three confirmed-stopped by-design.**

**File change**: AI-5 already updates CLAUDE.md L36 with "STOPPED" phrasing.

**Disposition**: close W312-A.6 as **CONFIRMED-INTENTIONAL**.

---

### **AI-10 (INFO) — ECC marketplace refresh**

**Cite**: `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` §3

**Local lastUpdated**: 2026-05-17T15:16:23.843Z
**Upstream latest commit**: 2026-05-19T00:21:31Z by Jamkris (scheduled refresh)

**Action**: At next housekeeping wave, run `claude plugin update everything-claude-code@everything-claude-code` (or marketplace refresh equivalent). **Not runtime-blocking** — drift is catalog-tick churn, no net-new primitive worth adopting urgently.

**Disposition**: queue for **W315**.

---

## §2 Summary table

| ID | Severity | File | Reversible | Status | Defer-to |
|---|---|---|---|---|---|
| AI-1 | HIGH | `.mcp.json` + NSSM service | yes | NEEDS_CONFIRM (smoke probe required) | W314-synthesis (this wave) |
| AI-2 | HIGH | `CLAUDE.md` L35 | yes | READY (depends on AI-1) | W314-synthesis |
| AI-3 | MEDIUM | `CLAUDE.md` L3 + `CLAUDE.local.md` L3 | yes | READY | W314-synthesis |
| AI-4 | MEDIUM | `CLAUDE.md` L34 | yes | READY | W314-synthesis |
| AI-5 | MEDIUM | `CLAUDE.md` L36 | yes | READY | W314-synthesis |
| AI-6 | LOW | `CLAUDE.md` L29 | yes | READY | W314-synthesis or W315 |
| AI-7 | LOW | `.gitignore` | yes | OPERATOR-DECISION | W315 |
| AI-8 | INFO | (no-op closure) | n/a | RESOLVED-AS-OBSOLETE | W314-synthesis (ledger closure) |
| AI-9 | INFO | (no-op closure) | n/a | RESOLVED-CONFIRMED-INTENT | W314-synthesis (ledger closure) |
| AI-10 | INFO | ECC marketplace refresh | yes | QUEUE | W315 |

**Word count this file**: ~1100. Cardinal-rule-1 R1-R5 + cite-discipline preserved throughout.

---

## §3 Files Stream A wrote (file-ownership compliance check)

Stream A files (WRITE OWN):
- `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-RUNTIME-AUDIT.md` ✓
- `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-NSSM-REPLACEMENT.md` ✓
- `docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-OPERATOR-AIS.md` ✓ (this file)

Stream A files (PROPOSE-ONLY, NOT EDITED):
- `.claude/settings.json` cognee block — proposed in AI-1, parent applies
- `.mcp.json` cognee server entry — proposed in AI-1, parent applies
- `CLAUDE.md` cite-SHA refreshes — proposed in AI-2 through AI-6, parent applies

Stream A files (FORBIDDEN — owned by other streams, NOT TOUCHED):
- `.claude/skills/sota-convergence-audit/SKILL.md` (Stream B) — NOT TOUCHED ✓
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` (Stream D) — NOT TOUCHED ✓
- `verdicts/W314-*.md` (Stream D) — NOT TOUCHED ✓
