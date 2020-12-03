import request from '@/utils/request';

export async function queryProductDetails(id) {
  return request(`/api/products/detail/${id}`, {
    method: 'GET',
  });
}

export async function createProductImages(params) {
  return request(`/api/products/detail/images/${params.id}`, {
    method: 'POST',
    data: params,
  });
}
