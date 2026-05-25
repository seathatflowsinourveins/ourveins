# W298 Codex R1 Adversarial Review
**Verdict**: REVISE
**Date**: 2026-05-18
**Reviewer**: GPT-5.5 codex r1

## Summary
REVISE. I found 0 CRITICAL, 1 HIGH, 5 MEDIUM, 3 LOW, and 5 INFO findings. The blocker for approval is a HIGH-severity cite/version error: the synthesis and Stream E attribute the plugin Stop/UserPromptSubmit cache-cleanup fix to Claude Code 2.1.137 and imply `minimumVersion: 2.1.137` also covers `MCP_TOOL_TIMEOUT`; the official current changelog places the hook fix under 2.1.136 and the MCP timeout fix under 2.1.142. No cardinal-rule violation warrants BLOCK.

## Findings by Question

### Q1. Silent-Failure Category Coverage
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| INFO | `W298-AUDIT-2026-05-18.md` | 52-65 | No material double-count found. The listed categories are mostly distinct root causes: basic-memory log sync loop, version-gated MCP timeout enforcement, PreCompact swallow, Fact-Forcing disable drift, Bash `$_` expansion, Stop hook fork failures, codex lock files, plugin registry orphans, NSSM log redirect, codex cache edits, empty skills, and SDK drift. | None. | 0.80 |
| MEDIUM | `W298-STREAM-G-SILENT-FAILURE-SWEEP.md`; `W298-AUDIT-2026-05-18.md` | G:25-30,382; Audit:52-65 | Coverage is incomplete relative to "hunt all silent fallback." Stream G says it bucketed 342 `is_error=true` results into 21 categories, but synthesis section 3 lists only 12 and omits at least: skill invocation disabled by `disable-model-invocation`, 38 cancelled parallel tool calls, 77 Edit sequencing errors, PreToolUse `${CLAUDE_PLUGIN_ROOT}` path failure, and context-mode advisory messages emitted as `is_error=true`. | Rename section 3 to "top/prioritized silent-failure ledger" or add a second table for the omitted Stream G categories with backlog ownership. | 0.90 |

### Q2. Stream A Reclassifications Validity
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| INFO | `W298-STREAM-A-ORCHESTRATION-FORENSICS.md` | 40-43,219-229 | Reclassification (a), Bash `$_` expansion rather than MSYS path conversion, is supported by Stream A's reproduction and root-cause explanation. | Keep the reclassification. | 0.85 |
| MEDIUM | `W298-STREAM-A-ORCHESTRATION-FORENSICS.md`; official hooks docs | A:141-149,156-159; `https://code.claude.com/docs/en/hooks`:662-674 | Reclassification (b) is directionally right that non-zero hook exits can be non-blocking, but the exact "status code: 0 is an empty-stderr placeholder" claim is not verified in the current official hooks page. Current docs say stderr's first line is shown and non-2 exits are non-blocking for most events; they do not document the literal `Failed with non-blocking status code: {stderr}` placeholder behavior. | Reword to: "non-blocking hook failure UX is documented; the specific `status code: 0` rendering is observed/historical and should be attributed to local wrapper behavior unless verified against the exact Claude Code version." | 0.75 |
| INFO | `W298-STREAM-A-ORCHESTRATION-FORENSICS.md` | 84-89,98-102,180-186,295-301 | Reclassification (c), Stop `EUNKNOWN`/cygheap real but burst/intermittent and absent from sub-agent `.output`, is supported as a historical/non-deterministic issue. Stream A is honest that frequency remains uncharted. | Keep, but preserve the confidence caveat. | 0.70 |

### Q3. Docker-Pivot Soundness
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| INFO | `W298-AUDIT-2026-05-18.md`; `W298-STREAM-C-NSSM-VS-SOTA-SUPERVISOR.md`; Docker docs | Audit:109-124; C:154-165,238-254; Docker:897-909 | The hybrid recommendation is mostly sound: Stream C already treats containers as an architecturally different supervisor with better observability but high GPU migration blast radius, and Docker docs verify Windows GPU support requires WSL2 backend plus NVIDIA/driver/kernel prerequisites. Keeping NSSM for GPU-heavy services while piloting Docker on CPU-only CogneeMCP is a reasonable coordinator pivot. | Keep the hybrid decision. | 0.75 |
| LOW | `W298-AUDIT-2026-05-18.md` | 111,124 | The broad claim "Docker is the SOTA paradigm in 2026" and the RAM/autostart details are under-cited in the synthesis itself. Docker GPU docs support WSL2/NVIDIA setup friction, not the entire "every modern AI stack" or "2-4GB WSL baseline RAM" claim. | Either cite a CNCF/Docker/AI-stack source for the broad claim and a local measurement for RAM, or narrow the language to the evidence actually checked. | 0.65 |

### Q4. Operator-Action Queue 7-Cap Discipline
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| MEDIUM | `W298-AUDIT-2026-05-18.md` | 135-143,149-153 | The main queue has 7 rows, but row 7 is the codex r1 review being performed by this file, not a substantive operator remediation. This leaves 6 substantive operator actions in the cap and pushes still-active silent-failure remediation (`Fact-Forcing Gate`, Stop hook fork reduction, LlamaSwap stdout/stderr) to backlog. | After this r1 lands, remove row 7 and promote a substantive unresolved silent-failure action, preferably Fact-Forcing ownership or Stop hook fork-burden reduction. | 0.85 |

### Q5. Cardinal-Rule Self-Checks
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| INFO | `CLAUDE.md`; `W298-STREAM-G-SILENT-FAILURE-SWEEP.md`; `W298-STREAM-D-OFFICIAL-SDK-PRACTICE-GAP.md`; `W298-STREAM-C-NSSM-VS-SOTA-SUPERVISOR.md` | CLAUDE:18-19; G:132-155; D:83-89; C:258-267 | No R-rule breach found in the three spot-checks. `.bmignore += *.log` is basic-memory config, not a self-invented hook. `pip install -U claude-agent-sdk` targets a first-party SDK but should be version-bounded as Stream D recommends. `nssm set LlamaSwap AppStdout/AppStderr` changes NSSM service config, not `settings.json:hooks`. | Keep the fixes, with version-bounded SDK command. | 0.80 |
| LOW | `W298-AUDIT-2026-05-18.md`; `W298-STREAM-G-SILENT-FAILURE-SWEEP.md` | Audit:54,137; G:132-155 | Path inconsistency: synthesis alternates `Z:/claude-sota-installed-state/basic-memory/.bmignore` and "equivalent per config.json," while Stream G's evidence points to `Z:/claude-sota-installed-state/basic-memory/config/.bmignore`. Wrong target path would make the one-line fix ineffective. | Replace the primary path with `Z:/claude-sota-installed-state/basic-memory/config/.bmignore`; mention config.json only as verification source. | 0.70 |

### Q6. Cite-Trail Completeness
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| HIGH | `W298-AUDIT-2026-05-18.md`; `W298-STREAM-E-PLUGIN-CACHE-AND-VERSION-DRIFT.md`; official changelog | Audit:139,198-207; E:119-129,159-168; `https://code.claude.com/docs/en/release-notes` 404; `https://code.claude.com/docs/en/changelog`:402-410,568-586 | The release-note cite is wrong and the version claim is false. `code.claude.com/docs/en/release-notes` returns Page Not Found; the official page is `/changelog`. On that page, 2.1.137 only lists a VS Code Windows activation fix, while the plugin Stop/UserPromptSubmit cache-cleanup fix is under 2.1.136. Separately, `MCP_TOOL_TIMEOUT` enforcement is fixed in 2.1.142, so `minimumVersion: 2.1.137` is not "lowest version with Stop-hook race fix + MCP_TOOL_TIMEOUT enforcement." | Update cite to `https://code.claude.com/docs/en/changelog`. Change the minimumVersion recommendation to 2.1.142 if MCP timeout enforcement is a hard floor; otherwise split: 2.1.136 for hook-cache fix, 2.1.142 for MCP timeout. Fix row #3 and all 2.1.137 wording. | 0.98 |
| INFO | `W298-AUDIT-2026-05-18.md`; Docker docs | Audit:207; `https://docs.docker.com/desktop/features/gpu/`:897-909 | Docker GPU URL exists and supports the GPU-friction claim at the level of WSL2 backend plus NVIDIA GPU, drivers, WSL kernel, and Docker Desktop backend prerequisites. | Keep Docker URL; add a separate cite if retaining RAM/autostart specifics. | 0.90 |

### Q7. Anti-Bias Evidence Proof
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| INFO | `W298-AUDIT-2026-05-18.md`; `W298-STREAM-A-ORCHESTRATION-FORENSICS.md` | Audit:40,48,211-212; A:292-301 | Counting Stream A as CHANGE is defensible because the reclassifications materially changed the W298 plan's failure model. It is coordinator-assigned rather than a formal Stream A rubric verdict. | Add "coordinator-assigned CHANGE" if precision is desired. | 0.70 |
| MEDIUM | `W298-AUDIT-2026-05-18.md`; `W298-STREAM-G-SILENT-FAILURE-SWEEP.md` | Audit:213; G:317-343 | The claim that Stream G's 1612-error find was "completely undetected by B/C/D/E/F" is true operationally but weak anti-bias evidence, because Stream G itself says basic-memory side-channel logs were genuinely outside other stream scopes. This is a complement-scope discovery, not a fair missed-by-peers triangulation. | Reword to: "Stream G found a side-channel state-dir failure intentionally outside B/C/D/E/F scope." | 0.85 |
| LOW | `W298-AUDIT-2026-05-18.md`; `W298-STREAM-B-SOTA-REPO-AUDIT.md` | Audit:218; B:198-201,499-531 | "Universal-REJECT triggers checked" is fully supported for mattpocock/skills, but only partially supported for the three wshobson ENABLE-NOW candidates: `security-scanning` has explicit D7/D10/D15/D18 scores, while `git-pr-workflows` and `c4-architecture` get abbreviated clearance without explicit D7/D10/D15/D18 rows. | Change to "checked explicitly for mattpocock and security-scanning; abbreviated sanity check for git-pr-workflows/c4-architecture found no hard-cap signal." | 0.65 |

### Q8. Cross-Stream Contradiction Check
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| INFO | `W298-AUDIT-2026-05-18.md`; `W298-STREAM-C-NSSM-VS-SOTA-SUPERVISOR.md` | Audit:106-124; C:246-254 | Stream C's WinSW pilot and synthesis's Docker-for-CPU pivot are not an unresolved contradiction because the synthesis explicitly supersedes Stream C after an operator Docker-vs-NSSM reframe. | Keep, but label it as "coordinator override" rather than "Stream C canonical." | 0.70 |
| INFO | `W298-STREAM-B-SOTA-REPO-AUDIT.md`; `W298-STREAM-E-PLUGIN-CACHE-AND-VERSION-DRIFT.md` | B:556-558; E:54-65 | Stream B and E both touch `.claude/settings.json:enabledPlugins`, but not the same keys. B adds three wshobson plugins; E deletes four stale false keys. No semantic conflict found. | Batch the settings edit to reduce operator churn and re-run `/diagnose`. | 0.80 |

### Q9. Operator's Fact-Forcing Gate Mystery
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| MEDIUM | `W298-STREAM-G-SILENT-FAILURE-SWEEP.md`; `W298-AUDIT-2026-05-18.md` | G:51-55,274,288,348-350; Audit:57,152 | The Fact-Forcing disable mystery is surfaced but not owned in the ship set. Stream G routes it to Stream A, but the synthesis only places it in backlog B4 while row 7 is meta-review. That leaves an env-disable-not-honored hook failure across 26 sessions unresolved before ship. | Promote Fact-Forcing investigation into the main queue after removing the now-consumed codex r1 row. Minimal first action: grep plugin cache for `Fact-Forcing Gate`, identify emitter, and verify whether `ECC_DISABLED_HOOKS` is the right disable contract. | 0.90 |

### Q10. Ship-Blocking Criteria
| Severity | File | Line range | Finding | Proposed fix | True-bug-probability |
|---|---|---:|---|---|---:|
| INFO | This review | all | Criteria applied: at least one HIGH false claim found, no CRITICAL cardinal-rule breach found. Verdict is REVISE, not BLOCK. | Apply HIGH fix in Q6, then rerun/append r1.1 if desired. | 1.00 |

## Verdict Justification
REVISE is required by Q6. The specific HIGH finding is:

- Q6: `minimumVersion: 2.1.137` is falsely described as the lowest version covering both the Stop/UserPromptSubmit hook-cache fix and `MCP_TOOL_TIMEOUT` enforcement. Official current evidence places the hook fix at 2.1.136 and MCP timeout fix at 2.1.142; the cited `/release-notes` URL is also 404.

No BLOCK: the reviewed proposed fixes do not violate cardinal rules R1/R2/R4/R5 or W286 P0C MCP pinning in a CRITICAL way.

## Ship-Cleared Actions (if APPROVE or APPROVE-WITH-MINOR-NOTES)
Not applicable. Verdict is REVISE.
