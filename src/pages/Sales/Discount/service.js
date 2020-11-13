import request from '@/utils/request';

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

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
