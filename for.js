const fns = [];
{
    let i = 0;
    let t = i;
    fns.push(() => console.log(i));
    if ((t = i + 1) < 4) {
        let i = t;
        fns.push(() => console.log(i));
        if ((t = i + 1) < 4) {
            let i = t;
            fns.push(() => console.log(i));
            if ((t = i + 1) < 4) {
                let i = t;
                fns.push(() => console.log(i));
            }
        }
    }
}
for (let i = 0; i < 4; i += 1) {
   fns[i]();
}