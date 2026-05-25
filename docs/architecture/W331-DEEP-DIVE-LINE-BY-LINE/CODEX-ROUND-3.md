Verified all 3 residual fixes: PASS.

I could not write `CODEX-ROUND-3.md` because this session is in `read-only` sandbox mode and approvals are disabled; `apply_patch` was rejected by the runtime.

Evidence:
- Fix 1 PASS: [SYNTHESIS.md](Z:/claude-sota-installed/docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/SYNTHESIS.md:248) has `T2-CHERRY × 1`, `T3 PATTERN-with-CR-1-cite × 4`, and the `D-EMP hard-gate compliance` note. The old active line wording is gone.
- Fix 2 PASS: [cluster-H-plugin-ecosystem.md](Z:/claude-sota-installed/docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-H-plugin-ecosystem.md:129) retitles Pattern 5 to SIGSEGV/BM25 graceful degradation; lines `131` and `145` explicitly say `probe-then-load` is only commit-message wording and describe the actual Windows skip/load behavior.
- Fix 3 PASS: [cluster-H-plugin-ecosystem.md](Z:/claude-sota-installed/docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-H-plugin-ecosystem.md:470) relabels to `W331-X2`; lines `472-476` contextualize the historical quote; cross-references at lines `25` and `155` are updated.

Composite verdict: `APPROVE`, score `0.93`, confidence `0.91`.