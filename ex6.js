// // 다음과 같은 push, pop, shift, unshift 를 순수 함수로 작성하시오.
// // (단, 입력값은 다음 예시로 한정함)
const assert = require('assert');
// // function push(array, …args) {}

function push (arr, ...args) {
    return [...arr, ...args];
}

function pop (arr, arg) {
    let ret = [];
    if(!arg) return arr[arr.length - 1];
    let length = arr.length - arg; 
    for (let i = 0; i < length; i += 1) ret[i] = arr[i];
    return ret;
}

function unshift (arr, ...args) {
    return [...args, ...arr];
}

function shift (arr, arg) {
    let ret = [];
    let num = 0;
    if(!arg) arg = 1;
    for (let i = 0; i < arr.length; i += 1) {
        if(i >= arg) ret[num++] = arr[i];
    }
    return ret;
}

const arr = [1, 2, 3, 4];

assert.deepStrictEqual(push(arr, 5, 6), [1, 2, 3, 4, 5, 6]); 
assert.deepStrictEqual(pop(arr), 4);
assert.deepStrictEqual(pop(arr, 2), [1, 2]);    // 2개 팝!
assert.deepStrictEqual(unshift(arr, 0), [0, 1, 2, 3, 4]);
assert.deepStrictEqual(unshift(arr, 7, 8), [7, 8, 1, 2, 3, 4]);
assert.deepStrictEqual(shift(arr), [2, 3, 4]); 
assert.deepStrictEqual(shift(arr, 2), [3, 4]);
assert.deepStrictEqual((arr),[1, 2, 3, 4]); 

// /////////////////////////////////////////////////////////

// // 다음과 같은 deleteArray를 순수 함수로 작성하시오.

function deleteArray (arr, ...args) {
    let ret = [];
    let num = 0;
    let typeChk = false;
    for (let v of args) {
        if(typeof(v) === 'string') typeChk = true;
        break;
    }
    if (typeChk) {
        let key = args[0];
        let val = args[1];
        arr.map((v) => {
            if (v[key] !== val) ret[num++] = v;
       });
    } else {
        let start = args[0] || 1;
        let end = args[1] || arr.length;
        for (let i = 0; i < arr.length; i += 1) {
            if(i < start || i >= end) ret[num++] = arr[i];
        }
    }
    return ret;
}

assert.deepStrictEqual(deleteArray(arr, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr, 1, 3), [1, 4]);
assert.deepStrictEqual(arr, [1, 2, 3, 4]);

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users, 1, 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'id', 2), [Hong, Lee]);
assert.deepStrictEqual(deleteArray(users, 'name', 'Lee'), [Hong, Kim]);

// /////////////////////////////////////////////////////////

// // 아래 users 배열에 대하여 추가/수정/삭제하는 순수 함수를 작성하시오.
const hong = { id: 1, name: 'Hong' };
const choi = { id: 5, name: 'Choi' };
const kim = { id: 2, name: 'kim' };
const lee = { id: 3, name: 'Lee' };
const park = { id: 4, name: 'Park' };
const users2 = [kim, lee, park]; // 오염되면 안됨!!

users2.addUser = function (obj) {
    return [...this, obj]
}

users2.removeUser = function (obj) {
    let ret = [];
    [...this].map((val) => { if (val.id !== obj.id) ret.push(val) });
    return ret;
}         

users2.changeUser = function (target, obj) {
    let ret = [];
    [...this].map((val) => { (val.id !== target.id) ? ret.push(val) : ret.push(obj); });
    return ret;
}

console.log(users2.addUser(hong)); // [kim, lee, park, hong]
console.log(users2.removeUser(lee));          // [kim, park]
console.log(users2.changeUser(kim, choi));   // [choi, lee, park]
// // (주의) Array.prototype 조작 금지!

console.log(users2);  

// ////////////////////////////////////////////////////////

// // ex1) 배열의 각 원소를 String으로 변환하시오.
const arr2 = [1, 2, 3, true];
const ret1 = arr2.map((val) => val.toString());
assert.deepStrictEqual(ret1, ['1', '2', '3', 'true']);

// ex2) 다음과 같이 작동하는 classNames 함수를 작성하시오.
const classNames = (...args) => {
    let ret = '';
    args.map((val) => {if (val !== '') ret += `${val} `});
    return ret.trim();
}; 
const ret2 = classNames('', 'a b c', 'd', '', 'e'); 
assert.strictEqual(ret2, 'a b c d e'); 
// // // 주의: ' a b c d  e'면 안됨!!

// /////////////////////////////////////////////////////////

// Array.reduce 함수를 고차 함수로 직접 구현하시오.
const reduce = (arr, fn, initValue) => {
    let ret = (initValue === 0) ? 0 : 1;
    for (let i = 0; i < arr.length; i += 1) {
        ret = fn(ret, arr[i]);
    }
    return ret;
}
reduce([1, 2, 3], (a, b) => a + b, 0);       // 6이면 통과!
// cf. [1,2,3].reduce((a,b) => a + b, 0);       // 6
reduce([1, 2, 3, 4, 5], (a, b) => a + b);    // 15면 통과!
reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1); // 120이면 통과!
reduce([2, 2, 2], (a, b) => a * b);          // 8이면 통과!
reduce([3, 3, 3], (a, b) => a * b, 0);       // 0이면 통과!

/////////////////////////////////////////////////////////

// 다음과 같은 정수 배열이 주어졌을 때, reduce를 이용하여, 각 요소를 다음의 순서로 처리하시오.
//  → 배열의 각 요소를 제곱   n => n ** 2            [square]
//  → 배열 각 요소의 제곱근   n => Math.sqrt(n)      [sqrt]
//  → 배열의 각 요소를 세제곱  n => n ** 3            [cube]

const arr3 = [1, 2, 3, 4, 5];
// cf. arr.map(a => a ** 2).map(a => Math.sqrt(a)).map(a => a ** 3);
// // ⇒⇒⇒ 결과 => [ 1, 8, 27, 64, 125 ]
// TryThis. 수행 순서를 자유롭게 변경하도록 해보세요.
// [square, sqrt, cube].reduce
// [cube, square, sqrt].reduce


const square = (n) => n ** 2;
const sqrt = (n) => Math.sqrt(n);
const cube = (n) => n ** 3;

function reduce2 (arr, ...fns) {
    let ret = arr;
    for (let e in fns) {
        switch(fns[e].name) {
            case 'square' :
                loop(square);
                break;
            case 'sqrt' :
                loop(sqrt);
                break;
            case 'cube' :
                loop(cube);
                break;
            default :
                console.log('fn name check!');
        }
    }
    function loop (fn) {
        for (let i = 0; i < arr.length; i += 1) {
            ret[i] = fn(ret[i]);
        }
    }

    return ret;
}
console.log(reduce2(arr3, square, sqrt, cube));
console.log(reduce2(arr3, square, cube, sqrt));
console.log(reduce2(arr3, sqrt, square, cube));

/////////////////////////////////////////////////////////

// 다음과 같은 정수 배열을 생성하는 range 함수를 구현하시오.

function range (start, end, space) {
    let ret = [];
    if ((start > end && space > 0) || (start < end && space < 0)) return console.log(ret);
    if (space === undefined) space = 1;
    if (space < 0) space *= -1;
    if (start === end || start < end) {
        mkArray(start, end);
    } else if (start > end) {
        mkArray(start, end, 'reverse'); 
    } else if (start && !end) {
        if(start >= 0) mkArray(1, start);
        else mkArray(start, -1);
    } else {
        ret.push(start);
    }

    function mkArray (a, b, c) {
        if (space === 0) return ret.push(a);
        switch (c) {
            case 'reverse' :
                for (let i = a; i >= b; i -= space) ret.push(i);
                break;
            default :
                for (let i = a; i <= b; i += space) ret.push(i);
        }
    }

    return console.log(ret);
}

range(1, 10, 1);  // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
range(1, 10, 2);  // [1, 3, 5, 7, 9]
range(1, 10);     // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
range(10, 1);     // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
range(10, 1, -2); // [10, 8, 6, 4, 2]
range(5);         // [1, 2, 3, 4, 5] 
range(100);       // [1, 2, 3, 4, 5, …, 99, 100] 
range(-5);        // [-5, -4, -3, -2, -1]
range(5, 5);      // [5]                  
range(5, 5, 0);   // [5]                  
range(5, 5, -1);  // [5]                  
range(5, 1, 1);   // []                   
range(1, 5, -1);  // []                   
range(1, 5, 6);   // [1]                  
range(0);         // [0]        
range(1, 5, 0); // [1]                 
range(0, 5);   // [0, 1, 2, 3, 4, 5]
range(0, -1);  // [0, -1]
range(0, -3);  // [0, -1, -2, -3]
range(-3, 0);  // [-3, -2, -1, 0]
range(5, 1);   // [5, 4, 3, 2, 1]
range(0, 0);  // [0]     
range(0, -1, -5);  // [0]      
range(0, 0, 5);   // [0]

////////////////////////////////////////////////////////

// 다음과 같은 정수 배열이 주어지고, 양의 정수 N이 주어졌을 때,
// 배열에서 합해서 N이되는 두 개의 요소(index)를 찾는 keyPair(arr, N)
// 함수를 작성하시오. (O(n^2) 이면 fail!!)

function keyPair (arr, target) {
    let loop = true;
    let ret = [];
    for (let e in arr) {
        if(!loop) break;
        for (let i = 0; i < arr.length; i += 1) {
            if (e !== i && arr[e] + arr[i] === target) {
                loop = false;
                ret = [Number(e), i];
            }
        }
    }
    return ret;
}

keyPair([1, 3, 4, 5], 7);             // [1, 2]
keyPair([1, 4, 45, 6, 10, 8], 16);    // [3, 4]
keyPair([1, 2, 4, 3, 6], 10);         // [2, 4]
keyPair([1, 2, 3, 4, 5, 7], 9);       // [3, 4]
//cf. O(n^2) ⇒ ⇒ ⇒ O(N) || O(logN)
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [1, 5]);
