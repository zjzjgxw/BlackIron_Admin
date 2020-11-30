import {
  queryAllPermissions,
  queryRolePermissions,
  saveRolePermissions,
} from '@/pages/Admin/Role/Permission/service';
import { isSuccess } from '@/utils/utils';

const Model = {
  namespace: 'permission',
  state: {
    groups: undefined,
    permissionIds: undefined,
  },
  effects: {
    *queryAll({ payload }, { call, put }) {
      const response = yield call(queryAllPermissions, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'setPermissions',
          payload: { groups: response.data.groups },
        });
      }
    },

    *queryRolePermissions({ payload }, { call, put }) {
      const response = yield call(queryRolePermissions, payload);
      if (isSuccess(response)) {
        yield put({
          type: 'setPermissionsOfRole',
          payload: { permissions: response.data },
        });
        return response.data;
      }
      return {};
    },

    *saveRolePermissions({ payload }, { call }) {
      console.log(payload);
      const response = yield call(saveRolePermissions, payload);
      if (isSuccess(response)) {
        return true;
      }
      return false;
    },
  },
  reducers: {
    setPermissions(state, { payload }) {
      return { ...state, ...payload };
    },
    setPermissionsOfRole(state, { payload }) {
      return { ...state, permissionIds: payload.permissions };
    },
  },
};
export default Model;
