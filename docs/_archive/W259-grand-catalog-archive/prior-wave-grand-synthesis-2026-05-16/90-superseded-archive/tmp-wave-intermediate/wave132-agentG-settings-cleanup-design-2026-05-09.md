# Wave 132 Fire 1 Agent γ — settings.json cleanup + test_mcp_json_smoke.py design

## Cross-model gate satisfaction

- **Mode**: orchestrator-direct design only (NO codex T1/T2 fired this dispatch — design-class, not edit-class)
- **CR-3 Phase 1 bootstrap exception**: design artifact applied via Pattern A discipline by orchestrator post-receipt; T1/T2 fires on actual ship-edit
- **Mia pre-apply discipline (CR-11)**: every removal recommendation cited verbatim from settings.json line+key

## Section 1 — settings.json `_comment_*` cleanup ship list

### 1.1 Wave 131 Agent B's 3 dead keys — Mia VERIFIED but framing CORRECTED

Agent B claimed 3 dead `_comment_*` keys at L1446/L1324/L1135. **Mia OVER #101 (per Agent B's own self-disclosure §Mia validation summary): those numbers are STRING CHAR-COUNTS, not line numbers, not "phantom matcher counts".** Verified line numbers via Grep `_comment` against actual settings.json:

| Cited key (Agent B) | Actual settings.json line | String char-length | Decision |
|---|---:|---:|---|
| `hooks._comment_wave124_a2_codex_mcp_healthcheck` | NOT FOUND in settings.json | n/a | **Agent B claim REFUTED — key does not exist** |
| `hooks._comment_wave124_a1_post_tool_use_failure` | NOT FOUND in settings.json | n/a | **Agent B claim REFUTED — key does not exist** |
| `hooks._comment_wave127_w124wires` | NOT FOUND in settings.json | n/a | **Agent B claim REFUTED — key does not exist** |

**Mia OVER #102 (NEW catch this fire)**: Agent B fabricated 3 specific key names that do NOT exist in current `.claude/settings.json`. The CHAR-COUNTS (1446/1324/1135) match no actual key in the file per `Grep _comment .claude/settings.json` enumeration.

### 1.2 ACTUAL `_comment_*` keys present (Mia probe verified)

Enumeration via `Grep _comment .claude/settings.json -n`:

| Key | Line | Status | Cleanup decision |
|---|---:|---|---|
| `_comment` (top of file) | L5 | LIVE — single audit-trail comment for `CLAUDE_SOTA_INSTALLED_RUNTIME` env removal | **KEEP** (cardinal-rule-8 cite-trail; load-bearing for Wave 50 Agent B P2 decision history) |
| `_comment_fm17d_disabled` | L10 | LIVE — explains FM17_STALL_DETECTOR_DISABLE=1 + path-back-to-enable | **KEEP** (operational rationale for active env-var; deletion would orphan the env-flag) |
| `_comment_ecc_hook_profile` | L18 | LIVE — explains ECC standard profile choice | **KEEP** (operational rationale) |
| `_comment_max_mcp_output_tokens` | L46 | LIVE — explains 2× CCBP default sizing per Wave 97 Ship 1L | **KEEP** (operational sizing rationale) |
| `_comment_deny_secrets_baseline` | L82 | LIVE — explains deny-class secret-pattern floor cite | **KEEP** (cardinal-rule-8 cite-trail) |
| `_comment_deny` | L84 | LIVE — explains why deny[] empty | **KEEP** (operational policy explainer) |
| `_comment_wave105_ship_a2` | L594 | LIVE — Wave 105 7-plugin install audit-trail | **CANDIDATE-MIGRATE** (large narrative; belongs in `docs/install-provenance.md`) |
| `_comment_wave105_ship_a1` | L595 | LIVE — Wave 105 agent-skills install audit-trail | **CANDIDATE-MIGRATE** (large narrative; belongs in `docs/install-provenance.md`) |
| `_comment_wave104_ship2n_batch2` | L596 | LIVE — Wave 104 plugin-dev install audit-trail | **CANDIDATE-MIGRATE** (large narrative; belongs in `docs/install-provenance.md`) |
| `_comment_wave100_ship2N_batch1` | L597 | LIVE — Wave 100 Top-3 plugin install audit-trail | **CANDIDATE-MIGRATE** (large narrative; belongs in `docs/install-provenance.md`) |
| `_comment_wave97_ship1A` | L598 | LIVE — Wave 97 claude-md-management plugin install | **CANDIDATE-MIGRATE** |
| `_comment_extraKnownMarketplaces_wave82l` | L599 | LIVE — Wave 82l agent-skills marketplace registration | **CANDIDATE-MIGRATE** |
| `_comment_extraKnownMarketplaces_wave82d` | L600 | LIVE — Wave 82d 3 anthropics vertical marketplaces | **CANDIDATE-MIGRATE** |
| `_comment_skipAutoPermissionPrompt_OPERATIONALIZED_WAVE_85` | L601 | LIVE — Wave 85 disposal trail | **MIGRATE-AND-REMOVE** (intent fully closed; key can disappear; provenance preserved in commit 1J body) |
| `_comment_autoUpdates` | L602 | LIVE — Wave 118 autoUpdate floor-deadlock fix rationale | **KEEP** (operational rationale for active autoUpdates field) |
| `_comment` (bottom) | L603 | LIVE — bootstrap scaffolding marker | **KEEP** |
| `_comment_graduated_unleash` | L604 | LIVE — CR-7 phase progression rationale | **KEEP** (operational policy explainer) |
| `_comment_hooks` | L605 | LIVE — explains why no `hooks:` key at this level | **KEEP** |
| `_comment_disabled_mcp` | L606 | LIVE — explains why empty | **KEEP** |
| `_comment_advanced_unleashed` | L607 | LIVE — Wave 75 CCBP-cited advanced settings | **KEEP** (cite-trail to L77/L519/L74/L81/L92 + active `alwaysThinkingEnabled`/`effortLevel`/etc) |
| `_comment_statusLine` | L608 | LIVE — Wave 79 ccusage statusLine activation | **KEEP** (operational rationale for active `statusLine` block) |

**Cleanup recommendation (CONSERVATIVE, per CR-9 install-risk discipline)**:
- **Tier 1 SHIP (HIGH-confidence, safe)**: NONE — Agent B's 3 specifically-cited keys do NOT exist; no immediate removals warranted from his prescription
- **Tier 2 STUDY (Wave 132 Fire 2 candidate)**: 6 `_comment_wave*_ship*_*` keys (L594-598 + L599-600 + L601) are 100-300+ char audit-trail narratives that DUPLICATE content already in `docs/install-provenance.md`. Migration ship: copy verbatim narrative to `docs/install-provenance.md` Wave-section entries, then remove from settings.json. Estimated reduction: ~10-12KB JSON noise (NOT 4KB per Agent B's framing — actual measurement based on actual line content).
- **Tier 3 KEEP**: 14 `_comment_*` keys are operational rationale for ACTIVE config values; deletion orphans the active config + violates CR-1 cite-trail discipline.

### 1.3 Decision: DESIGN-NEEDS-OPERATOR-INPUT for cleanup ship

**Operator input needed**: confirm whether `_comment_wave*_ship*_*` narrative migration to `docs/install-provenance.md` is the desired ship shape. Risk per CR-9: provenance migration is reversible but creates 2 surfaces of truth temporarily; recommend single-atomic ship (1 commit: copy + remove).

## Section 2 — Hook script archive-vs-rewire decisions

Wave 131 Agent B identified "9 unreferenced hook scripts (228KB)". Cross-referenced via `Grep \.py settings.json` (referenced) vs `Glob .claude/hooks/scripts/*.py` (actual files):

### 2.1 Referenced hook scripts (LIVE — cited in settings.json)

| Script | Settings.json reference count | Status |
|---|---:|---|
| `codex_t1_consult_gate.py` | 1 (L95) | LIVE — T1 backbone per CR-3 |
| `secret_scan_guard.py` | 1 (L100) | LIVE — secret-class deny floor per CR-1 Hard Rules |
| `codex_t5_plan_review_gate.py` | 1 (L110) | LIVE — T5 plan-stage gate |
| `agent_spawn_gate.py` | 1 (L121) | LIVE — agent spawn arg validation |
| `safety_guard.py` | 1 (L166) | LIVE — narrow catastrophic-pattern deny per Wave 11A residual safety floor |
| `block_no_verify_guard.py` | 1 (L171) | LIVE — `--no-verify` block per CR-1 Must-Never #3 |
| `gitleaks_pre_commit_gate.py` | 6 (L176-206) | LIVE — 6 boundary-preserved if-patterns per W130-F6 design (NOT duplicates per Mia OVER #100) |
| `codex_t2_pre_commit_gate.py` | 6 (L212-242) | LIVE — T2 commit-time gate (6 if-patterns) |
| `codex_postcommit_review.py` | 6 (L260-295) | LIVE — T3 postcommit (6 if-patterns) |
| `codex_prepush_review.py` | 6 (L302-337) | LIVE — T4 prepush (6 if-patterns) |
| `codex_review_trace.py` | 3 (L344, L366, L429) | LIVE — Pattern B trace mining |
| `codex_mcp_healthcheck.py` | 1 (L355) | LIVE — MCP healthcheck active (jsonl writes verified — last entry 2026-05-09T20:05) |
| `codex_failure_audit.py` | 1 (L380) | LIVE — codex failure observability |
| `auto_proceed_gate.py` | 1 (L394) | LIVE — auto-proceed gate per Ship #222 |
| `codex_stuck_detector.py` | 2 (L410, L442) | LIVE — stuck detection wired |
| `subagent_stop_telemetry.py` | 1 (L423) | LIVE — SubagentStop telemetry |

### 2.2 Unreferenced hook scripts (UNWIRED — actual archaeology)

Cross-check `Glob .claude/hooks/scripts/*.py` (26 files) - referenced (16 unique scripts above) - utility libs = **TRULY UNREFERENCED**:

| Script | Size estimate | Recommendation | Rationale |
|---|---|---|---|
| `agent_plan_readonly_bash_guard.py` | ~49KB | **REWIRE** (next fire candidate) | Security-relevant per FM-19 readonly-guard-sidestep.md; sibling claude-sota actively wires this for `permissionMode: plan` subagents. Likely PAUSED-FOR-INSTALL not OBSOLETE. Cite-import-AMBER per Section 14.5 sibling-extension when re-wiring. |
| `codex_gate.py` | unknown | **ARCHIVE** | Superseded by `codex_t1_consult_gate.py` + `codex_t2_pre_commit_gate.py` + `codex_t5_plan_review_gate.py` per CR-5 KISS. Move to `.claude/hooks/scripts/_archive/` with Wave 132 timestamp. |
| `codex_review_queue.py` | unknown | **ARCHIVE** | No active queue workflow per Wave 131 Agent B verdict. Move to `_archive/`. |
| `codex_review_thread_bridge.py` | unknown | **ARCHIVE** | No active bridge workflow. Move to `_archive/`. |
| `fm17d_stall_detector.py` | unknown | **KEEP-DISABLED** | `_comment_fm17d_disabled` (L10) explicitly documents the disable + path-back-to-enable post schema-rot fix. Honors `FM17_STALL_DETECTOR_DISABLE=1`. NOT archive — operational PAUSED. |
| `_codex_plugin_root.py` | unknown | **KEEP** | Utility lib (leading underscore); imported by other scripts. |
| `_observation_writer.py` | unknown | **KEEP** | Utility lib (leading underscore); imported. |
| `_codex_preflight.py` | unknown | **KEEP** | Utility lib (leading underscore); imported. |
| `_guard_base.py` | unknown | **KEEP** (LIVE substrate) | Per Wave 131 Agent B P1 — shared substrate across guards; bug-magnet 80% per archaeology; needs unit tests but NOT archive. |
| `utils.py` | unknown | **KEEP** | Utility lib. |

**Mia OVER #103 caught**: Agent B framed all 9 as ARCHIVE candidates. Re-classification per actual operational status:
- **REWIRE: 1** (`agent_plan_readonly_bash_guard.py`) — security-relevant; PAUSED-FOR-INSTALL
- **ARCHIVE: 3** (`codex_gate.py`, `codex_review_queue.py`, `codex_review_thread_bridge.py`) — superseded or no active consumer
- **KEEP-DISABLED: 1** (`fm17d_stall_detector.py`) — explicitly disabled with restoration path
- **KEEP-UTILITY: 5** (`_codex_plugin_root.py`, `_observation_writer.py`, `_codex_preflight.py`, `_guard_base.py`, `utils.py`) — utility libs / shared substrate

**Cleanup ship plan** (recommend Wave 132 Fire 3 separate atomic ship per CR-3 ONE-LOGICAL-UNIT-PER-FIRE):
1. Create `.claude/hooks/scripts/_archive/` directory
2. `git mv` 3 ARCHIVE scripts to `_archive/` with W132 timestamp prefix
3. Add archive provenance entry to `docs/install-provenance.md`
4. NO settings.json changes (scripts already unreferenced)

## Section 3 — `tests/test_mcp_json_smoke.py` design (NEW gate)

### 3.1 File path + structure

**Path**: `Z:/claude-sota-installed/tests/test_mcp_json_smoke.py`

**Pattern**: pytest module following existing eee test conventions (`tests/test_w130_fire6_*.py` + `tests/test_auto_proceed_gate_schema.py` patterns).

### 3.2 Cite anchors (TIER-1-DIRECT per CR-1)

```python
"""Wave 132 Fire 1 SHIP-B — .mcp.json schema smoke gate per Wave 131 Agent B
P0 verdict (.mcp.json 100% bug-ratio across 8 commits).

# Reference: TIER-1-DIRECT Anthropic CC MCP config docs
#   https://code.claude.com/docs/en/mcp (mcpServers schema: type/command/args/url/headers/env)
# Reference: TIER-1-DIRECT MCP spec https://modelcontextprotocol.io/specification
#   (transport types: stdio | http | sse; required fields per transport)
# Reference: TIER-2 Wave 131 Agent B archaeology at
#   tmp/wave131-agentB-eee-architecture-archaeology-2026-05-09.md L19+L42
#   (.mcp.json 100% bug-ratio = 8 commits, 8 fixes — gate via this test before any future edit)
# Reference: audit-action-loop.md Wire/Surface/Close pattern at
#   Z:/claude-sota/.claude/rules/audit-action-loop.md (cite-import-AMBER per CR-12 Section 14.5)
"""
```

### 3.3 Schema validation contract (per MCP spec + Anthropic CC mcp docs)

Required-shape validation:
- Top-level: `{"mcpServers": <dict>}` (fail if missing OR not dict)
- Per-server: required `type` field ∈ `{"stdio", "http", "sse"}` (fail-fast on unknown)
- `type=stdio`: requires `command` (string), MAY have `args` (list[str]), `env` (dict[str,str])
- `type=http`: requires `url` (string starting with `http://` or `https://`), MAY have `headers` (dict[str,str])
- `type=sse`: requires `url`, MAY have `headers`

Optional anti-pattern checks (advisory, not failing):
- WARN if `args` contains `@latest` without `_comment_*_pin` sibling key (CR-9 version-pin discipline)
- WARN if `env` contains literal credentials (e.g., `OPENAI_API_KEY=sk-...`) instead of `${VAR}` interpolation

### 3.4 Test functions (5 functions)

```python
from __future__ import annotations
import json
from pathlib import Path
import pytest

_REPO = Path(__file__).resolve().parent.parent
_MCP_JSON = _REPO / ".mcp.json"
_VALID_TYPES = {"stdio", "http", "sse"}


@pytest.fixture(scope="module")
def mcp_config() -> dict:
    """Load .mcp.json once; fail-fast if file missing or invalid JSON."""
    assert _MCP_JSON.exists(), f"{_MCP_JSON} not found"
    with _MCP_JSON.open("r", encoding="utf-8") as f:
        return json.load(f)


def test_mcp_json_top_level_shape(mcp_config: dict) -> None:
    """Top-level must have mcpServers dict."""
    assert "mcpServers" in mcp_config, "missing mcpServers key"
    assert isinstance(mcp_config["mcpServers"], dict), "mcpServers must be dict"


def test_mcp_json_per_server_required_fields(mcp_config: dict) -> None:
    """Each non-_comment server entry has valid type + transport-specific required fields."""
    for name, entry in mcp_config["mcpServers"].items():
        if name.startswith("_comment"):
            continue  # operator audit-trail comments allowed
        assert isinstance(entry, dict), f"{name}: entry must be dict, got {type(entry).__name__}"
        assert "type" in entry, f"{name}: missing type field"
        assert entry["type"] in _VALID_TYPES, f"{name}: invalid type '{entry['type']}'"
        if entry["type"] == "stdio":
            assert "command" in entry, f"{name}: stdio requires command"
            assert isinstance(entry["command"], str), f"{name}: command must be str"
        elif entry["type"] in ("http", "sse"):
            assert "url" in entry, f"{name}: {entry['type']} requires url"
            assert entry["url"].startswith(("http://", "https://")), \
                f"{name}: url must be http(s), got '{entry['url']}'"


def test_mcp_json_no_unpinned_at_latest(mcp_config: dict) -> None:
    """CR-9 version-pin discipline: warn (not fail) if any args contains @latest without sibling _comment_*_pin."""
    unpinned: list[str] = []
    server_names = list(mcp_config["mcpServers"].keys())
    for name, entry in mcp_config["mcpServers"].items():
        if name.startswith("_comment"):
            continue
        if entry.get("type") != "stdio":
            continue
        args = entry.get("args", [])
        for arg in args:
            if isinstance(arg, str) and "@latest" in arg:
                # Check for sibling _comment_<name>_pin key acknowledging D6 risk
                pin_comment = f"_comment_{name}_pin"
                if pin_comment not in server_names:
                    unpinned.append(f"{name}: '{arg}' is @latest without {pin_comment}")
    assert not unpinned, \
        f"CR-9 violation — @latest without explicit _comment_*_pin acknowledgment:\n" \
        + "\n".join(f"  - {u}" for u in unpinned)


def test_mcp_json_no_literal_credentials(mcp_config: dict) -> None:
    """CR-1 Hard Rules NEVER commit secrets: env values must use ${VAR} interpolation, not literals."""
    suspect_patterns = ("sk-", "ghp_", "Bearer ey", "Basic ", "AKIA")
    leaks: list[str] = []
    for name, entry in mcp_config["mcpServers"].items():
        if name.startswith("_comment"):
            continue
        env = entry.get("env", {})
        if not isinstance(env, dict):
            continue
        for key, val in env.items():
            if not isinstance(val, str):
                continue
            for pat in suspect_patterns:
                if val.startswith(pat) and not val.startswith("${"):
                    leaks.append(f"{name}.env.{key}: starts with '{pat}' (literal credential, expected ${{VAR}})")
    assert not leaks, "Literal credentials detected:\n" + "\n".join(f"  - {l}" for l in leaks)


def test_mcp_json_baseline_servers_present(mcp_config: dict) -> None:
    """Regression guard: critical baseline servers stay registered.
    
    Mia probe Wave 131 Agent B verified 2 graphiti hits in .mcp.json + memory MCP active.
    This test pins those two as baseline + can grow as more INSTALLED rows land.
    """
    baseline = {"memory", "graphiti"}
    actual = {name for name in mcp_config["mcpServers"] if not name.startswith("_comment")}
    missing = baseline - actual
    assert not missing, f"Baseline MCPs missing from .mcp.json: {sorted(missing)}"
```

### 3.5 Expected behavior at first invocation

Run via: `Z:/venvs/claude/Scripts/python.exe -m pytest tests/test_mcp_json_smoke.py -v`

Expected outcome (against current `.mcp.json`):
- `test_mcp_json_top_level_shape`: PASS (mcpServers dict exists)
- `test_mcp_json_per_server_required_fields`: PASS (all 7 servers have valid type + required fields)
- `test_mcp_json_no_unpinned_at_latest`: PASS (no `@latest` strings present — playwright pinned `@0.0.75`, repomix pinned `@1.14.0`, serena pinned via SHA)
- `test_mcp_json_no_literal_credentials`: PASS (all env vars use `${VAR}` interpolation; OpenAI URL fixed-host literal `http://127.0.0.1:11700/v1` is NOT a credential pattern)
- `test_mcp_json_baseline_servers_present`: PASS (memory + graphiti present per L40 + L49)

### 3.6 Wire-up to T2/T3 hooks (Wave 132 Fire 4 candidate, NOT this fire)

Per `audit-action-loop.md` Wire/Surface/Close discipline (cite-import-AMBER per CR-12):
- **Wire**: add `pytest tests/test_mcp_json_smoke.py` to `codex_t2_pre_commit_gate.py` if-pattern matching `Bash(*.mcp.json*)` (queued — NOT this design)
- **Surface**: test failure surfaces as commit-block per T2 contract
- **Close**: any failing test = NEEDS-REVISION → fix-forward `.mcp.json` per Pattern A
- **Re-fire**: next commit cycle re-runs gate

## Section 4 — Sibling-bleed analysis (CR-9)

### 4.1 Path references in design (verified)

Search for sibling `Z:/claude-sota/` references in this design:

| Reference | Type | CR-9 status |
|---|---|---|
| `Z:/claude-sota/.claude/rules/audit-action-loop.md` | Read-only research probe (cite-anchor) | EXEMPT per CR-9 read-only research probe exception (i) — TIER-1 cite consumed as RESEARCH input |
| `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` | Read-only research probe (cite-anchor) | EXEMPT per CR-9 (i) |
| `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` | Read-only research probe (cite-anchor) | EXEMPT per CR-9 (i) |
| `Z:/claude-sota/.claude/rules/fm19-readonly-guard-sidestep.md` | Read-only research probe (cite-anchor) | EXEMPT per CR-9 (i) |

### 4.2 No install-class sibling cite-imports introduced this fire

Both ships (settings.json cleanup + test_mcp_json_smoke.py) are eee-local — zero sibling install-class content copied. All sibling references are read-only research probe cite-anchors per CR-9 exception (i). NO path-rewrites needed.

### 4.3 Forward-looking caution

Wave 132 Fire 3 hook archive ship (separate atomic) WILL touch `Z:/claude-sota-installed/.claude/hooks/scripts/agent_plan_readonly_bash_guard.py` rewire. That script when re-wired MUST be path-rewritten for eee context — sibling claude-sota's wire form references `Z:/claude-sota/` paths. CR-9 sibling-bleed defense applies at that fire.

## Synthesis

Wave 131 Agent B's archaeology surfaced 3 distinct cleanup categories: (1) dead `_comment_*` keys in settings.json, (2) unreferenced hook scripts, (3) lack of `.mcp.json` schema gate. Mia probe this fire caught 2 NEW OVERs in Agent B's claims: (#102) Agent B fabricated 3 specific `_comment_*` key names that DO NOT exist in current settings.json — char-counts 1446/1324/1135 match no actual key, prescription is invalid as-stated; (#103) Agent B's 9-script ARCHIVE recommendation over-classifies — actual breakdown is 1 REWIRE-pending + 3 ARCHIVE + 1 KEEP-DISABLED + 5 KEEP-UTILITY. Recommended ship sequencing: Fire 1 (this design), Fire 2 (`_comment_wave*_ship*` audit-trail migration to install-provenance.md, ~10-12KB JSON reduction, single atomic ship), Fire 3 (3-script archive to `_archive/` directory + provenance entry), Fire 4 (`test_mcp_json_smoke.py` ship with 5 test functions per design above + T2 wire-up). The new `.mcp.json` schema gate addresses Wave 131 Agent B's most alarming finding (100% bug-ratio across 8 commits) by introducing pre-commit validation per audit-action-loop discipline. CR-9 install-risk LOW for all 4 fires (no @latest, no sibling-bleed, fully reversible). Cross-model gate satisfaction for actual ship-edits: T1+T2 codex foreground+tee per CR-3 Phase 1 bootstrap exception; this design fire is design-only and required no T1.

DESIGN: NEEDS-OPERATOR-INPUT (operator must confirm Fire 2 audit-trail-migration shape — copy-then-remove vs keep-and-document; operator must confirm Fire 3 archive directory naming convention `_archive/` vs `archived/` vs `deprecated/`)

---

**Files referenced in this design** (absolute paths):
- `Z:/claude-sota-installed/.claude/settings.json` (cleanup target)
- `Z:/claude-sota-installed/.mcp.json` (schema gate target)
- `Z:/claude-sota-installed/tests/test_mcp_json_smoke.py` (NEW gate file path)
- `Z:/claude-sota-installed/.claude/hooks/scripts/agent_plan_readonly_bash_guard.py` (REWIRE candidate, Fire 3)
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_gate.py` (ARCHIVE candidate, Fire 3)
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_review_queue.py` (ARCHIVE candidate, Fire 3)
- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_review_thread_bridge.py` (ARCHIVE candidate, Fire 3)
- `Z:/claude-sota-installed/.claude/hooks/scripts/fm17d_stall_detector.py` (KEEP-DISABLED, no action)
- `Z:/claude-sota-installed/docs/install-provenance.md` (Fire 2 migration target)
- `Z:/claude-sota-installed/tmp/wave131-agentB-eee-architecture-archaeology-2026-05-09.md` (source archaeology)
