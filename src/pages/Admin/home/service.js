import request from '@/utils/request';

export async function queryAdmins(params) {
  return request('/api/admins', {
    params,
  });
}

export async function addAdmin(params) {
  return request('/api/admins',{
    method:'POST',
    data: { ...params},
  })
}


export async function changeAdminStatus(id) {
  return request(`/api/admins/${id}`,{
    method:'PATCH',
  })
}

export async function deleteAdmin(id) {
  return request(`/api/admins/${id}`,{
    method:'DELETE',
  })
}
