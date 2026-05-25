---
name: addyosmani-security-and-hardening
description: SDLC-time security pattern coverage for code being written or reviewed. Use when handling user input, authentication, sessions, or third-party data flows. Use when adding input validation, escaping, parameterized queries, or CSRF/XSS/SQLi mitigations. Use when reviewing code for OWASP Top 10 patterns at design time (NOT pen-testing or vuln-scanning). Distinct from `engineering-skills:security-pen-testing` (active pen-test) and `engineering-skills:senior-security` (architecture review) — this skill enforces in-line code-pattern hardening at write/review time.
---

# Security and Hardening (addyosmani vendor-fork — SDLC pattern-coverage variant)

## Overview

Security-first development practices applied AT CODE-WRITE TIME — input validation, output escaping, parameterized queries, secure session handling, secret management, third-party integration boundaries. This skill is intentionally restricted to **SDLC pre-commit pattern coverage** to avoid overlapping with the active pen-test / vuln-scan / red-team skills in `engineering-skills:*`. Vendor-forked from `addyosmani/agent-skills @ f17c6e88` (MIT licensed) per W332-B closure.

## Source

Source: addyosmani/agent-skills @ f17c6e88 MIT licensed; vendor-fork via ctx_fetch_and_index 2026-05-19 — file `skills/security-and-hardening/SKILL.md` (11301 bytes, blob SHA `5b36a7b4594d737c07809d732cc12efe4c302a5b`).

## Behavior (preserved from upstream f17c6e88, scope-restricted)

Pattern checklist that fires at code-write time:

1. **Input validation**: every user-supplied value validated at the boundary (type + range + format); reject early.
2. **Output escaping**: contextual escaping for HTML / JS / SQL / shell / URL; never string-concat untrusted data into a privileged context.
3. **Parameterized queries**: prepared statements ONLY; reject string-concat SQL on sight.
4. **Authentication**: hash passwords (bcrypt/argon2id, NEVER MD5/SHA1); rotate session IDs on login; HttpOnly + Secure + SameSite cookies.
5. **Authorization**: enforce permission checks at the **action boundary**, not the UI; never trust client-side role.
6. **CSRF**: anti-CSRF tokens on state-changing requests; SameSite=Strict where feasible.
7. **Secret management**: NEVER commit secrets; env-var loading with explicit validation; rotate on suspected exposure.
8. **Dependency hygiene**: prefer pinned versions; audit transitive deps for known CVEs (`npm audit` / `pip-audit` / `cargo audit`).
9. **Logging discipline**: NEVER log secrets, tokens, PII; structured logging with explicit allowlist of fields.
10. **Third-party integrations**: timeout + retry-with-backoff + circuit-breaker; validate response shape.

## Scope restriction (vs. sibling skills)

**This skill DOES NOT cover**:
- Active pen-testing → use `engineering-skills:security-pen-testing`
- Red-team adversarial campaigns → use `engineering-skills:red-team`
- Threat-detection / SOC ops → use `engineering-skills:threat-detection`
- Cloud-architecture security review → use `engineering-skills:cloud-security` / `engineering-skills:senior-security`
- AI/LLM-specific prompt-injection → use `engineering-skills:ai-security`
- Incident response → use `incident-response:incident-response`

**This skill DOES cover**: in-line code-pattern guidance at write-time + pre-commit-stage review.

## Cardinal-rule conformance

- **R1**: MIT-licensed; commit-pinned `f17c6e88`; operator-curated R4(b) skill.
- **R2**: pure-prose SKILL.md; no `.claude/hooks/**` impact. (NOTE: this skill recommends pre-commit hardening — the actual gitleaks/ruff/shellcheck hooks live in `.claude/settings.json` as direct-CLI invocations per R2-compliant pattern.)
- **R3**: no subagent declaration.
- **R4(b)**: path-gated; auto-fire per SKILL.md `description:`; scope explicitly restricted via "Distinct from" clause to avoid sibling-overlap >50%.
- **R5**: read-mostly behavioral skill; recommendations are advisory; no destructive ops.

## Provenance

- **Wave**: W332-B (SDLC-coverage extension v2)
- **Source commit**: `addyosmani/agent-skills @ f17c6e88c904dc747381c374312c2d58e10647ae`
- **Source file**: `skills/security-and-hardening/SKILL.md`
- **Source blob SHA**: `5b36a7b4594d737c07809d732cc12efe4c302a5b`
- **Source size**: 11301 bytes (72 indexed sections)
- **License**: MIT
- **Sibling-overlap audit**: HIGH-RISK overlap with 6 `engineering-skills:*` security skills; mitigated via explicit scope-restriction block; trigger phrases gated to "code-write time" / "OWASP at design time" / "pre-commit pattern" — NOT pen-test/scan/red-team triggers.
- **Trigger-phrase cardinality**: 5 distinct trigger phrases (≤8 per CR-4 corollary).
- **Vendor-fork rationale**: closes the "in-line code-pattern hardening" gap; engineering-skills:* security family is review/audit-time, not write-time.
