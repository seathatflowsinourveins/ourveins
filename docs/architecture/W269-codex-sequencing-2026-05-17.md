## Q1 THROUGHPUT
MTP wins for Hindsight's short structured outputs. `ngram-mod` is only documented as a shared-context/repetition self-spec path, with examples requiring long drafts for MoEs and showing acceptance stats, not a sourced +20-40% ik_llama claim (`docs/speculative.md`; PR unavailable in observed evidence). PR #1701 `0a167082` shows ngram-mod 95.11->130.4 t/s on a 5k-char edit dataset, but that is not short extraction. Qwen MTP is first-token useful: PR #1745 `9a26522` adds Qwen35MoE MTP but reports state-sensitive +4% to -2%; PR #1810 `1f8c603` can reach 2.0-2.5x only with extra MTP output tensor.

## Q2 RISK ORDERING
Try Option C before Path A if W269 proceeds. Dropping `--mmproj` is a reversible capability loss; PR #1758 `35845dd` says MTP can now sync multimodal prompts, so losing vision is not even strategically required after update. Path A changes GGUF plus removes `--merge-qkv`, and W267 already failed at tensor load. Worse, current local HEAD is `1f8c603`, missing PR #1816 `0ab9bdf`, which fixes Qwen3.5/3.6 MTP with `-muge` gibberish.

## Q3 COMPOUND RISK
Applying both together creates ambiguous outage attribution: if the server loads but text quality degrades, the culprit could be MTP/`-muge` pre-#1816 `0ab9bdf`; if vision fails, that is expected from dropping `--mmproj`; if throughput does not change, PR #1804 `35fbe08` says MTP is disabled for parallel slots, and W268 live state uses `--parallel 4`. There is a spec interaction: PR #1789 `f4f4b3f` dual-spec prioritizes self-spec over MTP when both generate candidates.

## Q4 PR-SWEEP PRIORITY
Highest priority classes: correctness before flags. First rebuild to include server crash fix #1794 `c35189d`, MTP/`-muge` fix #1816 `0ab9bdf`, MTP parallel-slot semantics #1804 `35fbe08`, and multimodal MTP #1758 `35845dd`. Then evaluate dual-spec #1789 `f4f4b3f` only with explicit stages. Nothing observed supersedes q4/q4 + Hadamard KV: #1677 `e5355e9` adds quantize options, while #1809 `3e573cf`/#1810 `1f8c603` add a separate low-bit MTP output tensor, not a KV-cache replacement.

## FINAL VERDICT
W269-WAVE PREMATURE: pending W268 operational items. The blocker is not lack of inference knobs; it is that W268 explicitly found the runtime is optimized for "live right now" rather than operable tomorrow. Do not spend the next wave stacking speculative-decoding experiments while these remain open: rotate/revoke old secrets and make gitleaks blocking; create and drill a non-Z backup/restore runbook for pg0, Hindsight, MCP memory, and Docker volumes; supervise :8080/Hindsight/pg0/Cognee/llama-swap with restart and fallback semantics; pin ik_llama to a reviewed SHA and rebuild from at least PR #1816 `0ab9bdf`.

If the operator explicitly overrides that, the technical sequence is: PR sweep/rebuild first, Option C second, Path A last. Path A before rebuild is rejected: local `1f8c603` lacks #1816, live `--parallel 4` conflicts with #1804, and W267 already proved MTP load rollback is costlier than re-adding `--mmproj`.
