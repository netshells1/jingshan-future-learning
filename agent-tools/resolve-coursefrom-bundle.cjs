// Resolves the bundle conflict by taking ours (HEAD) and applying the literal
// edits from the incoming branch (8e73744) that fix the "return to campus"
// origin-page restore after entering the auto demo.
const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '..', 'dist', 'assets', 'index-CEFoGbBQ.js');
const editsPath = path.join(__dirname, 'coursefrom-edits.json');
const EDITS = JSON.parse(fs.readFileSync(editsPath, 'utf8'));

let js = fs.readFileSync(jsPath, 'utf8');

for (const [oldS, newS] of EDITS) {
  const count = js.split(oldS).length - 1;
  if (count !== 1) throw new Error('expected exactly 1 occurrence, got ' + count + ' for: ' + oldS.slice(0, 70));
  js = js.replace(oldS, newS);
}

fs.writeFileSync(jsPath, js, 'utf8');
console.log('bundle resolved:', js.length, 'bytes');
