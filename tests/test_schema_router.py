# tests/test_schema_router.py — 6 cases per spec §11 v6
import pytest


@pytest.fixture(autouse=True)
def reset_router():
    from agents.schema_router import SchemaRouter

    SchemaRouter.upcasters = {}
    yield
    SchemaRouter.upcasters = {}


def test_direct_upcast_v1_to_v2():
    from agents.schema_router import SchemaRouter

    @SchemaRouter.register_upcaster("task.v1", "task.v2")
    def up12(raw):
        return {**raw, "type": "task.v2", "field_v2": True}

    out = SchemaRouter.read({"type": "task.v1", "x": 1}, target_type="task.v2")
    assert out["type"] == "task.v2"
    assert out["field_v2"] is True


def test_multi_hop_v1_to_v3():
    from agents.schema_router import SchemaRouter

    @SchemaRouter.register_upcaster("task.v1", "task.v2")
    def up12(raw):
        return {**raw, "type": "task.v2"}

    @SchemaRouter.register_upcaster("task.v2", "task.v3")
    def up23(raw):
        return {**raw, "type": "task.v3"}

    out = SchemaRouter.read({"type": "task.v1"}, target_type="task.v3")
    assert out["type"] == "task.v3"


def test_no_path_fails_closed():
    from agents.schema_router import SchemaRouter, SchemaError

    @SchemaRouter.register_upcaster("task.v1", "task.v2")
    def up12(raw):
        return {**raw, "type": "task.v2"}

    with pytest.raises(SchemaError):
        SchemaRouter.read({"type": "task.v1"}, target_type="task.v999")


def test_cycle_does_not_loop():
    from agents.schema_router import SchemaRouter

    @SchemaRouter.register_upcaster("task.v1", "task.v2")
    def up12(raw):
        return {**raw, "type": "task.v2"}

    @SchemaRouter.register_upcaster("task.v2", "task.v1")  # downgrade
    def down21(raw):
        return {**raw, "type": "task.v1"}

    @SchemaRouter.register_upcaster("task.v2", "task.v3")
    def up23(raw):
        return {**raw, "type": "task.v3"}

    # visited set prevents v1→v2→v1→...
    out = SchemaRouter.read({"type": "task.v1"}, target_type="task.v3")
    assert out["type"] == "task.v3"


def test_max_hops_enforced():
    from agents.schema_router import SchemaRouter, SchemaError

    # Register MAX_HOPS+2 hops to exceed cap
    for i in range(SchemaRouter.MAX_HOPS + 2):

        @SchemaRouter.register_upcaster(f"task.v{i}", f"task.v{i + 1}")
        def f(raw, _i=i):
            return {**raw, "type": f"task.v{_i + 1}"}

    with pytest.raises(SchemaError):
        SchemaRouter.read(
            {"type": "task.v0"}, target_type=f"task.v{SchemaRouter.MAX_HOPS + 1}"
        )


def test_identity_passthrough():
    from agents.schema_router import SchemaRouter

    out = SchemaRouter.read({"type": "task.v1"}, target_type="task.v1")
    assert out == {"type": "task.v1"}
