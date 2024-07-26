const assert = require('assert');

const isStringNumber = (value: unknown): value is [string, number] => 
    (Array.isArray(value) && typeof value[0] === 'string' && typeof value[1] === 'number');

const f1 = (value: number | string | boolean | [string, number]) => {
    if (isStringNumber(value)) {
        console.log(value[0].toUpperCase(), value[1].toFixed());
    }
};


interface Animal {}
interface Dog extends Animal {
    name: string;
}
interface Cat extends Animal {
    punch(): void;
}
//class Retriever implements Dog {}

function isDog(a: Animal): a is Dog {
    return Reflect.has(a, 'name');
}

/////////////////////////////////////////////////////////////////////////////////////////

// 문제1) 다음에서 T1과 동일한 타입으로 T2를 정의하시오.

const cart = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  
  type T1 = "X" | "Y" | "Z";
  type T2 = keyof typeof cart;

// 문제2) 다음에서 T3과 동일한 타입으로 T4를 정의하시오.

const constCart = {
    X: 1,
    Y: 2,
    Z: 3,
  } as const;
  
  type T3 = 1 | 2 | 3;
  type T4 = typeof constCart[keyof typeof constCart];

  
/////////////////////////////////////////////////////////////////////////////////////////

// 다음에서 '가', '나', '다' 어떤 걸 throw 해도 에러 메시지를 출력하도록 (라) 부분을 수정하시오.

function testError() {
    try {
         throw new Error('some error!!!!');   // 가
         //throw 'some string error!!!';        // 나
        //throw ['some', 'array', 'error'];       // 다
    } catch (error) {
        console.log(('message' in (error as Error)) ? (error as Error).message : (Array.isArray(error)) ? new Error(error.join(' ')).message : new Error(error as string).message); // 라
    }
}

testError();

/////////////////////////////////////////////////////////////////////////////////////////

type TPropertyKeyType = string | number | symbol;
type TUser = { [key: string]: string | number };

function deleteArray(arr: TUser[] | number[], startOrKey: TPropertyKeyType, endOrValue?: unknown) {
    if (typeof startOrKey === 'number') {
        if (typeof endOrValue === 'number') {
            return arr.filter((_, i) => i < startOrKey || i > endOrValue - 1);
        }
        return arr.slice(0, startOrKey);
    }

    if (typeof startOrKey === 'string') {
        return arr.filter((e) => typeof e === 'object' && typeof e !== null && e[startOrKey] !== endOrValue);
    }

    if (typeof startOrKey === 'symbol') {}

    return [];
}

const arr2 = [1, 2, 3, 4];
assert.deepStrictEqual(deleteArray(arr2, 2), [1, 2]);
assert.deepStrictEqual(deleteArray(arr2, 1, 3), [1, 4]);

const Hong = { id: 1, name: 'Hong' };
const Kim = { id: 2, name: 'Kim' };
const Lee = { id: 3, name: 'Lee' };
const users2: TUser[] = [Hong, Kim, Lee];

assert.deepStrictEqual(deleteArray(users2, 2), [Hong, Kim]);
assert.deepStrictEqual(deleteArray(users2, 'id', 2), [Hong, Lee]);

/////////////////////////////////////////////////////////////////////////////////////////

//특정 key의 타입을 변경하는 Change 유틸리티 타입 만들기

interface IUser {
    id: number;
    age: number;
    name: string;
}

interface IDept {
    id: number;
    age: string;
    dname: string;
    captain: string;
}

type Change<T, K extends keyof T, U> = { [k in keyof T]: K extends k ? U : T[k] };
type DeptCaptain = Change<IDept, 'captain', IUser>;
//type Err = Change<IDept, 'somekey', IUser>; // Error!!!

/////////////////////////////////////////////////////////////////////////////////////////

// 다음 코드가 오류가 나지 않도록 수정하시오.
// 단, itemPrices의 item에는 재고(stock)에 있는 item들만 가능합니다.

type Item = { item: string; price: number };
type ItemPrice<T, U> = {
    [k in keyof T]: keyof U extends T[k] ? keyof U : T[k];
};


const stock = { X: 1, Y: 2, Z: 30 };

const itemPrices: ItemPrice<Item, typeof stock>[] = [
  { item: 'X', price: 1000 },
  { item: 'Y', price: 2000 },
  { item: 'Z', price: 3000 },
];

const total = itemPrices.reduce((curr, itemPrice) => 
                  curr + stock[itemPrice.item] * itemPrice.price, 0);


//////////////////////////////////////////////////////////////////////////////////////

