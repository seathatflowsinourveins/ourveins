# W323 Stream-7 — GitNexus + planning-with-files RE-EVAL

**Task restatement**: post-W321-8 META blindspot #3 ("rule layer can demand gates the runtime cannot execute"), re-evaluate GitNexus HOLD-DISABLED + planning-with-files KEEP-DISABLED verdicts. NARROWED methodology: deepwiki + Read; NO repomix-pack.

## §1 GitNexus 1.6.5 vs 1.6.3 — upstream activity

DeepWiki found CHANGELOG only up to **1.6.4** (1.6.5 not yet in indexed wiki — semantic-version assumption-mismatch with W321-5's "1.6.5" claim; the actually-shipping HEAD per deepwiki is 1.6.4).

**1.6.4 vs 1.6.3 NEW features**:
- `gitnexus publish` (graph push to understand-quickly registry)
- Cross-repo extractors: C++ `IncludeExtractor`, Unreal Engine C++, Thrift contracts, workspace extractors (Node/Python/Go/Java/Elixir)
- Go + TS registry-primary scope resolution
- **MCP tool safety annotations** (read-only/mutating semantics) — directly relevant to W321-8 META blindspot #2 (R5 layered-defense)
- `--embeddings <limit>` (bound embeddings on large graphs)
- Pino structured JSON logger (replaces ad-hoc console)
- Shared resilient-fetch helper (retries + circuit breaker)
- `/autofix` ChatOps button (fork-safe PR autofix)
- Automated security + vulnerability scans in CI

**1.6.4 silent-fallback FIXES** (directly addresses W321-8 blindspot #3):
- FTS read-only DB cluster surface missing-FTS warnings (was silent)
- WAL corruption recovery + CHECKPOINT-before-close
- Embedding download failures: actionable HF_ENDPOINT guidance + retries + timeout + circuit breaker (was silent)
- Windows reliability: tree-sitter-c/cpp segfault fixes; LadybugDB lock acquisition; **silent finalize-skips surfaced**
- MCP server timeout fixes; npx startup fixes
- Storage/CLI: surfaced silent finalize-skips
- Worker pool: parse-stall recovery; premature pool-resolution fix

**1.6.3 silent-fallback FIXES** (per CHANGELOG):
- `groupImpact` local-impact errors NOW BUBBLE TO CALLER (was swallowed)
- Sequential parser logging: skipped languages logged (were silently dropped)
- FTS index bootstrap: tries local `LOAD` before `INSTALL` (offline-resilient)

**Maintenance signal**: HIGH — 5 releases (1.6.0 → 1.6.4) in April-May 2026; dozens of closed issues per release; AGENTS.md changelog updated through April 2026.

## §2 Rule-vs-runtime contradiction sites in our config/docs

| Site | Reference type | Contradiction risk |
|---|---|---|
| `.claude/settings.json:258` | `"gitnexus@gitnexus-marketplace": false` (DISABLED) | NONE — explicit disable |
| `.claude/settings.json:389-392` | marketplace path declaration | NONE — registration only, not enabled |
| `CLAUDE.md:45` | passing mention (gitnexus deepwiki/SHA cite) | NONE — historical narrative only |
| `docs/architecture/W317-GIT-AND-GITNEXUS/W317-D-GITNEXUS-PATTERN-EXTRACT.md` | pattern-study doc | NONE — pattern-study tier, no runtime binding |
| `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` | row entries (HOLD-T3 verdict) | NONE — ledger record |

**Contradiction count: 0** in our config/docs surface. W321-8 META blindspot #3's concern was theoretical (GitNexus's OWN `AGENTS.md` in its cache demands gitnexus tools usage). That AGENTS.md is a plugin-internal contract; when the plugin is `enabled: false`, it doesn't auto-load + cannot bind our runtime. **No rule-vs-runtime contradiction in OUR surface.** (Codex's META blindspot #3 is valid as a PATTERN but doesn't fire on this specific case.)

## §3 planning-with-files — final verdict (W321-8 META re-evaluation)

W321-5 verdict: KEEP-DISABLED (durable-planning-files SKILL covers; 17+ multi-IDE breadth wasted).

**v2.37.0 NEW features W321-5 missed** (per deepwiki):
- **Hash attestation for `task_plan.md`** (SHA-256 stored; UserPromptSubmit + PreToolUse hooks recompute; mismatch → `[PLAN TAMPERED — injection blocked]`) — **SECURITY feature** absent in durable-planning-files SKILL
- `/plan-attest` slash command (lock + `--show` + `--clear`)
- Parallel plan isolation under `.planning/YYYY-MM-DD-<slug>/`
- Codex session isolation (opt-in attach)
- `session-catchup.py` (recover unsynced work from JSONL logs)
- Hook-driven context-injection (UserPromptSubmit injects task_plan.md first 50 lines; PreToolUse re-injects first 30 lines)

**META re-eval**: W321-8 blindspot #2 (R5 layered-defense) explicitly mentions "prompt/input redaction" + "audit hooks wired" — planning-with-files hash-attestation IS the audit primitive. The KEEP-DISABLED verdict is now WEAKER post-META — security feature gap surfaces.

**REVISED VERDICT**: **PATTERN-VENDOR HYBRID** — vendor the hash-attestation pattern into local durable-planning-files SKILL (add SHA-256 task_plan.md attestation + UserPromptSubmit hook integration); KEEP-DISABLED on full plugin install (still avoids 17+ multi-IDE breadth + 6 i18n duplicates + 10 commands).

**Contradiction sites: 0** in our config — durable-planning-files SKILL doesn't enforce hash-attestation, so no runtime cannot-execute contradiction.

## §4 INSTALL or REMOVE-CONTRACT-REFS decision

| Plugin | Decision | Rationale |
|---|---|---|
| **GitNexus** | **HOLD-DISABLED + ADD-MCP-SAFETY-ANNOTATIONS-PATTERN** | License (PolyForm Noncommercial) still blocks future commercial use. BUT 1.6.4 MCP tool safety annotations + silent-fallback fixes are SOTA patterns worth studying. Cache is 1.3.6 (way stale) — no install path WITHOUT operator-explicit commercial-status decision. Recommend: REMOVE the cached `1.3.6` marketplace dir (frees ~MB) since plugin will never be enabled at current license; archive verdict-row in VERDICT-LEDGER.md. Pattern-study only. |
| **planning-with-files** | **KEEP-DISABLED-PLUGIN + VENDOR-HASH-ATTEST-PATTERN** | New v2.37.0 hash-attestation IS a security improvement durable-planning-files SKILL doesn't have. Vendor the attestation pattern (≤2KB SHA-256 + UserPromptSubmit hook check) into our SKILL per cardinal-rule-2 exception (bug-patch shim, cite-anchored to upstream v2.37.0). |

**Final contradiction count in our surface: 0** (GitNexus AGENTS.md is plugin-internal, doesn't bind our runtime because plugin disabled; planning-with-files SKILL doesn't enforce hash-attestation today, so no cannot-execute contradiction either).

## Report-back (3 sentences)

GitNexus final verdict: **HOLD-DISABLED + REMOVE-STALE-CACHE + PATTERN-STUDY-MCP-SAFETY-ANNOTATIONS** (PolyForm-Noncommercial still blocks install; cache at 1.3.6 vs upstream 1.6.4 is too-stale to leave dormant; 1.6.4's MCP tool safety annotations + silent-fallback fixes are SOTA worth pattern-vendor). Planning-with-files final verdict: **KEEP-DISABLED-PLUGIN + VENDOR-HASH-ATTEST-PATTERN** (v2.37.0 SHA-256 task_plan.md attestation is a NEW security feature absent from local durable-planning-files SKILL; vendor the ≤2KB pattern per cardinal-rule-2 exception cite-anchored to OthmanAdi v2.37.0; full plugin still wasted by 17+ multi-IDE breadth). Contradiction sites in our surface: **0** — both plugins disabled cleanly, no rule-vs-runtime cannot-execute pattern fires on us today (W321-8 META blindspot #3 is valid as theory but doesn't bind here).

Out-of-scope flag: my directive cited GitNexus 1.6.5 but deepwiki indexes only up to 1.6.4; if 1.6.5 has shipped post-deepwiki-index, that's a NEW ingest needed in a future stream.

File: `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-7-GITNEXUS-PLANNING-REEVAL.md` (this file, ~900 words)
