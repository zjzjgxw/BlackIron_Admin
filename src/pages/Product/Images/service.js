import request from 'umi-request';

export async function queryProductDetails(id) {
  return request(`/api/products/detail/${id}`, {
    method: 'GET',
  });
}
