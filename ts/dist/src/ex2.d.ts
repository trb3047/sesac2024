interface User {
    id: number;
    name: string;
}
interface Dept {
    id: number;
    dname: string;
    captain: string;
}
interface Ud2 {
    id: number;
    name?: string;
    dname?: string;
    captain?: string;
    addr: string;
}
declare const ud2: Ud2;
declare const ud3: Ud2;
declare const hong2: {
    id: number;
    name: string;
};
declare const kim: {
    id: number;
    name: string;
};
declare const lee: {
    id: number;
    name: string;
};
declare const users1: {
    id: number;
    name: string;
}[];
declare const arr: number[];
type user = {
    id: number;
    name: string;
};
interface Array<T> {
    mapBy: (k: string) => unknown[];
    findBy: (k: string, v: string | number) => user;
    filterBy: (k: string, v: string | number) => user[];
    rejectBy: (k: string, v: string | number) => user[];
    sortBy: (k: string) => user[];
    firstObject: user;
    lastObject: user;
}
