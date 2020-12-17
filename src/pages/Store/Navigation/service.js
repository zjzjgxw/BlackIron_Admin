import request from '@/utils/request';

export async function queryNavigations(params) {
  return request('/api/businesses/navigations', {
    params,
  });
}


export async function createNavigation(params) {
  return request('/api/businesses/navigations', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateNavigation(params) {
  return request('/api/businesses/navigations', {
    method: 'PUT',
    data: { ...params },
  });
}


export async function deleteNavigation(id) {
  return request(`/api/businesses/navigations/${id}`,{
    method:'DELETE',
  })
}
