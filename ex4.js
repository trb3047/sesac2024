function fibonacci2 (n) {
    if(n <= 1){
        return n;
    }
    return 캐시[n] ?? (캐시[n] = fibonacci2(n - 2) + fibonacci2(n - 1));
}

console.log(fibonacci2(7));