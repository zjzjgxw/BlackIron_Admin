import request from '@/utils/request';

export async function queryCoupons(params) {
  return request('/api/coupons', {
    params,
  });
}

export async function addCoupon(params) {
  return request('/api/coupons', {
    method: 'POST',
    data: { ...params },
  });
}

export async function deleteCoupon(id) {
  return request(`/api/coupons/${id}`, {
    method: 'DELETE',
  });
}

export async function updateCoupon(params) {
  return request('/api/coupons', {
    method: 'PUT',
    data: { ...params },
  });
}
