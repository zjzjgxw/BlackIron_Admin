import request from '@/utils/request';

export async function queryPermissions(params) {
  return request('/api/permissions', {
    data: {...params, type: 2},
  });
}

export async function queryAllGroups() {
  return request('/api/permissions/groups?type=2');
}

export async function addPermission(params) {
  return request('/api/permissions', {
    method: 'POST',
    data: {...params, type: 2},
  })
}

export async function editPermission(params) {
  return request(`/api/permissions`, {
    method: 'PUT',
    data: {...params, type: 2},
  })
}
