/* user 객체를 받아서 id와 name을 출력하는 함수를 3개의 함수로 작성하시오.
(Function signature를 3개 이상으로 표현하기) */

function getUser(obj) {
    if(!obj) return console.log('no Pramas, need a object { id: "", name: "" }');
    if(!obj.id || !obj.name) return console.log('undefined id or name');
    const { id, name } = obj;
    return console.log(id, name);
}

const getUser2 = function(obj) {
    if(!obj) return console.log('no Pramas, need a object { id: "", name: "" }');
    if(!obj.id || !obj.name) return console.log('undefined id or name');
    const { id, name } = obj;
    return console.log(id, name);
}

const getUser3 = (obj) => {
    if(!obj) return console.log('no Pramas, need a object { id: "", name: "" }');
    if(!obj.id || !obj.name) return console.log('undefined id or name');
    const { id, name } = obj;
    return console.log(id, name);
}

getUser({id: 1, name: 'Hong'});
getUser2({id: 2, name: 'Kim'});
getUser3({id: 3, name: 'Choi'});

/////////////////////////////////////////////////////////////////////////////////////////////

/* 다음 user 객체에서 passwd 프로퍼티를 제외한 데이터를 userInfo 라는 변수에 할당하시오. */ 

const user = {id: 1, name: 'Hong', passwd: 'xxx', addr: 'Seoul'};

const userInfo = (user) => {
    if(!user) return console.log('no Pramas, need a object');
    const { id, name, addr } = user;
    const result = { id, name, addr };
    return console.log(result);   
}

userInfo(user);


/////////////////////////////////////////////////////////////////////////////////////////////

/* 다음 arr에서 3개의 id를 id1, id2, id3로 할당하시오. 

const arr = [[{id: 1}], [{id:2}, {id: 3}]]
cf. const id1 = arr[0][0].id;
console.log(id1, id2, id3); 
// 출력결과: 1 2 3 */

const arr = [[{id: 1}], [{id:2}, {id: 3}]];

function desArr(arr) {
    const id1 = arr[0][0].id;
    const id2 = arr[1][0].id;
    const id3 = arr[1][1].id;
    return console.log(id1, id2, id3);
}
desArr(arr);

/////////////////////////////////////////////////////////////////////////////////////////////

/* 다음과 같이 key를 전달하면 해당 값의 첫 글자를 제외한 문자를 리턴하는 함수를 destructing을 최대한 활용하여 (가),(나),(다) 부분을 작성하시오.

const user = {name: 'Hong', passwd: 'xyz', addr: 'Seoul'};
function getValueExceptInitial(k) {
  const (가) = user;
  const (나) = [...val];
  return (다);
}
*/

const userr = {name: 'Hong', passwd: 'xyz', addr: 'Seoul'};

function getValueExceptInitial(k) {
    const { [k]: val } = user;
    const [ , ...arr ] = [...val];
    return getResult(arr);
}

function getResult(arg) {
    let result = '';
    for (let e of arg) result += e;
    return result;
}

console.log(getValueExceptInitial('name')); // 'ong'
console.log(getValueExceptInitial('passwd')); // 'yz'
console.log(getValueExceptInitial('addr')); // 'eoul