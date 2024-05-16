const pro = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000);
})

pro.then(function(d) {
    console.log(d);
})
pro.then(function(d) {
    console.log(d);
})
pro.then(function(d) {
    console.log(d);
})
pro.then(function(d) {
    console.log(d);
})