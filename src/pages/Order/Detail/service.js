import request from '@/utils/request';


export async function queryOrderDetail(id) {
  return request(`/api/orders/detail/${id}`, {
    method: 'GET',
  });
}
