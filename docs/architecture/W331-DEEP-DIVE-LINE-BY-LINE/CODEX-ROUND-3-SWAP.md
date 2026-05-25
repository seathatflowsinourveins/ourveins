I completed the H→A verify pass, but the environment is read-only, so writing `CODEX-ROUND-3-SWAP.md` was blocked.

Verdict I would write: **REVISE**, composite **0.89**, confidence **0.87**.

Targeted fixes:

- **Fix 1 R4**: PASS. `cluster-H-plugin-ecosystem.md:129-145` now correctly frames GitNexus as Windows SIGSEGV avoidance / BM25 graceful degradation, not probe-then-load. It cites `pool-adapter.ts:423-431` and `:497-502`.
- **Fix 2 R5**: PASS for requested lines. `cluster-H-plugin-ecosystem.md:470-476`, `:25`, and `:155` are retagged/contextualized as W331-X2, NOT W330 P0.6.
- **Fix 3 R7**: PASS. `SYNTHESIS.md:248` removed `T1-INSTALL CR-1 sources × 4`, now has `T3 PATTERN-with-CR-1-cite × 4`, and includes the D-EMP hard-gate note.

Position-swap self-check found two extra stale H-cluster surfaces a forward-order reviewer could miss:

- `cluster-H-plugin-ecosystem.md:524` still says `D2 — Update GitNexus (P0.6)` / `§7 P0.6 mapping`.
- `cluster-H-plugin-ecosystem.md:543` still says `P0.6 / D2 confirmed`.

So I would not ratify yet. Once those two are retagged to W331-X2, expected verdict is **APPROVE ≥0.92**.