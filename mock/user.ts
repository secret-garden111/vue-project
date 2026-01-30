// 调用createUserList()函数，返回一个数组，其中包含着两个用户的信息
// 引入类型
// import type { loginFormData } from '../src/api/user/type'
function createUserList() {
  return [
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: '111111',
      desc: '平台管理员',
      roles: ['平台管理员'],
      buttons: ['cuser.detail'],
      routes: ['home'],
      token: 'Admin Token',
    },
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}

// 导出一个数组，其中包含两个接口
export default [
  // 用户登录接口
  {
    url: '/api/user/login',
    methods: 'post',
    // 响应数据
    response: function ({ body }) {
      // 获取请求参数，用户名和密码
      const { username, password } = body
      // 利用用户名和密码，判断是否有此用户
      const checkUser = createUserList().find(function (user) {
        return user.username === username && user.password === password
      })
      // 判断用户是否存在后，返回相应的数据
      if (checkUser) {
        const token = checkUser.token
        return { code: 200, data: { token } }
      } else {
        return { code: 201, data: { message: '账号或者密码不正确！' } }
      }
    },
  },

  // 获取用户信息的接口
  {
    url: '/api/user/info',
    methods: 'post',
    response: function (request) {
      // 从请求头中获取token
      const token = request.headers.token
      // 查看是否有与当前token信息匹配的用户
      const checkUser = createUserList().find((user) => user.token === token)
      // 判断与此token信息一致的用户是否存在，然后返回响应数据
      if (checkUser) {
        return { code: 200, data: { checkUser } }
      } else {
        return { code: 201, data: { message: '获取用户信息失败！' } }
      }
    },
  },
]
