// 对本地数据进行存储和读取的方法进行封装
// 本地存储token
export function SET_TOKEN(data: string) {
  localStorage.setItem('TOKEN', data)
}
// 本地读取token
export function GET_TOKEN() {
  return localStorage.getItem('TOKEN')
}
// 清除本地存储的token
export function REMOVE_TOKEN() {
  localStorage.removeItem('TOKEN')
}
