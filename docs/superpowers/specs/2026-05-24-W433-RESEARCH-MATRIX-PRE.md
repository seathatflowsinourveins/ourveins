# W433-RESEARCH-MATRIX-PRE — Brainstorm capture (operator amendment 2026-05-24)

**Status**: PRE-SPEC CAPTURE (not for implementation — feeds the W433 brainstorm/spec cycle once W432-FINALIZE lands)

## Operator amendment to W432-FINALIZE brainstorming

> "and sota awesome lists convergence foundation and repos set up"

This expands sub-project III's scope from "11-repo currency audit" to "awesome-lists convergence + foundation + repos set up". Captured here so W433 spec inherits the full directive.

## Scope expansion for W433

W433-RESEARCH-MATRIX must now cover:

### A. Awesome-lists convergence (NEW per operator amendment)

SOTA discovery via the awesome-* curated-list family — aggregate across multiple authoritative awesome lists rather than scrape ad-hoc:

| Awesome list | Domain | Last update probe | Verdict gate |
|---|---|---|---|
| `hesreallyhim/awesome-claude-code` | Claude Code skills/plugins | live in repo | TIER-A (in-runtime) |
| `punkpeye/awesome-mcp-servers` | MCP servers | needs probe | TIER-A |
| `wong2/awesome-mcp-servers` | MCP servers (alt) | needs probe | TIER-A |
| `f/awesome-chatgpt-prompts` | LLM prompts | needs probe | TIER-B |
| `Hannibal046/Awesome-LLM` | LLM general | needs probe | TIER-B |
| `Mooler0410/LLMsPracticalGuide` | LLM practical | needs probe | TIER-B |
| `e2b-dev/awesome-ai-agents` | AI agents | needs probe | TIER-A |
| `kaushikb11/awesome-llm-agents` | Agents | needs probe | TIER-A |
| `WooooDyy/LLM-Agent-Paper-List` | Papers | needs probe | TIER-B |
| `sindresorhus/awesome` | meta-awesome | always-active | TIER-META |
| `awesome-foundation-models/awesome-foundation-models` | Foundation models | needs probe | TIER-B |
| `vinta/awesome-python` | Python ecosystem | needs probe | TIER-B (already cloned per tmp/repomix-clone-scratch) |

Methodology:
- Probe each list's last-meaningful-commit date (NOT just last-update; many lists get stale-link-fix-only commits)
- For each repo IN each list, apply sca-v22 currency probe (last commit / release date / SLSA / Sigstore / 3rd-party benchmark)
- Cross-reference: a repo appearing in 3+ awesome-lists has higher endorsement signal

### B. 11-repo research-architecture audit (original operator list)

Per operator's original message, audit these 11 repos for May 2026 currency:

**Wave 1 — Direct Deep-Research clones**
1. assafelovic/gpt-researcher (22k★) — ALREADY INSTALLED W411
2. stanford-oval/storm (23k★) — operator flagged STALE-CANDIDATE
3. dzhng/deep-research (18k★, ~600 LOC Node) — educational scope
4. langchain-ai/open_deep_research (6k★) — LangChain official

**Wave 2 — Graph-based / LangGraph**
5. google-gemini/gemini-fullstack-langgraph-quickstart (17k★)
6. langchain-ai/local-deep-researcher (9k★) — Ollama+SearXNG

**Wave 3 — SuperAgent harnesses**
7. bytedance/deer-flow (18k★) — #1 trending Feb 28 2026; has /claude-to-deerflow skill ⭐ KEY CANDIDATE
8. OpenManus/OpenManus (40k★)
9. Significant-Gravitas/AutoGPT (170k★) — likely frozen-popular
10. microsoft/autogen (45k★)
11. crewAIInc/crewAI (30k★)

### C. Foundation + repos set up (per operator)

After sca-v22 verdicts:
- Tier-1 INSTALL: <=2 SOTA repos (likely deer-flow + ??)
- PATTERN-STUDY: 3-5 repos
- MONITOR: 2-3 repos
- REJECT: 1-3 stale repos (e.g., STORM if confirmed)

Foundation install:
- Clone Tier-1 repos to `Z:/repos/deps/<repo>/` per operator convention
- Add to `.claude/plugins/` if MCP/plugin-shaped
- Update CLAUDE.md L11 install target set
- Add to `.eee/precheck-config.json:t5` if MCP

## Cardinal-rule R1 enforcement (lessons from W432-M1)

Every Tier-1 candidate MUST pass FULL R1 cryptographic chain:
- (a) Signed releases (SLSA-L3 OR Sigstore OR signed git tags)
- (b) License-risk audit (permissive only — MIT/Apache/BSD/ISC/MPL)
- (c) Maintainer-trust (>1 maintainer, >30d-old commits, no malicious-update history)
- (d) Dependency blast-radius (transitive `npm ls` / `pip list` clean; no Socket.dev / Snyk flags)

The W432-M1 MemPalace HALT proved this gate works. Future Tier-1 verdicts MUST run R1 empirically (probe PyPI/npm/GitHub directly), NOT trust upstream marketing.

## Sub-spec dependencies

W433-RESEARCH-MATRIX cannot start until W432-FINALIZE (this spec) Phase 1 completes — specifically:
- W432-G0 (PR #100) merged → unblocks CI
- W432-M2 (PR #106) merged → agentmemory plugin available for evaluating other Claude-Code-native installs
- Operator-gate G-A/B/C/D done → ruleset + secrets in place for codex CI review on W433 PRs

## Next-step handoff

When W432-FINALIZE Phase 1 lands:
1. Convert this PRE-SPEC into proper W433-RESEARCH-MATRIX-design.md via brainstorming-skill cycle
2. Add the W432-M1 R1-empirical-probe methodology section
3. Run codex GPT-5.5 r1 against the design before writing-plans

## Cite anchors (≥3 distinct orgs)

1. Anthropic — https://docs.anthropic.com/en/docs/claude-code/plugins (R1 trust-tuple)
2. GitHub — https://github.com/topics/awesome (awesome-list discovery surface)
3. OpenSSF — https://scorecard.dev/ (per-repo currency probe)
4. NIST — https://csrc.nist.gov/publications/detail/sp/800-218/final (R6 verify-before-claim)
5. arXiv — https://arxiv.org/abs/2403.13507 (CICD-SEC research baseline)
6. bytedance/deer-flow — https://github.com/bytedance/deer-flow (operator-flagged #1 trending candidate)
