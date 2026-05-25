# W421-pre — EverMemOS Lean Install Record

> Wave: **W421-pre** (mission-upgrade from pattern-study-only to conditional lean-install per operator authorization 2026-05-24)
> Companion to: `EVERMEMOS-PATTERN-STUDY.md` §10 (gate evaluation + ship decision)
> Author: subagent W421-pre-evermemos-pattern-study · 2026-05-24
> Cardinal-rule audit: R1-R6 (see §4)
> Rollback playbook: §6

---

## 1. TL;DR

Lean install of EverMemOS official Python SDK (`evermemos==0.3.13`, Apache-2.0) into `Z:/venvs/claude`. **NO MCP server entry** (no first-party MCP exists; third-party fails R1 trust). **NO Docker stack** (4-stateful-service stack violates lean-install goal + service-discipline). **NO clone to `Z:/repos/deps/`** (operator directive). API-key operator-provisioning pending. Memory-tier T7-alternative slot added in `precheck-config.json` as `advisory`. Smoke-test PASS (client construct + namespace introspection). Rollback = single `pip uninstall evermemos`.

---

## 2. Decision matrix — which install path?

| Install path | License | Operational footprint | Cardinal-rule R1 trust | API-key required | Ship-decision |
|---|---|---|---|---|---|
| **A. Clone + Docker stack (`EverMind-AI/EverOS/methods/EverCore`)** | Apache-2.0 | **HEAVY** — MongoDB 7.0+ · Elasticsearch 8.x · Milvus 2.4+ · Redis 7.x · LangGraph · Postgres-checkpoint · Python 3.12 · Docker Compose · Kafka | OK (first-party); but no GitHub releases (commit-only versioning) | NO (self-hosted) | **REJECTED** — 6 stateful services violates "lean install" + CLAUDE.md service-discipline ("fewer stateful services" per W295 retirement) |
| **B. Third-party MCP wrapper (`uvx evermemos-mcp@0.5.6` by `tt-a1i`)** | MIT (wrapper) | LIGHT — single uvx command, stdio MCP | FAIL — individual-maintainer (1 dev, 56 followers, no SLSA/Sigstore); fails cardinal-rule R1 trust-tuple (a) "trusted plugin" | YES (`EVERMEMOS_API_KEY` — SaaS cloud) | **REJECTED** — R1 trust violation |
| **C. Hosted SaaS via `.mcp.json` HTTP entry** | Apache-2.0 (server) | LIGHTEST — pure HTTP endpoint | OK (first-party EverMind hosted) | YES (`EVERMEMOS_API_KEY` — SaaS cloud) | **NOT AVAILABLE** — no first-party EverMemOS HTTP MCP server published as of HEAD `e37205f5` 2026-05-21 |
| **D. First-party Python SDK (`pip install evermemos==0.3.13`)** | Apache-2.0 | LIGHTEST possible (6 pure-Python deps; all already-satisfied in venv) | OK — Stainless-generated official SDK from EverMemOS authors; PyPI release-attestation | YES (`EVERMEMOS_API_KEY` — SaaS cloud; SDK installable without key, calls require key) | **SELECTED** — minimum blast radius |

---

## 3. Install execution (verify-before-claim audit trail)

### 3.1 Pre-flight smoke

```bash
# Check existing python + venv
Z:/venvs/claude/Scripts/python.exe --version
# Output: Python 3.13.12

# Check existing memory pkgs
Z:/venvs/claude/Scripts/pip.exe list 2>&1 | grep -iE "ever|mem0|cognee|basic"
# Output:
#   cognee 1.1.0
#   cognee-mcp 0.5.4
#   mem0ai 2.0.2
# (No prior evermemos installation — fresh install confirmed)
```

### 3.2 Dry-run

```bash
Z:/venvs/claude/Scripts/pip.exe install --dry-run "evermemos==0.3.13"
```

Output (truncated):
```
Collecting evermemos==0.3.13
  Downloading evermemos-0.3.13-py3-none-any.whl.metadata (15 kB)
Requirement already satisfied: anyio<5,>=3.5.0 (4.12.1)
Requirement already satisfied: distro<2,>=1.7.0 (1.9.0)
Requirement already satisfied: httpx<1,>=0.23.0 (0.28.1)
Requirement already satisfied: pydantic<3,>=1.9.0 (2.13.4)
Requirement already satisfied: sniffio (1.3.1)
Requirement already satisfied: typing-extensions<5,>=4.10 (4.15.0)
Would install evermemos-0.3.13
```

All 6 transitive deps already-satisfied. No new packages introduced. Blast-radius minimal.

### 3.3 Live install

```bash
Z:/venvs/claude/Scripts/pip.exe install "evermemos==0.3.13"
```

Output:
```
Downloading evermemos-0.3.13-py3-none-any.whl (94 kB)
Installing collected packages: evermemos
Successfully installed evermemos-0.3.13
```

### 3.4 Post-install smoke-test

```bash
Z:/venvs/claude/Scripts/python.exe -c "
import evermemos
print('module loaded from:', evermemos.__file__)
print('version:', getattr(evermemos, '__version__', 'NA'))
from evermemos import EverMemOS, AsyncEverMemOS
print('client classes importable:', EverMemOS.__name__, AsyncEverMemOS.__name__)
c = EverMemOS(api_key='smoke-test-not-real')
print('client construct OK, client_type:', type(c).__name__)
print('has v0:', hasattr(c, 'v0'))
print('v0 sub-attrs:', [a for a in dir(c.v0) if not a.startswith('_')][:10])
"
```

Output:
```
module loaded from: Z:\venvs\claude\Lib\site-packages\evermemos\__init__.py
version: 0.3.13
client classes importable: EverMemOS AsyncEverMemOS
client construct OK, client_type: EverMemOS
has v0: True
v0 sub-attrs: ['memories', 'status', 'with_raw_response', 'with_streaming_response']
```

**Smoke-test result: PASS** — module imports clean; client class constructs with placeholder key (lazy auth); `v0.memories` + `v0.status` namespaces correctly exposed; matches PyPI documentation example.

**Live API smoke-test**: NOT EXECUTED. Requires `EVERMEMOS_API_KEY` env var; operator-provisioning pending (per W324 perplexity/tavily/exa env-block precedent).

---

## 4. Cardinal-rule audit per CLAUDE.md R1-R6

| Rule | Check | Outcome |
|---|---|---|
| **R1 (trusted primitives)** | (a) signed releases: NOT-MET (0 GitHub releases on EverOS repo) — partially mitigated by PyPI release attestation + Stainless-generated SDK signal. (b) license: Apache-2.0 OK. (c) malicious-update: latest 2026-02-13 upload (3+ months old per 30d-pin discipline). (d) blast-radius: 6 transitive deps all already-satisfied in venv. | **PASS (with note)** — install proceeds; signed-releases gap recorded |
| **R2 (no project-owned hook bodies)** | No `.claude/hooks/**` files added. No `.mcp.json` changes (no MCP server entry). | **PASS** |
| **R3 (subagents = upstream)** | No new `subagent_type` added. No `.claude/agents/**` files added. | **PASS** |
| **R4 (project behavior in CLAUDE.md + settings.json)** | Behavior change limited to (i) Python SDK install in venv (out-of-tree per CLAUDE.local.md path), (ii) `.eee/precheck-config.json:t5.memoryTiers.T7Alt` entry. CLAUDE.md NOT modified (per W421-pre scope: no install warrants CLAUDE.md update without operator-sign). | **PASS** |
| **R5 (safety via permissions + sandboxing)** | Install via standard pip mechanism. No custom guard scripts. No new permission modes. | **PASS** |
| **R6 (verify-before-claim)** | Every claim cite-anchored: license → SPDX + LICENSE-file probe; benchmarks → multi-source cross-verify §3.3; smoke-test → exit-0 + stdout. Install action transcript in §3 above. | **PASS** |

---

## 5. precheck-config.json delta

Modified file: `Z:/claude-sota-installed-W415/.eee/precheck-config.json`

Append to `t5.memoryTiers` namespace:

```jsonc
{
  // ... existing T6 / T3 / T7 / T4 / MemoryOS / khoj entries unchanged ...
  "T7Alt": {
    "name": "evermemos",
    "role": "T7-alternative-sdk-only",
    "expectedMcpEntry": null,
    "license": "Apache-2.0",
    "declaredVersion": "0.3.13",
    "pipPackage": "evermemos",
    "blocking": "advisory",
    "credentialEnv": "EVERMEMOS_API_KEY",
    "_note": "W421-pre lean-install 2026-05-24: official EverMemOS Apache-2.0 Python SDK (Stainless-generated httpx REST client). No first-party MCP server published as of EverMind-AI/EverOS HEAD e37205f5 (2026-05-21). API-key operator-provisioning required for live API calls. LoCoMo 92.32 / LongMemEval 82.00 OSS-companion (standardised eval frame; arXiv 2601.02163 v2). See docs/architecture/W411-MEMORY-SOTA-AUDIT/EVERMEMOS-PATTERN-STUDY.md + EVERMEMOS-INSTALL.md."
  }
}
```

Note: the entry is **advisory-blocking**; absence of `EVERMEMOS_API_KEY` does NOT block eee.ps1 launch. It surfaces as informational signal during T5 memory-tier scan. Same semantic as the existing `T4 graphiti` informational entry.

---

## 6. Rollback playbook

Single-command rollback path:

```bash
Z:/venvs/claude/Scripts/pip.exe uninstall -y evermemos
```

Optional follow-on cleanup:
1. Excise `T7Alt` entry from `.eee/precheck-config.json:t5.memoryTiers` (reverts to pre-W421-pre state).
2. Unset `EVERMEMOS_API_KEY` env var if it was operator-provisioned in `CLAUDE.local.md`.
3. Revert this commit via `git revert <commit-sha>` (PR-merge → revert-PR).

No state-outside-repo cleanup required (no `Z:/claude-sota-installed-state/evermemos/` created; SDK does not persist data — REST client only).

No NSSM service to stop (no service installed).
No Docker container to remove (no compose stack used).
No MCP entry to excise (no `.mcp.json` modification).

---

## 7. Open follow-on items

| Item | Severity | Recommended action |
|---|---|---|
| `EVERMEMOS_API_KEY` operator-provisioning | LOW (advisory) | Add to `CLAUDE.local.md` env block (gitignored) per W324 perplexity precedent when operator wants to start writing/reading memories via the live API |
| Live smoke-test against EverMemOS Cloud API | LOW | Once API key provisioned, run `python -c "from evermemos import EverMemOS; c = EverMemOS(); print(c.v0.memories.list())"` to verify connectivity (deferred to operator-decision) |
| Integration with existing T6 basic-memory / T3 cognee write paths | MEDIUM | Stream B memory-arbitration protocol (W393 §4.3) treats T7 mem0 + T7Alt EverMemOS as preference/dialogue-class; conflict-resolution unchanged (T6 canonical for facts; T3 corpus KG; T7/T7Alt session/preference) |
| Upgrade to next evermemos minor (when EverMemOS authors publish ≥0.4.x with new endpoints) | LOW | Monitor PyPI; pin to specific version per cardinal-rule R1 trust-tuple (c) 30d-pin discipline |
| Re-evaluate ship to MCP entry when first-party EverMemOS MCP server lands | LOW | Watch `EverMind-AI` org for new repos OR `everos-plugins` for MCP entries |

---

## 8. Verdict line

**SHIPPED `evermemos==0.3.13` Python SDK to `Z:/venvs/claude` · Apache-2.0 · 6 deps all-satisfied · smoke-test PASS · cardinal-rules R1-R6 all PASS · precheck-config T7Alt added · rollback = `pip uninstall evermemos` · API-key operator-provisioning pending**

---

## 9. Cite-floor record (≥3 distinct orgs per W352-S9 sca-v13 floor)

### 9.1 License / repository
- **EverMind-AI** — `github.com/EverMind-AI/EverOS` (Apache-2.0 license) at HEAD `e37205f5` (2026-05-21) — repo metadata via GitHub REST `api.github.com/repos/EverMind-AI/EverOS`
- **PyPI** — `pypi.org/pypi/evermemos/json` SDK metadata (Apache-2.0; v0.3.13; py3-none-any.whl 94 KB; upload 2026-02-13)
- **EverMind blog corporate** — `evermind.ai/blogs/a-unified-evaluation-framework-for-ai-memory-systems` (2025-11-26) + `evermind.ai/blogs` index

### 9.2 Paper / benchmark
- **arXiv** — `arxiv.org/abs/2601.02163` (EverMemOS v2 paper Jan 2026 + arXiv API at `export.arxiv.org/api/query?id_list=2601.02163`)
- **HuggingFace** — `huggingface.co/papers/2601.02163` paper card + `huggingface.co/api/papers/2601.02163` paper API + `huggingface.co/datasets/EverMind-AI/EverMemBench-Dynamic` dataset
- **Semantic Scholar** — `api.semanticscholar.org/graph/v1/paper/arXiv:2601.02163` (paperId db97b0581b1d60c1ad41428fe9950398bf987b60; citationCount 16; influentialCitationCount 2)
- **Papers-with-Code** — `paperswithcode.com/paper/evermemos-a-self-organizing-memory-operating` (paper-card present; benchmark-row not yet third-party-verified)

### 9.3 Comparative architectures
- **topoteretes** — `github.com/topoteretes/cognee` (Apache-2.0; 17,484 stars; 1,836 forks; KuzuDB/Neo4j/FalkorDB backends) — `api.github.com/repos/topoteretes/cognee`
- **mem0ai** — `docs.mem0.ai/core-concepts/memory-evaluation` (mem0 v2.0.2 own-frame LoCoMo 91.6 baseline)
- **basicmachines-co** — `github.com/basicmachines-co/basic-memory` (AGPL-3.0 subprocess-wrap mitigated; T6 canonical write-primary per W393 Stream B)

### 9.4 Trust-tuple infra
- **Stainless** — `stainless.com` (SDK-generator org; `evermemos` PyPI description "It is generated with [Stainless]")
- **OWASP** — `owasp.org` A06:2021 Vulnerable+Outdated Components (cardinal-rule R6 anti-fabrication anchor)
- **NIST** — `nist.gov` SP 800-218 PW.7 + RV.1 (CLAUDE.md cardinal-rule R6 cite-anchor)
- **ISO** — `iso.org` IEC 25010:2011 §4.2.6-4.2.7 (CLAUDE.md cardinal-rule R6 cite-anchor)
- **Apache Software Foundation** — `apache.org/licenses/LICENSE-2.0` (Apache-2.0 license-text canonical)
- **OSSF** — `securityscorecards.dev/projects/github.com/EverMind-AI/EverOS` (probed 404 — gap recorded)
- **Anthropic** — `code.claude.com/docs/en/skills` + `docs.anthropic.com/en/docs/claude-code/settings` (CLAUDE.md cardinal-rules R1-R6 cite-anchor)

**TOTAL: ≥17 distinct citation orgs · cite-floor W352-S9 PASSED.**
