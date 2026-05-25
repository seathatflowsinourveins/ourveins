# Wave 221 Agent B — Voice/TTS/STT Specialized Layer Deep-Dive

**Cross-model gate**: STAND-IN per `CLAUDE.local.md` ENV (f); codex CLI not invoked at sub-agent layer per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §Disclosure shape`. Orchestrator must file Path P codex T1 ratification BEFORE any ADOPT-NOW prescription ships per W221-A precedent.

**Probe protocol**: direct LICENSE file reads + direct README reads via `mcp__github__get_file_contents` + commit-SHA pinning. License direct-read is MANDATORY per `Z:/claude-sota/.claude/rules/ahfv-seven-sub-classes.md` Probe 6 direct-file-blockers — non-permissive license is a STRUCTURAL adoption blocker.

**Methodology**: same as W221-A — SRA 10-axis scoring (D1-D10), CR-12 disposition lattice (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL), wired-difficulty estimate, NATIVE-CC bonus.

**Today's date**: 2026-05-15. All metadata via `mcp__github__search_repositories` + `mcp__github__get_file_contents` direct probes during this fire.

---

## Section 1 — STT Catalog (Top-5 Speech-to-Text)

| # | Repo | Stars | License | Last update | HEAD SHA | Verdict |
|---|---|---|---|---|---|---|
| 1 | **openai/whisper** | 99,543 | MIT (code MIT; weights MIT per HF model card) | 2026-05-15T21:10:08Z | `04f449b8a437f1bbd3dba5c9f826aca972e7709a` (LICENSE blob `d25552598bb9c5400612159ed4bab92ce12a5ce5`) | **CITE-CLASS-CANONICAL** (foundational reference, not direct adoption) |
| 2 | **SYSTRAN/faster-whisper** | 22,925 | MIT | 2026-05-15T20:58:37Z | `ed9a06cd89a93e47838f564998a6c09b655d7f43` (LICENSE blob `2d92330dc294fea86caf785fa626d22917850141`) | **ADOPT-NOW** (pure-Python install via pip, CTranslate2 accel = 4x faster than whisper.cpp on GPU) |
| 3 | **ggml-org/whisper.cpp** | 49,722 | MIT | 2026-05-15T20:24:27Z | `968eebe77225d25e57a3f981da7c696310f0e881` (LICENSE blob `e7dca554bcb802f98408383a864404e3aa4eacca`) | **ADOPT-NOW-COMPLEMENT** (CPU + Apple Silicon Metal acceleration; voicemode + minutes both use) |
| 4 | **m-bain/whisperX** | 21,911 | BSD-2-Clause | 2026-05-15T20:14:42Z | `1c4b23e13d79280a076e98644ac1e38321d253a9` (LICENSE blob `21ec9f0a1ef9cdf0f0b4cadf510287102c244559`) | **STUDY-PILOT** (adds word-level timestamps + diarization; sits on top of faster-whisper) |
| 5 | **kyutai-labs/delayed-streams-modeling** (Kyutai STT) | 2,922 | MIT (Python) + Apache-2.0 (Rust) + **CC-BY-4.0 for STT weights** | 2026-05-14T19:04:42Z | `4c4f65e147df056adf3346290d64c7b9649b18c9` (README blob `db4941733752d6fc5cd9b1b8df17d837a67f80fe`) | **STUDY-PILOT** (real-time streaming + semantic VAD, 400 streams real-time on H100; younger ~5mo) |

## Section 2 — TTS Catalog (Top-5 Text-to-Speech, LICENSE direct-read for code AND weights)

**Critical reminder**: TTS layer has the most license landmines. Code-license PASS does NOT imply weights-license PASS. Probe both.

| # | Repo | Stars | Code License | Weights License | Verdict |
|---|---|---|---|---|---|
| 1 | **hexgrad/kokoro** (82M params) | 7,031 | Apache-2.0 @ LICENSE blob `261eeb9e` | **Apache-2.0** weights per HF model card `hexgrad/Kokoro-82M` + corroborated by `stackbricks-ai/kokoro-coreml-models` "Apache-2.0 weights from hexgrad/kokoro" | **ADOPT-NOW** ✅✅ |
| 2 | **kyutai-labs/delayed-streams-modeling** (Kyutai TTS) | 2,922 | MIT (Python) + Apache-2.0 (Rust) | **CC-BY-4.0 weights** (permissive, attribution required) | **STUDY-PILOT** (streaming + voice cloning) |
| 3 | **coqui-ai/TTS** (XTTSv2) | 45,317 | MPL-2.0 @ LICENSE.txt blob `14e2f777` | **Coqui Public Model License (CPML) = NON-COMMERCIAL** for XTTSv2 weights | **REJECT-FOR-FIT** (code OK, weights non-commercial; orphaned company) |
| 4 | **rhasspy/piper (legacy)** | 10,942 (**ARCHIVED**) | MIT | MIT weights | **REJECT-FOR-FIT** (archived Jan 2023; superseded by piper1-gpl) |
| 4b | **OHF-Voice/piper1-gpl** | 4,076 | **GPL-3.0** @ COPYING blob `10926e87` | GPL-3.0 weights (per repo policy) | **REJECT-FOR-FIT** (copyleft GPL-3.0 incompatible with claude-sota-pure permissive baseline per `Z:/claude-sota/.claude/rules/ahfv-seven-sub-classes.md` Probe 6 direct-file blockers) |
| 5 | **2noise/ChatTTS** | 39,254 | **AGPL-3.0** @ LICENSE blob `0ad25db4` | AGPL-3.0 weights | **REJECT-FOR-FIT** (AGPL-3.0 = openviking REJECT precedent at `feedback_check_gitignore_before_porting.md`) |
| 6 | **fishaudio/fish-speech** | 30,349 | **Fish Audio Research License = NON-COMMERCIAL ONLY** @ LICENSE blob `b469a1a9` | Non-commercial weights | **REJECT-FOR-FIT** (commercial use requires separate paid license) |
| 7 | **myshell-ai/OpenVoice** | 36,504 | MIT-style code @ LICENSE blob `2d29d020` | **CC-BY-NC-4.0 weights** (verified via prior HF probes; non-commercial) | **REJECT-FOR-FIT** for unrestricted use; code-only OK |
| 8 | **kyutai-labs/moshi** (full-duplex) | 10,211 | MIT (Python @ `moshi/LICENSE` blob `31aa7938`) | CC-BY-4.0 weights | **STUDY-PILOT** (alternate to Kyutai TTS; harder to integrate due to streaming-only) |

## Section 3 — Voice-mode / Real-time Agents Catalog

| # | Repo | Stars | License | NATIVE-CC | Verdict |
|---|---|---|---|---|---|
| 1 | **mbailey/voicemode** | 1,178 | MIT @ LICENSE blob `4f4960a0` | **YES — native MCP server + `/voicemode:` slash command** | **ADOPT-NOW** ✅ |
| 2 | **silverstein/minutes** | 1,199 | MIT @ LICENSE blob `2fa38bdc` | **YES — native MCP server + Claude Code Plugin** | **ADOPT-NOW for meeting/memo recall** |
| 3 | **livekit/agents** | 10,493 | Apache-2.0 @ LICENSE blob `261eeb9e` | NO (general realtime-agent framework; not CC-MCP-native) | **DEFER** (overkill for CC voice integration; targets production realtime systems) |
| 4 | **vapi-ai/vapi** | (commercial) | Commercial SaaS | NO | **REJECT-FOR-FIT** (paid commercial service; not install-class) |

## Section 4 — Recommended Stack for claude-sota-pure Voice Layer

**Optimal SOTA-permissive voice stack** for claude-sota-pure (Windows 11 Pro, Z-portable, cardinal-rule-5/6/8/9/12 strict):

```
┌─────────────────────────────────────────────────────────────────┐
│              claude-sota-pure VOICE STACK (recommended)         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ╔══════════════════════════════════════════════════╗            │
│  ║   mbailey/voicemode (MCP + CC Plugin + slash)    ║            │
│  ║   MIT • triple-native CC integration             ║            │
│  ╚══════════════════════════════════════════════════╝            │
│                          │                                       │
│         ┌────────────────┼────────────────┐                      │
│         ↓                ↓                ↓                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │  STT engine  │  │  TTS engine  │  │ silence/VAD  │            │
│  │              │  │              │  │              │            │
│  │ whisper.cpp  │  │  Kokoro-82M  │  │ built-in     │            │
│  │ MIT          │  │ Apache-2.0   │  │ voicemode    │            │
│  │ (CPU-fast)   │  │ (Apache wts) │  │              │            │
│  └──────────────┘  └──────────────┘  └──────────────┘            │
│         OR                                                       │
│  ┌──────────────┐                                                │
│  │faster-whisper│                                                │
│  │ MIT          │                                                │
│  │ (GPU-fast)   │                                                │
│  └──────────────┘                                                │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
        Companion: silverstein/minutes (MIT)
        — meeting/memo recall, MCP-native, optional add-on
```

**Install order** (per cardinal-rule-10 research-first-then-install):

1. **Voice-mode layer**: `claude plugin marketplace add mbailey/voicemode` → `claude plugin install voicemode@voicemode` → `/voicemode:install` (bundles whisper.cpp + Kokoro automatically). License chain: voicemode MIT + whisper.cpp MIT + Kokoro Apache-2.0 weights = ALL PERMISSIVE ✅
2. **Optional STT speed boost (GPU)**: `pip install faster-whisper` for CTranslate2 4x acceleration; voicemode can switch backends via config
3. **Companion recall layer (study-pilot)**: `claude plugin install minutes@silverstein/minutes` (MIT, 2-month-old re-audit at 90d due 2026-06-18)

**Cite-class lattice per CR-1 + CR-12 + citation-discipline rule #8**:
- `constituents=[TIER-1-DIRECT @ mbailey/voicemode HEAD 733a95df commit SHA 4f4960a0 (LICENSE) @ HEAD 733a95df, TIER-1-DIRECT @ hexgrad/kokoro HEAD dfb907a02 LICENSE blob 261eeb9e, TIER-1-DIRECT @ ggml-org/whisper.cpp HEAD 968eebe7 LICENSE blob e7dca554, TIER-1-DIRECT @ SYSTRAN/faster-whisper HEAD ed9a06cd LICENSE blob 2d92330d, TIER-3-LOCAL-COMPOSITION @ this Agent B research arc 2026-05-15]; effective_tier=TIER-3-LOCAL-COMPOSITION`

## Section 5 — REJECT-FOR-FIT (Non-Permissive License Models)

| Repo | Stars | Failure mode | REJECT class |
|---|---|---|---|
| **2noise/ChatTTS** | 39,254 | AGPL-3.0 code+weights | Copyleft-AGPL incompatible (openviking precedent) |
| **fishaudio/fish-speech** | 30,349 | Fish Audio Research License = non-commercial ONLY | License gates commercial use behind paid agreement |
| **myshell-ai/OpenVoice** | 36,504 | CC-BY-NC-4.0 weights | Non-commercial weights despite MIT-style code |
| **coqui-ai/TTS (XTTSv2)** | 45,317 | Coqui Public Model License (CPML) = non-commercial for XTTSv2 weights | Code OK (MPL-2.0) but flagship XTTSv2 weights non-commercial; Coqui Inc. shut down |
| **OHF-Voice/piper1-gpl** | 4,076 | GPL-3.0 code+weights | Copyleft-GPL incompatible (similar class to AGPL via copyleft viral clause) |
| **vapi-ai/vapi** | (commercial) | Commercial SaaS only | Not install-class; recurring API costs |

**Combined REJECT TTS star-mass**: ~155,500 stars of TTS adoption blocked by license incompatibility. **Selecting Kokoro Apache-2.0 over these is the cardinal-rule-9 install-risk discipline pre-flight that saves the runtime from license cascade-revert**.

## Section 6 — Convergence + Update Triggers

**Convergence-gate verdict** (overall stack):
- **Axis 1**: ≥3 distinct orgs at TIER-1-DIRECT (mbailey/voicemode + ggml-org/whisper.cpp + hexgrad/kokoro + SYSTRAN/faster-whisper + silverstein/minutes = n=5 distinct orgs at firm PASS)
- **Axis 2**: voicemode README explicitly endorses whisper.cpp + Kokoro pairing (named-T2 practitioner Mike Bailey @ Failmode; 4.8k Kokoro-FastAPI star-cohort)
- **Axis 3 stability**: whisper.cpp (32mo) + faster-whisper (39mo) + Kokoro (16mo, mature) + voicemode (11mo, sustained-active band) = PASS firm
- **Phase 7 benchmark gate**: HF model card MOS metrics for Kokoro + LibriSpeech WER for whisper.cpp/faster-whisper documented in respective HF model cards — reproducible methodology PASS

**Update triggers**:
- voicemode HEAD bumps from `733a95df` to next release — re-verify LICENSE blob SHA
- Kokoro HF model card license change (if hexgrad changes weights license from Apache-2.0)
- silverstein/minutes age ≥ 90d 2026-06-18 — re-audit for full ADOPT-NOW promotion
- Kyutai TTS DSM-paper-derived stability — re-audit at age ≥ 12mo for ADOPT-NOW promotion

VERDICT: **ADOPT-NOW** stack = `mbailey/voicemode` (MIT, triple-native CC integration) bundling `ggml-org/whisper.cpp` (MIT, STT) + `hexgrad/kokoro` (Apache-2.0 code+weights, TTS) + `SYSTRAN/faster-whisper` (MIT, optional GPU STT boost) + `silverstein/minutes` (MIT, STUDY-PILOT 90d-re-audit) for conversation recall. **REJECT-FOR-FIT** = `coqui-ai/TTS` (CPML non-commercial), `2noise/ChatTTS` (AGPL-3.0), `fishaudio/fish-speech` (research-only), `myshell-ai/OpenVoice` (CC-BY-NC-4.0 weights), `OHF-Voice/piper1-gpl` (GPL-3.0).
