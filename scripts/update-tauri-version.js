const fs = require('fs');
const path = require('path');

const version = process.argv[2];
if (!version) {
  console.error('Version argument is required');
  process.exit(1);
}

const tauriConfigPath = path.resolve(__dirname, '../src-tauri/tauri.conf.json');
const config = JSON.parse(fs.readFileSync(tauriConfigPath, 'utf-8'));

config.package.version = version;

fs.writeFileSync(tauriConfigPath, JSON.stringify(config, null, 2) + '\n');
console.log(`Tauri version updated to ${version}`);
