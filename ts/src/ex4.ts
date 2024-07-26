//두 타입을 합치는 Combine 유틸리티 타입 만들기
interface IUser1 {
    id: number;
    age: number;
    name: string;
}

interface IDept1 {
    id: number;
    age: string;
    dname: string;
    captain: string;
}

//????
type Combine<T, U> = { [ k in keyof (T & U) ]: (T & U)[k] extends never ? keyof (T & U)[k] : (T & U)[k] };
type ICombined = Combine<IUser1, IDept1>;

////////////////////////////////////////////////////////////////////////////////

//특정 함수의 인자 타입을 추출하는 유틸리티 타입을 작성하시오. (infer)

type FirstArgs<F> = F extends (a: infer R, ...args: any[]) => any ? R : never;
type SecondArgs<F> = F extends (a: any, b: infer R, ...args: any[]) => any ? R : never; 
//????
type Args<F> = F extends (...args: infer R) => any ? keyof R : never;

function add(a: number, b: string) { 
    return `${a} - ${b}`;
  }
  
type A = FirstArgs<typeof add>;  // number
type B = SecondArgs<typeof add>; // string
type C = Args<typeof add>;    // number | string

type AX1 = Args<typeof String.prototype.endsWith>;
    // ⇒ string | number | undefined
type AX2 = Args<typeof String.prototype.charAt>;
    // ⇒ number

////////////////////////////////////////////////////////////////////////////////

//Record<KeyType, ValueType>
type R = Record<string, number>;

// ex2) 다음 객체들을 하나로 합쳐(extend) 보세요.
let users3 = [
    {name: 'Hong'},
    {age: 23},
    {id: 1, addr: 'Seoul'},
];

type FullUser = Record<string, string | number | undefined>;
const ret: FullUser = users3.reduce( (acc: FullUser, user) => ({...acc, ...user}) );

////////////////////////////////////////////////////////////////////////////////

// regist 함수가 다음과 같을 때 파라미터 처리를 해보세요.
function registUserObj({ name, age }: {name: string; age: number}) {
  const id = 100;
  return { id, name, age };
}

type RegistUserObj = Parameters<typeof registUserObj>[0];

const paramObj: RegistUserObj = { name: 'Hong', age: 32 };
const newUser2 = registUserObj(paramObj);
console.log('🚀  newUser2:', newUser2);


////////////////////////////////////////////////////////////////////////////////

//debounce와 throttle 함수를 TypeScript로 작성하시오.
function debounce (cb: (...args: any) => any, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    
    return (num: number) => {
        if(timer) clearTimeout(timer);
        return timer = setTimeout(() => {
            cb(num);
        }, delay);
    }
}

function throttle (cb: (...args: any) => any, delay: number) {
    let timer: ReturnType<typeof setTimeout>;

    return (num: number) => { 
        if(timer) return () => {};
        return timer = setTimeout(() => {
            cb(num);
            clearTimeout(timer);
        }, delay);
    }
}

// test
const debo = debounce(a => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) debo(i);   // 15

const thro = throttle(a => console.log(a + 1), 1000);
for (let i = 10; i < 15; i++) thro(i);   // 11