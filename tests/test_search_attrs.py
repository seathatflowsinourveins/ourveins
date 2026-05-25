# tests/test_search_attrs.py
import pytest
from unittest.mock import MagicMock, AsyncMock


def test_keys_have_correct_types_and_names():
    from agents.search_attrs import (
        ConversationIdKey,
        ElapsedSecKey,
        P99BreachKey,
        SLOClassKey,
        ManualReviewPendingKey,
    )
    from temporalio.common import SearchAttributeKey

    assert isinstance(ConversationIdKey, SearchAttributeKey)
    assert ConversationIdKey.name == "ConversationId"

    assert isinstance(ElapsedSecKey, SearchAttributeKey)
    assert ElapsedSecKey.name == "ElapsedSec"

    assert isinstance(P99BreachKey, SearchAttributeKey)
    assert P99BreachKey.name == "P99Breach"

    assert isinstance(SLOClassKey, SearchAttributeKey)
    assert SLOClassKey.name == "SLOClass"

    assert isinstance(ManualReviewPendingKey, SearchAttributeKey)
    assert ManualReviewPendingKey.name == "ManualReviewPending"


@pytest.mark.asyncio
async def test_register_search_attributes_calls_operator_service():
    from agents.search_attrs import register_search_attributes

    mock_client = MagicMock()
    mock_client.operator_service.add_search_attributes = AsyncMock()

    await register_search_attributes(mock_client)

    mock_client.operator_service.add_search_attributes.assert_called_once()


@pytest.mark.asyncio
async def test_register_search_attributes_idempotent_on_already_exists():
    """If a search attribute is already registered, the call must not raise."""
    from agents.search_attrs import register_search_attributes

    mock_client = MagicMock()
    # Simulate AlreadyExists by raising a generic Exception with 'already' in message
    err = Exception("search attribute already exists in namespace")
    mock_client.operator_service.add_search_attributes = AsyncMock(side_effect=err)

    # Should swallow the "already exists" path
    await register_search_attributes(mock_client)  # must NOT raise
