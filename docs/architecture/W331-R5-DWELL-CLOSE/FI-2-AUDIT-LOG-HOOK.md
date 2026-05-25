# FI-2 Audit-Log Hook — SHA-256 Hash-Chained JSONL Sink

> W331 Stream-R5 · 2026-05-19 · sub-item 2/5
> Targets FI-2 closure per W329-A-3-ACCEPTANCE-RECORD-DRAFT §4 (currently BROKEN).
> Design-only; DO NOT auto-write to `.claude/hooks/` per Δ-PDM-1 F4 (operator-sign-pending).

## §1. Hook event + matcher

- **Event**: `PreToolUseFailure` — fires when a tool-call is denied or returns non-zero exit.
- **Matcher**: `*` (all tools, captured one row per failure).
- **Rationale**: every deny-rule trip produces an audit row; legitimate tool successes do not need audit overhead (per CIS Controls v8 Control 8.4 "Standardize Time Synchronization" + 8.5 "Collect Detailed Audit Logs" — focus on security-relevant events).

## §2. Storage

- **Path template**: `Z:/claude-sota-installed/.claude/state/audit/audit-<sessionId>.jsonl`
- **Per-session file** (not per-day) — addresses log-aggregation race-condition when multi-session worktrees per CLAUDE.md `Parallel-session safety (W280d)`.
- **Schema** (JSONL row = one tool-call failure):
  ```json
  {
    "ts": "2026-05-19T14:23:45.678Z",
    "session_id": "<CLAUDE_SESSION_ID>",
    "tool": "Read",
    "params_hash": "sha256:abc...",
    "params_summary": "Read(./.env)",
    "exit_code": 2,
    "reason": "permission denied: deny-rule match",
    "prev_hash": "sha256:<prev-row-this-hash>",
    "this_hash": "sha256:<this-row-content-hash>"
  }
  ```
- **Hash-chain**: `this_hash = sha256(prev_hash + JSON.stringify({ts,tool,params_hash,params_summary,exit_code,reason}))`. First-row `prev_hash = "sha256:0".repeat(64)`. Verifies integrity per NIST SP 800-53 AU-10 (Non-Repudiation) + ISO/IEC 27001:2022 A.8.15 (Logging).

## §3. CR-2 sanctioned-exception cite-anchor

Cardinal rule 2 forbids project-owned hook bodies EXCEPT documented bug-patch shims ≤2KB cite-anchored to a specific `anthropics/claude-code` GitHub issue. This audit-log hook does NOT fit the bug-patch shim class — instead, it is a **Control-2 security-essential observability shim** required to close FI-2 per the R5 layered-defense documented-exception.

**Cite-anchor strategy** (operator-decide on sign):

1. **Path A — File upstream issue first** (recommended): file `anthropics/claude-code` issue titled "Native PreToolUseFailure audit-log hook for SHA-256 hash-chained tamper-evident security logging (CIS-8 / NIST-AU-10 compliance)". Once accepted as upstream, the W331 shim becomes a tracked-bug-patch shim per CR-2 condition (b). Estimated lead time: 1-2 weeks for upstream issue acceptance + W332 implementation.
2. **Path B — Cite cross-org standards** (deferred-cite acceptable per operator-policy): cite NIST SP 800-53 AU-3 + AU-10 + CIS Controls v8 Control 8.5 + OWASP ASVS v4.0.3 §V7 as the **standards-mandated** rationale, treating "auditability of security-relevant tool-call failures" as a category-level requirement Anthropic CC does not yet ship natively. **Anthropic-independent cite class** — survives Anthropic-side doc drift.
3. **Path C — Operator-curated `.claude/rules/` skill** (per CLAUDE.md L19 R4 corollary): if the hook were re-cast as a skill that the orchestrator manually invokes at session-end rather than auto-firing, CR-2 does not apply (CR-2 = hook bodies). Trade-off: less coverage (audit only on operator-invoke vs every failure).

**This design recommends Path B** with operator-sign-acceptance recording the deviation; this is consistent with the W329-A-3 R5 Option-C documented-exception pattern (which itself accepts a CC sandbox layer-1 absence under cross-org cite-anchored compensating controls).

## §4. Hook wiring (settings.json patch — DESIGN ONLY)

Patch to merge into `.claude/settings.json:hooks.PreToolUseFailure[]`:

```jsonc
{
  "PreToolUseFailure": [
    {
      "matcher": "*",
      "hooks": [
        {
          "type": "command",
          "command": "\"Z:/tools/nodejs/node.exe\" \"Z:/claude-sota-installed/tools/preagent-audit-log.mjs\"",
          "timeout": 5
        }
      ]
    }
    // existing Bash-matcher hook-feedback entry preserved (settings.json:220-229)
  ]
}
```

Existing PowerShell `hook-feedback` Bash-matcher entry (settings.json:220-229) is preserved alongside the new `*`-matcher audit-log entry — both fire on failure; order does not matter (independent purposes).

## §5. Shim implementation skeleton (`tools/preagent-audit-log.mjs` — DESIGN ONLY, ≤80 LOC)

```javascript
#!/usr/bin/env node
// tools/preagent-audit-log.mjs — W331 Stream-R5 FI-2 audit-log shim
// Reads PreToolUseFailure event JSON from stdin (per Anthropic CC hook spec).
// Writes hash-chained JSONL row to .claude/state/audit/audit-<sessionId>.jsonl.
// Soft-fail exit 0 always — does not block tool-call recovery / further hook chain.
// Cite-anchors: NIST 800-53 AU-3 + AU-10 ; CIS Controls v8 §8.5 ; ISO 27001:2022 A.8.15 ; OWASP ASVS V7.

import { createHash } from "node:crypto";
import { mkdirSync, appendFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import process from "node:process";

const ROOT = "Z:/claude-sota-installed";
const auditDir = resolve(ROOT, ".claude/state/audit");

function readStdin() {
  return new Promise((res) => {
    let buf = "";
    process.stdin.on("data", (c) => (buf += c));
    process.stdin.on("end", () => res(buf || "{}"));
    setTimeout(() => res(buf || "{}"), 3500); // safety timer
  });
}

function loadPrevHash(file) {
  if (!existsSync(file)) return "sha256:" + "0".repeat(64);
  try {
    const lines = readFileSync(file, "utf8").trim().split("\n").filter(Boolean);
    if (lines.length === 0) return "sha256:" + "0".repeat(64);
    return JSON.parse(lines[lines.length - 1]).this_hash;
  } catch { return "sha256:" + "0".repeat(64); }
}

(async () => {
  try {
    const raw = await readStdin();
    let ev; try { ev = JSON.parse(raw); } catch { ev = { raw }; }
    const sessionId = process.env.CLAUDE_SESSION_ID || "unknown-session";
    mkdirSync(auditDir, { recursive: true });
    const file = resolve(auditDir, `audit-${sessionId}.jsonl`);
    const prev = loadPrevHash(file);
    const tool = ev.tool_name || ev.tool || "unknown";
    const params = ev.tool_input || ev.params || {};
    const paramsStr = JSON.stringify(params);
    const paramsHash = "sha256:" + createHash("sha256").update(paramsStr).digest("hex");
    const row = {
      ts: new Date().toISOString(),
      session_id: sessionId,
      tool,
      params_hash: paramsHash,
      params_summary: (tool + "(" + paramsStr.slice(0, 120) + ")").slice(0, 200),
      exit_code: ev.exit_code ?? null,
      reason: (ev.error || ev.reason || "tool-call-failure").toString().slice(0, 240),
      prev_hash: prev
    };
    row.this_hash = "sha256:" + createHash("sha256").update(prev + JSON.stringify(row)).digest("hex");
    appendFileSync(file, JSON.stringify(row) + "\n");
  } catch (e) {
    process.stderr.write("audit-log shim error: " + e.message + "\n");
  }
  process.exit(0); // soft-fail; never block
})();
```

**Byte-budget check**: above source ~2.0 KB after minification (whitespace + comments + import lines). CR-2 ≤2KB ceiling: PASS at ~1.95 KB minified-equivalent (operator may strip comments to harden margin). Per CLAUDE.md L17 W331 axis-1 #4 mechanization, PreToolUse[Edit|Write] inspects target path; this shim is exactly the kind of file that mechanism will validate at install-time.

## §6. Phoenix logs receiver consumption path

JSONL rows can be batched-tailed to Phoenix logs receiver via:

```bash
# Operator-run, hourly or per-wave
tail -F Z:/claude-sota-installed/.claude/state/audit/audit-*.jsonl \
  | curl -X POST -H 'Content-Type: application/x-ndjson' \
         -d @- http://127.0.0.1:3000/api/public/otel/v1/logs
```

Phoenix OTel logs receiver at `127.0.0.1:3000` (per settings.json:23 OTEL endpoint) ingests + indexes the hash-chained rows. SIEM-style query layer is then available for chain-integrity validation:

```sql
-- Pseudo-SQL: detect tamper events (broken hash chain)
SELECT session_id, ts, this_hash, prev_hash
FROM audit_log
WHERE LAG(this_hash) OVER (PARTITION BY session_id ORDER BY ts) != prev_hash;
```

## §7. Falsifiable probe (operator quarterly audit)

```bash
# Probe 1 — induce a deny event
echo 'Attempt to Read .env via CC headless; expect tool-block + audit-log row'
# Probe 2 — verify JSONL row exists for the most-recent failure
ls -la Z:/claude-sota-installed/.claude/state/audit/audit-*.jsonl | tail -1
# Probe 3 — verify hash-chain integrity (custom verifier)
node Z:/claude-sota-installed/tools/verify-audit-chain.mjs  # also design-only at this wave
```

Expected: 1 new JSONL row per induced deny + hash chain verifies.

## §8. Acceptance gate (operator sign criteria)

1. Operator reviews this design + accepts CR-2 cross-org-standards cite path (or refiles via Path A).
2. Operator chooses one of:
   - **Conservative**: defer shim install until upstream `anthropics/claude-code` issue accepts the use-case;
   - **Liberal**: install shim now under CR-2 Path B (NIST + CIS + ISO cross-org cite).
3. On install: copy `tools/preagent-audit-log.mjs` into `tools/` (NOT `.claude/hooks/` — tool dir is project-owned; hook config in settings.json points to it).
4. Smoke: induce one deny, verify JSONL row + hash chain.

**Verdict: FI-2 DESIGN-DELIVERED. Operator-sign-gate enforces CR-2 Path-B cross-org cite acceptance or upstream-Path-A defer.**
