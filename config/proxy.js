/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

const serveUrlMap = {
  dev: 'http://localhost:',
  pre: 'http://localhost:9802',
  test: 'http://localhost:9802',
  idc: '',
};

const { REACT_APP_ENV = 'idc' } = process.env;

export default {
  dev: {
    '/api/': {
      target: serveUrlMap[REACT_APP_ENV]+'10000',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    '/sso/': {
      target: serveUrlMap[REACT_APP_ENV]+'9802',
      changeOrigin: true,
      pathRewrite: {
        '^/sso': '/sso',
      },
    },
  },
  test: {
    '/api/': {
      target: serveUrlMap[REACT_APP_ENV],
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
  pre: {
    '/api/': {
      target: serveUrlMap[REACT_APP_ENV],
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  },
};
