// tools/sota-discovery/lib/http.mjs
// Shared fetchJson(url, opts) with on-disk cache for raw evidence.
// Codex W380-r1 P1 mitigations encoded: cache raw evidence, record missingness, degrade
// explicitly (return null on 404 -> NOT_MEASURABLE signal; throw on other non-2xx).
// The scorer injects this as ctx.fetchJson into each fetcher (per contract.mjs interface).

import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CACHE_DIR = process.env.SCA_CACHE_DIR || "Z:/claude-sota-installed-state/W380-sca-cache";
const CACHE_TTL_MS = Number(process.env.SCA_CACHE_TTL_MS) || 24 * 60 * 60 * 1000; // 24h

function cacheKey(url, opts) {
  const h = createHash("sha256");
  h.update(url);
  h.update(opts?.method || "GET");
  if (opts?.body) h.update(typeof opts.body === "string" ? opts.body : JSON.stringify(opts.body));
  return h.digest("hex").slice(0, 32);
}

export async function makeFetchJson({ noCache = false } = {}) {
  await mkdir(CACHE_DIR, { recursive: true });
  return async function fetchJson(url, opts = {}) {
    const key = cacheKey(url, opts);
    const cachePath = path.join(CACHE_DIR, `${key}.json`);
    if (!noCache) {
      try {
        const cached = JSON.parse(await readFile(cachePath, "utf8"));
        if (cached.fetched_at && Date.now() - cached.fetched_at < CACHE_TTL_MS) {
          return cached.status === 404 ? null : cached.body;
        }
      } catch {
        /* miss */
      }
    }
    // Normalize a non-string body to JSON before fetch. Native fetch serializes a plain
    // JS object body to the literal string "[object Object]" (kilo-code-bot CRITICAL on
    // osv.mjs querybatch). Pre-stringified string bodies (e.g. github-graphql's query)
    // pass through untouched; explicit caller headers win over the json default.
    let fetchOpts = opts;
    if (opts.body && typeof opts.body !== "string") {
      // Only default content-type if the caller didn't set one (any case) — avoids
      // emitting a duplicate "content-type" + "Content-Type" header pair (codex r1).
      const hasContentType = Object.keys(opts.headers || {}).some(
        (k) => k.toLowerCase() === "content-type",
      );
      fetchOpts = {
        ...opts,
        body: JSON.stringify(opts.body),
        headers: hasContentType
          ? opts.headers
          : { ...(opts.headers || {}), "content-type": "application/json" },
      };
    }
    const res = await fetch(url, fetchOpts);
    if (res.status === 404) {
      await writeFile(cachePath, JSON.stringify({ status: 404, fetched_at: Date.now() }));
      return null; // NOT_MEASURABLE signal — honest absence
    }
    if (!res.ok) {
      const err = new Error(`HTTP ${res.status} from ${url}`);
      err.status = res.status;
      throw err;
    }
    const ct = res.headers.get("content-type") || "";
    const body = ct.includes("json") ? await res.json() : await res.text();
    await writeFile(
      cachePath,
      JSON.stringify({ status: res.status, body, fetched_at: Date.now() }),
    );
    return body;
  };
}
