# W269 — ik_llama.cpp PR Sweep, 2026-04-17 → 2026-05-17

> 30 d. Upstream HEAD `1f8c603d` ("Quantize: add extra output tensor for MTP (#1810)", 2026-05-17); local `Z:/repos/deps/ik_llama.cpp` matches. Source: `gh api .../pulls?state=closed&per_page=100&sort=updated` → 100 records, 81 merged in window, 51 dropped out-of-scope (footnote). 30 in-scope. URL: `https://github.com/ikawrakow/ik_llama.cpp/pull/<n>`. SHA = 8-char merge. Effect = vs `:8080` Qwen3.6-35B-A3B-IQ4_XS + `Z:/tools/llama-swap/config.yaml`. Bucket: (1) MoE/qwen3.6 (2) KV (3) spec (4) mmproj (5) quant (6) CUDA (7) server.

## In-scope PRs (30)

| # | Date | Author | SHA | Change | Bucket | Effect |
|---|---|---|---|---|---|---|
| [1816](https://github.com/ikawrakow/ik_llama.cpp/pull/1816) | 05-17 | ikawrakow | `9b783bf2` | Fix Qwen3.5/3.6 MTP × `-muge` gibberish | (1)(7) | **POS** |
| [1810](https://github.com/ikawrakow/ik_llama.cpp/pull/1810) | 05-17 | ikawrakow | `fcbb17a8` | quantize: extra output tensor for MTP | (1)(3)(5) | **POS** |
| [1809](https://github.com/ikawrakow/ik_llama.cpp/pull/1809) | 05-16 | ikawrakow | `b5da743b` | `--mtp-requantize-output-tensor` (+5-10 % TG) | (1)(3)(5) | **POS** |
| [1806](https://github.com/ikawrakow/ik_llama.cpp/pull/1806) | 05-15 | ikawrakow | `25ab82ab` | imatrix fallback `ffn_up`→`ffn_gate` | (5) | NEUT |
| [1789](https://github.com/ikawrakow/ik_llama.cpp/pull/1789) | 05-15 | SamuelOliveirads | `a8ca8bc8` | dual spec (MTP + self-spec) | (3) | **POS** |
| [1785](https://github.com/ikawrakow/ik_llama.cpp/pull/1785) | 05-15 | jkyamog | `f2acd15e` | MMQ large-batch on Volta | (6) | N/A |
| [1804](https://github.com/ikawrakow/ik_llama.cpp/pull/1804) | 05-15 | SamuelOliveirads | `83a2729e` | disable MTP for parallel slots | (3)(7) | NEUT |
| [1801](https://github.com/ikawrakow/ik_llama.cpp/pull/1801) | 05-15 | ikawrakow | `da4ebcc7` | faster imatrix | (5) | NEUT |
| [1797](https://github.com/ikawrakow/ik_llama.cpp/pull/1797) | 05-13 | ubergarm | `19bb6503` | `--threads-mtmd` mmproj thread count | (4) | **POS** |
| [1798](https://github.com/ikawrakow/ik_llama.cpp/pull/1798) | 05-13 | ikawrakow | `62755c24` | fix `ggml_nbytes` for IQ4_KS per-row meta | (5)(6) | POS |
| [1792](https://github.com/ikawrakow/ik_llama.cpp/pull/1792) | 05-13 | ikawrakow | `67735a45` | MTP dead-code cleanup | (3) | NEUT |
| [1791](https://github.com/ikawrakow/ik_llama.cpp/pull/1791) | 05-13 | ikawrakow | `26591f2b` | MTP faster recurrent-state restore | (1)(3) | POS |
| [1788](https://github.com/ikawrakow/ik_llama.cpp/pull/1788) | 05-13 | ubergarm | `409687e7` | n_batch only for GPU mmproj | (4) | POS |
| [1787](https://github.com/ikawrakow/ik_llama.cpp/pull/1787) | 05-13 | firecoperana | `7ff12d64` | server: reset cache on PP halt | (7) | POS |
| [1786](https://github.com/ikawrakow/ik_llama.cpp/pull/1786) | 05-13 | ikawrakow | `68f36e78` | Gemma4 MTP no f32 KV cast (+7 % TG) | (1)(2)(3) | POS |
| [1781](https://github.com/ikawrakow/ik_llama.cpp/pull/1781) | 05-12 | lr1729 | `b0d35532` | MTP target-slot position (mm+MTP fix) | (1)(3)(4) | POS |
| [1780](https://github.com/ikawrakow/ik_llama.cpp/pull/1780) | 05-12 | ikawrakow | `16369dbf` | MTP revive graph reuse | (3) | POS |
| [1778](https://github.com/ikawrakow/ik_llama.cpp/pull/1778) | 05-11 | ikawrakow | `b28ddd49` | MTP drop per-step SSM copy (+3-4 % TG) | (1)(3) | POS |
| [1777](https://github.com/ikawrakow/ik_llama.cpp/pull/1777) | 05-11 | ikawrakow | `54262626` | avoid recurrent-state copy (+1-2 % TG) | (1)(3) | POS |
| [1773](https://github.com/ikawrakow/ik_llama.cpp/pull/1773) | 05-11 | ikawrakow | `d8109054` | MTP split-mode per-step state | (3) | NEUT |
| [1761](https://github.com/ikawrakow/ik_llama.cpp/pull/1761) | 05-09 | ikawrakow | `43df4192` | AVX2 greedy spec sampling (+10 % MTP TG) | (3)(6) | POS |
| [1759](https://github.com/ikawrakow/ik_llama.cpp/pull/1759) | 05-09 | ikawrakow | `010da571` | async recurrent-state copies | (2)(3) | POS |
| [1758](https://github.com/ikawrakow/ik_llama.cpp/pull/1758) | 05-11 | lr1729 | `616e8465` | server: MTP × multimodal prompts | (1)(3)(4)(7) | **POS** |
| [1745](https://github.com/ikawrakow/ik_llama.cpp/pull/1745) | 05-07 | joelfarthing | `4997c8e4` | `qwen35moe` MTP tail-layer support | (1)(3) | **POS** |
| [1744](https://github.com/ikawrakow/ik_llama.cpp/pull/1744) | 05-10 | SamuelOliveirads | `a7030336` | Gemma 4 MTP support | (1)(3) | POS |
| [1743](https://github.com/ikawrakow/ik_llama.cpp/pull/1743) | 05-06 | firecoperana | `9e059544` | server: mtmd checkpoint restore | (4)(7) | POS |
| [1707](https://github.com/ikawrakow/ik_llama.cpp/pull/1707) | 04-30 | ikawrakow | `47b46ba3` | faster small-batch (≤8) MoE | (1)(6) | **POS** |
| [1698](https://github.com/ikawrakow/ik_llama.cpp/pull/1698) | 04-28 | SamuelOliveirads | `02857cd8` | Qwen 3.5 MTP (dense) | (1)(3) | NEUT |
| [1701](https://github.com/ikawrakow/ik_llama.cpp/pull/1701) | 04-27 | treo | `12f3063e` | ngram-mod reset `i_last` on low accept | (3) | **POS** |
| [1646](https://github.com/ikawrakow/ik_llama.cpp/pull/1646) | 04-17 | SamuelOliveirads | `e2834ab3` | self-decoding: suffix-decoding | (3) | POS |

Already live in HEAD `1f8c603d` (no action): #1701, #1707, #1743, #1758, #1781, #1787, #1788, #1798. Five below are **not yet** in `:8080` cmdline / llama-swap.

## Top 5 to adopt

**1 — PR #1816 + #1810 + #1809 + #1745: turn on MTP.** Flag: `-mtp --draft-max 1 --draft-p-min 0.0`. Precondition: re-quant base with `--mtp-requantize-output-tensor q8_0` (or pull Unsloth MTP-tail GGUF). Land in NSSM `AppParameters` and llama-swap `qwen36-moe.cmd` — **replace** the `--spec-type ngram-mod ...` line. Risk: W267 failed at `blk.40.attn_qkv.weight` because Unsloth's MTP-GGUF ships unmerged QKV at the tail; #1816 fixes `-muge` (`common/common.cpp:2037`), **not** `--merge-qkv` (`:2033`) — mitigation: drop `--merge-qkv` for MTP runs. Rollback: `nssm set IkLlamaServer AppParameters (Get-Content tmp/nssm-IkLlamaServer-AppParameters.pre-W267.bak -Raw); nssm restart IkLlamaServer`.

**2 — PR #1797: `--threads-mtmd`.** Flag: add `--threads-mtmd 8` (`-tm 8`). Land in NSSM `AppParameters` and llama-swap `qwen36-moe.cmd` / `qwen3-vl-8b.cmd`, after `--threads N`. Risk: low, additive — without it mmproj encode shares the narrow LLM thread pool (`-t 4` live, `-t 1` llama-swap). Rollback: drop the flag, restart.

**3 — PR #1789: dual MTP + ngram-mod.** After item 1, **keep** `--spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64` and **also add** `-mtp --draft-max 1` in llama-swap `qwen36-moe.cmd`. Risk: only valid after item 1; `--parallel 1` keeps us outside #1804's exclusion. Rollback: drop `-mtp`.

**4 — PR #1646: suffix-decoding A/B vs ngram-mod.** Flag: replace `--spec-type ngram-mod` with `--spec-type suffix --spec-suffix-corpus <file>` in a **variant** llama-swap slot only; do **not** touch `:8080`. Risk: medium — needs corpus; if accept-rate ≤ ngram-mod, revert. Rollback: drop the variant slot.

**5 — PR #1761: AVX2 greedy spec sampling.** No flag — auto-detected. Action: verify build log shows AVX2 (Zen4 has it) and bench TG after item 1. Risk: 0, already in binary. Rollback: not needed.

**Footnote — 51 dropped PRs.** Docs/build: 1735, 1734, 1733, 1729, 1753, 1710, 1691. Non-Qwen/Gemma: 1771, 1784, 1723, 1686, 1666, 1657. Reverts: 1700, 1704, 1722, 1716, 1714. Toolchain: 1755, 1748. Parser/tool-call: 1376, 1679, 1794, 1726, 1731. Other correctness: 1647, 1717, 1672, 1677, 1696, 1718, 1724, 1728, 1736, 1741, 1760, 1767, 1774, 1776, 1796, 1803, 1805, 1721, 1669, 1673, 1687, 1702.
