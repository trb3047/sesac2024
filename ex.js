// 2024-06-07 제출용
// 1. for문을 이용하여 다음과 같이 정확한 숫자를 출력하는 코드를 작성하시오.

// 답)
/*
for(let i=0.1; i<1; i=i+0.1){
    console.log(i.toPrecision(1));
}

*/

for(let i = 0.1; i < 1; i = i+0.1) {
    console.log(+i.toPrecision(1));
    //연산자 사이는 띄어야 하고 프리시전은 스트링 값으로 나오기 때문에 넘버 -> 넘버 타입으로 가야함 +는 Number()과 같다
}
//----------------------------------------------------------------------------------------------------------------------

//2. 1 ~ 10 사이의 정수에 대해 제곱근을 소숫점 3자리까지 출력하시오.

//답)
/*
for(let i=1; i < 11; i+=1){
    let sqrt = Math.sqrt(i);
    if(sqrt.toString().length > 1) console.log(i + ' ' + sqrt.toFixed(3));
}
*/

for(let i = 1; i < 11; i += 1){
    const sqrt = Math.sqrt(i);
    if(sqrt % 1 === 0) console.log(+sqrt.toFixed(3));
    //console.log(Math.round(sqrt * 1000) / 1000);
}
//변하지 않는 변수라면 const 사용이 좋다, 넘버 타입! 그리고 해당 행에서 연산이 몇 번이 일어나는 지 체크!

//----------------------------------------------------------------------------------------------------------------------

//3. 오늘 날짜의 요일을 출력하는 switch문을 사용해서 작성해 보고, switch문을 사용하지 않은 더 간단한 방법도 찾아보세요.

//답)
/*
const today = new Date().getDay();
let setDay = '';

switch(today) {
    case 0 :
        setDay = '일';
    break;
    case 1 :
        setDay = '월';
    break;
    case 2 :
        setDay = '화';
    break;
    case 3 :
        setDay = '수';
    break;
    case 4 :
        setDay = '목';
    break;
    case 5 :
        setDay = '금';
    break;
    case 6 :
        setDay = '토';
    break;
}

console.log('오늘은 '+setDay+'요일입니다.');
*/

const date = Date();
function getWeekName(date) {
    //date값이 안 들어올 경우를 고려!
    switch(date?.getDay()) {
        case 0 :
            return '일';
        break;
        case 1 :
            return '월';
        break;
        case 2 :
            return '화';
        break;
        case 3 :
            return '수';
        break;
        case 4 :
            return '목';
        break;
        case 5 :
            return '금';
        break;
        case 6 :
            return '토';
        break;
        default:
            throw new Error('not a valid date!!');
    }
}

console.log('오늘은 '+getWeekName(date)+'요일입니다.');


//간단한 답)
const today = new Date().getDay();
const setDay = '일월화수목금토';

for (let e in setDay) {
    if(Number(e) === today) console.log('오늘은 '+setDay[e]+'요일입니다.');
}



//----------------------------------------------------------------------------------------------------------------------

//4. 다음과 같이 올바른 더하기 연산을 하는 addPoints 함수를 작성하시오. (단, 소숫점 자리수는 긴쪽에 맞춘다)

//답)
/*
function addPoint(a, b) {
    let setA = a.toString().length - 2;
    let setB = b.toString().length - 2;
    let setFix = setA;
    if(setA < setB) setFix = setB;
    return console.log(Number(a + b).toFixed(setFix));
}

addPoint(0.21354, 0.1);
addPoint(0.14, 0.28);
addPoint(0.34, 0.226);

function getAddPointLeng(a) {
    //값이 없을 때 크래쉬가 없도록 ?를 사용!
    return a?.toString().length - 2;
}
function addPoint(a, b) {
    //반복을 없애기 위해 함수 생성
    let setA = getAddPointLeng(a);
    let setB = getAddPointLeng(b);
    //3항 연산자로 압축
    const bigLen = setA > setB ?  setA : setB;
    //숫자 계산이니까 넘버타입 리턴
    return console.log(+(a + b).toFixed(bigLen));
    //3항 연산자 없이, 매개변수 없을 경우까지 처리
    return console.log(+(a + b)?.toFixed(Math.max(setA, setB))) ;
}
*/

function getAddPointLeng(a) {
    //값이 없을 때 크래쉬가 없도록 ?를 사용!
    return a?.toString().length - 2;
}
function addPoint(a, b) {
    //반복을 없애기 위해 함수 생성
    let setA = getAddPointLeng(a);
    let setB = getAddPointLeng(b);
    const setFix = (setA > setB) ?  setA : setB;
    return console.log(Number((a + b).toFixed(setFix)));
}

addPoint(0.21354, 0.1);
addPoint(0.14, 0.28);
addPoint(0.34, 0.226);