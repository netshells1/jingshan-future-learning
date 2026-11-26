const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');

// 1) rename the generated component function
const genPath = path.join(__dirname, 'gen-spaces-component.cjs');
let gen = fs.readFileSync(genPath, 'utf8');
gen = gen.replace("const out = 'function vt(){'", "const out = 'function spacesPanel(){'");
gen = gen.replace("fs.writeFileSync(outPath, out, 'utf8');", "if (!/function spacesPanel\\(\\)/.test(out)) throw new Error('rename failed');\nfs.writeFileSync(outPath, out, 'utf8');");
fs.writeFileSync(genPath, gen, 'utf8');
console.log('generator updated');

// 2) update the applier to use spacesPanel
const applyPath = path.join(__dirname, 'apply-spaces.cjs');
let apply = fs.readFileSync(applyPath, 'utf8');
apply = apply.replace("'(0,_.jsx)(vt,{})'", "'(0,_.jsx)(spacesPanel,{})'");
if (!apply.includes('spacesPanel')) throw new Error('applier update failed');
fs.writeFileSync(applyPath, apply, 'utf8');
console.log('applier updated');

// 3) update verifier
const verPath = path.join(__dirname, 'verify-spaces.cjs');
let ver = fs.readFileSync(verPath, 'utf8');
ver = ver.replace("/function vt\\(\\)\\{let\\{customized:e\\}=w\\(`campus\\.spaces`\\)/", "/function spacesPanel\\(\\)\\{let\\{customized:e\\}=w\\(`campus\\.spaces`\\)/");
ver = ver.replace("/\\(0,_\\.jsx\\)\\(vt,\\{\\}\\)/", "/\\(0,_\\.jsx\\)\\(spacesPanel,\\{\\}\\)/");
fs.writeFileSync(verPath, ver, 'utf8');
console.log('verifier updated');
