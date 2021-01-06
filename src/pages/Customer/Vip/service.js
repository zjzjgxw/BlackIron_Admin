import request from 'umi-request';

export async function queryVips(params) {
  return request('/api/vips', {
    params,
  });
}

export async function createVip(params) {
  return request('/api/vips', {
    method: 'POST',
    data: params,
  });
}



export async function updateVips(params) {
  return request('/api/vips', {
    method: 'PUT',
    data: params,
  });
}


export async function deleteVips(id) {
  return request(`/api/vips/${id}`, {
    method: 'DELETE',
  });
}
