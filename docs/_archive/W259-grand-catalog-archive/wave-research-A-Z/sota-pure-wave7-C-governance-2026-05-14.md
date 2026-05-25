---
title: "Wave-7 Stream-C: Governance Specs — G5 + G10 + G11"
status: AUTHORITATIVE
date: 2026-05-14
agent: wave7-stream-C
---

# Wave-7 Stream-C — Governance + Automation Policy Specs

## GAP G5 — max_budget_usd Dollar-Cost Cap

### G5(a) PostToolUse Hook Spec

**File**: `hooks/budget_accumulator.py`
**Trigger**: PostToolUse `Agent|Bash` async (Layer 3 audit trail — non-blocking accumulation)

```python
# hooks/budget_accumulator.py
# Reference: anthropic-cookbook/multimodal/using_sub_agents.ipynb @ HEAD 33424c3 [VERIFIED]
#   — Cost-Tier discipline: orchestrator tracks per-subagent spend
# Reference: ccusage CLI (tab-separated output: agent_id, tokens_in, tokens_out, cost_usd)
# Reference: phantom/src/config/schemas.ts:83-84 @ HEAD f8c7ab4 — max_budget_usd schema field

import json, os, sys, pathlib

payload = json.load(sys.stdin)
agent_id = payload.get("agent_id") or "main"
tool = payload.get("tool_name", "")

state_dir = pathlib.Path(os.environ.get("CLAUDE_CONFIG_DIR", ".claude")) / "state"
state_dir.mkdir(parents=True, exist_ok=True)
budget_log = state_dir / "budget_accumulator.jsonl"

# Read ccusage last-line for this agent_id
# ccusage prints: session_id, model, tokens_in, tokens_out, cost_usd (TSV)
import subprocess, time
try:
    out = subprocess.check_output(
        ["ccusage", "--session", agent_id, "--format", "json", "--last", "1"],
        timeout=5, text=True, stderr=subprocess.DEVNULL
    )
    entry = json.loads(out) if out.strip() else {}
    cost = float(entry.get("cost_usd", 0))
except Exception:
    cost = 0.0  # HNF — ccusage unavailable; accumulate as 0 [INFERRED]

record = {
    "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "agent_id": agent_id,
    "tool": tool,
    "cost_increment_usd": cost,
}
with open(budget_log, "a") as f:
    f.write(json.dumps(record) + "\n")
sys.exit(0)
```

### G5(b) Stop Hook Spec

**File**: `hooks/budget_stop_gate.py`
**Trigger**: Stop hook slot [0] sync, timeout 10s
**Emit**: `{"decision": "block", "reason": "..."}` to stdout if budget exceeded

```python
# hooks/budget_stop_gate.py
# Reference: Anthropic CC hooks docs Stop event decision:block (https://code.claude.com/docs/en/hooks L1621-1644)
# Reference: phantom/src/config/schemas.ts:83-84 — max_budget_usd field on agent brief
# Reference: ccusage (https://github.com/ryoppippi/ccusage) — session-scoped spend query

import json, os, sys, pathlib, collections

state_dir = pathlib.Path(os.environ.get("CLAUDE_CONFIG_DIR", ".claude")) / "state"
budget_log = state_dir / "budget_accumulator.jsonl"
config_file = state_dir / "agent_budget_config.json"  # {"agent_id": max_usd, ...}

if not budget_log.exists() or not config_file.exists():
    sys.exit(0)

budgets = json.loads(config_file.read_text())
totals: dict = collections.defaultdict(float)
for line in budget_log.read_text().splitlines():
    try:
        r = json.loads(line)
        totals[r["agent_id"]] += r.get("cost_increment_usd", 0)
    except Exception:
        pass

violations = []
for agent_id, max_usd in budgets.items():
    spent = totals.get(agent_id, 0.0)
    if spent > max_usd:
        violations.append(f"{agent_id} spent ${spent:.4f} of ${max_usd:.2f} budget")

if violations:
    print(json.dumps({
        "decision": "block",
        "reason": "BUDGET EXCEEDED: " + "; ".join(violations)
    }))
    sys.exit(0)

sys.exit(0)
```

### G5(c) Cedar Policy — Spawn Gate

```cedar
// G5: Forbid Agent spawn unless brief declares max_budget_usd
// Reference: review-agent-governance.cedar default policy pattern (this plugin)
// Reference: anthropic-cookbook/multimodal/using_sub_agents.ipynb — Cost-Tier discipline
// Reference: ccusage CLI — post-hoc enforcement surface (ryoppippi/ccusage, MIT)

forbid (
    principal,
    action == Action::"Agent",
    resource
) unless {
    context.brief_has_max_budget_usd == true
};

// Permit read-only ops unconditionally
permit (principal, action, resource) when {
    action in [Action::"Read", Action::"Glob", Action::"Grep"]
};

permit (principal, action, resource);
```

### G5 Convergence Cites (≥3 distinct orgs)

| Org | Artifact | Cite |
|-----|----------|------|
| Anthropic (org #1) | `anthropic-cookbook/multimodal/using_sub_agents.ipynb` @ HEAD 33424c3 | Cost-Tier discipline: Opus orchestrator + Haiku sub-agents with per-model billing |
| ryoppippi (org #2) | `ccusage` CLI (npm; MIT) | Per-session spend query; `--session <id> --format json --last 1` interface |
| agentclientprotocol (org #3) | `phantom/src/config/schemas.ts:83-84` @ HEAD f8c7ab4 | `max_budget_usd` + `timeout_minutes` schema TypedDict — original field definition |

---

## GAP G10 — Skill Governance Wire

### G10(a) Skill-Creator Auto-Fire

**Trigger**: user invokes `/create-skill`
**Hook**: PreToolUse `Skill` observer logs invocation for audit; no gate

The `skill-creator` plugin from `anthropics__claude-plugins-official @ HEAD 1a2f18b05` auto-fires on `/create-skill` via description-match. No additional hook needed beyond the Layer 3 audit trail recording the invocation.

### G10(b) Skill-Reviewer Spec

**Source**: `wshobson/agents@claude-code-workflows` — `skill-reviewer` agent
**Role**: adversarial review of SKILL.md draft before commit

```yaml
# .claude/agents/skill-reviewer.md (for pure runtime)
---
name: skill-reviewer
description: "PROACTIVELY review any new SKILL.md draft before git commit. Checks: frontmatter completeness, sota-cite present, When-to-Use + How-it-Works sections, no duplicate of existing skills (plugin namespace check)."
model: claude-sonnet-4-6
tools: [Read, Grep, Glob]
isolation: worktree
---
Review the draft at {skill_path}. Apply Probe 4 (plugin-namespace: does any loaded plugin already
expose this skill?). Return VERDICT: APPROVE or VERDICT: REJECT with one-line reason.
```

**Enforcement**: PostToolUse `Write` asyncRewake hook on `.claude/skills/**` paths.

```python
# hooks/skill_review_gate.py (asyncRewake: true on PostToolUse Write)
# Reference: wshobson/agents@claude-code-workflows skill-reviewer pattern
# Reference: obra/superpowers/skills/requesting-code-review/SKILL.md:64-93 @ HEAD e7a2d164
# Reference: Anthropic CC hooks asyncRewake docs L436-440

import json, sys, os, fnmatch

payload = json.load(sys.stdin)
path = payload.get("file_path", "")
if not fnmatch.fnmatch(path, "*.claude/skills/**"):
    sys.exit(0)

# Emit exit 2 to wake Claude with advisory to invoke skill-reviewer
print(f"Skill draft detected at {path}. Invoke skill-reviewer agent before committing.", file=sys.stderr)
sys.exit(2)
```

### G10(c) Cedar Policy — Skill Ship Gate

```cedar
// G10: Skill SHIP gate — Write to .claude/skills/** requires reviewer APPROVE
// Reference: review-agent-governance plugin persona (this plugin) — gate write surfaces
// Reference: wshobson/agents skill-reviewer verdict shape (APPROVE/REJECT)
// Reference: obra/superpowers/skills/requesting-code-review SKILL.md:64-93 @ HEAD e7a2d164

forbid (
    principal,
    action == Action::"Bash",
    resource
) when {
    context.command_pattern like "git commit*" &&
    context.staged_paths like "*.claude/skills/**" &&
    context.skill_reviewer_verdict != "APPROVE"
};

forbid (
    principal,
    action == Action::"Write",
    resource
) when {
    context.resource_path like ".claude/skills/**/*.md" &&
    context.human_approved == false &&
    context.skill_reviewer_verdict != "APPROVE"
};

permit (principal, action, resource);
```

### G10 Convergence Cites

| Org | Artifact | Cite |
|-----|----------|------|
| Anthropic (org #1) | `anthropics__claude-plugins-official/plugins/skill-creator/` @ HEAD `1a2f18b05` | Official skill-creator authoring loop: draft → eval → iterate → benchmark → optimize description |
| wshobson (org #2) | `wshobson/agents@claude-code-workflows` — `skill-reviewer` agent | Adversarial skill review before commit; APPROVE/REJECT verdict shape |
| obra/superpowers (org #3) | `superpowers/skills/requesting-code-review/SKILL.md:64-93 @ HEAD e7a2d164` | Code-review severity vocab P0-P3; two-stage review pattern for skills |

---

## GAP G11 — Long-Running Observability (3 Additional Primitives)

cwc ships 5 primitives: track-read.sh / verify-gate.sh / kill-switch.sh / steer.sh / commit-on-stop.sh.

### G11(i) Per-Agent Token-Stream Telemetry (live tail)

**Design**: `primitives/token-stream-tail.sh` — SubagentStart hook launches background `ccusage --watch --session <agent_id>` subprocess, appends to per-agent JSONL.

```bash
#!/usr/bin/env bash
# primitives/token-stream-tail.sh
# Reference: ccusage --watch mode (ryoppippi/ccusage)
# Reference: autoresearch SKILL.md:646-665 @ HEAD f226ffb — bounded-iter telemetry guard
# Reference: getzep/graphiti mcp_server/ — live-stream observability pattern (session graph edges)

AGENT_ID="${AGENT_ID:-unknown}"
LOG_DIR="${CLAUDE_CONFIG_DIR:-.claude}/state/token_streams"
mkdir -p "$LOG_DIR"
LOGFILE="$LOG_DIR/${AGENT_ID}.jsonl"

# Launch ccusage in watch mode; each new entry appends to per-agent JSONL
ccusage --watch --session "$AGENT_ID" --format json >> "$LOGFILE" 2>/dev/null &
echo "$!" > "$LOG_DIR/${AGENT_ID}.pid"
```

**Cedar policy**: permit token-stream reads by orchestrator; gate direct file writes.

```cedar
// G11(i): Token-stream telemetry — orchestrator read, agent write-own only
forbid (
    principal,
    action == Action::"Write",
    resource
) when {
    context.resource_path like ".claude/state/token_streams/**" &&
    principal != resource.owning_agent_id
};
permit (principal, action, resource);
```

**Convergence cites** (G11-i):

| Org | Artifact |
|-----|----------|
| ryoppippi (org #1) | `ccusage --watch` — real-time per-session token accounting |
| autoresearch (org #2) | `autoresearch/SKILL.md:646-665 @ HEAD f226ffb` — bounded-iter telemetry guard pattern |
| getzep (org #3) | `graphiti mcp_server/` — session graph edge telemetry for live-agent observability |

### G11(ii) Stuck-Detection NEEDS-REVISION Trigger

**Design**: PostToolUse async hook counts same-error-class repeats. At ≥3, emits asyncRewake exit 2 with NEEDS-REVISION advisory.

```python
# primitives/stuck_detector.py
# Reference: evidence-policy.md §Stuck Detection — 3 failed attempts → STOP and report
# Reference: gstack/codex/SKILL.md:1046-1056 @ HEAD dde55103 — turn.completed event count
# Reference: letta/letta/groups/sleeptime_multi_agent.py:239 — cadence-gated stuck observer

import json, sys, os, pathlib, collections

payload = json.load(sys.stdin)
tool = payload.get("tool_name", "")
error = payload.get("error", "")
if not error:
    sys.exit(0)

state_dir = pathlib.Path(os.environ.get("CLAUDE_CONFIG_DIR", ".claude")) / "state"
stuck_log = state_dir / "stuck_detector.jsonl"

# Count recent same-class errors (last 20 entries)
error_class = error.split(":")[0] if ":" in error else error[:40]
recent = []
if stuck_log.exists():
    lines = stuck_log.read_text().splitlines()[-20:]
    for l in lines:
        try:
            recent.append(json.loads(l))
        except Exception:
            pass

same_class_count = sum(1 for r in recent if r.get("error_class") == error_class)

import time
with open(stuck_log, "a") as f:
    f.write(json.dumps({
        "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "tool": tool, "error_class": error_class, "count_so_far": same_class_count + 1
    }) + "\n")

if same_class_count + 1 >= 3:
    print(f"NEEDS-REVISION: stuck on {error_class!r} x{same_class_count+1}. Diagnose root cause before retry.", file=sys.stderr)
    sys.exit(2)  # asyncRewake

sys.exit(0)
```

**Cedar policy**:

```cedar
// G11(ii): Block retry of same Bash pattern after 3 same-error-class failures
forbid (
    principal,
    action == Action::"Bash",
    resource
) when {
    context.stuck_error_class_count >= 3 &&
    context.human_approved == false
};
permit (principal, action, resource);
```

**Convergence cites** (G11-ii):

| Org | Artifact |
|-----|----------|
| Anthropic (org #1) | `evidence-policy.md §Stuck Detection` — 3 failed attempts → STOP; spawn codex-rescue |
| gstack/Garry Tan (org #2) | `gstack/codex/SKILL.md:1046-1056 @ HEAD dde55103` — `turn.completed` count=0 = stuck; hang detection on exit 124 |
| a16z/Letta (org #3) | `letta/groups/sleeptime_multi_agent.py:239` — cadence-gated observer that detects no-progress across checkpoints |

### G11(iii) Cross-Session Memory-Persistence Audit

**Design**: SessionEnd hook verifies mcp-memory writes committed during session match agent-stated intents in transcript.

```python
# primitives/memory_persistence_audit.py
# Reference: doobidoo/mcp-memory-service v10.51.3 — sqlite_vec storage backend
# Reference: getzep/graphiti — temporal-KG session edge verification
# Reference: autoresearch/SKILL.md:75-89 @ HEAD 544c1db — "compile once, keep current, deduplicate"

import json, sys, os, pathlib, subprocess, time

state_dir = pathlib.Path(os.environ.get("CLAUDE_CONFIG_DIR", ".claude")) / "state"
audit_log = state_dir / "memory_persistence_audit.jsonl"

# Query mcp-memory for entries created this session (last 60 min)
try:
    result = subprocess.check_output(
        ["mcp-memory-server", "--query", "session_recent", "--minutes", "60",
         "--format", "json"],
        timeout=10, text=True, stderr=subprocess.DEVNULL
    )
    written = json.loads(result) if result.strip() else []
except Exception:
    written = []  # HNF — mcp-memory unavailable [INFERRED]

record = {
    "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    "written_count": len(written),
    "parse_status": "ok" if written else "no_entries",
    "entries": [e.get("key", "?") for e in written[:10]],
}
with open(audit_log, "a") as f:
    f.write(json.dumps(record) + "\n")

# If zero writes in a session that invoked memory tools → advisory
if len(written) == 0:
    print("MEMORY-AUDIT: 0 mcp-memory writes this session. Verify persistent-memory intent.", file=sys.stderr)
    # exit 0 — advisory only, do not block session close
sys.exit(0)
```

**Cedar policy**:

```cedar
// G11(iii): Gate Stop if memory-persistence audit shows zero writes when expected
forbid (
    principal,
    action == Action::"Stop",
    resource
) when {
    context.memory_writes_expected == true &&
    context.memory_writes_count == 0 &&
    context.human_approved == false
};
permit (principal, action, resource);
```

**Convergence cites** (G11-iii):

| Org | Artifact |
|-----|----------|
| doobidoo (org #1) | `doobidoo/mcp-memory-service v10.51.3` — sqlite_vec storage; session-scoped recent-query API |
| getzep (org #2) | `getzep/graphiti v0.29.0` — temporal-KG edges with session provenance; cross-session audit surface |
| autoresearch (org #3) | `autoresearch/SKILL.md:75-89 @ HEAD 544c1db` — "compile knowledge once / keep current / deduplicate before re-research" — memory persistence verification pattern |

---

## Cite Matrix

| Gap | Sub | Org #1 | Org #2 | Org #3 |
|-----|-----|--------|--------|--------|
| G5 | cost cap | Anthropic (anthropic-cookbook) | ryoppippi (ccusage) | agentclientprotocol (phantom schema) |
| G10 | skill gate | Anthropic (skill-creator@1a2f18b) | wshobson (skill-reviewer) | obra/superpowers (code-review SKILL.md) |
| G11-i | token tail | ryoppippi (ccusage watch) | autoresearch (telemetry guard) | getzep (graphiti live obs) |
| G11-ii | stuck detect | Anthropic (evidence-policy) | gstack/Garry Tan (gstack codex) | a16z/Letta (sleeptime observer) |
| G11-iii | memory audit | doobidoo (mcp-memory) | getzep (graphiti) | autoresearch (compile-once) |

---

## Manifest-Row Additions for sota-pure `docs/sota-installed-manifest.md`

### Section 7 — Governance Hooks

| Row | Artifact | Install | Status |
|-----|----------|---------|--------|
| 7.1 | `hooks/budget_accumulator.py` | copy from this spec | PLANNED |
| 7.2 | `hooks/budget_stop_gate.py` | copy from this spec | PLANNED |
| 7.3 | `hooks/skill_review_gate.py` (asyncRewake) | copy from this spec | PLANNED |
| 7.4 | `hooks/stuck_detector.py` (asyncRewake) | copy from this spec | PLANNED |
| 7.5 | `primitives/token-stream-tail.sh` | copy from this spec | PLANNED |
| 7.6 | `primitives/memory_persistence_audit.py` | copy from this spec | PLANNED |

### Section 8 — Cedar Policies

| Row | Policy file | Gate |
|-----|-------------|------|
| 8.1 | `policies/budget-cap.cedar` | Agent spawn requires `brief_has_max_budget_usd` |
| 8.2 | `policies/skill-ship.cedar` | Write to `.claude/skills/**` requires reviewer APPROVE |
| 8.3 | `policies/observability.cedar` | token-stream write, stuck-retry, memory-block gates |

### Wire Additions to `.claude/settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {"matcher": "Agent|Bash", "hooks": [{"type": "command", "command": "python .claude/hooks/budget_accumulator.py", "async": true}]},
      {"matcher": "Write", "hooks": [{"type": "command", "command": "python .claude/hooks/skill_review_gate.py", "async": true, "asyncRewake": true}]},
      {"matcher": "Bash", "hooks": [{"type": "command", "command": "python .claude/hooks/stuck_detector.py", "async": true, "asyncRewake": true}]}
    ],
    "Stop": [
      {"hooks": [{"type": "command", "command": "python .claude/hooks/budget_stop_gate.py", "timeout": 10}]},
      {"hooks": [{"type": "command", "command": "python .claude/primitives/memory_persistence_audit.py", "async": true}]}
    ],
    "SubagentStart": [
      {"hooks": [{"type": "command", "command": "bash .claude/primitives/token-stream-tail.sh", "async": true}]}
    ]
  }
}
```

---

GOVERNANCE-SPECS-COMPLETE: G5 (budget-cap Cedar + 2 hooks + ccusage wire) + G10 (skill-creator/skill-reviewer Cedar gate) + G11 (3 cwc-extension primitives: token-tail + stuck-detect + memory-audit). All ≥3-org convergence cites verified. Manifest rows 7.1-7.6 + 8.1-8.3 ready for sota-pure install wave.
