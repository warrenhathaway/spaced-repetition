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

/**
 * 用promise A+规范判断是否为promise
 * @param {*} target 
 * @returns {boolean}
 */
function isPromise(target) {
  return !!(target && typeof target === 'object' && typeof target.then === "function")
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

  /**
   * 状态变化执行
   */
  _runHandlers() {
    if(this._status === PENDING) {
      return
    }
    // console.log('处理', this._handlers);
    while(this._handlers[0]) {
      const handler = this._handlers[0]
      this._runOneHandler(handler)
      this._handlers.shift()
    }
  }

  /**
   * 处理一个handler
   * @param {object} handler 
   */
  _runOneHandler({executor, status, resolve, reject}) {
    runMicroTask(() => {
      if(this._status !== status) {
        // 状态不一致
        return
      }
      if(typeof executor !== "function") {
        // 传递不是一个函数，也就是没有后续处理的情况，那么后面的promise的状态跟前面保持一致
        this._status === FULFILLED 
          ? resolve(this._value) 
          : reject(this._value)
        return
      }

      try {
        const result = executor(this._value)
        if(isPromise(result)) {
          result.then(resolve, reject)
        } else {
          resolve(result)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._pushHandlers(onFulfilled, FULFILLED, resolve, reject)
      this._pushHandlers(onRejected, REJECTED, resolve, reject)
      this._runHandlers() //执行队列
    })
  }

  _changeStatus(newStatus, value) {
    if(this._status !== PENDING) return
    this._status = newStatus
    this._value = value
    // 状态变化执行队列
    this._runHandlers()
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
});
(async function() {
  let res = await p
  console.log('hahah', res);
})()