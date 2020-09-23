import request from '@/utils/request';

export async function queryAllPermissions() {
  return request('/api/permissions/groups?type=2');
}


export async function queryRolePermissions(params) {
  return request('/api/admins/roles/permissions', {
    params,
  });
}
