/**
 * @description: 触发GitHub系列的API
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
  // 触发actions
  async dispatch(owner, repo, token, text) {
    if (!token) return 'token是必须的字段'
    if (!owner || !repo) return 'owner或者repo字段未填写'
    this.Authorization = token
    text = text || 'Vercel_Api'
    const result = await super.request(
      `https://api.github.com/repos/${owner}/${repo}/dispatches`,
      {
        event_type: text
      },
      'POST'
    )
    if (result.headers) {
      // 当前时段剩余请求次数
      const Remaining = result.headers['X-RateLimit-Remaining']
      return {
        message: `请求成功！请跳转链接查看：https://github.com/${owner}/${repo}/actions`,
        'X-RateLimit-Remaining': Remaining
      }
    } else {
      return { message: '请求失败', code: 500 }
    }
  }
}

module.exports = async (req, res) => {
  const api = new Api(req, res)
  // 获取请求数据
  const { type, token, owner, repo, runit_text } = api.getRequestData()

  switch (type) {
    case 'dispatch':
      const data = await api.dispatch(owner, repo, token, runit_text)
      api.responseMessage(data)
      break
    default:
      api.responseMessage()
  }
}
