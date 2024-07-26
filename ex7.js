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
        return this._get().push(num);
    }
    dequeue () {
        return this._get().shift();
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

