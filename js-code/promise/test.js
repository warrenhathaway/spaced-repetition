// const pro = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1)
//     }, 1000);
// })
// console.log(pro);

// pro.then(function(d) {
//     console.log(d);
// })
// pro.then(function(d) {
//     console.log(d);
// })
// pro.then(function(d) {
//     console.log(d);
// })
// pro.then(function(d) {
//     console.log(d);
// })

// let arr = [1, 2, 3, 4, 5, 6, 7]

// for (const item of arr) {
//   console.log('~~', item, arr);
//   arr.shift()
// }
// console.log(arr);

let obj1 = {
  name: 'obj1',
}

function test() {
  console.log(this);
}

const fn = test.bind(obj1)

let obj2 = {
  name: 'obj2',
  exec: fn
}
fn()
obj2.exec()