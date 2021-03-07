/**
 * @description: 企业微信推送
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-07 14:10:21
 * @LastEditTime: 2021-03-07 14:10:22
 * @LastEditors: 小康
 */

const Base = require('./base')

class Api extends Base {
  constructor(req, res) {
    super(req, res)
  }
  /**
   * 微信消息推送获取accessToken
   * @author 小康
   * @date 2021-03-07
   * @param {String} id 公司id
   * @param {String} secert 用用 secert
   * @returns {String}
   */
  async getAccessToken(corpid, corpsecret) {
    const baseUrl = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken'
    const result = await this.request(
      baseUrl,
      {
        corpid,
        corpsecret
      },
      'POST'
    )
    return result.data.access_token
  }
  /**
   * 发送文本、markdown消息
   * @author 小康
   * @date 2021-03-07
   * @param {String} id  企业微信公司id
   * @param {String} secert 企业微信应用的应用secert
   * @param {String} agentId 企业微信应用的应用agentId
   * @param {String} msg 需要发送的内容
   * @param {String} touser 发送给谁
   * @param {String} msgtype 发送消息类型（markdown或text）
   * @returns {any}
   */
  async text(
    corpid,
    corpsecret,
    agentid,
    msg,
    touser = '@all',
    msgtype = 'text'
  ) {
    // 获取accessToken
    const accessToken = await this.getAccessToken(corpid, corpsecret)

    const baseUrl = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`

    // 发送消息的对象体
    const sendObj = {
      agentid,
      touser,
      msgtype
    }

    sendObj[msgtype] = { content: msg }
    // 请求发送接口
    const result = await this.request(baseUrl, sendObj, 'POST')
    // 直接将结果返回
    return result.data
  }
}

module.exports = async (req, res) => {
  const api = new Api(req, res)
  // 消息类型，企业微信公司id，企业微信应用的应用secert，企业微信应用的应用agentId，需要发送的内容
  const {
    type,
    id,
    secert,
    agentid,
    msg,
    touser = '@all'
  } = api.getRequestData()

  switch (type) {
    // 普通文本
    case 'text':
      const textData = await api.text(id, secert, agentid, msg, touser, type)
      api.responseMessage(textData)
      break
    case 'mk':
      const mkData = await api.text(id, secert, agentid, msg, touser, type)
      api.responseMessage(mkData)
      break
    default:
      api.responseMessage()
  }
}
