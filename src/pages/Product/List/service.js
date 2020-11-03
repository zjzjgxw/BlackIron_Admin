import request from '@/utils/request';

export async function queryProducts(params) {
  return request('/api/products', {
    params,
  });
}
