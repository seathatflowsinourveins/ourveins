BRIDGE-MODE DISCLOSURE: This artifact was produced by Codex in BRIDGE-MODE from local filesystem evidence after the prior Codex run artifact was absent. I did not use hidden prior-thread state; I reconstructed the adversarial scan from `Z:/claude-sota-pure`, `Z:/claude-sota-installed`, and their local docs/config inventories on 2026-05-15.

# W208 Agent alpha-C — codex-rescue BRIDGE-MODE adversarial SOTA gap-scan for `Z:/claude-sota-pure`

Scope: adversarial gap scan of `Z:/claude-sota-pure` against the richer `Z:/claude-sota-installed` baseline and `Z:/claude-sota-pure/docs/sota-research-CATALOG-2026-05-15.md`.

Evidence class:
- [VERIFIED] `Z:/claude-sota-pure/.mcp.json` has 14 MCP entries: `memory`, `github`, `context7`, `deepwiki`, `repomix`, `git`, `fetch`, `time`, `sequentialthinking`, `filesystem`, `gitnexus`, `chrome-devtools`, `playwright`, `serena`.
- [VERIFIED] `Z:/claude-sota-installed/.mcp.json` has 12 MCP entries: `github`, `context7`, `deepwiki`, `playwright`, `chrome-devtools`, `repomix`, `serena`, `memory`, `graphiti`, `phoenix`, `gitnexus`, `ccusage`.
- [VERIFIED] `Z:/claude-sota-pure/.claude/settings.json` has 20 enabled plugins, 1 disabled plugin, 8 known marketplaces, 3 hook events, 6 wired hook handlers, `defaultMode=default`.
- [VERIFIED] `Z:/claude-sota-installed/.claude/settings.json` has 35 enabled plugins, 7 disabled plugins, 16 known marketplaces, 9 hook events, 54 wired hook handlers, `defaultMode=bypassPermissions`.
- [VERIFIED] Filesystem counts: pure has 6 `SKILL.md`, 1 agent markdown file, 0 command files, 11 hook files, 206 marketplace `plugin.json`; installed has 22 `SKILL.md`, 13 agent markdown files, 4 command files, 87 hook files, 397 marketplace `plugin.json`.
- [VERIFIED] `git -C Z:/claude-sota-pure status` was not usable because Git reported dubious ownership; this scan uses filesystem inspection, not Git index state.

## §1 MCP Gap Matrix

| Capability | Pure state | Installed baseline | Verdict | Reason |
|---|---:|---:|---|---|
| Core docs/code MCPs | Present | Present | ADOPTED | `context7`, `deepwiki`, `github`, `repomix`, `serena`, `gitnexus`, `playwright`, `chrome-devtools`, `memory` exist in pure. |
| Generic Anthropic MCPs | Present | Mostly absent | REJECT-CONFIRMED as production default | Pure includes `git`, `fetch`, `time`, `sequentialthinking`, `filesystem`; installed intentionally prefers native shell/web/runtime tools and tighter governance. Keep only if pure's smoke probes show value. |
| Native-node startup hardening | Missing | Present | ADOPT-NOW-DELTA | Pure uses `npx` for most stdio MCPs; installed pins direct `node`/native paths for `playwright`, `chrome-devtools`, `repomix`, and a direct memory executable. This is a real startup latency/determinism gap. |
| Hosted GitHub read-only MCP | Missing | Present | STUDY-PILOT | Pure uses `@modelcontextprotocol/server-github`; installed uses `https://api.githubcopilot.com/mcp/readonly` with token header. Better least-privilege story, but auth/operator assumptions must be probed in pure. |
| Graphiti temporal KG | Missing | Present | ADOPT-NOW-DELTA | Installed has `graphiti` with FalkorDB + local model settings. Pure research catalog lists graphiti as already P0/P1 in several places, but pure `.mcp.json` does not wire it. |
| Phoenix observability MCP | Missing | Present | STUDY-PILOT | Installed has `phoenix` MCP. Pure research catalog flags Phoenix main package license concerns; the MCP/package split needs explicit license/source verification before adoption. |
| ccusage token telemetry MCP | Missing | Present | ADOPT-NOW-DELTA | Installed has `ccusage`; pure has no equivalent token accounting MCP despite token-efficiency being part of the installed runtime's SOTA layer. |
| CLIProxyAPI / model-fleet control | Missing | Present outside `.mcp.json` | STUDY-PILOT | Installed has CPA fleet docs/state; pure intentionally starts clean. Adopt only after pure proves it needs multi-account pool/routing. |
| Security/supply-chain MCPs (`vet`, Grafana, DB MCPs) | Manifest planned/deferred | Not generally wired | HNF | Pure manifest lists candidates; installed does not prove a universal production default. No immediate delta. |

MCP adversarial finding: pure has a larger nominal MCP count than installed, but the count is misleading. Pure has generic `npx` MCPs; installed has fewer but more operationally meaningful SOTA runtime MCPs: Graphiti, Phoenix, ccusage, native-pinned Playwright/Chrome/Repomix, and a least-privilege GitHub endpoint.

## §2 Hook Capability Gaps

| Hook capability | Pure state | Installed baseline | Verdict | Reason |
|---|---:|---:|---|---|
| Safety guard for Bash/destructive patterns | Partial | Present | ADOPT-NOW-DELTA | Pure has cwc `kill-switch.sh`/`steer.sh`; installed adds Python `safety_guard.py`, `block_no_verify_guard.py`, and commit/push gate hooks. |
| Secret scan on edit/commit | Missing | Present | ADOPT-NOW-DELTA | Installed wires `secret_scan_guard.py` on edit/write and `gitleaks_pre_commit_gate.py` on commit patterns. Pure has no equivalent wired handler. |
| Codex T1/T2/T5 lifecycle gates | Mostly missing | Present | ADOPT-NOW-DELTA | Pure has `codex@openai-codex` disabled and manifest documents T1-T5 as a gap. Installed wires `codex_t1_consult_gate.py`, `codex_t2_pre_commit_gate.py`, `codex_t5_plan_review_gate.py`, postcommit/prepush review, trace, and stuck detection. |
| MCP health check after edits | Missing | Present | STUDY-PILOT | Installed runs `codex_mcp_healthcheck.py` async after edits. Adopt if pure keeps broad MCP surface. |
| Artifact-inline lint / bridge failure lint | Missing | Present | ADOPT-NOW-DELTA | The current task exists because an artifact was absent. Installed has `fm19_artifact_inline_lint.py` and `fm17_class_lint.py`; pure lacks that class of persistence guard. |
| Subagent telemetry and stop gates | Minimal | Present | STUDY-PILOT | Installed has `SubagentStop` telemetry/review hooks. Pure has cwc long-running primitives but only 6 wired hook handlers total. |
| Auto-compact discipline | Partial | Present | STUDY-PILOT | Pure has `context-mode-cache-heal.mjs`; installed has `PreCompact`, compact hint readers, statusline threshold logic, and context-window statusline. |
| Statusline / live context display | Missing | Present | ADOPT-NOW-DELTA | Installed has `context_window_statusline.sh`; pure has no statusLine. |

Hook adversarial finding: pure's hook surface is too thin for a promoted production runtime. The missing highest-impact hooks are not decorative; they prevent exactly the failure modes observed in this W208 resume: missing artifacts, stalled bridge-mode reviews, no-verify bypass, commit-time secret leaks, and ungated cross-model architecture changes.

## §3 Marketplace Completeness Scan

| Surface | Pure | Installed | Delta | Verdict |
|---|---:|---:|---:|---|
| Known marketplaces in settings | 8 | 16 | -8 | ADOPT-NOW-DELTA for selected missing official/maintained marketplaces. |
| Marketplace directories | 8 | 16 | -8 | Same as above. |
| Marketplace `plugin.json` inventory | 206 | 397 | -191 | STUDY-PILOT for broad import; ADOPT-NOW only for high-signal official/core sets. |
| Enabled plugins | 20 | 35 | -15 | ADOPT-NOW for codex + setup/dev/core official plugins; reject blanket enable. |
| Repo-local skills | 6 | 22 | -16 | STUDY-PILOT; pure should prefer plugin/marketplace skills, but the current skill set is sparse. |
| Agent markdown files | 1 | 13 | -12 | STUDY-PILOT; not all installed local agents belong in pure, but one agent is too thin for SOTA coverage. |
| Slash command files | 0 | 4 | -4 | ADOPT-NOW-DELTA for `codex` slash-command surface if plugin install provides it. |

Missing from pure but present in installed `extraKnownMarketplaces`:
- `everything-claude-code`
- `skills`
- `knowledge-work-plugins`
- `claude-plugins-community`
- `financial-services`
- `healthcare`
- `life-sciences`
- `anthropic-agent-skills`
- `antigravity-awesome-skills`
- `claude-code-skills`
- `thedotmack`/claude-mem appears in installed plugin inventory but is disabled and not in `extraKnownMarketplaces`.

Pure-only or enabled-in-pure but not enabled-in-installed:
- `debugging-toolkit@claude-code-workflows`
- `ecc@ecc`
- `hookify@claude-plugins-official`
- `security-guidance@claude-plugins-official`
- `superpowers@superpowers-dev`
- `tdd-workflows@claude-code-workflows`

Installed-enabled but missing from pure enabled set:
- `codex@openai-codex`
- `everything-claude-code@everything-claude-code`
- `superpowers@claude-plugins-official`
- `claude-code-setup@claude-plugins-official`
- `claude-md-management@claude-plugins-official`
- `code-modernization@claude-plugins-official`
- `code-simplifier@claude-plugins-official`
- `mcp-server-dev@claude-plugins-official`
- `playground@claude-plugins-official`
- `plugin-dev@claude-plugins-official`
- `pr-review-toolkit@claude-plugins-official`
- `pyright-lsp@claude-plugins-official`
- `typescript-lsp@claude-plugins-official`
- `review-agent-governance@claude-code-workflows`
- `shell-scripting@claude-code-workflows`
- `signed-audit-trails@claude-code-workflows`
- `session-report@claude-plugins-official`
- `engineering-skills@claude-code-skills`
- `engineering-advanced-skills@claude-code-skills`
- `example-skills@anthropic-agent-skills`
- `antigravity-bundle-essentials@antigravity-awesome-skills`

Marketplace adversarial finding: pure is no longer a "minimal upstream-sourced evaluation runtime" if judged by installed artifacts; it has enough marketplaces to be non-minimal but not enough to be complete. The right fix is not blanket-enable 191 more plugin descriptors. Adopt the codex/openai, official Anthropic core, anthropic-agent-skills/example-skills, and selected engineering skill bundles; keep vertical marketplaces cached/off by default unless operator demand exists.

## §4 Cross-Vendor Org Sweep

| Org/vendor | Pure status | Installed/research status | Verdict |
|---|---|---|---|
| Anthropic | Strong but incomplete | Installed has broader official plugin and skill marketplace coverage | ADOPT-NOW-DELTA: `anthropic-agent-skills`, `claude-code-setup`, `mcp-server-dev`, `plugin-dev`, `pr-review-toolkit`, language LSP plugins. |
| OpenAI | Marketplace known, codex disabled | Installed has `codex@openai-codex` enabled and lifecycle hooks | ADOPT-NOW-DELTA: enable codex plugin/commands, with bridge-mode failure persistence guard. |
| Microsoft/GitHub | Playwright/Chrome/GitHub present | Installed uses pinned Playwright and GitHub Copilot readonly MCP | STUDY-PILOT: GitHub readonly endpoint; ADOPT-NOW: native pin Playwright. |
| Google | Chrome DevTools present via `npx` | Installed pins Chrome DevTools native node path | ADOPT-NOW-DELTA: native pin; no new Google MCP required. |
| Arize/Phoenix | Missing | Installed has Phoenix MCP, docs flag license/package split | STUDY-PILOT until package/license scope is explicit. |
| getzep/Graphiti | Missing in pure MCP | Installed has Graphiti + FalkorDB | ADOPT-NOW-DELTA, but keep backend setup explicit and smoke-probed. |
| doobidoo/mcp-memory | Present | Present | ADOPTED. |
| ryoppippi/ccusage | Missing | Installed has ccusage and docs pin v18.0.11 | ADOPT-NOW-DELTA. |
| rtk-ai | Missing | Installed has RTK token-efficiency hook/layer | STUDY-PILOT for pure; high value but may violate pure "plugin-loaded only" posture if hand-wired. |
| GitNexus/Akon Labs | Present in pure `.mcp.json` | Installed uses GitNexus and AGENTS requires impact/detect changes | STUDY-PILOT/AMBER: pure research catalog flags license verification unresolved; do not deepen until license posture is resolved. |
| mem0ai | Missing | Pure research catalog says P0 ADOPT-NOW but also flags archived mem0-mcp reject | STUDY-PILOT: candidate memory complement, not immediate replacement for mcp-memory/Graphiti. |
| Langfuse/Opik/Promptfoo | Missing | Research catalog suggests study/CI eval gates | STUDY-PILOT only; not baseline runtime blockers. |

Cross-vendor adversarial finding: pure covers the obvious MCP vendors but underweights runtime governance vendors: OpenAI codex plugin, Arize/Phoenix, ccusage/RTK, and getzep/Graphiti. The "pure" design should not use installed's custom local rules as authority, but it should not ignore upstream plugins and runtime telemetry primitives that are already proven in the installed baseline.

## §5 Layer Completeness Matrix

| Layer | Pure completeness | Installed/reference completeness | Verdict | Next action |
|---|---|---|---|---|
| Bootstrap launcher/env | Medium | High | STUDY-PILOT | Run smoke probes 1-14 before promotion. |
| Plugin marketplace substrate | Medium | High | ADOPT-NOW-DELTA | Add selected missing marketplaces; avoid blanket vertical enable. |
| Plugin command surface | Low | Medium/high | ADOPT-NOW-DELTA | Enable `codex@openai-codex`; add official setup/dev/review command plugins. |
| MCP substrate | Medium | High | ADOPT-NOW-DELTA | Add Graphiti, ccusage; native-pin existing stdio MCPs. |
| Memory/RAG | Medium | High | ADOPT-NOW-DELTA | Wire Graphiti; leave mem0 as study-pilot. |
| Code intelligence | Medium | High | STUDY-PILOT | Serena/GitNexus/Repomix present; verify GitNexus license and native pinning. |
| Observability/evals | Low | Medium | STUDY-PILOT | Phoenix and CI eval tools are valuable but need explicit license/auth setup. |
| Security gates | Low | High | ADOPT-NOW-DELTA | Add secret scan, safety/no-verify, gitleaks commit gate, artifact persistence lint. |
| Token efficiency | Low | High | ADOPT-NOW-DELTA | Add ccusage; study RTK hook if pure can keep install discipline. |
| Auto-compact/context management | Medium | High | STUDY-PILOT | Pure has plugins, but lacks installed's threshold/statusline/PreCompact wiring. |
| Agent orchestration | Medium | High | STUDY-PILOT | Pure has agent orchestration/team plugins enabled but only 1 local agent. Use upstream agents where possible. |
| Spec-driven development | Planned | Present in installed docs | ADOPT-NOW-DELTA | Install/use `github/spec-kit` via official native channel if pure is meant for architecture work. |

Layer adversarial finding: pure is not failing because it lacks research. It is failing at activation. Several items are already documented as planned or P0 in pure docs but are not wired: codex plugin, Graphiti, spec-kit, marketplace expansions, smoke probes, and lifecycle gates.

## §6 Probe 7.a REJECT list

These are rejected for immediate adoption into pure in this scan:

| Candidate | Disposition | Reason |
|---|---|---|
| Blanket import of installed `.claude/hooks/scripts` | REJECT-CONFIRMED | Violates pure's upstream/plugin-loaded premise and imports local rule debt. Adopt capabilities through upstream plugins or narrowly justified scripts only. |
| Blanket enable of all 397 installed marketplace plugin descriptors | REJECT-CONFIRMED | Creates noise, vertical credential demand, and hidden maintenance burden. |
| `@latest` / `npx -y` for long-lived stdio MCPs | REJECT-CONFIRMED | Startup determinism and supply-chain risk. Native pin or version pin where production-wired. |
| `mem0ai/mem0-mcp` | REJECT-CONFIRMED | Pure catalog flags archived/stale status. Study `mem0ai/mem0` only as non-MCP complement. |
| `chroma-core/chroma-mcp` | REJECT-CONFIRMED | Pure catalog flags semantic/duplicate risk versus existing memory stack. |
| `microsoft/autogen` | REJECT-CONFIRMED for baseline runtime | Pure catalog flags maintenance/vendor direction mismatch. Study only for agent-framework comparisons. |
| `github/semantic` | REJECT-CONFIRMED | Archived. |
| `@anthropic/mcp-ast-grep` | REJECT-CONFIRMED for now | Pure catalog flags phantom/uncertain package; installed uses CLI ast-grep instead. |
| `executeautomation/mcp-playwright` | REJECT-CONFIRMED | Duplicate/lower trust than Microsoft official Playwright MCP. |
| `opik` immediate install | REJECT-CONFIRMED | Partial overlap with Phoenix/Langfuse/eval stack; needs study-pilot. |
| `Aider-AI/aider` | REJECT-CONFIRMED | Duplicate coding-agent surface; use as cite-class/repo-map idea only if needed. |
| `anomalyco/opencode` | REJECT-CONFIRMED | Duplicate coding-agent surface. |
| `snyk/cli` | REJECT-CONFIRMED | Demand-absent; do not add paid/vendor scanner by default. |
| `microsoft/RD-Agent` | REJECT-CONFIRMED | Domain-specific, not runtime substrate. |
| `getzep/zep` | REJECT-CONFIRMED | Duplicate/full platform relative to Graphiti runtime need. |
| `Priivacy-ai/spec-kitty` | REJECT-CONFIRMED | Spec-kit duplicate/unclear advantage. |
| `slsa-framework/slsa` direct install | REJECT-CONFIRMED | Specification/framework, not runtime primitive. Use as cite-class if supply-chain policy is updated. |

Probe 7.a adversarial finding: reject pressure should focus on preventing duplicate agent frameworks, archived MCPs, and license-risk platforms from being smuggled in under "SOTA completeness." The immediate gap is not more agent CLIs; it is safer activation of already-selected runtime primitives.

## §7 License Blocker Scan

| Candidate | License/status evidence from local docs | Blocker verdict |
|---|---|---|
| `khoj-ai/khoj` | AGPL-3.0 in pure catalog | REJECT-CONFIRMED |
| `basicmachines-co/basic-memory` | AGPL-3.0 in pure catalog | REJECT-CONFIRMED |
| `logseq/logseq` | AGPL-3.0 in pure catalog | REJECT-CONFIRMED |
| `trufflesecurity/trufflehog` | AGPL-3.0 in pure catalog | REJECT-CONFIRMED for pure default; installed docs separately mention policy nuance, but pure catalog blocks it. |
| `omnivore-app/omnivore` | defunct/archived in pure catalog | REJECT-CONFIRMED |
| `obsidianmd/obsidian` | proprietary in pure catalog | REJECT-CONFIRMED |
| `FalkorDB/FalkorDB` | SSPLv1 in pure catalog | STUDY-PILOT/BLOCKER | Installed uses FalkorDB for Graphiti; pure must explicitly accept or choose an alternate Graphiti backend before adopting Graphiti. |
| `mastra-ai/mastra` | ELv2 in pure catalog | REJECT-CONFIRMED |
| `Arize-ai/phoenix` main package | ELv2 in pure catalog | STUDY-PILOT/BLOCKER | Installed has Phoenix MCP; pure must distinguish MCP package/license from main package before adoption. |
| `n8n` | fair-code in pure catalog | REJECT-CONFIRMED |
| `mksglu/context-mode` | Elastic-2.0/ELv2 AMBER in manifest | STUDY-PILOT/ACCEPTED-AMBER | Already enabled in pure; keep explicit license acceptance and rollback notes. |
| `GitNexus` | pure catalog says NOASSERTION/unresolved; installed AGENTS says PolyForm Noncommercial constraints | STUDY-PILOT/BLOCKER | Do not expand reliance until pure resolves license use-class. Existing `.mcp.json` entry should be marked AMBER. |
| Anthropic document skills | proprietary/AMBER in pure manifest | REJECT-CONFIRMED for default | Cache only; operator acknowledgment required. |

License adversarial finding: the biggest hidden blocker is Graphiti's backend choice, not Graphiti itself. Pure can adopt Graphiti as a capability only if it resolves FalkorDB SSPL use-class or selects a permissive backend path. The second hidden blocker is GitNexus: pure already wires it, while its own catalog still marks license unresolved.

## Final adversarial verdict

ADOPT-NOW-DELTA:
1. Enable `codex@openai-codex` and its command/review surface.
2. Add artifact persistence lint equivalent for bridge-mode/codex rescue outputs.
3. Add secret scan + no-verify + destructive-command safety hooks through upstream/plugin-compatible path.
4. Add `ccusage` token telemetry MCP.
5. Wire Graphiti capability after backend license decision.
6. Native/version-pin stdio MCPs instead of `npx -y` where production-wired.
7. Add statusline/context-window visibility.
8. Add selected official Anthropic/dev plugins: setup, plugin-dev, mcp-server-dev, pr-review-toolkit, pyright/typescript LSP.
9. Add `anthropic-agent-skills` / `example-skills` selectively.
10. Add `github/spec-kit` via official native channel for architecture/spec work.

STUDY-PILOT:
1. Phoenix MCP after license/package split verification.
2. GitHub Copilot readonly MCP endpoint after auth/operator fit check.
3. RTK hook/token-efficiency layer under pure install discipline.
4. CLIProxyAPI fleet/routing in pure after operator demand.
5. mem0 core as memory complement.
6. Langfuse/Promptfoo/Opik eval/observability stack.
7. Broader engineering skill bundles from `claude-code-skills`.
8. Vertical Anthropic marketplaces: financial, healthcare, life-sciences, knowledge-work.
9. Subagent telemetry/governance hooks through upstream plugin route.
10. GitNexus deeper reliance after license use-class verification.

REJECT-CONFIRMED:
1. Blanket import of installed local hook scripts.
2. Blanket enable/import of all installed marketplace plugins.
3. `@latest`/floating `npx -y` production MCP launchers.
4. `mem0ai/mem0-mcp`.
5. `chroma-core/chroma-mcp`.
6. `microsoft/autogen` as baseline runtime.
7. `github/semantic`.
8. `@anthropic/mcp-ast-grep` until package reality is verified.
9. `executeautomation/mcp-playwright`.
10. Immediate Opik install.
11. Aider/opencode duplicate coding-agent adoption.
12. Snyk CLI default install.
13. RD-Agent baseline adoption.
14. Zep platform adoption.
15. Spec-kitty duplicate adoption.
16. AGPL/SSPL/ELv2/proprietary/fair-code candidates without explicit use-class acceptance.

HNF:
1. No Git working-tree status for pure because of dubious ownership.
2. No live MCP smoke results in this run.
3. No internet refresh of GitHub stars/releases in this run; local docs dated 2026-05-15 were used.
4. No proof that every installed enabled plugin should transfer to pure.
5. No proof that generic Anthropic MCPs in pure are harmful if smoke probes pass.
6. No proof that Phoenix MCP shares the main Phoenix ELv2 blocker.
7. No proof that FalkorDB SSPL blocks local-only operator use, but it blocks unqualified ADOPT-NOW.
8. No proof that GitNexus license is acceptable for pure's intended use; pure docs and installed docs conflict enough to require verification.

VERDICT: ADOPT-NOW-DELTA=10; REJECT-CONFIRMED=16; STUDY-PILOT=10; HNF=8.
