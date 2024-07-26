declare const assert: any;
declare const isStringNumber: (value: unknown) => value is [string, number];
declare const f1: (value: number | string | boolean | [string, number]) => void;
interface Animal {
}
interface Dog extends Animal {
    name: string;
}
interface Cat extends Animal {
    punch(): void;
}
declare function isDog(a: Animal): a is Dog;
declare const cart: {
    X: number;
    Y: number;
    Z: number;
};
type T1 = "X" | "Y" | "Z";
type T2 = keyof typeof cart;
declare const constCart: {
    readonly X: 1;
    readonly Y: 2;
    readonly Z: 3;
};
type T3 = 1 | 2 | 3;
type T4 = typeof constCart[keyof typeof constCart];
declare function testError(): void;
type TPropertyKeyType = string | number | symbol;
type TUser = {
    [key: string]: string | number;
};
declare function deleteArray(arr: TUser[] | number[], startOrKey: TPropertyKeyType, endOrValue?: unknown): (number | TUser)[];
declare const arr2: number[];
declare const Hong: {
    id: number;
    name: string;
};
declare const Kim: {
    id: number;
    name: string;
};
declare const Lee: {
    id: number;
    name: string;
};
declare const users2: TUser[];
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
type Change<T, K extends keyof T, U> = {
    [k in keyof T]: K extends k ? U : T[k];
};
type DeptCaptain = Change<IDept, 'captain', IUser>;
type Item = {
    item: string;
    price: number;
};
type ItemPrice<T, U> = {
    [k in keyof T]: keyof U extends T[k] ? keyof U : T[k];
};
declare const stock: {
    X: number;
    Y: number;
    Z: number;
};
declare const itemPrices: ItemPrice<Item, typeof stock>[];
declare const total: number;
