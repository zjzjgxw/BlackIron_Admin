import request from '@/utils/request';

export async function createProduct(params) {
  return request('/api/products/detail', {
    method: 'POST',
    data: params,
  });
}


export async function updateProduct(params) {
  return request('/api/products/detail', {
    method: 'PUT',
    data: params,
  });
}
