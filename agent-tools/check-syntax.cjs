// Syntax helper.
//   node agent-tools/check-syntax.cjs                  -> checks the generated
//                                                        spaces component against
//                                                        a React stub
//   node agent-tools/check-syntax.cjs <bundle.js>      -> checks a bundle file as
//                                                        an ES module
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');
const os = require('os');

const target = process.argv[2];
if (target) {
  const tmp = path.join(os.tmpdir(), 'bundle-check-' + Date.now() + '.mjs');
  fs.writeFileSync(tmp, fs.readFileSync(target, 'utf8'), 'utf8');
  try {
    execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
    console.log('syntax OK:', target);
  } catch (e) {
    console.log('ERROR:', target, (e.stderr || '').toString());
    process.exitCode = 1;
  } finally {
    fs.unlinkSync(tmp);
  }
} else {
  const s = fs.readFileSync(__dirname + '/spaces-component.js.txt', 'utf8');
  const stub = 'var l={useState:()=>[0,()=>{}],useRef:()=>({current:null}),useEffect:()=>{},jsx:()=>null,jsxs:()=>null};'
    + 'var _={jsx:()=>null,jsxs:()=>null};var R={};var tt="";var w=()=>({t:()=>"",customized:false});'
    + 'var E=()=>null,D=()=>null,ve=()=>null;';
  const full = stub + s;
  try { new vm.Script(full, { filename: 'c.js' }); console.log('OK'); }
  catch (e) {
    const stack = e.stack.split('\n');
    const srcIdx = stack.findIndex((l) => l.startsWith('c.js:1'));
    const caretLine = stack[srcIdx + 2] || '';
    const col = caretLine.indexOf('^');
    console.log('col', col, 'of full length', full.length);
    console.log('char at col:', JSON.stringify(full[col]));
    console.log('context:', JSON.stringify(full.slice(Math.max(0, col - 120), col + 60)));
    process.exitCode = 1;
  }
}
