const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

/*
(실행 결과: 1과 2를 넣었을 때)
첫 번째 수?  → 1   next(1)
두 번째 수?  → 2
Total: 3
*/
function* add () {
    const a = yield '첫 번째 수는?';
    const b = yield '두 번째 수는?';
    return `total: ${a + b}`;
}

const itAdd = add();
// console.log(itAdd.next().value);
// console.log(itAdd.next(1).value);
// console.log(itAdd.next(2).value);

rl.on('close', function () {
    process.exit();
});

function req(num) {
    const { value, done } = (num) ? itAdd.next(num) : itAdd.next();
    if(!value) return;
    rl.question(value, (answer) => {
        req(+answer);
        if (done) rl.close();
    });
}

req();