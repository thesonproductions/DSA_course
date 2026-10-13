const fs = require('fs');
const text = fs.readFileSync('D:/HUS_course/DSA_course/lab04/dsa_queue_slides.html','utf8');
const match = text.match(/<script>([\s\S]*?)<\/script>/);
if (!match) throw Error('missing script');
new Function(match[1]);
const sections = (text.match(/<section class="slide/g)||[]).length;
const ids = [...text.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
const refs = [...match[1].matchAll(/(?:set|document\.getElementById)\("([^"]+)"/g)].map(m=>m[1]);
const missing = [...new Set(refs)].filter(x=>!ids.includes(x));
console.log(JSON.stringify({syntax:"OK",sections,ids:ids.length,missing,bytes:Buffer.byteLength(text)},null,2));
if(missing.length) process.exitCode=1;
try { require.resolve('playwright'); console.log('PLAYWRIGHT_AVAILABLE'); } catch(e){console.log('NO_PLAYWRIGHT');}
