import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\vidhi\\.gemini\\antigravity-ide\\brain\\bd019d80-5f31-4ec0-9da1-2fc9ef098875';
const destDir = 'c:\\Users\\vidhi\\Downloads\\ai-marriage-web\\KJGSPL-Ai--Marriage-Website\\public\\assets';

const files = [
  { src: 'couple_dating_casual_1789993066815.jpg', dest: 'pitfall-casual-intent.jpg' },
  { src: 'couple_shallow_swipe_1789993121310.jpg', dest: 'pitfall-speed-swipe.jpg' },
  { src: 'couple_values_clash_1789993144905.jpg', dest: 'pitfall-value-clash.jpg' },
  { src: 'couple_privacy_worry_1789993164047.jpg', dest: 'pitfall-privacy-worry.jpg' },
  { src: 'solution_verified_intent_1789992603393.jpg', dest: 'solution-verified-intent.jpg' },
  { src: 'solution_shared_horizon_1789992646759.jpg', dest: 'solution-shared-horizon.jpg' }
];

files.forEach(f => {
  const srcPath = path.join(brainDir, f.src);
  const destPath = path.join(destDir, f.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} -> ${f.dest}`);
  } else {
    console.log(`Not found: ${srcPath}`);
  }
});
