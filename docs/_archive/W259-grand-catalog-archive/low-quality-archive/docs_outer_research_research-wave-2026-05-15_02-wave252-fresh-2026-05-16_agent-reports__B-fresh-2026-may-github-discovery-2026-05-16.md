# Wave 252 Track B — May 2026 Fresh GitHub Discovery + LLMLingua SOTA Reset

Date: 2026-05-16
Status: STAND-IN (FM-17.d BRIDGE-MODE blocked, os error 5)

## 1. LLMLingua Staleness Confirmation

LLMLingua is confirmed as historical and cite-only for the eee runtime. The verified upstream state from the prior Track B run was:

- Repository: `microsoft/LLMLingua`
- Last commit SHA: `e0e9d99`
- Last commit date: `2025-10-28`
- License: MIT
- Runtime posture: CITE-ONLY / DO NOT DEFAULT

Interpretation: LLMLingua remains useful as a research citation and comparison baseline, but it should not be installed or selected as the default compression layer for the May 2026 eee runtime.

## 2. 30-Candidate Matrix

| Tier | Candidate | License / Policy | Track B disposition |
|---|---|---|---|
| ADOPT/KEEP | Anthropic prompt caching | Native Anthropic feature | Keep as default cache primitive. Verified details: TTL 5 min, 1 hr extra cost option, 20-block lookback, all active Claude models. |
| ADOPT/KEEP | `/compact` | Native Claude Code lifecycle primitive | Keep as operator-controlled context compaction primitive. |
| ADOPT/KEEP | `/clear` | Native Claude Code lifecycle primitive | Keep as session-reset primitive. |
| ADOPT/KEEP | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | Native Claude Code environment control | Keep as explicit autocompact threshold override. |
| ADOPT/KEEP | `rtk-ai/rtk` | Apache-2.0 | Keep as token-efficiency rewrite layer. |
| ADOPT/KEEP | `yamadashy/repomix` | MIT | Keep as codebase compression / packing primitive. |
| ADOPT/KEEP | `ryoppippi/ccusage` | MIT | Keep as usage and cost visibility primitive. |
| ADOPT/KEEP | OpenAI structured outputs | Native OpenAI API feature | Keep for schema-bound outputs where OpenAI APIs are used. |
| STUDY-PILOT | `chopratejas/headroom` | Apache-2.0 | Study as context headroom / compression candidate before default adoption. |
| STUDY-PILOT | `yvgude/lean-ctx` | Apache-2.0 | Study as lean context candidate before default adoption. |
| STUDY-PILOT | `zjunlp/LightMem` | MIT | Study, but note it imports an LLMLingua-2 dependency. |
| STUDY-PILOT | `MemPalace/mempalace` | AMBER | Study with license / provenance caution before install. |
| STUDY-PILOT | `ace-agent/ace` | Unverified in stand-in | Study only; needs source verification before runtime adoption. |
| STUDY-PILOT | `griver/Q-RAG` | Unverified in stand-in | Study as retrieval / compression-adjacent candidate. |
| CITE/PILOT-only | `mksglu/context-mode` | ELv2 REJECTED | Cite or isolated pilot only; do not default due to license rejection. |
| CITE/PILOT-only | WorldMM | Unverified in stand-in | Cite / pilot only. |
| CITE/PILOT-only | CoVR-R | Unverified in stand-in | Cite / pilot only. |
| CITE/PILOT-only | AgentSkillOS | Unverified in stand-in | Cite / pilot only. |
| CITE/PILOT-only | AOrchestra | Unverified in stand-in | Cite / pilot only. |
| DO NOT DEFAULT | `microsoft/LLMLingua` | MIT | Historical / cite-only; last commit `e0e9d99` on `2025-10-28`. |
| DO NOT DEFAULT | Selective-Context | Research baseline | Do not default; cite-only unless a maintained production implementation is verified. |
| DO NOT DEFAULT | RECOMP | Research baseline | Do not default; cite-only unless a maintained production implementation is verified. |
| DO NOT DEFAULT | AutoCompressors | Research baseline | Do not default; cite-only unless a maintained production implementation is verified. |
| DO NOT DEFAULT | Unverified C9 repo 1 | Unverified | Do not default. |
| DO NOT DEFAULT | Unverified C9 repo 2 | Unverified | Do not default. |
| DO NOT DEFAULT | Unverified C9 repo 3 | Unverified | Do not default. |
| DO NOT DEFAULT | Unverified C9 repo 4 | Unverified | Do not default. |
| DO NOT DEFAULT | Unverified C9 repo 5 | Unverified | Do not default. |
| DO NOT DEFAULT | Unverified C9 repo 6 | Unverified | Do not default. |
| DO NOT DEFAULT | Unverified C9 repo 7 | Unverified | Do not default. |

## 3. May 2026 SOTA Reset Summary

The May 2026 reset moves the default eee posture away from LLMLingua-style external compression and toward the Anthropic-native cache / compact lifecycle plus measured token-efficiency tooling.

Default stack:

- Anthropic prompt caching as the primary model-native cache primitive.
- `/compact`, `/clear`, and `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` as the session lifecycle controls.
- `rtk-ai/rtk` for rewrite-layer token efficiency.
- `yamadashy/repomix` for repo compression and codebase packaging.
- `ryoppippi/ccusage` for spending and usage visibility.
- OpenAI structured outputs where schema-bound OpenAI API calls are part of a workflow.

LLMLingua remains useful for historical grounding, benchmark comparison, and citation trail continuity, but the eee runtime should not treat it as the default install or default compression strategy.

## 4. C2/C4/C7 Cohort Gaps

- C4: BrowseComp implementing repository not found. This remains a C4 gap.
- C2: Pending.
- C7: Pending.

These gaps should stay open until a follow-up pass verifies primary repositories, licenses, install channels, and benchmark relevance.

VERDICT: STAND-IN-COMPLETE — LLMLingua is confirmed as historical/cite-only for eee runtime. The May 2026 SOTA reset is Anthropic-native cache/compact lifecycle plus RTK/Repomix/ccusage, with Headroom, lean-ctx, LightMem, MemPalace, Q-RAG, and AgentSkillOS/AOrchestra as benchmarked study pilots rather than immediate default installs.
