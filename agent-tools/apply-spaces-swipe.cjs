// Wires the embedded 空间场景 iframe to the campus deck.
//
// The standalone page cannot reach the deck's React state directly, so it
// posts a step request when the visitor scrolls past the first or the last
// scene. The deck then moves exactly one page forward or backward.
//
// Note: the panel used to forward raw arrow keys as synthetic KeyboardEvents.
// That double-fired with the app's global window-level key handler (which runs
// in the capture phase, before the deck's own handler) and jumped a whole
// chapter. The explicit step message replaces that path so exactly one thing
// happens per gesture.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const jsPath = path.join(root, 'dist', 'assets', 'index-CEFoGbBQ.js');

let js = fs.readFileSync(jsPath, 'utf8');

function must(source, needle, label) {
  const at = source.indexOf(needle);
  if (at < 0) throw new Error('NOT FOUND: ' + label);
  if (source.indexOf(needle, at + 1) >= 0) throw new Error('NOT UNIQUE: ' + label);
  return at;
}

// 1. The panel accepts a step callback and keeps it in a ref, so the message
//    listener does not need to be re-registered on every render.
const OLD_SIG = 'function spacesPanel(){let b=(0,l.useRef)(null);';
const NEW_SIG = 'function spacesPanel({onStep:e}){'
  + 'let b=(0,l.useRef)(null),'
  + 'm=(0,l.useRef)(e);'
  + '(0,l.useEffect)(()=>{m.current=e},[e]);';
const sigAt = must(js, OLD_SIG, 'spaces panel signature');
js = js.slice(0, sigAt) + NEW_SIG + js.slice(sigAt + OLD_SIG.length);

// 2. The message handler forwards the step request to the deck. The event
//    parameter is deliberately named `e` only inside the handler, so the
//    callback is read from the ref instead of a shadowed binding.
const OLD_HANDLER = 'let onMessage=e=>{'
  + 'if(e.origin!==location.origin||!e.data||e.data.type!==`jingshan:spaces-key`)return;'
  + 'let deck=t.closest(`[data-presentation-deck]`);'
  + 'if(!deck)return;'
  + 'deck.dispatchEvent(new KeyboardEvent(`keydown`,{key:e.data.key,bubbles:!0,cancelable:!0}))'
  + '};';

const NEW_HANDLER = 'let onMessage=e=>{'
  + 'if(e.origin!==location.origin||!e.data||e.data.type!==`jingshan:spaces-step`)return;'
  + 'if(typeof m.current==`function`)m.current(e.data.direction===1?1:-1);'
  + '};';

const handlerAt = must(js, OLD_HANDLER, 'spaces panel message handler');
js = js.slice(0, handlerAt) + NEW_HANDLER + js.slice(handlerAt + OLD_HANDLER.length);

// 3. The panel hands the campus deck a step function. It mirrors the deck's
//    own logic: inside the range it selects a page, at the edge it crosses
//    into the neighbouring chapter.
const OLD_USAGE = '(0,_.jsx)(spacesPanel,{})';
const NEW_USAGE = '(0,_.jsx)(spacesPanel,{onStep:x=>{'
  + 'let s=c+x;'
  + 's<0?r(-1):s>=it.length?r(1):d(s)'
  + '}})';
const usageAt = must(js, OLD_USAGE, 'spaces panel usage');
js = js.slice(0, usageAt) + NEW_USAGE + js.slice(usageAt + OLD_USAGE.length);

fs.writeFileSync(jsPath, js, 'utf8');
console.log('js updated:', js.length, 'bytes');
