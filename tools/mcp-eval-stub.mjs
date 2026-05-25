// tools/mcp-eval-stub.mjs — W324 P3 pattern stub for in-process eval MCP.
// Cite (Claude Agent SDK TypeScript @ e62865e4):
//   https://github.com/anthropics/claude-agent-sdk-typescript/tree/e62865e4
// Cite (MCP TypeScript SDK): https://github.com/modelcontextprotocol/typescript-sdk
// Cite (createSdkMcpServer pattern source): claude-agent-sdk-typescript
//   src/sdk/mcp/createSdkMcpServer.ts (paths per upstream @ e62865e4).
//
// Status: REFERENCE-ONLY — NOT WIRED. Peer dependencies
// `@anthropic-ai/claude-agent-sdk` + `zod` are NOT installed in this runtime.
// Future-install path: `npm i -E @anthropic-ai/claude-agent-sdk zod` then
// register `evalMcpServer` in the harness driver via `mcpServers: [...]`.
import { createSdkMcpServer, tool } from "@anthropic-ai/claude-agent-sdk"; // FUTURE
import { z } from "zod"; // FUTURE peer dep

export const evalMcpServer = createSdkMcpServer({
  name: "harness-eval",
  version: "0.1.0",
  tools: [
    tool({
      name: "run_lane",
      description: "Execute a single eval lane of harness/eval_harness.py.",
      inputSchema: z.object({
        lane: z.enum(["A", "B", "C", "D", "E"]),
        limit: z.number().int().min(1).max(1000).default(10),
      }),
      handler: async ({ lane, limit }) => {
        // Future: spawn `python harness/eval_harness.py --lane=${lane} --limit=${limit}`
        // or in-proc IPC; capture stdout/EvalLog JSON; emit as MCP content block.
        return { content: [{ type: "text", text: `lane ${lane} ran (limit=${limit})` }] };
      },
    }),
  ],
});
