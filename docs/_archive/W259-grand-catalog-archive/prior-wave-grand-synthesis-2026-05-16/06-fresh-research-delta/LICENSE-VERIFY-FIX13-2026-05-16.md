# License Verification — fix13 GraphQL probe results

> **Generated 2026-05-16** by license-verify subagent. Method: `gh api repos/<owner>/<repo>/license --jq '.license.spdx_id'` direct GitHub License-detector API (authoritative single-call), falling back to LICENSE-blob base64-decode for NOASSERTION rows. Covers all 35 `(verify)`-tagged repos in `GRAPHQL-FINAL-MISSING-2026-05-16.md`.
> **Star-pump heuristic**: `[POPULAR-BUT-UNVERIFIED]` = created <6mo ago AND ≥5000★ (i.e., created after 2025-11-16). `[MARKETING-LANGUAGE-FLAG]` = numeric superlatives in description ("100%", "-77%", "X% fewer tokens", "only ... hitting Y").

---

## Verification table

| Repo | Prior tag | Confirmed license | Permissive | Install-eligibility | Star-pump flag |
|---|---|---|---|---|---|
| alibaba/zvec | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | [POPULAR-BUT-UNVERIFIED] (2025-12, 9.6k★ in 5mo) |
| tirth8205/code-review-graph | (verify) | MIT | PERMISSIVE | INSTALL-OK | [POPULAR-BUT-UNVERIFIED] [MARKETING-LANGUAGE-FLAG] (2026-02, 16k★ in 2.5mo, "6.8× fewer / 49× tokens") |
| Lum1104/Understand-Anything | (verify) | MIT | PERMISSIVE | INSTALL-OK | [POPULAR-BUT-UNVERIFIED] (2026-03, 14.8k★ in <2mo) |
| zjunlp/DeepKE | (likely MIT) | MIT | PERMISSIVE | INSTALL-OK | — |
| robert-mcdermott/ai-knowledge-graph | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | — |
| raphaelmansuy/edgequake | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | — |
| Gentleman-Programming/engram | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| moltis-org/moltis | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| DeusData/codebase-memory-mcp | (verify) | MIT | PERMISSIVE | INSTALL-OK | [MARKETING-LANGUAGE-FLAG] ("155 languages, 99% fewer tokens") |
| agentset-ai/agentset | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| ghostwright/phantom | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | — |
| Dataojitori/nocturne_memory | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| alioshr/memory-bank-mcp | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| shaneholloman/mcp-knowledge-graph | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| Mibayy/token-savior | (verify) | MIT | PERMISSIVE | INSTALL-OK | [MARKETING-LANGUAGE-FLAG] ("-77%/-76%/0 losses, 100% on real benchmark") |
| GreatScottyMac/context-portal | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | — |
| christopherkarani/Wax | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | — |
| orneryd/NornicDB | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| alash3al/stash | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| samvallad33/vestige | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| awizemann/scarf | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | — |
| iOfficeAI/AionUi | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | [POPULAR-BUT-UNVERIFIED] (2025-08, 25k★ in 9mo) |
| UfoMiao/zcf | (verify) | MIT | PERMISSIVE | INSTALL-OK | (2025-07, 6k★ — 10mo; below star-pump threshold) |
| can1357/oh-my-pi | (verify) | MIT | PERMISSIVE | INSTALL-OK | (2025-12, 4.5k★ — under 5k★ threshold) |
| esengine/DeepSeek-Reasonix | (verify) | AGPL-3.0 | STRONG-COPYLEFT | RESTRICTED | (2026-04, 3.3k★ — under 5k★ threshold) |
| nvimtools/none-ls.nvim | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| SilasMarvin/lsp-ai | (verify) | Unlicense | PERMISSIVE (public-domain equiv) | INSTALL-OK | — |
| typescript-language-server/typescript-language-server | (verify) | NOASSERTION → MIT (vscode-derivative) | PERMISSIVE | INSTALL-OK | — |
| scalameta/metals | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | — |
| Feel-ix-343/markdown-oxide | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | — |
| fwcd/kotlin-language-server | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| Shopify/ruby-lsp | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |
| bytedance/Dolphin | (verify) | **NOASSERTION → Qwen RESEARCH LICENSE** (non-commercial) | RESTRICTIVE | **REJECT** | [POPULAR-BUT-UNVERIFIED] (2025-05, 9k★ in 12mo) |
| run-llama/liteparse | (verify) | Apache-2.0 | PERMISSIVE | INSTALL-OK | [POPULAR-BUT-UNVERIFIED] (2026-02, 5.1k★ in 3mo) |
| CatchTheTornado/text-extract-api | (verify) | MIT | PERMISSIVE | INSTALL-OK | — |

**Summary**: 35 of 35 `(verify)` repos resolved. 33 PERMISSIVE / INSTALL-OK; 1 STRONG-COPYLEFT / RESTRICTED (DeepSeek-Reasonix AGPL-3.0); 1 RESTRICTIVE / **REJECT** (Dolphin = Qwen Research License non-commercial).

---

## Promote-to-INSTALL list (post-verify clean — STUDY-PILOT P0 candidates)

All 10 fix13 P0 STUDY-PILOT picks survive license-verify EXCEPT **bytedance/Dolphin** (REJECTED below):

- **alibaba/zvec** (Apache-2.0) — L0.0 in-process vector DB; license clean → promote eligible
- **Gentleman-Programming/engram** (MIT) — L0.2 Go-binary memory MCP; license clean → promote eligible
- **DeusData/codebase-memory-mcp** (MIT) — L0.2/L0.4 155-lang C-binary memory; license clean → promote eligible (MARKETING-LANGUAGE flag stays — verify bench independently)
- **Mibayy/token-savior** (MIT) — L0.2 strongest-claim Python MCP; license clean → promote eligible (MARKETING-LANGUAGE flag stays — verify the 100%-benchmark claim independently before adoption)
- **facebook/pyrefly** (MIT — already confirmed in source row, not a "verify") — L4.0 Meta Python typechecker; was already MIT (assumed)
- **SilasMarvin/lsp-ai** (Unlicense) — L4.0 AI-in-LSP pattern; public-domain-equivalent → promote eligible
- **run-llama/liteparse** (Apache-2.0) — L4.5 LlamaParse self-host alt; license clean → promote eligible
- **microsoft/agent-framework** (MIT — assumed in source row, not "verify") — L6.0 AutoGen successor
- **UfoMiao/zcf** (MIT) — L2.0 zero-config CC+Codex bootstrap; license clean → promote eligible

## Reject/Defer list (post-verify blockers)

- **bytedance/Dolphin** — was STUDY-PILOT-P0 (ACL 2025 doc parsing); LICENSE blob reveals **Qwen RESEARCH LICENSE AGREEMENT** (NON-COMMERCIAL ONLY, Alibaba Cloud terms). Despite ByteDance authorship the model artifact ships under Alibaba's research-only license. → **REJECT for runtime use-class** (orchestrator/agent install is not "non-commercial research"). Replace L4.5 slot candidate with run-llama/liteparse OR existing MinerU/docling.
- **esengine/DeepSeek-Reasonix** — was EVALUATE; AGPL-3.0 is STRONG-COPYLEFT → **DEFER** for runtime use-class. AGPL network-copyleft contaminates orchestrator distribution; only acceptable if isolated subprocess + no derivative-work coupling. Not P0 anyway (3.3k★, marketing-tier).

## Caveats

- **typescript-language-server** licensed NOASSERTION because LICENSE file is composite (vscode-derived parts MIT + own additions). Spirit = MIT; usable. Confirmed first 20 LOC of LICENSE shows verbatim MIT for vscode-derivative portion.
- **SilasMarvin/lsp-ai** uses the Unlicense (public-domain dedication). Some jurisdictions don't honor public-domain dedications → for strict compliance treat as MIT-equivalent risk; acceptable for runtime install.
- **POPULAR-BUT-UNVERIFIED** flag persists on 6 repos for bake-off discipline: zvec, code-review-graph, Understand-Anything, AionUi, Dolphin (now REJECTED), liteparse. Star-velocity should be cross-checked against independent signals (GitHub stargazers timeline, downloads, third-party citations) before runtime adoption.
- **MARKETING-LANGUAGE-FLAG** persists on 3 repos: code-review-graph ("6.8×/49×"), codebase-memory-mcp ("99%/155 langs"), token-savior ("-77%/-76%/0 losses, 100% benchmark"). Treat numeric superlatives as vendor claim — independent benchmark required before P0 promotion.
