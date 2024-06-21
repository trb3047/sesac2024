//const interval = setInterval(fn, 1000);

let timer = 0;
function fn () {
    if(++timer === 10) clearInterval(interval);
    console.log(timer);
}

setTimeout(() => console.log('setTimeout', new Date()));
setImmediate(() => console.log('setImmediate', new Date()));
process.nextTick(() => console.log('nextTick'));

// import fs from 'fs'; // ESM
const fs = require('fs'); // CJS
fs.readFile('aaa.js', result => {
  setTimeout(() => {
    console.log('setTimeout22');
  }, 0);

  setImmediate(() => {
    console.log('setImmediate22');
  });
  process.nextTick(() => console.log('nextTick22'));
});

console.log(fs);


