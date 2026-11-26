const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

// Update the applier to also bump the campus page count 5 -> 6
const applyPath = path.join(__dirname, 'apply-spaces.cjs');
let apply = fs.readFileSync(applyPath, 'utf8');

const marker = "// E. re-embed registries";
const insert = `// D2. chapter page counts: campus gains the new 空间场景 page (5 -> 6)
const urOld = 'var ur=[5,5,3,8]';
must(urOld, 'chapter page counts');
js = js.replace(urOld, 'var ur=[5,6,3,8]');

`;
if (!apply.includes('D2. chapter page counts')) {
  apply = apply.replace(marker, insert + marker);
  fs.writeFileSync(applyPath, apply, 'utf8');
  console.log('applier: page-count patch added');
}

// Update verifier
const verPath = path.join(__dirname, 'verify-spaces.cjs');
let ver = fs.readFileSync(verPath, 'utf8');
if (!ver.includes('chapter page counts bumped')) {
  ver = ver.replace(
    "checks.push(['no stray vt panel', !js.includes('(0,_.jsx)(vt,{})')]);",
    "checks.push(['no stray vt panel', !js.includes('(0,_.jsx)(vt,{})')]);\nchecks.push(['chapter page counts bumped', js.includes('var ur=[5,6,3,8]')]);"
  );
  fs.writeFileSync(verPath, ver, 'utf8');
  console.log('verifier: page-count check added');
}
