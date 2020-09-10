import {stringify} from 'querystring';
import {history} from 'umi';
import {accountLogin} from '@/services/login';
import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    message: undefined
  },
  effects: {
    * login({payload}, {call, put}) {
      const loginType = payload.type;
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {...response, type: loginType}
      });
      if (response.code === 200) {
        // Login successfully
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let {redirect} = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const {redirect} = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, {payload}) {
      setAuthority('admin');
      if (payload.code === 200) {
        return {...state, status: 'ok', type: payload.type};
      } else {
        return {...state, status: 'error', type: payload.type, message:payload.msg};
      }
    },
  },
};
export default Model;
