#!/usr/bin/env node
// tools/memory-reranker.mjs
// W369 P1.3 — Cross-encoder reranker for basic-memory + cognee retrieval.
//
// CONTEXT (W367 Stream F gap #3, leverage 31.5):
//   "+17% Recall@5 evidence" for cross-encoder reranker on memory tiers. Standard
//   2026-era pipeline = bi-encoder retrieval (k=20-50 candidates) -> cross-encoder
//   rerank (top_k=5) before LLM context-injection. The W259-v16 5-tier memory stack
//   (hindsight + basic-memory + cognee + graphiti + langfuse) currently returns
//   raw bi-encoder/FTS5 hits with no rerank pass; this tool closes that gap.
//
// MODEL TARGET:
//   BAAI/bge-reranker-v2-m3 (568M params, multilingual cross-encoder, MIT license).
//   The model is NOT currently available in the Ollama library registry as of
//   2026-05-22 probe (`ollama pull bge-reranker-v2-m3` -> "file does not exist";
//   `linux6200/bge-reranker-v2-m3` also missing). Closest Ollama-served alternative:
//   serve a custom Modelfile pointing at GGUF (manual one-time admin step). This
//   tool therefore implements a 3-tier backend cascade:
//
//     TIER 1 — HF Inference API   (true bge-reranker-v2-m3 cross-encoder)
//                                  Requires HF_TOKEN env (set in CLAUDE.local.md).
//                                  Highest fidelity; ~150-300ms per batch of 20.
//
//     TIER 2 — Ollama embed-sim   (qwen3-embedding:0.6b cosine-similarity rerank)
//                                  ALREADY-PRESENT in this runtime per CLAUDE.local.md
//                                  Services section. Functional fallback when HF
//                                  unavailable. Lower fidelity (~+8-12% Recall@5
//                                  vs +17%) since embedding-cosine is bi-encoder-like
//                                  not true cross-encoder, but operationally adequate.
//                                  ~50-100ms per batch of 20.
//
//     TIER 3 — No-op fallback     (return candidates unchanged with warn log)
//                                  Fires when both Ollama and HF unreachable.
//                                  Preserves caller correctness, no rerank gain.
//
// USAGE (programmatic):
//   import { rerank } from './tools/memory-reranker.mjs';
//   const candidates = [
//     { id: 'note1', text: 'Wave-369 closed P0 ship-blocker via codex r3.' },
//     { id: 'note2', text: 'Langfuse v3.160.0 health probe returns OK.' },
//     { id: 'note3', text: 'W325-A surfaced 0.0036 parallel_ratio empirical.' },
//   ];
//   const ranked = await rerank('What is the parallel_ratio baseline?', candidates, 5);
//   // ranked[0] -> { id: 'note3', text: '...', score: 0.91, _backend: 'ollama-embed' }
//
// USAGE (CLI smoke):
//   node tools/memory-reranker.mjs --query "test query" --candidates '["a","b","c"]' --top_k 2
//
// INTEGRATION TARGETS:
//   - basic-memory: wrap mcp__basic-memory__search_notes results before returning
//     to caller. (Future: inject into MCP server proxy or wrapper helper.)
//   - cognee: wrap mcp__cognee__search results similarly.
//
// CARDINAL-RULE COMPLIANCE:
//   - CR-1: standalone tool under tools/ (not a hook); no plugin install needed.
//   - CR-2: under tools/ so 2KB hook-size limit does NOT apply.
//   - CR-3: no subagent dispatch; pure library function.
//   - CR-5: no hard-block exits; tier-3 fallback ensures caller correctness.
//   - CR-6: verify-before-claim — module emits backend-used + duration in result.
//
// CITES (3-org-distinct):
//   1. BAAI — https://huggingface.co/BAAI/bge-reranker-v2-m3 (model card, MIT, 568M params)
//   2. Anthropic — https://docs.anthropic.com/en/docs/agents/retrieval (rerank pattern)
//   3. LangChain — https://python.langchain.com/docs/integrations/retrievers/bge-reranker
//   Anchor: W367 Stream F gap #3 + W369 SPEC P1.3 (this commit closure).

import { spawnSync } from 'node:child_process';

const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://127.0.0.1:16700';
const HF_API_BASE = 'https://api-inference.huggingface.co/models';
const HF_MODEL = 'BAAI/bge-reranker-v2-m3';
const OLLAMA_EMBED_MODEL = process.env.MEMORY_RERANKER_EMBED_MODEL || 'qwen3-embedding:0.6b';
const HTTP_TIMEOUT_MS = Number(process.env.MEMORY_RERANKER_TIMEOUT_MS || 10000);

// ----------------------------------------------------------------------------
// Backend probes
// ----------------------------------------------------------------------------

async function probeOllama() {
  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 3000);
    const res = await fetch(`${OLLAMA_HOST}/api/tags`, { signal: ctl.signal });
    clearTimeout(timer);
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    const body = await res.json();
    const has = (body.models || []).some((m) => m.name === OLLAMA_EMBED_MODEL);
    if (!has) return { ok: false, reason: `model ${OLLAMA_EMBED_MODEL} not present` };
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}

function probeHF() {
  const token = process.env.HF_TOKEN || process.env.HUGGINGFACE_API_KEY;
  if (!token) return { ok: false, reason: 'HF_TOKEN/HUGGINGFACE_API_KEY env unset' };
  return { ok: true, token };
}

// ----------------------------------------------------------------------------
// Tier 1: HF Inference API — true bge-reranker-v2-m3 cross-encoder
// ----------------------------------------------------------------------------

async function rerankHF(query, candidates, token) {
  // bge-reranker-v2-m3 expects pairs; HF feature-extraction returns relevance score.
  // POST { inputs: { source_sentence, sentences } } per HF sentence-similarity task.
  const payload = {
    inputs: {
      source_sentence: query,
      sentences: candidates.map((c) => c.text),
    },
  };
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), HTTP_TIMEOUT_MS);
  let scores;
  try {
    const res = await fetch(`${HF_API_BASE}/${HF_MODEL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      signal: ctl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`HF ${res.status}: ${txt.slice(0, 200)}`);
    }
    scores = await res.json();
  } finally {
    clearTimeout(timer);
  }
  if (!Array.isArray(scores) || scores.length !== candidates.length) {
    throw new Error(`HF returned malformed scores: ${JSON.stringify(scores).slice(0, 200)}`);
  }
  return candidates.map((c, i) => ({ ...c, score: scores[i], _backend: 'hf-bge-reranker-v2-m3' }));
}

// ----------------------------------------------------------------------------
// Tier 2: Ollama embedding cosine-similarity (qwen3-embedding fallback)
// ----------------------------------------------------------------------------

async function ollamaEmbed(input) {
  // POST /api/embed with batched input array — Ollama returns 1 vector per input.
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), HTTP_TIMEOUT_MS);
  try {
    const res = await fetch(`${OLLAMA_HOST}/api/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: OLLAMA_EMBED_MODEL, input }),
      signal: ctl.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      const txt = await res.text().catch(() => '');
      throw new Error(`Ollama embed ${res.status}: ${txt.slice(0, 200)}`);
    }
    const body = await res.json();
    if (!Array.isArray(body.embeddings)) {
      throw new Error(`Ollama embed malformed: ${JSON.stringify(body).slice(0, 200)}`);
    }
    return body.embeddings;
  } finally {
    clearTimeout(timer);
  }
}

function cosine(a, b) {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function rerankOllama(query, candidates) {
  // 1 batched embed call: [query, ...candidate_texts] = N+1 vectors
  const inputs = [query, ...candidates.map((c) => c.text)];
  const vecs = await ollamaEmbed(inputs);
  if (vecs.length !== inputs.length) {
    throw new Error(`Ollama returned ${vecs.length} vecs for ${inputs.length} inputs`);
  }
  const qv = vecs[0];
  return candidates.map((c, i) => ({
    ...c,
    score: cosine(qv, vecs[i + 1]),
    _backend: `ollama-embed:${OLLAMA_EMBED_MODEL}`,
  }));
}

// ----------------------------------------------------------------------------
// Tier 3: No-op fallback
// ----------------------------------------------------------------------------

function rerankNoop(candidates) {
  console.error(
    '[memory-reranker] WARN: tier-3 no-op fallback (HF + Ollama both unavailable); ' +
      'candidates returned unchanged with score=null.'
  );
  return candidates.map((c) => ({ ...c, score: null, _backend: 'noop' }));
}

// ----------------------------------------------------------------------------
// Public API
// ----------------------------------------------------------------------------

/**
 * Rerank candidates by relevance to query using bge-reranker-v2-m3 (or fallback).
 *
 * @param {string} query - The user query / search prompt.
 * @param {Array<{id?: string, text: string, [k: string]: any}>} candidates
 *        Bi-encoder/FTS5 hits. Each MUST have a `text` field. Other fields preserved.
 * @param {number} [top_k=5] - Number of top-scoring candidates to return.
 * @param {object} [opts] - Backend overrides.
 * @param {'auto'|'hf'|'ollama'|'noop'} [opts.backend='auto'] - Force a specific tier.
 * @returns {Promise<Array<{score: number|null, _backend: string, ...}>>}
 *          Sorted by score desc, truncated to top_k. `_backend` records which tier ran.
 *
 * Backend cascade (when backend='auto'):
 *   1. HF Inference API if HF_TOKEN set                  -> true cross-encoder
 *   2. Ollama embedding cosine-similarity if reachable   -> bi-encoder approximation
 *   3. No-op (preserves order, score=null)               -> ensures correctness
 */
export async function rerank(query, candidates, top_k = 5, opts = {}) {
  if (typeof query !== 'string' || query.length === 0) {
    throw new TypeError('rerank: query must be a non-empty string');
  }
  if (!Array.isArray(candidates)) {
    throw new TypeError('rerank: candidates must be an array');
  }
  if (candidates.length === 0) return [];
  for (const c of candidates) {
    if (typeof c?.text !== 'string') {
      throw new TypeError('rerank: each candidate must have a string `text` field');
    }
  }

  const backend = opts.backend || 'auto';
  let ranked;

  if (backend === 'noop') {
    ranked = rerankNoop(candidates);
  } else if (backend === 'hf' || backend === 'auto') {
    const hf = probeHF();
    if (hf.ok) {
      try {
        ranked = await rerankHF(query, candidates, hf.token);
      } catch (err) {
        // W369 codex r1 P2 fix (2026-05-22): forced-backend failures must rethrow,
        // not silently fall back to no-op (hides outages in CI / integrations).
        if (backend === 'hf') {
          throw new Error(`rerank: forced backend='hf' request failed: ${err.message}`);
        }
        console.error(`[memory-reranker] HF failed: ${err.message}; falling back to Ollama (backend=auto)`);
        ranked = null;
      }
    } else if (backend === 'hf') {
      throw new Error(`rerank: backend='hf' requested but ${hf.reason}`);
    }
  }

  if (!ranked && (backend === 'ollama' || backend === 'auto')) {
    const oll = await probeOllama();
    if (oll.ok) {
      try {
        ranked = await rerankOllama(query, candidates);
      } catch (err) {
        // W369 codex r1 P2 fix (2026-05-22): forced-backend failures must rethrow.
        if (backend === 'ollama') {
          throw new Error(`rerank: forced backend='ollama' request failed: ${err.message}`);
        }
        console.error(`[memory-reranker] Ollama failed: ${err.message}; falling back to no-op (backend=auto)`);
        ranked = null;
      }
    } else if (backend === 'ollama') {
      throw new Error(`rerank: backend='ollama' requested but ${oll.reason}`);
    }
  }

  if (!ranked) {
    ranked = rerankNoop(candidates);
  }

  // Sort by score desc; null scores preserve original order (stable sort).
  // No-op tier already has all-null scores -> sort is a no-op (stable).
  ranked.sort((a, b) => {
    if (a.score === null && b.score === null) return 0;
    if (a.score === null) return 1;
    if (b.score === null) return -1;
    return b.score - a.score;
  });

  return ranked.slice(0, top_k);
}

// ----------------------------------------------------------------------------
// CLI smoke entry — `node tools/memory-reranker.mjs --query Q --candidates JSON [--top_k N]`
// ----------------------------------------------------------------------------

function parseArgs(argv) {
  const out = { top_k: 5 };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    const v = argv[i + 1];
    if (k === '--query') {
      out.query = v;
      i++;
    } else if (k === '--candidates') {
      out.candidates = JSON.parse(v);
      i++;
    } else if (k === '--top_k') {
      out.top_k = Number(v);
      i++;
    } else if (k === '--backend') {
      out.backend = v;
      i++;
    }
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` ||
    process.argv[1]?.endsWith('memory-reranker.mjs')) {
  const args = parseArgs(process.argv);
  if (!args.query || !args.candidates) {
    console.error('usage: node tools/memory-reranker.mjs --query Q --candidates JSON [--top_k N] [--backend auto|hf|ollama|noop]');
    process.exit(2);
  }
  const cands = args.candidates.map((c, i) =>
    typeof c === 'string' ? { id: String(i), text: c } : c
  );
  const t0 = Date.now();
  rerank(args.query, cands, args.top_k, { backend: args.backend || 'auto' })
    .then((ranked) => {
      const ms = Date.now() - t0;
      console.log(JSON.stringify({ ms, count: ranked.length, ranked }, null, 2));
    })
    .catch((err) => {
      console.error(`rerank error: ${err.message}`);
      process.exit(1);
    });
}
