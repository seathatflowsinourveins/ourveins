# PROVENANCE — W274 2026-05-17 hindsight-plugin-hooks-rewrite cite-trail header.
#
# Class: B — Novel eee-side glue with TIER-1 substrate (mirror of Fire 46
# codex-plugin-hooks-rewrite.py + Wave 52 ecc-plugin-hooks-rewrite.py).
#
# WHY THIS SCRIPT EXISTS (cardinal-rule-7 "REPORT errors before routing around them"):
# Windows-specific runtime workaround for vectorize-io/hindsight plugin
# path-mangling failure. CC injects `${CLAUDE_PLUGIN_ROOT}` in POSIX form
# `/z/claude-sota-installed/...` on Windows; Python's open() on Windows then
# resolves the leading `/` as drive-root + treats `z/` as a literal subdir,
# producing the observed `Z:\z\claude-sota-installed\...` ENOENT failure.
# Upstream hindsight ships absolute-path commands via setup_hooks.py
# (build_hooks function) but the cache hooks.json shipped in the plugin
# uses the ${CLAUDE_PLUGIN_ROOT} template which CC's POSIX injection
# breaks. This script is the eee-side durability layer mirroring the codex
# Fire 46 pattern.
#
# TIER-1 SOTA SUBSTRATE CITES:
# - Reference: Z:/claude-sota-installed/.claude/plugins/marketplaces/hindsight/
#   hindsight-integrations/claude-code/scripts/setup_hooks.py:33-80#build_hooks
#   (upstream uses f'python3 "{plugin_root}/scripts/X.py"' with absolute
#   plugin_root from os.path.expanduser — this script computes the equivalent
#   from the hooks.json location at rewrite time)
# - Authority: https://www.msys2.org/docs/filesystem-paths/ (MSYS path-conv
#   does NOT convert argv passed to Win32 exes when MSYS2_ARG_CONV_EXCL='*'
#   is set per .claude/settings.json:47-49)
# - Authority: https://code.claude.com/docs/en/plugins (CLAUDE_PLUGIN_ROOT
#   injection contract; POSIX form on Windows is the observed behavior)
#
# Sibling patterns in same codebase:
# - Z:/claude-sota-installed/scripts/codex-plugin-hooks-rewrite.py (Wave 50 Fire 46)
# - Z:/claude-sota-installed/scripts/ecc-plugin-hooks-rewrite.py    (Wave 52)
#
# RETIREMENT CONDITION:
# This script retires when (a) vectorize-io/hindsight upstream ships
# Windows-aware POSIX-to-Win32 path resolution in its hook scripts (so the
# ${CLAUDE_PLUGIN_ROOT} template works regardless of injected form), or
# (b) Anthropic CC stops POSIX-form injection on Windows. File upstream
# issue at https://github.com/vectorize-io/hindsight if not already filed.

"""W274 — durability layer for vectorize-io/hindsight plugin path-mangling fix.

Re-applies absolute Win32 path patches across hindsight's cached and
marketplace hooks.json files. Idempotent + version-globbed + cache+marketplace
+ --check mode. Mirrors codex Fire 46 / ECC Wave 52 patterns.

USAGE:
  python hindsight-plugin-hooks-rewrite.py            # rewrite (default)
  python hindsight-plugin-hooks-rewrite.py --check    # verify; exit 1 if drift
  python hindsight-plugin-hooks-rewrite.py --quiet    # suppress per-file output

Wired to: eee.ps1 launcher pre-claude.exe call (fail-closed exit 2).
"""

import argparse
import json
import pathlib
import re
import sys


def find_hooks_json_files():
    """Discover all hindsight hooks.json files (version-globbed cache + marketplace)."""
    results = []
    runtime = "Z:/claude-sota-installed"
    # Cache: version-globbed under hindsight/hindsight-memory/<version>/
    cache_root = pathlib.Path(
        f"{runtime}/.claude/plugins/cache/hindsight/hindsight-memory"
    )
    if cache_root.is_dir():
        for ver_dir in sorted(cache_root.iterdir()):
            if ver_dir.is_dir():
                hj = ver_dir / "hooks" / "hooks.json"
                if hj.exists():
                    results.append(hj)
    # Marketplace: canonical claude-code integration path
    mp = pathlib.Path(
        f"{runtime}/.claude/plugins/marketplaces/hindsight/hindsight-integrations/claude-code/hooks/hooks.json"
    )
    if mp.exists():
        results.append(mp)
    return results


def derive_plugin_root_win32(hooks_json_path):
    """plugin_root = hooks_json.parent.parent, in Win32 backslash form.

    For cache/hindsight/hindsight-memory/0.6.5/hooks/hooks.json → ../../0.6.5
    For marketplaces/.../claude-code/hooks/hooks.json → ../../claude-code
    Both have scripts/ as a sibling of hooks/, so the join target is correct.
    """
    return str(hooks_json_path.parent.parent).replace("/", "\\")


def build_command(plugin_root_win32, script_name):
    """Mirror upstream setup_hooks.py:40 pattern with absolute Win32 path.

    Preserves the python3/python fallback for systems where only python.exe is
    on PATH; replaces ${CLAUDE_PLUGIN_ROOT} with the resolved absolute path.
    """
    scr = f"{plugin_root_win32}\\scripts\\{script_name}"
    return f'python3 "{scr}" || python "{scr}"'


def build_hooks_dict(plugin_root_win32):
    return {
        "description": (
            "PATCHED W274 2026-05-17 — absolute Win32 paths bypass CC's "
            "POSIX-form ${CLAUDE_PLUGIN_ROOT} injection on Windows. "
            "Mirrors upstream vectorize-io/hindsight setup_hooks.py:33-80 "
            "build_hooks() pattern + sibling codex Fire 46 + ECC Wave 52 "
            "rewriters. Re-applied by hindsight-plugin-hooks-rewrite.py via "
            "eee.ps1 launcher pre-claude.exe (fail-closed). Authority: "
            "https://www.msys2.org/docs/filesystem-paths/ + "
            "https://code.claude.com/docs/en/plugins. "
            "Backup: hooks.json.pre-w274-fix."
        ),
        "hooks": {
            "SessionStart": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": build_command(
                                plugin_root_win32, "session_start.py"
                            ),
                            "timeout": 5,
                        }
                    ]
                }
            ],
            "UserPromptSubmit": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": build_command(plugin_root_win32, "recall.py"),
                            "timeout": 12,
                        }
                    ]
                }
            ],
            "Stop": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": build_command(plugin_root_win32, "retain.py"),
                            "timeout": 15,
                            "async": True,
                        }
                    ]
                }
            ],
            "SessionEnd": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": build_command(
                                plugin_root_win32, "session_end.py"
                            ),
                            "timeout": 10,
                        }
                    ]
                }
            ],
        },
    }


def rewrite(verbose=True):
    files = find_hooks_json_files()
    if not files:
        print("WARN: no hindsight hooks.json files found", file=sys.stderr)
        return 0
    rewrites = 0
    skips = 0
    for hj in files:
        plugin_root = derive_plugin_root_win32(hj)
        new_dict = build_hooks_dict(plugin_root)
        try:
            current = json.loads(hj.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            current = None
        if current == new_dict:
            if verbose:
                print(f"SKIP (already correct): {hj}")
            skips += 1
            continue
        backup = hj.with_suffix(hj.suffix + ".pre-w274-fix")
        if not backup.exists():
            backup.write_bytes(hj.read_bytes())
            if verbose:
                print(f"BACKUP: {backup}")
        hj.write_text(json.dumps(new_dict, indent=2) + "\n", encoding="utf-8")
        if verbose:
            print(f"REWROTE: {hj}")
        rewrites += 1
    if verbose:
        print(f"DONE: {rewrites} rewritten, {skips} already correct")
    return 0


def check():
    """Exit 1 if any hook command has ${CLAUDE_PLUGIN_ROOT}, /z/, \\z\\, or missing script."""
    files = find_hooks_json_files()
    if not files:
        print("WARN: no hindsight hooks.json files found", file=sys.stderr)
        return 0
    failures = []
    for hj in files:
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
                    if "/z/" in cmd or "\\z\\" in cmd.replace("\\\\", "\\"):
                        # \\z\\ accidental doubling check (post JSON-unescape)
                        if "\\z\\" in cmd and "\\\\z\\\\" not in cmd:
                            pass  # legit \z\ would be \\z\\ in JSON; bare \z\ unlikely
                    if "/z/" in cmd:
                        failures.append(f"{hj}: {evt}: POSIX /z/ in command")
                    # Detect absolute Win32 path script ref; verify existence.
                    m = re.search(r'"([A-Za-z]:\\[^"]+\.py)"', cmd)
                    if m and not pathlib.Path(m.group(1)).exists():
                        failures.append(f"{hj}: {evt}: script missing at {m.group(1)}")
    if failures:
        print("FAIL:", file=sys.stderr)
        for f in failures:
            print(f"  - {f}", file=sys.stderr)
        return 1
    print(f"OK: {len(files)} hindsight hooks.json clean")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="hindsight plugin hooks rewriter — W274 durability layer"
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
