import request from '@/utils/request';

export async function queryProductCategorySpecification(params) {
  return request('/api/category/specifications', {
    params,
  });
}

export async function deleteSpecification(id) {
  return request(`/api/category/specifications/${id}`, {
    method: 'DELETE',
  });
}

export async function updateSpecification(id, name) {
  return request(`/api/category/specifications/${id}`, {
    method: 'PUT',
    data: { name },
  });
}

export async function addSpecification(params) {
  return request(`/api/category/specifications`, {
    method: 'POST',
    data: { ...params },
  });
}

export async function addSpecificationOption(params) {
  return request(`/api/category/specifications/options`, {
    method: 'POST',
    data: { ...params },
  });
}

export async function deleteSpecificationOption(id) {
  return request(`/api/category/specifications/options/${id}`, {
    method: 'DELETE',
  });
}
