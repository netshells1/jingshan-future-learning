// Balanced-paren checker that understands template literals with ${} nesting.
const fs = require('fs');
const s = fs.readFileSync(__dirname + '/spaces-component.js.txt', 'utf8');

let depth = 0;
const stack = [];
let i = 0;
const tmplStack = [];   // depths at which we entered a template ${ }
let inTmpl = false;

while (i < s.length) {
  const c = s[i];
  if (inTmpl) {
    if (c === '\\') { i += 2; continue; }
    if (c === '`') { inTmpl = false; i++; continue; }
    if (c === '$' && s[i + 1] === '{') {
      tmplStack.push(depth);
      depth++;
      stack.push({ ch: '{', at: i, tmpl: true });
      i += 2;
      continue;
    }
    if (c === '}') {
      // closes a template ${...} expression -> back to template-literal mode
      const top = stack.pop();
      depth--;
      inTmpl = true;
      i++;
      continue;
    }
    i++; continue;
  }
  if (c === '`') { inTmpl = true; i++; continue; }
  if (c === '"' || c === "'") {
    const q = c; i++;
    while (i < s.length) {
      if (s[i] === '\\') { i += 2; continue; }
      if (s[i] === q) { i++; break; }
      i++;
    }
    continue;
  }
  if (c === '(' || c === '[' || c === '{') { depth++; stack.push({ ch: c, at: i }); i++; continue; }
  if (c === ')' || c === ']' || c === '}') {
    depth--; stack.pop(); i++; continue;
  }
  i++;
}
console.log('final depth:', depth);
if (stack.length) {
  console.log('UNCLOSED openers:');
  for (const o of stack) console.log('  ', o.ch, 'at', o.at, JSON.stringify(s.slice(o.at, o.at + 90)));
}
