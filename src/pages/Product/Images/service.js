import request from '@/utils/request';

export async function queryProductDetails(id) {
  return request(`/api/products/detail/${id}`, {
    method: 'GET',
  });
}
