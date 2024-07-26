interface IUser1 {
    id: number;
    age: number;
    name: string;
}
interface IDept1 {
    id: symbol;
    age: string;
    dname: string;
    captain: string;
}
type Combine<T, U> = {
    [k in keyof (T & U)]: (T & U)[k] extends never ? keyof (T & U)[k] : (T & U)[k];
};
type ICombined = Combine<IUser1, IDept1>;
type FirstArgs<F> = F extends (a: infer R, ...args: any[]) => any ? R : never;
type SecondArgs<F> = F extends (a: any, b: infer R, ...args: any[]) => any ? R : never;
type Args<F> = F extends (...args: infer R) => any ? keyof R : never;
declare function add(a: number, b: string): string;
type A = FirstArgs<typeof add>;
type B = SecondArgs<typeof add>;
type C = Args<typeof add>;
type AX1 = Args<typeof String.prototype.endsWith>;
type AX2 = Args<typeof String.prototype.charAt>;
type R = Record<string, number>;
declare let users3: ({
    name: string;
    age?: undefined;
    id?: undefined;
    addr?: undefined;
} | {
    age: number;
    name?: undefined;
    id?: undefined;
    addr?: undefined;
} | {
    id: number;
    addr: string;
    name?: undefined;
    age?: undefined;
})[];
type FullUser = Record<string, string | number | undefined>;
declare const ret: FullUser;
declare function registUserObj({ name, age }: {
    name: string;
    age: number;
}): {
    id: number;
    name: string;
    age: number;
};
type RegistUserObj = Parameters<typeof registUserObj>[0];
declare const paramObj: RegistUserObj;
declare const newUser2: {
    id: number;
    name: string;
    age: number;
};
declare function debounce(cb: (...args: any) => any, delay: number): (num: number) => number;
declare function throttle(cb: (...args: any) => any, delay: number): (num: number) => number | (() => void);
declare const debo: (num: number) => number;
declare const thro: (num: number) => number | (() => void);
