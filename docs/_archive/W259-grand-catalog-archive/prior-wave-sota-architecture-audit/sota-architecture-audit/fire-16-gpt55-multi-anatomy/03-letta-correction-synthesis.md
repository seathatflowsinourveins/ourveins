# 03 — letta Fire 13 correction synthesis (forward-only Pattern A apply)

> **Purpose**: synthesize the Fire 16 GPT-5.5 cross-model verdict refuting 2 Fire 13 letta
> claims. Forward-only per `port-note-discipline.md §6` (no historical rewrite).

## Source corrections (Fire 16 GPT-5.5 conf=0.93)

1. **Claim 1 (MCP-native NO) — REFUTED**: Letta has FIRST-CLASS MCP CLIENT support; native MCP protocol integration via `mcp[cli]>=1.9.4` + `fastmcp>=2.12.5` + complete `letta/services/mcp/` implementation + REST API at `/v1/mcp-servers/`
2. **Claim 2 (PostgreSQL REQUIRED) — REFUTED**: SQLite is DEFAULT backend per `letta/settings.py:493`; PostgreSQL is OPTIONAL via env var

## Authoritative consolidated revision (5 specific corrections to Fire 13 letta anatomy)

### Correction 1: MCP integration status

**Fire 13 file 03 claim** (L86): "MCP-native: NO (would need custom wrapper)"

**Authoritative replacement**:
- **MCP-CLIENT-native: YES** (production-grade; consumes external MCP servers via Stdio/SSE/Streamable-HTTP)
- **MCP-SERVER-native: NO** (no production implementation of Letta-as-MCP-server; FastMCP server is test-fixture only)

For eee architecture: Letta can BE configured as an MCP CONSUMER (Letta consumes eee's existing MCP servers like graphiti, repomix, github, etc.). The "custom wrapper" framing was about exposing Letta itself AS an MCP server — which Fire 13 didn't disambiguate.

**Operational disposition**: Letta can be installed as a CLIENT of existing MCP infrastructure; the wiring is via Letta's REST API (`/v1/mcp-servers/`) and is off-the-shelf, NOT custom-wrapper.

### Correction 2: PostgreSQL dependency claim

**Fire 13 file 03 claim** (L83, L89, L99): PostgreSQL stateful agents + Setup complexity MEDIUM-HIGH (PostgreSQL setup) + PostgreSQL backend ADDS new infrastructure dependency

**Authoritative replacement**: Letta supports a BACKEND CHOICE (SQLite default OR PostgreSQL optional). SQLite mode is the OUT-OF-BOX experience. PostgreSQL is opt-in via `LETTA_PG_URI` env var.

**Setup complexity**: LOW-MEDIUM (SQLite default — zero infrastructure-add for eee install)

### Correction 3: Install class

**Fire 13 file 03 claim** (L132): "Install class: SECONDARY (custom MCP wrapper required vs MCP-native primitives)"

**Authoritative replacement**: **PRIMARY-eligible** (native MCP-client; SQLite default; clean Apache-2.0 license; 22k★ + Berkeley academic lineage).

### Correction 4: Probe 7.b clause 3 (wiring path)

**Fire 13 file 03 claim** (L107): "⚠️ Wiring path: REQUIRES custom MCP wrapper (NOT off-the-shelf)"

**Authoritative replacement**: **✅ VERIFIED** — wiring path via Letta REST API `/v1/mcp-servers/` is off-the-shelf; integration code at `letta/server/rest_api/routers/v1/mcp_servers.py:36-236` is production-tested.

### Correction 5: SRA D7 score

**Fire 13 file 03 SRA verdict**:

| D7 score | Fire 13 framing | GPT-5.5 corrected |
|---|---|---|
| Anthropic-aligned | PARTIAL (Not yet MCP-native) | **PASS** (MCP-client production-native + multi-protocol support) |

SRA score upgrades from **9/10 PASS + 1 PARTIAL** to **10/10 PASS**.

## Pattern A fix-forward (forward-only)

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` +
`port-note-discipline.md §6` (no historical rewrite):

- Fire 13 file 03 STAYS as committed at `c57d807` (historical record)
- These corrections documented HERE forward-only
- Letta install decision references Fire 16 (this folder) as authoritative cross-model verified verdict

## Revised Letta disposition matrix

| Dimension | Fire 13 verdict | GPT-5.5-informed revision | Action |
|---|---|---|---|
| MCP integration | REQUIRES custom wrapper | First-class MCP CLIENT support (native, off-the-shelf) | Material upgrade |
| Database backend | PostgreSQL required | SQLite default (PostgreSQL optional) | Material downgrade of setup-cost |
| SRA D7 (Anthropic-aligned) | PARTIAL | **PASS** | Score upgrade 9→10/10 |
| Install class | SECONDARY | **PRIMARY-eligible** | Material upgrade |
| Setup complexity | MEDIUM-HIGH | LOW-MEDIUM | Material downgrade |
| kiss-dry-yagni HIGH risk | Yes (3rd backend) | **UNCHANGED** — Letta IS still 3rd memory primitive | Concern preserved |
| Probe 7.b clause 4 (incumbent) | FAIL | **UNCHANGED** — current L1+L3 stack handles needs; "self-improvement over time" is NEW capability | Concern preserved |
| Final disposition | DEFER | **STUDY-PILOT-ELIGIBLE** with gates: (1) "self-improvement over time" demand surface, (2) kiss-dry-yagni operator decision | Material upgrade |

## What changed vs what didn't

### CHANGED (GPT-5.5 corrections)
- MCP integration: custom-wrapper-needed → off-the-shelf native
- Database: PostgreSQL-required → SQLite-default
- Install class: SECONDARY → PRIMARY-eligible
- SRA D7: PARTIAL → PASS
- Setup complexity: MEDIUM-HIGH → LOW-MEDIUM
- Disposition: DEFER → STUDY-PILOT-ELIGIBLE

### UNCHANGED (genuine residual concerns)
- 3rd memory backend after L1 sqlite_vec + L3 Graphiti (kiss-dry-yagni Must-Never #4)
- Probe 7.b clause 4 (no current "self-improvement over time" demand in eee)
- Letta-as-MCP-server is test-fixture only (not production); only Letta-as-MCP-client is production

## Install gate predicate (operator decision required)

Letta install is now STUDY-PILOT-ELIGIBLE per `agent-harness-fit-verification.md` Probe 7.b. Install proceeds when ALL hold:

1. **Demand surface**: eee adds a workflow requiring agent-self-improvement-over-time (current memory primitives are EMBEDDING-or-KG, not SELF-IMPROVING)
2. **kiss-dry-yagni operator decision**: explicit acceptance that Letta is 3rd memory backend NOT a replacement for L1/L3
3. **30-day reversible pilot**: operator commits to disable path if pilot fails
4. **Migration plan**: clear cutover criteria from L1/L3 → Letta for the specific demand-surface workflow

Until ANY of these gates fail, Letta remains **STAGED-PENDING-DEMAND** (cross-model verified but no operational driver yet).

## Closed-loop disposition

Per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A`:
- Fire 13 file 03 had 2 OVER claims (both refuted by GPT-5.5)
- GPT-5.5 Fire 16 returned NEEDS-REVISION conf=0.93
- Outcome A ACCEPT-WITH-DOC ship: Fire 16 corrections + W134-F17+ Letta install decision uses corrected verdict

## Cross-model gate state

✅ **SATISFIED for letta** (claims 1+2 audited; conf=0.93)
⏸ PENDING for OpenSpec / ARIS / verified-avoid Cohort 3 (queued W134-F17+)

## Mia ladder advance (within Fire 16)

n=1242 → n=1248 (+6: 5 authoritative corrections / revised disposition matrix / install-gate predicate / closed-loop Outcome A disposition / cross-model gate state / forward-only discipline per port-note-discipline §6)
