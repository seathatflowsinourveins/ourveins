# 01 — thedotmack/claude-mem anatomy (Tier-3 memory STUDY-PILOT candidate)

> **Source**: `Z:/repos/deps/claude-mem @ HEAD 13d5fa71c204bbb5fac79fd2052ec85f59666e98 [VERIFIED 2026-05-10]`
> **License**: Apache-2.0 (verified at root LICENSE)
> **Last push**: 2026-05-10 (today — VERY ACTIVE)
> **Stars**: 74,435
> **Audit depth**: README headings + CLAUDE.md headings + structure probe

## What it is

**"Persistent Context Across Sessions for Every Agent"** — cross-session memory primitive
captured from chat transcripts. Includes OpenClaw Gateway + MCP Search Tools + ragtime
+ plugin layout + cursor-hooks.

## Structure (top-level)

```
claude-mem/
├── bunfig.toml                    ← Bun runtime
├── CHANGELOG.md
├── CLAUDE.md                       ← dev-mode CLAUDE.md
├── LICENSE                         ← Apache-2.0
├── NOTICE                          ← Apache attribution
├── README.md
├── SECURITY.md
├── WARP.md                         ← Warp terminal integration
├── cursor-hooks/                   ← Cursor IDE integration
├── docker/                         ← container deployments
├── docker-compose.yml + .e2e.yml   ← multi-mode container
├── Dockerfile.test-installer       ← test harness
├── docs/                           ← documentation
├── evals/                          ← eval harness (SOTA signal)
├── install/                        ← install scripts
├── openclaw/                       ← OpenClaw integration
├── package.json                    ← npm registry
├── plans/                          ← plan-mode artifacts
├── plugin/                         ← CC plugin
├── ragtime/                        ← RAG primitives
├── scripts/
├── src/                            ← TypeScript source
├── tests/
├── transcript-watch.example.json   ← config example
└── tsconfig.json
```

**Polyglot SOTA signals**:
- Bun runtime (bunfig.toml) = modern JS/TS performance
- Docker multi-mode = deployment-flexible
- evals/ directory = quant evaluation discipline (Anthropic-canonical)
- openclaw/ = ecosystem-bridge to OpenClaw competitor framework
- ragtime/ = explicit RAG primitive (rare; most memory tools defer to vector DB)

## README headings (load-bearing sections)

```
L128: Quick Start
L159: 🦞 OpenClaw Gateway
L184: Documentation
L188: Getting Started
L196: Best Practices
L201: Architecture
L211: Configuration & Development
L219: How It Works
L234: MCP Search Tools                    ← MCP integration
L273: Beta Features
L281: System Requirements
L290: Windows Setup Notes                  ← explicit Windows support (rare)
L302: Configuration
L308: Mode & Language Configuration
L349: Development
L355: Troubleshooting
L363: Bug Reports
L372: Contributing
L386: License
L402: Support
L417: What About $CMEM?                   ← token mention (CRYPTO REJECT-FLAG)
```

## ⚠️ CRYPTO REJECT-FLAG: "What About $CMEM?" (README:417)

The presence of a "$CMEM" mention in README suggests an associated cryptocurrency token.
Per `Z:/claude-sota/.claude/rules/convergence-gate.md` §Anti-pattern "Crypto-aligned repos":
crypto-token-associated repos are SOTA-fresh-paint anti-patterns regardless of stars.

**Verification probe** (Fire 10 candidate): read README:417-end to determine if $CMEM is:
- (a) actual cryptocurrency token requiring REJECT-FOR-FIT per crypto-attractor anti-pattern
- (b) merely a variable name / configuration reference (false-positive)
- (c) something else (further classification needed)

**Conservative disposition**: TENTATIVE REJECT pending Fire 10 deep-read of L417+. If
(a), REJECT-FOR-FIT and remove from W134-F9-claudemem study queue. If (b)/(c), proceed
with normal study-pilot evaluation.

## Architecture surface (inferred from structure + README sections)

| Component | File/Dir | Role |
|---|---|---|
| Capture | `transcript-watch.example.json` + `src/` | watch chat transcripts in real-time |
| Store | `ragtime/` | RAG-style indexing of captured memory |
| Search | "MCP Search Tools" (README:234) | MCP-server interface for memory retrieval |
| Gateway | `openclaw/` (README:159) | OpenClaw integration bridge |
| Deploy | `docker/` + `docker-compose.yml` | container deployment |
| Plugin | `plugin/` + `package.json` | CC plugin install path |
| Hooks | `cursor-hooks/` | Cursor IDE hooks (cross-tool) |
| Evals | `evals/` | quant evaluation harness |

## SRA D1-D10 verdict (with CRYPTO-FLAG caveat)

| Dim | Score | Notes |
|---|---|---|
| D1 license-use-class | PASS | Apache-2.0 — fully permissive |
| D2 freshness | PASS | 0-day push (today), VERY ACTIVE |
| D3 fresh-paint clear | ⚠️ NEEDS-VERIFICATION | 74k★ very high BUT $CMEM crypto-flag = potential fresh-paint anti-pattern (need git-history audit) |
| D4 maintainer-provenance | PARTIAL (thedotmack TIER-4-NAMED-INDIVIDUAL) | named individual; not yet TIER-3-ORG |
| D5 active-maintenance | PASS | 0-day push + multi-component (docker/evals/plugin/etc.) |
| D6 use-class compat | PASS | CC plugin + cursor-hooks + MCP = cross-tool compat |
| D7 Anthropic-aligned | PASS (with caveat) | uses CC plugin + MCP standards; OpenClaw bridge may pull non-Anthropic alignment |
| D8 industry adoption | PASS | 74k★ extremely high |
| D9 FM-class clear | ⚠️ NEEDS-VERIFICATION | crypto-flag = potential SUPPLY-CHAIN-ATTACK vector (Probe 6 npm-package verification needed) |
| D10 replacement viability | ⚠️ OVERLAP-PROBE-PENDING | overlaps with existing mcp-memory L1 + Graphiti L3 stack |

**SRA score: 6/10 PASS + 2 NEEDS-VERIFICATION + 2 PARTIAL/OVERLAP-PROBE** —
**STUDY-PILOT-CONDITIONAL** pending crypto-flag resolution.

## ⚠️ DEFERRED — crypto-flag investigation required

Fire 6 ranked claude-mem 74k★ as SOTA discovery; Fire 9 audit surfaces $CMEM mention
which triggers Probe 6 supplementary direct-file blocker per
`Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`.

**Probe 6 required for Fire 10**:
1. Read README:417-end to classify $CMEM (crypto vs config-variable)
2. If crypto: check for token-related dependencies in package.json
3. If crypto: classify as REJECT-FOR-FIT per crypto-attractor anti-pattern
4. If config-variable: classify as STUDY-PILOT for memory-stack overlap probe

**Forward fire**: W134-F10-claudemem-crypto-probe = read README full + scan package.json
+ scan src/ for token-related code paths.

## OpenClaw Gateway — sister-ecosystem signal (README:159)

OpenClaw is a CC-DERIVATIVE / CC-COMPETITOR ecosystem (per Fire 8 nanoclaw discovery —
"alternative to OpenClaw"). claude-mem ships a Gateway adapter to OpenClaw, suggesting
this repo OPERATES across BOTH CC and OpenClaw ecosystems.

For eee (CC-native), the OpenClaw Gateway is unused-but-not-harmful. Optional component.

## MCP Search Tools (README:234)

Native MCP-server interface for memory retrieval. Sister to eee's mcp-memory L1 stack
which uses `doobidoo/mcp-memory-service v10.51.3` (already INSTALLED). Direct overlap
probe required (Fire 10).

## Replacement-of (existing eee primitives — OVERLAP PROBE)

| Existing eee surface | Possibly replaced by | Status |
|---|---|---|
| L1 mcp-memory-service (Apache-2.0, sqlite_vec, INSTALLED) | claude-mem MCP Search Tools | NEEDS PROBE |
| L3 Graphiti + FalkorDB temporal-KG (INSTALLED) | claude-mem RAG via ragtime/ | NEEDS PROBE |
| Cross-session memory recall | claude-mem transcript-watch | NEEDS PROBE |

**Verdict**: 3 potential overlap surfaces with existing L1/L3 memory stack. Cannot
recommend install without overlap probe.

## Risk classification

- **Install class**: PRIMARY (Apache-2.0 + canonical CC plugin install) IF crypto-flag clears
- **Reversibility**: HIGH (CC plugin uninstall)
- **Blast radius**: HIGH (transcript-watch runs as background service)
- **Cross-model gate**: required (CR-3)
- **Sibling-bleed**: N/A
- **Crypto-flag**: $CMEM mention requires Probe 6 resolution BEFORE adoption

## Why-SOTA (provisional, pending crypto-flag clearance)

1. **74k★** = highest-signal new memory primitive in cohort
2. **Apache-2.0** = license-class clear
3. **0-day push velocity** = highest activity
4. **Cross-tool** = CC + Cursor + OpenClaw + MCP
5. **Quant evals** native (evals/ directory) = Anthropic-canonical eval-first discipline
6. **Windows Setup Notes** = explicit Windows support (rare; eee is Windows-native)
7. **Docker multi-mode** = deployment-flexible

## Why DEFER (Fire 9 verdict)

1. **$CMEM crypto-flag** = potential SOTA-fresh-paint / crypto-attractor anti-pattern (per `convergence-gate.md`)
2. **Memory stack overlap** = 3 potential overlap surfaces with existing mcp-memory + Graphiti
3. **74k★ at 0-day push** = velocity vs age ratio possibly fresh-paint suspect (need git-history audit)
4. **OpenClaw Gateway** = brings non-Anthropic ecosystem coupling

**Verdict**: ⚠️ STUDY-PILOT-CONDITIONAL — DEFER install pending Fire 10 crypto-flag
clearance + memory-stack overlap probe.

## Forward fire status

- **W134-F10-claudemem-crypto-probe**: classify $CMEM via README:417+ read + package.json scan
- **W134-F10-claudemem-overlap**: probe overlap with mcp-memory + Graphiti
- IF crypto-flag clears AND overlap-probe shows complementary (not duplicate): re-evaluate as Tier-3 install
- IF crypto-flag triggers: REJECT-FOR-FIT and remove from queue

## Mia ladder advance

n=977 → n=983 (+6: Apache-2.0 verified / 74k★ verified / 0-day push verified / $CMEM crypto-flag identified /
3 memory-stack overlap surfaces identified / 21-component repo structure mapped)
