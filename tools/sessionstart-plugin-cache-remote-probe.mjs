#!/usr/bin/env node
// W330-C SessionStart hook — plugin-cache CR-1 sentinel (read-only).
// Cite: CR-1 https://code.claude.com/docs/en/plugins ;
//       CR-2 sanctioned-shim ≤2KB exception per CLAUDE.md cardinal-rule-2 ;
//       Anchor: W329-E §1+§10 (cache-remote absence violation).
// Output: hookSpecificOutput per docs.anthropic.com/.../hooks.
// Errors are swallowed; SessionStart MUST NOT fail (would kill session).
import { execSync } from 'node:child_process';
import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const R = process.env.CLAUDE_PROJECT_DIR
  || process.env.CLAUDE_CONFIG_DIR?.replace(/[\\/]\.claude$/, '') || process.cwd();
const C = join(R, '.claude', 'plugins', 'cache');
const w = [];
try {
  if (existsSync(C)) for (const v of readdirSync(C)) {
    try { for (const p of readdirSync(join(C, v))) {
      try { for (const ver of readdirSync(join(C, v, p))) {
        const d = join(C, v, p, ver);
        if (!existsSync(join(d, '.git'))) continue;
        let r = '';
        try { r = execSync(`git -C "${d}" remote -v`, {encoding:'utf8',timeout:2000}).trim(); } catch {}
        if (!r) w.push(`[W330-C] ${v}/${p}/${ver}: NO git remote`);
        else if (!/origin\s/.test(r)) w.push(`[W330-C] ${v}/${p}/${ver}: no origin`);
      } } catch {}
    } } catch {}
  }
} catch {}
const ac = w.length
  ? `Plugin-cache CR-1 sentinel: ${w.length} warning(s)\n${w.join('\n')}\nRemediate: cache-delete + /plugin install per W330-C deliverable.`
  : '';
process.stdout.write(JSON.stringify({
  hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: ac }
}));
process.exit(0);
