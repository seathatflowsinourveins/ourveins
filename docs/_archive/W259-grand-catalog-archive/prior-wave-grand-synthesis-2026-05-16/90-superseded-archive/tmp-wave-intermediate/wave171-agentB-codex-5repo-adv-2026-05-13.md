## ARTIFACT-INLINE: tmp/wave171-agentB-codex-5repo-adv-2026-05-13.md

STAND-IN-NOTICE per cross-model-consensus.md Env-funneled:
Codex CLI was present (`codex-cli 0.130.0`) but unavailable for model execution. Foreground consult failed before inference with:
`Error: failed to initialize in-process app-server client: Access is denied. (os error 5)`.

Prompt file:
`.claude/state/codex_consult_w171_p3_wave1.txt`

Output file:
`.claude/state/codex_consult_w171_p3_wave1_OUT.txt`

Fresh-source limitation:
`mcp__github__get_file_contents` was not exposed in this session. GitHub API/curl failed on Windows TLS credential initialization. `git ls-remote` succeeded for fresh HEAD SHAs. Exact README/LICENSE/manifest blob SHAs are [UNKNOWN] and must not be treated as verified.

Fresh HEAD evidence [VERIFIED via git ls-remote 2026-05-13]:
- wshobson/agents: `34632bcbea28176ba25bbbc43cd4017d88b1cac6`
- abhigyanpatwari/GitNexus: `507f84b69af29f6a5596538a59175bd930d07e57`
- quemsah/awesome-claude-plugins: `62e65931020618aa91d947c0b263e4d181f4a953`
- Shubhamsaboo/awesome-llm-apps: `795212bfb3ba7d25db04c7879d39621429fd093d`
- forrestchang/andrej-karpathy-skills: `2c606141936f1eeef17fa3043a72095b4765b9c2`

VERDICT-5:

| Repo | Axes 1/2/3 | SRA | CR-12 | Probe DAG 1-7 | VERDICT | conf |
|---|---|---:|---|---|---|---:|
| wshobson/agents | PARTIAL / PARTIAL / PARTIAL | 6/10 | PARTIAL-OVERLAP | PASS: discovery breadth; FAIL/PARTIAL: duplicate-risk, provenance/license blob unverified | STUDY-PILOT-30d | 0.72 |
| abhigyanpatwari/GitNexus | PASS / PASS / PASS | 8/10 | DUPLICATE | PASS: already installed, strong fit; action is upgrade/cite audit, not net-new install | STUDY-PILOT-30d | 0.84 |
| quemsah/awesome-claude-plugins | PARTIAL / FAIL / PARTIAL | 4/10 | ECOSYSTEM-IMPORT | PARTIAL: useful discovery index; FAIL: not runtime primitive, questionable generated ranking evidence | CITE-IMPORT-AMBER | 0.78 |
| Shubhamsaboo/awesome-llm-apps | PASS / PARTIAL / PASS | 5/10 | PROVIDER-COMPLEMENT | PARTIAL: runnable examples/cookbook; FAIL for eee runtime install fit | REJECT-FOR-FIT | 0.76 |
| forrestchang/andrej-karpathy-skills | PARTIAL / PARTIAL / PARTIAL | 7/10 | CITE-CLASS-CANONICAL | PASS: concise behavioral authority; PARTIAL: likely duplicates local CLAUDE/Codex discipline | CITE-IMPORT-AMBER | 0.82 |

Top-2 INSTALL / pilot ranked:
1. GitNexus: do not install as new; keep installed and run upgrade/pilot review against current installed `v1.6.4-rc.112` vs upstream HEAD.
2. wshobson/agents: 30-day study pilot only, scoped to primitives not already covered by installed plugin marketplaces/agents/skills.

Top-2 REJECT/DEFER ranked:
1. Shubhamsaboo/awesome-llm-apps: reject for runtime-install fit; keep as external example/cookbook source only if specific app templates are needed.
2. quemsah/awesome-claude-plugins: defer install; cite/import as an ecosystem discovery index after license/provenance and ranking methodology are verified.
