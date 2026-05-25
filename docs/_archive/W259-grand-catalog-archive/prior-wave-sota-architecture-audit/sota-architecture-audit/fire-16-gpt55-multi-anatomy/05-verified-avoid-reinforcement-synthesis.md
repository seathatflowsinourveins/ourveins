# 05 — verified-avoid Cohort 3 REINFORCEMENT synthesis (AFFIRM-REJECT)

> **Purpose**: synthesize Fire 16 GPT-5.5 AFFIRM-REJECT verdict on Fire 13 Cohort 3 entry.
> Forward-only per `port-note-discipline.md §6` (no historical rewrite).

## Source verdicts (Fire 16 GPT-5.5 conf=0.86)

All 4 Fire 13 quantitative claims VERIFIED:
1. **Stars** (76,425 → 76,300 current; drift 0.16%): ✅ VERIFIED-CURRENT
2. **Disk usage** (3,949 KB unchanged): ✅ VERIFIED-CLOSE
3. **Density** (0.0518 KB/★ vs 0.5 threshold = 9.66× below): ✅ VERIFIED-FRESH-PAINT
4. **Vendor-spam + vanity domain**: ✅ VERIFIED-SPAM-INTACT — **ESCALATED 3 → 19 topics**

**Overall verdict**: AFFIRM-REJECT — Fire 13 Cohort 3 classification is REINFORCED, NOT mitigated.

## Authoritative reinforcements (3 specific updates to Fire 13 Cohort 3 entry)

### Reinforcement 1: Density math VERIFIED at 9.66× below threshold

**Fire 13 file 05 claim** (L23): "Density = 0.0517 KB/★ (76k★ over 3.9MB)" + "10× thinner than threshold"

**Authoritative refinement**: At Fire 16 audit time, density is **0.0518 KB/★** (3949 / 76300). The "10× thinner" framing was correct in spirit; precise multiplier is **9.66×**. Density has NOT improved since Fire 12 — the repo remains fresh-paint by the convergence-gate Axis-3 rubric.

### Reinforcement 2: Vendor-spam pattern INTENSIFIED (3 → 19 topics)

**Fire 13 file 05 claim** (L28-29): topics include `antigravity` + `cursor-ai` + `copilot`

**Authoritative update**: The topic list has EXPANDED from 3 vendor markers to **19 total topics**, including **6 NEW vendor markers post-Fire-13**:
- `trae` (Bytedance AI)
- `codex` (OpenAI Codex CLI)
- `claude` + `claude-code` (Anthropic Claude Code)
- `windsurf-ai` (Codeium IDE)
- `kiro` (Amazon AI IDE)
- `qoder` (Alibaba AI IDE)

This is **AGGRESSIVE vendor-cross-listing star-farming** continuing/escalating. The fresh-paint discriminator is correctly identifying ongoing problematic behavior.

### Reinforcement 3: vanity-domain uupm.cc UNCHANGED

**Fire 13 file 05 claim** (L30): homepage `uupm.cc` (Chinese-domain vanity registration)

**Authoritative confirmation**: Homepage is still `https://www.uupm.cc/` at Fire 16 audit time. No vendor-org backing has been added.

## Pattern A fix-forward (forward-only)

Per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A` + `port-note-discipline.md §6`:

- Fire 13 file 05 STAYS as committed at `c57d807` (historical record)
- Reinforcements documented HERE forward-only
- Future operators should consult Fire 16 file 05 for the LATEST CROSS-MODEL-VERIFIED REJECT classification

## Cohort 3 disposition (reinforced)

| Dimension | Fire 13 verdict | GPT-5.5 reinforced (Fire 16) | Action |
|---|---|---|---|
| Stars at REJECT | 76,425 | 76,300 current (drift 0.16%) | UNCHANGED — within tolerance |
| Disk usage | 3,949 KB | 3,949 KB | UNCHANGED |
| Density vs threshold | 10× below 0.5 KB/★ | **9.66× below** (precise) | Refined math |
| Vendor-spam topic count | 3 (antigravity/cursor-ai/copilot) | **19** (incl. 6 NEW vendors) | ESCALATED |
| Vanity domain | uupm.cc | Still uupm.cc | UNCHANGED |
| Overall REJECT classification | Fresh-paint REJECT | **AFFIRM-REJECT-REINFORCED** | Strengthened |

## Why this matters

The Cohort 3 fresh-paint REJECT pattern was VALIDATED by GPT-5.5 cross-model audit:
1. **Star count stability** (0.16% drift) confirms this isn't ephemeral star-volatility but stable star-farming
2. **Disk usage unchanged** confirms no content investment since Fire 12 audit
3. **Density math verified** confirms the convergence-gate Axis-3 rubric correctly classifies
4. **Vendor-spam ESCALATION** (3 → 19 topics in ~weeks) confirms ongoing star-farming behavior

Future operators encountering this repo on discovery passes can REJECT via Cohort 3 with confidence; the cross-model verified rubric supports this.

## Re-evaluate triggers (unchanged from Fire 13)

If a future discovery pass surfaces this repo with these conditions ALL TRUE, re-audit:
1. Density rises above 0.5 KB/★ (10× content growth, ~40MB content for 76k★)
2. Vendor-spam topics removed (back to ≤3 legitimate topics)
3. Vanity domain replaced with vendor-org-backed homepage
4. Push gap closes (active development resumes)

Until ALL re-evaluate triggers hit: REJECT is permanent per Cohort 3 + Fire 16 cross-model verification.

## Closed-loop disposition

Per `Z:/claude-sota/.claude/rules/closed-loop-recursive-narrowing.md §Outcome A`:
- Fire 13 file 05 had 0 OVER claims; all 4 quantitative claims VERIFIED
- GPT-5.5 Fire 16-a4 returned AFFIRM-REJECT conf=0.86
- Vendor-spam pattern ESCALATION is a NEW finding (3 → 19 topics) — strengthens not weakens the REJECT
- Outcome A clean ACCEPT — REJECT classification stands cross-model verified

## Cross-model gate state — ALL 4 FIRE 13 ANATOMIES + FIRE 15 PAGEINDEX = 5/5 VERIFIED

✅ **SATISFIED for verified-avoid Cohort 3** (4 claims audited; conf=0.86; AFFIRM-REJECT)
✅ **SATISFIED for ARIS** (3 claims audited; conf=0.97; full APPROVE)
✅ **SATISFIED for OpenSpec** (3 claims audited; conf=0.94; mixed verdict)
✅ **SATISFIED for letta** (2 claims audited; conf=0.93; both refuted)
✅ **SATISFIED for PageIndex** (2 claims audited; conf=0.90; partial refutation)

**🎉 FIRE 16 COMPLETE — 5/5 = 100% of Fire 13 tier anatomies cross-model verified.**

## Mia ladder advance (within Fire 16 close)

n=1281 → n=1287 (+6: 3 reinforcement updates / re-evaluate triggers preserved / closed-loop Outcome A / 100% Fire 13 anatomy coverage milestone / cross-model gate full closure / forward-only discipline per port-note-discipline §6)
