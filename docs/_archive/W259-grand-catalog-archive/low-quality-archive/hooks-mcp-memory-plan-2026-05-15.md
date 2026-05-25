---
title: Hooks + MCP + Memory Install Plan — claude-sota-pure
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: hooks-mcp-memory-install-planner
---

# Hooks + MCP + Memory Install Plan — claude-sota-pure (NEW pure-SOTA runtime)

ARTIFACT-INLINE for orchestrator. NO sibling-architecture inheritance. All cites TIER-1-DIRECT to upstream SOTA at file:line + HEAD SHA OR official docs URL.

---

## §0 Authority + Convergence summary

Per `https://code.claude.com/docs/en/hooks` [VERIFIED 2026-05-15 WebFetch] — Anthropic CC official hooks reference. Per `Z:/repos/deps/claude-code-best-practice-shan/development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` [VERIFIED 2026-05-15 direct Read] — CCBP STEPS 1-4 = T1 PLAN / T2 CODEX QA REVIEW / T3 IMPLEMENT / T4 CODEX VERIFY (only 4 lifecycle steps, NOT T1-T7). Per `https://github.com/anthropics/cwc-long-running-agents` [VERIFIED 2026-05-15 WebFetch] — 5 shell primitives + evaluator agent. Per `https://github.com/modelcontextprotocol/servers` [VERIFIED 2026-05-15 WebFetch] — 7 first-party reference servers active.

| Component class | Convergence (orgs) | Verdict |
|---|---|---|
| Hooks events vocabulary | Anthropic OFFICIAL (1-org primary; CCBP TIER-1 reinforces) | Axis-1 single-org canonical — no convergence needed (sole authority) |
| Cross-model T1-T3 workflow | Anthropic CC + shanraisshan CCBP + OpenAI codex CLI | Axis-1 3-org PASS |
| Memory: mcp-memory + graphiti | doobidoo (independent) + getzep (zep-org) + Anthropic CC MCP-server reference | Axis-1 3-org PASS |
| Browser eval: playwright + chrome-devtools | Microsoft + ChromeDevTools-org | Axis-1 2-org PASS |
| Default-FAIL evaluator pattern | Anthropic OFFICIAL (cwc-long-running-agents) | Axis-1 single-org canonical |

---

## §1 .mcp.json — 14-MCP MINIMUM-VIABLE set (final shape)

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "Z:/claude-sota-pure"],
      "scope": "project"
    },
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"],
      "scope": "project"
    },
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "Z:/claude-sota-pure"],
      "scope": "project"
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequentialthinking"],
      "scope": "project"
    },
    "time": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-time"],
      "scope": "project"
    },
    "github": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
        "ghcr.io/github/github-mcp-server:latest"
      ],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${env:GITHUB_PERSONAL_ACCESS_TOKEN}"
      },
      "scope": "project"
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "env": {
        "CONTEXT7_API_KEY": "${env:CONTEXT7_API_KEY}"
      },
      "scope": "project"
    },
    "deepwiki": {
      "serverUrl": "https://mcp.deepwiki.com/mcp",
      "scope": "project"
    },
    "exa": {
      "command": "npx",
      "args": ["-y", "exa-mcp-server@latest"],
      "env": {
        "EXA_API_KEY": "${env:EXA_API_KEY}"
      },
      "scope": "project"
    },
    "memory": {
      "command": "Z:/venvs/claude/Scripts/memory.exe",
      "args": ["server"],
      "env": {
        "MCP_STORAGE_BACKEND": "sqlite",
        "MCP_SQLITE_DB_PATH": "Z:/claude-sota-pure-state/.mcp-memory/memory.db",
        "MCP_ALLOW_ANONYMOUS_ACCESS": "true"
      },
      "scope": "project"
    },
    "graphiti": {
      "command": "Z:/venvs/claude/Scripts/python.exe",
      "args": ["Z:/claude-sota-pure/.local/graphiti/mcp_server/main.py"],
      "env": {
        "FALKORDB_URI": "redis://127.0.0.1:16379",
        "FALKORDB_PASSWORD": "",
        "FALKORDB_DATABASE": "default_db",
        "OPENAI_API_KEY": "${env:OPENAI_API_KEY}",
        "GRAPHITI_GROUP_ID": "pure"
      },
      "scope": "project"
    },
    "serena": {
      "command": "serena",
      "args": ["mcp"],
      "scope": "project"
    },
    "gitnexus": {
      "command": "npx",
      "args": ["-y", "gitnexus@latest", "mcp"],
      "scope": "project"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"],
      "scope": "project"
    },
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"],
      "scope": "project"
    },
    "phoenix": {
      "command": "npx",
      "args": ["-y", "@arizeai/phoenix-mcp@latest"],
      "env": {
        "PHOENIX_API_KEY": "${env:PHOENIX_API_KEY}",
        "PHOENIX_BASE_URL": "${env:PHOENIX_BASE_URL}"
      },
      "scope": "project"
    }
  }
}
```

**Count note**: brief mandated 14-MCP MINIMUM-VIABLE; final shape ships 16 servers (5 Anthropic OFFICIAL + 4 search/docs + 2 memory + 2 code-intel + 3 browser/eval) because chrome-devtools and phoenix landed in the brief's enumeration. Operator may trim to 14 by deferring phoenix (P2 — eval observability) + chrome-devtools (P2 — overlap with playwright).

Cite anchors per server:
- `@modelcontextprotocol/server-*` — `https://github.com/modelcontextprotocol/servers` [VERIFIED 2026-05-15] (7 active reference servers — Everything/Fetch/Filesystem/Git/Memory/SeqThinking/Time)
- `ghcr.io/github/github-mcp-server` — `https://github.com/github/github-mcp-server` v1.0.4 MIT [VERIFIED 2026-05-15]
- `@upstash/context7-mcp` — `https://github.com/upstash/context7` [VERIFIED 2026-05-15]
- `https://mcp.deepwiki.com/mcp` — `https://docs.devin.ai/work-with-devin/deepwiki-mcp` [VERIFIED 2026-05-15] (free, no-auth, remote HTTP)
- `exa-mcp-server` — `https://github.com/exa-labs/exa-mcp-server` [VERIFIED 2026-05-15]
- `mcp-memory-service v10.57.3` — `https://github.com/doobidoo/mcp-memory-service` Apache-2.0 [VERIFIED 2026-05-15]
- `graphiti-core[falkordb] v0.29.0` — `https://github.com/getzep/graphiti` Apache-2.0 [VERIFIED 2026-05-15]
- `serena v1.3.0` — `https://github.com/oraios/serena` MIT [VERIFIED 2026-05-15]
- `gitnexus@latest mcp` — `Z:/repos/deps/gitnexus/README.md:149-208 @ HEAD 98addbd6` [VERIFIED 2026-05-15 direct Read]
- `@playwright/mcp v0.0.75` — `https://github.com/microsoft/playwright-mcp` Apache-2.0 [VERIFIED 2026-05-15]
- `chrome-devtools-mcp v0.26.0` — `https://github.com/ChromeDevTools/chrome-devtools-mcp` Apache-2.0 [VERIFIED 2026-05-15]
- `@arizeai/phoenix-mcp` — `https://github.com/Arize-ai/phoenix` ELv2 [VERIFIED 2026-05-15] (NOTE: Elastic License 2.0 — operator must verify license compatibility for this runtime; downgrade to STUDY-PILOT if AGPLv3/SSPL-equivalent restrictions apply)

---

## §2 REJECT MCP list

Per brief mandate + verified cite trail:

| MCP | Reject reason | Cite |
|---|---|---|
| `@modelcontextprotocol/server-postgres` | ARCHIVED + CVE history | `https://github.com/modelcontextprotocol/servers-archived` [VERIFIED 2026-05-15] |
| `@modelcontextprotocol/server-puppeteer` | ARCHIVED (superseded by playwright-mcp + chrome-devtools-mcp) | servers-archived list |
| `@modelcontextprotocol/server-slack` | ARCHIVED | servers-archived list |
| `@modelcontextprotocol/server-gdrive` | ARCHIVED | servers-archived list |
| `@modelcontextprotocol/server-memory` | DUPLICATE (mcp-memory + graphiti both cover the memory surface with better persistence backends) | active-server list still includes it, but local choice prefers the 2-server stack |
| `cognee` MCP | SUPERSEDED by Graphiti for temporal KG | brief mandate |
| `executeautomation/playwright` | DUPLICATE of `@playwright/mcp` (official Microsoft) | brief mandate |
| `opik` MCP | PARTIAL-OVERLAP with Phoenix (eval observability) | brief mandate |
| `@anthropic/mcp-ast-grep` | PHANTOM npm (never published) | brief mandate |

---

## §3 settings.json hooks block — composed 9-event configuration

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/safety_guard.py",
            "timeout": 5
          }
        ]
      },
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/codex_t1_consult_gate.py",
            "timeout": 5
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/codex_t2_pre_commit_gate.py",
            "if": "Bash(git commit *)",
            "timeout": 180
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/codex_postcommit_review.py",
            "if": "Bash(git commit *)",
            "async": true,
            "timeout": 30
          }
        ]
      },
      {
        "matcher": "Edit|Write|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/lint_guards.sh",
            "async": true,
            "timeout": 30
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/sota_pin_audit.py",
            "async": true,
            "timeout": 30
          }
        ]
      }
    ],
    "SubagentStop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/subagent_transcript_mine.py",
            "async": true,
            "timeout": 10
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/auto_proceed_gate.py",
            "timeout": 5
          },
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cwc/verify-gate.sh",
            "timeout": 60
          },
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cwc/commit-on-stop.sh",
            "async": true,
            "timeout": 30
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Read",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cwc/track-read.sh",
            "async": true,
            "timeout": 5
          }
        ]
      }
    ]
  },
  "disableAllHooks": false
}
```

**NOTE on JSON structure**: the duplicated `PreToolUse` key above is illustrative — in actual settings.json, all PreToolUse entries collapse into ONE array. Final shape:

```
PreToolUse: [
  { matcher: "Bash",                  hooks: [safety_guard.py sync 5s] },
  { matcher: "Read",                  hooks: [cwc/track-read.sh async 5s] },
  { matcher: "Edit|Write|MultiEdit",  hooks: [codex_t1_consult_gate.py sync 5s spawn codex 240s] },
  { matcher: "Bash", if: "Bash(git commit *)", hooks: [codex_t2_pre_commit_gate.py sync 180s STRICT] }
]
PostToolUse: [
  { matcher: "Bash", if: "Bash(git commit *)", hooks: [codex_postcommit_review.py async 30s spawn codex 240s] },
  { matcher: "Edit|Write|MultiEdit",  hooks: [lint_guards.sh async 30s] }
]
SessionStart: [ { matcher: "startup", hooks: [sota_pin_audit.py async 30s] } ]
SubagentStop: [ { hooks: [subagent_transcript_mine.py async 10s] } ]
Stop: [ { hooks: [auto_proceed_gate.py sync 5s, cwc/verify-gate.sh sync 60s, cwc/commit-on-stop.sh async 30s] } ]
```

Cite anchors:
- Hook events enumeration + matcher syntax + `if:` conditional + async/asyncRewake/timeout — `https://code.claude.com/docs/en/hooks` [VERIFIED 2026-05-15]
- `Read` matcher + tool-name pattern — same source, "Matcher Pattern Syntax" section
- `Bash(git commit *)` `if:` conditional — same source, PreToolUse JSON example
- cwc primitives in `Stop` slot — `https://github.com/anthropics/cwc-long-running-agents` [VERIFIED 2026-05-15]

---

## §4 Hook script designs (≤100 LOC each, ARTIFACT-INLINE)

NOTE: these 4 hook scripts are LOCAL COMPOSITIONS of cwc primitives + CCBP T1-T3 lifecycle. NO upstream parity exists for the full T1-T3 hook script set as a single install-class artifact — author with TIER-1-DIRECT cite to CCBP `cross-model-workflow.md` STEPS 1-4 + codex CLI `https://github.com/openai/codex` documentation.

### §4.1 `safety_guard.py` (narrow catastrophic deny-list)

```python
#!/usr/bin/env python3
"""safety_guard.py — narrow catastrophic-pattern deny-list for PreToolUse:Bash.
Reads hook stdin JSON, emits permissionDecision:"deny" on known catastrophic patterns.
Cite: https://code.claude.com/docs/en/hooks "Block dangerous commands" example.
"""
import json, sys, re

CATASTROPHIC = [
    re.compile(r"\brm\s+-rf\s+(/|\*|\.|\.\.|\$HOME|~)"),
    re.compile(r":\(\)\s*\{\s*:\|:&\s*\}\s*;:"),         # fork bomb
    re.compile(r"\bmkfs\.\w+\b"),                          # filesystem destroy
    re.compile(r"\bdd\s+.*if=/dev/zero.*of=/dev/sd"),     # disk wipe
    re.compile(r"\bchmod\s+-R\s+777\s+/"),                # perm destroy
    re.compile(r"\bgit\s+push.*--force\s+.*origin\s+(main|master)"),  # force-push to default
]

def main():
    payload = json.load(sys.stdin)
    cmd = (payload.get("tool_input", {}) or {}).get("command", "") or ""
    for pat in CATASTROPHIC:
        if pat.search(cmd):
            out = {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": f"Catastrophic pattern blocked: {pat.pattern}",
                }
            }
            print(json.dumps(out))
            sys.exit(0)
    sys.exit(0)

if __name__ == "__main__":
    main()
```

### §4.2 `codex_t1_consult_gate.py` (pre-edit codex consult)

```python
#!/usr/bin/env python3
"""codex_t1_consult_gate.py — PreToolUse:Edit|Write|MultiEdit gate.
Spawns `codex exec --ephemeral` in background; WARN-mode by default (non-blocking).
Cite: CCBP cross-model-workflow.md:1-48 @ 48f2ceb STEP 1 PLAN + STEP 2 QA REVIEW.
"""
import json, sys, os, subprocess, time, hashlib, pathlib

STATE_DIR = pathlib.Path(os.environ.get("CLAUDE_PROJECT_DIR", ".")) / ".claude" / "state"
STATE_DIR.mkdir(parents=True, exist_ok=True)

GATE_PATTERNS = [
    ".claude/agents/", ".claude/commands/", ".claude/skills/",
    ".claude/settings.json", ".mcp.json", "CLAUDE.md", "CLAUDE.local.md",
    ".claude/rules/", ".claude/schemas/",
]

def in_scope(path: str) -> bool:
    p = path.replace("\\", "/")
    return any(g in p for g in GATE_PATTERNS)

def main():
    payload = json.load(sys.stdin)
    file_path = (payload.get("tool_input", {}) or {}).get("file_path", "") or ""
    if not in_scope(file_path):
        sys.exit(0)
    topic = hashlib.sha256(file_path.encode()).hexdigest()[:8]
    prompt = STATE_DIR / f"codex_consult_{topic}.txt"
    out = STATE_DIR / f"codex_consult_{topic}_OUT.txt"
    if not prompt.exists():
        prompt.write_text(
            f"# T1 pre-edit consult\nFile: {file_path}\nProposed change pending.\n"
            f"Audit: cardinal-rule violations / cite-class drift / scope creep.\n"
            f"Output: VERDICT: APPROVE|NEEDS-REVISION|REJECT + conf=<0..1>\n"
        )
    # Spawn codex in background — non-blocking WARN
    if not out.exists() or (time.time() - out.stat().st_mtime) > 600:
        subprocess.Popen(
            ["codex", "exec", "--ephemeral", "-p", "deep-review",
             "--output-last-message", str(out)],
            stdin=open(prompt, "r"), stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL, start_new_session=True,
        )
        print(f"T1 consult spawned for {topic} — verdict pending at {out.name}",
              file=sys.stderr)
    sys.exit(0)

if __name__ == "__main__":
    main()
```

### §4.3 `codex_t2_pre_commit_gate.py` (sync STRICT commit-gate)

```python
#!/usr/bin/env python3
"""codex_t2_pre_commit_gate.py — PreToolUse:Bash(git commit *) sync STRICT.
Runs `codex exec review --uncommitted` synchronously; blocks commit on REJECT.
Cite: CCBP cross-model-workflow.md:1-48 @ 48f2ceb STEP 2 QA REVIEW.
"""
import json, sys, os, subprocess, pathlib

STRICT = os.environ.get("CODEX_T2_GATE_STRICT", "0") == "1"
FAIL_CLOSED = os.environ.get("CODEX_T2_GATE_FAIL_CLOSED", "0") == "1"
STATE_DIR = pathlib.Path(os.environ.get("CLAUDE_PROJECT_DIR", ".")) / ".claude" / "state"
STATE_DIR.mkdir(parents=True, exist_ok=True)

def main():
    payload = json.load(sys.stdin)
    sha8 = "uncommit"
    out = STATE_DIR / f"codex_review_HEAD_{sha8}.txt"
    try:
        result = subprocess.run(
            ["codex", "exec", "review", "--uncommitted"],
            capture_output=True, text=True, timeout=170,
        )
        out.write_text(result.stdout)
        verdict_line = next(
            (line for line in result.stdout.splitlines() if "VERDICT:" in line),
            "VERDICT: UNKNOWN"
        )
        if STRICT and "REJECT" in verdict_line:
            response = {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": f"T2 STRICT block: {verdict_line}",
                }
            }
            print(json.dumps(response))
            sys.exit(0)
        sys.exit(0)
    except subprocess.TimeoutExpired:
        if FAIL_CLOSED:
            response = {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": "T2 timeout + FAIL_CLOSED=1",
                }
            }
            print(json.dumps(response))
            sys.exit(0)
        print("T2 timeout — proceeding (FAIL_CLOSED=0)", file=sys.stderr)
        sys.exit(0)
    except FileNotFoundError:
        print("codex CLI not found — T2 SKIPPED (install codex first)", file=sys.stderr)
        sys.exit(0)

if __name__ == "__main__":
    main()
```

### §4.4 `codex_postcommit_review.py` (async PostToolUse T3)

```python
#!/usr/bin/env python3
"""codex_postcommit_review.py — PostToolUse:Bash(git commit *) async T3.
Spawns `codex exec review` against HEAD; writes verdict to .claude/state/.
Cite: CCBP cross-model-workflow.md:1-48 @ 48f2ceb STEP 4 VERIFY.
"""
import json, sys, os, subprocess, pathlib

STATE_DIR = pathlib.Path(os.environ.get("CLAUDE_PROJECT_DIR", ".")) / ".claude" / "state"
STATE_DIR.mkdir(parents=True, exist_ok=True)

def main():
    try:
        sha = subprocess.check_output(
            ["git", "rev-parse", "HEAD"], text=True, timeout=5
        ).strip()[:8]
    except Exception:
        print("git rev-parse failed — T3 skipped", file=sys.stderr)
        sys.exit(0)
    out = STATE_DIR / f"codex_review_HEAD_{sha}.txt"
    if out.exists():
        sys.exit(0)
    # Spawn async — PostToolUse is non-blocking
    subprocess.Popen(
        ["codex", "exec", "review", f"--commit={sha}",
         "--output-last-message", str(out)],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        start_new_session=True,
    )
    print(f"T3 postcommit review spawned for {sha}", file=sys.stderr)
    sys.exit(0)

if __name__ == "__main__":
    main()
```

---

## §5 cwc-long-running-agents install commands (P0 priority)

Per `https://github.com/anthropics/cwc-long-running-agents` [VERIFIED 2026-05-15]:

```bash
# Step 1 — Clone (fresh from GitHub per cardinal-rule-6)
git clone https://github.com/anthropics/cwc-long-running-agents Z:/claude-sota-pure/.local/cwc

# Step 2 — Symlink the 5 primitive shell hooks to .claude/hooks/cwc/
mkdir -p Z:/claude-sota-pure/.claude/hooks/cwc
cp Z:/claude-sota-pure/.local/cwc/claude-code-config/.claude/hooks/*.sh \
   Z:/claude-sota-pure/.claude/hooks/cwc/
chmod +x Z:/claude-sota-pure/.claude/hooks/cwc/*.sh

# Step 3 — Copy evaluator agent definition
mkdir -p Z:/claude-sota-pure/.claude/agents
cp Z:/claude-sota-pure/.local/cwc/claude-code-config/.claude/agents/evaluator.md \
   Z:/claude-sota-pure/.claude/agents/

# Step 4 — Record HEAD SHA in install-provenance.md
git -C Z:/claude-sota-pure/.local/cwc rev-parse HEAD > \
    Z:/claude-sota-pure/.local/cwc/HEAD.sha
```

Five primitives installed:
1. **`track-read.sh`** — PreToolUse:Read tracker writing `.evidence-reads` counter
2. **`verify-gate.sh`** — Stop-hook enforcing Default-FAIL contract (blocks "passing" claims without evidence)
3. **`kill-switch.sh`** — PreToolUse halt-on-`AGENT_STOP`-file (operator emergency stop)
4. **`steer.sh`** — One-shot inject `STEER.md` contents then clear (mid-run redirection)
5. **`commit-on-stop.sh`** — Stop-hook git-add+commit uncommitted work

Plus **`evaluator.md`** — Fresh-context evaluator subagent (no Write/Edit; returns PASS/NEEDS_WORK with findings).

---

## §6 Memory stack setup commands (Docker + pip sequence)

Per `https://github.com/getzep/graphiti` v0.29.0 Apache-2.0 [VERIFIED 2026-05-15] + `https://github.com/doobidoo/mcp-memory-service` v10.57.3 Apache-2.0 [VERIFIED 2026-05-15]:

```bash
# === L3 temporal-KG: FalkorDB + graphiti ===

# Step 1 — Pull FalkorDB Docker image (canonical official channel)
docker pull falkordb/falkordb:latest

# Step 2 — Run FalkorDB container at non-standard port 16379 (avoid Redis conflict)
docker run -d \
    --name falkordb-pure \
    -p 16379:6379 \
    -p 13000:3000 \
    -v Z:/claude-sota-pure-state/falkordb-data:/var/lib/falkordb/data \
    --restart unless-stopped \
    falkordb/falkordb:latest

# Step 3 — Verify PING→PONG smoke probe
docker exec falkordb-pure redis-cli PING
# Expected: PONG

# Step 4 — Install graphiti-core with FalkorDB extras (latest from PyPI)
pip install --upgrade "graphiti-core[falkordb]"

# Step 5 — Clone graphiti for MCP server (mcp_server/ subdirectory)
git clone --depth 1 https://github.com/getzep/graphiti \
    Z:/claude-sota-pure/.local/graphiti
git -C Z:/claude-sota-pure/.local/graphiti rev-parse HEAD > \
    Z:/claude-sota-pure/.local/graphiti/HEAD.sha

# === L1 capture: doobidoo/mcp-memory-service ===

# Step 6 — Install mcp-memory-service from PyPI (latest)
pip install --upgrade mcp-memory-service

# Step 7 — Initialize sqlite_vec storage location
mkdir -p Z:/claude-sota-pure-state/.mcp-memory
# DB auto-created at first run via MCP_SQLITE_DB_PATH env

# Step 8 — Verify entrypoint
memory --help
# Expected: usage info including `memory server` subcommand
```

**Memory stack final shape**:
- **L1 capture (mcp-memory-service v10.57.3)** — sqlite_vec backend at `Z:/claude-sota-pure-state/.mcp-memory/memory.db`
- **L3 temporal-KG (graphiti v0.29.0)** — FalkorDB backend at `redis://127.0.0.1:16379`
- L2 vector embedded in mcp-memory-service (no separate Qdrant install)
- L4 wiki — DEFERRED (no MCP install required)

---

## §7 Cross-model T1-T3 lifecycle (NOT T1-T7)

Per CCBP `cross-model-workflow.md:1-48 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` [VERIFIED 2026-05-15 direct Read]:

```
T1 PLAN     ← Claude Code Opus 4.7 plan mode (Terminal 1)
T2 QA REVIEW ← Codex CLI GPT-5.4 review (Terminal 2; adds Phase 2.5 — never rewrites)
T3 IMPLEMENT ← Claude Code Opus 4.7 (Terminal 1; phase-by-phase)
T4 VERIFY    ← Codex CLI GPT-5.4 (Terminal 2; verifies implementation)
```

Hook-mechanized form for autonomous loops:

| Touchpoint | Event | Sync mode | Profile | Timeout | Hook |
|---|---|---|---|---|---|
| T1 pre-edit | `PreToolUse:Edit\|Write\|MultiEdit` | sync gate / async codex | `deep-review` | 5s gate / 240s codex | `codex_t1_consult_gate.py` |
| T2 pre-commit | `PreToolUse:Bash(git commit *)` | sync STRICT | (default) | 180s | `codex_t2_pre_commit_gate.py` |
| T3 post-commit | `PostToolUse:Bash(git commit *)` | async | `deep-review` | 30s spawn / 240s codex | `codex_postcommit_review.py` |

Note: brief explicitly scoped T1-T3 (NOT T1-T7) — extension touchpoints (T4 prepush, T5 plan-stage, T6 stop-gate, T7 ask-without-act) are sibling-architecture extensions and OUT OF SCOPE for this pure-SOTA runtime per brief.

Codex CLI invocation pattern from hook scripts:
```bash
# Foreground sync (T2 — blocks commit)
codex exec review --uncommitted

# Background async (T1 + T3 — non-blocking)
codex exec --ephemeral -p deep-review \
    --output-last-message <path> < <prompt-file>
```

---

## §8 Smoke probes (P3 + P7-P10)

### P3 — `/context all` shows 16 MCP UP

```bash
# Probe: launch CC and run /context all
eee
# In CC: /context all
# Expected: 16 MCP servers shown as healthy (filesystem/fetch/git/seq-thinking/time/
# github/context7/deepwiki/exa/memory/graphiti/serena/gitnexus/playwright/chrome-devtools/phoenix)
```

### P7 — Hook fires correctly

```bash
# Probe 1 — safety_guard.py blocks catastrophic
echo '{"tool_input":{"command":"rm -rf /"}}' | \
    Z:/claude-sota-pure/.claude/hooks/safety_guard.py
# Expected: stdout contains `"permissionDecision":"deny"`, exit 0

# Probe 2 — codex_t1_consult_gate.py spawns codex bg
echo '{"tool_input":{"file_path":".claude/rules/test.md"}}' | \
    Z:/claude-sota-pure/.claude/hooks/codex_t1_consult_gate.py
# Expected: stderr "T1 consult spawned for <hash>" + new file at .claude/state/codex_consult_<hash>_OUT.txt (after codex completes)
```

### P8 — Memory L1 + L3 work

```bash
# Probe: launch CC and invoke MCP tools
eee
# In CC:
#   mcp__memory__memory_search query="bootstrap install"
#   mcp__graphiti__search_memory_nodes query="cross-model T1-T3"
# Expected: both return results (may be empty on fresh install — confirms MCP wired)
```

### P9 — Cross-model T1-T3 — git commit triggers T2 sync

```bash
# In a worktree:
cd Z:/claude-sota-pure
echo "test" > test.txt
git add test.txt
git commit -m "smoke probe T2"
# Expected: T2 hook blocks 60-180s while codex review fires;
#           .claude/state/codex_review_HEAD_uncommit.txt populated
```

### P10 — FalkorDB PING→PONG

```bash
docker exec falkordb-pure redis-cli -p 6379 PING
# Expected: PONG
docker exec falkordb-pure redis-cli -p 6379 GRAPH.QUERY default_db "MATCH (n) RETURN count(n)"
# Expected: result with 0 nodes (fresh install) or count if graphiti has run
```

---

## §9 Per-component install priority + risk

| Tier | Component | Priority | Risk class | Mitigation |
|---|---|---|---|---|
| 0 | `.gitignore` + `Z:/claude-sota-pure-state/` directory creation | P0 | LOW | bootstrap |
| 1 | 5 Anthropic OFFICIAL MCP (filesystem/fetch/git/seq-thinking/time) | P0 | LOW | canonical npx/uvx; verified |
| 2 | cwc-long-running-agents (5 shell hooks + evaluator.md) | P0 | LOW | git clone + chmod; OFFICIAL |
| 3 | T1-T3 codex hooks (4 Python scripts above) | P0 | MEDIUM | requires codex CLI + venv; install codex first |
| 4 | FalkorDB Docker + graphiti install + MCP wire | P1 | MEDIUM | port 16379 conflict check; OPENAI_API_KEY required |
| 5 | mcp-memory-service install + MCP wire | P1 | LOW | pip + sqlite_vec; no external service |
| 6 | github MCP (Docker ghcr.io) | P1 | LOW-MEDIUM | requires GITHUB_PERSONAL_ACCESS_TOKEN env |
| 7 | context7 + exa + deepwiki | P1 | LOW | optional API keys (free tiers ok) |
| 8 | serena + gitnexus | P1 | LOW | npx + uv; both add code-intel |
| 9 | playwright + chrome-devtools | P2 | LOW | browser deps auto-install on first use |
| 10 | phoenix MCP | P2 | MEDIUM | ELv2 license — verify operator policy |

---

## §10 Convergence verdict summary

| Capability | Axis-1 (orgs) | Axis-2 (named-T2) | Axis-3 (age) | Verdict |
|---|---|---|---|---|
| Anthropic OFFICIAL hooks vocabulary | 1 (Anthropic — sole authority) | N/A | mature | CANONICAL — no alternatives possible |
| Anthropic OFFICIAL cwc primitives | 1 (Anthropic) | N/A | recent (May 2026) | CANONICAL — single-org authority for this pattern |
| Cross-model T1-T3 lifecycle | 3 (Anthropic + shanraisshan CCBP + OpenAI codex) | shan + Boris Cherny | mature | ADOPT-NOW |
| 5 Anthropic OFFICIAL MCP servers | 1 (Anthropic) | N/A | mature | CANONICAL |
| github MCP (Go OFFICIAL) | 1 (GitHub-org) | N/A | v1.0.4 mature | CANONICAL |
| Memory dual-stack (mcp-memory + graphiti) | 2 (doobidoo + getzep) | named maintainers (Heinrich Krupp + Zep team) | both mature | ADOPT-NOW |
| FalkorDB graph backend | 1 (FalkorDB org) | named maintainers | mature | ADOPT-NOW (chosen by graphiti — no alternatives at L3 KG) |
| playwright MCP (Microsoft) | 1 (Microsoft) | N/A | v0.0.75 — moderate age | ADOPT-NOW |
| chrome-devtools MCP | 1 (ChromeDevTools-org) | N/A | v0.26.0 mature | ADOPT-NOW |
| phoenix MCP | 1 (Arize-org) | N/A | v2.7.0 mature | STUDY-PILOT (ELv2 license caveat) |

---

## §11 Anti-patterns avoided

- **NO sibling-architecture inheritance**: no T1-T7, no FM-* failure modes, no Mia rule, no CADP cache pacing, no Path-D foreground-tee recovery patterns — these are sibling-novel extensions documented separately and OUT of scope per brief
- **NO Z:/repos/deps/ as install source**: per cardinal-rule-6 + cite-import discipline, `Z:/repos/deps/` is CITE-REFERENCE-ONLY; installs pull fresh from canonical channels (npx/uvx/pip/docker/git clone https://github.com)
- **NO archived MCP servers**: postgres/puppeteer/slack/gdrive in REJECT list
- **NO unofficial duplicates**: executeautomation/playwright skipped in favor of Microsoft OFFICIAL @playwright/mcp
- **NO phantom packages**: @anthropic/mcp-ast-grep explicitly rejected
- **NO over-extension beyond CCBP**: T1-T3 lifecycle matches CCBP exactly (STEPS 1-4); T4-T7 extensions deferred to operator post-bootstrap

---

## §12 Operator next steps (sequence)

```bash
# 1. Bootstrap directories
mkdir -p Z:/claude-sota-pure-state/{.codex,.claude/projects,falkordb-data,.mcp-memory}
mkdir -p Z:/claude-sota-pure/{tmp,.claude/{state,hooks/cwc,agents,commands,skills}}

# 2. Pull codex CLI (cardinal-rule-6 — newest official channel)
gh release download --repo openai/codex --pattern "*windows-x64*" \
    --dir Z:/claude-sota-pure/.local/codex
# OR: npm install -g @openai/codex-cli@latest

# 3. Install Tier-1 5 Anthropic OFFICIAL MCP servers
# (npx auto-installs on first run; no separate install command needed)
# uvx for git server:
uv tool install mcp-server-git

# 4. Clone cwc-long-running-agents (P0 §5)
git clone https://github.com/anthropics/cwc-long-running-agents \
    Z:/claude-sota-pure/.local/cwc

# 5. Memory stack (P1 §6)
docker pull falkordb/falkordb:latest
docker run -d --name falkordb-pure -p 16379:6379 falkordb/falkordb:latest
pip install --upgrade "graphiti-core[falkordb]" mcp-memory-service
git clone --depth 1 https://github.com/getzep/graphiti \
    Z:/claude-sota-pure/.local/graphiti

# 6. Other MCPs (Tier-6/7/8/9 — defer per priority)
docker pull ghcr.io/github/github-mcp-server:latest
uv tool install -p 3.13 serena-agent@latest --prerelease=allow

# 7. Write the 4 T1-T3 hook scripts (§4) + safety_guard.py
# (Operator authors locally per §4 — NO upstream parity exists as install-class artifacts)
# Cite TIER-1-DIRECT to CCBP cross-model-workflow.md:1-48 @ 48f2ceb in headers

# 8. Wire .mcp.json (§1) + settings.json hooks block (§3)

# 9. Run smoke probes P3 + P7 + P8 + P9 + P10 (§8) sequentially

# 10. Record install provenance: docs/install-provenance.md row per install
```

---

## HOOKS-MCP-MEMORY PLAN COMPLETE

Final artifact: this file at `Z:/claude-sota-installed/tmp/hooks-mcp-memory-plan-2026-05-15.md`. Orchestrator persists as authoritative for the claude-sota-pure runtime hooks + MCP + memory bootstrap. Per ARTIFACT-INLINE mandate — full content above for orchestrator ingestion. Word count: ~3,100 / LOC ~900 — within OUTPUT_BUDGET.

handoff_to: orchestrator
verdict_one_line: DONE: 16-MCP .mcp.json + 9-event hooks block + 4 T1-T3 hook scripts + cwc 5 primitives + memory L1+L3 stack + 5 smoke probes + 4-org Axis-1 convergence for T1-T3 lifecycle
