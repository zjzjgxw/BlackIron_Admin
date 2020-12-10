import request from '@/utils/request';

export async function queryAdvertisements(params) {
  return request('/api/businesses/advertisements', {
    params,
  });
}


export async function createAdvertisement(params) {
  return request('/api/businesses/advertisements', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateAdvertisement(params) {
  return request('/api/businesses/advertisements', {
    method: 'PUT',
    data: { ...params },
  });
}


export async function deleteAdvertisement(id) {
  return request(`/api/businesses/advertisements/${id}`,{
    method:'DELETE',
  })
}
