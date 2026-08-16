#!/usr/bin/env node
/**
 * A0 SinglePass 编译器
 * 从 PerfectVideo md 交付物的 prompts.primary 自动编译 single_pass prompt
 *
 * [INPUT]: md 文件路径（如 outputs/cliff_fall_10s.md）
 * [OUTPUT]: *_single_pass.txt 文件（如 outputs/cliff_fall_single_pass.txt）
 * [POS]: PerfectVideo A0 编译工具，消除手动编译的信息丢失风险
 * [PROTOCOL]: 变更时更新此头部，然后检查 compile-modes.md §A0
 *
 * 用法: node compile-single-pass.js <md文件路径>
 * 示例: node compile-single-pass.js outputs/cliff_fall_10s.md
 */

const fs = require('fs');

function parseSections(text) {
  const sections = [];
  const lines = text.split('\n');
  let title = null, body = [];
  for (const line of lines) {
    const m = line.match(/^【([^】]+)】(.*)/);
    if (m) {
      if (title) sections.push({ title, body: body.join('\n').trim() });
      title = m[1];
      body = m[2] ? [m[2]] : [];
    } else if (title) {
      body.push(line);
    }
  }
  if (title) sections.push({ title, body: body.join('\n').trim() });
  return sections;
}

function extractPrimary(md) {
  const m = md.match(/## \d*\.?\s*prompts\.primary[^`]*```(?:text)?\n([\s\S]*?)```/);
  if (!m) throw new Error('未找到 prompts.primary 代码块（## prompts.primary 后的代码块）');
  return m[1].trim();
}

function classifySections(sections) {
  const find = (kws) => sections.find(s => kws.every(k => s.title.includes(k)));
  return {
    material: sections.find(s => s.title.includes('材质宪法')),
    slots: sections.find(s => s.title.includes('槽位')),
    shots: sections.filter(s => /\d+:\d+-\d+:\d+.*拍/.test(s.title)),
    camera: sections.find(s => s.title.includes('运镜')),
    light: find(['光', '相位']),
    openEnd: sections.find(s => s.title.includes('开场') || s.title.includes('终场')),
  };
}

function annotateSlot(line) {
  const trimmed = line.trim();
  if (trimmed.includes('不采用') || trimmed.includes('不使用')) return trimmed;
  const name = trimmed.match(/^@(\S+)/)?.[1] || '';
  let decl = '用于外貌/服装，不采用图片背景。';
  if (/树|刀|剑|枪|武器|道具|枝|物/.test(name)) decl = '用于外观，不采用图片背景。';
  else if (/崖|屋|楼|街|环境|场景|天空|海|山|谷|林|竹|城/.test(name)) decl = '用于空间/光线，不采用图中人物。';
  return `${trimmed}。${decl}`;
}

function convertSound(text) {
  return text.replace(/声[：:]\s*(.+?)(?=\n|$|。)/g, (_, content) => {
    const items = content.split(/\s*\+\s*/).map(s => s.trim()).filter(Boolean);
    return items.map(p => `<${p}>`).join(' ');
  });
}

function extractSpeedArc(primary, camera) {
  const m1 = primary.match(/速度弧线[：:]\s*(.+?)(?=\n|$)/);
  if (m1) return m1[1].trim();
  if (camera) {
    const m2 = camera.body.match(/速度弧线[：:]\s*(.+?)(?=\n|$)/);
    if (m2) return m2[1].trim();
  }
  return null;
}

function buildTimeline(shots) {
  return shots.map(shot => {
    const timeCode = shot.title.match(/(\d+:\d+-\d+:\d+)/)?.[1] || shot.title;
    const shotNum = shot.title.match(/拍(\d+)/)?.[1] || '';
    const label = shotNum ? `[${timeCode} 拍${shotNum}]` : `[${timeCode}]`;
    return `${label} ${convertSound(shot.body)}`;
  }).join('\n');
}

function auditDimensions(c) {
  const dims = {
    timecode: c.shots.length > 0,
    camera: !!c.camera,
    sound: c.shots.some(s => s.body.includes('声') || s.body.includes('<')),
    microMotion: c.shots.some(s => /rack|微|细节/.test(s.body)),
    light: !!c.light,
    material: !!c.material,
    openEnd: !!c.openEnd,
  };
  const missing = Object.entries(dims).filter(([, v]) => !v).map(([k]) => k);
  return { dims, missing };
}

function assembleParts(c, primary) {
  const parts = [];
  const warn = (name) => console.error(`\u26a0 \u7f3a\u5931\uff1a${name}`);

  if (c.material) parts.push(`\u3010\u6750\u8d28\u5baa\u6cd5\u3011${c.material.body}`);
  else warn('\u6750\u8d28\u5baa\u6cd5');

  if (c.slots) {
    const lines = c.slots.body.split('\n').filter(l => l.trim().startsWith('@'));
    parts.push(`\u3010\u69fd\u4f4d\u7ed1\u5b9a\u3011\n${lines.map(annotateSlot).join('\n')}`);
  } else warn('\u69fd\u4f4d\u7ed1\u5b9a');

  parts.push(buildTimeline(c.shots));

  if (c.camera) parts.push(`\u3010\u8fd0\u955c\u3011${c.camera.body.replace(/\n/g, ' ')}`);
  else warn('\u8fd0\u955c');

  if (c.light) parts.push(`\u3010\u5149\u76f8\u4f4d\u3011${c.light.body.replace(/\n/g, ' ')}`);
  else warn('\u5149\u76f8\u4f4d');

  if (c.openEnd) parts.push(`\u3010\u5f00\u573a\u2194\u7ec8\u573a\u3011${c.openEnd.body.replace(/\n/g, ' ')}`);
  else warn('\u5f00\u573a\u2194\u7ec8\u573a');

  const speedArc = extractSpeedArc(primary, c.camera);
  if (speedArc) parts.push(`\u3010\u901f\u5ea6\u5f27\u7ebf\u3011${speedArc}(\u62cd${c.shots.length})`);
  else warn('\u901f\u5ea6\u5f27\u7ebf');

  return parts;
}

function compileSinglePass(mdPath) {
  const md = fs.readFileSync(mdPath, 'utf-8');
  const primary = extractPrimary(md);
  const c = classifySections(parseSections(primary));

  if (c.shots.length === 0) {
    throw new Error('prompts.primary \u4e2d\u672a\u627e\u5230\u5206\u62cd\u6bb5\uff08\u30100:00-0:01 \u62cdN\u3011\u683c\u5f0f\uff09\u3002\u8be5 md \u6587\u4ef6\u53ef\u80fd\u4f7f\u7528\u4e86\u975e\u6807\u51c6\u683c\u5f0f\uff08\u5982\u82f1\u6587\u53d9\u4e8b\uff09\uff0c\u9700\u5148\u91cd\u6784\u4e3a\u6807\u51c6 A+ \u9010\u62cd\u683c\u5f0f\u624d\u80fd\u7f16\u8bd1\u3002');
  }

  const { dims, missing } = auditDimensions(c);
  if (missing.length > 0) {
    console.error(`\u26a0 7\u7ef4\u6821\u9a8c\uff1a\u7f3a\u5931 ${missing.join(', ')}\uff08\u5df2\u7f16\u8bd1\u4f46\u8bf7\u68c0\u67e5\u6e90\u6587\u4ef6\uff09`);
  }

  const parts = assembleParts(c, primary);
  return { prompt: parts.join('\n\n'), dims, missing, shotCount: c.shots.length };
}

const mdPath = process.argv[2];
if (!mdPath) {
  console.error('\u7528\u6cd5: node compile-single-pass.js <md\u6587\u4ef6\u8def\u5f84>');
  console.error('\u793a\u4f8b: node compile-single-pass.js outputs/cliff_fall_10s.md');
  process.exit(1);
}
if (!fs.existsSync(mdPath)) {
  console.error(`\u2717 \u6587\u4ef6\u4e0d\u5b58\u5728: ${mdPath}`);
  process.exit(1);
}

const { prompt, dims, missing, shotCount } = compileSinglePass(mdPath);
const outputPath = mdPath.replace(/_10s\.md$/, '_single_pass.txt').replace(/\.md$/, '_single_pass.txt');
fs.writeFileSync(outputPath, prompt, 'utf-8');

const passed = Object.entries(dims).filter(([, v]) => v).map(([k]) => k).join('/');
console.log('\u2713 A0 SinglePass \u7f16\u8bd1\u5b8c\u6210');
console.log(`  \u8f93\u5165: ${mdPath}`);
console.log(`  \u8f93\u51fa: ${outputPath}`);
console.log(`  \u62cd\u6570: ${shotCount}`);
console.log(`  \u5b57\u7b26\u6570: ${prompt.length}`);
console.log(`  7\u7ef4: ${passed} ${missing.length > 0 ? `| \u7f3a\u5931: ${missing.join(',')}` : '| \u5168\u90e8\u901a\u8fc7'}`);
