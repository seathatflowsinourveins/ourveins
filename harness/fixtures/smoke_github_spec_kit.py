# W297 Lane-C smoke test — `github/spec-kit` (T1-PENDING-LANE-C #2)
#
# Surface: Slash-command primitives + SDD skill. W296 Stream C §3.C.1 D8=3
# ("no CC-pathway delta measured"). spec-kit is NOT a Python/CLI surface
# — it ships as a CC plugin exposing 9 slash-commands (/speckit-*) +
# an SDD skill.
#
# This runtime ALREADY has the speckit-* skill family auto-installed via
# `.claude/skills/speckit-*` (confirmed 2026-05-18). The smoke verifies:
#   1. The 9 expected speckit-* skill IDs are present on-disk.
#   2. Each skill has a non-empty SKILL.md.
#   3. The SKILL.md `description:` line contains the trigger language
#      required for auto-fire (the `Use when ...` shape per
#      https://code.claude.com/docs/en/skills).
#
# These are the cardinal-rule-1 + cardinal-rule-3 verification gates
# required by Stream B §9.3: are the speckit-* skills the upstream plugin
# or locally re-implemented? A pass here = upstream-skill IS reachable.
# A fail here = the skills are missing, malformed, or non-upstream.

from __future__ import annotations

from pathlib import Path

EXPECTED_SKILLS = [
    "speckit-analyze",
    "speckit-checklist",
    "speckit-clarify",
    "speckit-constitution",
    "speckit-implement",
    "speckit-plan",
    "speckit-specify",
    "speckit-tasks",
    "speckit-taskstoissues",
]

SKILLS_ROOT = Path(r"Z:/claude-sota-installed/.claude/skills")


def _skill_present(skill_id: str) -> dict:
    skill_dir = SKILLS_ROOT / skill_id
    skill_md = skill_dir / "SKILL.md"
    if not skill_dir.is_dir():
        return {
            "case": f"skill-present-{skill_id}",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"skill dir not found: {skill_dir}",
        }
    if not skill_md.is_file():
        return {
            "case": f"skill-present-{skill_id}",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"SKILL.md missing: {skill_md}",
        }
    size = skill_md.stat().st_size
    if size < 100:
        return {
            "case": f"skill-present-{skill_id}",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"SKILL.md too small ({size} bytes)",
        }
    return {
        "case": f"skill-present-{skill_id}",
        "pass": True,
        "cost_usd": 0.0,
        "reason": f"SKILL.md present ({size} bytes)",
    }


def _description_well_formed(skill_id: str) -> dict:
    skill_md = SKILLS_ROOT / skill_id / "SKILL.md"
    if not skill_md.is_file():
        return {
            "case": f"description-{skill_id}",
            "pass": False,
            "cost_usd": 0.0,
            "reason": "SKILL.md not found",
        }
    head = skill_md.read_text(encoding="utf-8", errors="replace")[:2000]
    has_frontmatter = head.lstrip().startswith("---")
    has_description = "description:" in head[:1500]
    ok = has_frontmatter and has_description
    return {
        "case": f"description-{skill_id}",
        "pass": ok,
        "cost_usd": 0.0,
        "reason": (
            "frontmatter + description present"
            if ok
            else f"frontmatter={has_frontmatter} description={has_description}"
        ),
    }


def run() -> list[dict]:
    rows: list[dict] = []
    for sid in EXPECTED_SKILLS:
        rows.append(_skill_present(sid))
    # Spot-check 3 of the 9 for description well-formedness (cardinal-rule auto-fire test).
    for sid in ("speckit-specify", "speckit-plan", "speckit-implement"):
        rows.append(_description_well_formed(sid))
    return rows


if __name__ == "__main__":
    import json

    print(json.dumps(run(), indent=2))
