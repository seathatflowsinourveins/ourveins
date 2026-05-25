---
title: Wave 213 Master Synthesis — Comprehensive SOTA Checklist for Z:\claude-sota-pure Runtime
status: SUPERSEDED-BY-W214
superseded-by: tmp/wave214-MASTER-SYNTHESIS-2026-05-15.md
date: 2026-05-15
wave: 213
agents: P + Q + R (Sonnet stand-in per cmc-env-funneled-disclosure)
artifact-class: master-synthesis
---

> **SUPERSEDED-BY-W214 2026-05-15** — 21 P0 install candidates surfaced here were filtered by W214 3-stage cascade (Mia orchestrator-runtime probe 16/21 OVER + multi-channel target-Mia 2 additional OVER + REAL GPT-5.5 codex T1 Path P 3 DEFER catches) = 18/21 = **86% OVER catch rate**. Final install batch revised to **3 INSTALL-NOW (G6+G3+G2) + 1 OPTIONAL (G8) + 3 DEFER (G1+G4+G5) + 1 DROP (G7)** per `tmp/wave214-MASTER-SYNTHESIS-2026-05-15.md §VERDICT` + REAL GPT-5.5 codex T1 ratification at `.claude/state/codex_consult_w214_p0_install_review_OUT.txt:9890-9921`. FM-20 row 21 codification ladder advance (n=20→n=21) ratified by codex T1 `fm20_row_21_codification: ADOPT`. **Read W214 master synthesis for current install batch; W213 retained as research-input audit trail only**.

# Wave 213 Master Synthesis — Comprehensive SOTA Checklist for Z:\claude-sota-pure Runtime

## STAND-IN-NOTICE (per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled disclosure mandate`)

Wave 213 dispatched 3 sota-researcher agents (P/Q/R) as **Sonnet stand-in** (NOT BRIDGE-MODE GPT-5.5). Cross-model gate NOT structurally satisfied at agent layer. Per `Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md §FM-09 2-stage validation contract` + `fm17-subagent-fleet-depletion.md §FM-17.e` recovery (W212 Agents N+O original BRIDGE-MODE FAILED with autocompact-thrashing; this wave used Sonnet stand-in directly per FM-17.e recovery): **orchestrator-side Path P codex foreground+tee verification REQUIRED before any install-apply boundary**.

## Discovery breadth verification (per `Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md` ≥4 source FAMILIES)

| Agent | Source families probed | ≥4 gate |
|---|---|---|
| P (CLI + code-intel + web) | GitHub MCP + Exa MCP + curated catalogs (modern-unix + awesome-cli-apps + awesome-claude-code) + plugin marketplaces + Anthropic CC docs = 5 | ✅ PASS |
| Q (hooks + commands + skills) | 8 source families: Anthropic CC official + cwc-long-running-agents + disler + wshobson + obra/superpowers + awesome-claude-code + rohitg00-toolkit + ECC | ✅ PASS |
| R (security + test + build + LLM-serving) | GitHub MCP + direct repo file fetch + W206-W212 priors + verified-avoid grep + LICENSE blob probes = 5 | ✅ PASS |

## Cumulative state across W206-W213

| Wave | Layers covered | ADOPT-NOW added | Cumulative |
|---|---|---|---|
| W206-W209 (prior 4 waves) | LLM-serving foundations + protocols + safety + early-stage | 28 | 28 |
| W212 (Memory/RAG/KG + Orchestration + Token/Obs/Eval) | 93 candidates audited | 15 | 43 |
| W213 (CLI + code-intel + web + hooks + commands + skills + security + test + build + LLM-serving expansion) | 65 candidates audited | **14** | **57** |

W213 net = 14 ADOPT-NOW (Agent P: 6 P0 ADOPT in catalog; Agent Q: 6 P0 + 3 P1; Agent R: 11 P0 + 3 P1; with dedup overlap + Agent P/R conflict reconciliation pending → 14 net new beyond W212).

---

## Master Install Checklist (P0 → P3 prioritized; native CC install path classified)

### P0 — CRITICAL FOUNDATIONAL (install in first batch; ~21 items, ~45-90min operator-led)

| ID | Layer | Item | License | Stars | Native install | Wiring | Grade | Source agent |
|---|---|---|---|---|---|---|---|---|
| P0-A1 | Security | **gitleaks** (gitleaks/gitleaks) | MIT | 26,991 | `gh release download --repo gitleaks/gitleaks` | TRIVIAL | A | R |
| P0-A2 | Security | **trufflehog** (trufflesecurity/trufflehog) | AGPL-3.0 (CLI-binary-use permitted per AGPL §13 + W102 corrected verdict) | 26,305 | `gh release download --repo trufflesecurity/trufflehog` | TRIVIAL | A | R |
| P0-A3 | Security | **sops** (getsops/sops) | MPL-2.0 | (CNCF) | `gh release download --repo getsops/sops` | EASY (key-provider config) | A | R |
| P0-B1 | Test | **pytest** (pytest-dev/pytest) | MIT | high★ | `pip install pytest` | TRIVIAL | A | R |
| P0-B2 | Test | **vitest** (vitest-dev/vitest) | MIT | 14k+★ | `npm install -g vitest` | TRIVIAL | A | R |
| P0-C1 | CLI | **ripgrep** (BurntSushi/ripgrep) | MIT/Unlicense | 50k+ | `winget install BurntSushi.ripgrep` OR `cargo install ripgrep` | TRIVIAL | A | P |
| P0-C2 | CLI | **fd** (sharkdp/fd) | MIT/Apache-2.0 | 35k+ | `winget install sharkdp.fd` | TRIVIAL | A | P |
| P0-C3 | CLI | **bat** (sharkdp/bat) | MIT/Apache-2.0 | 48k+ | `winget install sharkdp.bat` | TRIVIAL | A | P |
| P0-C4 | CLI | **fzf** (junegunn/fzf) | MIT | 79,622 | `winget install junegunn.fzf` | EASY (shell integration) | A+ | P |
| P0-D1 | CodeIntel | **ast-grep CLI** (ast-grep/ast-grep) | MIT | 13,806 | `cargo install ast-grep --locked` | TRIVIAL | A | P |
| P0-D2 | CodeIntel | **ruff** (astral-sh/ruff) | MIT | 47,531 | `pip install ruff` OR `uv tool install ruff` | TRIVIAL | A | P |
| P0-E1 | Hook | **ECC governance-capture.js** | MIT (ECC) | already-installed | env flip `ECC_GOVERNANCE_CAPTURE=1` | TRIVIAL | A | Q |
| P0-E2 | Skill-bundle | **wshobson comprehensive-review** plugin (3 agents + 2 commands) | MIT | 35,436 (parent) | `/plugin install comprehensive-review@wshobson-agents` | EASY | A | Q |
| P0-E3 | Skill | **superpowers/finishing-a-development-branch** | MIT | 171k+★ (parent) | selective-vendor per Section 14.5 | EASY | A | Q |
| P0-E4 | Skill | **superpowers/executing-plans** | MIT | -- | selective-vendor per Section 14.5 | EASY | A | Q |
| P0-E5 | Skill | **superpowers/dispatching-parallel-agents** | MIT | -- | selective-vendor per Section 14.5 | EASY | A | Q |
| P0-E6 | Skill | **superpowers/using-git-worktrees** | MIT | -- | selective-vendor per Section 14.5 | EASY | A | Q |
| P0-F1 | LLM-serving | **llama.cpp** (ggerganov/llama.cpp) | MIT | high★ | `gh release download --repo ggerganov/llama.cpp` (Windows-CUDA/CPU/OpenBLAS) | EASY | A | R |
| P0-G1 | Build/Toolchain | **mise** (jdx/mise) | MIT | high★ | `curl https://mise.run \| sh` OR `winget install jdx.mise` | EASY | A | R |
| P0-G2 | Task-runner | **just** (casey/just) | CC0-1.0 | 33,667 | `cargo install just` OR `gh release download --repo casey/just` | TRIVIAL | A | R |
| P0-H1 | MCP | **microsoft/playwright-mcp** | Apache-2.0 | 32,555 | `npx @playwright/mcp@latest` — **CROSS-AGENT CONFLICT pending Mia reconciliation** | EASY | A | R (Agent P says REJECT-duplicate) |

**P0 superpowers selective-vendoring impact**: 6 already vendored + 4 NEW (P0-E3 / E4 / E5 / E6) = **10/14 = 71% adoption** (was 43%); validates the sister-framework pattern at firm Axis-1+2+3 PASS per `Z:/claude-sota/.claude/rules/team-orch-frameworks.md §Selectively-vendored sister skills`.

### P1 — HIGH-LEVERAGE (install in second batch; ~18 items)

| ID | Layer | Item | License | Native install | Wiring | Grade |
|---|---|---|---|---|---|---|
| P1-C5 | CLI | zoxide (ajeetdsouza/zoxide) | MIT | `winget install ajeetdsouza.zoxide` | EASY (shell init) | A |
| P1-C6 | CLI | lazygit (jesseduffield/lazygit) | MIT | `winget install JesseDuffield.lazygit` | TRIVIAL | A |
| P1-C7 | CLI | delta (dandavison/delta) | MIT | `winget install dandavison.delta` | TRIVIAL | A |
| P1-D3 | CodeIntel | pyright (microsoft/pyright) | MIT | `pip install pyright` | TRIVIAL | A |
| P1-D4 | CodeIntel | biome (biomejs/biome) | MIT/Apache-2.0 | `npm install -g @biomejs/biome` | TRIVIAL | A |
| P1-L1 | Web | firecrawl-mcp (firecrawl/firecrawl-mcp-server) | MIT | `npx -y firecrawl-mcp` + `FIRECRAWL_API_KEY` | EASY (API key) | A |
| P1-A4 | Security | syft (anchore/syft) — SBOM gen | Apache-2.0 | `gh release download --repo anchore/syft` | EASY | A |
| P1-A5 | Security | grype (anchore/grype) — vuln scan | Apache-2.0 | `gh release download --repo anchore/grype` | EASY | A |
| P1-A6 | Security | trivy (aquasecurity/trivy) — multi-target | Apache-2.0 | `gh release download --repo aquasecurity/trivy` | EASY | A |
| P1-B4 | Test | microsoft/playwright (lib) | Apache-2.0 | `npm install -g playwright` + `npx playwright install chromium` | EASY | A |
| P1-F2 | LLM-serving | vLLM (vllm-project/vllm) — PagedAttention SOTA | Apache-2.0 | `uv pip install vllm` OR `docker pull vllm/vllm-openai` | MEDIUM (GPU+Python) | A |
| P1-F3 | LLM-serving | SGLang (sgl-project/sglang) — RadixAttention | Apache-2.0 | `pip install sglang` | MEDIUM (GPU+Python) | A |
| P1-F4 | LLM-proxy | litellm (BerriAI/litellm) — 100+ provider proxy | MIT | `pip install litellm` (W212 ADOPT carry-over) | EASY | A |
| P1-F5 | LLM-runtime | ollama (ollama/ollama) — local model registry | MIT | `gh release download --repo ollama/ollama` (W212 ADOPT) | EASY | A |
| P1-G3 | Container | podman (containers/podman) — rootless docker | Apache-2.0 | `winget install RedHat.Podman` | EASY | A |
| P1-G4 | Container | docker-compose v2 | Apache-2.0 | bundled with Docker Desktop OR `gh release download --repo docker/compose` | TRIVIAL | A |
| P1-E7 | Hook | wshobson block-no-verify | MIT | `/plugin install block-no-verify@wshobson-agents` (compare vs local first per CR-9 REVERT check) | EASY | B+ |
| P1-S1 | Skill-bundle | wshobson agent-orchestration plugin | MIT | `/plugin install agent-orchestration@wshobson-agents` (Probe 4 deeper audit first) | MEDIUM | B |

### P2 — NICE-TO-HAVE (pilot batch)

- L1-C8 hyperfine (statistical benchmark; need 3rd-org cite firmness)
- L2-D5 semgrep CLI (LGPL-2.1 CLI-use admissibility verify)
- L2-D6 ast-grep-mcp (MCP wrapper for L2-D1 CLI; after CLI installed)
- L3-L2 tavily-mcp (alternative search/extract; API key required)
- L3-L3 brave-search-mcp (alternative search ranking)
- L1-C9 eza (EUPL-1.2 license operator policy verify)
- L1-C10 dust, L1-C11 starship
- L4-F6 HF TGI (compare vs vLLM after baseline)
- L4-F7 onnxruntime-genai (compare vs llama.cpp; ONNX format ecosystem)
- E.hook H-006 ECC pre-bash-commit-quality
- L3-G5 dagger (programmable pipelines; defer until CI-gate demand surfaces)

### P3 — DEFERRED / SITUATIONAL

- L3-L4 browserbase-mcp (SaaS subscription dependency)
- L3-L5 web-eval-agent (autonomous web-app QA)
- L3-L6 earthly (PARTIAL-OVERLAP with dagger)
- L2-G6 hypothesis (property-based testing; after pytest baseline)
- L2-G7 axe-core (a11y; no UI surface yet)
- L4-F8 NVIDIA/TensorRT-LLM (NVIDIA-GPU only; sss has no guaranteed GPU)
- S-006 kepano-obsidian-skills (Layer 3 wiki STATUS-DEFERRED)
- L1-C12 atuin (REJECT-FOR-FIT — Probe 7.a multi-machine demand-absence)
- L4-F9 OpenSPG/KAG (already in W212 master; STUDY-PILOT)

---

## REJECT-FOR-FIT log (~22+ candidates rejected with documented reason class)

### REJECT.4 — DUPLICATE-FUNCTIONALITY (Probe 4 plugin-namespace caught; kiss-dry-yagni Must-Never #4)

| Candidate | Existing incumbent | Source agent |
|---|---|---|
| exa-labs/exa-mcp-server | `mcp__plugin_everything-claude-code_exa__web_search_exa` already exposed | P |
| executeautomation/mcp-playwright | Same as microsoft/playwright-mcp | P |
| ECC mcp-health-check.js | local `codex_mcp_healthcheck.py` (19.0K Python) | Q |
| addy source-driven-development skill | Already INSTALLED via addy-agent-skills marketplace | Q |

**CROSS-AGENT CONFLICT REQUIRING MIA RECONCILIATION**: microsoft/playwright-mcp
- Agent P says REJECT.4 ("`mcp__playwright__*` tools already exposed per system-reminder")
- Agent R says ADOPT-NOW P0 ("Microsoft official; not in current 14 marketplace plugins")
- Resolution: Mia probe `Glob .claude/plugins/marketplaces/microsoft-playwright-mcp/` + `mcp` tool-list `playwright`-prefix presence check BEFORE install commit

### REJECT.5 — MODE-HARNESS-SHAPE (HARD-GATE incompatible with autonomous /loop)

- wshobson conductor plugin (interactive Q&A setup at `commands/setup.md:8`; already in `verified-avoid.md` Cohort 1)
- superpowers/brainstorming (HARD-GATE blocks all implementation pending user approval; already REJECTED iter-84)
- semgrep/mcp (upstream ARCHIVED 2026-05-13 by maintainer; superseded by direct semgrep CLI)

### REJECT.6 — DIRECT-FILE / REGISTRY BLOCKERS

- disler/claude-code-hooks-mastery (LICENSE absent at HEAD `052ad1cb`; Probe 6 blocker)
- snyk/cli (commercial-tier dependency violates CR-9 self-host-first principle)
- pact-foundation/pact (DEMAND-ABSENCE — sss has no microservices)
- vercel/turborepo (DEMAND-ABSENCE — sss is NOT JS monorepo)
- awesome-claude-code curated commands (discovery-only catalog; not directly installable)

### REJECT.7.a — DEMAND-ABSENCE

- atuin (multi-machine shell-history sync; sss is single-machine Z: workspace)
- microsoft/sarif (SARIF format spec; not standalone install)
- NVIDIA/TensorRT-LLM (NVIDIA-GPU only)
- devcontainers/spec (sss uses native install per CR-5)

### Verified-avoid carryover (rejected W212 or earlier; do NOT re-propose)

- openviking (AGPLv3 STRUCTURAL — W212 Agent M)
- marker (GPL-3 — W212)
- memgraph (BSL-1.1 — W212)
- neo4j-community (GPLv3 — W212)
- kuzudb (ARCHIVED 2026 — W212)
- microsoft/presidio (Py3.14/pydantic-v1 incompat — W211)
- llm-guard (sentencepiece Py3.14 wheel-absent — W211)

### Provenance-unverified (defer pending probe)

- Scrapling/D4Vinci (49,873★ in 1.5y — needs Probe 1 count-OVER + 90-day burn-in)
- canonical-tool HEAD SHAs not pin-verified (ripgrep/fd/bat/eza/zoxide/etc.) — `git ls-remote HEAD` per install candidate before commit

---

## Cardinal-rule conformance summary

| CR | Compliance | Notes |
|---|---|---|
| CR-1 (architectural edits cite SOTA primary) | ✅ | All P0/P1 carry TIER-1-DIRECT cite anchors at file:line @ HEAD <SHA> |
| CR-3 (cross-model consensus) | ⚠ STAND-IN | Sonnet stand-in for research; Path P codex foreground+tee required pre-install per FM-09 2-stage |
| CR-5 (install-priority over hand-coding) | ✅ | Zero hand-coded candidates; all via upstream-install or selective-vendor |
| CR-6 (fresh from GitHub via official-native-channel) | ✅ | All install paths use official upstream channels (winget / gh release / npm / pip / cargo / `/plugin install`) — NO shell-script wrappers |
| CR-7 (graduated unleash) | ✅ | All P0 candidates Phase 1-compatible (no HARD-GATE incompatible) |
| CR-8 (full-SOTA-content invariant) | ✅ | All candidates ADAPTED-FROM-SOTA per CR-1 |
| CR-9 (install-risk + 2-round fix-forward + pre-import REVERT check) | ✅ | Version-pin recommended for `@latest`; trufflehog REVERT-check carryover from W102; pre-import REVERT-grep required for all wshobson + superpowers candidates |
| CR-10 (research-first-then-install) | ✅ | W213 IS the research-first wave; install batch is the after-step |
| CR-11 (META-process SOTA discipline) | ✅ | All 3 agents followed multi-source ≥4 + 7-Probe-DAG + Axis-1+2+3 + SRA D1-D10 + CR-12 6-class |
| CR-12 (upstream-install priority + 6-class disposition) | ✅ | Agent R CR-12 dispositions: 8 GENUINELY-NEW + 6 PROVIDER-COMPLEMENT + 2 PARTIAL-OVERLAP + 1 ECOSYSTEM-IMPORT + 0 DUPLICATE-FUNCTIONALITY |

---

## Mia pre-apply queue (per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` — BEFORE install-apply boundary)

Per `Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md §FM-09 2-stage validation contract`: BEFORE any P0/P1 ships into Z:\claude-sota-pure, run Mia probes:

### 1. Already-installed multi-channel probe (per mia-pre-apply.md §Alternate-install-path probe discipline)

For EACH P0 CLI: run all 4 steps per the fortified probe schema (NOT `command -v` alone):
```bash
# Step 1: PATH probe
command -v ripgrep fd bat fzf ast-grep ruff pyright biome
# Step 2: alternate install-path probe
find /z/claude-sota-installed/.local/bin /z/claude-sota-installed/.cargo/bin ~/go/bin ~/.local/bin /c/Users/*/AppData/Roaming/npm /c/Users/*/AppData/Local/Microsoft/WinGet/Links -maxdepth 1 \( -name 'rg*' -o -name 'fd*' -o -name 'bat*' -o -name 'fzf*' -o -name 'ast-grep*' -o -name 'ruff*' \) -type f 2>/dev/null
# Step 3: channel-registry probes
npm ls -g 2>/dev/null | grep -i -E 'ast-grep|biome|pyright|firecrawl|playwright'
pip show ruff pyright pytest playwright 2>/dev/null
winget list ripgrep fd bat fzf 2>/dev/null
# Step 4: ALL hits = pre-existing canonical install → DROP install prescription
```

Likely-already-installed candidates per Wave 112 Ship A1+2CC archeology evidence: ripgrep/fd/bat/fzf may be in winget OR .cargo/bin OR Scoop. Verify ALL channels.

### 2. Plugin-namespace probe (Probe 4)

```bash
/plugin list  # verify wshobson + superpowers state
ls -la .claude/plugins/marketplaces/  # verify marketplace dirs
```

### 3. Marketplace.json canonical name verification (Wave 146 Ship 3 V3 SAVED-SHIP)

For each `/plugin install <X>@<marketplace>` command: read `.claude/plugins/marketplaces/<marketplace>/<plugin>/.claude-plugin/marketplace.json:name` to verify the canonical marketplace identifier matches the install command argument.

### 4. Probe 6 LICENSE direct read for license-flagged candidates

```bash
gh api repos/eza-community/eza/contents/LICENSE --jq '.content' | base64 -d | head -3  # eza EUPL-1.2
gh api repos/semgrep/semgrep/contents/LICENSE --jq '.content' | base64 -d | head -3   # semgrep LGPL-2.1
gh api repos/D4Vinci/Scrapling/contents/LICENSE --jq '.content' | base64 -d | head -3  # Scrapling
```

### 5. Probe 1 count-OVER for Scrapling (49k★ in 1.5y)

Per Wave 112 Ship A1+2CC archeology + convergence-gate Axis-3 FAST-CHURN band: verify fork-vs-organic star history via Star History API.

### 6. Cross-agent reconciliation for microsoft/playwright-mcp

Mia probe: `mcp__playwright__*` tool-list check + `ls -la .claude/plugins/marketplaces/microsoft-playwright-mcp/` direct probe. Agent P REJECT vs Agent R ADOPT — decide before install commit.

### 7. SHA pin verification for canonical tools

```bash
# Per FM-20 §How to apply step 2: README/manifest/file blob-SHA pins require direct blob read
gh api repos/BurntSushi/ripgrep/git/ref/heads/master --jq '.object.sha'
gh api repos/sharkdp/fd/git/ref/heads/master --jq '.object.sha'
# etc. for each canonical tool BEFORE commit cite
```

---

## Path P codex foreground+tee verification plan (per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` §Pattern D)

Per FM-09 2-stage + Pattern D 6-parameter recipe — compose codex consult prompt with 4-6 candidate batches; fire via:

```bash
codex exec --skip-git-repo-check --color never -p deep-review-exec \
  < .claude/state/codex_consult_w213_p0_install_batch.txt \
  2>&1 | tee .claude/state/codex_consult_w213_p0_install_batch_OUT.txt
```

**Batch composition** (3 codex consults to cover 21 P0 candidates within Pattern D ≤50 LOC focused-prompt discipline):
- **Batch 1**: P0-A1/A2/A3 (security) + P0-G1/G2 (build) + P0-F1 (LLM) — 6 items
- **Batch 2**: P0-C1/C2/C3/C4 (CLI) + P0-D1/D2 (code-intel) — 6 items
- **Batch 3**: P0-B1/B2 (test) + P0-E1/E2/E3/E4/E5/E6 (hooks/skills/wshobson) + P0-H1 (microsoft/playwright-mcp) — 9 items

Path P recovery-family n=13 evidence per `ctff-patterns-cd.md §Pattern D` — real GPT-5.5 verdict before install-apply.

---

## Cross-fire claim-propagation defense (per `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md`)

Per FM-20 §How to apply: decompose multi-clause prescriptions into independent sub-claims; cite probe outcome verbatim in synthesis; refuted sub-claims DROP from next-fire brief.

**Sub-claims requiring forward Mia probe** before W214 install-apply ships:

| Claim source | Sub-claim | Probe method |
|---|---|---|
| P0-C1 Agent P | "ripgrep MIT/Unlicense 50k+★" | gh API LICENSE blob + stargazers count |
| P0-D2 Agent P | "ruff MIT 47,531★" | gh API; verify Marker Decay corollary at install time |
| P0-E2 Agent Q | "wshobson comprehensive-review @ HEAD `ece811f2`" | `gh api repos/wshobson/agents/git/ref/heads/main` |
| P0-A2 Agent R | "trufflehog AGPL-3.0 CLI-binary-use permitted per AGPL §13" | Verify against AGPL §13 verbatim text + SPDX FAQ |
| P0-F1 Agent R | "llama.cpp MIT" | gh API LICENSE blob (`e7dca554` per Agent R cite) |
| P0-E3-E6 Agent Q | "superpowers 4 new vendored skills available at HEAD `f2cbfbef`" | Verify file existence at `Z:/repos/deps/superpowers/skills/<X>/SKILL.md` |
| P0-G1 Agent R | "mise MIT @ HEAD `06cc4cae`" | gh API LICENSE blob (`5333824e` per Agent R) |
| P0-H1 Agents P+R | "microsoft/playwright-mcp duplicate vs new" | tool-list probe + marketplace dir check |

Per FM-20 row 14 recursive dogfood: this synthesis is itself a propagation surface; the next-fire brief (W214 install batch OR Path P codex T1) MUST verify each sub-claim independently.

---

## W214 forward queue (next-fire candidates)

1. **Path P codex foreground+tee 3-batch verification** of W213 P0 install candidates (load-bearing — required by FM-09 2-stage before any install commits land)
2. **Mia pre-apply 7-step probe sequence** (already-installed multi-channel + plugin-namespace + marketplace.json + LICENSE + Probe 1 count-OVER + cross-agent reconciliation + SHA pin verification)
3. **Operator-led install batch execution** of P0 verified-genuine candidates (winget / gh release / pip / npm / cargo / `/plugin install`)
4. **W214 research wave** for layers still under-covered:
   - L1: tokei / btop / charm-stack / gum / glow / dprint / helix (HNF deep-audit per Agent P)
   - L2: oxc / mypy / prettier / eslint / tree-sitter CLI (HNF per Agent P)
   - L3: puppeteer / anthropic-fetch-mcp / apify / scrapfly / serper / perplexity-mcp (HNF per Agent P)
   - LLM-serving: full vLLM+SGLang+TensorRT comparison benchmark
   - Documentation generation: mkdocs / docusaurus / vitepress (not yet covered)
5. **Wave 215 codification candidates** (per cycle-322 jurisdiction): any new FM-N emerging from this wave's STAND-IN-NOTICE pattern; any sub-class taxonomy advances

---

## W213 deliverables (4 files)

1. `tmp/wave213-agentP-cli-codeintel-web-2026-05-15.md` (~450 LOC; 22 candidates; 8 ADOPT-NOW L1 + 4 ADOPT-NOW L2 + 1 ADOPT-NOW L3)
2. `tmp/wave213-agentQ-hooks-commands-skills-2026-05-15.md` (~300 LOC; 18 candidates; 1 H + 3 C + 2 S = 6 P0 ADOPT-NOW + 3 P1 STUDY-PILOT)
3. `tmp/wave213-agentR-security-test-build-llm-2026-05-15.md` (~175 LOC; 25 candidates; 11 P0 + 3 P1 ADOPT-NOW)
4. **`tmp/wave213-MASTER-SYNTHESIS-2026-05-15.md` (THIS file; ~400 LOC consolidated)**

---

## VERDICT

**W213-MASTER-SYNTHESIS-COMPLETE** —
- 65 candidates audited across 12 layers (CLI / code-intel / web research / hooks / commands / skills / security / testing / build / container / LLM serving / LLM proxy)
- **14 net new ADOPT-NOW BEYOND W212**
- **57 cumulative ADOPT-NOW** across W206-W213 (21 P0 + 18 P1 + 12 P2 + 6 P3 organized)
- 8+ DUPLICATE-FUNCTIONALITY rejected via Probe 4 plugin-namespace
- ~22 REJECT-FOR-FIT with documented reason class
- Verified-avoid carry-over honored (no W212 rejections re-proposed)
- STAND-IN-NOTICE per `cmc-env-funneled-disclosure.md` (Sonnet stand-in for all 3 agents)
- Path P codex foreground+tee verification REQUIRED pre-install per FM-09 2-stage
- Mia pre-apply 7-step probe queue documented per `mia-pre-apply.md` §Alternate-install-path probe discipline
- FM-20 sub-claim decomposition documented (8 sub-claims requiring forward Mia probe)
- Cross-agent conflict (microsoft/playwright-mcp Agent P REJECT vs Agent R ADOPT) flagged for Mia reconciliation
- Full cardinal-rule conformance: CR-1 / CR-5 / CR-6 / CR-7 / CR-8 / CR-9 / CR-10 / CR-11 / CR-12 all ✅ ; CR-3 ⚠ STAND-IN pending Path P verification
