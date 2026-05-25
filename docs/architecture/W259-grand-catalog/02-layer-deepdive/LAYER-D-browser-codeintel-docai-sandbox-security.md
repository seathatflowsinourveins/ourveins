# LAYER-D — Browser/Code-Intel/Doc-AI/Sandbox/Security/Multimodal/Red-Team/ADR Deep-Dive

> **Date**: 2026-05-16
> **Authority**: W259 LAYER-D RESEARCHER fan-out under W259-FINAL-SYNTHESIS
> **Scope**: 8 sublayers × ≥4 candidates each — saturation pass.
> **Citation discipline**: TIER-1 = upstream repo README + official docs (HEAD probed via Exa 2026-05-16). TIER-2 = practitioner blog ≤90d. TIER-3 = local composition.
> **Existing W258 v13 coverage** (`docs/architecture/W258-final-synthesis-2026-05-16-v13.md`): Playwright ✓, Chrome-devtools ✓, Serena ✓, Repomix ✓, GitNexus ✓, Ruff ✓, semgrep-mcp (PyPI) ✓, NVIDIA garak (PATTERN-CITE), Docling (PATTERN-CITE), e2b-dev/mcp DEPRECATED-flagged.
> **Saturation deltas**: 30+ NEW candidates audited below.

---

## §0 — LAYER-D LANDSCAPE

Layer D is the **agent-action surface** — anything that lets an LLM-orchestrator (Claude Code, Codex, etc.) act on the world outside the prompt/token stream:

| Sublayer | Acts on | Risk class | Maturity |
|---|---|---|---|
| 1. **Browser / Computer-Use** | DOM, mouse, keyboard, screen | RCE-equivalent if vision-tools enabled | High — Playwright MCP dominant, ~6 contenders |
| 2. **Code Intelligence** | Source files, symbol graphs, LSP | Moderate (read-mostly + safe-edit) | High — Serena dominant for MCP path |
| 3. **Document AI** | PDF, DOCX, PPTX, images | Low (parse-only) but throughput-bound | High — Docling+olmOCR+Marker contended |
| 4. **Sandbox / Container** | Code execution, FS, network | Hardware-isolation required (KVM/Firecracker) | High — E2B/Modal/Daytona crystallized |
| 5. **Security / Supply-Chain** | Repos, deps, secrets, CVEs | Low | High — Trivy+Grype+Semgrep+TruffleHog stable |
| 6. **Multimodal / Media Gen** | Image, video, audio synthesis | Low (cost-bound) | Growing — fal.ai+Replicate+ComfyUI |
| 7. **Red-Team / Eval** | LLM endpoints under attack | Low (offensive-tool category) | Crystallizing — PyRIT+Garak+Inspect AI |
| 8. **ADR / Context-snapshot** | Architecture decision records | Low | Stable — Log4brains+adr-tools+Cole Medin |

**Cross-cutting invariants**:
- **CR-3 strict-reading cross-model gate** applies hardest to sublayers 1, 4 (RCE-equivalent risk).
- **Anthropic CC permissions model** per `https://docs.anthropic.com/en/docs/claude-code/settings` is the safety boundary, NOT custom guard scripts (cardinal-rule-5).
- **MCP-vs-CLI tension** per Microsoft Playwright README: "Modern coding agents increasingly favor CLI-based workflows exposed as SKILLs over MCP because CLI invocations are more token-efficient" — applies to ALL sublayers where SKILL coverage exists.

---

## §1 — SUBLAYER 1: BROWSER AUTOMATION / COMPUTER-USE

### Candidates (10 audited)

| # | Project | License | Stars | Key differentiator |
|---|---|---|---|---|
| 1.1 | **Playwright MCP** (Microsoft) | Apache-2.0 | 32,365 | TIER-1 — Accessibility-tree, no vision; CC-native; v0.0.75 (2026-05-07) |
| 1.2 | **Chrome DevTools MCP** (Google) | Apache-2.0 | ~5k | Perf-trace + DevTools-grade introspection; Lighthouse audit built in |
| 1.3 | **browser-use** | MIT | 94,058 | Largest community; Python; pairs with browser-use Cloud |
| 1.4 | **Stagehand** (Browserbase) | MIT | 22,000 | 4 primitives (act/extract/observe/agent); CDP-native v3 |
| 1.5 | **Skyvern** | AGPL-3.0 | 21,623 | Vision-LLM + computer-vision; 85.85% WebVoyager / 64.4% WebBench WRITE-best |
| 1.6 | **Steel.dev** | Apache-2.0 | ~3k | Self-host + cloud parity; 0.89s session lifecycle (open benchmark winner) |
| 1.7 | **Hyperbrowser** | proprietary | n/a | Persistent profiles + rrweb recording; ~$99/mo basic tier |
| 1.8 | **AnchorBrowser** | proprietary | n/a | Enterprise (Groq, Unify); $6M seed 2025; humanized Chromium |
| 1.9 | **Cua (trycua)** | MIT | 13,361 | Computer-use across macOS/Linux/Windows; UI-TARS + Claude integration |
| 1.10 | **Daytona Computer Use** | AGPL-3.0 | 7,244 | Linux/Win/macOS desktops; sub-90ms creation (also §4) |
| 1.11 | **lightpanda** | (unknown) | <300 | Lean browser kernel (PATTERN-CITE — small adoption) |

### Comparison highlights

**Performance (Steel.dev/browserbench harness 2026-04-01, n=5000)**:
- KERNEL: 793 ms avg, 1006 ms p95
- STEEL: 894 ms avg, 1090 ms p95
- BROWSERBASE: 2966 ms avg, 3886 ms p95
- HYPERBROWSER: 3657 ms avg, 5338 ms p95
- ANCHORBROWSER: 8001 ms avg, 11561 ms p95 (97.34% success — only one with failures)

**Agent accuracy (WebVoyager Eval 2026)**:
- browser-use: 89.1% (agent-first)
- Skyvern 2.0: 85.85% (vision-first; WRITE-task best)
- Stagehand: no single number — designed as Playwright-augment hybrid

### TOP-3 recommendation

**1.1 Playwright MCP** — already in W258 v13 install set. Microsoft-backed, 32k stars, Apache-2.0, accessibility-tree (200-400 tok/snapshot vs thousands for screenshot). Wire via `npx @playwright/mcp@latest`.

**1.2 Chrome DevTools MCP** — already in W258 v13 install set. Google-backed, complement to Playwright for perf-trace + Lighthouse + DOM-level introspection. Wire via `npx chrome-devtools-mcp@latest`.

**1.4 Stagehand** (PATTERN-CITE, ADD as optional layer) — **NEW relative to W258 v13**. When operator needs higher-level act/extract/observe primitives over Playwright AND CDP-direct latency win. MIT, doesn't lock you to Browserbase cloud. Install only if browser-agent workload materializes; current operator profile (CC orchestrator) doesn't need it.

### REJECT

- **browser-use**: largest community but Python-only and pushes operator toward browser-use Cloud (`ChatBrowserUse`) — vendor-funnel risk. Skip; Playwright MCP covers the same surface with a smaller token footprint.
- **Skyvern**: AGPL-3.0 — incompatible with MIT/Apache mix in operator's stack; AGPL copyleft propagates. REJECT.
- **Hyperbrowser / AnchorBrowser**: proprietary, no self-host. Cardinal-rule-1 violation.

---

## §2 — SUBLAYER 2: CODE INTELLIGENCE / LSP

### Candidates (8 audited)

| # | Project | License | Stars | Key differentiator |
|---|---|---|---|---|
| 2.1 | **Serena** (oraios) | MIT | 22,000+ | TIER-1 — 52-language LSP, MCP, persistent daemon, JetBrains backend |
| 2.2 | **Repomix** (yamadashy) | MIT | 14k | Already installed (W258 v13); single-file repo pack for AI |
| 2.3 | **RepoMapper / repomap-mcp** | MIT | ~500 | Aider's PageRank + tree-sitter; token-budget binary search |
| 2.4 | **ast-grep** | MIT | ~10k | Tree-sitter Rust CLI; 5x faster than next; 25x less RAM than semgrep |
| 2.5 | **Semgrep** (PyPI semgrep-mcp) | LGPL | ~10k | Already in W258 v13 (PyPI path); SAST + AST search |
| 2.6 | **Continue.dev** | Apache-2.0 | 33,207 | Source-controlled AI checks in CI; agent-as-status-check |
| 2.7 | **SWE-agent / mini-swe-agent** | MIT | n/a | Princeton+Stanford SOTA on SWE-bench; mini-version 65% in 100 LOC |
| 2.8 | **Aider repomap (standalone)** | Apache-2.0 | 44k (Aider) | PageRank-ranked repo skeleton; battle-tested 6.8M installs |
| 2.9 | **GitNexus** | (custom) | n/a | Already in W258 v13 (`gitnexus@1.6.4-rc.112`); code-graph MCP |

### Comparison highlights

**Benchmark (`codemod/benchmark` 2026-03)**:
| Tool | 500-file search | Memory |
|---|---|---|
| **ast-grep** | **43 ms** | **11 MB** |
| GritQL | 80 ms | 58 MB |
| recast | 200 ms | 93 MB |
| jscodeshift | 754 ms | 153 MB |
| semgrep | 7,535 ms | 250 MB |

→ ast-grep is the **best raw structural-search engine**; semgrep wins on security-rule library breadth.

**Serena positioning** (verified 2026-05-16): "single Go binary — no Python, no Docker, no runtime dependencies beyond the binary itself" — note: oraios/serena is Python; **postfix/serena is a Go fork** claiming the single-binary win. W258 v13 references `serena_pin` — operator must verify which fork is pinned.

### TOP-3 recommendation

**2.1 Serena (oraios)** — already in W258 v13; KEEP. 52 LSP languages. Cardinal differentiator vs file-tool approaches: replaces 8-12 careful steps with one atomic call (per oraios eval doc).

**2.4 ast-grep — NEW** for the W259 install set. Rust binary, Tree-sitter, 5x faster than semgrep, 25x less RAM. Wire as **CLI tool exposed via SKILL** (per Microsoft Playwright README guidance — CLI+SKILL > MCP for token efficiency). Install: `npm i -g @ast-grep/cli`. **Complement, not replacement, to Semgrep** (semgrep = security-rule depth; ast-grep = structural-search speed).

**2.3 RepoMapper / repomap-mcp — NEW** for the W259 install set as PATTERN-CITE (install if operator's workflow includes navigating unfamiliar large codebases). PageRank + Tree-sitter, token-budgeted (binary search), Aider-derived. Adds to existing Repomix without overlap (Repomix = full pack; RepoMap = ranked skeleton).

### REJECT / SKIP

- **Continue.dev**: VS-Code-extension product, not an agent primitive. Out of scope for CC-headless orchestrator.
- **SWE-agent**: superseded by mini-swe-agent per official site. mini-swe-agent is research-focused; not a daily MCP/CLI primitive.
- **Aider standalone repomap**: superseded by RepoMapper / repomap-mcp (which is a clean reimpl).

---

## §3 — SUBLAYER 3: DOCUMENT AI / INGESTION

### Candidates (8 audited)

| # | Project | License | Stars | Key differentiator |
|---|---|---|---|---|
| 3.1 | **Docling** (IBM) | MIT | 18k | TIER-1 — 97.9% complex-table accuracy; DocLayNet + TableFormer; LangChain/LlamaIndex integration |
| 3.2 | **MarkItDown** (Microsoft) | MIT | 8k | Office-XML deterministic (no ML); 82% F1; OCR plugin via LLM-vision (no exiftool/ffmpeg risk) |
| 3.3 | **Unstructured** | Apache-2.0 | 12k | 30+ file types; built-in chunking; 22.9pp accuracy gap vs Docling on tables |
| 3.4 | **olmOCR** (AllenAI) | Apache-2.0 | ~6k | 7B VLM; 82.4% on olmOCR-Bench; <$200/M pages; v0.4.0 RL-trained 2025-10 |
| 3.5 | **Marker** (datalab.io) | GPL | n/a | 76.1% olmOCR-Bench; multi-language; PDF→Markdown |
| 3.6 | **MinerU** (OpenDataLab) | AGPL | n/a | Chinese/Japanese strong; 75.2% olmOCR-Bench; GPU 0.21 sec/page |
| 3.7 | **Nougat** (Meta) | MIT | n/a | Academic-PDF focus; superseded by VLM-based approaches |
| 3.8 | **Reducto / LlamaParse** | proprietary | n/a | API-only; $0.10/page; 92% F1 (highest) but closed |
| 3.9 | **pdfplumber+layoutparser** | MIT | n/a | Python primitive layer; foundational, not high-level |
| 3.10 | **MegaParse** | Apache-2.0 | n/a | Quivr's parser; alternative to Unstructured |

### Performance summary (`olmOCR-Bench` 2025-10)

| Tool | Overall | Tables | Multi-column |
|---|---|---|---|
| **olmOCR v0.4.0** | **82.4** | 84.9 | 83.7 |
| Marker 1.10.1 | 76.1 | 72.9 | 80.0 |
| MinerU 2.5.4 | 75.2 | 84.9 | 78.2 |
| DeepSeek-OCR | 75.7 | 80.2 | 66.4 |
| Mistral OCR API | 72.0 | 60.6 | 71.3 |

**Throughput (`Docling` 2024 vs others, CPU)**: Docling 3.1 sec/page x86, 1.27 sec/page M3 Max — **leads CPU**. MinerU 0.21 sec/page L4 GPU — **leads GPU**.

### TOP-3 recommendation

**3.1 Docling** — already noted as PATTERN-CITE in W258 v13. **Promote to OPTIONAL INSTALL** when operator's workflow includes document parsing (e.g., parsing arxiv PDFs for the wave research). IBM-backed, MIT, 97.9% table accuracy, LangChain integration.

**3.2 MarkItDown — NEW** for the W259 install set as PATTERN-CITE. Microsoft, MIT, deterministic Office-XML parsing — perfect for the operator's many `.docx` / `.xlsx` use cases. Note: 0.1.0 OCR plugin uses LLM-vision (safer than original exiftool/ffmpeg spawning).

**3.4 olmOCR — NEW** for the W259 install set as PATTERN-CITE only IF the workload includes scanned/legacy PDFs. Requires GPU (7B VLM). AllenAI, Apache-2.0, $<200/M pages.

### REJECT / SKIP

- **Unstructured**: 30+ file types broader than Docling but 22.9pp accuracy gap on complex tables; ALSO not GPU-accelerated. Pick Docling for accuracy; pick MarkItDown for cheap Office-only.
- **Marker / MinerU**: covered ground; rank below olmOCR on olmOCR-Bench.
- **Reducto/LlamaParse**: proprietary, $0.10/page. Cardinal-rule-1 violation (no self-host).
- **Nougat**: superseded by olmOCR class.

---

## §4 — SUBLAYER 4: SANDBOX / CONTAINER EXEC

### Candidates (8 audited)

| # | Project | License | Isolation | Cold start | Open-source self-host |
|---|---|---|---|---|---|
| 4.1 | **E2B** | Apache-2.0 (partial) | Firecracker microVM | ~150ms | Cloud-only (sandboxes); SDK OSS |
| 4.2 | **Modal Sandboxes** | proprietary | gVisor | sub-second | No |
| 4.3 | **Daytona** | AGPL-3.0 | Docker (OCI) | **sub-90ms** | Yes |
| 4.4 | **Microsandbox** | Apache-2.0 | libkrun microVM | ~187ms | Yes (local-first) |
| 4.5 | **CodeSandbox SDK** | (commercial SaaS) | microVM | 1-sec snapshot restore | No |
| 4.6 | **Fly.io Sprites** | proprietary | Firecracker | sub-1s checkpoint-restore | No |
| 4.7 | **gVisor** | Apache-2.0 | user-space kernel | n/a (kernel) | Yes (lib only) |
| 4.8 | **Windows Sandbox** | Microsoft-built-in | Hyper-V | 1-2 sec | Yes (Win11/Pro) |
| 4.9 | **WSL2** | Microsoft-built-in | Hyper-V VM | 2-3 sec | Yes |

### Decision matrix (`agentmarketcap` 2026-04, `northflank` 2026):

| Dimension | E2B | Modal | Daytona | Microsandbox |
|---|---|---|---|---|
| Isolation tech | Firecracker | gVisor | OCI/Docker | libkrun microVM |
| Cold start | ~150ms | sub-second | **27-90ms** | ~187ms |
| GPU support | No | **Yes (A100/H100)** | No | No |
| Computer Use | No | No | **Yes (Win/Lin/macOS)** | No |
| Open source | Partial | No | **Yes (AGPL)** | **Yes (Apache)** |
| BYOC/self-host | No | No | **Yes** | **Yes (local-first)** |
| Local-only | No | No | Yes | **Yes (no cloud)** |

### TOP-3 recommendation

For an operator running on **Windows 11 Pro** with WSL2 + Windows Sandbox already available (per `CLAUDE.md` env): the **simplest sandbox is the OS-native one**.

**4.8 Windows Sandbox** (or **4.9 WSL2**) — recommended PRIMARY install. Built-in, Hyper-V-isolated, zero install cost. Already cited in W258 v13 r37 "WSL2 OR Windows Sandbox container; resource limits; path policy" for serena/repomix/PowerShell-tool boundary.

**4.4 Microsandbox** — **NEW** RECOMMENDED ADD as OPTIONAL pattern-cite. Local-first, Apache-2.0, libkrun microVMs, sub-200ms boot, **secrets injected at network-layer** (never enter guest). Install only if multi-agent code-execution materializes; otherwise OS-native sandbox covers it.

**4.1 E2B** — REJECT for current install; PATTERN-CITE only. W258 v13 already flags `e2b-dev/mcp-server` as DEPRECATED per repo banner. The underlying E2B service is healthy but partial-OSS and **cloud-only for sandboxes** (cardinal-rule-1 prefers self-host). Revisit if operator needs Firecracker isolation for untrusted code AND the workload is small enough for E2B free tier.

### REJECT

- **Modal**: proprietary; cardinal-rule-1.
- **Daytona**: AGPL-3.0 propagates; problematic. NICE feature set (sub-90ms, Computer Use), but pick OSS Apache instead — Microsandbox covers similar ground.
- **CodeSandbox / Fly.io Sprites**: proprietary cloud-only.

---

## §5 — SUBLAYER 5: SECURITY / SUPPLY-CHAIN

### Candidates (8 audited)

| # | Project | License | Stars | Surface |
|---|---|---|---|---|
| 5.1 | **Trivy** (Aqua Security) | Apache-2.0 | 34,000 | TIER-1 — containers + FS + repos + K8s + IaC + secrets + licenses (single binary) |
| 5.2 | **Grype + Syft** (Anchore) | Apache-2.0 | 11,500 | SBOM-native CVE scan; CVSS+EPSS+KEV composite score |
| 5.3 | **Semgrep** | LGPL (engine) | ~10k | SAST + AST search; community ruleset |
| 5.4 | **OSV-Scanner** (Google) | Apache-2.0 | n/a | OSV.dev DB + OpenSSF malicious-package feed |
| 5.5 | **TruffleHog** (Truffle Security) | AGPL-3.0 | ~25,000 | 800+ secret types; credential verification (active-API check); Slack/S3/Docker scan |
| 5.6 | **Gitleaks** | MIT | ~25,000 | Speed-focused pre-commit + CI; pattern + entropy |
| 5.7 | **NVIDIA garak** | Apache-2.0 | 8k | LLM red-team (also §7) |
| 5.8 | **OpenSSF Scorecard** | Apache-2.0 | n/a | Repo-health rating |
| 5.9 | **Sigstore + cosign** | Apache-2.0 | n/a | Artifact signing |
| 5.10 | **Renovate** | AGPL-3.0 | n/a | Dependabot-alternative; auto-update PRs |

### OSS-first stack (industry consensus 2026 per `appsecsanta` + `safeguard.sh`):

```
Trivy   →   containers + filesystem + repos + IaC + secrets (breadth)
Grype + Syft   →   SBOM-driven SCA (depth + EPSS+KEV prioritization)
OSV-Scanner   →   OSV.dev + malicious-package feed
TruffleHog   →   secrets + verification
Gitleaks   →   pre-commit fast scan
Semgrep   →   SAST
+ OpenSSF Scorecard + Sigstore cosign
```

**Detection-quality verdict**: OSS within a few pp of commercial. Gap is inventory/workflow (DefectDojo fills).

### TOP-3 recommendation

**5.1 Trivy — NEW for W259 install set**. Apache-2.0, single binary, covers container + FS + IaC + K8s + secrets + licenses. Wire as **CLI tool exposed via direct-CLI hook** (per cardinal-rule-2 — direct upstream CLI invocation, not custom guard script). Install: `scoop install trivy` (Win) or via release binary.

**5.6 Gitleaks** (or **5.5 TruffleHog**) — **NEW for W259 install set**. Pre-commit scan. Gitleaks if speed matters; TruffleHog if you need verification across Slack/S3/Docker. **Wire as direct-CLI hook in `.claude/settings.json`** (cardinal-rule-2 — `pre_commit` hook = direct-CLI invocation).

**5.3 Semgrep (PyPI semgrep-mcp)** — ALREADY in W258 v13 install set. KEEP.

### Already-flagged in W258 v13

- `NVIDIA/garak` (PATTERN-CITE — install if LLM red-team workloads materialize).
- `semgrep-mcp` via PyPI.

### REJECT / SKIP

- **Renovate**: AGPL-3.0; problematic. Use Dependabot (GitHub-native) instead — already free + no AGPL.

---

## §6 — SUBLAYER 6: MULTIMODAL / MEDIA GEN

### Candidates (10+ audited)

| # | Project | License | Class | Self-host capable |
|---|---|---|---|---|
| 6.1 | **fal-ai** | proprietary API | Cloud img/video t2i | No |
| 6.2 | **Replicate** | proprietary API | Cloud img/video orchestration | No |
| 6.3 | **ComfyUI** | GPL-3.0 | Img/video workflow graph | Yes (self-host) |
| 6.4 | **Mochi-1** (Genmo) | Apache-2.0 | 10B video gen; 60GB VRAM | Yes |
| 6.5 | **Pyramid-flow** | Apache-2.0 | 384p→768p video; 20.7k A100-hours trained | Yes |
| 6.6 | **fish-speech / S2 Pro** | (custom) | SOTA TTS; 80 langs; 4B params | Yes |
| 6.7 | **MeloTTS** | MIT | Multilingual TTS | Yes |
| 6.8 | **Bark** | MIT | Suno text-to-audio; legacy | Yes |
| 6.9 | **Pyramid-Cog** | proprietary wrapper | Replicate adapter | Cloud |
| 6.10 | **Vercel AI Media** | proprietary | Vercel orchestration | No |
| 6.11 | **gradio media** | Apache-2.0 | UI layer for media demos | Yes |

### Critical context

**Multimodal is the SOTA-shift area** — DeepSeek V4 cascade explicitly rejected for multimodal per W258 v13 (§ "DeepSeek V4 escape valve" — text + tool-call ONLY, no multimodal/MCP-native).

**For Claude orchestrator routing** (`mcp__plugin_everything-claude-code_exa__web_search_exa` 2026): the practical approach is **API-cascade via fal.ai or Replicate** for img/video gen (cardinal-rule-1 prefers OSS but media-gen self-host requires GPU farm) — UNLESS operator has dedicated GPU capacity for ComfyUI + Mochi-1 self-host.

### TOP-3 recommendation

For an operator on Win11 Pro without dedicated GPU farm, **none of these are install-now** primitives. They are **PATTERN-CITE** only.

**6.3 ComfyUI** — PATTERN-CITE only. Best self-host img/video orchestration when GPU materializes.

**6.6 fish-speech / S2 Pro** — PATTERN-CITE only. SOTA OSS TTS at 30k stars (verified 2026-05-12). Install if voice synthesis workload materializes.

**6.1 fal-ai (via API)** — PATTERN-CITE only as **cloud-API path** if operator wants media-gen at low setup cost. Note: requires API key and is NOT cardinal-rule-1 compliant (proprietary service).

### REJECT

- **Mochi-1 / Pyramid-flow**: Apache-2.0 OSS but 60GB-VRAM / dedicated-A100-class requirement. Not installable on Win11 workstation.
- **Bark / MeloTTS**: superseded by fish-speech / S2 Pro for SOTA TTS.

**LAYER-D §6 net verdict**: defer all of this sublayer until operator's workflow demonstrates media-gen need. None block W259 install plan.

---

## §7 — SUBLAYER 7: RED-TEAM / EVAL

### Candidates (5 audited)

| # | Project | License | Stars | Class |
|---|---|---|---|---|
| 7.1 | **NVIDIA garak** | Apache-2.0 | 8,000 | TIER-1 — "Nmap for LLMs"; 100+ probes; CLI; JSONL output |
| 7.2 | **Microsoft PyRIT** | MIT | 3,802 | TIER-1 — Crescendo + TAP + Skeleton Key multi-turn; CoPyRIT GUI; Azure-leaning |
| 7.3 | **promptfoo** | MIT | n/a | YAML-config regression-test; CI-native |
| 7.4 | **UK AISI Inspect AI** | MIT | n/a | Safety-eval framework; reproducible experiments |
| 7.5 | **CMU HarmBench** | MIT | n/a | Standardized benchmarking |
| 7.6 | **DeepTeam** | (varied) | n/a | 40+ predef vulns; OWASP/NIST-AI-RMF mapped |

### Decision matrix (`redteams.ai` 2026-03):

| Phase | Tool |
|---|---|
| Initial scan | **garak** (fast, broad) |
| Deep testing | **PyRIT** (multi-turn, adaptive) |
| Regression / CI | **promptfoo** (YAML assertions) |
| Standardized benchmark | **HarmBench + Inspect AI** |
| Full engagement | garak → PyRIT → promptfoo |

### TOP-3 recommendation

**7.1 NVIDIA garak** — already PATTERN-CITE in W258 v13. KEEP. Operator's `.audit-garak/` dir signals prior interest. Install via `pip install garak`.

**7.2 Microsoft PyRIT — NEW** for the W259 PATTERN-CITE list (NOT install-now). MIT, multi-turn + multi-modal attacks. Install only if operator deploys LLM-facing product surface requiring security audit.

**7.3 promptfoo — NEW** for the W259 PATTERN-CITE list (NOT install-now). MIT, YAML-config. Install if CC subagent harness needs regression-test gating per arc.

### REJECT / SKIP

- **DeepTeam**: smaller community, less battle-tested than garak/PyRIT.
- **HarmBench / Inspect AI**: benchmark-eval tools, not operational primitives. Cite-only.

**LAYER-D §7 net verdict**: none change current W259 install plan. PATTERN-CITE garak + PyRIT for future activation.

---

## §8 — SUBLAYER 8: ADR / CONTEXT-SNAPSHOT

### Candidates (8 audited)

| # | Project | License | Stars | Class |
|---|---|---|---|---|
| 8.1 | **log4brains** (thomvaill) | Apache-2.0 | ~1k | Docs-as-code ADR + static-site gen + Markdown |
| 8.2 | **adr-tools** (npryce) | MIT | n/a | Bash CLI for Nygard-format ADRs |
| 8.3 | **Structurizr DSL** (Simon Brown) | Apache-2.0 | n/a | C4-model diagrams-as-code + ADR import (log4brains/adr-tools/madr supported) |
| 8.4 | **context-engineering-intro** (Cole Medin) | (custom) | 13,254 | PRP methodology + Claude Code-centered |
| 8.5 | **context-engineering-mcp** | NOASSERTION | 11 | MCP server automating Cole's PRP methodology |
| 8.6 | **Archon** (coleam00) | (custom) | 20,504 | "First open-source harness builder for AI coding" |
| 8.7 | **MADR template** (Oliver Kopp + Olaf Zimmermann) | (template) | n/a | ADR template standard |
| 8.8 | **pyadr** | MIT | n/a | Python CLI for ADR lifecycle |
| 8.9 | **Backstage ADR plugin** | Apache-2.0 | n/a | Multi-org ADR search inside Backstage |
| 8.10 | **adr-log** | MIT | n/a | CLI to maintain ADR index.md |

### TOP-3 recommendation

**8.1 log4brains — NEW for W259 install set as PATTERN-CITE**. Docs-as-code, Markdown, static-site gen (publish to GH/GL pages), Hot-reload local preview. Use only if operator wants formal ADR discipline. **Current alternative**: operator's `docs/architecture/W258-*` series already serves as an ADR-equivalent (verbose Wave-N decision log with cite-trails).

**8.3 Structurizr DSL — PATTERN-CITE** only. C4-model + ADR import. Powerful but adds DSL learning curve. Skip unless operator needs C4 architecture diagrams.

**8.4 context-engineering-intro (Cole Medin) — REVIEW DEFERRED**. 13k stars at high velocity; Claude-Code-centered. **Distinct from log4brains** — this is PRP-methodology (Product Requirements Prompts), not ADR archival. **Verify cardinal-rule-9 install-risk** before pulling: review repo HEAD for skills/hooks/MCP-server primitives BEFORE any install. The operator's existing W258 v13 install set + behavioral skills layer (W254 §3 obra/superpowers etc.) may already cover the PRP function.

### REJECT / SKIP

- **adr-tools (npryce bash)**: log4brains supersedes — log4brains accepts the same format.
- **pyadr / adr-log**: same — superseded by log4brains.
- **Backstage ADR plugin**: requires Backstage; out of scope for single-operator CC runtime.

**LAYER-D §8 net verdict**: minimal additions. Operator's existing `docs/architecture/W258-*` decision log already covers ADR function. log4brains is a future-formalize option, NOT install-now.

---

## §9 — CONVERGENCE FINDINGS

### Cross-sublayer patterns

1. **CLI-via-SKILL > MCP for token-efficiency** (per Microsoft Playwright README guidance, observed across sublayers 1, 2, 5):
   - Browser: Playwright CLI+SKILLS over Playwright MCP for coding-agent workflows.
   - Code-intel: ast-grep as CLI tool exposed via SKILL.
   - Security: Trivy/Gitleaks/TruffleHog as direct-CLI hooks (cardinal-rule-2).
   - MCP retained where persistent state / iterative reasoning over page structure matters (browser exploratory automation, Serena LSP-warm-state).

2. **Hardware-isolation crystallization** (sublayer 4): Firecracker microVM (E2B, Fly.io Sprites) + libkrun microVM (Microsandbox) + gVisor (Modal) are the three SOTA approaches. **Container-based sandboxes (Daytona) are weakening** for adversarial code — fine for friendly-execution + Computer-Use.

3. **OSS-first detection quality** (sublayer 5): Trivy+Grype+Semgrep+TruffleHog now within a few pp of commercial scanners; gap is inventory/workflow (DefectDojo fills). **No commercial security tool justified for current operator scale**.

4. **Document-AI accuracy stratification** (sublayer 3): Docling = best CPU + best complex-table; olmOCR = best legacy/scanned; MarkItDown = best Office-deterministic. **Three-tool stack covers full surface**.

5. **Browser-agent benchmarks crystallized** (sublayer 1): WebVoyager + WebBench have replaced ad-hoc demos as the evaluation standard. browser-use leads overall; Skyvern leads on WRITE-heavy tasks; Stagehand intentionally hybrid.

6. **Red-team toolchain crystallized** (sublayer 7): garak (scan) → PyRIT (deep) → promptfoo (regression). MAY become standard CC subagent gate when LLM-facing workloads materialize.

7. **Cole Medin pattern proliferation** (sublayer 8): Archon (20k stars) + context-engineering-intro (13k stars) at high velocity. Worth a deeper sota-convergence-audit pass before any install. (Out of scope for this researcher; flag for orchestrator.)

### Saturation honest-non-findings

- **Computer-use primitives are early**: trycua/cua (13k) is the leading OSS, but multi-agent computer-use coordination is "still early" per `gerl.dev` 2026-01. Defer install until workload pulls.
- **Multimodal self-host requires GPU farm**: Mochi-1 + Pyramid-flow are Apache-2.0 but 60GB-VRAM-class — not Win11-workstation-installable. Cloud API (fal.ai / Replicate) is the only practical operator path, AND it's proprietary (cardinal-rule-1 violation). Defer entirely.
- **Steel.dev open benchmark shows Kernel beating Steel** (KERNEL avg 793ms, STEEL avg 894ms). Operator-relevant only if browser-agent workload materializes; both Apache-2.0 self-hostable.
- **postfix/serena (Go single-binary fork) vs oraios/serena (Python upstream)**: divergence. Operator's W258 v13 `serena_pin` should be VERIFIED — postfix/serena is a newer fork claiming the "single Go binary" win, but upstream oraios/serena (22k stars) is the canonical install path. **Flag for orchestrator follow-up.**

---

## §10 — RECOMMENDED INSTALL DELTAS (over W258 v13 baseline)

### Already in W258 v13 install set (KEEP — no change)

- Playwright MCP (sublayer 1)
- Chrome DevTools MCP (sublayer 1)
- Serena MCP (sublayer 2)
- Repomix (sublayer 2)
- GitNexus (sublayer 2)
- semgrep-mcp (PyPI path — sublayer 5)

### NEW T1 install (TIER-1 direct, high-confidence)

| # | Sublayer | Tool | Install path | Rationale |
|---|---|---|---|---|
| D-T1-01 | 2 (code-intel) | **ast-grep** | `npm i -g @ast-grep/cli` | 5x faster than next; 25x less RAM; structural-search Rust CLI; complement to semgrep |
| D-T1-02 | 5 (security) | **Trivy** | binary release / scoop | Apache-2.0, single binary covers container+FS+IaC+K8s+secrets+licenses; cardinal-rule-2 direct-CLI hook compatible |
| D-T1-03 | 5 (security) | **Gitleaks** | binary release | Speed-focused pre-commit + CI; MIT; direct-CLI hook |

### NEW T2 install (PATTERN-CITE — install only if workload materializes)

| # | Sublayer | Tool | Workload trigger |
|---|---|---|---|
| D-T2-01 | 1 | Stagehand | Operator builds browser-agent product (act/extract/observe primitives) |
| D-T2-02 | 2 | RepoMapper / repomap-mcp | Operator navigates unfamiliar large codebases routinely |
| D-T2-03 | 3 | Docling | Operator parses PDFs/DOCX in workflow (e.g., research-wave arxiv ingest) |
| D-T2-04 | 3 | MarkItDown | Operator parses Office files routinely |
| D-T2-05 | 3 | olmOCR | Operator parses scanned/legacy PDFs (requires GPU) |
| D-T2-06 | 4 | Microsandbox | Multi-agent code-execution materializes; supplement to Windows Sandbox / WSL2 |
| D-T2-07 | 5 | TruffleHog | Cross-source secret scanning needed (Slack/S3/Docker beyond git) |
| D-T2-08 | 7 | NVIDIA garak | LLM-facing product surface requires security audit (already PATTERN-CITE in W258 v13) |
| D-T2-09 | 7 | Microsoft PyRIT | Multi-turn adversarial attack simulation needed |
| D-T2-10 | 7 | promptfoo | Subagent regression-gating via YAML assertions |
| D-T2-11 | 8 | log4brains | Operator wants formal ADR archival beyond Wave-N decision log |

### REVIEW-DEFERRED (need cardinal-rule-9 install-risk + sota-convergence-audit pre-install)

- **Cole Medin's context-engineering-intro + Archon** (sublayer 8). 13k+20k stars at high velocity; Claude-Code-centered; partial overlap with existing W254 §3 behavioral-skills layer. **Run `/sota-convergence-audit` before install decision.**

### REJECT (cardinal-rule violations or superseded)

- **Skyvern** (AGPL-3.0 copyleft propagates)
- **browser-use** (vendor-funnel risk via browser-use Cloud `ChatBrowserUse`)
- **Hyperbrowser / AnchorBrowser** (proprietary cloud-only)
- **Modal / Daytona** (proprietary / AGPL-3.0 problematic)
- **Renovate** (AGPL-3.0)
- **Reducto / LlamaParse** (proprietary cloud-only)
- **Unstructured** (22.9pp accuracy gap vs Docling on tables)
- **Marker / MinerU** (superseded by olmOCR on bench)
- **Nougat** (superseded by VLM-class)
- **DeepTeam** (smaller community than garak/PyRIT)
- **Continue.dev / SWE-agent / Bark / MeloTTS / Mochi-1 / Pyramid-flow** (out-of-scope or superseded)

### Orchestrator follow-up items

1. **Verify `serena_pin`** — confirm whether operator pinned oraios/serena (Python upstream, 22k) or postfix/serena (Go fork claiming single-binary win). Pin to upstream unless Go-fork advantages are validated.
2. **Run `/sota-convergence-audit` on Cole Medin's Archon + context-engineering-intro** before any install decision.
3. **Cardinal-rule-2 compliance check** before wiring Trivy + Gitleaks: they must be direct-CLI invocations in `.claude/settings.json` hooks, NOT custom `.claude/hooks/scripts/*.py` wrappers (W255 cleanup invariant).

---

## Citation index (this doc)

- TIER-1 Microsoft Playwright MCP README + npm + docs (verified 2026-05-16 via Exa)
- TIER-1 oraios/serena README + docs (verified 2026-05-16)
- TIER-1 IBM Docling AAAI 2025 paper + arxiv 2408.09869v4 (verified 2026-05-16)
- TIER-1 e2b-dev Firecracker fork + Firecracker NSDI'20 paper (cited)
- TIER-1 Trivy/Grype/Syft/OSV-Scanner/TruffleHog/Gitleaks/Semgrep upstream READMEs (verified 2026-05-16)
- TIER-1 Microsoft PyRIT + NVIDIA garak READMEs (verified 2026-05-16)
- TIER-1 log4brains README + Structurizr DSL docs (verified 2026-05-16)
- TIER-2 Steel.dev/browserbench harness 2026-04-01 (n=5000 open benchmark)
- TIER-2 ByteTunnels framework-wars article 2026-02-12; agentmarketcap E2B/Modal/Daytona 2026-04; codemod/benchmark 2026-03-16; soup.io PDF parser comparison 2025-08-26; appsecsanta supply-chain tools 2026-04-24; redteams.ai tool comparison 2026-03-13; markaicode AI tools 2026-05-09
- TIER-3-LOCAL-COMPOSITION: all install-deltas calibrated against W258 v13 baseline (`docs/architecture/W258-final-synthesis-2026-05-16-v13.md`) and cardinal rules 1-9 in `Z:\claude-sota-installed\CLAUDE.md`.
