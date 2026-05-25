# 03 — License-class Actionables: Restrictive Licenses (SRA D1 use-class analysis)

> **Purpose**: per `Z:/claude-sota/.claude/rules/sota-research-architecture.md §D1
> license-use-class precision`, classify all restrictive-license repos in the 555-strong
> A3 set by ACTUAL use-class for eee runtime adoption.

## eee use-class baseline (for D1 analysis)

Per SRA D1 lattice in `sota-research-architecture.md:32-44`:
- eee operates as **local autonomous /loop runtime**
- NOT distributed-as-product
- NOT network-hosted-for-third-parties
- NOT SaaS-resale
- This use-class makes most non-permissive licenses ACCEPTABLE for inclusion (with disclosure)

## 12 AGPL-3.0 repos (2.2% of 555)

| Repo | Stars | Use class for eee | D1 verdict |
|---|---|---|---|
| firecrawl/firecrawl | 117,874 | Web-scraping API/CLI; eee uses Firecrawl MCP server for web-fetch (local-CLI use-class) | ✅ **CLI-binary-use ACCEPTABLE** (local CLI; not network-served by eee) |
| cherryhq/cherry-studio | 45,393 | Chat UI desktop app; competitor to CC, NOT eee primitive | ⚠️ N/A — competing harness, not install candidate |
| trufflesecurity/trufflehog | 26,121 | Secret-scanning CLI tool; eee could use CLI-binary for git pre-commit scans | ✅ **CLI-binary-use ACCEPTABLE** (local CLI scan; sister to gitleaks) — note: eee currently uses gitleaks |
| winfunc/opcode | 21,800 | (UNCLEAR — stale 206d) — needs probe | ⚠️ STALE — defer |
| siteboon/claudecodeui | 10,758 | Web UI for CC; competing GUI not eee primitive | ⚠️ N/A — competing harness |
| smtg-ai/claude-squad | 7,406 | CC team/squad orchestrator; competing harness | ⚠️ N/A — competing orchestrator (sister to ruvnet/ruflo) |
| oxsecurity/megalinter | 2,481 | Linting aggregator; CI tool | 🔬 STUDY-PILOT — CLI-binary-use ACCEPTABLE |
| cytostack/openwolf | 1,509 | (probe needed for category) | DEFER |
| milisp/codexia | 673 | Codex-related tool | DEFER |
| ogulcancelik/herdr | 672 | (probe needed) | DEFER |
| mcp-defender/mcp-defender | 253 | MCP security defender; stale 246d | ⚠️ STALE + low-stars — DEFER |
| ressl/mcp-firewall | 6 | Too low stars | REJECT — D8 industry-adoption FAIL |

**AGPL-3.0 verdict summary**:
- **2 ACCEPTABLE for CLI-binary-use**: firecrawl (already INSTALLED as MCP) + trufflehog (alternative to gitleaks)
- **1 STUDY-PILOT**: oxsecurity/megalinter (lint aggregator)
- **5 N/A**: competing harnesses (cherry-studio / claudecodeui / claude-squad / opencode-derivatives)
- **4 DEFER**: stale / low-stars / unclear category

## 6 GPL-3.0 repos (1.1% of 555)

| Repo | Stars | Use class for eee | D1 verdict |
|---|---|---|---|
| koalaman/shellcheck | 39,404 | Shell-script linter CLI; eee scripts/hooks could use it | ✅ **CLI-binary-use ACCEPTABLE** (local CLI; no source-distribute mandate) |
| golangci/golangci-lint | 18,919 | Go linter CLI; eee has minimal Go | ✅ ACCEPTABLE if eee adds Go |
| hadolint/hadolint | 12,129 | Dockerfile linter CLI | ✅ ACCEPTABLE for Docker image builds |
| neolabhq/context-engineering-kit | 983 | Context-engineering skills kit | 🔬 STUDY-PILOT — CC-aligned content |
| sterll/claude-terminal | 56 | Low stars; (probe needed) | DEFER |
| tngwilkins/agentic-engineering-starter-pack | 9 | Very low | REJECT |

**GPL-3.0 verdict summary**:
- **3 ACCEPTABLE for CLI-binary-use**: shellcheck + golangci-lint + hadolint
- **1 STUDY-PILOT**: neolabhq/context-engineering-kit (CC content kit)
- **2 DEFER/REJECT**: low stars

## 1 LGPL-2.1 repo

| Repo | Stars | Use class | Verdict |
|---|---|---|---|
| semgrep/semgrep | 15,092 | Static analysis CLI; eee could use for code review | ✅ ACCEPTABLE for CLI-binary-use; dynamic-link OK; static-link would infect |

## 1 EUPL-1.2 repo

| Repo | Stars | Use class | Verdict |
|---|---|---|---|
| eza-community/eza | 21,729 | Modern `ls` replacement CLI | ✅ ACCEPTABLE (CLI-binary-use); ALREADY in SOTA CLI tools |

## 1 MPL-2.0 repo

| Repo | Stars | Use class | Verdict |
|---|---|---|---|
| terraform-linters/tflint | 5,708 | Terraform linter | ✅ ACCEPTABLE for CLI-binary-use; eee doesn't use Terraform |

## 2 CC-BY-SA-4.0 repos (cite-only acceptable)

| Repo | Stars | Use class | Verdict |
|---|---|---|---|
| trailofbits/skills | 5,107 | Trail-of-Bits security skills catalog | 📚 CITE-CATALOG only (CC-BY-SA = cite-only, no fork-modify-redistribute as eee-owned content) |
| florianbruniaux/claude-code-ultimate-guide | 4,273 | Guide / documentation | 📚 CITE-CATALOG only |

## Summary verdicts (22 restrictive-license repos)

| Verdict | Count | Architecture impact |
|---|---|---|
| ✅ ACCEPTABLE for CLI-binary-use | 8 (firecrawl, trufflehog, shellcheck, golangci-lint, hadolint, semgrep, eza, tflint) | install-able if needed; eee has firecrawl + eza |
| 🔬 STUDY-PILOT | 2 (megalinter, context-engineering-kit) | future-fire candidates |
| 📚 CITE-CATALOG only | 2 (trailofbits/skills, claude-code-ultimate-guide) | reference-only |
| ⚠️ N/A competing harness | 4 (cherry-studio, claudecodeui, claude-squad, opencode) | not install candidates |
| ⚠️ DEFER stale/low/unclear | 6 (others) | revisit later or skip |

**No license-class crisis**: all 22 restrictive-license repos either:
- Use CLI-binary mode (ACCEPTABLE per SRA D1)
- Are competing harnesses (not install candidates)
- Are cite-catalog references
- Have stars/freshness concerns that DEFER them

## Comparison with Fire 8 Wave 102 audit lessons

Fire 8 file 09 cited Wave 102 over-applied REJECTs (trufflehog AGPL-3.0 over-applied
to CLI-binary-use). This Fire 11 D1 analysis CONFIRMS the SRA discipline:
- ✅ trufflehog AGPL-3.0 CLI-binary-use = ACCEPTABLE (Wave 102 REJECT was over-applied)
- ✅ FalkorDB SSPLv1 local Docker = ACCEPTABLE (per Wave 47 architecture-v2)
- ✅ context-mode ELv2 local plugin = ACCEPTABLE (eee already INSTALLED)
- ✅ Firecrawl AGPL-3.0 local CLI = ACCEPTABLE (eee already INSTALLED as MCP)

The SRA D1 use-class precision (rather than flat-license REJECT) is operationally correct.

## Permissive-majority context (for completeness)

| License class | Count | % |
|---|---|---|
| MIT | ~250+ | ~45% |
| Apache-2.0 | ~80+ | ~14% |
| **Permissive total** (MIT/Apache/BSD/CC0/Unlicense/ISC/MIT-0) | ~340-360 | ~62-65% |
| NOASSERTION/NONE (no LICENSE file) | ~120 | ~21% |
| Restrictive (AGPL/GPL/LGPL/EUPL/MPL/CC-BY-SA) | 22 | 3.96% |

**Operational implication**: 65% of 555 audited repos are CLEANLY install-class
via permissive licenses. ~21% need per-repo LICENSE clarification before install
(NOASSERTION = often Apache 2.0 or MIT with non-standard header). 4% restrictive
have nuanced use-class analysis above.

## Mia ladder advance

n=1090 → n=1102 (+12: 22 restrictive-license repos classified by use-class /
8 CLI-binary-use ACCEPTABLE verdicts / 2 STUDY-PILOT / 2 CITE-CATALOG / 4 N/A competing
harness / Wave 102 over-applied REJECT confirmation per SRA D1)
