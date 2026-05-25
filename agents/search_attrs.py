# agents/search_attrs.py
"""Typed Temporal SearchAttributeKey declarations for W375 SLO tracking.

Cite: spec §10 v4 + V9 typed API + codex r3 P1 fix (typed search-attr registration).
Used by §4 workflow.upsert_search_attributes() and §12 reconcile/audit verbs.
"""

import logging
from temporalio.common import SearchAttributeKey

log = logging.getLogger(__name__)

# Typed keys — names are stable and registered with Temporal server.
ConversationIdKey = SearchAttributeKey.for_text("ConversationId")
ElapsedSecKey = SearchAttributeKey.for_int("ElapsedSec")
P99BreachKey = SearchAttributeKey.for_bool("P99Breach")
SLOClassKey = SearchAttributeKey.for_keyword("SLOClass")
ManualReviewPendingKey = SearchAttributeKey.for_bool("ManualReviewPending")

ALL_KEYS = [
    ConversationIdKey,
    ElapsedSecKey,
    P99BreachKey,
    SLOClassKey,
    ManualReviewPendingKey,
]


async def register_search_attributes(client) -> None:
    """Register W375 search attributes with the Temporal server (idempotent).

    The temporalio Python SDK operator_service.add_search_attributes() takes a
    typed AddSearchAttributesRequest protobuf object — NOT keyword arguments.
    Passing search_attributes={...} as a keyword arg silently creates a bad
    request (P0-3 bug); the correct form constructs the request explicitly.

    If a key already exists, the operator-service call may raise; we swallow
    that and other transient errors at worker startup (W375 still functions
    without search attrs — they're observability-only).

    Args:
        client: temporalio.client.Client connected to a Temporal server.
    """
    try:
        from temporalio.api.operatorservice.v1 import AddSearchAttributesRequest

        req = AddSearchAttributesRequest(
            namespace="default",
            search_attributes={k.name: k.indexed_value_type for k in ALL_KEYS},
        )
        await client.operator_service.add_search_attributes(req)
        log.info("w375.search_attrs_registered", extra={"count": len(ALL_KEYS)})
    except Exception as e:
        msg = str(e).lower()
        if "already" in msg or "exists" in msg:
            log.info("w375.search_attrs_already_registered")
        else:
            log.warning("w375.search_attrs_register_failed", extra={"error": str(e)})
            # NOT re-raised — worker continues without search attrs (degraded observability)
