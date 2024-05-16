
class MyPromise {

  status = 'pending'
  result = null
  resolveQueue = []

  resolve(val) {
    this.result = val
    this.status = 'fulfilled'
    this.resolveQueue.forEach(cb => cb(this.result))
  }

  reject() {
    this.status = 'rejected'
  }

  constructor(cb) {
    cb(this.resolve.bind(this), this.reject.bind(this))
  }

  then(cb) {
    this.resolveQueue.push(cb)
  }

}

let pro = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    console.log(111);
    resolve('haha')
  }, 1000)
})
console.log(pro);
pro.then((res) => {
  console.log('then~', res);
  console.log(pro);
})