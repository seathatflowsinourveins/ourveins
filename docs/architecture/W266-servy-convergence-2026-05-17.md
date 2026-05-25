# W266 — Multi-Angle Convergence Check on W265 Service-Manager Verdict (2026-05-17)

> Independent verification across 5 angles. Audit-target: W265's claim that **Servy 8.4 > NSSM > WinSW** is SOTA for Windows service-wrapping on this `Z:\claude-sota-installed` runtime. Read-only audit; no config changes.

---

## Verdict: **CONFIRM-WITH-REVISIONS** (substantive verdict holds; 2 specific claims need correction)

W265's core conclusion — migrate 6 NSSM/ad-hoc services onto Servy 8.4 — is independently supported by every angle below. Two factual errors require correction in W265's evidence chain, and one cited claim about CC hooks is overstated. None invalidate the SOTA pick.

---

## §1 — Upstream activity verification (independent fetch)

| Wrapper | Stable | Most-recent build/commit | Source |
|---|---|---|---|
| **NSSM** | 2.24 (2014-08-31) | 2.24-103-gdee49fc **2017-05-16** | `nssm.cc/builds` (WebFetch 2026-05-17) |
| **WinSW** | v2.12.0 **2023-01-28** | commit `1e2d8db0` **2026-04-12** + 8 more commits Jan–Apr 2026 | GitHub `winsw/winsw` (mcp__github__list_commits, list_releases) |
| **Servy** | v8.4 (release date in repo = 2026-05-11; v8.5 staging) | commit `0ae6c4da` **2026-05-17** (today) | GitHub `aelassas/servy` (mcp__github__list_commits) |
| **Shawl** | v1.9.0 **2026-05-03** | (same release; active) | GitHub `mtkennerly/shawl` (mcp__github__get_latest_release) |

**W265 factual errors caught here:**
1. **WinSW v2.12.0 = 2023-01-28, not 2024-01-28** (W265 line 12). W265 is **off by 1 year** — same error for v3.0.0-alpha.11 (actual 2023-01-29).
2. WinSW is **not in maintenance limbo** at the commit-history level: 9+ substantive commits Jan–Apr 2026 (`1e2d8db0` 2026-04-12 added `keepFiles` for time-based log rolling; `60d04ff6` 2026-02-07 fixed SCM elevation). Release-cadence-limbo (no v2.13 or v3.0.0-rc cut since Jan 2023) is a fair softer claim; "maintenance limbo" as the dev.to author wrote is rhetorical. **NSSM 9-year-dead and Servy 1-day-fresh remain valid.**

## §2 — Adoption signal (Reddit / HN / SO / blogs)

- **Hacker News** has a Servy 3.4 post from 2025-11-14 (`news.ycombinator.com/item?id=45924856`) — Servy versions went 3.4 → 8.4 in ~6 months, signalling rapid maturation, not abandonment.
- **Reddit / Stack Overflow** — `site:reddit.com "Servy" Windows service` and `site:stackoverflow.com Servy` both return **zero hits**. **Servy adoption beyond the author's own DEV.to post is thin**; community consensus has not yet coalesced. Compare: NSSM has 100+ Reddit threads and is the de-facto Windows wrapper in Ollama/Jenkins/CoreDNS/n8n recipes.
- **Hartiga.de 2025 Windows Server tutorial** (`hartiga.de/it-architecture/service-on-windows-server-2025/`) — **recommends Shawl**, not Servy, on simplicity grounds: "Keep it simple… Shawl is maintained, has a simple command line interface and can be installed using Winget." NSSM is "long abandoned"; WinSW is "more complex". W265 cited this article but **understated its actual recommendation** — Hartiga picks Shawl.

**Implication:** Servy is technically SOTA but **community-mindshare-thin**. Shawl is the dark horse the W265 §1 table already lists but doesn't pick. **Recommendation: re-weight Shawl as the safer simplicity-pick for the 4 single-process services** (IkLlamaServer, embedder, LlamaSwap, CogneeMCP); keep Servy for the 2 services that actually need its richer feature surface (Hindsight-API + pg0 with dependency ordering).

## §3 — Alternative tools not in W265

GitHub topic search (mcp__github__search_repositories) and web search returned **no contender W265 omitted**. Specifically:

- **supervisord-windows port**: searched — no maintained candidate. supervisord remains POSIX-only.
- **sc.exe failure actions**: built-in `sc.exe failure $svc reset=86400 actions=restart/5000/restart/5000/reboot/5000` (`learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-r2-and-2012/cc742019`) gives restart-on-crash but **still no stdout-capture, no env-injection, no health-check** — confirms W265's §1 dismissal.
- **Windows-native Service Triggers**: an event-driven start trigger, not a supervisor; orthogonal to NSSM-class needs.
- **kube-on-windows**: unrelated (orchestrates containers, not Win services).
- **AlwaysUp / FireDaemon Pro**: commercial closed-source; cardinal-rule-1 violation (no upstream-permissive license). Correctly excluded by W265.
- **Daemon Master**: surfaced in SaaSHub but inactive (last release 2019).

**Verdict §3: W265's contender field is complete.**

## §4 — Migration risk (Servy ↔ NSSM parity)

- **Restart parity gap**: NSSM has a documented increasing-backoff (up to 4 min) and reports `Paused` between retries (`nssm.cc/details`); Servy uses health-checks + immediate auto-recovery — semantics are **different but strictly richer**. Anything tuned to NSSM's backoff will need an explicit `--restart-delay` flag in Servy.
- **Path-pinning gotcha**: NSSM stores absolute wrapper path in the SCM entry; moving `nssm.exe` breaks all services (`Servy FAQ`). Servy at `C:\Program Files\Servy\` (already installed per W259-v15) avoids this — but the **rollback path documented in W265 line 91** (re-create from `nssm dump`) assumes `nssm.exe` is still at its current path. **Capture `nssm dump` output AND keep `nssm.exe` in place during the migration window** — W265 implies this, but should call it out explicitly.
- **Logging parity**: Servy size+date rotation strictly supersedes NSSM rotation; no regression risk.
- **Health-check semantics**: NSSM has none; Servy adds HTTP/TCP probes. **Net add**, no parity loss.
- **No third-party gotcha posts**: Reddit/SO searches turned up zero migration horror-stories — but also zero migration success-stories. **Servy in production migration is unproven outside the author's ecosystem.** This is the strongest argument for a phased rollout (W265's §5 ordering is correct).

## §5 — License & cardinal-rule audit

- **Servy `LICENSE.txt`** (mcp__github__get_file_contents at HEAD `0ae6c4da`): **MIT, Copyright 2026 Akram El Assas**. ✓ cardinal-rule-1.
- **No CLA, no dual-license, no ownership transfer**: every commit Oct 2025 → May 2026 authored by `aelassas` (single committer). Single-author bus-factor is the **one real risk** — but identical to NSSM (Iain Patterson) and Shawl (mtkennerly).
- **Code-signed** via SignPath Foundation — strictly better trust posture than NSSM's unsigned binaries.

## §6 — Bonus: CC hooks anti-pattern claim

W265 §3 line 56 quotes CC hooks docs as "explicit anti-pattern" with "under 1–2 seconds" hard limit. **Verified via WebFetch on `code.claude.com/docs/en/hooks` — the actual doc says "SessionStart runs on every session, so keep these hooks fast" (qualitative, no number), AND explicitly endorses `async: true` for background processes.** W265's "explicit anti-pattern" framing is **overstated**; the doc permits async background launches. The Hindsight-respawn-via-SessionStart pattern is **suboptimal but not forbidden**. The migration benefit (decoupling pg0/hindsight lifecycle from CC session) is still valid on architectural grounds.

---

## Final verdict

**CONFIRM W265's SOTA pick (Servy 8.4 for Hindsight+pg0; consider Shawl 1.9.0 for the 4 simpler services).** Migration plan, rollback path (with the explicit-`nssm.exe`-in-place addendum), and per-tier mapping are sound. **Required revisions to W265 record:**

1. Fix WinSW dates: v2.12.0 = **2023-01-28** (not 2024-01-28); v3.0.0-alpha.11 = **2023-01-29**.
2. Soften "maintenance limbo" → "no release cut since Jan-2023; commit-history active through 2026-04".
3. Soften CC-hooks "explicit anti-pattern" → "suboptimal pattern; docs recommend `async: true` for background work and 'keep SessionStart hooks fast' qualitatively".
4. Note Hartiga.de's recommendation is **Shawl**, not Servy.
5. Add Servy-adoption-mindshare-thin caveat to the §5 risk section.
