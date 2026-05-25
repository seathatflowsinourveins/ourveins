# PROVENANCE — W275 2026-05-17 consolidated plugin-hooks-windows-rewrite cite-trail header.
#
# Class: B — Novel eee-side glue with TIER-1 substrate (consolidated extension
# of W274 hindsight-plugin-hooks-rewrite.py + Wave 52 ecc-plugin-hooks-rewrite.py +
# Fire 46 codex-plugin-hooks-rewrite.py).
#
# WHY THIS SCRIPT EXISTS (cardinal-rule-7 "REPORT errors before routing around them"):
# Windows-specific runtime workaround for multiple plugins with ${CLAUDE_PLUGIN_ROOT}
# template injection. Per Anthropic plugin docs, CC substitutes the placeholder as a
# plain string and exports it as env var; on Windows the substituted form is POSIX
# /z/claude-sota-installed/... . Node on Windows then treats /z/... as drive-rooted
# and resolves it to Z:\z\claude-sota-installed\... (double-drive-prefix) →
# MODULE_NOT_FOUND → node:internal/modules/cjs/loader:1386.
#
# Codex GPT-5.5 deep-review-exec verdict 019e02f3-* NEEDS-REVISION conf 0.88:
# "Consolidated rewriter recommended. Current plugin source already shows multiple
# identical absolute-path rewrites across openai-codex, hindsight, mcp-memory-service,
# and gitnexus. One data-driven rewriter with per-plugin expected-command fixtures is
# better — separate scripts increase drift and maintenance burden."
#
# SCOPE: this script covers plugins NOT yet wired to existing per-plugin rewriters
# (mcp-memory-service, gitnexus). The 3 incumbent per-plugin scripts
# (hindsight/codex/ECC) remain active — folding them into this fixtures dict
# requires retiring their eee.ps1 wires too, which is out of scope for W275 to
# minimize blast-radius. Eventual full consolidation tracked as follow-up.
#
# TIER-1 SOTA SUBSTRATE CITES:
# - Authority: https://code.claude.com/docs/en/hooks (hook placeholder substitution)
# - Authority: https://code.claude.com/docs/en/plugins (CLAUDE_PLUGIN_ROOT contract)
# - Authority: https://nodejs.org/api/path.html (Win32 path resolution)
# - Authority: https://nodejs.org/api/modules.html (CJS loader semantics)
# - Authority: https://www.msys2.org/docs/filesystem-paths/ (MSYS path-conv)
#
# Sibling patterns in same codebase:
# - Z:/claude-sota-installed/scripts/hindsight-plugin-hooks-rewrite.py    (W274)
# - Z:/claude-sota-installed/scripts/ecc-plugin-hooks-rewrite.py          (Wave 52)
# - Z:/claude-sota-installed/scripts/codex-plugin-hooks-rewrite.py        (Wave 50 Fire 46)
#
# RETIREMENT CONDITION:
# This script retires when (a) upstream plugins ship Windows-aware path resolution
# (the ${CLAUDE_PLUGIN_ROOT} template works regardless of injected form), or
# (b) Anthropic CC stops POSIX-form injection on Windows.
# Upstream issues to file:
#   - https://github.com/doobidoo/mcp-memory-service
#   - https://github.com/gitnexus/gitnexus  (or whichever the upstream is)
#   - Anthropic CC feedback at https://github.com/anthropics/claude-code/issues

"""W275 — consolidated plugin-hooks rewriter for Windows POSIX path-mangling fix.

Re-applies absolute Win32 path patches across multiple plugins'
cached hooks.json files. Idempotent + version-globbed + --check mode.
Per-plugin fixtures defined in FIXTURES dict.

USAGE:
  python w275-hooks-rewrite.py            # rewrite (default)
  python w275-hooks-rewrite.py --check    # verify; exit 1 if drift
  python w275-hooks-rewrite.py --quiet    # suppress per-file output

Wired to: eee.ps1 launcher pre-claude.exe call (fail-closed exit 2).
"""

import argparse
import json
import pathlib
import re
import sys

RUNTIME = "Z:/claude-sota-installed"
BACKUP_SUFFIX = ".pre-w275-fix"


def _winpath(p):
    """Convert forward-slash path to Win32 backslash form."""
    return str(p).replace("/", "\\")


def _node_cmd(plugin_root_win32, rel_path):
    """Build `node "<absolute-win32-path>"` command."""
    rel_bs = rel_path.replace("/", "\\")
    return f'node "{plugin_root_win32}\\{rel_bs}"'


# --- Per-plugin fixtures ----------------------------------------------------


def _build_mms(plugin_root_win32):
    """Expected hooks.json for doobidoo/mcp-memory-service.

    Symptom: 2x SessionStart + 1x UserPromptSubmit + 1x SessionEnd + N x PostToolUse
    'Failed with non-blocking status code: node:internal/modules/cjs/loader:1386'
    on Windows when ${CLAUDE_PLUGIN_ROOT} is substituted as /z/... .
    """
    return {
        "description": (
            "PATCHED W275 2026-05-17 — absolute Win32 paths bypass CC's "
            "POSIX-form CLAUDE_PLUGIN_ROOT injection on Windows. "
            "Mirrors W274 hindsight + Wave 52 ECC + Fire 46 codex rewriters. "
            "Backup: hooks.json" + BACKUP_SUFFIX + "."
        ),
        "hooks": {
            "SessionStart": [
                {
                    "matcher": "startup|resume",
                    "hooks": [
                        {
                            "type": "command",
                            "command": _node_cmd(
                                plugin_root_win32, "scripts/ensure-server.js"
                            ),
                        },
                        {
                            "type": "command",
                            "command": _node_cmd(
                                plugin_root_win32, "core/session-start.js"
                            ),
                        },
                    ],
                }
            ],
            "SessionEnd": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": _node_cmd(
                                plugin_root_win32, "core/session-end.js"
                            ),
                        }
                    ],
                }
            ],
            "UserPromptSubmit": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": _node_cmd(
                                plugin_root_win32, "core/mid-conversation.js"
                            ),
                        }
                    ],
                }
            ],
            "PostToolUse": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": _node_cmd(
                                plugin_root_win32, "core/auto-capture-hook.js"
                            ),
                        }
                    ],
                }
            ],
        },
    }


def _build_gitnexus(plugin_root_win32):
    """Expected hooks.json for gitnexus.

    Symptom: high-frequency per-tool error surge (~2x per Bash + 1x per Grep/Glob).
    """
    hook_js = _node_cmd(plugin_root_win32, "hooks/gitnexus-hook.js")
    return {
        "description": (
            "PATCHED W275 2026-05-17 — absolute Win32 paths bypass CC's "
            "POSIX-form CLAUDE_PLUGIN_ROOT injection on Windows. "
            "PreToolUse fires on every Bash|Grep|Glob → per-tool surge. "
            "Backup: hooks.json" + BACKUP_SUFFIX + "."
        ),
        "hooks": {
            "PreToolUse": [
                {
                    "matcher": "Grep|Glob|Bash",
                    "hooks": [
                        {
                            "type": "command",
                            "command": hook_js,
                            "timeout": 10,
                            "statusMessage": "Enriching with GitNexus graph context...",
                        }
                    ],
                }
            ],
            "PostToolUse": [
                {
                    "matcher": "Bash",
                    "hooks": [
                        {
                            "type": "command",
                            "command": hook_js,
                            "timeout": 10,
                            "statusMessage": "Checking GitNexus index freshness...",
                        }
                    ],
                }
            ],
        },
    }


# FIXTURES: name -> {cache_root, hooks_subpath, builder}
#   cache_root      = directory under cache/ containing per-version subdirs
#   hooks_subpath   = relative path from version dir to the hooks.json file
#   builder(root)   = function returning the expected hooks dict for that
#                     plugin's plugin_root (Win32 backslash form)
FIXTURES = {
    "mcp-memory-service": {
        "cache_root": f"{RUNTIME}/.claude/plugins/cache/mcp-memory-service/mcp-memory-service",
        "hooks_subpath": ".claude-plugin/hooks.json",
        "builder": _build_mms,
    },
    "gitnexus": {
        "cache_root": f"{RUNTIME}/.claude/plugins/cache/gitnexus-marketplace/gitnexus",
        "hooks_subpath": "hooks/hooks.json",
        "builder": _build_gitnexus,
    },
}


def _find_hooks_json(fixture):
    """Discover hooks.json files for one fixture (version-globbed)."""
    results = []
    cache_root = pathlib.Path(fixture["cache_root"])
    if not cache_root.is_dir():
        return results
    for ver_dir in sorted(cache_root.iterdir()):
        if ver_dir.is_dir():
            hj = ver_dir / fixture["hooks_subpath"]
            if hj.exists():
                results.append(hj)
    return results


def _derive_plugin_root_win32(hooks_json_path, hooks_subpath):
    """Compute plugin_root (parent dir of the hooks_subpath chain)."""
    # hooks_subpath might have multiple components (e.g. .claude-plugin/hooks.json
    # → 2 parts) or one (hooks/hooks.json → 2 parts). Strip that many parents.
    depth = len(pathlib.PurePosixPath(hooks_subpath).parts)
    plugin_root = hooks_json_path
    for _ in range(depth):
        plugin_root = plugin_root.parent
    return _winpath(plugin_root)


def rewrite(verbose=True):
    total_rewrites = 0
    total_skips = 0
    for name, fixture in FIXTURES.items():
        files = _find_hooks_json(fixture)
        if not files:
            if verbose:
                print(f"WARN: no {name} hooks.json files found", file=sys.stderr)
            continue
        for hj in files:
            plugin_root = _derive_plugin_root_win32(hj, fixture["hooks_subpath"])
            new_dict = fixture["builder"](plugin_root)
            try:
                current = json.loads(hj.read_text(encoding="utf-8"))
            except json.JSONDecodeError:
                current = None
            if current == new_dict:
                if verbose:
                    print(f"SKIP (already correct): {hj}")
                total_skips += 1
                continue
            backup = hj.with_suffix(hj.suffix + BACKUP_SUFFIX)
            if not backup.exists():
                backup.write_bytes(hj.read_bytes())
                if verbose:
                    print(f"BACKUP: {backup}")
            hj.write_text(json.dumps(new_dict, indent=2) + "\n", encoding="utf-8")
            if verbose:
                print(f"REWROTE: {hj}")
            total_rewrites += 1
    if verbose:
        print(f"DONE: {total_rewrites} rewritten, {total_skips} already correct")
    return 0


def check():
    """Exit 1 if any covered plugin's hooks.json has drift markers."""
    failures = []
    total_files = 0
    for name, fixture in FIXTURES.items():
        files = _find_hooks_json(fixture)
        if not files:
            print(f"WARN: no {name} hooks.json files found", file=sys.stderr)
            continue
        for hj in files:
            total_files += 1
            try:
                d = json.loads(hj.read_text(encoding="utf-8"))
            except json.JSONDecodeError as e:
                failures.append(f"{hj}: json parse error: {e}")
                continue
            for evt, blocks in d.get("hooks", {}).items():
                for block in blocks:
                    for h in block.get("hooks", []):
                        cmd = h.get("command", "")
                        if "${CLAUDE_PLUGIN_ROOT}" in cmd:
                            failures.append(
                                f"{hj}: {evt}: ${{CLAUDE_PLUGIN_ROOT}} in command"
                            )
                        if "/z/claude-sota-installed" in cmd:
                            failures.append(f"{hj}: {evt}: POSIX /z/... in command")
                        m = re.search(r'"([A-Za-z]:\\[^"]+\.(?:js|mjs|cjs|py))"', cmd)
                        if m and not pathlib.Path(m.group(1)).exists():
                            failures.append(
                                f"{hj}: {evt}: script missing at {m.group(1)}"
                            )
    if failures:
        print("FAIL:", file=sys.stderr)
        for f in failures:
            print(f"  - {f}", file=sys.stderr)
        return 1
    print(f"OK: {total_files} hooks.json files clean across {len(FIXTURES)} fixtures")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="W275 consolidated plugin-hooks Windows-POSIX rewriter "
        "(mcp-memory-service + gitnexus; extensible via FIXTURES)"
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Verify all hooks clean; exit 1 if drift detected",
    )
    parser.add_argument("--quiet", action="store_true", help="Suppress per-file output")
    args = parser.parse_args()
    if args.check:
        sys.exit(check())
    sys.exit(rewrite(verbose=not args.quiet))
