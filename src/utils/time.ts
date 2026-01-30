// 用于判断登录的时间
export function getTime() {
  let message = ''
  let currentTime = new Date().getHours()
  if (currentTime < 9) {
    message = '早上好'
  } else if (currentTime < 11) {
    message = '上午好'
  } else if (currentTime < 13) {
    message = '中午好'
  } else if (currentTime < 18) {
    message = '下午好'
  } else if (currentTime < 24) {
    message = '晚上好'
  }
  return message
}
