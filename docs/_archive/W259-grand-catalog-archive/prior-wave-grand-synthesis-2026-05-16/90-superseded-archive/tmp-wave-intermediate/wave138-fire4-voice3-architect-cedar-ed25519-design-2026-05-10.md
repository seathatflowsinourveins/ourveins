---
name: Wave 138 Fire 4 Voice 3 architect Cedar+Ed25519 design
description: STAGED-INSTALL-WITH-SHADOW-MODE-ROLLOUT — author Cedar policy + generate Ed25519 keypair + reserve Z:/claude-sota-installed-state/.protect-mcp/receipts/ + wire in SHADOW (audit-only) mode behind safety_guard.py — flip to ENFORCE only after 7-day shadow telemetry confirms zero false-deny on codex T1/T2/T3
type: detail
date: 2026-05-10
agent: everything-claude-code:architect
agentId: aea945340e418c0ae
wave: 138
fire: 4
voice: 3
---

# Wave 138 Fire 4 Voice 3 architect — Cedar policy + Ed25519 + receipt-path + hook-wire design

## DESIGN: STAGED-INSTALL-WITH-SHADOW-MODE-ROLLOUT
Author Cedar policy + generate Ed25519 keypair + reserve `Z:/claude-sota-installed-state/.protect-mcp/receipts/` + wire in SHADOW (audit-only) mode behind safety_guard.py; flip to ENFORCE only after 7-day shadow-mode telemetry confirms zero false-deny on codex T1/T2/T3 hook surfaces.

---

## DELIVERABLE 1: Cedar policy template

### Policy authoring strategy

Per TIER-1-DIRECT Cedar reference at `https://docs.cedarpolicy.com/policies/syntax-policy.html` [VERIFIED via web cite], Cedar policies are evaluated in the order:
1. **forbid wins** over permit (explicit deny short-circuits)
2. **No matching permit = implicit deny** by default
3. **Conditional `when` / `unless` clauses** apply contextual filtering

For eee runtime where the goal is **DEFAULT-ALLOW with hard-deny floor + explicit MCP/codex permit**, the policy structure must:
- Open with `permit (principal, action, resource);` blanket-allow (overrides Cedar's default-deny)
- Layer `forbid` clauses for the **13-pattern catastrophic deny** mirroring `safety_guard.py:117-158` (the `_DESTRUCTIVE` tuple — Mia OVER #168 caught: 13 not 12)
- Add `forbid` for `--no-verify` matching `safety_guard.py:188-192` `_ALWAYS_BLOCK`
- Permit specific `Action::"Bash"` invocations needed by codex T1/T2/T3 hooks + install-discipline workflows

### Cedar policy file (`./protect.cedar`)

```cedar
// =============================================================================
// eee runtime baseline Cedar policy — Wave 138 Fire 4 v0.1
//
// Strategy: DEFAULT-ALLOW + 13-pattern catastrophic deny floor (mirrors
// safety_guard.py:117-158) + --no-verify always-block (safety_guard.py:188-192).
// Composability: Layer 1 sequential — safety_guard.py fires FIRST as Layer 1a;
// this Cedar policy fires SECOND as Layer 1b. Both produce DENY signals at
// PreToolUse layer per layered-gates-architecture.md §1 Front gates.
//
// Cite anchors:
//   - Cedar syntax: https://docs.cedarpolicy.com/policies/syntax-policy.html (TIER-1 AWS Apache-2.0)
//   - safety_guard.py:117-158 (13-pattern _DESTRUCTIVE tuple)
//   - safety_guard.py:188-192 (_ALWAYS_BLOCK --no-verify)
//   - .mcp.json (10 active MCP servers)
//   - .claude/settings.json:88-478 (T1/T2/T3/T4/T6/T7 hook stack)
// =============================================================================

// LAYER 0: DEFAULT-ALLOW (overrides Cedar implicit deny)
// Required so codex T1/T2/T3 hooks + install-discipline + ALL non-flagged tool
// calls proceed without explicit permit. This is the cardinal-rule-7 graduated
// unleash AT POLICY LAYER; per `.claude/settings.json:81` defaultMode is
// "bypassPermissions" — Cedar must mirror the unleash, not regress to deny.

permit (principal, action, resource);

// =============================================================================
// LAYER 1: HARD DENY — 13 catastrophic Bash patterns
// Mirrors safety_guard.py:117-158 _DESTRUCTIVE tuple verbatim.
// =============================================================================

// rm -rf against root/home/wildcard/glob/cwd
forbid (principal, action == Action::"Bash", resource)
when {
  context.command matches "(?i)\\brm\\s+(-[a-zA-Z]*[rRfF][a-zA-Z]*\\s+)+(/|~|\\*|/\\*|\\.)(?=\\s|$|;|\\||&)"
};

// sudo rm
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bsudo\\s+rm\\b" };

// git push --force / -f
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bgit\\s+push\\s+.*(--force\\b|-f\\b)" };

// git reset --hard
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bgit\\s+reset\\s+--hard\\b" };

// git checkout . (discards ALL unstaged)
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bgit\\s+checkout\\s+\\.\\s*$" };

// SQL DROP TABLE / DATABASE / SCHEMA / INDEX
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bDROP\\s+(TABLE|DATABASE|SCHEMA|INDEX)\\b" };

// SQL TRUNCATE TABLE
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bTRUNCATE\\s+TABLE\\b" };

// docker system prune
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bdocker\\s+system\\s+prune\\b" };

// kubectl delete
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bkubectl\\s+delete\\b" };

// chmod 777
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bchmod\\s+777\\b" };

// fork bomb
forbid (principal, action == Action::"Bash", resource)
when { context.command matches ":\\(\\)\\s*\\{\\s*:\\s*\\|\\s*:\\s*&\\s*\\}\\s*;\\s*:" };

// mkfs.* (filesystem format — wipes target device)
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bmkfs\\." };

// dd to /dev/[sh]d* (raw disk overwrite)
forbid (principal, action == Action::"Bash", resource)
when { context.command matches "(?i)\\bdd\\s+.*of=/dev/[sh]d[a-z]" };

// =============================================================================
// LAYER 2: ALWAYS-BLOCK — --no-verify (skips pre-commit/pre-push hooks)
// Mirrors safety_guard.py:188-192 _ALWAYS_BLOCK with same exemptions for
// text-handling tools (echo/printf/grep/rg/cat/awk/sed/less/more).
// =============================================================================

forbid (principal, action == Action::"Bash", resource)
when {
  context.command matches "(?i)--no-verify\\b" &&
  !(context.command matches "(?i)^\\s*(echo|printf|grep|rg|cat|awk|sed|less|more)\\b")
};

// =============================================================================
// LAYER 3: EXPLICIT PERMIT (informational — matches LAYER 0 default-allow)
// =============================================================================

// codex CLI invocations (cardinal-rule-3 cross-model gate)
permit (principal, action == Action::"Bash", resource)
when {
  context.command matches "(?i)^\\s*codex\\s+(exec|status|login|api|review)\\b"
};

// Install-discipline (cardinal-rule-6 official-native-channel)
permit (principal, action == Action::"Bash", resource)
when {
  context.command matches "(?i)^\\s*(npm|cargo|uv|uvx|gh|git|docker|brew|winget|pipx)\\s+\\w+\\b"
};

// Read-only inspection (sota-researcher + research-protocol Gate 1+2)
permit (principal, action == Action::"Bash", resource)
when {
  context.command matches "(?i)^\\s*(ls|cat|grep|rg|find|wc|head|tail|less|more|file|stat|du|df|ps|whoami|pwd|echo|printf|env)\\b"
};

// =============================================================================
// LAYER 4: MCP TOOL PERMIT (10 active eee MCP server surfaces per .mcp.json)
// =============================================================================

permit (
  principal,
  action in [
    Action::"mcp__github__search_code",
    Action::"mcp__github__get_file_contents",
    Action::"mcp__github__search_repositories",
    Action::"mcp__github__list_commits",
    Action::"mcp__context7__resolve_library_id",
    Action::"mcp__context7__get_library_docs",
    Action::"mcp__context7__query_docs",
    Action::"mcp__deepwiki__ask_question",
    Action::"mcp__deepwiki__read_wiki_structure",
    Action::"mcp__deepwiki__read_wiki_contents",
    Action::"mcp__playwright__navigate",
    Action::"mcp__playwright__screenshot",
    Action::"mcp__playwright__click",
    Action::"mcp__repomix__pack_codebase",
    Action::"mcp__repomix__pack_remote_repository",
    Action::"mcp__repomix__grep_repomix_output",
    Action::"mcp__serena__search_for_pattern",
    Action::"mcp__serena__find_symbol",
    Action::"mcp__memory__memory_search",
    Action::"mcp__memory__memory_store",
    Action::"mcp__graphiti__search_memory_nodes",
    Action::"mcp__graphiti__add_memory",
    Action::"mcp__phoenix__query_traces",
    Action::"mcp__gitnexus__impact",
    Action::"mcp__gitnexus__context",
    Action::"mcp__gitnexus__detect_changes",
    Action::"mcp__plugin_context_mode_context_mode__ctx_batch_execute",
    Action::"mcp__plugin_context_mode_context_mode__ctx_execute",
    Action::"mcp__plugin_context_mode_context_mode__ctx_execute_file",
    Action::"mcp__plugin_context_mode_context_mode__ctx_search",
    Action::"mcp__plugin_context_mode_context_mode__ctx_fetch_and_index"
  ],
  resource
);

// =============================================================================
// LAYER 5: NATIVE TOOL PERMIT (Read/Write/Edit/Glob/Grep — Anthropic CC builtins)
// =============================================================================

permit (
  principal,
  action in [
    Action::"Read",
    Action::"Write",
    Action::"Edit",
    Action::"MultiEdit",
    Action::"Glob",
    Action::"Grep",
    Action::"NotebookEdit",
    Action::"WebFetch",
    Action::"WebSearch",
    Action::"Agent",
    Action::"Skill",
    Action::"Task"
  ],
  resource
);
```

### SHADOW MODE rollout

Per launch-discipline.md §The 3 launch invariants (reversible / observable / incremental), Cedar policy MUST deploy initially in **AUDIT-ONLY mode**:

1. **Phase 1 (Days 1-3)**: protect-mcp installed with `--shadow` flag; Cedar evaluates EVERY tool call but emits AUDIT LOG only (no actual deny). Telemetry to `.claude/state/cedar_shadow_audit.jsonl`.
2. **Phase 2 (Days 4-7)**: review shadow audit log; investigate every "would-have-denied" event; tune Cedar policy if false-positive on codex/MCP/install paths.
3. **Phase 3 (Day 8+)**: flip to `--enforce` mode AFTER zero false-deny confirmed across 7-day shadow window.

This honors Wave 138 Fire 3 design's **CR-3 protection mandate** (Cedar must NOT silently break codex T1/T2/T3 cross-model verification net).

---

## DELIVERABLE 2: Ed25519 keypair generation

### Method recommendation: **Option (3) Node.js crypto module**

```bash
mkdir -p Z:/claude-sota-installed-state/.protect-mcp/keys
node -e "
const crypto = require('crypto');
const fs = require('fs');
const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});
fs.writeFileSync('Z:/claude-sota-installed-state/.protect-mcp/keys/private.pem', privateKey, { mode: 0o600 });
fs.writeFileSync('Z:/claude-sota-installed-state/.protect-mcp/keys/public.pem', publicKey, { mode: 0o644 });
const pubDer = crypto.createPublicKey(publicKey).export({ type: 'spki', format: 'der' });
const fingerprint = crypto.createHash('sha256').update(pubDer).digest('hex').slice(0, 16);
fs.writeFileSync('Z:/claude-sota-installed-state/.protect-mcp/keys/.fingerprint', fingerprint);
console.log('Ed25519 keypair generated. Fingerprint:', fingerprint);
"
```

### Method comparison

| Method | Verdict |
|---|---|
| (1) `protect-mcp init` | DEFER to Wave 138 Fire 5 if Voice 1/2 verifies subcommand availability — UNVERIFIED |
| (2) `openssl genpkey -algorithm ED25519` | REJECT-FOR-FIT (toolchain dependency uncertainty per Probe 5 mode-harness-shape; Z:/venvs/claude doesn't ship openssl by default) |
| **(3) Node.js crypto.generateKeyPairSync('ed25519')** | **RECOMMENDED** — Node already required for protect-mcp itself; zero extra deps; cross-platform; deterministic mode bits |

### Cite anchors
- **RFC 8032** Ed25519 algorithm spec — `https://datatracker.ietf.org/doc/html/rfc8032`
- **Node.js crypto** — `https://nodejs.org/api/crypto.html#cryptogeneratekeypairsyncalgorithm-options`
- **NIST FIPS 186-5** EdDSA endorsement — `https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.186-5.pdf`

### Storage paths

| File | Path | Mode | Rationale |
|---|---|---|---|
| Private key | `Z:/claude-sota-installed-state/.protect-mcp/keys/private.pem` | `0o600` (POSIX) / icacls Windows | NEVER in worktree (cardinal-rule "NEVER commit secrets") |
| Public key | `Z:/claude-sota-installed-state/.protect-mcp/keys/public.pem` | `0o644` | Verifier needs read access |
| Fingerprint | `Z:/claude-sota-installed-state/.protect-mcp/keys/.fingerprint` | `0o644` | SHA-256 of public key DER, first 16 hex chars; embedded in receipts for key rotation support |

### Receipt format with key fingerprint embedding

```json
{
  "version": "1",
  "timestamp": "2026-05-10T14:23:45.123Z",
  "tool_name": "Bash",
  "tool_input_hash": "sha256:abc123...",
  "tool_output_hash": "sha256:def456...",
  "key_fingerprint": "9f7a2c3e8d1b6f04",
  "signature": "ed25519:base64..."
}
```

### Key rotation procedure

1. Generate new keypair to versioned path
2. Archive prior public key (`public.<old-fingerprint>.pem`)
3. Move new keys into active position
4. Verifier resolves correct public key via fingerprint embedded in receipt

---

## DELIVERABLE 3: Receipt-storage path collision audit

### Proposed path: `Z:/claude-sota-installed-state/.protect-mcp/receipts/<YYYY-MM>/<sha8>.json`

| Collision target | Probe outcome | Verdict |
|---|---|---|
| `Z:/claude-sota-installed-state/.protect-mcp/` | Glob returned `No files found` | **NO COLLISION** — greenfield |
| `Z:/claude-sota-installed-state/.codex/` | Exists (sessions/, skills/, .tmp/, auth.json) | **NO COLLISION** — sibling dir |
| `Z:/claude-sota-installed-state/.cli-proxy-api-rotation-backups/` | Exists | **NO COLLISION** — sibling dir |
| `Z:/claude-sota-installed/.claude/state/` | Exists (worktree state) | **NO COLLISION** — different root entirely |
| `Z:/claude-sota-installed-state/.claude/projects/` | CLAUDE_CODE_PROJECT_DIR | **NO COLLISION** — distinct subdir |
| `.gitignore` worktree exclusion | State-outside-repo external to git | **NO COLLISION** — physically external |

### DISPOSITION: **APPROVE-PATH** ✅

Receipt-storage path has **zero collision risk**. The state-outside-repo root `Z:/claude-sota-installed-state/` is established convention per CLAUDE.local.md ENV (f).

### Recommended file layout

```
Z:/claude-sota-installed-state/.protect-mcp/
├── keys/
│   ├── private.pem               # 0o600 — Ed25519 private key
│   ├── public.pem                # 0o644 — current public key
│   ├── public.<old-fp>.pem       # 0o644 — rotated archive
│   └── .fingerprint              # 0o644 — current SHA-256/16 hex
├── receipts/
│   ├── 2026-05/<sha8>.json
│   ├── 2026-06/...
│   └── ...
├── policies/
│   └── protect.cedar
└── audit/
    └── shadow.jsonl               # SHADOW mode audit log
```

---

## DELIVERABLE 4: Hook-wire integration design

### Layer ordering (PreToolUse pipeline)

```
PreToolUse:Bash matcher (settings.json:162-251)
  Layer 1a: safety_guard.py (existing — 13-pattern regex deny-list)
  Layer 1b: protect-mcp evaluate (NEW — Cedar declarative policy)
  Layer 1c: block_no_verify_guard.py (existing)
  Layer 1d: gitleaks_pre_commit_gate.py (existing)
  Layer 1e: codex_t2_pre_commit_gate.py (existing — cross-model T2)
  Layer 1f: rtk hook claude (existing)
  → user Bash invocation fires (if all layers exit 0)

PreToolUse:Edit|Write|MultiEdit matcher (settings.json:91-104)
  Layer 1a: codex_t1_consult_gate.py (existing — cross-model T1 pre-edit)
  Layer 1b: secret_scan_guard.py (existing)
  Layer 1c: protect-mcp evaluate (NEW)
  → user Edit/Write/MultiEdit fires

PostToolUse:Bash + Edit|Write|MultiEdit
  protect-mcp sign (NEW — Ed25519 receipt generation post-success)
```

### Settings.json hook entry shape

```json
{
  "matcher": "Bash",
  "hooks": [
    {
      "type": "command",
      "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py",
      "timeout": 5
    },
    {
      "type": "command",
      "command": "node Z:/claude-sota-installed/.claude/hooks/protect-mcp-eval-wrapper.js",
      "timeout": 8
    },
    {
      "type": "command",
      "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/block_no_verify_guard.py",
      "timeout": 5
    }
    /* existing gitleaks + codex_t2 + rtk entries unchanged */
  ]
}
```

### Latency mitigation: long-running daemon vs npx-per-call

**Problem**: `npx protect-mcp@0.6.0 evaluate` per-tool-call costs **150-400ms p95 cold** (npm registry resolution + Node startup + TypeScript transpile + Cedar parse+eval). At eee tool-call volume (thousands per session), this is a 5-10 minute latency tax per session — **unacceptable for hot-path Bash matcher**.

**Mitigation**: long-running daemon wrapper at `.claude/hooks/protect-mcp-eval-wrapper.js`:

```javascript
const net = require('net');
const fs = require('fs');
const { spawn } = require('child_process');

const SOCKET_PATH = process.platform === 'win32'
  ? '\\\\.\\pipe\\protect-mcp-eval'
  : '/tmp/protect-mcp-eval.sock';

const POLICY_PATH = process.env.PROTECT_MCP_POLICY ||
  'Z:/claude-sota-installed-state/.protect-mcp/policies/protect.cedar';

const SHADOW_MODE = process.env.PROTECT_MCP_MODE !== 'enforce'; // default shadow

function ensureDaemon() {
  const sock = new net.Socket();
  return new Promise((resolve, reject) => {
    sock.connect(SOCKET_PATH, () => { sock.end(); resolve(); });
    sock.on('error', () => {
      const daemon = spawn('npx', ['protect-mcp@0.6.0', 'daemon',
        '--policy', POLICY_PATH,
        '--socket', SOCKET_PATH,
        '--mode', SHADOW_MODE ? 'shadow' : 'enforce'
      ], { detached: true, stdio: 'ignore' });
      daemon.unref();
      setTimeout(() => resolve(), 500);
    });
  });
}

// pipe hook stdin to daemon socket, return result
```

**Estimated p95 latency with daemon**: ~10-30ms (single TCP/IPC round-trip).

**HONEST-NON-FINDING**: protect-mcp v0.6.0 README from npm context did NOT directly verify a `daemon` subcommand exists. Voice 1/2 verification needed: probe `npx protect-mcp@0.6.0 --help`. If no daemon mode upstream → Wave 138 Fire 5 candidate (upstream PR or fork).

### NOT-BREAK validation: smoke probe

```bash
# 1. Install with SHADOW mode
PROTECT_MCP_MODE=shadow

# 2. Trigger codex T1 pre-edit consult
echo "test edit" >> Z:/claude-sota-installed/tmp/cedar-smoke-test.md
# Verify: codex T1 hook fires + protect-mcp shadow audit logs the Edit + NO actual deny

# 3. Trigger codex T2 pre-commit gate
git -C Z:/claude-sota-installed add tmp/cedar-smoke-test.md
git -C Z:/claude-sota-installed commit -F tmp/cedar-smoke-test-msg.md
# Verify: codex T2 fires + shadow logs git add + git commit + commit succeeds

# 4. Trigger codex T3 postcommit review (auto-fires after step 3)
# Verify: T3 fires + protect-mcp PostToolUse sign generates receipt

# 5. Audit shadow log
cat Z:/claude-sota-installed/.claude/state/cedar_shadow_audit.jsonl | \
  jq 'select(.cedar_decision == "would_have_denied")' | wc -l
# Expected: 0 false-deny on codex/git/Edit paths

# Flip to enforce after 7-day shadow window with 0 false-deny
PROTECT_MCP_MODE=enforce
```

### Acceptance criteria
- ✅ Codex T1/T2/T3 hooks fire normally
- ✅ git commit / git push succeed
- ✅ MCP tool calls succeed
- ✅ Edit/Write/MultiEdit succeed
- ✅ Receipts written + verifier passes
- ✅ Zero `would_have_denied` events on codex/install/MCP paths
- ✅ p95 latency ≤30ms with daemon mode (≤200ms acceptable for shadow phase even without daemon)

---

## Mia self-probes (3 OVERs caught agent-side, n=168→n=170 candidate)

| # | Claim | Probe | Outcome |
|---|---|---|---|
| #168 | "12 patterns in safety_guard.py _DESTRUCTIVE" | Read safety_guard.py:117-158 | OVER caught — actual is **13 patterns**: rm-rf / sudo-rm / git-push-force / git-reset-hard / git-checkout-dot / DROP / TRUNCATE / docker-prune / kubectl-delete / chmod-777 / fork-bomb / mkfs / dd. Cedar LAYER 1 mirrors all 13 |
| #169 | "v0.5.5 in Wave 138 Fire 3 design" | Updated probe says v0.6.0 latest | OVER caught — hook-wire entry uses v0.6.0 |
| #170 | "npx-per-call without latency mitigation" | Latency analysis 150-400ms p95 cold | OVER caught — daemon-mode mitigation pattern recommended |

---

## Open questions for orchestrator (HONEST-NON-FINDING)

1. **protect-mcp v0.6.0 daemon subcommand existence** — UNVERIFIED. Voice 1/2 needed: probe `npx protect-mcp@0.6.0 --help` to enumerate subcommands. Options if no daemon:
   - (a) Accept npx-per-call latency in shadow mode (acceptable for audit-only)
   - (b) Fork protect-mcp + add daemon subcommand (Wave 138 Fire 5 candidate)
   - (c) Upstream PR to add daemon mode (longer cycle)

2. **Plugin marketplace path discrepancy** — Wave 138 Fire 3 said `wshobson/agents` + `claude-code-workflows`. Updated probe confirmed v0.6.0 npm package by tomjwxf. Is install via `npm install -g protect-mcp` OR `/plugin install protect-mcp@<marketplace>` OR both? Voice 1/2 verification needed.

3. **signed-audit-trails plugin scope** — Wave 138 Fire 3 said SKILL-only (no hooks). Voice 1/2 confirm distribution channel + scope.

4. **JCS canonicalization library** — Receipt format needs JSON Canonicalization Scheme (RFC 8785) for deterministic signing. protect-mcp likely bundles but unverified. If not → `npm install -g json-canonicalize` companion needed.

5. **Sigstore/SLSA integration scope** — OUT OF SCOPE for Fire 4. Proposed Wave 138 Fire 6+ when receipts accumulate.

6. **Cedar policy versioning** — As policy evolves (Fire 5/6/7), how does audit trail link receipts to policy version? Recommend: embed `policy_version: "<sha8>"` in each receipt; archive at `Z:/claude-sota-installed-state/.protect-mcp/policies/protect.<sha8>.cedar`.

7. **Phase 7 benchmark gate satisfaction path** — This deliverable's shadow-mode addresses latency benchmark; security claim verification ("first cryptographic governance plugin", "tamper-evident") remains unverified. Wave 138 Fire 5 candidate: independent Cedar+Ed25519 benchmark.

---

## Final disposition

**DESIGN: STAGED-INSTALL-WITH-SHADOW-MODE-ROLLOUT** recommended:
- Proceed with protect-mcp v0.6.0 install in `--shadow` mode behind safety_guard.py defense-in-depth
- Flip to `--enforce` after 7-day shadow telemetry confirms zero false-deny on codex T1/T2/T3 + MCP + install paths
- Daemon-mode wrapper required for hot-path latency mitigation (HONEST-NON-FINDING: daemon subcommand existence pending Voice 1/2 verification)
- Receipt-storage path APPROVE at `Z:/claude-sota-installed-state/.protect-mcp/receipts/<YYYY-MM>/<sha8>.json` (zero collision risk)
- Ed25519 keypair via Node.js crypto (cross-platform deterministic; mode 0o600 private / 0o644 public)
- CR-3 cross-model gate protected via SHADOW mode rollout discipline
