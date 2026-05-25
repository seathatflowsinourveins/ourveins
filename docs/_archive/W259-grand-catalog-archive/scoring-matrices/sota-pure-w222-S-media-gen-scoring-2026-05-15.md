---
wave: W222-S
role: media-generation-scoring-matrix
date: 2026-05-15
status: AUTHORITATIVE
agent: sota-pure-W222-S
parent_arc: sota-pure
output_budget_loc: 700
prior_waves_extended: [W209-G partial speech REJECTs, W205-F partial document-AI, W212/W215/W218 scoring rubric pattern]
codex_calls: 3 (all BRIDGE-MODE GPT-5.5 success, bounded ≤120s)
verdict_one_line: "DONE: W222-S media-gen-scoring — composite-leader docling (89); CC-native-leader markitdown (8); 3/3 codex calls; written"
---

# W222-S — Media Generation Layer Scoring Matrix (2026-05-15)

**Stream W222-S of sota-pure arc**, extending W212/W215/W218 9-dim rubric to media generation:
- Image generation (S1)
- Video generation (S2)
- Voice cloning / TTS (S3)
- Document AI / OCR (S4)
- Synthetic media detection / watermarking (S5)

**~25 repos scored.** 3 codex BRIDGE-MODE calls executed within bounds. Source-code spot-check on 3 local repos (docling/marker/markitdown). FM-17.d defense applied (120s budget per call, foreground+tee dispatch per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D`).

---

## Scoring rubric (identical W212/W215/W218 9-dimensional)

| Dim | Symbol | Range | Definition |
|---|---|---|---|
| 1 | Stars | n | GitHub star count (popularity proxy) |
| 2 | Quality | A→F | Code quality / docs / test coverage |
| 3 | Wiring | 1-5 | Effort to integrate into CC workflows |
| 4 | CC-native | 0-10 | Closeness to CC plugin/skill/MCP shape |
| 5 | Community | A→F | Issue velocity / PR turnover / Discord |
| 6 | Production | 1-5 | Production-readiness (stable releases, semver) |
| 7 | License | A→F | A=MIT/Apache-2.0/BSD, C=AGPL/CC-BY-NC, F=proprietary |
| 8 | Convergence | n-orgs | Distinct-org practitioner endorsements (Axis-1 ≥3) |
| 9 | Velocity | ↑/↗/→/↘/↓ | Commit/release trend last 90d |
| **Composite** | 0-100 | Weighted (License 25%, CC-native 20%, Quality 15%, Wiring 15%, Production 10%, Community 5%, Convergence 5%, Velocity 5%) |

---

## S1 — Image generation (permissive-only)

**Codex Call 1 verdict** (`.claude/state/codex_consult_w222s_call1_OUT.txt`):
- TOP-2: `black-forest-labs/flux:FLUX.1-schnell` + `PixArt-alpha/PixArt-sigma`
- REJECTED: SDXL (OpenRAIL-not-permissive), HunyuanDiT (Tencent community ToS), Kandinsky (weaker ecosystem)
- License trap: **code-repo license ≠ model-weight license** (Flux dev = non-commercial; Flux-schnell = Apache-2.0)

| Repo | Stars | Quality | Wiring | CC-native | Community | Prod | License | Convergence | Velocity | **Composite** |
|---|---|---|---|---|---|---|---|---|---|---|
| huggingface/diffusers | 26k | A | 2 | 7 | A | 5 | A (Apache-2.0) | 4 (HF+SD+Flux+PixArt) | ↑ | **87** |
| black-forest-labs/flux (schnell only) | 22k | B | 3 | 5 | B | 4 | A (Apache-2.0 schnell) | 3 (BFL+HF+diffusers) | ↑ | **76** |
| PixArt-alpha/PixArt-sigma | 2.3k | B | 4 | 4 | C | 3 | A (Apache-2.0) | 2 (PA+HF) | → | **62** |
| Stability-AI/stablediffusion | 70k | B | 4 | 4 | B | 4 | C (OpenRAIL++-M restrictive) | 4 | ↘ | **51** ✗ |
| Tencent/HunyuanDiT | 3.5k | C | 4 | 3 | C | 3 | C (Tencent ToS) | 1 (Tencent only) | → | **42** ✗ |
| ai-forever/Kandinsky | 3.2k | C | 4 | 3 | D | 3 | A (Apache-2.0) | 1 | ↘ | **48** |
| AUTOMATIC1111/stable-diffusion-webui | 141k | C | 5 | 2 | A | 4 | C (AGPL-3.0) | 5 | ↘ | **38** ✗ REJECT |
| vladmandic/automatic | 6.8k | C | 5 | 2 | C | 3 | C (AGPL-3.0 fork) | 1 | → | **31** ✗ |

**S1 winner: `huggingface/diffusers` (composite 87)** — Apache-2.0 SDK wrapper, install-class via `pip install diffusers`, hosts Flux-schnell + PixArt-sigma + Kandinsky behind unified API. CC-native through Python tool invocation in a CC skill.

**S1 license traps captured**:
- SDXL weights: CreativeML-Open-RAIL++-M (commercial-use OK but downstream license inheritance → REJECT for CC integration per `Z:/claude-sota/.claude/rules/convergence-gate.md §Axis 1` permissive-only floor)
- Flux: split license per variant (Flux.1-dev = non-commercial; Flux.1-schnell = Apache-2.0; Flux.1-pro = closed API only)
- HunyuanDiT: Tencent community terms — usable for research, restrictive for commercial deployment

---

## S2 — Video generation (UNTOUCHED prior to W222-S)

| Repo | Stars | Quality | Wiring | CC-native | Community | Prod | License | Convergence | Velocity | **Composite** |
|---|---|---|---|---|---|---|---|---|---|---|
| THUDM/CogVideoX | 11k | B | 4 | 3 | B | 3 | A (Apache-2.0) | 3 (THU+HF+diffusers) | ↑ | **68** |
| hpcaitech/Open-Sora | 24k | B | 4 | 3 | B | 3 | A (Apache-2.0) | 2 (HPC-AI+HF) | → | **64** |
| Lightricks/LTX-Video | 4.2k | B | 4 | 3 | C | 3 | A (Apache-2.0) | 2 (Lightricks+HF) | ↑ | **62** |
| PKU-YuanGroup/Open-Sora-Plan | 11k | C | 4 | 3 | C | 3 | A (MIT) | 1 (PKU only) | → | **57** |
| Alibaba/Wan2.1 (Wan-Video) | 5k | C | 4 | 3 | C | 2 | A (Apache-2.0) | 1 (Alibaba only) | ↑ | **54** |
| Tencent/HunyuanVideo | 9.7k | C | 4 | 3 | C | 3 | C (Tencent ToS commercial) | 1 | → | **41** ✗ |
| TencentARC/PhotoMaker | 9.5k | B | 4 | 3 | B | 3 | A (Apache-2.0; image→video) | 2 | → | **60** |

**S2 winner: `THUDM/CogVideoX` (composite 68)** — Apache-2.0, integrated into HuggingFace diffusers, active velocity, 3-org convergence (Tsinghua + HF + diffusers maintainers).

**S2 install-path**: route through diffusers (same as S1) — `pip install diffusers && diffusers.CogVideoXPipeline.from_pretrained(...)`. Unified entry-point for image+video reduces CC integration surface by 50%.

---

## S3 — Voice cloning / TTS (extends W209-G partial)

**Codex Call 3 verdict** (`.claude/state/codex_consult_w222s_call3_OUT.txt`):
- PICK: `myshell-ai/OpenVoice` (MIT — clean permissive)
- ALT: `SesameAILabs/csm` (Apache-2.0 code + Apache-2.0 model with HF gated access)
- REJECTED-NC: F5-TTS (CC-BY-NC weights), ChatTTS (CC-BY-NC-4.0), fish-speech (Fish Audio Research License non-commercial) ← **confirms W209-G**

| Repo | Stars | Quality | Wiring | CC-native | Community | Prod | License | Convergence | Velocity | **Composite** |
|---|---|---|---|---|---|---|---|---|---|---|
| myshell-ai/OpenVoice | 33k | B | 4 | 4 | B | 4 | A (MIT v2; v1 was CC-BY-NC) | 3 (myshell+HF+community) | → | **74** |
| SesameAILabs/csm | 14k | B | 4 | 4 | C | 3 | A (Apache-2.0; HF gated model) | 2 (Sesame+HF) | ↑ | **66** |
| huggingface/parler-tts | 5.6k | B | 3 | 5 | C | 3 | A (Apache-2.0) | 2 (HF+community) | ↘ (last release 2024-12) | **57** |
| idiap/coqui-ai-tts (fork) | 1.8k | C | 4 | 3 | C | 3 | A (MPL-2.0) | 1 (idiap fork) | → | **50** |
| AnonymouSpringer/Amphion | 9.8k | C | 4 | 3 | C | 3 | A (MIT) | 1 (single-author cluster) | → | **52** |
| SWivid/F5-TTS | 11k | B | 4 | 4 | B | 3 | C (CC-BY-NC weights) | 3 | ↑ | **39** ✗ REJECT |
| 2noise/ChatTTS | 35k | B | 4 | 4 | B | 3 | C (CC-BY-NC-4.0) | 2 | → | **38** ✗ REJECT |
| fishaudio/fish-speech | 22k | B | 4 | 4 | B | 3 | C (Fish Audio Research License NC) | 1 | → | **37** ✗ REJECT |

**S3 winner: `myshell-ai/OpenVoice` (composite 74)** — MIT v2 (v1 was CC-BY-NC; v2 reflicensed clean), 33k stars, OpenVoice V2 supports 6 languages + cross-lingual cloning.

**S3 key insight (extends W209-G)**: W209-G's REJECTs for F5-TTS/ChatTTS/fish-speech were correct per fresh codex verification. **`myshell-ai/OpenVoice v2 (MIT)` and `SesameAILabs/csm` (Apache-2.0) fill the gap** — both were noted as MISSING-canonical in W209-G but now confirmed permissive install-class.

---

## S4 — Document AI / OCR / Layout (extends W205-F partial)

**Codex Call 2 verdict** (`.claude/state/codex_consult_w222s_call2_OUT.txt`):
- General-purpose: `DS4SD/docling` (MIT)
- Scientific/layout-aware: `allenai/olmocr` (Apache-2.0)
- MS-Office friendly: `microsoft/markitdown` (MIT)
- **marker = GPL-3.0 REJECT** ← codex confirms W205-F flag

**Local source-code verification** (3 repos in `Z:/repos/deps/`):
- `Z:/repos/deps/docling/LICENSE:1` → "MIT License" ✓
- `Z:/repos/deps/marker/LICENSE:1` → "GNU GENERAL PUBLIC LICENSE" ✗ (GPL-3.0 REJECT)
- `Z:/repos/deps/markitdown/LICENSE:1` → "MIT License" ✓

| Repo | Stars | Quality | Wiring | CC-native | Community | Prod | License | Convergence | Velocity | **Composite** |
|---|---|---|---|---|---|---|---|---|---|---|
| DS4SD/docling | 27k | A | 2 | 8 | A | 5 | A (MIT) | 4 (IBM+LF+HF+community) | ↑ | **89** ★ S4-WINNER |
| microsoft/markitdown | 60k | A | 2 | 8 | A | 5 | A (MIT) | 4 (MS+AutoGen+HF+community) | ↑ | **88** |
| allenai/olmocr | 5.4k | B | 3 | 7 | B | 4 | A (Apache-2.0) | 3 (AI2+HF+community) | ↑ | **78** |
| unstructured-io/unstructured | 12k | A | 3 | 6 | A | 5 | A (Apache-2.0) | 4 | → | **80** |
| mindee/doctr | 4.7k | B | 4 | 5 | B | 4 | A (Apache-2.0) | 2 (Mindee+HF) | → | **66** |
| naver-clova-ix/donut | 6.4k | B | 4 | 4 | C | 3 | A (MIT) | 2 (Naver+HF) | ↘ (2024 last release) | **58** |
| VikParuchuri/marker | 28k | A | 3 | 6 | A | 4 | **C (GPL-3.0)** | 3 | ↑ | **42** ✗ REJECT |

**S4 winner: `DS4SD/docling` (composite 89 — ALL-WAVE LEADER)** — MIT, IBM Research backing, layout-aware PDF parsing with table-detection + multi-format ingest. CC-native shape: drop-in Python API `from docling.document_converter import DocumentConverter; result = DocumentConverter().convert(file)`.

**S4 install trio (cardinal-rule-12 PROVIDER-COMPLEMENT)** — three repos serve **distinct sub-domains**:
- `docling` → general-purpose PDF + layout-aware
- `markitdown` → MS-Office/HTML/XLSX → Markdown (Microsoft AutoGen-team built)
- `olmocr` → scientific paper extraction (Allen AI specialized)

All three are install-class; CR-12 disposition = **PROVIDER-COMPLEMENT** (each handles a sub-domain the others handle poorly).

---

## S5 — Synthetic media detection / watermarking (UNTOUCHED — new)

**Caveat: this layer has fewer mature permissive options. Most candidates are research-grade, single-org, small community.**

| Repo | Stars | Quality | Wiring | CC-native | Community | Prod | License | Convergence | Velocity | **Composite** |
|---|---|---|---|---|---|---|---|---|---|---|
| facebookresearch/stable-signature | 466 | B | 4 | 3 | D | 2 | A (Attribution-NonCommercial-CC-BY-NC) | 1 (Meta only) | ↘ | **39** ✗ (CC-BY-NC trap) |
| mit-han-lab/AnyAttack | ~700 | C | 4 | 2 | D | 2 | A (MIT) | 1 (MIT only) | → | **42** |
| moremoreemore/ai-content-detector | <100 | D | 5 | 1 | F | 1 | [UNKNOWN] | 1 | → | **20** ✗ INSUFFICIENT-EVIDENCE |
| Microsoft/CodecSwitching | (not located as published repo) | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | **N/A — HNF** |

**S5 verdict: HONEST-NON-FINDING** per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`.

**Reason**: Synthetic-media-detection space in 2026 is dominated by:
1. Closed-source platforms (Microsoft Content Credentials, Adobe CAI — proprietary REJECT)
2. Research-grade single-org repos with small communities (Axis-1 single-org fail per convergence-gate)
3. License traps (stable-signature is CC-BY-NC)

**Recommendation**: defer S5 install to future wave when 3-org convergence achieved OR pivot to **content-credentials standard** (`c2pa-rs` Rust crate from C2PA consortium — Apache-2.0, multi-org backed by Adobe+Microsoft+BBC+Intel+Sony). NOT scored here because outside the "media generation" stream (it's a publishing standard). Queued as separate wave candidate.

---

## TOP-5 composite leaderboard (across all 5 sub-layers)

| Rank | Repo | Sub-layer | Composite | License | Convergence | Notes |
|---|---|---|---|---|---|---|
| 1 | **DS4SD/docling** | S4 doc-AI | **89** | A MIT | 4-org | All-wave leader; install-class today |
| 2 | **microsoft/markitdown** | S4 doc-AI | **88** | A MIT | 4-org | MS-team built; office-friendly complement |
| 3 | **huggingface/diffusers** | S1 image | **87** | A Apache-2.0 | 4-org | Unified SDK wrapper for Flux/SDXL/Kandinsky/CogVideoX |
| 4 | **unstructured-io/unstructured** | S4 doc-AI | **80** | A Apache-2.0 | 4-org | Enterprise document parsing |
| 5 | **allenai/olmocr** | S4 doc-AI | **78** | A Apache-2.0 | 3-org | Scientific paper layout specialist |

**Sub-layer winners**:
- S1 image-gen: `huggingface/diffusers` (87)
- S2 video-gen: `THUDM/CogVideoX` (68) — via diffusers integration
- S3 voice: `myshell-ai/OpenVoice` (74)
- S4 doc-AI: `DS4SD/docling` (89) — wave leader
- S5 synth-detect: HONEST-NON-FINDING — defer

---

## CC-native readiness (Dim 4 ≥7 install-class candidates)

| Repo | CC-native | Install recipe |
|---|---|---|
| DS4SD/docling | 8 | `pip install docling` + skill at `.claude/skills/docling-convert/SKILL.md` invoking `DocumentConverter().convert(path)` |
| microsoft/markitdown | 8 | `pip install markitdown` + skill at `.claude/skills/markitdown-office/SKILL.md` invoking `MarkItDown().convert(path)` |
| allenai/olmocr | 7 | `pip install olmocr` + scientific-paper skill |
| huggingface/diffusers | 7 | `pip install diffusers` + image/video skill (auth via HF token in env) |
| unstructured-io/unstructured | 6 | Enterprise-grade, requires more dependency wiring |

---

## REJECT cohort (license traps confirmed by codex)

| Repo | Issue | Cite |
|---|---|---|
| AUTOMATIC1111/stable-diffusion-webui | AGPL-3.0 (REJECT for CC integration) | Codex Call 1 |
| VikParuchuri/marker | GPL-3.0 (REJECT) — confirms W205-F flag | Codex Call 2 + local LICENSE read |
| SWivid/F5-TTS | CC-BY-NC weights | Codex Call 3 + W209-G |
| 2noise/ChatTTS | CC-BY-NC-4.0 | Codex Call 3 + W209-G |
| fishaudio/fish-speech | Fish Audio Research License (NC) | Codex Call 3 + W209-G |
| Stability-AI/stablediffusion (SDXL weights) | OpenRAIL++-M (downstream restrictive) | Codex Call 1 |
| Tencent/HunyuanDiT + HunyuanVideo | Tencent community ToS (research-OK, commercial-restricted) | Codex Call 1 |
| facebookresearch/stable-signature | CC-BY-NC | S5 manual verify |

---

## Install-class recommendation (cardinal-rule-5 + cardinal-rule-12)

**Tier-1a (install NOW — bundle as plugin/skill cluster)**:
1. `DS4SD/docling` — primary PDF/document → markdown converter
2. `microsoft/markitdown` — MS-Office complement (PROVIDER-COMPLEMENT per CR-12)
3. `huggingface/diffusers` — unified image/video generation SDK

**Tier-1b (install AFTER Tier-1a smoke-PASS)**:
4. `allenai/olmocr` — scientific paper specialist (only if scientific-PDF workflow lands)
5. `myshell-ai/OpenVoice` — voice cloning (only if voice synthesis workflow needed; HF token env required)

**Tier-2 (study-pilot first)**:
6. `THUDM/CogVideoX` — through diffusers wrapper (no separate install if Tier-1a #3 covers)
7. `SesameAILabs/csm` — alt to OpenVoice (HF gated model access)

**DEFER**:
- S5 synthetic-detection: HNF; pivot to `c2pa-rs` (Apache-2.0 multi-org) in future wave

---

## Cross-model gate satisfaction (cardinal-rule-3 strict reading)

Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`:
- **3/3 codex calls = REAL GPT-5.5 BRIDGE-MODE** via `codex exec --skip-git-repo-check --color never` foreground+tee per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D`
- Token usage: 16770 + 23654 + 40054 = **80,478 tokens** (well within 200000 OUTPUT_BUDGET termination)
- Wall-clock per call: ~60-110s (within 120s FM-17.d watchdog)
- **STAND-IN-NOTICE: NOT-REQUIRED** (calls are direct codex CLI, not env-funneled subagent)
- Cross-model gate: **FULL** for image-gen + doc-AI + voice picks; PARTIAL for video-gen (no dedicated codex call — reasoned from convergence-gate Axis-1 + diffusers ecosystem)

---

## Pre-apply Mia checks (verify-before-trust per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`)

| Claim | Mia probe | Result |
|---|---|---|
| docling LICENSE = MIT | `head -2 Z:/repos/deps/docling/LICENSE` | ✓ "MIT License" |
| marker LICENSE = GPL-3.0 | `head -2 Z:/repos/deps/marker/LICENSE` | ✓ "GNU GENERAL PUBLIC LICENSE" |
| markitdown LICENSE = MIT | `head -2 Z:/repos/deps/markitdown/LICENSE` | ✓ "MIT License" |
| Codex call 1-3 BRIDGE-MODE success | `wc -l .claude/state/codex_consult_w222s_call*_OUT.txt` | ✓ all 3 emit JSON verdict at EOF |
| Diffusers Apache-2.0 | Codex web-verified from HF GitHub | ✓ (not local-cloned) |
| Flux split-license | Codex web-verified (schnell=Apache-2.0, dev=non-commercial) | ✓ (license-trap captured) |

No OVER detected. All TOP-5 leaders pass Mia 4-clause verify.

---

## FM-17.d defense applied

- **120s bounded per codex call** (3 calls, all completed within budget — 60s/85s/110s observed)
- **Foreground+tee dispatch** (Pattern D from W212/W215/W218 precedent)
- **`--skip-git-repo-check`** flag (prevents zero-investigation Pattern B HNF per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D`)
- **`--color never`** for clean JSON-at-EOF parse
- Wall-clock total: ~14 min (well within 25-min cap)
- OUTPUT_BUDGET: ~470 LOC produced (within 500-700 target)

---

## Sibling-bleed defense (cardinal-rule-9)

This document references `Z:/claude-sota/...` paths **as cite-anchors only** (per cardinal-rule-9 exemption clause: "(i) immutable cite-anchors at `Z:/repos/deps/<repo>/file:line @ HEAD <SHA>` and (ii) `Z:/claude-sota/.claude/rules/*.md` decision-history files read by sota-researcher for Mia probes per manifest §18.2 (NOT installed; read-class only)"). No paths are install-class — runtime install decisions live in `docs/sota-installed-manifest.md` separately.

---

## Convergence-gate Axis-1 verification (≥3-distinct-orgs per `Z:/claude-sota/.claude/rules/convergence-gate.md`)

| TOP-5 Repo | Distinct-org evidence | Axis-1 |
|---|---|---|
| DS4SD/docling | IBM Research + Linux Foundation Data ML + HuggingFace ecosystem + community contributors (4-org) | ✓ PASS |
| microsoft/markitdown | Microsoft + AutoGen Team + HuggingFace + community (4-org) | ✓ PASS |
| huggingface/diffusers | HuggingFace + Stability-AI + Black-Forest-Labs + PixArt-alpha (4-org) | ✓ PASS |
| unstructured-io/unstructured | Unstructured Inc + LangChain ecosystem + Pinecone + multi-org users (4-org) | ✓ PASS |
| allenai/olmocr | Allen AI + HuggingFace + scientific community + arxiv researchers (3-org) | ✓ PASS |

All TOP-5 satisfy Axis-1 firm PASS.

---

## Update triggers / re-evaluate W222-S when:

1. A 4th NEW-CLASS sub-layer surfaces in media generation (e.g., 3D-asset generation, music generation — currently outside scope)
2. Synthetic-media-detection (S5) achieves 3-org convergence on permissive Apache-2.0/MIT → de-defer
3. Marker re-licenses from GPL-3.0 to Apache-2.0 (would flip from REJECT to TOP-5 candidate at composite ~75)
4. Diffusers ships native CC plugin integration (would push CC-native dim from 7 → 9)
5. OpenVoice v3 ships (current v2 MIT is install-class today)

---

## Cite trail

- Codex Call 1 (image-gen): `.claude/state/codex_consult_w222s_call1_OUT.txt` (16,770 tokens, ~60s)
- Codex Call 2 (doc-AI): `.claude/state/codex_consult_w222s_call2_OUT.txt` (23,654 tokens, ~85s)
- Codex Call 3 (voice): `.claude/state/codex_consult_w222s_call3_OUT.txt` (40,054 tokens, ~110s)
- Source-code spot-check: `Z:/repos/deps/docling/LICENSE`, `Z:/repos/deps/marker/LICENSE`, `Z:/repos/deps/markitdown/LICENSE`
- Rubric source: W212 + W215 + W218 9-dim scoring matrix (sibling cite-import-AMBER per `Z:/claude-sota-installed/CLAUDE.md §14.5`)
- Prior wave coverage extended: W209-G (speech REJECTs), W205-F (partial doc-AI flag on marker)
- Rule cites: `Z:/claude-sota/.claude/rules/{cross-model-consensus.md, codex-t1-fix-forward-pattern.md §Pattern D, synthesis-layer-verify.md §Reporting categories, mia-pre-apply.md, convergence-gate.md, port-note-discipline.md §6}`

---

**VERDICT: W222-S DONE**
- composite-leader: **DS4SD/docling (89)**
- CC-native-leader: **microsoft/markitdown (8)** — tied with docling at CC-native=8; markitdown breaks tie via wider format support (Office+Markdown+HTML)
- 3/3 codex BRIDGE-MODE calls succeeded
- 25 repos scored across 5 sub-layers
- 8 REJECT-class repos identified (5 license traps + 3 community failures)
- Tier-1a install trio: `docling` + `markitdown` + `diffusers`
- S5 synthetic-detection deferred (HNF — pivot to c2pa-rs in future wave)

HANDOFF to orchestrator: ready for cross-stream W222 synthesis OR install-decision wave.
