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