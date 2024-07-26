"use strict";
/*
고객이 주문한 상품의 총 금액을 요금표를 참고하여 계산하려고 한다. 에러가 발생하는 이유와 해결 방법을 고민해보자.
"사이즈에 M이 아니라 MM으로 사이즈를 잘 못 기입했을 경우 TS 오류가 나면 통과"
 */
const SIZE = [
    { id: 'XS', price: 8000 },
    { id: 'S', price: 10000 },
    { id: 'M', price: 12000 },
    { id: 'L', price: 14000 },
    { id: 'XL', price: 15000 },
]; // <-- string 타입으로는 sizeOption의 property에 접근이 불가능해서 고정값으로 변경해 주었습니다
const sizeOption = { XS: 1, S: 5, M: 2, L: 2, XL: 4 };
const totalPrice = SIZE.reduce((currPrice, size) => currPrice + (sizeOption[size.id] * size.price), 0);
