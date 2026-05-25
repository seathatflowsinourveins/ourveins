# PROVENANCE — Wave 97 Ship 1F cite-trail header (closes Wave 52 iter1c "UNCLEAR-PROVENANCE")
#
# Class: B — Novel eee-side glue with TIER-1 substrate (per Wave 97 fan-3 X3 archaeology
# at tmp/wave97-fan3-X3-hooks-rewrite-archaeology-2026-05-08.md — KEEP-WITH-CITE-IMPORT-AMBER
# per CLAUDE.md Section 14.5).
#
# WHY THIS SCRIPT EXISTS (cardinal-rule-7 "REPORT errors before routing around them"):
# Windows-specific runtime workaround for ECC plugin-hook-bootstrap.js loader:1386 hook
# failures. ECC's plugin-hook-bootstrap.js uses
# `process.env.CLAUDE_PLUGIN_ROOT || process.env.ECC_PLUGIN_ROOT` with NO fallback to
# __dirname-relative resolution. When CC injects POSIX-form `${CLAUDE_PLUGIN_ROOT}` like
# `/z/claude-sota-installed/...` on Windows, Node's require() fails because POSIX path
# isn't a valid Win32 path. ECC README L390 claims "All hooks and scripts have been
# rewritten in Node.js for maximum compatibility" — Wave 52 evidence shows the rewrite
# still fails on Windows. This script is the eee-side runtime-rescue layer that adds
# a __dirname-relative fallback function to plugin-hook-bootstrap.js + normalizes
# inline-bootstrap commands in ECC hooks.json files.
#
# TIER-1 SOTA SUBSTRATE CITE (TIER-1-DIRECT per CR-1; full HEAD SHA + line range + symbol-anchor):
# - Reference: Z:/repos/deps/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js:110-117#main @ HEAD 841beea45cb25ba51f29fa45b7e272938d19b80a
#   (substrate being patched at #main entrypoint where rootDir resolution occurs; this script adds __dirname-relative getPluginRoot() fallback function on top of upstream's `process.env.CLAUDE_PLUGIN_ROOT || process.env.ECC_PLUGIN_ROOT` chain)
#
# CITE-IMPORT-AMBER provenance (TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8):
# - constituents=[TIER-1-DIRECT @ everything-claude-code plugin-hook-bootstrap.js substrate, TIER-3-LOCAL-OPERATOR-DERIVED @ sibling claude-sota commit 062455b (Wave 52 runtime rescue) + 4b26416 (eee runtime port + env scrub)]
# - effective_tier = TIER-3-LOCAL-COMPOSITION (MIN_PRECEDENCE due to eee-local glue: __dirname-relative fallback + inline-bootstrap-to-direct-command rewriting + dual-runtime targeting)
# - HONEST-NON-FINDING gate per CR-12 step (iii) satisfied: NO upstream rewriter for this Windows-specific failure mode (verified via search of ECC + superpowers + codex-plugin-cc)
#
# FM-22 codification cross-link:
# Sibling Wave 52 codified this failure mode as FM-22 in `Z:/claude-sota/.claude/rules/named-failure-modes.md`
# (cite-import-AMBER per CLAUDE.md Section 14.5).
#
# RETIREMENT CONDITION:
# This script retires when ECC upstream lands a getPluginRoot() __dirname-relative fallback
# (or equivalent Windows-aware resolver) in plugin-hook-bootstrap.js. File upstream issue at
# https://github.com/affaan-m/everything-claude-code referencing the loader:1386 failure mode
# for eventual upstream fix.

"""Wave 52 durability layer for ECC loader:1386 hook failures.

This is the everything-claude-code companion to codex-plugin-hooks-rewrite.py.
It normalizes active ECC hook commands so Windows node.exe never has to require
a bootstrap path computed from a POSIX-form CLAUDE_PLUGIN_ROOT such as
/z/claude-sota-installed/...

USAGE:
  python ecc-plugin-hooks-rewrite.py
  python ecc-plugin-hooks-rewrite.py --check
  python ecc-plugin-hooks-rewrite.py --quiet

The script is intentionally JSON-aware and idempotent. It rewrites only active
hooks.json command strings plus the local plugin-hook-bootstrap fallback.
"""

import argparse
import json
import pathlib
import re
import sys

NODE_EXE_PATH = "Z:\\tools\\nodejs\\node.exe"
RUNTIMES = ("Z:/claude-sota", "Z:/claude-sota-installed")
ECC_CACHE_LAYOUTS = (
    ("everything-claude-code", "everything-claude-code"),
    ("ecc", "ecc"),
)
ECC_MARKETPLACE_NAMES = ("everything-claude-code", "ecc")
HOOK_JSON_RELS = (
    ("hooks", "hooks.json"),
    (".cursor", "hooks.json"),
)

INLINE_BOOTSTRAP_MARKER = "process.argv.splice(1,0,s);require(s)"
INLINE_BOOTSTRAP_TAIL_MARKERS = (
    'process.argv.splice(1,0,s);require(s)"',
    'process.argv.splice(1,0,s);require(s)\\"',
)
STOP_WRAPPER_RE = re.compile(
    r"spawnSync\(process\.execPath,\[script,'([^']+)','([^']+)'(?:,'([^']*)')?\]"
)


def win32(path):
    return str(path).replace("/", "\\")


def discover_plugin_roots():
    roots = []
    for runtime in RUNTIMES:
        runtime_root = pathlib.Path(runtime)
        cache_root = runtime_root / ".claude" / "plugins" / "cache"
        for org, name in ECC_CACHE_LAYOUTS:
            base = cache_root / org / name
            if base.is_dir():
                for version_dir in sorted(base.iterdir()):
                    if version_dir.is_dir():
                        roots.append(version_dir)

        marketplace_root = runtime_root / ".claude" / "plugins" / "marketplaces"
        for name in ECC_MARKETPLACE_NAMES:
            candidate = marketplace_root / name
            if candidate.is_dir():
                roots.append(candidate)

    deduped = []
    seen = set()
    for root in roots:
        key = str(root.resolve()).lower()
        if key not in seen:
            seen.add(key)
            deduped.append(root)
    return deduped


def discover_hooks_json_files():
    files = []
    for root in discover_plugin_roots():
        for rel in HOOK_JSON_RELS:
            candidate = root.joinpath(*rel)
            if candidate.exists():
                files.append(candidate)
    return files


def iter_command_refs(node):
    if isinstance(node, dict):
        if isinstance(node.get("command"), str):
            yield node
        for value in node.values():
            yield from iter_command_refs(value)
    elif isinstance(node, list):
        for item in node:
            yield from iter_command_refs(item)


def derive_plugin_root(hooks_json_path):
    parent = hooks_json_path.parent
    if parent.name in ("hooks", ".cursor"):
        return parent.parent
    return parent


def extract_inline_tail(command):
    if INLINE_BOOTSTRAP_MARKER not in command:
        return None
    for marker in INLINE_BOOTSTRAP_TAIL_MARKERS:
        idx = command.find(marker)
        if idx != -1:
            tail = command[idx + len(marker) :].strip()
            return tail or None
    return None


def extract_stop_wrapper_tail(command):
    if "spawnSync(process.execPath,[script," not in command:
        return None
    if "scripts','hooks','run-with-flags.js" not in command:
        return None
    match = STOP_WRAPPER_RE.search(command)
    if not match:
        return None
    hook_id, script_rel, profiles = match.groups()
    parts = ["node", "scripts/hooks/run-with-flags.js", hook_id, script_rel]
    if profiles:
        parts.append(profiles)
    return " ".join(parts)


def bootstrap_command(plugin_root, tail):
    bootstrap = plugin_root / "scripts" / "hooks" / "plugin-hook-bootstrap.js"
    return f'"{NODE_EXE_PATH}" "{win32(bootstrap)}" {tail}'


def direct_command(plugin_root, rel_script, *args):
    script = plugin_root / rel_script
    suffix = " ".join(arg for arg in args if arg)
    suffix = f" {suffix}" if suffix else ""
    return f'"{NODE_EXE_PATH}" "{win32(script)}"{suffix}'


def rewrite_command(command, plugin_root):
    tail = extract_inline_tail(command)
    if tail:
        return bootstrap_command(plugin_root, tail)

    tail = extract_stop_wrapper_tail(command)
    if tail:
        return bootstrap_command(plugin_root, tail)

    return command


FALLBACK_FUNCTIONS = """function isUsablePluginRoot(candidate) {
  const value = typeof candidate === 'string' ? candidate.trim() : '';
  return value.length > 0 && fs.existsSync(path.join(path.resolve(value), 'scripts', 'hooks', 'plugin-hook-bootstrap.js'));
}

function getPluginRoot() {
  if (isUsablePluginRoot(process.env.CLAUDE_PLUGIN_ROOT)) {
    return path.resolve(process.env.CLAUDE_PLUGIN_ROOT.trim());
  }
  if (isUsablePluginRoot(process.env.ECC_PLUGIN_ROOT)) {
    return path.resolve(process.env.ECC_PLUGIN_ROOT.trim());
  }
  return path.resolve(__dirname, '..', '..');
}

"""

OLD_MAIN_SNIPPET = """function main() {
  const [, , mode, relPath, ...args] = process.argv;
  const raw = readStdinRaw();
  const rootDir = process.env.CLAUDE_PLUGIN_ROOT || process.env.ECC_PLUGIN_ROOT;

  if (!mode || !relPath || !rootDir) {
    process.stdout.write(raw);
    process.exit(0);
  }
"""

NEW_MAIN_SNIPPET = """function main() {
  const [, , mode, relPath, ...args] = process.argv;
  const raw = readStdinRaw();
  const rootDir = getPluginRoot();

  if (!mode || !relPath) {
    process.stdout.write(raw);
    process.exit(0);
  }
"""


def patch_bootstrap(plugin_root, verbose=True):
    bootstrap = plugin_root / "scripts" / "hooks" / "plugin-hook-bootstrap.js"
    if not bootstrap.exists():
        return False, f"{bootstrap}: missing bootstrap"

    text = bootstrap.read_text(encoding="utf-8")
    if (
        "function getPluginRoot()" in text
        and "const rootDir = getPluginRoot();" in text
    ):
        return False, None

    if OLD_MAIN_SNIPPET not in text:
        return False, f"{bootstrap}: unsupported bootstrap shape"

    new_text = text.replace(OLD_MAIN_SNIPPET, FALLBACK_FUNCTIONS + NEW_MAIN_SNIPPET)
    backup = bootstrap.with_suffix(bootstrap.suffix + ".pre-wave52-ecc-fix")
    if not backup.exists():
        backup.write_text(text, encoding="utf-8")
        if verbose:
            print(f"BACKUP: {backup}")
    bootstrap.write_text(new_text, encoding="utf-8")
    return True, None


def rewrite(verbose=True):
    hooks_files = discover_hooks_json_files()
    plugin_roots = discover_plugin_roots()
    if not hooks_files:
        print("WARN: no ECC hooks.json files found", file=sys.stderr)
    rewrites = 0
    bootstrap_patches = 0
    skips = 0
    failures = []

    for root in plugin_roots:
        changed, failure = patch_bootstrap(root, verbose=verbose)
        if failure:
            failures.append(failure)
        elif changed:
            bootstrap_patches += 1

    for hooks_json in hooks_files:
        try:
            data = json.loads(hooks_json.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            failures.append(f"{hooks_json}: json parse error: {exc}")
            continue

        plugin_root = derive_plugin_root(hooks_json)
        changed = False
        for command_ref in iter_command_refs(data):
            old_command = command_ref["command"]
            new_command = rewrite_command(old_command, plugin_root)
            if new_command != old_command:
                command_ref["command"] = new_command
                changed = True

        if not changed:
            skips += 1
            if verbose:
                print(f"SKIP (already correct): {hooks_json}")
            continue

        backup = hooks_json.with_suffix(hooks_json.suffix + ".pre-wave52-ecc-fix")
        if not backup.exists():
            backup.write_bytes(hooks_json.read_bytes())
            if verbose:
                print(f"BACKUP: {backup}")
        hooks_json.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        rewrites += 1
        if verbose:
            print(f"REWROTE: {hooks_json}")

    if failures:
        print("FAIL:", file=sys.stderr)
        for failure in failures:
            print(f"  - {failure}", file=sys.stderr)
        return 1

    if verbose:
        print(
            f"DONE: {rewrites} hooks rewritten, {bootstrap_patches} bootstraps patched, {skips} already correct"
        )
    return 0


def check_bootstrap(plugin_root, failures):
    bootstrap = plugin_root / "scripts" / "hooks" / "plugin-hook-bootstrap.js"
    if not bootstrap.exists():
        failures.append(f"{bootstrap}: missing bootstrap")
        return
    text = bootstrap.read_text(encoding="utf-8")
    if (
        "function getPluginRoot()" not in text
        or "const rootDir = getPluginRoot();" not in text
    ):
        failures.append(f"{bootstrap}: missing fallback getPluginRoot guard")


def check_command(command, hooks_json, failures):
    if INLINE_BOOTSTRAP_MARKER in command:
        failures.append(f"{hooks_json}: inline require(s) bootstrap command remains")
    if "node -e" in command:
        failures.append(f"{hooks_json}: node -e command remains")
    if "${CLAUDE_PLUGIN_ROOT}" in command or "${ECC_PLUGIN_ROOT}" in command:
        failures.append(f"{hooks_json}: shell plugin-root token remains")
    if "/z/" in command or "\\z\\" in command:
        failures.append(f"{hooks_json}: POSIX /z/ or drive-relative \\z\\ remains")

    if "plugin-hook-bootstrap.js" in command:
        quoted = re.findall(r'"([^"]+)"', command)
        if not quoted or win32(NODE_EXE_PATH).lower() != quoted[0].lower():
            failures.append(
                f"{hooks_json}: bootstrap command does not use {NODE_EXE_PATH}"
            )
        bootstrap_paths = [q for q in quoted if q.endswith("plugin-hook-bootstrap.js")]
        if not bootstrap_paths:
            failures.append(
                f"{hooks_json}: bootstrap command missing quoted bootstrap path"
            )
        for bootstrap_path in bootstrap_paths:
            if not pathlib.Path(bootstrap_path).exists():
                failures.append(f"{hooks_json}: bootstrap missing at {bootstrap_path}")


def check():
    hooks_files = discover_hooks_json_files()
    plugin_roots = discover_plugin_roots()
    failures = []

    if not pathlib.Path(NODE_EXE_PATH).exists():
        failures.append(f"NODE_EXE missing: {NODE_EXE_PATH}")

    for root in plugin_roots:
        check_bootstrap(root, failures)

    for hooks_json in hooks_files:
        try:
            data = json.loads(hooks_json.read_text(encoding="utf-8"))
        except json.JSONDecodeError as exc:
            failures.append(f"{hooks_json}: json parse error: {exc}")
            continue
        for command_ref in iter_command_refs(data):
            check_command(command_ref["command"], hooks_json, failures)

    if failures:
        print("FAIL:", file=sys.stderr)
        for failure in failures:
            print(f"  - {failure}", file=sys.stderr)
        return 1

    print(
        f"OK: {len(hooks_files)} ECC hooks.json files clean; {len(plugin_roots)} plugin roots checked"
    )
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="ECC plugin hooks rewriter for Wave 52 loader:1386 recovery"
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Verify all active ECC hook commands are clean",
    )
    parser.add_argument("--quiet", action="store_true", help="Suppress per-file output")
    args = parser.parse_args()
    if args.check:
        sys.exit(check())
    sys.exit(rewrite(verbose=not args.quiet))
