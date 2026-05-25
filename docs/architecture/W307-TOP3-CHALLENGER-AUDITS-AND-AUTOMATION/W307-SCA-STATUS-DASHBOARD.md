# SCA Status Dashboard

> Generated: 2026-05-19T02:10:25+00:00 · Current wave: W307 · Source: VERDICT-LEDGER (38 rows) + T6 basic-memory (19 files)
> Tool: `tools/sca_status_dashboard.py` (W307 ship; CR-1/2/3/5 compliant)

## §1 Active T1 INSTALL verdicts

| # | Wave | Candidate | Verdict | install_score | pattern_score | Lifecycle |
|---:|:---:|---|---|---:|---:|---|
| 16 | W296 | `mem0ai/mem0` | T1 INSTALL with caveat → AT-RISK-OF-T1-DOWNGRADE per W304 5-source convergence | 4.04 | 4.65 | AT-RISK |
| 19 | W301.C | `anthropics/skills` | T1 INSTALL HIGH-CONF | 4.55 | 4.32 | INSTALLED |

**T1 active count**: 2

## §2 AGING verdicts (decision_wave + 6..11 ago)

| # | Wave | Candidate | Verdict | Action recommended |
|---:|:---:|---|---|---|
| 12 | W296 | `anthropics/claude-agent-sdk-python` | T1 INSTALL | Re-litigate at next wave |
| 13 | W296 | `github/spec-kit` | T1 CO-INSTALL | Re-litigate at next wave |
| 14 | W296 | `astral-sh/uv` | T1 INSTALL | Re-litigate at next wave |
| 15 | W296 | `oraios/serena` | T1 ELEVATE | Re-litigate at next wave |
| 20 | W301.C | `mattpocock/skills` | T3 PATTERN-STUDY | Re-litigate at next wave |
| 21 | W301.C | `anthropics/anthropic-quickstarts` | T4 CITE-ONLY | Re-litigate at next wave |
| 22 | W301.C | `anthropics/claude-code` | N/A meta-audit | Re-litigate at next wave |
| 23 | W301.D | `sca-v6-design-itself` | T1 INSTALL pending W302 codex Stop-hook + operator §7 ratification | Re-litigate at next wave |
| 24 | W301.E | `winsw/winsw` | T1 INSTALL | Re-litigate at next wave |
| 25 | W301.E | `XuehaiPan/nvitop` | T1 INSTALL | Re-litigate at next wave |

## §3 STALE verdicts (decision_wave + 12+ ago)

| # | Wave | Candidate | Verdict | Action required |
|---:|:---:|---|---|---|
| 1 | W288 | `research-arch-v2-itself` | T1 INSTALL | Must be re-litigated before citing |
| 2 | W293 | `sca-v3.1-itself` | T1 INSTALL | Must be re-litigated before citing |
| 3 | W291.Stage2 | `OthmanAdi/planning-with-files` | T1 INSTALL | Must be re-litigated before citing |
| 4 | W291.Stage2 | `LearningCircuit/local-deep-research` | T2 VENDOR-FORK | Must be re-litigated before citing |
| 5 | W291.Stage2 | `microsoft/PromptWizard` | T2 VENDOR-FORK | Must be re-litigated before citing |
| 6 | W291.Stage2 | `bytedance/deer-flow` | T3 PATTERN-STUDY | Must be re-litigated before citing |
| 7 | W291.Stage2 | `Azure/PyRIT` | T3 PATTERN-STUDY | Must be re-litigated before citing |
| 8 | W291.Stage2 | `daymade/claude-code-skills` | T3 PATTERN-STUDY | Must be re-litigated before citing |
| 10 | W291.Stage2 | `levnikolaevich/claude-code-skills` | T4 CITE-ONLY | Must be re-litigated before citing |
| 11 | W291.Stage2 | `rohitg00/awesome-claude-code-toolkit` | T4 CITE-ONLY | Must be re-litigated before citing |
| 2 | W288 | `OthmanAdi/planning-with-files` | 4.23 | Must be re-litigated before citing |
| 3 | W288 | `LearningCircuit/local-deep-research` | 4.38 | Must be re-litigated before citing |
| 4 | W288 | `bytedance/deer-flow` | 3.24 | Must be re-litigated before citing |
| 5 | W288 | `joshuaswarren/remnic` | 3.21 | Must be re-litigated before citing |
| 6 | W288 | `memodb-io/Acontext` | 3.06 | Must be re-litigated before citing |
| 7 | W288 | `sipyourdrink-ltd/bernstein` | 3.18 | Must be re-litigated before citing |
| 8 | W288 | `VectifyAI/PageIndex` | 3.85 | Must be re-litigated before citing |
| 9 | W288 | `markmhendrickson/neotoma` | 2.90 | Must be re-litigated before citing |
| 10 | W288 | `Lyellr88/MARM-Systems` | 3.35 | Must be re-litigated before citing |
| 11 | W288 | `Dicklesworthstone/frankenterm` | 2.60 | Must be re-litigated before citing |
| 17 | W295 | `daytonaio/daytona` | T3 PATTERN-STUDY | Must be re-litigated before citing |
| 18 | W295 | `All-Hands-AI/OpenHands` | T3 PATTERN-STUDY | Must be re-litigated before citing |

## §4 T6 basic-memory parity check

- Ledger rows: 35
- T6 verdict files: 19
- Missing T6 file for ledger entry (≈): 24
  - Examples: Azure/PyRIT, levnikolaevich/claude-code-skills, Portkey-AI/gateway, anthropics/claude-code, sipyourdrink-ltd/bernstein
- T6 file with no ledger row (orphan): 9
  - Examples: sca/v6-design-itself, portkey/ai-gateway, anthropics/claude-code-meta-audit, otel/semantic-conventions-genai, all/hands-ai-openhands

## §5 Special-status verdicts (PENDING / AT-RISK / INSTALLED / RE-LITIGATED / RETIRED)

| # | Wave | Candidate | Verdict | Special status |
|---:|:---:|---|---|---|
| 9 | W291.Stage2 | `Submersible/mcp-hashline-edit-server` | PENDING | PENDING |
| 16 | W296 | `mem0ai/mem0` | T1 INSTALL with caveat → AT-RISK-OF-T1-DOWNGRADE per W304 5-source convergence | AT-RISK |
| 19 | W301.C | `anthropics/skills` | T1 INSTALL HIGH-CONF | INSTALLED |

## §6 AGING-RELITIGATION-QUEUE.md

- Queue file: EXISTS at `docs/architecture/AGING-RELITIGATION-QUEUE.md`

---
> Run `python tools/sca_status_dashboard.py --dry-run` for a CLI summary.
