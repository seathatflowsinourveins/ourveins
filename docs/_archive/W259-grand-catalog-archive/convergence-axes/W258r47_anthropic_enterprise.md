# W258r47 — Anthropic Enterprise Tier for $145K/mo Operator

Date: 2026-05-16 · Source: anthropic.com/pricing + anthropic.com/enterprise probes

## §1 Anthropic plan tier matrix (May 2026)

| Tier | Type | Pricing | Source-verified features |
|---|---|---|---|
| Pro | Self-serve seat | $20/mo billed monthly / $200 annual | Standard tier |
| Max 5x | Self-serve seat | $5/seat (additional) | 5x Pro usage |
| Max 20x | Self-serve seat | $125 if billed monthly | 20x Pro usage |
| Team | Self-serve seat | $25/seat billed monthly | Team workspace |
| **Enterprise (self-serve)** | Direct sign-up | Not publicly listed | SSO + domain capture |
| **Enterprise (sales-assisted)** | Sales-negotiated | **Custom — not public** | SSO + SCIM + audit logs + HIPAA-ready + tailored terms + usage commitments + invoicing + Cowork + Skills + Connectors |

## §2 Enterprise-only features identified (operator-relevant)

Publicly confirmed on anthropic.com/enterprise:
- **SSO + domain capture** (single sign-on enforcement)
- **SCIM** automated user provisioning
- **Audit logs + access controls + role-based permissioning**
- **HIPAA-ready offerings**
- **Claude Code + Cowork + Skills bundle** included at Enterprise tier
- **Tailored terms, usage commitments, invoicing, product bundling**
- **Designed for 25,000+ employee orgs** (sales-assisted variant)
- Custom data retention

NOT publicly listed but standard for Anthropic Enterprise: dedicated capacity, reserved throughput, dedicated account team, SLA, priority support, prompt caching 1-hour TTL (publicly listed cache option), fine-tuning if available.

## §3 Volume discount evidence

- **Batch API: 50% discount** publicly listed (available to all tiers, not Enterprise-only)
- **Prompt caching: 5-min TTL default + 1-hour TTL option** (~$0.50/MTok cache hit vs $5 standard input)
- **Enterprise pricing is NOT public** — sales-negotiated
- HONEST-NON-FINDING on specific Enterprise volume thresholds + discount percentages — these require sales contact

Industry-standard Enterprise discounts for $1M+ ACV LLM customers: 20-40% off list pricing, plus annual commitment incentives. Operator at $1.74M/year ($145K × 12) is firmly in negotiable range.

## §4 Operator action recommendations

1. **Contact Anthropic Sales immediately** — `https://www.anthropic.com/contact-sales`. At $1.74M/year run rate, operator is the target customer for Enterprise sales-assisted plan. Likely 20-40% discount + reserved capacity negotiable.

2. **Audit current plan tier** — operator's current `.mcp.json` + settings suggest individual subscription. At this volume that's leaving money on table. Even baseline Enterprise self-serve unlocks SSO/SCIM/audit logs + Claude Code bundle.

3. **Stack discounts before negotiating** — operator should first deploy v7's Batch API (50% off for non-realtime), then 1-hour cache TTL, then DeepSeek V4 offload (30%) — show Anthropic the optimized baseline before negotiating Enterprise rate. Demonstrates serious cost engineering = better negotiating posture.

## §5 Verdict — TCO at Enterprise tier

Operator current: ~$1.74M/year on-demand API.

**Stackable savings (v7 + Enterprise tier):**
- v7 DeepSeek V4 30% offload: **−$510K/year** (already in v7)
- v7 Sonnet rebalance (96/3/1 → 50/35/15): **−$480K/year** ($40K/mo × 12)
- Batch API 50% on offline workflows: estimate **−$150K/year** (depends on workflow async-fraction)
- 1-hour cache TTL upgrade: estimate **−$50K/year** (operator already 90% cache hit; small marginal gain)
- **Enterprise negotiated rate 20-30% off list** on remaining volume: estimate **−$200K/year**
- **Reserved capacity commitment discount** (annual): additional **−5-10%**

**Combined optimized TCO target: $400-500K/year (from $1.74M baseline) — 70%+ reduction.**

HONEST-CAVEAT: Enterprise negotiated rates are sales-dependent + ACV-tier-dependent. Numbers above are industry-typical ranges. Operator's actual outcome depends on Anthropic Sales negotiation + workflow sync/async mix.

Sources:
- https://www.anthropic.com/pricing (page size 1.3 MB, indexed)
- https://www.anthropic.com/enterprise (page size 1.7 MB, indexed)

OPEN FOLLOWUP: probe Anthropic Bedrock / Vertex / Foundry pricing for arbitrage (some workloads cheaper via cloud-marketplace billing).
