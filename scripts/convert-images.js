#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { paths: ['src/assets'], quality: 80, dryRun: false };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--path' || a === '-p') {
      i++; if (!args[i]) continue;
      opts.paths = args[i].split(',').map(s => s.trim());
    } else if (a === '--quality' || a === '-q') {
      i++; opts.quality = parseInt(args[i], 10) || 80;
    } else if (a === '--dry' || a === '--dry-run') {
      opts.dryRun = true;
    }
  }
  return opts;
}

async function walk(dir, cb) {
  let entries;
  try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch (err) { return; }
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) await walk(full, cb);
    else if (ent.isFile()) await cb(full);
  }
}

function isImage(file) {
  return /\.(jpe?g|png)$/i.test(file);
}

async function ensureDir(dir) {
  try { await fs.mkdir(dir, { recursive: true }); } catch (err) { }
}

async function convertFile(file, quality, dryRun) {
  const ext = path.extname(file);
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    // skip if webp exists and newer than source
    try {
      const [s, t] = await Promise.all([fs.stat(file), fs.stat(out)]);
      if (t.mtimeMs >= s.mtimeMs) {
        console.log(`Skipping (exists up-to-date): ${out}`);
        return;
      }
    } catch (e) {
      // out may not exist
    }

    console.log(`${dryRun ? '[DRY] ' : ''}Converting: ${file} -> ${out}`);
    if (dryRun) return;
    await ensureDir(path.dirname(out));
    await sharp(file)
      .webp({ quality })
      .toFile(out);
  } catch (err) {
    console.error(`Failed to convert ${file}:`, err.message || err);
  }
}

async function main() {
  const opts = parseArgs();
  console.log('Image conversion options:', opts);
  for (const p of opts.paths) {
    const base = path.resolve(p);
    await walk(base, async (file) => {
      if (isImage(file)) await convertFile(file, opts.quality, opts.dryRun);
    });
  }
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
