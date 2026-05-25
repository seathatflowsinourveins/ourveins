#!/usr/bin/env python3
# Reference: TIER-1 OFFICIAL Anthropic Message Batches API —
#   https://docs.anthropic.com/en/docs/build-with-claude/batch-processing
#   + Anthropic-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e
#     misc/batch_processing.ipynb (MIT) — submit / poll / retrieve idiom.
# Reference: anthropic Python SDK >=0.102.0 (installed in Z:/venvs/claude) —
#   `client.messages.batches.create()`, `.retrieve()`, `.results()`.
# Reference: W343 P2.A vendor-adaptation lane —
#   docs/architecture/W343-CONTINUE (cookbook-adapt P2.A); paired with the
#   prompt-caching-discipline R4(b) skill at .claude/skills/.
#
# W343-A10 P2.A — batch_lane.py
# -----------------------------
# A MINIMAL, IDEMPOTENT Message Batches wrapper for the W259 L4 nightly-eval
# cadence. Anthropic Message Batches API delivers ~50% cost reduction on
# bulk evaluator runs (inspect_ai + promptfoo dataset rows) at the cost of
# up-to-24h latency — perfectly aligned with nightly cron windows.
#
# Functions:
#   submit_batch(requests)    -> batch_id      (idempotent via fingerprint cache)
#   poll_batch(batch_id)      -> status_dict   (in_progress | ended | canceling)
#   retrieve_results(batch_id) -> list[dict]   (one per request_id, in order)
#
# CLI modes (for harness/test usage):
#   python harness/batch_lane.py --mode submit --input requests.jsonl
#   python harness/batch_lane.py --mode poll   --batch-id msgbatch_01...
#   python harness/batch_lane.py --mode fetch  --batch-id msgbatch_01...
#   python harness/batch_lane.py --mode demo                          # offline fixture; no API spend
#
# Idempotence: SHA-256 fingerprint of the canonical-JSON serialization of
# `requests` is cached for 24h at $CLAUDE_CODE_TMPDIR/batch_lane_cache.json.
# Re-submitting the same payload returns the existing batch_id, NOT a new
# Anthropic API call. Cache eviction = TTL-based; manual purge = delete file.

from __future__ import annotations

import argparse
import hashlib
import json
import logging
import os
import sys
import time
from pathlib import Path
from typing import Any

log = logging.getLogger("batch_lane")
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s"
)

CACHE_TTL_SECONDS = 24 * 60 * 60  # 24h matches Anthropic batch SLA upper bound


def _cache_path() -> Path:
    """Idempotence cache. Honors CLAUDE_CODE_TMPDIR per CLAUDE.local.md ENV block."""
    tmpdir = os.environ.get("CLAUDE_CODE_TMPDIR") or os.environ.get("TEMP") or "."
    p = Path(tmpdir) / "batch_lane_cache.json"
    p.parent.mkdir(parents=True, exist_ok=True)
    return p


def _load_cache() -> dict[str, dict[str, Any]]:
    p = _cache_path()
    if not p.exists():
        return {}
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        log.warning("cache read failed (%s); starting fresh", exc)
        return {}


def _save_cache(cache: dict[str, dict[str, Any]]) -> None:
    _cache_path().write_text(
        json.dumps(cache, indent=2, sort_keys=True), encoding="utf-8"
    )


def _fingerprint(requests: list[dict[str, Any]]) -> str:
    """Deterministic SHA-256 over the canonical JSON of `requests`."""
    canonical = json.dumps(requests, sort_keys=True, separators=(",", ":")).encode(
        "utf-8"
    )
    return hashlib.sha256(canonical).hexdigest()


def _evict_stale(cache: dict[str, dict[str, Any]]) -> dict[str, dict[str, Any]]:
    now = time.time()
    return {
        k: v for k, v in cache.items() if (now - v.get("ts", 0)) < CACHE_TTL_SECONDS
    }


def _client() -> Any:
    """Lazily-import the anthropic SDK so --mode demo runs without it installed."""
    try:
        import anthropic  # type: ignore[import-not-found]
    except ImportError as exc:
        raise RuntimeError(
            "anthropic SDK not installed; `pip install anthropic>=0.102.0`"
        ) from exc
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise RuntimeError("ANTHROPIC_API_KEY not set; see CLAUDE.local.md ENV block")
    return anthropic.Anthropic()


def submit_batch(requests: list[dict[str, Any]]) -> str:
    """Submit a Message Batch; return batch_id. Idempotent via 24h fingerprint cache.

    `requests` shape per Anthropic docs:
      [{"custom_id": "row-001", "params": {"model": "...", "max_tokens": ..., "messages": [...]}}, ...]
    """
    if not requests:
        raise ValueError("requests must be a non-empty list")
    fp = _fingerprint(requests)
    cache = _evict_stale(_load_cache())
    if fp in cache:
        entry = cache[fp]
        batch_id = entry.get("batch_id")
        if batch_id:
            log.info(
                "cache HIT fp=%s batch_id=%s (idempotent re-submit)",
                fp[:12],
                batch_id,
            )
            return batch_id
        # PENDING record (codex r1 P2 fix): prior submit crashed between
        # API call and _save_cache. Probe Anthropic for in-flight batches
        # to reconcile. If found, persist batch_id and return; else retry.
        log.warning(
            "cache PENDING fp=%s ts=%s n=%s — recovering from prior crash window",
            fp[:12],
            entry.get("ts"),
            entry.get("n"),
        )
        client = _client()
        recovered_id = _recover_pending_batch(client, entry)
        if recovered_id:
            cache[fp] = {"batch_id": recovered_id, "ts": entry["ts"], "n": entry["n"]}
            _save_cache(cache)
            log.info("recovered batch_id=%s", recovered_id)
            return recovered_id
        log.warning(
            "no in-flight batch matched PENDING fp=%s — will re-submit", fp[:12]
        )
    client = _client()
    # CRITICAL (codex r1 P2 #1 fix): write PENDING record BEFORE the API
    # call so a crash between submit and cache-save can be recovered. The
    # PENDING entry has ts + n but no batch_id; recovery path above keys on
    # ts/n match against client.messages.batches.list().
    cache[fp] = {
        "batch_id": None,
        "ts": time.time(),
        "n": len(requests),
        "status": "PENDING",
    }
    _save_cache(cache)
    log.info(
        "cache MISS fp=%s; submitted PENDING marker, calling Anthropic with %d requests",
        fp[:12],
        len(requests),
    )
    batch = client.messages.batches.create(requests=requests)
    cache[fp] = {
        "batch_id": batch.id,
        "ts": cache[fp]["ts"],
        "n": len(requests),
        "status": "SUBMITTED",
    }
    _save_cache(cache)
    log.info(
        "submitted batch_id=%s processing_status=%s", batch.id, batch.processing_status
    )
    return batch.id


def _recover_pending_batch(client: Any, pending: dict[str, Any]) -> str | None:
    """Search Anthropic's recent batches for one matching the PENDING fingerprint.
    Matches by (request-count == n) AND (created_at within 60s of pending.ts).
    Returns batch_id if found, else None. Used to close the crash-window race.
    """
    try:
        pending_ts = float(pending.get("ts", 0))
        pending_n = int(pending.get("n", 0))
    except (TypeError, ValueError):
        return None
    if pending_n <= 0 or pending_ts <= 0:
        return None
    try:
        # Anthropic SDK returns a paginated list of recent batches.
        page = client.messages.batches.list(limit=20)
        for batch in page.data:
            created_ts = (
                batch.created_at.timestamp()
                if hasattr(batch.created_at, "timestamp")
                else 0
            )
            n_match = sum(
                getattr(batch.request_counts, fld, 0)
                for fld in ("processing", "succeeded", "errored", "canceled", "expired")
            )
            if n_match == pending_n and abs(created_ts - pending_ts) <= 60:
                return batch.id
    except Exception as exc:
        log.warning("recovery probe failed: %s", exc)
    return None


def poll_batch(batch_id: str) -> dict[str, Any]:
    """Return Anthropic batch status. Status values: in_progress | canceling | ended."""
    client = _client()
    batch = client.messages.batches.retrieve(batch_id)
    return {
        "id": batch.id,
        "processing_status": batch.processing_status,
        "request_counts": {
            "processing": batch.request_counts.processing,
            "succeeded": batch.request_counts.succeeded,
            "errored": batch.request_counts.errored,
            "canceled": batch.request_counts.canceled,
            "expired": batch.request_counts.expired,
        },
        "created_at": str(batch.created_at),
        "ended_at": str(batch.ended_at) if batch.ended_at else None,
    }


def retrieve_results(batch_id: str) -> list[dict[str, Any]]:
    """Stream the JSONL results back as a list of dicts (one per request_id)."""
    client = _client()
    out: list[dict[str, Any]] = []
    for entry in client.messages.batches.results(batch_id):
        out.append(
            {
                "custom_id": entry.custom_id,
                "result_type": entry.result.type,  # succeeded | errored | canceled | expired
                "message": entry.result.message.model_dump()
                if entry.result.type == "succeeded"
                else None,
                "error": entry.result.error.model_dump()
                if entry.result.type == "errored"
                else None,
            }
        )
    return out


def _demo_fixture() -> list[dict[str, Any]]:
    """Offline 3-request batch fixture — exercises the fingerprint + cache path without API spend."""
    return [
        {
            "custom_id": f"demo-row-{i:03d}",
            "params": {
                "model": "claude-sonnet-4-6",
                "max_tokens": 64,
                "messages": [{"role": "user", "content": f"echo row {i}"}],
            },
        }
        for i in range(3)
    ]


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(prog="batch_lane", description=__doc__)
    p.add_argument("--mode", required=True, choices=("submit", "poll", "fetch", "demo"))
    p.add_argument(
        "--input", type=Path, help="JSONL file of requests (for --mode submit)"
    )
    p.add_argument("--batch-id", type=str, help="batch id (for --mode poll/fetch)")
    args = p.parse_args(argv)

    if args.mode == "demo":
        reqs = _demo_fixture()
        fp = _fingerprint(reqs)
        print(
            json.dumps(
                {
                    "mode": "demo",
                    "fingerprint": fp,
                    "n": len(reqs),
                    "cache_path": str(_cache_path()),
                    "api_spend": "$0.00",
                },
                indent=2,
            )
        )
        return 0

    if args.mode == "submit":
        if not args.input or not args.input.exists():
            print("ERROR: --input <jsonl> required for --mode submit", file=sys.stderr)
            return 2
        reqs = [
            json.loads(line)
            for line in args.input.read_text(encoding="utf-8").splitlines()
            if line.strip()
        ]
        bid = submit_batch(reqs)
        print(json.dumps({"batch_id": bid}, indent=2))
        return 0

    if args.mode == "poll":
        if not args.batch_id:
            print("ERROR: --batch-id required for --mode poll", file=sys.stderr)
            return 2
        print(json.dumps(poll_batch(args.batch_id), indent=2))
        return 0

    if args.mode == "fetch":
        if not args.batch_id:
            print("ERROR: --batch-id required for --mode fetch", file=sys.stderr)
            return 2
        print(json.dumps(retrieve_results(args.batch_id), indent=2))
        return 0

    return 1  # unreachable


if __name__ == "__main__":
    sys.exit(main())
