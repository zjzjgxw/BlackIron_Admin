import request from '@/utils/request';

export async function queryProductCategoryAttribute(categoryId) {
  return request('/api/category/attributes', {
    categoryId,
  });
}

export async function deleteAttribute(id) {
  return request(`/api/category/attributes/${id}`, {
    method: 'DELETE',
  });
}

export async function updateAttribute(id, name) {
  return request(`/api/category/attributes/${id}`, {
    method: 'PUT',
    data: { name },
  });
}

export async function addAttributes(params) {
  return request(`/api/category/attributes`, {
    method: 'POST',
    data: { ...params },
  });
}

export async function addAttributeOption(params) {
  return request(`/api/category/attributes/options`, {
    method: 'POST',
    data: { ...params },
  });
}

export async function deleteAttributeOption(id) {
  return request(`/api/category/attributes/options/${id}`, {
    method: 'DELETE',
  });
}
