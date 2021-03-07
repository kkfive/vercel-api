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
  // 获取qq头像
  async qlogo(qq) {
    super.setResponeseHeader()
    const { data, contentType } = await crosComponents(
      `https://q1.qlogo.cn/g?b=qq&nk=${qq}&s=0`
    )
    this.res.setHeader('Content-Type', contentType)
    this.res.send(data)
  }

  /**
   * 获取bing今日图
   * @author 小康
   * @date 2021-03-07
   * @param {String} date 日期,如果没有则返回当前最新日期的图
   * @param {String} raw=false 默认返回jsd链接，开启后返回bing官方的源
   * @returns {redirect}
   */
  async bing(date) {
    // 用户没有传入时间
    if (!date) {
      // 获得当前北京时间
      const localDate = new Date(new Date().getTime() + 28800000)
      // 获取当前年
      const dateYear = localDate.getFullYear()
      // 获取当前月
      const dateMon =
        localDate.getMonth() + 1 < 10
          ? '0' + (localDate.getMonth() + 1)
          : localDate.getMonth() + 1
      // 获取当前日
      const dateDay =
        localDate.getDate() < 10
          ? '0' + localDate.getDate()
          : localDate.getDate()
      date = `${dateYear}${dateMon}${dateDay}`
    }
    this.res.redirect(
      `https://cdn.jsdelivr.net/gh/iServes/actions-BingPicApi/pic/${date}.png`
    )
  }
}

module.exports = async (req, res) => {
  const api = new Api(req, res)
  const { type, url, qq, date } = api.getRequestData()

  switch (type) {
    case 'cros':
      await api.cros(url)
      break
    case 'qlogo':
      await api.qlogo(qq)
      break
    case 'bing':
      await api.bing(date)
      break
    default:
      api.responseMessage()
  }
}
