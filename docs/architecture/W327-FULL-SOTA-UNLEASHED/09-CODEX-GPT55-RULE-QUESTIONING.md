# Codex GPT-5.5 Rule Questioning

## Q-1: CR-1 Trusted-Source Mandate
**Verdict**: REVISE
**Rationale**: "Trusted plugin/skill/agent" is a useful default boundary, but it is not a sufficient trust model because it conflates distribution channel with operator intent, provenance, and ongoing maintenance. Operator-vetted forks should be allowed, but only as explicit exceptions with source SHA, diff scope, owner, update policy, and rollback path; otherwise the rule creates both false security for marketplace items and unnecessary friction for legitimate local hardening.
**Cite-anchors**: [Anthropic] Plugins reference https://code.claude.com/docs/en/plugins-reference; [OWASP] Software Component Verification Standard https://owasp.org/www-project-software-component-verification-standard/; [NIST] Secure Software Development Framework SP 800-218 https://doi.org/10.6028/NIST.SP.800-218; [SLSA] SLSA Specification https://slsa.dev/spec/latest/
**Recommended action**: Add an "operator-vetted fork" class with mandatory provenance, pinned upstream base, local diff manifest, and expiry review. Require marketplace/plugin trust to be revalidated by source freshness and install verification, not by name alone.

## Q-2: CR-2 Hook-Policy Body Ban
**Verdict**: REVISE
**Rationale**: The hook-body ban is directionally sound because hooks execute automatically and can become an unreviewed policy engine, but a blanket extension ban is too coarse for a Windows-native runtime that already needs bug shims. The `context-mode-cache-heal.mjs` exception is not inherently corrupting, but it will undermine the rule unless every exception is short-lived, issue-linked, size-bounded, reviewed, and deleted when upstream fixes land.
**Cite-anchors**: [Anthropic] Hooks reference https://code.claude.com/docs/en/hooks; [Anthropic] Hooks guide https://code.claude.com/docs/en/hooks-guide; [CIS] Control 2 software/script allowlisting https://cas8.docs.cisecurity.org/en/latest/source/Controls2/; [OWASP] MCP04 Software Supply Chain Attacks & Dependency Tampering https://owasp.org/www-project-mcp-top-10/2025/MCP04-2025%E2%80%93Software-Supply-Chain-Attacks%26Dependency-Tampering
**Recommended action**: Keep the current shim only if `anthropics/claude-code#46915` remains the tracked justification. Add a tracked hook-exception registry with owner, max byte size, upstream issue, review date, and removal condition. Do not sanction new project hook bodies without the same registry entry.

## Q-3: CR-3 Subagent-Source Mandate
**Verdict**: BLOCK
**Rationale**: The rule covers installed upstream agents and documented file-based subagents, but it misses dynamic `--agents` JSON definitions, agent-team teammates, forked skill contexts, and third-party agent frameworks exposed through MCP or CLI. That gap matters because Anthropic documents dynamic and plugin subagent scopes with different security semantics; a rule that does not inventory those paths will miss runtime-composed authority.
**Cite-anchors**: [Anthropic] Custom subagents https://code.claude.com/docs/en/sub-agents; [Anthropic] Agent teams https://code.claude.com/docs/en/agent-teams; [NIST] AI RMF 1.0 https://www.nist.gov/itl/ai-risk-management-framework; [OWASP] MCP04 Software Supply Chain Attacks & Dependency Tampering https://owasp.org/www-project-mcp-top-10/2025/MCP04-2025%E2%80%93Software-Supply-Chain-Attacks%26Dependency-Tampering
**Recommended action**: Extend CR-3 to all agent-definition channels: `.claude/agents`, plugin agents, `--agents` JSON, agent teams, skill `context: fork`, and MCP/CLI agent launchers. Require a per-channel inventory and reject unowned dynamic agent definitions.

## Q-4: CR-4 Project Behavior And Rules Re-Permission
**Verdict**: REVISE
**Rationale**: W308 is sound in principle: `.claude/rules/` cannot be banned as nonexistent when Anthropic and installed plugins treat rules/configuration as part of the Claude directory ecosystem. The failure mode is recurrence of W255's deleted 64-rule prompt sprawl, so re-permission must be conditioned on path gating, inventory caps, no auto-fire prompt piles, and periodic deletion review.
**Cite-anchors**: [Anthropic] Settings https://code.claude.com/docs/en/settings; [Anthropic] Skills https://code.claude.com/docs/en/skills; [CIS] Control 4 secure configuration https://cas8.docs.cisecurity.org/en/latest/source/Controls4/; [NIST] SSDF configuration and evidence discipline https://doi.org/10.6028/NIST.SP.800-218
**Recommended action**: Keep `.claude/rules/` permitted only for plugin-shipped or SKILL.md-gated operator-curated content. Add a max-count or max-LOC alert and a review checklist that proves rules are not silently loaded as a second CLAUDE.md.

## Q-5: CR-5 Permissions Over Guard Scripts
**Verdict**: BLOCK
**Rationale**: The declared R5 posture is not fully enforced by observable config: `.claude/settings.json` has deny rules and security hooks, but local evidence says Control 2 audit logging is 0/2, Control 5 capability registry is 1/2, and Windows-native sandboxing is structurally inert. That is a partial compensating-control story, not the claimed "permissions + sandboxing" hard boundary, so shipping it as equivalent would be a security representation bug.
**Cite-anchors**: [Anthropic] Permissions https://code.claude.com/docs/en/permissions; [Anthropic] Sandboxing https://code.claude.com/docs/en/sandboxing; [NIST] AI RMF Measure/Manage https://airc.nist.gov/airmf-resources/airmf/5-sec-core/; [CIS] Control 4 secure configuration https://cas8.docs.cisecurity.org/en/latest/source/Controls4/
**Recommended action**: Mark R5 as PARTIAL-HOLD, not equivalent-hold, until the audit-log hash chain and capability registry exist. Add a Windows-native accepted-risk record or move the runtime to WSL2/macOS/Linux for real sandbox enforcement. Keep guard scripts described as compensating controls, not primary trust boundaries.

## Q-6: CR-9 Pinned MCP Contract
**Verdict**: BLOCK
**Rationale**: W286-arc-P0C is not holding as a literal contract. The current `.mcp.json` includes compliant `npx -y pkg@version` entries, but also `uvx` (`serena`, `basic-memory`), local binary invocation (`gitnexus`), local repo `node` (`langfuse`), and HTTP servers (`deepwiki`, `cognee`, `hf-mcp-server`) that are outside the declared shape; some may be valid exceptions, but they are not documented as such in the contract itself.
**Cite-anchors**: [Anthropic] MCP project scope configuration https://code.claude.com/docs/en/mcp; [OWASP] MCP04 version pinning and approved registries https://owasp.org/www-project-mcp-top-10/2025/MCP04-2025%E2%80%93Software-Supply-Chain-Attacks%26Dependency-Tampering; [OpenSSF] Scorecard security posture https://openssf.org/scorecard/; [SLSA] Supply-chain provenance specification https://slsa.dev/spec/latest/
**Recommended action**: Split CR-9 into transport-specific contracts: npm stdio, uv/uvx stdio, local build artifact, and HTTP remote. For each non-`npx` entry, add version/provenance, owner, update source, and runtime verification. Treat `gitnexus` and `langfuse` as immediate P0 exceptions until pinned provenance is explicit.

## Q-7: W269 Parallel-Dispatch Mandate
**Verdict**: BLOCK
**Rationale**: Advisory-only is the wrong escape valve after a documented 29% non-compliance rate and an observed `preagent-parallel-guard.mjs` that always exits 0. Anthropic's own parallel modes carry token and coordination tradeoffs, but the current rule already encodes when parallelism is mandatory; leaving enforcement advisory turns a MUST into style guidance and preserves the silent-fallback failure mode.
**Cite-anchors**: [Anthropic] Run agents in parallel https://code.claude.com/docs/en/agents; [Anthropic] Agent teams limitations and costs https://code.claude.com/docs/en/agent-teams; [NIST] AI RMF Measure function https://airc.nist.gov/airmf-resources/playbook/measure/; [CIS] Control 8 audit log management https://www.cisecurity.org/controls/audit-log-management
**Recommended action**: Implement P0-A block-on-2nd-violation per session with an explicit override phrase for dependent or user-forbidden delegation cases. Log first warning, second block, override reason, and denominator so the 29% metric can be remeasured.

## Q-8: sca-v12 Ship-Gate Score
**Verdict**: BLOCK
**Rationale**: I did not find the exact 4.036 score in the inspected files, so that numeric claim is [runtime-unverifiable] here, but the local R5 scorecard and W327 gap files support the underlying RED posture. Revising the ship-gate downward because the runtime misses it would invert the purpose of a gate; the safer path is alpha: close concrete micro-wave gaps and only ship below gate under signed emergency risk acceptance.
**Cite-anchors**: [Anthropic] Admin setup managed controls https://code.claude.com/docs/en/admin-setup; [NIST] AI RMF Govern/Measure/Manage https://www.nist.gov/itl/ai-risk-management-framework; [OWASP] SCVS supply-chain risk reduction https://owasp.org/www-project-software-component-verification-standard/; [CIS] Control 4 configuration management https://cas8.docs.cisecurity.org/en/latest/source/Controls4/
**Recommended action**: Hold the 4.5 gate. Execute W331-style micro-waves only if each one has measured lift and no hidden exception expansion. Permit below-gate shipping only with a dated accepted-risk record and a rollback/closure deadline.

## Q-9: Auto-Memory Opt-Out
**Verdict**: REVISE
**Rationale**: I agree with the context-budget rationale for disabling broad automatic memory injection in a pointer-only root, and `.claude/settings.json` confirms `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`. Full opt-out is too blunt, though: Anthropic's memory and skill docs point toward hierarchical, lazy, and progressive disclosure mechanisms that preserve budget without discarding useful durable context.
**Cite-anchors**: [Anthropic] Memory https://code.claude.com/docs/en/memory; [Anthropic] Skills progressive disclosure https://code.claude.com/docs/en/skills; [NIST] AI RMF Manage controls https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Manage; [CIS] Control 2 software inventory and authorization https://www.cisecurity.org/controls/inventory-and-control-of-software-assets
**Recommended action**: Keep auto-memory disabled by default for this runtime, but add an explicit lazy-load memory skill or command that retrieves targeted memory by topic. Measure token cost for selective injection before any full re-enable. Document when a task should use basic-memory/cognee instead of automatic memory.

## Q-10: D-EMP Hard Gate Calibration
**Verdict**: REVISE
**Rationale**: A 0-5 empirical maturity ladder is useful, but D-EMP alone is too retrospective if sca-v13 adds D-REGRET. Regret should lower confidence for irreversible, hard-to-rollback, or operator-attention-heavy changes even when empirical evidence looks decent; otherwise the gate rewards "worked once" instead of "will not be expensive to unwind."
**Cite-anchors**: [Anthropic] Hooks and agent verification mechanisms https://code.claude.com/docs/en/hooks; [NIST] AI RMF Measure and Manage https://airc.nist.gov/airmf-resources/airmf/5-sec-core/; [OWASP] SCVS risk and technical-debt reduction https://owasp.org/www-project-software-component-verification-standard/; [CIS] Control 4 tracked and approved configuration updates https://cas8.docs.cisecurity.org/en/latest/source/Controls4/
**Recommended action**: Recalibrate the ladder so D-REGRET caps D-EMP-derived ship confidence for irreversible changes. Add rollback cost, blast radius, and operator-attention cost as explicit scoring dimensions. Require a post-ship regret review for any D-EMP pass that later consumes remediation waves.

## Summary
- Total verdicts: APPROVE=0 REVISE=6 BLOCK=4
- Top-3 P0 issues (codex-flagged): CR-9 MCP contract drift; CR-5 partially enforced safety boundary presented too strongly; W269 advisory-only guard despite measured non-compliance.
- Recommended immediate actions: Define exception registries for MCPs, hooks, and operator-vetted forks; enforce parallel-dispatch on second violation with logged override; keep the sca-v12 ship-gate and close measured gaps rather than lowering the threshold.
