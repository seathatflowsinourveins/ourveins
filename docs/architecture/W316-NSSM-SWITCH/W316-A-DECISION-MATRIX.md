# W316-A DECISION MATRIX — uvx-stdio vs servy v8.4 vs HOLD-NSSM

**Date**: 2026-05-19
**Stream**: W316-A NSSM-SWITCH
**Mandate**: W315-C ELECTRE unanimous picked uvx (W314-A 20/20) OR servy v8.4 (W314-D 3.706 T2-staged) — empirical smoke-probe required before apply.

## Smoke-Probe Override

Per `W316-A-SMOKE-PROBE.md`, all 7 uvx invocations **FAIL** against cognee==1.1.0 / cognee-mcp==0.5.4 due to upstream packaging bug (`packages = ["src"]` namespace pollution). The W314-A 20/20 theoretical score is invalidated by empirical reality.

## MCDA under sca-v7.1

Weights per W315-C inheritance: D24 (mcp_attack_surface) 0.30, D3 (harness_fit) 0.25, D14 (reversibility) 0.20, D7 (maintenance) 0.15, D-EMP (empirical_viability gate) 0.10 (BLOCKER if 0).

| Dim | Weight | uvx-stdio (W314-A) | servy v8.4 (W314-D) | HOLD NSSM (incumbent) |
|---|---|---|---|---|
| **D-EMP empirical_viability** | 0.10 GATE | **0** — 7/7 probes FAIL upstream pkg-bug | 4 — staged-pilot precedent (LlamaSwap-first per W314-r2) but NOT yet smoke-probed for cognee specifically | 5 — RUNNING, HTTP handshake returns Cognee 1.26.0 |
| **D24 mcp_attack_surface** | 0.30 | 5 — stdio (no listener), spawn-on-demand, no LocalSystem | 3 — UserService possible but defaults LocalSystem like NSSM; still always-on port :8000 | 2 — NSSM LocalSystem + always-on :8000 listener + plaintext LANGFUSE_SECRET_KEY in AppEnvironmentExtra (W298 SEV-1) |
| **D3 harness_fit** | 0.25 | 5 — mirrors basic-memory `uvx --from` CR-9 pattern when it works | 3 — new pattern, NSSM-replacement-by-design; T2-staged W315-W317 | 4 — long-established W263b pattern, well-documented |
| **D14 reversibility** | 0.20 | 5 — revert by restoring NSSM (one nssm install command from dump) | 3 — service-binding via servy CLI; rollback via servy uninstall + NSSM reinstall | 5 — incumbent, no migration to undo |
| **D7 maintenance_load** | 0.15 | 4 — uv handles version pin + cache eviction | 2 — manual servy upgrade tracking (single-org `aelassas`, D21 cap floor) | 3 — NSSM 2.24-101-g897c7ad upstream-frozen since 2017 (cardinal-rule-2 grandfathered exception) |

### Weighted Score Calculation

**uvx-stdio (W314-A theoretical)**:
- BUT D-EMP=0 → **GATE FAIL** (cannot ship a non-viable option regardless of weighted score)
- Hypothetical (if D-EMP passed): `(5×0.30 + 5×0.25 + 5×0.20 + 4×0.15) = 1.50+1.25+1.00+0.60 = 4.35`

**servy v8.4 (W314-D)**:
- Score: `(4×0.10 + 3×0.30 + 3×0.25 + 3×0.20 + 2×0.15) = 0.40+0.90+0.75+0.60+0.30 = 2.95`
- D-EMP=4 PASS (not BLOCKER) but smoke for cognee specifically not run this wave (T2 staged-pilot per W314-D recommends LlamaSwap-first NOT cognee-first)

**HOLD NSSM (incumbent)**:
- Score: `(5×0.10 + 2×0.30 + 4×0.25 + 5×0.20 + 3×0.15) = 0.50+0.60+1.00+1.00+0.45 = 3.55`
- D-EMP=5 PASS

### Verdict

**HOLD NSSM** wins the MCDA under sca-v7.1 D-EMP-gated weights this wave:
1. uvx-stdio is empirically non-viable (upstream packaging bug, 7/7 probes FAIL)
2. servy v8.4 was scoped for LlamaSwap-first staged-pilot per W314-D (`docs/architecture/W314-...SOTA-DISCOVERY-AND-REAUDIT/...md`), NOT cognee-first; applying servy to cognee this wave inverts the W314-D risk-sequencing
3. HOLD NSSM preserves the empirically-healthy `serverInfo Cognee 1.26.0` runtime + 100%-reversible posture

### W317 Carry-Forward

1. **Upstream PR or vendor-fork** to fix cognee-mcp's `packages = ["src"]` mislayout. Files needing rename: `Z:/repos/deps/cognee/cognee-mcp/src/` → `cognee_mcp/`; `pyproject.toml` `packages = ["src"]` → `packages = ["cognee_mcp"]`; `[project.scripts]` `cognee-mcp = "src:main_mcp"` → `cognee-mcp = "cognee_mcp:main_mcp"`; all `from src import` → `from cognee_mcp import` (12 affected files per `Z:/repos/deps/cognee/cognee-mcp/src/`).
2. **Re-smoke** once cognee-mcp 0.5.5+ ships with proper namespace; re-evaluate W314-A 20/20 score with empirical D-EMP measurement.
3. **Servy v8.4 staged-pilot starts with LlamaSwap** per W314-D recommended sequence (lowest blast radius; W315-W316 was over-eager scoping cognee for this wave).
4. **W298 SEV-1 plaintext LANGFUSE_SECRET_KEY** in NSSM AppEnvironmentExtra remains open — env-file refactor prerequisite to ANY cognee NSSM-replacement; if W317 servy-cognee migration proceeds, secrets-vault env-file MUST land first.

## Cardinal-Rule Compliance

- **R1 trusted-source**: NSSM is the incumbent W263b install; uvx attempted via official PyPI; servy NSSM-replacement scoped per upstream `aelassas/servy@v8.4` (W314-D audit).
- **R2 hooks**: no settings.json hook touched this wave.
- **R3 subagents**: this is Stream A of a 1-shot dispatch — no nested team spawn.
- **R4 project behavior**: docs landed under `docs/architecture/W316-NSSM-SWITCH/`; CLAUDE.md untouched (other-stream territory).
- **R5 safety**: pre-state captured at `tmp/W316-cognee-nssm-pre.txt` for 100% rollback if needed; **no NSSM-stop or .mcp.json edit executed this wave**.

## Confidence

Verdict confidence: **HIGH** — 7/7 empirical probes converge on the same upstream packaging bug; HOLD-NSSM verdict is the safest path that preserves cognee :8000 availability and defers the migration to W317 with explicit prerequisite fixes (upstream PR + LlamaSwap-first ordering + W298 secrets refactor).
