"use strict";
const assert = require('assert');
const isStringNumber = (value) => (Array.isArray(value) && typeof value[0] === 'string' && typeof value[1] === 'number');
const f1 = (value) => {
    if (isStringNumber(value)) {
        console.log(value[0].toUpperCase(), value[1].toFixed());
    }
};
//class Retriever implements Dog {}
function isDog(a) {
    return Reflect.has(a, 'name');
}
/////////////////////////////////////////////////////////////////////////////////////////
// 문제1) 다음에서 T1과 동일한 타입으로 T2를 정의하시오.
const cart = {
    X: 1,
    Y: 2,
    Z: 3,
};
// 문제2) 다음에서 T3과 동일한 타입으로 T4를 정의하시오.
const constCart = {
    X: 1,
    Y: 2,
    Z: 3,
};
/////////////////////////////////////////////////////////////////////////////////////////
// 다음에서 '가', '나', '다' 어떤 걸 throw 해도 에러 메시지를 출력하도록 (라) 부분을 수정하시오.
function testError() {
    try {
        throw new Error('some error!!!!'); // 가
        //throw 'some string error!!!';        // 나
        //throw ['some', 'array', 'error'];       // 다
    }
    catch (error) {
        console.log(('message' in error) ? error.message : (Array.isArray(error)) ? new Error(error.join(' ')).message : new Error(error).message); // 라
    }
}
testError();
function deleteArray(arr, startOrKey, endOrValue) {
    if (typeof startOrKey === 'number') {
        if (typeof endOrValue === 'number') {
            return arr.filter((_, i) => i < startOrKey || i > endOrValue - 1);
        }
        return arr.slice(0, startOrKey);
    }
    if (typeof startOrKey === 'string') {
        return arr.filter((e) => typeof e === 'object' && typeof e !== null && e[startOrKey] !== endOrValue);
    }
    if (typeof startOrKey === 'symbol') { }
    return [];
}
const arr2 = [1, 2, 3, 4];
assert.deepStrictEqual(deleteArray(arr2, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr2, 1, 3), [1, 4]);
const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users2 = [Hong, Kim, Lee];
assert.deepStrictEqual(deleteArray(users2, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users2, 'id', 2), [Hong, Lee]);
const stock = { X: 1, Y: 2, Z: 30 };
const itemPrices = [
    { item: 'X', price: 1000 },
    { item: 'Y', price: 2000 },
    { item: 'Z', price: 3000 },
];
const total = itemPrices.reduce((curr, itemPrice) => curr + stock[itemPrice.item] * itemPrice.price, 0);
//////////////////////////////////////////////////////////////////////////////////////
