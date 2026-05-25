# W296 Codex GPT-5.5 Cross-Model Gate — Adversarial Review Prompt

> **Used by**: `Z:/claude-sota-installed/docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/` synthesis ratification.
> **Invocation pattern (PowerShell-native; per W295 Phase-6.2 r17/r19 contract)**:
>
> ```powershell
> $reviewPrompt = @'
> <prompt body — see §1 below; embed ranking + verdict-table directly to bypass gitignored-path false-control>
> '@
> codex task --effort high $reviewPrompt
> # Parse: look for 'VERDICT: APPROVE' OR 'VERDICT: REVISE' OR 'VERDICT: BLOCK' marker
> ```
>
> **Round budget**: per W290-CODEX-UNLEASH, 5-10 reviews/session is the SOTA pace; this wave queues r1-r10 with fix-iterate-fire semantics. Real-bug rate target ≥50% (W295 achieved 9/9 = 100%).

## §1 — Adversarial prompt body (paste-ready, ≤2000 chars after embedding)

```
You are GPT-5.5 conducting an ADVERSARIAL cross-model review of a Claude-authored
W296 architecture-audit + 2026-MAY SOTA-challenger-discovery + sca-v4 design
synthesis. Source-of-truth = external SOTA convergence, NOT current-architecture
self-justification.

REVIEW SCOPE:
- W296-AUDIT-2026-05-18.md (ledger + synthesis)
- W296-STREAM-A-CURRENT-ARCH-AUDIT.md
- W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md
- W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md
- W296-STREAM-D-RESEARCH-ARCH-V4.md
- W296-STREAM-E-FOUNDATION-AUDIT.md (operator-added; skills + agent-teams + cardinal-rule depth)
- W296-STREAM-F-TASK-HYGIENE.md (operator-flagged; AGING-relitigation sweep)

ADVERSARIAL CRITERIA (find ANY of these):
[HIGH] Confirmation bias: Claude justifying current architecture rather than
       letting external SOTA convergence challenge it.
[HIGH] Freshness violation: any 2024 or pre-2026-Q1 reference cited as 'current
       SOTA' without org-canonical-SDK justification.
[HIGH] Stars-as-hardgate: any T5 REJECT or T4 CITE-ONLY decision driven by
       low-stars without affirmative-evidence-of-unfitness (D10≤2, D7≤1,
       D15≤1, D18<2).
[HIGH] False-control: a control structure that looks like enforcement but
       actually no-ops (e.g., a check that always passes; a config that's
       gitignored; a test that's never run).
[HIGH] Schema invalidity: any tool-call or contract that uses parameters
       not present in the actual MCP/CLI schema.
[HIGH] Trust-boundary regression: any change that leaks secrets, paths, or
       proprietary content to a destination operator didn't authorize.
[MED]  Cardinal-rule conflict: new primitives that violate rules 1-5
       (trusted-only plugins; no self-invent .py/.sh hooks; documented
       subagents; project behaviour in CLAUDE.md+settings.json only;
       safety via permissions not custom scripts).
[MED]  Cite-accuracy: claims attributed to a source that don't actually
       appear in that source.
[LOW]  Style: any stylistic issue (per CLAUDE.md ≤50 LOC, file naming,
       commit-message convention).

For EACH finding, output:
  [SEVERITY] <file_path>:<line> — <one-sentence description>
  Required-fix: <concrete edit or commit-message line>

Then end with EXACTLY ONE of:
  VERDICT: APPROVE
  VERDICT: REVISE
  VERDICT: BLOCK

NO PREAMBLE. Findings + verdict ONLY.
```

## §2 — Round 1 trigger (post-stream-completion)

Fire after:
- Streams A+B+D complete
- Stream C unblocks + completes
- W296-AUDIT-2026-05-18.md §0/§3/§5/§6 synthesis populated
- Commit ladder pushed (per-stream + ledger + synthesis)

## §3 — Round-N fix-iterate-fire pattern

For each finding remediated:
1. Edit file per `Required-fix`
2. Commit with `fix(W296-codex-r<N>):` prefix + cite the exact finding text
3. Fire next round via `codex task --effort high` with same prompt
4. Append round-result to `W296-AUDIT-2026-05-18.md §4`

Halt when:
- `VERDICT: APPROVE` returned, OR
- 10 rounds elapsed (escalate to operator with remaining-findings summary)

## §4 — Smoke-test on canonical basic-memory write (per r20 fix)

After any commit that touches `verdicts/W*-*.md`, run:

```powershell
$wave = 'W296'; $slug = 'sample-slug'
$expected = "Z:/claude-sota-installed-state/basic-memory/verdicts/${wave}-${slug}.md"
if (-not (Test-Path $expected)) {
  Write-Error "Aging-glob mismatch: $expected not found. Title slug must be '$wave-$slug' (no 'Verdict ' prefix, no em-dash)."
  exit 1
}
```

This verifies the W-prefix title contract (r20 finding) is respected.
