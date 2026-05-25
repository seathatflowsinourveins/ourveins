[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:133 -- `SakanaAI/AI-Scientist` is cited as a 2026-MAY SOTA pattern despite `2025-12-19` activity and is not a canonical Anthropic/OpenAI/Microsoft/Google org SDK under the stated freshness rule.
Required-fix: Drop from current-SOTA candidate lists or move to historical/CITE-PATTERN with a commit-message line: `Freshness: downgraded SakanaAI/AI-Scientist because pushed_at < 2026-01-01 and no allowed org-SDK exemption applies.`

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:134 -- `SakanaAI/AI-Scientist-v2` is also stale (`2025-12-19`) and the line incorrectly leans on the v1 rationale instead of providing a valid 2026-Q1+ or org-SDK exemption.
Required-fix: Remove `AI-Scientist-v2` from Top-3/current-SOTA positions or explicitly relabel it as stale research-pattern input, not a fresh SOTA challenger.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:435 -- `github/stack-graphs` is exempted with a GitHub org-canonical rationale even though the freshness mandate only permits canonical Anthropic/OpenAI/Microsoft/Google org SDK exemptions.
Required-fix: Change this row to FAIL/DROP unless a 2026-Q1+ push or explicit allowed org-SDK justification is verified.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:437 -- `microsoft/PromptWizard` is exempted despite `2025-10-13` freshness gap and being a Microsoft Research prompt optimizer, not an org-canonical SDK.
Required-fix: Downgrade PromptWizard to stale historical citation or require a fresh 2026-Q1+ verification before retaining any T2/VENDOR-FORK language.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:601 -- The broad statement that 2025-Q4 Microsoft/Anthropic/Google/OpenAI repos were exempted by org guarantee weakens the document's own stricter SDK-only freshness contract.
Required-fix: Replace the broad org-canonical exemption statement with per-repo `SDK? yes/no` freshness decisions and downgrade every non-SDK stale repo.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:121 -- Axis B omits `google-gemini/gemini-cli`, an official Google-family open-source terminal AI agent with Apache-2.0 license, 100k+ stars, MCP client/server topics, and 2026-05-18 activity, despite the requirement to check Google orgs for Codex-as-adversary/subagent alternatives.
Required-fix: Add `google-gemini/gemini-cli` to §2.B and §5, then reassess the Top-3/Top-10 ordering against `openai/codex`, `cline/cline`, and `Aider-AI/aider`.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:123 -- Axis B includes `inspect_ai` and `promptfoo` eval harnesses but omits `openai/evals`, the OpenAI org-canonical eval framework for LLM systems, leaving the OpenAI source-family breadth check incomplete.
Required-fix: Add `openai/evals` to §2.B or §2.E with current GitHub metadata, or explicitly justify exclusion as superseded by another OpenAI eval surface.

[HIGH] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:400 -- `github/spec-kit` is marked "NOT YET INSTALLED" while the same document later says `speckit-*` skills are already present, creating a cite-accuracy conflict on the adoption state.
Required-fix: Split the claim into verified installed pieces versus unverified full-plugin pieces, e.g. `speckit skills present; full official plugin provenance unverified`.

[MED] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:192 -- The candidate table uses `(active)` for `last-commit`, which violates the table schema and prevents freshness enforcement.
Required-fix: Replace `(active)` with a concrete `YYYY-MM-DD` pushed_at value or mark `UNKNOWN-FRESHNESS` and exclude from current-SOTA ranking.

[MED] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:196 -- `Cognee` uses inferred stars and `active` instead of numeric stars plus a concrete pushed_at date.
Required-fix: Replace inferred/active fields with GitHub-verified `stars`, `pushed_at`, and license values before using the row in convergence counts.

[MED] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:233 -- `lm-evaluation-harness` uses `(~7k inferred)` and `active`, which is schema-invalid for a table claiming GitHub metadata.
Required-fix: Fetch and insert exact GitHub stars and `YYYY-MM-DD` pushed_at, or mark the candidate as unverified.

[MED] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:235 -- `google-deepmind/bbeh` records stars as prose and license as `(license tbd)`, which blocks cite-accuracy review.
Required-fix: Replace prose metadata with exact GitHub `stargazers_count`, `pushed_at`, and SPDX license, or move the row to non-repo benchmark citations.

[MED] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:280 -- `semgrep/semgrep` is listed with inferred stars, `active`, and LGPL without a verification note, making the license/freshness claim non-auditable.
Required-fix: Verify Semgrep GitHub metadata and normalize to exact stars, `YYYY-MM-DD`, and SPDX license before retaining it as a code-quality challenger.

[LOW] docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md:639 -- The anti-bias summary says the top-10 includes "1 candidate <10k stars" but also lists `LearningCircuit/local-deep-research` at 7.8k stars, so the count is internally wrong.
Required-fix: Correct the sentence to count all sub-10k Top-10 entries or remove the numeric claim.

VERDICT: REVISE
