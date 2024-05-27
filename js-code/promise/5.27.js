const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function micTask(cb) {
  process.nextTick(cb)
}

function isPromise(target) {
  return !!(target && typeof target === "object" && typeof target.then === "function")
}


class MyPromise {
  constructor(executor) {
    this._status = PENDING
    this._value = undefined
    this._handlers = []
    executor(this._resolve.bind(this), this._reject.bind(this))
  }

  _runHandlers() {
    if(this._status === PENDING) return
    while(this._handlers[0]) {
      const handler = this._handlers.shift()
      this._runOneHander(handler)
    }
  }

  _runOneHander({ exec, status, resolve, reject}) {
    micTask(() => {
      if(this._status !== status) {
        return
      }
      if(typeof exec !== 'function') {
        this._status === FULFILLED ? resolve(this._value) : reject(this._value)
        return
      }
      try {
        const result = exec(this._value)
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

  _changeState(status, data) {
    if(this._status !== PENDING) return
    this._status = status
    this._value = data
    this._runHandlers()
  }

  _resolve(data) {
    this._changeState(FULFILLED, data)
  }

  _reject(reason) {
    this._changeState(REJECTED, reason)
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this._handlers.push({ status: FULFILLED, exec: onFulfilled, resolve, reject })
      this._handlers.push({ status: REJECTED, exec: onRejected, resolve, reject })
      this._runHandlers()
    })
  }

}