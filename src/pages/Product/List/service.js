import request from '@/utils/request';

export async function queryProducts(params) {
  return request('/api/products', {
    params,
  });
}

export async function deleteProduct(id) {
  return request(`/api/products/detail/${id}`, {
    method: 'DELETE',
  })
}

