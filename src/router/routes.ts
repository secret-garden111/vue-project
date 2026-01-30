// 定义常量路由并且向外导出
const constantRoute = [
  {
    path: '/login',
    // 路由懒加载，即在需要该路由的时候才加载，适时加载
    component: () => import('@/pages/Login.vue'),
    name: 'Login',
    meta: {
      title: '登录',
      icon: 'UserFilled',
      hidden: true,
    },
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '',
      icon: '',
      hidden: false,
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/pages/Home.vue'),
        meta: {
          title: '首页',
          icon: 'HomeFilled',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/pages/404.vue'),
    name: 'Error',
    meta: {
      hidden: true,
    },
  },
  {
    path: '/screen',
    component: () => import('@/pages/screen.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      icon: 'DataBoard',
      hidden: false,
    },
  },
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock',
      hidden: false,
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/pages/acl/user/user.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'UserFilled',
          hidden: false,
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/pages/acl/role.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'User',
          hidden: false,
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/pages/acl/permission.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          icon: 'Promotion',
          hidden: false,
        },
      },
    ],
  },
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
      hidden: false,
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/pages/product/trademark.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'Stamp',
          hidden: false,
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/pages/product/attr.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'Postcard',
          hidden: false,
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/pages/product/spu.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'ChromeFilled',
          hidden: false,
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/pages/product/sku.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Histogram',
          hidden: false,
        },
      },
    ],
  },
  // 任意路由，即若是无法匹配上述路由，则重新定向到404路由
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/404',
    meta: {
      hidden: true,
    },
  },
]
export default constantRoute
