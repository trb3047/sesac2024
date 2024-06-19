/*
const arr = [100, 200, 300, 400, 500, 600, 700];

for-in문을 사용하여 배열의 인덱스(키)를 출력하시오.
for-in문을 사용하여 배열의 원소(값)를 출력하시오. (of)

*/

const arr = [100, 200, 300, 400, 500, 600, 700];

function getArrayKeys (arr) {
    let ret = [];
    for (let e in arr) ret.push(e);
    return ret;
}

console.log(getArrayKeys(arr));

function getArrayValues (arr) {
    let ret = [];
    for (let e in arr) ret.push(arr[e]);
    return ret;
}

console.log(getArrayValues(arr));


/*
const obj = { name: 'lim', addr: 'Yongsan', level: 1, role: 9, receive: false }

3. for-in문을 사용하여 프로퍼티 이름(키)을 출력하시오.
4. for-in문을 사용하여 프로퍼티 값을 출력하시오.
5. for-of문을 사용하여 프로퍼티 값을 출력하시오.
6. level 프로퍼티가 열거(entries)되지 않도록 설정하시오.
 // Object.defineProperty
7. role 프로퍼티는 읽기전용으로 설정하시오. // Object.defineProperty

*/

const obj = { name: 'lim', addr: 'Yongsan', level: 1, role: 9, receive: false };

function getPropKeys (obj) {
    let ret = [];
    for (let e in obj) ret.push(e);
    return ret;
}

console.log(getPropKeys(obj));

function getPropValues (obj) {
    let ret = [];
    for (let e in obj) ret.push(obj[e]);
    return ret;
}

console.log(getPropValues(obj));

function getPropOfKeys (obj) {
    obj = Object.values(obj);
    let ret = [];
    for (let e of obj) ret.push(e);
    return ret;
}

console.log(getPropOfKeys(obj));

//level 프로퍼티가 열거(entries)되지 않도록 설정하시오.
Object.defineProperty(obj, 'level', { enumerable : false });
console.log(obj);

//7. role 프로퍼티는 읽기전용으로 설정하시오.
Object.defineProperty(obj, 'role', { writable : false });
obj.role = 11;
console.log(obj.role);

/*
[['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]] 배열을 객체로 만드시오. (makeObjectFromArray)

=> { 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }

*/

let arr2 = [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]];

function makeObjectFromArray (arr) {
    let ret = {};
    for (let e in arr) {
        ret[arr[e][0]] = [];
        for (let j in arr[e]) {
            if(j != 0) ret[arr[e][0]].push(arr[e][j]);
        }
    }
    return ret;
}

console.log(makeObjectFromArray(arr2));

/*
위에서 만든 객체를 다시 배열로 만드시오. (makeArrayFromObject)

{ 'A': [10, 20], 'B': [30, 40], 'C': [50, 60, 70] }

=> [['A', 10, 20], ['B', 30, 40], ['C', 50, 60, 70]]
*/

function makeArrayFromObject (arr) {
    return [...arr];
}

console.log(makeArrayFromObject(arr2));

/*
원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 또는 spread(...) 연산자를 사용하지 말고 작성하시오.
// const kim = {nid: 3, nm: 'Hong', addr: 'Pusan'};
const newKim = copyObject(kim);        // shallow copy
newKim.addr = 'Daegu';
console.log(kim.addr !== newKim.addr); // true면 통과!

const newObj = {};
for (const k in obj)
	newObj[k] = obj[k];
 */

function copyObject (obj) {
    let ret = (Array.isArray(obj)) ? [] : {};

    function loop (obj, target) {
        for (let e in obj) {
            switch (typeof(obj[e])) {
                case 'object' :
                    target[e] = (Array.isArray(obj[e])) ? [] : {};
                    loop(obj[e], target[e]);
                    break;
                case 'string' :
                case 'number' :
                    target[e] = obj[e];
                    break;
                default :
                    console.log('need type check');
            }
        };
        return target;
    }
    
    return ret = loop(obj, ret);
}


// 승범님 테스트 코드를 좀 빌렸습니다 
const kim = { nid: 3, nm: 'Hong', addr: 'Busan' };
const han = {
    nid: 3,
    nm: 'Seung',
    addr: {
        living: 'Busan',
        hometown: 'Seoul'
    },
    pets: {
        name: ['navi', 'baeggu', 'kkamdung-i']
    }
};
const innerObj = [[1, 2, 3, 4],
    kim,
    han,
{ 1: 1 ** 1, 2: 2 ** 2, 3: 3 ** 3, 4: 4 ** 4, 5: 5 ** 5 },
{
    korea:
        { capital: 'Seoul', population: 60000000, history: 2000 }
}];

const copyKim = copyObject(kim);
const copyHan = copyObject(han);
const copyInnerObj = copyObject(innerObj);

// obj shallow copy test
copyKim.addr = 'Daegu';
console.log(copyKim);
console.log(kim.addr !== copyKim.addr); // true
console.log('-------------------------------');
// obj deep copy test
copyHan.addr.living = 'Incheon';
copyHan.pets.name[0] = 'nyang-nyang';
console.log(copyHan);
console.log(han.addr.living !== copyHan.addr.living); // true
console.log(han.pets.name[0] !== copyHan.pets.name[0]); // true
console.log('-------------------------------');
// array deep copy test
copyInnerObj[0][0] = 100;
copyInnerObj[1].nid = 30;
copyInnerObj[2].pets.name[1] = 'gildong';
copyInnerObj[3]['1'] = 10 ** 10;
console.log(copyInnerObj);
console.log(innerObj[0][0] !== copyInnerObj[0][0]); // true
console.log(innerObj[1].nid !== copyInnerObj[1].nid); // true
console.log(innerObj[2].pets.name[1] !== copyInnerObj[2].pets.name[1]); // true
console.log(innerObj[3]['1'] !== copyInnerObj[3]['1']); // true
