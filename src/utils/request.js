export class Request {
  $interceptors = []
  constructor() {
    const result = this.fetch.bind(this)
    result.intercept = this.intercept.bind(this)
    return result
  }
  fetch(options) {
    let $request = {
      options
    }
    let _resolve, _reject

    let p = new Promise((resolve, reject) => {
      _resolve = resolve
      _reject = reject
    })

    let originSuccss = options.success
    let originFail = options.fail
    let originComplete = options.complete

    this.$interceptors.forEach(provider => {
      if (provider.config) {
        options = provider.config.call($request, options) || options
      }
    })

    let success = res => {
      $request.response = res
      return this.callIinterceptors({
        key: 'success',
        value: res,
        context: $request
      })
        .then(ciRes => {
          if (originSuccss) {
            return Promise.resolve(originSuccss.call($request, ciRes))
          } else {
            return ciRes
          }
        })
        .then(_resolve)
        .catch(_reject)
    }

    let fail = err => {
      $request.responseError = err
      return this.callIinterceptors({
        key: 'fail',
        value: err,
        context: $request
      })
        .then(ciRes => {
          if (originFail) {
            return Promise.reject(originFail.call($request, ciRes))
          } else {
            return ciRes
          }
        })
        // .then(_resolve)
        .catch(_reject)
    }

    let complete = res => {
      return this.callIinterceptors({
        key: 'complete',
        value: res,
        context: $request
      }).then(ciRes => {
        if (originComplete) {
          return Promise.resolve(originComplete.call($request, ciRes))
        } else {
          return ciRes
        }
      })
    }

    console.log('~~~~~~~~~~', {
      ...options,
      success,
      fail,
      complete
    })
    wx.request({
      ...options,
      success,
      fail,
      complete
    })

    return p
  }
  intercept(provider) {
    this.$interceptors.push(provider)
  }
  callIinterceptors({ key, value, context }) {
    return this.$interceptors.reduce((res, provider) => {
      if (!provider[key]) return res

      return res.then(result => {
        return Promise.resolve(provider[key].call(context, result) || result)
      })
    }, Promise.resolve(value))
  }
}

export default new Request()
