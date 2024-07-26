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

console.log(neverOverflow(1000));

// function neverOverflow2 (num) {
//     let stopN = 0;
//     let ret = [];
    
//     //while (stopN !== 0) ret += result(stopN);
//     result(num);
//     function result (n) {
//         try {
//             stopN = 0;
//             for (i = (stopN === 0) ? 0 : stopN; i <= num; i += 1) {
//                 ret[i] = (i <= 1) ?  i : i + ret[i - 1];
//             } 
//         } catch (err) {
//             stopN = n;
//             return 0;
//         }
//     }
//     return ret[num];
// }

// console.log(neverOverflow2(100000000));

//////////////////////////////////////////////////////////////////////////////////////////////

/*
Array.reduce 함수를 고차 함수로 직접 구현하시오.
*/

const hong2 = { id: 1, name: 'Hong' };
const kim = { id: 2, name: 'Kim' };
const lee = { id: 3, name: 'Lee' };
const users = [hong2, lee, kim];
const arr = [1, 2, 3, 4, 5]; // arr.firstObject; // 1    arr.lastObject; // 5

const reduce = (arr, fn, initValue) => {
    let ret = initValue ?? (fn(0, 1) === 0) ? 1 : (typeof arr[0] === 'object') ? {} : 0;
    arr.map((val) => {
        ret = fn(ret, val);
    });
    return ret;
}
console.log(reduce([1, 2, 3], (a, b) => a + b, 0));       // 6이면 통과!
//cf. [1,2,3].reduce((a,b) => a + b, 0);       // 6
console.log(reduce([1, 2, 3, 4, 5], (a, b) => a + b));    // 15면 통과!
console.log(reduce([1, 2, 3, 4, 5], (a, b) => a * b, 1)); // 120이면 통과!
console.log(reduce([2, 2, 2], (a, b) => a * b));          // 8이면 통과!
console.log(reduce([3, 3, 3], (a, b) => a * b, 0));       // 0이면 통과!
console.log(reduce(users, (acc, user) => acc + user.name)); // [object Object]LeePark


//////////////////////////////////////////////////////////////////////////////////////////////

/*
다음과 같은 정수 배열이 주어지고, 양의 정수 N이 주어졌을 때,
배열에서 합해서 N이되는 두 개의 요소(index)를 찾는 keyPair(arr, N)
함수를 작성하시오. (O(n^2) 이면 fail!!)

*/

function keyPair (arr, target) {
    const val_idx = {};
    let ret;
    for (let i = 0; i < arr.length; i += 1) {
        const val = arr[i];
        const memoIdx = val_idx[target - val];
        if (val + arr[memoIdx] === target) {
            ret = [memoIdx, i];
            break;
        }
        val_idx[val] = i;
    }
    return ret;
}

keyPair([1, 3, 4, 5], 7);             // [1, 2]
keyPair([1, 4, 45, 6, 10, 8], 16);    // [3, 4]
keyPair([1, 2, 4, 3, 6], 10);         // [2, 4]
keyPair([1, 2, 3, 4, 5, 7], 9);       // [3, 4]  or [1, 5]
//cf. O(n^2) ⇒ ⇒ ⇒ O(N) || O(logN)
assert.deepStrictEqual(keyPair([1, 3, 4, 5], 7), [1, 2]);
assert.deepStrictEqual(keyPair([1, 4, 45, 6, 10, 8], 16), [3, 4]);
assert.deepStrictEqual(keyPair([1, 2, 4, 3, 6], 10), [2, 4]);
assert.deepStrictEqual(keyPair([1, 2, 3, 4, 5, 7], 9), [3, 4]);
//////////////////////////////////////////////////////////////////////////////////////////////

/*
Emp type의 hong 객체에 fullName 기능을 Accessor Property를 사용하지 말고, proxy 생성자 함수를 이용하여 구현하시오.
*/

class Emp {
    constructor () {
        return new Proxy(this, {
            get (target, prop) {
                if (prop === 'fullName') return `${target.firstName} ${target.lastName}`;
                else return target[prop];
            },
            set (target, prop, value) {
                const [ firstName, lastName ] = value.split(' ');
                if (!lastName) {
                    target.lastName = firstName.toUpperCase();
                    return;
                } 
                target.firstName = firstName;
                target.lastName = lastName.toUpperCase();
            }
        })
    }
    firstName;
    lastName;
  }
  
  const hong = new Emp();
  hong.fullName = 'Kildong Hong'; // split하여 firstName, lastName 셋
  console.log(hong.fullName);     // 'Kildong HONG' 출력하면 통과!
  hong.fullName = 'Lee';
  console.log(hong.firstName, hong.lastName);  // 'Kildong LEE' 출력하면 통과!
//////////////////////////////////////////////////////////////////////////////////////////////

/*
class와 Array를 이용하여 Stack과 Queue를 구현하시오.

ex1) Stack
const stack = new Stack(); // or new Stack([1,2]); // ⇐⇒ (1,2)
stack.push(3); // 추가하기
console.log(stack.pop()); // 마지막에 추가된 하나 꺼내기
ex2) Queue
const queue = new Queue();
queue.enqueue(3); // 추가하기
console.log(queue.dequeue()); // 추가한지 가장 오래된 - 먼저 들어간 - 하나 꺼내기

이전 장표에서 작성한 Stack과 Queue에 공통 기능을 확장하시오.(Collection)
// 공통: clear(), toArray(), print(), remove(), isEmtpy, peek, poll, length(size)
// peek: 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 (요소 삭제 없음!)
// poll: 가장 (Stack:나중, Queue:먼저) 들어간 요소 반환 & 삭제 ⇐⇒ Stack.pop, Queue.dequeue
// remove: 가장 (Stack:나중, Queue:먼저) 들어간 요소 삭제(skip)
console.log(stack.peek, queue.peek); // 마지막(다음에 나올) 원소
queue.print(); // 출력해보기
const arr = queue.toArray().map(a => console.log(a));
if (!stack.isEmpty) stack.clear();
if (queue.length) queue.clear();

Collection 클래스를 상속받아 List 메소드들과 클래스 메소드 arrayToList, listToArray를 보유한 ArrayList 클래스를 구현하시오. (assert로 Test코드 작성)

ArrayList.listToArray({ value: 1, rest: { value: 2 } }) ⇒ [1,2]
ArrayList.arrayToList([1,2]) ⇒ { value: 1, rest: { value: 2 } }

const alist = new ArrayList([1, 2]); // alist.toString() ⇒ { value: 1, rest: { value: 2 } }
alist.add(3);     // { value: 1, rest: { value: 2, rest: { value: 3 } } }
alist.add(5, 1);  // { value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } }}
alist.remove(2);  // { value: 1, rest: { value: 3 } }
alist.add(22, 1); // { value: 1, rest: { value: 22, rest: { value: 3 } } }
alist.add(33, 1);
alist.print(); // ArrayList(4) { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 3 } } } }
alist.set(1, 300);  // { value: 1, rest: { value: 300, rest: { value: 22, rest: { value: 3 } } } }
alist.get(2);  alist.size;  // 22, 4
alist.indexOf(300);  // 1
alist.contains(300); alist.contains(301);  // true, false
alist.isEmpty; alist.peek;  // false, 3
alist.toArray();  // [1, 300, 22, 3]
alist.iterator().next();  // { value: 1, done: false }
alist.clear();  // all clear

*/

//////////////////////////////////////////////////////////////////////////////////////////////

/*
prototype & array

모든 Array가 다음 기능을 갖도록 구현하세요.
1) mapBy(), findBy(), filterBy(), rejectBy(), sortBy()
2) firstObject, lastObject

이전 Array.prototype에 Set을 이용하여 uniqBy() 함수도 추가하시오.
*/
// 모든 Array가 다음 기능을 갖도록 구현하세요.
// 1) mapBy(), findBy(), filterBy(), rejectBy(), sortBy()
// 2) firstObject, lastObject

const hong3 = {id: 1, name: 'Hong', dept: 'HR'};
const kim3 = {id: 2, name: 'Kim', dept: 'Server'};
const lee2 = {id: 3, name: 'Lee', dept: 'Front'};
const park = {id: 4, name: 'Park', dept: 'HR'};
const ko = {id: 7, name: 'Ko', dept: 'Server'};
const loon = {id: 6, name: 'Loon', dept: 'Sales'};
const choi = {id: 5, name: 'Choi', dept: 'Front'};
const users2 = [ hong3, kim3, lee2, park, ko, loon, choi ];

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
    const [ key, desc ] = k.split(':');
    let descNum = 1;
    if (desc === 'desc') descNum = -1;
    return this.sort((a, b) => (a[key] > b[key]) ? descNum : -1 * descNum);
}
Array.prototype.uniqBy = function(prop) {
    return [...new Set(this.map((val) => val[prop]))];
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
Object.defineProperty(Array.prototype, 'uniqBy', { enumerable : false });


assert.deepStrictEqual(users.mapBy('id'), [1, 3, 2]);
assert.deepStrictEqual(users.mapBy('name'), ['Hong', 'Lee', 'Kim']);
assert.deepStrictEqual(users.filterBy('id', 2), [kim]);
assert.deepStrictEqual(users.rejectBy('id', 2), [hong2, lee]);
assert.deepStrictEqual(users.findBy('name', 'Kim'), kim);
assert.deepStrictEqual(users.sortBy('name'), [hong2, kim, lee]);
assert.deepStrictEqual(users.sortBy('name:desc'), [lee, kim, hong2]);
assert.deepStrictEqual(users2.firstObject, hong3);
assert.deepStrictEqual(users2.lastObject, choi);
assert.deepStrictEqual(users2.uniqBy('dept'), [ 'HR', 'Server', 'Front', 'Sales' ]); // [ 'HR', 'Server', 'Front', 'Sales' ]

//////////////////////////////////////////////////////////////////////////////////////////////

/*
특정 날짜를 받으면 해당 월의 달력을 출력하시오.
일  월  화  수  목  금  토 
—
    1  2   3  4  5   6 
7   8  9  10 11  12  13
…
*/
function mkCal (year, month, date) {
    const dat = new Date(year, month - 1, 1, 9);
    let num = 1;
    let stop = true;
    let cal = `   ${year}년 ${month}월 ${date}일\n일 월 화 수 목 금 토\n`;
    const startDay = dat.getDay();
    while (dat.setDate(num++)) {
        if(dat.getMonth() !== month - 1) break;
        const day = dat.getDay();
        let d = dat.getDate();
        if (startDay >= d && stop) {
            for (let i = 0; i < startDay; i += 1) cal += `   `;
            stop = false;
        }
        d = d.toString().padStart(2, ' ');
        cal += (day === 6) ? `${d}\n` : `${d} `;
    }
    console.log(cal);
}
mkCal(2024, 8, 1);

const after100 = new Date('2024-07-04');
console.log(after100); // 24-02-01
after100.setDate(after100.getDate() + 100);
console.log(after100); // 24-05-10

//////////////////////////////////////////////////////////////////////////////////////////////

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
//////////////////////////////////////////////////////////////////////////////////////////////

/*
초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.
*/
let s = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'];

const ㄱㄴㄷ = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const 가나다 = '가까나다따라마바빠사싸아자짜차카타파하';

function searchByKoreanInitialSound (txts, reg) {
    const regexp = new RegExp([...reg].reduce((acc, a) => {
        const s = ㄱㄴㄷ.search(a);
        const e = String.fromCharCode(가나다[s + 1].charCodeAt(0) - 1);
        return (/[0-9A-z]/.test(a)) ? `${acc}${a}` : `${acc}[${가나다[s]}-${e}]`;
    }, ''));
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

/*
문자열 str에서 대문자만 골라 소문자로 변환하세요.
upperToLower('Senior Coding Learning JS');  
         // ⇒ '*s*-enior *c*-oding *l*-earning *j*-*s*-' 
*/
function upperToLower (str) {
    return str.replace(/[A-Z]/g, (matchStr) => matchStr.toLowerCase());
}
console.log(upperToLower('Senior Coding Learning JS'));  // ⇒ '*s*-enior *c*-oding *l*-earning *j*-*s*-' 

//////////////////////////////////////////////////////////////////////////////////////////////

/*
전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.
*/

function telfmt (str) {
    //length 기반 변경
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