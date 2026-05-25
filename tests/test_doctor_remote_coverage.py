# tests/test_doctor_remote_coverage.py
"""Codex r1 D5 O4 BLOCKER FIX: doctor checks Temporal + Langfuse/OTLP + spool
+ OAuth + image + data-converter; reconcile sweeps containers + networks + idem rows.
"""

from unittest.mock import patch

from tools.dispatch_temporal import doctor


def test_doctor_reports_temporal_unreachable():
    """doctor exits non-zero with clear message when :7233 down."""
    with patch(
        "agents.health_probes.probe_temporal",
        return_value=(False, "ECONNREFUSED"),
    ):
        rc, report = doctor(dry_run=True)
        assert rc != 0
        assert any(
            item["name"] == "temporal" and item["status"] == "RED" for item in report
        )
        assert any("ECONNREFUSED" in str(item.get("detail", "")) for item in report)


def test_doctor_reports_data_converter_unwired():
    """doctor RED if pydantic_data_converter not wired at known sites."""
    with patch("agents.health_probes.probe_data_converter_wired", return_value=False):
        rc, report = doctor(dry_run=True)
        assert rc != 0
        assert any(
            item["name"] == "data_converter" and item["status"] == "RED"
            for item in report
        )


def test_doctor_oauth_file_acl_owner_only():
    """codex r1 D2 S6: OAuth file ACL must be owner-only (icacls on Windows)."""
    with patch("agents.health_probes.probe_oauth_acl_owner_only", return_value=False):
        rc, report = doctor(dry_run=True)
        assert rc != 0
        assert any(
            item["name"] == "oauth_acl" and item["status"] == "RED" for item in report
        )


# codex r3 D5-O4 fix (PARTIAL→FIXED): add Langfuse + OTLP + spool + image-pin doctor checks.
def test_doctor_reports_langfuse_unreachable():
    """codex r3 D5-O4: doctor MUST probe Langfuse HTTP /api/public/health."""
    with patch(
        "agents.health_probes.probe_langfuse_health",
        return_value=(False, "CONNECTION_REFUSED"),
    ):
        rc, report = doctor(dry_run=True)
        assert rc != 0
        assert any(
            item["name"] == "langfuse" and item["status"] == "RED" for item in report
        )


def test_doctor_reports_otlp_endpoint_unreachable():
    """codex r3 D5-O4: doctor MUST probe OTEL_EXPORTER_OTLP_ENDPOINT."""
    with patch(
        "agents.health_probes.probe_otlp_endpoint",
        return_value=(False, "DNS_FAIL"),
    ):
        rc, report = doctor(dry_run=True)
        assert rc != 0
        assert any(
            item["name"] == "otlp_endpoint" and item["status"] == "RED"
            for item in report
        )


def test_doctor_reports_spool_path_writable():
    """codex r3 D5-O4: doctor MUST probe the spool directory writability + free space."""
    with patch(
        "agents.health_probes.probe_spool_writable",
        return_value=(False, "PERMISSION_DENIED"),
    ):
        rc, report = doctor(dry_run=True)
        assert rc != 0
        assert any(
            item["name"] == "spool" and item["status"] == "RED" for item in report
        )


def test_doctor_reports_agent_server_image_pinned():
    """codex r3 D5-O4: doctor MUST verify AGENT_SERVER_IMAGE digest-pin freshness."""
    with patch(
        "agents.health_probes.probe_image_digest_pin",
        return_value=(False, "DIGEST_DRIFT"),
    ):
        rc, report = doctor(dry_run=True)
        assert rc != 0
        assert any(
            item["name"] == "image_digest" and item["status"] == "RED"
            for item in report
        )


def test_doctor_reports_reconcile_sweep_dry_run():
    """codex r3 D5-O4: doctor --include-reconcile MUST list orphan containers/networks."""
    with patch("agents.health_probes.probe_reconcile_orphans", return_value=(2, 1, 0)):
        # (orphan_containers, orphan_networks, orphan_idempotency_rows)
        rc, report = doctor(dry_run=True, include_reconcile=True)
        rec = next(item for item in report if item["name"] == "reconcile")
        assert rec["status"] in ("YELLOW", "RED")  # orphans present
        assert rec["detail"]["orphan_containers"] == 2
        assert rec["detail"]["orphan_networks"] == 1
