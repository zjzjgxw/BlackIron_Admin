import {queryAllPermissions, queryRolePermissions} from "@/pages/Admin/Role/Permission/service";

const Model = {
  namespace: 'permission',
  state: {
    groups: undefined,
    permissionIds: undefined,
  },
  effects: {
    * queryAll({payload}, {call, put}) {
      const response = yield call(queryAllPermissions, payload);
      if (response.code === 200) {
        yield put({
          type: 'setPermissions',
          payload: {groups: response.data.groups}
        });
      }
    },

    * queryRolePermissions({payload}, {call, put}) {
      const response = yield call(queryRolePermissions, payload);
      if (response.code === 200) {
        yield put({
          type: 'setPermissionsOfRole',
          payload: {permissions: response.data.permissions}
        });
        return response.data.permissions;
      }else{
        return null;
      }
    },
  },
  reducers: {
    setPermissions(state, {payload}) {
      return {...state, ...payload};
    },
    setPermissionsOfRole(state, {payload}) {
      return {...state, permissionIds: payload.permissions}
    }
  },
};
export default Model;
