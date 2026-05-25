# Wave 146 Fire 1 Agent A — Path P codex T1 REAL GPT-5.5 SOTA cleanliness % audit

**Mode**: REAL GPT-5.5 BRIDGE-MODE via codex CLI v0.130.0 foreground+tee (Path P; bg `bbifqdxic`)
**Wall-clock**: 180s
**Tokens**: 106,591 (codex internal)
**OUT cite**: `.claude/state/codex_consult_w146_f1_sota_cleanliness_audit_OUT.txt` L1585 (JSON verdict at EOF)

## Verdict: **NEEDS-REVISION conf=0.91**

## SOTA cleanliness percentage = **61% overall**

### By layer (L0-L8):

| Layer | % | Notes |
|---|---:|---|
| L0 Foundation | **82%** | Highest — bootstrap files + cardinal rules well-cited |
| L1 Discovery | 70% | Multi-source discovery breadth + 9-cohort menu codified |
| L2 Specification | 66% | RPI workflow + agent briefs covered |
| L3 Plan | 52% | Plan-stage cite-trail partial |
| **L4 Compare/Eval** | **42% (LOWEST)** | Eval-harness gap — promptfoo + DeepEval + inspect_ai + Phoenix experiments + ragas all PLANNED |
| L5 Construct | 74% | Hook/skill/plugin install paths well-defined |
| L6 Audit | 58% | Audit infrastructure (cosign + gitleaks + Scorecard) Wave 134 fires advancing |
| L7 Construct | 55% | Skill-creator + plugin-dev partial |
| **L8 Feedback** | **50% (2nd LOWEST)** | Observability/replay underspecified — Phoenix MCP unpinned + agent provenance schema codified but install-DORMANT |

### By dimension (A-J):

| Dim | % | Concern |
|---|---:|---|
| **C Memory** | **43% (LOWEST)** | Graphiti L3 wire INSTALLED-AMBER pending smoke probe |
| H Cross-model | 54% | T1-T7 lifecycle bootstrap-exception via Path P |
| E Evaluation | 55% | Eval-harness PLANNED |
| B Reading/Indexing | 58% | Read-path-token-waste vs shell-output gap (per Agent B I1) |
| D Code-aware | 60% | gitnexus + ast-grep + Serena partial |
| F Provenance | 63% | cosign Wave 134 Fire 44-46 partial; Fire 45 NEEDS-REVISION |
| G Discovery | 65% | Multi-source breadth codified |
| J Long-running-agents | 66% | cwc-long-running-agents 6 primitives INSTALLED-DORMANT |
| I Observability | 68% | Phoenix wired but @latest unpinned |
| A Tools | 70% | Modern Unix CLIs + WinGet + Chocolatey installs |

### Method (verbatim from codex):

> "Computed as installed-or-cite-clean primitives divided by total architectural primitives visible in the five authorized surfaces only: manifest table rows were weighted 60%, active settings and MCP wires 25%, and corrected architecture/cardinal-rule prose 15%; rows marked PLANNED, INSTALLED-PARTIAL, INSTALLED-AMBER, CITE-IMPORT-AMBER, STAGED-PENDING, DEFERRED, REJECTED, UNKNOWN, or PENDING were counted as non-clean unless the row carried an explicit TIER-1-DIRECT file:line+HEAD SHA or official-doc URL and no active runtime dependency."

## 7 Cardinal-rule breaks (P0/P1/P2)

| # | Rule | Location | Break | Priority | Mia probe |
|---|---|---|---|---|---|
| 1 | **CR-7** | `.claude/settings.json:81` + `CLAUDE.md:66-72` | defaultMode=bypassPermissions while CR-7 Phase 1 says auto | **P0** | ✅ VERIFIED literal |
| 2 | **CR-3** | `docs/sota-installed-manifest.md:60` + `.claude/settings.json:94-96` | T1 PreToolUse timeout=5s sham; manifest says INSTALLED-PARTIAL | **P0** | ✅ VERIFIED literal |
| 3 | CR-9 | `.mcp.json:84-87` | phoenix-mcp @latest unpinned | P1 | ✅ VERIFIED literal |
| 4 | CR-9 | `manifest.md:324 + :424` | ccusage + ast-grep @latest without acknowledgment marker | P2 | (queued for cross-check) |
| 5 | CR-1 | `01-corrected-architecture.md:5-7` | TIER-3-LOCAL-COMPOSITION effective_tier prescriptions | P1 | (architecture-doc-level; deferred) |
| 6 | CR-8 | `manifest.md:362-367` | CITE-IMPORT-AMBER SHA-PENDING entries | P1 | ✅ VERIFIED inline |
| 7 | CR-5 | `CLAUDE.md:344` | exception model underspecified for .claude/hooks + .claude/rules cite-imports | P2 | (hard-rule-text-clarity issue) |

## 5 Top silent failures

| # | Surface | Failure mode | Recovery | Severity |
|---|---|---|---|---|
| 1 | `.claude/settings.json:94-96` codex_t1 timeout=5 | T1 review can complete after plan exit OR timeout without being seen before execution | Make T1 sync OR add required status file checked by next Edit/Bash | P1 |
| 2 | `.claude/settings.json:145-157` cwc Bash shims | Git Bash/PYTHON_BIN/path failures silently remove default-FAIL evidence gate; 3s timeout on Windows | SessionStart hook self-test all cwc scripts; block if track-read/verify-gate cannot write/read state | P1 |
| 3 | `.claude/settings.json:38-42` OTel→Phoenix | Phoenix down OR protocol mismatch loses traces+prompt telemetry without operator-visible runtime gate | SessionStart Phoenix OTLP healthcheck + visible fallback notice; high-risk commits block if run_id/provenance missing | P1 |
| 4 | `.mcp.json:84-87` phoenix-mcp @latest | D6 today-release-auto-upgrade risk at every MCP startup | Pin @arizeai/phoenix-mcp to verified version + manifest row with smoke probe | P2 |
| 5 | (additional cited in OUT — Phoenix/MCP composite) | Composite startup risk | Defense-in-depth via daemon healthcheck | P2 |

## 5 Top error classes

| # | Class | Likelihood | Impact | Recovery |
|---|---|---|---|---|
| 1 | Phase-state drift | frequent | bypassPermissions runtime vs CR-7 Phase 1 contract | Revert defaultMode to auto OR codify temp-override with expiry+health predicates+operator warning |
| 2 | Manifest drift | frequent | 95 PLANNED + 7 AMBER + 1 PARTIAL + 24 CITE-IMPORT-AMBER + 29 PENDING; operators overestimate installed coverage | Split current-state rows from historical archaeology + generate machine-readable status summary from current-state block only |
| 3 | Hook trust overclaim | occasional | Settings wires hooks manifest still marks sibling-novel/partial/dormant/pending; operators assume upstream-installed enforcement | Per-hook provenance/status comments adjacent to settings + hook smoke probes at SessionStart |
| 4 | Unpinned startup dependency | occasional | npx/uvx/npm startup paths change behavior without repo commit (especially MCP servers + global CLIs) | Pin every startup command OR explicit @latest-acknowledged-D6-risk markers with rollback |
| 5 | Local service assumption | occasional | Graphiti, LiteLLM, FalkorDB, Phoenix, Docker, cpa-usage-keeper claims depend on local daemons; if down, tools fail late or degrade invisibly | Single `eee doctor` command probes all declared local services + RED/YELLOW/GREEN report before autonomous work |

## 3 Missing SOTA repos

| Priority | Repo | Rationale |
|---|---|---|
| **Day-1** | `promptfoo/promptfoo` | Corrected architecture prescribes promptfoo OR inspect_ai as Day-1 minimal eval harness before broad skill/MCP installation; manifest marks promptfoo PLANNED |
| **Day-1** | `modelcontextprotocol/inspector` | Corrected architecture requires MCP inspector/audit before broad MCP installation; manifest marks PLANNED |
| Week-1 | `openai/openai-agents-python` | Corrected architecture names provider-complement cross-model comparison baseline; manifest marks PLANNED |

## 5 Prescribed_edits (Mia-verified Pattern A apply-ready)

| # | Target | Edit | Cite | Mia probe |
|---|---|---|---|---|
| 1 | `.claude/settings.json:94-96` | Raise codex_t1_consult_gate timeout from 5s to realistic T1 budget OR change hook to hard-block with visible timeout artifact when review cannot complete | CLAUDE.md:254 requires codex T1; manifest:60 discloses T1 enforcement partial | ✅ VERIFIED genuine (timeout: 5 literal) |
| 2 | `.claude/settings.json:81` | Revert defaultMode to auto OR add adjacent temporary-override field/comment linking to CLAUDE.md:237 stating bypassPermissions is NOT CR-7 Phase 3 achievement | CLAUDE.md:68-72 + CLAUDE.md:237 | ✅ VERIFIED genuine (literal bypassPermissions; inline rationale partial mitigation present) |
| 3 | `.mcp.json:84-87` | Pin @arizeai/phoenix-mcp to verified package version + manifest row with version, smoke probe, upstream cite | CLAUDE.md:90-91 version-pin mandate; 01-corrected-architecture.md:120-127 L8 observability | ✅ VERIFIED genuine (unpinned @latest literal) |
| 4 | `manifest.md:375-391` | Promote one eval harness AND mcp-inspector from PLANNED to install-fire queue with pinned commands + smoke probes | 01-corrected-architecture.md:136-140 Day-1 prerequisites | ✅ VERIFIED genuine (5 evals + 1 inspector all PLANNED) |
| 5 | `manifest.md:493-505` | Move deprecated historical PLANNED rows behind clearly machine-excluded archaeology marker OR out of current manifest status scan | manifest.md:493 states block is deprecated | ✅ VERIFIED genuine (DEPRECATED marker present but block still inline) |

## SOTA definition refinement (verbatim from codex)

> "Refine SOTA cleanliness to mean: an architectural primitive is clean only when its active runtime behavior is either installed from an official upstream/native channel with a pinned version or HEAD SHA and a passing smoke probe, or cite-class only with TIER-1-DIRECT file:line+HEAD SHA or official-doc URL; TIER-3 local composition, sibling cite-import, PLANNED, AMBER, PARTIAL, PENDING, DEFERRED, and unpinned startup commands count against cleanliness until promoted by fresh probe evidence."

**Promotion path to higher cleanliness**: every PLANNED → INSTALLED with smoke probe = +clean count; every AMBER → INSTALLED with cite-import-AMBER promoted to TIER-1-DIRECT via upstream-parity verification = +clean count. Cleanliness is monotonically increasing under install + cite-promotion discipline.

## Cross-validation with prior Wave 145 arc

- Wave 145 Fire 1-9 manifest drift sweep surfaced 16+ NEW DRIFT entries (Wave 145 Fire 8) which directly inflated Agent A's "non-clean" count — codex's 61% overall measurement INCORPORATES this drift correctly per its method statement.
- Wave 145 Fire 2 garak APPROVE conf=0.91 ADDED PLANNED Week-1 row (manifest.md:391 NVIDIA/garak) — INCREASED non-clean count by 1 (PLANNED status); represents new architectural debt awaiting install.
- Wave 134 Fire 27-A/B/C CR-12 lattice integration — INCREASED clean count by ~3 (codified discipline + 5-class disposition records).
