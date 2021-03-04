/**
 * @description: 一些普通的接口函数
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-04 18:34:14
 * @LastEditTime: 2021-03-04 18:34:14
 * @LastEditors: 小康
 */

const Base = require('./base')

class Api extends Base {
  constructor(req, res) {
    super(req, res)
  }
  // 获取某原始文件的内容（文本）
  async getFile(url) {
    const content = await super.request(url)
    return content.data
  }
}

module.exports = async (req, res) => {
  const api = new Api(req, res)
  const { type, url } = api.getRequestData()

  switch (type) {
    case 'getFile':
      const data = await api.getFile(url)
      api.responseMessage(data)
      break
    default:
      api.responseMessage()
  }
}
