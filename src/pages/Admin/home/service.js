import request from '@/utils/request';

export async function queryAdmins(params) {
  return request('/api/staffs', {
    params,
  });
}

export async function addAdmin(params) {
  return request('/api/staffs',{
    method:'POST',
    data: { ...params},
  })
}

export async function updateAdmin(params) {
  return request('/api/staffs',{
    method:'PUT',
    data: { ...params},
  })
}


export async function deleteAdmin(id) {
  return request(`/api/staffs/${id}`,{
    method:'DELETE',
  })
}
