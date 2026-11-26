const fs = require('fs');
const vm = require('vm');
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
}
