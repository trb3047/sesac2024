/*
iterator 커서가 이동하며 메모리 낭비 없이 하나하나 전해줌 (100만개의 데이터를 loop 돌린다면?) 
이터러블 하다 = [Symbol.iterator]를 구현하고 있고 next() 가능, iterator protocol 준수한다
*/

const it = {
    data: 'abc',
    // [Symbol.iterator]() {
    //     let i = 0;
    //     return {
    //         next: () => ({
    //             value: this.data[i],
    //             done: ((i += 1, i) > this.data.length)
    //         })
    //     }
    // }
    *[Symbol.iterator] () {
        for (let i = 0; i < this.data.length; i += i) yield this.data[i];
    }
}

const pointer = it[Symbol.iterator]();
console.log(pointer.next());
console.log(pointer.next());
console.log(pointer.next());
console.log(pointer.next());

// 제네레이션  *를 붙이면 이터러블해진다(이터레이터 자동 세팅)
function* genFn() {
    const name = 'ABC';
    for (let i = 0; i < 3; i += 1) {
        yield name[i];
    }
}

const it2 = genFn();
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());
console.log(it2.next());

function* route() {
    const start = yield "출발 역은?";  // yield가 있으므로 caller에게 제어권 넘김. yield뒤는 그냥 메시지!
    const end = yield "도착 역은?";
    return `${start}역에서 출발하여 ${end}역에 도착합니다.`;
  }
  
  const caller = route();   // next() 함수가 있는것으로 볼 때, "내 안에 이터레이터 있다!"
  console.log(caller.next());      // undefined보내면 제너레이터는 {value: '출발 역은?', done: false}를 caller에게 보내(반환하)고 일시 정지.
  console.log(caller.next('문래')); // start에 '문래'를 주입하고, {value: '도착 역은?', done: false}를 caller에게 보내고 일시 정지.
  console.log(caller.next('신림'));