/**
 * @description: 发送电报消息
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-04 20:43:09
 * @LastEditTime: 2021-03-04 20:43:09
 * @LastEditors: 小康
 */

const Base = require('./base')

class Api extends Base {
  constructor(req, res) {
    super(req, res)
    this.TG_BOT_TOKEN = process.env.TG_BOT_TOKEN
  }
  // 发送消息
  async send(chat_id, text) {
    if (!this.TG_BOT_TOKEN) return '管理员未配置机器人Token，请联系管理员添加。'

    if (!text || !chat_id) return 'text字段与chatId是必须的'

    const url = `https://api.telegram.org/bot${this.TG_BOT_TOKEN}/sendMessage`
    const content = await super.request(
      url,
      {
        chat_id,
        text
      },
      'POST'
    )
    return content
  }
}

module.exports = async (req, res) => {
  const api = new Api(req, res)
  const { type, chat_id, text } = api.getRequestData()

  switch (type) {
    case 'send':
      const data = await api.send(chat_id, text)
      api.responseMessage(data)
      break
    default:
      api.responseMessage()
  }
}
