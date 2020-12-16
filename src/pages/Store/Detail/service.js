import request from '@/utils/request';


export async function queryBusinessInfo() {
  return request(`/api/businesses`, {
    method: 'GET',
  });
}

export async function queryProvince() {
  return request(`/api/businesses/provinces`, {
    method: 'GET',
  });
}

export async function queryCities(provinceId) {
  return request(`/api/businesses/cities?provinceId=${provinceId}`, {
    method: 'GET',
  });
}

export async function queryCounties(cityId) {
  return request(`/api/businesses/counties?cityId=${cityId}`, {
    method: 'GET',
  });
}


export async function updateBusinessInfo(params) {
  return request('/api/businesses', {
    method: 'PUT',
    data: params,
  });
}
