const assert = require('assert');

function neverOverflow (num) {
    let stopN = 0;
    let ret = result(num);
    
    while (stopN !== 0) ret += result(stopN);
    function result (n) {
        try {
            stopN = 0;
            return (n <= 1) ?  n : n + result(n - 1);
        } catch (err) {
            stopN = n;
            return 0;
        }
    }
    return ret;
}

console.log(neverOverflow(10000000));