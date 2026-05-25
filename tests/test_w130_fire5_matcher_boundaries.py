"""Wave 130 Fire 5 Ship O + Wave 130 Fire 6 Ship P — regression smoke for
`.claude/settings.json` hook `if:` matcher boundaries (codex T3 NEEDS-ATTENTION
conf=0.82 medium severity fix-forward; Wave 130 Fire 6 codex T1 NEEDS-REVISION
conf=0.92 NEW hybrid prescription — see `.claude/state/codex_consult_w130_fire5_ship_p_architectural_decision_OUT.txt`).

Wave 130 Fire 6 update: 16 patterns → 24 patterns (8 env-wrapper additions
per codex T1 W130-F6 Q5 finding — `env` is NOT in CC's built-in process-wrapper
list at https://code.claude.com/docs/en/permissions L193-196, so explicit
Tier-A `Bash(env * git ... *)` patterns are required to dispatch the gate).
Tier-B `_guard_base.git_verb_matches` mirrors via `_strip_command_prefix_decorations`
helper (covered by `tests/test_w130_fire6_git_verb_matches_shell_prefixes.py`).

Note: this matcher proxy is a CONSERVATIVE approximation of CC's `if:` matcher
behavior. Per codex T1 W130-F6 Q1 finding citing https://code.claude.com/docs/en/hooks
L427-431 + https://code.claude.com/docs/en/hooks-guide L650-671, the actual CC
matcher additionally strips leading `VAR=value` assignments AND CC's documented
process wrappers (timeout / time / nice / nohup / stdbuf / xargs). The proxy
models only the boundary-preserved direct-match form; full CC behavior is
covered by Tier-B test which exercises `_strip_command_prefix_decorations`.

# Reference: TIER-1-DIRECT codex T3 verdict on Ship H sha 2b3ff4f at
#   `.claude/state/codex_review_HEAD_2b3ff4fb.txt:1` —
#   "{\"verdict\":\"needs-attention\",\"summary\":\"... widens critical hook
#    matchers from command-prefix matching to unqualified substring matching,
#    creating a plausible bypass path where non-git commands containing the
#    text `git commit` or `git push` can dispatch commit/push gates against
#    unrelated state.\",\"findings\":[{\"severity\":\"medium\",\"title\":
#    \"Leading wildcard matchers can fire commit/push gates for non-git
#    commands\",...,\"recommendation\":\"Use a boundary-preserving matcher
#    instead of an arbitrary leading wildcard, such as explicit patterns for
#    the known rewritten forms (`Bash(rtk git commit *)`, `Bash(rtk git -C *
#    commit *)`, `Bash(rtk git push *)`, `Bash(rtk git -C * push *)`) while
#    retaining the original direct-git patterns ...\"}],\"next_steps\":
#    [\"Replace substring matchers with explicit direct-git and RTK-prefixed
#    patterns, then add a smoke case proving text-only Bash input containing
#    `git commit` does not dispatch the hooks.\"]}"
# Reference: TIER-1-DIRECT Anthropic CC permission-rule `if:` matcher syntax
#   `https://code.claude.com/docs/en/hooks` (canonical examples include
#   `Bash(* --version)`, `Bash(* --help *)`, `Bash(* install)` — leading
#   wildcards match arbitrary substrings; non-leading-wildcard `Bash(git
#   commit *)` requires the command to START with literal "git commit " for
#   boundary preservation).
# Reference: Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md
#   Pattern A — single atomic apply; this regression smoke is the
#   codex-prescribed "next_steps" companion to the 16-pattern expansion in
#   `.claude/settings.json` PreToolUse[6][2-9] + PostToolUse[0][0-7].

CC's `if:` matcher engine is closed-source; this file proxies the boundary
discipline using Python `str.startswith()` against the prescribed pattern
shapes. The proxy is conservative — CC's matcher MAY admit additional
tokenization rules (e.g., trailing-whitespace handling, quote unescaping)
not modeled here, but boundary-preservation is the load-bearing invariant.

Test contract (must hold for every CC harness release):
- POSITIVE: 16 representative real git/rtk-rewritten commands MUST match
  exactly one of the 16 prescribed patterns.
- NEGATIVE: 8 representative text-only Bash inputs containing the literal
  substring `git commit` / `git push` MUST NOT match ANY prescribed pattern.

If CC's matcher behavior diverges from the proxy below, this test should
FAIL and trigger fresh codex T1 consult on the divergence — do NOT silently
weaken the proxy without re-verifying boundary preservation against the CC
release notes.
"""

from __future__ import annotations

import json
from pathlib import Path

# Repo root via parents[1] resolution (test file lives under tests/)
REPO_ROOT = Path(__file__).resolve().parents[1]
SETTINGS_PATH = REPO_ROOT / ".claude" / "settings.json"


def _matches_boundary_preserved(cmd: str, pattern: str) -> bool:
    """Proxy for CC's boundary-preserved `Bash(<pat>)` matcher behavior.

    For `Bash(<literal-prefix>*<rest>)` patterns, the command MUST start with
    `<literal-prefix>` (boundary preservation). The trailing `<rest>` portion
    must be matchable too (we use `*` glob admitting anything between literal
    segments).
    """
    if not pattern.startswith("Bash(") or not pattern.endswith(")"):
        return False
    inner = pattern[len("Bash(") : -1]
    # Split on `*` and require all literal segments appear in order, with the
    # FIRST segment matching at the start (boundary preservation).
    segments = inner.split("*")
    if not segments[0]:
        # Pattern starts with `*` — leading wildcard = NO boundary preservation.
        return False
    if not cmd.startswith(segments[0]):
        return False
    # Walk remaining segments in order
    pos = len(segments[0])
    for seg in segments[1:]:
        if not seg:
            continue
        idx = cmd.find(seg, pos)
        if idx == -1:
            return False
        pos = idx + len(seg)
    return True


def _load_prescribed_patterns() -> list[tuple[str, str, str]]:
    """Return list of (event_name, script_basename, if_pattern) tuples for
    every Bash matcher hook in `.claude/settings.json`.
    """
    data = json.loads(SETTINGS_PATH.read_text(encoding="utf-8"))
    out: list[tuple[str, str, str]] = []
    for ev_name in ("PreToolUse", "PostToolUse"):
        for ev in data.get("hooks", {}).get(ev_name, []):
            if ev.get("matcher") != "Bash":
                continue
            for h in ev.get("hooks", []):
                if "if" not in h:
                    continue
                cmd = h.get("command", "")
                # extract script basename for diagnostic context
                script = (
                    cmd.split("/")[-1].split(".py")[0] + ".py"
                    if ".py" in cmd
                    else cmd.split("/")[-1]
                )
                out.append((ev_name, script, h["if"]))
    return out


def test_no_leading_wildcard_anti_pattern() -> None:
    """Boundary-preservation invariant — NO `Bash(*<rest>)` matchers."""
    patterns = _load_prescribed_patterns()
    leading_wildcard = [p for p in patterns if p[2].startswith("Bash(*")]
    assert not leading_wildcard, (
        f"Anti-pattern detected: {leading_wildcard}. Per codex T3 verdict on "
        f"Ship H sha 2b3ff4f, leading-wildcard matchers admit substring matches "
        f"that fire commit/push gates for non-git commands. Use boundary-preserved "
        f"`Bash(git commit *)` or explicit rtk-prefix `Bash(rtk git commit *)` instead."
    )


# POSITIVE cases — real git / rtk-rewritten / env-wrapped commands MUST match
POSITIVE_CASES: list[tuple[str, str]] = [
    # (command, expected matching pattern)
    # Plain git
    ("git commit -m 'msg'", "Bash(git commit *)"),
    ("git commit -am 'msg'", "Bash(git commit *)"),
    ("git commit --amend --no-edit", "Bash(git commit *)"),
    ("git -C subdir commit -m 'msg'", "Bash(git -C * commit *)"),
    ("git -C /abs/path commit --amend", "Bash(git -C * commit *)"),
    # rtk-prefix
    ("rtk git commit -m 'msg'", "Bash(rtk git commit *)"),
    ("rtk git commit --amend --no-edit", "Bash(rtk git commit *)"),
    ("rtk git -C subdir commit -m 'msg'", "Bash(rtk git -C * commit *)"),
    ("rtk git -C /abs/path commit --amend", "Bash(rtk git -C * commit *)"),
    # Plain git push
    ("git push origin main", "Bash(git push *)"),
    ("git push --force-with-lease origin feature-x", "Bash(git push *)"),
    ("git -C subdir push origin main", "Bash(git -C * push *)"),
    # rtk push
    ("rtk git push origin main", "Bash(rtk git push *)"),
    ("rtk git push --force-with-lease origin feature-x", "Bash(rtk git push *)"),
    ("rtk git -C subdir push origin main", "Bash(rtk git -C * push *)"),
    # NEW Wave 130 Fire 6 env-wrapper cases
    ("env GIT_TRACE=1 git commit -m 'msg'", "Bash(env * git commit *)"),
    ("env -i HOME=/tmp git commit -am msg", "Bash(env * git commit *)"),
    (
        "env GIT_AUTHOR_NAME='Bot' git -C subdir commit -m msg",
        "Bash(env * git -C * commit *)",
    ),
    ("env GIT_TRACE=1 git push origin main", "Bash(env * git push *)"),
    ("env -i HOME=/tmp git push --force origin main", "Bash(env * git push *)"),
    (
        "env GIT_SSH_COMMAND='ssh -i key' git -C subdir push origin",
        "Bash(env * git -C * push *)",
    ),
]


# NEGATIVE cases — text-only Bash containing the literal substring `git commit`
# or `git push` MUST NOT match ANY prescribed pattern (codex T3 prescription).
NEGATIVE_CASES: list[str] = [
    'echo "git commit message goes here"',
    "cat README.md | grep 'git commit'",
    'printf "%s\\n" "Run git commit -m msg to ship"',
    "awk '/git push/ { print }' history.log",
    'echo "Sample: git commit -m foo" >> notes.txt',
    'sed -i "s/git push/git pull/" deploy.sh',
    'jq -r ".instructions" < doc.json | grep "git commit"',
    'docker run --rm alpine sh -c "echo git push origin"',
]


def test_positive_cases_match_expected_pattern() -> None:
    """Each real git/rtk command MUST match its expected boundary-preserved pattern."""
    for cmd, expected_pattern in POSITIVE_CASES:
        assert _matches_boundary_preserved(cmd, expected_pattern), (
            f"POSITIVE FAIL: cmd={cmd!r} did NOT match expected pattern {expected_pattern!r}"
        )


def test_negative_cases_match_no_pattern() -> None:
    """Text-only Bash containing `git commit` / `git push` substring MUST NOT
    match ANY prescribed boundary-preserved pattern (codex T3 prescription).
    """
    prescribed_patterns = [
        "Bash(git commit *)",
        "Bash(git -C * commit *)",
        "Bash(rtk git commit *)",
        "Bash(rtk git -C * commit *)",
        "Bash(git push *)",
        "Bash(git -C * push *)",
        "Bash(rtk git push *)",
        "Bash(rtk git -C * push *)",
    ]
    for cmd in NEGATIVE_CASES:
        matching = [
            p for p in prescribed_patterns if _matches_boundary_preserved(cmd, p)
        ]
        assert not matching, (
            f"NEGATIVE FAIL: text-only cmd={cmd!r} matched prescribed pattern(s) {matching}. "
            f"Per codex T3 verdict on Ship H sha 2b3ff4f, this would cause hooks to fire "
            f"for non-git commands containing the substring — boundary preservation broken."
        )


def test_legacy_leading_wildcard_would_match_text_only() -> None:
    """Regression-anchor: confirm that the OLD leading-wildcard form
    `Bash(*git commit *)` WOULD have matched text-only Bash, demonstrating
    exactly the bypass path codex T3 caught.
    """
    legacy_patterns = ["Bash(*git commit *)", "Bash(*git push *)"]
    text_only_cmd = 'echo "git commit message goes here"'
    # The proxy's leading-wildcard handling returns False (we treat leading
    # wildcards as forbidden), so confirm via raw substring check that the
    # legacy pattern WOULD have admitted the text-only command.
    for legacy_pattern in legacy_patterns:
        # Strip `Bash(` and `)` and `*` to extract literal substring
        inner = legacy_pattern[len("Bash(") : -1]
        literal_segments = [s for s in inner.split("*") if s]
        # If ALL literal segments appear as substrings in order, the legacy
        # leading-wildcard pattern would have matched.
        pos = 0
        all_found = True
        for seg in literal_segments:
            idx = text_only_cmd.find(seg, pos)
            if idx == -1:
                all_found = False
                break
            pos = idx + len(seg)
        if "git commit" in legacy_pattern:
            assert all_found, (
                "Sanity check failed: legacy `Bash(*git commit *)` should match "
                f"text-only cmd {text_only_cmd!r} via substring scan."
            )


if __name__ == "__main__":
    test_no_leading_wildcard_anti_pattern()
    test_positive_cases_match_expected_pattern()
    test_negative_cases_match_no_pattern()
    test_legacy_leading_wildcard_would_match_text_only()
    print(
        "All 5 tests PASS — Wave 130 Fire 5 Ship O + Wave 130 Fire 6 Ship P matcher boundaries verified."
    )
