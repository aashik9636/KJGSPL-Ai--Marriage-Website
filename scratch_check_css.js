const fs = require('fs');
const path = require('path');

const chunkDir = 'out/_next/static/chunks';
const cssFiles = fs.readdirSync(chunkDir).filter(f => f.endsWith('.css'));

console.log('CSS Files found:', cssFiles);

const classesToTest = [
  'chat-box-header',
  'chat-avatar-wrapper',
  'chat-avatar-img',
  'chat-msg',
  'bento-control',
  'control-stage-grid',
  'control-toggles-col',
  'control-toggle-card',
  'bts-phone-matrix-showcase'
];

for (const f of cssFiles) {
  const content = fs.readFileSync(path.join(chunkDir, f), 'utf8');
  console.log(`\nChecking in ${f} (size: ${content.length} bytes):`);
  for (const cls of classesToTest) {
    const found = content.includes(cls);
    console.log(`  .${cls}: ${found ? 'FOUND' : 'MISSING'}`);
  }
}
