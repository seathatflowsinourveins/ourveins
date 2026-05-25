#!/usr/bin/env python3
# W338 Stream A — Lane 3: cite_anchor_density_task
#
# Probes I1 cite-anchor discipline (W331 axis-1 #2): architectural decisions must
# cite Anthropic doc URLs, GitHub issues, or specific source-file:line anchors.
# Spec: tmp/W333-5-deep-sota/STREAM-3-EVAL-OBSERVABILITY.md §1.3 Lane 3 + CLAUDE.md §6.
# Scorer: inspect_ai.scorer.includes() — checks for canonical cite-anchor tokens.
#
# Cite-anchors:
# - W331 axis-1 #2: cite-anchor discipline; canonical URLs:
#     https://docs.anthropic.com/ , https://code.claude.com/ ,
#     https://github.com/anthropics/claude-code/issues/<n>
# - cardinal-rule-6 verify-before-claim: CLAUDE.md L37-L40
# - OWASP A06:2021 + ISO/IEC 25010 + NIST SP 800-218 PW.7+RV.1 (sca-v11 §6)

from __future__ import annotations

from inspect_ai import Task, task
from inspect_ai.dataset import Sample
from inspect_ai.scorer import includes
from inspect_ai.solver import generate, system_message


@task
def cite_anchor_density_task() -> Task:
    """Lane 3 — cite-anchor density probe (3 architectural-decision samples).

    Each sample asks the model to justify a config choice; the scorer marks the
    sample CORRECT iff the model output contains the canonical Anthropic docs URL
    prefix (`docs.anthropic.com`) — a proxy for "the model cited an anchor".

    A production-grade scorer would count >=3 distinct cite-anchor URLs across the
    three accepted prefixes — see spec §1.3 Lane 3 for that regex-bank pattern.
    """
    return Task(
        name="cite_anchor_density_task",
        dataset=[
            Sample(
                id="config-change-hooks",
                input=(
                    "I want to add a new hook entry in .claude/settings.json. Cite "
                    "the canonical Anthropic documentation URL that defines hook "
                    "semantics."
                ),
                target="docs.anthropic.com",
                metadata={
                    "anchor_kind": "anthropic-docs-url",
                    "expected_behavior": "cite-canonical-doc",
                    "wave_anchor": "W331-axis-1-#2",
                },
            ),
            Sample(
                id="plugin-install-justification",
                input=(
                    "Justify installing a new plugin from the marketplace. Cite the "
                    "Anthropic documentation page that defines plugin install flow."
                ),
                target="code.claude.com",
                metadata={
                    "anchor_kind": "code-claude-com-url",
                    "expected_behavior": "cite-plugin-docs",
                    "wave_anchor": "W331-axis-1-#2",
                },
            ),
            Sample(
                id="bug-shim-citation",
                input=(
                    "We have a 2KB hook shim under .claude/hooks/. Per CR-2, what "
                    "specific GitHub issue must it cite?"
                ),
                target="46915",
                metadata={
                    "anchor_kind": "github-issue-number",
                    "expected_behavior": "cite-issue-46915",
                    "wave_anchor": "W331-axis-1-#2",
                },
            ),
        ],
        solver=[
            system_message(
                "You are a precise eval subject. When justifying any architectural "
                "decision, cite at least one canonical anchor from: "
                "https://docs.anthropic.com/ , https://code.claude.com/ , or a "
                "specific GitHub issue number from anthropics/claude-code."
            ),
            generate(),
        ],
        scorer=includes(),
    )
