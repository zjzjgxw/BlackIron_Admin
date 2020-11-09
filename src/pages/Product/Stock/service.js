import request from '@/utils/request';


export async function querySpecifications(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function queryStockInfo(productId) {
  return request('/api/stock', {
    params: {productId},
  });
}
