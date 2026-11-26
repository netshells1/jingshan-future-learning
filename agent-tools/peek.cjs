const fs = require('fs');
const js = fs.readFileSync('dist/assets/index-CEFoGbBQ.js', 'utf8');
const i = js.indexOf('history.replaceState(null,``,`#/${e.chapter}`)');
console.log(js.slice(Math.max(0, i - 3000), i + 500));
