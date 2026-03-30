#!/usr/bin/env node
// CC4PMs Course Statusline
// Line 1: CC4PMs │ Model │ Lesson Name │ context bar
// Line 2: 📖 clickable reference links (when lesson is active)

const fs = require('fs');
const path = require('path');

// Read JSON from stdin
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const model = data.model?.display_name || 'Claude';
    const dir = data.workspace?.current_dir || process.cwd();
    const remaining = data.context_window?.remaining_percentage;

    // Context window display (shows USED percentage scaled to 80% limit)
    // Claude Code enforces an 80% context limit, so we scale to show 100% at that point
    let ctx = '';
    if (remaining != null) {
      const rem = Math.round(remaining);
      const rawUsed = Math.max(0, Math.min(100, 100 - rem));
      // Scale: 80% real usage = 100% displayed
      const used = Math.min(100, Math.round((rawUsed / 80) * 100));

      // Build progress bar (10 segments)
      const filled = Math.floor(used / 10);
      const bar = '█'.repeat(filled) + '░'.repeat(10 - filled);

      // Color based on scaled usage
      if (used < 63) {
        ctx = ` \x1b[32m${bar} ${used}%\x1b[0m`;
      } else if (used < 81) {
        ctx = ` \x1b[33m${bar} ${used}%\x1b[0m`;
      } else if (used < 95) {
        ctx = ` \x1b[38;5;208m${bar} ${used}%\x1b[0m`;
      } else {
        ctx = ` \x1b[5;31m💀 ${bar} ${used}%\x1b[0m`;
      }
    }

    // Read lesson progress file
    let lesson = null;
    const progressFile = path.join(dir, '.claude', 'cc4pms-progress.json');
    if (fs.existsSync(progressFile)) {
      try {
        lesson = JSON.parse(fs.readFileSync(progressFile, 'utf8'));
      } catch (e) {}
    }

    // Build line 1
    let line1 = `🥞 \x1b[38;2;252;196;3mCC4PMs\x1b[0m │ \x1b[2m${model}\x1b[0m`;
    if (lesson && lesson.lesson_name) {
      line1 += ` │ \x1b[1m${lesson.module} ${lesson.lesson}: ${lesson.lesson_name}\x1b[0m`;
    }
    line1 += ` │${ctx}`;

    // Build line 2 — clickable reference links
    let line2 = '';
    if (lesson && lesson.reference_pages && lesson.reference_pages.length > 0) {
      // TODO: remove hardcoded path — this is for testing only
      const refSiteDir = '/Users/lobsta/Documents/Coding Projects/cc4pms-mastery-course/.claude/skills/reference/site';
      const links = lesson.reference_pages.map(page => {
        const filePath = path.join(refSiteDir, page.path);
        const fileUrl = `file://${filePath}`;
        // OSC 8 hyperlink: \e]8;;URL\e\\TEXT\e]8;;\e\\
        return `\x1b]8;;${fileUrl}\x07\x1b[36m${page.name}\x1b[0m\x1b]8;;\x07`;
      });
      line2 = `\n\x1b[2m📖 ${links.join(' · ')}\x1b[0m`;
    }

    process.stdout.write(line1 + line2);
  } catch (e) {
    // Silent fail
  }
});
