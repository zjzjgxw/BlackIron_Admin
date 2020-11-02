import request from '@/utils/request';
import { getCurrentStaff } from '@/utils/utils';

export async function queryProductCategory(params) {
  return request('/api/category', {
    params,
  });
}

export async function deleteCategory(id) {
  return request(`/api/category/${id}`, {
    method: 'DELETE',
  });
}

export async function updateCategory(id, name) {
  return request(`/api/category/${id}`, {
    method: 'PUT',
    data: { name },
  });
}

export async function addCategory(name) {
  const staff = getCurrentStaff();
  return request(`/api/category`, {
    method: 'POST',
    data: {
      businessId: staff.businessId,
      name,
      parentId: 0,
    },
  });
}
