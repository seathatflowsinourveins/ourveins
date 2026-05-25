# W329-K2 — Codex Round-3 Verification Prompt

**Round**: cumulative #19 · **Predecessor**: W329-CODEX-ROUND-2-W328/VERDICT.md (NEEDS-MORE-REVISION)
**Dispatched from**: Z:/claude-sota-installed · **Model**: gpt-5.5
**Token-budget target**: ≤50k (3 axes already PASS, only 3 NEEDS-MORE-REVISION delta to verify)

## Prompt text (paste-ready, ~3800 chars; Option C file-path-reference per W321)

```
You are codex GPT-5.5 acting as adversarial cross-model reviewer for round-3 of W329-K verification (cumulative round 19).

CONTEXT
- Workdir: Z:/claude-sota-installed
- Round-2 returned NEEDS-MORE-REVISION on 3 of 6 axes (Axes 1, 3, 6) with 3 surgical flags: F1+F2+F3
- Round-2 verdict: Z:/claude-sota-installed/docs/architecture/W329-CODEX-ROUND-2-W328/VERDICT.md
- 3 axes already PASS (Axes 2, 4, 5) — do not re-litigate those
- Operator preserved 4 principles: (1) "we need all sota full depth gaps resolution"; (2) "why keep suggesting pr?" → mature-repo deep-dive over PR-suggestion; (3) "they are mature repos, if you find error, you should deeper dive into the source code find resolution, not assume you are right and want to pr"; (4) "if they are rate limit, you can use graphql and other sota methods to access all"

ROUND-3 SCOPE — verify the 3 F-fixes flip the 3 NEEDS-MORE-REVISION axes to PASS

F1 fix (Axis 3 — S2 GitHub-MCP re-audit):
  File: Z:/claude-sota-installed/docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md
  Predecessor L209 contained: "Supplementary: GitHub Community Discussions + GitHub Search Cheatsheet confirm `repo:owner/name` is for code/issues, not repositories."
  Replaced with W329-S2-REAUDIT verdict-δ block citing 5-source live-API probes that refute BOTH the W328-S2 user-error hypothesis AND the codex round-1 hypothesis; root cause UNDETERMINED pending W330.
  Verify: L209 area now reflects re-audit-δ; no contradictory supplementary sentence remains; cite-chain points to W329-S2-REAUDIT/VERDICT.md.

F2a fix (Axis 6 — retained UPSTREAM-BUG claims, LEDGER predecessor verdicts):
  File: Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md
  Predecessor L6 cited "W328-S2 USER-ERROR-CONFIRMED" as canonical predecessor verdict (superseded by W329-S2-REAUDIT).
  Updated L6-8 block: W328-S2 marked SUPERSEDED-BY W329-S2-REAUDIT; classification table preserved (W-UE rows still WITHDRAWN); reframed predicate from "user qualifier mismatch" to "unknown-attribution error".
  Verify: predecessor block at top of LEDGER cites W329-S2-REAUDIT; W-UE classification rows remain consistent (withdrawal valid on basis of *some* error, attribution shifted).

F2b fix (Axis 6 — retained UPSTREAM-BUG claims, SYNTHESIS predecessor verdicts):
  File: Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md
  Predecessor L4 cited "W328-S2 USER-ERROR-CONFIRMED" predecessor verdict.
  Updated L4: predecessor description includes W328-S2 SUPERSEDED note pointing to W329-S2-REAUDIT/VERDICT.md.
  Verify: predecessor block cites W329-S2-REAUDIT supersession; SYNTHESIS reasoning chain consistent with reframed predicate.

F3 fix (Axis 1 aggregate — HF M4 reconciliation):
  Files:
    A. Z:/claude-sota-installed/docs/architecture/W329-D-BYPASS-APPLY/METHODS-USED.md (M4 deferral row)
    B. Z:/claude-sota-installed/docs/architecture/W328-HF-SOTA-METHODS/SOTA-BYPASS.md L63 (M4 description)
  Predecessor METHODS-USED M4 row said "Same substring-on-id semantics as M3" (CONTRADICTED SOTA-BYPASS L63 which says M4 is the front-end UI full-text search backend with `q` parameter).
  Updated METHODS-USED M4 row reconciles with SOTA-BYPASS L63: M4 IS front-end UI search backend (full-text, NOT substring-on-id); deferred for different operational reasons (undocumented, rate-limit-class unmeasured, channels already saturated via M1-M3).
  Verify: M4 description in METHODS-USED matches SOTA-BYPASS L63 semantics; deferral rationale reframed to operational (not semantic-duplicate-of-M3).

VERDICT OUTPUT FORMAT (terse, ≤500 words):
1. PER-AXIS-MATRIX: Axis 1 / Axis 3 / Axis 6 = PASS or NEEDS-MORE-REVISION
2. OVERALL: APPROVE | NEEDS-MORE-REVISION (more rounds) | ESCALATE (regression detected)
3. TOP-K residual flags (k≤3) IF NEEDS-MORE-REVISION
4. Cite-anchors used (1-2 lines each)

If APPROVE: state explicitly "APPROVE for B1-B13 commit batches per W329-COMMIT-PLAN.md".
If NEEDS-MORE-REVISION: identify the specific file:line that still has the regressed text + the surgical fix needed.

External web-fetches (optional): re-verify github docs `searching-for-repositories.md` + `huggingface.co/docs/hub/rate-limits` only if needed to resolve a residual flag — round-2 already confirmed both. Save tokens; rely on the file-path-references above.

START.
```
