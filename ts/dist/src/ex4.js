"use strict";
function add(a, b) {
    return `${a} - ${b}`;
}
// ex2) 다음 객체들을 하나로 합쳐(extend) 보세요.
let users3 = [
    { name: 'Hong' },
    { age: 23 },
    { id: 1, addr: 'Seoul' },
];
const ret = users3.reduce((acc, user) => ({ ...acc, ...user }));
////////////////////////////////////////////////////////////////////////////////
// regist 함수가 다음과 같을 때 파라미터 처리를 해보세요.
function registUserObj({ name, age }) {
    const id = 100;
    return { id, name, age };
}
const paramObj = { name: 'Hong', age: 32 };
const newUser2 = registUserObj(paramObj);
console.log('🚀  newUser2:', newUser2);
////////////////////////////////////////////////////////////////////////////////
//debounce와 throttle 함수를 TypeScript로 작성하시오.
function debounce(cb, delay) {
    let timer;
    return (num) => {
        if (timer)
            clearTimeout(timer);
        return timer = setTimeout(() => {
            cb(num);
        }, delay);
    };
}
function throttle(cb, delay) {
    let timer;
    return (num) => {
        if (timer)
            return () => { };
        return timer = setTimeout(() => {
            cb(num);
            clearTimeout(timer);
        }, delay);
    };
}
// test
const debo = debounce(a => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++)
    debo(i); // 15
const thro = throttle(a => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++)
    thro(i); // 11
