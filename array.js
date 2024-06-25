//다음을 수행하시오.
let arr2 = [1, 2, 3, 4, 5];
// ex1) [2,3]을 추출
console.log(arr2.slice(1, 3));

// ex2) [3]부터 모두 다 추출
console.log(arr2.slice(2));

// ex3) [2,3,4] 제거하기
arr2.splice(1, 3);
console.log(arr2);

// ex4) 복원하기
arr2.splice(1, 0, 2, 3, 4);
console.log(arr2);

// ex5) [3] 부터 끝까지 제거하기
arr2.splice(2);
console.log(arr2);

// ex6) 복원하기
arr2.splice(2, 0, 3, 4, 5);
console.log(arr2);

// ex7) [1,2, 'X', 'Y', 'Z', 4, 5] 만들기
arr2.splice(2, 1);
arr2.splice(2, 0, 'X', 'Y', 'Z');
console.log(arr2);

// ex8) 위 7번 문제를 splice를 사용하지 말고 작성하시오.
arr2 = [1, 2, 3, 4, 5];
let ret = arr2.join('').split('3');
ret = ret[0] + 'XYZ' + ret[1];
console.log([...ret].map((a, i) => {
    if(Number(a) || a == 0) return Number(a);
    return a;
}));

const users = [{ id: 1, name: 'Hong' }, { id: 20, name: 'Kim' }, { id: 3, name: 'Lee' } ];

console.log(users.reduce( (s, user) => `${s} ${user.name}`,  ''));


const objs = [ {id: 1}, {name: 'Hong'}, {addr: 'Seoul', id: 5}];

//  ⇒⇒⇒ {id: 5, name: 'Hong', addr: 'Seoul'}
let rret = objs.reduce((acc, obj) => ({...acc, ...obj}), {});

console.log(rret);