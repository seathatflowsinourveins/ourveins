# PROVENANCE — Wave 97 Ship 1F cite-trail header (closes Wave 52 iter1c "UNCLEAR-PROVENANCE")
#
# Class: B — Novel eee-side glue with TIER-1 substrate (per Wave 97 fan-3 X3 archaeology
# at tmp/wave97-fan3-X3-hooks-rewrite-archaeology-2026-05-08.md — KEEP-WITH-CITE-IMPORT-AMBER
# per CLAUDE.md Section 14.5).
#
# WHY THIS SCRIPT EXISTS (cardinal-rule-7 "REPORT errors before routing around them"):
# Windows-specific runtime workaround for openai-codex plugin path-mangling bug. CC injects
# `${CLAUDE_PLUGIN_ROOT}` in POSIX form `/z/claude-sota-installed/...` on Windows; Node's
# require() resolution then fails on hook scripts because the path isn't a valid Win32
# path. Upstream codex-plugin-cc has the .mjs source files (TIER-1 substrate) but ships
# NO rewriter for this Windows-specific interaction. This script is the eee-side runtime
# durability layer.
#
# TIER-1 SOTA SUBSTRATE CITES (TIER-1-DIRECT per CR-1; full HEAD SHA + line range + symbol-anchor):
# - Reference: Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/stop-review-gate-hook.mjs:142-157#main @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf
# - Reference: Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/session-lifecycle-hook.mjs:76-102#handleSessionStart+handleSessionEnd @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf
# - Reference: Z:/repos/deps/codex-plugin-cc/plugins/codex/scripts/lib/broker-lifecycle.mjs:43-56#sendBrokerShutdown @ HEAD 807e03ac9d5aa23bc395fdec8c3767500a86b3cf
#
# CITE-IMPORT-AMBER provenance (TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8):
# - constituents=[TIER-1-DIRECT @ codex-plugin-cc substrate above (function-symbol-anchored, full SHA), TIER-3-LOCAL-OPERATOR-DERIVED @ sibling claude-sota commit 46358c2 (Wave 50 Fire 46 origin) + d298d47 (Wave 50 Fire 43 path-mangling actual-fix) + Wave 80 P#3 extension]
# - effective_tier = TIER-3-LOCAL-COMPOSITION (MIN_PRECEDENCE due to eee-local glue: Win32 path absolutization + version-globbed cache discovery + idempotent backup + dual-runtime targeting; HONEST-NON-FINDING gate per CR-12 step (iii) satisfied — mcp__github__search_code "openai/codex-plugin-cc plugin-hook-bootstrap rewrite" total_count=0)
#
# Wave 80 patch sentinels in this file (symbol-anchor; line numbers volatile per port-note-discipline §1):
# - WAVE80_191_SENTINEL marker — patches stop-review-gate-hook.mjs#main fast-exit ordering
# - WAVE80_245_SENTINEL marker — patches session-lifecycle-hook.mjs init flow
# - patch_191_stop_review_gate_hook() function applies #191 patch
# - find_mjs_files() function discovers targets across runtime cache + marketplaces
#
# RETIREMENT CONDITION:
# This script retires when openai/codex-plugin-cc upstream lands a Windows-aware POSIX→Win32
# path resolver in plugin-hook-bootstrap (and ships fixes for issues #191 + #245). File
# upstream issue at https://github.com/openai/codex referencing the path-mangling failure
# mode + #191 + #245 for eventual upstream fix.

"""Wave 50 Fire 46 — durability layer for openai-codex plugin path-mangling fix.

Per bog92qxq7 codex T1 BRIDGE-MODE real GPT-5.5 NEEDS-REVISION conf=0.91 verdict
[VERIFIED via .claude/state/codex_consult_fire45_path_mangling_full_rescue_OUT.txt
EOF (5888 lines, Trust Boundary: top-level Codex investigation, NOT Sonnet stand-in)].
Pattern A prescribed_edits per codex-t1-fix-forward-pattern.md.

Idempotent + version-globbed + cache+marketplace + both-runtime + --check mode.
Re-applies Fire 43+44 absolute Win32 path patches on every launcher pre-claude.exe
invocation, ensuring durability across plugin re-fetches and version bumps.

Sister durability layer to Fire 45 (settings.json relocations a6c5e34 + 18fdbf0).

USAGE:
  python codex-plugin-hooks-rewrite.py            # rewrite all (default)
  python codex-plugin-hooks-rewrite.py --check    # verify only; exit 1 if drift
  python codex-plugin-hooks-rewrite.py --quiet    # suppress per-file output

Wired to: sss.ps1 + eee.ps1 launcher pre-claude.exe call (fail-closed exit 2).
"""

import argparse
import json
import pathlib
import re
import sys

NODE_EXE_PATH = "Z:\\tools\\nodejs\\node.exe"


def find_hooks_json_files():
    """Discover all openai-codex hooks.json files across both runtimes (version-globbed)."""
    results = []
    for runtime in ["Z:/claude-sota", "Z:/claude-sota-installed"]:
        # Cache: version-globbed under codex/<version>/
        cache_root = pathlib.Path(f"{runtime}/.claude/plugins/cache/openai-codex/codex")
        if cache_root.is_dir():
            for ver_dir in sorted(cache_root.iterdir()):
                if ver_dir.is_dir():
                    hj = ver_dir / "hooks" / "hooks.json"
                    if hj.exists():
                        results.append(hj)
        # Marketplace: single canonical path
        mp = pathlib.Path(
            f"{runtime}/.claude/plugins/marketplaces/openai-codex/plugins/codex/hooks/hooks.json"
        )
        if mp.exists():
            results.append(mp)
    return results


def derive_plugin_root_win32(hooks_json_path):
    """plugin_root = hooks_json.parent.parent, in Win32 backslash form."""
    return str(hooks_json_path.parent.parent).replace("/", "\\")


def build_hooks_dict(plugin_root_win32):
    sessionhook = plugin_root_win32 + "\\scripts\\session-lifecycle-hook.mjs"
    stophook = plugin_root_win32 + "\\scripts\\stop-review-gate-hook.mjs"
    return {
        "description": (
            "PATCHED Wave 50 Fire 46 — absolute Win32 paths bypass CC's POSIX-form "
            "${CLAUDE_PLUGIN_ROOT} injection on Windows. Per bog92qxq7 codex T1 "
            "BRIDGE-MODE real GPT-5.5 NEEDS-REVISION conf=0.91. Re-applied by "
            "codex-plugin-hooks-rewrite.py via sss.ps1 + eee.ps1 launchers "
            "pre-claude.exe (fail-closed). Sister: settings.json registrations "
            "a6c5e34 + 18fdbf0. Backup: hooks.json.pre-fire46-fix."
        ),
        "hooks": {
            "SessionStart": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": f'"{NODE_EXE_PATH}" "{sessionhook}" SessionStart',
                            "timeout": 5,
                        }
                    ]
                }
            ],
            "SessionEnd": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": f'"{NODE_EXE_PATH}" "{sessionhook}" SessionEnd',
                            "timeout": 5,
                        }
                    ]
                }
            ],
            "Stop": [
                {
                    "hooks": [
                        {
                            "type": "command",
                            "command": f'"{NODE_EXE_PATH}" "{stophook}"',
                            "timeout": 900,
                        }
                    ]
                }
            ],
        },
    }


def rewrite(verbose=True):
    files = find_hooks_json_files()
    if not files:
        print("WARN: no openai-codex hooks.json files found", file=sys.stderr)
        return 0
    rewrites = 0
    skips = 0
    for hj in files:
        plugin_root = derive_plugin_root_win32(hj)
        new_dict = build_hooks_dict(plugin_root)
        try:
            current = json.loads(hj.read_text())
        except json.JSONDecodeError:
            current = None
        if current == new_dict:
            if verbose:
                print(f"SKIP (already correct): {hj}")
            skips += 1
            continue
        backup = hj.with_suffix(hj.suffix + ".pre-fire46-fix")
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
    """Exit 1 if any hook command has ${CLAUDE_PLUGIN_ROOT}, /z/, missing node.exe, or missing script."""
    files = find_hooks_json_files()
    if not files:
        print("WARN: no openai-codex hooks.json files found", file=sys.stderr)
        return 0
    failures = []
    if not pathlib.Path(NODE_EXE_PATH).exists():
        failures.append(f"NODE_EXE missing: {NODE_EXE_PATH}")
    for hj in files:
        try:
            d = json.loads(hj.read_text())
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
                    if "/z/" in cmd or "\\z\\" in cmd:
                        failures.append(f"{hj}: {evt}: POSIX /z/ or \\z\\ in command")
                    m = re.search(r'"([A-Za-z]:\\[^"]+\.mjs)"', cmd)
                    if m and not pathlib.Path(m.group(1)).exists():
                        failures.append(f"{hj}: {evt}: script missing at {m.group(1)}")
    if failures:
        print("FAIL:", file=sys.stderr)
        for f in failures:
            print(f"  - {f}", file=sys.stderr)
        return 1
    print(f"OK: {len(files)} hooks.json clean")
    return 0


# ============================================================================
# Wave 80 P#3 — patches for openai-codex plugin .mjs source files (issues #191 + #245).
# Cite: codex T1 NEEDS-REVISION conf=0.91-0.96 verdict at
#       Z:/claude-sota-installed/.claude/state/codex_consult_wave80_deep_audit_OUT.txt
# Patch design: Z:/claude-sota-installed/tmp/fleet-wave80-deferred-2026-05-08.md TASK B.
# Idempotent: each patch checks for a sentinel marker before re-applying.
# Targets BOTH marketplaces/openai-codex/plugins/codex/scripts/ AND
#         cache/openai-codex/codex/1.0.4/scripts/ paths (verified byte-equal).
# ============================================================================

WAVE80_191_SENTINEL = "// Wave 80 P#191"
WAVE80_245_SENTINEL = "// Wave 80 P#245"


def find_mjs_files(rel_path):
    """Discover .mjs files at rel_path under both runtime cache and marketplaces."""
    results = []
    for runtime in ["Z:/claude-sota", "Z:/claude-sota-installed"]:
        cache_root = pathlib.Path(f"{runtime}/.claude/plugins/cache/openai-codex/codex")
        if cache_root.is_dir():
            for ver_dir in sorted(cache_root.iterdir()):
                if ver_dir.is_dir():
                    cand = ver_dir / "scripts" / rel_path
                    if cand.exists():
                        results.append(cand)
        mp = pathlib.Path(
            f"{runtime}/.claude/plugins/marketplaces/openai-codex/plugins/codex/scripts/{rel_path}"
        )
        if mp.exists():
            results.append(mp)
    return results


def patch_191_stop_review_gate_hook(verbose=True):
    """Issue #191 — move stopReviewGate fast-exit BEFORE blocking readHookInput().

    Today: function main() reads stdin synchronously (readHookInput) BEFORE
    checking config.stopReviewGate, so disabled hooks still pay the stdin-block
    cost. Patch: relocate the !config.stopReviewGate fast-exit before the
    blocking read.

    Cite (TIER-1-DIRECT): openai/codex-plugin-cc HEAD 807e03ac plugins/codex/
    scripts/stop-review-gate-hook.mjs.
    """
    files = find_mjs_files("stop-review-gate-hook.mjs")
    rewrites = 0
    skips = 0
    for fp in files:
        text = fp.read_text(encoding="utf-8")
        if WAVE80_191_SENTINEL in text:
            if verbose:
                print(f"SKIP P#191 (sentinel present): {fp}")
            skips += 1
            continue
        old_block = (
            "function main() {\n"
            "  const input = readHookInput();\n"
            "  const cwd = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();\n"
            "  const workspaceRoot = resolveWorkspaceRoot(cwd);\n"
            "  const config = getConfig(workspaceRoot);\n"
            "\n"
            "  const jobs = sortJobsNewestFirst(filterJobsForCurrentSession(listJobs(workspaceRoot), input));\n"
            '  const runningJob = jobs.find((job) => job.status === "queued" || job.status === "running");\n'
            "  const runningTaskNote = runningJob\n"
            "    ? `Codex task ${runningJob.id} is still running. Check /codex:status and use /codex:cancel ${runningJob.id} if you want to stop it before ending the session.`\n"
            "    : null;\n"
            "\n"
            "  if (!config.stopReviewGate) {\n"
            "    logNote(runningTaskNote);\n"
            "    return;\n"
            "  }\n"
        )
        new_block = (
            "function main() {\n"
            "  // Wave 80 P#191 — fast-exit BEFORE blocking readHookInput() when gate is disabled.\n"
            "  // readHookInput() calls fs.readFileSync(0) which blocks indefinitely on stdin.\n"
            "  // Disabled-gate sessions should not pay that cost.\n"
            "  // Cite: openai/codex-plugin-cc HEAD 807e03ac plugins/codex/scripts/stop-review-gate-hook.mjs.\n"
            "  const earlyCwd = process.env.CLAUDE_PROJECT_DIR || process.cwd();\n"
            "  const earlyWorkspaceRoot = resolveWorkspaceRoot(earlyCwd);\n"
            "  const earlyConfig = getConfig(earlyWorkspaceRoot);\n"
            "  if (!earlyConfig.stopReviewGate) {\n"
            "    return;\n"
            "  }\n"
            "\n"
            "  const input = readHookInput();\n"
            "  const cwd = input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();\n"
            "  const workspaceRoot = resolveWorkspaceRoot(cwd);\n"
            "  const config = getConfig(workspaceRoot);\n"
            "\n"
            "  const jobs = sortJobsNewestFirst(filterJobsForCurrentSession(listJobs(workspaceRoot), input));\n"
            '  const runningJob = jobs.find((job) => job.status === "queued" || job.status === "running");\n'
            "  const runningTaskNote = runningJob\n"
            "    ? `Codex task ${runningJob.id} is still running. Check /codex:status and use /codex:cancel ${runningJob.id} if you want to stop it before ending the session.`\n"
            "    : null;\n"
            "\n"
            "  if (!config.stopReviewGate) {\n"
            "    logNote(runningTaskNote);\n"
            "    return;\n"
            "  }\n"
        )
        if old_block not in text:
            if verbose:
                print(f"WARN P#191 (block shape changed; manual review): {fp}")
            continue
        backup = fp.with_suffix(fp.suffix + ".pre-wave80-191")
        if not backup.exists():
            backup.write_bytes(fp.read_bytes())
            if verbose:
                print(f"BACKUP P#191: {backup}")
        new_text = text.replace(old_block, new_block, 1)
        fp.write_text(new_text, encoding="utf-8")
        if verbose:
            print(f"PATCHED P#191: {fp}")
        rewrites += 1
    if verbose:
        print(f"P#191: {rewrites} patched, {skips} already correct")
    return rewrites


def patch_245_broker_lifecycle_timeout(verbose=True):
    """Issue #245 — wrap sendBrokerShutdown with 3-second timeout.

    Today: sendBrokerShutdown returns a Promise resolved on data/error/close
    events. If broker accepts connection but never replies, Promise never
    resolves and caller hangs.

    Patch: wrap the inner Promise in Promise.race against a 3000ms setTimeout.

    Cite (TIER-1-DIRECT): openai/codex-plugin-cc HEAD 807e03ac plugins/codex/
    scripts/lib/broker-lifecycle.mjs.
    """
    files = find_mjs_files("lib/broker-lifecycle.mjs")
    rewrites = 0
    skips = 0
    for fp in files:
        text = fp.read_text(encoding="utf-8")
        if WAVE80_245_SENTINEL in text:
            if verbose:
                print(f"SKIP P#245 (sentinel present): {fp}")
            skips += 1
            continue
        old_block = (
            "export async function sendBrokerShutdown(endpoint) {\n"
            "  await new Promise((resolve) => {\n"
            "    const socket = connectToEndpoint(endpoint);\n"
            '    socket.setEncoding("utf8");\n'
            '    socket.on("connect", () => {\n'
            '      socket.write(`${JSON.stringify({ id: 1, method: "broker/shutdown", params: {} })}\\n`);\n'
            "    });\n"
            '    socket.on("data", () => {\n'
            "      socket.end();\n"
            "      resolve();\n"
            "    });\n"
            '    socket.on("error", resolve);\n'
            '    socket.on("close", resolve);\n'
            "  });\n"
            "}\n"
        )
        new_block = (
            "export async function sendBrokerShutdown(endpoint) {\n"
            "  // Wave 80 P#245 — bound shutdown to 3s; broker may accept connection then hang.\n"
            "  // Cite: openai/codex-plugin-cc HEAD 807e03ac plugins/codex/scripts/lib/broker-lifecycle.mjs.\n"
            "  const shutdownPromise = new Promise((resolve) => {\n"
            "    const socket = connectToEndpoint(endpoint);\n"
            '    socket.setEncoding("utf8");\n'
            '    socket.on("connect", () => {\n'
            '      socket.write(`${JSON.stringify({ id: 1, method: "broker/shutdown", params: {} })}\\n`);\n'
            "    });\n"
            '    socket.on("data", () => {\n'
            "      socket.end();\n"
            "      resolve();\n"
            "    });\n"
            '    socket.on("error", resolve);\n'
            '    socket.on("close", resolve);\n'
            "  });\n"
            "  const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 3000));\n"
            "  await Promise.race([shutdownPromise, timeoutPromise]);\n"
            "}\n"
        )
        if old_block not in text:
            if verbose:
                print(f"WARN P#245 (block shape changed; manual review): {fp}")
            continue
        backup = fp.with_suffix(fp.suffix + ".pre-wave80-245")
        if not backup.exists():
            backup.write_bytes(fp.read_bytes())
            if verbose:
                print(f"BACKUP P#245: {backup}")
        new_text = text.replace(old_block, new_block, 1)
        fp.write_text(new_text, encoding="utf-8")
        if verbose:
            print(f"PATCHED P#245: {fp}")
        rewrites += 1
    if verbose:
        print(f"P#245: {rewrites} patched, {skips} already correct")
    return rewrites


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Codex plugin hooks rewriter — Fire 46 durability layer per bog92qxq7 codex T1 NEEDS-REVISION 0.91"
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
    rc = rewrite(verbose=not args.quiet)
    # Wave 80 P#3 — extend rewriter to patch openai-codex .mjs sources for #191 + #245.
    patch_191_stop_review_gate_hook(verbose=not args.quiet)
    patch_245_broker_lifecycle_timeout(verbose=not args.quiet)
    sys.exit(rc)
