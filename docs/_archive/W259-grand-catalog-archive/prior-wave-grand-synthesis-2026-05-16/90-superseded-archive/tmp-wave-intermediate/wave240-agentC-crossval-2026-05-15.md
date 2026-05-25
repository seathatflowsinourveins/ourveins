# Wave 240 Agent C Cross-Validation

## §1 PHANTOM Checks

### `jia-gao/leanctx`

Agent-C verdict: NOT PHANTOM.

Command:

```powershell
gh repo view jia-gao/leanctx --json name,description,stargazerCount,licenseInfo,updatedAt,isArchived 2>&1
```

Output:

```json
{"description":"Drop-in prompt compression for production LLM apps. Cut your token bill 40-60% without changing your code. Python SDK, LLMLingua-2, MIT.","isArchived":false,"licenseInfo":{"key":"mit","name":"MIT License","nickname":""},"name":"leanctx","stargazerCount":226,"updatedAt":"2026-05-16T00:37:53Z"}
```

### `open-compress/claw-compactor`

Agent-C verdict: NOT PHANTOM. Agent B's SPDX uncertainty is now resolved by `gh repo view`: GitHub detects MIT.

Command:

```powershell
gh repo view open-compress/claw-compactor --json name,description,stargazerCount,licenseInfo,updatedAt,isArchived 2>&1
```

Output:

```json
{"description":"14-stage Fusion Pipeline for LLM token compression — reversible compression, AST-aware code analysis, intelligent content routing. Zero LLM inference cost. MIT licensed.","isArchived":false,"licenseInfo":{"key":"mit","name":"MIT License","nickname":""},"name":"claw-compactor","stargazerCount":2217,"updatedAt":"2026-05-16T00:04:31Z"}
```

## §2 License Rechecks

### `willwade/protect-mcp`

Agent-C verdict: PHANTOM under the requested GitHub repo name. Do not install or cite as a concrete GitHub source until exact upstream identity is resolved.

Commands:

```powershell
gh api repos/willwade/protect-mcp/license 2>&1 | Select-Object -First 20
gh repo view willwade/protect-mcp --json licenseInfo,stargazerCount,updatedAt 2>&1
gh search repos protect-mcp --json fullName,stargazerCount,updatedAt --limit 5 2>&1
```

Outputs:

```text
gh: Not Found (HTTP 404)
{"message":"Not Found","documentation_url":"https://docs.github.com/rest/licenses/licenses#get-the-license-for-a-repository","status":"404"}
```

```text
GraphQL: Could not resolve to a Repository with the name 'willwade/protect-mcp'. (repository)
```

```text
Unknown JSON field: "stargazerCount"
Available fields include: fullName, license, pushedAt, stargazersCount, updatedAt
```

Corrected `gh search repos` field name probe:

```powershell
gh search repos protect-mcp --json fullName,stargazersCount,updatedAt --limit 5 2>&1
```

Output:

```json
[{"fullName":"trailofbits/mcp-context-protector","stargazersCount":219,"updatedAt":"2026-05-04T05:09:20Z"},{"fullName":"sirkirby/unifi-mcp","stargazersCount":338,"updatedAt":"2026-05-15T23:26:02Z"},{"fullName":"AIM-Intelligence/AIM-MCP","stargazersCount":20,"updatedAt":"2026-03-09T13:11:27Z"},{"fullName":"blackchoey/remote-mcp-apim-oauth-prm","stargazersCount":11,"updatedAt":"2026-04-23T09:39:20Z"},{"fullName":"Jamf-Concepts/mcp-hub","stargazersCount":20,"updatedAt":"2026-05-12T21:20:32Z"}]
```

### `openai/skills`

Agent-C verdict: HOLD confirmed. The repository exists and is active, but GitHub license API returns 404 and `licenseInfo` is null.

Commands:

```powershell
gh api repos/openai/skills/license 2>&1 | Select-Object -First 20
gh repo view openai/skills --json licenseInfo,stargazerCount,updatedAt,isArchived 2>&1
```

Outputs:

```text
gh: Not Found (HTTP 404)
{"message":"Not Found","documentation_url":"https://docs.github.com/rest/licenses/licenses#get-the-license-for-a-repository","status":"404"}
```

```json
{"isArchived":false,"licenseInfo":null,"stargazerCount":19186,"updatedAt":"2026-05-16T00:57:10Z"}
```

### `wshobson/plugin-eval`

Agent-C verdict: PHANTOM as a standalone repo. Parent `wshobson/agents` is MIT and active, but that does not prove standalone plugin-eval package/license metadata.

Command:

```powershell
gh repo view wshobson/plugin-eval --json licenseInfo,stargazerCount,updatedAt 2>&1
```

Output:

```text
GraphQL: Could not resolve to a Repository with the name 'wshobson/plugin-eval'. (repository)
```

Additional probes:

```powershell
gh search repos plugin-eval wshobson --json fullName,stargazersCount,updatedAt,license --limit 10 2>&1
gh repo view wshobson/agents --json licenseInfo,stargazerCount,updatedAt,isArchived 2>&1
```

Outputs:

```json
[]
```

```json
{"isArchived":false,"licenseInfo":{"key":"mit","name":"MIT License","nickname":""},"stargazerCount":35456,"updatedAt":"2026-05-16T00:38:27Z"}
```

## §3 Staleness Verification

### `microsoft/LLMLingua`

Agent-C verdict: NOT mechanically stale by push date; pushed 2026-04-08 and updated 2026-05-15. Still weaker than 2026 agent-runtime context-compression candidates for the pure runtime arc.

Command:

```powershell
gh repo view microsoft/LLMLingua --json updatedAt,pushedAt,stargazerCount 2>&1
```

Output:

```json
{"pushedAt":"2026-04-08T18:59:13Z","stargazerCount":6190,"updatedAt":"2026-05-15T22:10:14Z"}
```

Requested topic search used an unsupported JSON field on this GH CLI:

```powershell
gh search repos --topic context-compression --json fullName,stargazerCount,updatedAt --limit 10 2>&1
```

Output:

```text
Unknown JSON field: "stargazerCount"
Available fields include: fullName, license, pushedAt, stargazersCount, updatedAt
```

Corrected field name probe:

```powershell
gh search repos --topic context-compression --json fullName,stargazersCount,updatedAt --limit 10 2>&1
```

Output:

```json
[{"fullName":"open-compress/claw-compactor","stargazersCount":2217,"updatedAt":"2026-05-16T00:04:31Z"},{"fullName":"manojmallick/sigmap","stargazersCount":434,"updatedAt":"2026-05-15T21:42:29Z"},{"fullName":"juyterman1000/entroly","stargazersCount":376,"updatedAt":"2026-05-16T00:58:06Z"},{"fullName":"LearnPrompt/cc-harness-skills","stargazersCount":211,"updatedAt":"2026-05-11T13:25:44Z"},{"fullName":"jeffreysijuntan/lloco","stargazersCount":117,"updatedAt":"2026-03-31T10:07:46Z"},{"fullName":"snu-mllab/Context-Memory","stargazersCount":63,"updatedAt":"2026-02-12T05:54:26Z"},{"fullName":"PCIRCLE-AI/toonify-mcp","stargazersCount":63,"updatedAt":"2026-05-14T00:09:30Z"},{"fullName":"castnettech/mnemosyne","stargazersCount":57,"updatedAt":"2026-05-14T10:41:21Z"},{"fullName":"HaShiShark/context-editor-agent","stargazersCount":42,"updatedAt":"2026-05-15T19:16:46Z"},{"fullName":"SonicBotMan/lobster-press","stargazersCount":32,"updatedAt":"2026-05-14T08:53:14Z"}]
```

## §4 Net-New Candidates

Requested local-LLM search also used unsupported `stargazerCount`; corrected probe used `stargazersCount`.

Command:

```powershell
gh search repos --topic local-llm --language Python --sort stars --json fullName,stargazerCount,updatedAt --limit 8 2>&1
```

Output:

```text
Unknown JSON field: "stargazerCount"
Available fields include: fullName, license, pushedAt, stargazersCount, updatedAt
```

Corrected command:

```powershell
gh search repos --topic local-llm --language Python --sort stars --json fullName,stargazersCount,updatedAt --limit 8 2>&1
```

Output:

```json
[{"fullName":"LearningCircuit/local-deep-research","stargazersCount":7656,"updatedAt":"2026-05-16T00:14:20Z"},{"fullName":"langroid/langroid","stargazersCount":4014,"updatedAt":"2026-05-15T23:52:15Z"},{"fullName":"nicedreamzapp/claude-code-local","stargazersCount":2625,"updatedAt":"2026-05-15T23:54:55Z"},{"fullName":"raullenchai/Rapid-MLX","stargazersCount":2359,"updatedAt":"2026-05-16T01:03:35Z"},{"fullName":"travisvn/openai-edge-tts","stargazersCount":1873,"updatedAt":"2026-05-14T18:36:25Z"},{"fullName":"hydropix/TranslateBooksWithLLMs","stargazersCount":1582,"updatedAt":"2026-05-16T00:50:23Z"},{"fullName":"ARahim3/mlx-tune","stargazersCount":1244,"updatedAt":"2026-05-15T22:56:52Z"},{"fullName":"siddsachar/Thoth","stargazersCount":1106,"updatedAt":"2026-05-15T20:56:23Z"}]
```

Agent-C interpretation: this constrained search surfaces possible study candidates but does not displace Agent B's broader local-runtime triad (`ollama/ollama`, `vllm-project/vllm`, `ggml-org/llama.cpp`). From this exact result set, `langroid/langroid`, `nicedreamzapp/claude-code-local`, `raullenchai/Rapid-MLX`, and `ARahim3/mlx-tune` are the most relevant follow-up probes; `travisvn/openai-edge-tts` and `hydropix/TranslateBooksWithLLMs` are not local model runtime core.

## §5 VERDICT SUMMARY

| Repo | Agent-B Verdict | Agent-C Verdict | Action |
|---|---|---|---|
| `jia-gao/leanctx` | KEEP/PRIMARY replacement for LLMLingua class | NOT PHANTOM; MIT; active; 226 stars | Keep as primary replacement candidate; benchmark before install gate |
| `open-compress/claw-compactor` | STUDY-PILOT.b pending license + benchmark | NOT PHANTOM; GitHub detects MIT; active; 2,217 stars | Upgrade license status to resolved MIT; keep benchmark gate |
| `willwade/protect-mcp` | RECHECK; do not install until source/crypto/license audit | PHANTOM under requested repo; license API 404; repo view unresolved | Remove concrete GitHub repo citation; resolve exact upstream before any install |
| `openai/skills` | HOLD unchanged | HOLD confirmed; active but no GitHub-detected license | Keep HOLD; no vendoring/install without license resolution |
| `microsoft/LLMLingua` | REMOVE/REPLACE for 2026 agent runtime use | Not stale by push date; still replace for runtime-fit reasons | Phrase as "replace for fit", not "stale repo" |
| `wshobson/plugin-eval` | RECHECK license-fix PR / plugin metadata gap | PHANTOM as standalone repo; parent `wshobson/agents` is MIT | Cite parent repo only; keep plugin-specific license/source gate |
| `local-llm` Python topic candidates | ADD optional local-model-runtime layer via broader triad | Constrained search finds study candidates, not replacements for Ollama/vLLM/llama.cpp | Add follow-up probes for `langroid`, `claude-code-local`, `Rapid-MLX`, `mlx-tune` |

