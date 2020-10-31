import request from 'umi-request';

export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}

export async function queryTags(params) {
  return request('/api/tags', {
    params,
  });
}

export async function searchOwns(params) {
  return request('/api/users', {
    ...params, pageNum: 1, pageSize: 100,
  });
}
