const assert = require('assert');

// 다음 코드를 Promise를 이용하여 refactoring 하시오.
// setTimeout( function() {
//   console.log('depth1', new Date());
//   setTimeout( function() {
//     console.log('depth2', new Date());
//     setTimeout( function() {
//       console.log('depth3', new Date());
//       throw new Error('Already 3-depth!!');
//     }, 3000 );
//   }, 2000);
// }, 1000);

let timer = 0;
function depthTimer (delay) {
    timer = delay ?? timer + 1;
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(console.log(`depth${timer}`, new Date())); 
          }, timer * 1000);
    });
}

console.log('START!', new Date());
depthTimer(1).then(depthTimer).then(depthTimer).catch(err => console.log('already 3-depth!'))

//depthTimer(1).then(depthTimer).then(depthTimer).catch(err => console…

///////////////////////////////////////////////////////////////////////

//promiseAll 함수를 작성하시오 

const vals = [1, 2, 3];
const randTime = val =>
	new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));



async function promiseAll (arr) {
    const ret = [];
    let chk = false;
    for (let v of arr) {
        v.catch((err) => chk = true);
        if (chk) return new Promise((_, reject) => reject);
    }
    let num = 0;
    for await (let o of arr) ret[num++] = o;
    return ret;
}


promiseAll([randTime(1), randTime(2), randTime(3)]).then(arr => {
    console.table(arr);
    assert.deepStrictEqual(arr, vals);
}).catch(console.error);

promiseAll([randTime(11), Promise.reject('RRR'), randTime(33)])
.then(array => {
    console.log('여긴 과연 호출될까?!');
})
.catch(error => {
    console.log('reject!!!!!!>>', error);
});
