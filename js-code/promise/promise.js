const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

/**
 * 运行一个微队列
 * 把传递的函数放入微队列
 * @param {Function} callback 
 */
function runMicroTask(callback) {
  // node环境
  if(process && process.nextTick) {
    process.nextTick(callback)
  } else if(MutationObserver) {
    const p = document.createElement('p')
    const observer = new MutationObserver(callback)
    observer.observe(p, {
      childList: true
    })
    p.innerHTML = '1'
  } else {
    setTimeout(() => {
      callback()
    }, 0);
  }
}

class MyPromise {

  constructor(executor) {
    this._status = PENDING
    this._value = undefined
    this._handlers = [] // 处理队列
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }

  /**
   * 向处理队列中添加函数
   * @param {*Function} executor 添加的函数 
   * @param {*string} status 该函数什么状态下执行
   * @param {*Function} resolve then函数返回的promise对象的resolve
   * @param {*Function} reject then函数返回的promise对象的reject
   */
  _pushHandlers(executor, status, resolve, reject) {
    this._handlers.push({
      executor,
      status,
      resolve,
      reject
    })
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandlers(onFulfilled, FULFILLED, resolve, reject)
      this._pushHandlers(onRejected, REJECTED, resolve, reject)
    })
  }

  _changeStatus(newStatus, value) {
    if(this._status !== PENDING) return
    this._value = value
    this._status = newStatus
  }

  _resolve(data) {
    this._changeStatus(FULFILLED, data)
  }

  _reject(reason) {
    this._changeStatus(REJECTED, reason)
  }

}
let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000);
})

p.then(function A1() {}, function A2() {})
p.then(function B1() {}, function B2() {})

console.log(p);