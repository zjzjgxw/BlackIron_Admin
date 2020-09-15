import request from '@/utils/request';

export async function queryRoles(params) {
  return request('/api/admins/roles', {
    params,
  });
}

export async function addRole(params) {
  return request('/api/admins/roles', {
    method: 'POST',
    data: {...params},
  })
}

export async function updateRole(params) {
  return request(`/api/admins/roles`, {
    method: 'PUT',
    data: {...params},
  })
}


export async function deleteRole(id) {
  return request(`/api/admins/roles/${id}`, {
    method: 'DELETE',
  })
}

export async function addRoleMember(params) {
  return request(`/api/admins/roleRel`, {
    method: 'POST',
    data: {params},
  })
}
