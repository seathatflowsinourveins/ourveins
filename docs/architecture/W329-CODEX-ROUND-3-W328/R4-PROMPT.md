# W329-K3 — Codex Round-4 Verification Prompt (narrow scope)

**Round**: cumulative #20 · **Predecessor**: W329-CODEX-ROUND-3-W328/VERDICT.md (NEEDS-MORE-REVISION Axis 6 only)
**Dispatched from**: Z:/claude-sota-installed · **Model**: gpt-5.5
**Token-budget target**: ≤15k (single-axis delta; F2b-deep cascade-sweep verification)

## Prompt text (paste-ready, ~2500 chars; Option C file-path-reference)

```
You are codex GPT-5.5 acting as adversarial cross-model reviewer for round-4 of W329-K verification (cumulative round 20).

CONTEXT
- Workdir: Z:/claude-sota-installed
- Round-3 (cumulative #19) returned: Axis 1 PASS, Axis 3 PASS, Axis 6 NEEDS-MORE-REVISION (F2b-deep cascade)
- Round-3 verdict: Z:/claude-sota-installed/docs/architecture/W329-CODEX-ROUND-3-W328/VERDICT.md
- Other 5 axes already PASS — do not re-litigate (Axes 1+2+3+4+5)
- F2b-deep residual flag was: W329-B-SYNTHESIS.md L27, L29, L33 retained superseded W328-S2-USER-ERROR predicate in downstream remediation text even though predecessor block at L4 was correctly cited

ROUND-4 SCOPE — verify ONLY Axis 6 cascade-sweep applied cleanly

Target file: Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md

Applied 4 surgical edits this round (closing the round-3 F2b-deep flag):
1. L27 — Remediation banner reframed from "[WITHDRAWN-USER-ERROR per W328-S2]" → "[WITHDRAWN-UNKNOWN-ATTRIBUTION per W329-S2-REAUDIT]"; added predecessor-superseded note + 5-source re-audit citation
2. L29 — F-5 banner reframed: WITHDRAWN-USER-ERROR → WITHDRAWN-UNKNOWN-ATTRIBUTION; cite-anchor now W329-S2-REAUDIT/VERDICT.md
3. L33 — W320-G evidence row: "operator-misuse, not upstream defect" → "unknown attribution per W329-S2-REAUDIT (BOTH user-error AND upstream-defect hypotheses refuted by 5-source live-API probes); the predecessor W328-S2-USER-ERROR framing is SUPERSEDED"
4. Pre-emptive cascade-sweep:
   - L55 v12.1-reframe descriptor: appended "(W328-S2 USER-ERROR predicate SUPERSEDED by W329-S2-REAUDIT to UNKNOWN-ATTRIBUTION; v12.1 reframe still valid on broader 'right-tool-for-job' principle)"
   - L79 banner-recommendation table-row: changed "[WITHDRAWN-USER-ERROR per W328-S2]" → "[WITHDRAWN-UNKNOWN-ATTRIBUTION per W329-S2-REAUDIT] (predecessor W328-S2 USER-ERROR verdict SUPERSEDED) ... W-UE classification preserved"
   - L93 R6-corollary: reframed "Default to operator-misuse hypothesis" → "Default to 'look at own usage first' + unknown-attribution discipline ... W329-S2-REAUDIT empirically showed that even the 'user-error' counter-hypothesis can fail under re-audit; root cause may be UNDETERMINED even after both bug-blame and user-blame hypotheses are tested"

VERIFY ALL TARGETED LINES (L4, L15, L21, L27, L29, L33, L55, L79, L87, L93, L99) of W329-B-SYNTHESIS.md and confirm:
(a) Predecessor block at L4 correctly supersedes W328-S2 → W329-S2-REAUDIT
(b) Top-5 remediation text (L27-L35) uses UNKNOWN-ATTRIBUTION reframe with W329-S2-REAUDIT cite-anchors
(c) v12.1 reframe descriptor at L55 documents the supersession
(d) Banner-recommendation table at L79 uses UNKNOWN-ATTRIBUTION not USER-ERROR
(e) R6-corollary at L93 expanded to "look at own usage first + unknown-attribution" discipline (not "operator-misuse default")
(f) Historical-record lines (L15, L21, L87, L99) preserve their original W-UE classification descriptors as historical fact — these are CORRECT-AS-IS (they describe the classification scheme + file-naming convention + historical retraction labels; not predicate claims)

VERDICT OUTPUT FORMAT (terse, ≤300 words):
1. Axis 6 = PASS or NEEDS-MORE-REVISION
2. OVERALL: APPROVE | NEEDS-MORE-REVISION | ESCALATE
3. IF NEEDS-MORE-REVISION: specific file:line + surgical fix
4. IF APPROVE: state explicitly "APPROVE for B1-B13 commit batches per W329-COMMIT-PLAN.md"

No web-fetches needed; round-3 already grounded external citations.

START.
```
