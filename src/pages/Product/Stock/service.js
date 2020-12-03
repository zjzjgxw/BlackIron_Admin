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

export async function createStockInfo(params) {
  return request('/api/stock', {
    method: 'POST',
    data: params,
  });
}


export async function updateStockInfo(params) {
  return request('/api/stock', {
    method: 'PUT',
    data: params,
  });
}
