//함수를 한번만 실행하게 하는 once 함수를 작성하시오.
 
const fn = once();

function once() {
    let timer = 0;

    function result (x, y, set) {
        let ret = `금일 운행금지 차량은 끝번호 ${x}, ${y}입니다!`;
        if (timer === 0) {
            timer = 1;
            const reStart = setTimeout(() => timer = 0, 1000);
            return ret;
        }
    }
    return result;
}

console.log(fn(1, 6)); // 금일 운행금지 차량은 끝번호 1, 6입니다!
console.log(fn(2, 7)); // undefined
console.log(fn(3, 8)); // undefined

//const interval = setInterval(() => {console.log(fn(4, 8))}, 100);

///////////////////////////////////////////////////////////////////////

const before = () => console.log('before....');
const after = () => console.log('after...');

const someFn = (name, greeting) => console.log(`${greeting}, ${name}`);
const someFn2 = (id, nickname, email, level) =>
  console.log(`${id}/${nickname}/${email}/${level}`);

const template = (fn) => (...arg) => {
        before();
        fn(...arg);
        after();
}

const temp = template(someFn);  // before → someFn → after 실행
const temp2 = template(someFn2);  // before → someFn2 → after 실행

temp('sico', 'hello');
temp2(1, 'lnsol', 'sico@gmail.com', 5);

//////////////////////////////////////////////////////////////////////

//getNextWeek 함수는 widx변수에 부수 효과(side effect)가 있다.
//이를 부수 효과가 없도록 변경하시오.  (hint: closure, IIFE)

const weeks = ['일', '월', '화', '수', '목', '금', '토'];
let widx = -1;

const getNextWeek = closure();

function closure () {
    let week = weeks;
    let idx = widx;
    function fn () {
        idx += 1;
        if (idx >= week.length) idx = 0;
        return `${week[idx]}요일`;
    }
    return fn;
}

console.log(getNextWeek());

let cnt = 0;
const intl = setInterval(() => {
  //widx += 2; // side-effect!
  console.log('call', cnt, getNextWeek());
  if ((cnt += 1) === 8) clearInterval(intl);
}, 1000);
