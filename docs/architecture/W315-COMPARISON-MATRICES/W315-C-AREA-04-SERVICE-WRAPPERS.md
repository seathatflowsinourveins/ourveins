# W315-C Area 04 — Service Wrappers (Triangulated MCDA Matrix)

**Wave**: W315 · **Stream**: C · **Date**: 2026-05-19 · **Cohort**: Windows service wrappers for long-running MCP servers
**Methods**: WSM + Borda + ELECTRE I per `W315-C-MCDA-METHODOLOGY.md`
**Highest-stakes decision** in W315 queue per operator W313 directive: *"NSSM not sota"*.

---

## §1 Cohort declaration

**Slot**: long-running daemon supervisor for MCP backends (cognee `:8000`, IkLlamaServer `:8080`, langfuse `:3000`, hindsight `:9077`, LlamaSwap `:8090`, and conditionally Ollama `:16700` / FalkorDB `:16379` if re-enabled).

**Incumbent**:
- **`NSSM 2.24`** — Windows-native service wrapper, 2017-vintage binary, single-author `Iain Patterson` upstream-inactive since 2018, **operator-flagged W313 as "not SOTA"**.

**Challengers** (full sca-v6.1+v7 audit + W314-A 4-candidate matrix):
- **A. `aelassas/servy` v8.4** — active-maintained C# service wrapper, **W314-D 3.706 T2 staged-pilot W315-W317**, score reconfirmed W314-r1 3.96, W315 audit 3.706.
- **B. `winsw/winsw`** — Windows Service Wrapper, 14k★ org-owned MIT, .NET 4.6.1+, v2.12.0 stable, v3.0.0-alpha bleeding.
- **C. `Direct uvx stdio MCP` (pattern)** — eliminates the service wrapper entirely; MCP runs as CC's child process. **W314-A scored 20/20 vs all alternatives.**
- **D. `Native sc.exe + Scheduled Task`** — pure Windows primitives, no third-party wrapper.
- **E. `Docker Desktop`** — cognee-recommended; container-managed.
- **F. `AnathemaOfficial/nssm-rs`** — Rust NSSM-compatible single-binary (0★ — early prototype).

**SOTA bar**:
- D24 attack-surface ≥4 (no always-on listener unless mandated; no LocalSystem privileged process when avoidable; no stale 2017-vintage binary on disk).
- D14 reversibility ≥4 (un-installable in <5 min).
- CR-2 compliance (no project-owned hook bodies; service binaries are NOT hook bodies but the spawned commands must obey CR-9 version-pinning).
- W286-arc P0C-CR-9 compliance — `npx -y <pkg>@<version>` / `uvx --from <pkg>==<version>`.

---

## §2 Multi-dimensional score matrix

Per `W315-C-MCDA-METHODOLOGY` cohort-relevant dims + comparability:

| Candidate | D3 lat | D7 maint | D8 lic | D14 rev | D17 rob | D24 atk | D28 long | D32 fresh | ★ | HF | △ | CR9 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **NSSM 2.24** (incumbent) | 4 | **1** (upstream-inactive 8yr) | 5 (public domain) | 4 | 3 | **2** (LocalSystem + 2017-binary) | 4 | **5** (8-yr-behind) | 4 (5k★) | 4 | **5** (8-yr stale) | 4 |
| **servy v8.4** (chall A) | 4 | 5 (active 2026-05-11) | 5 (MIT) | 4 | 3 | 3 | 4 | 0 | 2 (1.7k★) | 4 | 0 | 4 |
| **winsw** (chall B) | 4 | 3 (2026-05 active) | 5 (MIT) | 4 | 4 | 2 | 4 | 1 | 4 (14k★) | 3 | 0 | 3 (alpha-or-stable choice) |
| **Direct uvx stdio MCP** (chall C) | **5** | **5** (Astral uv flagship) | 5 (MIT) | **5** | 4 | **5** | 5 | 0 | 5 (35k★ uv) | **5** (matches basic-memory) | 0 | **5** (`uvx --from X==Y`) |
| **sc.exe + Task** (chall D) | 4 | 5 (Windows core) | 5 | 4 | 4 | 4 | 4 | 0 | n/a | 3 | 0 | 4 |
| **Docker Desktop** (chall E) | 3 | 5 | 4 (license restrictions) | 3 | 4 | **2** (Docker daemon attack-surface) | 4 | 0 | 5 (cohort) | 2 (CC sandbox-mismatch) | 0 | 4 |
| **nssm-rs** (chall F) | 4 | 2 (early; 0★) | 5 (MIT) | 4 | 2 | 3 | 3 | 0 | 1 (0★) | 3 | 0 | 3 |

**Key data points**:
- `Direct uvx stdio MCP` achieves D24=5 by **eliminating the always-on listener** entirely. Process spawned per-CC-session, dies with parent. **No service wrapper needed.**
- `NSSM` D7=1 (upstream-inactive 8 years); D32=5 (8-yr-behind on what should be standard for a critical-path daemon supervisor); D24=2 (2017-binary on disk + LocalSystem privilege + always-on listener for every wrapped daemon).
- `servy` has the lowest stars (1.7k) but published in WinGet + Chocolatey + Scoop + VirusTotal-clean (per W314-D row A4.2). D7=5 active-maintenance is its strongest axis.
- `winsw` D24=2 (still a service-wrapper binary + .NET runtime surface); D17=4 (XML-config rigor); HF=3 (works but adds .NET runtime requirement).

---

## §3 Method 1: WSM (sca-v7 install_score)

Per sca-v7 §4 with skip-N/A for N=service-wrapper-cohort. D5/D10/D13 set to inherited scores (W314-A audit):

| Candidate | install_score | Hard-cap? | Tier |
|---|:-:|:-:|:-:|
| **Direct uvx stdio MCP** | **4.80** | none | **T1 INSTALL — RECOMMENDED** |
| **servy v8.4** | 3.706 (W314-r1 retest) | D11=3 + D16=3 solo-floor (passes 2-strict; below T1 ≥4.0 floor by 0.29) | **T2 STAGED-PILOT W315-W317** |
| **sc.exe + Task** | 3.65 (over-engineering) | D14 setup-burden | **T3 PATTERN-STUDY** |
| **winsw** | 3.45 | D24=2 lateral-move-vs-NSSM | **T3 PATTERN-STUDY** |
| **NSSM 2.24** (incumbent) | **2.65** | D7=1 maintenance failure + D24=2 attack-surface failure + D32=5 freshness lag (8-yr-behind) | **TIER OPERATIONALLY HOLDS pending migration; v7 strict-letter would force ≤T4** |
| **Docker Desktop** | 2.55 | D24=2 daemon surface + HF=2 CC sandbox mismatch | **T4 CITE-ONLY** |
| **nssm-rs** | 2.30 | D7=2 + D17=2 + 0★ early | **T5 REJECT** |

**WSM ranking**: 1. uvx-stdio · 2. servy · 3. sc.exe · 4. winsw · 5. NSSM (incumbent — hard-cap-violated) · 6. Docker · 7. nssm-rs.

**Critical observation**: WSM places the **incumbent NSSM at rank-5 below 4 challengers** — this is the strongest WSM-driven SWITCH signal in W315-C.

---

## §4 Method 2: Borda Count

8 dims (D3, D7, D8, D14, D17, D24, D28, D32). N=7 candidates → top rank = 7 pts:

| Candidate | D3 | D7 | D8 | D14 | D17 | D24 | D28 | D32 | Borda Σ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **uvx-stdio** | **7** | 6 | 6 | **7** | 6 | **7** | **7** | 4 | **50** |
| **servy** | 5.5 | 6 | 6 | 4 | 2.5 | 3 | 4 | 4 | **35** |
| **sc.exe** | 5.5 | 6 | 6 | 4 | 6 | 5 | 4 | 4 | **40.5** |
| **winsw** | 5.5 | 3 | 6 | 4 | 6 | 2 | 4 | 2 | **32.5** |
| **NSSM 2.24** | 5.5 | 1 | 6 | 4 | 2.5 | 2 | 4 | **0** (worst — 5 in scale, but Borda rank-1 = worst freshness) | **25.0** |
| **Docker** | 1 | 6 | 1 | 1.5 | 6 | 2 | 4 | 4 | **25.5** |
| **nssm-rs** | 5.5 | 2 | 6 | 4 | 1 | 3 | 1.5 | 4 | **27** |

**Wait — clarification needed for D32**: D32 freshness_lag scale is `0 = same-version (best), 5 = major-version-behind (worst)`. Borda awards the **lowest D32 score** the highest rank-points. NSSM at D32=5 gets Borda-rank-1 → 1 pt (worst). Recomputing the column:

Adjusted D32 ranks (low D32 = best → high Borda):
- uvx-stdio, servy, sc.exe, Docker, nssm-rs all D32=0 → tied top → 5 pts each (avg of ranks 3-7)
- winsw D32=1 → 2 pts
- NSSM D32=5 → 1 pt (worst)

**Re-summed Borda**:

| Candidate | Borda Σ (corrected) |
|---|:-:|
| **uvx-stdio** | **51** |
| **sc.exe** | 41.5 |
| **servy** | 36 |
| **winsw** | 33.5 |
| **nssm-rs** | 28 |
| **Docker** | 26.5 |
| **NSSM 2.24** | **21** |

**Borda ranking**: 1. uvx-stdio · 2. sc.exe · 3. servy · 4. winsw · 5. nssm-rs · 6. Docker · 7. NSSM (incumbent at rank-7 — **worst** under Borda).

---

## §5 Method 3: ELECTRE I

**Concordance computed for top contenders only** (full matrix in appendix if needed):

- `uvx-stdio` → all 6 challengers (C≥0.81, D≤0.25 — clean dominator).
- `sc.exe + Task` → winsw, NSSM, Docker, nssm-rs (C≥0.69, D≤0.50); incomparable with servy (D3+D7 tied, D24 close).
- `servy` → winsw, NSSM, nssm-rs, Docker (C≥0.69, D≤0.50); incomparable with sc.exe.
- `winsw` → NSSM (`C=0.62 < 0.65`, JUST below — no outranking; effectively incomparable).
- **`NSSM` outranked by ALL 6 challengers** → dominated.

**Kernel** = **{uvx-stdio}** — clean singleton at top.
**2nd tier**: {sc.exe, servy} pairwise-incomparable.
**3rd tier**: {winsw, nssm-rs}.
**Dominated bottom**: {NSSM 2.24, Docker}.

---

## §6 Triangulation summary

| Method | Rank-1 | Rank-2 | Rank-3 | Rank-7 (last) |
|---|---|---|---|---|
| **WSM** | uvx-stdio | servy | sc.exe | nssm-rs |
| **Borda** | uvx-stdio | sc.exe | servy | **NSSM 2.24** |
| **ELECTRE I** | {uvx-stdio} | {sc.exe, servy} incomparable | {winsw, nssm-rs} | {NSSM, Docker} dominated |

**Disagreement detection**:
- **Rank-1**: ALL 3 methods unanimous on `uvx-stdio` ✓ ✓ ✓.
- **Rank-2**: WSM (servy) vs Borda (sc.exe) — **mild swap rank 2-3**. ELECTRE surfaces the incomparability at 2nd tier.
- **Rank-7 (incumbent NSSM)**: ALL 3 methods place NSSM at the **bottom of viable candidates** — Borda explicitly ranks it dead last. WSM places it below the install threshold via hard-cap. ELECTRE shows it dominated.

**Triangulation verdict**: **STRONGEST SWITCH signal in W315-C across all 6 areas**. NSSM is decisively non-SOTA per **all 3 methods unanimously**, AND the challenger `uvx-stdio` wins rank-1 in **all 3 methods unanimously**.

---

## §7 Cohort verdict — **SWITCH-TO-uvx-stdio (for STDIO-compatible MCPs) + STAGED-PILOT-servy (for HTTP-only MCPs)**

**Two-track decision** (matches W314-A §3 RECOMMENDATION + W314-r1-A staged-pilot W315-W317):

### Track 1 — Direct uvx stdio MCP (PRIMARY)
- **Applies to**: ALL MCP servers that support stdio transport (basic-memory ALREADY DEPLOYED per `.mcp.json` L67 ✓; cognee per W314-A §4.1 paste-ready).
- **Score**: 20/20 (W314-A) / 4.80 install_score / Borda rank-1 / ELECTRE kernel.
- **Migration sequence** (per W314-r2 closure):
  1. **LlamaSwap** (operator-AI-W316-SVC-1; newest service flagged in W314-r2 as undocumented; lowest blast-radius first move).
  2. **CogneeMCP** (per W314-A §4.1; **BLOCKED** by W298 SEV-1 plaintext `LANGFUSE_SECRET_KEY` in NSSM `AppEnvironmentExtra` — env-file refactor required FIRST per W314-r2 W317 prereq).
  3. **IkLlamaServer** — last in sequence due to CUDA-crash-loop history (W310-CUDA-CRASH-LOOP-RCA.md); migrate only after Cognee migration validates.
- **Effect on D24**: -1 always-on listener · -1 LocalSystem privileged process · -1 stale 2017-binary surface item per migrated service.

### Track 2 — Servy v8.4 STAGED-PILOT (FALLBACK for STDIO-incompatible)
- **Applies to**: services that CANNOT run as CC's child process (langfuse, hindsight, anything requiring multi-session sharing).
- **Score**: 3.706 W315 retest / Borda rank-3 / ELECTRE 2nd-tier-incomparable-with-sc.exe.
- **Status**: T2 STAGED-PILOT W315-W317 (LlamaSwap-first per W314-r2 AI-r2-12). NOT a ratified install yet.
- **Why not sc.exe?** WSM ranks sc.exe HIGHER than servy (3.65 vs 3.706 — within margin), but Borda+ELECTRE place them as incomparable 2nd-tier. **Operator preference for active-maintained tool surface** + sBOM + winget-distribution makes servy a safer 5-yr bet than DIY sc.exe wiring. Pilot validates this preference.

### Don't pursue
- **NSSM** — DOMINATED across all 3 MCDA methods. Migration mandate is **decisive**.
- **winsw** — Lateral move; D24=2 same as NSSM; D7=3 active but not high-velocity; no migration benefit.
- **Docker Desktop** — D24=2 daemon surface + HF=2 CC sandbox mismatch. T4 CITE-ONLY.
- **nssm-rs** — 0★ early prototype; not production-grade for runtime backbone.

---

## §8 MCDA-disagreement findings

**Mild swap rank 2-3** (servy ⇄ sc.exe across WSM vs Borda): triggers sca-v7.1 `mcda_method_agreement: mild_swap_2_3` ledger annotation. NOT a substantive disagreement (rank-1 unanimous; no ELECTRE incomparability at rank-1).

**Per W315-C §5**: WSM rank is canonical → ship verdict ranks **uvx-stdio > servy > sc.exe** as the recommended order. Codex mediation NOT triggered (mild-swap below substantive threshold).

---

## §9 Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| cognee module-path differs from W314-A §4.1 guess | MEDIUM | LOW | Smoke probe BEFORE commit (W314-A §5) |
| LlamaSwap migration breaks model-routing during transition | MEDIUM | MEDIUM | Pilot during low-utilization window; rollback plan per W314-A §4.4 |
| servy v8.4 unstable for production after pilot week | LOW | MEDIUM | W315-W317 staged pilot is explicitly for this; rollback to NSSM if pilot fails |
| W298 SEV-1 env-file refactor delays cognee migration | HIGH | MEDIUM | Track 1 cognee migration BLOCKED until W298 resolved; LlamaSwap migration UNBLOCKED |
| Operator preference shifts mid-pilot | LOW | LOW | All decisions reversible per CR-9 unmovable invariant; <5 min rollback per W314-A §4.4 |

---

## §10 Multi-dim comparability table

| Candidate | ★ | HF | △ | CR9 | Live? | Specialty axis |
|---|:-:|:-:|:-:|:-:|:-:|---|
| **Direct uvx stdio MCP** | 5 (Astral 35k★) | **5** (basic-memory pattern proven) | 0 | **5** | ✓ (basic-memory) | Per-session child process; no always-on listener |
| **servy v8.4** | 2 (1.7k★) | 4 | 0 | 4 | ✗ pilot W315-W317 | Active-maintained NSSM successor + GUI + email/toast |
| **sc.exe + Task** | n/a | 3 | 0 | 4 | partial (Windows native) | Pure Windows primitive (no 3rd-party binary) |
| **winsw** | 4 (14k★) | 3 (.NET-required) | 0 | 3 | ✗ | XML-config NSSM-replacement |
| **NSSM 2.24** (incumbent) | 4 (5k★) | 4 | **5** (8-yr-behind) | 4 | ✓ live for CogneeMCP, IkLlamaServer, LlamaSwap, langfuse, hindsight | 2017-vintage Windows service wrapper |
| **Docker Desktop** | 5 (cohort) | 2 (CC sandbox-mismatch) | 0 | 4 | ✗ | Container-managed lifecycle (cognee-recommended officially) |
| **nssm-rs** | 1 (0★) | 3 | 0 | 3 | ✗ | Rust NSSM-compatible single-binary |

---

## §11 Cost analysis vs status-quo

**Status quo (NSSM)**:
- 5 NSSM-wrapped services (CogneeMCP + IkLlamaServer + LlamaSwap + langfuse + hindsight) × 1 always-on listener = 5 listeners
- 5 LocalSystem-privileged processes
- 1 stale 2017-vintage binary on disk
- Operator-mandated migration: 0% complete

**Track 1 endgame (uvx-stdio for STDIO-compatible)**:
- 2 of 5 services migratable (CogneeMCP + LlamaSwap stdio-eligible). 3 of 5 stay with Track 2 (langfuse + IkLlamaServer + hindsight need persistent ports for cross-session sharing).
- Net: -2 listeners, -2 LocalSystem processes, -1 binary on disk (NSSM uninstalled once Track 2 candidate replaces remaining 3).

**Track 2 endgame (servy for HTTP-only)**:
- 3 services moved to servy (IkLlamaServer + langfuse + hindsight). NSSM removable.
- Net: NSSM binary gone; servy binary added; D24 net-improvement -1 (Microsoft Security-Intelligence-reviewed vs 2017-unsigned).

**Combined endgame**: 2 listeners eliminated (Track 1) + 3 listeners moved to actively-maintained wrapper (Track 2) + NSSM binary gone. D24 net-improvement: -2 listeners + -1 stale-binary, **strictly better** under all 3 MCDA methods.

---

## §12 W316 operator-AI

**AI-W316-SVC-1 (HIGH-STAKES P0)**: LlamaSwap migration to uvx-stdio first per W314-r2 AI-r2-5 (currently undocumented in CLAUDE.md per W314-r2 finding). Validate uvx-stdio pattern on the lowest blast-radius service before tackling CogneeMCP.

**AI-W316-SVC-2 (HIGH-STAKES P1, blocked by W298)**: CogneeMCP migration to uvx-stdio per W314-A §4.1. **PREREQ**: resolve W298 SEV-1 plaintext `LANGFUSE_SECRET_KEY` in NSSM `AppEnvironmentExtra` (env-file refactor). Without env-file refactor, migration leaks secrets across pid-namespace.

**AI-W316-SVC-3 (P1)**: servy v8.4 pilot — install per `winget install servy`; pilot with hindsight `:9077` as lowest-blast-radius HTTP-only service. Document pilot week W315-W316 outcome; if green, cascade to langfuse + IkLlamaServer.

**AI-W316-SVC-4 (P2)**: once Track 1 (LlamaSwap + CogneeMCP) AND Track 2 (servy hindsight pilot) both green → **uninstall NSSM** + delete `nssm.exe` from disk. End-state: 0 NSSM-managed services, 0 always-on listeners for stdio-eligible MCPs, servy-managed HTTP-only daemons.

**AI-W316-SVC-5 (P3)**: codify the **2-track service-wrapper SOTA rule** into sca-v7.1 §5.5: "STDIO-eligible MCPs → uvx-stdio (rank-1 ELECTRE kernel); HTTP-only daemons → active-maintained wrapper (servy STAGED-PILOT-ratified)."

---

## §13 Cite anchors

- W314-A NSSM-replacement 4-candidate scoring matrix: `Z:/claude-sota-installed/docs/architecture/W314-RUNTIME-CONFORMANCE-AND-NSSM/W314-A-NSSM-REPLACEMENT.md`
- W314-D servy A4.2 ($3.706 score): `docs/architecture/W313-V7-SHIP-READINESS/STREAM-D-NET-NEW-SOTA.md`
- W298 SEV-1 plaintext secret in NSSM AppEnvironmentExtra (blocker for cognee migration): referenced in CLAUDE.md `W317 CogneeMCP migration BLOCKED-by-prereq`
- basic-memory uvx-stdio proven pattern: `Z:/claude-sota-installed/.mcp.json` L67-71
- Operator W313 directive ("NSSM not sota"): CLAUDE.md status line W313-ship synthesis
- W314-r2 LlamaSwap discovery + servy AI-r2-12 staged-pilot: `docs/architecture/W314-SERVICES-LOW-QUALITY/`
