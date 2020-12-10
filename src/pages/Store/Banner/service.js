import request from '@/utils/request';

export async function queryBanners(params) {
  return request('/api/businesses/banners', {
    params,
  });
}


export async function createBanner(params) {
  return request('/api/businesses/banners', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateBanner(params) {
  return request('/api/businesses/banners', {
    method: 'PUT',
    data: { ...params },
  });
}


export async function deleteBanner(id) {
  return request(`/api/businesses/banners/${id}`,{
    method:'DELETE',
  })
}
