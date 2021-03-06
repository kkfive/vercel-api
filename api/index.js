/**
 * @description: 一些普通的接口函数
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-04 18:34:14
 * @LastEditTime: 2021-03-04 18:34:14
 * @LastEditors: 小康
 */

const Base = require('./base')
const crosComponents = require('./components/cros')
class Api extends Base {
  constructor(req, res) {
    super(req, res)
  }
  // 获取某原始文件的内容（文本）----弃用
  async file(url) {
    const content = await super.request(url)
    return this.res.send(content.data)
  }
  // 处理跨域请求
  async cros(url) {
    if (!url) return super.responseMessage('请传入Url哦!')
    super.setResponeseHeader()
    const { data, contentType } = await crosComponents(url)
    this.res.setHeader('Content-Type', contentType)
    this.res.send(data)
  }
}

module.exports = async (req, res) => {
  const api = new Api(req, res)
  const { type, url } = api.getRequestData()

  switch (type) {
    case 'cros':
      await api.cros(url)
      break
    default:
      api.responseMessage()
  }
}

