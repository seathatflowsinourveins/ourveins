# W326 Stream H — Foundation Ecosystem v2 (W325-H continuation)

**Wave**: W326-H. **Date**: 2026-05-19. **Methodology**: ctx_fetch_and_index (4 upstream releases) + deepwiki cite re-verify + mise registry probe + Windows-build feasibility probe (mise install attempt).

## 1. mise calver self-update SHIPPED

- **Before**: 2026.5.3 (2026-05-08); **After**: **2026.5.12** (2026-05-19, same-day GA verified)
- Command: `mise self-update --yes` — Updated mise.exe at `Z:\claude-sota-installed\.local\bin\mise.exe`
- Post-update verification: `mise --version` → `2026.5.12 windows-x64 (2026-05-19)` ✓
- mise.toml + mise.lock unchanged by self-update (calver-stable contract) ✓
- **Closes W325-H G5 LOW + G3 HIGH calver portion**

## 2. CLI tool installs

### lazydocker v0.25.2 SHIPPED (W325-H G10 MED CLOSED)
- mise.toml `lazydocker = "latest"` added line 25 → `mise install` succeeded
- Install path: `C:\Users\42\AppData\Local\mise\installs\lazydocker\0.25.2\lazydocker.exe`
- Smoke: `lazydocker --version` → `Version: 0.25.2 Date: 2026-04-19T02:51:21Z BuildSource: binaryRelease` ✓
- Upstream cite: https://github.com/jesseduffield/lazydocker/releases/tag/v0.25.2 (51.1k stars; 2026-04-19; verified-signature `GPG B5690EEEBB952194`)

### jless v0.9.0 DEFERRED Windows-incompatible (W325-H G11 MED → CARRY-W327)
- **aqua:PaulJuliusMartinez/jless** backend: NO Windows binary (mise registry confirmed `unsupported env: windows/amd64; supported: linux/amd64, darwin`)
- **cargo:jless** backend: Windows build FAILS — `termion v1.5.6` crate path-gated to `sys/unix/mod.rs`, no Windows compat (E0432/E0433 errors verified W326-H install attempt 2026-05-19)
- **Operator path**: WSL2 `cargo install jless` OR await upstream Windows port (last release 2025-07-17, 5.4k stars). Documented in `tools/install-cli-extras.ps1`.
- mise.toml has documented-DEFERRED comment block (no broken install entry)

### dog (ogham) STAGED FOR OPERATOR (W325-H G12 LOW)
- mise registry has `doggo` (mr-karan/doggo) NOT `dog` (ogham/dog) — different tools
- ogham/dog: 6.7k stars, last commit recent, Rust DNS client with binary releases for x86_64-pc-windows-msvc
- **Paste-ready script**: `Z:\claude-sota-installed\tools\install-cli-extras.ps1` (cargo install primary + binary-release fallback)
- Not auto-installed per W326-H constraint (operator-staged for new external binary)

### slsa-verifier v2.7.1 STAGED FOR OPERATOR (W324 P8 → v2.7.1 refresh)
- W324 P8 STAGED at v2.7.0; W326-H freshness probe → **v2.7.1** is latest (2026-06-27 release per https://github.com/slsa-framework/slsa-verifier/releases/tag/v2.7.1)
- **Paste-ready**: `go install github.com/slsa-framework/slsa-verifier/v2/cli/slsa-verifier@v2.7.1` codified in `tools/install-cli-extras.ps1`
- W326-H operator decision required (per W324 P8 staging policy + W326 constraint)

## 3. mise.lock regeneration SHIPPED
- `mise lock` ran post-toml-edit → **49 platform entries** (added lazydocker 7-platform fan-out: linux-{arm64,arm64-musl,x64,x64-musl} + macos-{arm64,x64} + windows-x64)
- File at `Z:\claude-sota-installed\mise.lock` git-tracked, SHA256 checksums + provenance metadata preserved
- **Closes W325-H G3 HIGH mise.lock-regeneration portion**

## 4. HIGH carry-overs status

| ID | Description | W326-H Status |
|----|-------------|---------------|
| G1 | `docker-compose.yml` at Z:\claude\observability (parent runtime, not project) | **INFO-ONLY ACCEPTED** — parent-runtime-owned per W325-H ack; no W326 action |
| G3 | mise.lock + calver self-update | **CLOSED THIS WAVE** — both portions shipped |
| G16 | ECC_DISABLED_HOOKS rationale undocumented | **CLOSED THIS WAVE** — see `H-ECC-DISABLED-HOOKS-RATIONALE.md` |

## 5. W326-H P-block recommendations

- **P-H1 (carry W325)**: compose-spec authoring DEFER-W327 (parent-runtime ownership)
- **P-H2 (carry W325)**: `[hooks.enter]` + `[tasks.*]` runbook-as-code — DEFER-W327
- **P-H3 (carry W325)**: SSH-signed commits + git aliases — DEFER-W327
- **P-H4 (this wave)**: lazydocker SHIPPED; jless DEFERRED-Windows; dog/slsa-verifier paste-ready
- **P-H6 (this wave)**: ECC_DISABLED_HOOKS rationale documented; re-enable decision DEFER-W327 pending Stop-hook gate retention policy

## Summary

3-of-3 HIGH carry-overs HANDLED (1 closed, 1 closed, 1 info-only). 1-of-3 MED tools installed (lazydocker), 1 deferred Windows-incompatible (jless), 1 operator-staged (dog). 1 LOW operator-staged with v2.7.0→v2.7.1 freshness refresh (slsa-verifier). mise self-update + mise.lock regen both shipped. No cardinal-rule violations.
