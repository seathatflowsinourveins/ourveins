---
title: Wave 234 — Close-Synthesis Integrating W230 (S+T+U) + W233 (V+W+X) into Z:\claude-sota-pure Install Catalog
status: AUTHORITATIVE
date: 2026-05-15
wave: 234
fire: 1
predecessors: W229 + W230 (S DevOps + T Security + U Architect) + W233 (V Token Compression + W Streaming + X Privacy/PII/Safety)
agents-integrated: 6
verdict-convergence: 4 ADOPT-NOW + 4 STUDY-PILOT.b + 2 REJECT-AT-LAYER + 1 PARTIAL-OVERLAP-DEFER
---

# Wave 234 — Close-Synthesis: W230 + W233 → Revised Z:\claude-sota-pure Catalog

## §0 — Multi-perspective convergence summary

| Wave | Agent | Class | Verdict | Layer covered |
|---|---|---|---|---|
| W230-S | wshobson-devops-troubleshooter | Operations | NEEDS-REVISION | Install/wire audit (port collision + venv + npm prefix) |
| W230-T | wshobson-security-auditor | Security | NEEDS-REVISION | License/supply-chain/secrets/Tom-Farley crypto |
| W230-U | comprehensive-review:architect-review | Architecture | NEEDS-REVISION | Install-order + YAGNI + duplicates |
| W233-V | sota-researcher | Token compression May 2026 | ADOPT-3 candidates | LLMLingua replacement layer |
| W233-W | sota-researcher | Streaming/realtime | HONEST-NON-FINDING | REJECT-AT-LAYER validated |
| W233-X | sota-researcher | Privacy/PII/safety | PARTIAL-CONFIRM | PII NER + prompt-injection layer |

**Convergent multi-perspective signal**: W229 catalog needs revision (S+T+U) PLUS uncovered layers gap-filled (V+X) PLUS one layer confirmed not-needed (W).

## §1 — NEW ADOPT-NOW candidates (5 additions to W231 §3)

### Δ22 (NEW): `microsoft/acon` — Agent context optimization (LLMLingua successor)
- **Cite**: `microsoft/acon @ HEAD d63f9ae18959dc7215ff62899c94c5e8c56847ae` (Microsoft Research, arXiv 2510.00615)
- **License**: MIT ✅
- **Grade A** per W232 §7 rubric
- **CR-12**: GENUINELY-NEW (no incumbent agent-context-compression)
- **Phase**: 5 (Code intelligence) — paired with leanctx
- **Install**:
  ```bash
  git clone --depth 1 https://github.com/microsoft/acon.git Z:/claude-sota-installed/.local/acon
  cd Z:/claude-sota-installed/.local/acon
  git rev-parse HEAD > .pinned-sha  # d63f9ae18959dc7215ff62899c94c5e8c56847ae
  uv pip install -e .
  ```

### Δ23 (NEW): `jia-gao/leanctx` v0.3.1 — Production Claude-Code-targeted SDK
- **Cite**: `jia-gao/leanctx @ HEAD 6a27975c51df3de15481a39b5cf280c1a0cc034d`
- **License**: MIT ✅
- **Grade A** per W232 §7 rubric
- **CR-12**: PARTIAL-OVERLAP with context-mode (different layer: provider-SDK-level + content-aware routing)
- **Phase**: 5 (Code intelligence)
- **MEASURED**: LongBench v2 short-subset DOUBLES accuracy 40% vs 20% baseline at 43% tokens; agent-transcript 35.6% reduction BYTE-IDENTICAL preserve
- **Install** (CR-9 version-pinned):
  ```bash
  uv pip install 'leanctx[anthropic,openai,gemini,lingua,otel]==0.3.1'
  leanctx bench list  # 7 scenarios verify
  ```

### Δ24 (NEW): `microsoft/presidio` v2.2.359 — PII NER + anonymization
- **Cite**: `microsoft/presidio @ HEAD <fetch-at-install>` (Microsoft, MIT, 8,075★)
- **License**: MIT ✅
- **Grade A-** per W232 §7 rubric
- **CR-12**: GENUINELY-NEW (no incumbent PII NER; complements `_secret_redactor.py` regex tier)
- **Phase**: 2.5 (Governance baseline, EARLY) — paired with `_secret_redactor.py` 9-pattern update
- **Probe 7.b 5-clause check**:
  1. Named use case: PII redaction at LLM-call boundary + commit body audit + session JSONL
  2. Local input: `.claude/state/*.jsonl` + tool transcripts + memory store
  3. Wiring: `pii_pre_edit_gate.py` PreToolUse on `Edit|Write|MultiEdit` (analogous to `gitleaks_pre_commit_gate.py`)
  4. Incumbent: `_secret_redactor.py` (regex-only) — Presidio adds NER context-aware
  5. Reversible: 30-day pilot; retire to `verified-avoid.md` if zero PII catches
- **Install** (CR-9 version-pinned):
  ```bash
  pip install --no-cache-dir \
    presidio-analyzer==2.2.359 \
    presidio-anonymizer==2.2.359 \
    presidio-structured==0.0.4
  python -m spacy download en_core_web_lg  # ~750MB NER model
  ```
- **Pre-install REVERT-check per CR-9**: `git -C Z:/claude-sota log --all --oneline -- 'presidio*'` → no prior REVERT precedent.

### Δ25 (NEW): `protectai/llm-guard` v0.3.16 (PARTIAL-OVERLAP — pick-and-choose only)
- **Cite**: `protectai/llm-guard @ HEAD <fetch-at-install>` (ProtectAI/Palo Alto, MIT, 2,954★)
- **License**: MIT ✅
- **Grade B+** (5mo stale CAVEAT)
- **CR-12**: PROVIDER-COMPLEMENT + PARTIAL-OVERLAP
- **Status**: **STUDY-PILOT.b** (NOT ADOPT-NOW due to 5mo stale + heavyweight transformers)
- **Phase**: 3.5 (Phase 3.5 conditional adoption alongside Tom Farley trio)
- **Install** (lightweight subset only):
  ```bash
  pip install --no-cache-dir llm-guard==0.3.16
  # USE ONLY: prompt_injection.py + secrets.py + regex.py + token_limit.py
  # SKIP transformer-heavy: ban_topics + toxicity
  ```

### Δ26 (NEW): `ace-agent/ace` (STUDY-PILOT — research adoption track)
- **Cite**: `ace-agent/ace @ HEAD 4f679bef3b78e973a0e13a0acc2b4a7f6f7e41a2` (Stanford+SambaNova+UCB, ICLR 2026, Apache-2.0)
- **License**: Apache-2.0 ✅
- **Grade B+** (research framework)
- **CR-12**: GENUINELY-NEW
- **Status**: STUDY-PILOT.b (30-day pilot per Probe 7.b 5-clause)
- **Phase**: 5 (Code intelligence) — alternative to ACON
- **MEASURED**: +10.6% AppWorld; +8.6% FiNER+XBRL; -86.9% adaptation latency
- **Install**:
  ```bash
  git clone --depth 1 https://github.com/ace-agent/ace.git Z:/claude-sota-installed/.local/ace
  cd Z:/claude-sota-installed/.local/ace
  uv sync
  ```

## §2 — REJECT-AT-LAYER (validates W226-M R0 findings)

### Streaming/realtime layer — REJECT-AT-LAYER (W233-W validates W226-M)
**Rationale**: Best-in-class candidates (livekit-agents B+, pipecat B+) fail Probe 5 (persistent agent-server vs autonomous /loop) + Probe 7.a (DEMAND-ABSENCE).

**Cite-class only adoption**: `sparfenyuk/mcp-proxy` (Grade A-) as stdio↔HTTP+SSE bridge architecture reference. **NOT INSTALLED** — documentation reference only.

**Future reconsideration**: IF operator commits to voice/video workflow (e.g., voice narration of /goal runs, WebRTC screen-share), revisit livekit-agents vs pipecat tiebreak.

## §3 — Cumulative Phantom-Cite Catches Updated: n=27 → n=34

W233 added 7 NEW catches (all from Agent X):
28. `iamgroot42/piiranha` — HF model card not GitHub repo
29. `google/shieldgemma` — HF model only, no library
30. `openai/moderation` — API endpoint not OSS repo
31. `anthropics/constitutional-ai-mcp` — training technique not MCP
32. `promptarmor/prompt-armor` — 404 GitHub
33. `lakera-ai/lakera-mcp-server` — closed-source SaaS only
34. `scrubadub/scrubadub` (wrong path; actual: `LeapBeyond/scrubadub` deferred)

NEW STRUCTURAL BLOCKERS catalogged:
- `trufflesecurity/trufflehog` AGPL-3.0 (Probe 6 license-incompatible)
- `deadbits/vigil-llm` ABANDONED 16mo (Axis 3 FAIL)
- `protectai/rebuff` STALE >12mo (Axis 3 FAIL)

All to be added to `docs/verified-avoid.md` Cohort 1 (failed adoption) + Cohort 2 (license-blocker) updates per `verified-avoid.md` cohort discipline.

## §4 — Revised Catalog Counts (W231 vs W234)

| Disposition | W229 (initial) | W231 (S+T+U revised) | W234 (this synthesis) |
|---|---|---|---|
| ADOPT-NOW | ~50 | ~28 | **~28** (NET: -1 Tom Farley × 3 trio, +5 W233 additions, -1 duplicates) |
| STUDY-PILOT.b | ~22 | ~24 | **~28** (+ACE, +llm-guard pilot scoping, +NeMo conditional) |
| REJECT-FOR-FIT | ~85 | ~85 | **~92** (+7 W233 phantoms, +3 ABANDONED/AGPL) |
| HONEST-NON-FINDING REJECT-AT-LAYER | 0 | 0 | **+1** (streaming/realtime layer entire-scope) |

## §5 — BLOCKING Pre-Conditions (CARRIED FORWARD from W231 §1 + EXPANDED)

### §5.a Infrastructure isolation (Agent S — unchanged)
- OLLAMA_HOST=127.0.0.1:11701 (avoid CLIProxyAPI :11700 collision)
- Z:/venvs/sss-pure isolated Python venv
- npm prefix Z:/npm-global
- docker network create sss-pure-net

### §5.b Secret-management bootstrap (Agent T — unchanged)
- sops + age + .env.encrypted (Phase 0 sigstore-verified)
- `tools/eee.ps1` calls `sops -d .env.encrypted` → env vars

### §5.c `_secret_redactor.py` 9-NEW-pattern update (Agent T Q4.3 — unchanged)
- ElevenLabs / Langfuse-public / NEXTAUTH_SECRET / DATABASE_URL / Ed25519-private / age-private / ntfy-topic / MotherDuck-token / generic-OpenSSH-PEM

### §5.d Version-pin discipline (Agent T Q2.1 CRITICAL — EXPANDED with W233 additions)
ALL install commands version-pinned:
- W231 Phase 4 CLI: `ccusage@1.0.0`, `difftastic@0.65.1`, `tokei@13.0.0-alpha.4`, `du-dust@1.2.4`, `bottom@0.11.0`
- W234 Phase 5 NEW: `leanctx==0.3.1`, `presidio-analyzer==2.2.359`, `presidio-anonymizer==2.2.359`, `presidio-structured==0.0.4`, `llm-guard==0.3.16`
- W234 Phase 5 NEW (git-cloned): `microsoft/acon @ d63f9ae1`, `ace-agent/ace @ 4f679bef` (pin SHA per CR-9)

### §5.e Pattern D codex T1 BRIDGE-MODE review (Agent S+T+U convergent — REQUIRED)
**This Wave 234 synthesis itself MUST be Pattern D reviewed BEFORE any Phase 1 commit**:
```powershell
codex exec --ephemeral -p deep-review-exec --color never `
  < tmp/wave234-commit-prompt.txt `
  2>&1 | tee .claude/state/codex_consult_w234_pre_commit_OUT.txt
```

### §5.f FM-09 2nd-stage validation (W233-V + W233-X — NEW)
All 3 W233 sota-researcher agents ran as Sonnet stand-ins (per CLAUDE.local.md ENV (g) inheritance). **Mandatory FM-09 2nd-stage validation** per `Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md` — base rate 100% requires harness-fit-aware 2nd-stage agent for every ADOPT-NOW from Sonnet stand-in.

**Required 2nd-stage probes**:
1. ACON: `Z:/claude-sota-installed` Probe DAG 1-7 (especially Probe 5 mode-harness-shape: does sss host research-grade train/eval pipelines? + Probe 7.b 5-clause for agent-context compression demand)
2. leanctx: Probe 5 (autonomous /loop SDK fit; pip-installable; Anthropic/OpenAI/Gemini multi-provider — but sss canonically Claude-only)
3. presidio: Probe 7.b 5-clause for PII data path existence (does sss handle PII-bearing data today?)

## §6 — Revised Install Order (W231 §2 amended with W234 additions)

### Phase 0 — Foundation (sigstore-verified) — unchanged
- sops + age

### Phase 1 — Memory Stack L1+L3 — unchanged
- mcp-memory-service@10.51.3 (INSTALLED)
- graphiti-core@0.29.0 + FalkorDB@1.6.1 (INSTALLED)

### Phase 2 — Tier-A SOTA CLI — unchanged
- ripgrep / fd / bat / eza / hyperfine / tokei / dust / bottom / gh / jq / yq (version-pinned per §5.d)

### Phase 2.5 — Governance baseline EARLY (Agent U) — EXPANDED
- canonical.md + Must-Never #3 + audit-action-loop.md (inherited)
- safety-guard hook
- **NEW Δ24 microsoft/presidio** PII NER (paired with `_secret_redactor.py` 9-pattern update §5.c)

### Phase 3 — Cross-model gate hooks (Tier 1a) — unchanged
- codex T1-T7 hooks per manifest §Section 2

### Phase 3.5 — Cryptographic governance + safety conditional — EXPANDED
- Tom Farley trio STUDY-PILOT.b (Cedar+Ed25519 source-audit)
- **NEW Δ25 protectai/llm-guard** STUDY-PILOT.b (lightweight scanner subset only)

### Phase 4 — Tier-B CLI + dev tools — unchanged

### Phase 5 — Code intelligence — EXPANDED
- gitnexus / ast-grep / serena / semgrep / osv-scanner / typos
- **NEW Δ22 microsoft/acon** ADOPT-NOW (agent-context-compression)
- **NEW Δ23 jia-gao/leanctx** ADOPT-NOW (production Claude-Code-targeted SDK)
- **NEW Δ26 ace-agent/ace** STUDY-PILOT.b (research adoption track; alternative to ACON)

### Phase 6 — Observability (SPLIT per Agent U) — unchanged
- 6.a Langfuse MIT-core / 6.b Cost telemetry / 6.c Tracing / 6.d Eval (promptfoo ONLY here)

### Phase 7 — Document/visual processing — unchanged
- PaddleOCR@2.10.0 + Baidu disclosure
- mkdocs

### Phase 8 — Web/voice/image — unchanged
- playwright-cli + SKILLs (per W223-K revision)
- chrome-devtools-mcp (CONFIRM `.mcp.json:41` already-wired)
- elevenlabs-mcp

### Phase 9 — RAG — unchanged (operator decision: onyx vs ragflow)

### Phase 10 — Notifications + workflow harness — unchanged
- ntfy-mcp self-hosted + cryptographic-random topic
- mcp-builder skill

### Phase 11 — Cryptographic governance ADOPT-NOW — conditional (IF Phase 3.5 audit PASS)
- protect-mcp / review-agent-governance / signed-audit-trails (Tom Farley)

### REJECTED-AT-LAYER (no Phase)
- **Streaming/realtime layer** (W233-W) — REJECT-AT-LAYER; no Phase allocated. Cite-class reference only: `sparfenyuk/mcp-proxy`.

## §7 — Forward Queue (post-Phase-1-commit)

- F1: Cite-anchor migration ship — 50+ rule files reference retired `Z:/claude-sota/` paths (W222-H)
- F2: Pattern D codex T1 BRIDGE-MODE review on THIS Wave 234 synthesis BEFORE any Phase 1 commit (§5.e)
- F3: Phase 4 Tier-A SOTA CLI batch install (after §5.d version-pin complete)
- F4: `docs/verified-avoid.md` cohort updates (n=34 phantom catches + 13+ REJECT additions)
- F5: Tom Farley trio Phase 3.5 evaluation (30d burn + crypto audit)
- F6: FM-09 2nd-stage validation on W233 ADOPT-NOW Sonnet stand-in verdicts (§5.f)
- F7 (NEW): ACON vs ACE adoption tiebreak after 30d STUDY-PILOT.b on either OR both
- F8 (NEW): Presidio Probe 7.b 5-clause final operator decision (PII data path verification)

## §8 — verdict_one_line

`PRE-INSTALL-COMMIT-READY-v2: W234 integrates W230 (S+T+U convergent NEEDS-REVISION) + W233 (V token compression + W streaming HNF + X privacy/PII) into revised W231 catalog; ADDS 5 new candidates (microsoft/acon ADOPT-NOW PRIMARY agent-context-compression Grade A + jia-gao/leanctx ADOPT-NOW SECONDARY production Claude-Code-targeted Grade A + microsoft/presidio ADOPT-NOW PII-NER Grade A- + ace-agent/ace STUDY-PILOT.b ICLR 2026 + protectai/llm-guard STUDY-PILOT.b 5mo-stale subset); CONFIRMS streaming layer REJECT-AT-LAYER (W226-M R0 structurally correct); UPDATES phantom-cite catalog to n=34; LLMLingua disposition KEEP-AS-CITE-CANONICAL + REPLACE-FOR-AGENT-CONTEXT with ACON; orchestrator MUST execute §5 BLOCKING pre-conditions (a-f) + F2 Pattern D codex T1 BRIDGE-MODE review + F6 FM-09 2nd-stage validation BEFORE any Phase 1 commit`

VERDICT: **READY-FOR-COMMIT** (post §5 pre-conditions + F2 Pattern D review + F6 FM-09 2nd-stage)
