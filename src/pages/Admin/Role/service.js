import request from '@/utils/request';

export async function queryRoles(params) {
  return request('/api/businesses/role', {
    params,
  });
}

export async function addRole(params) {
  return request('/api/businesses/role', {
    method: 'POST',
    data: { ...params },
  });
}

export async function updateRole(params) {
  return request(`/api/businesses/role`, {
    method: 'PUT',
    data: { ...params },
  });
}

export async function deleteRole(id) {
  return request(`/api/businesses/role/${id}`, {
    method: 'DELETE',
  });
}

export async function addRoleMember(params) {
  return request(`/api/staffs/roles`, {
    method: 'POST',
    data: params,
  });
}
