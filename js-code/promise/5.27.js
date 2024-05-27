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

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onSettled) {
    return this.then((data) => {
      onSettled()
      return data
    }, (reason) => {
      onSettled()
      throw reason
    })
  }
 
  static resolve(data) {
    if(data instanceof MyPromise) {
      return data
    }
    return new myPromise((resolve, reject) => {
      if(isPromise(data)) {
        data.then(resolve, reject)
      } else {
        resolve(data)
      }
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(pros) {
    return new MyPromise((resolve, reject) => {
      try {
        const result = []
        let fulfilledCount = 0
        let count = 0
        for (const p of pros) {
          let i = count
          MyPromise.resolve(p).then((data) => {
            result[i] = data
            fulfilledCount++
            if(fulfilledCount === count) resolve(result)
          }, (reason) => {
            reject(reason)
          })
          count++
        }
        if(count === 0) resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  static allSettled(pros) {
    const ps = []
    for (const p of pros) {
      ps.push(p.then((data) => {
        return {
          status: FULFILLED,
          value: data
        }
      }, (reason) => {
        return {
          status: REJECTED,
          reason: reason
        }
      }))
    }
    return this.all(ps)
  }

  static race(pros) {
    return new MyPromise((resolve, reject) => {
      for (const p of pros) {
        MyPromise.resolve(p).then(resolve, reject)
      }
    })
  }

  static any(pros) {
    return new MyPromise((resolve, reject) => {
      try {
        const result = []
        let count = 0
        let onRejectedCount = 0
        for (const p of pros) {
          let i = count
          count++
          MyPromise.resolve(p).then((res) => {
            resolve(res)
          }, (reason) => {
            result[i] = reason
            onRejectedCount++
            if(onRejectedCount === count) reject(result)
          })
        }
      } catch (error) {
        reject(error)
      }
    })
  }

}

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('aaa')
    reject('aaa err')
  }, 2000);
});
 
let p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('bbb')
    reject('bbb err')
  }, 1000);
});

const p3 = MyPromise.any([p, p2]);
p3.then((res) => {
  console.log('cg', res);
}, err => {
  console.log('sb', err);
})
setTimeout(() => {
  // console.log(p);
  console.log(p3);
}, 3000);
