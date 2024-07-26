// Emp type의 hong 객체에 fullName 기능을 Accessor Property를 사용하지 말고, proxy 생성자 함수를 이용하여 구현하시오.
const assert = require('assert');

class Emp {
    firstName;
    lastName;
}

const hong = new Proxy(new Emp(), {
    get (target, prop) {
        if(prop === 'fullName') {
            return `${target.firstName} ${target.lastName.toUpperCase()}`;
        } else if (prop === 'lastName') {
            return target[prop]?.toUpperCase();
        } else {
            return target[prop];
        }
    },
    set (target, prop, value) {
        if(prop === 'fullName') {
            const [ firstName, lastName ] = value.split(' ');
            if (lastName) {
                target.firstName = firstName;
                target.lastName = lastName;
            } else {
                target.lastName = firstName;
            }
        } else {
            return target[prop] = value;
        }
        return target;
    }
})

hong.fullName = 'Kildong Hong'; // split하여 firstName, lastName 셋
console.log(hong.fullName);     // 'Kildong HONG' 출력하면 통과!
hong.fullName = 'Lee';
console.log(hong.firstName, hong.lastName);  // 'Kildong LEE' 출력하면 통과!

///////////////////////////////////////////////////////////////////


// 모든 Array가 다음 기능을 갖도록 구현하세요.
// 1) mapBy(), findBy(), filterBy(), rejectBy(), sortBy()
// 2) firstObject, lastObject

const hong2 = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const users = [hong2, lee, kim];
const arr = [1, 2, 3, 4, 5]; // arr.firstObject; // 1    arr.lastObject; // 5

Array.prototype.mapBy = function (k) {
    return this.map((v) => v[k]);
}
Array.prototype.findBy = function (k, v) {
    return this.find((obj) => obj[k] === v);
}
Array.prototype.filterBy = function (k, v) {
    return this.filter((obj) => obj[k] === v);
}
Array.prototype.rejectBy = function (k, v) {
    return this.filter((obj) => obj[k] !== v);
}
Array.prototype.sortBy = function (k) {
    let reverse = false;
    let key = (k.match('desc')) ? (reverse = true, k.split(':desc')[0]) : k;
    let ret = this.map((val) => val[key]).sort();
    if (reverse) ret.reverse();
    ret.map((v, i) => ret[i] = this.find((obj) => obj[key] === v));
    return ret;
}

Object.defineProperties(Array.prototype, {
    firstObject: {
        get: function () {
            return this[0];
        },
    },
    lastObject: {
        get: function () {
            return this[this.length - 1];
        }
    }
});

Object.defineProperty(Array.prototype, 'mapBy', { enumerable : false });
Object.defineProperty(Array.prototype, 'findBy', { enumerable : false });
Object.defineProperty(Array.prototype, 'filterBy', { enumerable : false });
Object.defineProperty(Array.prototype, 'rejectBy', { enumerable : false });
Object.defineProperty(Array.prototype, 'sortBy', { enumerable : false });

assert.deepStrictEqual(users.mapBy('id'), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy('name'), ['Hong', 'Lee', 'Kim']);
assert.deepStrictEqual(users.filterBy('id', 2), [kim]);
assert.deepStrictEqual(users.rejectBy('id', 2), [hong2, lee]);
assert.deepStrictEqual(users.findBy('name', 'Kim'), kim);
assert.deepStrictEqual(users.sortBy('name'), [hong2, kim, lee]);
assert.deepStrictEqual(users.sortBy('name:desc'), [lee, kim, hong2]);
assert.deepStrictEqual(users.firstObject, hong2);
assert.deepStrictEqual(users.lastObject, kim);

/////////////////////////////////////////////////////////////////////

//class와 Array를 이용하여 Stack과 Queue를 구현하시오.

//ex1) Stack
class Stack {
    #ret = [];
    push (num) {
        this.#ret.push(num);
        return this.#ret;
    }
    pop () {
        return this.#ret.pop();
    }
}

const stack = new Stack(); // or new Stack([1,2]); // (1,2)
stack.push(3); // 추가하기
console.log(stack.pop()); // 마지막에 추가된 하나 꺼내기

//ex2) Queue
class Queue {
    #ret = [];
    enqueue (num) {
        this.#ret.push(num);
        return this.#ret;
    }
    dequeue () {
        return this.#ret.shift();
    }
}
const queue = new Queue();
queue.enqueue(3); // 추가하기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기
/////////////////////////////////////////////////////////////

//이전 장표에서 작성한 Stack과 Queue에 공통 기능을 확장하시오.(Collection)
// 공통: clear(), toArray(), print(), remove(), isEmtpy, peek, poll, length(size)
// peek: 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 (요소 삭제 없음!)
// poll: 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 & 삭제 ⇐⇒ Stack.pop, Queue.dequeue
// remove: 가장 (Stack:나중, Queue:먼저) 들어간 요소 삭제(skip)

class Collection {
    #ret = [];
    _get () {
        return this.#ret;
    }
    isStack = (this.pop) ? true : false;
    get isEmpty () {
        return (this.#ret.length > 0) ? false : true;
    }
    get peek () {
        return (this.isStack) ? this.#ret.slice(this.length - 1) : this.#ret.slice(0, 1);
    }
    get poll () {
        return (this.isStack) ? this.pop() : this.dequeue();
    }
    get length () {
        return this.#ret.length;
    }
    clear () {
        this.#ret = [];
    }
    toArray () {
        return this.#ret;
    }
    print () {
        console.log(this.#ret);
    }
    remove () {
        (this.isStack) ? this.pop() : this.dequeue();
    }
}

class Stack2 extends Collection {
    push (num) {
        return this._get().push(num);
    }
    pop () {
        return this._get().pop();
    }
}

class Queue2 extends Collection{
    enqueue (num) {
        return this._get().unshift(num);
    }
    dequeue () {
        return this._get().pop();
    }
}

const stack2 = new Stack2();
const queue2 = new Queue2();
stack2.push(1); // 추가하기
stack2.push(2); // 추가하기
stack2.push(3); // 추가하기
stack2.push(4); // 추가하기
stack2.print();
queue2.enqueue(5); // 추가하기
queue2.enqueue(6); // 추가하기
queue2.enqueue(7); // 추가하기
queue2.enqueue(8); // 추가하기
queue2.print();
console.log(stack2);
console.log(queue2);
console.log(stack2.peek, queue2.peek); // 마지막(다음에 나올) 원소
console.log(stack2.poll, queue2.poll); // 마지막(다음에 나올) 원소
stack2.print();
queue2.print(); // 출력해보기

queue2.toArray().map(a => console.log(a));
if (!stack2.isEmpty) stack2.clear();
stack2.print();
if (queue2.length) queue2.clear();
queue2.print();

////////////////////////////////////////////////////////////////////////////////

//두 개의 수를 입력 받아 더하기를 수행하는 제너레이터를 작성하시오.
// const itAdd = add();
// console.log(itAdd.next().value);
// console.log(itAdd.next(1).value);
// console.log(itAdd.next(2).value);

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

/*
(실행 결과: 1과 2를 넣었을 때)
첫 번째 수?  → 1   next(1)
두 번째 수?  → 2
Total: 3
*/
function* add () {
    const a = yield '첫 번째 수는?';
    const b = yield '두 번째 수는?';
    return `total: ${a + b}`;
}

const itAdd = add();
// console.log(itAdd.next().value);
// console.log(itAdd.next(1).value);
// console.log(itAdd.next(2).value);

rl.on('close', function () {
    process.exit();
});

function req(answer) {
    const { value, done } = (answer) ? itAdd.next(answer) : itAdd.next();
    if(!value) return;
    rl.question(value, (answer) => {
        req(+answer);
        if (done) rl.close();
    });
}

//req(); //<<<<<<<< 퀘스쳔 실행!

//////////////////////////////////////////////////////////////////////////////////////////////

/*
이전 챕터에서 작성한 Stack과 Queue 클래스를 iterator로 작성하시오.
(iterable한 클래스로 작성하세요)   iterator or generator 모두 사용 가능!
*/

class IterStack {
    #ret = [];
    push (num) {
        this.#ret.push(num);
        return this.#ret;
    }
    pop () {
        return this.#ret.pop();
    }
    iterator () {
        return this[Symbol.iterator]();
    }
    [Symbol.iterator]() {
        let num = 0;
        let target = this.#ret;
        return {
            next: () => ({
            value: target[num++],
            done: num > target.length,
            })
        }
    }
}

class IterQueue {
    #ret = [];
    enqueue (num) {
        return this.#ret.unshift(num);
    }
    dequeue () {
        return this.#ret.pop();
    }
    iterator () {
        return this[Symbol.iterator]();
    }
    [Symbol.iterator]() {
        let num = 0;
        let target = this.#ret;
        return {
            next: () => ({
            value: target[num++],
            done: num > target.length,
            })
        }
    }
}
const stack3 = new IterStack();
const queue3 = new IterQueue();
stack3.push(1);
stack3.push(2);
stack3.push(3);
stack3.push(4);
queue3.enqueue(5);
queue3.enqueue(6);
queue3.enqueue(7);
queue3.enqueue(8);
console.log([...stack3], [...queue3]);
for (const s of stack3) console.log(s);
for (const q of queue3) console.log(q);
const itStack = stack3[Symbol.iterator]();  // 또는 const itStack = stack.iterator();
console.log(itStack.next());
console.log(itStack.next());

const itQueue = queue3.iterator();
console.log(itQueue.next());


////////////////////////////////////////////////////////////////////////////////////////////


//다음의 지하철 노선 중에서, 출발역 ~ 도착역까지만을 반환하는 클래스를 작성하시오. (단방향만!)

const LINE2 = [
    '신도림',
    '성수',
    '신설동',
    '용두',
    '신답',
    '용답',
    '시청',
    '충정로',
    '아현',
    '이대',
    '신촌',
    '공항철도',
    '홍대입구',
    '합정',
    '당산',
    '영등포구청',
    '문래',
    '대림',
    '구로디지털단지',
    '신대방',
    '신림',
    '봉천',
    '서울대입구',
    '낙성대',
    '사당',
    '방배',
    '서초',
    '교대',
    '강남',
    '역삼',
    '선릉',
    '삼성',
    '종합운동장',
    '신천',
    '잠실',
    '잠실나루',
    '강변',
    '구의',
    '건대입구',
    '뚝섬',
    '한양대',
    '왕십리',
    '상왕십리',
    '신당',
    '동대문역사문화공원',
    '을지로4가',
    '을지로3가',
    '을지로입구'
  ];

class Subway {
    constructor (s, e) {
        let loop = false;
        let length = this.data.length;
        for (let i = 0; i <= length; i += 1) {
            let val = this.data[i];
            if (val === e && loop) {
                this.#ret.push(val);
                //목적지 도달했을 경우 끝
                loop = false;
                break;
            } 
            if (loop && val) this.#ret.push(val);
            //시작 지점 부터 저장 시작
            if(val === s && !loop) {
                this.#ret.push(val);
                loop = true;
            }
            //끝까지 돌았는데 목적지 도달 못했을 경우 초기화
            if(i === length) i = -1;
        }
    }
    #ret = [];
    data = LINE2;
    [Symbol.iterator]() {
        let num = 0;
        let target = this.#ret;
        return {
            next: () => ({
            value: target[num++],
            done: (num > target.length) ? (num = 0, true) : false,
            })
        }
    }
}

const routes = new Subway('문래', '신림');
const it1 = routes[Symbol.iterator]();
console.log([...routes]); // [ '문래', '대림', '구로디지털단지', '신대방', '신림' ]
console.log(it1.next()); // { value: '문래', done: false }
console.log(it1.next()); // { value: '대림', done: false }
console.log(it1.next()); // { value: '구로디지털단지', done: false }
console.log(it1.next()); // { value: '신대방', done: false }
console.log(it1.next()); // { value: '신림', done: true }
console.log(it1.next()); // { value: undefined, done: true }

const routes2 = new Subway('구로디지털단지', '성수');  // 32개 정거장
console.log([...routes2]); // ['구로디지털단지', '신대방', ..., '성수']
const it2 = routes2[Symbol.iterator]();

while (true) {
  const x = it2.next();
  console.log(x);
  if (x.done) break;
}

const route3 = new Subway('문래', '합정');  // 46개 정거장이면 통과!
const route4 = new Subway('신도림', '을지로입구'); // 48개 정거장이면 통과!
console.log([...route3]);
console.log([...route3].length);
console.log([...route4].length);

//////////////////////////////////////////////////////////////////////////////////

/*
Collection 클래스를 상속받아 List 메소드들과 클래스 메소드 arrayToList, listToArray를 보유한 ArrayList 클래스를 구현하시오. (assert로 Test코드 작성)

*/
class Collection3 {
    #ret = [];
    _getRet () {
        return this.#ret;
    }
    _setRet (obj) {
        this.#ret = obj;
    }
    get isEmpty () {
        return (this.#ret.length > 0) ? true : false;
    }
    get peek () {
        let ret = this.#ret;
        let val;
        if (this.isEmpty) return false;
        function fn (target) {
            (target.rest) ? fn(target.rest) : val = target.value;
        }
        fn(ret);
        return val;
    }
    add (...args) {
        let ret = this.#ret;
        let num = 1;
        const [ val, idx ] = args;
        function fn (target) {
            if (idx) {
                if (num === idx) {
                    target.rest = { value: val, rest: target.rest };
                    return;
                } else {
                    num += 1;
                    fn(target.rest);
                } 
            } else {
                (target.rest) ? fn(target.rest) : target.rest = { value : val };
            }
        }
        fn(ret);
        return ret;
    }
    set (...args) {
        let ret = this.#ret;
        const [ idx, val ] = args;
        let num = 0;
        function fn (target) {
            if (num === idx) {
                target.value = val;
                return;
            } else {
                num += 1;
                fn(target.rest);
            }
        }
        fn(ret);
        return ret;
    }
    get (pointer) {
        let ret = this.#ret;
        let num = 0;
        let val;
        function fn (target) {
            if (num === pointer) val = target.value;
            num += 1;
            if (target.rest) fn(target.rest);
        }
        fn(ret);
        return (val, num);
    }
    indexOf (val) {
        let ret = this.#ret;
        let num = 0;
        function fn (target) {
            if (target.value === val) return;
            num += 1;
            if (target.rest) fn(target.rest);
        }
        fn(ret);
        return num;
    }
    contains (val) {
        let ret = this.#ret;
        let chk = false;
        function fn (target) {
            if (target.value === val) return chk = true;
            if (target.rest) fn(target.rest);
        }
        fn(ret);
        return chk;
    }
    remove (val) {
        let ret = this.#ret;
        function fn (target) {
            let next = target.rest;
            if (val === next.value) {
                next = next.rest;
                target.rest = (next.rest) ? { value: next.value, rest: next.rest } : { value: next.value };
                return;
            } else {
                fn(target.rest);
            } 
        }
        fn(ret);
        return ret;
    }
    print () {
        console.log(this.#ret);
    }
    toArray () {
        this.#ret = ArrayList.listToArray(this.#ret);
        return this.#ret;
    }
    iterator() {
        return this[Symbol.iterator]();
    }
    [Symbol.iterator]() {
        //for (i = 0; i < this.#ret.length; i += 1) yield 
        let data = this.#ret;
        let num = 0;
        return {
            next: () => ({
                value: data[num],
                done: (num += 1) > data.length
            })
        }
    }  
    clear () {
        return this.#ret = [];
    }
}

class ArrayList extends Collection3 {
    constructor (arr) {
        super();
        (Array.isArray(arr)) ? this._setRet(ArrayList.arrayToList(arr)) : this._setRet(ArrayList.listToArray(arr));
    }
    static listToArray (obj) {
        let ret = [];
        function fn (target) {
            ret.push(target.value);
            if(target.rest) fn(target.rest);
        }
        fn(obj);
        return ret;
    }
    static arrayToList (arr) {
        let ret = {};
        let num = 0;
        function fn (target) {
            let next = arr[num + 1];
            target.value = arr[num];
            if(next || next === 0) (num += 1, fn(target.rest = {}));
        }
        fn(ret);
        return ret;
    }
}
assert.deepStrictEqual(ArrayList.listToArray({ value: 1, rest: { value: 2 } }), [1,2]); //=> [1,2];
assert.deepStrictEqual(ArrayList.arrayToList([1,2]), { value: 1, rest: { value: 2 } }); //=> { value: 1, rest: { value: 2 } };

const alist = new ArrayList([1, 2]); // alist.toString() ⇒ { value: 1, rest: { value: 2 } }
assert.deepStrictEqual(alist.add(3), { value: 1, rest: { value: 2, rest: { value: 3 } } });     // { value: 1, rest: { value: 2, rest: { value: 3 } } }
//assert.deepStrictEqual(alist.add(5, 1), { value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } }}});  // { value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } }}
assert.deepStrictEqual(alist.remove(2), { value: 1, rest: { value: 3 } });  // { value: 1, rest: { value: 3 } }
assert.deepStrictEqual(alist.add(22, 1), { value: 1, rest: { value: 22, rest: { value: 3 } } }); // { value: 1, rest: { value: 22, rest: { value: 3 } } }
alist.print();
assert.deepStrictEqual(alist.add(33, 1), { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 3 } } } }); 
alist.print(); // ArrayList(4) { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 3 } } } }
assert.deepStrictEqual(alist.set(1, 300), { value: 1, rest: { value: 300, rest: { value: 22, rest: { value: 3 } } } });  // { value: 1, rest: { value: 300, rest: { value: 22, rest: { value: 3 } } } }
alist.print();
assert.deepStrictEqual(alist.get(2), (22, 4));  //alist.size;  // 22, 4
assert.deepStrictEqual(alist.indexOf(300), 1);  // 1
assert.deepStrictEqual(alist.contains(300), true); 
assert.deepStrictEqual(alist.contains(301), false);  // true, false
assert.deepStrictEqual(alist.isEmpty, false); 
assert.deepStrictEqual(alist.peek, 3);  // false, 3
assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 3]);  // [1, 300, 22, 3]
alist.print();
assert.deepStrictEqual(alist.iterator().next(), { value: 1, done: false });  // { value: 1, done: false }
assert.deepStrictEqual(alist.clear(), []);  // all clear
alist.print();

///////////////////////////////////////////////////////////////////////////////////////////////

/*
다음과 같이 부서와 직원 객체가 있을 때, deptMap과 empDept를 만들고,  개발팀 직원 이름 목록을 출력하시오. (key: id)
*/
const hrTeam = {id: 1, dname: '인사팀'};   // 홍길동 (인사팀)
const devTeam = {id: 2, dname: '개발팀'};
const depts = [ hrTeam, devTeam ];
const hong4 = {id: 1, name: 'Hong', dept: 1};  // hong.dept.name ⇒ deptMap.get(hong.dept)?.name
const kim4 = {id: 2, name: 'Kim', dept: 2};
const emps = [ hong4, kim4, {id:3, name: 'Park', dept: 2}, {id: 4, name: 'Choi', dept: 2} ];

const deptMap = new Map();
depts.map((val) => deptMap.set(val.id, val));

const empMap = new Map();
emps.map((val) => empMap.set(val.id, val));

const empDept = new Map();
for (let [k, v] of empMap) empDept.set(v, deptMap.get(v.dept));



console.log(deptMap); // Map(2) { 1 => { id: 1, dname: '인사팀' }, 2 => { id: 2, dname: '개발팀' } }  ⇐ deptMap.get(2)
console.log(empMap); // Map(2) { 1 => {id: 1, name: 'Hong', dept: 1}, 2 => {id: 2, name: 'Kim', dept: 2}, … }
console.log(empDept); // Map(4) { { id: 1, name: 'Hong' } => { id: 1, dname: '인사팀' }, { id: 2, name: 'Kim' } => { id: 2, dname: '개발팀' }, { id: 3, name: 'Park' } => { id: 2, dname: '개발팀' }, { id: 4, name: 'Choi' } => { id: 2, dname: '개발팀' } }
console.log(empDept.get(kim4));
console.log(empDept.get(kim4));
console.log(empDept.get(kim4).dname); // '개발팀'
for (let [k, v] of empDept) {
    if(k.dept === 2) console.log(k.name);
} 
// 개발팀 직원 목록 출력 ⇒ Kim, Park, Choi


///////////////////////////////////////////////////////////////////////////////////////////////////

/*
이전 Array.prototype에 Set을 이용하여 uniqBy() 함수도 추가하시오.
Array.prototype.uniqBy = function(prop) { 
  …
]
*/
Array.prototype.uniqBy = function(prop) {
    return [...new Set(this.map((val) => val[prop]))];
}
Object.defineProperty(Array.prototype, 'uniqBy', { enumerable : false });

const hong3 = {id: 1, name: 'Hong', dept: 'HR'};
const kim3 = {id: 2, name: 'Kim', dept: 'Server'};
const lee2 = {id: 3, name: 'Lee', dept: 'Front'};
const park = {id: 4, name: 'Park', dept: 'HR'};
const ko = {id: 7, name: 'Ko', dept: 'Server'};
const loon = {id: 6, name: 'Loon', dept: 'Sales'};
const choi = {id: 5, name: 'Choi', dept: 'Front'};
const users2 = [ hong3, kim3, lee2, park, ko, loon, choi ];


assert.deepStrictEqual(users2.uniqBy('dept'), [ 'HR', 'Server', 'Front', 'Sales' ]); // [ 'HR', 'Server', 'Front', 'Sales' ]

///////////////////////////////////////////////////////////////////////////////////////////////////

/*
다음과 같은 집합 A, B, C가 있을 때,
각 집합의 교집합, 차집합, 합집합을 구하는 함수를 작성하시오.
*/
const A = [1, 2, 3, 4, 5, 3];
const B = [1, 22, 3, 44, 5];
const C = [11, 222, 3, 4, 555];

function intersect (a, b) {
    let ret = [];
    let table = {};
    [...new Set(a)].map((val, idx) => table[val] = idx);
    [...new Set(b)].map((val) => { if (table[val] || table[val] === 0) ret.push(val) });
    return ret;
}

function diff (a, b) {
    let ret = [];
    let table = {};
    [...new Set(b)].map((val, idx) => table[val] = idx);
    [...new Set(a)].map((val) => (table[val]) ?? ret.push(val));
    return ret;
}

function union (a, b) {
    return [...new Set([...a, ...b])]; 
}

assert.deepStrictEqual(intersect(A, B), [1, 3, 5]); // [1, 3, 5]
assert.deepStrictEqual(intersect(A, C), [3, 4]); // [3, 4]
assert.deepStrictEqual(diff(A, B), [2, 4]); // [2, 4]
assert.deepStrictEqual(diff(B, A), [22, 44]); // [22, 44]
assert.deepStrictEqual(diff(A, C), [1, 2, 5]); // [1, 2, 5]
assert.deepStrictEqual(diff(B, C), [1, 22, 44, 5]); // [1, 22, 44, 5]
assert.deepStrictEqual(union(A, B), [1, 2, 3, 4, 5, 22, 44]); // [1, 2, 3, 4, 5, 22, 44]
assert.deepStrictEqual(union(A, C), [1, 2, 3, 4, 5, 11, 222, 555]); // [1, 2, 3, 4, 5, 11, 222, 555]

///////////////////////////////////////////////////////////////////////////////////////////////////

/*
깊은 복사 deepCopy 함수 작성
(Map, Set, WeakMap, WeakSet도 복사)
*/
const kim2 = {
  nid: 3,
  addr: 'Pusan',
  arr: [1, 2, 3, { aid: 1 }, [10, 20]],
  oo: { id: 1, name: 'Hong', addr: { city: 'Seoul' } },
  xx: null,
  yy: function() { console.log(this.oo); },
  yyy() { console.log(this.oo); },
 [Symbol()]: 9,
 [Symbol()]: Symbol('symbol2'),
  zs: new Set([arr, hong]),
  zws: new WeakSet([arr, hong]),
  zm: new Map([[hong, arr]]),
  zwm: new WeakMap([[hong, arr]])
};

function deepCopy (obj) {
    let ret = (Array.isArray(obj)) ? [] : {};
    function loop (obj, target) {
        for (let e in obj) {
            let val = obj[e];
            //null과 has 메소드 체크 - Map, WeakMap, Set, WeakSet
            let chk = (val === null) ? false : ((val.has) ? false : true);
            if(chk && typeof val === 'object') {
                target[e] = (Array.isArray(val)) ? [] : {};
                loop(val, target[e]);
            } else {
                target[e] = val;
            }
        }
        return target;
    }
    //심볼 처리
    Object.getOwnPropertySymbols(obj).map((val) => ret[val] = obj[val]);
    return ret = loop(obj, ret);
}

console.log(kim2);
const newKim = deepCopy(kim2);
console.log(newKim);
assert.deepStrictEqual(newKim, kim2, 'deepCopy equal fail!');
newKim.addr = 'Daegu';
newKim.oo.name = 'Kim';
assert.notDeepStrictEqual(newKim, kim2, 'Not Valid Deep Copy!');
newKim.arr[0] = 100;
newKim.arr[3].aid = 200;
newKim.arr[4][1] = 300;
newKim.oo.addr.city = 'Daejeon';
assert.notStrictEqual(kim2.arr[4][1], newKim.arr[4][1], 'pass2: 다르지 않아요!');
assert.notStrictEqual(kim2.oo.addr.city, newKim.oo.addr.city, 'Not Pass3: city가 다르지 않아요!');


//////////////////////////////////////////////////////////////////////////////////////////////////

/*
1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.



이 달의 날짜 5개를 무작위로 만들어 역순으로 정렬하시오.


내년(2025년)의 오늘(6월 29일)의 요일을 출력하시오.
 


오늘(2월 1일)로 부터 100일 후의 날짜는?

*/
const date1 = new Date('1970-01-01');
const date2 = new Date('1970-01-02');

//1일 차이의 초 86400
console.log((date2 - date1) / 1000);

const rdDate = [];
function mkDate (s, e) {
    return new Date(s.getTime() + Math.random() * (e.getTime() - s.getTime())).getDate();
}
rdDate.push(mkDate(new Date('2024-07-01'), new Date('2024-07-31')));
rdDate.push(mkDate(new Date('2024-07-01'), new Date('2024-07-31')));
rdDate.push(mkDate(new Date('2024-07-01'), new Date('2024-07-31')));
rdDate.push(mkDate(new Date('2024-07-01'), new Date('2024-07-31')));
rdDate.push(mkDate(new Date('2024-07-01'), new Date('2024-07-31')));
console.log(rdDate);
//랜덤 날짜 역순 정렬
console.log(rdDate.sort((a, b) => b - a));


const printDate = new Date('2025-06-29').getDay();
console.log(printDate, '0은 일요일입니다~');

const after100 = new Date('2024-02-01');
console.log(after100); // 24-02-01
after100.setDate(100);
console.log(after100); // 24-05-10

//////////////////////////////////////////////////////////////////////////////////////////////////

/*
특정 날짜를 받으면 해당 월의 달력을 출력하시오.
일  월  화  수  목  금  토 
—
    1  2   3  4  5   6 
7   8  9  10 11  12  13
…
*/

function mkCal (year, month, date) {
    const dat = new Date(year, month, 1, 9);
    let num = 1;
    let stop = true;
    let cal = `일 월 화 수 목 금 토\n`;
    let startDay = dat.getDay();
    while (dat.setDate(num++)) {
        if (dat.getMonth() !== month) break;
        let weekDay = dat.getDay();
        let d = dat.getDate();
        if (startDay >= d && stop) {
            for (let i = 0; i < startDay; i += 1) cal += `   `;
            stop = false;
        }
        d = d.toString().padStart(2, 0);
        cal += (weekDay === 6) ? `${d}\n` : `${d} `;
    }
    console.log(cal);
}
mkCal(2024, 6, 3);



//////////////////////////////////////////////////////////////////////////////////////////////////

/*
1. 지난 번 lecture.html에서,
   국어 수업은 debounce로 클릭하고,
   수학 수업은 throttle로 클릭하도록 구현하시오.
   (각 0.5초 딜레이)
2. 지난 번 ttt.html에서, 검색어 입력 상자를 만들고,
입력에 0.5초 debounce 걸기 - 검색(출력).

// 검색어 입력시 console 창 내용    $inputBox.oninput = debounce(...)


2022-09-01T07:55:30.747Z search>> 홍길
2022-09-01T07:55:32.058Z search>> 홍길동

*/
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>요일 변경!</title>
</head>
<body>
    <p>
        <button id="btnKor">국어 수업 요일선택 ></button>
        <span id="dayKor">요일을 선택하세요!</span>
    </p>
    <p>
        <button id="btnMath">수학 수업 요일선택 ></button>
        <span id="dayMath">요일을 선택하세요!</span>
    </p>
    <p>
        <input type="text" id="search" placeholder="검색어를 입력하세요">
    </p>
    <script>
        const weeks = ['일', '월', '화', '수', '목', '금', '토'];

        function closure () {
            let week = weeks;
            let idx = -1;
            function fn () {
                idx += 1;
                if (idx >= week.length) idx = 0;
                return `${week[idx]}요일`;
            }
            return fn;
        }

        function debounce (fn, delay) {
            let timer;
            return function (...args) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(fn, delay);
            }
        }

        function throttle (fn, delay) {
            let timer;
            return function (...args) {
                if (timer) return;
                timer = setTimeout(() => {
                    fn();
                    timer = null;
                }, delay);
            }
        }
        
        const getNextWeek = closure();
        const getNextWeek2 = closure();

        btnKor.onclick = debounce(() => {
            dayKor.innerHTML = getNextWeek();
        }, 500)
        btnMath.onclick = throttle(() => {
            dayMath.innerHTML = getNextWeek2();
        }, 500);
        search.onkeyup = debounce((e) => {
            console.log(new Date().toISOString(), ' search >>', search.value);
        }, 500)

    </script>
</body>
</html>
*/

/////////////////////////////////////////////////////////////////////////////

/*
오른 쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.
*/
const total = {price: 45000, vat: 4500};
console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);


function fmt (txt, arg) {
    return txt[0] + arg.toString().replace(/(.*)(\d{3})/, '$1,$2').padStart(10, ' ') + txt[1];
}

/////////////////////////////////////////////////////////////////////////////////

/*
문자열이 한글 자음으로 끝나는지 체크하는 함수를 작성하시오.
*/

function isEndJaum(txt) {
    let start = '가'.charCodeAt(0);
    let target = txt.slice(-1);
    let chk = ((target.charCodeAt(0) - start) % 28 !== 0);
    if (/[ㅏ-ㅣ]/.test(target)) chk = false;
    if (/[A-z]/.test(target)) chk = /[L|M|N|R|l|m|n|r]/.test(target);
    if (/[0-9]/.test(target)) chk = /[0|1|3|6|7|8]/.test(target);
    return chk;
}

console.log(isEndJaum('강원도'));   // false
console.log(isEndJaum('바라당'));   // true
console.log(isEndJaum('ㅜㅜ'));    // false
console.log(isEndJaum('케잌'));    // true
console.log(isEndJaum('점수 A')); // false
console.log(isEndJaum('24'));     // false   cf. isEndJaum('23')은 true 136780



/*
조사 '이/가, 을/를, 은/는'를 알아서 붙이는 함수를 작성하시오.
(추가) ~이어야/여야, ~이랑/랑           isEndJaum('북면') ?  '이' : '가')
*/

function iga (txt) {
    return (isEndJaum(txt.slice(-1))) ? '이' : '가';
}

function eunun (txt) {
    return (isEndJaum(txt.slice(-1))) ? '은' : '는';
}

function eulul (txt) {
    return (isEndJaum(txt.slice(-1))) ? '을' : '를';
}

function iya (txt) {
    return (isEndJaum(txt.slice(-1))) ? '이어야' : '여야';
}

function irang (txt) {
    return (isEndJaum(txt.slice(-1))) ? '이랑' : '랑';
}

console.log(`고성군${iga('고성군')}`);   // 고성군이  cf. `강원도${iga('강원도')}` ⇒ 강원도가
console.log(`고성군${eunun('고성군')}`); // 고성군은  cf. `강원도${eunun('강원도')}` ⇒ 강원도는
console.log(`고성군${eulul('고성군')}`); // 고성군을  cf. `강원도${eulul('강원도')}` ⇒ 강원도를
console.log(`고성군${iya('고성군')}`);
console.log(`고성군${irang('고성군')}`);

//////////////////////////////////////////////////////////////////////////////////

/*
초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.
*/

let s = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'];

const ㄱㄴㄷ = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const 가나다 = '가까나다따라마바빠사싸아자짜차카타파하';

function searchByKoreanInitialSound (txts, reg) {
    const exp = [...reg].reduce((acc, a) => {
        const s = ㄱㄴㄷ.search(a);
        const e = String.fromCharCode(가나다[s + 1].charCodeAt(0) - 1);
        return (/[0-9A-z]/.test(a)) ? `${acc}${a}` : `${acc}[${가나다[s]}-${e}]`;
    }, '');
    const regexp = new RegExp(exp);
    return txts.filter((val) => regexp.test(val));
}

searchByKoreanInitialSound(s, 'ㄱㅅㄱ');
searchByKoreanInitialSound(s, 'ㅌㅅㅁ');
searchByKoreanInitialSound(s, 'ㅂㅁ'); 
searchByKoreanInitialSound(s, 'ㅍㅁ'); 
searchByKoreanInitialSound(s, 'ㄱ1ㅅ');

assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㄱㅇ'), ['강원도 고성군']);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㄱㅅㄱ'), ['강원도 고성군', '고성군 토성면']);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㅌㅅㅁ'), ['고성군 토성면', '토성면 북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㅂㅁ'), ['토성면 북면', '북면']);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㅍㅁ'), []);
assert.deepStrictEqual(searchByKoreanInitialSound(s, 'ㄱ1ㅅ'), ['김1수']);

////////////////////////////////////////////////////////////////////////////////////

/*
문자열 str에서 대문자만 골라 소문자로 변환하세요.
*/
function upperToLower (str) {
    return str.replace(/[A-Z]/g, (matchStr) => matchStr.toLowerCase());
}
console.log(upperToLower('Senior Coding Learning JS'));  // ⇒ '*s*-enior *c*-oding *l*-earning *j*-*s*-' 
         
/*
전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.
*/

function telfmt (str) {
    let reg = /(^0\d[03]?[7]?)?(\d{3,4})(\d{4})/;
    return (str.length > 8) ? str.replace(reg, '$1-$2-$3') : str.replace(reg, '$2-$3');
}

telfmt('0101234567');    // '010-123-4567'
telfmt('01012345678');   // '010-1234-5678'
telfmt('0212345678');    // '02-1234-5678'
telfmt('021234567');     // '02-123-4567'
telfmt('0331234567');    // '033-123-4567'
telfmt('15771577');      // '1577-1577'
telfmt('07012341234');   // '070-1234-1234'
//ex) in JSX
//   <small>{telfmt(user.tel)}</small>

assert.deepStrictEqual(telfmt('0101234567'), '010-123-4567');
assert.deepStrictEqual(telfmt('01012345678'), '010-1234-5678');
assert.deepStrictEqual(telfmt('0212345678'), '02-1234-5678');
assert.deepStrictEqual(telfmt('021234567'), '02-123-4567');
assert.deepStrictEqual(telfmt('0331234567'), '033-123-4567');
assert.deepStrictEqual(telfmt('15771577'), '1577-1577');
assert.deepStrictEqual(telfmt('07012341234'), '070-1234-1234');
assert.deepStrictEqual(telfmt('050712345678'), '0507-1234-5678');
