import request from '@/utils/request';


export async function queryComments(params) {
  return request('/api/products/comments', {
    params,
  });
}
