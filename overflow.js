'use strict';

const never = memoized(function (n) {
    return (n <= 1) ? n : n + never(n - 1);
});

function memoized (fn) {
    let table = {};
    let stop = 0;

    function result (n) {
        try {
            return table[n] || (table[n] = fn(n));
        } catch (err) {
            //stop = n - 2;
            //return fn(stop);
        }
    }
    return result;
}

console.log(never(1000));