/* 1 ~ n까지의 원소로 이루어진 배열을 만드는 함수를 재귀함수로 작성하시오.
(단, array 메소드를 사용하지 말고, destructuring을 사용하시오) */

function makeArray (num) {
    let arr = []; 
    function result(e) {
        if(e < 1) return;
        arr[e - 1] = e--;
        result(e);
    }
    result(num);
    return arr;
}

console.log(makeArray(10));

function makeResverseArray (num) {
    let arr = [];
    let start = 0;
    function result(e) {
        if(e < 1) return;
        arr[start++] = e--;
        result(e);
    }
    result(num);
    return arr;
}

console.log(makeResverseArray(5));


/* 피보나치 수열을 
1) Loop를 이용하여 작성하시오.
2) 순수 재귀를 이용하여 작성하시오.
3) memoization하여 작성하시오. */

function fibonacci1 (n) {
    let obj = {};
    for (let e =  0;e <= n; e += 1) {
        obj[e] = (e <= 1) ? e : (obj[e - 1] + obj[e - 2]);
    }
    return obj[n];
}

function fibonacci2 (n) {
    return (n <= 1) ? n : fibonacci2(n - 2) + fibonacci2(n - 1);
}

const fibonacci3 = memoized (function (n) {
    return (n <= 1) ? n : fibonacci3(n - 2) + fibonacci3(n -1);
});

function memoized (fn) {
    let table = {};
    function memo (n) {
        return (table[n]) ? table[n] : table[n] = fn(n);
    }
    return memo;
}

console.log(fibonacci1(50));
console.log(fibonacci2(30));
console.log(fibonacci3(60));
