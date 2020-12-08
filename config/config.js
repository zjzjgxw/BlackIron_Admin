import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              name: 'store',
              icon: 'smile',
              routes: [
                {
                  name: 'banner',
                  icon: 'smile',
                  path: '/store/banners',
                  component: './Store/Banner',
                },
              ],
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              authority: ['admin'],
              routes: [
                // {
                //   path: '/admin/sub-page',
                //   name: 'sub-page',
                //   icon: 'smile',
                //   component: './Welcome',
                //   authority: ['admin'],
                // },
                {
                  name: 'admin-list',
                  icon: 'smile',
                  path: '/admin/index',
                  component: './Admin/home',
                },
                {
                  name: 'role-permission',
                  icon: 'smile',
                  path: '/admin/role/:id/permission',
                  hideInMenu: true,
                  component: './Admin/Role/Permission',
                },
                {
                  name: 'admin-role',
                  icon: 'smile',
                  path: '/admin/role',
                  component: './Admin/Role',
                },
                {
                  name: 'admin-permission',
                  icon: 'smile',
                  hideInMenu: true,
                  path: '/admin/permission',
                  component: './Admin/Permission',
                },
              ],
            },
            {
              name: 'list.table-list',
              icon: 'table',
              path: '/list',
              component: './ListTableList',
            },
            {
              name: 'customer',
              icon: 'UserOutlined',
              path: '/customer',
              routes: [
                {
                  name: 'list',
                  icon: 'UserOutlined',
                  path: '/customer/list',
                  component: './Customer/List',
                },
              ],
            },
            {
              name: 'article',
              icon: 'ProfileOutlined',
              path: '/article',
              hideInMenu: true,
              routes: [
                {
                  name: 'list',
                  icon: 'ProfileOutlined',
                  path: '/article/list',
                  component: './Article/ListSearchArticles',
                },
                {
                  name: 'tags',
                  icon: 'smile',
                  path: '/article/tags',
                  component: './Article/Tags',
                },
              ],
            },
            {
              name: 'product',
              icon: 'smile',
              path: '/product',
              routes: [
                {
                  name: 'category',
                  icon: 'ProfileOutlined',
                  path: '/product/category/index',
                  component: './Product/Category',
                },
                {
                  name: 'attribute',
                  icon: 'ProfileOutlined',
                  path: '/product/category/:id/attribute',
                  hideInMenu: true,
                  component: './Product/Category/Attribute',
                },
                {
                  name: 'specifications',
                  icon: 'ProfileOutlined',
                  path: '/product/category/:id/specifications',
                  hideInMenu: true,
                  component: './Product/Category/Specification',
                },
                {
                  name: 'list',
                  icon: 'smile',
                  path: '/product/list',
                  component: './Product/List',
                },
                {
                  name: 'create',
                  icon: 'smile',
                  path: '/product/detail',
                  hideInMenu: true,
                  component: './Product/Detail',
                },
                {
                  name: 'detail',
                  icon: 'smile',
                  path: '/product/detail/:id',
                  hideInMenu: true,
                  component: './Product/Detail',
                },
                {
                  name: 'images',
                  icon: 'smile',
                  path: '/product/:id/images',
                  hideInMenu: true,
                  component: './Product/Images',
                },
                {
                  name: 'stock',
                  icon: 'smile',
                  path: '/product/:id/stock',
                  hideInMenu: true,
                  component: './Product/Stock',
                },
              ],
            },
            {
              name: 'order',
              icon: 'smile',
              path: '/order/list',
              component: './Order/Index',
            },
            {
              name: 'order-detail',
              icon: 'smile',
              path: '/order/detail/:id',
              hideInMenu: true,
              component: './Order/Detail',
            },
            {
              name: 'sales',
              icon: 'smile',
              path: '/sales',
              routes: [
                {
                  name: 'discount',
                  icon: 'ProfileOutlined',
                  path: '/sales/discount',
                  component: './Sales/Discount',
                },
                {
                  name: 'coupon',
                  icon: 'ProfileOutlined',
                  path: '/sales/coupon',
                  component: './Sales/Coupon',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
