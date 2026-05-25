// tools/research-arch-v23/mcp-client-bridge.mjs
// W442-T2: Node-side bridge to MAF MCPStdioTool Python helper.
// Spawns python_mcp_helper.py once per CLI invocation, exposes
// mcpClient-shaped object matching Claude Code's in-session interface.
//
// Wire protocol: newline-delimited JSON-RPC 2.0 over stdin/stdout.
// One Python process per CLI invocation; exits on stdin EOF.
//
// Cite: lastmile-ai/mcp-agent MCPAggregator pattern +
// microsoft/agent-framework v1.6.0 MCPStdioTool (errata E2) +
// W442 spec §2 architecture + JSON-RPC 2.0 spec.

import { execa } from 'execa';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PYTHON_BIN = process.env.MAF_PYTHON_BIN ?? 'Z:/venvs/claude/Scripts/python.exe';
const HELPER_SCRIPT = resolve(__dirname, 'bridge', 'python_mcp_helper.py');
const DEFAULT_CALL_TIMEOUT_MS = 30_000;

export class BridgeUnavailableError extends Error {
  constructor(msg, cause) {
    super(msg);
    this.name = 'BridgeUnavailableError';
    this.cause = cause;
  }
}

export class BridgeProtocolError extends Error {
  constructor(msg, cause) {
    super(msg);
    this.name = 'BridgeProtocolError';
    this.cause = cause;
  }
}

export class BridgeTimeoutError extends Error {
  constructor(msg) {
    super(msg);
    this.name = 'BridgeTimeoutError';
  }
}

/**
 * Return an mcpClient-shaped object. Lazily spawns the Python helper on
 * the first callTool() invocation. Caller SHOULD call client.close() on
 * cleanup (or rely on Node process exit closing stdin).
 *
 * @param {Object} [options]
 * @param {number} [options.callTimeoutMs=30000] - per-callTool timeout
 * @param {string} [options.pythonBin] - override Python interpreter path
 * @param {string} [options.helperScript] - override helper script path (testing)
 * @returns {{ callTool: Function, close: Function }}
 */
export function getMcpClient(options = {}) {
  const pythonBin = options.pythonBin ?? DEFAULT_PYTHON_BIN;
  const helperScript = options.helperScript ?? HELPER_SCRIPT;
  const callTimeoutMs = options.callTimeoutMs ?? DEFAULT_CALL_TIMEOUT_MS;

  let proc = null;
  let nextId = 1;
  const pendingById = new Map();
  let rxBuffer = '';
  let dead = false;
  let deadReason = null;

  function ensureSpawned() {
    // W442 codex r2: check dead FIRST — after EPIPE, proc is still non-null
    // but bridge is unusable. Must throw before attempting stdin.write.
    if (dead) throw new BridgeUnavailableError(`bridge dead: ${deadReason}`);
    if (proc) return;
    try {
      proc = execa(pythonBin, [helperScript], {
        stdio: ['pipe', 'pipe', 'pipe'],
        reject: false,
        windowsHide: true,
      });
    } catch (err) {
      dead = true;
      deadReason = `spawn-failed: ${err.code ?? err.message}`;
      throw new BridgeUnavailableError(deadReason, err);
    }
    proc.stdout.setEncoding('utf8');
    proc.stdout.on('data', onStdoutChunk);
    proc.stderr.setEncoding('utf8');
    proc.stderr.on('data', (chunk) => {
      process.stderr.write(`[mcp-bridge:py] ${chunk}`);
    });
    proc.on('exit', (code) => {
      dead = true;
      deadReason = `helper-exit-${code}`;
      for (const [, p] of pendingById) {
        clearTimeout(p.timeoutHandle);
        p.reject(new BridgeUnavailableError(deadReason));
      }
      pendingById.clear();
    });
  }

  function onStdoutChunk(chunk) {
    rxBuffer += chunk;
    let nl;
    while ((nl = rxBuffer.indexOf('\n')) !== -1) {
      const line = rxBuffer.slice(0, nl);
      rxBuffer = rxBuffer.slice(nl + 1);
      if (!line.trim()) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch (err) {
        dead = true;
        deadReason = `json-parse-fail: ${err.message}`;
        try { proc.kill('SIGKILL'); } catch { /* ignore */ }
        for (const [, p] of pendingById) {
          clearTimeout(p.timeoutHandle);
          p.reject(new BridgeProtocolError(deadReason, err));
        }
        pendingById.clear();
        return;
      }
      const pending = pendingById.get(msg.id);
      if (!pending) continue;
      pendingById.delete(msg.id);
      clearTimeout(pending.timeoutHandle);
      if (msg.error) {
        const err = new Error(`mcp-server-error: ${msg.error.message ?? 'unknown'}`);
        err.code = msg.error.code;
        err.data = msg.error.data;
        pending.reject(err);
      } else {
        pending.resolve(msg.result);
      }
    }
  }

  async function callTool({ server, name, arguments: args }) {
    ensureSpawned();
    const id = nextId++;
    const request = {
      jsonrpc: '2.0',
      id,
      method: 'call_tool',
      params: { server, name, arguments: args ?? {} },
    };
    return new Promise((resolve, reject) => {
      const timeoutHandle = setTimeout(() => {
        pendingById.delete(id);
        reject(new BridgeTimeoutError(
          `callTool timeout after ${callTimeoutMs}ms: ${server}.${name}`
        ));
      }, callTimeoutMs);
      pendingById.set(id, { resolve, reject, timeoutHandle });
      try {
        proc.stdin.write(JSON.stringify(request) + '\n');
      } catch (err) {
        dead = true;
        deadReason = `stdin-epipe: ${err.message}`;
        clearTimeout(timeoutHandle);
        pendingById.delete(id);
        reject(new BridgeProtocolError(`stdin-write-fail: ${err.message}`, err));
      }
    });
  }

  async function close() {
    if (!proc) return;
    try { proc.stdin.end(); } catch { /* ignore */ }
    const timeout = setTimeout(() => { try { proc.kill('SIGKILL'); } catch { /* ignore */ } }, 5000);
    try { await proc; } catch { /* ignore execa result */ }
    clearTimeout(timeout);
    proc = null;
    dead = true;
    deadReason = 'closed-by-caller';
  }

  return { callTool, close };
}
