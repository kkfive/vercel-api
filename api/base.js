const axios = require('axios')
class Base {
  constructor(req, res) {
    this.req = req
    this.res = res
  }
  /**
   * 使用axios发送Ajax请求
   * @author 小康
   * @date 2021-03-04
   * @param {String} url 请求地址
   * @param {Object} data={} 请求携带数据
   * @param {String} method='GET' 请求方式
   * @returns {Promise}
   */
  request(url, data = {}, method = 'GET', config) {
    const auth = this.Authorization
    return new Promise((resolve, reject) => {
      let promise
      // 1. 执行异步请求
      if (method === 'GET') {
        promise = axios.get(url, {
          params: data,
          headers: auth
            ? {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth
              }
            : { 'Content-Type': 'application/json' },
          ...config
        })
      } else {
        promise = axios.post(url, data, {
          headers: auth
            ? {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth
              }
            : { 'Content-Type': 'application/json' }
        })
      }
      promise
        .then((response) => {
          // 2. 成功调用resolve
          resolve({ headers: response.headers, data: response.data })
        })
        .catch((error) => {
          // 3. 失败不调用reject，而是提示异常信息
          console.log(error)
          console.log(error.message)
          reject(error.message)
        })
    })
  }
  /**
   * 返回GET/POST请求的数据
   * @author 小康
   * @date 2021-03-04
   * @returns {Object} 请求的数据
   */
  getRequestData() {
    let requestData = {}
    if (this.req.method === 'GET') {
      console.log(this.req, 'this.req')
      requestData = this.req.query || {}
      console.log('requestData', requestData)
    } else {
      requestData = this.req.body || {}
    }
    console.log(requestData)
    return requestData
  }
  // 定义返回格式
  responseMessage(data, code = 200) {
    data = data || {
      message: '欢迎来到我的Api项目哦！',
      Power: 'https://xiaokang.me'
    }
    this.setResponeseHeader()
    return this.res.status(200).send({
      code,
      data
    })
  }
  // 设置响应头
  setResponeseHeader() {
    this.res.setHeader('Access-Control-Allow-Origin', '*')
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type, Authorization'
    )
  }
}

module.exports = Base
