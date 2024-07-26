"use strict";
// 다음 코드가 오류가 없으면 통과!
const ud2 = { id: 1, name: 'HH', addr: 'Seoul' };
const ud3 = { id: 1, dname: 'HH', captain: 'HH', addr: 'Seoul' };
////////////////////////////////////////////////////////////////////////////////
/*
Array.prototype을 확장한 함수들을 TypeScript로 작성하시오.
mapBy, filterBy, findBy, rejectBy, sortBy, groupBy
firstObject, lastObject
*/
const hong2 = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const users1 = [hong2, lee, kim];
const arr = [1, 2, 3, 4, 5]; // arr.firstObject; // 1    arr.lastObject; // 5
Array.prototype.mapBy = function (k) {
    return this.map((v) => v[k]);
};
Array.prototype.findBy = function (k, v) {
    return this.find((obj) => obj[k] === v);
};
Array.prototype.filterBy = function (k, v) {
    return this.filter((obj) => obj[k] === v);
};
Array.prototype.rejectBy = function (k, v) {
    return this.filter((obj) => obj[k] !== v);
};
Array.prototype.sortBy = function (k) {
    let reverse = false;
    let key = (k.match('desc')) ? (reverse = true, k.split(':desc')[0]) : k;
    let ret = this.map((val) => val[key]).sort();
    if (reverse)
        ret.reverse();
    ret.map((v, i) => ret[i] = this.find((obj) => obj[key] === v));
    return ret;
};
Object.defineProperties(Array.prototype, {
    firstObject: {
        get: function () {
            return this[0];
        }
    },
    lastObject: {
        get: function () {
            return this[this.length - 1];
        }
    }
});
console.log(users1.mapBy('id'), [1, 3, 2]);
console.log(users1.mapBy('name'), ['Hong', 'Lee', 'Kim']);
console.log(users1.filterBy('id', 2), [kim]);
console.log(users1.rejectBy('id', 2), [hong2, lee]);
console.log(users1.findBy('name', 'Kim'), kim);
console.log(users1.sortBy('name'), [hong2, kim, lee]);
console.log(users1.sortBy('name:desc'), [lee, kim, hong2]);
console.log(users1.firstObject, hong2);
console.log(users1.lastObject, kim);
