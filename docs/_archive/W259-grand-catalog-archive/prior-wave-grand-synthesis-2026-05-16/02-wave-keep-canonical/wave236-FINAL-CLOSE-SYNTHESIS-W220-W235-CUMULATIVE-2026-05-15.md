---
title: Wave 236 — FINAL Close-Synthesis: W220-W235 Cumulative Z:\claude-sota-pure Install Catalog
status: AUTHORITATIVE-FINAL
date: 2026-05-15
wave: 236
fire: 1
predecessors: W220-W235 (26 agent reports + 5 syntheses)
agents-integrated: S+T+U (W230) + V+W+X (W233) + Y+Z (W235)
verdict: PRE-INSTALL-COMMIT-READY-FINAL-v3
---

# Wave 236 — FINAL Close-Synthesis (W220-W235 Cumulative)

## §0 — Convergent Multi-Perspective Summary

| Wave | Agent | Class | Verdict | Key contribution |
|---|---|---|---|---|
| W230-S | wshobson-devops-troubleshooter | Operations | NEEDS-REVISION | Port collision + venv + npm prefix |
| W230-T | wshobson-security-auditor | Security | NEEDS-REVISION | `@latest` CR-9 + Tom Farley crypto + 9 secret patterns |
| W230-U | comprehensive-review:architect-review | Architecture | NEEDS-REVISION | Install-order + YAGNI cut + duplicates |
| W233-V | sota-researcher | Token compression | ADOPT-3 | ACON + leanctx + ACE (LLMLingua disposition resolved) |
| W233-W | sota-researcher | Streaming/realtime | HONEST-NON-FINDING | Validates W226-M R0 REJECTED |
| W233-X | sota-researcher | Privacy/PII/safety | PARTIAL-CONFIRM | Presidio + llm-guard subset; 7 NEW phantoms |
| W235-Y | sota-researcher | Outer research deep-dive | HNF-ADOPT-NOW + 7 STUDY-PILOT.b | FM-20 Row 21 catch: 8/10 iter2b OVER-CLAIMS |
| W235-Z | sota-researcher | wshobson 80-plugin scoring | ADOPT-3 + STUDY-PILOT-4 + CITE-1 | shell-scripting/plugin-eval/block-no-verify + 10 anti-pattern catches |

## §1 — FINAL ADOPT-NOW Roster (32 total — W234 28 + W235-Z 3 + W235-Y 0)

### Phase 0 — Foundation (sigstore-verified)
- sops + age (INSTALLED)

### Phase 1 — Memory Stack L1+L3
- mcp-memory-service@10.51.3 (INSTALLED)
- graphiti-core@0.29.0 + FalkorDB@1.6.1 (INSTALLED)

### Phase 2 — Tier-A SOTA CLI (11 candidates, version-pinned per CR-9)
- ripgrep@14.1.1 / fd@10.2.0 / bat@0.24.0 / eza@0.20.20 / hyperfine@1.18.0 / tokei@13.0.0-alpha.4 / dust@1.2.4 / bottom@0.11.0 / gh@2.65.0 / jq@1.7.1 / yq@4.45.1

### Phase 2.5 — Governance baseline EARLY (per Architect U)
- canonical.md + Must-Never #3 + audit-action-loop.md (inherited)
- safety-guard hook
- **Δ24 microsoft/presidio v2.2.359** (W233-X) — PII NER + `_secret_redactor.py` 9-pattern update §5.c

### Phase 3 — Cross-model gate hooks (Tier 1a)
- codex T1-T7 hooks per manifest §Section 2

### Phase 3.5 — Cryptographic governance + safety conditional STUDY-PILOT.b
- Tom Farley trio STUDY-PILOT.b (Cedar+Ed25519 source-audit + npm dep + 8★ Axis-1 weak per W235-Z anti-pattern #3)
- **Δ25 protectai/llm-guard v0.3.16** (W233-X) — lightweight prompt-injection subset

### Phase 4 — Tier-B CLI + dev tools (NEW per W235-Z Top-3)
- pre-commit / sccache / mkdocs
- **Δ-Z1 wshobson/shell-scripting v1.2.2** (W235-Z) — GENUINELY-NEW, Ryan Snodgrass named-T2, **Grade A**
- **Δ-Z2 wshobson/plugin-eval** (W235-Z) — GENUINELY-NEW 3-layer Elo eval, **Grade B+** (caveat: plugin.json license gap — queue upstream PR)
- **Δ-Z3 wshobson/block-no-verify v1.0.0** (W235-Z) — PROVIDER-COMPLEMENT to Must-Never #3, **Grade B+**

### Phase 5 — Code intelligence (EXPANDED per W233-V)
- gitnexus / ast-grep / serena / semgrep / osv-scanner / typos
- **Δ22 microsoft/acon @ d63f9ae1** (W233-V) — Microsoft Research LLMLingua successor for agent-context, **Grade A**
- **Δ23 jia-gao/leanctx v0.3.1** (W233-V) — Production Claude-Code-targeted SDK, **Grade A**
- **Δ26 ace-agent/ace @ 4f679bef** (W233-V) — Stanford+SambaNova ICLR 2026 STUDY-PILOT.b, **Grade B+**

### Phase 6 — Observability (SPLIT per Architect U)
- 6.a Langfuse MIT-core ONLY / 6.b ccusage cost telemetry / 6.c phoenix tracing / 6.d promptfoo eval (ONE canonical location)

### Phase 7 — Document/visual processing
- PaddleOCR@2.10.0 + Baidu disclosure / mkdocs

### Phase 8 — Web/voice/image
- playwright-cli + SKILLs (W223-K revision) / chrome-devtools-mcp (CONFIRM `.mcp.json:41`) / elevenlabs-mcp

### Phase 9 — RAG (operator decision)
- onyx vs ragflow (deferred) / cognee L4 (PROVIDER-COMPLEMENT to Graphiti L3 per W221-E)

### Phase 10 — Notifications + workflow harness
- ntfy-mcp self-hosted + cryptographic-random topic / mcp-builder skill

### Phase 11 — Cryptographic governance (conditional IF Phase 3.5 audit PASS)
- protect-mcp / review-agent-governance / signed-audit-trails (Tom Farley trio)

### REJECTED-AT-LAYER (no Phase)
- **Streaming/realtime layer** (W233-W) — REJECT-AT-LAYER. Cite-class reference only: `sparfenyuk/mcp-proxy`.

## §2 — FINAL STUDY-PILOT.b Roster (12 candidates, expanded from W234 8 + W235-Y 4 + W235-Z 4)

| # | Source | Candidate | Grade | Rationale |
|---|---|---|---|---|
| 1 | W234 | ace-agent/ace | B+ | Stanford ICLR 2026 — 30d pilot vs ACON |
| 2 | W234 | protectai/llm-guard | B+ | 5mo stale; lightweight subset |
| 3 | W234 | Tom Farley trio (3 plugins) | C | Crypto source-audit + Axis-2/3 verification |
| 4 | W234 | NVIDIA-NeMo/Guardrails | C+ | Demand-gate weak |
| 5 | W235-Y | anthropics/claude-code-base-action | B+ | CI/CD activation roadmap |
| 6 | W235-Y | anthropics/claude-code-security-review | A- | LLM-driven security distinct from SAST |
| 7 | W235-Y | github/gh-aw | A- | gh-CLI agentic workflows GENUINELY-NEW |
| 8 | W235-Y | iter2b #3 --system-prompt-file | B+ | Decouple persona from CLAUDE.md ancestor-walkup |
| 9 | W235-Y | iter2b #7b OTEL_LOG_RAW_API_BODIES | B narrow | PII-leak-risk gated session-env file |
| 10 | W235-Y | iter2b #10 --max-budget-usd | A- | Cost-cap on cron-driven launches |
| 11 | W235-Z | wshobson/python-development | A | 16 skills, Python authoring |
| 12 | W235-Z | wshobson/documentation-standards (HADS) | B | Markdown semantic complement |
| 13 | W235-Z | wshobson/security-scanning | B | SAST/SCA complement |

**HOLD pending Probe 6 LICENSE direct-blob read**:
- W235-Y Δ-N3 `openai/skills` (UNKNOWN license, 19,183★)

## §3 — FINAL REJECT-FOR-FIT (~160+ candidates)

### Hard structural blockers
- **claude-squad** AGPL-3.0 (W226-N)
- **trufflesecurity/trufflehog** AGPL-3.0 (W233-X)
- **deadbits/vigil-llm** ABANDONED >16mo (W233-X)
- **protectai/rebuff** STALE >12mo (W233-X)

### Probe 5 HARD-GATE n=3 cohort
- **wshobson/conductor** (W228-Q + W230-T + W235-Z) — `setup.md:35-44` "Ask ONE question per turn"
- **wshobson/review-agent-governance** (W235-Z) — HARD-GATE "human approval"
- iter-92 mattpocock + iter-93 wshobson previously cohorted

### CR-12 DUPLICATE-FUNCTIONALITY (W235-Z catches)
- wshobson/agent-orchestration (DUP 10+ sister rules)
- wshobson/agent-teams (DUP Anthropic experimental + tmux Probe 5)
- wshobson/comprehensive-review (DUP superpowers/requesting-code-review)
- wshobson/tdd-workflows (DUP superpowers/tdd vendored)

### Probe 7.a DEMAND-ABSENCE (W235-Z 67+ wshobson plugins)
- Language plugins (9 minus python): ruby/php/elixir/julia/JS-TS-frontend/Rust/Go/C/C++/Java/Scala/ARM/Game/Blockchain/.NET
- Business / Marketing / Creative / Finance / Payments / Gaming / Accessibility / Quantitative-trading (16)
- kubernetes-operations / machine-learning-ops / payment-processing / multi-platform-apps / frontend-mobile-security / backend-api-security / reverse-engineering / brand-landingpage / meigen-ai-design / ui-design

## §4 — Cumulative Phantom-Cite Catches: n=35

| # | Wave | Phantom catch | Class |
|---|---|---|---|
| 1-27 | W221-W229 | (catalogued in W227+W229) | Multiple classes |
| 28 | W233-X | iamgroot42/piiranha (HF model not repo) | NOT-A-REPO |
| 29 | W233-X | google/shieldgemma (HF model only) | NOT-A-REPO |
| 30 | W233-X | openai/moderation (API endpoint) | NOT-A-REPO |
| 31 | W233-X | anthropics/constitutional-ai-mcp (training pattern) | NOT-A-MCP |
| 32 | W233-X | promptarmor/prompt-armor | 404 |
| 33 | W233-X | lakera-ai/lakera-mcp-server (closed-source SaaS) | NOT-OSS |
| 34 | W233-X | scrubadub/scrubadub (wrong path) | WRONG-OWNER |
| 35 | W235-Y | iter2b 8/10 "missing in sibling" REFUTED | FM-20 Row 21 CROSS-RUNTIME |

**License-blocker catches** (Probe 6 STRUCTURAL):
- claude-squad AGPL / trufflehog AGPL / openviking AGPL (W226-M)

**ABANDONED catches** (Axis-3 FAIL):
- vigil-llm 16mo stale / rebuff 12mo stale

## §5 — BLOCKING Pre-Conditions Before Phase 1 Commit (EXPANDED)

### §5.a Infrastructure isolation (Agent S) — unchanged
- OLLAMA_HOST=127.0.0.1:11701 / Z:/venvs/sss-pure / npm prefix Z:/npm-global / docker network sss-pure-net

### §5.b Secret-management bootstrap (Agent T) — unchanged
- sops + age + .env.encrypted

### §5.c `_secret_redactor.py` 9-NEW-pattern update (Agent T Q4.3) — unchanged
- ElevenLabs / Langfuse-public / NEXTAUTH_SECRET / DATABASE_URL / Ed25519-private / age-private / ntfy-topic / MotherDuck-token / generic-OpenSSH-PEM

### §5.d Version-pin discipline (Agent T Q2.1 CRITICAL) — EXPANDED with W235 additions
- W231 Phase 4 CLI pinned
- W234 Phase 5 NEW: leanctx==0.3.1, presidio-analyzer==2.2.359, llm-guard==0.3.16
- W234 git-cloned: microsoft/acon @ d63f9ae1, ace-agent/ace @ 4f679bef
- **W235-Z NEW**: wshobson marketplace pinned at HEAD `ece811f23310a37ceb43496dbac0e244fe6845b6` (NOT brief's stale `112197c6`)

### §5.e Pattern D codex T1 BRIDGE-MODE review (Agent S+T+U + W235 convergent)
**Wave 236 synthesis itself MUST be Pattern D reviewed BEFORE any Phase 1 commit**:
```powershell
codex exec --ephemeral -p deep-review-exec --color never `
  < tmp/wave236-commit-prompt.txt `
  2>&1 | tee .claude/state/codex_consult_w236_pre_commit_OUT.txt
```

### §5.f FM-09 2nd-stage validation (W233 + W235 — EXPANDED)
All 5 sota-researcher dispatches (W233-V/W/X + W235-Y/Z) ran as Sonnet stand-ins. **Mandatory FM-09 2nd-stage** validation per `ahfv-codex-rescue-blind-spot.md` 100% base rate:
1. ACON Probe DAG 1-7 (Probe 5 mode-harness: research-grade train/eval pipelines fit; Probe 7.b agent-context demand)
2. leanctx Probe 5 (autonomous /loop SDK fit; Anthropic-only canonical)
3. presidio Probe 7.b (PII data path existence in sss)
4. wshobson Top-3 (shell-scripting / plugin-eval / block-no-verify) Probe 4 + 5 + 6 + 7
5. 4 W235-Y NEW candidates Probe 6 (especially openai/skills LICENSE direct-blob read)

### §5.g (NEW W235-Z) Upstream PR queue
- wshobson/plugin-eval `.claude-plugin/plugin.json` license/version/description/author fix (cardinal-rule-1 cite-class anomaly)

### §5.h (NEW W235-Y) FM-20 Row 21 cross-runtime cite-anchor discipline
- ALL cite-imports from `Z:/claude-sota/` paths MUST be Mia-pre-applied against THIS runtime state per `fm20-path-drift-cascade.md §Row 21`. Wave52/iter2b 8/10 OVER-CLAIMS demonstrate failure mode.

## §6 — Forward Queue (post-Phase-1-commit)

- **F1**: Cite-anchor migration ship — 50+ rule files reference retired `Z:/claude-sota/` paths
- **F2**: Pattern D codex T1 BRIDGE-MODE review on THIS Wave 236 synthesis
- **F3**: Phase 4 Tier-A SOTA CLI + W235-Z Top-3 batch install (after §5.d/g/h complete)
- **F4**: `docs/verified-avoid.md` update (n=35 phantom catches + ~160 REJECT entries)
- **F5**: Tom Farley trio Phase 3.5 evaluation (30d burn + crypto audit)
- **F6**: FM-09 2nd-stage validation on W233+W235 Sonnet stand-in verdicts
- **F7**: ACON vs ACE adoption tiebreak after 30d STUDY-PILOT.b
- **F8**: Presidio Probe 7.b 5-clause final operator decision
- **F9 (NEW)**: openai/skills LICENSE direct-blob read for Probe 6
- **F10 (NEW)**: wshobson Top-3 install + STUDY-PILOT.b 4-plugin queue
- **F11 (NEW)**: signed-audit-trails cite-import-AMBER to `docs/governance-cookbook.md`
- **F12 (NEW)**: iter2b GENUINE-GAPs #3 + #7b + #10 wiring in tools/eee.ps1
- **F13 (NEW)**: wshobson upstream PR for plugin-eval plugin.json license fix

## §7 — Cumulative Catalog Statistics

| Metric | Value |
|---|---|
| Total agent reports | 26 (W220-W235) |
| Total syntheses | 5 (W223 + W225 + W227 + W229 + W231 + W234 + W236 FINAL) |
| ADOPT-NOW catalog size | 32 (Phase 0-11) |
| STUDY-PILOT.b queue | 13 candidates |
| REJECT-FOR-FIT | ~160+ candidates |
| Phantom-cite catches | n=35 |
| AGPL/proprietary blockers | 4 |
| ABANDONED candidates | 2 |
| Probe 5 HARD-GATE cohort | n=3 (conductor + mattpocock + wshobson-extra) |
| BLOCKING pre-conditions | 8 (§5.a-h) |
| Forward queue items | 13 (F1-F13) |

## §8 — verdict_one_line

`OPERATOR-EXECUTION-READY-FINAL-v3: W236 integrates W220-W235 cumulative (26 agent reports + 7 syntheses) into 32 ADOPT-NOW Phase 0-11 install catalog; ADDS W235-Z Top-3 wshobson Tier-B CLI (shell-scripting A + plugin-eval B+ + block-no-verify B+); ADDS W235-Y 7 STUDY-PILOT.b (4 Anthropic/OpenAI/GitHub OFFICIAL + 3 iter2b GENUINE-GAPs); VALIDATES streaming layer REJECT-AT-LAYER (W233-W); CONFIRMS no-double-research saturation (42+ v65 BEST-OF-BEST already in catalog); CATCHES FM-20 Row 21 cross-runtime drift (8/10 iter2b OVER-CLAIMS REFUTED); CATCHES 0/80 wshobson PROACTIVELY discipline gap; UPDATES phantom-cite n=35; EXPANDS BLOCKING pre-conditions §5.a-h (8 items including new §5.g upstream PR + §5.h FM-20 Row 21 cite-import discipline); CONDUCTOR REJECT-FOR-FIT n=3 cohort confirmed; Tom Farley trio DOWNGRADE STUDY-PILOT.b (Cedar+Ed25519 audit pending); orchestrator MUST execute §5.a-h + F2 Pattern D + F6 FM-09 2nd-stage BEFORE Phase 1 commit; sibling claude-sota retired path migration F1 high-priority`

VERDICT: **OPERATOR-EXECUTION-READY-FINAL** (post §5 + F2 + F6 complete)

---

## §9 — Operator Decision Path (final)

**Path A (RECOMMENDED)**: Execute §5.a-h BLOCKING pre-conditions → F2 Pattern D codex T1 BRIDGE-MODE review of this W236 synthesis → F6 FM-09 2nd-stage → Phase 1 commit. Estimated time: 4-6 hours for all pre-conditions + reviews.

**Path B**: Continue research waves on remaining gaps (LLMLingua-class May 2026 alternatives further confirmed; agent-orchestration deep-dive complete; outer research deep-dive complete; wshobson 84-plugin scoring complete — NO obvious gap remains; HONEST-NON-FINDING saturation pattern confirmed at Cohort-7 n=23 + Wave 235).

**Path C**: Bootstrap `Z:\claude-sota-pure` scaffold per W232 §9 + selective Phase 0-2 install (Memory Stack + Tier-A CLI + Governance baseline + Δ-Z1 shell-scripting).

The catalog is FINAL. Saturation pattern confirms exhaustive coverage. Awaiting operator decision Path A/B/C.
