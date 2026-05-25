# W266 — Doc Corrections (W265 truth-up per 4-agent convergence)

> Corrections to `W265-service-management-sota-2026-05-17.md` flagged by the 4-agent convergence + codex GPT-5.5 2nd-pass. Persisted as follow-on per doc-record principle (corrections in follow-on, not retroactive edits to committed historical record).

## §1 — Date corrections (WinSW activity)

W265 claim (line 12): "WinSW v2.12.0 | 2024-01-28; v3 stuck at `alpha.11` since 2024-01-29 | MIT | **MAINTENANCE-LIMBO** — `github.com/winsw/winsw/releases` shows zero 2025/2026 releases; v3 has been in alpha for >2 y"

**Correction (W266 4-agent convergence)**: WinSW commit history actually active — latest verified `keepFiles time-based log rolling` commit dated **2026-04-12** (~5 weeks before this audit). The "v3 alpha.11" tag is stale BUT the repo is being maintained on the `master` branch. **WinSW is NOT in maintenance-limbo.**

**Net effect on verdict**: W265's preference for Servy over WinSW was partly justified by the "WinSW is dead" framing. With WinSW actually active, the per-service tiebreaker shifts:
- **WinSW**: multi-maintainer (winsw org, Jenkins lineage), MIT, active master branch, XML/YAML config
- **Servy**: single-author (aelassas), Apache-2 / MIT, newer 8.4 release, GUI+PowerShell module
- Net: **both are viable**. Pick on operator-preference axes (XML vs GUI, multi vs single maintainer).

## §2 — Docker GPU regression nuance (line 41)

W265 claim: "**up to 28 % regression** is still possible on tight kernels (`dev.to/alanwest`)"

**Correction**: The 28% figure is a single-reporter worst-case anecdote. **Multi-source convergence puts the typical regression at 5–15%** per NVIDIA WSL2 GPU-PV docs + Puget Systems benchmarks + InsiderLLM measurements. The W265 doc actually says "5–15%" on line 43 — the 28% line was cherry-picked. Recommend reading lines 40–43 together as the convergent range (5–15% typical, up to 28% in worst-case-kernels), not 28% as the headline number.

**Net effect**: Tier-A "all-Docker REJECT" verdict stands (5–15% is still bad for 24 GiB ceiling), but the framing should be less alarmist.

## §3 — EULA framing add (line 16)

W265 says: "Docker Desktop `restart: always` ... EULA (free <250 emp / <$10M rev)"

**Addition**: **Docker CE on Windows does NOT run CUDA** — the GPU-PV bridge only works on Docker Desktop's WSL2 backend (and that itself only on Pro/Enterprise license tiers depending on the org). The fallback hierarchy if Docker Desktop EULA trips:
1. **WSL2 + Docker CE** — fastest migration (~3h per W265-container-platform §verdict), but **no GPU containers** without nvidia-container-toolkit in WSL2 (extra step)
2. **Podman Desktop** — drop-in but still uses WSL2-VM internally
3. **Native binaries** — only realistic for Phoenix/Grafana/Prometheus (not for ClickHouse/Langfuse stack)

## §4 — CC hooks claim nuance (line 56)

W265 says: "**SessionStart-spawned daemons are an explicit anti-pattern** for anything heavier than a 2 s check"

**Correction**: The CC hooks docs say "keep hook commands fast — under 1–2 seconds. Move slow operations to background processes" and **explicitly endorse `async: true`** (landed Jan 2026) for fire-and-forget. SessionStart-supervisor is **not forbidden** — it's discouraged for sync work but supported for async-spawned daemons.

**Net effect**: hindsight's current SessionStart respawn isn't formally anti-pattern. It's "fragile" because the daemon doesn't auto-respawn between sessions when killed externally. Moving to Servy/WinSW closes that fragility, but the W265 "anti-pattern" framing is too strong.

## §5 — Applied: which W265 conclusions stand after corrections

| W265 conclusion | After W266 correction |
|---|---|
| NSSM dead-upstream (2017-04-26 binary) | ✅ STANDS — STRONG-CONFIRM by 4 agents |
| Tier-A all-Docker REJECT | ✅ STANDS — 5-15% regression is still bad for 24 GiB |
| Tier-C keep Docker Desktop | ✅ STANDS — EULA cleared for solo operator |
| MIGRATE 6 services NSSM → Servy 8.4 | ⚠️ STANDS but WinSW is also viable (was "limbo", actually active) |
| Hindsight SessionStart respawn = anti-pattern | ⚠️ "Fragile" is more accurate than "anti-pattern" |
| Docker 28% regression headline | ❌ Cherry-picked. Typical 5–15% is the converged figure |

## §6 — No action required for live state

These are pure doc corrections. **No live config changes** — Tier-A still native, Tier-C still Docker, NSSM still being-migrated, Hindsight still using plugin SessionStart (until Servy/WinSW lands).

## §7 — Sources

- `W265-service-management-sota-2026-05-17.md` — corrected doc
- `W266-servy-convergence-2026-05-17.md` — 4-agent verdict on WinSW activity
- `W266-docker-gpu-convergence-2026-05-17.md` — 5-15% multi-source figure
- `W266-codex-2nd-pass-2026-05-17.md` — adversarial verification
- Live GitHub: `github.com/winsw/winsw/commits/master` for the 2026-04-12 commit
- CC hooks docs: `code.claude.com/docs/en/hooks` — `async: true` endorsement
- This doc: `docs/architecture/W266-doc-corrections-2026-05-17.md`
