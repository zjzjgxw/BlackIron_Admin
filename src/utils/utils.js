import {parse, stringify} from 'querystring';
import pathRegexp from 'path-to-regexp';
import {notification} from 'antd';
import numeral from 'numeral';
import {history} from 'umi';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const {NODE_ENV} = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({routes, path = '/', target = '_self'}) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

export const isSuccess = (res, notify = true) => {
  if (res.code === 200) {
    return true;
  }
  if (res.code === 401) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: window.location.href,
      }),
    });
    return false;
  }

  if (notify) {
    notification.error({
      message: `请求失败`,
      description: `${res.msg}`,
    });
  }
  return false;
};

export const priceFormat = (number) => {
  const price = number / 100;
  return `￥${numeral(price).format('0,0.00')}`;
};

export const getFormatTime = (date) =>{
  let month = date.getMonth() + 1;
  month = month.toString().length === 1 ? `0${month}` : month;
  const day = date.getDate().toString().length === 1 ? `0${date.getDate()}` : date.getDate();
  return [date.getFullYear(), month, day].join('-');
};
