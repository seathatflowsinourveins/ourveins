# Wave 233-X — Privacy / PII / Content-Safety / Guard-Model SOTA Audit (May 2026)

**Agent**: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (g); STAND-IN-NOTICE: cross-model gate NOT structurally satisfied — orchestrator must file 2nd-stage validation for ADOPT-NOW per FM-09 base-rate 100%)
**Date**: 2026-05-15
**Hypothesis**: claude-sota-pure needs privacy/PII/content-safety layer beyond `_secret_redactor.py` 9-pattern + `safety_guard.py` deny-list + `gitleaks_pre_commit_gate.py` 222-rule scan

## §1 Phantom-cite results (n=7 NEW catches this wave)

| Candidate | Status | Stars | License | Last push | Notes |
|---|---|---|---|---|---|
| `microsoft/presidio` | ✅ 200 | 8,075 | MIT | 2026-05-14 | PII detection + anonymization SDK |
| `protectai/llm-guard` | ✅ 200 | 2,954 | MIT | 2025-12-15 | 22 input + 20+ output scanners |
| `protectai/rebuff` | ✅ stale | n/a | n/a | >12mo | STALE (Axis 3 FAIL) |
| `gitleaks/gitleaks` | ✅ 200 | 27,001 | MIT | 2026-05-13 | **INCUMBENT** (W97) |
| `trufflesecurity/trufflehog` | ✅ 200 | 26,311 | **AGPL-3.0** | 2026-05-15 | 🚫 PROBE 6 STRUCTURAL BLOCKER |
| `Yelp/detect-secrets` | ✅ 200 | 4,511 | Apache-2.0 | 2026-04-02 | 25+ plugins; pre-commit framework |
| `secretlint/secretlint` | ✅ 200 | 1,395 | MIT | 2026-05-15 | Pluggable secret linter (npm) |
| `NVIDIA-NeMo/Guardrails` | ✅ 200 | 6,131 | Apache-2.0 | 2026-05-15 | Programmable guardrails (Colang) |
| `guardrails-ai/guardrails` | ✅ 200 | 6,868 | Apache-2.0 | 2026-05-13 | Validators framework |
| `leondz/garak` | ✅ 200 | n/a | Apache-2.0 | 2026-05-08 | LLM red-teaming (NOT runtime guard) |
| `deadbits/vigil-llm` | ✅ 200 | 479 | Apache-2.0 | **2024-01-31** | 🚫 ABANDONED >16mo |
| `scrubadub/scrubadub` | ❌ 404 | — | — | — | **PHANTOM** (wrong path) |
| `iamgroot42/piiranha` | ❌ 404 | — | — | — | **PHANTOM** (HF model card, not repo) |
| `promptarmor/prompt-armor` | ❌ 404 | — | — | — | **PHANTOM** |
| `lakera-ai/lakera-mcp-server` | ❌ 404 | — | — | — | **PHANTOM** (closed-source SaaS) |
| `openai/moderation` | ❌ 404 | — | — | — | **PHANTOM** (API endpoint, not repo) |
| `google/shieldgemma` | ❌ 404 | — | — | — | **PHANTOM** (HF model only) |
| `anthropics/constitutional-ai-mcp` | ❌ 404 | — | — | — | **PHANTOM** (training pattern, not MCP) |
| `opendp/opendp` | ✅ 200 | n/a | MIT | recent | Differential privacy SDK (DEFER) |

## §2 Top-5 candidates × convergence-gate ALL 4 axes

### Candidate 1: `microsoft/presidio` (PII sub-layer)
- **Axis 1**: ✅ PASS — Microsoft + PyPI 4-package suite + HF integrations + Anthropic/OpenAI cookbook patterns
- **Axis 2**: ✅ PASS — Omri Mendels et al. + OpenSSF Best Practices badge #6076 + Microsoft Build talks 2024-2025
- **Axis 3**: ✅ STABLE-BURN-IN — 7y age; 8,075★; cpd ≈ 3.2; pushed 2026-05-14
- **Axis 4**: ⚠️ PARTIAL — Probe 5 heavyweight (SpaCy NLP + ~750MB en_core_web_lg); Probe 6 MIT ✅; Probe 7 demand-gate test pending

### Candidate 2: `protectai/llm-guard` (multi-scanner)
- **Axis 1**: ✅ PASS — ProtectAI (Palo Alto acq'd 2024-08) + HF Spaces + LangChain integration + OWASP LLM Top 10 mentions
- **Axis 2**: ✅ PASS — Laiyer-AI team + multiple OWASP mentions
- **Axis 3**: ⚠️ CAVEAT — 2.6y age; **last push 2025-12-15 = >5mo stale**; ProtectAI post-acquisition product shift
- **Axis 4**: ⚠️ PARTIAL — heavyweight transformers; pick-and-choose scanner subset only

### Candidate 3: `gitleaks/gitleaks` (secret-scanning)
- **Axis 1-3**: ✅ all firm PASS
- **Axis 4**: 🚫 DUPLICATE-FUNCTIONALITY — **ALREADY INCUMBENT** at `Z:/claude-sota-installed/.claude/hooks/scripts/gitleaks_pre_commit_gate.py` (W97) + binary `.local/bin/gitleaks.exe` v8.30.1
- **For pure**: ADOPT-NOW canonical

### Candidate 4: `Yelp/detect-secrets`
- **Axis 1-3**: ✅ all firm PASS (~7.4y age; 4,511★; Yelp + pre-commit.com framework)
- **Axis 4**: ⚠️ PARTIAL-OVERLAP — JWT/openai/stripe plugins add coverage gitleaks misses; entropy-based detection complementary

### Candidate 5: `NVIDIA-NeMo/Guardrails` (programmable guard)
- **Axis 1-3**: ✅ all PASS — 2.1y; 6,131★; cpd ~8.07; Apache-2.0 (LICENSE-Apache-2.0.txt verified, NOASSERTION = multi-license artifact NOT blocker)
- **Axis 4**: ⚠️ Probe 7 demand-gate WEAK — no current sss workflow routes through programmable guardrails

## §3 Per-candidate A-F grade (10-dim rubric)

| Candidate | Phantom | Conv-gate | Probe-DAG | Use-case | Demand | Risk | Cite-class | Recovery | Doc | Cross-model | **Final** |
|---|---|---|---|---|---|---|---|---|---|---|---|
| microsoft/presidio | A | A | B+ | A | A | A | A | A | A | B | **A-** |
| protectai/llm-guard | A | B+ (5mo stale) | B | B+ | C+ | B | A | B | A | B | **B+** |
| gitleaks/gitleaks | A | A | F (incumbent) | A | A | A | A | A | A | B | **F (DUP)** |
| Yelp/detect-secrets | A | A | B+ | B+ | B | A | A | A | A | B | **A-** |
| NVIDIA-NeMo/Guardrails | A | A | C (heavy) | C+ | D (no demand) | B | A | B | A | B | **C+** |

## §4 CR-12 6-class disposition

| Candidate | CR-12 disposition | Rationale |
|---|---|---|
| **microsoft/presidio** | **GENUINELY-NEW** for claude-sota-pure | No incumbent PII NER; complements `_secret_redactor.py` regex tier with NER+context-aware |
| **protectai/llm-guard** | **PROVIDER-COMPLEMENT + PARTIAL-OVERLAP** | Provides prompt-injection + output safety LLM-judge; overlaps secrets scanner. Pick-and-choose |
| **gitleaks/gitleaks** | **DUPLICATE (sss) / CITE-CLASS-CANONICAL (pure)** | sss has incumbent W97; pure installs as canonical |
| **Yelp/detect-secrets** | **PARTIAL-OVERLAP** | Plugin+baseline workflow complementary; regex+entropy overlaps gitleaks; pick ONE |
| **NVIDIA-NeMo/Guardrails** | **DEMAND-ABSENCE (sss) / DEMAND-CREATES-NEW.b (pure conditional)** | No current workflow routes through programmable guardrails |

**Phantom / ABANDONED / BLOCKER REJECTS** (not scored):
- trufflesecurity/trufflehog — AGPL-3.0 STRUCTURAL BLOCKER (Probe 6)
- deadbits/vigil-llm — ABANDONED 16mo (Axis 3 FAIL)
- protectai/rebuff — STALE >12mo (Axis 3 FAIL)
- 7 PHANTOMS (404): piiranha / promptarmor / lakera-mcp / openai/moderation / shieldgemma / constitutional-ai-mcp / scrubadub-wrong-path

## §5 Top-3 ADOPT-NOW with install commands (CR-6 + CR-9)

### #1 — `microsoft/presidio` (PII sub-layer, SOTA primary)
```bash
pip install --no-cache-dir \
  presidio-analyzer==2.2.359 \
  presidio-anonymizer==2.2.359 \
  presidio-structured==0.0.4
python -m spacy download en_core_web_lg  # NER dep ~750MB
```
Pre-install REVERT-check per CR-9: `git -C Z:/claude-sota log --all --oneline -- 'presidio*'` → confirm no prior REVERT precedent.
Hook integration: PreToolUse on `Edit|Write|MultiEdit` matching design-surface; invoke as `pii_pre_edit_gate.py` analogous to `gitleaks_pre_commit_gate.py`.

### #2 — `Yelp/detect-secrets` (selective complement only)
```bash
pip install --no-cache-dir detect-secrets==1.5.0
detect-secrets scan --baseline .secrets.baseline
```
**Use case**: ONLY if pure decides to enforce JWT/openai/stripe plugins gitleaks misses; otherwise CR-12 DUPLICATE → SKIP per kiss-dry-yagni Must-Never #4.

### #3 — `protectai/llm-guard` (prompt-injection sub-layer, pick-and-choose)
```bash
pip install --no-cache-dir llm-guard==0.3.16
# Lightweight subset ONLY: prompt_injection.py + secrets.py + regex.py + token_limit.py
# SKIP transformer-heavy ban_topics/toxicity
```
**Caveat**: 5mo stale; pin to last-known-good release.

## §6 Complementarity vs existing sss layers

| Existing layer | Coverage | Gap | Top-3 fills? |
|---|---|---|---|
| `_secret_redactor.py` 9-pattern (W230-T Q4.3) | Anthropic-OAuth / JWT / Google-API / GitHub-PAT / AWS / Langfuse / OpenAI / refresh / auth.json | NO context-aware NER (PII names/emails/SSN/addresses) + NO entropy | **Yes — Presidio** |
| `safety_guard.py` 12-pattern destructive-Bash (Wave 11A floor) | rm -rf / git push --force / DROP TABLE / docker prune / kubectl delete / chmod 777 / fork bomb / mkfs / dd | NO prompt-injection detection + NO LLM-output moderation | **Partial — llm-guard input scanners** |
| `gitleaks_pre_commit_gate.py` 222-rule (W97) | Commit-time secret scan | No runtime/pre-edit; pre-commit only | **None** — gitleaks already covers |
| cognee runtime safety (W221 + W226-N) | Memory/RAG provenance | NO PII at LLM-call boundary | **Presidio** as cognee preprocessing |
| `audit-action-loop.md` discipline | Audit-emit + drift surface + close | Discipline only — no scanning primitive | **None** — discipline not tooling |

**Key gap closures**:
1. **PII NER**: SOLVED by Presidio
2. **Prompt-injection**: PARTIAL by llm-guard.prompt_injection (lightweight subset)
3. **Output moderation**: GAP REMAINS (shieldgemma=HF-only; PurpleLlama W228-R STUDY-PILOT.b)
4. **Secret-detection**: SOLVED by incumbent gitleaks; detect-secrets marginal (DEFER)
5. **Policy enforcement**: out-of-scope (W229 protect-mcp covers Cedar)
6. **Differential privacy**: opendp DEFER until DP workflow demand
7. **GDPR/HIPAA**: presidio covers via NER recognizers

**W230-T Q5.3 Cedar+Ed25519 crypto precedent**: NO NEW key-material introduced by Top-3:
- Presidio: pure detection/anonymization, no signing
- detect-secrets: regex+entropy, no crypto
- llm-guard: regex+model scanners, no crypto

**Probe 6 license explicit flags**:
- ✅ Presidio MIT / detect-secrets Apache-2.0 / llm-guard MIT / NeMo Apache-2.0
- 🚫 trufflehog AGPL-3.0 REJECTED

## §7 Honest Conclusion

**Hypothesis verdict**: **PARTIAL-CONFIRM** — sss/pure needs PII layer (Presidio) + lightweight prompt-injection scanner (llm-guard subset). Secret-scanning already saturated (incumbent gitleaks).

**Retractions** (claims that failed R3 verification):
- Initial brief listed `iamgroot42/piiranha`, `google/shieldgemma`, `openai/moderation` — all PHANTOM. HF models only, not installable repos per CR-5.
- `anthropics/constitutional-ai-mcp` — PHANTOM. Constitutional-AI is training technique (Bai et al. 2022), not MCP.
- `trufflesecurity/trufflehog` — strong by stars/recency but Probe 6 AGPL-3.0 STRUCTURAL BLOCKER.

**Recommended next steps**:
1. **Mia pre-apply** on Presidio: probe pure for actual PII data paths. If absent → DEFER per Probe 7.a DEMAND-ABSENCE.
2. **2nd-stage harness-fit validation per FM-09** MANDATORY — this dispatch ran as Sonnet stand-in.
3. **Decision tree**: Presidio adoption only if PII path verified; llm-guard only if prompt-injection workflow exists; detect-secrets DEFER.

verdict_one_line: **PARTIAL-CONFIRM** — Top-3 by SOTA convergence-gate: **Presidio (PII NER, GENUINELY-NEW), llm-guard scanner-subset (PARTIAL prompt-injection, PROVIDER-COMPLEMENT), detect-secrets (PARTIAL-OVERLAP with gitleaks, DEFER unless JWT-specific demand)**; Probe 6 BLOCKER on trufflehog AGPL-3.0; 7 NEW phantoms (shieldgemma/openai-moderation/piiranha/constitutional-ai-mcp/promptarmor/lakera-mcp/scrubadub-wrong-path); Mia pre-apply + 2nd-stage FM-09 validation MANDATORY before any install.
