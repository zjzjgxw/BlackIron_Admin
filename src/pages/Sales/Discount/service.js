import request from '@/utils/request';

export async function queryDiscount(params) {
  return request('/api/discounts', {
    params,
  });
}

export async function addDiscount(params) {
  return request('/api/discounts', {
    method: 'POST',
    data: { ...params },
  });
}

export async function deleteDiscount(id) {
  return request(`/api/discounts/${id}`, {
    method: 'DELETE',
  });
}

export async function updateDiscount(params) {
  return request('/api/discounts', {
    method: 'PUT',
    data: { ...params },
  });
}
