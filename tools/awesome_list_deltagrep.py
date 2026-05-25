#!/usr/bin/env python3
"""
awesome_list_deltagrep.py — find repos cited in awesome-lists but missing from the
adoption-decisions ledger.

v3.1 G7 point-revision (W291) per
`docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F4-CONVERGENCE-METHOD-V4.md §3`.

Operator-discretion follow-up tool: surfaces "prior art that wasn't audited" — repos
cited in canonical awesome-lists (awesome-claude-code, awesome-mcp-servers, etc.) but
absent from the runtime's `verdicts/W<wave>-<slug>.md` basic-memory notes and the
canonical `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` row table.

Usage:
    python tools/awesome_list_deltagrep.py [--dry-run] [--config CONFIG] [--out OUT]

Defaults to dry-run when no flags supplied. Uses only Python stdlib (urllib + re).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

# --- configuration ----------------------------------------------------------

DEFAULT_LISTS = [
    # (name, raw markdown URL on GitHub)
    (
        "awesome-claude-code",
        "https://raw.githubusercontent.com/hesreallyhim/awesome-claude-code/main/README.md",
    ),
    (
        "awesome-claude-code-subagents",
        "https://raw.githubusercontent.com/VoltAgent/awesome-claude-code-subagents/main/README.md",
    ),
    (
        "awesome-mcp-servers",
        "https://raw.githubusercontent.com/punkpeye/awesome-mcp-servers/main/README.md",
    ),
    (
        "awesome-claude-skills",
        "https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/main/README.md",
    ),
]

REPO_RE = re.compile(
    r"(?:https?://github\.com/|github\.com/)([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)"
)

PROJECT_ROOT = Path(__file__).resolve().parent.parent
VERDICT_LEDGER = (
    PROJECT_ROOT
    / "docs"
    / "architecture"
    / "W288-RESEARCH-ARCH-v2"
    / "VERDICT-LEDGER.md"
)


def fetch_url(url: str, timeout: int = 30) -> str:
    """Fetch a URL, return the text. Empty string on failure."""
    req = urllib.request.Request(url, headers={"User-Agent": "deltagrep/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.read().decode("utf-8", errors="replace")
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"  [warn] fetch failed {url}: {exc}", file=sys.stderr)
        return ""


def extract_repos(markdown: str) -> set[str]:
    """Extract `org/repo` slugs from markdown. Lowercase + dedup."""
    out: set[str] = set()
    for org, repo in REPO_RE.findall(markdown):
        # strip trailing punctuation / .git suffix
        repo = repo.rstrip(").,;:!?").removesuffix(".git")
        if not org or not repo:
            continue
        # skip non-repo paths (eg github.com/orgs/.../people)
        if org.lower() in {"orgs", "topics", "search", "marketplace", "users"}:
            continue
        out.add(f"{org}/{repo}".lower())
    return out


def load_ledger_repos() -> set[str]:
    """Extract repo slugs from VERDICT-LEDGER.md + basic-memory verdicts/W*-*.md notes."""
    seen: set[str] = set()
    if VERDICT_LEDGER.is_file():
        seen |= extract_repos(VERDICT_LEDGER.read_text(encoding="utf-8"))
    # Best-effort scan for basic-memory verdict markdowns (operator can place a
    # local mirror at .basic-memory/verdicts/ — if absent, just skip).
    bm_dir = PROJECT_ROOT / ".basic-memory" / "verdicts"
    if bm_dir.is_dir():
        for fp in bm_dir.glob("W*-*.md"):
            seen |= extract_repos(fp.read_text(encoding="utf-8"))
    return seen


def render_report(awesome_repos: dict[str, set[str]], ledger_repos: set[str]) -> str:
    """Render a markdown report of repos cited but NOT in the ledger."""
    all_cited: set[str] = set()
    for repos in awesome_repos.values():
        all_cited |= repos
    missing = sorted(all_cited - ledger_repos)
    out = [
        "# awesome-list deltagrep report",
        "",
        f"Awesome-lists scanned: **{len(awesome_repos)}**.",
        f"Ledger entries known: **{len(ledger_repos)}**.",
        f"Repos cited but NOT in ledger: **{len(missing)}**.",
        "",
        "## Top missing repos by citation count (cross-list)",
        "",
        "| Repo | Cited in |",
        "|---|---|",
    ]
    counts: dict[str, list[str]] = {}
    for list_name, repos in awesome_repos.items():
        for r in repos - ledger_repos:
            counts.setdefault(r, []).append(list_name)
    ranked = sorted(counts.items(), key=lambda kv: (-len(kv[1]), kv[0]))
    for repo, lists in ranked[:50]:
        out.append(f"| `{repo}` | {', '.join(sorted(lists))} |")
    if len(ranked) > 50:
        out.append("")
        out.append(f"_(+{len(ranked) - 50} more — see `--out FILE` for full list)_")
    out.append("")
    out.append("## Per-list breakdown")
    for list_name, repos in awesome_repos.items():
        out.append("")
        out.append(
            f"### {list_name} — {len(repos)} cited, {len(repos - ledger_repos)} missing"
        )
    return "\n".join(out)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print report to stdout. (Default when --out is omitted.)",
    )
    parser.add_argument(
        "--config",
        type=Path,
        help='Optional JSON config: {"lists": [[name, url], ...]}',
    )
    parser.add_argument(
        "--out",
        type=Path,
        help="Write report to this path instead of stdout.",
    )
    args = parser.parse_args()

    lists = DEFAULT_LISTS
    if args.config and args.config.is_file():
        cfg = json.loads(args.config.read_text(encoding="utf-8"))
        lists = [(item[0], item[1]) for item in cfg.get("lists", DEFAULT_LISTS)]

    print(f"Scanning {len(lists)} awesome-lists ...", file=sys.stderr)
    awesome_repos: dict[str, set[str]] = {}
    for name, url in lists:
        print(f"  fetching {name} ...", file=sys.stderr)
        md = fetch_url(url)
        repos = extract_repos(md)
        awesome_repos[name] = repos
        print(f"    {len(repos)} repos cited", file=sys.stderr)

    print("Loading ledger entries ...", file=sys.stderr)
    ledger = load_ledger_repos()
    print(f"  {len(ledger)} repos in ledger", file=sys.stderr)

    report = render_report(awesome_repos, ledger)
    if args.out and not args.dry_run:
        args.out.write_text(report, encoding="utf-8")
        print(f"Report written to {args.out}", file=sys.stderr)
    else:
        print(report)
    return 0


if __name__ == "__main__":
    sys.exit(main())
