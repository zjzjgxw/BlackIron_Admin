import request from '@/utils/request';

export async function queryProductCategory(params) {
  return request('/api/product/category', {
    params,
  });
}


export async function changeCustomerStatus(id) {
  return request(`/api/users/${id}`,{
    method:'PATCH',
  })
}

export async function deleteCustomer(id) {
  return request(`/api/users/${id}`,{
    method:'DELETE',
  })
}
