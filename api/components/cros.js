/**
 * @description: 处理跨域问题
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-03-06 14:24:06
 * @LastEditTime: 2021-03-06 14:24:06
 * @LastEditors: 小康
 */

const fetch = require('node-fetch')

const cros = async (url) => {
  const fetchResponese = await fetch(url, {
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36'
  })
  const contentType = fetchResponese.headers.get('content-type')
  const data = await fetchResponese.buffer()

  return {
    data,
    contentType
  }
}

module.exports = cros
